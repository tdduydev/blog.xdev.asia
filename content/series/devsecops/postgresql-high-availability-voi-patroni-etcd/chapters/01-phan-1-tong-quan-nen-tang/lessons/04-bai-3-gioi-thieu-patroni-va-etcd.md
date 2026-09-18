---
id: 019c9617-fb66-7039-b71b-ae1b85a72eee
title: 'Bài 3: Giới thiệu Patroni và etcd'
slug: bai-3-gioi-thieu-patroni-va-etcd
description: >-
  Hiểu rõ Patroni hoạt động thế nào, vai trò của DCS (etcd/Consul/ZooKeeper),
  thuật toán Raft consensus và cơ chế tự động leader election.
duration_minutes: 160
is_free: true
video_url: null
sort_order: 3
section_title: "Phần 1: Tổng quan & Nền tảng"
course:
  id: 019c9617-fad7-7170-97f5-55c1940af2f5
  title: PostgreSQL High Availability với Patroni & etcd
  slug: postgresql-high-availability-voi-patroni-etcd
---
<h2 id="m%E1%BB%A5c-ti%C3%AAu">Mục tiêu</h2><p>Sau bài học này, bạn sẽ hiểu:</p><ul><li>Patroni là gì và cách hoạt động</li><li>DCS (Distributed Configuration Store) - etcd/Consul/ZooKeeper</li><li>Consensus algorithm (Raft)</li><li>Leader election &amp; Failover mechanism</li><li>Split-brain problem và cách giải quyết</li></ul><h2 id="1-patroni-l%C3%A0-g%C3%AC">1. Patroni là gì?</h2><h3 id="gi%E1%BB%9Bi-thi%E1%BB%87u">Giới thiệu</h3><p>Patroni là một template HA (High Availability) mã nguồn mở cho PostgreSQL, được phát triển bởi Zalando. Nó tự động hóa việc quản lý PostgreSQL cluster, bao gồm:</p><ul><li><strong>Leader election</strong>: Tự động chọn primary node</li><li><strong>Automatic failover</strong>: Chuyển đổi dự phòng tự động khi primary bị lỗi</li><li><strong>Configuration management</strong>: Quản lý cấu hình tập trung</li><li><strong>Health checking</strong>: Giám sát sức khỏe của các nodes liên tục</li></ul><h3 id="ki%E1%BA%BFn-tr%C3%BAc-patroni">Kiến trúc Patroni</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/777e95e4-36b7-48af-912c-f23d5cebf3c6-1-201-a-ee2b08e0.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">The Patroni architecture is a popular choice for managing PostgreSQL clusters.</span></figcaption></figure><h3 id="c%C3%A1ch-ho%E1%BA%A1t-%C4%91%E1%BB%99ng-c%E1%BB%A7a-patroni">Cách hoạt động của Patroni</h3><ol><li><strong>Khởi động</strong>: Mỗi Patroni instance kết nối đến DCS (etcd)</li><li><strong>Leader election</strong>: Các node cạnh tranh để trở thành leader trong DCS</li><li><strong>Role assignment</strong>: Node giành được leader lock sẽ promote PostgreSQL thành primary</li><li><strong>Health monitoring</strong>: Patroni liên tục kiểm tra:<ul><li>PostgreSQL process health</li><li>Replication status</li><li>DCS connectivity</li></ul></li><li><strong>Auto failover</strong>: Nếu leader bị lỗi, Patroni tự động:<ul><li>Phát hiện sự cố</li><li>Chọn replica phù hợp nhất</li><li>Promote replica mới thành primary</li><li>Cập nhật các replica còn lại</li></ul></li></ol><h3 id="c%C3%A1c-th%C3%A0nh-ph%E1%BA%A7n-ch%C3%ADnh">Các thành phần chính</h3><h4 id="patroni-daemon">Patroni daemon</h4><ul><li>Chạy trên mỗi PostgreSQL node</li><li>Quản lý lifecycle của PostgreSQL</li><li>Thực hiện health checks</li><li>Tương tác với DCS</li></ul><h4 id="rest-api">REST API</h4><ul><li>Endpoint cho health checks:&nbsp;<code>http://node:8008/health</code></li><li>Endpoint cho read-only:&nbsp;<code>http://node:8008/read-only</code></li><li>Endpoint cho primary:&nbsp;<code>http://node:8008/master</code>&nbsp;(deprecated) hoặc&nbsp;<code>/primary</code></li></ul><h4 id="patronictl">patronictl</h4><ul><li>CLI tool để quản lý cluster</li><li>Commands: list, switchover, failover, reinit, restart, reload</li></ul><h2 id="2-dcsdistributed-configuration-store">2. DCS - Distributed Configuration Store</h2><h3 id="vai-tr%C3%B2-c%E1%BB%A7a-dcs">Vai trò của DCS</h3><p>DCS là trung tâm điều phối cho Patroni cluster, lưu trữ:</p><ul><li><strong>Leader key</strong>: Thông tin node nào đang là leader (TTL-based)</li><li><strong>Configuration</strong>: Cấu hình PostgreSQL và Patroni</li><li><strong>Member information</strong>: Danh sách các nodes trong cluster</li><li><strong>Failover/Switchover state</strong>: Trạng thái chuyển đổi</li></ul><h3 id="so-s%C3%A1nh-c%C3%A1c-dcs-ph%E1%BB%95-bi%E1%BA%BFn">So sánh các DCS phổ biến</h3>
<!--kg-card-begin: html-->
<table class="sc-jTzLTM pLVjq" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe WPC&quot;, &quot;Segoe UI&quot;, Ubuntu, &quot;Droid Sans&quot;, sans-serif; overflow-wrap: break-word; font-size: 14px; line-height: 1.6; border-collapse: collapse; color: rgb(212, 212, 212); font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(30, 30, 30); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><thead><tr><th style="text-align: left; border-bottom: 1px solid rgba(255, 255, 255, 0.69); padding: 5px 10px; border-top-color: rgba(255, 255, 255, 0.69); border-right-color: rgba(255, 255, 255, 0.69); border-left-color: rgba(255, 255, 255, 0.69);">Tính năng</th><th style="text-align: left; border-bottom: 1px solid rgba(255, 255, 255, 0.69); padding: 5px 10px; border-top-color: rgba(255, 255, 255, 0.69); border-right-color: rgba(255, 255, 255, 0.69); border-left-color: rgba(255, 255, 255, 0.69);">etcd</th><th style="text-align: left; border-bottom: 1px solid rgba(255, 255, 255, 0.69); padding: 5px 10px; border-top-color: rgba(255, 255, 255, 0.69); border-right-color: rgba(255, 255, 255, 0.69); border-left-color: rgba(255, 255, 255, 0.69);">Consul</th><th style="text-align: left; border-bottom: 1px solid rgba(255, 255, 255, 0.69); padding: 5px 10px; border-top-color: rgba(255, 255, 255, 0.69); border-right-color: rgba(255, 255, 255, 0.69); border-left-color: rgba(255, 255, 255, 0.69);">ZooKeeper</th></tr></thead><tbody><tr><td style="padding: 5px 10px;"><strong class="sc-jzJRlG fjmzee" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe WPC&quot;, &quot;Segoe UI&quot;, Ubuntu, &quot;Droid Sans&quot;, sans-serif; overflow-wrap: break-word;">Ngôn ngữ</strong></td><td style="padding: 5px 10px;">Go</td><td style="padding: 5px 10px;">Go</td><td style="padding: 5px 10px;">Java</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);"><strong class="sc-jzJRlG fjmzee" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe WPC&quot;, &quot;Segoe UI&quot;, Ubuntu, &quot;Droid Sans&quot;, sans-serif; overflow-wrap: break-word;">Consensus</strong></td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Raft</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Raft</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">ZAB (Paxos-like)</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);"><strong class="sc-jzJRlG fjmzee" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe WPC&quot;, &quot;Segoe UI&quot;, Ubuntu, &quot;Droid Sans&quot;, sans-serif; overflow-wrap: break-word;">API</strong></td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">gRPC, HTTP</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">HTTP, DNS</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Custom protocol</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);"><strong class="sc-jzJRlG fjmzee" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe WPC&quot;, &quot;Segoe UI&quot;, Ubuntu, &quot;Droid Sans&quot;, sans-serif; overflow-wrap: break-word;">Setup</strong></td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Đơn giản</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Trung bình</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Phức tạp</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);"><strong class="sc-jzJRlG fjmzee" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe WPC&quot;, &quot;Segoe UI&quot;, Ubuntu, &quot;Droid Sans&quot;, sans-serif; overflow-wrap: break-word;">Performance</strong></td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Cao</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Cao</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Trung bình</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);"><strong class="sc-jzJRlG fjmzee" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe WPC&quot;, &quot;Segoe UI&quot;, Ubuntu, &quot;Droid Sans&quot;, sans-serif; overflow-wrap: break-word;">Tài liệu</strong></td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Tốt</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Rất tốt</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Trung bình</td></tr><tr><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);"><strong class="sc-jzJRlG fjmzee" style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe WPC&quot;, &quot;Segoe UI&quot;, Ubuntu, &quot;Droid Sans&quot;, sans-serif; overflow-wrap: break-word;">Sử dụng</strong></td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Kubernetes, Patroni</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Service mesh, HA</td><td style="padding: 5px 10px; border-top: 1px solid rgba(255, 255, 255, 0.18); border-right-color: rgba(255, 255, 255, 0.18); border-bottom-color: rgba(255, 255, 255, 0.18); border-left-color: rgba(255, 255, 255, 0.18);">Hadoop, Kafka</td></tr></tbody></table>
<!--kg-card-end: html-->
<p><strong>Khuyến nghị</strong>: etcd cho hầu hết các trường hợp vì đơn giản và hiệu năng cao.</p><h3 id="etcddistributed-key-value-store">etcd - Distributed Key-Value Store</h3><p><strong>Đặc điểm chính</strong>:</p><ul><li>Strongly consistent (CAP theorem: CP)</li><li>Distributed và highly available</li><li>Fast (sub-millisecond latency)</li><li>Simple API</li><li>Watch mechanism cho real-time updates</li></ul><p><strong>Cấu trúc dữ liệu trong etcd cho Patroni</strong>:</p><pre><code>/service/postgres/
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
</code></pre><h2 id="3-consensus-algorithmraft">3. Consensus Algorithm - Raft</h2><h3 id="raft-l%C3%A0-g%C3%AC">Raft là gì?</h3><p>Raft là thuật toán consensus được thiết kế để dễ hiểu hơn Paxos, đảm bảo:</p><ul><li><strong>Safety</strong>: Không bao giờ trả về kết quả sai</li><li><strong>Liveness</strong>: Luôn có tiến triển (khi majority nodes hoạt động)</li><li><strong>Consistency</strong>: Tất cả nodes nhìn thấy cùng một trạng thái</li></ul><h3 id="c%C3%A1c-vai-tr%C3%B2-trong-raft">Các vai trò trong Raft</h3><ol><li><strong>Leader</strong>:<ul><li>Xử lý tất cả client requests</li><li>Replicate log entries đến followers</li><li>Duy nhất trong một term</li></ul></li><li><strong>Follower</strong>:<ul><li>Passive, chỉ nhận requests từ leader</li><li>Nếu không nhận heartbeat, trở thành candidate</li></ul></li><li><strong>Candidate</strong>:<ul><li>Follower timeout thành candidate</li><li>Request votes từ các nodes khác</li><li>Nếu thắng bầu cử → Leader</li></ul></li></ol><h3 id="quy-tr%C3%ACnh-leader-election">Quy trình Leader Election</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/5f8f0cd1-cf7c-456f-ae89-226a8adf5dfe-1-201-a-71258047.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">The Leader Election Process is crucial for ensuring the consistency and availability of the distributed system.</span></figcaption></figure><p><strong>Chi tiết bầu cử</strong>:</p><ol><li>Follower không nhận heartbeat trong election timeout (150-300ms ngẫu nhiên)</li><li>Chuyển thành Candidate, tăng term number</li><li>Vote cho chính mình</li><li>Gửi RequestVote RPC đến tất cả nodes</li><li>Nếu nhận được majority votes (n/2 + 1):<ul><li>Trở thành Leader</li><li>Gửi heartbeat ngay lập tức</li></ul></li><li>Nếu timeout hoặc thua cuộc:<ul><li>Quay lại Follower hoặc bắt đầu election mới</li></ul></li></ol><h3 id="quorum-v%C3%A0-majority">Quorum và Majority</h3><p><strong>Quorum</strong>: Số lượng nodes tối thiểu cần để hệ thống hoạt động</p><pre><code>Cluster size | Quorum | Tolerated failures
-------------|--------|-------------------
     1       |   1    |        0
     3       |   2    |        1
     5       |   3    |        2
     7       |   4    |        3
