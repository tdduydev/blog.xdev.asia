---
id: 019e4a33-d411-7b20-c001-b1c2d3e4f511
title: 'レッスン 11: マイクロ フロントエンド統合戦略 — ビルド時と実行時'
slug: bai-11-micro-frontend-integration-strategies-build-time-vs-run-time
description: >-
  マイクロ フロントエンドを構成する 7 つの戦略: iframe、Web コンポーネント、ビルド時統合、JavaScript バンドル、モジュール
  フェデレーション、サーバーサイド インクルード、エッジサイド インクルード。 Compare details and choose the right
  approach.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 11
section_title: 'パート 4: マイクロ フロントエンド — アーキテクチャと原則'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-2118" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-2118)"/>

  <!-- Decorations -->
  <g>
    <circle cx="655" cy="235" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="710" cy="130" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="765" cy="285" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="820" cy="180" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="875" cy="75" r="8" fill="#fb923c" opacity="0.1"/>
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
    <polygon points="949.6410161513776,95 949.6410161513776,135 915,155 880.3589838486224,135 880.3589838486224,95.00000000000001 915,75" fill="none" stroke="#fb923c" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fb923c"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fb923c" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ アーキテクチャ — レッスン 11</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 11: マイクロ フロントエンドの統合</tspan>
      <tspan x="60" dy="42">戦略 - ビルド時間と実行時間</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 4: マイクロ フロントエンド — アーキテクチャと原則</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## はじめに

マイクロ フロントエンド アプリケーションを作成するには、さまざまな方法があります。各アプローチには独自のトレードオフがあります。この記事では、各戦略を詳しく説明し、適切な戦略を選択するのに役立ちます。


![4 マイクロ フロントエンド統合戦略](/storage/uploads/2026/04/mfe-ms-diagram-bai11-mfe-integration.webp)

---

## 1. ビルド時の統合 (NPM パッケージ)

各 MFE は npm パッケージとして公開され、ホスト アプリはビルド時にインポートされます。

```
host-app/package.json:
  "@company/product-mfe": "^2.1.0"
  "@company/cart-mfe": "^1.3.0"
```

**利点:** シンプル、タイプセーフ、ツリーシェイク可能
**欠点:** MFE の更新時にホスト アプリを再構築および再デプロイする必要がある
**評決:** ❌ 「実際には」Micro Frontend ではない - 独立した展開はありません

---

## 2. 実行時の統合

### 2.1 iframe

```html
<iframe src="https://product.example.com/embed" />
```

**利点:** 完全な分離、シンプル
**短所:** 共有スタイルがない、コミュニケーションが難しい、SEO がひどい、パフォーマンスが低い
**使用例:** 従来のアプリの埋め込み、サンドボックス化されたウィジェット

### 2.2 Web コンポーネント

```html
<product-catalog data-category="electronics"></product-catalog>
<script src="https://product.cdn.com/product-catalog.js"></script>
```

**利点:** フレームワークに依存しない、Shadow DOM 分離、ブラウザ標準
**欠点:** 複雑な SSR、React ラッパーが必要、Shadow DOM のスタイリングが難しい

### 2.3 JavaScript の統合 (動的スクリプト読み込み)

```javascript
function loadMicroFrontend(name, containerId) {
  const script = document.createElement('script');
  script.src = `https://${name}.cdn.com/bundle.js`;
  script.onload = () => {
    window[`render_${name}`](document.getElementById(containerId));
  };
  document.body.appendChild(script);
}
```

**利点:** シンプル、柔軟、不可知論的なフレームワーク
**欠点:** 依存関係の共有がない、大きなバンドル

### 2.4 モジュールフェデレーション (Webpack 5) ⭐

```
┌─────────────────────────────┐
│        Shell App (Host)     │
│                             │
│  import('product/Catalog')  │──► Product MFE (Remote)
│  import('cart/MiniCart')     │──► Cart MFE (Remote)
│                             │
│  Shared: React, React-DOM   │
│  (loaded once, shared)      │
└─────────────────────────────┘
```

**利点:** ランタイム統合、共有依存関係、遅延読み込み、TypeScript
**欠点:** Webpack 固有の学習曲線
**評決:** ⭐ ほとんどのユースケースで **推奨**。

---

## 3. サーバー側のアプローチ

### 3.1 サーバー側インクルード (SSI)

```html
<!--# include virtual="/fragments/product?id=123" -->
```

### 3.2 エッジサイド インクルード (ESI)

```html
<esi:include src="https://product.service/fragment/header" />
```

**使用例:** SEO と TTFB が重要な場合の、コンテンツの多いページ。

---

## 4. 意思決定マトリックス

|戦略 |独立 |パフォーマンス |複雑さ |最適な用途 |
|----------|---------------|---------------|-----------|----------|
| NPMパッケージ | ❌ 低い | ✅ ベスト |低い |共有ライブラリ |
| iフレーム | ✅ 高 | ❌ 悪い |低い |レガシー組み込み |
| Web コンポーネント | ✅ 高 | ✅ 良い |中 |マルチフレームワーク |
| JS の統合 | ✅ 高 | ⚠️ わかりました |中 |単純なケース |
| **モジュールフェデレーション** | **✅ 高** | **✅ 良い** | **中** | **ほとんどのプロジェクト** |
| SSI/ESI | ✅ 高 | ✅ 素晴らしい TTFB |高 |コンテンツ サイト |

---

## 概要

- **ビルド時間** (npm): シンプルですが、独立したデプロイメントはありません
- **モジュールフェデレーション**: 同じフレームワークの最適なバランス — ⭐推奨
- **Web コンポーネント**: マルチフレームワークに最適
- **SSI/ESI**: サーバーレンダリングのコンテンツサイトに最適

---

**次の記事:** [レッスン 12: Webpack モジュール フェデレーションと Vite — 詳細](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-12-webpack-module-federation-vite-federation-deep-dive)
