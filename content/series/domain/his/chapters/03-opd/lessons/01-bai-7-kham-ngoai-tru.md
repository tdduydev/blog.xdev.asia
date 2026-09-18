---
id: 019f5a01-d000-7001-his0-000000000301
title: "Bài 7: Khám ngoại trú (OPD) — luồng phòng khám"
slug: bai-7-kham-ngoai-tru
description: >-
  Quy trình khám ngoại trú: hỏi bệnh, khám lâm sàng, chỉ định CLS, đọc kết
  quả, kê đơn, ra y lệnh — và những bẫy thường gặp với BHYT ngoại trú.
duration_minutes: 70
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-7-kham-ngoai-tru-banner.webp
video_url: null
sort_order: 1
section_title: "Phần 3: Khám ngoại trú (OPD)"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![Khám ngoại trú (OPD) — luồng end-to-end](/storage/uploads/2026/05/his/bai-7-kham-ngoai-tru-banner.webp)

## Mục tiêu

![Bác sĩ khám tại phòng khám, EMR và đơn thuốc số hóa](/storage/uploads/2026/05/his/bai-7-kham-ngoai-tru-workflow.webp)

OPD (**Outpatient Department**) là module bận nhất của HIS — xử lý 70–90 % lượt khám, sinh ~60 % doanh thu nhưng cũng là nơi BHYT bị **xuất toán nhiều nhất** do thao tác ghi chép vội vàng. Một module OPD tốt cần cân bằng 3 mục tiêu xung đột: nhanh (BS có 5–10 phút/BN), đầy đủ (TT 32, gói dữ liệu BHYT), an toàn (CDS, double-check).

Mục tiêu bài này:

- Hiểu **luồng OPD end-to-end** với các nhánh CLS / chuyển khoa / nhập viện / chuyển tuyến.
- Nắm **state machine encounter OPD** đầy đủ (kể cả AWAITING_CLS, RECALL, REOPEN).
- Biết **bệnh án ngoại trú điện tử** theo TT 46/2018 + Luật KCB 15/2023.
- Thiết kế **business rules** chống bẫy xuất toán BHYT.
- Hiểu **integration pattern** với LIS/RIS/Pharmacy/Billing/MRA và HL7 ORM/ORU.
- Có bộ **UAT + KPI** vận hành.

## Bối cảnh: thực tế phòng khám VN

- Mỗi BS OPD trung bình khám **40–80 BN/buổi sáng** (tải cao gấp 3–5 lần OECD).
- Thời gian khám trung bình 5–8 phút/BN — không thể nhập tay tự do.
- 30–50 % BN có CLS đi kèm → có khoảng "chết" 1–3 giờ giữa lúc đi làm CLS và quay lại đọc kết quả.
- BHYT thường xuất toán: thiếu chẩn đoán, sai mã ICD, chỉ định không phù hợp chẩn đoán, thiếu chữ ký số.
- Phòng khám chuyên gia / yêu cầu: thời gian dài hơn (15–20 phút/BN), bố trí slot ít hơn.

> **Case study**: BV ĐK tỉnh M sau 1 năm vận hành EMR ngoại trú — quyết toán quý IV bị xuất toán **2.4 tỷ đồng** vì 12.000 phiếu khám không có ICD chính (BS chỉ ghi text "viêm họng"). **Khắc phục**: bắt buộc field ICD ở UI + rule "không thoát khám nếu thiếu" + báo cáo gợi ý hằng tuần. Sau 3 tháng tỷ lệ thiếu ICD < 0.5 %.

## Actor

| Vai trò | Hành động chính | Quyền hệ thống |
| --- | --- | --- |
| Bác sĩ khám | Hỏi bệnh, khám, ra chỉ định, kê đơn, kết luận | view + write encounter, sign |
| Điều dưỡng phòng khám | Đo sinh hiệu, hướng dẫn, hỗ trợ thủ thuật | write vital + procedure log |
| Thu ngân khoa phòng | Thu tạm ứng cho CLS / thuốc | write payment intent |
| Bệnh nhân | Đi làm CLS, quay lại đọc kết quả | view qua app |
| Trưởng khoa | Phê duyệt y lệnh đặc biệt, ký lại sau REOPEN | sign + override |

## Luồng nghiệp vụ chuẩn (chi tiết)

