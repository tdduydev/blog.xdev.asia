---
id: 019c9618-a1b0-7a01-b001-c1d2e3f4a5b6
title: 使用 xClaw 建立 AI 代理平台 — 從頭到尾的實用指南
slug: xay-dung-ai-agent-platform-voi-xclaw-huong-dan-thuc-chien
excerpt: >-
  使用 xClaw 建立完整 AI 代理平台的詳細說明 — TypeScript monorepo 支援多 LLM、RAG 管道、工作流程引擎、13
  個網域包、多租戶 RBAC、MCP 協定和 8 個聊天通道。從雙資料庫架構到部署Docker生產。
featured_image: /images/blog/xclaw-ai-agent-featured.webp
type: blog
reading_time: 45
view_count: 0
meta: null
published_at: '2026-03-30T10:00:00.000000Z'
created_at: '2026-03-30T10:00:00.000000Z'
author:
  id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf
  name: Duy Tran
  avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg
category:
  id: 019c9617-fab3-73e8-9346-aa158c67e20e
  name: 後端
  slug: backend
tags:
  - name: AI
    slug: ai
  - name: TypeScript
    slug: typescript
  - name: Docker
    slug: docker
  - name: multi-tenant
    slug: multi-tenant
  - name: rbac
    slug: rbac
  - name: postgresql
    slug: postgresql
  - name: mongodb
    slug: mongodb
  - name: AI Agents
    slug: ai-agents
  - name: RAG
    slug: rag
  - name: MCP
    slug: mcp
  - name: open-source
    slug: open-source
  - name: Hono
    slug: hono
  - name: React
    slug: react
  - name: monorepo
    slug: monorepo
  - name: workflow
    slug: workflow
comments: []
locale: zh-tw
---

## 1.簡介

**xClaw** 是一個開源 AI 代理平台，建構成 TypeScript monorepo，允許建置和部署 AI 代理程式來服務多個產業。平台提供：

- **Visual Workflow Builder** 具有 16 種節點類型
- **RAG Pipeline** 用於文件語意搜尋
- **多法學碩士** — 支援 10 多個提供者（OpenAI、Anthropic、Google、Groq、Mistral、DeepSeek、xAI、OpenRouter、Perplexity、Ollama）
- **13 個領域包** 按行業專門化
- **多租用戶 RBAC** 有 60 個詳細權限
- **MCP 協定** — 模型上下文協定伺服器發現
- **8 個聊天頻道** — Telegram、Discord、Slack、WhatsApp、Zalo OA、Microsoft Teams、WebChat、Webhook
- **內建 12 種 ML/AutoML 演算法**

本文將詳細介紹 xClaw 的每個核心部分，從系統架構到如何安裝、開發和部署到生產。

