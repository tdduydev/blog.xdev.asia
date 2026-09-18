---
id: 019c9618-0001-7000-8000-c1147ba22e10
title: 'レッスン 2: Kubernetes アーキテクチャ'
slug: bai-2-kien-truc-kubernetes
description: 'Kubernetes 1.32 以降の詳細なアーキテクチャ: コントロール プレーン、ワーカー ノード、主要コンポーネントについて学びます。 kube-apiserver、etcd、スケジューラー、コントローラーマネージャー、kubelet、containerd 2.0、nftables を使用した kube-proxy について理解します。'
duration_minutes: 90
is_free: true
video_url: null
sort_order: 2
section_title: 'モジュール 1: 概要と Kubernetes アーキテクチャ'
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: 'Kubernetes: 基本から高度まで'
  slug: kubernetes-tu-co-ban-den-nang-cao
locale: ja
---
<h2>Kubernetes アーキテクチャ: 概要から詳細まで__HTMLTAG_1___

<p>Kubernetes は、明確なマスター/ワーカー アーキテクチャを備えた分散モデルで設計されています。 Kubernetes を効果的に使用するには、特に問題が発生した場合にデバッグするには、各コンポーネントが何を行うのか、コンポーネントがどのように通信するのか、そしてなぜそのように設計されているのかを理解する必要があります。このレッスンでは、containerd 2.0 の重要な変更、kube-proxy の nftables モード、cgroup v2 ロードマップを含む Kubernetes 1.32 以降のアーキテクチャについて詳しく説明します。</p>

<img src="/storage/uploads/2026/03/k8s-architecture-2026.webp" alt="Kubernetes Architecture - Control Plane và Worker Nodes" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h2>1.アーキテクチャの概要: コントロール プレーンとワーカー ノード</h2>

<p>Kubernetes クラスターは、機能ノードの 2 つのグループに分割されます:</p>

<ul>
  <li><strong>コントロール プレーン (マスター ノード)</strong>: クラスターの頭脳。ポッドを実行する場所のスケジュール設定、クラスター イベントの検出と応答、望ましい状態の維持など、グローバルな意思決定を担当します。</li>
  <li><strong>ワーカー ノード</strong>: ワークロードが実際に実行される場所。各ノードには、ランタイム コンテナー、コントロール プレーンと通信する kubelet、ネットワークを処理する kube-proxy が含まれています。</li>
</ul>

<p>実稼働環境では、高可用性 (HA) を確保するために、コントロール プレーンは通常、少なくとも 3 つの個別のノードにデプロイされます。 Kubernetes 1.32 以降では、GKE、EKS、AKS などのマネージド Kubernetes サービスはコントロール プレーンを完全に非表示にし、API 経由でのみ対話します。</p>

___コードブロック_0___

<h2>2.コントロール プレーン コンポーネント</h2>

<h3>2.1. kube-apiserver — 単一インターフェイス</h3>

<p><strong>kube-apiserver</strong> は、コントロール プレーンの中心的なコンポーネントです。クラスター内のすべての通信 (開発者の kubectl、ワーカー ノードの kubelet、コントローラーから) は API サーバーを経由する必要があります。 kube-apiserver を除き、コンポーネントは etcd と直接通信できません。</p>

<p>kube-apiserver の主な機能:</p>

<ul>
  <li><strong>REST API ゲートウェイ</strong>: Kubernetes API グループ標準 (<code>core/v1</code>、__HTMLTAG_37___apps/v1</code>、 <code>networking.k8s.io/v1</code>...)</li>
  <li><strong>認証</strong>: ID 認証 — クライアント証明書、ベアラー トークン、OIDC、Webhook トークン認証をサポート__HTMLTAG_45___
  <li><strong>認可</strong>: RBAC (ロールベースのアクセス制御)、ABAC、または Webhook モード経由でアクセス権を確認します</li>
  <li><strong>アドミッション コントロール</strong>: オブジェクトが etcd</li> に書き込まれる前に適用される、一連のアドミッション Webhook — 検証と変更 — が適用されます。
  <li><strong>API 集約</strong>: カスタム API サーバー (メトリクス サーバー、カスタム CRD) を使用した API 拡張を許可</li>
