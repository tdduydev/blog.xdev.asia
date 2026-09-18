---
id: 019d8b30-b104-7001-c001-e0c5f8100104
title: 'Bài 4: Quản lý Users, Groups và User Profile'
slug: bai-4-quan-ly-users-groups-va-user-profile
description: >-
  Tạo và quản lý Users, thiết lập credentials, user attributes schema, User
  Profile configuration, custom attributes và validators, tạo Groups và
  sub-groups, group attributes, group role mappings, user self-registration,
  required actions, impersonation và personal data management.
duration_minutes: 150
is_free: true
video_url: null
sort_order: 4
section_title: "Phần 1: Nền tảng Keycloak"
course:
  id: 019d8b30-b100-7001-c001-e0c5f8100001
  title: Keycloak từ Cơ bản đến Nâng cao
  slug: keycloak-tu-co-ban-den-nang-cao
---
<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/03/keycloak-users-groups-roles-2026.webp" alt="Keycloak Users, Groups, Roles Hierarchy" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Mô hình phân cấp Users, Groups và Roles trong Keycloak Realm</em></p>
</div>

<h2 id="1-quan-ly-users"><strong>1. Quản lý Users</strong></h2>

<p>Users là thực thể trung tâm của Keycloak — đại diện cho người dùng có thể đăng nhập vào hệ thống. Mỗi user thuộc về một realm cụ thể và có thể có attributes, credentials, roles, và group memberships.</p>

<h3 id="tao-user-qua-admin-console"><strong>1.1 Tạo User qua Admin Console</strong></h3>
<ol>
<li><p>Chọn realm (ví dụ: <code>my-company</code>) từ realm selector</p></li>
<li><p>Click <strong>Users</strong> trong sidebar</p></li>
<li><p>Click <strong>Add user</strong></p></li>
<li><p>Điền thông tin:</p>
<ul>
<li><strong>Username</strong>: <code>john.doe</code> (bắt buộc)</li>
<li><strong>Email</strong>: <code>john.doe@mycompany.com</code></li>
<li><strong>First name</strong>: <code>John</code></li>
<li><strong>Last name</strong>: <code>Doe</code></li>
<li><strong>Email verified</strong>: ON (nếu đã xác thực email)</li>
<li><strong>Enabled</strong>: ON</li>
</ul>
</li>
<li><p>Click <strong>Create</strong></p></li>
</ol>

<h3 id="tao-user-qua-cli"><strong>1.2 Tạo User qua Admin CLI</strong></h3>
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

<h3 id="tao-user-qua-api"><strong>1.3 Tạo User qua REST API</strong></h3>
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

<h2 id="2-thiet-lap-credentials"><strong>2. Thiết lập Credentials</strong></h2>

<h3 id="dat-mat-khau-qua-admin-console"><strong>2.1 Đặt mật khẩu qua Admin Console</strong></h3>
<ol>
<li><p>Vào <strong>Users</strong> → chọn user → tab <strong>Credentials</strong></p></li>
<li><p>Click <strong>Set password</strong></p></li>
<li><p>Nhập password mới</p></li>
<li><p><strong>Temporary</strong>: ON (user phải đổi password khi đăng nhập lần đầu) hoặc OFF (password cố định)</p></li>
<li><p>Click <strong>Save</strong></p></li>
</ol>

<h3 id="dat-mat-khau-qua-cli"><strong>2.2 Đặt mật khẩu qua CLI</strong></h3>
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

<h3 id="dat-mat-khau-qua-api"><strong>2.3 Đặt mật khẩu qua REST API</strong></h3>
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

