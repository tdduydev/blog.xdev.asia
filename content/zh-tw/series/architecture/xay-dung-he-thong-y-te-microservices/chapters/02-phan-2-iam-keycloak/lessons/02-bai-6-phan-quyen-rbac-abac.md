---
id: 019e1a40-a106-7001-d001-f0a1b2c30106
title: 第 6 堂課：RBAC 和 ABAC 去中心化 — 醫生、護士、病人
slug: bai-6-phan-quyen-rbac-abac
description: >-
  為醫療保健部署基於角色的存取控制 (RBAC) 和基於屬性的存取控制
  (ABAC)：設計角色層次結構（科室醫生、主治醫生、護士長、護士、技術員、管理員、患者）、基於科室的訪問、具有策略和權限的 Keycloak
  授權服務以及打破玻璃的緊急訪問。
duration_minutes: 180
is_free: true
video_url: null
sort_order: 6
section_title: 第 2 部分：使用 Keycloak 進行身分和存取管理
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: 建構微服務醫療保健系統 — Quarkus、PostgreSQL、符合 HIPAA 標準的 Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-6164" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-6164)"/>

  <!-- Decorations -->
  <g>
    <circle cx="1027" cy="171" r="30" fill="#a78bfa" opacity="0.060000000000000005"/>
    <circle cx="954" cy="218" r="11" fill="#a78bfa" opacity="0.07"/>
    <circle cx="881" cy="265" r="22" fill="#a78bfa" opacity="0.08"/>
    <circle cx="808" cy="52" r="33" fill="#a78bfa" opacity="0.09"/>
    <circle cx="735" cy="99" r="14" fill="#a78bfa" opacity="0.1"/>
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
    <line x1="600" y1="121" x2="1100" y2="201" stroke="#a78bfa" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="151" x2="1050" y2="221" stroke="#a78bfa" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1002.1769145362398,153 1002.1769145362398,189 971,207 939.8230854637602,189 939.8230854637602,153 971,135" fill="none" stroke="#a78bfa" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#a78bfa"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#a78bfa" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#a78bfa">🏗️ 建築 — 第 6 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 6 堂課：RBAC 和 ABAC 去中心化 — 醫生、護士</tspan>
      <tspan x="60" dy="42">護士、病人</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">建構微服務醫療保健系統 — Quarkus、PostgreSQL、符合 HIPAA 標準的 Keycloak</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 2 部分：使用 Keycloak 進行身分和存取管理</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 1. 醫療保健領域的 RBAC 與 ABAC

![4層存取控制架構：RBAC、ABAC、RLS、病患同意](/storage/uploads/2026/04/healthcare-rbac-abac-layers.webp)

### 1.1。基於角色的存取控制 (RBAC)

RBAC 根據使用者在組織內的**角色**分配權限：

```
User ──▶ Role ──▶ Permission

Ví dụ:
BS. Nguyễn ──▶ doctor ──▶ patient_read, patient_write, prescription_write
ĐD. Trần   ──▶ nurse  ──▶ patient_read, vital_signs_write
BN. Lê     ──▶ patient ──▶ own_record_read
```

**優點**：簡單、易於管理、易於審計
**限制**：無法處理複雜的規則（例如：只有內科醫生才能看內科病人）

### 1.2。基於屬性的存取控制 (ABAC)

ABAC 根據使用者、資源、操作和環境的**屬性**做出決策：

```
Policy: ALLOW if
  user.role == "doctor" AND
  user.department == resource.department AND
  resource.classification_level <= 3 AND
  environment.time BETWEEN "06:00" AND "22:00" AND
  environment.network == "INTERNAL"
```

**優點**：靈活、細粒度、上下文感知
**限制**：較複雜，難以調試，需要大量元數據

### 1.3。結合 RBAC + ABAC 促進健康

