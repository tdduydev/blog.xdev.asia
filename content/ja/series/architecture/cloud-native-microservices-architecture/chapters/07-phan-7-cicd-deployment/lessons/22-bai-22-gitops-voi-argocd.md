---
id: 019d8a22-c322-7a10-b001-a1b2c3d4e522
title: 'レッスン 22: ArgoCD を使用した GitOps'
slug: bai-22-gitops-voi-argocd
description: >-
  GitOps の原則 (信頼できる唯一の情報源としての Git)、ArgoCD アーキテクチャ、アプリケーション
  マニフェスト、同期ポリシー、マルチ環境用のカスタム オーバーレイ、自動ロールバック、マルチクラスター用の ApplicationSet。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 22
section_title: 'パート 7: CI/CD および導入戦略'
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: クラウドネイティブのマイクロサービスアーキテクチャ
  slug: cloud-native-microservices-architecture
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-1402" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-1402)"/>

  <!-- Decorations -->
  <g>
    <circle cx="854" cy="272" r="22" fill="#f472b6" opacity="0.07"/>
    <circle cx="608" cy="266" r="14" fill="#f472b6" opacity="0.09"/>
    <circle cx="862" cy="260" r="36" fill="#f472b6" opacity="0.11"/>
    <circle cx="616" cy="254" r="28" fill="#f472b6" opacity="0.13"/>
    <circle cx="870" cy="248" r="20" fill="#f472b6" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <line x1="600" y1="92" x2="1100" y2="172" stroke="#f472b6" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="122" x2="1050" y2="192" stroke="#f472b6" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1065.38268590218,228.5 1065.38268590218,255.5 1042,269 1018.6173140978201,255.5 1018.6173140978201,228.5 1042,215" fill="none" stroke="#f472b6" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#f472b6"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#f472b6" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f472b6">🏗️ アーキテクチャ — レッスン 22</text>

  <!-- Title -->
  <text x="60" y="160" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 22: ArgoCD を使用した GitOps</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="222" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">クラウドネイティブのマイクロサービスアーキテクチャ</text>

  <!-- Section -->
  <text x="60" y="246" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 7: CI/CD および導入戦略</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![レッスン 22: ArgoCD を使用した GitOps](/storage/uploads/2026/03/cn-bai-22-diagram.webp)

## はじめに

従来の CI/CD では、デプロイ スクリプトが実行されます。 `kubectl apply` クラスターに直接接続します。誰が何を運営しているのですか？クラスターは現在どのような状態にありますか?ロールバックするにはどうすればよいですか?

**GitOps** はこのモデルを逆転させます。**Git はクラスター状態の信頼できる情報源です**。オペレーター (ArgoCD) は、クラスターを Git で宣言された正しい状態に継続的に同期します。

---

## 1. GitOps の原則

### 1.1 基本原則

```
1. DECLARATIVE
   Toàn bộ trạng thái hệ thống được khai báo trong Git
   (YAML manifests, Helm values, Kustomize overlays)

2. VERSIONED & IMMUTABLE
   Git history = audit log đầy đủ của mọi thay đổi
   "Ai thay đổi gì, lúc nào, tại sao" (commit message, PR)

3. PULLED AUTOMATICALLY
   Agent (ArgoCD/Flux) pull từ Git và apply
   Không có CI push thẳng vào cluster (không cần cluster credentials trong CI)

4. CONTINUOUSLY RECONCILED
   Agent liên tục compare desired state (Git) với actual state (cluster)
   Tự động "heal" nếu ai đó thay đổi trực tiếp trên cluster
```

### 1.2 GitOps が「CI での kubectl apply」よりも優れているのはなぜですか?

| |従来の CI プッシュ | GitOps (ArgoCD) |
|--|-----------------|--|
|資格情報 | CI にはクラスターの資格情報が必要です。 ArgoCD のみが必要で、CI は不要 |
|監査証跡 | CI ログ (紛失しやすい) | Git 履歴 (永続) |
|ロールバック |古いバージョンで CI を再実行する | `git revert` → 自動展開 |
|ドリフト検出 |いいえ |自動的に検出して修正します |
|マルチクラスター |複雑な | ApplicationSet がそれを処理します。
|レビュープロセス |アドホック スクリプト |プルリクエストのワークフロー |

---

## 2. ArgoCD アーキテクチャ

