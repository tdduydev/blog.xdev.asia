---
id: 019e0b20-b210-7a01-e001-f1a7f8000010
title: "Bài 10: ATLAS — Concept Sets & Cohort Definitions"
slug: bai-10-atlas-concept-sets-cohort-definitions
description: >-
  Tạo Concept Sets (include/exclude descendants, mapped),
  thiết kế Cohort Definitions (initial events, inclusion criteria,
  censoring, era logic), best practices cho cohort design,
  generate SQL và execute trên CDM database.
duration_minutes: 120
is_free: true
video_url: null
sort_order: 10
section_title: "Phần 4: Phân tích Dữ liệu với ATLAS"
course:
  id: 019e0b20-b200-7a01-e001-f1a7f8000001
  title: "OHDSI & OMOP CDM — Phân tích Dữ liệu Y tế Toàn diện"
  slug: ohdsi-omop-cdm-phan-tich-du-lieu-y-te-toan-dien
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-6892" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-6892)"/>

  <!-- Decorations -->
  <g>
    <circle cx="1070" cy="220" r="28" fill="#38bdf8" opacity="0.05"/>
    <circle cx="1040" cy="110" r="8" fill="#38bdf8" opacity="0.05"/>
    <circle cx="1010" cy="260" r="18" fill="#38bdf8" opacity="0.05"/>
    <circle cx="980" cy="150" r="28" fill="#38bdf8" opacity="0.05"/>
    <circle cx="950" cy="40" r="8" fill="#38bdf8" opacity="0.05"/>
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
    <line x1="600" y1="160" x2="1100" y2="240" stroke="#38bdf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="190" x2="1050" y2="260" stroke="#38bdf8" stroke-width="0.5" opacity="0.08"/>
    <polygon points="940.3108891324554,92.5 940.3108891324554,127.5 910,145 879.6891108675446,127.5 879.6891108675446,92.50000000000001 910,75" fill="none" stroke="#38bdf8" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#38bdf8"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#38bdf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#38bdf8">🏗️ Kiến trúc — Bài 10</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 10: ATLAS — Concept Sets &amp; Cohort</tspan>
      <tspan x="60" dy="42">Definitions</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OHDSI &amp; OMOP CDM — Phân tích Dữ liệu Y tế Toàn diện</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 4: Phân tích Dữ liệu với ATLAS</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Bài 10: ATLAS — Concept Sets & Cohort Definitions](/storage/uploads/2026/03/ohdsi-bai-10-concept-sets-cohorts.webp)

## Giới thiệu

**Cohort Definition** là trung tâm của mọi phân tích trong ATLAS. Một "cohort" (đoàn hệ) là tập hợp bệnh nhân thỏa mãn các tiêu chí lâm sàng cụ thể trong một khoảng thời gian xác định.

Trước khi tạo cohort, bạn cần xây dựng **Concept Sets** — các tập hợp concepts dùng lại được.

---

## 1. Concept Sets — Chi tiết

### 1.1 Tạo Concept Set

```
ATLAS → Concept Sets → New Concept Set

Ví dụ: "Type 2 Diabetes Conditions"

Bước 1: Search "type 2 diabetes" trong ATLAS
Bước 2: Thêm concepts vào concept set:

┌──────────┬───────────────────────────────┬──────────┬─────────┐
│ Concept  │ Name                          │ Excluded │ Desc.   │
├──────────┼───────────────────────────────┼──────────┼─────────┤
│ 201826   │ Type 2 diabetes mellitus      │ ☐        │ ☑       │
│ 443238   │ Diabetic neuropathy           │ ☐        │ ☐       │
│ 4193704  │ Type 2 DM w/renal compl      │ ☐        │ ☐       │
│ 201254   │ Type 1 diabetes mellitus      │ ☑        │ ☐       │
└──────────┴───────────────────────────────┴──────────┴─────────┘

Columns giải thích:
- Excluded: ☑ = LOẠI BỎ concept này (exclude Type 1 DM)
- Descendants (Desc.): ☑ = bao gồm tất cả descendants trong hierarchy
- Mapped: ☑ = bao gồm cả non-standard mapped concepts
```

### 1.2 Include Descendants — Quan trọng

```
Concept 201826: Type 2 diabetes mellitus (SNOMED)
├── Descendants (khi ☑ Include Descendants):
│   ├── 443238  Diabetic neuropathy
│   ├── 4193704 Type 2 DM with renal complications
│   ├── 4063043 Type 2 DM with ophthalmic complications
│   ├── 443729  Diabetic retinopathy
│   ├── 4128709 Diabetic foot
│   └── ... (hàng trăm descendants)

Best Practice:
- ☑ Include Descendants cho ancestor concepts (Type 2 DM)
  → Tự động bao gồm DM with complications
- ☐ Exclude Descendants cho concepts cần loại bỏ cụ thể
```

