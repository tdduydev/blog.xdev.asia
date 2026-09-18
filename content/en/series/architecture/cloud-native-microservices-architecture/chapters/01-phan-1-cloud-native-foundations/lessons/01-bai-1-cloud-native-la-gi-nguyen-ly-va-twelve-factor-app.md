---
id: 019d8a22-c301-7a10-b001-a1b2c3d4e501
title: 'Lesson 1: What is Cloud Native? — Principle and Twelve-Factor App'
slug: bai-1-cloud-native-la-gi-nguyen-ly-va-twelve-factor-app
description: >-
  Defining Cloud Native according to CNCF, comparing Traditional vs Cloud
  Native, Twelve-Factor App methodology, and why Cloud Native is an inevitable
  trend for modern applications.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 1
section_title: 'Part 1: Cloud Native Foundations'
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: Cloud Native Microservices Architecture
  slug: cloud-native-microservices-architecture
locale: en
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f87171">🏗️ Architecture — Lesson 1</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 1: What is Cloud Native? — Principle and</tspan>
      <tspan x="60" dy="42">Twelve-Factor App</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Cloud Native Microservices Architecture</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 1: Cloud Native Foundations</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Lesson 1: What is Cloud Native? — Principle and Twelve-Factor App](/storage/uploads/2026/03/cn-bai-1-diagram.webp)

## Introduction

Cloud computing has completely changed the way we build and operate software. But simply running an application on the cloud is not synonymous with "Cloud Native". This lesson helps you understand what Cloud Native really means, why it's important, and the foundational principles every engineer should master.

---

## 1. What is Cloud Native?

### 1.1 Definition according to CNCF

According to **Cloud Native Computing Foundation (CNCF)** — the organization that manages projects such as Kubernetes, Prometheus, Envoy:

> Cloud native technologies empower organizations to build and run scalable applications in modern, dynamic environments such as public, private, and hybrid clouds. Containers, service meshes, microservices, immutable infrastructure, and declarative APIs exemplify this approach.

Simply put: Cloud Native is an **approach** for building applications that take full advantage of cloud computing.

### 1.2 Core features

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

### 1.3 Cloud Native ≠ "Runs on the Cloud"

An application running on AWS EC2 but still monolith, manually deployed, no auto-scaling — **not Cloud Native**.

In contrast, an application running on an on-premise Kubernetes cluster with full containers, CI/CD, observability — **that's Cloud Native**.

> Cloud Native is about **how you build and operate**, not **where you run**.

---

## 2. Compare Traditional vs Cloud Native

| Features | Traditional | Cloud Native |
|-----------|-------------|--------------|
| **Architecture** | Monolithic | Microservices |
| **Deployment** | VM / Bare metal | Containers / Kubernetes |
| **Scaling** | Vertical (scale up) | Horizontal (scale out) |
| **Release cycle** | Monthly / Quarterly | Daily / hourly |
| **Failure handling** | Avoid failure at all costs | Accept failure, self-recover |
| **Infrastructure** | Mutable (updated in place) | Immutable (complete replacement) |
| **State** | Stateful servers | Stateless services + External state |
| **Configuration** | Config file on server | Environment variables / ConfigMap |
| **Networking** | Fixed IP | Dynamic DNS, Service Discovery |
| **Monitoring** | Reactive (know when it happens) | Proactive (metrics, alerts, traces) |

### Practical example

**Traditional approach:**
```
Developer → Build WAR → Gửi cho Ops → Ops deploy lên Tomcat trên VM
→ Cần scale? Mua thêm server, cài đặt thủ công
→ Server die? Downtime cho đến khi fix xong
```

**Cloud Native approach:**
```
Developer → Git push → CI/CD tự động build container image
→ ArgoCD sync → Kubernetes deploy 3 replicas
→ Cần scale? HPA tự thêm pod
→ Pod die? Kubernetes tự restart trong giây
```

---

## 3. Why Cloud Native?

### 3.1 Business drivers

- **Time-to-market**: Deploy new features in hours instead of weeks
- **Scalability**: Handle traffic spikes (Black Friday, flash sale) automatically
- **Cost efficiency**: Scale down when not needed, only pay for what you use
- **Innovation speed**: Teams develop independently and in parallel

### 3.2 Technical drivers

- **Fault isolation**: Error in service A does not bring down the entire system
- **Technology diversity**: Each service can use the most suitable language/framework
- **Independent deployment**: Update service A without redeploying service B
- **Resource optimization**: CPU/Memory is allocated accurately for each workload

---

## 4. The Twelve-Factor App

The **Twelve-Factor App** (12factor.net) methodology, proposed by Heroku in 2011, is the theoretical foundation for Cloud Native application design.

