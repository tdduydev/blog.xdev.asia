---
id: 019f1a00-a102-7b01-e001-omopcdm54002
title: "Bài 2: Kiến trúc tổng thể OMOP CDM 5.4 — Nhóm bảng & Nguyên lý thiết kế"
slug: bai-2-kien-truc-tong-the-omop-cdm-5-4-nhom-bang-nguyen-ly-thiet-ke
description: >-
  Tổng quan 37 bảng trong OMOP CDM 5.4, 6 nhóm bảng chính
  (Clinical Data, Health System, Health Economics, Standardized
  Vocabularies, Derived Elements, Metadata), mô hình Person-centric
  và các nguyên lý thiết kế cốt lõi.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 2
section_title: "Phần 1: Tổng quan & Nền tảng"
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: "OMOP CDM 5.4 cho Người mới — Hiểu từ A đến Z"
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop02" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop02)"/>
  <g>
    <circle cx="659" cy="87" r="22" fill="#818cf8" opacity="0.12"/>
    <circle cx="718" cy="106" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="777" cy="125" r="36" fill="#818cf8" opacity="0.06"/>
    <circle cx="836" cy="144" r="13" fill="#818cf8" opacity="0.13"/>
    <circle cx="895" cy="163" r="20" fill="#818cf8" opacity="0.1"/>
    <line x1="600" y1="157" x2="1100" y2="237" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="187" x2="1050" y2="257" stroke="#818cf8" stroke-width="0.5" opacity="0.08"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Kiến trúc — Bài 2</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">Kiến trúc tổng thể OMOP CDM 5.4</tspan>
    <tspan x="60" dy="42">Nhóm bảng &amp; Nguyên lý thiết kế</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OMOP CDM 5.4 cho Người mới — Hiểu từ A đến Z</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 1: Tổng quan &amp; Nền tảng</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Kiến trúc 6 nhóm bảng OMOP CDM 5.4 xoay quanh PERSON](/storage/uploads/2026/04/omop-cdm-bai2-architecture-6-groups.webp)

## Giới thiệu

Ở bài trước, bạn đã hiểu **tại sao** cần OMOP CDM. Bài này sẽ trả lời câu hỏi: **CDM 5.4 trông như thế nào?** — 37 bảng được tổ chức ra sao, thuộc nhóm nào, và theo nguyên lý thiết kế gì.

Bạn sẽ có cái nhìn "bird's-eye view" toàn bộ CDM trước khi đi sâu vào từng bảng ở các bài tiếp theo.

---

## 1. Tổng quan 6 nhóm bảng

OMOP CDM 5.4 gồm **37 bảng** được chia thành **6 nhóm** (groups):

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        OMOP CDM 5.4 — 37 Tables                        │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  1. CLINICAL DATA (16 bảng)                                     │    │
│  │  person, observation_period, visit_occurrence, visit_detail,     │    │
│  │  condition_occurrence, drug_exposure, procedure_occurrence,      │    │
│  │  device_exposure, measurement, observation, death, note,         │    │
│  │  note_nlp, specimen, fact_relationship, episode, episode_event   │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                         │
│  ┌──────────────────────────┐  ┌──────────────────────────────────┐    │
│  │  2. HEALTH SYSTEM (3)    │  │  3. HEALTH ECONOMICS (2)         │    │
│  │  location, care_site,    │  │  payer_plan_period, cost          │    │
│  │  provider                │  │                                   │    │
│  └──────────────────────────┘  └──────────────────────────────────┘    │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  4. STANDARDIZED VOCABULARIES (12 bảng)                          │   │
│  │  concept, vocabulary, domain, concept_class, concept_relationship,│   │
│  │  relationship, concept_synonym, concept_ancestor,                 │   │
│  │  source_to_concept_map, drug_strength, cohort, cohort_definition │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────┐   ┌───────────────────────────────────┐   │
│  │  5. DERIVED ELEMENTS (3) │   │  6. METADATA (2)                  │   │
│  │  drug_era, dose_era,     │   │  cdm_source, metadata              │   │
│  │  condition_era           │   │                                    │   │
│  └─────────────────────────┘   └───────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.1. Clinical Data Tables (16 bảng)

