---
id: ckad-d2-l04
title: '第4課: Helm 與 Kustomize'
slug: 04-helm-kustomize
description: >-
  Helm 架構與核心概念: chart、release、values。常用 helm 指令。Kustomize 的
  base/overlay 結構。Helm vs Kustomize 比較與使用場景。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 4
section_title: "領域2: Application Deployment (20%)"
course:
  id: lt-ckad-series-001
  title: 'CKAD 認證備考 — Certified Kubernetes Application Developer'
  slug: luyen-thi-ckad
---

<img src="/storage/uploads/2026/04/k8s-cert-ckad-bai4-helm-kustomize.webp" alt="Helm 與 Kustomize — 套件管理與組態客製化" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="helm">1. Helm — Kubernetes 的套件管理工具</h2>

<pre><code class="language-text">Helm 架構:
┌──────────────────────────────────────────────────┐
│  Chart Repository (如 ArtifactHub)               │
│  ┌──────────────┐  ┌──────────────┐              │
│  │ nginx-chart  │  │ postgres-chart│  ...         │
│  └──────┬───────┘  └──────────────┘              │
│         │ helm install                            │
│         ▼                                         │
│  ┌──────────────────────────────────────┐        │
│  │  Release（已安裝的 chart 實例）       │        │
│  │  templates/ + values.yaml → K8s YAML │        │
│  └──────────────────────────────────────┘        │
└──────────────────────────────────────────────────┘</code></pre>

<table>
<thead><tr><th>術語</th><th>說明</th></tr></thead>
<tbody>
<tr><td><strong>Chart</strong></td><td>Helm 套件（template + values + metadata）</td></tr>
<tr><td><strong>Release</strong></td><td>chart 的已安裝實例（可多次安裝同一 chart）</td></tr>
<tr><td><strong>Repository</strong></td><td>儲存 chart 的倉庫（如 ArtifactHub）</td></tr>
<tr><td><strong>Values</strong></td><td>自訂參數（覆蓋 chart 預設值）</td></tr>
<tr><td><strong>Template</strong></td><td>帶有 Go template 語法的 K8s manifest 模板</td></tr>
</tbody>
</table>

<h2 id="helm-commands">2. 常用 Helm 指令</h2>

<pre><code class="language-text"># 搜尋與新增 Repository
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm search repo nginx
helm search hub wordpress     # 搜尋 ArtifactHub

# 安裝
helm install my-release bitnami/nginx
helm install my-release bitnami/nginx -f custom-values.yaml
helm install my-release bitnami/nginx --set replicaCount=3

# 查看
helm list                     # 列出所有 releases
helm status my-release        # 查看 release 狀態
helm get values my-release    # 查看實際使用的 values
helm get manifest my-release  # 查看產生的 K8s YAML

# 升級與回滾
helm upgrade my-release bitnami/nginx --set replicaCount=5
helm rollback my-release 1    # 回滾到 revision 1
helm history my-release       # 查看修訂歷史

# 移除
helm uninstall my-release</code></pre>

<blockquote><p><strong>考試重點:</strong> CKAD 考試中 Helm 題目通常包含：安裝 chart、設定自訂 values（<code>--set</code> 或 <code>-f</code>）、升級 release、回滾到特定版本。考試環境可參考 helm.sh/docs。記住 <code>helm install</code> 的語法是 <code>helm install RELEASE_NAME CHART</code>。</p></blockquote>

<h2 id="kustomize">3. Kustomize</h2>

<pre><code class="language-text">Kustomize 使用 overlay 方式，無需模板語法即可客製化 K8s YAML。

目錄結構:
base/
├── kustomization.yaml
├── deployment.yaml
└── service.yaml

overlays/
├── dev/
│   ├── kustomization.yaml    # 參照 base，套用 dev 修改
│   └── replica-patch.yaml
└── prod/
    ├── kustomization.yaml    # 參照 base，套用 prod 修改
    └── replica-patch.yaml</code></pre>

<pre><code class="language-text"># base/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- deployment.yaml
- service.yaml

# overlays/dev/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- ../../base
namePrefix: dev-
commonLabels:
  environment: dev
patches:
- path: replica-patch.yaml

# overlays/dev/replica-patch.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 1</code></pre>

<pre><code class="language-text"># 預覽產生的 YAML
kubectl kustomize overlays/dev/

