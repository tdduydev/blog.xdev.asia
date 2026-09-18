---
id: 019d8a22-c310-7a10-b001-a1b2c3d4e510
title: 第 10 課：Saga 模式 — 分散式事務
slug: bai-10-saga-pattern-distributed-transactions
description: 為什麼 2PC 不適合微服務、Saga 模式（編排與編排）、補償事務、Saga Orchestrator 實作、錯誤處理和死信佇列。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 10
section_title: 第 3 部分：微服務中的資料管理
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: 雲端原生微服務架構
  slug: cloud-native-microservices-architecture
locale: zh-tw
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#2dd4bf">🏗️ 建築 — 第 10 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 10 課：Saga 模式 — 分佈式</tspan>
      <tspan x="60" dy="42">交易</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">雲端原生微服務架構</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 3 部分：微服務中的資料管理</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![第 10 課：Saga 模式 — 分散式事務](/storage/uploads/2026/03/cn-bai-10-diagram.webp)

## 簡介

在整體架構中，業務事務可以在同一個 ACID 事務中包含多個資料庫操作。在微服務中，每個服務都有自己的資料庫－**不能使用傳統的分散式交易（2PC）**，因為它會產生緊密耦合並影響效能。傳奇模式是一種替代方案。

---

## 1. 分散式事務的問題

### 1.1 兩階段提交（2PC）－為什麼不適合

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

**微服務中的2PC問題：**

|問題 |說明|
|--------|------------|
|單點故障|協調員死亡 → 所有參與者均被鎖定 |
|效能瓶頸| 2PC 期間鎖定資源 |
|緊密耦合 |所有服務必須同時可用 |
|不可擴展|鎖爭用隨著參與者數量的增加而增加 |
|網路分區|如果網路在階段 1 與階段 2 之間中斷 → 狀態不一致 |

### 1.2 CAP 定理重複

在分散式系統中，只能實現三分之二：
- **一致性**：每次讀取都會傳回最新的寫入
- **可用性**：每個請求都會收到回應
- **分區容錯**：網路分裂時系統繼續運作

微服務選擇**AP（可用性+分割區容錯）**→接受**最終一致性**。

---

## 2.傳奇模式

### 2.1 概念

Saga 是一系列**本地事務**，每個事務都由一個服務執行。如果某個步驟失敗，saga 會執行**補償交易**來撤銷先前的步驟。

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

### 2.2 補償交易

saga中的每筆交易都必須有一個相應的**補償交易**：

|步驟|行動|補償行動|
|--------|--------|--------------------|
| T1 |建立訂單 |取消訂單 |
| T2 |預訂付款 |退款付款 |
| T3 |儲備庫存 |發布庫存 |
| T4 |出貨時間表 |取消運送 |
| T5|傳送確認電子郵件 |傳送取消電子郵件 |

**重要說明：**
- 補償事務必須是**冪等**（多次運行具有相同的結果）
- 補償事務**不能失敗**（必須重試直到成功）
- 某些操作無法補償（例如，發送已發送的電子郵件）→使用「語意撤銷」（發送已取消的電子郵件）

---

## 3.編舞傳奇

### 3.1 概念

每個服務**發布事件**當完成本地事務時，下一個服務**訂閱**並處理：

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

### 3.2 實作範例

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

### 3.3 優點和缺點

|優勢 |缺點 |
|--------|------------|
|服務之間的鬆散耦合|難以追蹤複雜的流程|
|簡單，步驟少 | 傳奇故事可能會發生循環依賴 |
|不存在單點故障|出現錯誤時難以除錯 |
|事件驅動架構自然而然 |複雜測試|

---

## 4.編排傳奇

### 4.1 概念

中央 **Saga Orchestrator** 協調整個工作流程，向每個服務發送命令並處理回應：

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

### 4.2 狀態機實現

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

### 4.3 優點和缺點

|優勢 |缺點 |
|--------|------------|
|易於理解的工作流程（集中式）| Orchestrator 存在單點故障 |
|易於調試和監控|神級風險（邏輯太多）|
|易於新增/刪除步驟 |編排器與服務之間的耦合 |
|薪酬邏輯清晰|需要持久的 saga 狀態 |

---

## 5. 比較編排與編排

|標準|編舞|編排|
|----------|-------------|----------------|
|聯軸器|很寬鬆|媒介（透過協調器）|
|複雜性 |服務數量增加 |專注於編排器 |
|能見度|整體流程難以看清 |明確地在狀態機中 |
|故障處理|驅散|焦點 |
|測試|困難（分散式）|更容易（測試協調器）|
|可擴展性|好 |好（編曲家無國籍）|
| **推薦** | **傳奇中≤ 4 個服務** | **> 4 項服務或複雜流程** |

---

## 6. 錯誤處理與死信佇列

### 6.1 死信佇列（DLQ）

多次重試仍無法處理的訊息傳入DLQ：

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

### 6.2 冪等性

確保多次處理該訊息以獲得相同的結果：

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

### 6.3 傳奇超時

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

## 7. 最佳實踐

### 7.1 Saga 設計指南

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

### 7.2 選擇編排還是編排？

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

## 總結

- 由於緊密耦合和鎖爭用，**2PC** 不適合微服務
- **Saga模式**使用本地交易鏈+補償交易
- **編排**：服務透過事件進行通信，分散
- **編排**：Saga Orchestrator 透過狀態機集中協調
- 補償事務必須**冪等**且**不能失敗**
- 使用**DLQ**、**逾時**和**冪等性**進行錯誤處理
