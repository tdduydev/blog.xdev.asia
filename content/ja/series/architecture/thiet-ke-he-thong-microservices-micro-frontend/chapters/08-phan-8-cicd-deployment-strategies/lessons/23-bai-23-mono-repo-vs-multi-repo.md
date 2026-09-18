---
id: 019e4a33-d423-7b20-c001-b1c2d3e4f523
title: 'レッスン 23: モノリポジトリとマルチリポジトリ — ソース コードの構成'
slug: bai-23-mono-repo-vs-multi-repo-source-code-organization
description: >-
  マイクロサービス + マイクロ フロントエンドのモノリポジトリとマルチリポジトリを比較します。 Turborepo、Nx
  ワークスペースのセットアップ。共有パッケージ管理。コードの所有権 (CODEOWNERS)。依存関係管理戦略。
duration_minutes: 75
is_free: true
video_url: null
sort_order: 23
section_title: 'パート 8: CI/CD および導入戦略'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: ja
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ アーキテクチャ — レッスン 23</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 23: Mono-Repo vs Multi-Repo — Source</tspan>
      <tspan x="60" dy="42">コード構成</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 8: CI/CD および導入戦略</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## はじめに

ソース コードの編成方法によって、開発者のエクスペリエンス、CI/CD の複雑さ、チームのコラボレーションが決まります。この記事では、モノリポジトリとマルチリポジトリを比較し、適切なリポジトリを選択するためのガイダンスを提供します。


![モノリポジトリとマルチリポジトリ — コード管理戦略の比較](/storage/uploads/2026/04/mfe-ms-diagram-bai23-monorepo-vs-multirepo.webp)

---

## 1. マルチリポジトリ

### 1.1 モデル

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

### 1.2 利点と欠点

|利点 |デメリット |
|----------|----------|
|所有権を明確にする |共有コードは管理が難しい (npm pub) |
|独立した CI/CD |リポジトリ間の複雑な変更 |
|小さいリポジトリ = 高速クローン |依存関係のバージョンのドリフト |
|きめ細かいアクセス制御 |一貫性を強制するのは難しい |

---

## 2. モノリポジトリ

### 2.1 モデル

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

### 2.2 利点と欠点

|利点 |デメリット |
|----------|----------|
| Shared code easily (internal packages) |大規模なリポジトリ → クローンが遅い |
| Atomic cross-package changes | CI の複雑さ (影響を受ける検出) |
|一貫したツールと構成 |粗粒度のアクセス制御 |
|リファクタリングは簡単です | Build time long (need caching) |

---

## 3. 意思決定マトリックス

|係数 |マルチリポジトリ |モノリポジトリ |
|----------|-----------|----------|
| **チームの規模** | 50 人以上の開発者、多くのチーム | < 50 人の開発者、少数のチーム |
| **共有コード** |あまり共有されていない |多くの共有パッケージ |
| **Deploy independence** | ✅ ナチュラル | ✅ 影響を受けた検出を使用する |
| **横断的な変更** | ❌ 複数の PR | ✅ シングル PR |
| **CI/CD** |リポジトリごとの単純な |複雑だが強力 |
| **オンボーディング** |簡単 (1 サービス/リポジトリ) |中 (大規模なリポジトリ) |

---

## 4. モノリポジトリツール

### 4.1 ターボレポ

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

### 4.3 主な機能

|特長 |ターボレポ | Nx |
|----------|----------||-----|
| **影響を受けた検出** | ✅ Git ベース | ✅ 依存関係グラフ |
| **リモート キャッシング** | ✅ ヴェルセル | ✅ Nxクラウド |
| **タスク オーケストレーション** | ✅ パイプライン | ✅ タスクグラフ |
| **コード生成** | ❌ | ✅ 発電機 |
| **プラグイン エコシステム** |限定 |リッチ (React、Node など) |

---

## 5. コードの所有権 (CODEOWNERS)

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

→ PR は、変更されたファイルに基づいてレビュー担当者を自動的に割り当てます。

---

## 6. 推奨事項

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

## 概要

- **マルチリポジトリ**: 明確な所有権、シンプルな CI、ただしコードの共有は困難
- **モノリポ**: コードの共有が簡単、アトミックな変更、ツールが必要 (Turborepo/Nx)
- 影響を受ける検出 + リモート キャッシュには **Turborepo/Nx** を使用します
- **CODEOWNERS** モノリポジトリ内のコード所有権

---

**次の記事:** [レッスン 24: マイクロサービスおよびマイクロ フロントエンド用の CI/CD パイプライン](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-24-cicd-pipeline-cho-microservices-micro-frontend)
