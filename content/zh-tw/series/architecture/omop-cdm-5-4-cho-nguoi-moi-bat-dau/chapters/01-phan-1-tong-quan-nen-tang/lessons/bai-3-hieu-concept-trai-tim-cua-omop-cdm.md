---
id: 019f1a00-a103-7b01-e001-omopcdm54003
title: 第 3 課：理解概念 — OMOP CDM 的核心
slug: bai-3-hieu-concept-trai-tim-cua-omop-cdm
description: >-
  什麼是概念、標準概念、來源概念、分類概念、concept_id、source_value、source_concept_id、網域、詞彙、概念類別以及如何在
  Athena 上尋找。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 3
section_title: 第 1 部分：概述與背景
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: 初學者的 OMOP CDM 5.4 — 從頭到尾了解
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop03" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop03)"/>
  <g>
    <circle cx="659" cy="87" r="22" fill="#818cf8" opacity="0.12"/>
    <circle cx="718" cy="106" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="777" cy="125" r="36" fill="#818cf8" opacity="0.06"/>
    <circle cx="836" cy="144" r="13" fill="#818cf8" opacity="0.13"/>
    <circle cx="895" cy="163" r="20" fill="#818cf8" opacity="0.1"/>
    <line x1="600" y1="157" x2="1100" y2="237" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ 建築 — 第 3 課</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">理解概念 — 心</tspan>
    <tspan x="60" dy="42">OMOP CDM</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">初學者的 OMOP CDM 5.4 — 從頭到尾了解</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 1 部分：概述與背景</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![概念體系—來源、標準與分類](/storage/uploads/2026/04/omop-cdm-bai3-concept-system.webp)

## 簡介

如果 OMOP CDM 是一棟房子，那麼 **Concept** 就是磚塊 — 一切都是由 Concept 建造的。理解這個概念是理解整個CDM 的關鍵。

本文將說明：什麼是概念？標準與源概念有何不同？如何在 Athena 上尋找 Concept？還有“聖三一” `concept_id` / `source_value` / `source_concept_id` 它是如何運作的？

---

## 1.什麼是概念？

### 1.1。定義

**概念** = 獨特的醫學“概念”，由稱為 **concept_id** 的數字表示。

你在醫學中遇到的一切都有一個相應的概念：

|醫療實體 |概念 ID |概念名稱 |詞彙|
|----------|------------|--------------|------------|
|女性 | 8532 |女|性別 |
| 2 型糖尿病 | 201826 | 201826 2 型糖尿病 |斯諾梅德 |
|二甲雙胍 500 毫克錠 | 1503297 |二甲雙胍 500 MG 口服錠 | RxNorm |
| HbA1c 檢驗 | 3004410 |血液中糖化血紅素/血紅素總量 |洛因克 |
|百分比單位 | 8554 |百分比 | UCUM |
|門診檢查| 9202 | 9202門診 |訪問 |
|資料來自電子病歷 | 32817 | 32817電子病歷 |型概念|

### 1.2。概念表

每個概念在表中保存為一行 `CONCEPT`：

```sql
SELECT *
FROM concept
WHERE concept_id = 201826;
```

|專欄 |價值|說明 |
|-----|---------|--------|
| `concept_id` | 201826 | 201826唯一ID |
| `concept_name` | 2 型糖尿病 |顯示名稱 |
| `domain_id` |條件|屬於哪個域 |
| `vocabulary_id` |斯諾梅德 |哪個字彙單字 |
| `concept_class_id` |臨床結果|概念類型 |
| `standard_concept` | S | **S** = 標準 |
| `concept_code` | 44054006 |詞彙表原碼|
| `valid_start_date` | 1970-01-01 |生效開始日期 |
| `valid_end_date` | 2099-12-31 |有效期限 |
| `invalid_reason` |空 |無效原因 |

---

## 2. 標準概念 vs 源概念 vs 分類

### 2.1。三種類型的概念

```
  standard_concept column:
  ┌─────────────────────────────────────────────────────────────┐
  │                                                             │
  │  'S' = STANDARD CONCEPT                                    │
  │  → Dùng trong *_concept_id columns                          │
  │  → Là "đại diện chính thức" cho một khái niệm              │
  │  → VD: SNOMED 201826 "Type 2 diabetes mellitus"             │
  │                                                             │
  │  'C' = CLASSIFICATION CONCEPT                               │
  │  → Dùng để phân nhóm/phân cấp                              │
  │  → KHÔNG dùng trực tiếp trong clinical tables               │
  │  → VD: SNOMED parent concepts                               │
  │                                                             │
  │  NULL = NON-STANDARD (SOURCE) CONCEPT                       │
  │  → Mã từ vocabulary gốc                                     │
  │  → Lưu trong *_source_concept_id columns                    │
  │  → VD: ICD-10 E11 "Type 2 diabetes mellitus"               │
  │                                                             │
  └─────────────────────────────────────────────────────────────┘
```

