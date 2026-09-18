---
id: 019c9618-0101-7000-8000-c1147ba22e11
title: 第 10 課：配置圖與秘密
slug: bai-10-configmaps-va-secrets
description: 使用 ConfigMap 管理配置，使用 Secrets 管理敏感資料。不可變的 ConfigMaps/Secrets、靜態金鑰加密、用於從 AWS Secrets Manager、GCP Secret Manager、HashiCorp Vault 同步的外部 Secrets Operator。
duration_minutes: 80
is_free: false
video_url: null
sort_order: 10
section_title: 模組 3：配置和存儲
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: Kubernetes：從基礎到高級
  slug: kubernetes-tu-co-ban-den-nang-cao
locale: zh-tw
---
<h2>Kubernetes 中的設定對映與機密__HTMLTAG_1___

<p>在生產環境中，應用程式需要從外部環境讀取配置，而不是將其硬編碼到容器映像中。 Kubernetes 提供了兩種專門的機制：用於通用配置資料的 <strong>ConfigMap</strong> 和用於敏感資料的 <strong>Secret</strong>。本課程將深入探討這兩個問題，包括靜態加密以及與外部秘密管理系統的整合。 </p>

<img src="/storage/uploads/2026/03/k8s-configmaps-secrets-2026.webp" alt="ConfigMaps & Secrets trong Kubernetes" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h2>ConfigMaps：管理設定資料</h2>

<h3>什麼是 ConfigMap？ </h3>

<p>ConfigMap 是一個儲存鍵值設定資料的 Kubernetes 物件。這些資料與容器鏡像完全隔離，可讓您變更配置而無需重建鏡像。 ConfigMap 可以包含簡單的字串、多行設定文件，甚至整個檔案內容。 </p>

<p>ConfigMap 符合：</p>
<ul>
  <li>應用程式環境變數（資料庫主機、連接埠、功能標誌）</li>
  <li>設定檔內容（nginx.conf、application.properties）</li>
  <li>容器的命令列參數__HTMLTAG_23___
  <li>其他非敏感設定__HTMLTAG_25___
</ul>

<h3>從文字值建立 ConfigMap</h3>

___程式碼區塊_0___

<h3>從檔案建立 ConfigMap</h3>

___程式碼區塊_1___

<h3>ConfigMap YAML 定義</h3>

___程式碼區塊_2___

<h2>如何在 Pod 中使用 ConfigMap</h2>

<h3>1。 ConfigMap 中的環境變數</h3>

___程式碼區塊_3___

<h3>2。從 ConfigMap掛載磁碟區</h3>

___程式碼區塊_4___

<h3>3。來自 ConfigMap 的命令列參數</h3>

___程式碼區塊_5___

<h2>秘密：管理敏感資料</h2>

<h3>什麼是秘密以及為什麼 Base64 不加密？ </h3>

<p>Kubernetes 中的 Secret 儲存敏感數據，例如密碼、令牌和 TLS 憑證。要理解的一件重要的事情是：<strong>預設的秘密僅是 base64 編碼的，而不是編碼的</strong>。 Base64 只是一種透過文字通道傳輸二進位資料的編碼 - 任何人都可以輕鬆解碼它。 </p>

___程式碼區塊_6___

<p>這意味著任何有權在 etcd 中或透過 Kubernetes API 讀取 Secret 的人都可以看到實際值。因此，需要額外的安全層，我們將在稍後討論。 </p>

<h3>秘密型別</h3>

<h4>1。不透明（通用）秘密</h4>

___程式碼區塊_7___

___程式碼區塊_8___

<h4>2。 TLS 秘密</h4>

___程式碼區塊_9___

___程式碼區塊_10___

<h4>3。 Docker 註冊表秘密</h4>

___程式碼區塊_11___

___程式碼區塊_12___

<h3>在 Pod 中使用 Secret</h3>

<h4>將 Secret 安裝為環境變數__HTMLTAG_62___

___程式碼區塊_13___

<h4>將 Secret 安裝為卷宗</h4>

___程式碼區塊_14___

<h2>不可變的設定映射與秘密</h2>

