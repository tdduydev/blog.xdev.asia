---
id: 019e1a40-a105-7001-d001-f0a1b2c30105
title: 'Lesson 5: Setup Keycloak Realm for Hospitals — Multi-tenancy'
slug: bai-5-setup-keycloak-realm-benh-vien
description: >-
  Keycloak Realm design for multi-hospital medical system: Realm structure per
  Hospital vs Organizations, Client configuration for HIS/EMR/LIS, User Profile
  schema for medical staff, Patient Portal client, session management, security
  defenses, and realm import/export automation.
duration_minutes: 150
is_free: true
video_url: null
sort_order: 5
section_title: 'Part 2: Identity & Access Management with Keycloak'
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: >-
    Building a Microservices Healthcare System — Quarkus, PostgreSQL, Keycloak
    with HIPAA standards
  slug: xay-dung-he-thong-y-te-microservices
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-3057" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-3057)"/>

  <!-- Decorations -->
  <g>
    <circle cx="639" cy="267" r="32" fill="#818cf8" opacity="0.12000000000000001"/>
    <circle cx="678" cy="86" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="717" cy="165" r="26" fill="#818cf8" opacity="0.060000000000000005"/>
    <circle cx="756" cy="244" r="23" fill="#818cf8" opacity="0.13"/>
    <circle cx="795" cy="63" r="20" fill="#818cf8" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <line x1="600" y1="197" x2="1100" y2="277" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="227" x2="1050" y2="297" stroke="#818cf8" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1074.712812921102,231 1074.712812921102,263 1047,279 1019.287187078898,263 1019.287187078898,231 1047,215" fill="none" stroke="#818cf8" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Architecture — Lesson 5</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 5: Setup Keycloak Realm for Hospitals</tspan>
      <tspan x="60" dy="42">— Multi-tenancy</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Building a Microservices Healthcare System — Quarkus, PostgreSQL, Keycloak with HIPAA standards</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 2: Identity & Access Management with Keycloak</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. Multi-tenancy Strategy for Healthcare Systems

![Keycloak Realm architecture for multi-branch hospital system](/storage/uploads/2026/04/healthcare-keycloak-realm-architecture.webp)

### 1.1. Multi-tenancy models with Keycloak

When building a medical system for many hospitals/clinics, there are 3 strategies:

![3 Keycloak Multi-tenancy strategies for multi-hospital systems](/storage/uploads/2026/04/healthcare-keycloak-multitenancy.webp)

| Strategy | Model | Isolation | Suitable |
|----------|--------|-----------|----------|
| **A: Realm per Hospital** | Each hospital has its own Realm | Highest — isolated users, roles, clients | Independent Hospital |
| **B: Shared Realm + Organizations** | 1 Healthcare Realm, each hospital is 1 Organization | Medium — shared identity + org isolation | Hospital chain, Department of Health |
| **C: Shared Realm + Groups** | 1 Realm, divided by Groups | Low — simple, less isolation | Small clinic |

### 1.2. Recommendations for Vietnamese Health

| Scenario | Recommended Strategy | Reason |
|----------|---------------------|-------|
| Private hospital chain | Strategy B (Organizations) | Shared patient identity, org-level isolation |
| Independent public hospital | Strategy A (Realm per Hospital) | Maximum isolation, independent management |
| Small polyclinic | Strategy C (Groups) | Simple, easy to manage |
| The Department of Health manages many facilities | Strategy B (Organizations) | Central management, org delegation |

## 2. Healthcare Realm Design

### 2.1. Realm Configuration

```json
{
  "realm": "healthcare",
  "displayName": "Healthcare Platform",
  "enabled": true,
  "sslRequired": "all",
  "registrationAllowed": false,
  "loginWithEmailAllowed": true,
  "duplicateEmailsAllowed": false,
  "resetPasswordAllowed": true,
  "editUsernameAllowed": false,
  "bruteForceProtected": true,
  "permanentLockout": false,
  "maxFailureWaitSeconds": 900,
  "minimumQuickLoginWaitSeconds": 60,
  "waitIncrementSeconds": 300,
  "quickLoginCheckMilliSeconds": 1000,
  "maxDeltaTimeSeconds": 43200,
  "failureFactor": 5,

  "passwordPolicy": "length(12) and upperCase(1) and lowerCase(1) and digits(1) and specialChars(1) and notUsername and passwordHistory(5) and maxLength(128)",

  "ssoSessionIdleTimeout": 900,
  "ssoSessionMaxLifespan": 28800,
  "accessTokenLifespan": 300,
  "accessTokenLifespanForImplicitFlow": 300,
  "offlineSessionIdleTimeout": 2592000,

  "actionTokenGeneratedByAdminLifespan": 43200,
  "actionTokenGeneratedByUserLifespan": 300,

  "organizationsEnabled": true,

  "attributes": {
    "cibaBackchannelTokenDeliveryMode": "poll",
    "cibaExpiresIn": "120",
    "cibaAuthRequestedUserHint": "login_hint",
    "parRequestUriLifespan": "60"
  }
}
```

