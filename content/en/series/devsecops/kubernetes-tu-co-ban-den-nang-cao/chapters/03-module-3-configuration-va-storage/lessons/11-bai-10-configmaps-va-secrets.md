---
id: 019c9618-0101-7000-8000-c1147ba22e11
title: 'LESSON 10: CONFIGMAPS AND SECRETS'
slug: bai-10-configmaps-va-secrets
description: Manage configuration with ConfigMaps and sensitive data with Secrets. Immutable ConfigMaps/Secrets, secrets encryption at rest, External Secrets Operator to synchronize from AWS Secrets Manager, GCP Secret Manager, HashiCorp Vault.
duration_minutes: 80
is_free: false
video_url: null
sort_order: 10
section_title: 'Module 3: Configuration & Storage'
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: 'KUBERNETES: FROM BASIC TO ADVANCED'
  slug: kubernetes-tu-co-ban-den-nang-cao
locale: en
---
<h2>ConfigMaps and Secrets in Kubernetes__HTMLTAG_1___

<p>In a production environment, the application needs to read the configuration from the external environment instead of hardcoding it into the container image. Kubernetes provides two specialized mechanisms: <strong>ConfigMap</strong> for common configuration data and <strong>Secret</strong> for sensitive data. This lesson dives into both, including at-rest encryption and integration with external secret management systems.</p>

<img src="/storage/uploads/2026/03/k8s-configmaps-secrets-2026.webp" alt="ConfigMaps & Secrets trong Kubernetes" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h2>ConfigMaps: Managing Configuration Data</h2>

<h3>What is ConfigMap?</h3>

<p>ConfigMap is a Kubernetes object that stores key-value configuration data. This data is completely isolated from the container image, allowing you to change configuration without rebuilding the image. ConfigMap can contain simple strings, multi-line configuration files, or even entire file contents.</p>

<p>ConfigMap matches:</p>
<ul>
  <li>Application environment variables (database host, port, feature flags)</li>
  <li>Content of configuration file (nginx.conf, application.properties)</li>
  <li>Command-line arguments for container__HTMLTAG_23___
  <li>Other non-sensitive configuration__HTMLTAG_25___
</ul>

<h3>Create ConfigMap from Literal Values</h3>

<pre><code class="language-bash"># Tạo ConfigMap từ literal values
kubectl create configmap app-config \
  --from-literal=APP_ENV=production \
  --from-literal=APP_PORT=8080 \
  --from-literal=DB_HOST=postgres.default.svc.cluster.local \
  --from-literal=DB_PORT=5432

# Xem ConfigMap
kubectl get configmap app-config -o yaml</code></pre>

<h3>Create ConfigMap from File</h3>

<pre><code class="language-bash"># Tạo file cấu hình
cat > app.properties << 'EOF'
app.name=my-application
app.version=2.1.0
app.max-connections=100
app.timeout=30s
log.level=INFO
log.format=json
EOF

# Tạo ConfigMap từ file
kubectl create configmap app-properties --from-file=app.properties

# Tạo ConfigMap với custom key name
kubectl create configmap app-properties --from-file=config=app.properties</code></pre>

<h3>ConfigMap YAML Definition</h3>

<pre><code class="language-yaml">apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: default
  labels:
    app: my-app
    version: "2.1.0"
