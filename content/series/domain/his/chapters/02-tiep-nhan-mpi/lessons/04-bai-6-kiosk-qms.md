---
id: 019f5a01-d000-7001-his0-000000000204
title: "Bài 6: Kiosk tự phục vụ & QMS — xếp hàng thông minh"
slug: bai-6-kiosk-qms
description: >-
  Thiết kế Kiosk check-in, sinh số tự động, hàng đợi đa tiêu chí, gọi loa,
  màn hình LED — giảm tải cho quầy tiếp nhận và rút ngắn thời gian chờ.
duration_minutes: 50
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-6-kiosk-qms-banner.webp
video_url: null
sort_order: 4
section_title: "Phần 2: Tiếp nhận, MPI, Lịch hẹn"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![Kiosk tự phục vụ & Queue Management](/storage/uploads/2026/05/his/bai-6-kiosk-qms-banner.webp)

## Mục tiêu

![Check-in QR và bảng số thứ tự điện tử](/storage/uploads/2026/05/his/bai-6-kiosk-qms-workflow.webp)

Kiosk + QMS là "lớp trải nghiệm" lớn nhất của HIS — đây là những điểm tiếp xúc đầu tiên và cuối cùng với BN trong viện. Một kiosk tốt + QMS thông minh có thể giảm **50–70 % tải quầy lễ tân**, **giảm thời gian chờ** từ 90 phút xuống < 30 phút, và tăng điểm hài lòng BN (PSI) thêm 15–20 điểm.

Mục tiêu bài:

- Hiểu **luồng kiosk** (CCCD chip / QR appointment / sinh trắc / VNeID), bao gồm fallback khi BN không dùng được kiosk.
- Nắm thiết kế **multi-queue** với ưu tiên theo TT 14/2014 + JCI; **state machine** số gọi.
- Biết kiến trúc realtime (LED + TTS + display server).
- Thiết kế **degraded mode** (kiosk down → quầy; QMS down → gọi miệng) để không đứt nghiệp vụ.
- Nắm KPI + UAT cho vận hành.

## Bối cảnh: thực tế vận hành kiosk ở BV Việt Nam

- 60–70 % BN có smartphone, nhưng người > 60 tuổi (chiếm ~35 % lượt khám mạn tính) thường ngại kiosk → cần volunteer hướng dẫn.
- Một kiosk hỗ trợ ~150–250 BN/ngày; BV đổ về 100–1000 lượt/ngày thường đặt 4–10 kiosk.
- Màn hình cảm ứng phải chịu được mồ hôi, xương sống (nếu BN dùng bút) và cồn sát khuẩn.
- Có BV đặt kiosk ngoài trời hoặc cứu cánh sau giờ hành chính → cần IP65, anti-glare.
- BHYT: kiosk **không được thay con người verify thẻ** — gọi cổng BHXH realtime; nếu cổng chậm → fallback quầy.

> **Case study**: BV ĐK khu vực W đặt 6 kiosk ở cửa chính nhưng đặt cách nhau 30cm → BN đứng không đủ chỗ → chen lấn. Sau khi rời bố trí (làn riêng, mỗi kiosk + 1m), quét CCCD từ 45 giây → 25 giây. **Bài học**: design vật lý quan trọng ngang đồ hoạ UI.

## Các loại kiosk

| Loại | Vai trò | Cấu phần cứng |
| --- | --- | --- |
| Check-in kiosk | Quét CCCD/BHYT/QR → sinh số + in phiếu | Túi màn cảm ứng + đầu đọc NFC + máy in nhiệt |
| Payment kiosk | Tạm ứng / thanh toán cuối | + đầu đọc thẻ POS / QR scanner / cash recycler |
| Wayfinding kiosk | Tra phòng / bản đồ / lịch hẹn | Màn hình đứng hoặc ghép |
| Self-service report | In phiếu KQ XN, giấy nhập viện | + đầu đọc QR + máy in A4 |
| OPD nurse station | Cho điều dưỡng gọi BN tiếp theo | TFT + nút call next |
| Survey kiosk | Đo hài lòng (bài 43) | Màn hình nhỏ 7" |

## Luồng check-in qua kiosk

