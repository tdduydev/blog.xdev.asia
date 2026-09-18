---
id: 01970000-b2c3-8d4e-f5a6-789012345def
title: 'Gemma 4：Google 最強大的開源 AI 模型——代理式工作流、端側運行與 Apache 2.0'
slug: gemma-4-most-powerful-google-open-ai-model-agentic-edge
excerpt: Google DeepMind 發布 Gemma 4——在 Arena AI 排名全球第三的開源模型系列，支援代理式工作流、視覺、音訊、140 多種語言，可在 Raspberry Pi 到 H100 GPU 等各類設備上端側運行。深度分析四種規格架構（E2B、E4B、26B MoE、31B Dense）、基準測試比較及部署指南。
featured_image: /images/blog/gemma-4-featured.webp
type: blog
reading_time: 15
view_count: 0
meta: null
published_at: '2026-04-03T10:00:00.000000Z'
created_at: '2026-04-03T10:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: AI, slug: ai}, {name: LLM, slug: llm}, {name: Machine Learning, slug: machine-learning}, {name: Deep Learning, slug: deep-learning}]
locale: zh-tw
comments: []
---

2026 年 4 月 2 日，Google DeepMind 正式推出 **Gemma 4**——有史以來最強大的開源 AI 模型系列。憑藉 **Apache 2.0** 授權、對**代理式工作流**、**視覺與音訊**、**140 多種語言**的支援，以及從 Raspberry Pi 到智慧型手機皆可端側運行的能力，Gemma 4 不僅是一次升級——更是開源 AI 領域的全面革新。

成果顯而易見：31B 模型在 Arena AI 排行榜（開源模型）中位居**全球第三**，超越了參數量**大 20 倍以上**的眾多模型。26B MoE 模型排名**第六**。而邊緣版 E2B 僅需不到 **1.5GB RAM**，即可在手機上流暢運行。

本文將全面分析：架構、功能、基準測試、生態系統，以及如何從今天開始使用 Gemma 4。

* * *

## 1. Gemma 4 是什麼？

Gemma 4 是 Google DeepMind 開發的大型語言模型（LLM）系列，採用與 **Gemini 3** 相同的技術與研究成果——但專為在**您的硬體上運行**而設計。

自第一代發布以來，Gemma 系列累計下載次數已超過 **4 億次**，形成了擁有超過 **10 萬個社群貢獻變體**的 **Gemmaverse** 生態系統。Gemma 4 是這個系列迄今最大的飛躍。

### 設計哲學

Gemma 4 不追求擁有數千億參數的巨型模型。Google 聚焦於**每參數智慧**——即每個參數所能發揮的最大智慧。目標是以大幅更低的硬體需求達到前沿等級的能力。

* * *

## 2. 四種規格，四種使用場景

Google 以**4 個變體**發布 Gemma 4，分別針對不同的硬體區隔設計：

| 模型 | 架構 | 上下文視窗 | 目標硬體 | 主要特色 |
|-------|-----------|----------------|--------------------|--------------------|
| **E2B** (Effective 2B) | 精簡型 | 128K | 智慧型手機、IoT、Raspberry Pi | 音訊 + 視覺，<1.5GB RAM |
| **E4B** (Effective 4B) | 精簡型 | 128K | 智慧型手機、平板 | 多模態、端側代理 |
| **26B MoE** | Mixture of Experts | 256K | 消費級 GPU、工作站 | 僅啟動 3.8B 參數 → 高速 |
| **31B Dense** | Dense | 256K | GPU H100 80GB (bfloat16) | 最高品質，微調基礎 |

### 2.1. E2B 與 E4B——面向所有設備的 AI

這兩個邊緣模型從**一開始**就以最大化運算效率和記憶體使用效率為設計目標。在推理過程中，它們分別只啟動 2B 和 4B 的有效參數，從而節省 RAM 和電池電量。

