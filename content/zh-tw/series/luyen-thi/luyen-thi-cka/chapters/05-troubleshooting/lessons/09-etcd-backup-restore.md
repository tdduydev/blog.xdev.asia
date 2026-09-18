---
id: cka-d5-l09
title: '第9課：etcd 備份 & 還原'
slug: 09-etcd-backup-restore
description: >-
  etcdctl snapshot 備份與還原。CKA 考試中的 etcd 操作。
  TLS 憑證路徑與故障排除。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 9
section_title: "領域5: Troubleshooting (30%)"
course:
  id: lt-cka-series-001
  title: 'CKA 認證備考 — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai9-etcd.webp" alt="etcd 備份與還原流程" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="etcd-overview">1. etcd — 叢集狀態儲存</h2>

<pre><code class="language-text">etcd 儲存了 Kubernetes 叢集的所有資料：
  - Pods、Services、Deployments 的定義
  - ConfigMaps、Secrets
  - RBAC 設定
  - 叢集狀態

etcd 是唯一的持久化儲存 → 備份 etcd = 備份整個叢集</code></pre>

<h2 id="backup">2. etcd 備份</h2>

<pre><code class="language-text"># 方法1：etcdctl snapshot save
ETCDCTL_API=3 etcdctl snapshot save /tmp/etcd-backup.db \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key

# 確認備份
ETCDCTL_API=3 etcdctl snapshot status /tmp/etcd-backup.db --write-table</code></pre>

<blockquote><p><strong>考試重點：</strong>TLS 憑證路徑是 CKA 考試的重點。從 etcd manifest 取得正確路徑：<code>cat /etc/kubernetes/manifests/etcd.yaml | grep -E 'cert|key|ca'</code>。</p></blockquote>

<h2 id="find-certs">3. 取得 TLS 憑證路徑</h2>

<pre><code class="language-text"># 從 etcd manifest 取得
cat /etc/kubernetes/manifests/etcd.yaml

# 找到以下參數：
--cert-file=/etc/kubernetes/pki/etcd/server.crt      → --cert
--key-file=/etc/kubernetes/pki/etcd/server.key        → --key
--trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt     → --cacert
--listen-client-urls=https://127.0.0.1:2379           → --endpoints

# 或用 grep 快速找到
grep -E 'cert-file|key-file|trusted-ca|listen-client' \
  /etc/kubernetes/manifests/etcd.yaml</code></pre>

<h2 id="restore">4. etcd 還原</h2>

<pre><code class="language-text"># 步驟1：還原 snapshot 到新目錄
ETCDCTL_API=3 etcdctl snapshot restore /tmp/etcd-backup.db \
  --data-dir=/var/lib/etcd-restored

# 步驟2：修改 etcd manifest 的 data-dir
# 編輯 /etc/kubernetes/manifests/etcd.yaml
# 將 hostPath 改為 /var/lib/etcd-restored
# 或修改 --data-dir 參數

# 修改前：
  volumes:
  - hostPath:
      path: /var/lib/etcd
  
# 修改後：
  volumes:
  - hostPath:
      path: /var/lib/etcd-restored

# 步驟3：kubelet 會偵測到 manifest 變更並重新建立 etcd Pod
# 等待 etcd Pod 啟動
kubectl get pods -n kube-system | grep etcd</code></pre>

<h2 id="troubleshoot-etcd">5. etcd 故障排除</h2>

<pre><code class="language-text"># 確認 etcd 健康狀態
ETCDCTL_API=3 etcdctl endpoint health \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key

# 列出 etcd 成員
ETCDCTL_API=3 etcdctl member list \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key</code></pre>

<h2 id="cheatsheet">6. 速查表</h2>

<table>
<thead><tr><th>任務</th><th>指令</th></tr></thead>
<tbody>
<tr><td>備份</td><td><code>etcdctl snapshot save FILE --cert --key --cacert --endpoints</code></td></tr>
<tr><td>確認備份</td><td><code>etcdctl snapshot status FILE --write-table</code></td></tr>
<tr><td>還原</td><td><code>etcdctl snapshot restore FILE --data-dir=NEW_DIR</code></td></tr>
<tr><td>健康檢查</td><td><code>etcdctl endpoint health ...</code></td></tr>
<tr><td>取得憑證路徑</td><td><code>grep cert /etc/kubernetes/manifests/etcd.yaml</code></td></tr>
</tbody>
</table>

<h2 id="practice">7. 練習題</h2>

<p><strong>Q1：</strong>CKA 考試中被要求備份 etcd。第一步應該做什麼？</p>
<ul>
<li>A) 直接執行 etcdctl snapshot save</li>
<li>B) 從 /etc/kubernetes/manifests/etcd.yaml 取得 TLS 憑證路徑和 endpoints ✓</li>
<li>C) 停止 kubelet</li>
<li>D) 建立新的 etcd Pod</li>
</ul>
<p><em>解析：etcdctl 需要 TLS 憑證和正確的 endpoint。從 etcd manifest 取得 --cert-file、--key-file、--trusted-ca-file 和 --listen-client-urls。記住 ETCDCTL_API=3。</em></p>

<p><strong>Q2：</strong>etcd 還原後，如何讓 kubelet 使用新的資料目錄？</p>
<ul>
<li>A) 重新啟動 kubelet</li>
<li>B) 修改 /etc/kubernetes/manifests/etcd.yaml 的 hostPath 指向新目錄 ✓</li>
<li>C) 執行 kubectl apply</li>
<li>D) 刪除並重新建立 etcd Pod</li>
</ul>
<p><em>解析：etcd 以靜態 Pod 運行，manifest 在 /etc/kubernetes/manifests/。修改 etcd.yaml 的 volumes.hostPath 和 --data-dir 參數為還原後的新目錄。kubelet 會自動重新載入。</em></p>

<p><strong>Q3：</strong>ETCDCTL_API=3 環境變數的作用是什麼？</p>
<ul>
<li>A) 指定 etcd 伺服器版本</li>
<li>B) 使用 etcdctl v3 API（v2 和 v3 有不同的資料結構和指令） ✓</li>
<li>C) 設定連線逾時</li>
<li>D) 啟用加密</li>
</ul>
<p><em>解析：etcd v2 和 v3 的 API 不同。Kubernetes 使用 v3 API 儲存資料。snapshot save/restore 指令只在 v3 API 下可用。ETCDCTL_API=3 確保使用 v3 API。</em></p>
