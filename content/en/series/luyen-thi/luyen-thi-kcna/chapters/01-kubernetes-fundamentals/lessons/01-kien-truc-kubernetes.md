---
id: kcna-d1-l01
title: 'Lesson 1: Kubernetes Architecture & Core Components'
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
  title: 'KCNA Exam Prep — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai1-architecture.webp" alt="Kubernetes Architecture — Control Plane and Worker Node components" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="overview">1. Kubernetes Overview</h2>

<p><strong>Kubernetes</strong> (K8s) is an open-source container orchestration platform originally developed by Google, donated to the CNCF in 2014. Kubernetes automates deployment, scaling, and management of containerized applications.</p>

<blockquote><p><strong>Exam tip:</strong> KCNA Domain 1 accounts for <strong>46%</strong> of the exam. Questions often ask "Which component is responsible for..." — memorize each component's role.</p></blockquote>

<h2 id="architecture">2. Kubernetes Architecture</h2>

<p>A Kubernetes cluster consists of two types of nodes: <strong>Control Plane</strong> and <strong>Worker Node</strong>.</p>

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
<thead><tr><th>Component</th><th>Role</th><th>Exam keywords</th></tr></thead>
<tbody>
<tr><td><strong>kube-apiserver</strong></td><td>The sole entry point of the cluster, handling REST API requests. All communication goes through it.</td><td>"single point of truth", "REST API", "authentication & authorization"</td></tr>
<tr><td><strong>etcd</strong></td><td>Key-value store that holds all cluster state. The database of Kubernetes.</td><td>"cluster state", "consistent", "distributed key-value"</td></tr>
<tr><td><strong>kube-scheduler</strong></td><td>Watches for Pods without assigned nodes and selects a suitable node based on resources and constraints.</td><td>"schedule", "assign node", "resource fit"</td></tr>
<tr><td><strong>kube-controller-manager</strong></td><td>Runs multiple controller loops: Node, ReplicaSet, Endpoints, ServiceAccount, etc.</td><td>"reconciliation loop", "desired state", "controller"</td></tr>
<tr><td><strong>cloud-controller-manager</strong></td><td>Integrates with cloud provider APIs (AWS, GCP, Azure) — optional.</td><td>"cloud integration", "LoadBalancer provisioning"</td></tr>
</tbody>
</table>

<h2 id="worker-node">4. Worker Node Components</h2>

<table>
<thead><tr><th>Component</th><th>Role</th><th>Exam keywords</th></tr></thead>
<tbody>
<tr><td><strong>kubelet</strong></td><td>Agent running on each node; receives PodSpecs from the apiserver and ensures containers are running correctly.</td><td>"node agent", "PodSpec", "container health"</td></tr>
<tr><td><strong>kube-proxy</strong></td><td>Manages network rules (iptables/IPVS) for Services. Enables network communication to Pods.</td><td>"networking", "iptables", "Service load balancing"</td></tr>
<tr><td><strong>Container Runtime</strong></td><td>Software that runs containers: containerd, CRI-O. Docker has been deprecated.</td><td>"CRI", "containerd", "run containers"</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> <strong>kubelet</strong> is the only component that doesn't run inside a container — it runs as a systemd service directly on the node. If kubelet crashes, the node becomes NotReady.</p></blockquote>

<h2 id="objects">5. Core Kubernetes Objects</h2>

<p>Everything in Kubernetes is an <strong>object</strong> — declarative resources stored in etcd.</p>

<table>
<thead><tr><th>Object</th><th>Description</th><th>Scope</th></tr></thead>
<tbody>
<tr><td><strong>Pod</strong></td><td>Smallest unit, contains 1+ containers sharing network and storage</td><td>Namespaced</td></tr>
<tr><td><strong>Namespace</strong></td><td>Virtual cluster for resource isolation</td><td>Cluster-wide</td></tr>
<tr><td><strong>Node</strong></td><td>Worker machine (VM or physical)</td><td>Cluster-wide</td></tr>
<tr><td><strong>Deployment</strong></td><td>Manages stateless app replicas with rolling updates</td><td>Namespaced</td></tr>
<tr><td><strong>Service</strong></td><td>Stable network endpoint for Pods</td><td>Namespaced</td></tr>
<tr><td><strong>ConfigMap / Secret</strong></td><td>Configuration data</td><td>Namespaced</td></tr>
<tr><td><strong>PersistentVolume</strong></td><td>Storage resource</td><td>Cluster-wide</td></tr>
</tbody>
</table>

<h2 id="cheatsheet">6. Cheat Sheet — Component → Responsibility</h2>

<table>
<thead><tr><th>Question</th><th>Answer</th></tr></thead>
<tbody>
<tr><td>Where is the cluster state stored?</td><td><strong>etcd</strong></td></tr>
<tr><td>Which component selects a node for a Pod?</td><td><strong>kube-scheduler</strong></td></tr>
<tr><td>Which component runs on each worker and manages Pods?</td><td><strong>kubelet</strong></td></tr>
<tr><td>Which component handles all API calls?</td><td><strong>kube-apiserver</strong></td></tr>
<tr><td>Which component manages network rules for Services?</td><td><strong>kube-proxy</strong></td></tr>
<tr><td>Which component watches and reconciles desired state?</td><td><strong>kube-controller-manager</strong></td></tr>
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
