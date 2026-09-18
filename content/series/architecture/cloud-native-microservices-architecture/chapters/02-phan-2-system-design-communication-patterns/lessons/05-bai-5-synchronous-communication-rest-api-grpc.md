---
id: 019d8a22-c305-7a10-b001-a1b2c3d4e505
title: "Bài 5: Synchronous Communication — REST API & gRPC"
slug: bai-5-synchronous-communication-rest-api-grpc
description: >-
  REST API design best practices, gRPC với Protobuf, HTTP/2 multiplexing,
  so sánh REST vs gRPC, khi nào chọn cái nào, API versioning strategies.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 5
section_title: "Phần 2: Microservices Design & Communication Patterns"
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: "Cloud Native Microservices Architecture"
  slug: cloud-native-microservices-architecture
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-9629" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-9629)"/>

  <!-- Decorations -->
  <g>
    <circle cx="680" cy="70" r="18" fill="#38bdf8" opacity="0.05"/>
    <circle cx="760" cy="170" r="8" fill="#38bdf8" opacity="0.05"/>
    <circle cx="840" cy="270" r="28" fill="#38bdf8" opacity="0.05"/>
    <circle cx="920" cy="110" r="18" fill="#38bdf8" opacity="0.05"/>
    <circle cx="1000" cy="210" r="8" fill="#38bdf8" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <line x1="600" y1="190" x2="1100" y2="270" stroke="#38bdf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="220" x2="1050" y2="290" stroke="#38bdf8" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1061.650635094611,227.5 1061.650635094611,252.5 1040,265 1018.349364905389,252.5 1018.349364905389,227.5 1040,215" fill="none" stroke="#38bdf8" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#38bdf8"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#38bdf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#38bdf8">🏗️ Kiến trúc — Bài 5</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 5: Synchronous Communication — REST</tspan>
      <tspan x="60" dy="42">API &amp; gRPC</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Cloud Native Microservices Architecture</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 2: Microservices Design &amp; Communication Patterns</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Bài 5: Synchronous Communication — REST API & gRPC](/storage/uploads/2026/03/cn-bai-5-diagram.webp)

## Giới thiệu

Giao tiếp đồng bộ (synchronous) là mô hình request-response: client gửi request, chờ server trả response. REST và gRPC là hai lựa chọn phổ biến nhất cho internal service-to-service communication.

---

## 1. REST API

### 1.1 RESTful Design Principles

REST (Representational State Transfer) sử dụng HTTP methods để thao tác resources:

```
GET    /api/v1/orders          → Liệt kê đơn hàng
GET    /api/v1/orders/{id}     → Chi tiết đơn hàng
POST   /api/v1/orders          → Tạo đơn hàng mới
PUT    /api/v1/orders/{id}     → Cập nhật toàn bộ
PATCH  /api/v1/orders/{id}     → Cập nhật một phần
DELETE /api/v1/orders/{id}     → Xoá đơn hàng
```

### 1.2 Best Practices

**Naming conventions:**
```
✅ /api/v1/orders                    # Noun, plural
✅ /api/v1/orders/{id}/items         # Nested resource
✅ /api/v1/orders?status=pending     # Filtering via query params

❌ /api/v1/getOrders                 # Verb in URL
❌ /api/v1/order                     # Singular
❌ /api/v1/orders/getByStatus/pending # Logic in URL
```

**HTTP Status Codes:**
```
2xx Success:
  200 OK              — GET, PUT, PATCH thành công
  201 Created          — POST tạo resource mới
  204 No Content       — DELETE thành công

4xx Client Error:
  400 Bad Request      — Validation error
  401 Unauthorized     — Chưa xác thực
  403 Forbidden        — Không có quyền
  404 Not Found        — Resource không tồn tại
  409 Conflict         — Trùng lặp (duplicate)
  422 Unprocessable    — Business logic error
  429 Too Many Requests — Rate limit exceeded

5xx Server Error:
  500 Internal Server Error — Lỗi server
  502 Bad Gateway           — Upstream service error
  503 Service Unavailable   — Service đang quá tải
  504 Gateway Timeout       — Upstream timeout
```

