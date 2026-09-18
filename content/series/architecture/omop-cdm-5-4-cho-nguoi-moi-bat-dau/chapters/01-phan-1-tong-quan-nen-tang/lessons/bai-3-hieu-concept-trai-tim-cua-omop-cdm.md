---
id: 019f1a00-a103-7b01-e001-omopcdm54003
title: "Bài 3: Hiểu Concept — Trái tim của OMOP CDM"
slug: bai-3-hieu-concept-trai-tim-cua-omop-cdm
description: >-
  Concept là gì, Standard Concept vs Source Concept vs Classification
  Concept, concept_id vs source_value vs source_concept_id,
  Domain, Vocabulary, Concept Class, và cách tra cứu trên Athena.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 3
section_title: "Phần 1: Tổng quan & Nền tảng"
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: "OMOP CDM 5.4 cho Người mới — Hiểu từ A đến Z"
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop03" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop03)"/>
  <g>
    <circle cx="659" cy="87" r="22" fill="#818cf8" opacity="0.12"/>
    <circle cx="718" cy="106" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="777" cy="125" r="36" fill="#818cf8" opacity="0.06"/>
    <circle cx="836" cy="144" r="13" fill="#818cf8" opacity="0.13"/>
    <circle cx="895" cy="163" r="20" fill="#818cf8" opacity="0.1"/>
    <line x1="600" y1="157" x2="1100" y2="237" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Kiến trúc — Bài 3</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">Hiểu Concept — Trái tim</tspan>
    <tspan x="60" dy="42">của OMOP CDM</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OMOP CDM 5.4 cho Người mới — Hiểu từ A đến Z</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 1: Tổng quan &amp; Nền tảng</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Hệ thống Concept — Source, Standard và Classification](/storage/uploads/2026/04/omop-cdm-bai3-concept-system.webp)

## Giới thiệu

Nếu OMOP CDM là một ngôi nhà, thì **Concept** chính là viên gạch — mọi thứ đều được xây dựng từ Concept. Hiểu rõ Concept là chìa khóa để hiểu toàn bộ CDM.

Bài này sẽ giải thích: Concept là gì? Standard vs Source Concept khác nhau sao? Làm sao tra cứu Concept trên Athena? Và "bộ ba thần thánh" `concept_id` / `source_value` / `source_concept_id` hoạt động thế nào.

---

## 1. Concept là gì?

### 1.1. Định nghĩa

**Concept** = một "khái niệm" duy nhất trong y tế, được đại diện bởi một con số gọi là **concept_id**.

Mọi thứ bạn gặp trong y tế đều có Concept tương ứng:

| Thực thể y tế | concept_id | concept_name | Vocabulary |
|----------------|-----------|--------------|------------|
| Nữ giới | 8532 | Female | Gender |
| Tiểu đường type 2 | 201826 | Type 2 diabetes mellitus | SNOMED |
| Metformin 500mg tablet | 1503297 | metformin 500 MG Oral Tablet | RxNorm |
| Xét nghiệm HbA1c | 3004410 | Hemoglobin A1c/Hemoglobin.total in Blood | LOINC |
| Đơn vị phần trăm | 8554 | percent | UCUM |
| Khám ngoại trú | 9202 | Outpatient Visit | Visit |
| Dữ liệu từ EHR | 32817 | EHR | Type Concept |

### 1.2. Bảng CONCEPT

Mỗi Concept được lưu như một dòng trong bảng `CONCEPT`:

```sql
SELECT *
FROM concept
WHERE concept_id = 201826;
```

