---
id: kcna-d4-l09
title: '第9課：Helm、GitOps 與 CI/CD'
slug: 09-helm-gitops-cicd
description: >-
  Helm 套件管理器、GitOps 與 Argo CD、Kubernetes CI/CD 管線。
  部署策略：Rolling Update、Canary、Blue-Green。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 9
section_title: "Domain 4: Cloud Native Observability & Security (16%)"
course:
  id: lt-kcna-series-001
  title: 'KCNA 認證備考 — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai9-helm-gitops.webp" alt="GitOps 工作流程與 Helm 和 Argo CD" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="helm">1. Helm — Kubernetes 套件管理器</h2>

<p><strong>Helm</strong> 是 Kubernetes 的套件管理器。Chart 是可重複使用和參數化的 YAML 模板。</p>

<pre><code class="language-text">Helm Concepts:
  Chart     = Package (templates + default values)
  Release   = Installed instance of a chart in a cluster
  Repository = Collection of charts (ArtifactHub.io)
  Values    = Parameters to customize a chart

$ helm install my-nginx bitnami/nginx --set service.type=LoadBalancer
  └── Release: my-nginx
      ├── templates/deployment.yaml
      ├── templates/service.yaml
      └── values.yaml (overridden)</code></pre>

<table>
<thead><tr><th>Helm 命令</th><th>功能</th></tr></thead>
<tbody>
<tr><td><code>helm install</code></td><td>部署新 Chart（建立 Release）</td></tr>
<tr><td><code>helm upgrade</code></td><td>使用新 Chart/Values 更新 Release</td></tr>
<tr><td><code>helm rollback</code></td><td>回復到之前的版本</td></tr>
<tr><td><code>helm list</code></td><td>列出所有 Release</td></tr>
<tr><td><code>helm uninstall</code></td><td>刪除 Release</td></tr>
<tr><td><code>helm template</code></td><td>渲染模板而不部署</td></tr>
</tbody>
</table>

<blockquote><p><strong>考試重點：</strong> Helm 將 Release 歷史記錄儲存在 Kubernetes Secrets 中（不是 ConfigMap）。這使 <code>helm rollback</code> 能夠運作。歷史記錄預設保留 10 個版本。</p></blockquote>

<h2 id="gitops">2. GitOps</h2>

<p><strong>GitOps</strong> 是以 Git 作為程式碼和基礎設施組態的<strong>唯一事實來源</strong>的運營框架。</p>

<pre><code class="language-text">GitOps Flow:
  Developer ──push──► Git Repo (desired state)
                          │
                    GitOps Operator (Argo CD / Flux)
                    - Watches Git repo
                    - Compares with cluster state
                    - Syncs if diff found
                          │
                       K8s Cluster (actual state)</code></pre>

<table>
<thead><tr><th>GitOps 原則</th><th>含義</th></tr></thead>
<tbody>
<tr><td><strong>宣告式</strong></td><td>系統狀態以 YAML 描述在 Git 中</td></tr>
<tr><td><strong>版本化且不可變</strong></td><td>Git 歷史記錄 = 稽核軌跡</td></tr>
<tr><td><strong>自動拉取</strong></td><td>Agent 拉取變更，不需要推送存取叢集</td></tr>
<tr><td><strong>持續協調</strong></td><td>漂移偵測——叢集與 Git 不同時自動修正</td></tr>
</tbody>
</table>

<h3 id="argo-cd">Argo CD</h3>

<p><strong>Argo CD</strong> 是最受歡迎的 Kubernetes GitOps 控制器（CNCF Incubating → Graduated 2022）。</p>

<blockquote><p><strong>考試重點：</strong> GitOps 使用 <strong>Pull-based</strong> 部署而非 Push。好處：叢集不需要對外暴露 API，CI 管線不需要 kubeconfig 憑證。</p></blockquote>

<h2 id="cicd">3. Kubernetes CI/CD</h2>

<pre><code class="language-text">CI/CD Pipeline:
  Code Push
      │
  ┌───▼───┐  CI Phase (Build)
  │ Build  │── Unit tests ── Integration tests
  │ Image  │── Security scan (Trivy, Snyk)
  └───┬───┘── Push to Registry (ECR, GCR)
      │
  ┌───▼───┐  CD Phase (Deploy)
  │ Update │── Update Helm values / K8s manifest
  │ Manifest│── Push to GitOps repo
  └───┬───┘── Argo CD picks up and syncs
      │
  ┌───▼────────────────────┐
  │ Kubernetes Cluster     │
  │  Rolling Update        │
  └────────────────────────┘</code></pre>

