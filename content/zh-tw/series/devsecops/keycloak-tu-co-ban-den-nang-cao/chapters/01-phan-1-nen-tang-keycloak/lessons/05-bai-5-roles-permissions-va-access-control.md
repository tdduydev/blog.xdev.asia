---
id: 019d8b30-b105-7001-c001-e0c5f8100105
title: 第 5 課：角色、權限和存取控制
slug: bai-5-roles-permissions-va-access-control
description: 領域角色、客戶端角色、複合角色、使用者和群組的角色映射、預設角色、服務帳戶角色。細粒度管理權限V2、領域管理委派、特定資源的權限、策略和權限評估。
duration_minutes: 150
is_free: true
video_url: null
sort_order: 5
section_title: 第 1 部分：Keycloak 平台
course:
  id: 019d8b30-b100-7001-c001-e0c5f8100001
  title: 鑰匙斗篷從基礎到高級
  slug: keycloak-tu-co-ban-den-nang-cao
locale: zh-tw
---
<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/03/keycloak-rbac-permissions-2026.webp" alt="Keycloak RBAC & Fine-grained Permissions" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Keycloak 中的 RBAC 和細微管理員權限 V2 模型</em></p>
</div>

<h2 id="1-tong-quan-roles"><strong>1.Keycloak中的角色概述</strong></h2>

<p>Keycloak 中的角色是分散存取的主要機制。應用程式檢查使用者的角色（透過令牌中的聲明）來決定允許使用者執行哪些操作。 Keycloak supports two types of roles:<strong>領域角色</strong>和<strong>客戶角色</strong>.</p>

<h3 id="realm-roles-vs-client-roles"><strong>領域角色與客戶端角色</strong></h3>
<table>
<thead>
<tr><th>特徵</th><th>領域角色</th><th>客戶角色</th></tr>
</thead>
<tbody>
<tr><td>範圍</td><td>整個領域</td><td>僅針對特定客戶</td></tr>
<tr><td>使用案例</td><td>一般角色（管理員、使用者、經理）</td><td>應用程式特定角色（編輯者、檢視者）</td></tr>
<tr><td>命名空間</td><td>領域獨一無二</td><td>在客戶端獨一無二</td></tr>
<tr><td>代幣領取</td><td><code>領域訪問角色</code></td><td><code>resources_access.{client}.roles</code></td></tr>
</tbody>
</table>

<h2 id="2-realm-roles"><strong>2. 領域角色</strong></h2>

<h3 id="realm-roles-mac-dinh"><strong>2.1 預設領域角色</strong></h3>
<p>Keycloak 提供了許多領域角色：</p>
<ul>
<li><p><strong>預設角色-{領域}</strong>— 複合角色包含新使用者的預設角色</p></li>
<li><p><strong>離線訪問</strong>— 允許取得離線令牌（長期令牌刷新）</p></li>
<li><p><strong>uma_授權</strong>— 允許使用 UMA（使用者管理存取）</p></li>
</ul>

<h3 id="tao-realm-role"><strong>2.2 創建領域角色</strong></h3>

<p><strong>透過管理控制台：</strong></p>
<ol>
<li><p>點選<strong>領域角色</strong>在側邊欄中</p></li>
<li><p>點選<strong>創建角色</strong></p></li>
<li><p>進入：</p>
<ul>
<li><strong>角色名稱</strong>: <code>行政。行政</code></li>
<li><strong>描述</strong>: <code>完全管理員存取權限</code></li>
</ul>
</li>
<li><p>點選<strong>節省</strong></p></li>
</ol>

<p><strong>透過管理 CLI：</strong></p>
<pre><code># Tạo realm roles
bin/kcadm.sh create roles -r my-company -s name=admin -s description="Full administrator access"
bin/kcadm.sh create roles -r my-company -s name=manager -s description="Manager with limited admin access"
bin/kcadm.sh create roles -r my-company -s name=user -s description="Regular user"
bin/kcadm.sh create roles -r my-company -s name=viewer -s description="Read-only access"

# Xem danh sách realm roles
bin/kcadm.sh get roles -r my-company --fields name,description</code></pre>

<p><strong>透過 REST API：</strong></p>
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

<h2 id="3-client-roles"><strong>3. 客戶角色</strong></h2>

<p>當應用程式需要自己的角色時，使用客戶端角色 - 例如，CMS 應用程式具有角色<code>編輯</code>, <code>作者</code>, <code>審稿人</code>與HR應用程式的角色不同。</p>

<h3 id="tao-client-role"><strong>3.1 建立客戶端角色</strong></h3>

