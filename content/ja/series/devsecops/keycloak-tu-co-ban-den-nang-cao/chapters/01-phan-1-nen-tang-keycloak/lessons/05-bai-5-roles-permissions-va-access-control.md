---
id: 019d8b30-b105-7001-c001-e0c5f8100105
title: 'レッスン 5: 役割、権限、およびアクセス制御'
slug: bai-5-roles-permissions-va-access-control
description: レルム ロール、クライアント ロール、複合ロール、ユーザーとグループのロール マッピング、デフォルト ロール、サービス アカウント ロール。詳細な管理権限 V2、レルム管理委任、リソース固有の権限、ポリシー、権限評価。
duration_minutes: 150
is_free: true
video_url: null
sort_order: 5
section_title: 'パート 1: Keycloak プラットフォーム'
course:
  id: 019d8b30-b100-7001-c001-e0c5f8100001
  title: 基本から上級までの Keycloak
  slug: keycloak-tu-co-ban-den-nang-cao
locale: ja
---
<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/03/keycloak-rbac-permissions-2026.webp" alt="Keycloak RBAC & Fine-grained Permissions" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>KeycloakのRBACおよびファイングレイン管理者権限V2モデル</em></p>
</div>

<h2 id="1-tong-quan-roles"><strong>1. Keycloakの役割の概要</strong></h2>

<p>Keycloak のロールは、アクセスを分散化するための主要なメカニズムです。アプリケーションは、ユーザーのロールを (トークン内のクレームを通じて) チェックして、ユーザーに何が許可されているかを決定します。 Keycloakは2種類のロールをサポートしています。<strong>レルムの役割</strong>そして<strong>クライアントの役割</strong>.</p>

<h3 id="realm-roles-vs-client-roles"><strong>レルムの役割とクライアントの役割</strong></h3>
<table>
<thead>
<tr><th>特性</th><th>レルムの役割</th><th>クライアントの役割</th></tr>
</thead>
<tbody>
<tr><td>範囲</td><td>領域全体</td><td>特定のクライアントのみ</td></tr>
<tr><td>ユースケース</td><td>一般的な役割 (管理者、ユーザー、マネージャー)</td><td>アプリケーション固有の役割 (編集者、閲覧者)</td></tr>
<tr><td>名前空間</td><td>レルム内でユニーク</td><td>クライアント内で一意</td></tr>
<tr><td>トークンの請求</td><td><code>realm_access.roles</code></td><td><code>resource_access.{client}.roles</code></td></tr>
</tbody>
</table>

<h2 id="2-realm-roles"><strong>2. レルムの役割</strong></h2>

<h3 id="realm-roles-mac-dinh"><strong>2.1 デフォルトのレルムの役割</strong></h3>
<p>Keycloak では、次のような多数のレルム ロールが利用可能になります。</p>
<ul>
<li><p><strong>デフォルトの役割-{レルム}</strong>— 複合ロールには、新規ユーザーのデフォルトのロールが含まれています</p></li>
<li><p><strong>オフラインアクセス</strong>— オフライン トークンを取得できます (長期トークン更新)。</p></li>
<li><p><strong>uma_authorization</strong>— UMA (ユーザー管理アクセス) の使用を許可します。</p></li>
</ul>

<h3 id="tao-realm-role"><strong>2.2 レルムロールの作成</strong></h3>

<p><strong>管理コンソール経由:</strong></p>
<ol>
<li><p>クリック<strong>レルムの役割</strong>サイドバーにある</p></li>
<li><p>クリック<strong>ロールの作成</strong></p></li>
<li><p>入力：</p>
<ul>
<li><strong>役割名</strong>: <code>管理者。管理者</code></li>
<li><strong>説明</strong>: <code>完全な管理者アクセス</code></li>
</ul>
</li>
<li><p>クリック<strong>保存</strong></p></li>
</ol>

<p><strong>管理者 CLI 経由:</strong></p>
<pre><code># Tạo realm roles
bin/kcadm.sh create roles -r my-company -s name=admin -s description="Full administrator access"
bin/kcadm.sh create roles -r my-company -s name=manager -s description="Manager with limited admin access"
bin/kcadm.sh create roles -r my-company -s name=user -s description="Regular user"
bin/kcadm.sh create roles -r my-company -s name=viewer -s description="Read-only access"

