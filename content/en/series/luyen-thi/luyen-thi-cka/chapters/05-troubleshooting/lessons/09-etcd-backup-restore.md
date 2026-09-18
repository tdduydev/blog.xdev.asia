---
id: cka-d5-l09
title: 'Lesson 9: etcd Backup & Restore'
slug: 09-etcd-backup-restore
description: >-
  etcd backup with etcdctl snapshot. Restore cluster from backup. TLS certificates
  for etcd. Critical CKA exam task — must be fully mastered.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 9
section_title: "Domain 5: Troubleshooting (30%)"
course:
  id: lt-cka-series-001
  title: 'CKA Exam Prep — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai9-etcd.webp" alt="etcd Backup and Restore Procedure" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="etcd-overview">1. etcd — Overview</h2>

<p><strong>etcd</strong> is a distributed key-value store that holds the entire cluster state: Pods, Services, Secrets, ConfigMaps, Nodes. Losing etcd = losing the entire cluster.</p>

<pre><code class="language-text">etcd info from kube-apiserver manifest:
  cat /etc/kubernetes/manifests/etcd.yaml

Key paths:
  --data-dir=/var/lib/etcd          # Data directory
  --cert-file=/etc/kubernetes/pki/etcd/server.crt
  --key-file=/etc/kubernetes/pki/etcd/server.key
  --trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt
  --listen-client-urls=https://127.0.0.1:2379</code></pre>

<h2 id="etcdctl-setup">2. etcdctl Setup</h2>

<pre><code class="language-text"># Set API version (always use v3)
export ETCDCTL_API=3

# Find etcd certs
ls /etc/kubernetes/pki/etcd/
# ca.crt, server.crt, server.key, healthcheck-client.*

# Test connection
etcdctl member list \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key</code></pre>

<blockquote><p><strong>Exam tip:</strong> You must set <code>ETCDCTL_API=3</code> before using etcdctl. API v2 uses different commands and is incompatible. On the exam, if you forget the cert paths: <code>cat /etc/kubernetes/manifests/etcd.yaml | grep cert</code> or <code>kubectl describe pod etcd -n kube-system</code>.</p></blockquote>

<h2 id="backup">3. Backup etcd</h2>

<pre><code class="language-text">ETCDCTL_API=3 etcdctl snapshot save /opt/etcd-backup.db \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key

# Verify backup
ETCDCTL_API=3 etcdctl snapshot status /opt/etcd-backup.db \
  --write-out=table

# Output:
+----------+----------+------------+------------+
|   HASH   | REVISION | TOTAL KEYS | TOTAL SIZE |
+----------+----------+------------+------------+
| abcdef12 |    12345 |       1234 |     4.5 MB |
+----------+----------+------------+------------+</code></pre>

<h2 id="restore">4. Restore etcd</h2>

<pre><code class="language-text"># Step 1: Restore to new data directory
ETCDCTL_API=3 etcdctl snapshot restore /opt/etcd-backup.db \
  --data-dir=/var/lib/etcd-restore

# Step 2: Update etcd manifest to use new data dir
vi /etc/kubernetes/manifests/etcd.yaml

# Change --data-dir and hostPath volume:
spec:
  containers:
  - command:
    - --data-dir=/var/lib/etcd-restore  # Changed
  volumes:
  - hostPath:
      path: /var/lib/etcd-restore       # Changed
      type: DirectoryOrCreate
    name: etcd-data

# Step 3: kubelet detects manifest change → restarts etcd
# Wait for etcd to restart (may take 2-3 min)
kubectl get pods -n kube-system | grep etcd</code></pre>

<blockquote><p><strong>Exam tip:</strong> After restoring, you need to wait for the entire control plane to restart and sync. You may need to restart: <code>systemctl restart kubelet</code>. If the API server doesn't come up, check logs: <code>crictl logs $(crictl ps -a --name kube-apiserver -q)</code>.</p></blockquote>

<h2 id="cheatsheet">5. Cheat Sheet — etcd Backup/Restore</h2>

<pre><code class="language-text"># BACKUP (4 required flags):
ETCDCTL_API=3 etcdctl snapshot save BACKUP_PATH \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=CA_CERT \
  --cert=SERVER_CERT \
  --key=SERVER_KEY

# RESTORE (minimal):
ETCDCTL_API=3 etcdctl snapshot restore BACKUP_PATH \
  --data-dir=NEW_DATA_DIR

# Then update /etc/kubernetes/manifests/etcd.yaml → data-dir + volume path</code></pre>

<table>
<thead><tr><th>Cert File</th><th>Path</th><th>Flag</th></tr></thead>
<tbody>
<tr><td>CA cert</td><td>/etc/kubernetes/pki/etcd/ca.crt</td><td>--cacert</td></tr>
<tr><td>Server cert</td><td>/etc/kubernetes/pki/etcd/server.crt</td><td>--cert</td></tr>
<tr><td>Server key</td><td>/etc/kubernetes/pki/etcd/server.key</td><td>--key</td></tr>
</tbody>
</table>

<h2 id="practice">6. Practice Questions</h2>

<p><strong>Q1:</strong> You perform an etcd snapshot restore to /var/lib/etcd-new. The cluster does not recover. What step is most likely missing?</p>
<ul>
<li>A) You need to re-run kubeadm init</li>
<li>B) The etcd static Pod manifest data-dir and volume path must be updated to point to the new directory ✓</li>
<li>C) etcdctl restore must be run with --force flag</li>
<li>D) The kube-apiserver certificate must be rotated</li>
</ul>
<p><em>Explanation: After restoring to a new directory, etcd's static Pod manifest (/etc/kubernetes/manifests/etcd.yaml) must be updated: change --data-dir flag AND the hostPath volume path to the new directory. Otherwise, etcd still reads the old (broken) data directory.</em></p>

<p><strong>Q2:</strong> What environment variable must be set to use etcdctl v3 API commands?</p>
<ul>
<li>A) ETCD_VERSION=3</li>
<li>B) ETCDCTL_API=3 ✓</li>
<li>C) KUBECONFIG=/etc/kubernetes/etcd.conf</li>
<li>D) ETCD_ENDPOINT=localhost:2379</li>
</ul>
<p><em>Explanation: ETCDCTL_API=3 enables v3 API commands (snapshot save, snapshot restore). Without it, etcdctl defaults to v2, which uses different command syntax and is incompatible with etcd v3 clusters (which all Kubernetes clusters use).</em></p>

<p><strong>Q3:</strong> Which of the following contains the TLS certificates required for etcdctl to communicate with the etcd server?</p>
<ul>
<li>A) /etc/kubernetes/pki/apiserver*.crt</li>
<li>B) /etc/kubernetes/pki/etcd/ directory ✓</li>
<li>C) ~/.kube/config</li>
<li>D) /var/lib/etcd/certs/</li>
</ul>
<p><em>Explanation: etcd certificates are stored in /etc/kubernetes/pki/etcd/. Important files: ca.crt (CA), server.crt and server.key (for etcdctl). These paths are also defined in the etcd static Pod manifest.</em></p>