</code></pre><p><strong>Công thức</strong>: Quorum = floor(n/2) + 1</p><p><strong>Ví dụ với 3 nodes</strong>:</p><ul><li>✅ 3 nodes active: Cluster healthy</li><li>✅ 2 nodes active: Cluster works (quorum met)</li><li>❌ 1 node active: Cluster stops (no quorum)</li></ul><p><strong>Khuyến nghị</strong>: Luôn dùng số lẻ nodes (3, 5, 7) để tối ưu fault tolerance.</p><h2 id="4-leader-election-trong-patroni">4. Leader Election trong Patroni</h2><h3 id="c%C6%A1-ch%E1%BA%BF-leader-lock">Cơ chế Leader Lock</h3><p>Patroni sử dụng DCS để implement distributed lock:</p><p><strong>Leader Lock Properties</strong>:</p><pre><code class="language-yaml">Key: /service/postgres/leader
Value: 
  {
    "version": "3.0.2",
    "conn_url": "postgres://node1:5432/postgres",
    "api_url": "http://node1:8008/patroni",
    "xlog_location": 123456789,
    "timeline": 2
  }
TTL: 30 seconds
</code></pre><h3 id="quy-tr%C3%ACnh-leader-election-1">Quy trình Leader Election</h3><p><strong>Bước 1: Race Condition</strong></p><pre><code>Time: T0 - Leader crashes
Node1: Check DCS → No leader key exists
Node2: Check DCS → No leader key exists  
Node3: Check DCS → No leader key exists
</code></pre><p><strong>Bước 2: Acquire Lock Attempt</strong></p><pre><code>Time: T0 + 100ms
Node1: Try acquire lock → SUCCESS (first to write)
Node2: Try acquire lock → FAILED (key exists)
Node3: Try acquire lock → FAILED (key exists)
</code></pre><p><strong>Bước 3: Role Assignment</strong></p><pre><code>Node1: Promote PostgreSQL to Primary
Node2: Configure as Replica, point to Node1
Node3: Configure as Replica, point to Node1
</code></pre><p><strong>Bước 4: Maintenance</strong></p><pre><code>Every 10 seconds:
Node1 (Leader): 
  - Renew lock (TTL extension)
  - Update xlog_location
  - Send heartbeat

