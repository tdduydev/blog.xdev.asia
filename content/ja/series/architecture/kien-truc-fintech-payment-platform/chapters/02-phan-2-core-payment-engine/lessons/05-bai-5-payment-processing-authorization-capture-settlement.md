---
id: 019d8a21-c505-7005-d001-e1f2a3b4c505
title: 'レッスン 5: 支払い処理 - 承認、取得、決済'
slug: bai-5-payment-processing-authorization-capture-settlement
description: 支払い処理フローを詳しく説明します。支払いのための 2 フェーズコミット。認可保留と取得のタイミング。決済プロセスと清算。バッチ処理とリアルタイム決済。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 5
section_title: 'パート 2: コア決済エンジン'
course:
  id: 019d8a21-c500-7005-d001-e1f2a3b4c5d6
  title: FinTech と決済プラットフォームのアーキテクチャ
  slug: kien-truc-fintech-payment-platform
locale: ja
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ アーキテクチャ — レッスン 5</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 5: 支払い処理 - 承認、</tspan>
      <tspan x="60" dy="42">捕獲と定着</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">FinTech と決済プラットフォームのアーキテクチャ</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 2: コア決済エンジン</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![レッスン 5: 支払い処理 - 承認、取得、決済](/storage/uploads/2026/03/fintech-bai-5-diagram.webp)

## はじめに

Payment Gateway の概要を理解した後、この記事では承認から決済までの支払い処理プロセスについて詳しく説明します。これは最も複雑な部分であり、お金に直接関係するため絶対的な精度が必要です。

---

## 1. 認可フロー

### 1.1 カード認証

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

### 1.2 認可応答コード

|コード |意味 |アクション |
|----------|----------|----------|
| `00` |承認済み |キャプチャを続行 |
| `05` |尊重しないでください |ターミナル - 再試行しないでください |
| `14` |無効なカード番号 |ターミナル |
| `51` |資金不足 |ターミナル |
| `54` |期限切れのカード |ターミナル |
| `61` |制限を超えています |金額を下げて再試行できます |
| `91` |発行者が利用できません |後で再試行 |

### 1.3 認証ホールドの管理

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

## 2. キャプチャプロセス

### 2.1 キャプチャ戦略

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

### 2.2 キャプチャの実装

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

## 3. 決済プロセス

### 3.1 決済の流れ

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

### 3.2 居住地のアーキテクチャ

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

### 3.3 料金計算

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

## 4. バッチ処理

### 4.1 一日の終わりのバッチ

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

### 4.2 リアルタイム決済

即時決済の新しいトレンド (VietQR、UPI):

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

## 5. 返金処理

### 5.1 返金の種類

```
Full Refund:    Payment $100 → Refund $100
Partial Refund: Payment $100 → Refund $30 (keep $70)
Multiple Refund: Payment $100 → Refund $30 → Refund $20 → ... (total ≤ $100)
```

### 5.2 返金の流れ

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

## 概要

支払い処理は多くの手順を伴う複雑なプロセスです。
- **承認**: 資金の準備、カードの検証
- **獲得**: 承認された資金を収集します (即時または遅延)
- **決済**: 決済ネットワークを介した実際の資金移動
- **返金**: 支払いフローを逆にします

重要な原則: すべてのステップでの **べき等性**、**ステート マシン**の明確さ、各変更の **監査証跡**。

**次の記事**: マルチ PSP 統合 — 複数の PSP (VNPay、MoMo、Stripe) をスマート ルーティングと統合するための抽象化レイヤーを設計します。
