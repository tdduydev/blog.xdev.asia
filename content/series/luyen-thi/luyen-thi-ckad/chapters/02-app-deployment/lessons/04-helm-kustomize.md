---
id: ckad-d2-l04
title: 'Bài 4: Helm & Kustomize'
slug: 04-helm-kustomize
description: >-
  Helm charts, releases, values.yaml và upgrade/rollback workflow. Kustomize
  overlays và bases. Phân biệt khi nào dùng Helm vs Kustomize cho CKAD.
duration_minutes: 50
is_free: true
video_url: null
sort_order: 4
section_title: "Domain 2: Application Deployment (20%)"
course:
  id: lt-ckad-series-001
  title: 'Luyện thi CKAD — Certified Kubernetes Application Developer'
  slug: luyen-thi-ckad
---

<img src="/storage/uploads/2026/04/k8s-cert-ckad-bai4-helm-kustomize.webp" alt="Helm vs Kustomize — Chart structure, template engine, overlays" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="helm-concepts">1. Helm Core Concepts</h2>

<p><strong>Helm</strong> là Kubernetes package manager. Nó đóng gói các Kubernetes manifests vào <strong>Charts</strong> và quản lý deployments dưới dạng <strong>Releases</strong>.</p>

<pre><code class="language-text">Helm Architecture:

  values.yaml          Chart templates
       │                    │
       ▼                    ▼
  ┌──────────────────────────────┐
  │   Helm Template Engine       │
  │   Renders YAML manifests     │
  └──────────────┬───────────────┘
                 │
                 ▼ kubectl apply
         Kubernetes Cluster
          (stored as Release)</code></pre>

<table>
<thead><tr><th>Term</th><th>Định nghĩa</th></tr></thead>
<tbody>
<tr><td><strong>Chart</strong></td><td>Package của Helm — bao gồm templates + default values</td></tr>
<tr><td><strong>Release</strong></td><td>Instance của Chart đã được deploy lên cluster</td></tr>
<tr><td><strong>Repository</strong></td><td>Nơi lưu trữ Charts (như artifact hub, bitnami)</td></tr>
<tr><td><strong>Values</strong></td><td>Configuration parameters để customize Chart</td></tr>
<tr><td><strong>Revision</strong></td><td>Mỗi install/upgrade tạo ra một revision mới</td></tr>
</tbody>
</table>

<h2 id="helm-commands">2. Helm Commands</h2>

<pre><code class="language-text"># Add repository
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# Search charts
helm search repo bitnami/nginx
helm search hub wordpress

# Install chart
helm install my-release bitnami/nginx
helm install my-release bitnami/nginx --values custom-values.yaml
helm install my-release bitnami/nginx --set image.tag=1.25

# List releases
helm list
helm list -n production

# Upgrade release
helm upgrade my-release bitnami/nginx --set replicaCount=3

# Rollback to previous revision
helm rollback my-release 1   # rollback to revision 1
helm rollback my-release     # rollback to previous revision

# Uninstall
helm uninstall my-release

# View rendered templates (dry-run)
helm template my-release bitnami/nginx
helm install my-release bitnami/nginx --dry-run</code></pre>

<blockquote><p><strong>Exam tip:</strong> CKAD thường test <code>helm install</code> với flag <code>--set</code> (override values trực tiếp) và <code>--values file.yaml</code> (override từ file). Cũng test <code>helm upgrade</code> và <code>helm rollback</code>. Nhớ rằng <code>--set</code> override trumps <code>--values</code> file.</p></blockquote>

<h2 id="kustomize">3. Kustomize</h2>

<p><strong>Kustomize</strong> là tool built vào kubectl cho phép customize Kubernetes manifests mà không cần templates hoặc parameters. Dùng overlay pattern.</p>

<pre><code class="language-text">Kustomize Structure:
  base/
  ├── kustomization.yaml    # Base kustomization
  ├── deployment.yaml
  └── service.yaml

  overlays/
  ├── development/
  │   ├── kustomization.yaml  # Patches for dev
  │   └── replica-patch.yaml
  └── production/
      ├── kustomization.yaml  # Patches for prod
      └── replica-patch.yaml</code></pre>

