---
id: 019d0001-1005-7005-b005-000000000005
title: 'Kubernetes Admission Policy & Runtime Defense with Kyverno and Falco'
slug: kubernetes-admission-policy-kyverno-falco
excerpt: >-
  Static image scanning will not catch abnormal behavior at runtime. Combine
  admission policies (Kyverno) to block non-compliant workloads with runtime
  monitors (Falco) to detect shell-in-container and lateral movement.
featured_image: /images/blog/k8s-kyverno-falco-featured.webp
type: blog
reading_time: 9
view_count: 0
meta: null
published_at: '2026-05-08T00:00:00.000000Z'
created_at: '2026-05-08T00:00:00.000000Z'
author:
  id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf
  name: Duy Tran
  avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg
category:
  id: 019c9616-cat5-7005-a005-000000000005
  name: Security
  slug: security
tags:
  - name: devsecops
    slug: devsecops
  - name: kubernetes
    slug: kubernetes
  - name: kyverno
    slug: kyverno
  - name: falco
    slug: falco
  - name: runtime-security
    slug: runtime-security
comments: []
locale: en
---
<blockquote>Image scanning and threat modeling protect you before deploy. Admission policy protects you at the moment workloads enter the cluster. Runtime monitoring is the camera for everything that happens after.</blockquote>

<h2 id="three-layers">Three layers of cluster defense</h2>
<table>
  <thead><tr><th>Layer</th><th>Role</th><th>Tools</th></tr></thead>
  <tbody>
    <tr><td>Pre-admission</td><td>Lint, scan image, verify signature</td><td>Trivy, Cosign</td></tr>
    <tr><td>Admission</td><td>Block workloads that violate policy</td><td>Kyverno, OPA Gatekeeper</td></tr>
    <tr><td>Runtime</td><td>Detect abnormal behavior, network policy</td><td>Falco, Cilium Tetragon, NetworkPolicy</td></tr>
  </tbody>
</table>

<h2 id="kyverno-vs-opa">Kyverno vs OPA Gatekeeper — which one?</h2>
<ul>
  <li><strong>Kyverno</strong>: write policies in plain YAML, short, easy to learn. Supports mutate, generate, verifyImages keyless. Fits most cases.</li>
  <li><strong>OPA Gatekeeper</strong>: written in Rego, powerful for complex logic. Use it when you already have an OPA ecosystem (API gateway, microservice authz).</li>
</ul>
<p>Recommendation: start with Kyverno for new clusters. Migrating between the two later is not too hard — policies are declarative.</p>

<h2 id="baseline-policy">Baseline policies you should have</h2>
<ol>
  <li>Apply <strong>Pod Security Standards: restricted</strong> on application namespaces.</li>
  <li>Block pods using <code>privileged: true</code>, <code>hostNetwork</code>, <code>hostPID</code>.</li>
  <li>Require images from internal registries (allowlist).</li>
  <li>Require <code>resources.requests/limits</code> on every container.</li>
  <li>Require standard labels (team, env, cost-center) for cost tracking and IR.</li>
  <li>Verify Cosign signatures on production images.</li>
</ol>

<h2 id="audit-before-enforce">Roll out safely: Audit → Fix → Enforce</h2>
<p>Never apply <code>validationFailureAction: Enforce</code> immediately on a running cluster. A reference workflow:</p>
<ol>
  <li>Apply policies with <code>validationFailureAction: Audit</code>.</li>
  <li>Measure violations via the Kyverno PolicyReport CRD over 1-2 weeks.</li>
  <li>File fix tickets per offending workload, with an owner.</li>
  <li>When violations reach 0 in staging, switch to Enforce in dev → staging → prod.</li>
</ol>
<p>Have a clear exception process: special workloads (e.g., a privileged debug pod) must carry an annotated reason, expiry and owner.</p>

<h2 id="default-deny-network">Default-deny network policy</h2>
<p>Each application namespace should start with a "deny all" policy and open only what is actually needed:</p>
<pre><code class="language-yaml">apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: payments
spec:
  podSelector: {}
  policyTypes: ["Ingress", "Egress"]
</code></pre>
<p>Then open each connection: app → DB, app → service mesh, egress to external APIs through an egress gateway. With <strong>Cilium</strong>, you can write L7 policy (HTTP path, gRPC method, Kafka topic) — much stronger than port/IP only.</p>

<h2 id="falco">Falco: runtime detection for containers</h2>
<p>Falco hooks into the kernel (eBPF or kernel module) to observe syscalls. Highest-value rules:</p>
<ul>
  <li><strong>Shell in container</strong> (<code>shell_in_container</code>). Production rarely has a legitimate need for one.</li>
  <li><strong>Modifying binaries</strong> in a runtime image (sign of compromise).</li>
  <li><strong>Unusual outbound connections</strong> to IPs/domains outside the allowlist.</li>
  <li><strong>Reading sensitive files</strong> like <code>/etc/shadow</code> or kubeconfig.</li>
  <li><strong>Mounting sensitive paths</strong> like <code>/var/run/docker.sock</code>, <code>/proc</code>.</li>
</ul>
<p>Stream Falco events to Slack/PagerDuty for high-severity rules and to your SIEM for later analysis.</p>

<h2 id="tetragon">Cilium Tetragon: low overhead, eBPF-assisted</h2>
<p>Tetragon uses eBPF similarly but is performance-tuned for large clusters and can <strong>enforce</strong>, not just detect (e.g., kill processes when a syscall violates policy). Useful when in-kernel response time matters.</p>

<h2 id="when-alert">When an alert fires — short IR workflow</h2>
<ol>
  <li>Triage within 15 minutes: classify true vs false positive by severity.</li>
  <li>Isolate the pod with a <code>NetworkPolicy</code> blocking egress; do NOT delete it (preserve evidence).</li>
  <li>Capture snapshots: <code>kubectl debug</code>, dump memory, copy logs, export the audit trail.</li>
  <li>Rotate any credentials the pod could have touched: ServiceAccount tokens, mounted secrets.</li>
  <li>After investigation: write a blameless post-mortem and add a new Falco rule if needed.</li>
</ol>

<h2 id="conclusion">Conclusion</h2>
<p>Defending Kubernetes is more than RBAC and a firewall. You need three layers: pre-admission (image scan, sign), admission (Kyverno), runtime (Falco/Tetragon, NetworkPolicy). Begin with baseline policies in audit mode, gradually enforce, integrate Falco with your SIEM — that is a solid configuration for most production clusters in 2026.</p>
