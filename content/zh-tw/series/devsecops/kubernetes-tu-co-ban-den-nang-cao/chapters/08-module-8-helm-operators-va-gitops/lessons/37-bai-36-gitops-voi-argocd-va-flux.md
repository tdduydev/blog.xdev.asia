---
id: 019c9618-0604-7000-8000-c1147ba22e16
title: 第 36 課：使用 ARGOCD 和 FLUX 的 GITOPS
slug: bai-36-gitops-voi-argocd-va-flux
description: >-
  GitOps 原则：Git 是唯一的事实来源。 ArgoCD 3.x 中心輻射型多集群，Flux 2.x 分散式拉動型。使用 GitHub Actions
  + ArgoCD/Flux 的 CI/CD 管道。应用程序模式的应用程序。
duration_minutes: 95
is_free: false
video_url: null
sort_order: 36
section_title: 模組 8：Helm、操作員和 GitOps
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: Kubernetes：從基礎到高級
  slug: kubernetes-tu-co-ban-den-nang-cao
locale: zh-tw
---
<h2>🎯 課程目標</h2><p>了解 GitOps 原理、如何設定 ArgoCD 和 Flux、兩種工具之間的差異、CI/CD 管道與 GitOps 以及 GitOps 工作流程中的秘密管理。</p>

<img src="/storage/uploads/2026/03/k8s-gitops-workflow-2026.webp" alt="GitOps with ArgoCD & Flux - Workflow Diagram" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h2>1.GitOps原則（OpenGitOps）</h2>
<p>GitOps 是一種使用 Git 作為「單一事實來源」的部署和操作應用程式的方法：</p>
<ul>
  <li><strong>聲明式</strong>：所需狀態被描述為 Git 中的程式碼（Kubernetes 清單）</li>
  <li><strong>版本化且不可變</strong>：Git 歷史記錄是完整的審計跟踪</li>
  <li><strong>自動拉動</strong>：GitOps 代理從 Git 提取更改，而不是從 CI/CD 推送</li>
  <li><strong>持續調和</strong>：agent不斷檢查並修正漂移（有人直接在叢集中更改）</li>
</ul>
<p><strong>好處</strong>：安全性（沒有 CI/CD 憑證的叢集）、稽核追蹤、簡單回溯（git revert）、偏差偵測。</p>

<h2>2.ArgoCD 3.x</h2>

<h3>2.1 架構</h3>
<ul>
  <li><strong>API伺服器</strong>：REST/gRPC API、Web UI、CLI</li>
  <li><strong>回購伺服器</strong>：從 Git 複製並渲染 Kubernetes 清單</li>
  <li><strong>應用控制器</strong>：觀察K8s資源，偵測漂移，同步</li>
</ul>

<h3>2.2 安裝ArgoCD</h3>
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

<h3>2.3 應用CRD</h3>
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

<h3>2.4 應用程式模式的應用程式</h3>
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

<h3>2.5 ApplicationSet－動態產生應用程式</h3>
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

<h2>3.通量2.x</h2>

<h3>3.1 通量架構</h3>
<p>Flux 是去中心化的 GitOps－叢集從 Git 自行拉取，沒有中央集線器。</p>
<ul>
  <li><strong>來源控制器</strong>：觀看 Git 儲存庫、Helm 儲存庫、OCI 工件</li>
  <li><strong>客製化控制器</strong>：應用自訂資源</li>
  <li><strong>舵控制器</strong>：透過 CRD 管理 Helm 版本</li>
  <li><strong>通知控制器</strong>：向 Slack、Teams、GitHub 發送警報</li>
  <li><strong>影像自動化控制器</strong>：自動更新Git中的圖片標籤</li>
</ul>

<h3>3.2 安裝助焊劑</h3>
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

<h3>3.3 GitRepository 和自訂</h3>
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

<h3>3.4 頭盔釋放</h3>
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

<h2>4. 使用 GitOps 的 CI/CD 管道</h2>
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

<h2>5.GitOps 中的秘密</h2>
<p>不要將明文機密提交給 Git。解決方案：</p>
<ul>
  <li><strong>密封的秘密</strong>：使用公鑰加密，只有叢集內的控制器才能解密</li>
  <li><strong>特種作業程序</strong>：Mozilla SOPS + KMS（AWS KMS、GCP KMS、Azure Key Vault）</li>
  <li><strong>外部秘密運營商</strong>：從外部秘密儲存同步（建議）</li>
</ul>
<pre><code class="language-bash"># Sealed Secrets
kubeseal &lt; my-secret.yaml &gt; my-sealed-secret.yaml
# my-sealed-secret.yaml an toàn để commit lên Git

# SOPS với AWS KMS
sops --encrypt --kms arn:aws:kms:us-east-1:123456789012:key/xxx secret.yaml &gt; secret.enc.yaml
# Commit secret.enc.yaml

# Flux tự động decrypt với SOPS khi apply
</code></pre>

<h2>6.ArgoCD 與 Flux</h2>
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

<h2>總結</h2>
<ul>
  <li>GitOps：Git = 單一事實來源、基於拉動、偏差偵測</li>
  <li>ArgoCD：集中式、優秀的 UI、中心輻射型多集群</li>
  <li>Flux：去中心化、叢集從 Git 拉取、內建影像自動化</li>
  <li>應用程式中的應用程式 (ArgoCD)：使用 1 個根應用程式管理多個應用程式</li>
  <li>秘密：不要提交明文，使用密封秘密、SOPS 或 ESO</li>
</ul>
