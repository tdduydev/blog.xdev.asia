---
id: 02760001-aie1-4001-a008-000000000001
title: "Workflow vs Agent: khi nào cần agent, khi nào chỉ cần code rõ ràng?"
slug: workflow-vs-agent-tool-calling
excerpt: >-
  Không phải cứ có LLM là phải dùng agent. Workflow deterministic thường rẻ, nhanh,
  dễ test hơn. Agent chỉ nên dùng khi bài toán cần quyết định linh hoạt và tool choice động.
featured_image: /images/blog/workflow-vs-agent-tool-calling.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-06T10:35:00.000000Z'
created_at: '2026-05-06T10:35:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: AI Agent, slug: ai-agent}, {name: Workflow, slug: workflow}, {name: Tool Calling, slug: tool-calling}, {name: AI Engineer, slug: ai-engineer}]
comments: []
---

Agent rất hấp dẫn. Một model tự quyết định gọi tool nào, làm bước nào, sửa lỗi ra sao. Nhưng trong production, agent cũng mang theo latency, cost và nondeterminism.

Câu hỏi đúng không phải là "có dùng agent được không?". Câu hỏi đúng là:

> Bài toán này có thật sự cần agent không?

## Sau bài này bạn làm được gì?

- Phân biệt được deterministic workflow, tool calling và agent.
- Biết khi nào không nên dùng agent.
- Thiết kế được hybrid flow có boundaries rõ.

## Mini-lab bắt buộc

Thiết kế cùng một support assistant bằng workflow và agent, so sánh latency, eval effort, permission risk và failure modes.

## Checklist tự đánh giá

- Flow có thật sự cần agent không?
- Tool write có confirmation không?
- Có eval trajectory không?

## Ví dụ đầy đủ: cùng một use case, workflow hay agent?

Use case: xử lý yêu cầu "Tạo bản nháp refund reply cho ticket và cập nhật CRM note".

### Thiết kế bằng workflow

~~~text
1. Classify ticket intent.
2. Retrieve refund policy.
3. Generate draft reply.
4. Validate output schema.
5. Show draft to support agent.
6. Nếu agent approve, gọi API update CRM note.
~~~

Workflow phù hợp khi các bước rõ, thứ tự ổn định và write action phải có kiểm soát.

### Thiết kế bằng agent

Tools:

~~~json
[
  {"name": "search_policy", "mode": "read"},
  {"name": "get_customer_contract", "mode": "read"},
  {"name": "draft_reply", "mode": "draft"},
  {"name": "update_crm_note", "mode": "write", "requires_confirmation": true}
]
~~~

Agent phù hợp hơn nếu câu hỏi có nhiều đường đi khác nhau, ví dụ phải tự quyết định cần xem policy, contract, invoice hay escalation history.

### Decision record mẫu

| Câu hỏi | Workflow | Agent |
| --- | --- | --- |
| Thứ tự bước có ổn định không? | Có | Không chắc |
| Tool write có rủi ro không? | Có, cần confirmation | Có, càng cần giới hạn quyền |
| Có cần planner tự chọn nhiều tool không? | Không nhiều | Có thể |
| Debug khi sai có dễ không? | Dễ hơn | Khó hơn, cần trajectory eval |

Decision: bắt đầu bằng workflow. Chỉ thêm agent planner cho bước research khi số loại ticket tăng và workflow rẽ nhánh quá nhiều.

### Trajectory kỳ vọng nếu dùng agent

~~~json
[
  {"tool": "search_policy", "args": {"query": "enterprise annual refund onboarding"}},
  {"tool": "get_customer_contract", "args": {"customer_id": "cus_123"}},
  {"tool": "draft_reply", "args": {"tone": "supportive", "include_citations": true}},
  {"tool": "update_crm_note", "args": {"ticket_id": "TCK-1842", "note_status": "draft_only"}}
]
~~~

Nếu agent gọi "update_crm_note" trước khi có approval, đó là failure dù answer nghe hay. Với agent, bạn phải test cả đường đi, không chỉ test câu trả lời cuối.

## 1. Workflow là gì?

Workflow là quy trình có bước rõ ràng do code điều phối.

Ví dụ xử lý ticket:

1. Classify intent.
2. Nếu billing thì gọi billing policy retrieval.
3. Generate answer draft.
4. Run safety check.
5. Nếu confidence thấp thì escalate.

Model có thể tham gia từng bước, nhưng flow chính nằm trong code.

Ưu điểm:

- Dễ test.
- Dễ debug.
- Dễ đo latency/cost.
- Dễ kiểm soát permission.
- Dễ giải thích với stakeholder.

## 2. Agent là gì?

Agent có instruction, tools và khả năng quyết định động:

- Cần gọi tool nào?
- Gọi theo thứ tự nào?
- Dùng kết quả tool ra sao?
- Có cần hỏi lại user không?
- Có cần thử đường khác không?

Agent phù hợp khi task mở và khó hard-code toàn bộ path.

Ví dụ:

- Điều tra incident qua nhiều hệ thống logs/metrics/tickets.
- Trợ lý operations xử lý yêu cầu không có flow cố định.
- Research assistant cần tìm, đọc, so sánh, tổng hợp nhiều nguồn.

## 3. Decision framework

Ưu tiên workflow nếu:

- Business process rõ.
- Số bước ít.
- Tool choice đơn giản.
- Có compliance cao.
- Cần latency thấp.
- Cần predictability.

Cân nhắc agent nếu:

- User goal đa dạng.
- Tool choice phụ thuộc ngữ cảnh.
- Cần nhiều bước linh hoạt.
- Không thể liệt kê hết path.
- Có eval trajectory và guardrails đủ tốt.

## 4. Hybrid thường thực tế nhất

Nhiều hệ thống tốt dùng hybrid:

- Code giữ policy và boundaries.
- Model làm reasoning trong phạm vi hẹp.
- Agent chỉ được dùng trong sandbox hoặc read-only phase.
- Tool write cần confirmation.
- High-risk path chuyển human review.

Ví dụ:

1. Workflow nhận request.
2. Agent read-only tìm thông tin.
3. Workflow validate result.
4. User xác nhận.
5. Code gọi write tool.

Như vậy agent linh hoạt nhưng không có quyền tự ý gây side effect.

## 5. Tool calling không đồng nghĩa agent

Bạn có thể dùng tool calling trong workflow deterministic.

Ví dụ:

- Model chọn category.
- Code quyết định tool cần gọi.
- Tool trả dữ liệu.
- Model viết câu trả lời cuối.

Ở đây model không tự điều phối toàn bộ workflow. Đây thường là lựa chọn tốt cho production version đầu.

## 6. Failure modes của agent

Agent có thể:

- Gọi tool sai.
- Gọi tool đúng với argument sai.
- Lặp vô hạn.
- Bỏ qua instruction.
- Tin tool output không đáng tin.
- Làm quá nhiều bước không cần thiết.
- Tốn token và latency khó đoán.

Vì vậy agent cần trace và trajectory eval, không chỉ final answer eval.

## 7. Bài tập thực hành

Chọn một use case như "AI assistant hỗ trợ nhân viên CSKH".

Viết hai thiết kế:

1. Workflow deterministic.
2. Single-agent có tools.

So sánh:

- Số model calls.
- Số tools.
- Latency dự kiến.
- Failure modes.
- Eval cần viết.
- Permission risk.

Nếu workflow giải quyết được 80 phần trăm nhu cầu, hãy ship workflow trước. Agent nên là quyết định có chủ đích, không phải phản xạ.
