---
id: 02770003-omop-cdm5-b001-000000000003
title: "Standardized Vocabularies & Athena: trái tim của OMOP CDM"
slug: omop-standardized-vocabularies-athena
excerpt: >-
  Vocabulary là phần khó nhất nhưng quan trọng nhất của OMOP. Bài viết giải
  thích Concept, Standard vs Source, Domain, Vocabulary, ConceptRelationship,
  ConceptAncestor và workflow tải/lookup trên Athena cho dự án Việt Nam.
featured_image: /images/blog/omop-vocabulary-featured.webp
type: blog
reading_time: 16
view_count: 0
meta: null
published_at: '2026-05-07T16:00:00.000000Z'
created_at: '2026-05-07T16:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat7-7007-a007-000000000007, name: Kiến trúc hệ thống, slug: architecture}
tags: [{name: OMOP, slug: omop}, {name: OHDSI, slug: ohdsi}, {name: Vocabulary, slug: vocabulary}, {name: Healthcare, slug: healthcare}]
comments: []
---

Bạn có thể bỏ qua phần này và làm OMOP — nhưng analytic sẽ luôn sai. Vocabulary là phần **làm cho OMOP có ý nghĩa thật**. Bài viết deep dive Concept, hierarchy, mapping và Athena workflow.

## 1. Vì sao vocabulary quan trọng

Ví dụ thực tế: bạn có 3 nguồn dữ liệu:
- BV A: code chẩn đoán "ICD-10 E11.9"
- BV B: code "ICD-10 E11" 
- BV C: code SNOMED "44054006"

Cả 3 cùng nói về **Diabetes type 2**. Nếu không chuẩn hoá, query "tổng số bệnh nhân Diabetes type 2" sẽ ra số sai.

OMOP giải quyết bằng cách **chọn 1 Standard Concept** (ở đây là `concept_id = 201826`, SNOMED `44054006`) và map mọi source code về đó.

## 2. Concept — đơn vị cơ bản

Concept là 1 hàng trong bảng `CONCEPT`:

| concept_id | concept_name | domain_id | vocabulary_id | concept_class_id | standard_concept | concept_code |
|---|---|---|---|---|---|---|
| 201826 | Type 2 diabetes mellitus | Condition | SNOMED | Clinical Finding | S | 44054006 |
| 192279 | Diabetic complication | Condition | SNOMED | Clinical Finding | C | 74627003 |
| 45757466 | E11 (ICD-10-CM) | Condition | ICD10CM | ICD10CM code | (null = Source) | E11 |

`standard_concept`:
- **S** (Standard): dùng để phân tích
- **C** (Classification): để classify, không phải standard
- **NULL** (Source): code gốc, dùng để lưu source_value

## 3. Vocabulary và Domain

![3. Vocabulary và Domain](/images/blog/diagrams/omop-standardized-vocabularies-athena-d01.webp)

| Domain | Bảng OMOP | Standard Vocabulary chính |
|---|---|---|
| Condition | CONDITION_OCCURRENCE | SNOMED CT |
| Drug | DRUG_EXPOSURE | RxNorm + RxNorm Extension |
| Procedure | PROCEDURE_OCCURRENCE | SNOMED CT, CPT4, ICD-10-PCS |
| Measurement | MEASUREMENT | LOINC, SNOMED CT |
| Observation | OBSERVATION | SNOMED CT, LOINC |
| Device | DEVICE_EXPOSURE | SNOMED CT |
| Unit | (across) | UCUM |
| Race / Ethnicity | PERSON | OMOP Custom (cần map cho VN) |

## 4. Concept Relationship

Bảng `CONCEPT_RELATIONSHIP` lưu mối liên hệ giữa concept:

| concept_id_1 | concept_id_2 | relationship_id |
|---|---|---|
| 45757466 (ICD10 E11) | 201826 (SNOMED Diabetes T2) | "Maps to" |
| 201826 | 45757466 | "Mapped from" |
| 1503297 (Metformin) | 1503328 (Metformin 500mg tablet) | "Has form" |

