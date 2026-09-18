---
id: 019d8a21-c502-7005-d001-e1f2a3b4c502
title: 第 2 課：平台架構概述 - 金融科技的微服務與 DDD
slug: bai-2-platform-architecture-overview-microservices-ddd-cho-fintech
description: 使用微服務和領域驅動設計設計金融科技平台的整體架構。支付、錢包、帳本、風險、身分的有界脈絡。事件驅動架構和 API 網關模式。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 2
section_title: 第 1 部分：金融科技與支付平台
course:
  id: 019d8a21-c500-7005-d001-e1f2a3b4c5d6
  title: 金融科技與支付平台架構
  slug: kien-truc-fintech-payment-platform
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-8828" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-8828)"/>

  <!-- Decorations -->
  <g>
    <circle cx="928" cy="214" r="36" fill="#fbbf24" opacity="0.09"/>
    <circle cx="756" cy="102" r="20" fill="#fbbf24" opacity="0.13"/>
    <circle cx="1084" cy="250" r="34" fill="#fbbf24" opacity="0.07"/>
    <circle cx="912" cy="138" r="18" fill="#fbbf24" opacity="0.11"/>
    <circle cx="740" cy="286" r="32" fill="#fbbf24" opacity="0.05"/>
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
    <line x1="600" y1="94" x2="1100" y2="174" stroke="#fbbf24" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="124" x2="1050" y2="194" stroke="#fbbf24" stroke-width="0.5" opacity="0.08"/>
    <polygon points="969.1147367097487,129.5 969.1147367097487,158.5 944,173 918.8852632902513,158.5 918.8852632902513,129.5 944,115" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fbbf24"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fbbf24" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ 建築 — 第 2 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 2 課：平台架構概述 -</tspan>
      <tspan x="60" dy="42">金融科技的微服務與 DDD</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">金融科技與支付平台架構</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 1 部分：金融科技與支付平台</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![第 2 課：平台架構概述 - 金融科技的微服務與 DDD](/storage/uploads/2026/03/fintech-bai-2-diagram.webp)

## 簡介

金融科技平台不是一个简单的整体应用程序——它是一个复杂的系统，具有许多需要明确分离的不同领域。在本文中，我们将使用**微服务**和**领域驱动设计（DDD）**来设计整体架构。

---

## 1. 高層架構

### 1.1 系統概述

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │Mobile App│  │ Web App  │  │Merchant  │  │Partner │ │
│  │          │  │          │  │Dashboard │  │  API   │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───┬────┘ │
└───────┼──────────────┼─────────────┼────────────┼───────┘
        │              │             │            │
┌───────▼──────────────▼─────────────▼────────────▼───────┐
│                   API GATEWAY LAYER                       │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ API Gateway (Kong/Envoy)                            │ │
│  │ ├── Rate Limiting    ├── Authentication             │ │
│  │ ├── Request Routing  ├── SSL Termination            │ │
│  │ └── API Versioning   └── Request/Response Transform │ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────┬───────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│                   SERVICE MESH                            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────┐ │
│  │ Payment  │ │ Wallet   │ │ Ledger   │ │   Risk     │ │
│  │ Service  │ │ Service  │ │ Service  │ │  Service   │ │
│  └──────────┘ └──────────┘ └──────────┘ └────────────┘ │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────┐ │
│  │ Identity │ │ Merchant │ │Reporting │ │Notification│ │
│  │ Service  │ │ Service  │ │ Service  │ │  Service   │ │
│  └──────────┘ └──────────┘ └──────────┘ └────────────┘ │
└─────────────────────────┬───────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│                   DATA LAYER                              │
│  ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────────┐│
│  │PostgreSQL│ │Redis │ │Kafka │ │  S3   │ │Elasticsearch││
│  └───────┘ └───────┘ └───────┘ └───────┘ └───────────┘│
└─────────────────────────────────────────────────────────┘
```

### 1.2 設計原則

1. **领域优先**：按领域划分服务，而不是按技术层划分
2. **每个服务数据库**：每个服务拥有自己的数据
3. **事件驅動通訊**：跨域非同步通信
4. **API 优先设计**：使用 OpenAPI 的契约优先方法
5. **縱深防禦**：每一層的安全

---

## 2. 金融科技領域驅動設計

### 2.1 策略設計－限界上下文

```
┌─────────────────────────────────────────────────────────────┐
│                    FINTECH PLATFORM                          │
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  IDENTITY   │  │   PAYMENT   │  │      WALLET         │ │
│  │   Context   │  │   Context   │  │      Context        │ │
│  │             │  │             │  │                     │ │
│  │ • User      │  │ • Payment   │  │ • Account           │ │
│  │ • KYC       │  │ • Refund    │  │ • Balance           │ │
│  │ • Auth      │  │ • PSP       │  │ • Transaction       │ │
│  │ • Session   │  │ • Checkout  │  │ • Transfer          │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   LEDGER    │  │    RISK     │  │     MERCHANT        │ │
│  │   Context   │  │   Context   │  │     Context         │ │
│  │             │  │             │  │                     │ │
│  │ • Journal   │  │ • Fraud     │  │ • Merchant          │ │
│  │ • Account   │  │ • AML       │  │ • Settlement        │ │
│  │ • Posting   │  │ • KYC       │  │ • Fee               │ │
│  │ • Balance   │  │ • Scoring   │  │ • Contract          │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  LENDING    │  │ REPORTING   │  │   NOTIFICATION      │ │
│  │  Context    │  │  Context    │  │     Context         │ │
│  │             │  │             │  │                     │ │
│  │ • Loan      │  │ • Report    │  │ • Template          │ │
│  │ • Credit    │  │ • Dashboard │  │ • Channel           │ │
│  │ • Schedule  │  │ • Export    │  │ • Preference        │ │
│  │ • Offer     │  │ • Audit     │  │ • History           │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Context Mapping

