---
id: 019d8a22-c304-7a10-b001-a1b2c3d4e504
title: "Bài 4: Microservices Design Principles — SRP, DDD & Bounded Context"
slug: bai-4-microservices-design-principles-srp-ddd-bounded-context
description: >-
  Microservices là gì, Single Responsibility Principle, Domain-Driven Design,
  Bounded Context để xác định ranh giới service, Loose Coupling & High Cohesion,
  khi nào nên và không nên dùng microservices.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 4
section_title: "Phần 2: Microservices Design & Communication Patterns"
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: "Cloud Native Microservices Architecture"
  slug: cloud-native-microservices-architecture
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ Kiến trúc — Bài 4</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 4: Microservices Design Principles —</tspan>
      <tspan x="60" dy="42">SRP, DDD &amp; Bounded Context</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Cloud Native Microservices Architecture</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 2: Microservices Design &amp; Communication Patterns</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Bài 4: Microservices Design Principles — SRP, DDD & Bounded Context](/storage/uploads/2026/03/cn-bai-4-diagram.webp)

## Giới thiệu

Microservices không chỉ là "chia nhỏ monolith". Nếu chia sai cách, bạn sẽ có một "distributed monolith" — mang đầy đủ nhược điểm của cả hai kiến trúc. Bài này trang bị nguyên lý thiết kế để chia microservices đúng cách.

---

## 1. Microservices là gì?

Microservices là **phong cách kiến trúc** trong đó ứng dụng được cấu thành từ nhiều service nhỏ, độc lập:

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

### Đặc điểm

- **Chạy trong process riêng**: Mỗi service là một process/container độc lập
- **Giao tiếp qua network**: HTTP/REST, gRPC, Message Queue
- **Triển khai độc lập**: Deploy service A mà không ảnh hưởng service B
- **Database riêng**: Database per Service pattern
- **Team nhỏ**: 2-Pizza team (5-8 người) sở hữu 1-3 services

---

## 2. Single Responsibility Principle (SRP)

> Mỗi service chỉ chịu trách nhiệm cho **một nghiệp vụ** và có **một lý do duy nhất để thay đổi**.

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

### Dấu hiệu vi phạm SRP

- Service có **quá nhiều API endpoints** không liên quan
- Thay đổi tính năng A lại phải test lại tính năng B
- Nhiều team cùng sửa một service
- Service name chứa "and" hoặc "util" hoặ "common"

---

## 3. Domain-Driven Design (DDD)

### 3.1 Tại sao cần DDD?

DDD giúp trả lời câu hỏi quan trọng nhất: **"Ranh giới của mỗi service ở đâu?"**

Thay vì chia theo kỹ thuật (frontend service, backend service, database service), DDD chia theo **nghiệp vụ kinh doanh** (business domain).

### 3.2 Strategic Design

#### Ubiquitous Language

Xây dựng **ngôn ngữ chung** giữa developer và domain expert:

```
Domain Expert (Business):        Developer (Tech):
"Đơn hàng"                   →   Order
"Thanh toán"                  →   Payment
"Giao hàng"                  →   Shipment
"Hoàn tiền"                  →   Refund
"Kho hàng"                   →   Inventory

Đảm bảo: Code, API, database, documentation đều dùng cùng thuật ngữ
```

#### Bounded Context

Bounded Context xác định **phạm vi mà một model có ý nghĩa**:

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

**Quy tắc quan trọng**: Mỗi Bounded Context → Một (hoặc vài) Microservice.

### 3.3 Context Mapping — Quan hệ giữa các Context

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

| Relationship | Mô tả |
|-------------|--------|
| **Shared Kernel** | 2 context chia sẻ subset code/model |
| **Customer/Supplier** | Upstream cung cấp API, downstream consume |
| **Conformist** | Downstream tuân thủ hoàn toàn model của upstream |
| **Anti-Corruption Layer** | Layer dịch between foreign model và internal model |
| **Published Language** | Giao tiếp qua format chuẩn (JSON schema, Protobuf) |

### 3.4 Tactical Design — Building Blocks

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

#### Aggregate — Đơn vị consistency

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

## 4. Loose Coupling & High Cohesion

### 4.1 Loose Coupling (Kết nối lỏng)

Thay đổi ở service A **không yêu cầu** thay đổi ở service B.

```
✅ Loose Coupling:
Order Service ──event──▶ Kafka ──▶ Payment Service
(Thay đổi internal logic của Order → Payment không bị ảnh hưởng)

❌ Tight Coupling:
Order Service ──direct DB query──▶ Payment Database
(Thay đổi schema Payment DB → Order Service bị broken)
```

### 4.2 High Cohesion (Gắn kết cao)

Các chức năng **liên quan** được gom chung trong **một** service.

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

## 5. Khi nào nên/không nên dùng Microservices?

### 5.1 NÊN dùng khi

- ✅ Hệ thống **quy mô lớn**, nhiều team phát triển song song
- ✅ Cần **scale từng phần** hệ thống độc lập
- ✅ Yêu cầu **polyglot** (nhiều ngôn ngữ/framework)
- ✅ Release cycle nhanh, **continuous deployment**
- ✅ Domain phức tạp, có **ranh giới rõ ràng**
- ✅ Tổ chức có **DevOps maturity** (CI/CD, monitoring, container orchestration)

### 5.2 KHÔNG nên dùng khi

- ❌ Team **nhỏ** (< 5 người)
- ❌ Ứng dụng **đơn giản**, domain ít phức tạp
- ❌ **Chưa hiểu rõ** domain boundary
- ❌ Không có hạ tầng **CI/CD** và container orchestration
- ❌ **Thời gian** phát triển hạn chế
- ❌ Team chưa có kinh nghiệm vận hành distributed system

### 5.3 Monolith First

Martin Fowler khuyến nghị **"Monolith First"**:

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

## 6. Anti-patterns cần tránh

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

### Nano-services (quá nhỏ)

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

## 7. Tổng kết

| Nguyên lý | Key Point |
|-----------|-----------|
| SRP | Mỗi service một nghiệp vụ, một lý do để thay đổi |
| DDD | Chia service theo Bounded Context, không theo kỹ thuật |
| Aggregate | Đơn vị consistency, truy cập qua Aggregate Root |
| Loose Coupling | Thay đổi service A không ảnh hưởng service B |
| High Cohesion | Chức năng liên quan gom chung một service |
| Monolith First | Bắt đầu monolith, tách dần khi hiểu domain |

> **Bài tiếp theo**: Synchronous Communication — REST API & gRPC, hai giao thức phổ biến nhất cho giao tiếp đồng bộ giữa các microservices.
