---
id: 019d0001-1008-7008-b008-000000000008
title: 'Compliance cho engineer: ISO 27001, SOC 2, PCI DSS v4 và Nghị định 13/2023'
slug: compliance-iso27001-pci-nd13-cho-engineer
excerpt: >-
  Engineer không cần thuộc lòng từng control, nhưng cần biết cách map control
  vào pipeline và sinh evidence tự động. Bài viết tóm tắt 4 khung phổ biến và
  cách triển khai compliance-as-code trong DevSecOps.
featured_image: /images/blog/compliance-engineer-featured.webp
type: blog
reading_time: 11
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
  - name: compliance
    slug: compliance
  - name: iso-27001
    slug: iso-27001
  - name: soc-2
    slug: soc-2
  - name: pci-dss
    slug: pci-dss
  - name: nghi-dinh-13
    slug: nghi-dinh-13
comments: []
---
<blockquote>Compliance không phải PowerPoint cho auditor. Khi làm đúng, mỗi control trở thành một mảnh tự động trong pipeline — và evidence được sinh ra như side-effect của hoạt động ship phần mềm.</blockquote>

<h2 id="bon-khung-pho-bien">Bốn khung phổ biến — bản chất là gì?</h2>
<table>
  <thead><tr><th>Khung</th><th>Mục tiêu</th><th>Khi nào áp dụng</th></tr></thead>
  <tbody>
    <tr><td>ISO/IEC 27001:2022</td><td>Information Security Management System (ISMS) — quản trị tổng thể</td><td>Bất kỳ tổ chức muốn cert quốc tế về quản trị an toàn thông tin</td></tr>
    <tr><td>SOC 2 (AICPA)</td><td>Trust Service Criteria (Security, Availability, Confidentiality, Processing Integrity, Privacy)</td><td>SaaS B2B Mỹ; thường khách hàng enterprise yêu cầu trong RFP</td></tr>
    <tr><td>PCI DSS v4.0</td><td>Bảo vệ cardholder data</td><td>Bất kỳ ai chứa/xử lý/truyền thẻ thanh toán</td></tr>
    <tr><td>Nghị định 13/2023/NĐ-CP</td><td>Bảo vệ dữ liệu cá nhân tại Việt Nam</td><td>Mọi tổ chức xử lý PII của công dân VN</td></tr>
  </tbody>
</table>

<h2 id="iso-27001">ISO 27001:2022 — engineer cần nắm gì?</h2>
<p>Bản 2022 có 93 control trong Annex A, nhóm thành 4 theme: Organizational, People, Physical, Technological. Phần lớn control "Technological" map trực tiếp vào DevSecOps pipeline:</p>
<ul>
  <li>A.8.8 Management of technical vulnerabilities → SCA + SBOM + Dependency-Track + SLA fix.</li>
  <li>A.8.25 Secure development life cycle → SDLC document, threat model, code review.</li>
  <li>A.8.28 Secure coding → SAST + linter + secure coding training.</li>
  <li>A.8.29 Security testing → DAST, pentest định kỳ, IR drill.</li>
  <li>A.8.32 Change management → branch protection, ticket-driven deploy, audit log.</li>
</ul>
<p>Engineer không cần thuộc số hiệu, nhưng cần biết tool nào của mình đang phục vụ control nào để khi auditor hỏi, có thể trỏ thẳng vào dashboard/log.</p>

<h2 id="soc-2">SOC 2 Type II</h2>
<p>SOC 2 không cấp "cert" mà là báo cáo của CPA. Type II quan trọng hơn Type I vì kiểm tra hiệu quả control trong khoảng thời gian (thường 6-12 tháng). Engineer cần chuẩn bị evidence định kỳ:</p>
<ul>
  <li>Access review hàng quý: ai có quyền gì, trong bao lâu.</li>
  <li>Change ticket gắn PR/deploy: mỗi production change phải truy được nguồn yêu cầu.</li>
  <li>Backup test thực tế (không chỉ chạy backup).</li>
  <li>Vulnerability management report theo SLA.</li>
  <li>IR drill report (tabletop, post-mortem).</li>
</ul>
<p>Mẹo: dùng <strong>compliance automation</strong> (Vanta, Drata, Secureframe) để pull evidence từ AWS/GCP, GitHub, Okta, MDM tự động — giảm 80% công thu thập thủ công.</p>

