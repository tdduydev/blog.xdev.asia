---
id: kcna-d1-l04
title: '第4課：RBAC 與 Kubernetes 安全'
slug: 04-rbac-security
description: >-
  角色型存取控制（RBAC）、ServiceAccount、Network Policy、
  Pod Security Standards 與 Security Context。Kubernetes 叢集安全。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 4
section_title: "Domain 1: Kubernetes Fundamentals (46%)"
course:
  id: lt-kcna-series-001
  title: 'KCNA 認證備考 — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai4-rbac.webp" alt="RBAC 授權模型 — Subject、RoleBinding、Role、Rules" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="rbac">1. RBAC — 角色型存取控制</h2>

<p><strong>RBAC</strong> 控制誰（User、Group、ServiceAccount）可以對哪些資源（resources）執行什麼操作（verbs），在 namespace 或叢集範圍內。</p>

<pre><code class="language-text">RBAC Flow:
Subject (Who?)    →    Role/ClusterRole (What?)    →    RoleBinding (Links)

  User "alice"          Role "pod-reader"              RoleBinding
  ServiceAccount        - get pods                     alice → pod-reader
  Group "devs"          - list pods                    (in namespace "dev")
                        - watch pods</code></pre>

<table>
<thead><tr><th>物件</th><th>範圍</th><th>使用場景</th></tr></thead>
<tbody>
<tr><td><strong>Role</strong></td><td>Namespace</td><td>單一 namespace 內的權限</td></tr>
<tr><td><strong>ClusterRole</strong></td><td>Cluster-wide</td><td>整個叢集的權限或非 namespace 資源（nodes）</td></tr>
<tr><td><strong>RoleBinding</strong></td><td>Namespace</td><td>在單一 namespace 中將 Role 或 ClusterRole 指派給 Subject</td></tr>
<tr><td><strong>ClusterRoleBinding</strong></td><td>Cluster-wide</td><td>在整個叢集中將 ClusterRole 指派給 Subject</td></tr>
</tbody>
</table>

<blockquote><p><strong>考試重點：</strong> 可以使用 <strong>RoleBinding</strong> 將 <strong>ClusterRole</strong> 綁定到特定 namespace——這是重用權限模板而不授予全叢集權限的方法。考試中經常出現！</p></blockquote>

<h2 id="serviceaccounts">2. ServiceAccount</h2>

<p>每個 Pod 可以附加一個 <strong>ServiceAccount</strong>。ServiceAccount 的 Token 會自動掛載到 <code>/var/run/secrets/kubernetes.io/serviceaccount/</code>。Pod 使用此 Token 呼叫 Kubernetes API。</p>

<pre><code class="language-text">Default ServiceAccount flow:
  Pod → ServiceAccount → RBAC Role → API Server

範例：Prometheus 需要讀取 Pod 指標：
  ServiceAccount: prometheus-sa
  ClusterRole: pod-metrics-reader (verbs: get, list, watch)
  ClusterRoleBinding: prometheus-sa → pod-metrics-reader</code></pre>

<h2 id="network-policies">3. Network Policy</h2>

<p>預設情況下，叢集中所有 Pod 可以相互通訊。<strong>NetworkPolicy</strong> 允許根據 Pod 選擇器、Namespace 選擇器或 IP 區塊限制 ingress/egress 流量。</p>

<pre><code class="language-text">❌ Default (no NetworkPolicy): All pods talk to all pods
✅ With NetworkPolicy:
   frontend → backend (allowed)
   frontend → database (BLOCKED)
   backend → database (allowed)</code></pre>

<blockquote><p><strong>考試重點：</strong> NetworkPolicy 只有在 <strong>CNI 外掛支援</strong>時才有效（Calico、Cilium、Weave）。Flannel 不支援 NetworkPolicy。沒有 policy → 全部允許。有至少 1 個 policy → 被選中的 Pod 預設拒絕。</p></blockquote>

<h2 id="pod-security">4. Pod Security Standards</h2>

<p>Kubernetes 定義了 3 種 <strong>Pod Security Standards</strong>（自 v1.25 起取代 PodSecurityPolicy）：</p>