<h3>為什麼是不可變的？ </h3><p>在數千個 Pod 的大型叢集中，每個 ConfigMap/Secret 變更都會觸發所有 kubelet 的監視事件。這會給 kube-apiserver 帶來很大的負載。 Kubernetes 1.21+ 支援 <strong>不可變的 ConfigMap 和 Secrets</strong> — 對生產叢集的重要最佳化。 </p>

<p>不可變的好處：</p>
<ul>
  <li>卸載 kube-apiserver：kubelet 無需監視變更</li>
  <li>提高穩定性：防止可能破壞應用程式的意外更新</li>
  <li>大量 Pod 的效能顯著提升__HTMLTAG_81___
</ul>

___程式碼區塊_15___

___程式碼區塊_16___

___程式碼區塊_17___

<h2>靜態秘密加密</h2>

<h3>預設儲存的問題</h3>

<p>預設情況下，Secrets 以 base64 純文字形式保存在 etcd 中。任何有權讀取 etcd 或 etcd 備份的人都可以看到所有秘密值。這是生產中的嚴重安全風險。 </p>

<h3>加密配置</h3>

<p>Kubernetes 透過 <code>EncryptionConfiguration</code> 支援靜態加密 — kube-apiserver 的設定文件，指定如何在儲存到 etcd 之前對資源進行加密。 </p>

___程式碼區塊_18___

___程式碼區塊_19___

<h2>外部機密業者</h2>

<h3>為什麼我們需要外部秘密操作員？ </h3>

<p>靜態加密可以保護 etcd 中的機密，但仍存在一個問題：機密仍在 Kubernetes 中管理。在企業環境中，機密通常在 AWS Secrets Manager、HashiCorp Vault、GCP Secret Manager、Azure Key Vault 中集中管理。 <strong>外部 Secrets Operator (ESO)</strong> 透過自動將外部系統的 Secret 同步到 Kubernetes Secret 來解決此問題。 </p>

<h3>設定外部機密運算子</h3>

___程式碼區塊_20___

<h3>SecretStore 和 ClusterSecretStore CRD</h3>

<p>ESO 使用兩種主要類型的 CRD：<strong>SecretStore</strong>（命名空間範圍）和 <strong>ClusterSecretStore</strong>（叢集範圍）。您可以在此處設定與外部秘密後端的連線。 </p>

<h4>AWS Secrets Manager 的 ClusterSecretStore__HTMLTAG_114___

___程式碼區塊_21___

___程式碼區塊_22___

<h4>從 AWS Secrets Manager 同步的外部Secret</h4>

___程式碼區塊_23___

<h4>同步所有 AWS 金鑰</h4>

___程式碼區塊_24___

<h3>HashiCorp Vault 的 SecretStore</h3>

___程式碼區塊_25___

___程式碼區塊_26___

___程式碼區塊_27___

<h2>ConfigMap 和 Secret 的最佳實務__HTMLTAG_122___

<h3>1。不要向 Git 提交秘密</h3>

___程式碼區塊_28___

<h3>2。 RBAC 的秘密</h3>

___程式碼區塊_29___

<h3>3。秘密輪換</h3>

___程式碼區塊_30___

<h3>4。秘密命名空間隔離</h3>

___程式碼區塊_31___

<h3>5。秘密存取的審核日誌</h3>

___程式碼區塊_32___

<h2>摘要</h2><p>ConfigMaps 和 Secrets 是 Kubernetes 中設定管理的基礎。要記住的重點：</p>

<ul>
  ___HTMLTAG_138__HTMLTAG_139___ConfigMap</strong> 用於非敏感配置，支援環境變數、磁碟區掛載和命令參數</li>
  ___HTMLTAG_142__HTMLTAG_143___秘密</strong>預設僅base64編碼 - 不加密，需要額外的安全層</li>
  ___HTMLTAG_146__HTMLTAG_147___不可變</strong> ConfigMaps/Secrets 顯著提高大型叢集中的效能</li>
  ___HTMLTAG_150__HTMLTAG_151___加密設定</strong> 使用 AES-GCM/AES-CBC 加密 etcd 中的靜態金鑰</li>
  ___HTMLTAG_154__HTMLTAG_155___外部 Secrets Operator</strong> 是最佳生產解決方案：從 Vault、AWS Secrets Manager 同步，減少攻擊面__HTMLTAG_157___
  <li>始終嚴格應用 RBAC，不要向 Git 提交機密，並製定輪換計劃</li>
</ul>