```
[BN đến viện]
     │
     ▼
[Kiosk - Welcome screen]
     │
     ├──► Tôi có lịch hẹn → quét QR → verify slot → sinh số (giữ thứ hạng theo giờ hẹn)
     ├──► Tôi chưa có lịch → quét CCCD chip → tra MPI → chọn chuyên khoa → sinh số
     ├──► Tôi đã KCB lần trước (tái khám) → nhập số phiếu cũ → tự động tiếp tục
     └──► Tôi cấp cứu → redirect ngay đến ER (không kiosk)
           │
           ▼
     [Nếu BHYT → gọi cổng BHXH verify]
           │
           ▼
     [In phiếu khám có QR + số TT + phòng + bản đồ]
           │
           ▼
     [Đồng bộ sang QMS → hiện lên LED phòng khám]
```

Lưu ý UX:

- Màn welcome chỉ 4 nút lớn (≥ 200x150 px), ngôn ngữ đơn giản.
- Có nút "Hướng dẫn bằng video" cho người công không quen.
- Tự timeout 30 giây → trở về home.
- Có chế độ "trợ giúp" → gọi volunteer tới.

## Kiến trúc QMS

```
[Kiosk] ────────┐
[Quầy lễ tân] ──┼──► [QMS Service (in-mem queue + persist Redis/SQL)]
[Appointment]───┘
                          │
                          ├──► [Display Server] ──► LED phòng khám / sảnh
                          ├──► [TTS Engine offline] ──► Loa khu vực
                          ├──► [Doctor Console] → nút "Gọi tiếp / Skip / Recall"
                          └──► [BN App] → push notif "đến lượt" + ETA
```

- QMS dùng pattern **Pub/Sub** (Redis Streams / Kafka topic-per-room) để LED + loa + app nắm realtime.
- Mỗi phòng khám = 1 partition; horizontal scale dễ.
- Có fallback **polling 2s** nếu WebSocket mất.

## Mô hình hàng đợi (multi-queue + priority)

| Hàng | Mô tả | Ưu tiên (lớn = cao hơn) | Nguồn |
| --- | --- | --- | --- |
| ER → OPD | Từ cấp cứu chuyển sang khoa | 100 | bài 10 |
| VIP / Bảo trợ ngành y tế | lãnh đạo, người có công đặc biệt | 90 | quy chế BV |
| Người có công (TT 14/2014) | thương binh, bệnh binh | 80 | TT 14/2014/TT-BYT |
| > 80 tuổi / < 6 tuổi / phụ nữ có thai | nhóm ưu tiên | 70 | TT 14/2014 |
| Có lịch hẹn | xếp theo giờ hẹn | 60 (within ±15 phút slot) | bài 5 |
| Walk-in BHYT | thông tuyến / đúng tuyến | 50 | bài 3 |
| Walk-in dịch vụ | tự nguyện | 40 | |
| Tái khám trong ngày (sau XN) | quay lại phòng khám | 65 | flag `recheck=true` |

Thuật toán "Gọi tiếp" đơn giản (Python pseudo):

```python
def call_next(room):
    candidates = qms.list(status=ISSUED, room=room)
    candidates.sort(key=lambda c: (
        -c.priority,            # ưu tiên cao trước
        c.appointment_time or c.issued_at  # FIFO trong cùng ưu tiên
    ))
    return candidates[0] if candidates else None
```

**Bảo vệ fairness**: không cho ưu tiên cao kéo dài quá 3 ca liên tiếp → đan xen với thường (anti-starvation).

## State machine số gọi

```
[ISSUED] ──► [CALLED] ──► [IN_EXAM] ──► [COMPLETED]
   │           │ (gọi 3 lần / 2 phút)
   │           └──► [MISSED] ──► [REOPEN within 60 phút] ──► [ISSUED again]
   │                       └──► [ARCHIVED]
   ├──► [DEFERRED] (BN xin hoãn 1 lượt → tụt 5 ca)
   └──► [CANCELED] (BN bỏ về)
```

Quy tắc:

- `CALLED → MISSED` sau 3 lần gọi (TTS + LED) mỗi 40s, tổng 2 phút.
- `REOPEN` chỉ trong 60 phút, **ghép vào sau số đang gọi**, không cho cắt hàng.
- `DEFERRED` chỉ cho 1 lần / lượt (tránh BN xin hoãn liên tục).
- `IN_EXAM → COMPLETED`: tự động khi BS lưu kết thúc khám (bài 7).