### 2.2。具體範例：“2型糖尿病”

```
  ICD-10-CM 'E11'                         SNOMED 44054006
  ┌──────────────────────┐    Maps to     ┌──────────────────────────┐
  │ concept_id = 443238  │ ──────────→    │ concept_id = 201826      │
  │ standard_concept=NULL│                │ standard_concept = 'S'    │
  │ vocabulary=ICD10CM   │                │ vocabulary = SNOMED       │
  │ (Source Concept)     │                │ (Standard Concept)        │
  └──────────────────────┘                └──────────────────────────┘

  Trong bảng CONDITION_OCCURRENCE:
  ┌────────────────────────────────────────────────────────────────────┐
  │ condition_concept_id        = 201826    ← Standard (SNOMED)       │
  │ condition_source_value      = 'E11'     ← Text gốc từ HIS        │
  │ condition_source_concept_id = 443238    ← Source Concept (ICD-10) │
  └────────────────────────────────────────────────────────────────────┘
```

### 2.3。神聖的三位一體

大多數臨床表的每個概念欄位都有 3 列：

|專欄 |目的|價值|
|-----|---------|---------|
| `*_concept_id` | **分析** — 標準概念 |標準概念 ID (S) |
| `*_source_value` | **Trace** — 原始文字值 |原文（例如：「E11」、「格華止」）|
| `*_source_concept_id` | **反向映射** — 原始概念|非標準概念ID |

```
  ┌── Dùng để phân tích (SELECT, GROUP BY, JOIN)
  │
  condition_concept_id = 201826  ← Standard SNOMED
                                                    ├── Truy nguyên nguồn gốc
  condition_source_value = 'E11'  ← Text gốc HIS   │
  condition_source_concept_id = 443238  ← ICD-10 ───┘
```

---

## 3. 域－Concept 屬於哪個表？

### 3.1。主要領域

|網域名稱 |目的地表|範例|
|--------|------------|--------|
|條件| CONDITION_OCCURRENCE | 條件發生糖尿病、肺炎|
|藥品 |藥物暴露 |二甲雙胍、阿莫西林|
|程序 | PROCEDURE_OCCURRENCE | 過程發生內視鏡、手術 |
|測量|測量| HbA1c、血壓、BMI |
|觀察|觀察|吸煙、家族史|
|設備|設備曝光 |支架、心律調節器 |
|標本|樣本|血液樣本、組織樣本 |
|訪問 |訪問發生次數 |門診檢查、住院|
|性別 |人物 |男、女|
|比賽|人物 |亞洲人、白人 |
|類型概念|所有表格 | EHR、索賠、實驗室 |
|單位|測量|毫克/分升、%、毫米汞柱 |
|路線 |藥物暴露 |口服、靜脈注射、外用 |

### 3.2。為什麼域名很重要？

域決定**記錄位於哪個表**。以下是核心 ETL 規則：

```
  Dữ liệu nguồn: "ICD-10: Z87.891 — History of nicotine dependence"
  
  Bước 1: Tra cứu ICD-10 Z87.891 trên Athena
  Bước 2: Tìm Standard Concept → maps to SNOMED concept
  Bước 3: Standard Concept thuộc domain "Observation"
  Bước 4: Lưu vào bảng OBSERVATION (không phải CONDITION!)
  
  ⚠️ Dù ICD-10 thường gắn với Condition domain,
  nhưng "History of" map sang Observation domain
```

---

## 4. 詞彙——概念起源

### 4.1。重要詞彙

