---
id: 019e0b20-b215-7a01-e001-f1a7f8000015
title: 第 15 課：HADES — 用於觀察研究的 R 包
slug: bai-15-hades-r-packages-cho-nghien-cuu-quan-sat
description: >-
  HADES（健康分析資料到證據套件）生態系統、CohortGenerator、CohortMethod、PatientLevelPrediction、CohortDiagnostics、Strategus
  — 從 R 命令列協調整個研究。
duration_minutes: 110
is_free: true
video_url: null
sort_order: 15
section_title: 第 5 部分：資料品質與進階分析
course:
  id: 019e0b20-b200-7a01-e001-f1a7f8000001
  title: OHDSI 和 OMOP CDM — 綜合醫療數據分析
  slug: ohdsi-omop-cdm-phan-tich-du-lieu-y-te-toan-dien
locale: zh-tw
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ 建築 — 第 15 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 15 課：HADES — 用於研究的 R 包</tspan>
      <tspan x="60" dy="42">觀察</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OHDSI 和 OMOP CDM — 綜合醫療數據分析</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 5 部分：資料品質與進階分析</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![第 15 課：HADES — 用於觀察研究的 R 包](/storage/uploads/2026/03/ohdsi-bai-15-hades-packages.webp)

## 簡介

**HADES**（健康分析資料到證據套件）是 OHDSI 的一套開源 **20 多個 R 軟體套件**，提供從佇列產生到估計/預測的整個分析流程。 ATLAS 是 GUI，HADES 是其背後的引擎。

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

## 1.HADES 生態系統

### 1.1 主包

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

### 1.2 安裝HADES

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

## 2. 群組產生器

### 2.1 從 R 建立群組

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

## 3. 群組方法（估計）

### 3.1 研究設計

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

### 3.2 執行&結果

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

## 4. 患者層級預測

### 4.1 模型設計

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

### 4.2 執行與評估

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

### 4.3 看閃亮結果

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

## 5. 佇列診斷

### 5.1 隊列品質評估

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

### 5.2 診斷報告

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

## 6.Strategus－管道編排器

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

### 6.2 建立分析規範

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

### 6.3 執行策略

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

## 7.Eunomia — CDM 測試資料庫

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

## 總結

|套餐 |功能|相當於ATLAS|
|--------|----------|--------------------|
|群組產生器 |建立與管理群組 |群組定義|
|隊列診斷 |評估隊列品質| — |
|特徵提取 |提取協變量 |表徵|
|隊列方法 |因果推論（估計）|估計|
|患者層級預測 |機器學習預測模型 |預測|
|策略 |管道編排器 | — |
|尤諾米亞 |綜合測試CDM | — |

**下一篇文章**：在 Docker 和 Kubernetes 上部署 OHDSI 堆疊
