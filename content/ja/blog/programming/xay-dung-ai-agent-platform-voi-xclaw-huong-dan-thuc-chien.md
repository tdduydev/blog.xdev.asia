---
id: 019c9618-a1b0-7a01-b001-c1d2e3f4a5b6
title: xClaw を使用した AI エージェント プラットフォームの構築 — A から Z までの実践的なガイド
slug: xay-dung-ai-agent-platform-voi-xclaw-huong-dan-thuc-chien
excerpt: >-
  xClaw を使用して完全な AI エージェント プラットフォームを構築するための詳細な手順 — マルチ LLM、RAG パイプライン、ワークフロー
  エンジン、13 のドメイン パック、マルチテナント RBAC、MCP プロトコル、および 8 つのチャット チャネルをサポートする TypeScript
  モノリポジトリ。デュアルデータベース アーキテクチャから Docker プロダクションのデプロイまで。
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
  name: バックエンド
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
locale: ja
---

## 1. はじめに

**xClaw** は、TypeScript モノリポジトリとして構築されたオープンソース AI エージェント プラットフォームで、複数の業界にサービスを提供する AI エージェントの構築と展開を可能にします。プラットフォームは以下を提供します:

- **ビジュアル ワークフロー ビルダー** (16 種類のノードを含む)
- **RAG Pipeline** ドキュメントのセマンティック検索用
- **マルチLLM** — 10以上のプロバイダーをサポート（OpenAI、Anthropic、Google、Groq、Mistral、DeepSeek、xAI、OpenRouter、Perplexity、Ollama）
- 業界に特化した **13 のドメイン パック**
- **マルチテナント RBAC** 60 個の詳細な権限
- **MCP プロトコル** — モデル コンテキスト プロトコル サーバーの検出
- **8 チャット チャネル** — Telegram、Discord、Slack、WhatsApp、Zalo OA、Microsoft Teams、WebChat、Webhook
- **12 ML/AutoML アルゴリズム** 内蔵

この記事では、システム アーキテクチャからインストール、開発、運用環境への展開方法まで、xClaw の各コア部分について説明します。

