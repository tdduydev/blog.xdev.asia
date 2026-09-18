---
id: 019f5a01-d000-7001-his0-000000000201
title: "Bài 3: Tiếp nhận bệnh nhân (Registration) — luồng nghiệp vụ end-to-end"
slug: bai-3-tiep-nhan-benh-nhan
description: >-
  Phân tích quy trình tiếp nhận bệnh nhân tại quầy: phân biệt khám dịch vụ —
  BHYT — yêu cầu, kiểm tra thẻ BHYT, tạo phiếu khám, chuyển vào hàng đợi
  phòng khám. Bám sát thực tế triển khai ở Việt Nam.
duration_minutes: 75
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-3-tiep-nhan-benh-nhan-banner.webp
video_url: null
sort_order: 1
section_title: "Phần 2: Tiếp nhận, MPI, Lịch hẹn"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![Tiếp nhận bệnh nhân — luồng dữ liệu MPI](/storage/uploads/2026/05/his/bai-3-tiep-nhan-benh-nhan-banner.webp)

## Mục tiêu

![Quầy tiếp nhận: thẻ CCCD/BHYT, định danh số, đăng ký vào HIS](/storage/uploads/2026/05/his/bai-3-tiep-nhan-benh-nhan-workflow.webp)

Hiểu trọn vẹn nghiệp vụ **tiếp nhận bệnh nhân (Registration / REG)** — bước cửa ngõ của mọi quy trình lâm sàng trong HIS. Mỗi sai sót ở đây sẽ "đi theo" bệnh nhân suốt chu kỳ điều trị: sai BHYT → từ chối thanh toán; trùng MPI → tách hồ sơ → tai biến điều trị; sai loại khám → sai bảng giá, sai báo cáo TT 32, sai XML giám định BHYT.

Mục tiêu cụ thể của bài này:

- Mô hình hoá đầy đủ **các loại tiếp nhận** đang dùng tại BV công/tư Việt Nam.
- Thiết kế **state machine của Encounter** đủ để xử lý mọi tình huống thực tế.
- Nắm các **rule nghiệp vụ then chốt** (BHYT thông tuyến, ưu tiên, miễn giảm) và biết viết test case kiểm tra.
- Thiết kế **data model REG/MPI** mức entity (chỉ ra trường nào bắt buộc, trường nào ràng buộc nghiệp vụ).
- Nắm các **integration pattern** với cổng giám định BHYT, VNeID/CCCD, Đơn thuốc Quốc gia.
- Có **bộ checklist UAT + KPI vận hành** sẵn sàng dùng cho dự án thật.

## Bối cảnh: vì sao tiếp nhận lại quan trọng

Trung bình một bệnh viện hạng I tại Việt Nam tiếp nhận 2.000–4.000 lượt khám/ngày, riêng BV như Bạch Mai, Chợ Rẫy có thể đến 6.000–8.000 lượt. Nếu thời gian tiếp nhận trung bình là 2 phút/lượt với 20 quầy → tổng tải hệ thống là 40 transaction/phút chỉ riêng REG. Mọi lỗi nhỏ (timeout cổng BHYT, in chậm, lệch dữ liệu MPI) đều khuếch đại nhanh thành ùn tắc thực tế.

Với HIS hiện đại, REG còn phải xử lý:

- **Đa kênh tiếp nhận song song**: quầy, kiosk, app/web, đặt lịch trước (xem bài 5), VNeID.
- **Đa loại đối tượng**: BHYT, dịch vụ, yêu cầu, miễn phí, người nước ngoài, BN nhi không CCCD.
- **Liên thông realtime**: BHYT, VNeID/CCCD, HSSK quốc gia, Đơn thuốc Quốc gia.
- **Tuân thủ pháp lý**: Luật KCB 15/2023 (Đ.66 quyền tiếp cận hồ sơ), Luật BHYT 51/2024 (thông tuyến tỉnh nội trú), Đề án 06.

