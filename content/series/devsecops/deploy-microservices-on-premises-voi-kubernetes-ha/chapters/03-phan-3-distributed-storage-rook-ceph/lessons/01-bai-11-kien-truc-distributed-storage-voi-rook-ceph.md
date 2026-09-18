---
id: 019e1a00-aa01-7001-c001-k8sha000301
title: 'BÀI 11: KIẾN TRÚC DISTRIBUTED STORAGE VỚI ROOK-CEPH'
slug: bai-11-kien-truc-distributed-storage-voi-rook-ceph
description: >-
  Tổng quan Ceph architecture (RADOS, OSD, MON, MDS, MGR),
  tại sao chọn Rook-Ceph cho K8s, so sánh storage solutions,
  planning capacity và network cho Ceph cluster.
duration_minutes: 120
is_free: true
video_url: null
featured_image: uploads/2026/04/k8s-ha-bai11-rook-ceph-architecture.png
sort_order: 11
section_title: 'Phần 3: Distributed Storage — Rook-Ceph'
course:
  id: 019e1a00-aa01-7001-c001-k8sha000001
  title: 'Deploy Microservices On-Premises với Kubernetes HA'
  slug: deploy-microservices-on-premises-voi-kubernetes-ha
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-7557" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a1628"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-7557)"/>

  <!-- Decorations -->
  <g>
    <circle cx="788" cy="234" r="26" fill="#fbbf24" opacity="0.09"/>
    <circle cx="976" cy="42" r="20" fill="#fbbf24" opacity="0.13"/>
    <circle cx="664" cy="110" r="14" fill="#fbbf24" opacity="0.07"/>
    <circle cx="852" cy="178" r="8" fill="#fbbf24" opacity="0.11"/>
    <circle cx="1040" cy="246" r="32" fill="#fbbf24" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <line x1="600" y1="74" x2="1100" y2="154" stroke="#fbbf24" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="104" x2="1050" y2="174" stroke="#fbbf24" stroke-width="0.5" opacity="0.08"/>
    <polygon points="949.1147367097487,109.5 949.1147367097487,138.5 924,153 898.8852632902513,138.5 898.8852632902513,109.50000000000001 924,95" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fbbf24"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fbbf24" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🔒 DevSecOps — Bài 11</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">BÀI 11: KIẾN TRÚC DISTRIBUTED STORAGE VỚI</tspan>
      <tspan x="60" dy="42">ROOK-CEPH</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Deploy Microservices On-Premises với Kubernetes HA</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 3: Distributed Storage — Rook-Ceph</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

<h2 id="muc-tieu-bai-hoc">🎯 MỤC TIÊU BÀI HỌC</h2>
<p>Sau khi hoàn thành bài học này, bạn sẽ:</p>
<ul>
<li>✅ Hiểu kiến trúc Ceph: RADOS, OSD, MON, MDS, MGR</li>
<li>✅ Hiểu CRUSH algorithm và data placement</li>
<li>✅ So sánh Rook-Ceph vs Longhorn vs OpenEBS vs local-path</li>
<li>✅ Planning hardware và network cho Ceph cluster</li>
<li>✅ Hiểu 3 loại storage: Block (RBD), Filesystem (CephFS), Object (RGW)</li>
</ul>

<hr>

<h2 id="phan-1-ceph-architecture">PHẦN 1: CEPH ARCHITECTURE OVERVIEW</h2>

<h3 id="11-cac-thanh-phan-ceph">1.1. Các thành phần Ceph</h3>

```mermaid
graph TB
    subgraph CLIENT["🖥️ CLIENT ACCESS"]
        RBD["💿 RBD<br/>Block Storage"]
        CephFS["📁 CephFS<br/>Filesystem"]
        RGW["🌐 RADOS Gateway<br/>Object / S3-compat"]
    end

    subgraph LIB["📚 LIBRADOS API"]
        librados["Unified Storage API"]
    end

    subgraph RADOS["⚙️ RADOS LAYER"]
        MON["🔍 MON<br/>Monitor<br/>3 nodes"]
        MGR["📊 MGR<br/>Manager<br/>2 nodes"]
        MDS["📂 MDS<br/>Metadata Server<br/>CephFS only"]
        OSD["💾 OSD<br/>Object Storage<br/>Daemon"]
    end

    subgraph CRUSH["🗺️ CRUSH MAP"]
        crush_algo["Data placement algorithm — no lookup table!"]
    end

    RBD --> librados
    CephFS --> librados
    RGW --> librados
    librados --> MON
    librados --> MGR
    librados --> MDS
    librados --> OSD
    OSD --> crush_algo

    style CLIENT fill:#0f172a,stroke:#3b82f6,color:#e2e8f0
    style LIB fill:#1e3a5f,stroke:#60a5fa,color:#e2e8f0
    style RADOS fill:#1e293b,stroke:#3b82f6,color:#e2e8f0
    style CRUSH fill:#7c3aed,stroke:#a78bfa,color:#e2e8f0
```

