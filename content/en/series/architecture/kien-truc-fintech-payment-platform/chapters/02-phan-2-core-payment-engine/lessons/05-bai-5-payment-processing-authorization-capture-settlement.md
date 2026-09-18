---
id: 019d8a21-c505-7005-d001-e1f2a3b4c505
title: 'Lesson 5: Payment Processing - Authorization, Capture & Settlement'
slug: bai-5-payment-processing-authorization-capture-settlement
description: >-
  Deep-dive into payment processing flow. Two-phase commit for payment.
  Authorization hold and capture timing. Settlement process and clearing. Batch
  processing vs real-time settlement.
duration_minutes: 120
is_free: true
video_url: null
sort_order: 5
section_title: 'Part 2: Core Payment Engine'
course:
  id: 019d8a21-c500-7005-d001-e1f2a3b4c5d6
  title: FinTech & Payment Platform Architecture
  slug: kien-truc-fintech-payment-platform
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-7942" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-7942)"/>

  <!-- Decorations -->
  <g>
    <circle cx="688" cy="114" r="16" fill="#fbbf24" opacity="0.09"/>
    <circle cx="776" cy="142" r="20" fill="#fbbf24" opacity="0.13"/>
    <circle cx="864" cy="170" r="24" fill="#fbbf24" opacity="0.07"/>
    <circle cx="952" cy="198" r="28" fill="#fbbf24" opacity="0.11"/>
    <circle cx="1040" cy="226" r="32" fill="#fbbf24" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <line x1="600" y1="174" x2="1100" y2="254" stroke="#fbbf24" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="204" x2="1050" y2="274" stroke="#fbbf24" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1049.1147367097487,209.5 1049.1147367097487,238.5 1024,253 998.8852632902513,238.5 998.8852632902513,209.5 1024,195" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fbbf24"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fbbf24" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ Architecture — Lesson 5</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 5: Payment Processing - Authorization,</tspan>
      <tspan x="60" dy="42">Capture & Settlement</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">FinTech & Payment Platform Architecture</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 2: Core Payment Engine</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Lesson 5: Payment Processing - Authorization, Capture & Settlement](/storage/uploads/2026/03/fintech-bai-5-diagram.webp)

## Introduction

After understanding the Payment Gateway overview, this article deep-dives into the payment processing process — from authorization to settlement. This is the most complicated part and requires absolute precision because it is directly related to money.

---

## 1. Authorization Flow

### 1.1 Card Authorization

```
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│ Customer │   │ Merchant │   │ Acquirer │   │  Card    │   │  Issuer  │
│          │   │          │   │  Bank    │   │ Network  │   │  Bank    │
└────┬─────┘   └────┬─────┘   └────┬─────┘   └────┬─────┘   └────┬─────┘
     │              │              │              │              │
     │  Card Info   │              │              │              │
     ├─────────────►│              │              │              │
     │              │  Auth Req    │              │              │
     │              ├─────────────►│              │              │
     │              │              │  Auth Req    │              │
     │              │              ├─────────────►│              │
     │              │              │              │  Auth Req    │
     │              │              │              ├─────────────►│
     │              │              │              │              │
     │              │              │              │  Check:      │
     │              │              │              │  - Balance   │
     │              │              │              │  - Fraud     │
     │              │              │              │  - Limits    │
     │              │              │              │              │
     │              │              │              │  Auth Resp   │
     │              │              │              │◄─────────────┤
     │              │              │  Auth Resp   │              │
     │              │              │◄─────────────┤              │
     │              │  Auth Resp   │              │              │
     │              │◄─────────────┤              │              │
     │  Result      │              │              │              │
     │◄─────────────┤              │              │              │
```

### 1.2 Authorization Response Codes

| Code | Meaning | Action |
|--------|--------|--------|
| `00` | Approved | Proceed with capture |
| `05` | Do not honor | Terminal - don't retry |
| `14` | Invalid card number | Terminal |
| `51` | Insufficient funds | Terminal |
| `54` | Expired cards | Terminal |
| `61` | Exceeds limit | Can retry with lower amount |
| `91` | Issuer unavailable | Retry later |

