---
id: 019c9618-0501-7000-8000-c1147ba22e15
title: 'レッスン 28: 可観測性スタック 2026 — PLG + OPENTELEMETRY'
slug: bai-28-observability-stack-2026-plg-opentelemetry
description: 'OpenTelemetry 2026 標準による可観測性の 3 つの柱。 PLG スタック: Prometheus (メトリクス)、Loki (ログ)、Grafana (視覚化)。 Grafana Alloy は Promtail + OTel Collector を置き換えます。なぜEFKではないのでしょうか？'
duration_minutes: 90
is_free: false
video_url: null
sort_order: 28
section_title: 'モジュール 7: 可観測性と監視'
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: 'Kubernetes: 基本から高度まで'
  slug: kubernetes-tu-co-ban-den-nang-cao
locale: ja
---
<h2>オブザーバビリティ スタック 2026 — PLG + OpenTelemetry</h2>

<p>現代の分散システムの世界では、システムが外部に出力する内容に基づいてシステムの内部状態を理解することが、__HTMLTAG_3___Observability</strong> の中核となる定義です。 「システムは機能しているか?」という質問のみを行う従来の監視とは異なります。 — 可観測性により、「なぜシステムがそのように動作するのか?」を尋ねることができます。予期せぬ状況でも。</p>

<p>このレッスンでは、3 つの可観測性の柱、OpenTelemetry 標準、PLG スタックと EFK スタックの対比、統合コレクターとしての Grafana Alloy の役割を含む、2026 年に推奨される可観測性スタックの包括的な紹介を提供します。</p>

<img src="/storage/uploads/2026/03/k8s-observability-stack-2026.webp" alt="Kubernetes Observability Stack 2026 - Prometheus, Loki, Tempo, Grafana, OpenTelemetry" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h2>可観測性の 3 つの柱__HTMLTAG_10___

<p>すべての可観測性システムは、3 つの基本的なタイプの信号を中心に展開します。それぞれのタイプとそれらがどのように相互に補完するかを理解することは、効果的な観察システムを構築するための基礎となります。</p>

<h3>メトリクス — 経時的な数値データ</h3>

<p>メトリクスは、時間をかけて測定および収集される数値です。これらにより、傾向の観察、アラートしきい値の設定、異常の検出が可能になります。例: 1 秒あたりのリクエスト数、CPU 使用率、平均レイテンシー、エラー率。</p>

<p>メトリクスの利点は、ストレージ コストが低いこと、クエリが高速であること、そしてアラートに非常に適していることです。ただし、指標では__HTMLTAG_18___なぜ</em> 値が異常であるかを判断することはできません。さらに調査するにはログとトレースが必要です。</p>

<h3>ログ — イベント ログ</h3>

<p>ログは、アプリケーションおよびシステムによって生成されるイベント ログです。これらは、特定の時間に何が起こったのかについての最も詳細なコンテキストを提供します。通常、各ログ エントリには、タイムスタンプ、重大度レベル、メッセージ、メタデータ フィールドが含まれます。</p>

<p>ログは、(メトリクス アラートから) 期間と問題のあるコンポーネントを特定し、さらに詳細を理解する必要がある場合に非常に強力です。ログに関する課題は、データ量が膨大であり、ストレージ/クエリのコストが非常に高くなる可能性があることです。</p>

<h3>トレース — トレースのリクエスト</h3>

<p>分散トレースは、複数のサービスとコンポーネントにわたるリクエストを追跡します。各トレースは、複数の__HTMLTAG_30___spans</strong>、つまり開始および終了のタイムスタンプ、操作名、およびメタデータを含む作業単位で構成されます。トレースは、サービス間の依存関係を理解し、ボトルネックを特定し、遅延関連のエラーをデバッグするのに役立ちます。</p>

<h3>3 つすべてが必要な理由</h3><p>一般的な調査プロセスで連携する 3 つの柱:</p>
<ul>
  <li><strong>メトリクス アラート</strong> は、午前 2 時 30 分にエラー率が増加していることを警告します</li>
  <li>__HTMLTAG_43___Grafana ダッシュボード</strong>を開いて指標を表示し、サービスの支払いに問題があることに気づきました</li>
  <li>その間にサービスの支払いのために_<strong>Lokiログ</strong>にジャンプすると、「接続が拒否されました」エラー</li>が表示されます。
  <li>ログ行のトレース ID をクリックし、__HTMLTAG_51___テンポ トレース</strong> にジャンプすると、リクエストがデータベース呼び出し時にタイムアウトしていることがわかります</li>
  <li>結論: データベース接続プールが枯渇しました</li>
</ul>

<p>3 つの柱のどれも単独では十分な情報を提供できません。力はそれらの組み合わせと相互関係にあります。</p>

<h2>OpenTelemetry — 独自の標準 2026</h2>

<p>OpenTelemetry が登場する前は、各ベンダー (Datadog、New Relic、Jaeger、Zipkin...) が独自の SDK とエージェントを持っていました。ベンダーを変更するということは、インスツルメンテーション コードを書き直すことを意味します。 OpenTelemetry (OTel) は、このベンダー ロックイン問題を解決するために生まれました。</p>

