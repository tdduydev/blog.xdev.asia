---
id: 019e4a33-d408-7b20-c001-b1c2d3e4f508
title: 'レッスン 8: Saga パターンと分散トランザクション'
slug: bai-8-saga-pattern-distributed-transactions
description: >-
  ACID がマイクロサービスで機能しないのはなぜですか。サーガパターン: 振り付け vs
  オーケストレーション。トランザクション、冪等性、エラー処理の補償。実践例: 注文→支払い→在庫→発送のワークフロー。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 8
section_title: 'パート 3: マイクロサービスのデータ アーキテクチャ'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: ja
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ アーキテクチャ — レッスン 8</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 8: サーガ パターンと分散</tspan>
      <tspan x="60" dy="42">取引</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 3: マイクロサービスのデータ アーキテクチャ</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## はじめに

Monolith では、トランザクションは簡単です。 `BEGIN → INSERT order → UPDATE inventory → COMMIT`。マイクロサービスでは各サービスが独自のDBを持つ→分散ACIDトランザクションが使えない（2PCは遅すぎる、壊れやすい）。 **Saga パターン** が標準ソリューションです。


![Saga パターン — 分散トランザクションのコレオグラフィーとオーケストレーション](/storage/uploads/2026/04/mfe-ms-diagram-bai8-saga-pattern.webp)

---

## 1. 問題: 分散トランザクション

### 1.1 2PC (2 フェーズ コミット) が適さないのはなぜですか?

- **ブロック**: コーディネーターが決定するまで、すべての参加者はロックされます。
- **単一障害点**: コーディネーターのクラッシュ → デッドロック
- **パフォーマンスの低下**: 遅延が大幅に増加します
- **スケールなし**: 参加者を追加 = 指数関数的に複雑さを追加

### 1.2 最終的な一貫性を受け入れる

> マイクロサービスでは、強整合性の代わりに **結果整合性** を受け入れます。データの一貫性は、**すぐに**ではなく**最終的に**なります。

---

## 2. サーガパターン

Saga = **ローカル トランザクション**の文字列。各トランザクションは 1 つのサービスを更新します。トランザクションが失敗した場合、**補償トランザクション**によって以前の変更が取り消されます。

### 2.1 コレオグラフィーベースのサーガ

各サービスがイベントを発行 → 次のサービスがリッスンして動作します。

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

**利点:** シンプル、疎結合、中央コーディネーターなし
**欠点:** 全体的なフローを追跡するのが難しく、循環依存関係が発生する可能性があります。

### 2.2 オーケストレーションベースのサーガ

Saga Orchestrator はフロー全体を調整します。

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

**利点:** 明確なフロー、理解しやすい、一元化されたエラー処理
**欠点:** オーケストレーターがボトルネックとなり、単一障害点になる可能性があります。

### 2.3 いつ何を使用するか?

|基準 |振付 |オーケストレーション |
|----------|---------------|----------|
| **複雑さ** | 2～3ステップ | 4 ステップ以上 |
| **可視性** |追跡が難しい |クリア |
| **カップリング** |ルース |中 (オーケストレーター向け) |
| **エラー処理** |分散 |集中型 |

---

## 3. 補償取引

補償トランザクション = ビジネス トランザクションの「元に戻す」(DB ロールバックではない):

```
Forward:                  Compensating:
CreateOrder         →     CancelOrder
ProcessPayment      →     RefundPayment
ReserveInventory    →     ReleaseInventory
CreateShipment      →     CancelShipment
```

**注意:** 補償トランザクションは **冪等** である必要があります。つまり、同じ結果で複数回呼び出される必要があります。

---

## 4. 冪等性 — 重複メッセージの処理

分散システムでは、メッセージを複数回送信できます (少なくとも 1 回の配信)。サービスは重複を処理する必要があります。

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

## 5. ハンズオン: E コマース注文編

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

## 概要

- **2PC はマイクロサービスには適していません** - 遅すぎて壊れやすい
- **サガ パターン** = 一連のローカル トランザクション + 補償トランザクション
- **振付**: シンプルなフロー (2 ～ 3 ステップ)、疎結合
- **オーケストレーション**: 複雑なフロー (4 つ以上のステップ)、明確な可視性
- **べき等性**が必要です - 常に重複メッセージを処理します

---

**次の記事:** [レッスン 9: イベント ソーシングと CQRS — いつ必要で、いつ必要でしょうか?](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-9-event-sourcing-cqrs-khi-nao-can-khi-nao-khong)
