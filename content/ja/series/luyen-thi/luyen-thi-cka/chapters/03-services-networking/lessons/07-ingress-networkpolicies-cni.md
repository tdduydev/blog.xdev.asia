---
id: cka-d3-l07
title: 'レッスン7: Ingress、Network Policies & CNI'
slug: 07-ingress-networkpolicies-cni
description: >-
  IngressリソースとIngressコントローラー。トラフィック分離のためのNetwork Policies。
  CNIプラグイン: Flannel、Calico、Cilium。Podネットワーキングのトラブルシュート。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 7
section_title: "ドメイン3: Services & Networking (20%)"
course:
  id: lt-cka-series-001
  title: 'CKA認定試験対策 — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai7-ingress-network.webp" alt="IngressルーティングとNetworkPolicy — L7ルーティングとネットワーク分離" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="ingress">1. Ingress</h2>

<p><strong>Ingress</strong>はクラスタへのHTTP/HTTPSルーティングを提供します。Ingressリソースを処理するには<strong>Ingressコントローラー</strong>（nginx-ingress、Traefik、ALBなど）が必要です。</p>

<pre><code class="language-text">Internet
   │
[Ingress Controller] (nginx Pod, port 80/443)
   │
   ├── /api/* ──────────────► Service: api-svc:8080
   ├── /web/* ──────────────► Service: web-svc:80
   └── shop.example.com ───► Service: shop-svc:3000</code></pre>

<pre><code class="language-text">apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
  - host: api.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: api-svc
            port:
              number: 8080
  tls:
  - hosts:
    - api.example.com
    secretName: tls-secret  # SecretにTLS証明書を保存</code></pre>

<blockquote><p><strong>試験のポイント：</strong><strong>Ingressコントローラー</strong>がないとIngressは機能しません。CKA試験では通常コントローラーが事前にインストールされています。<code>kubectl get ingressclass</code>で<code>spec.ingressClassName</code>に使用するクラス名を確認してください。</p></blockquote>

<h2 id="network-policies">2. Network Policies — CKA詳細</h2>

<pre><code class="language-text">apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-backend
  namespace: app
spec:
  podSelector:
    matchLabels:
      app: backend      # backendのPodに適用
  policyTypes:
  - Ingress             # 受信トラフィックを制御
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend  # frontendのPodからのみ許可
    ports:
    - protocol: TCP
      port: 8080

---
# 全インバウンドトラフィックを拒否（デフォルト拒否）
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all
spec:
  podSelector: {}     # 全てのPodを選択
  policyTypes:
  - Ingress           # ingressルールなし = 全インバウンドをブロック</code></pre>

<table>
<thead><tr><th>セレクタ</th><th>意味</th></tr></thead>
<tbody>
<tr><td><code>podSelector: {}</code></td><td>Namespace内の全Podを選択</td></tr>
<tr><td><code>namespaceSelector</code></td><td>特定のNamespaceからのトラフィックを許可</td></tr>
<tr><td><code>ipBlock</code></td><td>CIDR範囲からのトラフィックを許可</td></tr>
</tbody>
</table>

<h2 id="cni">3. CNIプラグイン</h2>

<table>
<thead><tr><th>CNI</th><th>NetworkPolicy対応</th><th>特徴</th></tr></thead>
<tbody>
<tr><td><strong>Flannel</strong></td><td>非対応</td><td>シンプルなオーバーレイ、VXLAN/host-gw</td></tr>
<tr><td><strong>Calico</strong></td><td>対応</td><td>BGPルーティング、高性能、エンタープライズ</td></tr>
<tr><td><strong>Cilium</strong></td><td>対応（eBPF）</td><td>eBPFベース、L7ポリシー、可観測性</td></tr>
<tr><td><strong>Weave Net</strong></td><td>対応</td><td>シンプル、メッシュネットワーク</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のポイント：</strong>CalicoとCiliumはNetworkPolicyをサポートしていますが、Flannelはサポートしていません。試験で「ネットワークポリシーの設定」が求められた場合、Calico/Ciliumがインストールされている必要があります。kubeadmラボではCalicoが最も一般的な選択肢です。</p></blockquote>

<h2 id="pod-network-debug">4. Podネットワークトラブルシューティング</h2>

<pre><code class="language-text"># Pod間接続テスト
kubectl exec -it pod1 -- ping 10.244.1.5
kubectl exec -it pod1 -- curl http://pod2:8080

# PodのIP確認
kubectl get pod pod1 -o jsonpath='{.status.podIP}'

# ノード上のCNI設定確認
ls /etc/cni/net.d/
cat /etc/cni/net.d/10-calico.conflist

# kube-proxyルールの確認
kubectl get pod -n kube-system -l k8s-app=kube-proxy
iptables -t nat -L KUBE-SERVICES | head -20</code></pre>

<h2 id="cheatsheet">5. チートシート</h2>

<table>
<thead><tr><th>タスク</th><th>コマンド/オブジェクト</th></tr></thead>
<tbody>
<tr><td>クラスタへのHTTPルーティング</td><td><strong>Ingress</strong>（+ IngressClass）</td></tr>
<tr><td>Podへの全トラフィックブロック</td><td>空のingress: []を持つNetworkPolicy</td></tr>
<tr><td>Namespaceからのトラフィック許可</td><td>namespaceSelectorを持つNetworkPolicy</td></tr>
<tr><td>CNIプラグインの確認</td><td><code>ls /etc/cni/net.d/</code></td></tr>
<tr><td>IngressClass確認</td><td><code>kubectl get ingressclass</code></td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習問題</h2>

<p><strong>Q1：</strong>Ingressリソースを作成しましたがADDRESSがなく、トラフィックがルーティングされません。最も可能性の高い原因は？</p>
<ul>
<li>A) ServiceタイプをLoadBalancerにする必要がある</li>
<li>B) クラスタにIngressコントローラーがインストールされていない ✓</li>
<li>C) Ingressはkube-system Namespaceに配置する必要がある</li>
<li>D) IngressClassを"default"に設定する必要がある</li>
</ul>
<p><em>解説：Ingressリソースは設定にすぎません — Ingressコントローラー（nginx、Traefikなど）がなければ効果がありません。コントローラーがIngressオブジェクトを監視し、実際のプロキシを設定します。</em></p>

<p><strong>Q2：</strong>NetworkPolicyがラベルapp=databaseのPodを選択し、policyTypes: [Ingress]を指定していますが、ingressルールが定義されていません。どのような効果がありますか？</p>
<ul>
<li>A) 全トラフィックが許可される（ルールなし = 全許可）</li>
<li>B) databaseのPodへの全インバウンドトラフィックがブロックされる ✓</li>
<li>C) egressトラフィックのみが影響を受ける</li>
<li>D) ポリシーは無効で効果がない</li>
</ul>
<p><em>解説：policyTypes: [Ingress]があり、ingressルールが空のNetworkPolicyは、選択されたPodへの全インバウンドトラフィックのデフォルト拒否として機能します。これはデフォルト拒否ポリシーの一般的な実装方法です。</em></p>

<p><strong>Q3：</strong>Podネットワーキングとネットワークポリシーの両方が必要な場合、どのCNIプラグインを選択すべきですか？</p>
<ul>
<li>A) Flannel</li>
<li>B) Calico ✓</li>
<li>C) CoreDNS</li>
<li>D) kube-proxy</li>
</ul>
<p><em>解説：FlannelはオーバーレイネットワーキングのみでNetworkPolicyは非対応。Calico（およびCilium、Weave）はNetworkPolicy APIを実装。CoreDNSはDNS、kube-proxyはServiceロードバランシングを担当し、CNIプラグインではありません。</em></p>