<h3>_OpenTelemetry とは何ですか?</h3>

<p>OpenTelemetry は CNCF 段階的プロジェクトであり、テレメトリ データ (メトリクス、ログ、トレース) を収集およびエクスポートするための業界標準です。 2019 年に OpenCensus と OpenTracing が合併して形成された OTel は、2026 年までにクラウドネイティブ エコシステムの誰もが認める標準になりました。</p>

<h3>ベンダーに依存しないアーキテクチャ</h3>

<p>OTel アーキテクチャでは、インストルメンテーション (データの収集方法) とエクスポート (データの送信先) が明確に分離されています。一度インストルメントを行うと、エクスポーターの設定を変更するだけで、Prometheus、Jaeger、Datadog、New Relic、またはその他のバックエンドにデータを送信できるようになります。</p>

<h3>自動インストルメンテーション — コードを変更する必要はありません</h3>

<p>_OTel の最も強力な機能の 1 つは、自動計測機能です。 Java、Python、Node.js、.NET などの一般的な言語を使用すると、OTel は開発者がコード行を変更することなく、自動的にインストルメンテーションを挿入できます。これは特に次の場合に役立ちます:</p>
<ul>
  <li>インストルメンテーションのないレガシー アプリケーション__HTMLTAG_77___
  <li>ソース コードが管理されていないサードパーティ ライブラリ</li>
  <li>フリート全体への迅速な展開__HTMLTAG_81___
</ul>

<h3>OTLP プロトコル — 統合トランスポート</h3>

<p>OpenTelemetry Line Protocol (OTLP) は、メトリクス、ログ、トレースを転送するための統一プロトコルです。 OTLP は、gRPC (ポート 4317) と HTTP (ポート 4318) の両方をサポートします。 3 つの信号タイプすべてに単一のプロトコルを使用することで、ネットワーク構成、ファイアウォール ルール、負荷分散が大幅に簡素化されます。</p>

<h3>Kubernetes 用 OpenTelemetry オペレーター</h3><p>OpenTelemetry Operator は、OTel Collector と自動インストルメンテーションのデプロイメントと構成を管理する Kubernetes Operator です。 2 つの主要な CRD が提供されます:</p>
<ul>
  <li><strong>OpenTelemetryCollector</strong>: OTel Collector インスタンスのデプロイと構成</li>
  <li><strong>インストルメンテーション</strong>: ワークロードの自動インストルメンテーションを構成</li>
</ul>

___コードブロック_0___

<p>インストルメンテーション CRD を適用した後、ポッドにアノテーションを追加して自動インストルメンテーションを有効にするだけです:</p>

___コードブロック_1___

<h2>PLG スタックと EFK スタック</h2>

<p>Kubernetes のログ集約と可観測性のための 2 つの最も人気のあるスタックは、PLG (Prometheus + Loki + Grafana) と EFK (Elasticsearch + Fluentd/Fluent Bit + Kibana) です。どちらを選択するかは、特定の使用例によって異なります。</p>

<h3>PLG スタック — 軽量、安価、ラベルベース</h3>

<p>PLG スタックは、「コンテンツではなくラベルをインデックスする」という哲学を持つクラウドネイティブ環境向けに設計されています:</p>
<ul>
  <li><strong>Prometheus</strong>: 時系列でメトリクスを収集および保存</li>
  <li><strong>_Loki</strong>: ラベルベースのインデックス作成によるログ集計 (Prometheus に似ていますが、ログ用)</li>
  <li><strong>Grafana</strong>: すべてのデータ ソースの統合視覚化</li>
</ul>

<p>Loki はログ コンテンツにインデックスを付けない (ラベルのみ) ため、ストレージと運用のコストが Elasticsearch よりも大幅に低くなります。トレードオフとして、全文検索の機能は低下します。ただし、ほとんどのユースケース (サービス、名前空間、時間範囲、パターン マッチングによるクエリ) では、Loki が完全に適切です。</p>

<h3>EFK スタック — 全文検索、より重い</h3>

<p>全文検索と複雑な分析用に最適化されたEFKスタック:</p>
<ul>
  <li><strong>Elasticsearch</strong>: 全文インデックス付きログ ストレージ、検索に非常に強い</li>
  <li><strong>Fluentd/Fluent Bit</strong>: ログ コレクターおよびプロセッサ</li>
  <li><strong>Kibana</strong>: Elasticsearch の視覚化および検索 UI</li>
</ul>

<p>Elasticsearch はログ コンテンツ全体にインデックスを付け、非常に強力な全文検索を可能にします。ただし、これにはコストがかかります。Elasticsearch は RAM と CPU を大幅に消費し、HA を確保するには最低 3 ノードのクラスタが必要で、運用コストがはるかに高くなります。</p>

<h3>EFK を使用するのはどのような場合ですか?</h3>

<p>_次の場合に EFK を選択します:</p>
<ul>
  <li>ログ コンテンツの全文検索が必要です (たとえば、オプションでエラー メッセージによる検索)</li>
  <li>ログ データの複雑な集計と分析が必要</li>
  <li>チームには Elasticsearch の経験がある</li>
  <li>予算は問題ではないが、Elastic のエンタープライズ機能が必要</li>
