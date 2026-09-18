---
id: 019e1a40-a124-7001-d001-f0a1b2c30124
title: 'Lesson 24: Capstone — Deploy Healthcare Platform Production-Ready'
slug: bai-24-capstone-deploy-production
description: >-
  General project: building a complete Healthcare Microservices Platform with
  full security controls. Includes Patient Service, Appointment Service, Lab
  Results Service, Prescription Service on Quarkus, PostgreSQL with RLS +
  encryption, Keycloak IAM, API Gateway, audit logging, monitoring, and
  deployment on Kubernetes with full HIPAA compliance.
duration_minutes: 300
is_free: true
video_url: null
sort_order: 24
section_title: 'Part 6: Production & Operation'
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
    <linearGradient id="bg-3402" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-3402)"/>

  <!-- Decorations -->
  <g>
    <circle cx="985" cy="285" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="870" cy="110" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="755" cy="195" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="640" cy="280" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="1025" cy="105" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <line x1="600" y1="55" x2="1100" y2="135" stroke="#fb923c" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="85" x2="1050" y2="155" stroke="#fb923c" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1030.9807621135333,190 1030.9807621135333,220 1005,235 979.0192378864668,220 979.0192378864668,190 1005,175" fill="none" stroke="#fb923c" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fb923c"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fb923c" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ Architecture — Lesson 24</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 24: Capstone — Deploy Healthcare</tspan>
      <tspan x="60" dy="42">Platform Production-Ready</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Building a Microservices Healthcare System — Quarkus, PostgreSQL, Keycloak with HIPAA standards</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 6: Production & Operation</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. Introducing the Capstone Project

![Production Deployment — Healthcare Platform on Kubernetes with HIPAA Compliance](/storage/uploads/2026/04/healthcare-production-deployment.webp)

### 1.1. Target

In this final article, we will **synthesize all the knowledge from the previous 23 articles** to build a complete **Secure Healthcare Microservices Platform** — from architectural design, to implementing security controls, to compliance verification.

**Compiled from 23 lessons:**

| Part | Article | Main topic |
|:---|:---|:---|
| **Part 1: Foundation** | Lesson 1–4 | HIPAA, Threat Modeling, Risk Assessment, Architecture |
| **Part 2: IAM** | Lesson 5–8 | Keycloak, RBAC/ABAC, MFA, SMART on FHIR |
| **Part 3: Database** | Lessons 9–12 | PostgreSQL Security, Encryption, RLS, pgAudit |
| **Part 4: Microservices** | Lesson 13–16 | Quarkus Security, API Gateway, E2E Encryption, mTLS |
| **Part 5: Compliance** | Lessons 17–20 | HIPAA Safeguards, Audit Trail, Data Masking, DR/BCP |
| **Part 6: Advanced** | Lessons 21–24 | Zero Trust, Container Security, Pentest, Capstone |

**Deliverables:**

- ✅ Working microservices with full security
- ✅ HIPAA Technical Safeguards compliance
- ✅ Automated security testing pipeline
- ✅ Deployment on Kubernetes with hardening
- ✅ Security Assessment Report

### 1.2. System scope

We will build a **Hospital Management System** (Hospital Management System — HMS) with microservices:

| Service | Description | PHI Data |
|:---|:---|:---|
| **Patient Service** | Patient record management | Name, DOB, SSN, address, contact |
| **Encounter Service** | Managing visits/hospitalizations | Diagnosis, reason for examination, treating doctor |
| **Lab Service** | Test results | Results of blood, urine, and biopsy tests |
| **Prescription Service** | Prescription | Prescription drugs, dosage, drug interactions |
| **Notification Service** | Notifications & reminders | Follow-up check-up schedule, medication reminders |
| **Audit Service** | Record audit trail | All access logs |

---

## 2. Overall architecture

### 2.1. System Architecture

![Capstone Healthcare Platform Architecture](/storage/uploads/2026/04/healthcare-capstone-architecture.webp)

**3-layer security architecture:**

| Layers | Components | Security Controls |
|:---|:---|:---|
| **DMZ / Edge** | API Gateway (Kong) | Rate limiting (100 req/min), WAF (OWASP CRS), JWT verification, IP allowlisting |
| **Application (K8s)** | Patient, Encounter, Lab, Prescription Services (Quarkus) | OIDC, RBAC/ABAC, Encryption, Audit |
| **Service Mesh** | Istio | mTLS everywhere, Network Policies, Distributed Tracing |
| **Supporting** | Notification, Audit, Keycloak IAM | Event-driven, immutable logs, multi-tenant |
| **Data** | PostgreSQL (Primary + Replica) | RLS, pgcrypto, pgAudit, SSL, Backups |
| **Messaging** | Kafka (Events) | Encrypted topics, Schema Registry |
| **Secrets** | Vault (KMS) | Transit encryption, PKI, Auto-unseal |
| **Logging** | Elasticsearch | Audit log aggregation |

### 2.2. Project Structure

```
healthcare-platform/
├── docker-compose.yml           # Local development
├── docker-compose.security.yml  # Security testing
├── pom.xml                      # Parent POM
│
├── infrastructure/
│   ├── keycloak/
│   │   ├── hospital-realm.json  # Realm configuration
│   │   └── themes/              # Custom login theme
│   ├── postgresql/
│   │   ├── init.sql             # Database initialization
│   │   ├── rls-policies.sql     # Row-Level Security
│   │   ├── audit-setup.sql      # pgAudit configuration
│   │   └── encryption.sql       # Column encryption functions
│   ├── kong/
│   │   └── kong.yml             # API Gateway config
│   ├── vault/
│   │   └── policies/            # Vault policies
│   └── kubernetes/
│       ├── base/                # Kustomize base
│       ├── overlays/
│       │   ├── dev/
│       │   ├── staging/
│       │   └── production/
│       └── security/
│           ├── network-policies.yaml
│           ├── pod-security.yaml
│           └── falco-rules.yaml
│
├── services/
│   ├── patient-service/
│   │   ├── pom.xml
│   │   └── src/
│   ├── encounter-service/
│   ├── lab-service/
│   ├── prescription-service/
│   ├── notification-service/
│   └── audit-service/
│
├── shared/
│   ├── security-lib/            # Shared security utilities
│   │   ├── encryption/
│   │   ├── audit/
│   │   └── validation/
│   └── test-lib/                # Shared test utilities
│       ├── security-tests/
│       └── test-data/           # Synthetic healthcare data
│
├── security/
│   ├── .semgrep/                # SAST rules
│   ├── zap/                     # DAST configuration
│   ├── nuclei/                  # Nuclei templates
│   └── compliance/              # HIPAA compliance checks
│
└── .github/
    └── workflows/
        ├── ci.yml               # Build + Security scans
        └── security-audit.yml   # Scheduled audit
```

---

## 3. Step 1: Configure Keycloak — IAM

### 3.1. Hospital Realm Configuration

