---
id: 019e1a40-a113-7001-d001-f0a1b2c30113
title: 第 13 課：Quarkus 安全性 — OIDC、JWT 傳播與 RBAC
slug: bai-13-quarkus-security-oidc-jwt-rbac
description: >-
  為醫療保健微服務部署 Quarkus Security：帶有 Keycloak 的 quarkus-oidc 擴展、服務之間的 JWT
  令牌傳播、SecurityIdentity 和自定義增強器、@RolesAllowed/@PermissionsAllowed
  註釋、編程安全檢查以及用於多醫院部署的多租戶 OIDC 配置。
duration_minutes: 180
is_free: true
video_url: null
sort_order: 13
section_title: 第 4 部分：使用 Quarkus 建構微服務
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: 建構微服務醫療保健系統 — Quarkus、PostgreSQL、符合 HIPAA 標準的 Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-8020" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-8020)"/>

  <!-- Decorations -->
  <g>
    <circle cx="988" cy="134" r="16" fill="#fbbf24" opacity="0.09"/>
    <circle cx="876" cy="82" r="20" fill="#fbbf24" opacity="0.13"/>
    <circle cx="764" cy="30" r="24" fill="#fbbf24" opacity="0.07"/>
    <circle cx="652" cy="238" r="28" fill="#fbbf24" opacity="0.11"/>
    <circle cx="1040" cy="186" r="32" fill="#fbbf24" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <line x1="600" y1="74" x2="1100" y2="154" stroke="#fbbf24" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="104" x2="1050" y2="174" stroke="#fbbf24" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1049.1147367097487,209.5 1049.1147367097487,238.5 1024,253 998.8852632902513,238.5 998.8852632902513,209.5 1024,195" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fbbf24"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fbbf24" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ 建築 — 第 13 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 13 課：Quarkus 安全 — OIDC、JWT</tspan>
      <tspan x="60" dy="42">傳播和 RBAC</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">建構微服務醫療保健系統 — Quarkus、PostgreSQL、符合 HIPAA 標準的 Keycloak</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 4 部分：使用 Quarkus 建構微服務</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 1. Quarkus 安全架構概述

![Quarkus Security Stack — OIDC, JWT Propagation, RBAC cho Healthcare Microservices](/storage/uploads/2026/04/healthcare-quarkus-security-stack.webp)

Quarkus 提供了一個整合的**安全框架**，其中包含許多支援身份驗證、授權和身分管理的擴充功能。在醫療保健微服務系統中，安全性不是附加功能 - 它是每個請求的**基礎**。

### 1.1。 Quarkus 醫療保健安全堆疊

```
┌─────────────────────────────────────────────────────────┐
│              Healthcare Microservices Security            │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │              Client / Frontend                      │  │
│  │         (React, Mobile App, FHIR Client)           │  │
│  └──────────────────────┬─────────────────────────────┘  │
│                         │ Bearer Token (JWT)              │
│                         ▼                                 │
│  ┌──────────────────────────────────────────────────┐    │
│  │             API Gateway (Quarkus)                  │    │
│  │  ┌──────────┐  ┌──────────┐  ┌───────────────┐   │    │
│  │  │ OIDC     │  │ Rate     │  │ Request       │   │    │
│  │  │ Verify   │  │ Limiting │  │ Validation    │   │    │
│  │  └──────────┘  └──────────┘  └───────────────┘   │    │
│  └──────────────────────┬───────────────────────────┘    │
│                         │ JWT Propagation                  │
│              ┌──────────┼──────────┐                      │
│              ▼          ▼          ▼                       │
│  ┌──────────────┐ ┌──────────┐ ┌──────────────┐         │
│  │ Patient Svc  │ │ Lab Svc  │ │ Pharmacy Svc │         │
│  │ @RolesAllowed│ │ RBAC+RLS │ │ @Permissions │         │
│  └──────────────┘ └──────────┘ └──────────────┘         │
│                                                          │
│  ┌───────────────────────────────────────────────────┐   │
│  │                Keycloak (IdP)                      │   │
│  │  Realms: hospital-a, hospital-b, hospital-c       │   │
│  │  Clients: patient-svc, lab-svc, pharmacy-svc      │   │
│  │  Roles: doctor, nurse, lab_tech, pharmacist        │   │
│  └───────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 1.2。 Quarkus 安全擴展

|擴充|神器|目的|
|------------|----------|----------|
| quarkus-oidc | `io.quarkus:quarkus-oidc` | OIDC認證（Keycloak）|
| quarkus-oidc-令牌傳播 | `io.quarkus:quarkus-oidc-token-propagation-reactive` |服務之間的 JWT 轉發 |
| quarkus-keycloak-授權 | `io.quarkus:quarkus-keycloak-authorization` | Keycloak 政策執行 |
| quarkus-smallrye-jwt | 誇庫斯-smallrye-jwt | `io.quarkus:quarkus-smallrye-jwt` | MicroProfile JWT 驗證 |
| quarkus-安全 | `io.quarkus:quarkus-security` |核心安全註解 |

## 2. 使用 Keycloak 設定 OIDC 擴展

### 2.1。 Maven 依賴項

```xml
<!-- pom.xml -->
<dependencies>
    <!-- OIDC authentication -->
    <dependency>
        <groupId>io.quarkus</groupId>
        <artifactId>quarkus-oidc</artifactId>
    </dependency>

    <!-- Token propagation cho inter-service calls -->
    <dependency>
        <groupId>io.quarkus</groupId>
        <artifactId>quarkus-oidc-token-propagation-reactive</artifactId>
    </dependency>

    <!-- REST Client (reactive) -->
    <dependency>
        <groupId>io.quarkus</groupId>
        <artifactId>quarkus-rest-client-reactive</artifactId>
    </dependency>

    <!-- RESTEasy Reactive -->
    <dependency>
        <groupId>io.quarkus</groupId>
        <artifactId>quarkus-resteasy-reactive-jackson</artifactId>
    </dependency>

    <!-- Testing -->
    <dependency>
        <groupId>io.quarkus</groupId>
        <artifactId>quarkus-test-security-oidc</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

