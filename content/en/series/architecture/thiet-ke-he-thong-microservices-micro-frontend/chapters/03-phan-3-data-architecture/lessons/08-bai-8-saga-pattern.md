---
id: 019e4a33-d408-7b20-c001-b1c2d3e4f508
title: 'Lesson 8: Saga Pattern & Distributed Transactions'
slug: bai-8-saga-pattern-distributed-transactions
description: >-
  Why doesn't ACID work in Microservices. Saga Pattern: Choreography vs
  Orchestration. Compensating transactions, idempotency, and error handling.
  Practical example: Order → Payment → Inventory → Shipping workflow.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 8
section_title: 'Part 3: Data Architecture in Microservices'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: Microservices & Micro Frontend system design — From basics to Production
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-3353" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-3353)"/>

  <!-- Decorations -->
  <g>
    <circle cx="755" cy="255" r="18" fill="#fb923c" opacity="0.1"/>
    <circle cx="910" cy="70" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="1065" cy="145" r="28" fill="#fb923c" opacity="0.1"/>
    <circle cx="720" cy="220" r="33" fill="#fb923c" opacity="0.05"/>
    <circle cx="875" cy="35" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <line x1="600" y1="65" x2="1100" y2="145" stroke="#fb923c" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="95" x2="1050" y2="165" stroke="#fb923c" stroke-width="0.5" opacity="0.08"/>
    <polygon points="999.6410161513776,145 999.6410161513776,185 965,205 930.3589838486224,185 930.3589838486224,145 965,125" fill="none" stroke="#fb923c" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fb923c"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fb923c" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ Architecture — Lesson 8</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 8: Saga Pattern & Distributed</tspan>
      <tspan x="60" dy="42">Transactions</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Microservices & Micro Frontend system design — From basics to Production</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 3: Data Architecture in Microservices</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Introduction

In Monolith, transactions are simple: `BEGIN → INSERT order → UPDATE inventory → COMMIT`. In Microservices, each service has its own DB → cannot use distributed ACID transactions (2PC is too slow, fragile). **Saga Pattern** is the standard solution.


![Saga Pattern — Choreography and Orchestration for distributed transactions](/storage/uploads/2026/04/mfe-ms-diagram-bai8-saga-pattern.webp)

---

## 1. Problem: Distributed Transactions

### 1.1 Why is 2PC (Two-Phase Commit) not suitable?

- **Blocking**: all participants are locked until the coordinator decides
- **Single point of failure**: coordinator crash → deadlock
- **Performance hit**: latency increases significantly
- **No scale**: add participant = add complexity exponential

### 1.2 Accept Eventual Consistency

> In Microservices, we accept **eventual consistency** instead of strong consistency. The data will be consistent **eventually**, not **immediately**.

---

## 2. Saga Pattern

Saga = string of **local transactions**, each transaction updates 1 service. If a transaction fails, the **compensating transactions** undo previous changes.

### 2.1 Choreography-based Saga

Each service publish event → the next service listens and acts:

```
Order Service         Payment Service       Inventory Service
     │                      │                      │
     │──OrderCreated───────►│                      │
     │                      │──PaymentProcessed───►│
     │                      │                      │──InventoryReserved──►
     │                      │                      │
     │ (nếu Inventory fail)                        │
     │                      │◄──InventoryFailed────│
     │◄──PaymentRefunded────│                      │
     │──OrderCancelled      │                      │
```

**Advantages:** Simple, loosely coupled, no central coordinator
**Disadvantages:** Hard to track overall flow, cyclic dependencies possible

### 2.2 Orchestration-based Saga

Saga Orchestrator coordinates the entire flow:

```
                    ┌─────────────────┐
                    │ Order Saga      │
                    │ Orchestrator    │
                    └──┬──┬──┬───────┘
                       │  │  │
            ┌──────────┘  │  └──────────┐
            ▼             ▼             ▼
      ┌──────────┐ ┌──────────┐ ┌──────────┐
      │ Payment  │ │Inventory │ │ Shipping │
      │ Service  │ │ Service  │ │ Service  │
      └──────────┘ └──────────┘ └──────────┘

Orchestrator:
1. Create Order (PENDING)
2. Command: ProcessPayment → Payment Service
3. If success: Command: ReserveInventory → Inventory Service
4. If success: Command: CreateShipment → Shipping Service
5. If any fail: Compensate previous steps in reverse
```

**Advantages:** Clear flow, easy to understand, centralized error handling
**Disadvantages:** Orchestrator can become bottleneck, single point of failure

### 2.3 When to use what?

| Criteria | Choreography | Orchestration |
|----------|-------------|---------------|
| **Complexity** | 2-3 steps | 4+ steps |
| **Visibility** | Difficult to track | Clear |
| **Coupling** | Loose | Medium (to orchestrator) |
| **Error handling** | Distributed | Centralized |

---

## 3. Compensating Transactions

Compensating transaction = "undo" for business transaction (not DB rollback):

```
Forward:                  Compensating:
CreateOrder         →     CancelOrder
ProcessPayment      →     RefundPayment
ReserveInventory    →     ReleaseInventory
CreateShipment      →     CancelShipment
```

**Note:** Compensating transaction must be **idempotent** — called multiple times with the same result.

---

## 4. Idempotency — Handling Duplicate Messages

In a distributed system, messages can be sent multiple times (at-least-once delivery). Service must handle duplicates:

```javascript
// Idempotent payment processing
async function processPayment(command) {
  // Check idempotency key
  const existing = await db.findPayment(command.idempotencyKey);
  if (existing) return existing; // Already processed
  
  // Process payment
  const result = await stripe.charge(command.amount);
  await db.savePayment({
    idempotencyKey: command.idempotencyKey,
    ...result
  });
  return result;
}
```

---

## 5. Hands-on: E-Commerce Order Saga

```
Create Order Saga (Orchestration):

Step 1: Order Service   → CreateOrder(PENDING)
Step 2: Payment Service → ChargeCustomer(orderId, amount)
  ✅ → Step 3
  ❌ → Compensate: CancelOrder → DONE (Order: PAYMENT_FAILED)

Step 3: Inventory Service → ReserveItems(orderId, items)
  ✅ → Step 4
  ❌ → Compensate: RefundPayment → CancelOrder → DONE (Order: OUT_OF_STOCK)

Step 4: Order Service → ConfirmOrder(orderId)
  ✅ → DONE (Order: CONFIRMED)
  
Step 5 (async): Notification Service → SendConfirmationEmail
```

---

## Summary

- **2PC is not suitable** for Microservices — too slow and fragile
- **Saga Pattern** = sequence of local transactions + compensating transactions
- **Choreography**: simple flows (2-3 steps), loose coupling
- **Orchestration**: complex flows (4+ steps), clear visibility
- **Idempotency** is required — always handle duplicate messages

---

**Next article:** [Lesson 9: Event Sourcing & CQRS — When to need it, when not to?](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-9-event-sourcing-cqrs-khi-nao-can-khi-nao-khong)
