---
id: 019c9618-0001-7000-8000-c1147ba22e10
title: 第 2 課：Kubernetes 架構
slug: bai-2-kien-truc-kubernetes
description: 了解 Kubernetes 1.32+ 的詳細架構：控制平面、工作節點、主要元件。了解 kube-apiserver、etcd、調度程式、控制器管理器、kubelet、containerd 2.0 和帶有 nftables 的 kube-proxy。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 2
section_title: 模組 1：簡介和 Kubernetes 架構
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: Kubernetes：從基礎到高級
  slug: kubernetes-tu-co-ban-den-nang-cao
locale: zh-tw
---
<h2>Kubernetes 架構：從概述到詳細資訊__HTMLTAG_1___

<p>Kubernetes 採用分散式模型設計，具有清晰的主從架構。為了有效地使用 Kubernetes，尤其是在出現問題時進行調試，您需要了解每個組件的作用、它們如何相互通信以及為什麼要這樣設計。本課程深入探討 Kubernetes 1.32+ 架構，其中包括 Containerd 2.0、kube-proxy 的 nftables 模式和 cgroup v2 路線圖的重要變化。 </p>

<img src="/storage/uploads/2026/03/k8s-architecture-2026.webp" alt="Kubernetes Architecture - Control Plane và Worker Nodes" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h2>1。架構概述：控制平面和工作節點</h2>

<p>一個 Kubernetes 叢集分為兩組功能節點：</p>

<ul>
  ___HTMLTAG_10__HTMLTAG_11___控制平面（主節點）</strong>：叢集的大腦。負責全域決策 - 調度 Pod 運作位置、偵測和回應叢集事件、維護所需狀態。 </li>
  ___HTMLTAG_14__HTMLTAG_15___工作節點</strong>：工作負載實際運作的位置。每個節點包含一個運行時容器、一個與控制平面通訊的 kubelet 以及一個處理網路的 kube-proxy。 </li>
</ul>

<p>在生產環境中，控制平面通常部署在至少 3 個獨立的節點上，以確保高可用性 (HA)。在 Kubernetes 1.32+ 中，GKE、EKS、AKS 等託管 Kubernetes 服務完全隱藏控制平面 — 您只能透過 API 進行互動。 </p>

___程式碼區塊_0___

<h2>2。控制平面組件</h2>

<h3>2.1。 kube-apiserver — 單一介面</h3>

___HTMLTAG_25__HTMLTAG_26___kube-apiserver</strong> 是控制平面的核心元件。叢集內的所有通訊（來自開發人員的 kubectl、來自工作節點上的 kubelet、來自控制器）都必須通過 API 伺服器。除了 kube-apiserver 之外，任何元件都不允許直接與 etcd 通訊。 </p>

<p>kube-apiserver主要功能：</p>

<ul>
  ___HTMLTAG_32__HTMLTAG_33___REST API 閘道</strong>：依據 Kubernetes API 群組標準提供 RESTful API (<code>core/v1</code>、<code>apps/___core/v1</code>、<code>apps/___core/v1</code>、<code>apps/___core/v1</code>、<code>apps/__1___MLG_38 <code>networking.k8s.io/v1</code>...)</li>
  ___HTMLTAG_42__HTMLTAG_43___驗證</strong>：身分驗證 — 支援用戶端憑證、承載權杖、OIDC、webhook 令牌驗證__HTMLTAG_45___
  ___HTMLTAG_46__HTMLTAG_47___授權</strong>：透過 RBAC（基於角色的存取控制）、ABAC 或 Webhook 模式檢查存取權限</li>
  ___HTMLTAG_50__HTMLTAG_51___准入控制</strong>：在將物件寫入 etcd 之前應用的一系列准入 Webhook（驗證和變異）</li>
  ___HTMLTAG_54__HTMLTAG_55___API 聚合</strong>：允許使用自訂 API 伺服器（指標伺服器、自訂 CRD）進行 API 擴充</li>
</ul>

___程式碼區塊_1___