<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Component</th>
<th>Vai trò</th>
<th>Min HA</th>
</tr>
</thead>
<tbody>
<tr>
<td>MON (Monitor)</td>
<td>Cluster map, quorum, authentication</td>
<td>3 (odd number)</td>
</tr>
<tr>
<td>MGR (Manager)</td>
<td>Metrics, dashboard, orchestration</td>
<td>2 (active-standby)</td>
</tr>
<tr>
<td>OSD (Object Storage Daemon)</td>
<td>Lưu trữ data thực tế, replication</td>
<td>3+ (1 per disk)</td>
</tr>
<tr>
<td>MDS (Metadata Server)</td>
<td>Metadata cho CephFS (chỉ cần khi dùng CephFS)</td>
<td>2 (active-standby)</td>
</tr>
<tr>
<td>RGW (RADOS Gateway)</td>
<td>S3/Swift API cho object storage</td>
<td>2+ (behind LB)</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->

<h3 id="12-crush-algorithm">1.2. CRUSH Algorithm</h3>

```mermaid
graph TD
    subgraph STEP1["1️⃣ Object → Pool → PG"]
        OBJ["📄 photo.jpg"] -->|"hash() mod num_PGs"| PG["PG 3.1a"]
    end

    subgraph STEP2["2️⃣ CRUSH Map quyết định OSD set"]
        PG2["PG 3.1a"] -->|"CRUSH()"| OSDSET["OSD Set"]
    end

    subgraph STEP3["3️⃣ Replicate tới 3 OSDs"]
        OSD5["💾 osd.5<br/>PRIMARY<br/>worker1"]
        OSD12["💾 osd.12<br/>REPLICA<br/>worker2"]
        OSD8["💾 osd.8<br/>REPLICA<br/>worker3"]
    end

    PG --> PG2
    OSDSET --> OSD5
    OSDSET --> OSD12
    OSDSET --> OSD8

    style STEP1 fill:#0f172a,stroke:#3b82f6,color:#e2e8f0
    style STEP2 fill:#1e3a5f,stroke:#60a5fa,color:#e2e8f0
    style STEP3 fill:#15803d,stroke:#4ade80,color:#e2e8f0
    style OSD5 fill:#15803d,stroke:#22c55e,color:#e2e8f0
    style OSD12 fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style OSD8 fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
```

> ✅ Không cần lookup table → Scale tới exabytes
> ✅ Failure domain aware (rack, host, datacenter)
> ✅ Client tính toán trực tiếp vị trí data

<hr>

<h2 id="phan-2-rook-la-gi">PHẦN 2: ROOK — CEPH OPERATOR CHO KUBERNETES</h2>

<h3 id="21-rook-architecture">2.1. Rook Architecture</h3>

```mermaid
graph TB
    subgraph K8S["☸ Kubernetes Cluster"]
        subgraph OPERATOR["🔧 Rook Operator"]
            op["Deployment<br/>• Watches CephCluster CRD<br/>• Manages Ceph daemons as K8s pods<br/>• Auto-healing, scaling"]
        end

        subgraph DAEMONS["Ceph Daemons as Pods"]
            MON["🔍 ceph-mon<br/>3 replicas"]
            MGR["📊 ceph-mgr<br/>2 replicas<br/>+ Dashboard"]
            OSD["💾 ceph-osd<br/>1 per disk"]
        end

        subgraph CRDS["📋 Custom Resource Definitions"]
            CR1["CephCluster"]
            CR2["CephBlockPool"]
            CR3["CephFilesystem"]
            CR4["CephObjectStore"]
        end
    end

    op -->|manages| MON
    op -->|manages| MGR
    op -->|manages| OSD
    op -->|watches| CR1
    CR2 -.-> OSD
    CR3 -.-> OSD
    CR4 -.-> OSD

    style K8S fill:#0f172a,stroke:#3b82f6,color:#e2e8f0
    style OPERATOR fill:#7c3aed,stroke:#a78bfa,color:#e2e8f0
    style DAEMONS fill:#1e3a5f,stroke:#60a5fa,color:#e2e8f0
    style CRDS fill:#1e293b,stroke:#475569,color:#e2e8f0
```

<h3 id="22-so-sanh-storage">2.2. So sánh Storage Solutions</h3>