Đây là nhóm **lớn nhất và quan trọng nhất** — chứa toàn bộ dữ liệu lâm sàng.

| Bảng | Mô tả ngắn | Bài học |
|------|-------------|---------|
| `person` | Thông tin nhân khẩu bệnh nhân | Bài 4 |
| `observation_period` | Khoảng thời gian theo dõi | Bài 5 |
| `visit_occurrence` | Lượt khám/nhập viện | Bài 6 |
| `visit_detail` | Chi tiết trong một visit | Bài 6 |
| `condition_occurrence` | Chẩn đoán, bệnh lý | Bài 7 |
| `drug_exposure` | Thuốc, kê đơn, vaccine | Bài 8 |
| `procedure_occurrence` | Thủ thuật, phẫu thuật | Bài 9 |
| `measurement` | Xét nghiệm, sinh hiệu | Bài 10 |
| `observation` | Quan sát lâm sàng, tiền sử | Bài 11 |
| `device_exposure` | Thiết bị y tế | Bài 12 |
| `specimen` | Mẫu bệnh phẩm | Bài 12 |
| `note` | Ghi chú văn bản | Bài 12 |
| `note_nlp` | Kết quả NLP từ note | Bài 12 |
| `death` | Thông tin tử vong | Bài 13 |
| `episode` | Giai đoạn bệnh (mới CDM 5.4) | Bài 13 |
| `episode_event` | Liên kết events-episodes (mới CDM 5.4) | Bài 13 |

### 1.2. Health System Data Tables (3 bảng)

| Bảng | Mô tả |
|------|-------|
| `location` | Địa điểm (địa chỉ, tọa độ) |
| `care_site` | Tổ chức y tế (bệnh viện, phòng khám) |
| `provider` | Nhân viên y tế (bác sĩ, y tá) |

### 1.3. Health Economics Data Tables (2 bảng)

| Bảng | Mô tả |
|------|-------|
| `payer_plan_period` | Thông tin bảo hiểm y tế theo thời gian |
| `cost` | Chi phí gắn với mọi sự kiện lâm sàng |

### 1.4. Standardized Vocabularies (12 bảng)

| Bảng | Mô tả |
|------|-------|
| `concept` | Bảng trung tâm — chứa >10 triệu concepts |
| `vocabulary` | Danh sách vocabulary sources (SNOMED, ICD-10...) |
| `domain` | Các domain (Condition, Drug, Procedure...) |
| `concept_class` | Phân loại concept (Clinical Finding, Ingredient...) |
| `concept_relationship` | Mối quan hệ giữa concepts |
| `relationship` | Định nghĩa các loại relationship |
| `concept_synonym` | Tên gọi khác của concept |
| `concept_ancestor` | Phả hệ hierarchical của concept |
| `source_to_concept_map` | Mapping mã nguồn → concept chuẩn |
| `drug_strength` | Hàm lượng, nồng độ thuốc |
| `cohort` | Danh sách bệnh nhân theo tiêu chí |
| `cohort_definition` | Định nghĩa tiêu chí cohort |

### 1.5. Derived Elements (3 bảng)

| Bảng | Mô tả |
|------|-------|
| `drug_era` | Gộp drug exposures liên tục theo ingredient |
| `dose_era` | Giai đoạn dùng thuốc ở liều ổn định |
| `condition_era` | Gộp conditions liên tục thành era |

### 1.6. Metadata (2 bảng)

| Bảng | Mô tả |
|------|-------|
| `cdm_source` | Thông tin nguồn dữ liệu, phiên bản CDM |
| `metadata` | Metadata bổ sung tùy ý |

---

## 2. Nguyên lý thiết kế cốt lõi

### 2.1. Person-Centric (Lấy bệnh nhân làm trung tâm)

Mọi bảng clinical đều **liên kết ngược về PERSON** qua khóa `person_id`:

```
                           ┌─────────────────────┐
                           │      PERSON          │
                           │  person_id (PK)      │
                           │  gender_concept_id   │
                           │  year_of_birth       │
                           └──────────┬──────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              │                       │                       │
   ┌──────────┴──────────┐  ┌────────┴────────┐  ┌──────────┴──────────┐
   │ OBSERVATION_PERIOD   │  │ VISIT_OCCURRENCE │  │ CONDITION_OCCURRENCE│
   │ person_id (FK)       │  │ person_id (FK)   │  │ person_id (FK)     │
   └─────────────────────┘  └──────┬──────────┘  └────────────────────┘
                                    │
              ┌────────────────────┼────────────────────┐
              │                    │                     │
   ┌──────────┴──────┐  ┌────────┴────────┐  ┌────────┴────────┐
   │ DRUG_EXPOSURE    │  │ PROCEDURE_OCC.  │  │ MEASUREMENT     │
   │ person_id (FK)   │  │ person_id (FK)  │  │ person_id (FK)  │
   │ visit_occ_id(FK) │  │ visit_occ_id(FK)│  │ visit_occ_id(FK)│
   └─────────────────┘  └────────────────┘  └────────────────┘
```

**Quy tắc:** Nếu một dòng dữ liệu không gắn được với `person_id`, nó **không nằm trong các bảng clinical**.

### 2.2. Event-Based (Dựa trên sự kiện)

Mỗi sự kiện y tế tạo **một bản ghi riêng** trong bảng tương ứng:

```
Ngày 10/06: Khám ngoại trú → 1 record trong VISIT_OCCURRENCE
  ├── Chẩn đoán tiểu đường  → 1 record trong CONDITION_OCCURRENCE
  ├── Chẩn đoán tăng HA      → 1 record trong CONDITION_OCCURRENCE
  ├── Kê Metformin 500mg      → 1 record trong DRUG_EXPOSURE
  ├── Kê Amlodipine 5mg       → 1 record trong DRUG_EXPOSURE
  ├── XN HbA1c = 7.8%         → 1 record trong MEASUREMENT
  └── XN Creatinine = 1.1     → 1 record trong MEASUREMENT
```

### 2.3. Concept-Driven (Dựa trên khái niệm chuẩn)

Mỗi giá trị lâm sàng được **mã hóa bằng concept_id** từ Standardized Vocabularies:

```
  Cột trong bảng CDM              Concept                    Vocabulary
  ─────────────────────────────────────────────────────────────────────
  gender_concept_id = 8532     →  "Female"                   [Gender]
  condition_concept_id = 201826 → "Type 2 diabetes mellitus" [SNOMED CT]
  drug_concept_id = 1503297    → "Metformin 500 MG Oral Tab" [RxNorm]
  measurement_concept_id = 3004410 → "Hemoglobin A1c"        [LOINC]
  unit_concept_id = 8554       → "percent (%)"               [UCUM]
```

### 2.4. Source Value Preservation (Bảo toàn giá trị gốc)

OMOP CDM **luôn giữ lại giá trị gốc** bên cạnh concept chuẩn:

```sql
-- Ví dụ: Bảng CONDITION_OCCURRENCE
condition_concept_id    = 201826        -- Standard Concept (SNOMED)
condition_source_value  = 'E11'         -- Mã gốc ICD-10 từ HIS
condition_source_concept_id = 443238    -- Concept ID của ICD-10 'E11'
```

Mô hình 3 cột cho mỗi trường concept:

| Cột | Mô tả | Bắt buộc |
|-----|-------|----------|
| `*_concept_id` | Standard Concept ID (SNOMED, RxNorm...) | ✅ |
| `*_source_value` | Giá trị gốc dạng text | Không |
| `*_source_concept_id` | Concept ID gốc (nếu có trong vocabulary) | Không |

### 2.5. Domain-Based Routing (Định tuyến theo miền)

Mỗi concept thuộc một **Domain** — và Domain quyết định bản ghi nằm ở **bảng nào**:

```
  Concept "Type 2 diabetes"
    → Domain = "Condition"
    → Lưu vào CONDITION_OCCURRENCE

  Concept "Metformin 500mg"
    → Domain = "Drug"
    → Lưu vào DRUG_EXPOSURE

  Concept "Hemoglobin A1c"
    → Domain = "Measurement"
    → Lưu vào MEASUREMENT

  Concept "Smoking status"
    → Domain = "Observation"
    → Lưu vào OBSERVATION
```