## Các loại tiếp nhận

| Loại | Đặc điểm nghiệp vụ | Bảng giá áp dụng | Chứng từ |
| --- | --- | --- | --- |
| Khám dịch vụ | Tự trả phí, chọn bác sĩ / phòng khám | Giá DV của BV (HĐQT/GĐ phê duyệt) | Phiếu khám, phiếu thu tạm |
| Khám BHYT | Thẻ BHYT còn hạn; phân biệt đúng tuyến / thông tuyến / trái tuyến | Giá BHYT theo TT 39/2024-TT-BYT | Phiếu khám + log cổng GĐ BHYT |
| Khám yêu cầu | Dịch vụ cao cấp, chọn GS/PGS, phòng VIP | Giá yêu cầu (cao hơn DV) | Phiếu khám + bảng giá DV |
| Khám đoàn / công ty | Theo HĐ, thanh toán B2B | Giá theo HĐ | Phiếu khám + danh sách đoàn |
| Khám miễn phí | CSXH, công đoàn, đối tác, từ thiện | Giá 0 hoặc trợ giá | Phiếu khám + lý do miễn (kèm QĐ) |
| Cấp cứu | Tiếp nhận ngay, hoàn thiện thủ tục sau | Giá cấp cứu (phụ phí ngoài giờ) | Bệnh án cấp cứu (xem bài 10) |
| Người nước ngoài | Hộ chiếu thay CCCD; có/không có bảo hiểm quốc tế | Giá DV người nước ngoài | Phiếu khám + photo HC + visa |

> **Case study**: BV ĐK tỉnh X từng để chung 1 loại "khám yêu cầu" cho cả khám BS thường ngoài giờ và khám GS — đến khi quyết toán cuối năm, kế toán không tách được doanh thu để chia % cho GS, kiện tụng nội bộ kéo dài 6 tháng. **Bài học**: ngay từ REG đã phải mô hình hoá *bảng giá riêng cho mỗi loại tiếp nhận con*.

## Luồng nghiệp vụ chuẩn (chi tiết)

```
   [BN bước vào]
        │
        ▼
┌──────────────────┐
│ Quầy / Kiosk     │
└────────┬─────────┘
         │ quét CCCD (NFC) hoặc nhập tay
         ▼
┌──────────────────────────────┐
│ Tra MPI                      │
│  - Theo CCCD/BHYT/SĐT        │
│  - Fuzzy match họ tên+DOB    │
└──────┬──────────────┬────────┘
       │ MATCH        │ NO MATCH / multiple candidates
       │              ▼
       │       ┌──────────────┐
       │       │ Tạo MPI mới  │ ──► ghi golden_record_id
       │       └──────┬───────┘
       ▼              ▼
┌──────────────────────────────┐
│ Chọn loại khám               │
│  + nếu BHYT → gọi cổng GĐ    │
│  + nếu thẻ chưa cập nhật     │
│    → fallback CCCD + VSSID   │
└────────┬─────────────────────┘
         │ ok / từ chối / đang gián đoạn cổng
         ▼
┌──────────────────────────────┐
│ Phân tuyến + mức hưởng       │
└────────┬─────────────────────┘
         ▼
┌──────────────────────────────┐
│ Chọn phòng khám / chuyên khoa│
└────────┬─────────────────────┘
         ▼
┌──────────────────────────────┐
│ Sinh số TT (QMS)             │
│ + In phiếu khám có QR        │
│ + (tuỳ BV) thu phí trước     │
└────────┬─────────────────────┘
         ▼
   [Phòng khám / chờ]
```

### Bước 1: Tra cứu MPI

Tránh tạo trùng hồ sơ là yêu cầu sống còn. HIS phải tìm theo nhiều khoá xếp theo độ tin cậy:

1. **CCCD / VNeID** (chính xác cao, có chip NFC) — khoá ưu tiên 1 từ Đề án 06.
2. **Hộ chiếu** — cho người nước ngoài.
3. **Số thẻ BHYT** — cẩn thận: 1 người có thể đổi thẻ qua các năm, nên map nhiều thẻ về 1 MPI.
4. **SĐT đã xác thực OTP** — thường dùng cho BN tự đặt qua app.
5. **Họ tên + ngày sinh + giới tính + SĐT/địa chỉ** — fuzzy match khi không có ID.

Hệ thống nên cảnh báo "có thể trùng" khi có ≥ 2 trường khớp; chi tiết match-merge ở **Bài 4 — MPI**.

### Bước 2: Kiểm tra BHYT (cập nhật theo Luật BHYT 51/2024)

Gọi **cổng giám định BHYT** (gdbhyt.baohiemxahoi.gov.vn) để xác thực realtime:

- Mã thẻ + ngày hiệu lực (`TU_NGAY`, `DEN_NGAY`).
- Nơi đăng ký KCB ban đầu (`MA_DKBD`).
- Mức hưởng (`MUC_HUONG`): 80 / 95 / 100 %.
- Tình trạng thẻ (còn hiệu lực, bị khoá vì nợ BHXH, bị thu hồi).
- Lịch sử KCB 6 tháng (`LICH_SU_KCB`) — chống trục lợi (cùng ngày, cùng dịch vụ, nhiều BV).

Phân tuyến (cập nhật theo **Luật BHYT 51/2024**, hiệu lực 01/07/2025):

| Tình huống | Mức hưởng |
| --- | --- |
| Đúng tuyến (KCB ban đầu) | 100 % theo mức thẻ |
| Thông tuyến huyện toàn quốc — ngoại trú | 100 % theo mức thẻ |
| Thông tuyến tỉnh — nội trú toàn quốc | 100 % theo mức thẻ |
| Trái tuyến TW — nội trú | 40 % |
| Trái tuyến TW — ngoại trú | 0 % (BN tự trả) |
| Cấp cứu | Luôn coi như đúng tuyến |
| Một số bệnh hiếm/hiểm nghèo (theo danh mục BYT) | 100 % không phụ thuộc tuyến |

### Bước 3: Chọn phòng khám & sinh số QMS

Nguyên tắc thiết kế:

- 1 BN có thể có **nhiều encounter song song trong ngày** nhưng phải ở **các phòng khám khác nhau** (rule chống trùng).
- Số TT sinh từ **QMS service** (xem bài 6), gắn với (phòng khám × nhóm ưu tiên × ngày).
- Nhóm ưu tiên (theo **TT 14/2014/TT-BYT** + bộ tiêu chí JCI): cấp cứu chuyển sang > người có công > BN > 80 tuổi / dưới 6 tuổi / phụ nữ có thai > thường.
- Nếu BN có lịch hẹn (bài 5) → check-in QR sẽ tự gắn vào số TT đặt trước, không phải bốc lại.

## State machine của Encounter (đầy đủ)

```
          ┌─────────────┐
   ┌─────►│ REGISTERED  │
   │      └──┬──┬──┬────┘
   │         │  │  └─► CANCELED (lý do: BN bỏ về, sai thẻ…)
   │         │  ▼
   │         │ WAITING (ở QMS)
   │         │  │
   │         ▼  ▼
   │      ┌─────────────┐
   │      │ IN_EXAM     │ (đang khám)
   │      └──┬──────────┘
   │         │
   │         ▼
   │      ┌─────────────┐
   │      │ DONE_EXAM   │
   │      └──┬──┬───────┘
   │         │  ├─► REFERRED_INTERNAL (chuyển khoa nội bộ)
   │         │  ├─► ADMITTED (nhập viện — chuyển sang IPD)
   │         │  └─► REFERRED_EXTERNAL (chuyển tuyến — bài 14)
   │         ▼
   │      ┌─────────────┐
   │      │ BILLED      │ (đã chốt phí)
   │      └──┬──────────┘
   │         ▼
   │      ┌─────────────┐
   │      │ CLOSED      │ (encounter đóng, đẩy XML BHYT)
   │      └─────────────┘
   │
   └─────── REOPEN (chỉ Trưởng khoa + log audit, ví dụ bổ sung KQ XN trễ)
```

