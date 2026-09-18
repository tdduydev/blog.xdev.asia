---
id: ckad-d4-l06
title: '第6課: ConfigMaps 與 Secrets'
slug: 06-configmaps-secrets
description: >-
  ConfigMap 和 Secret 的建立方式（imperative/declarative）。透過環境變數（envFrom/valueFrom）
  和 Volume 掛載注入 Pod。自動更新行為與限制。
duration_minutes: 50
is_free: true
video_url: null
sort_order: 6
section_title: "領域4: Application Environment, Configuration and Security (25%)"
course:
  id: lt-ckad-series-001
  title: 'CKAD 認證備考 — Certified Kubernetes Application Developer'
  slug: luyen-thi-ckad
---

<img src="/storage/uploads/2026/04/k8s-cert-ckad-bai6-configmap-secret.webp" alt="ConfigMaps 與 Secrets — 環境變數注入和 Volume 掛載" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="configmap">1. ConfigMap</h2>

<pre><code class="language-text"># Imperative — 快速建立
kubectl create configmap app-config \
  --from-literal=DB_HOST=mysql \
  --from-literal=DB_PORT=3306

kubectl create configmap app-config --from-file=config.properties

# Declarative — YAML 檔案
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DB_HOST: mysql
  DB_PORT: "3306"         # 值必須是字串
  app.properties: |       # 多行資料
    server.port=8080
    logging.level=INFO</code></pre>

<h2 id="secrets">2. Secrets</h2>

<pre><code class="language-text"># Imperative
kubectl create secret generic db-secret \
  --from-literal=username=admin \
  --from-literal=password=s3cr3t

# Declarative（值必須 base64 編碼）
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  username: YWRtaW4=       # echo -n "admin" | base64
  password: czNjcjN0       # echo -n "s3cr3t" | base64

# 使用 stringData（純文字，Kubernetes 自動編碼）
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
stringData:
  username: admin
  password: s3cr3t</code></pre>

<table>
<thead><tr><th>Secret 類型</th><th>用途</th></tr></thead>
<tbody>
<tr><td><strong>Opaque</strong>（預設）</td><td>任意 key-value 資料</td></tr>
<tr><td><strong>kubernetes.io/dockerconfigjson</strong></td><td>Docker registry 認證</td></tr>
<tr><td><strong>kubernetes.io/tls</strong></td><td>TLS 憑證（cert + key）</td></tr>
<tr><td><strong>kubernetes.io/basic-auth</strong></td><td>Basic 認證（username + password）</td></tr>
</tbody>
</table>

<blockquote><p><strong>考試重點:</strong> Secret 是 base64 <strong>編碼</strong>而非<strong>加密</strong>。base64 任何人都可解碼。生產環境應啟用 Encryption at Rest 或使用 External Secrets Operator。CKAD 常考 <code>stringData</code>（純文字）和 <code>data</code>（base64）的差異。</p></blockquote>

<h2 id="inject-env">3. 作為環境變數注入</h2>

<pre><code class="language-text"># envFrom — 將 ConfigMap/Secret 的所有 key 注入為環境變數
env:
  envFrom:
  - configMapRef:
      name: app-config
  - secretRef:
      name: db-secret

# valueFrom — 逐一注入特定 key
env:
- name: DATABASE_HOST
  valueFrom:
    configMapKeyRef:
      name: app-config
      key: DB_HOST
- name: DATABASE_PASSWORD
  valueFrom:
    secretKeyRef:
      name: db-secret
      key: password</code></pre>

<h2 id="inject-volume">4. 作為 Volume 注入</h2>

<pre><code class="language-text">spec:
  containers:
  - name: app
    image: myapp
    volumeMounts:
    - name: config-volume
      mountPath: /etc/config     # 每個 key 成為一個檔案
      readOnly: true
    - name: secret-volume
      mountPath: /etc/secrets
      readOnly: true
  volumes:
  - name: config-volume
    configMap:
      name: app-config
  - name: secret-volume
    secret:
      secretName: db-secret