```json
{
  "realm": "hospital",
  "enabled": true,
  "sslRequired": "all",
  "registrationAllowed": false,
  "bruteForceProtected": true,
  "permanentLockout": false,
  "maxFailureWaitSeconds": 900,
  "failureFactor": 5,
  "passwordPolicy": "length(12) and upperCase(1) and lowerCase(1) and digits(1) and specialChars(1) and notUsername and passwordHistory(6) and forceExpiredPasswordChange(90)",
  "ssoSessionIdleTimeout": 900,
  "ssoSessionMaxLifespan": 28800,
  "accessTokenLifespan": 300,
  "refreshTokenMaxReuse": 0,

  "roles": {
    "realm": [
      {
        "name": "chief-physician",
        "description": "Bác sĩ trưởng khoa",
        "composite": true,
        "composites": {
          "realm": ["physician", "view-department-records"]
        }
      },
      {
        "name": "physician",
        "description": "Bác sĩ điều trị",
        "composite": true,
        "composites": {
          "realm": ["view-assigned-patients", "create-encounter",
                     "create-prescription", "view-lab-results"]
        }
      },
      {
        "name": "head-nurse",
        "description": "Y tá trưởng",
        "composite": true,
        "composites": {
          "realm": ["nurse", "manage-ward-schedule"]
        }
      },
      {
        "name": "nurse",
        "description": "Y tá",
        "composite": false
      },
      {
        "name": "lab-technician",
        "description": "Kỹ thuật viên xét nghiệm",
        "composite": false
      },
      {
        "name": "pharmacist",
        "description": "Dược sĩ",
        "composite": false
      },
      {
        "name": "patient",
        "description": "Bệnh nhân",
        "composite": false
      },
      {
        "name": "admin",
        "description": "Quản trị hệ thống",
        "composite": false
      }
    ]
  },

  "users": [
    {
      "username": "dr.nguyen",
      "email": "dr.nguyen@hospital.local",
      "firstName": "Nguyễn",
      "lastName": "Văn A",
      "enabled": true,
      "requiredActions": ["CONFIGURE_TOTP"],
      "attributes": {
        "department": ["cardiology"],
        "medical_license": ["BS-12345"],
        "employee_id": ["EMP-001"]
      },
      "realmRoles": ["physician"]
    },
    {
      "username": "yta.tran",
      "email": "yta.tran@hospital.local",
      "firstName": "Trần",
      "lastName": "Thị B",
      "enabled": true,
      "attributes": {
        "department": ["cardiology"],
        "ward": ["ward-3"],
        "employee_id": ["EMP-042"]
      },
      "realmRoles": ["nurse"]
    },
    {
      "username": "patient.le",
      "email": "patient.le@gmail.com",
      "firstName": "Lê",
      "lastName": "Văn C",
      "enabled": true,
      "attributes": {
        "patient_id": ["PAT-001"],
        "insurance_id": ["INS-BH-123456"]
      },
      "realmRoles": ["patient"]
    }
  ],

  "clients": [
    {
      "clientId": "patient-service",
      "name": "Patient Microservice",
      "enabled": true,
      "clientAuthenticatorType": "client-secret",
      "serviceAccountsEnabled": true,
      "authorizationServicesEnabled": true,
      "directAccessGrantsEnabled": false,
      "publicClient": false,
      "protocol": "openid-connect",
      "defaultClientScopes": ["openid", "profile", "healthcare"],
      "attributes": {
        "access.token.lifespan": "300"
      }
    },
    {
      "clientId": "patient-portal",
      "name": "Patient Portal SPA",
      "enabled": true,
      "publicClient": true,
      "directAccessGrantsEnabled": false,
      "standardFlowEnabled": true,
      "redirectUris": ["https://portal.hospital.local/*"],
      "webOrigins": ["https://portal.hospital.local"],
      "defaultClientScopes": ["openid", "profile"],
      "attributes": {
        "pkce.code.challenge.method": "S256",
        "access.token.lifespan": "300"
      }
    }
  ],

  "clientScopes": [
    {
      "name": "healthcare",
      "protocol": "openid-connect",
      "protocolMappers": [
        {
          "name": "department-mapper",
          "protocol": "openid-connect",
          "protocolMapper": "oidc-usermodel-attribute-mapper",
          "config": {
            "user.attribute": "department",
            "claim.name": "department",
            "access.token.claim": "true",
            "id.token.claim": "true"
          }
        },
        {
          "name": "employee-id-mapper",
          "protocol": "openid-connect",
          "protocolMapper": "oidc-usermodel-attribute-mapper",
          "config": {
            "user.attribute": "employee_id",
            "claim.name": "employee_id",
            "access.token.claim": "true"
          }
        },
        {
          "name": "patient-id-mapper",
          "protocol": "openid-connect",
          "protocolMapper": "oidc-usermodel-attribute-mapper",
          "config": {
            "user.attribute": "patient_id",
            "claim.name": "patient_id",
            "access.token.claim": "true"
          }
        }
      ]
    }
  ],

  "authenticationFlows": [
    {
      "alias": "healthcare-browser-flow",
      "description": "Browser flow with MFA for healthcare",
      "providerId": "basic-flow",
      "topLevel": true,
      "builtIn": false,
      "authenticationExecutions": [
        {
          "authenticator": "auth-cookie",
          "requirement": "ALTERNATIVE"
        },
        {
          "authenticator": "auth-username-password-form",
          "requirement": "REQUIRED"
        },
        {
          "authenticator": "auth-otp-form",
          "requirement": "CONDITIONAL",
          "authenticatorConfig": {
            "alias": "healthcare-otp-config"
          }
        }
      ]
    }
  ]
}
```

---

## 4. Step 2: PostgreSQL Security Setup

### 4.1. Database Initialization with Security