<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Tiêu chí</th>
<th>Rook-Ceph</th>
<th>Longhorn</th>
<th>OpenEBS</th>
<th>local-path</th>
</tr>
</thead>
<tbody>
<tr>
<td>Block storage</td>
<td>✅ RBD</td>
<td>✅</td>
<td>✅</td>
<td>❌</td>
</tr>
<tr>
<td>Filesystem (RWX)</td>
<td>✅ CephFS</td>
<td>❌ (NFS hack)</td>
<td>❌</td>
<td>❌</td>
</tr>
<tr>
<td>Object (S3)</td>
<td>✅ RGW</td>
<td>❌</td>
<td>❌</td>
<td>❌</td>
</tr>
<tr>
<td>Replication</td>
<td>3-way</td>
<td>3-way</td>
<td>3-way</td>
<td>❌</td>
</tr>
<tr>
<td>Performance</td>
<td>Xuất sắc</td>
<td>Tốt</td>
<td>Tốt</td>
<td>Best (local)</td>
</tr>
<tr>
<td>Complexity</td>
<td>Cao</td>
<td>Thấp</td>
<td>Trung bình</td>
<td>Rất thấp</td>
</tr>
<tr>
<td>Min nodes</td>
<td>3</td>
<td>3</td>
<td>3</td>
<td>1</td>
</tr>
<tr>
<td>CNCF</td>
<td>Graduated</td>
<td>Incubating</td>
<td>Sandbox</td>
<td>-</td>
</tr>
<tr>
<td>Best for</td>
<td>Production</td>
<td>Small clusters</td>
<td>Dev/test</td>
<td>Single node</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->

<p>👉 <strong>Chọn Rook-Ceph</strong> cho production on-premises: unified storage (Block + FS + Object), proven at scale, CNCF Graduated.</p>

<hr>

<h2 id="phan-3-planning-ceph">PHẦN 3: PLANNING HARDWARE CHO CEPH</h2>

<h3 id="31-osd-node-sizing">3.1. OSD Node Sizing</h3>

```mermaid
graph LR
    subgraph OSD_REQ["💾 Per-OSD Requirements"]
        CPU["🔧 CPU: 1-2 cores"]
        RAM["🧠 RAM: 5GB bluestore"]
        NVME["⚡ NVMe: WAL + DB"]
        NET["🌐 Network: 10Gbps"]
    end

    subgraph EXAMPLE["📋 worker1: 4 data SSDs"]
        E1["4 OSDs × 5GB = 20GB RAM"]
        E2["4 OSDs × 2 cores = 8 CPU"]
        E3["+ workload riêng"]
    end

    OSD_REQ --> EXAMPLE

    style OSD_REQ fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style EXAMPLE fill:#0f172a,stroke:#f59e0b,color:#e2e8f0
```

<h3 id="32-capacity-planning">3.2. Capacity Planning</h3>
<pre><code class="language-bash"># Ceph usable capacity formula:
# Usable = Raw Capacity × (1 / Replication Factor) × Pool Utilization Target

# Ví dụ:
# 3 workers × 4 SSDs × 500GB = 6,000 GB Raw
# Replication Factor = 3 (data replicate 3 bản)
# Usable = 6,000 / 3 = 2,000 GB
# ⚠️ Ceph khuyến nghị KHÔNG vượt 85% → 2,000 × 0.85 = 1,700 GB usable

# Cho lab (mỗi worker 1 SSD 100GB):
# 3 × 100GB = 300GB Raw → 100GB usable → 85GB safe
</code></pre>

<h3 id="33-network-planning">3.3. Network Planning</h3>

```mermaid
graph LR
    subgraph NODE1["💻 OSD Node 1"]
        P1["🌐 Public Net<br/>10.10.20.x<br/>client I/O"]
        C1["🔄 Cluster Net<br/>10.10.30.x<br/>replication"]
    end

    subgraph NODE2["💻 OSD Node 2"]
        P2["🌐 Public Net<br/>10.10.20.x"]
        C2["🔄 Cluster Net<br/>10.10.30.x"]
    end

    subgraph NODE3["💻 OSD Node 3"]
        P3["🌐 Public Net<br/>10.10.20.x"]
        C3["🔄 Cluster Net<br/>10.10.30.x"]
    end

    P1 <-->|"Client I/O"| P2
    P2 <-->|"Client I/O"| P3
    C1 <-->|"Replication"| C2
    C2 <-->|"Replication"| C3

    style NODE1 fill:#0f172a,stroke:#3b82f6,color:#e2e8f0
    style NODE2 fill:#0f172a,stroke:#3b82f6,color:#e2e8f0
    style NODE3 fill:#0f172a,stroke:#3b82f6,color:#e2e8f0
    style P1 fill:#1e3a5f,stroke:#60a5fa,color:#e2e8f0
    style P2 fill:#1e3a5f,stroke:#60a5fa,color:#e2e8f0
    style P3 fill:#1e3a5f,stroke:#60a5fa,color:#e2e8f0
    style C1 fill:#7c3aed,stroke:#a78bfa,color:#e2e8f0
    style C2 fill:#7c3aed,stroke:#a78bfa,color:#e2e8f0
    style C3 fill:#7c3aed,stroke:#a78bfa,color:#e2e8f0
```

