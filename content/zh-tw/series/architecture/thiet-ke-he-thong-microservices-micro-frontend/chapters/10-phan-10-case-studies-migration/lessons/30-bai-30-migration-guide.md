---
id: 019e4a33-d430-7b20-c001-b1c2d3e4f530
title: 第 30 課：遷移指南 — 從整體架構到微服務與微前端
slug: bai-30-migration-guide-tu-monolith-den-microservices-micro-frontend
description: >-
  Monolith 的實際遷移路線圖。絞殺者無花果圖案。單體分析：熱點、耦合、依賴。遷移後端：Extract Service。遷移前端：提取
  MFE。雙寫，資料遷移。時間表和團隊組織。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 30
section_title: 第 10 部分：案例研究和遷移指南
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: 微服務與微前端系統設計－從基礎到生產
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-5325" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-5325)"/>

  <!-- Decorations -->
  <g>
    <circle cx="796" cy="98" r="14" fill="#2dd4bf" opacity="0.13"/>
    <circle cx="992" cy="34" r="32" fill="#2dd4bf" opacity="0.11"/>
    <circle cx="688" cy="230" r="20" fill="#2dd4bf" opacity="0.09"/>
    <circle cx="884" cy="166" r="8" fill="#2dd4bf" opacity="0.07"/>
    <circle cx="1080" cy="102" r="26" fill="#2dd4bf" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <line x1="600" y1="58" x2="1100" y2="138" stroke="#2dd4bf" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="88" x2="1050" y2="158" stroke="#2dd4bf" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1036.5788383248864,191.5 1036.5788383248864,224.5 1008,241 979.4211616751136,224.5 979.4211616751135,191.5 1008,175" fill="none" stroke="#2dd4bf" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#2dd4bf"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#2dd4bf" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#2dd4bf">🏗️ 建築 — 第 30 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 30 課：遷移指南 — 從整體架構</tspan>
      <tspan x="60" dy="42">微服務與微前端</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">微服務與微前端系統設計－從基礎到生產</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 10 部分：案例研究和遷移指南</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 簡介

大多數實用的系統都是從一個整體開始的－而且是一個好的整體！遷移到微服務+微前端是一個**漫長的過程**，而不是一次大爆炸重寫。本文將引導您完成安全、逐步的遷移路徑。


![Strangler Fig 模式 — 從整體遷移到微服務](/storage/uploads/2026/04/mfe-ms-diagram-bai30-strangler-fig-migration.webp)

---

## 1. 扼殺者無花果圖案

### 1.1 想法

```
Strangler Fig Tree: cây phụ bao quanh cây chủ,
dần dần thay thế cho đến khi cây chủ biến mất.

Phase 1: Monolith xử lý mọi thứ
┌──────────────────────┐
│      Monolith        │
│ Users│Products│Orders│
└──────────────────────┘

Phase 2: Extract service, route traffic
┌───────────────────────┐
│     API Gateway       │
├───────────┬───────────┤
│ Monolith  │  Product  │
│ (Users,   │  Service  │
│  Orders)  │  (new)    │
└───────────┴───────────┘

Phase 3: Extract more services
┌───────────────────────────┐
│       API Gateway         │
├────────┬────────┬─────────┤
│Monolith│Product │  Order  │
│(Users) │Service │ Service │
│        │        │  (new)  │
└────────┴────────┴─────────┘

Phase N: Monolith is gone
┌────────────────────────────────┐
│          API Gateway           │
├────────┬────────┬──────────────┤
│  User  │Product │    Order     │
│Service │Service │   Service    │
└────────┴────────┴──────────────┘
```

---

## 2. 遷移評估

### 2.1 整體分析

```
Trước khi migration, hiểu monolith:

Code Analysis:
├── Module coupling (which modules call which?)
├── Database coupling (shared tables?)
├── Hot spots (most changed code)
├── Complexity (cyclomatic, LOC)
└── Team ownership (ai maintain gì?)

Prioritization Matrix:
┌──────────────────────────────────────┐
│         Business Value               │
│ High │ ★ Extract first │ Rewrite    │
│      │   (Product,     │ later      │
│      │    Order)       │            │
│──────┼─────────────────┼────────────│
│ Low  │ Leave in        │ Consider   │
│      │ monolith        │ removing   │
│      │ (low ROI)       │            │
│      └──── Low ─────── High ────────│
│           Change Frequency           │
└──────────────────────────────────────┘
```

---

## 3. 後端遷移手冊

### 3.1 第 1 階段：API 閘道（第 1-4 週）

```
1. Deploy API Gateway trước monolith
2. Route ALL traffic qua Gateway
3. Gateway forward mọi thứ đến Monolith
4. Không thay đổi behavior — chỉ thêm routing layer

Frontend → API Gateway → Monolith (no change)
```

