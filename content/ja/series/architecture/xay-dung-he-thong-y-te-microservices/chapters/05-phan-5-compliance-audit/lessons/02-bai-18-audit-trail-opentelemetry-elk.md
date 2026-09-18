---
id: 019e1a40-a118-7001-d001-f0a1b2c30118
title: 'レッスン 18: 一元化された監査証跡 — OpenTelemetry と ELK スタック'
slug: bai-18-audit-trail-opentelemetry-elk
description: >-
  ヘルスケア向けの一元的な監査証跡システムを構築します。Quarkus 用の OpenTelemetry インストルメンテーション、患者データ
  フローの分散トレーシング、相関 ID を使用した構造化ロギング、ELK スタック (Elasticsearch、Logstash、Kibana)
  の展開、監査ログ ダッシュボード、不審なアクセス パターンのアラート ルール、HIPAA に準拠したログ保持ポリシー。
duration_minutes: 180
is_free: true
video_url: null
sort_order: 18
section_title: 'パート 5: コンプライアンス、監査、データ保護'
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-1013" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-1013)"/>

  <!-- Decorations -->
  <g>
    <circle cx="958" cy="284" r="36" fill="#fbbf24" opacity="0.09"/>
    <circle cx="816" cy="282" r="20" fill="#fbbf24" opacity="0.13"/>
    <circle cx="674" cy="280" r="34" fill="#fbbf24" opacity="0.07"/>
    <circle cx="1032" cy="278" r="18" fill="#fbbf24" opacity="0.11"/>
    <circle cx="890" cy="276" r="32" fill="#fbbf24" opacity="0.05"/>
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
    <line x1="600" y1="84" x2="1100" y2="164" stroke="#fbbf24" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="114" x2="1050" y2="184" stroke="#fbbf24" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1067.7749907475932,214.5 1067.7749907475932,253.5 1034,273 1000.2250092524068,253.5 1000.2250092524068,214.5 1034,195" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fbbf24"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fbbf24" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ アーキテクチャ — レッスン 18</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 18: 一元化された監査証跡 —</tspan>
      <tspan x="60" dy="42">OpenTelemetry と ELK スタック</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 5: コンプライアンス、監査、データ保護</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. 概要 医療向けの一元的な監査証跡

![Centralized Audit Trail — OpenTelemetry, ELK Stack cho Healthcare Compliance](/storage/uploads/2026/04/healthcare-audit-trail-elk.webp)

医療マイクロサービス システムでは、**リクエスト**は、API ゲートウェイ → 患者サービス → 検査サービス → 通知サービスなど、多くのサービスを通過できます。 PHI データの流れを完全に監査するには、**集中監査証跡**、つまり患者データに関するすべてのアクティビティを記録および分析する集中システムが必要です。

＃＃＃１．１．監査証跡のアーキテクチャ

```
┌─────────────────────────────────────────────────────────────┐
│           Centralized Audit Trail Architecture               │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ Patient  │  │   Lab    │  │ Pharmacy │  │   API    │    │
│  │ Service  │  │ Service  │  │ Service  │  │ Gateway  │    │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘    │
│       │              │              │              │          │
│       ▼              ▼              ▼              ▼          │
│  ┌──────────────────────────────────────────────────────┐    │
│  │           OpenTelemetry Collector                     │    │
│  │   ┌──────────┐  ┌──────────┐  ┌──────────┐          │    │
│  │   │  Traces  │  │   Logs   │  │ Metrics  │          │    │
│  │   └────┬─────┘  └────┬─────┘  └────┬─────┘          │    │
│  └────────┼──────────────┼──────────────┼───────────────┘    │
│           │              │              │                     │
│           ▼              ▼              ▼                     │
│  ┌──────────┐   ┌──────────────┐   ┌──────────┐             │
│  │  Jaeger  │   │ Elasticsearch│   │Prometheus│             │
│  │ (Traces) │   │   (Logs)     │   │(Metrics) │             │
│  └──────────┘   └──────┬───────┘   └──────────┘             │
│                         │                                     │
│                    ┌────▼─────┐                               │
│                    │  Kibana  │                               │
│                    │(Dashboard│                               │
│                    │& Alerts) │                               │
│                    └──────────┘                               │
└─────────────────────────────────────────────────────────────┘
```

＃＃＃１．２． HIPAA 監査要件

|リクエスト | HIPAA リファレンス |実装 |
|----------|----------------|----------------|
|すべての PHI アクセスを記録する | §164.312(b) | OpenTelemetry スパン + 構造化ログ |
|固有のユーザー ID | §164.312(a)(2)(i) |トレース内の相関 ID |
|監査ログを定期的に確認する | §164.308(a)(1)(ii)(D) | Kibana ダッシュボード + スケジュールされたレポート |
|セキュリティ インシデントを検出する | §164.308(a)(6)(i) | Elasticsearch アラート + 異常検出 |
| 6 年間のアーカイブ | §164.530(j)(2) | Elasticsearch ILM ポリシー |
|監査ログを保護する | §164.312(c)(1) |不変インデックス、RBAC |

## 2. Quarkus の OpenTelemetry セットアップ

＃＃＃２．１．依存関係

```xml
<!-- pom.xml - OpenTelemetry cho Quarkus -->
<dependencies>
    <!-- OpenTelemetry extension (traces + metrics + logs) -->
    <dependency>
        <groupId>io.quarkus</groupId>
        <artifactId>quarkus-opentelemetry</artifactId>
    </dependency>

    <!-- OTLP exporter -->
    <dependency>
        <groupId>io.opentelemetry</groupId>
        <artifactId>opentelemetry-exporter-otlp</artifactId>
    </dependency>

    <!-- Logging JSON format -->
    <dependency>
        <groupId>io.quarkus</groupId>
        <artifactId>quarkus-logging-json</artifactId>
    </dependency>
</dependencies>
```

＃＃＃２．２． OpenTelemetry 構成

