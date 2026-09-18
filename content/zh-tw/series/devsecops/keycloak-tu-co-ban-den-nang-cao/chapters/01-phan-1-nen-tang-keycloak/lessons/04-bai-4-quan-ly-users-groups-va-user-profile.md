---
id: 019d8b30-b104-7001-c001-e0c5f8100104
title: 第 4 課：管理使用者、群組和使用者設定檔
slug: bai-4-quan-ly-users-groups-va-user-profile
description: 建立和管理使用者、設定憑證、使用者屬性架構、使用者設定檔配置、自訂屬性和驗證器、建立群組和子群組、群組屬性、群組角色對應、使用者自行註冊、所需操作、模擬和個人資料管理。
duration_minutes: 150
is_free: true
video_url: null
sort_order: 4
section_title: 第 1 部分：Keycloak 平台
course:
  id: 019d8b30-b100-7001-c001-e0c5f8100001
  title: 鑰匙斗篷從基礎到高級
  slug: keycloak-tu-co-ban-den-nang-cao
locale: zh-tw
---
<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/03/keycloak-users-groups-roles-2026.webp" alt="Keycloak Users, Groups, Roles Hierarchy" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Keycloak領域中使用者、群組和角色的分層模型</em></p>
</div>

<h2 id="1-quan-ly-users"><strong>1. 管理用戶</strong></h2>

<p>使用者是Keycloak的中心實體－代表可以登入系統的使用者。每個使用者都屬於特定領域，並且可以具有屬性、憑證、角色和群組成員資格。</p>

<h3 id="tao-user-qua-admin-console"><strong>1.1 透過管理控制台建立用戶</strong></h3>
<ol>
<li><p>選擇領域（例如：<code>我的公司</code>) 來自領域選擇器</p></li>
<li><p>點選<strong>使用者</strong>在側邊欄中</p></li>
<li><p>點選<strong>新增用戶</strong></p></li>
<li><p>填寫資料：</p>
<ul>
<li><strong>使用者名稱</strong>: <code>約翰·多伊</code>（必填）</li>
<li><strong>電子郵件</strong>: <code>john.doe@mycompany.com</code></li>
<li><strong>名</strong>: <code>約翰</code></li>
<li><strong>姓</strong>: <code>美國能源部</code></li>
<li><strong>電子郵件已驗證</strong>：ON（如果電子​​郵件已通過身份驗證）</li>
<li><strong>啟用</strong>： 在</li>
</ul>
</li>
<li><p>點選<strong>創造</strong></p></li>
</ol>

<h3 id="tao-user-qua-cli"><strong>1.2 透過管理 CLI 創建用戶</strong></h3>
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

<h3 id="tao-user-qua-api"><strong>1.3 透過REST API創建用戶</strong></h3>
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

<h2 id="2-thiet-lap-credentials"><strong>2. 設定憑證</strong></h2>

<h3 id="dat-mat-khau-qua-admin-console"><strong>2.1 透過管理控制台設定密碼</strong></h3>
<ol>
<li><p>進入<strong>使用者</strong>→ 選擇使用者 → 選項卡<strong>證書</strong></p></li>
<li><p>點選<strong>設定密碼</strong></p></li>
<li><p>輸入新密碼</p></li>
<li><p><strong>暫時的</strong>：ON（使用者首次登入時必須更改密碼）或OFF（固定密碼）</p></li>
<li><p>點選<strong>節省</strong></p></li>
</ol>

<h3 id="dat-mat-khau-qua-cli"><strong>2.2 透過CLI設定密碼</strong></h3>
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

<h3 id="dat-mat-khau-qua-api"><strong>2.3 透過REST API設定密碼</strong></h3>
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

