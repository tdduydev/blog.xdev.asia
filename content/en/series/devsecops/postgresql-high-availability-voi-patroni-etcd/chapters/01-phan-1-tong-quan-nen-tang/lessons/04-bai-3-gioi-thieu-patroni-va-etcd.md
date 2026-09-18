---
id: 019c9617-fb66-7039-b71b-ae1b85a72eee
title: 'Lesson 3: Introducing Patroni and etcd'
slug: bai-3-gioi-thieu-patroni-va-etcd
description: Understand how Patroni works, the role of DCS (etcd/Consul/ZooKeeper), Raft consensus algorithm and automatic leader election mechanism.
duration_minutes: 160
is_free: true
video_url: null
sort_order: 3
section_title: 'Part 1: Overview & Background'
course:
  id: 019c9617-fad7-7170-97f5-55c1940af2f5
  title: PostgreSQL High Availability with Patroni & etcd
  slug: postgresql-high-availability-voi-patroni-etcd
locale: en
---
<h2 id="m%E1%BB%A5c-ti%C3%AAu">Goal</h2><p>After this lesson, you will understand:</p><ul><li>What Patroni is and how it works_</li><li>DCS (Distributed Configuration Store) - etcd/Consul/ZooKeeper</li><li>Consensus algorithm (Raft)</li><li>Leader election &amp; Failover mechanism</li><li>Split-brain problem and solution</li></ul><h2 id="1-patroni-l%C3%A0-g%C3%AC">1. What is Patroni?</h2><h3 id="gi%E1%BB%9Bi-thi%E1%BB%87u">Introduction</h3><p>Patroni is an open source HA (High Availability) template for PostgreSQL, developed by Zalando. It automates PostgreSQL cluster management, including:_</p><ul><li><strong>_Leader election</strong>: Automatically select primary node_</li><li><strong>Automatic failover</strong>: Project transition Automatic backup when primary fails</li><li><strong>Configuration management</strong>: Centralized configuration management</li><li><strong>Health checking</strong>: Monitor the health of related nodes continued</li></ul><h3 id="ki%E1%BA%BFn-tr%C3%BAc-patroni">Patroni Architecture</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/777e95e4-36b7-48af-912c-f23d5cebf3c6-1-201-a-ee2b08e0.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">The Patroni architecture is a popular choice for managing PostgreSQL clusters.</span></figcaption></figure><h3 id="c%C3%A1ch-ho%E1%BA%A1t-%C4%91%E1%BB%99ng-c%E1%BB%A7a-patroni">How Patroni Works</h3><ol><li><strong>Start</strong>: Each Patroni instance connects to the DCS (etcd)</li><li><strong>Leader election</strong>: Nodes compete to become the leader in DCS</li><li><strong>Role assignment</strong>: Nodes that win the leader lock will promote PostgreSQL to primary</li><li><strong>Health monitoring</strong>: Patroni continuously checks:<ul><li>PostgreSQL process health</li><li>Replication status</li><li>DCS connectivity</li></ul></li><li><strong>Auto failover</strong>: If leader fails, Patroni automatically:<ul><li>Detect problem</li><li>Select most suitable replica</li><li>Promote new replica to primary</li><li>Update remaining replicas_</li></ul></li></ol><h3 id="c%C3%A1c-th%C3%A0nh-ph%E1%BA%A7n-ch%C3%ADnh">Components main</h3><h4 id="patroni-daemon">Patroni daemon</h4><ul><li>Runs on each PostgreSQL node_</li><li>Manage lifecycle of PostgreSQL_</li><li>Implement health checks</li><li>Interaction with DCS</li></ul><h4 id="rest-api">REST API_</h4><ul><li>Endpoint for health checks:&nbsp;<code>http://node:8008/health</code></li><li>Endpoint for read-only:&nbsp;<code>http://node:8008/read-only</code></li><li>Endpoint for primary:&nbsp;<code>http://node:8008/master</code>&nbsp;(deprecated) or&nbsp;<code>/primary</code></li></ul><h4 id="patronictl">patronictl</h4><ul><li>CLI tool for cluster management</li><li>Commands: list, switchover, failover, reinit, restart, reload</li></ul><h2 id="2-dcsdistributed-configuration-store">2. DCS - Distributed Configuration Store</h2><h3 id="vai-tr%C3%B2-c%E1%BB%A7a-dcs">DCS Role</h3><p>DCS is the coordination center for the Patroni cluster, storing:</p><ul><li><strong>Leader key</strong>: Information about which node is the leader (TTL-based)</li><li><strong>Configuration</strong>: Configuring PostgreSQL and Patroni</li><li><strong>Member information</strong>: List of nodes in the cluster</li><li><strong>Failover/Switchover state</strong>: Switching status_</li></ul><h3 id="so-s%C3%A1nh-c%C3%A1c-dcs-ph%E1%BB%95-bi%E1%BA%BFn">Compare common DCSs variable</h3>
<!--kg-card-begin: html-->
<table class="sc-jTzLTM pLVjq" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe WPC&quot;, &quot;Segoe UI&quot;, Ubuntu, &quot;Droid Sans&quot;, sans-serif; overflow-wrap: break-word; font-size: 14px; line-height: 1.6; border-collapse: collapse; color: rgb(212, 212, 212); font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(30, 30, 30); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><thead><tr><th style="text-align: left; border-bottom: 1px solid rgba(255, 255, 255, 0.69); padding: 5px 10px; border-top-color: rgba(255, 255, 255, 0.69); border-right-color: rgba(255, 255, 255, 0.69); border-left-color: rgba(255, 255, 255, 0.69);">Calculation function</th><th style="text-align: left; border-bottom: 1px solid rgba(255, 255, 255, 0.69); padding: 5px 10px; border-top-color: rgba(255, 255, 255, 0.69); border-right-color: rgba(255, 255, 255, 0.69); border-left-color: rgba(255, 255, 255, 0.69);">etcd</th><th style="text-align: left; border-bottom: 1px solid rgba(255, 255, 255, 0.69); padding: 5px 10px; border-top-color: rgba(255, 255, 255, 0.69); border-right-color: rgba(255, 255, 255, 0.69); border-left-color: rgba(255, 255, 255, 0.69);">Consul</th><th style="text-align: left; border-bottom: 1px solid rgba(255, 255, 255, 0.69); padding: 5px 10px; border-top-color: rgba(255, 255, 255, 0.69); border-right-color: rgba(255, 255, 255, 0.69); border-left-color: rgba(255, 255, 255, 0.69);">ZooKeepe r</th></tr></thead><tbody><tr><td style="padding: 5px 10px;"><strong class="sc-jzJRlG fjmzee" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe WPC&quot;, &quot;Segoe UI&quot;, Ubuntu, &quot;Droid Sans&quot;, sans-serif; overflow-wrap: break-word;">Language language</strong></td><td style="padding: 5px 10px;">Go</td><td style="padding: 5px 10px;">Go</td><td style="padding: 5px 10px;">_Java</td></tr>___HTMLTAG_18 4___<td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);"><strong class="sc-jzJRlG fjmzee" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe WPC&quot;, &quot;Segoe UI&quot;, Ubuntu, &quot;Droid Sans&quot;, sans-serif; overflow-wrap: break-word;">Consensus</strong></td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Raft_</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">_Raft_</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">ZAB (Paxos-like)</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);"><strong class="sc-jzJRlG fjmzee" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe WPC&quot;, &quot;Segoe UI&quot;, Ubuntu, &quot;Droid Sans&quot;, sans-serif; overflow-wrap: break-word;">API_</strong></td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">gRPC, HTTP</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">HTTP, DNS</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Custom protocol_</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);"><strong class="sc-jzJRlG fjmzee" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe WPC&quot;, &quot;Segoe UI&quot;, Ubuntu, &quot;Droid Sans&quot;, sans-serif; overflow-wrap: break-word;">_Setup_</strong></td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Simple_</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Central average</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Complex miscellaneous</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);"><strong class="sc-jzJRlG fjmzee" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe WPC&quot;, &quot;Segoe UI&quot;, Ubuntu, &quot;Droid Sans&quot;, sans-serif; overflow-wrap: break-word;">Performance___HTMLTAG_223_ __</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">High</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">High</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Middle average_</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);"><strong class="sc-jzJRlG fjmzee" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe WPC&quot;, &quot;Segoe UI&quot;, Ubuntu, &quot;Droid Sans&quot;, sans-serif; overflow-wrap: break-word;">_Documents_</strong></td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Good</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Very good</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Average</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);"><strong class="sc-jzJRlG fjmzee" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe WPC&quot;, &quot;Segoe UI&quot;, Ubuntu, &quot;Droid Sans&quot;, sans-serif; overflow-wrap: break-word;">Usage</strong></td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Kubernetes, Patroni</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Service mesh, HA</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Hadoop, Kafka</td></tr></tbody></table>
<!--kg-card-end: html-->
<p><strong>Recommended</strong>: etcd for most cases because of simplicity and high performance.</p><h3 id="etcddistributed-key-value-store">etcd - Distributed Key-Value Store_</h3><p><strong>Features main</strong>:</p><ul><li>Strongly consistent (CAP theorem: CP)_</li><li>Distributed and highly available_</li><li>Fast (sub-millisecond latency)</li><li>Simple API</li><li>Watch mechanism for real-time updates</li></ul><p><strong>Data structure in etcd for Patroni</strong>:</p><pre><code>/service/postgres/
├── config          # Cấu hình cluster
├── initialize      # Bootstrap token
├── leader          # Leader lock (TTL: 30s)
├── members/
│   ├── node1      # Thông tin node1
│   ├── node2      # Thông tin node2
│   └── node3      # Thông tin node3
├── optime/
│   └── leader     # LSN của leader
└── failover       # Failover/switchover instructions
</code></pre><h2 id="3-consensus-algorithmraft">3. Consensus Algorithm - Raft</h2><h3 id="raft-l%C3%A0-g%C3%AC">What is Raft?</h3><p>Raft is a consensus algorithm designed to be easier to understand than Paxos, ensuring say:</p><ul><li><strong>Safety</strong>: Never return false results</li><li><strong>Liveness</strong>: Always progress (when majority nodes active)</li><li><strong>Consistency</strong>: All nodes see the same state_</li></ul><h3 id="c%C3%A1c-vai-tr%C3%B2-trong-raft">Roles in Raft</h3><ol><li><strong>Leader</strong>:_<ul><li>Process all client requests_</li><li>Replicate incoming log entries followers</li><li>Unique in a term</li></ul></li><li><strong>Follower</strong>:<ul><li>Passive, only receive requests from leader</li><li>If not receiving heartbeat, become candidate_</li></ul></li><li><strong>_Candidate_</strong>:_<ul><li>Follower timeout to candidate</li><li>Request votes from other nodes</li><li>If you win the election → Leader</li></ul></li></ol><h3 id="quy-tr%C3%ACnh-leader-election">Leader Process Election</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/5f8f0cd1-cf7c-456f-ae89-226a8adf5dfe-1-201-a-71258047.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">The Leader Election Process is crucial for ensuring the consistency and availability of the distributed system.</span></figcaption></figure><p><strong>Election details__HTMLTAG_354___:_</p><ol><li>Follower not receiving heartbeat during election timeout (150-300ms random)</li><li>Convert to Candidate, increase term number</li><li>Vote for yourself_</li><li>Send RequestVote RPC to all nodes</li><li>If received majority votes (n/2 + 1):<ul><li>Become Leader_</li><li>Send heartbeat immediately ie</li></ul></li><li>If timeout or lose:<ul><li>Return to Follower or start election new</li></ul></li></ol><h3 id="quorum-v%C3%A0-majority">Quorum and Majority_</h3><p><strong>Quorum</strong>: Minimum number of nodes needed for the system to operate dynamic</p><pre><code>Cluster size | Quorum | Tolerated failures
-------------|--------|-------------------
     1       |   1    |        0
     3       |   2    |        1
     5       |   3    |        2
     7       |   4    |        3
