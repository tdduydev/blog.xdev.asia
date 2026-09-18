---
id: 019e1a40-a113-7001-d001-f0a1b2c30113
title: 'レッスン 13: Quarkus セキュリティ — OIDC、JWT 伝播、RBAC'
slug: bai-13-quarkus-security-oidc-jwt-rbac
description: >-
  Quarkus Securityを医療マイクロサービスに導入:
  Keycloakを使用したquarkus-oidc拡張機能、サービス間のJWTトークン伝播、SecurityIdentityとカスタム・オーグメンタ、@RolesAllowed/@PermissionsAllowedアノテーション、プログラムによるセキュリティ・チェック、および複数病院導入のためのマルチテナントOIDC構成。
duration_minutes: 180
is_free: true
video_url: null
sort_order: 13
section_title: 'パート 4: Quarkus を使用したマイクロサービスの構築'
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: ja
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ アーキテクチャ — レッスン 13</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 13: Quarkus セキュリティ — OIDC、JWT</tspan>
      <tspan x="60" dy="42">伝播とRBAC</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 4: Quarkus を使用したマイクロサービスの構築</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. Quarkus セキュリティ アーキテクチャの概要

![Quarkus Security Stack — OIDC, JWT Propagation, RBAC cho Healthcare Microservices](/storage/uploads/2026/04/healthcare-quarkus-security-stack.webp)

Quarkus は、認証、認可、アイデンティティ管理をサポートする多くの拡張機能を備えた統合された **セキュリティ フレームワーク** を提供します。ヘルスケア マイクロサービス システムでは、セキュリティは追加機能ではなく、すべてのリクエストの**基礎**です。

＃＃＃１．１．医療向けQuarkusセキュリティスタック

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

＃＃＃１．２． Quarkus セキュリティ拡張機能

|拡張子 |アーティファクト |目的 |
|----------|----------|----------|
| quarkus-oidc | `io.quarkus:quarkus-oidc` | OIDC 認証 (Keycloak) |
| quarkus-oidc-トークンの伝播 | `io.quarkus:quarkus-oidc-token-propagation-reactive` |サービス間の JWT 転送 |
| quarkus-keycloak-承認 | `io.quarkus:quarkus-keycloak-authorization` | Keycloak ポリシーの適用 |
| quarkus-smallrye-jwt | `io.quarkus:quarkus-smallrye-jwt` | MicroProfile JWT 検証 |
| quarkus-セキュリティ | `io.quarkus:quarkus-security` |コアセキュリティアノテーション |

## 2. Keycloak を使用した OIDC 拡張機能のセットアップ

＃＃＃２．１． Maven の依存関係

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

＃＃＃２．２． application.properties - ベアラー トークン フロー (サービス)

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

＃＃＃２．３．ベアラートークンと認可コードのフロー

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

## 3. ヘルスケア向けの JWT トークン構造

＃＃＃３．１．カスタムクレームデザイン

医療用の JWT トークンには、承認ロジックに十分なコンテキストが含まれるように **ドメイン固有のクレーム**が含まれる必要があります。

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

＃＃＃３．２．カスタムクレーム用のKeycloakプロトコルマッパー

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

Keycloak管理CLI経由でマッパーを作成します。

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

## 4. SecurityIdentity とカスタム オーグメンター

＃＃＃４．１．セキュリティアイデンティティの概要

`SecurityIdentity` Quarkus Security の中心的なオブジェクトであり、ロール、資格情報、属性を持つ **認証されたプリンシパル** を表します。 OIDC 拡張機能は、JWT トークンから SecurityIdentity を自動的に作成します。

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

＃＃＃４．２． SecurityIdentityAugmentorの実装

SecurityIdentityAugmentor は、OIDC 検証が完了した後、**追加のロール、権限、属性**を SecurityIdentity に許可します。ここで、ビジネス ロジックをセキュリティ コンテキストにマッピングします。

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

＃＃＃４．３．カスタム権限クラス

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

## 5. @RolesAllowed および @PermissionsAllowed アノテーション

＃＃＃５．１． @RolesAllowed - ロールベースのアクセス制御

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

＃＃＃５．２． @PermissionsAllowed - きめ細かい権限制御

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

## 6. SecurityContext を使用したプログラムによるセキュリティ

＃＃＃６．１．複雑な認可ロジック

注釈ベースのセキュリティが十分に柔軟でない場合は、**プログラムによるチェック**を使用します。

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

## 7. マイクロサービス間の JWT トークンの伝播

＃＃＃７．１．アーキテクチャ - トークン伝播フロー

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

＃＃＃７．２．トークン伝播を使用する REST クライアント

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

＃＃＃７．３． RESTクライアントのapplication.properties

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

＃＃＃７．４．クライアント資格情報の付与 (サービス間)

患者サービスがユーザー トークンを使用せずに監査サービスを呼び出す必要がある場合** (バックグラウンド ジョブ、スケジュールされたタスク):

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

