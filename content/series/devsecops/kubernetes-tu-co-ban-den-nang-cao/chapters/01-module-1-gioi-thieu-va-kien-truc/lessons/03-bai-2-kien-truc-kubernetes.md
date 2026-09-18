---
id: 019c9618-0001-7000-8000-c1147ba22e10
title: 'BÀI 2: KIẾN TRÚC KUBERNETES'
slug: bai-2-kien-truc-kubernetes
description: >-
  Tìm hiểu kiến trúc chi tiết của Kubernetes 1.32+: Control Plane, Worker Nodes, các thành phần chính. Hiểu rõ kube-apiserver, etcd, scheduler, controller-manager, kubelet, containerd 2.0, và kube-proxy với nftables.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 2
section_title: 'Module 1: Giới thiệu & Kiến trúc Kubernetes'
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: 'KUBERNETES: TỪ CƠ BẢN ĐẾN NÂNG CAO'
  slug: kubernetes-tu-co-ban-den-nang-cao
---

<h2>Kiến Trúc Kubernetes: Từ Tổng Quan Đến Chi Tiết</h2>

<p>Kubernetes được thiết kế theo mô hình phân tán với kiến trúc master-worker rõ ràng. Để sử dụng Kubernetes hiệu quả — và đặc biệt để debug khi có sự cố — bạn cần hiểu từng thành phần làm gì, giao tiếp với nhau ra sao, và tại sao chúng được thiết kế theo cách đó. Bài học này đi sâu vào kiến trúc Kubernetes 1.32+ với những thay đổi quan trọng trong containerd 2.0, nftables mode cho kube-proxy, và lộ trình cgroup v2.</p>

<img src="/storage/uploads/2026/03/k8s-architecture-2026.webp" alt="Kubernetes Architecture - Control Plane và Worker Nodes" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h2>1. Tổng Quan Kiến Trúc: Control Plane và Worker Nodes</h2>

<p>Một Kubernetes cluster được chia thành hai nhóm node chức năng:</p>

<ul>
  <li><strong>Control Plane (Master Node)</strong>: Não bộ của cluster. Chịu trách nhiệm ra quyết định toàn cục — lên lịch chạy Pod ở đâu, phát hiện và phản hồi sự kiện cluster, duy trì trạng thái mong muốn.</li>
  <li><strong>Worker Nodes</strong>: Nơi workload thực sự chạy. Mỗi node chứa container runtime, kubelet để giao tiếp với Control Plane, và kube-proxy để xử lý network.</li>
</ul>

<p>Trong môi trường production, Control Plane thường được triển khai trên ít nhất 3 node riêng biệt để đảm bảo high availability (HA). Với Kubernetes 1.32+, các managed Kubernetes services như GKE, EKS, AKS đều ẩn hoàn toàn Control Plane — bạn chỉ tương tác qua API.</p>

<pre><code class="language-bash">┌─────────────────────────────────────────────────────────────────┐
│                        CONTROL PLANE                            │
│                                                                 │
│  ┌─────────────────┐  ┌──────────┐  ┌──────────────────────┐   │
│  │  kube-apiserver │  │   etcd   │  │  kube-scheduler      │   │
│  │  (REST Gateway) │  │  (State) │  │  (Pod Placement)     │   │
│  └────────┬────────┘  └────┬─────┘  └──────────────────────┘   │
│           │               │                                     │
│  ┌────────┴───────────────┴──────────────────────────────────┐  │
│  │            kube-controller-manager                        │  │
│  │  (Replication / Endpoints / Namespace / SA controllers)   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │          cloud-controller-manager (optional)            │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
              │                    │                    │
     ┌────────┴──────┐    ┌────────┴──────┐    ┌───────┴───────┐
     │  WORKER NODE  │    │  WORKER NODE  │    │  WORKER NODE  │
     │               │    │               │    │               │
     │  kubelet      │    │  kubelet      │    │  kubelet      │
     │  kube-proxy   │    │  kube-proxy   │    │  kube-proxy   │
     │  containerd   │    │  containerd   │    │  containerd   │
     │  ┌─────────┐  │    │  ┌─────────┐  │    │  ┌─────────┐  │
     │  │  Pod A  │  │    │  │  Pod B  │  │    │  │  Pod C  │  │
     │  └─────────┘  │    │  └─────────┘  │    │  └─────────┘  │
     └───────────────┘    └───────────────┘    └───────────────┘</code></pre>

