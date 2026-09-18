---
id: 019f5a01-d000-7001-his0-000000000601
title: "Bài 15: Order Management — vòng đời chỉ định cận lâm sàng"
slug: bai-15-order-management
description: >-
  Mô hình order tập trung trong HIS: order set, ưu tiên, route tới đơn vị
  thực hiện (LIS, RIS, Pharmacy, thủ thuật), trạng thái, hủy, thay đổi & in
  phiếu thực hiện.
duration_minutes: 50
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-15-order-management-banner.webp
video_url: null
sort_order: 1
section_title: "Phần 6: Order Management & ICD coding"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![Order Management — vòng đời y lệnh](/storage/uploads/2026/05/his/bai-15-order-management-banner.webp)

## Vì sao cần Order Management thống nhất

![Trung tâm điều phối order tới LIS, RIS, PHA](/storage/uploads/2026/05/his/bai-15-order-management-workflow.webp)


## Mục tiêu bài học

- Hiểu vì sao **Order Management (ORM)** phải là module trung tâm, không để mỗi phân hệ tự sinh order.
- Mô hình hoá đầy đủ vòng đời một order: tạo → xác nhận → route → thực hiện → trả kết quả → tính phí → đóng.
- Thiết kế **order set** (gói chỉ định) cho các tình huống lâm sàng phổ biến (sốt xuất huyết, đau ngực cấp, sản khoa, tiền phẫu).
- Triển khai cảnh báo CDS (Clinical Decision Support): trùng chỉ định, dị ứng, tương tác, vượt liều, ngoài chỉ định BHYT.
- Đảm bảo audit trail đầy đủ phục vụ thanh tra BHXH và Bộ Y tế theo Luật Khám bệnh, Chữa bệnh 15/2023/QH15.

## Bối cảnh: vì sao "order rời rạc" là bom hẹn giờ

Tại nhiều BV tuyến tỉnh đang dùng HIS phiên bản cũ (2010-2016), mỗi phân hệ vẫn **tự sinh số phiếu**: LIS có số phiếu xét nghiệm, RIS có số phiếu CĐHA, Pharmacy có số toa. Hậu quả thực tế đã ghi nhận:

- **BV Đa khoa tỉnh M (2024)**: bệnh nhân được chỉ định CT sọ 2 lần trong 3 ngày do 2 BS khác khoa không thấy nhau; BHYT xuất toán 2,8 tỉ đồng/năm vì "trùng dịch vụ trong 24h".
- **BV chuyên khoa Sản (2025)**: pha truyền oxytocin chỉ định miệng, điều dưỡng nhập sau 4 giờ, không có dấu vết ai ra y lệnh — sự cố băng huyết, không kết luận được trách nhiệm.
- **BV tư H (2025)**: hệ thống kế toán "thiếu phí" vì xét nghiệm chạy xong nhưng order gốc bị BS hủy sau đó mà không sync sang Billing.

Bài học chung: **một order_id duy nhất** xuyên hệ thống là tiền đề bắt buộc cho an toàn, kế toán và pháp lý.

## Phân loại order trong HIS

| Nhóm | Đích đến | Ví dụ | Đặc thù |
| --- | --- | --- | --- |
| Lab order | LIS | CTM, Sinh hoá, HbA1c | có specimen, barcode |
| Imaging order | RIS/PACS | X-quang ngực, CT sọ, MRI | có lịch máy, tia xạ |
| Medication order | Pharmacy + eMAR | Paracetamol 500mg PO q6h | có liều, đường dùng, tần suất |
| Procedure order | OR/Endoscopy/Cath | Nội soi đại tràng | có kíp, phòng, vô cảm |
| Nursing order | Điều dưỡng | Đo HA q4h, thay băng | không có phí, có lịch |
| Diet order | Dinh dưỡng | Tiểu đường 1800kcal | sync bếp ăn |
| Referral order | Khoa khác / BV khác | Hội chẩn tim mạch | chuyển encounter |

## Vòng đời chuẩn của một order

```
[NEW] → [SIGNED] → [ROUTED] → [SCHEDULED]/[IN_LAB]/[DISPENSED] →
       [IN_PROGRESS] → [RESULTED]/[ADMINISTERED]/[DONE] → [BILLED] → [CLOSED]

Nhánh phụ:
[NEW]/[SIGNED] → [CANCELLED]      (BS huỷ trước khi thực hiện)
[ROUTED]       → [REJECTED]       (LIS từ chối: mẫu vỡ, sai BN)
[IN_PROGRESS]  → [HOLD]           (chờ xét lại)
[RESULTED]     → [AMENDED]        (sửa kết quả, lưu version cũ)
```

Các trạng thái phải **bất biến trong audit log**: thay đổi nào cũng phải lưu `(old_status, new_status, actor, reason, timestamp)`.

## State machine bằng SQL (đơn giản hoá)

