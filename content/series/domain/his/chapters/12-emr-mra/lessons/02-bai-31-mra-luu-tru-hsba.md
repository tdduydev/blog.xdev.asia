---
id: 019f5a01-d000-7001-his0-000000001202
title: "Bài 31: Lưu trữ HSBA (MRA) — số hoá & truy xuất"
slug: bai-31-mra-luu-tru-hsba
description: >-
  Phòng Kế hoạch tổng hợp & Lưu trữ HSBA: quy trình mượn — trả, scan giấy
  cũ, số hoá phim, OCR, gắn metadata, kho lạnh / kho điện tử.
duration_minutes: 40
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-31-mra-luu-tru-hsba-banner.webp
video_url: null
sort_order: 2
section_title: "Phần 12: EMR & lưu trữ HSBA"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![MRA — lưu trữ HSBA hết liệu trình](/storage/uploads/2026/05/his/bai-31-mra-luu-tru-hsba-banner.webp)

## Vai trò MRA (Medical Records Archive)

![Phòng lưu trữ HSBA giấy + vault điện tử](/storage/uploads/2026/05/his/bai-31-mra-luu-tru-hsba-workflow.webp)


## Mục tiêu bài học

- Hiểu vai trò **Medical Records Archive (MRA)** — phòng lưu trữ HSBA giấy & điện tử.
- Triển khai số hoá HSBA tồn (back-scanning) đạt chuẩn pháp lý.
- Quy hoạch hạ tầng lưu trữ điện tử: WORM storage, hash chain, retention policy.
- Quy trình **mượn — trả** HSBA cho BS, BHXH, toà án, viện kiểm sát.
- Đảm bảo retention: **HSBA thường 10 năm**, **HSBA tử vong 30 năm**, **HSBA tâm thần/HIV 30 năm**, một số trường hợp vĩnh viễn.

## Bối cảnh: kho HSBA — "căn phòng tốn diện tích nhất BV"

- BV 1000 giường, hoạt động 20 năm = ~3 triệu HSBA giấy = 3-5 km kệ tài liệu.
- Tỉ lệ thất lạc HSBA giấy: 2-7%/năm (không tìm thấy khi BN tái khám/BHXH thanh tra).
- Số hoá back-scan tốn tiền, nhưng tiết kiệm dài hạn: 1 HSBA giấy = 200-500 đồng/năm chi phí lưu, scan rồi giảm còn 50 đồng/năm.
- Nguyên tắc: **không scan đại trà rồi huỷ giấy** — BYT yêu cầu giữ giấy gốc cho HSBA pre-EMR.

## Vai trò MRA (Medical Records Archive)

1. Quản lý **vòng đời HSBA**: tạo → đang điều trị → hậu xuất viện → lưu trữ → tiêu huỷ.
2. Đảm bảo **truy xuất nhanh** khi BN tái khám, BHXH thanh tra, toà án triệu tập.
3. Quản lý **mượn — trả** với chain-of-custody.
4. Số hoá HSBA cũ + lưu kho điện tử đạt chuẩn.
5. Tiêu huỷ đúng quy định khi hết retention (có hội đồng + biên bản).

## Quy trình mượn — trả HSBA

```
Yêu cầu mượn (BS, BHXH, Toà, BN trích lục)
   │
   │ HIS tạo phiếu mượn, MRA duyệt
   ▼
MRA lấy HSBA → quét barcode → cập nhật trạng thái LOANED
   │
   │ Người mượn nhận, ký số/giấy
   ▼
Sử dụng (giới hạn thời gian: BS 7 ngày, BHXH 30 ngày, Toà tuỳ)
   │
   │ Hoàn trả → MRA quét, đối chiếu, lưu lại
   ▼
Trạng thái IN_STOCK
```

Quy tắc:

- HSBA pre-EMR cho mượn theo bản gốc giấy hoặc bản scan có chữ ký số MRA xác nhận.
- HSBA EMR-only: cho phép xem online theo phân quyền, không cần "mượn vật lý".
- Quá hạn không trả → cảnh báo trưởng khoa + chặn mượn HSBA mới.

## Hạ tầng lưu trữ điện tử

| Yêu cầu | Giải pháp |
| --- | --- |
| Bất biến (không sửa được) | WORM storage hoặc S3 Object Lock + hash chain |
| Toàn vẹn | SHA-256 mỗi file + Merkle tree định kỳ |
| Sẵn sàng | RPO ≤ 15 phút, RTO ≤ 4h |
| Backup 2 site | DC chính + DR (cách ≥ 100km) |
| Retention | metadata tự xoá khi hết 10 năm (HSBA tử vong: 30) |
| Mã hoá | AES-256 at-rest + TLS in-transit |
| Audit | mọi truy cập đều log: ai, khi, file gì, IP |
| Pháp lý | chữ ký số dài hạn (LTV) — refresh trước khi cert hết hạn |

## Số hoá HSBA tồn (back-scanning)

Quy trình chuẩn:

1. **Chuẩn bị:** tháo ghim, sắp xếp, đếm trang, gắn barcode HSBA.
2. **Scan:** máy ADF, độ phân giải 300dpi B&W (chữ in), 600dpi color (siêu âm/cardiogram).
3. **Indexing:** đọc OCR + nhập tay metadata (mã BN, ngày vào/ra, khoa, chẩn đoán).
4. **QC:** 5-10% lô được kiểm tra bởi MRA — đối chiếu giấy gốc.
5. **Ký số gói:** mỗi HSBA scan đóng gói PDF/A + ký số MRA → đảm bảo pháp lý.
6. **Lưu kho điện tử + giữ giấy gốc** (chưa được huỷ giấy theo quy định hiện hành 2026).

