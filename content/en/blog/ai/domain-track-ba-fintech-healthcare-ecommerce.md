---
id: 02760001-ba01-4001-a003-000000000015
title: "Domain Track for BA: AI in Fintech, Healthcare, and eCommerce — What's Different?"
slug: domain-track-ba-fintech-healthcare-ecommerce
excerpt: >-
  BAs working with AI in Fintech must understand AML/KYC regulations. BA in
  Healthcare needs to know HIPAA and clinical workflows. BA in eCommerce focuses
  on personalization and fraud. A guide to domain-specific skills, regulations,
  and AI use cases for each industry.
featured_image: /images/blog/domain-track-ba.webp
type: blog
reading_time: 15
view_count: 0
meta: null
published_at: '2026-05-05T17:00:00.000000Z'
created_at: '2026-05-05T17:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Fintech, slug: fintech}, {name: Healthcare, slug: healthcare}, {name: eCommerce, slug: ecommerce}, {name: AI, slug: ai}, {name: Domain, slug: domain}]
comments: []
---

"A skilled BA can work in any domain" — that's half true. BA fundamentals are transferable, but domain knowledge determines how quickly and how deeply a BA can contribute. And in the AI era, domain knowledge matters even more.

---

## 1. Fintech: AI in a Regulated Environment

### 1.1 Common AI Use Cases in Fintech

| Use Case | AI Role | BA Key Skills |
|---|---|---|
| **Fraud Detection** | Real-time transaction scoring | False positive/negative trade-off, appeal process design |
| **Credit Scoring** | Alternative data assessment | Explainability (ECOA), bias audit |
| **AML/KYC** | Document verification, risk scoring | Regulation understanding, audit trail |
| **Chatbot Banking** | Customer service, product recommendations | Compliance language, escalation to human |
| **Algo Trading** | Market prediction (niche) | Out of scope for most BAs |

### 1.2 Regulations BA in Fintech Needs to Know

| Regulation | Impact on AI | What BA Must Do |
|---|---|---|
| **GDPR / PDPA** | AI cannot use PII without consent | Privacy-by-design in requirements |
| **ECOA (US)** | Credit decision AI must be explainable | Require XAI (explainable AI) in AC |
| **AML Directive** | Must have audit trail for AI risk decisions | Log every AI scoring event with timestamp |
| **PCI DSS** | Payment data cannot be exposed to LLMs | Data masking before API call |
| **MAS TRM (Singapore)** | AI model governance for financial institutions | RACI for model lifecycle |

### 1.3 Fintech-specific BA Skills

- **Reconciliation thinking:** Every dollar must balance — AI cannot create or lose money
- **Four-eyes principle:** High-value transactions need dual approval (AI + Human)
- **Audit trail obsession:** Every AI decision must be traceable and exportable
- **Explainability requirement:** "Why did AI reject this loan application?" — you need an answer

---

## 2. Healthcare: AI in a Clinical Environment

### 2.1 AI Use Cases in Healthcare

| Use Case | Risk Level | Regulation |
|---|---|---|
| **Clinical Decision Support** | Very High | FDA 510(k), CE Mark |
| **Medical Imaging AI** | Very High | FDA, IEC 62304 |
| **Administrative Automation** | Medium | HIPAA |
| **Patient Chatbot (triage)** | High | State medical board rules |
| **Revenue Cycle Automation** | Low-Medium | CMS, payer requirements |

### 2.2 HIPAA Essentials for BA

```
PHI (Protected Health Information) = any data that can identify a patient:
- Name, address, birthdate, SSN, phone
- Medical record numbers, health plan numbers
- Biometric identifiers, photos
- IP address (potentially), geographic data

BA Requirements for AI using PHI:
1. Minimum necessary principle — AI only uses the data fields it truly needs
2. De-identification before sending to external LLM
3. Business Associate Agreement (BAA) with AI vendor
4. Audit log for every access to PHI
```

### 2.3 Clinical Workflow Awareness

Healthcare BAs need to understand:
- **Care setting:** ICU vs Emergency vs Outpatient — AI decision time tolerance differs
- **Clinical role:** Doctor vs nurse vs admin workflow — UI and permissions differ
- **Alert fatigue:** Too many AI alerts → clinicians ignore everything → dangerous
- **Liability:** When AI is wrong in a clinical context, who is responsible? (Requires legal review)

---

## 3. eCommerce: AI in a High-velocity Environment

### 3.1 AI Use Cases in eCommerce

| Use Case | Impact | Key Metric |
|---|---|---|
| **Product Recommendation** | +15–30% basket size | Click-through rate, conversion |
| **Search Relevance** | Reduce zero-result rate | Search → purchase rate |
| **Fraud Detection** | Reduce chargebacks | False positive rate (blocking legit orders) |
| **Price Optimization** | Dynamic pricing | Revenue per session |
| **Review Moderation** | Brand protection | False positive (removing legit reviews) |
| **Customer Service Chatbot** | Cost reduction | FCR, CSAT score |

### 3.2 eCommerce-specific Considerations

**Personalization Ethics:**
- Price discrimination (same product, different prices per segment) — legal risk in some jurisdictions
- Filter bubble: AI only shows what the user already likes → reduces discovery
- BA must spec diversity/serendipity injection: "10% of recommendations must fall outside the filter bubble"

**A/B Test Culture:**
- eCommerce decisions are data-driven, not opinion-driven
- BA needs to understand: statistical significance, minimum detectable effect, holdout group
- Every AI feature needs an A/B test spec before shipping

**Flash Sale / Event Handling:**
- AI models trained on normal traffic will fail during flash sales
- BA must spec: "During event mode (manually triggered), AI recommendations are disabled, fallback to editorial list"

---

## 4. Skills Comparison: What Differs Most

| Skill | Fintech BA | Healthcare BA | eCommerce BA |
|---|---|---|---|
| **Regulation knowledge** | AML/KYC/PCI | HIPAA/GDPR/FDA | GDPR + Platform rules |
| **Risk tolerance** | Very Low | Extremely Low | Medium |
| **User research** | UX + Compliance review | Clinician shadowing | Quantitative UX |
| **Data literacy** | Transaction data, cohort analysis | EHR, HL7/FHIR | Clickstream, funnel |
| **AI explainability** | Required (credit) | Required (clinical) | Nice to have |
| **Speed of iteration** | Slow (compliance cycle) | Very slow (CE/FDA) | Fast (weekly deploy) |

---

## 5. Choosing the Right Domain Track for You

Questions to help you decide:

```
1. Do you have a high or low risk tolerance?
   → Low (cautious, process-oriented) = Fintech/Healthcare
   → High (like experimenting) = eCommerce/Consumer Tech

2. Do you prefer learning regulations/compliance or market dynamics?
   → Regulations = Fintech/Healthcare
   → Market = eCommerce

3. What is your background?
   → Finance/Accounting → Fintech
   → Science/Nursing → Healthcare
   → Retail/Marketing → eCommerce
```

---

## Conclusion

Domain expertise multiplies BA skill. An AI BA in Fintech with 3 years of experience has a completely different value from an AI BA in eCommerce with 3 years — neither is "better," but they are not interchangeable in 1–2 weeks.

Choose one domain to focus on, deep dive into its regulations and use cases, and become the person the technical team trusts when they need to understand "why the business needs this."
