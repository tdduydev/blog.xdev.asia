---
id: 019d8a22-c305-7a10-b001-a1b2c3d4e505
title: 'レッスン 5: 同期通信 — REST API と gRPC'
slug: bai-5-synchronous-communication-rest-api-grpc
description: >-
  REST API 設計のベスト プラクティス、gRPC と Protobuf、HTTP/2 多重化、REST と gRPC
  の比較、どちらを選択するか、API のバージョン管理戦略。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 5
section_title: 'パート 2: マイクロサービスの設計と通信パターン'
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: クラウドネイティブのマイクロサービスアーキテクチャ
  slug: cloud-native-microservices-architecture
locale: ja
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#38bdf8">🏗️ アーキテクチャ — レッスン 5</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 5: 同期通信 — REST</tspan>
      <tspan x="60" dy="42">API と gRPC</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">クラウドネイティブのマイクロサービスアーキテクチャ</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 2: マイクロサービスの設計と通信パターン</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![レッスン 5: 同期通信 — REST API と gRPC](/storage/uploads/2026/03/cn-bai-5-diagram.webp)

## はじめに

同期通信はリクエスト/レスポンス モデルです。クライアントはリクエストを送信し、サーバーの応答を待ちます。 REST と gRPC は、内部サービス間通信の 2 つの最も一般的な選択肢です。

---

## 1. REST API

### 1.1 RESTful 設計原則

REST (Representational State Transfer) は、HTTP メソッドを使用してリソースを操作します。

```
GET    /api/v1/orders          → Liệt kê đơn hàng
GET    /api/v1/orders/{id}     → Chi tiết đơn hàng
POST   /api/v1/orders          → Tạo đơn hàng mới
PUT    /api/v1/orders/{id}     → Cập nhật toàn bộ
PATCH  /api/v1/orders/{id}     → Cập nhật một phần
DELETE /api/v1/orders/{id}     → Xoá đơn hàng
```

### 1.2 ベストプラクティス

**命名規則:**
```
✅ /api/v1/orders                    # Noun, plural
✅ /api/v1/orders/{id}/items         # Nested resource
✅ /api/v1/orders?status=pending     # Filtering via query params

❌ /api/v1/getOrders                 # Verb in URL
❌ /api/v1/order                     # Singular
❌ /api/v1/orders/getByStatus/pending # Logic in URL
```

**HTTP ステータス コード:**
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

**ページネーション:**
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

### 1.3 API のバージョン管理

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

以前のコントラクト API (API First) を定義します。

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

### 2.1 概要

gRPC は、Google によって開発された RPC (リモート プロシージャ コール) フレームワークであり、以下を使用します。
- **プロトコル バッファー (Protobuf)** — バイナリ シリアル化
- **HTTP/2** — 多重化、サーバープッシュ、ヘッダー圧縮

```
Order Service                     Inventory Service
┌──────────────┐                  ┌──────────────┐
│              │  gRPC/HTTP2      │              │
│  gRPC Client │──────────────────▶  gRPC Server │
│  (generated) │  Protobuf binary │  (generated) │
│              │◀─────────────────│              │
└──────────────┘                  └──────────────┘
```

### 2.2 プロトコルバッファ

サービス契約を定義する `.proto` ファイル:

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

### 2.3 gRPC 通信パターン

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

### 2.4 コード生成

から `.proto` ファイルに含めると、すべての言語のコードが自動的に生成されます。

```bash
# Go
protoc --go_out=. --go-grpc_out=. proto/inventory.proto

# Java
protoc --java_out=. --grpc-java_out=. proto/inventory.proto

# TypeScript
protoc --ts_out=. proto/inventory.proto
```

---

## 3. REST と gRPC の比較

|基準 |休憩 | gRPC |
|----------|----------|----------|
| **プロトコル** | HTTP/1.1 (または 2) | HTTP/2 |
| **形式** | JSON (テキスト) | Protobuf (バイナリ) |
| **パフォーマンス** |遅い (~2 ～ 10 倍) |より速く |
| **ペイロードサイズ** |大 (JSON 冗長) |小さい (JSON の約 30%) |
| **ストリーミング** |ネイティブではありません |フルサポート |
| **コード生成** |マニュアル / OpenAPI コード生成 |内蔵、成熟 |
| **ブラウザのサポート** |ネイティブ | gRPC-Web プロキシが必要 |
| **デバッグ** |人間が読める |難しい（バイナリ） |
| **ツーリング** |郵便屋さん、カール、... | grpurl、ブルームRPC |
| **学習曲線** |低い |平均 |
| **契約** |オプション (OpenAPI) |必須 (.proto) |

### 3.1 REST を選択するのはどのような場合ですか?

- クライアント/ブラウザ/モバイル用の外部 API
- サードパーティ統合用のパブリック API
- シンプルなCRUD操作
- チームは gRPC に慣れていない

### 3.2 gRPC を選択するのはどのような場合ですか?

- 内部サービス間通信
- 高いパフォーマンス要件 (低遅延、高スループット)
- ストリーミングの使用例 (リアルタイム更新、IoT)
- 多言語環境 (多くの言語、コード生成が必要)
- 厳格な契約執行

### 3.3 一般的なパターン: REST は外側、gRPC は内側

```
┌──────────┐     REST/JSON     ┌──────────────┐     gRPC/Protobuf     ┌─────────────┐
│  Client  │──────────────────▶│ API Gateway  │─────────────────────▶│ Internal    │
│ (Browser)│◀──────────────────│              │◀─────────────────────│ Services    │
└──────────┘                   └──────────────┘                      └─────────────┘
```

---

## 4. 同期通信でのエラー処理

### 4.1 タイムアウト

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

**ルール**: 送信リクエストごとに常にタイムアウトを設定し、無期限に待機しないでください。

### 4.2 カスケード障害

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

## 5. API コントラクトのテスト

サービスプロバイダーとコンシューマーが API について同意していることを確認してください。

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

## 6. まとめ

|パターン |使用例 |
|----------|----------|
|休憩 |外部 API、ブラウザ、単純な CRUD |
| gRPC |内部サービス通信、高性能、ストリーミング |
| REST + gRPC |外部用は REST、内部用は gRPC |
|タイムアウト |すべての同期呼び出しに必須 |
|契約テスト |サービス間の API 互換性を確保する |

> **次の記事**: 非同期通信 — メッセージ キュー、イベント ストリーミング、および同期ではなく非同期を使用する場合。
