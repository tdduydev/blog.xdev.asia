---
id: 019f5a01-d000-7001-his0-000000001201
title: "Bài 30: EMR — bệnh án điện tử theo TT 46/2018 & lộ trình bỏ giấy"
slug: bai-30-emr-tt46-bo-giay
description: >-
  Tiêu chuẩn EMR theo TT 46/2018, các mức độ hoàn thiện (EMRAM), lộ trình
  chuyển đổi từ HSBA giấy sang điện tử và những bài học pháp lý.
duration_minutes: 50
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-30-emr-tt46-bo-giay-banner.webp
video_url: null
sort_order: 1
section_title: "Phần 12: EMR & lưu trữ HSBA"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![EMR — chuyển đổi từ HSBA giấy sang điện tử](/storage/uploads/2026/05/his/bai-30-emr-tt46-bo-giay-banner.webp)

## TT 46/2018 — khung pháp lý EMR Việt Nam *(cập nhật 2026)*

![Bác sĩ đóng hồ sơ giấy, mở EMR trên tablet](/storage/uploads/2026/05/his/bai-30-emr-tt46-bo-giay-workflow.webp)


## Mục tiêu bài học

- Hiểu khung pháp lý EMR Việt Nam: **Thông tư 46/2018/TT-BYT** và lộ trình bỏ bệnh án giấy theo Luật KCB 15/2023.
- Phân biệt **HIS, EMR, EHR, PHR** — các thuật ngữ thường bị dùng lẫn lộn.
- Triển khai 7 cấp độ **EMRAM** (HIMSS) — chuẩn quốc tế đo trưởng thành EMR.
- Lập kế hoạch chuyển đổi từ "song song giấy + điện tử" sang **bỏ giấy hoàn toàn** đúng yêu cầu BYT.
- Hiểu tiêu chí **bệnh án điện tử thay thế bệnh án giấy** mà BV phải đạt để xin công nhận.

## Bối cảnh: tới 2026, ai đã bỏ giấy?

Theo Cục Khoa học Công nghệ và Đào tạo BYT (số liệu Q1/2026):

- 145/1.500 BV công lập đã có EMR thay thế hoàn toàn HSBA giấy.
- 80% BV còn ở trạng thái "song song" — vừa nhập điện tử vừa in HSBA giấy → tốn kép, dữ liệu không đồng bộ.
- Lộ trình BYT: **đến hết 2026, các BV hạng I phải EMR thay thế HSBA giấy**; hạng II/III tiếp tục đến 2030.
- Lý do chậm: sợ mất dữ liệu, BS quen viết tay, thiếu chữ ký số, chưa có MRA điện tử đạt chuẩn.

## TT 46/2018 — khung pháp lý EMR Việt Nam *(cập nhật 2026)*

Yêu cầu cốt lõi:

1. EMR phải đảm bảo **6 thuộc tính**: tính đầy đủ, chính xác, toàn vẹn, sẵn sàng, an toàn, bảo mật.
2. Có **chữ ký số** PKI hợp pháp cho mỗi nội dung BS/ĐD ghi vào.
3. Có **audit log** không thể sửa, lưu trữ tối thiểu 10 năm (bằng thời hạn lưu HSBA giấy).
4. Có hệ thống **lưu trữ điện tử (MRA điện tử)** đạt yêu cầu kỹ thuật.
5. Có **bản backup** đặt ở 2 vị trí địa lý khác nhau.
6. **Tự công nhận** rồi báo cáo Sở YT/Cục KHCN — không cần xin phép trước nhưng phải đáp ứng tiêu chí kiểm tra.
7. Khi đã EMR thay HSBA giấy → **không in HSBA giấy nữa** (trừ khi BN/cơ quan bảo hiểm/toà án yêu cầu trích lục).

## HIS vs EMR vs EHR vs PHR

| Khái niệm | Người sở hữu | Phạm vi | Mục đích |
| --- | --- | --- | --- |
| HIS | BV | toàn bộ vận hành BV | hành chính + lâm sàng |
| EMR | BV | hồ sơ lâm sàng BN tại BV | chuyên môn |
| EHR | hệ thống y tế quốc gia/khu vực | xuyên cơ sở | liên thông |
| PHR | cá nhân BN | tổng hợp do BN giữ (qua VNeID Health) | trao quyền BN |

EMR là **một module trong HIS**; HIS có thêm Billing, MPI, Inventory, HR — EMR thì tập trung vào lâm sàng.

## EMRAM 7 cấp độ (HIMSS)

| Cấp | Yêu cầu chính | BV VN điển hình |
| --- | --- | --- |
| 0 | chưa có gì | trạm y tế giấy |
| 1 | đã có Lab/Pharm/Rad nhưng chưa tích hợp | BV huyện |
| 2 | có CDR, có thuật ngữ chuẩn (ICD-10) | nhiều BV tỉnh |
| 3 | nursing/CDS cấp 1 | một số BV tỉnh tốt |
| 4 | CPOE (BS nhập y lệnh trực tiếp) | BV hạng 1 mạnh |
| 5 | full chữ ký số, không in giấy y lệnh | BV đầu ngành |
| 6 | structured templates, full CDS, closed-loop med admin | rất ít |
| 7 | hoàn toàn không giấy + analytics, đạt EMRAM Stage 7 | 0 BV VN tới 2026 |

