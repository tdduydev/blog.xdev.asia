---
id: 019f5a01-d000-7001-his0-000000000401
title: "Bài 10: Cấp cứu (Emergency) — tiếp nhận khẩn & triage"
slug: bai-10-cap-cuu-tiep-nhan-triage
description: >-
  Quy trình cấp cứu trong HIS: tiếp nhận trước, hoàn thiện thủ tục sau,
  thang triage 5 mức (ESI), kích hoạt code (Code Blue, STEMI, Stroke), bàn
  giao nội trú/phẫu thuật.
duration_minutes: 60
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-10-cap-cuu-tiep-nhan-triage-banner.webp
video_url: null
sort_order: 1
section_title: "Phần 4: Cấp cứu (Emergency)"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![Cấp cứu — triage ESI & code y khoa](/storage/uploads/2026/05/his/bai-10-cap-cuu-tiep-nhan-triage-banner.webp)

## Mục tiêu

![Triage tại ER với phân tầng ưu tiên ESI](/storage/uploads/2026/05/his/bai-10-cap-cuu-tiep-nhan-triage-workflow.webp)

Cấp cứu (ER) là module **đặc biệt nhất** của HIS: nghiệp vụ ngược (làm trước, ghi sau), thời gian tính bằng giây, đa người tham gia đồng thời, dữ liệu sống còn. Một module ER tốt phải:

- Cho phép tiếp nhận BN trong < 30 giây mà không cần CCCD/BHYT.
- Triage chuẩn quốc tế (ESI 5 mức) với decision support.
- Kích hoạt **code** y khoa (Code Blue, STEMI, Stroke, Trauma, Sepsis) chỉ với 1 click.
- Đẩy đồng thời sang LIS, RIS, Pharmacy, Blood Bank, OR mà không chờ thanh toán.
- Bàn giao mượt sang IPD/OR/ICU với eHandover.

## Bối cảnh: ER ở BV Việt Nam

- BV TW Bạch Mai, Chợ Rẫy: ER 200–400 lượt/ngày, peak 30 BN/giờ.
- BV tuyến huyện: 20–50 lượt/ngày nhưng độ phức tạp tương đương khi xảy ra TNGT đa nạn.
- Tử vong trong 24h đầu = chỉ số chất lượng ER hàng đầu (báo cáo TT 32).
- BHYT cấp cứu **luôn coi đúng tuyến** (Luật BHYT 51/2024 Đ.22) — nhưng vẫn cần xác định BHYT về sau.
- TNGT bắt buộc báo công an (Đ.78 Luật KCB 15/2023) — HIS cần gắn flag legal_alert.

> **Case study**: BV ĐK tỉnh G triển khai ER e-triage ESI — door-to-needle (STEMI) giảm từ 92 phút → 38 phút sau 6 tháng. Lý do: code STEMI 1-click tự kích hoạt cath lab + báo bs can thiệp + đặt order ECG/troponin.

## Đặc thù tiếp nhận cấp cứu

| Đặc điểm | OPD | ER |
| --- | --- | --- |
| Thứ tự | check-in → khám | khám → check-in (ngược) |
| BHYT verify | trước khi khám | sau khi cấp cứu |
| Định danh BN | bắt buộc CCCD/BHYT | có thể "John Doe" / "Unknown_2026_05_12_001" |
| Thanh toán | tạm ứng trước CLS | làm CLS ngay, chốt phí sau |
| Người ký | BS chính khám | có thể nhiều BS tham gia 1 BN |
| Vai trò ĐD | hỗ trợ | quyết định triage (front-line) |

## Thang triage ESI (Emergency Severity Index 5-level)

| Level | Tên VN | Tiêu chí | Đáp ứng |
| --- | --- | --- | --- |
| **ESI 1** | Nguy kịch | Cần can thiệp cứu sống ngay (ngừng tim, sốc, đường thở) | Bs + ĐD ngay; phòng hồi sức |
| **ESI 2** | Cấp cứu | Nguy cơ cao, dấu hiệu sinh tồn không ổn, đau ngực | < 10 phút BS khám |
| **ESI 3** | Khẩn | ≥ 2 nguồn lực CLS (XN + CT…) | < 30 phút |
| **ESI 4** | Ít khẩn | 1 nguồn lực | < 60 phút |
| **ESI 5** | Không khẩn | 0 nguồn lực, có thể chuyển OPD | < 120 phút |