> **Lưu ý quan trọng:** Đôi khi mã nguồn ở domain này nhưng Standard Concept ở domain khác. Ví dụ: ICD-10 mã `Z87.891` (History of nicotine dependence) thuộc Condition nhưng Standard Concept map sang Observation domain → lưu vào bảng `OBSERVATION`, không phải `CONDITION_OCCURRENCE`.

---

## 3. Entity-Relationship Diagram tổng quát

```
┌──────────────────────────────────────────────────────────────────────────┐
│                           HEALTH SYSTEM                                  │
│                                                                          │
│  ┌──────────┐    ┌──────────────┐    ┌──────────────┐                   │
│  │ LOCATION │←───│  CARE_SITE   │───→│   PROVIDER   │                   │
│  │          │    │              │    │              │                   │
│  └────┬─────┘    └──────────────┘    └──────┬───────┘                   │
│       │                                      │                          │
└───────┼──────────────────────────────────────┼──────────────────────────┘
        │                                      │
        ↓                                      ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                           CLINICAL DATA                                  │
│                                                                          │
│  ┌───────────┐       ┌───────────────────┐                              │
│  │  PERSON   │←──────│ OBSERVATION_PERIOD│                              │
│  │           │       └───────────────────┘                              │
│  └─────┬─────┘                                                          │
│        │                                                                 │
│        ├──→ VISIT_OCCURRENCE ──→ VISIT_DETAIL                           │
│        │       │                                                         │
│        │       ├──→ CONDITION_OCCURRENCE                                 │
│        │       ├──→ DRUG_EXPOSURE                                        │
│        │       ├──→ PROCEDURE_OCCURRENCE                                 │
│        │       ├──→ MEASUREMENT                                          │
│        │       ├──→ OBSERVATION                                          │
│        │       ├──→ DEVICE_EXPOSURE                                      │
│        │       ├──→ NOTE ──→ NOTE_NLP                                   │
│        │       └──→ SPECIMEN                                             │
│        │                                                                 │
│        ├──→ DEATH                                                        │
│        ├──→ EPISODE ──→ EPISODE_EVENT                                   │
│        └──→ FACT_RELATIONSHIP                                           │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
        │
        ↓
┌─────────────────────────────────────────────────────────────────────────┐
│  HEALTH ECONOMICS                                                        │
│  PAYER_PLAN_PERIOD ←── PERSON                                           │
│  COST ←── (bất kỳ clinical event nào)                                   │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  DERIVED ELEMENTS                                                        │
│  DRUG_ERA, DOSE_ERA, CONDITION_ERA ←── tính toán từ clinical data       │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  STANDARDIZED VOCABULARIES                                               │
│  CONCEPT ←→ CONCEPT_RELATIONSHIP ←→ CONCEPT_ANCESTOR                   │
│  VOCABULARY, DOMAIN, CONCEPT_CLASS, RELATIONSHIP                        │
│  SOURCE_TO_CONCEPT_MAP, DRUG_STRENGTH, CONCEPT_SYNONYM                 │
│  COHORT, COHORT_DEFINITION                                              │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  METADATA: CDM_SOURCE, METADATA                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Conventions quan trọng trong CDM 5.4

### 4.1. Các trường chung (Common Fields)

Hầu hết bảng clinical đều có các trường sau:

| Trường | Kiểu | Mô tả |
|--------|------|-------|
| `*_id` (PK) | INTEGER | Khóa chính, unique |
| `person_id` (FK) | INTEGER | Liên kết đến PERSON |
| `*_concept_id` | INTEGER | Standard Concept ID |
| `*_date` | DATE | Ngày sự kiện |
| `*_datetime` | DATETIME | Ngày giờ sự kiện (nếu có) |
| `*_type_concept_id` | INTEGER | Nguồn gốc dữ liệu (EHR, claim, self-reported...) |
| `*_source_value` | VARCHAR(50) | Giá trị gốc từ hệ thống nguồn |
| `*_source_concept_id` | INTEGER | Concept ID gốc |
| `visit_occurrence_id` (FK) | INTEGER | Liên kết đến VISIT_OCCURRENCE |
| `provider_id` (FK) | INTEGER | Bác sĩ/nhân viên |

### 4.2. Quy ước về Concept ID

| Giá trị | Ý nghĩa |
|---------|---------|
| `0` | Không map được (No matching concept) |
| `> 0` | Concept hợp lệ trong bảng CONCEPT |
| `NULL` | Không áp dụng hoặc không có thông tin |

### 4.3. Quy ước về Date/Datetime

- `*_date` (DATE): **Bắt buộc** — ngày xảy ra sự kiện
- `*_datetime` (DATETIME): **Tùy chọn** — nếu không có giờ, đặt `*_datetime = *_date + 00:00:00`
- Ngày kết thúc: nếu sự kiện 1 ngày, `end_date = start_date`

### 4.4. Quy ước về Type Concept

`*_type_concept_id` cho biết **nguồn gốc** của bản ghi:

| type_concept_id | Ý nghĩa |
|-----------------|---------|
| 32817 | EHR (Electronic Health Record) |
| 32810 | Claim (Bảo hiểm) |
| 32856 | Lab test (Xét nghiệm) |
| 32883 | Survey (Khảo sát) |
| 32865 | Patient self-report |

---

## 5. CDM 5.4 — Điểm mới so với 5.3

| Thay đổi | Chi tiết |
|----------|----------|
| **Bảng EPISODE** | Ghi nhận disease episodes (VD: cancer treatment line 1, 2, 3) |
| **Bảng EPISODE_EVENT** | Liên kết clinical events với episodes |
| **measurement_event_id** | Cho phép Measurement liên kết đến event gốc (VD: Measurement từ Specimen nào) |
| **observation_event_id** | Tương tự cho Observation |
| **production_id** (DEVICE_EXPOSURE) | Unique Device Identifier (UDI) |
| **quantity** (DEVICE_EXPOSURE) | Số lượng thiết bị |

---

## 6. Bắt đầu từ đâu?

Lộ trình đọc series này:

```
Bài 1-3: Nền tảng (bạn đang ở đây)
    ↓
