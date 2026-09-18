---
id: 019f1a00-a101-7b01-e001-omopcdm54001
title: "Bài 1: OMOP CDM là gì? — Tại sao cần chuẩn hóa dữ liệu y tế"
slug: bai-1-omop-cdm-la-gi-tai-sao-can-chuan-hoa-du-lieu-y-te
description: >-
  Giới thiệu OMOP Common Data Model, lịch sử ra đời từ dự án OMOP
  đến cộng đồng OHDSI, vấn đề dữ liệu y tế phân mảnh,
  và tầm quan trọng của chuẩn hóa dữ liệu trong nghiên cứu lâm sàng.
duration_minutes: 45
is_free: true
video_url: null
sort_order: 1
section_title: "Phần 1: Tổng quan & Nền tảng"
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: "OMOP CDM 5.4 cho Người mới — Hiểu từ A đến Z"
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Kiến trúc — Bài 1</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">OMOP CDM là gì? — Tại sao cần</tspan>
    <tspan x="60" dy="42">chuẩn hóa dữ liệu y tế</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OMOP CDM 5.4 cho Người mới — Hiểu từ A đến Z</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 1: Tổng quan &amp; Nền tảng</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Vấn đề phân mảnh dữ liệu y tế và giải pháp chuẩn hóa OMOP CDM](/storage/uploads/2026/04/omop-cdm-bai1-data-fragmentation.webp)

## Giới thiệu

Bạn đã bao giờ tự hỏi: Tại sao bệnh viện A và bệnh viện B, dù cùng chữa một bệnh, lại không thể so sánh dữ liệu với nhau? Tại sao muốn nghiên cứu hiệu quả thuốc trên 10 triệu bệnh nhân ở nhiều quốc gia lại khó đến vậy?

Câu trả lời nằm ở **sự phân mảnh dữ liệu y tế**. Và **OMOP CDM** chính là giải pháp.

---

## 1. Vấn đề: Dữ liệu y tế bị phân mảnh

### 1.1. Mỗi hệ thống một kiểu

Mỗi bệnh viện sử dụng phần mềm quản lý (HIS/EMR) khác nhau, lưu trữ dữ liệu theo cấu trúc riêng:

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

Dù cùng lưu "bệnh nhân", "chẩn đoán", "thuốc" — nhưng:
- **Tên bảng** khác nhau (`BENHNHAN` vs `patients` vs `HO_SO_KCB`)
- **Tên cột** khác nhau (`gioi_tinh` vs `sex` vs không có)
- **Mã bệnh** có thể dùng ICD-10-VN, ICD-10-CM, hoặc mã nội bộ
- **Mã thuốc** theo tên thương mại (Augmentin) thay vì hoạt chất (Amoxicillin/Clavulanate)
- **Format** khác nhau (ngày dd/mm/yyyy vs yyyy-mm-dd)

### 1.2. Hậu quả

| Vấn đề | Mô tả |
|--------|-------|
| **Không thể tổng hợp** | Gộp dữ liệu 3 bệnh viện mất hàng tháng |
| **Không thể so sánh** | Tỉ lệ biến chứng tiểu đường: khác nhau vì định nghĩa khác |
| **Nghiên cứu chậm** | Nghiên cứu đa trung tâm mất 1-2 năm chỉ riêng phần dữ liệu |
| **AI/ML khó triển khai** | Mô hình train trên data BV A không chạy được trên BV B |
| **Giám sát dịch bệnh** | Không thể theo dõi real-time toàn quốc |

---

## 2. Giải pháp: OMOP Common Data Model

### 2.1. OMOP CDM là gì?

**OMOP CDM** (Observational Medical Outcomes Partnership Common Data Model) là một **chuẩn mở** (open standard) định nghĩa cách tổ chức và lưu trữ dữ liệu y tế quan sát (observational health data).

Nói đơn giản: OMOP CDM là **bản thiết kế cơ sở dữ liệu thống nhất** mà mọi nguồn dữ liệu y tế đều có thể chuyển đổi sang.

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

### 2.2. Các đặc điểm chính

