---
id: 01970001-bb05-7005-d005-bb0500001005
title: 'Lesson 5: Ingestion, chunking & vector indexing for Vietnamese text'
slug: bai-5-ingestion-chunking-va-vector-indexing-cho-tieng-viet
description: >-
  Process Markdown and PDF, chunk by technical document structure,
  store full metadata, and optimize the embedding pipeline for Vietnamese.
duration_minutes: 110
is_free: true
video_url: null
sort_order: 0
section_title: "Part 3: RAG Engineering for Internal Data"
course:
  id: 01970001-aa11-7011-b011-aa1100001011
  title: Gemma 4 Local AI Engineering on Mac
  slug: gemma-4-local-ai-engineering-tren-mac
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-8319" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-8319)"/>
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
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#f87171"/>
  <rect x="80" y="50" width="99" height="28" rx="14" fill="#f87171" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f87171">🧠 AI &amp; ML — L0</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 5: Ingestion, chunking &amp; vector</tspan>
      <tspan x="60" dy="42">indexing for Vietnamese text</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Gemma 4 Local AI Engineering on Mac</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 3: RAG Engineering for Internal Data</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Introduction

High-quality RAG starts with proper ingestion. If you chunk with the wrong structure, even the best retrieval won't produce stable answers.

## 1. Internal Data Sources

Common sources:

- Markdown docs
- Operations runbooks
- PDF processes or compliance documents
- Technical notes from the team

Each source needs its own parser, but they must all output to a unified schema.

## 2. Data Normalization Before Chunking

Recommended steps:

1. Normalize encoding and unicode
2. Clean up repeating headers/footers
3. Mark code blocks to preserve them
4. Split structure by headings

Don't blindly strip Vietnamese diacritics — it reduces retrieval quality.

## 3. Chunking Strategy

Reference parameters:

- Chunk size: 600-1000 tokens
- Overlap: 80-150 tokens
- Prefer splitting by section rather than hard character cuts

The goal is to maintain complete semantics for each chunk.

## 4. Metadata Schema

Recommended payload:

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

Metadata enables accurate filtering by topic, source, and update time.

## 5. Embedding Pipeline

Best practices:

- Batch embedding in batches
- Cache by content hash
- Only re-embed changed chunks

For large datasets, incremental ingestion saves significant time.

## 6. Index Lifecycle

Use 2 collections:

- `active`: serves queries
- `staging`: ingests new data

When staging passes eval, swap to active to reduce downtime risk.

## Demo Code

RAG endpoint query result with citations:

![RAG Query](/images/blog/gemma4-series-demo/05-rag-query.webp)

> Source code: [04-ingestion](https://github.com/xdev-asia-labs/gemma-4-local-ai-engineering-on-mac/tree/main/04-ingestion)

## Summary
