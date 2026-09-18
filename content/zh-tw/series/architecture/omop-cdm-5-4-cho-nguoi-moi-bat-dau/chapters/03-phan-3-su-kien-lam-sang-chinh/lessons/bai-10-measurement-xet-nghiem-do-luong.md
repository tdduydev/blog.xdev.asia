---
id: 019f1a00-a110-7b01-e001-omopcdm54010
title: 第 10 課：測量 — 測驗與測量
slug: bai-10-measurement-xet-nghiem-do-luong
description: >-
  记录测试结果、生命体征和临床测量结果。 value_as_number /
  value_as_concept_id、operator_concept_id、unit_concept_id、range_low /
  range_high、LOINC 詞彙、measurement_event_id 新 CDM 5.4。
duration_minutes: 65
is_free: true
video_url: null
sort_order: 10
section_title: 第 3 部分：關鍵臨床事件
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: 初學者的 OMOP CDM 5.4 — 從頭到尾了解
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop10" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop10)"/>
  <g>
    <circle cx="670" cy="85" r="20" fill="#818cf8" opacity="0.12"/>
    <circle cx="750" cy="115" r="28" fill="#818cf8" opacity="0.09"/>
    <circle cx="830" cy="95" r="35" fill="#818cf8" opacity="0.06"/>
    <circle cx="920" cy="155" r="22" fill="#818cf8" opacity="0.10"/>
    <line x1="610" y1="165" x2="1100" y2="245" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="130" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ 建築 — 第 10 課</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">測量</tspan>
    <tspan x="60" dy="42">測試與測量</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">初學者的 OMOP CDM 5.4 — 從頭到尾了解</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 3 部分：關鍵臨床事件</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![醫學測試和測量儀表板](/storage/uploads/2026/04/omop-cdm-bai10-measurement-lab.webp)

## 簡介

**測量**是所有實驗室結果、生命徵象和臨床測量的記錄－任何具有**可測量值**（數字或類別）的數據。這是大多數 OMOP 資料庫中最大的表，通常佔總記錄的 50% 以上，因為每次測試都會建立許多行（例如：具有 20 個指標的血液測試表 = 20 條記錄）。

---

## 1.表結構

|專欄 |類型 |必填 |說明 |
|-----|--------|----------|--------|
| `measurement_id` |整數| ✅ PK |唯一ID |
| `person_id` |整數| ✅ FK |病人 |
| `measurement_concept_id` |整數| ✅ |標準概念（LOINC）|
| `measurement_date` |日期 | ✅ |考試日期 |
| `measurement_datetime` |日期時間 | |日期與時間 |
| `measurement_time` | VARCHAR(10) | |現在（遺留）|
| `measurement_type_concept_id` |整數| ✅ |資料來源|
| `operator_concept_id` |整數| |運算子（<, >,=, <=, >=)|
| `value_as_number` |浮動| |數值|
| `value_as_concept_id` |整數| |類別值 |
| `unit_concept_id` |整數| |單位（UCUM）|
| `range_low` |浮動| |正常下限|
| `range_high` |浮動| |正常上限|
| `provider_id` |整數|氟克 |醫生囑咐|
| `visit_occurrence_id` |整數|氟克 |相關訪問 |
| `visit_detail_id` |整數|氟克 |瀏覽詳情 |
| `measurement_source_value` | VARCHAR(50) | |原始測試程式碼 |
| `measurement_source_concept_id` |整數| |原創概念|
| `unit_source_value` | VARCHAR(50) | |原單位|
| `unit_source_concept_id` |整數| |原始單位概念|
| `value_source_value` | VARCHAR(50) | |原值|
| `measurement_event_id` |大智 | | ⭐ 新CDM 5.4 |
| `meas_event_field_concept_id` |整數| | ⭐ 新CDM 5.4 |

---

## 2. value_as_number 與 value_as_concept_id

### 2.1。 NUMBER 結果 → value_as_number

