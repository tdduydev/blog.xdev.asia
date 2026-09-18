---
id: 019d8b30-b105-7001-c001-e0c5f8100105
title: 'Bài 5: Roles, Permissions và Access Control'
slug: bai-5-roles-permissions-va-access-control
description: >-
  Realm roles, client roles, composite roles, role mappings cho users và
  groups, default roles, service account roles. Fine-grained admin permissions
  V2, realm administration delegation, resource-specific permissions, policies
  và permission evaluation.
duration_minutes: 150
is_free: true
video_url: null
sort_order: 5
section_title: "Phần 1: Nền tảng Keycloak"
course:
  id: 019d8b30-b100-7001-c001-e0c5f8100001
  title: Keycloak từ Cơ bản đến Nâng cao
  slug: keycloak-tu-co-ban-den-nang-cao
---
<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/03/keycloak-rbac-permissions-2026.webp" alt="Keycloak RBAC & Fine-grained Permissions" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Mô hình RBAC và Fine-grained Admin Permissions V2 trong Keycloak</em></p>
</div>

<h2 id="1-tong-quan-roles"><strong>1. Tổng quan về Roles trong Keycloak</strong></h2>

<p>Roles trong Keycloak là cơ chế chính để phân quyền truy cập. Ứng dụng kiểm tra roles của user (thông qua claims trong token) để quyết định user được phép làm gì. Keycloak hỗ trợ hai loại roles: <strong>Realm Roles</strong> và <strong>Client Roles</strong>.</p>

<h3 id="realm-roles-vs-client-roles"><strong>Realm Roles vs Client Roles</strong></h3>
<table>
<thead>
<tr><th>Đặc điểm</th><th>Realm Roles</th><th>Client Roles</th></tr>
</thead>
<tbody>
<tr><td>Phạm vi</td><td>Toàn bộ realm</td><td>Chỉ trong client cụ thể</td></tr>
<tr><td>Use case</td><td>Vai trò chung (Admin, User, Manager)</td><td>Vai trò riêng cho ứng dụng (editor, viewer)</td></tr>
<tr><td>Namespace</td><td>Unique trong realm</td><td>Unique trong client</td></tr>
<tr><td>Token claim</td><td><code>realm_access.roles</code></td><td><code>resource_access.{client}.roles</code></td></tr>
</tbody>
</table>

<h2 id="2-realm-roles"><strong>2. Realm Roles</strong></h2>

<h3 id="realm-roles-mac-dinh"><strong>2.1 Realm Roles mặc định</strong></h3>
<p>Keycloak tạo sẵn một số realm roles:</p>
<ul>
<li><p><strong>default-roles-{realm}</strong> — composite role chứa các roles mặc định cho users mới</p></li>
<li><p><strong>offline_access</strong> — cho phép lấy offline token (refresh token dài hạn)</p></li>
<li><p><strong>uma_authorization</strong> — cho phép sử dụng UMA (User-Managed Access)</p></li>
</ul>

<h3 id="tao-realm-role"><strong>2.2 Tạo Realm Role</strong></h3>

<p><strong>Qua Admin Console:</strong></p>
<ol>
<li><p>Click <strong>Realm roles</strong> trong sidebar</p></li>
<li><p>Click <strong>Create role</strong></p></li>
<li><p>Nhập:</p>
<ul>
<li><strong>Role name</strong>: <code>admin</code></li>
<li><strong>Description</strong>: <code>Full administrator access</code></li>
</ul>
</li>
<li><p>Click <strong>Save</strong></p></li>
</ol>

<p><strong>Qua Admin CLI:</strong></p>
<pre><code># Tạo realm roles
bin/kcadm.sh create roles -r my-company -s name=admin -s description="Full administrator access"
bin/kcadm.sh create roles -r my-company -s name=manager -s description="Manager with limited admin access"
bin/kcadm.sh create roles -r my-company -s name=user -s description="Regular user"
bin/kcadm.sh create roles -r my-company -s name=viewer -s description="Read-only access"

