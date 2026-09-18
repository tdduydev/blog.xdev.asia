---
id: 019f5a01-d000-7001-his0-000000000802
title: "Bài 20: PACS — DICOM, viewer & lưu trữ ảnh y tế"
slug: bai-20-pacs-dicom-viewer-luu-tru
description: >-
  PACS là gì, chuẩn DICOM, lưu trữ tier (online/nearline/offline), web
  viewer cho lâm sàng, chia sẻ ảnh với bệnh nhân, tuân thủ thời gian lưu
  trữ theo TT 56.
duration_minutes: 50
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-20-pacs-dicom-viewer-luu-tru-banner.webp
video_url: null
sort_order: 2
section_title: "Phần 8: Chẩn đoán hình ảnh (RIS / PACS)"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![PACS — lưu trữ và xem DICOM](/storage/uploads/2026/05/his/bai-20-pacs-dicom-viewer-luu-tru-banner.webp)

## Vai trò PACS

![Workstation PACS với so sánh prior/current](/storage/uploads/2026/05/his/bai-20-pacs-dicom-viewer-luu-tru-workflow.webp)


## Mục tiêu bài học

- Hiểu PACS là gì, các thành phần (archive, viewer, gateway).
- Phân biệt 3 tier lưu trữ (online / nearline / offline) và tính dung lượng cho BV của bạn.
- Triển khai **web viewer DICOMweb (WADO-RS, QIDO-RS, STOW-RS)** cho lâm sàng.
- Chia sẻ ảnh với BN qua portal/QR an toàn.
- Tuân thủ thời hạn lưu trữ và chính sách backup theo TT 56/2017/TT-BYT và Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân.

## PACS là gì, các module

| Module | Vai trò |
| --- | --- |
| Archive (long-term) | Lưu DICOM dài hạn, dedup, lifecycle |
| Cache / fast tier | SSD/NVMe cho ảnh dùng thường |
| Gateway / DICOM Router | Nhận từ máy chụp, normalize, route |
| Worklist Server | MWL cho các máy |
| Web Viewer | Xem DICOM trên trình duyệt |
| Pro Workstation | Cho BS CĐHA đọc chuyên sâu |
| Anonymization service | Trước khi xuất nghiên cứu |
| AI integration | Bài 21 |

## DICOM cơ bản

- 1 study = nhiều series, 1 series = nhiều instance (ảnh).
- Định danh: `Study Instance UID`, `Series Instance UID`, `SOP Instance UID` — globally unique.
- Patient/Study tag chứa metadata (BN, ngày, máy, dose…).
- Truyền qua **DIMSE** (port 104/11112) hoặc **DICOMweb** (HTTP).

## Tính dung lượng — khoảng ước

| Loại | Dung lượng/ca |
| --- | --- |
| XQ ngực 2 view | 20-40 MB |
| CT bụng có cản quang | 300-800 MB |
| MRI cột sống | 200-500 MB |
| Mammography (DBT) | 1-3 GB |
| PET/CT | 1-2 GB |

BV 500 giường, ~80,000 study/năm, trung bình 200MB/ca → ~16 TB/năm dữ liệu mới. Sau 10 năm (~160TB) cộng prior → cần kiến trúc tier rõ ràng.

## Kiến trúc 3 tier

```
[Modalities] → [Gateway] → [Hot tier SSD: 30 ngày]
                              │
                              v
                       [Warm tier HDD: 2 năm]
                              │
                              v
                  [Cold tier object storage: 10-15 năm]
                              │
                              v
                    [Offline tape backup: 30 năm với ung thư/nhi]
```

- **Pre-fetch**: khi BN có lịch hẹn ngày mai, hệ thống tự kéo prior từ cold tier về hot tier.
- **De-duplication**: dùng SOP Instance UID, không lưu trùng.
- **Lossless compression** mặc định (JPEG-LS, JPEG2000 lossless); lossy chỉ cho mục đích chia sẻ web với cảnh báo.

## Web viewer DICOMweb

