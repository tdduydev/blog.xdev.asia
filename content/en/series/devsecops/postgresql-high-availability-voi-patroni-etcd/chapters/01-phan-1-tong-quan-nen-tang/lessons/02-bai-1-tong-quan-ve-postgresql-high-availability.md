---
id: 019c9617-fb5e-71a4-b3a1-a77a7c225818
title: 'Lesson 1: Overview of PostgreSQL High Availability'
slug: bai-1-tong-quan-ve-postgresql-high-availability
description: Learn why High Availability is needed, compare popular HA solutions (Patroni, Repmgr, Pacemaker) and master the overall architecture of the PostgreSQL HA system.
duration_minutes: 110
is_free: true
video_url: null
sort_order: 1
section_title: 'Part 1: Overview & Background'
course:
  id: 019c9617-fad7-7170-97f5-55c1940af2f5
  title: PostgreSQL High Availability with Patroni & etcd
  slug: postgresql-high-availability-voi-patroni-etcd
locale: en
---
<h2 id="m%E1%BB%A5c-ti%C3%AAu-b%C3%A0i-h%E1%BB%8Dc">Lesson Objectives</h2><p>After this lesson, you will:</p><ul><li>Understand why High Availability (HA) is important for database systems_</li><li>Master HA implementation methods for PostgreSQL_</li><li>Compare the advantages and disadvantages of Patroni, Repmgr and Pacemaker</li><li>Understand the overall architecture of the PostgreSQL system HA</li></ul><hr><h2 id="1-t%E1%BA%A1i-sao-c%E1%BA%A7n-high-availability">1. Why do we need High Availability?</h2><h3 id="11-v%E1%BA%A5n-%C4%91%E1%BB%81-v%E1%BB%9Bi-single-point-of-failure-spof">1.1. Problem with Single Point of Failure (SPOF)</h3><p>In a traditional database system with single server:</p><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/single-point-of-failure-spof-93370e03.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Single Point of Failure (SPOF)</span></figcaption></figure><p><strong>Consequences when the database server crashes error:</strong></p><ul><li><strong>Downtime</strong>: Application cannot access data</li><li><strong>Revenue loss</strong>: Every possible minute of downtime costs millions of dong</li><li><strong>Loss of reputation</strong>: Users cannot use the service</li><li><strong>Data loss</strong>: If there is no timely backup time</li></ul><h3 id="12-c%C3%A1c-nguy%C3%AAn-nh%C3%A2n-g%C3%A2y-downtime-ph%E1%BB%95-bi%E1%BA%BFn">1.2. Common causes of downtime</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Cause__HTMLTAG_57___
<th>Rate</th>
<th>Impact</th>
</tr>
</thead>
<tbody>
<tr>
<td>Hardware error (disk, RAM, CPU)</td>
<td>30%</td>
<td>High</td>
</tr>
<tr>
<td>Network error</td>
<td>20%</td>
<td>Average</td>
</tr>
<tr>
<td>Software errors/bug__HTMLTAG_83___
<td>25%</td>
<td>High</td>
</tr>
<tr>
<td>Maintenance has a plan__HTMLTAG_91___
<td>15%</td>
<td>Controllable</td>
</tr>
<tr>
<td>Human error__HTMLTAG_99___
<td>10%</td>
<td>High</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="13-high-availability-l%C3%A0-g%C3%AC">1.3. What is High Availability?</h3><p><strong>High Availability (HA)</strong> is the ability of a system to maintain continuous operation even when one or more components fail.</p><p><strong>Measurement indicators HA:</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Availability</th>
<th>Downtime/year</th>
<th>Downtime/month</th>
<th>Level</th>
</tr>
</thead>
<tbody>
<tr>
<td>99% (2 nines)</td>
<td>3.65 days</td>
<td>7.2 hours</td>
<td>Low</td>
</tr>
<tr>
<td>99.9% (3 nines)</td>
<td>8.76 hours</td>
<td>43.2 minutes</td>
<td>Average</td>
</tr>
<tr>
<td>99.99% (4 nines)</td>
<td>52.56 minutes__HTMLTAG_157___
<td>4.32 minutes__HTMLTAG_159___
<td>High</td>
</tr>
<tr>
<td>99.999% (5 nines)</td>
<td>5.26 minutes</td>
<td>25.9 seconds</td>
<td>Very high</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="14-l%E1%BB%A3i-%C3%ADch-c%E1%BB%A7a-ha">1.4. Benefits of HA</h3><p><strong>Business Benefits:</strong></p><ul><li>Minimize downtime and lost revenue_</li><li>Increase system reliability system_</li><li>Improve user experience_</li><li>Meet SLA (Service Level Agreement)_</li></ul><p><strong>Technical Benefits:_</strong></p><ul><li>Automatic failover when the primary server has a problem__HTMLTAG_198___<li>_Zero-downtime maintenance_</li><li>_Load for read queries</li><li>Disaster recovery</li><li>Data protection</li></ul><hr><h2 id="2-c%C3%A1c-ph%C6%B0%C6%A1ng-ph%C3%A1p-ha-cho-postgresql">2. HA methods for PostgreSQL</h2><h3 id="21-log-shipping-wal-shipping">2.1. Log-Shipping (WAL Shipping)_</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/log-shipping-wal-shipping-1-d17d26c9.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">_Log-Shipping (WAL Shipping)</span></figcaption></figure><p><strong>How it works:</strong></p><ul><li>Primary server writes WAL (Write-Ahead Log) files</li><li>WAL files are copied to the standby server</li><li>Standby server replays WAL to synchronize data</li></ul><p><strong>Advantages Points:</strong></p><ul><li>Simple, easy to set up</li><li>Less resource consuming original</li></ul><p><strong>Disadvantages:</strong></p><ul><li>Recovery Time Objective (RTO) high (minutes → hour)</li><li>No automatic failover</li><li>Data loss may occur__HTMLTAG_252___<li>Standby cannot be queried (warm standby)</li></ul><h3 id="22-streaming-replication">2.2. Streaming Replication</h3><p><strong>How it works:</strong></p><ul><li>Primary stream WAL records realtime to standby_</li><li>Standby apply changes immediately</li><li>Standby can serve read queries (hot standby)</li></ul><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/log-shipping-wal-shipping-14c7348d.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Log-Shipping (WAL Shipping)</span></figcaption></figure><p><strong>Advantages:</strong></p><ul><li>Low Latency (&lt; 1 second)_</li><li>Hot standby can serve read queries</li><li>Synchronous mode reduces data loss__HTMLTAG_287___</ul><p><strong>_Disadvantages point:_</strong></p><ul><li>Still need manual failover_</li><li>Need external tool for automation_</li></ul><h3 id="23-logical-replication">2.3. Logical Replication</h3><p><strong>How it works:</strong></p><ul><li>Replicate at logical level (tables, rows)</li><li>Enable selective replication data</li><li>Publisher → Subscriber model</li></ul><p><strong>Pros point:</strong></p><ul><li>Replication between different PostgreSQL versions</li><li>_Selective replication (some tables only)_</li><li>_Multi-master possible (with BDR)</li></ul><p><strong>Disadvantages:_</strong></p><ul><li>Higher overhead than physical replication</li><li>None Main HA solution (usually used for data distribution)</li></ul><h3 id="24-shared-storage-san">2.4. Shared Storage (SAN)</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/shared-storage-san-c198e575.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Shared Storage (SAN)</span></figcaption></figure><p><strong>Advantages:</strong></p><ul><li>Failover is fast (just start PostgreSQL)_</li><li>No data loss_</li></ul><p><strong>Disadvantages:</strong></p><ul><li>Expensive (needs SAN infrastructure)</li><li>SAN becomes single point of failure</li><li>Complicated to maintain</li></ul><hr><h2 id="3-so-s%C3%A1nh-patroni-vs-repmgr-vs-pacemaker">3. Comparison: Patroni vs Repmgr vs Pacemaker</h2><h3 id="31-patroni">3.1. Patroni_</h3><p><strong>Features:_</strong></p><ul><li>_Python-based_</li><li>Using DCS (etcd, Consul, ZooKeeper) to save cluster state_</li><li>REST API for management</li><li>Automatic smart failover_</li><li>Template-based configuration</li></ul><p><strong>Advantages:</strong></p><ul><li>✅ Easy to install and configure image</li><li>✅ Powerful REST API</li><li>✅ Good integration with Kubernetes_</li><li>✅ Active development, large community__HTMLTAG_399___<li>✅ Automatic leader election</li><li>✅ Rolling restart, zero-downtime updates</li></ul><p><strong>Disadvantages points:</strong></p><ul><li>❌ Depends on DCS (add component)</li><li>❌ Need to learn DCS (etcd/Consul)</li></ul><p><strong>Use suitable cases:</strong></p><ul><li>Cloud-native applications</li><li>Kubernetes deployments</li><li>Microservices architecture</li><li>Need high automation</li></ul><h3 id="32-repmgr">3.2. Repmgr</h3><p><strong>Features:</strong></p><ul><li>Open-source tool from 2ndQuadrant (EnterpriseDB)</li><li>Standalone tool, no need for DCS</li><li>Witness node for quorum voting_</li><li>Command-line based management</li></ul><p><strong>Advantages:</strong></p><ul><li>✅ No need for external DCS addition</li><li>✅ Simpler than Patroni</li><li>✅ Good Documentation</li><li>✅ Mature and stable</li></ul><p><strong>Disadvantages:</strong></p><ul><li>❌ Fewer automation features Patroni</li><li>❌ No REST API</li><li>❌ Smaller community</li><li>❌ Complex failover more</li></ul><p><strong>Use suitable cases:</strong></p><ul><li>Traditional infrastructure</li><li>Single Simple, few nodes</li><li>Don't want to add DCS</li></ul><h3 id="33-pacemaker-corosync">3.3. Pacemaker + Corosync_</h3><p><strong>Features:_</strong></p><ul><li>High Availability cluster framework (Linux-HA)</li><li>Management many types of resources, not just PostgreSQL</li><li>Voting quorum mechanism</li><li>Fencing/STONITH to avoid split-brain_</li></ul><p><strong>Pros score:</strong></p><ul><li>✅ Mature, production-proven (20+ years)</li><li>✅ Manage many services (PostgreSQL, web server, etc.)</li><li>✅ Powerful Fencing mechanism</li><li>✅ Supports shared storage</li></ul><p><strong>Disadvantages Points:_</strong></p><ul><li>❌ Very complicated to setup and maintain_</li><li>❌ High learning curve_</li><li>❌ Difficult XML configuration read</li><li>❌ Debugging is difficult</li></ul><p><strong>Use cases are suitable Case:</strong></p><ul><li>Enterprise environment_</li><li>Need to manage many services</li><li>Has shared storage (SAN)</li><li>Team has experience with Pacemaker</li></ul><h3 id="34-b%E1%BA%A3ng-so-s%C3%A1nh-t%E1%BB%95ng-quan">3.4. Overview comparison table</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Criteria</th>
<th>Patroni</th>
<th>Repmgr</th>
<th>Pacemaker</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Complexity</strong></td>
<td>Average</td>
<td>Low</td>
<td>High</td>
</tr>
<tr>
<td><strong>Learning curve</strong></td>
<td>Average</td>
<td>Low</td>
<td>Very high</td>
</tr>
<tr>
<td><strong>Setup time</strong></td>
<td>Nhanh</td>
<td>Nhanh</td>
<td>Slow</td>
</tr>
<tr>
<td><strong>Automatic failover</strong></td>
<td>✅ Excellent</td>
<td>✅ Good</td>
<td>✅ Excellent</td>
</tr>
<tr>
<td><strong>REST API</strong></td>
<td>✅ Yes</td>
<td>❌ No</td>
<td>❌ No</td>
</tr>
<tr>
<td><strong>Kubernetes support</strong></td>
<td>✅ Excellent</td>
<td>⚠️ Limited</td>
<td>❌ No</td>
</tr>
<tr>
<td><strong>Community</strong></td>
<td>⭐⭐⭐⭐⭐</td>
<td>⭐⭐⭐</td>
<td>⭐⭐⭐⭐</td>
</tr>
<tr>
<td><strong>Documentation</strong></td>
<td>⭐⭐⭐⭐⭐</td>
<td>⭐⭐⭐⭐</td>
<td>⭐⭐⭐</td>
</tr>
<tr>
<td><strong>Dependencies_</strong></td>
<td>DCS (etcd/Consul)</td>
<td>None</td>
<td>None</td>
</tr>
<tr>
<td><strong>Best for</strong></td>
<td>Modern/Cloud</td>
<td>Simple setups</td>
<td>Enterprise/Complex</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="35-khuy%E1%BA%BFn-ngh%E1%BB%8B">3.5. Recommended</h3><p><strong>Choose Patroni if:</strong></p><ul><li>Deploy on cloud or Kubernetes_</li><li>Need automation and REST API</li><li>Team has experience with modern DevOps tools</li><li>✅ <strong>This is the most popular option currently nay</strong></li></ul><p><strong>_Select Repmgr if:</strong></p><ul><li>Simple setup, few nodes (2-3)</li><li>Don't want to depend on DCS</li><li>Team is familiar with PostgreSQL traditional tools_</li></ul><p><strong>Choose Pacemaker if:</strong></p><ul><li>Complicated enterprise environment</li><li>Pacemaker infrastructure already available</li><li>Need to manage many services at the same time_</li><li>Shared storage available (SAN)</li></ul><hr><h2 id="4-ki%E1%BA%BFn-tr%C3%BAc-t%E1%BB%95ng-quan-h%E1%BB%87-th%E1%BB%91ng-patroni-etcd">4. System overview architecture Patroni + etcd</h2><h3 id="41-ki%E1%BA%BFn-tr%C3%BAc-3-node-cluster">4.1. 3-node cluster architecture</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/kie-n-tru-c-to-ng-quan-he-tho-ng-patroni-etcd-d34eb94c.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">System overview architecture Patroni + etcd</span></figcaption></figure><h3 id="42-c%C3%A1c-th%C3%A0nh-ph%E1%BA%A7n-ch%C3%ADnh">4.2. Main components_</h3><h4 id="postgresql"><strong>PostgreSQL</strong></h4><ul><li>Database main engine_</li><li>One node is the Leader (read/write)</li><li>Other nodes are Replica (read-only)</li><li>Use Streaming Replication to sync set</li></ul><h4 id="patroni"><strong>Patroni</strong></h4><ul><li>PostgreSQL lifecycle management_</li><li>_Monitor health of nodes_</li><li>Perform automatic failover_</li><li>Expose REST API (:8008) to query cluster state_</li><li>Read/write configuration to DCS</li></ul><h4 id="etcd-dcsdistributed-configuration-store"><strong>etcd (DCS - Distributed Configuration Store)</strong></h4><ul><li>Storing cluster state and configuration</li><li>Leader election (decide which node is the Leader)</li><li>Distributed lock mechanism</li><li>3 nodes etcd form the quorum (majority voting)_</li></ul><h4 id="haproxy-optional-nh%C6%B0ng-khuy%E1%BA%BFn-ngh%E1%BB%8B"><strong>HAProxy (optional but recommended)_</strong></h4><ul><li>_Load balancer</li><li>Route write traffic → Leader</li><li>Route read traffic → Replicas (round-robin)</li><li>Health check and automatically route when failover</li></ul><h3 id="43-lu%E1%BB%93ng-ho%E1%BA%A1t-%C4%91%E1%BB%99ng">4.3. Activity flow</h3><p><strong>1. Normal Operations</strong></p><pre><code>1. Application gửi query → HAProxy
2. HAProxy kiểm tra health check
3. Route write → Leader, read → Replicas
4. Patroni trên mỗi node:
   - Gửi heartbeat vào etcd mỗi 10s
   - Update health status
   - Maintain leader lease
