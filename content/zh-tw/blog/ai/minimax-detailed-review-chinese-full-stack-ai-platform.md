---
id: 01970970-63e1-4389-a405-cc6388623b4e
title: 'MiniMax：中國全棧 AI 平台詳細評測——文字、影片、語音、音樂盡在一個生態系統'
slug: minimax-detailed-review-chinese-full-stack-ai-platform
excerpt: MiniMax 詳細評測——全球最完整多模態生態系統的中國 AI 新創公司。從 M2.7（文字/代碼媲美 Opus 4.6）、Hailuo 2.3（影片）、Speech 2.6 到 Music 2.6，分析其模型、產品、API、定價，並與 OpenAI、Google、Anthropic 進行比較，附快速入門指南。
featured_image: /images/blog/minimax-review-featured.webp
type: blog
reading_time: 25
view_count: 0
meta: null
published_at: '2026-04-13T10:00:00.000000Z'
created_at: '2026-04-13T10:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: AI, slug: ai}, {name: LLM, slug: llm}, {name: Machine Learning, slug: machine-learning}, {name: Deep Learning, slug: deep-learning}]
locale: zh-tw
comments: []
---

在全球 AI 競爭中，當所有目光都聚焦在 OpenAI、Google DeepMind 和 Anthropic 身上時，有一家中國公司正悄悄建構**全球最完整的多模態 AI 生態系統**——從文字、代碼、語音、影片到音樂，全部採用自研 Foundation Model。這家公司就是 **MiniMax**。

MiniMax 成立於 2022 年初，目前在**全球 200 多個國家**為超過 **2.36 億個人用戶**和 **21.4 萬家企業及開發者**提供服務。以「Co-create Intelligence with Everyone（與所有人共創智能）」為使命，MiniMax 不只是一間研究機構，而是打造了一個擁有完整 AI 原生產品矩陣的**平台公司**。

本文將深入評測 MiniMax 生態系統的各個元件：模型、產品、API 平台、定價，以及與主要競爭對手的比較。

* * *

## 1. MiniMax 概覽

### MiniMax 是什麼？

MiniMax 是一家中國領先的 AI Foundation Model 公司，總部位於上海。由大型科技公司出身的 AI 研究團隊創立，目標是通用人工智慧（AGI）。

與其他 AI 新創公司相比，MiniMax 最大的差異化在於：**自研所有模態的 Foundation Model**——文字、語音、圖像、影片、音樂。無授權、無第三方模型微調。從訓練基礎設施到消費者端產品，整個技術棧都由 MiniMax 自己構建。

### 核心價值觀

MiniMax 秉持三個核心價值觀運營：

- **No Shortcuts（不走捷徑）** — 投資基礎研究，而非追逐趨勢
- **User-in-the-Loop（用戶參與循環）** — 用戶回饋驅動開發
- **Tech-Driven（技術驅動）** — 技術是基礎，而非行銷

### 產品矩陣

MiniMax 有**兩個清晰的產品層級**：

**第一層 — Foundation Models（面向開發者）：**

| 模型 | 模態 | 最新版本 |
|------|------|---------|
| MiniMax M 系列 | 文字 / 代碼 / Agent | M2.7 |
| MiniMax Speech | 文字轉語音 | Speech 2.6 |
| Hailuo | 影片生成 | Hailuo 2.3 / 2.3 Fast |
| MiniMax Music | 音樂生成 | Music 2.6 |

**第二層 — AI 原生產品（面向終端用戶）：**

| 產品 | 描述 | 連結 |
|------|------|------|
| **MiniMax Agent** | 綜合 AI 助手（代碼、辦公、研究） | agent.minimax.io |
| **Hailuo AI** | AI 影片生成平台 | hailuoai.video |
| **MiniMax Audio** | 語音與音訊生成平台 | minimax.io/audio |
| **Talkie** | AI 陪伴 / 角色扮演應用 | talkie-ai.com |

* * *

## 2. MiniMax M2.7 — 旗艦文字模型

### 理念：「自我進化的早期回聲」

M2.7 是最新的文字模型（2026 年 3 月 18 日發布），也是第一個**深度參與 MiniMax 自我進化流程**的模型。

這是什麼意思？MiniMax 讓 M2.7 自己構建了公司的 **Agent Harness**，用於內部 RL（強化學習）研究。這個模型會：
- 閱讀論文、追蹤實驗
- 管理資料管線、啟動實驗
- 監控、調試、分析指標
- 修改代碼、建立合併請求、執行冒煙測試
- 根據回饋**改進自身的 Harness**

結果，M2.7 處理了 RL 研究團隊**30–50% 的工作流程**——這是一個值得關注的數字。

### 基準測試比較

M2.7 在實際基準測試中取得了令人印象深刻的結果：

