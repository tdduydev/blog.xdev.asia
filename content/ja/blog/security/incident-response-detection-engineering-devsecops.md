---
id: 019d0001-1007-7007-b007-000000000007
title: 'DevSecOpsにおける検知エンジニアリングとインシデントレスポンス'
slug: incident-response-detection-engineering-devsecops
excerpt: >-
  優れた防御に必要な3つの要素：構造化ログ、ATT&CKにマッピングされた検知ルール、訓練済みの
  IRランブック。本記事では、DevSecOpsチーム向けにdetection-as-codeとblamelessな
  ポストモーテムを構築する方法をまとめます。
featured_image: /images/blog/detection-ir-devsecops-featured.webp
type: blog
reading_time: 10
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
  - name: detection-engineering
    slug: detection-engineering
  - name: sigma
    slug: sigma
  - name: mitre-attack
    slug: mitre-attack
  - name: incident-response
    slug: incident-response
comments: []
locale: ja
---
<blockquote>ログがあることは検知があることを意味しません。アラートがあることは対応があることを意味しません。検知エンジニアリングとは、生のイベントを行動可能なシグナルに変換し、オーナーを置き、MTTD/MTTRを測定可能にするプロセスです。</blockquote>

<h2 id="logging-truoc-khi-noi-detection">検知の前にログを語る</h2>
<p>非構造化ログはスケールしません。4つの原則：</p>
<ul>
  <li>標準フィールドを持つ<strong>構造化JSON</strong>：<code>timestamp</code>、<code>service</code>、<code>env</code>、<code>request_id</code>、<code>user_id</code>（ハッシュ化/レダクト済み）、<code>action</code>、<code>result</code>。</li>
  <li>サービス、ゲートウェイ、キューを横断する<strong>相関ID</strong>——W3C Trace Contextを使用。</li>
  <li><strong>生のシークレット/PIIをログに出さない</strong>。共通SDKでstdoutに出力する前にレダクトする。</li>
  <li>機密性の高い操作（管理者操作、キーアクセス、データエクスポート）には<strong>独立した監査ログ</strong>——スキーマを分け、リテンションを長く（12〜36ヶ月）。</li>
</ul>

<h2 id="nguon-log-quan-trong">SIEMにストリームすべき重要ログソース</h2>
<table>
  <thead><tr><th>ソース</th><th>検知価値</th></tr></thead>
  <tbody>
    <tr><td>クラウド監査（CloudTrail、Activity Log）</td><td>異常なIAM、キー作成、見慣れないリージョン</td></tr>
    <tr><td>K8s監査ログ（Metadataレベル）</td><td>RBAC変更、Podへのexec、シークレットアクセス</td></tr>
    <tr><td>IDプロバイダ（Okta、Azure AD）</td><td>ブルートフォース、不可能な移動、MFAバイパス</td></tr>
    <tr><td>アプリケーション監査ログ</td><td>権限昇格、大量のデータエクスポート</td></tr>
    <tr><td>Falco / Tetragon</td><td>コンテナのランタイム挙動</td></tr>
    <tr><td>WAF、CDN、ゲートウェイ</td><td>ブルートフォース、スクレイピング、異常検知</td></tr>
  </tbody>
</table>

<h2 id="sigma-detection-as-code">Sigma：detection-as-code</h2>
<p>SigmaはSIEM非依存で検知ルールを記述するためのYAML標準フォーマットです（Splunk SPL、ELK Lucene、Sentinel KQLなどに変換可能）。例：</p>
<pre><code class="language-yaml">title: K8s exec into production pod
id: 1f0e3aa8-...
status: stable
logsource:
  product: kubernetes
  service: audit
detection:
  selection:
    verb: create
    objectRef.subresource: exec
    objectRef.namespace|startswith: prod-
  condition: selection
level: high
tags:
  - attack.execution
  - attack.t1609   # container administration command
</code></pre>
<p>ルールをgitに保存し、PRでレビューし、CIテスト（陽性/陰性ケース）を持つ。これが<strong>detection-as-code</strong>です。</p>

