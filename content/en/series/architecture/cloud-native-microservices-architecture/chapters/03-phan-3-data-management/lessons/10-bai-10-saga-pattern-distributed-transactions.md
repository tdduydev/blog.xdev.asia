---
id: 019d8a22-c310-7a10-b001-a1b2c3d4e510
title: 'Lesson 10: Saga Pattern — Distributed Transactions'
slug: bai-10-saga-pattern-distributed-transactions
description: >-
  Why 2PC is not suitable for microservices, Saga Pattern (Choreography vs
  Orchestration), compensating transactions, Saga Orchestrator implementation,
  error handling and dead letter queue.
duration_minutes: 120
is_free: true
video_url: null
sort_order: 10
section_title: 'Part 3: Data Management in Microservices'
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: Cloud Native Microservices Architecture
  slug: cloud-native-microservices-architecture
locale: en
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#2dd4bf">🏗️ Architecture — Lesson 10</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 10: Saga Pattern — Distributed</tspan>
      <tspan x="60" dy="42">Transactions</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Cloud Native Microservices Architecture</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 3: Data Management in Microservices</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Lesson 10: Saga Pattern — Distributed Transactions](/storage/uploads/2026/03/cn-bai-10-diagram.webp)

## Introduction

In monolith, a business transaction can include multiple database operations in the same ACID transaction. In microservices, each service has its own database — **cannot use traditional distributed transactions (2PC)** because it creates tight coupling and affects performance. Saga Pattern is an alternative.

---

## 1. Problem with Distributed Transactions

### 1.1 Two-Phase Commit (2PC) — Why not suitable

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

**2PC problem in microservices:**

| Problem | Explanation |
|--------|-----------|
| Single Point of Failure | Coordinator dies → all participants are locked |
| Performance bottleneck | Lock resources during 2PC |
| Tight coupling | All services must be available at the same time |
| Not scalable | Lock contention increases with the number of participants |
| Network partition | If the network breaks between Phase 1 and Phase 2 → inconsistent state |

### 1.2 CAP Theorem repeats

In a distributed system, only 2 out of 3 can be achieved:
- **Consistency**: Every read returns the latest write
- **Availability**: Every request receives a response
- **Partition tolerance**: The system continues to operate when the network is divided

Microservices select **AP (Availability + Partition tolerance)** → accept **Eventual Consistency**.

---

## 2. Saga Pattern

### 2.1 Concepts

Saga is a sequence of **local transactions**, each transaction performed by a service. If a step fails, the saga performs **compensating transactions** to undo the previous steps.

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

Each transaction in the saga must have a corresponding **compensating transaction**:

| Step | Action | Compensating Action |
|-------|--------|-------------------|
| T1 | Create Order | Cancel Order |
| T2 | Reserve Payment | Refund Payment |
| T3 | Reserve Inventory | Release Inventory |
| T4 | Shipping Schedule | Cancel Shipping |
| T5 | Send Confirmation Email | Send Cancellation Email |

**Important note:**
- Compensating transactions must be **idempotent** (run multiple times with the same result)
- Compensating transactions **cannot fail** (must retry until successful)
- Some actions cannot be compensated (for example, send a sent email) → use "semantic undo" (send a canceled email)

---

## 3. Choreography Saga

### 3.1 Concepts

Each service **publish event** when completing the local transaction, the next service **subscribes** and processes:

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

### 3.3 Advantages and disadvantages

| Advantages | Disadvantages |
|--------|-----------|
| Loose coupling between services | Difficult to track complex flows |
| Simple for less steps saga | Cyclic dependencies can occur |
| There is no single point of failure | Difficult to debug when there are errors |
| Natural with event-driven architecture | Complex Testing |

---

## 4. Orchestration Saga

### 4.1 Concepts

A central **Saga Orchestrator** coordinates the entire workflow, sending commands to each service and processing the response:

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

### 4.3 Advantages and disadvantages

| Advantages | Disadvantages |
|--------|-----------|
| Easy to understand workflow (centralized) | Orchestrator is single point of failure |
| Easy to debug and monitor | Risk of god class (too much logic) |
| Easy to add/remove steps | Coupling between orchestrator and services |
| Compensation logic clearly | Need persistent saga state |

---

## 5. Compare Choreography vs Orchestration

| Criteria | Choreography | Orchestration |
|----------|-------------|---------------|
| Coupling | Very loose | Medium (via orchestrator) |
| Complexity | Increases by number of services | Focus in orchestrator |
| Visibility | Difficult to see overall flow | Explicitly in state machine |
| Failure handling | Disperse | Focus |
| Testing | Difficult (distributed) | Easier (test orchestrator) |
| Scalability | Good | Good (orchestrator stateless) |
| **Recommended** | **≤ 4 services in saga** | **> 4 services or complex flow** |

---

## 6. Error Handling & Dead Letter Queue

### 6.1 Dead Letter Queue (DLQ)

Messages that cannot be processed after multiple retries are passed into DLQ:

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

Make sure to process the message multiple times for the same result:

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

### 7.2 Choose Choreography or Orchestration?

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

## Summary

- **2PC** is not suitable for microservices due to tight coupling and lock contention
- **Saga Pattern** uses chain of local transactions + compensating transactions
- **Choreography**: Services communicate via events, decentralized
- **Orchestration**: Saga Orchestrator coordinates centrally through the state machine
- Compensating transactions must be **idempotent** and **must not fail**
- Use **DLQ**, **timeout** and **idempotency** for error handling
