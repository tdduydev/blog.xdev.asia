---
id: 019d8b30-b104-7001-c001-e0c5f8100104
title: 'Lesson 4: Managing Users, Groups and User Profile'
slug: bai-4-quan-ly-users-groups-va-user-profile
description: Create and manage Users, set credentials, user attributes schema, User Profile configuration, custom attributes and validators, create Groups and sub-groups, group attributes, group role mappings, user self-registration, required actions, impersonation and personal data management.
duration_minutes: 150
is_free: true
video_url: null
sort_order: 4
section_title: 'Part 1: Keycloak Platform'
course:
  id: 019d8b30-b100-7001-c001-e0c5f8100001
  title: Keycloak from Basic to Advanced
  slug: keycloak-tu-co-ban-den-nang-cao
locale: en
---
<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/03/keycloak-users-groups-roles-2026.webp" alt="Keycloak Users, Groups, Roles Hierarchy" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Users, Groups and Roles hierarchical model in Keycloak Realm</em></p>
</div>

<h2 id="1-quan-ly-users"><strong>1. Managing Users</strong></h2>

<p>Users is the central entity of Keycloak — representing users who can log into the system. Each user belongs to a specific realm and can have attributes, credentials, roles, and group memberships.</p>

<h3 id="tao-user-qua-admin-console"><strong>1.1 Create User via Admin Console</strong></h3>
<ol>
<li><p>Select realm (e.g. <code>my-company</code>) from realm selector</p></li>
<li><p>Click <strong>Users</strong> trong sidebar</p></li>
<li><p>Click <strong>Add user</strong></p></li>
<li><p>Fill in information:</p>
<ul>
<li><strong>Username</strong>: <code>john.doe</code> (required)</li>
<li><strong>Email</strong>: <code>john.doe@mycompany.com</code></li>
<li><strong>First name</strong>: <code>John</code></li>
<li><strong>Last name</strong>: <code>Doe</code></li>
<li><strong>Email verified</strong>: ON (if email verified)</li>
<li><strong>Enabled</strong>: ON</li>
</ul>
</li>
<li><p>Click <strong>Create</strong></p></li>
</ol>

<h3 id="tao-user-qua-cli"><strong>1.2 Create User via Admin CLI</strong></h3>
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

<h3 id="tao-user-qua-api"><strong>1.3 Create User via REST API</strong></h3>
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

<h2 id="2-thiet-lap-credentials"><strong>2. Set Credentials</strong></h2>

<h3 id="dat-mat-khau-qua-admin-console"><strong>2.1 Set password via Admin Console</strong></h3>
<ol>
<li><p>Go to <strong>Users</strong> → select user → tab <strong>Credentials</strong></p></li>
<li><p>Click <strong>Set password</strong></p></li>
<li><p>Enter new password</p></li>
<li><p><strong>Temporary</strong>: ON (user must change password when logging in for the first time) or OFF (fixed password)</p></li>
<li><p>Click <strong>Save</strong></p></li>
</ol>

<h3 id="dat-mat-khau-qua-cli"><strong>2.2 Set password via CLI</strong></h3>
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

<h3 id="dat-mat-khau-qua-api"><strong>2.3 Set password via REST API</strong></h3>
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
<p>Configure password policies for realm at <strong>Authentication</strong> → <strong>Policies</strong> → <strong>Password policy</strong>:</p>
<table>
<thead>
<tr><th>Policy</th><th>Description</th><th>Example value</th></tr>
</thead>
<tbody>
<tr><td>Minimum length</td><td>Minimum length</td><td>8</td></tr>
<tr><td>Uppercase characters</td><td>Uppercase characters required</td><td>1</td></tr>
<tr><td>Lowercase characters</td><td>Lowercase characters required</td><td>1</td></tr>
<tr><td>Digits</td><td>Request number</td><td>1</td></tr>
<tr><td>Special characters</td><td>Special characters required</td><td>1</td></tr>
<tr><td>Not username</td><td>Password must not be the same as username</td><td>-</td></tr>
<tr><td>Not email</td><td>Password must not match email</td><td>-</td></tr>
<tr><td>Password history</td><td>Do not reuse old password</td><td>3</td></tr>
<tr><td>Expire password</td><td>Password expiration time (days)</td><td>90</td></tr>
<tr><td>Hashing algorithm</td><td>Algorithm hash password</td><td>argon2</td></tr>
<tr><td>Hashing iterations</td><td>Number of hashing rounds</td><td>5 (argon2)</td></tr>
</tbody>
</table>

<p>Configuration via CLI:</p>
<pre><code>bin/kcadm.sh update realms/my-company \
  -s 'passwordPolicy="length(8) and upperCase(1) and lowerCase(1) and digits(1) and specialChars(1) and notUsername and passwordHistory(3)"'</code></pre>

