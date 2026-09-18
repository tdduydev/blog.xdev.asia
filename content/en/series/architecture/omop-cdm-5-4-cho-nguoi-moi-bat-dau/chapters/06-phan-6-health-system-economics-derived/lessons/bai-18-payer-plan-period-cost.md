---
id: 019f1a00-a118-7b01-e001-omopcdm54018
title: 'Lesson 18: PAYER_PLAN_PERIOD & COST — Medical and insurance costs'
slug: bai-18-payer-plan-period-cost
description: >-
  PAYER_PLAN_PERIOD tracks insurance benefits, COST records the cost of each
  clinical event. Application for analyzing social insurance/health insurance in
  Vietnam.
duration_minutes: 45
is_free: true
video_url: null
sort_order: 18
section_title: 'Part 6: Health System, Economics & Derived Elements'
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: OMOP CDM 5.4 for Beginners — Understand A to Z
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: en
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Architecture — Lesson 18</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">PAYER_PLAN_PERIOD &</tspan>
    <tspan x="60" dy="42">COST — Medical expenses</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OMOP CDM 5.4 for Beginners — Understand A to Z</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 6: Health System, Economics & Derived Elements</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Flow of medical expenses and health insurance coverage](/storage/uploads/2026/04/omop-cdm-bai18-cost-insurance.webp)

## Introduction

The **Health Economics Data** group includes the table **PAYER_PLAN_PERIOD** (insurance benefits) and **COST** (cost of each service). In Vietnam, this section maps with **Health Insurance** (Health Insurance) data and hospital fee payment table.

---

## 1. PAYER_PLAN_PERIOD — Insurance period

### 1.1. Table structure

| Column | Type | Required | Description |
|-----|-------|----------|-------|
| `payer_plan_period_id` | INTEGER | ✅ PK | Unique ID |
| `person_id` | INTEGER | ✅ | FK → PERSON |
| `payer_plan_period_start_date` | DATE | ✅ | Start date |
| `payer_plan_period_end_date` | DATE | ✅ | End date |
| `payer_concept_id` | INTEGER | | Payment unit (FK → CONCEPT) |
| `payer_source_value` | VARCHAR(50) | | payer source code |
| `payer_source_concept_id` | INTEGER | | FK → CONCEPT |
| `plan_concept_id` | INTEGER | | Type of insurance package |
| `plan_source_value` | VARCHAR(50) | | Plan source code |
| `plan_source_concept_id` | INTEGER | | FK → CONCEPT |
| `sponsor_concept_id` | INTEGER | | Sponsor |
| `sponsor_source_value` | VARCHAR(50) | | Sponsor source code |
| `sponsor_source_concept_id` | INTEGER | | FK → CONCEPT |
| `family_source_value` | VARCHAR(50) | | Family code |
| `stop_reason_concept_id` | INTEGER | | Reason for discontinuation |
| `stop_reason_source_value` | VARCHAR(50) | | Source reason code |
| `stop_reason_source_concept_id` | INTEGER | | FK → CONCEPT |

### 1.2. Mapping Vietnam Health Insurance

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

### 1.3. ETL example

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

### 1.4. Check for overlap

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

## 2. COST — Cost of medical services

### 2.1. Table structure

| Column | Type | Required | Description |
|-----|-------|----------|-------|
| `cost_id` | INTEGER | ✅ PK | Unique ID |
| `cost_event_id` | INTEGER | ✅ | FK → clinical event PK |
| `cost_domain_id` | VARCHAR(20) | ✅ | Event domain (Visit, Drug...) |
| `cost_type_concept_id` | INTEGER | ✅ | Type (charge/cost/payment) |
| `currency_concept_id` | INTEGER | | Currency |
| `total_charge` | FLOAT | | Total fees |
| `total_cost` | FLOAT | | Total cost |
| `total_paid` | FLOAT | | Total paid |
| `paid_by_payer` | FLOAT | | Health insurance pays |
| `paid_by_patient` | FLOAT | | Self-pay patient |
| `paid_patient_copay` | FLOAT | | Co-pay |
| `paid_patient_coinsurance` | FLOAT | | Coinsurance |
| `paid_patient_deductible` | FLOAT | | Deductions |
| `paid_by_primary` | FLOAT | | Main insurance pays |
| `paid_ingredient_cost` | FLOAT | | Active ingredient cost |
| `paid_dispensing_fee` | FLOAT | | Drug sales fees |
| `payer_plan_period_id` | INTEGER | | FK → PAYER_PLAN_PERIOD |
| `amount_allowed` | FLOAT | | Allowed level |
| `revenue_code_concept_id` | INTEGER | | Revenue code |
| `revenue_code_source_value` | VARCHAR(50) | | Source revenue code |
| `drg_concept_id` | INTEGER | | DRG group |
| `drg_source_value` | VARCHAR(3) | | Source DRG code |

### 2.2. How COST works: polymorphic FK

```
  cost_event_id + cost_domain_id  →  xác định bảng nguồn

  cost_domain_id = 'Visit'     →  visit_occurrence.visit_occurrence_id
  cost_domain_id = 'Drug'      →  drug_exposure.drug_exposure_id
  cost_domain_id = 'Procedure' →  procedure_occurrence.procedure_occurrence_id
  cost_domain_id = 'Device'    →  device_exposure.device_exposure_id
```

> **Important:** There is no hard FK — you need to JOIN accordingly `cost_event_id` = PK of the corresponding table AND `cost_domain_id` domain matching.

### 2.3. ETL medical examination costs in Vietnam

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

### 2.4. Mapping health insurance premiums proportionally

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

## 3. Query economic analysis

### 3.1. Total cost by service type

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

### 3.2. Drug costs by active ingredient group

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

### 3.3. Compare costs on the right route vs. on the wrong route

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

## Summary

1. **PAYER_PLAN_PERIOD**: records insurance period (VN: health insurance card, registration code)
2. **COST**: cost per event, using polymorphic FK (`cost_event_id` + `cost_domain_id`)
3. **VN mapping**: `paid_by_payer` = health insurance part, `paid_by_patient` = self-pay portion
4. COST supports cost-effectiveness analysis, on/off line comparison
5. `currency_concept_id` = 44818568 for VND

**Next article:** CONDITION_ERA, DRUG_ERA, DOSE_ERA — Automatic summary tables.

---

## References

- [OMOP CDM 5.4 — PAYER_PLAN_PERIOD](https://ohdsi.github.io/CommonDataModel/cdm54.html#PAYER_PLAN_PERIOD)
- [OMOP CDM 5.4 — COST](https://ohdsi.github.io/CommonDataModel/cdm54.html#COST)
- [Book of OHDSI — Health Economics chapter](https://ohdsi.github.io/TheBookOfOhdsi/)
