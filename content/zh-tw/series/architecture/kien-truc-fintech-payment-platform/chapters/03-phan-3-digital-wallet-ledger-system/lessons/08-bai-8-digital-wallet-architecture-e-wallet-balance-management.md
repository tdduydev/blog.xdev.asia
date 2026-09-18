---
id: 019d8a21-c508-7005-d001-e1f2a3b4c508
title: 第 8 課：數位錢包架構 - 電子錢包和餘額管理
slug: bai-8-digital-wallet-architecture-e-wallet-balance-management
description: 數位錢包架構：帳戶類型、餘額管理、儲值/提現流程。錢包到錢包的轉帳。託管帳戶並持有餘額。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 8
section_title: 第 3 部分：數位錢包和帳本系統
course:
  id: 019d8a21-c500-7005-d001-e1f2a3b4c5d6
  title: 金融科技與支付平台架構
  slug: kien-truc-fintech-payment-platform
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-7844" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-7844)"/>

  <!-- Decorations -->
  <g>
    <circle cx="811" cy="43" r="24" fill="#34d399" opacity="0.08"/>
    <circle cx="1022" cy="134" r="17" fill="#34d399" opacity="0.11"/>
    <circle cx="733" cy="225" r="10" fill="#34d399" opacity="0.14"/>
    <circle cx="944" cy="56" r="33" fill="#34d399" opacity="0.07"/>
    <circle cx="655" cy="147" r="26" fill="#34d399" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <line x1="600" y1="53" x2="1100" y2="133" stroke="#34d399" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="83" x2="1050" y2="153" stroke="#34d399" stroke-width="0.5" opacity="0.08"/>
    <polygon points="977.2487113059643,139 977.2487113059643,167 953,181 928.7512886940357,167 928.7512886940357,139 953,125" fill="none" stroke="#34d399" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#34d399"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#34d399" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#34d399">🏗️ 建築 — 第 8 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 8 課：數位錢包架構 -</tspan>
      <tspan x="60" dy="42">電子錢包和餘額管理</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">金融科技與支付平台架構</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 3 部分：數位錢包和帳本系統</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![第 8 課：數位錢包架構 - 電子錢包和餘額管理](/storage/uploads/2026/03/fintech-bai-8-diagram.webp)

## 簡介

數位錢包是每個金融科技超級應用程式的核心。在越南，MoMo、ZaloPay、ShopeePay 已將電子錢包變成最受歡迎的付款方式。本文將分析一個專業數位錢包平台的架構。

---

## 1. 錢包架構概述

### 1.1 帳戶類型

```
Wallet Account Hierarchy:
├── User Wallet
│   ├── Main Balance (available for payment)
│   ├── Hold Balance (reserved/pending)
│   ├── Bonus Balance (promotions, non-withdrawable)
│   └── Credit Balance (lending, BNPL)
│
├── Merchant Wallet
│   ├── Settlement Balance
│   ├── Fee Balance
│   └── Reserve Balance (for chargebacks)
│
├── Platform Wallet
│   ├── Fee Collection Account
│   ├── Float Account (pooled user funds)
│   └── Escrow Account
│
└── System Wallet
    ├── Suspense Account (unresolved transactions)
    ├── Reconciliation Account
    └── Interest Pool Account
```

### 1.2 核心元件

```
┌─────────────────────────────────────────────────────────────┐
│                 WALLET SERVICE                               │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   Account    │  │   Balance    │  │   Transaction    │  │
│  │   Manager    │  │   Engine     │  │   Processor      │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────────┘  │
│         │                 │                  │               │
│  ┌──────▼───────┐  ┌──────▼───────┐  ┌──────▼───────────┐  │
│  │   KYC        │  │   Hold       │  │   Transfer       │  │
│  │   Validator  │  │   Manager    │  │   Engine         │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Event Store (Kafka)                      │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. 餘額管理

### 2.1 餘額計算策略

```
Strategy 1: Snapshot + Delta (Recommended)
─────────────────────────────────────────
Snapshot (cached): 1,000,000 VND (at timestamp T)
+ Credit: +200,000 (top-up)
+ Credit: +50,000 (cashback)
- Debit: -150,000 (payment)
─────────────────────────────
Current Balance: 1,100,000 VND

Every N transactions or periodically → create new snapshot
```

### 2.2 並發餘額更新

```java
// Optimistic locking approach
@Entity
@Table(name = "wallet_balances")
public class WalletBalance {
    @Id
    private UUID walletId;

    @Column(name = "available_balance")
    private long availableBalance; // In smallest currency unit

    @Column(name = "hold_balance")
    private long holdBalance;

    @Version
    private long version; // Optimistic lock

    public void debit(long amount) {
        if (availableBalance < amount) {
            throw new InsufficientFundsException();
        }
        this.availableBalance -= amount;
    }

