---
id: ckad-d5-l10
title: '第10課: NetworkPolicies 與 CKAD 考試策略'
slug: 10-networkpolicies-exam-strategy
description: >-
  NetworkPolicy 概念與 YAML 語法。AND vs OR 的陷阱。常見 NetworkPolicy 模式。
  CKAD 考試的時間管理、kubectl 快捷指令與最終速查表。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 10
section_title: "領域5: Services and Networking (20%)"
course:
  id: lt-ckad-series-001
  title: 'CKAD 認證備考 — Certified Kubernetes Application Developer'
  slug: luyen-thi-ckad
---

<img src="/storage/uploads/2026/04/k8s-cert-ckad-bai10-networkpolicy.webp" alt="NetworkPolicies 與 CKAD 考試策略 — Default Deny、命名空間隔離" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="networkpolicy">1. NetworkPolicy</h2>

<p>NetworkPolicy 控制 Pod 之間的網路流量。預設情況下，所有 Pod 之間都可以互相通訊。</p>

<pre><code class="language-text">apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-netpol
  namespace: production
spec:
  podSelector:                  # 此規則套用的目標 Pod
    matchLabels:
      app: api

  policyTypes:
  - Ingress                     # 控制入站流量
  - Egress                      # 控制出站流量

  ingress:
  - from:
    - podSelector:              # 允許同 namespace 中標籤為 app=web 的 Pod
        matchLabels:
          app: web
    - namespaceSelector:        # 允許來自標籤為 env=staging 的 namespace
        matchLabels:
          env: staging
    ports:
    - protocol: TCP
      port: 8080

  egress:
  - to:
    - podSelector:
        matchLabels:
          app: database
    ports:
    - protocol: TCP
      port: 5432
  - to:                         # 允許 DNS 查詢
    - namespaceSelector: {}
    ports:
    - protocol: UDP
      port: 53</code></pre>

<h2 id="and-or-trap">2. AND vs OR 的陷阱（重要！）</h2>

<pre><code class="language-text"># OR 邏輯 — from 陣列中有兩個獨立元素（- 開頭）
ingress:
- from:
  - podSelector:          # 規則 1: 符合此 podSelector 的 Pod
      matchLabels:
        app: web
  - namespaceSelector:    # 規則 2: OR 符合此 namespaceSelector 的任何 Pod
      matchLabels:
        env: staging

# AND 邏輯 — 同一個元素中同時包含 podSelector 和 namespaceSelector
ingress:
- from:
  - podSelector:          # 必須同時滿足: Pod 標籤為 app=web
      matchLabels:
        app: web
    namespaceSelector:    # AND Namespace 標籤為 env=staging
      matchLabels:
        env: staging</code></pre>

<blockquote><p><strong>考試重點:</strong> <code>from</code> 陣列中兩個獨立的 <code>-</code> 是 <strong>OR</strong> 關係。同一個 <code>-</code> 中同時包含 podSelector 和 namespaceSelector 是 <strong>AND</strong> 關係。YAML 縮排差異會導致完全不同的行為——這是 CKAD 常考陷阱。</p></blockquote>

<h2 id="common-patterns">3. 常見 NetworkPolicy 模式</h2>

<pre><code class="language-text"># 模式 1: Default Deny All Ingress（先阻擋所有入站流量）
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
spec:
  podSelector: {}           # {} = 選擇該 namespace 所有 Pod
  policyTypes:
  - Ingress                 # 沒有 ingress 規則 = 阻擋所有入站

# 模式 2: Default Deny All Egress
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-egress
spec:
  podSelector: {}
  policyTypes:
  - Egress                  # 沒有 egress 規則 = 阻擋所有出站

# 模式 3: 允許特定流量（在 default-deny 之上疊加）
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-web-to-api
spec:
  podSelector:
    matchLabels:
      app: api
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: web
    ports:
    - port: 8080</code></pre>

<h2 id="exam-info">4. CKAD 考試資訊</h2>

<table>
<thead><tr><th>項目</th><th>詳情</th></tr></thead>
<tbody>
<tr><td>時間</td><td>2 小時</td></tr>
<tr><td>通過分數</td><td>66%</td></tr>
<tr><td>題目數量</td><td>約 15-20 題（實作題）</td></tr>
<tr><td>環境</td><td>瀏覽器內 terminal + 一個文件分頁</td></tr>
<tr><td>可參考文件</td><td>kubernetes.io/docs、helm.sh/docs</td></tr>
</tbody>
</table>

<h2 id="dry-run">5. --dry-run 模式（快速產生 YAML）</h2>

<pre><code class="language-text"># 考試中最省時間的技巧: 用 --dry-run=client -o yaml 產生範本

# Pod
kubectl run mypod --image=nginx --dry-run=client -o yaml > pod.yaml

# Deployment
kubectl create deployment myapp --image=nginx --replicas=3 --dry-run=client -o yaml > deploy.yaml

# Service
kubectl expose deployment myapp --port=80 --target-port=8080 --dry-run=client -o yaml > svc.yaml

# Job
kubectl create job myjob --image=busybox --dry-run=client -o yaml -- echo hello > job.yaml

# CronJob
kubectl create cj mycj --image=busybox --schedule="*/5 * * * *" --dry-run=client -o yaml -- echo hi > cj.yaml

# ConfigMap
kubectl create cm myconfig --from-literal=key=value --dry-run=client -o yaml > cm.yaml

# Secret
kubectl create secret generic mysecret --from-literal=pass=secret --dry-run=client -o yaml > secret.yaml</code></pre>

<h2 id="shortcuts">6. kubectl 快捷指令</h2>