| Cột | Giá trị | Mô tả |
|-----|---------|-------|
| `concept_id` | 201826 | ID duy nhất |
| `concept_name` | Type 2 diabetes mellitus | Tên hiển thị |
| `domain_id` | Condition | Thuộc domain nào |
| `vocabulary_id` | SNOMED | Từ vocabulary nào |
| `concept_class_id` | Clinical Finding | Loại concept |
| `standard_concept` | S | **S** = Standard |
| `concept_code` | 44054006 | Mã gốc trong vocabulary |
| `valid_start_date` | 1970-01-01 | Ngày bắt đầu có hiệu lực |
| `valid_end_date` | 2099-12-31 | Ngày hết hạn |
| `invalid_reason` | NULL | Lý do không hợp lệ |

---

## 2. Standard Concept vs Source Concept vs Classification

### 2.1. Ba loại Concept

```
  standard_concept column:
  ┌─────────────────────────────────────────────────────────────┐
  │                                                             │
  │  'S' = STANDARD CONCEPT                                    │
  │  → Dùng trong *_concept_id columns                          │
  │  → Là "đại diện chính thức" cho một khái niệm              │
  │  → VD: SNOMED 201826 "Type 2 diabetes mellitus"             │
  │                                                             │
  │  'C' = CLASSIFICATION CONCEPT                               │
  │  → Dùng để phân nhóm/phân cấp                              │
  │  → KHÔNG dùng trực tiếp trong clinical tables               │
  │  → VD: SNOMED parent concepts                               │
  │                                                             │
  │  NULL = NON-STANDARD (SOURCE) CONCEPT                       │
  │  → Mã từ vocabulary gốc                                     │
  │  → Lưu trong *_source_concept_id columns                    │
  │  → VD: ICD-10 E11 "Type 2 diabetes mellitus"               │
  │                                                             │
  └─────────────────────────────────────────────────────────────┘
```

### 2.2. Ví dụ cụ thể: "Tiểu đường type 2"

```
  ICD-10-CM 'E11'                         SNOMED 44054006
  ┌──────────────────────┐    Maps to     ┌──────────────────────────┐
  │ concept_id = 443238  │ ──────────→    │ concept_id = 201826      │
  │ standard_concept=NULL│                │ standard_concept = 'S'    │
  │ vocabulary=ICD10CM   │                │ vocabulary = SNOMED       │
  │ (Source Concept)     │                │ (Standard Concept)        │
  └──────────────────────┘                └──────────────────────────┘

  Trong bảng CONDITION_OCCURRENCE:
  ┌────────────────────────────────────────────────────────────────────┐
  │ condition_concept_id        = 201826    ← Standard (SNOMED)       │
  │ condition_source_value      = 'E11'     ← Text gốc từ HIS        │
  │ condition_source_concept_id = 443238    ← Source Concept (ICD-10) │
  └────────────────────────────────────────────────────────────────────┘
```

### 2.3. Bộ ba thần thánh

Hầu hết bảng clinical có 3 cột cho mỗi trường concept:

| Cột | Mục đích | Giá trị |
|-----|---------|---------|
| `*_concept_id` | **Phân tích** — concept chuẩn | Standard Concept ID (S) |
| `*_source_value` | **Truy vết** — giá trị gốc dạng text | Text gốc (VD: "E11", "Glucophage") |
| `*_source_concept_id` | **Mapping ngược** — concept gốc | Non-standard Concept ID |

```
  ┌── Dùng để phân tích (SELECT, GROUP BY, JOIN)
  │
  condition_concept_id = 201826  ← Standard SNOMED
                                                    ├── Truy nguyên nguồn gốc
  condition_source_value = 'E11'  ← Text gốc HIS   │
  condition_source_concept_id = 443238  ← ICD-10 ───┘
```

---

## 3. Domain — Concept thuộc bảng nào?

### 3.1. Các Domain chính