</ul>

___コードブロック_1___

<p>Kube-apiserver はステートレスです。状態は保存されず、etcd に対して読み取り/書き込みのみが行われます。これにより、ロード バランサの背後で複数の API サーバー インスタンスを実行することにより、水平方向のスケーリングが可能になります。</p>

<h3>2.2. etcd — クラスター メモリ</h3><p><strong>etcd</strong> は、Raft コンセンサス アルゴリズムを使用した分散型 Key-Value ストアです。これは、クラスターの状態全体が保存される唯一の場所です。すべての Pod、Service、ConfigMap、Secret、Node は、シリアル化された protobuf オブジェクトとしてここに保存されます。</p>

<p>Kubernetes の etcd の重要な機能:</p>

<ul>
  <li><strong>強い一貫性</strong>: Raft は etcd クラスター内のすべてのノードが値に一致することを保証します - 「スプリット ブレイン」なし</li>
  <li><strong>Watch API</strong>: クライアント (kube-apiserver を含む) は主要な変更を監視できます。これは Kubernetes が反応するための中心的なメカニズムです</li>
  <li><strong>クォーラム要件</strong>: クラスターが動作するには過半数 (⌊in/2⌋ + 1) のアクティブ ノードが必要です。 etcd ノードが 3 つある場合、1 つのノードは許容されます。 5 つのノードを使用すると、2 つのノードの損失に耐えることができます</li>
  <li><strong>etcd v3</strong>: etcd 3.5+ を使用した Kubernetes 1.32 で、パフォーマンスとリースベースの改善が施されています TTL</li>
</ul>

___コードブロック_2___

<p><strong>重要な注意</strong>: etcd データは定期的にバックアップする必要があります。 etcd の損失 = クラスター全体の状態の損失。マネージド Kubernetes では、クラウド プロバイダー自体がこれを処理します。</p>

<h3>2.3. kube-scheduler — ポッド割り当てアルゴリズム</h3>

<p><strong>kube-scheduler</strong> は、どのポッドをどのノードで実行するかを決定する責任があります。ポッドを作成すると、kube-apiserver はステータス <code>Pending</code> (ノードがまだ割り当てられていません) でポッドを etcd に書き込みます。スケジューラはこれらのポッドを監視し、一致するノードを見つけます。</p>

<p>スケジュール設定プロセスは 2 つのステップで構成されます:</p>

<ul>
  <li><strong>フィルタリング (述語)</strong>: 要件を満たさないノードを削除します - 十分な CPU/メモリが不足している、Pod が許容しない汚染のあるノード、一致しない NodeSelector、Pod アフィニティ/アンチアフィニティ制約...</li>
  <li><strong>スコアリング (優先度)</strong>: 多くの基準に従って残りのノードにスコアを付けます。リソースの使用量が最も少ないノード、必要なイメージを既に備えているノード (プル時間の短縮)、ポッド レプリカを均等に分散しているノード...</li>
</ul>

___コードブロック_3___

<p>Kubernetes 1.32 以降は、__HTMLTAG_112___スケジューラー プロファイル</strong> をサポートしています。これにより、同じクラスター内の多様なワークロードに適した、異なるプラグイン セットを使用して複数のスケジューリング プロファイルを構成できます。</p>

<h3>2.4. kube-controller-manager — 制御ループ</h3>

<p><strong>kube-controller-manager</strong> は一連のコントローラーを実行します。各コントローラーはクラスターの現在の状態を監視し、望ましい状態に戻すアクションを実行する制御ループです。これは、Kubernetes 宣言モデルの中心である__HTMLTAG_120___調整ループ パターン</em> の実現です。</p>

