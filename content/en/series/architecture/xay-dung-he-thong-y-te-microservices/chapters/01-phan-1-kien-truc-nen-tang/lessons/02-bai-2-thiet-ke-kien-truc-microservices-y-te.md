---
id: 019e1a40-a102-7001-d001-f0a1b2c30102
title: >-
  Lesson 2: Designing Microservices Architecture for Healthcare — Quarkus Stack
  Blueprint
slug: bai-2-thiet-ke-kien-truc-microservices-y-te
description: >-
  Designing secure microservices architecture for medical systems using Quarkus,
  PostgreSQL, Keycloak. Includes API Gateway pattern, service mesh, event-driven
  architecture with Kafka, network segmentation, DMZ design, and reference
  architecture blueprint for HIS/EMR/LIS.
duration_minutes: 150
is_free: true
video_url: null
sort_order: 2
section_title: 'Part 1: Architecture & Platform'
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
    <linearGradient id="bg-8085" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-8085)"/>

  <!-- Decorations -->
  <g>
    <circle cx="931" cy="223" r="14" fill="#34d399" opacity="0.08"/>
    <circle cx="762" cy="114" r="17" fill="#34d399" opacity="0.11"/>
    <circle cx="1093" cy="265" r="20" fill="#34d399" opacity="0.14"/>
    <circle cx="924" cy="156" r="23" fill="#34d399" opacity="0.07"/>
    <circle cx="755" cy="47" r="26" fill="#34d399" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <line x1="600" y1="113" x2="1100" y2="193" stroke="#34d399" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="143" x2="1050" y2="213" stroke="#34d399" stroke-width="0.5" opacity="0.08"/>
    <polygon points="987.2487113059643,149 987.2487113059643,177 963,191 938.7512886940357,177 938.7512886940357,149 963,135" fill="none" stroke="#34d399" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#34d399"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#34d399" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#34d399">🏗️ Architecture — Lesson 2</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 2: Designing Microservices Architecture</tspan>
      <tspan x="60" dy="42">for Healthcare — Quarkus Stack Blueprint</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Building a Microservices Healthcare System — Quarkus, PostgreSQL, Keycloak with HIPAA standards</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 1: Architecture & Platform</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. Healthcare Microservices Architecture Overview

![Healthcare Microservices overall architecture — Quarkus, PostgreSQL, Keycloak, Kafka, Istio](/storage/uploads/2026/04/healthcare-ms-architecture-blueprint.webp)

### 1.1. Why Microservices for Healthcare?

The traditional (monolithic) health system faces many challenges:

- **Downtime affects the whole**: Error of one module (lab) affects the entire HIS
- **Difficult to scale**: Cannot scale a module with high load (EMR) alone without scaling the whole system
- **Security blast radius is large**: A vulnerability that can compromise all data
- **Difficult to update**: Security patch requires complete redeploy

Microservices solve it by:

- **Isolation**: Each service has its own database, breaching one service does not affect another service
- **Independent deployment**: Patch security for each service without affecting the system
- **Selective scaling**: Scale service with high demand (appointment booking during peak hours)
- **Technology diversity**: Each service chooses the most suitable tech stack

### 1.2. Healthcare Domain Services

![Overview of Healthcare Microservices — 8 main domain services in the healthcare system](/storage/uploads/2026/04/healthcare-domain-services-grid.webp)

**Core Services:**

| Service | Main function |
|--------|----------------|
| **Patient Service** | Patient Registry, Demographics |
| **Clinical Service (EMR)** | Encounters, Diagnosis, Notes, Vitals |
| **Lab Service (LIS)** | Orders, Results, Specimens, Reports |
| **Pharmacy Service** | Prescriptions, Dispensing, Drug DB |
| **Billing Service** | Invoices, Insurance, Claims, Payments |
| **Scheduling Service** | Appointments, Calendar, Waitlist |
| **Imaging Service (RIS/PACS)** | Studies, Reports |
| **Notification Service** | SMS/Email, Push, Alerts |

## 2. Reference Architecture: Secure Healthcare Platform

### 2.1. High-Level Architecture

![Healthcare Platform overview architecture — from Internet via WAF, DMZ, API Gateway to Internal Network](/storage/uploads/2026/04/healthcare-high-level-architecture.webp)

### 2.2. Network Segmentation (Defense-in-Depth)

![Defense-in-Depth model with 4 network zones — DMZ, Application, Data, Management](/storage/uploads/2026/04/healthcare-network-segmentation.webp)

