---
id: 01970001-bb06-7006-d006-bb0600001006
title: 'Lesson 6: Hybrid Retrieval - BM25 + Vector + Reranker'
slug: bai-6-hybrid-retrieval-bm25-vector-reranker
description: >-
  Combine lexical and semantic retrieval with RRF,
  add a reranker to improve precision, groundedness, and citation accuracy.
duration_minutes: 100
is_free: true
video_url: null
sort_order: 1
section_title: "Part 3: RAG Engineering for Internal Data"
course:
  id: 01970001-aa11-7011-b011-aa1100001011
  title: Gemma 4 Local AI Engineering on Mac
  slug: gemma-4-local-ai-engineering-tren-mac
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-4932" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-4932)"/>
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
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fb923c"/>
  <rect x="80" y="50" width="99" height="28" rx="14" fill="#fb923c" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🧠 AI &amp; ML — L1</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 6: Hybrid Retrieval - BM25 + Vector</tspan>
      <tspan x="60" dy="42">+ Reranker</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Gemma 4 Local AI Engineering on Mac</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 3: RAG Engineering for Internal Data</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Introduction

Vector-only search is usually sufficient for demos, but as internal data grows, you need hybrid retrieval to maintain consistent quality.

## 1. Role of Each Retriever

- BM25: strong for rare keywords, error codes, table names
- Vector: strong for semantics and paraphrasing
- Reranker: fine-tunes the final candidate list

## 2. Fusion with RRF

Formula:

$$
score(d) = \sum_{r \in R} \frac{1}{k + rank_r(d)}
$$

With $k=60$, RRF is generally stable without complex tuning.

Pseudo-code:

```python
def rrf_fuse(rankings, k=60):
    score = {}
    for ranking in rankings:
        for i, doc_id in enumerate(ranking, start=1):
            score[doc_id] = score.get(doc_id, 0) + 1.0 / (k + i)
    return sorted(score.items(), key=lambda x: x[1], reverse=True)
```

## 3. Recommended Pipeline

1. BM25 top 20
2. Vector top 20
3. RRF -> top 25 candidates
4. Reranker -> top 5 contexts
5. Build prompt and call Gemma 4

## 4. Practical Tuning

- Increase top_k if recall is low
- Decrease top_k if latency is too high
- Enable reranker conditionally for complex queries

You can use a heuristic: enable the reranker when the query is long or the score gap is small.

## 5. Hallucination Control

Mandatory practices:

- Prompt guardrail to use only context
- Return a fallback response when data is insufficient
- Require citations by `doc_id - section`

## Demo Code

Hybrid retrieval combining BM25 + Vector search with RRF fusion:

![Hybrid Retrieval](/images/blog/gemma4-series-demo/06-hybrid-retrieval.webp)

> Source code: [05-hybrid-retrieval](https://github.com/xdev-asia-labs/gemma-4-local-ai-engineering-on-mac/tree/main/05-hybrid-retrieval)

## Summary
