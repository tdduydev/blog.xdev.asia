---
id: 019e1a40-a116-7001-d001-f0a1b2c30116
title: 'レッスン 16: mTLS、サービス メッシュ、およびサービス間通信'
slug: bai-16-mtls-service-mesh
description: >-
  ヘルスケア マイクロサービス間の安全な通信: 相互 TLS (mTLS) 構成、cert-manager による証明書管理、ヘルスケア用 Istio
  Service Mesh、PeerAuthentication と AuthorizationPolicy、サーキット ブレーカー パターン、安全な
  gRPC 通信、Kubernetes 用のネットワーク ポリシー。
duration_minutes: 180
is_free: true
video_url: null
sort_order: 16
section_title: 'パート 4: Quarkus を使用したマイクロサービスの構築'
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-2659" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-2659)"/>

  <!-- Decorations -->
  <g>
    <circle cx="815" cy="255" r="28" fill="#fb923c" opacity="0.1"/>
    <circle cx="1030" cy="70" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="745" cy="145" r="18" fill="#fb923c" opacity="0.1"/>
    <circle cx="960" cy="220" r="13" fill="#fb923c" opacity="0.05"/>
    <circle cx="675" cy="35" r="8" fill="#fb923c" opacity="0.1"/>
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
    <line x1="600" y1="145" x2="1100" y2="225" stroke="#fb923c" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="175" x2="1050" y2="245" stroke="#fb923c" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1079.6410161513775,225 1079.6410161513775,265 1045,285 1010.3589838486224,265 1010.3589838486224,225 1045,205" fill="none" stroke="#fb923c" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fb923c"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fb923c" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ アーキテクチャ — レッスン 16</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 16: mTLS、サービス メッシュ、およびサービス間</tspan>
      <tspan x="60" dy="42">コミュニケーション</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 4: Quarkus を使用したマイクロサービスの構築</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. 安全なサービス間通信の概要

![ヘルスケア向け Istio を使用した mTLS サービス メッシュ — Envoy サイドカー、ネットワーク ポリシー](/storage/uploads/2026/04/healthcare-mtls-service-mesh.webp)

ヘルスケア マイクロサービス アーキテクチャでは、サービスはネットワーク経由で相互に通信しますが、そのネットワークは**決して信頼できるものではありません**。内部ネットワーク内であっても、攻撃者は次のことを行うことができます。

- **盗聴**: サービス間で PHI データを読み取る (中間者)
- **偽装**: サービスを偽装してデータを受信します
- **改ざん**: サービス間のリクエスト/レスポンスを変更する
- **横方向の移動**: 侵害された 1 つのサービスから別のサービスにアクセスします

mTLS とサービス メッシュは、上記の問題をすべて解決します。

＃＃＃１．１．サービス間通信の多層防御

![5 Security Layers cho Inter-Service Communication — Network → mTLS → AuthZ → JWT → Encryption](/storage/uploads/2026/04/healthcare-service-communication-layers.webp)

**5層の保護:**

- **レイヤー 1**: ネットワーク ポリシー (Kubernetes) — 名前空間の分離、ポッド間のファイアウォール、下り制限
- **レイヤー 2**: mTLS (Istio) — 自動証明書プロビジョニング、24 時間ローテーション、相互認証
- **レイヤー 3**: 認可ポリシー (Istio) — サービス間 ACL、パスベース、JWT クレームベース
- **レイヤー 4**: アプリケーション セキュリティ (Quarkus) — JWT 検証、RBAC、ビジネス ロジック承認
- **レイヤー 5**: ペイロード暗号化 (JWE) — フィールドレベルの暗号化、エンドツーエンドの暗号化

＃＃＃１．２． mTLS と一方向 TLS の比較

![一方向 TLS と相互 TLS (mTLS) の比較](/storage/uploads/2026/04/healthcare-tls-comparison.webp)

| |一方向TLS |相互 TLS (mTLS) |
|---|---|---|
|クライアント検証サーバー | ✓ | ✓ |
|サーバーはクライアントを検証します | ✗ | ✓ |
|接続 |どのクライアントでも接続可能 |両方とも認証されています |
|伝送チャネル |暗号化された |暗号化 + 検証済み |

## 2. Quarkus での mTLS 構成

＃＃＃２．１． Quarkus mTLS サーバー構成

```properties
# application.properties - Quarkus mTLS Server

# === TLS Server Configuration ===
quarkus.http.ssl.certificate.key-store-file=classpath:server-keystore.p12
quarkus.http.ssl.certificate.key-store-password=${KEYSTORE_PASSWORD}
quarkus.http.ssl.certificate.key-store-file-type=PKCS12

# === Client Certificate Verification (mTLS) ===
quarkus.http.ssl.client-auth=required
# Options: none (no mTLS), request (optional), required (mandatory)

# Trust store - chứa CA certificates được trust
quarkus.http.ssl.certificate.trust-store-file=classpath:server-truststore.p12
quarkus.http.ssl.certificate.trust-store-password=${TRUSTSTORE_PASSWORD}

# === TLS Protocol Configuration ===
quarkus.http.ssl.protocols=TLSv1.3,TLSv1.2
quarkus.http.ssl.cipher-suites=\
  TLS_AES_256_GCM_SHA384,\
  TLS_AES_128_GCM_SHA256,\
  TLS_CHACHA20_POLY1305_SHA256

# === HTTPS Only ===
quarkus.http.insecure-requests=disabled
quarkus.http.ssl-port=8443
```

