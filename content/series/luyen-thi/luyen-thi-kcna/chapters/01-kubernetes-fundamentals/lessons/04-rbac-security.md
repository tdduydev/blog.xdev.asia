---
id: kcna-d1-l04
title: 'Bài 4: RBAC & Kubernetes Security'
slug: 04-rbac-security
description: >-
  Role-Based Access Control (RBAC), ServiceAccounts, Network Policies,
  Pod Security Standards và Security Context. Bảo mật Kubernetes cluster.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 4
section_title: "Domain 1: Kubernetes Fundamentals (46%)"
course:
  id: lt-kcna-series-001
  title: 'Luyện thi KCNA — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai4-rbac.webp" alt="RBAC Authorization Model — Subject, RoleBinding, Role, Rules" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="rbac">1. RBAC — Role-Based Access Control</h2>

<p><strong>RBAC</strong> kiểm soát ai (User, Group, ServiceAccount) được làm gì (verbs) với tài nguyên nào (resources) trong namespace hoặc cluster.</p>

<pre><code class="language-text">RBAC Flow:
Subject (Who?)    →    Role/ClusterRole (What?)    →    RoleBinding (Links)

  User "alice"          Role "pod-reader"              RoleBinding
  ServiceAccount        - get pods                     alice → pod-reader
  Group "devs"          - list pods                    (in namespace "dev")
                        - watch pods</code></pre>

<table>
<thead><tr><th>Object</th><th>Scope</th><th>Dùng khi</th></tr></thead>
<tbody>
<tr><td><strong>Role</strong></td><td>Namespace</td><td>Quyền trong 1 namespace</td></tr>
<tr><td><strong>ClusterRole</strong></td><td>Cluster-wide</td><td>Quyền trên toàn cluster hoặc non-namespaced resources (nodes)</td></tr>
<tr><td><strong>RoleBinding</strong></td><td>Namespace</td><td>Gán Role or ClusterRole cho Subject trong 1 namespace</td></tr>
<tr><td><strong>ClusterRoleBinding</strong></td><td>Cluster-wide</td><td>Gán ClusterRole cho Subject trên toàn cluster</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> Có thể dùng <strong>RoleBinding</strong> để gán <strong>ClusterRole</strong> vào 1 namespace cụ thể — đây là cách tái sử dụng permission template mà không cấp quyền toàn cluster. Rất hay xuất hiện trong exam!</p></blockquote>

<h2 id="serviceaccounts">2. ServiceAccounts</h2>

<p>Mỗi Pod có thể gắn một <strong>ServiceAccount</strong>. Token của ServiceAccount được mount tự động vào <code>/var/run/secrets/kubernetes.io/serviceaccount/</code>. Pods dùng token này để gọi Kubernetes API.</p>

<pre><code class="language-text">Default ServiceAccount flow:
  Pod → ServiceAccount → RBAC Role → API Server

Ví dụ: Prometheus cần đọc Pod metrics:
  ServiceAccount: prometheus-sa
  ClusterRole: pod-metrics-reader (verbs: get, list, watch)
  ClusterRoleBinding: prometheus-sa → pod-metrics-reader</code></pre>

<h2 id="network-policies">3. Network Policies</h2>

<p>Mặc định, tất cả Pods trong cluster có thể communicate với nhau. <strong>NetworkPolicy</strong> cho phép giới hạn traffic ingress/egress dựa trên Pod selector, namespace selector, hoặc IP block.</p>

<pre><code class="language-text">❌ Default (no NetworkPolicy): All pods talk to all pods
✅ With NetworkPolicy:
   frontend → backend (allowed)
   frontend → database (BLOCKED)
   backend → database (allowed)</code></pre>

<blockquote><p><strong>Exam tip:</strong> NetworkPolicy chỉ có tác dụng khi <strong>CNI plugin hỗ trợ</strong> (Calico, Cilium, Weave). Flannel không hỗ trợ NetworkPolicy. Nếu không có policy nào → allow all. Nếu có ít nhất 1 policy → default deny cho traffic được select.</p></blockquote>

<h2 id="pod-security">4. Pod Security Standards</h2>

<p>Kubernetes định nghĩa 3 <strong>Pod Security Standards</strong> (thay thế PodSecurityPolicy từ v1.25):</p>

