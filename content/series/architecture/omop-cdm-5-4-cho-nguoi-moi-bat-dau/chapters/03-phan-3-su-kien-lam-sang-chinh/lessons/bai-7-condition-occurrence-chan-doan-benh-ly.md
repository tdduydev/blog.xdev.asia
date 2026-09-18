---
id: 019f1a00-a107-7b01-e001-omopcdm54007
title: "Bài 7: CONDITION_OCCURRENCE — Chẩn đoán & Bệnh lý"
slug: bai-7-condition-occurrence-chan-doan-benh-ly
description: >-
  Ghi nhận chẩn đoán, triệu chứng, dấu hiệu bệnh lý,
  condition_concept_id vs source_value, condition_status
  (admitting/primary/secondary), liên kết với Visit và Provider,
  phân biệt với OBSERVATION table.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 7
section_title: "Phần 3: Sự kiện lâm sàng chính"
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: "OMOP CDM 5.4 cho Người mới — Hiểu từ A đến Z"
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop07" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop07)"/>
  <g>
    <circle cx="659" cy="87" r="22" fill="#818cf8" opacity="0.12"/>
    <circle cx="718" cy="106" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="777" cy="125" r="36" fill="#818cf8" opacity="0.06"/>
    <circle cx="895" cy="163" r="20" fill="#818cf8" opacity="0.1"/>
    <line x1="600" y1="157" x2="1100" y2="237" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Kiến trúc — Bài 7</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">CONDITION_OCCURRENCE</tspan>
    <tspan x="60" dy="42">Chẩn đoán &amp; Bệnh lý</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OMOP CDM 5.4 cho Người mới — Hiểu từ A đến Z</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 3: Sự kiện lâm sàng chính</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Quy trình mapping ICD-10 → SNOMED trong CONDITION_OCCURRENCE](/storage/uploads/2026/04/omop-cdm-bai7-condition-mapping.webp)

## Giới thiệu

**CONDITION_OCCURRENCE** ghi nhận mọi chẩn đoán, triệu chứng, và dấu hiệu bệnh lý mà bác sĩ ghi nhận cho bệnh nhân. Đây thường là bảng được phân tích nhiều nhất trong OMOP CDM — vì nghiên cứu y tế thường bắt đầu từ câu hỏi: "Ai bị bệnh gì?"

---

## 1. Cấu trúc bảng

| Cột | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|-------|
| `condition_occurrence_id` | INTEGER | ✅ PK | ID duy nhất |
| `person_id` | INTEGER | ✅ FK | Bệnh nhân |
| `condition_concept_id` | INTEGER | ✅ | Standard Concept (SNOMED) |
| `condition_start_date` | DATE | ✅ | Ngày bắt đầu chẩn đoán |
| `condition_start_datetime` | DATETIME | | Ngày giờ |
| `condition_end_date` | DATE | | Ngày hết chẩn đoán |
| `condition_end_datetime` | DATETIME | | Ngày giờ kết thúc |
| `condition_type_concept_id` | INTEGER | ✅ | Nguồn dữ liệu |
| `condition_status_concept_id` | INTEGER | | Trạng thái (Primary, Admitting...) |
| `stop_reason` | VARCHAR(20) | | Lý do ngưng chẩn đoán |
| `provider_id` | INTEGER | FK | Bác sĩ chẩn đoán |
| `visit_occurrence_id` | INTEGER | FK | Visit liên quan |
| `visit_detail_id` | INTEGER | FK | Visit detail (khoa nào) |
| `condition_source_value` | VARCHAR(50) | | Mã gốc (VD: "E11") |
| `condition_source_concept_id` | INTEGER | | Concept gốc |
| `condition_status_source_value` | VARCHAR(50) | | Status gốc |

---

## 2. Lưu gì vào CONDITION_OCCURRENCE?

### 2.1. NÊN lưu

| Loại | Ví dụ | Vocabulary |
|------|-------|------------|
| Chẩn đoán bệnh | Tiểu đường type 2, Viêm phổi | SNOMED CT |
| Triệu chứng | Sốt, Đau bụng, Ho | SNOMED CT |
| Dấu hiệu lâm sàng | Phù chân, Vàng da | SNOMED CT |
| Chẩn đoán phân biệt | Nghi ngờ lao phổi | SNOMED CT |