|層 |名稱 |機制|範例|
|--------|-----|--------|--------|
| **第 1 層** | RBAC（Keycloak 角色）|使用者是醫生嗎？ → 可以存取臨床數據。使用者是護士嗎？ → 可以取得生命徵象。用戶是患者嗎？ → 可以存取自己的記錄。 | `@RolesAllowed("doctor")` |
| **第 2 層** | ABAC（Keycloak授權服務）|部門匹配？ → 僅擁有部門資料。待遇關係？ → 僅限指定患者。基於時間？ → 下班後需 MFA。基於位置？ → 外部需要 VPN。 |客製化政策|
| **第 3 層** | RLS（PostgreSQL 行級安全性）|資料庫依據 JWT 宣告強制執行每行存取 | `CREATE POLICY` |
| **第 4 層** |同意（患者同意檢查）|患者已為此目的授予存取權限？ | FHIR 同意資源 |

## 2.Keycloak授權服務

### 2.1。概念

```
Resources      → What is being protected? (Patient Record, Lab Result)
Scopes         → What actions? (read, write, delete, export, print)
Policies       → Who can access? (role, user, time, script)
Permissions    → Connect Resources + Scopes + Policies
```

### 2.2。資源定義

```json
{
  "resources": [
    {
      "name": "Patient Record",
      "type": "urn:healthcare:resources:patient",
      "uris": ["/api/v1/patients/*"],
      "ownerManagedAccess": false,
      "scopes": [
        {"name": "read"},
        {"name": "write"},
        {"name": "delete"},
        {"name": "export"},
        {"name": "print"}
      ],
      "attributes": {
        "classification": ["3"],
        "contains_phi": ["true"]
      }
    },
    {
      "name": "Lab Result",
      "type": "urn:healthcare:resources:lab-result",
      "uris": ["/api/v1/lab-results/*"],
      "scopes": [
        {"name": "read"},
        {"name": "write"},
        {"name": "verify"},
        {"name": "print"}
      ]
    },
    {
      "name": "Prescription",
      "type": "urn:healthcare:resources:prescription",
      "uris": ["/api/v1/prescriptions/*"],
      "scopes": [
        {"name": "read"},
        {"name": "write"},
        {"name": "dispense"},
        {"name": "cancel"}
      ]
    }
  ]
}
```

### 2.3。政策定義

```json
{
  "policies": [
    {
      "name": "Doctor Role Policy",
      "type": "role",
      "logic": "POSITIVE",
      "config": {
        "roles": [
          {"id": "doctor", "required": true}
        ]
      }
    },
    {
      "name": "Same Department Policy",
      "type": "script-js",
      "logic": "POSITIVE",
      "config": {
        "code": "var context = $evaluation.getContext(); var identity = context.getIdentity(); var userDept = identity.getAttributes().getValue('department').asString(0); var resourceDept = $evaluation.getPermission().getResource().getAttribute('department')[0]; if (userDept === resourceDept) { $evaluation.grant(); }"
      }
    },
    {
      "name": "Working Hours Policy",
      "type": "time",
      "logic": "POSITIVE",
      "config": {
        "notBefore": "06:00",
        "notOnOrAfter": "22:00"
      }
    },
    {
      "name": "Emergency Access Policy",
      "type": "role",
      "logic": "POSITIVE",
      "config": {
        "roles": [
          {"id": "emergency_access", "required": true}
        ]
      }
    }
  ]
}
```

### 2.4。權限

```json
{
  "permissions": [
    {
      "name": "Doctor Read Patient",
      "type": "scope",
      "resources": ["Patient Record"],
      "scopes": ["read"],
      "policies": ["Doctor Role Policy", "Same Department Policy"],
      "decisionStrategy": "AFFIRMATIVE"
    },
    {
      "name": "Doctor Write Prescription",
      "type": "scope",
      "resources": ["Prescription"],
      "scopes": ["write"],
      "policies": ["Doctor Role Policy"],
      "decisionStrategy": "UNANIMOUS"
    },
    {
      "name": "Emergency Override",
      "type": "scope",
      "resources": ["Patient Record", "Lab Result", "Prescription"],
      "scopes": ["read"],
      "policies": ["Emergency Access Policy"],
      "decisionStrategy": "AFFIRMATIVE"
    }
  ]
}
```

## 3. Quarkus 中的實現

### 3.1。帶有 @RolesAllowed 的 RBAC

