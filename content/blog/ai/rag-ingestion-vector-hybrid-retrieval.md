---
id: 02760001-aie1-4001-a006-000000000001
title: "RAG từ gốc: ingestion, chunking, metadata, vector search và hybrid retrieval"
slug: rag-ingestion-vector-hybrid-retrieval
excerpt: >-
  RAG tốt bắt đầu từ dữ liệu tốt: ingestion sạch, chunking đúng cấu trúc, metadata
  đủ giàu, vector search có filter và hybrid retrieval khi keyword vẫn quan trọng.
featured_image: /images/blog/rag-ingestion-vector-hybrid-retrieval.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-06T10:25:00.000000Z'
created_at: '2026-05-06T10:25:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: RAG, slug: rag}, {name: Vector DB, slug: vector-db}, {name: Embeddings, slug: embeddings}, {name: Retrieval, slug: retrieval}]
comments: []
---

RAG demo rất dễ. RAG production khó hơn nhiều.

Lý do: model chỉ trả lời tốt khi context đưa vào prompt đúng, đủ và không nhiễu. Muốn vậy, ingestion và retrieval phải được thiết kế cẩn thận.

## Sau bài này bạn làm được gì?

- Thiết kế được ingestion pipeline có chunking và metadata.
- So sánh được dense, keyword và hybrid retrieval.
- Biết dùng permission/freshness filter trước khi đưa context vào model.

## Mini-lab bắt buộc

Ingest 20 tài liệu, chunk theo heading, gắn metadata, chạy 50 câu hỏi và đo top-k có lấy đúng source không.

## Checklist tự đánh giá

- Chunk có owner/updated_at/access_level không?
- Có re-index policy không?
- Có hybrid search cho mã lỗi/SKU/API không?

## Ví dụ đầy đủ: ingestion pipeline cho 20 tài liệu policy

Bạn có 20 tài liệu nội bộ: refund policy, pricing plan, API limits, security FAQ, onboarding guide. Mục tiêu là biến chúng thành index dùng được cho RAG.

### Metadata schema

~~~json
{
  "doc_id": "refund-policy-v3",
  "title": "Refund Policy",
  "section": "Enterprise annual contract",
  "source_url": "https://internal/wiki/refund-policy",
  "owner": "product-ops",
  "updated_at": "2026-04-20",
  "product_area": "billing",
  "access_level": "support_internal",
  "version": "v3"
}
~~~

### Chunk mẫu

~~~json
{
  "chunk_id": "refund-policy-v3#enterprise-annual-contract#002",
  "text": "Enterprise annual contracts are eligible for refund review within 30 days only when onboarding has not started and no custom integration work has been delivered.",
  "metadata": {
    "doc_id": "refund-policy-v3",
    "section": "Enterprise annual contract",
    "updated_at": "2026-04-20",
    "access_level": "support_internal"
  }
}
~~~

### Query pipeline

1. Normalize query và detect language.
2. Rewrite query nếu quá mơ hồ, ví dụ "refund annual enterprise before onboarding".
3. Apply metadata filter trước: "access_level <= user_access", "product_area = billing".
4. Dense vector search lấy top 20.
5. Keyword/BM25 search lấy top 20.
6. Merge và rerank còn top 5.
7. Loại chunk cũ nếu có version mới cùng doc.
8. Đưa top 5 vào prompt kèm citation ids.

### Hybrid retrieval debug table

| Query | Dense hit | Keyword hit | Rerank top 1 | Kết luận |
| --- | --- | --- | --- | --- |
| refund annual enterprise | policy overview | annual contract section | annual contract section | Tốt |
| charged twice invoice unpaid | billing FAQ | duplicate charge policy | duplicate charge policy | Tốt |
| can I cancel after onboarding | cancellation guide | refund policy | onboarding exception | Cần thêm synonym |

### Cách tự kiểm tra

