---
id: 019f5a01-d000-7001-his0-000000000302
title: "Bài 8: Sinh hiệu, template hỏi bệnh & ICD-10"
slug: bai-8-sinh-hieu-template-icd10
description: >-
  Cách HIS tổ chức nhập sinh hiệu, template SOAP theo chuyên khoa, gợi ý
  ICD-10 thông minh, snippets / phrases để bác sĩ ghi chép nhanh & chuẩn.
duration_minutes: 50
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-8-sinh-hieu-template-icd10-banner.webp
video_url: null
sort_order: 2
section_title: "Phần 3: Khám ngoại trú (OPD)"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![Sinh hiệu, template khám & ICD-10](/storage/uploads/2026/05/his/bai-8-sinh-hieu-template-icd10-banner.webp)

## Mục tiêu

![Đo sinh hiệu, ghi chú template, gắn mã ICD-10](/storage/uploads/2026/05/his/bai-8-sinh-hieu-template-icd10-workflow.webp)

Đây là 3 lớp kỹ thuật cốt lõi quyết định **tốc độ + chất lượng nhập liệu** của BS OPD: vital signs (đầu vào tự động), template SOAP (cấu trúc văn bản), và ICD-10 (mã chuẩn). Làm tốt 3 lớp này → BS giảm 50 % thời gian gõ phím, tăng 90 % độ đầy đủ hồ sơ, giảm xuất toán BHYT.

Mục tiêu bài:

- Thiết kế **vital signs schema** với validation, đơn vị UCUM, cảnh báo bất thường.
- Thiết kế **template SOAP** theo chuyên khoa với biến điền nhanh.
- Tổ chức **macro / phrase** cá nhân an toàn (không leak PHI).
- Triển khai **ICD-10 search-as-you-type** đa trục (chính / phụ / biến chứng) + gợi ý CLS.
- Hiểu chuẩn **SNOMED-CT, LOINC, UCUM** ở mức tối thiểu để liên thông.
- Bộ rules CDS đơn giản đi kèm.

## Bối cảnh

- BS Việt Nam ngại ICD-10 vì WHO 2019 có >70.000 mã; bản BYT địa hoá khoảng 12.000 mã thường dùng.
- Sinh hiệu lưu sai đơn vị (mmHg vs kPa) là nguyên nhân phổ biến nhất gây sai báo cáo (vd. nhập 12 thay vì 120).
- Template miễn phí (vd. SOAP của một vendor) thường không phù hợp chuyên khoa Sản, Mắt, Răng-Hàm-Mặt → cần customizable.

## 1) Sinh hiệu (Vital Signs)

### Schema

| Trường | Đơn vị (UCUM) | Validation | Bắt buộc |
| --- | --- | --- | --- |
| Nhiệt độ | `Cel` | 30–43 | OPD/IPD |
| Mạch | `/min` | 30–220 | OPD/IPD |
| HA tâm thu | `mm[Hg]` | 50–260 | OPD/IPD |
| HA tâm trương | `mm[Hg]` | 30–160 | OPD/IPD |
| Nhịp thở | `/min` | 5–60 | IPD/ER |
| SpO₂ | `%` | 50–100 | OPD nếu hô hấp |
| Cân nặng | `kg` | 0.5–250 | OPD/Sản/Nhi |
| Chiều cao | `cm` | 30–230 | định kỳ |
| BMI | `kg/m2` | computed | auto |
| Đường máu mao mạch | `mmol/L` | 1.0–40 | nếu Đái tháo đường |
| Pain score (NRS) | 0–10 | int | thủ thuật/IPD |

### Quy tắc

- **Bắt buộc nhập sinh hiệu trước khi `IN_EXAM`** (hard-block).
- **Cảnh báo đỏ** nếu ngoài ngưỡng nguy hiểm:
  - HA > 180/110 hoặc < 90/60 → triggers
  - SpO₂ < 90 % → gợi ý chuyển ER
  - Nhiệt độ > 39 °C kèm tuổi < 6 → cảnh báo nhi khoa
  - HR < 50 hoặc > 130 → cảnh báo loạn nhịp
- Lưu kèm `taken_at`, `taken_by`, `device_id` (kết nối từ máy đo) — phục vụ kiểm toán.
- Connect trực tiếp **máy đo HA / SpO₂** qua HL7 v2 ORU^R01 hoặc IHE PCD-01 → giảm sai số nhập tay.

### State machine vital

```
[ENTERED] → [VALIDATED]
        │       │
        │       ├─► [ABNORMAL] → cảnh báo CDS
        │       └─► [NORMAL]
        └─► [REJECTED] (ngoài ngưỡng vật lý) → bắt nhập lại
```

## 2) Template SOAP & nâng cao

### Mô hình SOAP

- **S**ubjective: lý do đến khám, tiền sử (BN khai)
- **O**bjective: sinh hiệu, khám thực thể
- **A**ssessment: ICD chính + phụ + biến chứng
- **P**lan: thuốc, CLS, hẹn tái khám, hướng xử trí

### Template theo chuyên khoa