# Xem danh sách realm roles
bin/kcadm.sh get roles -r my-company --fields name,description</code></pre>

<p><strong>Qua REST API:</strong></p>
<pre><code># Tạo realm role
curl -s -X POST \
  "http://localhost:8080/admin/realms/my-company/roles" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "admin",
    "description": "Full administrator access",
    "composite": false
  }'

# Lấy danh sách realm roles
curl -s -X GET \
  "http://localhost:8080/admin/realms/my-company/roles" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq '.[].name'</code></pre>

<h2 id="3-client-roles"><strong>3. Client Roles</strong></h2>

<p>Client roles được sử dụng khi ứng dụng cần roles riêng — ví dụ ứng dụng CMS có roles <code>editor</code>, <code>author</code>, <code>reviewer</code> khác với roles của ứng dụng HR.</p>

<h3 id="tao-client-role"><strong>3.1 Tạo Client Role</strong></h3>

<p><strong>Qua Admin Console:</strong></p>
<ol>
<li><p>Vào <strong>Clients</strong> → chọn client (ví dụ: <code>my-web-app</code>)</p></li>
<li><p>Tab <strong>Roles</strong></p></li>
<li><p>Click <strong>Create role</strong></p></li>
<li><p>Nhập name và description</p></li>
</ol>

<p><strong>Qua CLI:</strong></p>
<pre><code># Lấy client ID
CLIENT_UUID=$(bin/kcadm.sh get clients -r my-company -q clientId=my-web-app --fields id --format csv --noquotes)

# Tạo client roles
bin/kcadm.sh create clients/$CLIENT_UUID/roles -r my-company \
  -s name=editor -s description="Can create and edit content"

bin/kcadm.sh create clients/$CLIENT_UUID/roles -r my-company \
  -s name=author -s description="Can create content"

bin/kcadm.sh create clients/$CLIENT_UUID/roles -r my-company \
  -s name=reviewer -s description="Can review and approve content"

bin/kcadm.sh create clients/$CLIENT_UUID/roles -r my-company \
  -s name=content-admin -s description="Full content management"

# Xem client roles
bin/kcadm.sh get clients/$CLIENT_UUID/roles -r my-company --fields name,description</code></pre>

<p><strong>Qua REST API:</strong></p>
<pre><code>curl -s -X POST \
  "http://localhost:8080/admin/realms/my-company/clients/$CLIENT_UUID/roles" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "editor",
    "description": "Can create and edit content"
  }'</code></pre>

<h3 id="client-role-trong-token"><strong>3.2 Client Roles trong Token</strong></h3>
<p>Client roles xuất hiện trong access token dưới claim <code>resource_access</code>:</p>
<pre><code>{
  "realm_access": {
    "roles": ["user", "offline_access"]
  },
  "resource_access": {
    "my-web-app": {
      "roles": ["editor", "author"]
    },
    "my-api": {
      "roles": ["read", "write"]
    },
    "account": {
      "roles": ["manage-account", "view-profile"]
    }
  }
}</code></pre>

<h2 id="4-composite-roles"><strong>4. Composite Roles</strong></h2>

<p>Composite roles là roles chứa một hoặc nhiều roles con (realm roles và/hoặc client roles). Khi user được gán composite role, user tự động có tất cả roles con.</p>

<h3 id="tao-composite-role"><strong>4.1 Tạo Composite Role</strong></h3>

<p><strong>Qua Admin Console:</strong></p>
<ol>
<li><p>Vào <strong>Realm roles</strong> → chọn role (ví dụ: <code>admin</code>)</p></li>
<li><p>Tab <strong>Action</strong> → <strong>Add associated roles</strong></p></li>
<li><p>Chọn các roles cần thêm (realm roles và/hoặc client roles)</p></li>
<li><p>Click <strong>Assign</strong></p></li>
</ol>

<p><strong>Qua CLI:</strong></p>
<pre><code># Tạo composite role: "manager" chứa "user" và "viewer"
bin/kcadm.sh add-roles \
  -r my-company \
  --rname manager \
  --rolename user \
  --rolename viewer

