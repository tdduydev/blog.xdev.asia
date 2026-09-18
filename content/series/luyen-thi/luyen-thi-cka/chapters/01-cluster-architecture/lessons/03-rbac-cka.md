---
id: cka-d1-l03
title: 'Bài 3: RBAC & Authorization'
slug: 03-rbac-cka
description: >-
  RBAC in-depth cho CKA. Tạo Roles, ClusterRoles, RoleBindings. ServiceAccounts.
  Kiểm tra quyền với kubectl auth can-i. Certificate-based authentication.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 3
section_title: "Domain 1: Cluster Architecture, Installation & Configuration (25%)"
course:
  id: lt-cka-series-001
  title: 'Luyện thi CKA — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai3-rbac-cka.webp" alt="RBAC Hands-on — ServiceAccount, RoleBinding, kubectl auth can-i" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="rbac-review">1. RBAC Concepts (CKA Depth)</h2>

<p>CKA yêu cầu hands-on: tạo RBAC resources bằng kubectl, verify permissions, và debug access issues.</p>

<pre><code class="language-text">RBAC objects:
  Role          → namespaced permissions
  ClusterRole   → cluster-wide permissions
  RoleBinding   → bind Role or ClusterRole to Subject (in a namespace)
  ClusterRoleBinding → bind ClusterRole to Subject (cluster-wide)

Subject types:
  - User (string, không có K8s object)
  - Group (string)
  - ServiceAccount (K8s object: namespace/name)</code></pre>

<h2 id="create-rbac">2. Tạo RBAC Imperatively</h2>

<pre><code class="language-text"># Tạo Role (namespaced)
kubectl create role pod-reader \
  --verb=get,list,watch \
  --resource=pods \
  --namespace=default

# Tạo RoleBinding
kubectl create rolebinding read-pods \
  --role=pod-reader \
  --user=jane \
  --namespace=default

# Tạo ClusterRole
kubectl create clusterrole secret-reader \
  --verb=get,list \
  --resource=secrets

# Tạo ClusterRoleBinding
kubectl create clusterrolebinding read-secrets \
  --clusterrole=secret-reader \
  --user=jane

# Bind ClusterRole trong 1 namespace (dùng RoleBinding!)
kubectl create rolebinding read-secrets-dev \
  --clusterrole=secret-reader \
  --user=jane \
  --namespace=dev</code></pre>

<blockquote><p><strong>Exam tip:</strong> Dùng <code>--dry-run=client -o yaml</code> để generate YAML rồi edit. Nhanh hơn viết tay. Ví dụ: <code>kubectl create role myrole --verb=get --resource=pods --dry-run=client -o yaml &gt; role.yaml</code></p></blockquote>

<h2 id="serviceaccounts">3. ServiceAccounts trong CKA</h2>

<pre><code class="language-text"># Tạo ServiceAccount
kubectl create serviceaccount monitoring-sa -n default

# Bind permissions
kubectl create clusterrole metrics-reader \
  --verb=get,list,watch \
  --resource=pods,nodes

kubectl create clusterrolebinding monitoring-binding \
  --clusterrole=metrics-reader \
  --serviceaccount=default:monitoring-sa

# Sử dụng SA trong Pod spec
spec:
  serviceAccountName: monitoring-sa</code></pre>

<h2 id="verify-permissions">4. Verify Permissions — kubectl auth can-i</h2>

<pre><code class="language-text"># Kiểm tra quyền của user hiện tại
kubectl auth can-i get pods
kubectl auth can-i delete pods --namespace=production
kubectl auth can-i '*' '*'  # Check all

# Kiểm tra qua user khác (--as)
kubectl auth can-i get pods --as=jane
kubectl auth can-i get pods --as=jane --namespace=dev
kubectl auth can-i get secrets --as=system:serviceaccount:default:monitoring-sa</code></pre>

<h2 id="certificate-auth">5. Certificate-Based Authentication</h2>