```java
@Path("/api/v1/patients")
@Authenticated
public class PatientResource {

    @GET
    @RolesAllowed({"doctor", "nurse", "admin"})
    public List<PatientSummaryDTO> listPatients(
            @QueryParam("department") String department) {
        // Role check passed — now apply ABAC
        return patientService.findByDepartment(department);
    }

    @GET
    @Path("/{id}")
    @RolesAllowed({"doctor", "nurse", "patient"})
    public PatientDetailDTO getPatient(@PathParam("id") UUID id) {
        return patientService.findById(id);
    }

    @PUT
    @Path("/{id}")
    @RolesAllowed({"doctor", "admin"})
    public Response updatePatient(
            @PathParam("id") UUID id,
            PatientUpdateRequest request) {
        return patientService.update(id, request);
    }

    @DELETE
    @Path("/{id}")
    @RolesAllowed({"admin"})
    public Response deletePatient(@PathParam("id") UUID id) {
        // Soft delete only — PHI retention requirements
        return patientService.softDelete(id);
    }
}
```

### 3.2。具有自訂 SecurityIdentityAugmentor 的 ABAC

```java
@ApplicationScoped
public class HealthcareSecurityAugmentor implements SecurityIdentityAugmentor {

    @Inject
    TreatmentRelationshipService treatmentService;

    @Override
    public Uni<SecurityIdentity> augment(SecurityIdentity identity,
            AuthenticationRequestContext context) {

        return Uni.createFrom().item(() -> {
            QuarkusSecurityIdentity.Builder builder =
                QuarkusSecurityIdentity.builder(identity);

            // Add department attribute from JWT
            String department = identity.getAttribute("department");
            if (department != null) {
                builder.addAttribute("department", department);
            }

            // Add hospital code
            String hospitalCode = identity.getAttribute("hospitalCode");
            if (hospitalCode != null) {
                builder.addAttribute("hospitalCode", hospitalCode);
            }

            return builder.build();
        });
    }
}
```

### 3.3。 ABAC授權攔截器

```java
@Interceptor
@HealthcareAuthorization
@Priority(Interceptor.Priority.APPLICATION)
public class HealthcareAuthorizationInterceptor {

    @Inject
    SecurityIdentity identity;

    @Inject
    AuditService auditService;

    @AroundInvoke
    public Object authorize(InvocationContext ctx) throws Exception {
        HealthcareAuthorization annotation =
            ctx.getMethod().getAnnotation(HealthcareAuthorization.class);

        if (annotation == null) {
            return ctx.proceed();
        }

        // Check department access
        if (annotation.requireSameDepartment()) {
            String userDept = identity.getAttribute("department");
            UUID resourceId = extractResourceId(ctx);
            String resourceDept = getResourceDepartment(resourceId);

            if (!userDept.equals(resourceDept) &&
                !identity.hasRole("emergency_access")) {
                auditService.logAccessDenied(identity,
                    annotation.resource(), resourceId.toString(),
                    "Department mismatch: user=" + userDept +
                    " resource=" + resourceDept);
                throw new ForbiddenException(
                    "Access denied: department mismatch");
            }
        }

        // Check treatment relationship
        if (annotation.requireTreatmentRelationship()) {
            UUID patientId = extractPatientId(ctx);
            String doctorId = identity.getPrincipal().getName();

            if (!treatmentService.hasRelationship(doctorId, patientId)) {
                auditService.logAccessDenied(identity,
                    annotation.resource(), patientId.toString(),
                    "No treatment relationship");
                throw new ForbiddenException(
                    "No treatment relationship with patient");
            }
        }

        return ctx.proceed();
    }
}
```

### 3.4。自訂授權註解

```java
@InterceptorBinding
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD, ElementType.TYPE})
public @interface HealthcareAuthorization {
    String resource() default "";
    boolean requireSameDepartment() default false;
    boolean requireTreatmentRelationship() default false;
    int maxClassificationLevel() default 3;
}

// Usage
@GET
@Path("/{patientId}/clinical-notes")
@RolesAllowed("doctor")
@HealthcareAuthorization(
    resource = "ClinicalNote",
    requireSameDepartment = true,
    requireTreatmentRelationship = true
)
public List<ClinicalNoteDTO> getClinicalNotes(
        @PathParam("patientId") UUID patientId) {
    return clinicalNoteService.findByPatient(patientId);
}
```

## 4. 打破玻璃緊急通道