```sql
CREATE TABLE orders (
  order_id        UUID PRIMARY KEY,
  encounter_id    UUID NOT NULL,
  patient_id      UUID NOT NULL,
  ordering_md     UUID NOT NULL,
  service_id      VARCHAR(64) NOT NULL,  -- mã DV BHYT / LOINC / nội bộ
  service_kind    VARCHAR(16) NOT NULL,  -- LAB|IMG|MED|PROC|NURS|DIET|REFER
  priority        VARCHAR(16) NOT NULL,  -- ROUTINE|URGENT|STAT|TIMED
  scheduled_at    TIMESTAMPTZ,
  status          VARCHAR(16) NOT NULL,
  reason_dx       VARCHAR(16),           -- ICD-10 chính của order
  created_at      TIMESTAMPTZ DEFAULT now(),
  signed_at       TIMESTAMPTZ,
  cancelled_at    TIMESTAMPTZ,
  cancel_reason   TEXT,
  parent_order_id UUID,                  -- với order set
  payer_check     JSONB                  -- kết quả gate BHYT
);

CREATE TABLE order_status_log (
  id           BIGSERIAL PRIMARY KEY,
  order_id     UUID REFERENCES orders,
  from_status  VARCHAR(16),
  to_status    VARCHAR(16),
  actor        UUID,
  actor_role   VARCHAR(32),
  reason       TEXT,
  at           TIMESTAMPTZ DEFAULT now()
);
```

## Order set — gói chỉ định theo phác đồ

Order set giúp BS chọn 1 lần ra cả gói thay vì click 12 dịch vụ:

- **"Sốt xuất huyết người lớn ngày 1"**: CTM, NS1, Hct, AST/ALT, điện giải, Lactated Ringer 500ml ×2, Paracetamol 500mg q6h.
- **"Đau ngực cấp nghi NMCT"**: ECG 12 chuyển đạo STAT, Troponin I, CK-MB, X-quang ngực, Aspirin 300mg PO loading, Clopidogrel 300mg PO.
- **"Pre-op tổng quát"**: CTM, đông máu, sinh hoá cơ bản, nhóm máu, HBsAg, anti-HCV, HIV, X-quang ngực, ECG.

Mỗi order set phải có **owner lâm sàng** (Trưởng khoa / Hội đồng thuốc) ký phê duyệt và **rà soát ≥ 1 lần/năm**.

## 12 quy tắc thiết kế Order Management

1. **Một order_id, nhiều destination**: order set sinh nhiều child order, đều giữ link `parent_order_id`.
2. **Ký số / OTP cho thuốc gây nghiện, hướng thần** theo Thông tư 20/2017/TT-BYT — ORM phải bắt buộc 2-factor.
3. **Gate BHYT trước khi route**: kiểm `service_id` có trong danh mục BHYT, có trong giới hạn hạng BV không (BHXH 130/QĐ-BHXH/2024 áp dụng từ 01/01/2025).
4. **CDS layer** chạy đồng bộ ≤ 800ms: dị ứng (allergy list), tương tác (drug-drug), trùng (cùng order trong 24h), vượt liều theo cân nặng/eGFR.
5. **Cho phép override có lý do**: BS điền lý do, lưu kèm order, cảnh báo cho dược lâm sàng review hậu kiểm.
6. **STAT không được scheduled**: order STAT phải route ngay; nếu LIS từ chối phải báo BS trong 5 phút.
7. **Verbal order** (y lệnh miệng) phải được BS read-back ký xác nhận trong 24h, nếu quá hạn auto escalate trưởng khoa.
8. **Cancel có deadline**: không cho cancel order đã ở `RESULTED` hay `ADMINISTERED`; chỉ cho `AMEND` với audit.
9. **Idempotent route**: gửi lại order tới LIS không tạo specimen mới; dùng `order_id` làm key trong HL7 OBR-2 / FHIR ServiceRequest.identifier.
10. **Phí gắn với trạng thái thực hiện**: chỉ chuyển Billing khi `DONE`/`RESULTED`; cancel phải reverse phí.
11. **Reconcile hàng đêm**: so `orders.status='DONE'` với `billing_items` và `lis.results`, sai lệch → ticket.
12. **Backup phiếu in**: khi mất mạng, in phiếu bằng template offline có barcode `order_id` để LIS scan tra cứu khi mạng phục hồi.

## Tích hợp HL7 v2 / FHIR

**HL7 v2 ORM^O01** (gửi order tới LIS):

```
MSH|^~\&|HIS|BV01|LIS|LAB01|20260512083000||ORM^O01|MSG00012|P|2.5.1
PID|||PT0001234^^^BV01^MR||NGUYEN^VAN A||19800101|M
PV1||I|ICU^101^A
ORC|NW|ORD-0000123^HIS|||||^^^20260512090000^^R
OBR|1|ORD-0000123^HIS||CBC^Cong thuc mau^L|||20260512083000
DG1|1|I10|J18.9^Pneumonia^I10
```