Bài 4-6: PERSON → OBSERVATION_PERIOD → VISIT
    ↓        (xây nền móng)
Bài 7-10: CONDITION → DRUG → PROCEDURE → MEASUREMENT
    ↓        (sự kiện lâm sàng chính)
Bài 11-13: OBSERVATION → DEVICE/NOTE/SPECIMEN → DEATH/EPISODE
    ↓        (bảng mở rộng)
Bài 14-16: Vocabulary system
    ↓        (hiểu concept sâu hơn)
Bài 17-19: Health System, Economics, Era tables
    ↓        (hạ tầng & tổng hợp)
Bài 20: Tổng kết & bước tiếp theo
```

---

## Tổng kết

Trong bài này, bạn đã nắm được:

1. **37 bảng** trong OMOP CDM 5.4, chia thành **6 nhóm**
2. **5 nguyên lý thiết kế**: Person-centric, Event-based, Concept-driven, Source preservation, Domain routing
3. **ER Diagram tổng quát** — cách các bảng liên kết với nhau
4. **Conventions chung** — common fields, concept ID rules, date/datetime, type concepts
5. **Điểm mới CDM 5.4** — EPISODE, event linkage, device tracking

**Bài tiếp theo:** Chúng ta sẽ đi sâu vào **Concept** — trái tim của OMOP CDM — hiểu Standard vs Source Concept, Domain, Vocabulary, và cách tra cứu trên Athena.

---

## Tài liệu tham khảo

- [OMOP CDM 5.4 Specification](https://ohdsi.github.io/CommonDataModel/cdm54.html)
- [CDM 5.4 Changes](https://ohdsi.github.io/CommonDataModel/cdm54Changes.html)
- [The Book of OHDSI — Chapter 4: The Common Data Model](https://ohdsi.github.io/TheBookOfOhdsi/CommonDataModel.html)
