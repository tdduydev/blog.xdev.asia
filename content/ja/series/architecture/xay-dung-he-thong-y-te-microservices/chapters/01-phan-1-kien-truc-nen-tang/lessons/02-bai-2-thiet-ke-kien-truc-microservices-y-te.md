---
id: 019e1a40-a102-7001-d001-f0a1b2c30102
title: 'レッスン 2: 医療向けのマイクロサービス アーキテクチャの設計 — Quarkus Stack ブループリント'
slug: bai-2-thiet-ke-kien-truc-microservices-y-te
description: >-
  Quarkus、PostgreSQL、Keycloakを使用した医療システム向けの安全なマイクロサービス アーキテクチャの設計。 API ゲートウェイ
  パターン、サービス メッシュ、Kafka を使用したイベント ドリブン アーキテクチャ、ネットワーク セグメンテーション、DMZ
  設計、HIS/EMR/LIS のリファレンス アーキテクチャ ブループリントが含まれます。
duration_minutes: 150
is_free: true
video_url: null
sort_order: 2
section_title: 'パート 1: アーキテクチャとプラットフォーム'
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: ja
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#34d399">🏗️ アーキテクチャ — レッスン 2</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 2: マイクロサービス アーキテクチャの設計</tspan>
      <tspan x="60" dy="42">ヘルスケア向け — Quarkus スタック ブループリント</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 1: アーキテクチャとプラットフォーム</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. ヘルスケア マイクロサービス アーキテクチャの概要

![ヘルスケア マイクロサービス全体のアーキテクチャ — Quarkus、PostgreSQL、Keycloak、Kafka、Istio](/storage/uploads/2026/04/healthcare-ms-architecture-blueprint.webp)

＃＃＃１．１．医療にマイクロサービスを使用する理由

従来の（一枚岩の）医療システムは多くの課題に直面しています。

- **ダウンタイムは全体に影響します**: 1 つのモジュール (ラボ) のエラーは HIS 全体に影響します
- **拡張が難しい**: システム全体を拡張せずに、高負荷 (EMR) のモジュールだけを拡張することはできません。
- **セキュリティ爆発範囲が大きい**: すべてのデータを侵害する可能性がある脆弱性
- **更新が難しい**: セキュリティ パッチは完全な再展開が必要です

マイクロサービスは次の方法で問題を解決します。

- **分離**: 各サービスには独自のデータベースがあり、あるサービスに違反しても、別のサービスには影響しません。
- **独立した展開**: システムに影響を与えることなく、各サービスのセキュリティにパッチを適用します。
- **選択的なスケーリング**: 需要の高いサービスをスケーリングします (ピーク時間帯の予約)
- **テクノロジーの多様性**: 各サービスが最適なテクノロジー スタックを選択します

＃＃＃１．２．ヘルスケアドメインサービス

![ヘルスケア マイクロサービスの概要 — ヘルスケア システムの 8 つの主要ドメイン サービス](/storage/uploads/2026/04/healthcare-domain-services-grid.webp)

**コアサービス:**

|サービス |主な機能 |
|------|----------------|
| **患者サービス** |患者登録、人口統計 |
| **臨床サービス (EMR)** |出会い、診断、メモ、重要事項 |
| **ラボ サービス (LIS)** |注文、結果、検体、レポート |
| **薬局サービス** |処方箋・調剤・医薬品DB |
| **請求サービス** |請求書、保険、請求、支払い |
| **スケジュールサービス** |予約、カレンダー、順番待ちリスト |
| **イメージング サービス (RIS/PACS)** |研究、レポート |
| **通知サービス** | SMS/電子メール、プッシュ、アラート |

## 2. リファレンス アーキテクチャ: 安全なヘルスケア プラットフォーム

＃＃＃２．１．上位レベルのアーキテクチャ

![ヘルスケア プラットフォームのアーキテクチャの概要 — WAF、DMZ、API ゲートウェイを介したインターネットから内部ネットワークまで](/storage/uploads/2026/04/healthcare-high-level-architecture.webp)

＃＃＃２．２．ネットワークセグメンテーション (多層防御)

![4 つのネットワーク ゾーンを備えた多層防御モデル — DMZ、アプリケーション、データ、管理](/storage/uploads/2026/04/healthcare-network-segmentation.webp)

|ゾーン |成分 |
|------|-----------|
| **ゾーン 1: DMZ** | APIゲートウェイ、静的コンテンツ/CDNオリジン、リバースプロキシ |
| **ゾーン 2: アプリケーション** | Quarkus マイクロサービス、Keycloak、メッセージ キュー (Kafka) |
| **ゾーン 3: データ** (最も制限されている) | PostgreSQL クラスター、Redis キャッシュ、バックアップ ストレージ、キー管理 (Vault) |
| **ゾーン 4: 管理** |モニタリング (Prometheus、Grafana)、ロギング (ELK スタック)、CI/CD パイプライン、管理者アクセス |