Node2/3 (Followers):
  - Monitor leader key
  - Check replication lag
  - Ready to take over
</code></pre><h3 id="ti%C3%AAu-ch%C3%AD-ch%E1%BB%8Dn-best-replica">Tiêu chí chọn Best Replica</h3><p>Khi failover, Patroni chọn replica dựa trên:</p><ol><li><strong>Replication state</strong>:<ul><li><code>streaming</code>&nbsp;&gt;&nbsp;<code>in archive recovery</code></li></ul></li><li><strong>Timeline</strong>: Timeline cao hơn được ưu tiên</li><li><strong>XLog position</strong>:<ul><li>Replica có LSN gần primary nhất</li><li>Ít data loss nhất</li></ul></li><li><strong>No replication lag</strong>:<ul><li><code>pg_stat_replication.replay_lag = 0</code></li></ul></li><li><strong>Explicit candidate</strong>: Set trong configuration</li></ol><p><strong>Priority tag</strong>:</p><pre><code class="language-yaml">tags:
  nofailover: false
  noloadbalance: false
  clonefrom: false
  nosync: false
</code></pre><p><strong>Ví dụ</strong>:</p><pre><code>Primary fails at LSN: 0/3000000

Replica1: LSN=0/3000000, lag=0s     ← BEST CHOICE
Replica2: LSN=0/2FFFFFF, lag=1s
Replica3: LSN=0/2FFFFFE, lag=2s

