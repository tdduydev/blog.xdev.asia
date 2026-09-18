---
id: 019f1a00-a108-7b01-e001-omopcdm54008
title: 第 8 課：DRUG_EXPOSURE — 藥物、處方與疫苗
slug: bai-8-drug-exposure-thuoc-dieu-tri
description: 記錄用藥史：處方、配藥、給藥。了解 RxNorm 詞彙、數量/天數供應/補充量、route_concept_id、sig、DRUG_STRENGTH 關聯。
duration_minutes: 65
is_free: true
video_url: null
sort_order: 8
section_title: 第 3 部分：關鍵臨床事件
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: 初學者的 OMOP CDM 5.4 — 從頭到尾了解
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: zh-tw
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ 建築 — 第 8 課</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">藥物暴露</tspan>
    <tspan x="60" dy="42">藥物、處方和疫苗</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">初學者的 OMOP CDM 5.4 — 從頭到尾了解</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 3 部分：關鍵臨床事件</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![藥品層級：成分→臨床藥品→品牌藥](/storage/uploads/2026/04/omop-cdm-bai8-drug-hierarchy.webp)

## 簡介

**DRUG_EXPOSURE** 是一個記錄每個藥物相關事件的表格－從醫生開處方，到藥局配藥，再到護理師輸液。這是臨床數據組中最複雜的表，因為它必須處理許多不同的資料來源：門診處方、住院藥物、疫苗和輸液。

---

## 1.表結構

|專欄 |類型 |必填 |說明 |
|-----|--------|----------|--------|
| `drug_exposure_id` |整數| ✅ PK |唯一ID |
| `person_id` |整數| ✅ FK |病人 |
| `drug_concept_id` |整數| ✅ |標準概念（RxNorm）|
| `drug_exposure_start_date` |日期 | ✅ |開始日期 |
| `drug_exposure_start_datetime` |日期時間 | |開始日期和時間 |
| `drug_exposure_end_date` |日期 | ✅ |結束日期 |
| `drug_exposure_end_datetime` |日期時間 | |結束日期和時間 |
| `verbatim_end_date` |日期 | |原始結束日期（推論前）|
| `drug_type_concept_id` |整數| ✅ |資料來源|
| `stop_reason` | VARCHAR(20) | |停藥的原因 |
| `refills` |整數| |筆芯數量 |
| `quantity` |浮動| |分配數量 |
| `days_supply` |整數| |供應天數 |
| `sig` | CLOB | |原版使用手冊|
| `route_concept_id` |整數| |給藥途徑（口服、注射...） |
| `lot_number` | VARCHAR(50) | |批號（對疫苗很重要）|
| `provider_id` |整數|氟克 |醫生開藥|
| `visit_occurrence_id` |整數|氟克 |相關訪問 |
| `visit_detail_id` |整數|氟克 |瀏覽詳情 |
| `drug_source_value` | VARCHAR(50) | |藥品通用名代碼|
| `drug_source_concept_id` |整數| |原創概念|
| `route_source_value` | VARCHAR(50) | |原先的給藥途徑|
| `dose_unit_source_value` | VARCHAR(50) | |原劑量單位|

---

## 2. RxNorm — 醫學詞彙標準

### 2.1。 RxNorm 層次結構

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

### 2.2。選擇正確的 RxNorm 級別

|水平|何時使用 |範例|
|--------|-------------|--------|
| **成分** |只知道有效成分| “二甲雙胍”|
| **臨床藥物** |了解有效成分+劑量+劑型 | “二甲雙胍 500 毫克片劑”|
| **品牌藥** |知道商品名 | “格華止 500 毫克片劑”|
| **臨床藥物成分** |活性成分+劑量（組合）| “二甲雙胍 500 毫克”|

> **建議：** 如果有足夠的信息，則在 **臨床藥物** 或 **品牌藥物** 級別進行映射。如果來源資料只有活性成分名稱，請使用**成分**。

---

## 3. drug_type_concept_id — 資料來源

|概念 ID |名稱 |使用案例 |
|------------|-----|----------|
| 32838 |電子病歷處方| HIS 的處方 |
| 32839 | 32839電子病歷配藥|配藥藥房|
| 32818 |電子病歷管理|護理師記錄注射/輸液|
| 32869 | 32869 病人自我報告 |病人自我申報正在服用的藥物
| 32810 |索賠 |社保資料|

---

## 4. 計算 days_supply 和 drug_exposure_end_date

### 4.1。清潔發展機制規則

```
drug_exposure_end_date =
    drug_exposure_start_date + days_supply - 1
```

### 4.2。計算範例

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

### 4.3。輸液/注射

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

## 5.route_concept_id — 給藥途徑

|概念 ID |路線 |越南語 |
|------------|---------|------------|
| 4132161 | 4132161口服|喝|
| 4171047 | 4171047靜脈注射 |靜脈注射|
| 4302612 | 4302612肌肉注 |肌肉注射|
| 4142048 | 4142048皮下注射 |皮下注射|
| 4186838 |專題 |局部應用|
| 4290759 | 4290759吸入 |吸入/氣霧劑 |
| 4163768 | 4163768直腸 |直腸 |
| 4186747 | 4186747眼科|眼藥水|

---

## 6. DRUG_EXPOSURE 中的疫苗

疫苗也儲存在DRUG_EXPOSURE中，它沒有自己的表。

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

**注意批次編號：** 對於疫苗尤其重要 - 用於在出現不良事件時追蹤批次。

---

## 7. ETL 越南醫學

### 7.1。常見問題

|問題 |解決方案 |
|--------|------------|
| HIS 使用自己的程式碼 |透過 SOURCE_TO_CONCEPT_MAP | 映射
|越南藥名 | Usagi 繪圖工具 |
|組合藥物（二甲雙胍 + 格列吡嗪）|關於 RxNorm 組合概念的地圖 |
|劑量/配方未知 |成分水平圖|
|東方醫學/傳統醫學| Concept_id = 0，保存 source_value |

### 7.2。 ETL範例

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

## 8. 綁定到 DRUG_STRENGTH

表**DRUG_STRENGTH**（在詞彙表中）包含詳細的劑量資訊：

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

## 9. SQL分析

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

## 總結

1. **DRUG_EXPOSURE** = 處方+配藥+輸液+疫苗
2.**drug_concept_id**使用**RxNorm**（成分→臨床藥物→品牌藥物）
3. **days_supply** + **數量** + **補充品** 建立完整圖片
4. **route_concept_id** 表示給藥途徑，**lot_number** 表示疫苗
5. **drug_type_concept_id** 區分處方、配藥和給藥
6. ETL VN：透過 SOURCE_TO_CONCEPT_MAP 或 Usagi 映射

**下一篇文章：** PROCEDURE_OCCURRENCE — 手術、手術和介入。

---

## 參考文獻

- [OMOP CDM 5.4 — DRUG_EXPOSURE](https://ohdsi.github.io/CommonDataModel/cdm54.html#DRUG_EXPOSURE)
- [RxNorm on Athena](https://athena.ohdsi.org/)
- [DRUG_STRENGTH](https://ohdsi.github.io/CommonDataModel/cdm54.html#DRUG_STRENGTH)
