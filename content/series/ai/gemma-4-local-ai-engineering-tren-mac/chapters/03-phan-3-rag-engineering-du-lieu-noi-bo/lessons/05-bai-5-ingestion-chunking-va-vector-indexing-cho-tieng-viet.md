---
id: 01970001-bb05-7005-d005-bb0500001005
title: 'Bài 5: Ingestion, chunking và vector indexing cho tiếng Việt'
slug: bai-5-ingestion-chunking-va-vector-indexing-cho-tieng-viet
description: >-
  Xử lý Markdown và PDF, chunk theo cấu trúc tài liệu kỹ thuật,
  lưu metadata đầy đủ và tối ưu embedding pipeline cho tiếng Việt.
duration_minutes: 110
is_free: true
video_url: null
sort_order: 0
section_title: "Phần 3: RAG Engineering cho dữ liệu nội bộ"
course:
  id: 01970001-aa11-7011-b011-aa1100001011
  title: Gemma 4 Local AI Engineering trên Mac
  slug: gemma-4-local-ai-engineering-tren-mac
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-8319" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-8319)"/>

  <!-- Decorations -->
  <g>
    <circle cx="882" cy="56" r="20" fill="#f87171" opacity="0.11"/>
    <circle cx="664" cy="238" r="26" fill="#f87171" opacity="0.07"/>
    <circle cx="946" cy="160" r="32" fill="#f87171" opacity="0.13"/>
    <circle cx="728" cy="82" r="8" fill="#f87171" opacity="0.09"/>
    <circle cx="1010" cy="264" r="14" fill="#f87171" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <line x1="600" y1="236" x2="1100" y2="316" stroke="#f87171" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="266" x2="1050" y2="336" stroke="#f87171" stroke-width="0.5" opacity="0.08"/>
    <polygon points="962.8467875173176,120.5 962.8467875173176,151.5 936,167 909.1532124826824,151.5 909.1532124826824,120.50000000000001 936,105" fill="none" stroke="#f87171" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#f87171"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="99" height="28" rx="14" fill="#f87171" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f87171">🧠 AI &amp; ML — Bài 0</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 5: Ingestion, chunking và vector</tspan>
      <tspan x="60" dy="42">indexing cho tiếng Việt</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Gemma 4 Local AI Engineering trên Mac</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 3: RAG Engineering cho dữ liệu nội bộ</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Giới thiệu

RAG chất lượng cao bắt đầu từ ingestion đúng. Nếu chunk sai cấu trúc, retrieval tốt đến đâu cũng khó cho câu trả lời ổn định.

## 1. Nguồn dữ liệu nội bộ

Nguồn phổ biến:

- Markdown docs
- Runbook vận hành
- PDF quy trình hoặc compliance
- Notes kỹ thuật từ team

Mỗi nguồn cần parser riêng nhưng phải đổ về một schema thống nhất.

## 2. Chuẩn hóa dữ liệu trước khi chunk

Các bước đề xuất:

1. Chuẩn hóa encoding và unicode
2. Làm sạch header/footer lặp lại
3. Đánh dấu code block giữ nguyên
4. Tách cấu trúc theo heading

Không xóa dấu tiếng Việt bừa bãi vì làm giảm chất lượng retrieval.

## 3. Chunking strategy

Thông số tham khảo:

- Chunk size: 600-1000 tokens
- Overlap: 80-150 tokens
- Ưu tiên cắt theo section thay vì cắt ký tự cứng

Mục tiêu là giữ ngữ nghĩa hoàn chỉnh cho từng chunk.

## 4. Metadata schema

Payload khuyến nghị:

```json
{
  "doc_id": "pg-backup-v2",
  "title": "Backup PostgreSQL",
  "section": "3. PITR",
  "source": "docs/backup.md",
  "language": "vi",
  "updated_at": "2026-04-03"
}
```

Metadata giúp filter chính xác theo topic, nguồn và thời gian cập nhật.

## 5. Embedding pipeline

Thực hành tốt:

- Batch embedding theo lô
- Cache theo hash nội dung
- Chỉ embed lại chunk thay đổi

Với dữ liệu lớn, incremental ingestion tiết kiệm rất nhiều thời gian.

## 6. Index lifecycle

Áp dụng 2 collection:

- `active`: phục vụ truy vấn
- `staging`: ingest dữ liệu mới

Khi staging pass eval, swap sang active để giảm rủi ro downtime.

## Demo code

Kết quả query qua RAG endpoint với citation:

![RAG Query](/images/blog/gemma4-series-demo/05-rag-query.webp)

> Source code: [04-ingestion](https://github.com/xdev-asia-labs/gemma-4-local-ai-engineering-on-mac/tree/main/04-ingestion)

## Tóm tắt

Ingestion và chunking là nền móng của RAG. Bài tiếp theo sẽ nâng retrieval lên hybrid search với BM25 + vector + reranker để tăng precision và citation quality.