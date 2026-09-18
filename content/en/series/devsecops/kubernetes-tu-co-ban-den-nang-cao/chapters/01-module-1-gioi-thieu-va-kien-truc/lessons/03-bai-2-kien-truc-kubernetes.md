---
id: 019c9618-0001-7000-8000-c1147ba22e10
title: 'LESSON 2: KUBERNETES ARCHITECTURE'
slug: bai-2-kien-truc-kubernetes
description: 'Learn the detailed architecture of Kubernetes 1.32+: Control Plane, Worker Nodes, main components. Understand kube-apiserver, etcd, scheduler, controller-manager, kubelet, containerd 2.0, and kube-proxy with nftables.'
duration_minutes: 90
is_free: true
video_url: null
sort_order: 2
section_title: 'Module 1: Introduction & Kubernetes Architecture'
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: 'KUBERNETES: FROM BASIC TO ADVANCED'
  slug: kubernetes-tu-co-ban-den-nang-cao
locale: en
---
<h2>Kubernetes Architecture: From Overview to Details__HTMLTAG_1___

<p>Kubernetes is designed in a distributed model with a clear master-worker architecture. To use Kubernetes effectively — and especially to debug when things go wrong — you need to understand what each component does, how they communicate with each other, and why they are designed that way. This lesson dives into the Kubernetes 1.32+ architecture with important changes in containerd 2.0, nftables mode for kube-proxy, and the cgroup v2 roadmap.</p>

<img src="/storage/uploads/2026/03/k8s-architecture-2026.webp" alt="Kubernetes Architecture - Control Plane và Worker Nodes" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h2>1. Architecture Overview: Control Plane and Worker Nodes</h2>

<p>A Kubernetes cluster is divided into two groups of functional nodes:</p>

<ul>
  <li><strong>Control Plane (Master Node)</strong>: Brain of the cluster. Responsible for global decision making — scheduling where to run Pods, detecting and responding to cluster events, maintaining desired state.</li>
  <li><strong>Worker Nodes</strong>: Where the workload actually runs. Each node contains a runtime container, a kubelet to communicate with the Control Plane, and a kube-proxy to handle the network.</li>
</ul>

<p>In a production environment, Control Plane is usually deployed on at least 3 separate nodes to ensure high availability (HA). With Kubernetes 1.32+, managed Kubernetes services like GKE, EKS, AKS completely hide the Control Plane — you only interact via API.</p>

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

<h3>2.1. kube-apiserver — Single Interface</h3>

<p><strong>kube-apiserver</strong> is the central component of the Control Plane. All communication within the cluster — from the developer's kubectl, from the kubelet on the worker node, from the controllers — must go through the API server. No components are allowed to communicate directly with etcd, except kube-apiserver.</p>

<p>Main functions of kube-apiserver:</p>

<ul>
  <li><strong>REST API Gateway</strong>: Provides RESTful API according to the Kubernetes API Groups standard (<code>core/v1</code>, <code>apps/v1</code>, <code>networking.k8s.io/v1</code>...)</li>
  <li><strong>Authentication</strong>: Identity authentication — supports client certificates, Bearer tokens, OIDC, webhook token authentication__HTMLTAG_45___
  <li><strong>Authorization</strong>: Check access rights via RBAC (Role-Based Access Control), ABAC, or Webhook mode</li>
  <li><strong>Admission Control</strong>: A series of admission webhooks — validating and mutating — applied before the object is written to etcd</li>
  <li><strong>API Aggregation</strong>: Allows API extension using custom API servers (metrics-server, custom CRDs)</li>
</ul>

<pre><code class="language-bash"># Kiểm tra trạng thái kube-apiserver
kubectl get componentstatuses

# Xem logs của kube-apiserver (trên cluster tự quản lý)
kubectl logs -n kube-system kube-apiserver-controlplane

# Kiểm tra version API
kubectl api-versions | head -20