<p><strong>透過管理控制台：</strong></p>
<ol>
<li><p>進入<strong>客戶</strong>→ 選擇客戶端（例如：<code>我的網頁應用程式</code>)</p></li>
<li><p>選項卡<strong>角色</strong></p></li>
<li><p>點選<strong>創建角色</strong></p></li>
<li><p>輸入名稱和描述</p></li>
</ol>

<p><strong>透過 CLI：</strong></p>
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

<p><strong>透過 REST API：</strong></p>
<pre><code>curl -s -X POST \
  "http://localhost:8080/admin/realms/my-company/clients/$CLIENT_UUID/roles" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "editor",
    "description": "Can create and edit content"
  }'</code></pre>

<h3 id="client-role-trong-token"><strong>3.2 Token 中的客戶端角色</strong></h3>
<p>客戶端角色出現在宣告下的存取權杖中<code>資源訪問</code>:</p>
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

<h2 id="4-composite-roles"><strong>4. 複合角色</strong></h2>

<p>複合角色是包含一個或多個子角色（領域角色和/或客戶端角色）的角色。當為使用者指派複合角色時，該使用者自動擁有所有子角色。</p>

<h3 id="tao-composite-role"><strong>4.1 創建複合角色</strong></h3>

<p><strong>透過管理控制台：</strong></p>
<ol>
<li><p>進入<strong>領域角色</strong>→ 選擇角色（例如：<code>行政。行政</code>)</p></li>
<li><p>選項卡<strong>行動</strong> → <strong>新增關聯角色</strong></p></li>
<li><p>選擇要新增的角色（領域角色和/或客戶端角色）</p></li>
<li><p>點選<strong>分配</strong></p></li>
</ol>

<p><strong>透過 CLI：</strong></p>
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

<p><strong>層次結構範例：</strong></p>
<pre><code>admin (composite)
├── manager (composite)
│   ├── user (realm role)
│   ├── viewer (realm role)
│   ├── my-web-app/editor (client role)
│   └── my-web-app/reviewer (client role)
├── my-web-app/content-admin (client role)
└── account/manage-account (client role)</code></pre>

<p><strong>筆記：</strong>當使用者被指派角色時<code>行政。行政</code>，用戶將會擁有它<strong>全部</strong>樹層次結構中的角色：<code>行政。行政</code>, <code>主管</code>, <code>用戶.用戶</code>, <code>觀眾。觀眾</code>, <code>編輯</code>, <code>審稿人</code>, <code>內容管理</code>, <code>管理帳號</code>.</p>

<h3 id="xem-composite-roles"><strong>4.2 查看複合角色</strong></h3>
<pre><code># Xem roles con của composite role
bin/kcadm.sh get-roles -r my-company --rname admin --effective

# REST API
curl -s -X GET \
  "http://localhost:8080/admin/realms/my-company/roles/admin/composites" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq '.[].name'</code></pre>

<h2 id="5-role-mappings"><strong>5. 角色映射</strong></h2>

<h3 id="gan-role-cho-user"><strong>5.1 為使用者分配角色</strong></h3>

<p><strong>透過管理控制台：</strong></p>
<ol>
<li><p>進入<strong>使用者</strong>→ 選擇用戶</p></li>
<li><p>選項卡<strong>角色映射</strong></p></li>
<li><p>點選<strong>分配角色</strong></p></li>
<li><p>選擇領域角色或按客戶端過濾以選擇客戶端角色</p></li>
<li><p>點選<strong>分配</strong></p></li>
</ol>

<p><strong>透過 CLI：</strong></p>
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

<p><strong>透過 REST API：</strong></p>
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

<h3 id="gan-role-cho-group"><strong>5.2 將角色分配給群組</strong></h3>
<p>在為群組指派角色時，<strong>所有成員</strong>該群組（和子群組）的成員將繼承該角色：</p>

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

<h3 id="effective-roles"><strong>5.3 有效角色</strong></h3>
<p>使用者的有效角色=直接指派的角色+從群組繼承的角色+複合角色的角色：</p>
<pre><code># Xem effective realm roles
curl -s -X GET \
  "http://localhost:8080/admin/realms/my-company/users/$USER_ID/role-mappings/realm/composite" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq '.[].name'

# Xem effective client roles
curl -s -X GET \
  "http://localhost:8080/admin/realms/my-company/users/$USER_ID/role-mappings/clients/$CLIENT_UUID/composite" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq '.[].name'</code></pre>

<h2 id="6-default-roles"><strong>6. 預設角色</strong></h2>

