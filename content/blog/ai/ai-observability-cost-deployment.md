---
id: 02760001-aie1-4001-a013-000000000001
title: "AI observability, cost optimization và deployment: vận hành LLM app như production system"
slug: ai-observability-cost-deployment
excerpt: >-
  AI app cần trace prompt, retrieval, model call, tool calls, token usage, cost,
  latency, feedback, rollback, feature flags và incident runbook.
featured_image: /images/blog/ai-observability-cost-deployment.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-06T11:00:00.000000Z'
created_at: '2026-05-06T11:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: Observability, slug: observability}, {name: AI Cost, slug: ai-cost}, {name: Deployment, slug: deployment}, {name: Production AI, slug: production-ai}]
comments: []
---

AI app production cần được vận hành như một production system. Khác biệt là bạn phải quan sát thêm các thứ phần mềm truyền thống không có: prompt version, model version, retrieved context, tool trajectory, token usage và eval labels.

## Sau bài này bạn làm được gì?

- Trace được một AI request qua retrieval, model call, tool calls và feedback.
- Đo được latency, token usage, cost và failed traces.
- Chuẩn bị được rollback, kill switch và incident runbook.

## Mini-lab bắt buộc

Gắn tracing cho một AI endpoint, cố tình tạo lỗi retrieval sai rồi dùng trace để debug đến failed eval case.

## Checklist tự đánh giá

- Prompt/model/retrieval index có version không?
- Có cost dashboard không?
- Có rollback và kill switch không?

## Ví dụ đầy đủ: debug một answer sai bằng trace

Incident: khách hỏi về refund Enterprise annual. Assistant trả lời "được refund trong 30 ngày" nhưng bỏ điều kiện onboarding chưa bắt đầu.

### Trace cần có

~~~json
{
  "trace_id": "trc_20260506_0091",
  "user_id": "support_42",
  "tenant_id": "acme",
  "feature": "refund_answer_draft",
  "prompt_version": "refund-rag@2026-05-06",
  "model": "balanced",
  "latency_ms": 3120,
  "cost_usd": 0.0042,
  "retrieval": {
    "query": "enterprise annual refund 30 days",
    "top_chunks": [
      "refund-policy-v3#overview#001",
      "refund-policy-v2#enterprise#004"
    ]
  },
  "eval_labels": {
    "groundedness": "fail",
    "citation_accuracy": "partial"
  }
}
~~~

### Phân tích lỗi

| Span | Quan sát | Kết luận |
| --- | --- | --- |
| Query rewrite | Thiếu từ "onboarding" | Retrieval không lấy đúng section điều kiện |
| Retrieval | Lấy cả policy v2 cũ | Metadata/version filter thiếu |
| Generation | Answer kết luận quá mạnh | Prompt thiếu no-answer/condition rule |
| Citation | Cite overview quá rộng | Citation mapping chưa đủ chi tiết |

### Fix plan

1. Thêm metadata filter "latest_version = true".
2. Cải thiện query rewrite để giữ entity "onboarding".
3. Thêm eval case "Enterprise annual refund after onboarding started".
4. Update prompt yêu cầu nêu điều kiện trước khi kết luận.
5. Release bằng feature flag cho 10% traffic nội bộ.

### Cost optimization không làm mù observability

Bạn có thể giảm cost bằng cache, context pruning và model routing. Nhưng không được xóa trace cần để debug. Nếu sau khi tối ưu bạn không còn biết answer lấy từ chunk nào, đó là tối ưu sai.

### Dashboard tối thiểu

- p50/p95 latency theo feature.
- Cost per successful task.
- Invalid output rate.
- Retrieval no-hit rate.
- Groundedness fail rate.
- Top prompt versions gây lỗi.

## 1. Trace một request AI

Một trace tốt nên có các span:

1. API request.
2. Input validation.
3. Retrieval query.
4. Reranking.
5. Model call.
6. Tool calls.
7. Guardrail checks.
8. Output validation.
9. Response sent.
10. Feedback event.

Mỗi span nên có:

- Duration.
- Status.
- Error type.
- Input/output metadata đã redact.
- Version liên quan.

## 2. Log gì cho model call?

Tối thiểu:

- Request id.
- User/tenant id dạng an toàn.
- Model name.
- Prompt version.
- Temperature.
- Input tokens.
- Output tokens.
- Latency.
- Cost estimate.
- Stop reason.
- Retry count.
- Schema validity.

Không log raw prompt/response nếu chứa PII hoặc dữ liệu khách hàng mà chưa có policy rõ.

## 3. Debug AI issue

Khi user báo "AI trả lời sai", bạn cần trả lời được:

- Prompt version nào?
- Model nào?
- Retrieved docs nào?
- Citation nào?
- Tool nào được gọi?
- Output có pass guardrails không?
- User feedback là gì?
- Case này có trong eval set chưa?

Nếu thiếu trace, bạn chỉ đang đoán.

## 4. Cost optimization

Các đòn bẩy chính:

- Model routing.
- Prompt compaction.
- Context pruning.
- Embedding cache.
- Retrieval cache.
- Response cache cho câu hỏi phổ biến.
- Batch jobs cho tác vụ offline.
- Streaming để cải thiện perceived latency.
- Spend alerts.
- Rate limits.

Đừng chỉ tối ưu cost/request. Hãy tối ưu cost/successful task.

## 5. Latency optimization

Latency LLM app thường đến từ:

- Network call đến model.
- Retrieval chậm.
- Reranking chậm.
- Context quá dài.
- Tool calls tuần tự.
- Retry do invalid output.

Tối ưu bằng:

- Parallelize retrieval/tool read-only nếu an toàn.
- Dùng model nhỏ cho bước đơn giản.
- Stream output.
- Cache embedding.
- Giảm top-k.
- Validate sớm để không gọi model vô ích.

## 6. Deployment và rollback

AI app có nhiều thứ cần version:

- Prompt.
- Model.
- Retrieval index.
- Tool schema.
- Guardrail policy.
- Eval dataset.

Release an toàn nên có:

- Staging environment.
- Feature flag.
- Canary rollout.
- Eval gate.
- Rollback prompt/model/index.
- Kill switch cho agent tool write.
- Incident runbook.

Nếu chỉ deploy code mà không version prompt, bạn sẽ rất khó rollback hành vi AI.

## 7. Incident runbook

Một incident AI có thể là:

- Hallucination gây thiệt hại.
- Data leak.
- Prompt injection thành công.
- Cost spike.
- Latency spike.
- Tool misuse.

Runbook nên có:

1. Cách tắt feature hoặc chuyển fallback.
2. Cách xác định trace bị ảnh hưởng.
3. Cách rotate key nếu cần.
4. Cách rollback prompt/model.
5. Cách thông báo stakeholder.
6. Cách thêm incident case vào eval set.

## 8. Bài tập thực hành

Thêm observability cho một AI endpoint:

- Trace id.
- Prompt version.
- Model version.
- Retrieval docs ids.
- Token usage.
- Cost estimate.
- Latency p50/p95 dashboard.
- Feedback event.

Sau đó cố tình tạo một lỗi retrieval sai và dùng trace để debug. Đây là kỹ năng production rất thật.
