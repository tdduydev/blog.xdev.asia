---
id: 019d8a22-c302-7a10-b001-a1b2c3d4e502
title: 'レッスン 2: コンテナーと Docker — アプリケーション パッケージング プラットフォーム'
slug: bai-2-container-docker-nen-tang-dong-goi-ung-dung
description: >-
  コンテナと VM、Docker アーキテクチャ、Dockerfile のベスト プラクティス、マルチステージ ビルド、イメージ セキュリティ
  スキャン、および基本的なコンテナ ネットワーキング。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 2
section_title: 'パート 1: クラウド ネイティブの基盤'
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: クラウドネイティブのマイクロサービスアーキテクチャ
  slug: cloud-native-microservices-architecture
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-495" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-495)"/>

  <!-- Decorations -->
  <g>
    <circle cx="812" cy="186" r="20" fill="#f87171" opacity="0.11"/>
    <circle cx="1024" cy="238" r="26" fill="#f87171" opacity="0.07"/>
    <circle cx="736" cy="30" r="32" fill="#f87171" opacity="0.13"/>
    <circle cx="948" cy="82" r="8" fill="#f87171" opacity="0.09"/>
    <circle cx="660" cy="134" r="14" fill="#f87171" opacity="0.05"/>
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
    <line x1="600" y1="226" x2="1100" y2="306" stroke="#f87171" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="256" x2="1050" y2="326" stroke="#f87171" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1061.507041555162,205.5 1061.507041555162,246.5 1026,267 990.492958444838,246.5 990.492958444838,205.5 1026,185" fill="none" stroke="#f87171" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#f87171"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#f87171" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f87171">🏗️ アーキテクチャ — レッスン 2</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 2: コンテナーと Docker — クローズド プラットフォーム</tspan>
      <tspan x="60" dy="42">アプリケーションパッケージ</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">クラウドネイティブのマイクロサービスアーキテクチャ</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 1: クラウド ネイティブの基盤</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![レッスン 2: コンテナーと Docker — アプリケーション パッケージング プラットフォーム](/storage/uploads/2026/03/cn-bai-2-diagram.webp)

## はじめに

コンテナはクラウドネイティブの基盤です。マイクロサービス アーキテクチャ内のすべてのサービスは、開発、ステージング、運用の間の一貫性を確保するためにコンテナ イメージにパッケージ化されています。この記事では、コンテナー、Docker、および重要なベスト プラクティスについて詳しく説明します。

---

## 1. コンテナと仮想マシンの比較

### 1.1 仮想マシン

```
┌──────────────────────────────────────┐
│           Host Hardware              │
├──────────────────────────────────────┤
│           Host OS (Linux)            │
├──────────────────────────────────────┤
│           Hypervisor (KVM/ESXi)      │
├────────────┬────────────┬────────────┤
│  Guest OS  │  Guest OS  │  Guest OS  │
│  (Ubuntu)  │  (CentOS)  │  (Debian)  │
├────────────┼────────────┼────────────┤
│  Libs/Bins │  Libs/Bins │  Libs/Bins │
├────────────┼────────────┼────────────┤
│   App A    │   App B    │   App C    │
└────────────┴────────────┴────────────┘
```

- 各 VM は **別の OS** (別のカーネル) を実行します
- リソース消費量: 500MB - OS のみ 2GB RAM
- 起動：30秒～数分
- 分離: 強力 (ハードウェアレベル)

### 1.2 コンテナ

```
┌──────────────────────────────────────┐
│           Host Hardware              │
├──────────────────────────────────────┤
│           Host OS (Linux Kernel)     │
├──────────────────────────────────────┤
│        Container Runtime (containerd)│
├────────────┬────────────┬────────────┤
│  Libs/Bins │  Libs/Bins │  Libs/Bins │
├────────────┼────────────┼────────────┤
│   App A    │   App B    │   App C    │
└────────────┴────────────┴────────────┘
```

