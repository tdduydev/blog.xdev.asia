---
id: ckad-d5-l09
title: 'Bài 9: Services & Ingress'
slug: 09-services-ingress
description: >-
  Service types: ClusterIP, NodePort, LoadBalancer, ExternalName. kubectl expose.
  Ingress resources, IngressClass, TLS termination và path-based routing.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 9
section_title: "Domain 5: Services and Networking (20%)"
course:
  id: lt-ckad-series-001
  title: 'Luyện thi CKAD — Certified Kubernetes Application Developer'
  slug: luyen-thi-ckad
---

<img src="/storage/uploads/2026/04/k8s-cert-ckad-bai9-services-ingress.webp" alt="Service Types và Ingress Routing — ClusterIP, NodePort, LoadBalancer" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="service-types">1. Service Types</h2>

<table>
<thead><tr><th>Type</th><th>Access</th><th>Dùng khi nào</th></tr></thead>
<tbody>
<tr><td><strong>ClusterIP</strong></td><td>Internal only (cluster DNS)</td><td>Service-to-service communication (default)</td></tr>
<tr><td><strong>NodePort</strong></td><td>NodeIP:30000-32767</td><td>Dev/test external access</td></tr>
<tr><td><strong>LoadBalancer</strong></td><td>Cloud LB external IP</td><td>Production external access (cloud)</td></tr>
<tr><td><strong>ExternalName</strong></td><td>CNAME DNS alias</td><td>Route to external DNS name</td></tr>
</tbody>
</table>

<pre><code class="language-text">ClusterIP (default):
apiVersion: v1
kind: Service
metadata:
  name: myapp-svc
spec:
  type: ClusterIP     # Can omit — default
  selector:
    app: myapp
  ports:
  - port: 80          # Service port (what clients connect to)
    targetPort: 8080  # Container port (where app listens)

NodePort:
spec:
  type: NodePort
  ports:
  - port: 80
    targetPort: 8080
    nodePort: 30080   # Optional: 30000-32767 range (auto-assigned if omitted)</code></pre>

<h2 id="kubectl-expose">2. kubectl expose</h2>

<pre><code class="language-text"># Expose Deployment as ClusterIP (default)
kubectl expose deployment myapp --port=80 --target-port=8080

# Expose as NodePort
kubectl expose deployment myapp --port=80 --target-port=8080 --type=NodePort

# Expose a Pod
kubectl expose pod mypod --port=80 --name=mypod-svc

# Expose existing service quickly and redirect traffic
kubectl run nginx --image=nginx --port=80 --expose
# This creates both the Pod AND the ClusterIP Service</code></pre>

<blockquote><p><strong>Exam tip:</strong> <code>kubectl expose</code> cần selector match với Pod labels. Nếu Deployment đang dùng <code>app: myapp</code>, Service selector phải là <code>app: myapp</code>. Flag <code>--expose</code> khi dùng với <code>kubectl run</code> tạo cả Pod lẫn Service cùng lúc — rất nhanh trong exam.</p></blockquote>

<h2 id="ingress">3. Ingress</h2>

<p>Ingress là L7 HTTP/HTTPS routing — một điểm vào, route đến nhiều Services dựa trên host/path.</p>

<pre><code class="language-text">                     ┌─────────────────────────────────┐
Internet ──────────►│   Ingress Controller (nginx)     │
                     │                                  │
                     │  /api  ──────────► api-service   │
                     │  /web  ──────────► web-service   │
                     │  blog.example.com → blog-service │
                     └─────────────────────────────────┘</code></pre>

<pre><code class="language-text">apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx       # Which IngressClass to use
  tls:
  - hosts:
    - myapp.example.com
    secretName: myapp-tls       # TLS cert stored as Secret
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /api
        pathType: Prefix        # Prefix or Exact
        backend:
          service:
            name: api-service
            port:
              number: 80
      - path: /web
        pathType: Prefix
        backend:
          service:
            name: web-service
            port:
              number: 80</code></pre>

