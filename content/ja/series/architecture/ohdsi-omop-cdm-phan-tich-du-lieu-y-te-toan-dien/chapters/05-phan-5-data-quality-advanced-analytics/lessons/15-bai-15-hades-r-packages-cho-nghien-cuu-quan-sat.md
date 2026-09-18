---
id: 019e0b20-b215-7a01-e001-f1a7f8000015
title: 'レッスン 15: HADES — 観察研究用の R パッケージ'
slug: bai-15-hades-r-packages-cho-nghien-cuu-quan-sat
description: >-
  HADES (Health Analytics Data-to-Evidence Suite)
  エコシステム、CohortGenerator、CohortMethod、PatientLevelPrediction、CohortDiagnostics、Strategus
  — R コマンドラインから研究全体を調整します。
duration_minutes: 110
is_free: true
video_url: null
sort_order: 15
section_title: 'パート 5: データ品質と高度な分析'
course:
  id: 019e0b20-b200-7a01-e001-f1a7f8000001
  title: OHDSI および OMOP CDM — 包括的な医療データ分析
  slug: ohdsi-omop-cdm-phan-tich-du-lieu-y-te-toan-dien
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-643" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-643)"/>

  <!-- Decorations -->
  <g>
    <circle cx="1088" cy="214" r="16" fill="#fbbf24" opacity="0.09"/>
    <circle cx="1076" cy="102" r="20" fill="#fbbf24" opacity="0.13"/>
    <circle cx="1064" cy="250" r="24" fill="#fbbf24" opacity="0.07"/>
    <circle cx="1052" cy="138" r="28" fill="#fbbf24" opacity="0.11"/>
    <circle cx="1040" cy="286" r="32" fill="#fbbf24" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <line x1="600" y1="74" x2="1100" y2="154" stroke="#fbbf24" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="104" x2="1050" y2="174" stroke="#fbbf24" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1049.1147367097487,209.5 1049.1147367097487,238.5 1024,253 998.8852632902513,238.5 998.8852632902513,209.5 1024,195" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fbbf24"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fbbf24" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ アーキテクチャ — レッスン 15</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 15: HADES — 研究用の R パッケージ</tspan>
      <tspan x="60" dy="42">観察する</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OHDSI および OMOP CDM — 包括的な医療データ分析</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 5: データ品質と高度な分析</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![レッスン 15: 観察研究のための HADES — R パッケージ](/storage/uploads/2026/03/ohdsi-bai-15-hades-packages.webp)

## はじめに

**HADES** (Health Analytics Data-to-Evidence Suite) は、OHDSI の **20 以上の R パッケージ**のオープンソース セットで、コホート生成から推定/予測までの分析パイプライン全体を提供します。 ATLAS は GUI であり、HADES はその背後にあるエンジンです。

```
Quan hệ ATLAS ↔ HADES:

┌──────────────────────────────────┐
│            ATLAS (GUI)           │
│  Design → Generate R Package    │
│              │                   │
│              ▼                   │
│        ┌─────────────┐          │
│        │ HADES (R)   │          │
│        │ Engine      │          │
│        └─────────────┘          │
│              │                   │
│    ┌─────────┴──────────┐       │
│    ▼                    ▼       │
│  CohortMethod    PatientLevel   │
│  (Estimation)    Prediction     │
└──────────────────────────────────┘

→ ATLAS generate study package dùng HADES packages
→ Hoặc dùng HADES trực tiếp từ R (linh hoạt hơn)
```

---

## 1. HADES エコシステム

### 1.1 主なパッケージ

```
HADES Package Map:

┌─ Data Infrastructure ──────────────────────┐
│  DatabaseConnector    Kết nối DB via JDBC   │
│  SqlRender           SQL cross-platform     │
│  Eunomia            CDM test database       │
└────────────────────────────────────────────┘

┌─ Cohort Generation ───────────────────────┐
│  CohortGenerator     Tạo & execute cohort  │
│  CirceR             Cohort definition → SQL │
│  CohortDiagnostics  Đánh giá chất lượng    │
│                     cohort                  │
└────────────────────────────────────────────┘

┌─ Characterization ────────────────────────┐
│  FeatureExtraction   Trích xuất features   │
│  CohortExplorer     Explore cohort data    │
│  Characterization   Cohort comparison      │
└────────────────────────────────────────────┘

┌─ Population Analytics ────────────────────┐
│  CohortMethod        Causal inference      │
│  SelfControlledCase  SCCS design           │
│  EvidenceSynthesis   Meta-analysis         │
└────────────────────────────────────────────┘

┌─ Prediction ──────────────────────────────┐
│  PatientLevelPrediction  ML prediction     │
│  DeepPatientLevelPred.   Deep learning     │
│  EnsemblePatientLevel.   Ensemble models   │
└────────────────────────────────────────────┘

┌─ Orchestration ───────────────────────────┐
│  Strategus           Pipeline orchestrator  │
│  ResultModelManager  Result management      │
│  ShinyAppBuilder     Interactive dashboards │
└────────────────────────────────────────────┘
```

