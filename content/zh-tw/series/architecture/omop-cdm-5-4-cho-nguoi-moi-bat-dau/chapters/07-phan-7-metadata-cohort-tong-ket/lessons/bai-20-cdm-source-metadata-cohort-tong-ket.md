---
id: 019f1a00-a120-7b01-e001-omopcdm54020
title: 第 20 課：CDM_SOURCE、METADATA、COHORT 以及整個 OMOP CDM 5.4 的摘要
slug: bai-20-cdm-source-metadata-cohort-tong-ket
description: 表CDM_SOURCE描述資料來源，METADATA儲存附加資訊，COHORT管理研究組。所有 37 個 OMOP CDM 5.4 表和下一個路線圖的摘要。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 20
section_title: 第 7 部分：元資料、群組和摘要
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: 初學者的 OMOP CDM 5.4 — 從頭到尾了解
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop20" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop20)"/>
  <g>
    <circle cx="700" cy="90" r="24" fill="#818cf8" opacity="0.12"/>
    <circle cx="800" cy="120" r="20" fill="#818cf8" opacity="0.08"/>
    <circle cx="880" cy="80" r="18" fill="#818cf8" opacity="0.07"/>
    <circle cx="950" cy="140" r="16" fill="#818cf8" opacity="0.06"/>
    <line x1="640" y1="160" x2="1100" y2="250" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="130" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ 建築 — 第 20 課</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">CDM_來源、元資料、</tspan>
    <tspan x="60" dy="42">隊列和 OMOP 總結 5.4</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">初學者的 OMOP CDM 5.4 — 從頭到尾了解</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 7 部分：元資料、群組和摘要</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![OMOP CDM 5.4 的完整概述 — 37 個表格，7 組](/storage/uploads/2026/04/omop-cdm-bai20-complete-overview.webp)

## 簡介

系列的最後一篇文章！我們將了解 **元資料** 組（CDM_SOURCE、METADATA）和 **COHORT** — 研究組管理表。然後總結所有 37+ OMOP CDM 5.4 表和進一步學習路線圖。

---

## 1. CDM_SOURCE — 資料來源資訊

### 1.1。表結構

|專欄 |類型 |必填 |說明 |
|-----|--------|----------|--------|
| `cdm_source_name` | VARCHAR(255) | ✅ |資料來源名稱|
| `cdm_source_abbreviation` | VARCHAR(25) | VARCHAR(25) | ✅ |簡稱 |
| `cdm_holder` | VARCHAR(255) | |所有權組織|
| `source_description` | CLOB | |詳細說明|
| `source_documentation_reference` | VARCHAR(255) | |文檔網址 |
| `cdm_etl_reference` | VARCHAR(255) | | URL ETL 文件 |
| `source_release_date` |日期 | |資料發布日期 |
| `cdm_release_date` |日期 | | CDM 轉換日期 |
| `cdm_version` | VARCHAR(10) | | CDM 版本 (v5.4) |
| `cdm_version_concept_id` |整數| | FK → 概念 |
| `vocabulary_version` | VARCHAR(20) | |字彙版|

### 1.2。越南數據範例

```sql
INSERT INTO cdm_source (
    cdm_source_name,
    cdm_source_abbreviation,
    cdm_holder,
    source_description,
    cdm_etl_reference,
    source_release_date,
    cdm_release_date,
    cdm_version,
    cdm_version_concept_id,
    vocabulary_version
) VALUES (
    'Bệnh viện Bạch Mai - Hệ thống HIS',
    'BACHMAI_HIS',
    'Bệnh viện Bạch Mai',
    'Dữ liệu EMR từ hệ thống HIS Bệnh viện Bạch Mai, '
    || 'bao gồm khám ngoại trú và nội trú từ 2020-2024. '
    || 'Chuyển đổi theo OMOP CDM 5.4 phục vụ nghiên cứu '
    || 'dịch tễ học lâm sàng.',
    'https://github.com/bachmai-etl/omop-cdm',
    '2024-06-30',       -- Ngày xuất dữ liệu nguồn
    '2024-09-15',       -- Ngày hoàn tất ETL
    'v5.4',
    756265,             -- CDM v5.4 concept_id
    'v5.0 30-AUG-24'   -- Vocabulary version từ Athena
);
```

### 1.3。為什麼 CDM_SOURCE 很重要？