| Domain | Bảng đích | Ví dụ |
|--------|-----------|-------|
| Condition | CONDITION_OCCURRENCE | Tiểu đường, viêm phổi |
| Drug | DRUG_EXPOSURE | Metformin, Amoxicillin |
| Procedure | PROCEDURE_OCCURRENCE | Nội soi, phẫu thuật |
| Measurement | MEASUREMENT | HbA1c, huyết áp, BMI |
| Observation | OBSERVATION | Hút thuốc, tiền sử gia đình |
| Device | DEVICE_EXPOSURE | Stent, máy tạo nhịp |
| Specimen | SPECIMEN | Mẫu máu, mẫu mô |
| Visit | VISIT_OCCURRENCE | Khám ngoại trú, nhập viện |
| Gender | PERSON | Male, Female |
| Race | PERSON | Asian, White |
| Type Concept | Mọi bảng | EHR, Claim, Lab |
| Unit | MEASUREMENT | mg/dL, %, mmHg |
| Route | DRUG_EXPOSURE | Oral, IV, Topical |

### 3.2. Tại sao Domain quan trọng?

Domain quyết định **bản ghi nằm ở bảng nào**. Đây là quy tắc ETL cốt lõi:

```
  Dữ liệu nguồn: "ICD-10: Z87.891 — History of nicotine dependence"
  
  Bước 1: Tra cứu ICD-10 Z87.891 trên Athena
  Bước 2: Tìm Standard Concept → maps to SNOMED concept
  Bước 3: Standard Concept thuộc domain "Observation"
  Bước 4: Lưu vào bảng OBSERVATION (không phải CONDITION!)
  
  ⚠️ Dù ICD-10 thường gắn với Condition domain,
  nhưng "History of" map sang Observation domain
```

---

## 4. Vocabulary — Nguồn gốc Concept

### 4.1. Các Vocabulary quan trọng

```
  ┌──────────────────────────────────────────────────────────────────┐
  │  VOCABULARY CHÍNH TRONG OMOP CDM                                 │
  │                                                                   │
  │  ┌─────────────┐   Conditions (diagnoses, symptoms)              │
  │  │  SNOMED CT  │   → Standard vocabulary cho Condition domain     │
  │  └─────────────┘                                                  │
  │                                                                   │
  │  ┌─────────────┐   Drugs (medications, vaccines)                  │
  │  │  RxNorm     │   → Standard vocabulary cho Drug domain          │
  │  └─────────────┘                                                  │
  │                                                                   │
  │  ┌─────────────┐   Measurements (lab tests, vitals)              │
  │  │   LOINC     │   → Standard vocabulary cho Measurement domain  │
  │  └─────────────┘                                                  │
  │                                                                   │
  │  ┌─────────────┐   Procedures                                     │
  │  │  SNOMED CT  │   → Standard vocabulary cho Procedure domain     │
  │  │  CPT4       │   → US-specific procedures                       │
  │  └─────────────┘                                                  │
  │                                                                   │
  │  SOURCE VOCABULARIES (Non-standard, cần mapping):                 │
  │  ICD-10-CM/VN, ICD-9-CM, NDC, HCPCS, ATC, Read, MedDRA         │
  └──────────────────────────────────────────────────────────────────┘
```

### 4.2. Standard vs Non-standard Vocabulary

| Loại | Ví dụ | standard_concept | Dùng ở cột |
|------|-------|------------------|------------|
| **Standard** | SNOMED CT, RxNorm, LOINC | 'S' | `*_concept_id` |
| **Non-standard** | ICD-10, NDC, ATC, MedDRA | NULL | `*_source_concept_id` |
| **Classification** | SNOMED hierarchy nodes | 'C' | Dùng trong queries phân cấp |

### 4.3. Quá trình Mapping

```
  HIS: "E11" (ICD-10)
       │
       │  Tra bảng CONCEPT_RELATIONSHIP
       │  relationship_id = 'Maps to'
       ↓
  Source Concept: 443238 (ICD-10 E11)
       │
       │  Maps to
       ↓
  Standard Concept: 201826 (SNOMED Type 2 diabetes mellitus)
```

SQL tra cứu mapping:

