---
id: 02770003-omop-cdm5-b001-000000000007
title: "HADES Analytics: PLE, PLP, Characterization với R cho RWE"
slug: omop-hades-r-analytics-ple-plp
excerpt: >-
  HADES (Health Analytics Data-to-Evidence Suite) là bộ R package OHDSI để chạy
  Patient-Level Estimation, Patient-Level Prediction, Characterization, Self-
  Controlled Case Series. Bài viết hướng dẫn từ install đến publish network study.
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

ATLAS giải quyết phần "định nghĩa cohort" và "characterization" cơ bản. Khi cần phương pháp thống kê nâng cao (causal inference, ML), bạn cần **HADES** — bộ R package chính thức của OHDSI. Bài viết tổng quan stack, workflow PLE/PLP và publish nghiên cứu network.

## 1. HADES là gì

![1. HADES là gì](/images/blog/diagrams/omop-hades-r-analytics-ple-plp-d01.webp)

40+ R package, MIT licensed, install qua CRAN hoặc GitHub.

## 2. Cài đặt

```r
# Install Strategus (orchestrator) - kéo theo các package khác
install.packages("Strategus")

# Hoặc install riêng
install.packages(c(
  "DatabaseConnector", "SqlRender", "FeatureExtraction",
  "CohortMethod", "PatientLevelPrediction", "Characterization",
  "CohortDiagnostics", "Achilles", "DataQualityDashboard"
))

# JDBC driver cho Postgres
DatabaseConnector::downloadJdbcDrivers("postgresql")
```

Yêu cầu R >= 4.2, Java >= 11, RAM 16GB+ cho dataset 1M+ person.

## 3. Connect database

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

**PLE** trả lời: "Thuốc A vs Thuốc B, cái nào ít gây side effect X hơn?" Comparative effectiveness research.

![4. CohortMethod — Patient-Level Estimation (PLE)](/images/blog/diagrams/omop-hades-r-analytics-ple-plp-d02.webp)

### 4.1 Workflow PLE

```r
library(CohortMethod)

# 1. Extract data
cmData <- getDbCohortMethodData(
  connectionDetails = connectionDetails,
  cdmDatabaseSchema = cdmDatabaseSchema,
  targetId = 1,         # Cohort A id
  comparatorId = 2,     # Cohort B id
  outcomeIds = c(3),    # Outcome cohort
  covariateSettings = createDefaultCovariateSettings()
)

# 2. Propensity score model
ps <- createPs(
  cohortMethodData = cmData,
  prior = createPrior("laplace", exclude = c(0))
)

# 3. Match 1:1 nearest neighbor
strataPop <- matchOnPs(ps, maxRatio = 1)

# 4. Outcome model (Cox)
outcomeModel <- fitOutcomeModel(
  population = strataPop,
  modelType = "cox",
  stratified = TRUE
)

summary(outcomeModel)
# Hazard Ratio: 0.85 (95% CI 0.78-0.93)
```

### 4.2 Diagnostic chuẩn OHDSI

Trước khi tin kết quả, phải check:
- **Equipoise**: PS overlap đủ giữa 2 cohort
- **Covariate balance**: SMD < 0.1 cho mọi covariate sau matching
- **Negative control distribution**: HR negative control phải gần 1
- **Empirical calibration**: adjust HR theo systematic error

OHDSI chuẩn: chỉ public kết quả pass mọi diagnostic.

## 5. PatientLevelPrediction (PLP) — ML

**PLP** trả lời: "Bệnh nhân X có khả năng bao nhiêu % bị Y trong T ngày tới?"

![5. PatientLevelPrediction (PLP) — ML](/images/blog/diagrams/omop-hades-r-analytics-ple-plp-d03.webp)

### 5.1 PLP code

```r
library(PatientLevelPrediction)

# 1. Get plpData
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

# 3. Train Lasso
modelSettings <- setLassoLogisticRegression()
results <- runPlp(
  plpData = plpData,
  population = population,
  modelSettings = modelSettings,
  splitSettings = createDefaultSplitSetting(splitSeed = 42)
)

# 4. View
viewPlp(results)
# AUC = 0.78, calibration intercept = -0.05
```

### 5.2 External validation

