---
id: 01970001-bb04-7004-d004-bb0400001004
title: '課程 4：LLM 的 Prompt Contract、JSON Schema 與回歸測試'
slug: bai-4-prompt-contracts-json-schema-va-regression-test-cho-llm
description: >-
  為各使用情境定義 prompt contract，強制輸出 schema，
  建構防止 prompt 或模型變更時品質漂移的測試套件。
duration_minutes: 95
is_free: true
video_url: null
sort_order: 1
section_title: "第二部分：Integration — API、Prompting 與應用整合"
course:
  id: 01970001-aa11-7011-b011-aa1100001011
  title: Gemma 4 本地 AI 工程實戰 on Mac
  slug: gemma-4-local-ai-engineering-tren-mac
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-1957" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-1957)"/>
  <g>
    <circle cx="933" cy="269" r="16" fill="#c084fc" opacity="0.14"/>
    <circle cx="766" cy="262" r="35" fill="#c084fc" opacity="0.13"/>
    <circle cx="1099" cy="255" r="24" fill="#c084fc" opacity="0.12"/>
    <circle cx="932" cy="248" r="13" fill="#c084fc" opacity="0.11"/>
    <circle cx="765" cy="241" r="32" fill="#c084fc" opacity="0.1"/>
    <line x1="600" y1="59" x2="1100" y2="139" stroke="#c084fc" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="89" x2="1050" y2="159" stroke="#c084fc" stroke-width="0.5" opacity="0.08"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#c084fc"/>
  <rect x="80" y="50" width="99" height="28" rx="14" fill="#c084fc" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#c084fc">🧠 AI &amp; ML — L1</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">課程 4：Prompt Contract、</tspan>
      <tspan x="60" dy="42">JSON Schema 與 LLM 回歸測試</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Gemma 4 本地 AI 工程實戰 on Mac</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第二部分：Integration — API、Prompting 與應用整合</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 前言

許多團隊失敗不是因為模型太弱，而是因為 prompt 沒有明確的 contract。Prompt 一改，輸出就漂移，應用程式悄然崩壞。

## 1. 什麼是 Prompt Contract

Prompt contract 包含四個部分：

- 角色與任務範圍
- 輸入格式
- 輸出格式
- 資料不足時的降級行為

降級行為範例：不要編造，回傳精確的短語如「資料不足」。

## 2. 輸出用 JSON Schema

行動項目擷取的 schema 範例：

```json
{
  "type": "object",
  "required": ["summary", "items"],
  "properties": {
    "summary": {"type": "string"},
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["task", "owner"],
        "properties": {
          "task": {"type": "string"},
          "owner": {"type": "string"},
          "deadline": {"type": "string"}
        }
      }
    }
  }
}
```

收到模型輸出後立即驗證 schema。

## 3. 設計 Golden Test

建立包含以下內容的測試檔案：

- 輸入 prompt
- 應包含的內容
- 不應包含的內容
- Schema pass/fail

每次更改 prompt 或模型時，重新執行整個測試套件。

## 4. 錯誤分類

- 格式錯誤：不符合 schema
- 接地性錯誤：不依據上下文
- 安全錯誤：回傳機密資料
- 指令錯誤：無視系統限制

明確的錯誤碼有助於追蹤長期趨勢。

## 5. Prompt 版本控制

套用以下規則：

- 所有 prompt 附帶版本碼
- 每次變更的簡要變更歷史
- 品質下降時的快速回滾

不要直接修改生產環境的 prompt 而不儲存版本。

## Demo 程式碼

Prompt contract 測試結果 — 6/6 通過：

![Prompt Contract 測試](/images/blog/gemma4-series-demo/04-prompt-contract-tests.webp)

> 原始碼：[03-prompt-contracts](https://github.com/xdev-asia-labs/gemma-4-local-ai-engineering-on-mac/tree/main/03-prompt-contracts)

## 總結
