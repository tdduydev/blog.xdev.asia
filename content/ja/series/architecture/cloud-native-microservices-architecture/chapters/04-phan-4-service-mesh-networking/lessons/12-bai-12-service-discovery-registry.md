---
id: 019d8a22-c312-7a10-b001-a1b2c3d4e512
title: 'レッスン 12: サービスの検出とレジストリ'
slug: bai-12-service-discovery-registry
description: >-
  クライアント側とサーバー側の検出、サービス レジストリ (Consul、etcd)、Kubernetes DNS ベースの検出、ヘルス
  チェック、負荷分散アルゴリズム、およびサービス エンドポイント管理。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 12
section_title: 'パート 4: サービス メッシュとネットワーキング'
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: クラウドネイティブのマイクロサービスアーキテクチャ
  slug: cloud-native-microservices-architecture
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-2142" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-2142)"/>

  <!-- Decorations -->
  <g>
    <circle cx="875" cy="275" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="650" cy="270" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="925" cy="265" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="700" cy="260" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="975" cy="255" r="8" fill="#fb923c" opacity="0.1"/>
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
    <line x1="600" y1="125" x2="1100" y2="205" stroke="#fb923c" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="155" x2="1050" y2="225" stroke="#fb923c" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1009.6410161513776,155 1009.6410161513776,195 975,215 940.3589838486224,195 940.3589838486224,155 975,135" fill="none" stroke="#fb923c" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fb923c"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fb923c" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ アーキテクチャ — レッスン 12</text>

  <!-- Title -->
  <text x="60" y="160" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 12: サービスの検出とレジストリ</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="222" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">クラウドネイティブのマイクロサービスアーキテクチャ</text>

  <!-- Section -->
  <text x="60" y="246" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 4: サービス メッシュとネットワーキング</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![レッスン 12: サービスの検出とレジストリ](/storage/uploads/2026/03/cn-bai-12-diagram.webp)

## はじめに

マイクロサービスでは、サービス インスタンスは **動的にスケールアップ/スケールダウン**でき、IP は継続的に変更されます。アドレスをハードコーディングすることはできません。 **サービス ディスカバリ** は、サービスが自動的に相互に検索できるようにするメカニズムです。

---

## 1. サービス検出パターン

### 1.1 クライアント側の検出

クライアントは **Service Registry** にクエリを実行してインスタンスのリストを取得し、呼び出すインスタンスを選択します。

```
┌─────────┐    ┌──────────────────┐
│ Client  │───▶│ Service Registry │
│ Service │    │ (Consul/etcd)    │
│         │◀───│                  │
│         │    │ Returns:         │
│         │    │ - 10.0.1.5:8080  │
│         │    │ - 10.0.1.6:8080  │
│         │    │ - 10.0.1.7:8080  │
│         │    └──────────────────┘
│         │
│  Client-side │
│  Load Balancer│  ← Round Robin / Random / Least Connections
│         │
│         │───▶ 10.0.1.6:8080 (chosen instance)
└─────────┘
```

**利点**: プロキシのボトルネックがなく、クライアントが独自のルーティングを決定します。
**欠点**: 検出ロジックは各サービスにあります (各言語には独自のライブラリが必要です)

### 1.2 サーバー側の検出

クライアントはリクエストを **ロード バランサー/ルーター** に送信し、ルーターはレジストリにクエリを実行して転送します。

```
┌─────────┐    ┌──────────────┐    ┌──────────────────┐
│ Client  │───▶│ Load Balancer│───▶│ Service Registry │
│ Service │    │ / Router     │◀───│                  │
│         │◀───│              │    └──────────────────┘
│         │    │              │
│         │    │              │───▶ 10.0.1.5:8080
└─────────┘    └──────────────┘
```

**利点**: シンプルで言語に依存しないクライアント
**短所**: ロード バランサーは潜在的なボトルネックおよび単一障害点となる

### 1.3 比較

|基準 |クライアント側 |サーバーサイド |
|----------|-----------|---------------|
|クライアントの複雑さ |高 (ライブラリが必要) |低い |
|ホップ数 | 1 (直接) | 2 (LB経由) |
|言語サポート |言語ごとにライブラリが必要 |言語に依存しない |
|ロードバランサー |必要ありません |必要性 (潜在的な SPOF) |
|例 | Netflix エウレカ + リボン | Kubernetes サービス、AWS ELB |

---

## 2. サービスレジストリ

### 2.1 領事

HashiCorp Consul は、サービス検出、ヘルスチェック、KV ストアを提供します。