```
[QMS gọi vào phòng]
        │
        ▼
[Đo sinh hiệu (ĐD)]
        │
        ▼
[BS hỏi bệnh + khám] ◄────────────────┐
        │                              │
        ▼                              │
[Cần CLS?]──Y──► [Ra chỉ định          │
        │         LIS/RIS/Thủ thuật]   │
        │              │               │
        │              ▼               │
        │      [BN thu phí CLS]        │
        │              │               │
        │              ▼               │
        │      [BN đi làm CLS          │
        │       BS gọi BN tiếp theo]   │
        │              │               │
        │              ▼               │
        │      [KQ về EMR              │
        │       → notify + RECALL]     │
        │              │               │
        │              ▼               │
        │      [BN quay lại            │
        │       (ưu tiên 65)]          │
        │              └───────────────┘
        ▼
[Kết luận + ICD chính/phụ + chữ ký số]
        │
        ▼
[Quyết định:]
   ├─► Kê đơn ngoại trú → Pharmacy
   ├─► Hẹn tái khám → Appointment
   ├─► Chuyển khoa nội bộ → Encounter mới
   ├─► Nhập viện → IPD (bài 12)
   └─► Chuyển tuyến → bài 14
        │
        ▼
[Phiếu thu cuối / xuất HĐĐT / lấy thuốc]
```

## Bệnh án ngoại trú điện tử (TT 46/2018, đang được thay thế bởi văn bản mới — xem bài 30)

Một lượt OPD phải đầy đủ:

| Trường | Bắt buộc | Nguồn |
| --- | --- | --- |
| Lý do đến khám | ✅ | BN khai |
| Diễn biến bệnh | ✅ | BS hỏi |
| Tiền sử bản thân & gia đình | ✅ | BS hỏi (template) |
| Khám toàn thân | ✅ | BS khám |
| Khám cơ quan bộ phận | ✅ (chuyên khoa) | BS khám |
| Sinh hiệu (M, T, HA, NT, SpO₂, BMI) | ✅ | ĐD nhập |
| Chẩn đoán **ICD-10 chính + phụ** | ✅ | BS chốt |
| Hướng xử trí | ✅ | BS |
| Đơn thuốc / chỉ định CLS | tùy | BS |
| Lời dặn, hẹn tái khám | ✅ | BS |
| Chữ ký số bác sĩ (Luật GDĐT 20/2023, NĐ 130/2018) | ✅ | hệ thống |
| Mã ngày KCB liên thông BHYT (XML 1) | ✅ (BHYT) | hệ thống |

Thiếu bất kỳ trường nào → BHYT từ chối thanh toán cho lượt đó (theo QĐ 130/QĐ-BYT 2023 thay QĐ 4210/2017).

## State machine OPD encounter (đầy đủ)

```
[REGISTERED]
     │
     ▼
[WAITING] (ở QMS)
     │
     ▼
[IN_EXAM] ◄──────────────────────────┐
     │                                │
     ├─► [AWAITING_CLS] (BN đi làm)   │
     │        │                       │
     │        └─► KQ về → RECALL ─────┘
     │
     ├─► [DONE] → [BILLED] → [CLOSED]
     │
     ├─► [TRANSFER_INTERNAL] (chuyển khoa nội bộ → Encounter mới, bài 9)
     ├─► [TRANSFER_IPD] (nhập viện → IPD, bài 12)
     ├─► [REFERRAL] (chuyển tuyến, bài 14)
     └─► [CANCELED] (BN bỏ về)

[CLOSED] ──► [REOPEN] (Trưởng khoa, ≤ 7 ngày, audit log)
```

`AWAITING_CLS` rất quan trọng: BS "trả số" cho BN khác để không tắc; HIS phải tự đẩy sang RECALL khi KQ về (priority 65 — xem bài 6).

## Quy tắc nghiệp vụ với BHYT (chi tiết)

1. **Mỗi đợt khám = 1 phiếu BHYT** — không gộp 2 chuyên khoa vào 1 phiếu (mỗi khoa 1 encounter, 1 dòng XML 1).
2. **Chỉ định CLS phải có chẩn đoán tương ứng** — XN không liên quan ICD chính/phụ → bị lọc khi giám định.
3. **Trùng dịch vụ trong 30 ngày** (cùng XN, cùng BV, không có lý do hợp lý) → BHYT cảnh báo / xuất toán; HIS chặn ở UI và yêu cầu ghi lý do.
4. **Đơn thuốc ngoại trú**: ≤ 30 ngày thuốc thường; 60–90 ngày cho bệnh mạn theo **TT 52/2017/TT-BYT** (đang chuyển sang TT 22/2024 — xem bài 22).
5. **Chữ ký số BS + DS** trên đơn thuốc kê đơn (Luật GDĐT 20/2023).
6. **Mã chương Z (lý do tiếp xúc DV y tế)** — không thanh toán BHYT trong nhiều tình huống ngoại trú; HIS cảnh báo khi BS chọn.
7. **Khám sàng lọc / khám sức khoẻ định kỳ**: BHYT không thanh toán; bắt buộc loại tiếp nhận = "DV" hoặc "yêu cầu".
8. **Nội soi / siêu âm thực hiện trong lúc khám**: gắn `procedure_in_clinic = true`; BHYT có giá riêng theo TT 39/2024.
9. **Tâm thần / nghiện chất / HIV** — đơn thuốc & hồ sơ có thêm rule bảo mật cao (PHI mức 2, NĐ 13/2023); chỉ BS chuyên khoa được view.
10. **Chuyển khoa nội bộ** trong cùng visit không sinh phiếu BHYT mới — tách dịch vụ nhưng cùng giấy chuyển nội bộ (bài 9).

