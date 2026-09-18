---
id: kcna-d4-l09
title: 'Lesson 9: Helm, GitOps & CI/CD'
slug: 09-helm-gitops-cicd
description: >-
  Helm package manager, GitOps with Argo CD, CI/CD pipelines for Kubernetes.
  Deployment strategies: rolling update, canary, blue-green.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 9
section_title: "Domain 4: Cloud Native Observability & Security (16%)"
course:
  id: lt-kcna-series-001
  title: 'KCNA Exam Prep — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai9-helm-gitops.webp" alt="GitOps Workflow with Helm and Argo CD" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="helm">1. Helm — Kubernetes Package Manager</h2>

<p><strong>Helm</strong> is the package manager for Kubernetes. Charts are reusable, parameterizable YAML templates.</p>

<pre><code class="language-text">Helm Concepts:
  Chart     = Package (templates + default values)
  Release   = Installed instance of a chart in a cluster
  Repository = Collection of charts (ArtifactHub.io)
  Values    = Parameters to customize a chart

$ helm install my-nginx bitnami/nginx --set service.type=LoadBalancer
  └── Release: my-nginx
      ├── templates/deployment.yaml
      ├── templates/service.yaml
      └── values.yaml (overridden)</code></pre>

<table>
<thead><tr><th>Helm Command</th><th>Function</th></tr></thead>
<tbody>
<tr><td><code>helm install</code></td><td>Deploy a new chart (create a release)</td></tr>
<tr><td><code>helm upgrade</code></td><td>Update a release with a new chart/values</td></tr>
<tr><td><code>helm rollback</code></td><td>Revert to a previous revision</td></tr>
<tr><td><code>helm list</code></td><td>List all releases</td></tr>
<tr><td><code>helm uninstall</code></td><td>Remove a release</td></tr>
<tr><td><code>helm template</code></td><td>Render templates without deploying</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> Helm stores release history in Kubernetes Secrets (not ConfigMaps). This enables <code>helm rollback</code> to work. History retains 10 revisions by default.</p></blockquote>

<h2 id="gitops">2. GitOps</h2>

<p><strong>GitOps</strong> is an operational framework that uses Git as the <strong>single source of truth</strong> for both code and infrastructure configuration.</p>

<pre><code class="language-text">GitOps Flow:
  Developer ──push──► Git Repo (desired state)
                          │
                    GitOps Operator (Argo CD / Flux)
                    - Watches Git repo
                    - Compares with cluster state
                    - Syncs if diff found
                          │
                       K8s Cluster (actual state)</code></pre>

<table>
<thead><tr><th>GitOps Principle</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td><strong>Declarative</strong></td><td>System state described in YAML in Git</td></tr>
<tr><td><strong>Versioned & immutable</strong></td><td>Git history = audit trail</td></tr>
<tr><td><strong>Pulled automatically</strong></td><td>Agent pulls changes, no push access to cluster needed</td></tr>
<tr><td><strong>Continuously reconciled</strong></td><td>Drift detection — auto-correct if cluster differs from Git</td></tr>
</tbody>
</table>

<h3 id="argo-cd">Argo CD</h3>

<p><strong>Argo CD</strong> is the most popular GitOps controller for Kubernetes (CNCF Incubating → Graduated 2022).</p>

<blockquote><p><strong>Exam tip:</strong> GitOps uses <strong>pull-based</strong> deployment instead of push. Benefits: the cluster doesn't need to expose its API externally, and CI pipelines don't need kubeconfig credentials.</p></blockquote>

<h2 id="cicd">3. CI/CD for Kubernetes</h2>

<pre><code class="language-text">CI/CD Pipeline:
  Code Push
      │
  ┌───▼───┐  CI Phase (Build)
  │ Build  │── Unit tests ── Integration tests
  │ Image  │── Security scan (Trivy, Snyk)
  └───┬───┘── Push to Registry (ECR, GCR)
      │
  ┌───▼───┐  CD Phase (Deploy)
  │ Update │── Update Helm values / K8s manifest
  │ Manifest│── Push to GitOps repo
  └───┬───┘── Argo CD picks up and syncs
      │
  ┌───▼────────────────────┐
  │ Kubernetes Cluster     │
  │  Rolling Update        │
  └────────────────────────┘</code></pre>

