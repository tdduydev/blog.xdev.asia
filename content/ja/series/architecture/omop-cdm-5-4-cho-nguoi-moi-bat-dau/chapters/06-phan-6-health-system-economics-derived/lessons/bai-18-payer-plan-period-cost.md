---
id: 019f1a00-a118-7b01-e001-omopcdm54018
title: 'レッスン 18: PAYER_PLAN_PERIOD と COST — 医療費と保険費'
slug: bai-18-payer-plan-period-cost
description: >-
  PAYER_PLAN_PERIOD は保険給付を追跡し、COST
  は各臨床イベントの費用を記録します。ベトナムの社会保険/健康保険を分析するためのアプリケーション。
duration_minutes: 45
is_free: true
video_url: null
sort_order: 18
section_title: 'パート 6: 医療システム、経済および派生要素'
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: 初心者向け OMOP CDM 5.4 — A to Z を理解する
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: ja
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ アーキテクチャ — レッスン 18</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">PAYER_PLAN_PERIOD &</tspan>
    <tspan x="60" dy="42">COST — 医療費</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">初心者向け OMOP CDM 5.4 — A to Z を理解する</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 6: 医療システム、経済および派生要素</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![医療費と健康保険の適用の流れ](/storage/uploads/2026/04/omop-cdm-bai18-cost-insurance.webp)

## はじめに

**医療経済データ** グループには、テーブル **PAYER_PLAN_PERIOD** (保険給付) と **COST** (各サービスの費用) が含まれています。ベトナムでは、このセクションは **健康保険** (健康保険) データと病院料金支払表にマッピングされます。

---

## 1. PAYER_PLAN_PERIOD — 保険期間

＃＃＃１．１．テーブル構造

|コラム |タイプ |必須 |説明 |
|-----|----------|----------|----------|
| `payer_plan_period_id` |整数 | ✅PK |固有の ID |
| `person_id` |整数 | ✅ | FK → 人物 |
| `payer_plan_period_start_date` |日付 | ✅ |開始日 |
| `payer_plan_period_end_date` |日付 | ✅ |終了日 |
| `payer_concept_id` |整数 | |支払い単位 (FK → CONCEPT) |
| `payer_source_value` | VARCHAR(50) | |支払者のソースコード |
| `payer_source_concept_id` |整数 | | FK → コンセプト |
| `plan_concept_id` |整数 | |保険パッケージの種類 |
| `plan_source_value` | VARCHAR(50) | |ソース コードを計画する |
| `plan_source_concept_id` |整数 | | FK → コンセプト |
| `sponsor_concept_id` |整数 | |スポンサー |
| `sponsor_source_value` | VARCHAR(50) | |スポンサーのソースコード |
| `sponsor_source_concept_id` |整数 | | FK → コンセプト |
| `family_source_value` | VARCHAR(50) | |家族コード |
| `stop_reason_concept_id` |整数 | |中止の理由 |
| `stop_reason_source_value` | VARCHAR(50) | |ソース理由コード |
| `stop_reason_source_concept_id` |整数 | | FK → コンセプト |

＃＃＃１．２．ベトナム健康保険のマッピング

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

＃＃＃１．３． ETLの例

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

＃＃＃１．４．重複をチェックする

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

## 2. COST — 医療サービスの費用

＃＃＃２．１．テーブル構造

|コラム |タイプ |必須 |説明 |
|-----|----------|----------|----------|
| `cost_id` |整数 | ✅PK |固有の ID |
| `cost_event_id` |整数 | ✅ | FK → 臨床事象 PK |
| `cost_domain_id` | VARCHAR(20) | ✅ |イベントドメイン (訪問、薬物...) |
| `cost_type_concept_id` |整数 | ✅ |種類（料金・費用・支払い） |
| `currency_concept_id` |整数 | |通貨 |
| `total_charge` |フロート | |合計手数料 |
| `total_cost` |フロート | |総コスト |
| `total_paid` |フロート | |支払総額 |
| `paid_by_payer` |フロート | |健康保険が支払われます |
| `paid_by_patient` |フロート | |自費患者 |
| `paid_patient_copay` |フロート | |自己負担金 |
| `paid_patient_coinsurance` |フロート | |共同保険 |
| `paid_patient_deductible` |フロート | |控除 |
| `paid_by_primary` |フロート | |主な保険料 |
| `paid_ingredient_cost` |フロート | |有効成分コスト |
| `paid_dispensing_fee` |フロート | |医薬品販売手数料 |
| `payer_plan_period_id` |整数 | | FK → PAYER_PLAN_PERIOD |
| `amount_allowed` |フロート | |許可レベル |
| `revenue_code_concept_id` |整数 | |収益コード |
| `revenue_code_source_value` | VARCHAR(50) | |ソース収益コード |
| `drg_concept_id` |整数 | | DRGグループ |
| `drg_source_value` | VARCHAR(3) | |ソースDRGコード |

＃＃＃２．２． COST の仕組み: ポリモーフィック FK

```
  cost_event_id + cost_domain_id  →  xác định bảng nguồn

  cost_domain_id = 'Visit'     →  visit_occurrence.visit_occurrence_id
  cost_domain_id = 'Drug'      →  drug_exposure.drug_exposure_id
  cost_domain_id = 'Procedure' →  procedure_occurrence.procedure_occurrence_id
  cost_domain_id = 'Device'    →  device_exposure.device_exposure_id
```

> **重要:** ハード FK はありません。それに応じて JOIN する必要があります。 `cost_event_id` = 対応するテーブルの PK AND `cost_domain_id` ドメインのマッチング。

＃＃＃２．３．ベトナムのETL健康診断費用

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

＃＃＃２．４．健康保険料を比例的にマッピングする

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

## 3. クエリ経済分析

＃＃＃３．１．サービスタイプ別の総コスト

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

＃＃＃３．２．有効成分グループ別の薬剤費

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

＃＃＃３．３．正しいルートと間違ったルートのコストを比較する

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

## 4. ER 図 — 医療経済学

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

## 概要

1. **PAYER_PLAN_PERIOD**: 保険期間を記録します (VN: 健康保険証、登録コード)
2. **COST**: 多態性 FK を使用したイベントごとのコスト (`cost_event_id` + `cost_domain_id`）
3. **VN マッピング**: `paid_by_payer` = 健康保険部分、 `paid_by_patient` ＝自己負担分
4. COSTは費用対効果分析、オンライン/オフライン比較をサポートします
5. `currency_concept_id` = 44818568 (VND)

**次の記事:** CONDITION_ERA、DRUG_ERA、DOSE_ERA — 自動集計テーブル。

---

## 参考文献

- [OMOP CDM 5.4 — PAYER_PLAN_PERIOD](https://ohdsi.github.io/CommonDataModel/cdm54.html#PAYER_PLAN_PERIOD)
- [OMOP CDM 5.4 — COST](https://ohdsi.github.io/CommonDataModel/cdm54.html#COST)
- [Book of OHDSI — Health Economics chapter](https://ohdsi.github.io/TheBookOfOhdsi/)
