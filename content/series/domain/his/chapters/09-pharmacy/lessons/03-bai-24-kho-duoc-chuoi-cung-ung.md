---
id: 019f5a01-d000-7001-his0-000000000903
title: "Bài 24: Kho dược & quản lý chuỗi cung ứng thuốc"
slug: bai-24-kho-duoc-chuoi-cung-ung
description: >-
  Quản lý nhập — xuất — tồn theo lô và hạn dùng, kiểm kê, cấp phát giữa
  kho chính ↔ kho khoa, dự trù theo Min-Max và sản phẩm thay thế.
duration_minutes: 50
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-24-kho-duoc-chuoi-cung-ung-banner.webp
video_url: null
sort_order: 3
section_title: "Phần 9: Dược (Pharmacy)"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![Kho dược, FEFO & chuỗi cung ứng](/storage/uploads/2026/05/his/bai-24-kho-duoc-chuoi-cung-ung-banner.webp)

## Mô hình kho

![Kho dược với cold-chain và quét barcode hạn dùng](/storage/uploads/2026/05/his/bai-24-kho-duoc-chuoi-cung-ung-workflow.webp)


## Mục tiêu bài học

- Mô hình hoá kho dược nhiều tầng: **kho chính → kho khoa → tủ trực** với kiểm soát lô — hạn dùng đến đơn vị nhỏ nhất.
- Triển khai nguyên tắc **FEFO** (First Expired First Out) thay vì FIFO cho thuốc.
- Tính dự trù **Min-Max** và **EOQ** (Economic Order Quantity) phù hợp ngân sách BHYT.
- Quản lý cold-chain (vaccine, insulin, một số sinh phẩm) theo **TT 14/2024/TT-BYT** và GSP của WHO.
- Đối soát kho — sổ sách — BHYT theo định kỳ; xử lý hao hụt, hỏng vỡ, hết hạn theo **TT 04/2024/TT-BYT**.

## Bối cảnh: kho dược BV — nơi rò rỉ tiền nhiều nhất

Báo cáo Kiểm toán Nhà nước 2024 (mẫu 12 BV công lập):

- Trung bình **3.2% giá trị tồn kho** bị tiêu huỷ vì hết hạn (ngưỡng chấp nhận quốc tế: ≤ 1%).
- 5/12 BV có **chênh lệch sổ sách vs thực tế > 5%** ở thời điểm kiểm kê — phần lớn do nhập tay, không có barcode.
- 8/12 BV bị BHXH xuất toán vì cấp phát thuốc đã hết hạn hoặc sai lô — tổng thiệt hại 47 tỉ đồng.

Kết luận: **kho dược không có HIS quản lý lô-HSD đầy đủ thì luôn lỗ và luôn rủi ro pháp lý**.

## Mô hình kho nhiều tầng

```
   Nhà cung cấp
        │  Hoá đơn + chứng từ + COA
        ▼
   ┌──────────────────┐
   │  KHO CHÍNH       │  receiving + QA + lưu kho theo nhiệt độ
   │  (Central WH)    │  cold-chain 2-8°C / 15-25°C / -20°C
   └──────────────────┘
        │ Phiếu chuyển kho nội bộ (FEFO)
        ▼
   ┌──────────────────┐
   │  KHO KHOA        │  ICU / Sản / Nội / Ngoại / Cấp cứu...
   │  (Ward stock)    │  tủ thuốc khoa, kiểm tra hàng tuần
   └──────────────────┘
        │ Cấp phát đơn lẻ
        ▼
   ┌──────────────────┐
   │  TỦ TRỰC ADC     │  Automated Dispensing Cabinet
   │  hoặc TỦ THƯỜNG  │  ngăn cố định / Pyxis-like
   └──────────────────┘
        │ Điều dưỡng quét + sinh trắc
        ▼
       eMAR ADMINISTERED
```

## Cấu trúc tồn kho (data model)