<table>
<thead><tr><th>Profile</th><th>Mức độ hạn chế</th><th>Dùng cho</th></tr></thead>
<tbody>
<tr><td><strong>Privileged</strong></td><td>Không hạn chế</td><td>System/infra workloads (kube-system)</td></tr>
<tr><td><strong>Baseline</strong></td><td>Ngăn escalation rõ ràng</td><td>Workloads thông thường</td></tr>
<tr><td><strong>Restricted</strong></td><td>Tuân thủ hardening tối đa</td><td>Security-sensitive apps</td></tr>
</tbody>
</table>

<h2 id="security-context">5. SecurityContext</h2>

<p><strong>SecurityContext</strong> cấu hình bảo mật ở cấp Pod hoặc Container:</p>

<table>
<thead><tr><th>Security setting</th><th>Ý nghĩa</th></tr></thead>
<tbody>
<tr><td><code>runAsNonRoot: true</code></td><td>Container không được chạy với UID 0</td></tr>
<tr><td><code>runAsUser: 1000</code></td><td>Chạy container với UID 1000</td></tr>
<tr><td><code>readOnlyRootFilesystem: true</code></td><td>Filesystem read-only (write phải dùng volume)</td></tr>
<tr><td><code>allowPrivilegeEscalation: false</code></td><td>Không cho process leo thang đặc quyền</td></tr>
<tr><td><code>capabilities.drop: ["ALL"]</code></td><td>Bỏ tất cả Linux capabilities</td></tr>
</tbody>
</table>

<h2 id="cheatsheet">6. Cheat Sheet</h2>

<table>
<thead><tr><th>Câu hỏi exam</th><th>Đáp án</th></tr></thead>
<tbody>
<tr><td>Pod cần gọi K8s API, dùng gì?</td><td><strong>ServiceAccount</strong></td></tr>
<tr><td>Giới hạn quyền user trong 1 namespace?</td><td><strong>Role</strong> + <strong>RoleBinding</strong></td></tr>
<tr><td>Giới hạn network traffic giữa Pods?</td><td><strong>NetworkPolicy</strong></td></tr>
<tr><td>NetworkPolicy cần gì để hoạt động?</td><td>CNI plugin hỗ trợ (Calico, Cilium)</td></tr>
<tr><td>Privileged → Restricted, Pod Security cần?</td><td><strong>Pod Security Admission</strong></td></tr>
</tbody>
</table>

<h2 id="practice">7. Practice Questions</h2>

<p><strong>Q1:</strong> An application Pod needs to access the Kubernetes API to list Pods in its own namespace. What should a cluster administrator create?</p>
<ul>
<li>A) ClusterRole with ClusterRoleBinding for all namespaces</li>
<li>B) ServiceAccount with Role (list pods) and RoleBinding ✓</li>
<li>C) Service with type LoadBalancer for API Server</li>
<li>D) ConfigMap with API Server credentials</li>
</ul>
<p><em>Explanation: The Pod needs a ServiceAccount, a Role granting "list pods" in its namespace, and a RoleBinding linking them. Using ClusterRole would over-grant access across all namespaces.</em></p>

<p><strong>Q2:</strong> A NetworkPolicy is applied to a Pod. What is the default behavior for traffic not explicitly matched by any rule?</p>
<ul>
<li>A) All traffic is allowed (default allow)</li>
<li>B) Traffic is logged but not blocked</li>
<li>C) Traffic that matches the Pod selector is denied; all other traffic passes ✓</li>
<li>D) All traffic to/from the Pod is denied</li>
</ul>
<p><em>Explanation: Once a NetworkPolicy selects a Pod (via podSelector), all traffic not explicitly allowed is denied for that policy type (ingress/egress). Non-selected Pods remain unaffected and have full connectivity.</em></p>

<p><strong>Q3:</strong> Which Pod Security Standard profile should be used for a system-level component that requires privileged access to the host?</p>
<ul>
<li>A) Restricted</li>
<li>B) Baseline</li>
<li>C) Privileged ✓</li>
<li>D) SystemAdmin</li>
</ul>
<p><em>Explanation: The Privileged profile places no restrictions on Pods, allowing all capabilities. It's intended for system/infrastructure components. Baseline prevents known privilege escalations; Restricted enforces maximum hardening.</em></p>