＃＃＃２．２．証明書生成スクリプト

```bash
#!/bin/bash
# generate-mtls-certs.sh
# Tạo CA và certificates cho mTLS giữa microservices

set -euo pipefail

CERT_DIR="./certs"
CA_PASSWORD="ca-password-change-me"
VALIDITY_DAYS=365

mkdir -p "$CERT_DIR"

# === 1. Create Root CA ===
echo "=== Creating Root CA ==="
openssl req -x509 -newkey rsa:4096 \
    -keyout "$CERT_DIR/ca-key.pem" \
    -out "$CERT_DIR/ca-cert.pem" \
    -days $VALIDITY_DAYS \
    -subj "/O=Hospital Internal/CN=Healthcare CA" \
    -passout "pass:$CA_PASSWORD"

# === 2. Create Service Certificates ===
create_service_cert() {
    local SERVICE_NAME=$1
    local DNS_NAMES=$2

    echo "=== Creating cert for $SERVICE_NAME ==="

    # Generate key + CSR
    openssl req -newkey rsa:2048 -nodes \
        -keyout "$CERT_DIR/${SERVICE_NAME}-key.pem" \
        -out "$CERT_DIR/${SERVICE_NAME}.csr" \
        -subj "/O=Hospital Internal/CN=${SERVICE_NAME}"

    # Create extensions file for SAN
    cat > "$CERT_DIR/${SERVICE_NAME}-ext.cnf" << EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth, clientAuth
subjectAltName = $DNS_NAMES
EOF

    # Sign with CA
    openssl x509 -req \
        -in "$CERT_DIR/${SERVICE_NAME}.csr" \
        -CA "$CERT_DIR/ca-cert.pem" \
        -CAkey "$CERT_DIR/ca-key.pem" \
        -CAcreateserial \
        -out "$CERT_DIR/${SERVICE_NAME}-cert.pem" \
        -days $VALIDITY_DAYS \
        -extfile "$CERT_DIR/${SERVICE_NAME}-ext.cnf" \
        -passin "pass:$CA_PASSWORD"

    # Create PKCS12 keystore (for Quarkus)
    openssl pkcs12 -export \
        -in "$CERT_DIR/${SERVICE_NAME}-cert.pem" \
        -inkey "$CERT_DIR/${SERVICE_NAME}-key.pem" \
        -certfile "$CERT_DIR/ca-cert.pem" \
        -out "$CERT_DIR/${SERVICE_NAME}-keystore.p12" \
        -name "$SERVICE_NAME" \
        -passout "pass:${SERVICE_NAME}-ks-password"

    echo "  Created $CERT_DIR/${SERVICE_NAME}-keystore.p12"
}

# Create certs for each microservice
create_service_cert "patient-service" \
    "DNS:patient-service,DNS:patient-service.healthcare.svc.cluster.local,DNS:localhost"

create_service_cert "lab-service" \
    "DNS:lab-service,DNS:lab-service.healthcare.svc.cluster.local,DNS:localhost"

create_service_cert "pharmacy-service" \
    "DNS:pharmacy-service,DNS:pharmacy-service.healthcare.svc.cluster.local,DNS:localhost"

create_service_cert "api-gateway" \
    "DNS:api-gateway,DNS:api.hospital.internal,DNS:localhost"

# === 3. Create Trust Store (chứa CA cert) ===
keytool -importcert -alias healthcare-ca \
    -file "$CERT_DIR/ca-cert.pem" \
    -keystore "$CERT_DIR/truststore.p12" \
    -storetype PKCS12 \
    -storepass "truststore-password" \
    -noprompt

echo ""
echo "=== Certificates created successfully ==="
echo "CA cert:     $CERT_DIR/ca-cert.pem"
echo "Trust store: $CERT_DIR/truststore.p12"
```

＃＃＃２．３． mTLS を使用した Quarkus REST クライアント

```java
package vn.hospital.client;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import java.util.List;
import java.util.UUID;

@RegisterRestClient(configKey = "lab-service")
@Path("/api/v1/lab-results")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public interface LabServiceClient {

    @GET
    @Path("/patient/{patientId}")
    List<LabResultDTO> getByPatient(@PathParam("patientId") UUID patientId);
}
```

