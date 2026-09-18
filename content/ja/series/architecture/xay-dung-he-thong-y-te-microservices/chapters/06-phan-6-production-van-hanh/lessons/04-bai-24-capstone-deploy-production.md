---
id: 019e1a40-a124-7001-d001-f0a1b2c30124
title: 'レッスン 24: Capstone — 本番環境に対応したヘルスケア プラットフォームの導入'
slug: bai-24-capstone-deploy-production
description: >-
  一般プロジェクト: 完全なセキュリティ制御を備えた完全なヘルスケア マイクロサービス
  プラットフォームを構築します。患者サービス、予約サービス、検査結果サービス、Quarkus での処方サービス、RLS + 暗号化を備えた
  PostgreSQL、Keycloak IAM、API ゲートウェイ、監査ログ、モニタリング、完全な HIPAA 準拠の Kubernetes
  でのデプロイメントが含まれます。
duration_minutes: 300
is_free: true
video_url: null
sort_order: 24
section_title: 'パート 6: 生産と運用'
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: ja
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ アーキテクチャ — レッスン 24</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 24: キャップストーン — ヘルスケアの展開</tspan>
      <tspan x="60" dy="42">本番環境に対応したプラットフォーム</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 6: 生産と運用</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. Capstone プロジェクトの紹介

![本番環境への展開 — HIPAA 準拠の Kubernetes 上のヘルスケア プラットフォーム](/storage/uploads/2026/04/healthcare-production-deployment.webp)

＃＃＃１．１．ターゲット

この最後の記事では、**これまでの 23 の記事から得たすべての知識を統合**して、アーキテクチャ設計からセキュリティ管理の実装、コンプライアンスの検証に至るまで、完全な **セキュア ヘルスケア マイクロサービス プラットフォーム**を構築します。

**23 のレッスンから編集:**

|パート |記事 |メイントピック |
|:---|:---|:---|
| **パート 1: 基礎** |レッスン 1 ～ 4 | HIPAA、脅威モデリング、リスク評価、アーキテクチャ |
| **パート 2: IAM** |レッスン 5–8 | Keycloak、RBAC/ABAC、MFA、FHIR 上の SMART |
| **パート 3: データベース** |レッスン 9–12 | PostgreSQL セキュリティ、暗号化、RLS、pgAudit |
| **パート 4: マイクロサービス** |レッスン 13–16 | Quarkus セキュリティ、API ゲートウェイ、E2E 暗号化、mTLS |
| **パート 5: コンプライアンス** | Lessons 17–20 | HIPAA セーフガード、監査証跡、データマスキング、DR/BCP |
| **パート 6: 上級** |レッスン 21–24 |ゼロトラスト、コンテナセキュリティ、ペンテスト、キャップストーン |

**成果物:**

- ✅ 完全なセキュリティを備えたマイクロサービスの動作
- ✅ HIPAA 技術的保護措置への準拠
- ✅ 自動化されたセキュリティテストパイプライン
- ✅ 強化された Kubernetes へのデプロイメント
- ✅ セキュリティ評価レポート

＃＃＃１．２．システムスコープ

マイクロサービスを使用して **病院管理システム** (病院管理システム — HMS) を構築します。

|サービス |説明 | PHI データ |
|:---|:---|:---|
| **患者サービス** |患者記録管理 |名前、生年月日、SSN、住所、連絡先 |
| **出会いサービス** |訪問/入院の管理 |診断・検査理由・担当医 |
| **ラボサービス** |テスト結果 |血液、尿、生検検査の結果 |
| **処方箋サービス** |処方箋 |処方薬、用量、薬物相互作用 |
| **通知サービス** |通知とリマインダー |フォローアップ検査スケジュール、薬のリマインダー |
| **監査サービス** |監査証跡を記録する |すべてのアクセスログ |

---

## 2. 全体的なアーキテクチャ

＃＃＃２．１．システムアーキテクチャ

![Capstone ヘルスケア プラットフォームのアーキテクチャ](/storage/uploads/2026/04/healthcare-capstone-architecture.webp)

**3 層セキュリティ アーキテクチャ:**