```properties
# application.properties - OpenTelemetry

# === OpenTelemetry General ===
quarkus.otel.enabled=true
quarkus.otel.service.name=patient-service
quarkus.otel.resource.attributes=\
  service.namespace=healthcare,\
  service.version=${quarkus.application.version},\
  deployment.environment=${ENV:dev},\
  hospital.facility_id=${FACILITY_ID:HOSP-HCM-01}

# === OTLP Exporter ===
quarkus.otel.exporter.otlp.endpoint=http://otel-collector:4317
quarkus.otel.exporter.otlp.protocol=grpc
quarkus.otel.exporter.otlp.timeout=10S

# === Traces ===
quarkus.otel.traces.enabled=true
quarkus.otel.traces.sampler=parentbased_always_on
# Production: sử dụng ratio sampler
# quarkus.otel.traces.sampler=parentbased_traceidratio
# quarkus.otel.traces.sampler.arg=0.1

# === Logs ===
quarkus.otel.logs.enabled=true

# === Metrics ===
quarkus.otel.metrics.enabled=true

# === Propagation ===
quarkus.otel.propagators=tracecontext,baggage

# === JSON Logging ===
quarkus.log.console.json=true
quarkus.log.console.json.additional-field."service".value=patient-service
quarkus.log.console.json.additional-field."environment".value=${ENV:dev}
```

＃＃＃２．３． PHI アクセス追跡のカスタム スパン

```java
package vn.hospital.audit.tracing;

import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.SpanKind;
import io.opentelemetry.api.trace.StatusCode;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.api.common.AttributeKey;
import io.opentelemetry.api.common.Attributes;
import io.opentelemetry.context.Scope;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.jboss.logging.Logger;

/**
 * Custom OpenTelemetry spans cho healthcare audit.
 * Mỗi PHI access tạo một span chứa thông tin audit.
 */
@ApplicationScoped
public class PhiAccessTracer {

    private static final Logger LOG = Logger.getLogger(PhiAccessTracer.class);

    // Custom attribute keys cho healthcare
    private static final AttributeKey<String> ATTR_USER_ID = AttributeKey.stringKey("hipaa.user_id");
    private static final AttributeKey<String> ATTR_USERNAME = AttributeKey.stringKey("hipaa.username");
    private static final AttributeKey<String> ATTR_DEPARTMENT = AttributeKey.stringKey("hipaa.department");
    private static final AttributeKey<String> ATTR_ACTION = AttributeKey.stringKey("hipaa.action");
    private static final AttributeKey<String> ATTR_RESOURCE_TYPE = AttributeKey.stringKey("hipaa.resource_type");
    private static final AttributeKey<String> ATTR_PATIENT_ID = AttributeKey.stringKey("hipaa.patient_id");
    private static final AttributeKey<Boolean> ATTR_EMERGENCY = AttributeKey.booleanKey("hipaa.emergency_access");
    private static final AttributeKey<String> ATTR_REASON = AttributeKey.stringKey("hipaa.access_reason");
    private static final AttributeKey<Long> ATTR_RECORD_COUNT = AttributeKey.longKey("hipaa.record_count");

    @Inject
    Tracer tracer;

    @Inject
    JsonWebToken jwt;

    /**
     * Tạo traced PHI access operation.
     * Sử dụng: phiTracer.traceAccess("READ", "patient", patientId, () -> { ... });
     */
    public <T> T traceAccess(String action, String resourceType,
                              String resourceId, PhiOperation<T> operation) {
        Span span = tracer.spanBuilder("phi.access." + action.toLowerCase())
            .setSpanKind(SpanKind.INTERNAL)
            .setAttribute(ATTR_USER_ID, jwt.getSubject())
            .setAttribute(ATTR_USERNAME, jwt.getClaim("preferred_username"))
            .setAttribute(ATTR_DEPARTMENT, jwt.getClaim("department"))
            .setAttribute(ATTR_ACTION, action)
            .setAttribute(ATTR_RESOURCE_TYPE, resourceType)
            .setAttribute(ATTR_PATIENT_ID, resourceId != null ? resourceId : "N/A")
            .setAttribute(ATTR_EMERGENCY, false)
            .startSpan();

        try (Scope scope = span.makeCurrent()) {
            T result = operation.execute();

            span.setStatus(StatusCode.OK);
            span.addEvent("phi.access.success", Attributes.of(
                AttributeKey.stringKey("result"), "OK"
            ));

            // Structured log với trace context
            LOG.infof("PHI_ACCESS: action=%s resource=%s/%s user=%s department=%s",
                action, resourceType, resourceId,
                jwt.getClaim("preferred_username"),
                jwt.getClaim("department"));

            return result;
        } catch (Exception e) {
            span.setStatus(StatusCode.ERROR, e.getMessage());
            span.recordException(e);
            throw e;
        } finally {
            span.end();
        }
    }

    /**
     * Trace bulk PHI access (e.g., export, report generation).
     */
    public <T> T traceBulkAccess(String action, String resourceType,
                                  int recordCount, String reason,
                                  PhiOperation<T> operation) {
        Span span = tracer.spanBuilder("phi.bulk_access." + action.toLowerCase())
            .setSpanKind(SpanKind.INTERNAL)
            .setAttribute(ATTR_USER_ID, jwt.getSubject())
            .setAttribute(ATTR_USERNAME, jwt.getClaim("preferred_username"))
            .setAttribute(ATTR_ACTION, action)
            .setAttribute(ATTR_RESOURCE_TYPE, resourceType)
            .setAttribute(ATTR_RECORD_COUNT, (long) recordCount)
            .setAttribute(ATTR_REASON, reason)
            .startSpan();

        try (Scope scope = span.makeCurrent()) {
            T result = operation.execute();
            span.setStatus(StatusCode.OK);

            // Alert nếu bulk access lớn
            if (recordCount > 100) {
                span.addEvent("phi.bulk_access.large_volume", Attributes.of(
                    AttributeKey.longKey("record_count"), (long) recordCount,
                    AttributeKey.stringKey("alert_level"), "WARNING"
                ));
                LOG.warnf("BULK_PHI_ACCESS: user=%s records=%d action=%s reason=%s",
                    jwt.getClaim("preferred_username"), recordCount, action, reason);
            }

            return result;
        } catch (Exception e) {
            span.setStatus(StatusCode.ERROR, e.getMessage());
            span.recordException(e);
            throw e;
        } finally {
            span.end();
        }
    }

    @FunctionalInterface
    public interface PhiOperation<T> {
        T execute();
    }
}
```

