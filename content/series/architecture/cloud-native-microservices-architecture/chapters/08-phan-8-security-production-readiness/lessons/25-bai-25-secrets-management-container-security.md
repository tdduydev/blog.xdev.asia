---
id: 019d8a22-c325-7a10-b001-a1b2c3d4e525
title: "Bài 25: Secrets Management & Container Security"
slug: bai-25-secrets-management-container-security
description: >-
  HashiCorp Vault, dynamic secrets, Kubernetes Secrets + Sealed Secrets,
  CSI Secret Store Driver, container image scanning (Trivy),
  Pod Security Standards, runtime security (Falco),
  supply chain security (Sigstore/Cosign).
duration_minutes: 90
is_free: true
video_url: null
sort_order: 25
section_title: "Phần 8: Security & Production Readiness"
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: "Cloud Native Microservices Architecture"
  slug: cloud-native-microservices-architecture
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#a78bfa">🏗️ Kiến trúc — Bài 25</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 25: Secrets Management &amp; Container</tspan>
      <tspan x="60" dy="42">Security</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Cloud Native Microservices Architecture</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 8: Security &amp; Production Readiness</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Bài 25: Secrets Management & Container Security](/storage/uploads/2026/03/cn-bai-25-diagram.webp)

## Giới thiệu

Credentials rò rỉ là một trong những nguyên nhân hàng đầu của data breach — hardcode password trong code, commit secret vào Git, environment variables không được bảo vệ.

Bài này trình bày hệ thống secrets management đúng đắn và các lớp bảo mật cho container runtime.

---

## 1. Vấn đề với Secrets thông thường

### 1.1 Anti-patterns phổ biến

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

### 1.2 Secret sprawl

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

## 2. HashiCorp Vault

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

Vault tạo database credentials tạm thời, tự động revoke sau TTL:

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

**Lợi ích của Dynamic Secrets**:
- Mỗi service instance có credentials riêng
- Credentials expire tự động → breach impact limited
- Không bao giờ reuse password
- Full audit trail

### 2.3 Vault Agent Sidecar (Kubernetes)

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

### 3.1 Sealed Secrets (Bitnami)

Cho phép commit encrypted secrets vào Git:

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

Sync secrets từ external providers (Vault, AWS Secrets Manager, GCP Secret Manager):

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

## 4. Container Image Security

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

### 4.2 Image Scanning với Trivy

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

Ký và verify container images:

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

## 5. Pod Security Standards

### 5.1 Pod Security Admission

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

**Policy Levels**:
- `privileged`: Không hạn chế (dùng cho infra, không cho apps)
- `baseline`: Ngăn các privilege escalation phổ biến
- `restricted`: Hardened, follow security best practices

### 5.2 Security Context trong Pod/Container

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

### 5.3 Network Policies

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

## 6. Runtime Security — Falco

Falco detect anomalous behavior trong runtime:

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

## 7. Security Checklist

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

## Tóm tắt

| Khái niệm | Mục đích |
|-----------|---------|
| Vault Dynamic Secrets | DB credentials tạm thời, auto-expire |
| Vault Agent Sidecar | Inject secrets vào pod không cần code thay đổi |
| Sealed Secrets | Encrypted secrets an toàn trong Git |
| External Secrets Operator | Sync từ Vault/AWS Secret Manager vào K8s Secrets |
| Trivy | Container image vulnerability scanning |
| Cosign | Sign và verify container images (supply chain) |
| Pod Security Standards | Baseline rules cho tất cả pods |
| Network Policies | Whitelist traffic flow giữa services |
| Falco | Runtime anomaly detection |

**Bài tiếp theo**: Production Readiness Checklist & Lộ trình triển khai
