---
id: kcna-d2-l05
title: '第5課：容器執行環境與 OCI 標準'
slug: 05-container-runtimes-oci
description: >-
  OCI（Open Container Initiative）、容器執行環境介面（CRI）。
  Docker、containerd、CRI-O。映像層、Registry 與映像生命週期。
duration_minutes: 50
is_free: true
video_url: null
sort_order: 5
locale: zh-tw
section_title: "領域2：容器編排（22%）"
course:
  id: lt-kcna-series-001
  title: 'KCNA 認證備考 — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai5-oci-runtimes.webp" alt="OCI 容器執行環境堆疊 — CRI、containerd、runc" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="oci">1. OCI — Open Container Initiative</h2>

<p><strong>OCI</strong> 是隸屬 Linux Foundation 的開放組織，定義容器的開放標準：</p>

<table>
<thead><tr><th>規格</th><th>定義</th><th>實作範例</th></tr></thead>
<tbody>
<tr><td><strong>OCI Image Spec</strong></td><td>容器映像格式（層、清單）</td><td>Docker image、OCI image</td></tr>
<tr><td><strong>OCI Runtime Spec</strong></td><td>如何從映像執行容器（生命週期、檔案系統）</td><td>runc、crun、kata-containers</td></tr>
<tr><td><strong>OCI Distribution Spec</strong></td><td>從 Registry push/pull 映像的 API</td><td>DockerHub、ECR、GCR</td></tr>
</tbody>
</table>

<blockquote><p><strong>考試重點：</strong> OCI 標準確保<strong>互通性</strong>：用 Docker 建置的映像可以在 containerd 或 CRI-O 上執行，無需修改。KCNA 經常考 OCI 在雲原生生態系中的角色。</p></blockquote>

<h2 id="container-runtime">2. 容器執行環境介面（CRI）</h2>

<p>Kubernetes 不直接與 Docker 或 containerd 通訊。kubelet 使用 <strong>CRI（Container Runtime Interface）</strong>——一個標準的 gRPC API。</p>

<pre><code class="language-text">Kubernetes Architecture (Runtime Layer):

  kubelet
     │ CRI (gRPC)
     ├─── containerd ─── runc ─── container
     ├─── CRI-O      ─── runc ─── container
     └─── (Docker)   ─── (deprecated v1.24+)

  OCI Runtime (runc, crun):
  - 讀取 OCI runtime bundle
  - 呼叫 Linux kernel（namespaces、cgroups）
  - 建立容器程序</code></pre>

<h2 id="runtimes-comparison">3. 容器執行環境比較</h2>

<table>
<thead><tr><th>執行環境</th><th>類型</th><th>特點</th><th>使用場景</th></tr></thead>
<tbody>
<tr><td><strong>containerd</strong></td><td>High-level（CRI）</td><td>輕量、穩定、CNCF graduated</td><td>Kubernetes 1.24+ 預設</td></tr>
<tr><td><strong>CRI-O</strong></td><td>High-level（CRI）</td><td>為 Kubernetes 最佳化、輕量</td><td>OpenShift、Kubernetes</td></tr>
<tr><td><strong>Docker Engine</strong></td><td>High-level（non-CRI）</td><td>自 K8s 1.24 起棄用（使用 dockershim）</td><td>開發環境</td></tr>
<tr><td><strong>runc</strong></td><td>Low-level（OCI）</td><td>OCI 參考實作</td><td>containerd/CRI-O 的後端</td></tr>
<tr><td><strong>gVisor (runsc)</strong></td><td>Low-level（沙箱）</td><td>安全沙箱，攔截系統呼叫</td><td>GKE 沙箱、不受信任的工作負載</td></tr>
<tr><td><strong>Kata Containers</strong></td><td>Low-level（VM-based）</td><td>每個容器使用 VM 隔離</td><td>多租戶、高安全性</td></tr>
</tbody>
</table>

<blockquote><p><strong>考試重點：</strong> Docker 作為 Kubernetes 執行環境自 v1.24 起被棄用，但 Docker 映像（OCI 相容）仍然可以在 containerd/CRI-O 上執行。「Docker 棄用」≠「Docker 映像棄用」。</p></blockquote>

<h2 id="image-layers">4. 容器映像層</h2>