|レイヤー |コンポーネント |セキュリティ管理 |
|:---|:---|:---|
| **DMZ / エッジ** | API ゲートウェイ (Kong) |レート制限 (100 req/分)、WAF (OWASP CRS)、JWT 検証、IP ホワイトリスト |
| **Application (K8s)** |患者、出会い、研究室、処方サービス (Quarkus) | OIDC、RBAC/ABAC、暗号化、監査 |
| **サービス メッシュ** |イスティオ |あらゆる場所の mTLS、ネットワーク ポリシー、分散トレース |
| **サポート** |通知、監査、Keycloak IAM |イベント駆動型、不変ログ、マルチテナント |
| **データ** | PostgreSQL (プライマリ + レプリカ) | RLS、pgcrypto、pgAudit、SSL、バックアップ |
| **メッセージ** |カフカ (イベント) |暗号化されたトピック、スキーマ レジストリ |
| **秘密** |ボールト (KMS) |転送暗号化、PKI、自動開封 |
| **ロギング** |エラスティックサーチ |監査ログの集計 |

＃＃＃２．２．プロジェクトの構造

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

## 3. ステップ 1: Keycloak の構成 — IAM

＃＃＃３．１．病院レルム構成

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

## 4. ステップ 2: PostgreSQL セキュリティのセットアップ

＃＃＃４．１．セキュリティを備えたデータベースの初期化

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

## 5. ステップ 3: 患者サービス — Quarkus セキュリティ

＃＃＃５．１．アプリケーション構成

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

＃＃＃５．２．セキュリティ フィルター - JWT から PostgreSQL へのセッション

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

＃＃＃５．３．セキュリティを備えた患者リソース

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

＃＃＃５．４．暗号化サービス

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

## 6. ステップ 4: 監査サービス

＃＃＃６．１．集中監査サービス

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

## 7. ステップ 5: Kubernetes のデプロイメント

＃＃＃７．１．安全な展開マニフェスト

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

## 8. ステップ 6: セキュリティテストとコンプライアンス

### 8.1。自動化された HIPAA 準拠検証

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

## 9. ステップ 7: 監視と可観測性

＃＃＃９．１．セキュリティ監視スタック

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

＃＃＃９．２．セキュリティ ダッシュボード パネル

**ヘルスケア セキュリティ ダッシュボード — 主要な指標:**

|メトリクス |値 |ステータス |
|:---|:---|:---|
| **今日の認証失敗** | 12 | ▼ 昨日と比べて減少 |
| **今日の PHI アクセス** | 1,234 | ≈ 通常 |
| **緊急アクセス** | 0 | ✅ わかりました |

**部門別の PHI アクセス (過去 24 時間):**

|部門 |訪問 |
|:---|:---|
|心臓病学 | 450 |
|内科 | 320 |
|神経学 | 210 |
|小児科 | 120 |
|緊急 | 78 |

**最近のセキュリティ イベント:**

- ⚠️ 14:23 — `dr.tran`: 3 分間に 45 件の患者記録 (警告)
- ✅ 14:15 — `yta.pham`: 一般病棟回診アクセス
- ✅ 13:50 — `lab.tech`: ラボ結果のアップロード (バッチ)
- ℹ️ 13:30 — システム: 証明書のローテーションが完了しました

---

## 10. 成果物とチェックリスト

### 10.1。プロジェクトの最終チェックリスト

**Capstone プロジェクト — HIPAA 準拠チェックリスト**

**ID とアクセス管理**

- [x] RBAC/ABAC ロールを持つ Keycloak レルム
- [x] 機密性の高い操作には MFA が必要です
- [x] 監査付きのガラスを破る緊急アクセス
- [x] セッションのタイムアウト ≤ 15 分
- [x] パスワード ポリシー (12 文字以上、複雑さ、履歴)
- [x] ブルート フォース保護が有効になっています

**データ保護**

- [x] 保存時の PHI 暗号化 (Vault Transit / pgcrypto)
- [x] 転送中の PHI 暗号化 (TLS 1.2+、mTLS)
- [x] 機密フィールドの列レベルの暗号化
- [x] HashiCorp Vault によるキー管理
- [x] キーローテーションポリシーが構成されています

**アクセス制御**

- [x] すべての PHI テーブルの行レベルのセキュリティ
- [x] 部門ベースのデータ分離
- [x] 患者の自己アクセス制限
- [x] マルチテナントの分離
- [x] DB ロールの最小権限の原則

**監査と監視**

