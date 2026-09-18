---
id: 019e0b20-b205-7a01-e001-f1a7f8000005
title: 第 5 課：Usagi — 將原始碼對應到 OMOP 標準概念
slug: bai-5-usagi-mapping-ma-nguon-sang-omop-standard-concepts
description: 安裝Usagi，導入原始碼，使用術語相似度演算法查找映射候選者，手動審核和批准映射，處理特殊情況（ICD-10越南，國內藥品），導出ETL管道的映射文件。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 5
section_title: 第 2 部分：ETL 和數據標準化
course:
  id: 019e0b20-b200-7a01-e001-f1a7f8000001
  title: OHDSI 和 OMOP CDM — 綜合醫療數據分析
  slug: ohdsi-omop-cdm-phan-tich-du-lieu-y-te-toan-dien
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-2849" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-2849)"/>

  <!-- Decorations -->
  <g>
    <circle cx="1038" cy="84" r="36" fill="#fbbf24" opacity="0.09"/>
    <circle cx="976" cy="102" r="20" fill="#fbbf24" opacity="0.13"/>
    <circle cx="914" cy="120" r="34" fill="#fbbf24" opacity="0.07"/>
    <circle cx="852" cy="138" r="18" fill="#fbbf24" opacity="0.11"/>
    <circle cx="790" cy="156" r="32" fill="#fbbf24" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <line x1="600" y1="124" x2="1100" y2="204" stroke="#fbbf24" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="154" x2="1050" y2="224" stroke="#fbbf24" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1007.7749907475932,154.5 1007.7749907475932,193.5 974,213 940.2250092524068,193.5 940.2250092524068,154.5 974,135" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fbbf24"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fbbf24" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ 建築 — 第 5 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 5 課：Usagi — 將原始碼對應到 OMOP</tspan>
      <tspan x="60" dy="42">標準概念</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OHDSI 和 OMOP CDM — 綜合醫療數據分析</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 2 部分：ETL 和數據標準化</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![第 5 課：Usagi — 映射原始碼](/storage/uploads/2026/03/ohdsi-bai-5-usagi-mapping.webp)

## 簡介

在ETL過程中，最重要的一步是**映射原始碼→標準概念**。許多原始程式碼（ICD-10、內部藥物代碼、醫院測試代碼）在 Athena 中沒有可用的映射。

**Usagi** 是一個支援手動映射過程的工具 - 使用術語相似性演算法來建議候選人，並為專家提供審查/批准的介面。

---

## 1.安裝Usagi

### 1.1 要求

```bash
# Java 17+
java -version

# Download Usagi từ GitHub
# https://github.com/OHDSI/Usagi/releases

# Download Vocabulary Index (cần thiết để Usagi hoạt động)
# Tải vocabulary từ Athena → Usagi sẽ build index tự động
```

### 1.2 啟動

```bash
# Chạy Usagi
java -jar Usagi.jar

# Lần đầu: Usagi yêu cầu path đến vocabulary CSV files
# → Chọn thư mục chứa CONCEPT.csv, CONCEPT_RELATIONSHIP.csv, etc.
# → Usagi build Lucene index (~10-20 phút lần đầu)

# Sau khi index xong: Usagi sẵn sàng sử dụng
```

### 1.3 主介面

```
┌─────────────────────────────────────────────────────────────┐
│  Usagi — Code Mapping Tool                                  │
│                                                             │
│  File  │  Help                                              │
│                                                             │
│  Source Codes          │  Mapping Candidates               │
│  ┌────────────────────┐│  ┌────────────────────────────────┐│
│  │ Code │ Name        ││  │ Concept ID │ Name    │ Score  ││
│  │──────┼─────────────││  │────────────┼─────────┼────────││
│  │ I10  │ Tăng HA     ││  │ 320128     │ Essent  │ 0.85   ││
│  │ E11  │ ĐTĐ type 2 ││  │ 316866     │ Hypert  │ 0.72   ││
│  │ J06  │ NKHHCT      ││  │ 4228112    │ Second  │ 0.65   ││
│  │ K29  │ Viêm DD    ││  │            │         │        ││
│  │ ...  │ ...         ││  │            │         │        ││
│  └────────────────────┘│  └────────────────────────────────┘│
│                        │                                    │
│  Status: [UNCHECKED ▼] │  [Approve] [Flag] [Search]        │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. 工作流程 Usagi

### 2.1 準備原始碼

```csv
# Tạo file CSV với source codes cần mapping
# Columns bắt buộc: sourceCode, sourceName
# Columns tùy chọn: sourceFrequency, sourceAutoAssignedConceptIds

