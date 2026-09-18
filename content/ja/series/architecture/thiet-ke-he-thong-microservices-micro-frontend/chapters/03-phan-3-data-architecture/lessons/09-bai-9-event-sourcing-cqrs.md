---
id: 019e4a33-d409-7b20-c001-b1c2d3e4f509
title: 'レッスン 9: イベント ソーシングと CQRS — いつ必要で、いつ必要でしょうか?'
slug: bai-9-event-sourcing-cqrs-khi-nao-can-khi-nao-khong
description: >-
  イベント ソーシング: 状態の代わりにイベントを保存します。 CQRS: 個別の読み取り/書き込みモデル。イベント ソーシングと CQRS
  を組み合わせます。トレードオフ、複雑さ、意思決定の枠組み。 CQRS が複雑すぎるのはどのような場合でしょうか。また、CQRS
  が本当に必要なのはどのような場合でしょうか?
duration_minutes: 75
is_free: true
video_url: null
sort_order: 9
section_title: 'パート 3: マイクロサービスのデータ アーキテクチャ'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-4055" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-4055)"/>

  <!-- Decorations -->
  <g>
    <circle cx="861" cy="53" r="24" fill="#34d399" opacity="0.08"/>
    <circle cx="622" cy="234" r="17" fill="#34d399" opacity="0.11"/>
    <circle cx="883" cy="155" r="10" fill="#34d399" opacity="0.14"/>
    <circle cx="644" cy="76" r="33" fill="#34d399" opacity="0.07"/>
    <circle cx="905" cy="257" r="26" fill="#34d399" opacity="0.1"/>
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
    <line x1="600" y1="203" x2="1100" y2="283" stroke="#34d399" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="233" x2="1050" y2="303" stroke="#34d399" stroke-width="0.5" opacity="0.08"/>
    <polygon points="985.9089653438086,134 985.9089653438086,172 953,191 920.0910346561914,172 920.0910346561914,134 953,115" fill="none" stroke="#34d399" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#34d399"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#34d399" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#34d399">🏗️ アーキテクチャ — レッスン 9</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 9: イベント ソーシングと CQRS — いつ</tspan>
      <tspan x="60" dy="42">必要なとき、必要ないときは？</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 3: マイクロサービスのデータ アーキテクチャ</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## はじめに

イベント ソーシングと CQRS は 2 つの強力なパターンですが、**悪用されることが多い** パターンです。この記事は、その性質、実際の利点、そして最も重要なことである **使用すべきではない場合** を理解するのに役立ちます。


![CQRS とイベント ソーシング — 個別のコマンドとクエリ](/storage/uploads/2026/04/mfe-ms-diagram-bai9-cqrs-event-sourcing.webp)

---

## 1. イベントソーシング

### 1.1 中心となるアイデア

**現在の状態**を保存する代わりに、発生した**一連のイベント**を保存します。

```
Traditional (State-based):
┌─────────────────────────┐
│ orders table            │
│ id: 123                 │
│ status: SHIPPED   ← chỉ biết trạng thái hiện tại
│ total: 500.000         │
└─────────────────────────┘

Event Sourcing:
┌─────────────────────────────────────┐
│ Event Store (Order #123)            │
│ 1. OrderCreated    {items, total}   │
│ 2. PaymentReceived {amount}         │
│ 3. ItemRemoved     {itemId}   ← biết toàn bộ lịch sử
│ 4. OrderConfirmed  {}               │
│ 5. OrderShipped    {trackingId}     │
└─────────────────────────────────────┘

State = replay(events) → current state
```

### 1.2 利点

- **完全な監査証跡**: 誰がいつ何をしたかを正確に把握できます
- **タイムトラベル**: いつでも状態を再構築できます
- **デバッグ**: イベントをリプレイしてバグを再現します。
- **分析**: イベント パターンを分析します。

### 1.3 欠点

- **複雑さ**: イベント ストア、プロジェクション、スナップショットが必要
- **結果整合性**: 読み取りモデルはリアルタイムではありません
- **スキーマの進化**: イベント スキーマの変更は非常に困難です
- **難しいクエリ**: ステータス = '発送済み' の注文から * を選択することはできません

