---
id: 019f5a01-d000-7001-his0-000000000402
title: "Bài 11: Phối hợp ER — Phòng mổ — ICU và bàn giao điều dưỡng"
slug: bai-11-phoi-hop-er-phong-mo-icu
description: >-
  Khi cấp cứu cần can thiệp khẩn: chuyển thẳng phòng mổ hoặc ICU, làm sao
  HIS đảm bảo y lệnh không "rơi" và bàn giao điều dưỡng (handover) đầy đủ.
duration_minutes: 45
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-11-phoi-hop-er-phong-mo-icu-banner.webp
video_url: null
sort_order: 2
section_title: "Phần 4: Cấp cứu (Emergency)"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![Handover ER ↔ Phòng mổ ↔ ICU](/storage/uploads/2026/05/his/bai-11-phoi-hop-er-phong-mo-icu-banner.webp)

## Mục tiêu

![Bệnh nhân được chuyển nhanh giữa ER, OR, ICU](/storage/uploads/2026/05/his/bai-11-phoi-hop-er-phong-mo-icu-workflow.webp)

Khi BN cần can thiệp khẩn (mổ, ICU, can thiệp mạch), việc **bàn giao** giữa các đơn vị là điểm yếu nhất của BV — Joint Commission từng thống kê **70 % sai sót y khoa nghiêm trọng** xảy ra ở handover. Module này phải:

- Đảm bảo **không "rơi" y lệnh** giữa ER → OR → ICU → ward.
- Cung cấp **eHandover** chuẩn SBAR/I-PASS có chữ ký số 2 bên.
- Phối hợp **đa kíp song song** (BS gây mê, BS phẫu thuật, ĐD ICU) qua 1 view chung.
- Theo dõi **patient location** realtime + thiết bị (monitor, máy thở) đi theo BN.
- Tổng hợp **timeline thống nhất** cho audit + bệnh án.

## Bối cảnh

- BV ĐK hạng I: 4–8 phòng mổ, 20–60 giường ICU; trung bình 8–15 BN ER → OR/ICU mỗi ngày.
- Trung tâm tim mạch / ngoại TK: 90 % BN cần OR/ICU đi qua ER first.
- WHO Surgical Safety Checklist (Time Out) bắt buộc trước rạch da — HIS phải hỗ trợ.
- TT 49/2018-TT-BYT về phẫu thuật quy định bệnh án phẫu thuật, biên bản tường trình, biên bản hội chẩn pre-op.

> **Case study**: BV TW thấy 12 % BN ER→OR có liều kháng sinh tiền phẫu sai vì handover miệng → triển khai eHandover bắt buộc → còn 0.8 % sau 3 tháng.

## Các luồng phối hợp

### 1) ER → Phòng mổ (OR)

```
[ER quyết định mổ khẩn]
     │
     ▼
[Tạo "Surgery booking khẩn"]
     │  • chọn loại phẫu thuật (CPT/ICD-PCS)
     │  • BS phẫu thuật, BS gây mê
     │  • máu dự trù → reserve (bài 41)
     ▼
[OR coordinator: chọn phòng mổ trống / dời elective]
     │
     ▼
[Pre-op checklist]
     │  • cam kết phẫu thuật ký số (BN/người nhà + BS)
     │  • hội chẩn pre-op (≥3 BS nếu mổ lớn) — biên bản
     │  • kháng sinh dự phòng (SCIP)
     │  • side marking (đánh dấu bên mổ)
     ▼
[Time Out (WHO Safety Checklist)]
     │
     ▼
[Phẫu thuật → biên bản tường trình → patho mẫu (bài 26)]
     │
     ▼
[PACU → ICU / ward]
```

### 2) ER → ICU (không qua OR)

```
[ER quyết định ICU]
     │
     ▼
[ICU coordinator: chọn giường + cấp độ chăm sóc (Level 1/2/3)]
     │
     ▼
[eHandover SBAR ký 2 bên]
     │
     ▼
[Chuyển BN — kèm thiết bị (monitor, máy thở, bơm tiêm)]
     │
     ▼
[ICU bác sĩ tiếp nhận, mở y lệnh ICU mới]
     │
     ▼
[ER encounter → CLOSED + linked ICU encounter]
```

### 3) OR → ICU → Ward

```
[Phẫu thuật xong] → [PACU 1-2h] → [ICU 1-3 ngày] → [Ward chuyên khoa]
   handover         handover          handover         handover
```

Mỗi mũi tên = 1 eHandover SBAR/I-PASS có chữ ký 2 bên.

## eHandover format SBAR

