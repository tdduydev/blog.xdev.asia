---
id: 019d8a22-c303-7a10-b001-a1b2c3d4e503
title: 第 3 課：Kubernetes 架構與核心概念
slug: bai-3-kubernetes-architecture-core-concepts
description: >-
  Kubernetes
  架構（控制平面、工作節點）、核心資源（Pod、Deployment、Service、ConfigMap、Secret）、Namespace 策略以及
  Kubernetes 如何自動編排容器。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 3
section_title: 第 1 部分：雲端原生基礎
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: 雲端原生微服務架構
  slug: cloud-native-microservices-architecture
locale: zh-tw
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#34d399">🏗️ 建築 — 第 3 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 3 課：Kubernetes 架構與核心</tspan>
      <tspan x="60" dy="42">概念</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">雲端原生微服務架構</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 1 部分：雲端原生基礎</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![第 3 課：Kubernetes 架構與核心概念](/storage/uploads/2026/03/cn-bai-3-diagram.webp)

## 簡介

Kubernetes (K8s) 是容器工作負載的標準編排平台。在實作任何微服務系統之前，必須先了解 Kubernetes 的架構和核心概念。

---

## 1.Kubernetes 架構

### 1.1 進階概述

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

### 1.2 控制平面組件

**kube-apiserver** — 叢集的「前門」：
- 接收所有 REST API 請求
- 身份驗證（AuthN）和授權（AuthZ）
- 驗證資源並將其保存到etcd中
- 唯一直接與etcd通訊的元件

**etcd** — 分散式鍵值儲存：
- 儲存**整個叢集狀態**（期望+實際）
- 強一致（Raft共識）
- 需要定期備份

**kube-scheduler** — 決定 Pod 在哪個節點上運作：
- 評估資源請求、親和力、污點/容忍度
- 評分演算法：選擇最優節點

**kube-controller-manager** — 確保所需狀態 = 實際狀態：
- ReplicaSet控制器：確保正確的副本數量
- 部署控制器：管理捲動更新
- 節點控制器：偵測節點故障
- 作業控制器：管理一次性任務

### 1.3 Worker節點元件

**kubelet** — 在每個節點上運行的代理程式：
- 從 API Server 取得 Pod 規格
- 確保Pod中的容器正在運作
- 報告節點狀態和Pod狀態

**kube-proxy** — 網路代理：
- 管理服務網路規則（iptables/IPVS）
- 負載平衡 Pod 端點的流量

**容器運行時**——containerd 或 CRI-O：
- 拉取鏡像、啟動/停止容器
- CRI（容器運行時介面）合規性

---

## 2. 核心資源

### 2.1 Pod — 最小單元

Pod 是一個或多個一起運作、分享網路和儲存的容器：

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

> **注意**：在生產中，**切勿直接建立 Pod**。始終使用部署。

### 2.2 部署－生命週期管理

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

### 2.3 服務－暴露與負載平衡

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

服務類型：

```
ClusterIP   → Internal only (default)
NodePort    → Expose qua port trên mỗi node (30000-32767)
LoadBalancer → Cloud provider tạo external LB
ExternalName → DNS CNAME alias
```

### 2.4 ConfigMap 和 Secret

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

> **重要**：Kubernetes Secret 僅採用 Base64 編碼，**未編碼**。在生產中，使用 **Sealed Secrets** 或 **External Secrets Operator** + Vault。

### 2.5 Ingress — 外部訪問

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

## 3. 自動縮放

### 3.1 水平 Pod 自動縮放器 (HPA)

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

### 3.2 垂直 Pod 自動縮放器 (VPA)

VPA 自動調整 CPU/記憶體請求：

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

## 4.命名空間策略

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

**每個命名空間的資源配額：**

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

## 5.Kubernetes 網路模型

### 5.1 Pod 到 Pod 通信

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

### 5.2 透過 CoreDNS 發現服務

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

## 6. 總結

|組件|角色 |
|------------|---------|
|控制平面|管理叢集狀態、調度、控制器循環 |
|吊艙 |最小部署單元，1+容器|
|部署|管理ReplicaSet、滾動更新、回滾 |
|服務 |網路端點穩定，負載平衡 |
| 機密/秘密 |外部化設定 |
|入口 |外部 HTTP(S) 路由 |
| HPA/VPA |自动缩放水平和垂直|
|命名空間 |邏輯隔離、資源配額|

> **下一篇文章**：微服務設計原則 - SRP、DDD 和有界上下文來正確定義服務邊界。
