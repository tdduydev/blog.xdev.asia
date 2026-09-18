---
id: 019c9617-fd6f-7042-b48b-3770ede137bf
title: Thiết kế Kiến trúc Phân quyền Dữ liệu theo Cấp Hành chính
slug: thiet-ke-kien-truc-phan-quyen-du-lieu-theo-cap-hanh-chinh
excerpt: >-
  Bài viết này phân tích chi tiết kiến trúc phân quyền dữ liệu cho các hệ thống
  có cấu trúc phân cấp — từ chính phủ, tập đoàn đa quốc gia, đến chuỗi bán lẻ
  với hàng nghìn chi nhánh.
featured_image: /images/blog/phan-quyen-du-lieu-featured.webp
type: blog
reading_time: 37
view_count: 0
meta: null
published_at: '2025-12-20T06:11:57.000000Z'
created_at: '2026-02-25T18:38:00.000000Z'
author:
  id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf
  name: Duy Tran
  avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg
category:
  id: 019c9617-fabb-72e7-91c2-a99abfb1cb8a
  name: Security
  slug: security
tags:
  - name: security
    slug: security
  - name: rbac
    slug: rbac
  - name: system-design
    slug: system-design
  - name: authorization
    slug: authorization
  - name: rls
    slug: rls
  - name: multi-tenant
    slug: multi-tenant
  - name: enterprise-architecture
    slug: enterprise-architecture
