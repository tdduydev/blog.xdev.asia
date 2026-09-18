---
id: 019d8a22-c304-7a10-b001-a1b2c3d4e504
title: 第 4 課：微服務設計原則 — SRP、DDD 與有界上下文
slug: bai-4-microservices-design-principles-srp-ddd-bounded-context
description: 什麼是微服務、單一職責原則、領域驅動設計、定義服務邊界的有界脈絡、鬆散耦合和高內聚、何時應該和不應該使用微服務。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 4
section_title: 第 2 部分：微服務設計與通訊模式
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: 雲端原生微服務架構
  slug: cloud-native-microservices-architecture
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-8213" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-8213)"/>

  <!-- Decorations -->
  <g>
    <circle cx="1028" cy="94" r="36" fill="#fbbf24" opacity="0.09"/>
    <circle cx="956" cy="202" r="20" fill="#fbbf24" opacity="0.13"/>
    <circle cx="884" cy="50" r="34" fill="#fbbf24" opacity="0.07"/>
    <circle cx="812" cy="158" r="18" fill="#fbbf24" opacity="0.11"/>
    <circle cx="740" cy="266" r="32" fill="#fbbf24" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <line x1="600" y1="94" x2="1100" y2="174" stroke="#fbbf24" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="124" x2="1050" y2="194" stroke="#fbbf24" stroke-width="0.5" opacity="0.08"/>
    <polygon points="969.1147367097487,129.5 969.1147367097487,158.5 944,173 918.8852632902513,158.5 918.8852632902513,129.5 944,115" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fbbf24"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fbbf24" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ 建築 — 第 4 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 4 課：微服務設計原則 —</tspan>
      <tspan x="60" dy="42">SRP、DDD 與限界上下文</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">雲端原生微服務架構</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 2 部分：微服務設計與通訊模式</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![第 4 課：微服務設計原則 — SRP、DDD 與有界上下文](/storage/uploads/2026/03/cn-bai-4-diagram.webp)

## 簡介

微服務不僅僅是「拆分整體」。如果分割方式錯誤，您將擁有一個「分散式整體」—同時具有兩種架構的所有缺點。本文介紹了正確劃分微服務的設計原則。

---

## 1.什麼是微服務？

微服務是一種**架構風格**，其中應用程式由許多小型獨立服務組成：

```
Monolith                          Microservices
┌──────────────────────┐         ┌──────────┐ ┌──────────┐
│     Một ứng dụng     │         │  Order   │ │ Payment  │
│   ┌──────┐ ┌──────┐  │         │  Service │ │ Service  │
│   │Order │ │Payment│  │   →    └──────────┘ └──────────┘
│   ├──────┤ ├──────┤  │         ┌──────────┐ ┌──────────┐
│   │Invent│ │Notif  │  │         │Inventory │ │  Notif   │
│   └──────┘ └──────┘  │         │  Service │ │ Service  │
│    Shared Database    │         └──────────┘ └──────────┘
└──────────────────────┘          Mỗi service có DB riêng
```

### 特點

- **在單獨的進程中運行**：每個服務都是一個獨立的進程/容器
- **網路通訊**：HTTP/REST、gRPC、訊息佇列
- **獨立部署**：部署服務A，不影響服務B
- **私人資料庫**：每個服務資料庫模式
- **小團隊**：2 個披薩團隊（5-8 人）擁有 1-3 項服務

---

## 2.單一職責原則（SRP）

> 每個服務只負責**一項操作**並且有**一個改變的理由**。

```
✅ Đúng — Mỗi service một nghiệp vụ rõ ràng:
├── OrderService         → Quản lý vòng đời đơn hàng
├── PaymentService       → Xử lý thanh toán
├── InventoryService     → Quản lý tồn kho
├── NotificationService  → Gửi email/SMS/push
└── UserService          → Quản lý tài khoản

❌ Sai — Service "thùng rác":
├── OrderPaymentService      → 2 nghiệp vụ gộp
├── CommonService            → Mọi thứ chung
└── UtilityService           → Không rõ trách nhiệm
```

