---
id: 01970001-bb07-7007-d007-bb0700001007
title: 'Lesson 7: Eval framework, observability & SLOs for GenAI'
slug: bai-7-eval-framework-observability-va-slo-cho-genai
description: >-
  Design a golden set, online feedback loop, latency and groundedness metrics,
  and define practical SLOs for GenAI features in an internal environment.
duration_minutes: 95
is_free: true
video_url: null
sort_order: 0
section_title: "Part 4: Reliability, Cost & Production Hardening"
course:
  id: 01970001-aa11-7011-b011-aa1100001011
  title: Gemma 4 Local AI Engineering on Mac
  slug: gemma-4-local-ai-engineering-tren-mac
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-1571" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-1571)"/>
  <g>
    <circle cx="971" cy="243" r="24" fill="#34d399" opacity="0.08"/>
    <circle cx="842" cy="54" r="17" fill="#34d399" opacity="0.11"/>
    <circle cx="713" cy="125" r="10" fill="#34d399" opacity="0.14"/>
    <circle cx="1084" cy="196" r="33" fill="#34d399" opacity="0.07"/>
    <circle cx="955" cy="267" r="26" fill="#34d399" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <line x1="600" y1="233" x2="1100" y2="313" stroke="#34d399" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="263" x2="1050" y2="333" stroke="#34d399" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1007.2487113059643,169 1007.2487113059643,197 983,211 958.7512886940357,197 958.7512886940357,169 983,155" fill="none" stroke="#34d399" stroke-width="1" opacity="0.12"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#34d399"/>
  <rect x="80" y="50" width="99" height="28" rx="14" fill="#34d399" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#34d399">🧠 AI &amp; ML — L0</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 7: Eval framework, observability</tspan>
      <tspan x="60" dy="42">&amp; SLOs for GenAI</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Gemma 4 Local AI Engineering on Mac</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 4: Reliability, Cost &amp; Production Hardening</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Introduction

If you don't measure, you can't manage. A local AI stack needs the same operational discipline as other backend services: with SLOs, dashboards, and postmortems.

## 1. Core Metrics

- Latency: p50, p95, p99
- Quality: groundedness, citation accuracy
- Retrieval: recall@k, hit rate
- Internal cost: CPU/GPU time, memory pressure

## 2. Designing a Golden Set

A golden set includes these groups:

- Short and clear FAQ questions
- Multi-step questions
- Trick questions with missing context
- Vietnamese questions with technical terminology

Each case has expected behavior and pass/fail criteria.

## 3. Online Feedback Loop

In the UI, add buttons:

- Helpful
- Not helpful
- Wrong citation

Log feedback by `request_id` to map back to the prompt, model, and retriever version.

## 4. Defining Practical SLOs

Example SLOs for an internal Q&A feature:

- 95% of requests respond within 3 seconds
- 90% of answers have valid citations
- Fallback rate due to missing context below 12%

SLOs should include an error budget and a remediation plan for violations.

## 5. Minimum Dashboard

The dashboard should include:

- Latency by model
- Quality by use case
- Schema error frequency
- Fallback rate

Track by day and by release to detect drift quickly.

## Demo Code

Eval framework tests and golden set runner:

![Eval Framework](/images/blog/gemma4-series-demo/07-eval-framework.webp)

> Source code: [06-eval-observability](https://github.com/xdev-asia-labs/gemma-4-local-ai-engineering-on-mac/tree/main/06-eval-observability)

## Summary