```
Identity ──[U/D]──► Payment    (Identity upstream, Payment downstream)
Payment  ──[Pub]──► Ledger     (Payment publishes events, Ledger subscribes)
Payment  ──[Pub]──► Risk       (Payment publishes for fraud check)
Payment  ──[ACL]──► PSP        (Anti-corruption layer for external PSPs)
Wallet   ──[Pub]──► Ledger     (Wallet changes reflected in Ledger)
Merchant ──[Pub]──► Reporting  (Merchant events feed Reporting)
Risk     ──[U/D]──► Payment    (Risk provides scoring to Payment)
```

**使用模式**：
- **發布的語言**：事件使用相同的架構（Avro/Protobuf）
- **反腐敗層 (ACL)**：包裝外部 PSP API
- **上游/下游 (U/D)**：明确的依赖方向
- **共享内核**：常见类型（金钱、货币、地址）

### 2.3 共享核心－公共值對象

```java
// Shared across all bounded contexts
public record Money(BigDecimal amount, Currency currency) {
    public Money {
        if (amount.scale() > currency.getDefaultFractionDigits()) {
            throw new IllegalArgumentException("Invalid precision");
        }
    }

    public Money add(Money other) {
        requireSameCurrency(other);
        return new Money(amount.add(other.amount), currency);
    }
}

public record TransactionId(String value) {
    // UUID v7 for time-ordered IDs
    public static TransactionId generate() {
        return new TransactionId(UUIDv7.generate().toString());
    }
}
```

---

## 3.微服務架構

### 3.1 服务拓扑

```
                    ┌──────────────┐
                    │ API Gateway  │
                    └──────┬───────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
   ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
   │   Payment   │ │   Wallet    │ │  Identity   │
   │   Service   │ │   Service   │ │   Service   │
   │             │ │             │ │             │
   │ PostgreSQL  │ │ PostgreSQL  │ │ PostgreSQL  │
   │    Redis    │ │    Redis    │ │    Redis    │
   └──────┬──────┘ └──────┬──────┘ └─────────────┘
          │                │
          └────────┬───────┘
                   │
            ┌──────▼──────┐
            │    Kafka    │  Event Bus
            └──────┬──────┘
                   │
     ┌─────────────┼─────────────┐
     │             │             │
┌────▼────┐ ┌─────▼─────┐ ┌────▼────┐
│ Ledger  │ │   Risk    │ │Reporting│
│ Service │ │  Service  │ │ Service │
│         │ │           │ │         │
│PostgreSQL│ │PostgreSQL │ │ClickHouse│
└─────────┘ │   Redis   │ └─────────┘
            │  ML Model │
            └───────────┘
```

### 3.2 溝通模式

|圖案|使用案例|範例|
|--------|----------|--------|
| **同步（REST/gRPC）** |实时查询 |查看余额，获取付款状态 |
| **异步（事件）** | State changes |付款完成→更新账本|
| **Command** | Action requests |处理付款、创建退款 |
| **查詢** | Read-only |取得交易歷史 |

### 3.3 每個服務的資料庫

