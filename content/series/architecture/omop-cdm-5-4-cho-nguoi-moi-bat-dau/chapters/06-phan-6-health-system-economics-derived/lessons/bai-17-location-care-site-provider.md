---
id: 019f1a00-a117-7b01-e001-omopcdm54017
title: "Bài 17: LOCATION, CARE_SITE & PROVIDER — Hệ thống cơ sở y tế"
slug: bai-17-location-care-site-provider
description: >-
  Ba bảng Health System Data: LOCATION (địa lý), CARE_SITE
  (cơ sở khám chữa bệnh), PROVIDER (bác sĩ, nhân viên y tế)
  và cách chúng liên kết với dữ liệu lâm sàng.
duration_minutes: 45
is_free: true
video_url: null
sort_order: 17
section_title: "Phần 6: Health System, Economics & Derived Elements"
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: "OMOP CDM 5.4 cho Người mới — Hiểu từ A đến Z"
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Kiến trúc — Bài 17</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">LOCATION, CARE_SITE &amp;</tspan>
    <tspan x="60" dy="42">PROVIDER — Hệ thống CSYT</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OMOP CDM 5.4 cho Người mới — Hiểu từ A đến Z</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 6: Health System, Economics &amp; Derived Elements</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Phân cấp hệ thống y tế: Location → Care Site → Provider](/storage/uploads/2026/04/omop-cdm-bai17-health-system.webp)

## Giới thiệu

Nhóm **Health System Data** gồm 3 bảng mô tả *nơi* và *ai* cung cấp dịch vụ y tế. Trong bệnh viện Việt Nam, đây là nơi lưu thông tin cơ sở y tế (tuyến trung ương, tỉnh, huyện), phòng khoa, và bác sĩ phụ trách.

---

## 1. LOCATION — Địa điểm địa lý

### 1.1. Cấu trúc bảng

| Cột | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|-------|
| `location_id` | INTEGER | ✅ PK | ID duy nhất |
| `address_1` | VARCHAR(50) | | Địa chỉ dòng 1 |
| `address_2` | VARCHAR(50) | | Địa chỉ dòng 2 |
| `city` | VARCHAR(50) | | Thành phố / Quận / Huyện |
| `state` | VARCHAR(2) | | Bang/Tỉnh (US: 2 ký tự) |
| `zip` | VARCHAR(9) | | Mã bưu điện |
| `county` | VARCHAR(20) | | County |
| `location_source_value` | VARCHAR(50) | | Mã nguồn |
| `country_concept_id` | INTEGER | | FK → CONCEPT (quốc gia) |
| `country_source_value` | VARCHAR(80) | | Mã quốc gia nguồn |
| `latitude` | FLOAT | | Vĩ độ |
| `longitude` | FLOAT | | Kinh độ |

### 1.2. ETL cho Việt Nam

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

> **Lưu ý VN:** Trường `state` chỉ 2 ký tự — dùng mã tỉnh rút gọn (HN, HCM, DN...).
> Nếu cần đầy đủ, dùng `location_source_value` lưu "Hà Nội".

---

## 2. CARE_SITE — Cơ sở khám chữa bệnh

### 2.1. Cấu trúc bảng

| Cột | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|-------|
| `care_site_id` | INTEGER | ✅ PK | ID duy nhất |
| `care_site_name` | VARCHAR(255) | | Tên cơ sở |
| `place_of_service_concept_id` | INTEGER | | Loại cơ sở (FK → CONCEPT) |
| `location_id` | INTEGER | | FK → LOCATION |
| `care_site_source_value` | VARCHAR(50) | | Mã nguồn |
| `place_of_service_source_value` | VARCHAR(50) | | Mã loại nguồn |

### 2.2. Loại cơ sở y tế (place_of_service_concept_id)

| Concept ID | Concept Name | Ví dụ VN |
|------------|-------------|-----------|
| 8717 | Inpatient Hospital | Khoa Nội trú |
| 8756 | Outpatient Hospital | Phòng khám ngoại trú |
| 8940 | Office | Phòng khám tư |
| 8883 | Skilled Nursing Facility | Cơ sở điều dưỡng |
| 8716 | Home Health Agency | Chăm sóc tại nhà |
| 8761 | Emergency Room | Khoa Cấp cứu |
| 581382 | Telehealth | Khám từ xa |

### 2.3. Ví dụ ETL từ dữ liệu bệnh viện VN

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

### 2.4. Mô hình phân cấp VN

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

> **Lưu ý:** OMOP CDM không có cấu trúc parent-child cho CARE_SITE. Nếu cần phân cấp, dùng convention đặt tên hoặc thêm bảng mapping riêng.

---

## 3. PROVIDER — Nhân viên y tế

### 3.1. Cấu trúc bảng

| Cột | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|-------|
| `provider_id` | INTEGER | ✅ PK | ID duy nhất |
| `provider_name` | VARCHAR(255) | | Tên (khuyến nghị de-identify) |
| `npi` | VARCHAR(20) | | National Provider Identifier (US) |
| `dea` | VARCHAR(20) | | DEA Number (US) |
| `specialty_concept_id` | INTEGER | | Chuyên khoa (FK → CONCEPT) |
| `care_site_id` | INTEGER | | FK → CARE_SITE |
| `year_of_birth` | INTEGER | | Năm sinh |
| `gender_concept_id` | INTEGER | | Giới tính |
| `provider_source_value` | VARCHAR(50) | | Mã nguồn |
| `specialty_source_value` | VARCHAR(50) | | Mã chuyên khoa nguồn |
| `specialty_source_concept_id` | INTEGER | | FK → CONCEPT |
| `gender_source_value` | VARCHAR(50) | | Giới tính nguồn |
| `gender_source_concept_id` | INTEGER | | FK → CONCEPT |

### 3.2. Specialty trong OMOP

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

### 3.3. ETL cho bác sĩ VN

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

> **De-identification:** Ở VN dữ liệu nghiên cứu thường cần ẩn danh bác sĩ. Set `provider_name = NULL` và chỉ giữ `provider_source_value` mã hóa.

---

## 4. Quan hệ 3 bảng Health System

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

## 5. Truy vấn phân tích

### 5.1. Phân bổ bệnh nhân theo cơ sở y tế

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

### 5.2. Phân tích theo chuyên khoa bác sĩ

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

### 5.3. Phân bố địa lý bệnh nhân (VN)

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

## Tổng kết

1. **LOCATION**: địa lý (VN: mã tỉnh 2 ký tự + mã bưu điện)
2. **CARE_SITE**: cơ sở y tế với `place_of_service_concept_id` phân loại
3. **PROVIDER**: nhân viên y tế, cần de-identify trong nghiên cứu
4. Quan hệ: LOCATION → CARE_SITE → PROVIDER (hệ thống phân cấp)
5. Tất cả bảng lâm sàng đều tham chiếu `provider_id` và `care_site_id`

**Bài tiếp theo:** PAYER_PLAN_PERIOD & COST — Chi phí y tế và bảo hiểm.

---

## Tài liệu tham khảo

- [OMOP CDM 5.4 — LOCATION](https://ohdsi.github.io/CommonDataModel/cdm54.html#LOCATION)
- [OMOP CDM 5.4 — CARE_SITE](https://ohdsi.github.io/CommonDataModel/cdm54.html#CARE_SITE)
- [OMOP CDM 5.4 — PROVIDER](https://ohdsi.github.io/CommonDataModel/cdm54.html#PROVIDER)
