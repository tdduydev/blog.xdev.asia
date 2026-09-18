---
id: 019d8a21-c504-7005-d001-e1f2a3b4c504
title: "Bài 4: Payment Gateway Architecture - Luồng Thanh Toán End-to-End"
slug: bai-4-payment-gateway-architecture-luong-thanh-toan-end-to-end
description: >-
  Kiến trúc Payment Gateway từ checkout đến settlement. Các luồng
  thanh toán: card payment, bank transfer, e-wallet. Payment
  lifecycle: authorize, capture, void, refund. Idempotency và
  retry patterns cho payment.
duration_minutes: 120
is_free: true
video_url: null
sort_order: 4
section_title: "Phần 2: Core Payment Engine"
course:
  id: 019d8a21-c500-7005-d001-e1f2a3b4c5d6
  title: "Kiến trúc FinTech & Payment Platform"
  slug: kien-truc-fintech-payment-platform
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-1954" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-1954)"/>

  <!-- Decorations -->
  <g>
    <circle cx="822" cy="36" r="10" fill="#f87171" opacity="0.11"/>
    <circle cx="1044" cy="38" r="26" fill="#f87171" opacity="0.07"/>
    <circle cx="766" cy="40" r="12" fill="#f87171" opacity="0.13"/>
    <circle cx="988" cy="42" r="28" fill="#f87171" opacity="0.09"/>
    <circle cx="710" cy="44" r="14" fill="#f87171" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <line x1="600" y1="156" x2="1100" y2="236" stroke="#f87171" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="186" x2="1050" y2="256" stroke="#f87171" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1032.8467875173176,190.5 1032.8467875173176,221.5 1006,237 979.1532124826824,221.5 979.1532124826824,190.5 1006,175" fill="none" stroke="#f87171" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#f87171"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#f87171" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f87171">🏗️ Kiến trúc — Bài 4</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 4: Payment Gateway Architecture -</tspan>
      <tspan x="60" dy="42">Luồng Thanh Toán End-to-End</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Kiến trúc FinTech &amp; Payment Platform</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 2: Core Payment Engine</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Bài 4: Payment Gateway Architecture - Luồng Thanh Toán End-to-End](/storage/uploads/2026/03/fintech-bai-4-diagram.webp)

## Giới thiệu

Payment Gateway là trái tim của mọi FinTech platform — nơi xử lý luồng tiền từ người mua đến người bán. Trong bài này, chúng ta sẽ thiết kế Payment Gateway architecture hoàn chỉnh, từ checkout flow đến settlement.

---

## 1. Payment Gateway là gì?

### 1.1 Vai trò trong Payment Ecosystem

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Customer │───►│ Merchant │───►│ Payment  │───►│ Acquirer │───►│  Issuer  │
│          │    │  (Shop)  │    │ Gateway  │    │  Bank    │    │  Bank    │
└──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
                                     │
                                     │ Orchestration
                                     │
                              ┌──────▼──────┐
                              │ Payment     │
                              │ Processors  │
                              │ (PSPs)      │
                              └─────────────┘
```

Payment Gateway đóng vai trò **orchestrator** — điều phối luồng thanh toán giữa merchant, acquirer bank, card network, và issuer bank.

### 1.2 Payment Gateway vs Payment Processor

| Thành phần | Vai trò | Ví dụ |
|-----------|--------|-------|
| **Payment Gateway** | Nhận, validate, route payment requests | Stripe, VNPay |
| **Payment Processor** | Xử lý transaction với card networks | Worldpay, First Data |
| **Acquirer** | Bank của merchant, nhận funds | Vietcombank, BIDV |
| **Issuer** | Bank phát hành thẻ cho customer | Techcombank, ACB |
| **Card Network** | Network kết nối acquirer-issuer | Visa, Mastercard, NAPAS |

---

## 2. Payment Lifecycle

### 2.1 Các trạng thái của Payment

```
                    ┌───────────┐
                    │  CREATED  │
                    └─────┬─────┘
                          │
                    ┌─────▼─────┐
              ┌─────│ PENDING   │─────┐
              │     └─────┬─────┘     │
              │           │           │
        ┌─────▼─────┐    │    ┌──────▼─────┐
        │  FAILED   │    │    │  EXPIRED   │
        └───────────┘    │    └────────────┘
                         │
                   ┌─────▼──────┐
                   │ AUTHORIZED │
                   └─────┬──────┘
                         │
              ┌──────────┼──────────┐
              │          │          │
        ┌─────▼─────┐   │   ┌─────▼─────┐
        │  VOIDED   │   │   │ CAPTURED  │
        └───────────┘   │   └─────┬─────┘
                        │         │
                        │   ┌─────▼─────┐
                        │   │  SETTLED  │
                        │   └─────┬─────┘
                        │         │
                        │   ┌─────▼─────┐
                        └──►│ REFUNDED  │
                            └───────────┘
