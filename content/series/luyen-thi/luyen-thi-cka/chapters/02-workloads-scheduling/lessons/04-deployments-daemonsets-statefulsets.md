---
id: cka-d2-l04
title: 'Bài 4: Deployments, DaemonSets & StatefulSets'
slug: 04-deployments-daemonsets-statefulsets
description: >-
  Hands-on với Deployments (rolling update, rollback), DaemonSets, StatefulSets.
  Resource requests, limits, và horizontal scaling cho CKA exam.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 4
section_title: "Domain 2: Workloads & Scheduling (15%)"
course:
  id: lt-cka-series-001
  title: 'Luyện thi CKA — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai4-workloads.webp" alt="Deployment Rolling Update Mechanism — ReplicaSets và rollback" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="deployments">1. Deployments — Rolling Updates & Rollbacks</h2>

<pre><code class="language-text"># Tạo deployment
kubectl create deployment nginx --image=nginx:1.20 --replicas=3

# Scale
kubectl scale deployment nginx --replicas=5

# Update image (triggers rolling update)
kubectl set image deployment/nginx nginx=nginx:1.21

# Monitor rollout
kubectl rollout status deployment/nginx
kubectl rollout history deployment/nginx

# Rollback to previous version
kubectl rollout undo deployment/nginx
kubectl rollout undo deployment/nginx --to-revision=2</code></pre>

<table>
<thead><tr><th>Rollout Strategy</th><th>Key Fields</th><th>Behavior</th></tr></thead>
<tbody>
<tr><td><strong>RollingUpdate</strong> (default)</td><td>maxUnavailable, maxSurge</td><td>Gradual, zero-downtime trên nhiều replicas</td></tr>
<tr><td><strong>Recreate</strong></td><td>Không có</td><td>Kill all old → deploy new (có downtime)</td></tr>
</tbody>
</table>

<pre><code class="language-text">RollingUpdate settings:
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1  # Max pods down trong update
      maxSurge: 1        # Max extra pods có thể chạy</code></pre>

<blockquote><p><strong>Exam tip:</strong> Để rollout history có chú thích, dùng <code>--record</code> hoặc set annotation trong <code>kubernetes.io/change-cause</code>. Khi cần rollback đến revision cụ thể: <code>kubectl rollout undo deployment/name --to-revision=3</code></p></blockquote>

<h2 id="horizontal-scaling">2. HPA (Horizontal Pod Autoscaler)</h2>

<pre><code class="language-text"># Tạo HPA
kubectl autoscale deployment nginx --cpu-percent=70 --min=2 --max=10

# Hoặc YAML
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: nginx-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70</code></pre>

<h2 id="daemonset">3. DaemonSet Operations</h2>

<pre><code class="language-text">DaemonSet update strategies:
  spec:
    updateStrategy:
      type: RollingUpdate      # Gradual update per node
      # OR
      type: OnDelete           # Manual: update only when Pod deleted

# View DaemonSet
kubectl get daemonset -n kube-system
kubectl get daemonset fluentd -o yaml

# DaemonSet trên specific nodes (tolerations)
spec:
  template:
    spec:
      tolerations:
      - key: node-role.kubernetes.io/control-plane
        effect: NoSchedule    # Deploy trên control plane nodes</code></pre>

<h2 id="statefulset">4. StatefulSet Operations</h2>

<pre><code class="language-text">apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: web
spec:
  serviceName: "web"  # Headless Service required
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    spec:
      containers:
      - name: nginx
        image: nginx:1.21
        volumeMounts:
        - name: www
          mountPath: /usr/share/nginx/html
  volumeClaimTemplates:  # Each pod gets own PVC
  - metadata:
      name: www
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 1Gi

---
# Headless Service (clusterIP: None)
apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  clusterIP: None   # Headless!
  selector:
    app: web</code></pre>

<blockquote><p><strong>Exam tip:</strong> StatefulSet yêu cầu <strong>Headless Service</strong> (clusterIP: None). Điều này tạo DNS entries cho từng Pod: <code>web-0.web.default.svc.cluster.local</code>. Nếu thiếu headless service, StatefulSet hoạt động nhưng pod DNS sẽ không hoạt động.</p></blockquote>

<h2 id="cheatsheet">5. Cheat Sheet</h2>

<table>
<thead><tr><th>Task</th><th>Command</th></tr></thead>
<tbody>
<tr><td>Update image</td><td><code>kubectl set image deploy/NAME CONTAINER=IMAGE</code></td></tr>
<tr><td>Rollback</td><td><code>kubectl rollout undo deploy/NAME</code></td></tr>
<tr><td>Rollout status</td><td><code>kubectl rollout status deploy/NAME</code></td></tr>
<tr><td>Pause rollout</td><td><code>kubectl rollout pause deploy/NAME</code></td></tr>
<tr><td>Resume rollout</td><td><code>kubectl rollout resume deploy/NAME</code></td></tr>
</tbody>
</table>

<h2 id="practice">6. Practice Questions</h2>

<p><strong>Q1:</strong> A Deployment was updated 3 times. The current version (revision 3) is causing issues. How do you revert to revision 1?</p>
<ul>
<li>A) kubectl rollout undo deployment/app</li>
<li>B) kubectl rollout undo deployment/app --to-revision=1 ✓</li>
<li>C) kubectl set image deployment/app app=old-image</li>
<li>D) kubectl delete deployment/app and recreate it</li>
</ul>
<p><em>Explanation: --to-revision flag specifies which historical revision to roll back to. Without it, rollout undo goes to the previous revision (n-1). kubectl rollout history shows all revisions and their CHANGE-CAUSE annotations.</em></p>

<p><strong>Q2:</strong> A StatefulSet named "kafka" is deployed but Pods cannot resolve each other's DNS names. What is likely missing?</p>
<ul>
<li>A) The StatefulSet needs a Deployment alongside it</li>
<li>B) A Headless Service (clusterIP: None) with matching selector is required ✓</li>
<li>C) The namespace needs a NetworkPolicy allowing DNS</li>
<li>D) Each Pod needs a separate Service</li>
</ul>
<p><em>Explanation: StatefulSets require a Headless Service (clusterIP: None) to create DNS records for individual Pods (pod-name.service.namespace.svc.cluster.local). Without it, stable network identities don't work.</em></p>

<p><strong>Q3:</strong> You need to update a DaemonSet but want to control which nodes update first. Which updateStrategy should you use?</p>
<ul>
<li>A) RollingUpdate with maxUnavailable: 1</li>
<li>B) Recreate strategy</li>
<li>C) OnDelete — manually delete Pods node by node ✓</li>
<li>D) DaemonSets cannot be updated without recreating</li>
</ul>
<p><em>Explanation: OnDelete strategy only updates a DaemonSet Pod when you manually delete it. This gives full control over update order and timing. RollingUpdate would automatically update nodes following Kubernetes' own ordering.</em></p>