→ Patroni promotes Replica1
</code></pre><h2 id="5-failover-mechanism">5. Failover Mechanism</h2><h3 id="automatic-failover-process">Automatic Failover Process</h3><p><strong>Timeline chi tiết</strong>:</p><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/failover-mechanism-431e5241.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Automatic Failover Process</span></figcaption></figure><h3 id="c%C3%A1c-b%C6%B0%E1%BB%9Bc-failover-chi-ti%E1%BA%BFt">Các bước failover chi tiết</h3><p><strong>Step 1: Detect failure</strong></p><pre><code class="language-python"># Patroni health check loop
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
</code></pre><p><strong>Step 3: Replica promotion</strong></p><pre><code class="language-bash"># Patroni on promoted replica
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
</code></pre><p><strong>Step 5: Followers repoint</strong></p><pre><code class="language-bash"># Other replicas
INFO: New leader detected: node2
INFO: Updating primary_conninfo
INFO: Restarting replication
</code></pre><h3 id="monitoring-failover">Monitoring Failover</h3><p><strong>Các metrics quan trọng</strong>:</p><ul><li><code>patroni_primary_timeline</code>: Phát hiện timeline changes</li><li><code>patroni_xlog_location</code>: Theo dõi WAL position</li><li><code>patroni_replication_lag</code>: Lag trước failover</li><li><code>patroni_failover_count</code>: Đếm số lần failover</li></ul><h2 id="6-split-brain-problem">6. Split-Brain Problem</h2><h3 id="split-brain-l%C3%A0-g%C3%AC">Split-Brain là gì?</h3><p><strong>Định nghĩa</strong>: Tình huống có ≥2 nodes nghĩ mình là Primary, ghi dữ liệu khác nhau → Data divergence.</p><h3 id="nguy%C3%AAn-nh%C3%A2n">Nguyên nhân</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/network-partition-325c19b8.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><b><strong style="white-space: pre-wrap;">Network Partition</strong></b></figcaption></figure><ol><li><strong>Network Partition</strong></li><li><strong>DCS partition</strong>: etcd cluster split</li><li><strong>Slow network</strong>: Heartbeat timeout nhưng node vẫn sống</li></ol><h3 id="h%E1%BA%ADu-qu%E1%BA%A3-c%E1%BB%A7a-split-brain">Hậu quả của Split-Brain</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/ha-u-qua-cu-a-split-brain-87165730.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Hậu quả của Split-Brain</span></figcaption></figure><h3 id="patronis-split-brain-prevention">Patroni's Split-Brain Prevention</h3><p><strong>Cơ chế 1: DCS-based Lock (Primary)</strong></p><pre><code class="language-python">def maintain_leader_lock():
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
</code></pre><p><strong>Cơ chế 2: Leader Key Verification</strong></p><pre><code class="language-python">def before_handle_write():
    leader_key = dcs.get("/service/postgres/leader")
    
    if leader_key.owner != my_node_name:
        # I'm not the real leader!
        raise Exception("Not leader anymore")
        demote_immediately()
