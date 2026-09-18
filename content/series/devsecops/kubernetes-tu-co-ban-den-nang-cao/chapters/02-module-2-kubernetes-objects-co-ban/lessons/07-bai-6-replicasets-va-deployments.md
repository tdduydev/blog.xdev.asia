---
id: 019c9618-0005-7000-8000-c1147ba22e10
title: 'BÀI 6: REPLICASETS VÀ DEPLOYMENTS'
slug: bai-6-replicasets-va-deployments
description: >-
  Quản lý nhiều Pod replicas với ReplicaSet và Deployment. Rolling updates, rollbacks,
  deployment strategies (Recreate, RollingUpdate, Blue/Green, Canary). Hiểu revision
  history và cách rollback an toàn.
duration_minutes: 90
is_free: false
video_url: null
sort_order: 6
section_title: 'Module 2: Kubernetes Objects Cơ bản'
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: 'KUBERNETES: TỪ CƠ BẢN ĐẾN NÂNG CAO'
  slug: kubernetes-tu-co-ban-den-nang-cao
---
<h2>🎯 Mục tiêu bài học</h2><p>Hiểu ReplicaSet đảm bảo số lượng Pod replicas, tại sao Deployment tốt hơn ReplicaSet thuần, cách thực hiện rolling update và rollback an toàn, và các deployment strategies phổ biến.</p>

<img src="/storage/uploads/2026/03/k8s-deployment-rolling-update-2026.webp" alt="Kubernetes Deployment & Rolling Update Strategies" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h2>1. ReplicaSet</h2>
<p>ReplicaSet đảm bảo số lượng Pod replicas được chỉ định luôn chạy. Nếu Pod bị xóa hoặc crash, ReplicaSet tạo Pod mới để bù vào.</p>
<pre><code class="language-yaml">apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: nginx-rs
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.27
</code></pre>
<p>ReplicaSet dùng <strong>label selectors</strong> để biết Pods nào nó quản lý. Tuy nhiên, bạn hiếm khi tạo ReplicaSet trực tiếp — thay vào đó dùng Deployment.</p>

<h2>2. Deployment — Tại sao tốt hơn ReplicaSet?</h2>
<p>Deployment là abstraction cấp cao hơn ReplicaSet, cho phép:</p>
<ul>
  <li><strong>Declarative updates</strong>: chỉ khai báo desired state, Deployment lo phần còn lại</li>
  <li><strong>Rolling updates</strong>: zero-downtime deployment</li>
  <li><strong>Revision history</strong>: lưu lịch sử updates, cho phép rollback</li>
  <li><strong>Pause/Resume</strong>: rollout có thể tạm dừng</li>
</ul>
<pre><code class="language-yaml">apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deploy
spec:
  replicas: 5
  selector:
    matchLabels:
      app: nginx
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 2          # tối đa thêm 2 pods trong quá trình update
      maxUnavailable: 1    # tối đa 1 pod unavailable tại một thời điểm
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.27
        resources:
          requests:
            cpu: "100m"
            memory: "128Mi"
          limits:
            cpu: "500m"
            memory: "256Mi"
</code></pre>

<h2>3. Rolling Update</h2>
<p>Rolling Update thay thế Pods cũ dần dần bằng Pods mới, đảm bảo không có downtime.</p>
<pre><code class="language-bash"># Update image
kubectl set image deployment/nginx-deploy nginx=nginx:1.28

# Hoặc edit trực tiếp
kubectl edit deployment nginx-deploy

# Theo dõi rollout
kubectl rollout status deployment/nginx-deploy

# Xem chi tiết
kubectl describe deployment nginx-deploy
</code></pre>
<p>Với <code>maxSurge: 2</code> và <code>maxUnavailable: 1</code> trên 5 replicas:</p>
<ul>
  <li>Tối đa 7 pods tồn tại cùng lúc (5 + 2 surge)</li>
  <li>Tối thiểu 4 pods available (5 - 1 unavailable)</li>
  <li>Kubernetes tạo Pods mới song song với terminate Pods cũ</li>
</ul>

<h2>4. Recreate Strategy</h2>
<p>Xóa toàn bộ Pods cũ trước khi tạo Pods mới. <strong>Có downtime</strong> nhưng đơn giản và không có versioning conflict.</p>
<pre><code class="language-yaml">strategy:
  type: Recreate