# Xem danh sách realm roles
bin/kcadm.sh get roles -r my-company --fields name,description</code></pre>

<p><strong>REST API経由:</strong></p>
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

<h2 id="3-client-roles"><strong>3. クライアントの役割</strong></h2>

<p>クライアント ロールは、アプリケーションに独自のロールが必要な場合に使用されます。たとえば、CMS アプリケーションにはロールがあります。<code>エディタ</code>, <code>著者</code>, <code>査読者</code>HR アプリケーションの役割とは異なります。</p>

<h3 id="tao-client-role"><strong>3.1 クライアントロールの作成</strong></h3>

<p><strong>管理コンソール経由:</strong></p>
<ol>
<li><p>入力<strong>クライアント</strong>→ クライアントを選択 (例:<code>私のウェブアプリ</code>)</p></li>
<li><p>タブ<strong>役割</strong></p></li>
<li><p>クリック<strong>ロールの作成</strong></p></li>
<li><p>名前と説明を入力してください</p></li>
</ol>

<p><strong>CLI 経由:</strong></p>
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

<p><strong>REST API経由:</strong></p>
<pre><code>curl -s -X POST \
  "http://localhost:8080/admin/realms/my-company/clients/$CLIENT_UUID/roles" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "editor",
    "description": "Can create and edit content"
  }'</code></pre>

<h3 id="client-role-trong-token"><strong>3.2 トークンにおけるクライアントの役割</strong></h3>
<p>クライアント ロールはクレームの下のアクセス トークンに表示されます<code>リソースアクセス</code>:</p>
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

<h2 id="4-composite-roles"><strong>4. 複合役割</strong></h2>

<p>複合ロールは、1 つ以上の子ロール (レルム ロールおよび/またはクライアント ロール) を含むロールです。ユーザーに複合ロールが割り当てられると、そのユーザーは自動的にすべての子のロールを持ちます。</p>

<h3 id="tao-composite-role"><strong>4.1 複合ロールの作成</strong></h3>

<p><strong>管理コンソール経由:</strong></p>
<ol>
<li><p>入力<strong>レルムの役割</strong>→ 役割を選択 (例:<code>管理者。管理者</code>)</p></li>
<li><p>タブ<strong>アクション</strong> → <strong>関連する役割を追加する</strong></p></li>
<li><p>追加するロールを選択します (レルム ロールおよび/またはクライアント ロール)</p></li>
<li><p>クリック<strong>割り当てる</strong></p></li>
</ol>

<p><strong>CLI 経由:</strong></p>
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

<p><strong>階層の例:</strong></p>
<pre><code>admin (composite)
├── manager (composite)
│   ├── user (realm role)
│   ├── viewer (realm role)
│   ├── my-web-app/editor (client role)
│   └── my-web-app/reviewer (client role)
├── my-web-app/content-admin (client role)
└── account/manage-account (client role)</code></pre>

<p><strong>注記：</strong>ユーザーにロールが割り当てられるとき<code>管理者。管理者</code>、ユーザーはそれを持ちます<strong>全て</strong>ツリー階層内の役割:<code>管理者。管理者</code>, <code>マネージャー</code>, <code>ユーザー.ユーザー</code>, <code>視聴者。ビューア</code>, <code>エディタ</code>, <code>査読者</code>, <code>コンテンツ管理者</code>, <code>アカウントの管理</code>.</p>

<h3 id="xem-composite-roles"><strong>4.2 「複合ロール」を参照</strong></h3>
<pre><code># Xem roles con của composite role
bin/kcadm.sh get-roles -r my-company --rname admin --effective

# REST API
curl -s -X GET \
  "http://localhost:8080/admin/realms/my-company/roles/admin/composites" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq '.[].name'</code></pre>

<h2 id="5-role-mappings"><strong>5. 役割のマッピング</strong></h2>

<h3 id="gan-role-cho-user"><strong>5.1 ユーザーへの役割の割り当て</strong></h3>

