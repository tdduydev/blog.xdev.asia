---
id: 019c9618-0303-7000-8000-c1147ba22e13
title: 'LESSON 20: AUTOSCALING'
slug: bai-20-autoscaling
description: HPA (Horizontal Pod Autoscaler) with CPU/memory and custom metrics, VPA (Vertical Pod Autoscaler), In-Place Pod Resource Updates (K8s 1.35 — change CPU/memory without restart), KEDA event-driven autoscaling, Cluster Autoscaler and Karpenter.
duration_minutes: 100
is_free: false
video_url: null
sort_order: 20
section_title: 'Module 5: Workload Management'
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: 'KUBERNETES: FROM BASIC TO ADVANCED'
  slug: kubernetes-tu-co-ban-den-nang-cao
locale: en
---
<h2>Autoscaling in Kubernetes — From HPA to Karpenter</h2>

<p>Autoscaling is one of the main reasons to run workloads on Kubernetes. Instead of having to manually adjust resources as traffic increases or decreases, Kubernetes provides many automatic scaling mechanisms at many different levels. This article will explore the entire autoscaling ecosystem — from traditional HPA to KEDA event-driven scaling, the latest In-Place Pod Resource Updates, and Karpenter for cluster-level scaling.</p>

<img src="/storage/uploads/2026/03/k8s-autoscaling-2026.webp" alt="Kubernetes Autoscaling - HPA, VPA, Karpenter, KEDA" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h2>1. HorizontalPodAutoscaler (HPA)</h2>

<p><strong>HPA</strong> is the most popular horizontal scaling mechanism — it automatically increases/decreases the number of Pod replicas based on metrics.</p>

<h3>1.1 HPA with CPU and Memory</h3>

<pre><code class="language-yaml">apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-server-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api-server
  minReplicas: 2
  maxReplicas: 20
  metrics:
  # Scale theo CPU utilization
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70   # Scale up khi avg CPU > 70%
  # Scale theo Memory utilization
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80   # Scale up khi avg Memory > 80%
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300   # Chờ 5 phút trước khi scale down
      policies:
      - type: Percent
        value: 25
        periodSeconds: 60    # Scale down tối đa 25% mỗi phút
    scaleUp:
      stabilizationWindowSeconds: 0    # Scale up ngay lập tức
      policies:
      - type: Pods
        value: 4
        periodSeconds: 15    # Thêm tối đa 4 pods mỗi 15 giây
      - type: Percent
        value: 100
        periodSeconds: 15    # Hoặc tăng 100%
      selectPolicy: Max      # Chọn policy cho phép scale up nhiều nhất
</code></pre>

<p>Important note: HPA needs <code>resources.requests</code> to be set on the container to calculate utilization. If requests are not set, HPA does not know "70% of how many".</p>

<h3>1.2 Custom Metrics API</h3>

<p>HPA can scale to any metric via the Custom Metrics API (usually provided by Prometheus Adapter):</p>

<pre><code class="language-yaml">apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: queue-processor-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: queue-processor
  minReplicas: 1
  maxReplicas: 50
  metrics:
  # Custom metric từ Prometheus via prometheus-adapter
  - type: Pods
    pods:
      metric:
        name: http_requests_per_second
      target:
        type: AverageValue
        averageValue: "100"    # 100 requests/second per pod
  # External metric (e.g., từ cloud provider)
  - type: External
    external:
      metric:
        name: sqs_queue_depth
        selector:
          matchLabels:
            queue: order-processing
      target:
        type: AverageValue
        averageValue: "30"     # 30 messages per pod
</code></pre>

<h3>1.3 Scale Down Cooldown</h3>

<p><code>stabilizationWindowSeconds</code> for scale down is extremely important in production. If set too low, short traffic spikes will cause the cluster to scale up and then scale down continuously (flapping). Best practice:</p>
<ul>
  <li>Scale up: <code>stabilizationWindowSeconds: 0</code> to <code>30</code> — quick response to increased traffic__HTMLTAG_33___
  <li>Scale down: <code>stabilizationWindowSeconds: 300</code> to <code>600</code> — wait 5-10 minutes before reducing pods__HTMLTAG_39___
</ul>

<h2>2. VerticalPodAutoscaler (VPA)</h2>

