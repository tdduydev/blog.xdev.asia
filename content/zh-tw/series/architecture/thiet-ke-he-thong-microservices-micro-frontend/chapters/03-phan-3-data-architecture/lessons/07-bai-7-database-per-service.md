---
id: 019e4a33-d407-7b20-c001-b1c2d3e4f507
title: 第 7 課：每個服務的資料庫和多語言持久性
slug: bai-7-database-per-service-polyglot-persistence
description: >-
  為什麼每個服務都需要自己的資料庫？選擇正確資料庫的策略：PostgreSQL、MongoDB、Redis、Elasticsearch。共享資料庫反模式。資料隔離、模式所有權和遷移策略。
duration_minutes: 75
is_free: true
video_url: null
sort_order: 7
section_title: 第 3 部分：微服務中的資料架構
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: 微服務與微前端系統設計－從基礎到生產
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-3024" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-3024)"/>

  <!-- Decorations -->
  <g>
    <circle cx="855" cy="175" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="610" cy="50" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="865" cy="185" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="620" cy="60" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="875" cy="195" r="8" fill="#fb923c" opacity="0.1"/>
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
    <line x1="600" y1="65" x2="1100" y2="145" stroke="#fb923c" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="95" x2="1050" y2="165" stroke="#fb923c" stroke-width="0.5" opacity="0.08"/>
    <polygon points="949.6410161513776,95 949.6410161513776,135 915,155 880.3589838486224,135 880.3589838486224,95.00000000000001 915,75" fill="none" stroke="#fb923c" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fb923c"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fb923c" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ 建築 — 第 7 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 7 課：每個服務的資料庫和多語言</tspan>
      <tspan x="60" dy="42">堅持</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">微服務與微前端系統設計－從基礎到生產</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 3 部分：微服務中的資料架構</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 簡介

「每服務資料庫」是微服務的基礎模式。沒有它，您就沒有真正的微服務——只有共享相同資料庫的模組（分散式整體）。本文解釋了原因、如何選擇正確的資料庫以及如何處理資料共享。


![每個服務都有資料庫－每個服務都有自己的資料庫](/storage/uploads/2026/04/mfe-ms-diagram-bai7-database-per-service.webp)

---

## 1. 為什麼每個服務都有資料庫？

### 1.1 共享資料庫－分散式單體之路

```
❌ Shared Database Anti-pattern:
┌────────┐ ┌────────┐ ┌────────┐
│User µS │ │Order µS│ │Payment │
└───┬────┘ └───┬────┘ └───┬────┘
    │          │          │
    └──────────┼──────────┘
               ▼
    ┌─────────────────────┐
    │  Shared PostgreSQL  │
    │  ├── users          │  ← ai own schema này?
    │  ├── orders         │  ← coupling tại data layer
    │  ├── payments       │  ← thay đổi schema = break all
    │  └── products       │
    └─────────────────────┘
```

**問題：**
- 架構變更影響所有服務
- 無法獨立擴充資料庫
- 緊耦合－部署必須同時進行
- 不能針對不同的用例使用不同的資料庫

### 1.2 每個服務的資料庫

```
✅ Database per Service:
┌────────┐    ┌────────┐    ┌────────┐
│User µS │    │Order µS│    │Cart µS │
└───┬────┘    └───┬────┘    └───┬────┘
    │             │             │
    ▼             ▼             ▼
┌────────┐  ┌────────┐    ┌────────┐
│PostgreSQL│ │PostgreSQL│  │ Redis  │
│(users)  │  │(orders) │   │(carts) │
└─────────┘  └─────────┘  └────────┘

Mỗi service own data riêng.
Schema changes chỉ ảnh hưởng 1 service.
Có thể chọn DB phù hợp nhất cho use case.
```

---

## 2. 多語言持久性 — 選擇正確的資料庫

### 2.1 決策矩陣

|使用案例|資料庫|為什麼 |
|----------|----------|--------|
|使用者資料、訂單 | **PostgreSQL** | ACID、關係型、成熟 |
|產品目錄| **PostgreSQL + Elasticsearch** |關係+全文搜尋 |
|購物車| **Redis** |快速、短暫、TTL 支援 |
|會話儲存 | **Redis** |記憶體中，快速過期 |
|活動日誌、事件 | **MongoDB / 卡夫卡** |模式靈活，僅附加 |
|推薦 | **Neo4j / Redis** |圖形關係/快取|
|分析/商業智慧 | **ClickHouse / BigQuery** |柱狀、快速聚合 |

### 2.2 電商平台資料庫設計

```
┌─────────────────────────────────────────────┐
│ User Service → PostgreSQL                   │
│   users, addresses, preferences             │
├─────────────────────────────────────────────┤
│ Product Service → PostgreSQL + Elasticsearch│
│   products, categories, reviews (PG)        │
│   search index (ES)                         │
├─────────────────────────────────────────────┤
│ Cart Service → Redis                        │
│   cart:{userId} → JSON (items, quantities)  │
│   TTL: 7 days (auto-expire abandoned carts) │
├─────────────────────────────────────────────┤
│ Order Service → PostgreSQL                  │
│   orders, order_items, order_status_history  │
├─────────────────────────────────────────────┤
│ Payment Service → PostgreSQL                │
│   transactions, refunds, payment_methods    │
└─────────────────────────────────────────────┘
```

---

## 3. 資料共享模式

當服務A需要來自服務B的資料時：

### 3.1 API組成
服務A需要資料時呼叫服務B的API。簡單但會產生運行時依賴性。

### 3.2 事件承載狀態轉移
服務 B 發布包含資料的事件 → 服務 A 儲存本機副本。
```
ProductService publishes: ProductUpdated {id, name, price, image}
OrderService subscribes → lưu product snapshot trong order_items
→ Không cần gọi ProductService khi hiển thị order history
```

### 3.3 CQRS（詳見第9課）
從事件建立讀取最佳化的檢視 - 專用查詢服務。

---

## 4.架構遷移策略

每個服務管理自己的架構：
- **Flyway / Liquibase** (Java) 或 **Prisma Migrate / Knex** (Node.js)
- 原始碼中的遷移腳本版本
- 向後相容的變更：新增列（可為空白）、新增資料表
- 重大變更：多階段遷移（新增新的→遷移資料→刪除舊的）

---

## 總結

- **每個服務的資料庫**對於真正的微服務來說是不可協商的
- 根據用例選擇資料庫（**多語言持久性**）
- 透過**事件**（首選）或**API呼叫**進行資料共享
- 架構遷移是每個服務團隊的責任

---

**下一篇文章：** [第 8 課：Saga 模式與分散式事務](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-8-saga-pattern-distributed-transactions)
