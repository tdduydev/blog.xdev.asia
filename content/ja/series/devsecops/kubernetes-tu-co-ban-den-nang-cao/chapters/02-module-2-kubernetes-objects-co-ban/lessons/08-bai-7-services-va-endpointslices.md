---
id: 019c9618-0006-7000-8000-c1147ba22e10
title: 'レッスン 7: サービスとエンドポイントスライス'
slug: bai-7-services-va-endpointslices
description: Kubernetes Services によるサービスの検出と負荷分散。 ClusterIP、NodePort、LoadBalancer、外部名。 EndpointSlices は、Endpoints API (非推奨の K8s 1.33) に代わる新しい標準です。 Kubernetes のヘッドレス サービスと DNS。
duration_minutes: 80
is_free: false
video_url: null
sort_order: 7
section_title: 'モジュール 2: 基本的な Kubernetes オブジェクト'
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: 'Kubernetes: 基本から高度まで'
  slug: kubernetes-tu-co-ban-den-nang-cao
locale: ja
---
<h2>🎯 レッスンの目的</h2><p>Kubernetes でサービスが必要な理由、サービスの種類、および各種類をいつ使用するかを理解します。EndpointSlices は、Endpoints API、DNS ベースのサービス検出を CoreDNS に置き換える新しい標準です。</p>

<h2>1.サービスが必要な理由</h2>
<p>Pod には <strong>動的 IP</strong> が割り当てられます。Pod が再作成されるたびに (クラッシュ、更新、スケーリング後)、新しい IP が取得されます。サービス A がサービス B を呼び出したい場合、サービス A は B の IP をハードコーディングできません。</p>
<p>Service は、一連の Pod に安定した <strong>endpoint__HTMLTAG_12___ (IP および DNS 名) を提供します。サービスへのトラフィックは正常なポッドに負荷分散されます。</p>

<h2>2.サービスの種類_</h2>

<img src="/storage/uploads/2026/03/k8s-service-types-2026.webp" alt="Kubernetes Service Types - ClusterIP, NodePort, LoadBalancer, ExternalName" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h3>2.1 ClusterIP (デフォルト)</h3>
<p>クラスター内の内部 IP を使用してサービスを公開します。クラスター内からのみアクセス可能です。</p>
___コードブロック_0___

<h3>2.2 ノードポート_</h3>
<p>ノードの IP と静的ポート (30000 ～ 32767) を介してクラスターの外にサービスを公開します。</p>
___コードブロック_1___
<p>アクセス: <code>http://&lt;any-node-ip&gt;:31000</code></p>

<h3>2.3 ロードバランサー</h3>
<p>_外部ロード バランサーを作成します (クラウド プロバイダー: AWS ELB、GCP CLB、Azure LB)。クラウド上の本番環境で使用されます。</p>
___コードブロック_2___
<p>最新の代替案: <strong>ゲートウェイ API</strong> を使用します (モジュール 4 を参照) — より表現力が高く、ベンダー ロックインはありません。</p>

<h3>2.4 外部名</h3>
<p>_サービスをクラスター外の DNS 名にマップします。負荷分散は行わず、CNAME のみを使用します。</p>
___コードブロック_3___

<h2>3. DNS によるサービス検出</h2>
<p>CoreDNS は各サービスの DNS レコードを作成します。形式:</p>
___コードブロック_4___
___コードブロック_5___

<h2>4. EndpointSlices — 新しい標準 K8s 1.33+</h2>
<p>以前、Kubernetes は__HTMLTAG_48___Endpoints</code> リソースを使用してポッドの IP リストを保存していました。問題: ポッドの数が多い (数千) と、Endpoints オブジェクトが非常に大きくなり、更新時にネットワーク オーバーヘッドが発生します。</p>
<p><strong>EndpointSlices</strong> はスライスに分割され (デフォルトではスライスあたり最大 100 エンドポイント)、スケーラビリティが大幅に向上します。</p>
<ul>
  <li>エンドポイント API: <strong>非推奨の K8 1.33___HTMLTAG_58__HTMLTAG_59___
  <li>EndpointSlices: 現在の標準、K8s 1.21</li> 以降に導入
</ul>
___コードブロック_6___
___コードブロック_7___

<h2>5.ヘッドレス サービス</h2>
<p>ヘッドレス サービス (<code>clusterIP: なし</code>) には ClusterIP がありません。 DNS クエリは、ロード バランシングを行わずに、Pod の IP を直接返します。 StatefulSet が各 Pod に安定した DNS 名を持つために使用されます。</p>
___コードブロック_8___
___コードブロック_9___

<h2>6.セッション アフィニティ</h2>
<p>デフォルトでは、各リクエストはランダムなポッドに対してラウンドロビンで行われます。スティッキーセッションが必要な場合:</p>
___コードブロック_10___<h2>7. kube-proxy とサービスの実装</h2>
<p>kube-proxy は各ノードで実行され、iptables/nftables ルールを作成することでサービスの負荷分散を実装します。</p>
<ul>
  <li><strong>iptables モード</strong>: レガシー、最も人気のある</li>
  <li><strong>nftables モード</strong>: 2026 推奨 (IPVS 非推奨 K8s 1.35)</li>
</ul>
<p>パケットが ClusterIP に到着すると、iptables/nftables ルールはランダムな IP ポッド (DNAT) にリダイレクトします。</p>

<h2>8.サービスのベスト プラクティス</h2>
<ul>
  <li>内部サービスには常に__HTMLTAG_93___ClusterIP</code>を使用してください</li>
  <li>外部公開用の <code>LoadBalancer</code> タイプの代わりにゲートウェイ API を使用</li>
  <li>サービスに明確な名前を付け、一貫したラベルを使用</li>
  <li>番号の代わりにポート名として <code>targetPort__HTMLTAG_104___ を使用します (ポッド内のポートを変更するときの柔軟性)</li>
  <li>エンドポイントスライスを監視して接続の問題をデバッグ__HTMLTAG_107___
</ul>

<h2>概要</h2>
<ul>
  <li>Service = 動的ポッドの安定したエンドポイント__HTMLTAG_113___
  <li>_ClusterIP: 内部;ノードポート: 開発/テスト; LoadBalancer: クラウド運用 (ただし API ゲートウェイを優先)</li>
  <li>EndpointSlices は Endpoints API (非推奨の K8s 1.33) を置き換えます</li>
  <li>ヘッドレス サービス: DNS は、StatefulSet に使用されるポッド IP を直接返します</li>
  <li>CoreDNS: <code>svc-name.namespace.svc.cluster.local</code></li>
</ul>