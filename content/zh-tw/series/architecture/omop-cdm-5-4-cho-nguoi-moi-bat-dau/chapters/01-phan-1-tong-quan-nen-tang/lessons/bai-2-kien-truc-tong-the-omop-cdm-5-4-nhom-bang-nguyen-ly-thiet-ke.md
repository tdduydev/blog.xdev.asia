---
id: 019f1a00-a102-7b01-e001-omopcdm54002
title: 第 2 課：OMOP CDM 5.4 的整體架構 — 表組與設計原則
slug: bai-2-kien-truc-tong-the-omop-cdm-5-4-nhom-bang-nguyen-ly-thiet-ke
description: >-
  OMOP CDM 5.4 中 37 個表格、6
  個主要表格組（臨床資料、健康系統、健康經濟學、標準化詞彙、衍生元素、元資料）、以人為中心的模型和核心設計原則的概述。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 2
section_title: 第 1 部分：概述與背景
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: 初學者的 OMOP CDM 5.4 — 從頭到尾了解
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop02" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop02)"/>
  <g>
    <circle cx="659" cy="87" r="22" fill="#818cf8" opacity="0.12"/>
    <circle cx="718" cy="106" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="777" cy="125" r="36" fill="#818cf8" opacity="0.06"/>
    <circle cx="836" cy="144" r="13" fill="#818cf8" opacity="0.13"/>
    <circle cx="895" cy="163" r="20" fill="#818cf8" opacity="0.1"/>
    <line x1="600" y1="157" x2="1100" y2="237" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="187" x2="1050" y2="257" stroke="#818cf8" stroke-width="0.5" opacity="0.08"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ 建築 — 第 2 課</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">OMOP CDM 5.4總體架構</tspan>
    <tspan x="60" dy="42">表組及設計原則</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">初學者的 OMOP CDM 5.4 — 從頭到尾了解</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 1 部分：概述與背景</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![6 OMOP CDM 5.4 表組的架構圍繞著 PERSON](/storage/uploads/2026/04/omop-cdm-bai2-architecture-6-groups.webp)

## 簡介

在上一篇文章中，您了解了**為什麼**需要 OMOP CDM。本文將回答以下問題：**CDM 5.4 是什麼樣子？ ** — 37 個表是如何組織的、按什麼組以及根據什麼設計原則組織的。

在深入研究下一篇文章中的每個表格之前，您將對整個 CDM 有一個「鳥瞰圖」。

---

## 1. 6個表組概述

OMOP CDM 5.4 包括 **37 個表格**，分為 **6 組**（組）：

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        OMOP CDM 5.4 — 37 Tables                        │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  1. CLINICAL DATA (16 bảng)                                     │    │
│  │  person, observation_period, visit_occurrence, visit_detail,     │    │
│  │  condition_occurrence, drug_exposure, procedure_occurrence,      │    │
│  │  device_exposure, measurement, observation, death, note,         │    │
│  │  note_nlp, specimen, fact_relationship, episode, episode_event   │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                         │
│  ┌──────────────────────────┐  ┌──────────────────────────────────┐    │
│  │  2. HEALTH SYSTEM (3)    │  │  3. HEALTH ECONOMICS (2)         │    │
│  │  location, care_site,    │  │  payer_plan_period, cost          │    │
│  │  provider                │  │                                   │    │
│  └──────────────────────────┘  └──────────────────────────────────┘    │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  4. STANDARDIZED VOCABULARIES (12 bảng)                          │   │
│  │  concept, vocabulary, domain, concept_class, concept_relationship,│   │
│  │  relationship, concept_synonym, concept_ancestor,                 │   │
│  │  source_to_concept_map, drug_strength, cohort, cohort_definition │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────┐   ┌───────────────────────────────────┐   │
│  │  5. DERIVED ELEMENTS (3) │   │  6. METADATA (2)                  │   │
│  │  drug_era, dose_era,     │   │  cdm_source, metadata              │   │
│  │  condition_era           │   │                                    │   │
│  └─────────────────────────┘   └───────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.1。臨床數據表（16表）

這是**最大和最重要的**組 - 包含所有臨床數據。

