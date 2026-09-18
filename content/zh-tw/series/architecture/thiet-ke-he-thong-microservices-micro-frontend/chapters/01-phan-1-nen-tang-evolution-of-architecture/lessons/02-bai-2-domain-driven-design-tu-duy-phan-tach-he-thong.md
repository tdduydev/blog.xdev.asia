---
id: 019e4a33-d402-7b20-c001-b1c2d3e4f502
title: 第 2 課：領域驅動設計－系統分離思維
slug: bai-2-domain-driven-design-tu-duy-phan-tach-he-thong
description: DDD 平台：通用語言、限界上下文、聚合、領域事件。如何使用事件風暴來發現域。戰略與戰術 DDD 以及微服務與微前端部門的應用。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 2
section_title: 第 1 部分：基礎 — 架構的演變
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: 微服務與微前端系統設計－從基礎到生產
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-3008" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-3008)"/>

  <!-- Decorations -->
  <g>
    <circle cx="695" cy="115" r="18" fill="#fb923c" opacity="0.1"/>
    <circle cx="790" cy="230" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="885" cy="85" r="28" fill="#fb923c" opacity="0.1"/>
    <circle cx="980" cy="200" r="33" fill="#fb923c" opacity="0.05"/>
    <circle cx="1075" cy="55" r="8" fill="#fb923c" opacity="0.1"/>
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
    <line x1="600" y1="185" x2="1100" y2="265" stroke="#fb923c" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="215" x2="1050" y2="285" stroke="#fb923c" stroke-width="0.5" opacity="0.08"/>
    <polygon points="969.6410161513776,115 969.6410161513776,155 935,175 900.3589838486224,155 900.3589838486224,115.00000000000001 935,95" fill="none" stroke="#fb923c" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fb923c"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fb923c" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ 建築 — 第 2 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 2 課：領域驅動設計－分割思維</tspan>
      <tspan x="60" dy="42">系統分離</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">微服務與微前端系統設計－從基礎到生產</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 1 部分：基礎 — 架構的演變</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 簡介

領域驅動設計 (DDD) 不僅僅是一種編寫程式碼的方法 - 它**將複雜的系統**分解為具有業務意義的部分。 DDD是決定**如何劃分微服務**和**如何劃分微前端**的基礎。如果分割不正確，您將擁有一個「分散式整體」—比原始整體更糟。


![上下文映射 - DDD 中域之間的有界上下文和關係](/storage/uploads/2026/04/mfe-ms-diagram-bai2-bounded-context-map.webp)

---

## 1. 為什麼需要DDD？

### 1.1 技術分解問題

將系統劃分為**技術層**（UI層、業務層、資料層）是最常見的錯誤：

```
❌ Technical Decomposition (SAI):
├── frontend-service
├── backend-service
├── database-service
└── notification-service

✅ Domain Decomposition (ĐÚNG):
├── user-management (UI + API + DB cho User)
├── product-catalog (UI + API + DB cho Product)
├── order-processing (UI + API + DB cho Order)
└── payment (UI + API + DB cho Payment)
```

### 1.2 DDD解決什麼問題？

- **通用語言**：整個團隊（開發、PM、業務）使用相同的“語言”
- **有界上下文**：定義域之間的清晰邊界
- **減少耦合**：每個有界上下文都是獨立的單元
- **協調業務與技術**：架構反映業務結構

---

## 2. 策略 DDD — 著眼大局

### 2.1 無所不在的語言

每個限界上下文都有自己的**語言**。相同的詞“產品”但在每種情況下含義不同：

```
┌───────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  Product Catalog   │  │   Order Context  │  │  Shipping Context│
│                    │  │                  │  │                  │
│ Product:           │  │ OrderItem:       │  │ Parcel:          │
│ - name, desc       │  │ - productId      │  │ - weight         │
│ - price, images    │  │ - quantity       │  │ - dimensions     │
│ - categories       │  │ - unitPrice      │  │ - tracking       │
│ - reviews          │  │ - discount       │  │ - destination    │
└───────────────────┘  └──────────────────┘  └──────────────────┘

Cùng "Product" nhưng mỗi context cần thông tin khác nhau!
```

### 2.2 有界上下文

**有界上下文**是應用一致域模型的邏輯邊界。

**原則：**
- 每個限界上下文 = 1 個微服務（或一小群）
- 每個限界上下文 = 1 個微前端（或 UI 的一部分）
- 上下文之間：透過 **API 或事件** 進行通訊（無共享資料庫！）

### 2.3 上下文映射

有界上下文並不是獨立存在的－它們彼此之間有**關係**：

```
Context Map:
┌──────────────┐          ┌──────────────┐
│   Product    │◄─────────│    Order     │
│   Catalog    │ Upstream  │  Processing  │
│  (Supplier)  │──────────►│ (Consumer)   │
└──────────────┘          └──────┬───────┘
                                 │
                          ┌──────┴───────┐
                          │   Payment    │
                          │   Gateway    │
                          └──────────────┘
```

