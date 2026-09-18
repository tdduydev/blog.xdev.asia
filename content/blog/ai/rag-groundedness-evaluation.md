---
id: 02760001-aie1-4001-a007-000000000001
title: "RAG groundedness: citation, no-answer policy và đánh giá retrieval"
slug: rag-groundedness-evaluation
excerpt: >-
  RAG không chỉ là lấy top-k rồi hỏi model. Cần citation đúng, no-answer behavior,
  context precision/recall, groundedness rubric và feedback loop từ production.
featured_image: /images/blog/rag-groundedness-evaluation.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-06T10:30:00.000000Z'
created_at: '2026-05-06T10:30:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: RAG, slug: rag}, {name: Evaluation, slug: evaluation}, {name: Groundedness, slug: groundedness}, {name: Citation, slug: citation}]
comments: []
---

RAG thường được bán như giải pháp giảm hallucination. Đúng, nhưng chưa đủ.

RAG chỉ giúp khi retrieved context đúng. Nếu context sai, thiếu, cũ hoặc không liên quan, model vẫn có thể trả lời sai với vẻ rất tự tin.

## Sau bài này bạn làm được gì?

- Thiết kế được answer schema có citation, confidence và missing_info.
- Đo được context recall, context precision, groundedness và citation accuracy.
- Viết được no-answer policy cho RAG.

## Mini-lab bắt buộc

Tạo 100 câu hỏi có expected supporting docs, đo top-3 recall và chấm groundedness thủ công cho 20 câu khó nhất.

## Checklist tự đánh giá

- Answer có citation đúng đoạn không?
- Model có từ chối khi thiếu nguồn không?
- Có tách lỗi retrieval với lỗi generation không?

## Ví dụ đầy đủ: chấm một câu trả lời RAG

User hỏi:

> Gói Enterprise annual có được refund nếu đã bắt đầu onboarding chưa?

Retrieved context:

~~~json
[
  {
    "chunk_id": "refund-policy-v3#enterprise-annual-contract#002",
    "text": "Enterprise annual contracts are eligible for refund review within 30 days only when onboarding has not started and no custom integration work has been delivered."
  },
  {
    "chunk_id": "onboarding-guide-v2#kickoff#001",
    "text": "Onboarding starts when the kickoff call is completed and the implementation plan is approved by the customer."
  }
]
~~~

### Answer tốt

~~~json
{
  "status": "answered",
  "answer": "Không chắc được refund tự động. Với Enterprise annual, refund chỉ được review trong 30 ngày khi onboarding chưa bắt đầu và chưa có custom integration work. Nếu kickoff đã hoàn tất và implementation plan đã được duyệt, case này cần support/legal review.",
  "citations": [
    "refund-policy-v3#enterprise-annual-contract#002",
    "onboarding-guide-v2#kickoff#001"
  ],
  "confidence": 0.82,
  "missing_info": ["ngày ký hợp đồng", "kickoff đã hoàn tất chưa", "có custom integration work chưa"]
}
~~~

### Answer xấu

~~~json
{
  "status": "answered",
  "answer": "Có, khách Enterprise luôn được refund trong 30 ngày.",
  "citations": ["refund-policy-v3#enterprise-annual-contract#002"],
  "confidence": 0.95
}
~~~

Lỗi: câu "luôn được refund" không có trong context. Citation có tồn tại nhưng không support claim. Đây là citation-looking-good nhưng groundedness fail.

### Rubric chấm tay

| Metric | Điểm 0 | Điểm 1 | Điểm 2 |
| --- | --- | --- | --- |
| Context recall | Không lấy nguồn đúng | Lấy một phần | Lấy đủ nguồn chính |
| Groundedness | Có claim bịa | Hầu hết đúng nhưng thiếu điều kiện | Tất cả claim quan trọng có nguồn |
| Citation accuracy | Cite sai hoặc quá rộng | Cite đúng doc sai section | Cite đúng chunk/section |
| No-answer behavior | Đoán khi thiếu dữ liệu | Có nói thiếu nhưng vẫn kết luận mạnh | Nêu rõ thiếu gì và next action |

