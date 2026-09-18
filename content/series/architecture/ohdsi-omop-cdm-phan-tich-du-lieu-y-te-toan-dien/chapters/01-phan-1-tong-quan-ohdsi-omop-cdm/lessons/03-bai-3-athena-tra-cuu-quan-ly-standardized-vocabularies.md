---
id: 019e0b20-b203-7a01-e001-f1a7f8000003
title: "Bài 3: Athena — Tra cứu & Quản lý Standardized Vocabularies"
slug: bai-3-athena-tra-cuu-quan-ly-standardized-vocabularies
description: >-
  Sử dụng Athena để tra cứu Standard Concepts, hiểu Vocabulary hierarchy
  (ICD-10, SNOMED CT, RxNorm, LOINC, ATC), concept relationships,
  cách tải và import vocabularies vào OMOP CDM database,
  mapping giữa source concepts và standard concepts.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 3
section_title: "Phần 1: Tổng quan OHDSI & OMOP CDM"
course:
  id: 019e0b20-b200-7a01-e001-f1a7f8000001
  title: "OHDSI & OMOP CDM — Phân tích Dữ liệu Y tế Toàn diện"
  slug: ohdsi-omop-cdm-phan-tich-du-lieu-y-te-toan-dien
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-3912" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-3912)"/>

  <!-- Decorations -->
  <g>
    <circle cx="1001" cy="113" r="14" fill="#34d399" opacity="0.08"/>
    <circle cx="902" cy="54" r="17" fill="#34d399" opacity="0.11"/>
    <circle cx="803" cy="255" r="20" fill="#34d399" opacity="0.14"/>
    <circle cx="704" cy="196" r="23" fill="#34d399" opacity="0.07"/>
    <circle cx="605" cy="137" r="26" fill="#34d399" opacity="0.1"/>
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
    <line x1="600" y1="123" x2="1100" y2="203" stroke="#34d399" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="153" x2="1050" y2="223" stroke="#34d399" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1055.9089653438086,204 1055.9089653438086,242 1023,261 990.0910346561914,242 990.0910346561914,204 1023,185" fill="none" stroke="#34d399" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#34d399"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#34d399" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#34d399">🏗️ Kiến trúc — Bài 3</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 3: Athena — Tra cứu &amp; Quản lý</tspan>
      <tspan x="60" dy="42">Standardized Vocabularies</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OHDSI &amp; OMOP CDM — Phân tích Dữ liệu Y tế Toàn diện</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 1: Tổng quan OHDSI &amp; OMOP CDM</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Bài 3: Athena — Standardized Vocabularies](/storage/uploads/2026/03/ohdsi-bai-3-athena-vocabularies.webp)

## Giới thiệu

