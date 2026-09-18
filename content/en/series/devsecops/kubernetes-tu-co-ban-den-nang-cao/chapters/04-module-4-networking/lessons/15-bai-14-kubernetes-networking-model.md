---
id: 019c9618-0201-7000-8000-c1147ba22e12
title: 'LESSON 14: KUBERNETES NETWORKING MODEL'
slug: bai-14-kubernetes-networking-model
description: 'Kubernetes network model: Container-to-Container, Pod-to-Pod, Pod-to-Service, External-to-Service. CNI plugins, Cilium eBPF (recommended 2026), Calico, kube-proxy nftables (IPVS deprecated K8s 1.35).'
duration_minutes: 90
is_free: false
video_url: null
sort_order: 14
section_title: 'Module 4: Networking'
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: 'KUBERNETES: FROM BASIC TO ADVANCED'
  slug: kubernetes-tu-co-ban-den-nang-cao
locale: en
---
<h2>🎯 Lesson Objective</h2><p>Understand the basic to advanced Kubernetes network model: why each Pod has its own IP, 4 types of communication patterns, CNI plugins (Cilium recommended 2026), and kube-proxy with nftables.</p>

<img src="/storage/uploads/2026/03/k8s-networking-model-2026.webp" alt="Kubernetes Networking Model - 4 Communication Patterns" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h2>1. Kubernetes Networking Requirements</h2>
<p>Kubernetes has 3 core networking requirements:</p>
<ul>
  <li>Every Pod must be able to communicate with every other Pod in the cluster <strong>no need for NAT</strong></li>
  <li>Every Node must be able to communicate with every Pod <strong>no need for NAT</strong></li>
  <li>The IP that the Pod itself sees must be the same as the IP that other Pods see__HTMLTAG_19___
</ul>
<p>This is a "flat network model" — unlike the default Docker (NAT-based).</p>

<h2>2. Four Communication Patterns</h2>

<h3>2.1 Container-to-Container (in the same Pod)</h3>
<p>Containers in the same Pod share network namespace → communicate via <code>localhost</code>.</p>
<pre><code class="language-bash"># Container A call container B (cùng pod)
curl http://localhost:8080/api
</code></pre>

<h3>2.2 Pod-to-Pod</h3>
<p>Each Pod has a separate IP in the cluster. Pods communicate directly over IP — CNI plugin ensures routing.</p>
<pre><code class="language-bash"># Pod A (10.244.1.5) gọi Pod B (10.244.2.3)
curl http://10.244.2.3:8080/api

# Thực tế nên dùng Service name, không hardcode IP
curl http://backend-service/api
</code></pre>

<h3>2.3 Pod-to-Service</h3>
<p>Pods communicate with the Service via ClusterIP (virtual IP). kube-proxy creates iptables/nftables rules to DNAT (destination NAT) to real Pod IP.</p>
<pre><code class="language-bash"># Client Pod → Service ClusterIP (10.96.0.100) → kube-proxy rules → Pod IP (10.244.x.x)
curl http://backend-service    # CoreDNS resolve → ClusterIP → Pod
</code></pre>

<h3>2.4 External-to-Service</h3>
<p>Traffic from outside the cluster to the Service via NodePort, LoadBalancer, or Gateway API (HTTPRoute).</p>

<h2>3. CNI (Container Network Interface)</h2>
<p>CNI is the standard interface between Kubernetes and network plugins. When the Pod is created, the kubelet calls the CNI plugin to:</p>
<ul>
  <li>Create network interface for Pod</li>
  <li>Assign IP address</li>
  <li>Routing configuration</li>
</ul>

<h3>3.1 Cilium — Recommended 2026</h3>
<p>Cilium uses <strong>eBPF (extended Berkeley Packet Filter)</strong> at the kernel level — no need for iptables chains.</p>
<p><strong>Cilium Advantages</strong>:</p>
<ul>
  <li>eBPF: fast, programmable, kernel-level networking</li>
  <li>L7 visibility and load balancing (HTTP, gRPC, Kafka)</li>
  <li>Built-in observability with <strong>Hubble</strong> (real-time network traffic)</li>
  <li>Native Gateway API implementation</li>
  <li>Sidecarless Service Mesh (no need for Envoy sidecar)</li>
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
<p>Calico is CNI mature with eBPF dataplane support (optional), BGP routing for bare metal. Suitable when broad compatibility or BGP peering with physical routers is needed.</p><h3>3.3 Flannel</h3>
<p>Flannel is simple and easy to install, but <strong>lacks Network Policy support and observability</strong>. Not recommended for production.</p>

<h2>4. eBPF — Why is it faster than iptables?</h2>
<p>iptables uses linear rule matching — O(n) with n rules. When the cluster has thousands of services, the iptables chain is very long, affecting performance.</p>
<p>eBPF uses hash maps — O(1) lookup regardless of number of services. eBPF programs run directly in the kernel, without a context switch to user space.</p>
<pre><code class="language-bash">              iptables (legacy):
User Space ←→ Kernel iptables chains (linear rules)
                   ↓ O(n) per packet

              eBPF (Cilium):
User Space    Kernel eBPF programs + hash maps
                   ↓ O(1) per packet
</code></pre>

<h2>5. kube-proxy Modes 2026</h2>
<p>kube-proxy implements Service load balancing on each Node.</p>

<h3>5.1 iptables mode (legacy)</h3>
<p>Create iptables DNAT rules for each Service endpoint. Still works but less scalable.</p>

<h3>5.2 nftables mode — Recommended 2026</h3>
<p><strong>IPVS mode deprecated K8s 1.35</strong>. nftables is the new backend, more efficient than iptables.</p>
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

<h2>6. DNS with CoreDNS</h2>
<p>CoreDNS is the default DNS server of Kubernetes, running as Deployment in <code>kube-system</code>.</p>
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

<h2>Summary</h2>
<ul>
  <li>Kubernetes flat network: each Pod has its own IP, no NAT</li>
  <li>4 patterns: container-to-container (localhost), pod-to-pod (direct IP), pod-to-service (ClusterIP + kube-proxy), external-to-service (NodePort/Gateway API)</li>
  <li>Cilium eBPF: CNI recommended 2026 — fast, L7 observability, native API Gateway</li>
  <li>kube-proxy nftables: replace IPVS (deprecated K8s 1.35)</li>
  <li>CoreDNS: service discovery via DNS names</li>
</ul>