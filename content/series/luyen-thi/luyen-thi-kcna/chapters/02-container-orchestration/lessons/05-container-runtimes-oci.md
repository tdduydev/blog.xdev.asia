---
id: kcna-d2-l05
title: 'Bài 5: Container Runtimes & OCI Standards'
slug: 05-container-runtimes-oci
description: >-
  OCI (Open Container Initiative), container runtime interface (CRI).
  Docker, containerd, CRI-O. Image layers, registries và image lifecycle.
duration_minutes: 50
is_free: true
video_url: null
sort_order: 5
section_title: "Domain 2: Container Orchestration (22%)"
course:
  id: lt-kcna-series-001
  title: 'Luyện thi KCNA — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai5-oci-runtimes.webp" alt="OCI Container Runtime Stack — CRI, containerd, runc" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="oci">1. OCI — Open Container Initiative</h2>

<p><strong>OCI</strong> là tổ chức mở (thuộc Linux Foundation) định nghĩa các chuẩn mở cho containers:</p>

<table>
<thead><tr><th>Specification</th><th>Định nghĩa</th><th>Ví dụ implement</th></tr></thead>
<tbody>
<tr><td><strong>OCI Image Spec</strong></td><td>Định dạng container image (layers, manifest)</td><td>Docker image, OCI image</td></tr>
<tr><td><strong>OCI Runtime Spec</strong></td><td>Cách chạy container từ image (lifecycle, filesystem)</td><td>runc, crun, kata-containers</td></tr>
<tr><td><strong>OCI Distribution Spec</strong></td><td>API để push/pull image từ registry</td><td>DockerHub, ECR, GCR</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> OCI standards đảm bảo <strong>interoperability</strong>: image build bằng Docker có thể chạy với containerd hoặc CRI-O mà không cần thay đổi. KCNA thường hỏi về vai trò của OCI trong cloud native ecosystem.</p></blockquote>

<h2 id="container-runtime">2. Container Runtime Interface (CRI)</h2>

<p>Kubernetes không giao tiếp trực tiếp với Docker hay containerd. Thay vào đó, kubelet dùng <strong>CRI (Container Runtime Interface)</strong> — một gRPC API chuẩn.</p>

<pre><code class="language-text">Kubernetes Architecture (Runtime Layer):

  kubelet
     │ CRI (gRPC)
     ├─── containerd ─── runc ─── container
     ├─── CRI-O      ─── runc ─── container
     └─── (Docker)   ─── (deprecated v1.24+)

  OCI Runtime (runc, crun):
  - Đọc OCI runtime bundle
  - Gọi Linux kernel (namespaces, cgroups)
  - Tạo container process</code></pre>

<h2 id="runtimes-comparison">3. Container Runtimes Comparison</h2>

<table>
<thead><tr><th>Runtime</th><th>Loại</th><th>Đặc điểm</th><th>Dùng trong</th></tr></thead>
<tbody>
<tr><td><strong>containerd</strong></td><td>High-level (CRI)</td><td>Nhẹ, stable, CNCF graduated</td><td>Default Kubernetes 1.24+</td></tr>
<tr><td><strong>CRI-O</strong></td><td>High-level (CRI)</td><td>Tối ưu cho Kubernetes, lightweight</td><td>OpenShift, Kubernetes</td></tr>
<tr><td><strong>Docker Engine</strong></td><td>High-level (non-CRI)</td><td>Deprecated từ K8s 1.24 (dùng dockershim)</td><td>Dev environments</td></tr>
<tr><td><strong>runc</strong></td><td>Low-level (OCI)</td><td>Reference OCI implementation</td><td>Backend của containerd/CRI-O</td></tr>
<tr><td><strong>gVisor (runsc)</strong></td><td>Low-level (sandbox)</td><td>Security sandbox, intercepts syscalls</td><td>GKE sandbox, untrusted workloads</td></tr>
<tr><td><strong>Kata Containers</strong></td><td>Low-level (VM-based)</td><td>VM isolation per container</td><td>Multi-tenant, high security</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> Docker bị deprecated như Kubernetes runtime từ v1.24, nhưng Docker images (OCI-compatible) vẫn chạy được trên containerd/CRI-O. "Docker deprecated" ≠ "Docker images deprecated".</p></blockquote>

