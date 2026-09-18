---
id: 019d8a21-c505-7005-d001-e1f2a3b4c505
title: 第 5 課：支付處理 - 授權、捕獲和結算
slug: bai-5-payment-processing-authorization-capture-settlement
description: 深入研究支付處理流程。兩階段承諾付款。授權保持和捕獲計時。結算流程和清算。批量處理與即時結算。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 5
section_title: 第 2 部分：核心支付引擎
course:
  id: 019d8a21-c500-7005-d001-e1f2a3b4c5d6
  title: 金融科技與支付平台架構
  slug: kien-truc-fintech-payment-platform
locale: zh-tw
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ 建築 — 第 5 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 5 課：付款處理 - 授權、</tspan>
      <tspan x="60" dy="42">捕獲與結算</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">金融科技與支付平台架構</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 2 部分：核心支付引擎</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![第 5 課：支付處理 - 授權、捕獲和結算](/storage/uploads/2026/03/fintech-bai-5-diagram.webp)

## 簡介

在了解支付網關概述後，本文將深入探討支付處理流程－從授權到結算。這是最複雜的部分，需要絕對的精確，因為它與金錢直接相關。

---

## 1. 授權流程

### 1.1 卡授權

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

### 1.2 授權回應碼

|代碼|意義|行動|
|--------|--------|--------|
| `00` |已核准 |繼續捕獲 |
| `05` |不尊重|終端機 - 不要重試 |
| `14` |卡號無效 |終端機|
| `51` |資金不足|終端|
| `54` |過期卡 |終端機|
| `61` |超過限制 |可以用較低的金額重試 |
| `91` |發行人不詳 |稍後重試 |

### 1.3 授權保留管理

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

## 2. 捕捉過程

### 2.1 捕獲策略

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

### 2.2 捕獲實現

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

## 3. 結算流程

### 3.1 結算流程

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

### 3.2 結算架構

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

### 3.3 費用計算

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

## 4. 批次處理

### 4.1 日終批次

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

### 4.2 即時結算

即時支付的新趨勢（VietQR、UPI）：

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

## 5. 退款處理

### 5.1 退款類型

```
Full Refund:    Payment $100 → Refund $100
Partial Refund: Payment $100 → Refund $30 (keep $70)
Multiple Refund: Payment $100 → Refund $30 → Refund $20 → ... (total ≤ $100)
```

### 5.2 退款流程

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

## 總結

付款處理是一個複雜的過程，包含許多步驟：
- **授權**：儲備資金，驗證卡
- **捕獲**：收集授權資金（立即或延遲）
- **結算**：透過清算網絡實際轉移資金
- **退款**：逆轉付款流程

關鍵原則：每一步的**冪等性**、**狀態機**的清晰度、每次更改的**審計追蹤**。

**下一篇文章**：多 PSP 整合 — 設計抽象層，將多個 PSP（VNPay、MoMo、Stripe）與智慧路由整合。
