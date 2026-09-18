---
id: 019f1a00-a107-7b01-e001-omopcdm54007
title: 第 7 課：CONDITION_OCCURRENCE — 診斷與病理學
slug: bai-7-condition-occurrence-chan-doan-benh-ly
description: >-
  記錄診斷、症狀、病理徵兆、condition_concept_id vs
  source_value、condition_status（入院/主要/次要），連結到就診和提供者，與觀察表區分。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 7
section_title: 第 3 部分：關鍵臨床事件
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: 初學者的 OMOP CDM 5.4 — 從頭到尾了解
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop07" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop07)"/>
  <g>
    <circle cx="659" cy="87" r="22" fill="#818cf8" opacity="0.12"/>
    <circle cx="718" cy="106" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="777" cy="125" r="36" fill="#818cf8" opacity="0.06"/>
    <circle cx="895" cy="163" r="20" fill="#818cf8" opacity="0.1"/>
    <line x1="600" y1="157" x2="1100" y2="237" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ 建築 — 第 7 課</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">CONDITION_OCCURRENCE 條件</tspan>
    <tspan x="60" dy="42">診斷與病理學</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">初學者的 OMOP CDM 5.4 — 從頭到尾了解</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 3 部分：關鍵臨床事件</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![ICD-10 → CONDITION_OCCURRENCE 中的 SNOMED 映射過程](/storage/uploads/2026/04/omop-cdm-bai7-condition-mapping.webp)

## 簡介

**CONDITION_OCCURRENCE** 記錄醫生為病人所記錄的所有醫療診斷、症狀和徵兆。這通常是 OMOP CDM 中分析最多的表格 - 因為醫學研究通常從以下問題開始：“誰得到什麼？”

---

## 1.表結構

|專欄 |類型 |必填 |說明 |
|-----|--------|----------|--------|
| `condition_occurrence_id` |整數| ✅ PK |唯一ID |
| `person_id` |整數| ✅ FK |病人 |
| `condition_concept_id` |整數| ✅ |標準概念（SNOMED）|
| `condition_start_date` |日期 | ✅ |診斷開始日期 |
| `condition_start_datetime` |日期時間 | |日期與時間 |
| `condition_end_date` |日期 | |診斷結束日期 |
| `condition_end_datetime` |日期時間 | |結束日期和時間 |
| `condition_type_concept_id` |整數| ✅ |資料來源|
| `condition_status_concept_id` |整數| |狀態（小學、入學...）|
| `stop_reason` | VARCHAR(20) | |停止診斷的原因 |
| `provider_id` |整數|氟克 |診斷醫生|
| `visit_occurrence_id` |整數|氟克 |相關訪問 |
| `visit_detail_id` |整數|氟克 |訪問詳情（哪個部門）|
| `condition_source_value` | VARCHAR(50) | |原始碼（例如“E11”）|
| `condition_source_concept_id` |整數| |原創概念|
| `condition_status_source_value` | VARCHAR(50) | |原狀態|

---

## 2. CONDITION_OCCURRENCE 中儲存了什麼？

### 2.1。應該保存

|類型 |範例|詞彙|
|--------|--------|-------------|
|疾病診斷 |第 2 型糖尿病、肺炎 | SNOMED CT |
|症狀 |發燒、腹痛、咳嗽 | SNOMED CT |
|臨床症狀|腳腫、黃疸 | SNOMED CT |
|鑑別診斷|疑似結核病| SNOMED CT |

### 2.2。不要保存（保存在另一個表中）

|類型 |目的地表|原因 |
|--------|---------|--------|
| “糖尿病史”|觀察|領域=觀察|
| “沒有過敏” |觀察|缺席→觀察|
| “體重指數 = 28” |測量|領域=測量|
|藥物副作用|狀況 + 藥物暴露 | ADR的條件，藥物引起的藥物|

---

## 3.condition_status_concept_id — 診斷狀態

|概念 ID |狀態 |意義|
|------------|--------|--------|
| 32902 | 32902初步診斷 |初步診斷 |
| 32908|二次診斷 |二次診斷|
| 32903 | 32903承認診斷 |入院診斷|
| 32904 | 32904出院診斷|出院時診斷 |
| 32906 | 32906臨時診斷|暫時診斷|
| 32907 | 32907確診|確診|

```sql
-- Ví dụ: BN nhập viện
-- Chẩn đoán nhập viện: Nghi lao phổi (provisional)
INSERT INTO condition_occurrence VALUES (
    70001, 100001, 255848,       -- SNOMED: Pneumonia
    '2024-06-10', NULL,
    '2024-06-20', NULL,
    32817,                        -- EHR
    32903,                        -- Admitting diagnosis
    NULL, 5001, 50001, NULL,
    'J18.9', 0,                   -- ICD-10: Pneumonia, unspecified
    'admitting'
);

-- Chẩn đoán xuất viện: Viêm phổi do phế cầu (confirmed)
INSERT INTO condition_occurrence VALUES (
    70002, 100001, 257315,       -- SNOMED: Pneumococcal pneumonia
    '2024-06-10', NULL,
    '2024-06-20', NULL,
    32817,                        -- EHR
    32904,                        -- Discharge diagnosis
    NULL, 5001, 50001, NULL,
    'J13', 0,                     -- ICD-10
    'discharge'
);
```

---

## 4. 越南 ICD-10 資料的 ETL

### 4.1。測繪流程

