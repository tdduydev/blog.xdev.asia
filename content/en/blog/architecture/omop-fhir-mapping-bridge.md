---
id: 02770003-omop-cdm5-b001-000000000009
title: "FHIR ↔ OMOP: bridging the operational and analytics layers"
slug: omop-fhir-mapping-bridge
excerpt: >-
  By 2026, mature organizations run both FHIR (operational) and OMOP
  (analytics). This article walks through resource ↔ table mapping, the
  FHIR-OMOP-on-FHIR working group, Pathling, the Bulk Data Export pipeline,
  and deployment patterns for Vietnam.
featured_image: /images/blog/omop-fhir-bridge-featured.webp
type: blog
reading_time: 14
view_count: 0
meta: null
published_at: '2026-05-07T19:00:00.000000Z'
created_at: '2026-05-07T19:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat7-7007-a007-000000000007, name: Kiến trúc hệ thống, slug: architecture}
tags: [{name: OMOP, slug: omop}, {name: HL7 FHIR, slug: hl7-fhir}, {name: Healthcare, slug: healthcare}, {name: Interoperability, slug: interoperability}]
comments: []
---

FHIR is the operational standard. OMOP is the analytical standard. Both coexist in a mature 2026 organization. This article shows how to bridge the two worlds: mapping, tooling, and pipelines.

## 1. Why you need both

![Why you need both](/images/blog/diagrams/omop-fhir-mapping-bridge-d01.webp)

FHIR is strong for real-time, JSON, and REST. OMOP is strong for batch SQL, standardized vocabularies, and network studies. They each own a front — bridge them, don't replace one with the other.

## 2. Resource ↔ table mapping

The FHIR-OMOP-on-FHIR community (a joint HL7 + OHDSI working group) maintains the official mapping.

### 2.1 Core mapping table

| FHIR Resource | OMOP Table | Note |
|---|---|---|
| Patient | PERSON | identifier → person_source_value, gender → gender_concept_id |
| Encounter | VISIT_OCCURRENCE | class → visit_concept_id |
| Encounter (subVisit) | VISIT_DETAIL (CDM 5.4+) | hospital ward, dept |
| Condition | CONDITION_OCCURRENCE | code (SNOMED) → condition_concept_id |
| MedicationRequest / MedicationStatement / MedicationDispense | DRUG_EXPOSURE | code (RxNorm) → drug_concept_id |
| MedicationAdministration | DRUG_EXPOSURE | drug_type_concept_id = Inpatient admin |
| Procedure | PROCEDURE_OCCURRENCE | code → procedure_concept_id |
| Observation (lab) | MEASUREMENT | code (LOINC) + valueQuantity |
| Observation (vital) | MEASUREMENT | code + valueQuantity |
| Observation (social, family hx) | OBSERVATION | code → observation_concept_id |
| AllergyIntolerance | OBSERVATION | concept = "Allergy to" |
| Immunization | DRUG_EXPOSURE / PROCEDURE_OCCURRENCE | depends |
| Specimen | SPECIMEN | CDM 5.4 |
| DocumentReference / Composition | NOTE | text → note + NOTE_NLP |
| Coverage | PAYER_PLAN_PERIOD | BHYT, supplementary BHYT |
| Practitioner | PROVIDER | |
| Organization (provider) | CARE_SITE | |
| Location | LOCATION | |

### 2.2 Detailed mapping: Encounter → Visit_Occurrence

![Detailed mapping: Encounter → Visit_Occurrence](/images/blog/diagrams/omop-fhir-mapping-bridge-d02.webp)

Code:
```python
def encounter_to_visit(enc):
    return {
        'visit_occurrence_id': hash_to_bigint(enc['id']),
        'person_id': lookup_person(enc['subject']['reference']),
        'visit_concept_id': map_class(enc['class']['code']),
        'visit_start_date': enc['period']['start'][:10],
        'visit_start_datetime': enc['period']['start'],
        'visit_end_date': enc['period'].get('end', enc['period']['start'])[:10],
        'visit_type_concept_id': 32817,  # EHR encounter
        'care_site_id': lookup_care_site(enc.get('serviceProvider')),
        'visit_source_value': enc['id']
    }

def map_class(class_code):
    return {
        'IMP': 9201,  # Inpatient
        'AMB': 9202,  # Outpatient
        'EMER': 9203, # ER
        'HH': 581476, # Home health
        'VR': 5083    # Virtual / telehealth
    }.get(class_code, 0)
```

## 3. Coding system map FHIR ↔ OMOP

FHIR code system URL → OMOP vocabulary_id:

| FHIR System URL | OMOP vocabulary_id |
|---|---|
| http://snomed.info/sct | SNOMED |
| http://hl7.org/fhir/sid/icd-10-cm | ICD10CM |
| http://hl7.org/fhir/sid/icd-10 | ICD10 |
| http://www.nlm.nih.gov/research/umls/rxnorm | RxNorm |
| http://loinc.org | LOINC |
| http://www.ama-assn.org/go/cpt | CPT4 |
| urn:oid:2.16.840.1.113883.6.96 | SNOMED (OID) |