### 1.2 HADES のインストール

```r
# Cài toàn bộ HADES
install.packages("remotes")
remotes::install_github("OHDSI/Hades")

# Hoặc cài từng package
remotes::install_github("OHDSI/CohortGenerator")
remotes::install_github("OHDSI/CohortMethod")
remotes::install_github("OHDSI/PatientLevelPrediction")
remotes::install_github("OHDSI/CohortDiagnostics")
remotes::install_github("OHDSI/Strategus")
```

---

## 2. コホートジェネレーター

### 2.1 R からコホートを作成する

```r
library(CohortGenerator)
library(DatabaseConnector)

connectionDetails <- createConnectionDetails(
  dbms = "postgresql",
  server = "localhost/ohdsi",
  user = "ohdsi_app",
  password = keyring::key_get("ohdsi"),
  port = 5432
)

# Load cohort definition (JSON từ ATLAS export)
cohortDefinitionSet <- getCohortDefinitionSet(
  settingsFileName = "inst/settings/CohortsToCreate.csv",
  jsonFolder = "inst/cohorts",
  sqlFolder = "inst/sql/sql_server"
)

# Create cohort tables
cohortTableNames <- getCohortTableNames(
  cohortTable = "my_study_cohort"
)

createCohortTables(
  connectionDetails = connectionDetails,
  cohortDatabaseSchema = "results",
  cohortTableNames = cohortTableNames
)

# Generate cohorts
cohortsGenerated <- generateCohortSet(
  connectionDetails = connectionDetails,
  cdmDatabaseSchema = "cdm",
  cohortDatabaseSchema = "results",
  cohortTableNames = cohortTableNames,
  cohortDefinitionSet = cohortDefinitionSet
)

print(cohortsGenerated)
# cohortId | cohortName              | status   | count
# 1        | New-Onset Type 2 DM     | COMPLETE | 4,200
# 2        | Acute MI                | COMPLETE |   890
# 3        | Metformin New Users     | COMPLETE | 3,100
```

---

## 3. コホート法 (推定)

### 3.1 研究デザイン

```r
library(CohortMethod)

# Target-Comparator-Outcome
tcos <- createTargetComparatorOutcomes(
  targetId = 1,         # Metformin
  comparatorId = 2,     # Sulfonylurea
  outcomeIds = c(3, 4), # MI, Stroke
  excludedCovariateConceptIds = c()
)

targetComparatorOutcomesList <- list(tcos)

# Covariate settings
covSettings <- createDefaultCovariateSettings(
  excludedCovariateConceptIds = c(),
  addDescendantsToExclude = TRUE
)

# Study parameters
getDbCmDataArgs <- createGetDbCohortMethodDataArgs(
  washoutPeriod = 365,
  maxCohortSize = 0,    # no limit
  covariateSettings = covSettings
)

# Propensity Score
createPsArgs <- createCreatePsArgs(
  maxCohortSizeForFitting = 150000,
  control = createControl(
    cvType = "auto",
    startingVariance = 0.01,
    tolerance = 2e-07,
    noiseLevel = "quiet"
  )
)

# Matching
matchOnPsArgs <- createMatchOnPsArgs(
  maxRatio = 1,         # 1:1 matching
  caliper = 0.2,
  caliperScale = "standardized logit"
)

# Outcome model
fitOutcomeModelArgs <- createFitOutcomeModelArgs(
  modelType = "cox",
  stratified = FALSE
)
```

### 3.2 実行と結果

