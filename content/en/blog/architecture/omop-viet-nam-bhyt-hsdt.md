---
id: 02770003-omop-cdm5-b001-000000000010
title: "OMOP for Vietnam: BHYT, HSDT, ICD-10 VN, 54 ethnicities, Decision 3516/QĐ-BYT, Personal Data Protection Law 2025"
slug: omop-viet-nam-bhyt-hsdt
excerpt: >-
  How well does OMOP CDM fit Vietnam? This article analyzes the policy
  context (Decision 3516/QĐ-BYT, Personal Data Protection Law 2025, Medical
  Examination and Treatment Law 15/2023, electronic health records on VNeID),
  Ministry of Health catalog mapping, custom vocabularies, and a roadmap for
  a national research data lake.
featured_image: /images/blog/omop-vietnam-featured.webp
type: blog
reading_time: 15
view_count: 0
meta: null
published_at: '2026-05-07T19:30:00.000000Z'
created_at: '2026-05-07T19:30:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat7-7007-a007-000000000007, name: Kiến trúc hệ thống, slug: architecture}
tags: [{name: OMOP, slug: omop}, {name: Vietnam Health, slug: vietnam-health}, {name: Healthcare, slug: healthcare}, {name: RWE, slug: rwe}]
comments: []
---

In 2026, three forces converge in Vietnam to create a major opportunity for OMOP: policy (Decision 3516/QĐ-BYT), data scale (34M+ Electronic Medical Record dossiers (HSDT) on VNeID, full Vietnam Social Health Insurance (BHYT) coverage), and an open OHDSI community. This article walks through how to deploy OMOP for Vietnam, from policy down to code.

## 1. Policy context, 2026

![Policy context, 2026](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d01.webp)

### 1.1 Decision 3516/QĐ-BYT (Nov 2025)

2030 targets:
- 100% public healthcare facilities equipped with HIS and EMR
- A unified national health data system
- Encourage AI and big-data use in healthcare
- Interoperability across MoH, Social Insurance (BHXH), and VNeID
- Encourage real-world-data evidence-based research

OMOP is the **natural choice** for the RWD/RWE goal.

### 1.2 Personal Data Protection Law 2025 (effective Jan 1, 2026)

> **2026 update**: The Personal Data Protection Law (passed by the National Assembly in session 9 on June 26, 2025) **replaces and upgrades Decree 13/2023/NĐ-CP** as of Jan 1, 2026. It introduces stronger administrative penalties (up to 5% of annual revenue), mandates Data Protection Impact Assessments (DPIAs), and tightens cross-border data transfer rules.

Requirements for processing healthcare data (sensitive personal data):
- Specific, separate consent for each purpose (including research consent)
- Mandatory encryption at rest and in transit
- Audit log every access, retained at least 5 years
- In-country storage; cross-border transfers require consent + notification of the data protection authority
- A DPO is mandatory for large-scale processors
- DPIA required before launching any new purpose
- Mechanisms to delete / correct data on request

Pseudonymizing the national ID (CCCD) / BHYT in OMOP `person_source_value` is mandatory.

### 1.3 Medical Examination and Treatment Law 15/2023/QH15 (effective Jan 1, 2024)

- Mandates that healthcare facilities deploy electronic medical records (EMR) on a phased schedule
- Personal health data belongs to the patient → research sharing requires consent
- Permits the use of healthcare data for scientific research when properly pseudonymized
- Combined with the Personal Data Protection Law → sufficient legal basis to build a national-research OMOP CDM

## 2. Vietnamese source data for OMOP

![Vietnamese source data for OMOP](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d02.webp)

## 3. Mapping Vietnamese vocabularies

### 3.1 Catalogs with existing standards

| Vietnam catalog | Standard equivalent | Source |
|---|---|---|
| ICD-10 VN (MoH) | ICD-10 → SNOMED via "Maps to" | MoH-updated, WHO origin |
| Generic drug names | RxNorm Ingredient | Map ATC → RxNorm |
| Active ingredients | RxNorm Ingredient | |
| Units of measure | UCUM | Mostly standard |
| LOINC tests | LOINC | Some hospital labs already use it |

