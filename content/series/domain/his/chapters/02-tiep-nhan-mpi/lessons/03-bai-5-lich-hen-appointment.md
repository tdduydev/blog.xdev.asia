---
id: 019f5a01-d000-7001-his0-000000000203
title: "Bài 5: Lịch hẹn (Appointment) — đặt khám đa kênh"
slug: bai-5-lich-hen-appointment
description: >-
  Quản lý slot, lịch làm việc bác sĩ, đặt khám online qua web/app/call center,
  no-show & overbooking, gắn với QMS và BHYT.
duration_minutes: 50
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-5-lich-hen-appointment-banner.webp
video_url: null
sort_order: 3
section_title: "Phần 2: Tiếp nhận, MPI, Lịch hẹn"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![Lịch hẹn — đặt khám đa kênh](/storage/uploads/2026/05/his/bai-5-lich-hen-appointment-banner.webp)

## Mục tiêu

![Bệnh nhân đặt lịch trên app, slot bác sĩ tự động khớp](/storage/uploads/2026/05/his/bai-5-lich-hen-appointment-workflow.webp)

Đặt lịch hẹn là "lớp mềm" đứng trước REG: BN chưa tới viện nhưng đã chiếm slot của bác sĩ / máy / phòng. Một module Appointment tốt sẽ:

- Giảm **tỷ lệ chờ tại quầy** xuống < 30 phút (so với 1–2 giờ của BV chưa có).
- Tăng **tỷ lệ lấp đầy slot bác sĩ** (tùy BV, mục tiêu 75–85 %).
- Cho phép **điều phối tài nguyên quý hiếm** (CT/MRI/PET, GS đầu ngành) một cách tự động.
- Tích hợp với VNeID/HSSK để BN đặt khám cả ở BV khác có liên thông.

Mục tiêu bài này:

- Mô hình hoá **resource × schedule × slot** đủ mềm cho cả OPD thường, khám yêu cầu, CT/MRI, tư vấn di truyền, IVF.
- Nắm các **kênh đặt khám** đang dùng (web/app/Zalo/call center/quầy/VNeID/công ty B2B).
- Thiết kế **state machine đầy đủ** + luồng check-in qua kiosk.
- Biết thuật toán **overbook + no-show buffer** an toàn.
- Nắm **integration pattern** với gateway thanh toán, SMS/Zalo OA, FHIR `Appointment`.
- Có bộ **UAT + KPI vận hành** + bản đồ pháp lý.

## Bối cảnh: đặt lịch ở BV Việt Nam có gì đặc biệt

Khác với clinic Singapore/Mỹ chủ yếu đặt trước, BV Việt Nam có **mô hình hỗn hợp**:

- 60–80 % BN walk-in (không đặt trước) — đặc biệt BHYT.
- 20–40 % đặt qua app/web/Zalo OA — chủ yếu dịch vụ/yêu cầu.
- Tỉ lệ no-show 8–20 % (cao hơn nước phát triển 5–7 %) vì BN nhớ mơ hồ, không có phí phạt.
- Có hiện tượng "cò đặt lịch" — đặt trước hàng trăm slot của GS đầu ngành rồi bán lại → cần anti-bot.
- BHYT bắt buộc verify lại thẻ tại thời điểm KCB — không đặt lịch trước được với thanh toán BHYT.

> **Case study**: BV ĐK tỉnh Z mở đặt lịch online — sau 2 tuần, 70 % slot của 3 GS hàng đầu bị đặt sạch trong 30 giây đầu sau 0h. Sau đó BV phát hiện là "cò" dùng script, no-show 60 %. **Khắc phục**: rate-limit theo CCCD, captcha, ký quỹ 200k khi đặt GS hàng đầu, hoàn lại nếu đến khám.

## Khái niệm cốt lõi

| Thuật ngữ | Ý nghĩa | Ví dụ |
| --- | --- | --- |
| **Resource** | tài nguyên có thể đặt | BS Trần A, phòng 305, máy MRI 1.5T |
| **Resource group** | nhóm resource có thể thay thế nhau | nhóm BS nội tim mạch (BN chọn nhóm, hệ gán BS theo lịch) |
| **Schedule** | lịch làm việc của resource | BS A: T2/T4/T6 7h–11h |
| **Slot** | khe giờ có thể đặt | 7h00–7h15, 7h15–7h30… |
| **Slot template** | mẫu sinh slot | OPD = 15 ph; MRI = 30 ph; tư vấn GS = 45 ph |
| **Appointment** | cuộc hẹn cụ thể BN × slot | BN X đặt slot 7h15 BS A |
| **Appointment Type** | loại hẹn | first-visit, follow-up, telehealth, IVF cycle |
| **Block** | thời gian không đặt được | hội chẩn, nghỉ phép, bảo trì máy |
| **Waiting list** | hàng đợi khi hết slot | tự tiến khi có người huỷ |

