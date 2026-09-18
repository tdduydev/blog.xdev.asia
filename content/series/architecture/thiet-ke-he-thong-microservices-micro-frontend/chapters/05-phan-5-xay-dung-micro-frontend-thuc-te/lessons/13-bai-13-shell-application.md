---
id: 019e4a33-d413-7b20-c001-b1c2d3e4f513
title: "Bài 13: Shell Application — Routing, Layout & Orchestration"
slug: bai-13-shell-application-routing-layout-orchestration
description: >-
  Thiết kế Shell Application: Global Layout, Routing orchestration, Authentication integration, Version management, Performance budget.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 13
section_title: "Phần 5: Xây dựng Micro Frontend thực tế"
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: "Thiết kế hệ thống Microservices & Micro Frontend — Từ cơ bản đến Production"
  slug: thiet-ke-he-thong-microservices-micro-frontend
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-7943" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-7943)"/>

  <!-- Decorations -->
  <g>
    <circle cx="859" cy="247" r="12" fill="#818cf8" opacity="0.12000000000000001"/>
    <circle cx="618" cy="146" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="877" cy="45" r="16" fill="#818cf8" opacity="0.060000000000000005"/>
    <circle cx="636" cy="204" r="33" fill="#818cf8" opacity="0.13"/>
    <circle cx="895" cy="103" r="20" fill="#818cf8" opacity="0.1"/>
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
    <line x1="600" y1="57" x2="1100" y2="137" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="87" x2="1050" y2="157" stroke="#818cf8" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1034.712812921102,191 1034.712812921102,223 1007,239 979.287187078898,223 979.287187078898,191 1007,175" fill="none" stroke="#818cf8" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Kiến trúc — Bài 13</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 13: Shell Application — Routing,</tspan>
      <tspan x="60" dy="42">Layout &amp; Orchestration</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Thiết kế hệ thống Microservices &amp; Micro Frontend — Từ cơ bản đến Production</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 5: Xây dựng Micro Frontend thực tế</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Giới thiệu

Shell Application (Container App) là **bộ não điều phối** toàn bộ Micro Frontend. Nó quyết định layout, routing, authentication, và cách các MFE giao tiếp với nhau.


![Shell Application — orchestrator cho các Micro Frontends](/storage/uploads/2026/04/mfe-ms-diagram-bai13-shell-application.webp)

---

## 1. Trách nhiệm của Shell Application

```
Shell Application:
├── Layout Management (Header, Footer, Sidebar)
├── Routing Orchestration (top-level routes → MFE)
├── Authentication (Login/Logout, token management)
├── Shared Services (Event Bus, Error Boundary)
└── Performance (Lazy loading, prefetching)
```

---

## 2. Routing Architecture

### 2.1 Route Ownership

Mỗi MFE own routes của mình, Shell chỉ delegate:

```jsx
function ShellRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products/*" element={
        <MFELoader name="product" module="./ProductRoutes" />
      } />
      <Route path="/cart/*" element={
        <MFELoader name="cart" module="./CartRoutes" />
      } />
      <Route path="/orders/*" element={
        <MFELoader name="order" module="./OrderRoutes" />
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```

### 2.2 MFE Internal Routes

```jsx
// Product MFE - own routes
function ProductRoutes() {
  return (
    <Routes>
      <Route index element={<ProductList />} />
      <Route path=":id" element={<ProductDetail />} />
      <Route path="category/:slug" element={<CategoryPage />} />
    </Routes>
  );
}
```

---

## 3. Layout Architecture

```
┌─────────────────────────────────────────────┐
│ Shell App                                   │
│ ┌─────────────────────────────────────────┐ │
│ │ Header (Shell-owned)                    │ │
│ │ Logo │ Nav │ Search │ Cart │ User │     │ │
│ ├─────┬───────────────────────────────────┤ │
│ │Side │  ┌─────────────────────────────┐  │ │
│ │bar  │  │  MFE Content Area           │  │ │
│ │     │  │  (dynamic, loaded by route) │  │ │
│ │     │  └─────────────────────────────┘  │ │
│ ├─────┴───────────────────────────────────┤ │
│ │ Footer (Shell-owned)                    │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

Shell quản lý: Header, Footer, Sidebar, Loading, Error boundaries
MFE quản lý: Content area, Internal routing, Local state

---

## 4. Authentication Integration

```
Shell handles login → broadcasts auth state to MFEs:

Shell App ──login──► Keycloak (OIDC)
Shell App ◄──tokens── Keycloak
Shell App ═══broadcast══► MFE A (useAuth())
Shell App ═══broadcast══► MFE B (useAuth())
```

```jsx
function Shell() {
  const auth = useKeycloakAuth();
  return (
    <AuthContext.Provider value={auth}>
      <Header user={auth.user} />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </AuthContext.Provider>
  );
}
```

---

## 5. Performance Strategies

### 5.1 Lazy Loading + Prefetch

```jsx
function NavLink({ to, mfeName, children }) {
  const handleMouseEnter = () => {
    import(/* webpackPrefetch: true */ `${mfeName}/Routes`);
  };
  return <Link to={to} onMouseEnter={handleMouseEnter}>{children}</Link>;
}
```

### 5.2 Performance Budget

```
Per MFE limits:
├── JavaScript: max 250KB gzipped
├── CSS: max 50KB gzipped
├── First Contentful Paint: < 1.5s
├── Time to Interactive: < 3s
└── Lighthouse Score: > 80
```

---

## Tóm tắt

- Shell = **orchestrator** — owns layout, routing, auth
- Mỗi MFE own **content area** và **internal routes**
- Auth handled bởi Shell, broadcast cho MFEs
- Shell phải **thin** — không chứa business logic

---

**Bài tiếp theo:** [Bài 14: Cross-MFE State Management & Communication](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-14-cross-mfe-state-management-communication)