# 套用
kubectl apply -k overlays/dev/

# 或直接套用目錄
kubectl apply -k base/</code></pre>

<h2 id="comparison">4. Helm vs Kustomize 比較</h2>

<table>
<thead><tr><th>面向</th><th>Helm</th><th>Kustomize</th></tr></thead>
<tbody>
<tr><td>方法</td><td>模板化（Go templates）</td><td>Overlay / Patch（純 YAML）</td></tr>
<tr><td>學習曲線</td><td>中等（需學模板語法）</td><td>低（純 YAML）</td></tr>
<tr><td>打包分發</td><td>支援（chart repository）</td><td>不支援（依賴 Git）</td></tr>
<tr><td>版本管理</td><td>Release 版本歷史</td><td>依賴 Git 版本控制</td></tr>
<tr><td>kubectl 整合</td><td>需要 helm CLI</td><td>內建（<code>kubectl -k</code>）</td></tr>
<tr><td>適用場景</td><td>複雜套件、多環境部署</td><td>簡單覆蓋、無需額外工具</td></tr>
</tbody>
</table>

<h2 id="cheatsheet">5. 速查表</h2>

<table>
<thead><tr><th>任務</th><th>指令</th></tr></thead>
<tbody>
<tr><td>安裝 chart</td><td><code>helm install name repo/chart</code></td></tr>
<tr><td>自訂 values 安裝</td><td><code>helm install name repo/chart --set k=v</code></td></tr>
<tr><td>升級 release</td><td><code>helm upgrade name repo/chart</code></td></tr>
<tr><td>回滾到版本 N</td><td><code>helm rollback name N</code></td></tr>
<tr><td>查看所有 releases</td><td><code>helm list -A</code>（所有 namespace）</td></tr>
<tr><td>Kustomize 預覽</td><td><code>kubectl kustomize dir/</code></td></tr>
<tr><td>Kustomize 套用</td><td><code>kubectl apply -k dir/</code></td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習題</h2>

<p><strong>Q1:</strong> 您需要安裝 bitnami/nginx chart 作為名為 "web" 的 release，並設定 replicaCount 為 3。正確的指令是什麼？</p>
<ul>
<li>A) <code>helm install bitnami/nginx --name web --set replicaCount=3</code></li>
<li>B) <code>helm install web bitnami/nginx --set replicaCount=3</code> ✓</li>
<li>C) <code>helm create web bitnami/nginx --values replicaCount=3</code></li>
<li>D) <code>helm deploy web --chart bitnami/nginx --set replicaCount=3</code></li>
</ul>
<p><em>解析: Helm 3 的語法是 <code>helm install RELEASE_NAME CHART [flags]</code>。--name 是 Helm 2 的語法（已棄用）。--set 用於設定單一 value；多個 values 可用 -f values.yaml。</em></p>

<p><strong>Q2:</strong> 下列哪個指令可以預覽 Kustomize 產生的 YAML 而不實際套用？</p>
<ul>
<li>A) <code>kubectl apply -k overlays/dev/ --dry-run</code></li>
<li>B) <code>kubectl kustomize overlays/dev/</code> ✓</li>
<li>C) <code>kustomize build overlays/dev/ | kubectl apply -f -</code></li>
<li>D) <code>kubectl diff -k overlays/dev/</code></li>
</ul>
<p><em>解析: <code>kubectl kustomize</code> 僅渲染最終的 YAML 輸出到 stdout，不會套用任何變更到叢集。這是預覽和檢查的最佳方式。kubectl diff -k 也能比較差異但需要叢集存取。</em></p>

<p><strong>Q3:</strong> 您安裝了一個 Helm release，但發現設定有誤。您想回滾到 revision 2。正確的指令是什麼？</p>
<ul>
<li>A) <code>helm undo my-release --to-revision=2</code></li>
<li>B) <code>helm rollback my-release 2</code> ✓</li>
<li>C) <code>helm downgrade my-release --revision 2</code></li>
<li>D) <code>helm restore my-release 2</code></li>
</ul>
<p><em>解析: <code>helm rollback RELEASE_NAME REVISION</code> 是回滾到特定版本的正確語法。先用 <code>helm history my-release</code> 查看可用的修訂版本。回滾本身也會建立新的修訂版本。</em></p>
