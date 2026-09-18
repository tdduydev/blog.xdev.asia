---
id: ckad-d5-l09
title: 'レッスン9: Services & Ingress'
slug: 09-services-ingress
description: >-
  Serviceタイプ: ClusterIP、NodePort、LoadBalancer、ExternalName。kubectl expose。
  Ingressリソース、IngressClass、TLS終端とパスベースルーティング。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 9
section_title: "ドメイン5: Services and Networking (20%)"
course:
  id: lt-ckad-series-001
  title: 'CKAD試験対策 — Certified Kubernetes Application Developer'
  slug: luyen-thi-ckad
---

<img src="/storage/uploads/2026/04/k8s-cert-ckad-bai9-services-ingress.webp" alt="ServiceタイプとIngressルーティング — ClusterIP、NodePort、LoadBalancer" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="service-types">1. Serviceタイプ</h2>

<table>
<thead><tr><th>タイプ</th><th>アクセス</th><th>使用場面</th></tr></thead>
<tbody>
<tr><td><strong>ClusterIP</strong></td><td>クラスター内部のみ（クラスターDNS）</td><td>Service間通信（デフォルト）</td></tr>
<tr><td><strong>NodePort</strong></td><td>NodeIP:30000-32767</td><td>開発/テスト環境の外部アクセス</td></tr>
<tr><td><strong>LoadBalancer</strong></td><td>クラウドLBの外部IP</td><td>本番環境の外部アクセス（クラウド）</td></tr>
<tr><td><strong>ExternalName</strong></td><td>CNAME DNSエイリアス</td><td>外部DNSの名前にルーティング</td></tr>
</tbody>
</table>

<pre><code class="language-text">ClusterIP（デフォルト）:
apiVersion: v1
kind: Service
metadata:
  name: myapp-svc
spec:
  type: ClusterIP     # 省略可能 — デフォルト
  selector:
    app: myapp
  ports:
  - port: 80          # Serviceポート（クライアントが接続するポート）
    targetPort: 8080  # コンテナポート（アプリがリッスンするポート）

NodePort:
spec:
  type: NodePort
  ports:
  - port: 80
    targetPort: 8080
    nodePort: 30080   # オプション: 30000-32767の範囲（省略時は自動割り当て）</code></pre>

<h2 id="kubectl-expose">2. kubectl expose</h2>

<pre><code class="language-text"># DeploymentをClusterIPとして公開（デフォルト）
kubectl expose deployment myapp --port=80 --target-port=8080

# NodePortとして公開
kubectl expose deployment myapp --port=80 --target-port=8080 --type=NodePort

# Podを公開
kubectl expose pod mypod --port=80 --name=mypod-svc

# PodとServiceを素早く作成
kubectl run nginx --image=nginx --port=80 --expose
# PodとClusterIP Serviceの両方が作成される</code></pre>

<blockquote><p><strong>試験のポイント:</strong> <code>kubectl expose</code>にはPodラベルに一致するselectorが必要です。Deploymentが<code>app: myapp</code>を使用している場合、Serviceのselectorは<code>app: myapp</code>でなければなりません。<code>kubectl run</code>の<code>--expose</code>フラグはPodとServiceの両方を同時に作成します — 試験では非常に高速です。</p></blockquote>

<h2 id="ingress">3. Ingress</h2>

<p>IngressはL7 HTTP/HTTPSルーティングを提供します — ホスト/パスに基づいて複数のServiceにルーティングする単一のエントリポイントです。</p>

<pre><code class="language-text">                     ┌─────────────────────────────────┐
Internet ──────────►│   Ingress Controller (nginx)     │
                     │                                  │
                     │  /api  ──────────► api-service   │
                     │  /web  ──────────► web-service   │
                     │  blog.example.com → blog-service │
                     └─────────────────────────────────┘</code></pre>

<pre><code class="language-text">apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx       # 使用するIngressClass
  tls:
  - hosts:
    - myapp.example.com
    secretName: myapp-tls       # TLS証明書をSecretとして格納
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /api
        pathType: Prefix        # PrefixまたはExact
        backend:
          service:
            name: api-service
            port:
              number: 80
      - path: /web
        pathType: Prefix
        backend:
          service:
            name: web-service
            port:
              number: 80</code></pre>

