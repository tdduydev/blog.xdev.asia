---
id: lt-kcna-series-001
title: "KCNA試験対策 — Kubernetes and Cloud Native Associate"
slug: luyen-thi-kcna
description: >-
  KCNA（Kubernetes and Cloud Native Associate）試験の包括的な学習パスです。
  全5ドメインをカバー：Kubernetes基礎（46%）、コンテナオーケストレーション（22%）、
  クラウドネイティブアーキテクチャ（16%）、オブザーバビリティ（8%）、アプリケーションデリバリー（8%）。
  練習問題付きの全9レッスン。

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
  name: 試験対策
  slug: luyen-thi

tags:

- name: Kubernetes
  slug: kubernetes
- name: CNCF
  slug: cncf
- name: Cloud Native
  slug: cloud-native
- name: 資格認定
  slug: chung-chi
- name: DevOps
  slug: devops

quiz_slug: kcna

sections:

- id: kcna-section-01
  title: "ドメイン1：Kubernetes基礎（46%）"
  description: K8sアーキテクチャ、コアオブジェクト、ネットワーキング、ストレージ、RBAC
  sort_order: 1
  lessons:
  - id: kcna-d1-l01
    title: "レッスン1：Kubernetesアーキテクチャとコアコンポーネント"
    slug: 01-kien-truc-kubernetes
    description: >-
      コントロールプレーン vs ワーカーノード。kube-apiserver、etcd、kube-scheduler、
      controller-manager、kubelet、kube-proxy。Kubernetesオブジェクト概要。
    duration_minutes: 55
    is_free: true
    sort_order: 1
    video_url: null
  - id: kcna-d1-l02
    title: "レッスン2：Pod、ワークロード、コントローラー"
    slug: 02-pods-workloads-controllers
    description: >-
      Podライフサイクル。Deployment、ReplicaSet、StatefulSet、DaemonSet、
      Job、CronJob。ラベル、セレクター、アノテーション。
    duration_minutes: 55
    is_free: true
    sort_order: 2
    video_url: null
  - id: kcna-d1-l03
    title: "レッスン3：Service、ネットワーキング、ストレージ"
    slug: 03-services-networking-storage
    description: >-
      ClusterIP、NodePort、LoadBalancer。CoreDNS、Service Discovery。
      PersistentVolume、PVC、StorageClass。ConfigMapとSecret。
    duration_minutes: 55
    is_free: true
    sort_order: 3
    video_url: null
  - id: kcna-d1-l04
    title: "レッスン4：RBACとセキュリティ基礎"
    slug: 04-rbac-security
    description: >-
      Role、ClusterRole、RoleBinding、ClusterRoleBinding。ServiceAccount。
      Pod Security Standards。NetworkPolicy概要。
    duration_minutes: 50
    is_free: true
    sort_order: 4
    video_url: null

- id: kcna-section-02
  title: "ドメイン2：コンテナオーケストレーション（22%）"
  description: コンテナランタイム、OCI、コンテナライフサイクル、オーケストレーションパターン
  sort_order: 2
  lessons:
  - id: kcna-d2-l01
    title: "レッスン5：コンテナランタイムとOCI標準"
    slug: 05-container-runtimes-oci
    description: >-
      Docker vs containerd vs CRI-O。OCI Image Spec、OCI Runtime Spec。
      コンテナライフサイクル。イメージレイヤーとレジストリ。
    duration_minutes: 50
    is_free: true
    sort_order: 5
    video_url: null
  - id: kcna-d2-l02
    title: "レッスン6：コンテナオーケストレーションパターン"
    slug: 06-orchestration-patterns
    description: >-
      スケジューリング、リソース管理、高可用性。
      マルチテナンシー。Namespace分離。リソースクォータ。
      Horizontal Pod Autoscaler、Vertical Pod Autoscaler。
    duration_minutes: 50
    is_free: true
    sort_order: 6
    video_url: null

- id: kcna-section-03
  title: "ドメイン3：クラウドネイティブアーキテクチャ（16%）"
  description: 12-factor app、マイクロサービス、Service Mesh、サーバーレス
  sort_order: 3
  lessons:
  - id: kcna-d3-l01
    title: "レッスン7：クラウドネイティブアーキテクチャとデザインパターン"
    slug: 07-cloud-native-architecture
    description: >-
      12-factor appの方法論。マイクロサービス vs モノリス。
      イミュータブルインフラストラクチャ。Service Mesh（Istio、Linkerd概要）。
      サーバーレスコンピューティング。CNCFランドスケープ。
    duration_minutes: 55
    is_free: true
    sort_order: 7
    video_url: null

- id: kcna-section-04
  title: "ドメイン4&5：オブザーバビリティとアプリケーションデリバリー（16%）"
  description: ロギング、モニタリング、トレーシング、Helm、GitOps、CI/CD
  sort_order: 4
  lessons:
  - id: kcna-d4-l01
    title: "レッスン8：クラウドネイティブオブザーバビリティ"
    slug: 08-observability
    description: >-
      Fluentd/Lokiによるロギング。Prometheus & Grafanaによるメトリクス。
      Jaeger/Zipkinによる分散トレーシング。OpenTelemetry。
      アラートとSLO/SLI/SLA。
    duration_minutes: 50
    is_free: true
    sort_order: 8
    video_url: null
  - id: kcna-d5-l01
    title: "レッスン9：アプリケーションデリバリー — Helm、GitOps、CI/CD"
    slug: 09-helm-gitops-cicd
    description: >-
      Helmチャート、values、テンプレート。ArgoCD & FluxによるGitOps。
      Kubernetes向けCI/CDパイプライン。Kustomize基礎。
      プログレッシブデリバリー（カナリア、ブルーグリーン）。
    duration_minutes: 50
    is_free: true
    sort_order: 9
    video_url: null
