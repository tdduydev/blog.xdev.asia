---
id: 019c9618-0303-7000-8000-c1147ba22e13
title: 'レッスン 20: 自動スケーリング'
slug: bai-20-autoscaling
description: CPU/メモリおよびカスタム メトリクスを備えた HPA (水平ポッド オートスケーラー)、VPA (垂直ポッド オートスケーラー)、インプレース ポッド リソース更新 (K8s 1.35 — 再起動せずに CPU/メモリを変更)、KEDA イベント駆動型自動スケーリング、クラスター オートスケーラー、および Karpenter。
duration_minutes: 100
is_free: false
video_url: null
sort_order: 20
section_title: 'モジュール 5: ワークロード管理'
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: 'Kubernetes: 基本から高度まで'
  slug: kubernetes-tu-co-ban-den-nang-cao
locale: ja
---
<h2>Kubernetes の自動スケーリング — HPA から Karpenter</h2>

<p>自動スケーリングは、Kubernetes でワークロードを実行する主な理由の 1 つです。トラフィックの増減に応じてリソースを手動で調整する代わりに、Kubernetes はさまざまなレベルで多くの自動スケーリング メカニズムを提供します。この記事では、従来の HPA から KEDA イベント駆動型スケーリング、最新のインプレース ポッド リソース更新、クラスター レベルのスケーリング用の Karpenter まで、自動スケーリング エコシステム全体について説明します。</p>

<img src="/storage/uploads/2026/03/k8s-autoscaling-2026.webp" alt="Kubernetes Autoscaling - HPA, VPA, Karpenter, KEDA" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h2>1.水平ポッドオートスケーラー (HPA)</h2>

<p><strong>HPA</strong> は、最も一般的な水平スケーリング メカニズムです。メトリクスに基づいて Pod レプリカの数を自動的に増減します。</p>

<h3>1.1 HPA (CPU およびメモリ付き)</h3>

___コードブロック_0___

<p>重要な注意: 使用率を計算するには、HPA がコンテナに <code>resources.requests</code> を設定する必要があります。リクエストが設定されていない場合、HPA は「その数の 70%」を認識できません。</p>

<h3>1.2 カスタム メトリクス API</h3>

<p>HPA は、カスタム メトリック API (通常は Prometheus アダプターによって提供されます) を介して任意のメトリックにスケールできます:</p>

___コードブロック_1___

<h3>1.3 スケールダウンクールダウン</h3>

スケールダウンのための <p><code>stabilizationWindowSeconds</code> は運用環境では非常に重要です。設定が低すぎると、短期間のトラフィックのスパイクによってクラスターがスケールアップしてから継続的にスケールダウンする (フラッピング) ことが発生します。ベスト プラクティス:</p>
<ul>
  <li>スケールアップ: <code>stabilizationWindowSeconds: 0</code> から <code>30</code> — トラフィックの増加に対する迅速な対応__HTMLTAG_33___
  <li>スケールダウン: <code>stabilizationWindowSeconds: 300</code> から <code>600</code> — ポッドを減らす前に 5 ～ 10 分待ちます__HTMLTAG_39___
</ul>

<h2>2.垂直ポッドオートスケーラー (VPA)</h2>

<p><strong>VPA</strong> は、実際の使用状況に基づいてコンテナの <code>requests</code> と <code>limits</code> を自動的に調整します。ポッドを追加するのではなく、各ポッドを「大きく」または「小さく」します。</p>

___コードブロック_2___

<h3>2.1 VPA モード</h3>

<ul>
  <li><strong>オフ</strong>: VPA は推奨事項を計算するだけであり、何も変更しません。 VPA Recommender からの提案を表示するために使用されます。</li>
  <li><strong>初期</strong>: VPA はポッドが新しく作成されるときにリソースを設定しますが、実行中のポッドは更新しません。</li>
  <li><strong>再作成</strong>: VPA はエビクトとポッドの再作成によって更新されます — 短いダウンタイムが発生します。</li>
  <li><strong>Auto</strong>: 再作成と同様に機能するようになりました。将来的には、インプレース更新が使用される予定です。</li>
</ul>

<h3>2.2 VPA の推奨事項を表示</h3>

___コードブロック_3___

<h3>2.3 VPA の制限__HTMLTAG_74___<ul>
  <li><strong>同じメトリックを持つ HPA と共存することはできません</strong>: HPA が CPU ごとにスケールする場合、VPA は同じデプロイメントの CPU を管理できません。ソリューション: HPA はカスタムメトリクスに従ってスケールし、VPA は CPU/メモリを管理します。または、VPA の代わりにインプレース更新を使用します。</li>
  <li><strong>ポッドを再起動する必要があります</strong>: 再作成/自動モードでは、各 VPA 更新はポッドの再起動になります。ステートフル アプリには適していません。</li>
  <li><strong>別途インストールする必要があります</strong>: VPA は Kubernetes では使用できません。Helm またはマニフェスト経由でインストールする必要があります。</li>
</ul>

<h2>3.ポッドリソースのインプレース更新 (K8s 1.35 GA)</h2>

<p>これは、最近の Kubernetes の最も重要な機能の 1 つです。再起動せずに、実行中のポッド <strong> の__HTMLTAG_92___resources.requests</code> および <code>resources.limits</code> を変更できる機能です</strong>.</p>

<h3>3.1 インプレース更新が重要な理由</h3>

<p>以前は、リソースを変更するたびにポッドの再起動が必要でした。これは次の場合には受け入れられませんでした:</p>
<ul>
  <li><strong>データベース ポッド</strong>: PostgreSQL、MySQL は再起動後にキャッシュをウォームアップする必要があります</li>
  <li><strong>_長時間実行される ML ジョブ</strong>: トレーニング ジョブには数時間かかり、再起動 = すべての進行状況が失われます</li>
  <li><strong>ステートフル アプリケーション</strong>: メモリ内状態のアプリケーション</li>
  <li><strong>JVM アプリケーション</strong>: Java アプリケーションには JIT ウォームアップ時間が必要</li>
