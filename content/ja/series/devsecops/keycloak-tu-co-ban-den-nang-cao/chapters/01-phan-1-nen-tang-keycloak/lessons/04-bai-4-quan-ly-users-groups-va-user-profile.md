---
id: 019d8b30-b104-7001-c001-e0c5f8100104
title: 'レッスン 4: ユーザー、グループ、およびユーザー プロファイルの管理'
slug: bai-4-quan-ly-users-groups-va-user-profile
description: ユーザーの作成と管理、認証情報の設定、ユーザー属性スキーマ、ユーザー プロファイル構成、カスタム属性とバリデーター、グループとサブグループの作成、グループ属性、グループ ロール マッピング、ユーザーの自己登録、必要なアクション、偽装と個人データの管理。
duration_minutes: 150
is_free: true
video_url: null
sort_order: 4
section_title: 'パート 1: Keycloak プラットフォーム'
course:
  id: 019d8b30-b100-7001-c001-e0c5f8100001
  title: 基本から上級までの Keycloak
  slug: keycloak-tu-co-ban-den-nang-cao
locale: ja
---
<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/03/keycloak-users-groups-roles-2026.webp" alt="Keycloak Users, Groups, Roles Hierarchy" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Keycloakレルムのユーザー、グループ、ロールの階層モデル</em></p>
</div>

<h2 id="1-quan-ly-users"><strong>1. ユーザーの管理</strong></h2>

<p>ユーザーはKeycloakの中心的なエンティティであり、システムにログインできるユーザーを表します。各ユーザーは特定のレルムに属し、属性、資格情報、ロール、グループ メンバーシップを持つことができます。</p>

<h3 id="tao-user-qua-admin-console"><strong>1.1 管理コンソールからユーザーを作成する</strong></h3>
<ol>
<li><p>レルムを選択します (例:<code>私の会社</code>) レルムセレクターから</p></li>
<li><p>クリック<strong>ユーザー</strong>サイドバーにある</p></li>
<li><p>クリック<strong>ユーザーを追加する</strong></p></li>
<li><p>情報を入力してください:</p>
<ul>
<li><strong>ユーザー名</strong>: <code>ジョン・ドゥ</code>(必須)</li>
<li><strong>電子メール</strong>: <code>john.doe@mycompany.com</code></li>
<li><strong>ファーストネーム</strong>: <code>ジョン</code></li>
<li><strong>苗字</strong>: <code>ドウ</code></li>
<li><strong>メール認証済み</strong>：ON（メール認証済みの場合）</li>
<li><strong>有効</strong>： の上</li>
</ul>
</li>
<li><p>クリック<strong>作成する</strong></p></li>
</ol>

<h3 id="tao-user-qua-cli"><strong>1.2 管理 CLI によるユーザーの作成</strong></h3>
<pre><code># Tạo user cơ bản
bin/kcadm.sh create users \
  -r my-company \
  -s username=john.doe \
  -s email=john.doe@mycompany.com \
  -s firstName=John \
  -s lastName=Doe \
  -s enabled=true \
  -s emailVerified=true

# Lấy user ID vừa tạo
USER_ID=$(bin/kcadm.sh get users -r my-company -q username=john.doe --fields id --format csv --noquotes)

echo "User ID: $USER_ID"</code></pre>

<h3 id="tao-user-qua-api"><strong>1.3 REST API経由でユーザーを作成する</strong></h3>
<pre><code># Tạo user mới
curl -s -X POST \
  "http://localhost:8080/admin/realms/my-company/users" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john.doe",
    "email": "john.doe@mycompany.com",
    "firstName": "John",
    "lastName": "Doe",
    "enabled": true,
    "emailVerified": true,
    "attributes": {
      "department": ["Engineering"],
      "employee_id": ["EMP001"]
    }
  }'

# Lấy user ID từ response header Location
# Location: http://localhost:8080/admin/realms/my-company/users/{user-id}</code></pre>

