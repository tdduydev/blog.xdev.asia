---
id: 019f5a01-d000-7001-his0-000000000701
title: "Bài 17: LIS — luồng xét nghiệm end-to-end"
slug: bai-17-lis-luong-xet-nghiem
description: >-
  Order LIS, lấy mẫu, dán nhãn barcode, vận chuyển, chạy máy, validate kết
  quả, trả về EMR. Critical value & delta check.
duration_minutes: 60
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-17-lis-luong-xet-nghiem-banner.webp
video_url: null
sort_order: 1
section_title: "Phần 7: Xét nghiệm (LIS)"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![LIS — luồng xét nghiệm end-to-end](/storage/uploads/2026/05/his/bai-17-lis-luong-xet-nghiem-banner.webp)

## Tổng quan luồng LIS

![Mẫu máu từ lấy → analyzer → kết quả với critical value](/storage/uploads/2026/05/his/bai-17-lis-luong-xet-nghiem-workflow.webp)


## Mục tiêu bài học

- Nắm trọn luồng LIS: order → lấy mẫu → vận chuyển → analyzer → validate → trả kết quả → critical value.
- Hiểu **barcode workflow** giảm sai sót định danh mẫu (SID — Specimen ID).
- Triển khai **delta check** và **autoverification** đúng cách.
- Quản lý **critical value** theo JCI và Thông tư 49/2018/TT-BYT.
- Tích hợp HIS ↔ LIS qua HL7 OML/ORU và các pitfall thường gặp.

## Bối cảnh: tại sao xét nghiệm là "mỏ vàng" lỗi định danh

Theo các báo cáo IQM (IFCC) và CAP, **trên 60% lỗi trong toàn bộ chu trình xét nghiệm xảy ra ở pha pre-analytical**: nhầm bệnh nhân, nhầm ống, vỡ mẫu, đông mẫu. LIS hiện đại không chỉ là "phần mềm chạy máy" mà phải bảo vệ toàn bộ chu trình.

## Vòng đời mẫu xét nghiệm

```
[BS đặt order trong HIS]
     |  HL7 ORM^O01 hoặc FHIR ServiceRequest
     v
[LIS sinh accession #] ── in nhãn barcode ──> [Điều dưỡng/KTV lấy mẫu]
     |                                                   |
     |  scan barcode tại bedside                         |
     v                                                   v
[Specimen Tracking: collected, in_transit, received]
     |
     v
[Pre-analytical check] (vỡ, đông, đủ thể tích)
     |
     v
[Analyzer chạy] ── HL7 OUL^R22/ASTM ──> [LIS validate]
     |                                       |
     |          Auto-verify nếu pass rule    |
     |          + delta check                |
     |                                       v
     +─────────────────────────> [Sign by lab specialist]
                                             |
                                             v
                                  [Result → HIS qua HL7 ORU^R01]
                                             |
                       Critical value? ──Yes──> [Call protocol]
```

## Barcode & Specimen ID

- **Specimen ID (SID)** ≠ Order ID. Một order có thể sinh nhiều SID nếu cần nhiều ống (CTM, đông máu, sinh hoá).
- Dán nhãn **tại bedside** sau khi xác nhận BN bằng 2 định danh (tên + năm sinh, hoặc wristband barcode).
- LIS phải sinh nhãn theo **tiêu chuẩn nội bộ + HIBC/Code128**; tốt nhất 2D (Data Matrix) cho ống nhỏ.
- Mỗi scan phải log: ai scan, khi nào, ở đâu (qua wifi AP / mobile device id).

## Thiết kế bảng cốt lõi

```sql
CREATE TABLE lab_orders (
  order_id     UUID PRIMARY KEY,
  encounter_id UUID,
  patient_id   UUID,
  panel_code   VARCHAR(32),    -- CBC, CHEM7, COAG
  priority     VARCHAR(16),    -- ROUTINE|URGENT|STAT
  status       VARCHAR(16),
  ...
);

CREATE TABLE lab_specimens (
  sid          VARCHAR(20) PRIMARY KEY,        -- barcode
  order_id     UUID REFERENCES lab_orders,
  container    VARCHAR(32),                    -- EDTA|SST|CITRATE
  collected_at TIMESTAMPTZ,
  collected_by UUID,
  received_at  TIMESTAMPTZ,
  received_by  UUID,
  rejected     BOOLEAN DEFAULT false,
  reject_reason TEXT,
  status       VARCHAR(16)                     -- COLLECTED|IN_TRANSIT|RECEIVED|REJECTED|RUN|RESULTED
);

CREATE TABLE lab_results (
  id           BIGSERIAL PRIMARY KEY,
  sid          VARCHAR(20) REFERENCES lab_specimens,
  test_code    VARCHAR(16),                    -- LOINC hoặc nội bộ
  value_num    NUMERIC,
  value_text   TEXT,
  unit         VARCHAR(16),
  ref_low      NUMERIC,
  ref_high     NUMERIC,
  flag         VARCHAR(8),                     -- L|H|LL|HH|N
  status       VARCHAR(16),                    -- PRELIM|FINAL|AMENDED
  resulted_at  TIMESTAMPTZ,
  validated_by UUID,
  delta_flag   BOOLEAN,
  is_critical  BOOLEAN
);
```

## Auto-verification & Delta Check

**Auto-verify** = kết quả tự "lên" bệnh án nếu thoả mãn:

- Nằm trong **technical limits** của analyzer (không hit limit).
- Không có flag QC fail (control giờ trước OK).
- Không quá ngưỡng critical.
- Không vượt quá **delta** so với kết quả trước trong N ngày.

Ví dụ delta cho creatinine: nếu Cr hôm nay > 1.5× Cr 7 ngày trước → KHÔNG auto-verify, cần KTV xem lại (có thể nhầm BN, nhầm ống, hoặc tổn thương thận cấp thực sự).

LIS tốt thường auto-verify được **70-85%** kết quả; phần còn lại là "review queue" cho KTV chuyên trách.

## Critical Value — quy trình bắt buộc

**Critical (panic) value** là kết quả nguy hiểm tính mạng phải báo BS trong thời gian quy định (thường ≤ 30 phút).

Ví dụ thường gặp:
- K+ < 2.8 hoặc > 6.2 mmol/L
- Glucose < 2.5 hoặc > 22 mmol/L
- Hb < 7 g/dL (hoặc < 6 với người lớn ổn định, tuỳ BV)
- Tiểu cầu < 20 hoặc > 1000 G/L
- INR > 5 (BN đang dùng warfarin)

**Quy trình** (Thông tư 49/2018/TT-BYT về quản lý chất lượng XN):

1. LIS gắn cờ `is_critical = true` ngay khi validate.
2. Bắn alert đỏ vào HIS ở tab BS điều trị + popup nếu BS đang online.
3. Đồng thời gọi điện trực tiếp cho BS/điều dưỡng phụ trách.
4. Người nhận **read-back** giá trị, KTV ghi nhận tên người nhận và thời gian.
5. Lưu trong `critical_value_log` để audit.

## HL7 v2 — message thực tế

Order in (HIS → LIS) — `ORM^O01`:

```
MSH|^~\&|HIS|BV01|LIS|LAB|20260512090000||ORM^O01|001|P|2.5.1
PID|||PT0001234^^^BV01^MR||TRAN^THI B||19751201|F
ORC|NW|ORD-555^HIS|||||^^^20260512100000^^R
OBR|1|ORD-555^HIS||CBC^Cong thuc mau^L|||20260512090000
```

Result out (LIS → HIS) — `ORU^R01`:

```
MSH|^~\&|LIS|LAB|HIS|BV01|20260512100530||ORU^R01|002|P|2.5.1
PID|||PT0001234^^^BV01^MR
OBR|1|ORD-555^HIS||CBC^Cong thuc mau^L|||20260512090000|||||||||||||F
OBX|1|NM|HGB^Hemoglobin^L||6.2|g/dL|13-17|LL|||F|||20260512100500
OBX|2|NM|WBC^White blood cell^L||12.5|G/L|4-10|H|||F
NTE|1||Critical low Hb, called Dr Nam at 10:06
```

## Sai lầm phổ biến trong tích hợp HIS-LIS

- **Không truyền giới tính/tuổi/BN diagnosis** → analyzer không tính được ref range theo tuổi/giới.
- **SID dùng lại** sau 1 năm → nhầm kết quả lịch sử.
- **Auto-verify quá lỏng** (chỉ check ref range) → bỏ sót lỗi BN.
- **Critical value chỉ gửi qua HL7 mà không gọi điện** — sai luật chất lượng.
- **In nhãn ngoài bedside** (in tại điều dưỡng → mang vào phòng BN) — nguy cơ nhầm BN.
- **Không dùng container check** — nhân viên cắm ống EDTA cho XN đông máu, máy cho kết quả nhưng sai sinh học.

## Output bài học

- Vẽ chu trình mẫu trên giấy, đánh dấu các điểm scan barcode.
- Hiểu sự khác nhau Order ID vs Specimen ID.
- Đặt được rule auto-verify và delta check phù hợp BV của bạn.
- Viết được spec critical value workflow đầy đủ.

## Checklist UAT

- [ ] Order LIS sinh đúng SID theo panel.
- [ ] Scan SID lúc lấy mẫu → status `COLLECTED`.
- [ ] Reject mẫu vỡ → BS được báo trong < 5 phút.
- [ ] Delta check: Cr lần này = 1.6× lần trước → vào review queue, không auto-verify.
- [ ] Critical Hb < 7 → cờ đỏ HIS + log gọi điện.
- [ ] Amend kết quả → giữ version cũ, bắn thông báo BS.
- [ ] Mất mạng tạm thời: LIS queue lại, gửi đủ khi phục hồi.

## KPI

| KPI | Ngưỡng |
| --- | --- |
| TAT (turn-around time) STAT XN cơ bản | ≤ 60 phút |
| TAT routine | ≤ 4h |
| % auto-verify | 70-85% |
| % mẫu reject pre-analytical | < 2% |
| Critical value reported < 30' | ≥ 99% |
| Sai lệch SID ↔ patient | 0 |

## Cơ sở pháp lý 2026

- **Thông tư 49/2018/TT-BYT** — quản lý chất lượng XN, yêu cầu critical value, IQC, EQA.
- **Thông tư 01/2013/TT-BYT** (sửa đổi) — tiêu chuẩn phòng XN.
- **Quyết định 130/QĐ-BHXH/2024** — XN phải có order_id, mã LOINC/mã DV BHYT đúng.
- **ISO 15189:2022** — hệ thống chất lượng phòng XN y tế (nhiều BV đang theo).

## Bài tiếp

Bài 18 sẽ đi vào vi sinh — luồng dài ngày, kháng sinh đồ và AMS (chương trình quản lý kháng sinh).
