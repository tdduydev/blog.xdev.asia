---
id: 019e4a33-d429-7b20-c001-b1c2d3e4f529
title: 第29課：個案研究－電子商務平台實際實施
slug: bai-29-case-study-e-commerce-platform-trien-khai-thuc-te
description: 將所有知識應用於真實的電子商務案例研究。架構決策記錄。來自 DDD 的服務設計。微前端分解。基礎設施設置。部署管道。監控儀表板。吸取的教訓。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 29
section_title: 第 10 部分：案例研究和遷移指南
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: 微服務與微前端系統設計－從基礎到生產
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-1992" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-1992)"/>

  <!-- Decorations -->
  <g>
    <circle cx="661" cy="233" r="14" fill="#34d399" opacity="0.08"/>
    <circle cx="722" cy="214" r="17" fill="#34d399" opacity="0.11"/>
    <circle cx="783" cy="195" r="20" fill="#34d399" opacity="0.14"/>
    <circle cx="844" cy="176" r="23" fill="#34d399" opacity="0.07"/>
    <circle cx="905" cy="157" r="26" fill="#34d399" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <line x1="600" y1="103" x2="1100" y2="183" stroke="#34d399" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="133" x2="1050" y2="203" stroke="#34d399" stroke-width="0.5" opacity="0.08"/>
    <polygon points="935.9089653438086,84 935.9089653438086,122 903,141 870.0910346561914,122 870.0910346561914,84.00000000000001 903,65" fill="none" stroke="#34d399" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#34d399"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#34d399" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#34d399">🏗️ 建築 — 第 29 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 29 課：案例研究 — 電子商務平台</tspan>
      <tspan x="60" dy="42">實際執行</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">微服務與微前端系統設計－從基礎到生產</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 10 部分：案例研究和遷移指南</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 簡介

本文總結了前28篇文章的所有知識，應用於實際的**電子商務平台**。從架構決策→實作→部署→監控。


![E-Commerce Platform — Full-Stack Architecture Case Study](/storage/uploads/2026/04/mfe-ms-diagram-bai29-ecommerce-case-study.webp)

---

## 1. 系統需求

### 1.1 業務需求

```
ShopX E-Commerce Platform:
├── Product catalog: 100K+ products
├── Users: 500K registered, 50K DAU
├── Orders: 5K orders/day, peak 500 orders/hour
├── Teams: 5 feature teams + 1 platform team
├── SLA: 99.9% uptime, p95 < 500ms
└── Growth: 3x yearly
```

### 1.2 架構決策記錄（ADR）

```
ADR-001: Microservices Architecture
- Status: Accepted
- Context: Monolith đã quá lớn (500K LOC), 5 teams conflict
- Decision: Decompose thành Microservices theo DDD
- Consequences: Distributed complexity, cần invest vào infra

ADR-002: Micro Frontend with Module Federation
- Status: Accepted
- Context: Frontend monolith (React, 300+ components)
- Decision: Module Federation, 1 MFE per team
- Consequences: Shared UI library cần, performance budget enforce

ADR-003: Event-Driven Architecture (Kafka)
- Status: Accepted
- Context: Cần loose coupling, event replay, audit trail
- Decision: Apache Kafka cho domain events
- Consequences: Eventual consistency, team cần learn async patterns
```

---

## 2. 服務設計（基於DDD）

```
Bounded Contexts → Services:

┌─────────────────────────────────────────────────┐
│ Core Domain                                     │
│ ├── Product Service (Catalog, Search, Review)   │
│ │   DB: PostgreSQL + Elasticsearch              │
│ │   Team: Product Team (4 devs)                │
│ │                                               │
│ └── Order Service (Checkout, Tracking, History) │
│     DB: PostgreSQL (Event Sourcing)             │
│     Team: Order Team (4 devs)                  │
├─────────────────────────────────────────────────┤
│ Supporting Domain                               │
│ ├── User Service (Auth, Profile, Address)       │
│ │   DB: PostgreSQL                              │
│ ├── Cart Service (Cart, Wishlist)               │
│ │   DB: Redis                                   │
│ ├── Inventory Service (Stock, Warehouse)        │
│ │   DB: PostgreSQL                              │
│ └── Notification Service (Email, Push, SMS)     │
│     DB: PostgreSQL                              │
├─────────────────────────────────────────────────┤
│ Generic Domain                                  │
│ ├── Payment Service → Stripe/VNPay integration  │
│ └── Auth → Keycloak (off-the-shelf)            │
└─────────────────────────────────────────────────┘
```