### 2.2. Security Defenses Configuration

```json
{
  "browserSecurityHeaders": {
    "contentSecurityPolicy": "default-src 'self'; frame-src 'self'; frame-ancestors 'self'; object-src 'none'; script-src 'self' 'unsafe-inline';",
    "contentSecurityPolicyReportOnly": "",
    "xContentTypeOptions": "nosniff",
    "xRobotsTag": "none",
    "xFrameOptions": "SAMEORIGIN",
    "strictTransportSecurity": "max-age=31536000; includeSubDomains",
    "xXSSProtection": "1; mode=block",
    "referrerPolicy": "no-referrer"
  }
}
```

## 3. Client Configuration for Healthcare

### 3.1. Clients Overview

| Clients | Type | Description |
|--------|--------|-------------|
| his-web-app | Public | HIS Web Frontend |
| emr-web-app | Public | EMR Web Frontend |
| patient-portal | Public | Patient Portal |
| mobile-doctor-app | Public | Doctor Mobile App |
| patient-service | Confidential | Patient API |
| clinical-service | Confidential | Clinical API |
| lab-service | Confidential | Lab Results API |
| pharmacy-service | Confidential | Pharmacy API |
| scheduling-service | Confidential | Scheduling API |
| billing-service | Confidential | Billing API |
| notification-service | Confidential | Notifications |
| audit-service | Confidential | Audit/Logging |
| api-gateway | Confidential | Kong/APISIX |
| admin-cli | Confidential | Admin Operations |
| fhir-server | Confidential | HAPI FHIR Server |

### 3.2. Patient Portal Client (Public)

```json
{
  "clientId": "patient-portal",
  "name": "Patient Portal",
  "description": "Patient self-service portal for viewing medical records",
  "enabled": true,
  "publicClient": true,
  "standardFlowEnabled": true,
  "directAccessGrantsEnabled": false,
  "implicitFlowEnabled": false,
  "serviceAccountsEnabled": false,
  "authorizationServicesEnabled": false,

  "rootUrl": "https://portal.hospital.vn",
  "baseUrl": "/",
  "redirectUris": [
    "https://portal.hospital.vn/*"
  ],
  "webOrigins": [
    "https://portal.hospital.vn"
  ],

  "defaultClientScopes": [
    "openid", "profile", "email", "patient-scope"
  ],
  "optionalClientScopes": [
    "offline_access"
  ],

  "attributes": {
    "pkce.code.challenge.method": "S256",
    "post.logout.redirect.uris": "https://portal.hospital.vn/*",
    "access.token.lifespan": "300",
    "client.session.idle.timeout": "600"
  }
}
```

### 3.3. Microservice Client (Confidential)

```json
{
  "clientId": "patient-service",
  "name": "Patient Microservice",
  "description": "Backend service managing patient demographics",
  "enabled": true,
  "publicClient": false,
  "standardFlowEnabled": false,
  "directAccessGrantsEnabled": false,
  "serviceAccountsEnabled": true,
  "authorizationServicesEnabled": true,

  "secret": "${PATIENT_SERVICE_SECRET}",

  "defaultClientScopes": [
    "openid", "microprofile-jwt"
  ],

  "attributes": {
    "use.jwks.url": "true",
    "token.endpoint.auth.signing.alg": "RS256"
  },

  "authorizationSettings": {
    "policyEnforcementMode": "ENFORCING",
    "decisionStrategy": "AFFIRMATIVE",
    "resources": [
      {
        "name": "Patient Record",
        "type": "urn:patient-service:resources:patient",
        "uris": ["/api/v1/patients/*"],
        "scopes": [
          {"name": "read"},
          {"name": "write"},
          {"name": "delete"}
        ]
      }
    ]
  }
}
```

