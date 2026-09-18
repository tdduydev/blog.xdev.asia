---
id: lt-kcna-series-001
title: "KCNA 認證備考 — Kubernetes and Cloud Native Associate"
slug: luyen-thi-kcna
description: >-
  KCNA（Kubernetes and Cloud Native Associate）考試全面複習路線圖。
  涵蓋5大領域：Kubernetes Fundamentals（46%）、Container Orchestration（22%）、
  Cloud Native Architecture（16%）、Observability（8%）、Application Delivery（8%）。
  9堂專業課程搭配英文選擇題練習。

featured_image: images/blog/luyen-thi-kcna-banner.webp
level: beginner
duration_hours: 20
lesson_count: 9
price: '0.00'
is_free: true
view_count: 0
average_rating: '0.00'
review_count: 0
enrollment_count: 0
meta: null
published_at: '2026-04-05T10:00:00.000000Z'
created_at: '2026-04-05T10:00:00.000000Z'

author:
  id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf
  name: Duy Tran
  avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg

category:
  id: 019c9616-cat9-7009-a009-000000000009
  name: 認證備考
  slug: luyen-thi

tags:

- name: Kubernetes
  slug: kubernetes
- name: CNCF
  slug: cncf
- name: Cloud Native
  slug: cloud-native
- name: 認證
  slug: chung-chi
- name: DevOps
  slug: devops

quiz_slug: kcna

sections:

- id: kcna-section-01
  title: "領域 1：Kubernetes Fundamentals（46%）"
  description: K8s 架構、核心物件、網路、儲存、RBAC
  sort_order: 1
  lessons:
  - id: kcna-d1-l01
    title: "第1課：Kubernetes 架構與核心元件"
    slug: 01-kien-truc-kubernetes
    description: >-
      Control Plane 與 Worker Node。kube-apiserver、etcd、kube-scheduler、
      controller-manager、kubelet、kube-proxy。Kubernetes 物件概覽。
    duration_minutes: 55
    is_free: true
    sort_order: 1
    video_url: null
  - id: kcna-d1-l02
    title: "第2課：Pods、工作負載與控制器"
    slug: 02-pods-workloads-controllers
    description: >-
      Pod 生命週期。Deployment、ReplicaSet、StatefulSet、DaemonSet、
      Job、CronJob。標籤、選擇器、註解。
    duration_minutes: 55
    is_free: true
    sort_order: 2
    video_url: null
  - id: kcna-d1-l03
    title: "第3課：Service、網路與儲存"
    slug: 03-services-networking-storage
    description: >-
      ClusterIP、NodePort、LoadBalancer。CoreDNS、服務發現。
      PersistentVolume、PVC、StorageClass。ConfigMap 與 Secret。
    duration_minutes: 55
    is_free: true
    sort_order: 3
    video_url: null
  - id: kcna-d1-l04
    title: "第4課：RBAC 與安全基礎"
    slug: 04-rbac-security
    description: >-
      Role、ClusterRole、RoleBinding、ClusterRoleBinding。ServiceAccount。
      Pod Security Standards。Network Policy 概覽。
    duration_minutes: 50
    is_free: true
    sort_order: 4
    video_url: null

- id: kcna-section-02
  title: "領域 2：Container Orchestration（22%）"
  description: 容器執行環境、OCI、容器生命週期、編排模式
  sort_order: 2
  lessons:
  - id: kcna-d2-l01
    title: "第5課：容器執行環境與 OCI 標準"
    slug: 05-container-runtimes-oci
    description: >-
      Docker vs containerd vs CRI-O。OCI Image Spec、OCI Runtime Spec。
      容器生命週期。映像層與 Registry。
    duration_minutes: 50
    is_free: true
    sort_order: 5
    video_url: null
  - id: kcna-d2-l02
    title: "第6課：容器編排模式"
    slug: 06-orchestration-patterns
    description: >-
      排程、資源管理、高可用性。
      多租戶。Namespace 隔離。資源配額。
      HPA、VPA。
    duration_minutes: 50
    is_free: true
    sort_order: 6
    video_url: null

- id: kcna-section-03
  title: "領域 3：Cloud Native Architecture（16%）"
  description: 12-Factor App、微服務、Service Mesh、Serverless
  sort_order: 3
  lessons:
  - id: kcna-d3-l01
    title: "第7課：雲原生架構與設計模式"
    slug: 07-cloud-native-architecture
    description: >-
      12-Factor App 方法論。微服務 vs 單體式架構。
      不可變基礎設施。Service Mesh（Istio、Linkerd 概覽）。
      無伺服器運算。CNCF 版圖。
    duration_minutes: 55
    is_free: true
    sort_order: 7
    video_url: null

- id: kcna-section-04
  title: "領域 4 & 5：Observability 與 Application Delivery（16%）"
  description: 日誌、監控、追蹤、Helm、GitOps、CI/CD
  sort_order: 4
  lessons:
  - id: kcna-d4-l01
    title: "第8課：雲原生可觀測性"
    slug: 08-observability
    description: >-
      使用 Fluentd/Loki 的日誌管理。使用 Prometheus 與 Grafana 的指標。
      使用 Jaeger/Zipkin 的分散式追蹤。OpenTelemetry。
      告警與 SLO/SLI/SLA。
    duration_minutes: 50
    is_free: true
    sort_order: 8
    video_url: null
  - id: kcna-d5-l01
    title: "第9課：應用交付 — Helm、GitOps 與 CI/CD"
    slug: 09-helm-gitops-cicd
    description: >-
      Helm chart 與模板。GitOps 與 Argo CD/Flux。
      CI/CD pipeline 設計。部署策略（Rolling、Blue-Green、Canary）。
    duration_minutes: 55
    is_free: true
    sort_order: 9
    video_url: null