| 基準測試 | M2.7 | Opus 4.6 | Sonnet 4.6 | GPT-5.4 | GPT-5.3 |
|---------|-------|----------|------------|---------|---------|
| **SWE-Pro**（多語言） | 56.22% | ~57% | --- | --- | 56.2%（Codex） |
| **VIBE-Pro**（完整專案） | 55.6% | ~56% | --- | --- | --- |
| **Terminal Bench 2** | 57.0% | --- | --- | --- | --- |
| **GDPval-AA**（ELO） | 1495 | #1 | #2 | #3 | --- |
| **MLE Bench Lite**（獎牌率） | 66.6% | 75.7% | --- | --- | 71.2% |

**分析：** M2.7 並不是在所有基準測試上最強，但在實際任務——特別是軟體工程和 Agent 工作流程——中始終**與頂級模型（Opus 4.6、GPT-5.4）競爭**。

### 突出功能

**1. 專業軟體工程**

M2.7 不只是寫代碼，而是**理解生產系統**。面對生產環境告警時，M2.7 會：
- 關聯監控指標和部署時間軸
- 對追蹤採樣進行統計分析
- 連接資料庫確認根本原因
- 偵測遺失的索引遷移

MiniMax 表示 M2.7 反覆幫助將生產事件的恢復時間縮短至**3 分鐘以內**。

**2. Agent Teams（多 Agent 協作）**

M2.7 原生支援 Agent Teams——在同一個工作流程中協調多個 Agent 的能力。

**3. 辦公室工作與複雜編輯**

M2.7 支援 Excel、PPT、Word 的複雜編輯：
- 從模板生成文件
- 基於互動指令的多輪編輯
- 40 多個複雜技能的 97% 技能遵循率

**4. 娛樂與角色一致性**

MiniMax 還開源了 **OpenRoom**——在 3D GUI 環境中的互動系統。

### API 整合

```python
import requests

url = "https://api.minimax.io/v1/text/chatcompletion_v2"
payload = {
    "model": "MiniMax-M2.7",
    "messages": [
        {"role": "user", "content": "Hello"}
    ]
}
headers = {"Authorization": "Bearer <token>"}
response = requests.post(url, json=payload, headers=headers)
print(response.text)
```

M2.7 有兩個 API 版本：
- **MiniMax-M2.7**：標準版——最高品質
- **MiniMax-M2.7-highspeed**：更高 TPS，相同結果但速度更快

支援與 **Claude Code、Roo Code、Kilo Code、Cline、Codex CLI、Cursor、TRAE、Grok CLI** 等熱門 AI 編碼工具整合。

* * *

## 3. Hailuo 2.3 — 影片生成

### 相比 Hailuo 02 的改進

Hailuo 2.3（2025 年 10 月 28 日發布）是最新的影片生成模型，帶來大幅改進：

- **複雜肢體動作**：更流暢、自然的複雜動作渲染
- **物理理解**：更好的物理理解——光照、陰影、色調更接近照片真實感
- **風格化**：支援更多特殊藝術風格：動漫、插畫、水墨畫、遊戲 CG 等
- **面部微表情**：更自然、細膩的面部表情
- **動作指令**：對動作指令更精確的響應

### 成本效益

Hailuo 2.3 保持與 Hailuo 02 相同的定價，同時性能大幅提升。**Hailuo 2.3 Fast** 版本將批量製作成本最多降低 **50%**。

### Media Agent

Hailuo Video Agent 進化為 Media Agent，支援全面的多模態內容製作：
- 輸入你想要的內容 → Agent 自動選擇合適的模型
- 「一鍵影片生成」，無需手動調整
- 為專業創作者提供分步驟製作
- 上傳圖片、影片、音訊進行自訂

* * *

## 4. Speech 2.6 — 文字轉語音

MiniMax Speech 2.6 是最新 TTS 引擎，具有三個重要優勢：

- **即時響應**：低延遲，適合即時應用
- **智能解析**：智能上下文分析以選擇適當的語調
- **Fluent LoRA Voice**：支援 LoRA 自訂語音——建立獨特聲音

Speech 2.6 不只是朗讀文字，而是**演繹**文字。

* * *

## 5. Music 2.6 — AI 音樂生成

### 突出特色

Music 2.6 是 MiniMax Music 歷史上最重要的升級：

**封面模式（新功能）：** 上傳一首歌 → 模型提取旋律骨架 → 決定風格、編曲、氛圍。保留旋律同時完全改變流派——從民謠到重金屬，從古典交響樂到賽博朋克電子音樂。

