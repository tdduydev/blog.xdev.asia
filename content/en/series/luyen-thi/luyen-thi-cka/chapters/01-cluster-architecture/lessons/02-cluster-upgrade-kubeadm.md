---
id: cka-d1-l02
title: 'Lesson 2: Cluster Upgrade with kubeadm'
slug: 02-cluster-upgrade-kubeadm
description: >-
  Upgrade Kubernetes cluster with kubeadm. Node drain, cordon, uncordon.
  Upgrade control plane first, then worker nodes.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 2
section_title: "Domain 1: Cluster Architecture, Installation & Configuration (25%)"
course:
  id: lt-cka-series-001
  title: 'CKA Exam Prep — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai2-upgrade.webp" alt="Kubernetes Cluster Upgrade Sequence — Control Plane first, then Workers" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="upgrade-overview">1. Upgrade Strategy Overview</h2>

<p>Kubernetes only supports upgrading <strong>1 minor version</strong> at a time (v1.28 → v1.29, not v1.28 → v1.30). Always upgrade the control plane before worker nodes.</p>

<pre><code class="language-text">Upgrade sequence:
  1. Upgrade kubeadm (on control plane node)
  2. kubeadm upgrade apply v1.29.0 (control plane components)
  3. Upgrade kubelet + kubectl (on control plane)
  4. For each worker node:
     a. kubectl drain NODE --ignore-daemonsets
     b. Upgrade kubeadm + kubelet + kubectl on node
     c. kubeadm upgrade node
     d. kubectl uncordon NODE</code></pre>

<h2 id="drain-cordon">2. Drain, Cordon & Uncordon</h2>

<table>
<thead><tr><th>Command</th><th>Effect</th><th>When to use</th></tr></thead>
<tbody>
<tr><td><code>kubectl cordon NODE</code></td><td>Mark node Unschedulable (no new pods)</td><td>Preparing for maintenance</td></tr>
<tr><td><code>kubectl drain NODE</code></td><td>Cordon + evict all non-DaemonSet pods</td><td>Upgrade / replace node</td></tr>
<tr><td><code>kubectl uncordon NODE</code></td><td>Mark node Schedulable again</td><td>After maintenance is done</td></tr>
</tbody>
</table>

<pre><code class="language-text">Common kubectl drain flags:
  --ignore-daemonsets     # DaemonSet pods cannot be evicted, ignore them
  --delete-emptydir-data  # Evict pods using emptyDir volume
  --force                 # Evict pods not managed by any controller</code></pre>

<blockquote><p><strong>Exam tip:</strong> <code>kubectl drain</code> without <code>--ignore-daemonsets</code> will fail if the node has DaemonSet pods. Always add this flag. If pods use <code>emptyDir</code>, also add <code>--delete-emptydir-data</code>.</p></blockquote>

<h2 id="upgrade-steps">3. Detailed Upgrade Steps</h2>

<pre><code class="language-text"># ====== CONTROL PLANE NODE ======

# Step 1: Upgrade kubeadm
apt-mark unhold kubeadm
apt-get install -y kubeadm=1.29.0-00
apt-mark hold kubeadm

# Step 2: Verify upgrade plan
kubeadm upgrade plan

# Step 3: Apply upgrade
kubeadm upgrade apply v1.29.0

# Step 4: Upgrade kubelet + kubectl  
apt-mark unhold kubelet kubectl
apt-get install -y kubelet=1.29.0-00 kubectl=1.29.0-00
apt-mark hold kubelet kubectl
systemctl daemon-reload && systemctl restart kubelet

# ====== WORKER NODE ======
(SSH into the worker node)

# Step 1: Drain node from control plane
kubectl drain worker-1 --ignore-daemonsets --delete-emptydir-data

# Step 2: Upgrade packages on worker
apt-mark unhold kubeadm kubelet kubectl
apt-get install -y kubeadm=1.29.0-00 kubelet=1.29.0-00 kubectl=1.29.0-00

# Step 3: Upgrade node config
kubeadm upgrade node

# Step 4: Restart kubelet
systemctl daemon-reload && systemctl restart kubelet

# Step 5: Uncordon from control plane
kubectl uncordon worker-1</code></pre>

<h2 id="version-skew">4. Version Skew Policy</h2>

<table>
<thead><tr><th>Component</th><th>Allowed skew vs kube-apiserver</th></tr></thead>
<tbody>
<tr><td>kube-apiserver</td><td>Must be same version as other control plane</td></tr>
<tr><td>kubelet</td><td>Can be 2 minor versions older</td></tr>
<tr><td>kubectl</td><td>±1 minor version from apiserver</td></tr>
<tr><td>kube-scheduler</td><td>Must match apiserver version</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> Worker node kubelet can run an older version during upgrade. This is why nodes can be upgraded one at a time while the cluster remains operational.</p></blockquote>

<h2 id="cheatsheet">5. Cheat Sheet</h2>

<table>
<thead><tr><th>Task</th><th>Command</th></tr></thead>
<tbody>
<tr><td>Check upgrade plan</td><td><code>kubeadm upgrade plan</code></td></tr>
<tr><td>Apply control plane upgrade</td><td><code>kubeadm upgrade apply v1.XX.0</code></td></tr>
<tr><td>Drain node (safe)</td><td><code>kubectl drain NODE --ignore-daemonsets --delete-emptydir-data</code></td></tr>
<tr><td>Mark node schedulable</td><td><code>kubectl uncordon NODE</code></td></tr>
<tr><td>Check node versions</td><td><code>kubectl get nodes -o wide</code></td></tr>
</tbody>
</table>

<h2 id="practice">6. Practice Questions</h2>

<p><strong>Q1:</strong> You need to upgrade a worker node. Before running the upgrade commands on the node, what step must you perform from the control plane?</p>
<ul>
<li>A) kubectl cordon the node to prevent new Pod scheduling</li>
<li>B) kubectl drain the node to evict running Pods ✓</li>
<li>C) kubectl delete the node and re-add it after upgrade</li>
<li>D) Run kubeadm upgrade plan to verify compatibility</li>
</ul>
<p><em>Explanation: kubectl drain both cordons (marks unschedulable) AND evicts all Pods gracefully. This ensures the node has no running workloads before maintenance begins. kubeadm upgrade plan is run on control plane, not required per-worker-node.</em></p>

<p><strong>Q2:</strong> The kubectl drain command fails with "cannot delete Pods not managed by ReplicationController, ReplicaSet, Job, DaemonSet or StatefulSet". What flag resolves this?</p>
<ul>
<li>A) --ignore-daemonsets</li>
<li>B) --delete-emptydir-data</li>
<li>C) --force ✓</li>
<li>D) --grace-period=0</li>
</ul>
<p><em>Explanation: --force is required to evict Pods that are not managed by any controller. Without a controller, the Pod won't be rescheduled elsewhere, so kubectl warns you and requires --force to confirm you accept potential data loss.</em></p>

<p><strong>Q3:</strong> What is the maximum kubelet version skew allowed compared to the kube-apiserver?</p>
<ul>
<li>A) ±1 minor version</li>
<li>B) 2 minor versions older ✓</li>
<li>C) Any version</li>
<li>D) Must be identical version</li>
</ul>
<p><em>Explanation: Per Kubernetes version skew policy, kubelet can be at most 2 minor versions older than kube-apiserver. This allows rolling upgrades where nodes are upgraded one at a time while the control plane is already on the new version.</em></p>
