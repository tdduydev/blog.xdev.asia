---
id: 019e0b20-b213-7a01-e001-f1a7f8000013
title: 第 13 課：ACHILLES — 資料表徵與來源分析
slug: bai-13-achilles-data-characterization-source-profiling
description: >-
  安裝 ACHILLES、在 CDM 上執行資料特徵、分析報告（人口統計、條件、藥物、觀察結果）、ACHILLES Heel — 偵測資料錯誤、在 ATLAS
  中整合資料來源。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 13
section_title: 第 5 部分：資料品質與進階分析
course:
  id: 019e0b20-b200-7a01-e001-f1a7f8000001
  title: OHDSI 和 OMOP CDM — 綜合醫療數據分析
  slug: ohdsi-omop-cdm-phan-tich-du-lieu-y-te-toan-dien
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-2457" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-2457)"/>

  <!-- Decorations -->
  <g>
    <circle cx="681" cy="153" r="14" fill="#34d399" opacity="0.08"/>
    <circle cx="762" cy="194" r="17" fill="#34d399" opacity="0.11"/>
    <circle cx="843" cy="235" r="20" fill="#34d399" opacity="0.14"/>
    <circle cx="924" cy="276" r="23" fill="#34d399" opacity="0.07"/>
    <circle cx="1005" cy="57" r="26" fill="#34d399" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <line x1="600" y1="163" x2="1100" y2="243" stroke="#34d399" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="193" x2="1050" y2="263" stroke="#34d399" stroke-width="0.5" opacity="0.08"/>
    <polygon points="995.9089653438086,144 995.9089653438086,182 963,201 930.0910346561914,182 930.0910346561914,144 963,125" fill="none" stroke="#34d399" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#34d399"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#34d399" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#34d399">🏗️ 建築 — 第 13 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 13 課：阿基里斯 — 資料表徵和</tspan>
      <tspan x="60" dy="42">來源分析</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OHDSI 和 OMOP CDM — 綜合醫療數據分析</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 5 部分：資料品質與進階分析</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![第 13 課：ACHILLES — 資料表徵與來源分析](/storage/uploads/2026/03/ohdsi-bai-13-achilles.webp)

## 簡介

**ACHILLES**（大規模縱向證據系統健康資訊的自動表徵）是一種為 CDM 資料庫建立**描述性統計資料**的工具。 ACHILLES 結果顯示在 ATLAS 資料來源中，有助於在分析之前了解資料。

```
Vai trò ACHILLES trong workflow:

ETL → CDM Database → ┬→ ACHILLES ─→ Data Sources (ATLAS)
                      │              "Dữ liệu trông thế nào?"
                      │
                      ├→ DQD ──────→ Data Quality Report
                      │              "Dữ liệu có đúng không?"
                      │
                      └→ Analysis ─→ Cohort, Estimation, Prediction
                                     "Dữ liệu nói gì?"
```

---

## 1. 安裝阿基里斯

### 1.1 要求

```
- R ≥ 4.0
- Java Runtime (cho DatabaseConnector / JDBC)
- CDM database đã có data
- WebAPI đã cấu hình source
```

### 1.2 安裝R套件

```r
# Cài từ GitHub
install.packages("remotes")
remotes::install_github("OHDSI/Achilles")

# Dependencies sẽ tự cài:
#   DatabaseConnector, SqlRender, ParallelLogger
```

### 1.3 設定連接

```r
library(Achilles)
library(DatabaseConnector)

connectionDetails <- createConnectionDetails(
  dbms = "postgresql",
  server = "localhost/ohdsi",
  user = "ohdsi_app",
  password = keyring::key_get("ohdsi_password"),
  port = 5432
)

# Kiểm tra kết nối
conn <- connect(connectionDetails)
querySql(conn, "SELECT COUNT(*) FROM cdm.person")
disconnect(conn)
```

---

## 2. 運行阿基里斯

### 2.1 完整運行

```r
achilles(
  connectionDetails = connectionDetails,
  cdmDatabaseSchema = "cdm",
  resultsDatabaseSchema = "results",
  vocabDatabaseSchema = "cdm",
  sourceName = "Hospital_VN_2024",
  cdmVersion = "5.4",
  createTable = TRUE,
  smallCellCount = 5,          # ẩn cell < 5 (privacy)
  numThreads = 4,
  tempEmulationSchema = NULL
)
```

### 2.2 建立ACHILLES表

