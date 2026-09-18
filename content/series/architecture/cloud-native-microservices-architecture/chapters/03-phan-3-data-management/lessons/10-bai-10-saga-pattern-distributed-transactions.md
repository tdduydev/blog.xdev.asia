---
id: 019d8a22-c310-7a10-b001-a1b2c3d4e510
title: "Bài 10: Saga Pattern — Distributed Transactions"
slug: bai-10-saga-pattern-distributed-transactions
description: >-
  Tại sao 2PC không phù hợp cho microservices, Saga Pattern (Choreography
  vs Orchestration), compensating transactions, Saga Orchestrator implementation,
  error handling và dead letter queue.
duration_minutes: 120
is_free: true
video_url: null
sort_order: 10
section_title: "Phần 3: Data Management trong Microservices"
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: "Cloud Native Microservices Architecture"
  slug: cloud-native-microservices-architecture
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#2dd4bf">🏗️ Kiến trúc — Bài 10</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 10: Saga Pattern — Distributed</tspan>
      <tspan x="60" dy="42">Transactions</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Cloud Native Microservices Architecture</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 3: Data Management trong Microservices</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Bài 10: Saga Pattern — Distributed Transactions](/storage/uploads/2026/03/cn-bai-10-diagram.webp)

## Giới thiệu

Trong monolith, một business transaction có thể bao gồm nhiều database operations trong cùng một ACID transaction. Trong microservices, mỗi service có database riêng — **không thể dùng distributed transaction truyền thống (2PC)** vì nó tạo tight coupling và ảnh hưởng performance. Saga Pattern là giải pháp thay thế.

---

## 1. Vấn đề với Distributed Transactions

### 1.1 Two-Phase Commit (2PC) — Tại sao không phù hợp

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

**Vấn đề của 2PC trong microservices:**

| Vấn đề | Giải thích |
|--------|-----------|
| Single Point of Failure | Coordinator chết → tất cả participant bị lock |
| Performance bottleneck | Lock resources trong suốt quá trình 2PC |
| Tight coupling | Tất cả services phải available cùng lúc |
| Not scalable | Lock contention tăng theo số participant |
| Network partition | Nếu mạng đứt giữa Phase 1 và Phase 2 → inconsistent state |

### 1.2 CAP Theorem nhắc lại

Trong hệ thống phân tán, chỉ có thể đạt được 2 trong 3:
- **Consistency**: Mọi read đều trả về write mới nhất
- **Availability**: Mọi request đều nhận được response
- **Partition tolerance**: Hệ thống tiếp tục hoạt động khi mạng bị chia cắt

Microservices chọn **AP (Availability + Partition tolerance)** → chấp nhận **Eventual Consistency**.

---

## 2. Saga Pattern

### 2.1 Concept

Saga là chuỗi **local transactions**, mỗi transaction thực hiện bởi một service. Nếu một step fail, saga thực hiện **compensating transactions** để undo các step trước đó.

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

### 2.2 Compensating Transactions

Mỗi transaction trong saga phải có **compensating transaction** tương ứng:

| Step | Action | Compensating Action |
|------|--------|-------------------|
| T1 | Create Order | Cancel Order |
| T2 | Reserve Payment | Refund Payment |
| T3 | Reserve Inventory | Release Inventory |
| T4 | Schedule Shipping | Cancel Shipping |
| T5 | Send Confirmation Email | Send Cancellation Email |

**Lưu ý quan trọng:**
- Compensating transactions phải là **idempotent** (chạy nhiều lần cho cùng kết quả)
- Compensating transactions **không thể fail** (phải retry cho đến khi thành công)
- Một số actions không thể compensate (ví dụ: gửi email đã gửi) → dùng "semantic undo" (gửi email hủy)

---

## 3. Choreography Saga

### 3.1 Concept

Mỗi service **publish event** khi hoàn thành local transaction, service tiếp theo **subscribe** và xử lý:

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

### 3.2 Implementation Example

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

### 3.3 Ưu nhược điểm

| Ưu điểm | Nhược điểm |
|---------|-----------|
| Loose coupling giữa services | Khó theo dõi flow phức tạp |
| Đơn giản cho saga ít steps | Cyclic dependencies có thể xảy ra |
| Không có single point of failure | Khó debug khi có lỗi |
| Tự nhiên với event-driven architecture | Testing phức tạp |

---

## 4. Orchestration Saga

### 4.1 Concept

Một **Saga Orchestrator** trung tâm điều phối toàn bộ workflow, gửi command cho từng service và xử lý response:

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

### 4.2 State Machine Implementation

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

### 4.3 Ưu nhược điểm

| Ưu điểm | Nhược điểm |
|---------|-----------|
| Dễ hiểu workflow (centralized) | Orchestrator là single point of failure |
| Dễ debug và monitor | Risk of god class (quá nhiều logic) |
| Dễ thêm/bớt steps | Coupling giữa orchestrator và services |
| Compensation logic rõ ràng | Cần persistent saga state |

---

## 5. So sánh Choreography vs Orchestration

| Tiêu chí | Choreography | Orchestration |
|----------|-------------|---------------|
| Coupling | Rất loose | Medium (qua orchestrator) |
| Complexity | Tăng theo số service | Tập trung trong orchestrator |
| Visibility | Khó nhìn overall flow | Rõ ràng trong state machine |
| Failure handling | Phân tán | Tập trung |
| Testing | Khó (distributed) | Dễ hơn (test orchestrator) |
| Scalability | Tốt | Tốt (orchestrator stateless) |
| **Khuyến nghị** | **≤ 4 services trong saga** | **> 4 services hoặc complex flow** |

---

## 6. Error Handling & Dead Letter Queue

### 6.1 Dead Letter Queue (DLQ)

Messages không thể xử lý sau nhiều lần retry được chuyển vào DLQ:

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

### 6.2 Idempotency

Đảm bảo xử lý message nhiều lần cho cùng kết quả:

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

### 6.3 Saga Timeout

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

## 7. Best Practices

### 7.1 Saga Design Guidelines

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

### 7.2 Chọn Choreography hay Orchestration?

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

## Tóm tắt

- **2PC** không phù hợp cho microservices do tight coupling và lock contention
- **Saga Pattern** sử dụng chuỗi local transactions + compensating transactions
- **Choreography**: Services giao tiếp qua events, decentralized
- **Orchestration**: Saga Orchestrator điều phối centralized qua state machine
- Compensating transactions phải **idempotent** và **không được fail**
- Sử dụng **DLQ**, **timeout** và **idempotency** cho error handling
