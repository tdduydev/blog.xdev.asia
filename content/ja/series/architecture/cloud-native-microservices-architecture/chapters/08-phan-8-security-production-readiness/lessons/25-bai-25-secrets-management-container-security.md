---
id: 019d8a22-c325-7a10-b001-a1b2c3d4e525
title: 'レッスン 25: シークレット管理とコンテナーのセキュリティ'
slug: bai-25-secrets-management-container-security
description: >-
  HashiCorp Vault、動的シークレット、Kubernetes シークレット + シールされたシークレット、CSI シークレット ストア
  ドライバー、コンテナー イメージ スキャン (Trivy)、ポッド セキュリティ標準、ランタイム セキュリティ (Falco)、サプライ チェーン
  セキュリティ (Sigstore/Cosign)。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 25
section_title: 'パート 8: セキュリティと本番環境の準備'
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: クラウドネイティブのマイクロサービスアーキテクチャ
  slug: cloud-native-microservices-architecture
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-8654" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-8654)"/>

  <!-- Decorations -->
  <g>
    <circle cx="657" cy="221" r="30" fill="#a78bfa" opacity="0.060000000000000005"/>
    <circle cx="714" cy="198" r="11" fill="#a78bfa" opacity="0.07"/>
    <circle cx="771" cy="175" r="22" fill="#a78bfa" opacity="0.08"/>
    <circle cx="828" cy="152" r="33" fill="#a78bfa" opacity="0.09"/>
    <circle cx="885" cy="129" r="14" fill="#a78bfa" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <line x1="600" y1="111" x2="1100" y2="191" stroke="#a78bfa" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="141" x2="1050" y2="211" stroke="#a78bfa" stroke-width="0.5" opacity="0.08"/>
    <polygon points="933.5166604983954,98 933.5166604983954,124 911,137 888.4833395016046,124 888.4833395016046,98 911,85" fill="none" stroke="#a78bfa" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#a78bfa"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#a78bfa" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#a78bfa">🏗️ 建築 — レッスン 25</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 25: シークレット管理とコンテナー</tspan>
      <tspan x="60" dy="42">セキュリティ</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">クラウドネイティブのマイクロサービスアーキテクチャ</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 8: セキュリティと本番環境の準備</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![レッスン 25: シークレット管理とコンテナーのセキュリティ](/storage/uploads/2026/03/cn-bai-25-diagram.webp)

## はじめに

コード内のハードコーディングされたパスワード、Git へのコミットシークレット、保護されていない環境変数など、認証情報の漏洩はデータ侵害の主な原因の 1 つです。

この記事では、コンテナー ランタイムの適切なシークレット管理システムとセキュリティ層について説明します。

---

## 1. 通常の Secret の問題

### 1.1 一般的なアンチパターン

```bash
# ❌ Hardcode trong code
DB_PASSWORD="super_secret_123"

# ❌ Commit vào Git
echo "DB_PASSWORD=xxx" >> .env
git add .env && git commit -m "add config"

# ❌ Kubernetes Secret mặc định (base64, không phải encryption)
kubectl get secret db-secret -o yaml
# data:
#   password: c3VwZXJfc2VjcmV0  ← base64 decode = plaintext!

# ❌ Log secrets vô tình
logger.info("Connecting to DB with password: {}", password)
```

### 1.2 秘密のスプロール

```
Trong một hệ thống lớn:
- DB passwords (mỗi service có DB riêng)
- API keys (external services)
- TLS certificates
- SSH keys
- OAuth2 client secrets
- Encryption keys
- Webhook tokens

Vấn đề:
- Ai biết secret nào?
- Secret có bị rotate không?
- Secret có bị shared không cần thiết?
- Audit trail: ai access secret lúc mấy giờ?
```

---

## 2. HashiCorp 保管庫

### 2.1 ボールトのアーキテクチャ

