---
id: 02760001-ba01-4001-a003-000000000012
title: "Risk & Incident Analysis cho BA: Phân tích rủi ro AI feature và xử lý khi sự cố"
slug: risk-incident-analysis-ai-ba
excerpt: >-
  AI feature có risk profile khác hoàn toàn với feature thường: model drift, data
  poisoning, hallucination cascade, và bias amplification. BA cần Risk Register
  chuẩn, incident response plan, và post-mortem template riêng cho AI incidents.
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

Khi AI feature có incident, không thể debug như bug thông thường. "Model trả kết quả sai" có thể do: data quality thay đổi, prompt injection, distribution shift, hoặc infrastructure issue. BA cần biết cách phân tích từng loại.

---

## 1. AI-specific Risk Categories

### 1.1 Risk Taxonomy cho AI Feature

| Category | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| **Model** | Accuracy degradation (drift) | Medium | High | Monthly evaluation, drift detector |
| **Model** | Hallucination in high-stakes context | Medium | Very High | Human review threshold, citation requirement |
| **Data** | Training data poisoning | Low | Very High | Data provenance audit, anomaly detection |
| **Data** | PII leak qua model output | Low | Very High | Output scanning, PII masking |
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
| R001 | Model drift sau 3 tháng | Model | 3 | 4 | 3 | **36** | 🔴 Critical | Monthly eval + alert | ML Eng |
| R002 | Hallucination trong y tế context | Model | 3 | 5 | 4 | **60** | 🔴 Critical | Mandatory human review + citation | BA + QA |
| R003 | PII trong AI output | Data | 2 | 5 | 3 | **30** | 🔴 Critical | Output scanner pre-delivery | Security |
| R004 | API provider outage | Operations | 3 | 3 | 1 | **9** | 🟡 Medium | Fallback flow + timeout handling | Dev |
```

---

## 3. Incident Classification cho AI

Không phải mọi "AI làm sai" đều là incident. BA cần định nghĩa:

### Severity Levels

| Severity | Definition | Ví dụ | Response Time |
|---|---|---|---|
| **P0 — Critical** | AI gây harm trực tiếp, data breach, hoặc làm sai quyết định pháp lý | AI approve khoản vay sai, leak PII | < 15 phút |
| **P1 — High** | AI không hoạt động hoặc accuracy drop > 20% | Chatbot trả lời vô nghĩa, classifier fail | < 1 giờ |
| **P2 — Medium** | Accuracy drop 10-20%, một số user impact | Recall giảm từ 90% xuống 75% | < 4 giờ |
| **P3 — Low** | Minor inconsistency, edge case issue | Một số edge case xử lý không hoàn hảo | Next sprint |

---

## 4. Incident Response Process cho AI

```
[Incident Detected]
(bởi: monitor alert / user complaint / agent escalation)
        ↓
[BA xác nhận severity trong 15 phút]
├── P0/P1: Activate incident response team
│   ├── Thông báo: stakeholder + legal (nếu cần)
│   ├── Action: Feature flag OFF hoặc rollback
│   └── War room: BA + ML Eng + PM
└── P2/P3: Normal sprint process + tracking
        ↓
[Root Cause Analysis — 4 loại cần check]
1. Model issue (drift, retrain needed?)
2. Data issue (input distribution thay đổi?)
3. Infrastructure issue (API error rate tăng?)
4. Adversarial (prompt injection, abuse?)
        ↓
[Mitigation + Fix]
        ↓
[Post-mortem trong 48h (P0/P1)]
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
| Per-sprint | Red-team session cho new AI features | BA + QA |

---

## Kết luận

Risk và incident analysis cho AI không giống IT operations thông thường. BA cần hiểu AI-specific failure modes, có risk register cập nhật, và biết escalation path khi AI làm sai. **Không phải "nếu" AI incident xảy ra — mà là "khi nào" và bạn đã sẵn sàng chưa**.
