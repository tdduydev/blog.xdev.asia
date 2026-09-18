---
id: 019c9618-0201-7000-8000-c1147ba22e12
title: 'レッスン 14: Kubernetes ネットワーク モデル'
slug: bai-14-kubernetes-networking-model
description: 'Kubernetes ネットワーク モデル: コンテナからコンテナ、ポッドからポッド、ポッドからサービス、外部からサービス。 CNI プラグイン、Cilium eBPF (2026 推奨)、Calico、kube-proxy nftables (IPVS は非推奨の K8s 1.35)。'
duration_minutes: 90
is_free: false
video_url: null
sort_order: 14
section_title: 'モジュール 4: ネットワーキング'
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: 'Kubernetes: 基本から高度まで'
  slug: kubernetes-tu-co-ban-den-nang-cao
locale: ja
---
<h2>🎯 レッスンの目的</h2><p>基本から高度な Kubernetes ネットワーク モデルを理解します。各ポッドが独自の IP を持つ理由、4 種類の通信パターン、CNI プラグイン (Cilium 2026 推奨)、nftable を使用した kube-proxy です。</p>

<img src="/storage/uploads/2026/03/k8s-networking-model-2026.webp" alt="Kubernetes Networking Model - 4 Communication Patterns" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h2>1. Kubernetes ネットワーク要件</h2>
<p>Kubernetes には 3 つの主要なネットワーク要件があります:</p>
<ul>
  <li>すべてのポッドはクラスター内の他のすべてのポッドと通信できる必要があります__HTMLTAG_11___NAT は必要ありません___HTMLTAG_12__HTMLTAG_13___
  <li>すべてのノードがすべてのポッドと通信できる必要がある__HTMLTAG_15___NAT は不要___HTMLTAG_16__HTMLTAG_17___
  <li>_ポッド自体が認識する IP は、他のポッドが認識する IP と同じである必要があります__HTMLTAG_19___
</ul>
<p>これは、デフォルトの Docker (NAT ベース) とは異なり、「フラット ネットワーク モデル」です。</p>

<h2>2. 4 つのコミュニケーション パターン</h2>

<h3>2.1 コンテナ間 (同じポッド内)</h3>
<p>同じポッド内のコンテナはネットワーク名前空間を共有します → <code>localhost</code>.</p> 経由で通信します
___コードブロック_0___

<h3>2.2 ポッド間</h3>
<p>各ポッドにはクラスター内の個別の IP があります。ポッドは IP 経由で直接通信します — CNI プラグインによりルーティングが保証されます。</p>
___コードブロック_1___

<h3>2.3 ポッドからサービス</h3>
<p>ポッドは、ClusterIP (仮想 IP) を介してサービスと通信します。 kube-proxy は、実際の Pod IP への DNAT (宛先 NAT) への iptables/nftables ルールを作成します。</p>
___コードブロック_2___

<h3>2.4 外部からサービス</h3>
<p>NodePort、LoadBalancer、または Gateway API (HTTPRoute) を介したクラスターの外部からサービスへのトラフィック。</p>

<h2>3. CNI (コンテナ ネットワーク インターフェイス)</h2>
<p>CNI は、Kubernetes とネットワーク プラグイン間の標準インターフェイスです。ポッドが作成されると、kubelet は CNI プラグインを呼び出して次のようにします。</p>
<ul>
  <li>Pod のネットワーク インターフェイスを作成</li>
  <li>IP アドレスの割り当て_</li>
  <li>ルーティング構成</li>
</ul>

<h3>3.1 Cilium — 2026 年推奨</h3>
<p>Cilium はカーネル レベルで <strong>eBPF (拡張バークレー パケット フィルター)</strong> を使用します。iptables チェーンは必要ありません。</p>
<p><strong>Cilium の利点</strong>:</p>
<ul>
  <li>eBPF: 高速でプログラム可能なカーネルレベルのネットワーキング</li>
  <li>L7 の可視性と負荷分散 (HTTP、gRPC、Kafka)</li>
  <li>__HTMLTAG_71___Hubble</strong> による組み込みの可観測性 (リアルタイム ネットワーク トラフィック)</li>
  <li>ネイティブ ゲートウェイ API の実装</li>
  <li>サイドカーレス サービス メッシュ (Envoy サイドカーは不要)</li>
  <li>_ネットワーク ポリシー: L3/L4/L7</li>
</ul>
___コードブロック_3___

<h3>3.2 キャリコ</h3>
<p>Calico は、eBPF データプレーンのサポート (オプション)、ベアメタル用の BGP ルーティングを備えた成熟した CNI です。物理ルーターとの広範な互換性または BGP ピアリングが必要な場合に適しています。</p><h3>3.3 フランネル</h3>
<p>Flannel はシンプルでインストールが簡単ですが、__HTMLTAG_88___ネットワーク ポリシーのサポートと可観測性</strong> が不足しています。運用環境には推奨されません。</p>

<h2>4. eBPF — iptables より速いのはなぜですか?</h2>
<p>iptables は、線形ルール マッチング (n ルールで O(n)) を使用します。クラスターに何千ものサービスがある場合、iptables チェーンは非常に長くなり、パフォーマンスに影響します。</p>
<p>eBPF はハッシュ マップを使用します。サービスの数に関係なく、O(1) ルックアップです。 eBPF プログラムは、ユーザー空間へのコンテキスト切り替えを行わずに、カーネル内で直接実行されます。</p>
___コードブロック_4___

<h2>5. kube-proxy モード 2026</h2>
<p>kube-proxy は、各ノードでサービスの負荷分散を実装します。</p>

<h3>5.1 iptables モード (レガシー)</h3>
<p>_サービス エンドポイントごとに iptables DNAT ルールを作成します。まだ動作しますが、スケーラビリティが低下します。</p>

<h3>5.2 nftables モード — 2026 年推奨</h3>
<p><strong>IPVS モードは K8s 1.35</strong> で非推奨になりました。 nftables は新しいバックエンドで、iptables よりも効率的です。</p>
___コードブロック_5___
___コードブロック_6___

<h2>6. CoreDNS</h2> を使用した DNS
<p>CoreDNS は Kubernetes のデフォルトの DNS サーバーであり、__HTMLTAG_114___kube-system</code>.</p> でデプロイメントとして実行されます。
___コードブロック_7___

<h2>7。ネットワーク図</h2>
___コードブロック_8___

<h2>概要</h2>
<ul>
  <li>Kubernetes フラット ネットワーク: 各ポッドには独自の IP があり、NAT はありません</li>
  <li>4 パターン: コンテナ間 (localhost)、ポッド間 (直接 IP)、ポッドからサービス (ClusterIP + kube-proxy)、外部からサービス (NodePort/ゲートウェイ API)</li>
  <li>Cilium eBPF: CNI 推奨 2026 — 高速、L7 可観測性、ネイティブ API ゲートウェイ</li>
  <li>kube-proxy nftables: IPVS を置き換えます (非推奨の K8s 1.35)</li>
  <li>CoreDNS: DNS 名によるサービス検出</li>
</ul>