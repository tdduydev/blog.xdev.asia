---
id: 019d8a22-c326-7a10-b001-a1b2c3d4e526
title: 'レッスン 26: 実稼働準備チェックリストと実装ロードマップ'
slug: bai-26-production-readiness-checklist-lo-trinh-trien-khai
description: >-
  アーキテクチャ決定チェックリスト、推奨されるテクノロジー スタック、4 段階の実装ロードマップ (基盤 → コア プラットフォーム → アドバンスト →
  最適化)、キャパシティ プランニング、コストの最適化、ランブック テンプレート、および災害復旧計画。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 26
section_title: 'パート 8: セキュリティと本番環境の準備'
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: クラウドネイティブのマイクロサービスアーキテクチャ
  slug: cloud-native-microservices-architecture
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-1155" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-1155)"/>

  <!-- Decorations -->
  <g>
    <circle cx="800" cy="270" r="8" fill="#38bdf8" opacity="0.05"/>
    <circle cx="1000" cy="90" r="8" fill="#38bdf8" opacity="0.05"/>
    <circle cx="700" cy="170" r="8" fill="#38bdf8" opacity="0.05"/>
    <circle cx="900" cy="250" r="8" fill="#38bdf8" opacity="0.05"/>
    <circle cx="600" cy="70" r="8" fill="#38bdf8" opacity="0.05"/>
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
    <line x1="600" y1="50" x2="1100" y2="130" stroke="#38bdf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="80" x2="1050" y2="150" stroke="#38bdf8" stroke-width="0.5" opacity="0.08"/>
    <polygon points="921.650635094611,87.5 921.650635094611,112.5 900,125 878.349364905389,112.5 878.349364905389,87.5 900,75" fill="none" stroke="#38bdf8" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#38bdf8"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#38bdf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#38bdf8">🏗️ 建築 — レッスン 26</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 26: 本番準備チェックリストと</tspan>
      <tspan x="60" dy="42">実装ロードマップ</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">クラウドネイティブのマイクロサービスアーキテクチャ</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 8: セキュリティと本番環境の準備</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![レッスン 26: 実稼働準備チェックリストと実装ロードマップ](/storage/uploads/2026/03/cn-bai-26-diagram.webp)

## はじめに

本番の準備は最終ステップではありません。これは初日から満たさなければならない基準です。コースの最後のレッスンでは、すべての知識を実践的なチェックリスト、推奨されるテクノロジ スタック、マイクロサービス システムをゼロから運用環境にデプロイするための 4 段階のロードマップに統合します。

---

## 1. アーキテクチャ決定チェックリスト

### 1.1 マイクロサービスはどのような場合に使用する必要がありますか?

```
✅ Phù hợp với Microservices khi:
□ Team > 20 người, chia thành nhiều team nhỏ (2-pizza rule)
□ Cần scale độc lập từng phần (payment cần scale nhiều hơn catalog)
□ Các domain có tốc độ thay đổi khác nhau (checkout vs reporting)
□ Cần polyglot technology (ML service = Python, core = Java)
□ Traffic peak asymmetric (flash sale chỉ ảnh hưởng order service)

❌ Không nên dùng Microservices khi:
□ Team < 10 người — overhead > benefit
□ Domain chưa rõ ràng — microservices đòi hỏi stable boundaries
□ Không có DevOps maturity — không có CI/CD, monitoring, container platform
□ Startup phase — premature optimization, YAGNI
□ Simple CRUD app — monolith đơn giản hơn nhiều
```

### 1.2 サービス分解の決定

```
Domain → Bounded Context → Service

Câu hỏi trước khi tách service:
1. Service có thể deploy độc lập không?
2. Service có team riêng maintain không?
3. Có cần scale độc lập không?
4. Domain boundary có rõ ràng không?
5. Data coupling có low không?

Nếu ≥ 4 câu YES → tách service là hợp lý
Nếu < 3 câu YES → giữ trong monolith hoặc module
```

---

## 2. テクノロジースタックの推奨事項

### 2.1 コアプラットフォーム

