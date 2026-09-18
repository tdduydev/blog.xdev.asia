---
id: 019d0001-1006-7006-b006-000000000006
title: 'Supply Chain Security: SLSA, SBOM và Sigstore cho artifact production'
slug: supply-chain-security-slsa-sbom-sigstore
excerpt: >-
  Sau xz, npm typosquat và build poisoning, supply chain attack đã trở thành
  vector phổ biến nhất. SLSA + SBOM + Sigstore là bộ ba khung tiêu chuẩn mở
  giúp bạn chứng minh artifact được build từ đâu, bằng gì, bởi ai.
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
  name: Bảo mật
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
---
<blockquote>Câu hỏi audit khó nhất hiện nay không phải "code có CVE không?" mà là "làm sao chứng minh artifact đang chạy production được build từ chính source này, không bị inject?".</blockquote>

<h2 id="ba-loai-supply-chain-attack">Ba loại supply chain attack phổ biến</h2>
<ul>
  <li><strong>Dependency confusion / typosquat</strong> (npm, pypi, RubyGems): publish package có tên gần giống thư viện nội bộ.</li>
  <li><strong>Source compromise</strong> (xz utils, Codecov bash uploader): inject malicious code vào dự án thượng nguồn.</li>
  <li><strong>Build poisoning</strong> (SolarWinds): compromise build server, inject vào artifact mà source code vẫn sạch.</li>
</ul>
<p>Khung tiêu chuẩn ứng phó là <strong>SLSA</strong> (Supply-chain Levels for Software Artifacts) do OpenSSF maintain.</p>

<h2 id="slsa-cap-do">SLSA — bốn cấp độ build integrity</h2>
<table>
  <thead><tr><th>Level</th><th>Yêu cầu chính</th></tr></thead>
  <tbody>
    <tr><td>L1</td><td>Build có document, sinh provenance cơ bản.</td></tr>
    <tr><td>L2</td><td>Build chạy trên hosted CI, provenance được sign, source theo version control.</td></tr>
    <tr><td>L3</td><td>Build trong môi trường isolated/hardened, provenance không thể bị giả mạo bởi user.</td></tr>
    <tr><td>L4</td><td>Hermetic, reproducible build, two-party review.</td></tr>
  </tbody>
</table>
<p>Mục tiêu thực tế cho phần lớn tổ chức: <strong>SLSA Build L2-L3</strong>. L4 còn hiếm và tốn kém.</p>

<h2 id="sbom-cyclonedx-spdx">SBOM: CycloneDX hay SPDX?</h2>
<p>Hai format chuẩn:</p>
<ul>
  <li><strong>CycloneDX</strong> (OWASP): tập trung security use case, hỗ trợ vulnerability, services, ML model. Tool ecosystem phong phú (Trivy, Syft, Dependency-Track).</li>
  <li><strong>SPDX</strong> (Linux Foundation): tập trung license compliance, được nhiều regulator chấp nhận (US EO 14028).</li>
</ul>
<p>Chọn 1 chính, có thể export sang format kia khi cần. Mỗi artifact production phải có SBOM được sinh tự động trong CI và lưu cùng artifact.</p>

<h2 id="sigstore-keyless">Sigstore: keyless signing cho mọi artifact</h2>
<p>Sigstore gồm 3 component:</p>
<ul>
  <li><strong>Cosign</strong>: CLI sign/verify image, blob, attestation.</li>
  <li><strong>Fulcio</strong>: CA cấp short-lived cert dựa OIDC identity (5 phút TTL).</li>
  <li><strong>Rekor</strong>: transparency log bất biến lưu mọi signature — kiểm tra xem có signature nào bất thường được tạo bằng identity của bạn không.</li>
</ul>
<p>Lợi ích lớn nhất: không có private key cần lưu, rotate hay backup.</p>

<h2 id="provenance-in-toto">Provenance & in-toto attestation</h2>
<p>Provenance là metadata mô tả: <em>ai build, từ source nào, bằng tool gì, vào lúc nào</em>. Format chuẩn là <strong>in-toto attestation</strong> với predicate type <code>https://slsa.dev/provenance/v1</code>.</p>
<p>Workflow GitHub Actions có generator chính thức:</p>
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
<p>Workflow này build trong reusable workflow isolated, sinh provenance + ký bằng Cosign keyless — đạt SLSA L3 không cần code thêm.</p>

<h2 id="verify-truoc-deploy">Verify provenance trước deploy</h2>
<p>Bằng <code>cosign verify-attestation</code>:</p>
<pre><code class="language-bash">cosign verify-attestation --type slsaprovenance \
  --certificate-identity-regexp "https://github.com/org/.+/.github/workflows/build.yml@.+" \
  --certificate-oidc-issuer "https://token.actions.githubusercontent.com" \
  ghcr.io/org/app@sha256:...
</code></pre>
<p>Hoặc enforce trong cluster qua Kyverno <code>verifyImages</code> với attestor là OIDC subject. Pod sẽ bị admission từ chối nếu image không có provenance đúng.</p>

<h2 id="quan-ly-dependency-thong-minh">Quản lý dependency thông minh</h2>
<ul>
  <li><strong>Pin theo digest/lockfile</strong>: <code>package-lock.json</code>, <code>poetry.lock</code>, <code>go.sum</code>. Không bao giờ <code>latest</code>.</li>
  <li><strong>Pin GitHub Action theo SHA</strong> chứ không phải tag — tag có thể bị move.</li>
  <li><strong>Vendor mirror cho package nội bộ</strong> (Artifactory, Nexus) thay vì pull thẳng từ npm/pypi public.</li>
  <li><strong>Renovate/Dependabot có policy</strong>: auto-merge patch, manual review minor/major, có cooldown để tránh chính bản malicious vừa publish.</li>
</ul>

<h2 id="checklist-supply-chain">Checklist supply chain ngắn</h2>
<ul>
  <li>Mọi artifact production có SBOM CycloneDX/SPDX và được lưu trữ.</li>
  <li>Image được sign Cosign keyless, signature lưu Rekor.</li>
  <li>Build chạy trong reusable workflow isolated (đạt SLSA L2-L3).</li>
  <li>Cluster có policy verify signature + provenance trước khi admit pod.</li>
  <li>Dependency pin theo lockfile + digest, mirror nội bộ.</li>
  <li>Dependency-Track theo dõi long-tail CVE qua SBOM.</li>
</ul>

<h2 id="ket-luan">Kết luận</h2>
<p>Supply chain security không còn là tuỳ chọn — EU CRA, US EO 14028 và nhiều khách hàng enterprise đã yêu cầu SBOM và signed artifact trong RFP. Tin tốt: stack mở Sigstore + SLSA + CycloneDX cho phép đạt SLSA L3 với chi phí gần như bằng 0 nhờ reusable workflow của OpenSSF. Hãy coi đây là baseline kỹ thuật cần có trong 2026.</p>