<p><strong>管理コンソール経由:</strong></p>
<ol>
<li><p>入力<strong>ユーザー</strong>→ ユーザーを選択</p></li>
<li><p>タブ<strong>役割のマッピング</strong></p></li>
<li><p>クリック<strong>役割の割り当て</strong></p></li>
<li><p>レルムロールを選択するか、クライアントでフィルターしてクライアントロールを選択します</p></li>
<li><p>クリック<strong>割り当てる</strong></p></li>
</ol>

<p><strong>CLI 経由:</strong></p>
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

<p><strong>REST API経由:</strong></p>
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

<h3 id="gan-role-cho-group"><strong>5.2 グループへの役割の割り当て</strong></h3>
<p>グループに役割を割り当てるときは、<strong>メンバー全員</strong>グループ (およびサブグループ) のメンバーがその役割を継承します。</p>

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

<h3 id="effective-roles"><strong>5.3 効果的な役割</strong></h3>
<p>ユーザーの実効ロール = 直接割り当てられたロール + グループから継承されたロール + 複合ロールからのロール:</p>
<pre><code># Xem effective realm roles
curl -s -X GET \
  "http://localhost:8080/admin/realms/my-company/users/$USER_ID/role-mappings/realm/composite" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq '.[].name'

# Xem effective client roles
curl -s -X GET \
  "http://localhost:8080/admin/realms/my-company/users/$USER_ID/role-mappings/clients/$CLIENT_UUID/composite" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq '.[].name'</code></pre>

<h2 id="6-default-roles"><strong>6. デフォルトの役割</strong></h2>

<p>デフォルトのロールは、アカウントの作成時または登録時にすべての新規ユーザーに自動的に割り当てられます。</p>

<h3 id="cau-hinh-default-roles"><strong>6.1 デフォルトの役割の構成</strong></h3>

<p><strong>管理コンソール経由:</strong></p>
<ol>
<li><p>入力<strong>レルムの役割</strong></p></li>
<li><p>役割を見つける<strong>デフォルトの役割-{レルム}</strong>（例えば：<code>デフォルトの役割 - 私の会社</code>)</p></li>
<li><p>「役割」→「タブ」をクリックします<strong>アクション</strong> → <strong>関連する役割を追加する</strong></p></li>
<li><p>デフォルトとして設定したいロールを選択します</p></li>
</ol>

<p><strong>CLI 経由:</strong></p>
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

<p>その後、新しく作成されたすべてのユーザーに自動的にロールが割り当てられます。<code>ユーザー.ユーザー</code>, <code>オフラインアクセス</code>, <code>私のウェブアプリ/ビューア</code>.</p>

<h2 id="7-service-account-roles"><strong>7. サービスアカウントの役割</strong></h2>

<p>サービス アカウントはサービス間の通信 (マシン間) に使用されます。ユーザーの操作は必要ありません。</p>

<h3 id="bat-service-account"><strong>7.1 クライアントのサービスアカウントを有効にする</strong></h3>
<ol>
<li><p>入力<strong>クライアント</strong>→ クライアントの選択または作成</p></li>
<li><p>タブ<strong>設定</strong>:</p>
<ul>
<li><strong>クライアント認証</strong>： の上</li>
<li><strong>サービスアカウントの役割</strong>： の上</li>
<li><strong>認可</strong>: オフ (認証サービスが必要な場合を除く)</li>
</ul>
</li>
<li><p>クリック<strong>保存</strong></p></li>
</ol>

<h3 id="gan-role-cho-service-account"><strong>7.2 サービスアカウントへの役割の割り当て</strong></h3>
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

<h3 id="su-dung-service-account"><strong>7.3 サービスアカウントの使用</strong></h3>
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

<h2 id="8-fine-grained-admin-permissions"><strong>8. きめ細かい管理者権限 V2</strong></h2>

<p>きめ細かい管理権限 V2 (Keycloak 26 以降) により、生のレルム管理クライアント ロールを使用するだけでなく、管理コンソールで誰がどのリソースを管理できるかをきめ細かく制御できます。</p>

<h3 id="bat-fine-grained-permissions"><strong>8.1 詳細な管理者権限を有効にする</strong></h3>
<ol>
<li><p>入力<strong>レルム設定</strong> → <strong>一般的な</strong></p></li>
<li><p>探す<strong>管理者の権限</strong>→オンにする<strong>きめ細かい管理者権限 (V2)</strong></p></li>
<li><p>Keycloakはレルムに権限管理リソースを作成します</p></li>
</ol>