<h2 id="2-thiet-lap-credentials"><strong>2. 資格情報を設定する</strong></h2>

<h3 id="dat-mat-khau-qua-admin-console"><strong>2.1 管理コンソールからパスワードを設定する</strong></h3>
<ol>
<li><p>入力<strong>ユーザー</strong>→ ユーザーを選択 → タブ<strong>資格</strong></p></li>
<li><p>クリック<strong>パスワードを設定する</strong></p></li>
<li><p>新しいパスワードを入力してください</p></li>
<li><p><strong>一時的</strong>：ON（初回ログイン時にパスワード変更が必要）またはOFF（パスワード固定）</p></li>
<li><p>クリック<strong>保存</strong></p></li>
</ol>

<h3 id="dat-mat-khau-qua-cli"><strong>2.2 CLI 経由でパスワードを設定する</strong></h3>
<pre><code># Đặt password cố định
bin/kcadm.sh set-password \
  -r my-company \
  --username john.doe \
  --new-password "SecureP@ssw0rd!"

# Đặt password tạm thời (bắt đổi khi login)
bin/kcadm.sh set-password \
  -r my-company \
  --username john.doe \
  --new-password "TempP@ss123" \
  --temporary</code></pre>

<h3 id="dat-mat-khau-qua-api"><strong>2.3 REST API経由でパスワードを設定する</strong></h3>
<pre><code># Lấy user ID
USER_ID=$(curl -s -X GET \
  "http://localhost:8080/admin/realms/my-company/users?username=john.doe" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq -r '.[0].id')

# Đặt password
curl -s -X PUT \
  "http://localhost:8080/admin/realms/my-company/users/$USER_ID/reset-password" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "password",
    "value": "SecureP@ssw0rd!",
    "temporary": false
  }'</code></pre>

<h3 id="password-policies"><strong>2.4 パスワードポリシー</strong></h3>
<p>レルムのパスワード ポリシーを構成します。<strong>認証</strong> → <strong>ポリシー</strong> → <strong>パスワードポリシー</strong>:</p>
<table>
<thead>
<tr><th>ポリシー</th><th>説明する</th><th>値の例</th></tr>
</thead>
<tbody>
<tr><td>最小長さ</td><td>最小長さ</td><td>8</td></tr>
<tr><td>大文字</td><td>大文字が必要です</td><td>1</td></tr>
<tr><td>小文字</td><td>小文字が必要です</td><td>1</td></tr>
<tr><td>数字</td><td>リクエスト番号</td><td>1</td></tr>
<tr><td>特殊文字</td><td>特殊文字が必要です</td><td>1</td></tr>
<tr><td>ユーザー名ではありません</td><td>パスワードはユーザー名と同じであってはなりません</td><td>-</td></tr>
<tr><td>電子メールではありません</td><td>パスワードはメールアドレスと一致してはなりません</td><td>-</td></tr>
<tr><td>パスワード履歴</td><td>古いパスワードを再利用しないでください</td><td>3</td></tr>
<tr><td>パスワードの有効期限が切れる</td><td>パスワードの有効期限 (日)</td><td>90</td></tr>
<tr><td>ハッシュアルゴリズム</td><td>アルゴリズムハッシュパスワード</td><td>アルゴン2</td></tr>
<tr><td>ハッシュ反復</td><td>ハッシュラウンド数</td><td>5 (アルゴン2)</td></tr>
</tbody>
</table>

<p>CLI による設定:</p>
<pre><code>bin/kcadm.sh update realms/my-company \
  -s 'passwordPolicy="length(8) and upperCase(1) and lowerCase(1) and digits(1) and specialChars(1) and notUsername and passwordHistory(3)"'</code></pre>

<h2 id="3-user-profile"><strong>3. ユーザープロフィール</strong></h2>