### 4.1。概念

```
Tình huống: Bệnh nhân cấp cứu, bác sĩ trực KHÔNG phải bác sĩ
điều trị → cần truy cập hồ sơ bệnh án NGAY LẬP TỨC

Normal Flow:        Emergency Flow:
Doctor ──▶ Check    Doctor ──▶ Break-the-Glass
           Role ✓              ▶ Log reason
           Dept ✓              ▶ Grant temporary access
           Rel. ✓              ▶ Alert security team
           ──▶ Access          ▶ Time-limited (2 hours)
                               ──▶ Access
                               ──▶ Post-review required
```

### 4.2。執行

```java
@Path("/api/v1/emergency-access")
@Authenticated
public class EmergencyAccessResource {

    @Inject
    SecurityIdentity identity;

    @Inject
    EmergencyAccessService emergencyService;

    @Inject
    NotificationService notificationService;

    @POST
    @RolesAllowed({"doctor", "nurse"})
    public Response requestEmergencyAccess(EmergencyAccessRequest request) {

        // Validate and log emergency access
        EmergencyAccess access = emergencyService.create(
            EmergencyAccess.builder()
                .requesterId(identity.getPrincipal().getName())
                .requesterRole(identity.getRoles().toString())
                .patientId(request.patientId())
                .reason(request.reason())  // Required: why emergency access?
                .expiresAt(Instant.now().plus(2, ChronoUnit.HOURS))
                .status(EmergencyAccessStatus.ACTIVE)
                .build()
        );

        // Alert security team and department head
        notificationService.alertEmergencyAccess(access);

        // Grant temporary role via Keycloak Admin API
        keycloakAdminService.grantTemporaryRole(
            identity.getPrincipal().getName(),
            "emergency_access",
            Duration.ofHours(2)
        );

        return Response.ok(Map.of(
            "accessId", access.getId(),
            "expiresAt", access.getExpiresAt(),
            "message", "Emergency access granted. This access will be reviewed."
        )).build();
    }
}
```

## 5. 存取控制矩陣

### 5.1。醫療保健許可矩陣

|資源 |醫生|護士|實驗室技術|藥劑師|病人 |管理員 |
|----------|--------|--------|----------|------------|--------|--------|
|病患人口統計 |讀/寫 |右 |右 |右 |擁有：R |讀/寫 |
|臨床筆記|讀/寫|右 | - | - |擁有：R | - |
|生命徵象|讀/寫 |讀/寫 | - | - |擁有：R | - |
|實驗室訂單|讀/寫 |右 |讀/寫 |右 |擁有：R |右 |
|實驗室結果 |右 |右 |讀/寫/視 |右 |擁有：R |右 |
|處方|讀/寫|右 | - |研發|擁有：R |右 |
|計費|右 | - | - | - |擁有：R |讀/寫 |
|稽核日誌| - | - | - | - | - |右 |

> R=讀取、W=寫入、D=分配、V=驗證、Own=僅自己的記錄

## 6. 總結

在本課中，我們有：

- 比較 **RBAC 與 ABAC** 以及結合 4 層醫療保健的策略
- 設定 **Keycloak 授權服務**（資源、策略、權限）
- 在 Quarkus 中實作 **RBAC** `@RolesAllowed`
- 使用自訂實作 **ABAC** `SecurityIdentityAugmentor` 和授權攔截器
- 設計**打破玻璃**緊急通道程序

## 練習

1.實現完整的ABAC實驗室結果訪問：只有同一科的醫生才能查看
2. 建立包含審核追蹤和通知的「打破玻璃」工作流程
3. 編寫權限矩陣整合測試（醫生 vs 護理師 vs 病人訪問）

---

---

<!-- SERIES-NAV:START -->
| ◀ 上一篇 |下一篇文章 ▶ |
|:---|---:|
| [第 5 課：根據醫療標準設計 Keycloak Realm - 醫院多租戶](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-5-thiet-ke-keycloak-realm-chuan-y-te) | [第 7 課：FHIR 上的 SMART - 用於醫療保健 API 的 OAuth2/OIDC](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-7-smart-on-fhir-oauth2-oidc-healthcare-apis) |
<!-- SERIES-NAV:END -->
