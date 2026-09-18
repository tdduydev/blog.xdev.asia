---
id: 019d8a22-c301-7a10-b001-a1b2c3d4e501
title: 'レッスン 1: クラウドネイティブとは何ですか? — 原則と 12 要素アプリ'
slug: bai-1-cloud-native-la-gi-nguyen-ly-va-twelve-factor-app
description: >-
  CNCF に基づくクラウド ネイティブの定義、従来型とクラウド ネイティブの比較、12 要素アプリ手法、および最新のアプリケーションにとってクラウド
  ネイティブが避けられないトレンドである理由。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 1
section_title: 'パート 1: クラウド ネイティブの基盤'
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: クラウドネイティブのマイクロサービスアーキテクチャ
  slug: cloud-native-microservices-architecture
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-8733" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-8733)"/>

  <!-- Decorations -->
  <g>
    <circle cx="712" cy="46" r="20" fill="#f87171" opacity="0.11"/>
    <circle cx="824" cy="138" r="26" fill="#f87171" opacity="0.07"/>
    <circle cx="936" cy="230" r="32" fill="#f87171" opacity="0.13"/>
    <circle cx="1048" cy="62" r="8" fill="#f87171" opacity="0.09"/>
    <circle cx="660" cy="154" r="14" fill="#f87171" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <line x1="600" y1="226" x2="1100" y2="306" stroke="#f87171" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="256" x2="1050" y2="326" stroke="#f87171" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1061.507041555162,205.5 1061.507041555162,246.5 1026,267 990.492958444838,246.5 990.492958444838,205.5 1026,185" fill="none" stroke="#f87171" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#f87171"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#f87171" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f87171">🏗️ アーキテクチャ — レッスン 1</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 1: クラウドネイティブとは何ですか? — 原則と</tspan>
      <tspan x="60" dy="42">Twelve-Factor アプリ</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">クラウドネイティブのマイクロサービスアーキテクチャ</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 1: クラウド ネイティブの基盤</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![レッスン 1: クラウドネイティブとは何ですか? — 原則と 12 要素アプリ](/storage/uploads/2026/03/cn-bai-1-diagram.webp)

## はじめに

クラウド コンピューティングは、ソフトウェアの構築と運用の方法を完全に変えました。ただし、単にクラウド上でアプリケーションを実行することは「クラウド ネイティブ」と同義ではありません。このレッスンは、クラウド ネイティブの実際の意味、重要な理由、すべてのエンジニアが習得すべき基本原則を理解するのに役立ちます。

---

## 1. クラウドネイティブとは何ですか?

### 1.1 CNCF による定義

**Cloud Native Computing Foundation (CNCF)** — Kubernetes、Prometheus、Envoy などのプロジェクトを管理する組織によると、次のようになります。

> クラウド ネイティブ テクノロジーにより、組織はパブリック クラウド、プライベート クラウド、ハイブリッド クラウドなどの最新の動的な環境でスケーラブルなアプリケーションを構築して実行できるようになります。コンテナー、サービス メッシュ、マイクロサービス、不変のインフラストラクチャ、宣言型 API は、このアプローチの例です。

簡単に言えば、クラウド ネイティブは、クラウド コンピューティングを最大限に活用するアプリケーションを構築するための **アプローチ**です。

### 1.2 コア機能

```
Cloud Native Application
├── Containerized          → Đóng gói nhất quán, portable
├── Dynamically Orchestrated → Kubernetes tự động quản lý
├── Microservices-oriented  → Chia nhỏ, độc lập, dễ scale
├── Loosely Coupled         → Ít phụ thuộc lẫn nhau
├── Resilient              → Tự phục hồi khi có lỗi
├── Observable             → Giám sát toàn diện (metrics, logs, traces)
└── Automated              → CI/CD, IaC, GitOps
```

### 1.3 クラウドネイティブ ≠ 「クラウド上で実行」

AWS EC2 上で実行されているアプリケーションですが、依然としてモノリスであり、手動でデプロイされ、自動スケーリングはありません。**クラウドネイティブではありません**。

対照的に、完全なコンテナー、CI/CD、可観測性を備えたオンプレミスの Kubernetes クラスター上で実行されるアプリケーション — **これがクラウド ネイティブ**です。

> クラウド ネイティブは、**実行場所**ではなく、**構築および運用方法**に関するものです。

---

## 2. 従来型とクラウドネイティブの比較