**Rule chuyển trạng thái** (vài rule then chốt):

- `REGISTERED → IN_EXAM`: phải có người gọi từ phòng khám (hoặc BS bấm "vào khám"); không cho nhảy thẳng nếu chưa qua WAITING (trừ cấp cứu).
- `DONE_EXAM → BILLED`: phải có **đầy đủ chỉ định + kết quả** (không cho chốt phí khi còn order PENDING).
- `BILLED → CLOSED`: bắt buộc khi cuối ngày (job batch) để đẩy giám định BHYT.
- `CLOSED → REOPEN`: chỉ Trưởng khoa/KHTH, log audit kèm lý do, không quá 7 ngày từ ngày đóng.

## Quy tắc nghiệp vụ then chốt (chi tiết)

1. **Không cho phép sửa loại khám** sau khi đã phát sinh chỉ định / phiếu thu — chỉ huỷ và lập lại (audit log lý do, người duyệt).
2. **Không cho phép tiếp nhận trùng** cùng phòng khám trong cùng ngày trừ khi BS ghi chú "tái khám trong ngày".
3. **BHYT trái tuyến ngoại trú TW** → mặc định không hưởng; HIS khoá nút "áp BHYT" (nhân viên không bypass được — cần Trưởng phòng KHTH).
4. **Trẻ < 6 tuổi không có thẻ BHYT** vẫn KCB miễn phí — HIS lưu giấy khai sinh số (theo Đề án 06) + flag `under6_no_card = true` → quyết toán BHYT có XML riêng.
5. **Người có công, người nghèo, dân tộc thiểu số vùng KK** → mức hưởng 100 % + miễn cùng chi trả; HIS phải kéo từ cổng GĐ BHYT, không tự nhập.
6. **Phiếu khám phải có mã QR** chứa `encounter_id` (ngắn, hash) để LIS/RIS/Pharmacy quét.
7. **Đối tượng cấp cứu chuyển sang** → encounter cấp cứu (bài 10) merge vào encounter nội/ngoại trú, không tạo MPI mới.
8. **Người nước ngoài** không có CCCD → MPI gắn `passport_no + nationality`; encounter có flag `foreigner = true` để báo cáo TT 32 tách riêng.
9. **Một thẻ BHYT — nhiều lượt KCB cùng ngày**: tối đa 1 lượt cùng chuyên khoa (rule giám định BHXH); nếu BN có lý do hợp lý (vd. khám 2 chuyên khoa khác nhau trong ngày) → lưu lý do, chấp nhận.
10. **Bảo mật PHI tại quầy** (NĐ 13/2023): màn hình quầy không hiện đầy đủ chẩn đoán cũ cho BN khác đứng kế bên — UI phải mask.

## Data model REG/Encounter (mức entity)

```
PATIENT (MPI master)
├── patient_id (PK, ULID)
├── national_id (CCCD, unique nullable)
├── passport_no (unique nullable)
├── full_name, dob, gender
├── phone (verified flag)
├── address (commune/district/province codes — chuẩn TCVN)
├── ethnicity, occupation, religion
├── insurance_card_no (current)
├── consent_phi_share (bool, NĐ 13/2023)
└── created_at, last_visit_at

ENCOUNTER
├── encounter_id (PK)
├── patient_id (FK)
├── encounter_type (OPD | IPD | ER | DAYCARE | OBS)
├── service_type (BHYT | DV | YC | DOAN | MIENPHI | NN)
├── insurance_snapshot (JSON: thẻ, mức hưởng, tuyến, response cổng)
├── department_id (phòng khám / khoa)
├── doctor_id (assigned)
├── queue_no, priority_level
├── status (REGISTERED | WAITING | IN_EXAM | DONE_EXAM | BILLED | CLOSED | CANCELED | REOPEN)
├── chief_complaint, triage_level (nếu ER)
├── source (COUNTER | KIOSK | APP | APPOINTMENT)
├── opened_at, closed_at
└── created_by, last_updated_by (audit)

INSURANCE_VERIFICATION_LOG
├── encounter_id (FK)
├── card_no, request_payload, response_payload
├── verified_at, valid (bool), reason_if_invalid
└── operator_id

ENCOUNTER_PRIORITY_REASON
├── encounter_id, priority_code, evidence_doc_id
```

