---
id: 019d8a22-c321-7a10-b001-a1b2c3d4e521
title: 'レッスン 21: マイクロサービス用の CI/CD パイプライン'
slug: bai-21-cicd-pipeline-cho-microservices
description: >-
  マルチサービスの CI/CD アーキテクチャ、サービスごとのパイプライン、ビルド → テスト → スキャン → デプロイ フロー、コンテナ
  イメージのビルドとプッシュ、自動テスト戦略 (ユニット、統合、コントラクト、E2E)、モノリポジトリとポリリポジトリの CI/CD。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 21
section_title: 'パート 7: CI/CD および導入戦略'
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: クラウドネイティブのマイクロサービスアーキテクチャ
  slug: cloud-native-microservices-architecture
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-4277" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-4277)"/>

  <!-- Decorations -->
  <g>
    <circle cx="1075" cy="95" r="18" fill="#fb923c" opacity="0.1"/>
    <circle cx="1050" cy="30" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="1025" cy="225" r="28" fill="#fb923c" opacity="0.1"/>
    <circle cx="1000" cy="160" r="33" fill="#fb923c" opacity="0.05"/>
    <circle cx="975" cy="95" r="8" fill="#fb923c" opacity="0.1"/>
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
    <line x1="600" y1="225" x2="1100" y2="305" stroke="#fb923c" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="255" x2="1050" y2="325" stroke="#fb923c" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1059.6410161513775,205 1059.6410161513775,245 1025,265 990.3589838486224,245 990.3589838486224,205 1025,185" fill="none" stroke="#fb923c" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fb923c"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fb923c" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ アーキテクチャ — レッスン 21</text>

  <!-- Title -->
  <text x="60" y="160" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 21: マイクロサービス用の CI/CD パイプライン</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="222" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">クラウドネイティブのマイクロサービスアーキテクチャ</text>

  <!-- Section -->
  <text x="60" y="246" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 7: CI/CD および導入戦略</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![レッスン 21: マイクロサービス用の CI/CD パイプライン](/storage/uploads/2026/03/cn-bai-21-diagram.webp)

## はじめに

マイクロサービスは、**迅速かつ安全にデプロイできる**場合にのみ価値をもたらします。優れた CI/CD がなければ、マイクロサービスはモノリスよりも負担になります。数十のサービスを手動でデプロイする必要があり、それぞれのデプロイメントは危険なイベントです。

マイクロサービスにおける CI/CD の目標: 各チームは自信を持って独立して、**1 日に複数回**、サービスをデプロイします。

---

## 1. CI/CD アーキテクチャの概要

### 1.1 サービスごとのパイプライン

各サービスにはコード変更によってトリガーされる独自のパイプラインがあります。

```
Microservices CI/CD Model:

team-order pushes to order-service repo
       ↓
GitHub Actions (order-service pipeline)
       ↓
Build → Test → Scan → Push Image → Deploy Staging → Deploy Prod

team-payment pushes to payment-service repo (cùng lúc)
       ↓
GitHub Actions (payment-service pipeline)
       ↓
Build → Test → Scan → Push Image → Deploy Staging → Deploy Prod

→ Hai pipeline chạy song song, độc lập hoàn toàn
```

### 1.2 パイプラインステージ