<h3 id="password-policies"><strong>2.4 Password Policies</strong></h3>
<p>Cấu hình password policies cho realm tại <strong>Authentication</strong> → <strong>Policies</strong> → <strong>Password policy</strong>:</p>
<table>
<thead>
<tr><th>Policy</th><th>Mô tả</th><th>Giá trị ví dụ</th></tr>
</thead>
<tbody>
<tr><td>Minimum length</td><td>Độ dài tối thiểu</td><td>8</td></tr>
<tr><td>Uppercase characters</td><td>Yêu cầu chữ hoa</td><td>1</td></tr>
<tr><td>Lowercase characters</td><td>Yêu cầu chữ thường</td><td>1</td></tr>
<tr><td>Digits</td><td>Yêu cầu số</td><td>1</td></tr>
<tr><td>Special characters</td><td>Yêu cầu ký tự đặc biệt</td><td>1</td></tr>
<tr><td>Not username</td><td>Password không được trùng username</td><td>-</td></tr>
<tr><td>Not email</td><td>Password không được trùng email</td><td>-</td></tr>
<tr><td>Password history</td><td>Không dùng lại password cũ</td><td>3</td></tr>
<tr><td>Expire password</td><td>Thời gian hết hạn password (ngày)</td><td>90</td></tr>
<tr><td>Hashing algorithm</td><td>Algorithm hash password</td><td>argon2</td></tr>
<tr><td>Hashing iterations</td><td>Số vòng hash</td><td>5 (argon2)</td></tr>
</tbody>
</table>

<p>Cấu hình qua CLI:</p>
<pre><code>bin/kcadm.sh update realms/my-company \
  -s 'passwordPolicy="length(8) and upperCase(1) and lowerCase(1) and digits(1) and specialChars(1) and notUsername and passwordHistory(3)"'</code></pre>

<h2 id="3-user-profile"><strong>3. User Profile</strong></h2>

<p><strong>User Profile</strong> là tính năng cho phép quản trị viên định nghĩa schema cho user attributes — kiểm soát những attributes nào users có, cách validate, và cách hiển thị trên giao diện.</p>

<h3 id="bat-user-profile"><strong>3.1 Kích hoạt User Profile</strong></h3>
<p>Từ Keycloak 24+, User Profile được bật mặc định. Với phiên bản cũ hơn:</p>
<ol>
<li><p>Vào <strong>Realm settings</strong> → <strong>General</strong></p></li>
<li><p>Tìm <strong>User profile enabled</strong>: ON</p></li>
</ol>

<p>Sau khi bật, truy cập <strong>Realm settings</strong> → <strong>User profile</strong> để cấu hình.</p>

<h3 id="attribute-schema"><strong>3.2 Định nghĩa Attribute Schema</strong></h3>
<p>Mỗi attribute có các cấu hình:</p>
<ul>
<li><p><strong>Name</strong> — tên attribute (lowercase, dùng cho API)</p></li>
<li><p><strong>Display name</strong> — tên hiển thị trên UI (hỗ trợ i18n: <code>${profile.attribute.department}</code>)</p></li>
<li><p><strong>Permissions</strong> — ai có thể view/edit (admin, user)</p></li>
<li><p><strong>Validations</strong> — các rules validate giá trị</p></li>
<li><p><strong>Annotations</strong> — metadata cho UI rendering</p></li>
<li><p><strong>Required</strong> — bắt buộc cho users, admins, hoặc cả hai</p></li>
<li><p><strong>Multivalued</strong> — cho phép nhiều giá trị</p></li>
</ul>

<h3 id="built-in-attributes"><strong>3.3 Built-in Attributes</strong></h3>
<p>Keycloak có sẵn các attributes:</p>
<table>
<thead>
<tr><th>Attribute</th><th>Mô tả</th><th>Mặc định</th></tr>
</thead>
<tbody>
<tr><td>username</td><td>Tên đăng nhập</td><td>Required, unique</td></tr>
<tr><td>email</td><td>Địa chỉ email</td><td>Required (có thể tắt)</td></tr>
<tr><td>firstName</td><td>Tên</td><td>Required</td></tr>
<tr><td>lastName</td><td>Họ</td><td>Required</td></tr>
</tbody>
</table>

<h3 id="tao-custom-attribute"><strong>3.4 Tạo Custom Attribute</strong></h3>
<p>Ví dụ tạo attribute <code>phone_number</code>:</p>
<ol>
<li><p>Vào <strong>Realm settings</strong> → <strong>User profile</strong></p></li>
<li><p>Click <strong>Create attribute</strong></p></li>
<li><p>Cấu hình:</p>
<ul>
<li><strong>Name</strong>: <code>phone_number</code></li>
<li><strong>Display name</strong>: <code>Phone Number</code></li>
<li><strong>Attribute group</strong>: (chọn hoặc tạo mới)</li>
<li><strong>Enabled when</strong>: Always</li>
<li><strong>Required</strong>: Required for user</li>
</ul>
</li>
</ol>

