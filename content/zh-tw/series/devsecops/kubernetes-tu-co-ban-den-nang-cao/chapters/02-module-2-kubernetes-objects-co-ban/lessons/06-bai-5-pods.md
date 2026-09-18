---
id: 019c9618-0004-7000-8000-c1147ba22e10
title: 第 5 課：PODS
slug: bai-5-pods
description: 深入研究 Pod——Kubernetes 中的基本部署單元。多容器 Pod、Sidecar 容器 GA (K8s 1.33)、Init 容器、用於調試的臨時容器、Pod 生命週期和資源管理。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 5
section_title: 模組 2：基本 Kubernetes 對象
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: Kubernetes：從基礎到高級
  slug: kubernetes-tu-co-ban-den-nang-cao
locale: zh-tw
---
<h2>🎯 課程目標___HTMLTAG_1__HTMLTAG_2___透過本課，您將了解 Pod 是 Kubernetes 中最基本的單元，Pod 如何共享網路命名空間，如何使用 Sidecar 容器（GA K8s 1.33）、Init 容器、Ephemeral 容器進行調試和調試資源，以及管理資源的生命週期。 </p>

<h2>1。什麼是 Pod？ </h2>

<img src="/storage/uploads/2026/03/k8s-pod-lifecycle-2026.webp" alt="Kubernetes Pod Lifecycle Diagram" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<p>Pod 是 Kubernetes 中最小的調度單元。 Pod 由 <strong> 一個或多個容器 </strong> 在同一節點上運行，共享：</p>
<ul>
  ___HTMLTAG_12__HTMLTAG_13___網路命名空間</strong>：相同的 IP 位址，相同的連接埠空間 — 容器透過 <code>localhost___HTMLTAG_16__HTMLTAG_17___ 相互通訊
  ___HTMLTAG_18__HTMLTAG_19___儲存磁碟區</strong>：掛載到 Pod 的磁碟區可以被許多容器存取</li>
  ___HTMLTAG_22__HTMLTAG_23___Linux 命名空間</strong>（取決於設定）：PID 命名空間、IPC 命名空間</li>
</ul>
<p>為什麼不直接部署容器？ Kubernetes 管理 Pod，而不是容器。 Pod 是一個抽象層，有助於將密切相關的進程分組在一起。 </p>

<h2>2。簡單 Pod 範例</h2>
___程式碼區塊_0___
___程式碼區塊_1___

<h2>3。多容器 Pod</h2>
<p>多容器 Pod 有 3 種常見模式：</p>
<h3>3.1 Sidecar 模式</h3>
<p>輔助容器支援主容器（日誌轉發器、代理、OTel 收集器）.</p>
<h3>3.2 大使模式</h3>
<p>代理容器代表主容器與外界通訊。 </p>
<h3>3.3 適配器模式</h3>
<p>容器將主容器的輸出標準化為標準格式。 </p>

<h2>4。 Sidecar 容器 GA — K8s 1.33</h2>
<p>在 K8s 1.33 之前，sidecar 容器被實作為常規 init 容器，導致生命週期問題：當主容器完成時，sidecar 仍在運行，作業從未完成。 </p>
___HTMLTAG_51__HTMLTAG_52___K8s 解決方案 1.33</strong>：官方 sidecar 容器是 <code>initContainer</code>，具有 <code>initContainer</code>，具有 <code>initContainy_Always_______ML。 Kubernetes 將：</p>
<ul>
  <li>在主容器之前啟動 sidecar__HTMLTAG_61___
  <li>如果 sidecar 崩潰則重新啟動（獨立於主容器）</li>
  <li>主容器結束後終止 sidecar</li>
  <li>Sidecar 不會阻止作業完成</li>
</ul>
___程式碼區塊_2___
<p>Sidecar 容器的用例：Grafana Alloy 日誌代理程式、OpenTelemetry Collector、Envoy 代理程式（在服務網格中）、Vault 代理注入器。 </p><h2>5。初始化容器</h2>
<p>Init 容器在主容器啟動之前執行 <strong>run-to-completion</strong>。用於：</p>
<ul>
  <li>在應用程式啟動之前等待資料庫準備好</li>
  <li>從外部來源下載設定或機密__HTMLTAG_81___
  <li>設定檔案權限、資料庫遷移</li>
</ul>
___程式碼區塊_3___