# Thêm client roles vào composite role
bin/kcadm.sh add-roles \
  -r my-company \
  --rname manager \
  --cclientid my-web-app \
  --rolename editor \
  --rolename reviewer</code></pre>

<p><strong>Ví dụ hierarchy:</strong></p>
<pre><code>admin (composite)
├── manager (composite)
│   ├── user (realm role)
│   ├── viewer (realm role)
│   ├── my-web-app/editor (client role)
│   └── my-web-app/reviewer (client role)
├── my-web-app/content-admin (client role)
└── account/manage-account (client role)</code></pre>

<p><strong>Lưu ý:</strong> Khi user được gán role <code>admin</code>, user sẽ có <strong>tất cả</strong> roles trong cây hierarchy: <code>admin</code>, <code>manager</code>, <code>user</code>, <code>viewer</code>, <code>editor</code>, <code>reviewer</code>, <code>content-admin</code>, <code>manage-account</code>.</p>

<h3 id="xem-composite-roles"><strong>4.2 Xem Composite Roles</strong></h3>
<pre><code># Xem roles con của composite role
bin/kcadm.sh get-roles -r my-company --rname admin --effective

# REST API
curl -s -X GET \
  "http://localhost:8080/admin/realms/my-company/roles/admin/composites" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq '.[].name'</code></pre>

<h2 id="5-role-mappings"><strong>5. Role Mappings</strong></h2>

<h3 id="gan-role-cho-user"><strong>5.1 Gán Role cho User</strong></h3>

<p><strong>Qua Admin Console:</strong></p>
<ol>
<li><p>Vào <strong>Users</strong> → chọn user</p></li>
<li><p>Tab <strong>Role mapping</strong></p></li>
<li><p>Click <strong>Assign role</strong></p></li>
<li><p>Chọn realm roles hoặc filter by client để chọn client roles</p></li>
<li><p>Click <strong>Assign</strong></p></li>
</ol>

<p><strong>Qua CLI:</strong></p>
<pre><code># Gán realm roles cho user
bin/kcadm.sh add-roles \
  -r my-company \
  --uusername john.doe \
  --rolename admin

# Gán client roles cho user
bin/kcadm.sh add-roles \
  -r my-company \
  --uusername john.doe \
  --cclientid my-web-app \
  --rolename editor

# Xem roles của user (bao gồm effective roles từ composite và groups)
bin/kcadm.sh get-roles \
  -r my-company \
  --uusername john.doe \
  --effective</code></pre>

<p><strong>Qua REST API:</strong></p>
<pre><code># Lấy role representation
ROLE_ID=$(curl -s -X GET \
  "http://localhost:8080/admin/realms/my-company/roles/admin" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq -r '.id')

ROLE_NAME=$(curl -s -X GET \
  "http://localhost:8080/admin/realms/my-company/roles/admin" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq -r '.name')

# Gán realm role cho user
curl -s -X POST \
  "http://localhost:8080/admin/realms/my-company/users/$USER_ID/role-mappings/realm" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d "[$(curl -s -X GET \
    "http://localhost:8080/admin/realms/my-company/roles/admin" \
    -H "Authorization: Bearer $ACCESS_TOKEN")]"</code></pre>

<h3 id="gan-role-cho-group"><strong>5.2 Gán Role cho Group</strong></h3>
<p>Khi gán role cho group, <strong>tất cả members</strong> của group (và sub-groups) sẽ kế thừa role đó:</p>

<pre><code># Qua CLI
bin/kcadm.sh add-roles \
  -r my-company \
  --gname Engineering \
  --rolename user

bin/kcadm.sh add-roles \
  -r my-company \
  --gname Engineering \
  --cclientid my-web-app \
  --rolename viewer

# Qua REST API
curl -s -X POST \
  "http://localhost:8080/admin/realms/my-company/groups/$GROUP_ID/role-mappings/realm" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d "[$(curl -s -X GET \
    "http://localhost:8080/admin/realms/my-company/roles/user" \
    -H "Authorization: Bearer $ACCESS_TOKEN")]"</code></pre>

