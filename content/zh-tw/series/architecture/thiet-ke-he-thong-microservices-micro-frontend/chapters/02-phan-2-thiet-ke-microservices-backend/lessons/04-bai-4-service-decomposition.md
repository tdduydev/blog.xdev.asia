---
id: 019e4a33-d404-7b20-c001-b1c2d3e4f504
title: 第 4 課：服務分解 — 有界脈絡與服務邊界
slug: bai-4-service-decomposition-bounded-context-service-boundaries
description: 基於Bounded Context的服務分離方法。正確定義服務邊界，避免分散式單體。依子網域分解與依業務能力策略分解。上下文映射模式。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 4
section_title: 第 2 部分：設計微服務後端
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: 微服務與微前端系統設計－從基礎到生產
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-9443" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-9443)"/>

  <!-- Decorations -->
  <g>
    <circle cx="922" cy="236" r="30" fill="#f87171" opacity="0.11"/>
    <circle cx="744" cy="218" r="26" fill="#f87171" opacity="0.07"/>
    <circle cx="1066" cy="200" r="22" fill="#f87171" opacity="0.13"/>
    <circle cx="888" cy="182" r="18" fill="#f87171" opacity="0.09"/>
    <circle cx="710" cy="164" r="14" fill="#f87171" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <line x1="600" y1="156" x2="1100" y2="236" stroke="#f87171" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="186" x2="1050" y2="256" stroke="#f87171" stroke-width="0.5" opacity="0.08"/>
    <polygon points="982.8467875173176,140.5 982.8467875173176,171.5 956,187 929.1532124826824,171.5 929.1532124826824,140.5 956,125" fill="none" stroke="#f87171" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#f87171"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#f87171" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f87171">🏗️ 建築 — 第 4 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 4 課：服務分解－有界</tspan>
      <tspan x="60" dy="42">情境和服務邊界</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">微服務與微前端系統設計－從基礎到生產</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 2 部分：設計微服務後端</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 簡介

遷移到微服務時，服務分離是最重要的架構決策。劃分太小→複雜性爆炸。分太大→分散式整體。本文指導了正確定義服務邊界的系統方法。


![服務分解－將系統分解為微服務](/storage/uploads/2026/04/mfe-ms-diagram-bai4-service-decomposition.webp)

---

## 1.分離原理

### 1.1 服務的單一責任

每個服務負責**獨特的業務能力**：
- 使用者服務→使用者生命週期管理（註冊、登入、個人資料）
- 產品服務→產品目錄、搜尋、評論
- 訂單服務 → 訂單處理、履行、歷史記錄

### 1.2 兩個主要策略

**依業務能力分解：**

根據組織提供的業務功能：
```
E-Commerce Business Capabilities:
├── Customer Management   → User Service
├── Product Management    → Product Service
├── Order Management      → Order Service
├── Payment Processing    → Payment Service
├── Inventory Management  → Inventory Service
└── Shipping & Delivery   → Shipping Service
```

**按子域（DDD）分解：**

基於透過 DDD 識別的子域：
```
Core Subdomains (competitive advantage):
├── Product Catalog → Product Service (custom-built, best team)
├── Order Processing → Order Service (complex logic)

Supporting Subdomains (necessary but not differentiating):
├── Inventory → Inventory Service
├── Customer Profile → User Service

Generic Subdomains (solved problems):
├── Authentication → Keycloak (off-the-shelf)
├── Payment Gateway → Stripe integration
├── Email → SendGrid/SES
```

### 1.3 正確的服務邊界標誌

- 服務可以**獨立**開發、部署、擴展
- 服務 A 的變更**很少**需要服務 B 的變更
- 每個服務都有自己的**資料庫**（無共享表）
- 團隊可以在服務上工作**無需與其他團隊協調**
- 服務具有**內聚的 API** - 密切相關的端點

---

## 2. 上下文映射模式

一旦確定了有界上下文，您需要定義它們之間的關係：

### 2.1 合作夥伴
兩個團隊密切合作，共同開發介面：
```
Product Team ←→ Search Team
(cùng định nghĩa product schema cho search indexing)
```

### 2.2 客戶-供應商
上游（供應商）提供資料/API，下游（客戶）消耗：
```
Product Service (Supplier) → Order Service (Customer)
(Order Service cần product info nhưng không thay đổi product)
```

### 2.3 反腐敗層（ACL）
用於保護域模型免受外部/遺留系統影響的轉換層：
```
┌──────────┐     ┌─────┐     ┌──────────────┐
│ Order    │ ──► │ ACL │ ──► │ Legacy ERP   │
│ Service  │     │     │     │ (SOAP/XML)   │
└──────────┘     └─────┘     └──────────────┘
ACL convert REST/JSON ↔ SOAP/XML
```

---

## 3. 應避免反模式

### 3.1 分散式整體架構
```
❌ Services phụ thuộc chặt chẽ:
Service A → Service B → Service C → Service A (circular!)
Kết quả: phải deploy A, B, C cùng lúc = worse than monolith
```

### 3.2 奈米服務
```
❌ Chia quá nhỏ:
├── ProductNameService
├── ProductPriceService
├── ProductImageService
└── ProductReviewService

✅ Chia hợp lý:
└── ProductService (gom lại thành 1 service)
```

### 3.3 共享資料庫
```
❌ Nhiều services dùng chung DB:
Service A ──┐
Service B ──┼──► Shared PostgreSQL (products table)
Service C ──┘
Thay đổi schema → break tất cả services

✅ Database per Service:
Service A → DB_A
Service B → DB_B (replicate data nếu cần)
Service C → DB_C
```

---

## 4. 實務：分離電子商務平台

適用於整個系列的項目：

```
E-Commerce Platform Services:

┌─────────────────────────────────────────┐
│ User Service (Supporting)               │
│ - Registration, Login, Profile          │
│ - PostgreSQL (users, addresses)         │
│ - Team: 2-3 devs                       │
├─────────────────────────────────────────┤
│ Product Service (Core)                  │
│ - Catalog, Search, Reviews, Categories  │
│ - PostgreSQL + Elasticsearch            │
│ - Team: 3-4 devs                       │
├─────────────────────────────────────────┤
│ Cart Service (Supporting)               │
│ - Add/Remove items, Apply coupon        │
│ - Redis (fast, ephemeral)              │
│ - Team: 2 devs                         │
├─────────────────────────────────────────┤
│ Order Service (Core)                    │
│ - Place order, Track, History           │
│ - PostgreSQL (orders, order_items)      │
│ - Team: 3-4 devs                       │
├─────────────────────────────────────────┤
│ Payment Service (Generic)               │
│ - Stripe/VNPay integration              │
│ - PostgreSQL (transactions)            │
│ - Team: 2 devs                         │
└─────────────────────────────────────────┘
```

---

## 總結

|原則|描述 |
|----------|------|
|依領域劃分 |使用DDD Bounded Context，不依技術層劃分|
|鬆散耦合|服務 A 發生變化，無需部署服務 B |
|高凝聚力 |相關功能位於同一個服務|
|自己的資料|每個服務都有自己的資料庫|
|尺寸合適 |不太大（整體），也不太小（奈米服務）|

---

**下一篇文章：** [第 5 堂課：API 設計大師班 — REST、GraphQL 與 gRPC](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-5-api-design-masterclass-rest-graphql-grpc)