<h3 id="validators"><strong>3.5 Validators</strong></h3>
<p>Keycloak cung cấp nhiều validators để kiểm tra giá trị attribute:</p>
<table>
<thead>
<tr><th>Validator</th><th>Mô tả</th><th>Cấu hình ví dụ</th></tr>
</thead>
<tbody>
<tr><td>length</td><td>Giới hạn độ dài</td><td>min: 3, max: 50</td></tr>
<tr><td>email</td><td>Kiểm tra định dạng email</td><td>-</td></tr>
<tr><td>pattern</td><td>Kiểm tra regex pattern</td><td>^\\+[0-9]{10,15}$</td></tr>
<tr><td>integer</td><td>Kiểm tra số nguyên</td><td>min: 0, max: 999999</td></tr>
<tr><td>double</td><td>Kiểm tra số thực</td><td>min: 0.0, max: 100.0</td></tr>
<tr><td>uri</td><td>Kiểm tra URL hợp lệ</td><td>-</td></tr>
<tr><td>options</td><td>Giới hạn giá trị trong danh sách</td><td>["vn","us","jp"]</td></tr>
<tr><td>person-name-prohibited-characters</td><td>Chặn ký tự đặc biệt trong tên</td><td>-</td></tr>
<tr><td>username-prohibited-characters</td><td>Chặn ký tự đặc biệt trong username</td><td>-</td></tr>
<tr><td>multivalued</td><td>Validate số lượng values</td><td>min: 1, max: 5</td></tr>
</tbody>
</table>

<p>Ví dụ cấu hình attribute <code>phone_number</code> qua JSON (User Profile tab → JSON editor):</p>
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

<h3 id="annotations-cho-ui"><strong>3.6 Annotations cho UI Rendering</strong></h3>
<p>Annotations cho phép tùy chỉnh cách attribute hiển thị trên registration/account page:</p>
<table>
<thead>
<tr><th>Annotation</th><th>Mô tả</th><th>Giá trị</th></tr>
</thead>
<tbody>
<tr><td>inputType</td><td>HTML input type</td><td>text, email, tel, number, date, select, multiselect, textarea, html5-*</td></tr>
<tr><td>inputHelperTextBefore</td><td>Helper text hiển thị trước input</td><td>Chuỗi text</td></tr>
<tr><td>inputHelperTextAfter</td><td>Helper text hiển thị sau input</td><td>Chuỗi text</td></tr>
<tr><td>inputOptionsFromValidation</td><td>Lấy options từ validator</td><td>Tên validation (ví dụ: "options")</td></tr>
</tbody>
</table>

<h3 id="progressive-profiling"><strong>3.7 Progressive Profiling</strong></h3>
<p>Progressive profiling cho phép thu thập thông tin user dần dần thay vì yêu cầu tất cả khi đăng ký:</p>
<ol>
<li><p>Tạo attribute với <strong>Required</strong> → <strong>Required for user</strong>: ON</p></li>
<li><p>Khi user đăng nhập, nếu attribute chưa có giá trị, Keycloak sẽ hiện form yêu cầu điền</p></li>
<li><p>Kết hợp với <strong>"Enabled when" scopes</strong> — chỉ yêu cầu attribute khi client request scope cụ thể</p></li>
</ol>

<p>Ví dụ: Attribute <code>phone_number</code> chỉ required khi client request scope <code>phone</code>:</p>
<pre><code>{
  "name": "phone_number",
  "required": {
    "roles": ["user"],
    "scopes": ["phone"]
  }
}</code></pre>

<h2 id="4-groups"><strong>4. Groups và Sub-groups</strong></h2>

<p>Groups giúp tổ chức users và áp dụng roles, attributes cho nhóm users cùng lúc — thay vì gán từng user riêng lẻ.</p>