```properties
# REST Client mTLS Configuration
quarkus.rest-client.lab-service.url=https://lab-service.healthcare.svc.cluster.local:8443

# Client certificate (mTLS - prove our identity)
quarkus.rest-client.lab-service.key-store=classpath:patient-service-keystore.p12
quarkus.rest-client.lab-service.key-store-password=${PATIENT_KS_PASSWORD}

# Trust store (verify server certificate)
quarkus.rest-client.lab-service.trust-store=classpath:truststore.p12
quarkus.rest-client.lab-service.trust-store-password=${TRUSTSTORE_PASSWORD}

# Hostname verification
quarkus.rest-client.lab-service.hostname-verifier=DEFAULT
```

## 3. cert-manager による証明書管理

＃＃＃３．１．証明書マネージャーのインストール

```bash
# Install cert-manager trên Kubernetes
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.0/cert-manager.yaml

# Verify installation
kubectl get pods -n cert-manager
kubectl get crd | grep cert-manager
```

＃＃＃３．２．内部 CA 発行者

```yaml
# cert-manager/internal-ca-issuer.yaml
# Secret chứa CA key pair
apiVersion: v1
kind: Secret
metadata:
  name: healthcare-ca-key-pair
  namespace: cert-manager
type: kubernetes.io/tls
data:
  tls.crt: <base64-encoded-ca-cert>
  tls.key: <base64-encoded-ca-key>
---
# ClusterIssuer sử dụng internal CA
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: healthcare-internal-ca
spec:
  ca:
    secretName: healthcare-ca-key-pair
---
# Let's Encrypt cho external-facing services
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: platform-team@hospital.internal
    privateKeySecretRef:
      name: letsencrypt-prod-account
    solvers:
      - http01:
          ingress:
            class: nginx
```

＃＃＃３．３．サービス証明書

```yaml
# cert-manager/patient-service-cert.yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: patient-service-tls
  namespace: healthcare
spec:
  secretName: patient-service-tls-secret
  duration: 720h      # 30 days
  renewBefore: 168h    # Renew 7 days before expiry
  isCA: false

  privateKey:
    algorithm: RSA
    size: 2048

  usages:
    - server auth
    - client auth     # Important for mTLS

  dnsNames:
    - patient-service
    - patient-service.healthcare
    - patient-service.healthcare.svc
    - patient-service.healthcare.svc.cluster.local

  issuerRef:
    name: healthcare-internal-ca
    kind: ClusterIssuer
    group: cert-manager.io
```

＃＃＃３．４． cert-manager 証明書を使用した Kubernetes デプロイメント

```yaml
# k8s/patient-service-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: patient-service
  namespace: healthcare
  labels:
    app: patient-service
    version: v1
spec:
  replicas: 3
  selector:
    matchLabels:
      app: patient-service
  template:
    metadata:
      labels:
        app: patient-service
        version: v1
    spec:
      serviceAccountName: patient-service-sa
      containers:
        - name: patient-service
          image: hospital.internal/patient-service:1.0.0
          ports:
            - containerPort: 8443
              name: https
          volumeMounts:
            - name: tls-certs
              mountPath: /etc/tls
              readOnly: true
            - name: truststore
              mountPath: /etc/truststore
              readOnly: true
          env:
            - name: QUARKUS_HTTP_SSL_CERTIFICATE_KEY_STORE_FILE
              value: /etc/tls/keystore.p12
            - name: QUARKUS_HTTP_SSL_CERTIFICATE_KEY_STORE_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: patient-service-tls-password
                  key: password
            - name: QUARKUS_HTTP_SSL_CERTIFICATE_TRUST_STORE_FILE
              value: /etc/truststore/truststore.p12
          resources:
            requests:
              memory: "512Mi"
              cpu: "250m"
            limits:
              memory: "1Gi"
              cpu: "1000m"
          livenessProbe:
            httpGet:
              path: /q/health/live
              port: 8443
              scheme: HTTPS
            initialDelaySeconds: 30
          readinessProbe:
            httpGet:
              path: /q/health/ready
              port: 8443
              scheme: HTTPS
            initialDelaySeconds: 10
      volumes:
        - name: tls-certs
          secret:
            secretName: patient-service-tls-secret
        - name: truststore
          secret:
            secretName: healthcare-truststore
```

## 4. ヘルスケア向け Istio サービス メッシュ

＃＃＃４．１． Istio のインストール

```bash
# Install Istio with "strict" mTLS profile
istioctl install --set profile=default \
    --set meshConfig.defaultConfig.holdApplicationUntilProxyStarts=true \
    --set values.global.mtls.auto=true

# Enable sidecar injection cho healthcare namespace
kubectl label namespace healthcare istio-injection=enabled

# Verify
kubectl get pods -n istio-system
istioctl analyze -n healthcare
```

＃＃＃４．２．ヘルスケア サービスを備えた Istio アーキテクチャ

![Istio Service Mesh Architecture cho Healthcare — istiod + Envoy sidecars](/storage/uploads/2026/04/healthcare-istio-mesh.webp)

**アーキテクチャ:**

- **istio-system**: istiod コントロール プレーン (Citadel CA、パイロット構成、テレメトリ)
- **ヘルスケア名前空間**: Envoy サイドカー プロキシを含むポッド
  - 患者サービス + Envoy (mTLS、認証ポリシー、テレメトリ)
  - ラボサービス + 特使
