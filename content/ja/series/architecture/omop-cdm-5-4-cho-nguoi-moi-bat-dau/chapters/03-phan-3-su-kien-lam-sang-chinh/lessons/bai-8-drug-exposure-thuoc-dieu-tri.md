---
id: 019f1a00-a108-7b01-e001-omopcdm54008
title: 'レッスン 8: DRUG_EXPOSURE — 医薬品、処方箋、ワクチン'
slug: bai-8-drug-exposure-thuoc-dieu-tri
description: >-
  薬歴を記録します：処方、調剤、投与。 RxNorm の語彙、数量/日数_供給/補充、ルートコンセプト ID、シグ、DRUG_STRENGTH
  の関連付けを理解します。
duration_minutes: 65
is_free: true
video_url: null
sort_order: 8
section_title: 'パート 3: 主要な臨床事象'
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: 初心者向け OMOP CDM 5.4 — A to Z を理解する
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: ja
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ アーキテクチャ — レッスン 8</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">DRUG_EXPOSURE</tspan>
    <tspan x="60" dy="42">薬、処方箋、ワクチン</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">初心者向け OMOP CDM 5.4 — A to Z を理解する</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 3: 主要な臨床事象</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![医薬品の階層: 成分 → 臨床医薬品 → ブランド医薬品](/storage/uploads/2026/04/omop-cdm-bai8-drug-hierarchy.webp)

## はじめに

**DRUG_EXPOSURE** は、医師の処方時から薬局での調剤、看護師による点滴の投与まで、あらゆる薬物関連イベントを記録するテーブルです。これは、外来処方箋、入院患者の投薬、ワクチン、輸液などのさまざまなデータ ソースを処理する必要があるため、臨床データ グループの中で最も複雑なテーブルです。

---

## 1. テーブル構造

|コラム |タイプ |必須 |説明 |
|-----|----------|----------|----------|
| `drug_exposure_id` |整数 | ✅PK |固有の ID |
| `person_id` |整数 | ✅FK |患者 |
| `drug_concept_id` |整数 | ✅ |スタンダードコンセプト（RxNorm） |
| `drug_exposure_start_date` |日付 | ✅ |開始日 |
| `drug_exposure_start_datetime` |日時 | |開始日時 |
| `drug_exposure_end_date` |日付 | ✅ |終了日 |
| `drug_exposure_end_datetime` |日時 | |終了日時 |
| `verbatim_end_date` |日付 | |元の終了日 (推論前) |
| `drug_type_concept_id` |整数 | ✅ |データソース |
| `stop_reason` | VARCHAR(20) | |薬を中止する理由 |
| `refills` |整数 | |リフィルの数 |
| `quantity` |フロート | |割り当てられた数量 |
| `days_supply` |整数 | |供給日数 |
| `sig` |クロブ | |オリジナルのユーザーマニュアル |
| `route_concept_id` |整数 | |投与経路（経口、注射など） |
| `lot_number` | VARCHAR(50) | |ロット番号 (ワクチンにとって重要) |
| `provider_id` |整数 | FK |医師が処方する |
| `visit_occurrence_id` |整数 | FK |関連する訪問 |
| `visit_detail_id` |整数 | FK |訪問詳細 |
| `drug_source_value` | VARCHAR(50) | |ジェネリック医薬品コード |
| `drug_source_concept_id` |整数 | |オリジナルコンセプト |
| `route_source_value` | VARCHAR(50) | |本来の投与経路 |
| `dose_unit_source_value` | VARCHAR(50) | |元の用量単位 |

---

## 2. RxNorm — 医学の語彙標準

＃＃＃２．１． RxNorm 階層

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

＃＃＃２．２．正しい RxNorm レベルを選択してください

