---
id: 019f5a01-d000-7001-his0-000000000801
title: "Bài 19: RIS — luồng nghiệp vụ chẩn đoán hình ảnh"
slug: bai-19-ris-luong-cdha
description: >-
  Order CĐHA, scheduling máy CT/MRI, chuẩn bị bệnh nhân, chụp, đọc kết quả
  bởi BS chẩn đoán hình ảnh, ký số phiếu CĐHA và trả về EMR.
duration_minutes: 55
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-19-ris-luong-cdha-banner.webp
video_url: null
sort_order: 1
section_title: "Phần 8: Chẩn đoán hình ảnh (RIS / PACS)"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![RIS — quy trình chẩn đoán hình ảnh](/storage/uploads/2026/05/his/bai-19-ris-luong-cdha-banner.webp)

## Tổng quan

![Phòng CT/MR và phòng đọc hình của bác sĩ](/storage/uploads/2026/05/his/bai-19-ris-luong-cdha-workflow.webp)


## Mục tiêu bài học

- Hiểu vai trò RIS trong tổng thể HIS/PACS, ranh giới với LIS.
- Triển khai **scheduling máy CT/MRI/X-quang** tránh xung đột.
- Thiết kế **worklist DICOM** để máy chụp tự kéo BN đúng.
- Quản lý quy trình BS đọc + ký số phiếu CĐHA theo Luật KCB 15/2023 và TT 46/2018.
- Quản lý **dose monitoring** theo TT 13/2018/TT-BYT về an toàn bức xạ y tế (sửa đổi 2024).

## RIS làm gì

RIS = Radiology Information System — "nhà điều phối" CĐHA:

- Nhận order chụp từ HIS (qua HL7 ORM).
- Sắp lịch máy + KTV + phòng.
- Sinh **DICOM Modality Worklist (MWL)** để máy CT/MRI tự thấy BN cần chụp.
- Theo dõi tình trạng (ordered → arrived → in_room → exam_started → exam_done → reported).
- Hỗ trợ BS đọc, ký, sửa, in.
- Đẩy phí về Billing đúng thời điểm.

PACS chỉ lo lưu ảnh + viewer; RIS lo nghiệp vụ.

## Vòng đời ca chụp

```
[HIS Order]
   |
   v
[RIS schedule]  --MWL-->  [CT/MRI/X-ray]
   |                              |
   |                              v
   |                       [Chụp xong, gửi DICOM PACS]
   |<-------MPPS update-----------|   (Modality Performed Procedure Step)
   v
[BS đọc trên viewer PACS]
   |
   v
[Soạn report trong RIS, ký số]
   |
   v
[ORU^R01 trả về HIS] + đẩy phí Billing
```

## DICOM Modality Worklist (MWL) — chìa khoá tránh nhập tay

Trước khi có MWL, KTV phải **gõ tay tên BN, ngày sinh, mã BV** vào console máy CT — sai chính tả là ảnh không gắn được vào hồ sơ. MWL cho phép máy query tới RIS bằng DIMSE C-FIND để **kéo về danh sách BN sắp chụp**, KTV chỉ cần chọn.

Yêu cầu:
- RIS phải có DICOM **MWL SCP** (server provider).
- Cấu hình **AE Title** chuẩn cho từng máy.
- Cập nhật worklist real-time khi có BN bổ sung (STAT).

## MPPS — đóng vòng tròn

**MPPS (Modality Performed Procedure Step)** = máy báo ngược về RIS "đã bắt đầu / đã chụp xong / đã hủy". Quan trọng để:

- Thay đổi trạng thái order tự động (không cần KTV nhập tay).
- Tính **phí thực tế** dựa trên series đã chụp (vd: CT có cản quang vs không cản quang).
- Tính **dose accumulator** (CTDIvol, DLP) cho an toàn bức xạ.

## Mô hình dữ liệu RIS

```sql
CREATE TABLE imaging_orders (
  order_id     UUID PRIMARY KEY,
  encounter_id UUID,
  patient_id   UUID,
  modality     VARCHAR(8),     -- CT, MR, CR, US, MG, NM, PT
  procedure_code VARCHAR(32),  -- mã DV BHYT
  body_part    VARCHAR(32),
  contrast     BOOLEAN,
  priority     VARCHAR(16),
  status       VARCHAR(16),    -- ORDERED|SCHEDULED|ARRIVED|IN_PROGRESS|DONE|REPORTED|REPORTED_SIGNED
  scheduled_at TIMESTAMPTZ,
  room_id      VARCHAR(16),
  tech_id      UUID,
  reading_md   UUID,
  ...
);

CREATE TABLE imaging_studies (
  study_iuid   VARCHAR(64) PRIMARY KEY,    -- DICOM Study Instance UID
  order_id     UUID,
  accession_no VARCHAR(20) UNIQUE,
  performed_at TIMESTAMPTZ,
  series_count INT,
  image_count  INT,
  ctdivol_total NUMERIC,                   -- nếu CT
  dlp_total    NUMERIC
);

CREATE TABLE imaging_reports (
  report_id    UUID PRIMARY KEY,
  order_id     UUID,
  study_iuid   VARCHAR(64),
  findings     TEXT,
  impression   TEXT,
  reading_md   UUID,
  signed_at    TIMESTAMPTZ,
  signature_hash VARCHAR(128),  -- ký số
  amend_of     UUID
);
```