---

## 2. CQRS (コマンドクエリ責任分離)

### 2.1 読み取りと書き込みの分離

```
Traditional:
┌──────────┐     ┌──────────┐
│  Client  │────►│ Service  │────► Database
│          │◄────│(CRUD all)│◄──── (1 model)
└──────────┘     └──────────┘

CQRS:
                 ┌──────────────┐     ┌────────────┐
           ────► │ Command Side │────►│ Write DB   │
┌──────────┐     │ (Create,     │     │ (optimized │
│  Client  │     │  Update)     │     │  for write)│
└──────────┘     └──────────────┘     └─────┬──────┘
           ────► ┌──────────────┐           │ Events
                 │ Query Side   │     ┌─────▼──────┐
           ◄──── │ (Read,       │◄────│ Read DB    │
                 │  Search)     │     │ (optimized │
                 └──────────────┘     │  for read) │
                                      └────────────┘
```

### 2.2 CQRS が価値があるのはどのような場合ですか?

- 読み取り/書き込み比率 **大きく異なります** (読み取り 90%、書き込み 10%)
- 読み取りモデルには **別の形式** 書き込みモデルが必要です (非正規化ビュー)
- **読み取り/書き込みを独立してスケーリング**する必要がある(リードレプリカを追加する)
- 複雑なクエリには **最適化された読み取りモデル** が必要です (Elasticsearch、マテリアライズド ビュー)

---

## 3. 意思決定の枠組み

### 3.1 イベント ソーシング + CQRS をいつ使用するか?

✅ 金融システム (監査証跡が必要)
✅ 注文処理（複雑なステータス、ニーズ履歴）
✅ 共同編集 (競合の解決)
✅ 規制遵守（何が起こったかを証明する必要がある）

### 3.2 使用すべきでない場合は?

❌ 単純な CRUD (ブログ、ユーザー プロファイル) → やりすぎ
❌ チームが小さく、経験がない → 学習曲線が高すぎる
❌ 証跡やタイムトラベルを監査する必要はありません
❌ リアルタイムの一貫性が必要です

### 3.3 イベント ソーシングなしで CQRS を使用できる

```
CQRS without Event Sourcing (pragmatic approach):

Write Side: PostgreSQL (normalized)
  → On write: publish event to Kafka
  
Read Side: Elasticsearch (denormalized)
  → Consumer: listen events → update search index

Đơn giản hơn nhiều, vẫn có lợi ích tách read/write.
```

---

## 4. 電子商取引への申請

```
Product Service: CQRS (no Event Sourcing)
  Write: PostgreSQL (products table)
  Read:  Elasticsearch (search index, facets)
  Sync:  ProductUpdated event → ES consumer

Order Service: Event Sourcing + CQRS (trạng thái phức tạp)
  Event Store: PostgreSQL (events table)
  Read Model: PostgreSQL (materialized orders view)
  
Cart Service: Simple CRUD (Redis)
  Không cần CQRS — read/write model giống nhau

User Service: Simple CRUD (PostgreSQL)
  Không cần CQRS — straightforward CRUD
```

---

## 概要

|パターン |複雑さ |いつ使用するか |避けるべき場合 |
|----------|-----------|---------------|-----------|
| **シンプルな CRUD** |低い |ほとんどのサービス |高トラフィックの読み取り |
| **CQRS のみ** |中 |個別の読み取り/書き込みスケール |単純なドメイン |
| **イベントソーシング** |高 |監査証跡、タイムトラベル |シンプルな CRUD |
| **ES + CQRS** |非常に高い |財務、発注 |その他ほぼすべて |

> **黄金律:** シンプル (CRUD) から始めてください。 CQRS/ES は、特定の**問題点**が必要であることが判明した場合にのみ追加してください。

---

**次の記事:** [レッスン 10: マイクロ フロントエンドとは何ですか? — 利点、トレードオフ、意思決定の枠組み](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-10-micro-frontend-la-gi-loi-ich-trade-offs-decision-framework)
