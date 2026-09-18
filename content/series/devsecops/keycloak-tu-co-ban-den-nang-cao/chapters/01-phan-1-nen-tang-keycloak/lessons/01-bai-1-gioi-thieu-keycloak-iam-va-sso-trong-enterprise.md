---
id: 019d8b30-b101-7001-c001-e0c5f8100101
title: 'Bài 1: Giới thiệu Keycloak - IAM và SSO trong Enterprise'
slug: bai-1-gioi-thieu-keycloak-iam-va-sso-trong-enterprise
description: >-
  Tìm hiểu Keycloak là gì, tại sao cần IAM, các khái niệm cốt lõi
  (Realms, Clients, Users, Roles, Groups, Sessions), kiến trúc Keycloak
  trên Quarkus, so sánh với Auth0/Okta/Azure AD, và các use cases thực tế
  trong doanh nghiệp. Tổng quan phiên bản Keycloak 26.x.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 1
section_title: "Phần 1: Nền tảng Keycloak"
course:
  id: 019d8b30-b100-7001-c001-e0c5f8100001
  title: Keycloak từ Cơ bản đến Nâng cao
  slug: keycloak-tu-co-ban-den-nang-cao
---
<h2 id="1-keycloak-la-gi"><strong>1. Keycloak là gì?</strong></h2>
<p><strong>Keycloak</strong> là một giải pháp Identity and Access Management (IAM) mã nguồn mở, được phát triển ban đầu bởi Red Hat và hiện là dự án <strong>CNCF Incubation</strong> (Cloud Native Computing Foundation). Keycloak cung cấp Single Sign-On (SSO), quản lý danh tính, và bảo mật ứng dụng cho các hệ thống web và RESTful web services.</p>

<p>Mục tiêu của Keycloak là làm cho bảo mật trở nên đơn giản — các tính năng bảo mật mà developer thường phải tự viết được cung cấp sẵn và có thể tùy chỉnh theo yêu cầu tổ chức.</p>

<h3 id="lich-su-phat-trien"><strong>Lịch sử phát triển</strong></h3>
<ul>
<li><p><strong>2014</strong>: Keycloak ra đời như một dự án của JBoss/Red Hat</p></li>
<li><p><strong>2018</strong>: Keycloak 4.0 — hỗ trợ Authorization Services, UMA 2.0</p></li>
<li><p><strong>2020</strong>: Keycloak.X (Quarkus-based) preview</p></li>
<li><p><strong>2022</strong>: Keycloak 20 — WildFly distribution bị loại bỏ, chính thức chuyển sang Quarkus</p></li>
<li><p><strong>2024</strong>: Keycloak trở thành CNCF Incubation project</p></li>
<li><p><strong>2026</strong>: Keycloak 26.5.x — phiên bản hiện tại với Workflows, Passkeys, MCP support</p></li>
</ul>

<h2 id="2-tai-sao-can-iam"><strong>2. Tại sao cần Identity and Access Management?</strong></h2>
<p>Trong hệ thống enterprise hiện đại, việc quản lý danh tính và quyền truy cập trở nên phức tạp khi:</p>
<ul>
<li><p>Nhiều ứng dụng cần xác thực chung (SSO)</p></li>
<li><p>Yêu cầu tích hợp với các Identity Provider bên ngoài (Google, Azure AD, LDAP)</p></li>
<li><p>Cần Multi-Factor Authentication (MFA) cho bảo mật cao</p></li>
<li><p>Quản lý phân quyền phức tạp (RBAC, ABAC, fine-grained permissions)</p></li>
<li><p>Tuân thủ các tiêu chuẩn bảo mật (OAuth 2.0, OIDC, SAML 2.0, FAPI 2.0)</p></li>
<li><p>Multi-tenancy cho SaaS applications</p></li>
</ul>

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/03/keycloak-sso-overview-2026.webp" alt="Keycloak IAM/SSO Overview" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Tổng quan Keycloak IAM/SSO: Ứng dụng → Keycloak → Identity Providers</em></p>
</div>

