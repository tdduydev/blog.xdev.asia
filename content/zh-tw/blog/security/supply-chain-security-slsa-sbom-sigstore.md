---
id: 019d0001-1006-7006-b006-000000000006
title: '供應鏈安全:用 SLSA、SBOM 與 Sigstore 守護 production artifact'
slug: supply-chain-security-slsa-sbom-sigstore
excerpt: >-
  在 xz、npm typosquat 與 build poisoning 之後,供應鏈攻擊已成為最常見的攻擊向量。
  SLSA + SBOM + Sigstore 這三個開放標準的組合,能讓你證明 artifact 是從哪、用什麼、
  由誰建置出來的。
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
  name: 資安
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
locale: zh-tw
---
<blockquote>當前最棘手的稽核問題不再是「程式碼有沒有 CVE?」,而是「如何證明 production 上正在跑的 artifact,確實是由這份原始碼建置而來、沒有被 inject?」</blockquote>

<h2 id="ba-loai-supply-chain-attack">三種常見的供應鏈攻擊</h2>
<ul>
  <li><strong>Dependency confusion / typosquat</strong> (npm、pypi、RubyGems):發布名稱與內部套件相近的惡意套件。</li>
  <li><strong>Source compromise</strong> (xz utils、Codecov bash uploader):把惡意程式碼注入上游專案。</li>
  <li><strong>Build poisoning</strong> (SolarWinds):攻陷 build server,在 artifact 中注入,而原始碼仍是乾淨的。</li>
</ul>
<p>對應的標準框架是由 OpenSSF 維護的 <strong>SLSA</strong> (Supply-chain Levels for Software Artifacts)。</p>

<h2 id="slsa-cap-do">SLSA——build integrity 的四個等級</h2>
<table>
  <thead><tr><th>Level</th><th>主要要求</th></tr></thead>
  <tbody>
    <tr><td>L1</td><td>Build 過程有文件,產生基本 provenance。</td></tr>
    <tr><td>L2</td><td>Build 在 hosted CI 上執行,provenance 被簽署,原始碼納入版本控制。</td></tr>
    <tr><td>L3</td><td>Build 在隔離/hardened 環境中執行,provenance 無法被使用者偽造。</td></tr>
    <tr><td>L4</td><td>Hermetic、可重現 (reproducible) 的 build,需雙人審查。</td></tr>
  </tbody>
</table>
<p>多數組織的實際目標:<strong>SLSA Build L2-L3</strong>。L4 仍很罕見且成本高昂。</p>

<h2 id="sbom-cyclonedx-spdx">SBOM:CycloneDX 還是 SPDX?</h2>
<p>兩個標準格式:</p>
<ul>
  <li><strong>CycloneDX</strong> (OWASP):聚焦資安使用情境,支援漏洞、services、ML model。工具生態豐富 (Trivy、Syft、Dependency-Track)。</li>
  <li><strong>SPDX</strong> (Linux Foundation):聚焦 license 合規,獲得多國主管機關認可 (例如 US EO 14028)。</li>
</ul>
<p>選 1 個為主,需要時可以匯出成另一格式。每個 production artifact 都應在 CI 中自動產生 SBOM,並與 artifact 一同保存。</p>

<h2 id="sigstore-keyless">Sigstore:對任何 artifact 的 keyless 簽署</h2>
<p>Sigstore 由三個元件組成:</p>
<ul>
  <li><strong>Cosign</strong>:簽署/驗證映像檔、blob、attestation 的 CLI。</li>
  <li><strong>Fulcio</strong>:依 OIDC identity 簽發 short-lived 憑證的 CA (TTL 5 分鐘)。</li>
  <li><strong>Rekor</strong>:不可變的 transparency log,記錄所有簽署——可檢查是否有人用你的 identity 產生了異常簽署。</li>
</ul>
<p>最大優勢:沒有需要保管、輪換或備份的私鑰。</p>

<h2 id="provenance-in-toto">Provenance 與 in-toto attestation</h2>
<p>Provenance 是描述<em>誰建置、從哪份原始碼、用什麼工具、何時建置</em>的 metadata。標準格式是 <strong>in-toto attestation</strong>,搭配 predicate type <code>https://slsa.dev/provenance/v1</code>。</p>
<p>GitHub Actions 有官方 generator workflow:</p>
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
<p>這個 workflow 在隔離的 reusable workflow 中建置,產生 provenance 並用 Cosign keyless 簽署——不必額外寫程式碼即可達到 SLSA L3。</p>

<h2 id="verify-truoc-deploy">部署前驗證 provenance</h2>
<p>使用 <code>cosign verify-attestation</code>:</p>
<pre><code class="language-bash">cosign verify-attestation --type slsaprovenance \
  --certificate-identity-regexp "https://github.com/org/.+/.github/workflows/build.yml@.+" \
  --certificate-oidc-issuer "https://token.actions.githubusercontent.com" \
  ghcr.io/org/app@sha256:...
</code></pre>
<p>或在叢集中透過 Kyverno <code>verifyImages</code> 強制執行,以 OIDC subject 作為 attestor。沒有正確 provenance 的映像檔會被 admission 拒絕。</p>

<h2 id="quan-ly-dependency-thong-minh">聰明地管理相依套件</h2>
<ul>
  <li><strong>以 digest/lockfile 釘住版本</strong>:<code>package-lock.json</code>、<code>poetry.lock</code>、<code>go.sum</code>。永遠不用 <code>latest</code>。</li>
  <li><strong>GitHub Action 以 SHA 釘住</strong>而非 tag——tag 可能被搬動。</li>
  <li>對內部套件設立<strong>內部 mirror</strong> (Artifactory、Nexus),不直接從公開 npm/pypi 拉取。</li>
  <li><strong>Renovate/Dependabot 設定政策</strong>:patch 自動合併,minor/major 需人工審查,並設置 cooldown 以避免剛發布的惡意版本。</li>
</ul>

<h2 id="checklist-supply-chain">簡短的供應鏈檢查表</h2>
<ul>
  <li>每個 production artifact 都有 CycloneDX/SPDX SBOM 並被保存。</li>
  <li>映像檔以 Cosign keyless 簽署,簽名存於 Rekor。</li>
  <li>Build 在隔離的 reusable workflow 中執行 (達 SLSA L2-L3)。</li>
  <li>叢集有 policy 在 admit pod 之前驗證簽署 + provenance。</li>
  <li>相依套件以 lockfile + digest 釘住,並有內部 mirror。</li>
  <li>透過 SBOM 用 Dependency-Track 追蹤 long-tail CVE。</li>
</ul>

<h2 id="ket-luan">結論</h2>
<p>供應鏈安全已不再是選配——EU CRA、US EO 14028 與許多企業客戶都已在 RFP 中要求 SBOM 與簽署過的 artifact。好消息是:Sigstore + SLSA + CycloneDX 這套開放堆疊,憑藉 OpenSSF 的 reusable workflow,可讓達到 SLSA L3 的成本幾乎為零。請把這視為 2026 年的技術基線。</p>