> **Tip**: trường `insurance_snapshot` lưu **bản sao đầy đủ response cổng BHYT lúc tiếp nhận** — sống còn khi BHXH xuất toán 6 tháng sau, BV vẫn chứng minh được "lúc đó thẻ hợp lệ".

## Integration patterns

### 1) Cổng giám định BHYT (BHXH)

- Giao thức: HTTPS + token (mỗi BV được cấp `username/password` + IP whitelist).
- API chính: `KIEM_TRA_THE`, `LICH_SU_KCB_5798`, `TIEP_NHAN_4210`.
- Mẫu phản hồi: JSON với `maKetQua`, `MaThe`, `MucHuong`, `NgayHetHan`...
- **Pattern**: gọi đồng bộ + cache 24h cho cùng thẻ (nếu cổng down, fallback cache + flag `pending_recheck`).

### 2) VNeID / CCCD chip (Đề án 06)

- Đầu đọc NFC tại quầy → đọc dữ liệu chip CCCD (họ tên, DOB, ảnh, vân tay nếu được uỷ quyền).
- API VNeID: xác thực mức 2 (BN scan QR app VNeID) — dùng cho check-in mobile.
- Map `CCCD ↔ MPI`; nếu trùng nhiều MPI → escalate merge (bài 4).

### 3) HL7 v2 ADT — A04 (Register Patient)

Sau khi REG xong, HIS bắn message **ADT^A04** sang LIS/RIS/Pharmacy/EMR để các module subscribe biết "có encounter mới":

```
MSH|^~\&|HIS|BVH|LIS|LAB|20260512083512||ADT^A04|MSG00123|P|2.5
EVN|A04|20260512083512
PID|1||0001234567^^^MPI||NGUYEN^VAN^AN||19850515|M|||123 Le Loi^^Q1^HCM
PV1|1|O|OPD-NOIA^P301||||BS001^TRAN^MINH|||MED|||||REG||||SELF
IN1|1|BHYT|HS40010012345678|BHXH HCM||||20260101|20261231|80
```

### 4) FHIR R4 — `Patient.$match` + `Encounter`

Khi tích hợp với HIE / HSSK (bài 46), dùng:

- `POST /Patient/$match` (FHIR Operation) để tìm BN ở các BV khác.
- Tạo `Encounter` resource với `class = AMB | EMER | IMP`, `status = arrived`.

## Sai lầm thường gặp khi triển khai

- **"Tạo nhanh" hồ sơ** mà không tra MPI → sinh trùng hàng loạt; sau 2–3 năm có MPI có 5–10 hồ sơ trùng cùng 1 BN.
- **Không log response cổng BHYT** → khi BHXH xuất toán, không có chứng cứ → BV chịu thiệt.
- **Cho sửa thông tin BHYT sau khi đã chốt phiếu** → sai lệch XML 4210 / QĐ 130/QĐ-BYT 2023.
- **Mặc định mức hưởng = 80%** khi cổng BHYT timeout → khi cổng phục hồi không reconcile lại.
- **Đặt loại khám ở UI dropdown duy nhất, không chia tab** → nhân viên click nhầm, nhất là khám yêu cầu vs dịch vụ.
- **Không có offline mode**: cổng BHYT down 30 phút → 20 quầy đứng → BN ùn tắc; phải có chế độ "tiếp nhận tạm, recheck sau".
- **In phiếu không có QR** → nhân viên LIS/Pharmacy nhập tay encounter_id → sai số.
- **Không bảo vệ PHI tại quầy** (màn hình hướng ra phía BN) → vi phạm NĐ 13/2023.

