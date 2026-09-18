---
id: 019d0001-1003-7003-b003-000000000003
title: 'SAST, SCA and Secret Scanning: The Three Layers Every CI Pipeline Needs'
slug: sast-sca-secret-scanning-pipeline
excerpt: >-
  Before talking about DAST, IAST or supply chain, every pipeline needs three
  basic layers: SAST for code, SCA for dependencies, secret scanning for
  keys/tokens. Here is how to set them up with Semgrep, Trivy and Gitleaks.
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
  name: Security
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
locale: en
---
<blockquote>Every production pipeline needs three layers of automated scanning. Skip one, and you will spend hours in incident retrospectives explaining "why didn't we catch this earlier?".</blockquote>

<h2 id="three-minimum-layers">Three minimum layers — and why</h2>
<table>
  <thead><tr><th>Layer</th><th>Detects</th><th>Common tools</th></tr></thead>
  <tbody>
    <tr><td>SAST</td><td>Source code flaws (SQLi, XSS, path traversal, insecure deserialization)</td><td>Semgrep, CodeQL, SonarQube</td></tr>
    <tr><td>SCA</td><td>CVEs in dependencies, license violations</td><td>Trivy, Grype, Snyk, Dependency-Track</td></tr>
    <tr><td>Secret scan</td><td>API keys, tokens, private keys accidentally committed</td><td>Gitleaks, Trufflehog, GitHub secret scanning</td></tr>
  </tbody>
</table>

<h2 id="sast-semgrep">SAST: start with Semgrep</h2>
<p>Semgrep is easy to enable, has a wide open-source ruleset and rules read like real code. Minimal GitHub Actions workflow:</p>
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
<p>Two important tips:</p>
<ul>
  <li><strong>Baseline diff scan</strong>: only block new findings on PRs; old findings go to a backlog with owners. This avoids wholesale build breakage when you first turn it on.</li>
  <li><strong>Custom rules</strong>: write 5-10 rules for internal patterns (e.g., logging secrets, calling internal APIs without the wrapper client). That is where unique value comes from.</li>
</ul>

<h2 id="sca-sbom">SCA and SBOM with Trivy/Grype + Syft</h2>
<p>Generate a CycloneDX SBOM and scan for CVEs in the same pipeline:</p>
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
<p>Push the SBOM into <strong>OWASP Dependency-Track</strong> to monitor the long tail: when a new CVE drops, the dashboard automatically lists impacted projects. A reference SLA:</p>
<ul>
  <li>CRITICAL with available fix: patch within 7 days.</li>
  <li>HIGH with available fix: patch within 30 days.</li>
  <li>MEDIUM/LOW: review quarterly, accept or backlog.</li>
</ul>

<h2 id="secret-scanning-three-layers">Secret scanning: pre-commit + CI + repo-wide</h2>
<ol>
  <li><strong>Pre-commit hook</strong> with <code>gitleaks protect</code>: blocks at the developer's local commit.</li>
  <li><strong>CI scan</strong> on every PR: catches anything that bypassed the hook or was committed via the web UI.</li>
  <li><strong>Periodic repo-wide history scan</strong>: surfaces old secrets still living in git log.</li>
</ol>
<p>When a leaked secret is found:</p>
<ul>
  <li><strong>Step 1 — Treat it as compromised</strong>: rotate the key/token immediately, do not rely on history rewrites.</li>
  <li><strong>Step 2</strong>: audit usage (CloudTrail, Vault audit log) for anomalous activity.</li>
  <li><strong>Step 3</strong>: clean history with BFG or <code>git filter-repo</code> if the repo is public.</li>
  <li><strong>Step 4</strong>: add a pre-commit rule so the same pattern can't recur.</li>
</ul>

<h2 id="manage-secrets">Managing secrets the right way</h2>
<ul>
  <li><strong>Vault / AWS Secrets Manager / Azure Key Vault</strong> with dynamic credentials for DBs and queues.</li>
  <li><strong>Mozilla SOPS</strong> to encrypt secret files in git, with the key in KMS — fits GitOps.</li>
  <li><strong>OIDC federation</strong> between GitHub Actions and the cloud, eliminating long-lived access keys.</li>
</ul>

<h2 id="alert-fatigue">Beware: alert fatigue</h2>
<ol>
  <li>Enable <strong>baseline mode</strong>: only block new findings.</li>
  <li>Start with high severity (CRITICAL/HIGH), lower the bar over time.</li>
  <li>A <strong>triage owner</strong> dispatches findings to the right team within 24h.</li>
  <li>The MTTR-by-severity dashboard is the only KPI — not the count of scans run.</li>
</ol>

<h2 id="conclusion">Conclusion</h2>
<p>SAST + SCA + Secret scanning is the cheapest and highest-leverage baseline you can enable this week. Start small — one repo, one ruleset, one pre-commit hook — measure MTTR, then expand. After 3-4 months these three layers stop most basic defects, freeing the security team to focus on threat modeling, supply chain and runtime.</p>
