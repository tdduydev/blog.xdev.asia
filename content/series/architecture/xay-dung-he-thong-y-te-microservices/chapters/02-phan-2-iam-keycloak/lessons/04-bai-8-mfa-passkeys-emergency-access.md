---
id: 019e1a40-a108-7001-d001-f0a1b2c30108
title: 'Bài 8: MFA, Passkeys & Emergency Access cho Nhân viên Y tế'
slug: bai-8-mfa-passkeys-emergency-access
description: >-
  Triển khai Multi-Factor Authentication phù hợp môi trường y tế:
  TOTP/HOTP cho bác sĩ, WebAuthn/Passkeys cho workstations, proximity
  badge authentication, conditional MFA (skip MFA trong mạng nội bộ),
  Emergency Access (break-the-glass) procedure với audit trail,
  và Session Management cho shared workstations trong bệnh viện.
duration_minutes: 150
is_free: true
video_url: null
sort_order: 8
section_title: "Phần 2: Identity & Access Management với Keycloak"
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: Xây dựng Hệ thống Y tế Microservices — Quarkus, PostgreSQL, Keycloak chuẩn HIPAA
  slug: xay-dung-he-thong-y-te-microservices
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#a78bfa">🏗️ Kiến trúc — Bài 8</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 8: MFA, Passkeys &amp; Emergency Access</tspan>
      <tspan x="60" dy="42">cho Nhân viên Y tế</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Xây dựng Hệ thống Y tế Microservices — Quarkus, PostgreSQL, Keycloak chuẩn HIPAA</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 2: Identity &amp; Access Management với Keycloak</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. MFA Strategy cho Môi trường Y Tế

![Ma trận MFA cho nhân viên y tế — Passkeys, TOTP, Emergency Access](/storage/uploads/2026/04/healthcare-mfa-decision-matrix.webp)

### 1.1. Thách thức MFA trong Bệnh viện

Bệnh viện có môi trường vận hành đặc biệt so với doanh nghiệp thông thường:

| Thách thức | Mô tả | Giải pháp |
|-----------|-------|-----------|
| **Shared workstations** | Nhiều bác sĩ/y tá dùng chung máy tính | Fast switching, tap-and-go |
| **Thời gian phản hồi** | Cấp cứu cần truy cập trong giây | Conditional MFA, proximity badge |
| **Găng tay y tế** | Không thể dùng fingerprint | WebAuthn security key, PIN |
| **Nhiều lần đăng nhập/ngày** | Bác sĩ đăng nhập 30-50 lần/ngày | SSO + short MFA memory |
| **Thiết bị cá nhân hạn chế** | Không phải ai cũng có smartphone | Hardware token option |

### 1.2. MFA Factor Matrix

| User Type | Primary | Secondary | Fallback |
|-----------|---------|-----------|----------|
| **Doctor** | Passkey / WebAuthn | TOTP App | Recovery codes |
| **Nurse** | Proximity Badge | PIN (6 digits) | TOTP App |
| **Lab Tech** | TOTP App | Security Key | Recovery codes |
| **Admin** | Security Key | TOTP App | Admin recovery procedure |
| **Patient Portal** | SMS OTP | Email OTP | Support call |

## 2. Keycloak Authentication Flow cho Y Tế

### 2.1. Conditional Authentication Flow

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

### 2.2. Healthcare Forms Sub-flow

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

### 2.3. Keycloak Conditional OTP Configuration

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

## 3. WebAuthn / Passkeys cho Y Tế

### 3.1. Keycloak WebAuthn Configuration

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

### 3.2. Supported Authenticators cho Bệnh viện

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

## 4. Session Management cho Shared Workstations

### 4.1. Fast Session Switching

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

### 4.2. Auto-Logoff Configuration

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

## 5. Proximity Badge Authentication

### 5.1. Architecture

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

### 5.2. Badge Authentication SPI

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

## 6. Recovery Procedures

### 6.1. Account Recovery flow cho Y Tế

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

## 7. Tổng kết

Trong bài học này, chúng ta đã:

- Phân tích **thách thức MFA** đặc thù trong môi trường bệnh viện
- Thiết kế **MFA strategy** phù hợp cho từng loại nhân viên y tế
- Cấu hình **Conditional Authentication Flow** trong Keycloak (skip MFA trên mạng nội bộ)
- Triển khai **WebAuthn/Passkeys** cho clinical workstations
- Xây dựng **Fast Session Switching** cho shared workstations
- Implement **Proximity Badge Authentication** SPI
- Thiết kế **Recovery Procedures** cho y tế

## Bài tập

1. Cấu hình Keycloak authentication flow với conditional MFA (internal vs external network)
2. Register WebAuthn security key và test passkey login
3. Implement auto-logoff sau 10 phút idle cho clinical workstations
4. Viết documentation cho Emergency Access procedure

---

---

<!-- SERIES-NAV:START -->
| ◀ Bài trước | Bài tiếp theo ▶ |
|:---|---:|
| [Bài 7: SMART on FHIR - OAuth2/OIDC cho Healthcare APIs](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-7-smart-on-fhir-oauth2-oidc-healthcare-apis) | [Bài 9: PostgreSQL Security Hardening - Cấu hình Bảo mật Toàn diện](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-9-postgresql-security-hardening-toan-dien) |
<!-- SERIES-NAV:END -->