<h2 id="pci-dss-v4">PCI DSS v4.0 — những điểm engineer dễ bỏ sót</h2>
<ul>
  <li><strong>Scope minimization</strong>: tokenization và outsource cho payment processor để giảm Cardholder Data Environment (CDE), từ đó giảm số control áp dụng.</li>
  <li><strong>Customised approach</strong> trong v4: cho phép tự thiết kế control miễn đạt mục tiêu — phù hợp cloud-native, nhưng cần document chi tiết.</li>
  <li><strong>Multi-factor everywhere</strong>: MFA bắt buộc cho mọi truy cập vào CDE từ 2025.</li>
  <li><strong>Targeted Risk Analysis</strong>: nhiều control trong v4 yêu cầu risk analysis cho tần suất review/test.</li>
  <li><strong>Software security</strong>: Req 6 mở rộng yêu cầu inventory phần mềm bespoke + custom (≈ SBOM cho code nội bộ).</li>
</ul>

<h2 id="nghi-dinh-13-2023">Nghị định 13/2023/NĐ-CP và Luật Dữ liệu cá nhân</h2>
<p>Điểm cốt lõi engineer cần nhớ:</p>
<ul>
  <li><strong>Phân loại</strong>: dữ liệu cá nhân cơ bản và <em>nhạy cảm</em> (sức khoẻ, sinh trắc học, chính trị, tôn giáo, tài chính, vị trí, lịch sử tội phạm…). Áp dụng control khác nhau.</li>
  <li><strong>Đánh giá tác động xử lý DLCN</strong> (DPIA tương đương): bắt buộc với hệ thống có quy mô/sensitivity cao, lưu hồ sơ.</li>
  <li><strong>Sự đồng ý</strong> phải rõ ràng, có thể rút lại, không gộp với điều khoản khác.</li>
  <li><strong>Thông báo vi phạm trong 72 giờ</strong> kể từ khi biết, gửi A05 — Bộ Công an.</li>
  <li><strong>Chuyển dữ liệu xuyên biên giới</strong>: phải có hồ sơ đánh giá, lưu tại VN trong thời hạn quy định cho một số loại dữ liệu.</li>
</ul>
<p>Map vào kỹ thuật:</p>
<ul>
  <li>Data classification tag trong DB và data catalog.</li>
  <li>Pseudonymization/encryption ở cột nhạy cảm + key management qua KMS.</li>
  <li>Audit log truy cập dữ liệu nhạy cảm, retention theo chính sách.</li>
  <li>Runbook breach 72h: ai phát hiện → triage → notify → record.</li>
  <li>DPIA template kích hoạt từ feature toggle khi có PII mới.</li>
</ul>

<h2 id="compliance-as-code">Compliance-as-code: evidence từ pipeline</h2>
<p>Thay vì thu thập thủ công vào kỳ audit, sinh evidence như artifact của pipeline:</p>
<ul>
  <li>Branch protection screenshot → export qua GitHub API mỗi tháng, lưu evidence bucket.</li>
  <li>Mỗi deploy gắn change ticket id và sign-off → query Loki/CloudTrail tự sinh report.</li>
  <li>Access review tự động dump IAM, Okta group, K8s RBAC → so sánh với HRIS để phát hiện orphan account.</li>
  <li>Backup verification job thực sự restore vào ephemeral env và compare checksum hàng tuần.</li>
  <li>Vulnerability dashboard từ Dependency-Track + DefectDojo trở thành "exhibit" trực tiếp.</li>
</ul>

<h2 id="control-mapping-mau">Control mapping mẫu — 1 dòng evidence</h2>
<table>
  <thead><tr><th>Control</th><th>Tool</th><th>Evidence file</th><th>Cadence</th></tr></thead>
  <tbody>
    <tr><td>ISO A.8.8 / SOC2 CC7.1</td><td>Trivy + Dependency-Track</td><td>monthly-vuln-report.pdf</td><td>Hàng tháng</td></tr>
    <tr><td>ISO A.8.32 / SOC2 CC8.1</td><td>GitHub branch protection</td><td>branch-protection.json</td><td>Hàng quý</td></tr>
    <tr><td>PCI Req 8 / SOC2 CC6.1</td><td>Okta + IdP report</td><td>access-review-Q&lt;n&gt;.csv</td><td>Hàng quý</td></tr>
    <tr><td>NĐ 13 Đ.25</td><td>Audit log query</td><td>pii-access-log-monthly.json</td><td>Hàng tháng</td></tr>
  </tbody>
</table>

<h2 id="ket-luan">Kết luận</h2>
<p>Compliance là cơ hội đầu tư hệ thống chứ không phải sự kiện 1 lần/năm. Khi biết khung nào áp dụng, map về control kỹ thuật, sinh evidence tự động, kỳ audit chỉ còn là export báo cáo. Quan trọng hơn: hệ thống thật sự an toàn hơn — chính là mục tiêu mà DevSecOps theo đuổi.</p>
