---
id: 019e4a33-d413-7b20-c001-b1c2d3e4f513
title: 'レッスン 13: シェル アプリケーション — ルーティング、レイアウト、オーケストレーション'
slug: bai-13-shell-application-routing-layout-orchestration
description: 'シェル アプリケーションの設計: グローバル レイアウト、ルーティング オーケストレーション、認証統合、バージョン管理、パフォーマンス バジェット。'
duration_minutes: 90
is_free: true
video_url: null
sort_order: 13
section_title: 'パート 5: 実用的なマイクロ フロントエンドの構築'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: ja
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ アーキテクチャ — レッスン 13</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 13: シェル アプリケーション — ルーティング、</tspan>
      <tspan x="60" dy="42">レイアウトとオーケストレーション</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 5: 実用的なマイクロ フロントエンドの構築</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## はじめに

シェル アプリケーション (コンテナ アプリ) は、マイクロ フロントエンド全体の **調整頭脳** です。これにより、レイアウト、ルーティング、認証、および MFE が相互に通信する方法が決まります。


![シェル アプリケーション — マイクロ フロントエンドのオーケストレーター](/storage/uploads/2026/04/mfe-ms-diagram-bai13-shell-application.webp)

---

## 1. シェル アプリケーションの責任

```
Shell Application:
├── Layout Management (Header, Footer, Sidebar)
├── Routing Orchestration (top-level routes → MFE)
├── Authentication (Login/Logout, token management)
├── Shared Services (Event Bus, Error Boundary)
└── Performance (Lazy loading, prefetching)
```

---

## 2. ルーティングアーキテクチャ

### 2.1 ルートの所有権

各 MFE は独自のルートを所有し、シェルは以下を委任するだけです。

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

### 2.2 MFE 内部ルート

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

## 3. レイアウト アーキテクチャ

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

シェル管理: ヘッダー、フッター、サイドバー、読み込み、エラー境界
MFE は、コンテンツ領域、内部ルーティング、ローカル状態を管理します。

---

## 4. 認証の統合

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

## 5. パフォーマンス戦略

### 5.1 遅延ロード + プリフェッチ

```jsx
function NavLink({ to, mfeName, children }) {
  const handleMouseEnter = () => {
    import(/* webpackPrefetch: true */ `${mfeName}/Routes`);
  };
  return <Link to={to} onMouseEnter={handleMouseEnter}>{children}</Link>;
}
```

### 5.2 パフォーマンスの予算

```
Per MFE limits:
├── JavaScript: max 250KB gzipped
├── CSS: max 50KB gzipped
├── First Contentful Paint: < 1.5s
├── Time to Interactive: < 3s
└── Lighthouse Score: > 80
```

---

## 概要

- シェル = **オーケストレーター** — レイアウト、ルーティング、認証を所有します
- 各 MFE は **コンテンツ エリア** と **内部ルート** を所有します
- 認証はシェルによって処理され、MFE にブロードキャストされます
- シェルは **薄い** 必要があります — ビジネス ロジックは含まれません

---

**次の記事:** [レッスン 14: MFE 間の状態管理とコミュニケーション](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-14-cross-mfe-state-management-communication)
