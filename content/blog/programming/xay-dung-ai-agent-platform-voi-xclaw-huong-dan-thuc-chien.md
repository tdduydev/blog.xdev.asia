---
id: 019c9618-a1b0-7a01-b001-c1d2e3f4a5b6
title: "Xây dựng AI Agent Platform với xClaw — Hướng dẫn thực chiến từ A đến Z"
slug: xay-dung-ai-agent-platform-voi-xclaw-huong-dan-thuc-chien
excerpt: >-
  Hướng dẫn chi tiết xây dựng AI Agent Platform hoàn chỉnh với xClaw — monorepo
  TypeScript hỗ trợ Multi-LLM, RAG Pipeline, Workflow Engine, 13 Domain Packs,
  Multi-tenant RBAC, MCP Protocol và 8 Chat Channels. Từ kiến trúc Dual-Database
  đến deploy Docker production.
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
  name: Backend
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
---

## 1. Giới thiệu

**xClaw** là một open-source AI Agent Platform được xây dựng dưới dạng TypeScript monorepo, cho phép xây dựng và triển khai AI agents phục vụ đa ngành nghề. Platform cung cấp:

- **Visual Workflow Builder** với 16 loại node
- **RAG Pipeline** cho semantic search trên documents
- **Multi-LLM** — hỗ trợ 10+ providers (OpenAI, Anthropic, Google, Groq, Mistral, DeepSeek, xAI, OpenRouter, Perplexity, Ollama)
- **13 Domain Packs** chuyên biệt theo ngành
- **Multi-tenant RBAC** với 60 permissions chi tiết
- **MCP Protocol** — Model Context Protocol server discovery
- **8 Chat Channels** — Telegram, Discord, Slack, WhatsApp, Zalo OA, Microsoft Teams, WebChat, Webhook
- **12 ML/AutoML algorithms** tích hợp sẵn

Bài viết này sẽ đi qua từng phần cốt lõi của xClaw, từ kiến trúc hệ thống đến cách cài đặt, phát triển và deploy lên production.

