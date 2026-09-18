---
id: 019d8b30-b105-7001-c001-e0c5f8100105
title: 'Lesson 5: Roles, Permissions and Access Control'
slug: bai-5-roles-permissions-va-access-control
description: Realm roles, client roles, composite roles, role mappings for users and groups, default roles, service account roles. Fine-grained admin permissions V2, realm administration delegation, resource-specific permissions, policies and permission evaluation.
duration_minutes: 150
is_free: true
video_url: null
sort_order: 5
section_title: 'Part 1: Keycloak Platform'
course:
  id: 019d8b30-b100-7001-c001-e0c5f8100001
  title: Keycloak from Basic to Advanced
  slug: keycloak-tu-co-ban-den-nang-cao
locale: en
---
<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/03/keycloak-rbac-permissions-2026.webp" alt="Keycloak RBAC & Fine-grained Permissions" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>RBAC and Fine-grained Admin Permissions V2 model in Keycloak</em></p>
</div>

<h2 id="1-tong-quan-roles"><strong>1. Overview of Roles in Keycloak</strong></h2>

<p>Roles in Keycloak is the main mechanism for decentralizing access. The application checks the user's roles (through claims in the token) to decide what the user is allowed to do. Keycloak supports two types of roles: <strong>Realm Roles</strong> and <strong>Client Roles</strong>.</p>

<h3 id="realm-roles-vs-client-roles"><strong>Realm Roles vs Client Roles</strong></h3>
<table>
<thead>
<tr><th>Characteristics</th><th>Realm Roles</th><th>Client Roles</th></tr>
</thead>
<tbody>
<tr><td>Scope</td><td>Entire realm</td><td>Specific client only</td></tr>
<tr><td>Use case</td><td>General roles (Admin, User, Manager)</td><td>Application-specific roles (editor, viewer)</td></tr>
<tr><td>Namespace</td><td>Unique trong realm</td><td>Unique trong client</td></tr>
<tr><td>Token claim</td><td><code>realm_access.roles</code></td><td><code>resource_access.{client}.roles</code></td></tr>
</tbody>
</table>

<h2 id="2-realm-roles"><strong>2. Realm Roles</strong></h2>

<h3 id="realm-roles-mac-dinh"><strong>2.1 Realm Roles default</strong></h3>
<p>Keycloak creates some realm roles:</p>
<ul>
<li><p><strong>default-roles-{realm}</strong> — composite role contains default roles for new users</p></li>
<li><p><strong>offline_access</strong> — allows to get offline tokens (long-term token refresh)</p></li>
<li><p><strong>uma_authorization</strong> — permission to use UMA (User-Managed Access)</p></li>
</ul>

<h3 id="tao-realm-role"><strong>2.2 Create Realm Role</strong></h3>

<p><strong>Qua Admin Console:</strong></p>
<ol>
<li><p>Click <strong>Realm roles</strong> trong sidebar</p></li>
<li><p>Click <strong>Create role</strong></p></li>
<li><p>Enter:</p>
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

<p>Client roles are used when the application needs its own roles — for example, a CMS application has roles <code>editor</code>, <code>author</code>, <code>reviewer</code> that are different from the HR application roles.</p>

<h3 id="tao-client-role"><strong>3.1 Create Client Role</strong></h3>

<p><strong>Qua Admin Console:</strong></p>
<ol>
<li><p>Go to <strong>Clients</strong> → select client (for example: <code>my-web-app</code>)</p></li>
<li><p>Tab <strong>Roles</strong></p></li>
<li><p>Click <strong>Create role</strong></p></li>
<li><p>Enter name and description</p></li>
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
<p>Client roles appear in the access token under claim <code>resource_access</code>:</p>
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

<p>Composite roles are roles that contain one or more child roles (realm roles and/or client roles). When a user is assigned a composite role, the user automatically has all child roles.</p>

<h3 id="tao-composite-role"><strong>4.1 Create Composite Role</strong></h3>

<p><strong>Qua Admin Console:</strong></p>
<ol>
<li><p>Go to <strong>Realm roles</strong> → select role (for example: <code>admin</code>)</p></li>
<li><p>Tab <strong>Action</strong> → <strong>Add associated roles</strong></p></li>
<li><p>Select the roles to add (realm roles and/or client roles)</p></li>
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

<p><strong>Example hierarchy:</strong></p>
<pre><code>admin (composite)
├── manager (composite)
│   ├── user (realm role)
│   ├── viewer (realm role)
│   ├── my-web-app/editor (client role)
│   └── my-web-app/reviewer (client role)
├── my-web-app/content-admin (client role)
└── account/manage-account (client role)</code></pre>