<table>
<thead><tr><th>pathType</th><th>Hành vi</th><th>Ví dụ</th></tr></thead>
<tbody>
<tr><td><strong>Exact</strong></td><td>Match chính xác path</td><td><code>/api</code> chỉ match <code>/api</code></td></tr>
<tr><td><strong>Prefix</strong></td><td>Match path prefix</td><td><code>/api</code> match <code>/api</code>, <code>/api/v1</code>, <code>/api/users</code></td></tr>
<tr><td><strong>ImplementationSpecific</strong></td><td>Tùy IngressClass</td><td>Depends on controller</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> Ingress cần <strong>Ingress Controller</strong> (như nginx, traefik) mới hoạt động — Ingress resource chỉ là config. IngressClass chỉ định controller nào xử lý. Trong exam, IngressClass thường đã được setup sẵn. Nhớ check <code>kubectl get ingressclass</code> để biết tên.</p></blockquote>

<h2 id="debug-service">4. Debug Service Connectivity</h2>

<pre><code class="language-text"># Check service exists và endpoints
kubectl get services
kubectl get endpoints myapp-svc

# Test connectivity từ trong cluster (create temp pod)
kubectl run test --image=busybox --rm -it -- wget -qO- http://myapp-svc
kubectl run test --image=curlimages/curl --rm -it -- curl http://myapp-svc:80

# Check if selector matches pods
kubectl get pods -l app=myapp  # Should match service selector
kubectl describe service myapp-svc  # Shows Endpoints section

# If Endpoints is empty: selector mismatch!
# Check: kubectl get pods --show-labels</code></pre>

<h2 id="cheatsheet">5. Cheat Sheet</h2>

<table>
<thead><tr><th>Task</th><th>Command</th></tr></thead>
<tbody>
<tr><td>Expose Deployment</td><td><code>kubectl expose deploy/app --port=80 --type=NodePort</code></td></tr>
<tr><td>Create Pod + Service</td><td><code>kubectl run nginx --image=nginx --port=80 --expose</code></td></tr>
<tr><td>Check service endpoints</td><td><code>kubectl get endpoints svc-name</code></td></tr>
<tr><td>Test service từ trong cluster</td><td><code>kubectl run tmp --image=busybox --rm -it -- wget -O- http://svc</code></td></tr>
<tr><td>Ingress với TLS</td><td>tls: secretName + hosts trong rules</td></tr>
</tbody>
</table>

<h2 id="practice">6. Practice Questions</h2>

<p><strong>Q1:</strong> A Deployment named "webapp" with selector app=webapp runs on port 8080. You need to create a Service that makes it accessible within the cluster on port 80. Which command creates this correctly?</p>
<ul>
<li>A) <code>kubectl expose deployment webapp --port=8080</code></li>
<li>B) <code>kubectl expose deployment webapp --port=80 --target-port=8080</code> ✓</li>
<li>C) <code>kubectl create service clusterip webapp --port=8080:80</code></li>
<li>D) <code>kubectl expose deployment webapp --type=ClusterIP --port=80</code></li>
</ul>
<p><em>Explanation: --port=80 is the Service port (what clients use), --target-port=8080 is the container port (where the app listens). Without --target-port, Kubernetes assumes target-port equals port. Option D would work but uses same port 80 for both.</em></p>

<p><strong>Q2:</strong> An Ingress resource exists but traffic doesn't reach the backend Services. kubectl get endpoints shows the correct Pod IPs. What is the most likely cause?</p>
<ul>
<li>A) The Service type should be LoadBalancer instead of ClusterIP</li>
<li>B) No Ingress Controller is installed or the ingressClassName is wrong ✓</li>
<li>C) The Ingress needs TLS configured</li>
<li>D) The pathType should be Exact instead of Prefix</li>
</ul>
<p><em>Explanation: Ingress resources are just configuration objects. Without an Ingress Controller, nothing processes the rules. If the ingressClassName doesn't match an IngressClass connected to a running controller, the Ingress is effectively ignored. Always verify kubectl get ingressclass and that the controller Pod is running.</em></p>

<p><strong>Q3:</strong> Which Service type provides external access using a port in the range 30000-32767 on every cluster node?</p>
<ul>
<li>A) ClusterIP</li>
<li>B) ExternalName</li>
<li>C) NodePort ✓</li>
<li>D) LoadBalancer</li>
</ul>
<p><em>Explanation: NodePort opens a port in the 30000-32767 range on every Node in the cluster. External traffic can reach the Service via NodeIP:NodePort. This is typically used for development and testing. LoadBalancer provides a cloud load balancer with a stable external IP, which is preferred for production.</em></p>