＃＃＃２．４．サービスで PhiAccessTracer を使用する

```java
package vn.hospital.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import vn.hospital.audit.tracing.PhiAccessTracer;
import vn.hospital.entity.PatientEntity;
import vn.hospital.repository.PatientRepository;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class PatientService {

    @Inject
    PatientRepository patientRepository;

    @Inject
    PhiAccessTracer phiTracer;

    /**
     * Get patient by ID — traced PHI access.
     */
    public PatientEntity getPatient(UUID patientId) {
        return phiTracer.traceAccess("READ", "patient", patientId.toString(), () ->
            patientRepository.findById(patientId)
        );
    }

    /**
     * Search patients — bulk access traced.
     */
    public List<PatientEntity> searchPatients(String department, int limit) {
        return phiTracer.traceBulkAccess(
            "SEARCH", "patient", limit,
            "Department patient listing",
            () -> patientRepository.findByDepartment(department, limit)
        );
    }

    /**
     * Update patient — traced PHI modification.
     */
    public PatientEntity updatePatient(UUID patientId, PatientEntity updated) {
        return phiTracer.traceAccess("UPDATE", "patient", patientId.toString(), () -> {
            PatientEntity existing = patientRepository.findById(patientId);
            existing.setFullName(updated.getFullName());
            existing.setPhoneNumber(updated.getPhoneNumber());
            existing.setEmail(updated.getEmail());
            existing.setAddress(updated.getAddress());
            return patientRepository.save(existing);
        });
    }
}
```

## 3. 相関 ID を使用した分散トレース

＃＃＃３．１．相関 ID アーキテクチャ

![Distributed Tracing — Patient Data Flow qua API Gateway → Patient Service → DB/Kafka/Lab Service](/storage/uploads/2026/04/healthcare-distributed-tracing-flow.webp)

**トレース フロー:**

- **クライアントリクエスト** `X-Request-ID` + `traceparent` ヘッダー
- **API ゲートウェイ** (スパン-1) → track_id、user_id、client_ip
- **患者サービス** (スパン-2) → 患者 ID、アクション、部門
  - PostgreSQL クエリ (スパン-3) — db.statement、db.operation
  - Kafka パブリッシュ (span-4) —messagesing.destination、event_type
  - ラボ サービス REST 呼び出し (スパン-5) — http.method、http.url
- **トレース ID** はフロー内のすべてのスパンをリンクします

＃＃＃３．２． MDC (マップされた診断コンテキスト) の統合

```java
package vn.hospital.audit.logging;

import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.SpanContext;
import jakarta.annotation.Priority;
import jakarta.inject.Inject;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.ext.Provider;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.jboss.logging.MDC;

import java.io.IOException;

/**
 * JAX-RS filter để set MDC fields cho structured logging.
 * Mỗi log entry tự động chứa correlation IDs.
 */
@Provider
@Priority(50)
public class CorrelationIdFilter implements ContainerRequestFilter {

    @Inject
    JsonWebToken jwt;

    @Override
    public void filter(ContainerRequestContext request) throws IOException {
        // Trace context từ OpenTelemetry
        SpanContext spanContext = Span.current().getSpanContext();
        if (spanContext.isValid()) {
            MDC.put("trace_id", spanContext.getTraceId());
            MDC.put("span_id", spanContext.getSpanId());
        }

        // Request ID (từ API Gateway hoặc generate)
        String requestId = request.getHeaderString("X-Request-ID");
        if (requestId == null) {
            requestId = java.util.UUID.randomUUID().toString();
        }
        MDC.put("request_id", requestId);

        // User context
        if (jwt.getSubject() != null) {
            MDC.put("user_id", jwt.getSubject());
            MDC.put("username", jwt.getClaim("preferred_username"));
            MDC.put("department", jwt.getClaim("department"));
        }

        // Client info
        MDC.put("client_ip", request.getHeaderString("X-Forwarded-For"));
        MDC.put("user_agent", request.getHeaderString("User-Agent"));
    }
}
```

＃＃＃３．３．構造化された JSON ログ出力

上記の構成では、各ログ エントリの形式は次のようになります。

```json
{
  "timestamp": "2024-03-15T10:30:45.123Z",
  "level": "INFO",
  "loggerName": "vn.hospital.service.PatientService",
  "message": "PHI_ACCESS: action=READ resource=patient/550e8400 user=dr.nguyen department=cardiology",
  "service": "patient-service",
  "environment": "production",
  "mdc": {
    "trace_id": "abc123def456789012345678901234",
    "span_id": "1234567890abcdef",
    "request_id": "req-2024-03-15-001",
    "user_id": "keycloak-uuid-123",
    "username": "dr.nguyen",
    "department": "cardiology",
    "client_ip": "10.0.1.50"
  }
}
```

## 4. ELK スタックのデプロイメント

＃＃＃４．１．可観測性スタックのための Docker Compose