- **可追溯性**：知道資料從哪裡來，何時ETL
- **網路研究**：比較站點之間的結果
- **再現性**：再現研究結果
- **合規性**：合規性審核

---

## 2. 元資料 — 附加資訊

### 2.1。表結構

|專欄 |類型 |必填 |說明 |
|-----|--------|----------|--------|
| `metadata_id` |整數| ✅ PK |唯一ID |
| `metadata_concept_id` |整數| ✅ |型元資料（FK → 概念）|
| `metadata_type_concept_id` |整數| ✅ |類型元資料 |
| `name` | VARCHAR(250) | ✅ |按鍵名稱|
| `value_as_string` | VARCHAR(250) | |文字值|
| `value_as_concept_id` |整數| |概念價值|
| `value_as_number` |浮動| |數值|
| `metadata_date` |日期 | |記錄日期|
| `metadata_datetime` |日期時間 | |記錄日期時間 |

### 2.2。使用範例

```sql
-- Ghi nhận thông tin ETL
INSERT INTO metadata VALUES (1, 0, 0, 'ETL_TOOL', 'WhiteRabbit + RabbitInAHat', NULL, NULL, '2024-09-15', NULL);
INSERT INTO metadata VALUES (2, 0, 0, 'ETL_VERSION', '1.2.0', NULL, NULL, '2024-09-15', NULL);
INSERT INTO metadata VALUES (3, 0, 0, 'SOURCE_PATIENT_COUNT', NULL, NULL, 125000, '2024-09-15', NULL);
INSERT INTO metadata VALUES (4, 0, 0, 'CDM_PATIENT_COUNT', NULL, NULL, 118500, '2024-09-15', NULL);
INSERT INTO metadata VALUES (5, 0, 0, 'MAPPING_COVERAGE_PCT', NULL, NULL, 94.8, '2024-09-15', NULL);
INSERT INTO metadata VALUES (6, 0, 0, 'COUNTRY', 'Vietnam', NULL, NULL, '2024-09-15', NULL);
```

> METADATA 是一個靈活的鍵值表 — 用於儲存任何不適合 CDM_SOURCE 的資訊。

---

## 3. COHORT — 研究團隊

### 3.1。表結構

|專欄 |類型 |必填 |說明 |
|-----|--------|----------|--------|
| `cohort_definition_id` |整數| ✅ | FK → 佇列定義 |
| `subject_id` |整數| ✅ |實體 ID（通常 = person_id）|
| `cohort_start_date` |日期 | ✅ |隊列進入日期 |
| `cohort_end_date` |日期 | ✅ |同類產品發布日期 |

### 3.2。 COHORT_DEFINITION（回憶第 16 課）

|專欄 |類型 |說明 |
|-----|--------|--------|
| `cohort_definition_id` |整數PK |定義 ID |
| `cohort_definition_name` | VARCHAR(255) |群組名稱 |
| `cohort_definition_description` | CLOB |描述 |
| `definition_type_concept_id` |整數|型別 |
| `cohort_definition_syntax` | CLOB |建立群組的邏輯 |
| `subject_concept_id` |整數|對象|
| `cohort_initiation_date` |日期 |建立日期 |

### 3.3。使用方法：建立第 2 型糖尿病隊列

