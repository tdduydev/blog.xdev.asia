---
id: 02760001-aie1-4001-a011-000000000001
title: "Evaluation-driven AI Engineering: eval dataset, rubrics, graders và release gates"
slug: eval-driven-ai-engineering
excerpt: >-
  Evals là cách đưa AI feature từ cảm giác sang kỹ thuật. Học cách tạo objective,
  dataset, rubrics, automated graders, human review và release gate.
featured_image: /images/blog/eval-driven-ai-engineering.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-06T10:50:00.000000Z'
created_at: '2026-05-06T10:50:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: Evaluation, slug: evaluation}, {name: Evals, slug: evals}, {name: AI Engineer, slug: ai-engineer}, {name: CI/CD, slug: cicd}]
comments: []
---

Phần lớn bug phần mềm truyền thống có thể test bằng assert rõ ràng. AI feature khó hơn vì output biến thiên, có nhiều cách trả lời đúng, và chất lượng không chỉ là pass/fail.

Evals giúp bạn đo chất lượng AI một cách có hệ thống.

## Sau bài này bạn làm được gì?

- Viết được eval objective, dataset card và rubric.
- Kết hợp được exact checks, schema checks, LLM judge và human review.
- Đưa eval vào CI/CD làm release gate.

## Mini-lab bắt buộc

Tạo eval harness cho RAG assistant: 100 cases, expected docs, rubric groundedness, report và threshold fail CI.

## Checklist tự đánh giá

- Dataset có edge/adversarial cases không?
- Rubric có đủ cụ thể không?
- Release gate có block regression không?

## Ví dụ đầy đủ: eval plan cho ticket classifier

Bạn muốn release prompt mới cho ticket classifier. Thay vì đọc 10 output thấy ổn, hãy tạo eval plan nhỏ nhưng có sức chặn regression.

### Dataset card

~~~text
Dataset: ticket-classifier-regression-v1
Size: 200 cases
Owner: ai-platform-team
Last updated: 2026-05-06

Distribution:
- billing: 50
- technical: 45
- account: 35
- security: 30
- other: 20
- adversarial / prompt injection: 20
~~~

### Rubric

| Metric | Pass threshold | Cách chấm |
| --- | ---: | --- |
| Category accuracy | >= 90% | Exact match với expected category |
| Urgency accuracy | >= 88% | Exact match hoặc accepted alternate |
| Invalid JSON rate | <= 1% | Schema validation |
| Security false negative | 0 case critical | Security ticket không được route sai low/medium |
| Explanation quality | >= 4/5 | Human review 30 sample |

### Eval output mẫu

~~~json
{
  "run_id": "eval_20260506_1130",
  "prompt_version": "ticket-classifier@2026-05-06",
  "model": "balanced",
  "results": {
    "category_accuracy": 0.915,
    "urgency_accuracy": 0.89,
    "invalid_json_rate": 0.005,
    "security_false_negative": 0,
    "explanation_quality_avg": 4.2
  },
  "decision": "pass"
}
~~~

### Release gate trong CI

~~~yaml
ai_eval_gate:
  block_if:
    category_accuracy_below: 0.90
    urgency_accuracy_below: 0.88
    invalid_json_rate_above: 0.01
    security_false_negative_above: 0
~~~

### Cách tự kiểm tra

Lấy 5 output sai nhất, viết failure taxonomy:

- Prompt hiểu sai intent.
- Input thiếu dữ liệu.
- Category overlap.
- Schema invalid.
- Policy/security conflict.

Sau đó thêm mỗi lỗi ít nhất một case mới vào dataset. Eval dataset phải sống cùng production, không phải file tạo một lần cho đẹp.

## 1. Eval objective

Đừng bắt đầu bằng tool. Bắt đầu bằng câu hỏi:

> Chúng ta muốn hệ thống làm tốt điều gì?

Ví dụ:

- Q&A phải trả lời đúng dựa trên tài liệu.
- Ticket classifier phải route đúng category.
- Summarizer phải giữ đủ decision và action items.
- Agent phải dùng đúng tools và không tự ý gây side effect.

Objective càng rõ, eval càng hữu ích.

## 2. Dataset

Eval dataset nên gồm:

- Typical cases.
- Edge cases.
- Adversarial cases.
- Historical production cases.
- Domain-specific hard cases.
- Cases cần refusal.
- Cases nhiều ngôn ngữ nếu sản phẩm hỗ trợ.

Đừng chỉ dùng câu hỏi dễ. Dataset dễ tạo cảm giác an toàn giả.

Một sample có thể gồm:

```json
{
  "input": "User question or task",
  "expected_behavior": "answer_with_citation",
  "expected_facts": ["..."],
  "risk": "medium",
  "tags": ["billing", "policy", "edge-case"]
}
```

## 3. Metrics

Tùy task:

### Extraction/classification

- Exact match.
- F1.
- JSON validity.
- Enum validity.

### RAG

- Context recall.
- Context precision.
- Groundedness.
- Citation accuracy.
- No-answer accuracy.

### Summarization

- Key point coverage.
- Faithfulness.
- Conciseness.
- Action item accuracy.

### Agent

- Tool trajectory.
- Argument correctness.
- Final response quality.
- Safety violation rate.

## 4. Rubrics

Nhiều task cần chấm theo rubric. Ví dụ groundedness:

- 5: tất cả factual claims có nguồn rõ.
- 4: gần như đầy đủ, thiếu citation cho claim phụ.
- 3: có vài claim chưa được hỗ trợ.
- 2: nhiều claim không có trong context.
- 1: bịa hoặc trái nguồn.

Rubric phải đủ cụ thể để hai reviewer chấm không lệch quá xa.

## 5. Automated graders

Bạn có thể dùng:

- Rule-based checks.
- Schema validation.
- Exact match.
- Regex.
- LLM-as-judge.
- Pairwise comparison.

LLM-as-judge hữu ích nhưng không nên mù quáng. Hãy calibrate bằng human review, đặc biệt với domain rủi ro.

## 6. Release gates

Eval nên vào CI/CD.

Ví dụ policy:

- JSON validity phải >= 99%.
- Unsafe answer rate phải = 0 trên safety set.
- Groundedness không được giảm hơn 2 điểm phần trăm.
- Cost per successful task không tăng quá 20 phần trăm.
- Các regression case critical phải pass 100%.

Nếu fail, block release prompt/model/RAG change.

## 7. Data flywheel

Eval dataset không đứng yên. Nó nên lớn dần từ:

- User feedback.
- Failed traces.
- Support corrections.
- Human review.
- Incident postmortem.
- New product policy.

Mỗi lần production có lỗi, hãy hỏi: lỗi này đã có trong eval chưa? Nếu chưa, thêm vào.

## 8. Bài tập thực hành

Tạo eval harness cho một RAG assistant:

1. 100 questions.
2. Expected docs.
3. Expected answer facts.
4. Rubric groundedness 1-5.
5. Script chạy model và xuất CSV report.
6. CI fail nếu score giảm quá ngưỡng.

Khi eval chạy tự động, AI Engineering bắt đầu giống engineering thật hơn.