<h2 id="3-user-profile"><strong>3. User Profile</strong></h2>

<p><strong>User Profile</strong> is a feature that allows administrators to define a schema for user attributes — controlling which attributes users have, how they are validated, and how they are displayed on the interface.</p>

<h3 id="bat-user-profile"><strong>3.1 Enable User Profile</strong></h3>
<p>From Keycloak 24+, User Profile is enabled by default. For older versions:</p>
<ol>
<li><p>Go to <strong>Realm settings</strong> → <strong>General</strong></p></li>
<li><p>Find <strong>User profile enabled</strong>: ON</p></li>
</ol>

<p>Once enabled, access <strong>Realm settings</strong> → <strong>User profile</strong> to configure.</p>

<h3 id="attribute-schema"><strong>3.2 Definition of Attribute Schema</strong></h3>
<p>Each attribute has the following configurations:</p>
<ul>
<li><p><strong>Name</strong> — attribute name (lowercase, used for API)</p></li>
<li><p><strong>Display name</strong> — UI display name (i18n support: <code>${profile.attribute.department}</code>)</p></li>
<li><p><strong>Permissions</strong> — who can view/edit (admin, user)</p></li>
<li><p><strong>Validations</strong> — rules validate value</p></li>
<li><p><strong>Annotations</strong> — metadata cho UI rendering</p></li>
<li><p><strong>Required</strong> — required for users, admins, or both</p></li>
<li><p><strong>Multivalued</strong> — allows multiple values</p></li>
</ul>

<h3 id="built-in-attributes"><strong>3.3 Built-in Attributes</strong></h3>
<p>Keycloak has available attributes:</p>
<table>
<thead>
<tr><th>Attribute</th><th>Description</th><th>Default</th></tr>
</thead>
<tbody>
<tr><td>username</td><td>Username</td><td>Required, unique</td></tr>
<tr><td>email</td><td>Email address</td><td>Required (can be turned off)</td></tr>
<tr><td>firstName</td><td>Name</td><td>Required</td></tr>
<tr><td>lastName</td><td>LastName</td><td>Required</td></tr>
</tbody>
</table>

<h3 id="tao-custom-attribute"><strong>3.4 Create Custom Attribute</strong></h3>
<p>Example of creating attribute <code>phone_number</code>:</p>
<ol>
<li><p>Go to <strong>Realm settings</strong> → <strong>User profile</strong></p></li>
<li><p>Click <strong>Create attribute</strong></p></li>
<li><p>Configuration:</p>
<ul>
<li><strong>Name</strong>: <code>phone_number</code></li>
<li><strong>Display name</strong>: <code>Phone Number</code></li>
<li><strong>Attribute group</strong>: (select or create new)</li>
<li><strong>Enabled when</strong>: Always</li>
<li><strong>Required</strong>: Required for user</li>
</ul>
</li>
</ol>

<h3 id="validators"><strong>3.5 Validators</strong></h3>
<p>Keycloak provides many validators to check attribute values:</p>
<table>
<thead>
<tr><th>Validator</th><th>Description</th><th>Example configuration</th></tr>
</thead>
<tbody>
<tr><td>length</td><td>Length limit</td><td>min: 3, max: 50</td></tr>
<tr><td>email</td><td>Check email format</td><td>-</td></tr>
<tr><td>pattern</td><td>Check regex pattern</td><td>^\\+[0-9]{10,15}$</td></tr>
<tr><td>integer</td><td>Integer check</td><td>min: 0, max: 999999</td></tr>
<tr><td>double</td><td>Check real number</td><td>min: 0.0, max: 100.0</td></tr>
<tr><td>uri</td><td>Check valid URL</td><td>-</td></tr>
<tr><td>options</td><td>Limit value in list</td><td>["vn","us","jp"]</td></tr>
<tr><td>person-name-prohibited-characters</td><td>Prohibit special characters in name</td><td>-</td></tr>
<tr><td>username-prohibited-characters</td><td>Prohibit special characters in username</td><td>-</td></tr>
<tr><td>multivalued</td><td>Validate quantity values</td><td>min: 1, max: 5</td></tr>
</tbody>
</table>

<p>Example configuration of attribute <code>phone_number</code> via JSON (User Profile tab → JSON editor):</p>
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
<p>Annotations allows customizing how attributes are displayed on registration/account page:</p>
<table>
<thead>
<tr><th>Annotation</th><th>Description</th><th>Value</th></tr>
</thead>
<tbody>
<tr><td>inputType</td><td>HTML input type</td><td>text, email, tel, number, date, select, multiselect, textarea, html5-*</td></tr>
<tr><td>inputHelperTextBefore</td><td>Helper text displayed before input</td><td>String text</td></tr>
<tr><td>inputHelperTextAfter</td><td>Helper text displayed after input</td><td>String text</td></tr>
<tr><td>inputOptionsFromValidation</td><td>Get options from validator</td><td>Validation name (e.g. "options")</td></tr>
</tbody>
</table>