<p><strong>ユーザープロフィール</strong>は、管理者がユーザー属性のスキーマを定義できる機能で、ユーザーが持つ属性、検証方法、インターフェイス上での表示方法を制御できます。</p>

<h3 id="bat-user-profile"><strong>3.1 ユーザープロファイルの有効化</strong></h3>
<p>Keycloak 24以降では、ユーザープロファイルがデフォルトで有効になっています。古いバージョンの場合:</p>
<ol>
<li><p>入力<strong>レルム設定</strong> → <strong>一般的な</strong></p></li>
<li><p>探す<strong>ユーザープロファイルが有効になっています</strong>： の上</p></li>
</ol>

<p>有効にしたら、アクセスします<strong>レルム設定</strong> → <strong>ユーザープロフィール</strong>設定します。</p>

<h3 id="attribute-schema"><strong>3.2 属性スキーマの定義</strong></h3>
<p>各属性には次の構成があります。</p>
<ul>
<li><p><strong>名前</strong>— 属性名 (小文字、API に使用)</p></li>
<li><p><strong>表示名</strong>— UI 表示名 (i18n サポート:<code>${プロフィール.属性.部門}</code>)</p></li>
<li><p><strong>権限</strong>— 閲覧/編集できる人 (管理者、ユーザー)</p></li>
<li><p><strong>検証</strong>— 値の検証ルール</p></li>
<li><p><strong>注釈</strong>— UI レンダリングのメタデータ</p></li>
<li><p><strong>必須</strong>— ユーザー、管理者、またはその両方に必要</p></li>
<li><p><strong>多値</strong>— 複数の値を許可します</p></li>
</ul>

<h3 id="built-in-attributes"><strong>3.3 組み込み属性</strong></h3>
<p>Keycloak には使用可能な属性があります。</p>
<table>
<thead>
<tr><th>属性</th><th>説明する</th><th>デフォルト</th></tr>
</thead>
<tbody>
<tr><td>ユーザー名。ユーザー名</td><td>ログイン名</td><td>必須、固有</td></tr>
<tr><td>電子メール</td><td>電子メールアドレス</td><td>必須（オフにすることもできます）</td></tr>
<tr><td>ファーストネーム</td><td>名前</td><td>必須</td></tr>
<tr><td>苗字</td><td>姓</td><td>必須</td></tr>
</tbody>
</table>

<h3 id="tao-custom-attribute"><strong>3.4 カスタム属性の作成</strong></h3>
<p>属性の作成例<code>電話番号</code>:</p>
<ol>
<li><p>入力<strong>レルム設定</strong> → <strong>ユーザープロフィール</strong></p></li>
<li><p>クリック<strong>属性の作成</strong></p></li>
<li><p>構成：</p>
<ul>
<li><strong>名前</strong>: <code>電話番号</code></li>
<li><strong>表示名</strong>: <code>電話番号</code></li>
<li><strong>属性グループ</strong>: (選択または新規作成)</li>
<li><strong>次の場合に有効になります</strong>：いつも</li>
<li><strong>必須</strong>: ユーザーに必須</li>
</ul>
</li>
</ol>

<h3 id="validators"><strong>3.5 バリデーター</strong></h3>
<p>Keycloakは、属性値をチェックするための多くのバリデーターを提供します。</p>
<table>
<thead>
<tr><th>バリデーター</th><th>説明する</th><th>構成例</th></tr>
</thead>
<tbody>
<tr><td>長さ。長さ</td><td>長さ制限</td><td>最小: 3、最大: 50</td></tr>
<tr><td>電子メール</td><td>メール形式を確認する</td><td>-</td></tr>
<tr><td>パターン。パターン</td><td>正規表現パターンを確認する</td><td>^\\+[0-9]{10,15}$</td></tr>
<tr><td>整数</td><td>整数をチェックする</td><td>最小: 0、最大: 999999</td></tr>
<tr><td>ダブル</td><td>実数を確認する</td><td>最小: 0.0、最大: 100.0</td></tr>
<tr><td>ウリ</td><td>有効な URL を確認する</td><td>-</td></tr>
<tr><td>オプション</td><td>リスト内の制限値</td><td>["vn","us","jp"]</td></tr>
<tr><td>人名禁止文字</td><td>名前内の特殊文字をブロックする</td><td>-</td></tr>
<tr><td>ユーザー名の禁止文字</td><td>ユーザー名内の特殊文字をブロックする</td><td>-</td></tr>
<tr><td>多値</td><td>値の数を検証する</td><td>最小: 1、最大: 5</td></tr>
</tbody>
</table>

