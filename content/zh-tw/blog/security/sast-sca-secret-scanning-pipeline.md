---
id: 019d0001-1003-7003-b003-000000000003
title: 'SAST、SCA 與 Secret Scanning:每個 CI 管線最低限度的三層防線'
slug: sast-sca-secret-scanning-pipeline
excerpt: >-
  在談 DAST、IAST 或供應鏈之前,每條管線都需要三層基礎:程式碼用 SAST、相依套件用
  SCA、金鑰/token 用 secret scanning。本文示範如何用 Semgrep、Trivy 與 Gitleaks
  把這三層建起來。
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
  name: 資安
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
locale: zh-tw
---
<blockquote>每條 production 管線都需要三層自動掃描。少了其中之一,事故回顧時你就得花好幾個小時解釋「為什麼我們沒能更早發現?」</blockquote>

<h2 id="ba-lop-toi-thieu">最低限度的三層——以及它們的理由</h2>
<table>
  <thead><tr><th>層級</th><th>用來偵測</th><th>常見工具</th></tr></thead>
  <tbody>
    <tr><td>SAST</td><td>原始碼中的弱點 (SQLi、XSS、path traversal、insecure deserialization)</td><td>Semgrep、CodeQL、SonarQube</td></tr>
    <tr><td>SCA</td><td>相依套件中的 CVE、license 違規</td><td>Trivy、Grype、Snyk、Dependency-Track</td></tr>
    <tr><td>Secret scan</td><td>不小心 commit 的 API key、token、私鑰</td><td>Gitleaks、Trufflehog、GitHub secret scanning</td></tr>
  </tbody>
</table>

<h2 id="sast-bat-dau-voi-semgrep">SAST:從 Semgrep 開始</h2>
<p>Semgrep 容易啟用,有大量開源規則集,規則語法接近真實程式碼。最小可行的 GitHub Actions workflow:</p>
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
<p>兩個重要技巧:</p>
<ul>
  <li><strong>Baseline diff scan</strong>:PR 上只擋新出現的 finding,舊 finding 進入有 owner 的 backlog。避免一啟用就全面 break build。</li>
  <li><strong>自訂規則</strong>:寫 5-10 條規則攔截內部 pattern (例如:log secret、繞過內部 client wrapper 直接呼叫 API)。這才是真正帶來差異化價值的部分。</li>
</ul>

<h2 id="sca-trivy-grype-sbom">SCA 與 SBOM:Trivy/Grype + Syft</h2>
<p>在同一條管線中產生 CycloneDX SBOM 並掃描 CVE:</p>
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
<p>把 SBOM 推送到 <strong>OWASP Dependency-Track</strong> 以追蹤 long-tail:當新 CVE 公布時,儀表板會自動警示受影響的專案。SLA 政策參考:</p>
<ul>
  <li>有修補的 CRITICAL:7 天內修復。</li>
  <li>有修補的 HIGH:30 天內修復。</li>
  <li>MEDIUM/LOW:每季檢視,接受或排入 backlog。</li>
</ul>

<h2 id="secret-scanning-pre-commit-ci">Secret scanning:pre-commit + CI + 全 repo</h2>
<p>三層:</p>
<ol>
  <li><strong>Pre-commit hook</strong> 用 <code>gitleaks protect</code>:在開發者 local commit 時就擋下。</li>
  <li><strong>CI 掃描</strong>每個 PR:抓住繞過 hook 或從 web UI commit 的 secret。</li>
  <li><strong>定期全 repo 歷史掃描</strong>:找出仍躺在 git log 中的舊 secret。</li>
</ol>
<p>當發現 secret 外洩時:</p>
<ul>
  <li><strong>第 1 步——當作已外洩處理</strong>:立即輪換金鑰/token,不要寄望刪掉歷史就沒事。</li>
  <li><strong>第 2 步</strong>:稽核使用情況 (CloudTrail、Vault audit log) 看有無異常行為。</li>
  <li><strong>第 3 步</strong>:若 repo 是 public,用 BFG 或 <code>git filter-repo</code> 清理歷史。</li>
  <li><strong>第 4 步</strong>:加上 pre-commit 規則,讓相同 pattern 不再發生。</li>
</ul>

<h2 id="quan-ly-secret-dung-cach">正確管理 secret</h2>
<p>理想狀態:程式碼中永遠不含 secret,連密文也不行。選項:</p>
<ul>
  <li><strong>Vault / AWS Secrets Manager / Azure Key Vault</strong>,對 DB、queue 使用 dynamic credential。</li>
  <li><strong>Mozilla SOPS</strong> 對 checkin git 的 secret 檔案加密,金鑰存在 KMS——適合 GitOps。</li>
  <li><strong>OIDC federation</strong> 串接 GitHub Actions 與雲端,完全擺脫 long-lived access key。</li>
</ul>

<h2 id="canh-bao-alert-fatigue">警告:警報疲勞</h2>
<p>同時在 100 個 legacy repo 開三層掃描 = 第一天就有數千個 finding。後果:沒人處理,每個人都把它停掉。安全的策略:</p>
<ol>
  <li>啟用 <strong>baseline mode</strong>:只擋新 finding。</li>
  <li>從高 severity (CRITICAL/HIGH) 開始,逐步下調門檻。</li>
  <li>有一位 <strong>triage owner</strong>,在 24 小時內把 finding 派到正確的團隊。</li>
  <li>唯一的 KPI 是依 severity 區分的 MTTR 儀表板,而不是已執行的掃描次數。</li>
</ol>

<h2 id="ket-luan">結論</h2>
<p>SAST + SCA + Secret scanning 是這週你能啟用、最便宜也最有效的基線。從小規模開始——1 個 repo、1 個規則集、1 個 pre-commit hook——衡量 MTTR,逐步擴大。3-4 個月後,這三層能擋下大部分基礎類型的缺陷,讓資安團隊把精力集中在威脅模型、供應鏈與 runtime 上。</p>
