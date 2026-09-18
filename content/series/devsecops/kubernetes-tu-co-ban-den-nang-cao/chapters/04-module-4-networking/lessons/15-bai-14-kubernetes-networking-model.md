---
id: 019c9618-0201-7000-8000-c1147ba22e12
title: 'BÀI 14: KUBERNETES NETWORKING MODEL'
slug: bai-14-kubernetes-networking-model
description: >-
  Mô hình mạng Kubernetes: Container-to-Container, Pod-to-Pod, Pod-to-Service, External-to-Service.
  CNI plugins, Cilium eBPF (khuyến nghị 2026), Calico, kube-proxy nftables (IPVS deprecated K8s 1.35).
duration_minutes: 90
is_free: false
video_url: null
sort_order: 14
section_title: 'Module 4: Networking'
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: 'KUBERNETES: TỪ CƠ BẢN ĐẾN NÂNG CAO'
  slug: kubernetes-tu-co-ban-den-nang-cao
---
<h2>🎯 Mục tiêu bài học</h2><p>Hiểu mô hình mạng Kubernetes từ cơ bản đến nâng cao: tại sao mỗi Pod có IP riêng, 4 loại communication patterns, CNI plugins (Cilium khuyến nghị 2026), và kube-proxy với nftables.</p>

<img src="/storage/uploads/2026/03/k8s-networking-model-2026.webp" alt="Kubernetes Networking Model - 4 Communication Patterns" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h2>1. Kubernetes Networking Requirements</h2>
<p>Kubernetes có 3 yêu cầu cốt lõi về networking:</p>
<ul>
  <li>Mọi Pod phải giao tiếp được với mọi Pod khác trong cluster <strong>không cần NAT</strong></li>
  <li>Mọi Node phải giao tiếp được với mọi Pod <strong>không cần NAT</strong></li>
  <li>IP mà Pod tự nhìn thấy phải giống IP mà Pods khác nhìn thấy</li>
</ul>
<p>Đây là "flat network model" — không giống Docker mặc định (NAT-based).</p>

<h2>2. Bốn Communication Patterns</h2>

<h3>2.1 Container-to-Container (trong cùng Pod)</h3>
<p>Containers trong cùng Pod chia sẻ network namespace → giao tiếp qua <code>localhost</code>.</p>
<pre><code class="language-bash"># Container A call container B (cùng pod)
curl http://localhost:8080/api
</code></pre>

<h3>2.2 Pod-to-Pod</h3>
<p>Mỗi Pod có một IP riêng biệt trong cluster. Pods giao tiếp trực tiếp qua IP — CNI plugin đảm bảo routing.</p>
<pre><code class="language-bash"># Pod A (10.244.1.5) gọi Pod B (10.244.2.3)
curl http://10.244.2.3:8080/api

# Thực tế nên dùng Service name, không hardcode IP
curl http://backend-service/api
</code></pre>

<h3>2.3 Pod-to-Service</h3>
<p>Pods giao tiếp với Service qua ClusterIP (virtual IP). kube-proxy tạo iptables/nftables rules để DNAT (destination NAT) sang Pod IP thực.</p>
<pre><code class="language-bash"># Client Pod → Service ClusterIP (10.96.0.100) → kube-proxy rules → Pod IP (10.244.x.x)
curl http://backend-service    # CoreDNS resolve → ClusterIP → Pod
</code></pre>

<h3>2.4 External-to-Service</h3>
<p>Traffic từ bên ngoài cluster vào Service qua NodePort, LoadBalancer, hoặc Gateway API (HTTPRoute).</p>

<h2>3. CNI (Container Network Interface)</h2>
<p>CNI là interface chuẩn giữa Kubernetes và network plugins. Khi Pod được tạo, kubelet gọi CNI plugin để:</p>
<ul>
  <li>Tạo network interface cho Pod</li>
  <li>Gán IP address</li>
  <li>Cấu hình routing</li>
</ul>

<h3>3.1 Cilium — Khuyến nghị 2026</h3>
<p>Cilium dùng <strong>eBPF (extended Berkeley Packet Filter)</strong> tại kernel level — không cần iptables chains.</p>
<p><strong>Ưu điểm Cilium</strong>:</p>
<ul>
  <li>eBPF: fast, programmable, kernel-level networking</li>
  <li>L7 visibility và load balancing (HTTP, gRPC, Kafka)</li>
  <li>Built-in observability với <strong>Hubble</strong> (real-time network traffic)</li>
  <li>Native Gateway API implementation</li>
  <li>Sidecarless Service Mesh (không cần Envoy sidecar)</li>
  <li>Network policies: L3/L4/L7</li>
