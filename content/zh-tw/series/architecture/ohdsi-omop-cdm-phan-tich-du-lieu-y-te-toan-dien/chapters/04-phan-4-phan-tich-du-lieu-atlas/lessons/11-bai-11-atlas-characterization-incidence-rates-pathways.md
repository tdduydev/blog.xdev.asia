---
id: 019e0b20-b211-7a01-e001-f1a7f8000011
title: 第 11 課：ATLAS — 特徵、發生率與途徑
slug: bai-11-atlas-characterization-incidence-rates-pathways
description: 隊列特徵（人口統計、條件、藥物、測量）、發病率分析（風險時間、目標/結果隊列）、治療路徑可視化、導出結果並透過 OHDSI 網路共享。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 11
section_title: 第 4 部分：使用 ATLAS 進行資料分析
course:
  id: 019e0b20-b200-7a01-e001-f1a7f8000001
  title: OHDSI 和 OMOP CDM — 綜合醫療數據分析
  slug: ohdsi-omop-cdm-phan-tich-du-lieu-y-te-toan-dien
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-8048" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-8048)"/>

  <!-- Decorations -->
  <g>
    <circle cx="930" cy="280" r="18" fill="#38bdf8" opacity="0.05"/>
    <circle cx="760" cy="190" r="8" fill="#38bdf8" opacity="0.05"/>
    <circle cx="1090" cy="100" r="28" fill="#38bdf8" opacity="0.05"/>
    <circle cx="920" cy="270" r="18" fill="#38bdf8" opacity="0.05"/>
    <circle cx="750" cy="180" r="8" fill="#38bdf8" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <line x1="600" y1="140" x2="1100" y2="220" stroke="#38bdf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="170" x2="1050" y2="240" stroke="#38bdf8" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1070.3108891324553,222.5 1070.3108891324553,257.5 1040,275 1009.6891108675446,257.5 1009.6891108675446,222.5 1040,205" fill="none" stroke="#38bdf8" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#38bdf8"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#38bdf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#38bdf8">🏗️ 建築 — 第 11 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 11 課：ATLAS — 特徵描述，</tspan>
      <tspan x="60" dy="42">發病率和途徑</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OHDSI 和 OMOP CDM — 綜合醫療數據分析</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 4 部分：使用 ATLAS 進行資料分析</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![第 11 課：特徵、發生率與途徑](/storage/uploads/2026/03/ohdsi-bai-11-characterization-ir-pathways.webp)

## 簡介

建立隊列定義後，下一步是**隊列分析** — 表徵（Characterization）、計算發病率（Incidence Rates）並分析治療途徑（Pathways）。

---

## 1. 群組特徵

### 1.1 目的

特徵描述回答了以下問題：**「我的病患群組是什麼樣的？」**

```
Ví dụ: Cohort "New-Onset Type 2 DM" (4,200 bệnh nhân)
Muốn biết:
- Phân bố tuổi, giới tính?
- Bệnh đi kèm phổ biến (comorbidities)?
- Thuốc đang dùng tại thời điểm chẩn đoán?
- Xét nghiệm gần nhất (HbA1c, glucose, BMI)?
```

### 1.2 在 ATLAS 中建立特徵

```
ATLAS → Characterizations → New Characterization

Setup:
┌─────────────────────────────────────────────────────────┐
│  Characterization: DM Type 2 Patient Profile            │
│                                                         │
│  Cohorts:                                               │
│  ☑ New-Onset Type 2 DM (cohort #1)                     │
│  ☑ Type 2 DM Với Metformin (cohort #2) — so sánh       │
│                                                         │
│  Feature Analyses:                                      │
│  ☑ Demographics (Gender, Age)                           │
│  ☑ Conditions in prior 365 days                         │
│  ☑ Drug Exposures in prior 365 days                     │
│  ☑ Measurements in prior 365 days                       │
│  ☑ Visit Count in prior 365 days                        │
│  ☑ Charlson Comorbidity Index                           │
│                                                         │
│  [▶ Execute]                                            │
└─────────────────────────────────────────────────────────┘
```

### 1.3 表徵結果

