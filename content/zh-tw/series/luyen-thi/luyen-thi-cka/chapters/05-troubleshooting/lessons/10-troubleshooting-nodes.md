---
id: cka-d5-l10
title: '第10課：節點故障排除'
slug: 10-troubleshooting-nodes
description: >-
  Node NotReady 診斷。kubelet 故障排除。
  憑證過期、磁碟壓力、記憶體壓力。CKA 考試中的節點除錯。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 10
section_title: "領域5: Troubleshooting (30%)"
course:
  id: lt-cka-series-001
  title: 'CKA 認證備考 — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai10-node-debug.webp" alt="節點故障排除流程 — NotReady 診斷" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="node-notready">1. Node NotReady — 常見原因</h2>

<pre><code class="language-text">kubectl get nodes
# NAME         STATUS     ROLES           AGE   VERSION
# worker1      NotReady   <none>          30d   v1.30.0

# 診斷步驟：
kubectl describe node worker1
# 查看 Conditions：
#   Ready            False    ← 問題
#   MemoryPressure   False
#   DiskPressure     False
#   PIDPressure      False</code></pre>

<table>
<thead><tr><th>NotReady 原因</th><th>診斷</th><th>修復</th></tr></thead>
<tbody>
<tr><td>kubelet 停止</td><td><code>systemctl status kubelet</code></td><td><code>systemctl start kubelet</code></td></tr>
<tr><td>kubelet 設定錯誤</td><td><code>journalctl -u kubelet</code></td><td>修復設定檔</td></tr>
<tr><td>容器執行環境停止</td><td><code>systemctl status containerd</code></td><td><code>systemctl start containerd</code></td></tr>
<tr><td>CNI 問題</td><td>kubelet 日誌顯示 CNI 錯誤</td><td>重新安裝 CNI</td></tr>
<tr><td>憑證過期</td><td><code>openssl x509 -in CERT -noout -dates</code></td><td><code>kubeadm certs renew</code></td></tr>
</tbody>
</table>

<h2 id="kubelet-debug">2. kubelet 故障排除</h2>

<pre><code class="language-text"># SSH 到有問題的節點
ssh worker1

# 檢查 kubelet 服務狀態
systemctl status kubelet
# Active: inactive (dead) ← 問題！

# 查看 kubelet 日誌
journalctl -u kubelet -f
journalctl -u kubelet --since "10 minutes ago"

# 常見錯誤訊息：
# "failed to load kubelet config file" → 設定路徑錯誤
# "unable to load client CA file" → 憑證路徑錯誤
# "failed to run Kubelet: running with swap on is not supported" → swap 未關閉

# 重新啟動 kubelet
systemctl daemon-reload
systemctl restart kubelet
systemctl enable kubelet</code></pre>

<h2 id="disk-memory-pressure">3. 磁碟與記憶體壓力</h2>

<pre><code class="language-text"># 檢查節點條件
kubectl describe node worker1 | grep -A5 Conditions

# DiskPressure:
# kubelet 預設閾值：可用磁碟 < 10%
df -h   # 檢查磁碟使用量
# 清理不用的映像檔
crictl rmi --prune

# MemoryPressure:
# kubelet 預設閾值：可用記憶體 < 100Mi
free -h  # 檢查記憶體使用量

# PIDPressure:
# 進程數超過限制
ps aux | wc -l</code></pre>

<h2 id="cert-debug">4. 憑證過期</h2>

<pre><code class="language-text"># 檢查叢集憑證有效期
kubeadm certs check-expiration

# 檢查特定憑證
openssl x509 -in /etc/kubernetes/pki/apiserver.crt -noout -dates

# 更新所有憑證
kubeadm certs renew all
systemctl restart kubelet</code></pre>

<h2 id="cheatsheet">5. 速查表</h2>

<table>
<thead><tr><th>症狀</th><th>診斷指令</th></tr></thead>
<tbody>
<tr><td>Node NotReady</td><td><code>kubectl describe node NAME</code></td></tr>
<tr><td>kubelet 無法啟動</td><td><code>systemctl status kubelet</code> + <code>journalctl -u kubelet</code></td></tr>
<tr><td>憑證過期</td><td><code>kubeadm certs check-expiration</code></td></tr>
<tr><td>磁碟壓力</td><td><code>df -h</code> + <code>crictl rmi --prune</code></td></tr>
<tr><td>containerd 狀態</td><td><code>systemctl status containerd</code></td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習題</h2>

<p><strong>Q1：</strong>worker1 節點的狀態是 NotReady。SSH 到節點後 systemctl status kubelet 顯示 "inactive (dead)"。下一步應該做什麼？</p>
<ul>
<li>A) 刪除節點</li>
<li>B) 查看 kubelet 日誌（journalctl -u kubelet），找出啟動失敗的原因 ✓</li>
<li>C) 直接重新安裝 kubelet</li>
<li>D) 執行 kubectl uncordon worker1</li>
</ul>
<p><em>解析：kubelet 未運行時，先用 journalctl 查看日誌找出原因。可能是設定錯誤、憑證問題、swap 未關閉等。盲目重啟可能無法解決根本問題。</em></p>

<p><strong>Q2：</strong>kubelet 日誌顯示 "failed to run Kubelet: running with swap on is not supported"。如何解決？</p>
<ul>
<li>A) 更新 kubelet 版本</li>
<li>B) 關閉 swap（swapoff -a）並修改 /etc/fstab 永久關閉 ✓</li>
<li>C) 增加節點記憶體</li>
<li>D) 重新安裝 containerd</li>
</ul>
<p><em>解析：Kubernetes 預設不支援 swap。執行 swapoff -a 臨時關閉，修改 /etc/fstab 註解掉 swap 行以永久關閉。K8s 1.28+ 可以啟用 swap 支援但非預設。</em></p>

<p><strong>Q3：</strong>kubectl describe node 顯示 DiskPressure: True。最適當的初步處理是？</p>
<ul>
<li>A) 增加新的磁碟</li>
<li>B) 清理不用的容器映像檔和日誌以釋放磁碟空間 ✓</li>
<li>C) 增加記憶體</li>
<li>D) 重新啟動叢集</li>
</ul>
<p><em>解析：DiskPressure 表示磁碟空間不足。初步處理：使用 crictl rmi --prune 清除未使用的映像檔、清理容器日誌（/var/log/containers/）、清除已終止的 Pod。如果問題持續，需要擴展磁碟。</em></p>
