---
id: 019d8a22-c312-7a10-b001-a1b2c3d4e512
title: 'Lesson 12: Service Discovery & Registry'
slug: bai-12-service-discovery-registry
description: >-
  Client-side vs Server-side discovery, Service Registry (Consul, etcd),
  Kubernetes DNS-based discovery, health checking, load balancing algorithms and
  service endpoint management.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 12
section_title: 'Part 4: Service Mesh & Networking'
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: Cloud Native Microservices Architecture
  slug: cloud-native-microservices-architecture
locale: en
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ Architecture — Lesson 12</text>

  <!-- Title -->
  <text x="60" y="160" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 12: Service Discovery & Registry</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="222" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Cloud Native Microservices Architecture</text>

  <!-- Section -->
  <text x="60" y="246" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 4: Service Mesh & Networking</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Lesson 12: Service Discovery & Registry](/storage/uploads/2026/03/cn-bai-12-diagram.webp)

## Introduction

In microservices, service instances can **scale up/down dynamically**, IP changes continuously. Hardcoding the address is not possible. **Service Discovery** is a mechanism that allows services to automatically find each other.

---

## 1. Service Discovery Patterns

### 1.1 Client-Side Discovery

Client queries **Service Registry** to get a list of instances, choose which instance to call:

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

**Advantage**: There is no proxy bottleneck, the client decides its own routing
**Disadvantage**: Discovery logic is in each service (each language needs its own library)

### 1.2 Server-Side Discovery

Client sends request to **Load Balancer/Router**, router queries registry and forwards:

```
┌─────────┐    ┌──────────────┐    ┌──────────────────┐
│ Client  │───▶│ Load Balancer│───▶│ Service Registry │
│ Service │    │ / Router     │◀───│                  │
│         │◀───│              │    └──────────────────┘
│         │    │              │
│         │    │              │───▶ 10.0.1.5:8080
└─────────┘    └──────────────┘
```

**Advantages**: Simple, language-agnostic client
**Disadvantages**: Load balancer is a potential bottleneck and single point of failure

### 1.3 Compare

| Criteria | Client-Side | Server-Side |
|----------|-----------|-------------|
| Client complexity | High (need library) | Low |
| Hop count | 1 (direct) | 2 (via LB) |
| Language support | Need library per language | Language-agnostic |
| Load balancer | No need | Need (potential SPOF) |
| Example | Netflix Eureka + Ribbon | Kubernetes Service, AWS ELB |

---

## 2. Service Registry

### 2.1 Consul

HashiCorp Consul provides service discovery, health checking, and KV store:

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

**Service Registration:**

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

**Service Discovery Query:**

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

Distributed KV store, used by Kubernetes for cluster state:

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

## 3. Kubernetes DNS-Based Discovery

### 3.1 CoreDNS

Kubernetes has built-in service discovery via **CoreDNS**:

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

### 3.2 Kubernetes Service Types

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

### 3.3 EndpointSlices

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

## 4. Health Checking

### 4.1 Health Check Types

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

### 4.2 Implementation

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

## 5. Load Balancing Algorithms

### 5.1 Popular algorithms

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

### 5.2 Kubernetes kube-proxy modes

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

## 6. Best Practices

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

## Summary

- **Client-Side Discovery**: Client query registry, self-load balance
- **Server-Side Discovery**: Router/LB query registry, forward request
- **Kubernetes DNS**: Built-in discovery, simplest for K8s workloads
- **Health checks**: Liveness (alive?), Readiness (ready?), Startup (started?)
- In Kubernetes, **Kubernetes Service + CoreDNS** is usually enough, no need for separate Consul/etcd
- Service Mesh (Istio/Linkerd) upgrades discovery with intelligent routing