<h2 id="3-cac-tinh-nang-chinh"><strong>3. Các tính năng chính của Keycloak</strong></h2>
<ul>
<li><p><strong>Single Sign-On (SSO) và Single Sign-Out</strong> cho browser applications</p></li>
<li><p><strong>OpenID Connect</strong> và <strong>OAuth 2.0</strong> support</p></li>
<li><p><strong>SAML 2.0</strong> support</p></li>
<li><p><strong>Identity Brokering</strong> — xác thực qua external OIDC hoặc SAML Identity Providers</p></li>
<li><p><strong>Social Login</strong> — đăng nhập bằng Google, GitHub, Facebook, Apple, Microsoft</p></li>
<li><p><strong>User Federation</strong> — đồng bộ users từ LDAP và Active Directory</p></li>
<li><p><strong>Kerberos bridge</strong> — tự động xác thực users đã login vào Kerberos server</p></li>
<li><p><strong>Admin Console</strong> — quản lý tập trung users, roles, clients, configuration</p></li>
<li><p><strong>Account Console</strong> — cho phép users tự quản lý tài khoản</p></li>
<li><p><strong>Theme support</strong> — tùy chỉnh giao diện login, account, admin, email</p></li>
<li><p><strong>Two-factor Authentication</strong> — TOTP/HOTP, WebAuthn, Passkeys</p></li>
<li><p><strong>Authorization Services</strong> — phân quyền chi tiết với policies và permissions</p></li>
<li><p><strong>Organizations</strong> — multi-tenancy cho CIAM (B2B, B2B2C)</p></li>
<li><p><strong>Workflows</strong> — tự động hóa quản trị (IGA)</p></li>
<li><p><strong>Token Mappers</strong> — tùy chỉnh claims trong tokens</p></li>
<li><p><strong>Events & Auditing</strong> — audit logging và event listeners</p></li>
</ul>

<h2 id="4-khai-niem-cot-loi"><strong>4. Các khái niệm cốt lõi</strong></h2>

<h3 id="realms"><strong>Realms</strong></h3>
<p>Realm quản lý một tập hợp users, credentials, roles và groups. Mỗi user thuộc về và đăng nhập vào một realm. Các realms được cô lập với nhau — chỉ có thể quản lý và xác thực users thuộc realm đó.</p>

<h3 id="clients"><strong>Clients</strong></h3>
<p>Clients là các entities (ứng dụng, services) yêu cầu Keycloak xác thực user. Clients có thể là web apps, mobile apps, REST APIs, hoặc services cần token để gọi các service khác.</p>

<h3 id="users"><strong>Users</strong></h3>
<p>Users là các entities có thể đăng nhập vào hệ thống. Users có attributes (email, username, phone, etc.), thuộc groups và được gán roles.</p>

<h3 id="roles"><strong>Roles</strong></h3>
<p>Roles xác định loại hoặc category của user (Admin, User, Manager). Ứng dụng gán quyền truy cập dựa trên roles thay vì từng user riêng lẻ.</p>

<h3 id="groups"><strong>Groups</strong></h3>
<p>Groups quản lý nhóm users. Groups có attributes và role mappings. Users kế thừa attributes và role mappings từ group.</p>

<h3 id="sessions"><strong>Sessions</strong></h3>
<p>Khi user đăng nhập, một session được tạo để quản lý login session, bao gồm thông tin về thời gian đăng nhập và các ứng dụng đã tham gia SSO.</p>

<h2 id="5-kien-truc-keycloak"><strong>5. Kiến trúc Keycloak trên Quarkus</strong></h2>
<p>Từ phiên bản 20+, Keycloak chạy hoàn toàn trên Quarkus framework, mang lại:</p>
<ul>
<li><p><strong>Startup time cực nhanh</strong> — phù hợp container và serverless</p></li>
<li><p><strong>Memory footprint nhỏ</strong> — tối ưu cho cloud-native deployments</p></li>
<li><p><strong>Build-time optimization</strong> — cấu hình được compile trước</p></li>
<li><p><strong>Native image support</strong> — khả năng chạy GraalVM native</p></li>
</ul>

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/03/keycloak-architecture-2026.webp" alt="Keycloak Architecture on Quarkus" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Kiến trúc Keycloak: Quarkus Runtime, Infinispan Cache, Hibernate ORM, Admin/Account Console</em></p>
</div>

<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Component</th>
<th>Mô tả</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Quarkus Runtime</strong></td>
<td>Application server (thay thế WildFly)</td>
</tr>
<tr>
<td><strong>Infinispan</strong></td>
<td>Distributed cache cho sessions, tokens</td>
</tr>
<tr>
<td><strong>Hibernate ORM</strong></td>
<td>ORM layer cho database persistence</td>
</tr>
<tr>
<td><strong>Database</strong></td>
<td>PostgreSQL (recommended), MySQL, MariaDB, Oracle, MSSQL</td>
</tr>
<tr>
<td><strong>Admin Console</strong></td>
<td>React-based SPA (PatternFly 5)</td>
</tr>
<tr>
<td><strong>Account Console</strong></td>
<td>React-based SPA cho user self-service</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->