**Pagination:**
```json
GET /api/v1/orders?page=2&per_page=20&sort=-created_at

{
  "data": [...],
  "meta": {
    "current_page": 2,
    "per_page": 20,
    "total": 150,
    "total_pages": 8
  },
  "links": {
    "first": "/api/v1/orders?page=1&per_page=20",
    "prev": "/api/v1/orders?page=1&per_page=20",
    "next": "/api/v1/orders?page=3&per_page=20",
    "last": "/api/v1/orders?page=8&per_page=20"
  }
}
```

### 1.3 API Versioning

```
Strategy 1: URL Path (khuyến nghị)
  /api/v1/orders
  /api/v2/orders

Strategy 2: Header
  Accept: application/vnd.myapi.v2+json

Strategy 3: Query Parameter
  /api/orders?version=2
```

### 1.4 OpenAPI / Swagger

Định nghĩa API contract trước (API First):

```yaml
openapi: 3.0.3
info:
  title: Order Service API
  version: 1.0.0
paths:
  /api/v1/orders:
    post:
      summary: Create a new order
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateOrderRequest'
      responses:
        '201':
          description: Order created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Order'
        '400':
          description: Validation error
components:
  schemas:
    CreateOrderRequest:
      type: object
      required: [customer_id, items]
      properties:
        customer_id:
          type: string
          format: uuid
        items:
          type: array
          items:
            $ref: '#/components/schemas/OrderItem'
```

---

## 2. gRPC

### 2.1 Tổng quan

gRPC là framework RPC (Remote Procedure Call) do Google phát triển, sử dụng:
- **Protocol Buffers (Protobuf)** — binary serialization
- **HTTP/2** — multiplexing, server push, header compression

```
Order Service                     Inventory Service
┌──────────────┐                  ┌──────────────┐
│              │  gRPC/HTTP2      │              │
│  gRPC Client │──────────────────▶  gRPC Server │
│  (generated) │  Protobuf binary │  (generated) │
│              │◀─────────────────│              │
└──────────────┘                  └──────────────┘
```

### 2.2 Protocol Buffers

Định nghĩa service contract bằng `.proto` file:

```protobuf
syntax = "proto3";

package inventory;

option go_package = "github.com/myorg/inventory/proto";
option java_package = "com.myorg.inventory.grpc";

// Service definition
service InventoryService {
  // Unary RPC
  rpc CheckStock(StockRequest) returns (StockResponse);
  rpc ReserveItems(ReserveRequest) returns (ReserveResponse);

  // Server streaming
  rpc StreamStockUpdates(StockFilter) returns (stream StockUpdate);

  // Bidirectional streaming
  rpc SyncInventory(stream InventoryEvent) returns (stream SyncResult);
}

// Messages
message StockRequest {
  string product_id = 1;
  int32 quantity = 2;
}

message StockResponse {
  bool available = 1;
  int32 current_stock = 2;
  string warehouse_id = 3;
}

message ReserveRequest {
  string order_id = 1;
  repeated ReserveItem items = 2;
}

message ReserveItem {
  string product_id = 1;
  int32 quantity = 2;
}

message ReserveResponse {
  bool success = 1;
  string reservation_id = 2;
  google.protobuf.Timestamp expires_at = 3;
}
```

### 2.3 gRPC Communication Patterns

```
1. Unary RPC (Request-Response):
   Client ──request──▶ Server
   Client ◀─response── Server

2. Server Streaming:
   Client ──request──▶ Server
   Client ◀─stream 1── Server
   Client ◀─stream 2── Server
   Client ◀─stream N── Server

3. Client Streaming:
   Client ──stream 1──▶ Server
   Client ──stream 2──▶ Server
   Client ──stream N──▶ Server
   Client ◀──response── Server

4. Bidirectional Streaming:
   Client ──stream──▶ Server
   Client ◀──stream── Server
   (đồng thời, full-duplex)
```

### 2.4 Code Generation

Từ `.proto` file, tự động generate code cho mọi ngôn ngữ:

```bash
# Go
protoc --go_out=. --go-grpc_out=. proto/inventory.proto

# Java
protoc --java_out=. --grpc-java_out=. proto/inventory.proto

# TypeScript
protoc --ts_out=. proto/inventory.proto
```

---

## 3. REST vs gRPC

| Tiêu chí | REST | gRPC |
|----------|------|------|
| **Protocol** | HTTP/1.1 (hoặc 2) | HTTP/2 |
| **Format** | JSON (text) | Protobuf (binary) |
| **Performance** | Chậm hơn (~2-10x) | Nhanh hơn |
| **Payload size** | Lớn (JSON verbose) | Nhỏ (~30% của JSON) |
| **Streaming** | Không native | Full support |
| **Code generation** | Manual / OpenAPI codegen | Built-in, mature |
| **Browser support** | Native | Cần gRPC-Web proxy |
| **Debugging** | Dễ (human-readable) | Khó (binary) |
| **Tooling** | Postman, curl, ... | grpcurl, BloomRPC |
| **Learning curve** | Thấp | Trung bình |
| **Contract** | Optional (OpenAPI) | Required (.proto) |

### 3.1 Khi nào chọn REST?

- External API cho client/browser/mobile
- Public API cho third-party integration
- Simple CRUD operations
- Team chưa quen với gRPC

### 3.2 Khi nào chọn gRPC?

- Internal service-to-service communication
- High performance requirements (low latency, high throughput)
- Streaming use cases (real-time updates, IoT)
- Polyglot environment (nhiều ngôn ngữ, cần code generation)
- Strict contract enforcement

### 3.3 Pattern phổ biến: REST ngoài, gRPC trong

```
┌──────────┐     REST/JSON     ┌──────────────┐     gRPC/Protobuf     ┌─────────────┐
│  Client  │──────────────────▶│ API Gateway  │─────────────────────▶│ Internal    │
│ (Browser)│◀──────────────────│              │◀─────────────────────│ Services    │
└──────────┘                   └──────────────┘                      └─────────────┘
```

---

## 4. Xử lý lỗi trong Synchronous Communication

### 4.1 Timeout

```
Order Service ──request──▶ Payment Service
     │                           │
     │      (đợi response)       │
     │                           │
     │  timeout = 3 giây         │
     │                           │
     ├── Nếu < 3s: nhận response ✓
     └── Nếu > 3s: timeout error ✗
         → Retry? Circuit breaker? Fallback?
```

**Quy tắc**: Luôn set timeout cho mọi outgoing request, không bao giờ chờ vô hạn.

### 4.2 Cascading Failure

```
❌ Synchronous chain dài:
Client → A → B → C → D → E
   │
   └── Nếu E chậm → D chậm → C chậm → B chậm → A chậm → Client timeout

Giải pháp:
1. Circuit Breaker (bài 18)
2. Timeout cho mỗi hop
3. Chuyển sang async khi có thể
4. Bulkhead pattern
```

---

## 5. API Contract Testing

Đảm bảo service provider và consumer đồng thuận về API:

```
Consumer-Driven Contract Testing (Pact):

┌──────────────┐                    ┌──────────────┐
│ Order Service│   Pact Contract    │Payment Service│
│  (Consumer)  │◀──────────────────▶│  (Provider)  │
└──────────────┘                    └──────────────┘

1. Consumer viết test với expected request/response
2. Pact generate contract file
3. Provider verify contract
4. Nếu provider thay đổi API → contract test fail → phát hiện breaking change
```

---

## 6. Tổng kết

| Pattern | Use Case |
|---------|----------|
| REST | External API, browser, simple CRUD |
| gRPC | Internal service comms, high performance, streaming |
| REST + gRPC | REST cho external, gRPC cho internal |
| Timeout | Bắt buộc cho mọi sync call |
| Contract Testing | Đảm bảo API compatibility giữa services |

> **Bài tiếp theo**: Asynchronous Communication — Message Queue, Event Streaming và khi nào nên dùng async thay vì sync.
