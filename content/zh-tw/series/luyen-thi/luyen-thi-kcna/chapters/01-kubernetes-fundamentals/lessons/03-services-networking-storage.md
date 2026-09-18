---
id: kcna-d1-l03
title: '第3課：Service、網路與儲存'
slug: 03-services-networking-storage
description: >-
  Service 類型（ClusterIP、NodePort、LoadBalancer、ExternalName）。CoreDNS
  與服務發現。PersistentVolume、PVC、ConfigMap、Secret。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 3
section_title: "Domain 1: Kubernetes Fundamentals (46%)"
course:
  id: lt-kcna-series-001
  title: 'KCNA 認證備考 — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai3-services-networking.webp" alt="Kubernetes Service 與網路 — ClusterIP、NodePort、LoadBalancer" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="services">1. Service 類型</h2>

<p>Pod 的 IP 是臨時的，重啟後會消失。<strong>Service</strong> 提供穩定的虛擬 IP（ClusterIP）並透過標籤選擇器對一組 Pod 進行負載均衡。</p>

<table>
<thead><tr><th>類型</th><th>可存取範圍</th><th>使用場景</th><th>實際範例</th></tr></thead>
<tbody>
<tr><td><strong>ClusterIP</strong></td><td>僅叢集內部</td><td>後端微服務</td><td>支付服務 → DB</td></tr>
<tr><td><strong>NodePort</strong></td><td>透過 NodeIP:Port 外部存取（30000-32767）</td><td>開發/測試存取</td><td>裸機上的示範應用</td></tr>
<tr><td><strong>LoadBalancer</strong></td><td>透過雲端 LB 外部存取</td><td>雲端上的生產應用</td><td>AWS/GCP 網際網路流量</td></tr>
<tr><td><strong>ExternalName</strong></td><td>外部服務的 CNAME 別名</td><td>整合外部 DNS</td><td>legacy-db.company.com</td></tr>
</tbody>
</table>

<pre><code class="language-text">External Traffic
      │
      ▼
[LoadBalancer]          ← cloud provider LB (AWS ELB, GCP)
      │
[NodePort :30080]       ← all nodes expose port 30080
      │
[ClusterIP 10.96.5.3]  ← virtual IP, iptables/IPVS routing
      │
 ┌────┴────┐
[Pod A] [Pod B]        ← matched by label selector</code></pre>

<blockquote><p><strong>考試重點：</strong> <strong>NodePort</strong> 會自動建立 <strong>ClusterIP</strong>。<strong>LoadBalancer</strong> 會自動建立 <strong>NodePort + ClusterIP</strong>。每種類型繼承較小的類型。</p></blockquote>

<h2 id="coredns">2. CoreDNS 與服務發現</h2>

<p><strong>CoreDNS</strong> 是 Kubernetes 叢集中的預設 DNS 伺服器。每個 Service 都會自動註冊 DNS 記錄。</p>

<pre><code class="language-text">DNS format: {service}.{namespace}.svc.cluster.local

範例：
  Namespace "production" 中的 Service "api"：
  → api.production.svc.cluster.local
  → api.production.svc
  → api.production
  → api（僅在相同 namespace 內）</code></pre>

<table>
<thead><tr><th>DNS 查詢</th><th>解析結果</th><th>可從何處使用</th></tr></thead>
<tbody>
<tr><td><code>api</code></td><td>Service ClusterIP</td><td>僅相同 namespace</td></tr>
<tr><td><code>api.production</code></td><td>Service ClusterIP</td><td>任何 namespace</td></tr>
<tr><td><code>api.production.svc.cluster.local</code></td><td>Service ClusterIP</td><td>任何 namespace（FQDN）</td></tr>
</tbody>
</table>

<h2 id="storage">3. 儲存：PV、PVC、StorageClass</h2>

<pre><code class="language-text">Storage lifecycle:
                    STATIC                     DYNAMIC
                    ─────                      ───────
  Admin creates  → PersistentVolume     StorageClass (provision template)
  App requests   → PersistentVolumeClaim → SC auto-provisions PV
  Pod mounts     → PVC as volume</code></pre>

<table>
<thead><tr><th>概念</th><th>角色</th><th>誰建立</th></tr></thead>
<tbody>
<tr><td><strong>PersistentVolume (PV)</strong></td><td>實際儲存資源（NFS、EBS、GCE Disk）</td><td>管理員或動態佈建器</td></tr>
<tr><td><strong>PersistentVolumeClaim (PVC)</strong></td><td>以大小和存取模式請求儲存</td><td>開發者/應用程式</td></tr>
<tr><td><strong>StorageClass</strong></td><td>PVC 建立時自動佈建 PV 的範本</td><td>管理員</td></tr>
</tbody>
</table>

<h3 id="access-modes">存取模式</h3>