```
  ┌──────────────────────────────────────────────────────────────────┐
  │  VOCABULARY CHÍNH TRONG OMOP CDM                                 │
  │                                                                   │
  │  ┌─────────────┐   Conditions (diagnoses, symptoms)              │
  │  │  SNOMED CT  │   → Standard vocabulary cho Condition domain     │
  │  └─────────────┘                                                  │
  │                                                                   │
  │  ┌─────────────┐   Drugs (medications, vaccines)                  │
  │  │  RxNorm     │   → Standard vocabulary cho Drug domain          │
  │  └─────────────┘                                                  │
  │                                                                   │
  │  ┌─────────────┐   Measurements (lab tests, vitals)              │
  │  │   LOINC     │   → Standard vocabulary cho Measurement domain  │
  │  └─────────────┘                                                  │
  │                                                                   │
  │  ┌─────────────┐   Procedures                                     │
  │  │  SNOMED CT  │   → Standard vocabulary cho Procedure domain     │
  │  │  CPT4       │   → US-specific procedures                       │
  │  └─────────────┘                                                  │
  │                                                                   │
  │  SOURCE VOCABULARIES (Non-standard, cần mapping):                 │
  │  ICD-10-CM/VN, ICD-9-CM, NDC, HCPCS, ATC, Read, MedDRA         │
  └──────────────────────────────────────────────────────────────────┘
```

### 4.2。標準詞彙與非標準詞彙

|類型 |範例|標準概念 |用於專欄 |
|--------|--------|--------|-------------|
| **標準** | SNOMED CT、RxNorm、LOINC | 'S'| `*_concept_id` |
| **非標** | ICD-10、NDC、ATC、MedDRA |空| `*_source_concept_id` |
| **分類** | SNOMED 層次結構節點 | 'C'|用於分層查詢 |

### 4.3。測繪流程

```
  HIS: "E11" (ICD-10)
       │
       │  Tra bảng CONCEPT_RELATIONSHIP
       │  relationship_id = 'Maps to'
       ↓
  Source Concept: 443238 (ICD-10 E11)
       │
       │  Maps to
       ↓
  Standard Concept: 201826 (SNOMED Type 2 diabetes mellitus)
```

SQL 尋找映射：

```sql
-- Tìm Standard Concept từ ICD-10 code 'E11'
SELECT
    c1.concept_id   AS source_concept_id,
    c1.concept_name AS source_name,
    c1.vocabulary_id AS source_vocab,
    c2.concept_id   AS standard_concept_id,
    c2.concept_name AS standard_name,
    c2.vocabulary_id AS standard_vocab
FROM concept c1
JOIN concept_relationship cr
    ON c1.concept_id = cr.concept_id_1
    AND cr.relationship_id = 'Maps to'
JOIN concept c2
    ON cr.concept_id_2 = c2.concept_id
    AND c2.standard_concept = 'S'
WHERE c1.concept_code = 'E11'
  AND c1.vocabulary_id = 'ICD10CM';
```

---

## 5.概念類別－詳細分類

每個概念都屬於一個 **概念類**，該類指示它屬於哪個層次的詞彙：

|網域 |概念課 |範例|
|--------|----------------|--------|
|條件|臨床結果| 2 型糖尿病 |
|藥品 | **成分** |二甲雙胍 |
|藥品 | **臨床藥物** |二甲雙胍 500 MG 口服錠劑 |
|藥品 | **品牌藥** | Glucophage 500 MG 口服藥錠 |
|測量|實驗室檢驗|糖化血紅素 |
|測量|臨床觀察|體重|
|程序 |程序 |冠狀動脈繞道手術|
|觀察|情境相關 |臨床發現的歷史|

### 藥物概念課 — 特別重要

RxNorm 依等級組織藥物：

```
  INGREDIENT (hoạt chất)
  └── Metformin (concept_id = 1503297)
       │
       ├── CLINICAL DRUG FORM
       │   └── Metformin Oral Tablet
       │        │
       │        ├── CLINICAL DRUG (hoạt chất + liều + dạng)
       │        │   └── Metformin 500 MG Oral Tablet
       │        │        │
       │        │        └── BRANDED DRUG (tên thương mại)
       │        │            └── Glucophage 500 MG Oral Tablet
       │        │
       │        └── CLINICAL DRUG
       │            └── Metformin 1000 MG Oral Tablet
       │
       └── CLINICAL DRUG FORM
           └── Metformin Extended Release Oral Tablet
```

---

## 6. 在 Athena 上尋找 Concept

### 6.1。雅典娜是什麼？

