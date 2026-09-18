---
id: 019e0b20-b204-7a01-e001-f1a7f8000004
title: 第 4 課：WhiteRabbit 和 Rabbit-in-a-Hat — 來源資料調查和 ETL 設計
slug: bai-4-whiterabbit-rabbit-in-a-hat-khao-sat-du-lieu-thiet-ke-etl
description: >-
  安裝並使用 WhiteRabbit 掃描來源資料、分析掃描報告、使用 Rabbit-in-a-Hat 設計表到表格和欄位到欄位對應、建立 ETL
  規格文件以及 ETL 團隊的標準工作流程。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 4
section_title: 第 2 部分：ETL 和數據標準化
course:
  id: 019e0b20-b200-7a01-e001-f1a7f8000001
  title: OHDSI 和 OMOP CDM — 綜合醫療數據分析
  slug: ohdsi-omop-cdm-phan-tich-du-lieu-y-te-toan-dien
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-523" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-523)"/>

  <!-- Decorations -->
  <g>
    <circle cx="913" cy="169" r="16" fill="#c084fc" opacity="0.14"/>
    <circle cx="726" cy="42" r="35" fill="#c084fc" opacity="0.13"/>
    <circle cx="1039" cy="175" r="24" fill="#c084fc" opacity="0.12000000000000001"/>
    <circle cx="852" cy="48" r="13" fill="#c084fc" opacity="0.11"/>
    <circle cx="665" cy="181" r="32" fill="#c084fc" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <line x1="600" y1="99" x2="1100" y2="179" stroke="#c084fc" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="129" x2="1050" y2="199" stroke="#c084fc" stroke-width="0.5" opacity="0.08"/>
    <polygon points="978.444863728671,132 978.444863728671,166 949,183 919.555136271329,166 919.555136271329,132 949,115" fill="none" stroke="#c084fc" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#c084fc"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#c084fc" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#c084fc">🏗️ 建築 — 第 4 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 4 課：白兔與戴帽子的兔子 —</tspan>
      <tspan x="60" dy="42">來源資料調查和 ETL 設計</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OHDSI 和 OMOP CDM — 綜合醫療數據分析</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 2 部分：ETL 和數據標準化</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![第四課：白兔和戴帽子的兔子](/storage/uploads/2026/03/ohdsi-bai-4-whiterabbit-rabbit-in-a-hat.webp)

## 簡介

在編寫任何 ETL 程式碼之前，您需要**了解來源資料**並**設計到 OMOP CDM 的映射**。兩個 OHDSI 工具可協助解決此問題：

- **WhiteRabbit**：掃描來源資料庫/CSV，建立有關表格、欄位、值的詳細報告
- **Rabbit-in-a-Hat**：GUI工具設計映射表→表格、字段→字段

---

## 1.WhiteRabbit — 掃描來源數據

### 1.1 安裝

```bash
# Download từ GitHub releases
# https://github.com/OHDSI/WhiteRabbit/releases

# Yêu cầu: Java 17+
java -version

# Chạy WhiteRabbit
java -jar WhiteRabbit.jar
```

### 1.2 白兔接口

```
┌─────────────────────────────────────────────────────┐
│  WhiteRabbit                                        │
│                                                     │
│  Source Data Location                                │
│  ┌─────────────────────────────────────────────┐    │
│  │ Type: [PostgreSQL ▼]                        │    │
│  │ Server: localhost                            │    │
│  │ Port: 5432                                   │    │
│  │ Database: hospital_db                        │    │
│  │ User: admin                                  │    │
│  │ Password: ****                               │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  Scan Options                                       │
│  ☑ Scan field values (top 1000 per field)           │
│  ☑ Calculate value frequencies                       │
│  ☑ Min/Max values                                    │
│  □ Scan all tables (or select specific)              │
│                                                     │
│  [Connect]  [Scan Tables]  [Generate Report]        │
└─────────────────────────────────────────────────────┘
```

### 1.3 支援資料來源

```
Database:
- PostgreSQL, MySQL, SQL Server, Oracle
- Amazon Redshift, Microsoft APS
- Microsoft Access

File:
- CSV (comma-separated)
- TSV (tab-separated)
- SAS Transport files (.xpt)
```

### 1.4 執行掃描

```
Bước 1: Chọn loại source data (Database hoặc Delimited text files)
Bước 2: Nhập connection details
Bước 3: Click "Connect" → hiển thị danh sách tables
Bước 4: Chọn tables cần scan (hoặc Select All)
Bước 5: Cấu hình scan options:
         - Rows per table: 100,000 (default, đủ cho profiling)
         - Min cell count: 5 (ẩn values có < 5 records — bảo vệ PII)
         - Max distinct values: 1,000
Bước 6: Click "Scan Tables"
Bước 7: Chọn thư mục output → Generate "ScanReport.xlsx"
```

### 1.5 掃描報告分析

