---
id: 019d8a22-c305-7a10-b001-a1b2c3d4e505
title: 第 5 課：同步通訊 — REST API 和 gRPC
slug: bai-5-synchronous-communication-rest-api-grpc
description: REST API 設計最佳實務、gRPC 與 Protobuf、HTTP/2 多重化、比較 REST 與 gRPC、何時選擇哪一種、API 版本控制策略。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 5
section_title: 第 2 部分：微服務設計與通訊模式
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: 雲端原生微服務架構
  slug: cloud-native-microservices-architecture
locale: zh-tw
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#38bdf8">🏗️ 建築 — 第 5 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 5 課：同步通訊 — REST</tspan>
      <tspan x="60" dy="42">API 和 gRPC</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">雲端原生微服務架構</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 2 部分：微服務設計與通訊模式</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![第 5 課：同步通訊 — REST API 和 gRPC](/storage/uploads/2026/03/cn-bai-5-diagram.webp)

## 簡介

同步通訊是一種請求-回應模型：客戶端發送請求，等待伺服器回應。 REST 和 gRPC 是內部服務間通訊的兩種最受歡迎的選擇。

---

## 1.REST API

### 1.1 RESTful 設計原則

REST（表述性狀態傳輸）使用 HTTP 方法來操作資源：

```
GET    /api/v1/orders          → Liệt kê đơn hàng
GET    /api/v1/orders/{id}     → Chi tiết đơn hàng
POST   /api/v1/orders          → Tạo đơn hàng mới
PUT    /api/v1/orders/{id}     → Cập nhật toàn bộ
PATCH  /api/v1/orders/{id}     → Cập nhật một phần
DELETE /api/v1/orders/{id}     → Xoá đơn hàng
```

### 1.2 最佳實踐

**命名約定：**
```
✅ /api/v1/orders                    # Noun, plural
✅ /api/v1/orders/{id}/items         # Nested resource
✅ /api/v1/orders?status=pending     # Filtering via query params

❌ /api/v1/getOrders                 # Verb in URL
❌ /api/v1/order                     # Singular
❌ /api/v1/orders/getByStatus/pending # Logic in URL
```

**HTTP 狀態代碼：**
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

**分頁：**
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

### 1.3 API 版本控制

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

定義之前的合約API（API First）：

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

## 2.gRPC

### 2.1 概述

gRPC 是 Google 開發的 RPC（遠端過程呼叫）框架，使用：
- **協定緩衝區 (Protobuf)** — 二進位序列化
- **HTTP/2** — 多工、伺服器推送、標頭壓縮

```
Order Service                     Inventory Service
┌──────────────┐                  ┌──────────────┐
│              │  gRPC/HTTP2      │              │
│  gRPC Client │──────────────────▶  gRPC Server │
│  (generated) │  Protobuf binary │  (generated) │
│              │◀─────────────────│              │
└──────────────┘                  └──────────────┘
```

### 2.2 協定緩衝區

定義服務合約 `.proto` 文件：

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

### 2.3 gRPC 通訊模式

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

### 2.4 程式碼生成

來自 `.proto` 文件，自動產生所有語言的程式碼：

```bash
# Go
protoc --go_out=. --go-grpc_out=. proto/inventory.proto

# Java
protoc --java_out=. --grpc-java_out=. proto/inventory.proto

# TypeScript
protoc --ts_out=. proto/inventory.proto
```

---

## 3.REST 與 gRPC

|標準|休息 | gRPC |
|----------|--------|--------|
| **協定** | HTTP/1.1（或2）| HTTP/2 |
| **格式** | JSON（文字）| Protobuf（二進位）|
| **性能** |較慢 (~2-10x) |更快 |
| **有效負載大小** |大（JSON 詳細）|小（約 JSON 的 30%）|
| **串流媒體** |非本土 |全力支持 |
| **程式碼生成** |手冊 / OpenAPI 程式碼生成 |內置，成熟|
| **瀏覽器支援** |本地 |需要 gRPC-Web 代理 |
| **調試** |人類可讀 |困難（二進制）|
| **工具** |郵差、捲曲、... | grpcurl、BloomRPC |
| **學習曲線** |低|平均 |
| **合約** |可選（OpenAPI）|必需（.proto）|

### 3.1 何時選擇休息？

- 客戶端/瀏覽器/行動裝置的外部API
- 用於第三方整合的公共API
- 簡單的CRUD操作
- 團隊不熟悉 gRPC

### 3.2 什麼時候選擇gRPC？

- 內部服務間通信
- 高效能需求（低延遲、高吞吐量）
- 串流媒體用例（即時更新、物聯網）
- 多語言環境（多種語言，需要程式碼產生）
- 嚴格合約執行

### 3.3 流行模式：外REST，內gRPC

```
┌──────────┐     REST/JSON     ┌──────────────┐     gRPC/Protobuf     ┌─────────────┐
│  Client  │──────────────────▶│ API Gateway  │─────────────────────▶│ Internal    │
│ (Browser)│◀──────────────────│              │◀─────────────────────│ Services    │
└──────────┘                   └──────────────┘                      └─────────────┘
```

---

## 4. 同步通訊中的錯誤處理

### 4.1 逾時

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

**規則**：始終為每個傳出請求設定逾時，切勿無限期等待。

### 4.2 級聯故障

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

## 5. API 合約測試

確保服務提供者和消費者就 API 達成一致：

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

## 6. 總結

|圖案|使用案例|
|--------|----------|
|休息 |外部API、瀏覽器、簡單CRUD |
| gRPC |內部服務通訊、高效能、串流 |
| REST + gRPC | REST 用於外部，gRPC 用於內部 |
|逾時 |所有同步呼叫都需要 |
|合約測試|確保服務之間的 API 相容性 |

> **下一篇文章**：非同步通訊 - 訊息佇列、事件流以及何時使用非同步而不是同步。
