---
id: 019f1a00-a119-7b01-e001-omopcdm54019
title: 'レッスン 19: CONDITION_ERA、DRUG_ERA、DOSE_ERA — 自動集計テーブル'
slug: bai-19-condition-era-drug-era-dose-era
description: >-
  3 つの派生要素テーブル: CONDITION_ERA は連続した診断を集計し、DRUG_ERA は投薬コースを集計し、DOSE_ERA
  は投与量を追跡します。 ERA生成アルゴリズムと分析アプリケーション。
duration_minutes: 50
is_free: true
video_url: null
sort_order: 19
section_title: 'パート 6: 医療システム、経済および派生要素'
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: 初心者向け OMOP CDM 5.4 — A to Z を理解する
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop19" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop19)"/>
  <g>
    <circle cx="730" cy="85" r="20" fill="#818cf8" opacity="0.12"/>
    <circle cx="830" cy="115" r="24" fill="#818cf8" opacity="0.08"/>
    <circle cx="910" cy="80" r="16" fill="#818cf8" opacity="0.07"/>
    <line x1="660" y1="130" x2="1100" y2="250" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="130" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ アーキテクチャ — レッスン 19</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">CONDITION_ERA、DRUG_ERA</tspan>
    <tspan x="60" dy="42">& DOSE_ERA — 要約テーブル</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">初心者向け OMOP CDM 5.4 — A to Z を理解する</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 6: 医療システム、経済および派生要素</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![レコードをERAにマージ — 複数の個別のイベントから連続バッチに](/storage/uploads/2026/04/omop-cdm-bai19-era-concept.webp)

## はじめに

3 つの **派生要素** テーブルはソース データから直接インポートされるのではなく、臨床テーブルから **自動的に計算**されます。複数の連続した記録を 1 つの「時代」(バッチ) に結合します。これは、疫学分析や臨床研究に非常に役立ちます。

---

## 1. ERAの概念

＃＃＃１．１．エラとは何ですか？

```
  Dữ liệu nguồn (nhiều records):
  ───────────────────────────────────────────────
  Record 1: Tiểu đường  01/01 ─── 15/01
  Record 2: Tiểu đường  20/01 ─── 28/01     (gap = 5 ngày < 30)
  Record 3: Tiểu đường  10/03 ─── 20/03     (gap = 41 ngày > 30)
  ───────────────────────────────────────────────

  Sau khi tính ERA (persistence window = 30 ngày):
  ───────────────────────────────────────────────
  ERA 1: Tiểu đường  01/01 ─── 28/01   (gộp record 1+2)
  ERA 2: Tiểu đường  10/03 ─── 20/03   (record 3 riêng)
  ───────────────────────────────────────────────
```

- **永続ウィンドウ**: マージする 2 つのレコード間の最大距離
  - CONDITION_ERA: 30 日
  - DRUG_ERA: 30 日
  - DOSE_ERA: 0 日 (連続のみ)

＃＃＃１．２．なぜERAが必要なのでしょうか？

|問題 |解決 |
|----------|----------|
| 1 人の患者が 20 回の糖尿病検査を受ける → 20 件の記録 | 1-2 コンディション_時代 |
|患者はメトホルミンを 12 か月間服用 → 12 回の処方箋 | 1 DRUG_ERA |
| 「罹患期間」を計算する必要がある | ERA終了 - ERA開始 |
| 「治療時間」を計算する必要がある |ドラッグエラ_エンド - ドラッグエラ_スタート |

---

## 2. CONDITION_ERA

＃＃＃２．１．テーブル構造

|コラム |タイプ |必須 |説明 |
|-----|----------|----------|----------|
| `condition_era_id` |整数 | ✅PK |固有の ID |
| `person_id` |整数 | ✅ | FK → 人物 |
| `condition_concept_id` |整数 | ✅ |標準コンセプト（医薬品の成分レベル） |
| `condition_era_start_date` |日付 | ✅ |バッチ開始日 |
| `condition_era_end_date` |日付 | ✅ |バッチ終了日 |
| `condition_occurrence_count` |整数 | |結合されたレコードの数 |

＃＃＃２．２．重要な特徴

