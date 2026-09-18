---
id: 019e4a33-d401-7b20-c001-b1c2d3e4f501
title: 'レッスン 1: モノリスからマイクロサービスおよびマイクロ フロントエンドへ — アーキテクチャの進化のロードマップ'
slug: bai-1-tu-monolith-den-microservices-micro-frontend-lo-trinh-tien-hoa
description: >-
  モノリスがボトルネックになった理由、マイクロサービスへの進化の旅、そしてフロントエンドも分離する必要がある理由を理解します。モノリス、SOA、マイクロサービス、マイクロ
  フロントエンドを比較します。変換を開始する時期。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 1
section_title: 'パート 1: 基礎 — アーキテクチャの進化'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-3693" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-3693)"/>

  <!-- Decorations -->
  <g>
    <circle cx="930" cy="100" r="8" fill="#38bdf8" opacity="0.05"/>
    <circle cx="760" cy="210" r="8" fill="#38bdf8" opacity="0.05"/>
    <circle cx="1090" cy="60" r="8" fill="#38bdf8" opacity="0.05"/>
    <circle cx="920" cy="170" r="8" fill="#38bdf8" opacity="0.05"/>
    <circle cx="750" cy="280" r="8" fill="#38bdf8" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <line x1="600" y1="140" x2="1100" y2="220" stroke="#38bdf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="170" x2="1050" y2="240" stroke="#38bdf8" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1020.3108891324554,172.5 1020.3108891324554,207.5 990,225 959.6891108675446,207.5 959.6891108675446,172.5 990,155" fill="none" stroke="#38bdf8" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#38bdf8"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#38bdf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#38bdf8">🏗️ アーキテクチャ — レッスン 1</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 1: モノリスからマイクロサービスへ</tspan>
      <tspan x="60" dy="42">マイクロ フロントエンド — Ant 進化ロードマップ</tspan>
      <tspan x="60" dy="42">竹</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="286" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで</text>

  <!-- Section -->
  <text x="60" y="310" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 1: 基礎 — アーキテクチャの進化</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## はじめに

ほとんどのソフトウェア システムは **モノリス** として始まりますが、それは当然のことです。しかし、システムが成長し、チームが拡大し、要件が継続的に変化するにつれて、モノリス アーキテクチャは徐々に**ボトルネック**になります。このレッスンは、ソフトウェア アーキテクチャの進化の過程全体と、**マイクロサービス + マイクロ フロントエンド** が複雑なシステムの目的地である理由を理解するのに役立ちます。

---

## 1. モノリス — 合理的な出発点

### 1.1 モノリスアーキテクチャとは何ですか?

![モノリス アーキテクチャ — すべてのモジュールを 1 つのブロックにまとめ、データベースを共有](/storage/uploads/2026/04/mfe-ms-diagram-bai1-monolith-architecture.webp)

モノリスは、**アプリケーション全体**が**単一ユニット**として構築、デプロイ、拡張されるアーキテクチャです。すべてのモジュール (ユーザー、製品、注文など) は同じプロセスで実行され、同じデータベースを共有し、一緒にデプロイされます。

### 1.2 モノリスの利点

|利点 |説明 |
|----------|----------|
| **シンプル** |開発、デバッグ、初期テストが簡単 |
| **展開が簡単** | 1 つのアーティファクトをデプロイするだけ |
| **パフォーマンス** |ネットワーク経由ではなく内部 (インプロセス) で関数を呼び出します。
| **ACID トランザクション** |モジュール間でトランザクションを簡単に実行 |
| **リファクタリングが簡単** |優れた IDE サポート、簡単な検索と名前変更 |

### 1.3 モノリスはいつ問題になるのですか?

システムが成長するにつれて、Monolith は **ボトルネック** に遭遇します。

**開発について:**

- コードベースが大きすぎるため、新しい開発者が理解するのに多くの時間が必要です
- ビルド時間は数十分に増加
- チーム間で競合を継続的にマージします
- 小さなバグがシステム全体をクラッシュさせる可能性があります

**展開について:**

- 1 つの小さな変更でアプリケーション全体をデプロイ
- リリースサイクルは続く(数週間/数ヶ月)
- 複雑なロールバック、全体的な影響

