---
id: ckad-d4-l07
title: 'Lesson 7: SecurityContext, Capabilities & ServiceAccounts'
slug: 07-securitycontext-pod-security
description: >-
  SecurityContext for Pod and Container: runAsUser, runAsNonRoot, readOnlyRootFilesystem,
  Linux capabilities. ServiceAccount binding and automountServiceAccountToken.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 7
section_title: "Domain 4: Application Environment, Configuration and Security (25%)"
course:
  id: lt-ckad-series-001
  title: 'CKAD Exam Prep — Certified Kubernetes Application Developer'
  slug: luyen-thi-ckad
---

<img src="/storage/uploads/2026/04/k8s-cert-ckad-bai7-security-context.webp" alt="SecurityContext — Pod-level vs Container-level, Linux capabilities" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="securitycontext">1. SecurityContext</h2>

<p>SecurityContext defines privilege and access control settings for a Pod or Container.</p>

<pre><code class="language-text">apiVersion: v1
kind: Pod
spec:
  securityContext:            # Pod-level: applies to ALL containers
    runAsUser: 1000           # UID to run containers
    runAsGroup: 3000          # Primary GID
    fsGroup: 2000             # GID for mounted volumes
    runAsNonRoot: true        # Reject containers that run as root

  containers:
  - name: app
    image: myapp
    securityContext:          # Container-level: overrides pod-level
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true   # Filesystem is read-only
      capabilities:
        add: ["NET_BIND_SERVICE"]    # Add capability
        drop: ["ALL"]               # Drop all, add only what needed</code></pre>

<table>
<thead><tr><th>Setting</th><th>Level</th><th>Effect</th></tr></thead>
<tbody>
<tr><td><code>runAsUser</code></td><td>Pod/Container</td><td>Run process with a specific UID</td></tr>
<tr><td><code>runAsNonRoot</code></td><td>Pod/Container</td><td>Reject running if UID = 0 (root)</td></tr>
<tr><td><code>readOnlyRootFilesystem</code></td><td>Container</td><td>Mount root filesystem as read-only</td></tr>
<tr><td><code>allowPrivilegeEscalation</code></td><td>Container</td><td>Block privilege escalation (sudo etc.)</td></tr>
<tr><td><code>privileged</code></td><td>Container</td><td>Run as privileged (like root on host)</td></tr>
<tr><td><code>fsGroup</code></td><td>Pod</td><td>GID for volume files (shared volume access)</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> Container-level <code>securityContext</code> <strong>overrides</strong> Pod-level settings. If a Pod has <code>runAsUser: 1000</code> and a container has <code>runAsUser: 2000</code>, that container runs with UID 2000. Commonly tested: verify user with <code>kubectl exec pod -- id</code> or <code>whoami</code>.</p></blockquote>

<h2 id="capabilities">2. Linux Capabilities</h2>

<pre><code class="language-text">Capabilities allow granting specific privileges without full root.

# Common examples:
NET_BIND_SERVICE  — Bind to port < 1024 (e.g., port 80)
NET_ADMIN         — Network administration (ifconfig etc.)
SYS_TIME          — Modify system clock
CHOWN             — Change file ownership
SETUID/SETGID     — Change user/group ID

securityContext:
  capabilities:
    drop: ["ALL"]             # Best practice: drop all first
    add: ["NET_BIND_SERVICE"] # Then re-add only what's needed</code></pre>

<h2 id="serviceaccount">3. ServiceAccounts</h2>

<p>Pods use a <strong>ServiceAccount</strong> to authenticate with the Kubernetes API.</p>

<pre><code class="language-text"># Create ServiceAccount
kubectl create serviceaccount my-sa

# Bind to a Role
kubectl create rolebinding my-binding \
  --role=pod-reader \
  --serviceaccount=default:my-sa

# Assign SA to a Pod
spec:
  serviceAccountName: my-sa     # Use specific SA
  automountServiceAccountToken: false  # Don't auto-mount SA token

# By default: the default SA is mounted at /var/run/secrets/kubernetes.io/serviceaccount/
# The token file can be used to call the K8s API from within the container</code></pre>

