---
id: 019c9618-0006-7000-8000-c1147ba22e10
title: 'BÀI 7: SERVICES VÀ ENDPOINTSLICES'
slug: bai-7-services-va-endpointslices
description: >-
  Service discovery và load balancing với Kubernetes Services. ClusterIP, NodePort, LoadBalancer,
  ExternalName. EndpointSlices là chuẩn mới thay thế Endpoints API (deprecated K8s 1.33).
  Headless Services và DNS trong Kubernetes.
duration_minutes: 80
is_free: false
video_url: null
sort_order: 7
section_title: 'Module 2: Kubernetes Objects Cơ bản'
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: 'KUBERNETES: TỪ CƠ BẢN ĐẾN NÂANG CAO'
  slug: kubernetes-tu-co-ban-den-nang-cao
---
<h2>🎯 Mục tiêu bài học</h2><p>Hiểu tại sao cần Service trong Kubernetes, các loại Service và khi nào dùng mỗi loại, EndpointSlices là chuẩn mới thay thế Endpoints API, DNS-based service discovery với CoreDNS.</p>

<h2>1. Tại sao cần Services?</h2>
<p>Pods có <strong>IP động</strong> — mỗi lần Pod được tạo lại (sau crash, update, scaling), nó nhận IP mới. Nếu Service A muốn gọi Service B, Service A không thể hardcode IP của B.</p>
<p>Service cung cấp một <strong>endpoint ổn định</strong> (IP và DNS name) cho một tập hợp Pods. Traffic đến Service sẽ được load balance tới các Pods khỏe mạnh.</p>

<h2>2. Service Types</h2>

<img src="/storage/uploads/2026/03/k8s-service-types-2026.webp" alt="Kubernetes Service Types - ClusterIP, NodePort, LoadBalancer, ExternalName" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h3>2.1 ClusterIP (mặc định)</h3>
<p>Expose service với IP nội bộ trong cluster. Chỉ accessible từ trong cluster.</p>
<pre><code class="language-yaml">apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  type: ClusterIP   # mặc định, có thể bỏ qua
  selector:
    app: backend
  ports:
  - port: 80        # port của Service (clients dùng port này)
    targetPort: 8080 # port của Pods
</code></pre>

<h3>2.2 NodePort</h3>
<p>Expose service ra ngoài cluster qua IP của Node và một port tĩnh (30000-32767).</p>
<pre><code class="language-yaml">apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  type: NodePort
  selector:
    app: frontend
  ports:
  - port: 80
    targetPort: 3000
    nodePort: 31000   # cố định port, hoặc để K8s tự chọn
</code></pre>
<p>Truy cập: <code>http://&lt;any-node-ip&gt;:31000</code></p>

<h3>2.3 LoadBalancer</h3>
<p>Tạo external load balancer (trên cloud providers: AWS ELB, GCP CLB, Azure LB). Dùng trong production trên cloud.</p>
<pre><code class="language-yaml">apiVersion: v1
kind: Service
metadata:
  name: api-service
spec:
  type: LoadBalancer
  selector:
    app: api
  ports:
  - port: 80
    targetPort: 8080
</code></pre>
<p>Thay thế hiện đại: dùng <strong>Gateway API</strong> (xem Module 4) — expressive hơn, không vendor lock-in.</p>

<h3>2.4 ExternalName</h3>
<p>Map service đến DNS name bên ngoài cluster. Không tạo load balancing, chỉ là CNAME.</p>
<pre><code class="language-yaml">apiVersion: v1
kind: Service
metadata:
  name: external-db
spec:
  type: ExternalName
  externalName: mydb.example.com
</code></pre>

<h2>3. Service Discovery với DNS</h2>
<p>CoreDNS tạo DNS records cho mỗi Service. Format:</p>
<pre><code class="language-bash"># Service trong cùng namespace
http://backend-service

# Service trong namespace khác
http://backend-service.production.svc.cluster.local

# Format đầy đủ
{service-name}.{namespace}.svc.{cluster-domain}
</code></pre>
<pre><code class="language-bash"># Kiểm tra DNS từ trong pod
kubectl exec -it debug-pod -- nslookup backend-service
kubectl exec -it debug-pod -- curl http://backend-service/api
</code></pre>

