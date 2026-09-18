---
id: 019d0001-1004-7004-b004-000000000004
title: '容器映像檔 hardening:distroless、multi-stage 與 Cosign 簽署'
slug: container-image-hardening-distroless-cosign
excerpt: >-
  一個好的 production 映像檔必須小、不以 root 執行、沒有 shell、經過掃描並被簽署。
  本文整理 Docker/OCI 映像檔的 hardening 技巧,並附上以 GitHub OIDC 進行
  Cosign keyless 簽署的 workflow。
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
  name: 資安
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
locale: zh-tw
---
<blockquote>Runtime 映像檔中每多一個位元組,就多一個位元組的攻擊面。理想的 production 映像檔只包含應用程式 binary、少數共享 lib,沒有 shell、沒有 package manager——而且必須被簽署,讓叢集能信任。</blockquote>

<h2 id="multi-stage-build">Multi-stage build 與 distroless base 映像檔</h2>
<p>Go 應用程式的參考 pattern:</p>
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
<p>好處:</p>
<ul>
  <li>Runtime 映像檔 &lt;20 MB,沒有 <code>sh</code>、<code>apt</code>、<code>curl</code>。</li>
  <li>當攻擊者取得 RCE 時,沒有工具能用來提權或下載 payload。</li>
  <li>OS 層級 CVE 數量幾乎為零,降低掃描雜訊。</li>
</ul>
<p>對於 Node.js/Python:使用 <strong>Chainguard Images</strong>、<strong>distroless/nodejs</strong>、<strong>distroless/python3</strong>。避免 <code>:latest</code>,一律以 digest <code>@sha256:...</code> 釘住。</p>

<h2 id="non-root-readonly-caps">Non-root、唯讀檔案系統、drop capabilities</h2>
<p>在 Kubernetes 中:</p>
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
<p>這也是 <strong>Pod Security Standards: restricted</strong> profile 的基線。如果應用程式需要寫檔 (cache、tmp),就只把 <code>emptyDir</code> 掛到那個路徑,而不是把整個 rootfs 開放可寫。</p>

<h2 id="scan-image-trivy-grype">用 Trivy/Grype 掃描映像檔</h2>
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
<p><code>ignore-unfixed: true</code> 可避免因為尚無修補的 CVE 而 fail build——但仍寫入報告以持續追蹤。</p>

<h2 id="cosign-keyless-sign">Cosign keyless:不必管理私鑰也能簽署</h2>
<p>Cosign keyless 依賴 OIDC identity (GitHub Actions、Google 等) 與 Fulcio 簽發的 short-lived 憑證。Workflow:</p>
<pre><code class="language-yaml">permissions:
  id-token: write   # 給 OIDC 用
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
<p>驗證紀錄會永久保留在 <strong>Rekor</strong> transparency log 中。沒有需要保管或輪換的私鑰。</p>

<h2 id="verify-truoc-deploy">部署前用 Kyverno 驗證</h2>
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
<p>只有當映像檔的簽署來自正確的 repo + workflow + branch 時,Pod 才會被建立。這是供應鏈安全的關鍵環節 (SLSA L2-L3)。</p>

<h2 id="checklist-image-production">Production 映像檔檢查表</h2>
<ul>
  <li>Multi-stage、distroless/Chainguard base 映像檔,以 digest 釘住。</li>
  <li>USER non-root、drop ALL caps、readOnlyRootFilesystem。</li>
  <li>Runtime stage 不安裝 <code>curl</code>、<code>wget</code>、<code>bash</code>。</li>
  <li>用 Trivy/Grype 掃描,有修補的 CRITICAL/HIGH 直接 fail build。</li>
  <li>用 Cosign keyless 簽署 + attach CycloneDX SBOM。</li>
  <li>叢集有 Kyverno verifyImages 擋下未簽署映像檔。</li>
  <li>HEALTHCHECK + EXPOSE 明確,不暴露未使用的 port。</li>
</ul>

<h2 id="ket-luan">結論</h2>
<p>映像檔 hardening 是 DevSecOps 中 ROI 最高的投資之一:工夫不大,卻同時減少攻擊面與警報疲勞。當你熟悉 distroless + nonroot + Cosign keyless 的 pattern 後,每個新服務幾乎可以免費取得良好基線——而你也可以放心在整個叢集上開啟 admission policy 擋下不合規的 Pod。</p>
