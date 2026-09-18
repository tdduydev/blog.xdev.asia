---
id: kcna-d1-l03
title: 'Bài 3: Services, Networking & Storage'
slug: 03-services-networking-storage
description: >-
  Service types (ClusterIP, NodePort, LoadBalancer, ExternalName). CoreDNS
  và service discovery. PersistentVolume, PVC, ConfigMap, Secret.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 3
section_title: "Domain 1: Kubernetes Fundamentals (46%)"
course:
  id: lt-kcna-series-001
  title: 'Luyện thi KCNA — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai3-services-networking.webp" alt="Kubernetes Services và Networking — ClusterIP, NodePort, LoadBalancer" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="services">1. Service Types</h2>

<p>Pods có IP tạm thời, bị xóa khi restart. <strong>Service</strong> cung cấp stable Virtual IP (ClusterIP) và load-balancing đến một nhóm Pods qua label selector.</p>

<table>
<thead><tr><th>Type</th><th>Reachable From</th><th>Use Case</th><th>Real-world Example</th></tr></thead>
<tbody>
<tr><td><strong>ClusterIP</strong></td><td>Cluster internal only</td><td>Backend microservices</td><td>Payment service → DB</td></tr>
<tr><td><strong>NodePort</strong></td><td>External via NodeIP:Port (30000-32767)</td><td>Dev/test access</td><td>Demo app on bare metal</td></tr>
<tr><td><strong>LoadBalancer</strong></td><td>External via cloud LB</td><td>Production apps on cloud</td><td>AWS/GCP internet traffic</td></tr>
<tr><td><strong>ExternalName</strong></td><td>CNAME alias for external service</td><td>Integrate external DNS</td><td>legacy-db.company.com</td></tr>
</tbody>
</table>

<pre><code class="language-text">External Traffic
      │
      ▼
[LoadBalancer]          ← cloud provider LB (AWS ELB, GCP)
      │
[NodePort :30080]       ← all nodes expose port 30080
      │
[ClusterIP 10.96.5.3]  ← virtual IP, iptables/IPVS routing
      │
 ┌────┴────┐
[Pod A] [Pod B]        ← matched by label selector</code></pre>

<blockquote><p><strong>Exam tip:</strong> <strong>NodePort</strong> tự động tạo thêm <strong>ClusterIP</strong>. <strong>LoadBalancer</strong> tự động tạo thêm <strong>NodePort + ClusterIP</strong>. Mỗi type kế thừa type nhỏ hơn.</p></blockquote>

<h2 id="coredns">2. CoreDNS & Service Discovery</h2>

<p><strong>CoreDNS</strong> là DNS server mặc định trong Kubernetes cluster. Mỗi Service được đăng ký DNS record tự động.</p>

<pre><code class="language-text">DNS format: {service}.{namespace}.svc.cluster.local

Ví dụ:
  Service "api" trong namespace "production":
  → api.production.svc.cluster.local
  → api.production.svc
  → api.production
  → api  (chỉ trong cùng namespace)</code></pre>

<table>
<thead><tr><th>DNS Query</th><th>Resolves To</th><th>Works From</th></tr></thead>
<tbody>
<tr><td><code>api</code></td><td>Service ClusterIP</td><td>Same namespace only</td></tr>
<tr><td><code>api.production</code></td><td>Service ClusterIP</td><td>Any namespace</td></tr>
<tr><td><code>api.production.svc.cluster.local</code></td><td>Service ClusterIP</td><td>Any namespace (FQDN)</td></tr>
</tbody>
</table>

<h2 id="storage">3. Storage: PV, PVC, StorageClass</h2>

<pre><code class="language-text">Storage lifecycle:
                    STATIC                     DYNAMIC
                    ─────                      ───────
  Admin creates  → PersistentVolume     StorageClass (provision template)
  App requests   → PersistentVolumeClaim → SC auto-provisions PV
  Pod mounts     → PVC as volume</code></pre>

<table>
<thead><tr><th>Concept</th><th>Vai trò</th><th>Ai tạo</th></tr></thead>
<tbody>
<tr><td><strong>PersistentVolume (PV)</strong></td><td>Tài nguyên storage thực tế (NFS, EBS, GCE Disk)</td><td>Admin hoặc dynamic provisioner</td></tr>
<tr><td><strong>PersistentVolumeClaim (PVC)</strong></td><td>Request storage với size + access mode</td><td>Developer / App</td></tr>
<tr><td><strong>StorageClass</strong></td><td>Template tự động tạo PV khi có PVC</td><td>Admin</td></tr>
</tbody>
</table>

<h3 id="access-modes">Access Modes</h3>

