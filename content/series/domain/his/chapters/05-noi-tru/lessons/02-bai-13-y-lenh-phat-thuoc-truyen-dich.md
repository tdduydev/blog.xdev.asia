---
id: 019f5a01-d000-7001-his0-000000000502
title: "Bài 13: Y lệnh hàng ngày, phát thuốc & truyền dịch nội trú"
slug: bai-13-y-lenh-phat-thuoc-truyen-dich
description: >-
  Vòng đời y lệnh nội trú (CPOE): kê — duyệt — chia liều — phát — thực hiện
  — ghi nhận. eMAR, 5 đúng (Right) khi phát thuốc, ghi nhận truyền dịch.
duration_minutes: 60
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-13-y-lenh-phat-thuoc-truyen-dich-banner.webp
video_url: null
sort_order: 2
section_title: "Phần 5: Nội trú (IPD)"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![Y lệnh điện tử — eMAR & 5 Right](/storage/uploads/2026/05/his/bai-13-y-lenh-phat-thuoc-truyen-dich-banner.webp)

## Mục tiêu

![Điều dưỡng quét vòng tay BN trước khi cho thuốc](/storage/uploads/2026/05/his/bai-13-y-lenh-phat-thuoc-truyen-dich-workflow.webp)

Y lệnh nội trú (CPOE) + eMAR (electronic Medication Administration Record) là **lớp an toàn lâm sàng quan trọng nhất** của HIS. Sai sót thuốc là nguyên nhân #1 gây tai biến điều trị (Institute of Medicine ước 7.000 tử vong/năm tại Mỹ chỉ riêng vì sai thuốc). Module này phải:

- CPOE: BS kê y lệnh điện tử có chữ ký số, không qua giấy.
- 7 Right (mở rộng từ 5 Right): đúng BN, đúng thuốc, đúng liều, đúng đường, đúng giờ, đúng tài liệu, đúng lý do.
- Quét vòng tay BN + QR thuốc trước cho liều (BCMA - Barcode Medication Administration).
- Truyền dịch: theo dõi tốc độ, dấu hiệu thoát mạch.
- CDS: tương tác thuốc, dị ứng, liều theo cân nặng/eGFR (chi tiết bài 23).
- Audit log đầy đủ cho thanh tra.

## Bối cảnh

- BV TW: 200–600 lời y lệnh/ngày/khoa; tổng 5.000–15.000 lời y lệnh/ngày.
- Sai sót thuốc tỉ lệ 5–10 % nếu giấy; giảm xuống 1–3 % với CPOE; < 0.5 % với BCMA.
- TT 23/2011-TT-BYT (Hồ sơ bệnh án) + TT 31/2021 (chăm sóc) quy định ghi y lệnh.
- TT 22/2024-TT-BYT (kê đơn) — chú ý đặc biệt thuốc gây nghiện, hướng thần (Phụ lục I, II).
- Đơn thuốc Quốc gia (donthuocquocgia.vn) — bắt buộc liên thông cho thuốc kê đơn từ 2024.

> **Case study**: BV TW thấy tỉ lệ sai liều aminoglycoside (gentamicin) cao ở BN > 70 tuổi. Sau khi triển khai CDS dose-by-eGFR + BCMA → giảm 78 %.

## Vòng đời y lệnh (Order Lifecycle)

```
[BS kê (CPOE)]
     │
     ▼
[CDS check: dị ứng, tương tác, liều, contraindication]
     │
     ├─► hard stop → BS phải sửa hoặc override + lý do
     ▼
[Ký số BS]
     │
     ▼
[Pharmacy duyệt (clinical pharmacist review)]
     │
     ├─► reject → trả lại BS
     ▼
[Chia liều theo lịch] (dose schedule per shift)
     │
     ▼
[Kho dược cấp phát theo cabinet ward / Pyxis]
     │
     ▼
[ĐD chuẩn bị: 7 Right + BCMA scan]
     │
     ▼
[Cho BN dùng + ghi nhận eMAR + thời gian thực]
     │
     ▼
[Theo dõi đáp ứng / phản ứng phụ]
     │
     ▼
[Lặp đến hết liệu trình hoặc Stop order]
```

## State machine y lệnh

```
[DRAFT] → [SIGNED] → [PHARMACY_REVIEW] → [PHARMACY_APPROVED] → [DISPENSED]
                                                                      │
                                                                      ▼
                                                              [SCHEDULED]
                                                                      │
                                                                      ▼
                                          [PREPARED] → [ADMINISTERED] → [DOCUMENTED]
                                                              │
                                                              ├─► [REFUSED] (BN từ chối)
                                                              ├─► [HELD] (giữ liều, lý do)
                                                              └─► [MISSED] (qua giờ)

[STOPPED] / [DISCONTINUED] (BS dừng, lý do)
```

## 7 Right + BCMA