## Các kênh đặt khám

| Kênh | Đặc điểm | Verify |
| --- | --- | --- |
| Web BV | Form đầy đủ, thích hợp BN trẻ | OTP SĐT |
| App BV (iOS/Android) | Push notif, có ví thanh toán | OTP / VNeID |
| Zalo OA | Tỷ lệ mở 80 %; phổ biến nhất VN | OTP |
| VNeID mini-app | Verify CCCD mức 2 tự động | VNeID mức 2 |
| Call center | BN cao tuổi, BN mạn tính | tele-verify (hỏi DOB) |
| Quầy lễ tân | Walk-in nhưng đặt cho lần sau | nhân viên nhập |
| B2B (công ty khám đoàn) | API import danh sách đoàn | api token |
| HSSK quốc gia | BN đặt qua Sổ SK ĐT để chuyển tuyến | gateway HSSK |

## Luồng đặt lịch chuẩn

```
[BN chọn kênh] ──► [Chọn chuyên khoa / dịch vụ]
                         │
                         ▼
                  [Filter slot có sẵn]
                  - theo BS / nhóm
                  - theo giờ / ngày
                         │
                         ▼
                  [Reserve tạm 5 phút]
                         │
                  ┌──────┼──────┐
                  ▼      ▼      ▼
            [Trả phí?] [BHYT?] [Miễn phí]
                │       │       │
                ▼       ▼       ▼
            [VNPay/QR] [no charge] [no charge]
                │       │       │
                └───┬───┘───┬───┘
                    ▼       ▼
              [BOOKED]  [BOOKED+PAID]
                    │
                    ▼
              Notify SMS/Zalo + ICS attachment
                    │
              T-24h reminder → T-2h reminder
                    │
                    ▼
              [BN đến viện — quét QR ở kiosk]
                    │
                    ▼
              [CHECKED_IN] → sinh Encounter REG
                    │
                    ▼
              [QMS giữ thứ tự theo giờ hẹn]
```

## State machine Appointment

```
                       ┌─────────────┐
  [BN chọn slot]──►   │ PENDING_PAY │ (nếu yêu cầu trả phí)
                       └──┬──┬───────┘
                          │  ├─► PAYMENT_FAILED → BACK_TO_SEARCH
                          │  └─► EXPIRED (5 ph không trả) → SLOT_RELEASED
                          ▼
                       ┌─────────────┐
                       │ BOOKED      │
                       └──┬──┬───────┘
                          │  ├─► CANCELED_BY_PATIENT (refund nếu ≥ 24h)
                          │  ├─► CANCELED_BY_HOSPITAL (refund 100 % + bồi thường ưu tiên)
                          │  ├─► RESCHEDULED (giữ cuống deposit)
                          │  └─► NO_SHOW (sau t-end + 30 ph)
                          ▼
                       ┌─────────────┐
                       │ CONFIRMED   │ (T-24h reminder OK hoặc BN xác nhận)
                       └──┬──────────┘
                          ▼
                       ┌─────────────┐
                       │ CHECKED_IN  │ (quét QR kiosk / quầy)
                       └──┬──────────┘
                          ▼
                       ┌─────────────┐
                       │ CONVERTED   │ → tạo Encounter (REG)
                       └─────────────┘
```

## Quy tắc nghiệp vụ

1. **Không double-book** — trigger DB-level unique `(resource_id, slot_start)` để ngăn race condition (2 BN cùng đặt).
2. **Reserve tạm 5 phút**: khi BN chọn slot, slot được khoá (`HOLD`) trong 5 phút để BN hoàn tất thanh toán; hết hạn auto release.
3. **Overbook 5–10 %** chỉ cho khung giờ cao điểm + chuyên khoa có no-show > 10 %; **không overbook** chuyên khoa có thiết bị phức tạp (CT, MRI, nội soi).
4. **Lịch nghỉ phép / hội nghị** phải block slot trước → tránh đặt rồi huỷ hàng loạt. Nếu BS đột xuất ốm → BV gọi BN xin lỗi + sắp BS thay (không cho tự động remap).
5. **BHYT đặt lịch online**: chỉ cho đặt loại "đăng ký khám", thanh toán BHYT verify lại tại thời điểm REG (không cam kết trước).
6. **Huỷ trễ** (< 24h): không refund deposit; **3 lần no-show / 6 tháng** → chặn đặt online 3 tháng (chỉ cho quầy).
7. **Anti-bot**: rate-limit theo IP + theo CCCD, captcha sau 3 lần / phút, ký quỹ 50–200k cho slot GS hàng đầu (hoàn nếu tới khám).
8. **Telehealth slot**: phải kèm link Jitsi/Webex sinh động + 1 lần dùng; không được chia sẻ.
9. **Đặt tại tuyến tỉnh / TW**: không cho online nếu BHYT đối tượng; phải có giấy chuyển tuyến (xem bài 14) hoặc BN đồng ý tự trả.
10. **Reschedule**: giữ đúng appointment_id, chỉ đổi `slot_id` + ghi log; không tạo appointment mới (mất lịch sử).