Lấy 30 query thật hoặc tự viết. Với mỗi query, ghi expected "doc_id". Nếu top-5 không chứa source đúng, lỗi nằm ở ingestion/retrieval, chưa cần đổ lỗi cho model.

## 1. Ingestion không chỉ là đọc file

Ingestion pipeline cần biến dữ liệu thô thành dạng search được.

Nguồn dữ liệu có thể là:

- Markdown.
- PDF.
- HTML.
- Confluence/Notion.
- Database rows.
- Support tickets.
- API docs.
- Product manuals.

Mỗi nguồn có vấn đề riêng: PDF mất heading, HTML có navigation noise, database thiếu context, docs cũ chưa archive.

Ingestion tốt nên chuẩn hóa về một format trung gian:

```json
{
  "document_id": "refund-policy-v3",
  "title": "Refund Policy",
  "body": "...",
  "source": "confluence",
  "updated_at": "2026-05-06",
  "owner": "billing-team",
  "access_level": "internal",
  "product_area": "billing"
}
```

## 2. Chunking theo cấu trúc

Chunk quá nhỏ thì mất context. Chunk quá lớn thì retrieval nhiễu và tốn token.

Các chiến lược thường dùng:

- Chunk theo heading.
- Chunk theo paragraph.
- Sliding window có overlap.
- Chunk theo semantic boundary.
- Chunk theo object domain, ví dụ một policy, một API endpoint, một FAQ.

Không có chunk size đúng cho mọi bài toán. Hãy đo retrieval recall/precision trên dataset thật.

## 3. Metadata là nửa còn lại của RAG

Vector search tìm nội dung gần nghĩa. Nhưng metadata giúp hệ thống biết:

- Tài liệu thuộc product nào?
- User có quyền xem không?
- Tài liệu còn mới không?
- Tenant nào?
- Ngôn ngữ nào?
- Owner là ai?
- Version nào?

Nếu không có metadata, RAG dễ trả lời bằng tài liệu sai tenant hoặc tài liệu cũ.

Metadata filter nên chạy trước hoặc cùng retrieval:

- `tenant_id = current_tenant`
- `access_level <= user_permission`
- `product_area = selected_product`
- `status = published`

## 4. Vector search không thay thế keyword search

Embedding rất mạnh khi user dùng từ khác tài liệu. Nhưng keyword search vẫn quan trọng khi:

- Có mã lỗi.
- Có SKU.
- Có API endpoint.
- Có tên feature.
- Có số hóa đơn.
- Có thuật ngữ chính xác.

Hybrid retrieval kết hợp semantic search và keyword search. Sau đó có thể rerank để chọn context tốt nhất.

## 5. Retrieval pipeline mẫu

Một pipeline thực tế:

1. Normalize query.
2. Detect language/domain.
3. Apply permission filter.
4. Run vector search.
5. Run keyword search.
6. Merge candidates.
7. Rerank.
8. Remove duplicates.
9. Build context with citations.
10. Send to model.

Mỗi bước nên có logging để debug.

## 6. Những lỗi RAG phổ biến

- Chunk chứa quá nhiều noise.
- Không re-index khi tài liệu đổi.
- Không filter theo permission.
- Top-k quá cao làm context loãng.
- Không đo retrieval, chỉ đo answer.
- Không có no-answer behavior.
- Citation trỏ nhầm đoạn.

## 7. Bài tập thực hành

Lấy 30 tài liệu nội bộ hoặc FAQ. Làm pipeline:

1. Ingest và chunk theo heading.
2. Tạo embeddings.
3. Gắn metadata `source`, `updated_at`, `product_area`, `access_level`.
4. Tạo 50 câu hỏi test.
5. Đo top-3 có chứa tài liệu đúng không.
6. Thử hybrid retrieval với câu hỏi có mã lỗi hoặc tên API.

RAG tốt không nằm ở vector database xịn nhất. RAG tốt nằm ở dữ liệu, metadata, retrieval logic và eval.
