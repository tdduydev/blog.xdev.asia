---
id: lt-ckad-series-001
title: "Luyện thi CKAD — Certified Kubernetes Application Developer"
slug: luyen-thi-ckad
description: >-
  Lộ trình ôn tập toàn diện cho kỳ thi CKAD (Certified Kubernetes Application Developer).
  Bao phủ đầy đủ 5 domain hands-on: App Environment & Security (25%), App Design & Build (20%),
  App Deployment (20%), Services & Networking (20%), App Observability (15%).
  10 bài học kèm bài tập thực hành terminal.

featured_image: images/blog/luyen-thi-ckad-banner.webp
level: intermediate
duration_hours: 28
lesson_count: 10
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
  name: Luyện thi chứng chỉ
  slug: luyen-thi

tags:

- name: Kubernetes
  slug: kubernetes
- name: CKAD
  slug: ckad
- name: CNCF
  slug: cncf
- name: Chứng chỉ
  slug: chung-chi
- name: DevOps
  slug: devops
- name: Linux Foundation
  slug: linux-foundation

quiz_slug: ckad

sections:

- id: ckad-section-01
  title: "Domain 1: Application Design and Build (20%)"
  description: Multi-container pods, init containers, jobs, CronJobs
  sort_order: 1
  lessons:
  - id: ckad-d1-l01
    title: "Bài 1: Multi-container Pods & Init Containers"
    slug: 01-multi-container-pods
    description: >-
      Sidecar pattern, Ambassador, Adapter patterns.
      Init containers: sequencing, use cases.
      Shared volumes giữa containers. Container ports.
      Ephemeral containers cho debugging.
    duration_minutes: 60
    is_free: true
    sort_order: 1
    video_url: null
  - id: ckad-d1-l02
    title: "Bài 2: Jobs, CronJobs & Resource Management"
    slug: 02-jobs-cronjobs-resources
    description: >-
      Job completions, parallelism, backoffLimit.
      CronJob schedule syntax, concurrencyPolicy.
      Resource requests vs limits. QoS classes: Guaranteed, Burstable, BestEffort.
      LimitRange, ResourceQuota.
    duration_minutes: 55
    is_free: true
    sort_order: 2
    video_url: null

- id: ckad-section-02
  title: "Domain 2: Application Deployment (20%)"
  description: Rolling updates, rollbacks, Helm, Kustomize, deployment strategies
  sort_order: 2
  lessons:
  - id: ckad-d2-l01
    title: "Bài 3: Rolling Updates, Rollbacks & Deployment Strategies"
    slug: 03-rolling-updates-rollbacks
    description: >-
      RollingUpdate vs Recreate strategy. maxUnavailable, maxSurge.
      kubectl rollout history/undo/status. Blue-Green deployment.
      Canary deployment với labels. Pause/resume rollouts.
    duration_minutes: 60
    is_free: true
    sort_order: 3
    video_url: null
  - id: ckad-d2-l02
    title: "Bài 4: Helm & Kustomize Basics"
    slug: 04-helm-kustomize
    description: >-
      Helm chart structure: Chart.yaml, values.yaml, templates/.
      helm install/upgrade/rollback. Helm hooks.
      Kustomize: base + overlays, patches, namePrefix.
      kubectl apply -k vs helm install.
    duration_minutes: 55
    is_free: true
    sort_order: 4
    video_url: null

- id: ckad-section-03
  title: "Domain 3: Application Observability and Maintenance (15%)"
  description: Probes, logging, monitoring, debugging
  sort_order: 3
  lessons:
  - id: ckad-d3-l01
    title: "Bài 5: Probes, Logging & Debugging"
    slug: 05-probes-logging-debugging
    description: >-
      Liveness, Readiness, Startup probes: httpGet, exec, tcpSocket.
      probe timing: initialDelaySeconds, periodSeconds, failureThreshold.
      kubectl logs, stern. kubectl exec. Debugging crashed containers.
      kubectl top (metrics-server). Events và conditions.
    duration_minutes: 60
    is_free: true
    sort_order: 5
    video_url: null

- id: ckad-section-04
  title: "Domain 4: Application Environment, Configuration & Security (25%)"
  description: ConfigMaps, Secrets, SecurityContext, ServiceAccounts, RBAC
  sort_order: 4
  lessons:
  - id: ckad-d4-l01
    title: "Bài 6: ConfigMaps & Secrets"
    slug: 06-configmaps-secrets
    description: >-
      ConfigMap: từ literal, file, env. Inject qua env / envFrom / volume.
      Secret types: Opaque, TLS, dockerconfigjson. Base64 encoding.
      Secrets as volumes vs env vars. External Secrets overview.
    duration_minutes: 55
    is_free: true
    sort_order: 6
    video_url: null
  - id: ckad-d4-l02
    title: "Bài 7: SecurityContext & Pod Security"
    slug: 07-securitycontext-pod-security
    description: >-
      runAsUser, runAsGroup, fsGroup. readOnlyRootFilesystem.
      capabilities: add/drop. allowPrivilegeEscalation.
      Pod Security Standards: Privileged, Baseline, Restricted.
      ServiceAccount: automountServiceAccountToken, projected volumes.
    duration_minutes: 60
    is_free: true
    sort_order: 7
    video_url: null
  - id: ckad-d4-l03
    title: "Bài 8: Resource Requests, Limits & QoS"
    slug: 08-resources-qos
    description: >-
      CPU (millicores) vs Memory (MiB/GiB) units. requests vs limits.
      OOMKilled và CPU throttling. QoS classes chi tiết.
      LimitRange per container/pod. ResourceQuota per namespace.
      Horizontal Pod Autoscaler (HPA) basics.
    duration_minutes: 55
    is_free: true
    sort_order: 8
    video_url: null

- id: ckad-section-05
  title: "Domain 5: Services & Networking (20%)"
  description: Services, Ingress, Network Policies
  sort_order: 5
  lessons:
  - id: ckad-d5-l01
    title: "Bài 9: Services & Ingress"
    slug: 09-services-ingress
    description: >-
      ClusterIP, NodePort, LoadBalancer, ExternalName. Headless service.
      port vs targetPort vs nodePort. Ingress rules, path types.
      TLS termination. Ingress class. Service vs Ingress use cases.
    duration_minutes: 60
    is_free: true
    sort_order: 9
    video_url: null
  - id: ckad-d5-l02
    title: "Bài 10: Network Policies & CKAD Exam Strategy"
    slug: 10-networkpolicies-exam-strategy
    description: >-
      NetworkPolicy: podSelector, namespaceSelector, ipBlock.
      Ingress vs Egress rules. Default deny patterns.
      CKAD exam tips: imperative kubectl commands, --dry-run=client,
      time management, bookmarking docs, common task templates.
    duration_minutes: 60
    is_free: true
    sort_order: 10
    video_url: null
