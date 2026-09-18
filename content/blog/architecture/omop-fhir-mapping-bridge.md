---
id: 02770003-omop-cdm5-b001-000000000009
title: "FHIR ↔ OMOP: bridge giữa operational và analytics layer"
slug: omop-fhir-mapping-bridge
excerpt: >-
  Tổ chức 2026 thường có cả FHIR (operational) và OMOP (analytics). Bài viết
  hướng dẫn mapping resource ↔ table, FHIR-OMOP-on-FHIR working group, Pathling,
  Bulk Data Export pipeline và pattern triển khai cho VN.
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

FHIR là chuẩn vận hành. OMOP là chuẩn phân tích. Cả hai cùng tồn tại trong tổ chức trưởng thành 2026. Bài viết hướng dẫn bridge 2 thế giới: mapping, tooling, pipeline.

## 1. Vì sao cần cả hai

![1. Vì sao cần cả hai](/images/blog/diagrams/omop-fhir-mapping-bridge-d01.webp)

FHIR mạnh real-time, JSON, REST. OMOP mạnh batch SQL, vocabulary chuẩn, network study. Mỗi cái đứng một mặt trận → bridge chứ không thay thế.

## 2. Mapping resource ↔ table

Cộng đồng FHIR-OMOP-on-FHIR (joint HL7 + OHDSI workgroup) duy trì mapping chính thức.

### 2.1 Bảng mapping cơ bản

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
| Coverage | PAYER_PLAN_PERIOD | BHYT, BHYT bổ sung |
| Practitioner | PROVIDER | |
| Organization (provider) | CARE_SITE | |
| Location | LOCATION | |

### 2.2 Mapping detail Encounter → Visit_Occurrence

![2.2 Mapping detail Encounter → Visit_Occurrence](/images/blog/diagrams/omop-fhir-mapping-bridge-d02.webp)

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
| FHIR System URL VN | OMOP vocabulary |
|---|---|
| https://terminology.kcb.vn/CodeSystem/icd10vn | ICD10VN custom |
| https://terminology.kcb.vn/CodeSystem/danhmucthuoc | VN_DRUG (custom) |

## 4. Pipeline pattern

### 4.1 Bulk Export → ETL → CDM

![4.1 Bulk Export → ETL → CDM](/images/blog/diagrams/omop-fhir-mapping-bridge-d03.webp)

Lợi ích: standard FHIR, không cần FHIR backend hỗ trợ custom export. Đọc bài [FHIR Bulk Data Export & CDS Hooks](/blog/fhir-bulk-data-export-cds-hooks).

### 4.2 Real-time CDC pattern

![4.2 Real-time CDC pattern](/images/blog/diagrams/omop-fhir-mapping-bridge-d04.webp)

Ưu: FHIR luôn fresh; OMOP nightly aggregate.

## 5. Pathling — query FHIR như OMOP

[Pathling](https://pathling.csiro.au/) (CSIRO Australia) cho phép query FHIR data analytics-style:

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

Pathling lưu FHIR ở Parquet, query SparkSQL → tốc độ analytics gần OMOP. Có thể dùng làm bridge tạm thời nếu chưa muốn build OMOP CDM full.

## 6. FHIR-OMOP-on-FHIR

Working group joint HL7 + OHDSI từ 2020. Output 2026:
- Implementation Guide chính thức (ig.fhir.org/...)
- Mapping table maintained
- HAPI FHIR plugin → query OMOP CDM as FHIR
- OMOP-on-FHIR server reference (Georgia Tech)

→ Một server có thể serve OMOP data dưới interface FHIR, hoặc convert FHIR → OMOP automatic.

## 7. OHDSI Sql On FHIR (SOF)

Sql On FHIR (SOF) là project mới (2024-2026) cho phép expose FHIR resource as SQL view. Tương tự Pathling nhưng spec mở:
- ViewDefinition resource (R4 / R5)
- Reference implementation: HAPI, Aidbox
- Output: flat tabular view → load vào OMOP dễ dàng

## 8. Triển khai cho VN

### 8.1 Pattern recommended

![8.1 Pattern recommended](/images/blog/diagrams/omop-fhir-mapping-bridge-d05.webp)

### 8.2 Adapter cần build

- ICD-10 VN → SNOMED (USAGI manual review)
- Danh mục thuốc BYT → RxNorm
- Danh mục DVKT → SNOMED procedure
- Dân tộc 54 → Custom Vocabulary
- BHYT type → Payer concept (Custom)

Đọc thêm [OMOP cho VN — BHYT, HSDT, ICD-10 VN, dân tộc 54](/blog/omop-viet-nam-bhyt-hsdt).

## 9. Pitfall mapping

- ❌ MedicationRequest **chưa filled** → đừng đưa vào DRUG_EXPOSURE (nhầm với MedicationStatement = patient actually took)
- ❌ Encounter status `cancelled` → bỏ qua khỏi VISIT
- ❌ Observation `not-done` → không vào MEASUREMENT
- ❌ FHIR có Subscription notification → KHÔNG đưa vào OMOP (operational only)
- ❌ Provenance / AuditEvent → không map sang OMOP
- ❌ Patient.identifier có nhiều → chọn 1 làm `person_source_value` (CCCD pseudonymized)
- ❌ Mapping nhiều-1 (vd 3 MedicationAdministration trong 1 ngày) → cần group theo logic clinical

## 10. Validate bridge

Kiểm tra:
- Số patient FHIR == số PERSON
- Tổng Encounter == tổng VISIT_OCCURRENCE
- Tổng Condition == tổng CONDITION_OCCURRENCE
- DQD pass trên CDM mới
- Sample 100 patient: trace forward (FHIR → OMOP) và backward

## 11. Pattern hỗn hợp

![11. Pattern hỗn hợp](/images/blog/diagrams/omop-fhir-mapping-bridge-d06.webp)

Tổ chức bắt đầu nhỏ, scale dần. Không nhất thiết build OMOP từ đầu — có thể dùng Pathling trong giai đoạn 1.

## 12. Tài liệu thêm

- HL7 FHIR-to-OMOP Implementation Guide
- Pathling docs: pathling.csiro.au
- OMOP-on-FHIR Georgia Tech: github.com/Georgia-Tech-CSE
- OHDSI Working Group "FHIR and OMOP"
- SOF (SQL on FHIR) spec
- VN: profile FHIR và mapping cộng đồng (đang phát triển)

## Kết luận

FHIR + OMOP không phải lựa chọn — đó là pattern tiêu chuẩn 2026. Bridge tốt cho phép vận hành real-time và phân tích RWE đa nguồn cùng tổ chức. VN có cơ hội xây stack tích hợp ngay từ đầu, không cần legacy migration.

Bài tiếp: [OMOP cho VN — BHYT, HSDT, ICD-10 VN, dân tộc 54](/blog/omop-viet-nam-bhyt-hsdt).
