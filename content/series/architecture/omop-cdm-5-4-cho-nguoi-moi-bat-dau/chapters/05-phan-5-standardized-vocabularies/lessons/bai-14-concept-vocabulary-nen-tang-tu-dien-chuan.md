---
id: 019f1a00-a114-7b01-e001-omopcdm54014
title: "Bài 14: CONCEPT & VOCABULARY — Nền tảng từ điển chuẩn"
slug: bai-14-concept-vocabulary-nen-tang-tu-dien-chuan
description: >-
  Hai bảng trung tâm của hệ thống Vocabulary: CONCEPT chứa
  mọi khái niệm y tế, VOCABULARY quản lý nguồn gốc. Tìm hiểu
  standard_concept, domain_id, concept_class_id, vocabulary_id
  và cách tra cứu trên Athena.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 14
section_title: "Phần 5: Standardized Vocabularies"
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: "OMOP CDM 5.4 cho Người mới — Hiểu từ A đến Z"
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop14" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop14)"/>
  <g>
    <circle cx="690" cy="88" r="22" fill="#818cf8" opacity="0.11"/>
    <circle cx="770" cy="108" r="30" fill="#818cf8" opacity="0.08"/>
    <circle cx="850" cy="130" r="26" fill="#818cf8" opacity="0.07"/>
    <line x1="630" y1="160" x2="1100" y2="240" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="130" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Kiến trúc — Bài 14</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">CONCEPT &amp; VOCABULARY</tspan>
    <tspan x="60" dy="42">Nền tảng từ điển chuẩn</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OMOP CDM 5.4 cho Người mới — Hiểu từ A đến Z</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 5: Standardized Vocabularies</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Hệ sinh thái Vocabulary — CONCEPT, VOCABULARY, RELATIONSHIP, ANCESTOR](/storage/uploads/2026/04/omop-cdm-bai14-vocabulary-ecosystem.webp)

## Giới thiệu

Hệ thống **Standardized Vocabularies** là "bộ não" của OMOP CDM — mọi dữ liệu lâm sàng đều liên kết về đây. Bài này tập trung vào hai bảng trung tâm: **CONCEPT** (chứa ~10 triệu khái niệm y tế) và **VOCABULARY** (quản lý 70+ nguồn từ điển). Hiểu hai bảng này là chìa khóa để thành thạo OMOP.

---

## 1. Bảng CONCEPT

### 1.1. Cấu trúc

| Cột | Kiểu | Mô tả | Ví dụ |
|-----|------|-------|-------|
| `concept_id` | INTEGER | PK — ID duy nhất toàn cục | 201826 |
| `concept_name` | VARCHAR(255) | Tên concept | "Type 2 diabetes mellitus" |
| `domain_id` | VARCHAR(20) | Domain (bảng nào) | "Condition" |
| `vocabulary_id` | VARCHAR(20) | FK → VOCABULARY | "SNOMED" |
| `concept_class_id` | VARCHAR(20) | Phân loại trong vocab | "Clinical Finding" |
| `standard_concept` | VARCHAR(1) | S=Standard, C=Classification, NULL | "S" |
| `concept_code` | VARCHAR(50) | Mã gốc trong vocabulary | "44054006" |
| `valid_start_date` | DATE | Ngày bắt đầu có hiệu lực | 2002-01-31 |
| `valid_end_date` | DATE | Ngày hết hiệu lực | 2099-12-31 |
| `invalid_reason` | VARCHAR(1) | NULL=valid, U=updated, D=deleted | NULL |

### 1.2. standard_concept — Ba loại Concept

```
  ┌─────────────────────────────────────────────────────┐
  │ standard_concept = 'S' (Standard)                    │
  │ → Concept "chính thống" dùng trong *_concept_id     │
  │ → VD: SNOMED 201826 "Type 2 diabetes mellitus"      │
  │ → Dùng cho condition_concept_id                      │
  └──────────────────────┬──────────────────────────────┘
                         │ Maps to (nguồn → đích)
  ┌──────────────────────┴──────────────────────────────┐
  │ standard_concept = NULL (Non-standard / Source)      │
  │ → Concept nguồn từ ICD, CPT4, ATC...               │
  │ → VD: ICD10CM 45591837 "E11 - Type 2 DM"           │
  │ → Dùng cho *_source_concept_id                       │
  └─────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────┐
  │ standard_concept = 'C' (Classification)              │
  │ → Concept dùng cho phân cấp / ancestor              │
  │ → VD: MedDRA PT "Diabetes mellitus"                 │
  └─────────────────────────────────────────────────────┘
```