- サービス間のすべてのトラフィックは Envoy → 自動 mTLS 暗号化を経由します

＃＃＃４．３． PeerAuthentication - STRICT mTLS

```yaml
# istio/peer-authentication.yaml

# Namespace-level: STRICT mTLS cho toàn bộ healthcare namespace
apiVersion: security.istio.io/v1
kind: PeerAuthentication
metadata:
  name: healthcare-strict-mtls
  namespace: healthcare
spec:
  mtls:
    mode: STRICT    # STRICT = bắt buộc mTLS, từ chối plaintext

---
# Mesh-level: Default STRICT cho toàn cluster
apiVersion: security.istio.io/v1
kind: PeerAuthentication
metadata:
  name: default
  namespace: istio-system
spec:
  mtls:
    mode: STRICT

---
# Exception: cho health check endpoints từ Kubernetes
apiVersion: security.istio.io/v1
kind: PeerAuthentication
metadata:
  name: patient-service-health
  namespace: healthcare
spec:
  selector:
    matchLabels:
      app: patient-service
  mtls:
    mode: STRICT
  portLevelMtls:
    8080:
      mode: PERMISSIVE  # Health check port cho kubelet
```

＃＃＃４．４． AuthorizationPolicy - サービス間のアクセス制御

```yaml
# istio/authorization-policies.yaml

# === Default Deny All ===
apiVersion: security.istio.io/v1
kind: AuthorizationPolicy
metadata:
  name: deny-all
  namespace: healthcare
spec:
  {}  # Empty spec = deny all

---
# === Patient Service: cho phép Gateway + Lab Service ===
apiVersion: security.istio.io/v1
kind: AuthorizationPolicy
metadata:
  name: patient-service-policy
  namespace: healthcare
spec:
  selector:
    matchLabels:
      app: patient-service
  action: ALLOW
  rules:
    # Rule 1: API Gateway có thể gọi tất cả endpoints
    - from:
        - source:
            principals:
              - "cluster.local/ns/healthcare/sa/api-gateway-sa"
      to:
        - operation:
            methods: ["GET", "POST", "PUT", "DELETE"]
            paths: ["/api/v1/*"]

    # Rule 2: Lab Service chỉ được gọi patient lookup
    - from:
        - source:
            principals:
              - "cluster.local/ns/healthcare/sa/lab-service-sa"
      to:
        - operation:
            methods: ["GET"]
            paths: ["/api/v1/patients/*"]

    # Rule 3: Health checks từ Kubernetes
    - from:
        - source:
            namespaces: ["kube-system"]
      to:
        - operation:
            methods: ["GET"]
            paths: ["/q/health/*"]

---
# === Lab Service: chỉ Patient Service + Gateway ===
apiVersion: security.istio.io/v1
kind: AuthorizationPolicy
metadata:
  name: lab-service-policy
  namespace: healthcare
spec:
  selector:
    matchLabels:
      app: lab-service
  action: ALLOW
  rules:
    - from:
        - source:
            principals:
              - "cluster.local/ns/healthcare/sa/api-gateway-sa"
              - "cluster.local/ns/healthcare/sa/patient-service-sa"
      to:
        - operation:
            methods: ["GET", "POST"]
            paths: ["/api/v1/lab-results/*"]

---
# === Pharmacy Service: chỉ Gateway + Patient Service ===
apiVersion: security.istio.io/v1
kind: AuthorizationPolicy
metadata:
  name: pharmacy-service-policy
  namespace: healthcare
spec:
  selector:
    matchLabels:
      app: pharmacy-service
  action: ALLOW
  rules:
    - from:
        - source:
            principals:
              - "cluster.local/ns/healthcare/sa/api-gateway-sa"
              - "cluster.local/ns/healthcare/sa/patient-service-sa"
      to:
        - operation:
            methods: ["GET", "POST"]
            paths: ["/api/v1/prescriptions/*"]

---
# === Database: chỉ services trong healthcare namespace ===
apiVersion: security.istio.io/v1
kind: AuthorizationPolicy
metadata:
  name: database-policy
  namespace: healthcare
spec:
  selector:
    matchLabels:
      app: postgresql
  action: ALLOW
  rules:
    - from:
        - source:
            namespaces: ["healthcare"]
            principals:
              - "cluster.local/ns/healthcare/sa/patient-service-sa"
              - "cluster.local/ns/healthcare/sa/lab-service-sa"
              - "cluster.local/ns/healthcare/sa/pharmacy-service-sa"
      to:
        - operation:
            ports: ["5432"]
```

## 5. 医療向け Istio トラフィック管理

＃＃＃５．１．サーキットブレーカー

