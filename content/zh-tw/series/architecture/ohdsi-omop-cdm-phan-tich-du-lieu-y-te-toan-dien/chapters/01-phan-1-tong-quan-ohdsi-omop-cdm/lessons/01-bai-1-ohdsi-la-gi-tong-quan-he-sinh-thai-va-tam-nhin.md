---
id: 019e0b20-b201-7a01-e001-f1a7f8000001
title: 第 1 課：什麼是 OHDSI？ — 生態系概述與願景
slug: bai-1-ohdsi-la-gi-tong-quan-he-sinh-thai-va-tam-nhin
description: >-
  介紹OHDSI（觀察健康數據科學與資訊學）及其目標和願景、工俱生態系統的整體架構（Atlas、WebAPI、Athena、Usagi、ACHILLES、HADES）以及OMOP
  CDM在全球健康數據標準化中的作用。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 1
section_title: 第 1 部分：OHDSI 和 OMOP CDM 概述
course:
  id: 019e0b20-b200-7a01-e001-f1a7f8000001
  title: OHDSI 和 OMOP CDM — 綜合醫療數據分析
  slug: ohdsi-omop-cdm-phan-tich-du-lieu-y-te-toan-dien
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-7504" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-7504)"/>

  <!-- Decorations -->
  <g>
    <circle cx="659" cy="87" r="22" fill="#818cf8" opacity="0.12000000000000001"/>
    <circle cx="718" cy="106" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="777" cy="125" r="36" fill="#818cf8" opacity="0.060000000000000005"/>
    <circle cx="836" cy="144" r="13" fill="#818cf8" opacity="0.13"/>
    <circle cx="895" cy="163" r="20" fill="#818cf8" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <line x1="600" y1="157" x2="1100" y2="237" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="187" x2="1050" y2="257" stroke="#818cf8" stroke-width="0.5" opacity="0.08"/>
    <polygon points="934.712812921102,91 934.712812921102,123 907,139 879.287187078898,123 879.287187078898,91.00000000000001 907,75" fill="none" stroke="#818cf8" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ 建築 — 第 1 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 1 課：什麼是 OHDSI？ — General generative relationship</tspan>
      <tspan x="60" dy="42">態度和願景</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OHDSI 和 OMOP CDM — 綜合醫療數據分析</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 1 部分：OHDSI 和 OMOP CDM 概述</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![第 1 課：OHDSI — 生態系概述](/storage/uploads/2026/03/ohdsi-bai-1-ecosystem-overview.webp)

## 簡介

全球健康數據是一個龐大的寶庫——來自醫院、診所、健康保險的數十億筆記錄。但每個系統都以單獨的形式儲存：A醫院的HIS（醫院資訊系統）與B醫院完全不同，ICD-10疾病代碼與SNOMED CT不一致，處方以商品名稱儲存而不是國際活性成分。

**OHDSI**（觀察健康數據科學和資訊學 — 發音為“Odyssey”）就是為了解決這個問題而創建的。

---

## 1. 什麼是 OHDSI？

### 1.1 定義

OHDSI 是一項國際開源研究計劃，旨在：

- **將觀察健康數據標準化**為通用數據模型
- **開發**可靠、可重複的分析方法
- **允許**多中心研究而不共享患者數據

### 1.2 歷史

```
2008: OMOP (Observational Medical Outcomes Partnership)
      → Dự án FDA nghiên cứu tác dụng phụ thuốc trên dữ liệu thực tế
      → Phát triển Common Data Model (CDM)

2013: OMOP kết thúc → OHDSI ra đời
      → Kế thừa OMOP CDM, mở rộng thành cộng đồng mã nguồn mở
      → Mục tiêu: evidence-based medicine trên quy mô toàn cầu

2024: 800+ tổ chức, 100+ quốc gia
      → 1+ tỷ bản ghi bệnh nhân được chuẩn hóa
      → Hàng nghìn nghiên cứu được publish

2026: OHDSI tiếp tục mở rộng
      → OMOP CDM v5.4, v6.0 đang phát triển
      → Tích hợp AI/ML, genomics, wearable data
```

### 1.3 OHDSI 的三大支柱