<p><strong>VPA</strong> automatically adjusts <code>requests</code> and <code>limits</code> of containers based on actual usage. Don't add Pods, but make each Pod "bigger" or "smaller".</p>

<pre><code class="language-yaml">apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: api-server-vpa
  namespace: production
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api-server
  updatePolicy:
    updateMode: "Auto"    # VPA tự động update pods
  resourcePolicy:
    containerPolicies:
    - containerName: api
      minAllowed:
        cpu: "100m"
        memory: "128Mi"
      maxAllowed:
        cpu: "4"
        memory: "8Gi"
      controlledResources:
      - cpu
      - memory
      controlledValues: RequestsAndLimits
</code></pre>

<h3>2.1 VPA Modes</h3>

<ul>
  <li><strong>Off</strong>: VPA only calculates recommendations, does not change anything. Used to view suggestions from VPA Recommender.</li>
  <li><strong>Initial</strong>: VPA sets resources when Pods are newly created, does not update running Pods.</li>
  <li><strong>Recreate</strong>: VPA updates by evict and recreates Pod — causes short downtime.</li>
  <li><strong>Auto</strong>: Now works like Recreate; In the future, In-Place updates will be used.</li>
</ul>

<h3>2.2 View VPA Recommendations</h3>

<pre><code class="language-bash">kubectl describe vpa api-server-vpa -n production

# Output sẽ có section:
# Recommendation:
#   Container Recommendations:
#     Container Name: api
#     Lower Bound:
#       Cpu:     100m
#       Memory:  256Mi
#     Target:
#       Cpu:     450m       # Đây là giá trị VPA recommend
#       Memory:  512Mi
#     Uncapped Target:
#       Cpu:     450m
#       Memory:  512Mi
#     Upper Bound:
#       Cpu:     2000m
#       Memory:  2Gi
</code></pre>

<h3>2.3 VPA Limitations__HTMLTAG_74___<ul>
  <li><strong>Cannot co-exist with HPA with the same metric</strong>: If HPA scales by CPU, VPA cannot manage CPU of the same deployment. Solution: HPA scale according to custom metrics, VPA manage CPU/memory; Or use In-Place updates instead of VPA.</li>
  <li><strong>Need to restart Pod</strong>: With Recreate/Auto mode, each VPA update is a Pod restart — not suitable for stateful apps.</li>
  <li><strong>Need to install separately</strong>: VPA is not available in Kubernetes, need to install via Helm or manifests.</li>
</ul>

<h2>3. In-Place Pod Resource Updates (K8s 1.35 GA)</h2>

<p>This is one of the most important recent Kubernetes features: the ability to change the <code>resources.requests</code> and <code>resources.limits</code> of a running Pod <strong> without restart</strong>.</p>

<h3>3.1 Why Are In-Place Updates Important?</h3>

<p>Previously, every resource change required a Pod restart — this was not acceptable for:</p>
<ul>
  <li><strong>Database pods</strong>: PostgreSQL, MySQL need to warm-up cache after restart</li>
  <li><strong>Long-running ML jobs</strong>: Training jobs take hours, restart = lost all progress</li>
  <li><strong>Stateful applications</strong>: Apps with in-memory state</li>
  <li><strong>JVM applications</strong>: Java apps need JIT warm-up time</li>
</ul>

<h3>3.2 resizePolicy</h3>

<pre><code class="language-yaml">apiVersion: v1
kind: Pod
metadata:
  name: database-pod
spec:
  containers:
  - name: postgres
    image: postgres:16
    resources:
      requests:
        cpu: "1"
        memory: "2Gi"
      limits:
        cpu: "2"
        memory: "4Gi"
    resizePolicy:
    - resourceName: cpu
      restartPolicy: NotRequired    # Thay đổi CPU không cần restart
    - resourceName: memory
      restartPolicy: RestartContainer  # Thay đổi memory CẦN restart container
</code></pre>

<p>Two values of <code>restartPolicy</code>:</p>
<ul>
  <li><strong>NotRequired</strong>: Resource can be changed in-place, no need to restart the container</li>
  <li><strong>RestartContainer</strong>: Changing the resource will trigger the container to restart (still not restarting the entire Pod)</li>
</ul>