主要特色：
- **原生音訊輸入**：直接在設備上進行語音識別和音訊理解
- **原生視覺**：多解析度視訊與圖像處理、OCR、圖表理解
- **完全離線運行**：在 Raspberry Pi 5、NVIDIA Jetson Orin Nano、Qualcomm、MediaTek 上運行
- 整合 **Android AICore Developer Preview**——與 Gemini Nano 4 具有前向相容性

在搭載 LiteRT-LM 的 Raspberry Pi 5 上的亮眼數據：
- **預填充**：133 tokens/秒
- **解碼**：7.6 tokens/秒
- 足以用於智慧家居控制器、語音助理及離線機器人

### 2.2. 26B MoE——在消費級硬體上實現前沿速度

一個總參數量 26B 的 Mixture of Experts 模型，每次推理僅**啟動 3.8B 參數**。結果是在保持前沿品質的同時實現驚人的 tokens/秒速度。

- 在 Arena AI 排行榜（開源模型）排名**第六**
- 量化版可在消費級 GPU 上運行
- 適合需要低延遲的 IDE、程式輔助及代理式工作流

### 2.3. 31B Dense——最高品質

傳統的密集型模型，針對原始品質優化，也是最強大的微調基礎。

- 在 Arena AI 文字排行榜（開源模型）位居**全球第三**
- 超越參數量大 20 倍的模型
- bfloat16 精度的權重剛好能放入單張 NVIDIA H100 80GB GPU
- 量化版可在消費級 GPU 上運行

* * *

## 3. 突出功能

### 3.1. 代理式工作流——不只是聊天機器人

這是 Gemma 4 相對於上一代最大的飛躍。模型原生支援：

- **函式呼叫**：直接呼叫工具和 API
- **結構化 JSON 輸出**：適合生產環境的可靠結構化輸出
- **原生系統指令**：在原生層面提供系統指導
- **多步驟規劃**：規劃並執行多步驟工作流

這意味著您可以建構**自主代理**，完全在端側運行，無需網路，無需將資料傳送至雲端。

### 3.2. 視覺與音訊

所有 Gemma 4 模型均可原生處理**視訊和圖像**：
- 可變解析度支援
- 高品質 OCR
- 圖表和圖形理解
- E2B/E4B 還支援語音識別的**原生音訊輸入**

### 3.3. 程式碼生成

Gemma 4 支援高品質的離線程式碼生成，將您的工作站變成**本地優先的 AI 程式輔助工具**。結合 26B MoE（高速）或 31B Dense（最高品質），您可以享受不依賴雲端的程式輔助體驗。

### 3.4. 140 多種語言

在 140 多種語言上原生訓練——包括中文。這對於建構服務多語言和全球市場應用的開發者來說是重大優勢。

### 3.5. 擴展上下文視窗

- **邊緣模型**（E2B、E4B）：128K tokens
- **大型模型**（26B、31B）：256K tokens

足以在單個提示中傳入整個程式碼儲存庫或長篇文件。

* * *

## 4. 邊緣端 Agent Skills——端側 AI 的未來

