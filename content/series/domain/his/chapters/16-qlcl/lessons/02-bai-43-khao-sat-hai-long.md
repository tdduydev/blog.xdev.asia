---
id: 019f5a01-d000-7001-his0-000000001602
title: "Bài 43: Khảo sát hài lòng người bệnh & xử lý phản ánh"
slug: bai-43-khao-sat-hai-long
description: >-
  Khảo sát hài lòng BN & nhân viên y tế theo mẫu BYT, kênh tiếp nhận phản
  ánh (kiosk, app, hotline), quy trình xử lý khiếu nại đúng pháp luật.
duration_minutes: 30
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-43-khao-sat-hai-long-banner.webp
video_url: null
sort_order: 2
section_title: "Phần 16: Quản lý chất lượng"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![Khảo sát hài lòng & NPS](/storage/uploads/2026/05/his/bai-43-khao-sat-hai-long-banner.webp)

## Khảo sát hài lòng

![BN đánh giá hài lòng khi ra viện trên tablet](/storage/uploads/2026/05/his/bai-43-khao-sat-hai-long-workflow.png)


## Mục tiêu bài học

- Triển khai khảo sát hài lòng người bệnh (PSAT) theo **Quyết định 3869/QĐ-BYT/2019** (sửa đổi 2024).
- Triển khai khảo sát hài lòng nhân viên y tế (NSAT) định kỳ.
- Module xử lý **phản ánh — khiếu nại — kiến nghị** theo **Luật Khiếu nại 02/2011**, **Luật Tiếp công dân 42/2013**.
- Đo NPS (Net Promoter Score) cho BV — chuẩn quốc tế, đang phổ biến tại VN.
- Đảm bảo **Bộ Y tế khảo sát ngẫu nhiên qua ZNS/SMS** không trùng với khảo sát BV — không gây nhiễu.

## Bối cảnh

- BYT có hệ thống khảo sát ngẫu nhiên qua ZNS/SMS từ 2024 (gọi là "tiếng nói người bệnh") — BV không thể giấu sự không hài lòng.
- Khảo sát giấy tại quầy → tỉ lệ trả lời cao nhưng "đẹp giả" do BN sợ ảnh hưởng KCB.
- Phản ánh trên mạng xã hội (Facebook, TikTok) ảnh hưởng uy tín BV mạnh hơn nội bộ.
- ISO 9001 / JCI yêu cầu module xử lý phản ánh có audit trail.

## Bộ câu hỏi khảo sát BYT

QĐ 3869/QĐ-BYT có 3 bộ:
- BN nội trú: 5 phần (tiếp cận, minh bạch, cơ sở vật chất, NV y tế, kết quả).
- BN ngoại trú: tương tự nhưng ngắn hơn.
- NV y tế (NSAT): điều kiện làm việc, lương, lãnh đạo, đào tạo.

Mỗi câu thang Likert 1-5; tính điểm trung bình + tỉ lệ "rất hài lòng".

## Kênh khảo sát

| Kênh | Ưu | Nhược |
| --- | --- | --- |
| Tablet tại quầy ra viện | tỉ lệ cao | "đẹp giả" |
| ZNS/SMS sau xuất viện 1-3 ngày | trung thực hơn | tỉ lệ thấp 10-20% |
| QR code phòng khám | tự nguyện | bias |
| Email follow-up | có context | thấp |
| Phỏng vấn điện thoại | trung thực, sâu | tốn người |

Khuyến nghị: kết hợp **tablet + ZNS sau 3 ngày** để cân bằng.

## Data model