<h3>3.3 Performing In-Place Resize</h3>

<pre><code class="language-bash"># Tăng CPU request của pod đang chạy
kubectl patch pod database-pod --subresource resize --type merge -p '
{
  "spec": {
    "containers": [{
      "name": "postgres",
      "resources": {
        "requests": {"cpu": "2", "memory": "2Gi"},
        "limits": {"cpu": "4", "memory": "4Gi"}
      }
    }]
  }
}'

# Kiểm tra trạng thái resize
kubectl get pod database-pod -o jsonpath='{.status.resize}'
# Output: "Proposed" → "InProgress" → "Infeasible" hoặc thành công (field biến mất)

# Xem allocated resources thực tế
kubectl get pod database-pod -o jsonpath='{.status.containerStatuses[0].allocatedResources}'
</code></pre>

<h3>3.4 In-Place Resize with Deployment__HTMLTAG_140___

<pre><code class="language-yaml">apiVersion: apps/v1
kind: Deployment
metadata:
  name: ml-inference-server
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ml-inference
  template:
    metadata:
      labels:
        app: ml-inference
    spec:
      containers:
      - name: inference
        image: my-ml-server:v2.1
        resources:
          requests:
            cpu: "2"
            memory: "4Gi"
          limits:
            cpu: "4"
            memory: "8Gi"
        resizePolicy:
        - resourceName: cpu
          restartPolicy: NotRequired
        - resourceName: memory
          restartPolicy: NotRequired
</code></pre>

<pre><code class="language-bash"># Tăng resources cho tất cả pods trong deployment (rolling)
kubectl patch deployment ml-inference-server --type=json -p='[
  {"op": "replace", "path": "/spec/template/spec/containers/0/resources/requests/cpu", "value": "4"},
  {"op": "replace", "path": "/spec/template/spec/containers/0/resources/limits/cpu", "value": "8"}
]'
</code></pre>

<h2>4. KEDA — Kubernetes Event-Driven Autoscaling</h2>

<p><strong>KEDA</strong> is a CNCF Graduated project that provides event-driven autoscaling for Kubernetes. Biggest difference compared to HPA: KEDA can <strong>scale to zero</strong> — without events, there are no Pods.</p>

<h3>4.1 KEDA Installation</h3>

<pre><code class="language-bash">helm repo add kedacore https://kedacore.github.io/charts
helm repo update
helm install keda kedacore/keda \
  --namespace keda \
  --create-namespace \
  --version 2.14.0
</code></pre>

<h3>4.2 ScaledObject — Scale Deployment</h3>

<p><strong>ScaledObject</strong> is KEDA's main CRD, replacing HPA for Deployments and StatefulSets:</p>

<pre><code class="language-yaml">apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: kafka-consumer-scaler
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: order-processor
  minReplicaCount: 0     # Scale to zero khi không có messages
  maxReplicaCount: 50
  cooldownPeriod: 300    # Giây chờ trước khi scale down về 0
  pollingInterval: 15    # Check metrics mỗi 15 giây
  triggers:
  # Kafka topic lag trigger
  - type: kafka
    metadata:
      bootstrapServers: kafka.production.svc.cluster.local:9092
      consumerGroup: order-processors
      topic: orders
      lagThreshold: "100"         # 100 messages per replica
      offsetResetPolicy: latest
    authenticationRef:
      name: keda-kafka-credentials
</code></pre>

<h3>4.3 ScaledJob — Scale Jobs</h3>

<p><strong>ScaledJob</strong> creates a new Job for each event batch, ideal for task queues:</p>

<pre><code class="language-yaml">apiVersion: keda.sh/v1alpha1
kind: ScaledJob
metadata:
  name: image-processing-job
  namespace: media
spec:
  jobTargetRef:
    template:
      spec:
        containers:
        - name: processor
          image: image-processor:v3
          command: ["./process-image"]
          resources:
            requests:
              cpu: "1"
              memory: "2Gi"
            limits:
              cpu: "2"
              memory: "4Gi"
        restartPolicy: Never
    backoffLimit: 2
  pollingInterval: 10
  maxReplicaCount: 20
  scalingStrategy:
    strategy: "accurate"    # Tạo 1 job per N items
  triggers:
  - type: rabbitmq
    metadata:
      host: amqp://rabbitmq.media.svc.cluster.local:5672
      queueName: image-processing-queue
      queueLength: "5"      # 1 job per 5 messages