```sql
-- Bước 1: Định nghĩa cohort
INSERT INTO cohort_definition (
    cohort_definition_id,
    cohort_definition_name,
    cohort_definition_description,
    definition_type_concept_id,
    cohort_definition_syntax,
    subject_concept_id,
    cohort_initiation_date
) VALUES (
    101,
    'Tiểu đường Type 2 mới phát hiện 2023',
    'BN có chẩn đoán T2DM lần đầu trong 2023, '
    || 'có ít nhất 365 ngày observation trước đó, '
    || 'không có T1DM.',
    0,
    '{
        "PrimaryCriteria": {
            "CriteriaList": [{
                "ConditionOccurrence": {
                    "CodesetId": 201826
                }
            }],
            "ObservationWindow": {"PriorDays": 365}
        },
        "ExclusionCriteria": [{
            "ConditionOccurrence": {
                "CodesetId": 201254
            }
        }]
    }',
    0,
    '2024-09-15'
);

-- Bước 2: Populate cohort
INSERT INTO cohort (
    cohort_definition_id,
    subject_id,
    cohort_start_date,
    cohort_end_date
)
SELECT
    101 AS cohort_definition_id,
    co.person_id AS subject_id,
    MIN(co.condition_start_date) AS cohort_start_date,
    COALESCE(
        (SELECT MAX(op.observation_period_end_date)
         FROM observation_period op
         WHERE op.person_id = co.person_id),
        MIN(co.condition_start_date)
    ) AS cohort_end_date
FROM condition_occurrence co
JOIN concept_ancestor ca
    ON co.condition_concept_id = ca.descendant_concept_id
WHERE ca.ancestor_concept_id = 201826  -- Type 2 DM
  AND co.condition_start_date BETWEEN '2023-01-01' AND '2023-12-31'
  -- Phải có 365 ngày observation trước
  AND EXISTS (
      SELECT 1 FROM observation_period op
      WHERE op.person_id = co.person_id
        AND op.observation_period_start_date
            <= co.condition_start_date - INTERVAL '365 days'
  )
  -- Loại trừ T1DM
  AND NOT EXISTS (
      SELECT 1 FROM condition_occurrence co2
      JOIN concept_ancestor ca2
          ON co2.condition_concept_id = ca2.descendant_concept_id
      WHERE ca2.ancestor_concept_id = 201254  -- Type 1 DM
        AND co2.person_id = co.person_id
        AND co2.condition_start_date <= co.condition_start_date
  )
GROUP BY co.person_id;
```

### 3.4。隊列分析

```sql
-- Tổng quan cohort T2DM 2023
SELECT
    cd.cohort_definition_name,
    COUNT(DISTINCT c.subject_id) AS patient_count,
    AVG(p.year_of_birth) AS avg_birth_year,
    ROUND(
        SUM(CASE WHEN p.gender_concept_id = 8507 THEN 1 ELSE 0 END)
        * 100.0 / COUNT(*), 1
    ) AS male_pct
FROM cohort c
JOIN cohort_definition cd
    ON c.cohort_definition_id = cd.cohort_definition_id
JOIN person p ON c.subject_id = p.person_id
WHERE c.cohort_definition_id = 101
GROUP BY cd.cohort_definition_name;
```

---

## 4. 整個 OMOP CDM 5.4 的總結

### 4.1。按組別劃分的 37+ 個主機板列表

```
  ╔═══════════════════════════════════════════════════╗
  ║            OMOP CDM 5.4 — 37+ Bảng               ║
  ╠═══════════════════════════════════════════════════╣
  ║                                                   ║
  ║  ▎ CLINICAL DATA (16 bảng)                        ║
  ║  ├── PERSON                    Bài 4              ║
  ║  ├── OBSERVATION_PERIOD        Bài 5              ║
  ║  ├── VISIT_OCCURRENCE          Bài 6              ║
  ║  ├── VISIT_DETAIL              Bài 6              ║
  ║  ├── CONDITION_OCCURRENCE      Bài 7              ║
  ║  ├── DRUG_EXPOSURE             Bài 8              ║
  ║  ├── PROCEDURE_OCCURRENCE      Bài 9              ║
  ║  ├── MEASUREMENT               Bài 10             ║
  ║  ├── OBSERVATION               Bài 11             ║
  ║  ├── DEVICE_EXPOSURE           Bài 12             ║
  ║  ├── SPECIMEN                  Bài 12             ║
  ║  ├── NOTE                      Bài 12             ║
  ║  ├── NOTE_NLP                  Bài 12             ║
  ║  ├── DEATH                     Bài 13             ║
  ║  ├── EPISODE                   Bài 13 (CDM 5.4)  ║
  ║  └── EPISODE_EVENT             Bài 13 (CDM 5.4)  ║
  ║                                                   ║
  ║  ▎ HEALTH SYSTEM DATA (3 bảng)                    ║
  ║  ├── LOCATION                  Bài 17             ║
  ║  ├── CARE_SITE                 Bài 17             ║
  ║  └── PROVIDER                  Bài 17             ║
  ║                                                   ║
  ║  ▎ HEALTH ECONOMICS DATA (2 bảng)                 ║
  ║  ├── PAYER_PLAN_PERIOD         Bài 18             ║
  ║  └── COST                      Bài 18             ║
  ║                                                   ║
  ║  ▎ STANDARDIZED VOCABULARIES (12 bảng)            ║
  ║  ├── CONCEPT                   Bài 3, 14          ║
  ║  ├── VOCABULARY                Bài 14             ║
  ║  ├── DOMAIN                    Bài 14             ║
  ║  ├── CONCEPT_CLASS             Bài 14             ║
  ║  ├── CONCEPT_RELATIONSHIP      Bài 15             ║
  ║  ├── RELATIONSHIP              Bài 15             ║
  ║  ├── CONCEPT_SYNONYM           Bài 15             ║
  ║  ├── CONCEPT_ANCESTOR          Bài 15             ║
  ║  ├── SOURCE_TO_CONCEPT_MAP     Bài 15             ║
  ║  ├── DRUG_STRENGTH             Bài 16             ║
  ║  ├── COHORT_DEFINITION         Bài 16, 20         ║
  ║  └── ATTRIBUTE_DEFINITION      Bài 16             ║
  ║                                                   ║
  ║  ▎ DERIVED ELEMENTS (3 bảng)                      ║
  ║  ├── CONDITION_ERA             Bài 19             ║
  ║  ├── DRUG_ERA                  Bài 19             ║
  ║  └── DOSE_ERA                  Bài 19             ║
  ║                                                   ║
  ║  ▎ METADATA (2 bảng)                              ║
  ║  ├── CDM_SOURCE                Bài 20             ║
  ║  └── METADATA                  Bài 20             ║
  ║                                                   ║
  ║  ▎ COHORT (1 bảng)                                ║
  ║  └── COHORT                    Bài 20             ║
  ║                                                   ║
  ╚═══════════════════════════════════════════════════╝
```