### 2.2。 application.properties - 不記名令牌流（服務）

```properties
# =====================================================
# Patient Service - OIDC Configuration
# =====================================================

# --- Keycloak Connection ---
quarkus.oidc.auth-server-url=https://keycloak.hospital.internal/realms/healthcare
quarkus.oidc.client-id=patient-service
quarkus.oidc.credentials.secret=${OIDC_CLIENT_SECRET}

# --- Authentication Type ---
# service = Bearer token only (API backend)
# web-app = Authorization code flow (web frontend)
# hybrid  = Both bearer + code flow
quarkus.oidc.application-type=service

# --- Token Verification ---
quarkus.oidc.token.issuer=https://keycloak.hospital.internal/realms/healthcare
quarkus.oidc.token.audience=patient-service
quarkus.oidc.token.principal-claim=preferred_username

# --- TLS cho kết nối tới Keycloak ---
quarkus.oidc.tls.verification=required
quarkus.oidc.tls.trust-store-file=classpath:keycloak-truststore.p12
quarkus.oidc.tls.trust-store-password=${TRUSTSTORE_PASSWORD}

# --- Token Cache ---
quarkus.oidc.token-cache.max-size=1000
quarkus.oidc.token-cache.time-to-live=5M

# --- Logging ---
quarkus.log.category."io.quarkus.oidc".level=DEBUG
```

### 2.3。不記名令牌與授權代碼流程

```
┌─────────────────────────────────────────────────────────┐
│  Bearer Token Flow (service application-type)            │
│                                                          │
│  Client ──► [Authorization: Bearer <JWT>] ──► Quarkus   │
│                                                          │
│  Quarkus verifies JWT:                                   │
│    1. Fetch JWKS from Keycloak (cached)                  │
│    2. Verify signature                                   │
│    3. Check expiry, issuer, audience                     │
│    4. Extract claims → SecurityIdentity                  │
│                                                          │
│  Dùng cho: REST APIs, Microservice-to-microservice      │
├─────────────────────────────────────────────────────────┤
│  Code Flow (web-app application-type)                    │
│                                                          │
│  Browser ──► Quarkus ──► Redirect to Keycloak login     │
│  User logs in ──► Redirect back with auth code           │
│  Quarkus exchanges code for tokens ──► Session cookie    │
│                                                          │
│  Dùng cho: Web dashboard, Admin portal                   │
└─────────────────────────────────────────────────────────┘
```

## 3. JWT 醫療保健代幣結構

### 3.1。客製化索賠設計

用於醫療保健的 JWT 令牌需要包含**特定於網域的聲明**，以便授權邏輯有足夠的上下文：

```json
{
  "iss": "https://keycloak.hospital.internal/realms/healthcare",
  "sub": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "aud": "patient-service",
  "exp": 1735689600,
  "iat": 1735686000,
  "auth_time": 1735685900,
  "preferred_username": "dr.nguyen",
  "email": "nguyen.van.a@hospital-a.vn",
  "given_name": "Nguyễn Văn",
  "family_name": "A",

  "realm_access": {
    "roles": ["doctor", "phi_viewer"]
  },
  "resource_access": {
    "patient-service": {
      "roles": ["patient_read", "patient_write", "prescription_create"]
    },
    "lab-service": {
      "roles": ["lab_result_read"]
    }
  },

  "department": "cardiology",
  "hospital_id": "hospital-a",
  "fhir_practitioner_id": "Practitioner/12345",
  "license_number": "BS-HCM-2020-1234",
  "data_classification_level": "restricted",
  "consent_scope": ["treatment", "payment"]
}
```

### 3.2。用於自訂聲明的 Keycloak 協定映射器

```json
{
  "name": "department-mapper",
  "protocol": "openid-connect",
  "protocolMapper": "oidc-usermodel-attribute-mapper",
  "config": {
    "user.attribute": "department",
    "claim.name": "department",
    "jsonType.label": "String",
    "id.token.claim": "true",
    "access.token.claim": "true",
    "userinfo.token.claim": "true"
  }
}
```

透過 Keycloak 管理 CLI 建立映射器：

```bash
# Login admin
kcadm.sh config credentials --server https://keycloak.hospital.internal \
  --realm master --user admin --password "${KEYCLOAK_ADMIN_PASSWORD}"

# Tạo protocol mapper cho client patient-service
kcadm.sh create clients/${CLIENT_UUID}/protocol-mappers/models \
  -r healthcare \
  -s name=department-mapper \
  -s protocol=openid-connect \
  -s protocolMapper=oidc-usermodel-attribute-mapper \
  -s 'config."user.attribute"=department' \
  -s 'config."claim.name"=department' \
  -s 'config."jsonType.label"=String' \
  -s 'config."access.token.claim"=true'

# Mapper cho hospital_id
kcadm.sh create clients/${CLIENT_UUID}/protocol-mappers/models \
  -r healthcare \
  -s name=hospital-id-mapper \
  -s protocol=openid-connect \
  -s protocolMapper=oidc-usermodel-attribute-mapper \
  -s 'config."user.attribute"=hospital_id' \
  -s 'config."claim.name"=hospital_id' \
  -s 'config."jsonType.label"=String' \
  -s 'config."access.token.claim"=true'

# Mapper cho fhir_practitioner_id
kcadm.sh create clients/${CLIENT_UUID}/protocol-mappers/models \
  -r healthcare \
  -s name=fhir-practitioner-mapper \
  -s protocol=openid-connect \
  -s protocolMapper=oidc-usermodel-attribute-mapper \
  -s 'config."user.attribute"=fhir_practitioner_id' \
  -s 'config."claim.name"=fhir_practitioner_id' \
  -s 'config."jsonType.label"=String' \
  -s 'config."access.token.claim"=true'
```