```yaml
# istio/destination-rules.yaml

apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: patient-service-dr
  namespace: healthcare
spec:
  host: patient-service.healthcare.svc.cluster.local
  trafficPolicy:
    # mTLS settings
    tls:
      mode: ISTIO_MUTUAL

    # Connection pool
    connectionPool:
      tcp:
        maxConnections: 100
        connectTimeout: 5s
      http:
        h2UpgradePolicy: DEFAULT
        http1MaxPendingRequests: 100
        http2MaxRequests: 1000
        maxRequestsPerConnection: 10
        maxRetries: 3

    # Circuit breaker
    outlierDetection:
      consecutive5xxErrors: 5        # Trip after 5 consecutive 5xx
      interval: 10s                   # Check interval
      baseEjectionTime: 30s          # Eject for 30s
      maxEjectionPercent: 50         # Max 50% of hosts ejected
      minHealthPercent: 30           # Min healthy hosts

---
# === Canary deployment for patient-service ===
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: patient-service-versions
  namespace: healthcare
spec:
  host: patient-service
  trafficPolicy:
    tls:
      mode: ISTIO_MUTUAL
  subsets:
    - name: v1
      labels:
        version: v1
    - name: v2
      labels:
        version: v2

---
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: patient-service-vs
  namespace: healthcare
spec:
  hosts:
    - patient-service
  http:
    - match:
        - headers:
            x-canary:
              exact: "true"
      route:
        - destination:
            host: patient-service
            subset: v2
    - route:
        - destination:
            host: patient-service
            subset: v1
          weight: 95
        - destination:
            host: patient-service
            subset: v2
          weight: 5
```

＃＃＃５．２．再試行とタイムアウトのポリシー

```yaml
# istio/virtual-service-resilience.yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: lab-service-vs
  namespace: healthcare
spec:
  hosts:
    - lab-service
  http:
    - route:
        - destination:
            host: lab-service
      timeout: 30s
      retries:
        attempts: 3
        perTryTimeout: 10s
        retryOn: "5xx,reset,connect-failure,retriable-4xx"
```

## 6. Quarkus を使用して gRPC を保護する

＃＃＃６．１．医療サービス間通信のための gRPC

gRPC は、バイナリ プロトコル (プロトコル バッファ) と HTTP/2 多重化のおかげで、サービス間通信において REST よりも高いパフォーマンスを提供します。

```
┌─────────────────────────────────────────────────────────┐
│  REST vs gRPC cho Healthcare                             │
│                                                          │
│  REST (JSON):                                            │
│    + Dễ debug (human-readable)                           │
│    + Phổ biến, tooling tốt                               │
│    - Verbose (JSON serialization overhead)               │
│    - No streaming                                        │
│                                                          │
│  gRPC (Protobuf):                                        │
│    + Binary format (nhỏ hơn 10x)                         │
│    + HTTP/2 (multiplexing, streaming)                    │
│    + Strong typing (schema contract)                     │
│    + Built-in deadline/timeout                           │
│    - Khó debug (binary)                                  │
│    - Browser support hạn chế                             │
│                                                          │
│  Dùng REST cho: External APIs, FHIR endpoints            │
│  Dùng gRPC cho: Internal service-to-service calls        │
└─────────────────────────────────────────────────────────┘
```

＃＃＃６．２．プロトコルバッファの定義

```protobuf
// src/main/proto/patient_service.proto
syntax = "proto3";

package vn.hospital.grpc;

option java_package = "vn.hospital.grpc";
option java_outer_classname = "PatientServiceProto";

service PatientGrpcService {
    // Unary RPC - Get patient by ID
    rpc GetPatient (GetPatientRequest) returns (PatientResponse);

    // Server streaming - Get patient's lab results
    rpc GetLabResults (GetLabResultsRequest) returns (stream LabResultResponse);

    // Unary - Verify patient exists (for other services)
    rpc VerifyPatient (VerifyPatientRequest) returns (VerifyPatientResponse);
}

message GetPatientRequest {
    string patient_id = 1;
    string hospital_id = 2;     // For tenant isolation
    string requester_id = 3;    // For audit
}

message PatientResponse {
    string id = 1;
    string mrn = 2;
    string full_name = 3;       // Encrypted if needed
    string department = 4;
    string hospital_id = 5;
    int64 created_at = 6;
}

message GetLabResultsRequest {
    string patient_id = 1;
    string department = 2;
    int32 limit = 3;
}

message LabResultResponse {
    string id = 1;
    string test_name = 2;
    string result_value = 3;
    string unit = 4;
    string status = 5;
    int64 result_date = 6;
}

message VerifyPatientRequest {
    string patient_id = 1;
    string hospital_id = 2;
}

message VerifyPatientResponse {
    bool exists = 1;
    string department = 2;
}
```

＃＃＃６．３． Quarkus gRPC サービスの実装