### 2.2. KHÔNG NÊN lưu (lưu ở bảng khác)

| Loại | Bảng đích | Lý do |
|------|-----------|-------|
| "Tiền sử tiểu đường" | OBSERVATION | Domain = Observation |
| "Không bị dị ứng" | OBSERVATION | Absence → Observation |
| "BMI = 28" | MEASUREMENT | Domain = Measurement |
| Tác dụng phụ thuốc | CONDITION + DRUG_EXPOSURE | Condition cho ADR, Drug cho thuốc gây ra |

---

## 3. condition_status_concept_id — Trạng thái chẩn đoán

| Concept ID | Status | Ý nghĩa |
|-----------|--------|---------|
| 32902 | Primary diagnosis | Chẩn đoán chính |
| 32908 | Secondary diagnosis | Chẩn đoán phụ |
| 32903 | Admitting diagnosis | Chẩn đoán lúc nhập viện |
| 32904 | Discharge diagnosis | Chẩn đoán lúc xuất viện |
| 32906 | Provisional diagnosis | Chẩn đoán tạm thời |
| 32907 | Confirmed diagnosis | Chẩn đoán xác nhận |

```sql
-- Ví dụ: BN nhập viện
-- Chẩn đoán nhập viện: Nghi lao phổi (provisional)
INSERT INTO condition_occurrence VALUES (
    70001, 100001, 255848,       -- SNOMED: Pneumonia
    '2024-06-10', NULL,
    '2024-06-20', NULL,
    32817,                        -- EHR
    32903,                        -- Admitting diagnosis
    NULL, 5001, 50001, NULL,
    'J18.9', 0,                   -- ICD-10: Pneumonia, unspecified
    'admitting'
);

-- Chẩn đoán xuất viện: Viêm phổi do phế cầu (confirmed)
INSERT INTO condition_occurrence VALUES (
    70002, 100001, 257315,       -- SNOMED: Pneumococcal pneumonia
    '2024-06-10', NULL,
    '2024-06-20', NULL,
    32817,                        -- EHR
    32904,                        -- Discharge diagnosis
    NULL, 5001, 50001, NULL,
    'J13', 0,                     -- ICD-10
    'discharge'
);
```

---

## 4. ETL cho dữ liệu ICD-10 Việt Nam

### 4.1. Quy trình mapping

```
  HIS: ma_benh = 'E11.65'  (ICD-10-CM)
       ten_benh = 'ĐTĐ type 2 có biến chứng mạch máu ngoại vi'
       │
       │ Bước 1: Tìm source concept
       ↓
  SOURCE CONCEPT: concept_id = 45591837
       vocabulary_id = ICD10CM
       concept_code = 'E11.65'
       │
       │ Bước 2: Tìm Standard Concept (Maps to)
       ↓
  STANDARD CONCEPT: concept_id = 201826
       vocabulary_id = SNOMED
       concept_name = 'Type 2 diabetes mellitus'
       domain_id = 'Condition'
```

```sql
-- SQL ETL
SELECT
    ROW_NUMBER() OVER() AS condition_occurrence_id,
    pm.person_id,
    COALESCE(cr.concept_id_2, 0) AS condition_concept_id,
    cd.ngay_chandoan AS condition_start_date,
    NULL AS condition_end_date,
    32817 AS condition_type_concept_id,
    CASE cd.loai_chandoan
        WHEN 'CHINH' THEN 32902   -- Primary
        WHEN 'PHU'   THEN 32908   -- Secondary
        ELSE 0
    END AS condition_status_concept_id,
    cd.ma_icd10 AS condition_source_value,
    COALESCE(c_source.concept_id, 0) AS condition_source_concept_id
FROM chandoan_his cd
JOIN person_mapping pm ON cd.ma_bn = pm.source_id
LEFT JOIN concept c_source
    ON cd.ma_icd10 = c_source.concept_code
    AND c_source.vocabulary_id = 'ICD10CM'
LEFT JOIN concept_relationship cr
    ON c_source.concept_id = cr.concept_id_1
    AND cr.relationship_id = 'Maps to'
LEFT JOIN concept c_std
    ON cr.concept_id_2 = c_std.concept_id
    AND c_std.standard_concept = 'S';
```

### 4.2. Xử lý dữ liệu đặc thù VN