**Athena** (https://athena.ohdsi.org) là cổng tra cứu và tải Standardized Vocabularies — bộ từ vựng chuẩn quốc tế cho toàn bộ hệ sinh thái OHDSI. Mọi concept trong OMOP CDM đều xuất phát từ đây.

Bài này hướng dẫn cách tra cứu concepts, hiểu các vocabulary phổ biến, concept relationships, và quy trình tải/import vocabularies vào database.

---

## 1. Athena — Giao diện tra cứu

### 1.1 Truy cập Athena

```
URL: https://athena.ohdsi.org
Đăng ký: Tạo tài khoản miễn phí (cần cho download vocabularies)

Giao diện chính:
┌─────────────────────────────────────────────────────────┐
│  ATHENA — OHDSI Standardized Vocabularies               │
│                                                         │
│  Search: [_____________________________________] [🔍]   │
│                                                         │
│  Filters:                                               │
│  ☑ Standard Concepts Only                               │
│  Domain: [All ▼]                                        │
│  Vocabulary: [All ▼]                                    │
│  Concept Class: [All ▼]                                 │
│  Invalid Reason: [Valid Only ▼]                          │
└─────────────────────────────────────────────────────────┘
```

### 1.2 Tra cứu cơ bản

```
Ví dụ: Tìm "Hypertension"

Kết quả:
┌────────────┬──────────────────────────────┬────────┬──────────┐
│ Concept ID │ Concept Name                  │ Domain │ Vocab    │
├────────────┼──────────────────────────────┼────────┼──────────┤
│ 320128     │ Essential hypertension        │ Condi  │ SNOMED   │ ★ Standard
│ 316866     │ Hypertensive disorder         │ Condi  │ SNOMED   │ ★ Standard
│ 45566052   │ Essential (primary) HTN       │ Condi  │ ICD10CM  │   Non-std
│ 4228112    │ Secondary hypertension        │ Condi  │ SNOMED   │ ★ Standard
└────────────┴──────────────────────────────┴────────┴──────────┘

Chú ý:
- ★ Standard = concept dùng cho phân tích (standard_concept = 'S')
- Non-std = concept nguồn, cần mapping sang standard
```

### 1.3 Chi tiết Concept

```
Concept ID: 320128
Name: Essential hypertension
Domain: Condition
Vocabulary: SNOMED
Concept Class: Clinical Finding
Concept Code: 59621000
Standard: Standard (S)

Relationships:
├── Maps to: Essential hypertension (320128) — chính nó
├── Is a:    Hypertensive disorder (316866) — parent
├── Has finding site: Vascular structure (4167085)
├── Mapped from:
│   ├── I10 — Essential (primary) hypertension (ICD-10-CM)
│   ├── 401.9 — Unspecified essential HTN (ICD-9-CM)
│   └── K86 — Uncomplicated hypertension (ICPC)
```

---

## 2. Vocabulary Chính trong OHDSI

### 2.1 Tổng quan

| Vocabulary | Domain | Mô tả | Standard? |
|-----------|--------|-------|----------|
| **SNOMED CT** | Condition, Procedure, Observation | Thuật ngữ y khoa quốc tế | ✅ Standard |
| **RxNorm** | Drug | Thuốc (thị trường Mỹ) | ✅ Standard |
| **RxNorm Extension** | Drug | Thuốc quốc tế (outside US) | ✅ Standard |
| **LOINC** | Measurement | Xét nghiệm, đo lường | ✅ Standard |
| **ICD-10-CM** | Condition | Chẩn đoán (phổ biến VN) | ❌ Source |
| **ICD-9-CM** | Condition | Chẩn đoán (legacy) | ❌ Source |
| **ATC** | Drug | Phân loại thuốc (WHO) | ❌ Classification |
| **CPT4** | Procedure | Thủ thuật (Mỹ) | ✅ Standard |
| **HCPCS** | Procedure, Device | Dịch vụ y tế (Mỹ) | ✅ Standard |
| **UCUM** | Unit | Đơn vị đo lường | ✅ Standard |
| **Gender** | Gender | Giới tính | ✅ Standard |
| **Race** | Race | Chủng tộc | ✅ Standard |

### 2.2 SNOMED CT — Vocabulary quan trọng nhất

```
Hierarchy SNOMED CT:

Clinical Finding
├── Disease (bệnh)
│   ├── Disorder of cardiovascular system
│   │   ├── Hypertensive disorder (316866)
│   │   │   ├── Essential hypertension (320128)
│   │   │   ├── Malignant hypertension (4133004)
│   │   │   └── Secondary hypertension (4228112)
│   │   ├── Ischemic heart disease
│   │   │   ├── Acute myocardial infarction (4329847)
│   │   │   └── Chronic ischemic heart disease (318443)
│   │   └── Heart failure (316139)
│   └── Disorder of endocrine system
│       └── Diabetes mellitus (201820)

Procedure
├── Surgical procedure
│   ├── Coronary artery bypass (4336464)
│   └── Appendectomy (4239414)
└── Diagnostic procedure
    ├── Echocardiography (4055702)
    └── Colonoscopy (4249893)
```

### 2.3 RxNorm — Drug Hierarchy

```
RxNorm Concept Classes (từ tổng quát → chi tiết):

Ingredient (hoạt chất)
  └── Amlodipine (1332418)

Clinical Drug Component
  └── Amlodipine 5 MG

Clinical Drug Form
  └── Amlodipine Oral Tablet

Clinical Drug (thuốc cụ thể)
  └── Amlodipine 5 MG Oral Tablet (1332419) ← phổ biến nhất

Branded Drug
  └── Norvasc 5 MG Oral Tablet

Quantified Branded Drug
  └── Norvasc 5 MG Oral Tablet [Box of 30]
```

### 2.4 LOINC — Measurement Codes

```
LOINC cho xét nghiệm phổ biến:

LOINC Code  │ Concept Name                    │ Concept ID
────────────┼─────────────────────────────────┼───────────
2345-7      │ Glucose [Mass/volume] in Serum   │ 3004410
4548-4      │ Hemoglobin A1c                   │ 3004501
2160-0      │ Creatinine in Serum              │ 3016723
33914-3     │ eGFR                             │ 46236952
718-7       │ Hemoglobin                       │ 3000963
2093-3      │ Cholesterol Total                │ 3027114
6690-2      │ WBC count                        │ 3010813
```

---

## 3. Concept Relationships

### 3.1 Relationship Types quan trọng

```sql
-- Maps to: Source → Standard
-- ICD-10 "I10" → SNOMED "Essential hypertension"
SELECT *
FROM concept_relationship
WHERE concept_id_1 = 45566052    -- ICD-10 I10
  AND relationship_id = 'Maps to';
-- → concept_id_2 = 320128 (SNOMED Essential HTN)

-- Is a: Child → Parent (hierarchy)
SELECT *
FROM concept_relationship
WHERE concept_id_1 = 320128      -- Essential HTN
  AND relationship_id = 'Is a';
-- → concept_id_2 = 316866 (Hypertensive disorder)

-- Mapped from: Standard ← Source (reverse)
-- Subsumes: Parent ← Child (reverse of "Is a")
```

### 3.2 CONCEPT_ANCESTOR — Ancestor Tree

```sql
-- Tìm tất cả descendants của "Hypertensive disorder" (316866)
SELECT
  ca.descendant_concept_id,
  c.concept_name,
  ca.min_levels_of_separation,
  ca.max_levels_of_separation
FROM concept_ancestor ca
JOIN concept c ON ca.descendant_concept_id = c.concept_id
WHERE ca.ancestor_concept_id = 316866
  AND c.standard_concept = 'S'
ORDER BY ca.min_levels_of_separation;

-- Kết quả: Tất cả bệnh thuộc nhóm Hypertensive
-- → Essential HTN, Malignant HTN, Renovascular HTN, ...
-- → Rất hữu ích cho Cohort Definitions trong ATLAS!
```

---

## 4. Tải và Import Vocabularies

### 4.1 Download từ Athena

```
Bước 1: Đăng nhập athena.ohdsi.org
Bước 2: Chọn tab "Download"
Bước 3: Chọn vocabularies cần thiết

Vocabularies nên chọn (cho Việt Nam):
☑ SNOMED CT         ← Bắt buộc (Condition, Procedure standard)
☑ RxNorm            ← Bắt buộc (Drug standard)
☑ RxNorm Extension  ← Thuốc ngoài thị trường Mỹ
☑ LOINC             ← Xét nghiệm
☑ ICD-10-CM         ← Chẩn đoán (mapping source)
☑ ICD-10            ← WHO version
☑ ATC               ← Phân loại thuốc WHO
☑ UCUM              ← Đơn vị đo
☑ Gender            ← Giới tính
☑ Race              ← Chủng tộc
☑ Ethnicity         ← Dân tộc
☑ Visit             ← Loại visit
☑ Type Concept      ← Nguồn dữ liệu

Lưu ý: SNOMED CT yêu cầu license (miễn phí cho nghiên cứu)
        → Click "License required", trả lời form

Bước 4: Download → ZIP file ~2GB
```

### 4.2 Cấu trúc file download

```
vocabulary_download_xxxxx/
├── CONCEPT.csv             (~7M rows, ~1.5GB)
├── VOCABULARY.csv
├── DOMAIN.csv
├── CONCEPT_CLASS.csv
├── CONCEPT_RELATIONSHIP.csv (~50M rows, ~5GB)
├── RELATIONSHIP.csv
├── CONCEPT_SYNONYM.csv
├── CONCEPT_ANCESTOR.csv    (~80M rows, ~3GB)
├── DRUG_STRENGTH.csv
└── SOURCE_TO_CONCEPT_MAP.csv
```

### 4.3 Import vào PostgreSQL

```bash
# Script import vocabularies vào PostgreSQL
# Giả sử schema OMOP CDM đã được tạo

export PGHOST=localhost
export PGPORT=5432
export PGDATABASE=ohdsi
export PGUSER=ohdsi_admin
export VOCAB_DIR=/path/to/vocabulary_download

# Import từng file CSV
for table in CONCEPT VOCABULARY DOMAIN CONCEPT_CLASS \
             CONCEPT_RELATIONSHIP RELATIONSHIP \
             CONCEPT_SYNONYM CONCEPT_ANCESTOR \
             DRUG_STRENGTH SOURCE_TO_CONCEPT_MAP; do

  echo "Loading $table..."
  psql -c "\COPY ${table} FROM '${VOCAB_DIR}/${table}.csv' \
    WITH (FORMAT csv, HEADER true, DELIMITER E'\t', QUOTE E'\b')"

done

# Tạo indexes (rất quan trọng cho performance!)
echo "Creating indexes..."
psql -f /path/to/omop_cdm_indexes.sql

echo "Done! Vocabularies loaded."
```

```sql
-- omop_cdm_indexes.sql — Indexes quan trọng
CREATE INDEX idx_concept_concept_id ON concept (concept_id);
CREATE INDEX idx_concept_code ON concept (concept_code);
CREATE INDEX idx_concept_vocab ON concept (vocabulary_id);
CREATE INDEX idx_concept_domain ON concept (domain_id);
CREATE INDEX idx_concept_class ON concept (concept_class_id);

CREATE INDEX idx_cr_concept1 ON concept_relationship (concept_id_1);
CREATE INDEX idx_cr_concept2 ON concept_relationship (concept_id_2);
CREATE INDEX idx_cr_relationship ON concept_relationship (relationship_id);

CREATE INDEX idx_ca_ancestor ON concept_ancestor (ancestor_concept_id);
CREATE INDEX idx_ca_descendant ON concept_ancestor (descendant_concept_id);
```

---

## 5. SOURCE_TO_CONCEPT_MAP — Custom Mapping

Khi dữ liệu nguồn có mã riêng (không phải vocabulary chuẩn):

```sql
-- Ví dụ: Bệnh viện dùng mã nội bộ cho thuốc
-- "AMLO5" → Amlodipine 5mg Oral Tablet (RxNorm 1332419)

INSERT INTO source_to_concept_map (
  source_code,
  source_concept_id,
  source_vocabulary_id,
  target_concept_id,
  target_vocabulary_id,
  valid_start_date,
  valid_end_date
) VALUES (
  'AMLO5',
  0,                      -- Source concept chưa có trong vocabulary
  'MY_HOSPITAL_DRUG',     -- Vocabulary ID tự tạo
  1332419,                -- Amlodipine 5mg (RxNorm)
  'RxNorm',
  '2024-01-01',
  '2099-12-31'
);
```

---

## 6. Tips tra cứu Athena hiệu quả

```
1. Luôn filter "Standard Concepts Only" khi tìm concept cho phân tích
   → Non-standard concepts chỉ dùng trong ETL mapping

2. Dùng Concept ID thay vì tên khi viết SQL
   → Tên có thể thay đổi giữa các phiên bản vocabulary

3. Kiểm tra "Mapped from" để xác nhận mapping
   → ICD-10 "I10" maps to SNOMED "Essential HTN"?

4. Dùng Concept Ancestor cho cohort definitions
   → Chọn ancestor concept = tự động bao gồm descendants

5. Cập nhật vocabularies định kỳ (mỗi 6 tháng)
   → Vocabularies được update liên tục (concepts mới, mappings mới)
```

---

## Tóm tắt

| Khái niệm | Giải thích |
|-----------|-----------|
| Athena | Web portal tra cứu và tải Standardized Vocabularies |
| Standard Concept | Concept chuẩn dùng trong phân tích (SNOMED, RxNorm, LOINC) |
| Source Concept | Concept từ vocabulary gốc (ICD-10, mã nội bộ) |
| Maps to | Relationship mapping source → standard concept |
| Concept Ancestor | Bảng hierarchy cho tìm con/cháu của concept |
| SNOMED CT | Vocabulary chuẩn cho Condition & Procedure |
| RxNorm | Vocabulary chuẩn cho Drug |
| LOINC | Vocabulary chuẩn cho Measurement (xét nghiệm) |

**Bài tiếp theo**: WhiteRabbit & Rabbit-in-a-Hat — Khảo sát dữ liệu nguồn & Thiết kế ETL
