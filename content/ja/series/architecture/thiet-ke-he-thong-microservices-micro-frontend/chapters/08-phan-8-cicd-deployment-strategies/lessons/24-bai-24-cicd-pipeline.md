---
id: 019e4a33-d424-7b20-c001-b1c2d3e4f524
title: 'レッスン 24: マイクロサービスおよびマイクロ フロントエンド用の CI/CD パイプライン'
slug: bai-24-cicd-pipeline-cho-microservices-micro-frontend
description: >-
  エンドツーエンドの CI/CD パイプラインを設計します。ビルド/テスト用の GitHub アクション。 Docker のマルチステージ ビルド。コンテナー
  レジストリ (ECR/GHCR)。 Kubernetes デプロイメント用の ArgoCD GitOps。複数のサービスの並列パイプライン。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 24
section_title: 'パート 8: CI/CD および導入戦略'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-6024" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-6024)"/>

  <!-- Decorations -->
  <g>
    <circle cx="694" cy="32" r="32" fill="#f472b6" opacity="0.07"/>
    <circle cx="788" cy="206" r="14" fill="#f472b6" opacity="0.09"/>
    <circle cx="882" cy="120" r="26" fill="#f472b6" opacity="0.11"/>
    <circle cx="976" cy="34" r="8" fill="#f472b6" opacity="0.13"/>
    <circle cx="1070" cy="208" r="20" fill="#f472b6" opacity="0.05"/>
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
    <line x1="600" y1="212" x2="1100" y2="292" stroke="#f472b6" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="242" x2="1050" y2="312" stroke="#f472b6" stroke-width="0.5" opacity="0.08"/>
    <polygon points="935.3826859021799,98.5 935.3826859021799,125.5 912,139 888.6173140978201,125.5 888.6173140978201,98.5 912,85" fill="none" stroke="#f472b6" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#f472b6"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#f472b6" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f472b6">🏗️ アーキテクチャ — レッスン 24</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 24: マイクロサービスおよび</tspan>
      <tspan x="60" dy="42">マイクロフロントエンド</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 8: CI/CD および導入戦略</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## はじめに

10 個以上のマイクロサービスと 5 個以上のマイクロ フロントエンドを備えた CI/CD パイプラインは、独立したデプロイメントの **バックボーン** です。この記事では、コミットから本番までのエンドツーエンドのパイプラインを設計します。


![CI/CD Pipeline cho Microservices + Micro Frontend](/storage/uploads/2026/04/mfe-ms-diagram-bai24-cicd-pipeline.webp)

---

## 1. CI/CD アーキテクチャ

```
┌─────────────────────────────────────────────────┐
│ Developer pushes code                           │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────┐
│ CI Pipeline (GitHub Actions)                    │
│ ┌─────────┐ ┌──────────┐ ┌───────────────────┐ │
│ │  Lint   │ │  Build   │ │  Test             │ │
│ │  & Type │→│  & Compile│→│  Unit + Integration│ │
│ │  Check  │ │          │ │  + Contract       │ │
│ └─────────┘ └──────────┘ └───────────────────┘ │
│                                    │            │
│                     ┌──────────────┴──────────┐ │
│                     │ Docker Build & Push     │ │
│                     │ → Container Registry    │ │
│                     └──────────────┬──────────┘ │
└────────────────────────────────────┼────────────┘
                                     │
┌────────────────────────────────────┴────────────┐
│ CD Pipeline (ArgoCD - GitOps)                   │
│                                                 │
│ ┌──────────┐  ┌──────────┐  ┌────────────────┐ │
│ │ Staging  │→ │  Smoke   │→ │  Production    │ │
│ │ Deploy   │  │  Tests   │  │  Deploy        │ │
│ │          │  │          │  │  (Progressive) │ │
│ └──────────┘  └──────────┘  └────────────────┘ │
└─────────────────────────────────────────────────┘
```

---

## 2. CI パイプライン (GitHub アクション)

### 2.1 マイクロサービス パイプライン

