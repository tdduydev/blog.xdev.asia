---
id: 019f1a00-a101-7b01-e001-omopcdm54001
title: 第 1 課：什麼是 OMOP CDM？ — 為什麼需要標準化醫療數據？
slug: bai-1-omop-cdm-la-gi-tai-sao-can-chuan-hoa-du-lieu-y-te
description: 介紹 OMOP 通用資料模型、從 OMOP 計畫到 OHDSI 社群的歷史、醫療資料碎片化的問題以及資料標準化在臨床研究中的重要性。
duration_minutes: 45
is_free: true
video_url: null
sort_order: 1
section_title: 第 1 部分：概述與背景
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: 初學者的 OMOP CDM 5.4 — 從頭到尾了解
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop01" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop01)"/>
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ 建築 — 第 1 課</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">什麼是 OMOP CDM？ ——為什麼有必要？</tspan>
    <tspan x="60" dy="42">標準化醫療數據</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">初學者的 OMOP CDM 5.4 — 從頭到尾了解</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 1 部分：概述與背景</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![醫療資料片段化問題及OMOP CDM標準化解決方案](/storage/uploads/2026/04/omop-cdm-bai1-data-fragmentation.webp)

## 簡介

您有沒有想過：為什麼A醫院和B醫院雖然治療的是同一種疾病，卻無法進行數據比較？為什麼在許多國家研究藥物對 1000 萬患者的有效性如此困難？

答案在於**醫療數據的碎片化**。 **OMOP CDM** 就是解決方案。

---

## 1. 問題：醫療資料碎片化

### 1.1。每個型號一個系統

每家醫院使用不同的管理軟體（HIS/EMR），以自己的結構儲存資料：

```
┌─────────────────────────────────────────────────────────────────┐
│  Bệnh viện Chợ Rẫy (HIS)                                       │
│  ├── BENHNHAN (ma_bn, ho_ten, ngay_sinh, gioi_tinh)           │
│  ├── KHAMBENH (ma_kham, ma_bn, ngay_kham, bac_si)             │
│  ├── CHANDOAN (ma_cd, icd10_code, loai_chandoan)              │
│  └── DONTHUOC (ma_don, ten_thuoc, ham_luong, so_luong)        │
├─────────────────────────────────────────────────────────────────┤
│  Bệnh viện Bạch Mai (EMR)                                       │
│  ├── patients (patient_id, full_name, dob, sex)                │
│  ├── encounters (enc_id, patient_id, visit_date, physician)    │
│  ├── diagnoses (dx_id, icd_code, dx_type, priority)            │
│  └── medications (med_id, drug_name, dosage, quantity)          │
├─────────────────────────────────────────────────────────────────┤
│  BHXH Việt Nam                                                    │
│  ├── HO_SO_KCB (ma_hs, ma_the, noi_kcb)                       │
│  ├── CHI_TIET_BENH (ma_benh, ten_benh)                         │
│  └── CHI_TIET_THUOC (ma_thuoc, ten_thuoc, don_gia)            │
└─────────────────────────────────────────────────────────────────┘
```

雖然「患者」、「診斷」、「藥物」儲存在一起——但是：
- **表名稱**不同（`BENHNHAN` 與 `patients` 與 `HO_SO_KCB`）
- **列名稱**不同（`gioi_tinh` 與 `sex` 與沒有）
- **疾病代碼**可以使用ICD-10-VN、ICD-10-CM或內部代碼
- **藥物代碼**採用商品名（Augmentin）而非活性成分（阿莫西林/克拉維酸）
- **格式**不同（日期 dd/mm/yyyy 與 yyyy-mm-dd）

### 1.2。後果

|問題 |描述 |
|--------|--------|
| **無法合成** |整合 3 家醫院的資料耗時數月 |
| **無法比較** |糖尿病併發症發生率：因定義不同而不同|
| **研究緩慢** |多中心研究僅資料部分就耗時1-2年 |
| **AI/ML 很難實作** |資料 BV A 上的訓練模型無法在 BV B 上運作 |
| **疾病監測** |無法全國即時監控|

---

## 2. 解決方案：OMOP 通用資料模型

### 2.1。什麼是 OMOP CDM？

**OMOP CDM**（觀察性醫療結果合作夥伴通用資料模型）是一個開放標準，定義了觀察性健康資料的組織和儲存方式。

簡而言之：OMOP CDM 是任何醫療資料來源都可以轉換為的**統一資料庫藍圖**。

```
                    ETL (Extract-Transform-Load)
                    
  HIS Bệnh viện A ──────┐
                         │
  EMR Bệnh viện B ──────┤     ┌───────────────────────┐
                         ├────→│   OMOP CDM Database    │────→ Phân tích thống nhất
  BHXH Data ─────────────┤     │   (PostgreSQL/SQL)     │────→ Nghiên cứu đa trung tâm
                         │     └───────────────────────┘────→ AI/ML
  Phòng khám tư ─────────┘
```

### 2.2。主要特點

