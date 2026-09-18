---
id: 019e4a33-d423-7b20-c001-b1c2d3e4f523
title: 第 23 課：Mono-Repo 與 Multi-Repo — 原始碼組織
slug: bai-23-mono-repo-vs-multi-repo-source-code-organization
description: >-
  比較微服務 + 微前端的 Mono-Repo 與 Multi-Repo。 Turborepo，Nx
  工作區設定。共享包管理。代碼所有權（CODEOWNERS）。依賴管理策略。
duration_minutes: 75
is_free: true
video_url: null
sort_order: 23
section_title: 第 8 部分：CI/CD 和部署策略
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: 微服務與微前端系統設計－從基礎到生產
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-8951" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-8951)"/>

  <!-- Decorations -->
  <g>
    <circle cx="738" cy="104" r="36" fill="#fbbf24" opacity="0.09"/>
    <circle cx="876" cy="42" r="20" fill="#fbbf24" opacity="0.13"/>
    <circle cx="1014" cy="240" r="34" fill="#fbbf24" opacity="0.07"/>
    <circle cx="652" cy="178" r="18" fill="#fbbf24" opacity="0.11"/>
    <circle cx="790" cy="116" r="32" fill="#fbbf24" opacity="0.05"/>
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
    <line x1="600" y1="224" x2="1100" y2="304" stroke="#fbbf24" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="254" x2="1050" y2="324" stroke="#fbbf24" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1007.7749907475932,154.5 1007.7749907475932,193.5 974,213 940.2250092524068,193.5 940.2250092524068,154.5 974,135" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fbbf24"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fbbf24" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ 建築 — 第 23 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 23 課：Mono-Repo 與 Multi-Repo — 來源</tspan>
      <tspan x="60" dy="42">代碼組織</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">微服務與微前端系統設計－從基礎到生產</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 8 部分：CI/CD 和部署策略</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 簡介

原始碼的組織方式決定了開發人員的經驗、CI/CD 複雜性和團隊協作。本文對 Mono-Repo 與 Multi-Repo 進行了比較，並提供瞭如何選擇正確的指南。


![Monorepo 與 Multi-repo — 比較程式碼管理策略](/storage/uploads/2026/04/mfe-ms-diagram-bai23-monorepo-vs-multirepo.webp)

---

## 1. 多倉庫

### 1.1 模型

```
github.com/company/
├── product-service/       (repo riêng)
├── order-service/         (repo riêng)
├── cart-service/          (repo riêng)
├── product-mfe/           (repo riêng)
├── cart-mfe/              (repo riêng)
├── shell-app/             (repo riêng)
├── shared-ui/             (repo riêng, npm package)
└── shared-types/          (repo riêng, npm package)
```

### 1.2 優點和缺點

|優勢 |缺點 |
|--------|------------|
|所有權清晰 |共享程式碼難以管理（npmpublish） |
|獨立CI/CD |複雜的跨儲存庫變更 |
|較小的儲存庫 = 快速克隆 |依賴版本漂移 |
|細粒度的存取控制|一致性很難執行 |

---

## 2. Mono-Repo

### 2.1 模型

```
github.com/company/platform/
├── apps/
│   ├── shell-app/
│   ├── product-mfe/
│   ├── cart-mfe/
│   └── order-mfe/
├── services/
│   ├── product-service/
│   ├── order-service/
│   └── cart-service/
├── packages/
│   ├── shared-ui/
│   ├── shared-types/
│   └── eslint-config/
├── turbo.json / nx.json
└── package.json (workspace root)
```

### 2.2 優點和缺點

|優勢 |缺點 |
|--------|------------|
|輕鬆共享代碼（內部包）|大型倉庫 → 緩慢克隆 |
|原子跨包更改 | CI 複雜度（影響檢測）|
|一致的工具與配置|粗粒度存取控制|
|重構很容易 |建置時間長（需要快取） |

---

## 3.決策矩陣

|因素 |多倉庫 | Mono-Repo |
|--------|------------|------------|
| **團隊規模** | 50 多名開發人員，許多團隊 | < 50 名開發人員，幾個團隊 |
| **共享代碼** |較少共享 |許多共享包 |
| **部署獨立性** | ✅ 天然 | ✅ 受影響檢測 |
| **跨領域變化** | ❌ 多個 PR | ✅ 單一公關 |
| **CI/CD** |每個儲存庫都很簡單 |複雜但強大 |
| **入職** |簡單（1 項服務/儲存庫）|中型（大型回購）|

---

## 4. Mono-Repo 工具

### 4.1 渦輪雷波

```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "test": {
      "dependsOn": ["build"]
    },
    "lint": {}
  }
}
```

```bash
# Build chỉ affected packages
turbo build --filter=...[origin/main]

# Build product-mfe và dependencies
turbo build --filter=product-mfe...
```

### 4.2 尼克斯

```bash
# Affected commands (chỉ build/test code thay đổi)
nx affected --target=build --base=main
nx affected --target=test --base=main

# Dependency graph
nx graph
```

### 4.3 主要特點

|特點|渦輪雷波| NX |
|--------|------------|-----|
| **受影響的偵測** | ✅ 基於 Git | ✅ 依賴關係圖 |
| **遠端快取** | ✅ 維塞爾 | ✅ Nx 雲端 |
| **任務編排** | ✅ 管道 | ✅ 任務圖 |
| **代碼產生** | ❌ | ✅ 發電機 |
| **插件生態系** |有限公司|豐富（React、Node 等）|

---

## 5. 程式碼所有權（CODEOWNERS）

```
# .github/CODEOWNERS
apps/product-mfe/    @team-product
apps/cart-mfe/       @team-cart
services/product-*/  @team-product
services/order-*/    @team-order
packages/shared-ui/  @team-platform
packages/shared-*/   @team-platform
turbo.json           @team-platform
```

→ PR 根據更改的文件自動分配審閱者。

---

## 6. 建議

```
E-Commerce Platform (series này):

Mono-Repo (Turborepo):
├── apps/           (Shell + MFEs)
├── services/       (Microservices)
├── packages/       (shared-ui, shared-types, eslint-config)
└── infra/          (Terraform, K8s manifests)

Lý do:
- Nhiều shared code (UI, types, configs)
- Cross-cutting changes thường xuyên
- Lợi ích từ affected detection & remote caching
- Team size < 50 devs
```

---

## 總結

- **Multi-Repo**：所有權清晰，CI簡單，但共享程式碼很困難
- **Mono-Repo**：易於共享程式碼，原子更改，需要工具（Turborepo/Nx）
- 使用**Turborepo/Nx**進行受影響的檢測+遠端緩存
- **程式碼擁有者** 用於單一儲存庫中的程式碼所有權

---

**下一篇文章：** [第 24 課：微服務和微前端的 CI/CD 管道](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-24-cicd-pipeline-cho-microservices-micro-frontend)