## Output / Chứng từ

| Chứng từ | Khi nào in | Lưu ý pháp lý |
| --- | --- | --- |
| Phiếu khám bệnh | Mọi encounter | Bắt buộc có QR + số TT, đóng dấu BV |
| Phiếu thu tạm | Khi thu trước | KHÔNG phải HĐĐT (HĐĐT in lúc chốt phí cuối) |
| Phiếu hướng dẫn | Khi BN mới | Sơ đồ phòng khám, hướng đi |
| Bản sao response BHYT | Khi BN yêu cầu / nội bộ | Lưu trong DB, không thường in |

## Checklist UAT (mẫu)

- [ ] Tra MPI bằng CCCD: tìm đúng BN có sẵn, không tạo trùng.
- [ ] Tra MPI fuzzy: nhập sai 1 ký tự tên → vẫn ra kết quả "có thể trùng".
- [ ] Quét NFC chip CCCD: tự fill form đăng ký.
- [ ] BHYT đúng tuyến → mức hưởng đúng, thu = 0 đối với DV cơ bản.
- [ ] BHYT trái tuyến TW ngoại trú → khoá nút "áp BHYT".
- [ ] Cổng BHYT timeout → fallback offline, encounter lưu `pending_recheck`.
- [ ] Trẻ < 6 tuổi không có thẻ → encounter ghi nhận miễn phí + giấy KS.
- [ ] Tiếp nhận trùng cùng phòng khám trong ngày → bị chặn.
- [ ] Huỷ encounter sau khi đã in phiếu thu → có log lý do, người duyệt.
- [ ] Chuyển từ ngoại trú sang nội trú → encounter merge, không tạo MPI mới.
- [ ] Tải đỉnh (load test): 200 transaction/phút trong 10 phút, không drop.

## KPI vận hành (cho Trưởng phòng KHTH)

| KPI | Mục tiêu | Cách đo |
| --- | --- | --- |
| Thời gian tiếp nhận trung bình | ≤ 90 giây / BN | Timestamp `WAITING - REGISTERED` |
| Tỷ lệ tiếp nhận lỗi (BHYT từ chối) | ≤ 1 % | Đếm encounter có `insurance_invalid = true` |
| Tỷ lệ MPI trùng phát hiện sau 30 ngày | ≤ 0.2 % | Job match-merge cuối tháng |
| Tỷ lệ encounter `CLOSED` cuối ngày | 100 % | Job EOD |
| Tỷ lệ có ảnh / chữ ký BN | ≥ 95 % | Đo từ MPI |
| Mean Time To Recover khi cổng BHYT down | ≤ 5 phút | Monitoring |

## Cơ sở pháp lý áp dụng (cập nhật 2026)

- Luật KCB **15/2023/QH15** — Đ.66 quyền tiếp cận hồ sơ.
- Luật BHYT **25/2008/QH12** sửa đổi **51/2024/QH15** (hiệu lực 01/07/2025) — thông tuyến tỉnh nội trú.
- NĐ **75/2023/NĐ-CP** — sửa đổi NĐ 146/2018 hướng dẫn Luật BHYT.
- NĐ **13/2023/NĐ-CP** — bảo vệ dữ liệu cá nhân (PHI).
- QĐ **130/QĐ-BYT 2023** — chuẩn dữ liệu đầu ra HIS phục vụ giám định BHYT.
- QĐ **06/QĐ-TTg 2022** — Đề án 06 (định danh CCCD/VNeID).
- TT **39/2024/TT-BYT** — giá DV KCB BHYT (cập nhật).

> **Bài tiếp theo:** Master Patient Index — chống trùng hồ sơ, fuzzy matching, merge/unmerge và liên thông MPI giữa các cơ sở.