|表|簡短描述 |課程 |
|--------|-------------|--------|
| `person` | 病患人口統計資料 |第 4 課 |
| `observation_period` |追蹤間隔|第 5 課 |
| `visit_occurrence` |就診/住院 |第 6 課 |
| `visit_detail` |詳細參觀 |第 6 課 |
| `condition_occurrence` |診斷、病理|第 7 課 |
| `drug_exposure` |藥品、處方、疫苗 |第 8 課 |
| `procedure_occurrence` |程序，手術|第 9 課 |
| `measurement` |測驗、生命徵象 |第 10 課 |
| `observation` |臨床觀察、病史 |第 11 課 |
| `device_exposure` |醫療器材|第 12 課 |
| `specimen` |病人樣本|第 12 課 |
| `note` |文字註釋|第 12 課 |
| `note_nlp` | NLP 結果來自筆記 |第 12 課 |
| `death` |死亡訊息|第 13 課 |
| `episode` |疾病階段（新 CDM 5.4） |第 13 課 |
| `episode_event` |連結事件-情節（新 CDM 5.4）|第 13 課 |

### 1.2。衛生系統資料表（3表）

|表|描述 |
|--------|--------|
| `location` |位置（位址、座標）|
| `care_site` |醫療機構（醫院、診所）|
| `provider` |醫護人員（醫生、護士）|

### 1.3。衛生經濟學資料表（2表）

|表|描述 |
|--------|--------|
| `payer_plan_period` |一段時間內的健康保險資訊 |
| `cost` |與每個臨床事件相關的成本|

### 1.4。標準化詞彙（12板）

|表|描述 |
|--------|--------|
| `concept` |中央表 — 包含 >1000 萬個概念 |
| `vocabulary` |詞彙來源列表（SNOMED、ICD-10...）|
| `domain` |領域（病情、藥物、程序...） |
| `concept_class` |概念分類（臨床發現、成分...） |
| `concept_relationship` |概念之間的關係|
| `relationship` |關係類型的定義 |
| `concept_synonym` |概念的另一個名稱|
| `concept_ancestor` |概念的層次譜系|
| `source_to_concept_map` |映射原始碼→標準概念|
| `drug_strength` |藥物含量及濃度|
| `cohort` |根據標準的病人名單|
| `cohort_definition` |隊列標準的定義|

### 1.5。派生元素（3 個表）

|表|描述 |
|--------|--------|
| `drug_era` |依成分順序將藥物暴露分組 |
| `dose_era` |以穩定劑量使用藥物的階段|
| `condition_era` |將連續條件組合成時代|

### 1.6。元資料（2 個表）

|表|描述 |
|--------|--------|
| `cdm_source` |資料來源信息，CDM版本|
| `metadata` |可選的附加元資料 |

---

## 2. 核心設計原則

### 2.1。以人為本（以病人為中心）

所有臨床表都透過密鑰**連結回人員** `person_id`：

```
                           ┌─────────────────────┐
                           │      PERSON          │
                           │  person_id (PK)      │
                           │  gender_concept_id   │
                           │  year_of_birth       │
                           └──────────┬──────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              │                       │                       │
   ┌──────────┴──────────┐  ┌────────┴────────┐  ┌──────────┴──────────┐
   │ OBSERVATION_PERIOD   │  │ VISIT_OCCURRENCE │  │ CONDITION_OCCURRENCE│
   │ person_id (FK)       │  │ person_id (FK)   │  │ person_id (FK)     │
   └─────────────────────┘  └──────┬──────────┘  └────────────────────┘
                                    │
              ┌────────────────────┼────────────────────┐
              │                    │                     │
   ┌──────────┴──────┐  ┌────────┴────────┐  ┌────────┴────────┐
   │ DRUG_EXPOSURE    │  │ PROCEDURE_OCC.  │  │ MEASUREMENT     │
   │ person_id (FK)   │  │ person_id (FK)  │  │ person_id (FK)  │
   │ visit_occ_id(FK) │  │ visit_occ_id(FK)│  │ visit_occ_id(FK)│
   └─────────────────┘  └────────────────┘  └────────────────┘
```

**規則：** 若無法連接資料線 `person_id`，它**不包含在臨床表中**。

### 2.2。基於事件

每個醫療事件都會在相應的表中建立**單獨的記錄**：

```
Ngày 10/06: Khám ngoại trú → 1 record trong VISIT_OCCURRENCE
  ├── Chẩn đoán tiểu đường  → 1 record trong CONDITION_OCCURRENCE
  ├── Chẩn đoán tăng HA      → 1 record trong CONDITION_OCCURRENCE
  ├── Kê Metformin 500mg      → 1 record trong DRUG_EXPOSURE
  ├── Kê Amlodipine 5mg       → 1 record trong DRUG_EXPOSURE
  ├── XN HbA1c = 7.8%         → 1 record trong MEASUREMENT
  └── XN Creatinine = 1.1     → 1 record trong MEASUREMENT
```

### 2.3。概念驅動（基於標準概念）

每個臨床值都使用標準化詞彙中的 Concept_id** 進行編碼：