<p><strong>Note:</strong> When a user is assigned the role <code>admin</code>, the user will have <strong>all</strong> roles in the hierarchy: <code>admin</code>, <code>manager</code>, <code>user</code>, <code>viewer</code>, <code>editor</code>, <code>reviewer</code>, <code>content-admin</code>, <code>manage-account</code>.</p>

<h3 id="xem-composite-roles"><strong>4.2 Xem Composite Roles</strong></h3>
<pre><code># Xem roles con của composite role
bin/kcadm.sh get-roles -r my-company --rname admin --effective

# REST API
curl -s -X GET \
  "http://localhost:8080/admin/realms/my-company/roles/admin/composites" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq '.[].name'</code></pre>

<h2 id="5-role-mappings"><strong>5. Role Mappings</strong></h2>

<h3 id="gan-role-cho-user"><strong>5.1 Assign Role to User</strong></h3>

<p><strong>Qua Admin Console:</strong></p>
<ol>
<li><p>Go to <strong>Users</strong> → select user</p></li>
<li><p>Tab <strong>Role mapping</strong></p></li>
<li><p>Click <strong>Assign role</strong></p></li>
<li><p>Select realm roles or filter by client to select client roles</p></li>
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

<h3 id="gan-role-cho-group"><strong>5.2 Assign Role to Group</strong></h3>
<p>When assigning a role to a group, <strong>all members</strong> of the group (and sub-groups) will inherit that role:</p>

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
<p>Effective roles of user = directly assigned roles + roles inherited from groups + roles from composite roles:</p>
<pre><code># Xem effective realm roles
curl -s -X GET \
  "http://localhost:8080/admin/realms/my-company/users/$USER_ID/role-mappings/realm/composite" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq '.[].name'

# Xem effective client roles
curl -s -X GET \
  "http://localhost:8080/admin/realms/my-company/users/$USER_ID/role-mappings/clients/$CLIENT_UUID/composite" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq '.[].name'</code></pre>

<h2 id="6-default-roles"><strong>6. Default Roles</strong></h2>

<p>Default roles are automatically assigned to every new user when creating an account or registering.</p>

<h3 id="cau-hinh-default-roles"><strong>6.1 Configure Default Roles</strong></h3>

<p><strong>Qua Admin Console:</strong></p>
<ol>
<li><p>Enter <strong>Realm roles</strong></p></li>
<li><p>Find the role <strong>default-roles-{realm}</strong> (for example: <code>default-roles-my-company</code>)</p></li>
<li><p>Click on role → tab <strong>Action</strong> → <strong>Add associated roles</strong></p></li>
<li><p>Select the role you want to set as default</p></li>
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

<p>After that, every newly created user will automatically have roles: <code>user</code>, <code>offline_access</code>, <code>my-web-app/viewer</code>.</p>

<h2 id="7-service-account-roles"><strong>7. Service Account Roles</strong></h2>

<p>Service accounts are used for communication between services (machine-to-machine) — no user interaction required.</p>

<h3 id="bat-service-account"><strong>7.1 Enable Service Account for Client</strong></h3>
<ol>
<li><p>Go to <strong>Clients</strong> → select or create client</p></li>
<li><p>Tab <strong>Settings</strong>:</p>
<ul>
<li><strong>Client authentication</strong>: ON</li>
<li><strong>Service accounts roles</strong>: ON</li>
<li><strong>Authorization</strong>: OFF (unless authorization services are needed)</li>
</ul>
</li>
<li><p>Click <strong>Save</strong></p></li>
</ol>

<h3 id="gan-role-cho-service-account"><strong>7.2 Assign Role to Service Account</strong></h3>
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

<h3 id="su-dung-service-account"><strong>7.3 Using Service Account</strong></h3>
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

<p>Fine-grained admin permissions V2 (from Keycloak 26+) allows granular control over who can manage which resources in the Admin Console — instead of just using raw realm-management client roles.</p>

<h3 id="bat-fine-grained-permissions"><strong>8.1 Enable Fine-grained Admin Permissions</strong></h3>
<ol>
<li><p>Go to <strong>Realm settings</strong> → <strong>General</strong></p></li>
<li><p>Find <strong>Admin Permissions</strong> → enable <strong>Fine-grained admin permissions (V2)</strong></p></li>
<li><p>Keycloak will create permission management resources in realm</p></li>
</ol>

<p><strong>Note:</strong> This is a preview feature in Keycloak 26.x. In production, you need to evaluate carefully before turning on.</p>

<h3 id="resource-permissions"><strong>8.2 Resource Permissions</strong></h3>
<p>Once enabled, you can create permissions for resources:</p>

