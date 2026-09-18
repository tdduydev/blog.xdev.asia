---
id: kcna-d1-l01
title: 'Bài 1: Kubernetes Architecture & Core Components'
slug: 01-kien-truc-kubernetes
description: >-
  Control plane vs Worker node. kube-apiserver, etcd, kube-scheduler,
  controller-manager, kubelet, kube-proxy. Kubernetes objects overview.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 1
section_title: "Domain 1: Kubernetes Fundamentals (46%)"
course:
  id: lt-kcna-series-001
  title: 'Luyện thi KCNA — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai1-architecture.webp" alt="Kubernetes Architecture — Control Plane và Worker Node components" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="overview">1. Tổng quan Kubernetes</h2>

<p><strong>Kubernetes</strong> (K8s) là nền tảng orchestration container mã nguồn mở do Google phát triển, tặng cho CNCF năm 2014. Kubernetes tự động hóa việc triển khai, scaling và quản lý containerized applications.</p>

<blockquote><p><strong>Exam tip:</strong> KCNA Domain 1 chiếm <strong>46%</strong> đề thi. Câu hỏi thường hỏi "Which component is responsible for..." — học thuộc vai trò từng component.</p></blockquote>

<h2 id="architecture">2. Kiến trúc Kubernetes</h2>

<p>Cluster Kubernetes gồm hai loại node: <strong>Control Plane</strong> và <strong>Worker Node</strong>.</p>

<pre><code class="language-text">┌─────────────────────────────────────────────────────────┐
│                    CONTROL PLANE                        │
│  ┌──────────────┐  ┌─────────┐  ┌────────────────────┐ │
│  │ kube-apiserver│  │  etcd   │  │kube-controller-mgr │ │
│  │  (REST API)  │  │(DB key- │  │ - Node Controller  │ │
│  │  front door  │  │ value)  │  │ - ReplicaSet Ctrl  │ │
│  └──────────────┘  └─────────┘  │ - Endpoints Ctrl   │ │
│  ┌──────────────┐               └────────────────────┘ │
│  │kube-scheduler│                                       │
│  │ (assign node)│                                       │
│  └──────────────┘                                       │
└─────────────────────────────────────────────────────────┘
         │              │              │
┌────────▼──────┐ ┌─────▼──────┐ ┌───▼────────────┐
│  WORKER NODE 1│ │WORKER NODE 2│ │  WORKER NODE 3 │
│  ┌──────────┐ │ │ ┌────────┐ │ │  ┌──────────┐  │
│  │ kubelet  │ │ │ │kubelet │ │ │  │ kubelet  │  │
│  │kube-proxy│ │ │ │k-proxy │ │ │  │kube-proxy│  │
│  │ Pod Pod  │ │ │ │Pod Pod │ │ │  │ Pod Pod  │  │
│  └──────────┘ │ │ └────────┘ │ │  └──────────┘  │
└───────────────┘ └────────────┘ └────────────────┘</code></pre>

<h2 id="control-plane">3. Control Plane Components</h2>

<table>
<thead><tr><th>Component</th><th>Vai trò</th><th>Từ khóa exam</th></tr></thead>
<tbody>
<tr><td><strong>kube-apiserver</strong></td><td>Cổng vào duy nhất của cluster, xử lý REST API. Mọi communication đều qua đây.</td><td>"single point of truth", "REST API", "authentication &amp; authorization"</td></tr>
<tr><td><strong>etcd</strong></td><td>Key-value store lưu trữ toàn bộ cluster state. Là database của Kubernetes.</td><td>"cluster state", "consistent", "distributed key-value"</td></tr>
<tr><td><strong>kube-scheduler</strong></td><td>Xem xét Pod chưa có node và chọn node phù hợp dựa trên resources, constraints.</td><td>"schedule", "assign node", "resource fit"</td></tr>
<tr><td><strong>kube-controller-manager</strong></td><td>Chạy nhiều controller loops: Node, ReplicaSet, Endpoints, ServiceAccount, v.v.</td><td>"reconciliation loop", "desired state", "controller"</td></tr>
<tr><td><strong>cloud-controller-manager</strong></td><td>Tích hợp với cloud provider API (AWS, GCP, Azure) — tùy chọn.</td><td>"cloud integration", "LoadBalancer provisioning"</td></tr>
</tbody>
</table>

<h2 id="worker-node">4. Worker Node Components</h2>