</ul>

<h3>3.2 サイズ変更ポリシー</h3>

___コードブロック_4___

<p>_<code>restartPolicy</code>:</p> の 2 つの値
<ul>
  <li><strong>_必須ではありません</strong>: リソースはその場で変更でき、コンテナを再起動する必要はありません</li>
  <li><strong>RestartContainer</strong>: リソースを変更すると、コンテナの再起動がトリガーされます (それでもポッド全体は再起動されません)</li>
</ul>

<h3>3.3 インプレースサイズ変更の実行</h3>

___コードブロック_5___

<h3>3.4 導入時のインプレースサイズ変更__HTMLTAG_140___

___コードブロック_6___

___コードブロック_7___

<h2>4. KEDA — Kubernetes イベント駆動型自動スケーリング</h2>

<p><strong>_KEDA</strong> は、Kubernetes のイベント駆動型自動スケーリングを提供する CNCF 段階的プロジェクトです。 HPA と比較した最大の違い: KEDA は__HTMLTAG_146___ゼロまでスケール</strong> できます — イベントがなければポッドは存在しません。</p>

<h3>4.1 KEDA のインストール</h3>

___コードブロック_8___

<h3>4.2 ScaledObject — スケール展開</h3>

<p><strong>ScaledObject</strong> は KEDA の主要な CRD であり、デプロイメントおよび StatefulSet の HPA を置き換えます:</p>

___コードブロック_9___

<h3>4.3 ScaledJob — スケール ジョブ</h3>

<p><strong>ScaledJob</strong> は、タスク キューに最適な、イベント バッチごとに新しいジョブを作成します:</p>

___コードブロック_10___

<h3>4.4 人気の KEDA スケーラー__HTMLTAG_164___

___コードブロック_11___<h3>4.5 KEDA ゼロへのスケールとゼロからのスケールアップ</h3>

<p>ゼロへのスケールは KEDA のキラー機能です。24 時間 365 日実行されないワークロードの大幅なコスト削減:</p>

___コードブロック_12___

<p>KEDA がイベント (例: Kafka ラグ > 0) を検出すると、数秒で 0 から 1 にスケールします。その後、HPA (KEDA によって管理) は負荷に基づいてより高いスケールを続けます。</p>

<h2>5.クラスター オートスケーラー</h2>

<p><strong>クラスター オートスケーラー (CA)</strong> は、ポッドをスケジュールできない (ノードがいっぱい) 場合、またはノードが空である (リソースの無駄) 場合に、ノードを自動的に追加/削除します。</p>

___コードブロック_13___

<h2>6. Karpenter — 次世代のクラスター スケーリング</h2>

<p><strong>_Karpenter</strong> は、AWS のオープンソース ノード プロビジョナーであり、現在 Azure もサポートしています。これはクラスター オートスケーラーよりもはるかにスマートです。既存のノード グループを単にスケーリングするのではなく、Karpenter 自体が起動する最適なインスタンス タイプを決定します。</p>

<h3>6.1 ノードプール — ノード グループを置き換えます</h3>

___コードブロック_14___

<h3>6.2 EC2NodeClass</h3>

___コードブロック_15___

<h3>6.3 Karpenter とクラスター オートスケーラー__HTMLTAG_188___

<ul>
  <li><strong>起動時間</strong>: Karpenter は約 60 秒、CA は約 3 ～ 4 分 (CA は ASG をスケールしてから待機する必要があります)</li>
  <li><strong>インスタンスの選択</strong>: Karpenter は保留中の Pod に最適なインスタンス タイプを選択します。 CA は既存のグループのみをスケーリングします</li>
  <li><strong>_スポット中断処理</strong>: ビルトイン Karpenter、インスタンスが終了する前の正常なドレイン</li>
  <li><strong>ノードの統合</strong>: Karpenter は、Pod を削除してノードを終了することにより、空のノードまたは負荷の軽いノードを自動的に統合します__HTMLTAG_205___
  <li><strong>_コストの最適化</strong>: Karpenter は可能な場合はスポットを積極的に選択し、スポットが利用できない場合はオンデマンドにフォールバックします</li>
</ul>

<h3>6.4 スポット中断処理</h3>

___コードブロック_16___

<h2>7.組み合わせ戦略: HPA + KEDA + Karpenter</h2>

<p>本番環境では、スケーリング レイヤーを一緒に使用することがよくあります:</p>

<ul>
  <li><strong>_KEDA</strong>: イベント (Kafka ラグ、キューの深さ) に基づいてポッドを 0 から N にスケールします</li>
  <li><strong>HPA</strong>: KEDA がポッドを開始したときに CPU/メモリに基づいてスケーリングを微調整します</li>
  <li><strong>インプレース更新</strong>: 再起動せずに実行中のポッドのリソースを調整</li>
  <li><strong>Karpenter</strong>: ノード不足によりポッドをスケジュールできない場合、Karpenter は最適なノードを自動的にプロビジョニング__HTMLTAG_233___
</ul>

___コードブロック_17___

<p>効果的な自動スケーリングは、多くのメカニズムを適切に組み合わせたものです。各ツール (リソースベースのスケーリング用の HPA、イベント駆動型のスケーリング用の KEDA、ダウンタイムなしのリソース調整用のインプレース更新、インテリジェントなノード プロビジョニング用の Karpenter) を理解することは、応答性とコスト効率の両方を備えたシステムを構築するのに役立ちます。