<pre><code class="language-text">Create user with client certificate:
  1. Generate key: openssl genrsa -out alice.key 2048
  2. Create CSR: openssl req -new -key alice.key -out alice.csr -subj "/CN=alice/O=developers"
  3. Sign with K8s CA:
     # Create CertificateSigningRequest object
     kubectl apply -f alice-csr.yaml
     kubectl certificate approve alice
  4. Get signed cert: kubectl get csr alice -o jsonpath='{.status.certificate}' | base64 -d > alice.crt
  5. Add to kubeconfig</code></pre>

<blockquote><p><strong>Exam tip:</strong> CKA thường cho task "create user với certificate và bind RBAC". Nhớ quy trình: generate key → CSR → approve CSR → extract cert → kubeconfig. Dùng <code>kubectl auth can-i</code> để verify.</p></blockquote>

<h2 id="cheatsheet">6. Cheat Sheet</h2>

<table>
<thead><tr><th>Task</th><th>Command</th></tr></thead>
<tbody>
<tr><td>Check what user can do</td><td><code>kubectl auth can-i --list --as=user</code></td></tr>
<tr><td>Check specific permission</td><td><code>kubectl auth can-i get secrets --as=user -n ns</code></td></tr>
<tr><td>Create serviceaccount</td><td><code>kubectl create sa SA-NAME -n NAMESPACE</code></td></tr>
<tr><td>Role binding to SA</td><td><code>--serviceaccount=ns:sa-name</code></td></tr>
<tr><td>Approve cert request</td><td><code>kubectl certificate approve NAME</code></td></tr>
</tbody>
</table>

<h2 id="practice">7. Practice Questions</h2>

<p><strong>Q1:</strong> A developer needs read-only access to all Pods and Services across the entire cluster. Which RBAC approach is most appropriate?</p>
<ul>
<li>A) Create a Role with get/list in the default namespace</li>
<li>B) Create a ClusterRole with get/list on pods and services, then ClusterRoleBinding ✓</li>
<li>C) Create a Role in each namespace</li>
<li>D) Grant the developer cluster-admin access</li>
</ul>
<p><em>Explanation: For cluster-wide access, use ClusterRole (defines permissions) + ClusterRoleBinding (grants cluster-wide). Creating Roles in each namespace is tedious and error-prone. cluster-admin is too broad.</em></p>

<p><strong>Q2:</strong> After creating a ServiceAccount and RoleBinding for a monitoring application, you need to verify the SA can list pods in the "monitoring" namespace. Which command does this?</p>
<ul>
<li>A) kubectl get rolebinding -n monitoring</li>
<li>B) kubectl describe serviceaccount monitoring-sa</li>
<li>C) kubectl auth can-i list pods --as=system:serviceaccount:monitoring:monitoring-sa -n monitoring ✓</li>
<li>D) kubectl auth check serviceaccount monitoring-sa</li>
</ul>
<p><em>Explanation: kubectl auth can-i with --as=system:serviceaccount:NAMESPACE:NAME impersonates the ServiceAccount. This verifies the exact access path (SA → binding → role) rather than just inspecting the objects.</em></p>

<p><strong>Q3:</strong> A ClusterRole named "pod-manager" exists. You want user "alice" to use this ClusterRole but ONLY within the "staging" namespace. What should you create?</p>
<ul>
<li>A) ClusterRoleBinding for alice → pod-manager</li>
<li>B) RoleBinding in staging namespace for alice → pod-manager ✓</li>
<li>C) A new Role in staging with the same permissions as pod-manager</li>
<li>D) A new ClusterRole scoped to the staging namespace</li>
</ul>
<p><em>Explanation: RoleBinding can reference a ClusterRole but constrains it to the binding's namespace. This reuses the ClusterRole definition without granting cluster-wide access. ClusterRoleBinding would grant access to all namespaces.</em></p>