<p>属性の設定例<code>電話番号</code>JSON 経由 ([ユーザー プロファイル] タブ → JSON エディター):</p>
<pre><code>{
  "attributes": [
    {
      "name": "phone_number",
      "displayName": "Phone Number",
      "validations": {
        "length": {
          "min": 10,
          "max": 15
        },
        "pattern": {
          "pattern": "^\\+[0-9]{10,15}$",
          "error-message": "Phone number must start with + and contain 10-15 digits"
        }
      },
      "required": {
        "roles": ["user"]
      },
      "permissions": {
        "view": ["admin", "user"],
        "edit": ["admin", "user"]
      },
      "annotations": {
        "inputType": "tel",
        "inputHelperTextBefore": "Enter your phone number with country code (e.g., +84901234567)"
      }
    }
  ]
}</code></pre>

<h3 id="annotations-cho-ui"><strong>3.6 UI レンダリングの注釈</strong></h3>
<p>注釈を使用すると、登録/アカウント ページでの属性の表示方法をカスタマイズできます。</p>
<table>
<thead>
<tr><th>注釈</th><th>説明する</th><th>価値</th></tr>
</thead>
<tbody>
<tr><td>入力タイプ</td><td>HTML入力タイプ</td><td>テキスト、電子メール、電話番号、番号、日付、選択、複数選択、テキストエリア、html5-*</td></tr>
<tr><td>inputHelperTextBefore</td><td>入力の前にヘルパー テキストが表示されます</td><td>テキスト文字列</td></tr>
<tr><td>inputHelperTextAfter</td><td>入力後にヘルパーテキストが表示される</td><td>テキスト文字列</td></tr>
<tr><td>inputOptionsFromValidation</td><td>バリデーターからオプションを取得する</td><td>検証名 (例: 「オプション」)</td></tr>
</tbody>
</table>

<h3 id="progressive-profiling"><strong>3.7 プログレッシブプロファイリング</strong></h3>
<p>プログレッシブ プロファイリングを使用すると、登録時にすべての情報を要求するのではなく、段階的にユーザー情報を収集できます。</p>
<ol>
<li><p>属性を作成する<strong>必須</strong> → <strong>ユーザーに必須</strong>： の上</p></li>
<li><p>ユーザーがログインするときに、属性に値がない場合、Keycloakは入力を求めるフォームを表示します。</p></li>
<li><p>と組み合わせる<strong>「いつ有効になるか」スコープ</strong>— クライアントが特定のスコープを要求する場合にのみ属性が必要です</p></li>
</ol>

<p>例: 属性<code>電話番号</code>クライアントがスコープを要求した場合にのみ必要です<code>電話。電話</code>:</p>
<pre><code>{
  "name": "phone_number",
  "required": {
    "roles": ["user"],
    "scopes": ["phone"]
  }
}</code></pre>

<h2 id="4-groups"><strong>4. グループとサブグループ</strong></h2>

<p>グループは、各ユーザーを個別に割り当てるのではなく、ユーザーを整理し、ユーザーのグループに一度にロールと属性を適用するのに役立ちます。</p>