|特點|描述 |
|----------|------|
| **以人為本** |患者周圍的所有數據（`PERSON` 表）|
| **基於事件** |每個醫療事件都是單獨的記錄（檢查、測試、處方）|
| **標準化字彙** |使用標準字典取代內碼 |
| **開源** |免費、開源、社群開發 |
| **關係模型** |使用標準 RDBMS（PostgreSQL、SQL Server、Oracle）|

### 2.3。視覺範例

一名 45 歲女性患者在 Cho Ray 醫院接受檢查，被診斷出患有第 2 型糖尿病，並開了二甲雙胍治療：

**之前（原始 HIS）：**
```sql
BENHNHAN: ma_bn=12345, ho_ten='Nguyễn Thị Lan', ngay_sinh='1980-03-15', gioi_tinh='Nu'
KHAMBENH: ma_kham=K001, ngay_kham='2024-06-10', bac_si='BS. Trần Văn A'
CHANDOAN: icd10='E11', loai='chinh', ten='Đái tháo đường type 2'
DONTHUOC: ten_thuoc='Glucophage 500mg', so_luong=60, lieu='2 viên/ngày'
```

**之後（OMOP CDM 5.4）：**
```sql
PERSON:       person_id=12345, gender_concept_id=8532 (Female),
              year_of_birth=1980, month_of_birth=3, day_of_birth=15

VISIT_OCCURRENCE: visit_id=V001, person_id=12345,
              visit_concept_id=9202 (Outpatient Visit),
              visit_start_date='2024-06-10'

CONDITION_OCCURRENCE: person_id=12345, visit_id=V001,
              condition_concept_id=201826 (Type 2 diabetes mellitus),
              -- [SNOMED CT concept]
              condition_source_value='E11'

DRUG_EXPOSURE: person_id=12345, visit_id=V001,
              drug_concept_id=1503297 (Metformin 500 MG Oral Tablet),
              -- [RxNorm concept]
              quantity=60, days_supply=30,
              drug_source_value='Glucophage 500mg'
```

**重要區別：**
- `gioi_tinh='Nu'` → `gender_concept_id=8532` （國際標準概念）
- `icd10='E11'` → `condition_concept_id=201826` （SNOMED CT，保留 source_value='E11'）
- `Glucophage 500mg` → `drug_concept_id=1503297` （RxNorm成分+劑量，保留source_value）

---

## 3.歷史誕生

### 3.1。 OMOP計畫（2008-2013）

```
2008 ─── FDA khởi xướng dự án OMOP (Observational Medical Outcomes Partnership)
  │      Mục tiêu: nghiên cứu an toàn thuốc sau khi đưa ra thị trường
  │
2009 ─── Phát triển CDM phiên bản đầu tiên
  │      Áp dụng cho 10 nguồn dữ liệu tại Mỹ
  │
2012 ─── CDM v4 được phát hành
  │      Bắt đầu mở rộng ra nhiều loại dữ liệu y tế
  │
2013 ─── Dự án OMOP kết thúc → Chuyển giao cho cộng đồng OHDSI
```

### 3.2。 OHDSI 社區（2014 年至今）

```
2014 ─── OHDSI (Observational Health Data Sciences and Informatics)
  │      thành lập tại Columbia University
  │      Phát triển CDM v5.0
  │
2017 ─── CDM v5.2 — Thêm COST table thống nhất
  │
2018 ─── CDM v5.3 — Survey module, improved Visit model
  │
2021 ─── CDM v5.4 ← PHIÊN BẢN HIỆN TẠI
  │      Thêm EPISODE, EPISODE_EVENT tables
  │      Thêm measurement_event_id, observation_event_id
  │
2024 ─── Hơn 400 tổ chức trên 80+ quốc gia tham gia
         Hơn 800 triệu bản ghi bệnh nhân đã chuyển đổi
```

### 3.3。為什麼選擇清潔發展機制5.4？

5.4版是OHDSI社群推薦的最新穩定版本：
- **37磅** 科學組織
- **腫瘤學支持**（癌症治療系列的 EPISODE/EPISODE_EVENT）
- **事件連動**改進（measurement_event_id、observation_event_id）
- **經過生產驗證** — 部署在 400 多個組織中

---

## 4. OMOP CDM 與其他標準

|標準| OMOP CDM | FHIR | HL7 v2/v3 |開放電子病歷 |
|------------|----------|--------|------------|---------|
| **主要目的** |分析與研究|資料交換|傳遞訊息|電子病歷檔案 |
| **資料模型** |關係型 (SQL) | JSON/XML 資源 |留言 |原型|
| **詞彙** |內建標準集|靈活|代碼系統|術語 |
| **用例** |回顧性分析，萊茵集團 | API 互通性 |系統整合|臨床記錄|
| **易於分析** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| **社區工具** |阿特拉斯、阿喀琉斯、哈迪斯 | FHIR 上的 SMART |變化 |臨床原型|

> **註：** OMOP CDM 和 FHIR **互補** — FHIR 用於即時資料交換，OMOP CDM 用於回顧性分析。許多組織使用 FHIR 進行採集 → ETL → OMOP CDM 進行分析。

---

## 5. 實際應用

### 5.1。大規模研究

