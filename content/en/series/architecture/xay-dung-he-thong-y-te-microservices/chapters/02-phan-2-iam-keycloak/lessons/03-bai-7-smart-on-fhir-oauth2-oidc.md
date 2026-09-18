---
id: 019e1a40-a107-7001-d001-f0a1b2c30107
title: 'Lesson 7: SMART on FHIR — OAuth2/OIDC for Healthcare APIs'
slug: bai-7-smart-on-fhir-oauth2-oidc
description: >-
  Deploy SMART on FHIR (Substitutable Medical Applications, Reusable
  Technologies) with Keycloak: SMART App Launch Framework, scopes for FHIR
  resources (patient/*.read, user/*.write), launch context, EHR Launch vs
  Standalone Launch, Backend Services Authorization, and integration with HAPI
  FHIR Server on Quarkus.
duration_minutes: 180
is_free: true
video_url: null
sort_order: 7
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f87171">🏗️ Architecture — Lesson 7</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 7: SMART on FHIR — OAuth2/OIDC for</tspan>
      <tspan x="60" dy="42">Healthcare APIs</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Building a Microservices Healthcare System — Quarkus, PostgreSQL, Keycloak with HIPAA standards</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 2: Identity & Access Management with Keycloak</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. SMART on FHIR Overview

![SMART on FHIR Launch Flow — OAuth2/OIDC qua Keycloak cho EHR](/storage/uploads/2026/04/healthcare-smart-fhir-launch-flow.webp)

### 1.1. What is SMART?

**SMART (Substitutable Medical Applications, Reusable Technologies)** on FHIR is an open standard that allows third-party applications to securely access medical data through FHIR APIs. SMART definition:

- **App Launch Framework**: How the app is launched from EHR or standalone
- **Authorization scopes**: Granular permissions for FHIR resources
- **Launch context**: Patient, encounter, location context passed to the app
- **Backend Services**: Service-to-service authorization does not require user interaction

### 1.2. SMART App Launch Flows

**EHR Launch Flow:**

1. User clicks "Launch App" in EHR
2. EHR sends launch request with context (patient ID, encounter ID)
3. App redirects to Authorization Server (Keycloak)
4. User authenticates (or SSO)
5. Keycloak issues access token with SMART scopes
6. App uses tokens to access FHIR resources

**Standalone Launch Flow:**

1. User opens app directly (e.g., mobile app)
2. App redirects to Keycloak for authentication
3. User authenticates with credentials + MFA
4. App requests SMART scopes
5. If patient context needed → patient picker
6. Keycloak issues access token
7. App accesses FHIR resources

**Backend Services Authorization:**

1. Service authenticates with signed JWT assertion
2. Keycloak validates JWT and issues access token
3. Service accesses FHIR resources
→ No user interaction required. Used for: data sync, analytics, reporting.

## 2. SMART Scopes

### 2.1. FHIR Resource Scopes

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

### 2.2. Scope Examples for Healthcare

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

### 2.3. Keycloak Client Scopes for SMART

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

## 3. SMART on FHIR with Quarkus

### 3.1. FHIR Resource Server Implementation

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

### 3.2. SMART Scope Validator

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

### 3.3. SMART Well-Known Configuration

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

## 4. FHIR Consent Resource

### 4.1. Patient Consent Management

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

## 5. Backend Services Authorization

### 5.1. Service Authentication with Signed JWT

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

## 6. Summary

In this lesson, we have:

- Understand **SMART on FHIR** framework and 3 launch flows
- Design **SMART scopes** for healthcare resources
- Configure **Keycloak Client Scopes** for SMART
- Implement **FHIR Resource Server** on Quarkus with scope validation
- Build **SMART Well-Known Configuration** endpoint
- Implement **Patient Consent** management with FHIR Consent resource
- Implement **Backend Services Authorization** with signed JWT

## Exercises

1. Configure Keycloak client for SMART EHR Launch with patient context
2. Implement FHIR Observation resource server with SMART scope validation
3. Create SMART Well-Known configuration endpoint
4. Write integration tests for EHR Launch flow

---

---

<!-- SERIES-NAV:START -->
| ◀ Previous article | Next article ▶ |
|:---|---:|
| [Lesson 6: RBAC & ABAC - Decentralization of Doctors, Nurses, and Patients](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-6-rbac-abac-phan-quyen-nhan-vien-y-te) | [Lesson 8: MFA, Passkeys & Emergency Access for Medical Staff](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-8-mfa-passkeys-emergency-access-nhan-vien-y-te) |
<!-- SERIES-NAV:END -->
