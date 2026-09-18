---
id: 019d8a22-c306-7a10-b001-a1b2c3d4e506
title: 'レッスン 6: 非同期通信 — メッセージ キューとイベント ストリーミング'
slug: bai-6-asynchronous-communication-message-queue-event-streaming
description: >-
  メッセージ キュー (RabbitMQ) とイベント ストリーミング (Apache Kafka)、Pub/Sub パターン、ポイントツーポイント
  パターン、イベント スキーマ設計、冪等性、および同期ではなく非同期を選択する場合。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 6
section_title: 'パート 2: マイクロサービスの設計と通信パターン'
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: クラウドネイティブのマイクロサービスアーキテクチャ
  slug: cloud-native-microservices-architecture
locale: ja
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ アーキテクチャ — レッスン 6</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 6: 非同期通信 —</tspan>
      <tspan x="60" dy="42">メッセージキューとイベントストリーミング</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">クラウドネイティブのマイクロサービスアーキテクチャ</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 2: マイクロサービスの設計と通信パターン</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![レッスン 6: 非同期通信 — メッセージ キューとイベント ストリーミング](/storage/uploads/2026/03/cn-bai-6-diagram.webp)

## はじめに

非同期通信により、サービスは応答を待たずにメッセージを送信できます。これはイベント駆動型アーキテクチャのバックボーンであり、疎結合で回復力のあるシステムを構築するための鍵です。

---

## 1. 非同期通信が必要なのはなぜですか?

### 1.1 同期の問題

```
Sync chain: Order → Payment → Inventory → Notification
                                              │
Vấn đề:                                      │
├── Temporal coupling: Tất cả phải online cùng lúc        
├── Latency: Total = sum(latency mỗi service)
├── Cascading failure: 1 service down → cả chain fail
└── Tight coupling: Order phải biết Payment, Inventory, ...
```

### 1.2 非同期ソリューション

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

## 2. メッセージ キュー — ポイントツーポイント

### 2.1 概念

1 つのプロデューサーがメッセージを送信し、**1 つのコンシューマーのみ** が受信して処理します。

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

### 2.3 メッセージ キューの使用例

- **タスク キュー**: バックグラウンド ジョブ (電子メールの送信、レポートの生成)
- **作業分散**: 多くの作業者に作業を分割します。
- **レート制限**: ダウンストリームが遅い場合のリクエストをバッファーします。
- **遅延処理**: デッドレター交換 + TTL

---

## 3. イベント ストリーミング — Pub/Sub

### 3.1 概念

プロデューサー **イベントをパブリッシュ**、複数のコンシューマー グループが**サブスクライブ**し、**独立して処理**:

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

### 3.2 Apache Kafka アーキテクチャ

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

**重要な機能:**
- **ログベース**: メッセージは追加のみであり、消費後に削除されません。
- **保持**: 時間 (デフォルトは 7 日間) またはサイズに基づいてメッセージを保持します。
- **オフセット**: 各コンシューマ グループは独自のオフセットを追跡します
- **再生**: コンシューマは任意のオフセットからメッセージを再生できます。
- **順序**: パーティション内の順序を保証します (パーティション間の順序は保証しません)

### 3.3 トピックのデザイン

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

## 4. メッセージ キューとイベント ストリーミング

|基準 |メッセージキュー (RabbitMQ) |イベントストリーミング (Kafka) |
|----------|--------------------------|---------------|
| **モデル** |ポイントツーポイント (または Pub/Sub) | Pub/Sub (ログベース) |
| **メッセージの有効期間** |消費後に削除されました |保持 (構成可能) |
| **リプレイ** |いいえ |はい |
| **注文** |キューレベルの FIFO |パーティションレベル |
| **スループット** | ~50,000 メッセージ/秒 | ~100万以上のメッセージ/秒 |
| **消費者グループ** |限定 |ネイティブサポート |
| **使用例** |タスクキュー、作業分散 |イベントストリーミング、監査ログ、分析 |
| **複雑さ** |低い |中～高 |
| **プロトコル** | AMQP |カスタム (Kafka プロトコル) |

### いつどれを選択すればよいでしょうか?

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

## 5. イベントスキーマの設計

### 5.1 CloudEvents 仕様

イベント形式を標準化する:

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

### 5.2 スキーマの進化

スキーマが変更されると、下位互換性が必要になります。

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

## 6. 冪等 — 重複したメッセージを処理します

### 6.1 問題

メッセージ ブローカーは **少なくとも 1 回の配信**を保証します → 消費者はメッセージを **何度も受信できます**:

```
Producer ──msg──▶ Broker ──msg──▶ Consumer
                              │      │
                              │  (process OK, nhưng ACK bị mất)
                              │      │
                              └──msg──▶ Consumer (nhận lại!)
```

### 6.2 解決策: べき等なコンシューマ

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

## 7. まとめ

|パターン |いつ使用するか |
|----------|---------------|
|同期 (REST/gRPC) |即時応答、クエリ、単純な要求と応答が必要 |
|メッセージキュー |バックグラウンド ジョブ、タスク分散、レート バッファリング |
|イベントストリーミング |イベント駆動型、監査ログ、複数のコンシューマ、リプレイ |
|べき等コンシューマ |すべての非同期コンシューマーに対して常に実装する |
|スキーマレジストリ |コンシューマを壊さずにイベント スキーマを進化させる必要がある場合 |

> **次の記事**: API ゲートウェイ パターン — ルーティング、認証、レート制限を一元的に処理する、マイクロサービス システムの単一のエントリ ポイント。