<h3 id="effective-roles"><strong>5.3 Effective Roles</strong></h3>
<p>Effective roles của user = roles được gán trực tiếp + roles kế thừa từ groups + roles từ composite roles:</p>
<pre><code># Xem effective realm roles
curl -s -X GET \
  "http://localhost:8080/admin/realms/my-company/users/$USER_ID/role-mappings/realm/composite" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq '.[].name'

# Xem effective client roles
curl -s -X GET \
  "http://localhost:8080/admin/realms/my-company/users/$USER_ID/role-mappings/clients/$CLIENT_UUID/composite" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq '.[].name'</code></pre>

<h2 id="6-default-roles"><strong>6. Default Roles</strong></h2>

<p>Default roles tự động được gán cho mọi user mới khi tạo tài khoản hoặc đăng ký.</p>

<h3 id="cau-hinh-default-roles"><strong>6.1 Cấu hình Default Roles</strong></h3>

<p><strong>Qua Admin Console:</strong></p>
<ol>
<li><p>Vào <strong>Realm roles</strong></p></li>
<li><p>Tìm role <strong>default-roles-{realm}</strong> (ví dụ: <code>default-roles-my-company</code>)</p></li>
<li><p>Click vào role → tab <strong>Action</strong> → <strong>Add associated roles</strong></p></li>
<li><p>Chọn roles muốn set làm default</p></li>
</ol>

<p><strong>Qua CLI:</strong></p>
<pre><code># Thêm role vào default roles
bin/kcadm.sh add-roles \
  -r my-company \
  --rname default-roles-my-company \
  --rolename user \
  --rolename offline_access

# Thêm client role vào default roles
bin/kcadm.sh add-roles \
  -r my-company \
  --rname default-roles-my-company \
  --cclientid my-web-app \
  --rolename viewer</code></pre>

<p>Sau đó, mọi user mới tạo sẽ tự động có roles: <code>user</code>, <code>offline_access</code>, <code>my-web-app/viewer</code>.</p>

<h2 id="7-service-account-roles"><strong>7. Service Account Roles</strong></h2>

<p>Service accounts được sử dụng cho communication giữa services (machine-to-machine) — không cần user interaction.</p>

<h3 id="bat-service-account"><strong>7.1 Bật Service Account cho Client</strong></h3>
<ol>
<li><p>Vào <strong>Clients</strong> → chọn hoặc tạo client</p></li>
<li><p>Tab <strong>Settings</strong>:</p>
<ul>
<li><strong>Client authentication</strong>: ON</li>
<li><strong>Service accounts roles</strong>: ON</li>
<li><strong>Authorization</strong>: OFF (trừ khi cần authorization services)</li>
</ul>
</li>
<li><p>Click <strong>Save</strong></p></li>
</ol>

<h3 id="gan-role-cho-service-account"><strong>7.2 Gán Role cho Service Account</strong></h3>
<pre><code># Qua Admin Console:
# Clients → chọn client → tab "Service account roles" → Assign role

# Qua CLI - lấy service account user
SA_USER_ID=$(bin/kcadm.sh get clients/$CLIENT_UUID/service-account-user -r my-company --fields id --format csv --noquotes)

# Gán realm roles
bin/kcadm.sh add-roles \
  -r my-company \
  --uid $SA_USER_ID \
  --rolename admin

# Gán client roles (realm-management) cho API access
bin/kcadm.sh add-roles \
  -r my-company \
  --uid $SA_USER_ID \
  --cclientid realm-management \
  --rolename manage-users \
  --rolename view-users \
  --rolename manage-clients</code></pre>

<h3 id="su-dung-service-account"><strong>7.3 Sử dụng Service Account</strong></h3>
<pre><code># Lấy access token cho service account (client credentials grant)
ACCESS_TOKEN=$(curl -s -X POST \
  "http://localhost:8080/realms/my-company/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=my-backend-service" \
  -d "client_secret=YOUR_CLIENT_SECRET" | jq -r '.access_token')

