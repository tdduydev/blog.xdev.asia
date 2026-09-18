---
id: 019c9618-0004-7000-8000-c1147ba22e10
title: 'BÀI 5: PODS'
slug: bai-5-pods
description: >-
  Tìm hiểu sâu về Pods - đơn vị triển khai cơ bản trong Kubernetes. Multi-container pods,
  Sidecar containers GA (K8s 1.33), Init containers, Ephemeral containers cho debugging,
  Pod lifecycle và resource management.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 5
section_title: 'Module 2: Kubernetes Objects Cơ bản'
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: 'KUBERNETES: TỪ CƠ BẢN ĐẾN NÂNG CAO'
  slug: kubernetes-tu-co-ban-den-nang-cao
---
<h2>🎯 Mục tiêu bài học</h2><p>Sau bài học này bạn sẽ hiểu Pod là đơn vị cơ bản nhất trong Kubernetes, cách Pod chia sẻ network namespace, cách dùng Sidecar containers (GA K8s 1.33), Init containers, Ephemeral containers để debug, và quản lý lifecycle cũng như resources của Pod.</p>

<h2>1. Pod là gì?</h2>

<img src="/storage/uploads/2026/03/k8s-pod-lifecycle-2026.webp" alt="Kubernetes Pod Lifecycle Diagram" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<p>Pod là đơn vị scheduling nhỏ nhất trong Kubernetes. Một Pod bao gồm <strong>một hoặc nhiều containers</strong> chạy trên cùng một Node, chia sẻ chung:</p>
<ul>
  <li><strong>Network namespace</strong>: cùng IP address, cùng port space — containers giao tiếp với nhau qua <code>localhost</code></li>
  <li><strong>Storage volumes</strong>: volumes được mount vào Pod có thể được nhiều containers cùng truy cập</li>
  <li><strong>Linux namespaces</strong> (tùy cấu hình): PID namespace, IPC namespace</li>
</ul>
<p>Tại sao không deploy container trực tiếp? Kubernetes quản lý Pods, không phải containers. Pod là abstraction layer giúp nhóm các tiến trình liên quan chặt chẽ lại với nhau.</p>

<h2>2. Ví dụ Pod đơn giản</h2>
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
<p>Có 3 pattern phổ biến cho multi-container Pods:</p>
<h3>3.1 Sidecar Pattern</h3>
<p>Container phụ hỗ trợ container chính (log forwarder, proxy, OTel collector).</p>
<h3>3.2 Ambassador Pattern</h3>
<p>Container proxy thay mặt container chính giao tiếp với bên ngoài.</p>
<h3>3.3 Adapter Pattern</h3>
<p>Container chuẩn hóa output từ container chính sang format chuẩn.</p>

<h2>4. Sidecar Containers GA — K8s 1.33</h2>
<p>Trước K8s 1.33, sidecar containers được implement như init containers thông thường, gây ra vấn đề lifecycle: khi main container kết thúc, sidecar vẫn chạy và Job không bao giờ hoàn thành.</p>
<p><strong>Giải pháp K8s 1.33</strong>: Sidecar container chính thức là <code>initContainer</code> với <code>restartPolicy: Always</code>. Kubernetes sẽ:</p>
<ul>
  <li>Khởi động sidecar trước main container</li>
  <li>Restart sidecar nếu nó crash (không phụ thuộc main container)</li>
  <li>Terminate sidecar sau khi main container kết thúc</li>
  <li>Sidecar không block Job completion</li>
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
<p>Use cases cho Sidecar containers: Grafana Alloy log agent, OpenTelemetry Collector, Envoy proxy (trong service mesh), Vault agent injector.</p>

<h2>5. Init Containers</h2>
<p>Init containers chạy <strong>run-to-completion</strong> trước khi main containers bắt đầu. Dùng để:</p>
<ul>
  <li>Chờ database sẵn sàng trước khi app start</li>
  <li>Tải config hoặc secrets từ external sources</li>
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
<p>Ephemeral containers cho phép attach một container debug vào Pod đang chạy mà <strong>không cần restart Pod</strong>. Rất hữu ích khi Pod dùng distroless image không có shell.</p>
<pre><code class="language-bash"># Attach ephemeral container vào pod đang chạy
kubectl debug -it nginx-pod --image=busybox:1.36 --target=nginx

