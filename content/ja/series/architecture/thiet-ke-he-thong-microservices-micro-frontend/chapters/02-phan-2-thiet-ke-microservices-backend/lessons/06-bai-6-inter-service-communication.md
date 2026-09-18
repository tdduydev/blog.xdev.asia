---
id: 019e4a33-d406-7b20-c001-b1c2d3e4f506
title: 'レッスン 6: サービス間通信 — 同期、非同期、およびイベント駆動型'
slug: bai-6-inter-service-communication-sync-async-event-driven
description: >-
  同期 (HTTP、gRPC) 通信と非同期 (メッセージ キュー、イベント ストリーミング)
  通信。リクエスト-返信、パブリッシュ-サブスクライブ、イベント通知パターン。 RabbitMQ を使用するか、Kafka を使用するか、NATS
  を使用するか。モノリスアンチパターンの配布は避けてください。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 6
section_title: 'パート 2: マイクロサービス バックエンドの設計'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-791" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-791)"/>

  <!-- Decorations -->
  <g>
    <circle cx="688" cy="174" r="36" fill="#fbbf24" opacity="0.09"/>
    <circle cx="776" cy="222" r="20" fill="#fbbf24" opacity="0.13"/>
    <circle cx="864" cy="270" r="34" fill="#fbbf24" opacity="0.07"/>
    <circle cx="952" cy="58" r="18" fill="#fbbf24" opacity="0.11"/>
    <circle cx="1040" cy="106" r="32" fill="#fbbf24" opacity="0.05"/>
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
    <line x1="600" y1="74" x2="1100" y2="154" stroke="#fbbf24" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="104" x2="1050" y2="174" stroke="#fbbf24" stroke-width="0.5" opacity="0.08"/>
    <polygon points="999.1147367097487,159.5 999.1147367097487,188.5 974,203 948.8852632902513,188.5 948.8852632902513,159.5 974,145" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fbbf24"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fbbf24" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ アーキテクチャ — レッスン 6</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 6: サービス間通信 — 同期、</tspan>
      <tspan x="60" dy="42">非同期およびイベント駆動型</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 2: マイクロサービス バックエンドの設計</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## はじめに

マイクロサービスが相互に通信する方法によって、システム全体の**結合、信頼性、およびパフォーマンス**が決まります。この記事では、通信パターンを分析し、各ユースケースに適切なパターンを選択するためのガイドを示します。


![サービス間通信 - 同期、非同期、イベント ストリーミング](/storage/uploads/2026/04/mfe-ms-diagram-bai6-communication-patterns.webp)

---

## 1. 同期通信

### 1.1 要求と応答のパターン

```
┌──────────┐   HTTP/gRPC    ┌──────────┐
│  Order   │ ──────────────►│ Product  │
│  Service │◄────────────── │ Service  │
└──────────┘   Response     └──────────┘

Order Service gọi Product Service để validate product trước khi tạo order.
Phải đợi response → coupling tạm thời (temporal coupling).
```

**利点:**
- シンプル、分かりやすく、デバッグが簡単
- すぐに対応
- 明示的なエラー処理 (HTTP ステータス コード)

**短所:**
- 時間的結合: 応答を受信するまで発信者はブロックされます
- カスケード障害: 製品サービスがダウンした場合 → 注文サービスも失敗します
- 呼び出しチェーン内のホップごとに遅延が増加します

### 1.2 同期のリスクを最小限に抑える

- **サーキット ブレーカー**: ダウンストリーム サービスに障害が発生したときに回線を遮断します
- **タイムアウト**: 適切なタイムアウトを設定します (長すぎない)
- **バックオフを使用して再試行**: 指数バックオフを使用して再試行します
- **フォールバック**: キャッシュされたデータまたはデフォルトの応答を返します。
- **バルクヘッド**: ダウンストリームごとに接続プールを分離します。

---

## 2. 非同期通信

### 2.1 メッセージキューのパターン

```
┌──────────┐   Enqueue      ┌──────────┐   Dequeue     ┌──────────┐
│  Order   │ ──────────────►│  Queue   │──────────────►│  Email   │
│  Service │                │(RabbitMQ)│               │  Service │
└──────────┘                └──────────┘               └──────────┘

Fire-and-forget: Order Service gửi message, không đợi.
Email Service xử lý khi sẵn sàng (rate riêng).
Queue đảm bảo message không mất.
```

**使用例:**
- タスク分散（メール送信、画像リサイズ）
- ワークキュー (ビデオの処理、レポートの生成)
- 負荷平準化（トラフィックの急増を吸収）