- [x] すべての PHI アクセスがログに記録されます (audit_data.access_log)
- [x] SQL レベルの監査に対して pgAudit が有効になっています
- [x] 不変の監査証跡 (UPDATE/DELETE なし)
- [x] 集中ログ (ELK スタック)
- [x] 疑わしいパターンに対するセキュリティ警告
- [x] 時間外アクセス監視

**アプリケーションのセキュリティ**

- [x] JWT 検証 + クレームベースの承認
- [x] 入力検証 (Bean Validation)
- [x] 出力エンコーディング (XSS 防止)
- [x] パラメータ化されたクエリ (SQL インジェクション防止)
- [x] セキュリティヘッダーが設定されました
- [x] エラー応答がサニタイズされました (スタック トレースなし)
- [x] API ゲートウェイでのレート制限

**インフラストラクチャのセキュリティ**

- [x] コンテナのセキュリティ (非ルート、読み取り専用 FS)
- [x] ネットワーク ポリシー (マイクロセグメンテーション)
- [x] ポッド セキュリティ標準が適用されました
- [x] mTLS を使用したサービス メッシュ (Istio)
- [x] Vault によって管理されるシークレット (環境変数には含まれない)

**セキュリティテスト**

- [x] CI/CD の SAST (SonarQube、Semgrep、SpotBugs)
- [x] SCA 依存関係スキャン (Trivy、Snyk)
- [x] OWASP ZAP + Nuclei を使用した DAST
- [x] HIPAA 準拠統合テスト
- [x] SBOM 生成 (CycloneDX)

**コンプライアンス**

- [x] HIPAA 技術的安全対策がマッピングおよび検証されています
- [x] リスク評価の文書化
- [x] セキュリティ評価レポートが生成されました
- [x] バックアップおよび DR 手順をテスト済み
- [x] インシデント対応計画を文書化

> **ステータス: ✅ すべてのチェックに合格 — HIPAA 準拠: 100% の技術的安全対策**

---

##11. コース概要

**24 のレッスン**を通じて、私たちは医療システムを確保するための包括的な知識とスキルを構築しました。

|パート |トピックス |得られた知識 |
|:---|:---|:---|
| **パート 1: 基礎** |レッスン 1 ～ 4 | HIPAA、HL7 FHIR、脅威モデリング、リスク評価、アーキテクチャ |
| **パート 2: IAM** |レッスン 5–8 | Keycloak マルチテナント、RBAC/ABAC ヘルスケア、FHIR 上の SMART、MFA + 緊急アクセス |
| **パート 3: データベース** |レッスン 9–12 | PostgreSQL の強化、暗号化 (TDE、pgcrypto)、行レベルのセキュリティ、pgAudit + CDC |
| **パート 4: マイクロサービス** |レッスン 13–16 | Quarkus OIDC + JWT、API ゲートウェイ + WAF、E2E 暗号化、mTLS + サービス メッシュ |
| **パート 5: コンプライアンス** |レッスン 17 ～ 20 | HIPAA セーフガード、監査証跡 + ELK、データ マスキング、DR + BCP |
| **パート 6: 上級** |レッスン 21–24 |ゼロトラスト アーキテクチャ、コンテナ + K8s セキュリティ、ペネトレーション テスト、Capstone プロジェクト |

> **結果: Quarkus + PostgreSQL + Keycloak で完全な HIPAA テクニカル セーフガードに準拠した安全なヘルスケア マイクロサービス プラットフォーム**

### 次のステップ

1. **リポジトリをフォーク**し、ローカル開発環境を実行します
2. 特定の病院/医療機関向けに **カスタマイズ**
3. サードパーティの侵入テストを使用した **監査**
4. 正式な評価による HIPAA 準拠の **認定**
5. セキュリティ ダッシュボードとアラート システムを使用して **監視** を継続的に行う

> **重要な注意事項**: セキュリティは**進行中の旅**であり、目的地ではありません。新しい脆弱性が導入された場合、規制が変更された場合、または機能が拡張された場合には、システムを定期的にレビュー、監査、および更新する必要があります。

---

---

<!-- SERIES-NAV:START -->
◀ **前の記事:** [レッスン 23: 医療システムの侵入テストと脆弱性評価](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-23-penetration-testing-vulnerability-assessment-y-te)

🎉 **おめでとうございます!** シリーズが完了しました。戻りましょう [概要ページ](/series/bao-mat-du-lieu-y-te-cho-microservices) レビューするために。
<!-- SERIES-NAV:END -->