```sql
-- Glucose máu: 6.5 mmol/L
INSERT INTO measurement VALUES (
    110001, 100001, 3004501,         -- LOINC: Glucose [Mass/volume] in Blood
    '2024-06-15', NULL, NULL,
    32817,                            -- EHR
    4172703,                          -- = (equals)
    6.5,                              -- value_as_number
    NULL,                             -- no concept value
    8753,                             -- UCUM: mmol/L
    3.9, 6.1,                         -- range: 3.9-6.1
    5001, 50001, NULL,
    'GLU', 0, 'mmol/L', 0,
    '6.5', NULL, NULL
);
```

### 2.2。結果類別 → value_as_concept_id

```sql
-- Xét nghiệm nhóm máu: O
INSERT INTO measurement VALUES (
    110002, 100001, 3003694,         -- LOINC: ABO group [Type] in Blood
    '2024-06-15', NULL, NULL,
    32817,                            -- EHR
    NULL,                             -- no operator
    NULL,                             -- no numeric value
    36308332,                         -- Concept: Blood group O
    NULL,                             -- no unit
    NULL, NULL,                       -- no range
    5001, 50001, NULL,
    'BLOOD_TYPE', 0, NULL, 0,
    'O', NULL, NULL
);
```

### 2.3。評選規則

|結果 |值作為數字 | value_as_concept_id |
|--------|----------------|--------------------|
| “6.5 毫摩爾/公升”| 6.5 | 6.5 空 |
| 「積極」|空| 4181412（正）|
| 「負」|空| 4132135（負）|
| 「O型血」|空| 36308332 |
| > 100" | 100 | 100 NULL + 運算子 = > |
| 「正常」|空| 4069590（普通）|

---

## 3.operator_concept_id — 比較運算子

當結果不正確時使用（例如：“< 0.5", "> 100”）。

|概念 ID |操作員|意義|
|------------|---------|---------|
| 4171756 | 4171756 4171756 < |降低|
| 4171754 | 4171754 <= |小於或等於 |
| 4172703 | 4172703 = |等於（預設）|
| 4172704 | >= |高於或等於|
| 4172702 | 4172702 > |更高 |

```sql
-- Kết quả HBsAg: < 0.05 (dưới ngưỡng phát hiện)
INSERT INTO measurement (
    measurement_id, person_id, measurement_concept_id,
    measurement_date, measurement_type_concept_id,
    operator_concept_id, value_as_number,
    unit_concept_id, measurement_source_value
) VALUES (
    110003, 100001, 3013721,         -- LOINC: HBsAg
    '2024-06-15', 32817,
    4171756,                          -- operator: <
    0.05,                             -- value
    8647,                             -- IU/mL
    'HBSAG'
);
```

---

## 4. LOINC — 詞彙測試

### 4.1。 LOINC結構

```
LOINC Code = Component : Property : Time : System : Scale : Method
VD: 2345-7 = Glucose : MCnc : Pt : Ser/Plas : Qn

  Component  = Glucose         (đo gì)
  Property   = MCnc            (mass concentration)
  Time       = Pt              (point in time)
  System     = Ser/Plas        (huyết thanh/huyết tương)
  Scale      = Qn              (quantitative - số)
```

### 4.2。 LOINC很受歡迎

| LOINC 代碼 |概念 ID |姓名 |越南 |
|------------|------------|-----|-----|
| 2345-7 | 2345-7 3004501 |血清中的葡萄糖[質量/體積] |血糖|
| 4548-4 | 3034639 | 3034639糖化血紅素 |糖化血紅素 |
| 2160-0 | 2160-0 3016723 |血清肌酸酐 |血肌酸酐|
| 6768-6 | 3006923 |血清中的 ALT | SGPT |
| 33914-3 | 33914-3 3027018 | GFR 估計值 |腎小球濾過率 |
| 718-7 | 718-7 3000963 |血紅素 |血紅素 |
| 26515-7 | 26515-7 3010813 |血小板 |血小板 |
| 2093-3 | 2093-3 3027114 |總膽固醇 |總膽固醇 |

---

## 5.unit_concept_id — UCUM 單元

|概念 ID | UCUM 代碼 |單位|
|------------|----------|--------|
| 8840 |毫克/分升 |毫克每分升 |
| 8753 |毫摩爾/公升 |毫摩爾每公升 |
| 8647 |國際單位/毫升|國際單位每毫升 |
| 8554 | % |百分比 |
| 9529 | 9529公斤/平方公尺|體重指數 |
| 8876 |毫米[汞] |毫米汞柱 |
| 8582 | /uL |每微升（血球）|
| 8845 |毫克/公升 |毫克每公升 |

