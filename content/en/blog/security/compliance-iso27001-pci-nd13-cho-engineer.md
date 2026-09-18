---
id: 019d0001-1008-7008-b008-000000000008
title: 'Compliance for Engineers: ISO 27001, SOC 2, PCI DSS v4 and Vietnam Decree 13'
slug: compliance-iso27001-pci-nd13-cho-engineer
excerpt: >-
  Engineers do not need to memorise every control, but they need to know how to
  map controls to the pipeline and generate evidence automatically. This is a
  short guide to four common frameworks and compliance-as-code in DevSecOps.
featured_image: /images/blog/compliance-engineer-featured.webp
type: blog
reading_time: 11
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
  - name: compliance
    slug: compliance
  - name: iso-27001
    slug: iso-27001
  - name: soc-2
    slug: soc-2
  - name: pci-dss
    slug: pci-dss
  - name: nghi-dinh-13
    slug: nghi-dinh-13
comments: []
locale: en
---
<blockquote>Compliance is not a slide deck for auditors. Done right, every control becomes an automated piece of the pipeline — and evidence is produced as a side effect of shipping software.</blockquote>

<h2 id="four-frameworks">Four common frameworks — what they really are</h2>
<table>
  <thead><tr><th>Framework</th><th>Goal</th><th>When it applies</th></tr></thead>
  <tbody>
    <tr><td>ISO/IEC 27001:2022</td><td>Information Security Management System (ISMS) — overall governance</td><td>Any organisation seeking an international cert in InfoSec governance</td></tr>
    <tr><td>SOC 2 (AICPA)</td><td>Trust Service Criteria (Security, Availability, Confidentiality, Processing Integrity, Privacy)</td><td>B2B SaaS in the US; often required by enterprise customers in RFPs</td></tr>
    <tr><td>PCI DSS v4.0</td><td>Protecting cardholder data</td><td>Anyone storing/processing/transmitting payment cards</td></tr>
    <tr><td>Vietnam Decree 13/2023/NĐ-CP</td><td>Personal data protection in Vietnam</td><td>Any organisation processing PII of Vietnamese citizens</td></tr>
  </tbody>
</table>

<h2 id="iso-27001">ISO 27001:2022 — what engineers should know</h2>
<p>The 2022 edition has 93 Annex A controls grouped into four themes: Organizational, People, Physical, Technological. Most "Technological" controls map directly to the DevSecOps pipeline:</p>
<ul>
  <li>A.8.8 Management of technical vulnerabilities → SCA + SBOM + Dependency-Track + fix SLA.</li>
  <li>A.8.25 Secure development life cycle → SDLC documentation, threat models, code review.</li>
  <li>A.8.28 Secure coding → SAST + linters + secure coding training.</li>
  <li>A.8.29 Security testing → DAST, periodic pentests, IR drills.</li>
  <li>A.8.32 Change management → branch protection, ticket-driven deploys, audit logs.</li>
</ul>
<p>You don't need to memorise control numbers, but you should know which of your tools serves which control so when an auditor asks, you can point straight at the dashboard or log.</p>

<h2 id="soc-2">SOC 2 Type II</h2>
<p>SOC 2 is not a "cert"; it is a CPA report. Type II matters more than Type I because it tests control effectiveness over a window (typically 6-12 months). Engineers must produce recurring evidence:</p>
<ul>
  <li>Quarterly access reviews: who has what, for how long.</li>
  <li>Change tickets tied to PRs/deploys: every production change is traceable to a request.</li>
  <li>Real backup tests (not just running backups).</li>
  <li>Vulnerability management report against SLAs.</li>
  <li>IR drill report (tabletop, post-mortem).</li>
</ul>
<p>Tip: use <strong>compliance automation</strong> (Vanta, Drata, Secureframe) to pull evidence from AWS/GCP, GitHub, Okta, MDM automatically — cutting manual collection effort by ~80%.</p>