## 4.SecurityIdentity 和自訂增強器

### 4.1。安全身份概述

`SecurityIdentity` 是 Quarkus Security 中的中心物件 — 代表具有角色、憑證和屬性的 **經過驗證的主體**。 OIDC 擴充功能會自動從 JWT 令牌建立 SecurityIdentity。

```java
package vn.hospital.security;

import io.quarkus.security.identity.SecurityIdentity;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

@Path("/api/v1/me")
public class UserInfoResource {

    @Inject
    SecurityIdentity identity;

    @GET
    public UserInfo getCurrentUser() {
        return new UserInfo(
            identity.getPrincipal().getName(),          // preferred_username
            identity.getRoles(),                        // realm_access.roles
            identity.getAttribute("department"),        // custom claim
            identity.getAttribute("hospital_id"),       // custom claim
            identity.getAttribute("fhir_practitioner_id")
        );
    }
}
```

### 4.2。安全性身份增強器實施

OIDC 驗證完成後，SecurityIdentityAugmentor 允許 SecurityIdentity **附加角色、權限、屬性**。這是我們將業務邏輯映射到安全上下文的地方。

```java
package vn.hospital.security;

import io.quarkus.security.identity.AuthenticationRequestContext;
import io.quarkus.security.identity.SecurityIdentity;
import io.quarkus.security.identity.SecurityIdentityAugmentor;
import io.quarkus.security.runtime.QuarkusSecurityIdentity;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.jwt.JsonWebToken;

import java.util.Set;

@ApplicationScoped
public class HealthcareSecurityAugmentor implements SecurityIdentityAugmentor {

    @Inject
    JsonWebToken jwt;

    @Inject
    DepartmentPermissionService permissionService;

    @Override
    public Uni<SecurityIdentity> augment(SecurityIdentity identity,
                                          AuthenticationRequestContext context) {
        if (identity.isAnonymous()) {
            return Uni.createFrom().item(identity);
        }

        return context.runBlocking(() -> augmentIdentity(identity));
    }

    private SecurityIdentity augmentIdentity(SecurityIdentity identity) {
        QuarkusSecurityIdentity.Builder builder =
            QuarkusSecurityIdentity.builder(identity);

        // 1. Extract custom claims từ JWT
        String department = jwt.getClaim("department");
        String hospitalId = jwt.getClaim("hospital_id");
        String fhirPractitionerId = jwt.getClaim("fhir_practitioner_id");
        String dataClassification = jwt.getClaim("data_classification_level");

        // 2. Add attributes cho downstream access
        builder.addAttribute("department", department);
        builder.addAttribute("hospital_id", hospitalId);
        builder.addAttribute("fhir_practitioner_id", fhirPractitionerId);
        builder.addAttribute("data_classification_level", dataClassification);

        // 3. Add dynamic roles based on department + base role
        Set<String> departmentPermissions =
            permissionService.getPermissions(department, identity.getRoles());
        builder.addRoles(departmentPermissions);

        // 4. Add resource_access roles (client-specific)
        Object resourceAccess = jwt.getClaim("resource_access");
        if (resourceAccess instanceof jakarta.json.JsonObject jsonObj) {
            String clientId = jwt.getClaim("azp");
            if (jsonObj.containsKey(clientId)) {
                jsonObj.getJsonObject(clientId)
                    .getJsonArray("roles")
                    .forEach(role -> builder.addRole(((jakarta.json.JsonString) role).getString()));
            }
        }

        // 5. Permission check function
        builder.addPermissionChecker(permission -> {
            if (permission instanceof PatientDataPermission pdp) {
                return Uni.createFrom().item(
                    canAccessPatientData(identity, pdp, hospitalId, department)
                );
            }
            return Uni.createFrom().item(true);
        });

        return builder.build();
    }

    private boolean canAccessPatientData(SecurityIdentity identity,
                                          PatientDataPermission permission,
                                          String hospitalId,
                                          String department) {
        // Doctor chỉ truy cập patient trong cùng hospital
        if (permission.getHospitalId() != null &&
            !permission.getHospitalId().equals(hospitalId)) {
            return false;
        }

        // Emergency override
        if (identity.getRoles().contains("emergency_access")) {
            return true;
        }

        // Department-based restriction
        return permission.getAllowedDepartments().contains(department);
    }
}
```

### 4.3。自訂權限類

```java
package vn.hospital.security;

import io.quarkus.security.StringPermission;

import java.util.Set;

public class PatientDataPermission extends StringPermission {

    private final String hospitalId;
    private final String patientId;
    private final Set<String> allowedDepartments;

    public PatientDataPermission(String name, String hospitalId,
                                  String patientId, Set<String> allowedDepartments) {
        super(name);
        this.hospitalId = hospitalId;
        this.patientId = patientId;
        this.allowedDepartments = allowedDepartments;
    }

    public String getHospitalId() { return hospitalId; }
    public String getPatientId() { return patientId; }
    public Set<String> getAllowedDepartments() { return allowedDepartments; }
}
```