<h3 id="tao-group-qua-admin-console"><strong>4.1 管理コンソールからグループを作成する</strong></h3>
<ol>
<li><p>クリック<strong>グループ</strong>サイドバーにある</p></li>
<li><p>クリック<strong>グループの作成</strong></p></li>
<li><p>入力<strong>名前</strong>: <code>エンジニアリング</code></p></li>
<li><p>クリック<strong>作成する</strong></p></li>
</ol>

<h3 id="tao-sub-group"><strong>4.2 サブグループの作成</strong></h3>
<p>サブグループは、親グループから属性と役割のマッピングを継承します。</p>
<ol>
<li><p>グループをクリックします<code>エンジニアリング</code></p></li>
<li><p>クリック<strong>サブグループの作成</strong></p></li>
<li><p>名前を入力してください:<code>バックエンド</code>, <code>フロントエンド</code>, <code>DevOps</code></p></li>
</ol>

<p>グループ構造の例:</p>
<pre><code>Engineering/
├── Backend/
│   ├── Java Team
│   └── Go Team
├── Frontend/
│   ├── Web Team
│   └── Mobile Team
└── DevOps/
    ├── SRE
    └── Platform

Operations/
├── HR
├── Finance
└── Legal</code></pre>

<h3 id="tao-group-qua-cli"><strong>4.3 CLI 経由でグループを作成する</strong></h3>
<pre><code># Tạo top-level group
bin/kcadm.sh create groups -r my-company -s name="Engineering"

# Lấy group ID
GROUP_ID=$(bin/kcadm.sh get groups -r my-company --fields id,name | jq -r '.[] | select(.name=="Engineering") | .id')

# Tạo sub-group
bin/kcadm.sh create groups/$GROUP_ID/children -r my-company -s name="Backend"
bin/kcadm.sh create groups/$GROUP_ID/children -r my-company -s name="Frontend"
bin/kcadm.sh create groups/$GROUP_ID/children -r my-company -s name="DevOps"</code></pre>

<h3 id="group-attributes"><strong>4.4 グループ属性</strong></h3>
<p>グループにはキーと値の属性を含めることができます。メタデータやグループ構成に役立ちます。</p>
<pre><code># Thêm attributes cho group
bin/kcadm.sh update groups/$GROUP_ID -r my-company \
  -s 'attributes={"cost_center":["CC-ENG-001"],"location":["HCM","HN"]}'</code></pre>

<p>管理コンソール経由: [グループ] → [タブ] をクリックします。<strong>属性</strong>→ キーと値のペアを追加します。</p>

<h3 id="them-user-vao-group"><strong>4.5 ユーザーをグループに追加する</strong></h3>
<pre><code># Qua Admin Console:
# Users → chọn user → tab Groups → Join group → chọn group

# Qua CLI
USER_ID=$(bin/kcadm.sh get users -r my-company -q username=john.doe --fields id --format csv --noquotes)
bin/kcadm.sh update users/$USER_ID/groups/$GROUP_ID -r my-company -s realm=my-company -s userId=$USER_ID -s groupId=$GROUP_ID -n

# Qua REST API
curl -s -X PUT \
  "http://localhost:8080/admin/realms/my-company/users/$USER_ID/groups/$GROUP_ID" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json"</code></pre>

<h3 id="default-groups"><strong>4.6 デフォルトのグループ</strong></h3>
<p>デフォルト グループは、アカウントの作成時または登録時に新しいユーザーを自動的に追加します。</p>
<ol>
<li><p>入力<strong>グループ</strong></p></li>
<li><p>デフォルトとして設定するグループを選択します</p></li>
<li><p>あるいは入ってください<strong>レルム設定</strong> → <strong>ユーザー登録</strong> → <strong>デフォルトのグループ</strong></p></li>
</ol>

<pre><code># Qua CLI
bin/kcadm.sh update realms/my-company -s 'defaultGroups=["/Engineering/Backend"]'</code></pre>

<h2 id="5-required-actions"><strong>5. 必要なアクション</strong></h2>

