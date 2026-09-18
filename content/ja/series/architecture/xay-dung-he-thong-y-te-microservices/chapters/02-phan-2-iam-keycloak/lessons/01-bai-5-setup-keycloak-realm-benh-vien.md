---
id: 019e1a40-a105-7001-d001-f0a1b2c30105
title: 'レッスン 5: 病院用の Keycloak レルムのセットアップ — マルチテナント'
slug: bai-5-setup-keycloak-realm-benh-vien
description: >-
  複数の病院の医療システム向けのKeycloakレルム設計:
  病院対組織ごとのレルム構造、HIS/EMR/LISのクライアント構成、医療スタッフ用のユーザー・プロファイル・スキーマ、患者ポータル・クライアント、セッション管理、セキュリティ防御、レルムのインポート/エクスポートの自動化。
duration_minutes: 150
is_free: true
video_url: null
sort_order: 5
section_title: 'パート 2: Keycloak を使用した ID とアクセス管理'
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: ja
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ アーキテクチャ — レッスン 5</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 5: 病院用の Keycloak レルムのセットアップ</tspan>
      <tspan x="60" dy="42">— マルチテナンシー</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 2: Keycloak を使用した ID とアクセス管理</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. 医療システムのマルチテナント戦略

![複数分院病院システム用のKeycloak Realmアーキテクチャ](/storage/uploads/2026/04/healthcare-keycloak-realm-architecture.webp)

＃＃＃１．１． Keycloakを使用したマルチテナントモデル

多くの病院/診療所の医療システムを構築する場合、次の 3 つの戦略があります。

![3 複数病院システムのための Keycloak マルチテナント戦略](/storage/uploads/2026/04/healthcare-keycloak-multitenancy.webp)

|戦略 |モデル |隔離 |適切 |
|----------|----------|----------|----------|
| **A: 病院ごとのレルム** |各病院には独自のレルムがあります。最上位 - 孤立したユーザー、ロール、クライアント |独立系病院 |
| **B: 共有レルム + 組織** | 1 つの医療領域、各病院は 1 つの組織 |中 - 共有 ID + 組織の分離 |病院チェーン、保健省 |
| **C: 共有レルム + グループ** | 1 つのレルム、グループごとに分割 |低 — シンプル、分離度が低い |小さなクリニック |

＃＃＃１．２．ベトナムの健康に関する推奨事項

|シナリオ |推奨戦略 |理由 |
|----------|---------------------|----------|
|私立病院チェーン |戦略 B (組織) |患者 ID の共有、組織レベルの分離 |
|独立した公立病院 |戦略 A (病院ごとのレルム) |最大限の分離、独立した管理 |
|小規模総合病院 |戦略 C (グループ) |シンプルで管理が簡単 |
|保健省は多くの施設を管理しています。戦略 B (組織) |一元管理、組織の委任 |

## 2. ヘルスケア領域の設計

＃＃＃２．１．レルム構成

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

＃＃＃２．２．セキュリティ防御の構成

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

## 3. ヘルスケア用のクライアント構成

＃＃＃３．１．クライアントの概要

|クライアント |タイプ |説明 |
|----------|----------|---------------|
|彼のウェブアプリ |パブリック | HIS Web フロントエンド |
| emr-web-app |パブリック | EMR Web フロントエンド |
|患者ポータル |パブリック |患者ポータル |
|モバイルドクターアプリ |パブリック |ドクターモバイルアプリ |
|患者サービス |機密 |患者API |
|臨床サービス |機密 |臨床API |
|ラボサービス |機密 |ラボ結果 API |
|薬局サービス |機密 |薬局 API |
|スケジューリングサービス |機密 |スケジューリング API |
|請求サービス |機密 |課金 API |
|通知サービス |機密 |お知らせ |
|監査サービス |機密 |監査/ロギング |
| APIゲートウェイ |機密 |コング/APISIX |
|管理者-cli |機密 |管理操作 |
| fhirサーバー |機密 | HAPI FHIR サーバー |