```
Demographics:
┌────────────────────────┬────────────────┬────────────────┐
│ Feature                │ Cohort 1       │ Cohort 2       │
│                        │ (New DM)       │ (DM+Metformin) │
├────────────────────────┼────────────────┼────────────────┤
│ Male                   │ 52.3%          │ 48.1%          │
│ Female                 │ 47.7%          │ 51.9%          │
│ Age 18-44              │ 15.2%          │ 12.0%          │
│ Age 45-64              │ 48.5%          │ 52.3%          │
│ Age 65+                │ 36.3%          │ 35.7%          │
│ Mean age               │ 57.2 years     │ 58.8 years     │
└────────────────────────┴────────────────┴────────────────┘

Top Conditions (prior 365 days):
┌──────────────────────────────────┬──────────┬──────────┐
│ Condition                        │ Cohort 1 │ Cohort 2 │
├──────────────────────────────────┼──────────┼──────────┤
│ Essential hypertension           │ 62.5%    │ 68.2%    │
│ Hyperlipidemia                   │ 45.3%    │ 51.0%    │
│ Obesity                          │ 28.7%    │ 25.4%    │
│ Chronic kidney disease           │ 12.1%    │ 15.8%    │
│ Ischemic heart disease           │  8.5%    │ 10.2%    │
└──────────────────────────────────┴──────────┴──────────┘

Measurements (prior 365 days):
┌──────────────────────────────────┬──────────┬──────────┐
│ Measurement                      │ Cohort 1 │ Cohort 2 │
├──────────────────────────────────┼──────────┼──────────┤
│ HbA1c (mean)                     │ 8.2%     │ 7.5%     │
│ Fasting Glucose (mean)           │ 165 mg/dL│ 135 mg/dL│
│ BMI (mean)                       │ 27.8     │ 26.9     │
│ Creatinine (mean)                │ 1.1 mg/dL│ 1.2 mg/dL│
└──────────────────────────────────┴──────────┴──────────┘
```

### 1.4 標準化均差（SMD）

```
ATLAS tính SMD giữa 2 cohorts:
  SMD > 0.1: Khác biệt có ý nghĩa (cần chú ý)
  SMD < 0.1: Tương đồng

Ví dụ:
  Essential HTN: |62.5% - 68.2%| → SMD = 0.12 (khác biệt nhẹ)
  Mean Age: |57.2 - 58.8| → SMD = 0.08 (tương đồng)

→ Quan trọng cho Estimation studies (balance assessment)
```

---

## 2. 發生率分析

### 2.1 概念

```
Incidence Rate = số ca mới / tổng thời gian at-risk

Trả lời: "Bao nhiêu bệnh nhân phát triển [outcome]
          trong [target cohort] theo thời gian?"

Ví dụ:
  Target: Bệnh nhân Type 2 DM mới khởi phát
  Outcome: Nhồi máu cơ tim (Acute MI)
  → Tỷ lệ mới mắc MI ở bệnh nhân DM type 2?
```

### 2.2 ATLAS中的配置

```
ATLAS → Incidence Rates → New IR Analysis

┌─────────────────────────────────────────────────────────┐
│  Incidence Rate: MI in Type 2 DM                        │
│                                                         │
│  Target Cohort:                                         │
│  [New-Onset Type 2 DM ▼]                               │
│                                                         │
│  Outcome Cohort:                                        │
│  [Acute Myocardial Infarction ▼]                       │
│                                                         │
│  Time At Risk:                                          │
│  Start: Cohort start date + [0] days                    │
│  End:   Cohort end date + [0] days                      │
│                                                         │
│  ☑ Exclude persons with prior outcome                   │
│     (loại BN đã từng có MI trước)                       │
│                                                         │
│  [▶ Execute]                                            │
└─────────────────────────────────────────────────────────┘
```

### 2.3 發生率結果

