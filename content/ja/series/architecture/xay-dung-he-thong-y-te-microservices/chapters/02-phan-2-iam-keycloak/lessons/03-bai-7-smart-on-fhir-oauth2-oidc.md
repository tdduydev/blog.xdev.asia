---
id: 019e1a40-a107-7001-d001-f0a1b2c30107
title: 'レッスン 7: FHIR の SMART — ヘルスケア API 用の OAuth2/OIDC'
slug: bai-7-smart-on-fhir-oauth2-oidc
description: >-
  Keycloakを使用してFHIR（代替医療アプリケーション、再利用可能なテクノロジー）にSMARTをデプロイします。SMARTアプリ起動フレームワーク、FHIRリソースのスコープ（patient/*.read、user/*.write）、起動コンテキスト、EHR起動とスタンドアロン起動、バックエンドサービス認可、Quarkus上のHAPI
  FHIRサーバーとの統合。
duration_minutes: 180
is_free: true
video_url: null
sort_order: 7
section_title: 'パート 2: Keycloak を使用した ID とアクセス管理'
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-4946" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-4946)"/>

  <!-- Decorations -->
  <g>
    <circle cx="702" cy="36" r="30" fill="#f87171" opacity="0.11"/>
    <circle cx="804" cy="38" r="26" fill="#f87171" opacity="0.07"/>
    <circle cx="906" cy="40" r="22" fill="#f87171" opacity="0.13"/>
    <circle cx="1008" cy="42" r="18" fill="#f87171" opacity="0.09"/>
    <circle cx="610" cy="44" r="14" fill="#f87171" opacity="0.05"/>
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
    <line x1="600" y1="96" x2="1100" y2="176" stroke="#f87171" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="126" x2="1050" y2="196" stroke="#f87171" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1072.8467875173176,230.5 1072.8467875173176,261.5 1046,277 1019.1532124826824,261.5 1019.1532124826824,230.5 1046,215" fill="none" stroke="#f87171" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#f87171"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#f87171" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f87171">🏗️ アーキテクチャ — レッスン 7</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 7: FHIR でのスマート — OAuth2/OIDC</tspan>
      <tspan x="60" dy="42">ヘルスケア API</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 2: Keycloak を使用した ID とアクセス管理</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. SMART on FHIR の概要

![SMART on FHIR Launch Flow — OAuth2/OIDC qua Keycloak cho EHR](/storage/uploads/2026/04/healthcare-smart-fhir-launch-flow.webp)

＃＃＃１．１．スマートとは何ですか?

FHIR の **SMART (代替医療アプリケーション、再利用可能な技術)** は、サードパーティ アプリケーションが FHIR API を通じて医療データに安全にアクセスできるようにするオープン スタンダードです。スマートな定義:

- **アプリ起動フレームワーク**: アプリが EHR またはスタンドアロンから起動される方法
- **承認スコープ**: FHIR リソースに対する詳細な権限
- **起動コンテキスト**: アプリに渡される患者、遭遇、位置コンテキスト
- **バックエンド サービス**: サービス間の承認にはユーザーの操作は必要ありません

＃＃＃１．２． SMART アプリの起動フロー

**EHR 起動フロー:**

1. ユーザーが EHR で「アプリの起動」をクリックします。
2. EHR はコンテキスト (患者 ID、エンカウンター ID) を含む起動リクエストを送信します。
3. アプリは認可サーバー (Keycloak) にリダイレクトします
4. ユーザー認証 (または SSO)
5. KeycloakはSMARTスコープを使用してアクセストークンを発行します
6. アプリはトークンを使用して FHIR リソースにアクセスします

**スタンドアロンの起動フロー:**

1. ユーザーがアプリを直接開きます (例: モバイルアプリ)
2. アプリは認証のために Keycloak にリダイレクトします
3. ユーザーは資格情報 + MFA を使用して認証します。
4. アプリは SMART スコープをリクエストします
5. 患者のコンテキストが必要な場合 → 患者ピッカー
6. Keycloakがアクセストークンを発行する
7. アプリが FHIR リソースにアクセスする

**バックエンド サービスの承認:**

1. サービスは署名付き JWT アサーションで認証します
2. KeycloakはJWTを検証し、アクセストークンを発行します
3. サービスは FHIR リソースにアクセスします
→ ユーザーの操作は必要ありません。用途: データ同期、分析、レポート作成。

## 2. SMART スコープ

＃＃＃２．１． FHIR リソースのスコープ

```
Format: <context>/<resource>.<permission>

Context:
  patient  → Access linked to a specific patient
  user     → Access linked to the current user
  system   → Full system-level access (backend services)

Resource:
  Patient, Observation, MedicationRequest, DiagnosticReport,
  Condition, Encounter, AllergyIntolerance, Immunization, etc.

Permission:
  read     → Search and read resources
  write    → Create, update, delete resources
  *        → All permissions
```

＃＃＃２．２．ヘルスケアの範囲の例

```
# Bác sĩ: Truy cập hồ sơ bệnh nhân trong context đang khám
user/Patient.read
user/Observation.read
user/Observation.write          # Vital signs, clinical observations
user/Condition.read
user/Condition.write            # Diagnoses
user/MedicationRequest.write    # Prescriptions
user/DiagnosticReport.read      # Lab results
user/AllergyIntolerance.read

# Bệnh nhân: Truy cập hồ sơ của chính mình
patient/Patient.read
patient/Observation.read
patient/MedicationRequest.read
patient/DiagnosticReport.read
patient/AllergyIntolerance.read
patient/Immunization.read

# Backend Service: Sync lab results
system/DiagnosticReport.write
system/Observation.write
system/ServiceRequest.read

# Ứng dụng nghiên cứu (de-identified data)
system/Patient.read?_elements=gender,birthDate,address.state
system/Condition.read
system/Observation.read
```

＃＃＃２．３． SMART の Keycloak クライアント スコープ

```json
{
  "clientScopes": [
    {
      "name": "patient/*.read",
      "description": "Read all FHIR resources for a specific patient",
      "protocol": "openid-connect",
      "attributes": {
        "include.in.token.scope": "true",
        "display.on.consent.screen": "true",
        "consent.screen.text": "Đọc hồ sơ bệnh án của bạn"
      },
      "protocolMappers": [
        {
          "name": "smart-patient-scope",
          "protocol": "openid-connect",
          "protocolMapper": "oidc-hardcoded-claim-mapper",
          "config": {
            "claim.name": "scope",
            "claim.value": "patient/*.read",
            "access.token.claim": "true"
          }
        }
      ]
    },
    {
      "name": "launch/patient",
      "description": "EHR launch with patient context",
      "protocol": "openid-connect",
      "attributes": {
        "include.in.token.scope": "true"
      },
      "protocolMappers": [
        {
          "name": "patient-launch-context",
          "protocol": "openid-connect",
          "protocolMapper": "oidc-usersessionmodel-note-mapper",
          "config": {
            "user.session.note": "patient_id",
            "claim.name": "patient",
            "access.token.claim": "true"
          }
        }
      ]
    },
    {
      "name": "fhirUser",
      "description": "FHIR User identity claim",
      "protocol": "openid-connect",
      "protocolMappers": [
        {
          "name": "fhir-user-mapper",
          "protocol": "openid-connect",
          "protocolMapper": "oidc-hardcoded-claim-mapper",
          "config": {
            "claim.name": "fhirUser",
            "claim.value": "",
            "access.token.claim": "true",
            "id.token.claim": "true"
          }
        }
      ]
    }
  ]
}
```

## 3. Quarkus を使用した FHIR での SMART

＃＃＃３．１． FHIR リソース サーバーの実装

```java
@Path("/fhir/r4")
@Authenticated
@Produces("application/fhir+json")
public class FhirPatientResource {

    @Inject
    SecurityIdentity identity;

    @Inject
    PatientRepository patientRepository;

    @Inject
    SmartScopeValidator scopeValidator;

    @GET
    @Path("/Patient/{id}")
    public Response readPatient(@PathParam("id") String id) {
        // Validate SMART scopes
        scopeValidator.requireScope(identity, "patient/Patient.read",
                                    "user/Patient.read");

        // If patient context → verify patient match
        String launchPatient = identity.getAttribute("patient");
        if (launchPatient != null && !launchPatient.equals(id)) {
            if (scopeValidator.hasOnlyPatientScopes(identity)) {
                throw new ForbiddenException(
                    "Patient scope restricted to patient: " + launchPatient);
            }
        }

        Patient patient = patientRepository.findById(id);
        if (patient == null) {
            return Response.status(404).entity(
                createOperationOutcome("Patient not found")).build();
        }

        return Response.ok(patient.toFhirJson()).build();
    }

    @GET
    @Path("/Patient")
    public Response searchPatients(
            @QueryParam("name") String name,
            @QueryParam("birthdate") String birthdate,
            @QueryParam("identifier") String identifier,
            @QueryParam("_count") @DefaultValue("20") int count) {

        scopeValidator.requireScope(identity,
            "patient/Patient.read", "user/Patient.read", "system/Patient.read");

        // Apply patient context restriction
        SearchParams params = SearchParams.builder()
            .name(name)
            .birthdate(birthdate)
            .identifier(identifier)
            .count(Math.min(count, 100))  // Cap results
            .patientContext(identity.getAttribute("patient"))
            .build();

        Bundle bundle = patientRepository.search(params);
        return Response.ok(bundle.toFhirJson()).build();
    }
}
```

＃＃＃３．２． SMART スコープバリデーター

```java
@ApplicationScoped
public class SmartScopeValidator {

    public void requireScope(SecurityIdentity identity, String... anyOfScopes) {
        Set<String> grantedScopes = getSmartScopes(identity);

        boolean hasScope = Arrays.stream(anyOfScopes)
            .anyMatch(scope -> matchScope(grantedScopes, scope));

        if (!hasScope) {
            throw new ForbiddenException(
                "Insufficient SMART scope. Required one of: " +
                String.join(", ", anyOfScopes));
        }
    }

    public boolean hasOnlyPatientScopes(SecurityIdentity identity) {
        return getSmartScopes(identity).stream()
            .allMatch(s -> s.startsWith("patient/") || s.equals("openid") ||
                          s.equals("fhirUser") || s.startsWith("launch/"));
    }

    private boolean matchScope(Set<String> granted, String required) {
        // Direct match
        if (granted.contains(required)) return true;

        // Wildcard match: patient/*.read matches patient/Patient.read
        String[] parts = required.split("[/.]");
        if (parts.length == 3) {
            String wildcardScope = parts[0] + "/*." + parts[2];
            return granted.contains(wildcardScope);
        }

        return false;
    }

    private Set<String> getSmartScopes(SecurityIdentity identity) {
        // Extract scopes from JWT claim
        JsonArray scopeClaim = identity.getAttribute("scope");
        if (scopeClaim != null) {
            return scopeClaim.stream()
                .map(JsonValue::toString)
                .collect(Collectors.toSet());
        }
        return Set.of();
    }
}
```

＃＃＃３．３． SMART のよく知られた構成

```java
@Path("/.well-known/smart-configuration")
public class SmartConfigurationResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getSmartConfiguration() {
        return Response.ok(Map.of(
            "authorization_endpoint",
                "https://keycloak.hospital.vn/realms/healthcare/protocol/openid-connect/auth",
            "token_endpoint",
                "https://keycloak.hospital.vn/realms/healthcare/protocol/openid-connect/token",
            "introspection_endpoint",
                "https://keycloak.hospital.vn/realms/healthcare/protocol/openid-connect/token/introspect",
            "revocation_endpoint",
                "https://keycloak.hospital.vn/realms/healthcare/protocol/openid-connect/revoke",
            "capabilities", List.of(
                "launch-ehr",
                "launch-standalone",
                "client-public",
                "client-confidential-symmetric",
                "sso-openid-connect",
                "context-passthrough-banner",
                "context-passthrough-style",
                "context-ehr-patient",
                "context-ehr-encounter",
                "context-standalone-patient",
                "permission-offline",
                "permission-patient",
                "permission-user",
                "authorize-post"
            ),
            "scopes_supported", List.of(
                "openid", "fhirUser", "launch", "launch/patient",
                "patient/*.read", "patient/*.write",
                "user/*.read", "user/*.write",
                "system/*.read", "system/*.write"
            ),
            "response_types_supported", List.of("code"),
            "code_challenge_methods_supported", List.of("S256"),
            "token_endpoint_auth_methods_supported", List.of(
                "client_secret_basic", "client_secret_post", "private_key_jwt"
            )
        )).build();
    }
}
```

## 4. FHIR 同意リソース

＃＃＃４．１．患者の同意管理

```json
{
  "resourceType": "Consent",
  "id": "consent-001",
  "status": "active",
  "scope": {
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/consentscope",
      "code": "patient-privacy"
    }]
  },
  "category": [{
    "coding": [{
      "system": "http://loinc.org",
      "code": "59284-0",
      "display": "Patient Consent"
    }]
  }],
  "patient": {
    "reference": "Patient/P-001"
  },
  "dateTime": "2026-04-01T10:00:00+07:00",
  "provision": {
    "type": "permit",
    "period": {
      "start": "2026-04-01",
      "end": "2027-04-01"
    },
    "actor": [{
      "role": {
        "coding": [{
          "system": "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
          "code": "PRCP",
          "display": "Primary Care Provider"
        }]
      },
      "reference": {
        "reference": "Organization/BV-cho-ray"
      }
    }],
    "action": [{
      "coding": [{
        "system": "http://terminology.hl7.org/CodeSystem/consentaction",
        "code": "access"
      }]
    }],
    "purpose": [{
      "system": "http://terminology.hl7.org/CodeSystem/v3-ActReason",
      "code": "TREAT",
      "display": "Treatment"
    }]
  }
}
```

## 5. バックエンドサービスの認可

＃＃＃５．１．署名付き JWT によるサービス認証

```java
// Backend service authenticates with JWT assertion
@ApplicationScoped
public class FhirBackendServiceClient {

    @ConfigProperty(name = "fhir.service.private-key-path")
    String privateKeyPath;

    @ConfigProperty(name = "fhir.service.client-id")
    String clientId;

    @ConfigProperty(name = "fhir.keycloak.token-url")
    String tokenUrl;

    public String getAccessToken() {
        // Create signed JWT assertion (RFC 7523)
        PrivateKey key = loadPrivateKey(privateKeyPath);

        String jwt = Jwt.issuer(clientId)
            .subject(clientId)
            .audience(tokenUrl)
            .expiresIn(Duration.ofMinutes(5))
            .jws().keyId("service-key-1")
            .sign(key);

        // Exchange JWT for access token
        return WebClient.create(tokenUrl)
            .post()
            .sendForm(MultiMap.caseInsensitiveMultiMap()
                .add("grant_type", "client_credentials")
                .add("client_assertion_type",
                    "urn:ietf:params:oauth:client-assertion-type:jwt-bearer")
                .add("client_assertion", jwt)
                .add("scope", "system/*.read system/*.write"))
            .await()
            .bodyAsJsonObject()
            .getString("access_token");
    }
}
```

## 6. まとめ

このレッスンでは次のことを行います。

- **SMART on FHIR** フレームワークと 3 つの起動フローを理解する
- 医療リソースの **SMART スコープ**を設計する
- **Keycloak クライアント スコープ**を SMART 用に構成する
- スコープ検証を使用して **FHIR リソース サーバー** を Quarkus に実装する
- **SMART Well-Known Configuration** エンドポイントを構築する
- FHIR 同意リソースを使用して **患者同意** 管理を実装する
- 署名付き JWT を使用して **バックエンド サービス承認** を実装する

## 演習

1. 患者コンテキストを使用して SMART EHR 起動用に Keycloak クライアントを構成する
2. SMART スコープ検証を備えた FHIR 観測リソース サーバーを実装する
3. SMART Well-Known 構成エンドポイントを作成する
4. EHR 起動フローの統合テストを作成する

---

---

<!-- SERIES-NAV:START -->
| ◀ 前の記事 |次の記事 ▶ |
|:---|---:|
| [レッスン 6: RBAC と ABAC - 医師、看護師、患者の分散化](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-6-rbac-abac-phan-quyen-nhan-vien-y-te) | [レッスン 8: MFA、パスキー、医療スタッフの緊急アクセス](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-8-mfa-passkeys-emergency-access-nhan-vien-y-te) |
<!-- SERIES-NAV:END -->