```sql
CREATE TABLE warehouse (
  warehouse_id   uuid PRIMARY KEY,
  warehouse_type varchar(20),    -- CENTRAL/WARD/ADC
  parent_id      uuid REFERENCES warehouse,
  storage_temp   varchar(20),    -- ROOM/COLD/FREEZER
  responsible_staff uuid REFERENCES staff
);

CREATE TABLE drug_lot (
  lot_id         uuid PRIMARY KEY,
  drug_id        uuid REFERENCES drug_catalog,
  lot_no         varchar(50) NOT NULL,
  manufacturer   varchar(200),
  manufacture_date date,
  expiry_date    date NOT NULL,
  unit_cost      numeric,
  vat_rate       numeric,
  procurement_id uuid REFERENCES procurement_contract,
  UNIQUE(drug_id, lot_no, manufacturer)
);

CREATE TABLE inventory_balance (
  warehouse_id   uuid REFERENCES warehouse,
  lot_id         uuid REFERENCES drug_lot,
  qty_on_hand    numeric NOT NULL,
  qty_reserved   numeric DEFAULT 0,
  last_count_at  timestamptz,
  PRIMARY KEY (warehouse_id, lot_id)
);

CREATE TABLE inventory_transaction (
  txn_id         uuid PRIMARY KEY,
  txn_type       varchar(20),    -- RECEIPT/ISSUE/TRANSFER/COUNT_ADJ/RETURN/DESTROY
  warehouse_from uuid REFERENCES warehouse,
  warehouse_to   uuid REFERENCES warehouse,
  lot_id         uuid REFERENCES drug_lot,
  qty            numeric,
  ref_doc_type   varchar(20),    -- PO/PRESCRIPTION/COUNT/INCIDENT
  ref_doc_id     uuid,
  performed_by   uuid REFERENCES staff,
  performed_at   timestamptz,
  reason         text
);
```

## FEFO và luật xuất kho

Quy tắc FEFO trên thực tế:

1. Mỗi mã thuốc có nhiều `drug_lot` với HSD khác nhau.
2. Khi cấp phát N đơn vị, hệ thống tự gợi ý lô có HSD gần nhất, đủ N.
3. Nếu lô gần HSD không đủ, ghép nhiều lô — dược sĩ xác nhận từng lô.
4. Override FEFO cần lý do (vd: BN dị ứng tá dược của lô đó) — ghi audit.
5. Báo cáo override FEFO hàng tháng cho trưởng khoa Dược.

## Dự trù: Min-Max và EOQ

| Mô hình | Khi dùng | Công thức |
| --- | --- | --- |
| Min-Max (par level) | thuốc thường, tiêu thụ đều | Reorder khi tồn ≤ Min, đặt đến Max |
| EOQ | thuốc đắt, tồn kho có chi phí cao | $Q^* = \sqrt{2DS/H}$ với D = nhu cầu/năm, S = chi phí đặt hàng, H = chi phí lưu/đơn vị/năm |
| Just-in-time | thuốc có HSD ngắn (<6 tháng) | đặt theo tuần, tồn an toàn ngắn |
| Buffer cấp cứu | thuốc cấp cứu (Adrenalin, Atropine) | luôn đủ cơ số 24h dù tốn |

Tham số gợi ý cho BV tuyến tỉnh 1000 giường:

- Lead time trung bình: 7-14 ngày (nội), 30-60 ngày (nhập khẩu).
- Safety stock = Z × σ_lead × √leadtime, với Z = 1.65 (95%) hoặc 2.33 (99%) cho thuốc cấp cứu.
- Service level mục tiêu: 98% cho danh mục thiết yếu BYT.

## Cold-chain — yêu cầu bắt buộc

- Nhiệt kế điện tử ghi log liên tục, sync về HIS qua IoT (Wifi/LoRa).
- Cảnh báo SMS/Telegram cho dược sĩ trực khi nhiệt độ ngoài ngưỡng > 15 phút.
- Quy trình **excursion**: nếu nhiệt độ vượt ngưỡng, dược sĩ phải đánh giá, ghi nhận, có thể phải huỷ lô (vaccine).
- Báo cáo nhiệt độ hàng ngày — lưu 5 năm theo GSP/WHO.
- Vaccine COVID-19 và một số sinh phẩm yêu cầu thiết bị data logger riêng có chứng chỉ.

## Đấu thầu & hợp đồng (overlap với bài 39 bệnh án giấy + bài 38 quản trị)

Tích hợp tối thiểu HIS ↔ module đấu thầu:

- Mỗi `drug_catalog.item` gắn với **gói thầu** đang hiệu lực: giá trúng thầu, nhà cung cấp, thời hạn, hạn mức số lượng.
- HIS không cho phép kê thuốc ngoài danh mục trúng thầu (trừ trường hợp khẩn — workflow phê duyệt riêng).
- Khi tồn kho gần Min, hệ thống tạo phiếu đề nghị mua dựa trên hợp đồng còn lại.
- Báo cáo thực hiện hợp đồng: % giải ngân, tốc độ tiêu thụ, dự báo trượt/vượt.

Tham chiếu pháp lý: **Luật Đấu thầu 22/2023/QH15** (hiệu lực 01/01/2024), **NĐ 24/2024/NĐ-CP**, **TT 07/2024/TT-BYT** đấu thầu thuốc tại cơ sở y tế công lập.

## Kiểm kê & xử lý sai khác