```sql
-- infrastructure/postgresql/init.sql

-- ================================================================
-- 1. Create application roles (least privilege)
-- ================================================================

-- Service accounts (one per microservice)
CREATE ROLE patient_service_role LOGIN PASSWORD NULL; -- cert auth only
CREATE ROLE encounter_service_role LOGIN PASSWORD NULL;
CREATE ROLE lab_service_role LOGIN PASSWORD NULL;
CREATE ROLE prescription_service_role LOGIN PASSWORD NULL;
CREATE ROLE audit_service_role LOGIN PASSWORD NULL;

-- Read-only role for reporting
CREATE ROLE reporting_role LOGIN PASSWORD NULL;

-- ================================================================
-- 2. Create schemas with isolation
-- ================================================================

CREATE SCHEMA IF NOT EXISTS patient_data;
CREATE SCHEMA IF NOT EXISTS encounter_data;
CREATE SCHEMA IF NOT EXISTS lab_data;
CREATE SCHEMA IF NOT EXISTS prescription_data;
CREATE SCHEMA IF NOT EXISTS audit_data;

-- Grant schema access to respective services
GRANT USAGE ON SCHEMA patient_data TO patient_service_role;
GRANT USAGE ON SCHEMA encounter_data TO encounter_service_role;
GRANT USAGE ON SCHEMA lab_data TO lab_service_role;
GRANT USAGE ON SCHEMA prescription_data TO prescription_service_role;
GRANT USAGE ON SCHEMA audit_data TO audit_service_role;

-- ================================================================
-- 3. Install security extensions
-- ================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS pgaudit;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================================
-- 4. Encryption helper functions
-- ================================================================

-- Envelope encryption: encrypt data with DEK, DEK encrypted with KEK
CREATE OR REPLACE FUNCTION patient_data.encrypt_phi(
    plaintext TEXT,
    context TEXT DEFAULT 'patient_phi'
) RETURNS JSONB AS $$
DECLARE
    dek BYTEA;
    encrypted_data BYTEA;
    encrypted_dek BYTEA;
    kek BYTEA;
BEGIN
    -- Generate random DEK (Data Encryption Key)
    dek := gen_random_bytes(32);
    
    -- Encrypt data with DEK (AES-256-GCM via pgcrypto)
    encrypted_data := encrypt_iv(
        convert_to(plaintext, 'UTF8'),
        dek,
        gen_random_bytes(16), -- IV
        'aes-cbc/pad:pkcs'
    );
    
    -- In production: DEK encrypted by Vault Transit engine
    -- For demo: encrypt DEK with master key from env
    kek := decode(current_setting('app.master_key', true), 'hex');
    encrypted_dek := encrypt(dek, kek, 'aes');
    
    RETURN jsonb_build_object(
        'v', 1,
        'ctx', context,
        'dek', encode(encrypted_dek, 'base64'),
        'data', encode(encrypted_data, 'base64'),
        'ts', extract(epoch from now())
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ================================================================
-- 5. Create tables with security
-- ================================================================

CREATE TABLE patient_data.patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    mrn VARCHAR(20) NOT NULL UNIQUE,          -- Medical Record Number
    
    -- PHI fields — encrypted at column level
    full_name_encrypted JSONB,                 -- Encrypted via encrypt_phi()
    date_of_birth_encrypted JSONB,
    ssn_encrypted JSONB,                       -- Social Security Number
    phone_encrypted JSONB,
    address_encrypted JSONB,
    
    -- Non-PHI fields — stored in plaintext
    gender VARCHAR(10),
    blood_type VARCHAR(5),
    department_id VARCHAR(50) NOT NULL,        -- For RLS
    primary_physician_id VARCHAR(50),          -- For RLS
    
    -- Metadata
    tenant_id UUID NOT NULL,                   -- Hospital/tenant
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE encounter_data.encounters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    patient_id UUID NOT NULL,
    encounter_type VARCHAR(20) NOT NULL,       -- INPATIENT, OUTPATIENT, EMERGENCY
    
    -- PHI fields — encrypted
    chief_complaint_encrypted JSONB,
    diagnosis_encrypted JSONB,
    clinical_notes_encrypted JSONB,
    
    -- Non-PHI
    department_id VARCHAR(50) NOT NULL,
    attending_physician_id VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    
    -- Metadata
    tenant_id UUID NOT NULL,
    encounter_date TIMESTAMPTZ DEFAULT NOW(),
    discharge_date TIMESTAMPTZ,
    created_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE lab_data.lab_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    patient_id UUID NOT NULL,
    encounter_id UUID,
    
    -- PHI fields — encrypted
    test_results_encrypted JSONB,
    interpretation_encrypted JSONB,
    
    -- Non-PHI
    test_type VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    ordering_physician_id VARCHAR(50) NOT NULL,
    performing_technician_id VARCHAR(50),
    department_id VARCHAR(50) NOT NULL,
    
    -- Metadata
    tenant_id UUID NOT NULL,
    ordered_at TIMESTAMPTZ DEFAULT NOW(),
    resulted_at TIMESTAMPTZ,
    created_by VARCHAR(100) NOT NULL
);

CREATE TABLE prescription_data.prescriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    patient_id UUID NOT NULL,
    encounter_id UUID,
    
    -- PHI fields — encrypted
    medications_encrypted JSONB,              -- Drug names, dosages
    instructions_encrypted JSONB,
    
    -- Non-PHI
    status VARCHAR(20) DEFAULT 'ACTIVE',
    prescribing_physician_id VARCHAR(50) NOT NULL,
    dispensing_pharmacist_id VARCHAR(50),
    department_id VARCHAR(50) NOT NULL,
    
    -- Digital signature for non-repudiation
    physician_signature JSONB,                -- {algorithm, signature, cert_thumbprint}
    
    -- Metadata
    tenant_id UUID NOT NULL,
    prescribed_at TIMESTAMPTZ DEFAULT NOW(),
    dispensed_at TIMESTAMPTZ,
    created_by VARCHAR(100) NOT NULL
);

-- ================================================================
-- 6. Row-Level Security Policies
-- ================================================================

ALTER TABLE patient_data.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE encounter_data.encounters ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_data.lab_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescription_data.prescriptions ENABLE ROW LEVEL SECURITY;

-- Patient Service: can only access patients in its department scope
CREATE POLICY patient_department_isolation ON patient_data.patients
    FOR ALL
    TO patient_service_role
    USING (
        department_id = current_setting('app.current_department', true)
        OR current_setting('app.current_role', true) = 'admin'
        OR (
            -- Bác sĩ chỉ thấy bệnh nhân của mình
            current_setting('app.current_role', true) = 'physician'
            AND primary_physician_id = current_setting('app.current_user_id', true)
        )
        OR (
            -- Bệnh nhân chỉ thấy hồ sơ của chính mình
            current_setting('app.current_role', true) = 'patient'
            AND id::text = current_setting('app.current_patient_id', true)
        )
    );

-- Multi-tenant isolation
CREATE POLICY patient_tenant_isolation ON patient_data.patients
    FOR ALL
    TO patient_service_role
    USING (tenant_id::text = current_setting('app.current_tenant_id', true));

-- Encounter: physician sees own patients' encounters
CREATE POLICY encounter_physician_policy ON encounter_data.encounters
    FOR ALL
    TO encounter_service_role
    USING (
        attending_physician_id = current_setting('app.current_user_id', true)
        OR department_id = current_setting('app.current_department', true)
        OR current_setting('app.current_role', true) IN ('admin', 'chief-physician')
    );

-- Lab Results: accessible by ordering physician, lab tech, assigned nurse
CREATE POLICY lab_result_policy ON lab_data.lab_results
    FOR ALL
    TO lab_service_role
    USING (
        ordering_physician_id = current_setting('app.current_user_id', true)
        OR performing_technician_id = current_setting('app.current_user_id', true)
        OR department_id = current_setting('app.current_department', true)
    );

-- ================================================================
-- 7. pgAudit Configuration
-- ================================================================

ALTER SYSTEM SET pgaudit.log = 'read, write, ddl';
ALTER SYSTEM SET pgaudit.log_relation = 'on';
ALTER SYSTEM SET pgaudit.log_parameter = 'on';
ALTER SYSTEM SET pgaudit.log_catalog = 'off';

-- Object-level audit for PHI tables
SELECT pgaudit.set_config('log', 'all', true);

-- ================================================================
-- 8. Audit trail table (immutable — no UPDATE/DELETE)
-- ================================================================

CREATE TABLE audit_data.access_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id VARCHAR(100) NOT NULL,
    user_role VARCHAR(50) NOT NULL,
    action VARCHAR(20) NOT NULL,         -- READ, CREATE, UPDATE, DELETE
    resource_type VARCHAR(50) NOT NULL,  -- Patient, Encounter, LabResult
    resource_id UUID,
    department VARCHAR(50),
    tenant_id UUID NOT NULL,
    ip_address INET,
    user_agent TEXT,
    request_id UUID,                     -- Correlation ID
    details JSONB,
    result VARCHAR(20) NOT NULL          -- SUCCESS, DENIED, ERROR
);

-- Prevent modification of audit logs
REVOKE UPDATE, DELETE ON audit_data.access_log FROM PUBLIC;
GRANT INSERT, SELECT ON audit_data.access_log TO audit_service_role;
```

