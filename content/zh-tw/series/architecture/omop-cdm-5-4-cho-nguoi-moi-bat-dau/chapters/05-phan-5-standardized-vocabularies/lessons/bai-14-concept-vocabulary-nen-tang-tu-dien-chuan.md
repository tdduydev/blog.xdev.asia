---
id: 019f1a00-a114-7b01-e001-omopcdm54014
title: 第 14 課：概念與詞彙 — 標準辭典基礎
slug: bai-14-concept-vocabulary-nen-tang-tu-dien-chuan
description: >-
  這兩個表是詞彙系統的核心：概念包含所有醫學概念，詞彙管理起源。了解
  standard_concept、domain_id、concept_class_id、vocabulary_id 以及如何在 Athena 上尋找。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 14
section_title: 第 5 部分：標準化詞彙
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: 初學者的 OMOP CDM 5.4 — 從頭到尾了解
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop14" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop14)"/>
  <g>
    <circle cx="690" cy="88" r="22" fill="#818cf8" opacity="0.11"/>
    <circle cx="770" cy="108" r="30" fill="#818cf8" opacity="0.08"/>
    <circle cx="850" cy="130" r="26" fill="#818cf8" opacity="0.07"/>
    <line x1="630" y1="160" x2="1100" y2="240" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="130" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ 建築 — 第 14 課</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">概念和詞彙</tspan>
    <tspan x="60" dy="42">標準字典平台</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">初學者的 OMOP CDM 5.4 — 從頭到尾了解</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 5 部分：標準化詞彙</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![詞彙生態系統——概念、詞彙、關係、祖先](/storage/uploads/2026/04/omop-cdm-bai14-vocabulary-ecosystem.webp)

## 簡介

**標準化詞彙**系統是 OMOP CDM 的「大腦」——所有臨床數據都連結到這裡。本文重點介紹兩個中心表：**CONCEPT**（包含約 1000 萬個醫學概念）和 **VOCABULARY**（管理 70 多個字典來源）。理解這兩個表是掌握OMOP的關鍵。

---

## 1. 概念表

### 1.1。結構

|專欄 |類型 |說明 |範例|
|-----|--------|--------|--------|
| `concept_id` |整數| PK－全球唯一ID | 201826 | 201826
| `concept_name` | VARCHAR(255) |概念名稱| “2 型糖尿病”|
| `domain_id` | VARCHAR(20) |域（哪個表）| “條件”|
| `vocabulary_id` | VARCHAR(20) | FK → 字彙 | “SNOMED”|
| `concept_class_id` | VARCHAR(20) |字彙分類| 「臨床發現」 |
| `standard_concept` | VARCHAR(1) | VARCHAR(1) | S=標準，C=分類，NULL | “S”|
| `concept_code` | VARCHAR(50) |字彙表原碼| “44054006”|
| `valid_start_date` |日期 |生效開始日期 | 2002-01-31 |
| `valid_end_date` |日期 |有效期限 | 2099-12-31 |
| `invalid_reason` | VARCHAR(1) | VARCHAR(1) | NULL=有效，U=更新，D=刪除 |空|

### 1.2。 standard_concept — 三種類型的概念

```
  ┌─────────────────────────────────────────────────────┐
  │ standard_concept = 'S' (Standard)                    │
  │ → Concept "chính thống" dùng trong *_concept_id     │
  │ → VD: SNOMED 201826 "Type 2 diabetes mellitus"      │
  │ → Dùng cho condition_concept_id                      │
  └──────────────────────┬──────────────────────────────┘
                         │ Maps to (nguồn → đích)
  ┌──────────────────────┴──────────────────────────────┐
  │ standard_concept = NULL (Non-standard / Source)      │
  │ → Concept nguồn từ ICD, CPT4, ATC...               │
  │ → VD: ICD10CM 45591837 "E11 - Type 2 DM"           │
  │ → Dùng cho *_source_concept_id                       │
  └─────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────┐
  │ standard_concept = 'C' (Classification)              │
  │ → Concept dùng cho phân cấp / ancestor              │
  │ → VD: MedDRA PT "Diabetes mellitus"                 │
  └─────────────────────────────────────────────────────┘
```