<h3 id="tao-group-qua-admin-console"><strong>4.1 Tạo Group qua Admin Console</strong></h3>
<ol>
<li><p>Click <strong>Groups</strong> trong sidebar</p></li>
<li><p>Click <strong>Create group</strong></p></li>
<li><p>Nhập <strong>Name</strong>: <code>Engineering</code></p></li>
<li><p>Click <strong>Create</strong></p></li>
</ol>

<h3 id="tao-sub-group"><strong>4.2 Tạo Sub-group</strong></h3>
<p>Sub-groups kế thừa attributes và role mappings từ parent group:</p>
<ol>
<li><p>Click vào group <code>Engineering</code></p></li>
<li><p>Click <strong>Create sub-group</strong></p></li>
<li><p>Nhập name: <code>Backend</code>, <code>Frontend</code>, <code>DevOps</code></p></li>
</ol>

<p>Cấu trúc groups ví dụ:</p>
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

<h3 id="tao-group-qua-cli"><strong>4.3 Tạo Group qua CLI</strong></h3>
<pre><code># Tạo top-level group
bin/kcadm.sh create groups -r my-company -s name="Engineering"

# Lấy group ID
GROUP_ID=$(bin/kcadm.sh get groups -r my-company --fields id,name | jq -r '.[] | select(.name=="Engineering") | .id')

# Tạo sub-group
bin/kcadm.sh create groups/$GROUP_ID/children -r my-company -s name="Backend"
bin/kcadm.sh create groups/$GROUP_ID/children -r my-company -s name="Frontend"
bin/kcadm.sh create groups/$GROUP_ID/children -r my-company -s name="DevOps"</code></pre>

<h3 id="group-attributes"><strong>4.4 Group Attributes</strong></h3>
<p>Groups có thể chứa key-value attributes — hữu ích cho metadata, cấu hình nhóm:</p>
<pre><code># Thêm attributes cho group
bin/kcadm.sh update groups/$GROUP_ID -r my-company \
  -s 'attributes={"cost_center":["CC-ENG-001"],"location":["HCM","HN"]}'</code></pre>

<p>Qua Admin Console: Click vào group → tab <strong>Attributes</strong> → thêm key-value pairs.</p>

<h3 id="them-user-vao-group"><strong>4.5 Thêm User vào Group</strong></h3>
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

<h3 id="default-groups"><strong>4.6 Default Groups</strong></h3>
<p>Default groups tự động thêm user mới vào khi tạo tài khoản hoặc đăng ký:</p>
<ol>
<li><p>Vào <strong>Groups</strong></p></li>
<li><p>Chọn group cần set làm default</p></li>
<li><p>Hoặc vào <strong>Realm settings</strong> → <strong>User registration</strong> → <strong>Default groups</strong></p></li>
</ol>

<pre><code># Qua CLI
bin/kcadm.sh update realms/my-company -s 'defaultGroups=["/Engineering/Backend"]'</code></pre>

<h2 id="5-required-actions"><strong>5. Required Actions</strong></h2>

<p>Required Actions là các hành động bắt buộc user phải thực hiện trước khi có thể đăng nhập thành công.</p>

<h3 id="danh-sach-required-actions"><strong>5.1 Danh sách Required Actions có sẵn</strong></h3>
<table>
<thead>
<tr><th>Action</th><th>Mô tả</th></tr>
</thead>
<tbody>
<tr><td>Update Password</td><td>Bắt buộc đổi mật khẩu</td></tr>
<tr><td>Verify Email</td><td>Xác thực email</td></tr>
<tr><td>Configure OTP</td><td>Thiết lập OTP (TOTP/HOTP)</td></tr>
<tr><td>Update Profile</td><td>Cập nhật thông tin cá nhân</td></tr>
<tr><td>Terms and Conditions</td><td>Chấp nhận điều khoản sử dụng</td></tr>
<tr><td>Configure WebAuthn</td><td>Đăng ký thiết bị WebAuthn</td></tr>
<tr><td>Update User Locale</td><td>Chọn ngôn ngữ</td></tr>
<tr><td>Delete Credential</td><td>Xóa credential cũ</td></tr>
</tbody>
</table>

<h3 id="gan-required-action-cho-user"><strong>5.2 Gán Required Action cho User</strong></h3>
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

