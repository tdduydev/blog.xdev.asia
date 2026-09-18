---
id: 019d0001-1007-7007-b007-000000000007
title: 'Detection Engineering & Incident Response trong DevSecOps'
slug: incident-response-detection-engineering-devsecops
excerpt: >-
  Phòng thủ tốt cần ba thứ: log có cấu trúc, detection rule map theo ATT&CK, và
  IR runbook đã diễn tập. Bài viết tổng hợp cách build chương trình
  detection-as-code và post-mortem blameless cho team DevSecOps.
featured_image: /images/blog/detection-ir-devsecops-featured.webp
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
  - name: detection-engineering
    slug: detection-engineering
  - name: sigma
    slug: sigma
  - name: mitre-attack
    slug: mitre-attack
  - name: incident-response
    slug: incident-response
comments: []
---
<blockquote>Có log không có nghĩa là có detection. Có alert không có nghĩa là có response. Detection engineering là quá trình biến raw event thành tín hiệu hành động được, có owner, có MTTD/MTTR đo được.</blockquote>

<h2 id="logging-truoc-khi-noi-detection">Logging trước khi nói detection</h2>
<p>Log không có cấu trúc thì không scale. Bốn nguyên tắc:</p>
<ul>
  <li><strong>Structured JSON</strong> với field chuẩn: <code>timestamp</code>, <code>service</code>, <code>env</code>, <code>request_id</code>, <code>user_id</code> (đã hash/redact), <code>action</code>, <code>result</code>.</li>
  <li><strong>Correlation ID</strong> đi xuyên service, gateway, queue — dùng W3C Trace Context.</li>
  <li><strong>Đừng log raw secret/PII</strong>. Redact ở SDK chung trước khi xuất stdout.</li>
  <li><strong>Audit log riêng</strong> cho hành động nhạy cảm (admin action, key access, data export) — schema khác, retention dài hơn (12-36 tháng).</li>
</ul>

<h2 id="nguon-log-quan-trong">Nguồn log quan trọng cần stream về SIEM</h2>
<table>
  <thead><tr><th>Nguồn</th><th>Giá trị detection</th></tr></thead>
  <tbody>
    <tr><td>Cloud audit (CloudTrail, Activity Log)</td><td>IAM bất thường, key creation, region lạ</td></tr>
    <tr><td>K8s audit log (Metadata level)</td><td>RBAC change, exec into pod, secret access</td></tr>
    <tr><td>Identity provider (Okta, Azure AD)</td><td>Brute force, impossible travel, MFA bypass</td></tr>
    <tr><td>Application audit log</td><td>Privilege escalation, data export khối lớn</td></tr>
    <tr><td>Falco / Tetragon</td><td>Hành vi runtime container</td></tr>
    <tr><td>WAF, CDN, gateway</td><td>Brute force, scraping, anomaly</td></tr>
  </tbody>
</table>

<h2 id="sigma-detection-as-code">Sigma: detection-as-code</h2>
<p>Sigma là format YAML chuẩn để mô tả detection rule độc lập với SIEM (chuyển đổi sang Splunk SPL, ELK Lucene, Sentinel KQL...). Ví dụ:</p>
<pre><code class="language-yaml">title: K8s exec into production pod
id: 1f0e3aa8-...
status: stable
logsource:
  product: kubernetes
  service: audit
detection:
  selection:
    verb: create
    objectRef.subresource: exec
    objectRef.namespace|startswith: prod-
  condition: selection
level: high
tags:
  - attack.execution
  - attack.t1609   # container administration command
</code></pre>
<p>Lưu rule trong git, review qua PR, có CI test (positive/negative case). Đó là <strong>detection-as-code</strong>.</p>