```
┌─────────────────────────────────────────────────────────────┐
│                    Recommended Stack 2024                    │
├──────────────────────┬──────────────────────────────────────┤
│ Container Runtime    │ containerd (không dùng Docker)        │
│ Orchestration        │ Kubernetes (EKS/GKE/AKS hoặc k3s)    │
│ Service Mesh         │ Istio (lớn) / Cilium (nhỏ/đơn giản)  │
│ API Gateway          │ Kong / Traefik / Nginx                │
│ Service Registry     │ Kubernetes DNS + Endpoints           │
├──────────────────────┼──────────────────────────────────────┤
│ Message Broker       │ Apache Kafka (high throughput)        │
│                      │ NATS JetStream (lightweight)          │
├──────────────────────┼──────────────────────────────────────┤
│ Observability        │ Prometheus + Grafana (metrics)        │
│                      │ Grafana Loki (logs)                   │
│                      │ Tempo / Jaeger (traces)               │
│                      │ OpenTelemetry (instrumentation)       │
├──────────────────────┼──────────────────────────────────────┤
│ Storage              │ PostgreSQL (relational)               │
│                      │ MongoDB (document)                    │
│                      │ Redis (cache/session)                 │
│                      │ Elasticsearch (search)                │
├──────────────────────┼──────────────────────────────────────┤
│ CI/CD                │ GitHub Actions / GitLab CI            │
│ GitOps               │ ArgoCD                                │
│ Secrets              │ HashiCorp Vault                       │
│ Registry             │ Harbor                                │
└──────────────────────┴──────────────────────────────────────┘
```

### 2.2 言語/フレームワークの推奨事項

```
Backend Services:
- Java/Kotlin + Spring Boot 3.x  → enterprise, mature ecosystem
- Go                              → performance-critical, CLI tools
- Node.js/TypeScript              → BFF, real-time, high I/O
- Python                          → ML services, data processing

Frontend/BFF:
- Next.js (React)                 → SSR + BFF pattern
- GraphQL (Apollo/gqlgen)         → flexible API aggregation

Database:
- PostgreSQL 16+                  → default choice for relational
- Redis 7+                        → cache, pub/sub, streams
- Kafka 3.x                       → event streaming, CDC
```

---

## 3. 4 フェーズの実装ロードマップ

### フェーズ 1: 基礎 (1 月～2 月)

```
Mục tiêu: Core infrastructure, CI/CD, observability cơ bản

INFRA:
□ Kubernetes cluster (managed: EKS/GKE/AKS hoặc self-managed: k3s)
□ Container registry (Harbor hoặc ECR/GCR/ACR)
□ DNS và Load Balancer (cert-manager cho TLS)
□ Namespace strategy (dev / staging / prod)

CI/CD:
□ Git repository structure (monorepo vs polyrepo — quyết định sớm)
□ GitHub Actions / GitLab CI pipelines
□ Docker build + push pipeline
□ ArgoCD install + app-of-apps pattern

OBSERVABILITY:
□ Prometheus + Grafana (Kube Prometheus Stack)
□ Grafana Loki (log aggregation)
□ Basic alerting rules (CPU, memory, pod restarts)

BASELINE METRICS:
□ DORA metrics tracking (deploy frequency, lead time, MTTR, change failure rate)

DELIVERABLE: Có thể deploy hello-world service trong < 5 phút
```

### フェーズ 2: コア プラットフォーム (3 月～5 月)

```
Mục tiêu: Service communication, data management, security cơ bản

SERVICES:
□ API Gateway (Kong/Traefik)
□ Service-to-service communication pattern (REST/gRPC/events)
□ Message broker (Kafka hoặc NATS)
□ Service discovery (Kubernetes DNS)

DATA:
□ Database per service (mỗi service có DB riêng)
□ Data migration strategy (Flyway / Liquibase)
□ Read replicas cho read-heavy services
□ Redis caching layer

SECURITY:
□ mTLS giữa services (Istio / Cilium) hoặc manual gRPC TLS
□ OAuth2 + JWT authentication (Keycloak)
□ Network Policies
□ Pod Security Standards (baseline)
□ Vault cho secrets management

RESILIENCE:
□ Circuit breaker (Resilience4j)
□ Retry với exponential backoff
□ Resource limits trên tất cả containers
□ Readiness + Liveness + Startup probes

DELIVERABLE: Core business services deploy thành công, auth hoạt động
```

### フェーズ 3: アドバンスト (6 月～9 月)

```
Mục tiêu: Distributed systems patterns, advanced observability, reliability

PATTERNS:
□ Saga pattern cho distributed transactions
□ Event Sourcing cho audit-critical services
□ CQRS (nếu read/write model khác nhau)
□ Outbox pattern cho reliable event publishing

OBSERVABILITY (nâng cao):
□ Distributed tracing (OpenTelemetry + Tempo/Jaeger)
□ Custom Grafana dashboards (RED method per service)
□ SLI/SLO definitions và error budget alerts
□ Synthetic monitoring (Blackbox Exporter)

DEPLOYMENT:
□ Canary deployments (Argo Rollouts)
□ Feature flags (Unleash / LaunchDarkly)
□ Blue/Green cho stateful services

SECURITY (nâng cao):
□ Dynamic secrets (Vault DB secrets)
□ Container image signing (Cosign)
□ Vulnerability scanning tích hợp CI (Trivy)
□ Falco runtime security

CHAOS:
□ Chaos Engineering baseline (LitmusChaos)
□ Quarterly Game Days

DELIVERABLE: SLOs defined cho tất cả core services, chaos testing hoạt động
```