**FHIR R4 ServiceRequest** (kiến trúc mới, áp dụng theo lộ trình HL7 FHIR Implementation Guide Việt Nam đang dự thảo):

```json
{
  "resourceType": "ServiceRequest",
  "id": "ORD-0000123",
  "status": "active",
  "intent": "order",
  "priority": "stat",
  "code": {"coding": [{"system": "http://loinc.org", "code": "58410-2", "display": "CBC panel"}]},
  "subject": {"reference": "Patient/PT0001234"},
  "encounter": {"reference": "Encounter/ENC-9999"},
  "requester": {"reference": "Practitioner/MD-001"},
  "reasonCode": [{"coding": [{"system": "http://hl7.org/fhir/sid/icd-10", "code": "J18.9"}]}],
  "authoredOn": "2026-05-12T08:30:00+07:00"
}
```

## Sai lầm thường gặp khi triển khai ORM

- **Để LIS/RIS tự sinh số phiếu** rồi map ngược về HIS — vĩnh viễn không reconcile được.
- **Bỏ CDS để "BS không bị làm phiền"** — vi phạm chuẩn JCI và mất hàng rào an toàn.
- **Không versioning order set** — khi phác đồ đổi, không truy được BS nào dùng phiên bản cũ.
- **Cho cancel không lý do** — kiểm toán BHYT bắt lỗi ngay.
- **Dùng print-then-execute** (in giấy rồi nhập tay) — mất 30-40% lợi ích ORM.
- **Cảnh báo quá nhiều (alert fatigue)** — BS bấm bỏ qua cả cảnh báo nguy hiểm. Phải tiering Hard stop / Soft warn / Info.

## Output bài học

Sau bài này bạn có thể:

- Vẽ state machine của order trên whiteboard không cần nhìn tài liệu.
- Viết được spec API `POST /orders`, `POST /orders/{id}/sign`, `POST /orders/{id}/cancel` với validation đủ.
- Đọc và sửa lỗi message HL7 ORM^O01 thực tế.
- Phản biện được khi nhà cung cấp đề xuất "mỗi phân hệ tự quản lý số phiếu".

## Checklist UAT cho ORM

- [ ] Tạo order đơn → ký → route → LIS nhận đúng `order_id`.
- [ ] Tạo order set 8 dịch vụ → tất cả có `parent_order_id` đúng.
- [ ] Order STAT không cho chọn `scheduled_at` ở tương lai.
- [ ] Cảnh báo dị ứng Penicillin khi kê Amoxicillin → cho override có lý do, log.
- [ ] Cảnh báo trùng CT sọ trong 24h → hard stop, BS phải nhập lý do mới qua.
- [ ] Hủy order đã `RESULTED` → từ chối, trả 409.
- [ ] Verbal order quá 24h chưa ký → tự động chuyển trạng thái `PENDING_SIGN_OVERDUE` và bắn cảnh báo trưởng khoa.
- [ ] Reconcile ban đêm: log đủ số order DONE vs Billing items, mismatch < 0.1%.

## KPI vận hành

| KPI | Ngưỡng tốt | Ngưỡng cảnh báo |
| --- | --- | --- |
| Tỉ lệ order STAT có kết quả ≤ 60' | ≥ 95% | < 90% |
| Tỉ lệ trùng chỉ định 24h (sau khi bật CDS) | ≤ 0.5% | > 1% |
| Tỉ lệ verbal order quá 24h chưa ký | ≤ 1% | > 3% |
| Sai lệch order DONE vs Billing | ≤ 0.1% | > 0.5% |
| Số cảnh báo CDS bị override không lý do | 0 | > 0 |

## Cơ sở pháp lý 2026

- **Luật Khám bệnh, chữa bệnh 15/2023/QH15** (hiệu lực 01/01/2024) — Điều 59-63 yêu cầu ghi chép đầy đủ y lệnh, có dấu vết người ra lệnh, người thực hiện.
- **Thông tư 20/2017/TT-BYT** — quản lý thuốc gây nghiện, hướng thần — yêu cầu xác thực mạnh và sổ riêng.
- **Quyết định 130/QĐ-BHXH (2024, áp dụng từ 01/01/2025)** — chuẩn dữ liệu giám định BHYT, mỗi dịch vụ phải có `order_id` và mã chẩn đoán ICD-10 đính kèm.
- **Thông tư 46/2018/TT-BYT** — hồ sơ bệnh án điện tử, yêu cầu lưu trạng thái và ký số y lệnh.

## Bài tiếp

Bài 16 sẽ đào sâu mã hoá ICD-10/ICD-11, DRG và vai trò của clinical coder để mỗi order/encounter có chẩn đoán "đủ chuẩn BHYT".