## 8. マルチテナント OIDC 構成

### 8.1。複数の病院のシナリオ

システムが **複数の病院**にサービスを提供する場合、各病院には独自の Keycloak レルムがあります。

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

### 8.2。 TenantResolver の実装

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

### 8.3。マルチテナントの application.properties

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

## 9. @TestSecurity を使用したセキュリティ テスト

＃＃＃９．１． @TestSecurity を使用した単体テスト

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

＃＃＃９．２． Keycloak DevServices との統合テスト

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

＃＃＃９．３．テスト用の application.properties

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

## 10. Keycloak 用の Quarkus 開発サービス

### 10.1。開発サービスの概要

Quarkus Dev Services は実行時に **Keycloak コンテナを自動的に起動**します `quarkus dev` またはテスト:

```properties
# application.properties
quarkus.keycloak.devservices.enabled=true
quarkus.keycloak.devservices.realm-path=healthcare-realm.json
quarkus.keycloak.devservices.port=0  # Random port
quarkus.keycloak.devservices.image-name=quay.io/keycloak/keycloak:24.0
quarkus.keycloak.devservices.shared=true  # Share container across services
quarkus.keycloak.devservices.service-name=keycloak
```

### 10.2。レルム構成のテスト

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

### 10.3。開発用の Docker Compose

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

## 概要

このレッスンでは、ヘルスケア マイクロサービス向けの包括的な **Quarkus セキュリティ アーキテクチャ**を構築しました。

1. **OIDC 拡張機能**: Quarkus を Keycloak に接続し、API のベアラー トークン フローと Web アプリのコード フローをサポートします。
2. **JWT トークン構造**: 医療固有のコンテキスト (部門、病院 ID、fhir_practitioner_id) を含むカスタム クレームを設計する
3. **SecurityIdentityAugmentor**: ビジネス ロジックに基づいて動的なロールと権限を SecurityIdentity に追加します
4. **@RolesAllowed / @PermissionsAllowed**: きめ細かい権限制御による REST エンドポイントでの宣言型承認
5. **プログラムによるセキュリティ**: 部門ベースのアクセス、病院間の隔離、緊急アクセスのための複雑な認証ロジック
6. **トークンの伝播**: マイクロサービスとマイクロサービスの間で JWT を転送します。 `AccessTokenRequestReactiveFilter`、サービス アカウントのクライアント認証情報
7. **マルチテナント OIDC**: 複数病院展開用の TenantConfigResolver。各病院には独自の Keycloak レルムがあります。
8. **セキュリティテスト**: `@TestSecurity` アノテーション、Keycloak Dev Services、実際のトークンフローを使用した統合テスト

全体的なセキュリティ モデル:
```
Request ──► OIDC Verify ──► SecurityIdentity ──► Augmentor ──►
  ──► @RolesAllowed ──► Programmatic Check ──► Data Access ──►
  ──► Audit Log ──► Response
```

## 演習

1. **OIDC セットアップ**: 次のコマンドを使用して新しい Quarkus プロジェクトを作成します。 `quarkus-oidc`、 `quarkus-resteasy-reactive-jackson`。 Keycloak Dev Services 接続を構成します。 RESTエンドポイントを作成する `/api/v1/me` SecurityIdentity からユーザー情報を返します。でテストします `@TestSecurity` 注釈。

2. **カスタム SecurityIdentityAugmentor**: HealthcareSecurityAugmentor の実装が追加されました `department`、 `hospital_id` SecurityIdentity 属性に移動します。で PatientResource を書き込みます `@RolesAllowed` プログラムによるチェック: 医師は患者と病院のみにアクセスします。同じ病院、病院間、緊急アクセス、間違った役割、未認証のシナリオをカバーする 5 つのテスト ケースを作成します。

3. **トークンの伝播**: 2 つの Quarkus サービス (Patient Service + Lab Service) を作成します。構成 `@RegisterRestClient` と `AccessTokenRequestReactiveFilter`。 Patient Service は、JWT 伝播を使用して Lab Service を呼び出します。 Lab Service が正しいユーザー コンテキストを受信して​​いることを確認します。エンドツーエンドのフローをテストします。

4. **マルチテナント OIDC**: TenantConfigResolver を実装して、テナントを区別します。 `X-Tenant-ID` ヘッダー。ヘッダ。テスト レルム JSON に 2 つの Keycloak レルム (病院-a、病院-b) を作成します。検証テストを作成します。ユーザー Hospital-a はエンドポイント Hospital-b にアクセスできません。

---

---

<!-- SERIES-NAV:START -->
| ◀ 前の記事 |次の記事 ▶ |
|:---|---:|
| [レッスン 12: pgAudit を使用した監査ログと変更データ キャプチャ](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-12-audit-logging-cdc-pgaudit) | [レッスン 14: API ゲートウェイのセキュリティ - レート制限、入力検証、WAF](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-14-api-gateway-rate-limiting-waf) |
<!-- SERIES-NAV:END -->