```r
# Execute analysis
result <- runCmAnalyses(
  connectionDetails = connectionDetails,
  cdmDatabaseSchema = "cdm",
  exposureDatabaseSchema = "results",
  exposureTable = "my_study_cohort",
  outcomeDatabaseSchema = "results",
  outcomeTable = "my_study_cohort",
  outputFolder = "output/cm_results",
  cmAnalysisList = list(cmAnalysis),
  targetComparatorOutcomesList = targetComparatorOutcomesList
)

# Get results
analysisSummary <- summarizeAnalyses(result)
print(analysisSummary)

# target | comparator | outcome | rr   | ci95lb | ci95ub | p
# Met    | SU         | MI      | 0.62 | 0.39   | 0.98   | 0.041
# Met    | SU         | Stroke  | 0.78 | 0.55   | 1.12   | 0.18
```

---

## 4. 患者レベルの予測

### 4.1 モデル設計

```r
library(PatientLevelPrediction)

# Covariates
covSettings <- createCovariateSettings(
  useDemographicsGender = TRUE,
  useDemographicsAge = TRUE,
  useConditionOccurrenceLongTerm = TRUE,
  useDrugExposureLongTerm = TRUE,
  useMeasurementValueLongTerm = TRUE,
  useProcedureOccurrenceLongTerm = TRUE,
  longTermStartDays = -365,
  endDays = 0
)

# Population settings
populationSettings <- createStudyPopulationSettings(
  washoutPeriod = 365,
  firstExposureOnly = TRUE,
  removeSubjectsWithPriorOutcome = TRUE,
  riskWindowStart = 1,
  riskWindowEnd = 1825,  # 5 years
  minTimeAtRisk = 365
)

# Model settings
lasso <- setLassoLogisticRegression()
gbm <- setGradientBoostingMachine(
  ntrees = c(100, 300),
  maxDepth = c(4, 6),
  learnRate = c(0.01, 0.1)
)
```

### 4.2 実行と評価

```r
# Run prediction
plpResults <- runPlp(
  plpData = plpData,
  outcomeId = 3,                # CKD
  analysisId = "ckd_prediction",
  analysisName = "CKD Risk in DM",
  populationSettings = populationSettings,
  splitSettings = createDefaultSplitSetting(
    trainFraction = 0.75,
    testFraction = 0.25,
    nfold = 3
  ),
  modelSettings = lasso,
  executeSettings = createExecuteSettings(
    runSplitData = TRUE,
    runSampleData = FALSE,
    runfeatureEngineering = FALSE,
    runPreprocessData = TRUE,
    runModelDevelopment = TRUE,
    runCovariateSummary = TRUE
  )
)

# Performance
performance <- plpResults$performanceEvaluation
cat("AUC:", performance$evaluationStatistics$AUC, "\n")
cat("AUPRC:", performance$evaluationStatistics$AUPRC, "\n")
cat("Brier:", performance$evaluationStatistics$BrierScore, "\n")

# Kết quả:
# AUC:   0.82
# AUPRC: 0.35
# Brier: 0.08
```

### 4.3 光沢のある結果を表示する

```r
# Launch interactive viewer
viewPlp(plpResults, outputFolder = "output/plp_results")

# → Mở browser:
#   - ROC curve
#   - Calibration plot
#   - Feature importance
#   - Decision curve analysis
#   - Demographic parity
```

---

## 5. コホート診断

### 5.1 コホートの品質評価

```r
library(CohortDiagnostics)

# Chạy diagnostics
executeDiagnostics(
  cohortDefinitionSet = cohortDefinitionSet,
  connectionDetails = connectionDetails,
  cohortTable = "my_study_cohort",
  cohortDatabaseSchema = "results",
  cdmDatabaseSchema = "cdm",
  exportFolder = "output/diagnostics",
  databaseId = "Hospital_VN",
  minCellCount = 5
)

# Xem kết quả
createMergedResultsFile(
  dataFolder = "output/diagnostics",
  sqliteDbPath = "output/MergedCohortDiagnosticsData.sqlite"
)

launchDiagnosticsExplorer(
  sqliteDbPath = "output/MergedCohortDiagnosticsData.sqlite"
)
```

### 5.2 診断レポート

```
CohortDiagnostics cung cấp:

1. Cohort Count & Attrition
   → Bao nhiêu BN pass mỗi inclusion criteria?

2. Incidence Rate (over time)
   → Trend: tăng/giảm/ổn định?

3. Time Distribution
   → Observation time trước/sau index date

4. Concept Set Diagnostics
   → Orphan concepts (concepts bị miss)
   → Included source codes
   → Resolved concept set details

5. Index Event Breakdown
   → Source codes nào trigger cohort entry?

6. Visit Context
   → Inpatient, outpatient, ER?

7. Overlap
   → Bao nhiêu BN thuộc nhiều cohorts?
```