### Cách tự kiểm tra

Với 20 câu khó nhất, đừng chỉ nhìn answer. Hãy highlight từng factual claim trong answer, rồi nối nó với chunk hỗ trợ. Claim nào không nối được thì tính là ungrounded.

## 1. Grounded answer là gì?

Một câu trả lời grounded nghĩa là các factual claims quan trọng đều dựa trên nguồn được cung cấp.

Ví dụ user hỏi:

> Gói Enterprise có được hoàn tiền sau 30 ngày không?

Answer grounded cần:

- Dựa trên refund policy đúng version.
- Nêu điều kiện cụ thể.
- Cite nguồn.
- Không bịa exception nếu tài liệu không nói.
- Nếu thiếu thông tin, nói rõ thiếu gì.

## 2. Citation không chỉ để trang trí

Citation giúp:

- User kiểm tra nguồn.
- Support team audit câu trả lời.
- AI Engineer debug retrieval.
- Product/legal review risk.

Citation tốt nên trỏ đến:

- Document id.
- Section hoặc heading.
- URL nội bộ nếu có.
- Version hoặc updated_at.

Đừng chỉ cite tên tài liệu nếu tài liệu dài 80 trang. User cần biết đoạn nào hỗ trợ answer.

## 3. No-answer policy

Một AI assistant tốt phải biết khi nào không trả lời.

Các trường hợp nên no-answer:

- Không tìm thấy context liên quan.
- Context mâu thuẫn.
- User hỏi ngoài scope.
- User yêu cầu dữ liệu không có quyền xem.
- Câu hỏi cần quyết định pháp lý/tài chính/y tế rủi ro.
- Retrieved docs quá cũ hoặc không có owner.

No-answer không nên chỉ là "tôi không biết". Tốt hơn:

```json
{
  "status": "needs_more_context",
  "answer": "Mình chưa tìm thấy chính sách hoàn tiền áp dụng cho gói này.",
  "missing_info": ["plan type", "contract region"],
  "next_action": "escalate_support"
}
```

## 4. Đánh giá retrieval trước answer

Nếu answer sai, nguyên nhân có thể là:

- Retrieval lấy sai docs.
- Context đúng nhưng prompt yếu.
- Model không bám context.
- Citation mapping sai.

Vì vậy cần đo retrieval riêng:

### Context recall

Trong các docs được lấy, có chứa nguồn đúng không?

### Context precision

Trong các docs được lấy, bao nhiêu phần thật sự liên quan?

### Citation accuracy

Citation có hỗ trợ claim được cite không?

### Groundedness

Answer có claim nào không có trong context không?

## 5. Eval dataset cho RAG

Dataset nên có:

- Query.
- Expected answer ngắn.
- Expected supporting document ids.
- Expected refusal nếu thiếu nguồn.
- Tags: domain, difficulty, language, risk.

Ví dụ:

```json
{
  "query": "Có thể refund sau 30 ngày không?",
  "expected_docs": ["refund-policy-v3"],
  "expected_behavior": "answer_with_conditions",
  "risk": "medium"
}
```

## 6. Feedback loop

Production RAG cần học từ lỗi thật:

- User downvote answer.
- User click citation nhưng vẫn escalate.
- Support sửa câu trả lời.
- Query không có docs phù hợp.
- Citation sai.

Các case này nên được review và promote vào eval dataset. Dataset sống giúp RAG tốt dần thay vì chỉ tốt ở ngày demo.

## 7. Bài tập thực hành

Với RAG app của bạn:

1. Tạo 100 câu hỏi.
2. Gắn expected supporting docs.
3. Đo top-3 recall.
4. Đo answer groundedness bằng rubric.
5. Đo citation accuracy thủ công cho 20 câu khó nhất.
6. Thêm no-answer policy cho case không có source.

Khi RAG có thể nói "không đủ dữ liệu" đúng lúc, hệ thống đã trưởng thành hơn rất nhiều.
