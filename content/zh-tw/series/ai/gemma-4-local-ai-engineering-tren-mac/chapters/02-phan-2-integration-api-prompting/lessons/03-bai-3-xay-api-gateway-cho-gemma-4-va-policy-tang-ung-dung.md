---
id: 01970001-bb03-7003-d003-bb0300001003
title: '課程 3：建構帶應用層策略的 Gemma 4 API 閘道'
slug: bai-3-xay-api-gateway-cho-gemma-4-va-policy-tang-ung-dung
description: >-
  建構具備逾時、重試、結構化輸出、日誌中繼資料與
  團隊別模型存取控制的 FastAPI 閘道。
duration_minutes: 100
is_free: true
video_url: null
sort_order: 0
section_title: "第二部分：Integration — API、Prompting 與應用整合"
course:
  id: 01970001-aa11-7011-b011-aa1100001011
  title: Gemma 4 本地 AI 工程實戰 on Mac
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
    <line x1="600" y1="71" x2="1100" y2="151" stroke="#a78bfa" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="101" x2="1050" y2="171" stroke="#a78bfa" stroke-width="0.5" opacity="0.08"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#a78bfa"/>
  <rect x="80" y="50" width="99" height="28" rx="14" fill="#a78bfa" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#a78bfa">🧠 AI &amp; ML — L0</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">課程 3：建構帶應用層策略的</tspan>
      <tspan x="60" dy="42">Gemma 4 API 閘道</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Gemma 4 本地 AI 工程實戰 on Mac</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第二部分：Integration — API、Prompting 與應用整合</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 前言

閘道是穩定運作本地 AI 技術棧最重要的層。取代客戶端直接呼叫模型執行環境，為團隊提供品質與安全控制。

## 1. 最小 API 範本

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

## 2. 必要的閘道策略

- 每個端點的硬性逾時
- 暫時性錯誤的有限重試
- 允許模型的白名單
- 防止濫用的 prompt 大小限制

## 3. 結構化輸出

當應用程式需要 JSON 時，在閘道強制 contract：

- 明確的 prompt contract
- 回傳給客戶端前驗證 schema
- Schema 失敗時以特定代碼返回錯誤

## 4. 內部認證

最低限度實作：

- 每個服務的 API key
- 每個 key 的速率限制
- 按租戶/團隊的日誌記錄

企業級使用時，在閘道層而非模型層接入 SSO。

## 5. 日誌與追蹤

每個請求應記錄：

- `request_id`
- `endpoint`
- `model`
- `latency_ms`
- `prompt_tokens_est`
- `status`

含有 PII 時，不要記錄原始機密資料。

## 6. 備援模型策略

設計備援以避免系統硬性崩潰：

1. 主要模型逾時
2. 自動切換至輕量模型
3. 以 `degraded_mode=true` 標記回應

## Demo 程式碼

透過閘道的聊天 API 回應：

![聊天回應](/images/blog/gemma4-series-demo/03-chat-response.webp)

模型策略強制——阻擋未授權的模型：

![策略強制](/images/blog/gemma4-series-demo/03-policy-enforcement.webp)

> 原始碼：[02-api-gateway](https://github.com/xdev-asia-labs/gemma-4-local-ai-engineering-on-mac/tree/main/02-api-gateway)

## 總結