```
  Cột trong bảng CDM              Concept                    Vocabulary
  ─────────────────────────────────────────────────────────────────────
  gender_concept_id = 8532     →  "Female"                   [Gender]
  condition_concept_id = 201826 → "Type 2 diabetes mellitus" [SNOMED CT]
  drug_concept_id = 1503297    → "Metformin 500 MG Oral Tab" [RxNorm]
  measurement_concept_id = 3004410 → "Hemoglobin A1c"        [LOINC]
  unit_concept_id = 8554       → "percent (%)"               [UCUM]
```

### 2.4。來源值保留（保留原始值）

除了標準概念之外，OMOP CDM **始終保留原始值**：

```sql
-- Ví dụ: Bảng CONDITION_OCCURRENCE
condition_concept_id    = 201826        -- Standard Concept (SNOMED)
condition_source_value  = 'E11'         -- Mã gốc ICD-10 từ HIS
condition_source_concept_id = 443238    -- Concept ID của ICD-10 'E11'
```

每個概念欄位的 3 列模型：

|專欄 | 說明 |必填 |
|-----|--------|----------|
| `*_concept_id` |標準概念ID（SNOMED、RxNorm...）| ✅ |
| `*_source_value` |原始值作為文字 |沒有 |
| `*_source_concept_id` |原始概念 ID（如果出現在詞彙表中）|沒有 |

### 2.5。基於域的路由

每個概念都屬於一個**域**，域決定記錄位於哪個**表**：

```
  Concept "Type 2 diabetes"
    → Domain = "Condition"
    → Lưu vào CONDITION_OCCURRENCE

  Concept "Metformin 500mg"
    → Domain = "Drug"
    → Lưu vào DRUG_EXPOSURE

  Concept "Hemoglobin A1c"
    → Domain = "Measurement"
    → Lưu vào MEASUREMENT

  Concept "Smoking status"
    → Domain = "Observation"
    → Lưu vào OBSERVATION
```

> **重要說明：** 有時原始碼位於一個域中，但標準概念位於另一個域中。例如：ICD-10 代碼 `Z87.891` （尼古丁依賴史）屬於條件但標準概念圖到觀察域→保存到表 `OBSERVATION`，這不是 `CONDITION_OCCURRENCE`。

---

## 3. 一般實體關係圖

