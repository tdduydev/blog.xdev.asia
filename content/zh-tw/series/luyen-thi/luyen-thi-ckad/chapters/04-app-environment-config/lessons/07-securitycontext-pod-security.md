---
id: ckad-d4-l07
title: '第7課: SecurityContext、Capabilities 與 ServiceAccounts'
slug: 07-securitycontext-pod-security
description: >-
  SecurityContext 的 Pod 層級和 Container 層級設定: runAsUser、runAsNonRoot、
  readOnlyRootFilesystem。Linux capabilities。ServiceAccount 建立與綁定。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 7
section_title: "領域4: Application Environment, Configuration and Security (25%)"
course:
  id: lt-ckad-series-001
  title: 'CKAD 認證備考 — Certified Kubernetes Application Developer'
  slug: luyen-thi-ckad
---

<img src="/storage/uploads/2026/04/k8s-cert-ckad-bai7-security-context.webp" alt="SecurityContext — Pod 層級 vs Container 層級、Linux capabilities" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="securitycontext">1. SecurityContext</h2>

<p>SecurityContext 定義 Pod 或 Container 的權限和存取控制。</p>

<pre><code class="language-text">apiVersion: v1
kind: Pod
spec:
  securityContext:            # Pod 層級: 套用於所有容器
    runAsUser: 1000           # 容器執行 UID
    runAsGroup: 3000          # 主要 GID
    fsGroup: 2000             # 掛載 volume 的 GID
    runAsNonRoot: true        # 禁止以 root 執行

  containers:
  - name: app
    image: myapp
    securityContext:          # Container 層級: 覆蓋 Pod 層級
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true   # 將根檔案系統設為唯讀
      capabilities:
        add: ["NET_BIND_SERVICE"]    # 新增 capability
        drop: ["ALL"]               # 先 drop 全部，再新增需要的</code></pre>

<table>
<thead><tr><th>設定項目</th><th>層級</th><th>效果</th></tr></thead>
<tbody>
<tr><td><code>runAsUser</code></td><td>Pod/Container</td><td>以指定 UID 執行程序</td></tr>
<tr><td><code>runAsNonRoot</code></td><td>Pod/Container</td><td>UID = 0（root）時拒絕執行</td></tr>
<tr><td><code>readOnlyRootFilesystem</code></td><td>Container</td><td>將根檔案系統設為唯讀掛載</td></tr>
<tr><td><code>allowPrivilegeEscalation</code></td><td>Container</td><td>阻擋權限提升（如 sudo）</td></tr>
<tr><td><code>privileged</code></td><td>Container</td><td>以特權模式執行（等同 host 上的 root）</td></tr>
<tr><td><code>fsGroup</code></td><td>Pod</td><td>Volume 檔案的 GID（用於共享 volume 存取）</td></tr>
</tbody>
</table>

<blockquote><p><strong>考試重點:</strong> Container 層級的 securityContext 會<strong>覆蓋</strong> Pod 層級的設定。Pod 設定 <code>runAsUser: 1000</code>，Container 設定 <code>runAsUser: 2000</code>，該容器會以 UID 2000 執行。常考模式: <code>kubectl exec pod -- id</code> 或 <code>whoami</code> 確認使用者。</p></blockquote>

<h2 id="capabilities">2. Linux Capabilities</h2>

<pre><code class="language-text">Capabilities 允許在不給予完整 root 權限的情況下授予特定權限。

# 常見範例:
NET_BIND_SERVICE  — 綁定 1024 以下的埠號（如 port 80）
NET_ADMIN         — 網路管理（ifconfig 等）
SYS_TIME          — 修改系統時鐘
CHOWN             — 變更檔案所有者
SETUID/SETGID     — 變更使用者/群組 ID

securityContext:
  capabilities:
    drop: ["ALL"]             # 最佳實踐: 先 drop 全部
    add: ["NET_BIND_SERVICE"] # 只加回需要的</code></pre>

<h2 id="serviceaccount">3. ServiceAccounts</h2>

<p>Pod 使用 <strong>ServiceAccount</strong> 向 Kubernetes API 進行身份驗證。</p>

<pre><code class="language-text"># 建立 ServiceAccount
kubectl create serviceaccount my-sa

# 綁定 Role
kubectl create rolebinding my-binding \
  --role=pod-reader \
  --serviceaccount=default:my-sa

# 在 Pod 中指定 SA
spec:
  serviceAccountName: my-sa     # 使用指定的 SA
  automountServiceAccountToken: false  # 停用 SA token 自動掛載