| Khoa | Trường đặc thù |
| --- | --- |
| Nội tổng quát | Đau ngực (OPQRST), khó thở (NYHA), ho |
| Tim mạch | NYHA, CCS, ECG findings, EF % |
| Da liễu | Vị trí, hình thái, kích thước, ảnh |
| Sản | PARA, tuổi thai, ngày DKKK, GA tuần |
| Nhi | Cân nặng/chiều cao/PT thần kinh; tiêm chủng |
| RHM | Sơ đồ răng FDI, mã thủ thuật |
| Mắt | TL, NA, đáy mắt, OCT |
| Tâm thần | MMSE/MOCA/PHQ-9 |
| Ung bướu | TNM, ECOG, chemo regimen |

### Render template

Template lưu Markdown + biến `{{var}}`:

```markdown
## SOAP - Tim mạch

**S**: BN nam {{age}} tuổi, đau ngực {{chest_pain_duration}}, mức độ {{chest_pain_severity}}/10.
NYHA: {{nyha}}. Tiền sử: {{history}}.

**O**: HA {{sbp}}/{{dbp}} mmHg, M {{pulse}} l/p, SpO₂ {{spo2}} %.
ECG: {{ecg_findings}}.

**A**: {{icd_primary}}{{#icd_secondary}}; {{.}}{{/icd_secondary}}

**P**:
- {{plan_drugs}}
- CLS: {{plan_cls}}
- Hẹn tái khám: {{follow_up_date}}
```

UI render thành form thông minh, BS chỉ điền các ô.

## 3) Snippets / Phrases

Cho phép BS định nghĩa **macro** cá nhân, scope:

- `personal` — chỉ BS đó (autocomplete khi gõ `.`)
- `department` — toàn khoa (do Trưởng khoa duyệt)
- `system` — toàn BV (do Y vụ duyệt)

Ví dụ:

```
.vmtinh   → "Họng đỏ, amydal sưng độ II, không giả mạc."
.cao_ha   → "Tăng huyết áp giai đoạn II — khuyến cáo đo HA tại nhà 2 lần/ngày."
.dttd2    → "Đái tháo đường týp 2, kiểm soát chưa tốt (HbA1c {{hba1c}} %), điều chỉnh phác đồ."
```

**An toàn**:
- Macro **không được chứa PHI** (tên, số, ngày sinh) — validate khi save.
- Audit log mỗi lần dùng macro → có thể trace lại khi BHYT giám định.
- Macro `system` cần ký số bởi Y vụ.

## 4) ICD-10: tra cứu thông minh

### Cấu trúc bộ mã

- **ICD-10 WHO** (Bộ Y tế Việt Nam đã địa hoá theo QĐ 7603/QĐ-BYT 2018, cập nhật 2023).
- ~12.000 mã active; chia 22 chương (A–Z trừ U).
- Mã chính + phụ + biến chứng + nguyên nhân ngoại sinh (V–Y).

### UI tra cứu

1. **Search-as-you-type** đa nguồn:
   - Mã (J20.9)
   - Tên tiếng Việt ("viêm phế quản cấp")
   - Tên tiếng Anh ("acute bronchitis")
   - Đồng nghĩa, viết tắt (ASCVD, COPD)
2. **Chấm điểm relevance**: prefix match (mã) > exact word > fuzzy. Dùng PostgreSQL `pg_trgm` hoặc Elasticsearch.
3. **Ưu tiên gợi ý**:
   - Theo chuyên khoa BS đang làm
   - Theo ICD đã dùng cho BN trước (history)
   - Top 20 mã của chính BS đó (most recent personal)
4. **Multi-axis** UI: chính / phụ / biến chứng / ngoại sinh — 4 ô riêng biệt.
5. **Cảnh báo**:
   - Mã chương Z (sàng lọc) → BHYT thường không thanh toán
   - Mã chương V–Y (tai nạn) → cần ghi rõ hoàn cảnh
   - Mã `unspecified` (.9) → khuyến khích BS chốt mã con cụ thể nếu có
6. **Hiển thị badge** "BHYT pass / không pass" theo bộ rule giám định.

### Liên kết ICD ↔ Service (clinical pathway nhẹ)

Bảng `ICD_TO_SUGGESTED_SERVICES`:

| ICD | Gợi ý CLS | Lý do |
| --- | --- | --- |
| J20.* | CRP, CTM, X-quang ngực | nhiễm trùng hô hấp dưới |
| E11.* | HbA1c, glucose, lipid, microalbumin | follow-up ĐTĐ |
| I10 | ECG, lipid, creatinin, kali | THA mới chẩn đoán |
| K29.* | UREA H. Pylori, EGD | viêm dạ dày |
| N39.0 | TPTNT, cấy nước tiểu | NKTQ |

Khi BS chọn ICD → modal "Bạn có muốn thêm các CLS thường dùng?" → 1 click thêm vào order. Tăng tốc 5x.

## 5) Chuẩn dữ liệu liên thông

