---
id: 019d0001-1004-7004-b004-000000000004
title: 'Container image hardening: distroless, multi-stage và sign với Cosign'
slug: container-image-hardening-distroless-cosign
excerpt: >-
  Một image production tốt phải nhỏ, không root, không shell, được scan và sign.
  Bài viết tổng hợp kỹ thuật hardening Docker/OCI image kèm workflow ký Cosign
  keyless với OIDC GitHub.
featured_image: /images/blog/container-hardening-cosign-featured.webp
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
  name: Bảo mật
  slug: security
tags:
  - name: devsecops
    slug: devsecops
  - name: container-security
    slug: container-security
  - name: docker
    slug: docker
  - name: cosign
    slug: cosign
  - name: sigstore
    slug: sigstore
comments: []
---
<blockquote>Mỗi byte thừa trong image runtime là một byte attack surface. Một image production lý tưởng chỉ chứa binary ứng dụng, vài shared lib, không shell, không package manager — và phải được ký để cluster tin cậy.</blockquote>

<h2 id="multi-stage-build">Multi-stage build và base image distroless</h2>
<p>Pattern tham khảo cho ứng dụng Go:</p>
<pre><code class="language-dockerfile">FROM golang:1.23 AS build
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o /out/app ./cmd/server

FROM gcr.io/distroless/static-debian12:nonroot
COPY --from=build /out/app /app
USER nonroot:nonroot
ENTRYPOINT ["/app"]
</code></pre>
<p>Lợi ích:</p>
<ul>
  <li>Image runtime &lt;20 MB, không có <code>sh</code>, <code>apt</code>, <code>curl</code>.</li>
  <li>Khi attacker đạt RCE, không có công cụ để escalate hoặc download payload.</li>
  <li>Số CVE OS-level gần như bằng 0, giảm noise scan.</li>
</ul>
<p>Với Node.js/Python: dùng <strong>Chainguard Images</strong>, <strong>distroless/nodejs</strong>, <strong>distroless/python3</strong>. Tránh <code>:latest</code>, luôn pin theo digest <code>@sha256:...</code>.</p>

<h2 id="non-root-readonly-caps">Non-root, read-only filesystem, drop capabilities</h2>
<p>Trong Kubernetes:</p>
<pre><code class="language-yaml">securityContext:
  runAsNonRoot: true
  runAsUser: 65532
  readOnlyRootFilesystem: true
  allowPrivilegeEscalation: false
  capabilities:
    drop: ["ALL"]
  seccompProfile:
    type: RuntimeDefault
</code></pre>
<p>Đây cũng là baseline của <strong>Pod Security Standards: restricted</strong> profile. Nếu app cần ghi file (cache, tmp), mount <code>emptyDir</code> chỉ vào path đó thay vì mở rootfs.</p>

<h2 id="scan-image-trivy-grype">Scan image với Trivy/Grype</h2>
<pre><code class="language-yaml">- name: Build
  run: docker build -t ghcr.io/org/app:${{ github.sha }} .

- name: Scan image
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: ghcr.io/org/app:${{ github.sha }}
    severity: CRITICAL,HIGH
    exit-code: 1
    ignore-unfixed: true
</code></pre>
<p><code>ignore-unfixed: true</code> tránh fail build vì CVE chưa có fix — nhưng vẫn ghi vào báo cáo để theo dõi.</p>

<h2 id="cosign-keyless-sign">Cosign keyless: sign mà không quản lý private key</h2>
<p>Cosign keyless dựa vào OIDC identity (GitHub Actions, Google, ...) và short-lived cert do Fulcio cấp. Workflow:</p>
<pre><code class="language-yaml">permissions:
  id-token: write   # cho OIDC
  contents: read
  packages: write

- uses: sigstore/cosign-installer@v3
- name: Sign image
  env:
    COSIGN_EXPERIMENTAL: "true"
  run: cosign sign --yes ghcr.io/org/app@${{ steps.push.outputs.digest }}

- name: Attach SBOM as attestation
  run: |
    syft ghcr.io/org/app@${{ steps.push.outputs.digest }} -o cyclonedx-json > sbom.json
    cosign attest --yes --predicate sbom.json --type cyclonedx \
      ghcr.io/org/app@${{ steps.push.outputs.digest }}
</code></pre>
<p>Verification log lưu vĩnh viễn trên <strong>Rekor</strong> transparency log. Không có private key cần lưu/rotate.</p>

<h2 id="verify-truoc-deploy">Verify trước deploy với Kyverno</h2>
<pre><code class="language-yaml">apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: verify-image-signature
spec:
  validationFailureAction: Enforce
  rules:
  - name: check-cosign-signature
    match:
      any:
      - resources:
          kinds: ["Pod"]
    verifyImages:
    - imageReferences: ["ghcr.io/org/*"]
      attestors:
      - entries:
        - keyless:
            subject: "https://github.com/org/repo/.github/workflows/build.yml@refs/heads/main"
            issuer: "https://token.actions.githubusercontent.com"
</code></pre>
<p>Pod chỉ được tạo nếu image có signature từ đúng repo + workflow + branch. Đây là một mảnh chốt của supply chain security (SLSA L2-L3).</p>

<h2 id="checklist-image-production">Checklist image production</h2>
<ul>
  <li>Multi-stage, base image distroless/Chainguard, pin digest.</li>
  <li>USER non-root, drop ALL caps, readOnlyRootFilesystem.</li>
  <li>Không cài <code>curl</code>, <code>wget</code>, <code>bash</code> trong runtime stage.</li>
  <li>Quét bằng Trivy/Grype, fail build với CRITICAL/HIGH có fix.</li>
  <li>Sign keyless bằng Cosign + attach SBOM CycloneDX.</li>
  <li>Cluster có Kyverno verifyImages chặn image không signed.</li>
  <li>HEALTHCHECK + EXPOSE rõ ràng, không expose port không dùng.</li>
</ul>

<h2 id="ket-luan">Kết luận</h2>
<p>Hardening image là một trong những đầu tư có ROI cao nhất trong DevSecOps: ít công, giảm cả attack surface lẫn alert fatigue. Khi đã quen với pattern distroless + nonroot + Cosign keyless, mỗi service mới gần như miễn phí có baseline tốt — và bạn có thể tự tin bật admission policy chặn pod không tuân thủ trên toàn cluster.</p>