### 1.3 Auth Hold Management

```
Authorization creates a "hold" on customer funds:

Timeline:
Day 0: Auth $100 ──► Hold $100 on card
Day 1-7: Hold active, merchant can capture
Day 7+: Hold expires (auto-release by issuer)

Rules:
├── Auth hold duration varies by card network
│   ├── Visa: 7-30 days
│   ├── Mastercard: 7-30 days
│   └── NAPAS: Varies by issuer
├── Partial capture: Can capture <= auth amount
├── Multi-capture: Some networks support partial captures
└── Void: Cancel auth before capture (release hold)
```

---

## 2. Capture Process

### 2.1 Capture Strategies

```
1. Auto-capture (immediate):
   Auth ──► Immediate Capture
   Use case: Digital goods, instant delivery

2. Manual capture (delayed):
   Auth ──► Wait ──► Capture when ready
   Use case: Physical goods (capture on ship)

3. Partial capture:
   Auth $100 ──► Capture $80 (partial shipment)
   Remaining $20 ──► Void or capture later

4. Multi-capture:
   Auth $100 ──► Capture $50 ──► Capture $30 ──► Capture $20
   Use case: Marketplace with multiple sellers
```

### 2.2 Capture Implementation

```java
public class CaptureService {

    @Transactional
    public CaptureResult capture(String paymentId, Money amount) {
        var payment = paymentRepository.findById(paymentId)
            .orElseThrow(() -> new PaymentNotFoundException(paymentId));

        // Validate
        if (payment.getStatus() != PaymentStatus.AUTHORIZED) {
            throw new InvalidStateException("Payment must be AUTHORIZED");
        }
        if (amount.isGreaterThan(payment.remainingCapturable())) {
            throw new AmountExceedsAuthException();
        }

        // Capture with PSP
        var pspResult = pspAdapter.capture(payment, amount);

        // Update payment
        payment.capture(amount, pspResult);
        paymentRepository.save(payment);

        // Publish event
        eventBus.publish(new PaymentCapturedEvent(payment, amount));

        return CaptureResult.success(payment);
    }
}
```

---

## 3. Settlement Process

### 3.1 Settlement Flow

```
Settlement = Transfer of actual funds from issuer to acquirer to merchant

Daily Settlement Cycle:
┌─────────────────────────────────────────────────────────┐
│                                                          │
│  23:00  Cut-off time                                     │
│    │                                                     │
│    ▼                                                     │
│  Batch all captured transactions for the day             │
│    │                                                     │
│    ▼                                                     │
│  Submit settlement file to acquirer/network              │
│    │                                                     │
│    ▼                                                     │
│  T+1: Clearing (acquirer receives funds from network)    │
│    │                                                     │
│    ▼                                                     │
│  T+1~T+3: Payout to merchant account                    │
│    │                                                     │
│    ▼                                                     │
│  Settlement complete                                     │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Settlement Architecture

```
┌─────────────────────────────────────────────────────────┐
│                 SETTLEMENT ENGINE                        │
│                                                          │
│  ┌──────────┐    ┌──────────┐    ┌──────────────────┐  │
│  │ Batch    │    │ Fee      │    │ Payout           │  │
│  │ Builder  │───►│ Engine   │───►│ Calculator       │  │
│  └──────────┘    └──────────┘    └────────┬─────────┘  │
│                                           │              │
│  ┌──────────┐    ┌──────────┐    ┌────────▼─────────┐  │
│  │ Report   │◄───│Reconcile │◄───│ Transfer         │  │
│  │ Generator│    │ Engine   │    │ Executor         │  │
│  └──────────┘    └──────────┘    └──────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 3.3 Fee Calculation