## Quy tắc nghiệp vụ quan trọng

1. **Mọi study DICOM phải có Accession Number = order_id RIS** (hoặc derived) — không được "study mồ côi".
2. **MWL bật cho mọi máy** — không cho nhập tay BN.
3. **MPPS bắt buộc** — nếu máy không hỗ trợ, viết bridge hoặc đánh dấu bằng tay với role giới hạn.
4. **Cản quang phải có chỉ định riêng** — RIS hỏi eGFR + tiền sử dị ứng iod trước khi confirm slot.
5. **Mang thai là hard stop** cho XQ/CT trừ trường hợp khẩn cấp có ký lý do.
6. **Ký số phiếu** theo TT 46/2018 — chỉ BS có chứng chỉ CĐHA mới ký.
7. **Amend report** giữ version cũ, đánh dấu rõ.
8. **Critical finding** (xuất huyết não, AAA dọa vỡ, tràn khí MP áp lực, CT pulm embolism…) → bắt BS đọc gọi điện trực tiếp BS lâm sàng và log.
9. **Dose tracking** lưu CTDIvol & DLP, alert khi tích luỹ vượt ngưỡng.
10. **Lưu trữ tối thiểu 10 năm** cho XQ ngực và 15 năm cho ung thư (TT 56/2017/TT-BYT về lưu trữ HSBA — kết hợp với chính sách lưu ảnh PACS).

## Tích hợp HIS ↔ RIS

- **HIS → RIS**: HL7 ORM^O01 (order) + ADT (BN nhập viện/đổi khoa) qua HL7 v2 hoặc FHIR ServiceRequest + Encounter.
- **RIS → HIS**: HL7 ORU^R01 (report) — body chứa findings/impression dạng text + link tới PACS viewer (URL deep-link với study_iuid).
- **RIS → Billing**: tự gửi sau khi `REPORTED_SIGNED`, không gửi sớm.

## Sai lầm phổ biến

- Cho KTV nhập tay BN trên console → ảnh "mồ côi", không gắn được vào HIS.
- Không có MPPS → trạng thái order kẹt, BS lâm sàng không biết đã chụp xong.
- BS đọc nhưng không ký số → không hợp pháp cho HSBA điện tử.
- Critical finding chỉ ghi text "khẩn", không có alert + log gọi điện.
- Dose không lưu — vi phạm an toàn bức xạ.
- Lưu chỉ 5 năm để tiết kiệm storage — vi phạm TT 56.

## Output bài học

- Vẽ end-to-end RIS workflow.
- Hiểu DICOM MWL & MPPS.
- Viết spec cho ký số report và critical finding workflow.

## Checklist UAT

- [ ] Order CT bụng → MWL trên máy CT thấy BN đúng.
- [ ] Chụp xong, MPPS gửi về → RIS chuyển `DONE`.
- [ ] BS đọc, ký số → status `REPORTED_SIGNED` + Billing nhận event.
- [ ] Cản quang: thiếu eGFR → block schedule.
- [ ] Mang thai: hard stop XQ/CT, override cần ký lý do.
- [ ] Critical finding: alert + log gọi điện trong < 30'.
- [ ] CTDIvol/DLP lưu vào study.

## KPI

| KPI | Ngưỡng |
| --- | --- |
| % study có accession number khớp order | 100% |
| % BN nhập tay trên console | 0% |
| TAT đọc XQ ngực thường quy | ≤ 24h |
| TAT đọc CT cấp cứu | ≤ 60' |
| Critical finding gọi BS < 30' | ≥ 99% |
| % report ký số | 100% |

## Cơ sở pháp lý 2026

- **Luật KCB 15/2023/QH15** — yêu cầu HSBA điện tử có ký số.
- **Thông tư 46/2018/TT-BYT** — HSBA điện tử, lộ trình & yêu cầu kỹ thuật.
- **Thông tư 56/2017/TT-BYT** — thời hạn lưu trữ HSBA và kết quả CĐHA.
- **Thông tư 13/2018/TT-BYT** (sửa đổi 2024) — an toàn bức xạ y tế, dose tracking.
- **DICOM PS3** — chuẩn dữ liệu CĐHA, MWL, MPPS, Storage.

## Bài tiếp

Bài 20 đi sâu PACS, viewer, lưu trữ tier và chia sẻ ảnh với BN.
