---
id: 019d0001-1007-7007-b007-000000000007
title: 'Detection Engineering & Incident Response in DevSecOps'
slug: incident-response-detection-engineering-devsecops
excerpt: >-
  Strong defense needs three things: structured logs, ATT&CK-mapped detection
  rules and rehearsed IR runbooks. This article summarises how to build a
  detection-as-code program and blameless post-mortems for DevSecOps teams.
featured_image: /images/blog/detection-ir-devsecops-featured.webp
type: blog
reading_time: 10
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
  - name: detection-engineering
    slug: detection-engineering
  - name: sigma
    slug: sigma
  - name: mitre-attack
    slug: mitre-attack
  - name: incident-response
    slug: incident-response
comments: []
locale: en
---
<blockquote>Having logs is not having detection. Having alerts is not having response. Detection engineering is the discipline of turning raw events into actionable signals with owners, MTTD and MTTR you can measure.</blockquote>

<h2 id="logging-first">Logging before detection</h2>
<p>Unstructured logs do not scale. Four principles:</p>
<ul>
  <li><strong>Structured JSON</strong> with standard fields: <code>timestamp</code>, <code>service</code>, <code>env</code>, <code>request_id</code>, <code>user_id</code> (hashed/redacted), <code>action</code>, <code>result</code>.</li>
  <li><strong>Correlation IDs</strong> propagated across services, gateways, queues — use W3C Trace Context.</li>
  <li><strong>Never log raw secrets/PII.</strong> Redact in a shared SDK before stdout.</li>
  <li><strong>Separate audit logs</strong> for sensitive actions (admin actions, key access, data exports) — different schema, longer retention (12-36 months).</li>
</ul>

<h2 id="log-sources">Log sources to stream into the SIEM</h2>
<table>
  <thead><tr><th>Source</th><th>Detection value</th></tr></thead>
  <tbody>
    <tr><td>Cloud audit (CloudTrail, Activity Log)</td><td>Unusual IAM, key creation, foreign region</td></tr>
    <tr><td>K8s audit log (Metadata level)</td><td>RBAC change, exec into pod, secret access</td></tr>
    <tr><td>Identity provider (Okta, Azure AD)</td><td>Brute force, impossible travel, MFA bypass</td></tr>
    <tr><td>Application audit log</td><td>Privilege escalation, large data export</td></tr>
    <tr><td>Falco / Tetragon</td><td>Container runtime behavior</td></tr>
    <tr><td>WAF, CDN, gateway</td><td>Brute force, scraping, anomalies</td></tr>
  </tbody>
</table>

<h2 id="sigma">Sigma: detection-as-code</h2>
<p>Sigma is a YAML format for SIEM-agnostic detection rules (convertible to Splunk SPL, ELK Lucene, Sentinel KQL, ...). Example:</p>
<pre><code class="language-yaml">title: K8s exec into production pod
id: 1f0e3aa8-...
status: stable
logsource:
  product: kubernetes
  service: audit
detection:
  selection:
    verb: create
    objectRef.subresource: exec
    objectRef.namespace|startswith: prod-
  condition: selection
level: high
tags:
  - attack.execution
  - attack.t1609   # container administration command
</code></pre>
<p>Store rules in git, review through PRs, with CI tests (positive/negative cases). That is <strong>detection-as-code</strong>.</p>

<h2 id="map-attack">Map to MITRE ATT&CK</h2>
<p>ATT&CK breaks attacker behavior into tactics (goals) and techniques (means). Mapping detections to ATT&CK gives you:</p>
<ul>
  <li>Visibility into where you lack coverage (e.g., strong on Initial Access, weak on Lateral Movement, Exfiltration).</li>
  <li>Alignment with threat intel: what techniques are targeting your industry — prioritise detections accordingly.</li>
  <li>Clear coverage reporting for leadership: "65% of techniques relevant to our stack are covered".</li>
</ul>

<h2 id="ir-runbook">IR runbooks and tabletop exercises</h2>
<p>NIST PICERL: Preparation → Identification → Containment → Eradication → Recovery → Lessons learned. Each runbook should have:</p>
<ul>
  <li><strong>Severity matrix</strong> with SLAs (SEV1/2/3).</li>
  <li>Clear <strong>on-call rotation</strong> and escalation path.</li>
  <li><strong>Communication templates</strong>: status page, customer notice, regulator notice (Vietnam Decree 13 requires 72h).</li>
  <li><strong>Evidence preservation</strong>: snapshot disks/memory, copy logs, export audit trails — BEFORE deleting/restoring.</li>
  <li><strong>Containment playbooks</strong> per incident type: secret leak, account compromise, ransomware, data exfil.</li>
</ul>
<p>Run a tabletop exercise 1-2 times per quarter, 60-90 minutes each, with one realistic scenario. Measure MTTD, MTTC and MTTR.</p>

<h2 id="blameless">Blameless post-mortem</h2>
<p>The goal is not to find someone to blame but to find the <em>system conditions</em> that allowed the incident. A reference template:</p>
<ul>
  <li><strong>Summary</strong> (3-5 lines).</li>
  <li><strong>Timeline</strong>: who did what, when (UTC).</li>
  <li><strong>Impact</strong>: users, data, financial.</li>
  <li><strong>Root cause</strong>: usually multiple contributing factors, not one.</li>
  <li><strong>What went well</strong>: acknowledge what worked to reinforce it.</li>
  <li><strong>Action items</strong>: with owners and realistic deadlines, in the sprint backlog.</li>
</ul>
<p>Blameless culture must be protected by leadership — if reporters get punished, no one will share honestly next time.</p>

<h2 id="bug-bounty">Bug bounty and purple team</h2>
<ul>
  <li><strong>Responsible disclosure</strong> via <code>security.txt</code> + <code>security@</code> email: cheap, free.</li>
  <li><strong>Bug bounty</strong> on HackerOne/Intigriti or local platforms: clear scope, clear payouts.</li>
  <li><strong>Purple team exercises</strong>: red team runs one technique, blue team measures whether it gets detected, then both tune the rule together. Cross-learning, no scoreboard.</li>
</ul>

<h2 id="metrics">Metrics to track</h2>
<ul>
  <li>MTTD by incident type.</li>
  <li>Vuln MTTR by severity and SLA hit rate.</li>
  <li>Alert true-positive rate (to prevent fatigue).</li>
  <li>ATT&CK coverage by tactic.</li>
  <li>Tabletop frequency, % of action items closed on time.</li>
</ul>

<h2 id="conclusion">Conclusion</h2>
<p>Detection engineering and IR are where DevSecOps meets the SOC. Treat rules as code (Sigma + git + CI), runbooks as products (review, version, measure MTTR), and protect the blameless culture. Then every incident becomes fuel for system improvement instead of a panic event.</p>
