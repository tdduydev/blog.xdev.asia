---
id: 019c9618-0006-7000-8000-c1147ba22e10
title: 'LESSON 7: SERVICES AND ENDPOINTSLICES'
slug: bai-7-services-va-endpointslices
description: Service discovery and load balancing with Kubernetes Services. ClusterIP, NodePort, LoadBalancer, ExternalName. EndpointSlices is the new standard that replaces the Endpoints API (deprecated K8s 1.33). Headless Services and DNS in Kubernetes.
duration_minutes: 80
is_free: false
video_url: null
sort_order: 7
section_title: 'Module 2: Basic Kubernetes Objects'
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: 'KUBERNETES: FROM BASIC TO ADVANCED'
  slug: kubernetes-tu-co-ban-den-nang-cao
locale: en
---
<h2>🎯 Lesson Objective</h2><p>Understand why Services are needed in Kubernetes, types of Services and when to use each type, EndpointSlices is the new standard replacing Endpoints API, DNS-based service discovery with CoreDNS.</p>

<h2>1. Why do we need Services?</h2>
<p>Pods have <strong>Dynamic IP</strong> — every time the Pod is recreated (after crash, update, scaling), it gets a new IP. If Service A wants to call Service B, Service A cannot hardcode B's IP.</p>
<p>Service provides a stable <strong>endpoint__HTMLTAG_12___ (IP and DNS name) for a set of Pods. Traffic to the Service will be load balanced to healthy Pods.</p>

<h2>2. Service Types</h2>

<img src="/storage/uploads/2026/03/k8s-service-types-2026.webp" alt="Kubernetes Service Types - ClusterIP, NodePort, LoadBalancer, ExternalName" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h3>2.1 ClusterIP (default)</h3>
<p>Expose service with internal IP in the cluster. Only accessible from within the cluster.</p>
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
<p>Expose service outside the cluster via Node's IP and a static port (30000-32767).</p>
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
<p>Access: <code>http://&lt;any-node-ip&gt;:31000</code></p>

<h3>2.3 LoadBalancer</h3>
<p>Create an external load balancer (on cloud providers: AWS ELB, GCP CLB, Azure LB). Used in production on the cloud.</p>
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
<p>Modern alternative: use <strong>Gateway API</strong> (see Module 4) — more expressive, no vendor lock-in.</p>

<h3>2.4 ExternalName</h3>
<p>Map service to DNS name outside the cluster. No load balancing, just CNAME.</p>
<pre><code class="language-yaml">apiVersion: v1
kind: Service
metadata:
  name: external-db
spec:
  type: ExternalName
  externalName: mydb.example.com
</code></pre>

<h2>3. Service Discovery with DNS</h2>
<p>CoreDNS creates DNS records for each Service. Format:</p>
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

<h2>4. EndpointSlices — New standard K8s 1.33+</h2>
<p>Previously, Kubernetes used <code>Endpoints</code> resource to store the IP list of Pods. Problem: when the number of Pods is large (thousands), the Endpoints object is very large, causing network overhead when updating.</p>
<p><strong>EndpointSlices</strong> divided into slices (default maximum 100 endpoints/slice), significantly improving scalability.</p>
<ul>
  <li>Endpoints API: <strong>deprecated K8s 1.33</strong></li>
  <li>EndpointSlices: current standard, introduced since K8s 1.21</li>
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
<p>Headless Service (<code>clusterIP: None</code>) does not have ClusterIP. DNS query returns IPs of Pods directly, without load balancing. Used for StatefulSets to have stable DNS names for each Pod.</p>
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
<p>By default, each request is round-robin to a random Pod. If you need sticky sessions:</p>
<pre><code class="language-yaml">spec:
  sessionAffinity: ClientIP
  sessionAffinityConfig:
    clientIP:
      timeoutSeconds: 3600  # 1 giờ
</code></pre><h2>7. kube-proxy and Service Implementation</h2>
<p>kube-proxy runs on each Node, implementing Service load balancing by creating iptables/nftables rules.</p>
<ul>
  <li><strong>iptables mode</strong>: legacy, most popular</li>
  <li><strong>nftables mode</strong>: recommended 2026 (IPVS deprecated K8s 1.35)</li>
</ul>
<p>When packet arrives at ClusterIP, iptables/nftables rules redirect to a random IP Pod (DNAT).</p>

<h2>8. Service Best Practices</h2>
<ul>
  <li>Always use <code>ClusterIP</code> for internal services</li>
  <li>Use Gateway API instead of <code>LoadBalancer</code> type for external exposure</li>
  <li>Name the service clearly, use consistent labels</li>
  <li>Use <code>targetPort__HTMLTAG_104___ as the port name instead of the number (flexibility when changing ports in Pod)</li>
  <li>Monitor EndpointSlices to debug connectivity issues__HTMLTAG_107___
</ul>

<h2>Summary</h2>
<ul>
  <li>Service = stable endpoint for dynamic Pods__HTMLTAG_113___
  <li>ClusterIP: internal; NodePort: dev/testing; LoadBalancer: cloud production (but prioritize API Gateway)</li>
  <li>EndpointSlices replaces Endpoints API (deprecated K8s 1.33)</li>
  <li>Headless Service: DNS returns Pod IPs directly, used for StatefulSets</li>
  <li>CoreDNS: <code>svc-name.namespace.svc.cluster.local</code></li>
</ul>