### 1.3. domain_id — Xác định bảng đích

| domain_id | Bảng CDM | Ví dụ |
|-----------|---------|-------|
| Condition | CONDITION_OCCURRENCE | Bệnh, triệu chứng |
| Drug | DRUG_EXPOSURE | Thuốc |
| Procedure | PROCEDURE_OCCURRENCE | Thủ thuật |
| Measurement | MEASUREMENT | Xét nghiệm |
| Observation | OBSERVATION | Ghi nhận |
| Device | DEVICE_EXPOSURE | Thiết bị |
| Spec Anatomic Site | SPECIMEN | Vị trí lấy mẫu |
| Visit | VISIT_OCCURRENCE | Loại visit |
| Type Concept | *_type_concept_id | Nguồn dữ liệu |
| Gender | PERSON | Giới tính |
| Race | PERSON | Chủng tộc |
| Unit | MEASUREMENT.unit | Đơn vị |
| Route | DRUG_EXPOSURE.route | Đường dùng |

---

## 2. Bảng VOCABULARY

### 2.1. Cấu trúc

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `vocabulary_id` | VARCHAR(20) | PK — ID vocabulary |
| `vocabulary_name` | VARCHAR(255) | Tên đầy đủ |
| `vocabulary_reference` | VARCHAR(255) | URL tham chiếu |
| `vocabulary_version` | VARCHAR(255) | Phiên bản |
| `vocabulary_concept_id` | INTEGER | FK → Concept đại diện |

### 2.2. Vocabulary phổ biến

| vocabulary_id | Tên | Domain chính | Vai trò |
|--------------|-----|-------------|---------|
| **SNOMED** | SNOMED-CT | Condition, Procedure, Observation | Standard cho lâm sàng |
| **RxNorm** | RxNorm | Drug | Standard cho thuốc |
| **LOINC** | LOINC | Measurement | Standard cho xét nghiệm |
| **ICD10CM** | ICD-10-CM | Condition | Source concept chẩn đoán |
| **ICD10PCS** | ICD-10-PCS | Procedure | Source concept thủ thuật |
| **CPT4** | CPT-4 | Procedure, Measurement | Source billing code |
| **ATC** | ATC | Drug | Classification thuốc |
| **UCUM** | UCUM | Unit | Đơn vị đo lường |
| **Gender** | OMOP Gender | Gender | Giới tính |
| **Race** | Race | Race | Chủng tộc |
| **CVX** | Vaccines | Drug | Vaccine codes |

---

## 3. Tra cứu Concept trên Athena

### 3.1. Bước tra cứu

```
  1. Vào athena.ohdsi.org
  2. Gõ từ khóa: "Type 2 diabetes"
  3. Filter:
     - Standard Concept: Standard ✓
     - Domain: Condition ✓
     - Vocabulary: SNOMED ✓
  4. Kết quả:
     concept_id:     201826
     concept_name:   Type 2 diabetes mellitus
     vocabulary_id:  SNOMED
     concept_code:   44054006
     standard_concept: S
     domain_id: Condition
```

### 3.2. SQL tra cứu

```sql
-- Tìm Standard Concept cho "tiểu đường type 2"
SELECT concept_id, concept_name, vocabulary_id,
       domain_id, standard_concept, concept_code
FROM concept
WHERE LOWER(concept_name) LIKE '%type 2 diabetes%'
  AND standard_concept = 'S'
  AND domain_id = 'Condition'
ORDER BY concept_name;

-- Tìm Source Concept (ICD-10) mapping đến Standard
SELECT
    c_src.concept_id AS source_concept_id,
    c_src.concept_code AS icd10_code,
    c_src.concept_name AS icd10_name,
    c_std.concept_id AS standard_concept_id,
    c_std.concept_name AS standard_name,
    c_std.vocabulary_id AS standard_vocab
FROM concept c_src
JOIN concept_relationship cr
    ON c_src.concept_id = cr.concept_id_1
    AND cr.relationship_id = 'Maps to'
JOIN concept c_std
    ON cr.concept_id_2 = c_std.concept_id
    AND c_std.standard_concept = 'S'
WHERE c_src.concept_code = 'E11'
  AND c_src.vocabulary_id = 'ICD10CM';
```

---

## 4. concept_class_id — Phân loại trong Vocabulary

### 4.1. SNOMED

