---
id: 019c9618-0006-7000-8000-c1147ba22e10
title: 第 7 課：服務與端點切片
slug: bai-7-services-va-endpointslices
description: 使用 Kubernetes 服務進行服務發現和負載平衡。 ClusterIP、NodePort、負載平衡器、外部名稱。 EndpointSlices 是取代 Endpoints API 的新標準（已棄用 K8s 1.33）。 Kubernetes 中的無頭服務和 DNS。
duration_minutes: 80
is_free: false
video_url: null
sort_order: 7
section_title: 模組 2：基本 Kubernetes 對象
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: Kubernetes：從基礎到高級
  slug: kubernetes-tu-co-ban-den-nang-cao
locale: zh-tw
---
<h2>🎯 課程目標___HTMLTAG_1__HTMLTAG_2___了解 Kubernetes 中需要服務的原因、服務類型以及何時使用每種類型，EndpointSlices 是取代 Endpoints API、使用 CoreDNS 進行基於 DNS 的服務發現的新標準。 </p>

<h2>1。為什麼我們需要服務？ </h2>
<p>Pod 具有 <strong>動態 IP</strong> — 每次重新建立 Pod 時（在崩潰、更新、擴充功能之後），它都會獲得一個新 IP。如果服務 A 想要呼叫服務 B，則服務 A 無法硬編碼 B 的 IP。 </p>
<p>Service 為一組 Pod 提供穩定的 <strong>endpoint__HTMLTAG_12___（IP 和 DNS 名稱）。服務的流量將負載平衡到健康的 Pod。 </p>

<h2>2。服務類型</h2>

<img src="/storage/uploads/2026/03/k8s-service-types-2026.webp" alt="Kubernetes Service Types - ClusterIP, NodePort, LoadBalancer, ExternalName" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h3>2.1 ClusterIP（預設）</h3>
<p>使用叢集中的內部 IP 公開服務。只能從集群內部存取。 </p>
___程式碼區塊_0___

<h3>2.2 NodePort</h3>
<p>透過節點的 IP 和靜態連接埠 (30000-32767) 在叢集外部公開服務.</p>
___程式碼區塊_1___
<p>存取：<code>http://<any-node-ip>:31000___HTMLTAG_27__HTMLTAG_28___

<h3>2.3 負載平衡器</h3>
<p>建立外部負載平衡器（在雲端提供者上：AWS ELB、GCP CLB、Azure LB）。用於雲端上的生產。 </p>
___程式碼區塊_2___
<p>現代替代方案：使用 <strong>Gateway API</strong>（請參閱模組 4）— 更具表現力，無供應商鎖定。 </p>

<h3>2.4 外部名稱</h3>
<p>將服務對應到叢集外部的 DNS 名稱。沒有負載平衡，只有 CNAME。 </p>
___程式碼區塊_3___

<h2>3。使用 DNS 進行服務發現</h2>
<p>CoreDNS 為每個服務建立 DNS 記錄。格式：</p>
___程式碼區塊_4___
___程式碼區塊_5___

<h2>4。 EndpointSlices — 新標準 K8s 1.33+</h2>
在<p>之前，Kubernetes 使用 <code>Endpoints</code> 資源來儲存 Pod 的 IP 清單。問題：當 Pod 數量較多（數千）時，Endpoints 物件很大，導致更新時網路開銷。 </p>
___HTMLTAG_51__HTMLTAG_52___EndpointSlices</strong> 分割為切片（預設最大 100 個端點/切片），顯著提高可擴充性。 </p>
<ul>
  <li>端點 API：<strong>已棄用的 K8s 1.33___HTMLTAG_58__HTMLTAG_59___
  <li>EndpointSlices：目前標準，自 K8s 1.21 起引入</li>
</ul>
___程式碼區塊_6___
___程式碼區塊_7___

<h2>5。無頭服務</h2>
<p>無頭服務（<code>clusterIP：無</code>）沒有 ClusterIP。 DNS查詢直接回傳Pod的IP，沒有負載平衡。用於 StatefulSets 為每個 Pod 提供穩定的 DNS 名稱。 </p>
___程式碼區塊_8___
___程式碼區塊_9___

<h2>6。會話關聯性</h2>
<p>預設情況下，每個請求都會循環傳送到隨機 Pod。如果您需要黏性會話：</p>
___程式碼區塊_10___<h2>7。 kube-proxy 和服務實作</h2>
<p>kube-proxy 運行在每個 Node 上，透過建立 iptables/nftables 規則來實現服務負載平衡。 </p>
<ul>
  ___HTMLTAG_78__HTMLTAG_79___iptables 模式</strong>：傳統、最流行</li>
  ___HTMLTAG_82__HTMLTAG_83___nftables 模式</strong>：2026 年推薦（IPVS 已棄用 K8s 1.35）</li>
</ul>
<p>當封包到達 ClusterIP 時，iptables/nftables 規則會重新導向到隨機 IP Pod (DNAT)。 </p>

<h2>8。服務最佳實務</h2>
<ul>
  <li>總是使用 <code>ClusterIP</code> 進行內部服務</li>
  <li>使用網關API而不是<code>LoadBalancer</code>類型進行外部暴露</li>
  <li>清楚地命名服務，使用一致的標籤</li>
  <li>使用 <code>targetPort__HTMLTAG_104___ 作為連接埠名稱而不是連接埠號碼（在 Pod 中更改連接埠時的靈活性）</li>
  <li>監控 EndpointSlices 以偵錯連線問題__HTMLTAG_107___
</ul>

<h2>摘要</h2>
<ul>
  <li>Service = 動態 Pod 的穩定端點__HTMLTAG_113___
  <li>ClusterIP：內部；NodePort：開發/測試； LoadBalancer：雲端生產（但優先考慮API網關）</li>
  <li>EndpointSlices 取代 Endpoints API（已棄用 K8s 1.33）</li>
  <li>Headless Service：DNS 直接回傳 Pod IP，用於 StatefulSets</li>
  <li>CoreDNS：<code>svc-name.namespace.svc.cluster.local___HTMLTAG_122__HTMLTAG_123___
</ul>