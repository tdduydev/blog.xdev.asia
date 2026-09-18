---
id: kcna-d1-l03
title: 'レッスン3：Service、ネットワーキング、ストレージ'
slug: 03-services-networking-storage
description: >-
  Serviceタイプ（ClusterIP、NodePort、LoadBalancer、ExternalName）。CoreDNSと
  サービスディスカバリー。PersistentVolume、PVC、ConfigMap、Secret。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 3
section_title: "Domain 1: Kubernetes Fundamentals (46%)"
course:
  id: lt-kcna-series-001
  title: 'KCNA試験対策 — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai3-services-networking.webp" alt="Kubernetes ServiceとNetworking — ClusterIP、NodePort、LoadBalancer" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="services">1. Serviceタイプ</h2>

<p>Podは一時的なIPを持ち、再起動時に変わります。<strong>Service</strong>はラベルセレクターを通じてPodグループへの安定した仮想IP（ClusterIP）とロードバランシングを提供します。</p>

<table>
<thead><tr><th>タイプ</th><th>到達可能範囲</th><th>ユースケース</th><th>実例</th></tr></thead>
<tbody>
<tr><td><strong>ClusterIP</strong></td><td>クラスター内部のみ</td><td>バックエンドマイクロサービス</td><td>決済サービス → DB</td></tr>
<tr><td><strong>NodePort</strong></td><td>外部からNodeIP:Port経由（30000-32767）</td><td>開発/テスト用アクセス</td><td>ベアメタル上のデモアプリ</td></tr>
<tr><td><strong>LoadBalancer</strong></td><td>クラウドLB経由で外部</td><td>クラウド上の本番アプリ</td><td>AWS/GCPインターネットトラフィック</td></tr>
<tr><td><strong>ExternalName</strong></td><td>外部サービスへのCNAMEエイリアス</td><td>外部DNSの統合</td><td>legacy-db.company.com</td></tr>
</tbody>
</table>

<pre><code class="language-text">External Traffic
      │
      ▼
[LoadBalancer]          ← cloud provider LB (AWS ELB, GCP)
      │
[NodePort :30080]       ← all nodes expose port 30080
      │
[ClusterIP 10.96.5.3]  ← virtual IP, iptables/IPVS routing
      │
 ┌────┴────┐
[Pod A] [Pod B]        ← matched by label selector</code></pre>

<blockquote><p><strong>試験のポイント：</strong> <strong>NodePort</strong>は自動的に<strong>ClusterIP</strong>を作成します。<strong>LoadBalancer</strong>は自動的に<strong>NodePort + ClusterIP</strong>を作成します。各タイプは下位タイプを継承します。</p></blockquote>

<h2 id="coredns">2. CoreDNSとサービスディスカバリー</h2>

<p><strong>CoreDNS</strong>はKubernetesクラスターのデフォルトDNSサーバーです。各Serviceに自動的にDNSレコードが登録されます。</p>

<pre><code class="language-text">DNS format: {service}.{namespace}.svc.cluster.local

例:
  namespace "production" 内のService "api":
  → api.production.svc.cluster.local
  → api.production.svc
  → api.production
  → api  (同じnamespace内のみ)</code></pre>

<table>
<thead><tr><th>DNSクエリ</th><th>解決先</th><th>利用可能な場所</th></tr></thead>
<tbody>
<tr><td><code>api</code></td><td>Service ClusterIP</td><td>同一namespace内のみ</td></tr>
<tr><td><code>api.production</code></td><td>Service ClusterIP</td><td>任意のnamespace</td></tr>
<tr><td><code>api.production.svc.cluster.local</code></td><td>Service ClusterIP</td><td>任意のnamespace（FQDN）</td></tr>
</tbody>
</table>

<h2 id="storage">3. ストレージ：PV、PVC、StorageClass</h2>

<pre><code class="language-text">Storage lifecycle:
                    STATIC                     DYNAMIC
                    ─────                      ───────
  Admin creates  → PersistentVolume     StorageClass (provision template)
  App requests   → PersistentVolumeClaim → SC auto-provisions PV
  Pod mounts     → PVC as volume</code></pre>

<table>
<thead><tr><th>概念</th><th>役割</th><th>作成者</th></tr></thead>
<tbody>
<tr><td><strong>PersistentVolume (PV)</strong></td><td>実際のストレージリソース（NFS、EBS、GCE Disk）</td><td>管理者またはダイナミックプロビジョナー</td></tr>
<tr><td><strong>PersistentVolumeClaim (PVC)</strong></td><td>サイズとアクセスモードを指定したストレージ要求</td><td>開発者/アプリ</td></tr>
<tr><td><strong>StorageClass</strong></td><td>PVCがあるときにPVを自動作成するテンプレート</td><td>管理者</td></tr>
</tbody>
</table>

<h3 id="access-modes">アクセスモード</h3>