- すべてのコンテナはホスト OS の **カーネルを共有**
- ライト: コンテナ イメージの場合は 5MB ～ 200MB
- 起動: < 1 秒
- Isolation: Process-level (namespaces + cgroups)

### 1.3 比較

|基準 | VM |コンテナ |
|----------|-----|-----------|
| Startup time | 30s - 5min | < 1s |
| Image size | GB | MB |
| RAM overhead | 500MB+ per VM | ~0 overhead |
| Isolation | Strong (hypervisor) | Process-level (namespace) |
| Density | 10-20 VMs per host | 100-1000 containers per host |
| Portability | Moderate | Excellent |

---

## 2. Docker Architecture

### 2.1 Core Components

```
┌─────────────────────────────────────────────────┐
│                Docker Client (CLI)               │
│  docker build, docker run, docker push           │
└───────────────────────┬─────────────────────────┘
                        │ REST API
┌───────────────────────▼─────────────────────────┐
│                Docker Daemon (dockerd)            │
│                                                   │
│  ┌──────────┐  ┌──────────────┐  ┌────────────┐ │
│  │  Images   │  │  Containers  │  │  Volumes   │ │
│  └──────────┘  └──────────────┘  └────────────┘ │
│  ┌──────────┐  ┌──────────────┐                  │
│  │ Networks  │  │  containerd  │                  │
│  └──────────┘  └──────┬───────┘                  │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│              Container Runtime (runc)             │
│         Linux Kernel: namespaces + cgroups        │
└─────────────────────────────────────────────────┘
```

### 2.2 Linux Kernel Features

コンテナは、Linux カーネルの 2 つのコア機能に基づいて構築されています。

**名前空間** — 分離:
- `pid` — プロセスの分離 (コンテナは自身のプロセスのみを認識します)
- `net` — ネットワーク分離 (各コンテナには独自のネットワーク スタックがあります)
- `mnt` — 独自のファイルシステムをマウントする
- `uts` — プライベートホスト名
- `ipc` — プロセス間通信を個別に行う
- `user` — ユーザー/グループ ID の個別のマッピング

**Cgroups** — リソース制限:
- CPU (millicores)
- Memory (bytes)
- Disk I/O
- Network bandwidth

---

## 3. Dockerfile Best Practices

### 3.1 Multi-stage Build

マルチステージ ビルドは、ビルド環境とランタイムを分離することで、コンパクトなイメージを作成するのに役立ちます。

```dockerfile
# === Stage 1: Build ===
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY . .
RUN npm run build

# === Stage 2: Runtime ===
FROM node:20-alpine
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

USER appuser
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1
CMD ["node", "dist/main.js"]
```

**結果**: イメージ ビルド ~800MB → イメージ ランタイム ~150MB

### 3.2 Layer Caching

Docker は各レイヤーをキャッシュします。キャッシュを最適化するために Dockerfile を調整します。

```dockerfile
# ✅ Tốt: Dependencies ít thay đổi → cache được layer này
COPY package*.json ./
RUN npm ci
# Source code thay đổi thường xuyên → chỉ invalidate từ đây
COPY . .
RUN npm run build

# ❌ Xấu: Mỗi lần thay đổi code → rebuild tất cả
COPY . .
RUN npm ci && npm run build
```

### 3.3 Security Best Practices

```dockerfile
# 1. Dùng specific version, KHÔNG dùng :latest
FROM node:20.11-alpine3.19

# 2. Chạy với non-root user
RUN addgroup -S app && adduser -S app -G app
USER app

# 3. Không copy file nhạy cảm
# .dockerignore:
# .env
# .git
# node_modules
# *.secret

# 4. Scan image trước khi push
# trivy image myapp:1.0.0
```

### 3.4 Java / Go / Python Examples

**Java (Spring Boot):**