> ⚠️ Cluster network: 10Gbps minimum để recovery không impact client I/O

<hr>

<h2 id="phan-4-storage-types">PHẦN 4: 3 LOẠI STORAGE</h2>

<h3 id="41-block-rbd">4.1. Block Storage (RBD)</h3>

```mermaid
graph LR
    POD["🟢 Pod"] -->|mount| PVC["📋 PVC<br/>ReadWriteOnce"]
    PVC -->|provision| RBD["💿 Ceph RBD<br/>thin provisioned"]

    style POD fill:#15803d,stroke:#22c55e,color:#e2e8f0
    style PVC fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style RBD fill:#7c3aed,stroke:#a78bfa,color:#e2e8f0
```

> ✅ Database (PostgreSQL, MySQL) · ✅ Stateful applications · ✅ High IOPS
> ⚠️ ReadWriteOnce — chỉ 1 pod mount cùng lúc

<h3 id="42-filesystem-cephfs">4.2. Filesystem Storage (CephFS)</h3>

```mermaid
graph LR
    P1["🟢 Pod 1"] --> PVC["📋 PVC<br/>ReadWriteMany"]
    P2["🟢 Pod 2"] --> PVC
    P3["🟢 Pod 3"] --> PVC
    PVC -->|mount| CEPHFS["📁 CephFS<br/>POSIX filesystem"]

    style P1 fill:#15803d,stroke:#22c55e,color:#e2e8f0
    style P2 fill:#15803d,stroke:#22c55e,color:#e2e8f0
    style P3 fill:#15803d,stroke:#22c55e,color:#e2e8f0
    style PVC fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style CEPHFS fill:#7c3aed,stroke:#a78bfa,color:#e2e8f0
```

> ✅ Shared file storage (nhiều pods cùng đọc/ghi) · ✅ Content management · ✅ AI/ML training data

<h3 id="43-object-rgw">4.3. Object Storage (RGW)</h3>

```mermaid
graph LR
    APP["🟢 App"] -->|"PUT/GET/DELETE"| S3["🌐 S3 API<br/>s3://bucket/key"]
    S3 --> RGW["☁️ Ceph Object Store<br/>RADOS Gateway"]

    style APP fill:#15803d,stroke:#22c55e,color:#e2e8f0
    style S3 fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style RGW fill:#7c3aed,stroke:#a78bfa,color:#e2e8f0
```

> ✅ Backup storage · ✅ Log archives · ✅ Thay thế MinIO/AWS S3

<hr>

<h2 id="key-takeaways">💡 KEY TAKEAWAYS</h2>
<ol>
<li><strong>Ceph</strong> = unified storage: Block + Filesystem + Object trong 1 cluster</li>
<li><strong>CRUSH algorithm</strong>: tính toán vị trí data không cần lookup table → scale vô hạn</li>
<li><strong>Rook Operator</strong>: quản lý Ceph lifecycle trên K8s bằng CRDs</li>
<li><strong>5GB RAM per OSD</strong>: plan memory cẩn thận cho storage nodes</li>
<li><strong>2 networks</strong>: Public (client) + Cluster (replication) để tách traffic</li>
<li><strong>Replication 3x</strong>: Raw capacity / 3 = usable capacity</li>
</ol>

<hr>

<h2 id="bai-tap">🎯 BÀI TẬP</h2>

<h3 id="bt1">Bài tập 1: Capacity Planning</h3>
<ul>
<li>Tính usable capacity cho: 5 nodes × 6 SSDs × 1TB, replication=3</li>
<li>Tính RAM cần thiết cho Ceph (mỗi OSD 5GB)</li>
<li>Vẽ network topology cho Ceph cluster</li>
</ul>

<h3 id="bt2">Bài tập 2: Chuẩn bị disks</h3>
<ul>
<li>Xác định disk chưa sử dụng trên worker nodes: <code>lsblk</code></li>
<li>Verify disk không có partition: <code>wipefs -a /dev/sdX</code></li>
<li>Chuẩn bị sẵn disk cho Bài 12</li>
</ul>

<hr>

<h2 id="bai-tiep-theo">📚 BÀI TIẾP THEO</h2>
<p>Trong <strong>Bài 12: Cài đặt Rook-Ceph Operator và CephCluster</strong>, chúng ta sẽ deploy Rook Operator và tạo CephCluster trên K8s.</p>
