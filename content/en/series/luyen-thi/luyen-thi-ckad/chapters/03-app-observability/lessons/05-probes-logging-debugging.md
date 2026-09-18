---
id: ckad-d3-l05
title: 'Lesson 5: Probes, Logging & Debugging'
slug: 05-probes-logging-debugging
description: >-
  Liveness, Readiness and Startup Probes with probe types (httpGet, tcpSocket,
  exec). Kubectl logs, exec, debug and port-forward for CKAD troubleshooting.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 5
section_title: "Domain 3: Application Observability and Maintenance (15%)"
course:
  id: lt-ckad-series-001
  title: 'CKAD Exam Prep — Certified Kubernetes Application Developer'
  slug: luyen-thi-ckad
---

<img src="/storage/uploads/2026/04/k8s-cert-ckad-bai5-probes.webp" alt="Liveness, Readiness and Startup Probes — timeline and probe methods" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="probe-types">1. Three Types of Probes</h2>

<table>
<thead><tr><th>Probe</th><th>Purpose</th><th>On Failure</th></tr></thead>
<tbody>
<tr><td><strong>Liveness</strong></td><td>Is the container still "alive"?</td><td>Container is restarted</td></tr>
<tr><td><strong>Readiness</strong></td><td>Is the container ready to receive traffic?</td><td>Removed from Service endpoints (no restart)</td></tr>
<tr><td><strong>Startup</strong></td><td>Has the app finished starting up?</td><td>Container is restarted (runs before liveness check)</td></tr>
</tbody>
</table>

<pre><code class="language-text">Probe execution timeline:

  Container starts
       │
       ▼
  startupProbe checks (periodically)
       │ success
       ▼
  Both livenessProbe & readinessProbe run in parallel
       │                      │
       ▼ fail                 ▼ fail
  Container restart       Removed from Service
                          (pod still running)</code></pre>

<h2 id="probe-methods">2. Probe Methods (httpGet, tcpSocket, exec)</h2>

<pre><code class="language-text">livenessProbe:
  httpGet:                # HTTP GET — success if status 200-399
    path: /healthz
    port: 8080
    httpHeaders:
    - name: Custom-Header
      value: Awesome
  initialDelaySeconds: 15  # Wait before first probe
  periodSeconds: 20        # How often to probe
  timeoutSeconds: 5        # Timeout per probe
  failureThreshold: 3      # Fail count before action
  successThreshold: 1      # Success count to pass

readinessProbe:
  tcpSocket:              # TCP connection — success if port open
    port: 3306
  initialDelaySeconds: 5
  periodSeconds: 10

startupProbe:
  exec:                   # Run command in container — success if exit 0
    command:
    - cat
    - /tmp/healthy
  failureThreshold: 30    # Allows 30*10s = 5 min to start
  periodSeconds: 10</code></pre>

<table>
<thead><tr><th>Field</th><th>Default</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td><code>initialDelaySeconds</code></td><td>0</td><td>Wait before the first probe</td></tr>
<tr><td><code>periodSeconds</code></td><td>10</td><td>Interval between probes</td></tr>
<tr><td><code>timeoutSeconds</code></td><td>1</td><td>Timeout for each probe</td></tr>
<tr><td><code>failureThreshold</code></td><td>3</td><td>Number of failures before action</td></tr>
<tr><td><code>successThreshold</code></td><td>1</td><td>Number of successes to be "healthy"</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> <strong>Startup probes</strong> are used when an app takes a long time to start (e.g., a legacy app that needs 2 minutes to load). Set <code>failureThreshold * periodSeconds</code> >= maximum startup time. The liveness probe does not run until the startup probe passes.</p></blockquote>

<h2 id="logging">3. Logging & kubectl logs</h2>

<pre><code class="language-text"># View pod logs
kubectl logs podname

# Follow logs (tail -f)
kubectl logs -f podname

# Previous container (if crashed)
kubectl logs podname --previous

# Logs from a specific container in a multi-container pod
kubectl logs podname -c container-name

# Logs with timestamps
kubectl logs podname --timestamps

# Tail N lines
kubectl logs podname --tail=100</code></pre>

<h2 id="debugging">4. Debugging Commands</h2>

<pre><code class="language-text"># Exec into a container
kubectl exec -it podname -- /bin/bash
kubectl exec -it podname -c container-name -- sh

# Port forward to test a service locally
kubectl port-forward pod/podname 8080:80
kubectl port-forward service/myservice 8080:80

# Ephemeral debug container (when container has no shell)
kubectl debug -it podname --image=busybox --target=container-name