<h2>2. Control Plane Components</h2>

<h3>2.1. kube-apiserver — Cổng Giao Tiếp Duy Nhất</h3>

<p><strong>kube-apiserver</strong> là thành phần trung tâm của Control Plane. Mọi giao tiếp trong cluster — từ kubectl của developer, từ kubelet trên worker node, từ các controller — đều phải đi qua API server. Không có thành phần nào được phép giao tiếp trực tiếp với etcd, trừ kube-apiserver.</p>

<p>Các chức năng chính của kube-apiserver:</p>

<ul>
  <li><strong>REST API Gateway</strong>: Cung cấp RESTful API theo chuẩn Kubernetes API Groups (<code>core/v1</code>, <code>apps/v1</code>, <code>networking.k8s.io/v1</code>...)</li>
  <li><strong>Authentication</strong>: Xác thực danh tính — hỗ trợ client certificates, Bearer tokens, OIDC, webhook token authentication</li>
  <li><strong>Authorization</strong>: Kiểm tra quyền truy cập qua RBAC (Role-Based Access Control), ABAC, hoặc Webhook mode</li>
  <li><strong>Admission Control</strong>: Một chuỗi các admission webhooks — validating và mutating — được áp dụng trước khi object được ghi vào etcd</li>
  <li><strong>API Aggregation</strong>: Cho phép extend API bằng custom API servers (metrics-server, custom CRDs)</li>
</ul>

<pre><code class="language-bash"># Kiểm tra trạng thái kube-apiserver
kubectl get componentstatuses

# Xem logs của kube-apiserver (trên cluster tự quản lý)
kubectl logs -n kube-system kube-apiserver-controlplane

# Kiểm tra version API
kubectl api-versions | head -20

# Xem tất cả API resources
kubectl api-resources --sort-by=kind</code></pre>

<p>Kube-apiserver là stateless — nó không lưu trữ state, chỉ đọc/ghi vào etcd. Điều này cho phép scale horizontal bằng cách chạy nhiều instance API server phía sau một load balancer.</p>

<h3>2.2. etcd — Bộ Nhớ Của Cluster</h3>

<p><strong>etcd</strong> là distributed key-value store dùng thuật toán đồng thuận Raft. Đây là nơi duy nhất lưu trữ toàn bộ state của cluster — mọi Pod, Service, ConfigMap, Secret, Node, đều được lưu ở đây dưới dạng serialized protobuf objects.</p>

<p>Đặc điểm quan trọng của etcd trong Kubernetes:</p>

<ul>
  <li><strong>Strong consistency</strong>: Raft đảm bảo mọi node trong etcd cluster đồng ý về giá trị — không có "split brain"</li>
  <li><strong>Watch API</strong>: Clients (bao gồm kube-apiserver) có thể watch key changes — đây là cơ chế cốt lõi để Kubernetes reactive</li>
  <li><strong>Quorum requirement</strong>: Cần majority (⌊n/2⌋ + 1) nodes active để cluster hoạt động. Với 3 node etcd, chịu được mất 1 node; với 5 node, chịu được mất 2 node</li>
  <li><strong>etcd v3</strong>: Kubernetes 1.32 dùng etcd 3.5+ với improvements về performance và lease-based TTL</li>
</ul>

<pre><code class="language-bash"># Xem etcd pod
kubectl get pod -n kube-system etcd-controlplane -o wide

