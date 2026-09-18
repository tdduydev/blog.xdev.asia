---
id: cka-d1-l02
title: '第2課：叢集升級（kubeadm）'
slug: 02-cluster-upgrade-kubeadm
description: >-
  使用 kubeadm 升級叢集的步驟。控制平面與工作節點的逐步升級。
  版本偏差政策、drain/uncordon。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 2
section_title: "領域1: Cluster Architecture, Installation & Configuration (25%)"
course:
  id: lt-cka-series-001
  title: 'CKA 認證備考 — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai2-upgrade.webp" alt="kubeadm 叢集升級流程 — 控制平面與工作節點" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="version-skew">1. 版本偏差政策</h2>

<table>
<thead><tr><th>元件</th><th>允許的版本差異</th></tr></thead>
<tbody>
<tr><td>kube-apiserver</td><td>基準版本（例：1.30）</td></tr>
<tr><td>controller-manager, scheduler</td><td>apiserver ± 1（例：1.29–1.30）</td></tr>
<tr><td>kubelet</td><td>apiserver -2 ~ apiserver（例：1.28–1.30）</td></tr>
<tr><td>kubectl</td><td>apiserver ± 1</td></tr>
</tbody>
</table>

<blockquote><p><strong>考試重點：</strong>必須一次升級一個次版本（例：1.29 → 1.30 → 1.31）。不支援跳版本升級。</p></blockquote>

<h2 id="upgrade-controlplane">2. 控制平面升級</h2>

<pre><code class="language-text"># 步驟1：升級 kubeadm
sudo apt-get update
sudo apt-get install -y kubeadm=1.30.0-00
kubeadm version  # 確認

# 步驟2：確認升級計劃
sudo kubeadm upgrade plan

# 步驟3：套用控制平面升級
sudo kubeadm upgrade apply v1.30.0

# 步驟4：Drain 節點
kubectl drain controlplane --ignore-daemonsets

# 步驟5：升級 kubelet & kubectl
sudo apt-get install -y kubelet=1.30.0-00 kubectl=1.30.0-00
sudo systemctl daemon-reload
sudo systemctl restart kubelet

# 步驟6：Uncordon
kubectl uncordon controlplane</code></pre>

<h2 id="upgrade-worker">3. 工作節點升級</h2>

<pre><code class="language-text"># 從控制平面執行 drain
kubectl drain worker1 --ignore-daemonsets --delete-emptydir-data

# SSH 到工作節點
ssh worker1

# 升級 kubeadm
sudo apt-get update
sudo apt-get install -y kubeadm=1.30.0-00

# 升級節點設定
sudo kubeadm upgrade node

# 升級 kubelet
sudo apt-get install -y kubelet=1.30.0-00
sudo systemctl daemon-reload
sudo systemctl restart kubelet

# 回到控制平面執行 uncordon
exit
kubectl uncordon worker1</code></pre>

<h2 id="drain-cordon">4. drain & cordon</h2>

<table>
<thead><tr><th>指令</th><th>行為</th></tr></thead>
<tbody>
<tr><td><code>kubectl cordon NODE</code></td><td>停止排程新 Pod（現有 Pod 保持不變）</td></tr>
<tr><td><code>kubectl drain NODE</code></td><td>cordon + 驅逐現有 Pod</td></tr>
<tr><td><code>kubectl uncordon NODE</code></td><td>恢復排程功能</td></tr>
</tbody>
</table>

<h2 id="cheatsheet">5. 速查表</h2>

<table>
<thead><tr><th>任務</th><th>指令</th></tr></thead>
<tbody>
<tr><td>確認升級計劃</td><td><code>kubeadm upgrade plan</code></td></tr>
<tr><td>套用控制平面升級</td><td><code>kubeadm upgrade apply v1.30.0</code></td></tr>
<tr><td>更新工作節點設定</td><td><code>kubeadm upgrade node</code></td></tr>
<tr><td>Drain 節點</td><td><code>kubectl drain NODE --ignore-daemonsets</code></td></tr>
<tr><td>Uncordon 節點</td><td><code>kubectl uncordon NODE</code></td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習題</h2>

<p><strong>Q1：</strong>控制平面升級的正確順序是？</p>
<ul>
<li>A) kubelet → kubeadm → kubectl</li>
<li>B) kubeadm → kubeadm upgrade apply → drain → kubelet/kubectl → uncordon ✓</li>
<li>C) kubectl → kubeadm → kubelet</li>
<li>D) drain → kubeadm → kubelet → uncordon → kubeadm upgrade</li>
</ul>
<p><em>解析：正確順序是先升級 kubeadm 套件，執行 kubeadm upgrade apply，drain 節點，升級 kubelet 和 kubectl，最後 uncordon。</em></p>

<p><strong>Q2：</strong>kubectl drain node1 不使用 --ignore-daemonsets 旗標時會發生什麼？</p>
<ul>
<li>A) DaemonSet 的 Pod 會被刪除</li>
<li>B) drain 會因錯誤而失敗 — DaemonSet 的 Pod 無法驅逐 ✓</li>
<li>C) 所有 Pod 會正常驅逐</li>
<li>D) DaemonSet 會自動縮減</li>
</ul>
<p><em>解析：DaemonSet 的 Pod 設計為每個節點各一個。嘗試驅逐會產生錯誤。--ignore-daemonsets 旗標會忽略 DaemonSet 的 Pod 繼續執行 drain。</em></p>

<p><strong>Q3：</strong>可以將 Kubernetes v1.29 的叢集直接升級到 v1.31 嗎？</p>
<ul>
<li>A) 可以，直接執行 kubeadm upgrade apply v1.31.0</li>
<li>B) 不可以，必須先升級到 v1.30 再升級到 v1.31 ✓</li>
<li>C) 可以，使用 --skip-version 旗標</li>
<li>D) 不可以，需要重建叢集</li>
</ul>
<p><em>解析：Kubernetes 升級必須逐次版本進行。按照 v1.29 → v1.30 → v1.31 的順序升級。跳版本可能造成不可預期的相容性問題。</em></p>
