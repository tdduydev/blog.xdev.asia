---
id: 019c9618-0604-7000-8000-c1147ba22e16
title: 'BÀI 36: GITOPS VỚI ARGOCD VÀ FLUX'
slug: bai-36-gitops-voi-argocd-va-flux
description: >-
  GitOps principles: Git là single source of truth. ArgoCD 3.x hub-and-spoke multi-cluster, Flux 2.x
  decentralized pull-based. CI/CD pipeline với GitHub Actions + ArgoCD/Flux. App of Apps pattern.
duration_minutes: 95
is_free: false
video_url: null
sort_order: 36
section_title: 'Module 8: Helm, Operators & GitOps'
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: 'KUBERNETES: TỪ CƠ BẢN ĐẾN NÂNG CAO'
  slug: kubernetes-tu-co-ban-den-nang-cao
---
<h2>🎯 Mục tiêu bài học</h2><p>Hiểu GitOps principles, cách setup ArgoCD và Flux, sự khác biệt giữa 2 tools, CI/CD pipeline với GitOps, và secrets management trong GitOps workflow.</p>

<img src="/storage/uploads/2026/03/k8s-gitops-workflow-2026.webp" alt="GitOps with ArgoCD & Flux - Workflow Diagram" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h2>1. GitOps Principles (OpenGitOps)</h2>
<p>GitOps là phương pháp deploy và operate applications sử dụng Git làm "single source of truth":</p>
<ul>
  <li><strong>Declarative</strong>: desired state được mô tả dưới dạng code trong Git (Kubernetes manifests)</li>
  <li><strong>Versioned và Immutable</strong>: Git history là audit trail đầy đủ</li>
  <li><strong>Pulled Automatically</strong>: GitOps agent pull changes từ Git, không push từ CI/CD</li>
  <li><strong>Continuously Reconciled</strong>: agent liên tục kiểm tra và sửa drift (ai đó change trực tiếp trong cluster)</li>
</ul>
<p><strong>Lợi ích</strong>: security (cluster không cần credentials của CI/CD), audit trail, rollback đơn giản (git revert), drift detection.</p>

<h2>2. ArgoCD 3.x</h2>

<h3>2.1 Architecture</h3>
<ul>
  <li><strong>API Server</strong>: REST/gRPC API, Web UI, CLI</li>
  <li><strong>Repo Server</strong>: clone và render Kubernetes manifests từ Git</li>
  <li><strong>Application Controller</strong>: watch K8s resources, detect drift, sync</li>
</ul>

<h3>2.2 Cài đặt ArgoCD</h3>
<pre><code class="language-bash">kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Hoặc với Helm
helm repo add argo https://argoproj.github.io/argo-helm
helm install argocd argo/argo-cd -n argocd --create-namespace

# Lấy initial admin password
kubectl -n argocd get secret argocd-initial-admin-secret \
  -o jsonpath="{.data.password}" | base64 -d

# Port-forward UI
kubectl port-forward svc/argocd-server -n argocd 8080:443
# Mở https://localhost:8080
</code></pre>

<h3>2.3 Application CRD</h3>
<pre><code class="language-yaml">apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/myorg/k8s-configs
    targetRevision: main
    path: apps/my-app/overlays/production    # Kustomize overlay
  destination:
    server: https://kubernetes.default.svc  # in-cluster
    namespace: production
  syncPolicy:
    automated:
      prune: true       # xóa resources đã bị xóa khỏi Git
      selfHeal: true    # tự sửa drift
    syncOptions:
    - CreateNamespace=true
    - ServerSideApply=true  # Helm 4 SSA support
  revisionHistoryLimit: 10
</code></pre>

<h3>2.4 App of Apps Pattern</h3>
<pre><code class="language-yaml"># Root application quản lý tất cả applications khác
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: root-app
  namespace: argocd
spec:
  source:
    repoURL: https://github.com/myorg/k8s-configs
    path: apps-of-apps/production   # thư mục chứa Application CRDs khác
    targetRevision: main
  destination:
    server: https://kubernetes.default.svc
    namespace: argocd
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
</code></pre>

<h3>2.5 ApplicationSet — Generate Applications Dynamically</h3>
<pre><code class="language-yaml">apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: cluster-addons
  namespace: argocd
spec:
  generators:
  # Tạo Application cho mỗi cluster
  - clusters: {}
  template:
    metadata:
      name: '{{name}}-addons'
    spec:
      project: addons
      source:
        repoURL: https://github.com/myorg/cluster-addons
        path: 'clusters/{{name}}'
        targetRevision: main
      destination:
        server: '{{server}}'
        namespace: kube-system
      syncPolicy:
        automated: {}
</code></pre>

<h2>3. Flux 2.x</h2>

<h3>3.1 Flux Architecture</h3>
<p>Flux là decentralized GitOps — cluster tự pull từ Git, không có central hub.</p>
<ul>
  <li><strong>Source Controller</strong>: watch Git repos, Helm repos, OCI artifacts</li>
  <li><strong>Kustomize Controller</strong>: apply Kustomize resources</li>
  <li><strong>Helm Controller</strong>: manage Helm releases via CRDs</li>
  <li><strong>Notification Controller</strong>: send alerts to Slack, Teams, GitHub</li>
  <li><strong>Image Automation Controller</strong>: auto-update image tags trong Git</li>
