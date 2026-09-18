---
id: cka-d3-l06
title: 'Bài 6: Services, Endpoints & CoreDNS'
slug: 06-services-endpoints-coredns
description: >-
  Service types sâu hơn, Endpoints object, kube-proxy modes. CoreDNS
  configuration và troubleshooting DNS. ExternalName, headless services.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 6
section_title: "Domain 3: Services & Networking (20%)"
course:
  id: lt-cka-series-001
  title: 'Luyện thi CKA — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai6-coredns.webp" alt="CoreDNS, kube-proxy và Service Discovery trong Kubernetes" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="services-deep">1. Services & Endpoints</h2>

<p>Khi Service được tạo, Kubernetes tự động tạo <strong>Endpoints</strong> object chứa danh sách IPs của Pods matching selector.</p>

<pre><code class="language-text"># Service → Endpoints → Pods
kubectl get service my-app        # Virtual IP (ClusterIP)
kubectl get endpoints my-app      # List: 10.244.1.2:80, 10.244.1.3:80
kubectl describe endpoints my-app # Detailed

# Nếu Endpoints rỗng → service selector không match pod labels
# Debug: so sánh service selector vs pod labels
kubectl get svc my-app -o jsonpath='{.spec.selector}'
kubectl get pods --show-labels | grep app=my-app</code></pre>

<h2 id="coredns">2. CoreDNS Configuration</h2>

<pre><code class="language-text"># CoreDNS runs as Deployment in kube-system
kubectl get pods -n kube-system -l k8s-app=kube-dns
kubectl get configmap coredns -n kube-system -o yaml

# Default Corefile:
.:53 {
    errors
    health { lameduck 5s }
    ready
    kubernetes cluster.local in-addr.arpa ip6.arpa {  # cluster domain
       pods insecure
       fallthrough in-addr.arpa ip6.arpa
    }
    prometheus :9153
    forward . /etc/resolv.conf  # Forward non-cluster queries to upstream
    cache 30
    loop
    reload
    loadbalance
}</code></pre>

<blockquote><p><strong>Exam tip:</strong> CoreDNS troubleshooting: 1) Check CoreDNS Pods running, 2) Check kube-dns Service in kube-system, 3) Run <code>kubectl exec -it pod -- nslookup kubernetes</code> to test DNS from inside pod, 4) Check Pod's <code>/etc/resolv.conf</code> points to kube-dns cluster IP.</p></blockquote>

<h2 id="kube-proxy">3. kube-proxy Modes</h2>

<table>
<thead><tr><th>Mode</th><th>Mechanism</th><th>Performance</th></tr></thead>
<tbody>
<tr><td><strong>iptables</strong> (default)</td><td>Linux iptables rules, random pod selection</td><td>Good, O(n) rules</td></tr>
<tr><td><strong>IPVS</strong></td><td>Linux IPVS (kernel, hash-based)</td><td>Better for large clusters</td></tr>
<tr><td><strong>userspace</strong> (deprecated)</td><td>User-space proxy</td><td>Slow, legacy</td></tr>
</tbody>
</table>

<h2 id="headless-services">4. Headless Services</h2>

<pre><code class="language-text"># Headless: clusterIP: None
# DNS returns Pod IPs directly (không qua virtual IP)
apiVersion: v1
kind: Service
metadata:
  name: mysql-headless
spec:
  clusterIP: None
  selector:
    app: mysql
  ports:
  - port: 3306

# DNS behavior:
# mysql-headless → multiple A records (one per Pod IP)
# mysql-0.mysql-headless → specific Pod IP (StatefulSet)</code></pre>

<h2 id="debug-dns">5. DNS Troubleshooting Commands</h2>

<pre><code class="language-text"># Test DNS từ trong pod
kubectl run dns-test --image=busybox --rm -it -- nslookup kubernetes
kubectl run dns-test --image=busybox --rm -it -- nslookup my-service.namespace

# Check resolv.conf trong pod
kubectl exec -it my-pod -- cat /etc/resolv.conf
# Should show: nameserver 10.96.0.10 (kube-dns service IP)

# Check CoreDNS logs
kubectl logs -n kube-system -l k8s-app=kube-dns

# Check kube-dns service
kubectl get svc -n kube-system kube-dns</code></pre>

<h2 id="cheatsheet">6. Cheat Sheet</h2>

<table>
<thead><tr><th>Problem</th><th>Check</th></tr></thead>
<tbody>
<tr><td>Service không thể reach pods</td><td>kubectl get endpoints NAME</td></tr>
<tr><td>Endpoints empty</td><td>Service selector vs Pod labels mismatch</td></tr>
<tr><td>Pod không resolve DNS</td><td>/etc/resolv.conf + CoreDNS pods status</td></tr>
<tr><td>StatefulSet pod DNS</td><td>Cần headless service cùng tên với serviceName</td></tr>
</tbody>
</table>

<h2 id="practice">7. Practice Questions</h2>

<p><strong>Q1:</strong> A Service is created but traffic never reaches the Pods. The Endpoints object for the Service shows "no endpoints". What is the most likely cause?</p>
<ul>
<li>A) The Service port doesn't match the container port</li>
<li>B) The Service selector labels don't match the Pod labels ✓</li>
<li>C) A NetworkPolicy is blocking traffic</li>
<li>D) The Pods are in a different cluster</li>
</ul>
<p><em>Explanation: Empty Endpoints means the Service can't find any matching Pods. This is caused by a label selector mismatch. Verify with: kubectl get svc myapp -o jsonpath='{.spec.selector}' and compare with kubectl get pods --show-labels.</em></p>

<p><strong>Q2:</strong> A Pod running in namespace "frontend" needs to reach a Service "payments" in namespace "backend". Which DNS name is correct?</p>
<ul>
<li>A) payments</li>
<li>B) payments.backend</li>
<li>C) payments.backend.svc.cluster.local ✓</li>
<li>D) backend.payments.cluster.local</li>
</ul>
<p><em>Explanation: Cross-namespace DNS requires the full namespace: {service}.{namespace}.svc.cluster.local. Short names only work within the same namespace. Both B and C work, but C is the most explicit and reliable form.</em></p>

<p><strong>Q3:</strong> CoreDNS is not responding. What sequence of steps should you follow to diagnose?</p>
<ul>
<li>A) Restart the entire cluster</li>
<li>B) Check CoreDNS Pods running, check kube-dns Service ClusterIP, test from inside a Pod with nslookup ✓</li>
<li>C) Reinstall kube-proxy</li>
<li>D) Recreate the kube-system namespace</li>
</ul>
<p><em>Explanation: Systematic DNS debugging: (1) kubectl get pods -n kube-system -l k8s-app=kube-dns, (2) verify kube-dns Service has ClusterIP, (3) check Pod's /etc/resolv.conf points to that IP, (4) run nslookup from a test pod.</em></p>