sourceCode,sourceName,sourceFrequency
I10,"Essential (primary) hypertension",15000
E11.9,"Type 2 diabetes mellitus without complications",12000
J06.9,"Acute upper respiratory infection unspecified",8000
K29.7,"Gastritis unspecified",5000
N18.9,"Chronic kidney disease unspecified",3000
AMLO5,"Amlodipine 5mg tab",10000
MET500,"Metformin 500mg tab",8000
GLUC,"Glucose mau",25000
HBA1C,"HbA1c",15000
```

**越南資料註釋**：
```csv
# Nếu source codes có tên tiếng Việt, thêm cột English translation
sourceCode,sourceName,sourceNameEnglish,sourceFrequency
I10,"Tăng huyết áp nguyên phát","Essential hypertension",15000
E11.9,"Đái tháo đường type 2","Type 2 diabetes mellitus",12000
J06.9,"Nhiễm khuẩn hô hấp trên cấp","Acute upper respiratory infection",8000
```

### 2.2 導入原始碼

```
Bước 1: File → Import codes
Bước 2: Chọn CSV file đã chuẩn bị
Bước 3: Map columns:
         - Source code → sourceCode
         - Source name → sourceName
         - Source name English → sourceNameEnglish (nếu có)
         - Source frequency → sourceFrequency
Bước 4: Chọn target domain filter (Condition, Drug, Measurement...)
Bước 5: Click Import → Usagi chạy term similarity search
```

### 2.3 審查映射候選者

```
Cho mỗi source code, Usagi suggests mapping candidates:

Source: I10 — "Essential (primary) hypertension"
┌─────────────┬──────────────────────────────┬───────┬──────────┐
│ Concept ID  │ Concept Name                 │ Score │ Vocab    │
├─────────────┼──────────────────────────────┼───────┼──────────┤
│ 320128      │ Essential hypertension       │ 0.95  │ SNOMED   │ ← Best match
│ 316866      │ Hypertensive disorder        │ 0.75  │ SNOMED   │
│ 4133004     │ Malignant essential HTN      │ 0.72  │ SNOMED   │
│ 4228112     │ Secondary hypertension       │ 0.65  │ SNOMED   │
└─────────────┴──────────────────────────────┴───────┴──────────┘

Actions:
✅ Approve: Xác nhận mapping đúng (chọn concept 320128)
🔍 Search: Tìm thêm concepts nếu candidates không phù hợp
🚩 Flag: Đánh dấu cần review thêm bởi domain expert
❌ Skip: Bỏ qua (concept không có standard mapping)
```

### 2.4 映射狀態

```
UNCHECKED  → Chưa review
APPROVED   → Đã xác nhận mapping đúng
FLAGGED    → Cần review thêm (gửi cho bác sĩ/chuyên gia)
INVALID    → Không thể mapping (concept không tồn tại trong SNOMED)

Best practice: 
- Luôn đặt APPROVED cho mappings chắc chắn
- FLAGGED cho các trường hợp cần domain expertise
- Tracking: frequency × status = ưu tiên review
```

---

## 3.特殊情況的處理

### 3.1 ICD-10 越南

```
Vấn đề: ICD-10 Việt Nam có mở rộng nội địa
- ICD-10 quốc tế: I10 (Essential hypertension)
- ICD-10 VN: I10.0, I10.1 (mã mở rộng không có trong OMOP)

Giải pháp:
1. Map I10.0, I10.1 → parent concept I10
2. Hoặc tìm SNOMED concept tương đương trực tiếp
3. Document deviations trong ETL specification
```

### 3.2 國產藥品

```
Vấn đề: Thuốc Việt Nam có tên thương mại không có trong RxNorm
- "Amlodipin STELLA 5mg" → không có trong RxNorm
- "Metformin Hậu Giang 500mg" → không có trong RxNorm

Giải pháp:
1. Map theo hoạt chất + liều + dạng bào chế
   "Amlodipin STELLA 5mg" → Amlodipine 5 MG Oral Tablet (RxNorm 1332419)
   
2. Sử dụng RxNorm Extension cho thuốc quốc tế
   
