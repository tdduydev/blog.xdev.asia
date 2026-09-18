---
id: 019f5a01-d000-7001-his0-000000001203
title: "Bài 32: Chữ ký số, audit log & truy vết HSBA"
slug: bai-32-chu-ky-so-audit-log
description: >-
  Hạ tầng PKI cho HIS: USB token, SIM PKI, ký số đám mây (eSign), HSM cho
  máy chủ; chuẩn audit log theo NĐ 13/2023 và HIPAA.
duration_minutes: 45
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-32-chu-ky-so-audit-log-banner.webp
video_url: null
sort_order: 3
section_title: "Phần 12: EMR & lưu trữ HSBA"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![Chữ ký số & audit log y khoa](/storage/uploads/2026/05/his/bai-32-chu-ky-so-audit-log-banner.webp)

## Hạ tầng PKI cho HIS

![Bác sĩ ký số bằng smart-card, timeline audit](/storage/uploads/2026/05/his/bai-32-chu-ky-so-audit-log-workflow.webp)


## Mục tiêu bài học

- Triển khai hạ tầng PKI cho HIS: cấp phát chứng thư cho BS/ĐD, smart-card/USB token, chữ ký remote.
- Phân biệt **chữ ký số PKI** (eSign) vs **chữ ký điện tử** (eSeal) vs **OTP** — giá trị pháp lý khác nhau.
- Triển khai **audit log không sửa được** với hash chain hoặc append-only DB.
- Xử lý **truy vết HSBA**: ai xem, ai sửa, ai in, ai export — đáp ứng PDPL (NĐ 13/2023).
- Đảm bảo chữ ký số LTV (Long-Term Validation) — verify được sau 10-30 năm.

## Bối cảnh: chữ ký số là "chốt cửa" pháp lý của EMR

- Không có chữ ký số PKI → EMR **không có giá trị pháp lý** thay thế HSBA giấy (TT 46/2018, Luật GDĐT 20/2023).
- Audit log có thể bị sửa → **tất cả EMR mất giá trị** khi tranh chấp.
- BV bị BHXH/toà án yêu cầu xuất "ai xem HSBA của ông Nguyễn Văn A trong tháng 5/2024" — không có log truy cập = vi phạm PDPL.
- Cert PKI có hạn (1-3 năm); không refresh LTV → 5 năm sau verify lại = invalid.

## Hạ tầng PKI cho HIS

| Thành phần | Vai trò | Khuyến nghị 2026 VN |
| --- | --- | --- |
| CA cấp chứng thư | RootCA / SubCA | Cert từ tổ chức được Bộ TT&TT cấp phép (VNPT-CA, Viettel-CA, FPT-CA, MISA-CA, NewTel-CA) |
| Token / smart-card | giữ private key | USB token / smart-card / HSM tập trung |
| TSA (Time-Stamping Authority) | đóng dấu thời gian | dùng TSA RFC 3161 |
| OCSP/CRL | kiểm tra revocation | URL của CA |
| Signing service | API để app gọi ký | nội bộ hoặc dùng VNPT eContract / FPT.eSign |

Mô hình **remote signing** (HSM tập trung) ngày càng phổ biến vì:
- BS không cần cắm USB → ký được trên mobile/tablet.
- Trung tâm quản trị key dễ hơn.
- Tuân thủ NĐ 23/2025/NĐ-CP về chữ ký số dịch vụ công.

## Cái gì cần ký?

| Tài liệu | Bắt buộc | Lý do |
| --- | --- | --- |
| Y lệnh thuốc, CLS | có | luật KCB + TT 46 |
| Tường trình phẫu thuật | có | giá trị pháp lý cao nhất |
| Phiếu xuất viện, giấy ra viện | có | tài liệu pháp lý |
| Kết quả XN, CĐHA | có | TT 49/2018 |
| Phiếu chứng tử | có | NĐ 04/2024 |
| Đơn thuốc ngoại trú | có | TT 22/2024 |
| Ghi chú tiến triển (progress note) | có | TT 32/2023 |
| Bệnh án tổng kết | có | TT 32/2023 |
| Hồ sơ tiêm chủng AEFI | có | TT 24/2018 |
| Biên bản hội chẩn | có | TT 32/2023 |