<p>Kube-apiserver 是無狀態的 — 它不儲存狀態，只讀取/寫入 etcd。這允許透過在負載平衡器後面運行多個 API 伺服器實例來進行水平擴展。 </p>

<h3>2.2。 etcd — 叢集記憶體</h3>___HTMLTAG_63__HTMLTAG_64___etcd</strong> 是使用 Raft 共識演算法的分散式鍵值儲存。這是儲存叢集整個狀態的唯一位置 - 每個 Pod、Service、ConfigMap、Secret、Node 都作為序列化的 protobuf 物件儲存在這裡。 </p>

<p>Kubernetes 中 etcd 的重要功能：</p>

<ul>
  ___HTMLTAG_70__HTMLTAG_71___強一致性</strong>：Raft 確保 etcd 叢集中的每個節點都同意該值 — 無「腦裂」</li>
  ___HTMLTAG_74__HTMLTAG_75___Watch API</strong>：客戶端（包括 kube-apiserver）可以監視關鍵變化－這是 Kubernetes 做出反應的核心機制</li>
  ___HTMLTAG_78__HTMLTAG_79___法定人數要求</strong>：需要多數 (⌊n/2⌋ + 1) 個活動節點才能使叢集運作。 With 3 etcd nodes, 1 node can be tolerated;有 5 個節點，可以承受失去 2 個節點</li>
  ___HTMLTAG_82__HTMLTAG_83___etcd v3</strong>：使用 etcd 3.5+ 的 Kubernetes 1.32，具有效能和基於租賃的改進 TTL</li>
</ul>

___程式碼區塊_2___

___HTMLTAG_87__HTMLTAG_88___重要說明</strong>：必須定期備份etcd資料。 Loss of etcd = loss of entire cluster state.在託管 Kubernetes 中，雲端供應商自行處理此問題。 </p>

<h3>2.3。 kube-scheduler — Pod 分配演算法</h3>

___HTMLTAG_93__HTMLTAG_94___kube-scheduler</strong> 負責決定哪個 Pod 會在哪個節點上運作。當您建立 Pod 時，kube-apiserver 會將 Pod 寫入 etcd，狀態為 <code>Pending</code>（尚未指派節點）。調度程序監視這些 Pod 並找到匹配的節點。 </p>

<p>調度過程包含兩個步驟：</p>

<ul>
  ___HTMLTAG_102__HTMLTAG_103___過濾（謂詞）</strong>：消除不符合要求的節點－CPU/記憶體不足、Pod 不能容忍的污點節點、不匹配的節點選擇器、Pod 親和/反親和約束...</li>
  ___HTMLTAG_106__HTMLTAG_107___評分（優先權）</strong>：根據許多標準對剩餘節點進行評分 — 使用資源最少的節點、已經擁有必要映像的節點（減少拉取時間）、均勻分配 Pod 副本的節點...</li>
</ul>

___程式碼區塊_3___

<p>Kubernetes 1.32+ 支援 <strong>調度程序設定檔</strong> — 允許使用不同的插件集配置多個調度設定文件，適用於同一叢集中的不同工作負載。 </p>

<h3>2.4。 kube-controller-manager — 控制迴圈</h3>

___HTMLTAG_117__HTMLTAG_118___kube-controller-manager</strong> 執行一組控制器 — 每個控制器都是一個控制循環，用於監視叢集的當前狀態並採取措施將其返回所需狀態。這是 <em> 協調循環模式</em> 的實作 — Kubernetes 聲明模型的核心。 </p>