### 1.3 Resolved Concept Set

```
ATLAS tab "Included Concepts" → xem danh sách đầy đủ concepts

"Type 2 Diabetes Conditions":
  201826 + descendants = 287 concepts included
  MINUS 201254 (Type 1 DM) = excluded
  = Final: ~285 concepts

→ Đây là tập concepts sẽ dùng trong Cohort Definitions
```

---

## 2. Cohort Definitions

### 2.1 Cấu trúc Cohort Definition

```
Cohort Definition gồm 4 phần:

1. INITIAL EVENTS (Sự kiện khởi đầu)
   → Sự kiện đưa bệnh nhân vào cohort
   → VD: Lần đầu được chẩn đoán Type 2 DM

2. INCLUSION CRITERIA (Tiêu chí bao gồm)
   → Điều kiện thêm phải thỏa mãn
   → VD: Có ≥ 365 ngày observation trước

3. COHORT EXIT (Rời khỏi cohort)
   → Khi nào bệnh nhân ra khỏi cohort
   → VD: Hết observation period, hoặc fixed duration

4. CENSORING EVENTS (Sự kiện kiểm duyệt)
   → Sự kiện kết thúc follow-up
   → VD: Tử vong, chuyển viện
```

### 2.2 Ví dụ: New-Onset Type 2 DM Cohort

```
Mục tiêu: Tìm bệnh nhân Type 2 DM mới khởi phát

INITIAL EVENTS:
  Event: Condition Occurrence
  Concept Set: "Type 2 Diabetes Conditions"
  First occurrence only: ☑ (chỉ lần chẩn đoán đầu tiên)

  Timeline:
  ←── 365 days before ───┤ Index Date ├──── After ────→
                          │ (first DM  │
                          │ diagnosis) │

INCLUSION CRITERIA:
  Criterion 1: "Có observation trước"
    Having: Observation Period
    At least 365 days BEFORE index date
    → Đảm bảo bệnh nhân có đủ lịch sử

  Criterion 2: "Không có DM trước đó"
    NOT Having: Condition Occurrence
    Concept Set: "Type 2 Diabetes Conditions"
    In the 365 days BEFORE index date
    → Loại bỏ bệnh nhân đã có DM trước (new-onset only)

  Criterion 3: "Tuổi ≥ 18"
    Having: Demographics
    Age ≥ 18 at index date

COHORT EXIT:
  End of continuous observation period

CENSORING:
  Death event
```

### 2.3 Tạo trong ATLAS

```
ATLAS → Cohort Definitions → New Cohort

Tab "Definition":

┌─────────────────────────────────────────────────────────┐
│  Cohort Definition: New-Onset Type 2 DM                 │
│                                                         │
│  ┌── Cohort Entry Events ──────────────────────────┐   │
│  │                                                  │   │
│  │  Add Initial Event:                              │   │
│  │  [+ Add Condition Occurrence]                    │   │
│  │                                                  │   │
│  │  Any condition occurrence of:                    │   │
│  │  [Type 2 Diabetes Conditions ▼]  (Concept Set)  │   │
│  │                                                  │   │
│  │  ☑ First occurrence only                         │   │
│  │  □ Restrict initial events to...                 │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌── Inclusion Criteria ───────────────────────────┐   │
│  │                                                  │   │
│  │  ↓ Criterion 1: Has ≥ 365 days prior obs        │   │
│  │  ↓ Criterion 2: No prior DM in 365 days         │   │
│  │  ↓ Criterion 3: Age ≥ 18                        │   │
│  │                                                  │   │
│  │  [+ Add Criterion]                              │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌── Cohort Exit ─────────────────────────────────┐   │
│  │  ○ End of observation period                     │   │
│  │  ○ Fixed duration: ___ days after index          │   │
│  │  ○ Custom exit criteria                          │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  [💾 Save]  [▶ Generate]  [📋 Export]  [SQL]          │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Inclusion Criteria — Chi tiết

### 3.1 Criteria Types

```
Criteria có thể dựa trên:

Clinical Events:
  - Condition Occurrence (chẩn đoán)
  - Drug Exposure (thuốc)
  - Procedure Occurrence (thủ thuật)
  - Measurement (xét nghiệm) — kèm value filter
  - Observation (quan sát)
  - Visit Occurrence (lượt khám)
  - Device Exposure (thiết bị)

