---
id: 019e4a33-d412-7b20-c001-b1c2d3e4f512
title: 'Lesson 12: Webpack Module Federation & Vite — Deep Dive'
slug: bai-12-webpack-module-federation-vite-federation-deep-dive
description: >-
  Hands-on with Module Federation from zero. Configure Host/Remote apps. Shared
  dependencies management. Vite Federation plugin. Error boundaries and fallback
  strategies.
duration_minutes: 120
is_free: true
video_url: null
sort_order: 12
section_title: 'Part 4: Micro Frontend — Architecture & Principles'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: Microservices & Micro Frontend system design — From basics to Production
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-401" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-401)"/>

  <!-- Decorations -->
  <g>
    <circle cx="974" cy="112" r="12" fill="#f472b6" opacity="0.07"/>
    <circle cx="848" cy="226" r="14" fill="#f472b6" opacity="0.09"/>
    <circle cx="722" cy="80" r="16" fill="#f472b6" opacity="0.11"/>
    <circle cx="1096" cy="194" r="18" fill="#f472b6" opacity="0.13"/>
    <circle cx="970" cy="48" r="20" fill="#f472b6" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <line x1="600" y1="52" x2="1100" y2="132" stroke="#f472b6" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="82" x2="1050" y2="152" stroke="#f472b6" stroke-width="0.5" opacity="0.08"/>
    <polygon points="925.3826859021799,88.5 925.3826859021799,115.5 902,129 878.6173140978201,115.5 878.6173140978201,88.5 902,75" fill="none" stroke="#f472b6" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#f472b6"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#f472b6" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f472b6">🏗️ Architecture — Lesson 12</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 12: Webpack Module Federation & Vite —</tspan>
      <tspan x="60" dy="42">Deep Dive</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Microservices & Micro Frontend system design — From basics to Production</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 4: Micro Frontend — Architecture & Principles</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Introduction

Module Federation is a game-changing feature of Webpack 5, allowing multiple builds to share code at **runtime**. This article hands-on configuration from zero.


![Module Federation — Host & Remote runtime loading](/storage/uploads/2026/04/mfe-ms-diagram-bai12-module-federation.webp)

---

## 1. Core concepts

| Concepts | Description |
|--------|-------|
| **Host** | App load remote modules (Shell App) |
| **Remote** | App expose modules for hosts (MFE) |
| **Shared** | Dependencies shared between host & remote |
| **remoteEntry.js** | Manifest file contains information about remote modules |

```
┌─────────────────────────────┐
│ Browser                     │
│  Shell App (Host)           │
│  ┌─────────────────────┐    │
│  │ import('product/    │────────► remoteEntry.js (CDN)
│  │   ProductList')     │    │     → chunk-abc.js
│  └─────────────────────┘    │
│  Shared: React 18.2.0       │
│  (loaded ONCE)              │
└─────────────────────────────┘
```

---

## 2. Host Configuration (Shell App)

```javascript
// webpack.config.js (Shell App)
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        product: 'product@https://product.cdn.com/remoteEntry.js',
        cart: 'cart@https://cart.cdn.com/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.2.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
      },
    }),
  ],
};
```

---

## 3. Remote Configuration (Product MFE)

```javascript
// webpack.config.js (Product MFE)
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'product',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductList': './src/components/ProductList',
        './ProductDetail': './src/components/ProductDetail',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.2.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
      },
    }),
  ],
};
```

---

## 4. Use in Host

```jsx
import React, { Suspense } from 'react';

const ProductList = React.lazy(() => import('product/ProductList'));
const MiniCart = React.lazy(() => import('cart/MiniCart'));

function App() {
  return (
    <div>
      <Header />
      <MFEErrorBoundary>
        <Suspense fallback={<div>Loading products...</div>}>
          <ProductList />
        </Suspense>
      </MFEErrorBoundary>
      <Footer />
    </div>
  );
}
```

---

## 5. Error Boundary for Remote MFE

```jsx
class MFEErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <div>MFE unavailable. <button onClick={() => 
        this.setState({ hasError: false })}>Retry</button></div>;
    }
    return this.props.children;
  }
}
```

---

## 6. Shared Dependencies Management

```javascript
shared: {
  react: {
    singleton: true,         // Chỉ load 1 version
    requiredVersion: '^18.2.0',
    eager: false,            // Lazy load (recommended)
    strictVersion: false,    // Cho phép minor version khác
  },
}
```

Version conflict resolution:
```
Host: react@18.2.0
Remote A: react@18.2.0  → Dùng shared (Host's version)
Remote B: react@18.3.0  → singleton → dùng 18.2.0 (warning)
Remote C: react@17.0.0  → strictVersion=true → ERROR
```

---

## 7. Vite Module Federation

```javascript
// vite.config.js (Remote)
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'product',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductList': './src/components/ProductList',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
});
```

---

## Summary

- Module Federation = **runtime code sharing** between independent builds
- **Host** loads **Remote** modules via `remoteEntry.js`
- **Shared dependencies**: singleton mode avoids duplicate React
- **Error Boundary** required for production
- **Vite** supports via plugin, similar syntax

---

**Next article:** [Lesson 13: Shell Application — Routing, Layout & Orchestration](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-13-shell-application-routing-layout-orchestration)
