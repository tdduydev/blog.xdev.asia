---
id: 019e4a33-d403-7b20-c001-b1c2d3e4f503
title: 第 3 課：全端概述架構 — 微服務 + 微前端 + BFF
slug: bai-3-kien-truc-tong-quan-full-stack-microservices-micro-frontend-bff
description: 全面的架構藍圖：前端（微前端 Shell + 遠端應用程式）、BFF 層、API 閘道、後端微服務、訊息代理程式、每服務資料庫。端到端請求流和關鍵整合點。
duration_minutes: 75
is_free: true
video_url: null
sort_order: 3
section_title: 第 1 部分：基礎 — 架構的演變
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: 微服務與微前端系統設計－從基礎到生產
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-5994" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-5994)"/>

  <!-- Decorations -->
  <g>
    <circle cx="1055" cy="115" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="1010" cy="230" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="965" cy="85" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="920" cy="200" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="875" cy="55" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <line x1="600" y1="165" x2="1100" y2="245" stroke="#fb923c" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="195" x2="1050" y2="265" stroke="#fb923c" stroke-width="0.5" opacity="0.08"/>
    <polygon points="949.6410161513776,95 949.6410161513776,135 915,155 880.3589838486224,135 880.3589838486224,95.00000000000001 915,75" fill="none" stroke="#fb923c" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fb923c"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fb923c" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ 建築 — 第 3 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 3 課：全端概述架構 —</tspan>
      <tspan x="60" dy="42">微服務+微前端+BFF</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">微服務與微前端系統設計－從基礎到生產</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 1 部分：基礎 — 架構的演變</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 簡介

在了解了架構和 DDD 演進路線圖之後，本文繪製了全端微服務 + 微前端系統的**總體藍圖**——我們將在整個系列中詳細探討該架構圖。


![Full-Stack Architecture Blueprint — Microservices + Micro Frontend](/storage/uploads/2026/04/mfe-ms-diagram-bai3-fullstack-architecture.webp)

---

## 1. 架構概述

### 1.1 全端架構藍圖

```
┌─────────────────────────────────────────────────────┐
│                    CLIENTS                          │
│            (Browser, Mobile, IoT)                   │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────┐
│              CDN (Static Assets)                    │
│         CloudFront / CloudFlare / Vercel            │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────┐
│           MICRO FRONTEND LAYER                      │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────────┐  │
│  │Shell │ │Produc│ │ Cart │ │Order │ │ Account  │  │
│  │ App  │ │ MFE  │ │ MFE  │ │ MFE  │ │   MFE    │  │
│  └──┬───┘ └──┬───┘ └──┬───┘ └──┬───┘ └────┬─────┘  │
└─────┼────────┼────────┼────────┼──────────┼─────────┘
      └────────┴────────┴────────┴──────────┘
                       │
┌──────────────────────┴──────────────────────────────┐
│              BFF LAYER (Optional)                   │
│        Backend for Frontend Aggregation             │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────┐
│              API GATEWAY                            │
│     (Kong / APISIX / Envoy Gateway)                 │
│  Auth │ Rate Limit │ Routing │ Load Balance         │
└──┬────────┬────────────┬────────────┬───────────────┘
   │        │            │            │
┌──┴──┐ ┌───┴───┐  ┌────┴────┐  ┌────┴────┐
│User │ │Product│  │  Cart   │  │  Order  │
│ µS  │ │  µS   │  │   µS    │  │   µS    │
│     │ │       │  │         │  │         │
│┌───┐│ │┌────┐ │  │ ┌─────┐ │  │ ┌─────┐ │
││PG ││ ││PG  │ │  │ │Redis│ │  │ │ PG  │ │
│└───┘│ │└────┘ │  │ └─────┘ │  │ └─────┘ │
└─────┘ └───────┘  └─────────┘  └────┬────┘
                                     │
┌────────────────────────────────────┴────────────────┐
│              MESSAGE BROKER                         │
│         (Kafka / RabbitMQ / NATS)                   │
│    Events: OrderPlaced, PaymentConfirmed, etc.      │
└─────────────────────────────────────────────────────┘
```

---

## 2. 主要層

### 2.1 微前端層

Shell 應用程式（容器）協調遠端微前端應用程式。每個 MFE 都是一個獨立的應用程序，單獨建置和部署。

**Shell 應用程式職責：**
- 整體佈局（頁首、頁尾、側邊欄）
- 路線和導航
- 認證狀態
- 錯誤邊界

### 2.2 BFF 層

前端後端聚合來自許多微服務的數據，將其轉換為適合每個微前端的格式。在以下情況特別有用：
- 前端在一個請求中需要來自多個服務的數據
- 行動裝置與網路需要不同的資料格式
- 前端需要單獨的快取層

### 2.3 API網關

所有 API 呼叫的入口點。處理橫切問題：
- **身份驗證/授權**：驗證 JWT 令牌
- **速率限制**：保護後端免於濫用
- **請求路由**：路由到正確的服務
- **負載平衡**：流量分配
- **SSL 終止**：處理 HTTPS

### 2.4 微服務層

每個微服務都擁有一個限界上下文，擁有自己的資料庫，並獨立部署。透過 REST/gRPC（同步）或 Message Broker（非同步）進行通訊。

### 2.5 訊息代理程式/事件匯流排

服務之間非同步通訊的主幹。確保松耦合和事件驅動的資料流。

---

## 3. 端對端請求流程

```
User clicks "Add to Cart" trên Product MFE:

1. Product MFE → Shell App (event: addToCart)
2. Shell App → API Gateway (POST /api/cart/items)
3. API Gateway → Auth check → Route đến Cart Service
4. Cart Service → Validate product (call Product Service via gRPC)
5. Cart Service → Save to Redis
6. Cart Service → Publish event "ItemAddedToCart" lên Kafka
7. Response → API Gateway → Shell App
8. Shell App → Cart MFE (update cart badge via custom event)
9. Recommendation Service (async) → Listen event → Update recommendations
```

---

## 4. 技術堆疊概述

|層 |技術 |為什麼 |
|--------|------------|-----|
|微前端 | React + 模組聯盟 |成熟的生態系、龐大的社群 |
|外殼應用程式 |反應 + 反應路由器 | SPA路由、延遲載入|
|設計系統| Tailwind CSS + 故事書 |一致的UI、元件庫|
|最好的朋友| Node.js（Fastify）|與前端相同的語言，快速 I/O |
| API閘道| Kong/APISIX |外掛程式生態，高效能|
|微服務| Node.js/Go | Node 用於 CRUD，Go 用於高效能 |
|訊息代理|阿帕契·卡夫卡 |耐用性、可重玩性、高吞吐量 |
|資料庫 | PostgreSQL、Redis、Elasticsearch |多語言持久性 |
|授權 |鑰匙斗篷|開源、完整的 OAuth2/OIDC |
|持續整合/持續交付 | GitHub 作業 + ArgoCD | GitOps，Kubernetes 原生 |
|可觀察性| OpenTelemetry + Grafana 堆疊 |供應商中立的全端追蹤 |

---

## 總結

本文提供了整個系列的**架構圖**概述。下面的部分將深入研究每一層。了解大局可以幫助您在深入了解每個組件的細節時不會迷失方向。

---

**下一篇文章：** [第 4 課：服務分解 — 有界脈絡與服務邊界](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-4-service-decomposition-bounded-context-service-boundaries)