```dockerfile
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
COPY gradle/ gradle/
COPY gradlew build.gradle.kts settings.gradle.kts ./
RUN ./gradlew dependencies --no-daemon
COPY src/ src/
RUN ./gradlew bootJar --no-daemon

FROM eclipse-temurin:21-jre-alpine
RUN addgroup -S app && adduser -S app -G app
COPY --from=build /app/build/libs/*.jar /app/app.jar
USER app
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
```

**Go:**

```dockerfile
FROM golang:1.22-alpine AS build
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /server ./cmd/server

FROM scratch
COPY --from=build /server /server
COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
EXPOSE 8080
ENTRYPOINT ["/server"]
```

一緒に行く `scratch` base image → image size ~10-15MB.

---

## 4. Container Networking

### 4.1 Docker Network Types

```
Bridge (default)     Host              None         Overlay (Swarm/K8s)
┌────────────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐
│ Container A    │  │Container │  │Container │  │ Host 1    Host 2 │
│ 172.17.0.2     │  │shares    │  │no network│  │ ┌─────┐  ┌─────┐│
│ Container B    │  │host's    │  │isolated  │  │ │ C-A │  │ C-B ││
│ 172.17.0.3     │  │network   │  │          │  │ └──┬──┘  └──┬──┘│
│      │         │  │stack     │  │          │  │    └────┬────┘   │
│ docker0 bridge │  │          │  │          │  │   VXLAN overlay  │
└────────────────┘  └──────────┘  └──────────┘  └──────────────────┘
```

### 4.2 Docker Compose Networking

```yaml
services:
  order-service:
    build: ./order-service
    ports:
      - "8080:8080"
    networks:
      - backend
    depends_on:
      postgres:
        condition: service_healthy

  payment-service:
    build: ./payment-service
    ports:
      - "8081:8080"
    networks:
      - backend

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: orders
      POSTGRES_USER: app
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - backend
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 5s
      timeout: 3s
      retries: 5

networks:
  backend:
    driver: bridge

volumes:
  pgdata:

secrets:
  db_password:
    file: ./secrets/db_password.txt
```

同じネットワーク内では、サービスは **サービス名** で相互に呼び出します。
```
order-service → http://payment-service:8080/api/pay
```

---

## 5. Image Registry

### 5.1 レジストリを使用した CI/CD パイプライン

```
Developer → Git Push → CI Pipeline:
  1. docker build -t registry.example.com/order-service:v1.2.3
  2. trivy image registry.example.com/order-service:v1.2.3
  3. docker push registry.example.com/order-service:v1.2.3
  4. Update K8s manifest → ArgoCD sync

Registry Options:
├── Docker Hub (public)
├── Harbor (self-hosted, recommended)
├── AWS ECR
├── Google Artifact Registry
└── GitHub Container Registry (ghcr.io)
```

### 5.2 Image Tagging Strategy

```bash
# ✅ Semantic versioning
registry.example.com/order-service:1.2.3
registry.example.com/order-service:1.2.3-alpine

# ✅ Git commit hash (immutable)
registry.example.com/order-service:abc123f

# ❌ KHÔNG dùng :latest trong production
registry.example.com/order-service:latest
```

---

## 6. まとめ

| Concept | Key Point |
|---------|-----------|
|コンテナと VM |コンテナーの軽量化、起動の高速化、高密度化 |
|多段階ビルド |ビルドとランタイムを分離してイメージ サイズを削減する |
|レイヤーキャッシュ |キャッシュを最適化するために Dockerfile を調整する |
|非 root ユーザー |常に非 root ユーザーでコンテナを実行する |
|画像スキャン |プッシュ前にスキャンし、危険な画像をブロック |
|ネットワーキング |同じネットワーク内のコンテナは、サービス名 | を介して相互に呼び出します。

> **次の記事**: Kubernetes アーキテクチャ — Kubernetes が何百ものコンテナをオーケストレーションし、自動的にスケールし、自己修復し、ライフサイクル全体を管理する方法。
