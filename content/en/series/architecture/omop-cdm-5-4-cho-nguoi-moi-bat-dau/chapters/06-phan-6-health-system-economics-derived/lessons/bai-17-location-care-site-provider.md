---
id: 019f1a00-a117-7b01-e001-omopcdm54017
title: 'Lesson 17: LOCATION, CARE_SITE & PROVIDER — Medical facility system'
slug: bai-17-location-care-site-provider
description: >-
  Three Health System Data tables: LOCATION (geography), CARE_SITE (medical
  facility), PROVIDER (physician, medical staff) and how they link to clinical
  data.
duration_minutes: 45
is_free: true
video_url: null
sort_order: 17
section_title: 'Part 6: Health System, Economics & Derived Elements'
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: OMOP CDM 5.4 for Beginners — Understand A to Z
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop17" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop17)"/>
  <g>
    <circle cx="750" cy="80" r="24" fill="#818cf8" opacity="0.12"/>
    <circle cx="850" cy="120" r="20" fill="#818cf8" opacity="0.08"/>
    <circle cx="680" cy="150" r="18" fill="#818cf8" opacity="0.07"/>
    <line x1="600" y1="100" x2="1100" y2="260" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="130" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Architecture — Lesson 17</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">LOCATION, CARE_SITE &</tspan>
    <tspan x="60" dy="42">PROVIDER — Health facility system</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OMOP CDM 5.4 for Beginners — Understand A to Z</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 6: Health System, Economics & Derived Elements</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Health system hierarchy: Location → Care Site → Provider](/storage/uploads/2026/04/omop-cdm-bai17-health-system.webp)

## Introduction

The **Health System Data** group includes 3 tables describing *where* and *who* provides health services. In Vietnamese hospitals, this is where information about medical facilities (central, provincial, district), departments, and doctors in charge is stored.

---

## 1. LOCATION — Geographic location

### 1.1. Table structure

| Column | Type | Required | Description |
|-----|-------|----------|-------|
| `location_id` | INTEGER | ✅ PK | Unique ID |
| `address_1` | VARCHAR(50) | | Address line 1 |
| `address_2` | VARCHAR(50) | | Line 2 address |
| `city` | VARCHAR(50) | | City / District / District |
| `state` | VARCHAR(2) | | State/Province (US: 2 characters) |
| `zip` | VARCHAR(9) | | Postal code |
| `county` | VARCHAR(20) | | County |
| `location_source_value` | VARCHAR(50) | | Source code |
| `country_concept_id` | INTEGER | | FK → CONCEPT (country) |
| `country_source_value` | VARCHAR(80) | | Source country code |
| `latitude` | FLOAT | | Latitude |
| `longitude` | FLOAT | | Longitude |

### 1.2. ETL for Vietnam

```sql
INSERT INTO location (
    location_id,
    address_1,
    city,
    state,
    zip,
    country_concept_id,
    country_source_value,
    latitude,
    longitude
) VALUES (
    1001,
    '78 Giải Phóng',
    'Hai Bà Trưng',
    'HN',            -- Mã tỉnh 2 ký tự
    '100000',        -- Mã bưu điện VN
    4330442,         -- concept_id cho 'Viet Nam'
    'VN',
    21.0024,         -- Latitude
    105.8432         -- Longitude
);
```

> **Note VN:** School `state` only 2 characters — use shortened province codes (HN, HCM, DN...).
> If complete is needed, use `location_source_value` save "Hanoi".

---

## 2. CARE_SITE — Medical examination and treatment facility

### 2.1. Table structure

| Column | Type | Required | Description |
|-----|-------|----------|-------|
| `care_site_id` | INTEGER | ✅ PK | Unique ID |
| `care_site_name` | VARCHAR(255) | | Facility name |
| `place_of_service_concept_id` | INTEGER | | Facility type (FK → CONCEPT) |
| `location_id` | INTEGER | | FK → LOCATION |
| `care_site_source_value` | VARCHAR(50) | | Source code |
| `place_of_service_source_value` | VARCHAR(50) | | Source type code |