<table>
<thead><tr><th>モード</th><th>略称</th><th>意味</th><th>例</th></tr></thead>
<tbody>
<tr><td>ReadWriteOnce</td><td><strong>RWO</strong></td><td>1ノードが読み書き</td><td>EBSボリューム、ローカルディスク</td></tr>
<tr><td>ReadOnlyMany</td><td><strong>ROX</strong></td><td>複数ノードが読み取り</td><td>NFS上の静的ファイル</td></tr>
<tr><td>ReadWriteMany</td><td><strong>RWX</strong></td><td>複数ノードが読み書き</td><td>NFS、EFS、GlusterFS</td></tr>
<tr><td>ReadWriteOncePod</td><td><strong>RWOP</strong></td><td>1つのPodのみ（v1.22+）</td><td>排他アクセスが必要な場合</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のポイント：</strong> AWS EBSは<strong>RWO</strong>のみサポートします。問題で複数Podの同時書き込みが要求される場合、NFS（RWX）が必要です。StatefulSetは通常、各Podに独自のPVCを持つRWOを使用します。</p></blockquote>

<h2 id="configmap-secret">4. ConfigMapとSecret</h2>

<table>
<thead><tr><th>リソース</th><th>用途</th><th>エンコーディング</th><th>Podへの注入方法</th></tr></thead>
<tbody>
<tr><td><strong>ConfigMap</strong></td><td>機密でない設定（URL、フラグ、環境ファイル）</td><td>プレーンテキスト</td><td>環境変数、ボリュームファイル、CLIの引数</td></tr>
<tr><td><strong>Secret</strong></td><td>機密データ（パスワード、APIキー、TLS証明書）</td><td>Base64（デフォルトでは暗号化されない）</td><td>環境変数（非推奨）、ボリュームマウント</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のポイント：</strong> Secretはbase64エンコードされただけで、<strong>暗号化されていません</strong>。etcdでSecretを暗号化するには、APIサーバーで<strong>Encryption Configuration</strong>を有効にする必要があります。試験では「encrypted」が誤りの選択肢としてよく使われます。</p></blockquote>

<h2 id="cheatsheet">5. チートシート</h2>

<table>
<thead><tr><th>試験の質問</th><th>回答</th></tr></thead>
<tbody>
<tr><td>クラウドでアプリを外部公開するには？</td><td><strong>LoadBalancer</strong>（またはIngress）</td></tr>
<tr><td>namespace "backend"のService "db"のDNS名は？</td><td><code>db.backend.svc.cluster.local</code></td></tr>
<tr><td>複数Pod間で共有ストレージが必要な場合は？</td><td>アクセスモード<strong>RWX</strong>のPV</td></tr>
<tr><td>デプロイ時にストレージを自動プロビジョニングするには？</td><td><strong>StorageClass</strong> + PVC</td></tr>
<tr><td>Secretはデフォルトで暗号化されている？</td><td><strong>いいえ</strong>、base64のみ</td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習問題</h2>

<p><strong>Q1:</strong> 開発者が「frontend」という別のnamespaceからバックエンドデータベースService「orders-db」にアクセスしたいと考えています。どのDNS名を使用すべきですか？</p>
<ul>
<li>A) orders-db</li>
<li>B) orders-db.default.svc.cluster.local</li>
<li>C) orders-db.backend.svc.cluster.local ✓</li>
<li>D) backend.orders-db.cluster.local</li>
</ul>
<p><em>解説：namespace間のDNSには完全な形式が必要です：{service}.{namespace}.svc.cluster.local。短縮名「orders-db」は同一namespace内でのみ機能します。</em></p>

<p><strong>Q2:</strong> ClusterIPとNodePortの両方を自動的に作成するServiceタイプはどれですか？</p>
<ul>
<li>A) ClusterIP</li>
<li>B) NodePort</li>
<li>C) LoadBalancer ✓</li>
<li>D) ExternalName</li>
</ul>
<p><em>解説：LoadBalancerはスーパーセットです。ClusterIP + NodePort + クラウドロードバランサーを作成します。NodePortはClusterIPを含みますが、ClusterIPは外部アクセスなしの単独です。</em></p>

<p><strong>Q3:</strong> Secretにデータベースパスワードが含まれています。開発者がパスワードは「暗号化されている」と主張しています。この主張は正しいですか？</p>
<ul>
<li>A) はい、Kubernetes SecretはAESで暗号化されている</li>
<li>B) いいえ、SecretはEncryption Configurationが有効でない限りbase64エンコードのみ ✓</li>
<li>C) はい、Secretはetcdの組み込み暗号化で暗号化されている</li>
<li>D) いいえ、Secretはプレーンテキストで保存される</li>
</ul>
<p><em>解説：デフォルトでは、Secretはetcdにbase64エンコードされた文字列として保存されます。これは暗号化ではありません。管理者はAPIサーバーでEncryptionConfigurationを構成して保存時の暗号化を有効にする必要があります。</em></p>
