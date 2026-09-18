---
id: 019d8a21-c506-7005-d001-e1f2a3b4c506
title: 第 6 課：多 PSP 整合 - VNPay、MoMo、ZaloPay、Stripe
slug: bai-6-multi-psp-integration-vnpay-momo-zalopay-stripe
description: 設計支付服務提供者抽象層。多個 PSP 的適配器模式。與 VNPay、MoMo、ZaloPay 和 Stripe 整合。 PSP 路由和回退策略。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 6
section_title: 第 2 部分：核心支付引擎
course:
  id: 019d8a21-c500-7005-d001-e1f2a3b4c5d6
  title: 金融科技與支付平台架構
  slug: kien-truc-fintech-payment-platform
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-6969" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-6969)"/>

  <!-- Decorations -->
  <g>
    <circle cx="979" cy="207" r="32" fill="#818cf8" opacity="0.12000000000000001"/>
    <circle cx="858" cy="266" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="737" cy="65" r="26" fill="#818cf8" opacity="0.060000000000000005"/>
    <circle cx="616" cy="124" r="23" fill="#818cf8" opacity="0.13"/>
    <circle cx="995" cy="183" r="20" fill="#818cf8" opacity="0.1"/>
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
    <line x1="600" y1="217" x2="1100" y2="297" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="247" x2="1050" y2="317" stroke="#818cf8" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1044.712812921102,201 1044.712812921102,233 1017,249 989.287187078898,233 989.287187078898,201 1017,185" fill="none" stroke="#818cf8" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ 建築 — 第 6 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 6 课：多 PSP 集成 - VNPay、</tspan>
      <tspan x="60" dy="42">MoMo、ZaloPay、Stripe</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">金融科技與支付平台架構</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 2 部分：核心支付引擎</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![第 6 課：多 PSP 整合 - VNPay、MoMo、ZaloPay、Stripe](/storage/uploads/2026/03/fintech-bai-6-diagram.webp)

## 簡介

真正的支付平台總是需要整合多個PSP（支付服務提供者）來優化成功率、成本和覆蓋範圍。本文指導多 PSP 與智慧路由整合的抽象層設計。

---

## 1. PSP 抽象層

### 1.1 適配器模式

```
┌────────────────────────────────────────────────────┐
│                 PAYMENT SERVICE                     │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │            PSP Interface (Port)               │  │
│  │  authorize() / capture() / refund() / void() │  │
│  └──────────────────┬───────────────────────────┘  │
│                     │                               │
│      ┌──────────────┼──────────────┐               │
│      │              │              │               │
│  ┌───▼────┐   ┌─────▼────┐  ┌─────▼────┐         │
│  │ VNPay  │   │  MoMo    │  │ Stripe   │  ...    │
│  │Adapter │   │ Adapter  │  │ Adapter  │         │
│  └───┬────┘   └─────┬────┘  └─────┬────┘         │
└──────┼──────────────┼─────────────┼────────────────┘
       │              │             │
   ┌───▼────┐   ┌─────▼────┐  ┌────▼─────┐
   │ VNPay  │   │  MoMo    │  │ Stripe   │
   │  API   │   │   API    │  │   API    │
   └────────┘   └──────────┘  └──────────┘
```

### 1.2 PSP 介面

```java
public interface PaymentServiceProvider {
    String getId();
    Set<PaymentMethod> supportedMethods();
    Set<Currency> supportedCurrencies();

    AuthResult authorize(AuthRequest request);
    CaptureResult capture(CaptureRequest request);
    RefundResult refund(RefundRequest request);
    VoidResult voidPayment(VoidRequest request);
    PaymentStatus queryStatus(String pspReference);
}
```

### 1.3 VNPay 適配器

```java
@Component
public class VNPayAdapter implements PaymentServiceProvider {

    @Override
    public String getId() { return "vnpay"; }

    @Override
    public Set<PaymentMethod> supportedMethods() {
        return Set.of(
            PaymentMethod.ATM_CARD,
            PaymentMethod.CREDIT_CARD,
            PaymentMethod.QR_CODE,
            PaymentMethod.BANK_TRANSFER
        );
    }

    @Override
    public AuthResult authorize(AuthRequest request) {
        // Build VNPay-specific parameters
        var params = new TreeMap<String, String>();
        params.put("vnp_Version", "2.1.0");
        params.put("vnp_Command", "pay");
        params.put("vnp_TmnCode", config.getTmnCode());
        params.put("vnp_Amount", String.valueOf(
            request.getAmount().multiply(100).longValue()));
        params.put("vnp_CurrCode", "VND");
        params.put("vnp_TxnRef", request.getOrderId());
        params.put("vnp_OrderInfo", request.getDescription());
        params.put("vnp_ReturnUrl", config.getReturnUrl());

        // Sign with HMAC-SHA512
        String signature = HmacUtils.hmacSha512(
            config.getHashSecret(), buildQueryString(params));
        params.put("vnp_SecureHash", signature);

        // Return redirect URL for customer
        String paymentUrl = config.getPayUrl() + "?" + buildQueryString(params);
        return AuthResult.redirect(paymentUrl);
    }
}
```

