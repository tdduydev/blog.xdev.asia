---
id: cka-d2-l04
title: 'レッスン4: Deployments、DaemonSets & StatefulSets'
slug: 04-deployments-daemonsets-statefulsets
description: >-
  Deployment戦略（RollingUpdate/Recreate）。DaemonSetのユースケース。
  StatefulSetと安定したネットワークID。CKA試験でのワークロード管理。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 4
section_title: "ドメイン2: Workloads & Scheduling (15%)"
course:
  id: lt-cka-series-001
  title: 'CKA認定試験対策 — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai4-workloads.webp" alt="Deployment、DaemonSet、StatefulSetの比較" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="deployment">1. Deploymentの詳細</h2>

<pre><code class="language-text">apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1         # ローリング中に追加できるPod数
      maxUnavailable: 0   # ローリング中に利用不可になれるPod数
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
<thead><tr><th>戦略</th><th>動作</th><th>ダウンタイム</th></tr></thead>
<tbody>
<tr><td><strong>RollingUpdate</strong></td><td>新旧Podを段階的に入れ替え</td><td>なし（ゼロダウンタイム）</td></tr>
<tr><td><strong>Recreate</strong></td><td>全Pod停止 → 新Pod起動</td><td>あり（デプロイメント間にダウンタイム）</td></tr>
</tbody>
</table>

<pre><code class="language-text"># ロールバック
kubectl rollout undo deployment/web-app
kubectl rollout undo deployment/web-app --to-revision=2

# ロールアウト履歴
kubectl rollout history deployment/web-app
kubectl rollout status deployment/web-app</code></pre>

<h2 id="daemonset">2. DaemonSet</h2>

<p><strong>DaemonSet</strong>は各ノードに1つのPodを配置することを保証します。</p>

<table>
<thead><tr><th>ユースケース</th><th>例</th></tr></thead>
<tbody>
<tr><td>ログ収集</td><td>fluentd、filebeat</td></tr>
<tr><td>監視エージェント</td><td>Prometheus node exporter、Datadog</td></tr>
<tr><td>ネットワーキング</td><td>kube-proxy、Calico、Cilium</td></tr>
<tr><td>ストレージ</td><td>CSI node driver</td></tr>
</tbody>
</table>

<pre><code class="language-text"># DaemonSetの作成（直接コマンドなし — YAMLが必要）
# ヒント: Deploymentから変換
kubectl create deployment ds-template --image=fluentd --dry-run=client -o yaml > ds.yaml
# kind: DaemonSetに変更、replicas削除、strategyを削除</code></pre>

<h2 id="statefulset">3. StatefulSet</h2>

<pre><code class="language-text">StatefulSet vs Deployment:
  - 安定したネットワークID: pod-0, pod-1, pod-2（Deploymentはランダムな接尾辞）
  - 順序付きデプロイ: 0 → 1 → 2の順で起動
  - 安定した永続ストレージ: 各PodにPVCが割り当て
  - Headless Service必須

ユースケース: データベース、分散システム（MySQL、Redis Cluster、Kafka）

apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql
spec:
  serviceName: mysql-headless  # Headless Service名
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

<h2 id="cheatsheet">4. チートシート</h2>

<table>
<thead><tr><th>タスク</th><th>コマンド</th></tr></thead>
<tbody>
<tr><td>Deployment作成</td><td><code>kubectl create deploy NAME --image=IMG --replicas=N</code></td></tr>
<tr><td>イメージ更新</td><td><code>kubectl set image deploy/NAME CONTAINER=IMAGE:TAG</code></td></tr>
<tr><td>ロールバック</td><td><code>kubectl rollout undo deploy/NAME</code></td></tr>
<tr><td>DaemonSet確認</td><td><code>kubectl get daemonset -A</code></td></tr>
<tr><td>StatefulSet確認</td><td><code>kubectl get statefulset</code></td></tr>
</tbody>
</table>

<h2 id="practice">5. 練習問題</h2>

<p><strong>Q1：</strong>Deploymentのstrategy type: Recreateを使用する場合、デプロイメント中に何が起きますか？</p>
<ul>
<li>A) 新旧Podが同時に実行される</li>
<li>B) 全ての旧Podが停止してから新Podが起動する — ダウンタイムが発生 ✓</li>
<li>C) 1つのPodずつ順次更新される</li>
<li>D) トラフィックが自動的に新Podにルーティングされる</li>
</ul>
<p><em>解説：Recreate戦略は全ての旧Podを停止してから新Podを起動します。RollingUpdateではゼロダウンタイムで更新できますが、アプリケーションが旧新バージョンの同時実行をサポートしない場合はRecreateを使用します。</em></p>

<p><strong>Q2：</strong>DaemonSetのPodはどのようにスケジューリングされますか？</p>
<ul>
<li>A) kube-schedulerがノードを選択する</li>
<li>B) DaemonSetコントローラーが各ノードに1つのPodを自動配置する ✓</li>
<li>C) ユーザーが手動でnodeSelectorを設定する必要がある</li>
<li>D) ランダムなノードに配置される</li>
</ul>
<p><em>解説：DaemonSetコントローラーが各ノードに1つのPodを自動配置します。新しいノードが追加されると、自動的にPodが作成されます。tolerationを使用してコントロールプレーンノードにも配置できます。</em></p>

<p><strong>Q3：</strong>StatefulSetでserviceNameフィールドが必要な理由は？</p>
<ul>
<li>A) ロードバランシングのため</li>
<li>B) 各PodにDNSレコード（pod-0.serviceName）を提供するHeadless Serviceが必要なため ✓</li>
<li>C) 自動スケーリングを有効にするため</li>
<li>D) ストレージプロビジョニングのため</li>
</ul>
<p><em>解説：StatefulSetの各Podは安定したDNS名を持ちます（例: mysql-0.mysql-headless.namespace.svc.cluster.local）。これにはHeadless Service（clusterIP: None）が必要です。serviceName はこのHeadless Serviceを参照します。</em></p>
