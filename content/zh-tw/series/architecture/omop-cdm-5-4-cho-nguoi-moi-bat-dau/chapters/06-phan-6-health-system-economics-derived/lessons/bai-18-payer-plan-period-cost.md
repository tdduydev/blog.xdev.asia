---
id: 019f1a00-a118-7b01-e001-omopcdm54018
title: 第 18 課：PAYER_PLAN_PERIOD 和 COST — 醫療和保險費用
slug: bai-18-payer-plan-period-cost
description: PAYER_PLAN_PERIOD 追蹤保險福利，COST 記錄每個臨床事件的費用。用於分析越南社會保險/健康保險的申請。
duration_minutes: 45
is_free: true
video_url: null
sort_order: 18
section_title: 第 6 部分：衛生系統、經濟及衍生要素
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: 初學者的 OMOP CDM 5.4 — 從頭到尾了解
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: zh-tw
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ 建築 — 第 18 課</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">PAYER_PLAN_PERIOD &</tspan>
    <tspan x="60" dy="42">COST — 醫療費用</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">初學者的 OMOP CDM 5.4 — 從頭到尾了解</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 6 部分：衛生系統、經濟及衍生要素</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![醫療費用和健康保險承保流程](/storage/uploads/2026/04/omop-cdm-bai18-cost-insurance.webp)

## 簡介

**健康經濟資料**組包括表**PAYER_PLAN_PERIOD**（保險福利）和**COST**（每項服務的成本）。在越南，此部分繪製**健康保險**（健康保險）資料和醫院費用支付表。

---

## 1. PAYER_PLAN_PERIOD — 保險期限

### 1.1。表結構

|專欄 |類型 |必填 |說明 |
|-----|--------|----------|--------|
| `payer_plan_period_id` |整數| ✅ PK |唯一ID |
| `person_id` |整數| ✅ | FK → 人 |
| `payer_plan_period_start_date` |日期 | ✅ |開始日期 |
| `payer_plan_period_end_date` |日期 | ✅ |結束日期 |
| `payer_concept_id` |整數| |付款單位（FK → 概念）|
| `payer_source_value` | VARCHAR(50) | |付款人原始碼|
| `payer_source_concept_id` |整數| | FK → 概念 |
| `plan_concept_id` |整數| |保險套餐類型 |
| `plan_source_value` | VARCHAR(50) | |計畫原始碼|
| `plan_source_concept_id` |整數| | FK → 概念 |
| `sponsor_concept_id` |整數| |贊助商 |
| `sponsor_source_value` | VARCHAR(50) | |贊助商原始碼|
| `sponsor_source_concept_id` |整數| | FK → 概念 |
| `family_source_value` | VARCHAR(50) | |家庭代碼|
| `stop_reason_concept_id` |整數| |停產原因 |
| `stop_reason_source_value` | VARCHAR(50) | |來源原因代碼 |
| `stop_reason_source_concept_id` |整數| | FK → 概念 |

### 1.2。繪製越南健康保險地圖

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

### 1.3。 ETL範例

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

### 1.4。檢查是否重疊

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

## 2. COST — 醫療服務成本

### 2.1。表結構

|專欄 |類型 |必填 |說明 |
|-----|--------|----------|--------|
| `cost_id` |整數| ✅ PK |唯一ID |
| `cost_event_id` |整數| ✅ | FK → 臨床事件 PK |
| `cost_domain_id` | VARCHAR(20) | ✅ |事件領域（訪問、毒品...）|
| `cost_type_concept_id` |整數| ✅ |類型（費用/成本/付款）|
| `currency_concept_id` |整數| |貨幣 |
| `total_charge` |浮動| |總費用|
| `total_cost` |浮動| |總成本|
| `total_paid` |浮動| |總付費|
| `paid_by_payer` |浮動| |健康保險支付 |
| `paid_by_patient` |浮動| |自費病人 |
| `paid_patient_copay` |浮動| |共同支付|
| `paid_patient_coinsurance` |浮動| |共同保險 |
| `paid_patient_deductible` |浮動| |扣除額 |
| `paid_by_primary` |浮動| |主要保險賠償|
| `paid_ingredient_cost` |浮動| |活性成分成本|
| `paid_dispensing_fee` |浮動| |藥品銷售費|
| `payer_plan_period_id` |整數| | FK → PAYER_PLAN_PERIOD | 付款計劃
| `amount_allowed` |浮動| |允許等級 |
| `revenue_code_concept_id` |整數| |收入代碼 |
| `revenue_code_source_value` | VARCHAR(50) | |來源收入代碼|
| `drg_concept_id` |整數| | DRG組|
| `drg_source_value` | VARCHAR(3) | VARCHAR(3) | |來源 DRG 程式碼 |

### 2.2。 COST 的工作原理：多態 FK

```
  cost_event_id + cost_domain_id  →  xác định bảng nguồn

  cost_domain_id = 'Visit'     →  visit_occurrence.visit_occurrence_id
  cost_domain_id = 'Drug'      →  drug_exposure.drug_exposure_id
  cost_domain_id = 'Procedure' →  procedure_occurrence.procedure_occurrence_id
  cost_domain_id = 'Device'    →  device_exposure.device_exposure_id
```

> **重要：** 沒有硬 FK — 您需要相應地加入 `cost_event_id` = 對應表的 PK AND `cost_domain_id` 域匹配。

### 2.3。越南ETL體檢費用

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

### 2.4。按比例映射健康保險費

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

## 3.查詢經濟分析

### 3.1。按服務類型劃分的總成本

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

### 3.2。按活性成分組別劃分的藥品成本

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

### 3.3。比較正確路線與錯誤路線的成本

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

## 4. ER 圖 — 健康經濟學

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

## 總結

1. **PAYER_PLAN_PERIOD**：記錄保險期間（VN：健康保險卡、註冊碼）
2. **COST**：每個事件的成本，使用多態性FK（`cost_event_id` + `cost_domain_id`）
3. **越南映射**： `paid_by_payer` = 健康保險部分， `paid_by_patient` = 自費部分
4. COST支援成本效益分析、線上線下比較
5. `currency_concept_id` = 44818568 越南盾

**下一篇文章：** CONDITION_ERA、DRUG_ERA、DOSE_ERA — 自動總結表。

---

## 參考文獻

- [OMOP CDM 5.4 — PAYER_PLAN_PERIOD](https://ohdsi.github.io/CommonDataModel/cdm54.html#PAYER_PLAN_PERIOD)
- [OMOP CDM 5.4 — COST](https://ohdsi.github.io/CommonDataModel/cdm54.html#COST)
- [Book of OHDSI — Health Economics chapter](https://ohdsi.github.io/TheBookOfOhdsi/)