## 5. @RolesAllowed 和 @PermissionsAllowed 註解

### 5.1。 @RolesAllowed - 基於角色的存取控制

```java
package vn.hospital.resource;

import jakarta.annotation.security.DenyAll;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import io.quarkus.security.identity.SecurityIdentity;

import java.util.List;
import java.util.UUID;

@Path("/api/v1/patients")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@DenyAll  // Deny by default - mỗi method phải khai báo roles
public class PatientResource {

    @Inject
    SecurityIdentity identity;

    @Inject
    PatientService patientService;

    // --- Chỉ doctor và nurse được xem danh sách patients ---
    @GET
    @RolesAllowed({"doctor", "nurse", "admin"})
    public List<PatientSummaryDTO> listPatients(
            @QueryParam("department") String department,
            @QueryParam("page") @DefaultValue("0") int page) {

        String userHospital = identity.getAttribute("hospital_id");
        String userDepartment = identity.getAttribute("department");

        // Filter theo hospital_id của user (data isolation)
        return patientService.findByHospital(userHospital, userDepartment, page);
    }

    // --- Xem chi tiết patient - cần role patient_read ---
    @GET
    @Path("/{patientId}")
    @RolesAllowed({"doctor", "nurse"})
    public Response getPatient(@PathParam("patientId") UUID patientId) {
        String userHospital = identity.getAttribute("hospital_id");

        return patientService.findById(patientId, userHospital)
            .map(p -> Response.ok(p).build())
            .orElse(Response.status(Response.Status.NOT_FOUND).build());
    }

    // --- Tạo patient mới - chỉ doctor ---
    @POST
    @RolesAllowed("doctor")
    public Response createPatient(CreatePatientRequest request) {
        String userHospital = identity.getAttribute("hospital_id");
        String practitionerId = identity.getAttribute("fhir_practitioner_id");

        PatientDTO created = patientService.create(request, userHospital, practitionerId);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    // --- Xem medical records - cần doctor role + department match ---
    @GET
    @Path("/{patientId}/medical-records")
    @RolesAllowed("doctor")
    public List<MedicalRecordDTO> getMedicalRecords(
            @PathParam("patientId") UUID patientId) {

        String department = identity.getAttribute("department");
        return patientService.getMedicalRecords(patientId, department);
    }

    // --- Delete patient - chỉ admin, và cần additional check ---
    @DELETE
    @Path("/{patientId}")
    @RolesAllowed("admin")
    public Response deletePatient(@PathParam("patientId") UUID patientId) {
        // Soft delete only - HIPAA requires data retention
        patientService.softDelete(patientId);
        return Response.noContent().build();
    }

    // --- Public endpoint - health check ---
    @GET
    @Path("/health")
    @PermitAll
    public Response healthCheck() {
        return Response.ok().build();
    }
}
```

### 5.2。 @PermissionsAllowed - 細粒度的權限控制

```java
package vn.hospital.resource;

import io.quarkus.security.PermissionsAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.UUID;

@Path("/api/v1/prescriptions")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PrescriptionResource {

    @Inject
    PrescriptionService prescriptionService;

    // Permission-based: cần "prescription:create" permission
    @POST
    @PermissionsAllowed("prescription:create")
    public Response createPrescription(PrescriptionRequest request) {
        return Response.status(Response.Status.CREATED)
            .entity(prescriptionService.create(request))
            .build();
    }

    // Multiple permissions: cần CẢ HAI permissions
    @PUT
    @Path("/{id}")
    @PermissionsAllowed(value = {"prescription:update", "patient:read"},
                        inclusive = true)  // inclusive=true = AND logic
    public Response updatePrescription(@PathParam("id") UUID id,
                                        PrescriptionRequest request) {
        return Response.ok(prescriptionService.update(id, request)).build();
    }

    // Parameterized permission check
    @DELETE
    @Path("/{id}")
    @PermissionsAllowed("prescription:delete")
    public Response cancelPrescription(@PathParam("id") UUID id) {
        prescriptionService.cancel(id);
        return Response.noContent().build();
    }
}
```

## 6. 使用 SecurityContext 實現程式設計安全

### 6.1。複雜的授權邏輯

當基於註釋的安全性不夠靈活時，請使用**程式檢查**：