# Sử dụng token để gọi API
curl -s -X GET \
  "http://localhost:8080/admin/realms/my-company/users" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq '.[].username'</code></pre>

<h2 id="8-fine-grained-admin-permissions"><strong>8. Fine-grained Admin Permissions V2</strong></h2>

<p>Fine-grained admin permissions V2 (từ Keycloak 26+) cho phép kiểm soát chi tiết ai có thể quản lý resources nào trong Admin Console — thay vì chỉ dùng realm-management client roles thô.</p>

<h3 id="bat-fine-grained-permissions"><strong>8.1 Bật Fine-grained Admin Permissions</strong></h3>
<ol>
<li><p>Vào <strong>Realm settings</strong> → <strong>General</strong></p></li>
<li><p>Tìm <strong>Admin Permissions</strong> → bật <strong>Fine-grained admin permissions (V2)</strong></p></li>
<li><p>Keycloak sẽ tạo permission management resources trong realm</p></li>
</ol>

<p><strong>Lưu ý:</strong> Đây là tính năng preview trong Keycloak 26.x. Trong production, cần đánh giá kỹ trước khi bật.</p>

<h3 id="resource-permissions"><strong>8.2 Resource Permissions</strong></h3>
<p>Sau khi bật, bạn có thể tạo permissions cho các resources:</p>

<p><strong>Users permissions:</strong></p>
<table>
<thead>
<tr><th>Permission</th><th>Mô tả</th></tr>
</thead>
<tbody>
<tr><td>view</td><td>Xem danh sách và chi tiết users</td></tr>
<tr><td>manage</td><td>Tạo, sửa, xóa users</td></tr>
<tr><td>map-roles</td><td>Gán/gỡ roles cho users</td></tr>
<tr><td>manage-group-membership</td><td>Thêm/xóa users khỏi groups</td></tr>
<tr><td>impersonate</td><td>Impersonate users</td></tr>
</tbody>
</table>

<p><strong>Groups permissions:</strong></p>
<table>
<thead>
<tr><th>Permission</th><th>Mô tả</th></tr>
</thead>
<tbody>
<tr><td>view</td><td>Xem groups</td></tr>
<tr><td>manage</td><td>Tạo, sửa, xóa groups</td></tr>
<tr><td>view-members</td><td>Xem members của group</td></tr>
<tr><td>manage-members</td><td>Thêm/xóa members</td></tr>
<tr><td>manage-membership</td><td>Quản lý group membership</td></tr>
</tbody>
</table>

<p><strong>Clients permissions:</strong></p>
<table>
<thead>
<tr><th>Permission</th><th>Mô tả</th></tr>
</thead>
<tbody>
<tr><td>view</td><td>Xem clients</td></tr>
<tr><td>manage</td><td>Tạo, sửa, xóa clients</td></tr>
<tr><td>configure</td><td>Thay đổi client settings</td></tr>
<tr><td>map-roles</td><td>Tạo/gán client roles</td></tr>
</tbody>
</table>

<p><strong>Roles permissions:</strong></p>
<table>
<thead>
<tr><th>Permission</th><th>Mô tả</th></tr>
</thead>
<tbody>
<tr><td>view</td><td>Xem roles</td></tr>
<tr><td>manage</td><td>Tạo, sửa, xóa roles</td></tr>
<tr><td>map-role</td><td>Gán roles cho users/groups</td></tr>
</tbody>
</table>

<h3 id="tao-permission"><strong>8.3 Tạo Permission</strong></h3>
<ol>
<li><p>Vào <strong>Realm settings</strong> → <strong>Admin permissions</strong></p></li>
<li><p>Chọn resource type (Users, Groups, Clients, Roles)</p></li>
<li><p>Click vào permission cần cấu hình (ví dụ: <strong>manage</strong> cho Users)</p></li>
<li><p>Thêm <strong>policies</strong> để xác định ai có permission này</p></li>
</ol>