<p><strong>Users permissions:</strong></p>
<table>
<thead>
<tr><th>Permission</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td>view</td><td>View list and details users</td></tr>
<tr><td>manage</td><td>Create, edit, delete users</td></tr>
<tr><td>map-roles</td><td>Assign/remove roles to users</td></tr>
<tr><td>manage-group-membership</td><td>Add/remove users from groups</td></tr>
<tr><td>impersonate</td><td>Impersonate users</td></tr>
</tbody>
</table>

<p><strong>Groups permissions:</strong></p>
<table>
<thead>
<tr><th>Permission</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td>view</td><td>Xem groups</td></tr>
<tr><td>manage</td><td>Create, edit, delete groups</td></tr>
<tr><td>view-members</td><td>View members of group</td></tr>
<tr><td>manage-members</td><td>Add/remove members</td></tr>
<tr><td>manage-membership</td><td>Manage group membership</td></tr>
</tbody>
</table>

<p><strong>Clients permissions:</strong></p>
<table>
<thead>
<tr><th>Permission</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td>view</td><td>Xem clients</td></tr>
<tr><td>manage</td><td>Create, edit, delete clients</td></tr>
<tr><td>configure</td><td>Change client settings</td></tr>
<tr><td>map-roles</td><td>Create/assign client roles</td></tr>
</tbody>
</table>

<p><strong>Roles permissions:</strong></p>
<table>
<thead>
<tr><th>Permission</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td>view</td><td>Xem roles</td></tr>
<tr><td>manage</td><td>Create, edit, delete roles</td></tr>
<tr><td>map-role</td><td>Assign roles to users/groups</td></tr>
</tbody>
</table>

<h3 id="tao-permission"><strong>8.3 Create Permission</strong></h3>
<ol>
<li><p>Go to <strong>Realm settings</strong> → <strong>Admin permissions</strong></p></li>
<li><p>Select resource type (Users, Groups, Clients, Roles)</p></li>
<li><p>Click on the permission to configure (for example: <strong>manage</strong> for Users)</p></li>
<li><p>Add <strong>policies</strong> to determine who has this permission</p></li>
</ol>

<h3 id="policies"><strong>8.4 Policies</strong></h3>
<p>Policies defines the conditions for granting permission. Keycloak V2 supports the following policies:</p>

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

<h3 id="vi-du-thuc-te"><strong>8.5 Practical example: HR Admin only manages Users</strong></h3>
<p>Requirement: User with role <code>hr-admin</code> is only allowed to view and manage users, not manage clients or realm settings.</p>

<ol>
<li><p><strong>Create realm role</strong> <code>hr-admin</code>:</p>
<pre><code>bin/kcadm.sh create roles -r my-company \
  -s name=hr-admin \
  -s description="HR Administrator - can manage users only"</code></pre>
</li>
<li><p><strong>Enable Fine-grained admin permissions V2</strong></p></li>
<li><p><strong>Create Role-based Policy</strong> for <code>hr-admin</code>:</p>
<ul>
<li>Go to Admin permissions → Policies tab</li>
<li>Create policy → Role-based</li>
<li>Name: "HR Admin Policy"</li>
<li>Select role: <code>hr-admin</code></li>
</ul>
</li>
<li><p><strong>Assign policy to Users permissions</strong>:</p>
<ul>
<li>Users → permission <strong>view</strong> → Add policy "HR Admin Policy"</li>
<li>Users → permission <strong>manage</strong> → Add policy "HR Admin Policy"</li>
</ul>
</li>
<li><p><strong>Assign role to user</strong>:</p>
<pre><code>bin/kcadm.sh add-roles -r my-company \
  --uusername hr-manager \
  --rolename hr-admin</code></pre>
</li>
</ol>

<p>Now user <code>hr-manager</code> can log in to Admin Console and only see menu <strong>Users</strong>.</p>

<h3 id="permission-evaluation"><strong>8.6 Permission Evaluation</strong></h3>
<p>You can test permissions using the Evaluation tab:</p>
<ol>
<li><p>Go to <strong>Admin permissions</strong> → <strong>Evaluate</strong></p></li>
<li><p>Select the user or client to test</p></li>
<li><p>Select resource type and permission</p></li>
<li><p>Click <strong>Evaluate</strong> to see the result (PERMIT or DENY)</p></li>
</ol>

<h2 id="9-dedicated-admin-consoles"><strong>9. Dedicated Realm Admin Consoles</strong></h2>

<p>Keycloak allows creating separate admin accounts for each realm — no need to access the master realm:</p>