**品質提升：**
- **中低頻**：低音和鼓的次低音深度與緊實感大幅改善
- **樂曲結構理解**：在提示詞寫「壓抑氛圍 → 覺醒 → 爆發」，模型就遵循該結構
- **演奏細微差別**：理解每件樂器的顫音、呼吸停頓、動態
- **首包延遲 < 20 秒**：幾乎立即聽到結果

### 面向 Agent 的 Music Skills

與 Music 2.6 一同發布，MiniMax 還開源了三個 Music Skills：
- **minimax-music-gen**：賦予 Agent 音樂製作能力
- **minimax-music-playlist**：將 Agent 變成音樂策展人
- **buddy-sings**：賦予虛擬陪伴歌唱能力

* * *

## 6. 開發者生態系統

### API 平台

MiniMax 在 `platform.minimax.io` 提供完整的 API 平台：
- 每個模型的詳細**開發者文件**
- 用量和帳單管理的**控制台**
- **MCP Server**——MiniMax MCP 允許模型整合到 Agent 工作流程中

### Token Plan

Token Plan 是面向開發者的定價套件，具有三個優點：
- **頂級模型**：存取最強大的生產就緒模型
- **月度無限計劃**：無需擔心用量峰值
- **開箱即用**：與熱門開發工具一鍵整合

* * *

## 7. 開源——生態系統評估

### GitHub：25 個儲存庫，5.8K 追蹤者