<h3 id="policies"><strong>8.4 Policies</strong></h3>
<p>Policies xác định điều kiện để cấp permission. Keycloak V2 hỗ trợ các loại policies:</p>

<p><strong>Role-based Policy:</strong></p>
<pre><code>// Cho phép users có role "hr-admin" quản lý users
{
  "type": "role",
  "name": "HR Admin Policy",
  "description": "Users with hr-admin role",
  "roles": [
    {
      "id": "{role-id-of-hr-admin}",
      "required": true
    }
  ]
}</code></pre>

<p><strong>User-based Policy:</strong></p>
<pre><code>// Cho phép specific users
{
  "type": "user",
  "name": "Specific Admin Policy",
  "users": [
    "{user-id-of-admin-1}",
    "{user-id-of-admin-2}"
  ]
}</code></pre>

<p><strong>Group-based Policy:</strong></p>
<pre><code>// Cho phép members của group
{
  "type": "group",
  "name": "Admin Group Policy",
  "groups": [
    {
      "id": "{group-id-of-admins}",
      "extendChildren": true
    }
  ]
}</code></pre>

<p><strong>Client-based Policy:</strong></p>
<pre><code>// Cho phép specific clients (service accounts)
{
  "type": "client",
  "name": "Backend Service Policy",
  "clients": [
    "{client-id-of-backend-service}"
  ]
}</code></pre>

<h3 id="vi-du-thuc-te"><strong>8.5 Ví dụ thực tế: HR Admin chỉ quản lý Users</strong></h3>
<p>Yêu cầu: User có role <code>hr-admin</code> chỉ được phép xem và quản lý users, không được quản lý clients hay realm settings.</p>

<ol>
<li><p><strong>Tạo realm role</strong> <code>hr-admin</code>:</p>
<pre><code>bin/kcadm.sh create roles -r my-company \
  -s name=hr-admin \
  -s description="HR Administrator - can manage users only"</code></pre>
</li>
<li><p><strong>Bật Fine-grained admin permissions V2</strong></p></li>
<li><p><strong>Tạo Role-based Policy</strong> cho <code>hr-admin</code>:</p>
<ul>
<li>Vào Admin permissions → Policies tab</li>
<li>Create policy → Role-based</li>
<li>Name: "HR Admin Policy"</li>
<li>Chọn role: <code>hr-admin</code></li>
</ul>
</li>
<li><p><strong>Gán policy vào Users permissions</strong>:</p>
<ul>
<li>Users → permission <strong>view</strong> → Add policy "HR Admin Policy"</li>
<li>Users → permission <strong>manage</strong> → Add policy "HR Admin Policy"</li>
</ul>
</li>
<li><p><strong>Gán role cho user</strong>:</p>
<pre><code>bin/kcadm.sh add-roles -r my-company \
  --uusername hr-manager \
  --rolename hr-admin</code></pre>
</li>
</ol>

<p>Giờ user <code>hr-manager</code> có thể đăng nhập Admin Console và chỉ thấy menu <strong>Users</strong>.</p>

<h3 id="permission-evaluation"><strong>8.6 Permission Evaluation</strong></h3>
<p>Bạn có thể test permissions bằng cách sử dụng Evaluation tab:</p>
<ol>
<li><p>Vào <strong>Admin permissions</strong> → <strong>Evaluate</strong></p></li>
<li><p>Chọn user hoặc client cần test</p></li>
<li><p>Chọn resource type và permission</p></li>
<li><p>Click <strong>Evaluate</strong> để xem kết quả (PERMIT hoặc DENY)</p></li>
</ol>

<h2 id="9-dedicated-admin-consoles"><strong>9. Dedicated Realm Admin Consoles</strong></h2>

<p>Keycloak cho phép tạo admin accounts riêng cho mỗi realm — không cần truy cập master realm:</p>

<h3 id="tao-realm-admin"><strong>9.1 Tạo Realm Admin</strong></h3>
<pre><code># Tạo user trong realm
bin/kcadm.sh create users -r my-company \
  -s username=realm-admin \
  -s email=realm-admin@mycompany.com \
  -s enabled=true \
  -s emailVerified=true