</code></pre><p><strong>2. Leader Failure Detection</strong></p><pre><code>1. Node 1 (Leader) gặp sự cố → stop heartbeat
2. etcd phát hiện: leader lease expired (30s)
3. Patroni trên Node 2 và Node 3 nhận ra
4. Leader election được trigger
</code></pre><p><strong>3. Automatic Failover Process</strong></p><pre><code>Timeline: 0s  ──────────► 30s ──────► 45s ──────► 60s
          │              │           │            │
      Leader dies    etcd detects  New leader  Applications
                     lease expire   elected     reconnect
                                   (Node 2)
                                   
Node 1:   LEADER ──────► DOWN ──────────────────► STANDBY (sau khi recover)
Node 2:   REPLICA ─────────────────► LEADER ────► LEADER
Node 3:   REPLICA ──────────────────────────────► REPLICA
</code></pre><p><strong>4. After Failover</strong></p><pre><code>- Node 2 trở thành Leader mới
- Node 3 vẫn là Replica, đổi replication source sang Node 2
- HAProxy tự động detect và route traffic sang Node 2
- Node 1 (khi recover) sẽ join lại như Replica
</code></pre><h3 id="44-c%C3%A1c-scenario-quan-tr%E1%BB%8Dng">4.4. Important scenarios</h3><h4 id="scenario-1-planned-switchover"><strong>Scenario 1: Planned Switchover</strong></h4><pre><code class="language-bash"># Admin muốn maintenance Node 1 (Leader)
$ patronictl switchover postgres-cluster