# Volume 掛載後的檔案結構:
# /etc/config/DB_HOST        → 檔案內容: "mysql"
# /etc/config/DB_PORT        → 檔案內容: "3306"
# /etc/secrets/username      → 檔案內容: "admin"
# /etc/secrets/password      → 檔案內容: "s3cr3t"</code></pre>

<h2 id="auto-update">5. 自動更新行為</h2>

<table>
<thead><tr><th>注入方式</th><th>自動更新</th><th>備註</th></tr></thead>
<tbody>
<tr><td>環境變數（envFrom/valueFrom）</td><td>不會</td><td>需重啟 Pod</td></tr>
<tr><td>Volume 掛載</td><td>會（有延遲）</td><td>依賴 kubelet 同步間隔（預設約 60 秒）</td></tr>
</tbody>
</table>

<h2 id="cheatsheet">6. 速查表</h2>

<table>
<thead><tr><th>任務</th><th>指令 / YAML</th></tr></thead>
<tbody>
<tr><td>快速建立 ConfigMap</td><td><code>kubectl create cm name --from-literal=k=v</code></td></tr>
<tr><td>快速建立 Secret</td><td><code>kubectl create secret generic name --from-literal=k=v</code></td></tr>
<tr><td>所有 key 注入為環境變數</td><td><code>envFrom: configMapRef/secretRef</code></td></tr>
<tr><td>掛載為檔案</td><td><code>volumes: configMap/secret + volumeMounts</code></td></tr>
<tr><td>base64 編碼</td><td><code>echo -n "text" | base64</code></td></tr>
<tr><td>base64 解碼</td><td><code>echo "encoded" | base64 -d</code></td></tr>
</tbody>
</table>

<h2 id="practice">7. 練習題</h2>

<p><strong>Q1:</strong> 將 ConfigMap "app-config" 的所有 key 注入為 Pod 環境變數的正確 YAML 語法是什麼？</p>
<ul>
<li>A) <code>env: - configMapRef: name: app-config</code></li>
<li>B) <code>envFrom: - configMapRef: name: app-config</code> ✓</li>
<li>C) <code>envFrom: - configMap: name: app-config</code></li>
<li>D) <code>env: - valueFrom: configMapRef: name: app-config</code></li>
</ul>
<p><em>解析: envFrom 可一次注入 ConfigMap 或 Secret 的所有 key 為環境變數。正確的 key 是 configMapRef（ConfigMap）或 secretRef（Secret）。valueFrom 用於逐一注入特定 key。</em></p>

<p><strong>Q2:</strong> Secret YAML 的 data 欄位中，值應以什麼格式填寫？</p>
<ul>
<li>A) 純文字</li>
<li>B) base64 編碼 ✓</li>
<li>C) SHA256 雜湊</li>
<li>D) AES 加密</li>
</ul>
<p><em>解析: Secret 的 data 欄位值必須為 base64 編碼。若要使用純文字，可改用 stringData 欄位。base64 是編碼而非加密——其目的是支援二進位資料的儲存，而非安全保護。</em></p>

<p><strong>Q3:</strong> 您透過 Volume 掛載方式將 ConfigMap 注入 Pod。更新 ConfigMap 的值後，不重啟 Pod 時變更是否會生效？</p>
<ul>
<li>A) 不會，一律需要重啟 Pod</li>
<li>B) 會，Volume 掛載的情況下 kubelet 會在同步間隔後自動更新 ✓</li>
<li>C) 會，即時生效</li>
<li>D) ConfigMap 一旦建立就無法修改（immutable）</li>
</ul>
<p><em>解析: Volume 掛載的情況下，kubelet 會定期檢測 ConfigMap 變更並更新檔案（預設約 60 秒延遲）。但透過環境變數（envFrom/valueFrom）注入時不會自動更新，需要重啟 Pod。</em></p>