<p>必須アクションは、正常にログインできるようになる前にユーザーが実行する必要があるアクションです。</p>

<h3 id="danh-sach-required-actions"><strong>5.1 利用可能な必須アクションのリスト</strong></h3>
<table>
<thead>
<tr><th>アクション</th><th>説明する</th></tr>
</thead>
<tbody>
<tr><td>パスワードを更新する</td><td>パスワードの変更が必要です</td></tr>
<tr><td>メールの確認</td><td>メール認証</td></tr>
<tr><td>OTPの構成</td><td>OTP（TOTP/HOTP）の設定</td></tr>
<tr><td>プロフィールを更新する</td><td>個人情報を更新する</td></tr>
<tr><td>利用規約</td><td>利用規約に同意する</td></tr>
<tr><td>Web認証の構成</td><td>WebAuthnデバイスの登録</td></tr>
<tr><td>ユーザーロケールの更新</td><td>言語を選択してください</td></tr>
<tr><td>認証情報の削除</td><td>古い認証情報を削除する</td></tr>
</tbody>
</table>

<h3 id="gan-required-action-cho-user"><strong>5.2 必要なアクションをユーザーに割り当てる</strong></h3>
<pre><code># Qua Admin Console:
# Users → chọn user → tab Details → Required user actions → chọn actions

# Qua CLI
bin/kcadm.sh update users/$USER_ID -r my-company \
  -s 'requiredActions=["UPDATE_PASSWORD","VERIFY_EMAIL","CONFIGURE_TOTP"]'

# Qua REST API
curl -s -X PUT \
  "http://localhost:8080/admin/realms/my-company/users/$USER_ID" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "requiredActions": ["UPDATE_PASSWORD", "VERIFY_EMAIL"]
  }'</code></pre>

<h3 id="default-required-actions"><strong>5.3 デフォルトの必須アクション</strong></h3>
<p>すべての新規ユーザーに対してデフォルトで必要なアクションを次の場所で構成します。<strong>認証</strong> → <strong>必要なアクション</strong>:</p>
<ul>
<li><p>列をオンにする<strong>デフォルトのアクションとして設定</strong>望ましいアクションのために</p></li>
<li><p>すべての新規ユーザーにはデフォルトのアクションが自動的に割り当てられます</p></li>
</ul>

<h2 id="6-user-self-registration"><strong>6. ユーザーの自己登録</strong></h2>

<h3 id="bat-self-registration"><strong>6.1 自己登録を有効にする</strong></h3>
<ol>
<li><p>入力<strong>レルム設定</strong> → <strong>ログイン</strong></p></li>
<li><p>オンにする<strong>ユーザー登録</strong>： の上</p></li>
<li><p>ログインページに「登録」リンクが表示されます</p></li>
</ol>

<h3 id="recaptcha"><strong>6.2 登録用の reCAPTCHA</strong></h3>
<p>登録フォームをボットから保護するには、reCAPTCHA を有効にします。</p>
<ol>
<li><p>Google reCAPTCHA にサインアップするには、<a href="https://www.google.com/recaptcha">https://www.google.com/recaptcha</a></p></li>
<li><p>入力<strong>認証</strong> → <strong>フロー</strong> → <strong>登録</strong></p></li>
<li><p>ステップの検索<strong>再キャプチャ</strong>→ 無効からに切り替えます<strong>必須</strong></p></li>
<li><p>歯車アイコンをクリック→入力<strong>サイトキー</strong>そして<strong>秘密鍵</strong>Googleから</p></li>
</ol>

<h3 id="tuy-chinh-registration-form"><strong>6.3 登録フォームのカスタマイズ</strong></h3>
<p>ユーザー プロファイルを使用すると、登録フォームに表示されるフィールドを制御できます。</p>
<ul>
<li><p>属性付き<strong>ユーザーに必須</strong>：フォーム上にONと表示されます</p></li>
<li><p>表示順序<strong>並べ替え順序</strong>ユーザープロファイル設定内</p></li>
<li><p>使用<strong>属性グループ</strong>関連するフィールドをグループ化する</p></li>
</ul>