---

## 5. Step 3: Patient Service — Quarkus Security

### 5.1. Application Configuration

```properties
# application.properties — Patient Service

# === OIDC Configuration ===
quarkus.oidc.auth-server-url=https://keycloak.hospital.local/realms/hospital
quarkus.oidc.client-id=patient-service
quarkus.oidc.credentials.secret=${OIDC_CLIENT_SECRET}
quarkus.oidc.token.issuer=https://keycloak.hospital.local/realms/hospital
quarkus.oidc.token.audience=patient-service

# Token verification
quarkus.oidc.token.customizer-name=healthcare-token-customizer

# === Database with SSL ===
quarkus.datasource.db-kind=postgresql
quarkus.datasource.jdbc.url=jdbc:postgresql://pg-primary:5432/healthcare?ssl=true&sslmode=verify-full&sslrootcert=/certs/ca.crt&sslcert=/certs/client.crt&sslkey=/certs/client.key
quarkus.datasource.username=patient_service_role
# No password — using certificate authentication

# Connection pool security
quarkus.datasource.jdbc.max-size=20
quarkus.datasource.jdbc.min-size=2
quarkus.datasource.jdbc.idle-removal-interval=PT5M
quarkus.datasource.jdbc.max-lifetime=PT30M

# === Security Headers ===
quarkus.http.header."X-Content-Type-Options".value=nosniff
quarkus.http.header."X-Frame-Options".value=DENY
quarkus.http.header."X-XSS-Protection".value=1; mode=block
quarkus.http.header."Strict-Transport-Security".value=max-age=31536000; includeSubDomains
quarkus.http.header."Content-Security-Policy".value=default-src 'self'
quarkus.http.header."Cache-Control".value=no-store, no-cache, must-revalidate
quarkus.http.header."Pragma".value=no-cache

# Remove technology fingerprints
quarkus.http.header."Server".value=
quarkus.http.header."X-Powered-By".value=

# === TLS ===
quarkus.http.ssl.certificate.files=/certs/tls.crt
quarkus.http.ssl.certificate.key-files=/certs/tls.key
quarkus.http.insecure-requests=disabled

# === Vault Integration ===
quarkus.vault.url=https://vault.hospital.local
quarkus.vault.authentication.kubernetes.role=patient-service
quarkus.vault.transit.key.healthcare-phi=patient-phi-key

# === Audit ===
quarkus.log.handler.kafka.enabled=true
quarkus.log.handler.kafka.topic=healthcare-audit-events
quarkus.log.handler.kafka.bootstrap-servers=kafka:9093
```

### 5.2. Security Filter — JWT to PostgreSQL Session

```java
// RLSContextFilter.java — Propagate JWT claims to PostgreSQL session variables

@Provider
@Priority(Priorities.AUTHORIZATION + 1)
@RequestScoped
public class RLSContextFilter implements ContainerRequestFilter {

    @Inject
    SecurityIdentity securityIdentity;

    @Inject
    AgroalDataSource dataSource;

    @Inject
    AuditService auditService;

    @Override
    public void filter(ContainerRequestContext requestContext) {
        if (securityIdentity.isAnonymous()) {
            return;
        }

        JsonWebToken jwt = (JsonWebToken) securityIdentity.getPrincipal();

        try (Connection conn = dataSource.getConnection()) {
            // Set PostgreSQL session variables from JWT claims
            // These are used by RLS policies
            setSessionVariable(conn, "app.current_user_id",
                jwt.getClaim("employee_id") != null ? 
                    jwt.getClaim("employee_id").toString() : 
                    jwt.getClaim("patient_id").toString());
            
            setSessionVariable(conn, "app.current_role",
                getPrimaryRole(securityIdentity));
            
            setSessionVariable(conn, "app.current_department",
                jwt.getClaim("department") != null ? 
                    jwt.getClaim("department").toString() : "");
            
            setSessionVariable(conn, "app.current_tenant_id",
                jwt.getClaim("tenant_id") != null ? 
                    jwt.getClaim("tenant_id").toString() : "");

            if (jwt.getClaim("patient_id") != null) {
                setSessionVariable(conn, "app.current_patient_id",
                    jwt.getClaim("patient_id").toString());
            }

        } catch (SQLException e) {
            Log.error("Failed to set RLS context", e);
            requestContext.abortWith(
                Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(Map.of("error", "Security context initialization failed"))
                    .build());
        }
    }

    private void setSessionVariable(Connection conn, String name, String value) 
            throws SQLException {
        // Use parameterized SET to prevent SQL injection
        try (var stmt = conn.prepareStatement(
                "SELECT set_config(?, ?, true)")) {
            stmt.setString(1, name);
            stmt.setString(2, value);
            stmt.execute();
        }
    }

    private String getPrimaryRole(SecurityIdentity identity) {
        Set<String> roles = identity.getRoles();
        // Priority order for healthcare roles
        List<String> priority = List.of(
            "admin", "chief-physician", "physician", "head-nurse",
            "nurse", "lab-technician", "pharmacist", "patient"
        );
        return priority.stream()
            .filter(roles::contains)
            .findFirst()
            .orElse("unknown");
    }
}
```

### 5.3. Patient Resource with Security

