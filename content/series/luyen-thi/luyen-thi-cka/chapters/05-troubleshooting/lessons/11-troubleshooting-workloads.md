---
id: cka-d5-l11
title: 'Bài 11: Troubleshooting Workloads'
slug: 11-troubleshooting-workloads
description: >-
  Debug Pods: CrashLoopBackOff, ImagePullBackOff, Pending. Troubleshoot
  Deployments và Services. Systematic kubectl debugging workflow.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 11
section_title: "Domain 5: Troubleshooting (30%)"
course:
  id: lt-cka-series-001
  title: 'Luyện thi CKA — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai11-workload-debug.webp" alt="Pod Troubleshooting Workflow — CrashLoopBackOff, ImagePullBackOff, OOMKilled" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="pod-debug-workflow">1. Pod Debug Workflow</h2>

<pre><code class="language-text">Systematic Pod Troubleshooting:
  
  kubectl get pod POD_NAME
     │
     ├── Pending → Node issues or PVC not bound
     ├── Running but not working → Check logs, exec
     ├── CrashLoopBackOff → App crashing
     ├── ImagePullBackOff → Image or registry issue
     └── Error → Start/init failure
  
  For any issue → next step:
  kubectl describe pod POD_NAME
  (read Events section at bottom!)
  
  For logs:
  kubectl logs POD_NAME
  kubectl logs POD_NAME --previous  (after crash)
  kubectl logs POD_NAME -c CONTAINER  (multi-container)</code></pre>

<h2 id="pod-issues">2. Common Pod Issues</h2>

<table>
<thead><tr><th>State</th><th>Nguyên nhân</th><th>Debug</th></tr></thead>
<tbody>
<tr><td><strong>Pending</strong></td><td>Không schedule được</td><td>describe pod → Events: Insufficient CPU/memory hoặc No nodes match affinity</td></tr>
<tr><td><strong>ImagePullBackOff</strong></td><td>Image không tồn tại / registry auth</td><td>Check image name typo, imagePullSecrets</td></tr>
<tr><td><strong>CrashLoopBackOff</strong></td><td>App crash liên tục</td><td>kubectl logs --previous, check app exit code</td></tr>
<tr><td><strong>OOMKilled</strong></td><td>Vượt memory limit</td><td>kubectl describe pod → Container Reason: OOMKilled</td></tr>
<tr><td><strong>CreateContainerError</strong></td><td>Volume mount, ConfigMap, Secret không tồn tại</td><td>describe pod Events</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> <code>kubectl describe pod</code> Events section là nơi quan trọng nhất để debug. CKA tasks thường yêu cầu bạn fix một broken pod — thường là typo trong image name, sai ConfigMap name, hoặc Port conflict.</p></blockquote>

<h2 id="exec-debug">3. Exec & Debug</h2>

<pre><code class="language-text"># Exec into running container
kubectl exec -it POD_NAME -- /bin/sh
kubectl exec -it POD_NAME -c CONTAINER_NAME -- bash

# Debug with ephemeral container (v1.23+)
kubectl debug -it POD_NAME --image=busybox --target=app

# Copy files from/to pod
kubectl cp POD_NAME:/var/log/app.log ./app.log
kubectl cp ./config.yaml POD_NAME:/tmp/config.yaml

# Port-forward for quick testing
kubectl port-forward pod/POD_NAME 8080:80
kubectl port-forward svc/SERVICE_NAME 8080:80</code></pre>

<h2 id="deployment-debug">4. Deployment Issues</h2>

<pre><code class="language-text"># Check deployment status
kubectl rollout status deployment/myapp
kubectl get replicaset -l app=myapp  # Check RS history

# Pod template issue: deployment creates RS but pods fail
kubectl describe replicaset RS_NAME  # Check pod template errors

# Deployment stuck in progress?
kubectl describe deployment myapp | grep -A5 Conditions

# Check events at deployment level
kubectl get events --field-selector involvedObject.name=myapp --sort-by='.lastTimestamp'</code></pre>

<h2 id="service-debug">5. Service Connectivity Debug</h2>

<pre><code class="language-text">Debug service connectivity:

1. Check endpoints
   kubectl get endpoints SERVICE_NAME
   → Empty: selector mismatch

2. Test from within cluster
   kubectl run test --image=busybox --rm -it -- wget -O- http://SERVICE_NAME:PORT

3. Check kube-proxy
   kubectl get pods -n kube-system -l k8s-app=kube-proxy

4. Check iptables (on node)
   iptables -t nat -L KUBE-SERVICES | grep SERVICE_NAME</code></pre>

<h2 id="cheatsheet">6. Cheat Sheet</h2>

<table>
<thead><tr><th>Task</th><th>Command</th></tr></thead>
<tbody>
<tr><td>Previous container logs</td><td><code>kubectl logs POD --previous</code></td></tr>
<tr><td>All events in namespace</td><td><code>kubectl get events --sort-by='.lastTimestamp'</code></td></tr>
<tr><td>Quick connectivity test</td><td><code>kubectl run test --image=busybox --rm -it -- wget -qO- URL</code></td></tr>
<tr><td>Check pod exit code</td><td><code>kubectl describe pod | grep Exit Code</code></td></tr>
<tr><td>Multi-container logs</td><td><code>kubectl logs POD -c CONTAINER</code></td></tr>
</tbody>
</table>

<h2 id="practice">7. Practice Questions</h2>

<p><strong>Q1:</strong> A Pod is in CrashLoopBackOff. The application log shows "Error: failed to connect to database at localhost:5432". What is the issue?</p>
<ul>
<li>A) The database Service is misconfigured</li>
<li>B) The app uses localhost to reach the database, but sidecar containers don't have a database running ✓</li>
<li>C) The Pod lacks sufficient memory</li>
<li>D) The database password in the Secret is incorrect</li>
</ul>
<p><em>Explanation: Pods share a network namespace, so "localhost" within a Pod only reaches other containers in the SAME Pod. If the database is in a separate Pod, the app should use the Service DNS name (e.g., pg-service.namespace.svc.cluster.local), not localhost.</em></p>

<p><strong>Q2:</strong> A Deployment's Pods are stuck in ImagePullBackOff. The image name is "mycompany/private-app:1.2". What should you verify first?</p>
<ul>
<li>A) The image exists on Docker Hub with exact tag</li>
<li>B) The Deployment has an imagePullSecrets referencing registry credentials ✓</li>
<li>C) The node has enough disk space</li>
<li>D) The Service is correctly configured</li>
</ul>
<p><em>Explanation: Private registries require authentication. The Pod must have an imagePullSecrets field referencing a Secret with registry credentials (type: kubernetes.io/dockerconfigjson). Also verify the image name and tag are correct.</em></p>

<p><strong>Q3:</strong> You run "kubectl get endpoints myservice" and the result shows "&lt;none&gt;". What is the most likely problem?</p>
<ul>
<li>A) The Service port is wrong</li>
<li>B) No Pods with labels matching the Service selector are in Ready state ✓</li>
<li>C) The Ingress is misconfigured</li>
<li>D) kube-proxy is not running</li>
</ul>
<p><em>Explanation: Endpoints are populated when Pods match the Service selector AND are Ready. Common causes: label mismatch (typo in selector); all Pods are Pending/CrashLooping so not Ready; wrong namespace. Check: kubectl get pods -l APP=LABEL --show-labels.</em></p>
