---
id: 02760001-ba01-4001-a004-000000000003
title: "AI Governance & RACI cho BA: Ai quyết định prompt nào, ai phê duyệt release"
slug: ai-governance-raci-ba
excerpt: >-
  Khi AI sai, ai chịu trách nhiệm? Ai quyết định safety threshold? Khi cần escalation,
  đi qua ai? RACI matrix giúp BA define rõ roles, responsibilities, và decision rights
  cho mọi action liên quan AI — từ prompt change đến production release.
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

Khi AI feature produce sai kết quả, câu hỏi đầu tiên luôn là: "Ai sẽ review? Ai quyết định accept hay reject?"

Nếu không có RACI rõ ràng từ đầu, team sẽ lúng túng, delay, hoặc tối tệ hơn là ai cũng cho rằng "không phải việc mình".

Đây là bài về cách BA xây dựng governance framework cho AI feature.

---

## 1. Tại sao RACI lại quan trọng cho AI?

| Scenario | Không có governance | Có RACI rõ ràng |
|----------|-------------------|-----------------|
| Prompt sai output | Quét toàn bộ team, ai cũng không chắc | BA xác định ngay: AI team own, Product approve |
| Safety incident | Ai follow up? Ai decide rollback? | Escalation path rõ ràng → SOP |
| Release delay | Chờ approval từ ai? | Clear owner, SLA, go/no-go criteria |

---

## 2. RACI matrix cho AI feature

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
- **R** (Responsible) = Làm việc thực tế
- **A** (Accountable) = Cuối cùng chịu trách nhiệm (phải là 1 người)
- **C** (Consulted) = Hỏi ý kiến trước khi decide
- **I** (Informed) = Thông báo sau khi quyết định

---

## 3. Các decision points cần có RACI

### 1. Prompt Change Approval

```
Scenario: AI team muốn update prompt để cải thiện output

Activity: Prompt change approval
Responsible: AI Engineer (đề xuất thay đổi + test)
Accountable: Product Manager (cuối cùng say yes/no)
Consulted: BA (impact analysis), QA (regression test)
Informed: Engineering lead (tác động performance)

Process:
1. AI Engineer draft prompt change + A/B test results
2. BA review: có ảnh hưởng gì tới acceptance criteria?
3. QA run regression test trên golden test set
4. Product Manager: approve hoặc reject
5. If approve: deploy to staging → final QA test → production
```

### 2. Safety Threshold Decision

```
Activity: Confidence threshold adjustment (e.g., 0.75 → 0.80)
Responsible: Data Scientist (analyze trade-off accuracy vs escalation rate)
Accountable: Compliance / Legal (cuối cùng phê duyệt, chịu legal risk)
Consulted: BA (impact tới business workflow), Product (impact tới UX)

Decision criteria:
- accuracy_delta (e.g., +2%)
- escalation_rate_delta (e.g., +8%)
- business_impact (cost, user experience)
→ Tổng hợp, Compliance decide
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
- P0 (Customer harm, immediate): CEO/CRO decide escalate/pause
- P1 (Major bug): Product + Engineering + Compliance within 1h
- P2 (Minor bug): BA + AI team within 4h
- P3 (Enhancement): Regular sprint backlog

Escalation path:
User Reports → QA log ticket
↓
QA severity P0/P1? → Immediate notify
↓
On-call engineer + BA + Compliance
↓
Analyze: rollback? hotfix? monitor?
↓
Product decides: pause feature / limit user % / full rollback
```

---

## 4. RACI template cho BA fill

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
        │   ├─→ Immediate pause / limit AI % to 5%
        │   ├─→ Notify Product + Engineering + Compliance
        │   ├─→ Start incident postmortem
        │   └─→ Decision: rollback vs hotfix
        │
        └─→ P1 (significant issue)
            ├─→ Investigate within 2 hours
            ├─→ If root cause = prompt → AI team fix + test
            ├─→ If root cause = data → Data team validate data quality
            ├─→ If unclear → escalate to senior (BA review)
            └─→ Implement fix → staging test → production
```

---

## 6. Common anti-patterns

❌ "Everyone owns the decision" → delays, finger-pointing
✅ Clear A (Accountable) owner per decision

❌ "Compliance checks everything" → slow velocity
✅ Compliance A for safety-critical, C for others

❌ "No R on data quality" → bugs slip through
✅ Explicit R for data validation before AI processing

❌ "Escalation unclear" → incidents mishandled
✅ Escalation playbook with clear owner per severity level

---

## Tổng kết

AI Governance không phức tạp nếu bạn:
1. **Define RACI** rõ ràng cho mỗi decision (Prompt, Threshold, Release, Incident)
2. **Assign clear Accountable** (1 người, không committee)
3. **Document escalation path** với severity levels
4. **Review quarterly** — update RACI nếu team/process thay đổi

Team có governance rõ ràng sẽ deliver AI feature nhanh, confident, và có trách nhiệm.