### 3.2 第 2 階段：提取第一個服務（第 5-12 週）

```
Chọn service ít coupling nhất (ví dụ: Product Catalog)

Steps:
1. Create Product Service (new codebase)
2. Copy/rewrite product logic
3. Setup database (copy product tables)
4. Dual-write: monolith write cả old DB + new service
5. Verify data consistency
6. Switch reads: Gateway route GET /products → new service
7. Switch writes: Gateway route POST/PUT /products → new service
8. Remove product code from monolith
9. Drop product tables from monolith DB (after verification)
```

### 3.3 資料遷移策略

```
Dual-Write Pattern:

Phase A: Monolith writes to Old DB + New DB
         Reads from Old DB
         → Verify New DB data matches

Phase B: Monolith writes to Old DB + New DB
         Reads from New DB (switch)
         → Verify reads correct

Phase C: New Service writes to New DB only
         Monolith no longer involved
         → Clean up Old DB tables
```

---

## 4. 前端遷移手冊

### 4.1 第 1 階段：Shell 應用程式（第 1-4 週）

```
1. Create Shell App (new React app)
2. Shell wraps existing monolith frontend (iframe initially)
3. Shell provides Header, Footer, Navigation
4. Gradually replace iframe sections with MFEs
```

### 4.2 第 2 階段：提取第一個 MFE（第 5-8 週）

```
Extract Product pages as first MFE:

1. Create product-mfe project
2. Configure Module Federation (expose ProductList, ProductDetail)
3. Shell loads product-mfe via Module Federation
4. Remove product pages from monolith frontend
5. Verify routing, styling, functionality

Shell App
├── Header (Shell)
├── /products/* → Product MFE (new, Module Federation)
├── /cart/* → Monolith Frontend (iframe, temporary)
├── /orders/* → Monolith Frontend (iframe, temporary)
└── Footer (Shell)
```

### 4.3 逐步更換

```
Month 1: Shell + Product MFE
Month 2: + Cart MFE
Month 3: + Order MFE
Month 4: + Account MFE
Month 5: Remove iframe, monolith frontend retired
```

---

## 5. 遷移反模式

```
❌ Big Bang Rewrite
   → 12-18 months later: "it's not ready yet"
   → Business can't wait, original monolith diverges

❌ Extract based on technical layers
   → "API service", "DB service", "Auth service"
   → Should be business domains: Product, Order, User

❌ Shared database between old and new
   → Defeats the purpose of database per service
   → Temporal coupling, schema changes break both

❌ Migration without observability
   → Can't compare old vs new behavior
   → Can't detect regressions
```

---

## 6. 遷移時間表（典型）

```
E-Commerce Monolith → Microservices + MFE:

Month 1-2:  Infrastructure setup
            (K8s, CI/CD, monitoring, API Gateway)

Month 3-4:  First service extraction
            (Product Service + Product MFE)

Month 5-6:  Second service extraction
            (Order Service + Order MFE)

Month 7-8:  Third + Fourth services
            (Cart, User)

Month 9-10: Supporting services
            (Payment, Notification, Inventory)

Month 11-12: Cleanup monolith
              Remove old code, drop old tables

Ongoing:    Optimize, add services as needed
```

---

## 7. 成功指標

|指標|前（整體）|之後（微*）|
|--------|--------------------|-----------------|
|部署頻率 | 1/週 |每隊 5-10 次/天 |
|交貨時間 | 2 週 | 1-2 天 |
|平均修復時間 | 2-4小時| 15-30 分鐘 |
|改變失敗率| 15% | < 5% |
|團隊自治|低（公關衝突）|高（獨立）|
|建置時間| 15 分鐘 | 2-3 分鐘（每次服務）|

---

## 總結

- **扼殺者圖模式**：逐漸遷移，而不是大爆炸重寫
- **依業務領域擷取**，而非技術層
- **雙寫**保證資料遷移安全
- **首先是 API 閘道** → 增量路由流量
- **前端**：Shell App→一一提取MFE
- **時間表**：典型電子商務為 9-12 個月
- **衡量成功**：部署頻率、交貨時間、MTTR

---

## 🎉 恭喜您完成本系列！

你已經經歷了整個旅程：
1. **平台**：單體→微服務→微前端演進
2. **後端**：服務分解、API設計、非同步通信
3. **資料**：每個服務的資料庫、Saga、事件溯源
4. **前端**：微前端架構、模組聯合、Shell App
5. **整合**：BFF、API 網關、GraphQL 聯合
6. **品質**：測試策略、合約測試
7. **部署**：CI/CD、Canary、GitOps
8. **生產**：可觀察性、性能、安全性
9. **實踐**：個案研究、遷移指南

**下一篇：**應用於實際專案！從小處著手，儘早驗證，快速迭代。