Vietnam:
| Vietnam FHIR System URL | OMOP vocabulary |
|---|---|
| https://terminology.kcb.vn/CodeSystem/icd10vn | Custom ICD10VN |
| https://terminology.kcb.vn/CodeSystem/danhmucthuoc | VN_DRUG (custom) |

## 4. Pipeline patterns

### 4.1 Bulk Export → ETL → CDM

![Bulk Export → ETL → CDM](/images/blog/diagrams/omop-fhir-mapping-bridge-d03.webp)

Benefit: standard FHIR; you don't need the FHIR backend to support custom export. See [FHIR Bulk Data Export & CDS Hooks](/blog/fhir-bulk-data-export-cds-hooks).

### 4.2 Real-time CDC pattern

![Real-time CDC pattern](/images/blog/diagrams/omop-fhir-mapping-bridge-d04.webp)

Pros: FHIR stays fresh; OMOP aggregates nightly.

## 5. Pathling — query FHIR like OMOP

[Pathling](https://pathling.csiro.au/) (CSIRO Australia) lets you query FHIR data analytics-style:

```sql
-- Bulk Pathling query
SELECT 
  patient.id, 
  patient.gender,
  count(condition) AS n_conditions
FROM patient
LEFT JOIN condition ON condition.subject = patient
WHERE condition.code.subsumes('SNOMED|73211009')  -- Diabetes
GROUP BY patient.id, patient.gender;
```

Pathling stores FHIR in Parquet and queries with SparkSQL — analytics speed approaches OMOP. It can serve as a temporary bridge if you don't yet want to build a full OMOP CDM.

## 6. FHIR-OMOP-on-FHIR

Joint HL7 + OHDSI working group since 2020. 2026 deliverables:
- Official Implementation Guide (ig.fhir.org/...)
- Maintained mapping tables
- HAPI FHIR plugin → query OMOP CDM as FHIR
- OMOP-on-FHIR reference server (Georgia Tech)

→ A single server can serve OMOP data through a FHIR interface, or convert FHIR → OMOP automatically.

## 7. OHDSI Sql On FHIR (SOF)

Sql On FHIR (SOF) is a newer project (2024-2026) that exposes FHIR resources as SQL views. Similar to Pathling, but the spec is open:
- ViewDefinition resource (R4 / R5)
- Reference implementations: HAPI, Aidbox
- Output: flat tabular views → easy to load into OMOP

## 8. Deploying in Vietnam

### 8.1 Recommended pattern

![Recommended pattern](/images/blog/diagrams/omop-fhir-mapping-bridge-d05.webp)

### 8.2 Adapters you need to build

- ICD-10 VN → SNOMED (USAGI with manual review)
- MoH drug catalog → RxNorm
- DVKT (medical service) catalog → SNOMED procedure
- 54 ethnicities → custom vocabulary
- BHYT type → Payer concept (custom)

See [OMOP for Vietnam — BHYT, HSDT, ICD-10 VN, 54 ethnicities](/blog/omop-viet-nam-bhyt-hsdt).

## 9. Mapping pitfalls

- ❌ A `MedicationRequest` that hasn't been **filled** → don't push it into DRUG_EXPOSURE (don't confuse with MedicationStatement = the patient actually took it)
- ❌ Encounters with status `cancelled` → exclude from VISIT
- ❌ Observations marked `not-done` → don't push into MEASUREMENT
- ❌ FHIR Subscription notifications → DO NOT push into OMOP (operational only)
- ❌ Provenance / AuditEvent → don't map to OMOP
- ❌ Multiple `Patient.identifier` values → pick one as `person_source_value` (pseudonymized national ID)
- ❌ Many-to-one mappings (e.g., 3 MedicationAdministrations in one day) → must be grouped by clinical logic

## 10. Validating the bridge

Checks to run:
- # patients in FHIR == # rows in PERSON
- Total Encounters == total VISIT_OCCURRENCE
- Total Conditions == total CONDITION_OCCURRENCE
- DQD passes on the new CDM
- Sample 100 patients: trace forward (FHIR → OMOP) and backward

## 11. Hybrid pattern

![Hybrid pattern](/images/blog/diagrams/omop-fhir-mapping-bridge-d06.webp)

Start small and scale up. You don't have to build OMOP from day one — Pathling can carry phase 1.

## 12. Further reading

- HL7 FHIR-to-OMOP Implementation Guide
- Pathling docs: pathling.csiro.au
- OMOP-on-FHIR Georgia Tech: github.com/Georgia-Tech-CSE
- OHDSI Working Group "FHIR and OMOP"
- SOF (SQL on FHIR) spec
- Vietnam: community FHIR profiles and mappings (in progress)

## Conclusion

FHIR + OMOP isn't a choice — it's the standard 2026 pattern. A solid bridge enables real-time operations and multi-source RWE analytics in the same organization. Vietnam has the opportunity to build an integrated stack from day one, with no legacy migration to worry about.

Next up: [OMOP for Vietnam — BHYT, HSDT, ICD-10 VN, 54 ethnicities](/blog/omop-viet-nam-bhyt-hsdt).
