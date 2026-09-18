---
id: 019d8a22-c306-7a10-b001-a1b2c3d4e506
title: 第 6 課：非同步通訊 — 訊息佇列與事件流
slug: bai-6-asynchronous-communication-message-queue-event-streaming
description: 訊息佇列 (RabbitMQ) 與事件流 (Apache Kafka)、發布/訂閱模式、點對點模式、事件模式設計、冪等性以及何時選擇非同步而不是同步。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 6
section_title: 第 2 部分：微服務設計與通訊模式
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: 雲端原生微服務架構
  slug: cloud-native-microservices-architecture
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-9500" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-9500)"/>

  <!-- Decorations -->
  <g>
    <circle cx="819" cy="267" r="12" fill="#818cf8" opacity="0.12000000000000001"/>
    <circle cx="1038" cy="86" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="757" cy="165" r="16" fill="#818cf8" opacity="0.060000000000000005"/>
    <circle cx="976" cy="244" r="33" fill="#818cf8" opacity="0.13"/>
    <circle cx="695" cy="63" r="20" fill="#818cf8" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <line x1="600" y1="237" x2="1100" y2="317" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="267" x2="1050" y2="337" stroke="#818cf8" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1064.712812921102,221 1064.712812921102,253 1037,269 1009.287187078898,253 1009.287187078898,221 1037,205" fill="none" stroke="#818cf8" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ 建築 — 第 6 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 6 課：非同步通訊 —</tspan>
      <tspan x="60" dy="42">訊息隊列和事件流</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">雲端原生微服務架構</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 2 部分：微服務設計與通訊模式</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![第 6 課：非同步通訊 — 訊息佇列與事件流](/storage/uploads/2026/03/cn-bai-6-diagram.webp)

## 簡介

非同步通訊允許服務發送訊息而無需等待回應。這是事件驅動架構的支柱，也是建構鬆散耦合、彈性系統的關鍵。

---

## 1. 為什麼需要非同步通訊？

### 1.1 同步問題

```
Sync chain: Order → Payment → Inventory → Notification
                                              │
Vấn đề:                                      │
├── Temporal coupling: Tất cả phải online cùng lúc        
├── Latency: Total = sum(latency mỗi service)
├── Cascading failure: 1 service down → cả chain fail
└── Tight coupling: Order phải biết Payment, Inventory, ...
```

### 1.2 非同步解決方案

```
Async: Order ──publish event──▶ Message Broker
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
                Payment        Inventory       Notification
                (subscribe)    (subscribe)     (subscribe)

Ưu điểm:
├── Temporal decoupling: Services không cần online cùng lúc
├── Performance: Order trả response ngay, không chờ downstream
├── Loose coupling: Order không biết ai subscribe
└── Resilience: Message broker buffer khi consumer down
```

---

## 2. 訊息佇列－點對點

### 2.1 概念

一個生產者發送一條訊息，**只有一個**消費者接收並處理：

```
Producer ──msg──▶ Queue ──msg──▶ Consumer
                  (FIFO)

Nếu có nhiều consumers → Load balancing (round-robin)
Producer ──▶ Queue ──▶ Consumer 1
                   ──▶ Consumer 2
                   ──▶ Consumer 3
Mỗi message chỉ được xử lý bởi MỘT consumer
```

### 2.2 RabbitMQ

```
┌──────────┐    ┌──────────────────────────────────┐    ┌───────────┐
│ Producer │───▶│           RabbitMQ                │───▶│ Consumer  │
└──────────┘    │                                    │    └───────────┘
                │  ┌──────────┐    ┌──────────────┐ │
                │  │ Exchange │───▶│    Queue      │ │
                │  │ (routing)│    │ (buffer msgs) │ │
                │  └──────────┘    └──────────────┘ │
                └──────────────────────────────────┘

Exchange Types:
├── Direct   → Route by exact routing_key
├── Topic    → Route by pattern (order.* , *.created)
├── Fanout   → Broadcast to all bound queues
└── Headers  → Route by message headers
```

### 2.3 訊息佇列的用例

- **任務佇列**：背景作業（傳送電子郵件，產生報表）
- **工作分配**：在許多工人之間分配工作
- **速率限制**：下游緩慢時緩衝請求
- **延遲處理**：死信交換 + TTL

---

## 3. 事件流——Pub/Sub

### 3.1 概念

生產者**發布事件**，多個消費者群組**訂閱**並**獨立處理**：

```
                              Consumer Group A
                         ┌────▶ Payment Service
                         │
Producer ──▶ Topic ──────┤    Consumer Group B
(Order       (order.     ├────▶ Inventory Service
 Service)     created)   │
                         │    Consumer Group C
                         └────▶ Notification Service

Mỗi consumer group nhận TẤT CẢ messages
Trong một group, messages được phân chia cho các instances
```

### 3.2 Apache Kafka 架構