```sql
-- ACHILLES tạo 2 bảng chính trong results schema:

-- 1. achilles_results: aggregate statistics
SELECT * FROM results.achilles_results LIMIT 5;

-- analysis_id  | stratum_1   | stratum_2 | count_value
-- 1            | NULL        | NULL      | 150000      ← tổng patients
-- 2            | NULL        | NULL      | 2500000     ← tổng visits
-- 101          | 8507        | NULL      | 78000       ← male count
-- 101          | 8532        | NULL      | 72000       ← female count
-- 200          | 201826      | NULL      | 45000       ← Type 2 DM count

-- 2. achilles_results_dist: distribution statistics
SELECT * FROM results.achilles_results_dist LIMIT 3;

-- analysis_id | stratum_1 | min  | p10  | p25  | median | p75  | p90  | max
-- 103         | NULL      | 0    | 12   | 25   | 45     | 62   | 78   | 105  ← age dist
-- 203         | 201826    | 1    | 10   | 30   | 90     | 180  | 365  | 3650 ← DM duration
```

### 2.3 分析重要ID

```
Analysis ID  | Mô tả
─────────────┼─────────────────────────────────────────
1            | Number of persons
2            | Number of visits
101          | Gender distribution
103          | Age at first obs distribution
108          | Obs period length distribution
200          | Condition occurrence counts by concept
400          | Condition era counts
700          | Drug exposure counts by concept
800          | Observation counts
1800         | Measurement counts by concept
2100         | Procedure counts by concept
```

---

## 3. ATLAS 中的 ACHILLES 報告

### 3.1 啟動資料來源

```
Sau khi chạy ACHILLES:
1. WebAPI tự đọc bảng achilles_results
2. ATLAS → Data Sources → chọn source

Nếu chưa thấy:
  WebAPI → source config → achillesResultsSchema = "results"
  Refresh WebAPI cache
```

### 3.2 概覽儀表板

```
ATLAS → Data Sources → Hospital_VN_2024

┌─────────────────────────────────────────────────────────┐
│  Hospital_VN_2024 — Data Source Report                  │
│                                                         │
│  Persons:      150,000                                  │
│  Records:      12,500,000                               │
│  Obs Period:   2015-01-01 → 2024-12-31                  │
│                                                         │
│  Tabs:                                                  │
│  [Dashboard] [Conditions] [Drugs] [Procedures]          │
│  [Measurements] [Observations] [Visits] [Death]         │
│                                                         │
│  Gender:                                                │
│  ████████████████ Male (52%)                            │
│  ██████████████   Female (48%)                          │
│                                                         │
│  Age Distribution:                                      │
│  0-9:  ██ 8%                                            │
│  10-19: ███ 12%                                         │
│  20-29: █████ 15%                                       │
│  30-39: ██████ 18%                                      │
│  40-49: ████████ 20%                                    │
│  50-59: ██████ 16%                                      │
│  60-69: ███ 7%                                          │
│  70+:   ██ 4%                                           │
└─────────────────────────────────────────────────────────┘
```

### 3.3 狀況報告

```
ATLAS → Data Sources → Conditions

Top 20 Conditions:
┌────┬──────────────────────────────────┬─────────┬────────┐
│ #  │ Condition                        │ Persons │ %      │
├────┼──────────────────────────────────┼─────────┼────────┤
│  1 │ Essential hypertension           │ 45,000  │ 30.0%  │
│  2 │ Type 2 diabetes mellitus         │ 35,000  │ 23.3%  │
│  3 │ Hyperlipidemia                   │ 28,000  │ 18.7%  │
│  4 │ Upper respiratory infection      │ 25,000  │ 16.7%  │
│  5 │ Osteoarthritis                   │ 18,000  │ 12.0%  │
│  6 │ Chronic kidney disease           │ 12,000  │  8.0%  │
│  7 │ Ischemic heart disease           │ 10,000  │  6.7%  │
│  8 │ Depression                       │  8,500  │  5.7%  │
└────┴──────────────────────────────────┴─────────┴────────┘

Drill-down per condition:
  - Prevalence by month (trend over time)
  - Age at first diagnosis distribution
  - Type (inpatient / outpatient / ER)
  - Frequency distribution per person
```

### 3.4 藥物報告

```
ATLAS → Data Sources → Drugs

Drug Exposure by Class (ATC):
┌──────────────────────────────────────────────────┐
│  A10 — Drugs for diabetes                        │
│  ├── Metformin:       25,000 persons             │
│  ├── Glimepiride:      8,000 persons             │
│  ├── Insulin Glargine: 5,000 persons             │
│  └── Empagliflozin:    3,000 persons             │
│                                                  │
│  C09 — ACE Inhibitors & ARBs                     │
│  ├── Enalapril:       15,000 persons             │
│  ├── Losartan:        12,000 persons             │
│  └── Valsartan:        8,000 persons             │
│                                                  │
│  C10 — Lipid Lowering Agents                     │
│  ├── Atorvastatin:    20,000 persons             │
│  ├── Rosuvastatin:    10,000 persons             │
│  └── Simvastatin:      5,000 persons             │
└──────────────────────────────────────────────────┘

Duration distribution, frequency, dosage patterns
```

