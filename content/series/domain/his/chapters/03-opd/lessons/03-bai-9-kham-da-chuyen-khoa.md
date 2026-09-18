---
id: 019f5a01-d000-7001-his0-000000000303
title: "Bài 9: Khám đa chuyên khoa, chuyển khoa, hội chẩn ngoại trú"
slug: bai-9-kham-da-chuyen-khoa
description: >-
  Bệnh nhân khám 3-4 chuyên khoa trong cùng buổi — HIS phải gắn các lượt
  thành 1 visit, chia sẻ kết quả CLS, tránh chỉ định trùng và tổng hợp viện
  phí cuối ngày.
duration_minutes: 45
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-9-kham-da-chuyen-khoa-banner.webp
video_url: null
sort_order: 3
section_title: "Phần 3: Khám ngoại trú (OPD)"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![Khám đa chuyên khoa & chuyển khoa nội bộ](/storage/uploads/2026/05/his/bai-9-kham-da-chuyen-khoa-banner.webp)

## Mục tiêu

![Bệnh nhân được referral giữa các chuyên khoa](/storage/uploads/2026/05/his/bai-9-kham-da-chuyen-khoa-workflow.webp)

BN đến BV không phải lúc nào cũng chỉ khám 1 chuyên khoa. Người cao tuổi đa bệnh nền có thể đi 3–5 phòng khám trong cùng buổi sáng (Nội tổng quát → Tim mạch → Mắt → Nội tiết). Nếu HIS coi mỗi lần là 1 BN mới → 5 phiếu BHYT, 5 hoá đơn, 5 lần thanh toán → tan nát trải nghiệm.

Mục tiêu bài:

- Phân biệt **Visit vs Encounter** và data model.
- Hiểu **chuyển khoa nội bộ** (internal referral) đúng quy chế BHYT.
- Hiểu **hội chẩn ngoại trú / nội trú** + biên bản hội chẩn (chứng từ pháp lý).
- Thiết kế **chia sẻ kết quả CLS giữa encounter** + tránh chỉ định trùng.
- Tổng hợp **viện phí cuối visit** (1 hoá đơn).
- Xử lý edge case multi-doctor multi-disciplinary.

## Bối cảnh

- BV ĐK hạng I trở lên thường có 25–40 chuyên khoa OPD; tỷ lệ BN đa chuyên khoa 25–40 % lượt mỗi ngày.
- BN cao tuổi (chiếm 35–40 % lượt OPD) trung bình khám 2.3 chuyên khoa/lần đến viện.
- Nếu không có Visit, BN phải xếp hàng QMS riêng cho từng phòng → mất 4–6 giờ.
- BHYT giám định gắt: chuyển khoa nội bộ phải đúng tuyến, có chỉ định BS, không được tách 1 lượt thành nhiều phiếu để hưởng nhiều khám.

> **Case study**: BV TW H đầu tư mạng nội bộ + Visit model — thời gian trung bình BN đa chuyên khoa giảm từ 5h25 xuống 2h10. Doanh thu khám không giảm vì BHYT vẫn pass đúng (1 lượt khám/khoa, 1 hoá đơn).

## 1) Khái niệm Visit vs Encounter

| Khái niệm | Phạm vi | Ví dụ |
| --- | --- | --- |
| **Encounter** | 1 lượt khám tại 1 phòng, 1 BS | "Khám Nội của BS A lúc 8h30" |
| **Visit** | toàn bộ "lần đến viện" trong ngày | bao gồm 3 encounter Nội + Tim + Mắt |
| **Episode of care** | toàn bộ chu kỳ điều trị 1 bệnh | nhiều visit theo dõi 6 tháng ĐTĐ |

Trong FHIR R4 tương ứng:
- Encounter ↔ `Encounter`
- Visit ↔ `Encounter` cha có `partOf` chứa các encounter con (FHIR cho phép Encounter lồng nhau).
- Episode ↔ `EpisodeOfCare`.

## 2) Data model

```
EPISODE_OF_CARE
├── episode_id, patient_id, primary_diagnosis_icd
├── start_at, end_at, status
└── managing_doctor_id

VISIT
├── visit_id (PK)
├── patient_id (FK MPI)
├── episode_id (nullable)
├── visit_type (OPD | DAYCARE | IPD_ADMIT)
├── chief_complaint_summary
├── arrived_at, closed_at
├── total_amount, total_bhyt_amount
└── status (OPEN | CLOSED | CANCELED)

ENCOUNTER (extend bài 3)
├── encounter_id (PK)
├── visit_id (FK)             ◄── liên kết
├── refer_from_encounter_id (nullable, FK self)
├── referral_reason, referral_priority
└── ...

INTERNAL_REFERRAL
├── id, from_encounter_id, to_encounter_id
├── reason, suggested_specialty, priority (LOW | NORMAL | HIGH | URGENT)
├── created_by (BS), created_at
└── status (PENDING | ACCEPTED | DECLINED | COMPLETED)

CONSULT_REQUEST (hội chẩn)
├── id, encounter_id, requester_doctor_id
├── target_doctor_id | target_specialty
├── question, summary
├── reply, replied_by, replied_at
├── status (PENDING | REPLIED | DISCUSSED)
└── attachment_ids[]

CONSULT_MINUTES (biên bản hội chẩn từ 3 BS trở lên)
├── id, encounter_id, scheduled_at, location
├── participants[] (doctor_id, role)
├── summary, conclusion, plan
├── signed_by[] (chữ ký số)
└── pdf_id (lưu MRA)
```