# Debug từ node
kubectl debug node/worker-1 -it --image=ubuntu

# Copy pod để debug (tạo pod mới với debug image)
kubectl debug nginx-pod -it --copy-to=nginx-debug --image=nginx:debug
</code></pre>

<h2>7. Pod Lifecycle</h2>
<p>Pod đi qua các phase sau:</p>
<ul>
  <li><strong>Pending</strong>: Pod được tạo, đang chờ scheduler chọn Node, hoặc đang pull image</li>
  <li><strong>Running</strong>: Pod được bind vào Node, ít nhất 1 container đang chạy</li>
  <li><strong>Succeeded</strong>: Tất cả containers kết thúc thành công (exit 0)</li>
  <li><strong>Failed</strong>: Ít nhất 1 container kết thúc với lỗi (exit non-0)</li>
  <li><strong>Unknown</strong>: Không thể lấy trạng thái Pod (thường do Node issue)</li>
</ul>
<p>Pod conditions (từ <code>kubectl describe pod</code>):</p>
<ul>
  <li><strong>PodScheduled</strong>: scheduler đã chọn Node</li>
  <li><strong>PodReadyToStartContainers</strong>: sandbox đã tạo và network đã cấu hình</li>
  <li><strong>Initialized</strong>: tất cả init containers đã chạy thành công</li>
  <li><strong>ContainersReady</strong>: tất cả containers đã ready</li>
  <li><strong>Ready</strong>: Pod sẵn sàng nhận traffic</li>
</ul>

<h2>8. Resource Requests và Limits</h2>
<pre><code class="language-yaml">resources:
  requests:
    cpu: "250m"      # 0.25 CPU core — dùng cho scheduling
    memory: "256Mi"  # 256 MiB — dùng cho scheduling
  limits:
    cpu: "1000m"     # 1 CPU core — container bị throttle nếu vượt
    memory: "512Mi"  # container bị OOMKilled nếu vượt
</code></pre>
<p><strong>Requests</strong> là lượng tài nguyên scheduler đảm bảo. <strong>Limits</strong> là trần tối đa. CPU vượt limit bị throttle (không kill), Memory vượt limit bị OOMKilled.</p>

<h2>9. QoS Classes</h2>
<ul>
  <li><strong>Guaranteed</strong>: requests == limits cho mọi container. Ưu tiên cao nhất, không bị evict khi Node có memory pressure.</li>
  <li><strong>Burstable</strong>: requests &lt; limits. Có thể bị evict khi Node thiếu memory.</li>
  <li><strong>BestEffort</strong>: không có requests/limits. Bị evict đầu tiên khi Node thiếu tài nguyên.</li>
</ul>

<h2>10. Probes — Kiểm tra sức khỏe</h2>
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
  <li><strong>livenessProbe</strong>: Pod bị restart nếu fail</li>
  <li><strong>readinessProbe</strong>: Pod bị xóa khỏi Service endpoints nếu fail (không nhận traffic)</li>
  <li><strong>startupProbe</strong>: dùng cho slow-starting apps, tắt liveness/readiness probe trong khi chờ</li>
</ul>

<h2>11. Static Pods</h2>
<p>Static Pods được kubelet tạo trực tiếp từ file YAML trong <code>/etc/kubernetes/manifests/</code>, không qua API server. Kubernetes control plane components (kube-apiserver, etcd, scheduler, controller-manager) chạy như Static Pods trên master node.</p>

<h2>Tóm tắt</h2>
<ul>
  <li>Pod = nhóm containers chia sẻ network và storage</li>
  <li>Sidecar containers (K8s 1.33 GA): <code>initContainer</code> với <code>restartPolicy: Always</code></li>
  <li>Init containers: run-to-completion trước main container</li>
  <li>Ephemeral containers: debug pod không cần restart</li>
  <li>Luôn đặt resource requests/limits cho production workloads</li>
  <li>Dùng readinessProbe để kiểm soát traffic, livenessProbe để auto-restart</li>
</ul>