| Zone | Ingredients |
|-------|-----------|
| **Zone 1: DMZ** | API Gateway, Static content / CDN origin, Reverse Proxy |
| **Zone 2: Application** | Quarkus Microservices, Keycloak, Message Queue (Kafka) |
| **Zone 3: Data** (Most restricted) | PostgreSQL Clusters, Redis Cache, Backup Storage, Key Management (Vault) |
| **Zone 4: Management** | Monitoring (Prometheus, Grafana), Logging (ELK Stack), CI/CD Pipeline, Admin Access |

**Firewall Rules between zones:**

- DMZ → Application: Only specific ports (443, 8080)
- Application → Data: Only database ports (5432, 6379, 9092)
- Data → Anywhere: Outbound is not allowed
- Management → All: Read-only monitoring access

## 3. Quarkus Microservices Security Architecture

### 3.1. Quarkus Security Stack

```xml
<!-- pom.xml - Security dependencies -->
<dependencies>
    <!-- OIDC Authentication with Keycloak -->
    <dependency>
        <groupId>io.quarkus</groupId>
        <artifactId>quarkus-oidc</artifactId>
    </dependency>

    <!-- JWT Token Processing -->
    <dependency>
        <groupId>io.quarkus</groupId>
        <artifactId>quarkus-smallrye-jwt</artifactId>
    </dependency>

    <!-- Reactive PostgreSQL with encryption support -->
    <dependency>
        <groupId>io.quarkus</groupId>
        <artifactId>quarkus-reactive-pg-client</artifactId>
    </dependency>

    <!-- Hibernate ORM with Panache -->
    <dependency>
        <groupId>io.quarkus</groupId>
        <artifactId>quarkus-hibernate-orm-panache</artifactId>
    </dependency>

    <!-- OpenTelemetry for distributed tracing -->
    <dependency>
        <groupId>io.quarkus</groupId>
        <artifactId>quarkus-opentelemetry</artifactId>
    </dependency>

    <!-- Health checks -->
    <dependency>
        <groupId>io.quarkus</groupId>
        <artifactId>quarkus-smallrye-health</artifactId>
    </dependency>

    <!-- Kafka for event streaming -->
    <dependency>
        <groupId>io.quarkus</groupId>
        <artifactId>quarkus-smallrye-reactive-messaging-kafka</artifactId>
    </dependency>
</dependencies>
```

### 3.2. Application Configuration

```properties
# application.properties - Security Configuration

# === OIDC/Keycloak Configuration ===
quarkus.oidc.auth-server-url=https://keycloak.hospital.internal/realms/healthcare
quarkus.oidc.client-id=patient-service
quarkus.oidc.credentials.secret=${OIDC_CLIENT_SECRET}
quarkus.oidc.tls.verification=required

# === Database Security ===
quarkus.datasource.db-kind=postgresql
quarkus.datasource.jdbc.url=jdbc:postgresql://pg-primary.data-zone:5432/patient_db?ssl=true&sslmode=verify-full
quarkus.datasource.username=${DB_USERNAME}
quarkus.datasource.password=${DB_PASSWORD}
quarkus.datasource.jdbc.min-size=5
quarkus.datasource.jdbc.max-size=20

# === TLS Configuration ===
quarkus.http.ssl.certificate.files=/certs/tls.crt
quarkus.http.ssl.certificate.key-files=/certs/tls.key
quarkus.http.ssl-port=8443
quarkus.http.insecure-requests=disabled

# === Security Headers ===
quarkus.http.header."Strict-Transport-Security".value=max-age=31536000; includeSubDomains
quarkus.http.header."X-Content-Type-Options".value=nosniff
quarkus.http.header."X-Frame-Options".value=DENY
quarkus.http.header."Content-Security-Policy".value=default-src 'self'

# === CORS (restricted) ===
quarkus.http.cors=true
quarkus.http.cors.origins=https://portal.hospital.vn,https://admin.hospital.vn
quarkus.http.cors.methods=GET,POST,PUT,DELETE
quarkus.http.cors.headers=Authorization,Content-Type

# === OpenTelemetry ===
quarkus.otel.exporter.otlp.endpoint=https://otel-collector.management-zone:4317
quarkus.otel.resource.attributes=service.name=patient-service,deployment.environment=production
```

### 3.3. Service-to-Service Communication Pattern

```java
// Secure service-to-service communication với token propagation
@Path("/api/v1/patients")
@Authenticated
@RolesAllowed({"doctor", "nurse", "admin"})
public class PatientResource {

    @Inject
    @RestClient
    LabServiceClient labClient;

    @Inject
    SecurityIdentity securityIdentity;

    @Inject
    AuditService auditService;

    @GET
    @Path("/{patientId}/lab-results")
    @RolesAllowed({"doctor"})
    public Response getPatientLabResults(
            @PathParam("patientId") UUID patientId) {

        // Audit log: WHO accessed WHAT
        auditService.log(AuditEvent.builder()
            .action("READ")
            .resource("PatientLabResults")
            .resourceId(patientId.toString())
            .actor(securityIdentity.getPrincipal().getName())
            .actorRoles(securityIdentity.getRoles())
            .build());

        // Token propagation - forward JWT to downstream service
        List<LabResult> results = labClient.getResultsByPatient(patientId);

        return Response.ok(results).build();
    }
}
```