</ul><p>ほとんどのチームにとって、2026 年の Kubernetes オブザーバビリティを実現するには、PLG スタックがより良い選択です。運用コストが低くなり、Prometheus エコシステムとの統合が向上し、オブジェクト ストレージのスケーラビリティが向上します。</p>

<h2>Grafana 合金 — 統合コレクター</h2>

<p>Grafana Alloy (2024 年から一般提供開始、Grafana Agent に代わる) は、以前のツールの多くを継承およびマージする統合テレメトリ コレクターです:</p>
<ul>
  <li>__HTMLTAG_169___Promtail</strong> (Loki のログ コレクター)</li> を置き換えます
  <li>置換 <strong>Prometheus リモート書き込みエージェント___HTMLTAG_174__HTMLTAG_175___
  <li>多くの使用例で__HTMLTAG_177___OTel Collector</strong>を置き換えます</li>
  <li>__HTMLTAG_181___Grafana エージェント</strong> (前任者)</li> を置き換えます
</ul>

<h3>リバー DSL 構成__HTMLTAG_186___

<p>_Alloy は、HCL (Terraform) に基づいた Grafana 独自の構成言語である River DSL を使用します。 River には、相互接続されたコンポーネントを含むパイプラインを宣言する機能があります:</p>

___コードブロック_2___

<h3>エージェントからメトリクス、ログ、トレースを収集</h3>

<p>3 ～ 4 つの個別の DaemonSet (Promtail、node-exporter、OTel Collector...) を実行する代わりに、Alloy を使用すると、それらすべてを処理する単一の DaemonSet を実行できます。これにより、</p> が最小限に抑えられます。
<ul>
  <li>各ノードで実行されているポッドの数</li>
  <li>コンテナ ランタイムのオーバーヘッド__HTMLTAG_197___
  <li>構成管理の複雑さ__HTMLTAG_199___
  <li>バックエンドへのネットワーク接続</li>
</ul>

<h2>推奨スタック 2026</h2>

<p>運用の現実とコミュニティの傾向に基づいて、2026 年に推奨される Kubernetes の可観測性スタックは次のとおりです:</p>

<h3>メインコンポーネント</h3>
<ul>
  <li><strong>メトリクス</strong>: Prometheus + kube-state-metrics + node-exporter</li>
  <li><strong>ログ</strong>: Loki (実稼働用のオブジェクト ストレージ バックエンドを使用)</li>
  <li><strong>トレース</strong>: グラファナ テンポ</li>
  <li><strong>視覚化</strong>: Grafana</li>
  <li><strong>コレクター</strong>: Grafana Alloy (ノードごとの DaemonSet)</li>
  <li><strong>計測標準</strong>: OpenTelemetry</li>
</ul>

<h3>アーキテクチャ フロー_</h3>

<p>このスタックのデータ フローは次のとおりです:</p>

___コードブロック_3___

<p>_このアーキテクチャの強みは、すべてのビジュアライゼーションが 1 つのドア、つまり Grafana を通過することです。 Grafana UI を離れることなく、メトリクス→ログ→トレースとドリルダウンでき、トレース ID または時間範囲によってデータを関連付けることができます。</p>

<h2>kube-prometheus-stack Helm チャート</h2><p>各コンポーネントを 1 つずつインストールする代わりに、__HTMLTAG_244___kube-prometheus-stack</strong> は統合されたオールインワン Helm チャートです:</p>
<ul>
  <li>プロメテウス オペレーター</li>
  <li>Prometheus インスタンス</li>
  <li>アラートマネージャー</li>
  <li>グラファナ</li>
  <li>kube-state-metrics__HTMLTAG_257___
  <li>ノードエクスポーター</li>
  <li>Kubernetes のデフォルトのダッシュボードとアラート ルール__HTMLTAG_261___
</ul>

___コードブロック_4___

<p>開始するための基本的なvalues.yamlファイル:</p>

___コードブロック_5___

<p>kube-prometheus-stack をインストールすると、Kubernetes クラスターの完全なメトリクスとアラートが得られます。次のステップでは、Loki (ログ) と Tempo (トレース) を追加して、可観測性スタックを完成させます。</p>

<h2>概要</h2>

<p>可観測性は後から追加できる機能ではありません。最初から設計する必要があります。 2026 年には、OpenTelemetry が誰もが認める標準となり、ほとんどの Kubernetes チームにとって、Grafana Alloy を使用した PLG スタックが最も現実的な選択肢となっています。</p>

<p>次のレッスンでは、各コンポーネントについて詳しく説明します:</p>
<ul>
  <li><strong>レッスン 29</strong>: Prometheus Operator、ServiceMonitor、PromQL、AlertManager</li>
  <li><strong>_レッスン 30</strong>: ロキ、テンポ、相関可観測性</li>
  <li><strong>レッスン 31</strong>: Kubernetes のデバッグとトラブルシューティング</li>
  <li><strong>_実践 7</strong>: スタック全体をデプロイし、エンドツーエンドで実践</li>
</ul>