＃＃＃３．２．患者ポータル クライアント (パブリック)

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

＃＃＃３．３．マイクロサービス クライアント (機密)

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

## 4. 医療用のユーザー プロファイル スキーマ

＃＃＃４．１．医療ユーザーの属性

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

＃＃＃４．２．医療保険請求用のカスタム トークン マッパー

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

JWT トークンには、医療固有のクレームが含まれます。

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

## 5. 医療の役割階層

＃＃＃５．１．レルムの役割

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

＃＃＃５．２．複合役割

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

## 6. 病院向けのセッション管理

＃＃＃６．１．セッションポリシー

|ユーザータイプ |セッションアイドル |セッション最大値 |理由 |
|----------|---------------|---------------|----------|
|医師 | 15分 | 8時間 |共有ワークステーション、頻繁な自動ログオフ |
|看護師 | 10分 | 8時間 |モバイル カート、素早いアクセスが必要 |
|患者ポータル | 15分 | 2時間 |公衆インターネットアクセス |
|管理者 | 30分 | 8時間 |管理タスク、PHI への曝露が減少 |
|サービスアカウント |該当なし |該当なし |トークンベース、対話型セッションなし |

＃＃＃６．２．共有ワークステーションのサポート

病院には共有ワークステーションがあることが多く、多くの医師や看護師が 1 台のコンピュータを共有しています。解決策:

![病院の共有ワークステーションでの 3 つの認証オプション](/storage/uploads/2026/04/healthcare-shared-workstation-auth.webp)

|オプション |メカニズム |利点 |制限事項 |
|----------|----------|----------|----------|
| **1.ユーザーの高速切り替え** | Keycloak ショートセッション + バッジログイン |早くて便利 |インフラストラクチャが必要 (バッジ リーダー) |
| **2.自動ログオフ + クイック再認証** |セッションタイムアウト 10 ～ 15 分 + PIN |シンプルでハードウェアは不要 |バッジよりも遅い |
| **3.仮想デスクトップ (VDI)** |各ユーザーは独自の仮想デスクトップを持っています。完全な隔離 |高価で待ち時間が長い |

## 7. レルムのエクスポート/インポートの自動化

＃＃＃７．１． Keycloakのコードとしてのインフラストラクチャ

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

＃＃＃７．２． Keycloak 用の Terraform (オプション)

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

## 8. まとめ

このレッスンでは次のことを行います。

- マルチ病院システム向けの **3 つのマルチテナンシー戦略**を比較します
- セキュリティ強化を備えた **ヘルスケア レルム** 設計
- 患者ポータル、マイクロサービス、管理者の **クライアント** を構成する
- 医療固有の属性を使用して **ユーザー プロファイル スキーマ**を構築する
- 病院組織に合わせて **役割階層** を設計する
- 共有ワークステーションの **セッション管理** を構成する
- Infrastructure as Code を使用して **レルムのエクスポート/インポート** を自動化する

## 演習

1. レッスンのすべてのセキュリティ構成を使用して「ヘルスケア」Keycloak レルムを作成します
2. 5 つのクライアントを登録します: 患者ポータル、患者サービス、検査サービス、薬局サービス、API ゲートウェイ
3. 役割階層を作成し、それをテスト ユーザーに割り当てます: 医師 1 人、看護師 1 人、患者 1 人
4. レルム設定をエクスポートし、Git リポジトリにコミットします。

---

---

<!-- SERIES-NAV:START -->
| ◀ 前の記事 |次の記事 ▶ |
|:---|---:|
| [レッスン 4: 医療情報システムの STRIDE/DREAD の脅威モデリング](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-4-threat-modeling-stride-dread-cho-his) | [レッスン 6: RBAC と ABAC - 医師、看護師、患者の分散化](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-6-rbac-abac-phan-quyen-nhan-vien-y-te) |
<!-- SERIES-NAV:END -->
