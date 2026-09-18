---
id: 019f1a00-a108-7b01-e001-omopcdm54008
title: 'Lesson 8: DRUG_EXPOSURE — Drugs, Prescriptions & Vaccines'
slug: bai-8-drug-exposure-thuoc-dieu-tri
description: >-
  Record medication history: prescription, dispensing, administration.
  Understand RxNorm vocab, quantity/days_supply/refills, route_concept_id, sig,
  DRUG_STRENGTH association.
duration_minutes: 65
is_free: true
video_url: null
sort_order: 8
section_title: 'Part 3: Key clinical events'
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: OMOP CDM 5.4 for Beginners — Understand A to Z
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop08" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop08)"/>
  <g>
    <circle cx="680" cy="90" r="24" fill="#818cf8" opacity="0.12"/>
    <circle cx="740" cy="110" r="30" fill="#818cf8" opacity="0.09"/>
    <circle cx="820" cy="140" r="18" fill="#818cf8" opacity="0.08"/>
    <circle cx="900" cy="160" r="22" fill="#818cf8" opacity="0.10"/>
    <line x1="620" y1="170" x2="1100" y2="240" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Architecture — Lesson 8</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">DRUG_EXPOSURE</tspan>
    <tspan x="60" dy="42">Drugs, Prescriptions & Vaccines</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OMOP CDM 5.4 for Beginners — Understand A to Z</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 3: Key clinical events</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Drug hierarchy: Ingredient → Clinical Drug → Branded Drug](/storage/uploads/2026/04/omop-cdm-bai8-drug-hierarchy.webp)

## Introduction

**DRUG_EXPOSURE** is a table that records every drug-related event — from the time the doctor prescribes, to the pharmacy dispenses, to the nurse administering the infusion. This is the most complex table in the Clinical Data group because it must handle many different data sources: outpatient prescriptions, inpatient medications, vaccines, and infusions.

---

## 1. Table structure

| Column | Type | Required | Description |
|-----|-------|----------|-------|
| `drug_exposure_id` | INTEGER | ✅ PK | Unique ID |
| `person_id` | INTEGER | ✅ FK | Patients |
| `drug_concept_id` | INTEGER | ✅ | Standard Concept (RxNorm) |
| `drug_exposure_start_date` | DATE | ✅ | Start date |
| `drug_exposure_start_datetime` | DATETIME | | Start date and time |
| `drug_exposure_end_date` | DATE | ✅ | End date |
| `drug_exposure_end_datetime` | DATETIME | | End date and time |
| `verbatim_end_date` | DATE | | Original end date (before inference) |
| `drug_type_concept_id` | INTEGER | ✅ | Data source |
| `stop_reason` | VARCHAR(20) | | Reasons for discontinuing medication |
| `refills` | INTEGER | | Number of refills |
| `quantity` | FLOAT | | Quantity allocated |
| `days_supply` | INTEGER | | Days of supply |
| `sig` | CLOB | | Original User Manual |
| `route_concept_id` | INTEGER | | Route of administration (oral, injection...) |
| `lot_number` | VARCHAR(50) | | Lot number (important for vaccines) |
| `provider_id` | INTEGER | FK | Doctor prescribes |
| `visit_occurrence_id` | INTEGER | FK | Related Visit |
| `visit_detail_id` | INTEGER | FK | Visit details |
| `drug_source_value` | VARCHAR(50) | | Generic drug code |
| `drug_source_concept_id` | INTEGER | | Original concept |
| `route_source_value` | VARCHAR(50) | | Original route of administration |
| `dose_unit_source_value` | VARCHAR(50) | | Original dose unit |

---

## 2. RxNorm — Vocabulary standard for medicine

### 2.1. RxNorm hierarchy

```
  ┌──────────────────────────────────────────┐
  │            Ingredient (IN)                │
  │        VD: Metformin (concept 1503297)    │
  │                                           │
  │   ┌── Clinical Drug Form (CDF) ──┐       │
  │   │  Metformin Oral Tablet        │       │
  │   │                               │       │
  │   │  ┌── Clinical Drug (CD) ──┐   │       │
  │   │  │ Metformin 500mg Tab    │   │       │
  │   │  │ (concept 1503328)      │   │       │
  │   │  └────────────────────────┘   │       │
  │   └───────────────────────────────┘       │
  │                                           │
  │   ┌── Branded Drug (BD) ────────┐         │
  │   │  Glucophage 500mg Tab       │         │
  │   └─────────────────────────────┘         │
  └───────────────────────────────────────────┘
```

### 2.2. Choose the correct RxNorm level