</code></pre><p><strong>Formula</strong>: Quorum = floor(n/2) + 1</p><p><strong>Example with 3 nodes</strong>:</p><ul><li>✅ 3 nodes active: Cluster healthy</li><li>✅ 2 nodes active: Cluster works (quorum met)</li><li>❌ 1 active node: Cluster stops (no quorum)_</li></ul><p><strong>_Recommendation</strong>: Always use an odd number of nodes (3, 5, 7) to optimize faults tolerance.</p><h2 id="4-leader-election-trong-patroni">4. Leader Election in Patroni</h2><h3 id="c%C6%A1-ch%E1%BA%BF-leader-lock">Leader Lock mechanism</h3><p>Patroni uses DCS to implement distributed lock:</p><p><strong>Leader Lock Properties</strong>:</p><pre><code class="language-yaml">Key: /service/postgres/leader
Value: 
  {
    "version": "3.0.2",
    "conn_url": "postgres://node1:5432/postgres",
    "api_url": "http://node1:8008/patroni",
    "xlog_location": 123456789,
    "timeline": 2
  }
TTL: 30 seconds
</code></pre><h3 id="quy-tr%C3%ACnh-leader-election-1">Leader Election Process</h3><p><strong>Step 1: Race Condition</strong></p><pre><code>Time: T0 - Leader crashes
Node1: Check DCS → No leader key exists
Node2: Check DCS → No leader key exists  
Node3: Check DCS → No leader key exists
</code></pre><p><strong>Step 2: Acquire Lock Attempt_</strong></p><pre><code>Time: T0 + 100ms
Node1: Try acquire lock → SUCCESS (first to write)
Node2: Try acquire lock → FAILED (key exists)
Node3: Try acquire lock → FAILED (key exists)
</code></pre><p><strong>Step 3: Role Assignment_</strong></p><pre><code>Node1: Promote PostgreSQL to Primary
Node2: Configure as Replica, point to Node1
Node3: Configure as Replica, point to Node1
</code></pre><p><strong>Step 4: Maintenance</strong></p><pre><code>Every 10 seconds:
Node1 (Leader): 
  - Renew lock (TTL extension)
  - Update xlog_location
  - Send heartbeat