## 3) Chuyển khoa nội bộ (Internal Referral)

### Quy trình chuẩn

```
[Phòng A: BS bấm "Chuyển khoa"]
        │
        ▼
[Chọn chuyên khoa B + BS hoặc nhóm + lý do + ưu tiên]
        │
        ▼
[HIS sinh Encounter #2 cùng visit_id]
        │
        ├─► Đẩy số ưu tiên 65 vào QMS phòng B (anti-starvation tránh ưu tiên dồn)
        ├─► Notify BS phòng B (WS / sound)
        └─► BN nhận thông báo "tới phòng B"
        │
        ▼
[BS phòng B nhìn được encounter #1, sinh hiệu, ICD, CLS đã có]
        │
        ▼
[BS phòng B khám + chẩn đoán riêng → encounter #2]
        │
        ▼
[Có thể tiếp tục refer → encounter #3]
```

### Quy tắc BHYT

- Chuyển khoa **trong cùng đợt KCB** (cùng visit) — BHYT vẫn áp đúng tuyến.
- BS phòng B phải có **chẩn đoán ICD riêng** — copy y nguyên → BHXH coi là tách lượt → từ chối.
- Phí khám của khoa B vẫn được tính (theo TT 39/2024) — riêng dòng dịch vụ.
- Không cho refer chéo "vòng tròn" (A→B→A) trong cùng ngày trừ khi có lý do hợp lý.
- Mỗi encounter trong visit gửi **1 dòng XML 1 riêng** vào giám định BHYT (theo QĐ 130/QĐ-BYT 2023).

## 4) Hội chẩn ngoại trú (Consult)

Khác với refer (chuyển BN), consult là "xin ý kiến":

| Loại | Mô tả | Sinh encounter? |
| --- | --- | --- |
| Consult nhanh | 1 BS hỏi 1 BS khác qua hệ thống | KHÔNG |
| Hội chẩn liên khoa | 2–3 BS khác khoa | tuỳ BV |
| Hội chẩn cấp BV | từ 3 BS trở lên / có Trưởng khoa | tạo CONSULT_MINUTES (biên bản) |
| Hội chẩn cấp tỉnh / TW | qua telehealth | có biên bản + ký số đa bên |

### Biên bản hội chẩn (chứng từ pháp lý)

- Theo Luật KCB 15/2023, hội chẩn phải có biên bản nếu liên quan quyết định điều trị quan trọng (vd. mổ, hoá trị, xạ trị, cắt cụt).
- Biên bản phải có: thời gian, địa điểm, danh sách BS tham gia, chức danh, tóm tắt, kết luận, kế hoạch, chữ ký số đa bên.
- Lưu MRA dạng PDF/A có chữ ký số CADES-BES (NĐ 130/2018).

## 5) Chia sẻ CLS giữa encounter cùng visit

Mặc định: mọi kết quả LIS/RIS trong cùng visit hiển thị cho **mọi encounter** trong visit đó.

### Tránh chỉ định trùng

```python
def can_order_test(encounter, test_code):
    visit = encounter.visit
    recent = visit.orders.filter(test=test_code, status__in=[DONE, IN_PROGRESS])
    if recent.exists():
        return Warning(
            f"Đã có chỉ định {test_code} lúc {recent.first().created_at} "
            f"(trong visit này). Chỉ định lại?",
            require_reason=True
        )
    # check 30 days history
    history = patient.orders.filter(
        test=test_code, created_at__gte=now() - timedelta(days=30)
    )
    if history.exists():
        return Warning(
            f"Đã có {test_code} trong 30 ngày qua. BHYT có thể từ chối.",
            require_reason=True
        )
    return OK
```

Lý do bỏ qua phải lưu vào `order.override_reason` để giải trình BHYT.

## 6) Tổng hợp viện phí cuối visit

```
[Encounter #1 DONE] ─┐
[Encounter #2 DONE] ─┼─► [Visit closer job]
[Encounter #3 DONE] ─┘            │
                                  ▼
                           [Sinh 1 hoá đơn duy nhất]
                                  │
                                  ├─► Tiền khám (3 dòng theo khoa)
                                  ├─► Tiền CLS (gộp, không trùng)
                                  ├─► Tiền thuốc
                                  ├─► Tiền thủ thuật
                                  ├─► Tổng phải trả
                                  ├─► BHYT tách dòng đồng chi trả
                                  └─► HĐĐT (NĐ 70/2025)
```

