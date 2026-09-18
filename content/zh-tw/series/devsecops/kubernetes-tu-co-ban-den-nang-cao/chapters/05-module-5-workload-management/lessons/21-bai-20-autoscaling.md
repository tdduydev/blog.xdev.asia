---
id: 019c9618-0303-7000-8000-c1147ba22e13
title: 第 20 課：自動縮放
slug: bai-20-autoscaling
description: HPA（水平 Pod 自動縮放器），具有 CPU/記憶體和自訂指標、VPA（垂直 Pod 自動縮放器）、就地 Pod 資源更新（K8s 1.35 — 變更 CPU/記憶體而無需重新啟動）、KEDA 事件驅動的自動縮放、叢集自動縮放器和 Karpenter。
duration_minutes: 100
is_free: false
video_url: null
sort_order: 20
section_title: 模組 5：工作負載管理
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: Kubernetes：從基礎到高級
  slug: kubernetes-tu-co-ban-den-nang-cao
locale: zh-tw
---
<h2>Kubernetes 中的自動縮放 — 從 HPA 到 Karpenter</h2>

<p>自動擴充功能是在 Kubernetes 上執行工作負載的主要原因之一。 Kubernetes 不必隨著流量的增加或減少而手動調整資源，而是在許多不同層級提供許多自動擴展機制。本文將探討整個自動擴展生態系統 - 從傳統的 HPA 到 KEDA 事件驅動的擴展、最新的就地 Pod 資源更新以及用於叢集級擴展的 Karpenter。 </p>

<img src="/storage/uploads/2026/03/k8s-autoscaling-2026.webp" alt="Kubernetes Autoscaling - HPA, VPA, Karpenter, KEDA" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h2>1。 HorizontalPodAutoscaler (HPA)</h2>

___HTMLTAG_7__HTMLTAG_8___HPA</strong> 是最受歡迎的水平擴展機制 - 它根據指標自動增加/減少 Pod 副本的數量。 </p>

<h3>1.1 HPA 與 CPU 和記憶體</h3>

___程式碼區塊_0___

<p>重要說明：HPA 需要在容器上設定 <code>resources.requests</code> 來計算利用率。如果未設定請求，HPA 不知道「70% 的數量」。 </p>

<h3>1.2 自訂指標 API</h3>

<p>HPA 可以透過自訂指標 API（通常由 Prometheus 適配器提供）擴展到任何指標：</p>

___程式碼區塊_1___

<h3>1.3 縮小冷卻時間</h3>

___HTMLTAG_23__HTMLTAG_24___stabilizationWindowSeconds</code> 用於縮小規模在生產中極為重要。如果設定得太低，短暫的流量峰值將導致群集先擴大規模，然後不斷縮小（震盪）。最佳實務：</p>
<ul>
  <li>擴充：<code>stabilizationWindowSeconds：0</code> 至 <code>30</code> — 快速回應增加的流量__HTMLTAG_33___
  <li>縮小：<code>stabilizationWindowSeconds：300</code> 至 <code>600</code> — 等待 5-10 分鐘，然後減少 Pod__HTMLTAG_39___
</ul>

<h2>2。 VerticalPodAutoscaler (VPA)</h2>

___HTMLTAG_43__HTMLTAG_44___VPA</strong> 根據實際使用情況自動調整容器的 <code> 請求 </code> 和 <code> 限制 </code>。不要添加 Pod，而是讓每個 Pod“更大”或“更小”。 </p>

___程式碼區塊_2___

<h3>2.1 VPA 模式</h3>

<ul>
  ___HTMLTAG_54__HTMLTAG_55___關閉</strong>：VPA 僅計算建議，不會變更任何內容。用於查看來自 VPA Recommender 的建議。 </li>
  ___HTMLTAG_58__HTMLTAG_59___初始</strong>：VPA 在新建 Pod 時設定資源，不會更新正在執行的 Pod.</li>
  ___HTMLTAG_62__HTMLTAG_63___重新建立</strong>：VPA 透過逐出更新並重新建立 Pod — 導致短暫的停機時間。 </li>
  ___HTMLTAG_66__HTMLTAG_67___自動</strong>：現在像重新建立一樣工作；將來，將使用就地更新。 </li>