| Right | Cách kiểm |
| --- | --- |
| 1. Đúng BN | Quét QR vòng tay → so sánh với encounter trên màn |
| 2. Đúng thuốc | Quét QR/Datamatrix trên gói thuốc → so với y lệnh |
| 3. Đúng liều | HIS tự tính liều/cân nặng/eGFR → so với y lệnh |
| 4. Đúng đường (route) | PO/IV/IM/SC/PR/INH; mismatch → cảnh báo |
| 5. Đúng thời gian | Lệch ±30 ph cảnh báo, ±60 ph block |
| 6. Đúng tài liệu (document) | eMAR ghi nhận đầy đủ trước khi đóng phiên |
| 7. Đúng lý do (indication) | Y lệnh có ICD link + clinical reason |

## Truyền dịch (IV infusion)

- Tốc độ (rate ml/h), thể tích còn lại (volume left), thời gian dự kiến hoàn tất (ETA).
- Tích hợp **smart pump** (BBraun, Baxter, Carefusion) qua HL7/FHIR — pump nhận tham số từ y lệnh, ĐD bấm xác nhận.
- Cảnh báo thoát mạch (extravasation) — quan sát mỗi 1h, ghi vào eMAR.
- Thuốc nguy cơ cao (high-alert): KCl, heparin, insulin, vận mạch — cần 2 ĐD kiểm tra độc lập (double-check).

## Quy tắc nghiệp vụ

1. **Không có y lệnh giấy** — toàn bộ qua CPOE; ngoại lệ Code Blue (ghi sau trong 4h).
2. **CDS hard-stop** với: dị ứng đã biết, tương tác cấp 1 (contraindicated), trùng thuốc, vượt liều tối đa.
3. **Pharmacist review bắt buộc** trước dispense (trừ ER bundle).
4. **High-alert med** có warning đỏ + double-check ĐD.
5. **Thuốc gây nghiện / hướng thần** (Phụ lục I, II TT 22/2024) — sổ riêng, đếm cuối ca, có chứng kiến.
6. **Stop order** mỗi 7 ngày tự động cảnh báo BS đánh giá lại (PRN time-out).
7. **Không cho ĐD bypass BCMA** — exception cần Trưởng khoa.
8. **Liều bỏ qua > 2 lần** → cảnh báo BS.
9. **Nhịn ăn (NPO)** trước phẫu thuật → tự dừng PO meds, gợi ý IV thay.
10. **Liên thông Đơn thuốc QG** cho thuốc kê đơn ngoại trú lúc ra viện (bài 22).

## Data model

```
ORDER (kế thừa, mở rộng cho thuốc)
├── order_id, encounter_id
├── type = DRUG
├── medication_id (FK Drug master)
├── dose, dose_unit (UCUM), route, frequency (BID/TID/QID/q6h/PRN)
├── duration_days, total_doses
├── start_at, stop_at
├── icd_link[] (lý do)
├── status, cds_warnings[], cds_overrides[]
├── high_alert (bool), narcotic_class
└── prescribed_by, signed_at

DOSE_SCHEDULE
├── id, order_id, due_at, dose, status (PENDING | DUE | GIVEN | HELD | MISSED | REFUSED)
├── given_at, given_by, route_actual
├── bcma_patient_scan_ok, bcma_drug_scan_ok
├── double_check_by (high-alert)
└── note

EMAR_ENTRY (audit trail)
├── id, dose_schedule_id, action (ADMINISTER | HOLD | REFUSE | MISS | OVERRIDE)
├── reason, performed_by, performed_at
└── attached_observations[] (BP after antihypertensive)

INFUSION_LOG
├── id, order_id, started_at, paused_at[], resumed_at[], ended_at
├── pump_id, rate_ml_h, volume_total, volume_given
├── extravasation_check[] (time, status)
└── nurse_id

NARCOTIC_LEDGER
├── id, drug_id, balance_before, balance_after
├── action (RECEIVED | DISPENSED | RETURNED | WASTED)
├── encounter_id (nếu DISPENSED), witnessed_by
└── timestamp
```

## Integration patterns

### 1) HL7 v2 RDE^O11 (Pharmacy/Treatment Encoded Order)

```
MSH|^~\&|HIS|BVH|PHARM|PHARM|20260512120000||RDE^O11|MSGRX001|P|2.5
PID|||MPI001234||NGUYEN^VAN^AN
PV1|1|I|NOI-A^P305^B01
ORC|NW|RX0099||GROUP01|||1^BID^^20260512120000^^R||20260512120000|BS_NOIA
RXE|^BID&Q12H^^20260512120000^^R|PARACETAMOL_500MG^Paracetamol 500mg|500||MG|TAB|||||10|TAB|||||||||||||||||||PO
```

### 2) HL7 v2 RAS^O17 (Administration)

ĐD bắn về sau khi cho thuốc — eMAR ghi nhận.

### 3) FHIR R4 — `MedicationRequest`, `MedicationAdministration`

Chuẩn cho liên thông HSSK / HIE.

### 4) Smart pump integration

Pump nhận parameters từ HIS (drug, dose, rate); ĐD scan + xác nhận. Pump bắn về log truyền dịch.

### 5) Cabinet ward (Pyxis / Omnicell)

- BS kê y lệnh → cabinet "unlock" thuốc cho BN đó.
- ĐD nhập PIN + lấy thuốc → log audit.