```java
package vn.hospital.grpc;

import io.grpc.Status;
import io.quarkus.grpc.GrpcService;
import io.quarkus.security.identity.SecurityIdentity;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import org.jboss.logging.Logger;

@GrpcService
public class PatientGrpcServiceImpl implements PatientGrpcService {

    private static final Logger LOG = Logger.getLogger(PatientGrpcServiceImpl.class);

    @Inject
    SecurityIdentity identity;

    @Inject
    PatientRepository patientRepository;

    @Inject
    AuditService auditService;

    @Override
    public Uni<PatientServiceProto.PatientResponse> getPatient(
            PatientServiceProto.GetPatientRequest request) {

        String requesterId = request.getRequesterId();
        String hospitalId = request.getHospitalId();
        String patientId = request.getPatientId();

        // Audit log
        auditService.logAccess(requesterId, "GET_PATIENT", patientId);

        return patientRepository.findById(patientId, hospitalId)
            .onItem().ifNull().failWith(() ->
                Status.NOT_FOUND
                    .withDescription("Patient not found: " + patientId)
                    .asRuntimeException()
            )
            .map(patient -> PatientServiceProto.PatientResponse.newBuilder()
                .setId(patient.getId().toString())
                .setMrn(patient.getMrn())
                .setFullName(patient.getFullName())
                .setDepartment(patient.getDepartment())
                .setHospitalId(patient.getHospitalId())
                .build()
            );
    }

    @Override
    public Multi<PatientServiceProto.LabResultResponse> getLabResults(
            PatientServiceProto.GetLabResultsRequest request) {

        return patientRepository.findLabResults(
                request.getPatientId(),
                request.getDepartment(),
                request.getLimit())
            .map(result -> PatientServiceProto.LabResultResponse.newBuilder()
                .setId(result.getId().toString())
                .setTestName(result.getTestName())
                .setResultValue(result.getResultValue())
                .setUnit(result.getUnit())
                .setStatus(result.getStatus())
                .setResultDate(result.getResultDate().toEpochMilli())
                .build()
            );
    }

    @Override
    public Uni<PatientServiceProto.VerifyPatientResponse> verifyPatient(
            PatientServiceProto.VerifyPatientRequest request) {

        return patientRepository.exists(request.getPatientId(), request.getHospitalId())
            .map(result -> PatientServiceProto.VerifyPatientResponse.newBuilder()
                .setExists(result.exists())
                .setDepartment(result.department() != null ? result.department() : "")
                .build()
            );
    }
}
```

＃＃＃６．４． gRPC 構成

```properties
# application.properties - gRPC Configuration

# gRPC Server
quarkus.grpc.server.port=9000
quarkus.grpc.server.use-separate-server=true

# TLS cho gRPC
quarkus.grpc.server.ssl.certificate=classpath:server-cert.pem
quarkus.grpc.server.ssl.key=classpath:server-key.pem
quarkus.grpc.server.ssl.trust-store=classpath:truststore.p12

# gRPC client (Lab Service calling Patient Service)
quarkus.grpc.clients.patient-service.host=patient-service.healthcare.svc.cluster.local
quarkus.grpc.clients.patient-service.port=9000
quarkus.grpc.clients.patient-service.ssl.trust-store=classpath:truststore.p12

# Maven dependency
# <dependency>
#     <groupId>io.quarkus</groupId>
#     <artifactId>quarkus-grpc</artifactId>
# </dependency>
```

## 7. Kubernetes ネットワークポリシー

＃＃＃７．１．名前空間分離のためのネットワークポリシー

```yaml
# k8s/network-policies.yaml

# === Default Deny All trong healthcare namespace ===
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: healthcare
spec:
  podSelector: {}  # Apply to all pods
  policyTypes:
    - Ingress
    - Egress

---
# === Allow DNS resolution ===
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-dns
  namespace: healthcare
spec:
  podSelector: {}
  policyTypes:
    - Egress
  egress:
    - to: []
      ports:
        - port: 53
          protocol: UDP
        - port: 53
          protocol: TCP

---
# === Patient Service Network Policy ===
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: patient-service-netpol
  namespace: healthcare
spec:
  podSelector:
    matchLabels:
      app: patient-service
  policyTypes:
    - Ingress
    - Egress

  ingress:
    # Cho phép từ API Gateway
    - from:
        - podSelector:
            matchLabels:
              app: api-gateway
      ports:
        - port: 8443
          protocol: TCP
        - port: 9000  # gRPC
          protocol: TCP

    # Cho phép từ Lab Service (gRPC verify patient)
    - from:
        - podSelector:
            matchLabels:
              app: lab-service
      ports:
        - port: 9000  # gRPC only
          protocol: TCP

    # Istio sidecar communication
    - from:
        - podSelector:
            matchLabels:
              security.istio.io/tlsMode: istio
      ports:
        - port: 15090  # Envoy metrics
          protocol: TCP

  egress:
    # Cho phép tới PostgreSQL
    - to:
        - podSelector:
            matchLabels:
              app: postgresql
      ports:
        - port: 5432
          protocol: TCP

    # Cho phép tới Lab Service
    - to:
        - podSelector:
            matchLabels:
              app: lab-service
      ports:
        - port: 8443
          protocol: TCP

    # Cho phép tới Kafka
    - to:
        - podSelector:
            matchLabels:
              app: kafka
      ports:
        - port: 9093  # SSL
          protocol: TCP

    # Cho phép tới Vault
    - to:
        - namespaceSelector:
            matchLabels:
              name: vault
          podSelector:
            matchLabels:
              app: vault
      ports:
        - port: 8200
          protocol: TCP

    # Cho phép tới Keycloak
    - to:
        - namespaceSelector:
            matchLabels:
              name: auth
          podSelector:
            matchLabels:
              app: keycloak
      ports:
        - port: 8443
          protocol: TCP

---
# === Database Network Policy - Very Restrictive ===
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: postgresql-netpol
  namespace: healthcare
spec:
  podSelector:
    matchLabels:
      app: postgresql
  policyTypes:
    - Ingress
    - Egress

  ingress:
    # Chỉ cho phép từ service pods trong healthcare namespace
    - from:
        - podSelector:
            matchLabels:
              tier: service
      ports:
        - port: 5432
          protocol: TCP

  egress:
    # PostgreSQL chỉ cần egress cho replication
    - to:
        - podSelector:
            matchLabels:
              app: postgresql
      ports:
        - port: 5432
          protocol: TCP
```

