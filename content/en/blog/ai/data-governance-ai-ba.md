---
id: 02760001-ba01-4001-a004-000000000004
title: "Data Governance for AI: Lineage, Retention, PII Classification, Provenance"
slug: data-governance-ai-ba
excerpt: >-
  Data Governance isn't just "keeping data safe." For AI features, BA must set up
  data lineage (trace data from source), retention policy (how long to keep), PII
  classification (what's sensitive), and provenance tracking (who uses data, when).
  Step-by-step guide from policy to implementation checklist.
featured_image: /images/blog/data-governance-ai.webp
type: blog
reading_time: 10
view_count: 0
meta: null
published_at: '2026-05-05T14:00:00.000000Z'
created_at: '2026-05-05T14:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Data Governance, slug: data-governance}, {name: Privacy, slug: privacy}, {name: Compliance, slug: compliance}]
comments: []
---

"Can this data be used to train AI?" "How long do we keep customer data?" "Who can access production data?" — Without a data governance policy, BA has no clear answers.

This guide teaches BA how to build a data governance framework for AI features.

---

## 1. Data Governance vs Data Security

| Aspect | Data Governance | Data Security |
|--------|-----------------|--------------|
| Focus | Which data? From where? Used for what? | Who accesses? How is it protected? |
| Owner | BA, Data Steward | Security team, DevOps |
| Scope | Lineage, lifecycle, quality | Encryption, audit logs, access control |
| Question | "Can we use this data?" | "Who can access this data?" |

**BA focuses on governance;** security team implements controls.

---

## 2. Data Lineage — Trace Data from Source

**Data Lineage** = Documented path of data from source → processing → AI → output

```
Example: AI chatbot suggests product recommendations

Source Data:
  ├─ Production DB: user_transactions table
  ├─ Third-party: product_catalog API
  └─ User input: chat message

Processing:
  ├─ ETL pipeline extracts user_transactions daily
  ├─ Join with product_catalog
  ├─ Anonymize user_id → user_hash
  └─ Load to AI feature database

AI Processing:
  ├─ Embedding model consumes user_hash + product features
  ├─ Similarity search + ranking
  └─ Top 5 recommendations output

Output:
  └─ Frontend displays recommendations
      ├─ Track: user saw which recommendation
      ├─ Track: user clicked which one
      └─ Feedback loop back to training data?
```

**BA must document:**
- [ ] Source system + extraction frequency
- [ ] Data transformation rules (anonymization? aggregation?)
- [ ] Database/table where AI data is stored
- [ ] Who has access (read-only? write?)
- [ ] Retention: How long to keep source data after processing?

---

## 3. Data Classification — PII / PHI / Public

Classify data by sensitivity level:

| Level | Definition | Examples | Handling |
|-------|-----------|----------|----------|
| **Public** | Non-sensitive, can be shared | Product catalog, generic feedback | No restriction |
| **Internal** | Company only, not customer-facing | Sales metrics, internal emails | Restricted access |
| **Confidential (PII/PHI)** | Customer personal / health data | Name, email, phone, medical records | Encrypt, anonymize, audit log |
| **Restricted** | Regulatory requirement | Credit card, biometric data | Compliance team must approve |

**Examples:**

```
User table fields:
- user_id (numeric) → INTERNAL (can help identify)
- email → CONFIDENTIAL (PII, GDPR)
- age → CONFIDENTIAL (PII, discrimination risk)
- purchase_history → INTERNAL + tracking
- medical_history → RESTRICTED (PHI under HIPAA)

Policy per field:
- Which features CAN be in AI training data?
- Which features MUST be anonymized?
- Which CANNOT be used for AI at all?
```

---

## 4. Retention Policy — How Long to Keep?

```
Policy: Customer transaction data retention

Raw data (source):
  ├─ Keep in production DB: 3 years (per finance audit requirement)
  ├─ Move to cold storage after 1 year
  └─ Delete after 3 years (unless legal hold)

AI training data (processed):
  ├─ Keep anonymized snapshot: 6 months for model version control
  ├─ Delete immediately when user opts out
  └─ Delete on user account deletion (GDPR right to be forgotten)

Chat history (user interaction):
  ├─ Keep for 30 days in hot storage (for escalation handling)
  ├─ Archive after 30 days (60 days in cold storage)
  └─ Delete after 90 days total UNLESS user opts in for training
```

**Triggers for deletion:**
- [ ] User requests deletion (right to be forgotten)
- [ ] User opts out from AI training
- [ ] Retention period expires
- [ ] Data quality check fails
- [ ] Regulatory requirement changes

---

## 5. Provenance Tracking — Who Uses Data? When?

Track every access / usage:

```
Audit log example:

Timestamp         | Actor       | Action                | Data Accessed          | Result
2026-05-05 10:15 | david@co    | Download data export  | user_transactions.csv  | ✅ Success
2026-05-05 10:20 | ai_pipeline | Read user_features    | anonymized_user_*.db   | ✅ 50K records
2026-05-05 10:25 | sarah@qa    | Execute unit test     | test_dataset.json      | ✅ All pass
2026-05-05 10:30 | external_ai | Attempted read PII    | email_addresses.csv    | ❌ Blocked
```

**What to audit:**
- [ ] Who accessed data (user/service account)
- [ ] When (timestamp)
- [ ] What data (table/field level)
- [ ] Action (read/write/delete/export)
- [ ] Result (success/blocked/error)
- [ ] Context (from which IP, which system)

---

## 6. Data Governance Policy Template

```markdown
# Data Governance Policy: [AI Feature Name]

## 1. Data Classification

| Data Source | Classification | PII? | Sensitivity | Usage |
|-------------|-----------------|------|-------------|-------|
| user_id | Internal | No | Medium | Train, serve |
| email | Confidential | YES | High | Serve only, no train |
| age | Confidential | YES | High | Train after anonymize |

## 2. Data Lineage

- **Source**: production.user_transactions (MySQL)
- **Extraction**: daily 2 AM (UTC) via Airflow DAG
- **Processing**: 
  - Anonymize PII (hash email, remove phone)
  - Aggregate age to 5-year buckets
- **Storage**: warehouse.ai_features (BigQuery)
- **Retention**: 6 months for model versions

## 3. Access Control

| Role | Data | Permission | Context |
|------|------|-----------|---------|
| Data Scientist | anonymized_features | Read | For model training only |
| ML Engineer | model_artifacts | Read/Write | Prod deployment |
| BA | Usage metrics | Read | Monthly review |
| External AI vendor | None | - | No direct access |

## 4. Retention Schedule

- Raw data: Keep 3 years
- Anonymized data: Keep 6 months
- Chat logs: Keep 30 days (hot) → 90 days (cold) → Delete
- Delete triggers: User opt-out, account deletion, retention expires

## 5. User Rights

- User can request: What data do we hold about them?
- User can request: Delete all my data (GDPR)
- User can request: Export my data
- User can opt-out: "Don't use my conversation to train AI"

## 6. Compliance Requirements

- GDPR: Personal data must have consent + right to delete
- CCPA: California residents can opt-out of data sale
- HIPAA: Health data must be de-identified before AI use
- Local law: [Add jurisdiction-specific]
```

---

## 7. Implementation Checklist for BA

```
BEFORE DEVELOPMENT
☐ Define data classification for every source
☐ Identify PII/PHI fields
☐ Decide: anonymize or exclude?
☐ Set retention policy
☐ Document lineage
☐ Get compliance review

DURING DEVELOPMENT
☐ Implement data masking for confidential fields
☐ Add audit logging
☐ Test data deletion (retention expires)
☐ Test user opt-out trigger
☐ QA verifies correct data flows

AFTER LAUNCH
☐ Monthly audit log review
☐ Quarterly retention policy review
☐ Monitor: Any unauthorized access?
☐ Track: Any user deletion requests?
☐ Update policy if regulations change
```

---

## 8. Common Violations BA Should Prevent

❌ "We'll anonymize data later" → Data stays PII forever
✅ Anonymize AT SOURCE, before AI processing

❌ "We keep user chat for 5 years for model improvement" → GDPR violation
✅ Keep 30 days by default, delete on user opt-out or right-to-be-forgotten

❌ "AI vendor needs access to production database" → Security nightmare
✅ Export anonymized dataset monthly, vendor works with that only

❌ "No audit trail needed, it's internal" → Can't prove compliance later
✅ Always log: who, what, when, why for every data access

---

## Summary

Data Governance for AI = **Classify** (PII?) + **Lineage** (from where?) + **Retention** (how long?) + **Access** (who sees?) + **Provenance** (audit trail).

BA doesn't need to build systems, but must **define clear policies** before dev builds. When compliance questions arise later, BA has concrete policy to reference.