Demographics:
  - Age (at index date)
  - Gender
  - Race
  - Ethnicity

Temporal:
  - Observation Period (trước/sau index date)
```

### 3.2 Temporal Logic

```
Relative to Index Date:

  ←── Before ───┤ Index ├──── After ────→

  Any time before index:    (-inf, 0]
  Within 365 days before:   [-365, 0]
  Within 30 days after:     [0, 30]
  Any time after index:     [0, +inf)
  Between 30 and 365 after: [30, 365]

Ví dụ: "Dùng Metformin trong 30 ngày sau chẩn đoán DM"
  Drug Exposure: Metformin
  Time window: [0, 30] days after index
  Count: At least 1 occurrence
```

### 3.3 Attrition Report

```
Sau khi Generate cohort, ATLAS hiển thị Attrition:

Total patients:                     50,000  (100%)
  ↓ Has Type 2 DM diagnosis
  Has initial event:                 8,500   (17%)
  ↓ First occurrence only
  First occurrence:                  6,200   (12.4%)
  ↓ Criterion 1: ≥ 365 days prior obs
  After criterion 1:                 5,800   (11.6%)
  ↓ Criterion 2: No prior DM
  After criterion 2:                 4,500   (9.0%)
  ↓ Criterion 3: Age ≥ 18
  Final cohort:                      4,200   (8.4%)

→ Giúp hiểu mỗi criterion loại bao nhiêu bệnh nhân
→ Nếu criterion nào loại quá nhiều → xem lại logic
```

---

## 4. Generate & Execute Cohort

### 4.1 Generate

```
ATLAS → Cohort Definition → [▶ Generate]
  → Chọn CDM Source: Hospital XYZ Vietnam
  → WebAPI tạo SQL → Execute trên CDM database
  → Kết quả ghi vào Results schema: COHORT table

COHORT table:
┌──────────────────┬───────────┬────────────────┬──────────────┐
│ cohort_definition│ subject_id│ cohort_start   │ cohort_end   │
│ _id              │           │ _date          │ _date        │
├──────────────────┼───────────┼────────────────┼──────────────┤
│ 1                │ 12345     │ 2020-03-15     │ 2024-06-30   │
│ 1                │ 23456     │ 2019-11-20     │ 2024-12-31   │
│ 1                │ 34567     │ 2021-07-08     │ 2023-04-15   │
└──────────────────┴───────────┴────────────────┴──────────────┘
```

### 4.2 View Generated SQL

```
ATLAS → Cohort Definition → Tab "SQL"
→ Xem SQL được generate, có thể copy và chạy trực tiếp

Hữu ích cho:
- Debug logic cohort
- Chạy cohort trên database không có WebAPI
- Optimize SQL performance
```

---

## 5. Cohort Design Best Practices

```
1. Bắt đầu đơn giản, thêm complexity dần
   → Initial event + 1 criterion → verify → thêm criteria

2. Kiểm tra Attrition Report
   → Mỗi criterion nên loại < 50% (nếu loại quá nhiều → xem lại)

3. Dùng Concept Sets (không hardcode concept IDs)
   → Dễ maintain, tái sử dụng, chia sẻ

4. Include Descendants cho ancestor concepts
   → Tránh miss descendants mới khi vocabulary update

5. Washout period cho "new-onset" cohorts
   → Ít nhất 365 ngày trước index date không có event
   → Đảm bảo thực sự là "new onset"

6. Peer review cohort definitions
   → Clinician review clinical logic
   → Data engineer review technical logic

7. Test trên demo data trước
   → atlas-demo.ohdsi.org có synthetic data
   → Verify cohort logic hoạt động đúng
```

---

## Tóm tắt

| Khái niệm | Giải thích |
|-----------|-----------|
| Concept Set | Tập hợp concepts tái sử dụng (include/exclude descendants) |
| Cohort Definition | Định nghĩa nhóm bệnh nhân (initial event + criteria + exit) |
| Initial Event | Sự kiện đưa bệnh nhân vào cohort (first occurrence) |
| Inclusion Criteria | Điều kiện lọc thêm (prior obs, age, no prior event...) |
| Cohort Exit | Khi nào bệnh nhân ra khỏi cohort |
| Attrition Report | Báo cáo số bệnh nhân bị loại sau mỗi criterion |
| Washout Period | Khoảng thời gian "clean" trước index date |

**Bài tiếp theo**: ATLAS — Characterization, Incidence Rates & Pathways