```sql
CREATE TABLE survey_template (
  template_id  uuid PRIMARY KEY,
  template_code varchar(20),  -- INPATIENT/OUTPATIENT/NSAT
  questions    jsonb,
  effective_from date
);

CREATE TABLE survey_response (
  response_id  uuid PRIMARY KEY,
  template_id  uuid,
  patient_id   uuid,           -- nullable nếu ẩn danh
  encounter_id uuid,
  channel      varchar(20),    -- TABLET/ZNS/EMAIL/PHONE
  responses    jsonb,          -- {q1: 5, q2: 4, ...}
  total_score  numeric,
  nps_score    int,            -- 0-10
  free_text    text,
  submitted_at timestamptz
);

CREATE TABLE complaint (
  complaint_id uuid PRIMARY KEY,
  channel      varchar(20),    -- IN_PERSON/HOTLINE/EMAIL/FACEBOOK/SURVEY
  category     varchar(50),    -- ATTITUDE/QUALITY/COST/ACCESS/...
  severity     varchar(20),
  description  text,
  patient_id   uuid,
  reported_at  timestamptz,
  assigned_to  uuid,
  resolved_at  timestamptz,
  resolution   text,
  satisfaction_after int,      -- 1-5 sau khi xử lý
  status       varchar(20)     -- OPEN/INVESTIGATING/RESOLVED/CLOSED/ESCALATED
);
```

## Workflow khảo sát ZNS

```
BN xuất viện → encounter CLOSED
   │
   │ Sau 24-72h
   ▼
HIS gửi ZNS Zalo (template phê duyệt) + link khảo sát
   │
   ▼
BN trả lời từ điện thoại
   │
   ▼
HIS lưu response, tính score realtime
   │
   ▼
Score thấp (≤ 3 điểm) → escalate phòng QLCL trong 24h
   │
   ▼
QLCL liên hệ BN → xử lý → ghi nhận complaint nếu có
```

## Workflow phản ánh

```
PHẢN ÁNH (đa kênh) → Tiếp nhận trong HIS (form chuẩn)
   │
   ▼
Phân loại + assign trưởng khoa liên quan
   │
   ▼
Điều tra (gặp BN, xem EMR, phỏng vấn NV)
   │
   ▼
Phản hồi BN trong N ngày (Luật Khiếu nại: 30 ngày)
   │
   ▼
Đo lại satisfaction → đóng case
   │
   ▼
Tổng hợp xu hướng → đưa vào QLCL cải tiến
```

## Sai lầm thường gặp

1. Chỉ khảo sát tại quầy → "đẹp giả".
2. Không phản hồi BN → BN đăng mạng XH → khủng hoảng truyền thông.
3. Phản ánh xử lý "trong nội bộ" không lưu HIS → mất truy vết.
4. Không phân tích xu hướng → không cải tiến hệ thống.
5. Score thấp đẹp lên bằng cách ép NV nhập tay → vi phạm đạo đức + bị BYT phát hiện.
6. Không tích hợp với mạng XH (lắng nghe Facebook, TikTok) → bị động.

## Output / Deliverables

- Module khảo sát đa kênh (tablet/ZNS/email).
- Module complaint với SLA tracking.
- Dashboard hài lòng theo khoa, theo tháng, theo NV.
- NPS + bộ tiêu chí 83 đối chiếu.
- Module social listening (option).

## UAT checklist

- [ ] BN xuất viện → ZNS sent trong 24-72h.
- [ ] Score ≤ 3 → escalate trong 24h.
- [ ] Phản ánh quá hạn 30 ngày → cảnh báo Giám đốc.
- [ ] Dashboard hiển thị score theo khoa.
- [ ] Báo cáo BYT bộ 3869 xuất đúng format.

## KPI

| Chỉ số | Mục tiêu |
| --- | --- |
| Tỉ lệ phản hồi ZNS | ≥ 20% |
| Score hài lòng trung bình | ≥ 4.2/5 |
| NPS | ≥ 50 (excellent: 70+) |
| % phản ánh xử lý đúng 30 ngày | 100% |
| Sự cố truyền thông xã hội/quý | giảm |

## Cơ sở pháp lý 2026

- **Luật KCB 15/2023/QH15** — Điều 12 quyền BN.
- **Luật Khiếu nại 02/2011/QH13** + sửa đổi.
- **Luật Tiếp công dân 42/2013/QH13**.
- **Quyết định 3869/QĐ-BYT/2019** + cập nhật 2024 — bộ câu hỏi khảo sát hài lòng.
- **Quyết định 6858/QĐ-BYT/2016** — bộ tiêu chí 83.
- **Nghị định 13/2023/NĐ-CP** — bảo vệ DLCN khi xử lý phản ánh có thông tin BN.
