---
id: 019d0001-1002-7002-b002-000000000002
title: 'エンジニアのための実践的脅威モデリング：60分で行うDFD上のSTRIDE'
slug: threat-modeling-stride-cho-engineer
excerpt: >-
  脅威モデリングは50ページのドキュメントである必要はありません。DFDレベル1、STRIDE、
  リスクレジスタを使う60分のセッションで、監査やペンテストでよく見つかる設計上の
  欠陥クラスを十分に防げます。
featured_image: /images/blog/threat-modeling-stride-featured.webp
type: blog
reading_time: 9
view_count: 0
meta: null
published_at: '2026-05-08T00:00:00.000000Z'
created_at: '2026-05-08T00:00:00.000000Z'
author:
  id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf
  name: Duy Tran
  avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg
category:
  id: 019c9616-cat5-7005-a005-000000000005
  name: セキュリティ
  slug: security
tags:
  - name: devsecops
    slug: devsecops
  - name: threat-modeling
    slug: threat-modeling
  - name: stride
    slug: stride
  - name: secure-design
    slug: secure-design
comments: []
locale: ja
---
<blockquote>重大な脆弱性の大半は、コーディングではなく設計フェーズで生まれます。軽量な脅威モデリングを早期に行い、オーナーを明確にする方が、本番リリース後の100ページのペンテストレポートよりはるかに価値があります。</blockquote>

<h2 id="threat-model-la-gi">脅威モデリングとは？</h2>
<p>脅威モデリングはAdam Shostackの4つの問いに答えるプロセスです：</p>
<ol>
  <li><strong>What are we working on?</strong>——データフローダイアグラム（DFD）を描く。</li>
  <li><strong>What can go wrong?</strong>——STRIDEを適用して脅威を列挙する。</li>
  <li><strong>What are we going to do about it?</strong>——緩和策、または責任者を明確にしたうえでのリスク受容。</li>
  <li><strong>Did we do a good job?</strong>——実装後にレビューする。</li>
</ol>

<h2 id="stride-mot-phut-hieu">STRIDEを1分で理解する</h2>
<table>
  <thead><tr><th>脅威</th><th>違反する性質</th><th>例</th></tr></thead>
  <tbody>
    <tr><td>Spoofing（なりすまし）</td><td>認証</td><td>ユーザーのなりすまし、トークンの再利用</td></tr>
    <tr><td>Tampering（改ざん）</td><td>完全性</td><td>リクエストの改変、DB上のデータ改ざん</td></tr>
    <tr><td>Repudiation（否認）</td><td>否認防止</td><td>行為を証明できる十分な監査ログがない</td></tr>
    <tr><td>Information disclosure（情報漏洩）</td><td>機密性</td><td>PIIの漏洩、ログ経由でのキー漏洩</td></tr>
    <tr><td>Denial of service（サービス拒否）</td><td>可用性</td><td>ブルートフォース、Slowloris、高コストクエリ</td></tr>
    <tr><td>Elevation of privilege（権限昇格）</td><td>認可</td><td>IDOR、サンドボックス脱出、コンテナブレイクアウト</td></tr>
  </tbody>
</table>

<h2 id="ve-dfd-dung-cap">適切な粒度でDFDを描く</h2>
<p>DFDに必要な4種類の要素：</p>
<ul>
  <li><strong>外部エンティティ</strong>：ユーザー、サードパーティAPI。</li>
  <li><strong>プロセス</strong>：サービス、関数。</li>
  <li><strong>データストア</strong>：DB、S3、キュー。</li>
  <li><strong>データフロー</strong>：要素間の矢印。</li>
</ul>
<p>最も重要なのが<strong>信頼境界（trust boundary）</strong>です：信頼レベルが異なる領域の境界（インターネット ↔ Webティア、アプリ ↔ DB、テナントA ↔ テナントB）。信頼境界をまたぐ各矢印は、認証・検証・暗号化が必要な地点です。</p>
<p>DFDレベル1（1サービス + 直接的な依存関係）から始めましょう。漠然としたレベル0や、深すぎるレベル3には踏み込まないでください——時間を浪費するわりに意思決定に役立つ情報は増えません。</p>

<h2 id="apply-stride-tren-tung-element">各要素にSTRIDEを適用する</h2>
<p>実用的なコツ：DFD上の各要素に対してSTRIDEの6つの問いを投げかけます。すべてのセルに脅威を埋める必要はなく、合理的でなければスキップで構いません。下記の表に記録します：</p>
<pre><code>| 要素              | 脅威 | 説明                                       | 緩和策                  | オーナー | 重要度 |
| ----------------- | ---- | ------------------------------------------ | ----------------------- | -------- | ------ |
| ログインエンドポイント | S    | アカウントへのブルートフォース             | レート制限 + MFA        | @team    | High   |
| ログインエンドポイント | I    | エラーメッセージ経由のユーザー列挙         | 汎用エラーメッセージ    | @team    | Medium |
| アップロードサービス  | T    | ストレージ上のファイル置換レース           | バージョニング + チェックサム | @team | Medium |
| 注文DB            | E    | /orders/{id} クエリでのIDOR                | オーナー単位の認可チェック | @team  | High   |
</code></pre>

<h2 id="cham-diem-rui-ro">リスクのスコアリング</h2>
<p>一般的な2つの方法：</p>
<ul>
  <li><strong>CVSS v3.1/v4</strong>：業界標準で、特定の脆弱性に適しており、共有用の標準ベクトルを持つ。</li>
  <li><strong>OWASP Risk Rating</strong>：シンプル（発生可能性 × 影響度）で、技術以外のステークホルダーにも説明しやすい。</li>
</ul>
<p>組織内で1つの方法を統一し、ハンドブックに明記しましょう。チームごとに独自のスケールを作らせると、比較ができなくなります。</p>

<h2 id="risk-register-la-tai-san-song">リスクレジスタは生きた資産</h2>
<p>脅威モデリングは1回限りのドキュメントではありません。リスクレジスタには次が必要です：</p>
<ul>
  <li>各リスクに対するオーナー。</li>
  <li>緩和策の期限、または受容理由。</li>
  <li>四半期ごと、または大きなアーキテクチャ変更のタイミングでのレビュー。</li>
  <li>イシュートラッカーとの紐付け（緩和策が実際のチケットになっていること）。</li>
</ul>

<h2 id="khi-nao-can-linddun-pasta">LINDDUNやPASTAはいつ必要か？</h2>
<p>デフォルトはSTRIDEで十分です。次のケースでは追加を検討します：</p>
<ul>
  <li><strong>LINDDUN</strong>：サービスが多くのPII/PHIを扱い、プライバシー観点の脅威モデリングが必要な場合（Linkability、Identifiability、Non-repudiation、Detectability、Disclosure、Unawareness、Non-compliance）。</li>
  <li><strong>PASTA</strong>：ビジネスリスクと深く結びついた脅威モデリングが必要で、7段階の正式プロセスが適しているクリティカルシステム（銀行、ヘルスケア）向け。</li>
</ul>

<h2 id="ket-luan">結論</h2>
<p>脅威モデリングは魔法ではありません。DFDレベル1、STRIDEチェックリスト、リスクレジスタを使う60分のセッションだけで、サービスは設計上の欠陥の大半を回避できます。定期的に繰り返し、オーナーを明確にし、ADRに紐付ける——これが脅威モデリングを年次イベントではなく技術的な習慣に変える方法です。</p>