| Vấn đề | Giải pháp |
|--------|-----------|
| ICD-10-VN khác ICD-10-CM | Mapping qua SOURCE_TO_CONCEPT_MAP |
| Mã nội bộ BV | Usagi mapping tool |
| Thiếu ngày kết thúc | condition_end_date = NULL (hợp lệ) |
| 1 ICD map nhiều SNOMED | Chọn concept phù hợp nhất |

---

## 5. Phân biệt CONDITION vs OBSERVATION

| Tiêu chí | CONDITION_OCCURRENCE | OBSERVATION |
|-----------|---------------------|-------------|
| **Nội dung** | Bệnh hiện tại / đang điều trị | Tiền sử, lối sống, ghi nhận |
| **Ví dụ** | "Tiểu đường type 2" | "Tiền sử tiểu đường gia đình" |
| **Domain** | Condition | Observation |
| **Standard Vocab** | SNOMED CT | SNOMED CT |
| **Khi nào?** | Bệnh đang hoạt động | Ghi nhận thông tin |

> **Quy tắc:** Luôn kiểm tra **domain_id** của Standard Concept trên Athena. Nếu domain = "Observation", lưu vào OBSERVATION dù nguồn là ICD-10.

---

## 6. SQL phân tích phổ biến

```sql
-- Top 10 chẩn đoán phổ biến nhất
SELECT
    c.concept_name AS condition_name,
    COUNT(DISTINCT co.person_id) AS patient_count,
    COUNT(*) AS record_count
FROM condition_occurrence co
JOIN concept c ON co.condition_concept_id = c.concept_id
WHERE co.condition_concept_id != 0
GROUP BY c.concept_name
ORDER BY patient_count DESC
LIMIT 10;

-- Tỉ lệ mắc bệnh theo giới tính
SELECT
    g.concept_name AS gender,
    c.concept_name AS condition_name,
    COUNT(DISTINCT co.person_id) AS patients
FROM condition_occurrence co
JOIN person p ON co.person_id = p.person_id
JOIN concept g ON p.gender_concept_id = g.concept_id
JOIN concept c ON co.condition_concept_id = c.concept_id
WHERE co.condition_concept_id = 201826  -- Type 2 DM
GROUP BY g.concept_name, c.concept_name;

-- Comorbidity: BN tiểu đường có tăng huyết áp?
SELECT
    COUNT(DISTINCT co_dm.person_id) AS dm_patients,
    COUNT(DISTINCT co_ht.person_id) AS dm_with_hypertension,
    ROUND(
        COUNT(DISTINCT co_ht.person_id) * 100.0 /
        NULLIF(COUNT(DISTINCT co_dm.person_id), 0), 1
    ) AS comorbidity_pct
FROM condition_occurrence co_dm
LEFT JOIN condition_occurrence co_ht
    ON co_dm.person_id = co_ht.person_id
    AND co_ht.condition_concept_id IN (
        SELECT descendant_concept_id
        FROM concept_ancestor
        WHERE ancestor_concept_id = 320128  -- Essential hypertension
    )
WHERE co_dm.condition_concept_id IN (
    SELECT descendant_concept_id
    FROM concept_ancestor
    WHERE ancestor_concept_id = 201826  -- Type 2 DM
);
```

---

## Tổng kết

1. **CONDITION_OCCURRENCE** = chẩn đoán, triệu chứng, dấu hiệu bệnh lý
2. **condition_concept_id** dùng Standard Concept (SNOMED CT)
3. **condition_status**: Primary, Secondary, Admitting, Discharge
4. **Bộ ba cột**: concept_id / source_value / source_concept_id
5. **Phân biệt** CONDITION (bệnh hiện tại) vs OBSERVATION (tiền sử, ghi nhận)
6. **ETL VN**: ICD-10-VN → Source Concept → Maps to → Standard SNOMED

**Bài tiếp theo:** DRUG_EXPOSURE — cách OMOP CDM ghi nhận thuốc, kê đơn, và vaccine.

---

## Tài liệu tham khảo

- [OMOP CDM 5.4 — CONDITION_OCCURRENCE](https://ohdsi.github.io/CommonDataModel/cdm54.html#CONDITION_OCCURRENCE)
- [Athena — Condition Domain](https://athena.ohdsi.org/)
