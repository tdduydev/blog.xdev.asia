---
id: ckad-d2-l03
title: 'Lesson 3: Rolling Updates, Rollbacks & Deployment Strategies'
slug: 03-rolling-updates-rollbacks
description: >-
  Deployment strategies: RollingUpdate vs Recreate. Kubectl rollout commands,
  maxUnavailable/maxSurge. Revision history and rollback techniques for CKAD.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 3
section_title: "Domain 2: Application Deployment (20%)"
course:
  id: lt-ckad-series-001
  title: 'CKAD Exam Prep — Certified Kubernetes Application Developer'
  slug: luyen-thi-ckad
---

<img src="/storage/uploads/2026/04/k8s-cert-ckad-bai3-rolling-update.webp" alt="Rolling Update and Rollback — maxUnavailable, maxSurge, ReplicaSet history" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="strategies">1. Deployment Strategies</h2>

<table>
<thead><tr><th>Strategy</th><th>How It Works</th><th>Downtime?</th><th>When to Use</th></tr></thead>
<tbody>
<tr><td><strong>RollingUpdate</strong></td><td>Replaces pods gradually, maintains availability</td><td>No</td><td>Default, production</td></tr>
<tr><td><strong>Recreate</strong></td><td>Kills all old pods, then creates new ones</td><td>Yes</td><td>Dev/test, breaking changes</td></tr>
</tbody>
</table>

<pre><code class="language-text">spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1   # OR "25%"  — Max pods unavailable during update
      maxSurge: 1         # OR "25%"  — Max extra pods above desired count

      ┌─────────────────────────────────────────────────┐
      │ Desired: 4 pods                                  │
      │                                                  │
      │ maxUnavailable: 1 → min 3 pods must be running  │
      │ maxSurge: 1       → max 5 pods total at once    │
      │                                                  │
      │ Step 1: Create 1 new pod (5 total = desired+surge)│
      │ Step 2: Terminate 1 old pod (4 total)           │
      │ Step 3: Repeat until all replaced               │
      └─────────────────────────────────────────────────┘</code></pre>

<blockquote><p><strong>Exam tip:</strong> <code>maxUnavailable</code> and <code>maxSurge</code> CANNOT both be 0 at the same time. For zero-downtime updates: set <code>maxUnavailable: 0</code> and <code>maxSurge: 1</code> (or higher).</p></blockquote>

<h2 id="rollout">2. kubectl rollout Commands</h2>

<pre><code class="language-text"># Check rollout status
kubectl rollout status deployment/myapp

# View revision history
kubectl rollout history deployment/myapp
kubectl rollout history deployment/myapp --revision=2

# Rollback to the previous version
kubectl rollout undo deployment/myapp

# Rollback to a specific revision
kubectl rollout undo deployment/myapp --to-revision=2

# Pause a rollout
kubectl rollout pause deployment/myapp

# Resume a rollout
kubectl rollout resume deployment/myapp</code></pre>

<table>
<thead><tr><th>Command</th><th>Purpose</th></tr></thead>
<tbody>
<tr><td><code>rollout status</code></td><td>Wait/show current rollout progress</td></tr>
<tr><td><code>rollout history</code></td><td>List revision history</td></tr>
<tr><td><code>rollout undo</code></td><td>Rollback to previous (or specific) revision</td></tr>
<tr><td><code>rollout pause/resume</code></td><td>Pause for canary testing, then resume</td></tr>
<tr><td><code>rollout restart</code></td><td>Force restart all pods (rolling)</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> To save <code>CHANGE-CAUSE</code> in revision history, add an annotation: <code>kubectl annotate deployment/myapp kubernetes.io/change-cause="Updated image to v2"</code> BEFORE updating. Or use the <code>--record</code> flag (deprecated but still works in the exam).</p></blockquote>

<h2 id="trigger">3. Trigger & Monitor Update</h2>

<pre><code class="language-text"># Update image (trigger rolling update)
kubectl set image deployment/myapp container-name=nginx:1.25

# View ReplicaSet history (each update creates a new RS)
kubectl get rs
# NAME              DESIRED   CURRENT   READY
# myapp-7d9b8c      4         4         4     ← current
# myapp-6f5a2b      0         0         0     ← old (kept for rollback)

# Scale deployment
kubectl scale deployment/myapp --replicas=6

# Edit deployment directly
kubectl edit deployment/myapp</code></pre>

<h2 id="revisionhistory">4. Revision History Limit</h2>

<pre><code class="language-text">spec:
  revisionHistoryLimit: 10  # Default: 10 old RS kept for rollback
                             # Set to 0 to disable rollback capability</code></pre>

<h2 id="cheatsheet">5. Cheat Sheet</h2>

<table>
<thead><tr><th>Exam Scenario</th><th>Command</th></tr></thead>
<tbody>
<tr><td>Update image</td><td><code>kubectl set image deploy/app c=image:v2</code></td></tr>
<tr><td>Check rollout</td><td><code>kubectl rollout status deploy/app</code></td></tr>
<tr><td>Quick rollback</td><td><code>kubectl rollout undo deploy/app</code></td></tr>
<tr><td>Rollback to rev 3</td><td><code>kubectl rollout undo deploy/app --to-revision=3</code></td></tr>
<tr><td>Zero-downtime config</td><td><code>maxUnavailable: 0, maxSurge: 1</code></td></tr>
</tbody>
</table>

<h2 id="practice">6. Practice Questions</h2>

<p><strong>Q1:</strong> A Deployment with 10 replicas is configured with maxUnavailable: 2 and maxSurge: 3. During a rolling update, what is the maximum number of pods that can exist at any given time?</p>
<ul>
<li>A) 10</li>
<li>B) 12</li>
<li>C) 13 ✓</li>
<li>D) 15</li>
</ul>
<p><em>Explanation: maxSurge=3 means up to 3 extra pods above the desired count (10) can exist simultaneously. So maximum = 10 + 3 = 13 pods. Meanwhile, maxUnavailable=2 means at least 8 pods must be available.</em></p>

<p><strong>Q2:</strong> You updated a Deployment and then realized the new version has a bug. Which command quickly reverts to the previous working version?</p>
<ul>
<li>A) <code>kubectl delete deployment myapp && kubectl apply -f old.yaml</code></li>
<li>B) <code>kubectl rollout undo deployment/myapp</code> ✓</li>
<li>C) <code>kubectl rollout history deployment/myapp</code></li>
<li>D) <code>kubectl set image deployment/myapp container=old-image</code></li>
</ul>
<p><em>Explanation: rollout undo is the fastest way to revert to the previous revision. It creates a new rolling update back to the previous ReplicaSet. Option D also works but requires knowing the exact old image name.</em></p>

<p><strong>Q3:</strong> A Deployment uses Recreate strategy. What is the expected behavior during an update?</p>
<ul>
<li>A) Pods are replaced one at a time with no downtime</li>
<li>B) All existing pods are terminated before new pods are created, causing downtime ✓</li>
<li>C) Half the pods are updated at once while the other half serve traffic</li>
<li>D) New pods are created first, then old pods are terminated</li>
</ul>
<p><em>Explanation: Recreate strategy terminates ALL existing pods at once (scale to 0), then creates the new pods. This causes downtime but ensures no two versions run simultaneously — suitable when old and new versions cannot coexist.</em></p>
