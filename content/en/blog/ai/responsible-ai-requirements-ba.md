---
id: 02760001-ba01-4001-a004-000000000001
title: "Responsible AI Requirements: BA Writes Requirements for Safe AI Features"
slug: responsible-ai-requirements-ba
excerpt: >-
  Fairness, explainability, privacy, and human override aren't just buzzwords — they're real requirements BA must capture when building AI features. This guide teaches how to write Responsible AI requirements into BRD/SRS, verify with checklists, and align with frameworks like EU AI Act and NIST AI RMF.
featured_image: /images/blog/responsible-ai-requirements.webp
type: blog
reading_time: 11
view_count: 0
meta: null
published_at: '2026-05-05T11:00:00.000000Z'
created_at: '2026-05-05T11:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Responsible AI, slug: responsible-ai}, {name: AI Governance, slug: ai-governance}, {name: Requirements, slug: requirements}]
comments: []
---

BA often think Responsible AI is the job of AI team or Legal. But reality: **if BA doesn't capture these requirements in spec, dev won't build them either**. And when production has problems, the first question will be: "Is this in requirements?"

This guide helps BA know **what to write and capture** — no need to understand algorithms.

---

## 1. Four Pillars of Responsible AI BA Must Capture

### 1.1 Fairness

AI must not favor or discriminate based on sensitive attributes: gender, ethnicity, age, income.

**BA must capture:**
- Protected attributes in domain (e.g., Fintech → no discrimination by region/income bracket)
- How to measure fairness: demographic parity, equal opportunity, equalized odds
- Bias testing plan: test with diverse representative data

**Example requirement:**
> NFR-FAIR-01: Credit scoring model must achieve disparate impact ratio ≥ 0.8 across demographic groups when evaluated on test set. Results reported by Data Science team before go-live.

### 1.2 Explainability

Users and operators must understand *why* AI made that decision.

**BA must capture:**
- Do users have right to ask why? (Especially for high-stakes decisions)
- Explanation level: "AI recommends X because you previously..." vs "Your score is 720/1000"
- When full audit trail needed

**Example requirement:**
> REQ-EXPL-01: When AI denies a loan application, screen displays ≥3 specific reasons in plain language (not technical scores). Reasons logged to audit trail with timestamp.

### 1.3 Privacy

User data can't be used to train models without clear consent.

**BA must capture:**
- Which data types does AI use? Is PII/PHI anonymized?
- Is conversation history used for fine-tuning? If yes, what's the consent flow?
- Data retention: how long is conversation log kept?

**Example requirement:**
> REQ-PRIV-01: Conversation history only retained for product improvement after explicit user opt-in at onboarding. Default: opt-out. Logs deleted after 90 days unless opted-in.

### 1.4 Human Override

Users or operators must be able to override AI decisions in high-stakes situations.

**BA must capture:**
- Which AI decisions can happen automatically vs. require human approval
- Override mechanism: button, form, supervisor access
- Override logging: who, when, why

**Example requirement:**
> REQ-HUMAN-01: AI CANNOT automatically block accounts. When fraud risk > 0.9, AI only flags for Fraud Team review. Block action requires human confirmation.

---

## 2. Risk Level → Responsible AI Requirements

Not every AI feature needs the same level of safeguard. NIST AI RMF and EU AI Act categorize by risk:

| Risk Level | Example | Required Requirements |
|-----------|---------|----------------------|
| **Minimal** | AI email autocomplete | Basic: Don't store unnecessary PII |
| **Limited** | AI customer service chatbot | Transparency (disclose it's AI), data privacy |
| **High** | AI credit scoring, hiring | Full: Fairness test, explainability, audit trail, human oversight |
| **Unacceptable** | AI social scoring | Cannot build (EU AI Act prohibition) |

**Practice:** Before writing requirements, do AI Risk Assessment. Simple template:

| Question | Answer | Risk Points |
|----------|--------|------------|
| Does AI affect financial decisions? | Yes/No | +3 if Yes |
| Does AI use sensitive attributes? | Yes/No | +2 if Yes |
| Can AI decisions go unreviewed? | Yes/No | +2 if Yes |
| Can user be harmed if AI is wrong? | Yes/No | +3 if Yes |

Score ≥ 5 → High Risk → Full Responsible AI requirements needed.

---

## 3. Responsible AI Checklist for BA

```
FAIRNESS
☐ Identify protected attributes in domain
☐ Include bias testing in NFR section
☐ Define fairness metric (not just "fair")
☐ Who is responsible for bias testing?

EXPLAINABILITY
☐ Do users have right to know why?
☐ What explanation format? (technical or plain language)
☐ Audit trail requirements defined

PRIVACY
☐ Data minimization: AI only uses necessary data
☐ PII/PHI handling (anonymize, pseudonymize)
☐ Consent flow for AI training use
☐ Data retention period specified

HUMAN OVERRIDE
☐ List decisions requiring human approval
☐ Override mechanism designed
☐ Override logging requirements
☐ Escalation path defined

TRANSPARENCY
☐ Users know they're talking to AI (not person)
☐ AI limitations communicated clearly
```

---

## 4. Responsible AI Template for SRS

```markdown
## 5. Non-Functional Requirements: Responsible AI

### 5.1 Fairness Requirements
**NFR-FAIR-01:** [Feature] must be tested for bias...
**Test criteria:** Disparate impact ratio ≥ [threshold] on test set...
**Owner:** Data Science team
**Timing:** Before go-live and quarterly post-launch

### 5.2 Explainability Requirements
**REQ-EXPL-01:** When AI makes [decision type], UI displays...
**Format:** [plain text / structured list / score breakdown]
**Audit:** Log retained [N] days

### 5.3 Privacy Requirements
**REQ-PRIV-01:** Conversation/interaction data retained [N] days max...
**REQ-PRIV-02:** PII [masked/anonymized] before...

### 5.4 Human Override Requirements
**REQ-HUMAN-01:** Decisions AI CANNOT auto-execute:
  - [Decision 1]
  - [Decision 2]
**Override mechanism:** [UI/workflow description]
```

---

## 5. Responsible AI in Stakeholder Conversations

Questions BA should ask stakeholders when kicking off AI feature:

- "If AI gets it wrong and user is harmed, how does business take responsibility?"
- "Do our users need to know they're talking to AI? Do they want to know?"
- "Are there user groups at particular risk if AI fails?"
- "Has Legal/Compliance reviewed this use case?"
- "When we upgrade to a new model, who re-validates fairness/safety?"

---

## Summary

Responsible AI isn't the AI team's job — it's a **set of requirements BA captures** like any other. BA shouldn't skip this because it seems "technical."

Start with: risk assessment → identify required safeguards → write specific NFR with owner and test criteria. Don't write "system must be fair" — write "disparate impact ratio ≥ 0.8, tested by Data Science team before go-live".

This is the difference between a responsible BA and a negligent one.
