---
id: 01970001-bb03-7003-d003-bb0300001003
title: 'Bài 3: Xây API gateway cho Gemma 4 và policy tầng ứng dụng'
slug: bai-3-xay-api-gateway-cho-gemma-4-va-policy-tang-ung-dung
description: >-
  Dựng FastAPI gateway, chuẩn hóa timeout, retry, structured output,
  logging metadata và phân quyền truy cập model theo team.
duration_minutes: 100
is_free: true
video_url: null
sort_order: 0
section_title: "Phần 2: Integration - API, Prompting và App Embedding"
course:
  id: 01970001-aa11-7011-b011-aa1100001011
  title: Gemma 4 Local AI Engineering trên Mac
  slug: gemma-4-local-ai-engineering-tren-mac
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-3290" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-3290)"/>

  <!-- Decorations -->
  <g>
    <circle cx="1077" cy="41" r="30" fill="#a78bfa" opacity="0.060000000000000005"/>
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

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#a78bfa"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="99" height="28" rx="14" fill="#a78bfa" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#a78bfa">🧠 AI &amp; ML — Bài 0</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 3: Xây API gateway cho Gemma 4 và</tspan>
      <tspan x="60" dy="42">policy tầng ứng dụng</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Gemma 4 Local AI Engineering trên Mac</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 2: Integration - API, Prompting và App Embedding</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Giới thiệu

Gateway là lớp quan trọng nhất để local AI stack chạy ổn định. Nó giúp team kiểm soát chất lượng và bảo mật, thay vì để client gọi trực tiếp model runtime.

## 1. Mẫu API tối thiểu

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

## 2. Policy bắt buộc ở gateway

- Timeout cứng theo endpoint
- Retry giới hạn cho lỗi tạm thời
- Whitelist model được phép dùng
- Limit kích thước prompt để tránh abuse

## 3. Structured output

Khi app cần JSON, ép contract ngay từ gateway:

- Prompt contract rõ ràng
- Validate schema trước khi trả client
- Nếu fail schema, trả lỗi có mã cụ thể

## 4. Authentication nội bộ

Tối thiểu triển khai:

- API key theo service
- Rate limit theo key
- Logging theo tenant/team

Nếu dùng trong doanh nghiệp, kết nối SSO ở gateway thay vì tại model layer.

## 5. Logging và tracing

Mỗi request nên log:

- `request_id`
- `endpoint`
- `model`
- `latency_ms`
- `prompt_tokens_est`
- `status`

Không log dữ liệu nhạy cảm nguyên văn nếu có PII.

## 6. Fallback model strategy

Thiết kế fallback để hệ thống không chết cứng:

1. Model chính timeout
2. Tự chuyển model nhẹ hơn
3. Trả response có cờ `degraded_mode=true`

## Demo code

Kết quả test Chat API qua gateway:

![Chat Response](/images/blog/gemma4-series-demo/03-chat-response.webp)

Model policy enforcement — chặn model không được phép:

![Policy Enforcement](/images/blog/gemma4-series-demo/03-policy-enforcement.webp)

> Source code: [02-api-gateway](https://github.com/xdev-asia-labs/gemma-4-local-ai-engineering-on-mac/tree/main/02-api-gateway)

## Tóm tắt

Gateway biến local LLM thành một dịch vụ đúng nghĩa. Bài tiếp theo sẽ đi sâu vào prompt contract, JSON schema và regression test để giữ hành vi model ổn định theo thời gian.