<p>最も重要なコントローラ:</p><ul>
  <li><strong>_ReplicaSet コントローラー</strong>: ポッド レプリカの数が仕様と一致していることを確認します。ポッドが停止した場合、コントローラーは新しいポッドを作成します。</li>
  <li><strong>デプロイメント コントローラー</strong>: デプロイメントのローリング アップデートの管理、ReplicaSet の作成/削除</li>
  <li><strong>EndpointSlice コントローラー</strong>: ポッドの準備ができた/準備ができていないときに EndpointSlice を更新します (古い Endpoints コントローラーを置き換えます — Endpoints API は K8s 1.33 で非推奨になりました)</li>
  <li><strong>_名前空間コントローラー</strong>: 名前空間が削除されたときにリソースをクリーンアップ</li>
  <li><strong>ServiceAccount コントローラー</strong>: 新しい名前空間ごとにデフォルトの ServiceAccount を自動的に作成</li>
  <li><strong>ノード コントローラー</strong>: ノードの健全性を監視し、到達不能な場合はノードを汚染し、猶予期間後にポッドを削除します</li>
  <li><strong>ジョブ コントローラー</strong>: バッチ ジョブを管理し、完了を確認</li>
  <li><strong>CronJob コントローラー</strong>: cron 式に従ってジョブをスケジュール</li>
</ul>

___コードブロック_4___

<h3>2.5。クラウド コントローラー マネージャー</h3>

<p>kube-controller-manager とは別に、__HTMLTAG_162___cloud-controller-manager</strong>クラウド プロバイダー API と統合するコントローラーが含まれています:</p>

<ul>
  <li><strong>ノード コントローラー</strong>: クラウド プロバイダーをチェックしてノードが存在することを確認し、クラウド領域、インスタンス タイプなどのメタデータを取得します</li>
  <li><strong>ルート コントローラー</strong>: クラウド インフラストラクチャでのネットワーク ルートの構成</li>
  <li><strong>サービス コントローラー</strong>: サービス タイプ LoadBalancer を作成するときにクラウド ロード バランサーを作成/更新/削除します</li>
</ul>

<p>オンプレミスまたはベアメタルを使用する場合、クラウドコントローラーマネージャーは必要ありません。</p>

<h2>3.ワーカー ノード コンポーネント</h2>

<h3>3.1. kubelet — ノードごとのエージェント</h3>

<p><strong>kubelet</strong> は、各ワーカー ノードで実行されるエージェントです。 kubelet の仕事は、PodSpec を受信し、そこに記述されているコンテナが実行中で正常であることを確認することです。</p>

<p>_Kubelet は次のメカニズムに従って動作します:</p>

<ul>
  <li>kube-apiserver を監視してノードに割り当てられた PodSpecs を受信</li>
  <li>__HTMLTAG_195___CRI (コンテナ ランタイム インターフェイス)</strong> — 標準化された gRPC インターフェイス__HTMLTAG_197___ を介してランタイム コンテナと通信します。
  <li>ノードのステータスとポッドのステータスを API サーバーに報告します</li>
  <li>liveness/readiness/startup プローブを実行</li>
  <li>ボリュームのマウント、イメージのプル、ネットワーク名前空間のセットアップ__HTMLTAG_203___
  <li>cgroup v2 を通じてリソース制限を管理</li>
</ul>

___コードブロック_5___

<h3>3.2. kube-proxy — ネットワーク ルール エンジン (nftables モード)</h3><p><strong>kube-proxy</strong> は各ノードで実行され、Kubernetes Services ネットワーキングの実装を担当します。サービス VIP へのトラフィックが正しいポッド バックエンドに転送されるようにします。</p>

<p>kube-proxy モードの歴史:</p>

<ul>
  <li><strong>iptables モード</strong> (レガシー): iptables ルール チェーンを使用します。問題: 数千のサービスがあるため、iptables ルールは非常に大きく、更新が遅い</li>
  <li><strong>IPVS モード</strong>: カーネル内のレイヤー 4 ロード バランサー。 IPVS モード <strong>Kubernetes 1.35 では非推奨</strong> であり、将来削除される予定</li>
  <li><strong>nftables モード</strong> (K8s 1.31 以降の現在のデフォルト): nftables を使用します — iptables を置き換える新しい Linux フレームワーク。より効率的で、デバッグが容易で、最新のカーネルでのサポートが向上</li>
</ul>

___コードブロック_6___

