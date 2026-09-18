---
id: 019d0001-1001-7001-b001-000000000001
title: 'DevSecOpsとシフトレフト：なぜセキュリティはパイプラインの中で動くべきなのか'
slug: devsecops-shift-left-mindset
excerpt: >-
  シフトレフトとは開発者に作業を押し付けることではありません。欠陥が生まれる場所の近くで
  セキュリティ制御を自動化し、チームが素早く修正でき、セキュリティをシステムの既定の
  プロパティにすることが目的です。
featured_image: /images/blog/devsecops-shift-left-featured.webp
type: blog
reading_time: 8
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
  - name: shift-left
    slug: shift-left
  - name: sdlc
    slug: sdlc
  - name: security
    slug: security
comments: []
locale: ja
---
<blockquote>多くの組織では、セキュリティレビューはいまだに本番リリース前の最後のゲートです。その時点で脆弱性を修正するコストは、コードレビューで発見した場合の30〜100倍になります。シフトレフトはこの問題を解決します——最終チェックを廃止するのではなく、ライフサイクルの前段階に制御を移すことによって。</blockquote>

<h2 id="why-shift-left">なぜシフトレフトが必要か？</h2>
<p>「ゲートとしてのセキュリティ」モデル——SDLCの最後で手動レビューを行う方式——は、現代のリリースペースに対応できません。CI/CDチームが1日に何度もデプロイする状況で、1人のセキュリティエンジニアが全プルリクエストをレビューするのを待つことはできません。よくある症状は次のとおりです：</p>
<ul>
  <li>セキュリティがボトルネックになり、開発チームがバイパスする方法を探し始める。</li>
  <li>欠陥の発見が遅れ、修正コストが高く、時にはアーキテクチャの再設計が必要になる。</li>
  <li>監査レポートは長文でも、システムの実態を反映していない。</li>
</ul>
<p>シフトレフトは<em>最終検査</em>を<em>継続的なガードレール</em>に置き換えます：SDLCの各ステージに適切な自動セキュリティ制御を配置し、開発者が作業しているまさにその場でフィードバックを返します。</p>

<h2 id="what-shift-left-is-not">シフトレフトとは何ではないか</h2>
<ul>
  <li><strong>すべての責任を開発者に押し付けることではない。</strong>開発者がコードを書きますが、セキュリティチームはツール、ルールセット、脅威モデリングテンプレート、メンタリングを提供します。セキュリティチャンピオンモデルは知識をスケールさせる仕組みです。</li>
  <li><strong>最終段階のペネトレーションテストを廃止するわけではない。</strong>ペンテスト、レッドチーム、バグバウンティはロジックバグや0-day対策として依然として必要です。シフトレフトは単に、ペンテスターに届く基本的な検出件数を減らすだけです。</li>
  <li><strong>すべてのツールを一度に有効化することではない。</strong>100リポジトリでSAST + DAST + SCA + シークレットスキャンを1週間で同時にオンにすると、アラート疲労を生み出し、合意形成が崩壊します。</li>
</ul>

<h2 id="control-map">SDLC全体の制御マップ</h2>
<table>
  <thead><tr><th>ステージ</th><th>典型的な制御</th><th>ツール例</th></tr></thead>
  <tbody>
    <tr><td>要件</td><td>軽量な脅威モデリング、悪用ケース</td><td>OWASP Threat Dragon、Microsoft TMT</td></tr>
    <tr><td>設計</td><td>セキュアデザインレビュー、データ分類</td><td>Architecture Decision Record (ADR)</td></tr>
    <tr><td>コード</td><td>リンター、SAST、プリコミットでのシークレットスキャン</td><td>Semgrep、Gitleaks、ESLintセキュリティプラグイン</td></tr>
    <tr><td>ビルド</td><td>SCA、SBOM、コンテナスキャン、署名</td><td>Trivy、Grype、Syft、Cosign</td></tr>
    <tr><td>デプロイ</td><td>IaCスキャン、アドミッションポリシー</td><td>Checkov、Kyverno、OPA Gatekeeper</td></tr>
    <tr><td>ランタイム</td><td>WAF、ランタイム検知、監査ログ</td><td>Falco、Cilium Tetragon、SIEM</td></tr>
    <tr><td>運用</td><td>定期的なDAST、IR、ポストモーテム</td><td>OWASP ZAP、PagerDuty、Sigma</td></tr>
  </tbody>
</table>

<h2 id="bat-dau-tu-dau">何もない場合、どこから始めるか？</h2>
<p>コスト/効果のトレードオフに基づく優先順位：</p>
<ol>
  <li><strong>シークレットスキャン</strong>をプリコミットとCIで実施。安価で素早い勝利が得られ、最もコストが高い種類のインシデントを防げます。</li>
  <li><strong>SCA + SBOM</strong>でシステムが使用しているパッケージを把握する。新しいCVEが公開されたとき、「自分たちは影響を受けるか？」に数日ではなく数分で答えられます。</li>
  <li><strong>ブランチ保護 + コミット署名 + GitHub ActionのSHAピン留め。</strong>ほぼゼロコストでパイプライン攻撃から防御できます。</li>
  <li>最重要サービスに対する<strong>1ページの脅威モデリング</strong>。シンプルなDFD上のSTRIDEだけでも、設計上の欠陥クラス全体を防げます。</li>
  <li>そのうえでSAST、DAST、コンテナ、IaCスキャンに拡張します。</li>
</ol>

<h2 id="ket-noi-voi-maturity-model">成熟度モデルとの接続</h2>
<p>現状把握と次のステップを明確にするために、<strong>OWASP SAMM 2.0</strong>または<strong>BSIMM</strong>で5〜15の重要プラクティスをスコアリングします。目標はすべてをLevel 3にすることではなく、四半期ごとに2〜3の優先領域をLevel 1からLevel 2に引き上げることです。メトリクスとOKR（脆弱性のMTTR、スキャンカバレッジ、脅威モデリングを持つサービスの割合）を組み合わせれば、リーダーシップに価値が見えて投資が継続されます。</p>

<h2 id="ket-luan">結論</h2>
<p>シフトレフトはツールではなく戦略です。目標はセキュリティを<em>自動化されたガードレール</em>に変えること——メトリクス、オーナー、欠陥発生時のフィードバックを備えたものに。素早い勝利（シークレット、SCA、ブランチ保護）から始め、成熟度に応じて拡張します。定着すれば、セキュリティはリリースを止めるゲートではなく、パイプラインの自然なリズムになります。</p>