## Data model OPD

```
ENCOUNTER (extend từ bài 3)
├── chief_complaint, history_of_illness, family_history
├── physical_exam (JSON theo template chuyên khoa)
├── icd_primary, icd_secondary[], icd_complication[]
├── conclusion, advice, follow_up_at
├── status, awaiting_cls_since
├── doctor_signed_at, doctor_sign_id (chữ ký số ID)
└── trans_target (IPD encounter_id | referral_id | new_encounter_id)

VITAL_SIGNS
├── id, encounter_id, taken_at, taken_by
├── temp_c, pulse_bpm, sbp, dbp, rr, spo2, weight_kg, height_cm
├── bmi (computed), pain_score (NRS 0–10)
└── flag_abnormal[]

ORDER (CLS / thuốc / thủ thuật) — bài 15
├── order_id, encounter_id, type (LAB | IMAGING | PROCEDURE | DRUG)
├── status (PENDING_PAY | PAID | IN_PROGRESS | DONE | CANCELED)
├── icd_link[] (chẩn đoán làm căn cứ)
└── result_id (FK)

NOTE_TEMPLATE
├── id, specialty_code, doctor_id (nullable = global)
├── name, content_markdown, variables[]
└── usage_count

CLINICAL_DECISION_LOG (CDS)
├── id, encounter_id, rule_id, severity (INFO | WARN | CRITICAL)
├── triggered_at, message, override_reason, override_by
```

## Integration patterns

### 1) HL7 v2 ORM^O01 (đặt order CLS)

```
MSH|^~\&|HIS|BVH|LIS|LAB|20260512091012||ORM^O01|MSGOR0042|P|2.5
PID|1||0001234567^^^MPI||NGUYEN^VAN^AN||19850515|M
PV1|1|O|OPD-NOIA^P301|||| BS001
ORC|NW|O0042|||SC|||||20260512091012|BS001
OBR|1|O0042||CBC^Công thức máu||20260512091012||||||||||BS001|||||LAB||||
DG1|1|I10|J20.9^Viêm phế quản cấp||W
```

### 2) HL7 v2 ORU^R01 (nhận kết quả)

LIS bắn về khi có kết quả → HIS gắn vào encounter, set RECALL.

### 3) FHIR R4 — DiagnosticReport + ServiceRequest

Cho liên thông HSSK / hồ sơ chia sẻ liên BV.

### 4) Pharmacy queue

Khi BS ký đơn → đẩy event `prescription.signed` → kho dược tự pre-pick. BN xuống kho lấy thuốc đã sẵn.

### 5) Billing

Khi `DONE` → tính phí; chốt visit chỉ khi tất cả encounter cùng visit_id `DONE` (bài 9 + bài 33).

## Edge case

- BS ký đơn rồi BN không lấy thuốc → đơn vẫn nằm trong queue dược; rule: hết ca chuyển status `DISPENSE_MISSED`, lưu thuốc trả về kho (bài 24).
- KQ XN bất thường nguy hiểm (vd. K+ > 7 mmol/L) → LIS gửi alert ngay cho BS qua WS, đồng thời cảnh báo trên màn hình OPD; có thể auto chuyển BN sang ER.
- BN đang AWAITING_CLS thì hết giờ làm việc → encounter giữ trạng thái sang ngày sau, không tự CLOSE; sáng hôm sau cảnh báo Trưởng khoa.
- BN khám 2 phòng cùng lúc (vd. khám gấp) → cảnh báo nhưng cho phép nếu có lý do.
- BS quên ký số → cảnh báo cuối ngày + chặn quyết toán; chỉ Trưởng khoa override được.
- BN từ chối CLS → ghi nhận `patient_refused = true` + signed consent (PDF lưu MRA).
- Chỉ định "ngoài danh mục" — XN không có trong giá BHYT → cảnh báo, BN ký cam kết tự trả.

