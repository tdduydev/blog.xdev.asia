---
id: 019d8a21-c812-70c8-d001-e1f2a3b4c512
title: "Bài 12: IoT Data Pipeline - Ingestion, Processing & Storage"
slug: bai-12-iot-data-pipeline-ingestion-processing-storage
description: >-
  IoT data pipeline architecture. High-throughput ingestion (millions messages/sec). Stream processing: filtering, enrichment, aggregation. Hot/warm/cold storage.
duration_minutes: 120
is_free: true
video_url: null
sort_order: 12
section_title: "Phần 4: Data Processing & Storage"
course:
  id: 019d8a21-c800-7008-d001-e1f2a3b4c5d6
  title: "Kiến trúc Real-time & IoT Platform"
  slug: kien-truc-real-time-iot-platform
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-6891" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-6891)"/>

  <!-- Decorations -->
  <g>
    <circle cx="622" cy="76" r="20" fill="#f87171" opacity="0.11"/>
    <circle cx="644" cy="178" r="26" fill="#f87171" opacity="0.07"/>
    <circle cx="666" cy="280" r="32" fill="#f87171" opacity="0.13"/>
    <circle cx="688" cy="122" r="8" fill="#f87171" opacity="0.09"/>
    <circle cx="710" cy="224" r="14" fill="#f87171" opacity="0.05"/>
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
    <line x1="600" y1="156" x2="1100" y2="236" stroke="#f87171" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="186" x2="1050" y2="256" stroke="#f87171" stroke-width="0.5" opacity="0.08"/>
    <polygon points="932.8467875173176,90.5 932.8467875173176,121.5 906,137 879.1532124826824,121.5 879.1532124826824,90.50000000000001 906,75" fill="none" stroke="#f87171" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#f87171"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#f87171" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f87171">🏗️ Kiến trúc — Bài 12</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 12: IoT Data Pipeline - Ingestion,</tspan>
      <tspan x="60" dy="42">Processing &amp; Storage</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Kiến trúc Real-time &amp; IoT Platform</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 4: Data Processing &amp; Storage</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Bài 12: IoT Data Pipeline - Ingestion, Processing & Storage](/storage/uploads/2026/03/iot-bai-12-diagram.webp)

## Giới thiệu

IoT data pipeline architecture. High-throughput ingestion (millions messages/sec). Stream processing: filtering, enrichment, aggregation. Hot/warm/cold storage.

---

## 1. IoT data pipeline architecture

### 1.1 Khái niệm cơ bản

IoT data pipeline architecture là một trong những chủ đề quan trọng nhất trong lĩnh vực này. Hiểu rõ các concepts cốt lõi sẽ giúp bạn thiết kế hệ thống đúng đắn ngay từ đầu.

```
Key Concepts:
├── Concept 1: Nền tảng lý thuyết
├── Concept 2: Áp dụng thực tế
├── Concept 3: Best practices
└── Concept 4: Anti-patterns cần tránh
```

### 1.2 Tại sao quan trọng?

| Khía cạnh | Không áp dụng | Áp dụng đúng |
|-----------|---------------|---------------|
| **Performance** | Bottlenecks, latency cao | Optimized, scalable |
| **Reliability** | Single point of failure | Fault-tolerant |
| **Maintainability** | Technical debt tích lũy | Clean architecture |
| **Security** | Vulnerable | Defense in depth |

---

## 2. High-throughput ingestion (millions messages/sec)

### 2.1 Kiến trúc tổng quan

```
┌─────────────────────────────────────────────────────┐
│                  SYSTEM ARCHITECTURE                 │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │  Client   │  │  API     │  │  Core Service    │  │
│  │  Layer    │──│  Gateway │──│  Layer           │  │
│  └──────────┘  └──────────┘  └──────────────────┘  │
│                                      │               │
│                               ┌──────▼──────┐       │
│                               │  Data Layer │       │
│                               └─────────────┘       │
└─────────────────────────────────────────────────────┘
```

### 2.2 Component Design

Mỗi component trong hệ thống cần được thiết kế với các nguyên tắc:

- **Single Responsibility**: Mỗi component chỉ đảm nhiệm một trách nhiệm
- **Loose Coupling**: Giảm thiểu dependency giữa các components
- **High Cohesion**: Các elements liên quan nằm cùng một component
- **Interface Segregation**: API rõ ràng, tách biệt

---

## 3. Stream processing: filtering, enrichment, aggregation

### 3.1 Design Patterns áp dụng

```
Applied Patterns:
├── Strategy Pattern: Cho phép thay đổi algorithm at runtime
├── Observer Pattern: Event notification mechanism
├── Repository Pattern: Data access abstraction
└── Factory Pattern: Object creation flexibility
```

### 3.2 Code Example

```java
// Example implementation
public interface Service {
    Result process(Request request);
    boolean supports(RequestType type);
}

@Component
public class CoreService implements Service {

    @Override
    public Result process(Request request) {
        // Validate input
        validator.validate(request);

        // Execute business logic
        var result = businessLogic.execute(request);

        // Publish domain event
        eventBus.publish(new ProcessedEvent(result));

        return result;
    }
}
```

---

## 4. Hot/warm/cold storage.

### 4.1 Monitoring & Observability

```
Observability Stack:
├── Metrics: Prometheus + Grafana
├── Logging: ELK / Loki
├── Tracing: OpenTelemetry + Jaeger
└── Alerting: PagerDuty
```

### 4.2 Performance Optimization

| Metric | Target | Strategy |
|--------|--------|----------|
| Latency p99 | < 100ms | Caching, async processing |
| Throughput | > 10K RPS | Horizontal scaling |
| Availability | 99.99% | Multi-region, failover |
| Error rate | < 0.01% | Circuit breaker, retry |

---

## Tổng kết

Trong bài học này, chúng ta đã tìm hiểu về IoT Data Pipeline - Ingestion, Processing & Storage. Các key takeaways:

- Hiểu rõ concepts cốt lõi và cách áp dụng
- Thiết kế architecture phù hợp với requirements
- Implementation patterns và best practices
- Production considerations: monitoring, performance, security

**Bài tiếp theo**: Chúng ta sẽ tiếp tục với chủ đề tiếp theo trong series.