comments: []
---
<blockquote>Làm thế nào để xây dựng một hệ thống mà cấp trên có thể giám sát toàn bộ dữ liệu cấp dưới, trong khi các đơn vị ngang hàng hoàn toàn cách ly với nhau? Bài viết này phân tích chi tiết kiến trúc phân quyền dữ liệu cho các hệ thống có cấu trúc phân cấp — từ chính phủ, tập đoàn đa quốc gia, đến chuỗi bán lẻ với hàng nghìn chi nhánh.</blockquote><hr><h2 id="ph%E1%BA%A7n-1-b%C3%A0i-to%C3%A1n-ph%C3%A2n-quy%E1%BB%81n-ph%C3%A2n-c%E1%BA%A5p">Phần 1: Bài toán Phân quyền Phân cấp</h2><h3 id="11-%C4%91%E1%BA%B7c-%C4%91i%E1%BB%83m-c%E1%BB%A7a-h%E1%BB%87-th%E1%BB%91ng-ph%C3%A2n-c%E1%BA%A5p">1.1. Đặc điểm của hệ thống phân cấp</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/a-c-ie-m-cu-a-he-tho-ng-pha-n-ca-p-ca5b6eb2.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Đặc điểm của hệ thống phân cấp</span></figcaption></figure><p>Nhiều tổ chức vận hành theo cấu trúc phân cấp (hierarchical structure): tập đoàn có công ty con, công ty con có chi nhánh, chi nhánh có phòng ban. Chính phủ có bộ ngành, tỉnh thành, quận huyện, phường xã. Chuỗi bán lẻ có vùng miền, khu vực, cửa hàng.</p><p>Điểm chung của các cấu trúc này là mối quan hệ <strong>parent-child</strong> giữa các đơn vị, tạo thành một cây (tree) với các đặc tính:</p><ul><li>Mỗi đơn vị (trừ root) có đúng một đơn vị cha</li><li>Mỗi đơn vị có thể có nhiều đơn vị con</li><li>Độ sâu của cây có thể khác nhau ở các nhánh</li><li>Cấu trúc có thể thay đổi theo thời gian (sáp nhập, chia tách, tái cơ cấu)</li></ul><h3 id="12-y%C3%AAu-c%E1%BA%A7u-ph%C3%A2n-quy%E1%BB%81n-%C4%91%E1%BA%B7c-th%C3%B9">1.2. Yêu cầu phân quyền đặc thù</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/f350576b-00af-4f46-83f0-c7a776b08139-f55727ad.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Yêu cầu phân quyền đặc thù</span></figcaption></figure><p>Hệ thống phân cấp đặt ra những yêu cầu phân quyền đặc biệt mà mô hình phân quyền phẳng (flat permission model) không đáp ứng được:</p><p><strong>Vertical Access (Truy cập dọc):</strong> Cấp trên cần xem được dữ liệu của tất cả cấp dưới trực thuộc. CEO cần xem báo cáo của toàn tập đoàn, bao gồm mọi công ty con và chi nhánh. Regional Manager cần xem dữ liệu của tất cả cửa hàng trong vùng.</p><p><strong>Horizontal Isolation (Cách ly ngang):</strong> Các đơn vị cùng cấp không được xem dữ liệu của nhau. Chi nhánh A không được xem doanh thu của Chi nhánh B, dù cả hai cùng thuộc một công ty con. Điều này đảm bảo tính cạnh tranh công bằng và bảo mật thông tin kinh doanh.</p><p><strong>Contextual Scope (Phạm vi ngữ cảnh):</strong> Cùng một role nhưng phạm vi khác nhau. "Branch Manager" ở Chi nhánh A chỉ quản lý Chi nhánh A; "Branch Manager" ở Chi nhánh B chỉ quản lý Chi nhánh B. Role giống nhau, quyền hạn giống nhau, nhưng dữ liệu được phép truy cập hoàn toàn khác.</p><p><strong>Inheritance with Boundaries (Kế thừa có giới hạn):</strong> Quyền được kế thừa theo chiều dọc nhưng không lan theo chiều ngang. Country Director kế thừa tất cả quyền của Regional Manager trong phạm vi quốc gia đó, nhưng không có quyền gì ở quốc gia khác.</p><h3 id="13-t%E1%BA%A1i-sao-ph%C3%A2n-quy%E1%BB%81n-ph%E1%BA%B3ng-th%E1%BA%A5t-b%E1%BA%A1i">1.3. Tại sao phân quyền phẳng thất bại</h3><p>Mô hình phân quyền phẳng gán trực tiếp permission cho user hoặc role, không có khái niệm hierarchy. Khi áp dụng cho hệ thống phân cấp, nó gặp nhiều vấn đề:</p><p><strong>Bùng nổ số lượng role:</strong> Nếu có 10 loại role và 1.000 đơn vị, về lý thuyết cần 10.000 role riêng biệt (mỗi role-đơn vị là một combination). Thêm một loại role mới đồng nghĩa với việc tạo 1.000 role mới.</p><p><strong>Khó bảo trì tính nhất quán:</strong> Khi đơn vị tái cơ cấu (sáp nhập, chia tách), tất cả role liên quan cần cập nhật thủ công. Sai sót dẫn đến lỗ hổng bảo mật hoặc mất quyền truy cập hợp lệ.</p><p><strong>Không hỗ trợ kế thừa tự nhiên:</strong> Để cấp trên xem được dữ liệu cấp dưới, phải grant quyền vào từng đơn vị cấp dưới một cách thủ công. Khi thêm đơn vị mới, dễ quên grant quyền cho cấp trên.</p><p><strong>Query phức tạp:</strong> Mỗi truy vấn dữ liệu cần kèm theo danh sách dài các đơn vị được phép, làm query phức tạp và chậm.</p><h3 id="14-quy-m%C3%B4-v%C3%A0-%C4%91%E1%BB%99-ph%E1%BB%A9c-t%E1%BA%A1p">1.4. Quy mô và độ phức tạp</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/ca-c-va-n-e-cu-a-mo-hi-nh-pha-n-quye-n-pha-ng-trong-he-tho-ng-pha-n-ca-p-ed77b822.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Quy mô và độ phức tạp</span></figcaption></figure><p>Độ phức tạp của bài toán tăng theo:</p><ul><li><strong>Số lượng đơn vị:</strong> Từ vài chục đến hàng chục nghìn</li><li><strong>Độ sâu của cây:</strong> Từ 2-3 cấp đến 5-6 cấp hoặc hơn</li><li><strong>Tính động của cấu trúc:</strong> Cấu trúc cố định vs thường xuyên thay đổi</li><li><strong>Số lượng user:</strong> Từ vài trăm đến hàng triệu</li><li><strong>Yêu cầu về latency:</strong> Milliseconds cho ứng dụng realtime</li><li><strong>Yêu cầu compliance:</strong> Audit trail, data residency, encryption</li></ul><hr><h2 id="ph%E1%BA%A7n-2-n%E1%BB%81n-t%E1%BA%A3ng-l%C3%BD-thuy%E1%BA%BFt">Phần 2: Nền tảng Lý thuyết</h2><h3 id="21-rbac-v%C3%A0-c%C3%A1c-bi%E1%BA%BFn-th%E1%BB%83-theo-chu%E1%BA%A9n-nist">2.1. RBAC và các biến thể theo chuẩn NIST</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/c3d5a155-acdf-4fc9-ae1b-90b45e7a0640-1-201-a-0df31065.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">RBAC và các biến thể theo chuẩn NIST</span></figcaption></figure><p>Role-Based Access Control (RBAC) được chuẩn hóa bởi NIST trong tiêu chuẩn ANSI/INCITS 359-2004, phân thành 4 mức độ:</p><p><strong>RBAC0 — Core RBAC:</strong> Mô hình cơ sở với ba thành phần: Users, Roles, và Permissions. User được gán vào Role, Role được gán Permission. Đây là nền tảng nhưng thiếu khái niệm kế thừa, chưa phù hợp cho hệ thống phân cấp.</p><p><strong>RBAC1 — Hierarchical RBAC:</strong> Bổ sung Role Hierarchy, cho phép role cấp cao thừa kế tất cả permission của role cấp thấp. Ví dụ: Senior Manager thừa kế permission của Manager, Manager thừa kế permission của Staff. Đây là mô hình phù hợp nhất cho cấu trúc tổ chức phân cấp.</p><p>Có hai loại hierarchy:</p><ul><li><strong>General Hierarchy:</strong> Cho phép multiple inheritance — một role có thể kế thừa từ nhiều role khác</li><li><strong>Limited Hierarchy:</strong> Chỉ cho phép single inheritance — mỗi role chỉ kế thừa từ một role duy nhất, tạo thành cây đơn giản</li></ul><p><strong>RBAC2 — Constrained RBAC:</strong> Bổ sung các ràng buộc (constraints), quan trọng nhất là Separation of Duties (SoD):</p><ul><li><strong>Static SoD:</strong> Ngăn một user đồng thời giữ các role xung đột. Ví dụ: không thể vừa là "Người tạo đơn hàng" vừa là "Người phê duyệt đơn hàng".</li><li><strong>Dynamic SoD:</strong> Cho phép giữ nhiều role xung đột nhưng không kích hoạt cùng lúc trong một session. User có thể có cả role "Nhập liệu" và "Phê duyệt" nhưng phải chọn một khi đăng nhập.</li></ul><p><strong>RBAC3 — Symmetric RBAC:</strong> Kết hợp RBAC1 và RBAC2, cung cấp đầy đủ tính năng hierarchy và constraints.</p><h3 id="22-abac-%E2%80%94-attribute-based-access-control">2.2. ABAC — Attribute-Based Access Control</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/87de5d0d-0c9c-442f-b27e-1968c21773e6-1-201-a-7045abcd.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">ABAC — Attribute-Based Access Control</span></figcaption></figure><p>ABAC mở rộng RBAC bằng cách đánh giá nhiều thuộc tính (attributes) khi ra quyết định phân quyền:</p><ul><li><strong>Subject Attributes:</strong> Thuộc tính của người dùng — department, job title, clearance level, location</li><li><strong>Resource Attributes:</strong> Thuộc tính của tài nguyên — classification, owner, creation date, sensitivity level</li><li><strong>Environment Attributes:</strong> Thuộc tính ngữ cảnh — time of day, IP address, device type, threat level</li><li><strong>Action Attributes:</strong> Loại hành động — read, write, delete, approve</li></ul><p>Policy ABAC được viết dưới dạng rules. Ví dụ:</p><pre><code>IF subject.department = resource.owner_department
AND subject.clearance_level &gt;= resource.sensitivity_level
AND environment.time IN business_hours
AND environment.ip_range IN corporate_network
THEN ALLOW action
</code></pre><p>ABAC mạnh mẽ và linh hoạt nhưng phức tạp trong triển khai, khó debug, và có thể ảnh hưởng performance nếu policy phức tạp. Khuyến nghị sử dụng ABAC bổ sung cho RBAC trong các trường hợp cần kiểm soát chi tiết, không thay thế hoàn toàn.</p><h3 id="23-multi-tenancy-v%C3%A0-c%C3%A1c-m%C3%B4-h%C3%ACnh">2.3. Multi-tenancy và các mô hình</h3><p>Multi-tenancy là kiến trúc cho phép một hệ thống phục vụ nhiều tenant (đơn vị/tổ chức) độc lập với dữ liệu được cách ly:</p><p><strong>Siloed Model — Database per Tenant:</strong> Mỗi tenant có database riêng biệt. Cách ly tuyệt đối, dễ customize per tenant, dễ comply với data residency requirements. Nhược điểm: chi phí infrastructure cao, khó maintain khi số tenant lớn, cross-tenant reporting phức tạp.</p><p><strong>Bridge Model — Schema per Tenant:</strong> Các tenant dùng chung database instance nhưng mỗi tenant có schema riêng. Cân bằng giữa isolation và efficiency. Nhược điểm: số lượng schema có giới hạn trong một database, migration phức tạp.</p><p><strong>Pooled Model — Shared Everything:</strong> Tất cả tenant dùng chung database và schema, phân biệt bằng tenant_id column. Chi phí thấp nhất, dễ scale, dễ maintain. Nhược điểm: cần cơ chế isolation mạnh ở application và database layer, một bug có thể ảnh hưởng tất cả tenant.</p><p><strong>Khuyến nghị:</strong> Pooled Model với Row-Level Security (RLS) cho hầu hết trường hợp. Chỉ dùng Siloed Model khi có yêu cầu đặc biệt về data residency hoặc tenant cần customization sâu.</p><h3 id="24-hierarchical-multi-tenancy">2.4. Hierarchical Multi-tenancy</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/hierarchical-multi-tenancy-b2a7cf53.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Hierarchical Multi-tenancy</span></figcaption></figure><p>Đây là extension của multi-tenancy cho cấu trúc phân cấp, nơi tenant được tổ chức thành cây thay vì flat list:</p><pre><code>Root Tenant (Headquarters)
├── Sub-tenant: Region North
│   ├── Sub-sub-tenant: Branch A
│   ├── Sub-sub-tenant: Branch B
│   └── Sub-sub-tenant: Branch C
├── Sub-tenant: Region South
│   ├── Sub-sub-tenant: Branch D
│   └── Sub-sub-tenant: Branch E
└── Sub-tenant: Region West
    └── Sub-sub-tenant: Branch F
