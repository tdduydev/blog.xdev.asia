---
id: 019f5a01-d000-7001-his0-000000001301
title: "Bài 33: Viện phí — kiến trúc tính phí phức tạp"
slug: bai-33-vien-phi-kien-truc
description: >-
  Mô hình bảng giá: nội bộ — BHYT — yêu cầu — bảo hiểm tư nhân; cơ chế ưu
  tiên giá; chính sách miễn giảm; phí phát sinh trong đợt điều trị.
duration_minutes: 50
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-33-vien-phi-kien-truc-banner.webp
video_url: null
sort_order: 1
section_title: "Phần 13: Viện phí, BHYT & Hóa đơn điện tử"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![Viện phí — kiến trúc & nguồn chi trả](/storage/uploads/2026/05/his/bai-33-vien-phi-kien-truc-banner.webp)

## Bảng giá nhiều tầng

![Quầy thu ngân tách BHYT / dịch vụ / BH tư](/storage/uploads/2026/05/his/bai-33-vien-phi-kien-truc-workflow.webp)


## Mục tiêu bài học

- Hiểu kiến trúc tính phí 3 lớp: **catalog giá** → **phát sinh dịch vụ** → **chốt phí + thu**.
- Tách dòng tiền: **BHYT chi trả + đồng chi trả + dịch vụ thuần + bảo hiểm tư + tự nguyện**.
- Triển khai **giá theo nguồn**: cùng một dịch vụ có giá khác nhau cho BHYT, không BHYT, dịch vụ theo yêu cầu.
- Xử lý **giá thay đổi giữa kỳ**: hợp đồng mới, thông tư mới, BN nằm viện ngắt giai đoạn giá.
- Đảm bảo **đối soát chéo**: HIS Billing ↔ kế toán ↔ BHXH ↔ thuế ↔ ngân hàng.

## Bối cảnh: vì sao Billing là module hay sai nhất

Báo cáo Kiểm toán 2024-2025 trên 30 BV công lập:

- **Trung bình 4.7% doanh thu bị thất thoát** do thiếu phí (xét nghiệm chạy nhưng không vào hoá đơn).
- 18/30 BV có **chênh lệch HIS vs kế toán > 2%** mỗi tháng — phải đối soát thủ công.
- BHXH xuất toán trung bình **6-9%** số đề nghị thanh toán — nhiều nhất do "sai mã giá", "sai tỉ lệ chi trả", "ngoài danh mục thầu".
- BV tư nhân: 12% claim bảo hiểm tư bị từ chối do "thiếu chứng từ" hoặc "sai mã".

Bài học: **mọi dịch vụ phát sinh phải có order_id + giá lúc phát sinh + nguồn chi trả** ngay từ giây đầu tiên.

## Kiến trúc 3 lớp

```
LỚP 1 — Catalog
   service_catalog (mã, tên, đơn vị, mô tả)
   price_list (catalog_id, hiệu lực_từ, hiệu lực_đến, payer_type, price)
        ├─ payer_type = BHYT (theo TT 22/2023 + cập nhật)
        ├─ payer_type = NON_BHYT
        ├─ payer_type = SERVICE (theo yêu cầu)
        └─ payer_type = AGREEMENT (hợp đồng riêng)
   procurement_contract (đặc thù thuốc/VTYT/cấy ghép)

LỚP 2 — Phát sinh
   charge_event (encounter_id, order_id, service_id, qty, unit_price,
                 price_source_id, occurred_at, status)

LỚP 3 — Chốt + thu
   invoice (encounter_id, payer_breakdown[], total, status)
       ├─ payer_split: BHYT 80%, đồng chi trả 20%, BH tư X đồng
   payment (invoice_id, method, amount, txn_ref, paid_at)
   refund (payment_id, reason, amount)
```

## Nguyên tắc bất biến