- `condition_concept_id` 常に **標準コンセプト** (SNOMED)
- 持続期間 = **30 日** (デフォルト、カスタマイズ可能)
- さまざまな訪問からのcondition_occurrence を含める

＃＃＃２．３． CONDITION_ERA 生成アルゴリズム

```sql
-- Simplified logic (actual implementation dùng CTE phức tạp hơn)
-- Bước 1: Map tất cả condition → Standard + thêm end_date
-- Bước 2: Xác định gap giữa records liên tiếp
-- Bước 3: Nếu gap <= 30 ngày → gộp vào cùng ERA

WITH condition_dates AS (
    SELECT
        person_id,
        condition_concept_id,
        condition_start_date,
        COALESCE(
            condition_end_date,
            condition_start_date + INTERVAL '1 day'  -- Default 1 ngày
        ) AS condition_end_date
    FROM condition_occurrence
    WHERE condition_concept_id != 0
),
-- Xác định ERA groups bằng cách tìm gaps > 30 ngày
era_groups AS (
    SELECT *,
        SUM(new_era_flag) OVER (
            PARTITION BY person_id, condition_concept_id
            ORDER BY condition_start_date
        ) AS era_group
    FROM (
        SELECT *,
            CASE
                WHEN condition_start_date - LAG(condition_end_date)
                    OVER (PARTITION BY person_id, condition_concept_id
                          ORDER BY condition_start_date)
                    > 30
                THEN 1
                ELSE 0
            END AS new_era_flag
        FROM condition_dates
    ) t
)
SELECT
    ROW_NUMBER() OVER () AS condition_era_id,
    person_id,
    condition_concept_id,
    MIN(condition_start_date) AS condition_era_start_date,
    MAX(condition_end_date) AS condition_era_end_date,
    COUNT(*) AS condition_occurrence_count
FROM era_groups
GROUP BY person_id, condition_concept_id, era_group;
```

＃＃＃２．４．アプリケーションクエリ

```sql
-- Top 10 bệnh mạn tính (ERA > 365 ngày)
SELECT
    c.concept_name AS condition_name,
    COUNT(DISTINCT ce.person_id) AS patient_count,
    ROUND(AVG(
        ce.condition_era_end_date - ce.condition_era_start_date
    ), 0) AS avg_duration_days,
    AVG(ce.condition_occurrence_count) AS avg_visits
FROM condition_era ce
JOIN concept c ON ce.condition_concept_id = c.concept_id
WHERE ce.condition_era_end_date - ce.condition_era_start_date > 365
GROUP BY c.concept_name
ORDER BY patient_count DESC
LIMIT 10;
```

---

## 3. DRUG_ERA

＃＃＃３．１．テーブル構造

|コラム |タイプ |必須 |説明 |
|-----|----------|----------|----------|
| `drug_era_id` |整数 | ✅PK |固有の ID |
| `person_id` |整数 | ✅ | FK → 人物 |
| `drug_concept_id` |整数 | ✅ |標準コンセプト (**成分**) |
| `drug_era_start_date` |日付 | ✅ |バッチ開始日 |
| `drug_era_end_date` |日付 | ✅ |バッチ終了日 |
| `drug_exposure_count` |整数 | |配合処方数 |
| `gap_days` |整数 | |処方間の合計日数 |

＃＃＃３．２．重要な特徴

- `drug_concept_id` 常に **成分** レベル (臨床医薬品ではない)
- すべてのメトホルミン剤形 → 1 つのメトホルミン ERA に結合
- `gap_days`: 処方の間に患者が薬を服用しなかった合計日数

＃＃＃３．３．視覚的な例

```
  drug_exposure records (BN 100001, Metformin):
  ──────────────────────────────────────────────
  Đơn 1: Metformin 500mg Tab  01/01 → 30/01 (30 ngày)
  Đơn 2: Metformin 850mg Tab  05/02 → 06/03 (30 ngày)  gap=6
  Đơn 3: Metformin 500mg Tab  10/03 → 08/04 (30 ngày)  gap=4
  [GAP 45 ngày — > 30 → NEW ERA]
  Đơn 4: Metformin 1000mg Tab 23/05 → 21/06 (30 ngày)
  ──────────────────────────────────────────────

  drug_era kết quả:
  ──────────────────────────────────────────────
  ERA 1: Metformin (Ingredient)
         01/01 → 08/04 (98 ngày)
         drug_exposure_count = 3
         gap_days = 10  (6 + 4)

  ERA 2: Metformin (Ingredient)
         23/05 → 21/06 (30 ngày)
         drug_exposure_count = 1
         gap_days = 0
  ──────────────────────────────────────────────
```