Node2/3 (Followers):
  - Monitor leader key
  - Check replication lag
  - Ready to take over
</code></pre><h3 id="ti%C3%AAu-ch%C3%AD-ch%E1%BB%8Dn-best-replica">Best selection criteria Replica_</h3><p>When failover, Patroni chooses replica based on:</p><ol><li><strong>Replication state</strong>:<ul><li><code>streaming</code>&nbsp;&gt;&nbsp;<code>in archive recovery</code></li></ul></li><li><strong>_Timeline_</strong>: Higher Timeline takes priority_</li><li><strong>XLog position</strong>:<ul><li>Replica has LSN closest to primary</li><li>Less data loss most</li></ul></li><li><strong>No replication lag</strong>:<ul><li><code>pg_stat_replication.replay_lag = 0</code></li></ul></li><li><strong>Explicit candidate</strong>: Set in configuration</li></ol><p><strong>Priority tag</strong>:</p><pre><code class="language-yaml">tags:
  nofailover: false
  noloadbalance: false
  clonefrom: false
  nosync: false
</code></pre><p><strong>Wallet example</strong>:</p><pre><code>Primary fails at LSN: 0/3000000

Replica1: LSN=0/3000000, lag=0s     ← BEST CHOICE
Replica2: LSN=0/2FFFFFF, lag=1s
Replica3: LSN=0/2FFFFFE, lag=2s