<p>最重要的控制器：</p><ul>
  ___HTMLTAG_126__HTMLTAG_127___ReplicaSet Controller</strong>：確保 Pod 副本數量符合規格。如果 Pod 死亡，控制器會建立一個新 Pod。 </li>
  ___HTMLTAG_130__HTMLTAG_131___部署控制器</strong>：管理部署的捲動更新，建立/刪除副本集</li>
  ___HTMLTAG_134__HTMLTAG_135___EndpointSlice 控制器</strong>：當 Pod 就緒/未就緒時更新 EndpointSlices（取代舊的 Endpoints 控制器 — Endpoints API 已棄用 K8s 1.33）</li>
  ___HTMLTAG_138__HTMLTAG_139___命名空間控制器</strong>：刪除命名空間時清理資源</li>
  ___HTMLTAG_142__HTMLTAG_143___ServiceAccount 控制器</strong>：為每個新命名空間自動建立預設 ServiceAccount</li>
  ___HTMLTAG_146__HTMLTAG_147___節點控制器</strong>：監控節點運作狀況、無法存取時污染節點、寬限期後驅逐 Pod</li>
  ___HTMLTAG_150__HTMLTAG_151___作業控制器</strong>：管理批次作業，確保完成</li>
  ___HTMLTAG_154__HTMLTAG_155___CronJob 控制器</strong>：依據 cron 運算式排程作業</li>
</ul>

___程式碼區塊_4___

<h3>2.5。雲端控制器管理器</h3>

<p>與 kube-controller-manager 分開，<strong>cloud-controller-manager</strong>包含與雲端提供者 API 整合的控制器：</p>

<ul>
  ___HTMLTAG_166__HTMLTAG_167___節點控制器</strong>：檢查雲端供應商以確認節點存在，取得雲端區域、實例類型等元資料</li>
  ___HTMLTAG_170__HTMLTAG_171___路由控制器</strong>：在雲端基礎架構中設定網路路由</li>
  ___HTMLTAG_174__HTMLTAG_175___服務控制器</strong>：建立服務類型 LoadBalancer 時建立/更新/刪除雲端負載平衡器</li>
</ul>

<p>在本地或裸機使用時，不需要雲端控制器管理器。 </p>

<h2>3。工作節點組件</h2>

<h3>3.1。 kubelet — 每個節點的代理程式</h3>

___HTMLTAG_185__HTMLTAG_186___kubelet</strong> 是在每個工作節點上執行的代理程式。 kubelet 的工作是接收 PodSpec 並確保其中描述的容器正在運作且健康。 </p>

<p>Kubelet 依照下列機制運作：</p>

<ul>
  <li>觀察 kube-apiserver 以接收指派給您的節點的 PodSpec</li>
  <li>透過 <strong>CRI（容器執行時間介面）</strong> — 標準化 gRPC 介面</li> 與執行時間容器通信
  <li>將節點狀態和 Pod 狀態回報給 API 伺服器</li>
  <li>運作活躍/準備/啟動探針</li>
  <li>安裝磁碟區、拉取映像、設定網路命名空間__HTMLTAG_203___
  <li>透過 cgroup v2 管理資源限制</li>
</ul>

___程式碼區塊_5___

<h3>3.2。 kube-proxy — 網路規則引擎（nftables 模式）</h3>___HTMLTAG_209__HTMLTAG_210___kube-proxy</strong> 在每個節點上執行，負責實作 Kubernetes 服務網路 — 確保將到服務 VIP 的流量轉送到正確的 Pod 後端。 </p>

<p>kube-代理模式的歷史：</p>

<ul>
  ___HTMLTAG_216__HTMLTAG_217___iptables 模式</strong>（舊版）：使用 iptables 規則鏈。問題：有數千個服務，iptables 規則非常大且更新緩慢</li>
  ___HTMLTAG_220__HTMLTAG_221___IPVS 模式</strong>：核心中的第 4 層負載平衡器。 IPVS 模式 <strong> 在 Kubernetes 1.35 中已棄用</strong> 並將在未來刪除</li>
  ___HTMLTAG_226__HTMLTAG_227___nftables 模式</strong>（自 K8s 1.31 以來的當前預設值）：使用 nftables — 新的 Linux 框架來取代 iptables。更有效率、更容易調試、更好地支援現代核心</li>
</ul>

___程式碼區塊_6___

___HTMLTAG_231__HTMLTAG_232___注意</strong>：許多現代叢集使用Cilium等CNI外掛程式來完全取代kube-proxy（Cilium的kube-proxy取代使用eBPF），提供更好的效能和更高的可觀察性。 </p>

<h3>3.3。容器運行時 —containerd 2.0</h3>