<h3 id="default-required-actions"><strong>5.3 Default Required Actions</strong></h3>
<p>Cấu hình required actions mặc định cho tất cả users mới tại <strong>Authentication</strong> → <strong>Required actions</strong>:</p>
<ul>
<li><p>Bật cột <strong>Set as default action</strong> cho action mong muốn</p></li>
<li><p>Mọi user mới sẽ tự động được gán các default actions</p></li>
</ul>

<h2 id="6-user-self-registration"><strong>6. User Self-Registration</strong></h2>

<h3 id="bat-self-registration"><strong>6.1 Bật Self-Registration</strong></h3>
<ol>
<li><p>Vào <strong>Realm settings</strong> → <strong>Login</strong></p></li>
<li><p>Bật <strong>User registration</strong>: ON</p></li>
<li><p>Trang đăng nhập sẽ hiển thị link "Register"</p></li>
</ol>

<h3 id="recaptcha"><strong>6.2 reCAPTCHA cho Registration</strong></h3>
<p>Để bảo vệ registration form khỏi bot, bật reCAPTCHA:</p>
<ol>
<li><p>Đăng ký Google reCAPTCHA tại <a href="https://www.google.com/recaptcha">https://www.google.com/recaptcha</a></p></li>
<li><p>Vào <strong>Authentication</strong> → <strong>Flows</strong> → <strong>Registration</strong></p></li>
<li><p>Tìm step <strong>reCAPTCHA</strong> → chuyển từ Disabled sang <strong>Required</strong></p></li>
<li><p>Click gear icon → nhập <strong>Site Key</strong> và <strong>Secret Key</strong> từ Google</p></li>
</ol>

<h3 id="tuy-chinh-registration-form"><strong>6.3 Tùy chỉnh Registration Form</strong></h3>
<p>Với User Profile, bạn kiểm soát những fields nào hiển thị trên registration form:</p>
<ul>
<li><p>Attributes với <strong>Required for user</strong>: ON sẽ hiện trên form</p></li>
<li><p>Thứ tự hiển thị theo <strong>sort order</strong> trong User Profile configuration</p></li>
<li><p>Sử dụng <strong>attribute groups</strong> để nhóm các fields liên quan</p></li>
</ul>

<h2 id="7-impersonation"><strong>7. Impersonation</strong></h2>

<p>Impersonation cho phép admin đăng nhập "giả" dưới tên một user khác — hữu ích cho debugging và support.</p>

<h3 id="su-dung-impersonation"><strong>7.1 Sử dụng Impersonation</strong></h3>
<ol>
<li><p>Vào <strong>Users</strong> → tìm user cần impersonate</p></li>
<li><p>Click menu dropdown (kebab menu) → <strong>Impersonate</strong></p></li>
<li><p>Browser sẽ mở tab mới đăng nhập dưới tên user đó</p></li>
<li><p>Mọi actions được ghi lại trong Events với event type <code>IMPERSONATE</code></p></li>
</ol>

<h3 id="impersonation-qua-api"><strong>7.2 Impersonation qua REST API</strong></h3>
<pre><code>curl -s -X POST \
  "http://localhost:8080/admin/realms/my-company/users/$USER_ID/impersonation" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json"</code></pre>

<p><strong>Lưu ý bảo mật:</strong></p>
<ul>
<li><p>Chỉ users có role <code>impersonation</code> trong realm <code>realm-management</code> mới có thể impersonate</p></li>
<li><p>Mọi impersonation event được log — quan trọng cho audit</p></li>
<li><p>Trong production, hạn chế permission impersonation chỉ cho super admin</p></li>
</ul>

<h2 id="8-tim-kiem-va-quan-ly-users"><strong>8. Tìm kiếm và quản lý Users nâng cao</strong></h2>

<h3 id="tim-kiem-user"><strong>8.1 Tìm kiếm Users</strong></h3>
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

<h3 id="xoa-user"><strong>8.2 Xóa User</strong></h3>
<pre><code># Qua CLI
bin/kcadm.sh delete users/$USER_ID -r my-company

# Qua REST API
curl -s -X DELETE \
  "http://localhost:8080/admin/realms/my-company/users/$USER_ID" \
  -H "Authorization: Bearer $ACCESS_TOKEN"</code></pre>

