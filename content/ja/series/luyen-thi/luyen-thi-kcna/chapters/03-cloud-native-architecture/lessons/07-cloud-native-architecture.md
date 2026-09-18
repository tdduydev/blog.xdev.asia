---
id: kcna-d3-l07
title: 'レッスン7：クラウドネイティブアーキテクチャとデザインパターン'
slug: 07-cloud-native-architecture
description: >-
  クラウドネイティブの原則、マイクロサービスvsモノリス、Service Mesh、12-Factor
  App、イミュータブルインフラストラクチャとクラウドネイティブデザインパターン。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 7
section_title: "Domain 3: Cloud Native Architecture (16%)"
course:
  id: lt-kcna-series-001
  title: 'KCNA試験対策 — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai7-cloud-native.webp" alt="クラウドネイティブアーキテクチャ — マイクロサービスvsモノリス、12-Factor App" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="cloud-native">1. クラウドネイティブ — CNCFの定義</h2>

<p><strong>CNCF（Cloud Native Computing Foundation）</strong>によると、クラウドネイティブとは、パブリック、プライベート、ハイブリッドクラウドなどの動的環境でスケーラブルなアプリケーションを構築・実行する方法であり、<strong>コンテナ、マイクロサービス、宣言型API、イミュータブルインフラストラクチャ</strong>を活用します。</p>

<table>
<thead><tr><th>原則</th><th>意味</th><th>例</th></tr></thead>
<tbody>
<tr><td><strong>Containerized</strong></td><td>アプリと依存関係をパッケージ化</td><td>Dockerイメージ</td></tr>
<tr><td><strong>Dynamically orchestrated</strong></td><td>自動スケジューリング、スケーリング、自己修復</td><td>Kubernetes</td></tr>
<tr><td><strong>Microservices</strong></td><td>疎結合、単一責任</td><td>認証サービス、決済サービス</td></tr>
<tr><td><strong>Declarative APIs</strong></td><td>手順ではなく望ましい状態を記述</td><td>kubectl apply -f deployment.yaml</td></tr>
<tr><td><strong>Immutable infrastructure</strong></td><td>実行中のものは変更せず、置き換える</td><td>新イメージバージョン → ローリングアップデート</td></tr>
</tbody>
</table>

<h2 id="microservices-vs-monolith">2. マイクロサービスvsモノリス</h2>

<pre><code class="language-text">MONOLITH                          MICROSERVICES
─────────────────────             ──────────────────────────────
┌──────────────────┐              ┌────────┐ ┌────────┐ ┌─────┐
│  Auth    │  UI   │              │  Auth  │ │  Cart  │ │  UI │
│  Cart    │  API  │              │Service │ │Service │ │Svc  │
│  Payment │  DB   │              └────────┘ └────────┘ └─────┘
└──────────────────┘                   │          │         │
  Deploy as 1 unit                     └─── API Gateway ───┘
                                            │
                                       Client/Browser</code></pre>

<table>
<thead><tr><th>観点</th><th>モノリス</th><th>マイクロサービス</th></tr></thead>
<tbody>
<tr><td>デプロイ</td><td>一括デプロイ</td><td>サービスごとに独立</td></tr>
<tr><td>スケーリング</td><td>アプリ全体をスケール</td><td>ボトルネックのサービスのみスケール</td></tr>
<tr><td>複雑さ</td><td>低い（単一コードベース）</td><td>高い（分散システム）</td></tr>
<tr><td>障害分離</td><td>1つのバグで全体がダウン</td><td>障害はサービス内に限定</td></tr>
<tr><td>技術</td><td>単一スタック</td><td>ポリグロット（サービスごとに最適なツール）</td></tr>
</tbody>
</table>

<h2 id="12-factor">3. 12-Factor App</h2>

<p><strong>12-Factor App</strong>メソドロジーはクラウドネイティブアプリケーションのベストプラクティスを定義しています：</p>

<table>
<thead><tr><th>#</th><th>ファクター</th><th>クラウドネイティブでの実践</th></tr></thead>
<tbody>
<tr><td>1</td><td><strong>Codebase</strong></td><td>アプリごとに1リポジトリ、複数デプロイ</td></tr>
<tr><td>2</td><td><strong>Dependencies</strong></td><td>明示的に宣言（package.json、go.mod）</td></tr>
<tr><td>3</td><td><strong>Config</strong></td><td>環境変数に保存（ConfigMap、Secrets）</td></tr>
<tr><td>4</td><td><strong>Backing services</strong></td><td>DB、キャッシュ = URLで接続するアタッチドリソース</td></tr>
<tr><td>5</td><td><strong>Build/Release/Run</strong></td><td>厳密な分離（CIでビルド、CDでデプロイ）</td></tr>
<tr><td>6</td><td><strong>Processes</strong></td><td>ステートレスプロセス、状態は外部に保存</td></tr>
<tr><td>7</td><td><strong>Port binding</strong></td><td>ポート経由でサービスを公開（Webサーバーレイヤー不要）</td></tr>
<tr><td>8</td><td><strong>Concurrency</strong></td><td>プロセスモデルでスケール（HPA）</td></tr>
<tr><td>9</td><td><strong>Disposability</strong></td><td>高速起動、グレースフルシャットダウン</td></tr>
<tr><td>10</td><td><strong>Dev/Prod parity</strong></td><td>環境間で同じツール/サービスを使用</td></tr>
<tr><td>11</td><td><strong>Logs</strong></td><td>イベントストリームとして扱う（stdout、ファイルではない）</td></tr>
<tr><td>12</td><td><strong>Admin processes</strong></td><td>ワンオフの管理タスクをJobとして実行</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のポイント：</strong> ファクター3、6、9、11はKCNAの問題によく出ます。ファクター3（環境変数にconfig）→ ConfigMap/Secret。ファクター6（ステートレス）→ 外部ストレージを使う理由。ファクター11（ログはストリーム）→ stdout → ログアグリゲーター。</p></blockquote>

