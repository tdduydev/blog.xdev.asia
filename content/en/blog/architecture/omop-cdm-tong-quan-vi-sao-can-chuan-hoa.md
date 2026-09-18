---
id: 02770003-omop-cdm5-b001-000000000001
title: "OMOP CDM overview: why we need standardized healthcare data for RWE"
slug: omop-cdm-tong-quan-vi-sao-can-chuan-hoa
excerpt: >-
  Real-World Evidence (RWE) is changing how the FDA, EMA, and other regulators
  make decisions. OMOP CDM is the data standard that lets you run a single
  study across hundreds of organizations at once. This article introduces
  OHDSI, CDM 5.4, and the Vietnam context.
featured_image: /images/blog/omop-overview-featured.webp
type: blog
reading_time: 14
view_count: 0
meta: null
published_at: '2026-05-07T15:00:00.000000Z'
created_at: '2026-05-07T15:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat7-7007-a007-000000000007, name: Kiến trúc hệ thống, slug: architecture}
tags: [{name: OMOP, slug: omop}, {name: OHDSI, slug: ohdsi}, {name: CDM, slug: cdm}, {name: Healthcare, slug: healthcare}]
comments: []
---

By 2026, more than **800 million patients** worldwide have been standardized to the OMOP Common Data Model. FDA Sentinel, EMA DARWIN EU, EHDEN (200+ European data partners), and N3C (the U.S. COVID-19 effort) all run on OMOP. This article explains why OMOP matters and why it fits Vietnam as the country rolls out the Electronic Health Record (HSDT) program under Decision 3516/QĐ-BYT (Ministry of Health digital transformation 2025-2030).

## 1. RWD vs. RWE — the core distinction

- **RWD (Real-World Data)**: raw healthcare data from EHRs, social-health-insurance (BHYT) claims, registries, wearables, and consumer health apps
- **RWE (Real-World Evidence)**: contextualized, scientifically rigorous insight that can drive clinical or regulatory decisions

For example:
- An RCT (clinical trial) answers "Does drug A work in 1,000 carefully selected patients?"
- RWE answers "How does drug A behave for 1 million Vietnamese patients in real life? How do age, sex, and comorbidity change the picture?"

RWE matters because RCTs cover less than 5% of the clinically important questions.

## 2. Why a Common Data Model is needed

![Why a Common Data Model is needed](/images/blog/diagrams/omop-cdm-tong-quan-vi-sao-can-chuan-hoa-d01.webp)

Five benefits:
1. **Multi-source analytics**: one study runs across 200 organizations in parallel (federated)
2. **Reproducibility**: the same R/SQL code runs identically against any CDM
3. **Unified vocabulary**: ICD/SNOMED/RxNorm/LOINC are pre-mapped
4. **Open-source tooling**: ATLAS, HADES, DQD, ACHILLES are free
5. **Network**: join EHDEN, OHDSI workgroups, and have a community to support you

## 3. History of OMOP and OHDSI

![History of OMOP and OHDSI](/images/blog/diagrams/omop-cdm-tong-quan-vi-sao-can-chuan-hoa-d02.webp)

OHDSI = Observational Health Data Sciences and Informatics. It is not a company — it is an open community (Apache 2.0) with working groups, network studies, and an annual symposium.

## 4. The 2026 OHDSI stack

![The 2026 OHDSI stack](/images/blog/diagrams/omop-cdm-tong-quan-vi-sao-can-chuan-hoa-d03.webp)

## 5. CDM 5.4 — 37 tables grouped by purpose

| Group | Representative tables |
|---|---|
| **Clinical Data** | PERSON, VISIT_OCCURRENCE, CONDITION_OCCURRENCE, DRUG_EXPOSURE, PROCEDURE_OCCURRENCE, MEASUREMENT, OBSERVATION, DEVICE_EXPOSURE, NOTE, NOTE_NLP, SPECIMEN, DEATH, EPISODE |
| **Health System** | LOCATION, CARE_SITE, PROVIDER |
| **Health Economics** | PAYER_PLAN_PERIOD, COST |
| **Standardized Vocabularies** | CONCEPT, VOCABULARY, DOMAIN, CONCEPT_RELATIONSHIP, CONCEPT_ANCESTOR, CONCEPT_SYNONYM, CONCEPT_CLASS, RELATIONSHIP, DRUG_STRENGTH |
| **Derived Elements** | DRUG_ERA, DOSE_ERA, CONDITION_ERA, COHORT, COHORT_DEFINITION |
| **Metadata** | CDM_SOURCE, METADATA |

