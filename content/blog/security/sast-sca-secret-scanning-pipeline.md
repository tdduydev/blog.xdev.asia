---
id: 019d0001-1003-7003-b003-000000000003
title: 'SAST, SCA và Secret Scanning: ba lớp tối thiểu cho mọi CI pipeline'
slug: sast-sca-secret-scanning-pipeline
excerpt: >-
  Trước khi nói tới DAST, IAST hay supply chain, mọi pipeline cần ba lớp cơ bản:
  SAST cho code, SCA cho dependency, secret scanning cho key/token. Bài viết
  hướng dẫn dựng đủ ba lớp với Semgrep, Trivy và Gitleaks.
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
  name: Bảo mật
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
---
<blockquote>Mỗi pipeline production đều cần ba lớp scan tự động. Thiếu một trong ba, bạn sẽ tốn nhiều giờ trong incident retrospective để giải thích "vì sao chúng ta không bắt được sớm hơn?".</blockquote>

<h2 id="ba-lop-toi-thieu">Ba lớp tối thiểu — và lý do</h2>
<table>
  <thead><tr><th>Lớp</th><th>Phát hiện</th><th>Tool phổ biến</th></tr></thead>
  <tbody>
    <tr><td>SAST</td><td>Lỗ hổng trong source code (SQLi, XSS, path traversal, insecure deserialization)</td><td>Semgrep, CodeQL, SonarQube</td></tr>
    <tr><td>SCA</td><td>CVE trong dependency, license vi phạm</td><td>Trivy, Grype, Snyk, Dependency-Track</td></tr>
    <tr><td>Secret scan</td><td>API key, token, private key vô tình commit</td><td>Gitleaks, Trufflehog, GitHub secret scanning</td></tr>
  </tbody>
</table>

<h2 id="sast-bat-dau-voi-semgrep">SAST: bắt đầu với Semgrep</h2>
<p>Semgrep dễ bật, ruleset open source rộng, syntax viết rule giống code thật. Workflow GitHub Actions tối thiểu:</p>
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
<p>Hai mẹo quan trọng:</p>
<ul>
  <li><strong>Baseline diff scan</strong>: chỉ block finding mới trên PR, finding cũ đưa vào backlog có owner. Tránh vỡ build hàng loạt khi mới bật.</li>
  <li><strong>Custom rule</strong>: viết 5-10 rule chặn pattern nội bộ (vd: log secret, gọi API nội không qua client wrapper). Đó là thứ tạo ra giá trị riêng.</li>
</ul>

<h2 id="sca-trivy-grype-sbom">SCA và SBOM với Trivy/Grype + Syft</h2>
<p>Sinh SBOM CycloneDX và scan CVE trong cùng pipeline:</p>
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
<p>Đẩy SBOM vào <strong>OWASP Dependency-Track</strong> để theo dõi long-tail: khi CVE mới được công bố, dashboard tự cảnh báo project bị ảnh hưởng. Chính sách SLA tham khảo:</p>
<ul>
  <li>CRITICAL có fix sẵn: vá trong 7 ngày.</li>
  <li>HIGH có fix sẵn: vá trong 30 ngày.</li>
  <li>MEDIUM/LOW: review hàng quý, accept hoặc vá theo backlog.</li>
</ul>

<h2 id="secret-scanning-pre-commit-ci">Secret scanning: pre-commit + CI + repo-wide</h2>
<p>Ba lớp:</p>
<ol>
  <li><strong>Pre-commit hook</strong> với <code>gitleaks protect</code>: chặn ngay khi developer commit local.</li>
  <li><strong>CI scan</strong> trên mỗi PR: bắt secret bypass hook hoặc commit từ web UI.</li>
  <li><strong>Repo-wide history scan</strong> định kỳ: phát hiện secret cũ còn nằm trong git log.</li>
</ol>
<p>Khi phát hiện secret bị lộ:</p>
<ul>
  <li><strong>Bước 1 — Coi như đã lộ</strong>: rotate ngay key/token, không phụ thuộc xoá lịch sử.</li>
  <li><strong>Bước 2</strong>: audit usage (CloudTrail, Vault audit log) xem có hành vi bất thường.</li>
  <li><strong>Bước 3</strong>: dọn lịch sử với BFG hoặc <code>git filter-repo</code> nếu repo public.</li>
  <li><strong>Bước 4</strong>: thêm rule pre-commit để pattern tương tự không tái diễn.</li>
</ul>

<h2 id="quan-ly-secret-dung-cach">Quản lý secret đúng cách</h2>
<p>Lý tưởng: code không bao giờ chứa secret, ngay cả ciphertext. Lựa chọn:</p>
<ul>
  <li><strong>Vault / AWS Secrets Manager / Azure Key Vault</strong> với dynamic credential cho DB, queue.</li>
  <li><strong>Mozilla SOPS</strong> mã hoá secret file checkin git, key trong KMS — phù hợp GitOps.</li>
  <li><strong>OIDC federation</strong> giữa GitHub Actions và cloud, bỏ hẳn long-lived access key.</li>
</ul>

<h2 id="canh-bao-alert-fatigue">Cảnh báo: alert fatigue</h2>
<p>Bật cùng lúc 3 lớp scan trên 100 repo legacy = vài nghìn finding ngày đầu tiên. Hệ quả: không ai xử, ai cũng disable. Chiến lược an toàn:</p>
<ol>
  <li>Bật <strong>baseline mode</strong>: chỉ block finding mới.</li>
  <li>Bắt đầu severity cao (CRITICAL/HIGH) trước, hạ thấp dần.</li>
  <li>Một <strong>triage owner</strong> chuyên dispatch finding về đúng team trong 24h.</li>
  <li>Dashboard MTTR theo severity là KPI duy nhất, không phải số scan đã chạy.</li>
</ol>

<h2 id="ket-luan">Kết luận</h2>
<p>SAST + SCA + Secret scanning là baseline rẻ và hiệu quả nhất bạn có thể bật trong tuần này. Bắt đầu nhỏ — 1 repo, 1 ruleset, 1 pre-commit hook — đo MTTR, mở rộng dần. Sau 3-4 tháng, ba lớp này sẽ chặn được phần lớn loại lỗi cơ bản, cho phép team security tập trung năng lượng vào threat model, supply chain và runtime.</p>
