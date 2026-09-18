---
id: cka-d4-l08
title: '第8課：Persistent Volumes、PVCs & StorageClass'
slug: 08-persistent-volumes-storageclass
description: >-
  PV/PVC 生命週期、存取模式、回收政策。StorageClass 動態佈建。
  CKA 考試中的儲存問題。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 8
section_title: "領域4: Storage (10%)"
course:
  id: lt-cka-series-001
  title: 'CKA 認證備考 — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai8-storage.webp" alt="PersistentVolume、PVC 與 StorageClass 的關係" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="pv-pvc">1. PV / PVC 生命週期</h2>

<pre><code class="language-text">管理員建立 PV ──────► PVC 請求綁定 ──────► Pod 掛載 PVC
     │                     │                    │
   Available ──► Bound ──► Released / Reclaim
                                    │
                        Retain / Delete / Recycle</code></pre>

<pre><code class="language-text"># PersistentVolume（管理員建立）
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-data
spec:
  capacity:
    storage: 10Gi
  accessModes:
  - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  hostPath:
    path: /data/pv-data

---
# PersistentVolumeClaim（使用者建立）
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc-data
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi    # ≤ PV 的 10Gi → 可以綁定</code></pre>

<h2 id="access-modes">2. 存取模式</h2>

<table>
<thead><tr><th>模式</th><th>縮寫</th><th>說明</th></tr></thead>
<tbody>
<tr><td>ReadWriteOnce</td><td>RWO</td><td>只允許一個節點讀寫掛載</td></tr>
<tr><td>ReadOnlyMany</td><td>ROX</td><td>多個節點只讀掛載</td></tr>
<tr><td>ReadWriteMany</td><td>RWX</td><td>多個節點讀寫掛載</td></tr>
<tr><td>ReadWriteOncePod</td><td>RWOP</td><td>只允許一個 Pod 讀寫掛載（K8s 1.27+）</td></tr>
</tbody>
</table>

<h2 id="reclaim-policy">3. 回收政策</h2>

<table>
<thead><tr><th>政策</th><th>PVC 刪除後的行為</th></tr></thead>
<tbody>
<tr><td><strong>Retain</strong></td><td>PV 保留資料，狀態變為 Released（需手動清理）</td></tr>
<tr><td><strong>Delete</strong></td><td>PV 和底層儲存都被刪除</td></tr>
<tr><td><strong>Recycle</strong>（已棄用）</td><td>清除資料（rm -rf /volume/*）</td></tr>
</tbody>
</table>

<h2 id="storageclass">4. StorageClass — 動態佈建</h2>

<pre><code class="language-text"># StorageClass
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: kubernetes.io/gce-pd
parameters:
  type: pd-ssd
reclaimPolicy: Delete
volumeBindingMode: WaitForFirstConsumer  # 等到 Pod 排程後才建立 PV

---
# PVC 使用 StorageClass（不需要手動建立 PV）
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: dynamic-pvc
spec:
  storageClassName: fast-ssd    # 參照 StorageClass
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi</code></pre>

<blockquote><p><strong>考試重點：</strong>PVC 維持 Pending 的常見原因：(1) 沒有符合大小/存取模式的 PV、(2) StorageClass 設定錯誤或 provisioner 不存在、(3) volumeBindingMode: WaitForFirstConsumer 時還沒有 Pod 參照 PVC。</p></blockquote>

<h2 id="pod-mount">5. Pod 掛載 PVC</h2>

<pre><code class="language-text">apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  containers:
  - name: app
    image: nginx
    volumeMounts:
    - name: data
      mountPath: /usr/share/nginx/html
  volumes:
  - name: data
    persistentVolumeClaim:
      claimName: pvc-data</code></pre>

<h2 id="cheatsheet">6. 速查表</h2>

<table>
<thead><tr><th>任務</th><th>指令</th></tr></thead>
<tbody>
<tr><td>建立 PV</td><td><code>kubectl apply -f pv.yaml</code></td></tr>
<tr><td>建立 PVC</td><td><code>kubectl apply -f pvc.yaml</code></td></tr>
<tr><td>檢查 PV/PVC 狀態</td><td><code>kubectl get pv,pvc</code></td></tr>
<tr><td>查看 StorageClass</td><td><code>kubectl get storageclass</code></td></tr>
<tr><td>PVC 為何 Pending</td><td><code>kubectl describe pvc NAME</code>（看 Events）</td></tr>
</tbody>
</table>

<h2 id="practice">7. 練習題</h2>

<p><strong>Q1：</strong>PVC 建立後狀態一直是 Pending。可能的原因是？</p>
<ul>
<li>A) 沒有符合容量和存取模式的 PV ✓</li>
<li>B) Pod 還沒啟動</li>
<li>C) 該 PVC 的 Namespace 不正確</li>
<li>D) kubelet 還沒準備好</li>
</ul>
<p><em>解析：PVC 的 Pending 狀態通常表示沒有可綁定的 PV。檢查 PV 的 capacity 和 accessModes 是否與 PVC 的請求匹配。如果使用 StorageClass 且 provisioner 正常，PV 應該會自動建立。</em></p>

<p><strong>Q2：</strong>persistentVolumeReclaimPolicy: Retain 的 PV，PVC 被刪除後會發生什麼？</p>
<ul>
<li>A) PV 和資料都被刪除</li>
<li>B) PV 保留，狀態變為 Released，資料保留但無法被新 PVC 自動綁定 ✓</li>
<li>C) PV 回到 Available 狀態</li>
<li>D) PV 被回收並清空</li>
</ul>
<p><em>解析：Retain 政策保留 PV 和資料。但狀態是 Released，不能自動綁定新 PVC。管理員需要手動刪除 PV（保留底層儲存），或修改 PV 移除 claimRef 使其變回 Available。</em></p>

<p><strong>Q3：</strong>volumeBindingMode: WaitForFirstConsumer 有什麼效果？</p>
<ul>
<li>A) PVC 會立即綁定到 PV</li>
<li>B) 等到使用該 PVC 的 Pod 被排程後，才在 Pod 所在節點的可用區佈建 PV ✓</li>
<li>C) PVC 需要手動批准</li>
<li>D) 只有第一個使用者可以建立 PVC</li>
</ul>
<p><em>解析：WaitForFirstConsumer 延遲 PV 綁定，直到 Pod 被排程到特定節點。這確保 PV 在 Pod 所在的可用區建立，避免跨可用區的儲存問題。對於拓撲相關的 provisioner（如雲端磁碟）非常重要。</em></p>
