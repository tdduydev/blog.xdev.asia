---
id: 019d8a22-c313-7a10-b001-a1b2c3d4e513
title: 'レッスン 13: サービス メッシュ — Istio と Linkerd'
slug: bai-13-service-mesh-istio-linkerd
description: >-
  サービス メッシュ アーキテクチャ (データ プレーン + コントロール プレーン)、サイドカー プロキシ パターン、Istio コンポーネント
  (パイロット、シタデル、ギャレー)、トラフィック管理 (カナリア、A/B)、Istio と Linkerd の比較、Kubernetes
  でのインストールと構成。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 13
section_title: 'パート 4: サービス メッシュとネットワーキング'
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: クラウドネイティブのマイクロサービスアーキテクチャ
  slug: cloud-native-microservices-architecture
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-5598" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-5598)"/>

  <!-- Decorations -->
  <g>
    <circle cx="816" cy="178" r="14" fill="#2dd4bf" opacity="0.13"/>
    <circle cx="1032" cy="54" r="32" fill="#2dd4bf" opacity="0.11"/>
    <circle cx="748" cy="190" r="20" fill="#2dd4bf" opacity="0.09"/>
    <circle cx="964" cy="66" r="8" fill="#2dd4bf" opacity="0.07"/>
    <circle cx="680" cy="202" r="26" fill="#2dd4bf" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <line x1="600" y1="218" x2="1100" y2="298" stroke="#2dd4bf" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="248" x2="1050" y2="318" stroke="#2dd4bf" stroke-width="0.5" opacity="0.08"/>
    <polygon points="946.5788383248864,101.5 946.5788383248864,134.5 918,151 889.4211616751136,134.5 889.4211616751135,101.50000000000001 918,85" fill="none" stroke="#2dd4bf" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#2dd4bf"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#2dd4bf" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#2dd4bf">🏗️ アーキテクチャ — レッスン 13</text>

  <!-- Title -->
  <text x="60" y="160" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 13: サービス メッシュ — Istio と Linkerd</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="222" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">クラウドネイティブのマイクロサービスアーキテクチャ</text>

  <!-- Section -->
  <text x="60" y="246" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 4: サービス メッシュとネットワーキング</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![レッスン 13: サービス メッシュ — Istio と Linkerd](/storage/uploads/2026/03/cn-bai-13-diagram.webp)

## はじめに

マイクロサービスの数が増えると、mTLS、再試行、サーキット ブレーカー、トレース、トラフィック分割など、サービス間通信の管理が複雑になります。**サービス メッシュ**は、すべてのネットワーク ロジックをアプリケーション コードから**インフラストラクチャ レイヤー**に取り出すことで解決します。

---

## 1. サービス メッシュ アーキテクチャ

### 1.1 コンセプト

Service Mesh は、各ポッドに挿入されたネットワーク プロキシ (サイドカー) を介してサービス間通信を処理する **専用のインフラストラクチャ レイヤー** です。

```
Không có Service Mesh:
┌──────────┐                    ┌──────────┐
│ Service A│                    │ Service B│
│          │                    │          │
│ ┌──────┐ │     HTTP/gRPC     │ ┌──────┐ │
│ │ App  │─┼───────────────────┼▶│ App  │ │
│ │ Code │ │                    │ │ Code │ │
│ │      │ │  Circuit breaker,  │ │      │ │
│ │ +retry│ │  mTLS, tracing... │ │      │ │
│ │ +auth │ │  ← TRONG app code │ │      │ │
│ └──────┘ │                    │ └──────┘ │
└──────────┘                    └──────────┘

Có Service Mesh:
┌──────────────┐                ┌──────────────┐
│ Pod A        │                │ Pod B        │
│              │                │              │
│ ┌──────────┐ │                │ ┌──────────┐ │
│ │ App Code │ │                │ │ App Code │ │
│ │ (simple) │ │                │ │ (simple) │ │
│ └────┬─────┘ │                │ └────▲─────┘ │
│      │       │                │      │       │
│ ┌────▼─────┐ │   mTLS, retry │ ┌────┴─────┐ │
│ │ Sidecar  │─┼───circuit brk──┼▶│ Sidecar  │ │
│ │ Proxy    │ │   tracing      │ │ Proxy    │ │
│ │ (Envoy)  │ │                │ │ (Envoy)  │ │
│ └──────────┘ │                │ └──────────┘ │
└──────────────┘                └──────────────┘
```

### 1.2 データ プレーンとコントロール プレーン