```yaml
# docker-compose-observability.yml
version: '3.8'

services:
  # === OpenTelemetry Collector ===
  otel-collector:
    image: otel/opentelemetry-collector-contrib:0.96.0
    container_name: otel-collector
    command: ["--config=/etc/otelcol/config.yaml"]
    volumes:
      - ./config/otel-collector.yaml:/etc/otelcol/config.yaml
    ports:
      - "4317:4317"   # OTLP gRPC
      - "4318:4318"   # OTLP HTTP
      - "8888:8888"   # Metrics
    depends_on:
      - elasticsearch
      - jaeger

  # === Elasticsearch ===
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.12.2
    container_name: elasticsearch
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=true
      - xpack.security.http.ssl.enabled=false
      - ELASTIC_PASSWORD=${ELASTIC_PASSWORD:-changeme}
      - "ES_JAVA_OPTS=-Xms2g -Xmx2g"
      - xpack.license.self_generated.type=basic
    volumes:
      - es_data:/usr/share/elasticsearch/data
    ports:
      - "9200:9200"
    healthcheck:
      test: ["CMD-SHELL",
        "curl -s -u elastic:${ELASTIC_PASSWORD:-changeme} http://localhost:9200/_cluster/health | grep -q '\"status\":\"green\\|yellow\"'"]
      interval: 30s
      timeout: 10s
      retries: 5
    ulimits:
      memlock:
        soft: -1
        hard: -1

  # === Logstash ===
  logstash:
    image: docker.elastic.co/logstash/logstash:8.12.2
    container_name: logstash
    volumes:
      - ./config/logstash/pipeline:/usr/share/logstash/pipeline
      - ./config/logstash/logstash.yml:/usr/share/logstash/config/logstash.yml
    environment:
      - ELASTIC_PASSWORD=${ELASTIC_PASSWORD:-changeme}
      - "LS_JAVA_OPTS=-Xms1g -Xmx1g"
    ports:
      - "5044:5044"   # Beats
      - "5000:5000"   # TCP/JSON
    depends_on:
      elasticsearch:
        condition: service_healthy

  # === Kibana ===
  kibana:
    image: docker.elastic.co/kibana/kibana:8.12.2
    container_name: kibana
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
      - ELASTICSEARCH_USERNAME=elastic
      - ELASTICSEARCH_PASSWORD=${ELASTIC_PASSWORD:-changeme}
    ports:
      - "5601:5601"
    depends_on:
      elasticsearch:
        condition: service_healthy

  # === Jaeger (Distributed Tracing) ===
  jaeger:
    image: jaegertracing/all-in-one:1.54
    container_name: jaeger
    environment:
      - COLLECTOR_OTLP_ENABLED=true
      - SPAN_STORAGE_TYPE=elasticsearch
      - ES_SERVER_URLS=http://elasticsearch:9200
      - ES_USERNAME=elastic
      - ES_PASSWORD=${ELASTIC_PASSWORD:-changeme}
    ports:
      - "16686:16686"  # Jaeger UI
      - "14250:14250"  # gRPC
    depends_on:
      elasticsearch:
        condition: service_healthy

  # === Prometheus (Metrics) ===
  prometheus:
    image: prom/prometheus:v2.50.1
    container_name: prometheus
    volumes:
      - ./config/prometheus.yml:/etc/prometheus/prometheus.yml
      - prom_data:/prometheus
    ports:
      - "9090:9090"

  # === Grafana (Metrics Dashboards) ===
  grafana:
    image: grafana/grafana:10.3.3
    container_name: grafana
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD:-admin}
    volumes:
      - grafana_data:/var/lib/grafana
    ports:
      - "3000:3000"
    depends_on:
      - prometheus

volumes:
  es_data:
    driver: local
  prom_data:
    driver: local
  grafana_data:
    driver: local
```

＃＃＃４．２． OpenTelemetry コレクターの構成

```yaml
# config/otel-collector.yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318

processors:
  batch:
    send_batch_size: 1000
    timeout: 10s

  # Thêm resource attributes
  resource:
    attributes:
      - key: deployment.environment
        value: production
        action: upsert

  # Filter sensitive data từ spans
  attributes:
    actions:
      # KHÔNG log PHI data trong traces
      - key: http.request.body
        action: delete
      - key: http.response.body
        action: delete
      - key: db.statement
        action: hash  # Hash SQL queries thay vì log plaintext

  # Memory limiter
  memory_limiter:
    check_interval: 5s
    limit_mib: 512
    spike_limit_mib: 128

exporters:
  # Traces -> Jaeger
  otlp/jaeger:
    endpoint: jaeger:4317
    tls:
      insecure: true

  # Logs -> Elasticsearch
  elasticsearch/logs:
    endpoints: ["http://elasticsearch:9200"]
    auth:
      authenticator: basicauth/es
    logs_index: healthcare-audit-logs
    sending_queue:
      enabled: true
      num_consumers: 10
      queue_size: 5000

  # Metrics -> Prometheus
  prometheus:
    endpoint: 0.0.0.0:8889

  # Debug (dev only)
  debug:
    verbosity: basic

extensions:
  basicauth/es:
    client_auth:
      username: elastic
      password: ${ELASTIC_PASSWORD}

service:
  extensions: [basicauth/es]
  pipelines:
    traces:
      receivers: [otlp]
      processors: [memory_limiter, batch, attributes]
      exporters: [otlp/jaeger]

    logs:
      receivers: [otlp]
      processors: [memory_limiter, batch]
      exporters: [elasticsearch/logs]

    metrics:
      receivers: [otlp]
      processors: [memory_limiter, batch]
      exporters: [prometheus]
```

## 5. 医療監査用の Logstash パイプライン

＃＃＃５．１． Logstash パイプライン構成