```
Transaction Amount: 1,000,000 VND

Fee Breakdown:
├── Interchange fee (issuer):     1.5%  = 15,000 VND
├── Network fee (Visa/MC):        0.2%  =  2,000 VND
├── Acquirer fee:                 0.3%  =  3,000 VND
├── Gateway fee (our platform):   0.5%  =  5,000 VND
└── Total fees:                   2.5%  = 25,000 VND

Merchant receives: 975,000 VND
```

```java
public record SettlementCalculation(
    Money grossAmount,
    Money interchangeFee,
    Money networkFee,
    Money acquirerFee,
    Money platformFee,
    Money netAmount
) {
    public static SettlementCalculation calculate(
            Payment payment, MerchantFeeConfig config) {
        Money gross = payment.getCapturedAmount();
        Money interchange = gross.multiply(config.interchangeRate());
        Money network = gross.multiply(config.networkRate());
        Money acquirer = gross.multiply(config.acquirerRate());
        Money platform = gross.multiply(config.platformRate());
        Money net = gross.subtract(interchange)
                        .subtract(network)
                        .subtract(acquirer)
                        .subtract(platform);
        return new SettlementCalculation(
            gross, interchange, network, acquirer, platform, net);
    }
}
```

---

## 4. Batch Processing

### 4.1 End-of-Day Batch

```java
@Scheduled(cron = "0 0 23 * * *") // 23:00 daily
public void runDailySettlement() {
    var cutoffTime = LocalDateTime.now();
    var transactions = paymentRepository
        .findCapturedNotSettled(cutoffTime);

    // Group by merchant
    var byMerchant = transactions.stream()
        .collect(Collectors.groupingBy(Payment::getMerchantId));

    for (var entry : byMerchant.entrySet()) {
        var merchantId = entry.getKey();
        var payments = entry.getValue();

        // Calculate settlement
        var settlement = settlementService
            .createSettlement(merchantId, payments);

        // Generate settlement file
        settlementFileGenerator.generate(settlement);

        // Queue payout
        payoutService.queuePayout(settlement);
    }
}
```

### 4.2 Real-time Settlement

New trend with instant payments (VietQR, UPI):

```
Traditional:  Capture → T+1~T+3 Settlement
Real-time:    Capture → Instant Settlement (< 30 seconds)

Real-time settlement requires:
├── Real-time clearing network (NAPAS for Vietnam)
├── Pre-funded settlement accounts
├── Real-time balance management
└── Instant notification to merchant
```

---

## 5. Refund Processing

### 5.1 Refund Types

```
Full Refund:    Payment $100 → Refund $100
Partial Refund: Payment $100 → Refund $30 (keep $70)
Multiple Refund: Payment $100 → Refund $30 → Refund $20 → ... (total ≤ $100)
```

### 5.2 Refund Flow

```java
@Transactional
public RefundResult processRefund(String paymentId, Money amount, String reason) {
    var payment = paymentRepository.findById(paymentId)
        .orElseThrow(() -> new PaymentNotFoundException(paymentId));

    // Validate
    if (!payment.isRefundable()) {
        throw new PaymentNotRefundableException();
    }
    if (amount.isGreaterThan(payment.refundableAmount())) {
        throw new RefundAmountExceedsException();
    }

    // Process refund with PSP
    var pspResult = pspAdapter.refund(payment, amount);

    // Create refund record
    var refund = Refund.create(payment, amount, reason, pspResult);
    refundRepository.save(refund);

    // Update payment
    payment.addRefund(refund);
    paymentRepository.save(payment);

    // Reverse ledger entries
    eventBus.publish(new RefundProcessedEvent(refund));

    return RefundResult.success(refund);
}
```

---

## Summary

Payment processing is a complex process with many steps:
- **Authorization**: Reserve funds, validate card
- **Capture**: Collect authorized funds (immediate or delayed)
- **Settlement**: Actual fund transfer via clearing network
- **Refund**: Reverse the payment flow

Key principles: **idempotency** at every step, **state machine** clarity, **audit trail** for each change.

**Next article**: Multi-PSP Integration — design abstraction layer to integrate multiple PSPs (VNPay, MoMo, Stripe) with smart routing.
