---
id: 019d8a22-c314-7a10-b001-a1b2c3d4e514
title: "Bài 14: Zero Trust Security & mTLS"
slug: bai-14-zero-trust-security-mtls
description: >-
  Zero Trust Architecture principles, mutual TLS (mTLS) cho service-to-service,
  certificate management tự động, authorization policies trong Service Mesh,
  network policies trong Kubernetes.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 14
section_title: "Phần 4: Service Mesh & Networking"
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: "Cloud Native Microservices Architecture"
  slug: cloud-native-microservices-architecture
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-6473" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-6473)"/>

  <!-- Decorations -->
  <g>
    <circle cx="952" cy="126" r="30" fill="#f87171" opacity="0.11"/>
    <circle cx="804" cy="158" r="26" fill="#f87171" opacity="0.07"/>
    <circle cx="656" cy="190" r="22" fill="#f87171" opacity="0.13"/>
    <circle cx="1008" cy="222" r="18" fill="#f87171" opacity="0.09"/>
    <circle cx="860" cy="254" r="14" fill="#f87171" opacity="0.05"/>
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
    <line x1="600" y1="146" x2="1100" y2="226" stroke="#f87171" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="176" x2="1050" y2="246" stroke="#f87171" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1081.507041555162,225.5 1081.507041555162,266.5 1046,287 1010.492958444838,266.5 1010.492958444838,225.5 1046,205" fill="none" stroke="#f87171" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#f87171"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#f87171" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f87171">🏗️ Kiến trúc — Bài 14</text>

  <!-- Title -->
  <text x="60" y="160" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 14: Zero Trust Security &amp; mTLS</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="222" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Cloud Native Microservices Architecture</text>

  <!-- Section -->
  <text x="60" y="246" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 4: Service Mesh &amp; Networking</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Bài 14: Zero Trust Security & mTLS](/storage/uploads/2026/03/cn-bai-14-diagram.webp)

## Giới thiệu

Trong mô hình truyền thống, bảo mật dựa vào **perimeter defense** — tin tưởng mọi thứ bên trong network. Trong cloud native, ranh giới network mờ nhạt, services có thể chạy ở nhiều nơi. **Zero Trust** đảo ngược: **never trust, always verify** — mọi request đều phải được xác thực và ủy quyền.

---

## 1. Zero Trust Principles

### 1.1 Core Tenets

```
Traditional (Castle-and-Moat):
┌────────────────────────────────────┐
│         Trusted Network             │
│  ┌────────┐ ┌────────┐ ┌────────┐ │
│  │Service │─│Service │─│Service │ │  ← Unencrypted, no auth
│  │   A    │ │   B    │ │   C    │ │
│  └────────┘ └────────┘ └────────┘ │
│                                    │
└──────────── Firewall ──────────────┘
                 ▲
            "Trust boundary"

Zero Trust:
┌────────────────────────────────────┐
│         NO Trusted Network          │
│  ┌────────┐ ┌────────┐ ┌────────┐ │
│  │Service │═│Service │═│Service │ │  ← mTLS, verified identity
│  │   A    │ │   B    │ │   C    │ │
│  └────────┘ └────────┘ └────────┘ │
│      ▲          ▲          ▲      │
│   Verified   Verified   Verified  │
│   Identity   Identity   Identity  │
└────────────────────────────────────┘
  Every request is authenticated & authorized
```

### 1.2 Zero Trust Pillars

```
1. Verify Explicitly
   → Authenticate every request (no implicit trust)
   → Validate identity via certificates (mTLS)

2. Least Privilege Access
   → Only allow required permissions
   → Deny by default, allow by exception

3. Assume Breach
   → Encrypt all traffic (even internal)
   → Segment network to limit blast radius
   → Monitor and log everything

4. Micro-segmentation
   → Fine-grained policies per service pair
   → Not just network-level, but application-level
```

---

## 2. Mutual TLS (mTLS)

### 2.1 TLS vs mTLS

