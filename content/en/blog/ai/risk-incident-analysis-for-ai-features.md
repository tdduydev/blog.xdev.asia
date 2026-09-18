---
id: 02760001-ba01-4001-a003-000000000012
title: "Risk & Incident Analysis for BA: Analyzing AI Feature Risk and Responding to Incidents"
slug: risk-incident-analysis-for-ai-features
excerpt: >-
  AI features have a completely different risk profile from regular features:
  model drift, data poisoning, hallucination cascades, and bias amplification.
  BAs need a proper Risk Register, an incident response plan, and a post-mortem
  template specifically designed for AI incidents.
featured_image: /images/blog/risk-incident-analysis.webp
type: blog
reading_time: 13
view_count: 0
meta: null
published_at: '2026-05-05T15:30:00.000000Z'
created_at: '2026-05-05T15:30:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Risk Management, slug: risk-management}, {name: Incident Response, slug: incident-response}, {name: AI, slug: ai}]
comments: []
---

When an AI feature has an incident, you can't debug it like a regular bug. "The model returned the wrong result" could be caused by: changed data quality, prompt injection, distribution shift, or an infrastructure issue. BA needs to know how to analyze each type.

---

## 1. AI-specific Risk Categories

### 1.1 Risk Taxonomy for AI Features

| Category | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| **Model** | Accuracy degradation (drift) | Medium | High | Monthly evaluation, drift detector |
| **Model** | Hallucination in high-stakes context | Medium | Very High | Human review threshold, citation requirement |
| **Data** | Training data poisoning | Low | Very High | Data provenance audit, anomaly detection |
| **Data** | PII leak via model output | Low | Very High | Output scanning, PII masking |
| **Bias** | Discriminatory output | Medium | High | Regular bias audit, diverse test set |
| **Operations** | Model unavailability (API down) | Medium | Medium | Fallback to rule-based, retry logic |
| **Security** | Prompt injection attack | Medium | High | Input sanitization, system prompt locking |

### 1.2 AI Risk Score Formula

```
Risk Score = Probability × Impact × Detection Difficulty

Probability: 1 (rare) → 5 (frequent)
Impact: 1 (minor) → 5 (critical/legal)
Detection: 1 (easy) → 5 (very hard to detect)

Score ≥ 30: Critical — need immediate mitigation plan
Score 15-29: High — need mitigation before go-live
Score < 15: Medium/Low — monitor, review quarterly
```

---

## 2. AI Risk Register Template

```markdown
## AI Risk Register — [Product/Feature]
**Last Updated:** YYYY-MM-DD | **Owner:** [BA Name]

| ID | Risk | Category | Probability | Impact | Detection | Score | Status | Mitigation | Owner |
|----|------|----------|-------------|--------|-----------|-------|--------|------------|-------|
| R001 | Model drift after 3 months | Model | 3 | 4 | 3 | **36** | 🔴 Critical | Monthly eval + alert | ML Eng |
| R002 | Hallucination in medical context | Model | 3 | 5 | 4 | **60** | 🔴 Critical | Mandatory human review + citation | BA + QA |
| R003 | PII in AI output | Data | 2 | 5 | 3 | **30** | 🔴 Critical | Output scanner pre-delivery | Security |
| R004 | API provider outage | Operations | 3 | 3 | 1 | **9** | 🟡 Medium | Fallback flow + timeout handling | Dev |
```

---

## 3. Incident Classification for AI

Not every "AI got it wrong" is an incident. BA needs to define:

### Severity Levels

| Severity | Definition | Example | Response Time |
|---|---|---|---|
| **P0 — Critical** | AI causes direct harm, data breach, or drives an incorrect legal decision | AI approves the wrong loan, PII leak | < 15 minutes |
| **P1 — High** | AI is non-functional or accuracy drops > 20% | Chatbot gives nonsensical answers, classifier fails | < 1 hour |
| **P2 — Medium** | Accuracy drops 10–20%, some user impact | Recall drops from 90% to 75% | < 4 hours |
| **P3 — Low** | Minor inconsistency, edge case issue | Some edge cases handled imperfectly | Next sprint |

---

## 4. Incident Response Process for AI

```
[Incident Detected]
(by: monitor alert / user complaint / agent escalation)
        ↓
[BA confirms severity within 15 minutes]
├── P0/P1: Activate incident response team
│   ├── Notify: stakeholders + legal (if needed)
│   ├── Action: Feature flag OFF or rollback
│   └── War room: BA + ML Eng + PM
└── P2/P3: Normal sprint process + tracking
        ↓
[Root Cause Analysis — 4 types to check]
1. Model issue (drift, retrain needed?)
2. Data issue (input distribution changed?)
3. Infrastructure issue (API error rate increased?)
4. Adversarial (prompt injection, abuse?)
        ↓
[Mitigation + Fix]
        ↓
[Post-mortem within 48h (P0/P1)]
```

---

## 5. AI Incident Post-mortem Template

```markdown
# AI Incident Post-mortem
**Incident ID:** INC-YYYY-XXX
**Severity:** P[0-3]
**Date:** YYYY-MM-DD
**Duration:** X hours Y minutes
**Feature Affected:** [AI Feature Name]

## Timeline
| Time | Event |
|------|-------|
| HH:MM | Incident first detected by [who/system] |
| HH:MM | BA notified |
| HH:MM | Feature disabled / mitigation applied |
| HH:MM | Root cause identified |
| HH:MM | Incident resolved |

## Root Cause
**Primary:** [Technical description]
**Contributing factors:** [List]

## Impact
- Users affected: [N]
- Incorrect decisions made: [N] (if any)
- Business impact: [$X / SLA breach / reputational]

## What Worked Well
- [Detection was fast]
- [Rollback was smooth]

## What Needs Improvement
- [Detection gap: X happened but alert didn't fire]
- [Response: Y took too long]

## Action Items
| Action | Owner | Due Date | Priority |
|--------|-------|----------|----------|
| Add alert for [condition] | ML Eng | [date] | P1 |
| Update HITL threshold from X to Y | BA | [date] | P2 |
| Retrain model with corrected labels | ML Eng | [date] | P1 |
```

---

## 6. Proactive Risk Review Cadence

| Frequency | Activity | Owner |
|---|---|---|
| Weekly | Review P0/P1 risk items | BA |
| Monthly | Model performance evaluation vs baseline | BA + ML Eng |
| Quarterly | Full AI Risk Register review | BA + PM + Security |
| Per-sprint | Red-team session for new AI features | BA + QA |

---

## Conclusion

Risk and incident analysis for AI is not like standard IT operations. BA needs to understand AI-specific failure modes, maintain an up-to-date risk register, and know the escalation path when AI gets it wrong. **It's not "if" an AI incident will happen — it's "when," and the question is whether you're ready.**
