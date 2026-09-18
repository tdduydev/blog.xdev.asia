---
id: 02770003-omop-cdm5-b001-000000000010
title: "OMOP cho Việt Nam: BHYT, HSDT, ICD-10 VN, dân tộc 54, Quyết định 3516/QĐ-BYT, Luật BVDLCN 2025"
slug: omop-viet-nam-bhyt-hsdt
excerpt: >-
  OMOP CDM phù hợp với Việt Nam ra sao? Bài viết phân tích bối cảnh chính sách
  (Quyết định 3516/QĐ-BYT, Luật Bảo vệ dữ liệu cá nhân 2025, Luật KCB
  15/2023, HSDT trên VNeID), mapping danh
  mục BYT, custom vocabulary và roadmap data lake nghiên cứu quốc gia.
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

VN 2026 có 3 yếu tố hội tụ tạo cơ hội lớn cho OMOP: chính sách (Quyết định 3516/QĐ-BYT), data scale (HSDT 34M+ trên VNeID, BHYT full coverage), và cộng đồng OHDSI mở. Bài viết phân tích cách triển khai OMOP cho VN từ chính sách đến code.

## 1. Bối cảnh chính sách 2026

![1. Bối cảnh chính sách 2026](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d01.webp)

### 1.1 Quyết định 3516/QĐ-BYT (11/2025)

Mục tiêu 2030:
- 100% cơ sở y tế công có HIS, EMR
- Hệ thống dữ liệu y tế quốc gia thống nhất
- Khuyến khích AI, big data trong y tế
- Liên thông dữ liệu BYT - BHXH - VNeID
- Khuyến khích nghiên cứu thực chứng dùng RWD

OMOP là **lựa chọn tự nhiên** cho mục tiêu RWD/RWE.

### 1.2 Luật Bảo vệ dữ liệu cá nhân 2025 (hiệu lực 1/1/2026)

> **Cập nhật 2026**: Luật Bảo vệ dữ liệu cá nhân (Quốc hội thông qua kỳ họp 9, ngày 26/6/2025) **thay thế và nâng cấp Nghị định 13/2023/NĐ-CP** kể từ 1/1/2026, bổ sung chế tài xử phạt hành chính mạnh hơn (đến 5% doanh thu năm), bắt buộc đánh giá tác động (DPIA), và quy định chuyển dữ liệu xuyên biên giới nghiêm ngặt hơn.

Yêu cầu xử lý dữ liệu y tế (dữ liệu cá nhân nhạy cảm — *sensitive personal data*):
- Đồng ý cụ thể, tách rời cho từng mục đích (research consent)
- Mã hoá at-rest, in-transit (bắt buộc)
- Audit log mọi truy cập, lưu tối thiểu 5 năm
- Lưu trữ trong nước; chuyển ra nước ngoài phải đồng ý + thông báo cơ quan bảo vệ dữ liệu
- DPO bắt buộc với tổ chức xử lý quy mô lớn
- DPIA bắt buộc trước khi triển khai mục đích mới
- Cơ chế xóa / chỉnh sửa dữ liệu theo yêu cầu

Pseudonymize CCCD/BHYT là yêu cầu bắt buộc trong OMOP `person_source_value`.

### 1.3 Luật Khám bệnh, chữa bệnh 15/2023/QH15 (hiệu lực 1/1/2024)

- Bắt buộc cơ sở KCB triển khai hồ sơ bệnh án điện tử (EMR) theo lộ trình
- Dữ liệu sức khoẻ cá nhân thuộc quyền của người bệnh → chia sẻ cho nghiên cứu cần consent
- Cho phép sử dụng dữ liệu y tế cho nghiên cứu khoa học khi pseudonymize đúng quy trình
- Kết hợp với Luật BVDLCN → cơ sở pháp lý đủ để build OMOP CDM nghiên cứu quốc gia.

## 2. Source data VN cho OMOP

![2. Source data VN cho OMOP](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d02.webp)

## 3. Mapping vocabulary VN

### 3.1 Danh mục có sẵn standard

| Danh mục VN | Standard tương ứng | Nguồn |
|---|---|---|
| ICD-10 VN (BYT) | ICD-10 → SNOMED qua Maps to | Cập nhật BYT, gốc WHO |
| Tên thuốc gốc | RxNorm Ingredient | Map ATC → RxNorm |
| Tên hoạt chất | RxNorm Ingredient | |
| Đơn vị đo | UCUM | Đa số chuẩn |
| LOINC test | LOINC | Một số phòng lab BV đã dùng |

