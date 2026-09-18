---
id: ckad-d1-l02
title: 'Bài 2: Jobs, CronJobs & Resource Management'
slug: 02-jobs-cronjobs-resources
description: >-
  Jobs (batch tasks), CronJobs (scheduled tasks). Resource requests và limits,
  LimitRange, ResourceQuota. QoS classes cho CKAD exam.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 2
section_title: "Domain 1: Application Design and Build (20%)"
course:
  id: lt-ckad-series-001
  title: 'Luyện thi CKAD — Certified Kubernetes Application Developer'
  slug: luyen-thi-ckad
---

<img src="/storage/uploads/2026/04/k8s-cert-ckad-bai2-jobs.webp" alt="Jobs và CronJobs — completions, parallelism, concurrencyPolicy" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="jobs">1. Jobs</h2>

<p>Một <strong>Job</strong> tạo một hoặc nhiều Pods và đảm bảo chúng hoàn thành thành công. Khi Job hoàn thành, Pods không bị xóa (cho log inspection).</p>

<pre><code class="language-text">apiVersion: batch/v1
kind: Job
metadata:
  name: data-processor
spec:
  completions: 3       # Run 3 successful completions
  parallelism: 2       # Run 2 pods at a time
  backoffLimit: 4      # Retry up to 4 times on failure
  template:
    spec:
      restartPolicy: Never  # OnFailure or Never (required for Job)
      containers:
      - name: processor
        image: busybox
        command: ['sh', '-c', 'echo Processing; sleep 5']</code></pre>

<table>
<thead><tr><th>Field</th><th>Ý nghĩa</th><th>Default</th></tr></thead>
<tbody>
<tr><td><code>completions</code></td><td>Số lần phải hoàn thành</td><td>1</td></tr>
<tr><td><code>parallelism</code></td><td>Số Pods chạy concurrent</td><td>1</td></tr>
<tr><td><code>backoffLimit</code></td><td>Số lần retry khi fail</td><td>6</td></tr>
<tr><td><code>activeDeadlineSeconds</code></td><td>Timeout tổng thể của Job</td><td>Unlimited</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> Job Pods phải có <code>restartPolicy: Never</code> hoặc <code>OnFailure</code>. Không thể dùng <code>Always</code> (default cho regular Pods). CKAD hay test việc tạo Job và kiểm tra completion status.</p></blockquote>

<h2 id="cronjobs">2. CronJobs</h2>

<pre><code class="language-text">apiVersion: batch/v1
kind: CronJob
metadata:
  name: nightly-backup
spec:
  schedule: "0 2 * * *"  # Cron syntax: minute hour day month weekday
  concurrencyPolicy: Forbid  # Allow | Forbid | Replace
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 1
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
          - name: backup
            image: backup-tool:1.0
            command: ['./backup.sh']</code></pre>

<table>
<thead><tr><th>concurrencyPolicy</th><th>Hành vi</th></tr></thead>
<tbody>
<tr><td><strong>Allow</strong></td><td>Cho phép Jobs chạy concurrent (default)</td></tr>
<tr><td><strong>Forbid</strong></td><td>Skip new Job nếu previous chưa xong</td></tr>
<tr><td><strong>Replace</strong></td><td>Cancel previous Job, start new one</td></tr>
</tbody>
</table>

<h2 id="resources">3. Resource Requests & Limits</h2>

<pre><code class="language-text">spec:
  containers:
  - name: app
    image: myapp
    resources:
      requests:
        cpu: "250m"      # 0.25 CPU core (minimum guaranteed)
        memory: "128Mi"  # 128 MiB minimum
      limits:
        cpu: "500m"      # Max 0.5 CPU core
        memory: "256Mi"  # Max 256 MiB (OOM if exceeded)</code></pre>

<pre><code class="language-text">QoS Classes (dựa trên requests/limits):

Guaranteed:  requests == limits (both CPU and memory)
             → Last to be evicted under pressure

Burstable:   requests < limits (or only one set)
             → Middle priority for eviction

BestEffort:  NO requests, NO limits
             → First to be evicted under pressure</code></pre>

