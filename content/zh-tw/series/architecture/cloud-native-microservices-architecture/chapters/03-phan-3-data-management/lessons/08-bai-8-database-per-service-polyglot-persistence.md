---
id: 019d8a22-c308-7a10-b001-a1b2c3d4e508
title: 第 8 課：每個服務的資料庫和多語言持久性
slug: bai-8-database-per-service-polyglot-persistence
description: 每個服務資料庫原則、為什麼不共享資料庫、多語言持久性（為每個服務選擇合適的資料庫）、資料所有權和跨服務資料查詢策略。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 8
section_title: 第 3 部分：微服務中的資料管理
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: 雲端原生微服務架構
  slug: cloud-native-microservices-architecture
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-7701" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-7701)"/>

  <!-- Decorations -->
  <g>
    <circle cx="846" cy="148" r="14" fill="#2dd4bf" opacity="0.13"/>
    <circle cx="1092" cy="274" r="32" fill="#2dd4bf" opacity="0.11"/>
    <circle cx="838" cy="140" r="20" fill="#2dd4bf" opacity="0.09"/>
    <circle cx="1084" cy="266" r="8" fill="#2dd4bf" opacity="0.07"/>
    <circle cx="830" cy="132" r="26" fill="#2dd4bf" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <line x1="600" y1="208" x2="1100" y2="288" stroke="#2dd4bf" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="238" x2="1050" y2="308" stroke="#2dd4bf" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1045.2390923627308,186.5 1045.2390923627308,229.5 1008,251 970.7609076372692,229.5 970.7609076372692,186.5 1008,165" fill="none" stroke="#2dd4bf" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#2dd4bf"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#2dd4bf" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#2dd4bf">🏗️ 建築 — 第 8 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 8 課：每個服務的資料庫和多語言</tspan>
      <tspan x="60" dy="42">堅持</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">雲端原生微服務架構</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 3 部分：微服務中的資料管理</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![第 8 課：每個服務的資料庫和多語言持久性](/storage/uploads/2026/03/cn-bai-8-diagram.webp)

## 簡介

在單體架構中，所有模組共享一個資料庫。在微服務中，每個服務**擁有自己的資料庫**。這項原則是實現松耦合的基礎，但同時也帶來了許多新的數據一致性挑戰。

---

## 1. 每個服務模式的資料庫

### 1.1 原則

```
✅ Database per Service:
┌────────────┐    ┌────────────┐    ┌────────────┐
│   Order    │    │  Payment   │    │  Catalog   │
│  Service   │    │  Service   │    │  Service   │
└─────┬──────┘    └─────┬──────┘    └─────┬──────┘
      │                 │                 │
┌─────▼──────┐    ┌─────▼──────┐    ┌─────▼──────┐
│ PostgreSQL │    │ PostgreSQL │    │  MongoDB   │
│  (orders)  │    │ (payments) │    │ (products) │
└────────────┘    └────────────┘    └────────────┘

Quy tắc: KHÔNG truy cập DB của service khác trực tiếp.
Muốn data từ Payment? → Gọi Payment API.
```

### 1.2 為什麼不共享資料庫？

```
❌ Shared Database:
┌────────────┐    ┌────────────┐
│   Order    │    │  Payment   │
│  Service   │    │  Service   │
└─────┬──────┘    └─────┬──────┘
      │                 │
      └────────┬────────┘
         ┌─────▼──────┐
         │ Shared DB  │
         │ (all tables)│
         └────────────┘

Vấn đề:
├── Schema coupling: Payment đổi schema → Order bị broken
├── Performance coupling: Query nặng từ Order → Payment bị chậm
├── Deployment coupling: DB migration phải coordinate cả 2 team
├── Scaling coupling: Không thể scale DB riêng cho từng service
└── Technology coupling: Tất cả phải dùng cùng DB engine
```

### 1.3 隔離策略

```
Strategy 1: Separate Database (khuyến nghị)
├── Mỗi service một database instance
├── Cách ly hoàn toàn
└── Chi phí cao hơn nhưng an toàn nhất

Strategy 2: Separate Schema
├── Cùng database instance, khác schema
├── Cách ly ở mức schema
└── Chi phí thấp hơn, phù hợp start

Strategy 3: Separate Tables
├── Cùng schema, khác tables
├── Cách ly yếu nhất
└── Chỉ phù hợp giai đoạn đầu migration
```

---

## 2. 多語言持久性

### 2.1 選擇合適的資料庫

每個服務都會根據其資料特徵選擇**最佳資料庫**：

|服務 |資料庫|原因 |
|--------|----------|--------|
|訂單| PostgreSQL | ACID 事務、關聯式資料、複雜查詢 |
|產品目錄| MongoDB |靈活的架構、嵌套的文檔、多樣化的產品類型 |
|使用者會話 | Redis |記憶體中、亞毫秒級存取、自動過期 (TTL) |
|搜尋 |彈性搜尋 |全文檢索、倒排索引、分面檢索 |
|活動提要 |阿帕契卡桑德拉 |高寫入吞吐量、時間序列、分散式 |
|推薦| Neo4j |圖關係（「購買 X 的用戶也購買了 Y」）|
|購物車 | Redis/DynamoDB |鍵值、快速存取、臨時資料 |
|分析|點擊屋 |列式、OLAP、聚合查詢 |
|檔案/影像| S3/MinIO |物件存儲，無限規模 |

