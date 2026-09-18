---
id: 019e1a40-a118-7001-d001-f0a1b2c30118
title: 第 18 課：集中稽核追蹤 — OpenTelemetry 和 ELK Stack
slug: bai-18-audit-trail-opentelemetry-elk
description: >-
  為醫療保健建立集中式稽核追蹤系統：Quarkus 的 OpenTelemetry 工具、病患資料流的分散式追蹤、具有相關 ID 的結構化日誌記錄、ELK
  Stack（Elasticsearch、Logstash、Kibana）部署、稽核日誌儀表板、可疑存取模式的警報規則以及符合 HIPAA 的日誌保留策略。
duration_minutes: 180
is_free: true
video_url: null
sort_order: 18
section_title: 第 5 部分：合規性、稽核與資料保護
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: 建構微服務醫療保健系統 — Quarkus、PostgreSQL、符合 HIPAA 標準的 Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: zh-tw
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ 建築 — 第 18 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 18 課：集中審計追蹤 —</tspan>
      <tspan x="60" dy="42">OpenTelemetry 和 ELK 堆疊</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">建構微服務醫療保健系統 — Quarkus、PostgreSQL、符合 HIPAA 標準的 Keycloak</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 5 部分：合規性、稽核與資料保護</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 1. 醫療保健集中審計追蹤概述

![Centralized Audit Trail — OpenTelemetry, ELK Stack cho Healthcare Compliance](/storage/uploads/2026/04/healthcare-audit-trail-elk.webp)

在醫療微服務系統中，**一個請求**可以經過許多服務：API網關→病患服務→實驗室服務→通知服務。為了全面審計 PHI 資料流，我們需要一個**集中審計追蹤**—一個記錄和分析病患資料所有活動的集中系統。

### 1.1。審計追蹤架構

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

### 1.2。 HIPAA 審核要求

|請求 | HIPAA 參考 |實施|
|----------|----------------|----------------|
|記錄所有 PHI 存取 | §164.312(b) | OpenTelemetry 跨度 + 結構化日誌 |
|唯一的使用者識別| §164.312(a)(2)(i) |跡線中的相關 ID |
|定期查看審核日誌 | §164.308(a)(1)(ii)(D) | §164.308(a)(1)(ii)(D) Kibana 儀表板 + 計畫報告 |
|偵測安全事件 | §164.308(a)(6)(i) | Elasticsearch 警報 + 異常偵測 |
| 6 年存檔 | §164.530(j)(2) | Elasticsearch ILM 政策 |
|保護稽核日誌 | §164.312(c)(1) |不可變索引、RBAC |

## 2. Quarkus 的 OpenTelemetry 設定

### 2.1。依賴關係

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

### 2.2。開放遙測配置

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

### 2.3。 PHI 存取追蹤的自訂範圍

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

### 2.4。在禮拜中使用 PhiAccessTracer

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

## 3. 使用相關 ID 進行分散式追蹤

### 3.1。關聯 ID 架構

![Distributed Tracing — Patient Data Flow qua API Gateway → Patient Service → DB/Kafka/Lab Service](/storage/uploads/2026/04/healthcare-distributed-tracing-flow.webp)

**追蹤流量：**

- **客戶請求** `X-Request-ID` + `traceparent` 標頭
- **API網關**（span-1）→trace_id、user_id、client_ip
- **病患服務** (span-2) → Patient_id、操作、部門
  - PostgreSQL 查詢 (span-3) — db.statement、db.operation
  - Kafka Publish (span-4) — messages.destination, event_type
  - 實驗室服務 REST 呼叫 (span-5) — http.method、http.url
- **追蹤 ID** 連結流程中的所有跨度

### 3.2。 MDC（映射診斷上下文）集成

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

### 3.3。結構化 JSON 日誌輸出

透過上述配置，每個日誌條目的格式如下：

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

## 4. ELK堆疊部署

### 4.1。 Docker Compose 用於可觀察性堆疊

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

### 4.2。 OpenTelemetry 收集器配置

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

## 5. 醫療保健審計的 Logstash 管道

### 5.1。 Logstash 管道配置

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

## 6.Elasticsearch 索引範本和 ILM

### 6.1。審核日誌的索引模板

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

### 6.2。 ILM 政策 — HIPAA 6 年保留

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

### 6.3。設定腳本

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

## 7. 用於審計視覺化的 Kibana 儀表板

### 7.1。審核儀表板保存的對象

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

### 7.2。關鍵視覺化