### 1.3。 domain_id — 標識目標表

|網域名稱 ID |清潔發展機製表|範例|
|------------|---------|--------|
|條件| CONDITION_OCCURRENCE | 條件發生疾病、症狀 |
|藥品 |藥物暴露 |醫學|
|程式 | PROCEDURE_OCCURRENCE | 流程發生提示 |
|測量|測量|測試|
|觀察|觀察|致謝|
|設備|設備曝光 |設備|
|規格解剖網站 |樣本|取樣地點 |
|訪問 |訪問發生次數 |類型訪問 |
|型別概念| *_type_concept_id |資料來源|
|性別 |人物 |性別 |
|比賽|人物 |比賽|
|單位|測量單位 |單位|
|路線 |藥物暴露.route |給藥途徑 |

---

## 2. 詞彙表

### 2.1。結構

|專欄 |類型 |說明 |
|-----|--------|--------|
| `vocabulary_id` | VARCHAR(20) | PK－ID詞彙|
| `vocabulary_name` | VARCHAR(255) |全名 |
| `vocabulary_reference` | VARCHAR(255) |參考網址|
| `vocabulary_version` | VARCHAR(255) |版本 |
| `vocabulary_concept_id` |整數| FK→代表概念|

### 2.2。熱門詞彙

|詞彙_id |名稱 |主域 |角色 |
|--------------|-----|-------------|---------|
| **SNOMED** | SNOMED-CT |條件、程序、觀察| Standard for clinical use |
| **RxNorm** | RxNorm |藥品 |醫學標準|
| **LOINC** |洛因克 |測量|測試標準|
| **ICD10CM** | ICD-10-CM |條件| Source concept diagnosis |
| **ICD10PCS** | ICD-10-PCS |程式 |來源概念提示|
| **CPT4** | CPT-4 |程式、測量|來源計費代碼 |
| **空中交通管制** |空中交通管制 |藥品 | Classification of drugs |
| **UCUM** | UCUM |單位|計量單位|
| **性別** | OMOP 性別 |性別 |性別 |
| **比賽** |比賽|比賽|比賽|
| **CVX** |疫苗 |藥品 |疫苗代碼 |

---

## 3. 在 Athena 上尋找 Concept

### 3.1。尋找步驟

```
  1. Vào athena.ohdsi.org
  2. Gõ từ khóa: "Type 2 diabetes"
  3. Filter:
     - Standard Concept: Standard ✓
     - Domain: Condition ✓
     - Vocabulary: SNOMED ✓
  4. Kết quả:
     concept_id:     201826
     concept_name:   Type 2 diabetes mellitus
     vocabulary_id:  SNOMED
     concept_code:   44054006
     standard_concept: S
     domain_id: Condition
```

### 3.2。 SQL查詢

```sql
-- Tìm Standard Concept cho "tiểu đường type 2"
SELECT concept_id, concept_name, vocabulary_id,
       domain_id, standard_concept, concept_code
FROM concept
WHERE LOWER(concept_name) LIKE '%type 2 diabetes%'
  AND standard_concept = 'S'
  AND domain_id = 'Condition'
ORDER BY concept_name;

-- Tìm Source Concept (ICD-10) mapping đến Standard
SELECT
    c_src.concept_id AS source_concept_id,
    c_src.concept_code AS icd10_code,
    c_src.concept_name AS icd10_name,
    c_std.concept_id AS standard_concept_id,
    c_std.concept_name AS standard_name,
    c_std.vocabulary_id AS standard_vocab
FROM concept c_src
JOIN concept_relationship cr
    ON c_src.concept_id = cr.concept_id_1
    AND cr.relationship_id = 'Maps to'
JOIN concept c_std
    ON cr.concept_id_2 = c_std.concept_id
    AND c_std.standard_concept = 'S'
WHERE c_src.concept_code = 'E11'
  AND c_src.vocabulary_id = 'ICD10CM';
```

---

## 4.concept_class_id — 詞彙分類

### 4.1。斯諾梅德