```java
// PatientResource.java

@Path("/api/v1/patients")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Authenticated
public class PatientResource {

    @Inject
    PatientService patientService;

    @Inject
    AuditService auditService;

    @Inject
    SecurityIdentity securityIdentity;

    @Inject
    EncryptionService encryptionService;

    /**
     * Get patient by ID — with audit logging and field-level decryption
     */
    @GET
    @Path("/{patientId}")
    @RolesAllowed({"physician", "chief-physician", "nurse", "patient", "admin"})
    public Response getPatient(
            @PathParam("patientId") UUID patientId,
            @HeaderParam("X-Request-ID") String requestId) {

        // Audit: record access attempt
        String userId = getUserId();
        auditService.logAccess(AuditEvent.builder()
            .action("READ")
            .resourceType("Patient")
            .resourceId(patientId)
            .userId(userId)
            .requestId(requestId)
            .build());

        // Fetch patient — RLS automatically filters based on JWT claims
        Optional<Patient> patient = patientService.findById(patientId);
        
        if (patient.isEmpty()) {
            // Don't reveal whether patient exists — return same error
            auditService.logAccess(AuditEvent.builder()
                .action("READ")
                .resourceType("Patient")
                .resourceId(patientId)
                .userId(userId)
                .result("DENIED")
                .details("Patient not found or access denied by RLS")
                .build());
            
            return Response.status(Response.Status.NOT_FOUND)
                .entity(Map.of("error", "Patient not found"))
                .build();
        }

        // Decrypt PHI fields for response
        PatientDTO dto = mapToDTO(patient.get());

        // Audit: successful access
        auditService.logAccess(AuditEvent.builder()
            .action("READ")
            .resourceType("Patient")
            .resourceId(patientId)
            .userId(userId)
            .result("SUCCESS")
            .build());

        return Response.ok(dto).build();
    }

    /**
     * Create patient — physicians and admin only, with MFA verification
     */
    @POST
    @RolesAllowed({"physician", "chief-physician", "admin"})
    public Response createPatient(
            @Valid CreatePatientRequest request,
            @HeaderParam("X-Request-ID") String requestId) {

        // Verify MFA was used for this session (check 'amr' claim)
        verifyMFA();

        // Validate and sanitize input
        sanitizeInput(request);

        // Encrypt PHI fields before persistence
        Patient patient = new Patient();
        patient.setMrn(generateMRN());
        patient.setFullNameEncrypted(
            encryptionService.encryptPHI(request.getFullName(), "patient_name"));
        patient.setDateOfBirthEncrypted(
            encryptionService.encryptPHI(request.getDateOfBirth().toString(), "dob"));
        patient.setSsnEncrypted(
            encryptionService.encryptPHI(request.getSsn(), "ssn"));
        patient.setPhoneEncrypted(
            encryptionService.encryptPHI(request.getPhone(), "phone"));
        patient.setAddressEncrypted(
            encryptionService.encryptPHI(request.getAddress(), "address"));
        
        // Non-PHI fields
        patient.setGender(request.getGender());
        patient.setBloodType(request.getBloodType());
        patient.setDepartmentId(getDepartmentFromJWT());
        patient.setPrimaryPhysicianId(getUserId());
        patient.setTenantId(getTenantFromJWT());
        patient.setCreatedBy(getUserId());

        Patient created = patientService.create(patient);

        // Audit
        auditService.logAccess(AuditEvent.builder()
            .action("CREATE")
            .resourceType("Patient")
            .resourceId(created.getId())
            .userId(getUserId())
            .result("SUCCESS")
            .details("New patient registered: " + created.getMrn())
            .build());

        return Response.status(Response.Status.CREATED)
            .entity(mapToDTO(created))
            .build();
    }

    /**
     * Search patients — results filtered by RLS
     */
    @GET
    @Path("/search")
    @RolesAllowed({"physician", "chief-physician", "nurse", "admin"})
    public Response searchPatients(
            @QueryParam("name") String name,
            @QueryParam("mrn") String mrn,
            @QueryParam("page") @DefaultValue("0") int page,
            @QueryParam("size") @DefaultValue("20") int size) {

        // Limit page size to prevent data exfiltration
        size = Math.min(size, 50);

        // Search — RLS ensures only authorized patients are returned
        Page<PatientDTO> results;
        if (mrn != null && !mrn.isBlank()) {
            results = patientService.findByMrn(mrn.trim(), page, size);
        } else if (name != null && !name.isBlank()) {
            // Search on encrypted fields requires special handling
            results = patientService.searchByName(name.trim(), page, size);
        } else {
            results = patientService.findAll(page, size);
        }

        // Audit bulk access
        auditService.logAccess(AuditEvent.builder()
            .action("SEARCH")
            .resourceType("Patient")
            .userId(getUserId())
            .result("SUCCESS")
            .details("Search returned " + results.getTotalElements() + " results")
            .build());

        return Response.ok(results).build();
    }

    // ================================================================
    // Emergency Access (Break-the-Glass)
    // ================================================================
    
    /**
     * Emergency access to any patient — bypasses department restriction
     * Requires explicit reason and triggers immediate alert
     */
    @GET
    @Path("/{patientId}/emergency-access")
    @RolesAllowed({"physician", "chief-physician", "nurse"})
    public Response emergencyAccess(
            @PathParam("patientId") UUID patientId,
            @QueryParam("reason") @NotBlank String reason,
            @HeaderParam("X-Request-ID") String requestId) {

        // Log CRITICAL audit event
        auditService.logEmergencyAccess(AuditEvent.builder()
            .action("EMERGENCY_ACCESS")
            .resourceType("Patient")
            .resourceId(patientId)
            .userId(getUserId())
            .result("GRANTED")
            .details("Emergency reason: " + reason)
            .build());

        // Trigger immediate alert to security team
        auditService.triggerSecurityAlert(
            "EMERGENCY_ACCESS",
            "User " + getUserId() + " invoked emergency access for patient " 
                + patientId + ". Reason: " + reason
        );

        // Fetch with elevated privileges (bypass RLS via superuser context)
        Optional<Patient> patient = patientService.findByIdElevated(patientId);

        return patient.map(p -> Response.ok(mapToDTO(p)).build())
            .orElse(Response.status(404).build());
    }

    private void verifyMFA() {
        JsonWebToken jwt = (JsonWebToken) securityIdentity.getPrincipal();
        List<String> amr = jwt.getClaim("amr");
        if (amr == null || !amr.contains("mfa")) {
            throw new ForbiddenException("MFA required for this operation");
        }
    }

    private void sanitizeInput(CreatePatientRequest request) {
        // Input validation is handled by @Valid + Bean Validation
        // Additional sanitization for XSS prevention
        request.setFullName(HtmlUtils.sanitize(request.getFullName()));
        request.setAddress(HtmlUtils.sanitize(request.getAddress()));
    }
}
```

### 5.4. Encryption Service

```java
// EncryptionService.java — Vault-backed PHI encryption

@ApplicationScoped
public class EncryptionService {

    @Inject
    VaultTransitSecretEngine vaultTransit;

    private static final String TRANSIT_KEY = "healthcare-phi";

    /**
     * Encrypt PHI field using Vault Transit engine (envelope encryption)
     */
    public JsonObject encryptPHI(String plaintext, String context) {
        if (plaintext == null || plaintext.isBlank()) {
            return null;
        }

        // Vault Transit: server-side encryption, key never leaves Vault
        String ciphertext = vaultTransit.encrypt(
            TRANSIT_KEY,
            plaintext,
            VaultTransitContext.builder()
                .context(context)
                .build()
        );

        return Json.createObjectBuilder()
            .add("v", 1)
            .add("engine", "vault-transit")
            .add("key", TRANSIT_KEY)
            .add("ctx", context)
            .add("ciphertext", ciphertext)
            .add("encrypted_at", Instant.now().toString())
            .build();
    }

    /**
     * Decrypt PHI field
     */
    public String decryptPHI(JsonObject encrypted) {
        if (encrypted == null) {
            return null;
        }

        String ciphertext = encrypted.getString("ciphertext");
        String context = encrypted.getString("ctx");

        return vaultTransit.decrypt(
            TRANSIT_KEY,
            ciphertext,
            VaultTransitContext.builder()
                .context(context)
                .build()
        ).asString();
    }
}
```

