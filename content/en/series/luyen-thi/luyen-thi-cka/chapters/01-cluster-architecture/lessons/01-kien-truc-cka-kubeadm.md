---
id: cka-d1-l01
title: 'Lesson 1: Kubernetes Architecture & Cluster Components'
slug: 01-kien-truc-cka-kubeadm
description: >-
  Control plane and worker node components. kubeadm cluster bootstrap.
  ETCD, API Server, Scheduler, Controller Manager in the CKA exam environment.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 1
section_title: "Domain 1: Cluster Architecture, Installation & Configuration (25%)"
course:
  id: lt-cka-series-001
  title: 'CKA Exam Prep — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai1-kubeadm.webp" alt="kubeadm Cluster Initialization Sequence and kubeconfig" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="architecture">1. Kubernetes Architecture Review (CKA Focus)</h2>

<p>The CKA exam requires you to troubleshoot cluster components, not just know the theory.</p>

<pre><code class="language-text">Control Plane Node                 Worker Nodes
──────────────────                 ────────────
  kube-apiserver  ◄──────────────── kubelet
  etcd                               kube-proxy
  kube-scheduler                     container runtime
  controller-manager                 (containerd)
  cloud-controller-manager (opt)
  
All components communicate via kube-apiserver (only etcd talks directly to API server)</code></pre>

<table>
<thead><tr><th>Component</th><th>Location</th><th>Config / Pod Path</th><th>Troubleshoot</th></tr></thead>
<tbody>
<tr><td><strong>kube-apiserver</strong></td><td>Control plane</td><td><code>/etc/kubernetes/manifests/kube-apiserver.yaml</code></td><td>kubectl get pods -n kube-system</td></tr>
<tr><td><strong>etcd</strong></td><td>Control plane</td><td><code>/etc/kubernetes/manifests/etcd.yaml</code></td><td>etcdctl member list</td></tr>
<tr><td><strong>kube-scheduler</strong></td><td>Control plane</td><td><code>/etc/kubernetes/manifests/kube-scheduler.yaml</code></td><td>logs in kube-system</td></tr>
<tr><td><strong>controller-manager</strong></td><td>Control plane</td><td><code>/etc/kubernetes/manifests/kube-controller-manager.yaml</code></td><td>logs in kube-system</td></tr>
<tr><td><strong>kubelet</strong></td><td>Every node</td><td><code>/var/lib/kubelet/config.yaml</code>, systemd service</td><td>systemctl status kubelet</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> On a kubeadm cluster, control plane components run as <strong>static Pods</strong> (files in <code>/etc/kubernetes/manifests/</code>). Kubelet automatically starts/restarts them. When you edit a manifest file, kubelet auto-reloads the Pod — no need for kubectl apply.</p></blockquote>

<h2 id="kubeadm">2. kubeadm — Cluster Bootstrap</h2>

<pre><code class="language-text"># 1. Init control plane
kubeadm init --pod-network-cidr=10.244.0.0/16

# 2. Setup kubeconfig (after init)
mkdir -p $HOME/.kube
cp /etc/kubernetes/admin.conf $HOME/.kube/config

# 3. Install CNI plugin (required before nodes become Ready)
kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml

# 4. Join worker nodes (token from kubeadm init output)
kubeadm join 192.168.1.10:6443 --token abc.xyz \
  --discovery-token-ca-cert-hash sha256:...</code></pre>

<h2 id="kubeconfig">3. kubeconfig & Contexts</h2>

<pre><code class="language-text">~/.kube/config structure:
  clusters:     → cluster API endpoints
  users:        → auth credentials (certificates, tokens)
  contexts:     → cluster + user + namespace combo
  current-context → active context

kubectl config commands:
  kubectl config get-contexts       # List contexts
  kubectl config use-context NAME   # Switch context
  kubectl config current-context    # Show active
  kubectl config set-context NAME --namespace=prod  # Set default ns</code></pre>

<blockquote><p><strong>Exam tip:</strong> CKA uses multiple clusters. The first step for each question is always: "switch to the correct context before doing anything". Remember to check <code>kubectl config current-context</code>.</p></blockquote>

<h2 id="static-pods">4. Static Pods</h2>

<p><strong>Static Pods</strong> are managed directly by kubelet, not through the API server. Config files are in <code>staticPodPath</code> (usually <code>/etc/kubernetes/manifests/</code>).</p>

<table>
<thead><tr><th>Static Pod</th><th>Differs from Regular Pod</th></tr></thead>
<tbody>
<tr><td>Created directly by kubelet</td><td>No ReplicaSet, no Deployment</td></tr>
<tr><td>Cannot be deleted via kubectl delete</td><td>Must delete the manifest file</td></tr>
<tr><td>Mirror Pod appears on API server</td><td>Visible via kubectl get pods but read-only</td></tr>
</tbody>
</table>

<h2 id="cheatsheet">5. Cheat Sheet</h2>

<table>
<thead><tr><th>Task</th><th>Command</th></tr></thead>
<tbody>
<tr><td>Check control plane health</td><td><code>kubectl get pods -n kube-system</code></td></tr>
<tr><td>View apiserver config</td><td><code>cat /etc/kubernetes/manifests/kube-apiserver.yaml</code></td></tr>
<tr><td>Kubelet status</td><td><code>systemctl status kubelet</code></td></tr>
<tr><td>Kubelet logs</td><td><code>journalctl -u kubelet -n 50</code></td></tr>
<tr><td>Regenerate join token</td><td><code>kubeadm token create --print-join-command</code></td></tr>
</tbody>
</table>

<h2 id="practice">6. Practice Questions</h2>

<p><strong>Q1:</strong> A cluster's kube-apiserver Pod is not running. You check /etc/kubernetes/manifests/kube-apiserver.yaml and find a syntax error. After fixing it, what happens?</p>
<ul>
<li>A) You must run kubectl apply -f kube-apiserver.yaml</li>
<li>B) kubelet automatically detects the file change and restarts the static Pod ✓</li>
<li>C) kubeadm must be run to restart the control plane</li>
<li>D) The API server restart requires a full node reboot</li>
</ul>
<p><em>Explanation: Static Pods are managed by kubelet, which watches the manifest directory for changes. When the YAML file is fixed, kubelet automatically kills the old Pod and starts a new one.</em></p>

<p><strong>Q2:</strong> After running kubeadm init, a cluster admin runs kubectl get nodes and sees the control plane node with status "NotReady". What is the most likely cause?</p>
<ul>
<li>A) kubeadm init failed to create etcd</li>
<li>B) CNI plugin has not been installed ✓</li>
<li>C) The kubelet service is not running</li>
<li>D) The cluster lacks worker nodes</li>
</ul>
<p><em>Explanation: After kubeadm init, nodes remain NotReady until a CNI (Container Network Interface) plugin is installed. Without CNI, Pod networking doesn't work and nodes cannot report Ready.</em></p>

<p><strong>Q3:</strong> An administrator needs to run kubectl commands on a different cluster. What is the fastest way to switch without modifying the current kubeconfig permanently?</p>
<ul>
<li>A) Edit ~/.kube/config and change current-context</li>
<li>B) Use --context flag or kubectl config use-context ✓</li>
<li>C) Create a new kubeconfig file and delete the old one</li>
<li>D) Re-run kubeadm init with the target cluster</li>
</ul>
<p><em>Explanation: kubectl config use-context TARGET switches the active context. Alternatively, use --context=TARGET on individual commands for per-command switching without changing the default.</em></p>