<h3 id="tao-realm-admin"><strong>9.1 Create Realm Admin</strong></h3>
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
<p>Client <code>realm-management</code> has available roles to control admin rights:</p>
<table>
<thead>
<tr><th>Role</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td>realm-admin</td><td>Full admin access cho realm</td></tr>
<tr><td>manage-users</td><td>Manage users</td></tr>
<tr><td>view-users</td><td>Xem users</td></tr>
<tr><td>manage-clients</td><td>Manage clients</td></tr>
<tr><td>view-clients</td><td>Xem clients</td></tr>
<tr><td>manage-realm</td><td>Manage realm settings</td></tr>
<tr><td>view-realm</td><td>Xem realm settings</td></tr>
<tr><td>manage-identity-providers</td><td>Manage identity providers</td></tr>
<tr><td>manage-events</td><td>Manage events</td></tr>
<tr><td>manage-authorization</td><td>Manage authorization</td></tr>
<tr><td>impersonation</td><td>Impersonate users</td></tr>
<tr><td>query-users</td><td>Search users</td></tr>
<tr><td>query-groups</td><td>Search groups</td></tr>
<tr><td>query-clients</td><td>Search clients</td></tr>
<tr><td>query-realms</td><td>Search realms</td></tr>
</tbody>
</table>

<p><strong>For example: Create a limited admin that only manages users and groups:</strong></p>
<pre><code>bin/kcadm.sh add-roles -r my-company \
  --uusername limited-admin \
  --cclientid realm-management \
  --rolename manage-users \
  --rolename view-users \
  --rolename query-users \
  --rolename query-groups</code></pre>

<h2 id="10-roles-trong-ung-dung"><strong>10. Using Roles in application</strong></h2>

<h3 id="kiem-tra-role-tu-token"><strong>10.1 Check Roles from Access Token</strong></h3>
<p>Decoded access token contains roles:</p>
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

<h3 id="spring-boot-example"><strong>10.2 Example in Spring Boot</strong></h3>
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

<h3 id="nodejs-example"><strong>10.3 Example in Node.js (Express)</strong></h3>
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

<h2 id="11-thuc-hanh"><strong>11. Practice exercises</strong></h2>

<ol>
<li><p><strong>Create Realm Roles</strong>: <code>super-admin</code>, <code>manager</code>, <code>staff</code>, <code>viewer</code></p></li>
<li><p><strong>Create Client Roles</strong> for client <code>my-web-app</code>: <code>content-editor</code>, <code>content-reviewer</code>, <code>content-publisher</code></p></li>
<li><p><strong>Create Composite Roles</strong>:</p>
<ul>
<li><code>super-admin</code> contains: <code>manager</code> + all client roles</li>
<li><code>manager</code> contains: <code>staff</code> + <code>content-reviewer</code></li>
<li><code>staff</code> contains: <code>viewer</code> + <code>content-editor</code></li>
</ul>
</li>
<li><p><strong>Assign roles to groups</strong>:</p>
<ul>
<li>Group <code>Engineering</code>: realm role <code>staff</code></li>
<li>Group <code>Engineering/Backend</code>: client role <code>content-editor</code></li>
</ul>
</li>
<li><p><strong>Enable Fine-grained admin permissions V2</strong> and create:</p>
<ul>
<li>Role-based policy cho <code>hr-admin</code></li>
<li>Assign policy to Users view/manage permissions</li>
<li>Test with user with role <code>hr-admin</code></li>
</ul>
</li>
<li><p><strong>Create Service Account</strong> for client <code>my-backend-service</code> with roles <code>manage-users</code>, <code>view-users</code> and test with client credentials grant</p></li>
</ol>

<h2 id="12-tong-ket"><strong>12. Summary</strong></h2>

<p>In this lesson, you learned:</p>
<ul>
<li><p>Distinguish between <strong>Realm Roles</strong> and <strong>Client Roles</strong></p></li>
<li><p>Create <strong>Composite Roles</strong> with hierarchy</p></li>
<li><p><strong>Role Mappings</strong> for users and groups (direct and legacy)</p></li>
<li><p>Configuration <strong>Default Roles</strong> for new users</p></li>
<li><p>Use <strong>Service Account Roles</strong> for machine-to-machine communication</p></li>
<li><p><strong>Fine-grained Admin Permissions V2</strong> with policies (role-based, user-based, group-based, client-based)</p></li>
<li><p>Create <strong>dedicated realm admin</strong> with limited permissions</p></li>
<li><p>Check roles in the application (Spring Boot, Node.js)</p></li>
</ul>

<p>The next article will guide about <strong>Clients, Client Scopes and OpenID Connect</strong> in Keycloak.</p>
