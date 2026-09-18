---
id: 019e1a00-aa01-7001-c001-k8sha000401
title: 'LESSON 16: POSTGRESQL HA ARCHITECTURE WITH PATRONI AND CLOUDNATIVEPG'
slug: bai-16-kien-truc-postgresql-ha-voi-patroni-va-cloudnativepg
description: Compare Patroni vs CloudNativePG for PostgreSQL HA on K8s, streaming replication architecture, synchronous vs asynchronous, failover mechanisms and connection pooling.
duration_minutes: 120
is_free: true
video_url: null
featured_image: uploads/2026/04/k8s-ha-bai16-postgresql-ha-patroni.png
sort_order: 16
section_title: 'Part 4: PostgreSQL HA with Patroni & CloudNativePG'
course:
  id: 019e1a00-aa01-7001-c001-k8sha000001
  title: Deploy Microservices On-Premises with Kubernetes HA
  slug: deploy-microservices-on-premises-voi-kubernetes-ha
locale: en
---
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-4480" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a1628"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-4480)"/>

  <!-- Decorations -->
  <g>
    <circle cx="685" cy="205" r="28" fill="#fb923c" opacity="0.1"/>
    <circle cx="770" cy="90" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="855" cy="235" r="18" fill="#fb923c" opacity="0.1"/>
    <circle cx="940" cy="120" r="13" fill="#fb923c" opacity="0.05"/>
    <circle cx="1025" cy="265" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <line x1="600" y1="55" x2="1100" y2="135" stroke="#fb923c" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="85" x2="1050" y2="155" stroke="#fb923c" stroke-width="0.5" opacity="0.08"/>
    <polygon points="980.9807621135332,140 980.9807621135332,170 955,185 929.0192378864668,170 929.0192378864668,140 955,125" fill="none" stroke="#fb923c" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fb923c"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fb923c" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🔒 DevSecOps — Lesson 16</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">LESSON 16: POSTGRESQL HA ARCHITECTURE WITH</tspan>
      <tspan x="60" dy="42">PATRONI AND CLOUDNATIVEPG</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Deploy Microservices On-Premises with Kubernetes HA</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 4: PostgreSQL HA with Patroni &amp; CloudNativePG</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

<h2 id="muc-tieu-bai-hoc">🎯 LESSON OBJECTIVE__HTMLTAG_68___
<p>After completing this lesson, you will:</p>
<ul>
<li>✅ Understanding PostgreSQL streaming replication</li>
<li>✅ Compare Patroni vs CloudNativePG vs PGO (CrunchyData)</li>
<li>✅ Understanding synchronous vs asynchronous replication__HTMLTAG_77___
<li>✅ HA architecture: primary-standby, failover, fencing</li>
<li>✅ Connection pooling with PgBouncer</li>
</ul>

<hr>

<h2 id="phan-1-postgresql-replication">PART 1: POSTGRESQL REPLICATION</h2>

<h3 id="11-streaming-replication">1.1. Streaming Replication</h3>

```mermaid
graph TD
    APP["🖥️ APPLICATION"] --> PGB["🔀 PgBouncer<br/>port 6432<br/>Connection Pool"]
    
    PGB -->|"write (rw)"| PRI["🟢 PRIMARY<br/>read/write<br/>pg1"]
    PGB -->|"read (ro)"| STB1["🔵 STANDBY<br/>read-only<br/>pg2"]
    PGB -->|"read (ro)"| STB2["🔵 STANDBY<br/>read-only<br/>pg3"]
    
    PRI -->|"WAL streaming"| STB1
    PRI -->|"WAL streaming"| STB2

    style APP fill:#0f172a,stroke:#3b82f6,color:#e2e8f0
    style PGB fill:#7c3aed,stroke:#a78bfa,color:#e2e8f0
    style PRI fill:#15803d,stroke:#22c55e,color:#e2e8f0
    style STB1 fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style STB2 fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
```

> ✅ Primary: receive writes, stream WAL to standbys
> ✅ Standby: replay WAL, serve read queries
> ✅ Failover: promote standby to primary