→ Patroni promotes Replica1
</code></pre><h2 id="5-failover-mechanism">5. Failover Mechanism</h2><h3 id="automatic-failover-process">Automatic Failover Process</h3><p><strong>Timeline details details</strong>:</p><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/failover-mechanism-431e5241.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Automatic Failover Process_</span></figcaption></figure><h3 id="c%C3%A1c-b%C6%B0%E1%BB%9Bc-failover-chi-ti%E1%BA%BFt">Detailed failover steps details</h3><p><strong>Step 1: Detect failure</strong></p><pre><code class="language-python"># Patroni health check loop
while True:
    if not check_postgresql_health():
        log.error("PostgreSQL unhealthy")
        stop_renewing_leader_lock()
    
    if not check_dcs_connectivity():
        log.error("Lost connection to DCS")
        demote_if_leader()
    
    sleep(10)
</code></pre><p><strong>Step 2: Leader lock expires</strong></p><pre><code class="language-bash"># In etcd
$ etcdctl get /service/postgres/leader
# After TTL: Key not found

# Patroni logs on former leader
WARN: Could not renew leader lock
INFO: Demoting PostgreSQL to standby
</code></pre><p><strong>Step 3: Replica promotion_</strong></p><pre><code class="language-bash"># Patroni on promoted replica
INFO: No leader found
INFO: Attempting to acquire leader lock
INFO: Lock acquired successfully
INFO: Promoting PostgreSQL instance
INFO: Updating configuration
INFO: Notifying other members
</code></pre><p><strong>Step 4: Reconfiguration</strong></p><pre><code class="language-sql">-- On promoted replica
SELECT pg_promote();

