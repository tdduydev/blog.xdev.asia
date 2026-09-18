---
id: 019e4a33-d409-7b20-c001-b1c2d3e4f509
title: 第 9 課：事件溯源與 CQRS — 何時需要，何時不需要？
slug: bai-9-event-sourcing-cqrs-khi-nao-can-khi-nao-khong
description: >-
  事件溯源：儲存事件而不是狀態。 CQRS：單獨的讀取/寫入模型。結合事件溯源 + CQRS。權衡、複雜性和決策框架。什麼時候 CQRS
  太複雜，什麼時候真的有必要？
duration_minutes: 75
is_free: true
video_url: null
sort_order: 9
section_title: 第 3 部分：微服務中的資料架構
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: 微服務與微前端系統設計－從基礎到生產
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-4055" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-4055)"/>

  <!-- Decorations -->
  <g>
    <circle cx="861" cy="53" r="24" fill="#34d399" opacity="0.08"/>
    <circle cx="622" cy="234" r="17" fill="#34d399" opacity="0.11"/>
    <circle cx="883" cy="155" r="10" fill="#34d399" opacity="0.14"/>
    <circle cx="644" cy="76" r="33" fill="#34d399" opacity="0.07"/>
    <circle cx="905" cy="257" r="26" fill="#34d399" opacity="0.1"/>
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
    <line x1="600" y1="203" x2="1100" y2="283" stroke="#34d399" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="233" x2="1050" y2="303" stroke="#34d399" stroke-width="0.5" opacity="0.08"/>
    <polygon points="985.9089653438086,134 985.9089653438086,172 953,191 920.0910346561914,172 920.0910346561914,134 953,115" fill="none" stroke="#34d399" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#34d399"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#34d399" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#34d399">🏗️ 建築 — 第 9 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 9 課：事件溯源與 CQRS — 何時</tspan>
      <tspan x="60" dy="42">需要，什麼時候不需要？</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">微服務與微前端系統設計－從基礎到生產</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 3 部分：微服務中的資料架構</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 簡介

事件溯源和 CQRS 是兩種強大但**經常被濫用**的模式。本文將幫助您了解它的本質、真正的好處，最重要的是—**何時不使用它**。


![CQRS 和事件來源 — 單獨的命令和查詢](/storage/uploads/2026/04/mfe-ms-diagram-bai9-cqrs-event-sourcing.webp)

---

## 1. 事件溯源

### 1.1 核心思想

不保存**當前狀態**，而是保存發生的**事件序列**：

```
Traditional (State-based):
┌─────────────────────────┐
│ orders table            │
│ id: 123                 │
│ status: SHIPPED   ← chỉ biết trạng thái hiện tại
│ total: 500.000         │
└─────────────────────────┘

Event Sourcing:
┌─────────────────────────────────────┐
│ Event Store (Order #123)            │
│ 1. OrderCreated    {items, total}   │
│ 2. PaymentReceived {amount}         │
│ 3. ItemRemoved     {itemId}   ← biết toàn bộ lịch sử
│ 4. OrderConfirmed  {}               │
│ 5. OrderShipped    {trackingId}     │
└─────────────────────────────────────┘

State = replay(events) → current state
```

### 1.2 好處

- **完整的審計追蹤**：確切地知道誰在何時做了什麼
- **時間旅行**：隨時重建狀態
- **調試**：重播事件以重現錯誤
- **分析**：分析事件模式

### 1.3 缺點

- **複雜性**：需要事件儲存、預測、快照
- **最終一致性**：讀取模型不是即時的
- **模式演化**：改變事件模式非常困難
- **困難查詢**：無法 SELECT * FROM 訂單 WHERE status = 'SHIPPED'

---

## 2.CQRS（指令查詢職責分離）

### 2.1 讀寫分離

```
Traditional:
┌──────────┐     ┌──────────┐
│  Client  │────►│ Service  │────► Database
│          │◄────│(CRUD all)│◄──── (1 model)
└──────────┘     └──────────┘

CQRS:
                 ┌──────────────┐     ┌────────────┐
           ────► │ Command Side │────►│ Write DB   │
┌──────────┐     │ (Create,     │     │ (optimized │
│  Client  │     │  Update)     │     │  for write)│
└──────────┘     └──────────────┘     └─────┬──────┘
           ────► ┌──────────────┐           │ Events
                 │ Query Side   │     ┌─────▼──────┐
           ◄──── │ (Read,       │◄────│ Read DB    │
                 │  Search)     │     │ (optimized │
                 └──────────────┘     │  for read) │
                                      └────────────┘
```

### 2.2 CQRS 什麼時候有價值？

- 讀/寫比率**非常不同**（90% 讀取，10% 寫入）
- 讀取模型需要**不同的格式**寫入模型（非規範化視圖）
- 需要**獨立擴充讀取/寫入**（新增唯讀副本）
- 複雜查詢需要**優化的讀取模型**（Elasticsearch、物化視圖）

---

## 3. 決策框架

### 3.1 何時使用事件溯源 + CQRS？

✅ 財務系統（需要審計追蹤）
✅ 訂單處理（狀態複雜，需要歷史記錄）
✅ 協作編輯（衝突解決）
✅ 監管合規（需要證明發生了什麼）

### 3.2 何時不使用？

❌ 簡單的 CRUD（部落格、使用者個人資料）→ 矯枉過正
❌團隊小，無經驗→學習曲線太高
❌ 無需審核蹤跡或時間旅行
❌ 要求即時一致性

### 3.3 可以使用 CQRS 而無需事件溯源

```
CQRS without Event Sourcing (pragmatic approach):

Write Side: PostgreSQL (normalized)
  → On write: publish event to Kafka
  
Read Side: Elasticsearch (denormalized)
  → Consumer: listen events → update search index

Đơn giản hơn nhiều, vẫn có lợi ích tách read/write.
```

---

## 4. 申請電子商務

```
Product Service: CQRS (no Event Sourcing)
  Write: PostgreSQL (products table)
  Read:  Elasticsearch (search index, facets)
  Sync:  ProductUpdated event → ES consumer

Order Service: Event Sourcing + CQRS (trạng thái phức tạp)
  Event Store: PostgreSQL (events table)
  Read Model: PostgreSQL (materialized orders view)
  
Cart Service: Simple CRUD (Redis)
  Không cần CQRS — read/write model giống nhau

User Service: Simple CRUD (PostgreSQL)
  Không cần CQRS — straightforward CRUD
```

---

## 總結

|圖案|複雜性 |何時使用 |何時避免 |
|--------|---------|-------------|------------|
| **簡單的增刪改查** |低|大多數服務|高流量閱讀 |
| **僅限 CQRS** |中|獨立的讀取/寫入秤 |簡單域 |
| **事件溯源** |高|審計追踪，時間旅行|簡單的增刪改查 |
| **ES + CQRS** |非常高 |財務、訂購|幾乎所有其他|

> **黃金法則：** 從簡單開始（CRUD）。僅當特定的**痛點**證明有必要時才添加 CQRS/ES。

---

**下一篇文章：** [第 10 課：什麼是微前端？ — 效益、權衡與決策框架](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-10-micro-frontend-la-gi-loi-ich-trade-offs-decision-framework)