| Đặc điểm | Mô tả |
|-----------|-------|
| **Person-centric** | Mọi dữ liệu xoay quanh bệnh nhân (`PERSON` table) |
| **Event-based** | Mỗi sự kiện y tế là một bản ghi riêng (khám, xét nghiệm, kê đơn) |
| **Standardized Vocabularies** | Sử dụng bộ từ điển chuẩn thay vì mã nội bộ |
| **Open source** | Miễn phí, mã nguồn mở, cộng đồng phát triển |
| **Relational model** | Dùng RDBMS tiêu chuẩn (PostgreSQL, SQL Server, Oracle) |

### 2.3. Ví dụ trực quan

Một bệnh nhân nữ 45 tuổi khám tại BV Chợ Rẫy, được chẩn đoán tiểu đường type 2, kê thuốc Metformin:

**Trước (HIS gốc):**
```sql
BENHNHAN: ma_bn=12345, ho_ten='Nguyễn Thị Lan', ngay_sinh='1980-03-15', gioi_tinh='Nu'
KHAMBENH: ma_kham=K001, ngay_kham='2024-06-10', bac_si='BS. Trần Văn A'
CHANDOAN: icd10='E11', loai='chinh', ten='Đái tháo đường type 2'
DONTHUOC: ten_thuoc='Glucophage 500mg', so_luong=60, lieu='2 viên/ngày'
```

**Sau (OMOP CDM 5.4):**
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

**Điểm khác biệt quan trọng:**
- `gioi_tinh='Nu'` → `gender_concept_id=8532` (concept chuẩn quốc tế)
- `icd10='E11'` → `condition_concept_id=201826` (SNOMED CT, giữ lại source_value='E11')
- `Glucophage 500mg` → `drug_concept_id=1503297` (RxNorm ingredient+dose, giữ lại source_value)

---

## 3. Lịch sử ra đời

### 3.1. Dự án OMOP (2008-2013)

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

### 3.2. Cộng đồng OHDSI (2014-nay)

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

### 3.3. Tại sao CDM 5.4?

Phiên bản 5.4 là bản ổn định (stable) mới nhất được cộng đồng OHDSI khuyến nghị:
- **37 bảng** được tổ chức khoa học
- **Hỗ trợ oncology** (EPISODE/EPISODE_EVENT cho cancer treatment lines)
- **Event linkage** cải tiến (measurement_event_id, observation_event_id)
- **Production-proven** — được triển khai tại 400+ tổ chức

---

## 4. OMOP CDM vs các chuẩn khác

| Tiêu chí | OMOP CDM | FHIR | HL7 v2/v3 | openEHR |
|-----------|----------|------|-----------|---------|
| **Mục đích chính** | Phân tích & nghiên cứu | Trao đổi dữ liệu | Truyền thông điệp | Lưu trữ EHR |
| **Data model** | Relational (SQL) | JSON/XML Resources | Messages | Archetypes |
| **Vocabulary** | Bộ chuẩn tích hợp sẵn | Flexible | Code Systems | Terminologies |
| **Use case** | Retrospective analysis, RWE | API interoperability | System integration | Clinical records |
| **Dễ phân tích** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| **Community tools** | ATLAS, ACHILLES, HADES | SMART on FHIR | Varies | Clinical archetypes |

> **Lưu ý:** OMOP CDM và FHIR **bổ sung** cho nhau — FHIR cho trao đổi dữ liệu real-time, OMOP CDM cho phân tích hồi cứu. Nhiều tổ chức sử dụng FHIR để thu thập → ETL → OMOP CDM để phân tích.

---

## 5. Ứng dụng thực tế

### 5.1. Nghiên cứu quy mô lớn

- **COVID-19 Studyathon (2020):** OHDSI phân tích dữ liệu 2,1 tỉ bản ghi bệnh nhân từ 20+ quốc gia trong vòng 2 tuần
- **Drug Safety:** Phát hiện tác dụng phụ của thuốc trên dữ liệu thực tế 100+ triệu bệnh nhân
- **Comparative Effectiveness:** So sánh hiệu quả hai phương pháp điều trị trên dữ liệu đa trung tâm