**ゾーン間のファイアウォール ルール:**

- DMZ → アプリケーション: 特定のポートのみ (443、8080)
- アプリケーション → データ: データベース ポートのみ (5432、6379、9092)
- データ → どこでも: アウトバウンドは許可されません
- 管理 → すべて: 読み取り専用監視アクセス

## 3. Quarkus マイクロサービスのセキュリティ アーキテクチャ

＃＃＃３．１． Quarkusセキュリティスタック

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

＃＃＃３．２．アプリケーション構成

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

＃＃＃３．３．サービス間の通信パターン

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

## 4. ヘルスケア向けのサービスごとのデータベースのパターン

＃＃＃４．１．データ分離戦略

![サービスごとのデータベース パターン — 各マイクロサービスには、データが分離された個別のデータベースがあります。](/storage/uploads/2026/04/healthcare-database-per-service.webp)

|サービス |データベース |テーブル |
|----------|----------|----------|
| **患者サービス** |患者データベース |患者 (人口統計、連絡先)、患者の同意、患者の識別子 |
| **臨床サービス** |臨床データベース |遭遇、診断、臨床メモ (暗号化)、バイタルサイン |
| **ラボサービス** |ラボデータベース | lab_orders、lab_results (暗号化)、サンプル、reference_ranges |
| **薬局サービス** |薬局データベース |処方箋、調剤記録、薬物相互作用 |
| **監査サービス** | Audit_db (追加のみ) | Audit_events (不変)、access_logs、security_incidents |

＃＃＃４．２．イベントを介したデータの共有 (イベントソーシング)

![イベント駆動型アーキテクチャ — 患者サービスは、Kafka を介して消費サービスにイベントを発行します。](/storage/uploads/2026/04/healthcare-event-sourcing-kafka.webp)

> **重要**: PHI を含む Kafka メッセージは暗号化する必要があります。保存時には Kafka 暗号化を使用し、機密フィールドにはアプリケーション レベルの暗号化を使用します。

## 5. API ゲートウェイのセキュリティ

＃＃＃５．１．ヘルスケア向けの Kong ゲートウェイ構成

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

## 6. イベント駆動型のセキュリティ アーキテクチャ

＃＃＃６．１．セキュリティイベントの流れ

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

＃＃＃６．２．ヘルスケアのための Kafka トピック デザイン

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

## 7. コードとしてのインフラストラクチャ - 安全な導入

＃＃＃７．１．開発用の Docker Compose

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

## 8. ヘルスケア アーキテクチャのセキュリティ チェックリスト

|レイヤー |コントロール |ステータス |
|----------|----------|----------|
| **ネットワーク** |どこでも TLS 1.3 | ☐ |
| **ネットワーク** |ネットワークセグメンテーション (DMZ、アプリ、データゾーン) | ☐ |
| **ネットワーク** | WAF が有効 | ☐ |
| **ゲートウェイ** |レート制限 | ☐ |
| **ゲートウェイ** |入力の検証 | ☐ |
| **ゲートウェイ** | CORS の制限 | ☐ |
| **アイデンティティ** | Keycloak SSO | ☐ |
| **アイデンティティ** |臨床ユーザー向けの MFA | ☐ |
| **アイデンティティ** |セッションタイムアウト < 15 min | ☐ |
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

## 9. まとめ

このレッスンでは、以下を設計しました。

- 適切なドメイン サービスを備えた **ヘルスケア マイクロサービス アーキテクチャ**
- **Network segmentation** theo Defense-in-Depth (DMZ, App, Data, Management zones)
- **Quarkus セキュリティ スタック** (OIDC、TLS、セキュリティ ヘッダー付き)
- Kafka を介したイベント駆動型通信を使用した **Database-per-Service** パターン
- **API Gateway** security configuration
- **Infrastructure as Code** cho secure deployment

＃＃ エクササイズ

1. 多層防御モデルに従って医療システム アーキテクチャを描画する
2. マイクロサービスとネットワーク ゾーンにわたる PHI のデータ フローを決定する
3. すべてのサービスに対して TLS を有効にして Docker Compose 環境をセットアップします。

---

---

<!-- SERIES-NAV:START -->
| ◀ 前の記事 |次の記事 ▶ |
|:---|---:|
| [レッスン 1: 医療データ セキュリティの概要 - HIPAA、HL7 FHIR、ベトナム法](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-1-tong-quan-bao-mat-du-lieu-y-te-hipaa-hl7-fhir) | [レッスン 3: 健康データの分類 (PHI/ePHI) とリスク評価](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-3-phan-loai-du-lieu-y-te-phi-va-danh-gia-rui-ro) |
<!-- SERIES-NAV:END -->