### 違反 SRP 的跡象

- 服務有 **太多不相關的 API 端點**
- 更改功能 A 需要重新測試功能 B
- 許多團隊修復相同的服務
- 服務名稱包含“and”或“util”或“common”

---

## 3.領域驅動設計（DDD）

### 3.1 為什麼需要DDD？

DDD 幫助回答了最重要的問題：**「每個服務的邊界在哪裡？」**

DDD不是依照技術（前端服務、後端服務、資料庫服務）來劃分，而是依照**業務領域**來劃分。

### 3.2 策略設計

#### 無所不在的語言

在開發人員和領域專家之間建立**通用語言**：

```
Domain Expert (Business):        Developer (Tech):
"Đơn hàng"                   →   Order
"Thanh toán"                  →   Payment
"Giao hàng"                  →   Shipment
"Hoàn tiền"                  →   Refund
"Kho hàng"                   →   Inventory

Đảm bảo: Code, API, database, documentation đều dùng cùng thuật ngữ
```

#### 有界上下文

有界上下文定義了模型具有意義的**範圍：

```
┌──────────────────────────────────────────────────────┐
│                   E-Commerce System                   │
│                                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐ │
│  │   Order      │  │  Catalog    │  │  Customer    │ │
│  │   Context    │  │  Context    │  │  Context     │ │
│  │              │  │             │  │              │ │
│  │  "Product"   │  │  "Product"  │  │  "Customer"  │ │
│  │  = OrderItem │  │  = SKU with │  │  = Account   │ │
│  │  (id, qty,   │  │  specs,     │  │  with prefs, │ │
│  │   price)     │  │  images,    │  │  addresses   │ │
│  │              │  │  pricing    │  │              │ │
│  └─────────────┘  └─────────────┘  └──────────────┘ │
│                                                       │
│  Cùng từ "Product" nhưng ý nghĩa KHÁC NHAU           │
│  trong mỗi Bounded Context                           │
└──────────────────────────────────────────────────────┘
```

**重要規則**：每個限界上下文 → 一個（或多個）微服務。

### 3.3 上下文映射－上下文之間的關係

```
┌─────────────┐    Published    ┌──────────────┐
│   Order     │────Language────▶│   Payment    │
│   Context   │                 │   Context    │
└──────┬──────┘                 └──────────────┘
       │
       │ Customer/Supplier
       ▼
┌─────────────┐    Conformist   ┌──────────────┐
│  Shipping   │◀───────────────│  3rd Party   │
│  Context    │                 │  Logistics   │
└─────────────┘                 └──────────────┘
```

|關係 |描述 |
|------------|--------|
| **共享核心** | 2 個上下文共享子集程式碼/模型 |
| **客戶/供應商** |上游提供API，下游消費 |
| **墨守成規** |下游完全遵循上游模式|
| **反腐敗層** |外部模型與內部模型之間的翻譯層 |
| **發布語言** |透過標準格式（JSON 模式、Protobuf）進行通訊 |

### 3.4 戰術設計－建構模組

```
Bounded Context
│
├── Entity        → Có identity, lifecycle (Order, User)
├── Value Object  → Không có identity, immutable (Money, Address)
├── Aggregate     → Cluster of entities, consistency boundary
│   └── Aggregate Root → Entry point (Order là root, OrderItem là child)
├── Domain Event  → Sự kiện nghiệp vụ (OrderCreated, PaymentReceived)
├── Repository    → Persistence abstraction
└── Domain Service → Logic không thuộc entity nào (PricingCalculator)
```

#### 聚合 — 一致性單位

