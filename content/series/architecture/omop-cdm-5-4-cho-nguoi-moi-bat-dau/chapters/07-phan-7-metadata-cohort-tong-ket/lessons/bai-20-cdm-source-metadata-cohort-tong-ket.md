---
id: 019f1a00-a120-7b01-e001-omopcdm54020
title: "Bài 20: CDM_SOURCE, METADATA, COHORT & Tổng kết toàn bộ OMOP CDM 5.4"
slug: bai-20-cdm-source-metadata-cohort-tong-ket
description: >-
  Bảng CDM_SOURCE mô tả nguồn dữ liệu, METADATA lưu thông tin bổ sung,
  COHORT quản lý nhóm nghiên cứu. Tổng kết toàn bộ 37 bảng OMOP CDM 5.4
  và lộ trình tiếp theo.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 20
section_title: "Phần 7: Metadata, Cohort & Tổng kết"
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: "OMOP CDM 5.4 cho Người mới — Hiểu từ A đến Z"
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Kiến trúc — Bài 20</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">CDM_SOURCE, METADATA,</tspan>
    <tspan x="60" dy="42">COHORT &amp; Tổng kết OMOP 5.4</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OMOP CDM 5.4 cho Người mới — Hiểu từ A đến Z</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 7: Metadata, Cohort &amp; Tổng kết</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Tổng quan toàn bộ OMOP CDM 5.4 — 37 bảng, 7 nhóm](/storage/uploads/2026/04/omop-cdm-bai20-complete-overview.webp)

## Giới thiệu

Bài cuối cùng của series! Chúng ta sẽ tìm hiểu nhóm **Metadata** (CDM_SOURCE, METADATA) và **COHORT** — bảng quản lý nhóm nghiên cứu. Sau đó tổng kết toàn bộ 37+ bảng OMOP CDM 5.4 và lộ trình học tiếp.

---

## 1. CDM_SOURCE — Thông tin nguồn dữ liệu

### 1.1. Cấu trúc bảng

| Cột | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|-------|
| `cdm_source_name` | VARCHAR(255) | ✅ | Tên nguồn dữ liệu |
| `cdm_source_abbreviation` | VARCHAR(25) | ✅ | Tên viết tắt |
| `cdm_holder` | VARCHAR(255) | | Tổ chức sở hữu |
| `source_description` | CLOB | | Mô tả chi tiết |
| `source_documentation_reference` | VARCHAR(255) | | URL tài liệu |
| `cdm_etl_reference` | VARCHAR(255) | | URL ETL documentation |
| `source_release_date` | DATE | | Ngày release dữ liệu |
| `cdm_release_date` | DATE | | Ngày chuyển đổi CDM |
| `cdm_version` | VARCHAR(10) | | Phiên bản CDM (v5.4) |
| `cdm_version_concept_id` | INTEGER | | FK → CONCEPT |
| `vocabulary_version` | VARCHAR(20) | | Phiên bản vocabulary |

### 1.2. Ví dụ dữ liệu VN

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

### 1.3. Tại sao CDM_SOURCE quan trọng?

- **Traceability**: biết dữ liệu từ đâu, ETL khi nào
- **Network studies**: so sánh kết quả giữa các site
- **Reproducibility**: tái tạo kết quả nghiên cứu
- **Compliance**: kiểm toán tuân thủ

---

## 2. METADATA — Thông tin bổ sung

### 2.1. Cấu trúc bảng

| Cột | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|-------|
| `metadata_id` | INTEGER | ✅ PK | ID duy nhất |
| `metadata_concept_id` | INTEGER | ✅ | Loại metadata (FK → CONCEPT) |
| `metadata_type_concept_id` | INTEGER | ✅ | Kiểu metadata |
| `name` | VARCHAR(250) | ✅ | Tên key |
| `value_as_string` | VARCHAR(250) | | Giá trị text |
| `value_as_concept_id` | INTEGER | | Giá trị concept |
| `value_as_number` | FLOAT | | Giá trị số |
| `metadata_date` | DATE | | Ngày ghi nhận |
| `metadata_datetime` | DATETIME | | Datetime ghi nhận |

### 2.2. Ví dụ sử dụng

```sql
-- Ghi nhận thông tin ETL
INSERT INTO metadata VALUES (1, 0, 0, 'ETL_TOOL', 'WhiteRabbit + RabbitInAHat', NULL, NULL, '2024-09-15', NULL);
INSERT INTO metadata VALUES (2, 0, 0, 'ETL_VERSION', '1.2.0', NULL, NULL, '2024-09-15', NULL);
INSERT INTO metadata VALUES (3, 0, 0, 'SOURCE_PATIENT_COUNT', NULL, NULL, 125000, '2024-09-15', NULL);
INSERT INTO metadata VALUES (4, 0, 0, 'CDM_PATIENT_COUNT', NULL, NULL, 118500, '2024-09-15', NULL);
INSERT INTO metadata VALUES (5, 0, 0, 'MAPPING_COVERAGE_PCT', NULL, NULL, 94.8, '2024-09-15', NULL);
INSERT INTO metadata VALUES (6, 0, 0, 'COUNTRY', 'Vietnam', NULL, NULL, '2024-09-15', NULL);
```