```
  HIS: ma_benh = 'E11.65'  (ICD-10-CM)
       ten_benh = 'ĐTĐ type 2 có biến chứng mạch máu ngoại vi'
       │
       │ Bước 1: Tìm source concept
       ↓
  SOURCE CONCEPT: concept_id = 45591837
       vocabulary_id = ICD10CM
       concept_code = 'E11.65'
       │
       │ Bước 2: Tìm Standard Concept (Maps to)
       ↓
  STANDARD CONCEPT: concept_id = 201826
       vocabulary_id = SNOMED
       concept_name = 'Type 2 diabetes mellitus'
       domain_id = 'Condition'
```

```sql
-- SQL ETL
SELECT
    ROW_NUMBER() OVER() AS condition_occurrence_id,
    pm.person_id,
    COALESCE(cr.concept_id_2, 0) AS condition_concept_id,
    cd.ngay_chandoan AS condition_start_date,
    NULL AS condition_end_date,
    32817 AS condition_type_concept_id,
    CASE cd.loai_chandoan
        WHEN 'CHINH' THEN 32902   -- Primary
        WHEN 'PHU'   THEN 32908   -- Secondary
        ELSE 0
    END AS condition_status_concept_id,
    cd.ma_icd10 AS condition_source_value,
    COALESCE(c_source.concept_id, 0) AS condition_source_concept_id
FROM chandoan_his cd
JOIN person_mapping pm ON cd.ma_bn = pm.source_id
LEFT JOIN concept c_source
    ON cd.ma_icd10 = c_source.concept_code
    AND c_source.vocabulary_id = 'ICD10CM'
LEFT JOIN concept_relationship cr
    ON c_source.concept_id = cr.concept_id_1
    AND cr.relationship_id = 'Maps to'
LEFT JOIN concept c_std
    ON cr.concept_id_2 = c_std.concept_id
    AND c_std.standard_concept = 'S';
```

### 4.2。越南特定數據處理

|問題 |解決方案 |
|--------|------------|
| ICD-10-VN 與 ICD-10-CM 不同 |透過 SOURCE_TO_CONCEPT_MAP | 進行映射
| BV內部程式碼| Usagi 繪圖工具 |
|缺少結束日期 |條件結束日期 = NULL（有效）|
| 1 ICD 地圖許多 SNOMED |選擇最適合的理念 |

---

## 5. 區分條件與觀察

|標準| CONDITION_OCCURRENCE | 條件發生觀察|
|------------|------------------------|-------------|
| **內容** |目前生病/正在治療 |史前、生活方式、記錄|
| **範例** | “第2型糖尿病” | “糖尿病家族史”|
| **域名** |條件|觀察|
| **標準詞彙** | SNOMED CT | SNOMED CT |
| **什麼時候？ ** |活動性疾病 |記錄資訊|

> **規則：** 請務必檢查 Athena 上 Standard Concept 的 **domain_id**。如果域 =“觀察”，則保存到“觀察”，即使來源是 ICD-10。

---

## 6.流行SQL分析

```sql
-- Top 10 chẩn đoán phổ biến nhất
SELECT
    c.concept_name AS condition_name,
    COUNT(DISTINCT co.person_id) AS patient_count,
    COUNT(*) AS record_count
FROM condition_occurrence co
JOIN concept c ON co.condition_concept_id = c.concept_id
WHERE co.condition_concept_id != 0
GROUP BY c.concept_name
ORDER BY patient_count DESC
LIMIT 10;

-- Tỉ lệ mắc bệnh theo giới tính
SELECT
    g.concept_name AS gender,
    c.concept_name AS condition_name,
    COUNT(DISTINCT co.person_id) AS patients
FROM condition_occurrence co
JOIN person p ON co.person_id = p.person_id
JOIN concept g ON p.gender_concept_id = g.concept_id
JOIN concept c ON co.condition_concept_id = c.concept_id
WHERE co.condition_concept_id = 201826  -- Type 2 DM
GROUP BY g.concept_name, c.concept_name;

-- Comorbidity: BN tiểu đường có tăng huyết áp?
SELECT
    COUNT(DISTINCT co_dm.person_id) AS dm_patients,
    COUNT(DISTINCT co_ht.person_id) AS dm_with_hypertension,
    ROUND(
        COUNT(DISTINCT co_ht.person_id) * 100.0 /
        NULLIF(COUNT(DISTINCT co_dm.person_id), 0), 1
    ) AS comorbidity_pct
FROM condition_occurrence co_dm
LEFT JOIN condition_occurrence co_ht
    ON co_dm.person_id = co_ht.person_id
    AND co_ht.condition_concept_id IN (
        SELECT descendant_concept_id
        FROM concept_ancestor
        WHERE ancestor_concept_id = 320128  -- Essential hypertension
    )
WHERE co_dm.condition_concept_id IN (
    SELECT descendant_concept_id
    FROM concept_ancestor
    WHERE ancestor_concept_id = 201826  -- Type 2 DM
);
```

---

## 總結

1. **CONDITION_OCCURRENCE** = 診斷、症狀、病理徵象
2. **condition_concept_id** 使用標準概念 (SNOMED CT)
3. **病情狀態**：主要、次要、入院、出院
4. **三列樹**：concept_id / source_value / source_concept_id
5. **區分** 病情（當前疾病）與觀察（歷史、記錄）
6. **ETL VN**：ICD-10-VN → 源概念 → 映射到 → 標準 SNOMED

**下一篇文章：** DRUG_EXPOSURE — OMOP CDM 如何記錄藥物、處方和疫苗。

---

## 參考文獻

- [OMOP CDM 5.4 — CONDITION_OCCURRENCE](https://ohdsi.github.io/CommonDataModel/cdm54.html#CONDITION_OCCURRENCE)
- [Athena — Condition Domain](https://athena.ohdsi.org/)