### 4.2。 5個設計原則（重複）

| ＃|原理|意義|
|---|-----------|--------|
| 1 | **以人為本** |與 PERSON | 相關的所有數據
| 2 | **觀察期** |僅在追蹤期間進行分析|
| 3 | **標準概念** |透過詞彙表標準化代碼 |
| 4 | **域路由** |資料依照域 | 進入表中
| 5 | **保留來源值** |保持原始原始碼完整 |

### 4.3。 CDM 5.4 — 重要變更（與 5.3 相比）

|改 |詳情 |
|----------|---------|
| **劇集/EPISODE_EVENT** |腫瘤學新表 |
| **測量_事件_id** |測量中的多態 FK |
| **觀察_事件_id** |觀察中的多態 FK |
| **程序結束日期/日期時間** |新增程序 | 的結束日期
| **單位來源概念ID** |新增至測量 |
| **生產_id** |新增DEVICE_EXPOSURE (UDI) |

---

## 5. 資料品質檢查 (DQD)

### 5.1。 OHDSI 資料品質儀表板

```
  ┌──────────────────────────────────────────┐
  │         Data Quality Dashboard (DQD)      │
  │                                           │
  │  Kiểm tra 3500+ rules:                   │
  │                                           │
  │  1. Completeness  — Đầy đủ               │
  │     Bao nhiêu % records có concept != 0?  │
  │                                           │
  │  2. Conformance   — Tuân thủ              │
  │     Giá trị có hợp lệ? (date, range)     │
  │                                           │
  │  3. Plausibility  — Hợp lý               │
  │     Trẻ 5 tuổi có chẩn đoán Alzheimer?   │
  │                                           │
  │  Output: Bảng báo cáo PASS/FAIL          │
  │          cho từng rule                     │
  └──────────────────────────────────────────┘
```

### 5.2。使用 SQL 快速檢查

```sql
-- Mapping completeness: % records có concept_id != 0
SELECT
    'condition_occurrence' AS table_name,
    COUNT(*) AS total,
    SUM(CASE WHEN condition_concept_id = 0 THEN 1 ELSE 0 END) AS unmapped,
    ROUND(
        SUM(CASE WHEN condition_concept_id != 0 THEN 1 ELSE 0 END)
        * 100.0 / COUNT(*), 1
    ) AS mapped_pct
FROM condition_occurrence

UNION ALL

SELECT 'drug_exposure', COUNT(*),
    SUM(CASE WHEN drug_concept_id = 0 THEN 1 ELSE 0 END),
    ROUND(SUM(CASE WHEN drug_concept_id != 0 THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1)
FROM drug_exposure

UNION ALL

SELECT 'procedure_occurrence', COUNT(*),
    SUM(CASE WHEN procedure_concept_id = 0 THEN 1 ELSE 0 END),
    ROUND(SUM(CASE WHEN procedure_concept_id != 0 THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1)
FROM procedure_occurrence

UNION ALL

SELECT 'measurement', COUNT(*),
    SUM(CASE WHEN measurement_concept_id = 0 THEN 1 ELSE 0 END),
    ROUND(SUM(CASE WHEN measurement_concept_id != 0 THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1)
FROM measurement;
```

