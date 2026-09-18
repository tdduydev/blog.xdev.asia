---
featured_image: null
---

## Giới thiệu

**xClaw** là nền tảng AI Agent mã nguồn mở được xây dựng bằng TypeScript, hỗ trợ kiến trúc Gateway, multi-tenant RBAC, visual Workflow Builder, và tích hợp với hơn 10 kênh chat (Telegram, Discord, Slack, WhatsApp, Zalo, MS Teams...).

## Tính năng chính

- 🤖 **Multi-LLM**: OpenAI, Anthropic, Google, Groq, Mistral, DeepSeek, xAI (Grok), OpenRouter, Perplexity, Ollama
- 🏭 **13 Domain Packs**: General, Developer, Healthcare, Finance, Marketing, Education, Research, DevOps, Legal, HR, Sales, E-commerce, ML
- 🔗 **11 Integrations**: Gmail, Google Calendar, Notion, GitHub, Telegram, Slack, iMessage, Brave Search, Tavily, HuggingFace, W&B
- 🔀 **Workflow Engine**: Visual builder với 16 node types (trigger, LLM call, condition, loop, code, HTTP request...)
- 📚 **RAG Pipeline**: Upload tài liệu, chunking, embedding, semantic search
- 🛡️ **Multi-tenant RBAC**: Tenant isolation, 4 roles (Owner/Admin/Member/Viewer), 60 granular permissions
- 💬 **8 Chat Channels**: Telegram, Discord, Slack, WhatsApp, Zalo OA, MS Teams, WebChat embed, Webhook
- 📊 **Monitoring**: Audit logs, system logs, real-time metrics dashboard

## Tech Stack

| Công nghệ | Mô tả |
|-----------|--------|
| Node.js 20 + TypeScript | Runtime & language |
| Hono | API server (Gateway) |
| React 19 + Vite | Frontend |
| PostgreSQL + Drizzle ORM | Config & structured data |
| MongoDB | AI/chat conversational data |
| Redis | Cache & rate limiting |
| Docker | Deployment |

## Quick Start

### Clone & cấu hình

```bash
git clone --recurse-submodules https://github.com/xdev-asia-labs/xClaw.git
cd xClaw
cp .env.example .env   # điền API keys nếu cần
```

### Khởi động với Docker Compose

```bash
docker compose up --build
```

Mở [http://localhost:3001](http://localhost:3001) và đăng nhập:

```
Email:    admin@xclaw.io
Password: password123
```

### (Tuỳ chọn) Kéo Ollama model

```bash
ollama pull qwen2.5:14b
```

## Kiến trúc

Thiết kế dual-database:

| Database | Mục đích |
|----------|----------|
| PostgreSQL | Config, users, roles, workflows, integrations |
| MongoDB | Sessions, messages, memory, audit logs |
| Redis | Cache, rate limiting |

### Cấu trúc Monorepo

```
xClaw/
├── packages/
│   ├── shared/          # Types nền tảng
│   ├── core/            # Agent engine, LLM, RAG, workflow
│   ├── db/              # Drizzle ORM + MongoDB
│   ├── gateway/         # Hono HTTP server, REST API, auth
│   ├── web/             # React + Tailwind frontend
│   ├── integrations/    # 11 service connectors
│   ├── domains/         # 13 domain packs
│   ├── ml/              # 12 ML/AutoML algorithms
│   ├── cli/             # CLI (commander.js)
│   └── channels/        # Telegram, Discord, Slack, WhatsApp, Zalo, Teams
├── xclaw-plugins/       # [submodule] Official plugins
├── docker-compose.yml
└── Dockerfile
```

## License

MIT © [xDev Asia](https://blog.xdev.asia/)

## Tính năng chính

- 🤖 **Multi-model AI**: Hỗ trợ GPT-4, Claude, Gemini, Llama và nhiều mô hình khác
- 💬 **Quản lý cuộc hội thoại**: Tạo, sửa, xóa và tổ chức các cuộc trò chuyện
- 🎨 **Liquid Glass Design**: Giao diện trong suốt, hiệu ứng kính mờ premium
- 📋 **Markdown rendering**: Hiển thị code blocks, bảng, danh sách với syntax highlighting
- 🔒 **Bảo mật**: API keys được lưu trữ an toàn trong Keychain
- 🌙 **Dark/Light mode**: Tự động theo hệ thống hoặc tuỳ chỉnh

## Yêu cầu hệ thống

| Yêu cầu | Phiên bản |
|----------|-----------|
| macOS | 14.0+ (Sonoma) |
| Xcode | 16.0+ |
| Swift | 5.9+ |

## Cài đặt & Chạy

### Clone repository

```bash
git clone https://github.com/tdduydev/xclaw.git
cd xclaw
```

### Mở trong Xcode

```bash
open xClaw.xcodeproj
```

### Cấu hình API Keys

1. Mở ứng dụng và vào **Settings** (⌘,)
2. Nhập API key cho từng provider (OpenAI, Anthropic, Google...)
3. Chọn model mặc định

### Build & Run

Nhấn `⌘R` trong Xcode hoặc:

```bash
xcodebuild -scheme xClaw -configuration Debug build
```

## Kiến trúc

```
xClaw/
├── App/              # Entry point, App lifecycle
├── Views/            # SwiftUI views
│   ├── Chat/         # Chat interface
│   ├── Settings/     # Settings panel
│   └── Sidebar/      # Conversation sidebar
├── ViewModels/       # MVVM view models
├── Models/           # Data models
├── Services/         # AI provider services
│   ├── OpenAI/
│   ├── Anthropic/
│   └── Google/
├── Storage/          # Core Data persistence
└── Utils/            # Utilities & extensions
```

## Đóng góp

Mọi đóng góp đều được chào đón! Hãy tạo Pull Request hoặc mở Issue trên GitHub.

## License

MIT License — xem file [LICENSE](https://github.com/tdduydev/xclaw/blob/main/LICENSE) để biết thêm chi tiết.