```
┌─────────────────────────────────────────────────────────────┐
│                       CI Pipeline                           │
│                                                             │
│  ┌─────────┐  ┌────────┐  ┌────────┐  ┌─────────────────┐ │
│  │  Build  │→ │  Test  │→ │  Scan  │→ │  Build & Push   │ │
│  │         │  │        │  │        │  │  Container Image│ │
│  └─────────┘  └────────┘  └────────┘  └────────┬────────┘ │
└──────────────────────────────────────────────── ┼ ─────────┘
                                                  │
┌──────────────────────────────────────────────── ┼ ─────────┐
│                       CD Pipeline               │          │
│                                                 ▼          │
│  ┌────────────────┐  ┌─────────────────────────────────┐  │
│  │ Deploy Staging │→ │     Integration Tests / E2E     │  │
│  └────────────────┘  └──────────────┬──────────────────┘  │
│                                     │ (pass)               │
│                       ┌─────────────▼──────────────┐       │
│                       │  Manual Approval (Prod)     │       │
│                       └─────────────┬──────────────┘       │
│                                     ▼                       │
│                       ┌─────────────────────────┐          │
│                       │   Deploy Production      │          │
│                       │   (Canary → Full)        │          │
│                       └─────────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. CI パイプライン — GitHub アクション

### 2.1 Java サービスの完全なパイプライン

```yaml
# .github/workflows/ci.yml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  REGISTRY: registry.example.com
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_DB: test_db
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-retries 5
      redis:
        image: redis:7
        options: --health-cmd "redis-cli ping" --health-retries 5

    steps:
      - uses: actions/checkout@v4

      - name: Set up JDK 21
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
          cache: gradle

      - name: Run tests
        run: ./gradlew test integrationTest --no-daemon
        env:
          SPRING_DATASOURCE_URL: jdbc:postgresql://localhost:5432/test_db
          SPRING_REDIS_HOST: localhost

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-results
          path: build/reports/tests/

      - name: Code coverage check
        run: ./gradlew jacocoTestCoverageVerification --no-daemon
        # Fail nếu coverage < 80%

  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: SAST — SonarQube
        uses: SonarSource/sonarcloud-github-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}

      - name: Dependency vulnerability scan
        run: ./gradlew dependencyCheckAnalyze --no-daemon
        # OWASP Dependency-Check, fail on CVSS >= 7

  build-image:
    needs: [build-and-test, security-scan]
    runs-on: ubuntu-latest
    outputs:
      image-tag: ${{ steps.meta.outputs.tags }}
      image-digest: ${{ steps.build.outputs.digest }}

    steps:
      - uses: actions/checkout@v4

      - name: Generate image metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=sha,prefix=sha-
            type=ref,event=branch
            type=semver,pattern={{version}}

      - name: Build and push image
        id: build
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          provenance: true   # SLSA provenance
          sbom: true         # Software Bill of Materials

      - name: Container image vulnerability scan (Trivy)
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}@${{ steps.build.outputs.digest }}
          format: 'sarif'
          exit-code: '1'
          severity: 'CRITICAL,HIGH'
```

### 2.2 Pact による契約テスト

消費者主導の契約テストにより、サービス間の API 互換性が保証されます。

```java
// Order Service (Consumer) định nghĩa contract
@ExtendWith(PactConsumerTestExt.class)
@PactTestFor(providerName = "payment-service")
class PaymentServiceContractTest {

    @Pact(consumer = "order-service")
    RequestResponsePact createPact(PactDslWithProvider builder) {
        return builder
            .given("payment method is valid")
            .uponReceiving("a charge request")
                .path("/charges")
                .method("POST")
                .body(new PactDslJsonBody()
                    .stringType("orderId")
                    .numberType("amount")
                    .stringValue("currency", "VND"))
            .willRespondWith()
                .status(201)
                .body(new PactDslJsonBody()
                    .stringType("chargeId")
                    .stringValue("status", "SUCCESS"))
            .toPact();
    }

    @Test
    void testChargeRequest(MockServer mockServer) {
        PaymentClient client = new PaymentClient(mockServer.getUrl());
        ChargeResponse response = client.charge(new ChargeRequest("O-001", 500000, "VND"));
        assertThat(response.getStatus()).isEqualTo("SUCCESS");
    }
}
```

```yaml
# CI: verify Payment Service còn match contract
- name: Publish contract
  run: ./gradlew pactPublish
  env:
    PACT_BROKER_URL: https://pact-broker.internal
    PACT_BROKER_TOKEN: ${{ secrets.PACT_TOKEN }}

# Payment Service CI:
- name: Verify consumer contracts
  run: ./gradlew pactVerify
```

---

## 3. CD パイプライン — Kubernetes へのデプロイ

### 3.1 GitOps リポジトリのイメージ タグを更新する

```yaml
# Sau khi build image, CD pipeline cập nhật manifest repo
- name: Update K8s manifest
  run: |
    git clone https://github.com/myorg/k8s-manifests.git
    cd k8s-manifests
    
    # Update image tag
    yq e '.spec.template.spec.containers[0].image = "${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ steps.meta.outputs.version }}"' \
      -i services/order-service/overlays/staging/deployment.yaml
    
    git config user.email "ci@example.com"
    git config user.name "CI Bot"
    git add .
    git commit -m "chore: update order-service image to ${{ steps.meta.outputs.version }}"
    git push

# ArgoCD auto-sync sẽ detect change và deploy
```

### 3.2 導入後のスモークテスト

```yaml
- name: Wait for deploy and run smoke tests
  run: |
    # Đợi rollout hoàn thành
    kubectl rollout status deployment/order-service \
      -n services-staging --timeout=5m

    # Chạy smoke tests
    ./gradlew smokeTest \
      --tests "com.example.SmokeTest" \
      -Dbase.url=https://staging-api.example.com
```

```java
// Smoke Test — kiểm tra luồng cơ bản hoạt động
@SpringBootTest
@Tag("smoke")
class SmokeTest {
    @Test
    void healthEndpointIsUp() {
        given()
            .get(baseUrl + "/actuator/health")
            .then()
            .statusCode(200)
            .body("status", equalTo("UP"));
    }