<table>
<thead><tr><th>模式</th><th>縮寫</th><th>含義</th><th>範例</th></tr></thead>
<tbody>
<tr><td>ReadWriteOnce</td><td><strong>RWO</strong></td><td>1 個節點讀寫</td><td>EBS volume、本機磁碟</td></tr>
<tr><td>ReadOnlyMany</td><td><strong>ROX</strong></td><td>多個節點唯讀</td><td>NFS 上的靜態檔案</td></tr>
<tr><td>ReadWriteMany</td><td><strong>RWX</strong></td><td>多個節點讀寫</td><td>NFS、EFS、GlusterFS</td></tr>
<tr><td>ReadWriteOncePod</td><td><strong>RWOP</strong></td><td>僅 1 個 Pod（v1.22+）</td><td>需要獨佔存取</td></tr>
</tbody>
</table>

<blockquote><p><strong>考試重點：</strong> AWS EBS 僅支援 <strong>RWO</strong>。如果題目要求多個 Pod 同時寫入，需要使用 NFS（RWX）。StatefulSet 通常使用 RWO，每個 Pod 有自己的 PVC。</p></blockquote>

<h2 id="configmap-secret">4. ConfigMap 與 Secret</h2>

<table>
<thead><tr><th>資源</th><th>用途</th><th>編碼</th><th>注入 Pod 的方式</th></tr></thead>
<tbody>
<tr><td><strong>ConfigMap</strong></td><td>非敏感組態設定（URL、旗標、環境檔案）</td><td>純文字</td><td>環境變數、Volume 檔案、CLI 參數</td></tr>
<tr><td><strong>Secret</strong></td><td>敏感資料（密碼、API 金鑰、TLS 憑證）</td><td>Base64（預設未加密）</td><td>環境變數（不建議）、Volume 掛載</td></tr>
</tbody>
</table>

<blockquote><p><strong>考試重點：</strong> Secret 只是 base64 編碼，<strong>不是加密</strong>。要在靜態時加密 Secret，需要在 API Server 上啟用 <strong>Encryption Configuration</strong>。題目常用「encrypted」作為錯誤的干擾選項。</p></blockquote>

<h2 id="cheatsheet">5. 速查表</h2>

<table>
<thead><tr><th>考試問題</th><th>答案</th></tr></thead>
<tbody>
<tr><td>在雲端將應用公開到叢集外部？</td><td><strong>LoadBalancer</strong>（或 Ingress）</td></tr>
<tr><td>ns "backend" 中 Service "db" 的 DNS 名稱？</td><td><code>db.backend.svc.cluster.local</code></td></tr>
<tr><td>需要在多個 Pod 間共享儲存？</td><td>存取模式為 <strong>RWX</strong> 的 PV</td></tr>
<tr><td>部署時自動佈建儲存？</td><td><strong>StorageClass</strong> + PVC</td></tr>
<tr><td>Secret 預設是否加密？</td><td><strong>否</strong>，僅 base64</td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習題</h2>

<p><strong>Q1:</strong> 開發者想從不同的 namespace "frontend" 存取名為 "orders-db" 的後端資料庫 Service。應使用哪個 DNS 名稱？</p>
<ul>
<li>A) orders-db</li>
<li>B) orders-db.default.svc.cluster.local</li>
<li>C) orders-db.backend.svc.cluster.local ✓</li>
<li>D) backend.orders-db.cluster.local</li>
</ul>
<p><em>解析：跨 namespace 的 DNS 需要完整格式：{service}.{namespace}.svc.cluster.local。簡短名稱 "orders-db" 僅在相同 namespace 內有效。</em></p>

<p><strong>Q2:</strong> 哪種 Service 類型會自動建立 ClusterIP 和 NodePort？</p>
<ul>
<li>A) ClusterIP</li>
<li>B) NodePort</li>
<li>C) LoadBalancer ✓</li>
<li>D) ExternalName</li>
</ul>
<p><em>解析：LoadBalancer 是超集——它建立 ClusterIP + NodePort + 雲端負載均衡器。NodePort 包含 ClusterIP，但 ClusterIP 是獨立的，沒有外部存取。</em></p>

<p><strong>Q3:</strong> 一個 Secret 包含資料庫密碼。開發者聲稱密碼已「加密」。這個說法正確嗎？</p>
<ul>
<li>A) 是的，Kubernetes Secret 使用 AES 加密</li>
<li>B) 否，Secret 僅為 base64 編碼，除非啟用了 Encryption Configuration ✓</li>
<li>C) 是的，Secret 使用 etcd 內建加密進行加密</li>
<li>D) 否，Secret 以純文字儲存</li>
</ul>
<p><em>解析：預設情況下，Secret 在 etcd 中以 base64 編碼字串儲存——這不是加密。管理員必須在 API Server 上設定 EncryptionConfiguration 才能啟用靜態加密。</em></p>