### 4.1 Overview of 12 factors

#### Factor 1: Codebase
> A single codebase managed by version control, deployed to multiple environments.

```
Git Repository (1 codebase)
├── Deploy → Development
├── Deploy → Staging
└── Deploy → Production
```

**Rule**: One app = one repo. If there is shared code, separate it into a library.

#### Factor 2: Dependencies
> Declare and isolate dependencies clearly.

```json
// package.json — khai báo rõ ràng
{
  "dependencies": {
    "express": "4.18.2",
    "pg": "8.11.0"
  }
}
```

**Never** rely on system-level packages pre-installed on the server.

#### Factor 3: Config
> Save configuration in environment variables.

```bash
# ✅ Đúng: Config qua env vars
DATABASE_URL=postgresql://user:pass@host:5432/db
REDIS_URL=redis://cache:6379
API_KEY=sk-xxx

# ❌ Sai: Hardcode trong source code
const DB_HOST = "192.168.1.100";
```

#### Factor 4: Backing Services
> Handle backing services as attached resources.

```
App ──attach──▶ PostgreSQL (có thể thay bằng RDS bất cứ lúc nào)
App ──attach──▶ Redis (có thể thay bằng ElastiCache)
App ──attach──▶ S3 (có thể thay bằng MinIO)
```

Changing backing service = changing config, **not changing code**.

#### Factor 5: Build, Release, Run
> Completely separate build, release and run stages.

```
Build Stage:   Source code → Executable (Docker image)
Release Stage: Image + Config → Versioned release (v1.2.3)
Run Stage:     Launch release trong execution environment
```

#### Factor 6: Processes
> Run the application as stateless processes.

```
# ✅ Stateless: Session lưu ở Redis
Request → App Instance 1 ──session──▶ Redis
Request → App Instance 2 ──session──▶ Redis

# ❌ Stateful: Session lưu trong memory
Request → App Instance 1 (session ở đây)
Request → App Instance 2 (không có session!) ← BUG
```

#### Factor 7: Port Binding
> Export services via port binding.

Application contains its own HTTP server (no need for external Tomcat/Apache):

```javascript
const app = express();
app.listen(process.env.PORT || 8080);
```

#### Factor 8: Concurrency
> Scale out through process model.

```
Thay vì 1 process lớn dùng 16 cores:
├── Web process × 4 (handle HTTP requests)
├── Worker process × 8 (background jobs)
└── Clock process × 1 (scheduled tasks)
```

#### Factor 9: Disposability
> Fast startup, graceful shutdown.

```
Startup:  < 5 giây (lý tưởng < 1 giây)
Shutdown: SIGTERM → hoàn thành request đang xử lý → close connections → exit
```

#### Factor 10: Dev/Prod Parity
> Keep development, staging and production as similar as possible.

```
# ✅ Dev dùng PostgreSQL, Prod dùng PostgreSQL
# ❌ Dev dùng SQLite, Prod dùng PostgreSQL
# ❌ Dev dùng file system, Prod dùng S3
```

Docker Compose helps achieve dev/prod parity.

#### Factor 11: Logs
> Process logs as event streams.

```
Application → stdout/stderr → Log collector (Fluent Bit) → Loki/Elasticsearch
```

Application **never** manages log files. Just write to stdout.

#### Factor 12: Admin Processes
> Run admin/management tasks as one-off processes.

```bash
# Database migration
kubectl exec -it order-service-pod -- ./manage.py migrate

# Data cleanup
kubectl run --rm -it cleanup --image=myapp -- python cleanup_script.py
```

### 4.2 Beyond Twelve Factors

Kevin Hoffman in the book "Beyond the Twelve-Factor App" adds 3 additional factors:

- **Factor 13: API First** — Design API contract first, implement later
- **Factor 14: Telemetry** — Metrics, logs, traces are required
- **Factor 15: Authentication & Authorization** — Security by design, not afterthought

---

## 5. Cloud Native Landscape

CNCF maintains the **Cloud Native Landscape** — a map of the entire Cloud Native technology stack:

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

## 6. Summary

| Concepts | Takeaway |
|--------|----------|
| Cloud Native | Method of building applications that take advantage of the cloud, not just running on the cloud |
| Twelve-Factor | 12 principles of portable, scalable, production-ready application design |
| Immutable Infrastructure | Do not repair the server, completely replace |
| Stateless Design | State in external service, app instance can be replaced at any time |
| Observable by Default | Metrics, logs, traces are mandatory requirements from the beginning |

> **Next article**: Containers & Docker — Cloud Native application packaging platform, from Dockerfile best practices to image security.