<pre><code class="language-text"># base/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - deployment.yaml
  - service.yaml

# overlays/production/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
bases:
  - ../../base
patches:
  - path: replica-patch.yaml
images:
  - name: myapp
    newTag: "2.0"</code></pre>

<pre><code class="language-text"># Apply với kustomize
kubectl apply -k overlays/production/

# Preview rendered output
kubectl kustomize overlays/production/</code></pre>

<h2 id="comparison">4. Helm vs Kustomize</h2>

<table>
<thead><tr><th>Tiêu chí</th><th>Helm</th><th>Kustomize</th></tr></thead>
<tbody>
<tr><td>Approach</td><td>Template-based (Go templates)</td><td>Overlay/patching (plain YAML)</td></tr>
<tr><td>Learning curve</td><td>Cao hơn (template syntax)</td><td>Thấp hơn (YAML patches)</td></tr>
<tr><td>Package mgmt</td><td>Có (charts, repos, versioning)</td><td>Không</td></tr>
<tr><td>Release history</td><td>Có (upgrade/rollback)</td><td>Không built-in</td></tr>
<tr><td>Built into kubectl</td><td>Không (separate binary)</td><td>Có (<code>kubectl apply -k</code>)</td></tr>
<tr><td>Best for</td><td>Phân phối (distribute) apps</td><td>Env-specific customization</td></tr>
</tbody>
</table>

<h2 id="cheatsheet">5. Cheat Sheet</h2>

<table>
<thead><tr><th>Task</th><th>Command</th></tr></thead>
<tbody>
<tr><td>Install chart với custom values</td><td><code>helm install rel chart --values f.yaml</code></td></tr>
<tr><td>Override một value</td><td><code>helm install rel chart --set key=val</code></td></tr>
<tr><td>Rollback Helm release</td><td><code>helm rollback release-name 2</code></td></tr>
<tr><td>Apply kustomize overlay</td><td><code>kubectl apply -k overlays/prod/</code></td></tr>
<tr><td>Preview kustomize output</td><td><code>kubectl kustomize overlays/prod/</code></td></tr>
</tbody>
</table>

<h2 id="practice">6. Practice Questions</h2>

<p><strong>Q1:</strong> You need to deploy a Helm chart from the "stable" repo with a custom replica count of 5. Which command accomplishes this?</p>
<ul>
<li>A) <code>helm deploy myapp stable/nginx --replicas=5</code></li>
<li>B) <code>helm install myapp stable/nginx --set replicaCount=5</code> ✓</li>
<li>C) <code>helm install myapp stable/nginx -e replicaCount=5</code></li>
<li>D) <code>helm apply myapp stable/nginx --values replicaCount=5</code></li>
</ul>
<p><em>Explanation: helm install uses --set flag to override values. The syntax is --set key=value. The exact key name (replicaCount) depends on the chart's values.yaml, but --set is the correct flag for inline value overrides.</em></p>

<p><strong>Q2:</strong> A team uses Kustomize with a base configuration and production/staging overlays. Which command applies the production overlay?</p>
<ul>
<li>A) <code>kubectl apply -f overlays/production/</code></li>
<li>B) <code>kubectl kustomize overlays/production/ | kubectl apply -f -</code></li>
<li>C) <code>kubectl apply -k overlays/production/</code> ✓</li>
<li>D) <code>kustomize apply overlays/production/</code></li>
</ul>
<p><em>Explanation: kubectl apply -k (note -k not -f) is the built-in way to apply a kustomization directory. Option B also works but is more verbose. The -k flag tells kubectl to process the directory as a Kustomize configuration.</em></p>

<p><strong>Q3:</strong> After a Helm upgrade introduces a bug, you need to revert to the previous working state. What is the correct approach?</p>
<ul>
<li>A) kubectl rollout undo deployment/myapp</li>
<li>B) helm install --replace myapp stable/nginx</li>
<li>C) helm rollback myapp ✓</li>
<li>D) helm upgrade myapp --version=previous</li>
</ul>
<p><em>Explanation: helm rollback reverts a release to a previous revision. Without specifying a revision number, it rolls back to the previous one. This undoes all the changes made by the failed upgrade, including ConfigMaps, Secrets, and other resources managed by the chart.</em></p>