<table>
<thead><tr><th>Component</th><th>Vai trò</th><th>Từ khóa exam</th></tr></thead>
<tbody>
<tr><td><strong>kubelet</strong></td><td>Agent chạy trên mỗi node, nhận PodSpec từ apiserver và đảm bảo containers chạy đúng.</td><td>"node agent", "PodSpec", "container health"</td></tr>
<tr><td><strong>kube-proxy</strong></td><td>Quản lý network rules (iptables/IPVS) cho Services. Cho phép network communication đến Pods.</td><td>"networking", "iptables", "Service load balancing"</td></tr>
<tr><td><strong>Container Runtime</strong></td><td>Software chạy containers: containerd, CRI-O. Docker đã bị deprecated.</td><td>"CRI", "containerd", "run containers"</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> <strong>kubelet</strong> là component duy nhất không chạy trong container — nó là systemd service trực tiếp trên node. Nếu kubelet crash, node sẽ NotReady.</p></blockquote>

<h2 id="objects">5. Kubernetes Objects Cơ Bản</h2>

<p>Mọi thứ trong Kubernetes là <strong>object</strong> — declarative resources được lưu trong etcd.</p>

<table>
<thead><tr><th>Object</th><th>Mô tả</th><th>Scope</th></tr></thead>
<tbody>
<tr><td><strong>Pod</strong></td><td>Unit nhỏ nhất, chứa 1+ containers chia sẻ network và storage</td><td>Namespaced</td></tr>
<tr><td><strong>Namespace</strong></td><td>Virtual cluster, isolate resources</td><td>Cluster-wide</td></tr>
<tr><td><strong>Node</strong></td><td>Worker machine (VM hoặc physical)</td><td>Cluster-wide</td></tr>
<tr><td><strong>Deployment</strong></td><td>Manage stateless app replicas với rolling update</td><td>Namespaced</td></tr>
<tr><td><strong>Service</strong></td><td>Stable network endpoint cho Pods</td><td>Namespaced</td></tr>
<tr><td><strong>ConfigMap / Secret</strong></td><td>Configuration data</td><td>Namespaced</td></tr>
<tr><td><strong>PersistentVolume</strong></td><td>Storage resource</td><td>Cluster-wide</td></tr>
</tbody>
</table>

<h2 id="cheatsheet">6. Cheat Sheet — Component → Nhiệm vụ</h2>

<table>
<thead><tr><th>Câu hỏi</th><th>Trả lời</th></tr></thead>
<tbody>
<tr><td>Lưu cluster state ở đâu?</td><td><strong>etcd</strong></td></tr>
<tr><td>Component nào chọn node cho Pod?</td><td><strong>kube-scheduler</strong></td></tr>
<tr><td>Component nào chạy trên mỗi worker, quản lý Pods?</td><td><strong>kubelet</strong></td></tr>
<tr><td>Component nào xử lý tất cả API calls?</td><td><strong>kube-apiserver</strong></td></tr>
<tr><td>Component nào manage network rules cho Services?</td><td><strong>kube-proxy</strong></td></tr>
<tr><td>Component nào watch và reconcile desired state?</td><td><strong>kube-controller-manager</strong></td></tr>
</tbody>
</table>

<h2 id="practice">7. Practice Questions</h2>

<p><strong>Q1:</strong> Which Kubernetes control plane component is responsible for watching newly created Pods that have no node assigned, and selecting a node for them?</p>
<ul>
<li>A) kube-apiserver</li>
<li>B) kube-scheduler ✓</li>
<li>C) kube-controller-manager</li>
<li>D) kubelet</li>
</ul>
<p><em>Explanation: kube-scheduler watches for unscheduled Pods and assigns them to suitable nodes based on resource requirements, affinity rules, and constraints.</em></p>

<p><strong>Q2:</strong> Where does Kubernetes store all cluster configuration and state?</p>
<ul>
<li>A) kube-apiserver memory</li>
<li>B) /etc/kubernetes/ on each node</li>
<li>C) etcd ✓</li>
<li>D) kubelet database</li>
</ul>
<p><em>Explanation: etcd is the consistent, highly-available key-value store that serves as the backing store for all Kubernetes cluster data. Backing up etcd = backing up the entire cluster.</em></p>

<p><strong>Q3:</strong> Which component on a Worker Node is responsible for ensuring containers described in PodSpecs are running and healthy?</p>
<ul>
<li>A) kube-proxy</li>
<li>B) Container runtime</li>
<li>C) kubelet ✓</li>
<li>D) kube-controller-manager</li>
</ul>
<p><em>Explanation: kubelet is the node agent that receives PodSpecs from kube-apiserver and ensures the described containers are running. It reports node/Pod status back to the control plane.</em></p>