```
┌─────────────────────────────────────────────────────────────┐
│                      HashiCorp Vault                        │
│                                                             │
│  ┌─────────────────┐  ┌──────────────────────────────────┐ │
│  │  Auth Methods   │  │        Secret Engines            │ │
│  │  - Kubernetes   │  │  ┌────────┐ ┌─────┐ ┌─────────┐ │ │
│  │  - JWT/OIDC     │  │  │  KV v2 │ │ PKI │ │Database │ │ │
│  │  - AppRole      │  │  │(static)│ │     │ │(dynamic)│ │ │
│  │  - AWS IAM      │  │  └────────┘ └─────┘ └─────────┘ │ │
│  └─────────────────┘  └──────────────────────────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           Audit Log (every access logged)           │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 動的シークレット — データベース

Vault は一時的なデータベース認証情報を作成し、TTL 後に自動的に取り消します。

```bash
# Cấu hình Vault Database Secret Engine
vault secrets enable database

vault write database/config/order-db \
  plugin_name=postgresql-database-plugin \
  connection_url="postgresql://{{username}}:{{password}}@postgres:5432/orders" \
  username="vault_root" \
  password="vault_root_password"

# Tạo role — Vault tạo user với template này
vault write database/roles/order-service \
  db_name=order-db \
  creation_statements="CREATE ROLE \"{{name}}\" WITH LOGIN PASSWORD '{{password}}' VALID UNTIL '{{expiration}}';
    GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO \"{{name}}\";" \
  default_ttl="1h" \
  max_ttl="24h"
```

```bash
# Service yêu cầu credentials
vault read database/creds/order-service
# Key             Value
# ---             -----
# lease_id        database/creds/order-service/abc123
# lease_duration  1h
# password        A1B2-randomly-generated
# username        v-k8s-order-x7j2k

# Sau 1 giờ, Vault tự động revoke user này!
```

**動的シークレットの利点**:
- 各サービス インスタンスには独自の資格情報があります。
- 認証情報は自動的に期限切れになる → 侵害の影響は限定的
- パスワードは決して再利用しないでください
- 完全な監査証跡

### 2.3 Vault エージェント サイドカー (Kubernetes)

```yaml
# Annotate pod để Vault Agent inject secrets
apiVersion: v1
kind: Pod
metadata:
  annotations:
    vault.hashicorp.com/agent-inject: "true"
    vault.hashicorp.com/role: "order-service"

    # Inject DB credentials vào file
    vault.hashicorp.com/agent-inject-secret-db: "database/creds/order-service"
    vault.hashicorp.com/agent-inject-template-db: |
      {{- with secret "database/creds/order-service" -}}
      spring.datasource.username={{ .Data.username }}
      spring.datasource.password={{ .Data.password }}
      {{- end }}
spec:
  serviceAccountName: order-service  # Service account cho Kubernetes auth
  containers:
    - name: order-service
      image: order-service:latest
      env:
        - name: SPRING_CONFIG_IMPORT
          value: "file:/vault/secrets/db"
      # Vault Agent sẽ mount /vault/secrets/ với credentials
```

---

## 3. Kubernetes の秘密 — ベスト プラクティス

### 3.1 封印された秘密 (ビットナミ)

暗号化されたコミット シークレットを Git に許可します。

```bash
# Cài Sealed Secrets Controller
helm install sealed-secrets \
  sealed-secrets/sealed-secrets \
  --namespace kube-system

# Tạo SealedSecret từ Kubernetes Secret
kubectl create secret generic db-secret \
  --from-literal=password="super_secret" \
  --dry-run=client -o yaml | \
  kubeseal --format yaml > sealed-db-secret.yaml

# sealed-db-secret.yaml an toàn để commit vào Git
# Chỉ cluster có private key mới decrypt được
```

```yaml
# sealed-db-secret.yaml (safe to commit)
apiVersion: bitnami.com/v1alpha1
kind: SealedSecret
metadata:
  name: db-secret
spec:
  encryptedData:
    password: AgBh3f2...  ← RSA encrypted, safe to store in Git
```

### 3.2 外部シークレット演算子

外部プロバイダーからのシークレットを同期します (Vault、AWS Secrets Manager、GCP Secret Manager):

```yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: order-db-secret
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: vault-backend
    kind: ClusterSecretStore

  target:
    name: order-db-k8s-secret   # Kubernetes Secret được tạo/update
    creationPolicy: Owner

  data:
    - secretKey: db-password     # Key trong Kubernetes Secret
      remoteRef:
        key: secret/order-service   # Path trong Vault
        property: db_password