## Data model Appointment

```
RESOURCE
├── resource_id (PK)
├── type (DOCTOR | ROOM | DEVICE | TEAM)
├── ref_id (FK → doctor / room / device)
├── specialty_codes[]
└── active

SCHEDULE_TEMPLATE
├── id, resource_id (FK)
├── weekday (MON…SUN), start_time, end_time
├── slot_minutes, capacity_per_slot (≥ 1 để cho overbook)
├── valid_from, valid_to
└── service_types[] (OPD | YC | DV | TELEHEALTH)

SLOT (sinh từ template mỗi tuần)
├── slot_id (PK), resource_id (FK)
├── start_at, end_at, capacity, booked
├── status (OPEN | HOLD | FULL | BLOCKED)
├── hold_expires_at (nếu HOLD)
└── unique(resource_id, start_at)

APPOINTMENT
├── appointment_id (PK)
├── patient_id (FK MPI)
├── slot_id (FK), resource_id (denorm)
├── type (FIRST | FOLLOWUP | TELEHEALTH | PROCEDURE)
├── service_type, payment_status
├── status (PENDING_PAY | BOOKED | CONFIRMED | CHECKED_IN | CONVERTED | CANCELED_* | NO_SHOW | RESCHEDULED)
├── channel (WEB | APP | ZALO | VNEID | CALL | COUNTER | B2B | HSSK)
├── deposit_amount, refund_amount
├── reason, note
├── reminder_sent_at[]
├── encounter_id (sinh khi CONVERTED)
└── created_at, updated_at, audit

WAITING_LIST
├── id, patient_id, resource_id, desired_window
└── priority, notified_at

APPOINTMENT_BLOCK (lịch nghỉ / bảo trì)
├── id, resource_id, start_at, end_at, reason
```

## Integration patterns

### 1) Thanh toán đặt cọc (VNPay / Momo / ZaloPay / QR Napas247)

- Pattern **Reserve → Pay → Confirm**: reserve slot 5 phút → tạo `payment_intent` → redirect đến cổng PSP → webhook IPN trả về → confirm BOOKED.
- Cần idempotent webhook (`payment_intent_id` unique).
- Reconcile cuối ngày với PSP report → nhặt pending thành công nhưng webhook mất.

### 2) Thông báo (SMS Brandname / Zalo OA / Email)

- SMS Brandname: chỉ gửi nội dung đã đăng ký đầu số với Bộ TT&TT (NĐ 91/2020 chống spam).
- Zalo OA: gửi qua API `consultation/info`, tỉ lệ mở 80–85 % > SMS (~30 %).
- Reminder schedule: T-24h, T-2h, T+5 (giục BN đã muộn).
- Tính đến **opt-out** (BN chọn không nhận) theo NĐ 13/2023.

### 3) ICS calendar attachment

Gắn file `.ics` vào email để BN add vào Google Calendar / Outlook → giảm no-show ~5 %.

### 4) FHIR R4 Appointment

Khi liên thông với hệ thống khác (HSSK, tập đoàn y tế):

```http
POST /fhir/Appointment
{
  "resourceType": "Appointment",
  "status": "booked",
  "serviceType": [{"coding": [{"code": "408443003", "display": "General medical practice"}]}],
  "start": "2026-05-15T07:15:00+07:00",
  "end":   "2026-05-15T07:30:00+07:00",
  "participant": [
    {"actor": {"reference": "Patient/123"}, "status": "accepted"},
    {"actor": {"reference": "Practitioner/45"}, "status": "accepted"},
    {"actor": {"reference": "Location/305"}, "status": "accepted"}
  ]
}
```

### 5) Anti-bot / fairness

- Captcha v3 (Cloudflare/Google) sau 3 lần / IP / phút.
- 1 CCCD ≤ 3 appointment ACTIVE cùng lúc.
- Sliding window rate limit: 10 booking / IP / 10 phút.
- Slot GS hàng đầu: mở theo đợt (vd. 6h00, 12h00) thay vì 0h00 để khó bị script.

