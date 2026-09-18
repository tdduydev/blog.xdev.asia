---
id: cka-d5-l10
title: 'Bài 10: Troubleshooting Nodes'
slug: 10-troubleshooting-nodes
description: >-
  Debug node NotReady: kubelet, container runtime, certificates. Node conditions,
  resource pressure, disk pressure. Systematic troubleshooting approach.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 10
section_title: "Domain 5: Troubleshooting (30%)"
course:
  id: lt-cka-series-001
  title: 'Luyện thi CKA — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai10-node-debug.webp" alt="Node Troubleshooting Decision Tree — NotReady debug workflow" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="node-conditions">1. Node Conditions</h2>

<pre><code class="language-text">kubectl describe node node1 | grep -A20 Conditions

Normal state:
  Type              Status  
  ----              ------  
  MemoryPressure    False   ← OK (True = low memory)
  DiskPressure      False   ← OK (True = low disk)
  PIDPressure       False   ← OK (True = too many processes)
  Ready             True    ← Node is healthy

Problem states:
  Ready             False   → kubelet not working
  Ready             Unknown → Node unreachable (network issue)</code></pre>

<h2 id="troubleshoot-not-ready">2. Troubleshoot NotReady Node</h2>

<pre><code class="language-text">Systematic approach — run in order:

1. Check node status
   kubectl get nodes
   kubectl describe node NODE_NAME | tail -40

2. SSH to node
   ssh node1

3. Check kubelet service
   systemctl status kubelet
   journalctl -u kubelet -n 50 --no-pager

4. Check container runtime
   systemctl status containerd
   crictl ps           # List running containers
   crictl pods         # List pod sandboxes

5. Check certificates (common issue after cluster age)
   ls /var/lib/kubelet/pki/
   openssl x509 -in /var/lib/kubelet/pki/kubelet.crt -noout -dates

6. Restart services if needed
   systemctl restart kubelet
   systemctl restart containerd</code></pre>

<blockquote><p><strong>Exam tip:</strong> Quy trình debug NotReady: <code>kubectl describe node</code> → SSH → <code>systemctl status kubelet</code> → <code>journalctl -u kubelet</code>. Hầu hết lỗi: kubelet stopped, wrong API server address, hoặc certificate expired.</p></blockquote>

<h2 id="common-node-issues">3. Common Node Issues</h2>

<table>
<thead><tr><th>Symptom</th><th>Nguyên nhân</th><th>Fix</th></tr></thead>
<tbody>
<tr><td>Node NotReady</td><td>kubelet crashed</td><td>systemctl restart kubelet</td></tr>
<tr><td>Node Unknown</td><td>Network partition</td><td>Check node network, firewall</td></tr>
<tr><td>MemoryPressure: True</td><td>Memory thiếu</td><td>Evict pods, scale node</td></tr>
<tr><td>DiskPressure: True</td><td>Disk đầy</td><td>Clean /var/log, /tmp, unused images</td></tr>
<tr><td>Pods stuck Terminating</td><td>Node unreachable</td><td>kubectl delete pod --force --grace-period=0</td></tr>
</tbody>
</table>

<h2 id="kubelet-config">4. kubelet Configuration</h2>

<pre><code class="language-text"># kubelet config locations
/var/lib/kubelet/config.yaml     # Main config
/etc/kubernetes/kubelet.conf     # kubeconfig (how kubelet connects to API server)
/var/lib/kubelet/kubeconfig      # Alternative path

# Common kubelet config issues:
# Wrong apiserver address
cat /etc/kubernetes/kubelet.conf | grep server

# Wrong cluster DNS
cat /var/lib/kubelet/config.yaml | grep clusterDNS

# Check kubelet's certificate
cat /var/lib/kubelet/config.yaml | grep client-certificate</code></pre>

<h2 id="node-cleanup">5. Node Image & Disk Cleanup</h2>

<pre><code class="language-text"># Check disk usage
df -h
du -sh /var/log/*
du -sh /var/lib/containerd

# Clean unused container images
crictl rmi --prune

# Remove old logs
find /var/log/pods -mtime +7 -delete

# Check PID pressure
ps aux | wc -l</code></pre>

<h2 id="cheatsheet">6. Cheat Sheet</h2>

<table>
<thead><tr><th>Task</th><th>Command</th></tr></thead>
<tbody>
<tr><td>Node health summary</td><td><code>kubectl describe node NAME</code></td></tr>
<tr><td>Kubelet status</td><td><code>systemctl status kubelet</code></td></tr>
<tr><td>Kubelet logs</td><td><code>journalctl -u kubelet -n 100</code></td></tr>
<tr><td>Running containers on node</td><td><code>crictl ps</code></td></tr>
<tr><td>Force delete stuck pod</td><td><code>kubectl delete pod NAME --force --grace-period=0</code></td></tr>
</tbody>
</table>

<h2 id="practice">7. Practice Questions</h2>

<p><strong>Q1:</strong> A node shows "Ready: Unknown" status. Which of the following is most likely causing this?</p>
<ul>
<li>A) The kubelet process crashed on the node</li>
<li>B) The node cannot be reached by the control plane (network issue) ✓</li>
<li>C) All Pods on the node are OOM-killed</li>
<li>D) The node has insufficient CPU resources</li>
</ul>
<p><em>Explanation: Ready: Unknown means the API server hasn't received a heartbeat from the kubelet recently. This typically indicates node is unreachable (network partition, node powered off). Ready: False means kubelet is reachable but reports a problem.</em></p>

<p><strong>Q2:</strong> After SSH-ing to a NotReady node, you run "systemctl status kubelet" and see "Active: failed". What should you check next?</p>
<ul>
<li>A) kubectl get pods -n kube-system</li>
<li>B) journalctl -u kubelet -n 50 to read the error logs ✓</li>
<li>C) Delete and recreate the node</li>
<li>D) Run kubeadm reset on the node</li>
</ul>
<p><em>Explanation: When kubelet fails, journalctl shows the detailed error: certificate issues, wrong API server URL, missing /var/lib/kubelet/config.yaml, etc. This is always the first diagnostic step after confirming kubelet is down.</em></p>

<p><strong>Q3:</strong> A node is reporting DiskPressure: True. What is the immediate effect on workloads?</p>
<ul>
<li>A) All Pods are immediately deleted</li>
<li>B) The node is marked unschedulable and BestEffort/Burstable Pods are evicted ✓</li>
<li>C) Only new Pod scheduling is prevented</li>
<li>D) The kubelet service stops</li>
</ul>
<p><em>Explanation: Under disk pressure, Kubernetes triggers pod eviction starting with BestEffort (no requests/limits), then Burstable. Guaranteed Pods are last to be evicted. The node is also tainted to prevent new scheduling.</em></p>