# Backup etcd (critical trong production!)
ETCDCTL_API=3 etcdctl snapshot save /backup/etcd-snapshot.db \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key

# Kiểm tra etcd health
ETCDCTL_API=3 etcdctl endpoint health \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key</code></pre>

<p><strong>Lưu ý quan trọng</strong>: etcd data phải được backup thường xuyên. Mất etcd = mất toàn bộ cluster state. Trong managed Kubernetes, cloud provider tự lo việc này.</p>

<h3>2.3. kube-scheduler — Thuật Toán Phân Bổ Pod</h3>

<p><strong>kube-scheduler</strong> chịu trách nhiệm quyết định Pod nào sẽ chạy trên Node nào. Khi bạn tạo Pod, kube-apiserver ghi Pod vào etcd với trạng thái <code>Pending</code> (chưa có node được assign). Scheduler watch những Pod này và tìm node phù hợp.</p>

<p>Quá trình scheduling gồm hai bước:</p>

<ul>
  <li><strong>Filtering (Predicates)</strong>: Loại bỏ các node không đáp ứng yêu cầu — không đủ CPU/Memory, node có taint mà Pod không tolerate, nodeSelector không khớp, Pod affinity/anti-affinity constraints...</li>
  <li><strong>Scoring (Priorities)</strong>: Chấm điểm các node còn lại theo nhiều tiêu chí — node có ít resource sử dụng nhất, node đã có image cần thiết (giảm pull time), node phân bổ đều các Pod replicas...</li>
</ul>

<pre><code class="language-bash"># Xem scheduler logs
kubectl logs -n kube-system kube-scheduler-controlplane

# Xem events liên quan đến scheduling
kubectl get events --field-selector reason=Scheduled

# Xem tại sao Pod không được schedule
kubectl describe pod <pod-name> | grep -A 10 Events

# Kiểm tra resource usage trên nodes
kubectl describe nodes | grep -A 5 "Allocated resources"</code></pre>

<p>Kubernetes 1.32+ hỗ trợ <strong>Scheduler Profiles</strong> — cho phép cấu hình nhiều scheduling profiles với plugin sets khác nhau, phù hợp cho workload đa dạng trong cùng cluster.</p>

<h3>2.4. kube-controller-manager — Vòng Lặp Điều Khiển</h3>

<p><strong>kube-controller-manager</strong> chạy một tập hợp các controllers — mỗi controller là một control loop theo dõi state hiện tại của cluster và thực hiện hành động để đưa về state mong muốn (desired state). Đây là hiện thực hóa của <em>reconciliation loop pattern</em> — trái tim của Kubernetes declarative model.</p>

<p>Các controller quan trọng nhất:</p>

<ul>
  <li><strong>ReplicaSet Controller</strong>: Đảm bảo số lượng Pod replicas đúng với spec. Nếu Pod chết, controller tạo Pod mới.</li>
  <li><strong>Deployment Controller</strong>: Quản lý rolling updates cho Deployments, tạo/xóa ReplicaSets</li>
  <li><strong>EndpointSlice Controller</strong>: Cập nhật EndpointSlices khi Pod ready/not-ready (thay thế Endpoints controller cũ — Endpoints API deprecated K8s 1.33)</li>
  <li><strong>Namespace Controller</strong>: Dọn dẹp resources khi namespace bị xóa</li>
  <li><strong>ServiceAccount Controller</strong>: Tự động tạo default ServiceAccount cho mỗi namespace mới</li>
  <li><strong>Node Controller</strong>: Monitor node health, taint nodes khi unreachable, evict Pods sau grace period</li>
  <li><strong>Job Controller</strong>: Quản lý batch jobs, đảm bảo completion</li>
  <li><strong>CronJob Controller</strong>: Schedule Jobs theo cron expression</li>
</ul>

<pre><code class="language-bash"># Xem controller-manager logs
kubectl logs -n kube-system kube-controller-manager-controlplane

