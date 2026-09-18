---
id: 01970001-bb06-7006-d006-bb0600001006
title: 'Bài 6: Hybrid Retrieval - BM25 + Vector + Reranker'
slug: bai-6-hybrid-retrieval-bm25-vector-reranker
description: >-
  Kết hợp lexical và semantic retrieval bằng RRF,
  thêm reranker để tăng precision, groundedness và citation accuracy.
duration_minutes: 100
is_free: true
video_url: null
sort_order: 1
section_title: "Phần 3: RAG Engineering cho dữ liệu nội bộ"
course:
  id: 01970001-aa11-7011-b011-aa1100001011
  title: Gemma 4 Local AI Engineering trên Mac
  slug: gemma-4-local-ai-engineering-tren-mac
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-4932" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-4932)"/>

  <!-- Decorations -->
  <g>
    <circle cx="625" cy="285" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="650" cy="110" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="675" cy="195" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="700" cy="280" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="725" cy="105" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <line x1="600" y1="75" x2="1100" y2="155" stroke="#fb923c" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="105" x2="1050" y2="175" stroke="#fb923c" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1000.9807621135332,160 1000.9807621135332,190 975,205 949.0192378864668,190 949.0192378864668,160 975,145" fill="none" stroke="#fb923c" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fb923c"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="99" height="28" rx="14" fill="#fb923c" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🧠 AI &amp; ML — Bài 1</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 6: Hybrid Retrieval - BM25 + Vector +</tspan>
      <tspan x="60" dy="42">Reranker</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Gemma 4 Local AI Engineering trên Mac</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 3: RAG Engineering cho dữ liệu nội bộ</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Giới thiệu

Vector-only thường đủ cho demo, nhưng khi dữ liệu nội bộ tăng nhanh thì cần hybrid retrieval để giữ chất lượng ổn định.

## 1. Vai trò của từng retriever

- BM25: mạnh về keyword hiếm, mã lỗi, tên bảng
- Vector: mạnh về ngữ nghĩa và paraphrase
- Reranker: tinh chỉnh danh sách candidate cuối

## 2. Fusion bằng RRF

Công thức:

$$
score(d) = \sum_{r \in R} \frac{1}{k + rank_r(d)}
$$

Với $k=60$, RRF thường ổn định mà không cần tuning phức tạp.

Pseudo-code:

```python
def rrf_fuse(rankings, k=60):
    score = {}
    for ranking in rankings:
        for i, doc_id in enumerate(ranking, start=1):
            score[doc_id] = score.get(doc_id, 0) + 1.0 / (k + i)
    return sorted(score.items(), key=lambda x: x[1], reverse=True)
```

## 3. Pipeline đề xuất

1. BM25 top 20
2. Vector top 20
3. RRF -> top 25 candidates
4. Reranker -> top 5 contexts
5. Build prompt và gọi Gemma 4

## 4. Tuning thực dụng

- Tăng top_k nếu recall thấp
- Giảm top_k nếu latency quá cao
- Bật reranker có điều kiện cho query phức tạp

Có thể dùng heuristic: query dài hoặc score gap nhỏ thì bật reranker.

## 5. Kiểm soát hallucination

Bắt buộc áp dụng:

- Prompt guardrail chỉ dùng context
- Trả câu fallback khi thiếu dữ liệu
- Bắt citation theo `doc_id - section`

## Demo code

Hybrid retrieval kết hợp BM25 + Vector search với RRF fusion:

![Hybrid Retrieval](/images/blog/gemma4-series-demo/06-hybrid-retrieval.webp)

> Source code: [05-hybrid-retrieval](https://github.com/xdev-asia-labs/gemma-4-local-ai-engineering-on-mac/tree/main/05-hybrid-retrieval)

## Tóm tắt

Hybrid retrieval là bước chuyển từ demo sang production. Bài sau sẽ xây eval framework và observability để đo được chất lượng thực tế thay vì dựa vào cảm giác.