---
id: 02760001-ba01-4001-a004-000000000004
title: "Data Governance cho AI: Lineage, retention, PII classification, provenance"
slug: data-governance-ai-ba
excerpt: >-
  Data Governance không chỉ là "giữ data an toàn". Cho AI feature, BA cần setup:
  data lineage (trace data từ source), retention policy (giữ bao lâu), PII classification
  (cái nào sensitive), provenance tracking (ai dùng data, khi nào). Hướng dẫn từng bước
  từ policy → implementation checklist.
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

"Dữ liệu này có thể dùng để train AI không?" "Dữ liệu của khách hàng được giữ bao lâu?" "Ai access được production data?" — Nếu không có data governance policy, BA không có câu trả lời rõ ràng.

Bài này dạy BA xây dựng data governance framework cho AI feature.

---

## 1. Data Governance vs Data Security

| Khía cạnh | Data Governance | Data Security |
|----------|-----------------|--------------|
| Focus | Nào dữ liệu? từ đâu? dùng cho gì? | Ai access? Bảo vệ như thế nào? |
| Owner | BA, Data Steward | Security team, DevOps |
| Scope | Lineage, lifecycle, quality | Encryption, audit logs, access control |
| Question | "Can we use this data?" | "Who can access this data?" |

**BA cần focus vào governance;** security team implement controls.

---

## 2. Data Lineage — Trace dữ liệu từ nguồn

**Data Lineage** = Documented path của data từ source → processing → AI → output

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

**BA cần document:**
- [ ] Source system + extraction frequency
- [ ] Data transformation rules (anonymization? aggregation?)
- [ ] Database/table where AI data stored
- [ ] Who has access (read-only? write?)
- [ ] Retention: Bao lâu xóa source data sau khi process?

---

## 3. Data Classification — PII / PHI / Public

Phân loại data by sensitivity level:

| Level | Definition | Examples | Handling |
|-------|-----------|----------|----------|
| **Public** | Non-sensitive, can be shared | Product catalog, generic feedback | No restriction |
| **Internal** | Company only, not customer-facing | Sales metrics, internal emails | Restricted access |
| **Confidential (PII/PHI)** | Customer personal / health data | Name, email, phone, medical records | Encrypt, anonymize, audit log |
| **Restricted** | Regulatory requirement | Credit card, biometric data | Compliance team approve |

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

## 4. Retention Policy — Giữ bao lâu?

```
Policy: Customer transaction data retention

Raw data (source):
  ├─ Keep in production DB: 3 years (per finance audit requirement)
  ├─ Move to cold storage after 1 year
  └─ Delete after 3 years (unless legal hold)

AI training data (processed):
  ├─ Keep anonymized snapshot: 6 months for model version control
  ├─ Delete immediately when user opt-out
  └─ Delete on user account deletion (GDPR right to be forgotten)

Chat history (user interaction):
  ├─ Keep for 30 days in hot storage (for escalation handling)
  ├─ Archive after 30 days (60 days cold storage)
  └─ Delete after 90 days total UNLESS user opt-in for training
```

**Triggers for deletion:**
- [ ] User requests deletion (right to be forgotten)
- [ ] User opt-out from AI training
- [ ] Retention period expires
- [ ] Data quality check fails
- [ ] Regulatory requirement changes

---

## 5. Provenance Tracking — Ai dùng data? Khi nào?

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
- Delete triggers: User opt-out, account deletion, retention expire

## 5. User Rights

- User can request: What data we hold about them?
- User can request: Delete all data about me (GDPR)
- User can request: Export data
- User can opt-out: "Don't use my conversation to train AI"

## 6. Compliance Requirement

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
☐ Test data deletion (retention expire)
☐ Test user opt-out trigger
☐ QA verify correct data flows

AFTER LAUNCH
☐ Monthly audit log review
☐ Quarterly retention policy review
☐ Monitor: Any unauthorized access?
☐ Track: Any user deletion requests?
☐ Update policy if regulation changes
```

---

## 8. Common violations BA should prevent

❌ "We'll anonymize data later" → Data stays PII forever
✅ Anonymize AT SOURCE, before AI processing

❌ "We keep user chat for 5 years for model improvement" → GDPR violation
✅ Keep 30 days default, delete on user opt-out or right-to-be-forgotten

❌ "AI vendor needs access to production database" → Security nightmare
✅ Export anonymized dataset monthly, vendor works with that only

❌ "No audit trail needed, it's internal" → Can't prove compliance later
✅ Always log: who, what, when, why for every data access

---

## Tổng kết

Data Governance cho AI = **Classify** (PII?) + **Lineage** (từ đâu?) + **Retention** (giữ bao lâu?) + **Access** (ai xem?) + **Provenance** (audit trail).

BA không cần build systems, nhưng phải **define policies rõ ràng** trước khi dev build. Khi có compliance question sau, BA có concrete policy để refer tới.