<table>
<thead><tr><th>pathType</th><th>動作</th><th>例</th></tr></thead>
<tbody>
<tr><td><strong>Exact</strong></td><td>パスを完全一致で照合</td><td><code>/api</code>は<code>/api</code>のみ一致</td></tr>
<tr><td><strong>Prefix</strong></td><td>パスのプレフィックスで照合</td><td><code>/api</code>は<code>/api</code>、<code>/api/v1</code>、<code>/api/users</code>に一致</td></tr>
<tr><td><strong>ImplementationSpecific</strong></td><td>IngressClassに依存</td><td>コントローラーに依存</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のポイント:</strong> Ingressが機能するには<strong>Ingress Controller</strong>（nginx、traefikなど）が必要です — Ingressリソースは設定にすぎません。IngressClassはどのコントローラーがリクエストを処理するかを指定します。試験では通常IngressClassは事前設定されています。<code>kubectl get ingressclass</code>で名前を確認しましょう。</p></blockquote>

<h2 id="debug-service">4. Service接続のデバッグ</h2>

<pre><code class="language-text"># Serviceの存在とEndpointsを確認
kubectl get services
kubectl get endpoints myapp-svc

# クラスター内部から接続をテスト（一時的なPodを作成）
kubectl run test --image=busybox --rm -it -- wget -qO- http://myapp-svc
kubectl run test --image=curlimages/curl --rm -it -- curl http://myapp-svc:80

# SelectorがPodに一致するか確認
kubectl get pods -l app=myapp  # Serviceのselectorと一致するか
kubectl describe service myapp-svc  # Endpointsセクションを確認

# Endpointsが空の場合: selectorの不一致!
# 確認: kubectl get pods --show-labels</code></pre>

<h2 id="cheatsheet">5. チートシート</h2>

<table>
<thead><tr><th>タスク</th><th>コマンド</th></tr></thead>
<tbody>
<tr><td>Deploymentを公開</td><td><code>kubectl expose deploy/app --port=80 --type=NodePort</code></td></tr>
<tr><td>Pod + Serviceを作成</td><td><code>kubectl run nginx --image=nginx --port=80 --expose</code></td></tr>
<tr><td>ServiceのEndpointsを確認</td><td><code>kubectl get endpoints svc-name</code></td></tr>
<tr><td>クラスター内部からServiceをテスト</td><td><code>kubectl run tmp --image=busybox --rm -it -- wget -O- http://svc</code></td></tr>
<tr><td>TLS付きIngress</td><td>tls: secretName + rulesのhosts</td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習問題</h2>

<p><strong>Q1:</strong> "webapp"というDeployment（selector: app=webapp、ポート8080）があります。クラスター内でポート80でアクセスできるServiceを作成するコマンドはどれですか？</p>
<ul>
<li>A) <code>kubectl expose deployment webapp --port=8080</code></li>
<li>B) <code>kubectl expose deployment webapp --port=80 --target-port=8080</code> ✓</li>
<li>C) <code>kubectl create service clusterip webapp --port=8080:80</code></li>
<li>D) <code>kubectl expose deployment webapp --type=ClusterIP --port=80</code></li>
</ul>
<p><em>解説: --port=80はServiceポート（クライアントが使用）、--target-port=8080はコンテナポート（アプリがリッスン）です。--target-portを指定しない場合、Kubernetesはtarget-portがportと同じと仮定します。選択肢Dは機能しますが、両方のポートが80になります。</em></p>

<p><strong>Q2:</strong> Ingressリソースが存在しますが、トラフィックがバックエンドServiceに到達しません。kubectl get endpointsは正しいPod IPを表示しています。最も可能性の高い原因は何ですか？</p>
<ul>
<li>A) ServiceタイプをClusterIPではなくLoadBalancerにすべき</li>
<li>B) Ingress Controllerがインストールされていないか、ingressClassNameが間違っている ✓</li>
<li>C) IngressにTLSの設定が必要</li>
<li>D) pathTypeをPrefixではなくExactにすべき</li>
</ul>
<p><em>解説: Ingressリソースは単なる設定オブジェクトです。Ingress Controllerがなければ、ルールを処理するものがありません。ingressClassNameが実行中のコントローラーに接続されたIngressClassと一致しない場合、Ingressは事実上無視されます。kubectl get ingressclassとコントローラーPodの実行状態を確認しましょう。</em></p>

<p><strong>Q3:</strong> 各クラスターノードの30000-32767の範囲のポートを使って外部アクセスを提供するServiceタイプはどれですか？</p>
<ul>
<li>A) ClusterIP</li>
<li>B) ExternalName</li>
<li>C) NodePort ✓</li>
<li>D) LoadBalancer</li>
</ul>
<p><em>解説: NodePortはクラスター内の全ノードで30000-32767の範囲のポートを開きます。外部トラフィックはNodeIP:NodePortでServiceに到達できます。通常は開発/テスト用です。LoadBalancerは安定した外部IPを持つクラウドロードバランサーを提供し、本番環境向けです。</em></p>