</ul>

<h3>2.2 查看 VPA 建議</h3>

___程式碼區塊_3___

<h3>2.3 VPA 限制__HTMLTAG_74___<ul>
  ___HTMLTAG_76__HTMLTAG_77___無法與具有相同指標的 HPA 共存</strong>：如果 HPA 按 CPU 擴展，VPA 無法管理相同部署的 CPU。解決方案：HPA根據自訂指標進行擴展，VPA管理CPU/記憶體；或使用就地更新而不是 VPA。 </li>
  ___HTMLTAG_80__HTMLTAG_81___需要重新啟動 Pod</strong>：在重新建立/自動模式下，每個 VPA 更新都會重新啟動 Pod — 不適合有狀態應用程式。 </li>
  ___HTMLTAG_84__HTMLTAG_85___需要單獨安裝</strong>：VPA在Kubernetes中不可用，需要透過Helm或清單安裝。 </li>
</ul>

<h2>3。就地 Pod 資源更新 (K8s 1.35 GA)</h2>

<p>這是 Kubernetes 最近最重要的功能之一：無需重新啟動即可更改正在運行的 Pod <strong> 的 <code>resources.requests</code> 和 <code>resources.requests</code> 和 <code>resources.requests</code> 和 <code>____resources.的能力</strong>.</p>

<h3>3.1 為什麼就地更新很重要？ </h3>

<p>以前，每次資源變更都需要重新啟動 Pod — 這對於以下情況是不可接受的：</p>
<ul>
  ___HTMLTAG_104__HTMLTAG_105___資料庫 Pod</strong>：PostgreSQL、MySQL 需要在重新啟動後預熱快取</li>
  ___HTMLTAG_108__HTMLTAG_109___長時間運行的 ML 作業</strong>：訓練作業需要幾個小時，重新啟動 = 遺失所有進度</li>
  ___HTMLTAG_112__HTMLTAG_113___有狀態應用程式</strong>：具有記憶體狀態的應用程式</li>
  ___HTMLTAG_116__HTMLTAG_117___JVM 應用程式</strong>：Java 應用程式需要 JIT 預熱時間</li>
</ul>

<h3>3.2 resizePolicy</h3>

___程式碼區塊_4___

<p>兩個值 <code>restartPolicy</code>:</p>
<ul>
  ___HTMLTAG_128__HTMLTAG_129___不需要</strong>：資源可以就地更改，無需重新啟動容器</li>
  ___HTMLTAG_132__HTMLTAG_133___RestartContainer</strong>：更改資源將觸發容器重新啟動（仍然不會重新啟動整個Pod）</li>
</ul>

<h3>3.3 執行就地調整大小</h3>

___程式碼區塊_5___

<h3>3.4 透過部署就地調整大小__HTMLTAG_140___

___程式碼區塊_6___

___程式碼區塊_7___

<h2>4。 KEDA — Kubernetes 事件驅動的自動縮放</h2>

___HTMLTAG_143__HTMLTAG_144___KEDA</strong> 是一個 CNCF 畢業項目，為 Kubernetes 提供事件驅動的自動縮放。與 HPA 相比最大的差異：KEDA 可以 <strong> 縮放至零 </strong> — 沒有事件，就沒有 Pod.</p>

<h3>4.1 KEDA 安裝</h3>

___程式碼區塊_8___

<h3>4.2 ScaledObject — 縮放部署</h3>

___HTMLTAG_153__HTMLTAG_154___ScaledObject</strong> 是 KEDA 的主要 CRD，取代 Deployments 和 StatefulSets 的 HPA：</p>

___程式碼區塊_9___

<h3>4.3 ScaledJob — 縮放作業</h3>

