---
id: 019e4a33-d423-7b20-c001-b1c2d3e4f523
title: 'Lesson 23: Mono-Repo vs Multi-Repo — Source Code Organization'
slug: bai-23-mono-repo-vs-multi-repo-source-code-organization
description: >-
  Compare Mono-Repo vs Multi-Repo for Microservices + Micro Frontend. Turborepo,
  Nx workspace setup. Shared packages management. Code ownership (CODEOWNERS).
  Dependency management strategies.
duration_minutes: 75
is_free: true
video_url: null
sort_order: 23
section_title: 'Part 8: CI/CD & Deployment Strategies'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: Microservices & Micro Frontend system design — From basics to Production
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: en
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ Architecture — Lesson 23</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 23: Mono-Repo vs Multi-Repo — Source</tspan>
      <tspan x="60" dy="42">Code Organization</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Microservices & Micro Frontend system design — From basics to Production</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 8: CI/CD & Deployment Strategies</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Introduction

The way source code is organized determines developer experience, CI/CD complexity, and team collaboration. This article compares Mono-Repo vs Multi-Repo and provides guidance on choosing the right one.


![Monorepo vs Multi-repo — comparing code management strategies](/storage/uploads/2026/04/mfe-ms-diagram-bai23-monorepo-vs-multirepo.webp)

---

## 1. Multi-Repo

### 1.1 Model

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

### 1.2 Advantages & Disadvantages

| Advantages | Disadvantages |
|--------|-----------|
| Clear ownership | Shared code is difficult to manage (npm publish) |
| Independent CI/CD | Complex cross-repo changes |
| Smaller repos = fast clone | Dependency version drift |
| Fine-grained access control | Consistency is difficult to enforce |

---

## 2. Mono-Repo

### 2.1 Model

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

### 2.2 Advantages & Disadvantages

| Advantages | Disadvantages |
|--------|-----------|
| Shared code easily (internal packages) | Large repo → slow clone |
| Atomic cross-package changes | CI complexity (affected detection) |
| Consistent tooling & configurations | Access control coarse-grained |
| Refactoring is easy | Build time long (need caching) |

---

## 3. Decision Matrix

| Factor | Multi-Repo | Mono-Repo |
|--------|-----------|-----------|
| **Team size** | 50+ devs, many teams | < 50 devs, few teams |
| **Shared code** | Less shared | Many shared packages |
| **Deploy independence** | ✅ Natural | ✅ With affected detection |
| **Cross-cutting changes** | ❌ Multiple PRs | ✅ Single PR |
| **CI/CD** | Simple per repo | Complex but powerful |
| **Onboarding** | Easy (1 service/repo) | Medium (big repo) |

---

## 4. Mono-Repo Tools

### 4.1 Turborepo

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

### 4.2 Nx

```bash
# Affected commands (chỉ build/test code thay đổi)
nx affected --target=build --base=main
nx affected --target=test --base=main

# Dependency graph
nx graph
```

### 4.3 Key Features

| Features | Turborepo | Nx |
|--------|-----------|-----|
| **Affected detection** | ✅ Git-based | ✅ Dependency graph |
| **Remote caching** | ✅ Vercel | ✅ Nx Cloud |
| **Task orchestration** | ✅ Pipelines | ✅ Task graph |
| **Code generation** | ❌ | ✅ Generators |
| **Plugin ecosystem** | Limited | Rich (React, Node, etc.) |

---

## 5. Code Ownership (CODEOWNERS)

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

→ PR automatically assign reviewers based on changed files.

---

## 6. Recommendations

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

## Summary

- **Multi-Repo**: clear ownership, simple CI, but sharing code is difficult
- **Mono-Repo**: easy to share code, atomic changes, needs tooling (Turborepo/Nx)
- Use **Turborepo/Nx** for affected detection + remote caching
- **CODEOWNERS** for code ownership in mono-repo

---

**Next article:** [Lesson 24: CI/CD Pipeline for Microservices & Micro Frontend](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-24-cicd-pipeline-cho-microservices-micro-frontend)