```
┌──────────────────────────────────────────────────────────────────────────┐
│                           HEALTH SYSTEM                                  │
│                                                                          │
│  ┌──────────┐    ┌──────────────┐    ┌──────────────┐                   │
│  │ LOCATION │←───│  CARE_SITE   │───→│   PROVIDER   │                   │
│  │          │    │              │    │              │                   │
│  └────┬─────┘    └──────────────┘    └──────┬───────┘                   │
│       │                                      │                          │
└───────┼──────────────────────────────────────┼──────────────────────────┘
        │                                      │
        ↓                                      ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                           CLINICAL DATA                                  │
│                                                                          │
│  ┌───────────┐       ┌───────────────────┐                              │
│  │  PERSON   │←──────│ OBSERVATION_PERIOD│                              │
│  │           │       └───────────────────┘                              │
│  └─────┬─────┘                                                          │
│        │                                                                 │
│        ├──→ VISIT_OCCURRENCE ──→ VISIT_DETAIL                           │
│        │       │                                                         │
│        │       ├──→ CONDITION_OCCURRENCE                                 │
│        │       ├──→ DRUG_EXPOSURE                                        │
│        │       ├──→ PROCEDURE_OCCURRENCE                                 │
│        │       ├──→ MEASUREMENT                                          │
│        │       ├──→ OBSERVATION                                          │
│        │       ├──→ DEVICE_EXPOSURE                                      │
│        │       ├──→ NOTE ──→ NOTE_NLP                                   │
│        │       └──→ SPECIMEN                                             │
│        │                                                                 │
│        ├──→ DEATH                                                        │
│        ├──→ EPISODE ──→ EPISODE_EVENT                                   │
│        └──→ FACT_RELATIONSHIP                                           │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
        │
        ↓
┌─────────────────────────────────────────────────────────────────────────┐
│  HEALTH ECONOMICS                                                        │
│  PAYER_PLAN_PERIOD ←── PERSON                                           │
│  COST ←── (bất kỳ clinical event nào)                                   │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  DERIVED ELEMENTS                                                        │
│  DRUG_ERA, DOSE_ERA, CONDITION_ERA ←── tính toán từ clinical data       │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  STANDARDIZED VOCABULARIES                                               │
│  CONCEPT ←→ CONCEPT_RELATIONSHIP ←→ CONCEPT_ANCESTOR                   │
│  VOCABULARY, DOMAIN, CONCEPT_CLASS, RELATIONSHIP                        │
│  SOURCE_TO_CONCEPT_MAP, DRUG_STRENGTH, CONCEPT_SYNONYM                 │
│  COHORT, COHORT_DEFINITION                                              │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  METADATA: CDM_SOURCE, METADATA                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4. CDM 5.4 中的重要約定

### 4.1。常見字段

大多數臨床表具有以下字段：

|學校 |類型 |描述 |
|--------|--------|--------|
| `*_id` （PK）|整數|主鍵，唯一 |
| `person_id` (FK) |整數|連結到人|
| `*_concept_id` |整數|標準概念 ID |
| `*_date` |日期 |活動日期 |
| `*_datetime` |日期時間 |活動日期和時間（如果有）|
| `*_type_concept_id` |整數|資料來源（EHR、索賠、自我報告...）|
| `*_source_value` | VARCHAR(50) |來自來源系統的原始值 |
| `*_source_concept_id` |整數|原創ID概念|
| `visit_occurrence_id` (FK) |整數|連結至 VISIT_OCCURRENCE |
| `provider_id` (FK) |整數|醫生/工作人員|

### 4.2。概念ID約定

|價值|意義|
|--------|--------|
| `0` |無法映射（沒有匹配的概念）|
| `> 0` |概念在 CONCEPT | 中有效。表
| `NULL` |不適用或無可用資訊 |

### 4.3。日期/日期時間約定

- `*_date` （日期）：**必填** — 活動日期
- `*_datetime` （日期時間）：**可選** — 如果沒有時間，請設定 `*_datetime = *_date + 00:00:00`
- 結束日期：如果活動為 1 天， `end_date = start_date`

### 4.4。類型概念約定

`*_type_concept_id` 指示記錄的**來源**：

|型別概念 ID |意義|
|----------------|---------|
| 32817 | 32817 EHR（電子健康紀錄）|
| 32810 |索賠（保險）|
| 32856 |實驗室測試（測試）|
| 32883 |調查（調查）|
| 32865 | 32865患者自我報告|

---

## 5. CDM 5.4 — 與 5.3 相比的新點

|改 |詳情 |
|----------|----------|
| **劇集表** |記錄疾病發作（例如：癌症治療線 1、2、3）|
| **EPISODE_EVENT 表** |將臨床事件與發作相關聯 |
| **測量_事件_id** |允許測量連結到原始事件（例如：來自哪個樣本的測量）|
| **觀察_事件_id** |觀察也是如此
| **生產_id** (DEVICE_EXPOSURE) |唯一設備識別碼 (UDI) |
| **數量** (DEVICE_EXPOSURE) |設備數量 |

---

## 6. 從哪裡開始？

閱讀本系列的路線圖：

```
Bài 1-3: Nền tảng (bạn đang ở đây)
    ↓
Bài 4-6: PERSON → OBSERVATION_PERIOD → VISIT
    ↓        (xây nền móng)
Bài 7-10: CONDITION → DRUG → PROCEDURE → MEASUREMENT
    ↓        (sự kiện lâm sàng chính)
Bài 11-13: OBSERVATION → DEVICE/NOTE/SPECIMEN → DEATH/EPISODE
    ↓        (bảng mở rộng)
Bài 14-16: Vocabulary system
    ↓        (hiểu concept sâu hơn)
Bài 17-19: Health System, Economics, Era tables
    ↓        (hạ tầng & tổng hợp)
Bài 20: Tổng kết & bước tiếp theo
```

---

## 總結

在本文中，您了解了：

1. **OMOP CDM 5.4 中有 37 個表格**，分為 **6 組**
2. **5個設計原則**：以人為中心、基於事件、概念驅動、來源保存、網域路由
3. **通用 ER 圖** — 面板如何互連
4. **通用約定**——通用欄位、概念ID規則、日期/日期時間、類型概念
5. **新CDM 5.4** — EPISODE、事件聯動、設備跟踪

**下一篇文章：** 我們將深入探討 **概念** — OMOP CDM 的核心 — 了解標準與源概念、領域、詞彙以及如何在 Athena 上查找。

---

## 參考文獻

- [OMOP CDM 5.4 Specification](https://ohdsi.github.io/CommonDataModel/cdm54.html)
- [CDM 5.4 Changes](https://ohdsi.github.io/CommonDataModel/cdm54Changes.html)
- [The Book of OHDSI — Chapter 4: The Common Data Model](https://ohdsi.github.io/TheBookOfOhdsi/CommonDataModel.html)