---

## 3.微前端分解

```
Shell App (Platform Team):
├── Global Header, Footer, Sidebar
├── Routing orchestration
├── Auth integration (Keycloak)
└── Design System (@shopx/ui)

Product MFE (Product Team):
├── Product List / Grid
├── Product Detail
├── Search & Filters
├── Reviews
└── Route: /products/*

Cart MFE (Cart Team):
├── Cart Page
├── Mini Cart (header widget)
├── Wishlist
└── Route: /cart/*, globally: MiniCart component

Order MFE (Order Team):
├── Checkout flow
├── Order History
├── Order Tracking
└── Route: /orders/*, /checkout/*

Account MFE (User Team):
├── Profile, Addresses
├── Payment Methods
├── Preferences
└── Route: /account/*
```

---

## 4.基礎架構架構

```
AWS Architecture:

┌─────────────────────────────────────────────┐
│ CloudFront CDN                              │
│ (MFE static assets, caching)               │
├─────────────────────────────────────────────┤
│ ALB (Application Load Balancer)             │
├─────────────────────────────────────────────┤
│ EKS Cluster (Kubernetes)                    │
│                                             │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│ │ Kong    │ │ Web BFF │ │ Services│       │
│ │ Gateway │→│ (Node)  │→│ (pods)  │       │
│ └─────────┘ └─────────┘ └─────────┘       │
│                                             │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│ │ Kafka   │ │ Redis    │ │ OTEL    │       │
│ │ (MSK)   │ │(Elasti-  │ │Collector│       │
│ │         │ │ Cache)   │ │         │       │
│ └─────────┘ └─────────┘ └─────────┘       │
├─────────────────────────────────────────────┤
│ RDS PostgreSQL (Multi-AZ)                  │
│ ElastiCache Redis                          │
│ Amazon MSK (Kafka)                         │
│ Amazon Elasticsearch                       │
└─────────────────────────────────────────────┘
```

---

## 5. 關鍵技術決策

|決定|選擇|理由|
|----------|--------|------------|
|前端框架 | React + 模組聯盟 |團隊專業知識、MFE 支援 |
|後端執行時期 | Node.js（Fastify）|與 FE 相同的語言，快速 I/O |
| API風格| GraphQL (BFF) + gRPC（內部）|靈活查詢+快速內部 |
|資料庫| PostgreSQL + Redis + ES |多語言、經過驗證、可擴充 |
|訊息代理|阿帕契卡夫卡 |事件溯源、重播、持久性 |
|授權 |鑰匙斗篷|開源、OIDC、RBAC |
|持續整合/持續交付 | GitHub 作業 + ArgoCD | GitOps、K8s 原生 |
|監控| Grafana + Prometheus + Loki + Tempo |完整的可觀測性堆疊 |
|部署| Canary（Argo 推出）|漸進式自動分析 |

---

## 6. 經驗教訓

```
1. Start with 3-4 services, not 15
   → Quá nhiều services ban đầu = quá nhiều complexity

2. Design System trước khi build MFE
   → UX inconsistency rất khó fix sau

3. Contract Testing saves production
   → Đầu tư vào Pact sớm, ROI rất cao

4. Observability từ Day 1
   → Không phải "thêm sau được" — cần tracing từ đầu

5. Feature Flags cho mọi feature mới
   → Decouple deploy from release

6. Event Sourcing chỉ cho Order Service
   → CQRS cho Product (search), CRUD cho User/Cart
   → Đừng over-engineer

7. Mono-repo (Turborepo) cho giai đoạn đầu
   → Cross-cutting changes dễ, shared code seamless
   → Evaluate multi-repo khi team > 50
```

---

## 總結

此案例研究表明，當將正確的模式應用於正確的用例時，架構可以是**實用**和**生產就緒**。並非每個服務都需要事件溯源，並非每個前端都需要微前端。

---

**下一篇文章：** [第 30 課：遷移指南 — 從整體架構到微服務 + 微前端](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-30-migration-guide-tu-monolith-den-microservices-micro-frontend)
