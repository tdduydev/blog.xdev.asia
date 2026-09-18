---
id: 019f5a01-d000-7001-his0-000000000501
title: "Bài 12: Nội trú (IPD) — nhập viện & phân giường"
slug: bai-12-noi-tru-nhap-vien-phan-giuong
description: >-
  Quy trình nhập viện nội trú: lệnh nhập viện, phân giường theo khoa/loại
  giường, tạm ứng viện phí, hồ sơ bệnh án nội trú, theo dõi diễn biến.
duration_minutes: 60
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-12-noi-tru-nhap-vien-phan-giuong-banner.webp
video_url: null
sort_order: 1
section_title: "Phần 5: Nội trú (IPD)"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![Nội trú — nhập viện & phân giường](/storage/uploads/2026/05/his/bai-12-noi-tru-nhap-vien-phan-giuong-banner.webp)

## Mục tiêu

![Phân giường theo bản đồ trống/đầy thời gian thực](/storage/uploads/2026/05/his/bai-12-noi-tru-nhap-vien-phan-giuong-workflow.webp)

Nội trú (IPD) là module **đắt nhất, phức tạp nhất** của HIS — chiếm 60–70 % chi phí của BV nhưng chỉ 10–15 % lượt KCB. Mỗi BN nội trú trung bình 5–8 ngày, sinh ra 200–500 record (y lệnh, sinh hiệu, lab, thuốc, phí). Module IPD tốt phải:

- Quản lý **danh mục giường/khoa/loại** với bản đồ trực quan.
- Cấp phép nhập viện đúng quy chế (lệnh BS + xác nhận điều dưỡng).
- Theo dõi **diễn biến hằng ngày** (rounding) + sinh hiệu eVital.
- Quản lý **tạm ứng viện phí** + cảnh báo nợ.
- Tích hợp y lệnh, eMAR (bài 13), ra viện (bài 14).
- Tuân thủ TT 18/2022 (HSBA), TT 32/2023.

## Bối cảnh

- BV TW Bạch Mai 2.300 giường, công suất 100–110 % thường xuyên.
- BV TW Chợ Rẫy 3.200 giường, IPD turnover ~700/ngày.
- Tỷ lệ ghép giường (2 BN/giường) ở BV quá tải gây phiền toái UI.
- Loại giường: thường, dịch vụ, VIP, ICU level 1/2/3, sản, nhi sơ sinh, cách ly áp lực âm.
- BHYT trả theo **DRG / case-mix** đang được thí điểm — module IPD phải xuất được dữ liệu này (xem bài 16).

> **Case study**: BV ĐK tỉnh K trước dùng giấy phân giường — trùng giường 5–10 lần/ngày, quay đầu giường 2.1 ngày. Sau eIPD: trùng = 0, quay đầu 1.4 ngày, công suất giường +12 %.

## Khái niệm giường & danh mục

| Thuộc tính | Giải thích |
| --- | --- |
| `bed_id` | mã duy nhất, vd. NOI-A-01 |
| `room_id` | phòng (phòng 305) |
| `ward_id`, `dept_id` | khoa nội tổng hợp |
| `bed_type` | THUONG / DV / VIP / ICU1 / ICU2 / ICU3 / NHI / SOSINH / CACHLY |
| `gender_restriction` | NA / MALE / FEMALE / NEONATE |
| `tariff_per_day` | giá/ngày theo TT 39/2024 + DV |
| `equipment[]` | monitor, máy thở, ECG |
| `status` | EMPTY / OCCUPIED / RESERVED / CLEANING / OUT_OF_SERVICE |
| `last_cleaned_at` | sau ra viện 30–60 phút |

## Luồng nhập viện

```
[BS OPD/ER quyết định nhập viện]
        │
        ▼
[Tạo "Lệnh nhập viện" — ICD chính, khoa đích, mức độ]
        │
        ▼
[Coordinator IPD nhận → check giường trống]
        │
        ├─► [Trống] → reserve giường, gán BN
        ├─► [Hết] → đợi / chuyển khoa khác / borrowed bed
        │
        ▼
[Tạm ứng viện phí] (BHYT có thể bỏ qua tạm ứng theo TT 22/2023)
        │
        ▼
[Đeo vòng tay BN có barcode/QR]
        │
        ▼
[Lập HSBA nội trú: bệnh án, phiếu y lệnh, phiếu chăm sóc, phiếu sinh hiệu]
        │
        ▼
[Encounter IPD ADMITTED]
```

## State machine bed + IPD encounter

### Bed
```
EMPTY → RESERVED → OCCUPIED → CLEANING → EMPTY
        ↘ CANCELED              ↘ OUT_OF_SERVICE → MAINTENANCE → EMPTY
```

