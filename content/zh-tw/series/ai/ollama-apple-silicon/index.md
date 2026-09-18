---
id: 019c9619-aa11-7011-b011-aa1100000011
title: 在 Apple Silicon 上使用 Ollama 運行本地 AI
slug: ollama-apple-silicon
description: >-
  使用 Ollama 和 MLX 在 Mac Apple Silicon (M1/M2/M3/M4) 上本地運行 LLM 的綜合指南。從初始安裝到使用 MLX
  框架進行 3 倍加速、管理多個模型、將 API 整合到應用程式以及優化 GPU/RAM 效能。全部親自動手，隱私第一，無需網路。
featured_image: images/blog/ollama-mlx-featured.webp
level: beginner
duration_hours: 12
lesson_count: 12
price: '0.00'
is_free: true
view_count: 0
average_rating: '0.00'
review_count: 0
enrollment_count: 0
meta: null
published_at: '2026-04-01T08:00:00.000000Z'
created_at: '2026-04-01T08:00:00.000000Z'
author:
  id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf
  name: Duy Tran
  avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg
category:
  id: 019c9618-bb00-7000-b000-bb0000000001
  name: 人工智慧與機器學習
  slug: ai-machine-learning
tags:
  - name: Ollama
    slug: ollama
  - name: MLX
    slug: mlx
  - name: Apple Silicon
    slug: apple-silicon
  - name: LLM
    slug: llm
  - name: local AI
    slug: local-ai
  - name: Mac
    slug: mac
  - name: privacy
    slug: privacy
  - name: hands-on
    slug: hands-on
  - name: Python
    slug: python
  - name: REST API
    slug: rest-api
