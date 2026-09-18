---
id: 019f1a00-a104-7b01-e001-omopcdm54004
title: "Bài 4: Bảng PERSON — Quản lý danh tính bệnh nhân"
slug: bai-4-bang-person-quan-ly-danh-tinh-benh-nhan
description: >-
  Cấu trúc bảng PERSON, các trường bắt buộc (person_id,
  gender_concept_id, year_of_birth), demographic data, liên kết
  với LOCATION và PROVIDER, ETL conventions cho dữ liệu Việt Nam.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 4
section_title: "Phần 2: Person & Visit — Nền tảng dữ liệu"
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: "OMOP CDM 5.4 cho Người mới — Hiểu từ A đến Z"
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop04" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop04)"/>
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Kiến trúc — Bài 4</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">Bảng PERSON — Quản lý</tspan>
    <tspan x="60" dy="42">danh tính bệnh nhân</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OMOP CDM 5.4 cho Người mới — Hiểu từ A đến Z</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 2: Person &amp; Visit — Nền tảng dữ liệu</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![PERSON — trung tâm của OMOP CDM, kết nối tất cả bảng lâm sàng](/storage/uploads/2026/04/omop-cdm-bai4-person-centric.webp)

## Giới thiệu

**PERSON** là bảng trung tâm của toàn bộ OMOP CDM — mọi bảng clinical đều tham chiếu đến PERSON qua `person_id`. Đây là nơi lưu trữ thông tin nhân khẩu học (demographics) của bệnh nhân.

Mỗi dòng trong PERSON = **một bệnh nhân duy nhất** (unique person).

---

## 1. Cấu trúc bảng PERSON

### 1.1. Danh sách cột đầy đủ

| Cột | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|-------|
| `person_id` | INTEGER | ✅ PK | ID duy nhất cho mỗi bệnh nhân |
| `gender_concept_id` | INTEGER | ✅ | Giới tính (Standard Concept) |
| `year_of_birth` | INTEGER | ✅ | Năm sinh |
| `month_of_birth` | INTEGER | | Tháng sinh |
| `day_of_birth` | INTEGER | | Ngày sinh |
| `birth_datetime` | DATETIME | | Ngày giờ sinh đầy đủ |
| `race_concept_id` | INTEGER | ✅ | Chủng tộc (Standard Concept) |
| `ethnicity_concept_id` | INTEGER | ✅ | Dân tộc (Standard Concept) |
| `location_id` | INTEGER | FK | Địa chỉ (tham chiếu LOCATION) |
| `provider_id` | INTEGER | FK | Bác sĩ chính (tham chiếu PROVIDER) |
| `care_site_id` | INTEGER | FK | Cơ sở y tế (tham chiếu CARE_SITE) |
| `person_source_value` | VARCHAR(50) | | Mã bệnh nhân gốc từ HIS |
| `gender_source_value` | VARCHAR(50) | | Giới tính gốc (VD: "Nu", "F") |
| `gender_source_concept_id` | INTEGER | | Concept ID giới tính gốc |
| `race_source_value` | VARCHAR(50) | | Chủng tộc gốc |
| `race_source_concept_id` | INTEGER | | Concept ID chủng tộc gốc |
| `ethnicity_source_value` | VARCHAR(50) | | Dân tộc gốc |
| `ethnicity_source_concept_id` | INTEGER | | Concept ID dân tộc gốc |

### 1.2. Entity-Relationship

```
  ┌──────────────┐       ┌──────────────┐       ┌──────────────┐
  │   LOCATION   │←──────│    PERSON    │──────→│   PROVIDER   │
  │ location_id  │       │  person_id   │       │ provider_id  │
  │ address_1    │       │  gender_*    │       │ provider_name│
  │ city         │       │  birth_*     │       │ specialty_*  │
  │ state        │       │  race_*      │       └──────────────┘
  │ zip          │       │  ethnicity_* │              ↑
  │ country_*    │       │  location_id │              │
  └──────────────┘       │  provider_id │       ┌──────┴───────┐
                         │  care_site_id│──────→│  CARE_SITE   │
                         └──────┬───────┘       │ care_site_id │
                                │               │ care_site_name│
                    ┌───────────┼───────────┐   └──────────────┘
                    ↓           ↓           ↓
             VISIT_OCC.    CONDITION    DRUG_EXPOSURE
             OBSERVATION   MEASUREMENT  ... (tất cả clinical)
```

---

## 2. Các trường quan trọng chi tiết

### 2.1. person_id