## 4. Database-per-Service Pattern for Healthcare

### 4.1. Data Isolation Strategy

![Database-per-Service pattern — each microservice has a separate database with data isolation](/storage/uploads/2026/04/healthcare-database-per-service.webp)

| Service | Database | Tables |
|--------|----------|--------|
| **Patient Service** | patient_db | patients (demographics, contacts), patient_consents, patient_identifiers |
| **Clinical Service** | clinical_db | encounters, diagnoses, clinical_notes (encrypted), vital_signs |
| **Lab Service** | lab_db | lab_orders, lab_results (encrypted), samples, reference_ranges |
| **Pharmacy Service** | pharmacy_db | prescriptions, dispensing_records, drug_interactions |
| **Audit Service** | audit_db (append-only) | audit_events (immutable), access_logs, security_incidents |

### 4.2. Shared Data via Events (Event Sourcing)

![Event-driven architecture — Patient Service publish events via Kafka to consuming services](/storage/uploads/2026/04/healthcare-event-sourcing-kafka.webp)

> **Important**: Kafka messages containing PHI must be encrypted. Use Kafka encryption at-rest and application-level encryption for sensitive fields.

## 5. API Gateway Security

### 5.1. Kong Gateway Configuration for Healthcare

```yaml
# kong.yml - Healthcare API Gateway Configuration
_format_version: "3.0"

services:
  - name: patient-service
    url: https://patient-service.app-zone:8443
    routes:
      - name: patient-api
        paths:
          - /api/v1/patients
        protocols:
          - https
    plugins:
      # Rate limiting per consumer
      - name: rate-limiting
        config:
          minute: 100
          hour: 1000
          policy: redis
          redis_host: redis.data-zone
          redis_port: 6379
          redis_ssl: true

      # JWT validation (delegated to Keycloak)
      - name: openid-connect
        config:
          issuer: https://keycloak.hospital.internal/realms/healthcare
          client_id: kong-gateway
          client_secret: ${KONG_OIDC_SECRET}
          bearer_only: "yes"
          ssl_verify: true

      # Request size limiting (prevent oversized payloads)
      - name: request-size-limiting
        config:
          allowed_payload_size: 10  # MB
          size_unit: megabytes

      # IP restriction for admin endpoints
      - name: ip-restriction
        config:
          allow:
            - 10.0.0.0/8      # Internal network
            - 172.16.0.0/12   # Docker networks

      # Request/Response transformation (strip sensitive headers)
      - name: response-transformer
        config:
          remove:
            headers:
              - X-Powered-By
              - Server

      # Correlation ID for audit trail
      - name: correlation-id
        config:
          header_name: X-Correlation-ID
          generator: uuid
          echo_downstream: true
```

## 6. Event-Driven Security Architecture

### 6.1. Security Events Flow

```java
// Security event schema cho Kafka
public record SecurityEvent(
    String eventId,
    Instant timestamp,
    String eventType,        // ACCESS, MODIFY, DELETE, EXPORT, PRINT
    String actor,            // User ID from Keycloak
    String actorRole,        // doctor, nurse, admin
    String actorDepartment,  // Khoa Nội, Khoa Ngoại
    String resource,         // PatientRecord, LabResult
    String resourceId,       // Patient ID, Record ID
    String action,           // READ, WRITE, DELETE
    String outcome,          // SUCCESS, FAILURE, DENIED
    String sourceIp,
    String sourceDevice,
    Map<String, String> additionalContext
) {}
```

### 6.2. Kafka Topic Design for Healthcare

```
healthcare.audit.access          # All PHI access events
healthcare.audit.modifications   # Data changes
healthcare.audit.authentication  # Login/logout events
healthcare.audit.authorization   # Permission denied events
healthcare.security.incidents    # Security incidents
healthcare.consent.changes       # Patient consent updates
healthcare.patient.events        # Patient lifecycle events (encrypted)
healthcare.clinical.events       # Clinical data changes (encrypted)
```

## 7. Infrastructure as Code - Secure Deployment

### 7.1. Docker Compose for Development