**ソースコード:** [https://github.com/xdev-asia-labs/xClaw](https://github.com/xdev-asia-labs/xClaw)

---

## 2. システムアーキテクチャ

＃＃＃２．１．概要

xClaw は **Gateway + Monorepo** アーキテクチャを使用します。これは次のとおりです。

- **Hono** を HTTP サーバー (API ゲートウェイ) として使用
- フロントエンド用 **React 19 + Vite**
- **デュアルデータベース設計** — PostgreSQL + MongoDB
- **Redis** によるキャッシュとレート制限

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

＃＃＃２．２．デュアルデータベース設計

xClaw の最も重要なアーキテクチャ上の決定の 1 つは、データの性質によってデータベースを分離することです。

|データベース |役割 |コレクション/テーブル |
|----------|------|----------|
| **PostgreSQL** |構成と構造化データ |テナント、tenantSettings、ユーザー、ロール、権限、rolePermissions、userRoles、oauthAccounts、ワークフロー、workflowExecutions、integrationConnections、Webhook |
| **MongoDB** | AI と会話データ |セッション、メッセージ、memory_entries、agent_config、audit_logs、system_logs |
| **Redis** |キャッシュ層 |セッション キャッシュ、レート制限、リアルタイム メトリクス |

**デュアルデータベースを使用する理由**

- **PostgreSQL** — リレーショナル データ、ACID トランザクション、スキーマ検証に強い → 構成、ユーザー、RBAC に適しています
- **MongoDB** — 柔軟なスキーマ、ドキュメント ストレージ、時系列データに適しています → チャット メッセージ、AI メモリ、ログに適しています
- **Redis** — インメモリ、ミリ秒未満のレイテンシー → キャッシュ、セッション、レート制限に適しています

＃＃＃２．３．技術スタックの詳細

|レイヤー |テクノロジー |
|------|-----------|
| **ランタイム** | Node.js 20、TypeScript (ES2022、ESM) |
| **API サーバー** |名誉 |
| **フロントエンド** | React 19、Tailwind CSS、Zustand、Vite |
| **PostgreSQL ORM** |霧雨ORM |
| **MongoDB** |公式 Node.js ドライバー |
| **キャッシュ** | Redis 8 |
| **LLM** | OpenAI、Anthropic、DeepSeek、xAI、OpenRouter、Perplexity、Google、Groq、Mistral、Ollama |
| **認証** | JWT、OAuth2 (Google、GitHub、Discord) |
| **ビルド** | Docker マルチステージ、npm ワークスペース |
| **ドキュメント** | Fumadocs + Next.js |

---

## 3. インストールとクイックスタート

＃＃＃３．１．リクエスト

- [Docker](https://docs.docker.com/get-docker/) Docker Compose(&D)
- [Ollama](https://ollama.ai/) (オプション、ローカル LLM の場合)

＃＃＃３．２．クローンと構成

```bash
# Clone repo kèm submodules
git clone --recurse-submodules https://github.com/xdev-asia-labs/xClaw.git
cd xClaw

# Copy file env mẫu
cp .env.example .env
```

ファイルを開く `.env` API キーを設定します。

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

＃＃＃３．３． Docker Compose で起動する

```bash
docker compose up --build
```

Docker Compose は次の 5 つのサービスを開始します。

|サービス |ポート |説明 |
|----------|----------|----------|
| `xclaw` | 3000 | APIサーバー（ほの） |
| `web` | 3001 |フロントエンド (React + Nginx) |
| `postgres` | 5432 | PostgreSQL 18 |
| `mongodb` | 27018 |モンゴDB 7 |
| `redis` | 6379 | Redis 8 |

＃＃＃３．４．サインイン

アクセス [http://localhost:3001](http://localhost:3001) そしてデフォルトのアカウントでログインします。

```
Email:    admin@xclaw.io
Password: password123
```

> ⚠️ **重要:** 運用環境に初めてログインした後は、すぐにパスワードを変更してください。

＃＃＃３．５。 (オプション) ローカル LLM 用に Ollama をインストールする

API キーを使用せずに LLM をローカルで実行する場合は、次のようにします。

```bash
# Cài Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull model
ollama pull qwen2.5:14b

# Hoặc model nhỏ hơn
ollama pull qwen2.5:7b
```

サーバーは Ollama を自動的に検出します `http://localhost:11434`。

---

## 4. モノリポジトリの構造

xClaw は、npm ワークスペースを備えたモノリポジトリとして編成されています。各パッケージには明確な責任があります。

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

### ビルド順序 (プロジェクト参照)

パッケージには明確な依存関係チェーンがあり、TypeScript プロジェクト参照を通じて管理されます。

```
shared → db → core → integrations → domains → ml → skills → skill-hub → gateway → server
```

初めてビルドする場合:

```bash
npm install
npm run build
```

### Git サブモジュール

xClaw は 2 つの git サブモジュールを使用します。

|サブモジュール |ディレクトリ |説明 |
|----------|-----------|----------|
| `xclaw-plugins` | `xclaw-plugins/` |公式プラグイン パッケージ (TeeForge.AI、ヘルスケア) |
| `xclaw-demo-integration-app` | `xclaw-demo-integration-app/` | HIS-Mini デモ — 病院情報システム |

```bash
# Nếu đã clone mà chưa có submodules
git submodule update --init --recursive

# Cập nhật submodules lên latest
git submodule update --remote --merge
```

---

## 5. マルチ LLM — 複数の AI モデルを接続する

＃＃＃５．１．プロバイダーがサポートされています

xClaw は 10 個の LLM プロバイダーをサポートしており、モデル間の柔軟な切り替えが可能です。

|プロバイダー |環境変数 |メモ |
|----------|------|----------|
| **OpenAI** | `OPENAI_API_KEY` | GPT-4o、GPT-4、GPT-3.5 |
| **人類学** | `ANTHROPIC_API_KEY` |クロード 3.5 ソネット、クロード 3 作品 |
| **Google** | `GOOGLE_API_KEY` |ジェミニ プロ、ジェミニ フラッシュ |
| **グロク** | `GROQ_API_KEY` | Llama、Mixtral (超高速入力) |
| **ミストラル** | `MISTRAL_API_KEY` |ミストラル 大、中 |
| **ディープシーク** | `DEEPSEEK_API_KEY` | DeepSeek V3、コーダー |
| **xAI** | `XAI_API_KEY` |グロク |
| **OpenRouter** | `OPENROUTER_API_KEY` | 100 を超えるモデルへのゲートウェイ |
| **困惑** | `PERPLEXITY_API_KEY` |検索拡張 LLM |
| **オラマ** | `OLLAMA_BASE_URL` |ローカルモデル (無料) |

＃＃＃５．２． API経由でモデルを変換

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

＃＃＃５．３． AIとチャットする

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

サポート体制：
- **マルチターン会話** ストリーミング応答付き
- **ドメイン対応プロンプト** — アクティブなドメインに応じてペルソナを自動的に調整します
- **RAG で強化された回答** (出典引用付き)
- **クイック スタート プロンプト** — 要約、説明、翻訳、コード レビュー、電子メールの作成、データの分析

---

## 6. RAG パイプライン — アップロード、埋め込み、セマンティック検索

＃＃＃６．１．アクティビティストリーム

xClaw の RAG (検索拡張生成) パイプラインは 3 つのステップで動作します。

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

＃＃＃６．２．書類のアップロード

```bash
# Upload một file (PDF, DOCX, TXT, MD)
curl -X POST -H "Authorization: Bearer <token>" \
  -F "file=@document.pdf" \
  http://localhost:3000/api/knowledge/upload
```

システムは自動的に次のことを行います。
1. **ドキュメントを解析** (PDF、DOCX、TXT、Markdown をサポート)
2. **コンテンツを小さな部分にチャンク**する (チャンク戦略)
3. 各チャンクをベクターに **埋め込み** (OpenAI 埋め込みまたはローカル モデル)
4. セマンティック検索を提供するための **インデックス** ベクトル

＃＃＃６．３．セマンティック検索

```bash
# Tìm kiếm semantic trên knowledge base
curl -H "Authorization: Bearer <token>" \
  "http://localhost:3000/api/search?q=cách+triển+khai+microservices"
```

結果は、類似性が最も高い上位 K 個のチャンクと出典の引用を返します。

＃＃＃６．４．チャットでの RAG

RAG が有効になっている場合、チャット内の各質問は次のようになります。
1. ベクトルクエリに埋め込む
2. ナレッジベースで関連するチャンクを見つける
3. LLM に送信する前にプロンプトにコンテキストを挿入します。
4. LLM は文脈 + 知識に基づいて回答します → 幻覚を軽減します

---

## 7. ワークフロー エンジン — ビジュアル ワークフロー ビルダー

＃＃＃７．１．概要

ワークフロー エンジンでは、ドラッグ アンド ドロップ インターフェイスを使用して自動化パイプラインを構築できます。 **16 のノード タイプ**をサポート:

|ノードタイプ |機能 |
|----------|----------|
| `trigger` |手動、スケジュール、または Webhook で起動 |
| `llm-call` |プロンプト テンプレートを使用して LLM を呼び出す |
| `tool-call` |登録したツールを実行する |
| `condition` |条件による分岐 |
| `switch` |事例で多方向に分岐 |
| `loop` |最大反復回数を制限して繰り返します。
| `merge` |複数のブランチをマージする |
| `transform` | JavaScript 式を使用してデータを変換する |
| `code` |サンドボックス (vm) で JavaScript を実行する |
| `http-request` | HTTP 外部呼び出し |
| `sub-workflow` |子ワークフローを実行する |
| `wait` |遅延/スリープ |
| `notification` |通知を送信 |
| `output` |出力の定義 |
| `memory-read` |エージェントのメモリから読み取る |
| `memory-write` |エージェント メモリに書き込む |

＃＃＃７．２． API経由でワークフローを作成

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

＃＃＃７．３．検証と実行

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

## 8. マルチテナント RBAC — 複数組織の分散化

### 8.1。分散化モデル

xClaw は、テナント分離を備えた完全な RBAC (ロールベースのアクセス制御) を実装します。

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

### 8.2。 15 権限グループ

|グループ |説明 |
|------|------|
| `chat` |メッセージの送信、履歴の表示 |
| `sessions` |チャットセッションを管理する |
| `knowledge` |ドキュメントのアップロード、削除 (RAG) |
| `workflows` |ワークフローの作成、編集、実行 |
| `integrations` |外部サービスに接続する |
| `domains` |ドメインパックを選択 |
| `settings` |システム構成 |
| `users` |ユーザーの管理 |
| `roles` |役割と権限を管理する |
| `tenants` |テナント管理 |
| `models` | LLM モデルの管理 |
| `ml` |機械学習の機能 |
| `agents` |エージェント構成を管理する |
| `webhooks` | Webhook 管理 |
| `mcp` | MCP サーバー管理 |

### 8.3。テナントの分離

各テナントは独立した組織です。
- **データ分離** — テナント間のデータは完全に分離されます
- **構成の分離** - 各テナントには独自の設定があります (LLM プロバイダー、アクティブ ドメインなど)
- **ユーザー管理** - ユーザーはテナントに属し、各テナントで独自の役割を持ちます。

### 8.4。 OAuth2認証

3 つの OAuth2 プロバイダーをサポートします。

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

## 9. ドメイン パック — 13 の専門分野

ドメイン パックを使用すると、AI エージェントは各業界に応じてペルソナと専門知識を変換できます。

| # |ドメイン |説明 |使用例 |
|---|--------|------|----------|
| 1 | **一般** |多用途な汎用アシスタント | Q&A、要約、翻訳 |
| 2 | **開発者** |コードレビュー、デバッグ、アーキテクチャ | PR をレビューし、コードを説明する |
| 3 | **ヘルスケア** |臨床サポート、薬物相互作用、ICD |薬物、ICD-10 コードを調べる |
| 4 | **財務** |財務分析、トレーディング、リスク |財務分析、予測 |
| 5 | **マーケティング** |キャンペーンの計画、コンテンツ、分析 |マーケティング計画を立てる |
| 6 | **教育** |個別指導、カリキュラム、評価 |個別指導、レッスンデザイン |
| 7 | **研究** |文献レビュー、方法論 |研究文献の概要 |
| 8 | **DevOps** | CI/CD、インフラストラクチャ、モニタリング |パイプラインコンサルティング、K8s |
| 9 | **法的** |契約レビュー、コンプライアンス |契約レビュー |
| 10 | **人事** |採用・方針 |採用・人事方針 |
| 11 | **販売** |リード管理、CRM、予測 |リード管理、収益予測 |
| 12 | **電子商取引** |製品、在庫、カスタマーサポート |製品管理、カスタマーケア |
| 13 | **ML** |モデルのトレーニング、評価、展開 |モデルのトレーニング、メトリクスの評価 |

### API 経由でドメインを移管する

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

## 10. チャット チャネル — クロスプラットフォーム接続

### 10.1。チャンネルがサポートされています

|チャンネル |方法 |必要な構成 |
|----------|---------------|----------|
| **電報** |ボットポーリング | @BotFather からのボット トークン |
| **ディスコード** |ボット + ゲートウェイ |開発者ポータルからのボット トークン |
| **スラック** | Web API + イベント |ボット トークン (xoxb-) + 署名シークレット |
| **WhatsApp** |クラウド API Webhook |メタ ビジネス スイート + 電話番号 ID |
| **ザロ OA** | OA API v3 Webhook |開発者.zalo.me + アクセストークン |
| **Microsoft Teams** |ボットフレームワーク | Azure AD アプリ + ボット コネクタ |
| **ウェブチャット** |埋め込み可能なウィジェット |ルート `/embed/chat` |
| **Webhook** |カスタムHTTP | POST エンドポイント + 秘密キー |

### 10.2。テレグラムボットの構成

電報接続例：

1.次の方法でボットを作成します。 [@BotFather](https://t.me/BotFather) 電報で
2.ボットトークンを取得する
3.追加 `.env`:

```env
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
```

4. サービスを再起動します。

```bash
docker compose restart xclaw
```

ボットは自動的に接続し、メッセージを受信できるようになります。

### 10.3。埋め込み可能なWebチャット

チャット ウィジェットを任意の Web サイトに埋め込みます。

```html
<iframe
  src="http://your-xclaw-domain:3001/embed/chat"
  width="400"
  height="600"
  frameborder="0">
</iframe>
```

---

## 11. MCP プロトコル — モデル コンテキスト プロトコル

### 11.1。 MCPとは何ですか？

MCP (Model Context Protocol) は、AI モデルが外部ツール/リソースに接続して使用できるようにする標準化されたプロトコルです。 xClaw の実装:

- **MCP サーバーの検出** — ネットワーク内の MCP サーバーを自動的に検出します
- **ツールの実行** — MCP サーバーからツールを呼び出します
- **Dev Docs Knowledge Base** — 全文検索機能を備えた MCP を利用したドキュメント

＃＃＃１１．２．開発ドキュメント MCP サーバー

パッケージ `@xclaw-ai/doc-mcp` 開発者ドキュメント用の MCP サーバーを提供します。

- ドキュメントをマークダウン形式でアップロードする
- ナレッジベースの全文検索
- Web管理UI
- 複数カテゴリの構成 (入門、API リファレンス、ガイドなど)

```bash
# Xem MCP servers đã đăng ký
curl -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/mcp/servers
```

---

## 12. ML/AutoML — 12 個の組み込み ML アルゴリズム

### 12.1。アルゴリズム

パッケージ `@xclaw-ai/ml` 12 個の ML アルゴリズムを内蔵:

**回帰:**
- 線形回帰
- ロジスティック回帰

**木:**
- デシジョンツリー
- ランダムフォレスト
- 勾配ブースティング

**インスタンスベース:**
- K 最近傍 (KNN)
- サポート ベクター マシン (SVM)

**確率的:**
- ナイーブ・ベイズ

**クラスタリング:**
- K 平均法
- DBSCAN

**次元削減:**
- PCA (主成分分析)

**異常検出:**
- 孤立の森

＃＃＃１２．２． API経由で利用する

```bash
# Liệt kê algorithms khả dụng
curl -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/ml/algorithms
```

---

## 13. 統合 — 11 のサービス コネクタ

xClaw は、人気のあるサービスに接続するための 11 の組み込み統合を提供します。

|グループ |サービス |機能 |
|----------|-----------|----------|
| **電子メール** | Gメール | API経由でメールを送受信 |
| **生産性** | Googleカレンダー |イベントとカレンダーの管理 |
| **生産性** |概念 |データベースとページの管理 |
| **開発者** |ギットハブ |リポジトリ、問題、プル リクエスト |
| **メッセージ** |テレグラムAPI |メッセージングボット |
| **メッセージ** | Slack API |チャネルと DM メッセージング |
| **メッセージ** | iメッセージ | Apple iMessage ブリッジ |
| **検索** |ブレイブサーチ |ウェブ検索 |
| **検索** |タヴィリー検索 | AI に最適化された Web 検索 |
| **AI** |ハグフェイス |モデル推論とデータセット |
| **AI** |重みとバイアス |実験的な追跡 |

各統合はパッケージにパッケージ化されています `@xclaw-ai/integrations` 標準インターフェイスを備えているため、新しいコネクタを簡単に追加できます。

---

## 14. 監視と可観測性

### 14.1。システムメトリクス

```bash
# Lấy metrics real-time
curl -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/monitoring/metrics
```

メトリクスには次のものが含まれます。
- **稼働時間** — 稼働時間
- **メモリと CPU** — リソース使用量
- **リクエスト/分** — スループット
- **LLM 通話統計** — 通話数、待ち時間、使用されたトークン
- **ワークフロー統計** — 実行数、成功/失敗率

### 14.2。監査ログ

すべてのユーザー アクションは、テナント分離でログに記録されます。

```bash
# Xem audit trail
curl -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/monitoring/audit
```

- TTL: 90 日 (自動クリーンアップ)
- MongoDB に保存

### 14.3。システムログ

テキスト検索による構造化されたアプリケーション ログ:

```bash
# Tìm kiếm logs
curl -H "Authorization: Bearer <token>" \
  "http://localhost:3000/api/monitoring/logs?search=error&level=error"
```

- TTL: 30 日
- レベル、タイムスタンプ、キーワードによるフィルタリングをサポート

### 14.4。ダッシュボードAPI

```bash
# Combined dashboard — metrics + errors + audit trail
curl -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/monitoring/dashboard
```

---

## 15. 包括的な API リファレンス

### パブリックエンドポイント

```
GET  /health                       # Health check + uptime
POST /auth/login                   # Login → JWT token
POST /auth/register                # Đăng ký user mới
POST /auth/oauth2/:provider        # OAuth2 flow (google, github, discord)
```

### 保護されたエンドポイント (必須 `Authorization: Bearer <token>`）

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

## 16. 開発 — 地域開発

### 16.1。 Docker で実行 (推奨)

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

＃＃＃１６．２． Docker なしで実行する

要件: Node.js ≥ 20、npm ≥ 10、PostgreSQL、MongoDB、Redis がすでに実行されている。

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

＃＃＃１６．３。便利なコマンド

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

## 17. Docker を使用して本番環境をデプロイする

### 17.1。 Docker のマルチステージ ビルド

xClaw は、マルチステージ Dockerfile を使用してイメージ サイズを最適化します。

```bash
# Build production image
docker build -t xclaw:latest .

# Hoặc dùng docker-compose production
docker compose -f docker-compose.prod.yml up -d
```

### 17.2。導入前のチェックリスト

- [ ]変更 `JWT_SECRET` 強くランダムな文字列 (32 文字以上) に変換
- [ ] デフォルトのパスワードを変更します `admin@xclaw.io`
- [ ] 設定 `CORS_ORIGINS` 運用ドメインのみが許可されます
- [ ] 強力なデータベースパスワードを設定する
- [ ] HTTPS を有効にする (リバース プロキシ: Nginx、Caddy、または Cloudflare トンネル)
- [ ] PostgreSQL および MongoDB のバックアップを構成する
- [ ] セット `NODE_ENV=production`
- [ ] 制限 `CORS_ORIGINS` 実際のドメインのみ

### 17.3。リバースプロキシ (Nginx)

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

xClaw は、以下を提供する包括的な AI エージェント プラットフォームです。

- **柔軟性** — マルチ LLM、マルチドメイン、マルチチャネル
- **拡張性** — プラグイン システム、MCP プロトコル、defineSkill API
- **セキュリティ** — マルチテナント RBAC、OAuth2、監査ログ
- **生産性** — ビジュアル ワークフロー ビルダー、RAG パイプライン、AutoML
- **運用準備完了** — Docker のデプロイメント、モニタリング、構造化ログ

プラットフォームは次の用途に適しています。
- 社内ビジネスチャットボットを構築する
- カスタマーサポートの自動化
- 各業界向けの AI を活用したワークフロー
- 多くの LLM モデルを使用した研究と実験
- オンプレミス AI 導入 (Ollama)

**リンク:**
- **ソースコード:** [github.com/xdev-asia-labs/xClaw](https://github.com/xdev-asia-labs/xClaw)
- **ドキュメント:** [xclaw.xdev.asia/docs](https://xclaw.xdev.asia/docs)
- **ライセンス:** MIT