**視覺化 1：隨時間變化的 PHI 存取**

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

**視覺化 2：可疑訪問偵測**

Elasticsearch 查詢可疑模式：

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

## 8. 醫療保健警報規則

### 8.1。 Elasticsearch 觀察者警報

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

### 8.2。警報場景

|警報 |觸發器|嚴重性 |行動|
|--------|---------|----------|--------|
|批次 PHI 存取 | 5 分鐘內 >50 筆記錄 |高| Slack + 電子郵件安全團隊 |
|下班後造訪 | PHI 存取 22:00-06:00 |中 |日誌+日報|
|未經授權部門|存取本部門外部 |高| Slack + 稽核審查 |
|緊急通道 |打破玻璃啟動 |關鍵 |立即通知 |
|驗證失敗 Spike | 5 分鐘內失敗超過 10 次 |高| Slack + 帳戶鎖定檢查 |
|匯出/下載 PHI |資料匯出已觸發 |中 |日誌+每週回顧|
|新IP位址|來自未知 IP 的 PHI 存取 |低|日誌+每月回顧|

### 8.3。下班後訪問警報

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

## 9.SIEM 集成

### 9.1。 SIEM架構

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

### 9.2。 Elasticsearch 偵測規則

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

## 10. 日誌保留和合規性

### 10.1。 HIPAA 日誌保留要求

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

### 10.2。保留驗證腳本

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

## 總結

在本課程中，我們為醫療保健微服務建立了完整的**集中審計追蹤**：

1. **OpenTelemetry Instrumentation**：PHI 存取的自訂跨度 (PhiAccessTracer)、自動分散式追蹤、OTLP 匯出
2. **關聯 ID**：MDC 整合 — 每個日誌條目中的trace_id、span_id、request_id、user_id
3. **結構化日誌記錄**：JSON 格式、PHI 屏蔽過濾器、一致的日誌模式
4. **ELK 堆疊部署**：Docker Compose 堆疊與 Elasticsearch、Logstash、Kibana、Jaeger、Prometheus
5. **Logstash Pipeline**：醫療保健特定解析、可疑模式偵測、稽核事件路由
6. **索引模板與ILM**：審計資料的Elasticsearch模板，6年保留政策（熱→溫→冷→刪除）
7. **Kibana 儀表板**：PHI 存取視覺化、部門細分、可疑活動追蹤
8. **警報規則**：大量 PHI 存取、非工作時間存取、未經授權的部門存取、緊急存取通知
9. **SIEM整合**：關聯規則、跨部門檢測、異常檢測架構
10. **保留合規性**：自動驗證腳本、快照管理、刪除審核

## 練習

1. **OpenTelemetry設定**：新增 `quarkus-opentelemetry` 轉到 Quarkus 專案。將 OTLP 匯出器配置到本機 Jaeger (`docker run jaegertracing/all-in-one`）。實現 PhiAccessTracer 並包裝患者 CRUD 操作。使用自訂屬性（user_id、患者_id、操作）驗證 Jaeger UI 中顯示的追蹤。

2. **ELK 堆疊部署**：運行 Docker Compose 可觀察性堆疊。建立 Elasticsearch 索引模板 `healthcare-audit-*`。配置 4 個階段的 ILM 策略（熱/溫/冷/刪除）。驗證 ILM 策略 `GET _ilm/policy/hipaa-retention-policy`。透過 Logstash TCP 輸入發送範例審核事件。

3. **Kibana Dashboard**：將審計索引模式導入 Kibana。建立 3 個視覺化效果：(a) PHI 存取時間線，(b) 按存取計數排名靠前的用戶，(c) 按部門餅圖存取。合併為 1 個儀表板。為可疑模式建立儲存的搜尋。

4. **警報配置**：為大量 PHI 存取警報建立 Elasticsearch 觀察器（5 分鐘內超過 50 筆記錄）。建立非工作時間存取警報（22:00-06:00）。透過 API 發送範例事件進行測試。驗證警報觸發並發送通知（使用 webhook.site 進行測試）。

---

---

<!-- SERIES-NAV:START -->
| ◀ 上一篇 |下一篇文章 ▶ |
|:---|---:|
| [第 17 課：HIPAA 技術保障 - 完整實施清單](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-17-hipaa-technical-safeguards-implementation) | [第 19 課：PHI 的資料脫敏、匿名化與去識別化](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-19-data-masking-anonymization-de-identification) |
<!-- SERIES-NAV:END -->