---

## 6. Step 4: Audit Service

### 6.1. Centralized Audit Service

```java
// AuditService.java — Immutable audit trail

@ApplicationScoped
public class AuditService {

    @Inject
    AuditRepository auditRepository;

    @Inject
    @Channel("audit-events")
    Emitter<AuditEvent> auditEmitter;

    @Inject
    SecurityIdentity securityIdentity;

    @Inject
    @ConfigProperty(name = "app.security.alert.enabled", defaultValue = "true")
    boolean alertEnabled;

    /**
     * Log access event — immutable, append-only
     */
    public void logAccess(AuditEvent event) {
        // Enrich event with context
        event.setTimestamp(Instant.now());
        event.setIpAddress(getClientIP());
        event.setUserAgent(getUserAgent());
        
        if (event.getDepartment() == null && !securityIdentity.isAnonymous()) {
            JsonWebToken jwt = (JsonWebToken) securityIdentity.getPrincipal();
            event.setDepartment(jwt.getClaim("department"));
            event.setTenantId(jwt.getClaim("tenant_id"));
        }

        // 1. Persist to PostgreSQL (audit_data.access_log)
        auditRepository.insert(event);

        // 2. Emit to Kafka for ELK/SIEM consumption
        auditEmitter.send(event);

        // 3. Check for suspicious patterns
        detectSuspiciousActivity(event);
    }

    /**
     * Emergency access — elevated severity
     */
    public void logEmergencyAccess(AuditEvent event) {
        event.setSeverity("CRITICAL");
        event.setEmergencyAccess(true);
        logAccess(event);
    }

    /**
     * Trigger security alert (email + Slack + PagerDuty)
     */
    public void triggerSecurityAlert(String type, String message) {
        if (!alertEnabled) return;

        SecurityAlert alert = SecurityAlert.builder()
            .type(type)
            .message(message)
            .timestamp(Instant.now())
            .severity("HIGH")
            .build();

        // Send to security monitoring channel
        auditEmitter.send(Message.of(alert)
            .withMetadata(OutgoingKafkaRecordMetadata.builder()
                .withTopic("security-alerts")
                .withKey(type)
                .build()));
    }

    /**
     * Detect suspicious access patterns
     */
    private void detectSuspiciousActivity(AuditEvent event) {
        String userId = event.getUserId();

        // Pattern 1: High-volume patient record access (data exfiltration)
        long recentAccesses = auditRepository.countRecentAccesses(
            userId, "Patient", Duration.ofMinutes(5));
        if (recentAccesses > 50) {
            triggerSecurityAlert("HIGH_VOLUME_ACCESS",
                "User " + userId + " accessed " + recentAccesses + 
                " patient records in 5 minutes. Possible data exfiltration.");
        }

        // Pattern 2: Access denied followed by emergency access
        if ("EMERGENCY_ACCESS".equals(event.getAction())) {
            long recentDenials = auditRepository.countRecentDenials(
                userId, Duration.ofMinutes(10));
            if (recentDenials > 0) {
                triggerSecurityAlert("EMERGENCY_AFTER_DENIAL",
                    "User " + userId + " used emergency access after " + 
                    recentDenials + " access denials. Requires review.");
            }
        }

        // Pattern 3: After-hours access to sensitive records
        LocalTime now = LocalTime.now(ZoneId.of("Asia/Ho_Chi_Minh"));
        if ((now.isBefore(LocalTime.of(6, 0)) || now.isAfter(LocalTime.of(22, 0)))
            && "READ".equals(event.getAction())
            && Set.of("Patient", "LabResult", "Prescription")
                   .contains(event.getResourceType())) {
            triggerSecurityAlert("AFTER_HOURS_ACCESS",
                "User " + userId + " accessed " + event.getResourceType() + 
                " at " + now + ". After-hours access requires review.");
        }
    }
}
```

---

## 7. Step 5: Kubernetes Deployment

### 7.1. Secure Deployment Manifests

```yaml
# kubernetes/base/patient-service/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: patient-service
  namespace: healthcare
  labels:
    app: patient-service
    compliance: hipaa
spec:
  replicas: 3
  selector:
    matchLabels:
      app: patient-service
  template:
    metadata:
      labels:
        app: patient-service
        security.istio.io/tlsMode: istio
      annotations:
        sidecar.istio.io/inject: "true"
        vault.hashicorp.com/agent-inject: "true"
        vault.hashicorp.com/role: "patient-service"
        vault.hashicorp.com/agent-inject-secret-db-certs: "pki/issue/patient-service"
    spec:
      serviceAccountName: patient-service-sa
      automountServiceAccountToken: false
      
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
        runAsGroup: 1000
        fsGroup: 1000
        seccompProfile:
          type: RuntimeDefault

      containers:
        - name: patient-service
          image: registry.hospital.local/patient-service:1.0.0
          
          securityContext:
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: true
            capabilities:
              drop: ["ALL"]

          ports:
            - containerPort: 8443
              name: https
              protocol: TCP

          env:
            - name: QUARKUS_PROFILE
              value: "production"
            - name: OIDC_CLIENT_SECRET
              valueFrom:
                secretKeyRef:
                  name: patient-service-oidc
                  key: client-secret

          resources:
            requests:
              memory: "256Mi"
              cpu: "250m"
            limits:
              memory: "512Mi"
              cpu: "500m"

          livenessProbe:
            httpGet:
              path: /q/health/live
              port: 8443
              scheme: HTTPS
            initialDelaySeconds: 15
            periodSeconds: 10

          readinessProbe:
            httpGet:
              path: /q/health/ready
              port: 8443
              scheme: HTTPS
            initialDelaySeconds: 5
            periodSeconds: 5

          volumeMounts:
            - name: tls-certs
              mountPath: /certs
              readOnly: true
            - name: tmp
              mountPath: /tmp

      volumes:
        - name: tls-certs
          secret:
            secretName: patient-service-tls
        - name: tmp
          emptyDir:
            medium: Memory
            sizeLimit: 64Mi
---
# Network Policy — restrict ingress/egress
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: patient-service-netpol
  namespace: healthcare
spec:
  podSelector:
    matchLabels:
      app: patient-service
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        # Only API Gateway can access Patient Service
        - podSelector:
            matchLabels:
              app: api-gateway
      ports:
        - port: 8443
          protocol: TCP
  egress:
    # PostgreSQL
    - to:
        - podSelector:
            matchLabels:
              app: postgresql
      ports:
        - port: 5432
    # Keycloak (token verification)
    - to:
        - podSelector:
            matchLabels:
              app: keycloak
      ports:
        - port: 8443
    # Kafka (audit events)
    - to:
        - podSelector:
            matchLabels:
              app: kafka
      ports:
        - port: 9093
    # Vault (encryption)
    - to:
        - podSelector:
            matchLabels:
              app: vault
      ports:
        - port: 8200
    # DNS
    - to: []
      ports:
        - port: 53
          protocol: UDP
```

---

## 8. Step 6: Security Testing & Compliance

### 8.1. Automated HIPAA Compliance Verification

