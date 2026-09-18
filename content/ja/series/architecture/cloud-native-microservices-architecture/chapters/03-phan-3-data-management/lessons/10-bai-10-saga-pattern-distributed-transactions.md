---
id: 019d8a22-c310-7a10-b001-a1b2c3d4e510
title: 'レッスン 10: Saga パターン — 分散トランザクション'
slug: bai-10-saga-pattern-distributed-transactions
description: >-
  2PC がマイクロサービス、Saga パターン (コレオグラフィーとオーケストレーション)、補償トランザクション、Saga Orchestrator
  の実装、エラー処理、デッド レター キューに適さない理由。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 10
section_title: 'パート 3: マイクロサービスにおけるデータ管理'
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: クラウドネイティブのマイクロサービスアーキテクチャ
  slug: cloud-native-microservices-architecture
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-2713" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-2713)"/>

  <!-- Decorations -->
  <g>
    <circle cx="706" cy="168" r="34" fill="#2dd4bf" opacity="0.13"/>
    <circle cx="812" cy="214" r="32" fill="#2dd4bf" opacity="0.11"/>
    <circle cx="918" cy="260" r="30" fill="#2dd4bf" opacity="0.09"/>
    <circle cx="1024" cy="46" r="28" fill="#2dd4bf" opacity="0.07"/>
    <circle cx="630" cy="92" r="26" fill="#2dd4bf" opacity="0.05"/>
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
    <line x1="600" y1="88" x2="1100" y2="168" stroke="#2dd4bf" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="118" x2="1050" y2="188" stroke="#2dd4bf" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1025.2390923627308,166.5 1025.2390923627308,209.5 988,231 950.7609076372692,209.5 950.7609076372692,166.5 988,145" fill="none" stroke="#2dd4bf" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#2dd4bf"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#2dd4bf" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#2dd4bf">🏗️ アーキテクチャ — レッスン 10</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 10: サーガ パターン — 分散</tspan>
      <tspan x="60" dy="42">取引</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">クラウドネイティブのマイクロサービスアーキテクチャ</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 3: マイクロサービスにおけるデータ管理</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![レッスン 10: Saga パターン — 分散トランザクション](/storage/uploads/2026/03/cn-bai-10-diagram.webp)

## はじめに

モノリスでは、ビジネス トランザクションに同じ ACID トランザクションに複数のデータベース操作を含めることができます。マイクロサービスでは、各サービスが独自のデータベースを持ちます。**従来の分散トランザクション (2PC) は使用できません**。これは、密結合が生じてパフォーマンスに影響を与えるためです。 Saga パターンは代替案です。

---

## 1. 分散トランザクションの問題

### 1.1 2 フェーズ コミット (2PC) — 不適切な理由

```
2PC Flow:
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Transaction  │    │  Service A   │    │  Service B   │
│ Coordinator  │    │  (Order)     │    │  (Payment)   │
└──────┬───────┘    └──────┬───────┘    └──────┬───────┘
       │                   │                   │
       │── Phase 1: PREPARE ──────────────────▶│
       │◀── VOTE YES ────────────────────────── │
       │── Phase 1: PREPARE ──▶│               │
       │◀── VOTE YES ──────── │               │
       │                      │               │
       │── Phase 2: COMMIT ──▶│               │
       │── Phase 2: COMMIT ──────────────────▶│
       │                      │               │
```

**マイクロサービスにおける 2PC の問題:**

|問題 |説明 |
|----------|----------|
|単一障害点 |コーディネーターが死亡 → すべての参加者がロック |
|パフォーマンスのボトルネック | 2PC 中にリソースをロック |
|密結合 |すべてのサービスを同時に利用できる必要があります |
|スケーラブルではない |ロック競合は参加者の数に応じて増加します。
|ネットワークパーティション |フェーズ 1 とフェーズ 2 の間でネットワークが切断された場合 → 不整合状態 |

### 1.2 CAP 定理の繰り返し

分散システムでは、3 つのうち 2 つだけを達成できます。
- **一貫性**: すべての読み取りが最新の書き込みを返します。
- **可用性**: すべてのリクエストは応答を受け取ります
- **分割耐性**: ネットワークが分割されていてもシステムは動作し続けます。