<h2>6。臨時容器 — 調試 Pod</h2>
<p>臨時容器允許將偵錯容器附加到正在執行的 Pod，而無需重新啟動 Pod</strong>。當 Pod 使用無 shell 的 distroless 映像時非常有用。 </p>
___程式碼區塊_4___

<h2>7。 Pod 生命週期</h2>
<p>Pod 經歷以下階段：</p>
<ul>
  ___HTMLTAG_96__HTMLTAG_97___待處理</strong>：Pod 已創建，等待調度程序選擇節點，或拉取鏡像</li>
  ___HTMLTAG_100__HTMLTAG_101___正在執行</strong>：Pod 已綁定至 Node，至少有 1 個容器正在執行</li>
  ___HTMLTAG_104__HTMLTAG_105___成功</strong>：所有容器已成功結束（退出 0）</li>
  ___HTMLTAG_108__HTMLTAG_109___失敗</strong>：至少 1 個容器以錯誤結束（退出非 0）</li>
  ___HTMLTAG_112__HTMLTAG_113___未知</strong>：無法取得 Pod 狀態（通常是由於節點問題）</li>
</ul>
<p>Pod 條件（來自 <code>kubectl 描述 pod</code>）：</p>
<ul>
  ___HTMLTAG_122__HTMLTAG_123___PodScheduled</strong>：調度程式選擇節點</li>
  ___HTMLTAG_126__HTMLTAG_127___PodReadyToStartContainers</strong>：已建立沙箱並設定網路</li>
  ___HTMLTAG_130__HTMLTAG_131___已初始化</strong>：所有初始化容器已成功運作</li>
  ___HTMLTAG_134__HTMLTAG_135___ContainersReady</strong>：所有容器都已準備好</li>
  ___HTMLTAG_138__HTMLTAG_139___Ready</strong>：Pod 已準備好接收流量</li>
</ul>

<h2>8。資源請求與限制</h2>
___程式碼區塊_5___
___HTMLTAG_145__HTMLTAG_146___Requests</strong> 是調度程序保證的資源量。 <strong>限制</strong> 是最大上限。 CPU 超出限制會受到限制（而非被殺死），記憶體超出限制則會被 OOMKilled.</p>

<h2>9。 QoS 類別</h2>
<ul>
  ___HTMLTAG_154__HTMLTAG_155___保證</strong>：所有容器的請求 == 限制。最高優先級，當節點有記憶體壓力時不驅逐。 </li>
  ___HTMLTAG_158__HTMLTAG_159___突發</strong>：請求 <限制。限制。當節點缺乏記憶體時可以被驅逐。 </li>
  ___HTMLTAG_162__HTMLTAG_163___BestEffort</strong>：無請求/限制。當節點缺乏資源時先驅逐。 </li>
</ul><h2>10。探針 — 運轉狀況檢查</h2>
___程式碼區塊_6___
<ul>
  ___HTMLTAG_170__HTMLTAG_171___livenessProbe</strong>：Pod 失敗將重新啟動</li>
  ___HTMLTAG_174__HTMLTAG_175___readinessProbe</strong>：如果 Pod 失敗（未接收流量），則會從服務端點中刪除</li>
  ___HTMLTAG_178__HTMLTAG_179___startupProbe</strong>：用於啟動緩慢的應用程序，在等待時關閉活性/就緒探針</li>
</ul>

<h2>11。靜態 Pod</h2>
<p>靜態 Pod 是由 kubelet 直接從 <code>/etc/kubernetes/manifests/</code> 中的 YAML 檔案建立的，無需透過 API 伺服器。 Kubernetes 控制平面元件（kube-apiserver、etcd、調度程式、控制器管理器）在主節點上以靜態 Pod 運作。 </p>

<h2>摘要</h2>
<ul>
  <li>Pod = 共享網路和儲存的容器群組</li>
  <li>Sidecar 容器（K8s 1.33 GA）：<code>initContainer</code> 和 <code>restartPolicy：Always</code>HTMLTAG_199___
  <li>初始化容器：在主容器之前執行至完成</li>
  <li>臨時容器：無需重新啟動即可偵錯 Pod__HTMLTAG_203___
  <li>始終為生產工作負載設定資源請求/限制__HTMLTAG_205___
  <li>使用readinessProbe控制流量，livenessProbe自動重啟</li>
</ul>