`Maps to` cực quan trọng — đây là cách map source → standard:

```sql
-- Tìm Standard Concept tương ứng với ICD-10 E11
SELECT c2.concept_id, c2.concept_name
FROM concept c1
JOIN concept_relationship cr ON c1.concept_id = cr.concept_id_1 
  AND cr.relationship_id = 'Maps to'
JOIN concept c2 ON cr.concept_id_2 = c2.concept_id
WHERE c1.vocabulary_id = 'ICD10CM' AND c1.concept_code = 'E11';
```

## 5. Concept Ancestor — hierarchy

`CONCEPT_ANCESTOR` lưu hierarchy descendant:

```sql
-- Tìm tất cả con cháu của "Diabetes mellitus" (Type 1, Type 2, gestational, ...)
SELECT c.concept_id, c.concept_name, ca.min_levels_of_separation
FROM concept_ancestor ca
JOIN concept c ON ca.descendant_concept_id = c.concept_id
WHERE ca.ancestor_concept_id = 201820  -- Diabetes mellitus
  AND c.standard_concept = 'S';
```

Cực mạnh khi định nghĩa cohort: "bệnh nhân tiểu đường bất kỳ loại" = chỉ cần ancestor 201820.

## 6. Athena — portal vocabulary

![6. Athena — portal vocabulary](/images/blog/diagrams/omop-standardized-vocabularies-athena-d02.webp)

Quy trình:
1. Tạo account miễn phí trên athena.ohdsi.org
2. Chọn vocabulary cần (SNOMED, RxNorm, LOINC, ICD10CM, ICD10, ATC, ...)
3. Một số vocabulary cần **license** (SNOMED CT cho VN: cần đăng ký SNOMED International affiliate license — miễn phí cho VN vì là low-income member)
4. Download zip — chứa CONCEPT.csv, CONCEPT_RELATIONSHIP.csv, ...
5. Import vào CDM database

## 7. Import vocabulary vào Postgres

```sql
-- Tạo schema và bảng theo CommonDataModel DDL
\i OMOPCDM_postgresql_5.4_ddl.sql

-- Import CSV (ví dụ)
COPY concept FROM '/path/CONCEPT.csv' DELIMITER E'\t' CSV HEADER QUOTE E'\b';
COPY concept_relationship FROM '/path/CONCEPT_RELATIONSHIP.csv' DELIMITER E'\t' CSV HEADER QUOTE E'\b';
COPY concept_ancestor FROM '/path/CONCEPT_ANCESTOR.csv' DELIMITER E'\t' CSV HEADER QUOTE E'\b';
-- ...

-- Tạo index
\i OMOPCDM_postgresql_5.4_indices.sql

-- Tạo PK
\i OMOPCDM_postgresql_5.4_primary_keys.sql
```

Sau khi import: ~6M concept (đầy đủ), ~12 GB. Có thể strip xuống bằng cách chỉ chọn vocabulary cần.

## 8. USAGI — code mapping tool

USAGI giúp map code source (ICD-10 VN, danh mục thuốc BYT) sang Standard Concept:

![8. USAGI — code mapping tool](/images/blog/diagrams/omop-standardized-vocabularies-athena-d03.webp)

Workflow:
1. File CSV input có cột `source_code, source_name`
2. USAGI search bằng Lucene
3. User review top match, chấp nhận hoặc sửa
4. Export → `SOURCE_TO_CONCEPT_MAP` table

## 9. Vocabulary cho VN

![9. Vocabulary cho VN](/images/blog/diagrams/omop-standardized-vocabularies-athena-d04.webp)

### 9.1 Custom vocabulary cho VN

Khi không có standard tương ứng (vd dân tộc 54 VN), tạo **Custom Vocabulary** với:
- `vocabulary_id = 'VN_DANTOC'`
- `concept_id` từ 2 tỷ trở lên (range OHDSI dành cho custom)
- Đăng ký vào bảng VOCABULARY