```

### 2.2 Two-Phase Payment (Auth + Capture)

```
Phase 1: Authorization (Reserve funds)
──────────────────────────────────────
Customer ──► Gateway ──► PSP ──► Issuer Bank
                                    │
                              Reserve $100
                              (Hold on card)
                                    │
Customer ◄── Gateway ◄── PSP ◄─────┘
             Auth Code: auth_xyz

Phase 2: Capture (Collect funds)
──────────────────────────────────────
Merchant ──► Gateway ──► PSP ──► Issuer Bank
                                    │
                              Capture $100
                              (Move from hold)
                                    │
Merchant ◄── Gateway ◄── PSP ◄─────┘
             Captured: $100
```

**Use cases cho Two-Phase**:
- Hotels (reserve khi book, capture khi checkout)
- Marketplaces (capture khi ship)
- Pre-orders

---

## 3. Payment Gateway Architecture

### 3.1 Internal Components

```
┌─────────────────────────────────────────────────────────────┐
│                    PAYMENT GATEWAY                           │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐ │
│  │ Checkout  │  │ Payment  │  │  Router   │  │   PSP      │ │
│  │ Service   │  │ Engine   │  │  Service  │  │  Adapters  │ │
│  └────┬──────┘  └────┬──────┘  └────┬──────┘  └────┬───────┘ │
│       │              │              │              │          │
│  ┌────▼──────────────▼──────────────▼──────────────▼───────┐ │
│  │                    Event Bus (Kafka)                     │ │
│  └─────────────────────────┬───────────────────────────────┘ │
│                            │                                  │
│  ┌──────────┐  ┌──────────▼──┐  ┌──────────┐  ┌──────────┐ │
│  │Idempotency│  │  State     │  │  Retry   │  │  Webhook │ │
│  │  Store    │  │  Machine   │  │  Engine  │  │  Sender  │ │
│  └──────────┘  └─────────────┘  └──────────┘  └──────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Payment Request Flow

```java
// Simplified payment processing flow
public class PaymentEngine {

    public PaymentResult processPayment(PaymentRequest request) {
        // 1. Idempotency check
        var existing = idempotencyStore.find(request.getIdempotencyKey());
        if (existing.isPresent()) {
            return existing.get(); // Return cached result
        }

        // 2. Validate request
        validator.validate(request);

        // 3. Create payment record
        var payment = Payment.create(request);
        paymentRepository.save(payment);

        // 4. Risk check
        var riskResult = riskService.evaluate(payment);
        if (riskResult.isBlocked()) {
            payment.fail(riskResult.getReason());
            return PaymentResult.blocked(riskResult);
        }

        // 5. Route to PSP
        var psp = router.selectPSP(payment);
        var adapter = pspAdapterFactory.getAdapter(psp);

        // 6. Process with PSP
        try {
            var pspResult = adapter.authorize(payment);
            payment.authorize(pspResult);

            // 7. Publish event
            eventBus.publish(new PaymentAuthorizedEvent(payment));

            return PaymentResult.success(payment);
        } catch (PSPException e) {
            payment.fail(e.getMessage());
            return PaymentResult.failed(e);
        }
    }
}
```

### 3.3 Idempotency Pattern

```
Request 1: POST /payments  {idempotency_key: "key_abc", amount: 100}
  → Process payment → Return: {id: "pay_123", status: "authorized"}
  → Store: idempotency_store["key_abc"] = response

Request 2: POST /payments  {idempotency_key: "key_abc", amount: 100}
  → Found in idempotency_store → Return cached: {id: "pay_123", status: "authorized"}
  → No duplicate charge!
```

```java
@Service
public class IdempotencyService {
    private final RedisTemplate<String, String> redis;

    public Optional<PaymentResult> check(String key) {
        String cached = redis.opsForValue().get("idempotency:" + key);
        if (cached != null) {
            return Optional.of(deserialize(cached));
        }
        // Try to acquire lock
        Boolean acquired = redis.opsForValue()
            .setIfAbsent("idempotency:" + key + ":lock", "1",
                Duration.ofMinutes(5));
        if (!acquired) {
            throw new PaymentInProgressException();
        }
        return Optional.empty();
    }

    public void store(String key, PaymentResult result) {
        redis.opsForValue().set("idempotency:" + key,
            serialize(result), Duration.ofHours(24));
        redis.delete("idempotency:" + key + ":lock");
    }
}
```

---

## 4. Payment Methods

### 4.1 Các phương thức thanh toán

```
Payment Methods:
├── Card Payments
│   ├── Credit Card (Visa, Mastercard, JCB)
│   ├── Debit Card (ATM cards)
│   └── Prepaid Card
├── Bank Transfer
│   ├── Internet Banking
│   ├── QR Transfer (VietQR)
│   └── Direct Debit
├── E-Wallet
│   ├── MoMo, ZaloPay, ShopeePay
│   └── Apple Pay, Google Pay
├── Buy Now Pay Later
│   ├── Installment plans
│   └── Pay-in-4
└── Alternative
    ├── Crypto payments
    └── Telecom billing
```