    public void credit(long amount) {
        this.availableBalance += amount;
    }

    public void placeHold(long amount) {
        if (availableBalance < amount) {
            throw new InsufficientFundsException();
        }
        this.availableBalance -= amount;
        this.holdBalance += amount;
    }

    public void releaseHold(long amount) {
        this.holdBalance -= amount;
        this.availableBalance += amount;
    }
}
```

### 2.3 資料庫設計

```sql
CREATE TABLE wallet_accounts (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL,
    account_type    VARCHAR(30) NOT NULL, -- 'MAIN', 'BONUS', 'CREDIT'
    currency        VARCHAR(3) NOT NULL DEFAULT 'VND',
    status          VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    kyc_level       INT NOT NULL DEFAULT 0,
    daily_limit     BIGINT NOT NULL,
    monthly_limit   BIGINT NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE wallet_balances (
    wallet_id           UUID PRIMARY KEY REFERENCES wallet_accounts(id),
    available_balance   BIGINT NOT NULL DEFAULT 0,
    hold_balance        BIGINT NOT NULL DEFAULT 0,
    total_credited      BIGINT NOT NULL DEFAULT 0,
    total_debited       BIGINT NOT NULL DEFAULT 0,
    version             BIGINT NOT NULL DEFAULT 0,
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT positive_balance CHECK (available_balance >= 0),
    CONSTRAINT positive_hold CHECK (hold_balance >= 0)
);

CREATE TABLE wallet_transactions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_id       UUID NOT NULL REFERENCES wallet_accounts(id),
    type            VARCHAR(30) NOT NULL, -- 'TOP_UP', 'PAYMENT', 'TRANSFER', 'WITHDRAWAL'
    direction       VARCHAR(10) NOT NULL, -- 'CREDIT', 'DEBIT'
    amount          BIGINT NOT NULL,
    balance_after   BIGINT NOT NULL,
    reference_id    UUID,
    reference_type  VARCHAR(50),
    description     TEXT,
    metadata        JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_wallet_txn_wallet_date
    ON wallet_transactions(wallet_id, created_at DESC);
```

---

## 3. 儲值與提現

### 3.1 儲值流程

```
Customer ──► Select top-up method ──► Payment Gateway
                                           │
                                    ┌──────▼──────┐
                                    │ Bank/Card   │
                                    │ Charge      │
                                    └──────┬──────┘
                                           │ Success
                                    ┌──────▼──────┐
                                    │ Credit      │
                                    │ Wallet      │
                                    └──────┬──────┘
                                           │
                                    ┌──────▼──────┐
                                    │ Notify      │
                                    │ Customer    │
                                    └─────────────┘
```

### 3.2 錢包到錢包轉賬

```java
@Transactional
public TransferResult transfer(TransferRequest request) {
    var sender = walletRepository.findWithLock(request.getSenderId());
    var receiver = walletRepository.findWithLock(request.getReceiverId());

    // Validate
    sender.validateTransfer(request.getAmount());
    limitChecker.check(sender, request.getAmount());

    // Execute double-entry
    sender.debit(request.getAmount());
    receiver.credit(request.getAmount());

    // Save both
    walletRepository.save(sender);
    walletRepository.save(receiver);

    // Record transactions
    var debitTxn = WalletTransaction.debit(sender, request.getAmount());
    var creditTxn = WalletTransaction.credit(receiver, request.getAmount());
    transactionRepository.saveAll(List.of(debitTxn, creditTxn));

    // Publish event
    eventBus.publish(new TransferCompletedEvent(request));

    return TransferResult.success(debitTxn.getId());
}
```

---

## 4. 錢包限制和 KYC

### 4.1 限額結構（依SBV規定）

```
KYC Level 0 (chưa xác minh):
├── Số dư tối đa: 10,000,000 VND
├── Giao dịch/ngày: 5,000,000 VND
└── Giao dịch/tháng: 20,000,000 VND

KYC Level 1 (xác minh cơ bản):
├── Số dư tối đa: 50,000,000 VND
├── Giao dịch/ngày: 30,000,000 VND
└── Giao dịch/tháng: 100,000,000 VND

KYC Level 2 (xác minh đầy đủ - eKYC):
├── Số dư tối đa: 100,000,000 VND
├── Giao dịch/ngày: 100,000,000 VND
└── Giao dịch/tháng: 300,000,000 VND
```

---

## 總結

數位錢包需要在效能（並發存取）和正確性（不花錢）之間取得平衡：
- **樂觀鎖定**用於平衡更新
- 每筆交易可進行**複式記帳**
- **根據 KYC 等級限制執行**
- **事件驅動**用於非同步處理

**下一篇文章**：複式記帳系統－金融科技的會計引擎設計。
