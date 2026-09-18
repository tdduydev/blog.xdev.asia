---
id: ckad-d4-l06
title: 'Bài 6: ConfigMaps & Secrets'
slug: 06-configmaps-secrets
description: >-
  Tạo và consume ConfigMaps và Secrets trong Kubernetes. Inject qua env vars
  (envFrom, valueFrom) và volume mounts. Secret types và security considerations.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 6
section_title: "Domain 4: Application Environment, Configuration and Security (25%)"
course:
  id: lt-ckad-series-001
  title: 'Luyện thi CKAD — Certified Kubernetes Application Developer'
  slug: luyen-thi-ckad
---

<img src="/storage/uploads/2026/04/k8s-cert-ckad-bai6-configmap-secret.webp" alt="ConfigMap và Secret injection — envFrom, valueFrom và Volume Mount" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="configmap">1. ConfigMap</h2>

<p>ConfigMap lưu trữ cặp key-value non-sensitive. Không được mã hóa (plain text).</p>

<pre><code class="language-text"># Tạo ConfigMap — Imperative
kubectl create configmap app-config \
  --from-literal=DB_HOST=mysql \
  --from-literal=DB_PORT=3306

kubectl create configmap app-config --from-file=config.properties
kubectl create configmap app-config --from-env-file=.env

# Declarative YAML
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DB_HOST: mysql
  DB_PORT: "3306"
  config.properties: |
    server.port=8080
    debug=false</code></pre>

<h2 id="secret">2. Secret</h2>

<p>Secret lưu trữ sensitive data. Được <strong>base64 encode</strong> (không phải mã hóa — encode thôi!).</p>

<pre><code class="language-text"># Tạo Secret — Imperative
kubectl create secret generic db-secret \
  --from-literal=username=admin \
  --from-literal=password=mypassword

kubectl create secret generic db-secret --from-file=credentials.txt

# Declarative (base64 encode trước)
echo -n 'admin' | base64    # YWRtaW4=
echo -n 'mypassword' | base64  # bXlwYXNzd29yZA==

apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  username: YWRtaW4=
  password: bXlwYXNzd29yZA==</code></pre>

<table>
<thead><tr><th>Secret Type</th><th>Mục đích</th></tr></thead>
<tbody>
<tr><td><code>Opaque</code></td><td>Generic — default type, any key-value data</td></tr>
<tr><td><code>kubernetes.io/dockerconfigjson</code></td><td>Docker registry credentials</td></tr>
<tr><td><code>kubernetes.io/tls</code></td><td>TLS certificate và private key</td></tr>
<tr><td><code>kubernetes.io/service-account-token</code></td><td>ServiceAccount token (auto-created)</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> Secret data là <strong>base64 encoded, không encrypted</strong>. Bất kỳ ai có quyền đọc Secret đều có thể decode: <code>echo 'YWRtaW4=' | base64 -d</code>. Để encrypt at rest, phải enable EncryptionConfiguration — nhưng CKAD không test điều này. Exam thường test: tạo secret và inject vào Pod.</p></blockquote>

<h2 id="inject-env">3. Inject qua Environment Variables</h2>

<pre><code class="language-text">spec:
  containers:
  - name: app
    image: myapp

    # Method 1: envFrom — load ALL keys as env vars
    envFrom:
    - configMapRef:
        name: app-config
    - secretRef:
        name: db-secret

    # Method 2: valueFrom — load SPECIFIC key
    env:
    - name: DATABASE_HOST
      valueFrom:
        configMapKeyRef:
          name: app-config
          key: DB_HOST
    - name: DB_PASSWORD
      valueFrom:
        secretKeyRef:
          name: db-secret
          key: password</code></pre>

<h2 id="inject-volume">4. Inject qua Volume Mount</h2>

<pre><code class="language-text">spec:
  volumes:
  - name: config-vol
    configMap:
      name: app-config
  - name: secret-vol
    secret:
      secretName: db-secret

  containers:
  - name: app
    image: myapp
    volumeMounts:
    - name: config-vol
      mountPath: /etc/config    # Each key becomes a file
    - name: secret-vol
      mountPath: /etc/secrets
      readOnly: true

  # Result: /etc/config/DB_HOST contains "mysql"
  #         /etc/secrets/password contains "mypassword" (decoded)</code></pre>

