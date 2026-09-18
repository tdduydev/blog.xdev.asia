---
id: 019d8a22-c325-7a10-b001-a1b2c3d4e525
title: 第 25 課：秘密管理與容器安全
slug: bai-25-secrets-management-container-security
description: >-
  HashiCorp Vault、動態機密、Kubernetes 機密 + 密封機密、CSI 機密儲存驅動程式、容器映像掃描 (Trivy)、Pod
  安全標準、執行時間安全 (Falco)、供應鏈安全 (Sigstore/Cosign)。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 25
section_title: 第 8 部分：安全與生產準備狀況
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: 雲端原生微服務架構
  slug: cloud-native-microservices-architecture
locale: zh-tw
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#a78bfa">🏗️ Architecture — Lesson 25</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 25: Secrets Management & Containers</tspan>
      <tspan x="60" dy="42">安全性</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">雲端原生微服務架構</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 8 部分：安全與生產準備狀況</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![第 25 課：秘密管理與容器安全](/storage/uploads/2026/03/cn-bai-25-diagram.webp)

## 簡介

憑證外洩是資料外洩的主要原因之一——程式碼中的硬編碼密碼、向 Git 提交機密、不受保護的環境變數。

本文介紹了容器運作時的正確秘密管理系統和安全層。

---

## 1. Problem with regular Secrets

### 1.1 Common anti-patterns

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

### 1.2 秘密蔓延

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

## 2.HashiCorp 金庫

### 2.1 Vault Architecture

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

### 2.2 Dynamic Secrets — Database

Vault 建立臨時資料庫憑證，在 TTL 後自動撤銷：

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

**動態秘密的好處**：
- Each service instance has its own credentials
- 憑證自動過期 → 違規影響有限
- 切勿重複使用密碼
- 完整的審計跟踪

### 2.3 Vault 代理 Sidecar (Kubernetes)

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

## 3. Kubernetes Secrets — Best Practices

### 3.1 封印的秘密（Bitnami）

允許對 Git 進行加密提交機密：

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

### 3.2 External Secrets Operator

同步來自外部提供者的金鑰（Vault、AWS Secrets Manager、GCP Secret Manager）：

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

## 4. 容器鏡像安全

### 4.1 Secure Dockerfile

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

### 4.2 使用 Trivy 進行影像掃描

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

### 4.3 Supply Chain Security — Cosign

Sign and verify container images:

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

## 5. Pod 安全標準

### 5.1 Pod 安全准入

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

**政策層級**：
- `privileged`: No restrictions (used for infra, not for apps)
- `baseline`: Prevent common privilege escalations
- `restricted`: Hardened, follow security best practices

### 5.2 Pod/容器中的安全上下文

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

### 5.3 網路策略

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

## 6. 運行時安全 — Falco

Falco 偵測運行時的異常行為：

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

## 7. 安全檢查表

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

## 總結

|概念 |目的|
|------------|---------|
| Vault 動態秘密 | Temporary DB credentials, auto-expire |
| Vault 代理 Sidecar |無需更改程式碼即可將機密注入 Pod |
|密封的秘密|在 Git 中安全地加密秘密 |
|外部秘密運營商|從 Vault/AWS Secret Manager 同步到 K8s Secrets |
|瑣碎|容器鏡像漏洞掃描|
|聯合簽名 |簽署並驗證容器鏡像（供應鏈） |
| Pod 安全標準 |所有 pod 的基準規則 |
|網路政策 | Whitelist traffic flow between services |
|獵鷹 | Runtime anomaly detection |

**下一篇文章**：生產準備清單與部署路線圖
