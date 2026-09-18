---
id: 019f5a01-d000-7001-his0-000000001002
title: "Bài 26: Vật tư tiêu hao, BHYT phẫu thuật & giải phẫu bệnh"
slug: bai-26-vat-tu-bhyt-gpb
description: >-
  Quản lý vật tư cấy ghép (implant), gói phẫu thuật BHYT, theo dõi mẫu giải
  phẫu bệnh từ phòng mổ → khoa GPB → kết quả.
duration_minutes: 45
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-26-vat-tu-bhyt-gpb-banner.webp
video_url: null
sort_order: 2
section_title: "Phần 10: Phòng mổ (Surgery)"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![Vật tư phòng mổ, BHYT & giải phẫu bệnh](/storage/uploads/2026/05/his/bai-26-vat-tu-bhyt-gpb-banner.webp)

## Vật tư tiêu hao & cấy ghép

![Đếm vật tư surgery và đóng gói mẫu GPB](/storage/uploads/2026/05/his/bai-26-vat-tu-bhyt-gpb-workflow.webp)


## Mục tiêu bài học

- Quản lý vật tư tiêu hao (VTTH) và **vật tư cấy ghép** trong phòng mổ với đầy đủ lot/serial/expiry.
- Áp dụng đúng **gói phẫu thuật BHYT** theo Thông tư 13/2019 (sửa đổi 2024) và Thông tư 39/2018 về định mức.
- Liên thông phòng mổ ↔ khoa Giải phẫu bệnh (GPB): từ lấy mẫu, vận chuyển, xử lý, đọc kết quả.
- Truy vết "wrist-band BN ↔ vật tư cấy ghép ↔ mẫu GPB" — yêu cầu khi bị kiện.
- Báo cáo BHYT đúng cấu trúc XML 4210 cho phẫu thuật và xét nghiệm GPB.

## Bối cảnh: tiền lớn nằm ở VTTH và cấy ghép

- Một ca thay khớp háng: implant chiếm 60-70% chi phí; sai lot/sai mã → BHYT xuất toán toàn bộ implant.
- Stent động mạch vành, máy tạo nhịp, valve tim — đều phải có **truy vết duy nhất theo serial**, lưu trong EMR BN trọn đời.
- Mẫu GPB thất lạc giữa OR và lab → "không kết luận được" → tranh chấp pháp lý.
- BV không có module VTTH gắn ca mổ → chốt phí thủ công, sai sót 3-7%.

## Vật tư tiêu hao & cấy ghép

| Loại | Truy vết | Lưu EMR | Báo cáo BHYT |
| --- | --- | --- | --- |
| Tiêu hao thường (gạc, chỉ, găng) | theo lô | tổng theo ca | trong gói PT |
| Vật tư đặc biệt (dao laser, harmonic, energy) | theo lô | có | tách dòng |
| Cấy ghép (implant, stent, valve, mesh) | **serial duy nhất** | trọn đời | tách dòng, có chứng từ |
| Máu, chế phẩm máu | mã túi máu | trọn đời (transfusion record) | bảng riêng |

Quy tắc HIS:

- Mỗi case mổ có "consumption sheet" — điều dưỡng vòng ngoài ghi nhận thực dùng.
- Cấy ghép phải scan **barcode trên hộp** + chụp ảnh chứng từ; HIS gắn vào case.
- Đối soát cuối ca: Sign-Out không pass nếu chênh lệch dự trù vs thực dùng > 10% mà không có ghi chú.

## Gói phẫu thuật BHYT

Theo TT 13/2019 (sửa đổi TT 21/2024):

- Mỗi mã PT/TT có **giá gói** đã bao gồm một số VTTH cơ bản (gạc, chỉ tiêu hao chuẩn).
- VTTH "ngoài gói" và **cấy ghép** thanh toán riêng theo bảng giá vật tư BYT (TT 04/2017 sửa đổi 2024).
- HIS phải tự phân loại "trong gói" / "ngoài gói" khi xuất hoá đơn — sai phân loại = BHXH xuất toán.

```sql
CREATE TABLE surgery_consumable (
  case_id     uuid REFERENCES surgery_case,
  item_code   varchar(50),
  lot_no      varchar(50),
  serial_no   varchar(100),     -- bắt buộc với cấy ghép
  qty         numeric,
  unit_price  numeric,
  bhyt_status varchar(20),      -- IN_PACKAGE/OUT_PACKAGE/IMPLANT
  bhyt_code   varchar(20),      -- mã BHYT vật tư
  recorded_by uuid REFERENCES staff,
  recorded_at timestamptz
);

CREATE TABLE implant_registry (
  implant_id    uuid PRIMARY KEY,
  patient_id    uuid REFERENCES patient,   -- truy vết trọn đời
  case_id       uuid REFERENCES surgery_case,
  device_type   varchar(50),
  manufacturer  varchar(200),
  model         varchar(100),
  serial_no     varchar(100) NOT NULL,
  lot_no        varchar(50),
  expiry_date   date,
  implanted_at  timestamptz,
  removal_at    timestamptz,
  removal_reason text
);
```

## Liên thông phòng mổ ↔ GPB