```ruby
# config/logstash/pipeline/healthcare-audit.conf

input {
  # Nhận logs từ Filebeat hoặc TCP
  beats {
    port => 5044
  }

  tcp {
    port => 5000
    codec => json_lines
  }
}

filter {
  # === Parse JSON log ===
  if [message] =~ /^\{/ {
    json {
      source => "message"
      target => "parsed"
    }
  }

  # === Extract audit fields ===
  if [parsed][message] =~ /^PHI_ACCESS/ {
    mutate {
      add_field => { "event_type" => "phi_access" }
    }

    # Parse PHI_ACCESS log format
    grok {
      match => {
        "[parsed][message]" => "PHI_ACCESS: action=%{WORD:audit_action} resource=%{DATA:resource_type}/%{DATA:resource_id} user=%{DATA:audit_user} department=%{GREEDYDATA:audit_department}"
      }
    }
  }

  if [parsed][message] =~ /^BULK_PHI_ACCESS/ {
    mutate {
      add_field => { "event_type" => "bulk_phi_access" }
      add_tag => ["high_priority"]
    }
  }

  if [parsed][message] =~ /^EMERGENCY ACCESS/ {
    mutate {
      add_field => { "event_type" => "emergency_access" }
      add_tag => ["critical", "emergency"]
    }
  }

  # === Extract MDC fields ===
  if [parsed][mdc] {
    mutate {
      add_field => {
        "trace_id" => "%{[parsed][mdc][trace_id]}"
        "span_id" => "%{[parsed][mdc][span_id]}"
        "request_id" => "%{[parsed][mdc][request_id]}"
        "user_id" => "%{[parsed][mdc][user_id]}"
        "username" => "%{[parsed][mdc][username]}"
        "department" => "%{[parsed][mdc][department]}"
        "client_ip" => "%{[parsed][mdc][client_ip]}"
      }
    }
  }

  # === GeoIP cho client IP ===
  if [client_ip] and [client_ip] != "" {
    geoip {
      source => "client_ip"
      target => "client_geo"
    }
  }

  # === Detect suspicious patterns ===
  # After-hours access (ngoài 6:00-22:00)
  ruby {
    code => '
      timestamp = event.get("@timestamp")
      if timestamp
        hour = timestamp.hour
        if hour < 6 || hour > 22
          event.set("suspicious_pattern", "after_hours_access")
          tags = event.get("tags") || []
          tags << "suspicious"
          event.set("tags", tags)
        end
      end
    '
  }

  # === PHI Data Masking ===
  # Đảm bảo không có PHI trong logs
  mutate {
    gsub => [
      "[parsed][message]", "\b\d{3}-?\d{2}-?\d{4}\b", "***-**-****",
      "[parsed][message]", "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", "***@***.***"
    ]
  }

  # === Cleanup ===
  mutate {
    remove_field => ["[parsed][stackTrace]", "host", "agent"]
  }
}

output {
  # === Route to different indices ===
  if "emergency" in [tags] {
    elasticsearch {
      hosts => ["http://elasticsearch:9200"]
      user => "elastic"
      password => "${ELASTIC_PASSWORD}"
      index => "healthcare-emergency-%{+YYYY.MM}"
      action => "create"  # Append-only (no updates)
    }
  } else if [event_type] == "phi_access" or [event_type] == "bulk_phi_access" {
    elasticsearch {
      hosts => ["http://elasticsearch:9200"]
      user => "elastic"
      password => "${ELASTIC_PASSWORD}"
      index => "healthcare-audit-%{+YYYY.MM}"
      action => "create"
    }
  } else {
    elasticsearch {
      hosts => ["http://elasticsearch:9200"]
      user => "elastic"
      password => "${ELASTIC_PASSWORD}"
      index => "healthcare-app-%{+YYYY.MM}"
    }
  }

  # Debug output (dev only)
  # stdout { codec => rubydebug }
}
```

## 6. Elasticsearch インデックス テンプレートと ILM

＃＃＃６．１．監査ログのインデックス テンプレート

```json
{
  "index_patterns": ["healthcare-audit-*"],
  "template": {
    "settings": {
      "number_of_shards": 2,
      "number_of_replicas": 1,
      "index.lifecycle.name": "hipaa-retention-policy",
      "index.lifecycle.rollover_alias": "healthcare-audit",
      "index.mapping.total_fields.limit": 2000,
      "index.blocks.read_only_allow_delete": false
    },
    "mappings": {
      "properties": {
        "@timestamp": { "type": "date" },
        "event_type": { "type": "keyword" },
        "trace_id": { "type": "keyword" },
        "span_id": { "type": "keyword" },
        "request_id": { "type": "keyword" },

        "user_id": { "type": "keyword" },
        "username": { "type": "keyword" },
        "department": { "type": "keyword" },

        "audit_action": { "type": "keyword" },
        "resource_type": { "type": "keyword" },
        "resource_id": { "type": "keyword" },

        "client_ip": { "type": "ip" },
        "user_agent": { "type": "text" },
        "service_name": { "type": "keyword" },

        "suspicious_pattern": { "type": "keyword" },

        "client_geo": {
          "properties": {
            "city_name": { "type": "keyword" },
            "country_name": { "type": "keyword" },
            "location": { "type": "geo_point" }
          }
        },

        "parsed": {
          "properties": {
            "level": { "type": "keyword" },
            "loggerName": { "type": "keyword" },
            "message": { "type": "text" }
          }
        }
      }
    }
  },
  "priority": 200,
  "composed_of": [],
  "version": 1,
  "_meta": {
    "description": "HIPAA compliant audit log index template",
    "retention": "6 years per §164.530(j)(2)"
  }
}
```

＃＃＃６．２． ILM ポリシー — HIPAA 6 年間の保持

```json
{
  "policy": {
    "phases": {
      "hot": {
        "min_age": "0ms",
        "actions": {
          "rollover": {
            "max_primary_shard_size": "25gb",
            "max_age": "30d"
          },
          "set_priority": {
            "priority": 100
          }
        }
      },
      "warm": {
        "min_age": "90d",
        "actions": {
          "shrink": {
            "number_of_shards": 1
          },
          "forcemerge": {
            "max_num_segments": 1
          },
          "readonly": {},
          "set_priority": {
            "priority": 50
          }
        }
      },
      "cold": {
        "min_age": "365d",
        "actions": {
          "searchable_snapshot": {
            "snapshot_repository": "healthcare-audit-snapshots"
          },
          "set_priority": {
            "priority": 0
          }
        }
      },
      "delete": {
        "min_age": "2190d",
        "actions": {
          "wait_for_snapshot": {
            "policy": "healthcare-daily-snapshots"
          },
          "delete": {}
        }
      }
    },
    "_meta": {
      "description": "HIPAA requires 6 years (2190 days) retention for audit logs",
      "hipaa_reference": "§164.530(j)(2)"
    }
  }
}
```