### 2.2. Type of medical facility (place_of_service_concept_id)

| Concept ID | Concept Name | VN example |
|-------------|-------------|-----------|
| 8717 | Inpatient Hospital | Department of Internal Medicine |
| 8756 | Outpatient Hospital | Outpatient clinic |
| 8940 | Office | Private clinic |
| 8883 | Skilled Nursing Facility | Nursing facility |
| 8716 | Home Health Agency | Home Care |
| 8761 | Emergency Room | Emergency Department |
| 581382 | Telehealth | Remote examination |

### 2.3. ETL example from Vietnamese hospital data

```sql
-- Bệnh viện Bạch Mai
INSERT INTO care_site VALUES (
    2001,                        -- care_site_id
    'Bệnh viện Bạch Mai',       -- care_site_name
    8717,                        -- Inpatient Hospital
    1001,                        -- location_id (78 GP, HBT)
    'BV-BACHMAI-001',            -- care_site_source_value
    'TUYEN_TW'                   -- place_of_service_source_value
);

-- Khoa Nội tiêu hóa - Bạch Mai
INSERT INTO care_site VALUES (
    2002,
    'Khoa Nội Tiêu hóa - BV Bạch Mai',
    8756,                        -- Outpatient Hospital
    1001,                        -- cùng location
    'BV-BM-NOI-TIEUHOA',
    'KHOA_NOITRU'
);
```

### 2.4. Vietnam decentralized model

```
  CARE_SITE (Tuyến TW)
  ├── BV Bạch Mai (care_site_id = 2001)
  │   ├── Khoa Nội Tiêu hóa (2002)
  │   ├── Khoa Tim mạch (2003)
  │   └── Khoa Cấp cứu (2004)
  │
  CARE_SITE (Tuyến Tỉnh)
  ├── BV Đa khoa Hà Nội (2010)
  │   ├── Khoa Ngoại (2011)
  │   └── Khoa Sản (2012)
  │
  CARE_SITE (Tuyến Huyện)
  └── TTYT Hoàng Mai (2020)
      └── Phòng khám đa khoa (2021)
```

> **Note:** OMOP CDM does not have a parent-child structure for CARE_SITE. If hierarchy is needed, use a naming convention or add a separate mapping table.

---

## 3. PROVIDER — Medical staff

### 3.1. Table structure

| Column | Type | Required | Description |
|-----|-------|----------|-------|
| `provider_id` | INTEGER | ✅ PK | Unique ID |
| `provider_name` | VARCHAR(255) | | Name (de-identify recommended) |
| `npi` | VARCHAR(20) | | National Provider Identifier (US) |
| `dea` | VARCHAR(20) | | DEA Number (US) |
| `specialty_concept_id` | INTEGER | | Specialty (FK → CONCEPT) |
| `care_site_id` | INTEGER | | FK → CARE_SITE |
| `year_of_birth` | INTEGER | | Year of birth |
| `gender_concept_id` | INTEGER | | Gender |
| `provider_source_value` | VARCHAR(50) | | Source code |
| `specialty_source_value` | VARCHAR(50) | | Source specialty code |
| `specialty_source_concept_id` | INTEGER | | FK → CONCEPT |
| `gender_source_value` | VARCHAR(50) | | Source Gender |
| `gender_source_concept_id` | INTEGER | | FK → CONCEPT |

### 3.2. Specialty in OMOP

```sql
-- Tìm specialty concepts phổ biến
SELECT
    c.concept_id,
    c.concept_name,
    c.vocabulary_id
FROM concept c
WHERE c.domain_id = 'Provider'
  AND c.standard_concept = 'S'
  AND c.concept_name LIKE '%Cardiol%'
ORDER BY c.concept_name;
-- 38004451 | Cardiology | Medicare Specialty
```

### 3.3. ETL for Vietnamese doctors