<p>容器運行時是實際建立和運行容器的元件。 Kubernetes 透過 <strong>CRI（容器執行時間介面）</strong>.</p> 與執行時間通訊

___HTMLTAG_241__HTMLTAG_242___為什麼不使用 Docker？ ___HTMLTAG_243__HTMLTAG_244___

<p>Docker Engine 在版本 1.24 中已從 Kubernetes 中刪除（dockershim 已刪除）。 Docker 本身並不會實作 CRI — Kubernetes 必須使用填充層 (dockershim) 進行橋接。相反：</p>

<ul>
  ___HTMLTAG_248__HTMLTAG_249___containerd</strong>：官方執行階段，從 Docker 專案分叉，本機 CRI 支援</li>
  ___HTMLTAG_252__HTMLTAG_253___CRI-O</strong>：更輕的運行時，專注於 Kubernetes 用例</li>
</ul>

___HTMLTAG_257__HTMLTAG_258___containerd 2.0</strong>（2024 年發布）帶來了重要改進：</p>

<ul>
  <li>對 <strong>cgroup v2</strong> 的本機支援</strong>（從 Kubernetes 1.36 開始需要）</li>
  <li>使用 Sandbox API 改進了沙箱管理</li>
  <li>更有效率的影像管理傳輸服務</li>
  <li>NRI（節點資源介面）插件，用於擴充自訂</li>
  <li>Zstd 影像壓縮支援 — 拉速顯著加快</li>
  <li>使用 Windows 容器效果較好</li>
</ul>

___程式碼區塊_7___

<h3>3.4。 cgroup v2 — 現代資源管理</h3>

___HTMLTAG_279__HTMLTAG_280___cgroups（控制群組）</strong> 是一項 Linux 核心功能，用於限制、優先權和測量進程群組的資源使用情況。 Kubernetes 使用 cgroup 對 Pod 和容器強制執行 CPU/記憶體限制。 </p><ul>
  ___HTMLTAG_284__HTMLTAG_285___cgroup v1</strong>：舊版，每個資源都有自己的層次結構（cpu、記憶體、blkio...），複雜且有許多邊緣情況__HTMLTAG_287___
  ___HTMLTAG_288__HTMLTAG_289___cgroup v2</strong>：統一層次結構、單一 cgroup 樹、使用 memory.oom.group 改進記憶體管理、壓力失速資訊 (PSI)</li>
</ul>

___HTMLTAG_293__HTMLTAG_294___重要時間表</strong>：</p>

<ul>
  <li>Kubernetes 1.25：cgroup v2 穩定</li>
  <li>Kubernetes 1.35：cgroup v1 <strong>已棄用___HTMLTAG_302__HTMLTAG_303___
  <li>Kubernetes 1.36：cgroup v2 <strong>必需</strong>，cgroup v1已刪除</li>
  <li>Ubuntu 22.04+、RHEL 9+、Debian 11+ 預設使用 cgroup v2</li>
</ul>

___程式碼區塊_8___

<h2>4。 Pod 建立流程：從 kubectl 到容器</h2>

<p>為了以實用的方式理解該架構，讓我們追蹤執行 <code>kubectl apply -f pod.yaml</code>:</p> 時發生的流程

<img src="/storage/uploads/2026/03/k8s-pod-creation-flow-2026.webp" alt="Pod Creation Flow - từ kubectl đến Container" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

___程式碼區塊_9___

<p>整個過程，從 <code>kubectl apply</code> 到容器實際運行，通常需要 2-10 秒，取決於映像是否已快取以及網路速度。 </p>

<h2>5。重要附加元件</h2>

<h3>5.1。 CoreDNS — 服務發現</h3>

___HTMLTAG_326__HTMLTAG_327___CoreDNS</strong> 是運行在叢集中的 DNS 伺服器，允許 Pod 透過網域名稱而不是 IP 來查找 Services 和其他 Pod：</p>

