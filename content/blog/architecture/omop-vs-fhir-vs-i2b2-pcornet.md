---
id: 02770003-omop-cdm5-b001-000000000002
title: "So sánh OMOP, FHIR, i2b2, PCORnet, Sentinel: chọn CDM nào"
slug: omop-vs-fhir-vs-i2b2-pcornet
excerpt: >-
  Common Data Model nào phù hợp với tổ chức của bạn? Bài viết so sánh chi tiết
  OMOP, FHIR, i2b2, PCORnet, Sentinel theo schema, vocabulary, governance,
  tooling, use case và đưa decision tree để chọn.
featured_image: /images/blog/omop-vs-other-cdm-featured.webp
type: blog
reading_time: 13
view_count: 0
meta: null
published_at: '2026-05-07T15:30:00.000000Z'
created_at: '2026-05-07T15:30:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat7-7007-a007-000000000007, name: Kiến trúc hệ thống, slug: architecture}
tags: [{name: OMOP, slug: omop}, {name: HL7 FHIR, slug: hl7-fhir}, {name: Healthcare, slug: healthcare}, {name: CDM, slug: cdm}]
comments: []
---

"Chúng ta nên dùng OMOP, FHIR hay i2b2?" — câu hỏi gặp ở mọi tổ chức bắt đầu hành trình data y tế. Không có câu trả lời "1-cái-cho-tất-cả". Bài viết này giúp bạn chọn đúng theo use case.

## 1. Bản đồ CDM y tế

![1. Bản đồ CDM y tế](/images/blog/diagrams/omop-vs-fhir-vs-i2b2-pcornet-d01.webp)

## 2. Bảng so sánh

| Tiêu chí | OMOP | FHIR | i2b2 | PCORnet | Sentinel |
|---|---|---|---|---|---|
| Owner | OHDSI (open) | HL7 (open) | Harvard (open) | PCORI (US) | FDA (US) |
| Năm phát triển | 2008 | 2014 | 2007 | 2014 | 2008 |
| Mục tiêu chính | RWE đa nguồn | Trao đổi vận hành | Self-service query | Pragmatic trial | Drug safety |
| Schema | 37 bảng quan hệ | Resource (REST) | Star schema (fact + dim) | Tabular flat | Tabular flat |
| Vocabulary | Standard Concept (chuẩn hoá) | CodeableConcept (linh hoạt) | Local | Local + standard | Local |
| Tooling open | ATLAS, HADES, DQD, ACHILLES | HAPI, Cerner SMART | i2b2 web client | Tự build | Closed |
| Real-time | ❌ | ✅ | ❌ | ❌ | ❌ |
| Federated network | ✅ EHDEN, DARWIN, OHDSI | ⚠ qua Bulk Export | ✅ SHRINE | ✅ DRN | ✅ |
| Best for | Phân tích quan sát | EHR/Mobile/Cloud | Hospital query | RCT pragmatic | Pharmacovigilance |
| Adoption 2026 | 800M patient | Toàn ngành | ~200 site | ~70 site | FDA-internal |
| Cộng đồng VN | Bắt đầu | Phát triển nhanh | Hạn chế | Không | Không |

## 3. Khác biệt cốt lõi

### 3.1 Schema philosophy

![3.1 Schema philosophy](/images/blog/diagrams/omop-vs-fhir-vs-i2b2-pcornet-d02.webp)

OMOP = relational DB chuẩn hoá → tối ưu SQL analytic.
FHIR = document-oriented Resource → tối ưu API exchange.

### 3.2 Vocabulary

OMOP **bắt buộc** map mọi code về Standard Concept (vd ICD-10 → SNOMED). FHIR **không bắt buộc** — bạn có thể dùng local code system nếu nhất quán nội bộ.

→ OMOP đắt hơn ETL nhưng analytic mạnh hơn nhiều.

### 3.3 Federated vs centralized