**スケーリングについて:**

- 1 つのモジュールだけがより多くのリソースを必要とする場合は、完全に拡張する必要があります
- 部品ごとに異なる技術を使用することはできません

> **経験則:** **開発者が 5 人未満**で、システムが**複雑すぎない**場合は、依然として Monolith が最良の選択です。

---

## 2. アーキテクチャ進化の旅

### 2.1 モノリス → SOA → マイクロサービス

```
Timeline:
2000s          2010s              2015+              2020+
┌──────┐    ┌──────────┐    ┌──────────────┐    ┌───────────────────┐
│Monolith│ → │   SOA    │ → │ Microservices│ → │ Microservices +   │
│       │    │Services  │    │              │    │ Micro Frontend    │
└──────┘    └──────────┘    └──────────────┘    └───────────────────┘
```

### 2.2 SOA (サービス指向アーキテクチャ)

![ESB を使用した SOA — 集中バスが単一障害点になる](/storage/uploads/2026/04/mfe-ms-diagram-bai1-soa-architecture.webp)

SOA は、Monolith をサービスに分離するための最初のステップです。ただし、SOA にはいくつかの制限があります。

- 集中型 **ESB (Enterprise Service Bus)** を使用 → 単一障害点
- サービスは **完全に独立していない**ことがよくあります (共有データベース、共有ライブラリ)
- 複雑なプロトコル (SOAP、WS-*)

### 2.3 マイクロサービス — SOA は正しく行われています

マイクロサービスは SOA の考え方を継承していますが、中心となる原則は次のとおりです。

```
┌──────────────────────────────────────────────────────┐
│                 API GATEWAY                          │
└──────┬──────────┬──────────────┬─────────────────────┘
       │          │              │
  ┌────┴────┐ ┌───┴────┐  ┌─────┴─────┐
  │  User   │ │Product │  │  Order    │
  │ Service │ │Service │  │  Service  │
  │         │ │        │  │           │
  │ ┌─────┐ │ │┌─────┐ │  │ ┌──────┐  │
  │ │ DB  │ │ ││ DB  │ │  │ │  DB  │  │
  │ └─────┘ │ │└─────┘ │  │ └──────┘  │
  └─────────┘ └────────┘  └───────────┘
  
  Mỗi service: Own database, Own deployment, Own team
```

**SOA とマイクロサービスの比較:**

|基準 | SOA |マイクロサービス |
|----------|-----|---------------|
|コミュニケーション | ESB (集中型) |スマート エンドポイント、ダム パイプ |
|データ |人気の共有DB |サービスごとのデータベース |
|サイズ |非常に大きくなる可能性があります |小さく、焦点を絞った |
|デプロイ |通常は | を使用してデプロイされます。独立した展開 |
|テクノロジー |通常は均一 |多言語対応 |

---

## 3. フロントエンド モノリス — 無視されている問題

### 3.1 バックエンドは分離されましたが、フロントエンドはまだマージされています

![フロントエンド モノリス — バックエンドは分離されましたが、フロントエンドは依然として巨大な SPA です](/storage/uploads/2026/04/mfe-ms-diagram-bai1-frontend-monolith-problem.webp)

多くの組織がバックエンドにマイクロサービスを採用していますが、フロントエンドは依然として **1 つの巨大な SPA アプリケーション** (React/Angular/Vue モノリス) です。

### 3.2 フロントエンドモノリスの結果

- **コード結合**: すべてのチームが同じフロントエンド リポジトリに貢献します
- **技術ロックイン**: フレームワークを段階的にアップグレードできない
- **ビルドが遅い**: バンドルのサイズが大きくなっています
- **展開のボトルネック**: フロントエンド全体を展開する必要がある
- **チームの依存関係**: チーム A はチーム B がコードをマージするのを待ちます

### 3.3 マイクロ フロントエンド — ソリューション