### 3.2 Catalogs that need a custom vocabulary

| Vietnam catalog | Reason for custom | Strategy |
|---|---|---|
| 54 ethnicities | No equivalent concept | `VN_DANTOC` vocabulary (54 concepts) |
| Province / district / ward | No standard match | `VN_GEO` vocabulary, 3 levels |
| BHYT type | No match to U.S. Payer | `VN_BHYT` vocabulary (mandatory, household, student, ...) |
| Hospital tier | No equivalent concept | Custom care_site setting |
| MoH 2025 drug catalog | Needs RxNorm mapping | USAGI mapping + custom for traditional medicine |
| Medical service (DVKT) catalog | Custom procedure codes | USAGI → SNOMED procedure |

### 3.3 Building the VN_DANTOC vocabulary

```sql
INSERT INTO vocabulary (vocabulary_id, vocabulary_name, vocabulary_reference, vocabulary_version, vocabulary_concept_id) VALUES
  ('VN_DANTOC', 'Vietnam ethnicity catalog', 'TCVN 54', '1.0', 2000000001);

INSERT INTO concept VALUES
  (2000000001, 'Vietnamese ethnicities (vocabulary)', 'Metadata', 'VN_DANTOC', 'Vocabulary', 'C', 'OMOP generated', NULL, NULL, NULL, NULL),
  (2000001001, 'Kinh', 'Race', 'VN_DANTOC', 'Race', 'S', '01', NULL, NULL, NULL, NULL),
  (2000001002, 'Tày', 'Race', 'VN_DANTOC', 'Race', 'S', '02', NULL, NULL, NULL, NULL),
  (2000001003, 'Thái', 'Race', 'VN_DANTOC', 'Race', 'S', '03', NULL, NULL, NULL, NULL),
  -- ... 54 ethnicities
  (2000001054, 'Other ethnicity', 'Race', 'VN_DANTOC', 'Race', 'S', '99', NULL, NULL, NULL, NULL);
```

Concept IDs from 2 billion upward (the OHDSI-reserved range for custom concepts).

### 3.4 Traditional-medicine vocabulary

Vietnam has many traditional-medicine (YHCT) drugs with no RxNorm equivalent. Build a custom `VN_YHCT` vocabulary:

```sql
INSERT INTO concept VALUES
  (2000020001, 'Cảm xuyên hương', 'Drug', 'VN_YHCT', 'Branded Drug', 'S', 'YHCT001', ...),
  (2000020002, 'Hoạt huyết Nhất Nhất', 'Drug', 'VN_YHCT', 'Branded Drug', 'S', 'YHCT002', ...);
```

This needs coordination with the MoH Department of Traditional Medicine to standardize.

## 4. ETL pattern for HSDT (VNeID)

The Electronic Medical Record dossier (HSDT) on VNeID has a structure that is roughly FHIR-like:

![ETL pattern for HSDT (VNeID)](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d03.webp)

Notes:
- HSDT only stores summary data — not a full EMR
- → A CDM built from HSDT will have high-level visit/condition records but no detailed drug/measurement data
- Augment with hospital EMRs for the detail

## 5. ETL pattern for BHYT

![ETL pattern for BHYT](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d04.webp)

BHYT data strengths:
- Wide coverage (~95M people)
- Well-coded (per MoH standards)
- Long history (>10 years)

Limitations:
- No vital signs or lab values
- No symptoms (diagnoses only)
- Bias: only visible for those who use BHYT-covered care

→ Pair with EMRs for complete RWE.

## 6. Vietnam RWE use cases

| Question | Source data | Method |
|---|---|---|
| Effectiveness of hypertension treatment regimens in Vietnamese patients | EMR + BHYT | CohortMethod (PLE) |
| Stroke risk prediction in the diabetic population | EMR + lab | PatientLevelPrediction (PLP) |
| Cancer epidemiology by region | BHYT + Registry | Characterization |
| Tracking COVID vaccine side effects | HSDT + EMR | SCCS |
| Inappropriate antibiotic prescribing rates | EMR + drug guidelines | Custom analytic |
| Treatment cost by comorbidity | BHYT + Cost | Health economics |
| Joining DARWIN EU rare-disease studies | OMOP CDM | Strategus + share aggregate |