<h2 id="pci-dss">PCI DSS v4.0 — common engineer blind spots</h2>
<ul>
  <li><strong>Scope minimization</strong>: tokenize and outsource to payment processors to shrink the Cardholder Data Environment (CDE), thereby reducing applicable controls.</li>
  <li><strong>Customised approach</strong> in v4: design your own controls if you meet the objectives — fits cloud-native, but requires detailed documentation.</li>
  <li><strong>MFA everywhere</strong>: required for all access to the CDE from 2025.</li>
  <li><strong>Targeted Risk Analysis</strong>: many v4 controls require a risk analysis to set review/test frequency.</li>
  <li><strong>Software security</strong>: Req 6 expands to require an inventory of bespoke + custom software (≈ SBOM for internal code).</li>
</ul>

<h2 id="nd-13">Vietnam Decree 13/2023/NĐ-CP and the Personal Data Law</h2>
<p>Engineer essentials:</p>
<ul>
  <li><strong>Classification</strong>: basic personal data and <em>sensitive</em> data (health, biometrics, political views, religion, finance, location, criminal history…). Different controls apply.</li>
  <li><strong>Data Processing Impact Assessment</strong> (analogous to DPIA): mandatory for high-scale/high-sensitivity systems, must be filed.</li>
  <li><strong>Consent</strong> must be explicit, revocable, not bundled with other terms.</li>
  <li><strong>72-hour breach notification</strong> from the moment you become aware, sent to A05 (Ministry of Public Security).</li>
  <li><strong>Cross-border transfer</strong>: requires assessment dossier; certain data classes must be stored in Vietnam for the regulated period.</li>
</ul>
<p>Mapping to engineering:</p>
<ul>
  <li>Data classification tags in the database and data catalog.</li>
  <li>Pseudonymization/encryption on sensitive columns + key management via KMS.</li>
  <li>Audit logs for sensitive data access, retention per policy.</li>
  <li>72h breach runbook: detect → triage → notify → record.</li>
  <li>DPIA template triggered by a feature toggle when new PII is introduced.</li>
</ul>

<h2 id="cac">Compliance-as-code: evidence from the pipeline</h2>
<p>Instead of collecting evidence manually at audit time, generate it as pipeline artifacts:</p>
<ul>
  <li>Branch protection screenshots → exported via the GitHub API monthly into an evidence bucket.</li>
  <li>Each deploy carries a change ticket id and sign-off → query Loki/CloudTrail to auto-build the report.</li>
  <li>Access reviews automatically dump IAM, Okta groups, K8s RBAC → diff against HRIS to find orphan accounts.</li>
  <li>Backup verification jobs actually restore into ephemeral environments and compare checksums weekly.</li>
  <li>Vulnerability dashboards from Dependency-Track + DefectDojo are direct "exhibits".</li>
</ul>

<h2 id="control-mapping">Sample control mapping — one row of evidence</h2>
<table>
  <thead><tr><th>Control</th><th>Tool</th><th>Evidence file</th><th>Cadence</th></tr></thead>
  <tbody>
    <tr><td>ISO A.8.8 / SOC2 CC7.1</td><td>Trivy + Dependency-Track</td><td>monthly-vuln-report.pdf</td><td>Monthly</td></tr>
    <tr><td>ISO A.8.32 / SOC2 CC8.1</td><td>GitHub branch protection</td><td>branch-protection.json</td><td>Quarterly</td></tr>
    <tr><td>PCI Req 8 / SOC2 CC6.1</td><td>Okta + IdP report</td><td>access-review-Q&lt;n&gt;.csv</td><td>Quarterly</td></tr>
    <tr><td>Decree 13 Art.25</td><td>Audit log query</td><td>pii-access-log-monthly.json</td><td>Monthly</td></tr>
  </tbody>
</table>

<h2 id="conclusion">Conclusion</h2>
<p>Compliance is an opportunity to invest in systems, not a once-a-year event. When you know which framework applies, map it to technical controls, and generate evidence automatically, audit season becomes mostly report exports. More importantly: the system actually becomes safer — which is the goal DevSecOps was set up to pursue.</p>