<p><strong>注</strong>: 最新のクラスターの多くは、Cilium などの CNI プラグインを使用して kube-proxy を完全に置き換えており (Cilium の kube-proxy の置き換えには eBPF が使用されています)、パフォーマンスと可観測性が向上しています。</p>

<h3>3.3.コンテナ ランタイム —containerd 2.0</h3>

<p>_コンテナ ランタイムは、コンテナを実際に作成して実行するコンポーネントです。 Kubernetes は、__HTMLTAG_238___CRI (コンテナ ランタイム インターフェイス)</strong>.</p> を介してランタイムと通信します。

<p><strong>_Docker を使用してみませんか?</strong></p>

<p>Docker Engine はバージョン 1.24 の Kubernetes から削除されました (dockershim は削除されました)。 Docker は CRI をネイティブに実装していません。Kubernetes はブリッジングに shim レイヤー (dockershim) を使用する必要があります。代わりに:</p>

<ul>
  <li><strong>containerd</strong>: 公式ランタイム、Docker プロジェクトからフォーク、ネイティブ CRI サポート</li>
  <li><strong>CRI-O</strong>: ランタイムの軽量化、Kubernetes の使用例に重点を置いた</li>
</ul>

<p><strong>containerd 2.0</strong> (2024 年リリース) は重要な改善をもたらします:</p>

<ul>
  <li>__HTMLTAG_263___cgroup v2</strong> (Kubernetes 1.36 から必須)</li> のネイティブ サポート
  <li>サンドボックス API によるサンドボックス管理の改善</li>
  <li>より効率的な画像管理のための転送サービス</li>
  <li>拡張カスタマイズ用の NRI (ノード リソース インターフェイス) プラグイン</li>
  <li>Zstd 画像圧縮のサポート — プルが大幅に高速化</li>
  <li>Windows コンテナを使用するとさらに効果的</li>
</ul>

___コードブロック_7___

<h3>3.4. cgroup v2 — 最新のリソース管理</h3>

<p><strong>cgroups (コントロール グループ)</strong> は、プロセス グループのリソース使用量を制限、優先順位付け、測定するための Linux カーネル機能です。 Kubernetes は cgroup を使用して、ポッドとコンテナに CPU/メモリ制限を適用します。</p><ul>
  <li><strong>cgroup v1</strong>: レガシー、各リソースには独自の階層 (CPU、メモリ、blkio...) があり、複雑で多くのエッジケースがあります__HTMLTAG_287___
  <li><strong>cgroup v2</strong>: 統合された階層、単一の cgroup ツリー、memory.oom.group によるメモリ管理の改善、圧力ストール情報 (PSI)</li>
</ul>

<p><strong>重要なスケジュール</strong>:</p>

<ul>
  <li>Kubernetes 1.25: cgroup v2 安定版</li>
  <li>Kubernetes 1.35: cgroup v1 <strong>非推奨</strong></li>
  <li>Kubernetes 1.36: cgroup v2 <strong>必須</strong>、cgroup v1 は削除</li>
  <li>Ubuntu 22.04+、RHEL 9+、Debian 11+ はデフォルトで cgroup v2</li> を使用します
</ul>

___コードブロック_8___

<h2>4.ポッド作成フロー: kubectl からコンテナ</h2>

<p>実際的な方法でアーキテクチャを理解するために、__HTMLTAG_314___kubectl apply -f pod.yaml</code>:</p> を実行するときに発生するフローを追跡しましょう。

<img src="/storage/uploads/2026/03/k8s-pod-creation-flow-2026.webp" alt="Pod Creation Flow - từ kubectl đến Container" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

___コードブロック_9___

<p>__HTMLTAG_319___kubectl apply</code> の瞬間からコンテナが実際に実行される瞬間までのこのプロセス全体には、画像がキャッシュされているかどうかとネットワーク速度に応じて通常 2 ～ 10 秒かかります。</p>

<h2>5.重要なアドオン</h2>

<h3>5.1. CoreDNS — サービスディスカバリ</h3>

