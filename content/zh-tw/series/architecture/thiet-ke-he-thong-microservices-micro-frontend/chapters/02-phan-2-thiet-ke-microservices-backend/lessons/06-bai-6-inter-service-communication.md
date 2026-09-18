---
id: 019e4a33-d406-7b20-c001-b1c2d3e4f506
title: 第 6 課：服務間通訊 — 同步、非同步與事件驅動
slug: bai-6-inter-service-communication-sync-async-event-driven
description: >-
  同步（HTTP、gRPC）與非同步（訊息佇列、事件流）通訊。請求-回覆、發布-訂閱、事件通知模式。何時使用
  RabbitMQ、Kafka、NATS。避免分發整體反模式。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 6
section_title: 第 2 部分：設計微服務後端
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: 微服務與微前端系統設計－從基礎到生產
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-791" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-791)"/>

  <!-- Decorations -->
  <g>
    <circle cx="688" cy="174" r="36" fill="#fbbf24" opacity="0.09"/>
    <circle cx="776" cy="222" r="20" fill="#fbbf24" opacity="0.13"/>
    <circle cx="864" cy="270" r="34" fill="#fbbf24" opacity="0.07"/>
    <circle cx="952" cy="58" r="18" fill="#fbbf24" opacity="0.11"/>
    <circle cx="1040" cy="106" r="32" fill="#fbbf24" opacity="0.05"/>
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
    <line x1="600" y1="74" x2="1100" y2="154" stroke="#fbbf24" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="104" x2="1050" y2="174" stroke="#fbbf24" stroke-width="0.5" opacity="0.08"/>
    <polygon points="999.1147367097487,159.5 999.1147367097487,188.5 974,203 948.8852632902513,188.5 948.8852632902513,159.5 974,145" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fbbf24"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fbbf24" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ 建築 — 第 6 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 6 課：服務間通訊 — 同步、</tspan>
      <tspan x="60" dy="42">異步和事件驅動</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">微服務與微前端系統設計－從基礎到生產</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 2 部分：設計微服務後端</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 簡介

微服務之間如何通訊決定了整個系統的**耦合性、可靠性和性能**。本文分析了通訊模式並指導如何為每個用例選擇正確的模式。


![服務間通訊－同步、非同步和事件流](/storage/uploads/2026/04/mfe-ms-diagram-bai6-communication-patterns.webp)

---

## 1. 同步通信

### 1.1 請求-回覆模式

```
┌──────────┐   HTTP/gRPC    ┌──────────┐
│  Order   │ ──────────────►│ Product  │
│  Service │◄────────────── │ Service  │
└──────────┘   Response     └──────────┘

Order Service gọi Product Service để validate product trước khi tạo order.
Phải đợi response → coupling tạm thời (temporal coupling).
```

**優點：**
- 簡單、易懂、易調試
- 立即回應
- 明確錯誤處理（HTTP 狀態代碼）

**缺點：**
- 時間耦合：呼叫者被阻止，直到收到回應
- 級聯故障：如果產品服務故障 → 訂單服務也出現故障
- 延遲隨著呼叫鏈中的每一跳而增加

### 1.2 最小化同步風險

- **斷路器**：當下游服務故障時斷開電路
- **超時**：設定合理的超時時間（不要太長）
- **使用退避重試**：使用指數退避重試
- **後備**：返回快取資料或預設回應
- **Bulkhead**：隔離每個下游的連線池

---

## 2. 非同步通信

### 2.1 訊息佇列模式

```
┌──────────┐   Enqueue      ┌──────────┐   Dequeue     ┌──────────┐
│  Order   │ ──────────────►│  Queue   │──────────────►│  Email   │
│  Service │                │(RabbitMQ)│               │  Service │
└──────────┘                └──────────┘               └──────────┘

Fire-and-forget: Order Service gửi message, không đợi.
Email Service xử lý khi sẵn sàng (rate riêng).
Queue đảm bảo message không mất.
```

**使用案例：**
- 任務分配（發送電子郵件、調整圖像大小）
- 工作隊列（處理影片、產生報告）
- 負載平衡（吸收流量峰值）