```
┌─────────────────────────────────────────────────┐
│                 Control Plane                    │
│         (Istiod / Linkerd Control Plane)         │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │  Config  │  │  Cert    │  │  Service     │  │
│  │  Mgmt    │  │  Authority│  │  Discovery  │  │
│  │          │  │  (CA)    │  │             │  │
│  └──────────┘  └──────────┘  └──────────────┘  │
│                      │                           │
│            xDS API (push config)                 │
└──────────────────────┼───────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
┌───────▼──────┐┌──────▼──────┐┌──────▼──────┐
│ Envoy/Linkerd││ Envoy/Linkerd││ Envoy/Linkerd│ ← Data Plane
│ Proxy        ││ Proxy        ││ Proxy        │
│┌────────────┐││┌────────────┐││┌────────────┐│
││ Service A  ││││ Service B  ││││ Service C  ││
│└────────────┘││└────────────┘││└────────────┘│
└──────────────┘└──────────────┘└──────────────┘
```

**データ プレーン**: サイドカー プロキシが実際のトラフィック (ルーティング、mTLS、メトリクス) を処理します。
**コントロール プレーン**: データ プレーン プロキシ (プッシュ ポリシー、証明書) を構成および管理します。

---

## 2. Istio

### 2.1 アーキテクチャ

```
┌─────────────────────────────────────────┐
│           Istiod (Control Plane)        │
│                                         │
│  ┌─────────┐ ┌────────┐ ┌───────────┐ │
│  │  Pilot  │ │Citadel │ │  Galley   │ │
│  │         │ │        │ │           │ │
│  │ Service │ │ Cert   │ │ Config    │ │
│  │ Disc.   │ │ Mgmt   │ │ Validate │ │
│  │ Config  │ │ mTLS   │ │ Transform│ │
│  │ Push    │ │ SPIFFE │ │           │ │
│  └─────────┘ └────────┘ └───────────┘ │
└────────────────────┬────────────────────┘
                     │ xDS/gRPC
      ┌──────────────┼──────────────┐
      ▼              ▼              ▼
 ┌─────────┐   ┌─────────┐   ┌─────────┐
 │ Envoy   │   │ Envoy   │   │ Envoy   │
 │ Sidecar │   │ Sidecar │   │ Sidecar │
 └─────────┘   └─────────┘   └─────────┘
```

### 2.2 インストール

```bash
# Install Istio CLI
curl -L https://istio.io/downloadIstio | sh -
cd istio-*
export PATH=$PWD/bin:$PATH

# Install Istio on cluster (demo profile for learning)
istioctl install --set profile=demo -y

# Production profile
istioctl install --set profile=default \
  --set meshConfig.enableTracing=true \
  --set meshConfig.defaultConfig.tracing.zipkin.address=jaeger:9411

# Enable sidecar injection for namespace
kubectl label namespace default istio-injection=enabled

# Verify
kubectl get pods -n istio-system
```

### 2.3 トラフィック管理

**VirtualService — リクエスト ルーティング:**

```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: order-service
spec:
  hosts:
    - order-service
  http:
    # Canary: 90% v1, 10% v2
    - route:
        - destination:
            host: order-service
            subset: v1
          weight: 90
        - destination:
            host: order-service
            subset: v2
          weight: 10
      timeout: 5s
      retries:
        attempts: 3
        perTryTimeout: 2s
        retryOn: 5xx,reset,connect-failure
```

**DestinationRule — ロード バランシングとサーキット ブレーカー:**

```yaml
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: order-service
spec:
  host: order-service
  trafficPolicy:
    connectionPool:
      tcp:
        maxConnections: 100
      http:
        h2UpgradePolicy: DEFAULT
        http1MaxPendingRequests: 100
        http2MaxRequests: 1000
    outlierDetection:
      consecutive5xxErrors: 5
      interval: 30s
      baseEjectionTime: 30s
      maxEjectionPercent: 50
    loadBalancer:
      simple: LEAST_REQUEST
  subsets:
    - name: v1
      labels:
        version: v1
    - name: v2
      labels:
        version: v2
```

**ヘッダーベースのルーティング (A/B テスト):**

```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: order-service
spec:
  hosts:
    - order-service
  http:
    # Beta users → v2
    - match:
        - headers:
            x-user-group:
              exact: beta
      route:
        - destination:
            host: order-service
            subset: v2
    # All others → v1
    - route:
        - destination:
            host: order-service
            subset: v1
```

### 2.4 フォールトインジェクション (カオステスト)

```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: payment-service
spec:
  hosts:
    - payment-service
  http:
    - fault:
        # 10% requests bị delay 5s
        delay:
          percentage:
            value: 10
          fixedDelay: 5s
        # 5% requests bị abort với 503
        abort:
          percentage:
            value: 5
          httpStatus: 503
      route:
        - destination:
            host: payment-service
```

---

## 3. リンカード

### 3.1 アーキテクチャ

Linkerd は Envoy の代わりに **linkerd2-proxy** (Rust で書かれた) を使用します。