<h2 id="image-layers">4. Container Image Layers</h2>

<pre><code class="language-text">Layer architecture:
┌──────────────────────────────┐
│  Layer 4: App code (5 MB)    │  ← Writeable (container layer)
├──────────────────────────────┤
│  Layer 3: npm packages       │  ← Read-only
├──────────────────────────────┤
│  Layer 2: Node.js runtime    │  ← Read-only
├──────────────────────────────┤
│  Layer 1: Ubuntu base image  │  ← Read-only (shared across images)
└──────────────────────────────┘

Cache benefit: nếu Layer 1-2 giống nhau, chỉ download Layer 3-4</code></pre>

<h2 id="registries">5. Container Registries</h2>

<table>
<thead><tr><th>Registry</th><th>Provider</th><th>Đặc điểm</th></tr></thead>
<tbody>
<tr><td>Docker Hub</td><td>Docker Inc.</td><td>Public default, rate-limited pulls</td></tr>
<tr><td>ECR (Elastic Container Registry)</td><td>AWS</td><td>Private, IAM integrated</td></tr>
<tr><td>GCR / Artifact Registry</td><td>GCP</td><td>Private, Workload Identity</td></tr>
<tr><td>GHCR (GitHub Container Registry)</td><td>GitHub</td><td>Package-linked, Actions CI</td></tr>
<tr><td>Harbor</td><td>CNCF (open source)</td><td>Self-hosted, vulnerability scanning</td></tr>
</tbody>
</table>

<h2 id="cheatsheet">6. Cheat Sheet</h2>

<table>
<thead><tr><th>Câu hỏi exam</th><th>Đáp án</th></tr></thead>
<tbody>
<tr><td>OCI định nghĩa chuẩn gì?</td><td>Image Spec, Runtime Spec, Distribution Spec</td></tr>
<tr><td>Default runtime K8s 1.24+?</td><td><strong>containerd</strong></td></tr>
<tr><td>CRI là gì?</td><td>Container Runtime Interface — gRPC API giữa kubelet và runtime</td></tr>
<tr><td>Docker deprecated trong K8s?</td><td><strong>Từ v1.24</strong> (dockershim removed)</td></tr>
<tr><td>Runtime cho untrusted workloads?</td><td><strong>gVisor</strong> hoặc <strong>Kata Containers</strong></td></tr>
</tbody>
</table>

<h2 id="practice">7. Practice Questions</h2>

<p><strong>Q1:</strong> A Kubernetes cluster uses containerd as the container runtime. A developer pushes a Docker image to Docker Hub. Can this image run on the cluster?</p>
<ul>
<li>A) No, Docker images are incompatible with containerd</li>
<li>B) Yes, because Docker images follow OCI Image Spec and are compatible ✓</li>
<li>C) Only if the cluster installs a Docker compatibility shim</li>
<li>D) No, containerd only supports images from CNCF registries</li>
</ul>
<p><em>Explanation: Docker images follow the OCI Image Specification, making them interoperable with any OCI-compliant runtime including containerd and CRI-O. The "Docker deprecated" refers to the runtime, not the image format.</em></p>

<p><strong>Q2:</strong> What is the primary purpose of the Container Runtime Interface (CRI)?</p>
<ul>
<li>A) Define image layer formats</li>
<li>B) Provide a gRPC API for kubelet to communicate with container runtimes ✓</li>
<li>C) Manage container image distribution between registries</li>
<li>D) Schedule containers across cluster nodes</li>
</ul>
<p><em>Explanation: CRI gives kubelet a stable API to interact with different runtimes (containerd, CRI-O) without knowing implementation details. This decoupling enables switching runtimes without changing kubelet code.</em></p>

<p><strong>Q3:</strong> Which container runtime provides VM-level isolation per container for high-security multi-tenant workloads?</p>
<ul>
<li>A) containerd</li>
<li>B) CRI-O</li>
<li>C) Kata Containers ✓</li>
<li>D) runc</li>
</ul>
<p><em>Explanation: Kata Containers runs each container inside a lightweight VM, providing stronger isolation than standard Linux namespace-based containers. gVisor provides user-space isolation via syscall interception, also strong but different approach.</em></p>
