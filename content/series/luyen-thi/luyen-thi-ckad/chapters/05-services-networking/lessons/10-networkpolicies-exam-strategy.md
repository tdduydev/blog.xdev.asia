---
id: ckad-d5-l10
title: 'Bài 10: NetworkPolicies & CKAD Exam Strategy'
slug: 10-networkpolicies-exam-strategy
description: >-
  NetworkPolicy ingress/egress rules, default-deny patterns và pod selector.
  CKAD exam strategy: kubectl shortcuts, --dry-run pattern và time management.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 10
section_title: "Domain 5: Services and Networking (20%)"
course:
  id: lt-ckad-series-001
  title: 'Luyện thi CKAD — Certified Kubernetes Application Developer'
  slug: luyen-thi-ckad
---

<img src="/storage/uploads/2026/04/k8s-cert-ckad-bai10-networkpolicy.webp" alt="NetworkPolicy — ingress/egress rules, default-deny và AND/OR logic" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="networkpolicy">1. NetworkPolicy</h2>

<p>Mặc định, tất cả Pods trong cluster có thể communicate với nhau. NetworkPolicy giới hạn traffic dựa trên labels.</p>

<pre><code class="language-text">Default: All pods can talk to all pods (no restriction)

After applying default-deny-all:
  Pod A ──✗──► Pod B (blocked)
  Pod A ──✗──► Pod C (blocked)

After applying allow policy:
  Pod A (app=frontend) ──✓──► Pod B (app=backend, port 3000)
  Pod A ──✗──► Pod C (app=database) (still blocked)</code></pre>

<h2 id="policy-syntax">2. NetworkPolicy Syntax</h2>

<pre><code class="language-text">apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: backend-policy
  namespace: production
spec:
  podSelector:         # Applies to these pods (empty = all pods in ns)
    matchLabels:
      app: backend
  policyTypes:
  - Ingress            # Controls inbound traffic
  - Egress             # Controls outbound traffic
  ingress:
  - from:
    - podSelector:     # Allow from pods with this label
        matchLabels:
          app: frontend
    - namespaceSelector: # Allow from pods in these namespaces
        matchLabels:
          name: production
    ports:
    - protocol: TCP
      port: 3000
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: database
    ports:
    - protocol: TCP
      port: 5432</code></pre>

<blockquote><p><strong>Exam tip — AND vs OR trong NetworkPolicy:</strong><br/>
<code>from: [{podSelector}, {namespaceSelector}]</code> = OR (pod from either selector)<br/>
<code>from: [{podSelector + namespaceSelector}]</code> in SAME item = AND (pod matching both)<br/>
Đây là một trong những câu hỏi trap nhất của CKAD.</p></blockquote>

<h2 id="common-patterns">3. Common Patterns</h2>

<pre><code class="language-text">Pattern 1: Default deny all ingress
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
spec:
  podSelector: {}     # Empty = match ALL pods
  policyTypes:
  - Ingress
  # No ingress rules = deny all ingress

Pattern 2: Default deny all (both ingress + egress)
---
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
  # No rules = deny all

Pattern 3: Allow all ingress (override deny)
---
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  ingress:
  - {}  # Empty rule = allow all ingress</code></pre>

<table>
<thead><tr><th>Pattern</th><th>policyTypes</th><th>Rules</th><th>Effect</th></tr></thead>
<tbody>
<tr><td>Deny all ingress</td><td>[Ingress]</td><td>Không có ingress rules</td><td>Block all inbound</td></tr>
<tr><td>Deny all egress</td><td>[Egress]</td><td>Không có egress rules</td><td>Block all outbound</td></tr>
<tr><td>Allow specific</td><td>[Ingress]</td><td>ingress rules listed</td><td>Allow matching only</td></tr>
<tr><td>Allow DNS egress</td><td>[Egress]</td><td>to port 53 (UDP+TCP)</td><td>Allow DNS queries</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> NetworkPolicy chỉ hoạt động nếu CNI plugin hỗ trợ (Calico, Cilium, Weave). <strong>Flannel không hỗ trợ NetworkPolicy!</strong> Ingress/Egress rules là additive — nếu nhiều policies apply đến cùng Pod, Kubernetes OR tất cả rules lại.</p></blockquote>

<h2 id="exam-strategy">4. CKAD Exam Strategy</h2>

<pre><code class="language-text">Thông tin exam:
- 2 giờ, ~15-20 tasks thực hành (performance-based)
- Mỗi task có value % khác nhau (ưu tiên task cao điểm trước)
- Pass score: 66%
- Được dùng docs: kubernetes.io/docs + helm.sh/docs

Keyboard shortcuts quan trọng:
  k = kubectl (export alias k=kubectl trong exam, đã set sẵn)
  CTRL+R = search command history
  CTRL+A = go to beginning of line</code></pre>

<pre><code class="language-text">Workflow cho mỗi task:

1. ĐỌC KỸ task description (đặc biệt để ý namespace!)
2. Switch context nếu cần:
   kubectl config use-context cluster-name
3. Set namespace shortcut:
   export ns=target-namespace
   alias kn="kubectl -n $ns"
4. Dùng --dry-run=client -o yaml để generate YAML:
   kubectl run pod --image=nginx --dry-run=client -o yaml > pod.yaml
5. Edit YAML, apply, verify:
   kubectl apply -f pod.yaml
   kubectl get pods -n $ns</code></pre>

<h2 id="dry-run-pattern">5. --dry-run Pattern</h2>

<pre><code class="language-text"># Generate YAML templates nhanh hơn viết tay:

Pod:
  kubectl run nginx --image=nginx --dry-run=client -o yaml > pod.yaml

