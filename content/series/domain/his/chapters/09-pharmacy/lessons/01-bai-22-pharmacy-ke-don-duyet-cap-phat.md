---
id: 019f5a01-d000-7001-his0-000000000901
title: "Bài 22: Pharmacy — kê đơn, duyệt & cấp phát"
slug: bai-22-pharmacy-ke-don-duyet-cap-phat
description: >-
  Vòng đời đơn thuốc trong HIS: kê — duyệt dược — cấp phát ngoại trú / nội
  trú, kiểm soát số lô, hạn dùng, FEFO, in tem nhãn theo **TT 22/2024/TT-BYT**
  (thay TT 52/2017) và Luật KCB 15/2023.
duration_minutes: 60
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-22-pharmacy-ke-don-duyet-cap-phat-banner.webp
video_url: null
sort_order: 1
section_title: "Phần 9: Dược (Pharmacy)"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![Pharmacy — kê đơn, duyệt, cấp phát](/storage/uploads/2026/05/his/bai-22-pharmacy-ke-don-duyet-cap-phat-banner.webp)

## Phân loại đơn thuốc

![Bác sĩ kê đơn → dược sĩ duyệt → phát thuốc](/storage/uploads/2026/05/his/bai-22-pharmacy-ke-don-duyet-cap-phat-workflow.webp)


## Mục tiêu bài học

- Mô hình hoá vòng đời một đơn thuốc trong HIS: kê → duyệt dược → cấp phát → ghi nhận sử dụng → đối soát.
- Phân biệt rõ luồng **ngoại trú** (BN nhận thuốc tại quầy) và **nội trú** (eMAR — điều dưỡng cấp phát theo giờ tại buồng bệnh).
- Tuân thủ **Thông tư 22/2024/TT-BYT** (thay TT 52/2017) về kê đơn ngoại trú và **Thông tư 04/2024/TT-BYT** về quản lý thuốc trong cơ sở KCB.
- Kiểm soát số lô — hạn dùng theo nguyên tắc **FEFO** (First Expired First Out), in tem nhãn đúng quy chuẩn.
- Đảm bảo dấu vết pháp lý: ai kê, ai duyệt, ai phát, ai dùng, dùng cho ai, vào lúc nào — phục vụ thanh tra Sở Y tế và BHXH.

## Bối cảnh: vì sao "đơn thuốc giấy → HIS" vẫn còn lỗi sau 10 năm

Đến 2026, khoảng 60% BV công lập đã chuyển sang đơn thuốc điện tử nhưng các sự cố vẫn lặp lại:

- **BV tuyến huyện X (2025)**: BS kê "Augmentin 1g x 2 lần/ngày" nhưng dược kho chỉ còn loại 625mg — điều dưỡng tự đổi liều, không ghi nhận; BN dị ứng nặng, BV bị phạt 80 triệu vì không có y lệnh thay thế.
- **BV tư Y (2024)**: 3 đơn thuốc gây nghiện (Morphine) bị "biến mất" giữa kho và buồng bệnh; hệ thống không có barcode lô, không truy vết được — Sở Y tế đình chỉ chứng chỉ kho.
- **Phòng khám tư Z (2025)**: đơn thuốc kê tay rồi nhập lại HIS sau 1 ngày, BHYT phát hiện sai chênh lệch ngày cấp với ngày khám → xuất toán toàn bộ tháng.

Điểm chung: **HIS phải là nơi duy nhất phát sinh đơn thuốc**, không cho phép ghi nhận hồi tố quá 1 giờ với thuốc thường, 0 phút với thuốc kiểm soát.

## Phân loại đơn thuốc trong HIS