bin/kcadm.sh set-password -r my-company \
  --username realm-admin \
  --new-password "RealmAdmin@123"

# Gán realm-management client roles
bin/kcadm.sh add-roles -r my-company \
  --uusername realm-admin \
  --cclientid realm-management \
  --rolename realm-admin</code></pre>

<h3 id="realm-management-roles"><strong>9.2 Realm Management Client Roles</strong></h3>
<p>Client <code>realm-management</code> có sẵn các roles để kiểm soát quyền admin:</p>
<table>
<thead>
<tr><th>Role</th><th>Mô tả</th></tr>
</thead>
<tbody>
<tr><td>realm-admin</td><td>Full admin access cho realm</td></tr>
<tr><td>manage-users</td><td>Quản lý users</td></tr>
<tr><td>view-users</td><td>Xem users</td></tr>
<tr><td>manage-clients</td><td>Quản lý clients</td></tr>
<tr><td>view-clients</td><td>Xem clients</td></tr>
<tr><td>manage-realm</td><td>Quản lý realm settings</td></tr>
<tr><td>view-realm</td><td>Xem realm settings</td></tr>
<tr><td>manage-identity-providers</td><td>Quản lý identity providers</td></tr>
<tr><td>manage-events</td><td>Quản lý events</td></tr>
<tr><td>manage-authorization</td><td>Quản lý authorization</td></tr>
<tr><td>impersonation</td><td>Impersonate users</td></tr>
<tr><td>query-users</td><td>Tìm kiếm users</td></tr>
<tr><td>query-groups</td><td>Tìm kiếm groups</td></tr>
<tr><td>query-clients</td><td>Tìm kiếm clients</td></tr>
<tr><td>query-realms</td><td>Tìm kiếm realms</td></tr>
</tbody>
</table>

<p><strong>Ví dụ: Tạo limited admin chỉ quản lý users và groups:</strong></p>
<pre><code>bin/kcadm.sh add-roles -r my-company \
  --uusername limited-admin \
  --cclientid realm-management \
  --rolename manage-users \
  --rolename view-users \
  --rolename query-users \
  --rolename query-groups</code></pre>

<h2 id="10-roles-trong-ung-dung"><strong>10. Sử dụng Roles trong ứng dụng</strong></h2>

<h3 id="kiem-tra-role-tu-token"><strong>10.1 Kiểm tra Roles từ Access Token</strong></h3>
<p>Decoded access token chứa roles:</p>
<pre><code>{
  "sub": "user-uuid",
  "realm_access": {
    "roles": [
      "admin",
      "manager",
      "user",
      "default-roles-my-company",
      "offline_access",
      "uma_authorization"
    ]
  },
  "resource_access": {
    "my-web-app": {
      "roles": [
        "editor",
        "content-admin"
      ]
    },
    "account": {
      "roles": [
        "manage-account",
        "manage-account-links",
        "view-profile"
      ]
    }
  }
}</code></pre>

<h3 id="spring-boot-example"><strong>10.2 Ví dụ trong Spring Boot</strong></h3>
<pre><code>// SecurityConfig.java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -&gt; auth
                .requestMatchers("/api/admin/**").hasRole("admin")
                .requestMatchers("/api/content/**").hasRole("editor")
                .requestMatchers("/api/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -&gt; oauth2
                .jwt(jwt -&gt; jwt
                    .jwtAuthenticationConverter(jwtAuthenticationConverter())
                )
            );
        return http.build();
    }
    
    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter converter = new JwtGrantedAuthoritiesConverter();
        converter.setAuthoritiesClaimName("realm_access.roles");
        converter.setAuthorityPrefix("ROLE_");
        
        JwtAuthenticationConverter jwtConverter = new JwtAuthenticationConverter();
        jwtConverter.setJwtGrantedAuthoritiesConverter(converter);
        return jwtConverter;
    }
}</code></pre>