|概念類別 ID |意義|範例|
|-----------------|---------|-------|
|臨床結果|疾病、症狀 | 2 型 DM |
|程序 |提示 |闌尾切除術 |
|車身結構|車身結構|肝臟 |
|物質 |品質 |葡萄糖 |
|可觀察實體 |測量數量 |血壓|
|限定值 |附加價值|嚴重|

### 4.2。接收標準

|概念類別 ID |水平|範例|
|-----------------|-------|-------|
|成分（印度）|活性成分|二甲雙胍 |
| Clinical Drug Form (CDF) | HC+劑型|二甲雙胍口服錠|
|臨床藥物（CD）| HC + 劑量 + 形式 |二甲雙胍 500 毫克片劑 |
|品牌藥 (BD) |商品名稱|格華止 500 毫克片劑 |
| Clinical Drug Comp (CDC) | HC + 劑量 |二甲雙胍 500 毫克 |
|品牌名稱 (BN) |商品名稱|噬菌體 |
|劑型 (DF) |劑型 |口服錠劑|

---

## 5. 域表

|專欄 |類型 |說明 |
|-----|--------|--------|
| `domain_id` | VARCHAR(20) | PK |
| `domain_name` | VARCHAR(255) |網域名稱|
| `domain_concept_id` |整數| FK → 概念 |

---

## 6. CONCEPT_CLASS table

|專欄 |類型 |說明 |
|-----|--------|--------|
| `concept_class_id` | VARCHAR(20) | PK |
| `concept_class_name` | VARCHAR(255) |班級名稱|
| `concept_class_concept_id` |整數| FK → 概念 |

---

## 7. concept_id = 0 — Special meaning

|概念 |意義|何時使用 |
|--------|---------|-------------|
|概念 ID = 0 | “沒有匹配的概念”|無法映射|
|概念名稱 | 「沒有符合的概念」| |
|域名 ID |空| |
|詞彙_id | “無”| |

```sql
-- Kiểm tra % records không map được
SELECT
    'condition_occurrence' AS table_name,
    COUNT(*) AS total_records,
    SUM(CASE WHEN condition_concept_id = 0 THEN 1 ELSE 0 END) AS unmapped,
    ROUND(SUM(CASE WHEN condition_concept_id = 0 THEN 1 ELSE 0 END) * 100.0
          / COUNT(*), 1) AS unmapped_pct
FROM condition_occurrence
UNION ALL
SELECT 'drug_exposure', COUNT(*),
    SUM(CASE WHEN drug_concept_id = 0 THEN 1 ELSE 0 END),
    ROUND(SUM(CASE WHEN drug_concept_id = 0 THEN 1 ELSE 0 END) * 100.0
          / COUNT(*), 1)
FROM drug_exposure
UNION ALL
SELECT 'measurement', COUNT(*),
    SUM(CASE WHEN measurement_concept_id = 0 THEN 1 ELSE 0 END),
    ROUND(SUM(CASE WHEN measurement_concept_id = 0 THEN 1 ELSE 0 END) * 100.0
          / COUNT(*), 1)
FROM measurement;
```

---

## 總結

1. **CONCEPT**：約1000萬筆記錄，每個醫學概念都有唯一的concept_id
2. **standard_concept**：S = 標準（主要使用），C = 分類，NULL = 來源
3. **domain_id**決定資料儲存在哪個CDM表中
4. **字彙**：70 多個字典來源（SNOMED、RxNorm、LOINC、ICD-10...）
5. **concept_id = 0**：「無法映射」－當 ETL 找不到標準概念時使用
6.查找：**athena.ohdsi.org**或直接查詢CONCEPT表

**下一篇：** CONCEPT_RELATIONSHIP 和 CONCEPT_ANCESTOR — 概念之間的關係和層次結構。

---

## 參考文獻

- [OMOP CDM 5.4 — CONCEPT](https://ohdsi.github.io/CommonDataModel/cdm54.html#CONCEPT)
- [OMOP CDM 5.4 — VOCABULARY](https://ohdsi.github.io/CommonDataModel/cdm54.html#VOCABULARY)
- [Athena](https://athena.ohdsi.org/)
- [Book of OHDSI — Chapter 5: Standardized Vocabularies](https://ohdsi.github.io/TheBookOfOhdsi/StandardizedVocabularies.html)