3. Nếu hoạt chất không có → map ở mức Ingredient
   "Thuốc ABC" → Ingredient concept trong RxNorm
```

### 3.3 內部測試

```
Vấn đề: Mã xét nghiệm bệnh viện không phải LOINC
- "XN001" = "Glucose máu đói"
- "XN002" = "HbA1c"

Giải pháp trong Usagi:
1. Dùng tên tiếng Anh: "Fasting blood glucose"
2. Usagi search → LOINC 1558-6 (Fasting glucose)
3. Review unit: mg/dL vs mmol/L
4. Approve mapping
```

---

## 4. 匯出映射結果

### 4.1 匯出 CSV

```
File → Export source_to_concept_map

Output file chứa:
sourceCode,sourceConceptId,sourceVocabularyId,targetConceptId,targetVocabularyId,validStartDate,validEndDate,invalidReason
I10,45566052,ICD10CM,320128,SNOMED,2024-01-01,2099-12-31,
E11.9,45541578,ICD10CM,201826,SNOMED,2024-01-01,2099-12-31,
AMLO5,0,MY_HOSPITAL,1332419,RxNorm,2024-01-01,2099-12-31,
GLUC,0,MY_HOSPITAL,3004410,LOINC,2024-01-01,2099-12-31,
```

### 4.2 導入 OMOP CDM

```sql
-- Load mapping results vào SOURCE_TO_CONCEPT_MAP
\COPY source_to_concept_map
FROM '/path/to/usagi_export.csv'
WITH (FORMAT csv, HEADER true);

-- Verify mapping
SELECT
  stcm.source_code,
  stcm.source_vocabulary_id,
  c.concept_name AS target_concept,
  c.vocabulary_id AS target_vocabulary
FROM source_to_concept_map stcm
JOIN concept c ON stcm.target_concept_id = c.concept_id
LIMIT 20;
```

---

## 5. 映射品質指標

### 5.1 覆蓋率分析

```sql
-- Tính coverage: bao nhiêu % source codes đã được mapping?

-- Total distinct source codes
SELECT COUNT(DISTINCT source_code) AS total_source_codes
FROM source_to_concept_map
WHERE source_vocabulary_id = 'MY_HOSPITAL';

-- Mapped codes (target_concept_id > 0)
SELECT COUNT(DISTINCT source_code) AS mapped_codes
FROM source_to_concept_map
WHERE source_vocabulary_id = 'MY_HOSPITAL'
  AND target_concept_id > 0;

-- By frequency (quan trọng hơn)
-- Ví dụ: 80% codes = 95% records
```

### 5.2 驗收標準

```
Mục tiêu mapping coverage:
- Conditions (ICD-10): ≥ 95% by frequency
- Drugs: ≥ 90% by frequency
- Measurements: ≥ 90% by frequency
- Procedures: ≥ 85% by frequency

Nếu chưa đạt → focus vào high-frequency unmapped codes
```

---

## 6. 提示與最佳實踐

```
1. Bắt đầu với high-frequency codes
   → Sort by sourceFrequency DESC → mapping codes phổ biến trước

2. Sử dụng English translations
   → Usagi term similarity hoạt động tốt nhất với tiếng Anh

3. Batch review theo domain
   → Conditions trước, rồi Drugs, rồi Measurements
   → Mỗi domain cần chuyên gia khác nhau

4. Lưu file Usagi thường xuyên
   → File .usagi format → có thể share và continue mapping

5. Version control mapping files
   → Commit mapping CSV vào Git
   → Track thay đổi qua thời gian

6. Tổ chức mapping review sessions
   → 1 data engineer + 1 bác sĩ/dược sĩ
   → Engineer thao tác Usagi, expert validate clinical correctness

7. Re-run khi vocabulary update
   → Vocabulary mới có thể có mapping tốt hơn
```

---

## 總結

|概念 |說明|
|------------|------------|
|阿兔 |工具映射原始碼 → OMOP 標準概念 |
|術語相似度|依名稱找出最接近概念的演算法 |
|已核准 |測繪已獲專家確認|
|已標記 |映射需要領域專家進一步審核 |
| SOURCE_TO_CONCEPT_MAP | OMOP CDM 表格儲存自訂映射 |
|覆蓋範圍|已成功映射的原始碼百分比 |

**下一篇文章**：建立 ETL 管道 — 從來源資料到 OMOP CDM