# 預設行為: default SA 的 token 會掛載到 /var/run/secrets/kubernetes.io/serviceaccount/
# 容器可使用該 token 呼叫 K8s API</code></pre>

<table>
<thead><tr><th>概念</th><th>說明</th></tr></thead>
<tbody>
<tr><td>預設 SA</td><td>每個 Namespace 都有內建的 <code>default</code> SA（最小權限）</td></tr>
<tr><td>Token 掛載</td><td>除非停用，token 會自動掛載到 Pod</td></tr>
<tr><td><code>automountServiceAccountToken: false</code></td><td>停用 token 掛載（安全最佳實踐）</td></tr>
</tbody>
</table>

<h2 id="readonly-volume">4. readOnlyRootFilesystem + emptyDir</h2>

<pre><code class="language-text"># readOnlyRootFilesystem: true 時，應用無法寫入根檔案系統。
# 但應用可能需要寫入暫存檔案 → 使用 emptyDir volume:

spec:
  containers:
  - name: app
    image: myapp
    securityContext:
      readOnlyRootFilesystem: true
    volumeMounts:
    - name: tmp
      mountPath: /tmp        # 暫存檔案寫入此處
    - name: cache
      mountPath: /app/cache
  volumes:
  - name: tmp
    emptyDir: {}
  - name: cache
    emptyDir: {}</code></pre>

<h2 id="cheatsheet">5. 速查表</h2>

<table>
<thead><tr><th>任務</th><th>YAML / 指令</th></tr></thead>
<tbody>
<tr><td>以非 root 執行容器</td><td><code>securityContext: runAsNonRoot: true</code></td></tr>
<tr><td>以指定 UID 執行</td><td><code>securityContext: runAsUser: 1000</code></td></tr>
<tr><td>唯讀檔案系統</td><td><code>securityContext: readOnlyRootFilesystem: true</code></td></tr>
<tr><td>Drop 所有 capabilities</td><td><code>capabilities: drop: ["ALL"]</code></td></tr>
<tr><td>指定 ServiceAccount</td><td><code>spec: serviceAccountName: my-sa</code></td></tr>
<tr><td>確認容器使用者</td><td><code>kubectl exec pod -- whoami</code></td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習題</h2>

<p><strong>Q1:</strong> Pod spec 的 securityContext.runAsUser 設定為 1000（Pod 層級）。Pod 中某個容器的 securityContext.runAsUser 設定為 2000。該容器以哪個 UID 執行？</p>
<ul>
<li>A) 0（root，Pod 層級覆蓋）</li>
<li>B) 1000（Pod 層級優先）</li>
<li>C) 2000（Container 層級覆蓋 Pod 層級） ✓</li>
<li>D) 同時以兩個 UID 執行</li>
</ul>
<p><em>解析: Container 層級的 securityContext 設定會覆蓋 Pod 層級。該容器以 UID 2000 執行。同一 Pod 中沒有設定 Container 層級 securityContext 的其他容器會繼承 Pod 層級的 UID 1000。</em></p>

<p><strong>Q2:</strong> 應用容器需要綁定 port 80（1024 以下的特權埠號），但不應以 root 執行。如何設定？</p>
<ul>
<li>A) 設定 securityContext.privileged: true</li>
<li>B) 設定 securityContext.runAsUser: 0</li>
<li>C) Drop 所有 capabilities 後只加回 NET_BIND_SERVICE ✓</li>
<li>D) 使用 NodePort Service 替代 port 80</li>
</ul>
<p><em>解析: Linux capabilities 提供細粒度的權限授予。NET_BIND_SERVICE 允許不以 root 身份綁定 1024 以下的埠號。最佳實踐是先 drop 全部再新增需要的: capabilities: { drop: ["ALL"], add: ["NET_BIND_SERVICE"] }。</em></p>

<p><strong>Q3:</strong> 一個 Pod 設定了 readOnlyRootFilesystem: true。應用嘗試寫入 /tmp 但失敗。最佳解決方案是什麼？</p>
<ul>
<li>A) 移除 readOnlyRootFilesystem: true</li>
<li>B) 設定 securityContext.privileged: true</li>
<li>C) 在 /tmp 掛載 emptyDir volume ✓</li>
<li>D) 在 /tmp 掛載 ConfigMap</li>
</ul>
<p><em>解析: readOnlyRootFilesystem 阻止對容器檔案系統的寫入，但 emptyDir volume 是另一個可寫入的掛載點。在 /tmp 掛載 emptyDir 後，根檔案系統保持唯讀，但應用可以寫入暫存檔案。</em></p>
