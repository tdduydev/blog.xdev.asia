---
id: 02770003-omop-cdm5-b001-000000000007
title: "HADES Analytics：RWE のための R による PLE、PLP、Characterization"
slug: omop-hades-r-analytics-ple-plp
excerpt: >-
  HADES（Health Analytics Data-to-Evidence Suite）は OHDSI の R パッケージ群で、
  Patient-Level Estimation、Patient-Level Prediction、Characterization、Self-Controlled Case Series を
  実行できます。本記事ではインストールから network study の公開までを解説します。
featured_image: /images/blog/omop-hades-featured.webp
type: blog
reading_time: 16
view_count: 0
meta: null
published_at: '2026-05-07T18:00:00.000000Z'
created_at: '2026-05-07T18:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat7-7007-a007-000000000007, name: Kiến trúc hệ thống, slug: architecture}
tags: [{name: OMOP, slug: omop}, {name: HADES, slug: hades}, {name: RWE, slug: rwe}, {name: OHDSI, slug: ohdsi}]
comments: []
---

ATLAS は「コホート定義」と基本的な「characterization」を解決します。より高度な統計手法（causal inference、ML）が必要になったら、OHDSI 公式の R パッケージ群 **HADES** を使います。本記事ではスタックの概要、PLE/PLP のワークフロー、ネットワーク研究の公開までを紹介します。

## 1. HADES とは

![1. HADES とは](/images/blog/diagrams/omop-hades-r-analytics-ple-plp-d01.webp)

40+ R パッケージ、MIT ライセンス、CRAN または GitHub からインストール可能。

## 2. インストール

```r
# Strategus（オーケストレータ）をインストール - 他のパッケージも自動で
install.packages("Strategus")

# 個別インストールも可
install.packages(c(
  "DatabaseConnector", "SqlRender", "FeatureExtraction",
  "CohortMethod", "PatientLevelPrediction", "Characterization",
  "CohortDiagnostics", "Achilles", "DataQualityDashboard"
))

# Postgres 用 JDBC ドライバ
DatabaseConnector::downloadJdbcDrivers("postgresql")
```

要件：R >= 4.2、Java >= 11、100 万 person 超のデータセットには 16GB+ RAM。

## 3. データベース接続

```r
library(DatabaseConnector)
connectionDetails <- createConnectionDetails(
  dbms = "postgresql",
  server = "host/db_name",
  user = "omop_reader",
  password = Sys.getenv("OMOP_PASSWORD"),
  port = 5432,
  pathToDriver = "~/jdbcDrivers"
)

cdmDatabaseSchema <- "cdm"
cohortDatabaseSchema <- "results"
```

## 4. CohortMethod — Patient-Level Estimation (PLE)

**PLE** が答える問い：「薬 A vs 薬 B、副作用 X が少ないのはどちらか？」Comparative effectiveness research。

![4. CohortMethod — Patient-Level Estimation (PLE)](/images/blog/diagrams/omop-hades-r-analytics-ple-plp-d02.webp)

### 4.1 PLE ワークフロー

```r
library(CohortMethod)

# 1. データ抽出
cmData <- getDbCohortMethodData(
  connectionDetails = connectionDetails,
  cdmDatabaseSchema = cdmDatabaseSchema,
  targetId = 1,         # Cohort A id
  comparatorId = 2,     # Cohort B id
  outcomeIds = c(3),    # Outcome cohort
  covariateSettings = createDefaultCovariateSettings()
)

# 2. Propensity score モデル
ps <- createPs(
  cohortMethodData = cmData,
  prior = createPrior("laplace", exclude = c(0))
)

# 3. 1:1 nearest neighbor マッチ
strataPop <- matchOnPs(ps, maxRatio = 1)

# 4. アウトカムモデル（Cox）
outcomeModel <- fitOutcomeModel(
  population = strataPop,
  modelType = "cox",
  stratified = TRUE
)

summary(outcomeModel)
# Hazard Ratio: 0.85 (95% CI 0.78-0.93)
```

### 4.2 OHDSI 標準診断

結果を信じる前に確認すべき項目：
- **Equipoise**：2 コホート間で十分な PS overlap
- **共変量バランス**：マッチ後の全共変量で SMD < 0.1
- **Negative control 分布**：negative control の HR は 1 に近いべき
- **Empirical calibration**：systematic error に応じて HR を補正

OHDSI 規約：すべての診断にパスした結果のみ公開。

## 5. PatientLevelPrediction (PLP) — ML

**PLP** が答える問い：「患者 X が今後 T 日以内に Y を発症する確率は何 % か？」

![5. PatientLevelPrediction (PLP) — ML](/images/blog/diagrams/omop-hades-r-analytics-ple-plp-d03.webp)

### 5.1 PLP コード

```r
library(PatientLevelPrediction)

# 1. plpData 取得
plpData <- getPlpData(
  databaseDetails = createDatabaseDetails(...),
  covariateSettings = createDefaultCovariateSettings(),
  cohortId = 1,    # at-risk population
  outcomeIds = 2,  # outcome
  ...
)

# 2. Population
population <- createStudyPopulation(
  plpData = plpData,
  outcomeId = 2,
  riskWindowStart = 1,
  riskWindowEnd = 365,
  requireTimeAtRisk = TRUE
)

# 3. Lasso 学習
modelSettings <- setLassoLogisticRegression()
results <- runPlp(
  plpData = plpData,
  population = population,
  modelSettings = modelSettings,
  splitSettings = createDefaultSplitSetting(splitSeed = 42)
)

# 4. 表示
viewPlp(results)
# AUC = 0.78, calibration intercept = -0.05
```

### 5.2 External validation