### 2.2 實際範例：電子商務

```
┌──────────┐  PostgreSQL   ┌──────────┐  MongoDB
│  Order   │──────────────▶│ Catalog  │──────────▶
│  Service │  (orders,     │ Service  │  (products,
└──────────┘   line_items) └──────────┘   variants)

┌──────────┐  Redis        ┌──────────┐  Elasticsearch
│  Cart    │──────────────▶│  Search  │──────────▶
│  Service │  (cart:{uid})  │ Service  │  (products index)
└──────────┘               └──────────┘

┌──────────┐  PostgreSQL   ┌──────────┐  ClickHouse
│ Payment  │──────────────▶│Analytics │──────────▶
│ Service  │  (payments,   │ Service  │  (events,
└──────────┘   refunds)    └──────────┘   aggregates)
```

---

## 3.跨服務資料查詢

### 3.1 問題

當您需要顯示訂單詳細資訊（包括客戶和產品資訊）時：

```
❌ Trước (monolith): 
  SELECT o.*, c.name, p.title 
  FROM orders o
  JOIN customers c ON o.customer_id = c.id
  JOIN products p ON oi.product_id = p.id

✅ Sau (microservices):
  Order, Customer, Product ở databases khác nhau → Không thể JOIN!
```

### 3.2 解：API組成

```
API Gateway / BFF / Composite Service:

1. GET /orders/O-001     → Order Service    → {order_id, customer_id, items}
2. GET /customers/C-042  → Customer Service → {name, email}
3. GET /products/P-100   → Product Service  → {title, image}

4. Compose response:
{
  "order": {
    "id": "O-001",
    "customer": {"name": "Nguyen Van A", "email": "a@email.com"},
    "items": [
      {"product": {"title": "iPhone 16", "image": "..."}, "quantity": 1}
    ]
  }
}
```

### 3.3 解決方案：CQRS + 物化視圖

```
Tạo read-optimized view bằng cách subscribe events:

Order.Created ──▶ ┌─────────────────────┐
Customer.Updated ──▶│  Order Detail View  │
Product.Updated  ──▶│  (Elasticsearch)    │
                   │                     │
                   │  {order + customer  │
                   │   + product details}│
                   └─────────────────────┘

Query: GET /order-details/O-001 → Trả kết quả đã composed sẵn
```

### 3.4 比較策略

|戰略|優點 |缺點 |使用案例|
|----------|---------|--------|----------|
| API 成分 |簡單、即時的資料 |延遲（多次呼叫）、部分失敗 |儀表板、管理 UI |
| CQRS + 物化視圖 |快速閱讀，預作 |最終一致性、複雜性 |面向客戶，搜尋|
|資料複製（事件）|快速的本地查詢 |陳舊資料、儲存重複 |重讀服務 |

---

## 4. 資料所有權

### 4.1 規則

```
Mỗi piece of data có MỘT owner duy nhất:

Customer data → Customer Service (owner)
  ├── Order Service: giữ customer_id (reference)
  ├── Payment Service: giữ customer_id (reference)
  └── Notification Service: subscribe CustomerUpdated event

Price data → Catalog Service (owner)
  └── Order Service: snapshot giá tại thời điểm order
       (không query lại, vì giá có thể thay đổi)
```

### 4.2 資料快照模式

```
Khi tạo Order, snapshot data cần thiết:

Order {
  id: "O-001",
  customer_snapshot: {        ← Copy tại thời điểm order
    name: "Nguyen Van A",
    address: "123 ABC"
  },
  items: [{
    product_id: "P-100",
    title_snapshot: "iPhone",  ← Copy tại thời điểm order
    price_snapshot: 25000000   ← Giá tại thời điểm order
  }]
}

→ Customer đổi address sau đó? Order vẫn giữ address cũ (đúng)
→ Product tăng giá? Order vẫn giữ giá cũ (đúng)
```

---

## 5. 資料庫遷移策略

### 5.1 從共享資料庫到每服務資料庫

```
Phase 1: Identify boundaries
  Shared DB → Xác định tables thuộc service nào

Phase 2: Create APIs
  Service A gọi Service B qua API thay vì JOIN

Phase 3: Sync data
  Dual-write hoặc CDC để sync trong quá trình migration

Phase 4: Split databases
  Move tables sang database riêng

Phase 5: Remove old connections
  Xoá direct DB access, chỉ giữ API calls
```

---

## 6. 總結

|概念 |重點|
|--------|------------|
|每個服務的資料庫 |每個服務擁有自己的資料庫，不共享 |
|多語言持久性 |為每項服務選擇合適的資料庫 |
| API 成分 |透過聚合API呼叫進行跨服務查詢 |
| CQRS + 檢視 |為複雜查詢建立讀取最佳化檢視 |
|資料所有權|每個資料都有一個唯一的服務擁有者|
|資料快照|複製交易時所需的資料 |

> **下一篇文章**：事件溯源與 CQRS — 將狀態儲存為事件和單獨的讀取/寫入模型。