</code></pre><p><strong>Quy tắc truy cập:</strong></p><ul><li>Parent tenant có thể xem dữ liệu của tất cả descendant tenants</li><li>Sibling tenants (cùng cấp, cùng parent) không thể xem dữ liệu của nhau</li><li>Child tenant không thể xem dữ liệu của parent (trừ dữ liệu được share explicitly)</li></ul><p>Mô hình này map tự nhiên vào cấu trúc tổ chức và đơn giản hóa việc quản lý quyền: thay vì grant quyền vào từng đơn vị, chỉ cần xác định vị trí của user trong cây.</p><hr><h2 id="ph%E1%BA%A7n-3-thi%E1%BA%BFt-k%E1%BA%BF-data-model-cho-hierarchy">Phần 3: Thiết kế Data Model cho Hierarchy</h2><h3 id="31-c%C3%A1c-c%C3%A1ch-bi%E1%BB%83u-di%E1%BB%85n-c%C3%A2y-trong-database">3.1. Các cách biểu diễn cây trong database</h3><p>Việc biểu diễn cấu trúc cây trong relational database có nhiều cách tiếp cận, mỗi cách có trade-off riêng:</p><p><strong>Adjacency List:</strong> Mỗi node lưu ID của parent trực tiếp. Đây là cách đơn giản nhất và tự nhiên nhất.</p><p><em>Ưu điểm:</em> Dễ hiểu, dễ implement, insert/update/delete đơn giản, integrity dễ enforce bằng foreign key.</p><p><em>Nhược điểm:</em> Query để lấy tất cả descendants hoặc ancestors đòi hỏi recursive query (WITH RECURSIVE trong SQL), có thể chậm với cây sâu hoặc lớn.</p><p><em>Phù hợp khi:</em> Cây không quá sâu (&lt; 10 levels), chủ yếu query parent-child trực tiếp, cấu trúc thay đổi thường xuyên.</p><p><strong>Nested Set:</strong> Mỗi node lưu hai giá trị: left và right. Tất cả descendants của một node có left/right nằm trong khoảng (parent.left, parent.right).</p><p><em>Ưu điểm:</em> Query descendants cực nhanh (chỉ cần điều kiện BETWEEN), không cần recursion.</p><p><em>Nhược điểm:</em> Insert/update/delete rất chậm vì phải cập nhật left/right của nhiều nodes khác. Concurrent modification phức tạp.</p><p><em>Phù hợp khi:</em> Cây ít thay đổi, query descendants rất thường xuyên, có thể accept write performance trade-off.</p><p><strong>Closure Table:</strong> Lưu tất cả cặp ancestor-descendant trong một bảng riêng, kèm theo depth. Ví dụ: nếu A → B → C, bảng closure chứa (A,A,0), (A,B,1), (A,C,2), (B,B,0), (B,C,1), (C,C,0).</p><p><em>Ưu điểm:</em> Query ancestors và descendants đều nhanh, không cần recursion. Hỗ trợ tốt cho các query phức tạp như "tất cả nodes ở depth 2 từ node X".</p><p><em>Nhược điểm:</em> Tốn không gian lưu trữ (O(n²) trong worst case). Insert/delete cần cập nhật nhiều rows trong closure table.</p><p><em>Phù hợp khi:</em> Cần query cả ancestors và descendants thường xuyên, cây không quá lớn, có thể accept storage trade-off.</p><p><strong>Materialized Path:</strong> Mỗi node lưu đường dẫn từ root đến chính nó, thường dưới dạng string (ví dụ: "/1/5/12/") hoặc array (ví dụ: [1, 5, 12]).</p><p><em>Ưu điểm:</em> Query descendants dễ dàng (LIKE '/1/5/%' hoặc array contains). Insert đơn giản (chỉ cần biết path của parent). Có thể index hiệu quả.</p><p><em>Nhược điểm:</em> Move subtree đòi hỏi update path của tất cả descendants. Path có thể dài với cây sâu.</p><p><em>Phù hợp khi:</em> Cây ít thay đổi cấu trúc (move/reparent hiếm), query descendants thường xuyên, cần balance giữa read và write performance.</p><h3 id="32-khuy%E1%BA%BFn-ngh%E1%BB%8B-materialized-path-v%E1%BB%9Bi-array">3.2. Khuyến nghị: Materialized Path với Array</h3><p>Đối với hệ thống phân cấp hành chính/tổ chức, <strong>Materialized Path sử dụng array</strong> là lựa chọn tối ưu vì:</p><ul><li>Cấu trúc tổ chức thay đổi không thường xuyên (vài lần/năm)</li><li>Query "tất cả đơn vị con của X" rất phổ biến (cho phân quyền)</li><li>PostgreSQL và các database hiện đại hỗ trợ array với GIN index hiệu quả</li><li>Dễ kết hợp với RLS policies</li></ul><p><strong>Thiết kế bảng organizational_units:</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Column</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>id</td>
<td>UUID</td>
<td>Primary key</td>
</tr>
<tr>
<td>code</td>
<td>VARCHAR</td>
<td>Mã đơn vị (unique)</td>
</tr>
<tr>
<td>name</td>
<td>VARCHAR</td>
<td>Tên đơn vị</td>
</tr>
<tr>
<td>level</td>
<td>ENUM</td>
<td>Cấp độ (headquarters, region, branch, ...)</td>
</tr>
<tr>
<td>parent_id</td>
<td>UUID</td>
<td>FK đến parent (nullable cho root)</td>
</tr>
<tr>
<td>ancestor_path</td>
<td>UUID[]</td>
<td>Mảng ID từ root đến parent</td>
</tr>
<tr>
<td>created_at</td>
<td>TIMESTAMP</td>
<td>Thời điểm tạo</td>
</tr>
<tr>
<td>updated_at</td>
<td>TIMESTAMP</td>
<td>Thời điểm cập nhật</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<p><strong>Ví dụ dữ liệu:</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>id</th>
<th>name</th>
<th>level</th>
<th>parent_id</th>
<th>ancestor_path</th>
</tr>
</thead>
<tbody>
<tr>
<td>uuid-1</td>
<td>Headquarters</td>
<td>hq</td>
<td>null</td>
<td>[]</td>
</tr>
<tr>
<td>uuid-2</td>
<td>Region North</td>
<td>region</td>
<td>uuid-1</td>
<td>[uuid-1]</td>
</tr>
<tr>
<td>uuid-3</td>
<td>Branch A</td>
<td>branch</td>
<td>uuid-2</td>
<td>[uuid-1, uuid-2]</td>
</tr>
<tr>
<td>uuid-4</td>
<td>Branch B</td>
<td>branch</td>
<td>uuid-2</td>
<td>[uuid-1, uuid-2]</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<p><strong>Query tất cả descendants của Region North (uuid-2):</strong></p><pre><code class="language-sql">SELECT * FROM organizational_units 
WHERE uuid-2 = ANY(ancestor_path);
</code></pre><p>Query này trả về Branch A và Branch B — tất cả các đơn vị có uuid-2 trong ancestor_path.</p><h3 id="33-indexing-strategy">3.3. Indexing Strategy</h3><p>Để đảm bảo performance với dataset lớn:</p><p><strong>GIN Index cho ancestor_path:</strong> Cho phép query "X = ANY(ancestor_path)" chạy nhanh.</p><p><strong>B-tree Index cho parent_id:</strong> Cho query parent-child trực tiếp.</p><p><strong>Composite Index cho (level, parent_id):</strong> Cho query "tất cả branches thuộc region X".</p><p><strong>Partial Index cho active records:</strong> Nếu có soft-delete, index chỉ các records active.</p><h3 id="34-handling-structural-changes">3.4. Handling Structural Changes</h3><p>Khi cấu trúc thay đổi (move đơn vị từ parent này sang parent khác), cần cập nhật ancestor_path của đơn vị đó và tất cả descendants:</p><p><strong>Bước 1:</strong> Tính ancestor_path mới = [new_parent.ancestor_path, new_parent.id]</p><p><strong>Bước 2:</strong> Với mỗi descendant, thay thế phần prefix cũ bằng prefix mới trong ancestor_path</p><p><strong>Lưu ý:</strong> Đây là operation nặng nếu subtree lớn. Nên thực hiện trong off-peak hours, có thể cần batch processing và progress tracking.</p><hr><h2 id="ph%E1%BA%A7n-4-row-level-security-%E2%80%94-l%E1%BB%9Bp-b%E1%BA%A3o-v%E1%BB%87-cu%E1%BB%91i-c%C3%B9ng">Phần 4: Row-Level Security — Lớp Bảo vệ Cuối cùng</h2><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/39e12b1e-55b1-4389-a24d-e23c3d20eb31-1-201-a-55082eb6.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1116" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Row-Level Security — Lớp Bảo vệ Cuối cùng</span></figcaption></figure><h3 id="41-t%E1%BA%A1i-sao-c%E1%BA%A7n-rls">4.1. Tại sao cần RLS</h3><p>Application-level authorization kiểm tra quyền trong code ứng dụng. Đây là cách phổ biến nhưng có điểm yếu:</p><ul><li><strong>Bug trong code:</strong> Một developer quên thêm kiểm tra quyền vào API mới</li><li><strong>SQL Injection:</strong> Attacker bypass application layer, truy cập database trực tiếp</li><li><strong>Direct Database Access:</strong> DBA, BI tools, hoặc hacker có credentials truy cập database</li><li><strong>Microservices Complexity:</strong> Nhiều services truy cập cùng database, khó đảm bảo tất cả đều kiểm tra quyền đúng</li></ul><p>Row-Level Security (RLS) là tính năng của database (PostgreSQL, SQL Server, Oracle) cho phép định nghĩa policy kiểm soát truy cập ở mức row. Policy được database engine enforce, không thể bypass từ application.</p><p><strong>Defense in Depth:</strong> Dù application có bug, dù attacker có SQL injection, database vẫn chỉ trả về những rows mà current user được phép xem. RLS là lớp bảo vệ cuối cùng, không thay thế application-level checks nhưng bổ sung thêm một lớp an toàn.</p><h3 id="42-c%C3%A1ch-ho%E1%BA%A1t-%C4%91%E1%BB%99ng-c%E1%BB%A7a-rls">4.2. Cách hoạt động của RLS</h3><p><strong>Bước 1 — Enable RLS trên bảng:</strong> Mặc định RLS tắt. Khi bật, tất cả queries trên bảng đó sẽ được filter qua policies.</p><p><strong>Bước 2 — Định nghĩa Policy:</strong> Policy là một expression trả về boolean, xác định row nào được phép truy cập. Policy có thể áp dụng cho SELECT, INSERT, UPDATE, DELETE riêng biệt hoặc tất cả.</p><p><strong>Bước 3 — Set Session Context:</strong> Application set các biến session (ví dụ: current_user_id, current_org_unit_id) trước khi execute queries. Policy sử dụng các biến này để filter.</p><p><strong>Bước 4 — Query Execution:</strong> Database tự động thêm điều kiện từ policy vào WHERE clause của mọi query. User không cần (và không thể) thay đổi điều này.</p><h3 id="43-thi%E1%BA%BFt-k%E1%BA%BF-policy-cho-hierarchical-access">4.3. Thiết kế Policy cho Hierarchical Access</h3><p>Với mô hình ancestor_path đã thiết kế, policy cho phép hierarchical access:</p><p><strong>Logic:</strong> User thuộc đơn vị X được phép truy cập record nếu:</p><ul><li>Record thuộc chính đơn vị X, HOẶC</li><li>Đơn vị X nằm trong ancestor_path của đơn vị sở hữu record (tức X là ancestor của đơn vị đó)</li></ul><p><strong>Diễn giải:</strong></p><ul><li>Cán bộ Branch A (uuid-3) chỉ xem được records có org_unit_id = uuid-3</li><li>Manager Region North (uuid-2) xem được records có org_unit_id = uuid-2, uuid-3, uuid-4 (region và tất cả branches thuộc region)</li><li>Executive Headquarters (uuid-1) xem được tất cả records</li></ul><h3 id="44-session-context-management">4.4. Session Context Management</h3><p>RLS policy cần biết "current user thuộc đơn vị nào". Thông tin này được truyền qua session variables:</p><p><strong>Trong PostgreSQL:</strong> Sử dụng <code>SET</code> và <code>current_setting()</code>:</p><pre><code class="language-sql">-- Application set context sau khi xác thực user
SET LOCAL app.current_user_id = 'user-uuid';
SET LOCAL app.current_org_unit_id = 'uuid-3';