| Chữ | Mục | Nội dung |
| --- | --- | --- |
| **S** | Situation | BN, tuổi, lý do hiện tại, ICD chính |
| **B** | Background | tiền sử, dị ứng, code status (DNR/Full), allergies |
| **A** | Assessment | sinh hiệu hiện tại, lab gần nhất, drips đang chạy, monitor |
| **R** | Recommendation | y lệnh đang chờ, KQ chờ, kế hoạch 24h tới |

I-PASS (cho ICU/PACU): Illness severity, Patient summary, Action list, Situation awareness, Synthesis by receiver.

## State machine OR booking

```
[REQUESTED] → [APPROVED] → [SCHEDULED] → [PRE_OP_READY] → [TIME_OUT_OK]
                                                              │
                                                              ▼
                                                       [IN_OPERATION]
                                                              │
                                                              ▼
                                                       [PACU] → [ICU/WARD]
        ↘ [CANCELED] (lý do: BN không đủ điều kiện, lab xấu)
        ↘ [POSTPONED] (dời giờ)
```

## Quy tắc nghiệp vụ

1. **Time Out bắt buộc** ký số 3 bên (BS PT, BS GM, ĐD scrub) trước khi rạch da; thiếu = block "bắt đầu mổ".
2. **Side marking** bằng bút marker không tẩy + chụp ảnh upload; mismatch L/R → cảnh báo.
3. **Kháng sinh dự phòng SCIP**: nếu ICD chỉ định có protocol, HIS gợi ý liều/thời điểm trước rạch 60 phút.
4. **Máu dự trù** phải có cross-match xong trước khi BN vào OR.
5. **Đếm gạc/dụng cụ trước-trong-sau mổ** — bắt buộc nhập count, mismatch → cảnh báo (RSI – Retained Surgical Item).
6. **Patho mẫu** sinh từ OR phải có nhãn QR sinh tự động + giao đến GPB trong 30 phút.
7. **eHandover SBAR** ký số 2 bên — không cho mở "y lệnh ICU mới" trước khi ký xong.
8. **DNR / Code status** hiển thị banner xuyên suốt OR/ICU.
9. **Drip / vận mạch** đang chạy — danh sách "active drips" hiển thị trên handover.
10. **Pending lab/CDHA** liệt kê rõ ai sẽ follow-up (assignee).

## Data model

```
SURGERY_BOOKING
├── booking_id, encounter_id, patient_id
├── procedure_codes[] (ICD-PCS / CPT-VN)
├── surgeon_id, anesthesiologist_id, scrub_nurse_id[]
├── or_room_id, scheduled_start, actual_start, end_at
├── priority (ELECTIVE | URGENT | EMERGENCY)
├── side (LEFT | RIGHT | BILATERAL | NA), side_marking_photo_id
├── blood_reserve_units, antibiotic_protocol
├── status (REQUESTED..POSTPONED)
└── consent_signed_at, consent_pdf_id

TIME_OUT_LOG
├── booking_id, performed_at
├── checklist_items[] (id, label, checked, by)
├── signed_by[] (surgeon, anesthesia, nurse)
└── readiness_score (computed)

OR_OPERATION
├── booking_id
├── incision_at, closure_at, duration_min
├── instruments_count_before, _during, _after
├── gauze_count_before, _during, _after
├── blood_loss_ml, transfused_units[]
├── implants[] (UDI from bài 38)
├── specimens[] (sinh GPB order, bài 26)
├── narrative (biên bản tường trình)
└── signed_by[]

HANDOVER
├── id, from_encounter_id, to_encounter_id
├── from_unit, to_unit (ER | OR | PACU | ICU | WARD)
├── format (SBAR | IPASS)
├── content (jsonb với 4-5 sections)
├── pending_actions[] (assignee, due_at)
├── active_drips[], allergies, code_status
├── signed_by_from_at, signed_by_to_at
└── locked = true sau khi ký
```

## Integration patterns

### 1) HL7 v2 SIU (Scheduling Information Unsolicited)

`SIU^S12` (notification of new appointment) cho OR scheduling — đẩy vào màn lịch OR.

### 2) FHIR R4 — `Procedure`, `Encounter` lồng nhau

`Procedure.performedPeriod`, `partOf` linking encounter ER cha.

### 3) Real-time location (RTLS)

- Vòng tay BN có RFID → định vị trong viện.
- Khi BN sang OR → OR system tự cập nhật.
- Thiết bị (máy thở) cũng có RFID → biết đi với BN nào.

### 4) Anesthesia machine integration

Máy gây mê (Drager, GE) bắn dữ liệu sinh hiệu mỗi 1s qua HL7 v2 ORU → biểu đồ gây mê tự vẽ.

### 5) Pneumatic tube / robot vận chuyển

Bệnh phẩm patho từ OR → GPB qua ống khí nén; HIS gắn QR + tracking.