<h2 id="deployment-strategies">4. 部署策略</h2>

<table>
<thead><tr><th>策略</th><th>運作方式</th><th>停機時間</th><th>回滾</th><th>使用場景</th></tr></thead>
<tbody>
<tr><td><strong>Rolling Update</strong></td><td>逐步替換 Pod（預設）</td><td>無</td><td>kubectl rollout undo</td><td>無狀態應用、漸進式</td></tr>
<tr><td><strong>Recreate</strong></td><td>終止所有 v1，然後部署 v2</td><td>有</td><td>重新部署 v1</td><td>有破壞性變更、簡單</td></tr>
<tr><td><strong>Blue-Green</strong></td><td>同時執行 v1（藍）+ v2（綠），切換流量</td><td>無</td><td>即時切回</td><td>關鍵應用、快速回滾</td></tr>
<tr><td><strong>Canary</strong></td><td>將小比例流量路由到新版本</td><td>無</td><td>重新導向流量</td><td>分階段發布、A/B 測試</td></tr>
</tbody>
</table>

<pre><code class="language-text">Canary in Kubernetes (Ingress weight):
  ┌─────────────────────────────────┐
  │  Ingress (canary annotation)     │
  │  90% ──────► Deployment v1.0    │
  │  10% ──────► Deployment v1.1    │
  └─────────────────────────────────┘
  → Monitor v1.1 errors → promote to 100% or rollback</code></pre>

<h2 id="cheatsheet">5. 速查表</h2>

<table>
<thead><tr><th>考試問題</th><th>答案</th></tr></thead>
<tbody>
<tr><td>Helm 將 Release 歷史儲存在哪裡？</td><td><strong>Kubernetes Secrets</strong></td></tr>
<tr><td>GitOps 的唯一事實來源？</td><td><strong>Git Repository</strong></td></tr>
<tr><td>GitOps 使用 Pull 還是 Push？</td><td><strong>Pull-based</strong>（Agent 拉取）</td></tr>
<tr><td>無停機時間的部署？</td><td><strong>Rolling</strong> 或 <strong>Blue-Green</strong></td></tr>
<tr><td>以 5% 流量測試新版本？</td><td><strong>Canary</strong> 部署</td></tr>
<tr><td>出問題時快速回滾？</td><td><strong>Blue-Green</strong>（即時切換）</td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習題</h2>

<p><strong>Q1:</strong> 團隊希望先將新版應用部署給 10% 的使用者，監控錯誤，然後逐步增加流量。應使用哪種部署策略？</p>
<ul>
<li>A) Recreate</li>
<li>B) Rolling Update</li>
<li>C) Blue-Green</li>
<li>D) Canary ✓</li>
</ul>
<p><em>解析：Canary 部署將一小部分流量路由到新版本，讓團隊用真實流量驗證後再全面推出。如果新版本有錯誤，影響範圍最小化。</em></p>

<p><strong>Q2:</strong> 以下哪項最能描述 GitOps 模型？</p>
<ul>
<li>A) CI/CD 管線在測試通過後直接推送到 Kubernetes</li>
<li>B) Git Repository 是唯一事實來源；控制器持續協調叢集狀態與 Git ✓</li>
<li>C) 開發者從工作站手動執行 kubectl 命令</li>
<li>D) 基礎設施定義在關聯式資料庫中以保持一致性</li>
</ul>
<p><em>解析：GitOps 使用 Pull-based 模型，控制器（Argo CD、Flux）監視 Git Repository 並確保叢集與 Git 中的宣告一致。這提供稽核軌跡、漂移偵測和安全部署。</em></p>

<p><strong>Q3:</strong> Helm 將 Release 歷史儲存在哪裡以啟用回滾功能？</p>
<ul>
<li>A) Helm 的本地檔案系統（~/.helm）</li>
<li>B) 目標 namespace 中的 ConfigMap</li>
<li>C) 目標 namespace 中的 Secret ✓</li>
<li>D) 獨立的 etcd 資料庫</li>
</ul>
<p><em>解析：自 Helm v3 起，Release 中繼資料（歷史、值、Chart 資訊）以 Secret 形式儲存在 Release 的 namespace 中。這使 helm rollback 能讀取先前版本的資料，並允許多個使用者/系統管理同一 Release。</em></p>