</code></pre><p><strong>Cơ chế 3: Timeline Divergence Detection</strong></p><pre><code class="language-sql">-- PostgreSQL timeline
SELECT timeline_id FROM pg_control_checkpoint();

-- If timelines diverge:
-- Node1: timeline=5
-- Node2: timeline=6
-- → Data inconsistency detected
-- → Requires pg_rewind or rebuild
</code></pre><h3 id="quorum-requirement">Quorum requirement</h3><p><strong>etcd với 3 nodes</strong>:</p><pre><code>Scenario 1: Network partition 1-2 split
  Partition A: Node1 (1 node)
    - Cannot get quorum (1 &lt; 2)
    - Cannot write to etcd
    - Demotes to standby ✓
  
  Partition B: Node2, Node3 (2 nodes)
    - Has quorum (2 ≥ 2)
    - Can elect leader
    - Node2 becomes primary ✓
  
Result: Only 1 primary exists ✓
</code></pre><p><strong>Scenario 2: Complete isolation</strong></p><pre><code>Node1: Isolated, loses DCS
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
</code></pre><p><strong>Hoạt động</strong>:</p><ol><li>Patroni kicks watchdog device every 10s</li><li>If Patroni hangs or loses DCS → stops kicking</li><li>After timeout → Watchdog reboots entire node</li><li>Prevents "zombie primary" scenario</li></ol><h3 id="best-practices-%C4%91%E1%BB%83-tr%C3%A1nh-split-brain">Best Practices để tránh Split-Brain</h3><ol><li><strong>Deploy DCS riêng biệt</strong>: etcd cluster ở các AZ khác nhau</li><li><strong>Monitor DCS health</strong>: Alert khi etcd không khỏe</li><li><strong>Network redundancy</strong>: Nhiều đường network giữa nodes</li><li><strong>Proper timeouts</strong>:</li></ol><pre><code class="language-yaml">patroni:
  ttl: 30              # Leader lock TTL
  loop_wait: 10        # Check interval
  retry_timeout: 10    # DCS operation timeout