```java
package vn.hospital.service;

import io.quarkus.security.ForbiddenException;
import io.quarkus.security.UnauthorizedException;
import io.quarkus.security.identity.SecurityIdentity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.jboss.logging.Logger;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@ApplicationScoped
public class PatientService {

    private static final Logger LOG = Logger.getLogger(PatientService.class);

    @Inject
    SecurityIdentity identity;

    @Inject
    PatientRepository patientRepository;

    @Inject
    AuditService auditService;

    public Optional<PatientDTO> findById(UUID patientId, String hospitalId) {
        // 1. Verify hospital access
        String userHospital = identity.getAttribute("hospital_id");
        if (!hospitalId.equals(userHospital)) {
            auditService.logUnauthorizedAccess(
                identity.getPrincipal().getName(),
                "CROSS_HOSPITAL_ACCESS",
                patientId.toString()
            );
            throw new ForbiddenException("Cross-hospital access denied");
        }

        // 2. Fetch patient
        Optional<PatientEntity> patient = patientRepository.findByIdAndHospital(
            patientId, hospitalId);

        if (patient.isEmpty()) {
            return Optional.empty();
        }

        // 3. Department-level access check
        PatientEntity entity = patient.get();
        String userDepartment = identity.getAttribute("department");

        if (!canAccessPatientDepartment(entity.getDepartment(), userDepartment)) {
            // Check for emergency access
            if (identity.getRoles().contains("emergency_access")) {
                auditService.logEmergencyAccess(
                    identity.getPrincipal().getName(),
                    patientId.toString(),
                    "Emergency access override"
                );
            } else {
                throw new ForbiddenException(
                    "Department access denied: " + userDepartment +
                    " cannot access " + entity.getDepartment());
            }
        }

        // 4. Log PHI access
        auditService.logPHIAccess(
            identity.getPrincipal().getName(),
            patientId.toString(),
            "patient_record_view",
            Set.of("name", "dob", "mrn")
        );

        return Optional.of(toDTO(entity));
    }

    private boolean canAccessPatientDepartment(String patientDept,
                                                String userDept) {
        // Same department → allow
        if (patientDept.equals(userDept)) return true;

        // Emergency department can access all
        if ("emergency".equals(userDept)) return true;

        // Cross-department referral check
        return hasActiveReferral(patientDept, userDept);
    }

    private boolean hasActiveReferral(String fromDept, String toDept) {
        // Query referral table for active cross-department referrals
        return patientRepository.hasActiveReferral(fromDept, toDept);
    }

    public List<PatientSummaryDTO> findByHospital(String hospitalId,
                                                    String department,
                                                    int page) {
        // Lọc theo hospital_id và department
        return patientRepository.findByHospitalAndDepartment(
                hospitalId, department, page, 20)
            .stream()
            .map(this::toSummaryDTO)
            .toList();
    }

    private PatientDTO toDTO(PatientEntity entity) {
        // Map entity to DTO, masking sensitive fields based on role
        PatientDTO dto = new PatientDTO();
        dto.setId(entity.getId());
        dto.setFullName(entity.getFullName());
        dto.setMrn(entity.getMrn());

        // Show SSN only for admin
        if (identity.getRoles().contains("admin")) {
            dto.setSsn(entity.getSsn());
        } else {
            dto.setSsn(maskSSN(entity.getSsn()));
        }

        return dto;
    }

    private String maskSSN(String ssn) {
        if (ssn == null || ssn.length() < 4) return "***";
        return "***-**-" + ssn.substring(ssn.length() - 4);
    }

    private PatientSummaryDTO toSummaryDTO(PatientEntity entity) {
        return new PatientSummaryDTO(entity.getId(), entity.getFullName(), entity.getMrn());
    }

    public PatientDTO create(CreatePatientRequest request, String hospitalId,
                              String practitionerId) {
        // Implementation
        return null;
    }

    public void softDelete(UUID patientId) {
        // Soft delete - mark as deleted, don't remove data
    }

    public List<MedicalRecordDTO> getMedicalRecords(UUID patientId, String department) {
        // Implementation
        return List.of();
    }
}
```

## 7. 微服務之間的 JWT 令牌傳播

### 7.1。架構 - 令牌傳播流程

```
┌─────────────────────────────────────────────────────────┐
│                 Token Propagation Flow                    │
│                                                          │
│  Client ──[JWT]──► Patient Service ──[same JWT]──►      │
│                                     Lab Service          │
│                                                          │
│  1. Client gửi JWT tới Patient Service                   │
│  2. Patient Service verify JWT (OIDC)                    │
│  3. Patient Service gọi Lab Service                      │
│     → Forward CÙNG JWT token (no token exchange)         │
│  4. Lab Service verify JWT                               │
│  5. Lab Service trả kết quả → Patient Service → Client   │
│                                                          │
│  Khi cần token exchange (service-to-service):            │
│  Patient Service ──[client_credentials]──► Keycloak      │
│  Keycloak returns service token                          │
│  Patient Service ──[service JWT]──► Audit Service        │
└─────────────────────────────────────────────────────────┘
```

### 7.2。帶有令牌傳播的 REST 用戶端

```java
package vn.hospital.client;

import io.quarkus.oidc.token.propagation.reactive.AccessTokenRequestReactiveFilter;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.rest.client.annotation.RegisterProvider;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import java.util.List;
import java.util.UUID;

@RegisterRestClient(configKey = "lab-service")
@RegisterProvider(AccessTokenRequestReactiveFilter.class)  // Propagate JWT
@Path("/api/v1/lab-results")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public interface LabServiceClient {

    @GET
    @Path("/patient/{patientId}")
    List<LabResultDTO> getLabResults(@PathParam("patientId") UUID patientId);

    @GET
    @Path("/{resultId}")
    LabResultDTO getLabResult(@PathParam("resultId") UUID resultId);

    @POST
    LabResultDTO createLabOrder(CreateLabOrderRequest request);
}
```

### 7.3。 REST 用戶端的 application.properties

```properties
# === Lab Service REST Client ===
quarkus.rest-client.lab-service.url=https://lab-service.hospital.internal:8443
quarkus.rest-client.lab-service.scope=jakarta.inject.Singleton

# TLS cho inter-service communication
quarkus.rest-client.lab-service.trust-store=classpath:lab-service-truststore.p12
quarkus.rest-client.lab-service.trust-store-password=${LAB_TRUSTSTORE_PASSWORD}

# Connection pool
quarkus.rest-client.lab-service.connect-timeout=5000
quarkus.rest-client.lab-service.read-timeout=30000

# === Pharmacy Service REST Client ===
quarkus.rest-client.pharmacy-service.url=https://pharmacy-service.hospital.internal:8443
quarkus.rest-client.pharmacy-service.scope=jakarta.inject.Singleton
```

### 7.4。客戶憑證授予（服務到服務）

當病患服務需要在不使用使用者令牌**的情況下呼叫稽核服務（後台作業、排程任務）：