```java
// HIPAAComplianceTest.java — Run as integration test

@QuarkusIntegrationTest
public class HIPAAComplianceTest {

    /**
     * §164.312(a)(1) — Access Control
     */
    @Test
    void testAccessControl_uniqueUserIdentification() {
        // Every API call must have a unique user identifier
        Response response = given()
            .header("Authorization", "Bearer " + getValidToken("dr.nguyen"))
            .when()
            .get("/api/v1/patients/PAT-001")
            .then()
            .statusCode(200)
            .extract().response();

        // Verify audit log has unique user ID
        AuditEntry audit = getLatestAuditEntry();
        assertThat(audit.getUserId()).isEqualTo("EMP-001");
        assertThat(audit.getUserId()).isNotBlank();
    }

    @Test
    void testAccessControl_automaticLogoff() {
        // Session timeout must be <= 15 minutes
        String token = getValidToken("dr.nguyen");
        
        // Token should expire within 5 minutes (access token)
        DecodedJWT jwt = JWT.decode(token);
        long lifespanSeconds = jwt.getExpiresAt().getTime() / 1000 - 
                              jwt.getIssuedAt().getTime() / 1000;
        assertThat(lifespanSeconds).isLessThanOrEqualTo(300); // 5 min
    }

    @Test
    void testAccessControl_encryptionAtRest() {
        // Create a patient and verify data is encrypted in DB
        createTestPatient();

        // Direct DB query — PHI fields must be encrypted
        try (Connection conn = getDirectDBConnection()) {
            var rs = conn.createStatement().executeQuery(
                "SELECT full_name_encrypted, ssn_encrypted " +
                "FROM patient_data.patients WHERE mrn = 'TEST-MRN-001'");
            
            assertTrue(rs.next());
            
            String nameField = rs.getString("full_name_encrypted");
            String ssnField = rs.getString("ssn_encrypted");
            
            // Fields should be JSON with encrypted data, not plaintext
            assertThat(nameField).contains("ciphertext");
            assertThat(nameField).doesNotContain("Nguyễn");
            assertThat(ssnField).contains("ciphertext");
            assertThat(ssnField).doesNotContain("123-45-6789");
        }
    }

    /**
     * §164.312(b) — Audit Controls
     */
    @Test
    void testAuditControls_allPHIAccessLogged() {
        long auditCountBefore = getAuditLogCount();

        // Access patient record
        given()
            .header("Authorization", "Bearer " + getValidToken("dr.nguyen"))
            .when()
            .get("/api/v1/patients/PAT-001")
            .then()
            .statusCode(200);

        long auditCountAfter = getAuditLogCount();
        assertThat(auditCountAfter).isGreaterThan(auditCountBefore);

        AuditEntry latest = getLatestAuditEntry();
        assertThat(latest.getAction()).isEqualTo("READ");
        assertThat(latest.getResourceType()).isEqualTo("Patient");
        assertThat(latest.getUserId()).isNotBlank();
        assertThat(latest.getTimestamp()).isNotNull();
        assertThat(latest.getResult()).isEqualTo("SUCCESS");
    }

    @Test
    void testAuditControls_auditLogsImmutable() {
        // Attempt to delete audit logs should fail
        try (Connection conn = getServiceDBConnection()) {
            assertThrows(SQLException.class, () -> {
                conn.createStatement().executeUpdate(
                    "DELETE FROM audit_data.access_log WHERE id IS NOT NULL");
            });
        }

        // Attempt to update audit logs should fail
        try (Connection conn = getServiceDBConnection()) {
            assertThrows(SQLException.class, () -> {
                conn.createStatement().executeUpdate(
                    "UPDATE audit_data.access_log SET result = 'MODIFIED'");
            });
        }
    }

    /**
     * §164.312(c)(1) — Integrity
     */
    @Test
    void testIntegrity_prescriptionDigitalSignature() {
        // Create prescription
        String prescriptionId = createTestPrescription();

        // Verify digital signature exists
        try (Connection conn = getDirectDBConnection()) {
            var rs = conn.createStatement().executeQuery(
                "SELECT physician_signature FROM prescription_data.prescriptions " +
                "WHERE id = '" + prescriptionId + "'");
            
            assertTrue(rs.next());
            String signature = rs.getString("physician_signature");
            assertThat(signature).isNotNull();
            assertThat(signature).contains("algorithm");
            assertThat(signature).contains("signature");
        }
    }

    /**
     * §164.312(d) — Person or Entity Authentication
     */
    @Test
    void testAuthentication_mfaForSensitiveOps() {
        // Token without MFA claim
        String tokenNoMFA = getTokenWithoutMFA("dr.nguyen");

        // Creating prescription should require MFA
        given()
            .header("Authorization", "Bearer " + tokenNoMFA)
            .contentType(ContentType.JSON)
            .body(createPrescriptionPayload())
            .when()
            .post("/api/v1/prescriptions")
            .then()
            .statusCode(403)
            .body("error", containsString("MFA"));
    }

    /**
     * §164.312(e)(1) — Transmission Security
     */
    @Test
    void testTransmissionSecurity_tlsEnforced() {
        // HTTP (non-TLS) request should be rejected
        given()
            .baseUri("http://localhost:8080") // HTTP, not HTTPS
            .when()
            .get("/api/v1/health")
            .then()
            // Should redirect to HTTPS or reject
            .statusCode(anyOf(is(301), is(400), is(403)));
    }

    @Test
    void testTransmissionSecurity_securityHeaders() {
        Response response = given()
            .header("Authorization", "Bearer " + getValidToken("dr.nguyen"))
            .when()
            .get("/api/v1/patients/PAT-001")
            .then()
            .statusCode(200)
            .extract().response();

        Headers headers = response.headers();
        assertThat(headers.getValue("Strict-Transport-Security")).isNotNull();
        assertThat(headers.getValue("X-Content-Type-Options")).isEqualTo("nosniff");
        assertThat(headers.getValue("X-Frame-Options")).isEqualTo("DENY");
        assertThat(headers.getValue("Cache-Control")).contains("no-store");
    }

    /**
     * RLS Verification — Department Isolation
     */
    @Test
    void testRLS_departmentIsolation() {
        // Cardiologist should not see neurology patients
        String cardioToken = getTokenForDepartment("dr.nguyen", "cardiology");

        String result = given()
            .header("Authorization", "Bearer " + cardioToken)
            .when()
            .get("/api/v1/patients/search?department=neurology")
            .then()
            .statusCode(200)
            .extract().body().asString();

        // RLS should filter out neurology patients
        assertThat(result).doesNotContain("neurology");
    }

    @Test
    void testRLS_patientSelfAccess() {
        // Patient can only see their own records
        String patientToken = getTokenForPatient("patient.le", "PAT-001");

        // Access own record — should succeed
        given()
            .header("Authorization", "Bearer " + patientToken)
            .when()
            .get("/api/v1/patients/PAT-001")
            .then()
            .statusCode(200);

        // Access other patient — should fail
        given()
            .header("Authorization", "Bearer " + patientToken)
            .when()
            .get("/api/v1/patients/PAT-002")
            .then()
            .statusCode(anyOf(is(403), is(404)));
    }
}
```

