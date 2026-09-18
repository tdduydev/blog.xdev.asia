---
id: kcna-d1-l01
title: '第1課：Kubernetes 架構與核心元件'
slug: 01-kien-truc-kubernetes
description: >-
  Control Plane 與 Worker Node。kube-apiserver、etcd、kube-scheduler、
  controller-manager、kubelet、kube-proxy。Kubernetes 物件概覽。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 1
section_title: "Domain 1: Kubernetes Fundamentals (46%)"
course:
  id: lt-kcna-series-001
  title: 'KCNA 認證備考 — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai1-architecture.webp" alt="Kubernetes 架構 — Control Plane 與 Worker Node 元件" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="overview">1. Kubernetes 概覽</h2>

<p><strong>Kubernetes</strong>（K8s）是由 Google 開發的開源容器編排平台，於 2014 年捐贈給 CNCF。Kubernetes 自動化容器化應用程式的部署、擴展和管理。</p>

<blockquote><p><strong>考試重點：</strong> KCNA Domain 1 佔考試的 <strong>46%</strong>。題目常問「Which component is responsible for...」——需牢記每個元件的角色。</p></blockquote>

<h2 id="architecture">2. Kubernetes 架構</h2>

<p>Kubernetes 叢集由兩種節點組成：<strong>Control Plane</strong> 與 <strong>Worker Node</strong>。</p>

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

<h2 id="control-plane">3. Control Plane 元件</h2>

<table>
<thead><tr><th>元件</th><th>角色</th><th>考試關鍵詞</th></tr></thead>
<tbody>
<tr><td><strong>kube-apiserver</strong></td><td>叢集的唯一入口，處理 REST API。所有通訊都經過此元件。</td><td>"single point of truth"、"REST API"、"authentication &amp; authorization"</td></tr>
<tr><td><strong>etcd</strong></td><td>儲存所有叢集狀態的 Key-Value 存儲。是 Kubernetes 的資料庫。</td><td>"cluster state"、"consistent"、"distributed key-value"</td></tr>
<tr><td><strong>kube-scheduler</strong></td><td>查看尚未分配節點的 Pod，並根據資源和約束條件選擇合適的節點。</td><td>"schedule"、"assign node"、"resource fit"</td></tr>
<tr><td><strong>kube-controller-manager</strong></td><td>執行多個控制器迴圈：Node、ReplicaSet、Endpoints、ServiceAccount 等。</td><td>"reconciliation loop"、"desired state"、"controller"</td></tr>
<tr><td><strong>cloud-controller-manager</strong></td><td>與雲端供應商 API（AWS、GCP、Azure）整合——選用。</td><td>"cloud integration"、"LoadBalancer provisioning"</td></tr>
</tbody>
</table>

<h2 id="worker-node">4. Worker Node 元件</h2>

<table>
<thead><tr><th>元件</th><th>角色</th><th>考試關鍵詞</th></tr></thead>
<tbody>
<tr><td><strong>kubelet</strong></td><td>在每個節點上執行的代理程式，從 apiserver 接收 PodSpec 並確保容器正確執行。</td><td>"node agent"、"PodSpec"、"container health"</td></tr>
<tr><td><strong>kube-proxy</strong></td><td>為 Service 管理網路規則（iptables/IPVS）。允許網路流量到達 Pod。</td><td>"networking"、"iptables"、"Service load balancing"</td></tr>
<tr><td><strong>Container Runtime</strong></td><td>執行容器的軟體：containerd、CRI-O。Docker 已被棄用。</td><td>"CRI"、"containerd"、"run containers"</td></tr>
</tbody>
</table>

<blockquote><p><strong>考試重點：</strong> <strong>kubelet</strong> 是唯一不在容器中執行的元件——它是直接在節點上的 systemd 服務。如果 kubelet 崩潰，節點將變成 NotReady。</p></blockquote>

<h2 id="objects">5. Kubernetes 基本物件</h2>

<p>Kubernetes 中的一切都是 <strong>object</strong>——儲存在 etcd 中的宣告式資源。</p>

<table>
<thead><tr><th>物件</th><th>描述</th><th>範圍</th></tr></thead>
<tbody>
<tr><td><strong>Pod</strong></td><td>最小單位，包含 1+ 個容器共享網路和儲存</td><td>Namespaced</td></tr>
<tr><td><strong>Namespace</strong></td><td>虛擬叢集，隔離資源</td><td>Cluster-wide</td></tr>
<tr><td><strong>Node</strong></td><td>工作機器（VM 或實體機）</td><td>Cluster-wide</td></tr>
<tr><td><strong>Deployment</strong></td><td>管理無狀態應用副本與滾動更新</td><td>Namespaced</td></tr>
<tr><td><strong>Service</strong></td><td>Pod 的穩定網路端點</td><td>Namespaced</td></tr>
<tr><td><strong>ConfigMap / Secret</strong></td><td>組態設定資料</td><td>Namespaced</td></tr>
<tr><td><strong>PersistentVolume</strong></td><td>儲存資源</td><td>Cluster-wide</td></tr>
</tbody>
</table>

<h2 id="cheatsheet">6. 速查表 — 元件 → 職責</h2>

<table>
<thead><tr><th>問題</th><th>答案</th></tr></thead>
<tbody>
<tr><td>叢集狀態儲存在哪裡？</td><td><strong>etcd</strong></td></tr>
<tr><td>哪個元件為 Pod 選擇節點？</td><td><strong>kube-scheduler</strong></td></tr>
<tr><td>哪個元件在每個 Worker 上執行並管理 Pod？</td><td><strong>kubelet</strong></td></tr>
<tr><td>哪個元件處理所有 API 呼叫？</td><td><strong>kube-apiserver</strong></td></tr>
<tr><td>哪個元件管理 Service 的網路規則？</td><td><strong>kube-proxy</strong></td></tr>
<tr><td>哪個元件監視並協調期望狀態？</td><td><strong>kube-controller-manager</strong></td></tr>
</tbody>
</table>

<h2 id="practice">7. 練習題</h2>

<p><strong>Q1:</strong> 哪個 Kubernetes Control Plane 元件負責監視新建立但尚未分配節點的 Pod，並為它們選擇節點？</p>
<ul>
<li>A) kube-apiserver</li>
<li>B) kube-scheduler ✓</li>
<li>C) kube-controller-manager</li>
<li>D) kubelet</li>
</ul>
<p><em>解析：kube-scheduler 監視未排程的 Pod，並根據資源需求、親和性規則和約束條件將它們分配到合適的節點。</em></p>

<p><strong>Q2:</strong> Kubernetes 將所有叢集組態設定和狀態儲存在哪裡？</p>
<ul>
<li>A) kube-apiserver 記憶體</li>
<li>B) 每個節點的 /etc/kubernetes/</li>
<li>C) etcd ✓</li>
<li>D) kubelet 資料庫</li>
</ul>
<p><em>解析：etcd 是一致性、高可用的 Key-Value 存儲，作為所有 Kubernetes 叢集資料的後端存儲。備份 etcd = 備份整個叢集。</em></p>

<p><strong>Q3:</strong> Worker Node 上哪個元件負責確保 PodSpec 中描述的容器正在執行且健康？</p>
<ul>
<li>A) kube-proxy</li>
<li>B) Container runtime</li>
<li>C) kubelet ✓</li>
<li>D) kube-controller-manager</li>
</ul>
<p><em>解析：kubelet 是節點代理程式，從 kube-apiserver 接收 PodSpec 並確保所描述的容器正在執行。它將節點/Pod 狀態回報給 Control Plane。</em></p>