```
Results:
┌──────────────────────────────────────────────────────┐
│  Target: New-Onset Type 2 DM                         │
│  Outcome: Acute Myocardial Infarction                │
│                                                      │
│  Persons at risk:        4,200                       │
│  Person-years at risk:   12,600 PY                   │
│  Outcome events:         126                         │
│                                                      │
│  Incidence Rate:         10.0 per 1,000 PY           │
│  95% CI:                 [8.3 - 11.9]                │
│                                                      │
│  By Age Group:                                       │
│  ├── 18-44:  3.2 per 1,000 PY                       │
│  ├── 45-64:  8.5 per 1,000 PY                       │
│  └── 65+:   18.7 per 1,000 PY                       │
│                                                      │
│  By Gender:                                          │
│  ├── Male:   12.3 per 1,000 PY                       │
│  └── Female:  7.8 per 1,000 PY                       │
└──────────────────────────────────────────────────────┘
```

---

## 3. 治療途徑

### 3.1 概念

```
Treatment Pathway = lộ trình điều trị theo thời gian

Trả lời: "Bệnh nhân [target cohort] được điều trị theo
          trình tự nào? Thuốc đầu tiên là gì? Thay đổi
          thuốc khi nào?"

Ví dụ: Lộ trình điều trị Type 2 DM
  Patient 1: Metformin → Metformin + Glipizide → Insulin
  Patient 2: Metformin → Metformin + SGLT2i
  Patient 3: Metformin (mono therapy duy trì)
```

### 3.2 配置路徑分析

```
ATLAS → Pathways → New Pathway Analysis

┌─────────────────────────────────────────────────────────┐
│  Pathway: DM Treatment Pathway                          │
│                                                         │
│  Target Cohort:                                         │
│  [New-Onset Type 2 DM ▼]                               │
│                                                         │
│  Event Cohorts (các thuốc theo dõi):                   │
│  ☑ Metformin Users                                     │
│  ☑ Sulfonylurea Users                                  │
│  ☑ SGLT2 Inhibitor Users                               │
│  ☑ DPP-4 Inhibitor Users                               │
│  ☑ GLP-1 RA Users                                      │
│  ☑ Insulin Users                                        │
│                                                         │
│  Settings:                                              │
│  Combination window: [30] days                          │
│  Minimum cell count: [5]                                │
│  Max path length: [5]                                   │
│                                                         │
│  [▶ Execute]                                            │
└─────────────────────────────────────────────────────────┘
```

### 3.3 旭日圖

```
ATLAS vẽ Sunburst diagram:

                    ┌─ Metformin only (35%)
                    │
        ┌── Met ────┼─ Met → Met+SU (18%)
        │   (70%)   │
        │           └─ Met → Met+SGLT2i (12%)
Start ──┤
        │           ┌─ SU only (5%)
        ├── SU ─────┤
        │   (15%)   └─ SU → SU+Met (8%)
        │
        ├── Insulin (10%)
        │
        └── Other (5%)

→ 70% bệnh nhân bắt đầu với Metformin (đúng guideline)
→ 18% chuyển sang combination Met+SU
→ 10% bắt đầu trực tiếp Insulin (DM nặng)
```

---

## 4. 匯出並分享結果

### 4.1 匯出群組定義

```json
// ATLAS → Cohort Definition → Export → JSON
{
  "ConceptSets": [...],
  "PrimaryCriteria": {
    "CriteriaList": [{
      "ConditionOccurrence": {
        "CodesetId": 0,
        "First": true
      }
    }],
    "ObservationWindow": {"PriorDays": 365, "PostDays": 0}
  },
  "AdditionalCriteria": {...},
  "EndStrategy": {"DateOffset": {...}}
}
```

### 4.2 導入到另一個站點

```
Site B muốn chạy cùng analysis:
1. Nhận JSON cohort definition
2. ATLAS → Cohort Definitions → Import
3. Paste JSON → Save
4. Generate trên local CDM data
5. Export aggregate results

→ Dữ liệu BN không rời site
→ Chỉ share cohort definition + aggregate results
```

---

## 總結

|分析|問題與解答 |
|----------|-----------------|
|表徵|隊列是什麼樣的？ （人口統計、合併症、藥物）|
|發病率 |隨著時間的推移，[目標]中有多少新病例[結果]？ |
|途徑|患者依何種順序接受治療？ |
|貼片式|這兩個群體在哪些特徵上有差異？ |

**下一篇文章**：ATLAS — 人群層級估計與病患層級預測