### フェーズ 4: 最適化 (10 月以降)

```
Mục tiêu: Performance, cost optimization, advanced automation

PERFORMANCE:
□ Profiling services (async profiler / pprof)
□ Database query optimization (slow query log, indexes)
□ Caching strategy tinh chỉnh (cache hit rates > 80%)
□ Connection pool tuning

AUTO-SCALING:
□ HPA cho tất cả services (CPU + custom metrics)
□ VPA recommendations (resource right-sizing)
□ KEDA cho event-driven autoscaling (Kafka lag)
□ Cluster Autoscaler / Karpenter

COST:
□ Spot instances cho non-critical workloads
□ Namespace resource quotas
□ Idle resource cleanup (K8s Goldilocks)
□ Cost allocation by service / team

MULTI-CLUSTER (nếu cần):
□ Multi-region deployment
□ Global load balancing
□ Cross-region replication

DELIVERABLE: Infrastructure cost giảm ≥ 20%, SLO maintained ≥ 99.9%
```

---

## 4. キャパシティプランニング

### 4.1 サイジングサービス

```
Rule of thumb cho JVM services:
- Memory request: heap_max * 1.5 + 200Mi (JVM overhead)
  Ví dụ: heap 512Mi → request 968Mi ≈ 1Gi
- CPU request: throughput / 1000 * 2 (2ms per req avg)
  Ví dụ: 500 RPS → CPU request: 1.0 cores

Go services:
- Memory: 50–200Mi (much lower than JVM)
- CPU: throughput / 2000 (faster per req)

Node.js:
- Memory: 256–512Mi
- CPU: throughput / 1500
```

### 4.2 負荷テストのベースライン

```bash
# k6 load test baseline trước production
cat <<EOF > load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 },   // Ramp up
    { duration: '5m', target: 100 },   // Steady state
    { duration: '2m', target: 500 },   // Spike test
    { duration: '5m', target: 500 },   // Hold spike
    { duration: '2m', target: 0 },     // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95th percentile < 500ms
    http_req_failed: ['rate<0.01'],    // Error rate < 1%
  },
};

export default () => {
  const r = http.get('https://api.example.com/orders');
  check(r, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
};
EOF

k6 run load-test.js
```

---

## 5. ランブックのテンプレート

各サービスには Runbook が必要です。最小限のテンプレート:

```markdown
# Runbook: Order Service

## Service Overview
- Owner: Order Team
- PagerDuty: order-service
- Dashboard: https://grafana/d/order-service
- Source: https://github.com/company/order-service

## SLO
- Availability: 99.9% (43.8 min downtime/month)
- Latency: P99 < 500ms

## Common Incidents

### High Error Rate
**Alert**: `OrderServiceErrorRate > 5%`
**Procedure**:
1. `kubectl logs -n prod -l app=order-service --tail=100`
2. Kiểm tra database connection: `kubectl exec -it postgres-0 -- psql -U orders -c "SELECT count(*) FROM pg_stat_activity"`
3. Nếu DB connection pool exhausted: `kubectl rollout restart deploy/order-service`
4. Nếu vẫn fail: activate circuit breaker manually, alert on-call

### High Latency
**Alert**: `OrderServiceP99Latency > 2s`
**Procedure**:
1. Mở trace dashboard, filter by slow spans
2. Kiểm tra slow queries: `kubectl exec postgres-0 -- psql -c "SELECT * FROM pg_stat_statements ORDER BY total_time DESC LIMIT 10"`
3. Kiểm tra Kafka consumer lag: `kafka-consumer-groups.sh --describe --group order-consumer`

### Pod CrashLoopBackOff
**Procedure**:
1. `kubectl describe pod <pod> -n prod`
2. `kubectl logs <pod> -n prod --previous`
3. Nếu OOMKilled: tăng memory limit hoặc profile memory leak
4. Nếu config error: kiểm tra ConfigMap/Secret đúng chưa

## Rollback Procedure
```バッシュ
# ArgoCD アプリケーションを以前のリビジョンにロールバックする
argocd アプリ ロールバック オーダー サービス --revision PREVIOUS_SYNC_ID

# または Helm リリースをロールバックする
helm rollback order-service -n prod 0 # 0 = 以前のリビジョン
\```

## Escalation
- L1 (0–15 min): On-call engineer
- L2 (15–30 min): Engineer lead
- L3 (30+ min): CTO notification
```

---

## 6. 災害復旧計画

### 6.1 RTO/RPO 目標

