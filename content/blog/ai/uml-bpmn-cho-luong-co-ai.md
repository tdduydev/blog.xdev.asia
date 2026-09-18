---
id: 02760001-ba01-4001-a002-000000000003
title: "UML & BPMN cho luồng có AI: Cách BA mô hình hóa tính năng AI-assisted"
slug: uml-bpmn-cho-luong-co-ai
excerpt: >-
  Khi AI tham gia vào quy trình nghiệp vụ, sơ đồ UML/BPMN truyền thống thiếu cách
  biểu diễn AI actor, fallback path và human-in-the-loop. Bài này hướng dẫn BA vẽ
  luồng AI-assisted chuẩn — có happy path, error path, confidence threshold và
  escalation sang người thật.
featured_image: /images/blog/uml-bpmn-ai-flow.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-05T10:00:00.000000Z'
created_at: '2026-05-05T10:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: UML, slug: uml}, {name: BPMN, slug: bpmn}, {name: AI, slug: ai}, {name: Modeling, slug: modeling}]
comments: []
---

Khi bạn vẽ sơ đồ cho một tính năng AI-assisted, bạn sẽ gặp câu hỏi mà UML/BPMN truyền thống không có sẵn câu trả lời: **AI là actor hay là service? Khi AI "không chắc", luồng đi đâu? Ai xử lý khi AI sai?**

Bài này giải quyết đúng những vấn đề đó.

---

## 1. Tại sao BPMN truyền thống thiếu cho AI?

BPMN 2.0 có đủ: Pool, Lane, Task, Gateway, Event. Nhưng AI đưa vào 3 yếu tố mà sơ đồ cũ chưa bắt được:

1. **Probabilistic output** — AI không return true/false mà return *confidence score*
2. **Fallback / escalation** — Khi AI không đủ tin cậy, cần luồng alternative rõ ràng
3. **Human-in-the-loop** — Người thật can thiệp ở điểm cụ thể, không phải toàn bộ

---

## 2. Ký hiệu mở rộng cho AI trong BPMN

Không cần tạo ký hiệu mới — dùng ký hiệu BPMN standard kết hợp với annotation:

| Phần tử | Dùng cho | Ghi chú |
|---------|---------|---------|
| **Service Task** (bánh răng) | AI service call | Label: "AI: [tên model/service]" |
| **Exclusive Gateway (X)** | Phân nhánh theo confidence | Label: "confidence ≥ threshold?" |
| **Intermediate Boundary Event** | Timeout / Error từ AI | Loại: Error hoặc Timer |
| **User Task** | Human review/override | Lane: Agent / Reviewer |
| **Data Object** | Confidence score, AI response | Annotate với threshold value |
| **Text Annotation** | Ghi rõ threshold, SLA | Ví dụ: "threshold = 0.75" |

---

## 3. Pattern: AI với confidence threshold

Đây là pattern phổ biến nhất khi BA thiết kế AI feature:

```
[User Input]
    ↓
[AI Service Task]
    ↓
{Confidence ≥ 0.8?}
    ├── Yes → [Auto Process] → [Notify User] → END
    └── No  → [Queue to Human Review]
                   ↓
              [Agent Reviews]
                   ↓
              {Agent Decision}
                   ├── Approve → [Process] → [Notify User] → END
                   └── Reject  → [Notify Rejection] → END
```

**Điểm quan trọng khi vẽ:**
- Threshold phải được ghi rõ (0.8 không phải "high confidence")
- Human review lane phải rõ ràng là ai (Agent? Supervisor? Domain expert?)
- Thời gian SLA cho Human task (VD: "max 4 giờ làm việc")

---

## 4. Pattern: Human-in-the-loop Escalation

Khi AI fail hoặc gặp trường hợp ngoài training data:

```
[User Request]
    ↓
[AI Classifier]
    ↓
{Case type?}
    ├── Standard → [AI Auto-Handle]
    ├── Complex  → [AI Draft + Human Review]
    └── Unknown  → [Escalate to Senior Agent]
                         ↓
                   [Agent Handles]
                         ↓
                   [Log to Training Data]  ← Vòng phản hồi quan trọng!
```