```
┌─────────────────────────────────────────────────────────────────┐
│                        ArgoCD                                   │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐ │
│  │  API Server  │  │  Repo Server │  │  Application          │ │
│  │  (REST+gRPC) │  │  (Git clone, │  │  Controller           │ │
│  │  CLI/UI/CD   │  │   render     │  │  (reconcile loop)     │ │
│  └──────┬───────┘  │   manifests) │  └──────────┬────────────┘ │
│         │          └──────────────┘             │              │
│  ┌──────▼─────────────────────────────────────┐ │              │
│  │              Redis Cache                   │ │              │
│  └─────────────────────────────────────────────┘ │              │
└──────────────────────────────────────────────────┼──────────────┘
                                                   │
                                    ┌──────────────▼──────┐
                        Pull │      │    Kubernetes       │
                        from │      │    Cluster          │
                        Git  │      └─────────────────────┘
                             ▼
                    ┌──────────────────┐
                    │  Git Repository  │
                    │  (k8s-manifests) │
                    └──────────────────┘
```

**リポ サーバー**: Git リポジトリのクローンを作成し、マニフェストをレンダリングします (Helm/KusTOMize/プレーン YAML)

**アプリケーション コントローラー**: 望ましい状態 (Git) とライブ状態 (クラスター) を比較し、同期アクションを作成します。

**API サーバー**: UI、CLI、CI/CD Webhook 用の REST API

---

## 3. ArgoCD をインストールする

```bash
kubectl create namespace argocd

kubectl apply -n argocd \
  -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Lấy initial admin password
kubectl -n argocd get secret argocd-initial-admin-secret \
  -o jsonpath="{.data.password}" | base64 -d

# Port-forward UI
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Cài ArgoCD CLI
brew install argocd
argocd login localhost:8080
```

---

## 4. アプリケーションマニフェスト

### 4.1 アプリケーション CRD

```yaml
# order-service-app.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: order-service-prod
  namespace: argocd
  # Đừng xóa khi app bị xóa (cascade protection)
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: backend-services

  source:
    repoURL: https://github.com/myorg/k8s-manifests.git
    targetRevision: main
    # Thư mục trong repo
    path: services/order-service/overlays/production

  destination:
    server: https://kubernetes.default.svc
    namespace: services-prod

  syncPolicy:
    # Tự động sync khi Git thay đổi
    automated:
      prune: true       # Xóa resources không còn trong Git
      selfHeal: true    # Tự fix nếu ai kubectl edit trực tiếp
      allowEmpty: false # Không sync nếu manifest rỗng (safety)

    syncOptions:
      - CreateNamespace=true
      - PrunePropagationPolicy=foreground
      - RespectIgnoreDifferences=true

    # Retry nếu sync fail
    retry:
      limit: 5
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m

  # Bỏ qua một số fields khi so sánh (thường do auto-scaling thay đổi)
  ignoreDifferences:
    - group: apps
      kind: Deployment
      jsonPointers:
        - /spec/replicas   # HPA manage replicas, bỏ qua drift này
```

### 4.2 ArgoCD プロジェクト — 権限管理

```yaml
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: backend-services
  namespace: argocd
spec:
  description: "Backend microservices"

  # Chỉ cho phép source từ các repos này
  sourceRepos:
    - 'https://github.com/myorg/k8s-manifests.git'

  # Chỉ deploy vào namespace này
  destinations:
    - namespace: services-prod
      server: https://kubernetes.default.svc
    - namespace: services-staging
      server: https://kubernetes.default.svc

  # Chỉ allow các resource kinds này
  clusterResourceWhitelist:
    - group: ''
      kind: Namespace

  namespaceResourceWhitelist:
    - group: 'apps'
      kind: Deployment
    - group: ''
      kind: Service
    - group: autoscaling
      kind: HorizontalPodAutoscaler
    # Không cho phép ClusterRole, CRD, etc.

  roles:
    - name: developer
      description: Deploy access for developers
      policies:
        - p, proj:backend-services:developer, applications, sync, backend-services/*, allow
        - p, proj:backend-services:developer, applications, get, backend-services/*, allow
      groups:
        - github:myorg:backend-team
```

---

## 5. カスタマイズ — マルチ環境構成

### 5.1 ディレクトリ構造

```
k8s-manifests/
services/
  order-service/
    base/                          ← Shared manifests
      deployment.yaml
      service.yaml
      hpa.yaml
      kustomization.yaml
    overlays/
      staging/                     ← Staging overrides
        kustomization.yaml
        replica-patch.yaml
        env-patch.yaml
      production/                  ← Production overrides
        kustomization.yaml
        replica-patch.yaml
        env-patch.yaml
        resource-limits-patch.yaml
```

### 5.2 基本マニフェスト

```yaml
# base/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - deployment.yaml
  - service.yaml
  - hpa.yaml

commonLabels:
  app: order-service
  managed-by: argocd
```

```yaml
# base/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
spec:
  replicas: 1     ← Base, override per environment
  template:
    spec:
      containers:
        - name: order-service
          image: registry.example.com/order-service:latest   ← CI sẽ update tag này
          resources:
            requests:
              cpu: "250m"
              memory: "512Mi"
            limits:
              cpu: "500m"
              memory: "1Gi"
```

### 5.3 ステージングオーバーレイ