＃＃＃６．３．セットアップスクリプト

```bash
#!/bin/bash
# setup-elasticsearch.sh
# Khởi tạo Elasticsearch indices, templates, và ILM policies

set -euo pipefail

ES_URL="${ES_URL:-http://localhost:9200}"
ES_USER="${ES_USER:-elastic}"
ES_PASS="${ES_PASS:-changeme}"
AUTH="-u ${ES_USER}:${ES_PASS}"

echo "=== Setting up Elasticsearch for Healthcare Audit ==="

# 1. Create ILM Policy
echo "Creating ILM policy..."
curl -s -X PUT "${ES_URL}/_ilm/policy/hipaa-retention-policy" \
  $AUTH -H 'Content-Type: application/json' \
  -d @config/elasticsearch/ilm-policy.json

# 2. Create Index Template
echo "Creating index template..."
curl -s -X PUT "${ES_URL}/_index_template/healthcare-audit-template" \
  $AUTH -H 'Content-Type: application/json' \
  -d @config/elasticsearch/audit-index-template.json

# 3. Create initial index with alias
echo "Creating initial audit index..."
curl -s -X PUT "${ES_URL}/healthcare-audit-000001" \
  $AUTH -H 'Content-Type: application/json' \
  -d '{
    "aliases": {
      "healthcare-audit": {
        "is_write_index": true
      }
    }
  }'

# 4. Create snapshot repository (cho cold phase)
echo "Creating snapshot repository..."
curl -s -X PUT "${ES_URL}/_snapshot/healthcare-audit-snapshots" \
  $AUTH -H 'Content-Type: application/json' \
  -d '{
    "type": "fs",
    "settings": {
      "location": "/mnt/snapshots/healthcare-audit",
      "compress": true
    }
  }'

# 5. Create RBAC roles
echo "Creating audit reader role..."
curl -s -X PUT "${ES_URL}/_security/role/audit_reader" \
  $AUTH -H 'Content-Type: application/json' \
  -d '{
    "indices": [
      {
        "names": ["healthcare-audit-*"],
        "privileges": ["read", "view_index_metadata"]
      }
    ]
  }'

echo "Creating audit writer role..."
curl -s -X PUT "${ES_URL}/_security/role/audit_writer" \
  $AUTH -H 'Content-Type: application/json' \
  -d '{
    "indices": [
      {
        "names": ["healthcare-audit-*"],
        "privileges": ["create_doc", "create_index", "view_index_metadata"]
      }
    ]
  }'

echo "=== Setup complete ==="
```

## 7. 監査視覚化のための Kibana ダッシュボード

＃＃＃７．１．監査ダッシュボードの保存されたオブジェクト

```json
{
  "objects": [
    {
      "id": "healthcare-audit-dashboard",
      "type": "dashboard",
      "attributes": {
        "title": "Healthcare PHI Access Audit",
        "description": "HIPAA Compliance - PHI Access Monitoring Dashboard",
        "panelsJSON": "[{\"gridData\":{\"x\":0,\"y\":0,\"w\":24,\"h\":8},\"type\":\"lens\",\"title\":\"PHI Access Over Time\"},{\"gridData\":{\"x\":24,\"y\":0,\"w\":24,\"h\":8},\"type\":\"lens\",\"title\":\"Access by Department\"},{\"gridData\":{\"x\":0,\"y\":8,\"w\":16,\"h\":8},\"type\":\"lens\",\"title\":\"Top Users by PHI Access\"},{\"gridData\":{\"x\":16,\"y\":8,\"w\":16,\"h\":8},\"type\":\"lens\",\"title\":\"Suspicious Access Patterns\"},{\"gridData\":{\"x\":32,\"y\":8,\"w\":16,\"h\":8},\"type\":\"lens\",\"title\":\"Emergency Access Events\"},{\"gridData\":{\"x\":0,\"y\":16,\"w\":48,\"h\":12},\"type\":\"lens\",\"title\":\"Audit Log Details\"}]"
      }
    }
  ]
}
```

＃＃＃７．２．主要なビジュアライゼーション

**視覚化 1: 時間の経過に伴う PHI アクセス**

```json
{
  "title": "PHI Access Volume Over Time",
  "visType": "line",
  "params": {
    "index_pattern": "healthcare-audit-*",
    "time_field": "@timestamp",
    "metrics": [
      {
        "type": "count",
        "label": "Total PHI Access"
      }
    ],
    "buckets": [
      {
        "type": "date_histogram",
        "field": "@timestamp",
        "interval": "1h"
      }
    ],
    "split_series": {
      "field": "audit_action",
      "terms": ["READ", "UPDATE", "CREATE", "DELETE"]
    }
  }
}
```

**視覚化 2: 不審なアクセスの検出**

疑わしいパターンに対する Elasticsearch クエリ:

```json
{
  "query": {
    "bool": {
      "should": [
        {
          "term": { "suspicious_pattern": "after_hours_access" }
        },
        {
          "range": {
            "hipaa.record_count": { "gte": 100 }
          }
        },
        {
          "term": { "event_type": "emergency_access" }
        }
      ],
      "minimum_should_match": 1,
      "filter": [
        {
          "range": {
            "@timestamp": { "gte": "now-24h" }
          }
        }
      ]
    }
  },
  "aggs": {
    "by_pattern": {
      "terms": { "field": "suspicious_pattern" }
    },
    "by_user": {
      "terms": {
        "field": "username",
        "size": 10
      }
    }
  }
}
```

## 8. 医療に関する警告ルール

### 8.1。 Elasticsearch ウォッチャー アラート