> METADATA là bảng key-value linh hoạt — dùng để lưu bất kỳ thông tin nào không fit vào CDM_SOURCE.

---

## 3. COHORT — Nhóm nghiên cứu

### 3.1. Cấu trúc bảng

| Cột | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|-------|
| `cohort_definition_id` | INTEGER | ✅ | FK → COHORT_DEFINITION |
| `subject_id` | INTEGER | ✅ | ID đối tượng (thường = person_id) |
| `cohort_start_date` | DATE | ✅ | Ngày vào cohort |
| `cohort_end_date` | DATE | ✅ | Ngày ra cohort |

### 3.2. COHORT_DEFINITION (nhắc lại từ Bài 16)

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `cohort_definition_id` | INTEGER PK | ID định nghĩa |
| `cohort_definition_name` | VARCHAR(255) | Tên cohort |
| `cohort_definition_description` | CLOB | Mô tả |
| `definition_type_concept_id` | INTEGER | Loại |
| `cohort_definition_syntax` | CLOB | Logic tạo cohort |
| `subject_concept_id` | INTEGER | Đối tượng |
| `cohort_initiation_date` | DATE | Ngày tạo |

### 3.3. Cách sử dụng: Tạo cohort tiểu đường type 2

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

### 3.4. Phân tích trên cohort

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

## 4. Tổng kết toàn bộ OMOP CDM 5.4

### 4.1. Danh sách 37+ bảng theo nhóm

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

### 4.2. 5 nguyên lý thiết kế (nhắc lại)

| # | Nguyên lý | Ý nghĩa |
|---|-----------|---------|
| 1 | **Person-centric** | Mọi dữ liệu xoay quanh PERSON |
| 2 | **Observation period** | Chỉ phân tích trong thời gian theo dõi |
| 3 | **Standard Concepts** | Mã chuẩn hóa qua Vocabulary |
| 4 | **Domain routing** | Dữ liệu đi vào bảng theo domain |
| 5 | **Source values preserved** | Giữ nguyên mã nguồn gốc |

### 4.3. CDM 5.4 — Các thay đổi quan trọng (so với 5.3)

| Thay đổi | Chi tiết |
|----------|---------|
| **EPISODE / EPISODE_EVENT** | Bảng mới cho oncology |
| **measurement_event_id** | Polymorphic FK trong MEASUREMENT |
| **observation_event_id** | Polymorphic FK trong OBSERVATION |
| **procedure_end_date/datetime** | Thêm ngày kết thúc cho Procedure |
| **unit_source_concept_id** | Thêm vào MEASUREMENT |
| **production_id** | Thêm vào DEVICE_EXPOSURE (UDI) |

---

## 5. Kiểm tra chất lượng dữ liệu (DQD)

### 5.1. OHDSI Data Quality Dashboard

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

### 5.2. Kiểm tra nhanh bằng SQL

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

## 6. Hệ sinh thái công cụ OHDSI

| Công cụ | Vai trò |
|---------|---------|
| **WhiteRabbit** | Scan dữ liệu nguồn |
| **RabbitInAHat** | Thiết kế ETL mapping |
| **Usagi** | Map mã nguồn → Standard Concept |
| **Athena** | Tải/tìm kiếm Vocabulary |
| **ATLAS** | Tạo cohort, phân tích, characterization |
| **WebAPI** | Backend API cho ATLAS |
| **Achilles** | Database profiling & DQD |
| **HADES** | R packages cho nghiên cứu (PLE, PLP) |
| **DataQualityDashboard** | Kiểm tra chất lượng dữ liệu |

---

## 7. Lộ trình tiếp theo

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

## Tổng kết

1. **CDM_SOURCE**: metadata về nguồn dữ liệu, phiên bản CDM & Vocabulary
2. **METADATA**: bảng key-value lưu thông tin bổ sung (ETL tool, coverage...)
3. **COHORT + COHORT_DEFINITION**: quản lý nhóm nghiên cứu, nền tảng cho ATLAS
4. **OMOP CDM 5.4** gồm **37+ bảng** trong **7 nhóm** — tất cả xoay quanh PERSON
5. **CDM 5.4 mới**: EPISODE/EPISODE_EVENT, polymorphic FK, procedure_end_date

Chúc mừng bạn đã hoàn thành series **OMOP CDM 5.4 cho Người mới**! Từ đây bạn đã có nền tảng vững chắc để bắt tay vào ETL dữ liệu y tế Việt Nam theo chuẩn quốc tế.

---

## Tài liệu tham khảo

- [OMOP CDM 5.4 — CDM_SOURCE](https://ohdsi.github.io/CommonDataModel/cdm54.html#CDM_SOURCE)
- [OMOP CDM 5.4 — METADATA](https://ohdsi.github.io/CommonDataModel/cdm54.html#METADATA)
- [OMOP CDM 5.4 — COHORT](https://ohdsi.github.io/CommonDataModel/cdm54.html#COHORT)
- [Book of OHDSI](https://ohdsi.github.io/TheBookOfOhdsi/)
- [OHDSI Data Quality Dashboard](https://github.com/OHDSI/DataQualityDashboard)
- [OHDSI Tools](https://www.ohdsi.org/software-tools/)
- [OHDSI Forums](https://forums.ohdsi.org/)