```
┌─────────┐  ┌──────────┐  ┌─────────────┐
│  User   │  │ Product  │  │   Order     │
│  MFE    │  │   MFE    │  │    MFE      │
│ (React) │  │  (Vue)   │  │  (React)    │
└────┬────┘  └─────┬────┘  └──────┬──────┘
     │             │              │
     └─────────┬───┴──────────────┘
               │
     ┌─────────┴──────────┐
     │   SHELL / CONTAINER │
     │   Application       │
     └────────┬────────────┘
              │
┌─────────────┴────────────────────────┐
│            API GATEWAY               │
└──────┬──────────┬──────────┬─────────┘
  ┌────┴────┐ ┌───┴────┐ ┌──┴────────┐
  │User µS  │ │Product │ │Order µS   │
  └─────────┘ └────────┘ └───────────┘
```

---

＃＃４．いつ切り替えるべきでしょうか？

### 4.1 信号にはマイクロサービスが必要

- [ ] **チーム > 10 名** 同じコードベースで作業
- [ ] **リリースは別のチームによってブロックされています**
- [ ] **不均一なスケーリング**: 1 つのモジュールをスケーリングする必要がありますが、すべてのモジュールをスケーリングする必要があります
- [ ] **テクノロジーのロックイン**: 新しいテクノロジーを使用したいが使用できない
- [ ] **障害カスケード**: 1 つのバグによりシステム全体がクラッシュします

### 4.2 信号にはマイクロ フロントエンドが必要

- [ ] **複数のチーム**が同じフロントエンド アプリで機能を開発
- [ ] **フロントエンドのビルド時間** > 5 分
- [ ] **競合をマージ** フロントエンドを頻繁に行う
- [ ] **フレームワークをアップグレードしたい**が、すべてを変更する必要があります
- [ ] 各 UI パーツの **独立したリリース**

### 4.3 すべきでない場合は?

> **壊れていないものを直す必要はありません。**

- 小規模チーム (開発者 5 名未満) → モノリスで十分
- MVP / スタートアップ → アーキテクチャよりも開発スピードが重要
- シンプルなシステム、わずかな変更 → オーバーエンジニアリング
- チームに十分な DevOps 経験がない → マイクロサービスにより運用が複雑になる

---

## 5. このシリーズの概要

### 5.1 学習ロードマップ

```
Phần 1-3:  Backend Foundation → DDD, Service Design, Data Architecture
Phần 4-5:  Micro Frontend    → Architecture, Implementation, Design System
Phần 6:    Integration Layer  → BFF, API Gateway, GraphQL Federation
Phần 7-8:  Quality & Deploy   → Testing, CI/CD, Deployment Strategies
Phần 9:    Production         → Observability, Performance, Readiness
Phần 10:   Real World         → Case Study, Migration Guide
```

### 5.2 横断的なプロジェクト

シリーズ全体を通じて、完全な **E コマース プラットフォーム**を設計します。

- **5 つのマイクロサービス**: ユーザー、製品、カート、注文、支払い
- **5 つのマイクロ フロントエンド**: ホームページ、製品詳細、カート、チェックアウト、アカウント
- **共有**: 設計システム、認証、API ゲートウェイ

---

## 概要

|建築 |いつ使用するか |主なトレードオフ |
|----------|---------------|-----|
| **モノリス** |小規模チーム、MVP、シンプルなシステム |始めるのは簡単だが拡張するのは難しい |
| **マイクロサービス** |大規模なチーム、独立して拡張する必要がある |複雑な運用とデータ |
| **マイクロ フロントエンド** |多くの FE チームは個別に展開する必要があります |バンドル サイズを増やすには、システム設計が必要です |
| **フルスタック (MS + MFE)** |大規模な組織、複雑な製品 |高い DevOps 成熟度が必要 |

## 続きを読む

- [Martin Fowler — Microservices](https://martinfowler.com/articles/microservices.html)
- [Martin Fowler — Micro Frontends](https://martinfowler.com/articles/micro-frontends.html)
- [microservices.io — Pattern Language](https://microservices.io/patterns/microservices.html)
- [micro-frontends.org](https://micro-frontends.org/)

---

**次の記事:** [レッスン 2: ドメイン駆動設計 — システム分離の考え方](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-2-domain-driven-design-tu-duy-phan-tach-he-thong)
