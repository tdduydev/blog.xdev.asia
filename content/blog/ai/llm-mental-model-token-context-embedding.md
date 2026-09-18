---
id: 02760001-aie1-4001-a003-000000000001
title: "LLM mental model: token, context window, embedding, RAG và fine-tuning"
slug: llm-mental-model-token-context-embedding
excerpt: >-
  AI Engineer không cần train foundation model từ đầu, nhưng phải hiểu token,
  context window, embeddings, RAG, fine-tuning và trade-off giữa chúng.
featured_image: /images/blog/llm-mental-model-token-context-embedding.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-06T10:10:00.000000Z'
created_at: '2026-05-06T10:10:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: LLM, slug: llm}, {name: Embeddings, slug: embeddings}, {name: RAG, slug: rag}, {name: Fine-tuning, slug: fine-tuning}]
comments: []
---

Bạn không cần biết mọi chi tiết toán học của transformer để làm AI Engineer sản phẩm. Nhưng bạn cần một mental model đủ đúng để ra quyết định kỹ thuật.

## Sau bài này bạn làm được gì?

- Giải thích được token, context window, embedding, RAG và fine-tuning bằng ví dụ.
- Chọn được prompt-only, RAG hoặc fine-tuning cho một use case cụ thể.
- Tính được token budget sơ bộ cho một request production.

## Mini-lab bắt buộc

Lấy 20 FAQ, chạy prompt-only và RAG đơn giản, so sánh câu nào đúng, câu nào bịa, câu nào thiếu nguồn.

## Checklist tự đánh giá

- Có token budget không?
- Có biết dữ liệu nào nằm ngoài context không?
- Có decision tree Prompt/RAG/Fine-tuning không?

## Ví dụ đầy đủ: chọn Prompt, RAG hay Fine-tuning cho support assistant

Một team muốn assistant trả lời câu hỏi về policy nội bộ. Có 300 trang tài liệu, thay đổi mỗi tuần, người dùng hỏi bằng tiếng Việt và tiếng Anh.

### Bước 1: tính context budget

Giả sử model có context window 128k token. Bạn không nên nhồi hết 300 trang vào prompt, vì:

- Chi phí mỗi request tăng mạnh.
- Model dễ bị nhiễu bởi đoạn không liên quan.
- Policy mới và cũ có thể mâu thuẫn.
- Latency khó kiểm soát.

Một budget thực tế hơn:

| Thành phần | Token dự kiến |
| --- | ---: |
| System prompt và policy rules | 900 |
| Conversation history tóm tắt | 700 |
| User question | 120 |
| Retrieved context top 5 chunks | 4,500 |
| Output answer + citation | 500 |
| Safety margin | 1,000 |

Tổng khoảng 7,720 token. Đây là con số bạn có thể đo, tối ưu và đưa vào cost model.

### Bước 2: decision table

| Lựa chọn | Khi nào dùng | Vì sao |
| --- | --- | --- |
| Prompt-only | Rules ngắn, ít thay đổi, không cần knowledge lớn | Nhanh và rẻ nhất |
| RAG | Knowledge lớn, thay đổi thường xuyên, cần citation | Không phải train lại khi tài liệu đổi |
| Fine-tuning | Cần style/format ổn định hoặc phân loại pattern lặp lại | Tốt cho behavior, không tốt để nhét facts mới |
| Hybrid | RAG cho facts, fine-tune hoặc prompt contract cho format | Production thường rơi vào nhóm này |

### Bước 3: embedding mental model

Embedding không "hiểu" tài liệu như người. Nó biến text thành vector để tìm đoạn gần nghĩa với query. Vì vậy query "refund sau 30 ngày" có thể kéo được đoạn "cancellation policy after the first billing cycle" nếu semantic gần nhau.

Nhưng embedding cũng có lỗi:

- Từ khóa pháp lý nhỏ có thể bị bỏ qua.
- Query mơ hồ lấy nhầm policy.
- Chunk thiếu heading làm mất ngữ cảnh.
- Tài liệu cũ và mới cùng được retrieve nếu metadata không lọc.

### Bài tập có đáp án mẫu

Use case: "Người dùng hỏi giới hạn API theo từng plan".

Lựa chọn tốt: RAG, vì giới hạn plan là facts thay đổi theo thời gian và cần citation.