```
ScanReport.xlsx chứa các sheets:

Sheet "Overview":
┌──────────────────┬──────────┬───────────┐
│ Table            │ Rows     │ Fields    │
├──────────────────┼──────────┼───────────┤
│ patients         │ 50,000   │ 12        │
│ encounters       │ 350,000  │ 18        │
│ diagnoses        │ 1,200,000│ 8         │
│ medications      │ 800,000  │ 15        │
│ lab_results      │ 2,500,000│ 10        │
└──────────────────┴──────────┴───────────┘

Sheet "patients":
┌──────────────┬──────────┬──────────────┬─────────────────────┐
│ Field        │ Type     │ N rows       │ Top Values          │
├──────────────┼──────────┼──────────────┼─────────────────────┤
│ patient_id   │ VARCHAR  │ 50,000       │ BN001, BN002, ...   │
│ gender       │ VARCHAR  │ 50,000       │ M(52%), F(48%)      │
│ birth_date   │ DATE     │ 49,800       │ Min:1920, Max:2024  │
│ ethnicity    │ VARCHAR  │ 45,000       │ Kinh(85%), Tày(5%)  │
│ phone        │ VARCHAR  │ 48,000       │ 09xx..., 03xx...    │
└──────────────┴──────────┴──────────────┴─────────────────────┘

Sheet "diagnoses":
┌──────────────┬──────────┬──────────────┬─────────────────────┐
│ Field        │ Type     │ N rows       │ Top Values          │
├──────────────┼──────────┼──────────────┼─────────────────────┤
│ diagnosis_id │ INT      │ 1,200,000    │                     │
│ patient_id   │ VARCHAR  │ 1,200,000    │                     │
│ encounter_id │ INT      │ 1,200,000    │                     │
│ icd_code     │ VARCHAR  │ 1,200,000    │ I10(15%), J06(8%)   │
│ diagnosis_dt │ DATE     │ 1,198,000    │ Min:2018, Max:2024  │
│ diag_type    │ VARCHAR  │ 1,200,000    │ MAIN(60%), SUB(40%) │
└──────────────┴──────────┴──────────────┴─────────────────────┘
```

**掃描報告的重要發現**：
```
✅ Phát hiện PII (phone, address) → cần loại bỏ/hash trong ETL
✅ Null rates: birth_date 200 nulls (0.4%) → acceptable
✅ Value distributions: gender chỉ có M/F → mapping đơn giản
✅ Date format: YYYY-MM-DD → chuẩn, không cần transform
✅ icd_code: ICD-10 codes → mapping via Athena
⚠️ ethnicity: 5000 nulls (10%) → cần xử lý default value
⚠️ diagnosis_dt: 2000 nulls → condition_start_date NOT NULL trong CDM!
```

---

## 2. 戴帽子的兔子 — ETL 映射設計

### 2.1 打開帽子裡的兔子

```bash
# Rabbit-in-a-Hat đi kèm trong package WhiteRabbit
java -jar WhiteRabbit.jar

# Hoặc chạy riêng
java -jar RabbitInAHat.jar
```

### 2.2 工作流程

```
Bước 1: File → Open Scan Report → Chọn ScanReport.xlsx
         → Hiển thị source tables bên trái

Bước 2: Tải OMOP CDM schema
         → Hiển thị CDM tables bên phải

Bước 3: Kéo thả mapping table → table
         ┌────────────┐          ┌─────────────────────┐
         │ patients   │ ───────→ │ PERSON              │
         │ encounters │ ───────→ │ VISIT_OCCURRENCE     │
         │ diagnoses  │ ───────→ │ CONDITION_OCCURRENCE │
         │ medications│ ───────→ │ DRUG_EXPOSURE        │
         │ lab_results│ ───────→ │ MEASUREMENT          │
         └────────────┘          └─────────────────────┘

Bước 4: Double-click mapping arrow → mở field-level mapping
         ┌─ patients ────────┐    ┌─ PERSON ─────────────────┐
         │ patient_id    ────┼───→│ person_source_value      │
         │ gender         ───┼───→│ gender_source_value      │
         │                   │    │ gender_concept_id (logic) │
         │ birth_date    ───┼───→│ birth_datetime           │
         │                   │    │ year_of_birth (extract)   │
         │                   │    │ month_of_birth (extract)  │
         │ ethnicity     ───┼───→│ ethnicity_source_value   │
         └───────────────────┘    └──────────────────────────┘

Bước 5: Thêm logic/comments cho mỗi field mapping
         gender → gender_concept_id:
         "CASE WHEN gender = 'M' THEN 8507
               WHEN gender = 'F' THEN 8532
               ELSE 0 END"

Bước 6: Export ETL specification document (Word/HTML)
```

### 2.3 映射介面

