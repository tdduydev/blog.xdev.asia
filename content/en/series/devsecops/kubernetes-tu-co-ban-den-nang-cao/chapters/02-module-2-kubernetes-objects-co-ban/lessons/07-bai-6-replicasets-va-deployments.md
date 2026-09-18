---
id: 019c9618-0005-7000-8000-c1147ba22e10
title: 'LESSON 6: REPLICASETS AND DEPLOYMENTS'
slug: bai-6-replicasets-va-deployments
description: Manage multiple Pod replicas with ReplicaSet and Deployment. Rolling updates, rollbacks, deployment strategies (Recreate, RollingUpdate, Blue/Green, Canary). Understand revision history and how to rollback safely.
duration_minutes: 90
is_free: false
video_url: null
sort_order: 6
section_title: 'Module 2: Basic Kubernetes Objects'
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: 'KUBERNETES: FROM BASIC TO ADVANCED'
  slug: kubernetes-tu-co-ban-den-nang-cao
locale: en
---
<h2>🎯 Lesson Objective</h2><p>Understand how ReplicaSet ensures the number of Pod replicas, why Deployment is better than pure ReplicaSet, how to perform rolling updates and rollback safely, and common deployment strategies.</p>

<img src="/storage/uploads/2026/03/k8s-deployment-rolling-update-2026.webp" alt="Kubernetes Deployment & Rolling Update Strategies" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h2>1. ReplicaSet</h2>
<p>ReplicaSet ensures the specified number of Pod replicas are always running. If a Pod is deleted or crashes, ReplicaSet creates a new Pod to compensate.</p>
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
<p>ReplicaSet uses <strong>label selectors</strong> to know which Pods it manages. However, you rarely create a ReplicaSet directly — instead use Deployment.</p>

<h2>2. Deployment — Why is it better than ReplicaSet?</h2>
<p>Deployment is a higher-level abstraction than ReplicaSet, allowing:</p>
<ul>
  <li><strong>Declarative updates</strong>: only declare the desired state, Deployment takes care of the rest</li>
  <li><strong>Rolling updates</strong>: zero-downtime deployment</li>
  <li><strong>Revision history</strong>: save updates history, allow rollback</li>
  <li><strong>Pause/Resume</strong>: rollout can be paused</li>
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
<p>Rolling Update gradually replaces old Pods with new Pods, ensuring no downtime.</p>
<pre><code class="language-bash"># Update image
kubectl set image deployment/nginx-deploy nginx=nginx:1.28

# Hoặc edit trực tiếp
kubectl edit deployment nginx-deploy

# Theo dõi rollout
kubectl rollout status deployment/nginx-deploy

# Xem chi tiết
kubectl describe deployment nginx-deploy
</code></pre>
<p>With <code>maxSurge: 2</code> and <code>maxUnavailable: 1</code> on 5 replicas:</p>
<ul>
  <li>Maximum 7 pods exist at the same time (5 + 2 surges)</li>
  <li>Minimum 4 pods available (5 - 1 unavailable)</li>
  <li>Kubernetes creates new Pods in parallel with terminating old Pods__HTMLTAG_51___
</ul>

<h2>4. Recreate Strategy</h2>
<p>Delete all old Pods before creating new Pods. <strong>There is downtime</strong> but it's simple and has no versioning conflict.</p>
<pre><code class="language-yaml">strategy:
  type: Recreate
</code></pre>
<p>Used when: database migration needs a single instance, does not accept 2 versions running in parallel.</p>

<h2>5. Revision History and Rollback</h2>
<pre><code class="language-bash"># Xem revision history
kubectl rollout history deployment/nginx-deploy

# Xem chi tiết revision cụ thể
kubectl rollout history deployment/nginx-deploy --revision=3

# Rollback về revision trước
kubectl rollout undo deployment/nginx-deploy

# Rollback về revision cụ thể
kubectl rollout undo deployment/nginx-deploy --to-revision=2
</code></pre>
<p>The number of revisions saved is controlled by <code>spec.revisionHistoryLimit</code> (default 10).</p>

<h2>6. Pause and Resume Rollout</h2>
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
<p>Deploy the new version in parallel with the old version, then transfer all traffic to the new version.</p>
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
<p>Send a small portion of traffic to the new version for testing.</p>
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
</code></pre><h2>10. Deployment Anti-patterns should be avoided</h2>
<ul>
  <li>❌ Do not set resource requests/limits → Pod is evict when node pressure</li>
  <li>❌ No readinessProbe → traffic to Pod is not ready</li>
  <li>❌ <code>maxUnavailable: 0</code> and <code>maxSurge: 0</code> at the same time → invalid</li>
  <li>❌ Use <code>latest</code> image tag → do not reproducible</li>
  <li>❌ <code>revisionHistoryLimit: 0</code> → cannot rollback</li>
</ul>

<h2>Summary</h2>
<ul>
  <li>Deployment manages ReplicaSet, should not create ReplicaSet directly</li>
  <li>Rolling Update: zero-downtime, adjust maxSurge and maxUnavailable</li>
  <li>Rollback with <code>kubectl rollout undo</code></li>
  <li>Blue/Green: instant switch, requires double resources__HTMLTAG_113___
  <li>Canary: gradual rollout, control traffic % by number of replicas__HTMLTAG_115___
</ul>