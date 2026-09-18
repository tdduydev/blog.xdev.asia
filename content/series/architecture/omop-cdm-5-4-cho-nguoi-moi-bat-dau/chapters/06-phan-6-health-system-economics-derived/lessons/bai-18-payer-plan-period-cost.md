---
id: 019f1a00-a118-7b01-e001-omopcdm54018
title: "Bài 18: PAYER_PLAN_PERIOD & COST — Chi phí y tế và bảo hiểm"
slug: bai-18-payer-plan-period-cost
description: >-
  PAYER_PLAN_PERIOD theo dõi quyền lợi bảo hiểm,
  COST ghi nhận chi phí từng sự kiện lâm sàng.
  Ứng dụng cho phân tích BHXH/BHYT tại Việt Nam.
duration_minutes: 45
is_free: true
video_url: null
sort_order: 18
section_title: "Phần 6: Health System, Economics & Derived Elements"
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: "OMOP CDM 5.4 cho Người mới — Hiểu từ A đến Z"
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop18" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop18)"/>
  <g>
    <circle cx="720" cy="100" r="22" fill="#818cf8" opacity="0.12"/>
    <circle cx="820" cy="130" r="26" fill="#818cf8" opacity="0.08"/>
    <circle cx="900" cy="90" r="18" fill="#818cf8" opacity="0.07"/>
    <line x1="650" y1="140" x2="1100" y2="250" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="130" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Kiến trúc — Bài 18</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">PAYER_PLAN_PERIOD &amp;</tspan>
    <tspan x="60" dy="42">COST — Chi phí y tế</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OMOP CDM 5.4 cho Người mới — Hiểu từ A đến Z</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 6: Health System, Economics &amp; Derived Elements</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Luồng chi phí y tế và BHYT chi trả](/storage/uploads/2026/04/omop-cdm-bai18-cost-insurance.webp)

## Giới thiệu

Nhóm **Health Economics Data** gồm bảng **PAYER_PLAN_PERIOD** (quyền lợi bảo hiểm) và **COST** (chi phí từng dịch vụ). Ở VN, phần này map với dữ liệu **BHYT** (Bảo hiểm Y tế) và bảng thanh toán viện phí.

---

## 1. PAYER_PLAN_PERIOD — Thời gian bảo hiểm

### 1.1. Cấu trúc bảng

| Cột | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|-------|
| `payer_plan_period_id` | INTEGER | ✅ PK | ID duy nhất |
| `person_id` | INTEGER | ✅ | FK → PERSON |
| `payer_plan_period_start_date` | DATE | ✅ | Ngày bắt đầu |
| `payer_plan_period_end_date` | DATE | ✅ | Ngày kết thúc |
| `payer_concept_id` | INTEGER | | Đơn vị chi trả (FK → CONCEPT) |
| `payer_source_value` | VARCHAR(50) | | Mã nguồn payer |
| `payer_source_concept_id` | INTEGER | | FK → CONCEPT |
| `plan_concept_id` | INTEGER | | Loại gói bảo hiểm |
| `plan_source_value` | VARCHAR(50) | | Mã nguồn plan |
| `plan_source_concept_id` | INTEGER | | FK → CONCEPT |
| `sponsor_concept_id` | INTEGER | | Nhà tài trợ |
| `sponsor_source_value` | VARCHAR(50) | | Mã nguồn sponsor |
| `sponsor_source_concept_id` | INTEGER | | FK → CONCEPT |
| `family_source_value` | VARCHAR(50) | | Mã gia đình |
| `stop_reason_concept_id` | INTEGER | | Lý do ngừng |
| `stop_reason_source_value` | VARCHAR(50) | | Mã lý do nguồn |
| `stop_reason_source_concept_id` | INTEGER | | FK → CONCEPT |

### 1.2. Mapping BHYT Việt Nam

```
  Nguồn VN (BHXH)              →    OMOP CDM
  ─────────────────────────────────────────────
  Mã thẻ BHYT: DN4-01-001      →    payer_source_value
  Loại đối tượng: Hưu trí      →    payer_concept_id
  Ngày cấp: 01/01/2024         →    payer_plan_period_start_date
  Ngày hết hạn: 31/12/2024     →    payer_plan_period_end_date
  Nơi ĐKKCB: BV Bạch Mai       →    plan_source_value
  BHXH Hà Nội                  →    sponsor_source_value
```

### 1.3. ETL ví dụ

```sql
INSERT INTO payer_plan_period (
    payer_plan_period_id,
    person_id,
    payer_plan_period_start_date,
    payer_plan_period_end_date,
    payer_concept_id,
    payer_source_value,
    plan_source_value,
    sponsor_source_value
) VALUES (
    5001,
    100001,
    '2024-01-01',
    '2024-12-31',
    0,                       -- Concept cho BHYT VN (cần mapping)
    'DN4-01-001',            -- Mã thẻ BHYT
    'BV-BACHMAI-001',        -- Nơi ĐKKCB ban đầu
    'BHXH_HANOI'             -- Cơ quan BHXH
);
```

