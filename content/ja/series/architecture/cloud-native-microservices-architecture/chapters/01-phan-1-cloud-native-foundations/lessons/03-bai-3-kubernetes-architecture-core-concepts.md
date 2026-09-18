---
id: 019d8a22-c303-7a10-b001-a1b2c3d4e503
title: 'レッスン 3: Kubernetes アーキテクチャとコア概念'
slug: bai-3-kubernetes-architecture-core-concepts
description: >-
  Kubernetes アーキテクチャ (コントロール プレーン、ワーカー ノード)、コア リソース
  (ポッド、デプロイメント、サービス、ConfigMap、シークレット)、名前空間戦略、および Kubernetes
  がコンテナを自動的にオーケストレーションする方法。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 3
section_title: 'パート 1: クラウド ネイティブの基盤'
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: クラウドネイティブのマイクロサービスアーキテクチャ
  slug: cloud-native-microservices-architecture
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-8403" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-8403)"/>

  <!-- Decorations -->
  <g>
    <circle cx="1081" cy="233" r="14" fill="#34d399" opacity="0.08"/>
    <circle cx="1062" cy="214" r="17" fill="#34d399" opacity="0.11"/>
    <circle cx="1043" cy="195" r="20" fill="#34d399" opacity="0.14"/>
    <circle cx="1024" cy="176" r="23" fill="#34d399" opacity="0.07"/>
    <circle cx="1005" cy="157" r="26" fill="#34d399" opacity="0.1"/>
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
    <line x1="600" y1="163" x2="1100" y2="243" stroke="#34d399" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="193" x2="1050" y2="263" stroke="#34d399" stroke-width="0.5" opacity="0.08"/>
    <polygon points="995.9089653438086,144 995.9089653438086,182 963,201 930.0910346561914,182 930.0910346561914,144 963,125" fill="none" stroke="#34d399" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#34d399"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#34d399" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#34d399">🏗️ アーキテクチャ — レッスン 3</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 3: Kubernetes アーキテクチャとコア</tspan>
      <tspan x="60" dy="42">コンセプト</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">クラウドネイティブのマイクロサービスアーキテクチャ</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 1: クラウド ネイティブの基盤</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![レッスン 3: Kubernetes アーキテクチャとコア概念](/storage/uploads/2026/03/cn-bai-3-diagram.webp)

## はじめに

Kubernetes (K8s) は、コンテナー ワークロードの標準オーケストレーション プラットフォームです。マイクロサービス システムを実装する前に、Kubernetes のアーキテクチャと中心的な概念を理解することが必須です。

---

## 1. Kubernetes アーキテクチャ

### 1.1 概要