<table>
<thead><tr><th>Concept</th><th>Description</th></tr></thead>
<tbody>
<tr><td>Default SA</td><td>Each namespace has a built-in <code>default</code> SA (minimal permissions)</td></tr>
<tr><td>Token mount</td><td>Token is automatically mounted into the pod unless disabled</td></tr>
<tr><td><code>automountServiceAccountToken: false</code></td><td>Disable token mounting (best security practice)</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> When a Pod needs to call the Kubernetes API (e.g., operator pattern), it needs a ServiceAccount with appropriate permissions. If the Pod doesn't need API access, best practice is to set <code>automountServiceAccountToken: false</code>. CKAD commonly tests: creating a SA, binding a role, and setting the SA in the Pod spec.</p></blockquote>

<h2 id="readonly-volume">4. readOnlyRootFilesystem with emptyDir</h2>

<pre><code class="language-text"># When using readOnlyRootFilesystem: true, the app CANNOT write to the root FS.
# But the app may still need to write temp files → use emptyDir volumes:

spec:
  containers:
  - name: app
    image: myapp
    securityContext:
      readOnlyRootFilesystem: true
    volumeMounts:
    - name: tmp
      mountPath: /tmp        # App writes temp files here
    - name: cache
      mountPath: /app/cache
  volumes:
  - name: tmp
    emptyDir: {}
  - name: cache
    emptyDir: {}</code></pre>

<h2 id="cheatsheet">5. Cheat Sheet</h2>

<table>
<thead><tr><th>Task</th><th>YAML / Command</th></tr></thead>
<tbody>
<tr><td>Run container as non-root</td><td><code>securityContext: runAsNonRoot: true</code></td></tr>
<tr><td>Run with specific UID</td><td><code>securityContext: runAsUser: 1000</code></td></tr>
<tr><td>Read-only filesystem</td><td><code>securityContext: readOnlyRootFilesystem: true</code></td></tr>
<tr><td>Drop all capabilities</td><td><code>capabilities: drop: ["ALL"]</code></td></tr>
<tr><td>Assign ServiceAccount</td><td><code>spec: serviceAccountName: my-sa</code></td></tr>
<tr><td>Verify user in container</td><td><code>kubectl exec pod -- whoami</code></td></tr>
</tbody>
</table>

<h2 id="practice">6. Practice Questions</h2>

<p><strong>Q1:</strong> A Pod spec has securityContext.runAsUser: 1000 at the Pod level. One container within the Pod has securityContext.runAsUser: 2000. What UID does that container run with?</p>
<ul>
<li>A) 0 (root, because Pod-level overrides)</li>
<li>B) 1000 (Pod-level takes priority)</li>
<li>C) 2000 (Container-level overrides Pod-level) ✓</li>
<li>D) Both UIDs simultaneously</li>
</ul>
<p><em>Explanation: Container-level securityContext settings override Pod-level settings. The container runs with UID 2000. Other containers in the same Pod without a container-level securityContext.runAsUser would inherit the Pod-level UID of 1000.</em></p>

<p><strong>Q2:</strong> An application container needs to bind to port 80 (a privileged port below 1024) but should NOT run as root. How do you configure this?</p>
<ul>
<li>A) Set securityContext.privileged: true</li>
<li>B) Set securityContext.runAsUser: 0</li>
<li>C) Add NET_BIND_SERVICE capability while dropping ALL others ✓</li>
<li>D) Use a NodePort Service instead of port 80</li>
</ul>
<p><em>Explanation: Linux capabilities allow granular privilege grants. NET_BIND_SERVICE allows binding to ports below 1024 without full root. Best practice is to drop ALL capabilities first, then add only what's needed: capabilities: { drop: ["ALL"], add: ["NET_BIND_SERVICE"] }.</em></p>

<p><strong>Q3:</strong> A Pod is running with readOnlyRootFilesystem: true, but the application tries to write to /tmp and fails. What is the best solution?</p>
<ul>
<li>A) Remove readOnlyRootFilesystem: true</li>
<li>B) Set securityContext.privileged: true</li>
<li>C) Mount an emptyDir volume at /tmp ✓</li>
<li>D) Use a ConfigMap mounted at /tmp</li>
</ul>
<p><em>Explanation: readOnlyRootFilesystem prevents writes to the container's filesystem, but emptyDir volumes are separate writable mounts. By mounting an emptyDir at /tmp, the application can write temp files there while the root filesystem remains read-only — maintaining the security benefit.</em></p>