External validation = CDM A で訓練したモデルを CDM B（同スキーマ、別データ）で予測。臨床 ML の金の基準 — モデルの汎化を証明します。

```r
externalValidatePlp(
  plpResult = results,
  validationDatabaseDetails = list(otherCdmDetails)
)
```

## 6. Characterization（高度なコホート比較）

```r
library(Characterization)

# Setup
cSettings <- createCharacterizationSettings(
  timeAtRiskSettings = createTimeAtRiskSettings(
    riskWindowStart = 1, riskWindowEnd = 365
  ),
  dechallengeRechallengeSettings = createDechallengeRechallengeSettings(
    targetIds = c(1, 2),
    outcomeIds = c(3)
  ),
  aggregateCovariateSettings = createAggregateCovariateSettings(
    targetIds = c(1, 2), outcomeIds = c(3)
  )
)

runCharacterizationAnalyses(
  connectionDetails = connectionDetails,
  cdmDatabaseSchema = cdmDatabaseSchema,
  characterizationSettings = cSettings,
  outputDirectory = "char_results/"
)
```

出力：time-to-event、dechallenge-rechallenge（薬剤-イベント因果性）、コホート A vs B の集約共変量。

## 7. SelfControlledCaseSeries (SCCS)

比較群がないときに使う手法 — 患者自身を comparator として、曝露期間 vs 非曝露期間を比較。利用者が少ない薬の薬剤監視に最適。

```r
library(SelfControlledCaseSeries)

sccsData <- getDbSccsData(
  connectionDetails = connectionDetails,
  cdmDatabaseSchema = cdmDatabaseSchema,
  outcomeIds = c(3),
  exposureIds = c(1)
)

sccsModel <- fitSccsModel(...)
```

## 8. Strategus — 複数手法のオーケストレーション

Strategus は JSON config + R ワークフローで、1 つの研究について全パイプライン（DQ → CohortDiagnostics → PLE → PLP → Char）を実行します。

```r
library(Strategus)

# 1. モジュール定義
analysisSpecifications <- createEmptyAnalysisSpecificiations() %>%
  addCharacterizationModuleSpecifications(...) %>%
  addCohortMethodModuleSpecifications(...) %>%
  addPatientLevelPredictionModuleSpecifications(...)

# 2. ローカル CDM で実行
execute(
  analysisSpecifications = analysisSpecifications,
  executionSettings = createCdmExecutionSettings(
    workDatabaseSchema = "results",
    cdmDatabaseSchema = "cdm",
    workFolder = "tmp/work",
    resultsFolder = "tmp/results"
  )
)
```

出力スキーマは共通 → メタアナリシスのため中央サーバーにアップロード。

## 9. ネットワーク研究のパターン

![9. ネットワーク研究のパターン](/images/blog/diagrams/omop-hades-r-analytics-ple-plp-d04.webp)

ベトナムは Site として参加可能 — 高度なコーディングスキルは不要、CDM + R パッケージ実行のみ。

## 10. EvidenceSynthesis（メタアナリシス）

N サイトから結果が揃ったら：

```r
library(EvidenceSynthesis)

# 入力：サイトごとの HR + log SE
results <- data.frame(
  site = c("VN", "EU1", "EU2", "US1"),
  logRr = c(-0.16, -0.20, -0.18, -0.22),
  seLogRr = c(0.05, 0.04, 0.03, 0.02)
)

# Random-effects メタアナリシス
meta <- computeBayesianMetaAnalysis(results)
plotMetaAnalysisForest(meta, results)
```

## 11. HADES のよくある落とし穴

- ❌ Negative controls を忘れる → systematic bias が補正されない
- ❌ External validation 無しで PLP を訓練 → overfit が検出されない
- ❌ PS モデルにキー交絡因子が漏れる → bias
- ❌ Target と comparator のコホート重複 → 強い bias
- ❌ マッチ後の共変量バランスをチェックしない → 解析が無意味
- ❌ 特徴量抽出から test set にリーク → AUC が見かけ上高く出る

## 12. HADES 関連資料

- **Book of OHDSI** 第 12〜15 章（PLE、PLP、SCCS、ネットワーク研究）
- HADES website：ohdsi.github.io/Hades/
- OHDSI Forum：forums.ohdsi.org
- Strategus チュートリアル動画
- Atlas Demo の Case study

## 13. HADES 学習ロードマップ

1. OMOP SQL と ATLAS を学ぶ（1 ヶ月）
2. R + tidyverse 基礎（2 週間）
3. CohortDiagnostics — 1 つのコホートで診断を実行（1 週間）
4. Eunomia で CohortMethod チュートリアル（2 週間）
5. PatientLevelPrediction チュートリアル（2 週間）
6. 1 つのネットワーク研究に contributor として参加（1〜2 ヶ月）
7. 小規模研究を 1 つリード（3〜6 ヶ月）

## 14. ベトナム向け Use case

| 問い | Method |
|---|---|
| ベトナム人の高血圧治療として最良の戦略は？ | CohortMethod (PLE) |
| どの糖尿病患者が再入院するか予測 | PatientLevelPrediction (PLP) |
| がんの疫学を欧米と比較 | Characterization |
| 新薬承認後の副作用追跡 | SelfControlledCaseSeries |
| DARWIN EU study に参加 | Strategus + 集約結果共有 |

## まとめ

HADES は CDM を本格的な RWE 研究室へと変えます。HADES を学ぶことは、本物の OHDSI Practitioner になるための投資です。ベトナムには EHDEN/DARWIN/N3C のネットワーク研究で大きなチャンスがあります。

次の記事：[Production OMOP — Postgres tuning、パーティション、セキュリティ](/blog/omop-production-postgres-tuning-deployment)。