    @Test
    void canCreateAndRetrieveOrder() {
        String orderId = given()
            .contentType(ContentType.JSON)
            .body("""{"customerId":"C-001","items":[{"productId":"P-1","qty":1}]}""")
            .post(baseUrl + "/api/orders")
            .then().statusCode(201)
            .extract().path("id");

        given()
            .get(baseUrl + "/api/orders/" + orderId)
            .then()
            .statusCode(200)
            .body("id", equalTo(orderId));
    }
}
```

---

## 4. モノレポとポリリポ

### 4.1 Polyrepo (サービスごとに個別のリポジトリ)

```
github.com/myorg/order-service      (1 repo)
github.com/myorg/payment-service    (1 repo)
github.com/myorg/inventory-service  (1 repo)
```

**利点**: 
- チームは完全に独立しています
- より小さいコードベース、より高速なクローン/チェックアウト
- サービスごとのアクセス制御

**短所**: 
- 共有コードのリファクタリングが難しい
- 契約テストがより複雑になる
- 「誰が私を破滅させたのか？」を見つけるのは難しい

### 4.2 モノレポ

```
github.com/myorg/platform/
  services/
    order-service/
    payment-service/
    inventory-service/
  shared/
    proto/          ← Shared protobuf definitions
    common/         ← Common utilities
  tools/
```

**利点**:
- サービス全体にわたるアトミックコミット
- 共有コードのリファクタリングが簡単
- コードベース全体を 1 か所で検索できる

**短所**:
- CI はスマートでなければなりません: ビルド/テスト サービスのみが変更されます
- 管理するにはNx、Turborepo、Bazelなどのツールが必要です

### 4.3 NX を使用した Monorepo CI (影響を受ける検出)

```yaml
# .github/workflows/ci.yml (monorepo)
- name: Detect affected services
  id: affected
  run: |
    AFFECTED=$(npx nx affected:apps --plain --base=origin/main)
    echo "services=$AFFECTED" >> $GITHUB_OUTPUT

- name: Build and test affected services
  run: |
    for service in ${{ steps.affected.outputs.services }}; do
      npx nx test $service
      npx nx build $service
      npx nx docker-build $service
    done
```

---

## 5. テスト戦略ピラミッド

```
                    /\
                   /  \  E2E Tests
                  / 10%\  (Slow, expensive, validates full flows)
                 /──────\
                /        \ Integration Tests
               /   30%    \ (Test service boundaries, DB, message queues)
              /────────────\
             /              \ Contract Tests
            /     20%        \ (API compatibility between services)
           /──────────────────\
          /                    \ Unit Tests
         /        40%           \ (Fast, isolated, business logic)
        /────────────────────────\
```

**単体テスト**: ビジネス ロジックをテストします。外部依存関係はなく、テストごとに 100 ミリ秒未満で実行されます。

**統合テスト**: 実際の DB/キャッシュ (TestContainers)、テスト リポジトリ、メッセージ ハンドラーを使用してサービスをテストします。

**契約テスト**: 協定 — 消費者が契約を定義し、プロバイダーが検証します。

**E2E テスト**: UI については Playwright/Cypress、API については REST 保証 — 最も重要なフローのみスモーク テストを行います。

---

## 6. ベストプラクティス

**フェイルファスト:**
```yaml
jobs:
  lint:          # Nhanh nhất, chạy đầu tiên
  unit-test:     # Song song với lint
  integration:   # Sau unit tests
  security-scan: # Song song với integration
  build-image:   # Sau tất cả tests pass
```

**不変のイメージ:**
```
❌ Sai: Deploy script pull latest image trên server
✅ Đúng: Mỗi commit → unique image tag (SHA-based)
         Deploy = thay đổi image tag trong manifest
```

**セマンティック バージョニング:**
```
feat: → minor version bump (1.2.0 → 1.3.0)
fix: → patch version bump (1.2.0 → 1.2.1)
BREAKING CHANGE → major version bump (1.2.0 → 2.0.0)
```

---

## 概要

|コンセプト |目的 |
|----------|----------|
|サービスごとのパイプライン |独立してデプロイし、相互にブロックしないでください。
|契約テスト | API の互換性を確保する |
|不変のイメージ |再現可能でロールバック可能な展開 |
|煙テスト |デプロイ後にサービスが動作することを確認する |
|テストピラミッド |スピードと自信のバランス |
| Monorepo nx が影響を受ける |テスト/ビルド サービスのみが変更されます |

**次の記事**: ArgoCD を使用した GitOps