# Xem tất cả API resources
kubectl api-resources --sort-by=kind</code></pre>

<p>Kube-apiserver is stateless — it does not store state, only reads/writes to etcd. This allows for horizontal scaling by running multiple API server instances behind a load balancer.</p>

<h3>2.2. etcd — Cluster Memory</h3><p><strong>etcd</strong> is a distributed key-value store using the Raft consensus algorithm. This is the only place where the entire state of the cluster is stored — every Pod, Service, ConfigMap, Secret, Node, is stored here as serialized protobuf objects.</p>

<p>Important features of etcd in Kubernetes:</p>

<ul>
  <li><strong>Strong consistency</strong>: Raft ensures every node in the etcd cluster agrees on the value — no "split brain"</li>
  <li><strong>Watch API</strong>: Clients (including kube-apiserver) can watch key changes — this is the core mechanism for Kubernetes to react</li>
  <li><strong>Quorum requirement</strong>: Need majority (⌊n/2⌋ + 1) active nodes for cluster to operate. With 3 etcd nodes, 1 node can be tolerated; with 5 nodes, can withstand losing 2 nodes</li>
  <li><strong>etcd v3</strong>: Kubernetes 1.32 using etcd 3.5+ with performance and lease-based improvements TTL</li>
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

<p><strong>Important note</strong>: etcd data must be backed up regularly. Loss of etcd = loss of entire cluster state. In managed Kubernetes, the cloud provider takes care of this itself.</p>

<h3>2.3. kube-scheduler — Pod Allocation Algorithm</h3>

<p><strong>kube-scheduler</strong> is responsible for deciding which Pod will run on which Node. When you create a Pod, kube-apiserver writes the Pod to etcd with status <code>Pending</code> (no assigned node yet). Scheduler watches these Pods and finds the matching node.</p>

<p>The scheduling process consists of two steps:</p>

<ul>
  <li><strong>Filtering (Predicates)</strong>: Eliminate nodes that do not meet the requirements — not enough CPU/Memory, nodes with taints that the Pod does not tolerate, nodeSelectors that do not match, Pod affinity/anti-affinity constraints...</li>
  <li><strong>Scoring (Priorities)</strong>: Score the remaining nodes according to many criteria — node with the least used resources, node that already has the necessary image (reduces pull time), node that evenly distributes Pod replicas...</li>
</ul>

<pre><code class="language-bash"># Xem scheduler logs
kubectl logs -n kube-system kube-scheduler-controlplane

# Xem events liên quan đến scheduling
kubectl get events --field-selector reason=Scheduled

# Xem tại sao Pod không được schedule
kubectl describe pod <pod-name> | grep -A 10 Events

# Kiểm tra resource usage trên nodes
kubectl describe nodes | grep -A 5 "Allocated resources"</code></pre>

<p>Kubernetes 1.32+ supports <strong>Scheduler Profiles</strong> — allows configuring multiple scheduling profiles with different plugin sets, suitable for diverse workloads in the same cluster.</p>

<h3>2.4. kube-controller-manager — Control Loop</h3>

<p><strong>kube-controller-manager</strong> runs a set of controllers — each controller is a control loop that monitors the current state of the cluster and takes action to return it to the desired state. This is the realization of <em>reconciliation loop pattern</em> — the heart of the Kubernetes declarative model.</p>

<p>The most important controllers:</p><ul>
  <li><strong>ReplicaSet Controller</strong>: Ensure the number of Pod replicas matches the spec. If the Pod dies, the controller creates a new Pod.</li>
  <li><strong>Deployment Controller</strong>: Manage rolling updates for Deployments, create/delete ReplicaSets</li>
  <li><strong>EndpointSlice Controller</strong>: Update EndpointSlices when Pod ready/not-ready (replaces old Endpoints controller — Endpoints API deprecated K8s 1.33)</li>
  <li><strong>Namespace Controller</strong>: Clean up resources when namespace is deleted</li>
  <li><strong>ServiceAccount Controller</strong>: Automatically create default ServiceAccount for each new namespace</li>
  <li><strong>Node Controller</strong>: Monitor node health, taint nodes when unreachable, evict Pods after grace period</li>
  <li><strong>Job Controller</strong>: Manage batch jobs, ensure completion</li>
  <li><strong>CronJob Controller</strong>: Schedule Jobs according to cron expression</li>