<p>建立帳戶或註冊時，預設角色會自動指派給每個新使用者。</p>

<h3 id="cau-hinh-default-roles"><strong>6.1 配置預設角色</strong></h3>

<p><strong>透過管理控制台：</strong></p>
<ol>
<li><p>進入<strong>領域角色</strong></p></li>
<li><p>尋找角色<strong>預設角色-{領域}</strong>（例如：<code>預設角色我的公司</code>)</p></li>
<li><p>點選角色 → 選項卡<strong>行動</strong> → <strong>新增關聯角色</strong></p></li>
<li><p>選擇您要設定為預設的角色</p></li>
</ol>

<p><strong>透過 CLI：</strong></p>
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

<p>之後，每個新建立的使用者將自動擁有角色：<code>用戶.用戶</code>, <code>離線訪問</code>, <code>我的網頁應用程式/檢視器</code>.</p>

<h2 id="7-service-account-roles"><strong>7. 服務帳號角色</strong></h2>

<p>服務帳戶用於服務之間的通訊（機器對機器）－無需使用者互動。</p>

<h3 id="bat-service-account"><strong>7.1 為客戶端啟用服務帳戶</strong></h3>
<ol>
<li><p>進入<strong>客戶</strong>→ 選擇或建立客戶</p></li>
<li><p>選項卡<strong>設定</strong>:</p>
<ul>
<li><strong>客戶端認證</strong>： 在</li>
<li><strong>服務帳號角色</strong>： 在</li>
<li><strong>授權</strong>：關閉（除非需要授權服務）</li>
</ul>
</li>
<li><p>點選<strong>節省</strong></p></li>
</ol>

<h3 id="gan-role-cho-service-account"><strong>7.2 為服務帳戶分配角色</strong></h3>
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

<h3 id="su-dung-service-account"><strong>7.3 使用服務帳戶</strong></h3>
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

<h2 id="8-fine-grained-admin-permissions"><strong>8.細粒度管理者權限V2</strong></h2>

<p>細粒度的管理權限 V2（來自 Keycloak 26+）允許對誰可以管理管理控制台中的資源進行精細控制，而不僅僅是使用原始領域管理客戶端角色。</p>

<h3 id="bat-fine-grained-permissions"><strong>8.1 啟用細粒度管理權限</strong></h3>
<ol>
<li><p>進入<strong>領域設定</strong> → <strong>一般的</strong></p></li>
<li><p>尋找<strong>管理員權限</strong>→ 打開<strong>細粒度管理員權限（V2）</strong></p></li>
<li><p>Keycloak會在realm中建立權限管理資源</p></li>
</ol>

<p><strong>筆記：</strong>這是 Keycloak 26.x 中的預覽功能。生產中，開機前需仔細評估。</p>

<h3 id="resource-permissions"><strong>8.2 資源權限</strong></h3>
<p>啟用後，您可以為資源建立權限：</p>

<p><strong>使用者權限：</strong></p>
<table>
<thead>
<tr><th>允許</th><th>描述</th></tr>
</thead>
<tbody>
<tr><td>看法。看法</td><td>查看用戶列表和詳細信息</td></tr>
<tr><td>管理</td><td>建立、編輯、刪除用戶</td></tr>
<tr><td>地圖角色</td><td>為使用者指派/刪除角色</td></tr>
<tr><td>管理群組成員資格</td><td>在群組中新增/刪除用戶</td></tr>
<tr><td>模仿</td><td>冒充用戶</td></tr>
</tbody>
</table>

<p><strong>群組權限：</strong></p>
<table>
<thead>
<tr><th>允許</th><th>描述</th></tr>
</thead>
<tbody>
<tr><td>看法。看法</td><td>查看群組</td></tr>
<tr><td>管理</td><td>建立、編輯、刪除群組</td></tr>
<tr><td>查看會員</td><td>查看群組成員</td></tr>
<tr><td>管理成員</td><td>新增/刪除成員</td></tr>
<tr><td>管理會員資格</td><td>管理群組成員資格</td></tr>
</tbody>
</table>

<p><strong>客戶權限：</strong></p>
<table>
<thead>
<tr><th>允許</th><th>描述</th></tr>
</thead>
<tbody>
<tr><td>看法。看法</td><td>查看客戶</td></tr>
<tr><td>管理</td><td>建立、編輯、刪除客戶</td></tr>
<tr><td>配置</td><td>更改客戶端設定</td></tr>
<tr><td>地圖角色</td><td>創建/分配客戶角色</td></tr>
</tbody>
</table>