```
Standard TLS (one-way):
  Client ──────────────────▶ Server
  Client verifies server certificate ✅
  Server does NOT verify client ❌
  → Phù hợp cho browser → web server

Mutual TLS (two-way):
  Client ◀═════════════════▶ Server
  Client verifies server certificate ✅
  Server verifies client certificate ✅
  → Cả hai bên chứng minh danh tính
  → Phù hợp cho service-to-service
```

### 2.2 mTLS Handshake Flow

```
Service A (Client)              Service B (Server)
     │                                │
     │── ClientHello ────────────────▶│
     │                                │
     │◀── ServerHello ────────────────│
     │◀── Server Certificate ─────────│  ← Server proves identity
     │◀── CertificateRequest ─────────│  ← Server asks for client cert
     │                                │
     │── Client Certificate ─────────▶│  ← Client proves identity
     │── ClientKeyExchange ──────────▶│
     │── CertificateVerify ──────────▶│
     │── Finished ───────────────────▶│
     │                                │
     │◀── Finished ───────────────────│
     │                                │
     │══ Encrypted Communication ════▶│
     │◀══════════════════════════════ │
```

### 2.3 SPIFFE Identity

**SPIFFE** (Secure Production Identity Framework for Everyone) cung cấp identity tiêu chuẩn:

```
SPIFFE ID Format:
  spiffe://cluster.local/ns/<namespace>/sa/<service-account>

Examples:
  spiffe://cluster.local/ns/default/sa/order-service
  spiffe://cluster.local/ns/payment/sa/payment-service

SVID (SPIFFE Verifiable Identity Document):
  → X.509 certificate chứa SPIFFE ID trong SAN field
  → Short-lived (typically 24h), auto-rotated
```

### 2.4 Istio mTLS Configuration

```yaml
# Enable STRICT mTLS for entire mesh
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: istio-system  # Mesh-wide
spec:
  mtls:
    mode: STRICT  # STRICT | PERMISSIVE | DISABLE

---
# Per-namespace override (if needed)
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: payment-namespace
  namespace: payment
spec:
  mtls:
    mode: STRICT
  portLevelMtls:
    8080:
      mode: STRICT
    9090:
      mode: PERMISSIVE  # Metrics port không cần mTLS
```

### 2.5 Linkerd mTLS

Linkerd **bật mTLS mặc định** cho tất cả meshed traffic:

```bash
# Verify mTLS is active
linkerd viz edges deployment

# Output:
# SRC             DST              SECURED
# order-service   payment-service  true  ← mTLS ✅
# order-service   inventory-svc    true  ← mTLS ✅
# web-frontend    order-service    true  ← mTLS ✅

# Check certificate details
linkerd identity -l app=order-service
```

---

## 3. Authorization Policies

### 3.1 Istio Authorization Policy

```yaml
# Deny all by default
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: deny-all
  namespace: default
spec:
  {}  # Empty spec = deny all

---
# Allow specific service-to-service communication
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: allow-order-to-payment
  namespace: payment
spec:
  selector:
    matchLabels:
      app: payment-service
  action: ALLOW
  rules:
    - from:
        - source:
            principals:
              - "cluster.local/ns/default/sa/order-service"
      to:
        - operation:
            methods: ["POST"]
            paths: ["/api/payments", "/api/payments/*"]

---
# Allow from API Gateway only
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: allow-gateway-to-order
  namespace: default
spec:
  selector:
    matchLabels:
      app: order-service
  action: ALLOW
  rules:
    - from:
        - source:
            principals:
              - "cluster.local/ns/gateway/sa/api-gateway"
    - from:
        - source:
            principals:
              - "cluster.local/ns/default/sa/saga-orchestrator"
```

### 3.2 Linkerd Authorization Policy