```sql
CREATE TABLE archive_record (
  archive_id        uuid PRIMARY KEY,
  patient_id        uuid REFERENCES patient,
  encounter_id      uuid REFERENCES encounter,
  record_type       varchar(20),    -- INPATIENT/OUTPATIENT/EMERGENCY
  paper_location    varchar(50),    -- kệ-ngăn-hộp
  paper_status      varchar(20),    -- IN_STOCK/LOANED/SCANNED_RELEASED/DESTROYED
  electronic_uri    text,           -- URI tới object trên WORM
  electronic_sha256 char(64),
  signed_at         timestamptz,
  signature_hash    varchar(128),
  retention_until   date,           -- ngày được phép tiêu huỷ
  destroyed_at      timestamptz,
  destruction_minutes_id uuid       -- biên bản tiêu huỷ
);

CREATE TABLE archive_loan (
  loan_id      uuid PRIMARY KEY,
  archive_id   uuid REFERENCES archive_record,
  borrower_id  uuid,
  borrower_role varchar(20),
  reason       text,
  loaned_at    timestamptz,
  due_date     date,
  returned_at  timestamptz
);

CREATE TABLE archive_access_log (
  log_id       uuid PRIMARY KEY,
  archive_id   uuid,
  user_id      uuid,
  action       varchar(20),    -- VIEW/DOWNLOAD/PRINT/EXPORT
  client_ip    inet,
  occurred_at  timestamptz
);
```

## Retention bắt buộc

| Loại HSBA | Thời hạn |
| --- | --- |
| HSBA thường (nội/ngoại trú) | 10 năm sau ngày kết thúc điều trị |
| HSBA tử vong | 30 năm |
| HSBA bệnh nghề nghiệp | 30 năm |
| HSBA tâm thần | 30 năm |
| HSBA HIV/AIDS | 30 năm |
| Hồ sơ phẫu thuật cấy ghép | trọn đời BN + 10 năm |
| Sổ trực, biên bản hội chẩn | 10 năm |
| Phim X-quang/CT | 10 năm (DICOM trên PACS) |

Hết retention → **hội đồng huỷ HSBA** (có đại diện BV + Sở YT) lập biên bản, ký duyệt giám đốc, tiêu huỷ giấy + xoá metadata.

## Sai lầm thường gặp

1. Số hoá rồi huỷ giấy gốc khi chưa được phép → vi phạm Luật Lưu trữ.
2. Lưu file PDF trên NAS thường không có WORM → có thể bị sửa, mất giá trị pháp lý.
3. Không tracking mượn — trả → HSBA mất, không truy được.
4. Backup chỉ 1 site → cháy phòng máy = mất tất cả.
5. Cert ký số hết hạn không refresh → 5 năm sau không verify được.
6. Chính sách retention 1 size fits all 10 năm → vi phạm cho HSBA tử vong/tâm thần (30 năm).

## Output / Deliverables module MRA

- Module mượn — trả HSBA điện tử với phiếu QR/barcode.
- Hệ thống lưu trữ WORM + hash chain + LTV signature.
- Workflow back-scanning end-to-end.
- Báo cáo retention: HSBA sắp đến hạn huỷ, danh sách HSBA đã huỷ.
- Báo cáo truy cập (audit) cho thanh tra Sở YT/Bộ YT.

## UAT checklist

- [ ] Mượn HSBA quá hạn → cảnh báo trưởng khoa, chặn mượn mới.
- [ ] Tệp HSBA điện tử thay đổi 1 byte → hash chain phát hiện ngay.
- [ ] Cert PKI hết hạn → cảnh báo trước 90 ngày, có quy trình refresh LTV.
- [ ] Truy cập HSBA tử vong sau 30 năm → vẫn xem được, nhưng đã có quyết định huỷ.
- [ ] Báo cáo truy cập 1 BN cụ thể trong 1 năm → ra đầy đủ user/IP/thời gian.
- [ ] Trích lục HSBA bằng PDF có chữ ký số xác nhận của MRA.

## KPI

| Chỉ số | Mục tiêu |
| --- | --- |
| % HSBA tìm thấy khi yêu cầu (giấy) | ≥ 99% |
| % HSBA scan có ký số MRA | 100% |
| RPO/RTO | ≤ 15 phút / ≤ 4h |
| % HSBA quá hạn mượn | ≤ 1% |
| Sự cố hash chain mismatch | 0 |
| Số lần thanh tra phát hiện vi phạm | 0 |

## Cơ sở pháp lý 2026

- **Luật Khám bệnh, Chữa bệnh 15/2023/QH15** — Điều 59-62.
- **Thông tư 46/2018/TT-BYT** — bệnh án điện tử.
- **Thông tư 32/2023/TT-BYT** — hồ sơ bệnh án và thời hạn lưu trữ.
- **Luật Lưu trữ 33/2024/QH15** (hiệu lực 01/07/2025) — quản lý lưu trữ tài liệu điện tử.
- **Luật Giao dịch điện tử 20/2023/QH15** — chữ ký số, dữ liệu điện tử.
- **Nghị định 13/2023/NĐ-CP** — bảo vệ dữ liệu cá nhân (PDPL).
- **Nghị định 23/2025/NĐ-CP** — chữ ký số.
- **Thông tư 02/2024/TT-BNV** — lưu trữ tài liệu điện tử (Bộ Nội vụ).
- **ISO 14641 / ISO 15489** — chuẩn quốc tế lưu trữ điện tử (tham chiếu).
