---
id: cka-d3-l06
title: 'レッスン6: Services、Endpoints & CoreDNS'
slug: 06-services-endpoints-coredns
description: >-
  Serviceタイプの詳細、Endpointsオブジェクト、kube-proxyモード。CoreDNSの
  設定とDNSトラブルシューティング。ExternalName、Headless Service。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 6
section_title: "ドメイン3: Services & Networking (20%)"
course:
  id: lt-cka-series-001
  title: 'CKA認定試験対策 — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai6-coredns.webp" alt="CoreDNS、kube-proxyとKubernetesサービスディスカバリー" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="services-deep">1. Services & Endpoints</h2>

<p>Serviceを作成すると、KubernetesはselectorにマッチするPodのIPリストを含む<strong>Endpoints</strong>オブジェクトを自動的に作成します。</p>

<pre><code class="language-text"># Service → Endpoints → Pods
kubectl get service my-app        # 仮想IP (ClusterIP)
kubectl get endpoints my-app      # リスト: 10.244.1.2:80, 10.244.1.3:80
kubectl describe endpoints my-app # 詳細

# Endpointsが空の場合 → selectorがPodラベルと一致しない
# デバッグ: selectorとPodラベルを比較
kubectl get svc my-app -o jsonpath='{.spec.selector}'
kubectl get pods --show-labels | grep app=my-app</code></pre>

<h2 id="coredns">2. CoreDNS設定</h2>

<pre><code class="language-text"># CoreDNSはkube-systemでDeploymentとして実行
kubectl get pods -n kube-system -l k8s-app=kube-dns
kubectl get configmap coredns -n kube-system -o yaml

# デフォルトCorefile:
.:53 {
    errors
    health { lameduck 5s }
    ready
    kubernetes cluster.local in-addr.arpa ip6.arpa {  # クラスタドメイン
       pods insecure
       fallthrough in-addr.arpa ip6.arpa
    }
    prometheus :9153
    forward . /etc/resolv.conf  # クラスタ外クエリをアップストリームに転送
    cache 30
    loop
    reload
    loadbalance
}</code></pre>

<blockquote><p><strong>試験のポイント：</strong>CoreDNSトラブルシューティング手順：1) CoreDNS Podが実行中か確認、2) kube-system内のkube-dns Serviceを確認、3) <code>kubectl exec -it pod -- nslookup kubernetes</code>でPod内からDNSテスト、4) Podの<code>/etc/resolv.conf</code>がkube-dns ClusterIPを指しているか確認。</p></blockquote>

<h2 id="kube-proxy">3. kube-proxyモード</h2>

<table>
<thead><tr><th>モード</th><th>メカニズム</th><th>パフォーマンス</th></tr></thead>
<tbody>
<tr><td><strong>iptables</strong>（デフォルト）</td><td>Linux iptablesルール、ランダムなPod選択</td><td>良好、O(n)ルール</td></tr>
<tr><td><strong>IPVS</strong></td><td>Linux IPVS（カーネル、ハッシュベース）</td><td>大規模クラスタに最適</td></tr>
<tr><td><strong>userspace</strong>（非推奨）</td><td>ユーザースペースプロキシ</td><td>低速、レガシー</td></tr>
</tbody>
</table>

<h2 id="headless-services">4. Headless Service</h2>

<pre><code class="language-text"># Headless: clusterIP: None
# DNSはPod IPを直接返す（仮想IPなし）
apiVersion: v1
kind: Service
metadata:
  name: mysql-headless
spec:
  clusterIP: None
  selector:
    app: mysql
  ports:
  - port: 3306

# DNS動作:
# mysql-headless → 複数のAレコード（各Pod IPに1つ）
# mysql-0.mysql-headless → 特定のPod IP（StatefulSet）</code></pre>

<h2 id="debug-dns">5. DNSトラブルシューティングコマンド</h2>

<pre><code class="language-text"># Pod内からDNSテスト
kubectl run dns-test --image=busybox --rm -it -- nslookup kubernetes
kubectl run dns-test --image=busybox --rm -it -- nslookup my-service.namespace

# Pod内のresolv.confを確認
kubectl exec -it my-pod -- cat /etc/resolv.conf
# 表示されるべき: nameserver 10.96.0.10 (kube-dns service IP)

# CoreDNSログの確認
kubectl logs -n kube-system -l k8s-app=kube-dns

# kube-dns Serviceの確認
kubectl get svc -n kube-system kube-dns</code></pre>

<h2 id="cheatsheet">6. チートシート</h2>

<table>
<thead><tr><th>問題</th><th>確認方法</th></tr></thead>
<tbody>
<tr><td>ServiceがPodに到達できない</td><td>kubectl get endpoints NAME</td></tr>
<tr><td>Endpointsが空</td><td>ServiceセレクタとPodラベルの不一致</td></tr>
<tr><td>PodがDNSを解決できない</td><td>/etc/resolv.conf + CoreDNS Pod状態</td></tr>
<tr><td>StatefulSet Pod DNS</td><td>serviceNameと同名のHeadless Serviceが必要</td></tr>
</tbody>
</table>

<h2 id="practice">7. 練習問題</h2>

<p><strong>Q1：</strong>Serviceを作成しましたがトラフィックがPodに到達しません。ServiceのEndpointsオブジェクトが「no endpoints」を表示しています。最も可能性の高い原因は？</p>
<ul>
<li>A) Serviceポートがコンテナポートと一致していない</li>
<li>B) Serviceセレクタのラベルがpodラベルと一致していない ✓</li>
<li>C) NetworkPolicyがトラフィックをブロックしている</li>
<li>D) Podが別のクラスタにある</li>
</ul>
<p><em>解説：Endpointsが空はServiceがマッチするPodを見つけられないことを意味します。ラベルセレクタの不一致が原因です。確認方法: kubectl get svc myapp -o jsonpath='{.spec.selector}'とkubectl get pods --show-labelsを比較。</em></p>

<p><strong>Q2：</strong>「frontend」Namespaceで実行中のPodが「backend」Namespaceの「payments」Serviceに到達する必要があります。正しいDNS名は？</p>
<ul>
<li>A) payments</li>
<li>B) payments.backend</li>
<li>C) payments.backend.svc.cluster.local ✓</li>
<li>D) backend.payments.cluster.local</li>
</ul>
<p><em>解説：異なるNamespace間のDNSは完全なNamespaceの指定が必要です: {service}.{namespace}.svc.cluster.local。短縮名は同じNamespace内でのみ有効です。BとCの両方が機能しますが、Cが最も明示的で信頼性の高い形式です。</em></p>

<p><strong>Q3：</strong>CoreDNSが応答していません。診断手順として適切なのは？</p>
<ul>
<li>A) クラスタ全体を再起動する</li>
<li>B) CoreDNS Podの実行確認、kube-dns ServiceのClusterIP確認、Pod内からnslookupでテスト ✓</li>
<li>C) kube-proxyを再インストールする</li>
<li>D) kube-system Namespaceを再作成する</li>
</ul>
<p><em>解説：体系的なDNSデバッグ：(1) kubectl get pods -n kube-system -l k8s-app=kube-dns、(2) kube-dns ServiceにClusterIPがあるか確認、(3) Podの/etc/resolv.confがそのIPを指しているか確認、(4) テストPodからnslookupを実行。</em></p>
