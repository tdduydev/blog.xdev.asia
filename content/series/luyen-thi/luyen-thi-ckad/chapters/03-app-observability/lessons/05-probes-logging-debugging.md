---
id: ckad-d3-l05
title: 'Bài 5: Probes, Logging & Debugging'
slug: 05-probes-logging-debugging
description: >-
  Liveness, Readiness và Startup Probes với các probe types (httpGet, tcpSocket,
  exec). Kubectl logs, exec, debug và port-forward cho CKAD troubleshooting.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 5
section_title: "Domain 3: Application Observability and Maintenance (15%)"
course:
  id: lt-ckad-series-001
  title: 'Luyện thi CKAD — Certified Kubernetes Application Developer'
  slug: luyen-thi-ckad
---

<img src="/storage/uploads/2026/04/k8s-cert-ckad-bai5-probes.webp" alt="Liveness, Readiness và Startup Probes — timeline và probe methods" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="probe-types">1. Ba loại Probe</h2>

<table>
<thead><tr><th>Probe</th><th>Mục đích</th><th>Khi fail?</th></tr></thead>
<tbody>
<tr><td><strong>Liveness</strong></td><td>Container có còn "sống" không?</td><td>Container bị restart</td></tr>
<tr><td><strong>Readiness</strong></td><td>Container có sẵn sàng nhận traffic?</td><td>Removed from Service endpoints (không restart)</td></tr>
<tr><td><strong>Startup</strong></td><td>App đã khởi động xong chưa?</td><td>Container bị restart (dùng trước liveness check)</td></tr>
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
<thead><tr><th>Field</th><th>Default</th><th>Ý nghĩa</th></tr></thead>
<tbody>
<tr><td><code>initialDelaySeconds</code></td><td>0</td><td>Chờ trước khi probe đầu tiên</td></tr>
<tr><td><code>periodSeconds</code></td><td>10</td><td>Interval giữa các probes</td></tr>
<tr><td><code>timeoutSeconds</code></td><td>1</td><td>Timeout của mỗi probe</td></tr>
<tr><td><code>failureThreshold</code></td><td>3</td><td>Fail bao nhiêu lần thì action</td></tr>
<tr><td><code>successThreshold</code></td><td>1</td><td>Pass bao nhiêu lần để "healthy"</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> <strong>Startup probe</strong> dùng khi app khởi động lâu (ví dụ: legacy app cần 2 phút load). Set <code>failureThreshold * periodSeconds</code> &gt;= thời gian startup tối đa. Liveness probe không chạy cho đến khi startup probe pass.</p></blockquote>

<h2 id="logging">3. Logging & kubectl logs</h2>

<pre><code class="language-text"># Xem logs của pod
kubectl logs podname

# Follow logs (tail -f)
kubectl logs -f podname

# Previous container (nếu bị crash)
kubectl logs podname --previous

# Logs của specific container trong multi-container pod
kubectl logs podname -c container-name

# Logs với timestamp
kubectl logs podname --timestamps

# Tail N lines
kubectl logs podname --tail=100</code></pre>

<h2 id="debugging">4. Debugging Commands</h2>

<pre><code class="language-text"># Exec vào container
kubectl exec -it podname -- /bin/bash
kubectl exec -it podname -c container-name -- sh

# Port forward để test service locally
kubectl port-forward pod/podname 8080:80
kubectl port-forward service/myservice 8080:80

# Ephemeral debug container (khi container không có shell)
kubectl debug -it podname --image=busybox --target=container-name

# Debug a node
kubectl debug node/worker-1 -it --image=ubuntu

# Copy files
kubectl cp podname:/app/logs/error.log ./error.log
kubectl cp ./config.yaml podname:/app/config.yaml</code></pre>

<blockquote><p><strong>Exam tip:</strong> Khi pod không có shell (distroless image), dùng <code>kubectl debug</code> với ephemeral container. Trong CKAD exam, <code>kubectl exec</code> + <code>kubectl logs</code> là 2 commands debugging quan trọng nhất. Luôn check logs trước khi exec.</p></blockquote>

<h2 id="pod-states">5. Common Pod States & Debug</h2>

<table>
<thead><tr><th>Pod State</th><th>Nguyên nhân thường gặp</th><th>Debug command</th></tr></thead>
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
<tr><td>Check pod sức khỏe</td><td><code>kubectl describe pod &lt;name&gt;</code></td></tr>
<tr><td>Xem logs crash</td><td><code>kubectl logs &lt;pod&gt; --previous</code></td></tr>
<tr><td>Shell vào container</td><td><code>kubectl exec -it &lt;pod&gt; -- sh</code></td></tr>
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