Không nên fine-tune chỉ để model nhớ giới hạn API, vì mỗi lần pricing thay đổi bạn phải train hoặc update lại. Nếu cần tone trả lời ổn định, hãy dùng prompt contract hoặc fine-tune nhẹ cho style, còn facts vẫn lấy từ RAG.

## 1. Token là đơn vị chi phí và ngữ cảnh

Model không đọc chữ như con người. Text được chia thành token. Token có thể là một từ, một phần từ, dấu câu, hoặc ký tự tùy ngôn ngữ.

Token ảnh hưởng trực tiếp đến:

- Chi phí.
- Latency.
- Context window.
- Độ dài output.
- Khả năng nhét tài liệu vào prompt.

Một prompt production thường có nhiều phần:

1. System/developer instructions.
2. User input.
3. Retrieved context.
4. Conversation history.
5. Tool outputs.
6. Output tokens.

AI Engineer phải quản lý token budget, không chỉ viết prompt hay.

## 2. Context window không phải trí nhớ thật

Context window là lượng thông tin model có thể nhìn thấy trong một lần gọi. Nếu thông tin không nằm trong context, model không thể dựa vào nó một cách đáng tin.

Context dài hơn không đồng nghĩa tốt hơn. Nhét quá nhiều tài liệu có thể làm:

- Tăng cost.
- Tăng latency.
- Gây nhiễu retrieval.
- Làm model bỏ qua phần quan trọng.
- Khó debug vì context thay đổi liên tục.

Kỹ năng quan trọng là chọn đúng context, không phải chọn thật nhiều context.

## 3. Embedding là cách biến nội dung thành vector

Embedding biến text thành vector số để so sánh độ tương đồng ngữ nghĩa.

Ví dụ:

- "làm sao reset mật khẩu" gần với "quên password".
- "invoice bị sai VAT" gần với "hóa đơn thuế có lỗi".
- "latency p95 tăng" gần với "response time chậm".

Embedding là nền tảng của semantic search và RAG. Nhưng embedding không hiểu quyền truy cập, freshness hoặc độ tin cậy của tài liệu. Các yếu tố đó phải được xử lý bằng metadata và business rules.

## 4. RAG dùng khi model cần kiến thức ngoài

RAG, hay Retrieval-Augmented Generation, là pattern:

1. User hỏi.
2. Hệ thống tìm tài liệu liên quan.
3. Đưa tài liệu vào prompt.
4. Model trả lời dựa trên tài liệu.

Dùng RAG khi:

- Kiến thức thay đổi thường xuyên.
- Cần trả lời dựa trên tài liệu nội bộ.
- Cần citation.
- Không muốn fine-tune cho từng lần cập nhật dữ liệu.

RAG không tự động hết hallucination. Bạn vẫn cần eval, citation policy, refusal behavior và retrieval monitoring.

## 5. Fine-tuning dùng khi cần đổi hành vi hoặc style

Fine-tuning phù hợp hơn khi bạn muốn model học:

- Format output đặc thù.
- Style trả lời nhất quán.
- Domain terminology.
- Task pattern lặp lại.

Fine-tuning không phải cách tốt nhất để "nhét tài liệu mới" vào model nếu tài liệu thay đổi liên tục. Với knowledge base sống, RAG thường linh hoạt hơn.

## 6. Decision tree nhanh

Khi cần cải thiện AI feature, hãy hỏi:

| Vấn đề | Hướng xử lý thường hợp lý |
|---|---|
| Model không biết dữ liệu nội bộ | RAG |
| Model trả sai format | Structured output + validation |
| Model thiếu style/domain pattern | Prompt examples hoặc fine-tuning |
| Model gọi tool sai | Tool schema + agent eval |
| Model chậm/đắt | Model routing, caching, context pruning |
| Model hallucinate dù có context | Retrieval eval + groundedness checks |

## 7. Bài tập thực hành

Lấy 20 câu FAQ sản phẩm. Làm 3 phiên bản:

1. Prompt-only.
2. RAG với top-k retrieval.
3. RAG có citation và no-answer policy.

Đo thủ công 20 câu:

- Câu nào đúng?
- Câu nào bịa?
- Câu nào thiếu nguồn?
- Câu nào đáng ra phải từ chối?

Sau bài này, bạn sẽ thấy AI Engineering là quản lý trade-off, không phải chỉ chọn model mạnh nhất.
