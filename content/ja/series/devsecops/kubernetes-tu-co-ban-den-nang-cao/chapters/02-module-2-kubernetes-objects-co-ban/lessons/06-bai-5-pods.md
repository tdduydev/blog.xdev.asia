---
id: 019c9618-0004-7000-8000-c1147ba22e10
title: 'レッスン 5: ポッド'
slug: bai-5-pods
description: Kubernetes の基本的なデプロイメント単位である Pod について詳しく説明します。マルチコンテナ ポッド、サイドカー コンテナ GA (K8s 1.33)、Init コンテナ、デバッグ用の一時コンテナ、ポッドのライフサイクルおよびリソース管理。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 5
section_title: 'モジュール 2: 基本的な Kubernetes オブジェクト'
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: 'Kubernetes: 基本から高度まで'
  slug: kubernetes-tu-co-ban-den-nang-cao
locale: ja
---
<h2>🎯 レッスンの目的</h2><p>このレッスンを終えると、Pod が Kubernetes の最も基本的なユニットであること、Pod がネットワーク名前空間を共有する方法、Sidecar コンテナ (GA K8s 1.33)、Init コンテナ、デバッグ用の一時コンテナの使用方法、および Pod のライフサイクルとリソースの管理方法を理解できるようになります。</p>

<h2>1.ポッドとは何ですか?</h2>

<img src="/storage/uploads/2026/03/k8s-pod-lifecycle-2026.webp" alt="Kubernetes Pod Lifecycle Diagram" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<p>Pod は、Kubernetes の最小のスケジューリング単位です。ポッドは、同じノード上で実行され、共通に共有される<strong>1 つ以上のコンテナ</strong> で構成されます:</p>
<ul>
  <li><strong>ネットワーク名前空間</strong>: 同じ IP アドレス、同じポート空間 - コンテナは <code>localhost</code></li> を介して相互に通信します。
  <li><strong>ストレージ ボリューム</strong>: ポッドにマウントされたボリュームには多くのコンテナからアクセスできます</li>
  <li><strong>Linux 名前空間</strong> (構成による): PID 名前空間、IPC 名前空間</li>
</ul>
<p>コンテナを直接デプロイしてみませんか? Kubernetes はコンテナではなくポッドを管理します。ポッドは、密接に関連するプロセスをグループ化するのに役立つ抽象化レイヤーです。</p>

<h2>2.単純なポッドの例</h2>
___コードブロック_0___
___コードブロック_1___

<h2>3.マルチコンテナ ポッド</h2>
<p>マルチコンテナ Pod には 3 つの一般的なパターンがあります:</p>
<h3>3.1 サイドカー パターン</h3>
<p>セカンダリ コンテナはメイン コンテナ (ログ フォワーダー、プロキシ、OTel コレクター) をサポートします。</p>
<h3>3.2 アンバサダー パターン</h3>
<p>プロキシ コンテナは、メイン コンテナに代わって外部と通信します。</p>
<h3>3.3 アダプター パターン</h3>
<p>Container は、メイン コンテナからの出力を標準形式に正規化します。</p>

<h2>4.サイドカー コンテナ GA — K8s 1.33</h2>
<p>K8s 1.33 より前は、サイドカー コンテナが通常の初期化コンテナとして実装されていたため、ライフサイクルの問題が発生していました。メイン コンテナが終了しても、サイドカーはまだ実行中であり、ジョブは完了しませんでした。</p>
<p><strong>K8s ソリューション 1.33</strong>: 公式サイドカー コンテナーは <code>initContainer</code> で、__HTMLTAG_56___restartPolicy: Always</code> です。 Kubernetes は次のことを行います:</p>
<ul>
  <li>メイン コンテナの前にサイドカーを開始__HTMLTAG_61___
  <li>クラッシュした場合はサイドカーを再起動します (メイン コンテナとは独立して)</li>
  <li>メイン コンテナの終了後にサイドカーを終了</li>
  <li>サイドカーはジョブの完了をブロックしません</li>
</ul>
___コードブロック_2___
<p>Sidecar コンテナのユースケース: Grafana Alloy ログ エージェント、OpenTelemetry Collector、Envoy プロキシ (サービス メッシュ内)、Vault エージェント インジェクタ。</p><h2>5.コンテナの初期化</h2>
<p>Init コンテナは、メイン コンテナが起動する前に <strong>run-to-completion</strong> を実行します。使用目的:</p>
<ul>
  <li>アプリを開始する前にデータベースの準備ができるまで待ちます</li>
  <li>外部ソースから構成またはシークレットをダウンロード__HTMLTAG_81___
  <li>ファイル権限の設定、データベース移行</li>