マイクロサービスは **AP (可用性 + パーティション許容値)** を選択し、**結果整合性** を受け入れます。

---

## 2. サーガパターン

### 2.1 概念

Saga は一連の **ローカル トランザクション** であり、各トランザクションはサービスによって実行されます。ステップが失敗した場合、サガは**補償トランザクション**を実行して前のステップを元に戻します。

```
Saga = T1 → T2 → T3 → ... → Tn

Nếu Ti fail:
  Compensate: C(i-1) → C(i-2) → ... → C1

Ví dụ Order Saga:
  T1: Create Order (status: PENDING)
  T2: Reserve Payment
  T3: Reserve Inventory
  T4: Confirm Order (status: CONFIRMED)

Nếu T3 fail:
  C2: Refund Payment
  C1: Cancel Order (status: CANCELLED)
```

### 2.2 補償取引

物語内の各トランザクションには、対応する**補償トランザクション**が必要です。

|ステップ |アクション |補償アクション |
|------|--------|--------|
| T1 |注文の作成 |注文をキャンセル |
| T2 |予約支払い |払い戻し |
| T3 |在庫を予約する |リリースインベントリ |
| T4 |発送スケジュール |配送をキャンセル |
| T5 |確認メールを送信 |キャンセルメールを送信 |

**重要な注意事項:**
- 補償トランザクションは **冪等** である必要があります (複数回実行しても同じ結果になります)
- 補償トランザクション **失敗できません** (成功するまで再試行する必要があります)
- 一部のアクションは補償できません（送信済みメールの送信など） → 「セマンティックアンドゥ」を使用（キャンセルされたメールを送信）

---

## 3. 振付サーガ

### 3.1 概念

各サービスはローカル トランザクションの完了時に **イベントをパブリッシュ**し、次のサービスは **サブスクライブ**して次の処理を行います。

```
┌──────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Order   │    │   Payment    │    │  Inventory   │    │  Shipping    │
│  Service │    │   Service    │    │  Service     │    │  Service     │
└────┬─────┘    └──────┬───────┘    └──────┬───────┘    └──────┬───────┘
     │                 │                   │                   │
     │── OrderCreated ▶│                   │                   │
     │                 │── PaymentReserved ▶│                   │
     │                 │                   │── InventoryReserved ▶│
     │                 │                   │                   │── ShipmentScheduled
     │◀───────────────────────────────────────────────────────── │
     │  OrderConfirmed │                   │                   │
     │                 │                   │                   │
     │ === FAILURE === │                   │                   │
     │                 │                   │── InventoryFailed ▶│
     │                 │◀─ CompensatePayment─                  │
     │◀─ PaymentRefunded─                  │                   │
     │  OrderCancelled │                   │                   │
```

### 3.2 実装例

```java
// Order Service — publishes OrderCreated
@Service
public class OrderService {

    @Transactional
    public Order createOrder(CreateOrderCommand cmd) {
        Order order = new Order(cmd.getCustomerId(), cmd.getItems());
        order.setStatus(OrderStatus.PENDING);
        orderRepository.save(order);

        // Publish event
        eventPublisher.publish(new OrderCreatedEvent(
            order.getId(),
            order.getCustomerId(),
            order.getItems(),
            order.getTotalAmount()
        ));

        return order;
    }

    // Compensating handler
    @EventHandler
    public void on(PaymentFailedEvent event) {
        Order order = orderRepository.findById(event.getOrderId());
        order.setStatus(OrderStatus.CANCELLED);
        order.setFailureReason(event.getReason());
        orderRepository.save(order);
    }
}

// Payment Service — listens to OrderCreated
@Service
public class PaymentService {

    @EventHandler
    public void on(OrderCreatedEvent event) {
        try {
            Payment payment = paymentGateway.reserve(
                event.getCustomerId(),
                event.getTotalAmount()
            );
            eventPublisher.publish(new PaymentReservedEvent(
                event.getOrderId(),
                payment.getId()
            ));
        } catch (InsufficientFundsException e) {
            eventPublisher.publish(new PaymentFailedEvent(
                event.getOrderId(),
                "Insufficient funds"
            ));
        }
    }
}
```

### 3.3 メリットとデメリット