Quy tắc thuật toán ESI:

1. Sống còn? (đường thở/tuần hoàn/ý thức) → ESI 1.
2. Tình huống nguy cơ cao / đau dữ dội / lú lẫn? → ESI 2.
3. Đếm số nguồn lực dự kiến (XN, CDHA, thuốc IV, hội chẩn) → 3/4/5.
4. Có dấu hiệu sinh tồn vùng nguy hiểm (HR/RR/SpO₂/T) → đẩy lên 1 mức.

## Luồng nghiệp vụ ER

```
[BN tới cổng]
     │
     ▼
[Triage ĐD: hỏi nhanh + đo sinh hiệu < 90s]
     │
     ▼
[Phân ESI 1-5]
     │
     ├─ ESI 1/2 → vào hồi sức ngay; song song:
     │           • code (Blue/STEMI/Stroke/Sepsis/Trauma) auto-activate
     │           • alert team (BS, ĐD, KTV CT, NH máu)
     │           • mở encounter "ER fast-track" (chưa cần CCCD)
     │
     ├─ ESI 3 → phòng cấp cứu thường, BS khám < 30 ph
     ├─ ESI 4/5 → ghế chờ; có thể chuyển OPD nếu hết nguy
     │
     ▼
[BS khám + chỉ định CLS, thuốc IV, máu]
     │
     ▼
[Trong lúc làm CLS: ĐD/người nhà hoàn thiện thủ tục]
     │
     ▼
[Quyết định: ra viện / nhập viện / chuyển OR / chuyển ICU / chuyển viện]
     │
     ▼
[Bàn giao + hoàn thiện hồ sơ + chốt BHYT]
```

## Kích hoạt code y khoa (1 click)

Mỗi code = 1 protocol bundle gồm: thông báo team, đặt order CLS, mở phòng/thiết bị, đếm thời gian KPI.

| Code | Trigger | Bundle action |
| --- | --- | --- |
| Code Blue | ngừng tim/ngừng thở | gọi team CPR, mở RR, lấy crash cart, chuẩn bị adrenaline |
| Code STEMI | ECG ST elevation | báo BS tim mạch can thiệp, mở cath lab, đặt troponin/CK-MB, ASA + clopidogrel |
| Code Stroke | FAST dương tính | báo BS thần kinh, đặt CT sọ ưu tiên, lấy đường truyền 2 bên, glucose máu |
| Code Sepsis | qSOFA ≥ 2 | bundle 1h: cấy máu, kháng sinh phổ rộng, lactate, dịch tinh thể 30 mL/kg |
| Code Trauma | TNGT/đa chấn thương | báo team trauma, mở giường C, máu O Rh-, FAST scan |
| Code OB | sản khoa khẩn | báo BS sản, chuẩn bị OR, ngân hàng máu |

Mỗi code có **timer KPI** chạy realtime trên màn hình lớn ER (door-to-needle, door-to-balloon).

## State machine ER encounter

```
[ARRIVED] → [TRIAGED (ESI N)] → [IN_TREATMENT]
                                    │
                                    ├─► [DISCHARGED_HOME]
                                    ├─► [TRANSFER_IPD] (bài 12)
                                    ├─► [TRANSFER_OR] (bài 25)
                                    ├─► [TRANSFER_ICU] (bài 11)
                                    ├─► [REFERRED_OUT] (bài 14, chuyển tuyến)
                                    ├─► [LWBS] (Left Without Being Seen)
                                    └─► [DECEASED] → giấy báo tử + công an nếu TNGT
```

## Quy tắc nghiệp vụ

1. **Tiếp nhận trước, thủ tục sau** — encounter mở ngay khi triage; tên có thể "Unknown_YYYY_MM_DD_NNN".
2. **BHYT cấp cứu** auto-flag = "đúng tuyến" (Luật BHYT 51/2024 Đ.22) bất kể nơi đăng ký.
3. **TNGT** → bật flag `traffic_accident = true`, tự sinh thông báo công an, xét nghiệm cồn/ma tuý nếu nghi ngờ (Đ.78 Luật KCB 15/2023).
4. **BN vô danh / mất ý thức** → mở encounter "John Doe", sau khi nhận dạng → merge MPI (bài 4).
5. **Code y khoa** chỉ kích hoạt được bởi BS hoặc ĐD trưởng kíp.
6. **Order khẩn** không chờ payment intent — đẩy thẳng LIS/RIS/Pharmacy.
7. **Thuốc cấp cứu** từ tủ trực ER (xem bài 24) — vượt rào kê đơn nhưng phải bù sổ trong 24h.
8. **Bàn giao kíp ER** cuối ca: handover có chữ ký số 2 bên.
9. **LWBS** (BN bỏ về không khám): vẫn lưu encounter để tính KPI; không xuất phí.
10. **Tử vong < 24h từ nhập viện** → báo cáo bắt buộc TT 32 + audit nội bộ.