<h2 id="6-so-sanh"><strong>6. So sánh Keycloak vs Auth0 vs Okta vs Azure AD</strong></h2>

<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Tiêu chí</th>
<th>Keycloak</th>
<th>Auth0</th>
<th>Okta</th>
<th>Azure AD</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>License</strong></td>
<td>Apache 2.0 (FOSS)</td>
<td>Commercial</td>
<td>Commercial</td>
<td>Commercial</td>
</tr>
<tr>
<td><strong>Deployment</strong></td>
<td>Self-hosted</td>
<td>Cloud SaaS</td>
<td>Cloud SaaS</td>
<td>Cloud SaaS</td>
</tr>
<tr>
<td><strong>Chi phí</strong></td>
<td>Miễn phí (tự vận hành)</td>
<td>Từ $35/tháng</td>
<td>Từ $2/user/tháng</td>
<td>Từ $6/user/tháng</td>
</tr>
<tr>
<td><strong>Customization</strong></td>
<td>Rất cao (open source)</td>
<td>Trung bình</td>
<td>Trung bình</td>
<td>Thấp</td>
</tr>
<tr>
<td><strong>OIDC/OAuth2</strong></td>
<td>Đầy đủ</td>
<td>Đầy đủ</td>
<td>Đầy đủ</td>
<td>Đầy đủ</td>
</tr>
<tr>
<td><strong>SAML</strong></td>
<td>Đầy đủ</td>
<td>Có</td>
<td>Đầy đủ</td>
<td>Đầy đủ</td>
</tr>
<tr>
<td><strong>LDAP/AD</strong></td>
<td>Đầy đủ</td>
<td>Enterprise</td>
<td>Đầy đủ</td>
<td>Native</td>
</tr>
<tr>
<td><strong>MFA</strong></td>
<td>TOTP, WebAuthn, Passkeys</td>
<td>Đầy đủ</td>
<td>Đầy đủ</td>
<td>Đầy đủ</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->

<h2 id="7-use-cases"><strong>7. Các use cases thực tế</strong></h2>
<ul>
<li><p><strong>Enterprise SSO</strong>: Đăng nhập một lần cho tất cả ứng dụng nội bộ</p></li>
<li><p><strong>Customer IAM (CIAM)</strong>: Quản lý danh tính khách hàng với Organizations</p></li>
<li><p><strong>API Security</strong>: Bảo vệ REST APIs với OAuth 2.0 tokens</p></li>
<li><p><strong>Microservices Authentication</strong>: Service-to-service authentication với client credentials</p></li>
<li><p><strong>Social Login</strong>: Cho phép users đăng nhập bằng Google, Facebook, GitHub</p></li>
<li><p><strong>LDAP/AD Federation</strong>: Tích hợp hệ thống directory hiện có</p></li>
<li><p><strong>MFA cho Compliance</strong>: Đáp ứng yêu cầu PCI-DSS, HIPAA, SOC 2</p></li>
</ul>

<h2 id="8-tong-quan-khoa-hoc"><strong>8. Tổng quan khóa học</strong></h2>
<p>Khóa học gồm <strong>25 bài học</strong> chia thành <strong>7 phần</strong>, bao phủ toàn bộ các module của Keycloak 26.x:</p>
<ul>
<li><p><strong>Phần 1</strong>: Nền tảng (Realms, Users, Groups, Roles, Permissions)</p></li>
<li><p><strong>Phần 2</strong>: SSO Protocols (OIDC, SAML, Client Scopes, Tokens, DPoP)</p></li>
<li><p><strong>Phần 3</strong>: Authentication & MFA (Flows, OTP, WebAuthn, Passkeys, Identity Brokering)</p></li>
<li><p><strong>Phần 4</strong>: Federation & Authorization (LDAP/AD, Organizations, Authorization Services, Workflows)</p></li>
<li><p><strong>Phần 5</strong>: Security & Customization (Themes, Events, Hardening, Vault)</p></li>
<li><p><strong>Phần 6</strong>: Tích hợp thực tế (Spring Boot, React/Angular, Node.js, API Gateway)</p></li>
<li><p><strong>Phần 7</strong>: Production Operations (Deployment, HA, Kubernetes, Monitoring)</p></li>
</ul>