<table>
<thead><tr><th>Method</th><th>Khi dùng</th><th>Auto-update khi CM/Secret đổi?</th></tr></thead>
<tbody>
<tr><td><code>envFrom</code> / <code>env.valueFrom</code></td><td>App đọc env vars</td><td>Không (cần restart pod)</td></tr>
<tr><td>Volume mount</td><td>App đọc từ files, hoặc cần auto-reload</td><td>Có (sau ~1-2 phút)</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> Volume-mounted ConfigMaps/Secrets tự động update khi nguồn thay đổi (sau kubelet sync period ~1 phút). Env vars phải restart pod mới reflect changes. CKAD thường test cả 2 methods — nắm rõ syntax của <code>configMapKeyRef</code> vs <code>configMapRef</code> (có chữ "Key" thì là single key).</p></blockquote>

<h2 id="cheatsheet">5. Cheat Sheet</h2>

<table>
<thead><tr><th>Task</th><th>Command / YAML</th></tr></thead>
<tbody>
<tr><td>Tạo CM từ literals</td><td><code>kubectl create cm name --from-literal=k=v</code></td></tr>
<tr><td>Tạo Secret từ literals</td><td><code>kubectl create secret generic n --from-literal=k=v</code></td></tr>
<tr><td>Load all CM keys as env</td><td><code>envFrom: - configMapRef: name: ...</code></td></tr>
<tr><td>Load specific key</td><td><code>env: - valueFrom: configMapKeyRef: ...</code></td></tr>
<tr><td>Mount as files</td><td><code>volumes: configMap/secret + volumeMounts</code></td></tr>
</tbody>
</table>

<h2 id="practice">6. Practice Questions</h2>

<p><strong>Q1:</strong> A Pod needs to consume ALL key-value pairs from a ConfigMap named "app-settings" as environment variables. Which configuration is correct?</p>
<ul>
<li>A) <code>env: - name: APP_SETTINGS valueFrom: configMapRef: name: app-settings</code></li>
<li>B) <code>envFrom: - configMapRef: name: app-settings</code> ✓</li>
<li>C) <code>volumes: - configMap: name: app-settings</code></li>
<li>D) <code>env: - configMapKeyRef: name: app-settings key: "*"</code></li>
</ul>
<p><em>Explanation: envFrom with configMapRef loads ALL keys from the ConfigMap as environment variables. env with valueFrom configMapKeyRef only loads ONE specific key. The wildcard "*" syntax does not exist.</em></p>

<p><strong>Q2:</strong> You create a Secret with the command: kubectl create secret generic mysecret --from-literal=password=secret123. How is the data stored in etcd?</p>
<ul>
<li>A) Plain text: "password=secret123"</li>
<li>B) AES-256 encrypted</li>
<li>C) Base64 encoded ✓</li>
<li>D) SHA-256 hashed</li>
</ul>
<p><em>Explanation: By default, Kubernetes stores Secret data as base64 encoded values in etcd — NOT encrypted. Base64 is encoding, not encryption. Anyone with etcd access can decode it. To encrypt at rest, an EncryptionConfiguration must be configured separately.</em></p>

<p><strong>Q3:</strong> A ConfigMap is updated with new values. A Pod is using this ConfigMap mounted as a volume at /etc/config. What happens?</p>
<ul>
<li>A) The Pod fails immediately because the config changed</li>
<li>B) The files in /etc/config are automatically updated (with a short delay) ✓</li>
<li>C) Nothing happens — the Pod must be restarted to see changes</li>
<li>D) The Pod is restarted automatically by Kubernetes</li>
</ul>
<p><em>Explanation: Volume-mounted ConfigMaps are automatically updated when the ConfigMap changes, after the kubelet sync period (typically ~1 minute). Environment variables from ConfigMaps do NOT auto-update — the Pod must be recreated. Applications that watch for file changes can react to these updates without restarts.</em></p>
