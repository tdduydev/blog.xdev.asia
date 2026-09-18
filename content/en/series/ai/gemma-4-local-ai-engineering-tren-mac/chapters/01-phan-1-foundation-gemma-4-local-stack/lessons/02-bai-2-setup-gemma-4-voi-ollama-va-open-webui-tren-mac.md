---
id: 01970001-bb02-7002-d002-bb0200001002
title: 'Lesson 2: Setting up Gemma 4 with Ollama and Open WebUI on Mac'
slug: bai-2-setup-gemma-4-voi-ollama-va-open-webui-tren-mac
description: >-
  Full runtime installation on Apple Silicon, model configuration by RAM,
  and deploying an internal chat UI for QA, PM, and Content teams.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 1
section_title: "Part 1: Foundation - Gemma 4 Local Stack"
course:
  id: 01970001-aa11-7011-b011-aa1100001011
  title: Gemma 4 Local AI Engineering on Mac
  slug: gemma-4-local-ai-engineering-tren-mac
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-8762" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-8762)"/>
  <g>
    <circle cx="688" cy="214" r="36" fill="#fbbf24" opacity="0.09"/>
    <circle cx="776" cy="102" r="20" fill="#fbbf24" opacity="0.13"/>
    <circle cx="864" cy="250" r="34" fill="#fbbf24" opacity="0.07"/>
    <circle cx="952" cy="138" r="18" fill="#fbbf24" opacity="0.11"/>
    <circle cx="1040" cy="286" r="32" fill="#fbbf24" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <line x1="600" y1="74" x2="1100" y2="154" stroke="#fbbf24" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="104" x2="1050" y2="174" stroke="#fbbf24" stroke-width="0.5" opacity="0.08"/>
    <polygon points="999.1147367097487,159.5 999.1147367097487,188.5 974,203 948.8852632902513,188.5 948.8852632902513,159.5 974,145" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.12"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fbbf24"/>
  <rect x="80" y="50" width="99" height="28" rx="14" fill="#fbbf24" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🧠 AI &amp; ML — L1</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 2: Setting up Gemma 4 with Ollama</tspan>
      <tspan x="60" dy="42">and Open WebUI on Mac</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Gemma 4 Local AI Engineering on Mac</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 1: Foundation - Gemma 4 Local Stack</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Introduction

In this lesson you'll set up a working local stack:

- Ollama as the model runtime
- Gemma 4 as the primary model
- Open WebUI as the chat interface for the whole team

## 1. Installing Ollama

```bash
brew install ollama
brew services start ollama
curl http://127.0.0.1:11434/api/tags
```

If the endpoint returns JSON, the runtime is ready.

## 2. Pulling the Gemma 4 Model

```bash
ollama pull gemma4
ollama run gemma4
```

For machines with lower RAM, prefer a quantized variant to avoid swap pressure.

## 3. Running Open WebUI

```bash
docker run -d \
  --name open-webui \
  -p 3000:8080 \
  -e OLLAMA_BASE_URL=http://host.docker.internal:11434 \
  -v open-webui:/app/backend/data \
  --restart unless-stopped \
  ghcr.io/open-webui/open-webui:main
```

Navigate to `http://localhost:3000` and create the first admin account.

## 4. Standardizing Model Presets

Create presets by use case:

- Coding: low temperature, moderately high context
- Summarization: medium temperature, short format
- Extraction: low temperature, fixed JSON output

Keep presets in internal documentation so new team members use the correct defaults.

## 5. Monitoring Resources on Mac

Track 3 things:

- Memory pressure
- Swap usage
- Actual tokens/second

When swap spikes, reduce `num_ctx` or model size before attempting deeper optimization.

## 6. Quick Troubleshooting

1. Docker can't reach Ollama: use `host.docker.internal`.
2. Model gradually slows down: check swap and background apps.
3. UI doesn't show the model: check `ollama list` and `OLLAMA_BASE_URL`.

## Exercises

- Install the full stack and capture a diagram of endpoints.
- Create 3 model presets for 3 different use cases.
- Compare speed with the same long prompt run twice in succession.

## Demo Code

After installation, verify the health check endpoint:

![Health Check](/images/blog/gemma4-series-demo/02-health-check.webp)

Swagger UI auto-generates API documentation:

![Swagger Docs](/images/blog/gemma4-series-demo/02-swagger-docs.webp)

> Source code: [xdev-asia-labs/gemma-4-local-ai-engineering-on-mac](https://github.com/xdev-asia-labs/gemma-4-local-ai-engineering-on-mac)

## Summary