Deployment:
  kubectl create deployment myapp --image=nginx --replicas=3 \
    --dry-run=client -o yaml > deploy.yaml

Service (ClusterIP):
  kubectl create service clusterip myapp --tcp=80:8080 \
    --dry-run=client -o yaml > svc.yaml

ConfigMap:
  kubectl create configmap myconfig --from-literal=k=v \
    --dry-run=client -o yaml > cm.yaml

Secret:
  kubectl create secret generic mysecret --from-literal=pass=secret \
    --dry-run=client -o yaml > secret.yaml

Job:
  kubectl create job myjob --image=busybox -- echo hello \
    --dry-run=client -o yaml > job.yaml

CronJob:
  kubectl create cronjob mycron --image=busybox --schedule="*/1 * * * *" \
    -- echo hello --dry-run=client -o yaml > cron.yaml</code></pre>

<h2 id="kubectl-shortcuts">6. Essential kubectl Shortcuts</h2>

<table>
<thead><tr><th>Lệnh đầy đủ</th><th>Short form</th></tr></thead>
<tbody>
<tr><td><code>kubectl get pods</code></td><td><code>k get po</code></td></tr>
<tr><td><code>kubectl get deployments</code></td><td><code>k get deploy</code></td></tr>
<tr><td><code>kubectl get services</code></td><td><code>k get svc</code></td></tr>
<tr><td><code>kubectl get namespaces</code></td><td><code>k get ns</code></td></tr>
<tr><td><code>kubectl get persistentvolumeclaims</code></td><td><code>k get pvc</code></td></tr>
<tr><td><code>kubectl get configmaps</code></td><td><code>k get cm</code></td></tr>
<tr><td><code>kubectl get serviceaccounts</code></td><td><code>k get sa</code></td></tr>
<tr><td><code>kubectl get networkpolicies</code></td><td><code>k get netpol</code></td></tr>
<tr><td><code>kubectl describe pod mypod</code></td><td><code>k describe po mypod</code></td></tr>
<tr><td><code>kubectl delete pod mypod --force</code></td><td><code>k delete po mypod --force</code></td></tr>
</tbody>
</table>

<h2 id="cheatsheet">7. Final CKAD Cheat Sheet</h2>

<table>
<thead><tr><th>Domain</th><th>Key Topics</th><th>% Weight</th></tr></thead>
<tbody>
<tr><td>App Design & Build</td><td>Multi-container, Init Containers, Jobs, CronJobs, volumes</td><td>20%</td></tr>
<tr><td>App Deployment</td><td>Rolling updates, rollbacks, Helm, Kustomize</td><td>20%</td></tr>
<tr><td>App Observability</td><td>Probes (liveness/readiness/startup), logs, debug</td><td>15%</td></tr>
<tr><td>App Env/Config/Security</td><td>ConfigMaps, Secrets, SecurityContext, SA, Resources, QoS</td><td>25%</td></tr>
<tr><td>Services & Networking</td><td>Services, Ingress, NetworkPolicies</td><td>20%</td></tr>
</tbody>
</table>

<h2 id="practice">8. Practice Questions</h2>

<p><strong>Q1:</strong> You apply a NetworkPolicy with podSelector: {} and policyTypes: [Ingress] but no ingress rules. What happens?</p>
<ul>
<li>A) All ingress traffic is allowed (no rules = no restriction)</li>
<li>B) All ingress traffic to ALL pods in the namespace is denied ✓</li>
<li>C) All pods are deleted</li>
<li>D) Only external ingress is denied; internal pod-to-pod traffic is allowed</li>
</ul>
<p><em>Explanation: podSelector: {} matches ALL pods in the namespace. policyTypes: [Ingress] says this policy controls ingress. Having no ingress rules means zero traffic is allowed. This is the "default deny all ingress" pattern. Pod-to-pod traffic within the cluster is also denied because NetworkPolicy controls all ingress, regardless of source.</em></p>

<p><strong>Q2:</strong> In a NetworkPolicy, what is the difference between these two from clauses?<br/>
Clause A: from: [{podSelector: {app: web}}, {namespaceSelector: {env: prod}}]<br/>
Clause B: from: [{podSelector: {app: web}, namespaceSelector: {env: prod}}]</p>
<ul>
<li>A) They are identical</li>
<li>B) Clause A: allow from pods with app=web OR from any pod in env=prod namespace. Clause B: allow only from pods with app=web AND in env=prod namespace ✓</li>
<li>C) Clause A uses AND logic, Clause B uses OR logic</li>
<li>D) Clause B is invalid YAML syntax</li>
</ul>
<p><em>Explanation: In NetworkPolicy, when podSelector and namespaceSelector are in SEPARATE list items (separated by -), they use OR logic. When they are in the SAME list item (same indentation level, no -), they use AND logic. This is a critical distinction and a common exam trap.</em></p>

<p><strong>Q3:</strong> During the CKAD exam, you need to create a Deployment with a specific Pod spec. What is the fastest approach?</p>
<ul>
<li>A) Write the entire YAML from memory</li>
<li>B) Search kubernetes.io docs and copy-paste example YAML</li>
<li>C) Use kubectl create deployment --dry-run=client -o yaml to generate a template, then edit ✓</li>
<li>D) Use helm to deploy a chart with default values</li>
</ul>
<p><em>Explanation: The --dry-run=client -o yaml pattern generates valid YAML without creating resources. You redirect to a file, edit only the fields that differ, then apply. This is faster than manual YAML authoring and less likely to have syntax errors. Combining with > file.yaml lets you make precise edits.</em></p>