```yaml
# docker-compose.yml - Secure Healthcare Dev Environment
version: '3.8'

services:
  keycloak:
    image: quay.io/keycloak/keycloak:26.0
    command: start-dev --import-realm
    environment:
      KC_DB: postgres
      KC_DB_URL: jdbc:postgresql://keycloak-db:5432/keycloak
      KC_DB_USERNAME: keycloak
      KC_DB_PASSWORD: ${KC_DB_PASSWORD}
      KC_HOSTNAME: localhost
      KC_HTTPS_CERTIFICATE_FILE: /opt/keycloak/certs/tls.crt
      KC_HTTPS_CERTIFICATE_KEY_FILE: /opt/keycloak/certs/tls.key
    volumes:
      - ./keycloak/realm-healthcare.json:/opt/keycloak/data/import/realm.json
      - ./certs:/opt/keycloak/certs:ro
    ports:
      - "8443:8443"
    networks:
      - app-network

  postgres-patient:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: patient_db
      POSTGRES_USER: patient_svc
      POSTGRES_PASSWORD: ${PG_PATIENT_PASSWORD}
      POSTGRES_INITDB_ARGS: "--auth-host=scram-sha-256 --data-checksums"
    volumes:
      - ./sql/init-patient.sql:/docker-entrypoint-initdb.d/01-init.sql
      - ./sql/rls-policies.sql:/docker-entrypoint-initdb.d/02-rls.sql
      - patient-data:/var/lib/postgresql/data
    command: >
      postgres
        -c ssl=on
        -c ssl_cert_file=/certs/server.crt
        -c ssl_key_file=/certs/server.key
        -c shared_preload_libraries='pgaudit,pgcrypto'
        -c pgaudit.log='read,write,ddl'
        -c log_connections=on
        -c log_disconnections=on
        -c password_encryption=scram-sha-256
    networks:
      - data-network

  kafka:
    image: confluentinc/cp-kafka:7.6.0
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: INTERNAL:SSL
      KAFKA_SSL_KEYSTORE_LOCATION: /certs/kafka.keystore.jks
      KAFKA_SSL_KEYSTORE_PASSWORD: ${KAFKA_KEYSTORE_PASSWORD}
      KAFKA_SSL_TRUSTSTORE_LOCATION: /certs/kafka.truststore.jks
    networks:
      - app-network
      - data-network

networks:
  app-network:
    driver: bridge
  data-network:
    driver: bridge
    internal: true  # No external access to data network

volumes:
  patient-data:
    driver: local
```

## 8. Security Checklist for Healthcare Architecture

| Layers | Control | Status |
|-------|--------|--------|
| **Network** | TLS 1.3 everywhere | ☐ |
| **Network** | Network segmentation (DMZ, App, Data zones) | ☐ |
| **Network** | WAF enabled | ☐ |
| **Gateway** | Rate limiting | ☐ |
| **Gateway** | Input validation | ☐ |
| **Gateway** | CORS restrictions | ☐ |
| **Identity** | Keycloak SSO | ☐ |
| **Identity** | MFA for clinical users | ☐ |
| **Identity** | Session timeout < 15 min | ☐ |
| **Service** | OIDC token validation | ☐ |
| **Service** | RBAC/ABAC enforcement | ☐ |
| **Service** | Input sanitization | ☐ |
| **Database** | SSL connections | ☐ |
| **Database** | Row-Level Security | ☐ |
| **Database** | Column encryption for PHI | ☐ |
| **Database** | pgAudit enabled | ☐ |
| **Messaging** | Kafka SSL + message encryption | ☐ |
| **Logging** | Centralized audit trail | ☐ |
| **Logging** | No PHI in logs | ☐ |
| **Backup** | Encrypted backups | ☐ |
| **Backup** | Tested DR procedure | ☐ |

## 9. Summary

In this lesson, we designed:

- **Healthcare microservices architecture** with appropriate domain services
- **Network segmentation** theo Defense-in-Depth (DMZ, App, Data, Management zones)
- **Quarkus security stack** with OIDC, TLS, security headers
- **Database-per-Service** pattern with event-driven communication via Kafka
- **API Gateway** security configuration
- **Infrastructure as Code** cho secure deployment

## Exercise

1. Draw your healthcare system architecture according to the Defense-in-Depth model
2. Determine the data flow of PHI across microservices and network zones
3. Setup Docker Compose environment with TLS enabled for all services

---

---

<!-- SERIES-NAV:START -->
| ◀ Previous article | Next article ▶ |
|:---|---:|
| [Lesson 1: Overview of Medical Data Security - HIPAA, HL7 FHIR & Vietnamese Law](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-1-tong-quan-bao-mat-du-lieu-y-te-hipaa-hl7-fhir) | [Lesson 3: Classification of Health Data (PHI/ePHI) and Risk Assessment](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-3-phan-loai-du-lieu-y-te-phi-va-danh-gia-rui-ro) |
<!-- SERIES-NAV:END -->