```
┌────────────────────────────────────────────────────────────┐
│                    Kubernetes Cluster                       │
│                                                            │
│  ┌──────────────────── Control Plane ────────────────────┐ │
│  │                                                       │ │
│  │  ┌───────────┐  ┌──────────┐  ┌───────────────────┐  │ │
│  │  │ API Server│  │Scheduler │  │Controller Manager │  │ │
│  │  │ (kube-    │  │          │  │                   │  │ │
│  │  │ apiserver)│  │          │  │ - ReplicaSet      │  │ │
│  │  └─────┬─────┘  └──────────┘  │ - Deployment      │  │ │
│  │        │                      │ - Node            │  │ │
│  │  ┌─────▼─────┐               │ - Service Account │  │ │
│  │  │   etcd    │               └───────────────────┘  │ │
│  │  │ (cluster  │                                       │ │
│  │  │  state)   │  ┌──────────────────────────────────┐ │ │
│  │  └───────────┘  │ Cloud Controller Manager         │ │ │
│  │                 │ (LoadBalancer, Volume, Node)      │ │ │
│  │                 └──────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                            │
│  ┌──────── Worker Node 1 ──────┐  ┌── Worker Node 2 ────┐ │
│  │                              │  │                      │ │
│  │  ┌────────┐  ┌────────────┐ │  │  ┌────────┐         │ │
│  │  │kubelet │  │kube-proxy  │ │  │  │kubelet │  ...    │ │
│  │  └────────┘  └────────────┘ │  │  └────────┘         │ │
│  │  ┌────────────────────────┐ │  │                      │ │
│  │  │   containerd           │ │  │                      │ │
│  │  │  ┌─────┐ ┌─────┐      │ │  │                      │ │
│  │  │  │Pod A│ │Pod B│ ...  │ │  │                      │ │
│  │  │  └─────┘ └─────┘      │ │  │                      │ │
│  │  └────────────────────────┘ │  │                      │ │
│  └──────────────────────────────┘  └──────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

### 1.2 コントロール プレーンのコンポーネント

**kube-apiserver** — クラスターの「フロント ドア」:
- すべての REST API リクエストを受信します
- 認証(AuthN)と認可(AuthZ)
- リソースを検証して etcd に永続化する
- etcd と直接通信する唯一のコンポーネント

**etcd** — 分散キー値ストア:
- **クラスタ状態全体** (望ましい状態 + 実際の状態) を保存します
- 強い一貫性 (Raft コンセンサス)
- 定期的にバックアップする必要がある

**kube-scheduler** — ポッドを実行するノードを決定します。
- リソースリクエスト、アフィニティ、汚染/容認を評価します。
- スコアリングアルゴリズム: 最適なノードを選択します

**kube-controller-manager** — 望ましい状態 = 実際の状態であることを確認します。
- ReplicaSet コントローラー: 正しい数のレプリカを確保します
- デプロイメント コントローラー: ローリング アップデートを管理します。
- ノード コントローラー: ノードの障害を検出します。
- ジョブ コントローラー: 1 回限りのタスクを管理します

### 1.3 ワーカーノードのコンポーネント

**kubelet** — 各ノードで実行されているエージェント:
- APIサーバーからポッドスペックを取得
- ポッド内のコンテナが実行されていることを確認します。
- ノードのステータスとポッドのステータスをレポートします

**kube-proxy** — ネットワーク プロキシ:
- サービスネットワークルールの管理 (iptables/IPVS)
- ポッドエンドポイントへのトラフィックの負荷分散

**コンテナ ランタイム** —containerd または CRI-O:
- イメージのプル、コンテナの起動/停止
- CRI (Container Runtime Interface) 準拠

---

## 2. コアリソース

### 2.1 ポッド — 最小単位

ポッドは、一緒に実行され、ネットワークとストレージを共有する 1 つ以上のコンテナです。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: order-service
  labels:
    app: order-service
spec:
  containers:
    - name: order-service
      image: registry.example.com/order-service:1.0.0
      ports:
        - containerPort: 8080
      resources:
        requests:
          cpu: "250m"
          memory: "256Mi"
        limits:
          cpu: "500m"
          memory: "512Mi"
      env:
        - name: DB_HOST
          valueFrom:
            configMapKeyRef:
              name: order-config
              key: db_host
```

> **注意**: 運用環境では、**ポッドを直接作成しないでください**。常に「デプロイメント」を使用してください。

### 2.2 導入 — ライフサイクル管理

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
  labels:
    app: order-service
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # Thêm tối đa 1 pod khi update
      maxUnavailable: 0  # Không cho phép pod nào unavailable
  selector:
    matchLabels:
      app: order-service
  template:
    metadata:
      labels:
        app: order-service
        version: v1
    spec:
      containers:
        - name: order-service
          image: registry.example.com/order-service:1.0.0
          ports:
            - containerPort: 8080
          resources:
            requests:
              cpu: "250m"
              memory: "512Mi"
            limits:
              cpu: "500m"
              memory: "1Gi"
          readinessProbe:
            httpGet:
              path: /health/ready
              port: 8080
            initialDelaySeconds: 10
            periodSeconds: 5
          livenessProbe:
            httpGet:
              path: /health/live
              port: 8080
            initialDelaySeconds: 30
            periodSeconds: 10
          startupProbe:
            httpGet:
              path: /health/started
              port: 8080
            failureThreshold: 30
            periodSeconds: 2
```

### 2.3 サービス — エクスポージャと負荷分散

```yaml
# ClusterIP — Internal communication (default)
apiVersion: v1
kind: Service
metadata:
  name: order-service
spec:
  type: ClusterIP
  selector:
    app: order-service
  ports:
    - port: 8080
      targetPort: 8080

# DNS: order-service.default.svc.cluster.local
# Short: order-service (cùng namespace)
```

サービスの種類:

```
ClusterIP   → Internal only (default)
NodePort    → Expose qua port trên mỗi node (30000-32767)
LoadBalancer → Cloud provider tạo external LB
ExternalName → DNS CNAME alias
```

### 2.4 ConfigMap とシークレット

```yaml
# ConfigMap — non-sensitive config
apiVersion: v1
kind: ConfigMap
metadata:
  name: order-config
data:
  db_host: "postgres-order.database.svc.cluster.local"
  db_port: "5432"
  db_name: "orders"
  log_level: "info"

---
# Secret — sensitive data (base64 encoded)
apiVersion: v1
kind: Secret
metadata:
  name: order-secret
