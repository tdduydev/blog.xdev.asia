---
id: cka-d5-l12
title: 'Lesson 12: Troubleshooting Networking & Exam Strategy'
slug: 12-troubleshooting-networking-exam
description: >-
  Debug network connectivity. DNS issues, Service unreachable. Cluster
  networking flow. CKA exam tips, time management and command shortcuts.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 12
section_title: "Domain 5: Troubleshooting (30%)"
course:
  id: lt-cka-series-001
  title: 'CKA Exam Prep — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai12-network-debug.webp" alt="Network Troubleshooting Layers — Layer-by-layer debug approach" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="network-debug">1. Network Troubleshooting Workflow</h2>

<pre><code class="language-text">Network connectivity issue:
  Pod A cannot reach Pod B (or Service)
  
  Layer-by-layer debug:
  
  1. Same node, same namespace?
     kubectl exec pod-a -- ping POD_B_IP

  2. Different node?
     kubectl get pod pod-a pod-b -o wide  # Check node placement

  3. Via Service name (DNS)?
     kubectl exec pod-a -- nslookup my-service
     kubectl exec pod-a -- wget -qO- http://my-service:8080

  4. NetworkPolicy blocking?
     kubectl get networkpolicy -n NAMESPACE

  5. kube-proxy working?
     kubectl get pods -n kube-system -l k8s-app=kube-proxy</code></pre>

<h2 id="network-flow">2. Full Network Flow Diagram</h2>

<pre><code class="language-text">Client Pod ──(routes to)──► Service ClusterIP (iptables/ipvs)
                                │
                            kube-proxy routes to one of:
                           Pod IP 1 | Pod IP 2 | Pod IP 3
                                │
                          CNI (Calico/Flannel) routes to
                          correct node if cross-node
                                │
                          Container receives on containerPort</code></pre>

<table>
<thead><tr><th>Component Fails</th><th>Symptom</th><th>Fix</th></tr></thead>
<tbody>
<tr><td>CoreDNS</td><td>DNS resolution fails</td><td>Restart CoreDNS pods</td></tr>
<tr><td>kube-proxy</td><td>Service IPs unreachable</td><td>Restart kube-proxy DaemonSet</td></tr>
<tr><td>CNI plugin</td><td>Cross-node pod communication fails</td><td>Reinstall CNI or check CNI pods</td></tr>
<tr><td>NetworkPolicy</td><td>Specific traffic blocked</td><td>Review/delete blocking policies</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> When debugging networking, start from inside the Pod (IP reachable?) → Service (DNS + Endpoints?) → Node (CNI routing?) → NetworkPolicy. Don't jump straight to kube-proxy without testing DNS first.</p></blockquote>

<h2 id="exam-strategy">3. CKA Exam Strategy</h2>

<table>
<thead><tr><th>Tip</th><th>Details</th></tr></thead>
<tbody>
<tr><td><strong>Switch context immediately</strong></td><td>Each question specifies a cluster → <code>kubectl config use-context CLUSTER</code></td></tr>
<tr><td><strong>Use --dry-run</strong></td><td><code>kubectl create deploy --dry-run=client -o yaml &gt; file.yaml</code> to generate YAML</td></tr>
<tr><td><strong>Use explain</strong></td><td><code>kubectl explain pod.spec.containers.resources</code> for field help</td></tr>
<tr><td><strong>Bookmark quickly</strong></td><td>Use Kubernetes docs search when you need a YAML template</td></tr>
<tr><td><strong>Skip hard tasks</strong></td><td>Mark and return; easy questions first (30% troubleshooting = most points)</td></tr>
<tr><td><strong>Verify after completing</strong></td><td><code>kubectl get/describe</code> to confirm changes worked</td></tr>
</tbody>
</table>

<h2 id="kubectl-shortcuts">4. Essential kubectl Shortcuts</h2>

<pre><code class="language-text"># Aliases to save time
alias k=kubectl
alias kgp='kubectl get pods'
alias kgs='kubectl get svc'
alias kns='kubectl config set-context --current --namespace'