＃＃＃３．４．質問: 治療コンプライアンス

```sql
-- Tính adherence = (ERA days - gap_days) / ERA days
SELECT
    c.concept_name AS drug,
    de.person_id,
    de.drug_era_start_date,
    de.drug_era_end_date,
    de.drug_era_end_date - de.drug_era_start_date AS era_days,
    de.gap_days,
    de.drug_exposure_count,
    ROUND(
        (de.drug_era_end_date - de.drug_era_start_date - de.gap_days)
        * 100.0
        / NULLIF(de.drug_era_end_date - de.drug_era_start_date, 0),
        1
    ) AS adherence_pct
FROM drug_era de
JOIN concept c ON de.drug_concept_id = c.concept_id
WHERE de.person_id = 100001
ORDER BY de.drug_era_start_date;
```

＃＃＃３．５。最も長く使用されている上位の薬

```sql
SELECT
    c.concept_name AS ingredient,
    COUNT(DISTINCT de.person_id) AS patient_count,
    ROUND(AVG(
        de.drug_era_end_date - de.drug_era_start_date
    ), 0) AS avg_era_days,
    ROUND(AVG(de.drug_exposure_count), 1) AS avg_prescriptions,
    ROUND(AVG(de.gap_days), 0) AS avg_gap_days
FROM drug_era de
JOIN concept c ON de.drug_concept_id = c.concept_id
GROUP BY c.concept_name
HAVING COUNT(DISTINCT de.person_id) >= 100
ORDER BY avg_era_days DESC
LIMIT 15;
```

---

## 4. 線量_ERA

＃＃＃４．１．テーブル構造

|コラム |タイプ |必須 |説明 |
|-----|----------|----------|----------|
| `dose_era_id` |整数 | ✅PK |固有の ID |
| `person_id` |整数 | ✅ | FK → 人物 |
| `drug_concept_id` |整数 | ✅ |標準コンセプト（成分） |
| `unit_concept_id` |整数 | ✅ |用量単位 (mg、g) |
| `dose_value` |フロート | ✅ |投与量 |
| `dose_era_start_date` |日付 | ✅ |開始日 |
| `dose_era_end_date` |日付 | ✅ |終了日 |

＃＃＃４．２． DOSE_ERA vs DRUG_ERA

```
  DRUG_ERA:  Gộp theo Ingredient, bỏ qua liều
  ──────────────────────────────────────────────
  Metformin ERA: 01/01 → 08/04

  DOSE_ERA:  Gộp theo Ingredient + Liều cụ thể
  ──────────────────────────────────────────────
  Metformin 500mg: 01/01 → 30/01
  Metformin 850mg: 05/02 → 06/03   ← tăng liều
  Metformin 500mg: 10/03 → 08/04   ← giảm liều
```

- DOSE_ERA **持続ウィンドウ = 0**: 同じ線量が連続する場合にのみ結合されます。
- DRUG_STRENGTH を使用して、drug_concept_id から dos_value を計算します。

＃＃＃４．３．クエリ: 線量の変化を追跡する

```sql
-- Lịch sử thay đổi liều Metformin
SELECT
    de.person_id,
    c.concept_name AS ingredient,
    de.dose_value,
    cu.concept_name AS unit,
    de.dose_era_start_date,
    de.dose_era_end_date,
    de.dose_era_end_date - de.dose_era_start_date AS days_on_dose
FROM dose_era de
JOIN concept c ON de.drug_concept_id = c.concept_id
JOIN concept cu ON de.unit_concept_id = cu.concept_id
WHERE de.person_id = 100001
  AND de.drug_concept_id = 1503297  -- Metformin
ORDER BY de.dose_era_start_date;
```

＃＃＃４．４．用量漸増分析

