---
id: 019d8a21-c502-7005-d001-e1f2a3b4c502
title: 'レッスン 2: プラットフォーム アーキテクチャの概要 - FinTech 向けのマイクロサービスと DDD'
slug: bai-2-platform-architecture-overview-microservices-ddd-cho-fintech
description: >-
  マイクロサービスとドメイン駆動設計を使用して、FinTech
  プラットフォームの全体的なアーキテクチャを設計します。支払い、ウォレット、元帳、リスク、アイデンティティの境界付きコンテキスト。イベント駆動型アーキテクチャと
  API ゲートウェイ パターン。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 2
section_title: 'パート 1: FinTech と決済プラットフォーム'
course:
  id: 019d8a21-c500-7005-d001-e1f2a3b4c5d6
  title: FinTech と決済プラットフォームのアーキテクチャ
  slug: kien-truc-fintech-payment-platform
locale: ja
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ アーキテクチャ — レッスン 2</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 2: プラットフォーム アーキテクチャの概要 -</tspan>
      <tspan x="60" dy="42">FinTech 向けのマイクロサービスと DDD</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">FinTech と決済プラットフォームのアーキテクチャ</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 1: FinTech と決済プラットフォーム</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![レッスン 2: プラットフォーム アーキテクチャの概要 - FinTech 向けのマイクロサービスと DDD](/storage/uploads/2026/03/fintech-bai-2-diagram.webp)

## はじめに

FinTech プラットフォームは、単純なモノリシック アプリケーションではありません。明確に分離する必要がある多くの異なるドメインを含む複雑なシステムです。この記事では、**マイクロサービス** と **ドメイン駆動設計 (DDD)** を使用して全体的なアーキテクチャを設計します。

---

## 1. 高レベルのアーキテクチャ

### 1.1 システム概要

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

1. **ドメインファースト**: 技術層ではなくドメインごとにサービスを分割します。
2. **サービスごとのデータベース**: 各サービスは独自のデータを所有します。
3. **イベント駆動型通信**: クロスドメインの非同期通信
4. **API ファーストの設計**: OpenAPI によるコントラクトファーストのアプローチ
5. **多層防御**: あらゆる層でのセキュリティ

---

## 2. FinTech 向けのドメイン駆動設計

### 2.1 戦略的設計 — 境界のあるコンテキスト

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

### 2.2 コンテキストマッピング

```
Identity ──[U/D]──► Payment    (Identity upstream, Payment downstream)
Payment  ──[Pub]──► Ledger     (Payment publishes events, Ledger subscribes)
Payment  ──[Pub]──► Risk       (Payment publishes for fraud check)
Payment  ──[ACL]──► PSP        (Anti-corruption layer for external PSPs)
Wallet   ──[Pub]──► Ledger     (Wallet changes reflected in Ledger)
Merchant ──[Pub]──► Reporting  (Merchant events feed Reporting)
Risk     ──[U/D]──► Payment    (Risk provides scoring to Payment)
```

**使用パターン**:
- **公開言語**: イベントは同じスキーマを使用します (Avro/Protobuf)
- **破損防止レイヤー (ACL)**: 外部 PSP API をラップする
- **上流/下流 (U/D)**: 明確な依存関係の方向
- **共有カーネル**: 一般的なタイプ (お金、通貨、住所)

### 2.3 共有カーネル — 共通値オブジェクト

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

## 3. マイクロサービス アーキテクチャ

### 3.1 サービストポロジ

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

### 3.2 通信パターン

|パターン |使用例 |例 |
|----------|----------|----------|
| **同期 (REST/gRPC)** |リアルタイムクエリ |残高の確認、支払い状況の取得 |
| **非同期 (イベント)** |状態の変化 |支払い完了 → 台帳更新 |
| **コマンド** |アクションリクエスト |支払いの処理、返金の作成 |
| **クエリ** |読み取り専用 |取引履歴を取得する |

### 3.3 サービスごとのデータベース

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

## 4. イベント駆動型アーキテクチャ

### 4.1 ドメインイベント

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

### 4.2 イベントスキーマ (Avro)

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

### 4.3 イベント フロー — 支払い処理

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

## 5. API ゲートウェイの設計

### 5.1 ゲートウェイの責任

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

### 5.2 API のバージョン管理戦略

```
/api/v1/payments       ← Current stable
/api/v2/payments       ← Next version (beta)

Header-based: Accept: application/vnd.fintech.v1+json
```

---

## 6. 横断的な懸念事項

### 6.1 可観測性スタック

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

### 6.2 セキュリティ層

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

## 概要

FinTech プラットフォーム アーキテクチャには次のものが必要です。
- **DDD** により、複雑なドメインを明確に境界付けられたコンテキストに分割します
- 分離のためのサービスごとのデータベースを備えた **マイクロサービス**
- **イベント駆動**による疎結合と最終的な整合性
- **API ゲートウェイ** によるセキュリティ、ルーティング、レート制限
- **多層防御**であらゆる層のセキュリティを実現

**次の記事**: 規制コンプライアンス (PCI-DSS、PSD2、およびベトナム国立銀行の規制) と、コンプライアンス要件を満たすシステムの設計方法について詳しく説明します。