- **Kiểu**: INTEGER, Primary Key
- **Quy tắc**: Duy nhất, không thay đổi, không có ý nghĩa lâm sàng
- **Không phải** mã bệnh nhân gốc (mã BN gốc lưu ở `person_source_value`)

```sql
-- ĐÚNG: person_id là số tự tăng hoặc hash
person_id = 100001
person_source_value = 'BN-2024-00123'  -- Mã gốc từ HIS

-- SAI: Không dùng mã gốc làm person_id
-- person_id = 'BN-2024-00123'  ← SAI (phải là INTEGER)
```

### 2.2. gender_concept_id

| Concept ID | Concept Name | Mô tả |
|-----------|--------------|-------|
| 8507 | Male | Nam |
| 8532 | Female | Nữ |
| 8551 | UNKNOWN | Không rõ |
| 8521 | OTHER | Khác |

```sql
-- Ví dụ ETL cho dữ liệu Việt Nam
CASE
    WHEN gioi_tinh IN ('Nam', 'M', '1') THEN 8507    -- Male
    WHEN gioi_tinh IN ('Nữ', 'Nu', 'F', '2') THEN 8532  -- Female
    ELSE 8551  -- UNKNOWN
END AS gender_concept_id,
gioi_tinh AS gender_source_value
```

### 2.3. year_of_birth, month_of_birth, day_of_birth

- `year_of_birth`: **Bắt buộc** — nếu không có, không nạp bệnh nhân
- `month_of_birth`, `day_of_birth`: Tùy chọn — đặt NULL nếu không có
- `birth_datetime`: Tùy chọn — hữu ích cho nhi khoa (tính tuổi chính xác)

```sql
-- Ví dụ: BN sinh ngày 15/03/1980
year_of_birth  = 1980
month_of_birth = 3
day_of_birth   = 15
birth_datetime = '1980-03-15 00:00:00'
```

### 2.4. race_concept_id và ethnicity_concept_id

Đây là 2 trường theo chuẩn US Census. Cho dữ liệu Việt Nam:

| Trường | Khuyến nghị cho VN |
|--------|-------------------|
| `race_concept_id` | 8515 (Asian) |
| `race_source_value` | "Kinh", "Tày", "Mường"... |
| `ethnicity_concept_id` | 0 (No matching concept) |
| `ethnicity_source_value` | Ghi dân tộc gốc nếu có |

> **Lưu ý:** `race` và `ethnicity` trong OMOP theo chuẩn Mỹ (OMB). Khi ETL dữ liệu VN, ta vẫn phải đặt giá trị (dùng 0 nếu không map được) nhưng giữ thông tin gốc ở `*_source_value`.

---

## 3. Ví dụ thực tế

### 3.1. Bệnh nhân Việt Nam

```sql
INSERT INTO person VALUES (
    100001,                    -- person_id
    8532,                      -- gender_concept_id (Female)
    1980,                      -- year_of_birth
    3,                         -- month_of_birth
    15,                        -- day_of_birth
    '1980-03-15 00:00:00',     -- birth_datetime
    8515,                      -- race_concept_id (Asian)
    0,                         -- ethnicity_concept_id (N/A)
    1001,                      -- location_id (→ LOCATION table)
    5001,                      -- provider_id (→ PROVIDER table)
    2001,                      -- care_site_id (→ CARE_SITE table)
    'BN-2024-00123',           -- person_source_value
    'Nữ',                      -- gender_source_value
    0,                         -- gender_source_concept_id
    'Kinh',                    -- race_source_value
    0,                         -- race_source_concept_id
    NULL,                      -- ethnicity_source_value
    0                          -- ethnicity_source_concept_id
);
```

### 3.2. SQL truy vấn cơ bản

```sql
-- Đếm bệnh nhân theo giới tính
SELECT
    c.concept_name AS gender,
    COUNT(*) AS patient_count
FROM person p
JOIN concept c ON p.gender_concept_id = c.concept_id
GROUP BY c.concept_name;

-- Phân bố tuổi
SELECT
    EXTRACT(YEAR FROM CURRENT_DATE) - year_of_birth AS age,
    COUNT(*) AS count
FROM person
GROUP BY 1
ORDER BY 1;

-- Tìm bệnh nhân có dữ liệu gốc
SELECT
    person_id,
    person_source_value AS ma_bn_goc,
    gender_source_value AS gioi_tinh_goc,
    race_source_value AS dan_toc
FROM person
WHERE person_source_value IS NOT NULL
LIMIT 10;
```

---

## 4. ETL Conventions

### 4.1. Quy tắc quan trọng

