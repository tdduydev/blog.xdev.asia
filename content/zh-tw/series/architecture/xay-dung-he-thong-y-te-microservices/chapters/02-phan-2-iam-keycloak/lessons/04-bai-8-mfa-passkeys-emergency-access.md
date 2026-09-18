---
id: 019e1a40-a108-7001-d001-f0a1b2c30108
title: 第 8 課：醫療保健工作者的 MFA、萬能鑰匙和緊急通道
slug: bai-8-mfa-passkeys-emergency-access
description: >-
  部署適合醫療環境的多重身份驗證：針對醫生的 TOTP/HOTP、針對工作站的 WebAuthn/Passkeys、近距離徽章身份驗證、條件
  MFA（在內部網絡中跳過 MFA）、帶有審計跟踪的緊急訪問（打破玻璃）程序以及針對醫院共享工作站的會話管理。
duration_minutes: 150
is_free: true
video_url: null
sort_order: 8
section_title: 第 2 部分：使用 Keycloak 進行身分和存取管理
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: 建構微服務醫療保健系統 — Quarkus、PostgreSQL、符合 HIPAA 標準的 Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-9411" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-9411)"/>

  <!-- Decorations -->
  <g>
    <circle cx="957" cy="141" r="20" fill="#a78bfa" opacity="0.060000000000000005"/>
    <circle cx="814" cy="178" r="11" fill="#a78bfa" opacity="0.07"/>
    <circle cx="671" cy="215" r="32" fill="#a78bfa" opacity="0.08"/>
    <circle cx="1028" cy="252" r="23" fill="#a78bfa" opacity="0.09"/>
    <circle cx="885" cy="289" r="14" fill="#a78bfa" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <line x1="600" y1="111" x2="1100" y2="191" stroke="#a78bfa" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="141" x2="1050" y2="211" stroke="#a78bfa" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1033.5166604983954,198 1033.5166604983954,224 1011,237 988.4833395016046,224 988.4833395016046,198 1011,185" fill="none" stroke="#a78bfa" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#a78bfa"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#a78bfa" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#a78bfa">🏗️ 建築 — 第 8 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 8 課：MFA、萬能鑰匙和緊急訪問</tspan>
      <tspan x="60" dy="42">對於醫務人員</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">建構微服務醫療保健系統 — Quarkus、PostgreSQL、符合 HIPAA 標準的 Keycloak</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 2 部分：使用 Keycloak 進行身分和存取管理</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 1. MFA 醫療環境策略

![醫療保健工作者的 MFA 矩陣 — 密鑰、TOTP、緊急訪問](/storage/uploads/2026/04/healthcare-mfa-decision-matrix.webp)

### 1.1。醫院中的 MFA 挑戰

與一般企業相比，醫院有著特殊的經營環境：

|挑戰|描述 |解決方案 |
|------------|---------|------------|
| **共享工作站** |多名醫生/護士共用一台電腦|快速切換，一觸即用 |
| **回應時間** |急救需要在幾秒鐘內獲得 |有條件 MFA，鄰近徽章 |
| **醫用手套** |無法使用指紋 | WebAuthn 安全金鑰、PIN |
| **每天多次登入** |醫生每天登入30-50次| SSO + 短 MFA 記憶體 |
| **個人設備有限** |並非每個人都有智慧型手機 |硬體令牌選項 |

### 1.2。 MFA 因子矩陣

|使用者類型 |小學|中學|後備|
|------------|---------|------------|---------|
| **醫生** |密鑰/WebAuthn | TOTP應用程式|恢復代碼 |
| **護士** |近距離徽章 | PIN（6 位數）| TOTP應用程式|
| **實驗室技術** | TOTP應用程式|安全金鑰|恢復代碼 |
| **管理員** |安全金鑰| TOTP應用程式|管理員復原程式 |
| **病患入口網站** |簡訊一次性密碼 |電子郵件一次性密碼 |支援來電 |

## 2. 用於醫療保健的 Keycloak 身分驗證流程

### 2.1。條件身份驗證流程

```json
{
  "alias": "healthcare-browser-flow",
  "description": "Healthcare-specific authentication flow with conditional MFA",
  "providerId": "basic-flow",
  "topLevel": true,
  "builtIn": false,
  "authenticationExecutions": [
    {
      "authenticator": "auth-cookie",
      "requirement": "ALTERNATIVE",
      "priority": 10
    },
    {
      "authenticator": "identity-provider-redirector",
      "requirement": "ALTERNATIVE",
      "priority": 20
    },
    {
      "flowAlias": "healthcare-forms",
      "requirement": "ALTERNATIVE",
      "priority": 30
    }
  ]
}
```

### 2.2。醫療保健表格子流程

```
healthcare-forms (ALTERNATIVE)
├── Username/Password Form (REQUIRED)
│
├── healthcare-mfa-conditional (CONDITIONAL)
│   ├── Condition: User Role = "patient"
│   │   → SMS OTP Authenticator (REQUIRED)
│   │
│   ├── Condition: IP NOT in 10.0.0.0/8 (external access)
│   │   → WebAuthn Authenticator (REQUIRED)
│   │
│   ├── Condition: User has configured WebAuthn
│   │   → WebAuthn Passwordless (ALTERNATIVE)
│   │
│   └── Condition: Default (internal network)
│       → OTP Form (CONDITIONAL - only if configured)
│
└── healthcare-session-note (REQUIRED)
    → Set session attributes (department, hospital)
```