---

## 4.阿基里斯之踵

### 4.1 資料品質警告

```r
# ACHILLES Heel chạy tự động cùng achilles()
# Kết quả lưu trong bảng achilles_heel_results

# Xem warnings:
conn <- connect(connectionDetails)
heel <- querySql(conn, "
  SELECT *
  FROM results.achilles_heel_results
  ORDER BY record_count DESC
  LIMIT 20
")
disconnect(conn)
```

### 4.2 腳跟警告範例

```
┌─────┬──────────────────────────────────────────────┬──────────┐
│ ID  │ Warning Message                              │ Severity │
├─────┼──────────────────────────────────────────────┼──────────┤
│   1 │ 5,200 records with date before 1900          │ ERROR    │
│   2 │ 800 persons with age > 150 years             │ ERROR    │
│   3 │ Condition_occurrence has 12% unmapped codes  │ WARNING  │
│   4 │ Drug_exposure end_date < start_date (350)    │ ERROR    │
│   5 │ 15% persons with observation < 30 days       │ WARNING  │
│   6 │ Measurement has no unit_concept_id (25%)     │ WARNING  │
│   7 │ Visit_occurrence has 0 ER visits             │ NOTICE   │
│   8 │ Death records only from 2020+ (COVID bias?)  │ NOTICE   │
└─────┴──────────────────────────────────────────────┴──────────┘

Severity levels:
  ERROR:   Lỗi nghiêm trọng cần fix trước khi phân tích
  WARNING: Vấn đề nên xử lý nhưng không block
  NOTICE:  Thông tin cần kiểm tra
```

### 4.3 處理腳跟警告

```sql
-- Fix ERROR #1: Records with date before 1900
UPDATE cdm.condition_occurrence
SET condition_start_date = NULL
WHERE condition_start_date < '1900-01-01';

-- Fix ERROR #2: Age > 150
DELETE FROM cdm.person
WHERE EXTRACT(YEAR FROM CURRENT_DATE) - year_of_birth > 150;

-- Fix ERROR #4: end_date < start_date
UPDATE cdm.drug_exposure
SET drug_exposure_end_date = drug_exposure_start_date
WHERE drug_exposure_end_date < drug_exposure_start_date;

-- Sau khi fix: chạy lại ACHILLES
```

---

## 5.增量模式

### 5.1 讓阿基里斯跑得更快

```r
# Lần đầu: full run (~2-4 giờ cho 1M patients)
# Lần sau: incremental (chỉ update thay đổi)

achilles(
  connectionDetails = connectionDetails,
  cdmDatabaseSchema = "cdm",
  resultsDatabaseSchema = "results",
  sourceName = "Hospital_VN_2024",
  cdmVersion = "5.4",
  createTable = FALSE,       # không tạo lại bảng
  updateGivenAnalysesOnly = TRUE,
  analysisIds = c(1, 101, 200, 700, 1800)  # chỉ update analyses cần
)
```

### 5.2 使用 cron 實現自動化

```bash
#!/bin/bash
# /opt/ohdsi/scripts/run_achilles.sh

cd /opt/ohdsi/achilles
Rscript -e '
library(Achilles)
library(DatabaseConnector)

connectionDetails <- createConnectionDetails(
  dbms = "postgresql",
  server = Sys.getenv("CDM_DB_SERVER"),
  user = Sys.getenv("CDM_DB_USER"),
  password = Sys.getenv("CDM_DB_PASS"),
  port = 5432
)

achilles(
  connectionDetails = connectionDetails,
  cdmDatabaseSchema = "cdm",
  resultsDatabaseSchema = "results",
  sourceName = "Hospital_VN_2024",
  cdmVersion = "5.4",
  numThreads = 4
)

cat("ACHILLES completed:", format(Sys.time()), "\n")
'
```

```cron
# Chạy ACHILLES hàng tuần (Chủ nhật 2:00 AM)
0 2 * * 0 /opt/ohdsi/scripts/run_achilles.sh >> /var/log/achilles.log 2>&1
```

---

## 總結

|成分|功能|
|------------|----------|
|阿喀琉斯核心|計算CDM資料庫的總結統計|
|阿基里斯結果 |該表包含計數、盛行率 |
|阿基里斯結果距離 |包含分佈的表（p10、p25、中位數...）|
|阿基里斯之踵 |偵測資料品質問題（錯誤/警告/通知）|
| ATLAS 資料來源 |以儀表板格式顯示 ACHILLES 結果 |
| 增量模式 |運轉速度快－只更新變化|

**下一篇文章**：資料品質儀表板 - 評估 CDM 資料質量