-- Changes primary_conninfo to null
-- Restarts as read-write
</code></pre><p><strong>Step 5: Followers repoint_</strong></p><pre><code class="language-bash"># Other replicas
INFO: New leader detected: node2
INFO: Updating primary_conninfo
INFO: Restarting replication
</code></pre><h3 id="monitoring-failover">Monitoring Failover_</h3><p><strong>Important Metrics_</strong>:_</p><ul><li><code>patroni_primary_timeline</code>: Detect timeline changes</li><li><code>patroni_xlog_location</code>: Track WAL position</li><li><code>patroni_replication_lag</code>: Lag before failover_</li><li><code>patroni_failover_count</code>: Count the number of times failover</li></ul><h2 id="6-split-brain-problem">6. Split-Brain Problem_</h2><h3 id="split-brain-l%C3%A0-g%C3%AC">What is Split-Brain?</h3><p><strong>Definition_</strong>: Situation where ≥2 nodes think they are Primary, recording different data → Data divergence.</p><h3 id="nguy%C3%AAn-nh%C3%A2n">Cause</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/network-partition-325c19b8.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><b><strong style="white-space: pre-wrap;">Network Partition</strong></b></figcaption></figure><ol><li><strong>Network Partition</strong></li><li><strong>DCS partition</strong>: etcd cluster split_</li><li><strong>Slow network</strong>: Heartbeat timeout but node still live</li></ol><h3 id="h%E1%BA%ADu-qu%E1%BA%A3-c%E1%BB%A7a-split-brain">Consequences of Split-Brain</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/ha-u-qua-cu-a-split-brain-87165730.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Consequences of Split-Brain</span></figcaption></figure><h3 id="patronis-split-brain-prevention">Patroni's Split-Brain Prevention</h3><p><strong>Mechanism 1: DCS-based Lock (Primary)</strong></p><pre><code class="language-python">def maintain_leader_lock():
    while is_leader:
        # Must renew within TTL
        success = dcs.renew_lock(ttl=30)
        
        if not success:
            log.critical("Lost leader lock!")
            # Immediate demotion
            demote_to_standby()
            stop_accepting_writes()
            break
        
        sleep(10)
</code></pre><p><strong>Mechanism 2: Leader Key Verification_</strong></p><pre><code class="language-python">def before_handle_write():
    leader_key = dcs.get("/service/postgres/leader")
    
    if leader_key.owner != my_node_name:
        # I'm not the real leader!
        raise Exception("Not leader anymore")
        demote_immediately()
</code></pre><p><strong>Mechanism 3: Timeline Divergence Detection</strong></p><pre><code class="language-sql">-- PostgreSQL timeline
SELECT timeline_id FROM pg_control_checkpoint();

-- If timelines diverge:
-- Node1: timeline=5
-- Node2: timeline=6
-- → Data inconsistency detected
-- → Requires pg_rewind or rebuild
</code></pre><h3 id="quorum-requirement">Quorum requirement</h3><p><strong>etcd with 3 nodes</strong>:</p><pre><code>Scenario 1: Network partition 1-2 split
  Partition A: Node1 (1 node)
    - Cannot get quorum (1 &lt; 2)
    - Cannot write to etcd
    - Demotes to standby ✓
  
  Partition B: Node2, Node3 (2 nodes)
    - Has quorum (2 ≥ 2)
    - Can elect leader
    - Node2 becomes primary ✓
  
Result: Only 1 primary exists ✓
</code></pre><p><strong>Scenario 2: Complete isolation_</strong></p><pre><code>Node1: Isolated, loses DCS
  - Tries to renew lock → FAIL
  - Demotes PostgreSQL immediately
  - Stops accepting connections
  
Node2/3: See Node1 gone
  - Elect new leader
  - Only 1 primary in cluster ✓
</code></pre><h3 id="watchdog-timer-advanced-protection">Watchdog Timer (Advanced Protection)</h3><p><strong>Hardware watchdog</strong>:</p><pre><code class="language-yaml"># patroni.yml
watchdog:
  mode: required  # or automatic, off
  device: /dev/watchdog
  safety_margin: 5