# Patroni sẽ:
1. Tạm dừng ghi vào Leader hiện tại
2. Đợi Replica sync hoàn toàn (zero lag)
3. Promote Replica → Leader
4. Demote Leader cũ → Replica
5. Zero data loss, downtime &lt; 5s
</code></pre><h4 id="scenario-2-split-brain-prevention"><strong>Scenario 2: Split-brain Prevention_</strong></h4><pre><code>Tình huống: Network partition giữa nodes

etcd quorum (3 nodes):
- Partition A: Node 1, Node 2 (2 nodes = majority)
- Partition B: Node 3 (1 node = minority)

Kết quả:
✅ Partition A: Tiếp tục hoạt động, có thể elect leader
❌ Partition B: Không thể elect leader (không đủ quorum)

→ Tránh được 2 leaders cùng tồn tại!
</code></pre><h4 id="scenario-3-node-recovery"><strong>_Scenario 3: Node Recovery_</strong></h4><pre><code>Node 1 recover sau khi die:

1. Patroni start và đọc cluster state từ etcd
2. Nhận ra Node 2 đang là Leader
3. Tự động rejoin như Replica
4. Sử dụng pg_rewind để sync data nếu có divergence
5. Bắt đầu streaming replication từ Node 2
</code></pre><h3 id="45-c%E1%BA%A5u-h%C3%ACnh-timeline-th%C3%B4ng-s%E1%BB%91-quan-tr%E1%BB%8Dng">4.5. Timeline configuration (important parameters)_</h3><pre><code class="language-yaml"># patroni.yml
bootstrap:
  dcs:
    ttl: 30                    # Leader lease time (30s)
    loop_wait: 10              # Check interval (10s)
    retry_timeout: 10          # Retry time
    maximum_lag_on_failover: 1048576  # Max lag for failover candidate (1MB)