| Loại | Văn bản hiện hành | Đặc thù lưu trữ | Hạn dùng đơn |
| --- | --- | --- | --- |
| Đơn thường (ngoại trú) | TT 22/2024/TT-BYT | đơn điện tử ký số BS | 5 ngày |
| Đơn N (gây nghiện) | TT 20/2017/TT-BYT (còn hiệu lực) | sổ riêng + báo cáo Sở YT hàng tháng | 5 ngày, không gia hạn |
| Đơn H (hướng thần) | TT 20/2017/TT-BYT | sổ riêng | 7 ngày |
| Đơn YHCT | TT 22/2024 + TT 44/2018 | thang thuốc cổ truyền | 10 ngày |
| Y lệnh nội trú | TT 04/2024/TT-BYT | trong bệnh án, không in đơn | theo y lệnh |
| Đơn cấp cứu | TT 22/2024 | có thể bằng miệng, hồi cứu trong 1h | tức thời |

## Vòng đời một đơn thuốc (state machine)

```
DRAFT          ── BS đang soạn, chưa ký
   │
   │ BS ký số (PKI) + bấm "Phát hành"
   ▼
ISSUED         ── chờ dược sĩ duyệt
   │
   ├─ Duyệt OK ──────────────────► VERIFIED
   │                                  │
   ├─ Yêu cầu sửa ──► RETURNED ──► (BS sửa) ──► ISSUED
   │
   └─ Từ chối ───────► REJECTED
                                       │
                                       │ Cấp phát/giao thuốc
                                       ▼
                                   DISPENSED
                                       │
                          (Nội trú) Điều dưỡng eMAR
                                       │
                                       ▼
                                ADMINISTERED
                                       │
                                       ▼
                                    CLOSED
```

Quy tắc bắt buộc:

- Không được lùi state (không có đường từ DISPENSED → DRAFT).
- Mọi chuyển trạng thái ghi `actor_id`, `actor_role`, `timestamp`, `reason` (nếu là REJECTED/RETURNED).
- ISSUED quá 24 giờ chưa duyệt → tự động cảnh báo trưởng khoa Dược.

## Quy tắc kê đơn theo TT 22/2024/TT-BYT *(hiện hành 2026)*

1. Mỗi thuốc phải đủ: **tên hoạt chất** (theo INN), **hàm lượng**, **liều dùng 1 lần**, **số lần/ngày**, **đường dùng**, **thời gian dùng**, **chỉ dẫn cụ thể** (sau ăn, lúc đói, ngậm dưới lưỡi…).
2. Số ngày kê tối đa: **30 ngày** cho bệnh mạn tính (đái tháo đường, tăng huyết áp, hen) — quy định mới mở rộng từ TT 22/2024 thay vì 10-15 ngày như cũ.
3. Thuốc kháng sinh: bắt buộc nhập **chỉ định** (ICD-10) và **lý do dùng** vào trường riêng — phục vụ AMS (Antimicrobial Stewardship).
4. Đơn N, H: chỉ BS có chứng chỉ hành nghề > 5 năm và được giám đốc BV ủy quyền mới được kê — HIS phải kiểm tra `prescriber_authority_level`.
5. Phụ nữ có thai/cho con bú: cảnh báo bắt buộc khi kê thuốc nhóm C/D/X (FDA pregnancy category) — không cho phép "Bỏ qua" mà không ghi lý do.
6. Trẻ em <12 tuổi: bắt buộc nhập **cân nặng** trước khi kê — HIS tự tính liều mg/kg và cảnh báo nếu vượt khuyến cáo.
7. Đơn ký số PKI theo NĐ 130/2018 và Luật Giao dịch điện tử 20/2023; chữ ký tay scan **không** có giá trị pháp lý.
8. Đơn ngoại trú phát hành tối đa 5 ngày kể từ ngày kê; quá hạn → HIS tự khoá, BN phải khám lại.

## Data model tối thiểu