External validation = chạy model trained trên CDM A → predict trên CDM B (cùng schema, dữ liệu khác). Đây là vàng cho clinical ML — chứng minh model generalizable.

```r
externalValidatePlp(
  plpResult = results,
  validationDatabaseDetails = list(otherCdmDetails)
)
```

## 6. Characterization (cohort comparison nâng cao)

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

Output: time-to-event, dechallenge-rechallenge (drug-event causality), aggregate covariate cohort A vs B.

## 7. SelfControlledCaseSeries (SCCS)

Method dùng khi không có comparator group — bệnh nhân làm comparator chính mình (compare period exposed vs unexposed). Phù hợp pharmacovigilance cho thuốc ít người dùng.

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

## 8. Strategus — orchestrate đa method

Strategus là JSON config + R workflow để chạy toàn pipeline (DQ → CohortDiagnostics → PLE → PLP → Char) cho 1 study.

```r
library(Strategus)

# 1. Define modules
analysisSpecifications <- createEmptyAnalysisSpecificiations() %>%
  addCharacterizationModuleSpecifications(...) %>%
  addCohortMethodModuleSpecifications(...) %>%
  addPatientLevelPredictionModuleSpecifications(...)

# 2. Run on local CDM
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

Output cùng schema → upload lên central server cho meta-analysis.

## 9. Network studies pattern

![9. Network studies pattern](/images/blog/diagrams/omop-hades-r-analytics-ple-plp-d04.webp)

VN có thể tham gia với vai trò Site — không cần kỹ năng coding cao, chỉ cần CDM + chạy package R.

## 10. EvidenceSynthesis (meta-analysis)

Khi có result từ N site:

```r
library(EvidenceSynthesis)

# Input: per-site HR + log SE
results <- data.frame(
  site = c("VN", "EU1", "EU2", "US1"),
  logRr = c(-0.16, -0.20, -0.18, -0.22),
  seLogRr = c(0.05, 0.04, 0.03, 0.02)
)

# Random-effects meta-analysis
meta <- computeBayesianMetaAnalysis(results)
plotMetaAnalysisForest(meta, results)
```

## 11. Common pitfall HADES

- ❌ Quên negative controls → kết quả systematic bias không adjust
- ❌ Train PLP không có external validation → overfit không phát hiện
- ❌ PS model không bao gồm key confounder → bias
- ❌ Cohort overlap target và comparator → bias mạnh
- ❌ Không check covariate balance sau matching → analysis vô nghĩa
- ❌ Test set leak từ feature extraction → AUC giả cao

## 12. Tài liệu HADES

- **Book of OHDSI** chương 12-15 (PLE, PLP, SCCS, network study)
- HADES website: ohdsi.github.io/Hades/
- OHDSI Forum: forums.ohdsi.org
- Strategus tutorial videos
- Case studies trên Atlas Demo

## 13. Lộ trình học HADES

1. Học SQL OMOP và ATLAS (1 tháng)
2. R + tidyverse cơ bản (2 tuần)
3. CohortDiagnostics — chạy diagnostic cho 1 cohort (1 tuần)
4. CohortMethod tutorial trên Eunomia (2 tuần)
5. PatientLevelPrediction tutorial (2 tuần)
6. Tham gia 1 network study với role contributor (1-2 tháng)
7. Lead 1 study nhỏ (3-6 tháng)

## 14. Use case VN

| Câu hỏi | Method |
|---|---|
| Chiến lược điều trị tăng huyết áp nào tốt nhất cho người Việt? | CohortMethod (PLE) |
| Dự đoán bệnh nhân tiểu đường nào sẽ readmit? | PatientLevelPrediction (PLP) |
| So sánh epidemiology bệnh K với phương Tây | Characterization |
| Theo dõi side effect thuốc mới sau khi cấp phép | SelfControlledCaseSeries |
| Tham gia DARWIN EU study | Strategus + share aggregate result |

## Kết luận

HADES biến CDM thành phòng thí nghiệm RWE đầy đủ. Đầu tư học HADES = đầu tư trở thành OHDSI Practitioner thực sự. VN có cơ hội lớn với network study EHDEN/DARWIN/N3C.

Bài tiếp: [Production OMOP — Postgres tuning, partition, security](/blog/omop-production-postgres-tuning-deployment).