<blockquote><p><strong>Exam tip:</strong> Để Pod có QoS class <strong>Guaranteed</strong>: phải set cả <code>cpu</code> và <code>memory</code> trong cả <code>requests</code> và <code>limits</code>, và chúng phải bằng nhau. Mỗi container trong Pod đều phải thỏa mãn điều kiện này.</p></blockquote>

<h2 id="limitrange">4. LimitRange & ResourceQuota</h2>

<table>
<thead><tr><th>Object</th><th>Scope</th><th>Mục đích</th></tr></thead>
<tbody>
<tr><td><strong>LimitRange</strong></td><td>Namespace</td><td>Set default requests/limits cho Pods/Containers trong namespace</td></tr>
<tr><td><strong>ResourceQuota</strong></td><td>Namespace</td><td>Giới hạn tổng resources namespace được dùng</td></tr>
</tbody>
</table>

<pre><code class="language-text">ResourceQuota example:
apiVersion: v1
kind: ResourceQuota
metadata:
  name: dev-quota
  namespace: development
spec:
  hard:
    requests.cpu: "4"
    requests.memory: "8Gi"
    limits.cpu: "8"
    limits.memory: "16Gi"
    pods: "20"</code></pre>

<h2 id="cheatsheet">5. Cheat Sheet</h2>

<table>
<thead><tr><th>Câu hỏi exam</th><th>Đáp án</th></tr></thead>
<tbody>
<tr><td>Job cần restartPolicy gì?</td><td><code>Never</code> hoặc <code>OnFailure</code></td></tr>
<tr><td>CronJob mỗi 5 phút?</td><td><code>*/5 * * * *</code></td></tr>
<tr><td>Container bị OOM Kill do gì?</td><td>Vượt <code>limits.memory</code></td></tr>
<tr><td>QoS Guaranteed cần gì?</td><td>requests == limits (cả CPU và Memory)</td></tr>
<tr><td>Giới hạn resources của namespace?</td><td><strong>ResourceQuota</strong></td></tr>
</tbody>
</table>

<h2 id="practice">6. Practice Questions</h2>

<p><strong>Q1:</strong> A Job is configured with completions: 5 and parallelism: 2. How does it execute?</p>
<ul>
<li>A) Creates 5 Pods simultaneously until all complete</li>
<li>B) Runs 2 Pods at a time, creating new ones as old ones complete, until 5 total completions ✓</li>
<li>C) Runs 5 Pods sequentially one by one</li>
<li>D) Creates 2 Pods, each completing 2.5 times</li>
</ul>
<p><em>Explanation: completions=5 means 5 PODs must exit successfully. parallelism=2 means at most 2 run at once. As each Pod completes, a new one starts until completion count is reached. Total Pods created could be more if some fail.</em></p>

<p><strong>Q2:</strong> A Pod has no resource requests or limits set. What QoS class is it assigned and how does this affect eviction?</p>
<ul>
<li>A) Guaranteed — it will be last to be evicted</li>
<li>B) Burstable — it has medium eviction priority</li>
<li>C) BestEffort — it will be first to be evicted under resource pressure ✓</li>
<li>D) NoQoS — it has no eviction priority</li>
</ul>
<p><em>Explanation: Pods with no resource requests or limits get BestEffort QoS class. When nodes face resource pressure, Kubernetes evicts BestEffort Pods first to free resources for higher-priority workloads.</em></p>

<p><strong>Q3:</strong> A CronJob is scheduled every hour. A previous job is still running when the next scheduled time arrives. With concurrencyPolicy: Forbid, what happens?</p>
<ul>
<li>A) The running job is cancelled; the new one starts</li>
<li>B) Both jobs run concurrently</li>
<li>C) The new job is skipped; the running job continues ✓</li>
<li>D) The CronJob is suspended until the running job completes</li>
</ul>
<p><em>Explanation: Forbid policy prevents a new job from starting if the previous job is still running. The scheduled run is skipped. Use Allow to permit concurrent runs or Replace to cancel the old and start the new one.</em></p>
