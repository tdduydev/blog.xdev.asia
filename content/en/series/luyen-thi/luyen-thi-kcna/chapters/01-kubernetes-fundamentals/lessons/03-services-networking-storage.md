---
id: kcna-d1-l03
title: 'Lesson 3: Services, Networking & Storage'
slug: 03-services-networking-storage
description: >-
  ClusterIP, NodePort, LoadBalancer, ExternalName. CoreDNS, Service discovery.
  Ingress & Ingress Controller. PV, PVC, StorageClass. ConfigMaps & Secrets.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 3
section_title: "Domain 1: Kubernetes Fundamentals (46%)"
course:
  id: lt-kcna-series-001
  title: 'KCNA Exam Prep — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai3-services-networking.webp" alt="Kubernetes Services & Networking — ClusterIP, NodePort, LoadBalancer, Ingress" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="service-types">1. Kubernetes Service Types</h2>

<p>A <strong>Service</strong> provides a stable network endpoint (IP + DNS name) for a group of Pods. It uses label selectors to find target Pods.</p>

<pre><code class="language-text">Service Traffic Flow:
  Client ──► Service (ClusterIP: 10.96.1.100) ──► Pod 1
                                                ──► Pod 2
                                                ──► Pod 3
  kube-proxy manages iptables/IPVS rules for load balancing</code></pre>

<table>
<thead><tr><th>Service Type</th><th>Scope</th><th>Use case</th><th>Access</th></tr></thead>
<tbody>
<tr><td><strong>ClusterIP</strong></td><td>Internal only</td><td>Default, service-to-service communication</td><td>Only within the cluster</td></tr>
<tr><td><strong>NodePort</strong></td><td>External via node IP</td><td>Dev/test, direct access via node</td><td>NodeIP:30000-32767</td></tr>
<tr><td><strong>LoadBalancer</strong></td><td>External via cloud LB</td><td>Production on AWS/GCP/Azure</td><td>External IP from cloud provider</td></tr>
<tr><td><strong>ExternalName</strong></td><td>CNAME redirect</td><td>Connect to external services by DNS</td><td>Returns CNAME record</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> <strong>ClusterIP</strong> is the default — if the question says "service accessible within the cluster," that's ClusterIP. If the question asks "expose to the internet," it's <strong>LoadBalancer</strong>.</p></blockquote>

<h2 id="dns">2. CoreDNS & Service Discovery</h2>

<pre><code class="language-text">DNS Resolution in Kubernetes:
  my-service.my-namespace.svc.cluster.local
  ─────────  ────────────  ───  ─────────────
  Service     Namespace    Type  Cluster domain

  Pod in same namespace: curl http://my-service:8080
  Pod in different namespace: curl http://my-service.other-ns:8080</code></pre>

<p><strong>CoreDNS</strong> is a CNCF graduated project, the default DNS server in Kubernetes. It automatically creates DNS records for Services and Pods.</p>

<h2 id="ingress">3. Ingress & Ingress Controller</h2>

<p><strong>Ingress</strong> manages external HTTP/HTTPS access to services via host/path rules. Requires an <strong>Ingress Controller</strong> (nginx, traefik, HAProxy).</p>

<pre><code class="language-text">Ingress Routing:
  Client request: https://app.example.com/api
                        │
                 ┌──────▼──────┐
                 │   Ingress   │
                 │  Controller │
                 │   (nginx)   │
                 └──────┬──────┘
           ┌────────────┼────────────┐
     /api → Service A   /web → Service B   /docs → Service C</code></pre>

<h2 id="storage">4. Storage — PV, PVC, StorageClass</h2>

<pre><code class="language-text">Storage Architecture:
  Pod
   │ volumeMounts: /data
   ▼
  PVC (PersistentVolumeClaim)  ← "I want 10Gi ReadWriteOnce"
   │ bound
   ▼
  PV  (PersistentVolume)       ← "Here is 10Gi from AWS EBS"
   │ provisioned by
   ▼
  StorageClass                 ← "auto-provision EBS gp3"</code></pre>