## Data model ER

```
ER_ENCOUNTER (kế thừa ENCOUNTER + đặc thù)
├── arrival_mode (WALK_IN | AMBULANCE | TRANSFER | POLICE)
├── triage_level (1..5), triage_at, triage_by
├── triage_vitals (jsonb), chief_complaint
├── code_activated[] (BLUE | STEMI | STROKE | SEPSIS | TRAUMA | OB)
├── code_activation_log (timestamps cho từng action)
├── door_to_doctor_min, door_to_decision_min
├── disposition (HOME | IPD | OR | ICU | REF_OUT | LWBS | DEATH)
├── traffic_accident, alcohol_test_result, drug_test_result
├── unknown_identity (bool), john_doe_id
└── handover_signed_at, handover_signed_by[]

CODE_ACTIVATION
├── id, encounter_id, code_type
├── activated_at, activated_by
├── team_notified[] (user_id, notified_at, ack_at)
├── door_to_needle_min, door_to_balloon_min
└── outcome (SUCCESS | DEATH | TRANSFERRED)

ER_HANDOVER
├── id, from_encounter, to_encounter (IPD/OR/ICU)
├── from_doctor, to_doctor, signed_at
├── summary, vital_at_handover, pending_results[]
└── medications_given[], allergies, code_status (DNR/Full)
```

## Integration patterns

### 1) Pre-hospital (xe cứu thương) → ER

- Hệ thống MDT (Mobile Data Terminal) trên xe gửi tín hiệu pre-arrival: ETA, triage sơ bộ, sinh hiệu, ECG → HIS hiển thị màn hình ER 5–10 phút trước khi BN đến.
- Tích hợp 115 (TTCC TP.HCM, Hà Nội) qua API.

### 2) HL7 v2 — ADT^A04 + OBR khẩn

```
MSH|^~\&|HIS|BVH|LIS|LAB|20260512100501||ORM^O01|MSGE0099|P|2.5|||AL|NE|VN
PID|||UNKNOWN_20260512_007^^^MPI||DOE^JOHN
PV1|1|E|ER^BED5|||| BS_TRUC|||EMER||||||TRAUMA
ORC|NW|E0099|||SC|||||||BS_TRUC
OBR|1|E0099||TROP_I^Troponin I|S||20260512100501|||||||||BS_TRUC|||||LAB|STAT
```

`STAT` priority + `EMER` admit type → LIS/RIS xử lý ngay.

### 3) FHIR R4 — `Encounter` + `Observation` + `Condition`

`Encounter.class = EMER`, `priority = ASAP`. `Observation.status = preliminary` cho sinh hiệu triage.

### 4) Cảnh báo hệ thống

- Loa thông báo theo zone (zone trauma, zone hồi sức).
- LED hiển thị code đang chạy + timer.
- Alert qua Zalo OA / SMS cho BS oncall ngoài giờ.

### 5) Liên kết ngân hàng máu

Code Trauma auto-order 4 đơn vị O Rh-; ngân hàng máu (bài 41) reserve sẵn.

## Edge case

- **Đa nạn (mass casualty)**: kích hoạt MCI mode → triage tag (đỏ/vàng/xanh/đen) thay ESI; mở batch encounter, BS ĐD nhập sau.
- **BN từ chối điều trị** (AMA): in cam kết, ký 2 bên + nhân chứng; encounter close `LEFT_AMA`.
- **DNR / Living will**: nếu BN có chỉ thị từ trước (qua HSSK) → hiển thị banner đỏ "DNR" lúc triage; team không CPR.
- **Tử vong ngoại viện (DOA)**: vẫn mở encounter ER → khám pháp y → giấy báo tử (xem bài 14).
- **Bạo lực gia đình / xâm hại**: flag confidential, chỉ BS phụ trách + công an view; lưu vật chứng (chuỗi giám hộ).
- **Trẻ em vô danh**: ưu tiên báo Bảo trợ XH + công an.
- **BN truyền nhiễm cao** (cúm, covid, lao đa kháng): isolate room, alert vệ sinh dịch tễ.