### IPD Encounter
```
[ADMIT_ORDERED] → [ADMITTED] → [IN_TREATMENT (rounding daily)]
                                    │
                                    ├─► [TRANSFER_INTERNAL] (chuyển khoa, đổi bed)
                                    ├─► [TRANSFER_OUT_REFER] (chuyển tuyến — bài 14)
                                    ├─► [DISCHARGE_REQUESTED]
                                    │       │
                                    │       └─► [DISCHARGED] (ra viện — bài 14)
                                    ├─► [LEAVE_AMA] (ra viện theo nguyện vọng)
                                    └─► [DECEASED] → giấy báo tử
```

## Quy tắc nghiệp vụ

1. **Lệnh nhập viện** phải có: ICD chính, khoa đích, BS chỉ định, lý do; thiếu → từ chối tạo encounter.
2. **Phân giường theo gender_restriction** — nam/nữ không chung phòng (trừ nhi sơ sinh).
3. **Bed reservation timeout** 2 giờ — quá thời gian → release.
4. **Borrowed bed** (mượn giường khoa khác) cần Trưởng khoa cho duyệt + flag.
5. **Tạm ứng tối thiểu**: BHYT 5 % dự kiến phí, dịch vụ 30–50 % tuỳ ca; ngoại lệ cấp cứu.
6. **Cảnh báo nợ**: nếu phí phát sinh > tạm ứng × 1.2 → thông báo BN/người nhà.
7. **Vòng tay BN** in QR encounter_id + tên + DOB + dị ứng + nhóm máu (mask hoá HIV/HBV).
8. **Diễn biến hằng ngày** bắt buộc ghi (BS rounding); thiếu 24h → cảnh báo Trưởng khoa.
9. **Sinh hiệu nội trú** lấy 2–4 lần/ngày tuỳ cấp độ (ICU realtime).
10. **DRG mapping** mỗi case lúc xuất viện (bài 16).

## Data model

```
WARD / DEPARTMENT (master)
├── ward_id, dept_id, name, head_doctor_id
└── bed_capacity

BED
├── bed_id, room_id, ward_id, type, gender_restriction
├── tariff_per_day, equipment[]
├── status (EMPTY..OUT_OF_SERVICE)
├── current_encounter_id (nullable)
├── reserved_until (nullable)
└── last_cleaned_at, cleaning_status

IPD_ENCOUNTER
├── encounter_id (PK), patient_id, visit_id
├── admit_order_id, admit_at, admit_doctor_id, admit_diagnosis_icd
├── department_id, attending_doctor_id, primary_nurse_id
├── bed_id (current), bed_history[] (id, from, to)
├── status (ADMIT_ORDERED..DECEASED)
├── deposit_total, charges_total, balance
├── allergy_summary, blood_type, dnr_flag
├── isolation_type (NONE | CONTACT | DROPLET | AIRBORNE | PROTECTIVE)
└── discharge_at, discharge_disposition

DAILY_PROGRESS_NOTE
├── id, encounter_id, note_at, note_by (BS)
├── subjective, objective, assessment, plan (SOAP)
└── signed_at

BED_TRANSFER
├── id, encounter_id, from_bed, to_bed
├── reason, requested_by, approved_by, transferred_at

DEPOSIT
├── id, encounter_id, amount, paid_at, method
├── invoice_id, refund_amount
```

## Integration patterns

### 1) HL7 ADT^A01 (Admit), A02 (Transfer), A03 (Discharge)

```
MSH|^~\&|HIS|BVH|EMR|EMR|20260512110000||ADT^A01|MSGA001|P|2.5
PID|||MPI001234||NGUYEN^VAN^AN||19850515|M
PV1|1|I|NOI-A^P305^B01|||| BS_NOIA|||MED|||||ADM||||
DG1|1|J18.0|Viêm phổi||W
```

### 2) FHIR R4 `Encounter`, `Location`

`Encounter.class = IMP`, `Encounter.location.location = Location/bed-NOI-A-01`, `period.start`.

### 3) Bed map UI realtime

Frontend dùng SSE/WebSocket từ topic `bed.changed` — kéo thả BN giữa giường (drag-drop) → bắn `BED_TRANSFER`.

### 4) Liên kết kế toán

Mỗi đêm 24:00 sinh phí giường tự động cho encounter còn ADMITTED.

### 5) IoT vital monitoring (ICU)

Máy monitor Philips/Mindray bắn HL7 ORU mỗi 1–5 giây → store Time-Series DB (Timescale/Influx) → dashboard ICU.

## Edge case