## 7. National data lake roadmap

![National data lake roadmap](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d05.webp)

Pilot pattern:
1. Pick 5-10 representative hospitals (region, tier, specialty)
2. Build OMOP CDM at each hospital (federated)
3. Central coordinator runs network studies
4. Publish demonstration studies that prove value
5. Expand gradually

## 8. Governance pattern

![Governance pattern](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d06.webp)

Vietnam needs to launch an **OHDSI Vietnam chapter** — register as an official working group on OHDSI.

## 9. Pseudonymizing person IDs

```sql
-- Never store the raw national ID
person_source_value = encode(
  hmac(
    cccd::bytea, 
    current_setting('app.cccd_secret')::bytea, 
    'sha256'
  ),
  'hex'
);

-- Key lives in a separate Vault
-- Re-identification requires multi-party approval (DPO + IRB)
```

When hospitals share the same hash algorithm + secret, **records can be linked across sites** without revealing the national ID.

## 10. Vietnam resources

| Resource | Note |
|---|---|
| Decision 3516/QĐ-BYT (2025) | Healthcare digital transformation policy 2025-2030 |
| Personal Data Protection Law 2025 | Effective Jan 1, 2026; replaces Decree 13/2023 |
| Medical Examination and Treatment Law 15/2023/QH15 | Effective Jan 1, 2024; mandatory EMR |
| Decree 13/2023/NĐ-CP | Foundation (replaced by the PDP Law from 2026) |
| SNOMED CT Vietnam portal | Affiliate registration (free) |
| ICD-10 VN catalog | Published by MoH |
| MoH drug catalog | Updated annually |
| Medical service (DVKT) catalog | Published by MoH |
| OHDSI forum | Join Vietnam threads (just starting) |
| Book of OHDSI | Free textbook |
| EHDEN Academy | Free OMOP courses |

## 11. A personal roadmap for Vietnam

1. Read the Book of OHDSI (1 month)
2. Install Eunomia and practice SQL (2 weeks)
3. Install Broadsea locally (1 week)
4. Build a CDM with 1,000 mock Vietnamese patients (1 month)
5. Map ICD-10 VN → SNOMED with USAGI (2 weeks)
6. Run ATLAS + DQD + ACHILLES (1 week)
7. Learn HADES R: CohortMethod, PLP (2 months)
8. Attend an OHDSI Symposium (free annual virtual track)
9. Lead a small study on a Vietnam CDM (3-6 months)
10. Propose an OHDSI Vietnam chapter

## 12. Community to build

![Community to build](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d07.webp)

## 13. Vietnam-specific pitfalls

- ❌ Mapping ICD-10 VN directly to `condition_concept_id` without going through SNOMED → analytics aren't network-ready
- ❌ Forgetting to pseudonymize the national ID → violates the Personal Data Protection Law 2025 (penalties up to 5% of revenue)
- ❌ Custom concepts using IDs below 2 billion → conflicts with standard concepts
- ❌ Not snapshotting vocabulary versions → can't reproduce older studies
- ❌ Storing data abroad → cross-border data violation
- ❌ Ignoring traditional medicine (YHCT) → bias that underestimates drug exposure
- ❌ Forgetting BHYT has multiple categories → analytics can't stratify correctly

## Conclusion

Between 2026 and 2030, Vietnam has the opportunity to build a national healthcare research data lake on OMOP — open source, federated, network-friendly, and aligned with the **Personal Data Protection Law 2025** (effective Jan 1, 2026), **Medical Examination and Treatment Law 15/2023**, and **Decision 3516/QĐ-BYT**. It will require investment in Vietnamese vocabularies, governance, and community. An OHDSI Vietnam chapter would be the catalyst that puts Vietnam on a par with EHDEN and DARWIN EU.

→ Back to the [OMOP CDM Practitioner roadmap](/roadmap/omop-cdm) for the full 5-9-month learning plan.
