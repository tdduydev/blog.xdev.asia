---
id: 019d0001-1005-7005-b005-000000000005
title: 'Kubernetes Admission Policy & Runtime Defense với Kyverno và Falco'
slug: kubernetes-admission-policy-kyverno-falco
excerpt: >-
  Image scan tĩnh không bắt được hành vi bất thường khi container đang chạy.
  Kết hợp admission policy (Kyverno) chặn workload không tuân thủ và runtime
  monitor (Falco) để phát hiện shell-in-container, lateral movement.
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
  name: Bảo mật
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
---
<blockquote>Image scan và threat model bảo vệ trước khi deploy. Admission policy bảo vệ tại moment of truth khi workload vào cluster. Runtime monitor là camera giám sát cho mọi việc xảy ra sau đó.</blockquote>

<h2 id="ba-lop-bao-ve">Ba lớp bảo vệ trong cluster</h2>
<table>
  <thead><tr><th>Lớp</th><th>Vai trò</th><th>Tool</th></tr></thead>
  <tbody>
    <tr><td>Pre-admission</td><td>Lint, scan image, sign verify</td><td>Trivy, Cosign</td></tr>
    <tr><td>Admission</td><td>Chặn workload vi phạm policy</td><td>Kyverno, OPA Gatekeeper</td></tr>
    <tr><td>Runtime</td><td>Phát hiện hành vi bất thường, network policy</td><td>Falco, Cilium Tetragon, NetworkPolicy</td></tr>
  </tbody>
</table>

<h2 id="kyverno-vs-opa">Kyverno vs OPA Gatekeeper — chọn cái nào?</h2>
<ul>
  <li><strong>Kyverno</strong>: viết policy bằng YAML thuần, ngắn, dễ học. Hỗ trợ mutate, generate, verifyImages keyless. Phù hợp đa số trường hợp.</li>
  <li><strong>OPA Gatekeeper</strong>: viết bằng Rego, mạnh cho logic phức tạp. Phù hợp khi đã có hệ sinh thái OPA (API gateway, microservice authz).</li>
</ul>
<p>Khuyến nghị: bắt đầu Kyverno cho cluster mới. Migration giữa hai cái sau này không quá khó vì policy chính là declarative.</p>

<h2 id="baseline-policy">Baseline policy nên có</h2>
<ol>
  <li>Apply <strong>Pod Security Standards: restricted</strong> ở namespace ứng dụng.</li>
  <li>Chặn pod chạy với <code>privileged: true</code>, <code>hostNetwork</code>, <code>hostPID</code>.</li>
  <li>Yêu cầu image từ registry nội bộ (allowlist).</li>
  <li>Yêu cầu <code>resources.requests/limits</code> cho mọi container.</li>
  <li>Yêu cầu label chuẩn (team, env, cost-center) cho cost tracking và IR.</li>
  <li>Verify Cosign signature trên image production.</li>
</ol>

<h2 id="audit-truoc-enforce">Triển khai an toàn: Audit → Fix → Enforce</h2>
<p>Đừng bao giờ apply <code>validationFailureAction: Enforce</code> ngay lập tức trên cluster đang chạy. Quy trình tham khảo:</p>
<ol>
  <li>Apply policy với <code>validationFailureAction: Audit</code>.</li>
  <li>Đo violation qua Kyverno PolicyReport CRD trong 1-2 tuần.</li>
  <li>Tạo ticket fix cho từng workload vi phạm, có owner.</li>
  <li>Khi violation = 0 trên môi trường staging, đổi sang Enforce ở dev → staging → prod.</li>
</ol>
<p>Có quy trình exception rõ ràng: workload đặc biệt (vd: privileged debug pod) phải có annotation lý do, hết hạn, owner.</p>

<h2 id="network-policy-default-deny">Network policy default-deny</h2>
<p>Mỗi namespace ứng dụng nên bắt đầu với một policy "deny all", sau đó mở dần theo nhu cầu thật:</p>
<pre><code class="language-yaml">apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: payments
spec:
  podSelector: {}
  policyTypes: ["Ingress", "Egress"]
</code></pre>
<p>Sau đó mở từng kết nối cần: app → DB, app → service mesh, egress đến API external qua egress gateway. Với <strong>Cilium</strong>, có thể policy ở L7 (HTTP path, gRPC method, Kafka topic) — mạnh hơn nhiều so với chỉ port/IP.</p>

<h2 id="falco-runtime-detection">Falco: runtime detection cho container</h2>
<p>Falco hook vào kernel (eBPF hoặc kernel module) để quan sát syscall. Một số rule giá trị nhất:</p>
<ul>
  <li><strong>Shell trong container</strong>: <code>shell_in_container</code>. Production hiếm khi có lý do hợp lệ để có shell.</li>
  <li><strong>Sửa file binary</strong> trong runtime image (sign of compromise).</li>
  <li><strong>Outbound connection bất thường</strong> tới IP/domain ngoài allowlist.</li>
  <li><strong>Đọc file nhạy cảm</strong> như <code>/etc/shadow</code>, kubeconfig.</li>
  <li><strong>Mount sensitive path</strong> như <code>/var/run/docker.sock</code>, <code>/proc</code>.</li>
</ul>
<p>Stream Falco event sang Slack/PagerDuty cho rule severity cao và sang SIEM cho phân tích sau.</p>

<h2 id="cilium-tetragon">Cilium Tetragon: hardware-assisted, low-overhead</h2>
<p>Tetragon dùng eBPF tương tự nhưng tối ưu hiệu năng cho cluster lớn, có thể <strong>enforce</strong> chứ không chỉ detect (vd: kill process khi syscall vi phạm). Phù hợp khi cần in-kernel response time.</p>

<h2 id="khi-co-alert">Khi alert kêu — workflow IR ngắn</h2>
<ol>
  <li>Triage trong 15 phút: phân loại true/false positive theo severity.</li>
  <li>Cô lập pod bằng <code>NetworkPolicy</code> chặn egress, KHÔNG xoá ngay (mất evidence).</li>
  <li>Lấy snapshot: <code>kubectl debug</code>, dump memory, copy log, xuất audit trail.</li>
  <li>Rotate credential mà pod có thể đã chạm: ServiceAccount token, secret mount.</li>
  <li>Sau khi điều tra: viết post-mortem blameless, thêm Falco rule mới nếu cần.</li>
</ol>

<h2 id="ket-luan">Kết luận</h2>
<p>Bảo vệ Kubernetes không phải chỉ là RBAC và firewall. Cần ba lớp: pre-admission (image scan, sign), admission (Kyverno), runtime (Falco/Tetragon, NetworkPolicy). Bắt đầu với baseline policy ở chế độ audit, dần enforce, kết hợp Falco với SIEM — đó là cấu hình đủ chắc cho phần lớn cluster production năm 2026.</p>