```
┌─────────────────────────────────┐
│   Linkerd Control Plane         │
│                                  │
│  ┌────────────┐  ┌───────────┐  │
│  │ Destination│  │  Identity │  │
│  │ (discovery │  │  (mTLS    │  │
│  │ + config)  │  │  certs)   │  │
│  └────────────┘  └───────────┘  │
│  ┌────────────┐                  │
│  │ Proxy      │                  │
│  │ Injector   │                  │
│  └────────────┘                  │
└─────────────────────────────────┘
            │
     ┌──────┼──────┐
     ▼      ▼      ▼
  ┌──────┐┌──────┐┌──────┐
  │linkerd││linkerd││linkerd│  ← linkerd2-proxy (Rust)
  │proxy ││proxy ││proxy │
  └──────┘└──────┘└──────┘
```

### 3.2 インストールと使用法

```bash
# Install CLI
curl -sL https://run.linkerd.io/install | sh
export PATH=$HOME/.linkerd2/bin:$PATH

# Check cluster readiness
linkerd check --pre

# Install control plane
linkerd install --crds | kubectl apply -f -
linkerd install | kubectl apply -f -

# Verify
linkerd check

# Inject sidecar into existing deployment
kubectl get deploy order-service -o yaml \
  | linkerd inject - \
  | kubectl apply -f -

# Or annotate namespace for auto-injection
kubectl annotate namespace default linkerd.io/inject=enabled

# Linkerd dashboard
linkerd viz install | kubectl apply -f -
linkerd viz dashboard
```

### 3.3 トラフィック分割 (SMI)

```yaml
# Service Mesh Interface (SMI) — standard API
apiVersion: split.smi-spec.io/v1alpha2
kind: TrafficSplit
metadata:
  name: order-service-split
spec:
  service: order-service
  backends:
    - service: order-service-v1
      weight: 900   # 90%
    - service: order-service-v2
      weight: 100   # 10%
```

---

## 4. Istio 対リンカード

|基準 |イスティオ |リンカード |
|----------|----------|----------|
|プロキシ |エンボイ (C++) | linkerd2-proxy (Rust) |
|リソース使用量 |高 (~100MB/サイドカー) |低 (~20MB/サイドカー) |
|レイテンシのオーバーヘッド | ~3-5ms p99 | ~1-2ms p99 |
|機能セット |とても豊かです |コア機能、シンプル |
|学習曲線 |ドクター |平均 |
|交通管理 |非常に強力 (VirtualService) |基本 (SMI トラフィックスプリット) |
|マルチクラスター |良い |良い |
|コミュニティ |ビッグ (Google、IBM) |良い (元気、CNCF卒業) |
| **推奨** | **複雑な使用例、エンタープライズ** | **シンプル、パフォーマンス重視** |

### いつ何を選択するか?

```
Cần traffic management phức tạp (A/B, canary, fault injection)?
  → Istio

Cần performance tối đa, resource constrained?
  → Linkerd

Team nhỏ, muốn adopt nhanh?
  → Linkerd

Enterprise, nhiều cluster, complex policies?
  → Istio

Chưa chắc cần service mesh?
  → Bắt đầu KHÔNG có mesh
  → Khi pain points rõ ràng → evaluate
```

---

## 5. サービスメッシュからの可観測性

サービス メッシュは、アプリケーション コードを変更することなく、**ゴールデン シグナル**を自動的に提供します。

```
Automatic Metrics (mỗi request):
├── Request rate (requests/sec)
├── Success rate (% non-5xx)
├── Latency distribution (p50, p95, p99)
├── Bytes in/out
└── Active connections

Automatic Distributed Tracing:
├── Span creation cho mỗi hop
├── Context propagation (B3/W3C headers)
├── Service dependency graph
└── Request flow visualization

Automatic mTLS Metrics:
├── Certificate expiry
├── Handshake success/failure
└── Protocol versions
```

```bash
# Linkerd: xem metrics real-time
linkerd viz stat deploy
linkerd viz top deploy/order-service
linkerd viz routes deploy/order-service

# Istio: Kiali dashboard
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.20/samples/addons/kiali.yaml
istioctl dashboard kiali
```

---

## 概要

- **サービス メッシュ** は、ネットワーク ロジックをアプリケーション コードからサイドカー プロキシに分離します。
- **データ プレーン** (プロキシ) がトラフィックを処理します。 **コントロール プレーン** が構成を管理します
- **Istio**: 機能が豊富な Envoy ベースで、企業の複雑なユースケースに適しています
- **Linkerd**: 軽量、Rust ベース、高性能、導入が簡単
- Service Mesh は mTLS、可観測性、トラフィック管理を自動的に提供します
- サービス メッシュは常に必要なわけではありません - 複雑さに基づいて評価します