## Hiển thị màn hình LED

Mỗi phòng khám / dãy phòng có 1 LED:

- **Số đang gọi** (font ≥ 200pt, contrast cao).
- **3–5 số tiếp theo** + tên gọn (mask: "NG. V. A***") theo NĐ 13/2023.
- **Tên BS, ETA chờ** (tính = avg_time_per_case × ahead_count).
- **Thông báo chạy chữ** (hết thuốc, đổi phòng, lịch nghỉ, cảnh báo trộm cắp).
- **Realtime**: WebSocket; nếu mất kết nối → hiện dải đỏ "OFFLINE — liên hệ NV".

## Loa gọi TTS

- **TTS engine offline** (FPT.AI, VBee, Viettel AI): tránh phụ thuộc internet; ngưỡng độ trễ < 500ms.
- Nội dung gọi (template): "Mời bệnh nhân số 25, ông Nguyễn Văn A***, vào phòng 102."
- **Không đọc** ngày sinh / chẩn đoán / mã BHYT — vi phạm PHI (NĐ 13/2023).
- Tỷ lệ gọi: cách nhau tối thiểu 8–10 giây để không bị ồn.
- Phân vùng loa: chỉ loa khu vực có phòng khám đó nghe được (DSP zone).

## Data model QMS

```
QUEUE_TICKET
├── ticket_id (PK)
├── encounter_id (FK)
├── room_id, queue_code (vd. "NOI-A")
├── number (số hiển thị, theo ngày + phòng)
├── priority (int 0–100)
├── appointment_time (nếu có hẹn)
├── status (ISSUED | CALLED | IN_EXAM | COMPLETED | MISSED | DEFERRED | CANCELED | ARCHIVED)
├── issued_at, called_at, in_exam_at, completed_at
├── call_count, last_call_at
└── source (KIOSK | COUNTER | APP | APPOINTMENT | ER_TRANSFER)

ROOM_STATE
├── room_id, current_ticket_id, doctor_id
├── status (OPEN | LUNCH | CLOSED | EMERGENCY_PAUSE)
└── avg_time_per_case (rolling 7 days)

KIOSK_DEVICE
├── kiosk_id, location, status (ONLINE | OFFLINE | MAINTENANCE)
├── last_heartbeat_at, version, ip
└── features[] (NFC | QR | POS | BIOMETRIC)
```

## Integration patterns

### 1) NFC CCCD reader → kiosk

- Tích hợp qua **PC/SC** hoặc HID API; đọc thẻ chip CCCD theo chuẩn ICAO 9303 + đặc tả BCA (TT 06/2021).
- Chỉ đọc data nhóm 1, 2 (demographics + photo); không đọc vân tay trừ khi BN đặt ngón + cho phép (consent lồng vào màn hình).
- Sign verify chữ ký CA của BCA để chống giả.

### 2) VNeID mini-app

- BN được push QR động trong app VNeID; kiosk quét → verify token với backend VNeID mức 2.
- Lợi ích: không cần cầm thẻ vật lý.

### 3) HL7 v2 / FHIR notification

- Khi `CALLED` → bắn message `MFN^M01` vào bảng "display" cho LED (một số đơn vị tự viết API).
- Pattern hiện đại: dùng FHIR Subscription / WebSocket.

### 4) Push notification cho app BN

Khi còn 3 số nữa đến lượt → push: "Còn ~10 phút sẽ đến số của bạn. Hãy về phòng 102." → BN có thể đi toilet, căng-tin mà không bị missed.

## Edge case

- **Kiosk down** → fallback quầy; QMS vẫn chạy; nhân viên quầy dùng PC nhập tay sinh số.
- **QMS service down** (khá nguy hiểm) → chế độ "manual paper": in số bằng máy in nhiệt local + gọi miệng; sau khi up lại → nhập truy hồi.
- **BN quét nhầm số phụ huynh** → detect = encounter gắn sai patient → cho huỷ trong 5 phút.
- **2 BN quét cùng QR** (chia sẻ): QR appointment chỉ valid 1 lần; lần 2 bị từ chối.
- **Lệch đồng hồ kiosk** vs server → sai timestamp → sai thứ tự gọi; bắt buộc NTP mỗi 5 phút.
- **Cổng BHYT timeout** → kiosk hiển thị "vui lòng đến quầy" thay vì im lặng.
- **Côn trùng / bụi**: kiosk dưới hầm bệnh viện có thể bị ẩm → cần tủ IP54 + lọc quạt.