<table>
<thead><tr><th>Concept</th><th>Role</th><th>Created by</th></tr></thead>
<tbody>
<tr><td><strong>PV</strong> (PersistentVolume)</td><td>Actual storage resource</td><td>Admin or dynamic (StorageClass)</td></tr>
<tr><td><strong>PVC</strong> (PersistentVolumeClaim)</td><td>Pod requests storage</td><td>Developer</td></tr>
<tr><td><strong>StorageClass</strong></td><td>Auto-provision PVs based on demand</td><td>Admin</td></tr>
</tbody>
</table>

<h3 id="access-modes">Access Modes</h3>

<table>
<thead><tr><th>Mode</th><th>Abbreviation</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td><strong>ReadWriteOnce</strong></td><td>RWO</td><td>1 node can mount read-write</td></tr>
<tr><td><strong>ReadOnlyMany</strong></td><td>ROX</td><td>Many nodes mount read-only</td></tr>
<tr><td><strong>ReadWriteMany</strong></td><td>RWX</td><td>Many nodes mount read-write</td></tr>
</tbody>
</table>

<h2 id="configmap-secret">5. ConfigMap & Secret</h2>

<table>
<thead><tr><th>Resource</th><th>Used for</th><th>Encoding</th><th>Mounting options</th></tr></thead>
<tbody>
<tr><td><strong>ConfigMap</strong></td><td>Non-sensitive config (DB_HOST, LOG_LEVEL)</td><td>Plain text</td><td>env var, volume file</td></tr>
<tr><td><strong>Secret</strong></td><td>Sensitive data (password, API key, TLS cert)</td><td>Base64 (not encrypted by default!)</td><td>env var, volume file</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> Secrets are <strong>base64-encoded, not encrypted</strong> by default. To actually encrypt, you need to enable Encryption at Rest. KCNA may ask about the distinction between encoding and encryption.</p></blockquote>

<h2 id="cheatsheet">6. Cheat Sheet</h2>

<table>
<thead><tr><th>Exam question</th><th>Answer</th></tr></thead>
<tbody>
<tr><td>Default Service type?</td><td><strong>ClusterIP</strong></td></tr>
<tr><td>Service accessed from the internet?</td><td><strong>LoadBalancer</strong></td></tr>
<tr><td>L7 HTTP routing?</td><td><strong>Ingress</strong></td></tr>
<tr><td>K8s DNS server?</td><td><strong>CoreDNS</strong></td></tr>
<tr><td>Multiple nodes mounting same volume read-write?</td><td><strong>ReadWriteMany (RWX)</strong></td></tr>
<tr><td>Auto-provision PVs?</td><td><strong>StorageClass</strong></td></tr>
<tr><td>Secrets are encrypted?</td><td>No — base64 encoded only, encryption at rest is separate</td></tr>
</tbody>
</table>

<h2 id="practice">7. Practice Questions</h2>

<p><strong>Q1:</strong> A development team needs to expose their Kubernetes Service to external traffic on a cloud provider. Which Service type should they use?</p>
<ul>
<li>A) ClusterIP</li>
<li>B) NodePort</li>
<li>C) LoadBalancer ✓</li>
<li>D) ExternalName</li>
</ul>
<p><em>Explanation: LoadBalancer type creates an external load balancer via the cloud provider (AWS ELB, GCP LB, Azure LB), automatically assigning a public IP for external access.</em></p>

<p><strong>Q2:</strong> What is the full DNS name of a Service called 'payment' in the 'production' namespace?</p>
<ul>
<li>A) payment.production</li>
<li>B) payment.production.svc.cluster.local ✓</li>
<li>C) payment.svc.production.local</li>
<li>D) production.payment.cluster.svc</li>
</ul>
<p><em>Explanation: Kubernetes DNS format: &lt;service&gt;.&lt;namespace&gt;.svc.cluster.local. This is an auto-created A record by CoreDNS.</em></p>

<p><strong>Q3:</strong> An application requires shared storage that multiple Pods on different nodes can read and write. Which access mode is needed?</p>
<ul>
<li>A) ReadWriteOnce (RWO)</li>
<li>B) ReadOnlyMany (ROX)</li>
<li>C) ReadWriteMany (RWX) ✓</li>
<li>D) ReadWriteOncePod</li>
</ul>
<p><em>Explanation: RWX (ReadWriteMany) allows multiple nodes to mount the volume for both reading and writing. Typically requires network storage like NFS, EFS, or CephFS. Block storage (EBS, GCP PD) usually only supports RWO.</em></p>