Google 同步在 [Google AI Edge Gallery](https://github.com/google-ai-edge/gallery) 應用程式中推出了 **Agent Skills**——這是最早運行**多步驟、自主、完全端側代理工作流**的應用之一。

### 邊緣端 Gemma 4 能做什麼？

**1. 擴展知識庫：**
代理可以存取訓練資料之外的資訊。例如：建立 Wikipedia 查詢技能，回答任何百科知識問題。

**2. 建立互動式內容：**
將文字或影片轉換為摘要、字卡和互動式圖表。例如：自動從用戶語音中彙整並顯示每日睡眠/情緒趨勢。

**3. 擴展核心功能：**
與文字轉語音、圖像生成、音樂合成等其他模型整合。例如：為照片配上符合情境的音樂。

**4. 端到端體驗：**
用戶無需在多個應用程式間切換，完全通過對話管理複雜工作流。Google 展示了一款完全通過對話建構的應用，可描述動物並播放其叫聲。

### LiteRT-LM——端側運行時

[LiteRT-LM](https://ai.google.dev/edge/litert-lm/overview) 是一個新的運行時，可在任何設備上部署 Gemma 4：

- **最小記憶體**：透過支援 2 位元和 4 位元權重，Gemma 4 E2B 可在不到 1.5GB 記憶體的環境中運行
- **受限解碼**：結構化輸出，確保生產環境中可靠的工具呼叫
- **動態上下文**：以動態上下文長度靈活在 CPU 和 GPU 上處理，充分利用 128K 上下文視窗
- **效能**：在 3 秒內透過 2 個獨立技能處理 4,000 個輸入 tokens

多平台支援：

| 平台 | 支援 |
|----------|--------|
| **行動裝置** | Android（CPU/GPU）、iOS、Android AICore |
| **桌面及網路** | Windows、Linux、macOS（Metal）、WebGPU |
| **IoT 及機器人** | Raspberry Pi 5、Qualcomm IQ8 NPU |

Google 還為 Linux、macOS 和 Raspberry Pi 推出了 **Python 套件和命令列工具** `litert-lm`——讓您無需撰寫程式碼即可直接從終端機試用 Gemma 4：

```bash
# 安裝 litert-lm CLI
pip install litert-lm

# 直接從終端機執行 Gemma 4 E2B
litert-lm run gemma-4-e2b
```

* * *

## 5. Apache 2.0——授權里程碑

這是最重大的策略性變化。舊版 Gemma 使用有一定限制的自訂授權「**Gemma Terms of Use**」。Gemma 4 全面切換為 **Apache 2.0**。

這意味著：

- **商業自由**：無限制地使用、修改和分發
- **數位主權**：完全掌控資料、基礎設施和模型
- **無約束**：可自由部署，無論本地或雲端，無需報告或登記

Hugging Face 執行長 Clément Delangue 評論道：「*以 Apache 2.0 授權發布 Gemma 4 是一個重要的里程碑。*」

### 與其他開源模型的授權比較

| 模型 | 授權 | 商業用途 | 衍生作品 |
|-------|-----------|------------|------------------|
| **Gemma 4** | Apache 2.0 | ✅ 自由 | ✅ 自由 |
| Llama 3.x | Llama License | ✅（MAU 超過 7 億有條件限制） | ✅ 有限制 |
| Mistral | Apache 2.0 | ✅ 自由 | ✅ 自由 |
| Qwen 2.5 | Apache 2.0 / Tongyi | ✅ 依版本而定 | ✅ 依版本而定 |

Gemma 4 使 Google 在開放程度上與 Mistral 並駕齊驅，在授權自由度上遠超 Meta（Llama）。

* * *

## 6. 生態系統支援

Gemma 4 在大多數主流框架和平台上獲得**首日支援**：

### 框架與工具

- **Hugging Face**: Transformers、TRL、Transformers.js、Candle
- **推理**: vLLM、llama.cpp、SGLang、Ollama、LM Studio
- **Apple**: MLX（mlx-community）
- **NVIDIA**: NIM、NeMo
- **邊緣**: LiteRT-LM、Google AI Edge Gallery
- **微調**: Unsloth、Google Colab、Vertex AI
- **其他**: Cactus、Baseten

### 下載模型

- [Hugging Face](https://huggingface.co/collections/google/gemma-4)
- [Kaggle](https://www.kaggle.com/models/google/gemma-4)
- [Ollama](https://ollama.com/library/gemma4)

### 最快上手方式

```bash
# 透過 Ollama
ollama run gemma4

# 透過 Google AI Studio（31B、26B MoE）
# https://aistudio.google.com/prompts/new_chat?model=gemma-4-31b-it

# 透過 Google AI Edge Gallery（E2B、E4B）
# https://github.com/google-ai-edge/gallery
```

* * *

## 7. 比較：Gemma 4 vs 其他開源模型

根據 Arena AI 文字排行榜（開源模型，截至 2026 年 4 月 2 日）：

| 排名 | 模型 | 規格 | 授權 |
|-----------|---------|------------|-----------|
| 第 1 名 | DeepSeek-V3 | 671B MoE | DeepSeek License |
| 第 2 名 | Qwen3-235B | 235B MoE | Apache 2.0 |
| **第 3 名** | **Gemma 4 31B** | **31B Dense** | **Apache 2.0** |
| 第 4 名 | Llama 4 Maverick | 400B MoE | Llama License |
| 第 5 名 | DeepSeek-R1 | 671B MoE | MIT |
| **第 6 名** | **Gemma 4 26B** | **26B MoE（啟動 3.8B）** | **Apache 2.0** |

值得關注：Gemma 4 31B（310 億參數）勝過 Llama 4 Maverick（4,000 億參數）——**小 13 倍**卻排名更高。這是 Google「每參數智慧」哲學最清晰的證明。

* * *

## 8. 實際應用與使用場景

### 8.1. 個人開發者

- **離線程式輔助**：在遊戲 GPU 上運行 26B MoE，無需支付 API 費用
- **程式碼審查代理**：利用函式呼叫和結構化輸出建立自動審查 PR 的代理
- **本地 RAG**：結合 256K 上下文視窗與在本地運行的 Qdrant/Chromadb

### 8.2. 企業

- **本地部署 AI**：Apache 2.0 + 端側運行 = 資料永遠不離開基礎設施
- **主權 AI**：符合資料境內儲存要求（數位主權）
- **邊緣 AI 生產環境**：以 E2B/E4B 打造智慧家居、資訊亭、POS、攝影機 AI

### 8.3. 研究人員

- **微調基礎**：31B Dense 是領域特定調整的強大基礎模型
- **多語言研究**：140 多種語言為低資源語言 NLP 研究打開大門
- **實際案例**：耶魯大學使用 Gemma 發現癌症治療的新途徑（Cell2Sentence-Scale）

### 8.4. IoT 與機器人

- **離線語音助理**：在 Raspberry Pi 5 上以 E2B 為機器人和智慧音箱提供服務
- **邊緣分析**：在 NVIDIA Jetson 上進行實時圖像/視訊分析
- **工業自動化**：在 Qualcomm IQ8 NPU 上部署自主代理

* * *

## 9. 快速入門指南

### 9.1. 使用 Ollama 運行（最簡單）

```bash
# 安裝 Ollama
curl -fsSL https://ollama.com/install.sh | sh

# 運行 Gemma 4（自動選擇適合的規格）
ollama run gemma4

# 或指定特定變體
ollama run gemma4:26b
ollama run gemma4:31b
```

### 9.2. 使用 LiteRT-LM 在邊緣端運行

```bash
# 安裝 LiteRT-LM CLI
pip install litert-lm

# 下載並運行模型
litert-lm download gemma-4-e2b
litert-lm run gemma-4-e2b
```

### 9.3. 使用 Python（Hugging Face Transformers）

```python
from transformers import AutoTokenizer, AutoModelForCausalLM

model_id = "google/gemma-4-31b-it"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    device_map="auto",
    torch_dtype="auto"
)

messages = [
    {"role": "user", "content": "用三句話解釋 Mixture of Experts 架構。"}
]

input_ids = tokenizer.apply_chat_template(
    messages, return_tensors="pt"
).to(model.device)

outputs = model.generate(input_ids, max_new_tokens=256)
print(tokenizer.decode(outputs[0], skip_special_tokens=True))
```

### 9.4. 函式呼叫（代理式）

```python
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get current weather for a location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {"type": "string", "description": "City name"}
                },
                "required": ["location"]
            }
        }
    }
]

messages = [
    {"role": "system", "content": "You are a helpful assistant with access to tools."},
    {"role": "user", "content": "台北今天天氣怎麼樣？"}
]
```