- **Ghép giường** (2 BN/giường) ở BV quá tải: cho phép `bed.capacity > 1`; hiển thị 2 row.
- **BN từ chối phân giường** (đòi giường VIP nhưng hết): ghi nhận, đợi giường VIP trống.
- **Cách ly áp lực âm** thiếu giường → escalate đến Y vụ + báo CDC tỉnh.
- **BN trẻ sơ sinh** sinh ra trong viện → tạo MPI mới (đôi khi), gắn IPD encounter mẹ + bé.
- **Borrowed bed**: khoa Tim mượn giường khoa Nội — BS quản lý theo khoa Tim, giường thuộc khoa Nội (chia phí ra sao? thường theo BS chỉ định).
- **BN bỏ trốn (LWA - left without authorization)**: encounter close `LWA` + báo công an nếu nguy hiểm.
- **Outbreak cùm/ noro**: bulk move BN sang khu cách ly.
- **Khoa đóng (sửa chữa)**: tạm thời `OUT_OF_SERVICE` các giường + chuyển BN.

## Sai lầm thường gặp

- Phân giường theo Excel ngoài hệ thống → trùng giường, mất doanh thu.
- Không cảnh báo `gender_restriction` → nam nữ chung phòng → khiếu nại.
- Bed status không update khi BN chuyển khoa → giường "hồn ma".
- Không có cleaning status → BN mới vào giường chưa lau.
- Tạm ứng nhỏ + không cảnh báo nợ → cuối kỳ thu hồi không được.
- Vòng tay không có QR → ĐD identify sai BN, sai liều.
- Diễn biến chỉ ghi 1 lần/tuần → BHXH xuất toán.
- IoT monitor không lưu time-series → không truy hồi được spike.

## Output / Chứng từ

| Chứng từ | Khi nào | Pháp lý |
| --- | --- | --- |
| Lệnh nhập viện | trước ADMIT | TT 46/2018 |
| Vòng tay BN có QR | lúc ADMIT | nội bộ + JCI |
| HSBA nội trú (gồm 12+ phiếu) | suốt encounter | TT 18/2022 + TT 46 |
| Phiếu sinh hiệu | hằng ngày | TT 18 |
| Phiếu chăm sóc ĐD | hằng ca | TT 31/2021 |
| Phiếu tạm ứng | mỗi lần thu | TT 39/2024 |
| Bed map snapshot | EOD | nội bộ |

## Checklist UAT

- [ ] Tạo lệnh nhập viện → encounter ADMIT_ORDERED.
- [ ] Coordinator chọn giường trống → reserved 2h.
- [ ] BN không vào trong 2h → release.
- [ ] Phân nam vào phòng nữ → block.
- [ ] BHYT nhập viện → tạm ứng tối thiểu 5 %.
- [ ] Vòng tay in QR + dị ứng + nhóm máu (mask HIV).
- [ ] Bed map drag-drop chuyển giường → BED_TRANSFER + log.
- [ ] HL7 ADT^A01/A02/A03 bắn đúng.
- [ ] Borrowed bed có flag, cần Trưởng khoa duyệt.
- [ ] Phí giường tự sinh 24:00.
- [ ] Cảnh báo nợ khi phí > 1.2x tạm ứng.
- [ ] ICU monitor bắn vital realtime, lưu time-series.
- [ ] Diễn biến thiếu 24h → cảnh báo Trưởng khoa.
- [ ] Outbreak: bulk move 10 BN sang khu cách ly trong 1 thao tác.
- [ ] LWA → encounter close + báo công an nếu nguy hiểm.

## KPI vận hành

| KPI | Mục tiêu |
| --- | --- |
| Bed turnover (ngày) | < 2 |
| Bed occupancy | 75–90 % (>95 % nguy hiểm) |
| Avg LOS theo case-mix | tracking |
| % HSBA đầy đủ ký số khi ra viện | 100 % |
| % diễn biến hằng ngày đủ | > 99 % |
| % tạm ứng đủ 5%/30% | > 95 % |
| Re-admission 30 ngày | < 5 % |
| Nosocomial infection rate | tracking theo CDC |
| Bed map accuracy (real-time) | 100 % |

## Cơ sở pháp lý áp dụng (2026)

- Luật KCB **15/2023/QH15** — bệnh án nội trú.
- Luật BHYT **51/2024/QH15** + NĐ **75/2023** — thông tuyến tỉnh.
- TT **18/2022/TT-BYT** — quản lý HSBA.
- TT **31/2021/TT-BYT** — chăm sóc người bệnh.
- TT **46/2018/TT-BYT** — bệnh án điện tử.
- TT **39/2024/TT-BYT** — giá DV.
- TT **22/2023/TT-BYT** — tạm ứng viện phí BHYT.
- TT **32/2023/TT-BYT** — báo cáo thống kê.
- NĐ **13/2023/NĐ-CP** — PHI.

> **Bài tiếp theo:** Y lệnh điện tử (CPOE), eMAR và 5 Right an toàn dùng thuốc.