<h3 id="password-policies"><strong>2.4 密碼策略</strong></h3>
<p>配置領域的密碼策略<strong>驗證</strong> → <strong>政策</strong> → <strong>密碼政策</strong>:</p>
<table>
<thead>
<tr><th>政策</th><th>描述</th><th>範例值</th></tr>
</thead>
<tbody>
<tr><td>最小長度</td><td>最小長度</td><td>8</td></tr>
<tr><td>大寫字符</td><td>需要大寫字母</td><td>1</td></tr>
<tr><td>小寫字符</td><td>需要小寫字母</td><td>1</td></tr>
<tr><td>數位</td><td>請求號碼</td><td>1</td></tr>
<tr><td>特殊字元</td><td>需要特殊字符</td><td>1</td></tr>
<tr><td>不是使用者名稱</td><td>密碼不能與使用者名稱相同</td><td>-</td></tr>
<tr><td>不是電子郵件</td><td>密碼不得與電子郵件匹配</td><td>-</td></tr>
<tr><td>密碼歷史記錄</td><td>不要重複使用舊密碼</td><td>3</td></tr>
<tr><td>密碼過期</td><td>密碼過期時間（天）</td><td>90</td></tr>
<tr><td>哈希演算法</td><td>演算法哈希密碼</td><td>氬氣2</td></tr>
<tr><td>哈希迭代</td><td>哈希輪數</td><td>5（氬氣2）</td></tr>
</tbody>
</table>

<p>透過 CLI 設定：</p>
<pre><code>bin/kcadm.sh update realms/my-company \
  -s 'passwordPolicy="length(8) and upperCase(1) and lowerCase(1) and digits(1) and specialChars(1) and notUsername and passwordHistory(3)"'</code></pre>

<h2 id="3-user-profile"><strong>3. 使用者簡介</strong></h2>

<p><strong>使用者資料</strong>是一項功能，可讓管理員定義使用者屬性的架構 - 控制使用者擁有哪些屬性、如何驗證這些屬性以及如何在介面上顯示這些屬性。</p>

<h3 id="bat-user-profile"><strong>3.1 啟動用戶資料</strong></h3>
<p>從 Keycloak 24+ 開始，預設啟用使用者設定檔。對於舊版本：</p>
<ol>
<li><p>進入<strong>領域設定</strong> → <strong>一般的</strong></p></li>
<li><p>尋找<strong>已啟用使用者設定檔</strong>： 在</p></li>
</ol>

<p>啟用後，即可訪問<strong>領域設定</strong> → <strong>使用者資料</strong>進行配置。</p>

<h3 id="attribute-schema"><strong>3.2 屬性模式定義</strong></h3>
<p>每個屬性都有以下配置：</p>
<ul>
<li><p><strong>姓名</strong>— 屬性名稱（小寫，用於 API）</p></li>
<li><p><strong>顯示名稱</strong>— UI 顯示名稱（支援 i18n：<code>${個人資料.屬性.部門}</code>)</p></li>
<li><p><strong>權限</strong>— 誰可以檢視/編輯（管理員、使用者）</p></li>
<li><p><strong>驗證</strong>— 值驗證規則</p></li>
<li><p><strong>註解</strong>— UI 渲染的元數據</p></li>
<li><p><strong>必需的</strong>— 使用者、管理員或兩者都需要</p></li>
<li><p><strong>多值</strong>— 允許多個值</p></li>
</ul>

<h3 id="built-in-attributes"><strong>3.3 內建屬性</strong></h3>
<p>Keycloak 具有可用屬性：</p>
<table>
<thead>
<tr><th>屬性</th><th>描述</th><th>預設</th></tr>
</thead>
<tbody>
<tr><td>使用者名稱.使用者名稱</td><td>登入名</td><td>必需的、獨特的</td></tr>
<tr><td>電子郵件</td><td>電子郵件</td><td>必需（可以關閉）</td></tr>
<tr><td>名</td><td>姓名</td><td>必需的</td></tr>
<tr><td>姓</td><td>姓</td><td>必需的</td></tr>
</tbody>
</table>

