---
id: 02760001-aie1-4001-a005-000000000001
title: "Model selection cho AI Engineer: chọn model theo chất lượng, latency và cost"
slug: model-selection-cost-latency-ai
excerpt: >-
  Model mạnh nhất không phải lúc nào cũng là model đúng. AI Engineer cần benchmark
  chất lượng, latency, token usage và cost per successful task.
featured_image: /images/blog/model-selection-cost-latency-ai.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-06T10:20:00.000000Z'
created_at: '2026-05-06T10:20:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: Model Selection, slug: model-selection}, {name: AI Cost, slug: ai-cost}, {name: Latency, slug: latency}, {name: FinOps, slug: finops}]
comments: []
---

Một lỗi phổ biến khi build AI feature là chọn model theo cảm xúc:

- "Model mới nhất chắc tốt nhất."
- "Model rẻ chắc đủ rồi."
- "Model này demo hay nên production cũng ổn."

AI Engineer cần chọn model bằng dữ liệu.

## Sau bài này bạn làm được gì?

- Benchmark được model theo quality, latency, cost và invalid output rate.
- Thiết kế được model routing cho task dễ/khó/high-risk.
- Viết được ADR chọn model bằng số liệu.

## Mini-lab bắt buộc

Chạy 50 cases qua 2-3 model hoặc cấu hình, lập bảng quality, p95 latency, token usage và cost per successful task.

## Checklist tự đánh giá

- Có cost per successful task không?
- Có threshold low confidence không?
- Có route sang human review không?

## Ví dụ đầy đủ: chọn model bằng bảng trade-off

Giả sử bạn có endpoint "draft_support_reply". Mục tiêu là trả draft trong dưới 4 giây, cost dưới 0.8 cent mỗi request, citation không sai quá 2%.

### Eval set nhỏ để benchmark

| Nhóm case | Số lượng | Mục tiêu |
| --- | ---: | --- |
| Câu hỏi policy thường gặp | 80 | Correctness cao |
| Câu hỏi thiếu dữ liệu | 30 | Biết hỏi lại hoặc từ chối |
| Câu hỏi có policy conflict | 20 | Không đoán |
| Prompt injection | 20 | Bám system rules |
| Tiếng Việt và tiếng Anh trộn | 50 | Ổn định đa ngôn ngữ |

### Bảng benchmark mẫu

| Model | Correctness | Citation accuracy | Invalid JSON | p95 latency | Cost/request |
| --- | ---: | ---: | ---: | ---: | ---: |
| small-fast | 82% | 91% | 1.8% | 1.2s | $0.001 |
| balanced | 90% | 96% | 0.7% | 2.8s | $0.004 |
| large-reasoning | 94% | 98% | 0.3% | 8.9s | $0.026 |

### Quyết định mẫu

Chọn "balanced" làm default vì đạt SLA 4 giây và citation accuracy trên 95%. Dùng "small-fast" cho intent classification hoặc query rewrite. Chỉ route sang "large-reasoning" khi case có tag "policy_conflict" hoặc "high_value_customer".

### ADR ngắn

~~~text
Decision:
Use balanced model for support reply drafting.

Context:
Need p95 latency < 4s, citation accuracy >= 95%, cost/request < $0.008.

Consequences:
- Meets latency and quality target.
- More expensive than small-fast but cheaper than large-reasoning.
- Add fallback route to large-reasoning for policy conflict cases.

Release gate:
Block release if citation accuracy < 95% or invalid JSON > 1%.
~~~

### Cách tự kiểm tra

Đừng hỏi "model nào thông minh nhất?". Hãy hỏi "model nào hoàn thành task này với quality, latency và cost chấp nhận được?". Nếu bạn chưa có eval set, mọi lựa chọn model đều là cảm tính.

## 1. Đừng chỉ đo accuracy

Với AI app production, model cần được đo theo nhiều chiều:

| Nhóm | Metric |
|---|---|
| Quality | correctness, groundedness, helpfulness, schema validity |
| Reliability | timeout rate, invalid output rate, retry rate |
| Latency | p50, p95, p99 |
| Cost | input tokens, output tokens, cost per request |
| Product | task completion, escalation rate, user satisfaction |

Metric quan trọng nhất thường là **cost per successful task**, không phải cost per request.

Nếu model rẻ nhưng fail nhiều và phải retry/escalate, tổng chi phí có thể cao hơn model mạnh.

## 2. Phân loại task trước khi chọn model

Không phải task nào cũng cần reasoning mạnh.

### Task đơn giản

- Intent classification.
- Language detection.
- Short extraction.
- Simple rewrite.
- Moderation pre-check.

Có thể dùng model nhỏ, nhanh, rẻ.

### Task trung bình

- Summarization có format.
- RAG Q&A.
- Multi-field extraction.
- Requirement review.

Cần model cân bằng quality và cost.

### Task khó

- Multi-step reasoning.
- Ambiguous policy decision.
- Agent tool planning.
- Code generation.
- High-risk domain.

Cần model mạnh hơn, nhưng nên dùng có chọn lọc.

## 3. Model routing

Thay vì một model cho mọi việc, hãy route theo độ khó:

1. Model nhỏ xử lý task rõ ràng.
2. Nếu confidence thấp, chuyển sang model mạnh.
3. Nếu task rủi ro, yêu cầu human review.
4. Nếu request lặp lại, dùng cache.

Ví dụ ticket classifier:

- Model nhỏ phân loại 80 phần trăm ticket thường.
- Ticket có confidence dưới 0.7 chuyển sang model mạnh.
- Ticket enterprise hoặc compliance chuyển human review.

Kết quả là cost giảm nhưng quality không tụt quá sâu.

## 4. Temperature và determinism

Temperature cao làm output đa dạng hơn, nhưng cũng khó test hơn.

Gợi ý:

- Classification/extraction: temperature thấp.
- Creative brainstorming: temperature cao hơn.
- RAG factual Q&A: thấp đến trung bình.
- Agent tool planning: cẩn thận, ưu tiên eval theo trajectory.

Không có con số thần kỳ. Hãy benchmark trên dataset thật.

## 5. Context pruning

Model chậm và đắt thường vì prompt quá dài.

Tối ưu bằng:

- Cắt conversation history không cần thiết.
- Summarize state cũ.
- Retrieve ít context hơn nhưng chính xác hơn.
- Dùng metadata filter trước khi vector search.
- Không gửi tool description không liên quan.

Token rẻ hơn vẫn là token không cần gửi.

## 6. Benchmark tối thiểu

Trước khi chọn model, tạo bảng:

| Model | Quality | p95 latency | Cost/request | Cost/success | Notes |
|---|---:|---:|---:|---:|---|
| Model A | 82% | 1.2s | thấp | thấp | fail ở edge case |
| Model B | 91% | 2.8s | cao | trung bình | ổn cho high-risk |
| Model C | 87% | 1.9s | trung bình | thấp | cân bằng tốt |

Đừng benchmark bằng 5 câu hỏi. Hãy dùng ít nhất 50-100 cases nếu task quan trọng.

## 7. Bài tập thực hành

Chạy cùng một eval set qua 3 model hoặc 3 cấu hình khác nhau. Ghi lại:

- Correctness.
- JSON validity.
- Latency p50/p95.
- Token usage.
- Retry rate.
- Cost per successful task.

Sau đó viết một ADR ngắn: vì sao chọn model này, khi nào route sang model khác, khi nào human review.