```java
package vn.hospital.client;

import io.quarkus.oidc.client.OidcClient;
import io.quarkus.oidc.client.Tokens;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class ServiceTokenProvider {

    @Inject
    OidcClient oidcClient;

    public String getServiceToken() {
        Tokens tokens = oidcClient.getTokens().await().indefinitely();
        return tokens.getAccessToken();
    }
}
```

```properties
# Client credentials cho service-to-service
quarkus.oidc-client.auth-server-url=https://keycloak.hospital.internal/realms/healthcare
quarkus.oidc-client.client-id=patient-service
quarkus.oidc-client.credentials.secret=${OIDC_CLIENT_SECRET}
quarkus.oidc-client.grant.type=client
quarkus.oidc-client.grant-options.client.scope=openid service-account
```

## 8. 多租用戶 OIDC 配置

### 8.1。多醫院場景

當系統服務**多家醫院**時，每家醫院都有自己的Keycloak領域：

```
┌─────────────────────────────────────────────────────────┐
│              Multi-Tenant OIDC Architecture               │
│                                                          │
│  Hospital A ──► Realm: hospital-a                        │
│  Hospital B ──► Realm: hospital-b                        │
│  Hospital C ──► Realm: hospital-c                        │
│                                                          │
│  Patient Service nhận request từ cả 3 hospitals          │
│  → TenantResolver xác định realm dựa trên request       │
│  → OIDC extension verify token với đúng realm           │
└─────────────────────────────────────────────────────────┘
```

### 8.2。租戶解析器實作

```java
package vn.hospital.security;

import io.quarkus.oidc.OidcRequestContext;
import io.quarkus.oidc.OidcTenantConfig;
import io.quarkus.oidc.TenantConfigResolver;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import io.vertx.ext.web.RoutingContext;

@ApplicationScoped
public class HospitalTenantConfigResolver implements TenantConfigResolver {

    @Override
    public Uni<OidcTenantConfig> resolve(RoutingContext routingContext,
                                          OidcRequestContext<OidcTenantConfig> requestContext) {
        // Xác định tenant từ header hoặc subdomain
        String tenantId = resolveTenantId(routingContext);

        if (tenantId == null) {
            // Fallback to default tenant
            return Uni.createFrom().nullItem();
        }

        OidcTenantConfig config = new OidcTenantConfig();
        config.setTenantId(tenantId);
        config.setAuthServerUrl(
            "https://keycloak.hospital.internal/realms/" + tenantId);
        config.setClientId("patient-service");
        config.setApplicationType(OidcTenantConfig.ApplicationType.SERVICE);

        // Token verification
        OidcTenantConfig.Token tokenConfig = config.getToken();
        tokenConfig.setIssuer(
            "https://keycloak.hospital.internal/realms/" + tenantId);
        tokenConfig.setAudience(java.util.Optional.of(
            java.util.List.of("patient-service")));

        return Uni.createFrom().item(config);
    }

    private String resolveTenantId(RoutingContext context) {
        // Strategy 1: X-Tenant-ID header
        String tenantHeader = context.request().getHeader("X-Tenant-ID");
        if (tenantHeader != null && isValidTenant(tenantHeader)) {
            return tenantHeader;
        }

        // Strategy 2: Subdomain (hospital-a.api.hospital.internal)
        String host = context.request().host();
        if (host != null && host.contains(".api.hospital.internal")) {
            String subdomain = host.split("\\.")[0];
            if (isValidTenant(subdomain)) {
                return subdomain;
            }
        }

        // Strategy 3: Path prefix (/hospital-a/api/v1/patients)
        String path = context.request().path();
        if (path != null) {
            String[] segments = path.split("/");
            if (segments.length > 1 && isValidTenant(segments[1])) {
                return segments[1];
            }
        }

        return null;
    }

    private boolean isValidTenant(String tenantId) {
        // Validate against known tenants to prevent injection
        return tenantId != null && tenantId.matches("^hospital-[a-z]$");
    }
}
```

### 8.3。多租用戶的 application.properties

```properties
# === Default OIDC (fallback) ===
quarkus.oidc.auth-server-url=https://keycloak.hospital.internal/realms/healthcare
quarkus.oidc.client-id=patient-service
quarkus.oidc.application-type=service

# === Named tenants (static configuration) ===
quarkus.oidc.hospital-a.auth-server-url=https://keycloak.hospital.internal/realms/hospital-a
quarkus.oidc.hospital-a.client-id=patient-service
quarkus.oidc.hospital-a.application-type=service

quarkus.oidc.hospital-b.auth-server-url=https://keycloak.hospital.internal/realms/hospital-b
quarkus.oidc.hospital-b.client-id=patient-service
quarkus.oidc.hospital-b.application-type=service

quarkus.oidc.hospital-c.auth-server-url=https://keycloak.hospital.internal/realms/hospital-c
quarkus.oidc.hospital-c.client-id=patient-service
quarkus.oidc.hospital-c.application-type=service
```

## 9. 使用@TestSecurity 進行安全測試

### 9.1。使用@TestSecurity進行單元測試