PERSON sits at the center — every clinical event references it through the `person_id` foreign key.

## 6. Vocabulary — the heart of the CDM

OMOP does not invent its own vocabulary. It reuses international standards and **picks one Standard Concept** for each clinical idea:

| Domain | Standard Vocabulary | Common source |
|---|---|---|
| Condition | SNOMED CT | ICD-10, ICD-9 |
| Drug | RxNorm (US) / RxNorm Extension | NDC, ATC, Vietnam MoH drug list |
| Procedure | SNOMED CT, CPT4, ICD-10-PCS | Vietnam DVKT (technical service catalogue) |
| Measurement | LOINC, SNOMED CT | local lab codes |
| Observation | SNOMED CT, LOINC | local |
| Unit | UCUM | local |
| Visit | SNOMED CT (visit subset) | local |

ETL must map each source code to a `standard_concept_id`. The original code is preserved in the matching `*_source_value` column for traceability.

## 7. OMOP use cases

| Use case | Real-world example |
|---|---|
| **Drug safety** | Sentinel monitors post-market side effects of every drug |
| **Comparative effectiveness** | Metformin + SGLT2 vs. Metformin + DPP4 for diabetes |
| **Patient-Level Prediction** | Predicting 30-day hospital readmission |
| **Disease characterization** | Describing the epidemiology of a rare disease |
| **Health economics** | Analyzing care costs across the BHYT-insured population |
| **AI/ML training** | Using a standardized cohort as a clinical-LLM training dataset |

## 8. Comparison with other CDMs

| CDM | Community | Strengths | Weaker than OMOP |
|---|---|---|---|
| **OMOP** | OHDSI, open | Vocabulary, federated, tooling | — |
| **i2b2** | Harvard / community | Built-in UI | Less standardized vocabulary |
| **PCORnet** | PCORI (US) | Simple, claims-friendly | Limited deep analytics |
| **Sentinel** | FDA (US) | Drug-safety pharmacovigilance | Closed, FDA-only |
| **CDISC** | Trial data | Clinical-trial submission | Not built for RWE |

OMOP is the most comprehensive option, used by both the FDA and EMA — that is why it is worth investing in.

## 9. Vietnam context

Decision 3516/QĐ-BYT (November 2025) — Healthcare digital transformation 2025-2030:
- A national healthcare data system
- HSDT (Electronic Health Record) on VNeID (34M+ records as of January 2026)
- Full-coverage electronic BHYT (social health insurance)
- Encouragement of evidence-based research

OMOP fits a national research data lake very well:
- It can standardize many sources (public hospitals, private hospitals, BHYT, registries) at once
- It enables federated analytics — sensitive data does not need to leave its location
- It is open source — no vendor lock-in
- The OHDSI community is ready to help

A few research groups (VNU-HCM, Hanoi Medical University Hospital, public-health institutes) have started experimenting. There is a huge first-mover opportunity.

## 10. Does OMOP replace FHIR?

NO — they complement each other. See the [HL7 FHIR Practitioner roadmap](/roadmap/hl7-fhir):

| Criterion | FHIR | OMOP |
|---|---|---|
| Goal | Operational exchange | Analytics / RWE |
| Schema | Independent resources (50+ resource types) | 37 normalized relational tables |
| Vocabulary | Flexible CodeableConcept | Mandatory Standard Concepts |
| Transport | REST API | SQL on a database / file extracts |
| Real-time | Yes (Subscription, CDS Hooks) | No (batch ETL) |
| Use cases | EHRs, mobile, telemedicine | Network studies, ML, BI |

A mature organization should run both — FHIR for the operational layer, OMOP for the analytics layer. See the [FHIR ↔ OMOP bridge](/blog/omop-fhir-mapping-bridge) for details.

## 11. Where to start?

1. Read the Book of OHDSI (free, open source)
2. Install Eunomia (a sample CDM R package) and practice SQL
3. Look up concepts on Athena (athena.ohdsi.org)
4. Spin up Broadsea (Docker Compose with ATLAS + WebAPI + Postgres)
5. Join the OHDSI forum

## Conclusion

OMOP CDM is the data standard for the next generation of healthcare research. The OHDSI community is open, the tooling is free, and Vietnam has a big opportunity to build a national research data lake. Investing in OMOP today is investing at the right time.

Next article: [Comparing OMOP, FHIR, i2b2, PCORnet, Sentinel — which CDM should you pick?](/blog/omop-vs-fhir-vs-i2b2-pcornet) · Or browse the [OMOP CDM Practitioner roadmap](/roadmap/omop-cdm).