## Edge case

- **Mổ cấp cứu giữa đêm, kíp khác** — BS oncall đăng nhập từ nhà qua VPN; ký số bằng USB token tại chỗ.
- **Đổi BS giữa ca** — handover OR giữa 2 BS cùng kíp; ký nội bộ.
- **Mổ đa khoa** (chấn thương đa cơ quan) — nhiều booking song song trên 1 BN, share access.
- **Ngừng tim trong OR** → kích hoạt Code Blue trong OR; lưu rõ thời điểm ROSC.
- **Conversion** (mổ nội soi → mổ mở): cập nhật procedure_codes giữa chừng.
- **Mất kết nối mạng OR**: chế độ offline cache; sync khi back.
- **VIP / chính khách**: hệ thống view restricted; access log tăng cường.
- **Implant lỗi cần thu hồi (recall)**: tra UDI → tìm BN đã đặt → notify.

## Sai lầm thường gặp

- Handover bằng miệng / tờ giấy → mất y lệnh.
- Time Out chỉ là chữ ký giấy không log thực sự đầy đủ items.
- Không đếm gạc đầy đủ → RSI.
- Side marking chỉ ghi giấy, không ảnh → mổ nhầm bên.
- Active drips không truyền qua handover → ICU dừng vận mạch nhầm.
- ICU chấp nhận BN trước khi handover ký → nếu sau đó BS ER không ký → giả mất y lệnh.
- Patho mẫu mất nhãn → phải mổ lại để lấy lại.
- Implant không log UDI → không recall được.

## Output / Chứng từ

| Chứng từ | Khi nào | Pháp lý |
| --- | --- | --- |
| Cam kết phẫu thuật (ký số 2 bên) | pre-op | TT 49/2018 |
| Biên bản hội chẩn pre-op | mổ lớn ≥3 BS | Luật KCB 15/2023 |
| Time Out checklist | trước rạch | WHO + JCI |
| Biên bản tường trình PT | sau mổ | TT 49/2018 |
| eHandover SBAR (PDF) | mỗi handover | nội bộ + MRA |
| Phiếu đếm gạc/dụng cụ | sau mổ | TT 19/2013 (RSI) |
| Phiếu xét nghiệm patho | sau mổ nếu có mẫu | bài 26 |
| Báo cáo Implant + UDI | sau mổ | ND 36/2016 + 03/2024 (TTB y tế) |

## Checklist UAT

- [ ] Tạo surgery booking khẩn từ ER trong < 2 phút.
- [ ] Time Out 3 chữ ký số → block khởi mổ nếu thiếu.
- [ ] Side marking ảnh upload bắt buộc.
- [ ] Đếm gạc trước-trong-sau, mismatch → cảnh báo.
- [ ] Antibiotic dự phòng gợi ý theo procedure code.
- [ ] Máu cross-match check trước transfer OR.
- [ ] eHandover SBAR ký 2 bên — block ICU y lệnh trước ký.
- [ ] DNR banner xuyên suốt.
- [ ] Anesthesia machine bắn vital tự vẽ chart.
- [ ] RTLS cập nhật location BN realtime.
- [ ] Patho mẫu QR + tracking.
- [ ] Conversion mổ → cập nhật procedure_codes.
- [ ] Code Blue trong OR log đầy đủ.
- [ ] Implant log UDI, có recall trace.
- [ ] VIP access restricted + audit.

## KPI vận hành

| KPI | Mục tiêu |
| --- | --- |
| % handover ký số đầy đủ 2 bên | 100 % |
| Time Out compliance | 100 % |
| RSI (Retained Surgical Item) / 10k mổ | 0 |
| Wrong-site surgery / năm | 0 |
| Antibiotic prophylaxis on-time | > 95 % |
| OR utilization | 70–85 % |
| ICU LOS (avg) | tracking theo case-mix |
| Door-to-OR (ER khẩn) | < 60 phút |
| Mortality OR | tracking theo POSSUM |

## Cơ sở pháp lý áp dụng (2026)

- Luật KCB **15/2023/QH15** — hội chẩn, ký số.
- Luật GDĐT **20/2023/QH15** — chữ ký số đa bên.
- TT **49/2018/TT-BYT** — phẫu thuật, thủ thuật.
- TT **19/2013/TT-BYT** — quản lý chất lượng (RSI).
- TT **46/2018/TT-BYT** — bệnh án điện tử.
- NĐ **36/2016/NĐ-CP** + **03/2024/TT-BYT** — TTB y tế (UDI implant).
- WHO Surgical Safety Checklist 2009 (best practice).
- JCI 7th ed (international accreditation reference).

> **Bài tiếp theo:** Nội trú (IPD) — nhập viện và phân giường thông minh.