### 1.4. Kiểm tra overlap

```sql
-- BN có nhiều giai đoạn BHYT chồng chéo?
SELECT
    p1.person_id,
    p1.payer_plan_period_start_date AS start_1,
    p1.payer_plan_period_end_date AS end_1,
    p2.payer_plan_period_start_date AS start_2,
    p2.payer_plan_period_end_date AS end_2
FROM payer_plan_period p1
JOIN payer_plan_period p2
    ON p1.person_id = p2.person_id
    AND p1.payer_plan_period_id < p2.payer_plan_period_id
    AND p1.payer_plan_period_start_date <= p2.payer_plan_period_end_date
    AND p2.payer_plan_period_start_date <= p1.payer_plan_period_end_date;
```

---

## 2. COST — Chi phí dịch vụ y tế

### 2.1. Cấu trúc bảng

| Cột | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|-------|
| `cost_id` | INTEGER | ✅ PK | ID duy nhất |
| `cost_event_id` | INTEGER | ✅ | FK → clinical event PK |
| `cost_domain_id` | VARCHAR(20) | ✅ | Domain của event (Visit, Drug...) |
| `cost_type_concept_id` | INTEGER | ✅ | Loại (charge/cost/payment) |
| `currency_concept_id` | INTEGER | | Đơn vị tiền tệ |
| `total_charge` | FLOAT | | Tổng phí |
| `total_cost` | FLOAT | | Tổng chi phí |
| `total_paid` | FLOAT | | Tổng đã thanh toán |
| `paid_by_payer` | FLOAT | | BHYT chi trả |
| `paid_by_patient` | FLOAT | | BN tự trả |
| `paid_patient_copay` | FLOAT | | Đồng chi trả |
| `paid_patient_coinsurance` | FLOAT | | Đồng bảo hiểm |
| `paid_patient_deductible` | FLOAT | | Khoản khấu trừ |
| `paid_by_primary` | FLOAT | | BH chính chi trả |
| `paid_ingredient_cost` | FLOAT | | Chi phí hoạt chất |
| `paid_dispensing_fee` | FLOAT | | Phí bán thuốc |
| `payer_plan_period_id` | INTEGER | | FK → PAYER_PLAN_PERIOD |
| `amount_allowed` | FLOAT | | Mức cho phép |
| `revenue_code_concept_id` | INTEGER | | Mã doanh thu |
| `revenue_code_source_value` | VARCHAR(50) | | Mã doanh thu nguồn |
| `drg_concept_id` | INTEGER | | DRG group |
| `drg_source_value` | VARCHAR(3) | | Mã DRG nguồn |

### 2.2. Cách COST hoạt động: polymorphic FK

```
  cost_event_id + cost_domain_id  →  xác định bảng nguồn

  cost_domain_id = 'Visit'     →  visit_occurrence.visit_occurrence_id
  cost_domain_id = 'Drug'      →  drug_exposure.drug_exposure_id
  cost_domain_id = 'Procedure' →  procedure_occurrence.procedure_occurrence_id
  cost_domain_id = 'Device'    →  device_exposure.device_exposure_id
```

> **Quan trọng:** Không có FK cứng — bạn cần JOIN theo `cost_event_id` = PK của bảng tương ứng VÀ `cost_domain_id` khớp domain.

### 2.3. ETL chi phí khám bệnh VN

```sql
-- Chi phí 1 lượt khám ngoại trú
INSERT INTO cost (
    cost_id,
    cost_event_id,
    cost_domain_id,
    cost_type_concept_id,
    currency_concept_id,
    total_charge,
    total_paid,
    paid_by_payer,          -- BHYT trả
    paid_by_patient,        -- BN tự trả
    payer_plan_period_id
) VALUES (
    7001,
    4001,                   -- visit_occurrence_id
    'Visit',
    32810,                  -- EHR charge (Type Concept)
    44818568,               -- Vietnamese Dong (VND)
    2500000,                -- 2.5 triệu VNĐ tổng phí
    2500000,                -- Đã thanh toán hết
    2000000,                -- BHYT trả 80%
    500000,                 -- BN trả 20%
    5001                    -- payer_plan_period_id
);
```

### 2.4. Mapping phí BHYT theo tỷ lệ

```
  Tỷ lệ BHYT VN:
  ──────────────────────────────────────────
  Đúng tuyến, KCB ban đầu  →  80% (hưu trí: 95%)
  Trái tuyến tỉnh           →  60%
  Trái tuyến TW             →  40%
  Cấp cứu                   →  100%
  ──────────────────────────────────────────

  Trong COST:
  - total_charge = tổng viện phí
  - paid_by_payer = total_charge × tỷ_lệ_BHYT
  - paid_by_patient = total_charge - paid_by_payer
  - paid_patient_copay = phần đồng chi trả theo quy định
```