```
┌─────────────────────────────────────────────────────────────┐
│  Rabbit-in-a-Hat                                            │
│                                                             │
│  Source Tables          Mapping           CDM Tables         │
│  ┌────────────┐                          ┌──────────────┐  │
│  │ patients   │ ═══════════════════════→ │ PERSON       │  │
│  │ (50,000)   │                          │              │  │
│  ├────────────┤                          ├──────────────┤  │
│  │ encounters │ ═══════════════════════→ │ VISIT_       │  │
│  │ (350,000)  │                          │ OCCURRENCE   │  │
│  ├────────────┤                          ├──────────────┤  │
│  │ diagnoses  │ ═══════════════════════→ │ CONDITION_   │  │
│  │ (1,200,000)│                          │ OCCURRENCE   │  │
│  ├────────────┤                          ├──────────────┤  │
│  │ medications│ ═══════════════════════→ │ DRUG_        │  │
│  │ (800,000)  │                          │ EXPOSURE     │  │
│  ├────────────┤                          ├──────────────┤  │
│  │ lab_results│ ═══════════════════════→ │ MEASUREMENT  │  │
│  │ (2,500,000)│                          │              │  │
│  └────────────┘                          └──────────────┘  │
│                                                             │
│  [Add Mapping]  [Details]  [Export]  [Save]                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 3.ETL規範文檔

### 3.1 映射規格範例

```
Table: patients → PERSON

┌───────────────────┬───────────────────────┬─────────────────────────────┐
│ Source Field      │ CDM Field             │ Logic                       │
├───────────────────┼───────────────────────┼─────────────────────────────┤
│ patient_id        │ person_source_value   │ Direct copy                 │
│ [generated]       │ person_id             │ Auto-increment sequence     │
│ gender            │ gender_source_value   │ Direct copy                 │
│ gender            │ gender_concept_id     │ M→8507, F→8532, else→0     │
│ birth_date        │ birth_datetime        │ Direct copy                 │
│ birth_date        │ year_of_birth         │ EXTRACT(YEAR FROM birth_dt) │
│ birth_date        │ month_of_birth        │ EXTRACT(MONTH FROM birth_dt)│
│ birth_date        │ day_of_birth          │ EXTRACT(DAY FROM birth_dt)  │
│ ethnicity         │ ethnicity_source_value│ Direct copy                 │
│ ethnicity         │ ethnicity_concept_id  │ Kinh→38003564, else→0      │
│ [constant]        │ race_concept_id       │ 8515 (Asian)               │
└───────────────────┴───────────────────────┴─────────────────────────────┘

Table: diagnoses → CONDITION_OCCURRENCE

┌───────────────────┬──────────────────────────┬──────────────────────────┐
│ Source Field      │ CDM Field                │ Logic                    │
├───────────────────┼──────────────────────────┼──────────────────────────┤
│ [generated]       │ condition_occurrence_id  │ Auto-increment           │
│ patient_id        │ person_id               │ Lookup patients mapping  │
│ icd_code          │ condition_source_value   │ Direct copy              │
│ icd_code          │ condition_source_concept_│ Lookup SOURCE_TO_CONCEPT │
│                   │ id                       │ _MAP or CONCEPT table    │
│ icd_code          │ condition_concept_id     │ Via "Maps to" relation   │
│ diagnosis_dt      │ condition_start_date     │ Direct copy              │
│ [null]            │ condition_end_date       │ NULL (không có end date) │
│ [constant]        │ condition_type_concept_id│ 32817 (EHR)             │
│ encounter_id      │ visit_occurrence_id      │ Lookup encounters mapping│
│ diag_type         │ condition_status_concept_│ MAIN→32902, SUB→32908   │
│                   │ id                       │                          │
└───────────────────┴──────────────────────────┴──────────────────────────┘
```

---

## 4. 最佳實踐

### 4.1 OHDSI 標準 ETL 流程

```
1. Scan source data (WhiteRabbit)                    ← 1-2 ngày
2. Review scan report với domain experts             ← 1-2 ngày
3. Design ETL mapping (Rabbit-in-a-Hat)              ← 1-2 tuần
4. Map source codes → Standard Concepts (Usagi)      ← 1-2 tuần
5. Implement ETL scripts                             ← 2-4 tuần
6. Load data & run ACHILLES + DQD                    ← 1-2 ngày
7. Review quality issues, fix ETL                    ← 1-2 tuần
8. Repeat steps 5-7 until quality acceptable         ← iterations
```

### 4.2 重要提示

```
WhiteRabbit:
- Min cell count = 5: ẩn values có ít records → bảo vệ PII
- KHÔNG scan columns chứa free-text notes (HIPAA risk)
- Scan nên chạy trên bản copy, không trên production database

Rabbit-in-a-Hat:
- Lưu file .json.gz thường xuyên (format riêng của RiaH)
- 1 source table có thể map sang nhiều CDM tables
  Ví dụ: encounters → VISIT_OCCURRENCE + OBSERVATION_PERIOD
- Document logic phức tạp trong Comments
- Organize ETL team review sessions (RiaH projected on screen)
```

---

## 總結

|工具|目的|輸出|
|--------|--------|--------|
|白兔 |掃描來源資料、分析 |掃描報告.xlsx |
|戴帽子的兔子 | ETL映射設計GUI | ETL規格文件|

|步驟|活動 |
|-----|----------|
| 1 |白兔掃描→了解結構+來源資料品質|
| 2 |戴帽子的兔子 → 表格設計與字段映射 |
| 3 |匯出ETL規格→實施團隊的文檔|

**下一篇文章**：Usagi — 將原始程式碼對應到 OMOP 標準概念