```java
package vn.hospital.resource;

import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.security.TestSecurity;
import io.quarkus.test.security.oidc.Claim;
import io.quarkus.test.security.oidc.OidcSecurity;
import io.restassured.RestAssured;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@QuarkusTest
public class PatientResourceTest {

    // Test: Doctor can access patient list
    @Test
    @TestSecurity(user = "dr.nguyen", roles = {"doctor"})
    @OidcSecurity(claims = {
        @Claim(key = "department", value = "cardiology"),
        @Claim(key = "hospital_id", value = "hospital-a"),
        @Claim(key = "fhir_practitioner_id", value = "Practitioner/12345")
    })
    void testDoctorCanListPatients() {
        given()
            .when().get("/api/v1/patients?department=cardiology")
            .then()
            .statusCode(200)
            .body("$", hasSize(greaterThanOrEqualTo(0)));
    }

    // Test: Nurse can access patient list
    @Test
    @TestSecurity(user = "nurse.tran", roles = {"nurse"})
    @OidcSecurity(claims = {
        @Claim(key = "department", value = "cardiology"),
        @Claim(key = "hospital_id", value = "hospital-a")
    })
    void testNurseCanListPatients() {
        given()
            .when().get("/api/v1/patients")
            .then()
            .statusCode(200);
    }

    // Test: Lab tech CANNOT access patient list
    @Test
    @TestSecurity(user = "tech.le", roles = {"lab_tech"})
    @OidcSecurity(claims = {
        @Claim(key = "department", value = "laboratory"),
        @Claim(key = "hospital_id", value = "hospital-a")
    })
    void testLabTechCannotListPatients() {
        given()
            .when().get("/api/v1/patients")
            .then()
            .statusCode(403);
    }

    // Test: Unauthenticated request
    @Test
    void testUnauthenticatedAccess() {
        given()
            .when().get("/api/v1/patients")
            .then()
            .statusCode(401);
    }

    // Test: Cross-hospital access denied
    @Test
    @TestSecurity(user = "dr.pham", roles = {"doctor"})
    @OidcSecurity(claims = {
        @Claim(key = "department", value = "surgery"),
        @Claim(key = "hospital_id", value = "hospital-b")
    })
    void testCrossHospitalAccessDenied() {
        // Patient belongs to hospital-a, doctor belongs to hospital-b
        given()
            .when().get("/api/v1/patients/550e8400-e29b-41d4-a716-446655440000")
            .then()
            .statusCode(403);
    }

    // Test: Doctor cannot delete patients
    @Test
    @TestSecurity(user = "dr.nguyen", roles = {"doctor"})
    @OidcSecurity(claims = {
        @Claim(key = "hospital_id", value = "hospital-a")
    })
    void testDoctorCannotDeletePatient() {
        given()
            .when().delete("/api/v1/patients/550e8400-e29b-41d4-a716-446655440000")
            .then()
            .statusCode(403);
    }
}
```

### 9.2。與 Keycloak DevServices 的整合測試

```java
package vn.hospital.resource;

import io.quarkus.test.junit.QuarkusIntegrationTest;
import io.quarkus.test.keycloak.client.KeycloakTestClient;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;

@QuarkusIntegrationTest
public class PatientResourceIT {

    KeycloakTestClient keycloakClient = new KeycloakTestClient();

    @Test
    void testWithRealKeycloakToken() {
        // Get real token from Keycloak DevServices
        String token = keycloakClient.getAccessToken("dr.nguyen");

        given()
            .auth().oauth2(token)
            .when().get("/api/v1/patients")
            .then()
            .statusCode(200);
    }
}
```

### 9.3。用於測試的 application.properties

```properties
# === Dev/Test Profile ===
%dev.quarkus.oidc.auth-server-url=http://localhost:8180/realms/healthcare
%dev.quarkus.oidc.client-id=patient-service
%dev.quarkus.oidc.credentials.secret=test-secret

# Keycloak Dev Services (auto-start Keycloak container)
%dev.quarkus.keycloak.devservices.enabled=true
%dev.quarkus.keycloak.devservices.realm-path=test-realm.json
%dev.quarkus.keycloak.devservices.port=8180

# Test profile
%test.quarkus.keycloak.devservices.enabled=true
```

## 10.Keycloak 的 Quarkus 開發服務

### 10.1。開發服務概述

Quarkus Dev Services 在運行時自動**啟動 Keycloak 容器** `quarkus dev` 或測試：

```properties
# application.properties
quarkus.keycloak.devservices.enabled=true
quarkus.keycloak.devservices.realm-path=healthcare-realm.json
quarkus.keycloak.devservices.port=0  # Random port
quarkus.keycloak.devservices.image-name=quay.io/keycloak/keycloak:24.0
quarkus.keycloak.devservices.shared=true  # Share container across services
quarkus.keycloak.devservices.service-name=keycloak
```

### 10.2。測試領域配置

```json
{
  "realm": "healthcare",
  "enabled": true,
  "sslRequired": "none",
  "roles": {
    "realm": [
      { "name": "doctor", "description": "Medical doctor" },
      { "name": "nurse", "description": "Registered nurse" },
      { "name": "lab_tech", "description": "Laboratory technician" },
      { "name": "pharmacist", "description": "Licensed pharmacist" },
      { "name": "admin", "description": "System administrator" },
      { "name": "phi_viewer", "description": "Can view PHI data" },
      { "name": "emergency_access", "description": "Emergency access override" }
    ]
  },
  "clients": [
    {
      "clientId": "patient-service",
      "enabled": true,
      "publicClient": false,
      "secret": "test-secret",
      "directAccessGrantsEnabled": true,
      "serviceAccountsEnabled": true,
      "protocolMappers": [
        {
          "name": "department",
          "protocol": "openid-connect",
          "protocolMapper": "oidc-usermodel-attribute-mapper",
          "config": {
            "user.attribute": "department",
            "claim.name": "department",
            "jsonType.label": "String",
            "access.token.claim": "true"
          }
        },
        {
          "name": "hospital_id",
          "protocol": "openid-connect",
          "protocolMapper": "oidc-usermodel-attribute-mapper",
          "config": {
            "user.attribute": "hospital_id",
            "claim.name": "hospital_id",
            "jsonType.label": "String",
            "access.token.claim": "true"
          }
        }
      ]
    }
  ],
  "users": [
    {
      "username": "dr.nguyen",
      "enabled": true,
      "credentials": [{ "type": "password", "value": "test" }],
      "realmRoles": ["doctor", "phi_viewer"],
      "attributes": {
        "department": ["cardiology"],
        "hospital_id": ["hospital-a"],
        "fhir_practitioner_id": ["Practitioner/12345"]
      }
    },
    {
      "username": "nurse.tran",
      "enabled": true,
      "credentials": [{ "type": "password", "value": "test" }],
      "realmRoles": ["nurse", "phi_viewer"],
      "attributes": {
        "department": ["cardiology"],
        "hospital_id": ["hospital-a"]
      }
    },
    {
      "username": "tech.le",
      "enabled": true,
      "credentials": [{ "type": "password", "value": "test" }],
      "realmRoles": ["lab_tech"],
      "attributes": {
        "department": ["laboratory"],
        "hospital_id": ["hospital-a"]
      }
    }
  ]
}
```