```
┌────────────────────────────────────────────────────────┐
│                    Kafka Cluster                        │
│                                                         │
│  Topic: order.created                                   │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐          │
│  │ Partition 0│ │ Partition 1│ │ Partition 2│          │
│  │ msg1, msg4 │ │ msg2, msg5 │ │ msg3, msg6 │          │
│  │ msg7, ...  │ │ msg8, ...  │ │ msg9, ...  │          │
│  └────────────┘ └────────────┘ └────────────┘          │
│                                                         │
│  Broker 1         Broker 2         Broker 3             │
│  (Leader P0)     (Leader P1)     (Leader P2)           │
│  (Replica P1)    (Replica P2)    (Replica P0)          │
│                                                         │
│  ZooKeeper / KRaft (metadata management)               │
└────────────────────────────────────────────────────────┘
```

**重要特點：**
- **基於日誌**：訊息僅追加，消費後不會刪除
- **保留**：按時間（預設 7 天）或大小保留訊息
- **Offset**：每個消費者群組追蹤自己的偏移量
- **重播**：消費者可以從任何偏移量重播訊息
- **排序**：保證分區中的順序（不保證跨分區）

### 3.3 主題設計

```
Naming convention: <domain>.<entity>.<event>

order.order.created
order.order.confirmed
order.order.cancelled
payment.payment.completed
payment.payment.failed
inventory.stock.reserved
inventory.stock.released

Partition key:
├── order_id → Đảm bảo events cùng order đi vào cùng partition → đúng thứ tự
├── customer_id → Events cùng customer ordered
└── random → Distribute đều, không đảm bảo ordering
```

---

## 4. 訊息佇列與事件流

|標準|訊息佇列（RabbitMQ）|事件流（Kafka）|
|----------|------------------------------------|------------------------|
| **型號** |點對點（或發布/訂閱）|發布/訂閱（基於日誌）|
| **訊息生命週期** |消耗後刪除 |保留（可設定）|
| **重播** |沒有 |是的 |
| **訂購** |佇列級 FIFO |分割區級|
| **吞吐量** | ~50K 訊息/秒 | ~1M+ 訊息/秒 |
| **消費者群體** |有限公司|原生支援 |
| **用例** |任務佇列、工作分配 |事件流程、稽核日誌、分析 |
| **複雜性** |低|中高|
| **協定** | AMQP |自訂（Kafka 協定）|

### 什麼時候選擇哪一個？

```
RabbitMQ:
├── Background jobs (send email, generate PDF)
├── Request-reply pattern
├── Complex routing rules
├── Low throughput (< 50K msg/s)
└── Team muốn đơn giản, ít learning curve

Kafka:
├── Event sourcing / Event-driven architecture
├── Stream processing (real-time analytics)
├── Audit log (cần replay)
├── High throughput (> 100K msg/s)
├── Multiple consumer groups cho cùng event
└── Data pipeline (connect to data warehouse)
```

---

## 5. 事件架構設計

### 5.1 CloudEvents 規範

標準化事件格式：

```json
{
  "specversion": "1.0",
  "id": "evt-001-abc-def",
  "source": "/services/order-service",
  "type": "com.myorg.order.created",
  "datacontenttype": "application/json",
  "time": "2026-03-31T10:00:00Z",
  "data": {
    "order_id": "O-001",
    "customer_id": "C-042",
    "items": [
      {"product_id": "P-100", "quantity": 2, "price": 250000}
    ],
    "total": 500000,
    "currency": "VND"
  }
}
```

### 5.2 模式演變

當架構發生變化時，需要向後相容：

```
Schema Registry (Confluent / Apicurio):
├── v1: {order_id, customer_id, total}
├── v2: {order_id, customer_id, total, currency}  ← thêm optional field
└── v3: {order_id, customer_id, total, currency, discount}

Quy tắc:
✅ Thêm optional field → backward compatible
✅ Thêm default value cho field mới
❌ Xoá required field → breaking change
❌ Đổi type của field → breaking change
```

---

## 6. 冪等性－處理重複訊息

### 6.1 問題

訊息代理保證**至少一次傳遞** → 消費者可以**多次**接收訊息：

```
Producer ──msg──▶ Broker ──msg──▶ Consumer
                              │      │
                              │  (process OK, nhưng ACK bị mất)
                              │      │
                              └──msg──▶ Consumer (nhận lại!)
```

### 6.2 解：冪等消費者

```sql
-- Lưu event_id đã xử lý
CREATE TABLE processed_events (
    event_id VARCHAR(255) PRIMARY KEY,
    processed_at TIMESTAMP DEFAULT NOW()
);

-- Trong consumer:
BEGIN;
  -- Kiểm tra đã xử lý chưa
  INSERT INTO processed_events (event_id) VALUES ('evt-001')
    ON CONFLICT (event_id) DO NOTHING;

  -- Nếu insert thành công (chưa xử lý) → xử lý business logic
  IF FOUND THEN
    UPDATE inventory SET stock = stock - 1 WHERE product_id = 'P-100';
  END IF;
COMMIT;
```

---

## 7. 總結

|圖案|何時使用 |
|--------|-------------|
|同步（REST/gRPC）|需要立即回應、查詢、簡單的請求-回覆 |
|訊息佇列|後台作業、任務分配、速率緩衝 |
|事件流 |事件驅動、稽核日誌、多個消費者、重播 |
|冪等消費者 |始終為每個非同步消費者實施 |
|架構註冊表|當事件模式需要在不破壞消費者的情況下發展時 |

> **下一篇文章**：API 閘道模式 - 微服務系統的單一入口點，集中處理路由、驗證和速率限制。
