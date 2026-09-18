---
id: 019f5a01-d000-7001-his0-000000000803
title: "Bài 21: Ứng dụng AI trong CĐHA & quy trình triển khai"
slug: bai-21-ai-trong-cdha
description: >-
  AI hỗ trợ đọc X-quang ngực, sàng lọc đột quỵ trên CT sọ, mammography. Quy
  trình tích hợp AI vào RIS/PACS và kiểm soát chất lượng / pháp lý.
duration_minutes: 40
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-21-ai-trong-cdha-banner.webp
video_url: null
sort_order: 3
section_title: "Phần 8: Chẩn đoán hình ảnh (RIS / PACS)"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![AI trong chẩn đoán hình ảnh](/storage/uploads/2026/05/his/bai-21-ai-trong-cdha-banner.webp)

## Các use case phổ biến

![Heatmap AI gợi ý vùng bất thường trên ảnh](/storage/uploads/2026/05/his/bai-21-ai-trong-cdha-workflow.webp)


## Mục tiêu bài học

- Liệt kê các use case AI trong CĐHA đã trưởng thành nhất tại VN/khu vực.
- Hiểu kiến trúc tích hợp AI vào PACS/RIS theo IHE AI Workflow (AIW-I).
- Triển khai quy trình **đánh giá lâm sàng** trước khi đưa AI vào sản xuất.
- Đảm bảo tuân thủ pháp lý: Luật KCB 15/2023, Nghị định 13/2023, hướng dẫn thiết bị y tế Bộ Y tế và lộ trình AI/AI Act tham chiếu.
- Tránh bẫy "AI báo nhưng BS không thấy / không log".

## Use case AI đã chín tại VN (2025-2026)

| Use case | Modality | Mức triển khai |
| --- | --- | --- |
| Phát hiện nốt phổi, lao, tràn dịch trên XQ ngực | CR/DX | Nhiều BV tuyến tỉnh |
| Sàng lọc đột quỵ trên CT sọ (NCCT/CTA) | CT | BV TƯ + tỉnh chọn lọc |
| Chấm điểm Mammography BIRADS | MG | BV chuyên ung bướu |
| Đo phân suất tống máu trên siêu âm tim | US | BV tim mạch |
| Phân vùng tổn thương gan trên CT/MR | CT/MR | BV ung bướu |
| Đo độ tuổi xương | CR | Nhi khoa |
| Định lượng EI trên CT phổi (COVID/khí thũng) | CT | Đã giảm sau dịch |

## Kiến trúc tích hợp — IHE AIW-I

```
[Modality] → [Gateway] → [PACS Archive]
                              │
                              v
                   [AI Trigger / Dispatcher]
                              │
                              v
                   [AI Inference Service]
                              │
                              v
              [DICOM SR / Secondary Capture / GSPS]
                              │
                              v
                  [Lưu vào PACS, gắn study]
                              │
                              v
              [BS thấy trên viewer + RIS report]
```

- AI nhận DICOM, trả về **DICOM SR (Structured Report)** để có thể truy vấn được.
- Heatmap thường lưu dưới dạng **Secondary Capture** + **GSPS overlay**.
- Phải có `AlgorithmName`, `AlgorithmVersion`, `ManufacturerModelName`, `Confidence`.

## Quy trình chọn & đưa AI vào sản xuất

1. **Định nghĩa case lâm sàng** rõ: ai dùng, dùng để làm gì, hệ quả nếu sai.
2. **Đánh giá kỹ thuật** — sensitivity/specificity trên dataset BV của bạn (≥ 500 ca pilot).
3. **Đánh giá lâm sàng silent mode** — AI chạy ngầm 4-8 tuần, BS không thấy; so AI vs BS.
4. **Pilot công khai** — 1 khoa, có giám sát, log mọi disagreement.
5. **Triển khai kèm KPI & dashboard** — sensitivity, specificity, recall theo tháng.
6. **Tái đánh giá định kỳ** — mỗi 6-12 tháng, có drift detection.

## Mô hình dữ liệu liên quan