Nguyên tắc: **mọi quyết định lâm sàng có hệ luỵ đến BN đều phải ký số**.

## Phân biệt 3 loại "ký"

| Loại | Hạ tầng | Giá trị pháp lý | Ví dụ HIS |
| --- | --- | --- | --- |
| Chữ ký số PKI cá nhân | cert do CA cấp cho cá nhân | tương đương chữ ký tay (Luật GDĐT) | BS ký y lệnh |
| Chữ ký điện tử (eSeal) | cert tổ chức | tương đương con dấu | BV ký xác nhận giấy ra viện |
| OTP/biometric | OTP/sinh trắc | thấp, dùng nội bộ | điều dưỡng xác nhận eMAR |

OTP/biometric **không thay thế** PKI cho các tài liệu pháp lý quan trọng — chỉ dùng cho ký nhanh nội bộ + log audit.

## Workflow ký số trong HIS

```
BS soạn y lệnh → ấn "Ký phát hành"
   │
   ▼
HIS đóng gói nội dung (canonical XML/JSON) → tính SHA-256 hash
   │
   ▼
Gọi signing service (HSM remote hoặc USB token)
   │
   ├─ Local: prompt PIN → smart-card ký
   └─ Remote: SMS OTP / VNeID xác thực → HSM ký
   │
   ▼
Trả về signature (CMS/CAdES/PAdES/XAdES)
   │
   ▼
Đóng gói + TSA timestamp + lưu DB
   │
   ▼
HIS hiển thị: "✓ Đã ký bởi BS Nguyễn A lúc 14:35:22 12/05/2026, cert #ABC, valid"
```

Validation tại thời điểm xem:
- Verify chứ ký vs hash content.
- Check OCSP/CRL revocation tại thời điểm ký.
- Check timestamp TSA.
- Nếu cert đã hết hạn nhưng có TSA → vẫn valid (LTV).

## Audit log — không sửa được

Cấu trúc tối thiểu:

```sql
CREATE TABLE audit_log (
  log_id       bigserial PRIMARY KEY,
  occurred_at  timestamptz NOT NULL DEFAULT now(),
  actor_id     uuid NOT NULL,
  actor_role   varchar(30),
  action       varchar(30),    -- VIEW/CREATE/UPDATE/DELETE/EXPORT/PRINT/SIGN
  resource_type varchar(30),   -- PATIENT/ENCOUNTER/PRESCRIPTION/REPORT
  resource_id  uuid,
  patient_id   uuid,           -- để query "ai xem BN X"
  client_ip    inet,
  user_agent   text,
  before_hash  char(64),       -- SHA-256 của state trước (cho UPDATE)
  after_hash   char(64),
  prev_log_hash char(64),      -- hash chain
  this_log_hash char(64)       -- = SHA-256(prev_log_hash || các trường log)
);
```

Bất biến hoá:

- Bảng INSERT-only: revoke UPDATE/DELETE permission ở DB level.
- **Hash chain** giữa các log → sửa 1 dòng làm vỡ chain — phát hiện được.
- Snapshot hash chain root → ký số định kỳ (hàng giờ/ngày) → notarize ra blockchain công cộng (option) hoặc TSA.
- Lưu archive log hàng tháng ra WORM storage.

## Truy vết theo PDPL (NĐ 13/2023)

PDPL yêu cầu:

- Log mọi truy cập **dữ liệu cá nhân nhạy cảm** (PII y tế).
- BN có quyền yêu cầu BV cung cấp "ai đã xem dữ liệu của tôi trong khoảng thời gian X".
- Lưu log tối thiểu **5 năm** kể từ thời điểm phát sinh.
- Có cơ chế cảnh báo bất thường: 1 user đột ngột xem 1000 BN/giờ → trigger alarm.

```sql
-- Query mẫu trả lời yêu cầu PDPL của BN
SELECT actor_id, actor_role, action, occurred_at
FROM audit_log
WHERE patient_id = :pid
  AND occurred_at BETWEEN :from AND :to
ORDER BY occurred_at;
```