> **重要：** 相同的測試但不同的單位 → 不同的值。例如：葡萄糖 100 mg/dL = 5.6 mmol/L。 ETL必須標準化單位！

---

## 6.measurement_event_id — CDM 5.4 的新增功能

允許將測量連結到任何其他事件。

```
  ┌──────────────────────────────┐
  │     MEASUREMENT              │
  │  "Lab: BUN = 35 mg/dL"      │
  │  measurement_event_id = 70001│
  │  meas_event_field_concept_id │
  │  = 1147127                   │──→ condition_occurrence
  │     (condition_occurrence_id)│     .condition_occurrence_id
  └──────────────────────────────┘     = 70001
```

應用：將測試與請求該測試的特定診斷或程序相關聯。

```sql
-- Xét nghiệm BUN liên quan đến chẩn đoán suy thận
INSERT INTO measurement (
    measurement_id, person_id, measurement_concept_id,
    measurement_date, measurement_type_concept_id,
    value_as_number, unit_concept_id,
    measurement_event_id,
    meas_event_field_concept_id
) VALUES (
    110010, 100001, 3013682,         -- LOINC: BUN
    '2024-06-15', 32817,
    35, 8840,                         -- 35 mg/dL
    70001,                            -- Liên kết condition_occurrence_id = 70001
    1147127                           -- Field = condition_occurrence.condition_occurrence_id
);
```

---

## 7. ETL 測試 VN

### 7.1。常見問題

|問題 |解決方案 |
|--------|------------|
| BV內部考試代碼|透過 SOURCE_TO_CONCEPT_MAP → LOINC | 進行映射
|文字結果「陽性」 |映射到 value_as_concept_id |
|結果"< 0.5" |分割運算子 + value_as_number |
|非標機組| UCUM 地圖 |
|範圍因實驗室而異 |從機器/實驗室取得範圍，輸入 range_low/range_high |
| 20個指標的測試表=1行 |分為20筆測量記錄|

### 7.2. SQL ETL

```sql
-- Mỗi chỉ số xét nghiệm = 1 record MEASUREMENT
SELECT
    ROW_NUMBER() OVER() AS measurement_id,
    pm.person_id,
    COALESCE(stcm.target_concept_id, 0) AS measurement_concept_id,
    xn.ngay_xetnghiem AS measurement_date,
    32817 AS measurement_type_concept_id,
    -- Parse operator từ giá trị gốc
    CASE
        WHEN xn.gia_tri LIKE '<%' THEN 4171756    -- <
        WHEN xn.gia_tri LIKE '>%' 那麼 4172702 -->
        其他 4172703 -- =
    END AS 運算子_概念_id，
    -- 從值中解析數字
    案例
        當 xn.price ~ '^[<>]?[0-9.]+'
        則 REGEXP_REPLACE(xn.value, '[^0-9.]', '', 'g')::FLOAT
        否則為空
    END AS value_as_number,
    -- 類別結果
    CASE xn 值
        當「積極」時，那麼 4181412 -- 積極
        當「陰性」時，則 4132135 -- 陰性
        當「正常」時，則 4069590 -- 正常
        否則為空
    END AS value_as_concept_id,
    COALESCE(u.target_concept_id, 0) AS unit_concept_id,
    xn.gioi_han_duoi AS range_low,
    xn.gioi_han_tren AS range_high,
    xn.ma_xetnghiem AS 測量來源值，
    xn.don_vi_goc AS 單位來源值，
    xn.value AS value_source_value
來自 xetnghiem_his xn
JOIN person_mapping pm ON xn.ma_bn = pm.source_id
左連接 source_to_concept_map stcm
    ON xn.ma_xetnghiem = stcm.source_code
    AND stcm.source_vocabulary_id = 'VN_LAB'
左連接 source_to_concept_map u
    ON xn.don_vi_goc = u.source_code
    AND u.source_vocabulary_id = 'VN_UNIT';
```

---

## 8. 測量生命徵象

