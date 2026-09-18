---
id: 019c9618-0101-7000-8000-c1147ba22e11
title: 'レッスン 10: 構成マップと秘密'
slug: bai-10-configmaps-va-secrets
description: ConfigMap で構成を管理し、Secret で機密データを管理します。不変の ConfigMaps/Secret、保存時のシークレット暗号化、AWS Secrets Manager、GCP Secret Manager、HashiCorp Vault から同期する外部シークレット Operator。
duration_minutes: 80
is_free: false
video_url: null
sort_order: 10
section_title: 'モジュール 3: 構成とストレージ'
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: 'Kubernetes: 基本から高度まで'
  slug: kubernetes-tu-co-ban-den-nang-cao
locale: ja
---
<h2>Kubernetes の ConfigMap とシークレット__HTMLTAG_1___

<p>実稼働環境では、アプリケーションはコンテナー イメージに設定をハードコーディングするのではなく、外部環境から設定を読み取る必要があります。 Kubernetes は、一般的な構成データ用の <strong>ConfigMap</strong> と機密データ用の <strong>Secret</strong> という 2 つの特殊なメカニズムを提供します。このレッスンでは、保存時の暗号化と外部機密管理システムとの統合など、両方について詳しく説明します。</p>

<img src="/storage/uploads/2026/03/k8s-configmaps-secrets-2026.webp" alt="ConfigMaps & Secrets trong Kubernetes" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h2>ConfigMaps: 構成データの管理</h2>

<h3>ConfigMap とは何ですか?</h3>

<p>ConfigMap は、キーと値の構成データを保存する Kubernetes オブジェクトです。このデータはコンテナー イメージから完全に分離されているため、イメージを再構築せずに構成を変更できます。 ConfigMap には、単純な文字列、複数行の構成ファイル、さらにはファイルの内容全体を含めることができます。</p>

<p>ConfigMap の一致:</p>
<ul>
  <li>アプリケーション環境変数 (データベース ホスト、ポート、機能フラグ)</li>
  <li>設定ファイルの内容 (nginx.conf、application.properties)</li>
  <li>コンテナのコマンドライン引数__HTMLTAG_23___
  <li>その他の機密性の低い構成__HTMLTAG_25___
</ul>

<h3>リテラル値から ConfigMap を作成</h3>

___コードブロック_0___

<h3>ファイルから ConfigMap を作成</h3>

___コードブロック_1___

<h3>ConfigMap YAML 定義</h3>

___コードブロック_2___

<h2>Pod で ConfigMap を使用する方法</h2>

<h3>1. ConfigMap</h3> からの環境変数

___コードブロック_3___

<h3>2. ConfigMap からのボリューム マウント</h3>

___コードブロック_4___

<h3>3. ConfigMap</h3> からのコマンドライン引数

___コードブロック_5___

<h2>秘密: 機密データの管理</h2>

<h3>シークレットとは何ですか?Base64 が暗号化されないのはなぜですか?</h3>

<p>Kubernetes の Secret には、パスワード、トークン、TLS 証明書などの機密データが保存されます。理解しておくべき重要な点が 1 つあります。<strong>シークレットは、デフォルトでは Base64 でのみエンコードされ、エンコードされていません</strong>。 Base64 は、テキスト チャネル経由でバイナリ データを送信するためのエンコードにすぎません。誰でも簡単にデコードできます。</p>

___コードブロック_6___

<p>これは、etcd または Kubernetes API 経由でシークレットを読み取る権限を持つ人は誰でも実際の値を確認できることを意味します。したがって、追加のセキュリティ層が必要になります。これについては後で説明します。</p>

<h3>シークレット タイプ_</h3>

<h4>1.不透明 (汎用) シークレット</h4>

___コードブロック_7___

___コードブロック_8___

<h4>2. TLS シークレット</h4>

___コードブロック_9___

___コードブロック_10___

<h4>3. Docker レジストリ シークレット</h4>

___コードブロック_11___

___コードブロック_12___

<h3>ポッドでのシークレットの使用</h3>

<h4>シークレットを環境変数としてマウント__HTMLTAG_62___

___コードブロック_13___

<h4>_シークレットをボリュームとしてマウント</h4>

___コードブロック_14___

<h2>不変の ConfigMap とシークレット</h2>