<h2 id="service-mesh">4. Service Mesh</h2>

<p>マイクロサービスが増えると、mTLS、リトライ、サーキットブレーカー、オブザーバビリティの管理が必要になります。<strong>Service Mesh</strong>は各Podに<strong>サイドカープロキシ</strong>を注入することでこの問題を解決します。</p>

<pre><code class="language-text">Without Service Mesh:          With Service Mesh (Istio):
  App A ──────────────► App B    App A ──► [Envoy] ──► [Envoy] ──► App B
  (manual TLS, retry code)         sidecar           sidecar
                                 (auto mTLS, metrics, retry, tracing)</code></pre>

<table>
<thead><tr><th>機能</th><th>Service Meshが提供するもの</th></tr></thead>
<tbody>
<tr><td>mTLS相互認証</td><td>サービス間のトラフィックを自動暗号化</td></tr>
<tr><td>トラフィック管理</td><td>カナリア、A/B、重み付きルーティング</td></tr>
<tr><td>オブザーバビリティ</td><td>自動メトリクス、トレーシング、アクセスログ</td></tr>
<tr><td>レジリエンス</td><td>リトライ、タイムアウト、サーキットブレーカー</td></tr>
</tbody>
</table>

<h2 id="cheatsheet">5. チートシート</h2>

<table>
<thead><tr><th>試験の質問</th><th>回答</th></tr></thead>
<tbody>
<tr><td>CNCFが定義するクラウドネイティブの要素は？</td><td>コンテナ、マイクロサービス、宣言型API、イミュータブルインフラ</td></tr>
<tr><td>12-Factorに従ってconfigをどこに保存すべき？</td><td>環境変数（ハードコードしない）</td></tr>
<tr><td>12-Factorに従ったログの扱い方は？</td><td>ストリームとして扱う（stdout/stderr）</td></tr>
<tr><td>Service MeshはPodに何を注入する？</td><td><strong>サイドカープロキシ</strong>（Envoy）</td></tr>
<tr><td>マイクロサービスはどの部分をスケールする？</td><td>ボトルネックのあるサービスのみ</td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習問題</h2>

<p><strong>Q1:</strong> 12-Factor Appメソドロジーに従って、アプリケーションはデータベース接続文字列をどのように保存すべきですか？</p>
<ul>
<li>A) ソースコードにハードコード</li>
<li>B) リポジトリにコミットされる設定ファイル</li>
<li>C) 環境変数として（Kubernetes ConfigMapまたはSecret） ✓</li>
<li>D) ビルド引数としてコンテナイメージに</li>
</ul>
<p><em>解説：ファクター3（Config）は「設定を環境に保存する」と述べています。Kubernetesでは、機密でない設定にはConfigMap、機密の値にはSecretを使用し、環境変数として注入します。</em></p>

<p><strong>Q2:</strong> マイクロサービスアーキテクチャでService Meshを使用する主な利点は何ですか？</p>
<ul>
<li>A) コンテナオーケストレーションのKubernetesを置き換える</li>
<li>B) アプリケーションコードを変更せずにインフラレベルのネットワーク機能（mTLS、リトライ、オブザーバビリティ）を提供する ✓</li>
<li>C) アプリケーション設定を保存する</li>
<li>D) コンテナ再起動時にアプリケーション状態を永続化する</li>
</ul>
<p><em>解説：Service Meshはサイドカープロキシを介して横断的関心事（セキュリティ、オブザーバビリティ、レジリエンス）をインフラ層に移動します。開発者は各サービスにリトライロジックやmTLSを実装する必要がありません。</em></p>

<p><strong>Q3:</strong> 「イミュータブルインフラストラクチャ」を従来のインフラストラクチャと区別する特徴は何ですか？</p>
<ul>
<li>A) サーバーは再起動されない</li>
<li>B) 実行中のシステムはインプレースで変更されるのではなく、置き換えられる ✓</li>
<li>C) 設定変更には手動承認が必要</li>
<li>D) インフラストラクチャはYAMLファイルのみで定義される</li>
</ul>
<p><em>解説：イミュータブルインフラストラクチャとは、実行中のコンテナを更新/パッチすることなく、新しいイメージをビルドしてデプロイし、古いコンテナを置き換えることを意味します。これにより構成のドリフトが排除され、再現性が向上します。</em></p>
