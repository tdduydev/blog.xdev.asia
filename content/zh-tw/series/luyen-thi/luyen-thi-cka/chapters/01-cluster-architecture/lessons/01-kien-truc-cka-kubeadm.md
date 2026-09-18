---
id: cka-d1-l01
title: '第1課：Kubernetes 架構 & 叢集元件'
slug: 01-kien-truc-cka-kubeadm
description: >-
  控制平面與工作節點元件。kubeadm 叢集啟動流程。
  CKA 考試環境中的 ETCD、API Server、Scheduler、Controller Manager。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 1
section_title: "領域1: Cluster Architecture, Installation & Configuration (25%)"
course:
  id: lt-cka-series-001
  title: 'CKA 認證備考 — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai1-kubeadm.webp" alt="kubeadm 叢集初始化流程與 kubeconfig" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="architecture">1. Kubernetes 架構概覽（CKA 重點）</h2>

<p>CKA 考試不僅考理論，還要求對叢集元件進行故障排除。</p>

<pre><code class="language-text">控制平面節點                   工作節點
──────────────                ────────────
  kube-apiserver  ◄──────────── kubelet
  etcd                           kube-proxy
  kube-scheduler                 容器執行環境
  controller-manager             (containerd)
  cloud-controller-manager (選用)
  
所有元件透過 kube-apiserver 通訊（只有 etcd 與 API server 直接通訊）</code></pre>

<table>
<thead><tr><th>元件</th><th>位置</th><th>設定 / Pod 路徑</th><th>故障排除</th></tr></thead>
<tbody>
<tr><td><strong>kube-apiserver</strong></td><td>控制平面</td><td><code>/etc/kubernetes/manifests/kube-apiserver.yaml</code></td><td>kubectl get pods -n kube-system</td></tr>
<tr><td><strong>etcd</strong></td><td>控制平面</td><td><code>/etc/kubernetes/manifests/etcd.yaml</code></td><td>etcdctl member list</td></tr>
<tr><td><strong>kube-scheduler</strong></td><td>控制平面</td><td><code>/etc/kubernetes/manifests/kube-scheduler.yaml</code></td><td>檢查 kube-system 日誌</td></tr>
<tr><td><strong>controller-manager</strong></td><td>控制平面</td><td><code>/etc/kubernetes/manifests/kube-controller-manager.yaml</code></td><td>檢查 kube-system 日誌</td></tr>
<tr><td><strong>kubelet</strong></td><td>所有節點</td><td><code>/var/lib/kubelet/config.yaml</code>、systemd 服務</td><td>systemctl status kubelet</td></tr>
</tbody>
</table>

<blockquote><p><strong>考試重點：</strong>在 kubeadm 叢集中，控制平面元件以<strong>靜態 Pod</strong>（<code>/etc/kubernetes/manifests/</code> 目錄中的檔案）運行。kubelet 會自動啟動和重新啟動它們。編輯 manifest 檔案後，kubelet 會自動重新載入 Pod（不需要 kubectl apply）。</p></blockquote>

<h2 id="kubeadm">2. kubeadm — 叢集啟動</h2>

<pre><code class="language-text"># 1. 初始化控制平面
sudo kubeadm init \
  --pod-network-cidr=10.244.0.0/16 \
  --apiserver-advertise-address=192.168.1.10

# 2. 設定 kubeconfig
mkdir -p $HOME/.kube
sudo cp /etc/kubernetes/admin.conf $HOME/.kube/config

# 3. 安裝 CNI（Pod 網路）
kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml

# 4. 加入工作節點
kubeadm join 192.168.1.10:6443 --token xxx --discovery-token-ca-cert-hash sha256:yyy</code></pre>

<h2 id="static-pods">3. 靜態 Pod & Manifest</h2>

<pre><code class="language-text"># 靜態 Pod 路徑
/etc/kubernetes/manifests/
├── etcd.yaml
├── kube-apiserver.yaml
├── kube-controller-manager.yaml
└── kube-scheduler.yaml

# 確認 kubelet 的靜態 Pod 路徑
cat /var/lib/kubelet/config.yaml | grep staticPodPath
# staticPodPath: /etc/kubernetes/manifests

# 故障排除：元件無法啟動時
kubectl get pods -n kube-system
kubectl describe pod kube-apiserver-controlplane -n kube-system
kubectl logs kube-apiserver-controlplane -n kube-system</code></pre>

<h2 id="kubeconfig">4. kubeconfig & Context</h2>

<pre><code class="language-text"># 當前 context
kubectl config current-context

# 切換 context（CKA 考試中每道題目需要切換叢集）
kubectl config use-context cluster1

# 檢視 kubeconfig
kubectl config view
cat ~/.kube/config</code></pre>

<h2 id="cheatsheet">5. 速查表</h2>

<table>
<thead><tr><th>任務</th><th>指令</th></tr></thead>
<tbody>
<tr><td>初始化叢集</td><td><code>kubeadm init --pod-network-cidr=...</code></td></tr>
<tr><td>產生節點加入 token</td><td><code>kubeadm token create --print-join-command</code></td></tr>
<tr><td>確認控制平面 Pod</td><td><code>kubectl get pods -n kube-system</code></td></tr>
<tr><td>靜態 Pod manifest</td><td><code>ls /etc/kubernetes/manifests/</code></td></tr>
<tr><td>確認 kubelet 設定</td><td><code>cat /var/lib/kubelet/config.yaml</code></td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習題</h2>

<p><strong>Q1：</strong>在 kubeadm 叢集中 kube-apiserver 未運行時，最先應該檢查的檔案是？</p>
<ul>
<li>A) /etc/kubernetes/kubelet.conf</li>
<li>B) /etc/kubernetes/manifests/kube-apiserver.yaml ✓</li>
<li>C) ~/.kube/config</li>
<li>D) /var/log/syslog</li>
</ul>
<p><em>解析：在 kubeadm 叢集中 kube-apiserver 以靜態 Pod 運行。kubelet 會偵測 manifest 變更並自動重新載入。YAML 語法錯誤或設定錯誤是最常見的原因。</em></p>

<p><strong>Q2：</strong>如何取得讓新工作節點加入叢集的 join 指令？</p>
<ul>
<li>A) kubectl get nodes --join-command</li>
<li>B) kubeadm token create --print-join-command ✓</li>
<li>C) kubeadm init --print-join</li>
<li>D) kubectl cluster-info --join</li>
</ul>
<p><em>解析：kubeadm token create --print-join-command 會產生新的 token 並顯示完整的 join 指令。Token 的預設有效期限為 24 小時。</em></p>

<p><strong>Q3：</strong>如果 kube-scheduler 停止運行會發生什麼？</p>
<ul>
<li>A) 現有的 Pod 會崩潰</li>
<li>B) 新的 Pod 會停留在 Pending 狀態，不會被排程到節點 ✓</li>
<li>C) 整個叢集會停止運作</li>
<li>D) 所有 Service 會無法存取</li>
</ul>
<p><em>解析：kube-scheduler 負責將新 Pod 分配到節點。停止後，新 Pod 會維持在 Pending 狀態。已經執行中的 Pod 不受影響。</em></p>