<h2>4. EndpointSlices — Chuẩn mới K8s 1.33+</h2>
<p>Trước đây, Kubernetes dùng <code>Endpoints</code> resource để lưu danh sách IP của Pods. Vấn đề: khi số lượng Pods lớn (hàng nghìn), Endpoints object rất lớn, gây network overhead khi update.</p>
<p><strong>EndpointSlices</strong> chia nhỏ thành các slices (mặc định tối đa 100 endpoints/slice), cải thiện scalability đáng kể.</p>
<ul>
  <li>Endpoints API: <strong>deprecated K8s 1.33</strong></li>
  <li>EndpointSlices: chuẩn hiện tại, đã GA từ K8s 1.21</li>
</ul>
<pre><code class="language-bash"># Xem EndpointSlices
kubectl get endpointslices
kubectl get endpointslices -l kubernetes.io/service-name=backend-service -o yaml

# Xem Endpoints (deprecated, vẫn hoạt động nhưng tránh dùng)
kubectl get endpoints
</code></pre>
<pre><code class="language-yaml">apiVersion: discovery.k8s.io/v1
kind: EndpointSlice
metadata:
  name: backend-service-xyz
  labels:
    kubernetes.io/service-name: backend-service
addressType: IPv4
ports:
- name: http
  protocol: TCP
  port: 8080
endpoints:
- addresses:
  - 10.244.1.5
  conditions:
    ready: true
    serving: true
  targetRef:
    kind: Pod
    name: backend-pod-abc
</code></pre>

<h2>5. Headless Services</h2>
<p>Headless Service (<code>clusterIP: None</code>) không có ClusterIP. DNS query trả về trực tiếp IPs của các Pods, không qua load balancing. Dùng cho StatefulSets để có stable DNS names cho từng Pod.</p>
<pre><code class="language-yaml">apiVersion: v1
kind: Service
metadata:
  name: postgres-headless
spec:
  clusterIP: None     # Headless
  selector:
    app: postgres
  ports:
  - port: 5432
</code></pre>
<pre><code class="language-bash"># DNS resolution cho headless service
# Trả về danh sách Pod IPs
nslookup postgres-headless.production.svc.cluster.local

# DNS resolution cho từng Pod trong StatefulSet
nslookup postgres-0.postgres-headless.production.svc.cluster.local
nslookup postgres-1.postgres-headless.production.svc.cluster.local
</code></pre>

<h2>6. Session Affinity</h2>
<p>Mặc định, mỗi request được round-robin đến một Pod ngẫu nhiên. Nếu cần sticky sessions:</p>
<pre><code class="language-yaml">spec:
  sessionAffinity: ClientIP
  sessionAffinityConfig:
    clientIP:
      timeoutSeconds: 3600  # 1 giờ
</code></pre>

<h2>7. kube-proxy và Service Implementation</h2>
<p>kube-proxy chạy trên mỗi Node, implement Service load balancing bằng cách tạo iptables/nftables rules.</p>
<ul>
  <li><strong>iptables mode</strong>: legacy, phổ biến nhất</li>
  <li><strong>nftables mode</strong>: khuyến nghị 2026 (IPVS deprecated K8s 1.35)</li>
</ul>
<p>Khi packet đến ClusterIP, iptables/nftables rules chuyển hướng đến một Pod IP ngẫu nhiên (DNAT).</p>

<h2>8. Service Best Practices</h2>
<ul>
  <li>Luôn dùng <code>ClusterIP</code> cho internal services</li>
  <li>Dùng Gateway API thay vì <code>LoadBalancer</code> type cho external exposure</li>
  <li>Đặt tên service rõ ràng, dùng labels nhất quán</li>
  <li>Dùng <code>targetPort</code> là tên port thay vì số (flexibility khi thay đổi port trong Pod)</li>
  <li>Theo dõi EndpointSlices để debug connectivity issues</li>
</ul>

<h2>Tóm tắt</h2>
<ul>
  <li>Service = stable endpoint cho dynamic Pods</li>
  <li>ClusterIP: internal; NodePort: dev/testing; LoadBalancer: cloud production (nhưng ưu tiên Gateway API)</li>
  <li>EndpointSlices thay thế Endpoints API (deprecated K8s 1.33)</li>
  <li>Headless Service: DNS trả về Pod IPs trực tiếp, dùng cho StatefulSets</li>
  <li>CoreDNS: <code>svc-name.namespace.svc.cluster.local</code></li>
</ul>