### 2.3。 Keycloak 條件 OTP 配置

```json
{
  "alias": "conditional-mfa-healthcare",
  "description": "MFA required for external access, optional for internal",
  "authenticationExecutions": [
    {
      "authenticator": "conditional-user-configured",
      "requirement": "REQUIRED",
      "priority": 10
    },
    {
      "authenticator": "auth-conditional-otp-form",
      "requirement": "REQUIRED",
      "priority": 20,
      "authenticatorConfig": {
        "alias": "healthcare-otp-config",
        "config": {
          "forceOtpRole": "require_mfa",
          "skipOtpRole": "skip_internal_mfa",
          "noOtpRequiredForHeaderPattern": "",
          "otpControlAttribute": "mfa_required",
          "defaultOtpOutcome": "force"
        }
      }
    }
  ]
}
```

## 3. 用於醫療保健的 WebAuthn / 金鑰

### 3.1。 Keycloak WebAuthn 配置

```json
{
  "webAuthnPolicyRpEntityName": "Healthcare Platform",
  "webAuthnPolicyRpId": "hospital.vn",
  "webAuthnPolicySignatureAlgorithms": ["ES256", "RS256"],
  "webAuthnPolicyAttestationConveyancePreference": "direct",
  "webAuthnPolicyAuthenticatorAttachment": "cross-platform",
  "webAuthnPolicyRequireResidentKey": "Yes",
  "webAuthnPolicyUserVerificationRequirement": "preferred",
  "webAuthnPolicyCreateTimeout": 60,
  "webAuthnPolicyAvoidSameAuthenticatorRegister": true,

  "webAuthnPolicyPasswordlessRpEntityName": "Healthcare Platform",
  "webAuthnPolicyPasswordlessRpId": "hospital.vn",
  "webAuthnPolicyPasswordlessSignatureAlgorithms": ["ES256"],
  "webAuthnPolicyPasswordlessAuthenticatorAttachment": "platform",
  "webAuthnPolicyPasswordlessRequireResidentKey": "Yes",
  "webAuthnPolicyPasswordlessUserVerificationRequirement": "required"
}
```

### 3.2。支援的醫院身份驗證器

```
┌─────────────────────────────────────────────────────┐
│           Recommended Security Keys                  │
├─────────────────────┬───────────────────────────────┤
│ YubiKey 5 NFC       │ • USB-A/C + NFC              │
│                     │ • FIDO2/WebAuthn + TOTP       │
│                     │ • Ideal for doctors (mobile)  │
├─────────────────────┼───────────────────────────────┤
│ YubiKey 5C Nano     │ • Ultra-compact USB-C         │
│                     │ • Leave in workstation         │
│                     │ • Ideal for nurse stations    │
├─────────────────────┼───────────────────────────────┤
│ Feitian BioPass     │ • Built-in fingerprint        │
│                     │ • USB-A                        │
│                     │ • Ideal for admin              │
├─────────────────────┼───────────────────────────────┤
│ Platform Passkeys   │ • Windows Hello / Touch ID     │
│                     │ • No hardware needed           │
│                     │ • Ideal for personal devices   │
└─────────────────────┴───────────────────────────────┘
```

## 4. 共享工作站的會話管理

### 4.1。快速會話切換

```java
// Quarkus endpoint for fast user switching
@Path("/api/v1/session")
public class SessionResource {

    @Inject
    SecurityIdentity identity;

    @POST
    @Path("/switch")
    @PermitAll
    public Response switchUser(@HeaderParam("X-Smart-Card-ID") String smartCardId) {
        // Validate smart card / proximity badge
        if (smartCardId == null || smartCardId.isEmpty()) {
            return Response.status(400)
                .entity(Map.of("error", "Smart card ID required"))
                .build();
        }

        // Redirect to Keycloak with kc_idp_hint for smart card IDP
        URI redirectUri = UriBuilder
            .fromUri("https://keycloak.hospital.vn/realms/healthcare/protocol/openid-connect/auth")
            .queryParam("client_id", "his-web-app")
            .queryParam("response_type", "code")
            .queryParam("scope", "openid")
            .queryParam("kc_idp_hint", "smart-card")
            .queryParam("login_hint", smartCardId)
            .queryParam("prompt", "login")  // Force re-auth
            .build();

        return Response.temporaryRedirect(redirectUri).build();
    }

    @POST
    @Path("/lock")
    @Authenticated
    public Response lockSession() {
        // Lock current session (require re-auth on next access)
        // Audit log: session locked
        auditService.log("SESSION_LOCK", identity.getPrincipal().getName());

        return Response.ok(Map.of(
            "status", "locked",
            "message", "Session locked. Re-authentication required."
        )).build();
    }
}
```

### 4.2。自動登出配置