<ul>
  命名空間 <code>my-ns</code> 中的 <li>Service <code>my-svc</code> 可以透過以下方式解析： <code>my-svc.my-ns.svc.cluster.local___HTMLTAG_337__HTMLTAG_338___
  <li>Pod 到 Pod DNS：<code>pod-ip.namespace.pod.cluster.local___HTMLTAG_341__HTMLTAG_342___
  <li>CoreDNS 是必要的 Kubernetes 附加元件 — 如果沒有 DNS，叢集就無法正常運作</li>
</ul>

___程式碼區塊_10___

<h3>5.2。 CNI 外掛 — 容器網路介面</h3>

<p>CNI 外掛實現 Pod 網路 — 確保每個 Pod 都有自己的 IP 並且可以與其他 Pod 通訊。 Kubernetes 沒有內建網路 - 您必須安裝 CNI 外掛程式。 </p>

<p>2026 年熱門 CNI：</p>

<ul>
  ___HTMLTAG_353__HTMLTAG_354___Cilium</strong>：基於 eBPF、最高效能、內建 Hubble 可觀測性、kube-proxy 取代、進階網路策略。這是許多託管 K8s 服務的預設選擇。 </li>
  ___HTMLTAG_357__HTMLTAG_358___Flannel</strong>：簡單、輕量級，適合學習和開發環境</li>
  ___HTMLTAG_361__HTMLTAG_362___Calico</strong>：強大的網路策略，使用 BGP 進行路由，在本地企業中流行</li>
  ___HTMLTAG_365__HTMLTAG_366___Weave Net</strong>：簡單設置，網狀網路</li>
</ul>

___程式碼區塊_11___

<h3>5.3。指標伺服器 — 資源指標</h3>___HTMLTAG_372__HTMLTAG_373___metrics-server</strong> 從每個節點上的 kubelet 收集 CPU 和記憶體指標，為 Horizontal Pod Autoscaler (HPA) 和命令 <code>kubectl top Autoscaler (HPA) 和命令 <code>kubectl top___MLTAG_ML3767____7____ML____

___程式碼區塊_12___

<h2>6。高可用性控制平面</h2>

<p>In production, Control Plane needs HA to avoid single point of failure:</p>

<ul>
  ___HTMLTAG_383__HTMLTAG_384___3 或 5 個控制平面節點</strong>運行 kube-apiserver、kube-scheduler、kube-controller-manager</li>
  ___HTMLTAG_387__HTMLTAG_388___負載平衡器</strong>位於 kube-apiservers 前面（HAProxy、雲端 LB 或具有 keepalived 的虛擬 IP）</li>
  ___HTMLTAG_391__HTMLTAG_392___etcd 叢集</strong> 具有法定數量（至少 3 個節點）— 可以堆疊運作（在同一控制平面節點上）或外部運作（在單獨的節點上）</li>
  <li>kube-scheduler 和 kube-controller-manager 使用 <strong>leader 選舉</strong> — 一次只有一個實例處於活動狀態，其餘實例處於備用狀態__HTMLTAG_398___
</ul>

___程式碼區塊_13___

<h2>7。摘要與重點</h2>

<p>Kubernetes 架構體現了重要的設計原則：</p>

<ul>
  ___HTMLTAG_405__HTMLTAG_406___關注點分離</strong>：每個元件都有明確的職責，透過標準 API 進行通訊</li>
  ___HTMLTAG_409__HTMLTAG_410___聲明式模型</strong>：您宣告所需的狀態，控制器負責達到該狀態</li>
  ___HTMLTAG_413__HTMLTAG_414___單一事實來源</strong>：etcd 是儲存狀態的唯一位置，每個元件都會監視伺服器 API</li>
  ___HTMLTAG_417__HTMLTAG_418___可擴充性</strong>：CRI、CNI、CSI 是允許取代元件（執行時間、網路、儲存）的介面</li>
  ___HTMLTAG_421__HTMLTAG_422___彈性</strong>：HA 設計允許節點發生故障而叢集仍然運作</li>
</ul>

<p>在下一篇文章中，我們將透過安裝一個包含 Containerd 2.0、cgroup v2 和 2026 開發所需工具的 Kubernetes 叢集來將這些架構知識付諸實踐。 </p>

___程式碼區塊_14___