</ul>

<h3>3.2 Cài đặt Flux</h3>
<pre><code class="language-bash"># Cài Flux CLI
curl -s https://fluxcd.io/install.sh | sudo bash

# Bootstrap Flux (tạo resources trong cluster và push configs lên GitHub)
flux bootstrap github \
  --owner=myorg \
  --repository=fleet-infra \
  --branch=main \
  --path=clusters/production \
  --personal   # personal token, hoặc dùng --token-auth
</code></pre>

<h3>3.3 GitRepository và Kustomization</h3>
<pre><code class="language-yaml"># GitRepository: define source
apiVersion: source.toolkit.fluxcd.io/v1
kind: GitRepository
metadata:
  name: my-app
  namespace: flux-system
spec:
  interval: 5m     # check Git mỗi 5 phút
  url: https://github.com/myorg/k8s-configs
  ref:
    branch: main
  secretRef:
    name: github-token
---
# Kustomization: apply từ Git source
apiVersion: kustomize.toolkit.fluxcd.io/v1
kind: Kustomization
metadata:
  name: my-app
  namespace: flux-system
spec:
  interval: 10m
  sourceRef:
    kind: GitRepository
    name: my-app
  path: ./apps/my-app/overlays/production
  prune: true         # xóa resources đã xóa khỏi Git
  healthChecks:
  - apiVersion: apps/v1
    kind: Deployment
    name: my-app
    namespace: production
</code></pre>

<h3>3.4 HelmRelease</h3>
<pre><code class="language-yaml">apiVersion: helm.toolkit.fluxcd.io/v2
kind: HelmRelease
metadata:
  name: my-app
  namespace: production
spec:
  interval: 1h
  chart:
    spec:
      chart: my-app
      version: "0.2.x"    # semver range, auto-update minor/patch
      sourceRef:
        kind: HelmRepository
        name: my-helm-repo
        namespace: flux-system
  values:
    replicaCount: 3
    image:
      tag: "1.2.3"
  upgrade:
    remediation:
      retries: 3   # retry nếu upgrade fail
</code></pre>

<h2>4. CI/CD Pipeline với GitOps</h2>
<pre><code class="language-yaml"># .github/workflows/deploy.yaml
name: Build and Deploy
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4

    - name: Build and push image
      run: |
        docker build -t myregistry.io/myapp:${{ github.sha }} .
        docker push myregistry.io/myapp:${{ github.sha }}

    - name: Update manifests in GitOps repo
      run: |
        git clone https://myorg:${{ secrets.GITOPS_TOKEN }}@github.com/myorg/k8s-configs
        cd k8s-configs
        # Update image tag
        sed -i "s|tag:.*|tag: ${{ github.sha }}|" apps/my-app/values.yaml
        git config user.email "ci@myorg.com"
        git commit -am "Update my-app to ${{ github.sha }}"
        git push
    # ArgoCD/Flux sẽ tự động detect và deploy thay đổi
</code></pre>

<h2>5. Secrets trong GitOps</h2>
<p>Không commit plaintext secrets lên Git. Các giải pháp:</p>
<ul>
  <li><strong>Sealed Secrets</strong>: encrypt với public key, chỉ controller trong cluster có thể decrypt</li>
  <li><strong>SOPS</strong>: Mozilla SOPS + KMS (AWS KMS, GCP KMS, Azure Key Vault)</li>
  <li><strong>External Secrets Operator</strong>: sync từ external secret stores (recommended)</li>
</ul>
<pre><code class="language-bash"># Sealed Secrets
kubeseal &lt; my-secret.yaml &gt; my-sealed-secret.yaml
# my-sealed-secret.yaml an toàn để commit lên Git

# SOPS với AWS KMS
sops --encrypt --kms arn:aws:kms:us-east-1:123456789012:key/xxx secret.yaml &gt; secret.enc.yaml
# Commit secret.enc.yaml

# Flux tự động decrypt với SOPS khi apply
</code></pre>

<h2>6. ArgoCD vs Flux</h2>
<pre><code class="language-bash">Feature           ArgoCD 3.x              Flux 2.x
──────────────────────────────────────────────────────────
Architecture      Centralized hub         Decentralized per-cluster
UI                ✅ Web UI               ❌ CLI only (+ Weave GitOps)
Multi-cluster     ✅ Hub-and-spoke        ✅ Pull-based per cluster
Security model    Cluster connects to hub  Cluster only pulls from Git
RBAC              Fine-grained            Basic
Image automation  Argo Image Updater      ✅ Built-in (Image Automation)
Notifications     ✅ argocd-notifications  ✅ Notification Controller
Community         Large, CNCF Graduated   Active, CNCF Graduated
Best for          Centralized ops team    Distributed teams, security-first
</code></pre>

<h2>Tóm tắt</h2>
<ul>
  <li>GitOps: Git = single source of truth, pull-based, drift detection</li>
  <li>ArgoCD: centralized, excellent UI, hub-and-spoke multi-cluster</li>
  <li>Flux: decentralized, cluster pulls từ Git, image automation built-in</li>
  <li>App of Apps (ArgoCD): quản lý nhiều apps bằng 1 root app</li>
  <li>Secrets: không commit plaintext, dùng Sealed Secrets, SOPS, hoặc ESO</li>
</ul>