---

## 2. 智慧路由

### 2.1 路由引擎

```java
@Service
public class PSPRouter {
    private final List<RoutingRule> rules;
    private final PSPHealthMonitor healthMonitor;

    public PaymentServiceProvider selectPSP(PaymentRequest request) {
        // 1. Filter by capability
        var candidates = pspRegistry.getAll().stream()
            .filter(psp -> psp.supportedMethods().contains(request.getMethod()))
            .filter(psp -> psp.supportedCurrencies().contains(request.getCurrency()))
            .filter(psp -> healthMonitor.isHealthy(psp.getId()))
            .toList();

        // 2. Apply routing rules
        for (var rule : rules) {
            var result = rule.evaluate(request, candidates);
            if (result.isPresent()) return result.get();
        }

        // 3. Default: cost-optimized selection
        return candidates.stream()
            .min(Comparator.comparing(psp -> getFeeRate(psp, request)))
            .orElseThrow(() -> new NoPSPAvailableException());
    }
}
```

### 2.2 路由策略

|戰略|邏輯|使用案例|
|----------|--------|----------|
| **成本優化** |最低費用 PSP |預設 |
| **成功率** |成功率最高的PSP |大額交易|
| **延遲最佳化** |最快的 PSP |即時付款 |
| **地理** |最接近客户的PSP |跨境|
| **負載平衡** |循環賽/加權 |流量分佈 |
| **A/B 測試** |隨機分割|測試新 PSP |

### 2.3 故障转移模式

```
Primary PSP (VNPay)
    │
    ├── Success → Done
    │
    ├── Timeout/5xx → Retry once
    │       │
    │       ├── Success → Done
    │       │
    │       └── Fail → Fallback PSP (Stripe)
    │                   │
    │                   ├── Success → Done
    │                   │
    │                   └── Fail → Return error to customer
    │
    └── Terminal error (declined) → Return error (no fallback)
```

---

## 3. PSP 健康監測

```java
@Component
public class PSPHealthMonitor {
    // Track success rate per PSP with sliding window
    private final Map<String, SlidingWindowCounter> successRates;

    @Scheduled(fixedRate = 60000) // Every minute
    public void checkHealth() {
        for (var entry : successRates.entrySet()) {
            var pspId = entry.getKey();
            var counter = entry.getValue();
            double rate = counter.getSuccessRate();

            if (rate < 0.5) { // < 50% success rate
                circuitBreaker.open(pspId);
                alertService.send("PSP " + pspId + " degraded: " + rate);
            }
        }
    }

    public boolean isHealthy(String pspId) {
        return !circuitBreaker.isOpen(pspId);
    }
}
```

---

## 4. Webhook 處理

### 4.1 接收 PSP 回呼

```java
@RestController
@RequestMapping("/webhooks")
public class WebhookController {

    @PostMapping("/vnpay")
    public ResponseEntity<String> handleVNPayCallback(
            @RequestParam Map<String, String> params) {
        // 1. Verify signature
        if (!vnpayAdapter.verifySignature(params)) {
            return ResponseEntity.badRequest().body("Invalid signature");
        }

        // 2. Process callback
        var paymentId = params.get("vnp_TxnRef");
        var responseCode = params.get("vnp_ResponseCode");

        webhookProcessor.process(WebhookEvent.builder()
            .pspId("vnpay")
            .paymentId(paymentId)
            .status(mapStatus(responseCode))
            .rawPayload(params)
            .build());

        return ResponseEntity.ok("OK");
    }

    @PostMapping("/stripe")
    public ResponseEntity<Void> handleStripeWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String signature) {
        // Verify Stripe webhook signature
        var event = stripeAdapter.verifyAndParse(payload, signature);
        webhookProcessor.process(event);
        return ResponseEntity.ok().build();
    }
}
```

---

## 總結

多 PSP 整合需要：
- **适配器模式**抽象出 PSP 特定的 API
- **智慧路由**最佳化成本、成功率、延遲
- PSP 崩溃时自动进行 **故障转移**
- **附斷路器的健康監測**
- 每個帶有簽名驗證的 PSP 的 **Webhook 處理**

**下一篇文章**：對帳與結算引擎－控制系統與自動結算流程。
