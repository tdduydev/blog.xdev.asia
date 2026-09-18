---
id: 02770003-omop-cdm5-b001-000000000001
title: "OMOP CDM tổng quan: vì sao cần chuẩn hoá dữ liệu y tế cho RWE"
slug: omop-cdm-tong-quan-vi-sao-can-chuan-hoa
excerpt: >-
  Real-World Evidence (RWE) đang thay đổi cách FDA, EMA và các cơ quan quản lý
  ra quyết định. OMOP CDM là chuẩn dữ liệu cho phép chạy 1 nghiên cứu trên
  hàng trăm tổ chức cùng lúc. Bài viết giới thiệu OHDSI, CDM 5.4 và bối cảnh VN.
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

Năm 2026, hơn **800 triệu bệnh nhân** trên thế giới đã được chuẩn hoá theo OMOP Common Data Model. FDA Sentinel, EMA DARWIN EU, EHDEN (200+ data partner châu Âu), N3C (Mỹ với COVID-19) đều dùng OMOP. Bài viết này giải thích vì sao OMOP quan trọng và phù hợp cho Việt Nam khi triển khai HSDT theo Quyết định 3516/QĐ-BYT.

## 1. RWD và RWE — khác biệt cốt lõi

- **RWD (Real-World Data)**: dữ liệu y tế thô từ EHR, claim BHYT, registry, wearable, app sức khoẻ
- **RWE (Real-World Evidence)**: insight có context và nghiêm ngặt khoa học, dùng được cho quyết định lâm sàng/regulatory

Ví dụ:
- RCT (clinical trial) trả lời "Thuốc A có hiệu quả không trên 1000 bệnh nhân được chọn lọc?"
- RWE trả lời "Thuốc A trong thực tế trên 1 triệu bệnh nhân Việt Nam có gì khác RCT? Phụ thuộc tuổi/giới/comorbidity ra sao?"

RWE quan trọng vì RCT chỉ chiếm <5% câu hỏi lâm sàng quan trọng.

## 2. Vì sao cần Common Data Model

![2. Vì sao cần Common Data Model](/images/blog/diagrams/omop-cdm-tong-quan-vi-sao-can-chuan-hoa-d01.webp)

5 lợi ích:
1. **Phân tích đa nguồn**: 1 nghiên cứu chạy trên 200 tổ chức cùng lúc (federated)
2. **Reproducibility**: code R/SQL chạy y hệt trên mọi CDM
3. **Vocabulary thống nhất**: ICD/SNOMED/RxNorm/LOINC đã được map sẵn
4. **Open source tooling**: ATLAS, HADES, DQD, Achilles miễn phí
5. **Network**: tham gia EHDEN, OHDSI workgroup, có người support

## 3. Lịch sử OMOP và OHDSI

![3. Lịch sử OMOP và OHDSI](/images/blog/diagrams/omop-cdm-tong-quan-vi-sao-can-chuan-hoa-d02.webp)

OHDSI = Observational Health Data Sciences and Informatics. Không phải công ty — là cộng đồng mở (Apache 2.0), có working group, network studies, annual symposium.

## 4. Stack OHDSI 2026

![4. Stack OHDSI 2026](/images/blog/diagrams/omop-cdm-tong-quan-vi-sao-can-chuan-hoa-d03.webp)

## 5. CDM 5.4 — 37 bảng theo nhóm

| Nhóm | Bảng tiêu biểu |
|---|---|
| **Clinical Data** | PERSON, VISIT_OCCURRENCE, CONDITION_OCCURRENCE, DRUG_EXPOSURE, PROCEDURE_OCCURRENCE, MEASUREMENT, OBSERVATION, DEVICE_EXPOSURE, NOTE, NOTE_NLP, SPECIMEN, DEATH, EPISODE |
| **Health System** | LOCATION, CARE_SITE, PROVIDER |
| **Health Economics** | PAYER_PLAN_PERIOD, COST |
| **Standardized Vocabularies** | CONCEPT, VOCABULARY, DOMAIN, CONCEPT_RELATIONSHIP, CONCEPT_ANCESTOR, CONCEPT_SYNONYM, CONCEPT_CLASS, RELATIONSHIP, DRUG_STRENGTH |
| **Derived Elements** | DRUG_ERA, DOSE_ERA, CONDITION_ERA, COHORT, COHORT_DEFINITION |
| **Metadata** | CDM_SOURCE, METADATA |

PERSON là trung tâm — mọi event clinical đều có FK `person_id`.

## 6. Vocabulary — trái tim của CDM

OMOP không tự chế ra vocabulary. Nó dùng các chuẩn quốc tế và **chọn 1 Standard Concept** cho mỗi khái niệm:

| Domain | Standard Vocabulary | Source phổ biến |
|---|---|---|
| Condition | SNOMED CT | ICD-10, ICD-9 |
| Drug | RxNorm (Mỹ) / RxNorm Extension | NDC, ATC, danh mục thuốc VN |
| Procedure | SNOMED CT, CPT4, ICD-10-PCS | DVKT VN |
| Measurement | LOINC, SNOMED CT | local lab code |
| Observation | SNOMED CT, LOINC | local |
| Unit | UCUM | local |
| Visit | SNOMED CT (visit subset) | local |

ETL phải map source code → standard concept_id. Source code vẫn lưu trong `*_source_value` để truy vết.

## 7. Use case OMOP

| Use case | Ví dụ thực |
|---|---|
| **Drug safety** | Sentinel theo dõi side effect mọi thuốc post-market |
| **Comparative effectiveness** | Metformin + SGLT2 vs Metformin + DPP4 cho diabetes |
| **Patient-Level Prediction** | Dự đoán hospital readmission trong 30 ngày |
| **Disease characterization** | Mô tả epidemiology của 1 bệnh hiếm |
| **Health economics** | Phân tích chi phí KCB trên dân số BHYT |
| **AI/ML training** | Cohort chuẩn hoá làm dataset cho clinical LLM |

## 8. So sánh với các CDM khác

| CDM | Cộng đồng | Mạnh ở | Yếu hơn OMOP |
|---|---|---|---|
| **OMOP** | OHDSI, mở | Vocabulary, federated, tooling | — |
| **i2b2** | Harvard / cộng đồng | UI tự built-in | Vocabulary bớt chuẩn hoá |
| **PCORnet** | PCORI Mỹ | Đơn giản, claim-friendly | Phân tích sâu hạn chế |
| **Sentinel** | FDA Mỹ | Drug safety pharmacovigilance | Đóng, chỉ FDA |
| **CDISC** | Trial data | Clinical trial submission | Không cho RWE |

OMOP tổng hợp nhất, được FDA, EMA dùng — đây là lý do nên đầu tư.

## 9. Bối cảnh Việt Nam

Quyết định 3516/QĐ-BYT (11/2025) — Chuyển đổi số y tế 2025-2030:
- Hệ thống dữ liệu y tế quốc gia
- HSDT trên VNeID (34M+ bản ghi 1/2026)
- BHYT điện tử full coverage
- Khuyến khích nghiên cứu thực chứng

OMOP rất phù hợp cho data lake nghiên cứu quốc gia:
- Có thể chuẩn hoá nhiều nguồn (BV công, BV tư, BHYT, registry) cùng lúc
- Cho phép federated analytics — dữ liệu nhạy cảm không cần di chuyển
- Open source — không phụ thuộc vendor
- Cộng đồng OHDSI sẵn sàng support

Một số nhóm nghiên cứu (ĐHQG-HCM, BV ĐHYHN, viện y tế công cộng) đã thử nghiệm. Cơ hội rất lớn cho ai làm tiên phong.

## 10. OMOP có thay thế FHIR không?

KHÔNG — bổ trợ. Xem [Roadmap HL7 FHIR Practitioner](/roadmap/hl7-fhir):

| Tiêu chí | FHIR | OMOP |
|---|---|---|
| Mục tiêu | Trao đổi vận hành | Phân tích/RWE |
| Schema | Resource độc lập (50+ resource type) | 37 bảng quan hệ chuẩn hoá |
| Vocabulary | CodeableConcept linh hoạt | Standard Concept bắt buộc |
| Transport | REST API | SQL trên DB / file extract |
| Real-time | Có (Subscription, CDS Hooks) | Không (batch ETL) |
| Use case | EHR, mobile, telemedicine | Network study, ML, BI |

Trong cùng tổ chức nên dùng cả hai — FHIR cho operational layer, OMOP cho analytics layer. Bridge xem bài [FHIR ↔ OMOP](/blog/omop-fhir-mapping-bridge).

## 11. Bắt đầu từ đâu?

1. Đọc Book of OHDSI (free, open source)
2. Cài Eunomia (CDM mẫu R package) để thực hành SQL
3. Lookup concept trên Athena (athena.ohdsi.org)
4. Dựng Broadsea (Docker compose ATLAS + WebAPI + Postgres)
5. Tham gia OHDSI forum

## Kết luận

OMOP CDM là chuẩn dữ liệu cho thế hệ nghiên cứu y tế tiếp theo. Cộng đồng OHDSI mở, tooling miễn phí, và VN có cơ hội lớn để xây data lake nghiên cứu quốc gia. Đầu tư học OMOP bây giờ là đầu tư đúng thời điểm.

Bài tiếp: [So sánh OMOP, FHIR, i2b2, PCORnet, Sentinel — chọn CDM nào](/blog/omop-vs-fhir-vs-i2b2-pcornet) · Hoặc xem [Roadmap OMOP CDM Practitioner](/roadmap/omop-cdm).