```sql
-- Đơn thuốc (header)
CREATE TABLE prescription (
  prescription_id   uuid PRIMARY KEY,
  patient_id        uuid NOT NULL REFERENCES patient,
  encounter_id      uuid NOT NULL REFERENCES encounter,
  prescriber_id     uuid NOT NULL REFERENCES staff,
  prescription_type varchar(20),  -- OUTPATIENT/INPATIENT/N/H/YHCT/EMERGENCY
  status            varchar(20),  -- DRAFT/ISSUED/VERIFIED/DISPENSED/CLOSED/REJECTED
  diagnosis_icd     varchar(10) NOT NULL,
  signed_at         timestamptz,
  signature_hash    varchar(128), -- chữ ký số PKI
  created_at        timestamptz DEFAULT now()
);

-- Dòng thuốc
CREATE TABLE prescription_item (
  item_id           uuid PRIMARY KEY,
  prescription_id   uuid REFERENCES prescription,
  drug_id           uuid REFERENCES drug_catalog,
  dose_per_admin    numeric,         -- liều 1 lần
  unit              varchar(10),     -- mg/ml/viên
  route             varchar(10),     -- PO/IV/IM/SC/PR/SL/INH
  frequency         varchar(20),     -- q6h, BID, TID, PRN
  duration_days     int,
  total_quantity    numeric,
  indication_text   text,            -- bắt buộc cho kháng sinh
  is_substituted    boolean DEFAULT false,
  substitution_reason text
);

-- Cấp phát
CREATE TABLE dispense (
  dispense_id       uuid PRIMARY KEY,
  prescription_item_id uuid REFERENCES prescription_item,
  pharmacist_id     uuid REFERENCES staff,
  lot_no            varchar(50),
  expiry_date       date,
  qty_dispensed     numeric,
  dispensed_at      timestamptz,
  inventory_txn_id  uuid REFERENCES inventory_transaction
);
```

## Tích hợp HL7/FHIR

- **HL7 v2 RDE^O11** (Pharmacy/Treatment Encoded Order) gửi từ HIS sang Pharmacy Information System nếu tách hệ.
- **FHIR R4 MedicationRequest** cho đơn ngoại trú — chuẩn để xuất sang Hồ sơ sức khoẻ điện tử cá nhân (VNeID Health) theo lộ trình QĐ 06/QĐ-TTg/2022.
- **FHIR MedicationDispense** ghi nhận cấp phát thực tế (lot, quantity, performer).
- **FHIR MedicationAdministration** dùng cho eMAR nội trú.

Ví dụ payload tối giản:

```json
{
  "resourceType": "MedicationRequest",
  "status": "active",
  "intent": "order",
  "medicationCodeableConcept": {
    "coding": [{"system": "http://www.whocc.no/atc", "code": "J01CR02", "display": "Amoxicillin + clavulanic acid"}]
  },
  "subject": {"reference": "Patient/123"},
  "authoredOn": "2026-05-12T08:30:00+07:00",
  "requester": {"reference": "Practitioner/BS-456"},
  "dosageInstruction": [{
    "text": "1 viên × 3 lần/ngày sau ăn",
    "timing": {"repeat": {"frequency": 3, "period": 1, "periodUnit": "d"}},
    "route": {"coding": [{"code": "PO"}]},
    "doseAndRate": [{"doseQuantity": {"value": 625, "unit": "mg"}}]
  }],
  "dispenseRequest": {"quantity": {"value": 21, "unit": "viên"}, "expectedSupplyDuration": {"value": 7, "unit": "d"}}
}
```

## Cấp phát ngoại trú vs nội trú

| Khía cạnh | Ngoại trú | Nội trú (eMAR) |
| --- | --- | --- |
| Đơn vị nhỏ nhất | hộp/lọ | liều đơn (unit-dose) |
| Người nhận | BN/người nhà | điều dưỡng |
| Thời điểm | một lần khi xuất viện | nhiều lần/ngày theo y lệnh |
| In nhãn | tem hộp | tem unit-dose có barcode liều |
| Ký nhận | BN ký giấy/điện tử | điều dưỡng quét QR + sinh trắc |
| Trả lại | đổi/trả tại quầy trong 24h | hoàn kho ngay nếu BN bỏ liều |

## FEFO và quản lý lô — hạn dùng

- Mỗi giao dịch xuất kho phải chọn **lô có hạn dùng gần nhất** đủ số lượng. HIS bắt buộc gợi ý FEFO, dược sĩ chỉ override khi có lý do (ghi audit).
- Tem nhãn cấp phát phải in: tên thuốc, hàm lượng, **số lô**, **HSD**, **liều dùng**, tên BN, mã đơn — quét được bằng máy đọc tại buồng bệnh.
- Thuốc cận date (≤90 ngày) → cảnh báo vàng cho dược sĩ; ≤30 ngày → cảnh báo đỏ + đề xuất chuyển kho hoặc hoàn nhà cung cấp theo hợp đồng.