---

## 3. Truy vấn phân tích kinh tế

### 3.1. Tổng chi phí theo loại dịch vụ

```sql
SELECT
    cost.cost_domain_id AS service_type,
    COUNT(*) AS event_count,
    SUM(cost.total_charge) AS total_charges,
    SUM(cost.paid_by_payer) AS insurance_paid,
    SUM(cost.paid_by_patient) AS patient_paid,
    ROUND(
        SUM(cost.paid_by_payer) * 100.0 / NULLIF(SUM(cost.total_charge), 0),
        1
    ) AS insurance_coverage_pct
FROM cost
GROUP BY cost.cost_domain_id
ORDER BY total_charges DESC;
```

### 3.2. Chi phí thuốc theo nhóm hoạt chất

```sql
SELECT
    c_ing.concept_name AS ingredient,
    COUNT(DISTINCT de.person_id) AS patient_count,
    SUM(cost.total_charge) AS total_drug_cost,
    ROUND(
        SUM(cost.total_charge) / COUNT(DISTINCT de.person_id),
        0
    ) AS cost_per_patient
FROM cost
JOIN drug_exposure de
    ON cost.cost_event_id = de.drug_exposure_id
    AND cost.cost_domain_id = 'Drug'
JOIN concept_ancestor ca
    ON de.drug_concept_id = ca.descendant_concept_id
JOIN concept c_ing
    ON ca.ancestor_concept_id = c_ing.concept_id
    AND c_ing.concept_class_id = 'Ingredient'
    AND c_ing.standard_concept = 'S'
GROUP BY c_ing.concept_name
ORDER BY total_drug_cost DESC
LIMIT 20;
```

### 3.3. So sánh chi phí đúng tuyến vs trái tuyến

```sql
SELECT
    CASE
        WHEN pp.plan_source_value = cs.care_site_source_value
        THEN 'Đúng tuyến'
        ELSE 'Trái tuyến'
    END AS referral_type,
    COUNT(DISTINCT vo.person_id) AS patient_count,
    AVG(cost.total_charge) AS avg_charge,
    AVG(cost.paid_by_payer) AS avg_insurance,
    AVG(cost.paid_by_patient) AS avg_patient_pay
FROM cost
JOIN visit_occurrence vo
    ON cost.cost_event_id = vo.visit_occurrence_id
    AND cost.cost_domain_id = 'Visit'
JOIN care_site cs ON vo.care_site_id = cs.care_site_id
JOIN payer_plan_period pp
    ON vo.person_id = pp.person_id
    AND vo.visit_start_date BETWEEN pp.payer_plan_period_start_date
                                AND pp.payer_plan_period_end_date
GROUP BY referral_type;
```

---

## 4. ER Diagram — Health Economics

```
  ┌──────────────────┐
  │PAYER_PLAN_PERIOD │
  │                  │
  │ person_id ──────→│ PERSON
  │ payer_concept_id │
  │ plan_concept_id  │
  │ start_date       │
  │ end_date         │
  └────────┬─────────┘
           │ payer_plan_period_id
           ↓
  ┌──────────────────┐
  │      COST        │
  │                  │        ┌─── VISIT_OCCURRENCE
  │ cost_event_id ──→│────────├─── DRUG_EXPOSURE
  │ cost_domain_id   │        ├─── PROCEDURE_OCCURRENCE
  │ total_charge     │        └─── DEVICE_EXPOSURE
  │ paid_by_payer    │
  │ paid_by_patient  │
  │ currency_id      │
  └──────────────────┘
```

---

## Tổng kết

1. **PAYER_PLAN_PERIOD**: ghi nhận thời gian bảo hiểm (VN: thẻ BHYT, mã ĐKKCB)
2. **COST**: chi phí từng sự kiện, dùng polymorphic FK (`cost_event_id` + `cost_domain_id`)
3. **VN mapping**: `paid_by_payer` = phần BHYT, `paid_by_patient` = phần tự chi trả
4. COST hỗ trợ phân tích hiệu quả chi phí, so sánh đúng/trái tuyến
5. `currency_concept_id` = 44818568 cho VND

**Bài tiếp theo:** CONDITION_ERA, DRUG_ERA, DOSE_ERA — Bảng tổng hợp tự động.

---

## Tài liệu tham khảo

- [OMOP CDM 5.4 — PAYER_PLAN_PERIOD](https://ohdsi.github.io/CommonDataModel/cdm54.html#PAYER_PLAN_PERIOD)
- [OMOP CDM 5.4 — COST](https://ohdsi.github.io/CommonDataModel/cdm54.html#COST)
- [Book of OHDSI — Health Economics chapter](https://ohdsi.github.io/TheBookOfOhdsi/)