1. **Giá tại thời điểm phát sinh** lưu vào `charge_event.unit_price` (snapshot) — không reference động.
2. Nếu giá thay đổi giữa đợt nội trú → các charge_event trước giữ giá cũ, sau giữ giá mới — không hồi tố.
3. Charge đã vào invoice CLOSED → **không sửa, chỉ huỷ + tạo invoice điều chỉnh**.
4. Mỗi charge có `source_doc` (order/y lệnh/đơn thuốc/dịch vụ tự thêm) — không cho phép charge "ngoài luồng".
5. Hoàn tiền có audit + ký số trưởng phòng tài chính.

## Tách dòng tiền theo nguồn chi trả

| Nguồn | Đối tác | Quy chuẩn | Ví dụ tỉ lệ |
| --- | --- | --- | --- |
| BHYT | BHXH | TT 22/2023, QĐ 130/QĐ-BYT/2023 | 80%-95%-100% theo đối tượng |
| Đồng chi trả BHYT | BN | còn lại sau BHYT | 5-20% |
| Dịch vụ theo yêu cầu | BN | NĐ 60/2021 + giá hợp đồng | 100% BN |
| Ngoài danh mục BHYT | BN | giá BV niêm yết | 100% BN |
| Bảo hiểm tư | hãng BH (Bảo Việt, Liberty, BIC, MIC, Generali, AIA, …) | API/eClaim | tuỳ hợp đồng |
| Quỹ từ thiện / tài trợ | quỹ | hợp đồng riêng | tuỳ |
| Khám sức khoẻ doanh nghiệp | DN | hợp đồng | 100% DN |

**Payer split** trên hoá đơn phải hiển thị rõ — BN cần biết "ai trả bao nhiêu", BHXH cần biết phần đề nghị thanh toán, kế toán cần phân loại doanh thu.

## Data model tối thiểu

```sql
CREATE TABLE service_catalog (
  service_id    uuid PRIMARY KEY,
  service_code  varchar(30) UNIQUE,    -- mã nội bộ + map mã BYT
  bhyt_code     varchar(30),
  service_name  text,
  unit          varchar(20),
  category      varchar(30)            -- LAB/IMAGING/PROCEDURE/BED/MED/CONSULT
);

CREATE TABLE price_list (
  price_id      uuid PRIMARY KEY,
  service_id    uuid REFERENCES service_catalog,
  payer_type    varchar(20),           -- BHYT/NON_BHYT/SERVICE/AGREEMENT
  price         numeric NOT NULL,
  effective_from timestamptz NOT NULL,
  effective_to   timestamptz,
  source_doc    varchar(100),          -- TT/QĐ/Hợp đồng
  approved_by   uuid
);

CREATE TABLE charge_event (
  charge_id     uuid PRIMARY KEY,
  encounter_id  uuid REFERENCES encounter,
  order_id      uuid,
  service_id    uuid REFERENCES service_catalog,
  qty           numeric,
  unit_price    numeric NOT NULL,      -- snapshot
  price_id_used uuid REFERENCES price_list,
  payer_type    varchar(20),
  occurred_at   timestamptz,
  status        varchar(20)            -- PENDING/INVOICED/VOIDED
);

CREATE TABLE invoice (
  invoice_id    uuid PRIMARY KEY,
  encounter_id  uuid,
  invoice_no    varchar(50) UNIQUE,
  total_amount  numeric,
  bhyt_portion  numeric,
  patient_portion numeric,
  insurer_portion numeric,
  status        varchar(20),           -- DRAFT/CLOSED/CANCELLED/REFUNDED
  closed_at     timestamptz
);
```

## Workflow chốt phí khi xuất viện

```
BS xác nhận xuất viện
   │
   ▼
HIS gom mọi charge_event PENDING của encounter
   │
   ▼
Áp policy: thẻ BHYT, mức hưởng, trần thanh toán, đồng chi trả
   │
   ▼
Tạo invoice DRAFT + tách payer_split
   │
   ├─ BN review + ký xác nhận
   │
   ▼
Thu tiền (tiền mặt/QR/POS/chuyển khoản)
   │
   ▼
Invoice CLOSED → phát hành HĐĐT (NĐ 123/2020)
   │
   ▼
Đẩy claim BHYT (XML 4210) cho BHXH; eClaim cho BH tư
```

