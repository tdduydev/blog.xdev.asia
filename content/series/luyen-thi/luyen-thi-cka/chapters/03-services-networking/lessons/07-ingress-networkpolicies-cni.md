---
id: cka-d3-l07
title: 'Bài 7: Ingress, Network Policies & CNI'
slug: 07-ingress-networkpolicies-cni
description: >-
  Ingress resources và controllers. Network Policies isolate traffic.
  CNI plugins: Flannel, Calico, Cilium. Troubleshoot Pod networking.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 7
section_title: "Domain 3: Services & Networking (20%)"
course:
  id: lt-cka-series-001
  title: 'Luyện thi CKA — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai7-ingress-network.webp" alt="Ingress Routing và NetworkPolicy — L7 routing và network segmentation" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="ingress">1. Ingress</h2>

<p><strong>Ingress</strong> cung cấp HTTP/HTTPS routing vào cluster. Cần <strong>Ingress Controller</strong> (nginx-ingress, Traefik, ALB) để xử lý Ingress resources.</p>

<pre><code class="language-text">Internet
   │
[Ingress Controller] (nginx Pod, port 80/443)
   │
   ├── /api/* ──────────────► Service: api-svc:8080
   ├── /web/* ──────────────► Service: web-svc:80
   └── shop.example.com ───► Service: shop-svc:3000</code></pre>

<pre><code class="language-text">apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
  - host: api.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: api-svc
            port:
              number: 8080
  tls:
  - hosts:
    - api.example.com
    secretName: tls-secret  # TLS cert stored in Secret</code></pre>

<blockquote><p><strong>Exam tip:</strong> Ingress không hoạt động nếu không có <strong>Ingress Controller</strong>. CKA exam thường đã có controller cài sẵn. Kiểm tra <code>kubectl get ingressclass</code> để xem class name cần dùng trong <code>spec.ingressClassName</code>.</p></blockquote>

<h2 id="network-policies">2. Network Policies — CKA Depth</h2>

<pre><code class="language-text">apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-backend
  namespace: app
spec:
  podSelector:
    matchLabels:
      app: backend      # Apply to backend pods
  policyTypes:
  - Ingress             # Control incoming traffic
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend  # Only from frontend pods
    ports:
    - protocol: TCP
      port: 8080

---
# Deny all ingress (default deny)
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all
spec:
  podSelector: {}     # Select ALL pods
  policyTypes:
  - Ingress           # No ingress rules = block all ingress</code></pre>

<table>
<thead><tr><th>Selector</th><th>Ý nghĩa</th></tr></thead>
<tbody>
<tr><td><code>podSelector: {}</code></td><td>Select tất cả Pods trong namespace</td></tr>
<tr><td><code>namespaceSelector</code></td><td>Cho phép traffic từ specific namespace</td></tr>
<tr><td><code>ipBlock</code></td><td>Cho phép traffic từ CIDR range</td></tr>
</tbody>
</table>

<h2 id="cni">3. CNI Plugins</h2>

<table>
<thead><tr><th>CNI</th><th>Network Policy?</th><th>Đặc điểm</th></tr></thead>
<tbody>
<tr><td><strong>Flannel</strong></td><td>Không</td><td>Simple overlay, VXLAN/host-gw</td></tr>
<tr><td><strong>Calico</strong></td><td>Có</td><td>BGP routing, high performance, enterprise</td></tr>
<tr><td><strong>Cilium</strong></td><td>Có (eBPF)</td><td>eBPF-based, L7 policies, observability</td></tr>
<tr><td><strong>Weave Net</strong></td><td>Có</td><td>Simple, mesh network</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> Calico và Cilium hỗ trợ NetworkPolicy. Flannel không. Nếu exam hỏi "configure network policies" → phải có Calico/Cilium. Trên kubeadm lab, Calico là lựa chọn phổ biến nhất.</p></blockquote>

<h2 id="pod-network-debug">4. Pod Network Troubleshooting</h2>

<pre><code class="language-text"># Test pod-to-pod connectivity
kubectl exec -it pod1 -- ping 10.244.1.5
kubectl exec -it pod1 -- curl http://pod2:8080

# Check pod's IP
kubectl get pod pod1 -o jsonpath='{.status.podIP}'

# Check CNI config on node
ls /etc/cni/net.d/
cat /etc/cni/net.d/10-calico.conflist

# Check kube-proxy rules
kubectl get pod -n kube-system -l k8s-app=kube-proxy
iptables -t nat -L KUBE-SERVICES | head -20</code></pre>

<h2 id="cheatsheet">5. Cheat Sheet</h2>

<table>
<thead><tr><th>Task</th><th>Command/Object</th></tr></thead>
<tbody>
<tr><td>HTTP routing into cluster</td><td><strong>Ingress</strong> (+ IngressClass)</td></tr>
<tr><td>Block all traffic to a Pod</td><td>NetworkPolicy with empty ingress: []</td></tr>
<tr><td>Allow traffic from namespace</td><td>NetworkPolicy with namespaceSelector</td></tr>
<tr><td>Check CNI plugins</td><td><code>ls /etc/cni/net.d/</code></td></tr>
<tr><td>Check ingressclass</td><td><code>kubectl get ingressclass</code></td></tr>
</tbody>
</table>

<h2 id="practice">6. Practice Questions</h2>

<p><strong>Q1:</strong> You create an Ingress resource but it has no ADDRESS and traffic doesn't route. What is the most likely cause?</p>
<ul>
<li>A) The Service type must be LoadBalancer</li>
<li>B) No Ingress Controller is installed in the cluster ✓</li>
<li>C) The Ingress must be in the kube-system namespace</li>
<li>D) The IngressClass must be set to "default"</li>
</ul>
<p><em>Explanation: An Ingress resource is just configuration — it has no effect without an Ingress Controller (nginx, Traefik, etc.) to implement it. The controller watches Ingress objects and configures the actual proxy.</em></p>

<p><strong>Q2:</strong> A NetworkPolicy selects Pods with label app=database and specifies policyTypes: [Ingress]. No ingress rules are defined. What is the effect?</p>
<ul>
<li>A) All traffic is allowed (no rules = allow all)</li>
<li>B) All ingress traffic to database Pods is blocked ✓</li>
<li>C) Only egress traffic is affected</li>
<li>D) The policy is invalid and has no effect</li>
</ul>
<p><em>Explanation: A NetworkPolicy with policyTypes: [Ingress] but empty ingress rules acts as a default deny for all ingress traffic to the selected Pods. This is a common way to implement default-deny policies.</em></p>

<p><strong>Q3:</strong> Which CNI plugin should you choose if you need both pod networking AND NetworkPolicy enforcement?</p>
<ul>
<li>A) Flannel</li>
<li>B) Calico ✓</li>
<li>C) CoreDNS</li>
<li>D) kube-proxy</li>
</ul>
<p><em>Explanation: Flannel provides only overlay networking without NetworkPolicy support. Calico (and Cilium, Weave) implement the NetworkPolicy API. CoreDNS is DNS, and kube-proxy handles Service load balancing — they're not CNI plugins.</em></p>