<h2 id="map-mitre-attack">Map theo MITRE ATT&CK</h2>
<p>ATT&CK chia attacker behavior thành tactic (mục tiêu) và technique (cách thực hiện). Lợi ích khi map detection theo ATT&CK:</p>
<ul>
  <li>Biết mình thiếu detection ở tactic nào (vd: tốt ở Initial Access nhưng yếu ở Lateral Movement, Exfiltration).</li>
  <li>So với threat intel: nhóm APT đang nhắm tới ngành mình dùng technique gì → ưu tiên detection tương ứng.</li>
  <li>Báo cáo coverage rõ ràng cho leadership: "phủ 65% technique relevant cho stack chúng ta".</li>
</ul>

<h2 id="ir-runbook-tabletop">IR runbook và tabletop exercise</h2>
<p>Vòng ứng phó NIST PICERL: Preparation → Identification → Containment → Eradication → Recovery → Lessons learned. Mỗi runbook nên có:</p>
<ul>
  <li><strong>Severity matrix</strong>: SEV1/2/3 với SLA response.</li>
  <li><strong>On-call rotation</strong> rõ ràng, escalation path.</li>
  <li><strong>Communication template</strong>: status page, customer notice, regulator notice (NĐ 13: 72h).</li>
  <li><strong>Evidence preservation</strong>: snapshot disk/memory, copy log, export audit — TRƯỚC khi xoá/khôi phục.</li>
  <li><strong>Containment playbook</strong> theo loại sự cố: secret leak, account compromise, ransomware, data exfil.</li>
</ul>
<p>Tổ chức tabletop exercise 1-2 lần/quý, mỗi lần 60-90 phút, với 1 scenario thực tế. Đo: thời gian phát hiện (MTTD), thời gian ngăn chặn (MTTC), thời gian khôi phục (MTTR).</p>

<h2 id="post-mortem-blameless">Post-mortem blameless</h2>
<p>Mục tiêu không phải tìm người để phạt, mà tìm <em>điều kiện hệ thống</em> cho phép sự cố xảy ra. Template tham khảo:</p>
<ul>
  <li><strong>Tóm tắt</strong> (3-5 dòng).</li>
  <li><strong>Timeline</strong>: ai, làm gì, lúc nào, với UTC timestamp.</li>
  <li><strong>Impact</strong>: user, data, financial.</li>
  <li><strong>Root cause</strong>: contributing factor (thường nhiều, không một).</li>
  <li><strong>What went well</strong>: thừa nhận cái tốt để củng cố.</li>
  <li><strong>Action item</strong>: có owner và deadline thực tế, vào sprint backlog.</li>
</ul>
<p>Văn hoá blameless cần lãnh đạo bảo vệ — nếu người báo cáo bị phạt, lần sau không ai dám kể trung thực.</p>

<h2 id="bug-bounty-purple-team">Bug bounty và purple team</h2>
<p>Bổ sung cho detection nội bộ:</p>
<ul>
  <li><strong>Responsible disclosure</strong> via <code>security.txt</code> + email <code>security@</code>: rẻ và miễn phí.</li>
  <li><strong>Bug bounty</strong> qua HackerOne/Intigriti hoặc nội địa: scope rõ, payout rõ.</li>
  <li><strong>Purple team exercise</strong>: red team chạy 1 technique, blue team đo có detect không, sau đó cùng tune rule. Học chéo, không tính điểm.</li>
</ul>

<h2 id="metric-can-do">Metric cần đo</h2>
<ul>
  <li>MTTD theo loại sự cố.</li>
  <li>MTTR vuln theo severity và % đúng SLA.</li>
  <li>Tỷ lệ alert true positive (phòng cháy alert fatigue).</li>
  <li>Coverage ATT&CK theo tactic.</li>
  <li>Tần suất tabletop, % action item từ post-mortem hoàn thành đúng hạn.</li>
</ul>

<h2 id="ket-luan">Kết luận</h2>
<p>Detection engineering và IR là nơi DevSecOps gặp SOC. Coi rule như code (Sigma + git + CI), coi runbook như product (review, version, đo MTTR), và bảo vệ văn hoá blameless. Khi đó mỗi sự cố trở thành nhiên liệu cải tiến hệ thống thay vì sự kiện gây hoảng loạn.</p>