</ul>

<pre><code class="language-bash"># Xem controller-manager logs
kubectl logs -n kube-system kube-controller-manager-controlplane

# Xem events do controllers tạo ra
kubectl get events -A --sort-by='.lastTimestamp' | tail -20</code></pre>

<h3>2.5. cloud-controller-manager</h3>

<p>Separate from kube-controller-manager, <strong>cloud-controller-manager</strong>contains controllers that integrate with cloud provider APIs:</p>

<ul>
  <li><strong>Node Controller</strong>: Check cloud provider to confirm node exists, get metadata like cloud region, instance type</li>
  <li><strong>Route Controller</strong>: Configure network routes in cloud infrastructure</li>
  <li><strong>Service Controller</strong>: Create/update/delete cloud load balancers when you create Service type LoadBalancer</li>
</ul>

<p>When using on-premises or bare metal, no need for cloud-controller-manager.</p>

<h2>3. Worker Node Components</h2>

<h3>3.1. kubelet — Agents Per Node</h3>

<p><strong>kubelet</strong> is an agent that runs on each Worker Node. The kubelet's job is to receive PodSpecs and ensure the containers described therein are running and healthy.</p>

<p>Kubelet operates according to the mechanism:</p>

<ul>
  <li>Watch kube-apiserver to receive PodSpecs assigned to your node</li>
  <li>Communicates with runtime containers via <strong>CRI (Container Runtime Interface)</strong> — a standardized gRPC interface__HTMLTAG_197___
  <li>Report node status and Pod status back to API server</li>
  <li>Run liveness/readiness/startup probes</li>
  <li>Mount volumes, pull images, setup networking namespace__HTMLTAG_203___
  <li>Manage resource limits through cgroup v2</li>
</ul>

<pre><code class="language-bash"># Xem trạng thái kubelet service
systemctl status kubelet

# Kubelet logs
journalctl -u kubelet -f

# Xem node conditions do kubelet báo cáo
kubectl describe node <node-name> | grep -A 20 Conditions

# Kiểm tra resource capacity và allocatable
kubectl get node <node-name> -o jsonpath='{.status.allocatable}'</code></pre>

<h3>3.2. kube-proxy — Network Rules Engine (nftables Mode)</h3><p><strong>kube-proxy</strong> runs on each node and is responsible for implementing Kubernetes Services networking — ensuring traffic to Service VIP is forwarded to the correct Pod backend.</p>

<p>History of kube-proxy modes:</p>

<ul>
  <li><strong>iptables mode</strong> (legacy): Use iptables rules chain. Problem: with thousands of Services, iptables rules are very large and slow to update</li>
  <li><strong>IPVS mode</strong>: Layer 4 load balancer in the kernel. IPVS mode <strong>deprecated in Kubernetes 1.35</strong> and will be removed in the future</li>
  <li><strong>nftables mode</strong> (current default since K8s 1.31): Use nftables — New Linux framework to replace iptables. More efficient, easier to debug, better support on modern kernel</li>
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

