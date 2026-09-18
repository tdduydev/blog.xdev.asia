---
id: 019c9617-fb5e-71a4-b3a1-a77a7c225818
title: 'Bài 1: Tổng quan về PostgreSQL High Availability'
slug: bai-1-tong-quan-ve-postgresql-high-availability
description: >-
  Tìm hiểu lý do cần High Availability, so sánh các giải pháp HA phổ biến
  (Patroni, Repmgr, Pacemaker) và nắm vững kiến trúc tổng quan của hệ thống
  PostgreSQL HA.
duration_minutes: 110
is_free: true
video_url: null
sort_order: 1
section_title: "Phần 1: Tổng quan & Nền tảng"
course:
  id: 019c9617-fad7-7170-97f5-55c1940af2f5
  title: PostgreSQL High Availability với Patroni & etcd
  slug: postgresql-high-availability-voi-patroni-etcd
---
<h2 id="m%E1%BB%A5c-ti%C3%AAu-b%C3%A0i-h%E1%BB%8Dc">Mục tiêu bài học</h2><p>Sau bài học này, bạn sẽ:</p><ul><li>Hiểu được tại sao High Availability (HA) quan trọng cho hệ thống database</li><li>Nắm vững các phương pháp triển khai HA cho PostgreSQL</li><li>So sánh được ưu nhược điểm của Patroni, Repmgr và Pacemaker</li><li>Hiểu kiến trúc tổng quan của hệ thống PostgreSQL HA</li></ul><hr><h2 id="1-t%E1%BA%A1i-sao-c%E1%BA%A7n-high-availability">1. Tại sao cần High Availability?</h2><h3 id="11-v%E1%BA%A5n-%C4%91%E1%BB%81-v%E1%BB%9Bi-single-point-of-failure-spof">1.1. Vấn đề với Single Point of Failure (SPOF)</h3><p>Trong một hệ thống database truyền thống với single server:</p><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/single-point-of-failure-spof-93370e03.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Single Point of Failure (SPOF)</span></figcaption></figure><p><strong>Hậu quả khi database server gặp sự cố:</strong></p><ul><li><strong>Downtime</strong>: Ứng dụng không thể truy cập dữ liệu</li><li><strong>Mất doanh thu</strong>: Mỗi phút downtime có thể tốn hàng triệu đồng</li><li><strong>Mất uy tín</strong>: Người dùng không thể sử dụng dịch vụ</li><li><strong>Mất dữ liệu</strong>: Nếu không có backup kịp thời</li></ul><h3 id="12-c%C3%A1c-nguy%C3%AAn-nh%C3%A2n-g%C3%A2y-downtime-ph%E1%BB%95-bi%E1%BA%BFn">1.2. Các nguyên nhân gây downtime phổ biến</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Nguyên nhân</th>
<th>Tỷ lệ</th>
<th>Ảnh hưởng</th>
</tr>
</thead>
<tbody>
<tr>
<td>Lỗi phần cứng (disk, RAM, CPU)</td>
<td>30%</td>
<td>Cao</td>
</tr>
<tr>
<td>Lỗi mạng</td>
<td>20%</td>
<td>Trung bình</td>
</tr>
<tr>
<td>Lỗi phần mềm/bug</td>
<td>25%</td>
<td>Cao</td>
</tr>
<tr>
<td>Maintenance có kế hoạch</td>
<td>15%</td>
<td>Có thể kiểm soát</td>
</tr>
<tr>
<td>Lỗi con người</td>
<td>10%</td>
<td>Cao</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="13-high-availability-l%C3%A0-g%C3%AC">1.3. High Availability là gì?</h3><p><strong>High Availability (HA)</strong> là khả năng hệ thống duy trì hoạt động liên tục ngay cả khi một hoặc nhiều thành phần gặp sự cố.</p><p><strong>Các chỉ số đo lường HA:</strong></p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Availability</th>
<th>Downtime/năm</th>
<th>Downtime/tháng</th>
<th>Mức độ</th>
</tr>
</thead>
<tbody>
<tr>
<td>99% (2 nines)</td>
<td>3.65 ngày</td>
<td>7.2 giờ</td>
<td>Thấp</td>
</tr>
<tr>
<td>99.9% (3 nines)</td>
<td>8.76 giờ</td>
<td>43.2 phút</td>
<td>Trung bình</td>
</tr>
<tr>
<td>99.99% (4 nines)</td>
<td>52.56 phút</td>
<td>4.32 phút</td>
<td>Cao</td>
</tr>
<tr>
<td>99.999% (5 nines)</td>
<td>5.26 phút</td>
<td>25.9 giây</td>
<td>Rất cao</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="14-l%E1%BB%A3i-%C3%ADch-c%E1%BB%A7a-ha">1.4. Lợi ích của HA</h3><p><strong>Business Benefits:</strong></p><ul><li>Giảm thiểu downtime và mất doanh thu</li><li>Tăng độ tin cậy của hệ thống</li><li>Cải thiện trải nghiệm người dùng</li><li>Đáp ứng SLA (Service Level Agreement)</li></ul><p><strong>Technical Benefits:</strong></p><ul><li>Tự động failover khi primary server gặp sự cố</li><li>Zero-downtime maintenance</li><li>Load balancing cho read queries</li><li>Disaster recovery</li><li>Data protection</li></ul><hr><h2 id="2-c%C3%A1c-ph%C6%B0%C6%A1ng-ph%C3%A1p-ha-cho-postgresql">2. Các phương pháp HA cho PostgreSQL</h2><h3 id="21-log-shipping-wal-shipping">2.1. Log-Shipping (WAL Shipping)</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/log-shipping-wal-shipping-1-d17d26c9.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Log-Shipping (WAL Shipping)</span></figcaption></figure><p><strong>Cách hoạt động:</strong></p><ul><li>Primary server ghi WAL (Write-Ahead Log) files</li><li>WAL files được copy sang standby server</li><li>Standby server replay WAL để đồng bộ dữ liệu</li></ul><p><strong>Ưu điểm:</strong></p><ul><li>Đơn giản, dễ setup</li><li>Ít tốn tài nguyên</li></ul><p><strong>Nhược điểm:</strong></p><ul><li>Recovery Time Objective (RTO) cao (phút → giờ)</li><li>Không có automatic failover</li><li>Data loss có thể xảy ra</li><li>Standby không thể query (warm standby)</li></ul><h3 id="22-streaming-replication">2.2. Streaming Replication</h3><p><strong>Cách hoạt động:</strong></p><ul><li>Primary stream WAL records realtime đến standby</li><li>Standby apply changes ngay lập tức</li><li>Standby có thể serve read queries (hot standby)</li></ul><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/log-shipping-wal-shipping-14c7348d.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Log-Shipping (WAL Shipping)</span></figcaption></figure><p><strong>Ưu điểm:</strong></p><ul><li>Latency thấp (&lt; 1 giây)</li><li>Hot standby có thể serve read queries</li><li>Synchronous mode giảm data loss</li></ul><p><strong>Nhược điểm:</strong></p><ul><li>Vẫn cần manual failover</li><li>Cần công cụ bên ngoài để tự động hóa</li></ul><h3 id="23-logical-replication">2.3. Logical Replication</h3><p><strong>Cách hoạt động:</strong></p><ul><li>Replicate ở mức logical (tables, rows)</li><li>Cho phép replicate selective data</li><li>Publisher → Subscriber model</li></ul><p><strong>Ưu điểm:</strong></p><ul><li>Replication giữa các PostgreSQL versions khác nhau</li><li>Selective replication (chỉ một số tables)</li><li>Multi-master có thể (với BDR)</li></ul><p><strong>Nhược điểm:</strong></p><ul><li>Overhead cao hơn physical replication</li><li>Không phải giải pháp HA chính (thường dùng cho data distribution)</li></ul><h3 id="24-shared-storage-san">2.4. Shared Storage (SAN)</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/shared-storage-san-c198e575.webp" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Shared Storage (SAN)</span></figcaption></figure><p><strong>Ưu điểm:</strong></p><ul><li>Failover nhanh (chỉ cần start PostgreSQL)</li><li>Không có data loss</li></ul><p><strong>Nhược điểm:</strong></p><ul><li>Đắt (cần SAN infrastructure)</li><li>SAN trở thành single point of failure</li><li>Phức tạp để maintain</li></ul><hr><h2 id="3-so-s%C3%A1nh-patroni-vs-repmgr-vs-pacemaker">3. So sánh: Patroni vs Repmgr vs Pacemaker</h2><h3 id="31-patroni">3.1. Patroni</h3><p><strong>Đặc điểm:</strong></p><ul><li>Python-based</li><li>Sử dụng DCS (etcd, Consul, ZooKeeper) để lưu cluster state</li><li>REST API cho management</li><li>Automatic failover thông minh</li><li>Template-based configuration</li></ul><p><strong>Ưu điểm:</strong></p><ul><li>✅ Dễ cài đặt và cấu hình</li><li>✅ REST API mạnh mẽ</li><li>✅ Tích hợp tốt với Kubernetes</li><li>✅ Active development, community lớn</li><li>✅ Automatic leader election</li><li>✅ Rolling restart, zero-downtime updates</li></ul><p><strong>Nhược điểm:</strong></p><ul><li>❌ Phụ thuộc vào DCS (thêm component)</li><li>❌ Cần học DCS (etcd/Consul)</li></ul><p><strong>Use cases phù hợp:</strong></p><ul><li>Cloud-native applications</li><li>Kubernetes deployments</li><li>Microservices architecture</li><li>Cần automation cao</li></ul><h3 id="32-repmgr">3.2. Repmgr</h3><p><strong>Đặc điểm:</strong></p><ul><li>Open-source tool từ 2ndQuadrant (EnterpriseDB)</li><li>Standalone tool, không cần DCS</li><li>Witness node cho quorum voting</li><li>Command-line based management</li></ul><p><strong>Ưu điểm:</strong></p><ul><li>✅ Không cần DCS bên ngoài</li><li>✅ Đơn giản hơn Patroni</li><li>✅ Documentation tốt</li><li>✅ Mature và stable</li></ul><p><strong>Nhược điểm:</strong></p><ul><li>❌ Ít tính năng automation hơn Patroni</li><li>❌ Không có REST API</li><li>❌ Community nhỏ hơn</li><li>❌ Failover phức tạp hơn</li></ul><p><strong>Use cases phù hợp:</strong></p><ul><li>Traditional infrastructure</li><li>Đơn giản, ít nodes</li><li>Không muốn thêm DCS</li></ul><h3 id="33-pacemaker-corosync">3.3. Pacemaker + Corosync</h3><p><strong>Đặc điểm:</strong></p><ul><li>High Availability cluster framework (Linux-HA)</li><li>Quản lý nhiều loại resources, không chỉ PostgreSQL</li><li>Voting quorum mechanism</li><li>Fencing/STONITH để tránh split-brain</li></ul><p><strong>Ưu điểm:</strong></p><ul><li>✅ Mature, production-proven (20+ years)</li><li>✅ Quản lý nhiều services (PostgreSQL, web server, etc.)</li><li>✅ Fencing mechanism mạnh mẽ</li><li>✅ Hỗ trợ shared storage</li></ul><p><strong>Nhược điểm:</strong></p><ul><li>❌ Rất phức tạp để setup và maintain</li><li>❌ Learning curve cao</li><li>❌ Configuration dạng XML khó đọc</li><li>❌ Debugging khó khăn</li></ul><p><strong>Use cases phù hợp:</strong></p><ul><li>Enterprise environment</li><li>Cần quản lý nhiều services</li><li>Có shared storage (SAN)</li><li>Team có kinh nghiệm với Pacemaker</li></ul><h3 id="34-b%E1%BA%A3ng-so-s%C3%A1nh-t%E1%BB%95ng-quan">3.4. Bảng so sánh tổng quan</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Tiêu chí</th>
<th>Patroni</th>
<th>Repmgr</th>
<th>Pacemaker</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Độ phức tạp</strong></td>
<td>Trung bình</td>
<td>Thấp</td>
<td>Cao</td>
</tr>
<tr>
<td><strong>Learning curve</strong></td>
<td>Trung bình</td>
<td>Thấp</td>
<td>Rất cao</td>
</tr>
<tr>
<td><strong>Setup time</strong></td>
<td>Nhanh</td>
<td>Nhanh</td>
<td>Chậm</td>
</tr>
<tr>
<td><strong>Automatic failover</strong></td>
<td>✅ Xuất sắc</td>
<td>✅ Tốt</td>
<td>✅ Xuất sắc</td>
</tr>
<tr>
<td><strong>REST API</strong></td>
<td>✅ Có</td>
<td>❌ Không</td>
<td>❌ Không</td>
</tr>
<tr>
<td><strong>Kubernetes support</strong></td>
<td>✅ Xuất sắc</td>
<td>⚠️ Limited</td>
<td>❌ Không</td>
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
<td><strong>Dependencies</strong></td>
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
<h3 id="35-khuy%E1%BA%BFn-ngh%E1%BB%8B">3.5. Khuyến nghị</h3><p><strong>Chọn Patroni nếu:</strong></p><ul><li>Triển khai trên cloud hoặc Kubernetes</li><li>Cần automation và REST API</li><li>Team có kinh nghiệm với modern DevOps tools</li><li>✅ <strong>Đây là lựa chọn phổ biến nhất hiện nay</strong></li></ul><p><strong>Chọn Repmgr nếu:</strong></p><ul><li>Setup đơn giản, ít nodes (2-3)</li><li>Không muốn phụ thuộc vào DCS</li><li>Team quen với PostgreSQL traditional tools</li></ul><p><strong>Chọn Pacemaker nếu:</strong></p><ul><li>Môi trường enterprise phức tạp</li><li>Đã có sẵn Pacemaker infrastructure</li><li>Cần quản lý nhiều services cùng lúc</li><li>Có shared storage (SAN)</li></ul><hr><h2 id="4-ki%E1%BA%BFn-tr%C3%BAc-t%E1%BB%95ng-quan-h%E1%BB%87-th%E1%BB%91ng-patroni-etcd">4. Kiến trúc tổng quan hệ thống Patroni + etcd</h2><h3 id="41-ki%E1%BA%BFn-tr%C3%BAc-3-node-cluster">4.1. Kiến trúc 3-node cluster</h3><figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/11/kie-n-tru-c-to-ng-quan-he-tho-ng-patroni-etcd-d34eb94c.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Kiến trúc tổng quan hệ thống Patroni + etcd</span></figcaption></figure><h3 id="42-c%C3%A1c-th%C3%A0nh-ph%E1%BA%A7n-ch%C3%ADnh">4.2. Các thành phần chính</h3><h4 id="postgresql"><strong>PostgreSQL</strong></h4><ul><li>Database engine chính</li><li>Một node là Leader (read/write)</li><li>Các node khác là Replica (read-only)</li><li>Sử dụng Streaming Replication để đồng bộ</li></ul><h4 id="patroni"><strong>Patroni</strong></h4><ul><li>Quản lý lifecycle của PostgreSQL</li><li>Monitor health của nodes</li><li>Thực hiện automatic failover</li><li>Expose REST API (:8008) để query cluster state</li><li>Đọc/ghi configuration vào DCS</li></ul><h4 id="etcd-dcsdistributed-configuration-store"><strong>etcd (DCS - Distributed Configuration Store)</strong></h4><ul><li>Lưu trữ cluster state và configuration</li><li>Leader election (quyết định node nào là Leader)</li><li>Distributed lock mechanism</li><li>3 nodes etcd tạo thành quorum (majority voting)</li></ul><h4 id="haproxy-optional-nh%C6%B0ng-khuy%E1%BA%BFn-ngh%E1%BB%8B"><strong>HAProxy (optional nhưng khuyến nghị)</strong></h4><ul><li>Load balancer</li><li>Route write traffic → Leader</li><li>Route read traffic → Replicas (round-robin)</li><li>Health check và tự động route khi failover</li></ul><h3 id="43-lu%E1%BB%93ng-ho%E1%BA%A1t-%C4%91%E1%BB%99ng">4.3. Luồng hoạt động</h3><p><strong>1. Normal Operations (Trạng thái bình thường)</strong></p><pre><code>1. Application gửi query → HAProxy
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
</code></pre><p><strong>4. Sau Failover</strong></p><pre><code>- Node 2 trở thành Leader mới
- Node 3 vẫn là Replica, đổi replication source sang Node 2
- HAProxy tự động detect và route traffic sang Node 2
- Node 1 (khi recover) sẽ join lại như Replica
</code></pre><h3 id="44-c%C3%A1c-scenario-quan-tr%E1%BB%8Dng">4.4. Các scenario quan trọng</h3><h4 id="scenario-1-planned-switchover"><strong>Scenario 1: Planned Switchover</strong></h4><pre><code class="language-bash"># Admin muốn maintenance Node 1 (Leader)
$ patronictl switchover postgres-cluster

