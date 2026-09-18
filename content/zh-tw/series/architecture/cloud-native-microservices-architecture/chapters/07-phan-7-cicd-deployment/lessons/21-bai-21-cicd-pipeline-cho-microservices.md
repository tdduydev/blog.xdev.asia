---
id: 019d8a22-c321-7a10-b001-a1b2c3d4e521
title: 第 21 課：微服務的 CI/CD 管道
slug: bai-21-cicd-pipeline-cho-microservices
description: >-
  用於多服務的 CI/CD 架構、每個服務的管道、建置 → 測試 → 掃描 →
  部署流程、容器映像建置和推送、自動化測試策略（單元、整合、合約、E2E）、monorepo 與 polyrepo CI/CD。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 21
section_title: 第 7 部分：CI/CD 和部署策略
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: 雲端原生微服務架構
  slug: cloud-native-microservices-architecture
locale: zh-tw
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ 建築 — 第 21 課</text>

  <!-- Title -->
  <text x="60" y="160" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 21 課：微服務的 CI/CD 管道</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="222" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">雲端原生微服務架構</text>

  <!-- Section -->
  <text x="60" y="246" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 7 部分：CI/CD 和部署策略</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![第 21 課：微服務的 CI/CD 管道](/storage/uploads/2026/03/cn-bai-21-diagram.webp)

## 簡介

只有當您能夠**快速、安全地部署**時，微服務才會帶來價值。如果沒有良好的 CI/CD，微服務將成為比單體更大的負擔－必須手動部署數十個服務，每次部署都是一個危險的事件。

微服務中 CI/CD 的目標：每個團隊自信且獨立地**每天多次**部署其服務。

---

## 1. CI/CD 架構概述

### 1.1 每個服務的管道

每個服務都有自己的管道，由程式碼變更觸發：

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

### 1.2 管道階段

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

## 2. CI 管道 — GitHub Actions

### 2.1 Java服務的完整Pipeline

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

### 2.2 使用 Pact 進行合約測試

消費者驅動的合約測試確保服務之間的 API 相容性：

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

## 3. CD 管道 — 部署到 Kubernetes

### 3.1 更新 GitOps 儲存庫中的圖片標籤

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

### 3.2 部署後的冒煙測試

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

## 4. Monorepo 與 Polyrepo

### 4.1 Polyrepo（每個服務單獨的儲存庫）

```
github.com/myorg/order-service      (1 repo)
github.com/myorg/payment-service    (1 repo)
github.com/myorg/inventory-service  (1 repo)
```

**優點**：
- 團隊完全獨立
- 更小的程式碼庫，更快的克隆/結帳
- 每個服務的存取控制

**缺點**：
- 難以重構共享程式碼
- 合約測試更加複雜
- 很難找到“誰改變了什麼毀了我？”

### 4.2 Monorepo

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

**優點**：
- 跨服務的原子提交
- 易於重構共享程式碼
- 在一個地方可以找到整個程式碼庫

**缺點**：
- CI 必須智慧：僅更改建置/測試服務
- 需要 Nx、Turborepo、Bazel 等工具來管理

### 4.3 Monorepo CI 與 NX（受影響偵測）

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

## 5. 測試策略金字塔

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

**單元測試**：測試業務邏輯，無外部依賴項，每次測試運行時間 < 100 毫秒。

**整合測試**：使用真實資料庫/快取（測試容器）、測試儲存庫、訊息處理程序測試服務。

**合約測試**：契約－消費者定義合同，提供者驗證。

**E2E 測試**：Playwright/Cypress 用於 UI，REST Assured 用於 API — 僅冒煙測試是最重要的流程。

---

## 6. 最佳實踐

**快速失敗：**
```yaml
jobs:
  lint:          # Nhanh nhất, chạy đầu tiên
  unit-test:     # Song song với lint
  integration:   # Sau unit tests
  security-scan: # Song song với integration
  build-image:   # Sau tất cả tests pass
```

**不可變圖像：**
```
❌ Sai: Deploy script pull latest image trên server
✅ Đúng: Mỗi commit → unique image tag (SHA-based)
         Deploy = thay đổi image tag trong manifest
```

**語意版本控制：**
```
feat: → minor version bump (1.2.0 → 1.3.0)
fix: → patch version bump (1.2.0 → 1.2.1)
BREAKING CHANGE → major version bump (1.2.0 → 2.0.0)
```

---

## 總結

|概念 |目的|
|------------|---------|
|每項服務的管道 |獨立部署，互不遮擋 |
|合約測試|確保API相容性 |
|不可變映像 |可重複、可回滾的部署 |
|煙霧測試|部署後確認服務正常運作 |
|測試金字塔|速度與信心之間的平衡 |
| Monorepo nx 受影響 |僅測試/建置服務變更 |

**下一篇**：GitOps 與 ArgoCD