**關係模式：**
|圖案|說明 |何時使用 |
|--------|--------|-------------|
| **客戶-供應商** |上游提供，下游消耗 |明確依賴關係 |
| **共享核心** |分享部分模型|兩者的背景密切相關|
| **反腐敗層** |兩個模型之間的層轉換 |遺留系統整合|
| **發布語言** |用於通訊的標準 API/架構 |許多消費者需要使用|

---

## 3. 戰術 DDD — 設計細節

### 3.1 聚合

聚合是被視為一致性單位的**實體群組**。所有更改都會透過**聚合根**。

```
Order Aggregate:
┌─────────────────────────────────┐
│  Order (Aggregate Root)         │
│  ├── OrderItem                  │
│  ├── OrderItem                  │
│  └── ShippingAddress            │
│                                 │
│  Invariants:                    │
│  - Total = sum(items.price)     │
│  - Status transitions are valid │
│  - At least 1 item required     │
└─────────────────────────────────┘
```

### 3.2 領域事件

領域事件描述了領域中發生的**事件：

```typescript
// Domain Events
interface OrderPlaced {
  orderId: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  placedAt: Date;
}

interface PaymentConfirmed {
  paymentId: string;
  orderId: string;
  amount: number;
  confirmedAt: Date;
}

// Event flow
OrderPlaced → PaymentService listens → PaymentConfirmed → ShippingService listens
```

---

## 4. 事件風暴－域發現

### 4.1 什麼是事件風暴？

事件風暴是一個研討會，**開發人員 + 領域專家**透過貼上便籤來共同探索領域：

```
Timeline: ─────────────────────────────────────────────►

🟧 Domain Event     🟦 Command          🟨 Policy/Rule
"Order Placed"     "Place Order"       "If payment fails,
                                        cancel order"

🟪 Aggregate        🟩 External System   🔴 Hot Spot
"Order"            "Payment Gateway"   "Race condition
                                        when checking stock"
```

### 4.2 從事件風暴到限界上下文

研討會結束後，將相關事件分組 → 定義有界脈絡 → 對應到微服務 + 微前端。

```
Event Storming Results → Bounded Contexts:
├── Product Context: ProductCreated, ProductUpdated, CategoryChanged
├── Cart Context: ItemAddedToCart, CartAbandoned, CouponApplied
├── Order Context: OrderPlaced, OrderConfirmed, OrderShipped
├── Payment Context: PaymentInitiated, PaymentConfirmed, RefundIssued
└── User Context: UserRegistered, ProfileUpdated, AddressAdded

Mapping:
├── Product Context → Product Microservice + Product MFE
├── Cart Context    → Cart Microservice + Cart MFE
├── Order Context   → Order Microservice + Checkout MFE
├── Payment Context → Payment Microservice (no separate MFE)
└── User Context    → User Microservice + Account MFE
```

---

## 5. 將 DDD 應用於微前端

### 5.1 有界上下文 → 微前端

每個限界上下文不僅映射到 1 個微服務，還映射到 **1 個微前端**：

```
Bounded Context: Product Catalog
├── Backend: Product Microservice
│   ├── REST API / GraphQL
│   ├── PostgreSQL database
│   └── Search index (Elasticsearch)
│
├── Frontend: Product Micro Frontend
│   ├── Product listing page
│   ├── Product detail page
│   ├── Search & filter UI
│   └── Product reviews
│
└── Team: Product Team (full-stack ownership)
```

### 5.2 根據 DDD 的團隊拓撲

```
┌──────────────────────────────────────────┐
│              Organization                │
├──────────┬──────────┬────────┬───────────┤
│ Team     │ Team     │ Team   │ Team      │
│ Product  │ Cart     │ Order  │ Platform  │
├──────────┼──────────┼────────┼───────────┤
│ MFE:     │ MFE:     │ MFE:   │ Shell App │
│ Product  │ Cart     │ Order  │ Design Sys│
│ pages    │ sidebar  │ pages  │ Auth      │
├──────────┼──────────┼────────┼───────────┤
│ µS:      │ µS:      │ µS:    │ API GW    │
│ Product  │ Cart     │ Order  │ Infra     │
│ API      │ API      │ API    │           │
├──────────┼──────────┼────────┼───────────┤
│ DB:      │ DB:      │ DB:    │ Shared    │
│ Postgres │ Redis    │ Postgres│ Services │
└──────────┴──────────┴────────┴───────────┘
```

---

## 總結

- **DDD**是正確分解系統的思考基礎
- **有界上下文**定義邊界→映射到微服務+微前端
- **事件風暴**有助於與業務專家一起探索領域
- **上下文映射**定義上下文之間的關係
- 按**領域**（而非依技術層）劃分是黃金法則

---

**下一篇文章：** [第 3 課：全端概述架構 — 微服務 + 微前端 + BFF](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-3-kien-truc-tong-quan-full-stack-microservices-micro-frontend-bff)