```json
{
  "trigger": {
    "schedule": { "interval": "5m" }
  },
  "input": {
    "search": {
      "request": {
        "indices": ["healthcare-audit-*"],
        "body": {
          "query": {
            "bool": {
              "must": [
                { "term": { "event_type": "bulk_phi_access" } },
                { "range": { "@timestamp": { "gte": "now-5m" } } }
              ],
              "filter": [
                { "range": { "hipaa.record_count": { "gte": 50 } } }
              ]
            }
          },
          "aggs": {
            "by_user": {
              "terms": { "field": "username", "size": 5 },
              "aggs": {
                "total_records": {
                  "sum": { "field": "hipaa.record_count" }
                }
              }
            }
          }
        }
      }
    }
  },
  "condition": {
    "compare": {
      "ctx.payload.hits.total.value": { "gte": 1 }
    }
  },
  "actions": {
    "notify_security": {
      "webhook": {
        "method": "POST",
        "url": "https://hooks.slack.com/services/xxx/yyy/zzz",
        "headers": { "Content-Type": "application/json" },
        "body": "{\"text\": \"HIPAA ALERT: Bulk PHI access detected. {{ctx.payload.hits.total.value}} events in last 5 minutes. Check Kibana dashboard.\"}"
      }
    },
    "log_alert": {
      "logging": {
        "text": "HIPAA ALERT: Bulk PHI access - {{ctx.payload.hits.total.value}} events"
      }
    }
  }
}
```

### 8.2。アラートのシナリオ

|警告 |トリガー |重大度 |アクション |
|----------|-----------|----------|----------|
|バルク PHI アクセス | 5 分で 50 件を超えるレコード |高い | Slack + 電子メール セキュリティ チーム |
|時間外アクセス | PHI アクセス 22:00-06:00 |中 |ログ＋日報 |
|権限のない部門 |自部門外へのアクセス |高い | Slack + 監査のレビュー |
|緊急アクセス |ガラス割りが有効になりました |クリティカル |即時通知 |
|認証スパイクの失敗 | 5 分間で 10 回を超える失敗 |高い | Slack + アカウントロックアウトチェック |
| PHI のエクスポート/ダウンロード |データ エクスポートがトリガーされました |中 |ログ + 週次レビュー |
|新しい IP アドレス |不明な IP からの PHI アクセス |低い |ログ+月次レビュー |

### 8.3。時間外アクセス警告

```json
{
  "trigger": {
    "schedule": { "interval": "10m" }
  },
  "input": {
    "search": {
      "request": {
        "indices": ["healthcare-audit-*"],
        "body": {
          "query": {
            "bool": {
              "must": [
                { "exists": { "field": "audit_action" } },
                { "range": { "@timestamp": { "gte": "now-10m" } } },
                { "term": { "suspicious_pattern": "after_hours_access" } }
              ]
            }
          }
        }
      }
    }
  },
  "condition": {
    "compare": {
      "ctx.payload.hits.total.value": { "gte": 1 }
    }
  },
  "actions": {
    "log_after_hours": {
      "logging": {
        "text": "AFTER-HOURS PHI ACCESS: {{ctx.payload.hits.total.value}} events detected"
      }
    }
  }
}
```

## 9. SIEM の統合

＃＃＃９．１． SIEM アーキテクチャ

```
┌─────────────────────────────────────────────────────────────┐
│              SIEM Integration Architecture                    │
│                                                              │
│  Healthcare Microservices                                     │
│    │                                                         │
│    ├── Application Logs ──► Logstash ──► Elasticsearch       │
│    ├── Audit Events ─────► Logstash ──► Elasticsearch        │
│    ├── Network Logs ─────► Logstash ──► Elasticsearch        │
│    └── Security Events ──► Logstash ──► Elasticsearch        │
│                                              │               │
│                                              ▼               │
│                                    ┌──────────────────┐      │
│                                    │   SIEM Platform   │      │
│                                    │  (Elastic SIEM /  │      │
│                                    │   Splunk / QRadar)│      │
│                                    └────────┬─────────┘      │
│                                             │                │
│                              ┌──────────────┼──────────┐     │
│                              ▼              ▼          ▼     │
│                         Correlation    Anomaly     Incident  │
│                         Rules         Detection   Response   │
│                                                              │
│  Example Correlation Rules:                                  │
│    IF user.department != resource.department                 │
│       AND action = "READ"                                    │
│       AND resource_type = "patient"                          │
│    THEN alert("Cross-Department PHI Access")                 │
│                                                              │
│    IF count(action="LOGIN_FAILED") > 5 within 5min          │
│       AND THEN action = "LOGIN" success                      │
│    THEN alert("Possible Brute Force + Compromise")           │
└─────────────────────────────────────────────────────────────┘
```

＃＃＃９．２． Elasticsearch 検出ルール

```json
{
  "name": "Cross-Department PHI Access",
  "description": "Detects when a user accesses patient data outside their department",
  "rule_id": "hipaa-cross-dept-001",
  "severity": "high",
  "type": "query",
  "index": ["healthcare-audit-*"],
  "query": "event_type:phi_access AND NOT (department:audit_department)",
  "interval": "5m",
  "actions": [
    {
      "action_type_id": ".slack",
      "params": {
        "message": "Cross-department PHI access detected: {{context.rule.name}}"
      }
    }
  ]
}
```

## 10. ログの保存とコンプライアンス

### 10.1。 HIPAA ログ保存要件

```
┌─────────────────────────────────────────────────────────────┐
│         Log Retention Timeline (HIPAA §164.530(j)(2))        │
│                                                              │
│  Year 0-1 (HOT):                                            │
│    └── Full searchable indices on SSD                        │
│    └── Real-time queries, dashboards, alerts                 │
│    └── Primary + 1 replica                                   │
│                                                              │
│  Year 1-3 (WARM):                                            │
│    └── Force-merged, read-only indices on HDD                │
│    └── Slower queries but still searchable                   │
│    └── Shrunk to 1 shard                                     │
│                                                              │
│  Year 3-6 (COLD):                                            │
│    └── Searchable snapshots (S3/GCS/Azure Blob)              │
│    └── Restored on-demand for investigations                 │
│    └── Minimal storage cost                                  │
│                                                              │
│  Year 6+ (DELETE):                                           │
│    └── Verified snapshot exists                               │
│    └── Safe deletion after final audit check                 │
│    └── Deletion itself is audited                            │
└─────────────────────────────────────────────────────────────┘
```