```sql
CREATE TABLE ai_inferences (
  id            UUID PRIMARY KEY,
  study_iuid    VARCHAR(64),
  algorithm     VARCHAR(64),
  algorithm_ver VARCHAR(32),
  output_kind   VARCHAR(16),      -- DETECT|CLASSIFY|SEGMENT|TRIAGE
  result_json   JSONB,
  confidence    NUMERIC,
  sr_iuid       VARCHAR(64),      -- DICOM SR object
  triggered_at  TIMESTAMPTZ,
  finished_at   TIMESTAMPTZ,
  status        VARCHAR(16)       -- OK|FAILED|TIMEOUT
);

CREATE TABLE ai_disagreements (
  id            BIGSERIAL PRIMARY KEY,
  inference_id  UUID,
  reading_md    UUID,
  ai_finding    TEXT,
  md_finding    TEXT,
  reviewed_at   TIMESTAMPTZ
);
```

## Yêu cầu pháp lý & chất lượng

- AI dùng để **chẩn đoán** = phần mềm thiết bị y tế (SaMD). Theo **Nghị định 98/2021/NĐ-CP** (sửa đổi bởi NĐ 07/2023, NĐ 96/2023) về quản lý trang thiết bị y tế, phải đăng ký lưu hành nếu kinh doanh.
- BS đọc vẫn là **người chịu trách nhiệm cuối** theo Luật KCB 15/2023.
- Mọi quyết định AI ảnh hưởng đến BN phải **lưu log** đủ truy vết.
- Dữ liệu BN dùng cho training phải **anonymize** + có cơ chế đồng ý theo NĐ 13/2023.

## Pitfall thường gặp

- AI chạy nhưng kết quả không hiển thị trên viewer chính → BS không thấy.
- Không lưu version model → khi sự cố không truy được model nào ra kết quả nào.
- Pilot với dataset ngoài (ImageNet/PadChest) thay vì BV mình → drift lớn khi go-live.
- Dùng AI sàng lọc đột quỵ nhưng không thay đổi quy trình lâm sàng (vẫn chờ BS đọc cuối) — không cứu được thời gian.
- Không monitor performance định kỳ — model "hỏng" âm thầm.
- BS bị "automation bias" — tin AI quá mức, bỏ qua dấu hiệu rõ trên ảnh.

## Thiết kế UX cho AI overlay

- Heatmap **bật/tắt được** không che ảnh gốc.
- Hiển thị **confidence** + version model.
- Cho BS click "đồng ý / không đồng ý" để feedback loop.
- Khi AI nghi nguy hiểm cao (đột quỵ, AAA): **bắn alert** vào RIS triage queue chứ không chỉ overlay.

## Output bài học

- Có khung quyết định "có nên mua AI X không".
- Vẽ kiến trúc tích hợp AI với PACS/RIS.
- Lập plan pilot silent mode + KPI monitor.

## Checklist UAT

- [ ] AI nhận study mới qua DICOM C-STORE / DICOMweb STOW.
- [ ] Trả SR trong < 5 phút cho XQ, < 10 phút cho CT.
- [ ] SR + heatmap hiện trên web viewer cùng study.
- [ ] BS có thể tắt overlay.
- [ ] Disagreement log lưu đủ.
- [ ] Dashboard KPI sensitivity/specificity update hằng ngày.
- [ ] Audit log: model version, time, input hash.

## KPI

| KPI | Ngưỡng |
| --- | --- |
| Sensitivity duy trì sau go-live | ≥ baseline -3% |
| Specificity duy trì | ≥ baseline -3% |
| Latency inference (P95) | XQ < 60s, CT < 5' |
| Tỉ lệ BS xem overlay | ≥ 80% |
| Tỉ lệ disagreement có review | ≥ 95% |
| Recall sau drift detection | hành động trong 30 ngày |

## Cơ sở pháp lý 2026

- **Luật KCB 15/2023/QH15** — BS đọc là người chịu trách nhiệm cuối; AI là công cụ hỗ trợ.
- **Nghị định 98/2021/NĐ-CP** + sửa đổi (NĐ 07/2023, NĐ 96/2023) — quản lý trang thiết bị y tế, áp dụng cho SaMD.
- **Nghị định 13/2023/NĐ-CP** — bảo vệ dữ liệu cá nhân, áp dụng training data.
- **Luật Giao dịch điện tử 20/2023/QH15** + ký số chuyên dùng — báo cáo có chữ ký số.
- **Bộ Y tế: hướng dẫn ứng dụng AI trong y tế** (đang dự thảo lộ trình tham chiếu) — theo dõi.

## Tổng kết Phần 8

Bạn đã có toàn cảnh CĐHA: RIS điều phối, PACS lưu, viewer cho BS, AI hỗ trợ. Phần 9 sẽ chuyển sang Pharmacy & eMAR — mảng có **rủi ro pháp lý cao nhất** trong HIS.
