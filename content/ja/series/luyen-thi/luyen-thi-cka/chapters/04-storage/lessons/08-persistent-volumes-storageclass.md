---
id: cka-d4-l08
title: 'レッスン8: Persistent Volumes、PVCs & StorageClass'
slug: 08-persistent-volumes-storageclass
description: >-
  PersistentVolume、PersistentVolumeClaim、StorageClassのハンズオン。動的プロビジョニング、
  回収ポリシー、ボリュームモードとアクセスモード。CKA対策。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 8
section_title: "ドメイン4: Storage (10%)"
course:
  id: lt-cka-series-001
  title: 'CKA認定試験対策 — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai8-storage.webp" alt="Persistent Volumes、PVCsとStorageClass — 静的・動的プロビジョニング" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="pv-pvc">1. PV & PVCライフサイクル</h2>

<pre><code class="language-text">静的プロビジョニング:
  管理者がPVを作成 → 開発者がPVCを作成 → K8sがPVCをマッチするPVにバインド

動的プロビジョニング:
  開発者がPVC（storageClassName指定）を作成 → StorageClassが自動的にPVを作成

バインド条件:
  ✓ accessMode一致
  ✓ ストレージサイズ: PV >= PVC要求量
  ✓ storageClass一致（または""）
  ✓ volumeMode一致</code></pre>

<h2 id="create-pv">2. PVとPVCの作成</h2>

<pre><code class="language-text"># PersistentVolume（静的、ラボ用hostPath）
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-data
spec:
  capacity:
    storage: 5Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: manual
  hostPath:
    path: /mnt/data    # ラボ専用; 本番ではNFS/EBSを使用

---
# PersistentVolumeClaim
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc-data
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 2Gi
  storageClassName: manual</code></pre>

<table>
<thead><tr><th>回収ポリシー</th><th>PVC削除時の動作</th></tr></thead>
<tbody>
<tr><td><strong>Retain</strong></td><td>PVはデータを保持、フェーズ = Released（管理者が手動削除が必要）</td></tr>
<tr><td><strong>Delete</strong></td><td>PVとストレージバックエンドが自動的に削除</td></tr>
<tr><td><strong>Recycle</strong>（非推奨）</td><td>ファイルを削除、PVは新しいPVCに再利用可能</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のポイント：</strong>PVフェーズのライフサイクル：<strong>Available</strong>（PVCなし）→ <strong>Bound</strong>（PVCバインド済み）→ <strong>Released</strong>（PVC削除、Retainポリシー）→ <strong>Failed</strong>。ReleasedのPVは管理者が<code>.spec.claimRef</code>を手動削除するまで新しいPVCにバインドできません。</p></blockquote>

<h2 id="storageclass">3. StorageClass</h2>

<pre><code class="language-text">apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast
  annotations:
    storageclass.kubernetes.io/is-default-class: "true"  # デフォルトSC
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp3
  iopsPerGB: "10"
reclaimPolicy: Delete
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer  # Podスケジュール時まで遅延</code></pre>

<table>
<thead><tr><th>volumeBindingMode</th><th>動作</th></tr></thead>
<tbody>
<tr><td><strong>Immediate</strong></td><td>PVC作成時にPVが即座にプロビジョニング</td></tr>
<tr><td><strong>WaitForFirstConsumer</strong></td><td>Podがスケジュールされるまで遅延（同じゾーンを確保）</td></tr>
</tbody>
</table>

<h2 id="pod-with-pvc">4. PVCを使用するPod</h2>

<pre><code class="language-text">apiVersion: v1
kind: Pod
metadata:
  name: app-pod
spec:
  containers:
  - name: app
    image: nginx
    volumeMounts:
    - name: data-volume
      mountPath: /var/data
  volumes:
  - name: data-volume
    persistentVolumeClaim:
      claimName: pvc-data    # PVC名を参照</code></pre>

<h2 id="cheatsheet">5. チートシート</h2>

<table>
<thead><tr><th>タスク</th><th>コマンド</th></tr></thead>
<tbody>
<tr><td>PV一覧</td><td><code>kubectl get pv</code></td></tr>
<tr><td>PVC一覧</td><td><code>kubectl get pvc -n NAMESPACE</code></td></tr>
<tr><td>PVC状態</td><td><code>kubectl describe pvc NAME</code></td></tr>
<tr><td>StorageClass一覧</td><td><code>kubectl get storageclass</code></td></tr>
<tr><td>PVC拡張</td><td>PVCのspec.resources.requests.storageを編集（SCが許可している場合）</td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習問題</h2>

<p><strong>Q1：</strong>PVCが「Pending」状態のままです。10GiのPVが存在します。PVCは5GiのReadWriteManyを要求していますが、PVはReadWriteOnceのみサポートしています。何が起きますか？</p>
<ul>
<li>A) PVCはPVにバインドされ、RWOを使用する</li>
<li>B) PVCはPendingのまま — 要求されたアクセスモードに一致するPVがない ✓</li>
<li>C) KubernetesがPVのアクセスモードを自動変換する</li>
<li>D) PVCを使用するPodは起動するが書き込みできない</li>
</ul>
<p><em>解説：PVCバインドには全条件の一致が必要: ストレージサイズ（PV >= PVC）、アクセスモード、storageClass、volumeMode。PVがRWOのみでPVCがRWXを要求している場合、バインドされません。</em></p>

<p><strong>Q2：</strong>PVにバインドされているPVCが削除されました。PVのreclaimPolicy: Retainです。PVの状態はどうなりますか？</p>
<ul>
<li>A) PVが削除される</li>
<li>B) PVはAvailableに遷移し、再利用可能になる</li>
<li>C) PVはReleasedに遷移 — データは保持されるが自動的に再バインドできない ✓</li>
<li>D) PVはすぐに別のPVCにプロビジョニングされる</li>
</ul>
<p><em>解説：Retainポリシーはpvとデータを保持します。PVはReleased状態になります。再利用するには、管理者が古いclaimRefを手動で削除します（kubectl patch pv myPV -p '{"spec":{"claimRef":null}}'）。</em></p>

<p><strong>Q3：</strong>クラウド環境では、WaitForFirstConsumerのvolumeBindingModeがImmediateより推奨される理由は？</p>
<ul>
<li>A) ストレージコストを削減するため</li>
<li>B) ボリュームがスケジュールされたPodと同じアベイラビリティゾーンでプロビジョニングされることを保証するため ✓</li>
<li>C) 複数のPodがボリュームを共有できるようにするため</li>
<li>D) Pod起動時間を短縮するため</li>
</ul>
<p><em>解説：Immediateの場合、PVがzone-aにプロビジョニングされる一方、Podがzone-bにスケジュールされる可能性があります（EBSボリュームはゾーン固有）。WaitForFirstConsumerは、スケジューラがPodのノード/ゾーンを決定するまでプロビジョニングを遅延させます。</em></p>
