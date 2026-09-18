---
id: 02760001-ba01-4001-a001-000000000001
title: "BA, PO, PM và AI Engineer: Ai làm gì trong product team thời AI?"
slug: ba-po-pm-ai-engineer-trong-product-team
excerpt: >-
  Phân biệt rõ vai trò BA, Product Owner, Product Manager và AI Engineer trong một
  product team hiện đại. Ai viết acceptance criteria? Ai quyết định roadmap? Ai chịu
  trách nhiệm khi AI feature sai? Hướng dẫn thực tế cho BA muốn định vị đúng trong
  thời AI.
featured_image: /images/blog/ba-roles-ai-team.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-05T08:00:00.000000Z'
created_at: '2026-05-05T08:00:00.000000Z'
author:
  id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf
  name: Duy Tran
  avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg
category:
  id: 019c9616-cat1-7001-a001-000000000001
  name: AI
  slug: ai
tags:
  - name: BA
    slug: ba
  - name: Career
    slug: career
  - name: AI
    slug: ai
  - name: Product
    slug: product
comments: []
---

Khi AI trở thành một phần trong sản phẩm, nhiều người — kể cả BA kỳ cựu — bắt đầu bối rối: **mình làm gì trong team này?** AI Engineer viết prompt, Data Scientist build model, PO ưu tiên backlog, PM lo roadmap… vậy BA ở đâu?

Bài này phân tích thẳng, không vòng vo.

---

## 1. Bản đồ vai trò trong product team có AI

Trước hết, nhìn vào bức tranh tổng thể một team làm AI feature:

| Vai trò | Trách nhiệm chính | Ra quyết định về |
|---------|------------------|-----------------|
| **BA** (Business Analyst) | Khám phá vấn đề, thu thập yêu cầu, viết acceptance criteria, đánh giá giải pháp | Yêu cầu nghiệp vụ là đúng chưa? |
| **PO** (Product Owner) | Sở hữu backlog, ưu tiên story, đại diện business trong team Agile | Story nào làm trước? |
| **PM** (Product Manager) | Chiến lược sản phẩm, go-to-market, pricing, adoption | Làm sản phẩm gì, cho ai, tại sao? |
| **AI Engineer** | Thiết kế pipeline AI, viết prompt hệ thống, tích hợp model | Giải pháp kỹ thuật AI nào khả thi? |
| **ML Engineer / Data Scientist** | Train model, fine-tune, đánh giá metric kỹ thuật | Model nào tốt hơn? |

---

## 2. BA trong AI feature: làm gì cụ thể?

### Trước khi build (Discovery)
- Phỏng vấn stakeholder để hiểu **vấn đề thực sự** — không phải chỉ nghe yêu cầu tính năng
- Viết **problem statement** có số liệu (không phải "cần chatbot", mà "tỉ lệ tự giải quyết ticket chỉ 45%, thấp hơn 25% so với mục tiêu")
- Đặt câu hỏi: AI có thực sự cần thiết ở đây không, hay rule-based đơn giản hơn?

### Trong lúc build (Requirements)
- Viết **user story** và **acceptance criteria** cho AI feature — bao gồm cả edge case và failure mode
- Định nghĩa **guardrails**: khi nào AI được phép trả lời, khi nào phải escalate cho người
- Làm việc với AI Engineer để hiểu giới hạn model, từ đó viết yêu cầu thực tế

### Sau khi go-live (Evaluation)
- Đánh giá AI feature so với business hypothesis ban đầu
- Thu thập feedback người dùng và tổng hợp thành improvement backlog

---

## 3. Điểm dễ nhầm lẫn nhất: BA vs PO

Nhiều công ty dùng BA và PO lẫn lộn. Nhưng về bản chất:

**BA** = người đào sâu vào **vấn đề** và **yêu cầu** — output là tài liệu phân tích, user story chi tiết, acceptance criteria, data mapping, process flow.

**PO** = người quản lý **backlog** và **ưu tiên** — output là product backlog đã được ưu tiên, sprint goal, và quyết định scope.

Trong nhiều team nhỏ, một người kiêm cả hai. Trong team lớn hơn, BA làm deep analysis và PO làm delivery prioritization.

---

## 4. BA cần biết về AI đến mức nào?

Không cần train model. Không cần biết gradient descent. Nhưng **phải biết**:

- **Hallucination là gì** và tại sao nó quan trọng với acceptance criteria
- **RAG vs Fine-tuning**: khi nào dùng cái nào, để viết yêu cầu đúng loại
- **Latency và cost**: AI không free — mỗi token tốn tiền, ảnh hưởng đến thiết kế flow
- **Confidence threshold**: tại ngưỡng nào AI "không chắc" thì cần human review
- **Data privacy**: input người dùng có được dùng để train không?

> BA không cần trả lời những câu hỏi này, nhưng **phải biết đặt ra** những câu hỏi này với team kỹ thuật.

---

## 5. Tóm tắt: BA định vị như thế nào trong thời AI

BA thời AI giữ nguyên lõi cũ — **hiểu vấn đề nghiệp vụ sâu hơn bất kỳ ai trong team** — nhưng thêm vào đó:

1. Biết đặt câu hỏi đúng về AI capability và limitation
2. Viết acceptance criteria cho tính năng AI (không chỉ cho tính năng CRUD thông thường)
3. Tham gia đánh giá AI output quality từ góc độ nghiệp vụ
4. Là người bảo vệ người dùng khi AI sai hoặc gây hại

Vai trò không mất đi — nó đang **nâng cấp**.
