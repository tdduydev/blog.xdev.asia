---
id: ckad-d1-l02
title: 'Lesson 2: Jobs, CronJobs & Resource Management'
slug: 02-jobs-cronjobs-resources
description: >-
  Jobs (batch tasks), CronJobs (scheduled tasks). Resource requests and limits,
  LimitRange, ResourceQuota. QoS classes for the CKAD exam.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 2
section_title: "Domain 1: Application Design and Build (20%)"
course:
  id: lt-ckad-series-001
  title: 'CKAD Exam Prep — Certified Kubernetes Application Developer'
  slug: luyen-thi-ckad
---

<img src="/storage/uploads/2026/04/k8s-cert-ckad-bai2-jobs.webp" alt="Jobs and CronJobs — completions, parallelism, concurrencyPolicy" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="jobs">1. Jobs</h2>

<p>A <strong>Job</strong> creates one or more Pods and ensures they complete successfully. When a Job completes, Pods are not deleted (for log inspection).</p>

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
<thead><tr><th>Field</th><th>Meaning</th><th>Default</th></tr></thead>
<tbody>
<tr><td><code>completions</code></td><td>Number of required completions</td><td>1</td></tr>
<tr><td><code>parallelism</code></td><td>Number of concurrent Pods</td><td>1</td></tr>
<tr><td><code>backoffLimit</code></td><td>Number of retries on failure</td><td>6</td></tr>
<tr><td><code>activeDeadlineSeconds</code></td><td>Overall Job timeout</td><td>Unlimited</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> Job Pods must have <code>restartPolicy: Never</code> or <code>OnFailure</code>. You cannot use <code>Always</code> (which is the default for regular Pods). CKAD frequently tests creating Jobs and checking completion status.</p></blockquote>

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
<thead><tr><th>concurrencyPolicy</th><th>Behavior</th></tr></thead>
<tbody>
<tr><td><strong>Allow</strong></td><td>Allows concurrent Jobs (default)</td></tr>
<tr><td><strong>Forbid</strong></td><td>Skips new Job if previous hasn't finished</td></tr>
<tr><td><strong>Replace</strong></td><td>Cancels previous Job, starts new one</td></tr>
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

<pre><code class="language-text">QoS Classes (based on requests/limits):

Guaranteed:  requests == limits (both CPU and memory)
             → Last to be evicted under pressure

Burstable:   requests < limits (or only one set)
             → Middle priority for eviction

BestEffort:  NO requests, NO limits
             → First to be evicted under pressure</code></pre>

<blockquote><p><strong>Exam tip:</strong> For a Pod to have <strong>Guaranteed</strong> QoS class: you must set both <code>cpu</code> and <code>memory</code> in both <code>requests</code> and <code>limits</code>, and they must be equal. Every container in the Pod must satisfy this condition.</p></blockquote>

<h2 id="limitrange">4. LimitRange & ResourceQuota</h2>

<table>
<thead><tr><th>Object</th><th>Scope</th><th>Purpose</th></tr></thead>
<tbody>
<tr><td><strong>LimitRange</strong></td><td>Namespace</td><td>Set default requests/limits for Pods/Containers in a namespace</td></tr>
<tr><td><strong>ResourceQuota</strong></td><td>Namespace</td><td>Limit total resources a namespace can use</td></tr>
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
<thead><tr><th>Exam Question</th><th>Answer</th></tr></thead>
<tbody>
<tr><td>What restartPolicy does a Job need?</td><td><code>Never</code> or <code>OnFailure</code></td></tr>
<tr><td>CronJob every 5 minutes?</td><td><code>*/5 * * * *</code></td></tr>
<tr><td>Container OOM Killed — why?</td><td>Exceeded <code>limits.memory</code></td></tr>
<tr><td>What's needed for Guaranteed QoS?</td><td>requests == limits (both CPU and Memory)</td></tr>
<tr><td>Limit namespace resources?</td><td><strong>ResourceQuota</strong></td></tr>
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
<p><em>Explanation: completions=5 means 5 Pods must exit successfully. parallelism=2 means at most 2 run at once. As each Pod completes, a new one starts until the completion count is reached. Total Pods created could be more if some fail.</em></p>

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
