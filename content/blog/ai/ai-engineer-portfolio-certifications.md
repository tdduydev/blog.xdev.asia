---
id: 02760001-aie1-4001-a014-000000000001
title: "Portfolio AI Engineer: case study, eval report, safety review và chứng chỉ nên học"
slug: ai-engineer-portfolio-certifications
excerpt: >-
  Portfolio AI Engineer tốt không chỉ có demo. Cần architecture, trade-off,
  eval report, safety review, cost report, incident thinking và roadmap học chứng chỉ hợp lý.
featured_image: /images/blog/ai-engineer-portfolio-certifications.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-06T11:05:00.000000Z'
created_at: '2026-05-06T11:05:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: AI Engineer, slug: ai-engineer}, {name: Portfolio, slug: portfolio}, {name: Certification, slug: certification}, {name: Career, slug: career}]
comments: []
---

Portfolio AI Engineer không nên chỉ là một chatbot demo. Nhà tuyển dụng hoặc team lead cần thấy bạn biết đưa AI vào production có trách nhiệm.

Một case study tốt phải trả lời: bạn đã build gì, trade-off gì, đo thế nào, bảo vệ ra sao và vận hành thế nào.

## Sau bài này bạn làm được gì?

- Viết được portfolio case study có architecture, eval, safety, cost và deployment.
- Chuẩn bị được demo gồm happy path, edge case và safety/fallback case.
- Chọn được chứng chỉ phù hợp mục tiêu nghề nghiệp thay vì học lan man.

## Mini-lab bắt buộc

Viết case study 1 trang cho project AI assistant của bạn, kèm eval report trước/sau và safety review.

## Checklist tự đánh giá

- Có trade-off RAG vs fine-tuning không?
- Có cost/latency numbers không?
- Có demo safety case không?

## Ví dụ đầy đủ: case study portfolio đủ sức đi phỏng vấn

Một project portfolio tốt không chỉ ghi "built RAG chatbot". Nó phải chứng minh bạn biết đưa AI feature qua vòng đời production.

### Cấu trúc case study

~~~text
Title:
Refund Policy Assistant for B2B SaaS Support

Problem:
Support agents mất 6 phút để đọc policy và draft câu trả lời refund.

Constraints:
- Policy thay đổi hàng tuần.
- Answer phải có citation.
- AI không được tự gửi email hoặc cam kết refund.

Solution:
- RAG với metadata filter và citation.
- Prompt contract structured output.
- Human approval trước khi gửi.
- Eval gate trước release.
~~~

### Architecture summary

~~~text
User ticket
  -> API endpoint with auth
  -> query rewrite
  -> hybrid retrieval with ACL/version filter
  -> prompt contract
  -> model structured output
  -> schema validation
  -> groundedness check
  -> draft shown to support agent
  -> feedback stored for eval
~~~

### Metrics để show

| Metric | Before | After |
| --- | ---: | ---: |
| Avg draft time | 6 phút | 75 giây |
| Citation accuracy | N/A | 96% |
| No-answer correctness | N/A | 91% |
| Invalid JSON rate | N/A | 0.6% |
| Cost/request | N/A | $0.004 |

### Interview story bank

- Trade-off: Vì sao chọn RAG thay vì fine-tuning?
- Reliability: Làm gì khi model trả output invalid?
- Security: Agent có quyền gì, write action được chặn ra sao?
- Evaluation: Dataset gồm case nào, release gate thế nào?
- Operations: Debug một answer sai từ trace ra sao?

### Artifact nên đính kèm

- GitHub repo có README rõ.
- Demo video 3-5 phút.
- Eval report có bảng metric.
- Screenshot trace hoặc dashboard đã che dữ liệu nhạy cảm.
- Prompt contract versioned.
- Threat model ngắn.

Nếu case study của bạn trả lời được các câu trên, portfolio không còn là "mình có làm chatbot", mà là "mình biết ship AI system có kiểm soát".

## 1. Project nên có đủ vòng đời

Chọn một project vừa đủ:

- RAG assistant cho tài liệu sản phẩm.
- Support ticket classifier.
- Meeting summarizer có action items.
- Agent read-only điều tra incident.
- AI code review assistant nội bộ.

Đừng chọn project quá rộng như "trợ lý làm mọi thứ". Scope nhỏ nhưng production-ready có giá trị hơn demo lớn nhưng rỗng.

## 2. Architecture section

Case study nên có sơ đồ:

- Frontend hoặc chat UI.
- Backend API.
- Model provider.
- Prompt/version store.
- Vector database.
- Ingestion pipeline.
- Eval harness.
- Guardrails.
- Observability.
- Deployment environment.

Sơ đồ không cần phức tạp, nhưng phải thể hiện bạn hiểu hệ thống end-to-end.

## 3. Trade-off section

Viết rõ bạn đã quyết định gì:

- Vì sao dùng RAG thay vì fine-tuning?
- Vì sao dùng workflow thay vì agent?
- Vì sao chọn model A thay vì B?
- Vì sao top-k là 5 chứ không phải 20?
- Vì sao tool write cần confirmation?
- Vì sao lưu logs đã redact?

Người đọc portfolio muốn thấy tư duy, không chỉ screenshot.

## 4. Eval report

Đây là phần nhiều portfolio thiếu.

Tối thiểu có:

- Dataset size.
- Loại cases.
- Metrics.
- Baseline score.
- Score sau cải tiến.
- Failed examples.
- Next improvements.

Ví dụ:

| Version | Groundedness | Citation accuracy | No-answer accuracy |
|---|---:|---:|---:|
| v1 prompt-only | 62% | 0% | 20% |
| v2 RAG | 81% | 74% | 48% |
| v3 RAG + refusal | 88% | 86% | 79% |

## 5. Safety review

Hãy có một section riêng:

- Prompt injection risks.
- PII policy.
- Data retention.
- Tool permission.
- Abuse cases.
- Guardrails.
- Human escalation.

Một AI Engineer production phải biết nói về failure modes.

## 6. Cost và latency report

Ghi:

- Model used.
- Average input/output tokens.
- p50/p95 latency.
- Cost per request.
- Cost per successful task.
- Optimization đã làm.

Nếu bạn có model routing hoặc caching, giải thích bằng số.

## 7. Demo video

Demo nên có 3 phần:

1. Happy path.
2. Edge case.
3. Safety/fallback case.

Ví dụ RAG assistant:

- Trả lời câu hỏi có citation.
- Từ chối khi thiếu nguồn.
- Không leak thông tin khi user hỏi ngoài quyền.

## 8. Chứng chỉ nên học

Chứng chỉ không thay portfolio, nhưng giúp có cấu trúc học:

- Cloud AI fundamentals nếu bạn mới vào AI.
- Azure AI Engineer nếu hướng enterprise Microsoft stack.
- GCP Professional ML Engineer nếu muốn ML platform/data pipeline sâu hơn.
- AWS AI/ML nếu team dùng AWS.
- NVIDIA DLI nếu muốn nền tảng deep learning/GPU thực hành.

Chọn theo môi trường bạn muốn làm, không học chỉ để sưu tầm badge.

## 9. Bài tập thực hành

Viết case study 1 trang theo template:

1. Problem.
2. Users.
3. Architecture.
4. Data.
5. Prompt/RAG/agent design.
6. Evals.
7. Safety.
8. Deployment.
9. Cost/latency.
10. Lessons learned.

Một portfolio như vậy sẽ nổi bật hơn rất nhiều so với "chatbot dùng API".