type: Opaque
data:
  db_password: cGFzc3dvcmQxMjM=   # base64
  api_key: c2stbXlhcGlrZXk=
```

> **重要**: Kubernetes Secret は Base64 でのみエンコードされ、**エンコードされません**。運用環境では、**Sealed Secrets** または **External Secrets Operator** + Vault を使用します。

### 2.5 イングレス — 外部アクセス

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-ingress
  annotations:
    nginx.ingress.kubernetes.io/rate-limit: "100"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
    - hosts:
        - api.example.com
      secretName: api-tls
  rules:
    - host: api.example.com
      http:
        paths:
          - path: /api/orders
            pathType: Prefix
            backend:
              service:
                name: order-service
                port:
                  number: 8080
          - path: /api/payments
            pathType: Prefix
            backend:
              service:
                name: payment-service
                port:
                  number: 8080
```

---

## 3. 自動スケーリング

### 3.1 水平ポッド オートスケーラー (HPA)

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: order-service-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: order-service
  minReplicas: 3
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300  # Chờ 5 phút trước khi scale down
      policies:
        - type: Pods
          value: 1
          periodSeconds: 60           # Giảm tối đa 1 pod mỗi 60s
```

### 3.2 垂直ポッド オートスケーラー (VPA)

VPA は CPU/メモリ リクエストを自動的に調整します。

```yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: order-service-vpa
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: order-service
  updatePolicy:
    updateMode: "Auto"
  resourcePolicy:
    containerPolicies:
      - containerName: order-service
        minAllowed:
          cpu: "100m"
          memory: "128Mi"
        maxAllowed:
          cpu: "2"
          memory: "4Gi"
```

---

## 4. 名前空間戦略

```
Kubernetes Cluster
│
├── kube-system          # System components (CoreDNS, metrics-server)
├── kube-public          # Public resources
│
├── platform             # Shared infrastructure
│   ├── kafka
│   ├── redis
│   ├── postgresql
│   └── prometheus
│
├── gateway              # API Gateway (Kong/Traefik)
│
├── services-prod        # Production services
│   ├── order-service (3 replicas)
│   ├── payment-service (3 replicas)
│   ├── inventory-service (2 replicas)
│   └── notification-service (2 replicas)
│
├── services-staging     # Staging (1 replica each)
│
├── monitoring           # Observability stack
│   ├── grafana
│   ├── loki
│   ├── jaeger
│   └── alertmanager
│
└── argocd               # GitOps controller
```

**名前空間ごとのリソース クォータ:**

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: services-prod-quota
  namespace: services-prod
spec:
  hard:
    requests.cpu: "20"
    requests.memory: "40Gi"
    limits.cpu: "40"
    limits.memory: "80Gi"
    pods: "100"
```

---

## 5. Kubernetes ネットワーキング モデル

### 5.1 ポッド間の通信

```
Kubernetes Network Rules:
1. Mọi Pod có thể giao tiếp với mọi Pod khác (không cần NAT)
2. Agents trên node (kubelet) có thể giao tiếp với tất cả Pods trên node đó
3. Mỗi Pod có IP riêng trong cluster CIDR

Pod A (10.244.1.5) ──────────▶ Pod B (10.244.2.3)
     Node 1                         Node 2
     │                              │
     └──── CNI Plugin (Calico/Cilium/Flannel) ────┘
```

### 5.2 CoreDNS によるサービス検出

```
Service DNS formats:
├── <service>.<namespace>.svc.cluster.local  (FQDN)
├── <service>.<namespace>.svc                (shortened)
├── <service>.<namespace>                    (shortened)
└── <service>                                (same namespace)

Ví dụ:
order-service gọi payment-service:
  curl http://payment-service:8080/api/pay           # same namespace
  curl http://payment-service.services-prod:8080     # cross namespace
```

---

## 6. まとめ

|コンポーネント |役割 |
|----------|----------|
|コントロールプレーン |クラスターの状態、スケジューリング、コントローラー ループを管理 |
|ポッド |最小のデプロイメントユニット、1 個以上のコンテナ |
|導入 | ReplicaSet の管理、ローリング アップデート、ロールバック |
|サービス |安定したネットワーク エンドポイント、負荷分散 |
|構成マップ/シークレット |構成を外部化する |
|イングレス |外部 HTTP(S) ルーティング |
| HPA/VPA |水平方向と垂直方向の自動スケーリング |
|ネームスペース |論理的分離、リソース割り当て |

> **次の投稿**: マイクロサービスの設計原則 — サービス境界を適切に定義するための SRP、DDD、境界コンテキスト。
