---
id: 01970001-bb02-7002-d002-bb0200001002
title: '課程 2：在 Mac 上使用 Ollama 與 Open WebUI 設定 Gemma 4'
slug: bai-2-setup-gemma-4-voi-ollama-va-open-webui-tren-mac
description: >-
  在 Apple Silicon 上完整安裝執行環境、依 RAM 配置模型、
  為 QA/PM/內容團隊部署內部聊天 UI。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 1
section_title: "第一部分：Foundation — Gemma 4 本地技術棧"
course:
  id: 01970001-aa11-7011-b011-aa1100001011
  title: Gemma 4 本地 AI 工程實戰 on Mac
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
      <tspan x="60" dy="0">課程 2：在 Mac 上使用 Ollama</tspan>
      <tspan x="60" dy="42">與 Open WebUI 設定 Gemma 4</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Gemma 4 本地 AI 工程實戰 on Mac</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第一部分：Foundation — Gemma 4 本地技術棧</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 前言

本課程將設定一個可運作的本地技術棧：

- Ollama 作為模型執行環境
- Gemma 4 作為主要模型
- Open WebUI 作為全團隊的聊天介面

## 1. 安裝 Ollama

```bash
brew install ollama
brew services start ollama
curl http://127.0.0.1:11434/api/tags
```

端點回傳 JSON 即表示執行環境已就緒。

## 2. 拉取 Gemma 4 模型

```bash
ollama pull gemma4
ollama run gemma4
```

RAM 較少的機器請選擇量化版本以避免 swap 壓力。

## 3. 執行 Open WebUI

```bash
docker run -d \
  --name open-webui \
  -p 3000:8080 \
  -e OLLAMA_BASE_URL=http://host.docker.internal:11434 \
  -v open-webui:/app/backend/data \
  --restart unless-stopped \
  ghcr.io/open-webui/open-webui:main
```

存取 `http://localhost:3000` 並建立第一個管理員帳號。

## 4. 標準化模型預設

依使用情境建立預設：

- 程式撰寫：低溫度、較高上下文
- 摘要：中等溫度、簡短格式
- 擷取：低溫度、固定 JSON 輸出

將預設儲存在內部文件中，確保新團隊成員使用正確的預設值。

## 5. Mac 上的資源監控

追蹤三項指標：

- 記憶體壓力
- Swap 使用量
- 實際 token/秒

Swap 急增時，先降低 `num_ctx` 或模型大小，再嘗試更深度的最佳化。

## 6. 快速疑難排解

1. Docker 無法連接 Ollama：使用 `host.docker.internal`。
2. 模型逐漸變慢：檢查 swap 與背景應用程式。
3. UI 未顯示模型：確認 `ollama list` 與 `OLLAMA_BASE_URL`。

## 實作練習

- 安裝完整技術棧，擷取端點圖示。
- 為 3 個不同使用情境建立 3 組模型預設。
- 連續兩次執行同一長 prompt 並比較速度。

## Demo 程式碼

安裝後確認 health check 端點：

![Health Check](/images/blog/gemma4-series-demo/02-health-check.webp)

Swagger UI 自動產生 API 文件：

![Swagger 文件](/images/blog/gemma4-series-demo/02-swagger-docs.webp)

> 原始碼：[xdev-asia-labs/gemma-4-local-ai-engineering-on-mac](https://github.com/xdev-asia-labs/gemma-4-local-ai-engineering-on-mac)

## 總結
