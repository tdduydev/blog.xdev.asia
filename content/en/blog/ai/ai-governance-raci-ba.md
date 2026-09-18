---
id: 02760001-ba01-4001-a004-000000000003
title: "AI Governance & RACI for BA: Who Decides on Prompts, Who Approves Release?"
slug: ai-governance-raci-ba
excerpt: >-
  When AI produces wrong results, who is responsible? Who decides safety thresholds?
  When escalation is needed, who do we go through? RACI matrix helps BA clearly define
  roles, responsibilities, and decision rights for all AI-related actions — from prompt
  changes to production releases.
featured_image: /images/blog/ai-governance-raci.webp
type: blog
reading_time: 9
view_count: 0
meta: null
published_at: '2026-05-05T13:30:00.000000Z'
created_at: '2026-05-05T13:30:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Governance, slug: governance}, {name: RACI, slug: raci}, {name: AI, slug: ai}]
comments: []
---

When AI features produce incorrect results, the first question is always: "Who will review? Who decides whether to accept or reject?"

Without clear RACI from the start, teams become confused, delays happen, or worse — everyone thinks "it's not my job."

This guide teaches BA how to build a governance framework for AI features.

---

## 1. Why RACI Matters for AI

| Scenario | No Governance | Clear RACI |
|----------|---------------|-----------|
| Prompt produces wrong output | Entire team in confusion, no one is sure | BA identifies immediately: AI team owns, Product approves |
| Safety incident | Who follows up? Who decides rollback? | Clear escalation path → SOP |
| Release delay | Waiting for approval from whom? | Clear owner, SLA, go/no-go criteria |

---

## 2. RACI Matrix for AI Features

**RACI = Responsible, Accountable, Consulted, Informed**

| Activity | Product | BA | Data/AI | Engineering | QA | Compliance |
|----------|---------|----|---------|-----------|----|-----------|
| Define AI requirements | A | R | C | C | - | C |
| Prompt design & tuning | - | R | R | - | - | - |
| Test AI output quality | - | C | R | - | R | - |
| Safety/bias testing | - | - | R | - | C | A |
| Production release approval | A | R | C | R | - | A |
| Incident response | C | R | A | C | C | - |
| Model rollback decision | A | C | A | R | - | - |

**Legend:**
- **R** (Responsible) = Does the actual work
- **A** (Accountable) = Ultimately responsible (must be 1 person)
- **C** (Consulted) = Asked for input before decision
- **I** (Informed) = Notified after decision is made

---

## 3. Key Decision Points Requiring RACI

### 1. Prompt Change Approval

```
Scenario: AI team wants to update prompt to improve output

Activity: Prompt change approval
Responsible: AI Engineer (proposes change + tests)
Accountable: Product Manager (final yes/no decision)
Consulted: BA (impact analysis), QA (regression testing)
Informed: Engineering lead (performance impact)

Process:
1. AI Engineer drafts prompt change + A/B test results
2. BA reviews: any impact on acceptance criteria?
3. QA runs regression test on golden test set
4. Product Manager: approve or reject
5. If approved: deploy to staging → final QA test → production
```

### 2. Safety Threshold Decision

```
Activity: Confidence threshold adjustment (e.g., 0.75 → 0.80)
Responsible: Data Scientist (analyzes trade-off between accuracy and escalation rate)
Accountable: Compliance / Legal (final approval, bears legal risk)
Consulted: BA (impact on business workflow), Product (impact on UX)

Decision criteria:
- accuracy_delta (e.g., +2%)
- escalation_rate_delta (e.g., +8%)
- business_impact (cost, user experience)
→ Synthesize findings, Compliance decides
```

### 3. Go/No-Go Production Release

```
Activity: Go-live decision
Responsible: QA (execute UAT), BA (verify business criteria)
Accountable: Product Manager (final go/no-go call)
Consulted: Data/AI (quality metrics), Engineering (technical readiness)
Informed: Support/Operations (ready to handle escalations?)

Criteria to pass:
☐ Accuracy ≥ threshold
☐ 0 critical defects
☐ UAT sign-off from business
☐ Rollback procedure tested
☐ Monitoring dashboards live
☐ Escalation playbook ready
```

### 4. Incident Response & Escalation

```
When: AI output causes harm (wrong diagnosis, incorrect financial decision)

Severity Level → Response Owner:
- P0 (Customer harm, immediate): CEO/CRO decides escalation/pause
- P1 (Major bug): Product + Engineering + Compliance within 1h
- P2 (Minor bug): BA + AI team within 4h
- P3 (Enhancement): Regular sprint backlog

Escalation path:
User Reports → QA logs ticket
↓
QA severity P0/P1? → Immediate notification
↓
On-call engineer + BA + Compliance
↓
Analyze: rollback? hotfix? monitor?
↓
Product decides: pause feature / limit user % / full rollback
```

---

## 4. RACI Template for BA to Fill

```markdown
# RACI Matrix: [AI Feature Name]

## Core Team
| Role | Name | Email | Availability |
|------|------|-------|--------------|
| Product Manager | ... | ... | ... |
| BA | ... | ... | ... |
| Data Scientist | ... | ... | ... |
| AI Engineer | ... | ... | ... |
| QA Lead | ... | ... | ... |
| Engineering Lead | ... | ... | ... |
| Compliance Officer | ... | ... | ... |

## Decision Matrix

| Decision | Responsible | Accountable | Consulted | Informed | Timeline |
|----------|-------------|-------------|-----------|----------|----------|
| Prompt design approval | AI Eng | Product | BA, QA | Eng Lead | Before dev |
| Accuracy threshold | Data Sci | Compliance | BA, Product | AI Eng | Before UAT |
| UAT sign-off | BA | Product | QA | All | End of UAT |
| Production release | QA | Product | All | Ops | Release day |
| Incident > P1 | BA | Product | Data Sci, Eng | All | Within 1h |
| Rollback decision | Eng Lead | Product | All | - | Immediate |
```

---

## 5. Escalation Playbook

```
AI Output Concern Detected
    │
    ├─→ Is customer impacted? NO
    │       └─→ Log ticket, standard process
    │
    └─→ YES
        ├─→ Severity?
        │
        ├─→ P0 (immediate harm)
        │   ├─→ Immediate pause / limit AI to 5%
        │   ├─→ Notify Product + Engineering + Compliance
        │   ├─→ Start incident postmortem
        │   └─→ Decision: rollback vs hotfix
        │
        └─→ P1 (significant issue)
            ├─→ Investigate within 2 hours
            ├─→ If root cause = prompt → AI team fixes + tests
            ├─→ If root cause = data → Data team validates data quality
            ├─→ If unclear → escalate to senior (BA review)
            └─→ Implement fix → staging test → production
```

---

## 6. Common Anti-Patterns

❌ "Everyone owns the decision" → delays, finger-pointing
✅ Clear A (Accountable) owner per decision

❌ "Compliance checks everything" → slow velocity
✅ Compliance A for safety-critical, C for others

❌ "No R on data quality" → bugs slip through
✅ Explicit R for data validation before AI processing

❌ "Escalation unclear" → incidents mishandled
✅ Escalation playbook with clear owner per severity level

---

## Summary

AI Governance isn't complex if you:
1. **Define RACI clearly** for each decision (Prompt, Threshold, Release, Incident)
2. **Assign clear Accountable** (1 person, not a committee)
3. **Document escalation path** with severity levels
4. **Review quarterly** — update RACI if team/process changes

Teams with clear governance deliver AI features faster, with confidence, and with accountability.