<p><strong>注記：</strong>これはKeycloak 26.xのプレビュー機能です。運用環境では、有効にする前に慎重に評価する必要があります。</p>

<h3 id="resource-permissions"><strong>8.2 リソースの権限</strong></h3>
<p>有効にすると、リソースの権限を作成できます。</p>

<p><strong>ユーザーの権限:</strong></p>
<table>
<thead>
<tr><th>許可</th><th>説明する</th></tr>
</thead>
<tbody>
<tr><td>ビュー。ビュー</td><td>ユーザーのリストと詳細を表示する</td></tr>
<tr><td>管理</td><td>ユーザーの作成、編集、削除</td></tr>
<tr><td>マップの役割</td><td>ユーザーへの役割の割り当て/削除</td></tr>
<tr><td>グループメンバーシップの管理</td><td>グループへのユーザーの追加/削除</td></tr>
<tr><td>なりすます</td><td>ユーザーになりすます</td></tr>
</tbody>
</table>

<p><strong>グループの権限:</strong></p>
<table>
<thead>
<tr><th>許可</th><th>説明する</th></tr>
</thead>
<tbody>
<tr><td>ビュー。ビュー</td><td>グループを見る</td></tr>
<tr><td>管理</td><td>グループの作成、編集、削除</td></tr>
<tr><td>ビューメンバー</td><td>グループのメンバーを表示</td></tr>
<tr><td>メンバーの管理</td><td>メンバーの追加/削除</td></tr>
<tr><td>メンバーシップの管理</td><td>グループメンバーシップを管理する</td></tr>
</tbody>
</table>

<p><strong>クライアントの権限:</strong></p>
<table>
<thead>
<tr><th>許可</th><th>説明する</th></tr>
</thead>
<tbody>
<tr><td>ビュー。ビュー</td><td>クライアントを見る</td></tr>
<tr><td>管理</td><td>クライアントの作成、編集、削除</td></tr>
<tr><td>構成する</td><td>クライアント設定を変更する</td></tr>
<tr><td>マップの役割</td><td>クライアントロールの作成/割り当て</td></tr>
</tbody>
</table>

<p><strong>役割の権限:</strong></p>
<table>
<thead>
<tr><th>許可</th><th>説明する</th></tr>
</thead>
<tbody>
<tr><td>ビュー。ビュー</td><td>役割を参照</td></tr>
<tr><td>管理</td><td>ロールの作成、編集、削除</td></tr>
<tr><td>マップロール</td><td>ユーザー/グループに役割を割り当てる</td></tr>
</tbody>
</table>

<h3 id="tao-permission"><strong>8.3 権限の作成</strong></h3>
<ol>
<li><p>入力<strong>レルム設定</strong> → <strong>管理者権限</strong></p></li>
<li><p>リソース タイプ (ユーザー、グループ、クライアント、ロール) を選択します。</p></li>
<li><p>構成する必要がある権限をクリックします (例:<strong>管理</strong>ユーザー向け)</p></li>
<li><p>もっと<strong>政策。政策</strong>誰がこの権限を持っているかを判断する</p></li>
</ol>

<h3 id="policies"><strong>8.4 ポリシー</strong></h3>
<p>ポリシーは、アクセス許可を付与するための条件を定義します。 Keycloak V2 は次のポリシーをサポートします。</p>

<p><strong>役割ベースのポリシー:</strong></p>
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

<p><strong>ユーザーベースのポリシー:</strong></p>
<pre><code>// Cho phép specific users
{
  "type": "user",
  "name": "Specific Admin Policy",
  "users": [
    "{user-id-of-admin-1}",
    "{user-id-of-admin-2}"
  ]
}</code></pre>

<p><strong>グループベースのポリシー:</strong></p>
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

<p><strong>クライアントベースのポリシー:</strong></p>
<pre><code>// Cho phép specific clients (service accounts)
{
  "type": "client",
  "name": "Backend Service Policy",
  "clients": [
    "{client-id-of-backend-service}"
  ]
}</code></pre>

