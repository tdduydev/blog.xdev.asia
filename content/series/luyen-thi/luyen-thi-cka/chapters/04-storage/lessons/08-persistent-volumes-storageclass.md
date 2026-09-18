---
id: cka-d4-l08
title: 'Bài 8: Persistent Volumes, PVCs & StorageClass'
slug: 08-persistent-volumes-storageclass
description: >-
  PersistentVolume, PersistentVolumeClaim, StorageClass hands-on. Dynamic
  provisioning, reclaim policies, volume modes và access modes cho CKA.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 8
section_title: "Domain 4: Storage (10%)"
course:
  id: lt-cka-series-001
  title: 'Luyện thi CKA — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai8-storage.webp" alt="Persistent Volumes, PVCs và StorageClass — Static và Dynamic Provisioning" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="pv-pvc">1. PV & PVC Lifecycle</h2>

<pre><code class="language-text">Static Provisioning:
  Admin creates PV → Developer creates PVC → K8s binds PVC to matching PV

Dynamic Provisioning:
  Developer creates PVC (with storageClassName) → StorageClass auto-creates PV

Binding criteria:
  ✓ accessMode match
  ✓ storage size: PV >= PVC requested
  ✓ storageClass match (or "")
  ✓ volumeMode match</code></pre>

<h2 id="create-pv">2. Tạo PV và PVC</h2>

<pre><code class="language-text"># PersistentVolume (static, hostPath cho lab)
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
    path: /mnt/data    # Lab only; use NFS/EBS in production

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
<thead><tr><th>Reclaim Policy</th><th>Hành vi khi PVC deleted</th></tr></thead>
<tbody>
<tr><td><strong>Retain</strong></td><td>PV giữ data, phase = Released (admin phải xóa thủ công)</td></tr>
<tr><td><strong>Delete</strong></td><td>PV và storage backend bị xóa tự động</td></tr>
<tr><td><strong>Recycle</strong> (deprecated)</td><td>Xóa files, PV sẵn sàng cho PVC mới</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> PV phase lifecycle: <strong>Available</strong> (không có PVC) → <strong>Bound</strong> (PVC bound) → <strong>Released</strong> (PVC deleted, Retain policy) → <strong>Failed</strong>. PV Released không thể bind PVC mới cho đến khi admin manually edit PV để remove <code>.spec.claimRef</code>.</p></blockquote>

<h2 id="storageclass">3. StorageClass</h2>

<pre><code class="language-text">apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast
  annotations:
    storageclass.kubernetes.io/is-default-class: "true"  # Default SC
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp3
  iopsPerGB: "10"
reclaimPolicy: Delete
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer  # Delay until Pod scheduled</code></pre>

<table>
<thead><tr><th>volumeBindingMode</th><th>Behavior</th></tr></thead>
<tbody>
<tr><td><strong>Immediate</strong></td><td>PV provisioned immediately khi PVC tạo</td></tr>
<tr><td><strong>WaitForFirstConsumer</strong></td><td>Delay until Pod scheduled (ensures same zone)</td></tr>
</tbody>
</table>

<h2 id="pod-with-pvc">4. Pod dùng PVC</h2>

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
      claimName: pvc-data    # Reference PVC name</code></pre>

<h2 id="cheatsheet">5. Cheat Sheet</h2>

<table>
<thead><tr><th>Task</th><th>Command</th></tr></thead>
<tbody>
<tr><td>List PVs</td><td><code>kubectl get pv</code></td></tr>
<tr><td>List PVCs</td><td><code>kubectl get pvc -n NAMESPACE</code></td></tr>
<tr><td>PVC status</td><td><code>kubectl describe pvc NAME</code></td></tr>
<tr><td>List StorageClasses</td><td><code>kubectl get storageclass</code></td></tr>
<tr><td>Expand PVC</td><td>Edit PVC spec.resources.requests.storage (SC must allow)</td></tr>
</tbody>
</table>

<h2 id="practice">6. Practice Questions</h2>

<p><strong>Q1:</strong> A PVC is stuck in "Pending" state. A PV with 10Gi exists. The PVC requests 5Gi with ReadWriteMany, but the PV only supports ReadWriteOnce. What happens?</p>
<ul>
<li>A) The PVC binds to the PV and uses RWO</li>
<li>B) The PVC remains Pending — no PV matches the requested access mode ✓</li>
<li>C) Kubernetes auto-converts the PV access mode</li>
<li>D) The Pod using the PVC starts but cannot write</li>
</ul>
<p><em>Explanation: PVC binding requires all criteria to match: storage size (PV >= PVC), access mode, storageClass, and volumeMode. If the PV only supports RWO but PVC needs RWX, they won't bind.</em></p>

<p><strong>Q2:</strong> A PVC bound to a PV is deleted. The PV has reclaimPolicy: Retain. What is the PV's state?</p>
<ul>
<li>A) The PV is deleted</li>
<li>B) The PV transitions to Available and can be reused</li>
<li>C) The PV transitions to Released — data is preserved but PV can't be rebound automatically ✓</li>
<li>D) The PV is immediately provisioned for another PVC</li>
</ul>
<p><em>Explanation: Retain policy preserves the PV and its data. The PV enters Released state. To reuse it, an admin must manually delete the old claimRef (kubectl patch pv myPV -p '{"spec":{"claimRef":null}}') to return it to Available.</em></p>

<p><strong>Q3:</strong> In a cloud environment, WaitForFirstConsumer volumeBindingMode is recommended over Immediate. Why?</p>
<ul>
<li>A) It reduces storage costs</li>
<li>B) It ensures the volume is provisioned in the same availability zone as the scheduled Pod ✓</li>
<li>C) It allows multiple Pods to share the volume</li>
<li>D) It speeds up Pod startup time</li>
</ul>
<p><em>Explanation: With Immediate, the PV might be provisioned in zone-a while the Pod schedules to zone-b (EBS volumes are zone-specific). WaitForFirstConsumer delays provisioning until the scheduler determines which node/zone will host the Pod.</em></p>
