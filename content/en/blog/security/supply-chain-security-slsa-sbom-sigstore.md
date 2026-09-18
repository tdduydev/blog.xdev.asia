---
id: 019d0001-1006-7006-b006-000000000006
title: 'Supply Chain Security: SLSA, SBOM and Sigstore for Production Artifacts'
slug: supply-chain-security-slsa-sbom-sigstore
excerpt: >-
  After xz, npm typosquats and build poisoning, supply chain attacks have
  become the most common vector. SLSA + SBOM + Sigstore is the open trio of
  standards that lets you prove where, how and by whom an artifact was built.
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
  name: Security
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
locale: en
---
<blockquote>The hardest audit question today is not "does the code have CVEs?" but "how do you prove the artifact running in production was built from this exact source, untampered?".</blockquote>

<h2 id="three-attacks">Three common supply chain attacks</h2>
<ul>
  <li><strong>Dependency confusion / typosquat</strong> (npm, pypi, RubyGems): publishing packages with names close to internal libraries.</li>
  <li><strong>Source compromise</strong> (xz utils, Codecov bash uploader): injecting malicious code into upstream projects.</li>
  <li><strong>Build poisoning</strong> (SolarWinds): compromising the build server to inject artifacts while source code remains clean.</li>
</ul>
<p>The standard response framework is <strong>SLSA</strong> (Supply-chain Levels for Software Artifacts), maintained by OpenSSF.</p>

<h2 id="slsa-levels">SLSA — four levels of build integrity</h2>
<table>
  <thead><tr><th>Level</th><th>Key requirements</th></tr></thead>
  <tbody>
    <tr><td>L1</td><td>Documented build, basic provenance generated.</td></tr>
    <tr><td>L2</td><td>Build runs on hosted CI, signed provenance, source under version control.</td></tr>
    <tr><td>L3</td><td>Isolated/hardened build environment, provenance can't be forged by users.</td></tr>
    <tr><td>L4</td><td>Hermetic, reproducible build, two-party review.</td></tr>
  </tbody>
</table>
<p>Realistic target for most organisations: <strong>SLSA Build L2-L3</strong>. L4 is still rare and expensive.</p>

<h2 id="sbom-formats">SBOM: CycloneDX or SPDX?</h2>
<ul>
  <li><strong>CycloneDX</strong> (OWASP): security-focused, supports vulnerabilities, services, ML models. Rich tool ecosystem (Trivy, Syft, Dependency-Track).</li>
  <li><strong>SPDX</strong> (Linux Foundation): license-compliance-focused, accepted by many regulators (US EO 14028).</li>
</ul>
<p>Pick one as primary, export to the other when needed. Every production artifact must have an SBOM auto-generated in CI and stored alongside the artifact.</p>

<h2 id="sigstore-keyless">Sigstore: keyless signing for any artifact</h2>
<p>Three components:</p>
<ul>
  <li><strong>Cosign</strong>: CLI to sign/verify images, blobs, attestations.</li>
  <li><strong>Fulcio</strong>: CA issuing short-lived certificates based on OIDC identity (5-minute TTL).</li>
  <li><strong>Rekor</strong>: immutable transparency log of every signature — useful to detect rogue signatures using your identity.</li>
</ul>
<p>Biggest benefit: no private keys to store, rotate or back up.</p>

<h2 id="provenance">Provenance & in-toto attestations</h2>
<p>Provenance is metadata describing <em>who built it, from what source, with what tools, when</em>. The standard format is <strong>in-toto attestation</strong> with predicate type <code>https://slsa.dev/provenance/v1</code>.</p>
<p>GitHub Actions has an official generator:</p>
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
<p>This workflow builds in an isolated reusable workflow, generates provenance, and signs with Cosign keyless — reaching SLSA L3 with no extra code.</p>

<h2 id="verify-provenance">Verifying provenance before deploy</h2>
<p>With <code>cosign verify-attestation</code>:</p>
<pre><code class="language-bash">cosign verify-attestation --type slsaprovenance \
  --certificate-identity-regexp "https://github.com/org/.+/.github/workflows/build.yml@.+" \
  --certificate-oidc-issuer "https://token.actions.githubusercontent.com" \
  ghcr.io/org/app@sha256:...
</code></pre>
<p>Or enforce in-cluster via Kyverno <code>verifyImages</code> with the OIDC subject as attestor. Pods get rejected at admission if the image lacks valid provenance.</p>

<h2 id="dependency-management">Smart dependency management</h2>
<ul>
  <li><strong>Pin by digest/lockfile</strong>: <code>package-lock.json</code>, <code>poetry.lock</code>, <code>go.sum</code>. Never <code>latest</code>.</li>
  <li><strong>Pin GitHub Actions by SHA</strong>, not tag — tags can be moved.</li>
  <li><strong>Mirror internal packages</strong> in Artifactory/Nexus instead of pulling directly from public npm/pypi.</li>
  <li><strong>Renovate/Dependabot with policy</strong>: auto-merge patches, manual review for minor/major, with a cooldown to avoid the freshly-published malicious version.</li>
</ul>

<h2 id="checklist">Short supply chain checklist</h2>
<ul>
  <li>Every production artifact has a CycloneDX/SPDX SBOM, stored.</li>
  <li>Images are Cosign keyless signed, signatures stored in Rekor.</li>
  <li>Builds run in isolated reusable workflows (SLSA L2-L3).</li>
  <li>Cluster verifies signature + provenance before admitting a pod.</li>
  <li>Dependencies pinned by lockfile + digest, mirrored internally.</li>
  <li>Dependency-Track follows the long tail of CVEs through SBOMs.</li>
</ul>

<h2 id="conclusion">Conclusion</h2>
<p>Supply chain security is no longer optional — the EU CRA, US EO 14028 and many enterprise customers already require SBOMs and signed artifacts in RFPs. The good news: the open Sigstore + SLSA + CycloneDX stack lets you reach SLSA L3 at near-zero cost via OpenSSF reusable workflows. Treat it as a non-negotiable technical baseline in 2026.</p>