# Xem events do controllers tạo ra
kubectl get events -A --sort-by='.lastTimestamp' | tail -20</code></pre>

<h3>2.5. cloud-controller-manager</h3>

<p>Tách biệt khỏi kube-controller-manager, <strong>cloud-controller-manager</strong> chứa các controllers tích hợp với cloud provider APIs:</p>

<ul>
  <li><strong>Node Controller</strong>: Check cloud provider để xác nhận node có tồn tại không, lấy metadata như cloud region, instance type</li>
  <li><strong>Route Controller</strong>: Cấu hình network routes trong cloud infrastructure</li>
  <li><strong>Service Controller</strong>: Tạo/cập nhật/xóa cloud load balancers khi bạn tạo Service type LoadBalancer</li>
</ul>

<p>Khi dùng on-premises hoặc bare metal, không cần cloud-controller-manager.</p>

<h2>3. Worker Node Components</h2>

<h3>3.1. kubelet — Đại Lý Trên Mỗi Node</h3>

<p><strong>kubelet</strong> là agent chạy trên mỗi Worker Node. Nhiệm vụ của kubelet là nhận PodSpecs và đảm bảo các containers được mô tả trong đó đang chạy và healthy.</p>

<p>Kubelet hoạt động theo cơ chế:</p>

<ul>
  <li>Watch kube-apiserver để nhận PodSpecs được assign cho node của mình</li>
  <li>Giao tiếp với container runtime qua <strong>CRI (Container Runtime Interface)</strong> — một gRPC interface chuẩn hóa</li>
  <li>Báo cáo node status và Pod status ngược lại lên API server</li>
  <li>Chạy liveness/readiness/startup probes</li>
  <li>Mount volumes, pull images, setup networking namespace</li>
  <li>Quản lý resource limits thông qua cgroup v2</li>
</ul>

<pre><code class="language-bash"># Xem trạng thái kubelet service
systemctl status kubelet

# Kubelet logs
journalctl -u kubelet -f

# Xem node conditions do kubelet báo cáo
kubectl describe node <node-name> | grep -A 20 Conditions

# Kiểm tra resource capacity và allocatable
kubectl get node <node-name> -o jsonpath='{.status.allocatable}'</code></pre>

<h3>3.2. kube-proxy — Network Rules Engine (nftables Mode)</h3>

<p><strong>kube-proxy</strong> chạy trên mỗi node và chịu trách nhiệm implement Kubernetes Services networking — đảm bảo traffic đến Service VIP được forward đến đúng Pod backend.</p>

<p>Lịch sử các mode của kube-proxy:</p>

<ul>
  <li><strong>iptables mode</strong> (legacy): Dùng iptables rules chain. Vấn đề: với hàng nghìn Services, iptables rules rất lớn và slow to update</li>
  <li><strong>IPVS mode</strong>: Layer 4 load balancer trong kernel. IPVS mode <strong>deprecated trong Kubernetes 1.35</strong> và sẽ bị removed trong tương lai</li>
  <li><strong>nftables mode</strong> (current default từ K8s 1.31): Dùng nftables — Linux framework mới thay thế iptables. Hiệu quả hơn, dễ debug hơn, hỗ trợ tốt hơn trên kernel hiện đại</li>
</ul>

<pre><code class="language-bash"># Xem kube-proxy mode hiện tại
kubectl get configmap -n kube-system kube-proxy -o yaml | grep mode

# Xem kube-proxy logs
kubectl logs -n kube-system -l k8s-app=kube-proxy

# Kiểm tra nftables rules (khi dùng nftables mode)
nft list ruleset | grep -A 5 "KUBE-"

# Xem services và endpoints
kubectl get services -A
kubectl get endpointslices -A</code></pre>