### 3.2 Cần custom vocabulary

| Danh mục VN | Lý do custom | Strategy |
|---|---|---|
| Dân tộc 54 | Không có concept tương ứng | Vocabulary `VN_DANTOC` (54 concept) |
| Tỉnh/Huyện/Xã | Không khớp standard | Vocabulary `VN_GEO` 3 cấp |
| Loại BHYT | Không khớp Payer Mỹ | Vocabulary `VN_BHYT` (BHYT bắt buộc, hộ gia đình, học sinh, ...) |
| Hạng BV | Không có concept | Care_site setting custom |
| Danh mục thuốc BYT version 2025 | Cần map → RxNorm | USAGI mapping + custom cho thuốc cổ truyền |
| Danh mục DVKT | Custom procedure code | USAGI → SNOMED procedure |

### 3.3 Tạo vocabulary VN_DANTOC

```sql
INSERT INTO vocabulary (vocabulary_id, vocabulary_name, vocabulary_reference, vocabulary_version, vocabulary_concept_id) VALUES
  ('VN_DANTOC', 'Danh mục dân tộc Việt Nam', 'TCVN 54', '1.0', 2000000001);

INSERT INTO concept VALUES
  (2000000001, 'Vietnamese ethnicities (vocabulary)', 'Metadata', 'VN_DANTOC', 'Vocabulary', 'C', 'OMOP generated', NULL, NULL, NULL, NULL),
  (2000001001, 'Kinh', 'Race', 'VN_DANTOC', 'Race', 'S', '01', NULL, NULL, NULL, NULL),
  (2000001002, 'Tày', 'Race', 'VN_DANTOC', 'Race', 'S', '02', NULL, NULL, NULL, NULL),
  (2000001003, 'Thái', 'Race', 'VN_DANTOC', 'Race', 'S', '03', NULL, NULL, NULL, NULL),
  -- ... 54 dân tộc
  (2000001054, 'Dân tộc khác', 'Race', 'VN_DANTOC', 'Race', 'S', '99', NULL, NULL, NULL, NULL);
```

Concept_id từ 2 tỷ trở lên (range OHDSI dành cho custom).

### 3.4 Vocabulary thuốc cổ truyền

VN có nhiều thuốc YHCT không có RxNorm. Custom vocabulary `VN_YHCT`:

```sql
INSERT INTO concept VALUES
  (2000020001, 'Cảm xuyên hương', 'Drug', 'VN_YHCT', 'Branded Drug', 'S', 'YHCT001', ...),
  (2000020002, 'Hoạt huyết Nhất Nhất', 'Drug', 'VN_YHCT', 'Branded Drug', 'S', 'YHCT002', ...);
```

Cần làm việc với Cục Quản lý YHCT BYT để chuẩn hoá.

## 4. ETL pattern HSDT (VNeID)

HSDT (Hồ sơ sức khoẻ điện tử) trên VNeID có cấu trúc tương đối FHIR-like:

![4. ETL pattern HSDT (VNeID)](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d03.webp)

Lưu ý:
- HSDT chỉ có summary (tóm tắt) — không phải EMR đầy đủ
- → CDM xây từ HSDT có visit/condition cấp cao, không có chi tiết drug/measurement
- Bổ sung từ EMR BV cho chi tiết

## 5. ETL pattern BHYT

![5. ETL pattern BHYT](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d04.webp)

BHYT data có ưu điểm:
- Coverage lớn (~95M người)
- Code hoá tốt (theo BYT)
- Lịch sử lâu (>10 năm)

Hạn chế:
- Không có vital signs, lab values
- Không có symptom (chỉ chẩn đoán)
- Bias: chỉ thấy người đi KCB BHYT

→ Pair với EMR cho RWE đầy đủ.

## 6. Use case RWE cho VN

| Câu hỏi | Source data | Method |
|---|---|---|
| Hiệu quả phác đồ điều trị tăng huyết áp người Việt | EMR + BHYT | CohortMethod (PLE) |
| Dự đoán nguy cơ đột quỵ trong dân số tiểu đường | EMR + lab | PatientLevelPrediction (PLP) |
| Mô tả epidemiology bệnh K vùng miền | BHYT + Registry | Characterization |
| Theo dõi side effect vaccine COVID | HSDT + EMR | SCCS |
| Tỷ lệ kê đơn kháng sinh không phù hợp | EMR + Drug guideline | Custom analytic |
| Chi phí KCB theo bệnh comorbidity | BHYT + Cost | Health economics |
| Tham gia DARWIN EU study về bệnh hiếm | OMOP CDM | Strategus + share aggregate |