<h2 id="7-impersonation"><strong>7. なりすまし</strong></h2>

<p>偽装を使用すると、管理者は別のユーザーとして「偽装」ログインできるため、デバッグやサポートに役立ちます。</p>

<h3 id="su-dung-impersonation"><strong>7.1 偽装の使用</strong></h3>
<ol>
<li><p>入力<strong>ユーザー</strong>→ なりすます必要があるユーザーを見つけます</p></li>
<li><p>ドロップダウンメニュー（ケバブメニュー）をクリック →<strong>なりすます</strong></p></li>
<li><p>ブラウザは新しいタブを開き、そのユーザー名でログインします。</p></li>
<li><p>すべてのアクションはイベント タイプのイベントに記録されます。<code>なりすます</code></p></li>
</ol>

<h3 id="impersonation-qua-api"><strong>7.2 REST APIを介した偽装</strong></h3>
<pre><code>curl -s -X POST \
  "http://localhost:8080/admin/realms/my-company/users/$USER_ID/impersonation" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json"</code></pre>

<p><strong>セキュリティ上の注意:</strong></p>
<ul>
<li><p>ユーザーのみが役割を持ちます<code>なりすまし</code>領域内で<code>レルム管理</code>なりすますことができます</p></li>
<li><p>すべての偽装イベントがログに記録されます - 監査にとって重要です</p></li>
<li><p>運用環境では、権限の偽装をスーパー管理者のみに制限します</p></li>
</ul>

<h2 id="8-tim-kiem-va-quan-ly-users"><strong>8. ユーザーの高度な検索と管理</strong></h2>

<h3 id="tim-kiem-user"><strong>8.1 ユーザーの検索</strong></h3>
<pre><code># Tìm theo username
bin/kcadm.sh get users -r my-company -q username=john

# Tìm theo email
bin/kcadm.sh get users -r my-company -q email=john.doe@mycompany.com

# Tìm theo attribute
bin/kcadm.sh get users -r my-company -q "q=department:Engineering"

# Tìm với pagination
bin/kcadm.sh get users -r my-company --offset 0 --limit 20

# REST API - tìm với nhiều tiêu chí
curl -s -X GET \
  "http://localhost:8080/admin/realms/my-company/users?search=john&amp;max=20&amp;first=0" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq '.[].username'</code></pre>

<h3 id="xoa-user"><strong>8.2 ユーザーの削除</strong></h3>
<pre><code># Qua CLI
bin/kcadm.sh delete users/$USER_ID -r my-company

# Qua REST API
curl -s -X DELETE \
  "http://localhost:8080/admin/realms/my-company/users/$USER_ID" \
  -H "Authorization: Bearer $ACCESS_TOKEN"</code></pre>

<h3 id="disable-user"><strong>8.3 ユーザーを無効にする (削除ではなく)</strong></h3>
<pre><code># Disable user - vẫn giữ data nhưng không cho login
bin/kcadm.sh update users/$USER_ID -r my-company -s enabled=false</code></pre>

<h3 id="bulk-operations"><strong>8.4 一括操作</strong></h3>
<p>CSV から複数のユーザーを作成するスクリプトの例:</p>
<pre><code>#!/bin/bash
# bulk-create-users.sh

REALM="my-company"

while IFS=',' read -r username email firstName lastName department; do
  bin/kcadm.sh create users -r $REALM \
    -s username="$username" \
    -s email="$email" \
    -s firstName="$firstName" \
    -s lastName="$lastName" \
    -s enabled=true \
    -s emailVerified=true \
    -s "attributes={\"department\":[\"$department\"]}"
  
  bin/kcadm.sh set-password -r $REALM \
    --username "$username" \
    --new-password "Welcome@123" \
    --temporary
  
  echo "Created user: $username"
