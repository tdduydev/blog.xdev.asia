---
id: 019d0001-1002-7002-b002-000000000002
title: 'Threat Modeling thực dụng cho engineer: STRIDE trên DFD trong 60 phút'
slug: threat-modeling-stride-cho-engineer
excerpt: >-
  Threat model không cần phải là tài liệu 50 trang. Một buổi 60 phút với DFD
  level 1, STRIDE và risk register đủ để tránh lớp lỗi thiết kế thường xuyên
  thấy trong audit và pentest.
featured_image: /images/blog/threat-modeling-stride-featured.webp
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
  name: Bảo mật
  slug: security
tags:
  - name: devsecops
    slug: devsecops
  - name: threat-modeling
    slug: threat-modeling
  - name: stride
    slug: stride
  - name: secure-design
    slug: secure-design
comments: []
---
<blockquote>Phần lớn lỗ hổng nghiêm trọng phát sinh từ giai đoạn thiết kế, không phải coding. Một threat model nhẹ, làm sớm, có owner — giá trị hơn nhiều một báo cáo pentest 100 trang sau khi go-live.</blockquote>

<h2 id="threat-model-la-gi">Threat model là gì?</h2>
<p>Threat model là quá trình trả lời 4 câu hỏi của Adam Shostack:</p>
<ol>
  <li><strong>What are we working on?</strong> — Vẽ data flow diagram (DFD).</li>
  <li><strong>What can go wrong?</strong> — Áp dụng STRIDE để liệt kê threat.</li>
  <li><strong>What are we going to do about it?</strong> — Mitigation hoặc accept risk có người chịu trách nhiệm.</li>
  <li><strong>Did we do a good job?</strong> — Review lại sau khi triển khai.</li>
</ol>

<h2 id="stride-mot-phut-hieu">STRIDE trong một phút</h2>
<table>
  <thead><tr><th>Threat</th><th>Vi phạm</th><th>Ví dụ</th></tr></thead>
  <tbody>
    <tr><td>Spoofing</td><td>Authentication</td><td>Giả mạo user, token bị reuse</td></tr>
    <tr><td>Tampering</td><td>Integrity</td><td>Sửa request, sửa data ở DB</td></tr>
    <tr><td>Repudiation</td><td>Non-repudiation</td><td>Không có audit log đủ để chứng minh hành động</td></tr>
    <tr><td>Information disclosure</td><td>Confidentiality</td><td>Lộ PII, lộ key qua log</td></tr>
    <tr><td>Denial of service</td><td>Availability</td><td>Brute force, slowloris, expensive query</td></tr>
    <tr><td>Elevation of privilege</td><td>Authorization</td><td>IDOR, escape sandbox, container break-out</td></tr>
  </tbody>
</table>

<h2 id="ve-dfd-dung-cap">Vẽ DFD đúng cấp</h2>
<p>Bốn loại element cần có trên DFD:</p>
<ul>
  <li><strong>External entity</strong>: user, third-party API.</li>
  <li><strong>Process</strong>: service, function.</li>
  <li><strong>Data store</strong>: DB, S3, queue.</li>
  <li><strong>Data flow</strong>: mũi tên giữa các element.</li>
</ul>
<p>Quan trọng nhất là <strong>trust boundary</strong>: ranh giới giữa các vùng có mức tin cậy khác nhau (Internet ↔ web tier, app ↔ DB, tenant A ↔ tenant B). Mỗi mũi tên cắt qua trust boundary là một điểm cần xác thực, validate, mã hoá.</p>
<p>Bắt đầu với DFD level 1 (1 service + dependencies trực tiếp). Đừng vẽ level 0 chung chung hoặc đi quá sâu xuống level 3 — sẽ tốn thời gian mà không thêm thông tin ra quyết định.</p>

<h2 id="apply-stride-tren-tung-element">Áp dụng STRIDE trên từng element</h2>
<p>Một mẹo thực dụng: với mỗi element trên DFD, hỏi 6 câu STRIDE. Không cần ép có threat ở mọi ô — bỏ qua nếu không hợp lý. Ghi vào bảng:</p>
<pre><code>| Element        | Threat | Mô tả                                     | Mitigation             | Owner | Severity |
| -------------- | ------ | ----------------------------------------- | ---------------------- | ----- | -------- |
| Login endpoint | S      | Brute force account                       | Rate limit + MFA       | @team | High     |
| Login endpoint | I      | Lộ user enum qua message lỗi              | Generic error message  | @team | Medium   |
| Upload service | T      | File replace race trên storage            | Versioning + checksum  | @team | Medium   |
| Order DB       | E      | IDOR khi truy vấn /orders/{id}            | Authz check theo owner | @team | High     |
</code></pre>

<h2 id="cham-diem-rui-ro">Chấm điểm rủi ro</h2>
<p>Hai phương án phổ biến:</p>
<ul>
  <li><strong>CVSS v3.1/v4</strong>: chuẩn industry, dùng tốt cho vulnerability cụ thể, có vector chuẩn để chia sẻ.</li>
  <li><strong>OWASP Risk Rating</strong>: đơn giản (Likelihood × Impact), dễ giải thích cho stakeholder không kỹ thuật.</li>
</ul>
<p>Chọn 1 phương pháp thống nhất trong tổ chức và viết rõ trong handbook. Đừng để mỗi team tự chế thang điểm — sẽ không so sánh được.</p>

<h2 id="risk-register-la-tai-san-song">Risk register là tài sản sống</h2>
<p>Threat model không phải tài liệu một lần. Risk register cần:</p>
<ul>
  <li>Có owner cho từng risk.</li>
  <li>Có deadline mitigation hoặc lý do accept.</li>
  <li>Được review mỗi quý hoặc khi có thay đổi kiến trúc lớn.</li>
  <li>Liên kết với issue tracker để mitigation có ticket thực sự.</li>
</ul>

<h2 id="khi-nao-can-linddun-pasta">Khi nào cần LINDDUN, PASTA?</h2>
<p>Mặc định dùng STRIDE. Cân nhắc thêm:</p>
<ul>
  <li><strong>LINDDUN</strong> khi service xử lý nhiều PII/PHI và cần threat model về privacy (Linkability, Identifiability, Non-repudiation, Detectability, Disclosure, Unawareness, Non-compliance).</li>
  <li><strong>PASTA</strong> khi cần threat model gắn với risk business chi tiết, có 7 stage formal — phù hợp cho hệ thống critical (banking, healthcare).</li>
</ul>

<h2 id="ket-luan">Kết luận</h2>
<p>Threat modeling không phải là magic. Một buổi 60 phút với DFD level 1, STRIDE checklist và risk register đã đủ giúp một service tránh phần lớn lỗi thiết kế. Lặp lại định kỳ, có owner, gắn vào ADR — đó là cách biến threat model thành thói quen kỹ thuật, không phải sự kiện hàng năm.</p>