-- Policy đọc context
current_setting('app.current_org_unit_id', true)
</code></pre><p><strong>Lưu ý quan trọng:</strong></p><ul><li>Sử dụng <code>SET LOCAL</code> (chỉ có hiệu lực trong transaction) thay vì <code>SET</code> (có hiệu lực trong session) để tránh context leak giữa các requests</li><li>Luôn set context ở đầu mỗi transaction</li><li>Xử lý trường hợp context chưa được set (default deny)</li></ul><h3 id="45-performance-considerations">4.5. Performance Considerations</h3><p>RLS policy được evaluate cho mỗi row, có thể ảnh hưởng performance:</p><p><strong>Đảm bảo policy sử dụng indexed columns:</strong> Nếu policy check <code>org_unit_id = ANY(...)</code>, cần index trên org_unit_id.</p><p><strong>Tránh function calls phức tạp trong policy:</strong> Mỗi row đều gọi function đó. Nếu function query database, sẽ có N+1 problem.</p><p><strong>Sử dụng STABLE/IMMUTABLE functions:</strong> Cho phép PostgreSQL cache kết quả trong một query.</p><p><strong>Consider materialized permissions:</strong> Thay vì tính toán permissions realtime, có thể pre-compute và lưu vào bảng riêng, policy chỉ cần lookup.</p><h3 id="46-bypass-rls-cho-admin-operations">4.6. Bypass RLS cho Admin Operations</h3><p>Một số trường hợp cần bypass RLS:</p><ul><li>System migrations</li><li>Batch processing jobs</li><li>Reporting across all tenants</li><li>Emergency access</li></ul><p><strong>Cách an toàn:</strong></p><ul><li>Tạo separate database role với BYPASSRLS privilege</li><li>Role này chỉ được sử dụng bởi specific service accounts</li><li>Mọi access bằng role này được log chi tiết</li><li>Regular audit để đảm bảo role không bị lạm dụng</li></ul><hr><h2 id="ph%E1%BA%A7n-5-role-hierarchy-v%C3%A0-permission-design">Phần 5: Role Hierarchy và Permission Design</h2><h3 id="51-t%C3%A1ch-bi%E1%BB%87t-role-v%C3%A0-scope">5.1. Tách biệt Role và Scope</h3><p>Một sai lầm phổ biến là gộp role và scope vào cùng một entity. Ví dụ: tạo role "Branch_A_Manager", "Branch_B_Manager", "Region_North_Manager". Điều này dẫn đến bùng nổ số lượng roles.</p><p><strong>Thiết kế tốt hơn:</strong> Tách role (chức năng) và scope (phạm vi):</p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>User</th>
<th>Role</th>
<th>Scope (Org Unit)</th>
</tr>
</thead>
<tbody>
<tr>
<td>Alice</td>
<td>Manager</td>
<td>Branch A</td>
</tr>
<tr>
<td>Bob</td>
<td>Manager</td>
<td>Branch B</td>
</tr>
<tr>
<td>Carol</td>
<td>Manager</td>
<td>Region North</td>
</tr>
<tr>
<td>Dave</td>
<td>Analyst</td>
<td>Headquarters</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<p>Cùng role "Manager" nhưng scope khác nhau. Permission của Manager được định nghĩa một lần, scope xác định dữ liệu nào được phép truy cập.</p><h3 id="52-role-hierarchy-design">5.2. Role Hierarchy Design</h3><p><strong>Functional Roles (theo chức năng):</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Role</th>
<th>Description</th>
<th>Typical Permissions</th>
</tr>
</thead>
<tbody>
<tr>
<td>Viewer</td>
<td>Xem dữ liệu, báo cáo</td>
<td>Read</td>
</tr>
<tr>
<td>Operator</td>
<td>Xử lý nghiệp vụ hàng ngày</td>
<td>Read, Create, Update</td>
</tr>
<tr>
<td>Manager</td>
<td>Quản lý team, phê duyệt</td>
<td>Read, Create, Update, Approve</td>
</tr>
<tr>
<td>Administrator</td>
<td>Quản lý cấu hình</td>
<td>Read, Create, Update, Delete, Configure</td>
</tr>
<tr>
<td>Auditor</td>
<td>Kiểm toán</td>
<td>Read (bao gồm audit logs)</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<p><strong>Role Inheritance:</strong></p><pre><code>Administrator
    ↓ inherits