## 7. Roadmap data lake quốc gia

![7. Roadmap data lake quốc gia](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d05.webp)

Pilot pattern:
1. Chọn 5-10 BV đại diện (vùng, hạng, chuyên khoa)
2. Build OMOP CDM tại mỗi BV (federated)
3. Central coordinator chạy network study
4. Publish nghiên cứu mẫu chứng minh giá trị
5. Mở rộng dần

## 8. Governance pattern

![8. Governance pattern](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d06.webp)

VN cần lập **OHDSI Vietnam chapter** — đăng ký working group chính thức trên OHDSI.

## 9. Pseudonymize person ID

```sql
-- Không lưu CCCD raw
person_source_value = encode(
  hmac(
    cccd::bytea, 
    current_setting('app.cccd_secret')::bytea, 
    'sha256'
  ),
  'hex'
);

-- Khoá lưu trong Vault tách rời
-- Re-identification cần multi-party approval (DPO + IRB)
```

Cùng thuật toán hash + secret giữa các BV → **link record được** mà không lộ CCCD.

## 10. Tài nguyên VN

| Resource | Note |
|---|---|
| Quyết định 3516/QĐ-BYT 2025 | Chính sách chuyển đổi số y tế 2025-2030 |
| Luật Bảo vệ dữ liệu cá nhân 2025 | Hiệu lực 1/1/2026, thay NĐ 13/2023 |
| Luật Khám chữa bệnh 15/2023/QH15 | Hiệu lực 1/1/2024, EMR bắt buộc |
| Nghị định 13/2023/NĐ-CP | Nền tảng (bị thay thế bởi Luật BVDLCN từ 2026) |
| Cổng SNOMED CT VN | Đăng ký affiliate (miễn phí) |
| Danh mục ICD-10 VN | BYT publish |
| Danh mục thuốc BYT | Cập nhật hàng năm |
| Danh mục DVKT | BYT publish |
| OHDSI forum | Tham gia thread VN (đang khởi động) |
| Book of OHDSI | Sách giáo khoa miễn phí |
| EHDEN Academy | Khoá học OMOP miễn phí |

## 11. Lộ trình cá nhân cho VN

1. Đọc Book of OHDSI (1 tháng)
2. Cài Eunomia + thực hành SQL (2 tuần)
3. Cài Broadsea local (1 tuần)
4. Build CDM thử với 1000 patient mock VN data (1 tháng)
5. Map ICD-10 VN → SNOMED bằng USAGI (2 tuần)
6. Chạy ATLAS + DQD + ACHILLES (1 tuần)
7. Học HADES R: CohortMethod, PLP (2 tháng)
8. Tham gia OHDSI Symposium (annual virtual track free)
9. Lead 1 nghiên cứu nhỏ trên CDM VN (3-6 tháng)
10. Đề xuất OHDSI Vietnam chapter

## 12. Cộng đồng cần xây

![12. Cộng đồng cần xây](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d07.webp)

## 13. Pitfall đặc thù VN

- ❌ Map ICD-10 VN trực tiếp sang `condition_concept_id` mà không qua SNOMED → analytic không network-able
- ❌ Quên pseudonymize CCCD → vi phạm Luật Bảo vệ dữ liệu cá nhân 2025 (mức phạt đến 5% doanh thu)
- ❌ Custom concept dùng ID nhỏ < 2 tỷ → conflict với standard
- ❌ Không backup vocabulary version → không reproduce được nghiên cứu cũ
- ❌ Lưu data nước ngoài → vi phạm cross-border data
- ❌ Bỏ qua YHCT (thuốc cổ truyền) → bias underestimate drug exposure
- ❌ Quên BHYT có nhiều loại → analytic không strafify đúng

## Kết luận

VN 2026-2030 có cơ hội xây data lake nghiên cứu y tế quốc gia trên OMOP — open source, federated, network-friendly, phù hợp **Luật Bảo vệ dữ liệu cá nhân 2025** (hiệu lực 1/1/2026), **Luật KCB 15/2023**, và **Quyết định 3516/QĐ-BYT**. Cần đầu tư vocabulary VN, governance, và cộng đồng. OHDSI Vietnam chapter sẽ là động lực để VN đứng ngang với EHDEN và DARWIN EU.

→ Quay lại [Roadmap OMOP CDM Practitioner](/roadmap/omop-cdm) để xem kế hoạch học bài bản 5-9 tháng.