<h2 id="map-mitre-attack">MITRE ATT&CKへのマッピング</h2>
<p>ATT&CKは攻撃者の行動をtactic（目標）とtechnique（手法）に分類します。検知をATT&CKにマッピングするメリット：</p>
<ul>
  <li>どのtacticで検知が不足しているかが分かる（例：Initial Accessは強いがLateral Movement、Exfiltrationは弱いなど）。</li>
  <li>脅威インテリジェンスとの照合：自業界を狙うAPTグループが使うtechnique → 該当する検知を優先。</li>
  <li>リーダーシップへの明確なカバレッジレポート：「自社スタックに関連するtechniqueの65%をカバー」。</li>
</ul>

<h2 id="ir-runbook-tabletop">IRランブックとテーブルトップ演習</h2>
<p>NIST PICERLサイクル：Preparation → Identification → Containment → Eradication → Recovery → Lessons learned。各ランブックには次が必要です：</p>
<ul>
  <li><strong>重要度マトリクス</strong>：SEV1/2/3とSLAレスポンス。</li>
  <li>明確な<strong>オンコールローテーション</strong>とエスカレーションパス。</li>
  <li><strong>コミュニケーションテンプレート</strong>：ステータスページ、顧客通知、規制当局通知（政令13/2023/NĐ-CP：72時間）。</li>
  <li><strong>証拠の保全</strong>：ディスク/メモリのスナップショット、ログコピー、監査証跡のエクスポート——削除/復旧の<em>前に</em>実施。</li>
  <li>インシデント種別ごとの<strong>封じ込めプレイブック</strong>：シークレット漏洩、アカウント侵害、ランサムウェア、データ流出。</li>
</ul>
<p>四半期に1〜2回、各回60〜90分のテーブルトップ演習を、現実的な1シナリオで実施しましょう。測定指標：検知時間（MTTD）、封じ込め時間（MTTC）、復旧時間（MTTR）。</p>

<h2 id="post-mortem-blameless">Blamelessなポストモーテム</h2>
<p>目的は罰する人を探すことではなく、インシデントを許した<em>システム条件</em>を見つけることです。テンプレート例：</p>
<ul>
  <li><strong>サマリー</strong>（3〜5行）。</li>
  <li><strong>タイムライン</strong>：誰が、何を、いつ（UTCタイムスタンプで）。</li>
  <li><strong>影響</strong>：ユーザー、データ、財務。</li>
  <li><strong>根本原因</strong>：寄与要因（通常は1つではなく複数）。</li>
  <li><strong>うまくいったこと</strong>：強化のため、良い点も認める。</li>
  <li><strong>アクションアイテム</strong>：オーナーと現実的な期限を持ち、スプリントバックログに入れる。</li>
</ul>
<p>Blameless文化はリーダーシップによる保護が必要です——報告者が罰せられるなら、次回から誰も正直に語らなくなります。</p>

<h2 id="bug-bounty-purple-team">バグバウンティとパープルチーム</h2>
<p>社内検知の補完：</p>
<ul>
  <li><code>security.txt</code> + <code>security@</code>メールによる<strong>責任ある開示</strong>：安価で無料。</li>
  <li>HackerOne/Intigriti、または国内プラットフォームでの<strong>バグバウンティ</strong>：明確なスコープと報酬。</li>
  <li><strong>パープルチーム演習</strong>：レッドチームが1つのtechniqueを実行し、ブルーチームが検知できるかを測定し、その後一緒にルールをチューニング。点数を競うのではなく、相互に学ぶ。</li>
</ul>

<h2 id="metric-can-do">測定すべきメトリクス</h2>
<ul>
  <li>インシデント種別ごとのMTTD。</li>
  <li>重要度別の脆弱性MTTRとSLA順守率。</li>
  <li>真陽性アラート率（アラート疲労の予防）。</li>
  <li>tacticごとのATT&CKカバレッジ。</li>
  <li>テーブルトップ実施頻度、ポストモーテムからのアクションアイテム期限内完了率。</li>
</ul>

<h2 id="ket-luan">結論</h2>
<p>検知エンジニアリングとIRは、DevSecOpsとSOCが交差する場所です。ルールをコードとして扱い（Sigma + git + CI）、ランブックをプロダクトとして扱い（レビュー、バージョン管理、MTTR測定）、blameless文化を守りましょう。そうすれば、各インシデントはパニックを引き起こすイベントではなく、システム改善の燃料になります。</p>