<h3>なぜ不変なのか</h3><p>数千の Pod を含む大規模なクラスターでは、ConfigMap/Secret が変更されるたびに、すべての kubelet に対する監視イベントがトリガーされます。これにより、kube-apiserver に大きな負荷がかかります。 Kubernetes 1.21 以降は、__HTMLTAG_70___不変の ConfigMap と Secrets</strong> をサポートしています。これは、実稼働クラスターにとって重要な最適化です。</p>

<p>不変の利点:</p>
<ul>
  <li>kube-apiserver のオフロード: kubelet の変更を監視する必要はありません</li>
  <li>安定性の向上: アプリケーションを破壊する可能性のある偶発的な更新を防止</li>
  <li>多数のポッドによるパフォーマンスの大幅な向上__HTMLTAG_81___
</ul>

___コードブロック_15___

___コードブロック_16___

___コードブロック_17___

<h2>保存時の秘密暗号化</h2>

<h3>デフォルトのストレージの問題</h3>

<p>_デフォルトでは、シークレットは Base64 プレーン テキストとして etcd に保存されます。 etcd または etcd のバックアップを読み取る権限を持つユーザーはすべて、すべてのシークレット値を表示できます。これは運用環境では重大なセキュリティ リスクです。</p>

<h3>暗号化構成</h3>

<p>Kubernetes は、__HTMLTAG_92___EncryptionConfiguration</code> を通じて保存時の暗号化をサポートします。これは、etcd に保存する前にリソースを暗号化する方法を指定する kube-apiserver の構成ファイルです。</p>

___コードブロック_18___

___コードブロック_19___

<h2>外部シークレット演算子</h2>

<h3>外部シークレット オペレーターが必要な理由</h3>

<p>保存時の暗号化により etcd のシークレットが保護されますが、問題はまだあります。シークレットは引き続き Kubernetes で管理されます。エンタープライズ環境では、シークレットは AWS Secrets Manager、HashiCorp Vault、GCP Secret Manager、Azure Key Vault で集中管理されることがよくあります。 <strong>外部シークレット オペレーター (ESO)</strong> は、外部システムから Kubernetes シークレットにシークレットを自動的に同期することで、この問題を解決します。</p>

<h3>設定外部シークレット演算子</h3>

___コードブロック_20___

<h3>SecretStore および ClusterSecretStore CRD</h3>

<p>ESO は、__HTMLTAG_108___SecretStore</strong> (名前空間スコープ) と <strong>ClusterSecretStore</strong> (クラスター全体) の 2 つの主要なタイプの CRD を使用します。ここで、外部シークレット バックエンドへの接続を構成します。</p>

<h4>AWS Secrets Manager の ClusterSecretStore__HTMLTAG_114___

___コードブロック_21___

___コードブロック_22___

<h4>AWS Secrets Manager から同期する外部シークレット</h4>

___コードブロック_23___

<h4>すべての AWS シークレットを同期</h4>

___コードブロック_24___

<h3>HashiCorp Vault のシークレットストア</h3>

___コードブロック_25___

___コードブロック_26___

___コードブロック_27___

<h2>ConfigMap とシークレットのベスト プラクティス__HTMLTAG_122___

<h3>1.シークレットを Git</h3> にコミットしないでください

___コードブロック_28___

<h3>2.シークレット用の RBAC</h3>

___コードブロック_29___

<h3>3.シークレットローテーション</h3>

___コードブロック_30___

<h3>4.シークレット名前空間の分離</h3>

___コードブロック_31___

<h3>5.シークレット アクセスの監査ログ</h3>

___コードブロック_32___

<h2>概要</h2><p>ConfigMaps と Secret は、Kubernetes の構成管理の基盤です。覚えておくべき重要な点:</p>

<ul>
  <li><strong>_ConfigMap</strong> (機密性のない構成用)、環境変数、ボリューム マウント、およびコマンド引数をサポート</li>
  <li><strong>Secret</strong> デフォルトのみ Base64 エンコード — 暗号化ではなく、追加のセキュリティ層が必要</li>
  <li><strong>不変</strong> ConfigMaps/Secret により、大規模クラスターのパフォーマンスが大幅に向上</li>
  <li><strong>EncryptionConfiguration</strong> AES-GCM/AES-CBC を使用して、etcd に保存されているシークレットを暗号化します</li>
  <li><strong>External Secrets Operator</strong> は本番環境に最適なソリューションです: Vault からの同期、AWS Secrets Manager、攻撃対象領域の削減__HTMLTAG_157___
  <li>RBAC を常に厳密に適用し、シークレットを Git にコミットせず、ローテーション計画を立てます</li>
</ul>