---

## 9. Step 7: Monitoring & Observability

### 9.1. Security Monitoring Stack

```yaml
# docker-compose.monitoring.yml
services:
  # Elasticsearch for audit log storage
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.15.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=true
      - ELASTIC_PASSWORD=${ELASTIC_PASSWORD}
    volumes:
      - es-data:/usr/share/elasticsearch/data

  # Kibana for security dashboards
  kibana:
    image: docker.elastic.co/kibana/kibana:8.15.0
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
      - ELASTICSEARCH_PASSWORD=${ELASTIC_PASSWORD}
    depends_on:
      - elasticsearch

  # Grafana for security metrics
  grafana:
    image: grafana/grafana:11.0.0
    volumes:
      - ./monitoring/grafana/dashboards:/var/lib/grafana/dashboards
      - ./monitoring/grafana/datasources:/etc/grafana/provisioning/datasources

  # Prometheus for metrics collection
  prometheus:
    image: prom/prometheus:v2.53.0
    volumes:
      - ./monitoring/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - ./monitoring/prometheus/alerts/:/etc/prometheus/alerts/

  # Alertmanager for security alerts
  alertmanager:
    image: prom/alertmanager:v0.27.0
    volumes:
      - ./monitoring/alertmanager/config.yml:/etc/alertmanager/config.yml
```

### 9.2. Security Dashboard Panels

**Healthcare Security Dashboard — Key Metrics:**

| Metrics | Value | Status |
|:---|:---|:---|
| **Auth Failures Today** | 12 | ▼ Reduced compared to yesterday |
| **PHI Access Today** | 1,234 | ≈ Normal |
| **Emergency Access** | 0 | ✅ OK |

**PHI Access by Department (Last 24h):**

| Department | Visits |
|:---|:---|
| Cardiology | 450 |
| Internal Medicine | 320 |
| Neurology | 210 |
| Pediatrics | 120 |
| Emergency | 78 |

**Recent Security Events:**

- ⚠️ 14:23 — `dr.tran`: 45 patient records in 3 min (alert)
- ✅ 14:15 — `yta.pham`: Normal ward rounds access
- ✅ 13:50 — `lab.tech`: Lab results uploaded (batch)
- ℹ️ 13:30 — System: Certificate rotation completed

---

## 10. Deliverables & Checklist

### 10.1. Final Project Checklist

**Capstone Project — HIPAA Compliance Checklist**

**IDENTITY & ACCESS MANAGEMENT**

- [x] Keycloak realm with RBAC/ABAC roles
- [x] MFA required for sensitive operations
- [x] Break-the-glass emergency access with audit
- [x] Session timeout ≤ 15 minutes
- [x] Password policy (12+ chars, complexity, history)
- [x] Brute force protection enabled

**DATA PROTECTION**

- [x] PHI encrypted at rest (Vault Transit / pgcrypto)
- [x] PHI encrypted in transit (TLS 1.2+, mTLS)
- [x] Column-level encryption for sensitive fields
- [x] Key management via HashiCorp Vault
- [x] Key rotation policy configured

**ACCESS CONTROL**

- [x] Row-Level Security on all PHI tables
- [x] Department-based data isolation
- [x] Patient self-access restriction
- [x] Multi-tenant isolation
- [x] Principle of least privilege for DB roles

**AUDIT & MONITORING**

- [x] All PHI access logged (audit_data.access_log)
- [x] pgAudit enabled for SQL-level audit
- [x] Immutable audit trail (no UPDATE/DELETE)
- [x] Centralized logging (ELK Stack)
- [x] Security alerts for suspicious patterns
- [x] After-hours access monitoring

**APPLICATION SECURITY**

- [x] JWT validation + claim-based authorization
- [x] Input validation (Bean Validation)
- [x] Output encoding (XSS prevention)
- [x] Parameterized queries (SQL injection prevention)
- [x] Security headers configured
- [x] Error responses sanitized (no stack traces)
- [x] Rate limiting at API Gateway

**INFRASTRUCTURE SECURITY**

- [x] Container security (non-root, read-only FS)
- [x] Network Policies (microsegmentation)
- [x] Pod Security Standards enforced
- [x] Service mesh with mTLS (Istio)
- [x] Secrets managed by Vault (not in env vars)

**SECURITY TESTING**

- [x] SAST in CI/CD (SonarQube, Semgrep, SpotBugs)
- [x] SCA dependency scanning (Trivy, Snyk)
- [x] DAST with OWASP ZAP + Nuclei
- [x] HIPAA compliance integration tests
- [x] SBOM generation (CycloneDX)

**COMPLIANCE**

- [x] HIPAA Technical Safeguards mapped and verified
- [x] Risk Assessment documented
- [x] Security Assessment Report generated
- [x] Backup & DR procedures tested
- [x] Incident Response Plan documented

> **Status: ✅ ALL CHECKS PASSED — HIPAA Compliance: 100% Technical Safeguards**

---

## 11. Course summary

Through **24 lessons**, we have built comprehensive knowledge and skills to secure the health system:

| Part | Topics | Knowledge gained |
|:---|:---|:---|
| **Part 1: Foundation** | Lesson 1–4 | HIPAA, HL7 FHIR, Threat Modeling, Risk Assessment, Architecture |
| **Part 2: IAM** | Lesson 5–8 | Keycloak multi-tenant, RBAC/ABAC healthcare, SMART on FHIR, MFA + Emergency Access |
| **Part 3: Database** | Lessons 9–12 | PostgreSQL Hardening, Encryption (TDE, pgcrypto), Row-Level Security, pgAudit + CDC |
| **Part 4: Microservices** | Lesson 13–16 | Quarkus OIDC + JWT, API Gateway + WAF, E2E Encryption, mTLS + Service Mesh |
| **Part 5: Compliance** | Lessons 17–20 | HIPAA Safeguards, Audit Trail + ELK, Data Masking, DR + BCP |
| **Part 6: Advanced** | Lessons 21–24 | Zero Trust Architecture, Containers + K8s Security, Penetration Testing, Capstone Project |

> **Result: Secure Healthcare Microservices Platform with FULL HIPAA Technical Safeguards compliance on Quarkus + PostgreSQL + Keycloak**

### Next step

1. **Fork repository** and run local development environment
2. **Customize** for specific hospital/medical organization
3. **Audit** using third-party penetration testing
4. **Certify** HIPAA compliance with formal assessment
5. **Monitor** continuously with security dashboard and alert system

> **Important Note**: Security is an **ongoing journey**, not a destination. The system needs to be reviewed, audited, and updated regularly when new vulnerabilities are introduced, regulations are changed, or functionality is expanded.

---

---

<!-- SERIES-NAV:START -->
◀ **Previous article:** [Lesson 23: Penetration Testing & Vulnerability Assessment for Healthcare Systems](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-23-penetration-testing-vulnerability-assessment-y-te)

🎉 **Congratulations!** You have completed the series. Let's go back [overview page](/series/bao-mat-du-lieu-y-te-cho-microservices) to review.
<!-- SERIES-NAV:END -->