<p><strong>CoreDNS</strong> はクラスター内で実行されている DNS サーバーであり、ポッドが IP:</p> ではなくドメイン名を使用してサービスや他のポッドを検索できるようにします。

<ul>
  <li>名前空間 <code>my-svc</code> のサービス <code>my-ns</code> は、__HTMLTAG_336___my-svc.my-ns.svc.cluster.local</code></li> で解決できます。
  <li>ポッド間の DNS: <code>pod-ip.namespace.pod.cluster.local</code></li>
  <li>_CoreDNS は必須の Kubernetes アドオンです — クラスターは DNS なしでは適切に機能しません</li>
</ul>

___コードブロック_10___

<h3>5.2. CNI プラグイン — コンテナ ネットワーク インターフェイス</h3>

<p>CNI プラグインはポッド ネットワーキングを実装します。これにより、各ポッドが独自の IP を持ち、他のポッドと通信できるようになります。 Kubernetes にはネットワークが組み込まれていないため、CNI プラグインをインストールする必要があります。</p>

<p>2026 年の人気の CNI:</p>

<ul>
  <li><strong>Cilium</strong>: eBPF ベース、最高のパフォーマンス、組み込みのハッブル可観測性、kube プロキシの代替、高度なネットワーク ポリシー。これは、多くのマネージド K8s サービスのデフォルトの選択です。</li>
  <li><strong>フランネル</strong>: シンプルで軽量、学習環境や開発環境に適しています</li>
  <li><strong>_Calico</strong>: ルーティングに BGP を使用する強力なネットワーク ポリシー。オンプレミスの企業で人気</li>
  <li><strong>Weave Net</strong>: シンプルなセットアップ、メッシュ ネットワーク</li>
</ul>

___コードブロック_11___

<h3>5.3. metrics-server — リソース メトリック</h3><p><strong>metrics-server</strong> は、各ノードの kubelet から CPU とメモリのメトリクスを収集し、水平ポッド オートスケーラー (HPA) とコマンド <code>kubectl top</code>.</p> を提供します。

___コードブロック_12___

<h2>6.高可用性コントロール プレーン</h2>

<p>運用環境では、単一障害点を回避するためにコントロール プレーンに HA が必要です:</p>

<ul>
  <li><strong>3 または 5 つのコントロール プレーン ノード</strong>kube-apiserver、kube-scheduler、kube-controller-manager を実行</li>
  <li><strong>ロード バランサー</strong> kube-apiservers (HAProxy、クラウド LB、またはキープアライブを備えた仮想 IP) の前に</li>
  <li><strong>etcd クラスター</strong> クォーラム (少なくとも 3 ノード) — スタック (同じコントロール プレーン ノード上) または外部 (別のノード上) で実行可能</li>
  <li>kube-scheduler と kube-controller-manager は <strong>リーダー選挙</strong> を使用します — 一度に 1 つのインスタンスのみがアクティブになり、残りのインスタンスはスタンバイ__HTMLTAG_398___
</ul>

___コードブロック_13___

<h2>7.概要と重要なポイント</h2>

<p>Kubernetes アーキテクチャは重要な設計原則を反映しています:</p>

<ul>
  <li><strong>関心事の分離</strong>: 各コンポーネントには明確な責任があり、標準 API</li> を介して通信します。
  <li><strong>宣言モデル</strong>: 望ましい状態を宣言すると、コントローラーがその状態への到達を処理します</li>
  <li><strong>_唯一の信頼できる情報源</strong>: etcd は状態を保存する唯一の場所であり、すべてのコンポーネントがサーバー API を監視</li>
  <li><strong>拡張性</strong>: CRI、CNI、CSIは、コンポーネント(ランタイム、ネットワーク、ストレージ)の置き換えを可能にするインターフェースです</li>
  <li><strong>復元力</strong>: HA 設計により、ノードに障害が発生してもクラスターは動作し続けます</li>
</ul>

<p>次の記事では、containerd 2.0、cgroup v2、および 2026 年の開発に必要なツールを備えた Kubernetes クラスターをインストールすることで、このアーキテクチャの知識を実践します。</p>

___コードブロック_14___