</code></pre><p><strong>Active dynamic</strong>:</p><ol><li>Patroni kicks watchdog device every 10s_</li><li>If Patroni hangs or loses DCS → stops kicking</li><li>After timeout → Watchdog reboots entire node</li><li>Prevents "zombie primary" scenario</li></ol><h3 id="best-practices-%C4%91%E1%BB%83-tr%C3%A1nh-split-brain">Best Practices to avoid Split-Brain</h3><ol><li><strong>Deploy separate DCS</strong>: etcd cluster in different AZ_</li><li><strong>Monitor DCS health</strong>: Alert when etcd is not healthy</li><li><strong>Network redundancy</strong>: Multiple network paths between nodes</li><li><strong>Proper timeouts_</strong>:_</li></ol><pre><code class="language-yaml">patroni:
  ttl: 30              # Leader lock TTL
  loop_wait: 10        # Check interval
  retry_timeout: 10    # DCS operation timeout
</code></pre><ol start="5"><li><strong>Enable watchdog_</strong>: Hardware protection layer</li><li><strong>Monitoring</strong>:</li></ol><pre><code class="language-bash"># Check for timeline divergence
patronictl list

# Expected: All nodes same timeline
+ Cluster: postgres (7001234567890123456) ----+----+-----------+
| Member | Host         | Role    | State   | TL | Lag in MB |
+--------+--------------+---------+---------+----+-----------+
| node1  | 10.0.1.1:5432| Leader  | running | 5  |           |
| node2  | 10.0.1.2:5432| Replica | running | 5  |         0 |
| node3  | 10.0.1.3:5432| Replica | running | 5  |         0 |
+--------+--------------+---------+---------+----+-----------+
</code></pre><h3 id="recovery-t%E1%BB%AB-split-brain">Recovery from Split-Brain</h3><p>If split-brain occurs:</p><p><strong>Step 1: Identify</strong></p><pre><code class="language-bash"># Check timeline
patronictl list
# node1: timeline=5
# node2: timeline=6  ← DIVERGED!
</code></pre><p><strong>Step 2: Choose primary_</strong></p><ul><li>Select the node with important data more</li><li>Or node with higher timeline</li></ul><p><strong>Step 3: Rebuild diverged replica</strong></p><pre><code class="language-bash"># Option 1: pg_rewind (if safe)
patronictl reinit postgres node2

# Option 2: Full rebuild
patronictl remove postgres node2
# Then: reinitialize from scratch
</code></pre><p><strong>Step 4: Verify_</strong></p><pre><code class="language-bash">patronictl list
# All nodes same timeline ✓
</code></pre><h2 id="7-t%E1%BB%95ng-k%E1%BA%BFt">7. Summary</h2><h3 id="key-takeaways">Key Takeaways</h3><p>✅&nbsp;<strong>Patroni</strong>: HA template automates PostgreSQL management cluster</p><p>✅&nbsp;<strong>DCS (etcd)</strong>: Distributed coordination, store configuration and leader lock_</p><p>✅&nbsp;<strong>Raft consensus</strong>: Ensure consistency and leader election in etcd</p><p>✅&nbsp;<strong>Leader election</strong>: Automatic, fast (~30-40s), based on TTL locks</p><p>✅&nbsp;<strong>Failover</strong>: Automatically promote the best replica when primary fails</p><p>✅&nbsp;<strong>Split-brain prevention</strong>: DCS quorum + TTL locks + watchdog_</p><h3 id="ki%E1%BA%BFn-tr%C3%BAc-t%E1%BB%95ng-h%E1%BB%A3p">General architecture</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/kien-truc-tong-hop-5f082dc1.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">General architecture case_</span></figcaption></figure><h3 id="c%C3%A2u-h%E1%BB%8Fi-%C3%B4n-t%E1%BA%ADp">Review Questions_</h3><ol><li>How is Patroni different from pure Streaming Replication?</li><li>Why do you need DCS? Can't use a database to store state?</li><li>What is the Quorum in a cluster of 5 nodes?</li><li>Patroni chooses which replica to promote when failover?</li><li>Split-brain happens and how does Patroni prevent it? What does __HTMLTAG_740___<li>Timeline in PostgreSQL mean?</li><li>What does TTL 30 seconds mean? Why not set TTL = 5 seconds?</li></ol><h3 id="chu%E1%BA%A9n-b%E1%BB%8B-cho-b%C3%A0i-ti%E1%BA%BFp-theo">Preparing for the next lesson_</h3><p>Lesson 4 will guide you on preparing the infrastructure:_</p><ul><li>Setup 3 VMs/Servers_</li><li>Network configuration, firewall</li><li>SSH keys, time sync_</li><li>Necessary Dependencies__HTMLTAG_758___</ul>