</code></pre>
<p>Dùng khi: database migration cần single instance, không chấp nhận 2 versions chạy song song.</p>

<h2>5. Revision History và Rollback</h2>
<pre><code class="language-bash"># Xem revision history
kubectl rollout history deployment/nginx-deploy

# Xem chi tiết revision cụ thể
kubectl rollout history deployment/nginx-deploy --revision=3

# Rollback về revision trước
kubectl rollout undo deployment/nginx-deploy

# Rollback về revision cụ thể
kubectl rollout undo deployment/nginx-deploy --to-revision=2
</code></pre>
<p>Số revisions được lưu kiểm soát bởi <code>spec.revisionHistoryLimit</code> (mặc định 10).</p>

<h2>6. Pause và Resume Rollout</h2>
<pre><code class="language-bash"># Pause rollout (để kiểm tra pods mới trước khi tiếp tục)
kubectl rollout pause deployment/nginx-deploy

# Update image
kubectl set image deployment/nginx-deploy nginx=nginx:1.28

# Pods mới bắt đầu tạo, kiểm tra chúng
kubectl get pods

# Nếu ok, resume
kubectl rollout resume deployment/nginx-deploy

# Nếu không ok, rollback
kubectl rollout undo deployment/nginx-deploy
</code></pre>

<h2>7. Blue/Green Deployment</h2>
<p>Triển khai phiên bản mới song song với phiên bản cũ, sau đó chuyển toàn bộ traffic sang phiên bản mới.</p>
<pre><code class="language-yaml"># Blue (phiên bản hiện tại)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-blue
spec:
  replicas: 5
  selector:
    matchLabels:
      app: nginx
      version: blue
  template:
    metadata:
      labels:
        app: nginx
        version: blue
    spec:
      containers:
      - name: nginx
        image: nginx:1.27
---
# Service chỉ vào blue
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
    version: blue   # chuyển sang "green" để switch traffic
  ports:
  - port: 80
</code></pre>
<pre><code class="language-bash"># Sau khi deploy green và kiểm tra xong:
kubectl patch service nginx-service -p '{"spec":{"selector":{"version":"green"}}}'
</code></pre>

<h2>8. Canary Deployment</h2>
<p>Gửi một phần nhỏ traffic đến phiên bản mới để kiểm tra.</p>
<pre><code class="language-yaml"># Stable: 9 replicas
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-stable
spec:
  replicas: 9
  selector:
    matchLabels:
      app: nginx
      track: stable
  template:
    metadata:
      labels:
        app: nginx
        track: stable
    spec:
      containers:
      - name: nginx
        image: nginx:1.27
---
# Canary: 1 replica (~10% traffic)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-canary
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
      track: canary
  template:
    metadata:
      labels:
        app: nginx
        track: canary
    spec:
      containers:
      - name: nginx
        image: nginx:1.28
---
# Service match cả hai
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx   # match cả stable và canary
</code></pre>

<h2>9. Scaling</h2>
<pre><code class="language-bash"># Scale thủ công
kubectl scale deployment nginx-deploy --replicas=10

# HPA tự động scale (xem bài Autoscaling)
kubectl autoscale deployment nginx-deploy --min=3 --max=10 --cpu-percent=70
</code></pre>

<h2>10. Deployment Anti-patterns cần tránh</h2>
<ul>
  <li>❌ Không đặt resource requests/limits → Pod bị evict khi node pressure</li>
  <li>❌ Không có readinessProbe → traffic đến Pod chưa ready</li>
  <li>❌ <code>maxUnavailable: 0</code> và <code>maxSurge: 0</code> cùng lúc → invalid</li>
  <li>❌ Dùng <code>latest</code> image tag → không reproducible</li>
  <li>❌ <code>revisionHistoryLimit: 0</code> → không thể rollback</li>
</ul>

<h2>Tóm tắt</h2>
<ul>
  <li>Deployment quản lý ReplicaSet, không nên tạo ReplicaSet trực tiếp</li>
  <li>Rolling Update: zero-downtime, điều chỉnh maxSurge và maxUnavailable</li>
  <li>Rollback bằng <code>kubectl rollout undo</code></li>
  <li>Blue/Green: instant switch, cần double resources</li>
  <li>Canary: gradual rollout, kiểm soát % traffic bằng số replicas</li>
</ul>