### 2.2 事件流/發布-訂閱模式

```
┌──────────┐                ┌──────────────┐
│  Order   │──publish──────►│    Kafka     │
│  Service │  OrderPlaced   │   Topic:     │
└──────────┘                │  orders      │
                            └──┬───┬───┬───┘
                               │   │   │
                    ┌──────────┘   │   └──────────┐
                    ▼              ▼              ▼
              ┌──────────┐  ┌──────────┐  ┌──────────┐
              │ Payment  │  │Inventory │  │  Email   │
              │ Service  │  │ Service  │  │  Service │
              └──────────┘  └──────────┘  └──────────┘

1 event → N consumers. Services không biết nhau → loose coupling.
Events được lưu trữ → có thể replay (event sourcing).
```

**使用案例：**
- 領域事件（OrderPlaced、PaymentConfirmed）
- 跨服務的資料複製
- 事件溯源和審計跟踪
- 即時分析

### 2.3 事件通知與事件攜帶狀態轉移

|圖案|活動包含什麼 |消費者需要什麼|
|--------|-------------|-----------------|
| **活動通知** |僅限身分證明： `{orderId: "123"}` |再次查詢來源服務 |
| **事件承載狀態** |完整資料： `{orderId, items, total, ...}` |無需再次查詢 |

**建議：** 事件攜帶狀態傳輸有助於減少耦合（消費者不需要再次呼叫來源）。

---

## 3. 比較訊息代理

|特色|兔子MQ |阿帕契·卡夫卡 | NATS |
|--------|----------|-------------|--------|
| **型號** |訊息佇列|事件流/日誌 |發布/訂閱 + JetStream |
| **訂購** |每個隊列 |每個分區 |每科 |
| **保留** |已消耗 → 已刪除 |可設定（幾天/永遠）| JetStream：可設定 |
| **吞吐量** | ~50K 訊息/秒 | ~1M 訊息/秒 | ~10M 訊息/秒 |
| **重播** |沒有 |是（基於偏移）|捷流：是的 |
| **消費者群體** |是的 |是的 |捷流：是的 |
| **複雜性** |平均 |高（ZooKeeper/KRaft）|低|
| **最適合** |任務佇列、RPC |事件流、採購 |雲端原生、輕量級|

### 3.1 何時使用什麼？

```
RabbitMQ: Task queues (send email, process image)
          Request-Reply pattern (RPC over messages)
          Complex routing (exchanges, bindings)

Kafka:    Domain events (OrderPlaced, PaymentConfirmed)
          Event sourcing & CQRS
          Data pipeline & streaming analytics
          Audit trail (event log)

NATS:     Lightweight microservices communication
          Real-time messaging (chat, notifications)
          Cloud-native, Kubernetes-native
          Request-Reply + Pub/Sub combined
```

---

## 4. 混合方法（生產模式）

在實踐中，大多數系統使用**兩者的組合**：

```
┌─────────────────────────────────────────────────┐
│              E-Commerce Communication           │
├─────────────────────────────────────────────────┤
│ SYNCHRONOUS (REST/gRPC):                        │
│ • GET product details (query, cần response ngay)│
│ • Validate payment (command, cần kết quả)       │
│ • Search products (query, real-time)            │
├─────────────────────────────────────────────────┤
│ ASYNCHRONOUS (Kafka Events):                    │
│ • OrderPlaced → trigger Payment, Inventory      │
│ • PaymentConfirmed → trigger Shipping           │
│ • UserRegistered → trigger Welcome Email        │
│ • ProductUpdated → update Search Index          │
└─────────────────────────────────────────────────┘
```

---

## 總結

|圖案|何時使用 |權衡 |
|--------|-------------|----------|
| **同步（REST/gRPC）** |需要立即回复，查詢資料|緊密耦合，級聯失效|
| **非同步佇列** |任務分配、負載平衡|最終一致性|
| **非同步事件** |領域事件、資料同步 |複雜，偵錯困難|
| **混合** |製作推薦|需要管理兩者 |

---

**下一篇文章：** [第 7 課：每個服務的資料庫和多語言持久性](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-7-database-per-service-polyglot-persistence)