<h3 id="tao-custom-attribute"><strong>3.4 建立自訂屬性</strong></h3>
<p>建立屬性的範例<code>電話號碼</code>:</p>
<ol>
<li><p>進入<strong>領域設定</strong> → <strong>使用者資料</strong></p></li>
<li><p>點選<strong>建立屬性</strong></p></li>
<li><p>配置：</p>
<ul>
<li><strong>姓名</strong>: <code>電話號碼</code></li>
<li><strong>顯示名稱</strong>: <code>電話號碼</code></li>
<li><strong>屬性組</strong>:(選擇或建立新的)</li>
<li><strong>啟用時間</strong>：總是</li>
<li><strong>必需的</strong>：用戶必填</li>
</ul>
</li>
</ol>

<h3 id="validators"><strong>3.5 驗證器</strong></h3>
<p>Keycloak提供了許多驗證器來檢查屬性值：</p>
<table>
<thead>
<tr><th>驗證器</th><th>描述</th><th>配置範例</th></tr>
</thead>
<tbody>
<tr><td>長度。長度</td><td>長度限制</td><td>最小值：3，最大值：50</td></tr>
<tr><td>電子郵件</td><td>檢查電子郵件格式</td><td>-</td></tr>
<tr><td>圖案。圖案</td><td>檢查正規表示式模式</td><td>^\\+[0-9]{10,15}$</td></tr>
<tr><td>整數</td><td>檢查整數</td><td>最小值：0，最大值：999999</td></tr>
<tr><td>雙倍的</td><td>檢查真實數字</td><td>最小值：0.0，最大值：100.0</td></tr>
<tr><td>烏裡</td><td>檢查 URL 是否有效</td><td>-</td></tr>
<tr><td>選項</td><td>列表中的限制值</td><td>[“越南”，“美國”，“日本”]</td></tr>
<tr><td>人名禁止字符</td><td>阻止名稱中的特殊字符</td><td>-</td></tr>
<tr><td>使用者名稱禁止字符</td><td>封鎖使用者名稱中的特殊字符</td><td>-</td></tr>
<tr><td>多值的</td><td>驗證值的數量</td><td>最小值：1，最大值：5</td></tr>
</tbody>
</table>

<p>屬性配置範例<code>電話號碼</code>透過 JSON（使用者設定檔標籤 → JSON 編輯器）：</p>
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

<h3 id="annotations-cho-ui"><strong>3.6 UI渲染的註解</strong></h3>
<p>註釋允許自訂屬性在註冊/帳戶頁面上的顯示方式：</p>
<table>
<thead>
<tr><th>註解</th><th>描述</th><th>價值</th></tr>
</thead>
<tbody>
<tr><td>輸入類型</td><td>HTML 輸入類型</td><td>文字、電子郵件、電話、號碼、日期、選擇、多選、文字區域、html5-*</td></tr>
<tr><td>輸入說明文字之前</td><td>幫助文字顯示在輸入之前</td><td>文字字串</td></tr>
<tr><td>輸入幫助文字之後</td><td>輸入後顯示幫助文字</td><td>文字字串</td></tr>
<tr><td>來自驗證的輸入選項</td><td>從驗證器取得選項</td><td>驗證名稱（例如“選項”）</td></tr>
</tbody>
</table>

<h3 id="progressive-profiling"><strong>3.7 漸進式分析</strong></h3>
<p>漸進式分析允許逐步收集用戶信息，而不是在註冊時詢問所有信息：</p>
<ol>
<li><p>建立屬性<strong>必需的</strong> → <strong>用戶需要</strong>： 在</p></li>
<li><p>當使用者登入時，如果該屬性沒有值，Keycloak將顯示一個要求填寫的表單</p></li>
<li><p>結合<strong>“啟用時間”範圍</strong>— 僅當客戶端要求特定範圍時才需要該屬性</p></li>
</ol>

<p>例如：屬性<code>電話號碼</code>僅當客戶請求範圍時才需要<code>電話。電話</code>:</p>
<pre><code>{
  "name": "phone_number",
  "required": {
    "roles": ["user"],
    "scopes": ["phone"]
  }
}</code></pre>

<h2 id="4-groups"><strong>4. 小組和小組</strong></h2>

<p>群組有助於組織使用者並將角色和屬性一次性應用到使用者群組，而不是單獨分配每個使用者。</p>

