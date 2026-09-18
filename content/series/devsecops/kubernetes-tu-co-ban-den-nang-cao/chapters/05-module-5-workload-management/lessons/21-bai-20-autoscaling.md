---
id: 019c9618-0303-7000-8000-c1147ba22e13
title: 'BÀI 20: AUTOSCALING'
slug: bai-20-autoscaling
description: >-
  HPA (Horizontal Pod Autoscaler) với CPU/memory và custom metrics, VPA (Vertical Pod Autoscaler), In-Place Pod Resource Updates (K8s 1.35 — thay đổi CPU/memory không cần restart), KEDA event-driven autoscaling, Cluster Autoscaler và Karpenter.
duration_minutes: 100
is_free: false
video_url: null
sort_order: 20
section_title: 'Module 5: Workload Management'
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: 'KUBERNETES: TỪ CƠ BẢN ĐẾN NÂNG CAO'
  slug: kubernetes-tu-co-ban-den-nang-cao
---

<h2>Autoscaling trong Kubernetes — Từ HPA đến Karpenter</h2>

<p>Autoscaling là một trong những lý do chính để chạy workloads trên Kubernetes. Thay vì phải manually điều chỉnh resources khi traffic tăng hoặc giảm, Kubernetes cung cấp nhiều cơ chế scaling tự động ở nhiều cấp độ khác nhau. Bài này sẽ khám phá toàn bộ autoscaling ecosystem — từ HPA truyền thống đến KEDA event-driven scaling, In-Place Pod Resource Updates mới nhất, và Karpenter cho cluster-level scaling.</p>

<img src="/storage/uploads/2026/03/k8s-autoscaling-2026.webp" alt="Kubernetes Autoscaling - HPA, VPA, Karpenter, KEDA" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h2>1. HorizontalPodAutoscaler (HPA)</h2>

<p><strong>HPA</strong> là cơ chế scaling ngang phổ biến nhất — nó tự động tăng/giảm số lượng Pod replicas dựa trên metrics.</p>

<h3>1.1 HPA với CPU và Memory</h3>

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

<p>Lưu ý quan trọng: HPA cần <code>resources.requests</code> được set trên container để tính utilization. Nếu không set requests, HPA không biết "70% của bao nhiêu".</p>

<h3>1.2 Custom Metrics API</h3>

<p>HPA có thể scale theo bất kỳ metric nào thông qua Custom Metrics API (thường được cung cấp bởi Prometheus Adapter):</p>

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

<p><code>stabilizationWindowSeconds</code> cho scale down là cực kỳ quan trọng trong production. Nếu set quá thấp, traffic spike ngắn sẽ khiến cluster scale up rồi scale down liên tục (flapping). Best practice:</p>
<ul>
  <li>Scale up: <code>stabilizationWindowSeconds: 0</code> đến <code>30</code> — phản ứng nhanh với traffic tăng</li>
  <li>Scale down: <code>stabilizationWindowSeconds: 300</code> đến <code>600</code> — chờ 5-10 phút trước khi giảm pods</li>
</ul>

<h2>2. VerticalPodAutoscaler (VPA)</h2>

<p><strong>VPA</strong> tự động điều chỉnh <code>requests</code> và <code>limits</code> của containers dựa trên actual usage. Không thêm Pod, mà làm mỗi Pod "to hơn" hoặc "nhỏ hơn".</p>

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
  <li><strong>Off</strong>: VPA chỉ tính toán recommendations, không thay đổi gì. Dùng để xem gợi ý từ VPA Recommender.</li>
  <li><strong>Initial</strong>: VPA set resources khi Pod được tạo mới, không update Pods đang chạy.</li>
  <li><strong>Recreate</strong>: VPA cập nhật bằng cách evict và tạo lại Pod — gây downtime ngắn.</li>
  <li><strong>Auto</strong>: Hiện tại hoạt động giống Recreate; trong tương lai sẽ dùng In-Place updates.</li>
</ul>

<h3>2.2 Xem VPA Recommendations</h3>

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

<h3>2.3 VPA Limitations</h3>

<ul>
  <li><strong>Không thể co-exist với HPA cùng metric</strong>: Nếu HPA scale theo CPU, VPA không được manage CPU của cùng deployment đó. Giải pháp: HPA scale theo custom metrics, VPA manage CPU/memory; hoặc dùng In-Place updates thay VPA.</li>
  <li><strong>Cần restart Pod</strong>: Với mode Recreate/Auto, mỗi lần VPA update là một lần Pod restart — không phù hợp với stateful apps.</li>
  <li><strong>Cần install riêng</strong>: VPA không có sẵn trong Kubernetes, cần install qua Helm hoặc manifests.</li>
</ul>

<h2>3. In-Place Pod Resource Updates (K8s 1.35 GA)</h2>

<p>Đây là một trong những tính năng quan trọng nhất của Kubernetes gần đây: khả năng thay đổi <code>resources.requests</code> và <code>resources.limits</code> của một Pod <strong>đang chạy mà không cần restart</strong>.</p>

<h3>3.1 Tại Sao In-Place Updates Quan Trọng?</h3>