```properties
# application.properties - Session timeouts for healthcare
# Clinical workstations: short idle timeout
quarkus.oidc.token.age=300
quarkus.oidc.token.refresh-token-time-skew=30

# Force re-authentication for sensitive operations
quarkus.oidc.authentication.session-age-extension=0

# Session cookie settings
quarkus.http.auth.session.cookie-name=__Host-healthcare_session
quarkus.http.auth.session.cookie-secure=true
quarkus.http.auth.session.cookie-http-only=true
quarkus.http.auth.session.cookie-same-site=Strict
```

## 5. 感應徽章認證

### 5.1。大樓

```
┌──────────┐    BLE/NFC    ┌──────────────┐    HTTPS    ┌──────────┐
│ Badge    │ ────────────▶ │  Badge       │ ──────────▶ │ Keycloak │
│ Reader   │               │  Auth Service│              │          │
└──────────┘               └──────────────┘              └──────────┘
                                  │
                           ┌──────▼──────┐
                           │ Map badge   │
                           │ ID to user  │
                           │ account     │
                           └──────┬──────┘
                                  │
                           ┌──────▼──────┐
                           │ Issue       │
                           │ auth token  │
                           │ (time-      │
                           │ limited)    │
                           └─────────────┘
```

### 5.2。徽章認證 SPI

```java
// Custom Keycloak Authenticator SPI for proximity badge
public class BadgeAuthenticator implements Authenticator {

    @Override
    public void authenticate(AuthenticationFlowContext context) {
        String badgeId = context.getHttpRequest()
            .getHttpHeaders()
            .getHeaderString("X-Badge-ID");

        if (badgeId == null) {
            // Show badge scan prompt
            context.challenge(
                context.form()
                    .setAttribute("realm", context.getRealm())
                    .createForm("badge-scan.ftl")
            );
            return;
        }

        // Look up user by badge ID attribute
        UserModel user = context.getSession().users()
            .searchForUserByUserAttributeStream(
                context.getRealm(), "badgeId", badgeId)
            .findFirst()
            .orElse(null);

        if (user == null) {
            context.failureChallenge(
                AuthenticationFlowError.INVALID_CREDENTIALS,
                context.form().setError("Badge not recognized")
                    .createForm("badge-scan.ftl")
            );
            return;
        }

        // Badge alone is first factor — require PIN as second factor
        context.setUser(user);
        context.success();
    }

    @Override
    public void action(AuthenticationFlowContext context) {
        // Handle badge ID from form submission
        MultivaluedMap<String, String> formData =
            context.getHttpRequest().getDecodedFormParameters();
        String badgeId = formData.getFirst("badgeId");

        if (badgeId != null) {
            context.getHttpRequest().getHttpHeaders()
                .getRequestHeaders().putSingle("X-Badge-ID", badgeId);
            authenticate(context);
        }
    }

    @Override
    public boolean requiresUser() { return false; }

    @Override
    public boolean configuredFor(KeycloakSession session,
            RealmModel realm, UserModel user) { return true; }
}
```

## 6. 復原程序

### 6.1。醫療保健帳戶恢復流程

```
Scenario 1: Bác sĩ quên password + mất phone (TOTP)
─────────────────────────────────────────────────────
1. Bác sĩ contact IT Help Desk (phone + employee ID verify)
2. Help Desk officer verifies identity (employee ID, department, manager confirm)
3. Help Desk issues temporary password via sealed envelope / secure channel
4. Doctor logs in → forced password change + MFA re-enrollment
5. Audit: recovery event logged, previous MFA devices revoked

Scenario 2: Emergency access khi Keycloak down
────────────────────────────────────────────────
1. Activate emergency access mode (requires 2 admin approvals)
2. Local authentication fallback (pre-provisioned local accounts)
3. All actions logged to local file → synced when Keycloak recovers
4. Emergency period limited to 4 hours
5. Post-incident: full audit review required
```

## 7. 總結

在本課中，我們有：

- 分析醫院環境中具體的 **MFA 挑戰**
- 為每種類型的醫務人員設計合適的 **MFA 策略**
- 在Keycloak中設定**條件驗證流程**（跳過內部網路上的MFA）
- 為臨床工作站部署 **WebAuthn/Passkeys**
- 為共用工作站建置**快速會話切換**
- 實施**接近徽章身份驗證** SPI
- 設計醫療保健**恢復程序**

## 練習

1. 使用條件 MFA 設定 Keycloak 驗證流程（內部與外部網路）
2. 註冊WebAuthn安全金鑰並測試登入密碼
3. 臨床工作站閒置10分鐘後自動註銷
4. 編寫緊急存取程序文檔

---

---

<!-- SERIES-NAV:START -->
| ◀ 上一篇 |下一篇文章 ▶ |
|:---|---:|
| [第 7 課：FHIR 上的 SMART - 用於醫療保健 API 的 OAuth2/OIDC](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-7-smart-on-fhir-oauth2-oidc-healthcare-apis) | [第9課：PostgreSQL安全加強-綜合安全配置](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-9-postgresql-security-hardening-toan-dien) |
<!-- SERIES-NAV:END -->