<h3 id="nodejs-example"><strong>10.3 Ví dụ trong Node.js (Express)</strong></h3>
<pre><code>// middleware/auth.js
const jwt = require('jsonwebtoken');

function hasRealmRole(role) {
  return (req, res, next) =&gt; {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });
    
    try {
      const decoded = jwt.decode(token);
      const roles = decoded.realm_access?.roles || [];
      
      if (roles.includes(role)) {
        req.user = decoded;
        next();
      } else {
        res.status(403).json({ error: 'Insufficient permissions' });
      }
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
}

function hasClientRole(clientId, role) {
  return (req, res, next) =&gt; {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });
    
    try {
      const decoded = jwt.decode(token);
      const roles = decoded.resource_access?.[clientId]?.roles || [];
      
      if (roles.includes(role)) {
        req.user = decoded;
        next();
      } else {
        res.status(403).json({ error: 'Insufficient permissions' });
      }
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
}

// Sử dụng
app.get('/api/admin/users', hasRealmRole('admin'), (req, res) =&gt; {
  // Only admin can access
});

app.post('/api/content', hasClientRole('my-web-app', 'editor'), (req, res) =&gt; {
  // Only editors can create content
});</code></pre>

<h2 id="11-thuc-hanh"><strong>11. Bài tập thực hành</strong></h2>

<ol>
<li><p><strong>Tạo Realm Roles</strong>: <code>super-admin</code>, <code>manager</code>, <code>staff</code>, <code>viewer</code></p></li>
<li><p><strong>Tạo Client Roles</strong> cho client <code>my-web-app</code>: <code>content-editor</code>, <code>content-reviewer</code>, <code>content-publisher</code></p></li>
<li><p><strong>Tạo Composite Roles</strong>:</p>
<ul>
<li><code>super-admin</code> chứa: <code>manager</code> + tất cả client roles</li>
<li><code>manager</code> chứa: <code>staff</code> + <code>content-reviewer</code></li>
<li><code>staff</code> chứa: <code>viewer</code> + <code>content-editor</code></li>
</ul>
</li>
<li><p><strong>Gán roles cho groups</strong>:</p>
<ul>
<li>Group <code>Engineering</code>: realm role <code>staff</code></li>
<li>Group <code>Engineering/Backend</code>: client role <code>content-editor</code></li>
</ul>
</li>
<li><p><strong>Bật Fine-grained admin permissions V2</strong> và tạo:</p>
<ul>
<li>Role-based policy cho <code>hr-admin</code></li>
<li>Gán policy vào Users view/manage permissions</li>
<li>Test với user có role <code>hr-admin</code></li>
</ul>
</li>
<li><p><strong>Tạo Service Account</strong> cho client <code>my-backend-service</code> với roles <code>manage-users</code>, <code>view-users</code> và test bằng client credentials grant</p></li>
</ol>

<h2 id="12-tong-ket"><strong>12. Tổng kết</strong></h2>

<p>Trong bài này, bạn đã học:</p>
<ul>
<li><p>Phân biệt <strong>Realm Roles</strong> và <strong>Client Roles</strong></p></li>
<li><p>Tạo <strong>Composite Roles</strong> với hierarchy phân quyền</p></li>
<li><p><strong>Role Mappings</strong> cho users và groups (trực tiếp và kế thừa)</p></li>
<li><p>Cấu hình <strong>Default Roles</strong> cho users mới</p></li>
<li><p>Sử dụng <strong>Service Account Roles</strong> cho machine-to-machine communication</p></li>
<li><p><strong>Fine-grained Admin Permissions V2</strong> với policies (role-based, user-based, group-based, client-based)</p></li>
<li><p>Tạo <strong>dedicated realm admin</strong> với limited permissions</p></li>
<li><p>Kiểm tra roles trong ứng dụng (Spring Boot, Node.js)</p></li>
</ul>

<p>Bài tiếp theo sẽ hướng dẫn về <strong>Clients, Client Scopes và OpenID Connect</strong> trong Keycloak.</p>