</code></pre>

<h3>4.4 Popular KEDA Scalers__HTMLTAG_164___

<pre><code class="language-yaml"># Prometheus metrics scaler
- type: prometheus
  metadata:
    serverAddress: http://prometheus.monitoring.svc.cluster.local:9090
    metricName: http_requests_total
    query: sum(rate(http_requests_total{deployment="api"}[2m]))
    threshold: "100"

# HTTP request rate scaler (cần KEDA HTTP Add-on)
- type: http
  metadata:
    hosts:
    - api.production.example.com
    targetPendingRequests: "100"

# Cron-based scaling (scale up trước giờ cao điểm)
- type: cron
  metadata:
    timezone: "Asia/Ho_Chi_Minh"
    start: "0 8 * * 1-5"     # 8 giờ sáng thứ 2-6
    end: "0 22 * * 1-5"       # 10 giờ tối thứ 2-6
    desiredReplicas: "10"

# AWS SQS Queue
- type: aws-sqs-queue
  metadata:
    queueURL: https://sqs.ap-southeast-1.amazonaws.com/123456789/my-queue
    queueLength: "5"
    awsRegion: ap-southeast-1
</code></pre><h3>4.5 KEDA Scale to Zero and Scale Up from Zero</h3>

<p>Scale to zero is KEDA's killer feature — significant cost savings for workloads that don't run 24/7:</p>

<pre><code class="language-yaml">apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: batch-worker-scaler
spec:
  scaleTargetRef:
    kind: Deployment
    name: batch-worker
  minReplicaCount: 0        # Scale về 0 hoàn toàn
  maxReplicaCount: 100
  cooldownPeriod: 120       # 2 phút không có messages → scale to 0
  triggers:
  - type: redis
    metadata:
      address: redis.cache.svc.cluster.local:6379
      listName: job-queue
      listLength: "1"       # Scale up khi có >= 1 item
</code></pre>

<p>When KEDA detects events (e.g. Kafka lag > 0), it scales from 0 to 1 in a few seconds. Then HPA (managed by KEDA) continues to scale higher based on load.</p>

<h2>5. Cluster Autoscaler</h2>

<p><strong>Cluster Autoscaler (CA)</strong> automatically add/remove nodes when Pods cannot be scheduled (nodes full) or nodes are empty (waste of resources).</p>

<pre><code class="language-yaml">apiVersion: apps/v1
kind: Deployment
metadata:
  name: cluster-autoscaler
  namespace: kube-system
spec:
  template:
    spec:
      containers:
      - image: registry.k8s.io/autoscaling/cluster-autoscaler:v1.29.0
        name: cluster-autoscaler
        command:
        - ./cluster-autoscaler
        - --v=4
        - --stderrthreshold=info
        - --cloud-provider=aws
        - --skip-nodes-with-local-storage=false
        - --expander=least-waste
        - --node-group-auto-discovery=asg:tag=k8s.io/cluster-autoscaler/enabled,k8s.io/cluster-autoscaler/my-cluster
        - --balance-similar-node-groups
        - --skip-nodes-with-system-pods=false
        - --scale-down-delay-after-add=10m
        - --scale-down-unneeded-time=10m
</code></pre>

<h2>6. Karpenter — The Next Generation of Cluster Scaling</h2>

<p><strong>Karpenter</strong> is an open-source node provisioner from AWS, currently also supporting Azure. It's much smarter than Cluster Autoscaler — instead of just scaling existing node groups, Karpenter itself decides the best instance type to launch.</p>

<h3>6.1 NodePool — Replaces Node Group</h3>

<pre><code class="language-yaml">apiVersion: karpenter.sh/v1
kind: NodePool
metadata:
  name: general-purpose
