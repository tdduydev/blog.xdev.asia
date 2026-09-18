---
id: 019d8a21-c106-7001-d001-e1f2a3b4c506
title: 第6課：CDN（內容傳遞網路）－全球加速
slug: bai-6-cdn-content-delivery-network-tang-toc-toan-cau
description: >-
  什麼是 CDN 以及它如何運作？推送 CDN 與拉取 CDN。緩存失效策略。多層CDN架構。邊緣運算。比較 CloudFlare、AWS
  CloudFront、Fastly。用例和反模式。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 6
section_title: 第 2 部分：基礎設施組件
course:
  id: 019d8a21-c100-7001-d001-e1f2a3b4c5d6
  title: 系統架構：從零到英雄
  slug: system-architecture-from-zero-to-hero
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-624" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-624)"/>

  <!-- Decorations -->
  <g>
    <circle cx="932" cy="266" r="20" fill="#f87171" opacity="0.11"/>
    <circle cx="764" cy="258" r="26" fill="#f87171" opacity="0.07"/>
    <circle cx="1096" cy="250" r="32" fill="#f87171" opacity="0.13"/>
    <circle cx="928" cy="242" r="8" fill="#f87171" opacity="0.09"/>
    <circle cx="760" cy="234" r="14" fill="#f87171" opacity="0.05"/>
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
    <line x1="600" y1="86" x2="1100" y2="166" stroke="#f87171" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="116" x2="1050" y2="186" stroke="#f87171" stroke-width="0.5" opacity="0.08"/>
    <polygon points="971.507041555162,115.5 971.507041555162,156.5 936,177 900.492958444838,156.5 900.492958444838,115.50000000000001 936,95" fill="none" stroke="#f87171" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#f87171"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#f87171" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f87171">🏗️ 建築 — 第 6 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 6 課：CDN（內容傳遞網路）-</tspan>
      <tspan x="60" dy="42">全球加速</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">系統架構：從零到英雄</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 2 部分：基礎設施組件</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 簡介

如果伺服器位於新加坡，河內的使用者必須等待每個請求約 50 毫秒的往返時間。美國用戶必須等待約 200 毫秒。 CDN 透過將內容**盡可能靠近使用者**來解決這個問題。

---

## 1.什麼是CDN？

CDN 是一個全球分散式代理伺服器網絡，從距離用戶最近的位置提供內容。

```
Không có CDN:
  User (Hà Nội) ──── 200ms ────► Origin Server (US)

Có CDN:
  User (Hà Nội) ──── 10ms ────► CDN Edge (Hà Nội)
                                    │ cache miss
                                    ▼
                              CDN Edge ── 200ms ──► Origin Server (US)
                                    │ cache result
                                    ▼
  User (Hà Nội) ──── 10ms ────► CDN Edge (Hà Nội)  ← Lần sau = 10ms!
```

### 1.1 CDN架構

```
                    Origin Server
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
         ┌────────┐ ┌────────┐ ┌────────┐
         │Regional│ │Regional│ │Regional│
         │  PoP   │ │  PoP   │ │  PoP   │
         │ (Asia) │ │  (EU)  │ │ (US)   │
         └───┬────┘ └───┬────┘ └───┬────┘
         ┌───┴───┐  ┌───┴───┐  ┌───┴───┐
         │Edge   │  │Edge   │  │Edge   │
         │Servers│  │Servers│  │Servers│
         └───────┘  └───────┘  └───────┘
             ▲           ▲          ▲
           Users       Users      Users
```

---

## 2. 推送 CDN 與拉取 CDN

### 2.1 推送CDN

```
Origin Server ──push──► CDN Edge
  Khi content thay đổi, origin chủ động push lên CDN

Flow:
  1. Developer deploy new image
  2. CI/CD pipeline push image to CDN
  3. CDN distributes to all edges
  4. User request → Edge server → Return immediately
```

|優勢 |缺點 |
|--------|------------|
|內容始終可用 |必須管理推播流程|
|沒有「第一次請求」延遲 |消耗所有邊緣的儲存空間 |
|完全控制|內容變化較大時會變得複雜 |

**最適合：** 幾乎沒有小變化的靜態內容