```sql
-- Tìm BN có dose escalation (tăng liều theo thời gian)
WITH dose_changes AS (
    SELECT
        de.person_id,
        de.drug_concept_id,
        de.dose_value,
        de.dose_era_start_date,
        LAG(de.dose_value) OVER (
            PARTITION BY de.person_id, de.drug_concept_id
            ORDER BY de.dose_era_start_date
        ) AS prev_dose
    FROM dose_era de
)
SELECT
    c.concept_name AS drug,
    dc.person_id,
    dc.prev_dose AS from_dose,
    dc.dose_value AS to_dose,
    dc.dose_era_start_date AS escalation_date
FROM dose_changes dc
JOIN concept c ON dc.drug_concept_id = c.concept_id
WHERE dc.dose_value > dc.prev_dose  -- Liều tăng
ORDER BY dc.person_id, c.concept_name, dc.dose_era_start_date;
```

---

## 5. 3 つの ERA テーブルを比較する

|特長 |コンディション_時代 | DRUG_ERA |線量_ERA |
|----------|--------------|----------|----------|
| **出典** |条件発生 |薬物暴露 |薬物暴露 + 薬物強度 |
| **コンセプトレベル** |標準 (SNOMED) |成分 |成分 |
| **永続ウィンドウ** | 30日 | 30日 | 0日 |
| **追加者** |人物 + 条件 |人物 + 食材 |人名 + 成分 + 投与量 |
| **レコード数** |条件発生数 |薬物暴露数 | (なし) |
| **ギャップ情報** | (なし) |ギャップデイ | (なし) |
| **線量情報** | (なし) | (なし) |線量値、単位 |

---

## 6. パイプラインは ERA テーブルを作成します

```
  Bước 1: ETL source → CDM tables
  ┌────────────────────┐    ┌─────────────────────┐
  │ HIS / EMR          │───→│ condition_occurrence │
  │ (dữ liệu nguồn)   │───→│ drug_exposure        │
  └────────────────────┘    └──────────┬────────────┘
                                       │
  Bước 2: Tạo ERA tables              │
                                       ↓
  ┌────────────────────────────────────────────────┐
  │ ERA Builder Script                              │
  │                                                 │
  │ 1. condition_occurrence → CONDITION_ERA          │
  │    (SNOMED rollup + 30-day window)              │
  │                                                 │
  │ 2. drug_exposure + drug_strength → DRUG_ERA     │
  │    (Ingredient rollup + 30-day window)          │
  │                                                 │
  │ 3. drug_exposure + drug_strength → DOSE_ERA     │
  │    (Ingredient + dose + 0-day window)           │
  └────────────────────────────────────────────────┘

  Bước 3: Validate
  ┌────────────────────────────────────┐
  │ - Mỗi ERA có start <= end          │
  │ - occurrence_count >= 1             │
  │ - gap_days >= 0                     │
  │ - Không khoảng trống logic          │
  └────────────────────────────────────┘
```

---

## 概要

1. **ERA** = 複数の連続レコードを 1 つのバッチに結合します
2. **CONDITION_ERA**: 30 日のウィンドウ、SNOMED 標準コンセプト
3. **DRUG_ERA**: 30 日間の期間、成分レベル、はい `gap_days` 遵守状況を計算する
4. **DOSE_ERA**: 0 日ウィンドウ、経時的な用量変化を監視します
5. ERAテーブルはETL後に**自動的に作成**され、直接インポートされません。

**次の記事:** CDM_SOURCE、METADATA、COHORT、シリーズの概要。

---

## 参考文献

- [OMOP CDM 5.4 — CONDITION_ERA](https://ohdsi.github.io/CommonDataModel/cdm54.html#CONDITION_ERA)
- [OMOP CDM 5.4 — DRUG_ERA](https://ohdsi.github.io/CommonDataModel/cdm54.html#DRUG_ERA)
- [OMOP CDM 5.4 — DOSE_ERA](https://ohdsi.github.io/CommonDataModel/cdm54.html#DOSE_ERA)
- [Book of OHDSI — ch. 6: Standardized Derived Elements](https://ohdsi.github.io/TheBookOfOhdsi/)