```yaml
# overlays/staging/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

namePrefix: staging-
namespace: services-staging

bases:
  - ../../base

patches:
  - path: replica-patch.yaml
  - path: env-patch.yaml

images:
  - name: registry.example.com/order-service
    newTag: sha-abc1234   ← CI cập nhật field này
```

```yaml
# overlays/staging/replica-patch.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
spec:
  replicas: 2
```

```yaml
# overlays/staging/env-patch.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
spec:
  template:
    spec:
      containers:
        - name: order-service
          env:
            - name: ENVIRONMENT
              value: staging
            - name: LOG_LEVEL
              value: DEBUG
            - name: DB_HOST
              valueFrom:
                secretKeyRef:
                  name: order-db-staging
                  key: host
```

### 5.4 プロダクションオーバーレイ

```yaml
# overlays/production/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

namespace: services-prod

bases:
  - ../../base

patches:
  - path: replica-patch.yaml
  - path: resource-limits-patch.yaml
  - path: env-patch.yaml

images:
  - name: registry.example.com/order-service
    newTag: 1.2.3   ← Semantic version cho production
```

```yaml
# overlays/production/replica-patch.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
spec:
  replicas: 5   ← Production needs more replicas
```

---

## 6. CI 更新イメージ タグ (GitOps フロー)

```yaml
# Trong CI pipeline (GitHub Actions)
- name: Update image tag in GitOps repo
  run: |
    # Clone manifest repo
    git clone https://x-access-token:${{ secrets.GITOPS_TOKEN }}@github.com/myorg/k8s-manifests.git
    cd k8s-manifests

    # Update image tag cho staging
    cd services/order-service/overlays/staging
    kustomize edit set image registry.example.com/order-service:sha-${{ github.sha }}

    # Commit và push
    git config user.email "ci-bot@example.com"
    git config user.name "CI Bot"
    git add .
    git commit -m "chore(order-service): deploy sha-${{ github.sha }} to staging

    Triggered by: https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }}"
    git push

    # ArgoCD sẽ auto-detect và deploy
```

**本番環境へのプロモート** (手動ステップ):
```yaml
- name: Promote to production (manual approval required)
  environment: production   # GitHub Environment với required reviewers
  run: |
    cd k8s-manifests/services/order-service/overlays/production
    kustomize edit set image registry.example.com/order-service:${{ needs.build.outputs.version }}
    git add . && git commit -m "chore: promote order-service ${{ needs.build.outputs.version }} to prod"
    git push
```

---

## 7. ApplicationSet — マルチクラスター、マルチテナント

```yaml
# Tự động tạo Application cho mỗi cluster/env combination
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: order-service
  namespace: argocd
spec:
  generators:
    - matrix:
        generators:
          - list:
              elements:
                - cluster: staging
                  url: https://staging-cluster:6443
                  namespace: services-staging
                - cluster: prod-us
                  url: https://prod-us-cluster:6443
                  namespace: services-prod
                - cluster: prod-eu
                  url: https://prod-eu-cluster:6443
                  namespace: services-prod
          - list:
              elements:
                - service: order-service
                - service: payment-service
                - service: inventory-service

  template:
    metadata:
      name: '{{service}}-{{cluster}}'
    spec:
      project: backend-services
      source:
        repoURL: https://github.com/myorg/k8s-manifests.git
        targetRevision: main
        path: 'services/{{service}}/overlays/{{cluster}}'
      destination:
        server: '{{url}}'
        namespace: '{{namespace}}'
      syncPolicy:
        automated:
          prune: true
          selfHeal: true
```

---

## 8. ロールバック

GitOps は視覚的なロールバックを行います。

```bash
# Option 1: git revert (recommended — tạo revert commit, không rewrite history)
git revert abc1234 --no-edit
git push
# ArgoCD auto-deploys revert commit

# Option 2: ArgoCD UI — click "History and Rollback" → chọn revision cũ → sync

# Option 3: ArgoCD CLI
argocd app history order-service-prod
argocd app rollback order-service-prod 5  # Rollback về revision 5
```

---

## 概要

|コンセプト |目的 |
|----------|----------|
| GitOps | Git = クラスター状態の信頼できる情報源 |
| ArgoCD アプリケーション | 「アプリ X = Git パス Y のコード、名前空間 Z にデプロイ」を宣言します。
|自動同期 | ArgoCD は、Git が変更されるたびに自動的に同期します。
|セルフヒール |クラスター上の手動による変更を自動的に元に戻す |
|オーバーレイをカスタマイズする |マニフェストを重複せずに環境ごとにカスタマイズする |
|アプリケーションセット |同じアプリを複数のクラスター/環境にデプロイする |
| Git を元に戻す = ロールバック |監査証跡付きの安全なロールバック |

**次の記事**: 導入戦略 — カナリア、ブルー/グリーン、プログレッシブ デリバリー