| Level | When to use | Example |
|-------|-------------|-------|
| **Ingredient** | Only know the active ingredients | "Metformin" |
| **Clinical Drug** | Know the active ingredient + dose + form | "Metformin 500mg Tablet" |
| **Branded Drug** | Know the trade name | "Glucophage 500mg Tab" |
| **Clinical Drug Component** | Active ingredient + dose (combo) | "Metformin 500mg" |

> **Recommended:** Map at **Clinical Drug** or **Branded Drug** level if there is enough information. If the source data only has the active ingredient name, use **Ingredient**.

---

## 3. drug_type_concept_id — Data source

| Concept ID | Name | Use cases |
|-----------|-----|----------|
| 32838 | EHR prescription | Prescription from HIS |
| 32839 | EHR dispensing | Dispensing pharmacy |
| 32818 | EHR administration | Nurse records injection/infusion |
| 32869 | Patient self-reported | The patient self-declares the medications he is taking
| 32810 | Claim | Social insurance data |

---

## 4. Calculate days_supply and drug_exposure_end_date

### 4.1. CDM Rules

```
drug_exposure_end_date =
    drug_exposure_start_date + days_supply - 1
```

### 4.2. Calculation example

```sql
-- Kê đơn: Metformin 500mg x 2 viên/ngày x 30 ngày
INSERT INTO drug_exposure (
    drug_exposure_id, person_id, drug_concept_id,
    drug_exposure_start_date, drug_exposure_end_date,
    drug_type_concept_id,
    quantity, days_supply, refills,
    sig, route_concept_id,
    drug_source_value
) VALUES (
    80001, 100001, 1503328,         -- RxNorm: Metformin 500mg Tab
    '2024-06-01', '2024-06-30',     -- 30 days
    32838,                            -- EHR prescription
    60, 30, 2,                        -- 60 viên, 30 ngày, 2 refills
    'Uống 2 viên/ngày, sáng chiều sau ăn',
    4132161,                          -- Oral
    'METFORMIN500'
);
```

### 4.3. Infusion/Injection

```sql
-- Truyền NaCl 0.9% 500ml trong 2 giờ
INSERT INTO drug_exposure (
    drug_exposure_id, person_id, drug_concept_id,
    drug_exposure_start_date, drug_exposure_start_datetime,
    drug_exposure_end_date, drug_exposure_end_datetime,
    drug_type_concept_id,
    quantity, days_supply,
    route_concept_id,
    drug_source_value
) VALUES (
    80002, 100001, 19049105,         -- RxNorm: NaCl 0.9% Injectable
    '2024-06-10', '2024-06-10 08:00:00',
    '2024-06-10', '2024-06-10 10:00:00',
    32818,                            -- EHR administration
    500, 1,                           -- 500ml, 1 ngày
    4171047,                          -- Intravenous
    'NACL09_500'
);
```

---

## 5. route_concept_id — Route of administration

| Concept ID | Route | Vietnamese |
|-----------|-------|-----------|
| 4132161 | Oral | Drink |
| 4171047 | Intravenous | Intravenous injection |
| 4302612 | Intramuscular | Intramuscular injection |
| 4142048 | Subcutaneous | Subcutaneous injection |
| 4186838 | Topical | Topical application |
| 4290759 | Inhaled | Inhalation/aerosol |
| 4163768 | Rectal | Rectum |
| 4186747 | Ophthalmic | Eye drops |

---

## 6. Vaccine in DRUG_EXPOSURE

Vaccine is also stored in DRUG_EXPOSURE, which does not have its own table.

```sql
-- Tiêm vaccine COVID-19 (Pfizer) — liều 1
INSERT INTO drug_exposure (
    drug_exposure_id, person_id, drug_concept_id,
    drug_exposure_start_date, drug_exposure_end_date,
    drug_type_concept_id,
    quantity, days_supply,
    route_concept_id, lot_number,
    drug_source_value
) VALUES (
    80003, 100001, 37003436,         -- CVX: COVID-19 vaccine Pfizer
    '2024-03-15', '2024-03-15',      -- Tiêm 1 lần
    32818,                            -- Administration
    1, 1,
    4302612,                          -- Intramuscular
    'FK1234',                         -- Số lô vaccine
    'COVID19_PFIZER_DOSE1'
);
```

**Note lot_number:** Especially important for vaccines — used to trace the lot if there is an adverse event.

---

## 7. ETL Vietnamese medicine

### 7.1. Common problem

| Problem | Solution |
|--------|-----------|
| HIS uses its own code | Map via SOURCE_TO_CONCEPT_MAP |
| Vietnamese drug names | Usagi mapping tool |
| Combo medicine (Metformin + Glipizide) | Map about RxNorm combo concept |
| Dosage/formulation unknown | Map of Ingredient level |
| Oriental medicine / traditional medicine | concept_id = 0, holds source_value |

