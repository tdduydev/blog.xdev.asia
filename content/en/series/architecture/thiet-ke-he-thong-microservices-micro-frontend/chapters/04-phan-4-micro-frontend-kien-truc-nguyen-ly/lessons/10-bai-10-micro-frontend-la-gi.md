---
id: 019e4a33-d410-7b20-c001-b1c2d3e4f510
title: 'Lesson 10: What is Micro Frontend? — Benefits, Trade-offs & Decision Framework'
slug: bai-10-micro-frontend-la-gi-loi-ich-trade-offs-decision-framework
description: >-
  Definition of Micro Frontend. Why do we need Micro Frontend when we already
  have Microservices? Benefits: independent deployment, team autonomy, tech
  diversity. Trade-offs: complexity, performance, UX consistency. Decision
  framework.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 10
section_title: 'Part 4: Micro Frontend — Architecture & Principles'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: Microservices & Micro Frontend system design — From basics to Production
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-6967" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-6967)"/>

  <!-- Decorations -->
  <g>
    <circle cx="1035" cy="215" r="28" fill="#fb923c" opacity="0.1"/>
    <circle cx="970" cy="190" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="905" cy="165" r="18" fill="#fb923c" opacity="0.1"/>
    <circle cx="840" cy="140" r="13" fill="#fb923c" opacity="0.05"/>
    <circle cx="775" cy="115" r="8" fill="#fb923c" opacity="0.1"/>
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
    <line x1="600" y1="205" x2="1100" y2="285" stroke="#fb923c" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="235" x2="1050" y2="305" stroke="#fb923c" stroke-width="0.5" opacity="0.08"/>
    <polygon points="989.6410161513776,135 989.6410161513776,175 955,195 920.3589838486224,175 920.3589838486224,135 955,115" fill="none" stroke="#fb923c" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fb923c"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fb923c" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ Architecture — Lesson 10</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 10: What is Micro Frontend? — Benefits,</tspan>
      <tspan x="60" dy="42">Trade-offs & Decision Framework</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Microservices & Micro Frontend system design — From basics to Production</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 4: Micro Frontend — Architecture & Principles</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Introduction

Micro Frontend extends the idea of Microservices to **frontend**: dividing the web application into small parts, each part is owned, developed and deployed **independently** by a team. This article explains why Micro Frontend is needed and when it should (or should not) be used.


![Micro Frontend Overview — each team owns a vertical slice](/storage/uploads/2026/04/mfe-ms-diagram-bai10-micro-frontend-overview.webp)

---

## 1. What is Micro Frontend?

### 1.1 Definition

> "An architectural style where independently deliverable frontend applications are composed into a greater whole."
> — Cam Jackson, Martin Fowler Blog

```
Monolith Frontend:                   Micro Frontend:
┌─────────────────────────┐         ┌─────────────────────────┐
│     Single SPA          │         │    Shell Application    │
│ ┌─────────────────────┐ │         │ ┌──────┐ ┌──────┐ ┌──┐ │
│ │ Header              │ │         │ │Shared│ │Shared│ │  │ │
│ ├──────┬──────┬───────┤ │         │ │Header│ │Footer│ │  │ │
│ │Produ-│ Cart │ Order │ │         │ └──────┘ └──────┘ │  │ │
│ │cts   │      │       │ │         │ ┌──────┐ ┌──────┐ │  │ │
│ │      │      │       │ │    ──►  │ │Produc│ │ Cart │ │Or│ │
│ │      │      │       │ │         │ │t MFE │ │ MFE  │ │de│ │
│ │      │      │       │ │         │ │Team A│ │Team B│ │rC│ │
│ ├──────┴──────┴───────┤ │         │ └──────┘ └──────┘ └──┘ │
│ │ Footer              │ │         │   Deploy   Deploy  De  │
│ └─────────────────────┘ │         │   riêng    riêng  ploy │
└─────────────────────────┘         └─────────────────────────┘
1 team, 1 repo, 1 deploy            N teams, N repos, N deploys
```

### 1.2 Micro Frontend vs Component Library

| | **Component Library** | **Micro Frontend** |
|---|---|---|
| Deploy | Same app host | Independent |
| Team ownership | Shared | Dedicated team |
| Tech stack | Similar | Can differ |
| Runtime loading | Build-time | Runtime |
| Data/state | Shared in memory | Isolated |

---

## 2. Why do we need Micro Frontend?

### 2.1 Practical problem

You have **5 teams** working on 1 monolith SPA:
- Continuous PR conflicts (500+ components, shared state)
- Long Merge Queue → deploy once/week
- A team wants to upgrade React 18, but needs the entire app to migrate
- Bug on product page → rollback the whole app (cart, order are also affected)

→ Micro Frontend solves the **organizational scaling** problem.

### 2.2 Main benefits

| Benefits | Description |
|--------|-------|
| **Independent Deployment** | Ship product page without affecting cart |
| **Team Autonomy** | Each team owns end-to-end (UI → BFF → Service) |
| **Tech Flexibility** | Team A uses React, Team B uses Vue (if necessary) |
| **Incremental Upgrade** | Upgrade each MFE, no need for big bang |
| **Fault Isolation** | Bug in MFE A does not crash MFE B |
| **Faster Development** | Smaller codebase = faster build, test, deploy |

---

## 3. Trade-offs & Challenges

### 3.1 When Micro Frontend is NOT suitable

- **Small team** (< 5 devs): overhead is too large compared to the benefits
- **Simple app**: landing page, blog, simple dashboard
- **Tight UX coupling**: the application needs seamless UX between parts
- **Performance-critical**: add runtime overhead (loading, bootstrapping)

### 3.2 Complexity costs

```
Micro Frontend thêm complexity:
├── Infrastructure: CI/CD cho nhiều apps
├── Shared dependencies: versioning hell
├── UX Consistency: design system bắt buộc
├── Communication: cross-MFE events
├── Performance: bundle size, load time
├── Testing: integration testing across MFEs
└── Developer Experience: local dev setup phức tạp
```

---

## 4. Decision Framework

```
Bạn nên dùng Micro Frontend khi:

✅ Team size: 15+ frontend developers
✅ Multiple teams working on same app
✅ Deploy frequency: team muốn deploy độc lập
✅ App complexity: 10+ distinct features/pages
✅ Tech migration: cần incremental migration

❌ Skip Micro Frontend khi:
❌ Team < 5 developers
❌ Single team, shared ownership
❌ App chưa đủ phức tạp
❌ Performance là yếu tố quyết định
❌ Team chưa có experience với Microservices
```

---

## Summary

Micro Frontend is not a silver bullet — it solves the **organizational scaling** problem. If you don't have that problem, don't create unnecessary complexity.

---

**Next article:** [Lesson 11: Micro Frontend Integration Strategies — Build-time vs Run-time](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-11-micro-frontend-integration-strategies-build-time-vs-run-time)