|生命徵象|洛因克 |概念 ID |單位|
|-----------|-------|-----------|--------|
|收縮壓| 8480-6 | 8480-6 3004249 |毫米汞柱 |
|舒張壓| 8462-4 | 3012888 |毫米汞柱 |
|心率 | 8867-4 | 3027018 | /分鐘|
|溫度| 8310-5 | 3020891 | ℃ |
| SpO2 | 59408-5 | 40762499 | % |
|重量 | 29463-7 | 29463-7 3025315 |公斤 |
|身高| 8302-2 | 3036277 | 3036277公分 |
| BMI | 39156-5 | 3038553 | kg/m² |

```sql
-- 記錄生命徵象：血壓 130/85、NT 80、體溫 37.2、SpO2 97%
插入測量（measurement_id、person_id、measurement_concept_id、
    測量日期、測量類型概念 ID、
    value_as_number、unit_concept_id、measurement_source_value）
價值觀
    (120001, 100001, 3004249, '2024-06-15', 32817, 130, 8876, 'SBP'),
    (120002, 100001, 3012888, '2024-06-15', 32817, 85, 8876, 'DBP'),
    (120003, 100001, 3027018, '2024-06-15', 32817, 80, 8541, '人力資源'),
    (120004, 100001, 3020891, '2024-06-15', 32817, 37.2, 586323, '暫時'),
    (120005, 100001, 40762499, '2024-06-15', 32817, 97, 8554, 'SPO2');
```

---

## 9. SQL分析

```sql
-- HbA1c 在人群中的分佈
選擇
    案例
        當 m.value_as_number 時 < 5.7 THEN 'Bình thường (<5.7%)'
        WHEN m.value_as_number BETWEEN 5.7 AND 6.4 THEN 'Tiền ĐTĐ (5.7-6.4%)'
        WHEN m.value_as_number >= 6.5 那麼“糖尿病 (>=6.5%)”
    結束為 hba1c_group,
    COUNT(DISTINCT m.person_id) AS 患者，
    ROUND(AVG(m.value_as_number), 2) AS avg_hba1c
FROM 測量 m
其中 m.measurement_concept_id = 3034639 -- HbA1c
  AND m.value_as_number 不為空
  AND m.value_as_number BETWEEN 2 AND 20 -- 輸入異常值
按 hba1c_group 分組
按 hba1c_group 排序；

-- HbA1c 隨時間變化的趨勢（1 名患者）
選擇
    m.測量日期，
    m.value_as_number AS hba1c，
    案例
        當 m.value_as_number 時 < 7.0 THEN '✅ Kiểm soát tốt'
        ELSE '⚠️ Cần cải thiện'
    END AS status
FROM measurement m
WHERE m.person_id = 100001
  AND m.measurement_concept_id = 3034639
ORDER BY m.measurement_date;

-- Xét nghiệm bất thường (ngoài range)
SELECT
    c.concept_name AS test_name,
    COUNT(*) AS abnormal_count,
    COUNT(DISTINCT m.person_id) AS patients
FROM measurement m
JOIN concept c ON m.measurement_concept_id = c.concept_id
WHERE m.value_as_number IS NOT NULL
  AND (m.value_as_number < m.range_low
       OR m.value_as_number > m.range_high)
  且 m.range_low 不為空
  AND m.range_high 不為空
按 c.concept_name 分組
ORDER BY異常計數 DESC
限制 10；
```

---

## 總結

1. **測量** = 測試 + 生命徵象 + 所有測量值
2. 兩種結果類型：**value_as_number**（數字）或**value_as_concept_id**（類別）
3. **operator_concept_id** 給出結果“<”或“>”
4. **unit_concept_id** 使用 UCUM，**measurement_concept_id** 使用 LOINC
5. **range_low / range_high** 為正常參考值
6. CDM 5.4：**measurement_event_id** 將測試與另一個事件相關聯

**下一篇文章：** 觀察—專門表格未涵蓋的臨床事件。

---

## 參考文獻

- [OMOP CDM 5.4 — MEASUREMENT](https://ohdsi.github.io/CommonDataModel/cdm54.html#MEASUREMENT)
- [LOINC.org](https://loinc.org/)
- [UCUM — Unified Code for Units of Measure](https://ucum.org/)
