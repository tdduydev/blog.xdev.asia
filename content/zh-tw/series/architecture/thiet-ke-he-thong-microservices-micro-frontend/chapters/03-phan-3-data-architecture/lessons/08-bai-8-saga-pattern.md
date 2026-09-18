---
id: 019e4a33-d408-7b20-c001-b1c2d3e4f508
title: 第 8 課：Saga 模式與分散式事務
slug: bai-8-saga-pattern-distributed-transactions
description: 為什麼 ACID 在微服務中不起作用？傳奇模式：編排與編排。補償事務、冪等性和錯誤處理。實際範例：訂單→付款→庫存→運送工作流程。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 8
section_title: 第 3 部分：微服務中的資料架構
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: 微服務與微前端系統設計－從基礎到生產
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-3353" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-3353)"/>

  <!-- Decorations -->
  <g>
    <circle cx="755" cy="255" r="18" fill="#fb923c" opacity="0.1"/>
    <circle cx="910" cy="70" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="1065" cy="145" r="28" fill="#fb923c" opacity="0.1"/>
    <circle cx="720" cy="220" r="33" fill="#fb923c" opacity="0.05"/>
    <circle cx="875" cy="35" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <line x1="600" y1="65" x2="1100" y2="145" stroke="#fb923c" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="95" x2="1050" y2="165" stroke="#fb923c" stroke-width="0.5" opacity="0.08"/>
    <polygon points="999.6410161513776,145 999.6410161513776,185 965,205 930.3589838486224,185 930.3589838486224,145 965,125" fill="none" stroke="#fb923c" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fb923c"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fb923c" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ 建築 — 第 8 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 8 課：Saga 模式與分佈式</tspan>
      <tspan x="60" dy="42">交易</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">微服務與微前端系統設計－從基礎到生產</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 3 部分：微服務中的資料架構</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 簡介

在 Monolith 中，交易很簡單： `BEGIN → INSERT order → UPDATE inventory → COMMIT`。在微服務中，每個服務都有自己的DB→無法使用分散式ACID事務（2PC太慢、脆弱）。 **傳奇模式**是標準解決方案。


![Saga 模式－分散式事務的編排與編排](/storage/uploads/2026/04/mfe-ms-diagram-bai8-saga-pattern.webp)

---

## 1. 問題：分散式事務

### 1.1 為什麼不適合2PC（兩階段提交）？

- **封鎖**：所有參與者都被鎖定，直到協調員決定
- **單點故障**：協調器崩潰→死鎖
- **效能受到影響**：延遲顯著增加
- **無規模**：新增參與者=增加複雜度指數

### 1.2 接受最終一致性

> 在微服務中，我們接受**最終一致性**而不是強一致性。數據將**最終**一致，而不是**立即**。

---

## 2.傳奇模式

Saga = **本地事務**的字串，每個事務更新1個服務。如果交易失敗，**補償事務**將撤銷先前的變更。

### 2.1 基於編排的傳奇

每個服務發布事件→下一個服務監聽並執行：

```
Order Service         Payment Service       Inventory Service
     │                      │                      │
     │──OrderCreated───────►│                      │
     │                      │──PaymentProcessed───►│
     │                      │                      │──InventoryReserved──►
     │                      │                      │
     │ (nếu Inventory fail)                        │
     │                      │◄──InventoryFailed────│
     │◄──PaymentRefunded────│                      │
     │──OrderCancelled      │                      │
```

**優點：**簡單、鬆散耦合、無中央協調器
**缺點：** 難以追蹤整體流程，可能存在循環依賴

### 2.2 基於編排的 Saga

Saga Orchestrator 協調整個流程：

```
                    ┌─────────────────┐
                    │ Order Saga      │
                    │ Orchestrator    │
                    └──┬──┬──┬───────┘
                       │  │  │
            ┌──────────┘  │  └──────────┐
            ▼             ▼             ▼
      ┌──────────┐ ┌──────────┐ ┌──────────┐
      │ Payment  │ │Inventory │ │ Shipping │
      │ Service  │ │ Service  │ │ Service  │
      └──────────┘ └──────────┘ └──────────┘

Orchestrator:
1. Create Order (PENDING)
2. Command: ProcessPayment → Payment Service
3. If success: Command: ReserveInventory → Inventory Service
4. If success: Command: CreateShipment → Shipping Service
5. If any fail: Compensate previous steps in reverse
```

**優點：**流程清晰，易於理解，集中錯誤處理
**缺點：** Orchestrator 可能成為瓶頸、單點故障

### 2.3 什麼時候使用什麼？

|標準|編舞|編排|
|----------|-------------|----------------|
| **複雜性** | 2-3 步驟 | 4+ 步驟 |
| **可見性** |難以追蹤|清除 |
| **聯軸器** |寬鬆|媒介（到協調器）|
| **錯誤處理** |分散式 |集中式|

---

## 3. 補償交易

補償事務=業務事務的「撤銷」（不是資料庫回滾）：

```
Forward:                  Compensating:
CreateOrder         →     CancelOrder
ProcessPayment      →     RefundPayment
ReserveInventory    →     ReleaseInventory
CreateShipment      →     CancelShipment
```

**注意：**補償事務必須是**冪等的**－多次呼叫會得到相同的結果。

---

## 4. 冪等性－處理重複訊息

在分散式系統中，訊息可以發送多次（至少一次傳遞）。服務必須處理重複項：

```javascript
// Idempotent payment processing
async function processPayment(command) {
  // Check idempotency key
  const existing = await db.findPayment(command.idempotencyKey);
  if (existing) return existing; // Already processed
  
  // Process payment
  const result = await stripe.charge(command.amount);
  await db.savePayment({
    idempotencyKey: command.idempotencyKey,
    ...result
  });
  return result;
}
```

---

## 5. 實務：電子商務訂購傳奇

```
Create Order Saga (Orchestration):

Step 1: Order Service   → CreateOrder(PENDING)
Step 2: Payment Service → ChargeCustomer(orderId, amount)
  ✅ → Step 3
  ❌ → Compensate: CancelOrder → DONE (Order: PAYMENT_FAILED)

Step 3: Inventory Service → ReserveItems(orderId, items)
  ✅ → Step 4
  ❌ → Compensate: RefundPayment → CancelOrder → DONE (Order: OUT_OF_STOCK)

Step 4: Order Service → ConfirmOrder(orderId)
  ✅ → DONE (Order: CONFIRMED)
  
Step 5 (async): Notification Service → SendConfirmationEmail
```

---

## 總結

- **2PC 不適合**微服務 — 太慢且脆弱
- **Saga Pattern** = 本地事務序列 + 補償事務
- **編排**：簡單流程（2-3步），鬆散耦合
- **編排**：複雜的流程（4+步驟），清晰的可見性
- **冪等性**是必要的－始終處理重複的訊息

---

**下一篇文章：** [第 9 課：事件溯源與 CQRS — 何時需要，何時不需要？](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-9-event-sourcing-cqrs-khi-nao-can-khi-nao-khong)