<p><strong>角色權限：</strong></p>
<table>
<thead>
<tr><th>允許</th><th>描述</th></tr>
</thead>
<tbody>
<tr><td>看法。看法</td><td>查看角色</td></tr>
<tr><td>管理</td><td>建立、編輯、刪除角色</td></tr>
<tr><td>地圖角色</td><td>將角色指派給使用者/群組</td></tr>
</tbody>
</table>

<h3 id="tao-permission"><strong>8.3 建立權限</strong></h3>
<ol>
<li><p>進入<strong>領域設定</strong> → <strong>管理員權限</strong></p></li>
<li><p>選擇資源類型（使用者、群組、客戶端、角色）</p></li>
<li><p>點選需要配置的權限（例如：<strong>管理</strong>對於用戶）</p></li>
<li><p>更多的<strong>政策。政策</strong>確定誰擁有此權限</p></li>
</ol>

<h3 id="policies"><strong>8.4 政策</strong></h3>
<p>策略定義授予權限的條件。 Keycloak V2支援以下策略：</p>

<p><strong>基於角色的策略：</strong></p>
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

<p><strong>基於使用者的政策：</strong></p>
<pre><code>// Cho phép specific users
{
  "type": "user",
  "name": "Specific Admin Policy",
  "users": [
    "{user-id-of-admin-1}",
    "{user-id-of-admin-2}"
  ]
}</code></pre>

<p><strong>基於團體的政策：</strong></p>
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

<p><strong>基於客戶的政策：</strong></p>
<pre><code>// Cho phép specific clients (service accounts)
{
  "type": "client",
  "name": "Backend Service Policy",
  "clients": [
    "{client-id-of-backend-service}"
  ]
}</code></pre>

<h3 id="vi-du-thuc-te"><strong>8.5 實際範例：HR Admin 只管理用戶</strong></h3>
<p>要求：使用者有角色<code>人力資源管理員</code>只允許查看和管理用戶，不允許管理客戶端或領域設定。</p>

<ol>
<li><p><strong>創建領域角色</strong> <code>人力資源管理員</code>:</p>
<pre><code>bin/kcadm.sh create roles -r my-company \
  -s name=hr-admin \
  -s description="HR Administrator - can manage users only"</code></pre>
</li>
<li><p><strong>啟用細粒度管理員權限V2</strong></p></li>
<li><p><strong>創建基於角色的策略</strong>給<code>人力資源管理員</code>:</p>
<ul>
<li>前往管理員權限 → 策略選項卡</li>
<li>建立策略 → 基於角色</li>
<li>名稱：《人力資源管理政策》</li>
<li>選擇角色：<code>人力資源管理員</code></li>
</ul>
</li>
<li><p><strong>將策略指派給使用者權限</strong>:</p>
<ul>
<li>使用者→權限<strong>看法。看法</strong>→ 新增策略“HR 管理策略”</li>
<li>使用者→權限<strong>管理</strong>→ 新增策略“HR 管理策略”</li>
</ul>
</li>
<li><p><strong>為使用者指派角色</strong>:</p>
<pre><code>bin/kcadm.sh add-roles -r my-company \
  --uusername hr-manager \
  --rolename hr-admin</code></pre>
</li>
</ol>

<p>現在用戶<code>人力資源經理</code>可以登入管理控制台並且只能看到選單<strong>使用者</strong>.</p>

<h3 id="permission-evaluation"><strong>8.6 權限評估</strong></h3>
<p>您可以使用“評估”選項卡測試權限：</p>
<ol>
<li><p>進入<strong>管理員權限</strong> → <strong>評價</strong></p></li>
<li><p>選擇要測試的使用者或客戶端</p></li>
<li><p>選擇資源類型和權限</p></li>
<li><p>點選<strong>評價</strong>查看結果（允許或拒絕）</p></li>
</ol>

<h2 id="9-dedicated-admin-consoles"><strong>9. 專用領域管理控制台</strong></h2>

<p>Keycloak 允許為每個領域建立單獨的管理員帳戶 - 無需存取主領域：</p>

<h3 id="tao-realm-admin"><strong>9.1 建立領域管理員</strong></h3>
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