**Lưu ý BA cần capture:**
- Định nghĩa "Standard / Complex / Unknown" là gì cụ thể
- Ai là "Senior Agent"? Có SLA không?
- Training data log: ai approve trước khi đưa vào feedback loop?

---

## 5. Use Case Diagram cho AI feature

Use Case Diagram giúp align stakeholder về *ai làm gì* với hệ thống AI. Actors trong AI system:

- **End User**: Tương tác chính với AI
- **AI System**: Actor phi nhân
- **Human Agent**: Xử lý escalation
- **Admin / Data Steward**: Cấu hình threshold, review training data
- **External System**: API, database, knowledge base

Ví dụ cho AI chatbot CSKH:

```
[End User]     ──→ Gửi câu hỏi
[AI System]    ──→ Xử lý câu hỏi
               ──→ Trả lời tự động
               ──→ Escalate sang agent
[Human Agent]  ──→ Tiếp nhận escalation
               ──→ Override AI response
[Admin]        ──→ Cấu hình confidence threshold
               ──→ Review performance metrics
               ──→ Approve training data
```

---

## 6. Sequence Diagram cho AI interaction

Sequence diagram cho thấy thứ tự call giữa các system — cực kỳ hữu ích khi BA làm việc với engineering:

```
User          Frontend     AI Gateway    LLM Service   Database
 |                |              |              |           |
 |—— submit ———→  |              |              |           |
 |                |—— request ——→|              |           |
 |                |              |—— prompt ——→ |           |
 |                |              |              |—— RAG ——→ |
 |                |              |              |←— docs ——  |
 |                |              |←—response——  |           |
 |                |              | (score:0.85) |           |
 |                |←—— result ——  |              |           |
 |←— display ——   |              |              |           |
```

**Điểm BA cần chú ý khi review sequence diagram:**
- Timeout ở bước nào? Xử lý thế nào khi LLM slow?
- RAG retrieval fail → AI có fallback không?
- Response có qua content filter không?
- Audit log được ghi ở step nào?

---

## 7. Checklist vẽ sơ đồ AI-assisted flow

```
TRƯỚC KHI VẼ
☐ Xác định: AI là automatic hay recommend-only?
☐ Xác định confidence threshold (số cụ thể)
☐ Xác định escalation path và owner

TRONG KHI VẼ
☐ AI service task được label rõ model/service
☐ Confidence gateway có threshold annotation
☐ Human-in-the-loop có lane riêng và SLA
☐ Error path (AI timeout/fail) được vẽ, không bỏ sót
☐ Audit/log step được vẽ (không phải ngầm hiểu)

SAU KHI VẼ
☐ Dev confirm sequence diagram phản ánh đúng architecture
☐ Business confirm happy path đúng business logic
☐ QA confirm có thể test từng nhánh
☐ Compliance confirm audit log đủ
```

---

## 8. Tools khuyên dùng

| Tool | Dùng cho | Ghi chú |
|------|---------|---------|
| **Lucidchart** | BPMN + UML đầy đủ | Có template AI workflow |
| **draw.io / diagrams.net** | Free, offline, mọi diagram | Export XML, tích hợp Confluence |
| **Miro** | Workshop với stakeholder | Dễ collaborate real-time |
| **PlantUML** | Sequence diagram dạng code | Phù hợp lưu trong Git |
| **Figma** | Wireframe + user flow | Tốt khi kết hợp với UI design |

---

## Tổng kết

BA không cần biết code AI, nhưng **cần biết vẽ luồng AI đủ chính xác** để:
- Engineering build đúng
- QA test đủ nhánh (kể cả nhánh AI fail)
- Business hiểu khi nào AI handle tự động, khi nào người thật vào

Key additions khi vẽ AI flow: **confidence threshold cụ thể**, **human-in-the-loop lane với SLA**, **fallback path rõ ràng**, và **audit log step**.