<h3 id="disable-user"><strong>8.3 Disable User (thay vì xóa)</strong></h3>
<pre><code># Disable user - vẫn giữ data nhưng không cho login
bin/kcadm.sh update users/$USER_ID -r my-company -s enabled=false</code></pre>

<h3 id="bulk-operations"><strong>8.4 Bulk Operations</strong></h3>
<p>Ví dụ script tạo nhiều users từ CSV:</p>
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

<h2 id="9-personal-data-management"><strong>9. Personal Data Management</strong></h2>

<p>Keycloak hỗ trợ GDPR compliance thông qua <strong>Account Console</strong>, cho phép users:</p>
<ul>
<li><p><strong>Xem thông tin cá nhân</strong> — email, name, attributes</p></li>
<li><p><strong>Chỉnh sửa thông tin</strong> — tùy thuộc permissions trong User Profile</p></li>
<li><p><strong>Xem sessions</strong> — các phiên đăng nhập đang hoạt động</p></li>
<li><p><strong>Quản lý devices</strong> — xem và revoke thiết bị đã đăng nhập</p></li>
<li><p><strong>Xem applications</strong> — các ứng dụng đã được cấp quyền truy cập</p></li>
<li><p><strong>Xóa tài khoản</strong> — tự xóa tài khoản (nếu được phép)</p></li>
</ul>

<p>Account Console URL:</p>
<pre><code>http://localhost:8080/realms/{realm}/account</code></pre>

<p>Bật tính năng xóa tài khoản:</p>
<ol>
<li><p>Vào <strong>Authentication</strong> → <strong>Required actions</strong></p></li>
<li><p>Enable action <strong>Delete Account</strong></p></li>
<li><p>Vào <strong>Realm settings</strong> → <strong>Login</strong> → bật <strong>Delete account</strong></p></li>
</ol>

<h2 id="10-thuc-hanh"><strong>10. Bài tập thực hành</strong></h2>

<ol>
<li><p><strong>Tạo User Profile</strong> cho realm <code>my-company</code> với các custom attributes:</p>
<ul>
<li><code>phone_number</code> (required, regex validator cho format quốc tế)</li>
<li><code>department</code> (required, options: Engineering, HR, Finance, Marketing)</li>
<li><code>employee_id</code> (admin-only edit, pattern: EMP-[0-9]{4})</li>
</ul>
</li>
<li><p><strong>Tạo Group hierarchy</strong>:</p>
<ul>
<li>Engineering → Backend, Frontend, DevOps</li>
<li>Operations → HR, Finance</li>
</ul>
</li>
<li><p><strong>Tạo 5 users</strong> qua CLI, mỗi user thuộc một group khác nhau, password tạm thời</p></li>
<li><p><strong>Bật self-registration</strong> với verify email và test đăng ký</p></li>
<li><p><strong>Cấu hình password policy</strong>: min 10 chars, 1 uppercase, 1 digit, 1 special, history 5, expire 90 days</p></li>
</ol>

<h2 id="11-tong-ket"><strong>11. Tổng kết</strong></h2>

<p>Trong bài này, bạn đã học:</p>
<ul>
<li><p>Tạo và quản lý <strong>Users</strong> qua Admin Console, CLI, và REST API</p></li>
<li><p>Thiết lập <strong>Credentials</strong> và <strong>Password Policies</strong></p></li>
<li><p>Sử dụng <strong>User Profile</strong> để định nghĩa attribute schema với validators và annotations</p></li>
<li><p>Tạo <strong>Groups</strong> và <strong>sub-groups</strong> với hierarchy, attributes, và default groups</p></li>
<li><p>Cấu hình <strong>Required Actions</strong> bắt buộc cho users</p></li>
<li><p>Bật <strong>Self-Registration</strong> với reCAPTCHA</p></li>
<li><p>Sử dụng <strong>Impersonation</strong> cho debugging</p></li>
<li><p>Quản lý <strong>Personal Data</strong> cho GDPR compliance</p></li>
</ul>

<p>Bài tiếp theo sẽ hướng dẫn về <strong>Roles, Permissions và Access Control</strong> trong Keycloak.</p>