## Sai lầm thường gặp

- Bắt CCCD trước triage → kéo dài thời gian, BN mất cơ hội cứu sống.
- Triage không có CDS, ĐD mới chấm bằng cảm tính → lệch level.
- Code STEMI chỉ phụ thuộc bs nhớ, không có 1-click bundle → mất time.
- Order CLS khẩn vẫn phải qua thu ngân → trễ.
- Không có handover chính thức ER→ICU → mất y lệnh, sai liều.
- Encounter "Unknown" không bao giờ được merge MPI sau → BN có 2 records.
- Không log đủ door-to-* timer → không cải tiến KPI.

## Output / Chứng từ

| Chứng từ | Khi nào | Pháp lý |
| --- | --- | --- |
| Bệnh án cấp cứu | sau IN_TREATMENT | TT 46/2018 |
| Giấy ra viện ER (nếu DISCHARGED_HOME) | sau khám | TT 56/2017 |
| Giấy chuyển viện | nếu REFERRED_OUT | TT 14/2014 + sửa đổi |
| Giấy báo tử | DECEASED | NĐ 123/2015 hộ tịch |
| Báo cáo công an | TNGT/bạo lực | Đ.78 Luật KCB 15/2023 |
| Code activation log (PDF) | sau code | Y vụ |
| Hoá đơn điện tử | sau BILLED | NĐ 70/2025 |
| XML BHYT | EOD | QĐ 130/QĐ-BYT 2023 |

## Checklist UAT

- [ ] Triage trong < 90 giây.
- [ ] Mở encounter ER không cần CCCD.
- [ ] ESI 1 → cảnh báo team + mở phòng hồi sức.
- [ ] Code STEMI 1 click → bundle 6 action chạy.
- [ ] Door-to-needle / door-to-balloon timer chạy realtime.
- [ ] BHYT auto-flag đúng tuyến cho ER.
- [ ] TNGT → flag + tạo báo cáo công an.
- [ ] Order STAT bắn LIS không qua payment.
- [ ] Thuốc tủ trực ER ghi nhận, bù sổ trong 24h.
- [ ] Handover ER→ICU có 2 chữ ký số.
- [ ] LWBS lưu encounter, không tính phí.
- [ ] Unknown encounter → sau merge MPI.
- [ ] Pre-arrival từ ambulance hiển thị 5 phút trước.
- [ ] MCI mode triage tag.
- [ ] DNR banner hiện khi BN có chỉ thị.

## KPI vận hành

| KPI | Mục tiêu | Cơ sở |
| --- | --- | --- |
| Door-to-triage | < 5 phút | JCI/ACEP |
| Door-to-doctor (ESI 2) | < 10 phút | JCI |
| Door-to-needle (STEMI tiêu sợi huyết) | < 30 phút | AHA 2024 |
| Door-to-balloon (STEMI PCI) | < 60 phút | AHA |
| Door-to-CT (Stroke) | < 25 phút | AHA |
| Sepsis bundle 1h | > 90 % | SCCM 2024 |
| LWBS rate | < 2 % | KPI BV |
| Tử vong 24h | < 0.5 % | TT 32 |
| Triage accuracy | > 90 % (so với BS verify) | audit hàng tuần |
| % Unknown được merge MPI | > 95 % | bài 4 |

## Cơ sở pháp lý áp dụng (2026)

- Luật KCB **15/2023/QH15** — Đ.66 quyền tiếp cận, Đ.78 báo TNGT.
- Luật BHYT **51/2024/QH15** — Đ.22 cấp cứu coi đúng tuyến.
- TT **14/2014/TT-BYT** — chuyển tuyến.
- TT **32/2023/TT-BYT** — báo cáo thống kê (tử vong 24h).
- TT **46/2018/TT-BYT** — bệnh án điện tử.
- NĐ **109/2016/NĐ-CP** sửa NĐ **155/2018** — điều kiện hành nghề ER.
- NĐ **13/2023/NĐ-CP** — PHI (bạo lực, lạm dụng).

> **Bài tiếp theo:** Phối hợp ER ↔ Phòng mổ ↔ ICU và bàn giao điều dưỡng.