## 8. mTLS による可観測性

### 8.1。キアリダッシュボード

```yaml
# istio/kiali.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: kiali
  namespace: istio-system
data:
  config.yaml: |
    auth:
      strategy: openid
      openid:
        client_id: kiali
        issuer_uri: https://keycloak.hospital.internal/realms/infrastructure
        scopes:
          - openid
          - profile
    deployment:
      accessible_namespaces:
        - healthcare
    external_services:
      prometheus:
        url: http://prometheus.monitoring:9090
      grafana:
        url: http://grafana.monitoring:3000
      tracing:
        url: http://jaeger-query.tracing:16686
```

### 8.2。イェーガー分散トレーシング

```yaml
# istio/jaeger-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: jaeger
  namespace: tracing
spec:
  replicas: 1
  selector:
    matchLabels:
      app: jaeger
  template:
    metadata:
      labels:
        app: jaeger
    spec:
      containers:
        - name: jaeger
          image: jaegertracing/all-in-one:1.54
          ports:
            - containerPort: 16686  # UI
            - containerPort: 14268  # Collector
          env:
            - name: COLLECTOR_OTLP_ENABLED
              value: "true"
            - name: SPAN_STORAGE_TYPE
              value: "elasticsearch"
            - name: ES_SERVER_URLS
              value: "http://elasticsearch.monitoring:9200"
```

### 8.3。 Quarkus トレース構成

```properties
# application.properties - OpenTelemetry Tracing

# Enable OpenTelemetry
quarkus.otel.enabled=true
quarkus.otel.exporter.otlp.endpoint=http://jaeger-collector.tracing:4317
quarkus.otel.exporter.otlp.protocol=grpc

# Service name
quarkus.otel.resource.attributes=service.name=patient-service,\
  service.version=1.0.0,\
  deployment.environment=production

# Sampling (production: sample 10%)
quarkus.otel.traces.sampler=parentbased_traceidratio
quarkus.otel.traces.sampler.arg=0.1

# Propagation
quarkus.otel.propagators=tracecontext,baggage,b3multi
```

### 8.4。 mTLS ヘルスのモニタリング

```yaml
# prometheus/mtls-alerts.yaml
groups:
  - name: mtls-health
    rules:
      - alert: MtlsCertExpiringSoon
        expr: |
          (certmanager_certificate_expiration_timestamp_seconds -
           time()) / 86400 < 7
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Certificate {{ $labels.name }} expires in < 7 days"

      - alert: MtlsConnectionFailed
        expr: |
          increase(istio_tcp_connections_closed_total{
            connection_security_policy="unknown"
          }[5m]) > 10
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "mTLS connection failures detected"

      - alert: UnauthorizedServiceAccess
        expr: |
          increase(istio_requests_total{
            response_code="403",
            reporter="destination"
          }[5m]) > 20
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Multiple 403 responses - possible unauthorized access attempt"

      - alert: PlaintextTrafficDetected
        expr: |
          istio_tcp_received_bytes_total{
            connection_security_policy="none"
          } > 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Plaintext (non-mTLS) traffic detected in healthcare namespace"
```

## 9. 開発用の Docker Compose