```
┌────────────────────────────────────────────┐
│              Consul Cluster                 │
│                                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │  Server  │ │  Server  │ │  Server  │   │
│  │  (Leader)│ │(Follower)│ │(Follower)│   │
│  └──────────┘ └──────────┘ └──────────┘   │
│        Raft Consensus Protocol              │
│                                             │
│  Service Catalog:                           │
│  ├── order-service                          │
│  │   ├── 10.0.1.5:8080 (passing)           │
│  │   ├── 10.0.1.6:8080 (passing)           │
│  │   └── 10.0.1.7:8080 (critical)          │
│  ├── payment-service                        │
│  │   ├── 10.0.2.3:8080 (passing)           │
│  │   └── 10.0.2.4:8080 (passing)           │
│  └── inventory-service                      │
│      └── 10.0.3.1:8080 (passing)           │
└────────────────────────────────────────────┘
```

**サービス登録:**

```json
{
  "service": {
    "name": "order-service",
    "id": "order-service-1",
    "port": 8080,
    "tags": ["v1", "production"],
    "meta": {
      "version": "1.2.0",
      "protocol": "http"
    },
    "check": {
      "http": "http://localhost:8080/health",
      "interval": "10s",
      "timeout": "3s",
      "deregister_critical_service_after": "30s"
    }
  }
}
```

**サービス検出クエリ:**

```bash
# DNS interface
dig @127.0.0.1 -p 8600 order-service.service.consul SRV

# HTTP API
curl http://consul:8500/v1/health/service/order-service?passing=true

# Response
[
  {
    "Service": {
      "ID": "order-service-1",
      "Address": "10.0.1.5",
      "Port": 8080,
      "Tags": ["v1", "production"]
    },
    "Checks": [{ "Status": "passing" }]
  }
]
```

### 2.2 etcd

分散 KV ストア。Kubernetes によってクラスター状態に使用されます。

```bash
# Register service
etcdctl put /services/order-service/instances/1 \
  '{"host":"10.0.1.5","port":8080,"status":"healthy"}'

# Discover service (prefix query)
etcdctl get /services/order-service/instances/ --prefix

# Watch for changes
etcdctl watch /services/order-service/instances/ --prefix
```

---

## 3. Kubernetes DNS ベースの検出

### 3.1 CoreDNS

Kubernetes には **CoreDNS** によるサービス検出が組み込まれています。

```
┌───────────────────────────────────────────────┐
│            Kubernetes Cluster                  │
│                                                │
│  ┌──────────────┐                              │
│  │   CoreDNS    │ ← Watches Kubernetes API     │
│  │   (kube-dns) │                              │
│  └──────┬───────┘                              │
│         │                                      │
│  DNS Records:                                  │
│  ├── order-service.default.svc.cluster.local   │
│  │   → ClusterIP: 10.96.45.32                 │
│  ├── payment-service.default.svc.cluster.local │
│  │   → ClusterIP: 10.96.78.91                 │
│  └── order-service.staging.svc.cluster.local   │
│      → ClusterIP: 10.96.12.55                 │
│                                                │
│  Format: <service>.<namespace>.svc.cluster.local│
└───────────────────────────────────────────────┘
```

### 3.2 Kubernetes サービスの種類

```yaml
# ClusterIP (default) — internal only
apiVersion: v1
kind: Service
metadata:
  name: order-service
  namespace: default
spec:
  type: ClusterIP
  selector:
    app: order-service
  ports:
    - port: 8080
      targetPort: 8080

---
# Headless Service — returns Pod IPs directly (no load balancing)
apiVersion: v1
kind: Service
metadata:
  name: order-service-headless
spec:
  clusterIP: None  # ← Headless
  selector:
    app: order-service
  ports:
    - port: 8080
```

```bash
# ClusterIP service → resolves to virtual IP
nslookup order-service.default.svc.cluster.local
# → 10.96.45.32

# Headless service → resolves to all Pod IPs
nslookup order-service-headless.default.svc.cluster.local
# → 10.0.1.5, 10.0.1.6, 10.0.1.7

# Within same namespace, short name works
curl http://order-service:8080/api/orders

# Cross-namespace
curl http://order-service.staging:8080/api/orders
```

### 3.3 エンドポイントスライス

```yaml
# Kubernetes tự động tạo EndpointSlice cho mỗi Service
apiVersion: discovery.k8s.io/v1
kind: EndpointSlice
metadata:
  name: order-service-abc12
  labels:
    kubernetes.io/service-name: order-service
addressType: IPv4
endpoints:
  - addresses: ["10.0.1.5"]
    conditions:
      ready: true
      serving: true
  - addresses: ["10.0.1.6"]
    conditions:
      ready: true
      serving: true
  - addresses: ["10.0.1.7"]
    conditions:
      ready: false   # Not ready — excluded from routing
      serving: false
ports:
  - port: 8080
    protocol: TCP
```

---

## 4. ヘルスチェック

### 4.1 ヘルスチェックの種類