## Giá thay đổi giữa đợt nội trú

Tình huống: BN nằm viện 30 ngày, giường ngày tăng từ 200k lên 250k giữa kỳ (TT mới).

Cách xử lý đúng:
- Charge ngày 1-15: giữ 200k (theo `price_id` cũ).
- Charge ngày 16-30: 250k (theo `price_id` mới).
- Hoá đơn show 2 dòng giường ngày với giá khác nhau và explanatory note.

Cách sai (rất phổ biến):
- Lấy giá mới áp cho cả đợt → thu sai BN, BHXH xuất toán.
- Giữ giá cũ cho cả đợt → BV thiệt hại doanh thu.

## Sai lầm thường gặp

1. Không snapshot giá tại thời điểm charge → giá đổi → invoice cũ tự đổi → vi phạm kế toán.
2. Cho sửa charge sau khi invoice CLOSED → mất audit, vi phạm thuế.
3. Lưu payer_type tại invoice thay vì tại từng charge → 1 BN có nhiều loại payer cùng lúc bị tính sai.
4. Không tách "dịch vụ theo yêu cầu" → BHXH tưởng là BHYT → xuất toán.
5. Không có quy trình hoàn tiền chính thức → cashier hoàn lén → thất thoát.
6. Không đối soát hàng ngày HIS ↔ kế toán ↔ ngân hàng → cuối tháng phát hiện chênh lệch lớn.

## Output / Deliverables

- Catalog dịch vụ + giá (multi-payer, có hiệu lực thời gian).
- Charge engine snapshot giá.
- Invoice với payer_split rõ ràng.
- Quy trình hoàn tiền có ký duyệt.
- Báo cáo doanh thu theo nguồn (BHYT/dịch vụ/BH tư).
- Đối soát chéo HIS ↔ kế toán ↔ ngân hàng (daily).

## UAT checklist

- [ ] Đổi giá dịch vụ X giữa kỳ → charge cũ giữ giá cũ.
- [ ] Cố sửa charge của invoice CLOSED → bị chặn.
- [ ] BN có thẻ BHYT 80% + BH tư 20% → invoice tách 3 dòng (BHYT, BH tư, BN).
- [ ] Hoàn tiền > 5 triệu → bắt buộc ký duyệt trưởng phòng tài chính.
- [ ] Đối soát HIS vs ngân hàng end-of-day → chênh lệch ≤ 1.000đ.

## KPI

| Chỉ số | Mục tiêu |
| --- | --- |
| % charge gắn được với order | ≥ 99% |
| Chênh lệch HIS vs kế toán | ≤ 0.5% |
| Tỉ lệ doanh thu thất thoát | ≤ 1% |
| Tỉ lệ BHXH xuất toán | ≤ 3% |
| % invoice in HĐĐT trong giờ | ≥ 98% |

## Cơ sở pháp lý 2026

- **Luật KCB 15/2023/QH15** + **Luật BHYT 51/2024/QH15** (hiệu lực 01/07/2025) — cơ sở pháp lý viện phí.
- **Nghị định 96/2023/NĐ-CP** + **NĐ 70/2025/NĐ-CP** — quy định Luật KCB.
- **Nghị định 60/2021/NĐ-CP** — cơ chế tự chủ tài chính BV công lập.
- **Thông tư 22/2023/TT-BYT** + sửa đổi — giá KCB BHYT.
- **Thông tư 13/2019/TT-BYT** (sửa đổi TT 21/2024) — giá PT/TT.
- **Thông tư 04/2017/TT-BYT** (sửa đổi TT 27/2024) — giá vật tư.
- **Quyết định 130/QĐ-BYT/2023** — chuẩn dữ liệu giám định BHYT.
- **Luật Kế toán 88/2015** + **Thông tư 200/2014/TT-BTC** sửa đổi — hệ thống kế toán doanh nghiệp/BV.
- **Nghị định 123/2020/NĐ-CP** — hoá đơn điện tử.
