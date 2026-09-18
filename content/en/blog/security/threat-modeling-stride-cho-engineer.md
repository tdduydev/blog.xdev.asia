---
id: 019d0001-1002-7002-b002-000000000002
title: 'Pragmatic Threat Modeling: STRIDE on a DFD in 60 Minutes'
slug: threat-modeling-stride-cho-engineer
excerpt: >-
  A threat model does not need to be a 50-page document. A 60-minute session
  with a level-1 DFD, STRIDE and a risk register is enough to avoid the design
  flaws that show up repeatedly in audits and pentests.
featured_image: /images/blog/threat-modeling-stride-featured.webp
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
  - name: threat-modeling
    slug: threat-modeling
  - name: stride
    slug: stride
  - name: secure-design
    slug: secure-design
comments: []
locale: en
---
<blockquote>Most serious vulnerabilities originate at design time, not coding. A lightweight threat model done early, with a clear owner, is worth more than a 100-page pentest report after go-live.</blockquote>

<h2 id="what-is-threat-model">What is a threat model?</h2>
<p>Threat modeling is the process of answering Adam Shostack's four questions:</p>
<ol>
  <li><strong>What are we working on?</strong> — Draw a data flow diagram (DFD).</li>
  <li><strong>What can go wrong?</strong> — Apply STRIDE to enumerate threats.</li>
  <li><strong>What are we going to do about it?</strong> — Mitigation or accepted risk with a clear owner.</li>
  <li><strong>Did we do a good job?</strong> — Review after implementation.</li>
</ol>

<h2 id="stride-in-a-minute">STRIDE in one minute</h2>
<table>
  <thead><tr><th>Threat</th><th>Property violated</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>Spoofing</td><td>Authentication</td><td>Identity impersonation, token reuse</td></tr>
    <tr><td>Tampering</td><td>Integrity</td><td>Modifying requests or DB rows</td></tr>
    <tr><td>Repudiation</td><td>Non-repudiation</td><td>No audit trail to prove an action</td></tr>
    <tr><td>Information disclosure</td><td>Confidentiality</td><td>PII or keys leaking through logs</td></tr>
    <tr><td>Denial of service</td><td>Availability</td><td>Brute force, slowloris, expensive queries</td></tr>
    <tr><td>Elevation of privilege</td><td>Authorization</td><td>IDOR, sandbox escape, container break-out</td></tr>
  </tbody>
</table>

<h2 id="dfd-right-level">Drawing a DFD at the right level</h2>
<p>Four element types belong on a DFD:</p>
<ul>
  <li><strong>External entity</strong>: user, third-party API.</li>
  <li><strong>Process</strong>: service, function.</li>
  <li><strong>Data store</strong>: DB, S3, queue.</li>
  <li><strong>Data flow</strong>: arrow between elements.</li>
</ul>
<p>The most important concept is the <strong>trust boundary</strong>: the line between zones of differing trust (Internet ↔ web tier, app ↔ DB, tenant A ↔ tenant B). Every arrow that crosses a trust boundary needs authentication, validation and encryption.</p>
<p>Start at DFD level 1 (one service plus immediate dependencies). Avoid generic level 0 or going as deep as level 3 — it costs time without changing decisions.</p>

<h2 id="apply-stride-per-element">Apply STRIDE to each element</h2>
<p>A practical trick: for each element on the DFD, ask the six STRIDE questions. You don't need a threat in every cell — skip when it makes no sense. Capture in a table:</p>
<pre><code>| Element        | Threat | Description                                | Mitigation             | Owner | Severity |
| -------------- | ------ | ------------------------------------------ | ---------------------- | ----- | -------- |
| Login endpoint | S      | Credential brute force                     | Rate limit + MFA       | @team | High     |
| Login endpoint | I      | User enumeration via error message         | Generic error message  | @team | Medium   |
| Upload service | T      | File replace race on object storage        | Versioning + checksum  | @team | Medium   |
| Order DB       | E      | IDOR on /orders/{id}                       | Owner-scoped authz     | @team | High     |
</code></pre>

<h2 id="risk-scoring">Scoring risk</h2>
<ul>
  <li><strong>CVSS v3.1/v4</strong>: industry standard, ideal for concrete vulnerabilities, with a sharable vector string.</li>
  <li><strong>OWASP Risk Rating</strong>: simple (Likelihood × Impact), easy to explain to non-technical stakeholders.</li>
</ul>
<p>Pick one method and document it. Don't let each team invent its own — comparison becomes impossible.</p>

<h2 id="risk-register-living">The risk register is a living asset</h2>
<ul>
  <li>Each risk has an owner.</li>
  <li>Each risk has a mitigation deadline or a recorded reason for accepting it.</li>
  <li>Reviewed each quarter and after major architecture changes.</li>
  <li>Linked to the issue tracker so mitigations are real tickets.</li>
</ul>

<h2 id="when-linddun-pasta">When to use LINDDUN or PASTA</h2>
<ul>
  <li><strong>LINDDUN</strong> when the service handles a lot of PII/PHI and you need privacy-focused threat modeling.</li>
  <li><strong>PASTA</strong> when threats need tight alignment with business risk via a formal 7-stage process — fits critical systems (banking, healthcare).</li>
</ul>

<h2 id="conclusion">Conclusion</h2>
<p>Threat modeling is not magic. A 60-minute session with a level-1 DFD, a STRIDE checklist and a risk register is enough to keep a service free of common design flaws. Repeat it on a cadence, give it owners, link it to ADRs — that is how threat modeling becomes a habit instead of a yearly event.</p>