<h3 id="progressive-profiling"><strong>3.7 Progressive Profiling</strong></h3>
<p>Progressive profiling allows collecting user information gradually instead of asking for it all upon registration:</p>
<ol>
<li><p>Create attribute with <strong>Required</strong> → <strong>Required for user</strong>: ON</p></li>
<li><p>When the user logs in, if the attribute does not have a value, Keycloak will display a form asking to fill in</p></li>
<li><p>Combined with <strong>"Enabled when" scopes</strong> — only requires attribute when client requests specific scope</p></li>
</ol>

<p>For example: Attribute <code>phone_number</code> is only required when the client requests scope <code>phone</code>:</p>
<pre><code>{
  "name": "phone_number",
  "required": {
    "roles": ["user"],
    "scopes": ["phone"]
  }
}</code></pre>

<h2 id="4-groups"><strong>4. Groups and Sub-groups</strong></h2>

<p>Groups helps organize users and apply roles and attributes to groups of users at once — instead of assigning individual users.</p>

<h3 id="tao-group-qua-admin-console"><strong>4.1 Create Group via Admin Console</strong></h3>
<ol>
<li><p>Click <strong>Groups</strong> trong sidebar</p></li>
<li><p>Click <strong>Create group</strong></p></li>
<li><p>Enter <strong>Name</strong>: <code>Engineering</code></p></li>
<li><p>Click <strong>Create</strong></p></li>
</ol>

<h3 id="tao-sub-group"><strong>4.2 Create Sub-group</strong></h3>
<p>Sub-groups inherit attributes and role mappings from parent group:</p>
<ol>
<li><p>Click on group <code>Engineering</code></p></li>
<li><p>Click <strong>Create sub-group</strong></p></li>
<li><p>Enter name: <code>Backend</code>, <code>Frontend</code>, <code>DevOps</code></p></li>
</ol>

<p>Group structure example:</p>
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

<h3 id="tao-group-qua-cli"><strong>4.3 Create Group via CLI</strong></h3>
<pre><code># Tạo top-level group
bin/kcadm.sh create groups -r my-company -s name="Engineering"

# Lấy group ID
GROUP_ID=$(bin/kcadm.sh get groups -r my-company --fields id,name | jq -r '.[] | select(.name=="Engineering") | .id')

# Tạo sub-group
bin/kcadm.sh create groups/$GROUP_ID/children -r my-company -s name="Backend"
bin/kcadm.sh create groups/$GROUP_ID/children -r my-company -s name="Frontend"
bin/kcadm.sh create groups/$GROUP_ID/children -r my-company -s name="DevOps"</code></pre>

<h3 id="group-attributes"><strong>4.4 Group Attributes</strong></h3>
<p>Groups can contain key-value attributes — useful for metadata, group configuration:</p>
<pre><code># Thêm attributes cho group
bin/kcadm.sh update groups/$GROUP_ID -r my-company \
  -s 'attributes={"cost_center":["CC-ENG-001"],"location":["HCM","HN"]}'</code></pre>

<p>Via Admin Console: Click on group → tab <strong>Attributes</strong> → add key-value pairs.</p>

<h3 id="them-user-vao-group"><strong>4.5 Add User to Group</strong></h3>
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
<p>Default groups automatically add new users when creating an account or registering:</p>
<ol>
<li><p>Enter <strong>Groups</strong></p></li>
<li><p>Select the group to set as default</p></li>
<li><p>Or go to <strong>Realm settings</strong> → <strong>User registration</strong> → <strong>Default groups</strong></p></li>
</ol>

<pre><code># Qua CLI
bin/kcadm.sh update realms/my-company -s 'defaultGroups=["/Engineering/Backend"]'</code></pre>

<h2 id="5-required-actions"><strong>5. Required Actions</strong></h2>

<p>Required Actions are actions that the user must perform before being able to log in successfully.</p>

<h3 id="danh-sach-required-actions"><strong>5.1 List of available Required Actions</strong></h3>
<table>
<thead>
<tr><th>Action</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td>Update Password</td><td>Required password change</td></tr>
<tr><td>Verify Email</td><td>Verify email</td></tr>
<tr><td>Configure OTP</td><td>Set OTP (TOTP/HOTP)</td></tr>
<tr><td>Update Profile</td><td>Update personal information</td></tr>
<tr><td>Terms and Conditions</td><td>Accept terms of use</td></tr>
<tr><td>Configure WebAuthn</td><td>Register WebAuthn device</td></tr>
<tr><td>Update User Locale</td><td>Select language</td></tr>
<tr><td>Delete Credential</td><td>Delete old credential</td></tr>
</tbody>
</table>

