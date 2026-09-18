---
id: 019d8a21-c614-70c6-d001-e1f2a3b4c514
title: 'Lesson 14: Notification & Communication Engine'
slug: bai-14-notification-communication-engine
description: >-
  Multi-channel notification: email, push, in-app, SMS, Slack. Template engine.
  Preference management. Digest/batching. Delivery tracking.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 14
section_title: 'Part 4: Core Platform Features'
course:
  id: 019d8a21-c600-7006-d001-e1f2a3b4c5d6
  title: Multi-tenant SaaS Platform architecture
  slug: kien-truc-multi-tenant-saas-platform
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-775" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-775)"/>

  <!-- Decorations -->
  <g>
    <circle cx="788" cy="34" r="16" fill="#fbbf24" opacity="0.09"/>
    <circle cx="976" cy="122" r="20" fill="#fbbf24" opacity="0.13"/>
    <circle cx="664" cy="210" r="24" fill="#fbbf24" opacity="0.07"/>
    <circle cx="852" cy="38" r="28" fill="#fbbf24" opacity="0.11"/>
    <circle cx="1040" cy="126" r="32" fill="#fbbf24" opacity="0.05"/>
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
    <line x1="600" y1="174" x2="1100" y2="254" stroke="#fbbf24" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="204" x2="1050" y2="274" stroke="#fbbf24" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1049.1147367097487,209.5 1049.1147367097487,238.5 1024,253 998.8852632902513,238.5 998.8852632902513,209.5 1024,195" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fbbf24"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fbbf24" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ Architecture — Lesson 14</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 14: Notification & Communication</tspan>
      <tspan x="60" dy="42">Engine</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Multi-tenant SaaS Platform architecture</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 4: Core Platform Features</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Lesson 14: Notification & Communication Engine](/storage/uploads/2026/03/saas-bai-14-diagram.webp)

## Introduction

Multi-channel notification: email, push, in-app, SMS, Slack. Template engine. Preference management. Digest/batching. Delivery tracking.

---

## 1. Multi-channel notification: email, push, in-app, SMS, Slack

### 1.1 Basic concepts

Multi-channel notification: email, push, in-app, SMS, Slack is one of the most important topics in this field. Understanding the core concepts will help you design the right system from the beginning.

```
Key Concepts:
├── Concept 1: Nền tảng lý thuyết
├── Concept 2: Áp dụng thực tế
├── Concept 3: Best practices
└── Concept 4: Anti-patterns cần tránh
```

### 1.2 Why is it important?

| Aspect | Not applicable | Correct application |
|-----------|---------------|---------------|
| **Performance** | Bottlenecks, high latency | Optimized, scalable |
| **Reliability** | Single point of failure | Fault-tolerant |
| **Maintainability** | Technical debt accumulated | Clean architecture |
| **Security** | Vulnerable | Defense in depth |

---

## 2. Template engine

### 2.1 General architecture

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

Each component in the system needs to be designed with the following principles:

- **Single Responsibility**: Each component only takes on one responsibility
- **Loose Coupling**: Minimize dependencies between components
- **High Cohesion**: Related elements are in the same component
- **Interface Segregation**: Clear, separate API

---

## 3. Preference management

### 3.1 Design Patterns applied

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

## 4. Digest/batching

### 4.1 Monitoring & Observability

```
Observability Stack:
├── Metrics: Prometheus + Grafana
├── Logging: ELK / Loki
├── Tracing: OpenTelemetry + Jaeger
└── Alerting: PagerDuty
```

### 4.2 Performance Optimization

| Metrics | Target | Strategy |
|--------|--------|----------|
| Latency p99 | < 100ms | Caching, async processing |
| Throughput | > 10K RPS | Horizontal scaling |
| Availability | 99.99% | Multi-region, failover |
| Error rate | < 0.01% | Circuit breaker, retry |

---

## Summary

In this lesson, we learned about Notification & Communication Engine. Key takeaways:

- Understand core concepts and how to apply
- Design architecture in accordance with requirements
- Implementation patterns and best practices
- Production considerations: monitoring, performance, security

**Next article**: We will continue with the next topic in the series.