<pre><code class="language-text">Layer architecture:
┌──────────────────────────────┐
│  Layer 4: App code (5 MB)    │  ← Writeable (container layer)
├──────────────────────────────┤
│  Layer 3: npm packages       │  ← Read-only
├──────────────────────────────┤
│  Layer 2: Node.js runtime    │  ← Read-only
├──────────────────────────────┤
│  Layer 1: Ubuntu base image  │  ← Read-only (shared across images)
└──────────────────────────────┘

快取優勢：如果 Layer 1-2 相同，只需下載 Layer 3-4</code></pre>

<h2 id="registries">5. 容器 Registry</h2>

<table>
<thead><tr><th>Registry</th><th>供應商</th><th>特點</th></tr></thead>
<tbody>
<tr><td>Docker Hub</td><td>Docker Inc.</td><td>公開預設，有拉取速率限制</td></tr>
<tr><td>ECR (Elastic Container Registry)</td><td>AWS</td><td>私有，整合 IAM</td></tr>
<tr><td>GCR / Artifact Registry</td><td>GCP</td><td>私有，Workload Identity</td></tr>
<tr><td>GHCR (GitHub Container Registry)</td><td>GitHub</td><td>與套件連結，Actions CI</td></tr>
<tr><td>Harbor</td><td>CNCF（開源）</td><td>自建，弱點掃描</td></tr>
</tbody>
</table>

<h2 id="cheatsheet">6. 速查表</h2>

<table>
<thead><tr><th>考試問題</th><th>答案</th></tr></thead>
<tbody>
<tr><td>OCI 定義了什麼標準？</td><td>Image Spec、Runtime Spec、Distribution Spec</td></tr>
<tr><td>K8s 1.24+ 的預設執行環境？</td><td><strong>containerd</strong></td></tr>
<tr><td>CRI 是什麼？</td><td>Container Runtime Interface — kubelet 與執行環境之間的 gRPC API</td></tr>
<tr><td>Docker 在 K8s 中何時被棄用？</td><td><strong>自 v1.24</strong>（dockershim 移除）</td></tr>
<tr><td>不受信任工作負載的執行環境？</td><td><strong>gVisor</strong> 或 <strong>Kata Containers</strong></td></tr>
</tbody>
</table>

<h2 id="practice">7. 練習題</h2>

<p><strong>Q1:</strong> Kubernetes 叢集使用 containerd 作為容器執行環境。開發者將 Docker 映像推送到 Docker Hub。此映像可以在叢集上執行嗎？</p>
<ul>
<li>A) 不行，Docker 映像與 containerd 不相容</li>
<li>B) 可以，因為 Docker 映像遵循 OCI Image Spec 並且相容 ✓</li>
<li>C) 僅在叢集安裝 Docker 相容墊片的情況下</li>
<li>D) 不行，containerd 僅支援 CNCF Registry 的映像</li>
</ul>
<p><em>解析：Docker 映像遵循 OCI Image 規格，使其可與任何符合 OCI 的執行環境互通，包括 containerd 和 CRI-O。「Docker 棄用」指的是執行環境，而非映像格式。</em></p>

<p><strong>Q2:</strong> 容器執行環境介面（CRI）的主要目的是什麼？</p>
<ul>
<li>A) 定義映像層格式</li>
<li>B) 提供 gRPC API 讓 kubelet 與容器執行環境通訊 ✓</li>
<li>C) 管理 Registry 之間的容器映像分發</li>
<li>D) 在叢集節點間排程容器</li>
</ul>
<p><em>解析：CRI 為 kubelet 提供穩定的 API 來與不同的執行環境（containerd、CRI-O）互動，無需了解實作細節。這種解耦使切換執行環境無需更改 kubelet 程式碼。</em></p>

<p><strong>Q3:</strong> 哪種容器執行環境為高安全性多租戶工作負載提供每個容器的 VM 層級隔離？</p>
<ul>
<li>A) containerd</li>
<li>B) CRI-O</li>
<li>C) Kata Containers ✓</li>
<li>D) runc</li>
</ul>
<p><em>解析：Kata Containers 在輕量級 VM 中執行每個容器，提供比標準 Linux namespace 容器更強的隔離。gVisor 透過系統呼叫攔截提供使用者空間隔離，也很強但方法不同。</em></p>