### 10.2。保持検証スクリプト

```bash
#!/bin/bash
# verify-log-retention.sh
# Verify HIPAA log retention compliance

ES_URL="${ES_URL:-http://localhost:9200}"
AUTH="-u elastic:${ELASTIC_PASSWORD}"

echo "=== HIPAA Log Retention Verification ==="
echo "Date: $(date -u +"%Y-%m-%dT%H:%M:%SZ")"

# Check oldest audit log
OLDEST=$(curl -s $AUTH "${ES_URL}/healthcare-audit-*/_search" \
  -H 'Content-Type: application/json' \
  -d '{"size":1,"sort":[{"@timestamp":"asc"}],"_source":["@timestamp"]}' \
  | jq -r '.hits.hits[0]._source["@timestamp"]' 2>/dev/null)

echo "Oldest audit log: $OLDEST"

# Check ILM policy
ILM_STATUS=$(curl -s $AUTH "${ES_URL}/_ilm/policy/hipaa-retention-policy" \
  | jq -r '.hipaa-retention-policy.policy.phases.delete.min_age' 2>/dev/null)

echo "Delete phase min_age: $ILM_STATUS"

# Check total audit entries
TOTAL=$(curl -s $AUTH "${ES_URL}/healthcare-audit-*/_count" \
  | jq -r '.count' 2>/dev/null)

echo "Total audit entries: $TOTAL"

# Check snapshot repository
SNAPSHOTS=$(curl -s $AUTH "${ES_URL}/_snapshot/healthcare-audit-snapshots/_all" \
  | jq '.snapshots | length' 2>/dev/null)

echo "Total snapshots: $SNAPSHOTS"

# Verify no premature deletions
SIX_YEARS_AGO=$(date -u -v-2190d +"%Y-%m-%dT%H:%M:%SZ" 2>/dev/null \
  || date -u -d "2190 days ago" +"%Y-%m-%dT%H:%M:%SZ")

ENTRIES_BEFORE=$(curl -s $AUTH "${ES_URL}/healthcare-audit-*/_count" \
  -H 'Content-Type: application/json' \
  -d "{\"query\":{\"range\":{\"@timestamp\":{\"lt\":\"$SIX_YEARS_AGO\"}}}}" \
  | jq -r '.count' 2>/dev/null)

if [ "$ENTRIES_BEFORE" = "0" ]; then
    echo "[PASS] No audit entries older than 6 years (correctly deleted)"
else
    echo "[INFO] $ENTRIES_BEFORE entries older than 6 years (review retention)"
fi

echo "=== Verification complete ==="
```

## 概要

このレッスンでは、医療マイクロサービス向けの完全な **集中監査証跡** を構築しました。

1. **OpenTelemetry Instrumentation**: PHI アクセス用のカスタム スパン (PhiAccessTracer)、自動分散トレーシング、OTLP エクスポート
2. **相関 ID**: MDC 統合 - すべてのログ エントリの Trace_id、span_id、request_id、user_id
3. **構造化ログ**: JSON 形式、PHI マスキング フィルター、一貫したログ スキーマ
4. **ELK スタックのデプロイメント**: Elasticsearch、Logstash、Kibana、Jaeger、Prometheus を使用した Docker Compose スタック
5. **Logstash パイプライン**: 医療固有の解析、疑わしいパターンの検出、監査イベントのルーティング
6. **インデックス テンプレートと ILM**: 監査データ用の Elasticsearch テンプレート、6 年間の保持ポリシー (ホット→ウォーム→コールド→削除)
7. **Kibana ダッシュボード**: PHI アクセスの視覚化、部門の内訳、不審なアクティビティの追跡
8. **アラート ルール**: 一括 PHI アクセス、時間外アクセス、不正な部門アクセス、緊急アクセス通知
9. **SIEM 統合**: 相関ルール、部門間の検出、異常検出アーキテクチャ
10. **保持コンプライアンス**: 自動検証スクリプト、スナップショット管理、削除監査

## 演習

1. **OpenTelemetry セットアップ**: 追加 `quarkus-opentelemetry` Quarkus プロジェクトに移動します。 OTLPエクスポータをローカルJaegerに設定します(`docker run jaegertracing/all-in-one`）。 PhiAccessTracer を実装し、Patient CRUD 操作をラップします。カスタム属性 (user_id、patient_id、action) を使用して、Jaeger UI にトレースが表示されることを確認します。

2. **ELK スタックのデプロイメント**: Docker Compose 可観測性スタックを実行します。 Elasticsearch インデックス テンプレートを作成する `healthcare-audit-*`。 ILM ポリシーを 4 フェーズ (ホット/ウォーム/コールド/削除) で構成します。 ILM ポリシーを検証する `GET _ilm/policy/hipaa-retention-policy`。 Logstash TCP 入力経由でサンプル監査イベントを送信します。

3. **Kibana ダッシュボード**: 監査インデックス パターンを Kibana にインポートします。 3 つの視覚化を作成します: (a) PHI アクセス タイムライン、(b) アクセス数別の上位ユーザー、(c) 部門別のアクセス円グラフ。 1 つのダッシュボードに結合します。疑わしいパターンの保存済み検索を作成します。

4. **アラート設定**: 一括 PHI アクセス アラート (5 分で 50 レコードを超える) 用の Elasticsearch Watcher を作成します。時間外アクセス アラート (22:00 ～ 06:00) を作成します。 API 経由でサンプル イベントを送信してテストします。アラートが発生し、通知が送信されることを確認します (テストには webhook.site を使用します)。

---

---

<!-- SERIES-NAV:START -->
| ◀ 前の記事 |次の記事 ▶ |
|:---|---:|
| [レッスン 17: HIPAA 技術的保護措置 - 完全な実装チェックリスト](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-17-hipaa-technical-safeguards-implementation) | [レッスン 19: PHI のデータマスキング、匿名化、匿名化](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-19-data-masking-anonymization-de-identification) |
<!-- SERIES-NAV:END -->
