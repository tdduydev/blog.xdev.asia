---
id: 019c9618-0201-7000-8000-c1147ba22e12
title: 第 14 課：Kubernetes 網路模型
slug: bai-14-kubernetes-networking-model
description: Kubernetes 網路模型：容器到容器、Pod 到 Pod、Pod 到服務、外部到服務。 CNI 外掛程式、Cilium eBPF（建議 2026）、Calico、kube-proxy nftables（IPVS 已棄用 K8s 1.35）。
duration_minutes: 90
is_free: false
video_url: null
sort_order: 14
section_title: 第 4 單元：網絡
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: Kubernetes：從基礎到高級
  slug: kubernetes-tu-co-ban-den-nang-cao
locale: zh-tw
---
<h2>🎯 課程目標___HTMLTAG_1__HTMLTAG_2___了解基本到高階的 Kubernetes 網路模型：為什麼每個 Pod 都有自己的 IP、4 種通訊模式、CNI 外掛程式（Cilium 建議 2026）以及帶有 nftables 的通訊模式、CNI 外掛程式（Cilium 建議 2026）以及帶有 nftables 的 kMLTAG_3___HT

<img src="/storage/uploads/2026/03/k8s-networking-model-2026.webp" alt="Kubernetes Networking Model - 4 Communication Patterns" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h2>1。 Kubernetes 網路需求</h2>
<p>Kubernetes 有 3 個核心網路需求：</p>
<ul>
  <li>每個 Pod 必須能夠與叢集中的所有其他 Pod 通訊 <strong>不需要 NAT___HTMLTAG_12__HTMLTAG_13___
  <li>每個節點必須能夠與每個 Pod 通訊 <strong>不需要 NAT___HTMLTAG_16__HTMLTAG_17___
  <li>Pod 本身看到的 IP 必須與其他 Pod 看到的 IP 相同__HTMLTAG_19___
</ul>
<p>這是一個「扁平網路模型」－與預設的 Docker（基於 NAT）不同。 </p>

<h2>2。四種通訊模式</h2>

<h3>2.1 容器到容器（在同一個 Pod 中）</h3>
<p>同一 Pod 中的容器共享網路命名空間 → 透過 <code>localhost</code>.</p> 進行通信
___程式碼區塊_0___

<h3>2.2 Pod 到 Pod</h3>
<p>叢集中的每個 Pod 都有一個單獨的 IP。 Pod 直接透過 IP 進行通訊 — CNI 外掛程式可確保路由。 </p>
___程式碼區塊_1___

<h3>2.3 Pod 到服務</h3>
<p>Pod 透過 ClusterIP（虛擬 IP）與服務通訊。 kube-proxy 建立 iptables/nftables 規則以 DNAT（目標 NAT）到真實 Pod IP.</p>
___程式碼區塊_2___

<h3>2.4 外部服務</h3>
<p>透過 NodePort、LoadBalancer 或網關 API (HTTPRoute) 從叢集外部到服務的流量。 </p>

<h2>3。 CNI（容器網路介面）</h2>
<p>CNI 是 Kubernetes 和網路外掛之間的標準介面。建立 Pod 時，kubelet 呼叫 CNI 外掛程式：</p>
<ul>
  <li>為 Pod 建立網路介面</li>
  <li>分配 IP 位址</li>
  <li>路由配置</li>
</ul>

<h3>3.1 Cilium — 2026 年推薦</h3>
<p>Cilium 在核心層級使用 <strong>eBPF（擴充伯克利封包過濾器）</strong> — 不需要 iptables 鏈。 </p>
___HTMLTAG_61__HTMLTAG_62___Cilium 優勢</strong>：</p>
<ul>
  <li>eBPF：快速、可程式化、核心級網路</li>
  <li>L7 可見度與負載平衡（HTTP、gRPC、Kafka）</li>
  <li>透過 <strong>Hubble</strong> 內建可觀測性</strong>（即時網路流量）</li>
  <li>本機閘道 API 實作</li>
  <li>Sidecarless 服務網格（不需要 Envoy sidecar）</li>
  <li>網路政策：L3/L4/L7</li>
</ul>
___程式碼區塊_3___

<h3>3.2 印花布</h3>
<p>Calico 是成熟的 CNI，具有 eBPF 資料平面支援（選購）、裸機 BGP 路由。適用於需要廣泛相容性或需要與實體路由器進行 BGP 對等的情況。 </p><h3>3.3 法蘭絨</h3>
<p>Flannel 簡單且易於安裝，但 <strong> 缺乏網路策略支援和可觀察性</strong>。不建議用於生產。 </p>

<h2>4。 eBPF — 為什麼它比 iptables 快？ </h2>
<p>iptables 使用線性規則來配對 — O(n) 和 n 個規則。當叢集有數千個服務時，iptables鏈很長，影響效能。 </p>
<p>eBPF 使用雜湊映射 — 無論服務數量如何，查找都是 O(1)。 eBPF 程式直接在核心中運行，無需上下文切換到用戶空間。 </p>
___程式碼區塊_4___

<h2>5。 kube-代理模式 2026</h2>
<p>kube-proxy 在每個節點上實現服務負載平衡.</p>

<h3>5.1 iptables 模式（舊版）</h3>
<p>為每個服務端點建立 iptables DNAT 規則。仍然有效，但可擴展性較差。 </p>

<h3>5.2 nftables 模式 — 建議 2026</h3>
___HTMLTAG_107__HTMLTAG_108___IPVS 模式已棄用 K8s 1.35</strong>。 nftables 是新的後端，比 iptables 更有效率。 </p>
___程式碼區塊_5___
___程式碼區塊_6___

<h2>6。使用 CoreDNS 的 DNS</h2>
<p>CoreDNS 是 Kubernetes 的預設 DNS 伺服器，在 <code>kube-system</code>.</p> 中作為 Deployment 運行
___程式碼區塊_7___

<h2>7。網路圖</h2>
___程式碼區塊_8___

<h2>摘要</h2>
<ul>
  <li>Kubernetes扁平網路：每個Pod都有自己的IP，沒有NAT</li>
  <li>4 種模式：容器到容器 (localhost)、pod 到 pod（直接 IP）、pod 到服務（ClusterIP + kube-proxy）、外部到服務（NodePort/網關 API）</li>
  <li>Cilium eBPF：CNI 2026 年推薦 — 快速、L7 可觀察性、本機 API 閘道</li>
  <li>kube-proxy nftables：取代 IPVS（已棄用 K8s 1.35）</li>
  <li>CoreDNS：透過 DNS 名稱發現服務</li>
</ul>