**Source code:** [https://github.com/xdev-asia-labs/xClaw](https://github.com/xdev-asia-labs/xClaw)

---

## 2. Kiến trúc hệ thống

### 2.1. Tổng quan

xClaw sử dụng kiến trúc **Gateway + Monorepo**, trong đó:

- **Hono** làm HTTP server (API Gateway)
- **React 19 + Vite** cho frontend
- **Dual-Database Design** — PostgreSQL + MongoDB
- **Redis** cho caching và rate limiting

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

### 2.2. Dual-Database Design

Một trong những quyết định kiến trúc quan trọng nhất của xClaw là tách database theo tính chất dữ liệu:

| Database | Vai trò | Collections/Tables |
|----------|---------|-------------------|
| **PostgreSQL** | Config & structured data | tenants, tenantSettings, users, roles, permissions, rolePermissions, userRoles, oauthAccounts, workflows, workflowExecutions, integrationConnections, webhooks |
| **MongoDB** | AI & conversational data | sessions, messages, memory_entries, agent_configs, audit_logs, system_logs |
| **Redis** | Cache layer | Session cache, rate limiting, real-time metrics |

**Tại sao Dual-Database?**

- **PostgreSQL** — mạnh về relational data, ACID transactions, schema validation → phù hợp cho config, users, RBAC
- **MongoDB** — flexible schema, tốt cho document storage, time-series data → phù hợp cho chat messages, AI memory, logs
- **Redis** — in-memory, sub-millisecond latency → phù hợp cho caching, session, rate limiting

### 2.3. Tech Stack chi tiết

| Layer | Công nghệ |
|-------|-----------|
| **Runtime** | Node.js 20, TypeScript (ES2022, ESM) |
| **API Server** | Hono |
| **Frontend** | React 19, Tailwind CSS, Zustand, Vite |
| **PostgreSQL ORM** | Drizzle ORM |
| **MongoDB** | Official Node.js Driver |
| **Cache** | Redis 8 |
| **LLM** | OpenAI, Anthropic, DeepSeek, xAI, OpenRouter, Perplexity, Google, Groq, Mistral, Ollama |
| **Auth** | JWT, OAuth2 (Google, GitHub, Discord) |
| **Build** | Docker multi-stage, npm workspaces |
| **Docs** | Fumadocs + Next.js |

---

## 3. Cài đặt & Quick Start

### 3.1. Yêu cầu

- [Docker](https://docs.docker.com/get-docker/) & Docker Compose
- [Ollama](https://ollama.ai/) (tuỳ chọn, cho local LLM)

### 3.2. Clone & cấu hình

```bash
# Clone repo kèm submodules
git clone --recurse-submodules https://github.com/xdev-asia-labs/xClaw.git
cd xClaw

# Copy file env mẫu
cp .env.example .env
```

Mở file `.env` và cấu hình các API keys:

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

### 3.3. Khởi chạy với Docker Compose

```bash
docker compose up --build
```

Docker Compose sẽ khởi chạy 5 services:

| Service | Port | Mô tả |
|---------|------|-------|
| `xclaw` | 3000 | API server (Hono) |
| `web` | 3001 | Frontend (React + Nginx) |
| `postgres` | 5432 | PostgreSQL 18 |
| `mongodb` | 27018 | MongoDB 7 |
| `redis` | 6379 | Redis 8 |

### 3.4. Đăng nhập

Truy cập [http://localhost:3001](http://localhost:3001) và đăng nhập với tài khoản mặc định:

```
Email:    admin@xclaw.io
Password: password123
```

> ⚠️ **Quan trọng:** Đổi mật khẩu ngay sau khi đăng nhập lần đầu trong môi trường production.

### 3.5. (Tuỳ chọn) Cài Ollama cho Local LLM

Nếu muốn chạy LLM local mà không cần API key:

```bash
# Cài Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull model
ollama pull qwen2.5:14b

# Hoặc model nhỏ hơn
ollama pull qwen2.5:7b
```

Server sẽ tự động phát hiện Ollama tại `http://localhost:11434`.

---

## 4. Cấu trúc Monorepo

xClaw được tổ chức dưới dạng monorepo với npm workspaces. Mỗi package đảm nhận một trách nhiệm rõ ràng:

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

### Build Order (Project References)

Các packages có dependency chain rõ ràng, được quản lý qua TypeScript project references:

```
shared → db → core → integrations → domains → ml → skills → skill-hub → gateway → server
```

Khi build lần đầu:

```bash
npm install
npm run build
```

### Git Submodules

xClaw sử dụng 2 git submodules:

| Submodule | Thư mục | Mô tả |
|-----------|---------|-------|
| `xclaw-plugins` | `xclaw-plugins/` | Official plugin packages (TeeForge.AI, Healthcare) |
| `xclaw-demo-integration-app` | `xclaw-demo-integration-app/` | HIS-Mini demo — Hospital Information System |

```bash
# Nếu đã clone mà chưa có submodules
git submodule update --init --recursive

# Cập nhật submodules lên latest
git submodule update --remote --merge
```

---

## 5. Multi-LLM — Kết nối nhiều AI Models

### 5.1. Providers được hỗ trợ

xClaw hỗ trợ 10 LLM providers, cho phép chuyển đổi linh hoạt giữa các model:

| Provider | Biến môi trường | Ghi chú |
|----------|-----------------|---------|
| **OpenAI** | `OPENAI_API_KEY` | GPT-4o, GPT-4, GPT-3.5 |
| **Anthropic** | `ANTHROPIC_API_KEY` | Claude 3.5 Sonnet, Claude 3 Opus |
| **Google** | `GOOGLE_API_KEY` | Gemini Pro, Gemini Flash |
| **Groq** | `GROQ_API_KEY` | Llama, Mixtral (inference cực nhanh) |
| **Mistral** | `MISTRAL_API_KEY` | Mistral Large, Medium |
| **DeepSeek** | `DEEPSEEK_API_KEY` | DeepSeek V3, Coder |
| **xAI** | `XAI_API_KEY` | Grok |
| **OpenRouter** | `OPENROUTER_API_KEY` | Gateway đến 100+ models |
| **Perplexity** | `PERPLEXITY_API_KEY` | Search-augmented LLM |
| **Ollama** | `OLLAMA_BASE_URL` | Local models (miễn phí) |

### 5.2. Chuyển đổi Model qua API

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

### 5.3. Chat với AI

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

Hệ thống hỗ trợ:
- **Multi-turn conversations** với streaming responses
- **Domain-aware prompting** — tự động điều chỉnh persona theo domain đang active
- **RAG-enhanced answers** với source citations
- **Quick Start prompts** — Summarize, Explain, Translate, Code Review, Write Email, Analyze Data

---

## 6. RAG Pipeline — Upload, Embedding, Semantic Search

### 6.1. Luồng hoạt động

RAG (Retrieval-Augmented Generation) pipeline trong xClaw hoạt động theo 3 bước:

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

### 6.2. Upload Document

```bash
# Upload một file (PDF, DOCX, TXT, MD)
curl -X POST -H "Authorization: Bearer <token>" \
  -F "file=@document.pdf" \
  http://localhost:3000/api/knowledge/upload
```

Hệ thống sẽ tự động:
1. **Parse** document (hỗ trợ PDF, DOCX, TXT, Markdown)
2. **Chunk** nội dung thành các đoạn nhỏ (chunking strategies)
3. **Embed** mỗi chunk thành vector (OpenAI embeddings hoặc local model)
4. **Index** vectors để phục vụ semantic search

### 6.3. Semantic Search

```bash
# Tìm kiếm semantic trên knowledge base
curl -H "Authorization: Bearer <token>" \
  "http://localhost:3000/api/search?q=cách+triển+khai+microservices"
```

Kết quả trả về top-K chunks có độ tương đồng cao nhất, kèm source citations.

### 6.4. RAG trong Chat

Khi RAG được bật, mỗi câu hỏi trong chat sẽ:
1. Được embed thành vector query
2. Tìm các chunks liên quan trong knowledge base
3. Inject context vào prompt trước khi gửi đến LLM
4. LLM trả lời dựa trên context + knowledge → giảm hallucination

---

## 7. Workflow Engine — Visual Workflow Builder

### 7.1. Tổng quan

Workflow Engine cho phép xây dựng các pipeline tự động hóa bằng giao diện kéo-thả (drag-and-drop). Hỗ trợ **16 loại node**:

| Node Type | Chức năng |
|-----------|-----------|
| `trigger` | Khởi chạy thủ công, theo lịch, hoặc webhook |
| `llm-call` | Gọi LLM với prompt template |
| `tool-call` | Thực thi tool đã đăng ký |
| `condition` | Rẽ nhánh dựa trên điều kiện |
| `switch` | Rẽ nhánh nhiều hướng với cases |
| `loop` | Lặp lại với giới hạn max iterations |
| `merge` | Gộp nhiều nhánh |
| `transform` | Biến đổi dữ liệu bằng JavaScript expressions |
| `code` | Thực thi JavaScript trong sandbox (vm) |
| `http-request` | Gọi HTTP external |
| `sub-workflow` | Chạy workflow con |
| `wait` | Delay / sleep |
| `notification` | Gửi thông báo |
| `output` | Định nghĩa output |
| `memory-read` | Đọc từ agent memory |
| `memory-write` | Ghi vào agent memory |

### 7.2. Tạo Workflow qua API

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

### 7.3. Validate & Execute

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

## 8. Multi-tenant RBAC — Phân quyền đa tổ chức

### 8.1. Mô hình phân quyền

xClaw triển khai RBAC (Role-Based Access Control) đầy đủ với tenant isolation:

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

### 8.2. 15 nhóm Permission

| Nhóm | Mô tả |
|------|-------|
| `chat` | Gửi tin nhắn, xem lịch sử |
| `sessions` | Quản lý phiên chat |
| `knowledge` | Upload, xoá documents (RAG) |
| `workflows` | Tạo, sửa, chạy workflows |
| `integrations` | Kết nối services bên ngoài |
| `domains` | Chọn domain pack |
| `settings` | Cấu hình hệ thống |
| `users` | Quản lý users |
| `roles` | Quản lý roles & permissions |
| `tenants` | Quản lý tenants |
| `models` | Quản lý LLM models |
| `ml` | Machine Learning features |
| `agents` | Quản lý agent configs |
| `webhooks` | Webhook management |
| `mcp` | MCP server management |

### 8.3. Tenant Isolation

Mỗi tenant là một tổ chức độc lập:
- **Data isolation** — dữ liệu giữa các tenants hoàn toàn tách biệt
- **Config isolation** — mỗi tenant có settings riêng (LLM provider, active domain, etc.)
- **User management** — users thuộc về tenant, có role riêng trong từng tenant

### 8.4. OAuth2 Authentication

Hỗ trợ 3 OAuth2 providers:

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

## 9. Domain Packs — 13 lĩnh vực chuyên biệt

Domain Packs cho phép AI agent chuyển đổi persona và chuyên môn theo từng ngành:

| # | Domain | Mô tả | Use Case |
|---|--------|-------|----------|
| 1 | **General** | Versatile general-purpose assistant | Q&A, tóm tắt, dịch thuật |
| 2 | **Developer** | Code review, debugging, architecture | Review PR, giải thích code |
| 3 | **Healthcare** | Clinical support, drug interactions, ICD | Tra cứu thuốc, mã ICD-10 |
| 4 | **Finance** | Financial analysis, trading, risk | Phân tích tài chính, dự báo |
| 5 | **Marketing** | Campaign planning, content, analytics | Lên kế hoạch marketing |
| 6 | **Education** | Tutoring, curriculum, assessment | Gia sư, thiết kế bài giảng |
| 7 | **Research** | Literature review, methodology | Tổng quan tài liệu nghiên cứu |
| 8 | **DevOps** | CI/CD, infrastructure, monitoring | Tư vấn pipeline, K8s |
| 9 | **Legal** | Contract review, compliance | Rà soát hợp đồng |
| 10 | **HR** | Recruitment, policies | Tuyển dụng, chính sách HR |
| 11 | **Sales** | Lead management, CRM, forecasting | Quản lý leads, dự báo doanh thu |
| 12 | **E-commerce** | Product, inventory, customer support | Quản lý sản phẩm, CSKH |
| 13 | **ML** | Model training, evaluation, deployment | Train model, đánh giá metrics |

### Chuyển Domain qua API

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

## 10. Chat Channels — Kết nối đa nền tảng

### 10.1. Channels được hỗ trợ

| Channel | Phương thức | Cấu hình cần thiết |
|---------|-------------|---------------------|
| **Telegram** | Bot polling | Bot token từ @BotFather |
| **Discord** | Bot + Gateway | Bot token từ Developer Portal |
| **Slack** | Web API + Events | Bot token (xoxb-) + Signing Secret |
| **WhatsApp** | Cloud API webhook | Meta Business Suite + Phone Number ID |
| **Zalo OA** | OA API v3 webhook | developers.zalo.me + Access Token |
| **Microsoft Teams** | Bot Framework | Azure AD App + Bot Connector |
| **WebChat** | Embeddable widget | Route `/embed/chat` |
| **Webhook** | Custom HTTP | POST endpoint + secret key |

### 10.2. Cấu hình Telegram Bot

Ví dụ kết nối Telegram:

1. Tạo bot qua [@BotFather](https://t.me/BotFather) trên Telegram
2. Lấy bot token
3. Thêm vào `.env`:

```env
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
```

4. Restart service:

```bash
docker compose restart xclaw
```

Bot sẽ tự động kết nối và sẵn sàng nhận tin nhắn.

### 10.3. Embeddable WebChat

Nhúng chat widget vào website bất kỳ:

```html
<iframe
  src="http://your-xclaw-domain:3001/embed/chat"
  width="400"
  height="600"
  frameborder="0">
</iframe>
```

---

## 11. MCP Protocol — Model Context Protocol

### 11.1. MCP là gì?

MCP (Model Context Protocol) là một giao thức chuẩn hóa cho phép AI models kết nối và sử dụng tools/resources bên ngoài. xClaw triển khai:

- **MCP Server Discovery** — tự động phát hiện MCP servers trong mạng
- **Tool Execution** — gọi tools từ MCP servers
- **Dev Docs Knowledge Base** — MCP-powered documentation với full-text search

### 11.2. Dev Docs MCP Server

Package `@xclaw-ai/doc-mcp` cung cấp MCP server cho developer documentation:

- Upload documentation dạng Markdown
- Full-text search trên knowledge base
- Web management UI
- Multi-category organization (Getting Started, API Reference, Guides, etc.)

```bash
# Xem MCP servers đã đăng ký
curl -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/mcp/servers
```

---

## 12. ML/AutoML — 12 thuật toán ML tích hợp

### 12.1. Algorithms

Package `@xclaw-ai/ml` tích hợp sẵn 12 thuật toán ML:

**Regression:**
- Linear Regression
- Logistic Regression

**Trees:**
- Decision Tree
- Random Forest
- Gradient Boosting

**Instance-based:**
- K-Nearest Neighbors (KNN)
- Support Vector Machine (SVM)

**Probabilistic:**
- Naive Bayes

**Clustering:**
- K-Means
- DBSCAN

**Dimensionality Reduction:**
- PCA (Principal Component Analysis)

**Anomaly Detection:**
- Isolation Forest

### 12.2. Sử dụng qua API

```bash
# Liệt kê algorithms khả dụng
curl -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/ml/algorithms
```

---

## 13. Integrations — 11 Service Connectors

xClaw cung cấp sẵn 11 integrations để kết nối với services phổ biến:

| Nhóm | Service | Chức năng |
|------|---------|-----------|
| **Email** | Gmail | Gửi/nhận email qua API |
| **Productivity** | Google Calendar | Quản lý sự kiện, lịch |
| **Productivity** | Notion | Database & page management |
| **Developer** | GitHub | Repos, issues, pull requests |
| **Messaging** | Telegram API | Bot messaging |
| **Messaging** | Slack API | Channel & DM messaging |
| **Messaging** | iMessage | Apple iMessage bridge |
| **Search** | Brave Search | Web search |
| **Search** | Tavily Search | AI-optimized web search |
| **AI** | HuggingFace | Model inference & datasets |
| **AI** | Weights & Biases | Experiment tracking |

Mỗi integration được đóng gói trong package `@xclaw-ai/integrations` với interface chuẩn — dễ dàng thêm connector mới.

---

## 14. Monitoring & Observability

### 14.1. System Metrics

```bash
# Lấy metrics real-time
curl -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/monitoring/metrics
```

Metrics bao gồm:
- **Uptime** — thời gian hoạt động
- **Memory & CPU** — resource usage
- **Requests/minute** — throughput
- **LLM call stats** — số lượng calls, latency, tokens used
- **Workflow stats** — executions, success/failure rate

### 14.2. Audit Logs

Mọi hành động của users đều được log với tenant isolation:

```bash
# Xem audit trail
curl -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/monitoring/audit
```

- TTL: 90 ngày (tự động cleanup)
- Stored in MongoDB

### 14.3. System Logs

Structured application logs với text search:

```bash
# Tìm kiếm logs
curl -H "Authorization: Bearer <token>" \
  "http://localhost:3000/api/monitoring/logs?search=error&level=error"
```

- TTL: 30 ngày
- Hỗ trợ filtering theo level, timestamp, keyword

### 14.4. Dashboard API

```bash
# Combined dashboard — metrics + errors + audit trail
curl -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/monitoring/dashboard
```

---

## 15. API Reference tổng hợp

### Public Endpoints

```
GET  /health                       # Health check + uptime
POST /auth/login                   # Login → JWT token
POST /auth/register                # Đăng ký user mới
POST /auth/oauth2/:provider        # OAuth2 flow (google, github, discord)
```

### Protected Endpoints (cần `Authorization: Bearer <token>`)

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

## 16. Development — Phát triển local

### 16.1. Chạy với Docker (khuyến nghị)

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

### 16.2. Chạy không Docker

Yêu cầu: Node.js ≥ 20, npm ≥ 10, PostgreSQL, MongoDB, Redis đã chạy sẵn.

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

### 16.3. Các lệnh hữu ích

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

## 17. Deploy Production với Docker

### 17.1. Docker multi-stage build

xClaw sử dụng Dockerfile multi-stage để tối ưu image size:

```bash
# Build production image
docker build -t xclaw:latest .

# Hoặc dùng docker-compose production
docker compose -f docker-compose.prod.yml up -d
```

### 17.2. Checklist trước khi deploy

- [ ] Đổi `JWT_SECRET` thành chuỗi ngẫu nhiên mạnh (≥ 32 ký tự)
- [ ] Đổi mật khẩu default `admin@xclaw.io`
- [ ] Cấu hình `CORS_ORIGINS` chỉ cho phép domain production
- [ ] Cấu hình database passwords mạnh
- [ ] Bật HTTPS (reverse proxy: Nginx, Caddy, hoặc Cloudflare Tunnel)
- [ ] Cấu hình backup cho PostgreSQL và MongoDB
- [ ] Set `NODE_ENV=production`
- [ ] Giới hạn `CORS_ORIGINS` chỉ domain thực tế

### 17.3. Reverse Proxy (Nginx)

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

## 18. Kết luận

xClaw là một AI Agent Platform toàn diện, mang đến:

- **Flexibility** — Multi-LLM, multi-domain, multi-channel
- **Extensibility** — Plugin system, MCP Protocol, defineSkill API
- **Security** — Multi-tenant RBAC, OAuth2, audit logging
- **Productivity** — Visual Workflow Builder, RAG Pipeline, AutoML
- **Production-ready** — Docker deployment, monitoring, structured logging

Platform phù hợp cho:
- Xây dựng chatbot nội bộ doanh nghiệp
- Customer support automation
- AI-powered workflow cho từng ngành
- Research & experimentation với nhiều LLM models
- On-premise AI deployment (Ollama)

**Links:**
- **Source code:** [github.com/xdev-asia-labs/xClaw](https://github.com/xdev-asia-labs/xClaw)
- **Documentation:** [xclaw.xdev.asia/docs](https://xclaw.xdev.asia/docs)
- **License:** MIT