## LTV (Long-Term Validation) cho chữ ký số

Vấn đề: cert có hạn 1-3 năm, CA có thể đóng cửa, hash algorithm có thể yếu (SHA-1).

Giải pháp LTV (theo PAdES Part 4 / CAdES-A):

1. Khi ký, **đính kèm chuỗi cert đầy đủ** (signing cert + intermediate + root).
2. Đính kèm **OCSP/CRL response** tại thời điểm ký.
3. Đóng dấu **TSA timestamp** (RFC 3161).
4. Định kỳ **re-timestamp** trước khi TSA cert hết hạn (mỗi 5-10 năm).

→ 30 năm sau vẫn verify được "tài liệu này được ký bởi BS X vào lúc T, cert hợp lệ tại lúc T".

## Sai lầm thường gặp

1. Cho phép ký số bằng "tên BS dạng text" không có cert PKI thực → không có giá trị pháp lý.
2. Audit log lưu DB cho phép UPDATE/DELETE → bị nghi ngờ khi thanh tra.
3. Không dùng TSA → cert hết hạn = chữ ký không verify được sau này.
4. Không log VIEW (chỉ log UPDATE) → không trả lời được PDPL request.
5. Quên revoke cert khi BS nghỉ việc → cert bị lạm dụng.
6. Chia sẻ token PIN giữa các BS → log có chữ ký A nhưng thực tế B làm.

## Output / Deliverables

- Hạ tầng PKI hoặc kết nối với CA được cấp phép.
- Signing service (REST API) cho HIS gọi.
- Audit log INSERT-only với hash chain + ký số định kỳ.
- Module trả lời yêu cầu PDPL của BN.
- Quy trình cấp/thu hồi cert + đào tạo BS sử dụng.
- Quy trình LTV refresh chữ ký mỗi 5-10 năm.

## UAT checklist

- [ ] BS thử sửa log audit qua SQL → bị reject permission.
- [ ] Sửa 1 dòng audit log lén lút → công cụ verify hash chain phát hiện.
- [ ] Verify chữ ký số sau khi cert hết hạn (giả lập 5 năm) → vẫn valid nhờ TSA.
- [ ] Cert revoked giữa chừng → ký mới bị từ chối, ký cũ trước revoke vẫn valid.
- [ ] Trả lời PDPL request: BN yêu cầu list ai xem hồ sơ tháng 5/2024 → ra đầy đủ.
- [ ] Cảnh báo bất thường: 1 user xem > 100 BN trong 1h → email security team.

## KPI

| Chỉ số | Mục tiêu |
| --- | --- |
| % tài liệu pháp lý có chữ ký số PKI | 100% |
| % audit log đầy đủ field | 100% |
| Số lần audit log bị sửa | 0 |
| Thời gian trả lời PDPL request | ≤ 30 ngày (theo NĐ 13) |
| % chữ ký LTV verify thành công sau 5 năm test | 100% |

## Cơ sở pháp lý 2026

- **Luật Giao dịch điện tử 20/2023/QH15** (hiệu lực 01/07/2024) — Điều 22-25 chữ ký số.
- **Luật Khám bệnh, Chữa bệnh 15/2023/QH15** — Điều 59-62.
- **Nghị định 130/2018/NĐ-CP** — quy định chi tiết chữ ký số.
- **Nghị định 23/2025/NĐ-CP** — chữ ký số trong dịch vụ công.
- **Nghị định 13/2023/NĐ-CP** — bảo vệ dữ liệu cá nhân (PDPL).
- **Thông tư 46/2018/TT-BYT** — yêu cầu chữ ký số trong EMR.
- **Thông tư 32/2023/TT-BYT** — hồ sơ bệnh án.
- **Thông tư 06/2015/TT-BTTTT** + sửa đổi 2024 — chứng thư số.
- **PAdES (ETSI EN 319 142)** + **CAdES (EN 319 122)** + **RFC 3161 TSA** — chuẩn quốc tế tham chiếu.