**原始碼：** [https://github.com/xdev-asia-labs/xClaw](https://github.com/xdev-asia-labs/xClaw)

---

## 2.系統架構

### 2.1。概述

xClaw 使用 **Gateway + Monorepo** 架構，其中：

- **Hono** 作為 HTTP 伺服器（API 網關）
- **React 19 + Vite** 用於前端
- **雙資料庫設計** — PostgreSQL + MongoDB
- **Redis** 用於快取和速率限制

```
┌─────────────────────────────────────────────────────┐
│                    Client (Browser)                  │
│              React 19 + Tailwind + Zustand           │
└─────────────────┬───────────────────────────────────┘
                  │ HTTP / WebSocket
                  ▼
┌─────────────────────────────────────────────────────┐
│              API Gateway (Hono - Port 3000)          │
│         Auth │ RBAC │ Rate Limit │ CORS              │
├─────────┬────┴──────┬───────────┬───────────────────┤
│  Chat   │ Workflow  │    RAG    │   Admin/RBAC      │
│ Engine  │  Engine   │ Pipeline  │   Management      │
├─────────┴───────┬───┴───────────┴───────────────────┤
│                 │                                     │
│    ┌────────────┼────────────┐                        │
│    ▼            ▼            ▼                        │
│ ┌──────┐  ┌─────────┐  ┌───────┐                    │
│ │ PG   │  │ MongoDB  │  │ Redis │                    │
│ │:5432 │  │  :27018  │  │ :6379 │                    │
│ └──────┘  └─────────┘  └───────┘                    │
└─────────────────────────────────────────────────────┘
```

### 2.2。雙資料庫設計

xClaw 最重要的架構決策之一是以資料性質分離資料庫：

|資料庫|角色 |集合/表格|
|----------|------|--------------------|
| **PostgreSQL** |設定與結構化資料 |租用戶、tenantSettings、使用者、角色、權限、rolePermissions、userRoles、oauthAccounts、工作流程、workflowExecutions、integrationConnections、webhooks |
| **MongoDB** |人工智慧與對話資料 |會話、訊息、記憶體項目、代理設定、稽核日誌、系統日誌 |
| **Redis** |快取層|會話快取、速率限制、即時指標 |

**為什麼要使用雙資料庫？ **

- **PostgreSQL** — 強大的關聯式資料、ACID 事務、模式驗證 → 適用於設定、使用者、RBAC
- **MongoDB** — 靈活的模式，適合文件儲存、時序資料→適合聊天訊息、AI記憶體、日誌
- **Redis** — 記憶體中、亞毫秒延遲 → 適用於快取、會話、速率限制

### 2.3。技術堆疊詳細信息

|層 |技術 |
|------|----------|
| **執行時期** | Node.js 20、TypeScript（ES2022、ESM）|
| **API 伺服器** |榮譽資格 |
| **前端** | React 19、Tailwind CSS、Zustand、Vite |
| **PostgreSQL ORM** |毛毛雨 ORM |
| **MongoDB** |官方 Node.js 驅動程式 |
| **快取** | Redis 8 | Redis 8
| **法學碩士** | OpenAI、Anthropic、DeepSeek、xAI、OpenRouter、Perplexity、Google、Groq、Mistral、Ollama |
| **授權** | JWT、OAuth2（Google、GitHub、Discord）|
| **建置** | Docker 多階段、npm 工作區 |
| **文檔** | Fumadocs + Next.js |

---

## 3. 安裝與快速啟動

### 3.1。要求

- [Docker](https://docs.docker.com/get-docker/) & Docker 組合
- [Ollama](https://ollama.ai/) （可選，適用於本地法學碩士）

### 3.2。複製和配置

```bash
# Clone repo kèm submodules
git clone --recurse-submodules https://github.com/xdev-asia-labs/xClaw.git
cd xClaw

# Copy file env mẫu
cp .env.example .env
```

開啟文件 `.env` 並配置 API 金鑰：

```env
# Server
PORT=3000
HOST=0.0.0.0

# Database
DATABASE_URL=postgresql://xclaw:xclaw@postgres:5432/xclaw
MONGODB_URL=mongodb://xclaw:xclaw@mongodb:27018/xclaw
REDIS_URL=redis://redis:6379

# JWT
JWT_SECRET=your-super-secret-key-change-me-in-production

# LLM Provider (chọn 1 hoặc nhiều)
LLM_PROVIDER=openai
OPENAI_API_KEY=sk-xxxxx

# Hoặc dùng Anthropic
# LLM_PROVIDER=anthropic
# ANTHROPIC_API_KEY=sk-ant-xxxxx

# Hoặc dùng Ollama (local, miễn phí)
# LLM_PROVIDER=ollama
# OLLAMA_BASE_URL=http://host.docker.internal:11434/v1

# CORS
CORS_ORIGINS=http://localhost:3001,http://localhost:5173
```

### 3.3。使用 Docker Compose 啟動

```bash
docker compose up --build
```

Docker Compose 將推出 5 項服務：

|服務 |港口|說明 |
|--------|--------|--------|
| `xclaw` | 3000 | 3000 API 伺服器（Hono）|
| `web` | 3001 | 3001前端（React + Nginx）|
| `postgres` | 5432 | PostgreSQL 18 |
| `mongodb` | 27018 | 27018 MongoDB 7 |
| `redis` | 6379 | Redis 8 | Redis 8

### 3.4。登入

訪問 [http://localhost:3001](http://localhost:3001) 並使用預設帳號登入：

```
Email:    admin@xclaw.io
Password: password123
```

> ⚠️ **重要：** 在生產環境中首次登入後請立即變更密碼。

### 3.5。 （可選）為本地 LLM 安裝 Ollama

如果您想在沒有 API 金鑰的情況下本地運行 LLM：

```bash
# Cài Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull model
ollama pull qwen2.5:14b

# Hoặc model nhỏ hơn
ollama pull qwen2.5:7b
```

伺服器現在將自動偵測Ollama `http://localhost:11434`。

---

## 4. Monorepo 結構

xClaw 被組織為帶有 npm 工作區的 monorepo。每個包都承擔明確的責任：

```
xClaw/
├── packages/
│   ├── shared/          # @xclaw-ai/shared — Foundation types & constants
│   ├── core/            # @xclaw-ai/core — Agent engine, LLM, RAG, workflow
│   ├── db/              # @xclaw-ai/db — Drizzle ORM (PG) + MongoDB driver
│   ├── gateway/         # @xclaw-ai/gateway — Hono HTTP server, REST API, auth
│   ├── server/          # @xclaw-ai/server — Entry point, startup orchestration
│   ├── integrations/    # @xclaw-ai/integrations — 11 service connectors
│   ├── domains/         # @xclaw-ai/domains — 13 industry domain packs
│   ├── skills/          # @xclaw-ai/skills — Built-in skills (defineSkill)
│   ├── skill-hub/       # @xclaw-ai/skill-hub — Marketplace, MCP adapters
│   ├── ml/              # @xclaw-ai/ml — 12 ML algorithms, AutoML
│   ├── cli/             # @xclaw-ai/cli — CLI (commander.js)
│   ├── doc-mcp/         # @xclaw-ai/doc-mcp — Dev Docs MCP server
│   ├── chat-sdk/        # @xclaw-ai/chat-sdk — Chat SDK
│   ├── sandbox/         # @xclaw-ai/sandbox — Sandboxed code execution
│   ├── web/             # React + Tailwind frontend
│   ├── zalo-miniapp/    # Zalo Mini App client
│   └── channels/        # Channel plugins
│       ├── telegram/    # Telegram bot
│       ├── discord/     # Discord bot
│       ├── slack/       # Slack workspace
│       ├── whatsapp/    # WhatsApp Business API
│       ├── zalo/        # Zalo Official Account
│       └── msteams/     # Microsoft Teams
├── xclaw-plugins/       # [submodule] Official plugins
├── xclaw-demo-integration-app/  # [submodule] HIS-Mini demo
├── data/
│   ├── dev-docs/        # Developer documentation knowledge base
│   └── knowledge-packs/ # Data-only plugin packages
├── docs/                # Documentation site (Fumadocs + Next.js)
├── deploy/              # Deployment configs
├── tests/               # Integration tests
├── scripts/             # Build & utility scripts
├── docker-compose.yml
├── Dockerfile
└── package.json
```

### 建置順序（項目參考）

套件有一個清晰的依賴鏈，透過 TypeScript 專案引用進行管理：

```
shared → db → core → integrations → domains → ml → skills → skill-hub → gateway → server
```

第一次建構時：

```bash
npm install
npm run build
```

### Git 子模組

xClaw 使用 2 個 git 子模組：

|子模組 |目錄 |說明 |
|------------|---------|--------|
| `xclaw-plugins` | `xclaw-plugins/` |官方插件包（TeeForge.AI、Healthcare）|
| `xclaw-demo-integration-app` | `xclaw-demo-integration-app/` | HIS-Mini 演示—醫院資訊系統|

```bash
# Nếu đã clone mà chưa có submodules
git submodule update --init --recursive

# Cập nhật submodules lên latest
git submodule update --remote --merge
```

---

## 5. Multi-LLM — 連接多個 AI 模型

### 5.1。支援提供者

xClaw支援10個LLM供應商，讓模型之間靈活切換：

|供應商|環境變數|筆記|
|----------|-----------------|---------|
| **開放人工智慧** | `OPENAI_API_KEY` | GPT-4o、GPT-4、GPT-3.5 |
| **人為** | `ANTHROPIC_API_KEY` |克勞德 3.5 十四行詩，克勞德 3 作品 |
| **Google** | `GOOGLE_API_KEY` | Gemini Pro、Gemini Flash |
| **格羅克** | `GROQ_API_KEY` | Llama，Mixtral（超快輸入）|
| **米斯特拉爾** | `MISTRAL_API_KEY` |米斯特拉爾大號、中號 |
| **深度搜尋** | `DEEPSEEK_API_KEY` | DeepSeek V3，編碼器 |
| **xAI** | `XAI_API_KEY` |格洛克|
| **開放路由器** | `OPENROUTER_API_KEY` | 100 多個模型的入口網站 |
| **困惑** | `PERPLEXITY_API_KEY` |搜尋增強法學碩士|
| **奧拉馬** | `OLLAMA_BASE_URL` |本地模型（免費）|

### 5.2。透過API轉換模型

```bash
# Xem danh sách models khả dụng
curl -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/models

# Chuyển sang model khác
curl -X PUT -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"provider": "anthropic", "model": "claude-3-5-sonnet-20241022"}' \
  http://localhost:3000/api/models/active

# Pull model Ollama mới
curl -X POST -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"model": "qwen2.5:14b"}' \
  http://localhost:3000/api/models/pull
```

### 5.3。與人工智慧聊天

```bash
# Gửi tin nhắn (streaming response)
curl -X POST -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Giải thích kiến trúc microservices",
    "sessionId": "optional-session-id"
  }' \
  http://localhost:3000/api/chat
```

支援系統：
- **多輪對話**與串流反應
- **域感知提示** — 根據活動域自動調整角色
- **RAG 增強答案** 以及來源引用
- **快速啟動提示** — 總結、解釋、翻譯、程式碼審查、撰寫電子郵件、分析數據

---

## 6. RAG 管道 — 上傳、嵌入、語意搜尋

### 6.1。活動流

xClaw 中的 RAG（檢索增強生成）管道分 3 個步驟工作：

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  1. Upload   │───▶│ 2. Chunking  │───▶│ 3. Embedding │
│  Document    │    │ & Processing │    │ & Indexing   │
└──────────────┘    └──────────────┘    └──────────────┘
                                               │
                                               ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  6. Generate │◀───│ 5. Retrieve  │◀───│ 4. Query     │
│  Response    │    │ Top-K Chunks │    │ Embedding    │
└──────────────┘    └──────────────┘    └──────────────┘
```

### 6.2。上傳文件

```bash
# Upload một file (PDF, DOCX, TXT, MD)
curl -X POST -H "Authorization: Bearer <token>" \
  -F "file=@document.pdf" \
  http://localhost:3000/api/knowledge/upload
```

系統會自動：
1. **解析**文件（支援PDF、DOCX、TXT、Markdown）
2. **將**內容分成小塊（分塊策略）
3. **嵌入**每個區塊到向量中（OpenAI 嵌入或本地模型）
4.**索引**向量來服務語意搜尋

### 6.3。語意搜尋

```bash
# Tìm kiếm semantic trên knowledge base
curl -H "Authorization: Bearer <token>" \
  "http://localhost:3000/api/search?q=cách+triển+khai+microservices"
```

結果傳回相似度最高的前 K 個區塊以及來源引文。

### 6.4。聊天中的 RAG

啟用 RAG 後，聊天中的每個問題都會：
1.嵌入向量查詢中
2. 在知識庫中尋找相關區塊
3. 在傳送至 LLM 之前將上下文注入提示中
4. LLM基於上下文+知識的答案→減少幻覺

---

## 7. 工作流程引擎－視覺化工作流程產生器

### 7.1。概述

工作流程引擎允許使用拖放介面建立自動化管道。支援 **16 種節點類型**：

|節點類型|功能|
|------------|------------|
| `trigger` |手動、排程或 Webhook 啟動 |
| `llm-call` |使用提示範本致電LLM |
| `tool-call` |執行註冊的工具 |
| `condition` |根據條件進行分支 |
| `switch` |案例多向分支|
| `loop` |重複限制最大迭代次數 |
| `merge` |合併多個分支 |
| `transform` |使用 JavaScript 表達式轉換資料 |
| `code` |在沙箱 (vm) 中執行 JavaScript |
| `http-request` |呼叫HTTP外部|
| `sub-workflow` |運行子工作流程 |
| `wait` |延遲/睡眠|
| `notification` |發送通知 |
| `output` |輸出的定義 |
| `memory-read` |從代理記憶體讀取 |
| `memory-write` |寫入代理記憶體 |

### 7.2。透過API建立工作流程

```bash
# Tạo workflow mới
curl -X POST -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Customer Support Auto-Reply",
    "description": "Tự động trả lời email khách hàng",
    "nodes": [
      {
        "id": "trigger-1",
        "type": "trigger",
        "config": { "triggerType": "webhook" }
      },
      {
        "id": "llm-1",
        "type": "llm-call",
        "config": {
          "prompt": "Phân tích email sau và tạo reply chuyên nghiệp:\n\n{{input.email_body}}",
          "model": "gpt-4o"
        }
      },
      {
        "id": "condition-1",
        "type": "condition",
        "config": {
          "expression": "output.sentiment === \"negative\""
        }
      },
      {
        "id": "notification-1",
        "type": "notification",
        "config": {
          "channel": "slack",
          "message": "⚠️ Khách hàng không hài lòng - cần xử lý thủ công"
        }
      },
      {
        "id": "output-1",
        "type": "output",
        "config": {
          "outputKey": "auto_reply"
        }
      }
    ],
    "edges": [
      { "from": "trigger-1", "to": "llm-1" },
      { "from": "llm-1", "to": "condition-1" },
      { "from": "condition-1", "to": "notification-1", "condition": "true" },
      { "from": "condition-1", "to": "output-1", "condition": "false" }
    ]
  }' \
  http://localhost:3000/api/workflows
```

### 7.3。驗證並執行

```bash
# Validate workflow trước khi chạy
curl -X POST -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/workflows/<workflow-id>/validate

# Execute workflow
curl -X POST -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"input": {"email_body": "Tôi muốn hoàn tiền đơn hàng #12345"}}' \
  http://localhost:3000/api/workflows/<workflow-id>/execute

# Xem lịch sử executions
curl -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/workflows/<workflow-id>/executions
```

---

## 8. 多租戶 RBAC — 多組織去中心化

### 8.1。去中心化模式

xClaw 實施完整的 RBAC（基於角色的存取控制）和租戶隔離：

```
┌─────────────────────────────────────────┐
│              Tenant (Tổ chức)            │
├─────────────────────────────────────────┤
│  Owner ──── 60 permissions (toàn quyền) │
│  Admin ──── 52 permissions              │
│  Member ─── 14 permissions              │
│  Viewer ───  8 permissions (chỉ xem)    │
└─────────────────────────────────────────┘
```

### 8.2。 15個權限組

|集團|描述 |
|--------|--------|
| `chat` |傳送訊息、查看歷史記錄 |
| `sessions` |管理聊天會話 |
| `knowledge` |上傳、刪除檔案(RAG)|
| `workflows` |建立、編輯、運行工作流程 |
| `integrations` |連線到外部服務 |
| `domains` |選擇域名包 |
| `settings` |系統配置|
| `users` |管理用戶 |
| `roles` |管理角色與權限 |
| `tenants` |租戶管理|
| `models` |管理LLM模型|
| `ml` |機器學習功能 |
| `agents` |管理代理配置 |
| `webhooks` | Webhook 管理 |
| `mcp` | MCP伺服器管理|

### 8.3。租戶隔離

每個租戶都是獨立的組織：
- **資料隔離** — 租戶之間的資料完全獨立
- **配置隔離** — 每個租用戶都有自己的設定（LLM 提供者、活動域等）
- **使用者管理** — 使用者屬於租用戶，在每個租用戶中擁有自己的角色

### 8.4。 OAuth2 身份驗證

支援 3 個 OAuth2 提供者：

```bash
# Login thường
curl -X POST -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "xxx"}' \
  http://localhost:3000/auth/login

# OAuth2 (Google, GitHub, Discord)
# Redirect user đến:
GET http://localhost:3000/auth/oauth2/google
GET http://localhost:3000/auth/oauth2/github
GET http://localhost:3000/auth/oauth2/discord
```

---

## 9. 領域包 — 13 個專業領域

域包允許人工智慧代理根據每個行業轉換角色和專業知識：

| ＃|域名 |描述 |使用案例|
|---|--------|--------|----------|
| 1 | **一般** |多才多藝的通用助手|問答、總結、翻譯 |
| 2 | **開發商** |程式碼審查、調試、架構 |回顧 PR，解釋程式碼 |
| 3 | **醫療保健** |臨床支援、藥物交互作用、ICD |查找藥物、ICD-10 代碼 |
| 4 | **金融** |財務分析、交易、風險 |財務分析、預測|
| 5 | **行銷** |活動規劃、內容、分析 |制定行銷計畫 |
| 6 | **教育** |輔導、課程、評估 |輔導、課程設計 |
| 7 | **研究** |文獻綜述、方法論 |研究文獻綜述|
| 8 | **開發營運** | CI/CD、基礎設施、監控 |管道諮詢，K8s |
| 9 | **法律** |合約審查、合規 |合約審查|
| 10 | 10 **人力資源** |招募、政策|招募、人力資源政策 |
| 11 | 11 **銷售** |潛在客戶管理、CRM、預測 |潛在客戶管理、收入預測|
| 12 | 12 **電子商務** |產品、庫存、客戶支援 |產品管理、客戶服務|
| 13 | **ML** |模型訓練、評估、部署 |訓練模型，評估指標 |

### 透過API轉移域名

```bash
# Xem danh sách domain packs
curl -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/domains

# Domain pack sẽ tự động điều chỉnh:
# - System prompt phù hợp ngành
# - Bộ tools chuyên biệt
# - Knowledge base riêng (nếu có)
# - Response format tối ưu cho lĩnh vực
```

---

## 10. 聊天頻道－跨平台連接

### 10.1。支援管道

|頻道|方法|所需配置 |
|--------|-------------|---------------------|
| **電報** |機器人投票 |來自 @BotFather 的機器人令牌 |
| **不和諧** |機器人 + 網關 |來自開發者入口網站的機器人令牌 |
| **鬆弛** | Web API + 事件 |機器人令牌 (xoxb-) + 簽章秘密 |
| **WhatsApp** |雲端 API webhook |元商務套件 + 電話號碼 ID |
| **Zalo OA** | OA API v3 網路鉤子 | Developers.zalo.me + 存取權令牌 |
| **微軟團隊** |機器人框架 | Azure AD 應用程式 + 機器人連接器 |
| **網路聊天** |可嵌入的小工具 |路線 `/embed/chat` |
| **網路鉤子** |自訂 HTTP | POST 端點 + 金鑰 |

### 10.2。配置 Telegram 機器人

電報連接範例：

1. 創建一個機器人 [@BotFather](https://t.me/BotFather) 在電報上
2. 取得機器人令牌
3. 添加 `.env`:

```env
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
```

4、重啟服務：

```bash
docker compose restart xclaw
```

機器人將自動連接並準備好接收訊息。

### 10.3。嵌入式網路聊天

在任何網站上嵌入聊天小工具：

```html
<iframe
  src="http://your-xclaw-domain:3001/embed/chat"
  width="400"
  height="600"
  frameborder="0">
</iframe>
```

---

## 11. MCP 協定－模型上下文協定

### 11.1。什麼是MCP？

MCP（模型上下文協議）是一種標準化協議，允許 AI 模型連接和使用外部工具/資源。 xClaw 實作：

- **MCP 伺服器發現** — 自動發現網路中的 MCP 伺服器
- **工具執行** — 從 MCP 伺服器呼叫工具
- **開發文檔知識庫** — MCP 支援的文檔，具有全文搜尋功能

### 11.2。開發文件 MCP 伺服器

套餐 `@xclaw-ai/doc-mcp` 為開發者文件提供MCP伺服器：

- 上傳Markdown格式的文檔
- 知識庫全文檢索
- 網頁管理介面
- 多類別組織（入門、API 參考、指南等）

```bash
# Xem MCP servers đã đăng ký
curl -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/mcp/servers
```

---

## 12. ML/AutoML — 12 種內建 ML 演算法

### 12.1。演算法

套餐 `@xclaw-ai/ml` 內建12種ML演算法：

**回歸：**
- 線性迴歸
- 邏輯迴歸

**樹木：**
- 決策樹
- 隨機森林
- 梯度提升

**基於實例：**
- K 最近鄰 (KNN)
- 支援向量機（SVM）

**機率：**
- 樸素貝葉斯

**聚類：**
- K-均值
- 資料庫掃描

**降維：**
- PCA（主成分分析）

**異常檢測：**
- 隔離森林

### 12.2。透過API使用

```bash
# Liệt kê algorithms khả dụng
curl -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/ml/algorithms
```

---

## 13. 整合 — 11 個服務連接器

xClaw 提供 11 個內建整合來連接到流行的服務：

|集團|服務 |功能|
|--------|---------|------------|
| **電子郵件** |郵箱 |透過 API 傳送/接收電子郵件 |
| **生產力** |Google日曆 |事件與行事曆管理 |
| **生產力** |概念 |資料庫與頁面管理 |
| **開發商** | GitHub |回購、問題、拉取請求 |
| **訊息傳送** |電報 API |訊息機器人 |
| **訊息傳送** |鬆弛 API |頻道與 DM 訊息傳遞 |
| **訊息傳送** |訊息 | Apple iMessage 橋|
| **搜尋** |勇敢尋找|網路搜尋|
| **搜尋** |塔維利搜尋 | AI 優化的網路搜尋 |
| **人工智慧** |擁抱臉 |模型推理與資料集 |
| **人工智慧** |權重與偏差|實驗追蹤|

每個整合都打包在包中 `@xclaw-ai/integrations` 具有標準介面－輕鬆新增連接器。

---

## 14. 監控與可觀察性

### 14.1。系統指標

```bash
# Lấy metrics real-time
curl -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/monitoring/metrics
```

指標包括：
- **正常運作時間** — 正常運作時間
- **記憶體與CPU** — 資源使用情況
- **請求/分鐘** — 吞吐量
- **LLM 呼叫統計** — 呼叫數量、延遲、使用的令牌
- **工作流程統計** — 執行、成功/失敗率

### 14.2。審核日誌

所有使用者操作均透過租戶隔離進行記錄：

```bash
# Xem audit trail
curl -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/monitoring/audit
```

- TTL：90 天（自動清理）
- 儲存在MongoDB中

### 14.3。系統日誌

帶有文字搜尋的結構化應用程式日誌：

```bash
# Tìm kiếm logs
curl -H "Authorization: Bearer <token>" \
  "http://localhost:3000/api/monitoring/logs?search=error&level=error"
```

- TTL：30 天
- 支援按等級、時間戳記、關鍵字過濾

### 14.4。儀表板API

```bash
# Combined dashboard — metrics + errors + audit trail
curl -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/monitoring/dashboard
```

---

## 15. 綜合 API 參考

### 公共端點

```
GET  /health                       # Health check + uptime
POST /auth/login                   # Login → JWT token
POST /auth/register                # Đăng ký user mới
POST /auth/oauth2/:provider        # OAuth2 flow (google, github, discord)
```

### 受保護的端點（必需 `Authorization: Bearer <token>`）

```
# Chat
POST /api/chat                     # Gửi tin nhắn, streaming response

# Knowledge (RAG)
GET  /api/knowledge                # Liệt kê documents
POST /api/knowledge/upload         # Upload document
GET  /api/search                   # Semantic search

# Models
GET  /api/models                   # Danh sách LLM models
POST /api/models/pull              # Pull Ollama model mới
PUT  /api/models/active            # Chuyển active model

# Workflows
GET  /api/workflows                # Liệt kê workflows
POST /api/workflows                # Tạo workflow
POST /api/workflows/:id/validate   # Validate workflow
POST /api/workflows/:id/execute    # Execute workflow
GET  /api/workflows/:id/executions # Lịch sử executions

# Monitoring
GET  /api/monitoring/metrics       # System metrics
GET  /api/monitoring/audit         # Audit logs
GET  /api/monitoring/logs          # System logs
GET  /api/monitoring/dashboard     # Combined dashboard

# Admin & RBAC
GET  /api/rbac/roles               # Roles & permissions
GET  /api/tenants                  # Tenants
GET  /api/settings                 # System settings
GET  /api/integrations             # Integrations
GET  /api/domains                  # Domain packs
GET  /api/ml/algorithms            # ML algorithms
GET  /api/mcp/servers              # MCP servers
```

---

## 16. 發展－本地發展

### 16.1。使用 Docker 運行（建議）

```bash
# Build & start tất cả services
docker compose up --build

# Chỉ rebuild backend
docker compose up --build xclaw

# Xem logs
docker compose logs -f xclaw

# Dừng tất cả
docker compose down
```

### 16.2。無需 Docker 即可運行

需求：Node.js ≥ 20，npm ≥ 10，PostgreSQL、MongoDB、Redis 已執行。

```bash
# 1. Install dependencies
npm install

# 2. Cấu hình
cp .env.example .env
# Sửa .env với database URLs và API keys

# 3. Build packages (lần đầu)
npm run build

# 4. Chạy database migrations
npm run db:migrate

# 5. Start dev servers
npm run dev              # API server + web frontend (concurrent)

# Hoặc chạy từng phần:
npm run dev:server       # API server (tsx --watch, hot reload)
npm run dev:web          # Vite dev server (HMR)
npm run dev:docs         # Documentation site (Next.js)
```

### 16.3。有用的命令

```bash
# Database
npm run db:generate      # Generate Drizzle migration từ schema changes
npm run db:migrate       # Chạy pending migrations
npm run db:studio        # Mở Drizzle Studio (visual DB browser)

# Quality
npm run test             # Chạy tests (vitest)
npm run lint             # Lint tất cả packages

# CLI
npm run cli -- <command> # Chạy xClaw CLI
```

---

## 17. 使用 Docker 部署生產環境

### 17.1。 Docker 多階段建置

xClaw 使用多階段 Dockerfile 來最佳化映像大小：

```bash
# Build production image
docker build -t xclaw:latest .

# Hoặc dùng docker-compose production
docker compose -f docker-compose.prod.yml up -d
```

### 17.2。部署前的清單

- [ ] 更改 `JWT_SECRET` 轉換為強隨機字串（≥ 32 個字元）
- [ ] 更改預設密碼 `admin@xclaw.io`
- [ ] 配置 `CORS_ORIGINS` 僅允許生產域
- [ ] 設定強資料庫密碼
- [ ] 啟用 HTTPS（反向代理：Nginx、Caddy 或 Cloudflare Tunnel）
- [ ] 設定 PostgreSQL 和 MongoDB 的備份
- [ ] 設定 `NODE_ENV=production`
- [ ] 限制 `CORS_ORIGINS` 僅實際域

### 17.3。反向代理（Nginx）

```nginx
server {
    listen 443 ssl http2;
    server_name xclaw.yourdomain.com;

    ssl_certificate     /etc/ssl/certs/fullchain.pem;
    ssl_certificate_key /etc/ssl/private/privkey.pem;

    # Frontend
    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # API
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Auth
    location /auth/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Health check
    location /health {
        proxy_pass http://localhost:3000;
    }
}
```

---

## 18. 結論

xClaw 是一個全面的人工智慧代理平台，提供：

- **靈活性** — 多法學碩士、多領域、多管道
- **可擴展性** — 插件系統、MCP 協定、defineSkill API
- **安全性** — 多租戶 RBAC、OAuth2、審核日誌記錄
- **生產力** — 視覺化工作流程產生器、RAG 管道、AutoML
- **生產就緒** — Docker 部署、監控、結構化日誌記錄

平台適用於：
- 建立內部業務聊天機器人
- 客戶支援自動化
- 每個行業的人工智慧驅動的工作流程
- 許多法學碩士模型的研究和實驗
- 本地人工智慧部署（Ollama）

**連結：**
- **原始碼：** [github.com/xdev-asia-labs/xClaw](https://github.com/xdev-asia-labs/xClaw)
- **文檔：** [xclaw.xdev.asia/docs](https://xclaw.xdev.asia/docs)
- **許可證：** 麻省理工學院
