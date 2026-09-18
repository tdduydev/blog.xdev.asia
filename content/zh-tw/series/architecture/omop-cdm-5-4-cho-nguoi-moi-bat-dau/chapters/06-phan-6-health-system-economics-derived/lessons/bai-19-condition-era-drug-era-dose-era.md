---
id: 019f1a00-a119-7b01-e001-omopcdm54019
title: 第 19 課：CONDITION_ERA、DRUG_ERA 和 DOSE_ERA — 自動總結表
slug: bai-19-condition-era-drug-era-dose-era
description: 三個派生元素表：CONDITION_ERA 聚合連續診斷，DRUG_ERA 聚合藥物療程，DOSE_ERA 追蹤劑量。 ERA生成演算法和分析應用。
duration_minutes: 50
is_free: true
video_url: null
sort_order: 19
section_title: 第 6 部分：衛生系統、經濟及衍生要素
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: 初學者的 OMOP CDM 5.4 — 從頭到尾了解
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: zh-tw
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ 建築 — 第 19 課</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">CONDITION_ERA、DRUG_ERA</tspan>
    <tspan x="60" dy="42">& DOSE_ERA — 總表</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">初學者的 OMOP CDM 5.4 — 從頭到尾了解</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 6 部分：衛生系統、經濟及衍生要素</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![將記錄合併到 ERA — 從多個離散事件合併到連續批次](/storage/uploads/2026/04/omop-cdm-bai19-era-concept.webp)

## 簡介

三個**派生元素**表不是直接從來源資料匯入的，而是從臨床表**自動計算**。它們將多個連續記錄合併為一個「時代」（批次）——對於流行病學分析和臨床研究非常有用。

---

## 1. ERA概念

### 1.1。什麼是時代風險分析？

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

- **持久視窗**：要合併的2筆記錄之間的最大距離
  - CONDITION_ERA：30 天
  - DRUG_ERA：30 天
  - DOSE_ERA：0 天（僅限連續）

### 1.2。為什麼需要 ERA？

|問題 |解決|
|--------|------------|
| 1名病患進行20次糖尿病檢查 → 20筆記錄 | 1-2 CONDITION_ERA | 1-2
|患者服用二甲雙胍12個月→ 12張處方 | 1 藥物_ERA |
|需要計算「病程」| ERA 結束 - ERA 開始 |
|需要計算「治療時間」|藥物時代結束 - 藥物時代開始 |

---

## 2. CONDITION_ERA

### 2.1。表結構

|專欄 |類型 |必填 |說明 |
|-----|--------|----------|--------|
| `condition_era_id` |整數| ✅ PK |唯一ID |
| `person_id` |整數| ✅ | FK → 人 |
| `condition_concept_id` |整數| ✅ |標準概念（藥物成分含量）|
| `condition_era_start_date` |日期 | ✅ |批次開始日期 |
| `condition_era_end_date` |日期 | ✅ |批次結束日期 |
| `condition_occurrence_count` |整數| |合併記錄數 |

### 2.2。重要特徵

- `condition_concept_id` 始終**標準概念** (SNOMED)
- 持久性視窗 = **30 天**（默認，可自訂）
- 包括來自許多不同訪問的condition_occurrence

### 2.3。 CONDITION_ERA生成演算法

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

### 2.4。申請查詢

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

## 3. 藥物時代

### 3.1。表結構

|專欄 |類型 |必填 |說明 |
|-----|--------|----------|--------|
| `drug_era_id` |整數| ✅ PK |唯一ID |
| `person_id` |整數| ✅ | FK → 人 |
| `drug_concept_id` |整數| ✅ |標準概念（**成分**）|
| `drug_era_start_date` |日期 | ✅ |批次開始日期 |
| `drug_era_end_date` |日期 | ✅ |批次結束日期 |
| `drug_exposure_count` |整數| |組合處方數量 |
| `gap_days` |整數| |處方之間的總天數差距|

### 3.2。重要特徵

- `drug_concept_id` 始終處於**成分**水平（非臨床藥物）
- 所有二甲雙胍劑型 → 合併為 1 個二甲雙胍 ERA
- `gap_days`：患者在兩次處方之間不服藥的總天數

### 3.3。視覺範例

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

### 3.4。查詢：治療依從性

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

### 3.5。使用時間最長的頂級藥物

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

## 4.劑量_ERA

### 4.1。表結構

|專欄 |類型 |必填 |說明 |
|-----|--------|----------|--------|
| `dose_era_id` |整數| ✅ PK |唯一ID |
| `person_id` |整數| ✅ | FK → 人 |
| `drug_concept_id` |整數| ✅ |標準概念（成分）|
| `unit_concept_id` |整數| ✅ |劑量單位（毫克、克）|
| `dose_value` |浮動| ✅ |用量|
| `dose_era_start_date` |日期 | ✅ |開始日期 |
| `dose_era_end_date` |日期 | ✅ |結束日期 |

### 4.2。 DOSE_ERA 與 DRUG_ERA

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

- DOSE_ERA **持續時間視窗 = 0**：僅在連續相同劑量時組合
- 使用DRUG_STRENGTH從drug_concept_id計算dose_value

### 4.3。查詢：追蹤劑量變化

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

### 4.4。劑量遞增分析

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

## 5. 比較 3 個 ERA 表

|特性| CONDITION_ERA |藥物時代 | DOSE_ERA |
|------------|--------------|----------|----------|
| **來源** |條件發生 |藥物暴露 |藥物暴露+藥物強度|
| **概念層面** |標準（SNOMED）|成分|成分|
| **持久性視窗** | 30 天 | 30 天 | 0 天 |
| **添加者** |人+條件|人+成分|人+成分+劑量|
| **計數記錄** |條件發生次數 |藥物暴露計數 | （無）|
| **差距資訊** | （無）|間隔天數 | （無）|
| **劑量資訊** | （無）| （無）|劑量值，單位 |

---

## 6. 管道創建 ERA 表

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

## 總結

1. **ERA** = 將多個連續記錄合併為一個批次
2. **CONDITION_ERA**：30 天窗口，SNOMED 標準概念
3. **DRUG_ERA**：30 天窗口，成分水平，是 `gap_days` 計算依從性
4. **DOSE_ERA**：0天窗口，監測劑量隨時間的變化
5. ERA表是ETL後**自動建立**的，不是直接匯入的

**下一篇文章：** CDM_SOURCE、元資料、群組和系列摘要。

---

## 參考文獻

- [OMOP CDM 5.4 — CONDITION_ERA](https://ohdsi.github.io/CommonDataModel/cdm54.html#CONDITION_ERA)
- [OMOP CDM 5.4 — DRUG_ERA](https://ohdsi.github.io/CommonDataModel/cdm54.html#DRUG_ERA)
- [OMOP CDM 5.4 — DOSE_ERA](https://ohdsi.github.io/CommonDataModel/cdm54.html#DOSE_ERA)
- [Book of OHDSI — ch. 6: Standardized Derived Elements](https://ohdsi.github.io/TheBookOfOhdsi/)