```
Mổ → lấy mẫu → cốc formol có nhãn (BN, vị trí, BS lấy)
           │
           │ Tạo "phiếu yêu cầu GPB" trong HIS, in tem barcode
           ▼
Phòng GPB nhận → quét barcode → grossing → đúc nến → cắt → nhuộm → đọc
           │
           │ BS GPB ký số trả kết quả
           ▼
Kết quả về EMR BN + thông báo BS lâm sàng + cập nhật chẩn đoán cuối
```

Quy tắc bắt buộc:

- Mỗi cốc mẫu có ≥ 2 mã định danh (BN + vị trí lấy + thời gian).
- Vận chuyển có **chain-of-custody** — ai bàn giao, ai nhận, ký nhận điện tử.
- Mẫu cấy không được trộn lẫn — mỗi cốc là một accession riêng.
- Kết quả GPB là tài liệu pháp lý — phải ký số PKI, không ai xoá được.

## Data model GPB tối thiểu

```sql
CREATE TABLE pathology_request (
  request_id  uuid PRIMARY KEY,
  case_id     uuid REFERENCES surgery_case,
  patient_id  uuid REFERENCES patient,
  specimens   jsonb,        -- list[{site, fixative, count}]
  clinical_info text,
  requesting_doctor uuid,
  requested_at timestamptz,
  status      varchar(20)   -- REQUESTED/RECEIVED/PROCESSING/REPORTED
);

CREATE TABLE pathology_report (
  report_id    uuid PRIMARY KEY,
  request_id   uuid REFERENCES pathology_request,
  gross_desc   text,
  microscopic  text,
  diagnosis    text,
  icd_o3       varchar(10),  -- mã hình thái học ung thư
  staging      varchar(50),  -- TNM
  reported_by  uuid,
  signed_at    timestamptz,
  signature_hash varchar(128)
);
```

## Tích hợp HL7

- **HL7 v2 ORM^O01** từ HIS (bác sĩ chỉ định) → LIS GPB.
- **HL7 v2 ORU^R01** trả kết quả GPB về HIS.
- **FHIR DiagnosticReport** + **Specimen** + **Observation** cho liên thông EMR.
- Báo cáo ung thư nội bộ → **Hệ thống đăng ký ung thư** (Bộ Y tế đang triển khai theo QĐ 1514/QĐ-BYT/2022).

## Sai lầm thường gặp

1. Cho điều dưỡng nhập VTTH theo trí nhớ sau ca → sai 5-10% → BHXH xuất toán.
2. Không scan serial implant → không truy vết được khi recall của hãng.
3. Mẫu GPB ghi tay nhãn → đọc nhầm BN.
4. Báo cáo BHYT trộn "trong gói" và "ngoài gói" → từ chối toàn bộ.
5. Kết quả GPB lưu Word/PDF không ký số → không có giá trị pháp lý.
6. Không có chain-of-custody mẫu → tranh chấp không có chứng cứ.

## Output / Deliverables

- Module consumption sheet realtime trong OR.
- Implant registry trọn đời gắn EMR BN.
- Module GPB end-to-end với barcode + ký số.
- Báo cáo XML 4210 BHYT với đúng phân loại VTTH.
- Báo cáo recall implant — khi hãng thông báo serial bị thu hồi, HIS list được BN ảnh hưởng.

## UAT checklist

- [ ] Quét hộp implant → autofill serial, lot, expiry.
- [ ] Xuất hoá đơn ca mổ — VTTH ngoài gói tách dòng đúng theo TT 13/2019.
- [ ] Mẫu GPB chuyển khoa khác — chain-of-custody đầy đủ.
- [ ] Kết quả GPB BS chưa ký số → không hiển thị trong EMR.
- [ ] Recall serial X → tra ra danh sách BN đã cấy ghép.
- [ ] Báo cáo XML 4210 phẫu thuật pass schema BHXH.

## KPI

| Chỉ số | Mục tiêu |
| --- | --- |
| % ca có consumption sheet đủ | 100% |
| % implant có serial trong EMR | 100% |
| Sai khác phí ca mổ vs thực tế | ≤ 1% |
| Thời gian trả kết quả GPB thường | ≤ 5 ngày làm việc |
| GPB ký số PKI | 100% |
| Mẫu GPB thất lạc | 0 |

## Cơ sở pháp lý 2026

- **Thông tư 13/2019/TT-BYT** (sửa đổi TT 21/2024) — danh mục, giá PT/TT.
- **Thông tư 04/2017/TT-BYT** (sửa đổi TT 27/2024) — danh mục vật tư BHYT.
- **Thông tư 39/2018/TT-BYT** — định mức kinh tế kỹ thuật.
- **Thông tư 46/2018/TT-BYT** — bệnh án điện tử (lưu trữ implant trọn đời).
- **Thông tư 32/2023/TT-BYT** — hồ sơ bệnh án.
- **Quyết định 1514/QĐ-BYT/2022** — đăng ký ung thư quốc gia.
- **Luật KCB 15/2023/QH15** — Điều 49 truy vết trang thiết bị y tế cấy ghép.
- **Nghị định 98/2021/NĐ-CP** + **NĐ 07/2023** + **NĐ 96/2023** — quản lý trang thiết bị y tế.
