---
id: 02760001-ba01-4001-a003-000000000002
title: "Strategy Analysis cho BA: SWOT, PESTLE, Impact Mapping và Value Stream trong thời AI"
slug: strategy-analysis-swot-pestle-ba
excerpt: >-
  Strategy Analysis giúp BA hiểu context tổ chức trước khi viết requirement. Bài này
  hướng dẫn áp dụng SWOT, PESTLE, Impact Mapping và Value Stream Mapping vào phân
  tích chiến lược — đặc biệt khi tổ chức đang triển khai AI feature.
featured_image: /images/blog/strategy-analysis-swot.webp
type: blog
reading_time: 13
view_count: 0
meta: null
published_at: '2026-05-05T10:30:00.000000Z'
created_at: '2026-05-05T10:30:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Strategy, slug: strategy}, {name: SWOT, slug: swot}, {name: Analysis, slug: analysis}, {name: AI, slug: ai}]
comments: []
---

Trước khi viết một requirement, BA giỏi phải hiểu tổ chức đang ở đâu, muốn đi đâu, và AI sẽ đóng vai trò gì trong hành trình đó. **Strategy Analysis** là bộ công cụ để làm điều đó.

---

## 1. Tại sao Strategy Analysis quan trọng hơn bao giờ hết trong thời AI?

Nhiều tổ chức triển khai AI vì "công ty khác đang làm" — không phải vì có vấn đề cụ thể. BA là người đặt câu hỏi đúng: **AI feature này giải quyết vấn đề gì? Cho ai? Đo bằng gì?**

Không có câu trả lời rõ ràng cho 3 câu hỏi đó = dự án AI thất bại sau 3 tháng.

---

## 2. SWOT cho AI Initiative

SWOT không phải chỉ cho chiến lược cấp công ty. BA dùng SWOT để phân tích tính khả thi của một AI feature:

### Ví dụ: AI Chatbot cho Customer Support

| | Tích cực | Tiêu cực |
|---|---|---|
| **Nội lực (Internal)** | **Strengths:** Data lịch sử ticket phong phú, team có ML engineer, leadership ủng hộ | **Weaknesses:** Knowledge base chưa chuẩn hoá, không có ground truth label, team support chưa quen AI |
| **Ngoại lực (External)** | **Opportunities:** Customer kỳ vọng 24/7 support, competitor chưa có AI | **Threats:** Regulation về AI disclosure, risk hallucination làm hỏng brand |

**Cách BA dùng SWOT:**
- Strengths → Ưu tiên feature dựa trên data/capability đã có
- Weaknesses → Đưa vào Assumption Log, cần giải quyết trước khi go-live
- Opportunities → Argument để thuyết phục stakeholder đầu tư
- Threats → Đưa vào Risk Register, cần mitigation

---

## 3. PESTLE cho AI Context

PESTLE phân tích môi trường bên ngoài ảnh hưởng đến AI initiative:

| Yếu tố | Câu hỏi BA nên hỏi | Ví dụ tác động |
|---|---|---|
| **Political** | Chính sách AI của quốc gia/ngành? | Quy định AI trong tài chính, y tế |
| **Economic** | ROI expected? Budget AI so với benefit? | Tiết kiệm X FTE = Y tỷ/năm |
| **Social** | User có tin tưởng AI không? | Sợ mất việc → kháng cự adoption |
| **Technology** | Hạ tầng hiện tại có đủ? | Cần GPU, cloud, data pipeline |
| **Legal** | GDPR, PCI, HIPAA ảnh hưởng gì? | Không được dùng PII làm training |
| **Environmental** | Carbon footprint của AI training? | ESG reporting requirements |

---

## 4. Impact Mapping — Từ goal đến feature

Impact Mapping trả lời: **tại sao chúng ta build feature này?**

```
Goal (Business Outcome)
└── Who (Actors)
    └── Impact (Behaviour Change)
        └── Deliverable (Feature / Requirement)
```

### Ví dụ thực tế:

```
Goal: Giảm thời gian xử lý claim xuống 50%

├── Claims Adjuster
│   ├── Impact: Bỏ bớt manual review routine cases
│   └── Deliverable: AI auto-approve claim < 5tr, score > 0.92

├── Customer
│   ├── Impact: Nhận kết quả nhanh hơn
│   └── Deliverable: Real-time status update qua email/app

└── Compliance Officer
    ├── Impact: Audit trail đầy đủ cho AI decision
    └── Deliverable: Decision log với reasoning exportable
```

Impact Mapping ngăn **scope creep** — mọi feature phải trace về một Impact và Goal.

---

## 5. Value Stream Mapping — Tìm điểm AI có thể inject

Value Stream Mapping (VSM) vẽ toàn bộ luồng tạo ra value, từ đầu vào đến đầu ra, kèm thời gian ở mỗi bước.

### Cách đọc VSM để tìm cơ hội AI:

| Dấu hiệu | Ý nghĩa | Giải pháp AI |
|---|---|---|
| Bước có **Wait Time cao** | Bottleneck do manual | AI automate bước đó |
| Bước có **Error Rate cao** | Inconsistent human judgment | AI standardize output |
| Bước cần **nhiều người phối hợp** | Communication overhead | AI tự route / assign |
| Bước có **dữ liệu lặp lại** | Pattern predictable | AI predict thay manual lookup |

---

## 6. Quy trình Strategy Analysis trong dự án AI (thực tế)

```
1. PESTLE Scan (1-2 ngày)
   → Xác định constraints từ legal/regulation
   → Đây là hard boundary cho AI feature

2. SWOT với AI lens (half day workshop)
   → Focus vào data maturity và technical readiness
   → Output: Go/No-go signal, danh sách pre-conditions

3. Value Stream Mapping (1 ngày)
   → Tìm đúng điểm inject AI (không phải inject hết)
   → Ưu tiên theo: impact × feasibility

4. Impact Mapping (half day)
   → Align feature list với business goal
   → Output: Prioritized feature backlog
```

---

## Kết luận

Strategy Analysis không phải "phân tích cho có" — đây là foundation để mọi requirement có nghĩa. BA làm tốt phần này giúp tổ chức tránh build AI feature sai vấn đề, sai đối tượng, và sai thời điểm.

**Bước tiếp theo:** Sau khi có context chiến lược, xem [BA Planning & Monitoring](/blog/ba-planning-monitoring-ba) để lập kế hoạch thực thi.