|利点 |デメリット |
|----------|----------|
|サービス間の疎結合 |複雑なフローを追跡するのが難しい |
|シンプルで少ない手順の物語 |循環依存関係が発生する可能性があります。
|単一障害点はありません |エラーがあるとデバッグが困難 |
|イベント駆動型アーキテクチャによる自然な |複雑なテスト |

---

## 4. オーケストレーションの物語

### 4.1 概念

中央の **Saga Orchestrator** がワークフロー全体を調整し、各サービスにコマンドを送信して応答を処理します。

```
                    ┌──────────────────────┐
                    │  Order Saga          │
                    │  Orchestrator        │
                    │                      │
                    │  State Machine:      │
                    │  CREATED             │
                    │  → PAYMENT_PENDING   │
                    │  → INVENTORY_PENDING │
                    │  → SHIPPING_PENDING  │
                    │  → CONFIRMED         │
                    │  or → COMPENSATING   │
                    │  → CANCELLED         │
                    └────────┬─────────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
     ┌──────▼──────┐  ┌─────▼──────┐  ┌──────▼──────┐
     │  Payment    │  │ Inventory  │  │  Shipping   │
     │  Service    │  │ Service    │  │  Service    │
     └─────────────┘  └────────────┘  └─────────────┘
```

### 4.2 ステートマシンの実装

```java
public class OrderSaga {

    public enum State {
        CREATED,
        PAYMENT_PENDING,
        PAYMENT_RESERVED,
        INVENTORY_PENDING,
        INVENTORY_RESERVED,
        SHIPPING_PENDING,
        CONFIRMED,
        COMPENSATING_INVENTORY,
        COMPENSATING_PAYMENT,
        CANCELLED
    }

    @Autowired
    private SagaRepository sagaRepository;

    public void start(CreateOrderCommand cmd) {
        SagaState saga = new SagaState(cmd.getOrderId(), State.CREATED);
        sagaRepository.save(saga);
        
        // Step 1: Reserve Payment
        saga.setState(State.PAYMENT_PENDING);
        commandGateway.send(new ReservePaymentCommand(
            cmd.getOrderId(), cmd.getAmount()
        ));
    }

    @SagaEventHandler
    public void on(PaymentReservedEvent event) {
        SagaState saga = sagaRepository.findByOrderId(event.getOrderId());
        saga.setState(State.INVENTORY_PENDING);
        
        // Step 2: Reserve Inventory
        commandGateway.send(new ReserveInventoryCommand(
            event.getOrderId(), saga.getItems()
        ));
    }

    @SagaEventHandler
    public void on(InventoryReservedEvent event) {
        SagaState saga = sagaRepository.findByOrderId(event.getOrderId());
        saga.setState(State.SHIPPING_PENDING);
        
        // Step 3: Schedule Shipping
        commandGateway.send(new ScheduleShippingCommand(
            event.getOrderId(), saga.getAddress()
        ));
    }

    @SagaEventHandler
    public void on(ShipmentScheduledEvent event) {
        SagaState saga = sagaRepository.findByOrderId(event.getOrderId());
        saga.setState(State.CONFIRMED);
        
        commandGateway.send(new ConfirmOrderCommand(event.getOrderId()));
    }

    // === COMPENSATION ===
    
    @SagaEventHandler
    public void on(InventoryReservationFailedEvent event) {
        SagaState saga = sagaRepository.findByOrderId(event.getOrderId());
        saga.setState(State.COMPENSATING_PAYMENT);
        
        // Compensate: Refund Payment
        commandGateway.send(new RefundPaymentCommand(
            event.getOrderId(), saga.getPaymentId()
        ));
    }

    @SagaEventHandler
    public void on(PaymentRefundedEvent event) {
        SagaState saga = sagaRepository.findByOrderId(event.getOrderId());
        saga.setState(State.CANCELLED);
        
        commandGateway.send(new CancelOrderCommand(
            event.getOrderId(), "Inventory not available"
        ));
    }
}
```

### 4.3 メリットとデメリット

|利点 |デメリット |
|----------|----------|
|わかりやすいワークフロー（一元化） |オーケストレーターは単一障害点です |
|デバッグと監視が簡単 |神クラスのリスク（論理的すぎる） |
|ステップの追加/削除が簡単 |オーケストレーターとサービス間の結合 |
|補償ロジックを明確に |永続的な saga 状態が必要 |