### 6) Đơn thuốc Quốc gia

- Ra viện: thuốc ngoại trú liên thông Đơn thuốc QG (donthuocquocgia.vn) — gửi mã đơn để pharmacy ngoài có thể tra.

## Edge case

- **Liều theo cân nặng (mg/kg)** + cân nặng thay đổi (BN giảm cân) → CDS recompute hằng ngày.
- **eGFR thay đổi** → liều aminoglycoside / vancomycin tính lại.
- **PRN (khi cần)**: ĐD đánh giá triệu chứng → cho liều, ghi rõ lý do.
- **Stat order** (cấp): bypass schedule, dùng ngay, log riêng.
- **Hold liều** (vd. HA thấp trước thuốc hạ áp): ghi lý do, BS biết.
- **Refused** (BN từ chối): không ép, ghi rõ + báo BS.
- **Double-check** với 2 ĐD: yêu cầu cả 2 quét ID + ký.
- **Cabinet hết thuốc lúc due** → escalate, mượn cabinet khoa khác.
- **BN tự mang thuốc** (home med): ghi vào medication reconciliation, không cho dùng nếu không xác minh.
- **Ngừng đột ngột** (vd. opioid dài ngày) → cảnh báo taper.

## Sai lầm thường gặp

- Cho phép ĐD nhập thay BS bấm "xác nhận hộ" → mất tính pháp lý.
- BCMA bypass dễ → tỉ lệ sai BN tăng.
- CDS soft-warning không log override → không cải tiến.
- Smart pump nhập tay → sai rate dễ.
- Narcotic không sổ riêng → mất tracking.
- Liều theo cân nặng không recompute → quá liều khi BN giảm cân.
- HL7 RAS bắn đôi → eMAR ghi 2 lần liều → kế toán tính phí 2 lần.
- Liên thông Đơn thuốc QG bị skip → sai luật.

## Output / Chứng từ

| Chứng từ | Khi nào | Pháp lý |
| --- | --- | --- |
| Phiếu y lệnh ngày | hằng ngày | TT 23/2011, TT 18/2022 |
| eMAR (PDF/A) | mỗi ca | TT 31/2021 |
| Sổ thuốc gây nghiện/hướng thần | mỗi ca | TT 20/2017 + TT 22/2024 |
| Phiếu truyền dịch | mỗi lần | TT 31/2021 |
| Đơn thuốc liên thông QG | xuất viện | TT 22/2024 + NĐ 88/2023 |

## Checklist UAT

- [ ] BS kê y lệnh, CDS check dị ứng + tương tác.
- [ ] Hard-stop khi dị ứng đã biết.
- [ ] Ký số BS → SIGNED.
- [ ] Pharmacist review → APPROVED.
- [ ] Cabinet unlock đúng thuốc + BN.
- [ ] BCMA scan vòng tay sai BN → block.
- [ ] BCMA scan thuốc sai → block.
- [ ] High-alert (KCl) → double-check 2 ĐD.
- [ ] Narcotic ledger giảm số dư + chứng kiến.
- [ ] Smart pump nhận parameters từ HIS.
- [ ] Truyền dịch ETA hiện realtime.
- [ ] Extravasation check 1h ghi nhận.
- [ ] PRN: ĐD ghi lý do, BS thấy.
- [ ] HOLD/REFUSE → ghi lý do, audit.
- [ ] Stop order tự cảnh báo sau 7 ngày.
- [ ] HL7 RDE/RAS bắn đúng.
- [ ] Đơn ra viện liên thông Đơn thuốc QG.

## KPI vận hành

| KPI | Mục tiêu |
| --- | --- |
| Sai sót thuốc / 1000 liều | < 1 |
| BCMA compliance | > 98 % |
| CPOE compliance (vs giấy) | > 99 % |
| Pharmacist review trong < 30 ph | > 95 % |
| Liều quá giờ (MISSED) | < 1 % |
| High-alert double-check | 100 % |
| Narcotic discrepancy / tháng | 0 |
| Đơn thuốc QG liên thông success | > 99 % |

## Cơ sở pháp lý áp dụng (2026)

- Luật KCB **15/2023/QH15** — y lệnh điện tử, ký số.
- Luật Dược **105/2016/QH13** + sửa đổi.
- TT **22/2024/TT-BYT** — kê đơn (thay TT 52/2017).
- TT **20/2017/TT-BYT** — thuốc gây nghiện, hướng thần (cập nhật theo TT 22/2024).
- TT **04/2024/TT-BYT** — danh mục thuốc thiết yếu.
- TT **23/2011/TT-BYT** — HSBA (mẫu phiếu y lệnh).
- TT **31/2021/TT-BYT** — chăm sóc người bệnh.
- TT **18/2022/TT-BYT** — quản lý HSBA.
- NĐ **88/2023/NĐ-CP** — sửa NĐ 54/2017 dược.
- ISMP Best Practices for Hospitals (high-alert medications).

> **Bài tiếp theo:** Ra viện, chuyển viện và tóm tắt bệnh án (CCD).