```
Tier 1 — Payment, Authentication:
  RTO: 1 hour    (phục hồi trong 1 giờ)
  RPO: 15 phút   (mất tối đa 15 phút data)
  → Multi-AZ, database replication, automated failover

Tier 2 — Order, Inventory:
  RTO: 4 giờ
  RPO: 1 giờ
  → DB backup mỗi giờ, manual failover procedure

Tier 3 — Reporting, Analytics:
  RTO: 24 giờ
  RPO: 24 giờ
  → Daily backup là đủ
```

### 6.2 DR チェックリスト

```
Backup:
□ Database backup tự động (Velero cho PVC, pg_dump cho PostgreSQL)
□ Backup retention theo tier (Tier 1: 30 ngày, Tier 2: 7 ngày, Tier 3: 3 ngày)
□ Backup restore test mỗi tháng (automated DR drill)
□ Cross-region backup storage

Application State:
□ Stateless services (state trong database/cache — easy to restore)
□ Kafka topics replicated across brokers
□ Redis sentinel / cluster mode cho high availability

Infrastructure:
□ Infrastructure as Code (Terraform / Pulumi) — rebuilt từ code
□ GitOps state (ArgoCD) — redeploy từ Git
□ Secrets backed up trong Vault (HA mode)

Recovery Drills:
□ DR drill quarterly: simulate AZ failure
□ Data restore test monthly: restore từ backup vào staging
□ Chaos day biannual: full DR walkthrough
```

---

## 7. DORA の指標とチームの健全性

### 7.1 DORA メトリクスの追跡

```
Elite Performance (mục tiêu):
- Deploy Frequency:      Multiple deploys/day
- Lead Time for Change:  < 1 giờ (code merged → production)
- MTTR:                  < 1 giờ
- Change Failure Rate:   < 5%

Đo lường:
- Deploy Frequency: count(ArgoCD sync) per day
- Lead Time: git tag timestamp → ArgoCD sync timestamp
- MTTR: PagerDuty alert triggered → resolved
- Change Failure Rate: rollbacks / total deploys
```

---

## 8. 全体的なアーキテクチャ — 最終的なビュー

```
                         Internet
                            │
                    [CloudFlare WAF]
                            │
                    [Global Load Balancer]
                            │
              ┌─────────────┴─────────────┐
              │                           │
         [Region A]                  [Region B]
              │
    [Kubernetes Cluster]
              │
    ┌─────────┴─────────────────────┐
    │      Ingress / API Gateway     │
    │  (Kong + cert-manager + TLS)   │
    └─────────┬──────────────────────┘
              │
    ┌─────────┴──────────────┐
    │   Service Mesh (Istio)  │
    │   mTLS between all pods │
    └─────────┬──────────────┘
              │
    ┌─────────┴────────────────────────────┐
    │              Core Services           │
    │                                      │
    │  [Auth]  [Order]  [Payment] [Catalog]│
    │     └────────┬──────────┘            │
    │             [Kafka]                  │
    └─────────┬─────────────────┬──────────┘
              │                 │
    ┌─────────┴───┐    ┌────────┴───────┐
    │  Data Layer  │    │  Platform      │
    │  PostgreSQL  │    │  Vault         │
    │  Redis       │    │  ArgoCD        │
    │  Elasticsearch   │  Harbor         │
    └─────────────┘    │  Prometheus     │
                       │  Grafana/Loki   │
                       └────────────────┘
```

---

## 9. コースの概要

**クラウド ネイティブ マイクロサービス アーキテクチャ** — 理論から本番環境に対応した実装までを完了しました。

|パート |トピックス |重要なポイント |
|----------|----------|---------------|
| 1 |クラウドネイティブの基盤 | 12 要素のアプリ、コンテナー、Kubernetes の基本 |
| 2 |デザインとコミュニケーション |ドメイン駆動設計、REST/gRPC/イベント |
| 3 |データ管理 |サービスごとのデータベース、Saga、CQRS、イベント ソーシング |
| 4 |サービスメッシュ | Istio、mTLS、トラフィック管理 |
| 5 |可観測性 |プロメテウス、グラファナ、ロキ、OpenTelemetry |
| 6 |回復力 |サーキット ブレーカー、バルクヘッド、レート制限、カオス |
| 7 | CI/CD と展開 | GitOps、ArgoCD、カナリア、ブルー/グリーン |
| 8 |セキュリティと生産 | JWT、Vault、コンテナセキュリティ、Runbook |

**次は**:
1. モノリス → マイクロサービスに変換するサービスを選択します
2. Kubernetes クラスターのセットアップ (k3s ローカルまたはマネージド クラウド)
3. CI/CD パイプラインと可観測性スタックを実装する
4. 一度に 1 つのパターンを適用します。ビッグバン移行は行わないでください。
5. DORA メトリクスを測定する — 反復的に改善する

> マイクロサービスは目的地ではありません。マイクロサービスは、チームが価値をより速く、より安全に、より持続的に提供するための手段です。