```sql
INSERT INTO vocabulary VALUES
  ('VN_DANTOC', 'Dân tộc Việt Nam (54)', 'http://...', '1.0', 2000000001);

INSERT INTO concept VALUES
  (2000001001, 'Kinh', 'Race', 'VN_DANTOC', 'Race', 'S', '01', NULL, NULL);
-- ...
```

### 9.2 SNOMED CT VN

VN là **Member của SNOMED International** (đăng ký 2024 qua MOH). Affiliate license miễn phí với cá nhân/tổ chức trong nước. Đăng ký tại snomed.org.

## 10. Vocabulary upgrade

Athena release vocabulary monthly. Quy trình upgrade:

![10. Vocabulary upgrade](/images/blog/diagrams/omop-standardized-vocabularies-athena-d05.webp)

Lưu ý: concept_id **stable** giữa version, nhưng `Maps to` relationship có thể thay đổi → cần re-run ETL để cập nhật `*_concept_id` columns.

## 11. SQL pattern phổ biến

### 11.1 Lookup standard concept từ source code

```sql
SELECT c2.concept_id, c2.concept_name, c2.vocabulary_id
FROM concept c1
JOIN concept_relationship cr ON c1.concept_id = cr.concept_id_1 
  AND cr.relationship_id = 'Maps to'
JOIN concept c2 ON cr.concept_id_2 = c2.concept_id
WHERE c1.vocabulary_id = 'ICD10CM' 
  AND c1.concept_code = 'E11.9';
```

### 11.2 Tìm tất cả descendant của 1 ancestor

```sql
SELECT c.concept_id, c.concept_name
FROM concept_ancestor ca
JOIN concept c ON ca.descendant_concept_id = c.concept_id
WHERE ca.ancestor_concept_id = 201820  -- Diabetes mellitus
  AND c.standard_concept = 'S';
```

### 11.3 RxNorm: tìm ingredient → tất cả product chứa nó

```sql
SELECT product.concept_id, product.concept_name
FROM concept ing
JOIN concept_ancestor ca ON ing.concept_id = ca.ancestor_concept_id
JOIN concept product ON ca.descendant_concept_id = product.concept_id
WHERE ing.concept_name = 'Metformin'
  AND ing.concept_class_id = 'Ingredient'
  AND product.concept_class_id IN ('Branded Drug', 'Clinical Drug');
```

## 12. Pitfall thường gặp

- ❌ Quên vocabulary upgrade → analytic dùng concept obsolete
- ❌ Map source→standard sai → cohort lệch hàng nghìn người
- ❌ Dùng concept Classification (C) thay vì Standard (S) trong analytic
- ❌ Quên hierarchy → cohort thiếu loại biến thể (vd "Diabetes" mà thiếu Type 1.5)
- ❌ Custom concept_id trùng với chuẩn (phải dùng 2-billion+ range)
- ❌ Không backup vocabulary trước upgrade

## 13. Workflow đề xuất cho dự án mới

1. Đọc Themis convention OHDSI
2. Tải vocabulary subset (SNOMED + ICD10CM + RxNorm + LOINC + ATC + UCUM) — đủ cho 90% VN
3. Đăng ký SNOMED International affiliate (miễn phí VN)
4. Import Postgres + index
5. Setup USAGI cho mapping team
6. Map source code lớn nhất trước (top 100 ICD-10 + top 200 thuốc = cover 80% volume)
7. Lưu mapping vào `SOURCE_TO_CONCEPT_MAP` + commit Git
8. Schedule vocabulary upgrade hàng quý

## Kết luận

Vocabulary là 50% giá trị của OMOP. Đầu tư đúng — bạn có thể join và phân tích bất kỳ dataset nào. Đầu tư sai — analytic của bạn sẽ luôn bị nghi ngờ. Bắt đầu nhỏ, review chặt, upgrade đều.

Bài tiếp: [OMOP Core Clinical Tables — Person, Visit, Condition, Drug, Measurement, Observation](/blog/omop-core-clinical-tables-deep-dive).