## Sai lầm thường gặp

- Màn welcome quá nhiều nút → BN già bấm sai.
- Không có volunteer trong tuần đầu → BN gặp lỗi → lần sau từ chối dùng kiosk.
- TTS đọc đầy đủ tên + ngày sinh → vi phạm PHI.
- LED đặt ở vị trí BN ngồi không nhìn thấy → mất ý nghĩa.
- QMS không có anti-starvation → BN thường bị xếp sau ưu tiên liên tục → chờ 4 tiếng.
- Không log call_count → kiện cáo "BV không gọi tôi".
- Kiosk có thanh toán nhưng không có camera giám sát → rủi ro trộm thẻ.
- Không tích hợp sang QMS phòng XN/CĐHA → BN xong khám phòng bác sĩ nhưng vẫn phải xếp tay lấy phiếu ở labo.

## Output / Chứng từ

| Chứng từ | Khi nào | Ghi chú |
| --- | --- | --- |
| Phiếu khám + số TT (in từ kiosk) | sau check-in | có QR encounter, bản đồ phòng |
| Phiếu thu tạm (nếu thanh toán kiosk) | sau PAID | chỉ tạm, không là HĐĐT |
| Audit log call/skip/recall | tự động | lưu trong QMS |
| Báo cáo chờ / call cuối ngày | EOD job | phục vụ KPI |

## Checklist UAT

- [ ] Quét CCCD chip qua NFC → ra đúng demographic.
- [ ] Quét QR appointment → verify slot đúng khung giờ.
- [ ] Quét QR appointment quá hạn / 2 lần → bị từ chối.
- [ ] BHYT verify realtime; nếu cổng down → hiển thị "đến quầy".
- [ ] In phiếu khám có QR + số TT đúng.
- [ ] Gọi 3 lần không lên → MISSED.
- [ ] BN xin REOPEN trong 60 phút → gắn vào sau số đang gọi.
- [ ] BN xin DEFERRED → tụt 5 số.
- [ ] Anti-starvation: ưu tiên cao 3 ca liên tục → tự động cho thường 1 ca.
- [ ] LED + TTS realtime sync (≤ 1s).
- [ ] Kiosk down → quay về trang welcome trong 5 giây; có alert sang quầy.
- [ ] QMS down → paper fallback có in số.
- [ ] LED hiển thị tên masked theo PHI.
- [ ] Push notif cho app BN khi còn 3 số nữa.

## KPI vận hành

| KPI | Công thức | Mục tiêu |
| --- | --- | --- |
| Avg wait time (BN walk-in) | Σ(call - issue) / N | < 30 phút |
| Avg wait time (BN có hẹn) | < 15 phút sau giờ hẹn | |
| Throughput | ca / giờ / phòng | ≥ 6 |
| MISSED rate | MISSED / ISSUED | < 3 % |
| Self-service ratio | kiosk / total check-in | > 60 % |
| Kiosk uptime | (24h - downtime) / 24h | > 99.5 % |
| % tiếp nhận bằng CCCD chip NFC | > 70 % | Đề án 06 mục tiêu |
| LED/TTS sync latency | p99 < 1.5 s | monitoring |

## Cơ sở pháp lý áp dụng (2026)

- Luật KCB **15/2023/QH15** — quyền tiếp cận hồ sơ.
- TT **14/2014/TT-BYT** — ưu tiên KCB.
- NĐ **13/2023/NĐ-CP** — PHI / display masking.
- QĐ **06/QĐ-TTg 2022** — Đề án 06 (CCCD chip).
- TT **06/2021/TT-BCA** — cấu trúc CCCD.
- TT **39/2024/TT-BYT** — bảng giá DV (cho payment kiosk).

> **Bài tiếp theo:** Khám ngoại trú (OPD) — luồng nghiệp vụ tại phòng khám.