</ul>
<pre><code class="language-bash"># Cài Cilium với Helm
helm repo add cilium https://helm.cilium.io/
helm install cilium cilium/cilium \
  --namespace kube-system \
  --set hubble.enabled=true \
  --set hubble.ui.enabled=true

# Verify
cilium status
cilium connectivity test
</code></pre>

<h3>3.2 Calico</h3>
<p>Calico là CNI mature với hỗ trợ eBPF dataplane (tùy chọn), BGP routing cho bare metal. Phù hợp khi cần tương thích rộng hoặc BGP peering với routers vật lý.</p>

<h3>3.3 Flannel</h3>
<p>Flannel đơn giản, dễ cài nhưng <strong>thiếu Network Policy support và observability</strong>. Không khuyến nghị cho production.</p>

<h2>4. eBPF — Tại sao nhanh hơn iptables?</h2>
<p>iptables dùng linear rule matching — O(n) với n rules. Khi cluster có hàng nghìn services, iptables chain rất dài, ảnh hưởng performance.</p>
<p>eBPF dùng hash maps — O(1) lookup bất kể số lượng services. eBPF programs chạy trực tiếp trong kernel, không có context switch sang user space.</p>
<pre><code class="language-bash">              iptables (legacy):
User Space ←→ Kernel iptables chains (linear rules)
                   ↓ O(n) per packet

              eBPF (Cilium):
User Space    Kernel eBPF programs + hash maps
                   ↓ O(1) per packet
</code></pre>

<h2>5. kube-proxy Modes 2026</h2>
<p>kube-proxy implement Service load balancing trên mỗi Node.</p>

<h3>5.1 iptables mode (legacy)</h3>
<p>Tạo iptables DNAT rules cho mỗi Service endpoint. Vẫn hoạt động nhưng kém scalable.</p>

<h3>5.2 nftables mode — Khuyến nghị 2026</h3>
<p><strong>IPVS mode deprecated K8s 1.35</strong>. nftables là backend mới, hiệu quả hơn iptables.</p>
<pre><code class="language-yaml"># Cấu hình trong kubeadm-config.yaml
apiVersion: kubeproxy.config.k8s.io/v1alpha1
kind: KubeProxyConfiguration
mode: nftables
</code></pre>
<pre><code class="language-bash"># Kiểm tra kube-proxy mode hiện tại
kubectl get cm kube-proxy -n kube-system -o yaml | grep mode

# Verify nftables rules
sudo nft list ruleset | grep k8s
</code></pre>

<h2>6. DNS với CoreDNS</h2>
<p>CoreDNS là DNS server mặc định của Kubernetes, chạy như Deployment trong <code>kube-system</code>.</p>
<pre><code class="language-bash"># CoreDNS pods
kubectl get pods -n kube-system -l k8s-app=kube-dns

# Xem CoreDNS config
kubectl get configmap coredns -n kube-system -o yaml

# Test DNS resolution từ trong pod
kubectl run -it --rm debug --image=busybox:1.36 -- nslookup kubernetes.default
kubectl run -it --rm debug --image=busybox:1.36 -- nslookup backend-service.production.svc.cluster.local
</code></pre>

<h2>7. Network Diagram</h2>
<pre><code class="language-bash">                    ┌─────────────────────────────────────┐
                    │           Kubernetes Cluster          │
                    │                                       │
  External Traffic  │   ┌──────────┐      ┌──────────┐    │
       │            │   │  Node 1  │      │  Node 2  │    │
       ▼            │   │          │      │          │    │
  ┌─────────┐      │   │ Pod A    │      │ Pod B    │    │
  │ Gateway │─────▶│   │ 10.0.1.2 │─────▶│ 10.0.2.3 │    │
  │  API    │      │   │          │      │          │    │
  └─────────┘      │   │ CNI:     │      │ CNI:     │    │
                    │   │ Cilium   │      │ Cilium   │    │
                    │   │ (eBPF)   │      │ (eBPF)   │    │
                    │   └──────────┘      └──────────┘    │
                    └─────────────────────────────────────┘
                              Pod CIDR: 10.0.0.0/16
</code></pre>

<h2>Tóm tắt</h2>
<ul>
  <li>Kubernetes flat network: mỗi Pod có IP riêng, không NAT</li>
  <li>4 patterns: container-to-container (localhost), pod-to-pod (direct IP), pod-to-service (ClusterIP + kube-proxy), external-to-service (NodePort/Gateway API)</li>
  <li>Cilium eBPF: CNI khuyến nghị 2026 — nhanh, L7 observability, Gateway API native</li>
  <li>kube-proxy nftables: thay IPVS (deprecated K8s 1.35)</li>
  <li>CoreDNS: service discovery qua DNS names</li>
</ul>