<h3 id="vi-du-thuc-te"><strong>8.5 実践例: 人事管理者はユーザーのみを管理する</strong></h3>
<p>要件: ユーザーにはロールがある<code>hr-管理者</code>ユーザーの表示と管理のみが許可され、クライアントやレルム設定の管理は許可されません。</p>

<ol>
<li><p><strong>レルムロールの作成</strong> <code>hr-管理者</code>:</p>
<pre><code>bin/kcadm.sh create roles -r my-company \
  -s name=hr-admin \
  -s description="HR Administrator - can manage users only"</code></pre>
</li>
<li><p><strong>きめ細かい管理者権限 V2 を有効にする</strong></p></li>
<li><p><strong>ロールベースのポリシーの作成</strong>与える<code>hr-管理者</code>:</p>
<ul>
<li>「管理者権限」→「ポリシー」タブに移動します。</li>
<li>ポリシーの作成 → ロールベース</li>
<li>名前: 「人事管理ポリシー」</li>
<li>役割を選択してください:<code>hr-管理者</code></li>
</ul>
</li>
<li><p><strong>ユーザー権限にポリシーを割り当てる</strong>:</p>
<ul>
<li>ユーザー → 許可<strong>ビュー。ビュー</strong>→ ポリシー「人事管理ポリシー」を追加</li>
<li>ユーザー → 許可<strong>管理</strong>→ ポリシー「人事管理ポリシー」を追加</li>
</ul>
</li>
<li><p><strong>ユーザーに役割を割り当てる</strong>:</p>
<pre><code>bin/kcadm.sh add-roles -r my-company \
  --uusername hr-manager \
  --rolename hr-admin</code></pre>
</li>
</ol>

<p>現在のユーザー<code>人事マネージャー</code>管理コンソールにログインしてメニューのみを表示できます<strong>ユーザー</strong>.</p>

<h3 id="permission-evaluation"><strong>8.6 許可の評価</strong></h3>
<p>[評価] タブを使用して権限をテストできます。</p>
<ol>
<li><p>入力<strong>管理者権限</strong> → <strong>評価する</strong></p></li>
<li><p>テストするユーザーまたはクライアントを選択します</p></li>
<li><p>リソースの種類と権限を選択します</p></li>
<li><p>クリック<strong>評価する</strong>結果を確認するには (許可または拒否)</p></li>
</ol>

<h2 id="9-dedicated-admin-consoles"><strong>9. 専用レルム管理コンソール</strong></h2>

<p>Keycloak を使用すると、レルムごとに個別の管理者アカウントを作成できます。マスター レルムにアクセスする必要はありません。</p>

<h3 id="tao-realm-admin"><strong>9.1 レルム管理者の作成</strong></h3>
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

<h3 id="realm-management-roles"><strong>9.2 レルム管理クライアントの役割</strong></h3>
<p>クライアント<code>レルム管理</code>管理者権限を制御するために利用可能な役割:</p>
<table>
<thead>
<tr><th>役割</th><th>説明する</th></tr>
</thead>
<tbody>
<tr><td>レルム管理者</td><td>レルムの完全な管理者アクセス</td></tr>
<tr><td>ユーザーの管理</td><td>ユーザーを管理する</td></tr>
<tr><td>ユーザーの表示</td><td>ユーザーを見る</td></tr>
<tr><td>クライアントの管理</td><td>クライアントの管理</td></tr>
<tr><td>ビュークライアント</td><td>クライアントを見る</td></tr>
<tr><td>レルムの管理</td><td>レルム設定を管理する</td></tr>
<tr><td>ビューレルム</td><td>レルム設定を参照</td></tr>
<tr><td>アイデンティティプロバイダーの管理</td><td>ID プロバイダーの管理</td></tr>
<tr><td>イベントの管理</td><td>イベントの管理</td></tr>
<tr><td>管理-認可</td><td>認可管理</td></tr>
<tr><td>なりすまし</td><td>ユーザーになりすます</td></tr>
<tr><td>クエリユーザー</td><td>ユーザーを検索する</td></tr>
<tr><td>クエリグループ</td><td>グループを検索する</td></tr>
<tr><td>クエリクライアント</td><td>クライアントを検索する</td></tr>
<tr><td>クエリレルム</td><td>レルムの検索</td></tr>
</tbody>
</table>