```
┌─────────────────────────────────────────────────────────┐
│                    OHDSI Mission                        │
│                                                         │
│  ┌─────────────┐ ┌──────────────┐ ┌──────────────────┐ │
│  │  Open       │ │  Open        │ │  Open            │ │
│  │  Science    │ │  Source      │ │  Community       │ │
│  │             │ │              │ │                  │ │
│  │ Transparent │ │ Free tools   │ │ Collaborative    │ │
│  │ Reproducible│ │ Peer-reviewed│ │ 800+ orgs        │ │
│  │ Published   │ │ GitHub       │ │ Global network   │ │
│  └─────────────┘ └──────────────┘ └──────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## 2. OHDSI 問題解決

### 2.1 碎片－資料碎片

```
Bệnh viện A (HIS: eHospital)     Bệnh viện B (HIS: Telehealth)
┌─────────────────────────┐       ┌─────────────────────────┐
│ Patient: MA_BN_001      │       │ Patient: BN-2024-00123  │
│ Diagnosis: I10 (ICD-10) │       │ Diagnosis: 401.1 (ICD-9)│
│ Drug: Amlor 5mg         │       │ Drug: Amlodipine 5mg    │
│ Lab: Glucose: 126 mg/dL │       │ Lab: Đường huyết: 7.0   │
│ Date: 01/03/2024        │       │ Date: 2024-03-01        │
└─────────────────────────┘       └─────────────────────────┘

→ Cùng 1 bệnh nhân, cùng 1 bệnh (tăng huyết áp), cùng 1 thuốc
→ Nhưng KHÔNG THỂ truy vấn chung vì format khác nhau hoàn toàn
```

### 2.2 解決方案：OMOP CDM

```
                    ETL (Extract - Transform - Load)
Bệnh viện A ─────┐                    ┌──────────────────────┐
                  ├─── Transform ───→  │   OMOP CDM Database  │
Bệnh viện B ─────┘                    │                      │
                                       │ person_id: 12345     │
                                       │ condition: 320128    │
                                       │   (Essential HTN)    │
                                       │ drug: 1332419        │
                                       │   (Amlodipine 5mg)   │
                                       │ measurement: 3004410 │
                                       │   (Glucose 126 mg/dL)│
                                       └──────────────────────┘

→ Cùng concept IDs cho cùng ý nghĩa y khoa
→ Cùng cấu trúc bảng → cùng SQL query
→ Có thể phân tích đa trung tâm
```

---

## 3. OHDSI Ecosystem Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     OHDSI Ecosystem                             │
│                                                                 │
│  ┌──── Data Standardization ─────────────────────────────────┐ │
│  │                                                           │ │
│  │  [Athena]          → Standardized Vocabularies            │ │
│  │  [WhiteRabbit]     → Scan source data                     │ │
│  │  [Rabbit-in-a-Hat] → Design ETL mapping                   │ │
│  │  [Usagi]           → Map source codes → standard concepts │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                           │ ETL                                │
│                           ▼                                    │
│  ┌──── OMOP CDM Database ────────────────────────────────────┐ │
│  │  PostgreSQL / SQL Server / Oracle / Spark                 │ │
│  └───────────────────────────────────────────────────────────┘ │
│                           │                                    │
│                           ▼                                    │
│  ┌──── Data Quality ────────────────────────────────────────┐  │
│  │  [ACHILLES]              → Data characterization          │  │
│  │  [Data Quality Dashboard]→ 1,500+ quality checks          │  │
│  └───────────────────────────────────────────────────────────┘ │
│                           │                                    │
│                           ▼                                    │
│  ┌──── Analytics Platform ──────────────────────────────────┐  │
│  │  [WebAPI]  → REST API backend (Spring Boot / Java)        │  │
│  │  [ATLAS]   → Web UI (JavaScript) cho phân tích            │  │
│  │  [HADES]   → R packages cho advanced analytics            │  │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 3.1 主要工具

|工具|目的|語言 |
|--------|---------|----------|
| **雅典娜** | Look up & download Standardized Vocabularies |網頁應用程式 |
| **白兔** |掃描來源數據，建立分析報告 |爪哇 |
| **戴帽子的兔子** | ETL 映射設計（GUI）|爪哇 |
| **阿兔** |地圖原始碼→ OMOP 概念|爪哇 |
| **WebAPI** | ATLAS 的後端 REST API | Java/Spring Boot |
| **阿特拉斯** |基於網路的分析平台| JavaScript |
| **阿喀琉斯** |資料表徵與分析 |右 |
| **DQD** |資料品質儀表板 — 1,500 多項檢查 |右 |
| **哈迪斯** |用於觀察研究的 R 包 |右 |

---

## 4. 端對端 OHDSI 工作流程

```
Step 1: Vocabulary Preparation
  Athena → Download vocabularies (ICD-10, SNOMED, RxNorm, LOINC...)
                    │