## Sai lầm thường gặp khi triển khai

1. Cho phép kê "tên thương mại tự do" → không map ATC → không CDS được tương tác thuốc.
2. Không tách rõ `dose_per_admin` và `total_quantity` → tính sai số lượng cấp phát.
3. Bỏ qua bước duyệt dược cho ngoại trú → vi phạm TT 22/2024 (mọi đơn phải có dược sĩ kiểm tra).
4. Không lưu chữ ký số mà chỉ lưu "tên BS" dạng text → không có giá trị pháp lý khi tranh chấp.
5. Nhập lô/HSD bằng tay khi nhập kho → sai số khoảng 5%, dẫn đến cảnh báo HSD lệch.
6. Cho phép sửa đơn sau khi đã DISPENSED → không có audit chuẩn.

## Output / Deliverables module Pharmacy kê đơn

- Màn hình kê đơn với CDS realtime (tương tác, dị ứng, vượt liều, trùng thuốc).
- Hàng đợi duyệt cho dược sĩ + SLA cảnh báo > 24h.
- Hàng đợi cấp phát ngoại trú (theo BN) và nội trú (theo khoa, theo round 6h/14h/22h).
- Báo cáo TT 22/2024: số đơn kê, tỉ lệ đơn có kháng sinh, % đơn được duyệt trong 24h.
- API FHIR MedicationRequest/Dispense/Administration cho cổng HSSKĐT cá nhân.

## UAT checklist

- [ ] Kê thuốc dị ứng đã khai báo → bị chặn cứng, có lý do override.
- [ ] Kê 2 thuốc tương tác mức Major → cảnh báo modal, BS phải nhập lý do.
- [ ] Kê đơn không ký số → không phát hành được.
- [ ] Đơn N kê bởi BS không có thẩm quyền → bị từ chối.
- [ ] Cấp phát chọn lô không phải FEFO → bắt buộc nhập lý do.
- [ ] In tem nhãn quét được trên máy đọc tại buồng bệnh.
- [ ] Đơn ngoại trú quá 5 ngày → khoá, không cấp phát.
- [ ] Báo cáo TT 22/2024 xuất đúng định dạng XML/JSON gửi Sở Y tế.

## KPI vận hành

| Chỉ số | Mục tiêu |
| --- | --- |
| % đơn được duyệt trong 30 phút | ≥ 90% |
| % đơn cấp phát đúng FEFO | ≥ 98% |
| Số sự cố sai thuốc/sai liều | ≤ 1/10.000 đơn |
| % đơn ngoại trú có ký số PKI | 100% |
| Tỉ lệ thuốc hết hạn phải tiêu hủy | ≤ 0.3% giá trị tồn |

## Cơ sở pháp lý 2026

- **Luật Khám bệnh, Chữa bệnh 15/2023/QH15** (hiệu lực 01/01/2024) — Điều 65 trách nhiệm cơ sở KCB về thuốc.
- **Luật Dược 105/2016/QH13** (sửa đổi 44/2024/QH15 hiệu lực 01/07/2025).
- **Thông tư 22/2024/TT-BYT** thay TT 52/2017 — kê đơn ngoại trú, mở rộng kê thuốc mạn tính tới 30 ngày.
- **Thông tư 04/2024/TT-BYT** quản lý thuốc trong cơ sở KCB (thay TT 23/2011).
- **Thông tư 20/2017/TT-BYT** quản lý thuốc gây nghiện, hướng thần (còn hiệu lực).
- **Nghị định 54/2017/NĐ-CP** + **NĐ 88/2023/NĐ-CP** sửa đổi: quản lý nhà nước về dược.
- **Quyết định 5631/QĐ-BYT/2020** hướng dẫn quản lý sử dụng kháng sinh trong BV (AMS).
