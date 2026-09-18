---
id: 019c9618-0004-7000-8000-c1147ba22e10
title: 'LESSON 5: PODS'
slug: bai-5-pods
description: Deep dive into Pods - the basic deployment unit in Kubernetes. Multi-container pods, Sidecar containers GA (K8s 1.33), Init containers, Ephemeral containers for debugging, Pod lifecycle and resource management.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 5
section_title: 'Module 2: Basic Kubernetes Objects'
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: 'KUBERNETES: FROM BASIC TO ADVANCED'
  slug: kubernetes-tu-co-ban-den-nang-cao
locale: en
---
<h2>🎯 Lesson Objective</h2><p>After this lesson, you will understand that Pod is the most basic unit in Kubernetes, how Pod shares network namespace, how to use Sidecar containers (GA K8s 1.33), Init containers, Ephemeral containers for debugging, and manage the lifecycle and resources of Pod.</p>

<h2>1. What is a Pod?</h2>

<img src="/storage/uploads/2026/03/k8s-pod-lifecycle-2026.webp" alt="Kubernetes Pod Lifecycle Diagram" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<p>Pod is the smallest scheduling unit in Kubernetes. A Pod consists of <strong>one or more containers</strong> running on the same Node, shared in common:</p>
<ul>
  <li><strong>Network namespace</strong>: same IP address, same port space — containers communicate with each other via <code>localhost</code></li>
  <li><strong>Storage volumes</strong>: volumes mounted to Pod can be accessed by many containers</li>
  <li><strong>Linux namespaces</strong> (depending on configuration): PID namespace, IPC namespace</li>
</ul>
<p>Why not deploy the container directly? Kubernetes manages Pods, not containers. Pod is an abstraction layer that helps group closely related processes together.</p>

<h2>2. Simple Pod Example</h2>
<pre><code class="language-yaml">apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.27
    ports:
    - containerPort: 80
    resources:
      requests:
        cpu: "100m"
        memory: "128Mi"
      limits:
        cpu: "500m"
        memory: "256Mi"
</code></pre>
<pre><code class="language-bash">kubectl apply -f pod.yaml
kubectl get pods
kubectl describe pod nginx-pod
kubectl logs nginx-pod
kubectl exec -it nginx-pod -- /bin/bash
</code></pre>

<h2>3. Multi-container Pods</h2>
<p>There are 3 common patterns for multi-container Pods:</p>
<h3>3.1 Sidecar Pattern</h3>
<p>The secondary container supports the main container (log forwarder, proxy, OTel collector).</p>
<h3>3.2 Ambassador Pattern</h3>
<p>The proxy container communicates with the outside world on behalf of the main container.</p>
<h3>3.3 Adapter Pattern</h3>
<p>Container normalizes output from the main container to a standard format.</p>

<h2>4. Sidecar Containers GA — K8s 1.33</h2>
<p>Before K8s 1.33, sidecar containers were implemented as regular init containers, causing a lifecycle problem: when the main container finished, the sidecar was still running and the Job never completed.</p>
<p><strong>K8s Solution 1.33</strong>: The official sidecar container is <code>initContainer</code> with <code>restartPolicy: Always</code>. Kubernetes will:</p>
<ul>
  <li>Start sidecar before main container__HTMLTAG_61___
  <li>Restart sidecar if it crashes (independent of main container)</li>
  <li>Terminate sidecar after main container ends</li>
  <li>Sidecar does not block Job completion</li>
</ul>
<pre><code class="language-yaml">apiVersion: v1
kind: Pod
metadata:
  name: app-with-sidecar
spec:
  initContainers:
  # Sidecar container (K8s 1.33+)
  - name: log-forwarder
    image: grafana/alloy:latest
    restartPolicy: Always       # Đây là key để biến init container thành sidecar
    volumeMounts:
    - name: logs
      mountPath: /var/log/app
    resources:
      requests:
        cpu: "50m"
        memory: "64Mi"
  containers:
  - name: app
    image: myapp:v1
    volumeMounts:
    - name: logs
      mountPath: /var/log/app
  volumes:
  - name: logs
    emptyDir: {}
</code></pre>
<p>Use cases for Sidecar containers: Grafana Alloy log agent, OpenTelemetry Collector, Envoy proxy (in service mesh), Vault agent injector.</p><h2>5. Init Containers</h2>
<p>Init containers run <strong>run-to-completion</strong> before main containers start. Used for:</p>
<ul>
  <li>Wait for database to be ready before app starts</li>
  <li>Download config or secrets from external sources__HTMLTAG_81___
  <li>Setup file permissions, database migrations</li>