<p>Trước đây, mọi thay đổi resources đều cần Pod restart — điều này không chấp nhận được với:</p>
<ul>
  <li><strong>Database pods</strong>: PostgreSQL, MySQL cần warm-up cache sau restart</li>
  <li><strong>Long-running ML jobs</strong>: Training jobs mất hàng giờ, restart = mất toàn bộ progress</li>
  <li><strong>Stateful applications</strong>: Các apps với in-memory state</li>
  <li><strong>JVM applications</strong>: Java apps cần thời gian JIT warm-up</li>
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

<p>Hai giá trị của <code>restartPolicy</code>:</p>
<ul>
  <li><strong>NotRequired</strong>: Resource có thể thay đổi in-place, không cần restart container</li>
  <li><strong>RestartContainer</strong>: Thay đổi resource sẽ trigger container restart (vẫn không restart toàn bộ Pod)</li>
</ul>

<h3>3.3 Thực Hiện In-Place Resize</h3>

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

<h3>3.4 In-Place Resize với Deployment</h3>

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

<p><strong>KEDA</strong> là CNCF Graduated project cung cấp event-driven autoscaling cho Kubernetes. Điểm khác biệt lớn nhất so với HPA: KEDA có thể <strong>scale to zero</strong> — không có events thì không có Pods.</p>

<h3>4.1 Cài Đặt KEDA</h3>

<pre><code class="language-bash">helm repo add kedacore https://kedacore.github.io/charts
helm repo update
helm install keda kedacore/keda \
  --namespace keda \
  --create-namespace \
  --version 2.14.0
</code></pre>

<h3>4.2 ScaledObject — Scale Deployment</h3>

<p><strong>ScaledObject</strong> là CRD chính của KEDA, thay thế HPA cho Deployments và StatefulSets:</p>

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

<p><strong>ScaledJob</strong> tạo Job mới cho mỗi event batch, lý tưởng cho task queues:</p>

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

<h3>4.4 Các KEDA Scalers Phổ Biến</h3>

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
</code></pre>

<h3>4.5 KEDA Scale to Zero và Scale Up từ Zero</h3>

<p>Scale to zero là killer feature của KEDA — tiết kiệm đáng kể cost với workloads không chạy 24/7:</p>

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

<p>Khi KEDA phát hiện có events (ví dụ Kafka lag > 0), nó scale từ 0 lên 1 trong vài giây. Sau đó HPA (được KEDA quản lý) tiếp tục scale lên cao hơn dựa trên load.</p>

<h2>5. Cluster Autoscaler</h2>

<p><strong>Cluster Autoscaler (CA)</strong> tự động thêm/xóa nodes khi Pods không thể schedule (node đầy) hoặc nodes rỗng (lãng phí resources).</p>

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

<h2>6. Karpenter — Thế Hệ Mới của Cluster Scaling</h2>

<p><strong>Karpenter</strong> là open-source node provisioner từ AWS, hiện cũng support Azure. Nó thông minh hơn Cluster Autoscaler nhiều — thay vì chỉ scale existing node groups, Karpenter tự quyết định loại instance tốt nhất để launch.</p>

<h3>6.1 NodePool — Thay Thế Node Group</h3>

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

<h3>6.3 Karpenter vs Cluster Autoscaler</h3>

<ul>
  <li><strong>Launch time</strong>: Karpenter ~60 giây vs CA ~3-4 phút (CA phải scale ASG rồi chờ)</li>
  <li><strong>Instance selection</strong>: Karpenter chọn instance type tốt nhất cho Pods pending; CA chỉ scale existing groups</li>
  <li><strong>Spot interruption handling</strong>: Karpenter tích hợp sẵn, graceful drain trước khi instance bị terminate</li>
  <li><strong>Node consolidation</strong>: Karpenter tự động consolidate nodes rỗng/ít tải bằng cách evict Pods và terminate nodes</li>
  <li><strong>Cost optimization</strong>: Karpenter chủ động chọn Spot khi có thể, fallback sang On-Demand khi Spot không available</li>
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

<h2>7. Chiến Lược Kết Hợp: HPA + KEDA + Karpenter</h2>

<p>Trong production, bạn thường dùng các layer scaling cùng nhau:</p>

<ul>
  <li><strong>KEDA</strong>: Scale Pods từ 0 đến N dựa trên events (Kafka lag, queue depth)</li>
  <li><strong>HPA</strong>: Fine-tune scaling dựa trên CPU/memory khi KEDA đã khởi động Pods</li>
  <li><strong>In-Place Updates</strong>: Adjust resources của Pods đang chạy mà không restart</li>
  <li><strong>Karpenter</strong>: Khi Pods không thể schedule vì thiếu nodes, Karpenter tự động provision nodes phù hợp nhất</li>
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

<p>Autoscaling hiệu quả là sự kết hợp đúng đắn của nhiều cơ chế. Hiểu rõ từng công cụ — HPA cho resource-based scaling, KEDA cho event-driven scaling, In-Place Updates cho resource adjustment không downtime, và Karpenter cho intelligent node provisioning — giúp bạn xây dựng hệ thống vừa responsive vừa tiết kiệm chi phí.</p>