| concept_class_id | Ý nghĩa | Ví dụ |
|-----------------|---------|-------|
| Clinical Finding | Bệnh, triệu chứng | Type 2 DM |
| Procedure | Thủ thuật | Appendectomy |
| Body Structure | Cấu trúc cơ thể | Liver |
| Substance | Chất | Glucose |
| Observable Entity | Quantity đo được | Blood pressure |
| Qualifier Value | Giá trị bổ sung | Severe |

### 4.2. RxNorm

| concept_class_id | Level | Ví dụ |
|-----------------|-------|-------|
| Ingredient (IN) | Hoạt chất | Metformin |
| Clinical Drug Form (CDF) | HC + dạng bào chế | Metformin Oral Tablet |
| Clinical Drug (CD) | HC + liều + dạng | Metformin 500mg Tab |
| Branded Drug (BD) | Tên thương mại | Glucophage 500mg Tab |
| Clinical Drug Comp (CDC) | HC + liều | Metformin 500mg |
| Brand Name (BN) | Tên thương mại | Glucophage |
| Dose Form (DF) | Dạng bào chế | Oral Tablet |

---

## 5. Bảng DOMAIN

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `domain_id` | VARCHAR(20) | PK |
| `domain_name` | VARCHAR(255) | Tên domain |
| `domain_concept_id` | INTEGER | FK → concept |

---

## 6. Bảng CONCEPT_CLASS

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| `concept_class_id` | VARCHAR(20) | PK |
| `concept_class_name` | VARCHAR(255) | Tên class |
| `concept_class_concept_id` | INTEGER | FK → concept |

---

## 7. concept_id = 0 — Ý nghĩa đặc biệt

| Concept | Ý nghĩa | Khi nào dùng |
|---------|---------|-------------|
| concept_id = 0 | "No matching concept" | Không map được |
| concept_name | "No matching concept" | |
| domain_id | NULL | |
| vocabulary_id | "None" | |

```sql
-- Kiểm tra % records không map được
SELECT
    'condition_occurrence' AS table_name,
    COUNT(*) AS total_records,
    SUM(CASE WHEN condition_concept_id = 0 THEN 1 ELSE 0 END) AS unmapped,
    ROUND(SUM(CASE WHEN condition_concept_id = 0 THEN 1 ELSE 0 END) * 100.0
          / COUNT(*), 1) AS unmapped_pct
FROM condition_occurrence
UNION ALL
SELECT 'drug_exposure', COUNT(*),
    SUM(CASE WHEN drug_concept_id = 0 THEN 1 ELSE 0 END),
    ROUND(SUM(CASE WHEN drug_concept_id = 0 THEN 1 ELSE 0 END) * 100.0
          / COUNT(*), 1)
FROM drug_exposure
UNION ALL
SELECT 'measurement', COUNT(*),
    SUM(CASE WHEN measurement_concept_id = 0 THEN 1 ELSE 0 END),
    ROUND(SUM(CASE WHEN measurement_concept_id = 0 THEN 1 ELSE 0 END) * 100.0
          / COUNT(*), 1)
FROM measurement;
```

---

## Tổng kết

1. **CONCEPT**: ~10 triệu records, mỗi khái niệm y tế có 1 concept_id duy nhất
2. **standard_concept**: S = Standard (dùng chính), C = Classification, NULL = Source
3. **domain_id** quyết định dữ liệu lưu ở bảng CDM nào
4. **VOCABULARY**: 70+ nguồn từ điển (SNOMED, RxNorm, LOINC, ICD-10...)
5. **concept_id = 0**: "không map được" — dùng khi ETL không tìm được Standard Concept
6. Tra cứu: **athena.ohdsi.org** hoặc query trực tiếp bảng CONCEPT

**Bài tiếp theo:** CONCEPT_RELATIONSHIP & CONCEPT_ANCESTOR — mối quan hệ và phân cấp giữa Concepts.

---

## Tài liệu tham khảo

- [OMOP CDM 5.4 — CONCEPT](https://ohdsi.github.io/CommonDataModel/cdm54.html#CONCEPT)
- [OMOP CDM 5.4 — VOCABULARY](https://ohdsi.github.io/CommonDataModel/cdm54.html#VOCABULARY)
- [Athena](https://athena.ohdsi.org/)
- [Book of OHDSI — Chapter 5: Standardized Vocabularies](https://ohdsi.github.io/TheBookOfOhdsi/StandardizedVocabularies.html)