| Tần suất | Phạm vi | Phương pháp |
| --- | --- | --- |
| Hàng ngày | thuốc kiểm soát đặc biệt (N, H) | đếm tay 100%, ký 2 người |
| Tuần | tủ trực ICU/ER | đếm tay, đối chiếu HIS |
| Tháng | kho khoa | cycle counting |
| Quý | kho chính | toàn bộ, dừng giao dịch nửa ngày |
| Năm | toàn BV | hội đồng kiểm kê (TT 04/2024 yêu cầu) |

Sai lệch:

- < 0.5% giá trị → ghi nhận, không xử lý kỷ luật.
- 0.5% – 2% → điều tra nguyên nhân, đề xuất biện pháp.
- > 2% hoặc thuốc kiểm soát → báo cáo Sở Y tế, có thể đình chỉ kho.

## Sai lầm thường gặp

1. Quản lý lô-HSD bằng Excel song song với HIS → không đối soát được.
2. Cho phép xuất kho âm (qty < 0) — che lấp sai sót, dồn vào cuối kỳ.
3. Không có IoT cold-chain, ghi nhiệt độ tay → không đáng tin khi thanh tra.
4. Tính FEFO theo lô nhập đầu tiên thay vì HSD gần nhất → phát thuốc cận date không kịp.
5. Không tích hợp với hợp đồng thầu → kê ngoài danh mục, BHYT xuất toán.
6. Không có quy trình thuốc trả về (BN bỏ liều) → thất thoát hoặc dùng lại lô đã mở.

## Output / Deliverables module Kho dược

- Realtime inventory dashboard theo kho, theo nhóm ATC, cảnh báo Min/HSD.
- Phiếu nhập/xuất/chuyển kho điện tử có ký số dược sĩ.
- Module IoT cold-chain với báo cáo và alert.
- Báo cáo TT 04/2024: tồn kho, tiêu thụ, hao hụt, huỷ.
- Tích hợp module đấu thầu/kế toán theo Thông tư BTC.
- API xuất dữ liệu cho Cổng dược quốc gia (drug.gov.vn) khi có yêu cầu.

## UAT checklist

- [ ] Nhập kho 1 lô mới: scan barcode/2D, lấy đủ lot/HSD/nhà SX → tồn tăng đúng.
- [ ] Cấp phát 5 đơn vị thuốc có 3 lô, hệ thống chia FEFO chính xác.
- [ ] Cố cấp phát lô đã hết hạn → bị chặn cứng.
- [ ] Cảnh báo Min trigger khi tồn xuống ngưỡng, gợi ý PR theo hợp đồng còn hạn.
- [ ] Mất kết nối nhiệt kế cold-chain > 30 phút → cảnh báo dược trực.
- [ ] Phiếu kiểm kê tháng có thể đóng kỳ, không cho sửa lùi.
- [ ] Báo cáo huỷ thuốc xuất theo mẫu TT 04/2024.

## KPI

| Chỉ số | Mục tiêu |
| --- | --- |
| % giá trị tồn bị huỷ do hết hạn | ≤ 1% |
| Chênh lệch kiểm kê | ≤ 0.5% giá trị |
| Stockout thuốc thiết yếu | 0 lần/năm |
| % giao dịch xuất theo FEFO | ≥ 98% |
| % thời gian cold-chain trong ngưỡng | ≥ 99.5% |
| Tỉ lệ tồn so với tiêu thụ tháng | 1.0 – 1.5 (không quá 2 = đọng vốn) |

## Cơ sở pháp lý 2026

- **Luật Dược 105/2016 (sửa đổi 44/2024)** — Điều 76-78 quản lý thuốc tại cơ sở KCB.
- **Luật Đấu thầu 22/2023/QH15** + **NĐ 24/2024/NĐ-CP**.
- **Thông tư 04/2024/TT-BYT** — quản lý thuốc trong cơ sở KCB (thay TT 23/2011 và 22/2011).
- **Thông tư 14/2024/TT-BYT** — bảo quản thuốc, nguyên liệu (GSP).
- **Thông tư 07/2024/TT-BYT** — đấu thầu thuốc tại cơ sở công lập (thay TT 15/2019).
- **Thông tư 20/2017/TT-BYT** — thuốc kiểm soát đặc biệt.
- **Thông tư 36/2018/TT-BYT** — quản lý chất lượng thuốc.
- **Quyết định 1517/QĐ-BYT/2018** — danh mục thuốc thiết yếu (cập nhật QĐ 1907/QĐ-BYT/2024).
- **Quyết định 5631/QĐ-BYT/2020** — AMS, kiểm soát sử dụng kháng sinh.