<h3 id="tao-group-qua-admin-console"><strong>4.1 透過管理控制台建立群組</strong></h3>
<ol>
<li><p>點選<strong>團體</strong>在側邊欄中</p></li>
<li><p>點選<strong>建立群組</strong></p></li>
<li><p>進入<strong>姓名</strong>: <code>工程</code></p></li>
<li><p>點選<strong>創造</strong></p></li>
</ol>

<h3 id="tao-sub-group"><strong>4.2 建立子群組</strong></h3>
<p>子組繼承父組的屬性和角色映射：</p>
<ol>
<li><p>點選群組<code>工程</code></p></li>
<li><p>點選<strong>建立子群組</strong></p></li>
<li><p>輸入姓名：<code>後端</code>, <code>前端</code>, <code>開發營運</code></p></li>
</ol>

<p>群組結構範例：</p>
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

<h3 id="tao-group-qua-cli"><strong>4.3 透過 CLI 建立群組</strong></h3>
<pre><code># Tạo top-level group
bin/kcadm.sh create groups -r my-company -s name="Engineering"

# Lấy group ID
GROUP_ID=$(bin/kcadm.sh get groups -r my-company --fields id,name | jq -r '.[] | select(.name=="Engineering") | .id')

# Tạo sub-group
bin/kcadm.sh create groups/$GROUP_ID/children -r my-company -s name="Backend"
bin/kcadm.sh create groups/$GROUP_ID/children -r my-company -s name="Frontend"
bin/kcadm.sh create groups/$GROUP_ID/children -r my-company -s name="DevOps"</code></pre>

<h3 id="group-attributes"><strong>4.4 組屬性</strong></h3>
<p>群組可以包含鍵值屬性－對於元資料、群組配置有用：</p>
<pre><code># Thêm attributes cho group
bin/kcadm.sh update groups/$GROUP_ID -r my-company \
  -s 'attributes={"cost_center":["CC-ENG-001"],"location":["HCM","HN"]}'</code></pre>

<p>透過管理控制台：按一下群組 → 選項卡<strong>屬性</strong>→ 新增鍵值對。</p>

<h3 id="them-user-vao-group"><strong>4.5 新增用戶到群組</strong></h3>
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

<h3 id="default-groups"><strong>4.6 預設組</strong></h3>
<p>建立帳戶或註冊時預設群組會自動新增使用者：</p>
<ol>
<li><p>進入<strong>團體</strong></p></li>
<li><p>選擇要設定為預設的群組</p></li>
<li><p>或者進來<strong>領域設定</strong> → <strong>用戶註冊</strong> → <strong>預設群組</strong></p></li>
</ol>

<pre><code># Qua CLI
bin/kcadm.sh update realms/my-company -s 'defaultGroups=["/Engineering/Backend"]'</code></pre>

<h2 id="5-required-actions"><strong>5. 所需採取的行動</strong></h2>

<p>必需的操作是使用者在成功登入之前必須執行的操作。</p>

<h3 id="danh-sach-required-actions"><strong>5.1 可用的所需操作列表</strong></h3>
<table>
<thead>
<tr><th>行動</th><th>描述</th></tr>
</thead>
<tbody>
<tr><td>更新密碼</td><td>需要修改密碼</td></tr>
<tr><td>驗證信箱</td><td>信箱認證</td></tr>
<tr><td>設定一次性密碼</td><td>設定 OTP（TOTP/HOTP）</td></tr>
<tr><td>更新個人資料</td><td>更新個人訊息</td></tr>
<tr><td>條款與條件</td><td>接受使用條款</td></tr>
<tr><td>設定WebAuthn</td><td>WebAuthn 設備註冊</td></tr>
<tr><td>更新用戶區域設定</td><td>選擇語言</td></tr>
<tr><td>刪除憑證</td><td>刪除舊憑證</td></tr>
</tbody>
</table>

<h3 id="gan-required-action-cho-user"><strong>5.2 為使用者指派所需的操作</strong></h3>
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