# Resource short names
po  = pods
svc = services
deploy = deployments
ns  = namespaces
cm  = configmaps
pvc = persistentvolumeclaims
pv  = persistentvolumes
rs  = replicasets
sa  = serviceaccounts
no  = nodes

# Most-used flags
-n NAMESPACE    --namespace
-o wide         wider output (IP, Node)
-o yaml         full YAML output
-o jsonpath     extract specific field
--all-namespaces / -A   search all namespaces</code></pre>

<h2 id="exam-commands">5. Must-Know Commands for CKA</h2>

<pre><code class="language-text"># Generate YAML with dry-run
kubectl run nginx --image=nginx --dry-run=client -o yaml > pod.yaml
kubectl create deployment myapp --image=myapp --replicas=3 --dry-run=client -o yaml

# Extract field
kubectl get node NODENAME -o jsonpath='{.status.capacity.cpu}'
kubectl get pod PODNAME -o jsonpath='{.status.podIP}'

# Sort by field
kubectl get events --sort-by='.lastTimestamp'
kubectl get pods --sort-by='.status.startTime'

# Watch resources
kubectl get pods -w

# All namespaces
kubectl get pods -A
kubectl get pods -A | grep CrashLoop</code></pre>

<h2 id="cheatsheet">6. CKA Quick Reference</h2>

<table>
<thead><tr><th>Domain (Weight)</th><th>Key Topics</th></tr></thead>
<tbody>
<tr><td>Cluster Architecture (25%)</td><td>kubeadm, static pods, kubeconfig, RBAC</td></tr>
<tr><td>Workloads (15%)</td><td>Deployments, rollout, DaemonSet, StatefulSet, scheduling</td></tr>
<tr><td>Services & Networking (20%)</td><td>Services, Ingress, NetworkPolicy, DNS</td></tr>
<tr><td>Storage (10%)</td><td>PV, PVC, StorageClass, volume mounts</td></tr>
<tr><td><strong>Troubleshooting (30%)</strong></td><td>Node, workload, network debug — HIGHEST WEIGHT</td></tr>
</tbody>
</table>

<h2 id="practice">7. Practice Questions</h2>

<p><strong>Q1:</strong> A Pod successfully pings another Pod's IP but cannot reach it via Service name. DNS resolution fails. CoreDNS Pods are running. What should you check?</p>
<ul>
<li>A) kube-proxy configuration</li>
<li>B) The Pod's /etc/resolv.conf nameserver entry ✓</li>
<li>C) The node's iptables rules</li>
<li>D) The Service's targetPort</li>
</ul>
<p><em>Explanation: If IP works but DNS doesn't, the Pod isn't using the CoreDNS server. Check /etc/resolv.conf inside the Pod — it should show the kube-dns ClusterIP as nameserver. If not, the Pod's dnsPolicy or dnsConfig may be overriding the default.</em></p>

<p><strong>Q2:</strong> During the CKA exam, the first thing you always do when starting a new question is:</p>
<ul>
<li>A) Read Kubernetes documentation for the topic</li>
<li>B) Switch to the correct cluster context using kubectl config use-context ✓</li>
<li>C) Create a backup of the current cluster state</li>
<li>D) Check existing resources in the cluster</li>
</ul>
<p><em>Explanation: CKA uses multiple clusters. Each question specifies a cluster. Always switch context first — working on the wrong cluster will fail the task even if executed perfectly. This is the #1 exam mistake.</em></p>

<p><strong>Q3:</strong> You need to expose a Deployment "webapp" on port 80 to external traffic using a NodePort Service. Which is the fastest approach?</p>
<ul>
<li>A) Write a Service YAML and kubectl apply it</li>
<li>B) kubectl expose deployment webapp --type=NodePort --port=80 ✓</li>
<li>C) kubectl create service nodeport webapp --tcp=80:80</li>
<li>D) Edit the Deployment YAML to add a hostPort</li>
</ul>
<p><em>Explanation: kubectl expose is the fastest — it creates a Service targeting the Deployment's Pods using the same selector. It requires no YAML editing. Option C works but doesn't use the Deployment's existing selector.</em></p>