done &lt; users.csv</code></pre>

<h2 id="9-personal-data-management"><strong>9.個人データの管理</strong></h2>

<p>Keycloak は、以下を通じて GDPR 準拠をサポートします。<strong>アカウントコンソール</strong>、ユーザーに次のことを許可します。</p>
<ul>
<li><p><strong>個人情報の閲覧</strong>— メールアドレス、名前、属性</p></li>
<li><p><strong>情報を編集する</strong>— ユーザープロファイルの権限に依存します</p></li>
<li><p><strong>セッションを見る</strong>— アクティブなログインセッション</p></li>
<li><p><strong>デバイスの管理</strong>— ログインしたデバイスの表示と取り消し</p></li>
<li><p><strong>アプリケーションを見る</strong>— アクセスが許可されたアプリケーション</p></li>
<li><p><strong>アカウントを削除する</strong>— 自分でアカウントを削除します (許可されている場合)</p></li>
</ul>

<p>アカウントコンソールのURL:</p>
<pre><code>http://localhost:8080/realms/{realm}/account</code></pre>

<p>アカウントの削除を有効にする:</p>
<ol>
<li><p>入力<strong>認証</strong> → <strong>必要なアクション</strong></p></li>
<li><p>アクションを有効にする<strong>アカウントの削除</strong></p></li>
<li><p>入力<strong>レルム設定</strong> → <strong>ログイン</strong>→オンにする<strong>アカウントを削除する</strong></p></li>
</ol>

<h2 id="10-thuc-hanh"><strong>10. 練習問題</strong></h2>

<ol>
<li><p><strong>ユーザープロファイルの作成</strong>レルム用<code>私の会社</code>カスタム属性を使用:</p>
<ul>
<li><code>電話番号</code>(必須、国際形式の正規表現バリデータ)</li>
<li><code>部門</code>(必須、オプション: エンジニアリング、人事、財務、マーケティング)</li>
<li><code>従業員ID</code>(管理者のみ編集、パターン: EMP-[0-9]{4})</li>
</ul>
</li>
<li><p><strong>グループ階層の作成</strong>:</p>
<ul>
<li>エンジニアリング → バックエンド、フロントエンド、DevOps</li>
<li>オペレーション → 人事、財務</li>
</ul>
</li>
<li><p><strong>5人のユーザーを作成する</strong>CLI 経由、各ユーザーは異なるグループに属し、一時パスワード</p></li>
<li><p><strong>自己登録をオンにする</strong>メール認証と登録テストあり</p></li>
<li><p><strong>パスワードポリシーを構成する</strong>: 最小 10 文字、大文字 1 文字、数字 1 文字、特殊文字 1 文字、履歴 5 文字、有効期限 90 日</p></li>
</ol>

<h2 id="11-tong-ket"><strong>11. まとめ</strong></h2>

<p>このレッスンでは、次のことを学びました。</p>
<ul>
<li><p>作成と管理<strong>ユーザー</strong>管理コンソール、CLI、REST API 経由</p></li>
<li><p>確立する<strong>資格</strong>そして<strong>パスワードポリシー</strong></p></li>
<li><p>使用<strong>ユーザープロフィール</strong>バリデーターとアノテーションを使用して属性スキーマを定義する</p></li>
<li><p>作成する<strong>グループ</strong>そして<strong>サブグループ</strong>階層、属性、およびデフォルトのグループを使用して</p></li>
<li><p>構成<strong>必要なアクション</strong>ユーザーに必要な</p></li>
<li><p>オンにする<strong>自己登録</strong>reCAPTCHAあり</p></li>
<li><p>使用<strong>なりすまし</strong>デバッグ用</p></li>
<li><p>管理<strong>個人データ</strong>GDPR準拠のため</p></li>
</ul>

<p>次の記事で手順を説明します<strong>役割、権限、アクセス制御</strong>キークロークで。</p>
