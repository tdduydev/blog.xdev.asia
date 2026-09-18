---
id: 019d8a21-ca11-70ca-d001-e1f2a3b4c511
title: 第 11 課：資料庫和中介軟體自助服務
slug: bai-11-database-middleware-self-service
description: 資料庫設定：PostgreSQL、Redis、Kafka 作為自助服務。運營商模式。備份自動化。架構遷移。連線管理。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 11
section_title: 第 3 部分：自助服務基礎設施
course:
  id: 019d8a21-ca00-700a-d001-e1f2a3b4c5d6
  title: 架構平台工程和內部開發者門戶
  slug: kien-truc-platform-engineering-internal-developer-portal
locale: zh-tw
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ 建築 — 第 11 課</text>

  <!-- Title -->
  <text x="60" y="160" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 11 課：資料庫和中介軟體自助服務</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="222" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">架構平台工程和內部開發者門戶</text>

  <!-- Section -->
  <text x="60" y="246" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 3 部分：自助服務基礎設施</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![第 11 課：資料庫和中介軟體自助服務](/storage/uploads/2026/03/pe-bai-11-diagram.webp)

## 簡介

資料庫設定：PostgreSQL、Redis、Kafka 作為自助服務。運營商模式。備份自動化。架構遷移。連線管理。

---

## 1. 資料庫設定：PostgreSQL、Redis、Kafka 作為自助服務

### 1.1 基本概念

資料庫配置：PostgreSQL、Redis、Kafka 作為自助服務是該領域最重要的主題之一。了解核心概念將幫助您從一開始就設計出正確的系統。

```
Key Concepts:
├── Concept 1: Nền tảng lý thuyết
├── Concept 2: Áp dụng thực tế
├── Concept 3: Best practices
└── Concept 4: Anti-patterns cần tránh
```

### 1.2 為什麼它很重要？

|方面|不適用 |正確應用 |
|------------|--------------|---------------|
| **效能** |瓶頸、高延遲 |最佳化、可擴充 |
| **可靠性** |單點故障|容錯|
| **可維護性** |技術債累積 |乾淨的建築物|
| **安全** |弱勢群體 |縱深防禦|

---

## 2. 運算子模式

### 2.1 總體架構

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

### 2.2 元件設計

系統中每個組件的設計都需要遵循以下原則：

- **單一職責**：每個組件僅承擔一項職責
- **鬆散耦合**：最小化組件之間的依賴關係
- **高內聚**：相關元素位於同一組件中
- **介面隔離**：清晰、獨立的 API

---

## 3. 備份自動化

### 3.1 設計模式的應用

```
Applied Patterns:
├── Strategy Pattern: Cho phép thay đổi algorithm at runtime
├── Observer Pattern: Event notification mechanism
├── Repository Pattern: Data access abstraction
└── Factory Pattern: Object creation flexibility
```

### 3.2 程式碼範例

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

## 4.架構遷移

### 4.1 監控與可觀察性

```
Observability Stack:
├── Metrics: Prometheus + Grafana
├── Logging: ELK / Loki
├── Tracing: OpenTelemetry + Jaeger
└── Alerting: PagerDuty
```

### 4.2 效能最佳化

|指標|目標|戰略|
|--------|--------|----------|
|延遲 p99 | < 100ms | Caching, async processing |
| Throughput | > 10K RPS |水平縮放 |
|可用性 | 99.99% |多區域、故障轉移 |
|錯誤率| < 0.01% |斷路器，重試 |

---

## 總結

在本課程中，我們學習了資料庫和中間件自助服務。要點：

- 了解核心概念以及如何應用
- 根據需求設計架構
- 實施模式和最佳實踐
- 生產考量：監控、效能、安全

**下一篇文章**：我們將繼續本系列的下一個主題。