data:
  # Single-line values
  APP_ENV: "production"
  APP_PORT: "8080"
  DB_HOST: "postgres.default.svc.cluster.local"
  DB_PORT: "5432"
  CACHE_TTL: "300"

  # Multi-line file content
  nginx.conf: |
    server {
        listen 80;
        server_name example.com;

        location / {
            proxy_pass http://backend:8080;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }

  application.yaml: |
    spring:
      application:
        name: my-service
      datasource:
        url: jdbc:postgresql://postgres:5432/mydb
    server:
      port: 8080
    logging:
      level:
        root: INFO</code></pre>

<h2>How to Use ConfigMap in Pod</h2>

<h3>1. Environment Variables from ConfigMap</h3>

<pre><code class="language-yaml">apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: app
        image: my-app:2.1.0
        # Inject từng key từ ConfigMap
        env:
        - name: APP_ENV
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: APP_ENV
        - name: APP_PORT
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: APP_PORT
        # Inject tất cả keys từ ConfigMap
        envFrom:
        - configMapRef:
            name: app-config</code></pre>

<h3>2. Volume Mount from ConfigMap</h3>

<pre><code class="language-yaml">apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx-app
  template:
    metadata:
      labels:
        app: nginx-app
    spec:
      containers:
      - name: nginx
        image: nginx:1.27
        ports:
        - containerPort: 80
        volumeMounts:
        - name: nginx-config
          mountPath: /etc/nginx/conf.d
          readOnly: true
        - name: app-properties
          mountPath: /app/config
          readOnly: true
      volumes:
      - name: nginx-config
        configMap:
          name: app-config
          items:
          - key: nginx.conf
            path: default.conf
      - name: app-properties
        configMap:
          name: app-config
          items:
          - key: application.yaml
            path: application.yaml
          defaultMode: 0444</code></pre>

<h3>3. Command-Line Arguments from ConfigMap</h3>

<pre><code class="language-yaml">apiVersion: v1
kind: Pod
metadata:
  name: app-with-args
spec:
  containers:
  - name: app
    image: my-app:2.1.0
    command: ["/app/server"]
    args:
    - "--port=$(APP_PORT)"
    - "--env=$(APP_ENV)"
    env:
    - name: APP_PORT
      valueFrom:
        configMapKeyRef:
          name: app-config
          key: APP_PORT
    - name: APP_ENV
      valueFrom:
        configMapKeyRef:
          name: app-config
          key: APP_ENV</code></pre>

<h2>Secrets: Managing Sensitive Data</h2>

<h3>What are Secrets and Why is Base64 NOT Encryption?</h3>

<p>Secret in Kubernetes stores sensitive data such as passwords, tokens, and TLS certificates. One important thing to understand: <strong>Secrets by default are only base64 encoded, NOT encoded</strong>. Base64 is just an encoding for transmitting binary data over a text channel — anyone can decode it easily.</p>

<pre><code class="language-bash"># Base64 encode
echo -n "my-password" | base64
# Output: bXktcGFzc3dvcmQ=

# Base64 decode - rất dễ dàng!
echo "bXktcGFzc3dvcmQ=" | base64 -d
# Output: my-password</code></pre>

<p>This means that anyone with permission to read the Secret in etcd or via the Kubernetes API can see the actual value. Therefore additional layers of security are needed which we will discuss later.</p>

<h3>Secret Types</h3>

<h4>1. Opaque (Generic) Secret</h4>

<pre><code class="language-bash"># Tạo Opaque secret từ literal
kubectl create secret generic db-credentials \
  --from-literal=username=postgres \
  --from-literal=password=S3cur3P@ssw0rd \
  --from-literal=host=postgres.default.svc.cluster.local

# Tạo từ file
kubectl create secret generic tls-cert \
  --from-file=tls.crt=./server.crt \
  --from-file=tls.key=./server.key</code></pre>

<pre><code class="language-yaml">apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
  namespace: default
type: Opaque
data:
  # Values phải được base64 encoded
  username: cG9zdGdyZXM=
  password: UzNjdXIzUEBzc3cwcmQ=
  host: cG9zdGdyZXMuZGVmYXVsdC5zdmMuY2x1c3Rlci5sb2NhbA==
stringData:
  # stringData tự động encode - dễ đọc hơn khi viết YAML
  connection-string: "postgresql://postgres:S3cur3P@ssw0rd@postgres:5432/mydb"</code></pre>

<h4>2. TLS Secret</h4>

<pre><code class="language-bash"># Tạo TLS secret từ certificate files
kubectl create secret tls my-tls-secret \
  --cert=path/to/tls.crt \
  --key=path/to/tls.key</code></pre>

<pre><code class="language-yaml">apiVersion: v1
kind: Secret
metadata:
  name: my-tls-secret
type: kubernetes.io/tls
data:
  tls.crt: LS0tLS1CRUdJTi... # base64 encoded certificate
  tls.key: LS0tLS1CRUdJTi... # base64 encoded private key</code></pre>

<h4>3. Docker Registry Secret</h4>

<pre><code class="language-bash"># Tạo Docker registry secret
kubectl create secret docker-registry regcred \
  --docker-server=registry.example.com \
  --docker-username=my-user \
  --docker-password=my-password \
  --docker-email=user@example.com</code></pre>

<pre><code class="language-yaml">apiVersion: v1
kind: Secret
metadata:
  name: regcred
type: kubernetes.io/dockerconfigjson
data:
  .dockerconfigjson: eyJhdXRocyI6eyJyZWdpc3RyeS5leGFtcGxlLmNvbSI6eyJ1c2VybmFtZSI6Im15LXVzZXIiLCJwYXNzd29yZCI6Im15LXBhc3N3b3JkIn19fQ==</code></pre>

<h3>Using Secrets in Pod</h3>

<h4>Mounting Secret as Environment Variables__HTMLTAG_62___

<pre><code class="language-yaml">apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: backend:1.0.0
        env:
        - name: DB_USERNAME
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: username
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: password
        - name: DB_HOST
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: host
      imagePullSecrets:
      - name: regcred</code></pre>

<h4>Mounting Secret as Volume</h4>

<pre><code class="language-yaml">apiVersion: apps/v1
kind: Deployment
metadata:
  name: secure-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: secure-app
  template:
    metadata:
      labels:
        app: secure-app
    spec:
      containers:
      - name: app
        image: secure-app:1.0.0
        volumeMounts:
        - name: secret-volume
          mountPath: /etc/secrets
          readOnly: true
        - name: tls-certs
          mountPath: /etc/tls
          readOnly: true
      volumes:
      - name: secret-volume
        secret:
          secretName: db-credentials
          defaultMode: 0400  # Chỉ owner có thể đọc
      - name: tls-certs
        secret:
          secretName: my-tls-secret
          items:
          - key: tls.crt
            path: server.crt
          - key: tls.key
            path: server.key
            mode: 0400</code></pre>

<h2>Immutable ConfigMaps and Secrets</h2>

<h3>Why Is Immutable?</h3><p>In large clusters with thousands of Pods, each ConfigMap/Secret change triggers a watch event to all kubelets. This creates a significant load on kube-apiserver. Kubernetes 1.21+ supports <strong>immutable ConfigMaps and Secrets</strong> — an important optimization for production clusters.</p>

<p>Benefits of immutable:</p>
<ul>
  <li>Offload kube-apiserver: kubelet no need to watch changes</li>
  <li>Increased stability: prevent accidental updates that can break applications</li>
  <li>Significantly better performance with large number of Pods__HTMLTAG_81___
</ul>

<pre><code class="language-yaml">apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config-v2
  namespace: default
  labels:
    app: my-app
    version: "2.0.0"
data:
  APP_ENV: "production"
  APP_VERSION: "2.0.0"
  DB_POOL_SIZE: "20"
immutable: true  # Không thể thay đổi sau khi tạo</code></pre>

<pre><code class="language-yaml">apiVersion: v1
kind: Secret
metadata:
  name: api-keys-v1
  namespace: default
type: Opaque
data:
  stripe-key: c2tfdGVzdF8xMjM0NTY3ODkw
  sendgrid-key: U0cuYWJjZGVmZ2hpams=
immutable: true  # Secret không thể bị modify</code></pre>

<pre><code class="language-bash"># Cố gắng update immutable ConfigMap sẽ fail
kubectl patch configmap app-config-v2 \
  --patch '{"data":{"APP_ENV":"staging"}}'
# Error: configmap "app-config-v2" is immutable

# Để "update" immutable resource, tạo version mới
kubectl create configmap app-config-v3 \
  --from-literal=APP_ENV=staging \
  --from-literal=APP_VERSION=2.1.0

# Xóa version cũ sau khi migrate
kubectl delete configmap app-config-v2</code></pre>

<h2>Secrets Encryption At Rest</h2>

<h3>Problems with Default Storage</h3>

<p>By default, Secrets are saved in etcd as base64 plain text. Anyone with permission to read etcd or backup of etcd can see all secret values. This is a serious security risk in production.</p>

<h3>EncryptionConfiguration</h3>

<p>Kubernetes supports encryption at rest through <code>EncryptionConfiguration</code> — a configuration file for kube-apiserver that specifies how to encrypt resources before saving to etcd.</p>

<pre><code class="language-yaml"># /etc/kubernetes/encryption-config.yaml
apiVersion: apiserver.config.k8s.io/v1
kind: EncryptionConfiguration
resources:
  - resources:
    - secrets
    - configmaps  # Có thể mã hóa cả ConfigMaps
    providers:
    # AES-GCM: Khuyến nghị nhất - authenticated encryption
    - aescbc:
        keys:
        - name: key1
          secret: <base64-encoded-32-byte-key>
    # AES-CBC: Legacy, vẫn supported
    - aesgcm:
        keys:
        - name: key1
          secret: <base64-encoded-16/24/32-byte-key>
    # identity: không mã hóa - dùng để migrate hoặc decrypt
    - identity: {}</code></pre>

<pre><code class="language-bash"># Tạo encryption key
head -c 32 /dev/urandom | base64

# Output (ví dụ):
# 4MhFHOTCNF/i9C2BpZCUlFxH3MBXdFYn2JeUNuT4EQs=

# Cấu hình kube-apiserver sử dụng encryption config
# Thêm flag vào kube-apiserver manifest:
# --encryption-provider-config=/etc/kubernetes/encryption-config.yaml

# Verify encryption đang hoạt động
kubectl create secret generic test-secret \
  --from-literal=key=my-secret-value

# Đọc trực tiếp từ etcd (không qua API)
ETCDCTL_API=3 etcdctl get \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key \
  /registry/secrets/default/test-secret | hexdump -C

# Nếu encrypted, output sẽ bắt đầu bằng "k8s:enc:aescbc:v1:key1:..."
# Thay vì plaintext base64

# Encrypt tất cả existing secrets
kubectl get secrets --all-namespaces -o json | kubectl replace -f -</code></pre>

<h2>External Secrets Operator</h2>

<h3>Why do we need an External Secrets Operator?</h3>

<p>Encryption at rest protects secrets in etcd, but there's still a problem: secrets are still managed in Kubernetes. In enterprise environments, secrets are often centrally managed at AWS Secrets Manager, HashiCorp Vault, GCP Secret Manager, Azure Key Vault. <strong>External Secrets Operator (ESO)</strong> solves this problem by automatically syncing secrets from external systems to Kubernetes Secrets.</p>

<h3>Settings External Secrets Operator</h3>

<pre><code class="language-bash"># Cài ESO qua Helm
helm repo add external-secrets https://charts.external-secrets.io
helm repo update

helm install external-secrets \
  external-secrets/external-secrets \
  --namespace external-secrets \
  --create-namespace \
  --set installCRDs=true

# Verify installation
kubectl get pods -n external-secrets
kubectl get crd | grep external-secrets</code></pre>

<h3>SecretStore and ClusterSecretStore CRDs</h3>

<p>ESO uses two main types of CRDs: <strong>SecretStore</strong> (namespace-scoped) and <strong>ClusterSecretStore</strong> (cluster-wide). This is where you configure the connection to the external secret backend.</p>

<h4>ClusterSecretStore for AWS Secrets Manager__HTMLTAG_114___

<pre><code class="language-yaml">apiVersion: external-secrets.io/v1beta1
kind: ClusterSecretStore
metadata:
  name: aws-secrets-manager
spec:
  provider:
    aws:
      service: SecretsManager
      region: ap-southeast-1
      auth:
        # Sử dụng IRSA (IAM Roles for Service Accounts)
        jwt:
          serviceAccountRef:
            name: external-secrets-sa
            namespace: external-secrets</code></pre>

<pre><code class="language-yaml"># IAM Role với permission đọc secrets
# Attach policy: SecretsManagerReadWrite hoặc custom policy

# Service Account với IRSA annotation
apiVersion: v1
kind: ServiceAccount
metadata:
  name: external-secrets-sa
  namespace: external-secrets
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::123456789012:role/external-secrets-role</code></pre>

<h4>ExternalSecret to Sync from AWS Secrets Manager</h4>

<pre><code class="language-yaml">apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: db-credentials
  namespace: production
spec:
  refreshInterval: 1h  # Sync mỗi 1 giờ
  secretStoreRef:
    name: aws-secrets-manager
    kind: ClusterSecretStore
  target:
    name: db-credentials  # Tên Kubernetes Secret sẽ được tạo
    creationPolicy: Owner
    template:
      type: Opaque
      data:
        # Có thể transform và combine nhiều external secrets
        connection-string: "postgresql://{{ .username }}:{{ .password }}@{{ .host }}:5432/mydb"
  data:
  - secretKey: username
    remoteRef:
      key: production/myapp/db
      property: username
  - secretKey: password
    remoteRef:
      key: production/myapp/db
      property: password
  - secretKey: host
    remoteRef:
      key: production/myapp/db
      property: host</code></pre>

<h4>Sync All AWS Secret</h4>

<pre><code class="language-yaml">apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: app-secrets-full
  namespace: production
spec:
  refreshInterval: 30m
  secretStoreRef:
    name: aws-secrets-manager
    kind: ClusterSecretStore
  target:
    name: app-secrets
    creationPolicy: Owner
  # Sync toàn bộ secret object
  dataFrom:
  - extract:
      key: production/myapp/all-secrets</code></pre>

<h3>SecretStore for HashiCorp Vault</h3>

<pre><code class="language-yaml">apiVersion: external-secrets.io/v1beta1
kind: ClusterSecretStore
metadata:
  name: vault-backend
spec:
  provider:
    vault:
      server: "https://vault.example.com:8200"
      path: "secret"
      version: "v2"  # KV v2
      auth:
        # Kubernetes Auth Method
        kubernetes:
          mountPath: "kubernetes"
          role: "my-app-role"
          serviceAccountRef:
            name: external-secrets-sa
            namespace: external-secrets</code></pre>

<pre><code class="language-yaml">apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: vault-secrets
  namespace: production
spec:
  refreshInterval: 15m
  secretStoreRef:
    name: vault-backend
    kind: ClusterSecretStore
  target:
    name: vault-app-secrets
    creationPolicy: Owner
  data:
  - secretKey: api-key
    remoteRef:
      key: secret/data/production/myapp
      property: api-key
  - secretKey: jwt-secret
    remoteRef:
      key: secret/data/production/myapp
      property: jwt-secret
  dataFrom:
  - extract:
      key: secret/data/production/database</code></pre>

<pre><code class="language-bash"># Kiểm tra trạng thái sync
kubectl get externalsecret -n production
kubectl describe externalsecret db-credentials -n production

# Output mong đợi:
# Status:
#   Binding:
#     Name: db-credentials
#   Conditions:
#     Last Transition Time: 2026-03-30T10:00:00Z
#     Message: Secret was synced
#     Reason: SecretSynced
#     Status: True
#     Type: Ready</code></pre>

<h2>Best Practices for ConfigMaps and Secrets__HTMLTAG_122___

<h3>1. Don't Commit Secrets to Git</h3>

<pre><code class="language-bash"># .gitignore
*-secret.yaml
secrets/
*.env
.env.*

# Sử dụng git-secrets để prevent accidental commits
brew install git-secrets
git secrets --install
git secrets --register-aws</code></pre>

<h3>2. RBAC For Secrets</h3>

<pre><code class="language-yaml"># Giới hạn quyền đọc secrets
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: secret-reader
  namespace: production
rules:
- apiGroups: [""]
  resources: ["secrets"]
  verbs: ["get"]
  resourceNames: ["db-credentials", "api-keys"]  # Chỉ cho phép đọc specific secrets
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: app-secret-binding
  namespace: production
subjects:
- kind: ServiceAccount
  name: my-app-sa
  namespace: production
roleRef:
  kind: Role
  name: secret-reader
  apiGroup: rbac.authorization.k8s.io</code></pre>

<h3>3. Secret Rotation</h3>

<pre><code class="language-bash"># Với External Secrets Operator, rotation tự động:
# 1. Update secret trong AWS Secrets Manager/Vault
# 2. ESO tự động sync vào Kubernetes Secret sau refreshInterval
# 3. Pods cần được restart để nhận secret mới (nếu dùng env vars)

# Với volume mount, secret updates được reflect tự động (sau sync period)
# Với env vars, cần restart pod

# Trigger restart
kubectl rollout restart deployment/my-app -n production</code></pre>

<h3>4. Secret Namespace Isolation</h3>

<pre><code class="language-yaml"># Secrets chỉ accessible trong cùng namespace
# Để share secrets giữa namespaces, dùng ESO với ClusterSecretStore
# hoặc sync secret sang multiple namespaces

apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: shared-secret
  namespace: staging  # Deploy vào namespace staging
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: vault-backend
    kind: ClusterSecretStore
  target:
    name: shared-api-keys
  dataFrom:
  - extract:
      key: secret/data/shared/api-keys</code></pre>

<h3>5. Audit Logging For Secret Access</h3>

<pre><code class="language-yaml"># audit-policy.yaml
apiVersion: audit.k8s.io/v1
kind: Policy
rules:
# Log tất cả secret operations ở level Request
- level: Request
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
  resources:
  - group: ""
    resources: ["secrets"]
# Log metadata cho các operations khác
- level: Metadata
  resources:
  - group: ""
    resources: ["pods", "services"]</code></pre>

<h2>Summary</h2><p>ConfigMaps and Secrets are the foundation of configuration management in Kubernetes. Important points to remember:</p>

<ul>
  <li><strong>ConfigMap</strong> for non-sensitive configuration, supports env vars, volume mounts, and command args</li>
  <li><strong>Secret</strong> default only base64 encoding — NOT encryption, need additional security layer</li>
  <li><strong>Immutable</strong> ConfigMaps/Secrets significantly improves performance in large clusters</li>
  <li><strong>EncryptionConfiguration</strong> with AES-GCM/AES-CBC encrypt secrets at rest in etcd</li>
  <li><strong>External Secrets Operator</strong> is the best solution for production: sync from Vault, AWS Secrets Manager, reduce attack surface__HTMLTAG_157___
  <li>Always apply RBAC strictly, don't commit secrets to Git, and have a rotation plan</li>
</ul>