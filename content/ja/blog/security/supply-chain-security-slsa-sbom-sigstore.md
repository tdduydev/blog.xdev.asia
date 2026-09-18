---
id: 019d0001-1006-7006-b006-000000000006
title: 'サプライチェーンセキュリティ：本番アーティファクトのためのSLSA、SBOM、Sigstore'
slug: supply-chain-security-slsa-sbom-sigstore
excerpt: >-
  xz、npmタイポスクワット、ビルドポイズニングを経て、サプライチェーン攻撃は最も一般的な
  攻撃ベクトルになりました。SLSA + SBOM + Sigstoreは、アーティファクトがどこから、
  何を使い、誰によってビルドされたかを証明するためのオープンスタンダードな三本柱です。
featured_image: /images/blog/supply-chain-slsa-sigstore-featured.webp
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
  - name: supply-chain
    slug: supply-chain
  - name: slsa
    slug: slsa
  - name: sbom
    slug: sbom
  - name: sigstore
    slug: sigstore
comments: []
locale: ja
---
<blockquote>現在の監査で最も難しい質問は、「コードにCVEはないか？」ではなく、「本番で稼働しているアーティファクトが、改ざんなくこのソースからビルドされたことをどう証明するか？」です。</blockquote>

<h2 id="ba-loai-supply-chain-attack">代表的な3種類のサプライチェーン攻撃</h2>
<ul>
  <li><strong>依存関係の取り違え / タイポスクワット</strong>（npm、pypi、RubyGems）：社内ライブラリと似た名前のパッケージを公開する手口。</li>
  <li><strong>ソースの侵害</strong>（xz utils、Codecov bash uploader）：上流プロジェクトに悪意あるコードを注入する手口。</li>
  <li><strong>ビルドポイズニング</strong>（SolarWinds）：ビルドサーバを侵害し、ソースコードはクリーンなままアーティファクトに注入する手口。</li>
</ul>
<p>標準的な対応フレームワークは、OpenSSFがメンテナンスする<strong>SLSA</strong>（Supply-chain Levels for Software Artifacts）です。</p>

<h2 id="slsa-cap-do">SLSA——ビルド完全性の4段階</h2>
<table>
  <thead><tr><th>レベル</th><th>主な要件</th></tr></thead>
  <tbody>
    <tr><td>L1</td><td>ビルドが文書化されており、基本的なprovenanceを生成。</td></tr>
    <tr><td>L2</td><td>ホスト型CIでのビルド、provenanceに署名、ソースはバージョン管理。</td></tr>
    <tr><td>L3</td><td>分離・ハードニングされた環境でのビルド、ユーザーがprovenanceを偽造できない。</td></tr>
    <tr><td>L4</td><td>密閉的（hermetic）かつ再現可能なビルド、2者レビュー。</td></tr>
  </tbody>
</table>
<p>多くの組織にとっての現実的な目標は<strong>SLSA Build L2-L3</strong>です。L4はまだ稀でコストもかかります。</p>

<h2 id="sbom-cyclonedx-spdx">SBOM：CycloneDXとSPDX、どちら？</h2>
<p>2つの標準フォーマット：</p>
<ul>
  <li><strong>CycloneDX</strong>（OWASP）：セキュリティユースケースに重点を置き、脆弱性、サービス、MLモデルをサポート。ツールエコシステムが豊富（Trivy、Syft、Dependency-Track）。</li>
  <li><strong>SPDX</strong>（Linux Foundation）：ライセンスコンプライアンス重視で、多くの規制当局に受け入れられている（米国EO 14028）。</li>
</ul>
<p>主軸となる1つを選び、必要に応じてもう一方の形式へエクスポートしましょう。各本番アーティファクトには、CIで自動生成されたSBOMがアーティファクトと一緒に保存されている必要があります。</p>

<h2 id="sigstore-keyless">Sigstore：あらゆるアーティファクトに対するキーレス署名</h2>
<p>Sigstoreは3つのコンポーネントで構成されます：</p>
<ul>
  <li><strong>Cosign</strong>：イメージ、blob、attestationの署名/検証CLI。</li>
  <li><strong>Fulcio</strong>：OIDCアイデンティティに基づく短命証明書（TTL 5分）を発行するCA。</li>
  <li><strong>Rekor</strong>：すべての署名を保存する不変な透明性ログ——あなたのアイデンティティで作成された不審な署名がないかを確認できます。</li>