<h3 id="gan-required-action-cho-user"><strong>5.2 Assign Required Action to User</strong></h3>
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
<p>Configure default required actions for all new users at <strong>Authentication</strong> → <strong>Required actions</strong>:</p>
<ul>
<li><p>Enable column <strong>Set as default action</strong> for desired action</p></li>
<li><p>All new users will automatically be assigned default actions</p></li>
</ul>

<h2 id="6-user-self-registration"><strong>6. User Self-Registration</strong></h2>

<h3 id="bat-self-registration"><strong>6.1 Enable Self-Registration</strong></h3>
<ol>
<li><p>Go to <strong>Realm settings</strong> → <strong>Login</strong></p></li>
<li><p>On <strong>User registration</strong>: ON</p></li>
<li><p>The login page will display the "Register" link</p></li>
</ol>

<h3 id="recaptcha"><strong>6.2 reCAPTCHA cho Registration</strong></h3>
<p>To protect registration form from bots, enable reCAPTCHA:</p>
<ol>
<li><p>Sign up for Google reCAPTCHA at <a href="__P0__">https://www.google.com/recaptcha</a></p></li>
<li><p>Enter <strong>Authentication</strong> → <strong>Flows</strong> → <strong>Registration</strong></p></li>
<li><p>Find step <strong>reCAPTCHA</strong> → switch from Disabled to <strong>Required</strong></p></li>
<li><p>Click gear icon → enter <strong>Site Key</strong> and <strong>Secret Key</strong> from Google</p></li>
</ol>

<h3 id="tuy-chinh-registration-form"><strong>6.3 Customize Registration Form</strong></h3>
<p>With User Profile, you control which fields are displayed on the registration form:</p>
<ul>
<li><p>Attributes with <strong>Required for user</strong>: ON will appear on form</p></li>
<li><p>Display order according to <strong>sort order</strong> in User Profile configuration</p></li>
<li><p>Use <strong>attribute groups</strong> to group related fields</p></li>
</ul>

<h2 id="7-impersonation"><strong>7. Impersonation</strong></h2>

<p>Impersonation allows admins to "fake" login under another user name — useful for debugging and support.</p>

<h3 id="su-dung-impersonation"><strong>7.1 Using Impersonation</strong></h3>
<ol>
<li><p>Go to <strong>Users</strong> → find the user you need to impersonate</p></li>
<li><p>Click menu dropdown (kebab menu) → <strong>Impersonate</strong></p></li>
<li><p>Browser will open a new tab to log in under that user name</p></li>
<li><p>All actions recorded in Events with event type <code>IMPERSONATE</code></p></li>
</ol>

<h3 id="impersonation-qua-api"><strong>7.2 Impersonation qua REST API</strong></h3>
<pre><code>curl -s -X POST \
  "http://localhost:8080/admin/realms/my-company/users/$USER_ID/impersonation" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json"</code></pre>

<p><strong>Security note:</strong></p>
<ul>
<li><p>Only users with role <code>impersonation</code> in realm <code>realm-management</code> can impersonate</p></li>
<li><p>All impersonation events are logged — important for audit</p></li>
<li><p>In production, limit impersonation permission to only super admin</p></li>
</ul>

<h2 id="8-tim-kiem-va-quan-ly-users"><strong>8. Search and manage advanced Users</strong></h2>

<h3 id="tim-kiem-user"><strong>8.1 Search Users</strong></h3>
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

<h3 id="xoa-user"><strong>8.2 Delete User</strong></h3>
<pre><code># Qua CLI
bin/kcadm.sh delete users/$USER_ID -r my-company

# Qua REST API
curl -s -X DELETE \
  "http://localhost:8080/admin/realms/my-company/users/$USER_ID" \
  -H "Authorization: Bearer $ACCESS_TOKEN"</code></pre>

<h3 id="disable-user"><strong>8.3 Disable User (instead of deleting)</strong></h3>
<pre><code># Disable user - vẫn giữ data nhưng không cho login
bin/kcadm.sh update users/$USER_ID -r my-company -s enabled=false</code></pre>

<h3 id="bulk-operations"><strong>8.4 Bulk Operations</strong></h3>
<p>Example script to create multiple users from CSV:</p>
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

<p>Keycloak supports GDPR compliance through <strong>Account Console</strong>, allowing users:</p>
<ul>
<li><p><strong>View personal information</strong> — email, name, attributes</p></li>
<li><p><strong>Edit information</strong> — depends on permissions in User Profile</p></li>
<li><p><strong>View sessions</strong> — active login sessions</p></li>
<li><p><strong>Manage devices</strong> — view and revoke logged in devices</p></li>
<li><p><strong>View applications</strong> — applications that have been granted access</p></li>
<li><p><strong>Delete account</strong> — manually delete account (if allowed)</p></li>
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