<p><strong>Lưu ý</strong>: Nhiều clusters hiện đại dùng CNI plugins như Cilium thay thế hoàn toàn kube-proxy (Cilium's kube-proxy replacement dùng eBPF), cho performance tốt hơn và observability cao hơn.</p>

<h3>3.3. Container Runtime — containerd 2.0</h3>

<p>Container runtime là thành phần thực sự tạo và chạy containers. Kubernetes giao tiếp với runtime qua <strong>CRI (Container Runtime Interface)</strong>.</p>

<p><strong>Tại sao không dùng Docker?</strong></p>

<p>Docker Engine được remove khỏi Kubernetes trong version 1.24 (dockershim removed). Docker không native implement CRI — Kubernetes phải dùng một shim layer (dockershim) để bridge. Thay vào đó:</p>

<ul>
  <li><strong>containerd</strong>: Runtime chính thức, được tách ra từ Docker project, native CRI support</li>
  <li><strong>CRI-O</strong>: Runtime nhẹ hơn, tập trung cho Kubernetes use case</li>
</ul>

<p><strong>containerd 2.0</strong> (released 2024) mang những cải tiến quan trọng:</p>

<ul>
  <li>Native support cho <strong>cgroup v2</strong> (bắt buộc từ Kubernetes 1.36)</li>
  <li>Improved sandbox management với Sandbox API</li>
  <li>Transfer service cho image management hiệu quả hơn</li>
  <li>NRI (Node Resource Interface) plugins cho extended customization</li>
  <li>Zstd image compression support — pull nhanh hơn đáng kể</li>
  <li>Tốt hơn với Windows containers</li>
</ul>

<pre><code class="language-bash"># Kiểm tra container runtime trên node
kubectl get node <node-name> -o jsonpath='{.status.nodeInfo.containerRuntimeVersion}'

# Xem containers đang chạy qua containerd CLI
crictl ps

# Xem images
crictl images

# Kiểm tra containerd version
containerd --version

# Xem containerd logs
journalctl -u containerd -f</code></pre>

<h3>3.4. cgroup v2 — Resource Management Hiện Đại</h3>

<p><strong>cgroups (control groups)</strong> là Linux kernel feature để giới hạn, ưu tiên, và đo lường resource usage của process groups. Kubernetes dùng cgroups để enforce CPU/memory limits trên Pods và containers.</p>

<ul>
  <li><strong>cgroup v1</strong>: Legacy, mỗi resource có hierarchy riêng biệt (cpu, memory, blkio...), phức tạp và có nhiều edge cases</li>
  <li><strong>cgroup v2</strong>: Unified hierarchy, một cgroup tree duy nhất, improved memory management với memory.oom.group, pressure stall information (PSI)</li>
</ul>

<p><strong>Timeline quan trọng</strong>:</p>

<ul>
  <li>Kubernetes 1.25: cgroup v2 stable</li>
  <li>Kubernetes 1.35: cgroup v1 <strong>deprecated</strong></li>
  <li>Kubernetes 1.36: cgroup v2 <strong>bắt buộc</strong>, cgroup v1 removed</li>
  <li>Ubuntu 22.04+, RHEL 9+, Debian 11+ đã mặc định dùng cgroup v2</li>
</ul>

<pre><code class="language-bash"># Kiểm tra cgroup version đang dùng
stat -fc %T /sys/fs/cgroup
# Kết quả: "cgroup2fs" = v2, "tmpfs" = v1

# Xem cgroup của một container cụ thể
cat /proc/$(crictl inspect <container-id> | jq '.info.pid')/cgroup

# Xem memory stats qua cgroup v2
cat /sys/fs/cgroup/kubepods.slice/memory.stat</code></pre>

<h2>4. Luồng Tạo Pod: Từ kubectl Đến Container</h2>

<p>Để hiểu kiến trúc một cách thực tế, hãy trace luồng xảy ra khi bạn chạy <code>kubectl apply -f pod.yaml</code>:</p>

<img src="/storage/uploads/2026/03/k8s-pod-creation-flow-2026.webp" alt="Pod Creation Flow - từ kubectl đến Container" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<pre><code class="language-bash">┌──────────┐    1. HTTPS POST /api/v1/pods     ┌────────────────┐
│ kubectl  │ ─────────────────────────────────► │ kube-apiserver │
└──────────┘                                    └───────┬────────┘
                                                        │
                                         2. Auth + Admission + Validate
                                                        │
                                         3. Write Pod (Pending) to etcd
                                                        │
                                                ┌───────▼────────┐
                                                │      etcd      │
                                                └───────┬────────┘
                                                        │
                                         4. API server notifies watchers
                                                        │
                          ┌─────────────────────────────┼──────────────────┐
                          │                             │                  │
                   ┌──────▼───────┐           ┌─────────▼──────────┐      │
                   │ kube-        │           │ kube-controller-   │      │
                   │ scheduler    │           │ manager            │      │
                   └──────┬───────┘           └────────────────────┘      │
                          │                                                │
               5. Filter + Score nodes                                     │
               6. Bind Pod to Node-1                                       │
               7. Write binding to etcd                                    │
                          │                                                │
                   ┌──────▼───────┐                                       │
                   │ kube-apiserver│ (notifies kubelet on Node-1)          │
                   └──────┬───────┘                                       │
                          │                                                │
                   ┌──────▼───────┐                                       │
                   │ kubelet       │ (on Node-1)                          │
                   │ (watches API) │                                       │
                   └──────┬───────┘                                       │
                          │                                                │
               8. kubelet calls containerd via CRI                         │
                          │                                                │
                   ┌──────▼───────┐                                       │
                   │  containerd  │                                       │
                   └──────┬───────┘                                       │
                          │                                                │
               9. Pull image (if not cached)                               │
               10. Create network namespace                                 │
               11. Call CNI plugin to setup networking                     │
               12. Start container process                                  │
                          │                                                │
               13. kubelet reports Pod Running to API server               │
                          │                                                │
                   ┌──────▼───────┐                                       │
                   │ kube-apiserver│ ─── 14. Update Pod status in etcd ──►│
                   └──────────────┘                                       │</code></pre>

<p>Toàn bộ quá trình này, từ lúc <code>kubectl apply</code> đến lúc container thực sự running, thường mất từ 2-10 giây tùy vào việc image đã được cache chưa và tốc độ network.</p>

<h2>5. Add-ons Quan Trọng</h2>

<h3>5.1. CoreDNS — Service Discovery</h3>

<p><strong>CoreDNS</strong> là DNS server chạy trong cluster, cho phép Pods tìm thấy Services và Pods khác qua tên miền thay vì IP:</p>

<ul>
  <li>Service <code>my-svc</code> trong namespace <code>my-ns</code> có thể được resolve bằng: <code>my-svc.my-ns.svc.cluster.local</code></li>
  <li>Pod-to-Pod DNS: <code>pod-ip.namespace.pod.cluster.local</code></li>
  <li>CoreDNS là chương trình Kubernetes add-on bắt buộc — cluster không thể hoạt động bình thường mà không có DNS</li>
</ul>

<pre><code class="language-bash"># Xem CoreDNS pods
kubectl get pods -n kube-system -l k8s-app=kube-dns

# Kiểm tra DNS resolution từ trong Pod
kubectl run dns-test --image=busybox:1.36 --rm -it --restart=Never -- \
  nslookup kubernetes.default.svc.cluster.local

# Xem CoreDNS config
kubectl get configmap -n kube-system coredns -o yaml</code></pre>

<h3>5.2. CNI Plugin — Container Network Interface</h3>

<p>CNI plugins implement pod networking — đảm bảo mỗi Pod có IP riêng và có thể giao tiếp với Pods khác. Kubernetes không có built-in networking — bạn phải cài một CNI plugin.</p>

<p>Các CNI phổ biến năm 2026:</p>

<ul>
  <li><strong>Cilium</strong>: eBPF-based, performance cao nhất, built-in Hubble observability, kube-proxy replacement, network policies nâng cao. Đây là lựa chọn mặc định của nhiều managed K8s services.</li>
  <li><strong>Flannel</strong>: Đơn giản, nhẹ, phù hợp cho học tập và dev environments</li>
  <li><strong>Calico</strong>: Network policies mạnh, dùng BGP cho routing, phổ biến trong on-premises enterprise</li>
  <li><strong>Weave Net</strong>: Simple setup, mesh networking</li>
</ul>

<pre><code class="language-bash"># Kiểm tra CNI đang dùng
ls /etc/cni/net.d/
cat /etc/cni/net.d/10-flannel.conflist

# Với Cilium
kubectl get pods -n kube-system -l k8s-app=cilium
cilium status</code></pre>

<h3>5.3. metrics-server — Resource Metrics</h3>

<p><strong>metrics-server</strong> thu thập CPU và memory metrics từ kubelet trên mỗi node, phục vụ cho Horizontal Pod Autoscaler (HPA) và lệnh <code>kubectl top</code>.</p>

<pre><code class="language-bash"># Cài metrics-server
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# Sau khi cài, xem resource usage
kubectl top nodes
kubectl top pods -A --sort-by=cpu</code></pre>

<h2>6. High Availability Control Plane</h2>

<p>Trong production, Control Plane cần HA để tránh single point of failure:</p>

<ul>
  <li><strong>3 hoặc 5 control plane nodes</strong> chạy kube-apiserver, kube-scheduler, kube-controller-manager</li>
  <li><strong>Load balancer</strong> phía trước các kube-apiserver (HAProxy, cloud LB, hoặc virtual IP với keepalived)</li>
  <li><strong>etcd cluster</strong> với quorum (ít nhất 3 nodes) — có thể chạy stacked (trên cùng control plane nodes) hoặc external (trên nodes riêng)</li>
  <li>kube-scheduler và kube-controller-manager dùng <strong>leader election</strong> — chỉ một instance active tại một thời điểm, các instance còn lại standby</li>
</ul>

<pre><code class="language-bash"># Kiểm tra leader election
kubectl get endpoints -n kube-system kube-scheduler -o yaml
kubectl get endpoints -n kube-system kube-controller-manager -o yaml

# Xem tất cả control plane components
kubectl get pods -n kube-system | grep -E 'apiserver|etcd|scheduler|controller'</code></pre>

<h2>7. Tổng Kết và Key Takeaways</h2>

<p>Kiến trúc Kubernetes phản ánh các design principles quan trọng:</p>

<ul>
  <li><strong>Separation of concerns</strong>: Mỗi component có trách nhiệm rõ ràng, giao tiếp qua API chuẩn</li>
  <li><strong>Declarative model</strong>: Bạn khai báo state mong muốn, controllers lo việc đạt đến state đó</li>
  <li><strong>Single source of truth</strong>: etcd là nơi duy nhất lưu state, mọi component đều watch API server</li>
  <li><strong>Extensibility</strong>: CRI, CNI, CSI là các interfaces cho phép thay thế components (runtime, network, storage)</li>
  <li><strong>Resilience</strong>: HA design cho phép các node fail mà cluster vẫn hoạt động</li>
</ul>

<p>Trong bài tiếp theo, chúng ta sẽ đưa kiến thức kiến trúc này vào thực tế bằng cách cài đặt một Kubernetes cluster hoàn chỉnh với containerd 2.0, cgroup v2, và các công cụ cần thiết cho phát triển năm 2026.</p>

<pre><code class="language-bash"># Quick health check của một cluster
kubectl get componentstatuses  # Deprecated nhưng vẫn hữu ích
kubectl get nodes -o wide
kubectl get pods -n kube-system
kubectl cluster-info</code></pre>
