---
id: 019d0001-1003-7003-b003-000000000003
title: 'SAST、SCA、シークレットスキャン：あらゆるCIパイプラインに必要な3つの最低レイヤー'
slug: sast-sca-secret-scanning-pipeline
excerpt: >-
  DAST、IAST、サプライチェーンを語る前に、すべてのパイプラインには3つの基本レイヤーが
  必要です：コードに対するSAST、依存関係に対するSCA、キー/トークンに対するシークレット
  スキャン。本記事ではSemgrep、Trivy、Gitleaksで3レイヤーを構築する方法を解説します。
featured_image: /images/blog/sast-sca-secret-pipeline-featured.webp
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
  - name: sast
    slug: sast
  - name: sca
    slug: sca
  - name: secret-scanning
    slug: secret-scanning
  - name: ci-cd
    slug: ci-cd
comments: []
locale: ja
---
<blockquote>本番環境のすべてのパイプラインには、3つの自動スキャンレイヤーが必要です。1つでも欠けていれば、インシデントの振り返りで「なぜもっと早く検知できなかったのか？」と説明する時間に多くを費やすことになります。</blockquote>

<h2 id="ba-lop-toi-thieu">3つの最低レイヤー——その理由</h2>
<table>
  <thead><tr><th>レイヤー</th><th>検出対象</th><th>代表的なツール</th></tr></thead>
  <tbody>
    <tr><td>SAST</td><td>ソースコードの脆弱性（SQLi、XSS、パストラバーサル、安全でないデシリアライゼーション）</td><td>Semgrep、CodeQL、SonarQube</td></tr>
    <tr><td>SCA</td><td>依存関係内のCVE、ライセンス違反</td><td>Trivy、Grype、Snyk、Dependency-Track</td></tr>
    <tr><td>シークレットスキャン</td><td>誤ってコミットされたAPIキー、トークン、秘密鍵</td><td>Gitleaks、Trufflehog、GitHub secret scanning</td></tr>
  </tbody>
</table>

<h2 id="sast-bat-dau-voi-semgrep">SAST：Semgrepから始める</h2>
<p>Semgrepは導入が容易で、オープンソースのルールセットが豊富、ルール記述の構文が実コードに近い特徴があります。最小構成のGitHub Actionsワークフロー：</p>
<pre><code class="language-yaml">name: semgrep
on:
  pull_request:
  push:
    branches: [main]
jobs:
  semgrep:
    runs-on: ubuntu-latest
    container: returntocorp/semgrep
    steps:
      - uses: actions/checkout@v4
      - run: semgrep ci --config=p/owasp-top-ten --baseline-ref=origin/main
</code></pre>
<p>2つの重要なコツ：</p>
<ul>
  <li><strong>ベースライン差分スキャン</strong>：PRでは新しい検出だけをブロックし、既存検出はオーナー付きでバックログに入れる。導入直後にビルドが大量に壊れるのを防ぎます。</li>
  <li><strong>カスタムルール</strong>：社内固有のパターンを止める5〜10ルールを書く（例：シークレットのログ出力、共通クライアントを介さない内部API呼び出し）。これが独自の価値を生み出します。</li>
</ul>

<h2 id="sca-trivy-grype-sbom">Trivy/Grype + SyftによるSCAとSBOM</h2>
<p>同一パイプラインでCycloneDX形式のSBOMを生成し、CVEをスキャン：</p>
<pre><code class="language-yaml">- name: Generate SBOM
  uses: anchore/sbom-action@v0
  with:
    format: cyclonedx-json
    output-file: sbom.cdx.json

- name: Scan SBOM with Grype
  uses: anchore/scan-action@v3
  with:
    sbom: sbom.cdx.json
    fail-build: true
    severity-cutoff: high
</code></pre>
<p>SBOMを<strong>OWASP Dependency-Track</strong>に投入してロングテールを追跡しましょう：新しいCVEが公開されると、ダッシュボードが影響を受けるプロジェクトを自動アラートします。SLAポリシーの参考例：</p>
<ul>
  <li>修正があるCRITICAL：7日以内に対応。</li>
  <li>修正があるHIGH：30日以内に対応。</li>
  <li>MEDIUM/LOW：四半期ごとにレビューし、受容またはバックログで対応。</li>
</ul>

<h2 id="secret-scanning-pre-commit-ci">シークレットスキャン：プリコミット + CI + リポジトリ全体</h2>
<p>3つのレイヤー：</p>
<ol>
  <li><code>gitleaks protect</code>を使った<strong>プリコミットフック</strong>：ローカルでコミットした瞬間にブロック。</li>
  <li>各PRでの<strong>CIスキャン</strong>：フックをバイパスしたコミットや、Web UIからのコミットを捕捉。</li>
  <li>定期的な<strong>リポジトリ全体の履歴スキャン</strong>：git logに残っている古いシークレットを発見。</li>
</ol>
<p>シークレット漏洩を検出した場合：</p>
<ul>
  <li><strong>ステップ1——漏洩したものとみなす</strong>：履歴削除に頼らず、即座にキー/トークンをローテーション。</li>
  <li><strong>ステップ2</strong>：使用状況を監査（CloudTrail、Vault監査ログ）し、異常な挙動がないか確認。</li>
  <li><strong>ステップ3</strong>：パブリックリポジトリの場合、BFGまたは<code>git filter-repo</code>で履歴を整理。</li>
  <li><strong>ステップ4</strong>：同様のパターンが再発しないようプリコミットルールを追加。</li>
</ul>

<h2 id="quan-ly-secret-dung-cach">シークレットを正しく管理する</h2>
<p>理想は、コードがいかなる場合もシークレット（暗号文すら）を含まないことです。選択肢：</p>
<ul>
  <li>DBやキューに対する動的クレデンシャルを発行できる<strong>Vault / AWS Secrets Manager / Azure Key Vault</strong>。</li>
  <li><strong>Mozilla SOPS</strong>でシークレットファイルを暗号化してgitにコミットし、鍵をKMSに置く——GitOpsに適しています。</li>
  <li>GitHub Actionsとクラウド間の<strong>OIDCフェデレーション</strong>で長寿命のアクセスキーを完全に廃止。</li>
</ul>

<h2 id="canh-bao-alert-fatigue">注意：アラート疲労</h2>
<p>レガシーな100リポジトリで3レイヤーのスキャンを同時に有効化すると、初日に数千件の検出が出ます。結果として誰も対応せず、皆が無効化することに。安全な戦略：</p>
<ol>
  <li><strong>ベースラインモード</strong>を有効化：新規検出のみブロック。</li>
  <li>高い重要度（CRITICAL/HIGH）から始め、徐々に下げていく。</li>
  <li>専任の<strong>トリアージオーナー</strong>を置き、24時間以内に検出を適切なチームに振り分ける。</li>
  <li>唯一のKPIは重要度別のMTTRダッシュボード——実行したスキャン数ではない。</li>
</ol>

<h2 id="ket-luan">結論</h2>
<p>SAST + SCA + シークレットスキャンは、今週中に有効化できる中で最も安価で効果的なベースラインです。小さく始めましょう——1リポジトリ、1ルールセット、1プリコミットフック——MTTRを測定し、徐々に拡大します。3〜4ヶ月後には、これら3レイヤーが基本的な欠陥の大部分をブロックし、セキュリティチームは脅威モデリング、サプライチェーン、ランタイムにエネルギーを集中できます。</p>