```
┌─────────────────────────────────────────────────┐
│              Health Check Levels                 │
│                                                  │
│  ┌─────────────────────────────────────────┐    │
│  │ Liveness: "Is the process alive?"       │    │
│  │ → Fail: Restart container               │    │
│  │ → Check: process not deadlocked         │    │
│  └─────────────────────────────────────────┘    │
│                                                  │
│  ┌─────────────────────────────────────────┐    │
│  │ Readiness: "Can it handle requests?"    │    │
│  │ → Fail: Remove from Service endpoints   │    │
│  │ → Check: DB connected, cache warm       │    │
│  └─────────────────────────────────────────┘    │
│                                                  │
│  ┌─────────────────────────────────────────┐    │
│  │ Startup: "Has it finished starting?"    │    │
│  │ → Fail: Keep waiting (don't kill early) │    │
│  │ → Check: initialization complete        │    │
│  └─────────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
```

### 4.2 実装

```java
@RestController
public class HealthController {

    @Autowired
    private DataSource dataSource;
    
    @Autowired
    private RedisTemplate<String, String> redis;

    // Liveness — lightweight, no dependency check
    @GetMapping("/health/live")
    public ResponseEntity<Map<String, String>> liveness() {
        return ResponseEntity.ok(Map.of("status", "UP"));
    }

    // Readiness — check dependencies
    @GetMapping("/health/ready")
    public ResponseEntity<Map<String, Object>> readiness() {
        Map<String, Object> checks = new HashMap<>();
        boolean ready = true;

        // Check database
        try {
            dataSource.getConnection().isValid(2);
            checks.put("database", "UP");
        } catch (Exception e) {
            checks.put("database", "DOWN");
            ready = false;
        }

        // Check Redis
        try {
            redis.getConnectionFactory().getConnection().ping();
            checks.put("redis", "UP");
        } catch (Exception e) {
            checks.put("redis", "DOWN");
            ready = false;
        }

        checks.put("status", ready ? "UP" : "DOWN");
        return ready 
            ? ResponseEntity.ok(checks)
            : ResponseEntity.status(503).body(checks);
    }
}
```

---

## 5. 負荷分散アルゴリズム

### 5.1 一般的なアルゴリズム

```
Round Robin:
  Request 1 → Instance A
  Request 2 → Instance B
  Request 3 → Instance C
  Request 4 → Instance A (vòng lại)

Weighted Round Robin:
  Instance A (weight: 3) → nhận 3/6 requests
  Instance B (weight: 2) → nhận 2/6 requests
  Instance C (weight: 1) → nhận 1/6 requests

Least Connections:
  Chọn instance có ít connection nhất hiện tại
  Phù hợp khi request có duration khác nhau

Random:
  Chọn ngẫu nhiên — đơn giản, hiệu quả cho large pool

Consistent Hashing:
  Hash request key → map đến instance cố định
  Phù hợp cho sticky sessions, caching scenarios

Power of Two Choices:
  Random chọn 2 instances, pick instance ít load hơn
  Tốt hơn pure random, ít overhead hơn least connections
```

### 5.2 Kubernetes kube-proxy モード

```
iptables mode (default):
  → Random selection via iptables rules
  → No health-aware routing

IPVS mode:
  → Supports multiple algorithms
  → rr (Round Robin), lc (Least Connection), 
    dh (Destination Hashing), sh (Source Hashing)
  → Better performance at scale

# Enable IPVS mode
kubectl edit configmap kube-proxy -n kube-system
# mode: "ipvs"
# ipvs:
#   scheduler: "lc"  # Least Connections
```

---

## 6. ベストプラクティス

```
1. Sử dụng Kubernetes DNS cho intra-cluster discovery
   → Không cần external registry

2. Headless Service cho stateful workloads
   → Client-side load balancing cho gRPC

3. Health checks luôn bao gồm cả liveness + readiness
   → Liveness: lightweight, không check dependencies
   → Readiness: check downstream dependencies

4. Graceful shutdown với preStop hook
   → Deregister trước khi shutdown
   → Drain existing connections

5. Service mesh thay thế client-side discovery
   → Sidecar proxy xử lý routing + load balancing
   → Application code không cần discovery logic
```

```yaml
# Graceful shutdown example
spec:
  terminationGracePeriodSeconds: 30
  containers:
    - name: app
      lifecycle:
        preStop:
          exec:
            command: ["/bin/sh", "-c", "sleep 5"]  # Wait for endpoint removal
```

---

## 概要

- **クライアント側検出**: クライアント クエリ レジストリ、自己負荷分散
- **サーバー側検出**: ルーター/LB クエリ レジストリ、転送リクエスト
- **Kubernetes DNS**: K8s ワークロードにとって最もシンプルな組み込み検出
- **ヘルスチェック**: Liveness (生存?)、Readiness (準備完了?)、Startup (開始済み?)
- Kubernetes では、**Kubernetes Service + CoreDNS** で通常十分であり、個別の Consul/etcd は必要ありません。
- サービス メッシュ (Istio/Linkerd) によるインテリジェントなルーティングによる検出のアップグレード