<h3 id="realm-management-roles"><strong>9.2 領域管理客戶端角色</strong></h3>
<p>客戶<code>領域管理</code>控制管理員權限的可用角色：</p>
<table>
<thead>
<tr><th>角色</th><th>描述</th></tr>
</thead>
<tbody>
<tr><td>領域管理</td><td>領域的完全管理員存取權限</td></tr>
<tr><td>管理用戶</td><td>管理用戶</td></tr>
<tr><td>查看用戶</td><td>查看用戶</td></tr>
<tr><td>管理客戶</td><td>管理客戶</td></tr>
<tr><td>查看客戶</td><td>查看客戶</td></tr>
<tr><td>管理領域</td><td>管理領域設定</td></tr>
<tr><td>視界</td><td>查看領域設置</td></tr>
<tr><td>管理身分提供者</td><td>管理身分提供者</td></tr>
<tr><td>管理事件</td><td>管理活動</td></tr>
<tr><td>管理授權</td><td>授權管理</td></tr>
<tr><td>冒充</td><td>冒充用戶</td></tr>
<tr><td>查詢用戶</td><td>搜尋用戶</td></tr>
<tr><td>查詢群組</td><td>搜尋群組</td></tr>
<tr><td>查詢客戶端</td><td>尋找客戶</td></tr>
<tr><td>查詢領域</td><td>搜尋領域</td></tr>
</tbody>
</table>

<p><strong>例如：建立一個僅管理使用者和群組的受限管理員：</strong></p>
<pre><code>bin/kcadm.sh add-roles -r my-company \
  --uusername limited-admin \
  --cclientid realm-management \
  --rolename manage-users \
  --rolename view-users \
  --rolename query-users \
  --rolename query-groups</code></pre>

<h2 id="10-roles-trong-ung-dung"><strong>10. 在應用程式中使用角色</strong></h2>

<h3 id="kiem-tra-role-tu-token"><strong>10.1 從訪問令牌檢查角色</strong></h3>
<p>解碼後的存取權杖包含角色：</p>
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

<h3 id="spring-boot-example"><strong>10.2 Spring引導範例</strong></h3>
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

<h3 id="nodejs-example"><strong>10.3 Node.js (Express) 中的範例</strong></h3>
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

<h2 id="11-thuc-hanh"><strong>11.練習練習</strong></h2>

<ol>
<li><p><strong>創建領域角色</strong>: <code>超管理員</code>, <code>主管</code>, <code>職員</code>, <code>觀眾。觀眾</code></p></li>
<li><p><strong>創建客戶角色</strong>為客戶<code>我的網頁應用程式</code>: <code>內容編輯器</code>, <code>內容審閱者</code>, <code>內容發佈者</code></p></li>
<li><p><strong>創建複合角色</strong>:</p>
<ul>
<li><code>超管理員</code>包含：<code>主管</code>+ 所有客戶角色</li>
<li><code>主管</code>包含：<code>職員</code> + <code>內容審閱者</code></li>
<li><code>職員</code>包含：<code>觀眾。觀眾</code> + <code>內容編輯器</code></li>
</ul>
</li>
<li><p><strong>將角色指派給群組</strong>:</p>
<ul>
<li>團體<code>工程</code>: 領域角色<code>職員</code></li>
<li>團體<code>工程/後端</code>：客戶角色<code>內容編輯器</code></li>
</ul>
</li>
<li><p><strong>啟用細粒度管理員權限V2</strong>並創建：</p>
<ul>
<li>基於角色的策略<code>人力資源管理員</code></li>
<li>將策略指派給使用者檢視/管理權限</li>
<li>使用具有角色的使用者進行測試<code>人力資源管理員</code></li>
</ul>
</li>
<li><p><strong>建立服務帳戶</strong>為客戶<code>我的後端服務</code>有角色<code>管理用戶</code>, <code>查看用戶</code>並使用客戶端憑證授予進行測試</p></li>
</ol>

<h2 id="12-tong-ket"><strong>12. 總結</strong></h2>

<p>在本課中，您學習了：</p>
<ul>
<li><p>區分<strong>領域角色</strong>和<strong>客戶角色</strong></p></li>
<li><p>創造<strong>複合角色</strong>具有分散的層次結構</p></li>
<li><p><strong>角色映射</strong>對於使用者和群組（直接和舊）</p></li>
<li><p>配置<strong>預設角色</strong>對於新用戶</p></li>
<li><p>使用<strong>服務帳號角色</strong>用於機器對機器通信</p></li>
<li><p><strong>細粒度管理員權限V2</strong>具有策略（基於角色、基於使用者、基於群組、基於客戶端）</p></li>
<li><p>創造<strong>專用領域管理員</strong>具有有限的權限</p></li>
<li><p>檢查應用程式中的角色（Spring Boot、Node.js）</p></li>
</ul>

<p>下一篇文章將提供說明<strong>客戶端、客戶端範圍和 OpenID Connect</strong>在鑰匙斗篷裡。</p>