**雅典娜** (https://athena.ohdsi.org/）是一個免費的網路工具，用於查找標準化詞彙。

### 6.2。搜尋說明

**第 1 步：** 訪問 https://athena.ohdsi.org/ （需建立免費帳戶）

**第 2 步：** 輸入關鍵字，例如“糖尿病 2 型”

**第 3 步：** 過濾結果：
- **標準概念：** 選擇「標準」僅查看標準概念
- **領域：** 如果搜尋疾病，請選擇“條件”
- **詞彙：** 選擇“SNOMED”或“ICD10CM”

**第 4 步：** 查看概念詳細資訊：
- 概念 ID、名稱、類別、領域、詞彙
- **關係**選項卡：請參閱“映射到”、“是”、“有組件”
- **層次結構**選項卡：請參閱父/子概念

### 6.3。流行的查找範例

```
  Tìm bệnh tiểu đường type 2:
  → Search: "type 2 diabetes"
  → Filter: Domain=Condition, Standard=Standard
  → Kết quả: concept_id=201826, SNOMED "Type 2 diabetes mellitus"

  Tìm thuốc Metformin:
  → Search: "metformin"
  → Filter: Domain=Drug, Concept Class=Ingredient
  → Kết quả: concept_id=1503297, RxNorm "metformin"

  Tìm xét nghiệm HbA1c:
  → Search: "hemoglobin a1c"
  → Filter: Domain=Measurement, Standard=Standard
  → Kết quả: concept_id=3004410, LOINC "Hemoglobin A1c/Hemoglobin.total"
```

---

## 7.concept_id = 0 — 當無法映射時

當來源資料無法對應到標準概念時：

```sql
-- Một mã thuốc nội bộ bệnh viện không có trong RxNorm
drug_concept_id        = 0              -- Không map được!
drug_source_value      = 'THUOC_BV_001' -- Vẫn giữ mã gốc
drug_source_concept_id = 0              -- Cũng không có source concept
```

**這是完全有效的。 ** OMOP CDM 允許這樣做 `concept_id = 0`，但目標是透過以下方式**最小化**concept_id = 0 的記錄數量：

1. 使用 **SOURCE_TO_CONCEPT_MAP** 進行自訂映射
2.使用**Usagi**工具進行半自動建圖
3. 要求社群在詞彙表中加入新概念

---

## 8. 練習：讀取 CDM 記錄

對於以下記錄 `CONDITION_OCCURRENCE`：

```sql
condition_occurrence_id    = 50001
person_id                  = 12345
condition_concept_id       = 201826
condition_start_date       = '2024-06-10'
condition_start_datetime   = '2024-06-10 09:30:00'
condition_end_date         = NULL
condition_end_datetime     = NULL
condition_type_concept_id  = 32817
condition_status_concept_id = 32902
provider_id                = 5001
visit_occurrence_id        = V001
condition_source_value     = 'E11'
condition_source_concept_id = 443238
condition_status_source_value = 'admitting'
```

**解碼：**

|學校 |價值|意義|
|--------|--------|--------|
|條件概念 ID = 201826 | SNOMED「2 型糖尿病」|標準診斷|
|條件類型概念 ID = 32817 | “電子病歷”|來自 EMR 系統的資料 |
|條件狀態概念 ID = 32902 | “初步診斷”|初步診斷 |
|條件來源值 = 'E11' | ICD-10-CM原碼|原始碼來自HIS |
|條件源概念 ID = 443238 | “E11”的 ICD-10-CM 概念 |原始概念|
|提供者 ID = 5001 |診斷醫生|查找表提供者|
|訪問事件 ID = V001 |門診 |查找表 VISIT_OCCURRENCE |

---

## 總結

在本文中，您了解了：

1. **概念**=醫學概念，由唯一的concept_id表示
2. **3種概念**：標準（S）、分類（C）、來源（NULL）
3. **三列**： `*_concept_id` / `*_source_value` / `*_source_concept_id`
4. **Domain**決定要記錄在哪個表中
5. **詞彙**：SNOMED（條件）、RxNorm（藥物）、LOINC（測量）
6. **概念類別**：詳細分類（成分與臨床藥物...）
7. **Athena**：免費概念查找工具
8. **concept_id = 0**：當地圖不可能時有效

**下一篇文章：** 我們將從探索第一個表格 — **PERSON** — 儲存病患人口統計資料的地方開始。

---

## 參考文獻

- [Athena — OHDSI Vocabulary Search](https://athena.ohdsi.org/)
- [The Book of OHDSI — Chapter 5: Standardized Vocabularies](https://ohdsi.github.io/TheBookOfOhdsi/StandardizedVocabularies.html)
- [OMOP CDM Wiki — Concept](https://ohdsi.github.io/CommonDataModel/cdm54.html#CONCEPT)