```yaml
# docker-compose-mtls-dev.yml
version: '3.8'

services:
  # Patient Service
  patient-service:
    build: ./patient-service
    ports:
      - "8443:8443"
      - "9000:9000"
    environment:
      QUARKUS_HTTP_SSL_CERTIFICATE_KEY_STORE_FILE: /etc/tls/patient-service-keystore.p12
      QUARKUS_HTTP_SSL_CERTIFICATE_KEY_STORE_PASSWORD: patient-ks-password
      QUARKUS_HTTP_SSL_CERTIFICATE_TRUST_STORE_FILE: /etc/tls/truststore.p12
      QUARKUS_HTTP_SSL_CERTIFICATE_TRUST_STORE_PASSWORD: truststore-password
      QUARKUS_HTTP_SSL_CLIENT_AUTH: required
    volumes:
      - ./certs:/etc/tls:ro
    depends_on:
      - postgresql
      - keycloak

  # Lab Service
  lab-service:
    build: ./lab-service
    ports:
      - "8444:8443"
    environment:
      QUARKUS_HTTP_SSL_CERTIFICATE_KEY_STORE_FILE: /etc/tls/lab-service-keystore.p12
      QUARKUS_HTTP_SSL_CERTIFICATE_KEY_STORE_PASSWORD: lab-ks-password
      QUARKUS_HTTP_SSL_CERTIFICATE_TRUST_STORE_FILE: /etc/tls/truststore.p12
      QUARKUS_HTTP_SSL_CERTIFICATE_TRUST_STORE_PASSWORD: truststore-password
      QUARKUS_HTTP_SSL_CLIENT_AUTH: required
    volumes:
      - ./certs:/etc/tls:ro
    depends_on:
      - postgresql

  # PostgreSQL
  postgresql:
    image: postgres:16
    environment:
      POSTGRES_DB: healthcare_db
      POSTGRES_USER: healthcare_app
      POSTGRES_PASSWORD: healthcare_password
    ports:
      - "5432:5432"
    volumes:
      - pg_data:/var/lib/postgresql/data

  # Keycloak
  keycloak:
    image: quay.io/keycloak/keycloak:24.0
    command: start-dev --import-realm
    environment:
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: admin
    volumes:
      - ./src/main/resources/healthcare-realm.json:/opt/keycloak/data/import/healthcare-realm.json
    ports:
      - "8180:8080"

volumes:
  pg_data:
```

## 概要

このレッスンでは、医療マイクロサービス向けの包括的な **安全なサービス間通信** を構築しました。

1. **Quarkus の mTLS**: クライアント証明書の検証、キーストア/トラストストア管理を使用して HTTPS サーバーを構成します
2. **証明書管理**: cert-manager は、内部 CA または Let's Encrypt を使用して証明書を自動的にプロビジョニングおよびローテーションします。
3. **Istio Service Mesh**: サイドカー プロキシが自動的に mTLS を適用し、アプリケーション コードを TLS ロジックから解放します。
4. **PeerAuthentication**: STRICT モードにより、メッシュ内のすべてのトラフィックが確実に暗号化されます。
5. **AuthorizationPolicy**: きめ細かいサービス間のアクセス制御 — Lab Service は患者 GET のみを呼び出すことができます
6. **トラフィック管理**: サーキットブレーカー、カナリア展開、回復力のための再試行ポリシー
7. **セキュア gRPC**: TLS、プロトコル バッファ、ストリーミングを備えた高性能のサービス間プロトコル
8. **NetworkPolicy**: Kubernetes レベルのファイアウォール - 各サービスのデフォルトの拒否ルールと明示的な許可ルール
9. **可観測性**: Kiali (サービス グラフ)、Jaeger (分散トレーシング)、証明書の健全性に関する Prometheus アラート

全体的なセキュリティ モデル:

```
NetworkPolicy (L3/L4) -> Istio mTLS (L4) -> AuthorizationPolicy (L7)
  -> JWT Validation (L7) -> RBAC (Application) -> Business Logic
```

## 演習

1. **mTLS セットアップ**: スクリプトを使用して CA 証明書とサービス証明書を作成する `generate-mtls-certs.sh`。 mTLS を使用して 2 つの Quarkus サービス (Patient + Lab) を構成します。テスト: 患者サービスは正常に検査サービスを呼び出しました。テスト: クライアント証明書のない要求は拒否されます (403)。

2. **Istio サービス メッシュ**: Minikube/Kind に Istio をインストールします。患者サービスと検査サービスを導入する `healthcare` 名前空間。サイドカー インジェクションを有効にします。 PeerAuthentication (STRICT) を作成します。 mTLS が等しいことを確認する `istioctl proxy-config` そしてキアリのダッシュボード。

3. **認可ポリシー**: デフォルトのすべて拒否ポリシーを作成します。許可: ゲートウェイ -> 患者サービス (すべての方法)、検査サービス -> 患者サービス (GET のみ)。テスト: 検査サービス POST から患者サービスへ -> 403。 テスト: 薬局サービス (ポリシーなし) -> 403。

4. **ネットワーク ポリシー + gRPC**: 患者サービス用のネットワーク ポリシーを作成します (ゲートウェイとラボからのみ受け入れられます)。患者認証のために gRPC サービスをデプロイします。 Lab Service は gRPC VerifyPatient を呼び出します。 Jaeger トレースでトラフィック フローを確認します。

---

---

<!-- SERIES-NAV:START -->
| ◀ 前の記事 |次の記事 ▶ |
|:---|---:|
| [レッスン 15: マイクロサービスにおけるエンドツーエンドのデータ暗号化](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-15-ma-hoa-du-lieu-end-to-end-microservices) | [レッスン 17: HIPAA 技術的保護措置 - 完全な実装チェックリスト](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-17-hipaa-technical-safeguards-implementation) |
<!-- SERIES-NAV:END -->
