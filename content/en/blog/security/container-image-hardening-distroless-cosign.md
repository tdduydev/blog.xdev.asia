---
id: 019d0001-1004-7004-b004-000000000004
title: 'Container Image Hardening: Distroless, Multi-Stage and Cosign Signing'
slug: container-image-hardening-distroless-cosign
excerpt: >-
  A good production image is small, non-root, has no shell, is scanned and is
  signed. This article covers Docker/OCI image hardening techniques together
  with a Cosign keyless signing workflow using GitHub OIDC.
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
  name: Security
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
locale: en
---
<blockquote>Every extra byte in a runtime image is an extra byte of attack surface. An ideal production image contains only the application binary, a few shared libraries, no shell, no package manager — and must be signed so the cluster can trust it.</blockquote>

<h2 id="multi-stage">Multi-stage builds and distroless base images</h2>
<p>Reference pattern for a Go application:</p>
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
<p>Benefits:</p>
<ul>
  <li>Runtime image &lt;20 MB, no <code>sh</code>, <code>apt</code>, <code>curl</code>.</li>
  <li>Once an attacker reaches RCE, there are no tools to escalate or download a payload.</li>
  <li>OS-level CVE count drops to near zero, reducing scan noise.</li>
</ul>
<p>For Node.js/Python: use <strong>Chainguard Images</strong>, <strong>distroless/nodejs</strong>, <strong>distroless/python3</strong>. Avoid <code>:latest</code>; always pin by digest <code>@sha256:...</code>.</p>

<h2 id="non-root-readonly">Non-root, read-only filesystem, dropped capabilities</h2>
<p>In Kubernetes:</p>
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
<p>This is the baseline of the <strong>Pod Security Standards: restricted</strong> profile. If the app needs to write files (cache, tmp), mount an <code>emptyDir</code> at that path instead of opening the rootfs.</p>

<h2 id="scan-image">Scan images with Trivy/Grype</h2>
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
<p><code>ignore-unfixed: true</code> avoids breaking builds for CVEs without a fix yet — but they still appear in the report for tracking.</p>

<h2 id="cosign-keyless">Cosign keyless: signing without managing private keys</h2>
<p>Cosign keyless relies on an OIDC identity (GitHub Actions, Google, ...) and a short-lived certificate issued by Fulcio. Workflow:</p>
<pre><code class="language-yaml">permissions:
  id-token: write   # for OIDC
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
<p>Verification entries are stored permanently on the <strong>Rekor</strong> transparency log. There is no private key to store or rotate.</p>

<h2 id="verify-deploy">Verify before deploy with Kyverno</h2>
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
<p>Pods are admitted only if the image carries a signature from the right repo + workflow + branch. This is a key building block of supply chain security (SLSA L2-L3).</p>

<h2 id="checklist">Production image checklist</h2>
<ul>
  <li>Multi-stage build, distroless/Chainguard base, pinned by digest.</li>
  <li>Non-root USER, drop ALL capabilities, readOnlyRootFilesystem.</li>
  <li>No <code>curl</code>, <code>wget</code>, <code>bash</code> in the runtime stage.</li>
  <li>Scanned by Trivy/Grype, build fails on CRITICAL/HIGH with available fix.</li>
  <li>Signed keyless with Cosign + SBOM CycloneDX attached.</li>
  <li>Cluster has Kyverno verifyImages blocking unsigned images.</li>
  <li>Clear HEALTHCHECK + EXPOSE; no unused ports exposed.</li>
</ul>

<h2 id="conclusion">Conclusion</h2>
<p>Image hardening is one of the highest-ROI investments in DevSecOps: small effort, big reduction in both attack surface and alert fatigue. Once the distroless + non-root + Cosign keyless pattern is internalised, every new service inherits a strong baseline almost for free — and you can confidently turn on admission policies that block non-compliant pods cluster-wide.</p>