<h2 id="deployment-strategies">4. Deployment Strategies</h2>

<table>
<thead><tr><th>Strategy</th><th>How it works</th><th>Downtime</th><th>Rollback</th><th>Use when</th></tr></thead>
<tbody>
<tr><td><strong>Rolling Update</strong></td><td>Replace pods gradually (default)</td><td>None</td><td>kubectl rollout undo</td><td>Stateless apps, gradual</td></tr>
<tr><td><strong>Recreate</strong></td><td>Kill all v1, then deploy v2</td><td>Yes</td><td>Redeploy v1</td><td>Breaking changes, simple</td></tr>
<tr><td><strong>Blue-Green</strong></td><td>Run v1 (blue) + v2 (green) side by side, switch traffic</td><td>None</td><td>Switch back instantly</td><td>Critical apps, fast rollback</td></tr>
<tr><td><strong>Canary</strong></td><td>Route small % traffic to new version</td><td>None</td><td>Redirect traffic</td><td>Staged rollout, A/B testing</td></tr>
</tbody>
</table>

<pre><code class="language-text">Canary in Kubernetes (Ingress weight):
  ┌─────────────────────────────────┐
  │  Ingress (canary annotation)     │
  │  90% ──────► Deployment v1.0    │
  │  10% ──────► Deployment v1.1    │
  └─────────────────────────────────┘
  → Monitor v1.1 errors → promote to 100% or rollback</code></pre>

<h2 id="cheatsheet">5. Cheat Sheet</h2>

<table>
<thead><tr><th>Exam question</th><th>Answer</th></tr></thead>
<tbody>
<tr><td>Where does Helm store release history?</td><td><strong>Kubernetes Secrets</strong></td></tr>
<tr><td>GitOps single source of truth?</td><td><strong>Git repository</strong></td></tr>
<tr><td>Does GitOps use pull or push?</td><td><strong>Pull-based</strong> (agent pulls)</td></tr>
<tr><td>Deployment with no downtime?</td><td><strong>Rolling</strong> or <strong>Blue-Green</strong></td></tr>
<tr><td>Test new version with 5% traffic?</td><td><strong>Canary</strong> deployment</td></tr>
<tr><td>Fast rollback when issues arise?</td><td><strong>Blue-Green</strong> (instant switch)</td></tr>
</tbody>
</table>

<h2 id="practice">6. Practice Questions</h2>

<p><strong>Q1:</strong> A team wants to deploy a new version of their app to 10% of users first, monitor for errors, then gradually increase traffic. Which deployment strategy should they use?</p>
<ul>
<li>A) Recreate</li>
<li>B) Rolling Update</li>
<li>C) Blue-Green</li>
<li>D) Canary ✓</li>
</ul>
<p><em>Explanation: Canary deployment routes a small percentage of traffic to the new version, allowing teams to validate it with real traffic before full rollout. This minimizes blast radius if the new version has bugs.</em></p>

<p><strong>Q2:</strong> Which of the following best describes the GitOps model?</p>
<ul>
<li>A) CI/CD pipeline pushes directly to Kubernetes after tests pass</li>
<li>B) Git repository is the single source of truth; a controller continuously reconciles cluster state with Git ✓</li>
<li>C) Developers manually apply kubectl commands from their workstations</li>
<li>D) Infrastructure is defined in a relational database for consistency</li>
</ul>
<p><em>Explanation: GitOps uses a pull-based model where a controller (Argo CD, Flux) watches a Git repository and ensures the cluster matches what's declared in Git. This provides audit trail, drift detection, and secure deployments.</em></p>

<p><strong>Q3:</strong> Where does Helm store release history to enable rollback capability?</p>
<ul>
<li>A) Helm's local filesystem (~/.helm)</li>
<li>B) ConfigMap in the target namespace</li>
<li>C) Secret in the target namespace ✓</li>
<li>D) A separate etcd database</li>
</ul>
<p><em>Explanation: Since Helm v3, release metadata (history, values, chart info) is stored as Secrets in the release's namespace. This enables helm rollback by reading previous revision data, and allows multiple users/systems to manage the same release.</em></p>