</code></pre><p><strong>Explanation:_</strong></p><ul><li><code>ttl: 30</code>: Leader must renewlease every 30 seconds, otherwise it will be considered dead</li><li><code>loop_wait: 10</code>: Patroni checks health every 10s</li><li>Failover trigger: when (ttl - loop_wait) ends → ~20-30s</li></ul><hr><h2 id="5-t%E1%BB%95ng-k%E1%BA%BFt">5. Summary_</h2><h3 id="key-takeaways">Key Takeaways_</h3><ol><li><strong>High Availability is mandatory__HTMLTAG_857___ for production systems to reduce downtime and data loss whether</li><li><strong>Streaming Replication + Automatic Failover</strong> is the most popular HA method for PostgreSQL_</li><li><strong>Patroni is the best choice__HTMLTAG_865___ for most use cases out there modern:_<ul><li>_Easy to setup and maintain_</li><li>_Automatic smart failover__HTMLTAG_870___<li>_REST powerful API__HTMLTAG_872___<li>_Good integration with cloud/K8s</li></ul></li><li><strong>3-node architecture</strong> with Patroni + etcd provides:_<ul><li>Automatic failover (RTO &lt; 30s)</li><li>Zero data loss with sync replication</li><li>Split-brain prevention</li><li>Scalability for read workloads</li></ul></li></ol><h3 id="b%C3%A0i-t%E1%BA%ADp-v%E1%BB%81-nh%C3%A0">Homework_</h3><ol><li>Calculate downtime for your system with different availability levels (99%, 99.9%, 99.99%)</li><li>Draw the HA architecture for your specific use case (number of nodes, data centers, RTO/RPO requirements)</li><li>Compare the costs between using HA and accepting downtime for your business you</li></ol><h3 id="chu%E1%BA%A9n-b%E1%BB%8B-cho-b%C3%A0i-ti%E1%BA%BFp-theo">Preparing for the next lesson</h3><p>Lesson 2 will delve into <strong>Streaming Replication</strong> - the foundation of PostgreSQL HA:</p><ul><li>Detailed operating mechanism of WAL</li><li>_Synchronous vs Asynchronous replication_</li><li>Replication slots_</li><li>Lab: Manual replication setup_</li></ul><hr><h2 id="t%C3%A0i-li%E1%BB%87u-tham-kh%E1%BA%A3o">References_</h2><ul><li><a href="https://www.postgresql.org/docs/current/high-availability.html">_PostgreSQL Official Documentation - High Availability</a></li><li><a href="https://github.com/patroni/patroni">Patroni GitHub Repository_</a></li><li><a href="https://etcd.io/docs/">etcd Documentation</a></li><li><a href="https://www.postgresql.org/docs/current/warm-standby.html">PostgreSQL Streaming Replication</a></li></ul>