---

## 6. Strategus — パイプライン オーケストレーター

### 6.1 概念

```
Strategus = orchestrate toàn bộ analysis pipeline

Thay vì viết code riêng cho từng bước:
  1. CohortGenerator → tạo cohort
  2. CohortDiagnostics → kiểm tra
  3. Characterization → mô tả
  4. CohortMethod → estimation
  5. PatientLevelPrediction → prediction

Strategus ghép tất cả thành 1 pipeline JSON:
  analysisSpecifications.json → Execute once → All results
```

### 6.2 分析仕様の作成

```r
library(Strategus)

# Cohort generation module
cohortGenModule <- CohortGeneratorModule$new()
cohortGenModuleSpecs <- cohortGenModule$createModuleSpecifications(
  cohortDefinitionSet = cohortDefinitionSet
)

# Characterization module
characterizationModule <- CharacterizationModule$new()
charModuleSpecs <- characterizationModule$createModuleSpecifications(
  targetIds = c(1, 2),
  outcomeIds = c(3),
  minPriorObservation = 365
)

# Estimation module
estimationModule <- CohortMethodModule$new()
estModuleSpecs <- estimationModule$createModuleSpecifications(
  cmAnalysisList = list(cmAnalysis),
  targetComparatorOutcomesList = targetComparatorOutcomesList
)

# Combine all modules
analysisSpecifications <- createEmptyAnalysisSpecificiations() |>
  addModuleSpecifications(cohortGenModuleSpecs) |>
  addModuleSpecifications(charModuleSpecs) |>
  addModuleSpecifications(estModuleSpecs)

# Save
ParallelLogger::saveSettingsToJson(
  analysisSpecifications,
  "inst/analysisSpecifications.json"
)
```

### 6.3 戦略の実行

```r
# Execution settings
executionSettings <- createCdmExecutionSettings(
  connectionDetailsReference = "Hospital_VN",
  workDatabaseSchema = "results",
  cdmDatabaseSchema = "cdm",
  cohortTableNames = getCohortTableNames("strategus_cohort"),
  workFolder = "output/strategus_work",
  resultsFolder = "output/strategus_results",
  minCellCount = 5
)

# Store connection details (secure)
storeConnectionDetails(
  connectionDetails = connectionDetails,
  connectionDetailsReference = "Hospital_VN"
)

# Execute entire pipeline
execute(
  analysisSpecifications = analysisSpecifications,
  executionSettings = executionSettings,
  executionScriptFolder = "output/execution_scripts"
)

# → Tự động chạy: CohortGen → Diagnostics → Char → Estimation
# → Kết quả lưu trong resultsFolder
```

---

## 7. Eunomia — CDM テスト データベース

```r
# Eunomia: synthetic CDM database cho testing
library(Eunomia)

connectionDetails <- getEunomiaConnectionDetails()
# → Tự tạo SQLite CDM database với synthetic data

# Dùng để:
# - Test code trước khi chạy production
# - Unit testing cho R study packages
# - Training & workshops

# Ví dụ: test CohortMethod
library(CohortMethod)

cmData <- getDbCohortMethodData(
  connectionDetails = connectionDetails,
  cdmDatabaseSchema = "main",
  targetId = 1,
  comparatorId = 2,
  outcomeIds = 3,
  covariateSettings = createDefaultCovariateSettings()
)

summary(cmData)
# → CohortMethodData object
# → Target: 500 persons
# → Comparator: 480 persons
```

---

## 概要

|パッケージ |機能 | ATLASと同等 |
|----------|----------|--------|
|コホートジェネレーター |コホートの作成と管理 |コホートの定義 |
|コホート診断 |コホートの質の評価 | — |
|特徴抽出 |共変量の抽出 |特性評価 |
|コホートメソッド |因果推論（推定） |見積もり |
|患者レベル予測 | ML 予測モデル |予測 |
|ストラテジーアス |パイプライン オーケストレーター | — |
|ユーノミア |合成テスト CDM | — |

**次の記事**: OHDSI スタックを Docker と Kubernetes にデプロイする