```

```yaml
# ClusterSecretStore — cấu hình kết nối Vault
apiVersion: external-secrets.io/v1beta1
kind: ClusterSecretStore
metadata:
  name: vault-backend
spec:
  provider:
    vault:
      server: "http://vault.platform:8200"
      path: "secret"
      version: "v2"
      auth:
        kubernetes:
          mountPath: "kubernetes"
          role: "secret-reader"
```

---

## 4. コンテナイメージのセキュリティ

### 4.1 安全な Dockerfile

```dockerfile
# Stage 1: Build
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app
COPY . .
RUN ./gradlew bootJar --no-daemon

# Stage 2: Run — minimal base image
FROM eclipse-temurin:21-jre-alpine   # Alpine: nhỏ hơn, attack surface nhỏ hơn

# Tạo non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser                          # Không chạy root!

WORKDIR /app

# Copy chỉ artifact cần thiết
COPY --from=build --chown=appuser:appgroup /app/build/libs/*.jar app.jar

# Drop capabilities
RUN apk add --no-cache curl    # Chỉ install những gì cần thiết

EXPOSE 8080

# Health check tích hợp
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health/liveness || exit 1

ENTRYPOINT ["java", \
  "-XX:+UseContainerSupport", \
  "-XX:MaxRAMPercentage=75.0", \
  "-jar", "app.jar"]
```

### 4.2 Trivy による画像スキャン

```bash
# Scan image trước khi push
trivy image \
  --exit-code 1 \
  --severity CRITICAL,HIGH \
  --ignore-unfixed \
  order-service:latest

# Output:
# Total: 3 (HIGH: 2, CRITICAL: 1)
# ┌────────────────────────┬──────┬────────────┬───────────────────────┐
# │ Library                │ CVE  │  Severity  │  Fixed Version        │
# ├────────────────────────┼──────┼────────────┼───────────────────────┤
# │ org.springframework... │ ... │  CRITICAL  │  6.1.12 (update now!) │
```

```yaml
# CI Pipeline (GitHub Actions)
- name: Trivy vulnerability scan
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: ${{ env.IMAGE }}
    format: 'table'
    exit-code: '1'         # Fail CI nếu có CRITICAL/HIGH
    severity: 'CRITICAL,HIGH'
    ignore-unfixed: true    # Bỏ qua CVE chưa có fix

- name: Upload SARIF to GitHub Security
  if: always()
  uses: github/codeql-action/upload-sarif@v3
  with:
    sarif_file: trivy-results.sarif
```

### 4.3 サプライチェーンのセキュリティ — 共同署名

コンテナー イメージに署名して検証します。

```bash
# Ký image sau khi push (trong CI)
cosign sign \
  --key cosign.key \
  registry.example.com/order-service:sha-abc123

# Verify image trước khi deploy (trong admission webhook)
cosign verify \
  --key cosign.pub \
  registry.example.com/order-service:sha-abc123

# Kiểm tra SBOM (Software Bill of Materials)
cosign download sbom registry.example.com/order-service:sha-abc123
```

---

## 5. ポッドのセキュリティ標準

### 5.1 ポッドのセキュリティ アドミッション

```yaml
# Enforce restricted policy cho tất cả pods trong namespace
apiVersion: v1
kind: Namespace
metadata:
  name: services-prod
  labels:
    # Enforce: reject non-compliant pods
    pod-security.kubernetes.io/enforce: restricted
    # Warn: log warning nhưng không reject
    pod-security.kubernetes.io/warn: restricted
    # Audit: log audit event
    pod-security.kubernetes.io/audit: restricted
```

**ポリシーレベル**:
- `privileged`: 制限なし (アプリではなくインフラに使用)
- `baseline`: 共通権限の昇格を防止します
- `restricted`: 強化され、セキュリティのベストプラクティスに従います

### 5.2 ポッド/コンテナのセキュリティ コンテキスト

```yaml
spec:
  securityContext:
    runAsNonRoot: true        # Không chạy root
    runAsUser: 10001
    runAsGroup: 10001
    fsGroup: 10001
    seccompProfile:
      type: RuntimeDefault   # Seccomp filter mặc định

  containers:
    - name: order-service
      securityContext:
        allowPrivilegeEscalation: false   # Ngăn sudo/setuid
        readOnlyRootFilesystem: true      # Filesystem read-only
        capabilities:
          drop: ["ALL"]                   # Bỏ tất cả Linux capabilities
        runAsNonRoot: true
```

### 5.3 ネットワークポリシー

```yaml
# Chỉ cho phép order-service nhận traffic từ api-gateway
# Và gọi payment-service, inventory-service, postgresql
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: order-service-netpol
  namespace: services-prod
spec:
  podSelector:
    matchLabels:
      app: order-service

  policyTypes:
    - Ingress
    - Egress

  ingress:
    # Chỉ nhận từ api-gateway
    - from:
        - podSelector:
            matchLabels:
              app: api-gateway
      ports:
        - port: 8080

  egress:
    # Gọi payment-service
    - to:
        - podSelector:
            matchLabels:
              app: payment-service
      ports:
        - port: 8080

    # Gọi PostgreSQL
    - to:
        - podSelector:
            matchLabels:
              app: postgresql
      ports:
        - port: 5432

    # DNS resolution
    - to:
        - namespaceSelector: {}
      ports:
        - port: 53
          protocol: UDP
```

---

## 6. ランタイムセキュリティ — Falco

Falco は実行時に異常な動作を検出します。

```yaml
# Falco rules
- rule: Shell in container
  desc: Shell được spawn trong container — có thể là attack
  condition: >
    container and
    proc.name in (bash, sh, zsh) and
    not user.name in (trusted-users)
  output: >
    Shell spawned in container
    (user=%user.name container=%container.id image=%container.image.repository
    shell=%proc.name parent=%proc.pname cmdline=%proc.cmdline)
  priority: WARNING

- rule: Sensitive file read
  desc: Đọc file sensitive trong container
  condition: >
    open_read and
    container and
    fd.name in (/etc/shadow, /etc/passwd, /root/.ssh/id_rsa)
  output: >
    Sensitive file opened for reading
    (user=%user.name file=%fd.name container=%container.id)
  priority: CRITICAL

- rule: Outbound connection to unexpected IP
  desc: Container kết nối đến IP ngoài whitelist
  condition: >
    outbound and
    container and
    not net.dns.name contains "svc.cluster.local" and
    not fd.rip in (allowed-external-ips)
  priority: WARNING
```

---

## 7. セキュリティチェックリスト

```
Image Security:
□ Non-root user trong Dockerfile
□ Read-only root filesystem
□ Multi-stage build (no build tools in runtime image)
□ Regular base image updates / automated rebuild
□ Vulnerability scanning trong CI pipeline (Trivy)
□ Image signing (Cosign)

Runtime Security:
□ Pod Security Standards: restricted
□ No privileged containers
□ Drop ALL capabilities
□ Network Policies per service
□ Falco runtime monitoring
□ Resource limits đặt (prevent resource exhaustion attacks)

Secrets Management:
□ No secrets in code/Git
□ Vault hoặc External Secrets Operator
□ Dynamic secrets với short TTL
□ Secret rotation automated
□ Audit log cho secret access

Authentication:
□ mTLS service-to-service (Service Mesh)
□ JWT validation tại API Gateway
□ Short-lived access tokens (< 15 phút)
□ RBAC cho service accounts (least privilege)
```

---

## 概要

|コンセプト |目的 |
|----------|----------|
|ボールトの動的シークレット |一時的な DB 認証情報、自動期限切れ |
| Vault エージェント サイドカー |コードを変更せずにシークレットをポッドに挿入する |
|封印された秘密 | Git で安全に暗号化されたシークレット |
|外部シークレット オペレーター | Vault/AWS Secret Manager から K8s Secret への同期 |
|トリビー |コンテナイメージの脆弱性スキャン |
|連署 |コンテナー イメージの署名と検証 (サプライ チェーン) |
|ポッドのセキュリティ標準 |すべてのポッドのベースライン ルール |
|ネットワークポリシー |サービス間のホワイトリスト トラフィック フロー |
|ファルコン |ランタイム異常検出 |

**次の記事**: 運用準備チェックリストと展開ロードマップ