```
Payment Service  ──► payment_db (PostgreSQL)
                     ├── payments
                     ├── payment_methods
                     ├── payment_attempts
                     └── refunds

Wallet Service   ──► wallet_db (PostgreSQL)
                     ├── accounts
                     ├── balances
                     ├── transactions
                     └── holds

Ledger Service   ──► ledger_db (PostgreSQL)
                     ├── journal_entries
                     ├── postings
                     ├── accounts
                     └── balances

Risk Service     ──► risk_db (PostgreSQL + Redis)
                     ├── fraud_rules
                     ├── risk_scores
                     ├── blacklists
                     └── ml_features (Redis)
```

---

## 4. 事件驅動架構

### 4.1 Domain Events

```
Payment Domain Events:
├── PaymentInitiated
├── PaymentAuthorized
├── PaymentCaptured
├── PaymentFailed
├── PaymentRefunded
└── PaymentSettled

Wallet Domain Events:
├── AccountCreated
├── BalanceCredited
├── BalanceDebited
├── TransferInitiated
├── TransferCompleted
└── HoldPlaced

Risk Domain Events:
├── FraudCheckRequested
├── FraudCheckCompleted
├── RiskScoreCalculated
├── TransactionBlocked
└── AlertRaised
```

### 4.2 事件架構 (Avro)

```json
{
  "type": "record",
  "name": "PaymentCompletedEvent",
  "namespace": "com.fintech.payment.events",
  "fields": [
    {"name": "eventId", "type": "string"},
    {"name": "eventType", "type": "string"},
    {"name": "timestamp", "type": "long"},
    {"name": "paymentId", "type": "string"},
    {"name": "amount", "type": {"type": "record", "name": "Money", "fields": [
      {"name": "value", "type": "string"},
      {"name": "currency", "type": "string"}
    ]}},
    {"name": "merchantId", "type": "string"},
    {"name": "customerId", "type": "string"},
    {"name": "paymentMethod", "type": "string"},
    {"name": "status", "type": "string"}
  ]
}
```

### 4.3 事件流程－支付處理

```
Customer ─── Initiate Payment ───► Payment Service
                                       │
                                       ├──► Risk Service (Fraud Check)
                                       │       │
                                       │    ◄──┤ (Approved/Rejected)
                                       │
                                       ├──► PSP (Authorize)
                                       │       │
                                       │    ◄──┤ (Auth Response)
                                       │
                                       ├──► Event: PaymentAuthorized
                                       │       │
                                       │       ├──► Wallet Service (Debit)
                                       │       ├──► Ledger Service (Record)
                                       │       ├──► Notification Service
                                       │       └──► Reporting Service
                                       │
                                       └──► Response to Customer
```

---

## 5. API Gateway Design

### 5.1 網關職責

```yaml
API Gateway Configuration:
  authentication:
    - JWT validation
    - API key verification
    - mTLS for service-to-service

  rate_limiting:
    default: 100 req/min
    premium: 1000 req/min
    merchant_api: 5000 req/min

  routing:
    /api/v1/payments/*  → payment-service
    /api/v1/wallets/*   → wallet-service
    /api/v1/merchants/* → merchant-service
    /api/v1/reports/*   → reporting-service

  security:
    - CORS policies
    - Request validation
    - IP whitelisting (for merchant APIs)
    - PCI-DSS compliant headers
```

### 5.2 API 版本控制策略

```
/api/v1/payments       ← Current stable
/api/v2/payments       ← Next version (beta)

Header-based: Accept: application/vnd.fintech.v1+json
```

---

## 6. 跨領域關注點

### 6.1 可觀察性堆疊

```
┌──────────────────────────────────────┐
│          OBSERVABILITY STACK          │
├──────────────────────────────────────┤
│ Metrics:  Prometheus + Grafana       │
│ Logging:  ELK Stack / Loki          │
│ Tracing:  OpenTelemetry + Jaeger    │
│ Alerting: PagerDuty / OpsGenie     │
└──────────────────────────────────────┘
```

### 6.2 Security Layer

```
Defense in Depth:
├── Network: VPC, Security Groups, WAF
├── Transport: TLS 1.3, mTLS
├── Application: JWT, OAuth2, RBAC
├── Data: Encryption at rest (AES-256)
├── Payment: Tokenization, HSM
└── Audit: Immutable audit logs
```

---

## 總結

金融科技平台架構需求：
- **DDD** 将复杂域划分为清晰的有界上下文
- **微服务** 每个服务都带有数据库以进行隔离
- **事件驅動**以實現鬆散耦合和最終一致性
- **API网关**用于安全、路由、速率限制
- **縱深防禦**確保每一層的安全

**下一篇文章**：我們將深入探討監管合規性 — PCI-DSS、PSD2 和越南國家銀行法規 — 以及如何設計系統來滿足合規性要求。