## Edge case thường gặp

- BN đến sớm 1 giờ → cho check-in nhưng QMS vẫn giữ thứ tự theo giờ hẹn.
- BN đến muộn 30 phút → cảnh báo, cho check-in nhưng xếp vào cuối nhóm ưu tiên cùng khoảng giờ.
- BS ốm đột xuất → tool "Mass Reschedule": chọn BS thay / dời sang ngày khác, gửi notif hàng loạt + cho BN chống bối.
- BN đặt cho người thân (người đặt ≠ BN): phải nhập CCCD của BN; verify khi check-in.
- BN đặt đúng giờ bị mất điện / hệ thống down → có chế độ "emergency check-in" qua quầy không cần QR.
- Múi giờ: dùng UTC trong DB, hiển thị +07:00; tránh bug DST nếu BV quốc tế.
- BN có 2 appointment chồng giờ (vd. 2 chuyên khoa) → cảnh báo khi đặt → gợi ý dời.

## Sai lầm thường gặp

- Mở đặt lịch online mà không có deposit / anti-bot → bị "cò".
- Cho BN đặt vô thiên lủng đầu để → tỉ lệ no-show 30–40 %.
- Không tích hợp kiosk → BN đặt rồi vẫn phải xếp hàng ở quầy → mất ý nghĩa.
- Không synchronize lịch BS giữa OPD và phòng mổ → BS double-book.
- Refund không idempotent → hoàn tiền 2–3 lần.
- Gửi SMS reminder không theo brandname → bị tổng đài chặn; vi phạm NĐ 91/2020.
- Lưu tên BS trong appointment dạng plain text thay vì FK → đổi tên BS → sai báo cáo.

## Output / Chứng từ

| Chứng từ | Khi nào | Ghi chú |
| --- | --- | --- |
| Email/Zalo xác nhận | Sau BOOKED | kèm QR + .ics |
| SMS reminder T-24h, T-2h | Auto | Brandname BV |
| Phiếu thu deposit | Sau PAID | KHÔNG phải HĐĐT (xuất HĐ khi chốt phí) |
| Phiếu khám | Sau CONVERTED → tính sang REG | xem bài 3 |

## Checklist UAT

- [ ] Đặt slot → status PENDING_PAY → thanh toán VNPay → BOOKED.
- [ ] Hết 5 phút không trả → slot tự release.
- [ ] 2 BN đặt cùng slot → chỉ 1 thành công (DB constraint).
- [ ] Huỷ ≥ 24h → refund 100 %; < 24h → 0 %.
- [ ] BS block lịch nghỉ → BN không đặt được.
- [ ] BS ốm đột xuất → mass reschedule gửi notif đúng.
- [ ] BN đến → quét QR kiosk → CHECKED_IN → sinh Encounter REG.
- [ ] BN no-show quá 30 phút sau slot → auto NO_SHOW.
- [ ] FHIR Appointment endpoint trả đúng.
- [ ] BHYT mua trước không áp → verify lại thời điểm REG.
- [ ] 3 lần no-show / 6 tháng → chặn đặt online.
- [ ] Captcha kích hoạt khi 3 booking / IP / phút.

## KPI vận hành

| KPI | Mục tiêu | Cách đo |
| --- | --- | --- |
| Slot fill rate | 75–85 % | booked/total |
| No-show rate | < 8 % | NO_SHOW / BOOKED |
| Time-to-doctor (BN có hẹn) | ≤ 15 phút sau giờ hẹn | tt CHECKED_IN → IN_EXAM |
| Online booking ratio | ≥ 30 % | online/total |
| Reminder open rate Zalo | ≥ 70 % | tracking |
| Refund SLA | ≤ 3 ngày | timestamp PSP |
| Bot reject ratio | > 95 % | log captcha |

## Cơ sở pháp lý áp dụng (2026)

- Luật KCB **15/2023/QH15**.
- Luật Giao dịch điện tử **20/2023/QH15** — hiệu lực 01/07/2024.
- NĐ **13/2023/NĐ-CP** — PHI, opt-out marketing.
- NĐ **91/2020/NĐ-CP** — chống tin nhắn rác, brandname.
- Luật Bảo vệ người tiêu dùng **19/2023/QH15** — quyền huỷ dịch vụ, refund.
- TT **39/2024/TT-BYT** — giá DV (áp dụng cho deposit).

> **Bài tiếp theo:** Kiosk tự phục vụ & QMS — xếp hàng thông minh.