# Debug a node
kubectl debug node/worker-1 -it --image=ubuntu

# Copy files
kubectl cp podname:/app/logs/error.log ./error.log
kubectl cp ./config.yaml podname:/app/config.yaml</code></pre>

<blockquote><p><strong>Exam tip:</strong> When a pod has no shell (distroless image), use <code>kubectl debug</code> with an ephemeral container. In the CKAD exam, <code>kubectl exec</code> + <code>kubectl logs</code> are the two most important debugging commands. Always check logs before exec.</p></blockquote>

<h2 id="pod-states">5. Common Pod States & Debug</h2>

<table>
<thead><tr><th>Pod State</th><th>Common Cause</th><th>Debug Command</th></tr></thead>
<tbody>
<tr><td><code>CrashLoopBackOff</code></td><td>App crash, bad command, missing config</td><td><code>kubectl logs --previous</code></td></tr>
<tr><td><code>ImagePullBackOff</code></td><td>Wrong image name, registry auth failure</td><td><code>kubectl describe pod</code></td></tr>
<tr><td><code>Pending</code></td><td>Insufficient resources, unschedulable</td><td><code>kubectl describe pod</code> → Events</td></tr>
<tr><td><code>OOMKilled</code></td><td>Memory limit exceeded</td><td><code>kubectl describe pod</code> → Last State</td></tr>
<tr><td><code>Error</code></td><td>Init container failed, bad entrypoint</td><td><code>kubectl logs -c init-c</code></td></tr>
</tbody>
</table>

<h2 id="cheatsheet">6. Cheat Sheet</h2>

<table>
<thead><tr><th>Task</th><th>Command</th></tr></thead>
<tbody>
<tr><td>Check pod health</td><td><code>kubectl describe pod &lt;name&gt;</code></td></tr>
<tr><td>View crash logs</td><td><code>kubectl logs &lt;pod&gt; --previous</code></td></tr>
<tr><td>Shell into container</td><td><code>kubectl exec -it &lt;pod&gt; -- sh</code></td></tr>
<tr><td>Test service connectivity</td><td><code>kubectl port-forward svc/&lt;name&gt; 8080:80</code></td></tr>
<tr><td>Debug distroless container</td><td><code>kubectl debug -it &lt;pod&gt; --image=busybox</code></td></tr>
</tbody>
</table>

<h2 id="practice">7. Practice Questions</h2>

<p><strong>Q1:</strong> A Pod's readinessProbe fails, but the livenessProbe passes. What happens to the Pod?</p>
<ul>
<li>A) The Pod is restarted</li>
<li>B) The Pod is deleted</li>
<li>C) The Pod remains running but is removed from the Service's endpoint list ✓</li>
<li>D) The Pod is marked as Failed</li>
</ul>
<p><em>Explanation: Readiness probe failure does NOT restart the container. It only removes the Pod from the Service endpoints so no new traffic is routed to it. The Pod keeps running. When the readiness probe passes again, the Pod is re-added to the endpoints.</em></p>

<p><strong>Q2:</strong> An application takes 3 minutes to start. Without a startupProbe, the livenessProbe with failureThreshold: 3 and periodSeconds: 10 would kill the container before it finishes starting. How should you configure a startupProbe to allow up to 5 minutes for startup?</p>
<ul>
<li>A) startupProbe with failureThreshold: 5 and periodSeconds: 60</li>
<li>B) startupProbe with failureThreshold: 30 and periodSeconds: 10 ✓</li>
<li>C) startupProbe with failureThreshold: 300 and periodSeconds: 1</li>
<li>D) startupProbe with initialDelaySeconds: 300</li>
</ul>
<p><em>Explanation: failureThreshold × periodSeconds = maximum startup time. 30 × 10s = 300s = 5 minutes. During this window, the liveness probe is disabled. Once the startup probe succeeds, both liveness and readiness probes activate.</em></p>

<p><strong>Q3:</strong> You need to debug a running Pod that uses a distroless container image (no shell available). How do you get a shell for debugging?</p>
<ul>
<li>A) kubectl exec -it podname -- /bin/sh</li>
<li>B) kubectl attach podname -it</li>
<li>C) kubectl debug -it podname --image=busybox --target=app ✓</li>
<li>D) kubectl run debug --image=busybox --attach</li>
</ul>
<p><em>Explanation: kubectl debug with an ephemeral container injects a debug container (busybox) into the running Pod with access to the same process namespace. The --target flag shares the process namespace with the specified container. This works even when the main container has no shell.</em></p>