```sql
-- Kiểm tra orphan records
-- (records không có observation_period tương ứng)
SELECT 'condition_occurrence' AS src, COUNT(*) AS orphan_count
FROM condition_occurrence co
WHERE NOT EXISTS (
    SELECT 1 FROM observation_period op
    WHERE op.person_id = co.person_id
      AND co.condition_start_date BETWEEN
          op.observation_period_start_date
          AND op.observation_period_end_date
)

UNION ALL

SELECT 'drug_exposure', COUNT(*)
FROM drug_exposure de
WHERE NOT EXISTS (
    SELECT 1 FROM observation_period op
    WHERE op.person_id = de.person_id
      AND de.drug_exposure_start_date BETWEEN
          op.observation_period_start_date
          AND op.observation_period_end_date
);
```

---

## 6. OHDSI 工俱生態系統

|工具|角色 |
|--------|--------|
| **白兔** |掃描來源資料|
| **兔子戴著帽子** |設計 ETL 映射 |
| **阿兔** |原始碼圖→標準概念|
| **雅典娜** |下載/搜尋字彙 |
| **阿特拉斯** |建立佇列、分析、描述 |
| **WebAPI** | ATLAS 後端 API |
| **阿喀琉斯** |資料庫分析與 DQD |
| **哈迪斯** |用於研究的 R 包（PLE、PLP） |
| **資料品質儀表板** |檢查資料品質 |

---

## 7. 下一路線

```
  Bạn đã hoàn thành ✅
  ──────────────────────────────────
  OMOP CDM 5.4 — 37+ bảng, 7 nhóm
  ETL concepts, Vocabulary system
  VN-specific mapping patterns

  Bước tiếp theo 📘
  ──────────────────────────────────
  1. Thực hành ETL
     → Dùng WhiteRabbit + RabbitInAHat
     → Chuyển 1 bộ dữ liệu nhỏ sang OMOP

  2. ATLAS & Cohort Building
     → Cài ATLAS + WebAPI
     → Tạo cohort definitions UI

  3. Achilles + DQD
     → Chạy database profiling
     → Kiểm tra chất lượng dữ liệu

  4. Nghiên cứu với HADES
     → Population Level Estimation
     → Patient Level Prediction
     → Characterization

  5. Tham gia cộng đồng OHDSI
     → forums.ohdsi.org
     → OHDSI Symposium hàng năm
     → Study-a-thon
```

---

## 總結

1. **CDM_SOURCE**：有關資料來源、CDM 和詞彙版本的元數據
2. **METADATA**：鍵值表儲存附加資訊（ETL工具、覆蓋率...）
3. **COHORT + COHORT_DEFINITION**：研究團隊管理，ATLAS的基礎
4. **OMOP CDM 5.4** 包括 **7 組** 中的 **37 個以上的表** — 所有這些都圍繞人
5. **新 CDM 5.4**：EPISODE/EPISODE_EVENT、多型 FK、procedure_end_date

恭喜您完成 **OMOP CDM 5.4 初學者** 系列！從這裡開始，您就擁有了根據國際標準進行越南醫療數據 ETL 的堅實基礎。

---

## 參考文獻

- [OMOP CDM 5.4 — CDM_SOURCE](https://ohdsi.github.io/CommonDataModel/cdm54.html#CDM_SOURCE)
- [OMOP CDM 5.4 — METADATA](https://ohdsi.github.io/CommonDataModel/cdm54.html#METADATA)
- [OMOP CDM 5.4 — COHORT](https://ohdsi.github.io/CommonDataModel/cdm54.html#COHORT)
- [Book of OHDSI](https://ohdsi.github.io/TheBookOfOhdsi/)
- [OHDSI Data Quality Dashboard](https://github.com/OHDSI/DataQualityDashboard)
- [OHDSI Tools](https://www.ohdsi.org/software-tools/)
- [OHDSI Forums](https://forums.ohdsi.org/)