| Chuẩn | Vai trò | Áp dụng VN |
| --- | --- | --- |
| **ICD-10** WHO (BYT địa hoá) | Chẩn đoán | bắt buộc theo TT 32 |
| **ICD-10-PCS** / **ICD-9-CM Vol 3** | Thủ thuật | dùng cho IPD |
| **ICD-O-3** | Ung bướu | bài 26 |
| **SNOMED-CT** | Khái niệm lâm sàng tinh hơn | tuỳ chọn cho HSSK liên thông quốc tế |
| **LOINC** | Mã xét nghiệm | bài 17 |
| **UCUM** | Đơn vị đo | bắt buộc cho thiết bị tự động |
| **RxNorm / Bộ DM thuốc BYT** | Thuốc | bài 22 |
| **HL7 v2 / FHIR R4** | Vận chuyển | bài 17, 46 |

## 6) CDS đơn giản đi kèm

Bộ rules tối thiểu:

- HA > 180/110 + chưa có ICD I10 → gợi ý ICD I10 + chỉ định ECG.
- ICD I20.* + chưa kê chống ngưng tập tiểu cầu → gợi ý.
- Phụ nữ thai kỳ + thuốc nhóm X → block.
- Tuổi > 65 + thuốc Beers list → cảnh báo.
- ICD nhi + thuốc người lớn → cảnh báo cân nặng.

Lưu CDS log để cải tiến rule (xem bài 23).

## Edge case

- BS gõ ICD bằng tiếng Anh sai chính tả → fuzzy match phải tha thứ Levenshtein ≤ 3.
- Sinh hiệu nhập sai đơn vị (HA = 12 thay vì 120) → reject ngoài range.
- Macro chứa PHI vô tình → block lúc save + xoá lịch sử backup nếu phát hiện.
- BS muốn ICD ngoài WHO (vd. y học cổ truyền) → có namespace riêng `YHCT.*` không gửi BHYT XML 1.
- Template chuyên khoa thay đổi giữa kỳ → version hoá, bệnh án cũ giữ template version cũ.

## Sai lầm thường gặp

- Cho nhập sinh hiệu bất kỳ giá trị (không validation) → báo cáo lỗi.
- Template không có version → in lại bệnh án cũ thấy khác.
- ICD search slow (full-text query thiếu index) → BS bỏ chọn.
- Không gắn ICD ↔ service → BS quên CLS quan trọng.
- Macro chứa text "BN nam Nguyễn Văn A" copy nhầm → leak PHI.
- Không log device_id máy đo → không truy được nguồn sai số.

## Output / Chứng từ

| Chứng từ | Khi nào | Lưu |
| --- | --- | --- |
| Phiếu sinh hiệu (in nếu cần) | EOD | bệnh án |
| Bệnh án ngoại trú (đã render template) | sau DONE | MRA |
| Báo cáo CDS log | tháng | Y vụ |

## Checklist UAT

- [ ] Bắt buộc sinh hiệu trước IN_EXAM.
- [ ] HA = 12 → bị reject; HA = 1200 → bị reject.
- [ ] SpO₂ < 90 → cảnh báo đỏ + gợi ý ER.
- [ ] BMI tự tính từ cân/chiều cao.
- [ ] Template SOAP render đúng biến.
- [ ] Macro `.vmtinh` autocomplete khi gõ `.vmt`.
- [ ] Macro chứa "Nguyễn Văn A" → reject.
- [ ] ICD search "vphq" → ra J20.9.
- [ ] ICD search "asthma" → ra J45.
- [ ] Chọn ICD E11 → modal gợi ý HbA1c + lipid.
- [ ] ICD chương Z với BHYT → cảnh báo.
- [ ] ICD `.9` → khuyến khích chốt mã con.
- [ ] Đa trục: chính/phụ/biến chứng/ngoại sinh độc lập.
- [ ] Sinh hiệu từ device qua HL7 ORU → tự fill.

## KPI vận hành

| KPI | Mục tiêu | Cách đo |
| --- | --- | --- |
| % encounter có sinh hiệu đầy đủ | > 99 % | DB check |
| % sinh hiệu nhập từ device | > 60 % | source flag |
| Avg thời gian nhập SOAP | < 90 giây | session log |
| % template được dùng | > 70 % | log |
| ICD search latency p95 | < 200 ms | APM |
| % ICD chính chuẩn (không text) | > 99 % | DB check |
| % CDS rule kích hoạt → action | > 70 % | CDS log |

## Cơ sở pháp lý áp dụng (2026)

- Luật KCB **15/2023/QH15** — bệnh án điện tử.
- TT **32/2023/TT-BYT** — báo cáo thống kê (ICD bắt buộc).
- TT **46/2018/TT-BYT** — bệnh án điện tử.
- QĐ **7603/QĐ-BYT 2018** — danh mục ICD-10 VN (cập nhật 2023).
- QĐ **130/QĐ-BYT 2023** — chuẩn dữ liệu đầu ra BHYT.
- NĐ **13/2023/NĐ-CP** — PHI (chống leak qua macro).

> **Bài tiếp theo:** Khám đa chuyên khoa, chuyển khoa & hội chẩn ngoại trú.