DICOMweb gồm 3 service chính:
- **QIDO-RS** (`/studies?PatientID=...`) — query metadata.
- **WADO-RS** (`/studies/{UID}/series/{UID}/instances/{UID}/frames/{n}`) — lấy pixel data.
- **STOW-RS** (`POST /studies`) — store ảnh.

Viewer phải:
- Load **progressive** (preview low-res rồi nâng).
- Hỗ trợ MPR (multi-planar reconstruction) cho CT/MR.
- Đo, annotate, lưu lại presentation state (DICOM GSPS).
- Hyperlink từ HIS sang viewer bằng deep-link `?studyUID=xxx&accession=yyy`.

## Chia sẻ ảnh với BN

- Cấp QR + mã PIN có TTL (24-72h).
- Watermark tên BN + thời gian truy cập.
- Log mọi truy cập (IP, device).
- Tải về ZIP DICOM kèm DICOMDIR khi BN cần đem đi BV khác.

Bảo mật theo **Nghị định 13/2023/NĐ-CP** (bảo vệ dữ liệu cá nhân, hiệu lực 01/07/2023): có **đánh giá tác động xử lý dữ liệu** (DPIA), thông báo BN, cho rút lại đồng ý.

## Quy tắc lưu trữ

| Loại HSBA | Tối thiểu (TT 56/2017) |
| --- | --- |
| Hồ sơ ngoại trú | 10 năm |
| Hồ sơ nội trú | 10 năm |
| Hồ sơ tử vong / pháp y | 30 năm |
| Hồ sơ ung thư, nhi sơ sinh | thường giữ 30 năm |

PACS phải có **lifecycle policy** + audit; không được "sau 5 năm xoá để tiết kiệm".

## Sai lầm phổ biến

- Không có cold tier → mua hết SSD đắt đỏ.
- Không pre-fetch → BS đợi load 10 phút mỗi prior.
- Web viewer chỉ JPEG → mất khả năng đo đạc, MPR.
- Chia sẻ ảnh không có TTL/log → vi phạm NĐ 13/2023.
- Không backup off-site → mất dữ liệu khi cháy/lũ.
- Compress lossy mặc định → BS đọc sai sót.

## Output bài học

- Tính dung lượng PACS cho BV của bạn.
- Vẽ kiến trúc 3 tier.
- Hiểu DICOMweb đủ để spec viewer.
- Triển khai chia sẻ ảnh BN tuân thủ NĐ 13.

## Checklist UAT

- [ ] Gateway nhận study từ tất cả máy.
- [ ] Hot tier giữ 30 ngày, prior tự pre-fetch.
- [ ] Web viewer mở study CT 600MB < 10s preview, < 60s full.
- [ ] MPR + đo đạc + lưu GSPS.
- [ ] Anonymization xuất study cho nghiên cứu.
- [ ] BN nhận QR, log truy cập, hết hạn 72h.
- [ ] Backup off-site verify monthly.
- [ ] Lifecycle: study > 2 năm chuyển cold tier, restore < 5'.

## KPI

| KPI | Ngưỡng |
| --- | --- |
| Uptime PACS archive | ≥ 99.9% |
| Thời gian mở first image (cached) | ≤ 3s |
| Thời gian mở first image (cold tier) | ≤ 60s |
| Tỉ lệ study lưu thành công | ≥ 99.99% |
| Sai số dung lượng dự báo | ≤ 10% |
| Backup verify monthly | 100% |

## Cơ sở pháp lý 2026

- **Thông tư 56/2017/TT-BYT** — thời hạn lưu trữ HSBA & ảnh CĐHA.
- **Thông tư 46/2018/TT-BYT** — HSBA điện tử, ký số.
- **Nghị định 13/2023/NĐ-CP** (hiệu lực 01/07/2023) — bảo vệ dữ liệu cá nhân, áp dụng đầy đủ cho ảnh y tế.
- **DICOM PS3 / DICOMweb** — chuẩn quốc tế.

## Bài tiếp

Bài 21 sẽ về AI trong CĐHA — use case thực tế, quy trình tích hợp vào PACS và yêu cầu pháp lý / chất lượng.
