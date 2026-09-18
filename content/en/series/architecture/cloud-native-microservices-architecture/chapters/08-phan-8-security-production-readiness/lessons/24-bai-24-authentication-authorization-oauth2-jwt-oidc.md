---
id: 019d8a22-c324-7a10-b001-a1b2c3d4e524
title: 'Lesson 24: Authentication & Authorization — OAuth2, JWT & OIDC'
slug: bai-24-authentication-authorization-oauth2-jwt-oidc
description: >-
  OAuth2 flows, JWT structure & validation, OpenID Connect, centralized auth
  with Keycloak/Auth0, token propagation in microservices, API Gateway auth
  integration, RBAC vs ABAC.
duration_minutes: 120
is_free: true
video_url: null
sort_order: 24
section_title: 'Part 8: Security & Production Readiness'
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: Cloud Native Microservices Architecture
  slug: cloud-native-microservices-architecture
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-2926" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-2926)"/>

  <!-- Decorations -->
  <g>
    <circle cx="732" cy="226" r="10" fill="#f87171" opacity="0.11"/>
    <circle cx="864" cy="118" r="26" fill="#f87171" opacity="0.07"/>
    <circle cx="996" cy="270" r="12" fill="#f87171" opacity="0.13"/>
    <circle cx="628" cy="162" r="28" fill="#f87171" opacity="0.09"/>
    <circle cx="760" cy="54" r="14" fill="#f87171" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <line x1="600" y1="186" x2="1100" y2="266" stroke="#f87171" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="216" x2="1050" y2="286" stroke="#f87171" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1071.507041555162,215.5 1071.507041555162,256.5 1036,277 1000.492958444838,256.5 1000.492958444838,215.5 1036,195" fill="none" stroke="#f87171" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#f87171"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#f87171" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f87171">🏗️ Architecture — Lesson 24</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 24: Authentication & Authorization —</tspan>
      <tspan x="60" dy="42">OAuth2, JWT & OIDC</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Cloud Native Microservices Architecture</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 8: Security & Production Readiness</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Lesson 24: Authentication & Authorization — OAuth2, JWT & OIDC](/storage/uploads/2026/03/cn-bai-24-diagram.webp)

## Introduction

Authentication and Authorization in microservices is more complex than monolith: each service needs to know "who is calling me?" and “do they have the right to do this?” — without having to check the database for each request.

**Solution**: Centralized Identity Provider (IdP) + JWT tokens — authenticate once at API Gateway, token is passed across all services.

---

## 1. Authentication vs Authorization

```
Authentication (AuthN): "Bạn là ai?"
  → Verify identity (username/password, API key, certificate)
  → Kết quả: "Đây là user John, email john@example.com"

Authorization (AuthZ): "Bạn có thể làm gì?"
  → Verify permissions (roles, scopes)
  → Kết quả: "John có role 'customer', có thể tạo và xem orders của mình"
```

---

## 2. OAuth2 — Authorization Framework

### 2.1 OAuth2 Roles

```
Resource Owner: User (người dùng cuối)
Client:         Application yêu cầu access (web app, mobile app)
Authorization Server: Keycloak/Auth0 — cấp tokens
Resource Server: API/Service chứa protected resources
```

### 2.2 Authorization Code Flow (Web Apps)

```
Browser                    Backend App             Auth Server (Keycloak)
   │                           │                           │
   │── Click Login ───────────▶│                           │
   │                           │── Redirect ──────────────▶│
   │◀─── Redirect to Login ────────────────────────────────│
   │                           │                           │
   │── Enter credentials ─────────────────────────────────▶│
   │                           │                           │
   │◀─── Redirect with code ───────────────────────────────│
   │                           │                           │
   │── Forward code ──────────▶│                           │
   │                           │── Exchange code for token▶│
   │                           │◀─ access_token + id_token─│
   │                           │                           │
   │◀─── Session created ──────│                           │
```

### 2.3 Client Credentials Flow (Service-to-Service)

```
Service A                         Auth Server
   │                                   │
   │── POST /token                     │
   │   client_id + client_secret ─────▶│
   │◀─ access_token (JWT) ─────────────│
   │                                   │
   │── API Call + Bearer token ───────▶ Service B
                                           │
                                           │── Validate JWT (signature + expiry)
                                           │── Check scopes
                                           │
                                           ▼
                                      Process request
```

### 2.4 PKCE Flow (Mobile/SPA)