</ul>
___コードブロック_3___

<h2>6.一時コンテナ — デバッグポッド</h2>
<p>エフェメラル コンテナを使用すると、Pod</strong> を再起動することなく、実行中の Pod にデバッグ コンテナをアタッチできます。 Pod がシェルなしで distroless イメージを使用する場合に非常に便利です。</p>
___コードブロック_4___

<h2>7.ポッドのライフサイクル</h2>
<p>Pod は次のフェーズを経ます:</p>
<ul>
  <li><strong>保留中</strong>: ポッドが作成されました。スケジューラがノードを選択するのを待っているか、イメージをプルしています</li>
  <li><strong>実行中</strong>: ポッドがノードにバインドされており、少なくとも 1 つのコンテナが実行中</li>
  <li><strong>成功</strong>: すべてのコンテナが正常に終了しました (終了 0)</li>
  <li><strong>失敗</strong>: 少なくとも 1 つのコンテナがエラーで終了しました (0 以外で終了)</li>
  <li><strong>不明</strong>: ポッドのステータスを取得できません (通常はノードの問題が原因です)</li>
</ul>
<p>ポッドの条件 (__HTMLTAG_118___kubectl によるポッド</code> から):</p>
<ul>
  <li><strong>PodScheduled</strong>: スケジューラが選択したノード</li>
  <li><strong>PodReadyToStartContainers</strong>: サンドボックスが作成され、ネットワークが構成されました</li>
  <li><strong>初期化</strong>: すべての初期化コンテナが正常に実行されました</li>
  <li><strong>ContainersReady</strong>: すべてのコンテナの準備が完了しました</li>
  <li><strong>_準備完了</strong>: ポッドはトラフィックを受信する準備ができています</li>
</ul>

<h2>8。リソースのリクエストと制限</h2>
___コードブロック_5___
<p><strong>Requests</strong> は、スケジューラが保証するリソースの量です。 <strong>制限</strong> は最大上限です。制限を超えた CPU はスロットルされ (強制終了されません)、制限を超えたメモリは OOMKilled されます。</p>

<h2>9. QoS クラス</h2>
<ul>
  <li><strong>保証</strong>: すべてのコンテナに対するリクエスト == 制限。優先度が最も高く、ノードにメモリ不足がある場合は削除されません。</li>
  <li><strong>_バースト可能</strong>: リクエスト <;限界。限界。ノードにメモリが不足している場合に削除される可能性があります。</li>
  <li><strong>BestEffort</strong>: リクエスト/制限はありません。ノードにリソースが不足している場合は、最初にエビクトします。</li>
</ul><h2>10.プローブ — ヘルスチェック</h2>
___コードブロック_6___
<ul>
  <li><strong>livenessProbe</strong>: ポッドが失敗した場合は再起動されます</li>
  <li><strong>readinessProbe</strong>: 失敗した場合 (トラフィックを受信しない場合)、ポッドはサービス エンドポイントから削除されます</li>
  <li><strong>startupProbe</strong>: 起動が遅いアプリに使用され、待機中に liveness/readiness プローブをオフにします</li>
</ul>

<h2>11.静的ポッド</h2>
<p>静的ポッドは、API サーバーを経由せずに、__HTMLTAG_186___/etc/kubernetes/manifests/</code> の YAML ファイルから kubelet によって直接作成されます。 Kubernetes コントロール プレーン コンポーネント (kube-apiserver、etcd、スケジューラー、コントローラー マネージャー) は、マスター ノード上で静的ポッドとして実行されます。</p>

<h2>概要</h2>
<ul>
  <li>Pod = ネットワークとストレージを共有するコンテナのグループ</li>
  <li>サイドカー コンテナ (K8s 1.33 GA): <code>initContainer</code> (__HTMLTAG_197___restartPolicy 付き): 常に</code></li>
  <li>初期コンテナ: メイン コンテナの前の実行から完了まで</li>
  <li>一時的なコンテナ: 再起動せずにポッドをデバッグ__HTMLTAG_203___
  <li>_実稼働ワークロードのリソース要求/制限を常に設定__HTMLTAG_205___
  <li>readinessProbe を使用してトラフィックを制御し、livenessProbe を使用して自動再起動</li>
</ul>