# Patroni sẽ:
1. Tạm dừng ghi vào Leader hiện tại
2. Đợi Replica sync hoàn toàn (zero lag)
3. Promote Replica → Leader
4. Demote Leader cũ → Replica
5. Zero data loss, downtime &lt; 5s
</code></pre><h4 id="scenario-2-split-brain-prevention"><strong>Scenario 2: Split-brain Prevention</strong></h4><pre><code>Tình huống: Network partition giữa nodes

etcd quorum (3 nodes):
- Partition A: Node 1, Node 2 (2 nodes = majority)
- Partition B: Node 3 (1 node = minority)

Kết quả:
✅ Partition A: Tiếp tục hoạt động, có thể elect leader
❌ Partition B: Không thể elect leader (không đủ quorum)

→ Tránh được 2 leaders cùng tồn tại!
</code></pre><h4 id="scenario-3-node-recovery"><strong>Scenario 3: Node Recovery</strong></h4><pre><code>Node 1 recover sau khi die:

1. Patroni start và đọc cluster state từ etcd
2. Nhận ra Node 2 đang là Leader
3. Tự động rejoin như Replica
4. Sử dụng pg_rewind để sync data nếu có divergence
5. Bắt đầu streaming replication từ Node 2
</code></pre><h3 id="45-c%E1%BA%A5u-h%C3%ACnh-timeline-th%C3%B4ng-s%E1%BB%91-quan-tr%E1%BB%8Dng">4.5. Cấu hình timeline (thông số quan trọng)</h3><pre><code class="language-yaml"># patroni.yml
bootstrap:
  dcs:
    ttl: 30                    # Leader lease time (30s)
    loop_wait: 10              # Check interval (10s)
    retry_timeout: 10          # Retry time
    maximum_lag_on_failover: 1048576  # Max lag for failover candidate (1MB)