### 2.2 拉取CDN

```
User ──request──► CDN Edge
  Edge: "Tôi không có content này"
  Edge ──request──► Origin Server
  Origin ──response──► Edge
  Edge: cache content + return to user

Lần sau:
  User ──request──► CDN Edge
  Edge: "Tôi có rồi!" → Return from cache
```

|優勢 |缺點 |
|--------|------------|
|自動，無需管理|第一次請求很慢（快取未命中）|
|僅請求快取內容 |需要TTL策略|
|輕鬆設定 |快取踩踏風險|

**最適合：** 動態內容、高流量

---

## 3. 快取失效策略

### 3.1 TTL（存活時間）

```
CDN cache product image với TTL = 1 giờ
  T=0:  User request → Cache MISS → Fetch from origin → Cache 1 giờ
  T=30m: User request → Cache HIT → Return cached
  T=61m: Cache expired → Fetch from origin → Cache lại

Trade-off: TTL ngắn = fresh hơn nhưng nhiều origin hits
           TTL dài = nhanh hơn nhưng content có thể cũ
```

### 3.2 快取清除

```
CDN API: DELETE /cache?url=https://blog.xdev.asia/images/logo.png
→ Xóa content khỏi tất cả edge servers

Use case: Cập nhật logo, fix typo trong hình ảnh
```

### 3.3 快取清除

```
Thay đổi URL khi content thay đổi:

Trước: /style.css
Sau:   /style.css?v=2
Hoặc:  /style.a1b2c3d4.css (hash trong filename)

→ CDN coi đây là content mới → fetch from origin
```

### 3.4 重新驗證時過時

```
Cache expired, nhưng:
  1. Trả cached content ngay (stale)
  2. Đồng thời fetch fresh content từ origin
  3. Update cache khi origin respond

→ User luôn nhận response nhanh
→ Content cuối cùng sẽ fresh
```

---

## 4. 邊緣運算

```
Traditional CDN:
  Edge chỉ serve static files

Edge Computing:
  Edge chạy code (logic) tại edge location

Ví dụ Cloudflare Workers:
  - A/B testing tại edge
  - Geolocation-based redirects
  - Authentication tại edge
  - Image resizing tại edge
  - API response transformation
```

---

## 5. 比較 CDN 供應商

|特點|雲端火炬 | AWS CloudFront | AWS CloudFront快點|
|--------|------------|------------|--------|
| **PoP** | 300+ | 450+ | 90+ |
| **邊緣運算** |工人| Lambda@Edge |運算@邊緣|
| **免費套餐** |慷慨 |有限公司|無 |
| **價格** | $ | $$ | $$$ |
| **DDoS 防護** |內建| AWS 盾 |有限公司|
| **最適合** |普通、中小型| AWS 生態系統 |效能關鍵 |

---

## 6.CDN 反模式

|反模式|問題 |解決方案 |
|------------|--------|------------|
|快取個人化內容 |使用者 A 查看資料 使用者 B |快取控制：私有 |
| API 的 TTL 太長 |資料過時 |短 TTL + 重新驗證時過時 |
| API 請勿使用 CDN |遠端 API 速度慢 |在邊緣快取 GET API |
| CDN 無所不包 |透過 CDN 發佈/放置/刪除 | CDN 僅適用於 GET 請求 |

---

## 總結

|概念 |重點 |
|--------|-------------|
| CDN |從最靠近使用者的位置提供內容 |
|推與拉 |推為靜態，拉為動態 |
|快取失效| TTL + 清除 + 快取清除 |
|邊緣運算 |在邊緣運行邏輯，減少延遲 |

---

## 練習

1. **CDN策略：** 為電子商務網站設計CDN策略：產品圖片（很少變化）、產品價格（經常變化）、使用者畫像（個人化）。

2. **快取失效：**部落格平台需要在作者編輯後立即更新貼文。設計緩存失效策略。

3. **成本估算：** 網站每天有 10M 頁面瀏覽量，每個頁面 2MB（500KB HTML + 1.5MB 圖片）。估計每月 CDN 頻寬和成本（CloudFront：0.085 美元/GB）。
