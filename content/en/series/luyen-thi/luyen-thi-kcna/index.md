---
id: lt-kcna-series-001
title: "KCNA Exam Prep — Kubernetes and Cloud Native Associate"
slug: luyen-thi-kcna
description: >-
  A comprehensive study path for the KCNA (Kubernetes and Cloud Native Associate) exam.
  Covers all 5 domains: Kubernetes Fundamentals (46%), Container Orchestration (22%),
  Cloud Native Architecture (16%), Observability (8%), Application Delivery (8%).
  9 in-depth lessons with English practice quizzes.

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
  name: Certification Prep
  slug: luyen-thi

tags:

- name: Kubernetes
  slug: kubernetes
- name: CNCF
  slug: cncf
- name: Cloud Native
  slug: cloud-native
- name: Certification
  slug: chung-chi
- name: DevOps
  slug: devops

quiz_slug: kcna

sections:

- id: kcna-section-01
  title: "Domain 1: Kubernetes Fundamentals (46%)"
  description: K8s architecture, core objects, networking, storage, RBAC
  sort_order: 1
  lessons:
  - id: kcna-d1-l01
    title: "Lesson 1: Kubernetes Architecture & Core Components"
    slug: 01-kien-truc-kubernetes
    description: >-
      Control plane vs Worker node. kube-apiserver, etcd, kube-scheduler,
      controller-manager, kubelet, kube-proxy. Kubernetes objects overview.
    duration_minutes: 55
    is_free: true
    sort_order: 1
    video_url: null
  - id: kcna-d1-l02
    title: "Lesson 2: Pods, Workloads & Controllers"
    slug: 02-pods-workloads-controllers
    description: >-
      Pod lifecycle. Deployments, ReplicaSets, StatefulSets, DaemonSets,
      Jobs, CronJobs. Labels, selectors, annotations.
    duration_minutes: 55
    is_free: true
    sort_order: 2
    video_url: null
  - id: kcna-d1-l03
    title: "Lesson 3: Services, Networking & Storage"
    slug: 03-services-networking-storage
    description: >-
      ClusterIP, NodePort, LoadBalancer. CoreDNS, Service discovery.
      PersistentVolume, PVC, StorageClass. ConfigMaps & Secrets.
    duration_minutes: 55
    is_free: true
    sort_order: 3
    video_url: null
  - id: kcna-d1-l04
    title: "Lesson 4: RBAC & Security Basics"
    slug: 04-rbac-security
    description: >-
      Role, ClusterRole, RoleBinding, ClusterRoleBinding. ServiceAccounts.
      Pod Security Standards. Network Policies overview.
    duration_minutes: 50
    is_free: true
    sort_order: 4
    video_url: null

- id: kcna-section-02
  title: "Domain 2: Container Orchestration (22%)"
  description: Container runtimes, OCI, container lifecycle, orchestration patterns
  sort_order: 2
  lessons:
  - id: kcna-d2-l01
    title: "Lesson 5: Container Runtimes & OCI Standards"
    slug: 05-container-runtimes-oci
    description: >-
      Docker vs containerd vs CRI-O. OCI Image Spec, OCI Runtime Spec.
      Container lifecycle. Image layers and registries.
    duration_minutes: 50
    is_free: true
    sort_order: 5
    video_url: null
  - id: kcna-d2-l02
    title: "Lesson 6: Container Orchestration Patterns"
    slug: 06-orchestration-patterns
    description: >-
      Scheduling, resource management, high availability.
      Multi-tenancy. Namespace isolation. Resource quotas.
      Horizontal Pod Autoscaler, Vertical Pod Autoscaler.
    duration_minutes: 50
    is_free: true
    sort_order: 6
    video_url: null

- id: kcna-section-03
  title: "Domain 3: Cloud Native Architecture (16%)"
  description: 12-factor app, microservices, service mesh, serverless
  sort_order: 3
  lessons:
  - id: kcna-d3-l01
    title: "Lesson 7: Cloud Native Architecture & Design Patterns"
    slug: 07-cloud-native-architecture
    description: >-
      12-factor app methodology. Microservices vs Monolith.
      Immutable infrastructure. Service mesh (Istio, Linkerd overview).
      Serverless computing. CNCF landscape.
    duration_minutes: 55
    is_free: true
    sort_order: 7
    video_url: null

- id: kcna-section-04
  title: "Domain 4 & 5: Observability & Application Delivery (16%)"
  description: Logging, monitoring, tracing, Helm, GitOps, CI/CD
  sort_order: 4
  lessons:
  - id: kcna-d4-l01
    title: "Lesson 8: Cloud Native Observability"
    slug: 08-observability
    description: >-
      Logging with Fluentd/Loki. Metrics with Prometheus & Grafana.
      Distributed tracing with Jaeger/Zipkin. OpenTelemetry.
      Alerting and SLO/SLI/SLA.
    duration_minutes: 50
    is_free: true
    sort_order: 8
    video_url: null
  - id: kcna-d5-l01
    title: "Lesson 9: Application Delivery — Helm, GitOps & CI/CD"
    slug: 09-helm-gitops-cicd
    description: >-
      Helm charts, values, templates. GitOps with ArgoCD & Flux.
      CI/CD pipelines for Kubernetes. Kustomize basics.
      Progressive delivery (canary, blue-green).
    duration_minutes: 50
    is_free: true
    sort_order: 9
    video_url: null
