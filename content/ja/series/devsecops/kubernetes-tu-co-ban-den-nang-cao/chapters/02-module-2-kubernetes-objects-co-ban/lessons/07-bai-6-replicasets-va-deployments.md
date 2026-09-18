---
id: 019c9618-0005-7000-8000-c1147ba22e10
title: 'レッスン 6: レプリカセットとデプロイメント'
slug: bai-6-replicasets-va-deployments
description: ReplicaSet と Deployment を使用して複数の Pod レプリカを管理します。ローリング アップデート、ロールバック、展開戦略 (再作成、ローリングアップデート、ブルー/グリーン、カナリア)。リビジョン履歴と安全にロールバックする方法を理解します。
duration_minutes: 90
is_free: false
video_url: null
sort_order: 6
section_title: 'モジュール 2: 基本的な Kubernetes オブジェクト'
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: 'Kubernetes: 基本から高度まで'
  slug: kubernetes-tu-co-ban-den-nang-cao
locale: ja
---
<h2>🎯 レッスンの目的</h2><p>ReplicaSet が Pod レプリカの数を確保する方法、デプロイメントが純粋な ReplicaSet よりも優れている理由、ローリング アップデートとロールバックを安全に実行する方法、および一般的なデプロイメント戦略を理解します。</p>

<img src="/storage/uploads/2026/03/k8s-deployment-rolling-update-2026.webp" alt="Kubernetes Deployment & Rolling Update Strategies" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h2>1.レプリカセット</h2>
<p>ReplicaSet は、指定された数のポッド レプリカが常に実行されるようにします。 Pod が削除されたりクラッシュした場合、ReplicaSet は新しい Pod を作成して補います。</p>
___コードブロック_0___
<p>ReplicaSet は、__HTMLTAG_10___ラベル セレクター</strong> を使用して、管理するポッドを認識します。ただし、ReplicaSet を直接作成することはほとんどなく、代わりに Deployment を使用します。</p>

<h2>2.導入 — ReplicaSet より優れているのはなぜですか?</h2>
<p>Deployment は ReplicaSet よりも高レベルの抽象化であり、次のことが可能です。</p>
<ul>
  <li><strong>宣言的な更新</strong>: 望ましい状態を宣言するだけで、残りはデプロイメントが処理します</li>
  <li><strong>ローリングアップデート</strong>: ダウンタイムゼロの導入</li>
  <li><strong>改訂履歴</strong>: 更新履歴を保存し、ロールバックを許可</li>
  <li><strong>一時停止/再開</strong>: ロールアウトは一時停止できます</li>
</ul>
___コードブロック_1___

<h2>3.ローリングアップデート</h2>
<p>ローリング アップデートでは、古いポッドが新しいポッドに徐々に置き換えられ、ダウンタイムが発生しません。</p>
___コードブロック_2___
<p><code>maxSurge あり: 2</code> および <code>max 利用不可: 5 つのレプリカで 1</code>:</p>
<ul>
  <li>最大 7 つのポッドが同時に存在します (5 + 2 サージ)</li>
  <li>最低 4 つのポッドが利用可能 (5 ～ 1 つは利用不可)</li>
  <li>Kubernetes は古いポッドの終了と並行して新しいポッドを作成します__HTMLTAG_51___
</ul>

<h2>4.戦略を再作成</h2>
<p>新しいポッドを作成する前に、古いポッドをすべて削除してください。 <strong>ダウンタイムはあります</strong> が、シンプルでバージョン管理の競合はありません。</p>
___コードブロック_3___
<p>次の場合に使用します: データベースの移行には単一のインスタンスが必要で、2 つのバージョンの並行実行は受け入れられません。</p>

<h2>5.改訂履歴とロールバック</h2>
___コードブロック_4___
<p>保存されるリビジョンの数は、__HTMLTAG_64___spec.revisionHistoryLimit</code> (デフォルトは 10) によって制御されます。</p>

<h2>6.ロールアウトの一時停止と再開</h2>
___コードブロック_5___

<h2>7.ブルー/グリーン展開</h2>
<p>新しいバージョンを古いバージョンと並行して展開し、すべてのトラフィックを新しいバージョンに転送します。</p>
___コードブロック_6___
___コードブロック_7___

<h2>8.カナリア デプロイメント</h2>
<p>テストのためにトラフィックの一部を新しいバージョンに送信します。</p>
___コードブロック_8___

<h2>9。スケーリング</h2>
___コードブロック_9___<h2>10.導入のアンチパターンは回避する必要があります</h2>
<ul>
  <li>❌ リソースのリクエスト/制限を設定しない → ノードに圧力がかかるとポッドが削除される</li>
  <li>❌ readinessProbe がありません → ポッドへのトラフィックの準備ができていません</li>
  <li>❌ <code>maxUnavailable: 0</code> および <code>maxSurge: 0</code> 同時に → 無効</li>
  <li>❌ <code>最新</code> 画像タグを使用 → 再現できません</li>
  <li>❌ <code>revisionHistoryLimit: 0</code> → ロールバックできません</li>
</ul>

<h2>概要</h2>
<ul>
  <li>Deployment は ReplicaSet を管理します。ReplicaSet を直接作成しないでください</li>
  <li>ローリング アップデート: ダウンタイムゼロ、maxSurge と maxUnavailable を調整</li>
  <li><code>kubectl ロールアウトを元に戻す</code></li> によるロールバック
  <li>青/緑: 即時切り替え、2 倍のリソースが必要__HTMLTAG_113___
  <li>_Canary: 段階的なロールアウト、レプリカ数によるトラフィック % の制御__HTMLTAG_115___
</ul>