<p><strong>例: ユーザーとグループのみを管理する制限付き管理者を作成します。</strong></p>
<pre><code>bin/kcadm.sh add-roles -r my-company \
  --uusername limited-admin \
  --cclientid realm-management \
  --rolename manage-users \
  --rolename view-users \
  --rolename query-users \
  --rolename query-groups</code></pre>

<h2 id="10-roles-trong-ung-dung"><strong>10. アプリケーションでロールを使用する</strong></h2>

<h3 id="kiem-tra-role-tu-token"><strong>10.1 アクセストークンからロールを確認する</strong></h3>
<p>デコードされたアクセス トークンには次の役割が含まれています。</p>
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

<h3 id="spring-boot-example"><strong>10.2 Spring Boot の例</strong></h3>
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

<h3 id="nodejs-example"><strong>10.3 Node.jsの例(Express)</strong></h3>
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

<h2 id="11-thuc-hanh"><strong>11. 練習問題</strong></h2>

<ol>
<li><p><strong>レルムロールの作成</strong>: <code>スーパー管理者</code>, <code>マネージャー</code>, <code>スタッフ</code>, <code>視聴者。ビューア</code></p></li>
<li><p><strong>クライアントロールの作成</strong>クライアントのために<code>私のウェブアプリ</code>: <code>コンテンツエディター</code>, <code>コンテンツレビュアー</code>, <code>コンテンツ発行者</code></p></li>
<li><p><strong>複合ロールの作成</strong>:</p>
<ul>
<li><code>スーパー管理者</code>含む：<code>マネージャー</code>+ すべてのクライアントの役割</li>
<li><code>マネージャー</code>含む：<code>スタッフ</code> + <code>コンテンツレビュアー</code></li>
<li><code>スタッフ</code>含む：<code>視聴者。ビューア</code> + <code>コンテンツエディター</code></li>
</ul>
</li>
<li><p><strong>グループに役割を割り当てる</strong>:</p>
<ul>
<li>グループ<code>エンジニアリング</code>: レルムの役割<code>スタッフ</code></li>
<li>グループ<code>エンジニアリング/バックエンド</code>: クライアントの役割<code>コンテンツエディター</code></li>
</ul>
</li>
<li><p><strong>きめ細かい管理者権限 V2 を有効にする</strong>そして以下を作成します:</p>
<ul>
<li>ロールベースのポリシー<code>hr-管理者</code></li>
<li>ユーザーの表示/管理権限にポリシーを割り当てる</li>
<li>ロールを持つユーザーでテストする<code>hr-管理者</code></li>
</ul>
</li>
<li><p><strong>サービスアカウントの作成</strong>クライアントのために<code>私のバックエンドサービス</code>役割付き<code>ユーザーの管理</code>, <code>ユーザーの表示</code>クライアント資格情報の付与を使用してテストします</p></li>
</ol>

<h2 id="12-tong-ket"><strong>12. まとめ</strong></h2>

<p>このレッスンでは、次のことを学びました。</p>
<ul>
<li><p>区別する<strong>レルムの役割</strong>そして<strong>クライアントの役割</strong></p></li>
<li><p>作成する<strong>複合役割</strong>分散型階層構造</p></li>
<li><p><strong>役割のマッピング</strong>ユーザーおよびグループ向け (直接およびレガシー)</p></li>
<li><p>構成<strong>デフォルトの役割</strong>新規ユーザー向け</p></li>
<li><p>使用<strong>サービスアカウントの役割</strong>マシンツーマシン通信用</p></li>
<li><p><strong>きめ細かい管理者権限 V2</strong>ポリシー付き (ロールベース、ユーザーベース、グループベース、クライアントベース)</p></li>
<li><p>作成する<strong>専用レルム管理者</strong>制限された権限で</p></li>
<li><p>アプリケーション内のロールを確認する (Spring Boot、Node.js)</p></li>
</ul>

<p>次の記事で手順を説明します<strong>クライアント、クライアント スコープ、および OpenID Connect</strong>キークロークで。</p>