|レベル |いつ使用するか |例 |
|----------|---------------|----------|
| **成分** |有効成分だけを知る | 「メトホルミン」 |
| **臨床薬** |有効成分+用量+剤形を知る | 「メトホルミン錠500mg」｜
| **ブランド医薬品** |商号を知る | 「グルコファージ 500mg 錠」 |
| **臨床医薬品成分** |有効成分 + 投与量 (組み合わせ) | 「メトホルミン 500mg」 |

> **推奨:** 十分な情報がある場合は、**臨床薬** または **ブランド薬** レベルでマップします。ソース データに有効成分名のみがある場合は、**成分** を使用します。

---

## 3. Drug_type_concept_id — データ ソース

|コンセプトID |名前 |使用例 |
|----------|-----|----------|
| 32838 | EHR処方 | HIS からの処方箋 |
| 32839 | EHR 調剤 |調剤薬局 |
| 32818 | EHR管理 |看護師は注射/点滴を記録します |
| 32869 |患者の自己申告 |患者は服用している薬を自己申告する
| 32810 |クレーム |社会保険データ |

---

## 4. days_supply と Drug_exposure_end_date を計算します。

＃＃＃４．１． CDM ルール

```
drug_exposure_end_date =
    drug_exposure_start_date + days_supply - 1
```

＃＃＃４．２．計算例

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

＃＃＃４．３．輸液・注射

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

## 5.route_concept_id — 管理ルート

|コンセプトID |ルート |ベトナム語 |
|----------|----------|----------|
| 4132161 |経口 |ドリンク |
| 4171047 |静脈内 |静脈注射 |
| 4302612 |筋肉内 |筋肉注射 |
| 4142048 |皮下 |皮下注射 |
| 4186838 |トピック |局所応用 |
| 4290759 |吸入 |吸入/エアロゾル |
| 4163768 |直腸 |直腸 |
| 4186747 |眼科 |点眼薬 |

---

## 6. DRUG_EXPOSURE のワクチン

ワクチンは DRUG_EXPOSURE にも保管されますが、これには独自のテーブルがありません。

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

**ロット番号に注意してください:** ワクチンにとって特に重要です。有害事象が発生した場合にロットを追跡するために使用されます。

---

## 7.ETLベトナム医学

＃＃＃７．１．よくある問題

|問題 |ソリューション |
|----------|----------|
| HIS は独自のコードを使用します。 SOURCE_TO_CONCEPT_MAP 経由で地図を作成 |
|ベトナムの薬物名 |うさぎマッピングツール |
|併用薬 (メトホルミン + グリピジド) | RxNorm コンボ コンセプトに関するマップ |
|投与量/処方は不明 |成分レベルのマップ |
|東洋医学・伝統医学 | Concept_id = 0、source_value | を保持します。

＃＃＃７．２． ETLの例

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

## 8. DRUG_STRENGTH にバインドする

表 **DRUG_STRENGTH** (語彙内) には、詳細な投与量情報が含まれています。

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

## 9. SQL 分析

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

## 概要

1. **DRUG_EXPOSURE** = 処方箋 + 調剤 + 点滴 + ワクチン
2. **drug_concept_id** は **RxNorm** を使用します (成分 → 臨床医薬品 → ブランド医薬品)
3. **供給日数** + **数量** + **補充**により全体像が作成されます
4. **route_concept_id** (投与経路)、**lot_number** (ワクチン)
5. **drug_type_concept_id** は、処方箋、調剤、投与を区別します。
6. ETL VN: SOURCE_TO_CONCEPT_MAP または Usagi を介したマッピング

**次の記事:** PROCEDURE_OCCURRENCE — 処置、手術、介入。

---

## 参考文献

- [OMOP CDM 5.4 — DRUG_EXPOSURE](https://ohdsi.github.io/CommonDataModel/cdm54.html#DRUG_EXPOSURE)
- [RxNorm on Athena](https://athena.ohdsi.org/)
- [DRUG_STRENGTH](https://ohdsi.github.io/CommonDataModel/cdm54.html#DRUG_STRENGTH)