### 10.3。 Docker Compose 開發

```yaml
# docker-compose-dev.yml
version: '3.8'

services:
  keycloak:
    image: quay.io/keycloak/keycloak:24.0
    command: start-dev --import-realm
    environment:
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: admin
      KC_DB: postgres
      KC_DB_URL: jdbc:postgresql://keycloak-db:5432/keycloak
      KC_DB_USERNAME: keycloak
      KC_DB_PASSWORD: keycloak_password
    volumes:
      - ./src/main/resources/healthcare-realm.json:/opt/keycloak/data/import/healthcare-realm.json
    ports:
      - "8180:8080"
    depends_on:
      - keycloak-db

  keycloak-db:
    image: postgres:16
    environment:
      POSTGRES_DB: keycloak
      POSTGRES_USER: keycloak
      POSTGRES_PASSWORD: keycloak_password
    volumes:
      - keycloak_data:/var/lib/postgresql/data

  healthcare-db:
    image: postgres:16
    environment:
      POSTGRES_DB: healthcare_db
      POSTGRES_USER: healthcare_app
      POSTGRES_PASSWORD: healthcare_password
    ports:
      - "5432:5432"
    volumes:
      - healthcare_data:/var/lib/postgresql/data

volumes:
  keycloak_data:
  healthcare_data:
```

## 總結

在本課程中，我們為醫療保健微服務建立了全面的 **Quarkus 安全架構**：

1. **OIDC擴充**：連接Quarkus和Keycloak，支援API的不記名令牌流和Web應用程式的程式碼流
2. **JWT 令牌結構**：設計包含醫療保健特定上下文（部門、hospital_id、fhir_practitioner_id）的自訂聲明
3. **SecurityIdentityAugmentor**：根據業務邏輯為SecurityIdentity新增動態角色和權限
4. **@RolesAllowed / @PermissionsAllowed**：具有精細權限控制的 REST 端點上的宣告式授權
5. **程序化安全**：針對科室訪問、跨醫院隔離、緊急訪問的複雜授權邏輯
6. **令牌傳播**：在微服務之間轉發 JWT `AccessTokenRequestReactiveFilter`，服務帳戶的客戶端憑證
7. **多租戶OIDC**：用於多醫院部署的TenantConfigResolver，每個醫院都有自己的Keycloak領域
8. **安全測試**： `@TestSecurity` 註解、Keycloak 開發服務、與真實令牌流的整合測試

整體安全模型：
```
Request ──► OIDC Verify ──► SecurityIdentity ──► Augmentor ──►
  ──► @RolesAllowed ──► Programmatic Check ──► Data Access ──►
  ──► Audit Log ──► Response
```

## 練習

1. **OIDC 設定**：使用以下指令建立一個新的 Quarkus 項目 `quarkus-oidc`, `quarkus-resteasy-reactive-jackson`。配置 Keycloak 開發服務連線。建立 REST 端點 `/api/v1/me` 從 SecurityIdentity 傳回使用者資訊。測試用 `@TestSecurity` 註釋。

2. **自訂 SecurityIdentityAugmentor**：新增了實作 HealthcareSecurityAugmentor `department`, `hospital_id` 前往 SecurityIdentity 屬性。編寫 PatientResource `@RolesAllowed` 程序化檢查：醫生只訪問病人和醫院。編寫5個測試案例，涵蓋場景：同一家醫院、跨醫院、緊急存取、錯誤角色、未經身份驗證。

3. **令牌傳播**：建立 2 個 Quarkus 服務（病患服務 + 實驗室服務）。配置 `@RegisterRestClient` 與 `AccessTokenRequestReactiveFilter`。病患服務透過 JWT 傳播呼叫實驗室服務。驗證實驗室服務接收到正確的使用者上下文。測試端到端流程。

4. **多租戶 OIDC**：實現 TenantConfigResolver 以透過以下方式區分租戶 `X-Tenant-ID` 標頭。標頭。在測試領域 JSON 中建立 2 個 Keycloak 領域（hospital-a、hospital-b）。編寫驗證測試：使用者hospital-a無法存取端點hospital-b。

---

---

<!-- SERIES-NAV:START -->
| ◀ 上一篇 |下一篇文章 ▶ |
|:---|---:|
| [第 12 課：使用 pgAudit 進行稽核日誌記錄和變更資料捕獲](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-12-audit-logging-cdc-pgaudit) | [第 14 課：API 網關安全 - 速率限制、輸入驗證和 WAF](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-14-api-gateway-rate-limiting-waf) |
<!-- SERIES-NAV:END -->