```sql
-- Tìm Standard Concept từ ICD-10 code 'E11'
SELECT
    c1.concept_id   AS source_concept_id,
    c1.concept_name AS source_name,
    c1.vocabulary_id AS source_vocab,
    c2.concept_id   AS standard_concept_id,
    c2.concept_name AS standard_name,
    c2.vocabulary_id AS standard_vocab
FROM concept c1
JOIN concept_relationship cr
    ON c1.concept_id = cr.concept_id_1
    AND cr.relationship_id = 'Maps to'
JOIN concept c2
    ON cr.concept_id_2 = c2.concept_id
    AND c2.standard_concept = 'S'
WHERE c1.concept_code = 'E11'
  AND c1.vocabulary_id = 'ICD10CM';
```

---

## 5. Concept Class — Phân loại chi tiết

Mỗi Concept thuộc một **Concept Class** cho biết nó thuộc cấp độ nào trong vocabulary:

| Domain | Concept Class | Ví dụ |
|--------|---------------|-------|
| Condition | Clinical Finding | Type 2 diabetes mellitus |
| Drug | **Ingredient** | Metformin |
| Drug | **Clinical Drug** | Metformin 500 MG Oral Tablet |
| Drug | **Branded Drug** | Glucophage 500 MG Oral Tablet |
| Measurement | Lab Test | Hemoglobin A1c |
| Measurement | Clinical Observation | Body weight |
| Procedure | Procedure | Coronary artery bypass grafting |
| Observation | Context-dependent | History of clinical finding |

### Drug Concept Class — Đặc biệt quan trọng

RxNorm tổ chức thuốc theo cấp độ:

```
  INGREDIENT (hoạt chất)
  └── Metformin (concept_id = 1503297)
       │
       ├── CLINICAL DRUG FORM
       │   └── Metformin Oral Tablet
       │        │
       │        ├── CLINICAL DRUG (hoạt chất + liều + dạng)
       │        │   └── Metformin 500 MG Oral Tablet
       │        │        │
       │        │        └── BRANDED DRUG (tên thương mại)
       │        │            └── Glucophage 500 MG Oral Tablet
       │        │
       │        └── CLINICAL DRUG
       │            └── Metformin 1000 MG Oral Tablet
       │
       └── CLINICAL DRUG FORM
           └── Metformin Extended Release Oral Tablet
```

---

## 6. Tra cứu Concept trên Athena

### 6.1. Athena là gì?