|特長 |伝統的な |クラウドネイティブ |
|----------|---------------|--------------|
| **アーキテクチャ** |モノリシック |マイクロサービス |
| **展開** | VM / ベアメタル |コンテナ / Kubernetes |
| **スケーリング** |垂直（拡大） |水平 (スケールアウト) |
| **リリースサイクル** |月刊 / 四半期 |毎日/時間ごと |
| **障害対応** |失敗は何としてでも避けてください |失敗を受け入れ、自己回復する |
| **インフラストラクチャ** |変更可能 (適切に更新) |不変 (完全な置き換え) |
| **州** |ステートフルサーバー |ステートレス サービス + 外部状態 |
| **構成** |サーバー上の構成ファイル |環境変数 / ConfigMap |
| **ネットワーキング** |固定IP |ダイナミックDNS、サービスディスカバリ |
| **モニタリング** |反応性 (いつそれが起こるかを知る) |プロアクティブ (メトリクス、アラート、トレース) |

### 実践例

**従来のアプローチ:**
```
Developer → Build WAR → Gửi cho Ops → Ops deploy lên Tomcat trên VM
→ Cần scale? Mua thêm server, cài đặt thủ công
→ Server die? Downtime cho đến khi fix xong
```

**クラウドネイティブなアプローチ:**
```
Developer → Git push → CI/CD tự động build container image
→ ArgoCD sync → Kubernetes deploy 3 replicas
→ Cần scale? HPA tự thêm pod
→ Pod die? Kubernetes tự restart trong giây
```

---

## 3. なぜクラウドネイティブなのか?

### 3.1 ビジネスの推進要因

- **市場投入までの時間**: 新機能を数週間ではなく数時間で導入します
- **スケーラビリティ**: トラフィックの急増 (ブラック フライデー、フラッシュ セール) を自動的に処理します。
- **コスト効率**: 不要な場合はスケールダウンし、使用した分だけ支払います
- **イノベーションのスピード**: チームは独立して並行して開発します。

### 3.2 技術的な要因

- **障害の切り分け**: サービス A のエラーによってシステム全体がダウンすることはありません
- **テクノロジーの多様性**: 各サービスは最適な言語/フレームワークを使用できます。
- **独立した展開**: サービス B を再展開せずにサービス A を更新します。
- **リソースの最適化**: CPU/メモリがワークロードごとに正確に割り当てられます。

---

## 4. Twelve-Factor アプリ

2011 年に Heroku によって提案された **Twelve-Factor App** (12factor.net) 方法論は、クラウド ネイティブ アプリケーション設計の理論的基盤です。

### 4.1 12 要素の概要

#### 要因 1: コードベース
> 単一のコードベースがバージョン管理によって管理され、複数の環境にデプロイされます。

```
Git Repository (1 codebase)
├── Deploy → Development
├── Deploy → Staging
└── Deploy → Production
```

**ルール**: 1 つのアプリ = 1 つのリポジトリ。共有コードがある場合は、ライブラリに分割します。

#### 要因 2: 依存関係
> 依存関係を明確に宣言して分離します。

```json
// package.json — khai báo rõ ràng
{
  "dependencies": {
    "express": "4.18.2",
    "pg": "8.11.0"
  }
}
```

**決して**、サーバーにプリインストールされているシステムレベルのパッケージに依存しないでください。

#### 要素 3: 構成
> 設定を環境変数に保存します。

```bash
# ✅ Đúng: Config qua env vars
DATABASE_URL=postgresql://user:pass@host:5432/db
REDIS_URL=redis://cache:6379
API_KEY=sk-xxx

# ❌ Sai: Hardcode trong source code
const DB_HOST = "192.168.1.100";
```

#### 要素 4: 支援サービス
> バッキング サービスを接続されたリソースとして処理します。

```
App ──attach──▶ PostgreSQL (có thể thay bằng RDS bất cứ lúc nào)
App ──attach──▶ Redis (có thể thay bằng ElastiCache)
App ──attach──▶ S3 (có thể thay bằng MinIO)
```

バッキング サービスの変更 = 設定の変更、**コードの変更ではありません**。

#### 要素 5: ビルド、リリース、実行
> ビルド、リリース、実行の各段階を完全に分離。

```
Build Stage:   Source code → Executable (Docker image)
Release Stage: Image + Config → Versioned release (v1.2.3)
Run Stage:     Launch release trong execution environment
```

#### 要素 6: プロセス
> アプリケーションをステートレス プロセスとして実行します。

```
# ✅ Stateless: Session lưu ở Redis
Request → App Instance 1 ──session──▶ Redis
Request → App Instance 2 ──session──▶ Redis

# ❌ Stateful: Session lưu trong memory
Request → App Instance 1 (session ở đây)
Request → App Instance 2 (không có session!) ← BUG
```