<table>
<thead><tr><th>Mode</th><th>Abbrev</th><th>Ý nghĩa</th><th>Ví dụ</th></tr></thead>
<tbody>
<tr><td>ReadWriteOnce</td><td><strong>RWO</strong></td><td>1 node đọc+ghi</td><td>EBS volume, local disk</td></tr>
<tr><td>ReadOnlyMany</td><td><strong>ROX</strong></td><td>Nhiều nodes đọc</td><td>Static files on NFS</td></tr>
<tr><td>ReadWriteMany</td><td><strong>RWX</strong></td><td>Nhiều nodes đọc+ghi</td><td>NFS, EFS, GlusterFS</td></tr>
<tr><td>ReadWriteOncePod</td><td><strong>RWOP</strong></td><td>Chỉ 1 Pod (v1.22+)</td><td>Exclusive access needed</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> AWS EBS chỉ hỗ trợ <strong>RWO</strong>. Nếu câu hỏi yêu cầu nhiều Pods ghi đồng thời, cần dùng NFS (RWX). StatefulSet thường dùng RWO với mỗi Pod có PVC riêng.</p></blockquote>

<h2 id="configmap-secret">4. ConfigMap & Secret</h2>

<table>
<thead><tr><th>Resource</th><th>Dùng cho</th><th>Encoding</th><th>Inject vào Pod</th></tr></thead>
<tbody>
<tr><td><strong>ConfigMap</strong></td><td>Config không nhạy cảm (URLs, flags, env files)</td><td>Plain text</td><td>Env var, volume file, CLI args</td></tr>
<tr><td><strong>Secret</strong></td><td>Data nhạy cảm (passwords, API keys, TLS certs)</td><td>Base64 (NOT encrypted by default)</td><td>Env var (không khuyến khích), volume mount</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> Secret chỉ là base64 encoded, <strong>KHÔNG phải encrypted</strong>. Để encrypt Secret at rest, cần bật <strong>Encryption Configuration</strong> ở API Server. Câu hỏi hay dùng "encrypted" như distractor sai.</p></blockquote>

<h2 id="cheatsheet">5. Cheat Sheet</h2>

<table>
<thead><tr><th>Câu hỏi exam</th><th>Đáp án</th></tr></thead>
<tbody>
<tr><td>Expose app ra ngoài cluster trên cloud?</td><td><strong>LoadBalancer</strong> (hoặc Ingress)</td></tr>
<tr><td>DNS name cho Service "db" trong ns "backend"?</td><td><code>db.backend.svc.cluster.local</code></td></tr>
<tr><td>Cần storage shared giữa nhiều Pods?</td><td>PV với access mode <strong>RWX</strong></td></tr>
<tr><td>Tự động provision storage khi deploy?</td><td><strong>StorageClass</strong> + PVC</td></tr>
<tr><td>Secret có bị encrypt by default?</td><td><strong>Không</strong>, chỉ base64</td></tr>
</tbody>
</table>

<h2 id="practice">6. Practice Questions</h2>

<p><strong>Q1:</strong> A developer wants to access a backend database Service named "orders-db" from a different namespace called "frontend". Which DNS name should they use?</p>
<ul>
<li>A) orders-db</li>
<li>B) orders-db.default.svc.cluster.local</li>
<li>C) orders-db.backend.svc.cluster.local ✓</li>
<li>D) backend.orders-db.cluster.local</li>
</ul>
<p><em>Explanation: Cross-namespace DNS requires the full format: {service}.{namespace}.svc.cluster.local. Short name "orders-db" only works within the same namespace.</em></p>

<p><strong>Q2:</strong> Which Service type automatically creates a ClusterIP AND a NodePort?</p>
<ul>
<li>A) ClusterIP</li>
<li>B) NodePort</li>
<li>C) LoadBalancer ✓</li>
<li>D) ExternalName</li>
</ul>
<p><em>Explanation: LoadBalancer is a superset — it creates ClusterIP + NodePort + cloud load balancer. NodePort includes ClusterIP, but ClusterIP is standalone with no external access.</em></p>

<p><strong>Q3:</strong> A Secret contains a database password. A developer claims the password is "encrypted". Is this claim accurate?</p>
<ul>
<li>A) Yes, Kubernetes Secrets are encrypted with AES</li>
<li>B) No, Secrets are only base64 encoded unless Encryption Configuration is enabled ✓</li>
<li>C) Yes, Secrets are encrypted using etcd's built-in encryption</li>
<li>D) No, Secrets are stored in plain text</li>
</ul>
<p><em>Explanation: By default, Secrets are stored as base64-encoded strings in etcd — which is NOT encryption. Administrators must configure EncryptionConfiguration on the API server to enable encryption at rest.</em></p>