No client secret (code running on the user's device cannot be kept secret):

```bash
# 1. Tạo code_verifier (random string)
code_verifier = base64url(random_bytes(32))

# 2. Tạo code_challenge
code_challenge = base64url(sha256(code_verifier))

# 3. Authorization request kèm code_challenge
GET /authorize?
  response_type=code&
  client_id=xxx&
  code_challenge=abc&
  code_challenge_method=S256

# 4. Token exchange kèm code_verifier
POST /token
  code=xxx&code_verifier=original_verifier
```

---

## 3. JWT — JSON Web Token

### 3.1 Structure

```
eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ1c2VyLTAwMSIsInJvbGVzIjpbImN1c3RvbWVyIl19.signature
└─────────────────┘ └──────────────────────────────────────────┘ └───────────┘
      Header                         Payload                       Signature

Header (Base64URL decoded):
{
  "alg": "RS256",    ← Thuật toán ký: RS256 (asymmetric) hoặc HS256 (symmetric)
  "typ": "JWT",
  "kid": "key-2024"  ← Key ID để lookup public key
}

Payload (Base64URL decoded):
{
  "sub": "user-001",              ← Subject (user ID)
  "iss": "https://auth.example.com", ← Issuer
  "aud": "order-service",         ← Audience (intended recipient)
  "exp": 1711900800,              ← Expiration time (Unix timestamp)
  "iat": 1711897200,              ← Issued At
  "jti": "abc-123-xyz",           ← JWT ID (prevent replay)
  "email": "john@example.com",
  "roles": ["customer"],
  "tenant_id": "tenant-001"      ← Custom claims
}

Signature: RS256(base64url(header) + "." + base64url(payload), private_key)
```

### 3.2 RS256 vs HS256

```
HS256 (Symmetric):
  - Ký và verify bằng cùng một secret key
  - Tất cả services cần biết secret → nguy hiểm
  - Dùng cho: monolith, internal tools

RS256 (Asymmetric):
  - Auth Server ký bằng private key (giữ bí mật)
  - Services verify bằng public key (có thể public)
  - Services KHÔNG thể forge tokens
  - Dùng cho: microservices, distributed systems

JWK Set (JWKS): Auth Server expose public keys tại /.well-known/jwks.json
Services cache và dùng để verify JWT offline
```

### 3.3 JWT Validation

```java
@Component
public class JwtValidator {
    // Cache JWKS (public keys) từ Auth Server
    @Autowired
    private JwkProvider jwkProvider;

    public Claims validate(String token) {
        // Parse header để lấy kid
        DecodedJWT jwt = JWT.decode(token);
        JwkKey key = jwkProvider.get(jwt.getKeyId());

        try {
            // Verify signature + claims
            return JWT.require(Algorithm.RSA256(key.getPublicKey(), null))
                .withIssuer("https://auth.example.com")
                .withAudience("order-service")
                .build()
                .verify(token)
                .getClaims();

        } catch (TokenExpiredException e) {
            throw new UnauthorizedException("Token expired");
        } catch (JWTVerificationException e) {
            throw new UnauthorizedException("Invalid token");
        }
    }
}
```

---

## 4. OpenID Connect (OIDC)

OAuth2 is an authorization framework. **OIDC** is the identity layer on OAuth2:

```
OAuth2 trả về: access_token (opaque, for authorization)
OIDC thêm:     id_token (JWT, contains user identity info)
               /userinfo endpoint

Ví dụ id_token:
{
  "sub": "user-001",
  "name": "John Doe",
  "email": "john@example.com",
  "email_verified": true,
  "picture": "https://...",
  "iss": "https://auth.example.com",
  "aud": "my-app",
  "exp": 1711900800
}
```

**When to use OIDC**: When you need user profile information (login, profile page). Access token is used to access APIs.

---

## 5. Keycloak — Self-hosted Identity Provider

### 5.1 Installation on Kubernetes

```yaml
helm repo add bitnami https://charts.bitnami.com/bitnami

helm upgrade --install keycloak bitnami/keycloak \
  --namespace platform \
  --set auth.adminPassword=<password> \
  --set replicaCount=2 \
  --set postgresql.enabled=true \
  --set ingress.enabled=true \
  --set ingress.hostname=auth.example.com
```

### 5.2 Realm Configuration

```json
// Realm: myapp
// Client: order-service-api (Resource Server)
{
  "clientId": "order-service-api",
  "protocol": "openid-connect",
  "bearerOnly": true,  // Chỉ accept tokens, không issue
  "defaultClientScopes": ["openid", "profile", "email"],
  "protocolMappers": [
    {
      "name": "tenant-id-mapper",
      "protocol": "openid-connect",
      "protocolMapper": "oidc-usermodel-attribute-mapper",
      "config": {
        "user.attribute": "tenant_id",
        "claim.name": "tenant_id",
        "access.token.claim": "true"
      }
    }
  ]
}
```

---

## 6. Token propagation in Microservices

### 6.1 API Gateway — Centralized authentication

```
Client ──Bearer token──▶ API Gateway
                              │
                              │ 1. Validate JWT signature
                              │ 2. Check expiry
                              │ 3. Check audience
                              │
                              │ 4. Forward token (or user info headers) → downstream services
                              │
                              ▼
                         Order Service
                              │
                              │ 5. Extract claims từ token/headers
                              │ 6. Apply RBAC logic
                              │
                              ▼
                         Process request
```

### 6.2 Kong JWT Plugin

```yaml
apiVersion: configuration.konghq.com/v1
kind: KongPlugin
metadata:
  name: jwt-auth
plugin: jwt
config:
  key_claim_name: kid
  claims_to_verify:
    - exp
    - nbf
  anonymous: null
  run_on_preflight: true
```

```yaml
# Hoặc dùng OIDC plugin
plugin: oidc
config:
  issuer: https://auth.example.com/realms/myapp
  client_id: kong-gateway
  client_secret: xxxx
  scope: openid
  bearer_only: yes
```

### 6.3 Token Forwarding vs Header Injection

**Option 1: Forward original JWT** (recommended)

```yaml
# Kong: forward original Authorization header
# Downstream service tự validate
```

Advantages: Downstream service has full claims, signature can be validated independently

**Option 2: Header Injection** (simple but less secure)

```yaml
# Kong inject parsed claims làm headers
X-Consumer-Username: john
X-Consumer-Groups: customer,admin
X-Tenant-ID: tenant-001
```

Advantage: Downstream service does not need JWT library
Disadvantage: These headers are easily forged if someone bypasses the API Gateway

---

## 7. Authorization Patterns

### 7.1 RBAC — Role-Based Access Control

```java
// Spring Security
@PreAuthorize("hasRole('ADMIN') or (hasRole('CUSTOMER') and #customerId == authentication.name)")
public Order getOrder(String orderId, String customerId) { ... }

// Hoặc Method Security
@Secured({"ROLE_ADMIN", "ROLE_MANAGER"})
public void deleteOrder(String orderId) { ... }
```

```yaml
# Kubernetes RBAC cho service-to-service (service accounts)
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: order-service-role
rules:
  - apiGroups: [""]
    resources: ["configmaps", "secrets"]
    verbs: ["get", "list"]
```

### 7.2 ABAC — Attribute-Based Access Control

```java
// Sử dụng Spring Security SpEL expression
@PreAuthorize("""
    hasRole('CUSTOMER') and
    @orderService.isOwner(#orderId, authentication.name) and
    T(java.time.LocalDate).now().isBefore(
        @orderService.getOrder(#orderId).createdAt.plusDays(30)
    )
""")
public void cancelOrder(String orderId) { ... }
```

### 7.3 OPA (Open Policy Agent) — Policy as Code

```rego
# order-policy.rego
package order

default allow = false

# Customer có thể xem order của mình
allow {
    input.action == "GET"
    input.user.roles[_] == "customer"
    input.resource.owner_id == input.user.id
}

# Admin có thể xem tất cả
allow {
    input.user.roles[_] == "admin"
    input.action == "GET"
}

# Refund chỉ trong 30 ngày
allow {
    input.action == "REFUND"
    input.user.roles[_] == "customer"
    input.resource.owner_id == input.user.id
    time.diff(input.resource.created_at, time.now_ns()) < 2592000  # 30 ngày
}
```

```java
// Gọi OPA để evaluate policy
@Service
public class AuthorizationService {
    public boolean isAllowed(String action, User user, Resource resource) {
        OpaRequest request = OpaRequest.builder()
            .input(Map.of(
                "action", action,
                "user", Map.of("id", user.getId(), "roles", user.getRoles()),
                "resource", Map.of("owner_id", resource.getOwnerId(), "created_at", resource.getCreatedAt())
            ))
            .build();

        OpaResponse response = opaClient.evaluate("order/allow", request);
        return response.getResult();
    }
}
```

---

## 8. Token Refresh & Security Considerations

### 8.1 Access Token vs Refresh Token

```
Access Token:
  - Short-lived: 5-15 phút
  - Dùng để access APIs
  - Stateless (validate offline với public key)
  - Khi bị stolen: expire sớm → damage limited

Refresh Token:
  - Long-lived: 7-30 ngày
  - Dùng để lấy access token mới
  - Stored lên Auth Server (có thể revoke)
  - Khi bị stolen: phải revoke ngay
```

### 8.2 Security Best Practices

```
□ Access token TTL: 5-15 phút (không phải 1 ngày)
□ RS256 không phải HS256 cho distributed systems
□ Validate audience (aud) claim — token không dùng được cho service khác
□ Validate issuer (iss)
□ Store tokens trong httpOnly cookies (không localStorage)
□ Refresh token rotation: mỗi lần refresh → issue token mới + revoke cũ
□ Token không chứa sensitive data (credit card, password)
□ Rate limit authentication endpoints
□ Brute force protection (lockout sau N failed attempts)
```

---

## Summary

| Concept | Purpose |
|-----------|---------|
| OAuth2 | Authorization framework (delegate access) |
| OIDC | Identity layer on OAuth2 (who the user is) |
| JWT (RS256) | Stateless token, offline verification without DB |
| JWKS | Public key endpoint for services to verify token |
| API Gateway auth | Centralized authentication, downstream receives verified claims |
| RBAC | Role-based access — simple, predictable |
| ABAC | Attribute-based — flexible, context-aware |
| OPA | Policy as code — centralized, auditable authorization |

**Next article**: Secrets Management & Container Security