spec:
  template:
    spec:
      nodeClassRef:
        group: karpenter.k8s.aws
        kind: EC2NodeClass
        name: default
      requirements:
      - key: karpenter.sh/capacity-type
        operator: In
        values: ["spot", "on-demand"]   # Ưu tiên Spot
      - key: kubernetes.io/arch
        operator: In
        values: ["amd64", "arm64"]      # Hỗ trợ cả ARM
      - key: karpenter.k8s.aws/instance-category
        operator: In
        values: ["c", "m", "r"]         # Compute, Memory, RAM-optimized
      - key: karpenter.k8s.aws/instance-generation
        operator: Gt
        values: ["5"]                   # Chỉ dùng instance gen 5+
  limits:
    cpu: "1000"
    memory: 4000Gi
  disruption:
    consolidationPolicy: WhenEmptyOrUnderutilized
    consolidateAfter: 1m    # Consolidate nodes ngay khi có thể
    expireAfter: 720h       # Terminate và replace node sau 30 ngày
</code></pre>

<h3>6.2 EC2NodeClass</h3>

<pre><code class="language-yaml">apiVersion: karpenter.k8s.aws/v1
kind: EC2NodeClass
metadata:
  name: default
spec:
  amiSelectorTerms:
  - alias: al2023@latest    # Amazon Linux 2023, luôn dùng AMI mới nhất
  role: KarpenterNodeRole-my-cluster
  subnetSelectorTerms:
  - tags:
      karpenter.sh/discovery: my-cluster
  securityGroupSelectorTerms:
  - tags:
      karpenter.sh/discovery: my-cluster
  instanceStorePolicy: RAID0    # NVMe instance storage
  blockDeviceMappings:
  - deviceName: /dev/xvda
    ebs:
      volumeSize: 100Gi
      volumeType: gp3
      iops: 10000
      throughput: 500
      encrypted: true
</code></pre>

<h3>6.3 Karpenter vs Cluster Autoscaler__HTMLTAG_188___

<ul>
  <li><strong>Launch time</strong>: Karpenter ~60 seconds vs CA ~3-4 minutes (CA must scale ASG and then wait)</li>
  <li><strong>Instance selection</strong>: Karpenter selects the best instance type for pending Pods; CA only scale existing groups</li>
  <li><strong>Spot interruption handling</strong>: Built-in Karpenter, graceful drain before instance is terminated</li>
  <li><strong>Node consolidation</strong>: Karpenter automatically consolidates empty/lightly loaded nodes by evicting Pods and terminating nodes__HTMLTAG_205___
  <li><strong>Cost optimization</strong>: Karpenter proactively chooses Spot when possible, fallback to On-Demand when Spot is not available</li>
</ul>

<h3>6.4 Spot Interruption Handling</h3>

<pre><code class="language-yaml"># Karpenter tự động handle Spot interruption via EC2 interruption notices
# Cần install aws-node-termination-handler HOẶC để Karpenter tự handle

# Pod disruption budget để Karpenter biết không drain quá nhiều pods cùng lúc
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: api-server-pdb
  namespace: production
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: api-server
</code></pre>

<h2>7. Combination Strategy: HPA + KEDA + Karpenter</h2>

<p>In production, you often use scaling layers together:</p>

<ul>
  <li><strong>KEDA</strong>: Scale Pods from 0 to N based on events (Kafka lag, queue depth)</li>
  <li><strong>HPA</strong>: Fine-tune scaling based on CPU/memory when KEDA has started Pods</li>
  <li><strong>In-Place Updates</strong>: Adjust resources of running Pods without restart</li>
  <li><strong>Karpenter</strong>: When Pods cannot be scheduled due to lack of nodes, Karpenter automatically provision the most suitable nodes__HTMLTAG_233___
</ul>

<pre><code class="language-bash"># Xem trạng thái HPA
kubectl get hpa -n production

# Xem KEDA ScaledObjects
kubectl get scaledobjects -n production

# Xem Karpenter nodes
kubectl get nodes -l karpenter.sh/nodepool=general-purpose

# Xem Karpenter events
kubectl get events -n karpenter --sort-by='.lastTimestamp'

# Xem pending pods (waiting for node)
kubectl get pods --all-namespaces --field-selector=status.phase=Pending
</code></pre>

<p>Effective autoscaling is the right combination of many mechanisms. Understanding each tool — HPA for resource-based scaling, KEDA for event-driven scaling, In-Place Updates for zero-downtime resource adjustment, and Karpenter for intelligent node provisioning — helps you build systems that are both responsive and cost-effective.</p>