sections:
  - id: section-01
    title: 第 1 部分：平台 - Ollama 和 Apple Silicon
    description: 了解 Apple Silicon 架構、安裝 Ollama 並運行您的第一個模型
    sort_order: 1
    lessons:
      - id: 019c9619-bb01-7001-d001-bb0100000001
        title: 第 1 課：Apple Silicon 與 AI - 為什麼 M-chip 是本地推理之王
        slug: bai-1-apple-silicon-ai-tai-sao-m-chip-la-vua-inference-local
        description: >-
          什麼是統一記憶體架構 (UMA)？它為何改變本地人工智慧遊戲？將 M1/M2/M3/M4 與 NVIDIA GPU
          進行比較。記憶體頻寬、神經引擎、GPU 核心。為什麼LLM 7B-30B在MacBook上運行流暢？
        duration_minutes: 45
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-bb02-7002-d002-bb0200000002
        title: 第 2 課：安裝 Ollama - 5 分鐘內從零到運行 LLM
        slug: bai-2-cai-dat-ollama-tu-zero-den-chay-llm-trong-5-phut
        description: >-
          在 macOS 上安裝 Ollama，以了解資料夾結構和模型管理。拉動並運行 Llama 3.2、Gemma 3、Mistral、Qwen
          2.5。重要的 Ollama CLI 指令：run、pull、list、rm、show、ps。
        duration_minutes: 60
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-bb03-7003-d003-bb0300000003
        title: 第 3 課：選擇正確的模型 - 比較 Mac 版 LLM
        slug: bai-3-chon-model-phu-hop-so-sanh-llm-cho-mac
        description: >-
          綜合比較表：Llama 3.2 vs Gemma 3 vs Qwen 2.5 vs Mistral vs Phi-4。每種型號尺寸的 RAM
          要求。量化（Q4、Q5、Q8）如何影響速度與品質？根據使用案例選擇型號。
        duration_minutes: 75
        is_free: true
        sort_order: 2
        video_url: null
  - id: section-02
    title: 第 2 部分：MLX - 使用 Apple 原生框架實現 3 倍加速
    description: 整合 MLX 以最大限度地提高 GPU 能力和統一內存
    sort_order: 2
    lessons:
      - id: 019c9619-bb04-7004-d004-bb0400000004
        title: 第 4 課：MLX 框架 - Apple Intelligence 的底層
        slug: bai-4-mlx-framework-apple-intelligence-duoi-nap-capo
        description: >-
          什麼是 MLX，Apple 為何創造它？惰性評估架構，統一計算圖。比較 MLX、llama.cpp 和 Core ML。
          M1/M2/M3/M4 與流行型號的現實基準。
        duration_minutes: 60
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-bb05-7005-d005-bb0500000005
        title: 第 5 課：安裝 mlx-lm 並執行 MLX 量化模型
        slug: bai-5-cai-dat-mlx-lm-va-chay-model-mlx-quantized
        description: >-
          安裝 mlx-lm、mlx-vlm。從 Hugging Face MLX 社群下載模型。比較 Ollama (llama.cpp)
          與相同型號的 mlx-lm 的速度。了解 MLX 中的格式安全張量和量化。運行聊天推理。
        duration_minutes: 75
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-bb06-7006-d006-bb0600000006
        title: 第 6 課：Ollama + MLX 後端 - 結合兩個世界的優點
        slug: bai-6-ollama-mlx-backend-ket-hop-tot-nhat-cua-hai-the-gioi
        description: >-
          配置 Ollama 以使用 MLX 後端而不是 llama.cpp。詳細基準測試：預填速度、產生速度、記憶體使用量。優化上下文視窗。何時使用
          MLX 後端，何時使用 llama.cpp。
        duration_minutes: 90
        is_free: true
        sort_order: 2
        video_url: null
  - id: section-03
    title: 第 3 部分：API 整合與應用程式編程
    description: 使用 Ollama REST API 和 Python/JS 庫將 LLM 整合到應用程式中
    sort_order: 3
    lessons:
      - id: 019c9619-bb07-7007-d007-bb0700000007
        title: 第 7 課：Ollama REST API - OpenAI 相容端點
        slug: bai-7-ollama-rest-api-openai-compatible-endpoint
        description: >-
          Ollama 公開了 OpenAI 相容的 REST
          API：/api/chat、/api/generate、/api/embeddings。使用curl和Python請求。流式響應。透過更改
          base_url 與任何 OpenAI SDK 整合。
        duration_minutes: 60
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-bb08-7008-d008-bb0800000008
        title: 第 8 課：Python 整合 - 使用 Ollama 建立本地聊天機器人
        slug: bai-8-python-integration-xay-chatbot-local-voi-ollama
        description: >-
          將 Ollama 函式庫用於 Python 和 LangChain 以及 Ollama 後端。創建具有記憶體的聊天機器人，在終端機中傳輸
          UI。使用 nomic-embed-text 和簡單的 RAG 範例進行本機嵌入。
        duration_minutes: 120
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-bb09-7009-d009-bb0900000009
        title: 第 9 課：視覺模型 - 無需雲的圖像分析
        slug: bai-9-vision-models-phan-tich-hinh-anh-khong-can-cloud
        description: >-
          將 LLaVA、Gemma 3 Vision、Qwen VL 與 Ollama
          一起使用。透過API傳送影像、文件掃描分析、進階OCR、UI截圖描述。使用 mlx-vlm 執行需要高速的視覺任務。
        duration_minutes: 90
        is_free: true
        sort_order: 2
        video_url: null
  - id: section-04
    title: 第 4 部分：最佳化、管理和生產設置
    description: 最大限度地提高效能並建立完整的個人人工智慧工作流程
    sort_order: 4
    lessons:
      - id: 019c9619-bb10-7010-d010-bb1000000010
        title: 第 10 課：優化效能 - RAM、上下文、並發性
        slug: bai-10-toi-uu-hieu-nang-ram-context-concurrency
        description: >-
          正在調整 OLLAMA_NUM_PARALLEL、OLLAMA_MAX_LOADED_MODELS。上下文視窗如何影響
          RAM？同時運行多個模型。使用 Activity Monitor 和 ollama ps 進行監控。交換內存陷阱。
        duration_minutes: 75
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-bb11-7011-d011-bb1100000011
        title: 第 11 課：模型檔 - 自訂模型與系統提示
        slug: bai-11-modelfiles-custom-models-va-system-prompts
        description: 編寫模型檔案來建立自訂模型：系統提示、溫度、top_p、停止標記。創建專門的人工智慧助手，用於程式碼審查、翻譯、寫作。繼承自基礎模型。
        duration_minutes: 60
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-bb12-7012-d012-bb1200000012
        title: 第 12 課：完整工作流程 - 個人 AI 設定 2026
        slug: bai-12-workflow-hoan-chinh-personal-ai-setup-2026
        description: >-
          總結：建立完整的個人AI堆疊。 Open WebUI 提供漂亮的聊天 UI，Continue.dev 提供 VS Code
          中的編碼助手，Ollama + Obsidian 提供知識庫，以及完全本地隱私優先的工作流程。
        duration_minutes: 90
        is_free: true
        sort_order: 2
        video_url: null
locale: zh-tw
---

## 系列介紹

您是否擁有 M 晶片 Mac，但仍每月支付 ChatGPT 或 Anthropic 費用？

本系列將教您在機器上完全本地運行人工智慧：沒有互聯網，沒有 API 金鑰，沒有月費，而且資料永遠不會離開機器。

得益於統一記憶體架構，Apple Silicon 成為當今最好的本地推理平台之一。配備 16GB 或 32GB RAM 的 MacBook 可以比許多人想像的更流暢地運行許多 7B 到 30B 型號。

## 你會學到什麼？

- 安裝並操作Ollama以在本機上執行LLM
- 整合Apple的MLX以加速推理
- 透過 REST API 從 Python、JavaScript 或任何語言呼叫模型
- 建立聊天機器人、視覺應用程式、嵌入本地運行的管道
- 優化記憶體、並發和自訂AI助手

## 先決條件

- 配備 Apple Silicon 晶片（M1 或更高版本）的 Mac
- RAM 16GB 或以上，如果運行大型型號，建議使用 32GB
- macOS Ventura 13.3+ 或更高版本
- 了解基本終端
- 遵循練習的基本 Python

## 為什麼你應該學習這個系列？

2026年，本地運行AI的能力對開發者來說是一項非常實用的技能：

1. 隱私：代碼、數據和聊天不會離開設備
2. 成本：幾乎為 0 美元，而不是每月 API 租金
3.速度：對於重複性任務，本地延遲通常低於雲端
4、離線：無網路時仍可運作
5. 客製化：輕鬆建立自己的工作流程、您自己的模型檔案、您自己的堆疊