- **COVID-19 研究馬拉松（2020 年）：** OHDSI 在 2 週內分析了來自 20 多個國家/地區的 21 億份患者記錄
- **藥物安全：** 透過1億+百萬病患的真實資料偵測藥物副作用
- **比較有效性：** 比較兩種治療方法在多中心資料上的有效性

### 5.2。在越南

- **大型醫院**正在試辦 HIS → OMOP CDM 轉換
- **公共衛生研究** 使用 OMOP CDM 分析社會保險數據
- **Startup HealthTech**基於OMOP建立醫療數據分析平台

### 5.3。 OMOP CDM 上的 AI/ML

```
  OMOP CDM Database
  ┌─────────────────────────────────────────┐
  │ Chuẩn hóa → Đồng nhất → Phân tích      │
  │                                          │
  │  ┌─────────────┐   ┌─────────────────┐  │
  │  │ Cohort      │   │ Feature         │  │
  │  │ Definition  │──→│ Extraction      │────→ ML Model
  │  │ (ATLAS)     │   │ (FeatureExtract)│  │
  │  └─────────────┘   └─────────────────┘  │
  │                                          │
  │  Cùng 1 model chạy trên N databases     │
  └─────────────────────────────────────────┘
```

由於標準化數據，**在醫院 A 數據上訓練的 ML 模型可以在醫院 B 數據上進行驗證，而無需修改代碼**。

---

## 6.OHDSI 生態系統

OMOP CDM 並不獨立 — 它是 OHDSI 生態系的核心：

```
                     ┌──────────────┐
                     │   Athena     │  ← Tra cứu Vocabulary
                     └──────┬───────┘
                            │
 ┌──────────┐    ┌──────────┴──────────┐    ┌──────────────┐
 │  Usagi   │    │                      │    │  ACHILLES    │
 │ (Mapping)│───→│    OMOP CDM 5.4     │←───│ (Data Quality│
 └──────────┘    │    Database          │    │  Profiling)  │
                 │                      │    └──────────────┘
 ┌──────────┐    │  ┌──────────────┐   │    ┌──────────────┐
 │WhiteRabbit│───→│  │  WebAPI      │   │    │   HADES      │
 │(ETL Scan) │   │  │  (REST API)  │   │←───│ (R Packages) │
 └──────────┘    │  └──────────────┘   │    └──────────────┘
                 │         ↑           │
                 └─────────┼───────────┘
                           │
                    ┌──────┴───────┐
                    │    ATLAS     │  ← Phân tích & Cohort
                    └──────────────┘
```

> 本系列將 **100% 專注於 OMOP CDM 5.4 結構**。若要了解 OHDSI 工具，請參閱該系列 [OHDSI 和 OMOP CDM — 綜合醫療數據分析](/series/ohdsi-omop-cdm-phan-tich-du-lieu-y-te-toan-dien)。

---

## 7. 重要術語

在深入了解本系列之前，您需要掌握以下術語：

|術語|越南語 |說明|
|------------|----------|----------|
| **清潔發展機制** |通用資料模型|通用資料模型|
| **ETL** |提取-轉換-載入 |提取、轉換、載入資料的過程 |
| **概念** |概念 |標準化單位－每個醫學「事物」（疾病、藥物、測試）都被分配一個唯一的concept_id |
| **標準概念** |標準概念| OMOP 選擇作為標準的概念（通常來自 SNOMED CT、RxNorm、LOINC）|
| **來源價值** |原值|來源系統的原始代碼/名稱（例如 ICD-10 代碼、BV 藥物名稱） |
| **網域** |網域 |依主題分組概念（病情、藥物、手術、測量...）
| **詞彙** |詞彙集 |代碼系統（SNOMED CT、ICD-10、RxNorm、LOINC...）|
| **觀察期** |觀察範圍|病人在系統中「擁有資料」的時間 |
| **訪問** |就診/住院 |與健康系統的一次接觸 |
| **萊茵集團** |真實世界的證據|來自真實世界數據（而非臨床試驗）的證據 |

---

## 總結

在本文中，您了解了：

1. **醫療資料片段化問題**－每個系統都是獨一無二的，無法聚合
2. **什麼是 OMOP CDM** — 通用、以人為中心、基於事件的資料模型
3. **歷史** — 從 OMOP 計畫（FDA，2008 年）到 OHDSI（2014 年至今）、CDM 5.4（2021 年）
4. **與 FHIR、HL7 的比較** — 用於分析的 OMOP CDM，與 FHIR 互補
5. **OHDSI 生態系** — Athena、ATLAS、ACHILLES、HADES、WebAPI

**下一篇文章：**我們將探討**OMOP CDM 5.4的整體架構**－37張表如何組織成6組，以及以人為中心的設計原則。

---

## 參考文獻

- [OMOP CDM 5.4 Specification](https://ohdsi.github.io/CommonDataModel/cdm54.html)
- [The Book of OHDSI](https://ohdsi.github.io/TheBookOfOhdsi/)
- [OHDSI Official Website](https://www.ohdsi.org/)
- [Athena — OHDSI Vocabularies](https://athena.ohdsi.org/)