</ul>
<p>最大のメリット：保管・ローテーション・バックアップが必要な秘密鍵が存在しません。</p>

<h2 id="provenance-in-toto">Provenanceとin-toto attestation</h2>
<p>Provenanceは<em>誰が、どのソースから、どのツールで、いつビルドしたか</em>を記述するメタデータです。標準フォーマットは、predicate type <code>https://slsa.dev/provenance/v1</code>を持つ<strong>in-toto attestation</strong>です。</p>
<p>GitHub Actionsには公式のジェネレーターがあります：</p>
<pre><code class="language-yaml">jobs:
  build:
    outputs:
      digest: ${{ steps.push.outputs.digest }}
    # ... build & push image

  provenance:
    needs: [build]
    permissions:
      id-token: write
      packages: write
      contents: read
    uses: slsa-framework/slsa-github-generator/.github/workflows/generator_container_slsa3.yml@v2.0.0
    with:
      image: ghcr.io/org/app
      digest: ${{ needs.build.outputs.digest }}
      registry-username: ${{ github.actor }}
</code></pre>
<p>このワークフローは分離された再利用可能ワークフロー内でビルドし、provenance生成 + Cosignキーレス署名を行います——追加コードなしでSLSA L3に到達できます。</p>

<h2 id="verify-truoc-deploy">デプロイ前のprovenance検証</h2>
<p><code>cosign verify-attestation</code>を使用：</p>
<pre><code class="language-bash">cosign verify-attestation --type slsaprovenance \
  --certificate-identity-regexp "https://github.com/org/.+/.github/workflows/build.yml@.+" \
  --certificate-oidc-issuer "https://token.actions.githubusercontent.com" \
  ghcr.io/org/app@sha256:...
</code></pre>
<p>あるいは、OIDC subjectをattestorとするKyverno <code>verifyImages</code>でクラスタ内にエンフォースします。正しいprovenanceを持たないイメージはアドミッションで拒否されます。</p>

<h2 id="quan-ly-dependency-thong-minh">依存関係を賢く管理する</h2>
<ul>
  <li><strong>ダイジェスト/ロックファイルでピン留め</strong>：<code>package-lock.json</code>、<code>poetry.lock</code>、<code>go.sum</code>。<code>latest</code>は絶対に避ける。</li>
  <li><strong>GitHub ActionはSHAでピン留め</strong>（タグは移動可能なため）。</li>
  <li>npm/pypiパブリックから直接プルするのではなく、<strong>社内パッケージ用のベンダーミラー</strong>（Artifactory、Nexus）を用意。</li>
  <li><strong>Renovate/Dependabotにはポリシーを設定</strong>：パッチは自動マージ、マイナー/メジャーは手動レビュー、悪意あるバージョンが公開直後に取り込まれないようクールダウンを設ける。</li>
</ul>

<h2 id="checklist-supply-chain">サプライチェーンの簡潔なチェックリスト</h2>
<ul>
  <li>すべての本番アーティファクトにCycloneDX/SPDX形式のSBOMがあり、保管されている。</li>
  <li>イメージはCosignキーレスで署名され、署名がRekorに保存されている。</li>
  <li>ビルドは分離された再利用可能ワークフローで実行（SLSA L2-L3を達成）。</li>
  <li>クラスタには、Pod許可前に署名 + provenanceを検証するポリシーがある。</li>
  <li>依存関係はロックファイル + ダイジェストでピン留めされ、社内ミラーがある。</li>
  <li>Dependency-TrackがSBOM経由でロングテールなCVEを追跡している。</li>
</ul>

<h2 id="ket-luan">結論</h2>
<p>サプライチェーンセキュリティはもはやオプションではありません——EU CRA、米国EO 14028、多くのエンタープライズ顧客がRFPでSBOMと署名済みアーティファクトを要求しています。良いニュース：オープンスタックのSigstore + SLSA + CycloneDXは、OpenSSFの再利用可能ワークフローのおかげで、ほぼゼロコストでSLSA L3に到達できます。これを2026年に必須となる技術ベースラインとして扱いましょう。</p>