Quy tắc:
- Visit chỉ closed khi **tất cả encounter** đã DONE và BS ký số.
- Nếu 1 encounter còn AWAITING_CLS → visit OPEN sang ngày mai.
- BHYT giám định theo từng encounter nhưng billing thì gộp.

## 7) Edge case

- BN refer đến phòng B nhưng đổi ý không đi → encounter #2 status `DECLINED`, không tính phí.
- Phòng B từ chối nhận (BS ốm, hết slot) → notify lại BS phòng A để chọn BS khác.
- Visit vắt qua 24h (BN bỏ về tối, sáng quay lại) → close visit cũ, mở visit mới (theo BHYT 1 ngày = 1 lượt).
- BN refer A→B, B chỉ định CLS, KQ về sau khi BN đã closed → reopen encounter B (Trưởng khoa).
- Hội chẩn telehealth liên BV → ký số đa bên qua chứng thư CA của từng BV.
- BN refer khẩn (URGENT) → bypass QMS, vào ngay phòng B.
- BN có visit đang OPEN ở BV khác (qua HSSK) → cảnh báo trùng.

## 8) Sai lầm thường gặp

- Không dùng visit_id → tách thành nhiều phiếu BHYT → BHXH coi là tách lượt → xuất toán.
- Cho copy ghi chép từ encounter A → B → BHXH gắn flag.
- Cho refer vòng tròn A→B→A vô số lần → trục lợi.
- Hội chẩn không có biên bản → không có giá trị pháp lý.
- Chia sẻ CLS không filter theo consent (vd. HIV) → leak PHI.
- Visit close khi còn encounter AWAITING_CLS → mất kết quả.
- Hoá đơn xuất theo encounter (3 hoá đơn) → BN khó chịu, kế toán mệt.

## 9) Output / Chứng từ

| Chứng từ | Khi nào | Ghi chú |
| --- | --- | --- |
| Phiếu chuyển khoa nội bộ | khi refer | có QR encounter cũ |
| Biên bản hội chẩn (PDF/A) | hội chẩn ≥ 3 BS | ký số đa bên |
| Hoá đơn điện tử (1 visit) | visit closed | NĐ 70/2025 |
| Bệnh án ngoại trú per encounter | sau DONE | TT 46/2018 |
| XML 1 BHYT (n encounter = n dòng) | EOD | QĐ 130/QĐ-BYT 2023 |

## 10) Checklist UAT

- [ ] Tạo visit khi BN check-in lần đầu trong ngày.
- [ ] Tạo encounter #1 gắn visit_id.
- [ ] Refer A→B → encounter #2 cùng visit, ưu tiên 65.
- [ ] BS phòng B nhìn được encounter #1.
- [ ] BS phòng B copy y nguyên ICD → cảnh báo.
- [ ] BS phòng B chỉ định lại XN đã có → cảnh báo + yêu cầu lý do.
- [ ] Hội chẩn 3 BS → biên bản PDF/A có 3 chữ ký số.
- [ ] Visit close khi tất cả encounter DONE.
- [ ] Sinh 1 hoá đơn duy nhất gộp 3 encounter.
- [ ] BHYT XML 1 có 3 dòng riêng cho 3 encounter.
- [ ] AWAITING_CLS → visit không close, sang ngày sau.
- [ ] Refer A→B→A trong ngày → cảnh báo.
- [ ] HIV consult → chỉ BS chuyên khoa view được CLS HIV.

## 11) KPI vận hành

| KPI | Mục tiêu | Cách đo |
| --- | --- | --- |
| % BN đa chuyên khoa được dùng visit | 100 % | DB check |
| Avg encounter / visit | tracking | DB |
| Avg thời gian visit (BN đa khoa) | < 3 giờ | arrived_at → closed_at |
| % refer chấp nhận | > 90 % | INTERNAL_REFERRAL.status |
| Tỷ lệ CLS trùng phát hiện kịp thời | > 95 % | warning log |
| % hội chẩn có biên bản đầy đủ chữ ký | 100 % | MRA |
| Tỷ lệ xuất toán BHYT do tách lượt sai | < 0.1 % | giám định feedback |

## 12) Cơ sở pháp lý áp dụng (2026)

- Luật KCB **15/2023/QH15** — hội chẩn, ký số bệnh án.
- Luật GDĐT **20/2023/QH15** — chữ ký số đa bên.
- Lutaậ BHYT **51/2024/QH15** + NĐ **75/2023/NĐ-CP** — thông tuyến.
- TT **32/2023/TT-BYT** — báo cáo thống kê.
- TT **39/2024/TT-BYT** — giá DV BHYT (per-khoa).
- QĐ **130/QĐ-BYT 2023** — XML 1 BHYT.
- NĐ **130/2018/NĐ-CP** — chữ ký số CADES.
- NĐ **13/2023/NĐ-CP** — PHI (filter chia sẻ).
- NĐ **70/2025/NĐ-CP** sửa NĐ 123/2020 — HĐĐT.

> **Bài tiếp theo:** Cấp cứu (Emergency) — tiếp nhận khẩn, triage và phối hợp đa khoa.