Mục tiêu thực tế cho BV VN 2026: **Stage 5-6** — đủ điều kiện thay HSBA giấy theo TT 46.

## Quá trình chuyển đổi "song song → bỏ giấy"

**Pha 1 — Chuẩn bị (3-6 tháng):**
- Audit nội dung: liệt kê 100% các loại form đang dùng giấy → map sang form điện tử.
- Trang bị PKI cho 100% BS/ĐD ký y lệnh.
- Đầu tư MRA điện tử đạt chuẩn (lưu file, indexing, full-text search).

**Pha 2 — Song song có kiểm soát (3-6 tháng):**
- Mọi y lệnh nhập điện tử trước, in tham khảo.
- Đo % ký số y lệnh: mục tiêu ≥ 95% trong 1 tháng.
- Đo % thiếu chữ ký, sai dữ liệu — cải thiện liên tục.

**Pha 3 — Pilot bỏ giấy ở 1-2 khoa (3 tháng):**
- Chọn khoa "kỷ luật" trước (ICU, Sản, Nhi).
- Báo cáo BYT/Sở YT, tự công nhận theo TT 46.
- Tổ chức diễn tập downtime (mất hệ thống).

**Pha 4 — Mở rộng toàn BV:**
- Cộng dồn từng khoa.
- Cập nhật quy chế nội bộ: cấm in HSBA giấy ngoại trừ trích lục theo yêu cầu.

## Tiêu chí "EMR thay thế HSBA giấy"

BYT công bố checklist (TT 46 + hướng dẫn 2024):

- [ ] 100% y lệnh được ký số PKI.
- [ ] 100% kết quả CLS điện tử + ký số.
- [ ] CDS thuốc cơ bản (DDI, DAI).
- [ ] eMAR cho nội trú với 5R (right patient/drug/dose/route/time).
- [ ] Audit log đầy đủ 10 năm, không sửa được.
- [ ] MRA điện tử đạt chuẩn lưu trữ pháp lý (2 site backup).
- [ ] BCP/DR (downtime procedure) được diễn tập định kỳ.
- [ ] Quy chế nội bộ về EMR ban hành chính thức.
- [ ] Báo cáo Sở YT để được công nhận.

## Sai lầm thường gặp khi triển khai EMR

1. Tin rằng "có HIS = có EMR" — bỏ qua chữ ký số, audit log → không công nhận được.
2. Chuyển đổi đột ngột không có pha song song → mất dữ liệu, mất an toàn.
3. Không có downtime procedure → mất hệ thống = mất kê đơn cấp cứu.
4. Lưu file PDF trên file server thường (không đạt chuẩn lưu trữ) → vi phạm.
5. Backup chỉ tại 1 site (cùng phòng máy) → 1 sự cố là mất hết.
6. Không đào tạo pháp lý cho BS — nghĩ ký số là "tuỳ chọn" → kiện tụng phát sinh.

## Output / Deliverables

- Bộ form điện tử thay thế 100% form giấy hiện hành.
- Hệ thống PKI + chính sách cấp/thu hồi chứng thư.
- MRA điện tử + chính sách lưu trữ 10 năm.
- Quy chế EMR nội bộ + checklist công nhận theo TT 46.
- Quy trình downtime + lịch diễn tập 6 tháng/lần.

## UAT checklist

- [ ] Mọi y lệnh phải ký số → không ký không phát hành.
- [ ] Tất cả kết quả CLS có chữ ký số PKI.
- [ ] Audit log đầy đủ + không sửa được + xuất được khi thanh tra.
- [ ] Diễn tập downtime: mất hệ thống 30 phút, BV vẫn vận hành.
- [ ] Trích lục HSBA điện tử theo yêu cầu BHXH/Toà → ra bản PDF có chữ ký số đầy đủ.

## KPI

| Chỉ số | Mục tiêu |
| --- | --- |
| % y lệnh ký số | ≥ 99% |
| % HSBA điện tử đầy đủ khi xuất viện | ≥ 95% |
| % CLS có chữ ký số | 100% |
| Tỉ lệ in HSBA giấy hằng tuần (sau khi bỏ giấy) | ≤ 2% (chỉ trích lục) |
| Diễn tập downtime/năm | ≥ 2 lần |

## Cơ sở pháp lý 2026

- **Luật Khám bệnh, Chữa bệnh 15/2023/QH15** — Điều 59-62 hồ sơ bệnh án.
- **Thông tư 46/2018/TT-BYT** — bệnh án điện tử (vẫn hiệu lực, đang dự thảo cập nhật 2026).
- **Thông tư 32/2023/TT-BYT** — hồ sơ bệnh án (thay TT 14/2018).
- **Luật Giao dịch điện tử 20/2023/QH15** (hiệu lực 01/07/2024).
- **Nghị định 130/2018/NĐ-CP** — chữ ký số, dịch vụ chứng thực.
- **Nghị định 23/2025/NĐ-CP** — chữ ký số trong dịch vụ công.
- **Quyết định 06/QĐ-TTg/2022** — Đề án 06, liên thông EMR ↔ VNeID Health.
- **Quyết định 4888/QĐ-BYT/2019** — Đề án ứng dụng CNTT y tế (đang cập nhật).
- **HIMSS EMRAM** — chuẩn quốc tế tham chiếu.