Step 2: Source Data Profiling
  WhiteRabbit → Scan source database → Generate scan report
                    │
Step 3: ETL Design
  Rabbit-in-a-Hat → Design table & field mappings
  Usagi → Map source codes → Standard Concepts
                    │
Step 4: ETL Execution
  Custom ETL scripts (Python/SQL) → Load data into OMOP CDM
                    │
Step 5: Data Quality
  ACHILLES → Characterize CDM data
  DQD → Run 1,500+ quality checks
                    │
Step 6: Analytics
  WebAPI + ATLAS → Cohort Definitions, Characterization,
                   Incidence Rates, Estimation, Prediction
  HADES → Advanced R-based analytics
                    │
Step 7: Network Study
  Package study → Distribute to sites → Collect aggregate results
```

---

## 5. OHDSI 網路 — 分散式研究

OHDSI 的特別之處在於：**患者資料永遠不會離開網站**。

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Site A     │    │   Site B     │    │   Site C     │
│ (500K pts)   │    │ (1M pts)     │    │ (200K pts)   │
│              │    │              │    │              │
│ OMOP CDM     │    │ OMOP CDM     │    │ OMOP CDM     │
│ WebAPI+ATLAS │    │ WebAPI+ATLAS │    │ WebAPI+ATLAS │
│              │    │              │    │              │
│ Run Study    │    │ Run Study    │    │ Run Study    │
│ Package ───┐ │    │ Package ───┐ │    │ Package ───┐ │
└────────────│─┘    └────────────│─┘    └────────────│─┘
             │                   │                    │
             └───── Aggregate ───┴──── Results ───────┘
                        │
                        ▼
              ┌─────────────────┐
              │ Central Analysis│
              │ (chỉ aggregate  │
              │  không có PII)  │
              └─────────────────┘
```

**為什麼它很重要？ **
- 遵守隱私法規（HIPAA、GDPR、越南資訊安全法）
- 每個站點保留對資料的完全控制
- 對數百萬跨國患者的研究仍然是可能的

---

## 6. 實際應用

### 6.1 COVID-19（OHDSI COVID-19 研究馬拉松）

```
Timeline:
- Tháng 3/2020: Đại dịch bùng phát
- Tháng 3/2020: OHDSI tổ chức Study-a-thon online
- 96 giờ: 300+ nhà nghiên cứu từ 30+ quốc gia
- Kết quả: Phân tích đặc điểm bệnh nhân COVID-19
  trên 5+ triệu bệnh nhân từ nhiều quốc gia
  → Published trong PNAS (top-tier journal)
```

### 6.2 藥品安全監測

- 根據真實數據檢測藥物副作用（RWD）
- 比較藥物組與對照組
- 例：分析接種疫苗後發生心肌炎的風險

### 6.3 在越南的應用

- 將醫院 HIS 資料標準化為 OMOP CDM
- 映射 ICD-10 越南 → SNOMED CT
- 社會保險數據流行病學研究
- 評估多中心治療方案的有效性

---

## 總結

|概念 |說明|
|------------|------------|
| OHDSI |全球開源醫學研究社群 |
| OMOP CDM |觀察性醫學資料的通用資料模型 |
|標準化詞彙|標準詞彙集（SNOMED、RxNorm、LOINC...）|
|分散式研究 |資料不離開現場的多中心分析 |
| ETL |來源資料轉換流程→ OMOP CDM |

**下一篇文章**：OMOP 通用資料模型 — 結構、原則與領域