| Quy tắc | Chi tiết |
|---------|----------|
| **1 person = 1 record** | Không trùng lặp, cần deduplicate |
| **year_of_birth bắt buộc** | Bỏ qua BN nếu không có năm sinh |
| **gender_concept_id bắt buộc** | Đặt 8551 (UNKNOWN) nếu không rõ |
| **person_id không mang ý nghĩa** | Đừng dùng mã BN gốc hoặc CMND/CCCD |
| **Không lưu PII trực tiếp** | Không có cột tên, CMND, sdt trong PERSON |

### 4.2. De-identification (Khử danh)

OMOP CDM **không có cột tên, số CMND/CCCD, số điện thoại**. Đây là thiết kế có chủ đích:

```
  HIS gốc (có PII):                    OMOP CDM (de-identified):
  ┌─────────────────────────┐          ┌──────────────────────────┐
  │ ma_bn: BN-2024-00123    │    →     │ person_id: 100001        │
  │ ho_ten: Nguyễn Thị Lan  │    →     │ (không có cột tên!)      │
  │ cmnd: 079123456789      │    →     │ (không có cột CMND!)     │
  │ sdt: 0901234567         │    →     │ (không có cột SĐT!)     │
  │ ngay_sinh: 15/03/1980   │    →     │ year_of_birth: 1980      │
  │ gioi_tinh: Nữ           │    →     │ gender_concept_id: 8532  │
  └─────────────────────────┘          └──────────────────────────┘
```

> **Lưu ý:** `person_source_value` có thể chứa mã BN gốc (để truy vết). Tùy tổ chức có thể hash hoặc mã hóa giá trị này.

### 4.3. Xử lý trùng lặp

Khi bệnh nhân có ≥2 mã ở nhiều hệ thống:

```
  HIS BV Chợ Rẫy: BN-CR-001   ┐
  HIS BV Bạch Mai: BN-BM-555   ├──→ person_id = 100001
  BHXH: DN-7900123456789        ┘    (1 person duy nhất)
```

ETL cần thực hiện **Patient Matching** (khớp bệnh nhân) trước khi nạp vào PERSON.

---

## 5. Mối quan hệ với các bảng khác

```sql
-- Tất cả dữ liệu lâm sàng của 1 bệnh nhân
SELECT 'Visits' AS data_type, COUNT(*) AS count
FROM visit_occurrence WHERE person_id = 100001
UNION ALL
SELECT 'Conditions', COUNT(*)
FROM condition_occurrence WHERE person_id = 100001
UNION ALL
SELECT 'Drugs', COUNT(*)
FROM drug_exposure WHERE person_id = 100001
UNION ALL
SELECT 'Measurements', COUNT(*)
FROM measurement WHERE person_id = 100001
UNION ALL
SELECT 'Observations', COUNT(*)
FROM observation WHERE person_id = 100001;
```

---

## 6. Các lỗi ETL thường gặp

| Lỗi | Hậu quả | Cách khắc phục |
|-----|---------|---------------|
| Trùng person_id | Ghi đè dữ liệu | Kiểm tra unique constraint |
| year_of_birth = NULL | Vi phạm NOT NULL | Bỏ qua hoặc impute |
| gender_concept_id sai | Phân tích sai giới tính | Mapping chính xác |
| Để PII vào source_value | Vi phạm de-identification | Hash hoặc loại bỏ |
| Không deduplicate | 1 BN thành nhiều person | Patient matching trước ETL |

---

## Tổng kết

1. **PERSON** là bảng trung tâm — mọi bảng clinical tham chiếu qua `person_id`
2. **Trường bắt buộc**: person_id, gender_concept_id, year_of_birth, race_concept_id, ethnicity_concept_id
3. **Không chứa PII** (tên, CMND, SĐT) — thiết kế de-identified
4. **Liên kết**: LOCATION (địa chỉ), CARE_SITE (cơ sở), PROVIDER (bác sĩ chính)
5. **ETL VN**: gender mapping, race = Asian (8515), ethnicity = 0

**Bài tiếp theo:** OBSERVATION_PERIOD — tại sao cần biết "khoảng thời gian theo dõi" và cách nó ảnh hưởng đến mọi phân tích.

---

## Tài liệu tham khảo

- [OMOP CDM 5.4 — PERSON](https://ohdsi.github.io/CommonDataModel/cdm54.html#PERSON)
- [The Book of OHDSI — Chapter 4.1](https://ohdsi.github.io/TheBookOfOhdsi/CommonDataModel.html)
