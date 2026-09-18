---
id: 01970001-aa11-7011-b011-aa1100001011
title: Gemma 4 本地 AI 工程實戰 on Mac
slug: gemma-4-local-ai-engineering-tren-mac
description: 在 Apple Silicon 上使用 Gemma 4 建構本地 AI 技術棧的實戰系列。涵蓋 Ollama 設定、API 整合、RAG 管線、混合檢索，到內部環境的可觀測性與安全強化。
featured_image: images/blog/gemma-4-local-ai-engineering-series.webp
level: intermediate
duration_hours: 14
lesson_count: 8
price: '0.00'
is_free: true
view_count: 0
average_rating: '0.00'
review_count: 0
enrollment_count: 0
meta: null
published_at: '2026-04-03T20:00:00.000000Z'
created_at: '2026-04-03T20:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9618-bb00-7000-b000-bb0000000001, name: AI & Machine Learning, slug: ai-machine-learning}
tags: [{name: Gemma, slug: gemma}, {name: LLM, slug: llm}, {name: RAG, slug: rag}, {name: Ollama, slug: ollama}, {name: Apple Silicon, slug: apple-silicon}, {name: MLOps, slug: mlops}, {name: local AI, slug: local-ai}, {name: Python, slug: python}, {name: vector database, slug: vector-database}, {name: production, slug: production}]
sections: [{id: section-01, title: '第一部分：Foundation — Gemma 4 本地技術棧', description: '設計本地優先架構，在 macOS 上建構執行環境', sort_order: 1, lessons: [{id: 01970001-bb01-7001-d001-bb0100001001, title: '課程 1：為開發團隊設計本地 AI 架構', slug: bai-1-thiet-ke-local-ai-architecture-cho-team-dev, description: '定義本地優先架構目標、分離模型執行環境與應用層、標準化聊天/API/批次任務流程。', duration_minutes: 70, is_free: true, sort_order: 0, video_url: null}, {id: 01970001-bb02-7002-d002-bb0200001002, title: '課程 2：在 Mac 上使用 Ollama 與 Open WebUI 設定 Gemma 4', slug: bai-2-setup-gemma-4-voi-ollama-va-open-webui-tren-mac, description: '在 Apple Silicon 上安裝執行環境、依 RAM 配置模型、為 QA/PM/內容團隊部署內部聊天 UI。', duration_minutes: 90, is_free: true, sort_order: 1, video_url: null}]}, {id: section-02, title: '第二部分：Integration — API、Prompting 與應用整合', description: '透過 API 將 Gemma 4 整合到應用程式中，標準化 prompt 並控制輸出', sort_order: 2, lessons: [{id: 01970001-bb03-7003-d003-bb0300001003, title: '課程 3：建構帶應用層策略的 Gemma 4 API 閘道', slug: bai-3-xay-api-gateway-cho-gemma-4-va-policy-tang-ung-dung, description: '建構具備逾時、重試、結構化輸出、日誌中繼資料與模型存取控制的 FastAPI/Node 閘道。', duration_minutes: 100, is_free: true, sort_order: 0, video_url: null}, {id: 01970001-bb04-7004-d004-bb0400001004, title: '課程 4：LLM 的 Prompt Contract、JSON Schema 與回歸測試', slug: bai-4-prompt-contracts-json-schema-va-regression-test-cho-llm, description: '為各使用情境定義 prompt contract，強制輸出 schema，建構防止 prompt 或模型變更時品質漂移的測試套件。', duration_minutes: 95, is_free: true, sort_order: 1, video_url: null}]}, {id: section-03, title: '第三部分：內部資料的 RAG 工程', description: '設計資料擷取管線、向量搜尋與混合檢索，降低幻覺', sort_order: 3, lessons: [{id: 01970001-bb05-7005-d005-bb0500001005, title: '課程 5：越南語文本的 Ingestion、Chunking 與 Vector Indexing', slug: bai-5-ingestion-chunking-va-vector-indexing-cho-tieng-viet, description: '處理 Markdown/PDF，以技術文件結構進行 chunking，儲存完整中繼資料，最佳化越南語文件的 embedding 管線。', duration_minutes: 110, is_free: true, sort_order: 0, video_url: null}, {id: 01970001-bb06-7006-d006-bb0600001006, title: '課程 6：混合檢索 — BM25 + 向量 + Reranker', slug: bai-6-hybrid-retrieval-bm25-vector-reranker, description: '以 RRF 結合詞彙搜尋與語意搜尋，使用 reranker 提升精確度與引用正確性。', duration_minutes: 100, is_free: true, sort_order: 1, video_url: null}]}, {id: section-04, title: '第四部分：可靠性、成本與生產環境強化', description: '衡量品質、追蹤成本，在內部上線前強化本地 AI 技術棧', sort_order: 4, lessons: [{id: 01970001-bb07-7007-d007-bb0700001007, title: '課程 7：GenAI 的 Eval Framework、Observability 與 SLO', slug: bai-7-eval-framework-observability-va-slo-cho-genai, description: '設計 golden set、線上回饋迴路、延遲/接地性/成本指標，定義 AI 功能的 SLO。', duration_minutes: 95, is_free: true, sort_order: 0, video_url: null}, {id: 01970001-bb08-7008-d008-bb0800001008, title: '課程 8：企業級本地 AI 技術棧的強化與上線', slug: bai-8-hardening-va-rollout-local-ai-stack-cho-doanh-nghiep, description: '密鑰管理、PII 控制、RBAC、備份策略、穩定運作的 Go-Live 檢查清單。', duration_minutes: 100, is_free: true, sort_order: 1, video_url: null}]}]
---

## 系列介紹

本系列專為已能在本地基本運行 LLM 的開發者設計，協助您提升到正式的工程等級——具備清晰的架構、穩定的 API、可靠的 RAG、品質指標與上線檢查清單。

這不是快速 demo 教學。每堂課都基於內部團隊使用本地 AI 技術棧的實際需求。

## 您將學到

- 設計 AI 產品的本地優先架構
- 以開發團隊標準在 Mac 上建構 Gemma 4 技術棧
- 建立 API 閘道、prompt contract 與輸出 schema
- 建構從 ingestion 到混合檢索的越南語 RAG 管線
- 使用 eval framework 與運維可觀測性衡量品質
- 在內部部署前強化系統

## 先決條件

- 搭載 Apple Silicon 的 Mac（M1 以上），建議 24GB 以上 RAM
- 基本的 Terminal 與 Git 使用經驗
- Python 或 TypeScript 基礎知識
- 理解 API、JSON、HTTP

## 原始碼

本系列所有 demo 程式碼：

> **[xdev-asia-labs/gemma-4-local-ai-engineering-on-mac](https://github.com/xdev-asia-labs/gemma-4-local-ai-engineering-on-mac)**

![專案結構](/images/blog/gemma4-series-demo/01-project-structure.webp)

## 完成系列後的成果

完成本系列後，您將能為團隊建構一個迷你本地 AI 平台：

1. 為非技術使用者提供的聊天 UI
2. 內部應用程式的 API
3. 具引用功能且品質穩定的 RAG
4. 監控與受控的發佈流程