### 4.2 Checkout Flow Design

```
┌──────────────────────────────────────────────────────────────┐
│                     CHECKOUT FLOW                             │
│                                                               │
│  Step 1:          Step 2:           Step 3:        Step 4:   │
│  Cart Review  →   Payment Method →  Confirm    →  Result    │
│                                                               │
│  ┌──────────┐  ┌──────────────┐  ┌──────────┐  ┌─────────┐ │
│  │ Items    │  │ □ Credit Card│  │ Total:   │  │ ✓ Paid  │ │
│  │ Subtotal │  │ □ Bank       │  │ $100     │  │ Receipt │ │
│  │ Shipping │  │ □ MoMo       │  │ Pay Now  │  │ Order # │ │
│  │ Tax      │  │ □ ZaloPay    │  │          │  │         │ │
│  └──────────┘  └──────────────┘  └──────────┘  └─────────┘ │
└──────────────────────────────────────────────────────────────┘
```

---

## 5. Retry & Error Handling

### 5.1 Retry Strategy

```
Payment Retry Policy:
├── Network timeout     → Retry with exponential backoff
├── PSP 5xx error       → Retry with different PSP
├── Rate limited        → Retry after delay
├── Insufficient funds  → No retry (terminal error)
├── Card declined       → No retry (terminal error)
└── Fraud blocked       → No retry (terminal error)
```

```java
@Retryable(
    value = {PSPTimeoutException.class, PSPServerException.class},
    maxAttempts = 3,
    backoff = @Backoff(delay = 1000, multiplier = 2)
)
public PSPResponse authorizeWithRetry(Payment payment) {
    return pspAdapter.authorize(payment);
}

@Recover
public PSPResponse fallbackPSP(PSPTimeoutException e, Payment payment) {
    // Try alternative PSP
    var fallbackPSP = router.selectFallback(payment);
    return fallbackPSP.authorize(payment);
}
```

### 5.2 Webhook Delivery

```
Payment Result → Webhook Queue → Delivery Engine
                                      │
                                 ┌────▼────┐
                                 │ Attempt │
                                 │   1     │──► merchant.com/webhook
                                 └────┬────┘
                                      │ (Failed)
                                 Wait 1 min
                                      │
                                 ┌────▼────┐
                                 │ Attempt │
                                 │   2     │──► merchant.com/webhook
                                 └────┬────┘
                                      │ (Failed)
                                 Wait 5 min
                                      │
                                 ┌────▼────┐
                                 │ Attempt │
                                 │   3     │──► merchant.com/webhook
                                 └─────────┘
                                 ... up to 5 attempts
```

---

## 6. Database Schema

### 6.1 Core Payment Tables

```sql
CREATE TABLE payments (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    idempotency_key   VARCHAR(255) UNIQUE NOT NULL,
    merchant_id       UUID NOT NULL,
    customer_id       UUID,
    amount            BIGINT NOT NULL, -- Amount in smallest currency unit (cents/dong)
    currency          VARCHAR(3) NOT NULL DEFAULT 'VND',
    status            VARCHAR(30) NOT NULL DEFAULT 'CREATED',
    payment_method    VARCHAR(50) NOT NULL,
    description       TEXT,
    metadata          JSONB DEFAULT '{}',
    psp_reference     VARCHAR(255),
    auth_code         VARCHAR(100),
    failure_reason    TEXT,
    captured_amount   BIGINT DEFAULT 0,
    refunded_amount   BIGINT DEFAULT 0,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at        TIMESTAMPTZ,
    CONSTRAINT valid_status CHECK (status IN (
        'CREATED', 'PENDING', 'AUTHORIZED', 'CAPTURED',
        'SETTLED', 'VOIDED', 'REFUNDED', 'FAILED', 'EXPIRED'
    ))
);

CREATE TABLE payment_attempts (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id    UUID NOT NULL REFERENCES payments(id),
    psp_id        VARCHAR(50) NOT NULL,
    attempt_no    INT NOT NULL,
    status        VARCHAR(30) NOT NULL,
    request_body  JSONB,
    response_body JSONB,
    response_code VARCHAR(10),
    error_message TEXT,
    latency_ms    INT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_payments_merchant ON payments(merchant_id, created_at DESC);
CREATE INDEX idx_payments_status ON payments(status) WHERE status IN ('PENDING', 'AUTHORIZED');
CREATE INDEX idx_payment_attempts_payment ON payment_attempts(payment_id);
```

---

## Tổng kết

Payment Gateway architecture đòi hỏi:
- **State Machine** rõ ràng cho payment lifecycle
- **Idempotency** để đảm bảo không charge trùng
- **Two-phase payment** (Auth + Capture) cho flexibility
- **Retry logic** thông minh với fallback PSP
- **Webhook** có guaranteed delivery cho merchant notification

**Bài tiếp theo**: Deep-dive vào Payment Processing — Authorization, Capture, Settlement workflows và batch processing.