**Athena** (https://athena.ohdsi.org/) là công cụ web miễn phí để tra cứu Standardized Vocabularies.

### 6.2. Hướng dẫn tra cứu

**Bước 1:** Truy cập https://athena.ohdsi.org/ (cần tạo tài khoản miễn phí)

**Bước 2:** Nhập từ khóa, ví dụ "diabetes type 2"

**Bước 3:** Lọc kết quả:
- **Standard Concept:** chọn "Standard" để chỉ xem concept chuẩn
- **Domain:** chọn "Condition" nếu tìm bệnh
- **Vocabulary:** chọn "SNOMED" hoặc "ICD10CM"

**Bước 4:** Xem chi tiết concept:
- Concept ID, name, class, domain, vocabulary
- Tab **Relationships**: xem "Maps to", "Is a", "Has component"
- Tab **Hierarchy**: xem concept cha/con

### 6.3. Ví dụ tra cứu phổ biến

```
  Tìm bệnh tiểu đường type 2:
  → Search: "type 2 diabetes"
  → Filter: Domain=Condition, Standard=Standard
  → Kết quả: concept_id=201826, SNOMED "Type 2 diabetes mellitus"

  Tìm thuốc Metformin:
  → Search: "metformin"
  → Filter: Domain=Drug, Concept Class=Ingredient
  → Kết quả: concept_id=1503297, RxNorm "metformin"

  Tìm xét nghiệm HbA1c:
  → Search: "hemoglobin a1c"
  → Filter: Domain=Measurement, Standard=Standard
  → Kết quả: concept_id=3004410, LOINC "Hemoglobin A1c/Hemoglobin.total"
```

---

## 7. concept_id = 0 — Khi không map được

Khi dữ liệu nguồn không thể map sang Standard Concept:

```sql
-- Một mã thuốc nội bộ bệnh viện không có trong RxNorm
drug_concept_id        = 0              -- Không map được!
drug_source_value      = 'THUOC_BV_001' -- Vẫn giữ mã gốc
drug_source_concept_id = 0              -- Cũng không có source concept
```

**Điều này hoàn toàn hợp lệ.** OMOP CDM cho phép `concept_id = 0`, nhưng mục tiêu là **giảm thiểu** số bản ghi có concept_id = 0 bằng cách:

1. Sử dụng **SOURCE_TO_CONCEPT_MAP** cho custom mappings
2. Dùng công cụ **Usagi** để mapping bán tự động
3. Yêu cầu cộng đồng thêm concepts mới vào vocabulary

---

## 8. Thực hành: Đọc một bản ghi CDM

Cho bản ghi sau trong `CONDITION_OCCURRENCE`:

```sql
condition_occurrence_id    = 50001
person_id                  = 12345
condition_concept_id       = 201826
condition_start_date       = '2024-06-10'
condition_start_datetime   = '2024-06-10 09:30:00'
condition_end_date         = NULL
condition_end_datetime     = NULL
condition_type_concept_id  = 32817
condition_status_concept_id = 32902
provider_id                = 5001
visit_occurrence_id        = V001
condition_source_value     = 'E11'
condition_source_concept_id = 443238
condition_status_source_value = 'admitting'
```

**Giải mã:**

| Trường | Giá trị | Ý nghĩa |
|--------|---------|---------|
| condition_concept_id = 201826 | SNOMED "Type 2 diabetes mellitus" | Chẩn đoán chuẩn |
| condition_type_concept_id = 32817 | "EHR" | Dữ liệu từ hệ thống EMR |
| condition_status_concept_id = 32902 | "Primary diagnosis" | Chẩn đoán chính |
| condition_source_value = 'E11' | ICD-10-CM code gốc | Mã gốc từ HIS |
| condition_source_concept_id = 443238 | ICD-10-CM concept cho "E11" | Concept gốc |
| provider_id = 5001 | Bác sĩ chẩn đoán | Tra bảng PROVIDER |
| visit_occurrence_id = V001 | Lượt khám ngoại trú | Tra bảng VISIT_OCCURRENCE |

---

## Tổng kết

Trong bài này, bạn đã hiểu:

1. **Concept** = khái niệm y tế, đại diện bởi concept_id duy nhất
2. **3 loại Concept**: Standard (S), Classification (C), Source (NULL)
3. **Bộ ba cột**: `*_concept_id` / `*_source_value` / `*_source_concept_id`
4. **Domain** quyết định bản ghi nằm ở bảng nào
5. **Vocabulary**: SNOMED (Condition), RxNorm (Drug), LOINC (Measurement)
6. **Concept Class**: phân loại chi tiết (Ingredient vs Clinical Drug...)
7. **Athena**: công cụ tra cứu concept miễn phí
8. **concept_id = 0**: hợp lệ khi không map được

**Bài tiếp theo:** Chúng ta sẽ bắt đầu khám phá bảng đầu tiên — **PERSON** — nơi lưu trữ thông tin nhân khẩu bệnh nhân.

---

## Tài liệu tham khảo

- [Athena — OHDSI Vocabulary Search](https://athena.ohdsi.org/)
- [The Book of OHDSI — Chapter 5: Standardized Vocabularies](https://ohdsi.github.io/TheBookOfOhdsi/StandardizedVocabularies.html)
- [OMOP CDM Wiki — Concept](https://ohdsi.github.io/CommonDataModel/cdm54.html#CONCEPT)