```yaml
# Server resource defines the service
apiVersion: policy.linkerd.io/v1beta2
kind: Server
metadata:
  name: payment-service
  namespace: payment
spec:
  podSelector:
    matchLabels:
      app: payment-service
  port: 8080
  proxyProtocol: HTTP/2

---
# Authorization policy
apiVersion: policy.linkerd.io/v1alpha1
kind: AuthorizationPolicy
metadata:
  name: allow-order-to-payment
  namespace: payment
spec:
  targetRef:
    group: policy.linkerd.io
    kind: Server
    name: payment-service
  requiredAuthenticationRefs:
    - name: order-service-identity
      kind: MeshTLSAuthentication
      group: policy.linkerd.io

---
apiVersion: policy.linkerd.io/v1alpha1
kind: MeshTLSAuthentication
metadata:
  name: order-service-identity
  namespace: payment
spec:
  identities:
    - "order-service.default.serviceaccount.identity.linkerd.cluster.local"
```

---

## 4. Kubernetes Network Policies

Defense in depth — network-level segmentation bổ sung cho service mesh:

```yaml
# Default deny all ingress
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
  namespace: default
spec:
  podSelector: {}  # All pods
  policyTypes:
    - Ingress

---
# Allow order-service → payment-service only
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-order-to-payment
  namespace: payment
spec:
  podSelector:
    matchLabels:
      app: payment-service
  policyTypes:
    - Ingress
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              name: default
          podSelector:
            matchLabels:
              app: order-service
      ports:
        - port: 8080
          protocol: TCP

---
# Allow DNS resolution
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-dns
  namespace: default
spec:
  podSelector: {}
  policyTypes:
    - Egress
  egress:
    - to:
        - namespaceSelector: {}
          podSelector:
            matchLabels:
              k8s-app: kube-dns
      ports:
        - port: 53
          protocol: UDP
        - port: 53
          protocol: TCP
```

---

## 5. Certificate Management

### 5.1 Automatic Certificate Rotation

```
Service Mesh Certificate Lifecycle:
┌───────────────────────────────────────┐
│         Certificate Authority          │
│         (Istio Citadel / Linkerd)      │
└──────────────────┬────────────────────┘
                   │
            Issue short-lived certs
            (default: 24h in Istio)
                   │
     ┌─────────────┼─────────────┐
     ▼             ▼             ▼
┌─────────┐  ┌─────────┐  ┌─────────┐
│ Cert    │  │ Cert    │  │ Cert    │
│ Valid   │  │ Valid   │  │ Valid   │
│ 24h     │  │ 24h     │  │ 24h     │
└────┬────┘  └────┬────┘  └────┬────┘
     │            │            │
  Auto-rotate   Auto-rotate   Auto-rotate
  before expiry before expiry before expiry
```

### 5.2 External CA Integration

```yaml
# Istio: Use cert-manager as CA
apiVersion: install.istio.io/v1alpha1
kind: IstioOperator
spec:
  meshConfig:
    caCertificates:
      - certSigners:
          - clusterissuers.cert-manager.io/istio-ca
  values:
    pilot:
      env:
        EXTERNAL_CA: ISTIOD_RA_KUBERNETES_API
```

---

## 6. Defense in Depth

### 6.1 Layer-by-layer security

```
Layer 1: Network Policies (Kubernetes)
  → IP-level segmentation
  → Namespace isolation

Layer 2: mTLS (Service Mesh)
  → Identity verification
  → Encrypted communication

Layer 3: Authorization Policies (Service Mesh)
  → Service-level access control
  → Method/path-level granularity

Layer 4: Application Auth (JWT/OAuth2)
  → User-level authentication
  → Business-level authorization

Mỗi layer bảo vệ chống lại threats khác nhau:
- Network Policy: Chặn lateral movement
- mTLS: Chống man-in-the-middle, impersonation
- AuthZ Policy: Enforce least privilege service communication
- Application Auth: User access control
```

---

## Tóm tắt

- **Zero Trust**: Never trust, always verify — mọi request đều phải xác thực
- **mTLS**: Cả client và server chứng minh danh tính bằng X.509 certificates
- **SPIFFE**: Identity standard, short-lived certificates, auto-rotation
- **Authorization Policies**: Deny by default, explicit allow per service pair
- **Network Policies**: Kubernetes-level segmentation bổ sung
- **Defense in Depth**: Kết hợp nhiều layer bảo mật, không phụ thuộc một layer duy nhất