___HTMLTAG_159__HTMLTAG_160___ScaledJob</strong> 為每個事件批次建立一個新作業，非常適合任務佇列：</p>

___程式碼區塊_10___

<h3>4.4 流行的 KEDA 縮放器__HTMLTAG_164___

___程式碼區塊_11___<h3>4.5 KEDA 規模為零並從零擴大</h3>

<p>縮放到零是 KEDA 的殺手級功能 — 為不 24/7 運行的工作負載節省大量成本：</p>

___程式碼區塊_12___

<p>當 KEDA 偵測到事件（例如 Kafka 滯後 > 0）時，它會在幾秒鐘內從 0 擴展到 1。然後 HPA（由 KEDA 管理）根據負載繼續擴展。 </p>

<h2>5。叢集自動縮放器</h2>

___HTMLTAG_173__HTMLTAG_174___叢集自動縮放器 (CA)</strong> 在 Pod 無法調度（節點已滿）或節點為空（浪費資源）時自動新增/刪除節點。 </p>

___程式碼區塊_13___

<h2>6。 Karpenter — 下一代叢集擴充</h2>

___HTMLTAG_179__HTMLTAG_180___Karpenter</strong> 是 AWS 的開源節點設定程序，目前也支援 Azure。它比 Cluster Autoscaler 聰明得多 - Karpenter 本身決定啟動最佳實例類型，而不僅僅是擴展現有節點組。 </p>

<h3>6.1 NodePool — 替換節點群組</h3>

___程式碼區塊_14___

<h3>6.2 EC2NodeClass</h3>

___程式碼區塊_15___

<h3>6.3 Karpenter 與叢集自動縮放器__HTMLTAG_188___

<ul>
  ___HTMLTAG_190__HTMLTAG_191___啟動時間</strong>：Karpenter ~60 秒 vs CA ~3-4 分鐘（CA 必須擴充 ASG，然後等待）</li>
  ___HTMLTAG_194__HTMLTAG_195___實例選擇</strong>：Karpenter 為待處理的 Pod 選擇最佳實例類型； CA 僅擴充現有群組</li>
  ___HTMLTAG_198__HTMLTAG_199___現場中斷處理</strong>：內建Karpenter，在實例終止之前優雅地耗盡</li>
  ___HTMLTAG_202__HTMLTAG_203___節點合併</strong>：Karpenter 透過驅逐 Pod 和終止節點來自動合併空/輕負載節點__HTMLTAG_205___
  ___HTMLTAG_206__HTMLTAG_207___成本最佳化</strong>：Karpenter 在可能的情況下主動選擇 Spot，在 Spot 不可用時回退到按需</li>
</ul>

<h3>6.4 現場中斷處理</h3>

___程式碼區塊_16___

<h2>7。組合策略：HPA + KEDA + Karpenter</h2>

<p>在生產中，您經常一起使用縮放層：</p>

<ul>
  ___HTMLTAG_218__HTMLTAG_219___KEDA</strong>：根據事件（Kafka 滯後、佇列深度）將 Pod 從 0 擴展到 N</li>
  ___HTMLTAG_222__HTMLTAG_223___HPA</strong>：KEDA 啟動 Pod 時根據 CPU/記憶體微調縮放</li>
  ___HTMLTAG_226__HTMLTAG_227___就地更新</strong>：無須重新啟動即可調整正在執行的 Pod 的資源</li>
  ___HTMLTAG_230__HTMLTAG_231___Karpenter</strong>：當 Pod 因缺少節點而無法調度時，Karpenter 會自動配置最適合的節點__HTMLTAG_233___
</ul>

___程式碼區塊_17___

<p>有效的自動縮放是多種機制的正確組合。了解每種工具（用於基於資源的擴展的 HPA、用於事件驅動的擴展的 KEDA、用於零停機資源調整的就地更新以及用於智慧節點配置的 Karpenter）可協助您建立響應迅速且經濟高效的系統。 </p>