```yaml
# .github/workflows/service-ci.yml
name: Service CI

on:
  push:
    paths:
      - 'services/product-service/**'
      - 'packages/shared-types/**'

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Lint & Type Check
        run: turbo lint typecheck --filter=product-service

      - name: Unit Tests
        run: turbo test --filter=product-service

      - name: Integration Tests
        run: turbo test:integration --filter=product-service
        services:
          postgres:
            image: postgres:16
            env:
              POSTGRES_DB: test

      - name: Contract Verification
        run: turbo test:pact --filter=product-service

      - name: Docker Build & Push
        run: |
          docker build -t ghcr.io/company/product-service:${{ github.sha }} \
            -f services/product-service/Dockerfile .
          docker push ghcr.io/company/product-service:${{ github.sha }}
```

### 2.2 マイクロ フロントエンド パイプライン

```yaml
# .github/workflows/mfe-ci.yml
name: MFE CI

on:
  push:
    paths:
      - 'apps/product-mfe/**'
      - 'packages/shared-ui/**'

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install & Build
        run: turbo build --filter=product-mfe...

      - name: Test
        run: turbo test --filter=product-mfe

      - name: Visual Regression
        uses: chromatic/action@v1
        with:
          projectToken: ${{ secrets.CHROMATIC_TOKEN }}

      - name: Deploy to CDN
        run: |
          aws s3 sync apps/product-mfe/dist/ \
            s3://mfe-cdn/product-mfe/${{ github.sha }}/
          aws cloudfront create-invalidation \
            --distribution-id $CF_ID \
            --paths "/product-mfe/*"
```

---

## 3. Docker のマルチステージビルド

```dockerfile
# services/product-service/Dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --production=false
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS runner
WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
USER appuser
EXPOSE 8080
CMD ["node", "dist/main.js"]
```

---

## 4. ArgoCD を使用した GitOps

### 4.1 GitOps ワークフロー

```
Developer pushes code → CI builds image → CI updates manifests repo
                                                    │
ArgoCD watches manifests repo ──────────────────────┘
ArgoCD syncs K8s cluster to match manifests
```

### 4.2 オーバーレイのカスタマイズ

```yaml
# k8s/overlays/production/product-service.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: product-service
spec:
  replicas: 3
  template:
    spec:
      containers:
        - name: product-service
          image: ghcr.io/company/product-service:abc123
          resources:
            requests:
              cpu: 100m
              memory: 256Mi
            limits:
              cpu: 500m
              memory: 512Mi
```

---

## 5. 並列パイプライン

```
Commit changes to:
├── services/product-service/ → Product Service Pipeline
├── apps/product-mfe/         → Product MFE Pipeline
└── packages/shared-ui/       → Shared UI Pipeline
                                  ↓
                              Triggers dependent:
                              → Product MFE Pipeline
                              → Cart MFE Pipeline
                              → All MFE consumers
```

ターボレポ `--filter=...[origin/main]` 影響を受けるパッケージを自動的に検出します。

---

## 6. パイプラインのベストプラクティス

|練習 |説明 |
|----------|----------|
| **早く失敗してください** | Lint → ユニット → 統合 (最初は少し時間がかかります) |
| **パラレルジョブ** | Lint + テストを並行して実行 |
| **キャッシング** | npm キャッシュ、Docker レイヤー キャッシュ、Turborepo リモート キャッシュ |
| **影響を受けるのみ** |ビルド/テスト パッケージのみが変更されます |
| **不変のアーティファクト** | git SHA を使用してイメージにタグを付ける |
| **GitOps** |個別の構成リポジトリ、ArgoCD 同期 |

---

## 概要

- **CI**: Lint → ビルド → テスト → Docker → プッシュ (サービス/MFE ごと)
- **CD**: ArgoCD を使用した GitOps、宣言型 K8s マニフェスト
- **Turborepo**: 影響を受けた検出、ビルド パッケージのみが変更されました
- **Docker マルチステージ**: 小規模で安全な運用イメージ
- **並列パイプライン**: 各サービス/MFE には独自のパイプラインがあります。

---

**次の記事:** [レッスン 25: 導入戦略 — ブルー/グリーン、カナリア、ローリング](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-25-deployment-strategies-blue-green-canary-rolling)
