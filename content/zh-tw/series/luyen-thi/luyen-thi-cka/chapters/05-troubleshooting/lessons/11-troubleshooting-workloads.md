---
id: cka-d5-l11
title: '第11課：工作負載故障排除'
slug: 11-troubleshooting-workloads
description: >-
  Pod 狀態除錯（CrashLoopBackOff、ImagePullBackOff、Pending）。
  Deployment 故障排除。容器日誌與事件分析。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 11
section_title: "領域5: Troubleshooting (30%)"
course:
  id: lt-cka-series-001
  title: 'CKA 認證備考 — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai11-workload-debug.webp" alt="Pod 狀態與故障排除流程" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="pod-status">1. Pod 狀態除錯</h2>

<table>
<thead><tr><th>狀態</th><th>原因</th><th>診斷</th></tr></thead>
<tbody>
<tr><td><strong>Pending</strong></td><td>排程失敗（資源不足、Taint、Affinity）</td><td><code>kubectl describe pod</code>（Events）</td></tr>
<tr><td><strong>ImagePullBackOff</strong></td><td>映像檔不存在或沒有存取權限</td><td>確認映像檔名稱、Tag、Secret</td></tr>
<tr><td><strong>CrashLoopBackOff</strong></td><td>容器啟動後崩潰（應用程式錯誤）</td><td><code>kubectl logs pod</code></td></tr>
<tr><td><strong>CreateContainerConfigError</strong></td><td>ConfigMap/Secret 不存在</td><td><code>kubectl describe pod</code></td></tr>
<tr><td><strong>Init:Error</strong></td><td>Init Container 失敗</td><td><code>kubectl logs pod -c init-container</code></td></tr>
</tbody>
</table>

<h2 id="debug-flow">2. 系統化除錯流程</h2>

<pre><code class="language-text"># 步驟1：確認 Pod 狀態
kubectl get pods -o wide

# 步驟2：查看 Pod 詳情和事件
kubectl describe pod POD_NAME

# 步驟3：查看容器日誌
kubectl logs POD_NAME
kubectl logs POD_NAME -c CONTAINER   # 多容器 Pod
kubectl logs POD_NAME --previous     # 前一次執行的日誌

# 步驟4：進入容器除錯
kubectl exec -it POD_NAME -- sh
kubectl exec -it POD_NAME -c CONTAINER -- sh

# 步驟5：使用除錯容器
kubectl debug -it POD_NAME --image=busybox --target=CONTAINER</code></pre>

<h2 id="crashloop">3. CrashLoopBackOff 除錯</h2>

<pre><code class="language-text"># 常見原因：
# 1. 應用程式啟動錯誤
kubectl logs pod-name
kubectl logs pod-name --previous   # ← 重點！看前一次崩潰日誌

# 2. 指令或參數錯誤
kubectl get pod pod-name -o yaml | grep -A5 command

# 3. 健康檢查失敗
# livenessProbe 太嚴格 → Pod 被 kubelet 殺掉
kubectl describe pod pod-name | grep -A10 Liveness

# 4. 資源限制（OOMKilled）
kubectl describe pod pod-name | grep -A5 "Last State"
# Reason: OOMKilled → 增加 memory limits</code></pre>

<h2 id="imagepull">4. ImagePullBackOff 除錯</h2>

<pre><code class="language-text"># 常見原因：
# 1. 映像檔名稱/Tag 錯誤
# 2. 私有倉庫需要 imagePullSecret
# 3. 網路問題

# 確認映像檔
kubectl describe pod pod-name | grep "Image:"
kubectl describe pod pod-name | grep -A5 "Events:"

# 私有倉庫需要 Secret：
kubectl create secret docker-registry regcred \
  --docker-server=registry.example.com \
  --docker-username=user \
  --docker-password=pass

# Pod 中使用：
spec:
  imagePullSecrets:
  - name: regcred</code></pre>

<h2 id="deployment-debug">5. Deployment 故障排除</h2>

<pre><code class="language-text"># Deployment 更新卡住
kubectl rollout status deployment/my-app
# 等待中...

# 檢查 ReplicaSet
kubectl get replicaset
kubectl describe replicaset RS_NAME

# 回滾到上一個版本
kubectl rollout undo deployment/my-app

# 檢查更新歷史
kubectl rollout history deployment/my-app</code></pre>

<h2 id="cheatsheet">6. 速查表</h2>

<table>
<thead><tr><th>問題</th><th>關鍵指令</th></tr></thead>
<tbody>
<tr><td>Pod 為何 Pending</td><td><code>kubectl describe pod → Events</code></td></tr>
<tr><td>容器為何崩潰</td><td><code>kubectl logs pod --previous</code></td></tr>
<tr><td>OOMKilled</td><td><code>kubectl describe pod → Last State</code></td></tr>
<tr><td>映像檔拉取失敗</td><td>確認映像檔名稱 + imagePullSecret</td></tr>
<tr><td>Deployment 更新卡住</td><td><code>kubectl rollout undo deploy/NAME</code></td></tr>
</tbody>
</table>

<h2 id="practice">7. 練習題</h2>

<p><strong>Q1：</strong>Pod 狀態是 CrashLoopBackOff，kubectl logs pod-name 顯示為空。下一步應該做什麼？</p>
<ul>
<li>A) 刪除 Pod</li>
<li>B) 使用 kubectl logs pod-name --previous 查看前一次執行的日誌 ✓</li>
<li>C) 增加 CPU 資源</li>
<li>D) 重新啟動節點</li>
</ul>
<p><em>解析：--previous 顯示前一次容器實例的日誌。CrashLoopBackOff 表示容器不斷重啟，當前日誌可能為空是因為容器剛重啟。前一次的日誌通常包含錯誤訊息。</em></p>

<p><strong>Q2：</strong>kubectl describe pod 的 Events 顯示 "0/3 nodes are available: 3 Insufficient cpu"。Pod 狀態是什麼？如何解決？</p>
<ul>
<li>A) CrashLoopBackOff — 增加記憶體</li>
<li>B) Pending — 叢集沒有足夠的 CPU 資源，需新增節點或減少 Pod 的 CPU request ✓</li>
<li>C) ImagePullBackOff — 修正映像檔名稱</li>
<li>D) Error — 重新部署應用程式</li>
</ul>
<p><em>解析：資源不足的排程錯誤會導致 Pod 維持 Pending。解決方式：增加節點以提供更多 CPU 資源，或降低 Pod 的 resources.requests.cpu。使用 kubectl top nodes 確認節點資源使用量。</em></p>

<p><strong>Q3：</strong>Pod 的 Last State 顯示 "Reason: OOMKilled"。表示什麼？</p>
<ul>
<li>A) CPU 使用超過限制</li>
<li>B) 記憶體使用超過 limits.memory，容器被 OOM Killer 終止 ✓</li>
<li>C) 磁碟空間不足</li>
<li>D) 網路連線逾時</li>
</ul>
<p><em>解析：OOMKilled（Out of Memory Killed）表示容器的記憶體使用量超過 spec.containers[].resources.limits.memory。解決方式：增加 memory limits 或修復應用程式的記憶體洩漏。</em></p>