</code></pre><ol start="5"><li><strong>Enable watchdog</strong>: Hardware protection layer</li><li><strong>Monitoring</strong>:</li></ol><pre><code class="language-bash"># Check for timeline divergence
patronictl list

# Expected: All nodes same timeline
+ Cluster: postgres (7001234567890123456) ----+----+-----------+
| Member | Host         | Role    | State   | TL | Lag in MB |
+--------+--------------+---------+---------+----+-----------+
| node1  | 10.0.1.1:5432| Leader  | running | 5  |           |
| node2  | 10.0.1.2:5432| Replica | running | 5  |         0 |
| node3  | 10.0.1.3:5432| Replica | running | 5  |         0 |
+--------+--------------+---------+---------+----+-----------+
</code></pre><h3 id="recovery-t%E1%BB%AB-split-brain">Recovery từ Split-Brain</h3><p>Nếu xảy ra split-brain:</p><p><strong>Step 1: Identify</strong></p><pre><code class="language-bash"># Check timeline
patronictl list
# node1: timeline=5
# node2: timeline=6  ← DIVERGED!
</code></pre><p><strong>Step 2: Choose primary</strong></p><ul><li>Chọn node có data quan trọng hơn</li><li>Hoặc node có timeline cao hơn</li></ul><p><strong>Step 3: Rebuild diverged replica</strong></p><pre><code class="language-bash"># Option 1: pg_rewind (if safe)
patronictl reinit postgres node2

# Option 2: Full rebuild
patronictl remove postgres node2
# Then: reinitialize from scratch
</code></pre><p><strong>Step 4: Verify</strong></p><pre><code class="language-bash">patronictl list
# All nodes same timeline ✓
</code></pre><h2 id="7-t%E1%BB%95ng-k%E1%BA%BFt">7. Tổng kết</h2><h3 id="key-takeaways">Key Takeaways</h3><p>✅&nbsp;<strong>Patroni</strong>: Template HA tự động hóa quản lý PostgreSQL cluster</p><p>✅&nbsp;<strong>DCS (etcd)</strong>: Distributed coordination, store configuration và leader lock</p><p>✅&nbsp;<strong>Raft consensus</strong>: Đảm bảo consistency và leader election trong etcd</p><p>✅&nbsp;<strong>Leader election</strong>: Automatic, fast (~30-40s), based on TTL locks</p><p>✅&nbsp;<strong>Failover</strong>: Tự động promote replica tốt nhất khi primary fails</p><p>✅&nbsp;<strong>Split-brain prevention</strong>: DCS quorum + TTL locks + watchdog</p><h3 id="ki%E1%BA%BFn-tr%C3%BAc-t%E1%BB%95ng-h%E1%BB%A3p">Kiến trúc tổng hợp</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/kien-truc-tong-hop-5f082dc1.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Kiến trúc tổng hợp</span></figcaption></figure><h3 id="c%C3%A2u-h%E1%BB%8Fi-%C3%B4n-t%E1%BA%ADp">Câu hỏi ôn tập</h3><ol><li>Patroni khác gì với Streaming Replication thuần?</li><li>Tại sao cần DCS? Không thể dùng database để lưu state được không?</li><li>Quorum trong cluster 5 nodes là bao nhiêu?</li><li>Patroni chọn replica nào để promote khi failover?</li><li>Split-brain xảy ra như thế nào và Patroni ngăn chặn ra sao?</li><li>Timeline trong PostgreSQL có ý nghĩa gì?</li><li>TTL 30 seconds nghĩa là gì? Tại sao không set TTL = 5 seconds?</li></ol><h3 id="chu%E1%BA%A9n-b%E1%BB%8B-cho-b%C3%A0i-ti%E1%BA%BFp-theo">Chuẩn bị cho bài tiếp theo</h3><p>Bài 4 sẽ hướng dẫn chuẩn bị hạ tầng:</p><ul><li>Setup 3 VMs/Servers</li><li>Cấu hình network, firewall</li><li>SSH keys, time sync</li><li>Dependencies cần thiết</li></ul>
