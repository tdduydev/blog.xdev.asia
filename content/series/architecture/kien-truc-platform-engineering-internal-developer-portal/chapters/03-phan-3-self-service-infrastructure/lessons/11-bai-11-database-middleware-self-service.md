---
id: 019d8a21-ca11-70ca-d001-e1f2a3b4c511
title: "Bài 11: Database & Middleware Self-service"
slug: bai-11-database-middleware-self-service
description: >-
  Database provisioning: PostgreSQL, Redis, Kafka as self-service. Operators pattern. Backup automation. Schema migration. Connection management.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 11
section_title: "Phần 3: Self-service Infrastructure"
course:
  id: 019d8a21-ca00-700a-d001-e1f2a3b4c5d6
  title: "Kiến trúc Platform Engineering & Internal Developer Portal"
  slug: kien-truc-platform-engineering-internal-developer-portal
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-2985" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-2985)"/>

  <!-- Decorations -->
  <g>
    <circle cx="669" cy="177" r="32" fill="#818cf8" opacity="0.12000000000000001"/>
    <circle cx="738" cy="226" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="807" cy="275" r="26" fill="#818cf8" opacity="0.060000000000000005"/>
    <circle cx="876" cy="64" r="23" fill="#818cf8" opacity="0.13"/>
    <circle cx="945" cy="113" r="20" fill="#818cf8" opacity="0.1"/>
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
    <line x1="600" y1="187" x2="1100" y2="267" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="217" x2="1050" y2="287" stroke="#818cf8" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1023.3730669589464,166 1023.3730669589464,208 987,229 950.6269330410536,208 950.6269330410536,166 987,145" fill="none" stroke="#818cf8" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Kiến trúc — Bài 11</text>

  <!-- Title -->
  <text x="60" y="160" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 11: Database &amp; Middleware Self-service</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="222" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Kiến trúc Platform Engineering &amp; Internal Developer Portal</text>

  <!-- Section -->
  <text x="60" y="246" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 3: Self-service Infrastructure</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Bài 11: Database & Middleware Self-service](/storage/uploads/2026/03/pe-bai-11-diagram.webp)

## Giới thiệu

Database provisioning: PostgreSQL, Redis, Kafka as self-service. Operators pattern. Backup automation. Schema migration. Connection management.

---

## 1. Database provisioning: PostgreSQL, Redis, Kafka as self-service

### 1.1 Khái niệm cơ bản

Database provisioning: PostgreSQL, Redis, Kafka as self-service là một trong những chủ đề quan trọng nhất trong lĩnh vực này. Hiểu rõ các concepts cốt lõi sẽ giúp bạn thiết kế hệ thống đúng đắn ngay từ đầu.

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

## 2. Operators pattern

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

## 3. Backup automation

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

## 4. Schema migration

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

Trong bài học này, chúng ta đã tìm hiểu về Database & Middleware Self-service. Các key takeaways:

- Hiểu rõ concepts cốt lõi và cách áp dụng
- Thiết kế architecture phù hợp với requirements
- Implementation patterns và best practices
- Production considerations: monitoring, performance, security

**Bài tiếp theo**: Chúng ta sẽ tiếp tục với chủ đề tiếp theo trong series.