```
Order Aggregate:
┌───────────────────────────────┐
│  Order (Aggregate Root)       │
│  ├── id: "O-001"             │
│  ├── status: "confirmed"     │
│  ├── total: $500             │
│  │                           │
│  ├── OrderItem               │
│  │   ├── product: "iPhone"   │
│  │   ├── qty: 1              │
│  │   └── price: $400         │
│  │                           │
│  ├── OrderItem               │
│  │   ├── product: "Case"     │
│  │   ├── qty: 1              │
│  │   └── price: $100         │
│  │                           │
│  └── ShippingAddress         │
│      └── "123 ABC Street"   │
└───────────────────────────────┘

Quy tắc:
- Chỉ truy cập thông qua Aggregate Root (Order)
- Một transaction = một aggregate
- Cross-aggregate = eventual consistency
```

---

## 4. 鬆散耦合和高內聚

### 4.1 鬆散耦合

服務 A 的變更**不需要**服務 B 的變更。

```
✅ Loose Coupling:
Order Service ──event──▶ Kafka ──▶ Payment Service
(Thay đổi internal logic của Order → Payment không bị ảnh hưởng)

❌ Tight Coupling:
Order Service ──direct DB query──▶ Payment Database
(Thay đổi schema Payment DB → Order Service bị broken)
```

### 4.2 高內聚力

**相關**功能在**一個**服務中分組在一起。

```
✅ High Cohesion:
Payment Service:
├── ProcessPayment()
├── RefundPayment()
├── ValidateCard()
└── GetPaymentHistory()
→ Tất cả đều liên quan đến "thanh toán"

❌ Low Cohesion:
MiscService:
├── ProcessPayment()
├── SendEmail()
├── GenerateReport()
└── ResizeImage()
→ Không liên quan gì đến nhau
```

---

## 5. 什麼時候應該/不應該使用微服務？

### 5.1 應該在下列情況下使用

- ✅ **大規模**系統，許多團隊並行開發
- ✅ 需要獨立擴展系統的每個部分
- ✅ 需要**多語言**（多種語言/框架）
- ✅ 快速的發布週期，**持續部署**
- ✅ 複雜的領域，具有**清晰的邊界**
- ✅ 組織擁有 **DevOps 成熟度**（CI/CD、監控、容器編排）

### 5.2 不應在下列情況下使用

- ❌團隊**小**（< 5人）
- ❌ **簡單**應用程序，不太複雜的域
- ❌ **不清楚**域邊界
- ❌ 沒有 **CI/CD** 基礎架構和容器編排
- ❌**時間**有限發展
- ❌ 團隊沒有操作分散式系統的經驗

### 5.3 Monolith First

Martin Fowler 建議 **「單體優先」**：

```
Phase 1: Monolith
├── Hiểu rõ domain
├── Phát triển nhanh
└── Xác định boundary tự nhiên

Phase 2: Modular Monolith
├── Tách module rõ ràng trong monolith
├── Mỗi module có boundary riêng
└── Giao tiếp qua internal API

Phase 3: Microservices (khi cần)
├── Tách module thành service
├── Thêm API Gateway
└── Event-driven communication
```

---

## 6. 應避免反模式

### Distributed Monolith

```
❌ Chia thành nhiều service nhưng:
- Deploy phải đồng thời tất cả
- Shared database
- Synchronous chain calls dài
- Tightly coupled API contracts

→ Có đầy đủ nhược điểm của cả Monolith VÀ Microservices
→ Không có ưu điểm của cái nào cả
```

### 奈米服務（太小）

```
❌ Chia quá nhỏ:
├── CreateOrderService
├── UpdateOrderService
├── DeleteOrderService
├── GetOrderService
└── ListOrderService

→ Quá nhiều service, overhead network, khó quản lý
→ Nên gom thành: OrderService
```

---

## 7. 總結

|原理|重點|
|-----------|-----------|
|建議零售價 |每項服務都有業務、有改變的理由 |
|國內長途 |根據Bounded Context，而不是根據技術來劃分服務 |
|骨材 |一致性單元，可透過聚合根 | 存取
|鬆散耦合|更改服務 A 不會影響服務 B |
|高凝聚力 |相關功能被分組為一項服務 |
|整體第一 |開始單體，在理解領域時逐漸分離 |

> **下一篇文章**：同步通訊 - REST API 和 gRPC，微服務之間同步通訊的兩種最受歡迎的協定。