| 儲存庫 | Stars | 描述 | 授權 |
|--------|-------|------|------|
| **[skills](https://github.com/MiniMax-AI/skills)** | 10.1K ⭐ | Agent 生態系統技能（C#） | MIT |
| **[MiniMax-01](https://github.com/MiniMax-AI/MiniMax-01)** | 3.4K ⭐ | MiniMax-Text-01 & VL-01，Linear Attention | --- |
| **[MiniMax-M1](https://github.com/MiniMax-AI/MiniMax-M1)** | 3.1K ⭐ | 首個混合注意力推理模型 | --- |
| **[MiniMax-M2](https://github.com/MiniMax-AI/MiniMax-M2)** | 2.6K ⭐ | 代碼和 Agent 工作流程模型 | --- |
| **[Mini-Agent](https://github.com/MiniMax-AI/Mini-Agent)** | 2.4K ⭐ | 具備生產級功能的單 Agent 示範 | MIT |
| **[MiniMax-MCP](https://github.com/MiniMax-AI/MiniMax-MCP)** | 1.4K ⭐ | TTS、圖像生成、影片生成的 MCP Server | --- |
| **[MiniMax-M2.7](https://github.com/MiniMax-AI/MiniMax-M2.7)** | 52 ⭐ | M2.7 模型權重和文件 | Modified-MIT |

### HuggingFace：17 個模型，7 個資料集，84 名團隊成員

| 模型 | 參數 | 下載量 | 點讚數 |
|------|------|--------|-------|
| **MiniMax-M2.5** | 229B | 784K | 1.37K |
| **MiniMax-M2** | 229B | 58.4K | 1.49K |
| **MiniMax-M2.7** | 229B | 873 | 396 |

### 開源策略評估

**優勢：**

1. **完整開放權重**：M 系列全部在 HuggingFace 公開模型權重
2. **豐富工具生態系統**：Skills（10.1K⭐）、Mini-Agent（2.4K⭐）、MCP Server、CLI
3. **研究透明度**：關於架構決策的詳細論文和技術部落格
4. **社群量化**：M2.7 的 29 個以上量化版本

**弱點：**

1. **限制性授權**：Modified-MIT 而非 Apache 2.0 或純 MIT
2. **多模態不開源**：Speech、Video（Hailuo）、Music 模型**完全閉源**
3. **229B 參數門檻高**
4. **無小型模型**：沒有 7B、13B、70B 版本——只有 229B 完整版

### 與開源競爭對手的比較

| 標準 | MiniMax | Meta (Llama) | Alibaba (Qwen) | Mistral | DeepSeek |
|------|---------|-------------|----------------|---------|----------|
| **文字模型開放權重** | ✅ 229B | ✅ 8B-405B | ✅ 0.6B-235B | ✅ 7B-123B | ✅ 7B-671B |
| **小型模型（<13B）** | ❌ | ✅ | ✅ | ✅ | ✅ |
| **語音模型公開** | ❌ | ❌ | ✅ Qwen-Audio | ❌ | ❌ |
| **影片模型公開** | ❌ | ❌ | ❌ | ❌ | ❌ |
| **音樂模型公開** | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Agent 框架** | ✅ Mini-Agent、Skills | ❌ | ❌ | ❌ | ❌ |
| **授權** | Modified-MIT | Llama 授權 | Apache 2.0 | Apache 2.0 | MIT |

* * *

## 8. 與競爭對手的比較

### MiniMax vs. 主要 AI 平台

| 標準 | MiniMax | OpenAI | Google | Anthropic |
|------|---------|--------|--------|-----------|
| **文字/代碼模型** | M2.7（第 1-2 級） | GPT-5.x（第 1 級） | Gemini 3（第 1 級） | Opus 4.6（第 1 級） |
| **影片生成** | Hailuo 2.3 ✅ | Sora ✅ | Veo 2 ✅ | ❌ |
| **音樂生成** | Music 2.6 ✅ | ❌ | ❌ | ❌ |
| **TTS/語音** | Speech 2.6 ✅ | TTS API ✅ | Cloud TTS ✅ | ❌ |
| **全棧多模態** | ✅（5 種模態） | 部分 | 部分 | ❌（純文字） |
| **MCP 支援** | ✅ | ✅ | ✅ | ✅ |

### MiniMax 的優勢所在

1. **唯一真正的全棧多模態平台**：沒有其他平台在所有 5 種模態上都有自研 Foundation Model
2. **音樂生成領導者**：帶有封面模式的 Music 2.6 是獨一無二的——OpenAI、Google、Anthropic 均無相當產品
3. **積極的定價策略**：Token Plan 競爭力強，特別適合新興市場開發者
4. **Agent 生態系統**：從 Agent 平台到 MCP Server，所有環節無縫連接

### 需注意的弱點

1. **文字模型不是第一名**：M2.7 非常強大，但在許多基準測試中仍略遜於 Opus 4.6、GPT-5.4
2. **生態系統較小**：社群和第三方整合少於 OpenAI/Google
3. **治理與資料隱私**：作為中國公司，某些機構可能對資料所在地有顧慮

* * *

## 9. 試用 MiniMax — 快速入門指南

### 終端用戶

| 產品 | 連結 | 免費？ |
|------|------|-------|
| MiniMax Agent | [agent.minimax.io](https://agent.minimax.io/) | ✅ 免費層 |
| Hailuo Video | [hailuoai.video](https://hailuoai.video/) | ✅ 免費點數 |
| MiniMax Audio | [minimax.io/audio](https://www.minimax.io/audio) | ✅ 免費層 |
| Talkie | [talkie-ai.com](https://www.talkie-ai.com/) | ✅ 免費 |

### 開發者

**步驟一：** 在 [platform.minimax.io](https://platform.minimax.io/) 註冊

**步驟二：** 選擇合適的 Token Plan，或從免費層開始

**步驟三：** 整合 API

```python
import requests

# 文字生成
url = "https://api.minimax.io/v1/text/chatcompletion_v2"
payload = {
    "model": "MiniMax-M2.7",
    "messages": [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "分析電商系統的微服務架構"}
    ]
}
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
response = requests.post(url, json=payload, headers=headers)
print(response.json())
```

* * *

## 10. MiniMax 適合誰？

### 最適合：

- **內容創作者**：需要高品質影片（Hailuo）、音樂（Music）、語音（Speech）生成
- **獨立開發者**：Token Plan 的競爭力定價，簡單的 API 整合
- **AI 應用建構者**：完整的多模態生態系統，MCP 支援
- **東南亞新創公司**：合理的定價，不鎖定西方生態系統

### 需謹慎考慮的情況：

- 企業需要 EU/US 嚴格的**資料所在地**要求
- 需要**絕對最強的文字模型**
- 需要有明確 SLA 的 **24/7 企業支援**

* * *

## 11. 結論

MiniMax 是全球 AI 競爭中的**隱藏瑰寶**。當 OpenAI 專注於文字、Anthropic 專注於安全、Google 專注於搜尋整合時，MiniMax 建構了其他人所沒有的東西：**在所有模態上都有自研 Foundation Model 的全棧 AI 平台**。

M2.7 證明了 MiniMax 能在代碼和 Agent 任務上直接與第一梯隊競爭。Hailuo 2.3 是目前最佳影片模型之一。帶有封面模式的 Music 2.6 幾乎**沒有競爭對手**。Speech 2.6 已達到生產就緒水準。

擁有超過 **2.36 億用戶**、**21.4 萬企業客戶**，以及日益完善的產品矩陣，MiniMax 不再是小型新創公司。他們正在成為 **AI 時代的平台公司**——這正是他們在 2025 年財務報告中宣告的願景。

對於尋找西方 AI 平台替代方案的開發者和創作者，MiniMax 值得加入你的工具箱。

**網站：** [minimax.io](https://www.minimax.io/)
**API 平台：** [platform.minimax.io](https://platform.minimax.io/)
**GitHub：** [github.com/MiniMax-AI](https://github.com/MiniMax-AI)
**HuggingFace：** [huggingface.co/MiniMaxAI](https://huggingface.co/MiniMaxAI)
**Discord：** [discord.gg/minimax](https://discord.gg/minimax)