### 2.2 イベント ストリーミング / Pub-Sub パターン

```
┌──────────┐                ┌──────────────┐
│  Order   │──publish──────►│    Kafka     │
│  Service │  OrderPlaced   │   Topic:     │
└──────────┘                │  orders      │
                            └──┬───┬───┬───┘
                               │   │   │
                    ┌──────────┘   │   └──────────┐
                    ▼              ▼              ▼
              ┌──────────┐  ┌──────────┐  ┌──────────┐
              │ Payment  │  │Inventory │  │  Email   │
              │ Service  │  │ Service  │  │  Service │
              └──────────┘  └──────────┘  └──────────┘

1 event → N consumers. Services không biết nhau → loose coupling.
Events được lưu trữ → có thể replay (event sourcing).
```

**使用例:**
- ドメイン イベント (OrderPlaced、Paymentconfirmed)
- サービス間でのデータ レプリケーション
- イベントソーシングと監査証跡
- リアルタイム分析

### 2.3 イベント通知とイベント伝達による状態転送

|パターン |イベントの内容 |消費者は何を必要としているのか |
|------|--|------|
| **イベントのお知らせ** | IDのみ： `{orderId: "123"}` |ソース サービスを再度クエリする |
| **イベントが発生した状態** |完全なデータ: `{orderId, items, total, ...}` |再度クエリする必要はありません |

**推奨事項:** Event-Carried State Transfer は結合を軽減するのに役立ちます (コンシューマはソースを再度呼び出す必要がありません)。

---

## 3. メッセージ ブローカーを比較する

|特長 |ラビットMQ |アパッチカフカ |ナッツ |
|----------|----------|---------------|----------|
| **モデル** |メッセージキュー |イベントストリーム/ログ | Pub/Sub + JetStream |
| **注文** |キューごと |パーティションごと |主題ごと |
| **保持** |消費→削除 |設定可能 (日数/永久) | JetStream: 設定可能 |
| **スループット** | ~50,000 メッセージ/秒 | ~100万メッセージ/秒 | ~10M メッセージ/秒 |
| **リプレイ** |いいえ |はい (オフセットベース) |ジェットストリーム: はい |
| **消費者グループ** |はい |はい |ジェットストリーム: はい |
| **複雑さ** |平均 |高 (ZooKeeper/KRaft) |低い |
| **こんな用途に最適** |タスクキュー、RPC |イベントストリーミング、ソーシング |クラウドネイティブ、軽量 |

### 3.1 いつ何を使用するか?

```
RabbitMQ: Task queues (send email, process image)
          Request-Reply pattern (RPC over messages)
          Complex routing (exchanges, bindings)

Kafka:    Domain events (OrderPlaced, PaymentConfirmed)
          Event sourcing & CQRS
          Data pipeline & streaming analytics
          Audit trail (event log)

NATS:     Lightweight microservices communication
          Real-time messaging (chat, notifications)
          Cloud-native, Kubernetes-native
          Request-Reply + Pub/Sub combined
```

---

## 4. ハイブリッドアプローチ (生産パターン)

実際には、ほとんどのシステムは **両方の組み合わせ** を使用します。

```
┌─────────────────────────────────────────────────┐
│              E-Commerce Communication           │
├─────────────────────────────────────────────────┤
│ SYNCHRONOUS (REST/gRPC):                        │
│ • GET product details (query, cần response ngay)│
│ • Validate payment (command, cần kết quả)       │
│ • Search products (query, real-time)            │
├─────────────────────────────────────────────────┤
│ ASYNCHRONOUS (Kafka Events):                    │
│ • OrderPlaced → trigger Payment, Inventory      │
│ • PaymentConfirmed → trigger Shipping           │
│ • UserRegistered → trigger Welcome Email        │
│ • ProductUpdated → update Search Index          │
└─────────────────────────────────────────────────┘
```

---

## 概要

|パターン |いつ使用するか |トレードオフ |
|----------|---------------|----------|
| **同期 (REST/gRPC)** |即時応答が必要、データを問い合わせる |密結合、カスケード障害 |
| **非同期キュー** |タスク分散、負荷平準化 |最終的な整合性 |
| **非同期イベント** |ドメイン イベント、データ同期 |複雑さ、デバッグが難しい |
| **ハイブリッド** |制作推奨 |両方を管理する必要がある |

---

**次の記事:** [レッスン 7: サービスごとのデータベースと多言語の永続性](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-7-database-per-service-polyglot-persistence)