</code></pre><p><strong>Giải thích:</strong></p><ul><li><code>ttl: 30</code>: Leader phải renew lease mỗi 30s, nếu không sẽ bị coi là dead</li><li><code>loop_wait: 10</code>: Patroni check health mỗi 10s</li><li>Failover trigger: khi (ttl - loop_wait) hết → ~20-30s</li></ul><hr><h2 id="5-t%E1%BB%95ng-k%E1%BA%BFt">5. Tổng kết</h2><h3 id="key-takeaways">Key Takeaways</h3><ol><li><strong>High Availability là bắt buộc</strong> cho production systems để giảm downtime và mất dữ liệu</li><li><strong>Streaming Replication + Automatic Failover</strong> là phương pháp HA phổ biến nhất cho PostgreSQL</li><li><strong>Patroni là lựa chọn tốt nhất</strong> cho hầu hết use cases hiện đại:<ul><li>Dễ setup và maintain</li><li>Automatic failover thông minh</li><li>REST API mạnh mẽ</li><li>Tích hợp tốt với cloud/K8s</li></ul></li><li><strong>Kiến trúc 3-node</strong> với Patroni + etcd cung cấp:<ul><li>Automatic failover (RTO &lt; 30s)</li><li>Zero data loss với sync replication</li><li>Split-brain prevention</li><li>Scalability cho read workloads</li></ul></li></ol><h3 id="b%C3%A0i-t%E1%BA%ADp-v%E1%BB%81-nh%C3%A0">Bài tập về nhà</h3><ol><li>Tính toán downtime cho hệ thống của bạn với các mức availability khác nhau (99%, 99.9%, 99.99%)</li><li>Vẽ kiến trúc HA cho use case cụ thể của bạn (số nodes, data centers, RTO/RPO requirements)</li><li>So sánh chi phí giữa việc sử dụng HA và chấp nhận downtime cho business của bạn</li></ol><h3 id="chu%E1%BA%A9n-b%E1%BB%8B-cho-b%C3%A0i-ti%E1%BA%BFp-theo">Chuẩn bị cho bài tiếp theo</h3><p>Bài 2 sẽ đi sâu vào <strong>Streaming Replication</strong> - nền tảng của PostgreSQL HA:</p><ul><li>Cơ chế hoạt động chi tiết của WAL</li><li>Synchronous vs Asynchronous replication</li><li>Replication slots</li><li>Lab: Setup replication thủ công</li></ul><hr><h2 id="t%C3%A0i-li%E1%BB%87u-tham-kh%E1%BA%A3o">Tài liệu tham khảo</h2><ul><li><a href="https://www.postgresql.org/docs/current/high-availability.html">PostgreSQL Official Documentation - High Availability</a></li><li><a href="https://github.com/patroni/patroni">Patroni GitHub Repository</a></li><li><a href="https://etcd.io/docs/">etcd Documentation</a></li><li><a href="https://www.postgresql.org/docs/current/warm-standby.html">PostgreSQL Streaming Replication</a></li></ul>