<table>
<thead><tr><th>設定檔</th><th>限制程度</th><th>適用對象</th></tr></thead>
<tbody>
<tr><td><strong>Privileged</strong></td><td>無限制</td><td>系統/基礎設施工作負載（kube-system）</td></tr>
<tr><td><strong>Baseline</strong></td><td>防止明顯的權限提升</td><td>一般工作負載</td></tr>
<tr><td><strong>Restricted</strong></td><td>遵循最大強化標準</td><td>安全敏感應用</td></tr>
</tbody>
</table>

<h2 id="security-context">5. SecurityContext</h2>

<p><strong>SecurityContext</strong> 在 Pod 或 Container 層級設定安全組態：</p>

<table>
<thead><tr><th>安全設定</th><th>含義</th></tr></thead>
<tbody>
<tr><td><code>runAsNonRoot: true</code></td><td>容器不得以 UID 0 執行</td></tr>
<tr><td><code>runAsUser: 1000</code></td><td>以 UID 1000 執行容器</td></tr>
<tr><td><code>readOnlyRootFilesystem: true</code></td><td>檔案系統唯讀（寫入需使用 volume）</td></tr>
<tr><td><code>allowPrivilegeEscalation: false</code></td><td>不允許程序提升權限</td></tr>
<tr><td><code>capabilities.drop: ["ALL"]</code></td><td>移除所有 Linux capabilities</td></tr>
</tbody>
</table>

<h2 id="cheatsheet">6. 速查表</h2>

<table>
<thead><tr><th>考試問題</th><th>答案</th></tr></thead>
<tbody>
<tr><td>Pod 需要呼叫 K8s API，用什麼？</td><td><strong>ServiceAccount</strong></td></tr>
<tr><td>限制使用者在單一 namespace 的權限？</td><td><strong>Role</strong> + <strong>RoleBinding</strong></td></tr>
<tr><td>限制 Pod 之間的網路流量？</td><td><strong>NetworkPolicy</strong></td></tr>
<tr><td>NetworkPolicy 需要什麼才能運作？</td><td>支援的 CNI 外掛（Calico、Cilium）</td></tr>
<tr><td>Privileged → Restricted，Pod 安全需要？</td><td><strong>Pod Security Admission</strong></td></tr>
</tbody>
</table>

<h2 id="practice">7. 練習題</h2>

<p><strong>Q1:</strong> 應用 Pod 需要存取 Kubernetes API 以列出其 namespace 中的 Pod。叢集管理員應該建立什麼？</p>
<ul>
<li>A) 具有 ClusterRoleBinding 的 ClusterRole（所有 namespace）</li>
<li>B) 具有 Role（list pods）和 RoleBinding 的 ServiceAccount ✓</li>
<li>C) 用於 API Server 的 LoadBalancer 類型 Service</li>
<li>D) 包含 API Server 憑證的 ConfigMap</li>
</ul>
<p><em>解析：Pod 需要 ServiceAccount、授予其 namespace 中「list pods」的 Role，以及連結兩者的 RoleBinding。使用 ClusterRole 會過度授權整個叢集的存取權限。</em></p>

<p><strong>Q2:</strong> 將 NetworkPolicy 套用到 Pod 後，規則未明確匹配的流量預設行為是什麼？</p>
<ul>
<li>A) 所有流量都被允許（預設允許）</li>
<li>B) 流量被記錄但不被封鎖</li>
<li>C) 匹配 Pod 選擇器的流量被拒絕；其他所有流量通過 ✓</li>
<li>D) 所有進出 Pod 的流量都被拒絕</li>
</ul>
<p><em>解析：一旦 NetworkPolicy 選擇了 Pod（透過 podSelector），該策略類型（ingress/egress）中未明確允許的所有流量都會被拒絕。未被選中的 Pod 不受影響，保持完全連接性。</em></p>

<p><strong>Q3:</strong> 哪個 Pod Security Standard 設定檔應用於需要對主機進行特權存取的系統層級元件？</p>
<ul>
<li>A) Restricted</li>
<li>B) Baseline</li>
<li>C) Privileged ✓</li>
<li>D) SystemAdmin</li>
</ul>
<p><em>解析：Privileged 設定檔不對 Pod 施加任何限制，允許所有 capabilities。適用於系統/基礎設施元件。Baseline 防止已知的權限提升；Restricted 執行最大強化。</em></p>
