---
id: 019c9618-0005-7000-8000-c1147ba22e10
title: 第 6 課：複製集與部署
slug: bai-6-replicasets-va-deployments
description: 使用 ReplicaSet 和 Deployment 管理多個 Pod 副本。滾動更新、回滾、部署策略（重新建立、滾動更新、藍/綠、金絲雀）。了解修訂歷史記錄以及如何安全回滾。
duration_minutes: 90
is_free: false
video_url: null
sort_order: 6
section_title: 模組 2：基本 Kubernetes 對象
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: Kubernetes：從基礎到高級
  slug: kubernetes-tu-co-ban-den-nang-cao
locale: zh-tw
---
<h2>🎯 課程目標___HTMLTAG_1__HTMLTAG_2___了解 ReplicaSet 如何保證 Pod 副本數量、為什麼 Deployment 比純 ReplicaSet 更好、如何安全地執行滾動更新和回滾以及常見的部署策略。 </p>

<img src="/storage/uploads/2026/03/k8s-deployment-rolling-update-2026.webp" alt="Kubernetes Deployment & Rolling Update Strategies" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h2>1。副本集</h2>
<p>ReplicaSet 確保指定數量的 Pod 副本始終運作。如果 Pod 被刪除或崩潰，ReplicaSet 會建立一個新的 Pod 來補償。 </p>
___程式碼區塊_0___
<p>ReplicaSet 使用 <strong> 標籤選擇器 </strong> 來了解它管理哪些 Pod。但是，您很少直接建立 ReplicaSet — 而是使用 Deployment.</p>

<h2>2。部署 — 為什麼它比 ReplicaSet 更好？ </h2>
<p>Deployment 是比 ReplicaSet 更高層級的抽象，允許：</p>
<ul>
  ___HTMLTAG_18__HTMLTAG_19___聲明性更新</strong>：僅聲明所需狀態，部署負責其餘</li>
  ___HTMLTAG_22__HTMLTAG_23___滾動更新</strong>：零停機部署</li>
  ___HTMLTAG_26__HTMLTAG_27___修訂歷史記錄</strong>：保存更新歷史記錄，允許回滾</li>
  ___HTMLTAG_30__HTMLTAG_31___暫停/恢復</strong>：可以暫停推出</li>
</ul>
___程式碼區塊_1___

<h2>3。滾動更新</h2>
<p>滾動更新逐漸以新 Pod 取代舊 Pod，確保不會出現停機。 </p>
___程式碼區塊_2___
<p>使用 <code>maxSurge：2</code> 和 <code>max 不可用：1</code> 在 5 個副本上：</p>
<ul>
  <li>最多同時存在 7 個 Pod（5 + 2 個突波）</li>
  <li>至少有 4 個可用 Pod（5 - 1 個不可用）</li>
  <li>Kubernetes 在終止舊 Pod 的同時建立新 Pod__HTMLTAG_51___
</ul>

<h2>4。重新建立策略</h2>
<p>在建立新 Pod 之前刪除所有舊 Pod。 <strong>有停機時間</strong>，但它很簡單且沒有版本衝突。 </p>
___程式碼區塊_3___
<p>用於以下情況：資料庫遷移需要單一實例，不接受並行運行的2個版本。 </p>

<h2>5。修訂歷史記錄和回滾</h2>
___程式碼區塊_4___
<p>保存的修訂數量由 <code>spec.revisionHistoryLimit</code> 控制（預設 10）.</p>

<h2>6。暫停和恢復推出</h2>
___程式碼區塊_5___

<h2>7。藍/綠部署</h2>
<p>與舊版本並行部署新版本，然後將所有流量轉移到新版本。 </p>
___程式碼區塊_6___
___程式碼區塊_7___

<h2>8。金絲雀部署</h2>
<p>傳送一小部分流量到新版本進行測試。 </p>
___程式碼區塊_8___

<h2>9。縮放</h2>
___程式碼區塊_9___<h2>10。應避免部署反模式</h2>
<ul>
  <li>❌ 不要設定資源請求/限制 → Pod 在節點壓力時被驅逐</li>
  <li>❌ No readinessProbe → 到 Pod 的流量未準備好</li>
  <li>❌ <code>max不可用：0</code> 和 <code>maxSurge：同時 0</code> → 無效</li>
  <li>❌ 使用 <code>最新</code> 影像標籤 → 不可複製</li>
  <li>❌ <code>revisionHistoryLimit：0</code> → 無法回滾</li>
</ul>

<h2>摘要</h2>
<ul>
  <li>Deployment 管理 ReplicaSet，不應直接建立 ReplicaSet</li>
  <li>滾動更新：零停機，調整 maxSurge 和 maxUnavailable</li>
  <li>使用 <code>kubectl 推出撤銷進行回滾___HTMLTAG_110__HTMLTAG_111___
  <li>藍/綠：即時切換，需要雙倍資源__HTMLTAG_113___
  <li>Canary：逐步推出，透過副本數量控制流量%__HTMLTAG_115___
</ul>