<table>
<thead><tr><th>縮寫</th><th>完整寫法</th><th>範例</th></tr></thead>
<tbody>
<tr><td><code>po</code></td><td>pods</td><td><code>kubectl get po</code></td></tr>
<tr><td><code>deploy</code></td><td>deployments</td><td><code>kubectl get deploy</code></td></tr>
<tr><td><code>svc</code></td><td>services</td><td><code>kubectl get svc</code></td></tr>
<tr><td><code>cm</code></td><td>configmaps</td><td><code>kubectl get cm</code></td></tr>
<tr><td><code>ns</code></td><td>namespaces</td><td><code>kubectl get ns</code></td></tr>
<tr><td><code>sa</code></td><td>serviceaccounts</td><td><code>kubectl get sa</code></td></tr>
<tr><td><code>ing</code></td><td>ingresses</td><td><code>kubectl get ing</code></td></tr>
<tr><td><code>netpol</code></td><td>networkpolicies</td><td><code>kubectl get netpol</code></td></tr>
<tr><td><code>pv</code></td><td>persistentvolumes</td><td><code>kubectl get pv</code></td></tr>
<tr><td><code>pvc</code></td><td>persistentvolumeclaims</td><td><code>kubectl get pvc</code></td></tr>
</tbody>
</table>

<h2 id="final-cheatsheet">7. CKAD 最終速查表</h2>

<table>
<thead><tr><th>領域</th><th>配分</th><th>必備知識</th></tr></thead>
<tbody>
<tr><td><strong>1. App Design & Build</strong></td><td>20%</td><td>Multi-container patterns、Init Containers、Jobs/CronJobs</td></tr>
<tr><td><strong>2. App Deployment</strong></td><td>20%</td><td>Rolling updates、Rollbacks、Helm install/upgrade/rollback、Kustomize</td></tr>
<tr><td><strong>3. App Observability</strong></td><td>15%</td><td>Probes（liveness/readiness/startup）、kubectl logs/exec/debug</td></tr>
<tr><td><strong>4. App Env/Config/Security</strong></td><td>25%</td><td>ConfigMaps、Secrets、SecurityContext、Capabilities、Resources/QoS</td></tr>
<tr><td><strong>5. Services & Networking</strong></td><td>20%</td><td>Services 4 種類型、Ingress 規則、NetworkPolicies（AND vs OR）</td></tr>
</tbody>
</table>

<pre><code class="language-text">考試策略:
1. 先設定環境: alias k=kubectl, export do="--dry-run=client -o yaml"
2. 先做簡單且高分題（30 分鐘 / 題數 × 分數排序）
3. 善用 --dry-run=client -o yaml 產生範本再修改
4. 善用 kubectl explain（如 kubectl explain pod.spec.containers）
5. 時間管理: 每題平均 6-8 分鐘。超過 10 分鐘先標記跳過
6. 核心文件 bookmark: 提前在 kubernetes.io/docs 加入書籤</code></pre>

<h2 id="practice">8. 練習題</h2>

<p><strong>Q1:</strong> 您需要阻擋 "production" namespace 中所有 Pod 的入站流量，然後再為特定 Pod 建立例外規則。第一步應建立什麼 NetworkPolicy？</p>
<ul>
<li>A) 設定 podSelector 為 {} 並加入空的 ingress 規則列表</li>
<li>B) 設定 podSelector 為 {}，policyTypes 為 [Ingress]，不加入 ingress 規則 ✓</li>
<li>C) 設定 podSelector 為 {}，ingress 中 from 設定 podSelector 為 {}</li>
<li>D) 不需要 NetworkPolicy，Kubernetes 預設即為 deny-all</li>
</ul>
<p><em>解析: 建立一個 podSelector 為空（{}）的 NetworkPolicy，將 policyTypes 設定為 [Ingress]，且不加入任何 ingress 規則 → 等同於 default deny all ingress。隨後可在此基礎上疊加允許特定流量的 NetworkPolicy。</em></p>

<p><strong>Q2:</strong> 以下 NetworkPolicy 的 ingress 部分表示什麼意思？</p>
<pre><code class="language-text">ingress:
- from:
  - podSelector:
      matchLabels:
        app: web
    namespaceSelector:
      matchLabels:
        env: prod</code></pre>
<ul>
<li>A) 允許 app=web 的 Pod OR env=prod 的 namespace 中的任何 Pod</li>
<li>B) 允許 env=prod 的 namespace 中 AND 標籤為 app=web 的 Pod ✓</li>
<li>C) 允許所有 namespace 中 app=web 的 Pod</li>
<li>D) 阻擋 app=web 的 Pod 和 env=prod 的 namespace</li>
</ul>
<p><em>解析: podSelector 和 namespaceSelector 在同一個 from 元素（同一個 -）中 = AND 邏輯。必須同時滿足兩個條件：Pod 必須在標籤為 env=prod 的 namespace 中，並且 Pod 必須有 app=web 標籤。</em></p>

<p><strong>Q3:</strong> 考試中需要快速建立一個 nginx Pod 的 YAML 範本。最快的方法是什麼？</p>
<ul>
<li>A) 從 kubernetes.io/docs 複製 Pod YAML 範例</li>
<li>B) <code>kubectl run nginx --image=nginx --dry-run=client -o yaml > pod.yaml</code> ✓</li>
<li>C) 手動從頭編寫完整的 YAML</li>
<li>D) <code>kubectl create pod nginx --image=nginx</code></li>
</ul>
<p><em>解析: --dry-run=client -o yaml 不會實際建立資源，而是產生有效的 YAML 到 stdout。重導向到檔案後可用 vi 編輯修改（如新增 probes、volumes 等）。這是考試中最省時間的技巧。注意: kubectl 沒有 "create pod" 子命令，應使用 "run"。</em></p>