### 5.2. Tại Việt Nam

- **Bệnh viện lớn** đang triển khai pilot chuyển đổi HIS → OMOP CDM
- **Nghiên cứu y tế công cộng** sử dụng OMOP CDM để phân tích dữ liệu BHXH
- **Startup HealthTech** xây dựng platform phân tích dữ liệu y tế trên nền OMOP

### 5.3. AI/ML trên OMOP CDM

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

Nhờ dữ liệu chuẩn hóa, **một mô hình ML train trên dữ liệu bệnh viện A có thể validate trên dữ liệu bệnh viện B mà không cần sửa code**.

---

## 6. Hệ sinh thái OHDSI

OMOP CDM không đứng một mình — nó là trung tâm của hệ sinh thái OHDSI:

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

> Series này sẽ **tập trung 100% vào cấu trúc OMOP CDM 5.4**. Để tìm hiểu các công cụ OHDSI, hãy xem series [OHDSI & OMOP CDM — Phân tích Dữ liệu Y tế Toàn diện](/series/ohdsi-omop-cdm-phan-tich-du-lieu-y-te-toan-dien).

---

## 7. Thuật ngữ quan trọng

Trước khi đi sâu vào series, bạn cần nắm vững các thuật ngữ sau:

| Thuật ngữ | Tiếng Việt | Giải thích |
|-----------|------------|------------|
| **CDM** | Common Data Model | Mô hình dữ liệu chung |
| **ETL** | Extract-Transform-Load | Quy trình trích xuất, biến đổi, nạp dữ liệu |
| **Concept** | Khái niệm | Đơn vị chuẩn hóa — mỗi "thứ" trong y tế (bệnh, thuốc, xét nghiệm) được gán 1 concept_id duy nhất |
| **Standard Concept** | Concept chuẩn | Concept được OMOP chọn làm chuẩn (thường từ SNOMED CT, RxNorm, LOINC) |
| **Source Value** | Giá trị gốc | Mã/tên gốc từ hệ thống nguồn (ví dụ: mã ICD-10, tên thuốc BV) |
| **Domain** | Miền | Nhóm concept theo chủ đề (Condition, Drug, Procedure, Measurement...) |
| **Vocabulary** | Bộ từ vựng | Hệ thống mã (SNOMED CT, ICD-10, RxNorm, LOINC...) |
| **Observation Period** | Khoảng quan sát | Thời gian bệnh nhân "có dữ liệu" trong hệ thống |
| **Visit** | Lượt khám/nhập viện | Một lần tiếp xúc với hệ thống y tế |
| **RWE** | Real-World Evidence | Bằng chứng từ dữ liệu thực tế (không phải thử nghiệm lâm sàng) |

---

## Tổng kết

Trong bài này, bạn đã hiểu:

1. **Vấn đề dữ liệu y tế phân mảnh** — mỗi hệ thống một kiểu, không thể tổng hợp
2. **OMOP CDM là gì** — mô hình dữ liệu chung, person-centric, event-based
3. **Lịch sử** — từ dự án OMOP (FDA, 2008) đến OHDSI (2014-nay), CDM 5.4 (2021)
4. **So sánh với FHIR, HL7** — OMOP CDM dành cho phân tích, bổ sung cho FHIR
5. **Hệ sinh thái OHDSI** — Athena, ATLAS, ACHILLES, HADES, WebAPI

**Bài tiếp theo:** Chúng ta sẽ khám phá **kiến trúc tổng thể OMOP CDM 5.4** — 37 bảng được tổ chức thành 6 nhóm như thế nào, và các nguyên lý thiết kế Person-centric.

---

## Tài liệu tham khảo

- [OMOP CDM 5.4 Specification](https://ohdsi.github.io/CommonDataModel/cdm54.html)
- [The Book of OHDSI](https://ohdsi.github.io/TheBookOfOhdsi/)
- [OHDSI Official Website](https://www.ohdsi.org/)
- [Athena — OHDSI Vocabularies](https://athena.ohdsi.org/)