<p><strong>Note</strong>: Many modern clusters use CNI plugins like Cilium to completely replace kube-proxy (Cilium's kube-proxy replacement uses eBPF), giving better performance and higher observability.</p>

<h3>3.3. Container Runtime — containerd 2.0</h3>

<p>Container runtime is the component that actually creates and runs containers. Kubernetes communicates with the runtime via <strong>CRI (Container Runtime Interface)</strong>.</p>

<p><strong>Why not use Docker?</strong></p>

<p>Docker Engine was removed from Kubernetes in version 1.24 (dockershim removed). Docker does not natively implement CRI — Kubernetes must use a shim layer (dockershim) for bridging. Instead:</p>

<ul>
  <li><strong>containerd</strong>: Official runtime, forked from Docker project, native CRI support</li>
  <li><strong>CRI-O</strong>: Lighter runtime, focused on Kubernetes use case</li>
</ul>

<p><strong>containerd 2.0</strong> (released 2024) brings important improvements:</p>

<ul>
  <li>Native support for <strong>cgroup v2</strong> (required from Kubernetes 1.36)</li>
  <li>Improved sandbox management with Sandbox API</li>
  <li>Transfer service for more efficient image management</li>
  <li>NRI (Node Resource Interface) plugins for extended customization</li>
  <li>Zstd image compression support — pulls significantly faster</li>
  <li>Better with Windows containers</li>
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

<h3>3.4. cgroup v2 — Modern Resource Management</h3>

<p><strong>cgroups (control groups)</strong> is a Linux kernel feature to limit, prioritize, and measure resource usage of process groups. Kubernetes uses cgroups to enforce CPU/memory limits on Pods and containers.</p><ul>
  <li><strong>cgroup v1</strong>: Legacy, each resource has its own hierarchy (cpu, memory, blkio...), complex and has many edge cases__HTMLTAG_287___
  <li><strong>cgroup v2</strong>: Unified hierarchy, a single cgroup tree, improved memory management with memory.oom.group, pressure stall information (PSI)</li>
</ul>

<p><strong>Important Timeline</strong>:</p>

<ul>
  <li>Kubernetes 1.25: cgroup v2 stable</li>
  <li>Kubernetes 1.35: cgroup v1 <strong>deprecated</strong></li>
  <li>Kubernetes 1.36: cgroup v2 <strong>required</strong>, cgroup v1 removed</li>
  <li>Ubuntu 22.04+, RHEL 9+, Debian 11+ uses cgroup v2</li> by default
</ul>

<pre><code class="language-bash"># Kiểm tra cgroup version đang dùng
stat -fc %T /sys/fs/cgroup
# Kết quả: "cgroup2fs" = v2, "tmpfs" = v1

# Xem cgroup của một container cụ thể
cat /proc/$(crictl inspect <container-id> | jq '.info.pid')/cgroup

# Xem memory stats qua cgroup v2
cat /sys/fs/cgroup/kubepods.slice/memory.stat</code></pre>

<h2>4. Pod Creation Flow: From kubectl To Container</h2>

<p>To understand the architecture in a practical way, let's trace the flow that occurs when you run <code>kubectl apply -f pod.yaml</code>:</p>

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

<p>This entire process, from the moment <code>kubectl apply</code> to the moment the container actually runs, usually takes 2-10 seconds depending on whether the image has been cached and the network speed.</p>

<h2>5. Important Add-ons</h2>

<h3>5.1. CoreDNS — Service Discovery</h3>

<p><strong>CoreDNS</strong> is a DNS server running in the cluster, allowing Pods to find Services and other Pods via domain name instead of IP:</p>

<ul>
  <li>Service <code>my-svc</code> in namespace <code>my-ns</code> can be resolved with: <code>my-svc.my-ns.svc.cluster.local</code></li>
  <li>Pod-to-Pod DNS: <code>pod-ip.namespace.pod.cluster.local</code></li>
  <li>CoreDNS is a required Kubernetes add-on — clusters cannot function properly without DNS</li>
</ul>

<pre><code class="language-bash"># Xem CoreDNS pods
kubectl get pods -n kube-system -l k8s-app=kube-dns

# Kiểm tra DNS resolution từ trong Pod
kubectl run dns-test --image=busybox:1.36 --rm -it --restart=Never -- \
  nslookup kubernetes.default.svc.cluster.local

# Xem CoreDNS config
kubectl get configmap -n kube-system coredns -o yaml</code></pre>

<h3>5.2. CNI Plugin — Container Network Interface</h3>

<p>CNI plugins implements pod networking — ensures each Pod has its own IP and can communicate with other Pods. Kubernetes does not have built-in networking — you must install a CNI plugin.</p>

<p>Popular CNIs in 2026:</p>

<ul>
  <li><strong>Cilium</strong>: eBPF-based, highest performance, built-in Hubble observability, kube-proxy replacement, advanced network policies. This is the default choice for many managed K8s services.</li>
  <li><strong>Flannel</strong>: Simple, lightweight, suitable for learning and dev environments</li>
  <li><strong>Calico</strong>: Strong network policies, using BGP for routing, popular in on-premises enterprises</li>
  <li><strong>Weave Net</strong>: Simple setup, mesh networking</li>
</ul>

<pre><code class="language-bash"># Kiểm tra CNI đang dùng
ls /etc/cni/net.d/
cat /etc/cni/net.d/10-flannel.conflist

# Với Cilium
kubectl get pods -n kube-system -l k8s-app=cilium
cilium status</code></pre>

<h3>5.3. metrics-server — Resource Metrics</h3><p><strong>metrics-server</strong> collects CPU and memory metrics from the kubelet on each node, serving the Horizontal Pod Autoscaler (HPA) and the command <code>kubectl top</code>.</p>

<pre><code class="language-bash"># Cài metrics-server
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# Sau khi cài, xem resource usage
kubectl top nodes
kubectl top pods -A --sort-by=cpu</code></pre>

<h2>6. High Availability Control Plane</h2>

<p>In production, Control Plane needs HA to avoid single point of failure:</p>

<ul>
  <li><strong>3 or 5 control plane nodes</strong>run kube-apiserver, kube-scheduler, kube-controller-manager</li>
  <li><strong>Load balancer</strong> in front of kube-apiservers (HAProxy, cloud LB, or virtual IP with keepalived)</li>
  <li><strong>etcd cluster</strong> with quorum (at least 3 nodes) — can run stacked (on same control plane nodes) or external (on separate nodes)</li>
  <li>kube-scheduler and kube-controller-manager use <strong>leader election</strong> — only one instance active at a time, the remaining instances standby__HTMLTAG_398___
</ul>

<pre><code class="language-bash"># Kiểm tra leader election
kubectl get endpoints -n kube-system kube-scheduler -o yaml
kubectl get endpoints -n kube-system kube-controller-manager -o yaml

# Xem tất cả control plane components
kubectl get pods -n kube-system | grep -E 'apiserver|etcd|scheduler|controller'</code></pre>

<h2>7. Summary and Key Takeaways</h2>

<p>Kubernetes architecture reflects important design principles:</p>

<ul>
  <li><strong>Separation of concerns</strong>: Each component has clear responsibilities, communicating via standard API</li>
  <li><strong>Declarative model</strong>: You declare the desired state, controllers take care of reaching that state</li>
  <li><strong>Single source of truth</strong>: etcd is the only place to store state, every component watches the server API</li>
  <li><strong>Extensibility</strong>: CRI, CNI, CSI are interfaces that allow replacing components (runtime, network, storage)</li>
  <li><strong>Resilience</strong>: HA design allows nodes to fail and the cluster still operates</li>
</ul>

<p>In the next article, we'll put this architectural knowledge into practice by installing a Kubernetes cluster complete with containerd 2.0, cgroup v2, and the necessary tools for 2026 development.</p>

<pre><code class="language-bash"># Quick health check của một cluster
kubectl get componentstatuses  # Deprecated nhưng vẫn hữu ích
kubectl get nodes -o wide
kubectl get pods -n kube-system
kubectl cluster-info</code></pre>