#### 要素 7: ポート バインド
> ポートバインディング経由でサービスをエクスポートします。

アプリケーションには独自の HTTP サーバーが含まれています (外部 Tomcat/Apache は必要ありません)。

```javascript
const app = express();
app.listen(process.env.PORT || 8080);
```

#### 要素 8: 同時実行性
> プロセスモデルによるスケールアウト。

```
Thay vì 1 process lớn dùng 16 cores:
├── Web process × 4 (handle HTTP requests)
├── Worker process × 8 (background jobs)
└── Clock process × 1 (scheduled tasks)
```

#### 要素 9: 使い捨て可能性
> 高速起動、正常なシャットダウン。

```
Startup:  < 5 giây (lý tưởng < 1 giây)
Shutdown: SIGTERM → hoàn thành request đang xử lý → close connections → exit
```

#### 要素 10: 開発/製品のパリティ
> 開発、ステージング、実稼働を可能な限り類似した状態に保ちます。

```
# ✅ Dev dùng PostgreSQL, Prod dùng PostgreSQL
# ❌ Dev dùng SQLite, Prod dùng PostgreSQL
# ❌ Dev dùng file system, Prod dùng S3
```

Docker Compose は、開発/運用の同等性の実現に役立ちます。

#### 要素 11: ログ
> ログをイベント ストリームとして処理します。

```
Application → stdout/stderr → Log collector (Fluent Bit) → Loki/Elasticsearch
```

アプリケーションはログ ファイルを**決して管理しません**。標準出力に書き込むだけです。

#### 要素 12: 管理プロセス
> 管理/管理タスクを 1 回限りのプロセスとして実行します。

```bash
# Database migration
kubectl exec -it order-service-pod -- ./manage.py migrate

# Data cleanup
kubectl run --rm -it cleanup --image=myapp -- python cleanup_script.py
```

### 4.2 12 要素を超えて

Kevin Hoffman は、著書「Beyond the Twelve-Factor App」の中で、さらに 3 つの要素を追加しています。

- **要素 13: API ファースト** — API コントラクトを最初に設計し、後で実装します。
- **要素 14: テレメトリ** — メトリクス、ログ、トレースが必要です
- **要素 15: 認証と認可** — 後付けではなく、設計によるセキュリティ

---

## 5. クラウドネイティブのランドスケープ

CNCF は、クラウド ネイティブ テクノロジー スタック全体のマップである **クラウド ネイティブ ランドスケープ** を維持しています。

```
┌─────────────────────────────────────────────────────────────┐
│                    Cloud Native Landscape                    │
├───────────────┬──────────────┬───────────────┬──────────────┤
│ App Definition│ Orchestration│  Runtime      │  Provisioning│
│ & Development │ & Management │               │              │
│               │              │               │              │
│ - Helm       │ - Kubernetes │ - containerd  │ - Terraform  │
│ - gRPC       │ - Istio      │ - CRI-O      │ - Ansible    │
│ - OpenAPI    │ - ArgoCD     │ - Envoy      │ - Crossplane │
│ - Dapr       │ - Keda       │ - CoreDNS    │ - Pulumi     │
├───────────────┼──────────────┼───────────────┼──────────────┤
│ Observability │ Serverless   │  Security     │  Database    │
│               │              │               │              │
│ - Prometheus │ - Knative    │ - Vault      │ - Vitess     │
│ - Grafana    │ - OpenFaaS   │ - Falco      │ - TiDB       │
│ - Jaeger     │ - Dapr       │ - OPA        │ - CockroachDB│
│ - Loki       │              │ - Trivy      │              │
└───────────────┴──────────────┴───────────────┴──────────────┘
```

---

## 6. まとめ

|コンセプト |テイクアウト |
|----------|----------|
|クラウドネイティブ |クラウド上で実行するだけでなく、クラウドを活用するアプリケーションを構築する方法 |
| 12要素 |ポータブルでスケーラブルな実稼働対応アプリケーション設計の 12 原則 |
|不変のインフラストラクチャ |サーバーを修理せず、完全に交換してください。
|ステートレスなデザイン |外部サービスの状態、アプリインスタンスはいつでも置き換え可能 |
|デフォルトで監視可能 |メトリクス、ログ、トレースは最初から必須の要件です。

> **次の記事**: コンテナと Docker — Dockerfile のベスト プラクティスからイメージ セキュリティまで、クラウド ネイティブ アプリケーション パッケージ プラットフォーム。