## Sai lầm thường gặp

- BS chốt encounter mà chỉ có ICD trong text, không có mã chuẩn → BHYT từ chối.
- AWAITING_CLS không có timeout → encounter mở 30 ngày, sai báo cáo TT 32.
- Cho copy-paste y nguyên ghi chép từ encounter trước → BHYT gắn flag "ghi chép đáng nghi".
- Không có CDS đơn giản (vd. cảnh báo HA cao kèm chỉ định thuốc hạ áp) → bỏ sót chẩn đoán.
- Cho BS sửa ICD sau khi đã quyết toán BHYT → mất tính bất biến của bệnh án.
- Không log thời điểm "trả số AWAITING_CLS" → không tính được KPI thời gian khám.
- Pharmacy nhận đơn không qua event mà polling DB → trễ 30–60 giây.

## Output / Chứng từ

| Chứng từ | Khi nào | Lưu trữ |
| --- | --- | --- |
| Bệnh án ngoại trú (PDF/A) | sau DONE + ký số | MRA, TT 46/2018 |
| Đơn thuốc điện tử | khi BS ký | Đơn thuốc QG, bài 22 |
| Phiếu chỉ định CLS | khi tạo order | có QR encounter |
| Hoá đơn điện tử | sau BILLED | NĐ 70/2025 (bài 35) |
| Giấy chứng nhận nghỉ ốm BHXH | nếu BS cấp | TT 56/2017 + sửa đổi |
| XML giám định BHYT | EOD | QĐ 130/QĐ-BYT 2023 |

## Checklist UAT

- [ ] ĐD nhập sinh hiệu → encounter chuyển IN_EXAM.
- [ ] BS không nhập ICD chính → không cho thoát khám.
- [ ] Tạo CLS → encounter sang AWAITING_CLS; BS gọi tiếp BN khác được.
- [ ] KQ về → notify BS + ưu tiên RECALL.
- [ ] AWAITING_CLS quá 4h → cảnh báo.
- [ ] Trùng XN trong 24h → cảnh báo + yêu cầu lý do.
- [ ] Đơn thuốc 30 ngày OK; 90 ngày cho bệnh mạn (theo BHYT pass).
- [ ] Mã chương Z với BN BHYT → cảnh báo.
- [ ] BS ký số xong → mới BILLED được.
- [ ] CLOSED → REOPEN bởi Trưởng khoa, log đầy đủ.
- [ ] Chuyển khoa nội bộ → sinh encounter #2 trong cùng visit.
- [ ] HL7 ORM bắn sang LIS đúng định dạng.
- [ ] HL7 ORU nhận về gắn đúng encounter.
- [ ] BN từ chối CLS → consent PDF gắn vào MRA.

## KPI vận hành

| KPI | Mục tiêu | Cách đo |
| --- | --- | --- |
| Avg thời gian khám / BN | 6–12 phút | IN_EXAM → DONE |
| % encounter có ICD chuẩn | > 99 % | scan field |
| % encounter có chữ ký số | 100 % cuối ngày | DB check |
| % AWAITING_CLS đóng trong ca | > 95 % | timestamp |
| Tỷ lệ xuất toán BHYT | < 0.5 % | XML giám định |
| Tỷ lệ RECALL gọi đúng giờ | > 90 % | QMS |
| % template được dùng | > 70 % | log usage |
| % CDS bị override | < 10 % (override cao = rule sai) | CDS log |

## Cơ sở pháp lý áp dụng (2026)

- Luật KCB **15/2023/QH15** — bệnh án điện tử có giá trị pháp lý.
- Luật GDĐT **20/2023/QH15** — chữ ký số.
- TT **46/2018/TT-BYT** — bệnh án điện tử (sắp thay).
- TT **32/2023/TT-BYT** — báo cáo thống kê y tế.
- TT **52/2017/TT-BYT** — kê đơn ngoại trú (chuyển sang TT **22/2024/TT-BYT**, xem bài 22).
- QĐ **130/QĐ-BYT 2023** — chuẩn dữ liệu đầu ra (thay QĐ 4210/2017).
- TT **39/2024/TT-BYT** — giá DV BHYT.
- NĐ **13/2023/NĐ-CP** — PHI.
- NĐ **130/2018/NĐ-CP** — chữ ký số.

> **Bài tiếp theo:** Sinh hiệu, template hỏi bệnh & ICD-10 — chi tiết kỹ thuật nhập liệu.