### 7.2. ETL example

```sql
SELECT
    ROW_NUMBER() OVER() AS drug_exposure_id,
    pm.person_id,
    COALESCE(cr.concept_id_2, 0) AS drug_concept_id,
    dt.ngay_ke AS drug_exposure_start_date,
    dt.ngay_ke + dt.so_ngay - 1 AS drug_exposure_end_date,
    32838 AS drug_type_concept_id,
    dt.so_luong AS quantity,
    dt.so_ngay AS days_supply,
    dt.so_lan_tai_ke AS refills,
    dt.huong_dan_su_dung AS sig,
    COALESCE(r.concept_id, 0) AS route_concept_id,
    dt.ma_thuoc AS drug_source_value,
    COALESCE(c_source.concept_id, 0) AS drug_source_concept_id,
    dt.duong_dung_goc AS route_source_value,
    dt.don_vi_lieu AS dose_unit_source_value
FROM donthuoc_his dt
JOIN person_mapping pm ON dt.ma_bn = pm.source_id
LEFT JOIN source_to_concept_map stcm
    ON dt.ma_thuoc = stcm.source_code
    AND stcm.source_vocabulary_id = 'VN_DRUG'
LEFT JOIN concept c_std
    ON stcm.target_concept_id = c_std.concept_id
    AND c_std.standard_concept = 'S'
LEFT JOIN concept c_source
    ON dt.ma_thuoc = c_source.concept_code
LEFT JOIN concept_relationship cr
    ON c_source.concept_id = cr.concept_id_1
    AND cr.relationship_id = 'Maps to'
LEFT JOIN concept r
    ON dt.duong_dung_goc = r.concept_name
    AND r.domain_id = 'Route';
```

---

## 8. Bind to DRUG_STRENGTH

The table **DRUG_STRENGTH** (in Vocabularies) contains detailed dosage information:

```sql
-- Tra liều Metformin 500mg Tablet
SELECT
    ds.drug_concept_id,
    c_drug.concept_name AS drug_name,
    ds.ingredient_concept_id,
    c_ing.concept_name AS ingredient_name,
    ds.amount_value,
    c_unit.concept_name AS amount_unit
FROM drug_strength ds
JOIN concept c_drug ON ds.drug_concept_id = c_drug.concept_id
JOIN concept c_ing ON ds.ingredient_concept_id = c_ing.concept_id
LEFT JOIN concept c_unit ON ds.amount_unit_concept_id = c_unit.concept_id
WHERE ds.drug_concept_id = 1503328;
-- Kết quả: Metformin 500 mg
```

---

## 9. SQL analysis

```sql
-- Top 10 thuốc được kê nhiều nhất
SELECT
    c.concept_name AS drug_name,
    COUNT(DISTINCT de.person_id) AS patient_count,
    COUNT(*) AS prescription_count
FROM drug_exposure de
JOIN concept c ON de.drug_concept_id = c.concept_id
WHERE de.drug_concept_id != 0
GROUP BY c.concept_name
ORDER BY patient_count DESC
LIMIT 10;

-- Polypharmacy: BN dùng >= 5 thuốc cùng lúc
SELECT
    de.person_id,
    COUNT(DISTINCT de.drug_concept_id) AS concurrent_drugs
FROM drug_exposure de
WHERE de.drug_exposure_start_date <= '2024-06-01'
  AND de.drug_exposure_end_date >= '2024-06-01'
GROUP BY de.person_id
HAVING COUNT(DISTINCT de.drug_concept_id) >= 5
ORDER BY concurrent_drugs DESC;
```

---

## Summary

1. **DRUG_EXPOSURE** = prescription + dispensing + infusion + vaccine
2. **drug_concept_id** uses **RxNorm** (Ingredient → Clinical Drug → Branded Drug)
3. **days_supply** + **quantity** + **refills** creates the full picture
4. **route_concept_id** for route of administration, **lot_number** for vaccine
5. **drug_type_concept_id** distinguishes prescription vs dispensing vs administration
6. ETL VN: mapping via SOURCE_TO_CONCEPT_MAP or Usagi

**Next article:** PROCEDURE_OCCURRENCE — procedures, surgeries, and interventions.

---

## References

- [OMOP CDM 5.4 — DRUG_EXPOSURE](https://ohdsi.github.io/CommonDataModel/cdm54.html#DRUG_EXPOSURE)
- [RxNorm on Athena](https://athena.ohdsi.org/)
- [DRUG_STRENGTH](https://ohdsi.github.io/CommonDataModel/cdm54.html#DRUG_STRENGTH)