OMOP cho phép chạy nghiên cứu mà không di chuyển dữ liệu (study package R chạy local mỗi partner, chỉ tổng hợp result). Cực phù hợp cho VN với **Luật Bảo vệ dữ liệu cá nhân 2025** (hiệu lực 1/1/2026, kế thừa và nâng cấp Nghị định 13/2023/NĐ-CP) yêu cầu lưu trữ dữ liệu nhạy cảm trong nước và xin đồng ý xử lý đặc thù.

![3.3 Federated vs centralized](/images/blog/diagrams/omop-vs-fhir-vs-i2b2-pcornet-d03.webp)

## 4. Decision tree

![4. Decision tree](/images/blog/diagrams/omop-vs-fhir-vs-i2b2-pcornet-d04.webp)

## 5. Hybrid pattern: FHIR + OMOP

Đây là pattern phổ biến nhất 2026:

![5. Hybrid pattern: FHIR + OMOP](/images/blog/diagrams/omop-vs-fhir-vs-i2b2-pcornet-d05.webp)

→ EHR vận hành dùng FHIR (real-time, web/mobile friendly), data lake nghiên cứu dùng OMOP (phân tích federated). Đọc [FHIR ↔ OMOP bridge](/blog/omop-fhir-mapping-bridge).

## 6. Vì sao OMOP thắng cho RWE

![6. Vì sao OMOP thắng cho RWE](/images/blog/diagrams/omop-vs-fhir-vs-i2b2-pcornet-d06.webp)

So sánh: i2b2 cộng đồng nhỏ hơn, ít update; PCORnet đóng hơn cho US; Sentinel chỉ FDA dùng; CDISC chỉ cho trial submission.

## 7. Khi nào KHÔNG chọn OMOP?

- Nhu cầu **chỉ là EHR exchange real-time** → FHIR đủ
- **Dataset rất nhỏ** (vài trăm bệnh nhân) → SQL query trực tiếp đơn giản hơn
- **Submit FDA new drug** → SDTM bắt buộc
- **Pharmacovigilance Mỹ** → Sentinel
- Tổ chức **không có data engineer** → ETL OMOP cần đầu tư

## 8. Khuyến nghị cho VN

| Tổ chức | Khuyến nghị |
|---|---|
| Bệnh viện công lớn | FHIR (vận hành) + OMOP (data warehouse nghiên cứu) |
| Bệnh viện tư | FHIR đủ ban đầu, OMOP khi có nghiên cứu RWE |
| Viện nghiên cứu | OMOP làm trọng tâm, ETL từ nhiều BV partner |
| BHYT / cơ quan QL | OMOP cho data lake quốc gia, FHIR cho exchange với BV |
| Startup AI y tế | FHIR + OMOP — FHIR cho integration, OMOP cho training data |

## 9. Migration giữa các CDM

Có thể migrate từ:
- **i2b2 → OMOP**: tool i2b2-to-OMOP của Georgia Tech
- **PCORnet → OMOP**: ETL có sẵn của Duke
- **FHIR → OMOP**: FHIR-OMOP-on-FHIR (HL7 + OHDSI)
- **Sentinel → OMOP**: chuyển vì cần phân tích sâu hơn

OMOP thường là điểm đến cuối cùng vì tooling phong phú nhất.

## 10. Tài nguyên cộng đồng

- **OHDSI Forum** — answer trong 24h
- **Book of OHDSI** — sách giáo khoa free
- **EHDEN Academy** — khoá học miễn phí
- **OHDSI Symposium** — annual, có virtual track
- **Working groups** — Vocabulary, Themis (ETL convention), AI/ML, Vietnam (chưa có nhưng chờ ai khởi xướng!)

## Kết luận

CDM không phải zero-sum. Đa số tổ chức 2026 dùng FHIR + OMOP song song: FHIR cho operational, OMOP cho analytics. Nếu bạn ở VN và muốn làm RWE, AI clinical training, hay nghiên cứu y tế công cộng — OMOP là khoản đầu tư xứng đáng.

Bài tiếp: [Standardized Vocabularies & Athena — trái tim của OMOP CDM](/blog/omop-standardized-vocabularies-athena).