---

## 5. コレオグラフィーとオーケストレーションを比較する

|基準 |振付 |オーケストレーション |
|----------|---------------|----------|
|カップリング |非常に緩い |中 (オーケストレーター経由) |
|複雑さ |サービス数に応じて増加 |オーケストレーターに焦点を当てる |
|可視性 |全体の流れが見えにくい｜ステートマシンで明示的に |
|障害対応 |分散 |フォーカス |
|テスト |難しい（分散） |より簡単 (テスト オーケストレーター) |
|スケーラビリティ |良い |良い (オーケストレーター無国籍) |
| **推奨** | **≤ 佐賀のサービスは 4 つまで** | **> 4 つのサービスまたは複雑なフロー** |

---

## 6. エラー処理とデッドレターキュー

### 6.1 デッドレターキュー (DLQ)

複数回再試行しても処理できないメッセージは DLQ に渡されます。

```
                    ┌─────────────┐
                    │  Main Queue │
                    │ (order.cmds)│
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │  Consumer   │
                    │  (Service)  │
                    └──────┬──────┘
                           │
                  Success? ─┼─ No (after max retries)
                  │         │
                  ▼         ▼
               ┌─────┐  ┌──────────┐
               │ ACK │  │   DLQ    │
               └─────┘  │(order.   │
                         │ cmds.dlq)│
                         └──────────┘
                              │
                         ┌────▼────┐
                         │ Alert + │
                         │ Manual  │
                         │ Review  │
                         └─────────┘
```

### 6.2 べき等性

同じ結果を得るために、必ずメッセージを複数回処理してください。

```java
@Service
public class PaymentService {

    @EventHandler
    public void on(ReservePaymentCommand cmd) {
        // Idempotency check
        String idempotencyKey = "payment:" + cmd.getOrderId();
        if (processedStore.exists(idempotencyKey)) {
            log.info("Already processed payment for order {}", cmd.getOrderId());
            return; // Skip duplicate
        }

        Payment payment = processPayment(cmd);

        // Mark as processed
        processedStore.save(idempotencyKey, payment.getId());
    }
}
```

### 6.3 サーガタイムアウト

```java
public class OrderSaga {

    @SagaTimeout(duration = "5m")
    public void onTimeout(SagaState saga) {
        log.warn("Saga timeout for order {}", saga.getOrderId());
        
        // Compensate based on current state
        switch (saga.getState()) {
            case INVENTORY_PENDING:
                compensatePayment(saga);
                break;
            case SHIPPING_PENDING:
                compensateInventory(saga);
                compensatePayment(saga);
                break;
        }
        
        saga.setState(State.CANCELLED);
        saga.setFailureReason("Saga timeout");
    }
}
```

---

## 7. ベストプラクティス

### 7.1 Saga の設計ガイドライン

```
1. Mỗi step phải có compensating action
2. Compensating actions phải idempotent
3. Sử dụng correlation ID (saga ID) xuyên suốt
4. Persist saga state (survive service restart)
5. Set timeout cho mỗi saga instance
6. Monitor saga metrics (success rate, duration, failure reasons)
7. DLQ cho messages không xử lý được
8. Tránh saga quá nhiều steps (> 7 steps → xem lại design)
```

### 7.2 コリオグラフィーかオーケストレーションを選択しますか?

```
Flow đơn giản (2-4 services)?
  └── Choreography

Flow phức tạp (> 4 services, conditional logic)?
  └── Orchestration

Cần visibility cao vào business process?
  └── Orchestration

Muốn minimize coupling?
  └── Choreography

Team experience với event-driven?
  ├── Nhiều → Choreography
  └── Ít → Orchestration
```

---

## 概要

- **2PC** は密結合とロック競合のため、マイクロサービスには適していません
- **Saga パターン** は、ローカル トランザクション + 補償トランザクションのチェーンを使用します
- **コレオグラフィー**: サービスはイベントを介して分散的に通信します。
- **オーケストレーション**: Saga Orchestrator はステート マシンを通じて一元的に調整します。
- 補償トランザクションは **冪等** である必要があり、**失敗してはなりません**
- エラー処理には **DLQ**、**タイムアウト**、**冪等性**を使用します