</ul>
<pre><code class="language-yaml">spec:
  initContainers:
  - name: wait-for-db
    image: busybox:1.36
    command: ['sh', '-c', 'until nc -z postgres-service 5432; do sleep 2; done']
  - name: run-migrations
    image: myapp:v1
    command: ['python', 'manage.py', 'migrate']
  containers:
  - name: app
    image: myapp:v1
</code></pre>

<h2>6. Ephemeral Containers — Debug Pods</h2>
<p>Ephemeral containers allow attaching a debug container to a running Pod without needing to restart Pod</strong>. Very useful when Pod uses distroless image without shell.</p>
<pre><code class="language-bash"># Attach ephemeral container vào pod đang chạy
kubectl debug -it nginx-pod --image=busybox:1.36 --target=nginx

# Debug từ node
kubectl debug node/worker-1 -it --image=ubuntu

# Copy pod để debug (tạo pod mới với debug image)
kubectl debug nginx-pod -it --copy-to=nginx-debug --image=nginx:debug
</code></pre>

<h2>7. Pod Lifecycle</h2>
<p>Pod goes through the following phases:</p>
<ul>
  <li><strong>Pending</strong>: Pod created, waiting for scheduler to choose Node, or pulling image</li>
  <li><strong>Running</strong>: Pod is bound to Node, at least 1 container is running</li>
  <li><strong>Succeeded</strong>: All containers ended successfully (exit 0)</li>
  <li><strong>Failed</strong>: At least 1 container ended with an error (exit non-0)</li>
  <li><strong>Unknown</strong>: Unable to get Pod status (usually due to Node issue)</li>
</ul>
<p>Pod conditions (from <code>kubectl describe pod</code>):</p>
<ul>
  <li><strong>PodScheduled</strong>: scheduler selected Node</li>
  <li><strong>PodReadyToStartContainers</strong>: sandbox created and network configured</li>
  <li><strong>Initialized</strong>: all init containers have run successfully</li>
  <li><strong>ContainersReady</strong>: all containers are ready</li>
  <li><strong>Ready</strong>: Pod is ready to receive traffic</li>
</ul>

<h2>8. Resource Requests and Limits</h2>
<pre><code class="language-yaml">resources:
  requests:
    cpu: "250m"      # 0.25 CPU core — dùng cho scheduling
    memory: "256Mi"  # 256 MiB — dùng cho scheduling
  limits:
    cpu: "1000m"     # 1 CPU core — container bị throttle nếu vượt
    memory: "512Mi"  # container bị OOMKilled nếu vượt
</code></pre>
<p><strong>Requests</strong> is the amount of resources the scheduler guarantees. <strong>Limits</strong> is the maximum ceiling. CPU exceeding limit is throttled (not killed), Memory exceeding limit is OOMKilled.</p>

<h2>9. QoS Classes</h2>
<ul>
  <li><strong>Guaranteed</strong>: requests == limits for all containers. Highest priority, no evict when Node has memory pressure.</li>
  <li><strong>Burstable</strong>: requests &lt; limits. limits. Can be evict when Node lacks memory.</li>
  <li><strong>BestEffort</strong>: no requests/limits. evict first when Node lacks resources.</li>
</ul><h2>10. Probes — Health Check</h2>
<pre><code class="language-yaml">livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 30    # chờ 30s sau khi container start
  periodSeconds: 10           # kiểm tra mỗi 10s
  failureThreshold: 3         # fail 3 lần liên tiếp → restart container

readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
  # fail → xóa Pod khỏi Service endpoints (không nhận traffic)

startupProbe:
  httpGet:
    path: /healthz
    port: 8080
  failureThreshold: 30
  periodSeconds: 10           # cho phép app 300s để khởi động
</code></pre>
<ul>
  <li><strong>livenessProbe</strong>: Pod will be restarted if it fails</li>
  <li><strong>readinessProbe</strong>: Pod is removed from Service endpoints if it fails (does not receive traffic)</li>
  <li><strong>startupProbe</strong>: used for slow-starting apps, turn off liveness/readiness probe while waiting</li>
</ul>

<h2>11. Static Pods</h2>
<p>Static Pods are created by kubelet directly from the YAML file in <code>/etc/kubernetes/manifests/</code>, without going through the API server. Kubernetes control plane components (kube-apiserver, etcd, scheduler, controller-manager) run as Static Pods on the master node.</p>

<h2>Summary</h2>
<ul>
  <li>Pod = group of containers sharing network and storage</li>
  <li>Sidecar containers (K8s 1.33 GA): <code>initContainer</code> with <code>restartPolicy: Always</code></li>
  <li>Init containers: run-to-completion before main container</li>
  <li>Ephemeral containers: debug pod without restart__HTMLTAG_203___
  <li>Always set resource requests/limits for production workloads__HTMLTAG_205___
  <li>Use readinessProbe to control traffic, livenessProbe to auto-restart</li>
</ul>