<h3 id="default-required-actions"><strong>5.3 預設所需操作</strong></h3>
<p>為所有新用戶配置預設所需的操作<strong>驗證</strong> → <strong>所需採取的行動</strong>:</p>
<ul>
<li><p>打開列<strong>設定為預設操作</strong>為了想要的動作</p></li>
<li><p>每個新用戶都會自動指派預設操作</p></li>
</ul>

<h2 id="6-user-self-registration"><strong>6. 用戶自助註冊</strong></h2>

<h3 id="bat-self-registration"><strong>6.1 啟用自註冊</strong></h3>
<ol>
<li><p>進入<strong>領域設定</strong> → <strong>登入</strong></p></li>
<li><p>打開<strong>用戶註冊</strong>： 在</p></li>
<li><p>登入頁面將顯示“註冊”鏈接</p></li>
</ol>

<h3 id="recaptcha"><strong>6.2 reCAPTCHA 註冊</strong></h3>
<p>為了保護您的註冊表單免受機器人攻擊，請啟用 reCAPTCHA：</p>
<ol>
<li><p>註冊 Google reCAPTCHA：<a href="https://www.google.com/recaptcha">https://www.google.com/recaptcha</a></p></li>
<li><p>進入<strong>驗證</strong> → <strong>流量</strong> → <strong>登記</strong></p></li>
<li><p>尋找步驟<strong>驗證碼</strong>→ 從停用切換到<strong>必需的</strong></p></li>
<li><p>點擊齒輪圖示→進入<strong>站點密鑰</strong>和<strong>秘密鑰匙</strong>來自Google</p></li>
</ol>

<h3 id="tuy-chinh-registration-form"><strong>6.3 客製化註冊表</strong></h3>
<p>使用使用者設定文件，您可以控制註冊表單上顯示哪些欄位：</p>
<ul>
<li><p>屬性與<strong>用戶需要</strong>: ON 將會出現在表格上</p></li>
<li><p>顯示順序根據<strong>排序順序</strong>在使用者設定檔配置中</p></li>
<li><p>使用<strong>屬性組</strong>將相關欄位進行分組</p></li>
</ul>

<h2 id="7-impersonation"><strong>7. 冒充</strong></h2>

<p>模擬允許管理員以不同用戶的身份「假裝」登錄，這對於調試和支援很有用。</p>

<h3 id="su-dung-impersonation"><strong>7.1 使用模擬</strong></h3>
<ol>
<li><p>進入<strong>使用者</strong>→ 找到您需要模擬的用戶</p></li>
<li><p>點選下拉選單（烤肉串選單）→<strong>模仿</strong></p></li>
<li><p>瀏覽器將開啟一個新分頁以該使用者名稱登入</p></li>
<li><p>所有操作均記錄在具有事件類型的事件中<code>模仿</code></p></li>
</ol>

<h3 id="impersonation-qua-api"><strong>7.2 透過 REST API 進行模擬</strong></h3>
<pre><code>curl -s -X POST \
  "http://localhost:8080/admin/realms/my-company/users/$USER_ID/impersonation" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json"</code></pre>

<p><strong>安全說明：</strong></p>
<ul>
<li><p>只有使用者才有角色<code>冒充</code>在領域內<code>領域管理</code>可以冒充</p></li>
<li><p>所有模擬事件都會被記錄下來—對於審計很重要</p></li>
<li><p>在生產中，將權限模擬限制為僅超級管理員</p></li>
</ul>

<h2 id="8-tim-kiem-va-quan-ly-users"><strong>8.用戶的進階搜尋與管理</strong></h2>

<h3 id="tim-kiem-user"><strong>8.1 搜尋用戶</strong></h3>
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

<h3 id="xoa-user"><strong>8.2 刪除用戶</strong></h3>
<pre><code># Qua CLI
bin/kcadm.sh delete users/$USER_ID -r my-company

# Qua REST API
curl -s -X DELETE \
  "http://localhost:8080/admin/realms/my-company/users/$USER_ID" \
  -H "Authorization: Bearer $ACCESS_TOKEN"</code></pre>