Manager
    ↓ inherits
Operator
    ↓ inherits
Viewer
</code></pre><p>Administrator tự động có tất cả permissions của Manager, Operator, và Viewer.</p><p><strong>Auditor</strong> thường không nằm trong hierarchy này vì có quyền đặc biệt (xem audit logs) nhưng không có quyền modify.</p><h3 id="53-permission-granularity">5.3. Permission Granularity</h3><p>Permissions có thể được định nghĩa ở nhiều mức độ chi tiết:</p><p><strong>Coarse-grained (thô):</strong></p><ul><li><code>records:read</code> — đọc tất cả loại records</li><li><code>records:write</code> — tạo/sửa tất cả loại records</li></ul><p><strong>Fine-grained (chi tiết):</strong></p><ul><li><code>customer_records:read</code></li><li><code>customer_records:create</code></li><li><code>customer_records:update</code></li><li><code>customer_records:delete</code></li><li><code>financial_records:read</code></li><li><code>financial_records:approve</code></li></ul><p><strong>Khuyến nghị:</strong> Bắt đầu với coarse-grained, refine khi có nhu cầu thực tế. Over-engineering permissions từ đầu dẫn đến hệ thống phức tạp, khó quản lý.</p><h3 id="54-separation-of-duties-implementation">5.4. Separation of Duties Implementation</h3><p>SoD ngăn chặn fraud và errors bằng cách yêu cầu nhiều người tham gia vào một quy trình.</p><p><strong>Static SoD — Conflicting Roles:</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Role A</th>
<th>Role B</th>
<th>Reason</th>
</tr>
</thead>
<tbody>
<tr>
<td>Requester</td>
<td>Approver</td>
<td>Không tự phê duyệt yêu cầu của mình</td>
</tr>
<tr>
<td>Data Entry</td>
<td>Auditor</td>
<td>Auditor phải độc lập</td>
</tr>
<tr>
<td>Developer</td>
<td>Deployer</td>
<td>Tách biệt dev và ops</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<p>Khi gán role cho user, kiểm tra xem user đã có role xung đột chưa. Nếu có, từ chối gán.</p><p><strong>Dynamic SoD — Conflicting Activations:</strong></p><p>Cho phép user giữ nhiều roles nhưng chỉ active một role tại một thời điểm. Ví dụ: User có thể có role "Data Entry" và "Reviewer", nhưng khi đăng nhập phải chọn một. Điều này cho phép flexibility (cùng một người có thể làm nhiều việc) trong khi vẫn đảm bảo một transaction cụ thể không bị một người kiểm soát hoàn toàn.</p><p><strong>Transaction-based SoD:</strong></p><p>Kiểm tra trong từng transaction. Ví dụ: Order có trường <code>created_by</code> và <code>approved_by</code>. System enforce <code>approved_by != created_by</code>. Người tạo đơn không thể là người phê duyệt chính đơn đó.</p><hr><h2 id="ph%E1%BA%A7n-6-handling-sensitive-data">Phần 6: Handling Sensitive Data</h2><h3 id="61-data-classification">6.1. Data Classification</h3><p>Không phải tất cả dữ liệu đều cần mức bảo vệ như nhau. Phân loại dữ liệu là bước đầu tiên:</p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Classification</th>
<th>Examples</th>
<th>Protection Level</th>
</tr>
</thead>
<tbody>
<tr>
<td>Public</td>
<td>Company name, public announcements</td>
<td>Minimal</td>
</tr>
<tr>
<td>Internal</td>
<td>Internal memos, org charts</td>
<td>Standard access control</td>
</tr>
<tr>
<td>Confidential</td>
<td>Financial reports, customer lists</td>
<td>Restricted access, audit logging</td>
</tr>
<tr>
<td>Sensitive</td>
<td>PII, health records, salary info</td>
<td>Encryption, strict access, detailed audit</td>
</tr>
<tr>
<td>Restricted</td>
<td>Trade secrets, M&amp;A plans</td>
<td>Need-to-know basis, special approval</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="62-field-level-access-control">6.2. Field-Level Access Control</h3><p>RLS kiểm soát ở mức row. Nhưng đôi khi cần kiểm soát ở mức field (column):</p><p><strong>Ví dụ:</strong> Bảng <code>employees</code> có các cột: id, name, email, department, salary, ssn. HR có thể xem tất cả. Manager có thể xem id, name, email, department của team mình nhưng không xem salary và ssn.</p><p><strong>Implementation approaches:</strong></p><p><strong>View-based:</strong> Tạo các views với subset of columns cho từng role. Manager query view không có salary/ssn.</p><p><strong>Application-level projection:</strong> Application chỉ SELECT các columns mà role được phép xem.</p><p><strong>Column-level encryption:</strong> Encrypt các columns nhạy cảm, chỉ decrypt cho roles có key.</p><p><strong>Dynamic data masking:</strong> Database trả về masked values (ví dụ: xxx-xx-1234 cho SSN) cho roles không có full access.</p><h3 id="63-encryption-strategies">6.3. Encryption Strategies</h3><p><strong>Encryption at Rest:</strong> Encrypt toàn bộ database files trên disk. Bảo vệ khỏi physical access (theft, improper disposal). Transparent với application — không cần thay đổi code.</p><p><strong>Transparent Data Encryption (TDE):</strong> Database tự động encrypt khi write, decrypt khi read. Bảo vệ data files và backups. Không bảo vệ khỏi authorized database users.</p><p><strong>Application-Level Encryption:</strong> Application encrypt trước khi gửi đến database, decrypt sau khi nhận. Bảo vệ khỏi database admins và anyone có database access. Nhược điểm: không thể query trên encrypted data (trừ khi dùng searchable encryption).</p><p><strong>Column-Level Encryption:</strong> Chỉ encrypt specific columns. Cân bằng giữa security và usability. Có thể query trên non-encrypted columns.</p><p><strong>Khuyến nghị cho sensitive data:</strong></p><ul><li>Encryption at Rest: Luôn bật (baseline protection)</li><li>Application-Level Encryption: Cho highly sensitive fields (SSN, health data)</li><li>Column-Level Encryption: Cho moderately sensitive fields cần occasional search</li></ul><h3 id="64-key-management">6.4. Key Management</h3><p>Encryption chỉ mạnh bằng key management:</p><p><strong>Key Storage:</strong> Không bao giờ lưu keys trong code, config files, hoặc cùng database với encrypted data. Sử dụng dedicated Key Management System (KMS) như AWS KMS, HashiCorp Vault, Azure Key Vault.</p><p><strong>Key Rotation:</strong> Thay đổi keys định kỳ (ví dụ: hàng năm) và khi có sự cố (key có thể bị lộ). Re-encrypt data với key mới.</p><p><strong>Key Hierarchy:</strong> Master Key encrypt Data Keys. Data Keys encrypt actual data. Nếu cần rotate, chỉ cần re-encrypt Data Keys với Master Key mới, không cần re-encrypt tất cả data.</p><p><strong>Access to Keys:</strong> Principle of least privilege. Chỉ services cần decrypt mới có access to keys. Audit mọi key access.</p><hr><h2 id="ph%E1%BA%A7n-7-audit-trail-v%C3%A0-compliance">Phần 7: Audit Trail và Compliance</h2><h3 id="71-what-to-log">7.1. What to Log</h3><p>Audit logging cần capture đủ thông tin để trả lời: Who did What to Which resource, When, from Where, and Why (if available).</p><p><strong>Authentication Events:</strong></p><ul><li>Login success/failure</li><li>Logout</li><li>Password change/reset</li><li>MFA events</li><li>Session timeout</li></ul><p><strong>Authorization Events:</strong></p><ul><li>Access granted</li><li>Access denied</li><li>Privilege escalation attempts</li><li>Role/permission changes</li></ul><p><strong>Data Access Events:</strong></p><ul><li>Read sensitive data (mandatory)</li><li>Read normal data (optional, based on requirements)</li><li>Create records</li><li>Update records (with before/after values)</li><li>Delete records</li></ul><p><strong>Configuration Changes:</strong></p><ul><li>System settings modified</li><li>User/role management</li><li>Policy changes</li><li>Integration configurations</li></ul><p><strong>Anomalies:</strong></p><ul><li>Unusual access patterns</li><li>Multiple failed attempts</li><li>Access from new location/device</li><li>Bulk data access</li></ul><h3 id="72-log-entry-structure">7.2. Log Entry Structure</h3><p>Mỗi log entry cần chứa:</p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr>
<td>timestamp</td>
<td>Thời điểm (với timezone)</td>
<td>2025-01-15T14:30:00Z</td>
</tr>
<tr>
<td>event_id</td>
<td>Unique identifier</td>
<td>uuid</td>
</tr>
<tr>
<td>event_type</td>
<td>Loại sự kiện</td>
<td>DATA_ACCESS</td>
</tr>
<tr>
<td>action</td>
<td>Hành động cụ thể</td>
<td>READ</td>
</tr>
<tr>
<td>actor_id</td>
<td>User thực hiện</td>
<td>user-uuid</td>
</tr>
<tr>
<td>actor_role</td>
<td>Role hiện tại</td>
<td>manager</td>
</tr>
<tr>
<td>actor_org_unit</td>
<td>Đơn vị của user</td>
<td>branch-uuid</td>
</tr>
<tr>
<td>resource_type</td>
<td>Loại tài nguyên</td>
<td>customer_record</td>
</tr>
<tr>
<td>resource_id</td>
<td>ID tài nguyên</td>
<td>record-uuid</td>
</tr>
<tr>
<td>resource_org_unit</td>
<td>Đơn vị sở hữu</td>
<td>branch-uuid</td>
</tr>
<tr>
<td>result</td>
<td>Kết quả</td>
<td>SUCCESS/DENIED</td>
</tr>
<tr>
<td>ip_address</td>
<td>IP nguồn</td>
<td>192.168.1.100</td>
</tr>
<tr>
<td>user_agent</td>
<td>Client info</td>
<td>Mozilla/5.0...</td>
</tr>
<tr>
<td>session_id</td>
<td>Session identifier</td>
<td>session-uuid</td>
</tr>
<tr>
<td>details</td>
<td>Thông tin bổ sung</td>
<td>JSON object</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="73-log-integrity-and-retention">7.3. Log Integrity and Retention</h3><p><strong>Immutability:</strong> Audit logs phải immutable — không ai được phép modify hoặc delete. Sử dụng:</p><ul><li>Write-once storage (WORM)</li><li>Append-only tables với triggers ngăn update/delete</li><li>Blockchain-based verification</li><li>Regular hash chains để detect tampering</li></ul><p><strong>Retention Policy:</strong></p><ul><li>Active storage: 90 days (quick access for investigations)</li><li>Archive storage: 1-7 years (depending on compliance requirements)</li><li>Define clear policy và automate archival/purging</li></ul><p><strong>Access Control for Logs:</strong></p><ul><li>Separate permission cho audit log access</li><li>Chỉ security/compliance team có access</li><li>Log access to audit logs (meta-auditing)</li></ul><h3 id="74-monitoring-v%C3%A0-alerting">7.4. Monitoring và Alerting</h3><p>Logs không có giá trị nếu không ai xem. Implement:</p><p><strong>Real-time Alerts:</strong></p><ul><li>Multiple failed login attempts → Possible brute force</li><li>Access denied spikes → Possible unauthorized access attempt</li><li>Bulk data access → Possible data exfiltration</li><li>Access from unusual location → Possible compromised account</li><li>Off-hours access to sensitive data → Needs investigation</li></ul><p><strong>Periodic Reviews:</strong></p><ul><li>Weekly: Review access denied patterns</li><li>Monthly: Review role assignments, look for over-privileged accounts</li><li>Quarterly: Full access review, remove unused permissions</li><li>Annually: Policy review, update based on organizational changes</li></ul><hr><h2 id="ph%E1%BA%A7n-8-integration-patterns">Phần 8: Integration Patterns</h2><h3 id="81-identity-provider-integration">8.1. Identity Provider Integration</h3><p>Hầu hết organizations đã có Identity Provider (IdP) như Active Directory, Okta, Auth0, Keycloak. Hệ thống phân quyền cần integrate:</p><p><strong>SAML 2.0:</strong> Standard cho enterprise SSO. IdP authenticate user, gửi SAML Assertion chứa user identity và attributes. Service Provider (ứng dụng) trust assertion và create session.</p><p><strong>OAuth 2.0 / OpenID Connect:</strong> Modern standard, phổ biến cho web và mobile. IdP issue JWT tokens chứa claims về user. Application validate token và extract claims.</p><p><strong>Claims to Include in Token:</strong></p><ul><li>sub: User identifier</li><li>roles: Array of role names</li><li>org_unit_id: Primary organizational unit</li><li>org_unit_path: Full path từ root đến org unit</li><li>permissions: (Optional) Explicit permissions nếu không derive từ roles</li></ul><h3 id="82-api-gateway-v%C3%A0-authorization">8.2. API Gateway và Authorization</h3><p>API Gateway là điểm đầu vào cho tất cả API requests. Đây là nơi lý tưởng để implement authorization layer đầu tiên:</p><p><strong>Token Validation:</strong> Verify JWT signature, check expiration, validate issuer.</p><p><strong>Coarse-grained Authorization:</strong> Check user có permission gọi API này không (based on roles in token).</p><p><strong>Rate Limiting:</strong> Ngăn abuse, có thể differentiate limits by role.</p><p><strong>Context Injection:</strong> Extract claims từ token, inject vào request headers để downstream services sử dụng.</p><p><strong>Lưu ý:</strong> API Gateway chỉ nên làm coarse-grained checks. Fine-grained authorization (ví dụ: user có quyền access record cụ thể này không) nên để application và database (RLS) xử lý.</p><h3 id="83-service-to-service-authorization">8.3. Service-to-Service Authorization</h3><p>Trong microservices architecture, services gọi lẫn nhau. Cần authorize các calls này:</p><p><strong>Service Accounts:</strong> Mỗi service có identity riêng (service account). Khi Service A gọi Service B, Service B verify identity của A và check A có permission không.</p><p><strong>Token Propagation:</strong> User's token được forward từ service này sang service khác. Downstream service authorize based on original user's permissions.</p><p><strong>Hybrid Approach:</strong> Kết hợp cả hai. Service A call Service B with both: Service A's identity (for service-level auth) và User's token (for user-level auth). Service B check cả hai.</p><h3 id="84-caching-authorization-decisions">8.4. Caching Authorization Decisions</h3><p>Authorization checks có thể expensive, đặc biệt với ABAC phức tạp. Caching giúp improve performance:</p><p><strong>Permission Cache:</strong> Cache kết quả "user X có permission Y không" trong short TTL (vài phút). Invalidate khi role/permission thay đổi.</p><p><strong>Policy Decision Cache:</strong> Cache kết quả của complex ABAC policies. Key = hash của all attributes involved.</p><p><strong>Negative Caching:</strong> Cache cả kết quả "denied". Nhưng cẩn thận với false negatives nếu permission mới được grant.</p><p><strong>Cache Invalidation Strategy:</strong></p><ul><li>Time-based: TTL ngắn (1-5 phút)</li><li>Event-based: Invalidate khi role assignment thay đổi</li><li>Hybrid: TTL + event-based invalidation</li></ul><hr><h2 id="ph%E1%BA%A7n-9-testing-v%C3%A0-validation">Phần 9: Testing và Validation</h2><h3 id="91-authorization-testing-pyramid">9.1. Authorization Testing Pyramid</h3><p><strong>Unit Tests:</strong> Test individual permission check functions. Given user with role X, can they perform action Y? Test edge cases: null inputs, invalid roles, expired sessions.</p><p><strong>Integration Tests:</strong> Test end-to-end từ API đến database. Verify RLS policies work correctly. Test with real database, not mocks.</p><p><strong>Negative Tests:</strong> Quan trọng không kém positive tests. Verify user CANNOT access what they shouldn't. Dễ bị bỏ qua nhưng critical for security.</p><p><strong>Cross-tenant Tests:</strong> Verify data isolation. User of Tenant A query → should never return Tenant B data.</p><p><strong>Privilege Escalation Tests:</strong> Attempt to bypass authorization. Try direct database access, manipulate tokens, forge session context.</p><h3 id="92-test-scenarios-for-hierarchical-access">9.2. Test Scenarios for Hierarchical Access</h3><p><strong>Scenario 1: Vertical Access</strong></p><ul><li>User ở Region level query → Should return Region data + all Branch data under that Region</li><li>User ở Branch level query → Should return only that Branch's data</li></ul><p><strong>Scenario 2: Horizontal Isolation</strong></p><ul><li>User ở Branch A query → Should NOT return Branch B data</li><li>User ở Region North query → Should NOT return Region South data</li></ul><p><strong>Scenario 3: Move Operations</strong></p><ul><li>Branch moved from Region North to Region South</li><li>User ở Region North query → Should NOT return moved Branch data anymore</li><li>User ở Region South query → Should return moved Branch data</li></ul><p><strong>Scenario 4: Multi-org Users</strong></p><ul><li>User belongs to multiple org units (rare but possible)</li><li>Query should return union of data from all assigned units</li></ul><h3 id="93-security-testing">9.3. Security Testing</h3><p><strong>Penetration Testing:</strong></p><ul><li>Hire external team hoặc use tools như OWASP ZAP, Burp Suite</li><li>Focus on authorization bypass vulnerabilities</li><li>Test token manipulation, parameter tampering, direct object references</li></ul><p><strong>Code Review:</strong></p><ul><li>Review tất cả authorization-related code</li><li>Check for missing authorization checks in new endpoints</li><li>Verify RLS policies cover all tables with sensitive data</li></ul><p><strong>Configuration Audit:</strong></p><ul><li>Review role definitions và assignments</li><li>Look for over-privileged accounts</li><li>Check for orphaned permissions (assigned but not used)</li></ul><hr><h2 id="ph%E1%BA%A7n-10-operational-considerations">Phần 10: Operational Considerations</h2><h3 id="101-deployment-strategy">10.1. Deployment Strategy</h3><p><strong>Phased Rollout:</strong></p><p><em>Phase 1 — Foundation (Month 1-2):</em></p><ul><li>Deploy org unit hierarchy model</li><li>Implement basic RBAC với role inheritance</li><li>Enable RLS on critical tables</li></ul><p><em>Phase 2 — Hardening (Month 3-4):</em></p><ul><li>Comprehensive audit logging</li><li>SoD constraints</li><li>Encryption for sensitive data</li><li>Security testing</li></ul><p><em>Phase 3 — Advanced (Month 5-6):</em></p><ul><li>ABAC cho complex scenarios</li><li>Field-level access control</li><li>Self-service permission requests</li><li>Analytics và anomaly detection</li></ul><h3 id="102-handling-edge-cases">10.2. Handling Edge Cases</h3><p><strong>User with No Org Unit:</strong> Default deny. User phải được assign org unit trước khi access data.</p><p><strong>User with Multiple Org Units:</strong> Union of accessible data. Cần careful design để avoid confusion.</p><p><strong>Org Unit Restructuring:</strong> Plan downtime hoặc implement gradual migration. Communicate changes.</p><p><strong>Emergency Access:</strong> "Break glass" procedure cho emergencies. Heavily logged, requires justification, auto-expires.</p><p><strong>Orphaned Data:</strong> Data thuộc org unit đã bị delete. Define policy: archive, migrate, hoặc delete.</p><h3 id="103-monitoring-v%C3%A0-health-checks">10.3. Monitoring và Health Checks</h3><p><strong>Metrics to Track:</strong></p><ul><li>Authorization decision latency (P50, P95, P99)</li><li>Cache hit rate</li><li>Số lượng access denied events</li><li>RLS policy execution time</li><li>Session context set failures</li></ul><p><strong>Health Checks:</strong></p><ul><li>RLS policies enabled on all required tables</li><li>Session context properly set for all requests</li><li>IdP connectivity</li><li>Audit log ingestion rate</li></ul><p><strong>Alerting Thresholds:</strong></p><ul><li>Authorization latency &gt; 100ms (P95)</li><li>Access denied rate spike &gt; 200% baseline</li><li>RLS policy evaluation errors</li><li>Audit log gaps</li></ul><h3 id="104-disaster-recovery">10.4. Disaster Recovery</h3><p><strong>Backup Requirements:</strong></p><ul><li>Database with RLS policies</li><li>IdP configuration (roles, groups, mappings)</li><li>Application authorization configuration</li><li>Audit logs (critical for compliance)</li></ul><p><strong>Recovery Procedures:</strong></p><ul><li>Restore database và verify RLS policies intact</li><li>Verify IdP sync</li><li>Test authorization với known scenarios</li><li>Review audit logs for gaps</li></ul><p><strong>Emergency Procedures:</strong></p><ul><li>Procedure to revoke all access quickly (trong trường hợp breach)</li><li>Procedure to restore specific user's access</li><li>Escalation contacts</li></ul><hr><h2 id="k%E1%BA%BFt-lu%E1%BA%ADn-principles-to-remember">Kết luận: Principles to Remember</h2><p>Xây dựng hệ thống phân quyền cho cấu trúc phân cấp là bài toán phức tạp nhưng có thể giải quyết với các nguyên tắc đúng:</p><p><strong>Defense in Depth:</strong> Không tin tưởng hoàn toàn vào bất kỳ layer nào. API Gateway + Application + Database RLS tạo nhiều lớp bảo vệ.</p><p><strong>Least Privilege:</strong> Grant quyền tối thiểu cần thiết. Dễ thêm quyền hơn là thu hồi quyền đã grant.</p><p><strong>Separation of Concerns:</strong> Tách role (chức năng) và scope (phạm vi). Role định nghĩa "làm được gì", scope định nghĩa "làm ở đâu".</p><p><strong>Hierarchical Inheritance:</strong> Tận dụng cấu trúc cây để tự động derive quyền. Cấp trên inherit quyền view của cấp dưới.</p><p><strong>Horizontal Isolation:</strong> Các đơn vị ngang hàng phải hoàn toàn cách ly. Không có con đường truy cập sang sibling.</p><p><strong>Audit Everything:</strong> Log đủ chi tiết để reconstruct "ai làm gì, khi nào, ở đâu". Đây là requirement cho compliance và investigation.</p><p><strong>Test Negative Cases:</strong> Verify không chỉ "có thể access" mà cả "không thể access". Negative tests thường bị bỏ qua nhưng critical.</p><p><strong>Plan for Change:</strong> Cấu trúc tổ chức sẽ thay đổi. Design cho flexibility: easy to add units, move units, restructure hierarchy.</p><p>Với các nguyên tắc này và kiến trúc đề xuất (Hierarchical RBAC + Sub-tenant + RLS + Comprehensive Audit), bạn có thể xây dựng hệ thống phân quyền robust, scalable, và secure cho bất kỳ tổ chức phân cấp nào.</p><p>Code Demo tại đây <a href="https://github.com/xdev-asia-labs/spring-multitenant-rbac">https://github.com/xdev-asia-labs/spring-multitenant-rbac</a><br></p><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/screenshot-2025-12-21-at-121935-3de8a3bf.webp" class="kg-image" alt="" loading="lazy" width="1020" height="590" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Tech Stack RBAC</span></figcaption></figure>