## 4. User Profile Schema for Healthcare

### 4.1. Healthcare User Attributes

```json
{
  "attributes": [
    {
      "name": "employeeId",
      "displayName": "Mã nhân viên",
      "required": { "roles": ["user"] },
      "permissions": { "edit": ["admin"], "view": ["admin", "user"] },
      "validations": { "pattern": { "pattern": "^NV-\\d{6}$" } }
    },
    {
      "name": "medicalLicenseNumber",
      "displayName": "Số giấy phép hành nghề",
      "required": { "roles": ["doctor"] },
      "permissions": { "edit": ["admin"], "view": ["admin", "user"] },
      "validations": { "length": { "min": 5, "max": 20 } }
    },
    {
      "name": "department",
      "displayName": "Khoa/Phòng",
      "required": { "roles": ["user"] },
      "permissions": { "edit": ["admin"], "view": ["admin", "user"] },
      "validations": {
        "options": {
          "options": [
            "KHOA_NOI", "KHOA_NGOAI", "KHOA_SAN", "KHOA_NHI",
            "KHOA_UNG_BUOU", "KHOA_TIM_MACH", "KHOA_THAN_KINH",
            "KHOA_XET_NGHIEM", "KHOA_CHAN_DOAN_HINH_ANH",
            "KHOA_DUOC", "KHOA_CAP_CUU", "PHONG_HANH_CHINH"
          ]
        }
      }
    },
    {
      "name": "hospitalCode",
      "displayName": "Mã bệnh viện",
      "required": { "roles": ["user"] },
      "permissions": { "edit": ["admin"], "view": ["admin"] }
    },
    {
      "name": "specialization",
      "displayName": "Chuyên khoa",
      "permissions": { "edit": ["admin"], "view": ["admin", "user"] }
    }
  ]
}
```

### 4.2. Custom Token Mapper for Healthcare Claims

```json
{
  "name": "healthcare-claims-mapper",
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

JWT Token will contain healthcare-specific claims:

```json
{
  "sub": "019e1a40-user-0001-d001-f0a1b2c30001",
  "name": "BS. Nguyễn Văn A",
  "preferred_username": "bs.nguyen.a",
  "email": "nguyen.a@hospital.vn",
  "realm_access": {
    "roles": ["doctor", "department_head"]
  },
  "resource_access": {
    "patient-service": { "roles": ["patient_read", "patient_write"] },
    "lab-service": { "roles": ["lab_read", "lab_order"] },
    "pharmacy-service": { "roles": ["prescription_write"] }
  },
  "department": "KHOA_NOI",
  "hospitalCode": "BV-CR-001",
  "medicalLicenseNumber": "GPHN-12345",
  "employeeId": "NV-001234",
  "org_id": "bv-cho-ray"
}
```

## 5. Role Hierarchy for Healthcare

### 5.1. Realm Roles

```
Realm Roles:
├── super_admin          (Quản trị hệ thống toàn cục)
├── hospital_admin       (Quản trị bệnh viện)
├── department_head      (Trưởng khoa)
├── doctor              (Bác sĩ)
├── senior_nurse         (Điều dưỡng trưởng)
├── nurse               (Điều dưỡng)
├── lab_technician       (Kỹ thuật viên xét nghiệm)
├── pharmacist           (Dược sĩ)
├── radiologist          (Bác sĩ chẩn đoán hình ảnh)
├── receptionist         (Lễ tân)
├── billing_staff        (Nhân viên thanh toán)
├── patient              (Bệnh nhân - Patient Portal)
└── auditor              (Kiểm toán viên - read-only)
```

### 5.2. Composite Roles

```json
{
  "name": "doctor",
  "composite": true,
  "composites": {
    "realm": [],
    "client": {
      "patient-service": ["patient_read", "patient_write"],
      "clinical-service": ["encounter_read", "encounter_write", "diagnosis_write"],
      "lab-service": ["lab_read", "lab_order"],
      "pharmacy-service": ["prescription_read", "prescription_write"],
      "scheduling-service": ["appointment_read", "appointment_write"],
      "imaging-service": ["imaging_read", "imaging_order"]
    }
  }
}
```

## 6. Session Management for Hospitals

### 6.1. Session Policies

| User Type | Session Idle | Session Max | Reason |
|-----------|-------------|-------------|--------|
| Doctor | 15 min | 8 hours | Shared workstations, frequent auto-logoff |
| Nurse | 10 min | 8 hours | Mobile carts, quick access needed |
| Patient Portal | 15 min | 2 hours | Public internet access |
| Admin | 30 min | 8 hours | Administrative tasks, less PHI exposure |
| Service Account | N/A | N/A | Token-based, no interactive session |

### 6.2. Shared Workstation Support

Hospitals often have shared workstations — many doctors/nurses share one computer. Solution:

![3 authentication options on shared hospital workstation](/storage/uploads/2026/04/healthcare-shared-workstation-auth.webp)

| Options | Mechanism | Advantages | Limitations |
|--------|--------|---------|----------|
| **1. Fast User Switching** | Keycloak short session + badge login | Fast, convenient | Need infrastructure (badge reader) |
| **2. Auto-logoff + Quick re-auth** | Session timeout 10-15 min + PIN | Simple, no hardware needed | Slower than badge |
| **3. Virtual Desktop (VDI)** | Each user has their own virtual desktop | Full isolation | Expensive, higher latency |

## 7. Realm Export/Import Automation

### 7.1. Infrastructure as Code for Keycloak

```bash
#!/bin/bash
# export-realm.sh - Export healthcare realm for version control