<h3 id="disable-user"><strong>8.3 停用用戶（而非刪除）</strong></h3>
<pre><code># Disable user - vẫn giữ data nhưng không cho login
bin/kcadm.sh update users/$USER_ID -r my-company -s enabled=false</code></pre>

<h3 id="bulk-operations"><strong>8.4 批量操作</strong></h3>
<p>從 CSV 建立多個使用者的範例腳本：</p>
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

<h2 id="9-personal-data-management"><strong>9. 個人資料管理</strong></h2>

<p>Keycloak 透過以下方式支援 GDPR 合規性：<strong>帳戶控制台</strong>，允許使用者：</p>
<ul>
<li><p><strong>查看個人資訊</strong>— 電子郵件、姓名、屬性</p></li>
<li><p><strong>編輯訊息</strong>— 取決於使用者設定檔中的權限</p></li>
<li><p><strong>查看會議</strong>— 活動登入會話</p></li>
<li><p><strong>管理設備</strong>— 檢視並撤銷已登入的設備</p></li>
<li><p><strong>查看應用</strong>— 已被授予存取權限的應用程式</p></li>
<li><p><strong>刪除帳戶</strong>— 自行刪除您的帳戶（如果允許）</p></li>
</ul>

<p>帳戶控制台網址：</p>
<pre><code>http://localhost:8080/realms/{realm}/account</code></pre>

<p>啟用帳戶刪除：</p>
<ol>
<li><p>進入<strong>驗證</strong> → <strong>所需採取的行動</strong></p></li>
<li><p>啟用操作<strong>刪除帳戶</strong></p></li>
<li><p>進入<strong>領域設定</strong> → <strong>登入</strong>→ 打開<strong>刪除帳戶</strong></p></li>
</ol>

<h2 id="10-thuc-hanh"><strong>10.練習練習</strong></h2>

<ol>
<li><p><strong>建立用戶個人資料</strong>對於領域<code>我的公司</code>具有自訂屬性：</p>
<ul>
<li><code>電話號碼</code>（必需，國際格式的正規表示式驗證器）</li>
<li><code>部門</code>（必填，選項：工程、人力資源、財務、行銷）</li>
<li><code>員工 ID</code>（僅限管理員編輯，模式：EMP-[0-9]{4}）</li>
</ul>
</li>
<li><p><strong>建立群組層次結構</strong>:</p>
<ul>
<li>工程 → 後端、前端、DevOps</li>
<li>營運 → 人力資源、財務</li>
</ul>
</li>
<li><p><strong>創建5個用戶</strong>透過CLI，每個使用者屬於不同的群組，臨時密碼</p></li>
<li><p><strong>開啟自助註冊</strong>具有電子郵件驗證和註冊測試</p></li>
<li><p><strong>設定密碼策略</strong>：最少 10 個字元、1 個大寫字母、1 個數字、1 個特殊字元、5 個歷史記錄、90 天過期</p></li>
</ol>

<h2 id="11-tong-ket"><strong>11. 總結</strong></h2>

<p>在本課中，您學習了：</p>
<ul>
<li><p>創建和管理<strong>使用者</strong>透過管理控制台、CLI 和 REST API</p></li>
<li><p>建立<strong>證書</strong>和<strong>密碼原則</strong></p></li>
<li><p>使用<strong>使用者資料</strong>使用驗證器和註解定義屬性模式</p></li>
<li><p>創造<strong>團體</strong>和<strong>亞組</strong>具有層次結構、屬性和預設群組</p></li>
<li><p>配置<strong>所需採取的行動</strong>用戶需要的</p></li>
<li><p>打開<strong>自助註冊</strong>使用驗證碼</p></li>
<li><p>使用<strong>冒充</strong>用於偵錯</p></li>
<li><p>管理<strong>個人資料</strong>遵守 GDPR</p></li>
</ul>

<p>下一篇文章將提供說明<strong>角色、權限和存取控制</strong>在鑰匙斗篷裡。</p>
