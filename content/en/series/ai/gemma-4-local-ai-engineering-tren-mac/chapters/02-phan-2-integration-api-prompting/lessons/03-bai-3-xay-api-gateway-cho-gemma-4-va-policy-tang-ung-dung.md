---
id: 01970001-bb03-7003-d003-bb0300001003
title: 'Lesson 3: Building an API gateway for Gemma 4 with application-layer policies'
slug: bai-3-xay-api-gateway-cho-gemma-4-va-policy-tang-ung-dung
description: >-
  Build a FastAPI gateway with timeout, retry, structured output,
  logging metadata, and model access control by team.
duration_minutes: 100
is_free: true
video_url: null
sort_order: 0
section_title: "Part 2: Integration - API, Prompting & App Embedding"
course:
  id: 01970001-aa11-7011-b011-aa1100001011
  title: Gemma 4 Local AI Engineering on Mac
  slug: gemma-4-local-ai-engineering-tren-mac
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-3290" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-3290)"/>
  <g>
    <circle cx="1077" cy="41" r="30" fill="#a78bfa" opacity="0.06"/>
    <circle cx="1054" cy="218" r="11" fill="#a78bfa" opacity="0.07"/>
    <circle cx="1031" cy="135" r="22" fill="#a78bfa" opacity="0.08"/>
    <circle cx="1008" cy="52" r="33" fill="#a78bfa" opacity="0.09"/>
    <circle cx="985" cy="229" r="14" fill="#a78bfa" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <line x1="600" y1="71" x2="1100" y2="151" stroke="#a78bfa" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="101" x2="1050" y2="171" stroke="#a78bfa" stroke-width="0.5" opacity="0.08"/>
    <polygon points="993.5166604983954,158 993.5166604983954,184 971,197 948.4833395016046,184 948.4833395016046,158 971,145" fill="none" stroke="#a78bfa" stroke-width="1" opacity="0.12"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#a78bfa"/>
  <rect x="80" y="50" width="99" height="28" rx="14" fill="#a78bfa" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#a78bfa">🧠 AI &amp; ML — L0</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 3: Building an API gateway for</tspan>
      <tspan x="60" dy="42">Gemma 4 with app-layer policies</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Gemma 4 Local AI Engineering on Mac</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 2: Integration - API, Prompting &amp; App Embedding</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Introduction

The gateway is the most important layer for keeping a local AI stack running reliably. It gives the team control over quality and security, instead of letting clients call the model runtime directly.

## 1. Minimal API Template

```python
from fastapi import FastAPI
from pydantic import BaseModel
import requests

app = FastAPI()

class ChatReq(BaseModel):
    prompt: str
    model: str = "gemma4"

@app.post("/chat")
def chat(req: ChatReq):
    r = requests.post(
        "http://127.0.0.1:11434/api/generate",
        json={"model": req.model, "prompt": req.prompt, "stream": False},
        timeout=90,
    )
    r.raise_for_status()
    data = r.json()
    return {"answer": data.get("response", ""), "model": req.model}
```

## 2. Required Gateway Policies

- Hard timeout per endpoint
- Limited retries for transient errors
- Whitelist of allowed models
- Prompt size limit to prevent abuse

## 3. Structured Output

When the app needs JSON, enforce the contract at the gateway:

- Clear prompt contract
- Validate schema before returning to client
- If schema fails, return an error with a specific code

## 4. Internal Authentication

At minimum, implement:

- API key per service
- Rate limit per key
- Logging per tenant/team

For enterprise use, connect SSO at the gateway rather than at the model layer.

## 5. Logging and Tracing

Each request should log:

- `request_id`
- `endpoint`
- `model`
- `latency_ms`
- `prompt_tokens_est`
- `status`

Don't log raw sensitive data if PII is present.

## 6. Fallback Model Strategy

Design fallback so the system doesn't hard crash:

1. Primary model times out
2. Automatically switch to a lighter model
3. Return response with `degraded_mode=true` flag

## Demo Code

Chat API response through the gateway:

![Chat Response](/images/blog/gemma4-series-demo/03-chat-response.webp)

Model policy enforcement — blocking unauthorized models:

![Policy Enforcement](/images/blog/gemma4-series-demo/03-policy-enforcement.webp)

> Source code: [02-api-gateway](https://github.com/xdev-asia-labs/gemma-4-local-ai-engineering-on-mac/tree/main/02-api-gateway)

## Summary