KEYCLOAK_URL="https://keycloak.hospital.internal"
ADMIN_TOKEN=$(curl -s -X POST "${KEYCLOAK_URL}/realms/master/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin" \
  -d "password=${KC_ADMIN_PASSWORD}" \
  -d "grant_type=password" \
  -d "client_id=admin-cli" | jq -r '.access_token')

# Export realm (excluding users for security)
curl -s -X GET "${KEYCLOAK_URL}/admin/realms/healthcare" \
  -H "Authorization: Bearer ${ADMIN_TOKEN}" \
  -H "Accept: application/json" | jq '.' > realm-healthcare-export.json

echo "Realm exported successfully"
```

### 7.2. Terraform for Keycloak (Optional)

```hcl
# keycloak.tf - Keycloak Realm as Code
resource "keycloak_realm" "healthcare" {
  realm   = "healthcare"
  enabled = true

  login_theme = "healthcare-theme"

  security_defenses {
    brute_force_detection {
      permanent_lockout                = false
      max_login_failures               = 5
      wait_increment_seconds           = 300
      quick_login_check_milli_seconds  = 1000
      minimum_quick_login_wait_seconds = 60
      max_failure_wait_seconds         = 900
    }
  }

  ssl_required    = "all"
  password_policy = "length(12) and upperCase(1) and lowerCase(1) and digits(1) and specialChars(1)"

  sso_session_idle_timeout = "15m"
  sso_session_max_lifespan = "8h"
  access_token_lifespan    = "5m"
}

resource "keycloak_role" "doctor" {
  realm_id    = keycloak_realm.healthcare.id
  name        = "doctor"
  description = "Bác sĩ - Full clinical access"
  composite_roles = [
    keycloak_role.patient_read.id,
    keycloak_role.patient_write.id,
    keycloak_role.prescription_write.id,
  ]
}
```

## 8. Summary

In this lesson, we have:

- Compare **3 multi-tenancy strategies** for multi-hospital systems
- **Healthcare Realm** design with security hardening
- Configure **Clients** for patient portal, microservices, and admin
- Build **User Profile schema** with healthcare-specific attributes
- Design **Role hierarchy** to suit the hospital organization
- Configure **Session management** for shared workstations
- Automate **Realm export/import** with Infrastructure as Code

## Exercises

1. Create a "healthcare" Keycloak Realm with all the security configurations from the lesson
2. Register 5 clients: patient-portal, patient-service, lab-service, pharmacy-service, api-gateway
3. Create a role hierarchy and assign it to test users: 1 doctor, 1 nurse, 1 patient
4. Export realm configuration and commit to Git repository

---

---

<!-- SERIES-NAV:START -->
| ◀ Previous article | Next article ▶ |
|:---|---:|
| [Lesson 4: Threat Modeling STRIDE/DREAD for Health Information System](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-4-threat-modeling-stride-dread-cho-his) | [Lesson 6: RBAC & ABAC - Decentralization of Doctors, Nurses, and Patients](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-6-rbac-abac-phan-quyen-nhan-vien-y-te) |
<!-- SERIES-NAV:END -->
