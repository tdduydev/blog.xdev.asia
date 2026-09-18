---
id: cka-d2-l04
title: '第4課：Deployments、DaemonSets & StatefulSets'
slug: 04-deployments-daemonsets-statefulsets
description: >-
  Deployment 策略（RollingUpdate/Recreate）。DaemonSet 使用場景。
  StatefulSet 與穩定的網路身份。CKA 考試中的工作負載管理。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 4
section_title: "領域2: Workloads & Scheduling (15%)"
course:
  id: lt-cka-series-001
  title: 'CKA 認證備考 — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai4-workloads.webp" alt="Deployment、DaemonSet、StatefulSet 比較" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="deployment">1. Deployment 詳解</h2>

<pre><code class="language-text">apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1         # 滾動更新時可額外增加的 Pod 數
      maxUnavailable: 0   # 滾動更新時可不可用的 Pod 數
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: nginx
        image: nginx:1.25
        ports:
        - containerPort: 80</code></pre>

<table>
<thead><tr><th>策略</th><th>行為</th><th>停機時間</th></tr></thead>
<tbody>
<tr><td><strong>RollingUpdate</strong></td><td>新舊 Pod 逐步替換</td><td>無（零停機）</td></tr>
<tr><td><strong>Recreate</strong></td><td>先停止所有 Pod → 再啟動新 Pod</td><td>有（部署間有停機）</td></tr>
</tbody>
</table>

<pre><code class="language-text"># 回滾
kubectl rollout undo deployment/web-app
kubectl rollout undo deployment/web-app --to-revision=2

# 查看部署歷史
kubectl rollout history deployment/web-app
kubectl rollout status deployment/web-app</code></pre>

<h2 id="daemonset">2. DaemonSet</h2>

<p><strong>DaemonSet</strong> 確保每個節點上運行一個 Pod。</p>

<table>
<thead><tr><th>使用場景</th><th>範例</th></tr></thead>
<tbody>
<tr><td>日誌收集</td><td>fluentd、filebeat</td></tr>
<tr><td>監控代理</td><td>Prometheus node exporter、Datadog</td></tr>
<tr><td>網路</td><td>kube-proxy、Calico、Cilium</td></tr>
<tr><td>儲存</td><td>CSI node driver</td></tr>
</tbody>
</table>

<pre><code class="language-text"># 建立 DaemonSet（沒有直接指令 — 需要 YAML）
# 技巧：從 Deployment 轉換
kubectl create deployment ds-template --image=fluentd --dry-run=client -o yaml > ds.yaml
# 修改 kind: DaemonSet，移除 replicas，移除 strategy</code></pre>

<h2 id="statefulset">3. StatefulSet</h2>

<pre><code class="language-text">StatefulSet vs Deployment：
  - 穩定的網路身份：pod-0, pod-1, pod-2（Deployment 使用隨機後綴）
  - 有序部署：按 0 → 1 → 2 順序啟動
  - 穩定的持久化儲存：每個 Pod 各自分配 PVC
  - 需要 Headless Service

使用場景：資料庫、分散式系統（MySQL、Redis Cluster、Kafka）

apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql
spec:
  serviceName: mysql-headless  # Headless Service 名稱
  replicas: 3
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
      - name: mysql
        image: mysql:8.0
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 10Gi</code></pre>

<h2 id="cheatsheet">4. 速查表</h2>

<table>
<thead><tr><th>任務</th><th>指令</th></tr></thead>
<tbody>
<tr><td>建立 Deployment</td><td><code>kubectl create deploy NAME --image=IMG --replicas=N</code></td></tr>
<tr><td>更新映像檔</td><td><code>kubectl set image deploy/NAME CONTAINER=IMAGE:TAG</code></td></tr>
<tr><td>回滾</td><td><code>kubectl rollout undo deploy/NAME</code></td></tr>
<tr><td>檢查 DaemonSet</td><td><code>kubectl get daemonset -A</code></td></tr>
<tr><td>檢查 StatefulSet</td><td><code>kubectl get statefulset</code></td></tr>
</tbody>
</table>

<h2 id="practice">5. 練習題</h2>

<p><strong>Q1：</strong>使用 Deployment strategy type: Recreate 時，部署過程中會發生什麼？</p>
<ul>
<li>A) 新舊 Pod 同時運行</li>
<li>B) 所有舊 Pod 先停止，然後才啟動新 Pod — 會有停機時間 ✓</li>
<li>C) 一次更新一個 Pod</li>
<li>D) 流量自動路由到新 Pod</li>
</ul>
<p><em>解析：Recreate 策略會停止所有舊 Pod 後才啟動新 Pod。RollingUpdate 可以零停機更新，但如果應用程式不支援新舊版本同時運行，則需要使用 Recreate。</em></p>

<p><strong>Q2：</strong>DaemonSet 的 Pod 如何排程？</p>
<ul>
<li>A) kube-scheduler 選擇節點</li>
<li>B) DaemonSet controller 自動在每個節點放置一個 Pod ✓</li>
<li>C) 使用者需要手動設定 nodeSelector</li>
<li>D) 隨機分配到節點</li>
</ul>
<p><em>解析：DaemonSet controller 自動在每個節點放置一個 Pod。當新節點加入時，會自動建立 Pod。可以使用 toleration 來在控制平面節點上也放置 Pod。</em></p>

<p><strong>Q3：</strong>StatefulSet 為什麼需要 serviceName 欄位？</p>
<ul>
<li>A) 用於負載平衡</li>
<li>B) 需要 Headless Service 為每個 Pod 提供 DNS 記錄（pod-0.serviceName） ✓</li>
<li>C) 用於啟用自動擴展</li>
<li>D) 用於儲存佈建</li>
</ul>
<p><em>解析：StatefulSet 的每個 Pod 都有穩定的 DNS 名稱（例：mysql-0.mysql-headless.namespace.svc.cluster.local）。這需要 Headless Service（clusterIP: None）。serviceName 參照這個 Headless Service。</em></p>
