---
id: 019d0001-1004-7004-b004-000000000004
title: 'コンテナイメージのハードニング：distroless、マルチステージ、Cosignによる署名'
slug: container-image-hardening-distroless-cosign
excerpt: >-
  優れた本番イメージは小さく、root実行ではなく、シェルを持たず、スキャンと署名がされて
  いるべきです。本記事ではDocker/OCIイメージのハードニング技法と、GitHub OIDCを
  使ったCosignキーレス署名のワークフローをまとめます。
featured_image: /images/blog/container-hardening-cosign-featured.webp
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
  - name: container-security
    slug: container-security
  - name: docker
    slug: docker
  - name: cosign
    slug: cosign
  - name: sigstore
    slug: sigstore
comments: []
locale: ja
---
<blockquote>ランタイムイメージの余分な1バイトは、攻撃面の1バイトです。理想的な本番イメージはアプリケーションのバイナリと数個の共有ライブラリのみを含み、シェルもパッケージマネージャーも持たず——そしてクラスタが信頼できるよう署名されているべきです。</blockquote>

<h2 id="multi-stage-build">マルチステージビルドとdistrolessベースイメージ</h2>
<p>Goアプリケーション向けの参考パターン：</p>
<pre><code class="language-dockerfile">FROM golang:1.23 AS build
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o /out/app ./cmd/server

FROM gcr.io/distroless/static-debian12:nonroot
COPY --from=build /out/app /app
USER nonroot:nonroot
ENTRYPOINT ["/app"]
</code></pre>
<p>メリット：</p>
<ul>
  <li>ランタイムイメージが20MB未満で、<code>sh</code>、<code>apt</code>、<code>curl</code>を含まない。</li>
  <li>攻撃者がRCEに到達しても、権限昇格やペイロードのダウンロードに使えるツールがない。</li>
  <li>OSレベルのCVE件数がほぼゼロになり、スキャンノイズが減る。</li>
</ul>
<p>Node.js/Pythonの場合：<strong>Chainguard Images</strong>、<strong>distroless/nodejs</strong>、<strong>distroless/python3</strong>を使用。<code>:latest</code>は避け、必ずダイジェスト<code>@sha256:...</code>でピン留めしましょう。</p>

<h2 id="non-root-readonly-caps">非root、読み取り専用ファイルシステム、capabilityのドロップ</h2>
<p>Kubernetesでは：</p>
<pre><code class="language-yaml">securityContext:
  runAsNonRoot: true
  runAsUser: 65532
  readOnlyRootFilesystem: true
  allowPrivilegeEscalation: false
  capabilities:
    drop: ["ALL"]
  seccompProfile:
    type: RuntimeDefault
</code></pre>
<p>これは<strong>Pod Security Standards: restricted</strong>プロファイルのベースラインでもあります。アプリがファイル書き込みを必要とする場合（キャッシュ、tmp）、ルートFSを開放するのではなく、その特定パスに<code>emptyDir</code>をマウントしましょう。</p>

<h2 id="scan-image-trivy-grype">Trivy/Grypeによるイメージスキャン</h2>
<pre><code class="language-yaml">- name: Build
  run: docker build -t ghcr.io/org/app:${{ github.sha }} .

- name: Scan image
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: ghcr.io/org/app:${{ github.sha }}
    severity: CRITICAL,HIGH
    exit-code: 1
    ignore-unfixed: true
</code></pre>
<p><code>ignore-unfixed: true</code>は、修正がないCVEでビルドが失敗するのを防ぎますが、追跡のためレポートには記録されます。</p>

<h2 id="cosign-keyless-sign">Cosignキーレス：秘密鍵を管理せずに署名する</h2>
<p>Cosignキーレスは、OIDCアイデンティティ（GitHub Actions、Googleなど）とFulcioが発行する短命証明書に依存します。ワークフロー：</p>
<pre><code class="language-yaml">permissions:
  id-token: write   # OIDC用
  contents: read
  packages: write

- uses: sigstore/cosign-installer@v3
- name: Sign image
  env:
    COSIGN_EXPERIMENTAL: "true"
  run: cosign sign --yes ghcr.io/org/app@${{ steps.push.outputs.digest }}

- name: Attach SBOM as attestation
  run: |
    syft ghcr.io/org/app@${{ steps.push.outputs.digest }} -o cyclonedx-json > sbom.json
    cosign attest --yes --predicate sbom.json --type cyclonedx \
      ghcr.io/org/app@${{ steps.push.outputs.digest }}
</code></pre>
<p>検証ログは<strong>Rekor</strong>透明性ログに永続的に保存されます。保管・ローテーションが必要な秘密鍵はありません。</p>

<h2 id="verify-truoc-deploy">Kyvernoによるデプロイ前検証</h2>
<pre><code class="language-yaml">apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: verify-image-signature
spec:
  validationFailureAction: Enforce
  rules:
  - name: check-cosign-signature
    match:
      any:
      - resources:
          kinds: ["Pod"]
    verifyImages:
    - imageReferences: ["ghcr.io/org/*"]
      attestors:
      - entries:
        - keyless:
            subject: "https://github.com/org/repo/.github/workflows/build.yml@refs/heads/main"
            issuer: "https://token.actions.githubusercontent.com"
</code></pre>
<p>Podは、正しいリポジトリ + ワークフロー + ブランチからの署名を持つイメージである場合のみ作成されます。これはサプライチェーンセキュリティ（SLSA L2-L3）の重要なピースです。</p>

<h2 id="checklist-image-production">本番イメージのチェックリスト</h2>
<ul>
  <li>マルチステージ、distroless/Chainguardベースイメージ、ダイジェストピン留め。</li>
  <li>USERは非root、ALL capabilityをドロップ、readOnlyRootFilesystem。</li>
  <li>ランタイムステージに<code>curl</code>、<code>wget</code>、<code>bash</code>をインストールしない。</li>
  <li>Trivy/Grypeでスキャンし、修正があるCRITICAL/HIGHではビルドを失敗させる。</li>
  <li>Cosignキーレスで署名し、CycloneDX SBOMを添付。</li>
  <li>クラスタにKyverno verifyImagesを設定し、署名なしイメージをブロック。</li>
  <li>HEALTHCHECKとEXPOSEを明示し、未使用ポートを公開しない。</li>
</ul>

<h2 id="ket-luan">結論</h2>
<p>イメージのハードニングは、DevSecOpsで最もROIが高い投資の1つです：労力は少なく、攻撃面とアラート疲労の両方を削減します。distroless + 非root + Cosignキーレスのパターンに慣れれば、新サービスがほぼ無償で良いベースラインを得られます——そして、コンプライアンス違反のPodをクラスタ全体でブロックするアドミッションポリシーを自信を持って有効化できます。</p>