<h3 id="12-sync-vs-async">1.2. Synchronous vs Asynchronous</h3><!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Mode</th>
<th>Synchronous</th>
<th>Asynchronous</th>
</tr>
</thead>
<tbody>
<tr>
<td>Data safety</td>
<td>Zero data loss (RPO=0)</td>
<td>Potential data loss</td>
</tr>
<tr>
<td>Write latency</td>
<td>Higher (wait for standby ACK)</td>
<td>Lower (don't wait)</td>
</tr>
<tr>
<td>Throughput</td>
<td>Lower</td>
<td>Higher</td>
</tr>
<tr>
<td>Network dependency</td>
<td>Strong (latency affects writes)</td>
<td>Weak</td>
</tr>
<tr>
<td>Best for</td>
<td>Financial, critical data</td>
<td>Most applications</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->

<hr>

<h2 id="phan-2-so-sanh-operators">PART 2: COMPARE POSTGRESQL OPERATORS</h2><!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Criteria</th>
<th>CloudNativePG</th>
<th>Patroni (Zalando)</th>
<th>PGO (CrunchyData)</th>
</tr>
</thead>
<tbody>
<tr>
<td>Architecture</td>
<td>K8s-native operator__HTMLTAG_168___
<td>Sidecar + DCS</td>
<td>K8s operator</td>
</tr>
<tr>
<td>Failover</td>
<td>K8s controller</td>
<td>Raft-like via DCS</td>
<td>K8s controller</td>
</tr>
<tr>
<td>DCS dependency</td>
<td>❌ No need (using K8s)</td>
<td>✅ Need etcd/Consul/K8s</td>
<td>❌ No need</td>
</tr>
<tr>
<td>Backup</td>
<td>Barman (S3/local)</td>
<td>WAL-G, pgBackRest</td>
<td>pgBackRest</td>
</tr>
<tr>
<td>Connection pooling__HTMLTAG_206___
<td>PgBouncer built-in</td>
<td>Need separate setup</td>
<td>PgBouncer built-in</td>
</tr>
<tr>
<td>CNCF</td>
<td>Sandbox</td>
<td>Community</td>
<td>Community</td>
</tr>
<tr>
<td>License</td>
<td>Apache 2.0</td>
<td>MIT</td>
<td>Apache 2.0</td>
</tr>
<tr>
<td>Complexity</td>
<td>Low</td>
<td>Average</td>
<td>Average</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->

<p>👉 <strong>Choose CloudNativePG</strong>: K8s-native, no need for external DCS, CNCF project, integrated backup, simpler than Patroni on K8s.</p>

<hr>

<h2 id="phan-3-cloudnativepg-architecture">PART 3: CLOUDNATIVEPG ARCHITECTURE</h2>

```mermaid
graph TB
    subgraph K8S["☸ Kubernetes Cluster"]
        CNPG["🔧 CloudNativePG Operator<br/>Watches Cluster CRD<br/>Handles failover, backup, recovery"]

        subgraph CLUSTER["📦 Cluster CRD: production-pg"]
            PG1["🟢 Pod pg-1<br/>PRIMARY<br/>rw svc<br/>PVC 50Gi ceph-blk"]
            PG2["🔵 Pod pg-2<br/>STANDBY<br/>ro svc<br/>PVC 50Gi ceph-blk"]
            PG3["🔵 Pod pg-3<br/>STANDBY<br/>ro svc<br/>PVC 50Gi ceph-blk"]
        end

        subgraph SVC["🌐 Services"]
            RW["production-pg-rw → Primary"]
            RO["production-pg-ro → Standbys"]
            R["production-pg-r → Any instance"]
        end

        subgraph BACKUP["💾 Backup"]
            BK["ScheduledBackup CRD<br/>→ Barman → S3/Ceph"]
        end
    end

    CNPG -->|manages| CLUSTER
    RW --> PG1
    RO --> PG2
    RO --> PG3
    PG1 -.->|WAL| PG2
    PG1 -.->|WAL| PG3

    style K8S fill:#0f172a,stroke:#3b82f6,color:#e2e8f0
    style CNPG fill:#7c3aed,stroke:#a78bfa,color:#e2e8f0
    style CLUSTER fill:#1e293b,stroke:#3b82f6,color:#e2e8f0
    style SVC fill:#1e3a5f,stroke:#60a5fa,color:#e2e8f0
    style BACKUP fill:#15803d,stroke:#22c55e,color:#e2e8f0
    style PG1 fill:#15803d,stroke:#22c55e,color:#e2e8f0
    style PG2 fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style PG3 fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
```

<h3 id="31-failover-flow">3.1. Failover Flow</h3>

```mermaid
sequenceDiagram
    participant PG1 as pg-1 (PRIMARY)
    participant OP as CloudNativePG Operator
    participant PG2 as pg-2 (STANDBY)
    participant PG3 as pg-3 (STANDBY)
    participant SVC as Service rw

    PG1->>PG1: ❌ CRASH!
    OP->>OP: Health check fails
    OP->>OP: Select standby with<br/>highest LSN
    OP->>PG2: 🔼 PROMOTE to PRIMARY
    PG2->>PG2: pg_promote()
    OP->>PG3: Repoint replication → pg-2
    PG3->>PG2: WAL streaming resumed
    OP->>SVC: Update endpoint → pg-2
    Note over PG1,SVC: ⚡ Failover: 5-30 giây
    PG1->>PG1: Restart
    PG1->>PG2: Join as STANDBY
```

<hr>

<h2 id="phan-4-pgbouncer">PART 4: CONNECTION POOLING — PGBOUNCER</h2>

<pre><code>
Tại sao cần PgBouncer?

Không có PgBouncer:
App (1000 connections) → PostgreSQL (1000 processes!)
→ Memory: 1000 × 10MB = 10GB
→ Context switching overhead
→ Performance drop

Có PgBouncer:
App (1000 connections) → PgBouncer (pool 50 connections) → PostgreSQL (50 processes)
→ Memory: 50 × 10MB = 500MB
→ 20× ít processes
→ Better performance

PgBouncer modes:
- session:      1:1 mapping (least pooling)
- transaction:  Release after each transaction (recommended)
- statement:    Release after each statement (most aggressive)
</code></pre>

<hr>

<h2 id="phan-5-storage-considerations">PART 5: STORAGE CONSIDERATIONS</h2>

<pre><code class="language-bash"># PostgreSQL trên Ceph RBD:
# ✅ PVC (ceph-block) cho data directory
# ✅ Separate PVC cho WAL (optional, higher IOPS)
# ⚠️ ext4 filesystem (CloudNativePG default)
# ⚠️ fsync = on (DO NOT disable!)

# PostgreSQL storage parameters:
# - shared_buffers: 25% RAM
# - effective_cache_size: 75% RAM
# - wal_buffers: 64MB
# - checkpoint_completion_target: 0.9
# - random_page_cost: 1.1 (SSD)
# - effective_io_concurrency: 200 (SSD)
</code></pre>

<hr><h2 id="key-takeaways">💡 KEY TAKEAWAYS</h2>
<ol>
<li><strong>CloudNativePG</strong>: K8s-native, no need for etcd/Consul, automatic failover</li>
<li><strong>Streaming replication</strong>: Primary → Standby via WAL streaming</li>
<li><strong>Synchronous</strong> for zero data loss, <strong>asynchronous</strong> for throughput</li>
<li><strong>PgBouncer</strong>: Connection pooling reduced by 20× database processes</li>
<li><strong>Ceph RBD</strong> (ReadWriteOnce) suitable for database PV</li>
<li><strong>3 services</strong>: rw (primary), ro (standbys), r (any instance)</li>
</ol>

<hr>

<h2 id="bai-tap">🎯 EXERCISES</h2>

<h3 id="bt1">Exercise 1: Research</h3>
<ul>
<li>Read CloudNativePG documentation</li>
<li>Compare 3 operators: CNPG vs Patroni vs PGO</li>
<li>Decide sync vs async for your use case__HTMLTAG_304___
</ul>

<hr>

<h2 id="bai-tiep-theo">📚 NEXT POST</h2>
<p>In <strong>Lesson 17: Deploy CloudNativePG Operator and PostgreSQL Cluster</strong>, we will install CloudNativePG and create PostgreSQL cluster 3 instances.</p>