```sql
INSERT INTO provider (
    provider_id,
    provider_name,
    specialty_concept_id,
    care_site_id,
    provider_source_value,
    specialty_source_value
) VALUES (
    3001,
    NULL,                    -- De-identify: không lưu tên
    38004451,                -- Cardiology
    2003,                    -- Khoa Tim mạch - BV Bạch Mai
    'BS-BM-TM-001',         -- Mã bác sĩ nội bộ
    'TIM_MACH'               -- Chuyên khoa nguồn
);
```

> **De-identification:** In Vietnam, research data often needs to anonymize doctors. Set `provider_name = NULL` and just keep `provider_source_value` encryption.

---

## 4. Health System 3-table relationship

```
  ┌──────────┐
  │ LOCATION │  ← Địa lý (tỉnh, thành phố, tọa độ)
  │ 1001     │
  └────┬─────┘
       │ location_id
       ↓
  ┌──────────┐
  │CARE_SITE │  ← Cơ sở y tế (BV, Khoa)
  │ 2001     │
  └────┬─────┘
       │ care_site_id
       ↓
  ┌──────────┐
  │ PROVIDER │  ← Bác sĩ, nhân viên y tế
  │ 3001     │
  └──────────┘

  Ba bảng này được tham chiếu từ:
  ┌───────────────────────┐
  │ PERSON               │ ← location_id, care_site_id, provider_id
  │ VISIT_OCCURRENCE     │ ← care_site_id, provider_id
  │ CONDITION_OCCURRENCE │ ← provider_id
  │ DRUG_EXPOSURE        │ ← provider_id
  │ ... (tất cả bảng     │
  │      clinical)       │
  └───────────────────────┘
```

---

## 5. Analytical queries

### 5.1. Distribution of patients by medical facility

```sql
SELECT
    cs.care_site_name,
    c.concept_name AS facility_type,
    COUNT(DISTINCT vo.person_id) AS patient_count,
    COUNT(vo.visit_occurrence_id) AS visit_count
FROM visit_occurrence vo
JOIN care_site cs ON vo.care_site_id = cs.care_site_id
JOIN concept c ON cs.place_of_service_concept_id = c.concept_id
GROUP BY cs.care_site_name, c.concept_name
ORDER BY visit_count DESC;
```

### 5.2. Analysis by physician specialty

```sql
SELECT
    c_spec.concept_name AS specialty,
    COUNT(DISTINCT p.provider_id) AS provider_count,
    COUNT(DISTINCT co.person_id) AS patient_count,
    COUNT(*) AS diagnosis_count
FROM condition_occurrence co
JOIN provider p ON co.provider_id = p.provider_id
JOIN concept c_spec ON p.specialty_concept_id = c_spec.concept_id
GROUP BY c_spec.concept_name
ORDER BY diagnosis_count DESC
LIMIT 10;
```

### 5.3. Geographic distribution of patients (VN)

```sql
SELECT
    l.state AS province_code,
    l.city,
    COUNT(DISTINCT per.person_id) AS patient_count
FROM person per
JOIN location l ON per.location_id = l.location_id
WHERE l.country_concept_id = 4330442  -- Vietnam
GROUP BY l.state, l.city
ORDER BY patient_count DESC;
```

---

## Summary

1. **LOCATION**: geography (VN: 2-digit province code + postal code)
2. **CARE_SITE**: medical facility with `place_of_service_concept_id` classification
3. **PROVIDER**: medical staff, needs de-identification in research
4. Relationship: LOCATION → CARE_SITE → PROVIDER (hierarchy)
5. All clinical tables are referenced `provider_id` and `care_site_id`

**Next article:** PAYER_PLAN_PERIOD & COST — Medical and insurance costs.

---

## References

- [OMOP CDM 5.4 — LOCATION](https://ohdsi.github.io/CommonDataModel/cdm54.html#LOCATION)
- [OMOP CDM 5.4 — CARE_SITE](https://ohdsi.github.io/CommonDataModel/cdm54.html#CARE_SITE)
- [OMOP CDM 5.4 — PROVIDER](https://ohdsi.github.io/CommonDataModel/cdm54.html#PROVIDER)
