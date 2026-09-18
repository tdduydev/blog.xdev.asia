---
id: 019f5a01-d000-7001-his0-000000000202
title: "Bài 4: Master Patient Index (MPI) — chống trùng & liên thông hồ sơ"
slug: bai-4-master-patient-index
description: >-
  MPI là gì, vì sao là "xương sống dữ liệu" của HIS. Thuật toán matching,
  quy trình merge / unmerge, MPI Sync giữa các bệnh viện và liên thông với
  ID Y tế quốc gia.
duration_minutes: 60
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-4-master-patient-index-banner.webp
video_url: null
sort_order: 2
section_title: "Phần 2: Tiếp nhận, MPI, Lịch hẹn"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![Master Patient Index — bài toán định danh duy nhất](/storage/uploads/2026/05/his/bai-4-master-patient-index-banner.webp)

## Tại sao MPI quan trọng?

![Hợp nhất hồ sơ trùng lặp về một golden record](/storage/uploads/2026/05/his/bai-4-master-patient-index-workflow.webp)

**Master Patient Index (MPI)** là chỉ mục duy nhất của một con người trong toàn hệ thống y tế. Một bệnh nhân — dù khám 50 lần, ở 5 cơ sở — chỉ nên có **1 MPI**. Nếu MPI bị tách:

- Bác sĩ không thấy lịch sử dị ứng → kê thuốc nguy hiểm → phản vệ thuốc.
- BHYT phát hiện trùng KCB → xuất toán.
- Báo cáo dịch tễ sai số liệu thực.
- Khi BN chống đối hay kiện tụng → BV không trình được bộ hồ sơ đầy đủ.

> **Case study điển hình**: BV ĐK tỉnh Y sau 5 năm vận hành HIS đếm được 1.420.000 MPI cho địa bàn chỉ cóee 980.000 dân — dư ~45 % hồ sơ ảo do trùng lặp. Khi đối soát với danh sách BHXH → phát hiện nhiều BN mạn tính có 5–12 hồ sơ khác nhau, mỗi hồ sơ có một đơn thuốc khác → nguy cơ chồng thuốc. Mất 8 tháng cleansing với 4 nhân sự mới gom về được.

Mục tiêu bài này:

- Nắm **mô hình dữ liệu MPI** và vị trí của nó trong kiến trúc HIS.
- Hiểu **2 chiến lược matching** (deterministic + probabilistic Fellegi–Sunter) và cách chuẩn hoá dữ liệu Việt Nam (bỏ dấu, normalize địa chỉ, tên họ theo mã tỉnh/huyện/xã TCVN).
- Thiết kế **quy trình Match → Steward Review → Merge → Unmerge** chặt.
- Biết cách **MPI Sync** trong tập đoàn y tế và liên thông với **HSSK quốc gia / VNeID** theo Đề án 06.

## Vị trí của MPI trong kiến trúc

```
   REG/Kiosk/App ──► MPI service ──► Encounter ──► EMR / LIS / RIS / Pharmacy
                          ▲
                          │ sync (HL7 A40 / FHIR Patient.$match)
                          │
                  Enterprise MPI Hub ──► HSSK quốc gia / VNeID
```

MPI service thường được tách thành **microservice riêng** vì:

- Tải tra cứu rất cao (mọi REG, mọi check-in app).
- Cần tunable theo ngưỡng matching.
- Phải đồng bộ ra ngoài (HSSK).

## Khoá định danh

| Khoá | Độ mạnh | Ghi chú |
| --- | --- | --- |
| **CCCD 12 số** | Mạnh | Nguồn chính sau Đề án 06; verify bằng chip NFC / VNeID |
| **VNeID identity_id** | Mạnh | Token xác thực mức 2 |
| **BHYT** | Trung bình | Có thể đổi thẻ, đổi mã; 1 MPI gắn nhiều thẻ theo thời gian |
| **Hộ chiếu** | Mạnh (người nước ngoài) | gắn `nationality_iso3` |
| **Giấy khai sinh số** | Mạnh (trẻ < 14) | Từ CSDL hộ tịch điện tử |
| **Họ tên + DOB + giới + SĐT** | Yếu | Khoá phụ / fuzzy |
| **Sinh trắc** (vân tay, khuôn mặt) | Mạnh | Cần sự đồng ý — NĐ 13/2023 "dữ liệu sinh trắc là nhạy cảm" |
| **Địa chỉ** (commune_code) | Yếu | Tie-break trong fuzzy |

## Chuẩn hoá dữ liệu (bắt buộc trước khi match)

Dữ liệu Việt Nam có nhiều đặc thù — phải normalize trước khi bỏ vào thuật toán:

1. **Tên**: ASCII fold (bỏ dấu), upper, trước/sau họ-đệm-tên tách rõ; đồng bộ "Thị / Văn / Thọc".
2. **Phonetic**: dùng **Soundex VN** hoặc **Double Metaphone tùy biến cho tiếng Việt** (vd. "Dương" ≡ "Zương" ≡ "Yhương" theo vùng miền).
3. **DOB**: convert mọi format về ISO `YYYY-MM-DD`; flag `dob_estimated = true` cho BN cao tuổi chỉ nhớ năm.
4. **Địa chỉ**: parse về (`commune_code`, `district_code`, `province_code`) theo mã TCVN; giữ raw_text để review.
5. **SĐT**: convert về E.164 (`+84…`); bỏ prefix `0`.
6. **CCCD**: validate 12 số, mã tỉnh đầu hợp lệ, year-of-birth + giới tính mã hoá trong 4 số đầu (mô tả ở TT 06/2021 BCA).

## Thuật toán matching (chi tiết)

### 1) Deterministic

Bằng nhau tuyệt đối ở khoá mạnh → AUTO MATCH:

- `cccd` bằng nhau → cùng MPI.
- `vneid_id` bằng nhau → cùng MPI.
- `passport_no + nationality` bằng nhau → cùng MPI (nước ngoài).

### 2) Probabilistic (Fellegi–Sunter)

```
score = Σ wᵢ × match(fieldᵢ)
```

Trọng số gợi ý (đã calibrate cho tiếng Việt):

| Trường | match (w+) | mismatch (w−) | Ghi chú |
| --- | --- | --- | --- |
| CCCD | +10 | −10 | exact |
| BHYT | +6 | −2 | exact, không penalty mạnh vì thẻ đổi được |
| Tên (sau Soundex) | +3 | −2 | Levenshtein ≤ 2 = match |
| DOB exact | +4 | −4 | |
| DOB chỉ năm | +1 | 0 | |
| Giới | +1 | −1 | |
| SĐT | +2 | −1 | |
| Địa chỉ cấp xã | +2 | 0 | |

Ngưỡng (calibrate theo dữ liệu thật):

- `score ≥ 8` → **AUTO MATCH** (ghép ngay)
- `4 ≤ score < 8` → **STEWARD QUEUE** (con người review)
- `score < 4` → **NEW MPI**

Tuning ngưỡng — đánh đổi:

- Ngưỡng cao → ít false-merge (an toàn lâm sàng) nhưng nhiều trùng sót lại.
- Ngưỡng thấp → ít trùng nhưng rủi ro merge sai 2 BN khác → rất nguy hiểm (BN A bị thay máu theo BN B).

> **Quy tắc vàng**: trong y tế, **false-merge nguy hiểm hơn false-split**. Mặc định chọn ngưỡng cao + steward review dày.

### 3) Sinh trắc (bổ sung)

Khi BN check-in qua kiosk có camera / vân tay → dùng face/finger embedding so với MPI ứng viên. Threshold cosine similarity > 0.92 (face) hoặc match score > 60 (vân tay).

## Quy trình Match → Merge → Unmerge

```
[REG tạo BN mới]
      │
      ▼
[Matcher] ──┬──► AUTO MATCH ─────────────────────────────────────────────────────┐
          ├──► STEWARD QUEUE ─► [Steward review]                                                          │
          │                              │                                                                  │
          │                              ├─► CONFIRM MATCH ────────────────────────────────────────►       │
          │                              ├─► REJECT → NEW MPI                                              │
          │                              └─► NEED MORE INFO → chờ bổ sung                                  │
          └──► NEW MPI                                                                                       │
                                                                                                              ▼
                                                                                                          [MERGE]
                                                                                                              │
                                                                                                              ▼
                                                                                  [survivor MPI ← merged MPI]
                                                                                  Remap encounter / lab / billing / RX
                                                                                  Audit log: who, when, why, evidence
                                                                                              │
                                                                                              ▼
                                                                                  [UNMERGE — chỉ trong 30 ngày,
                                                                                   phê duyệt Trưởng KHTH]
```

Luy tắc khi merge:

- **Survivor** = MPI có dữ liệu đầy đủ hơn / mới hơn; nếu cả hai đều đầy đủ, chọn MPI có nhiều encounter hơn.
- **Không bao giờ xoá** MPI cũ — đánh dấu `STATUS = MERGED`, `merged_into_id = survivor_id`. Truy vấn MPI cũ vẫn redirect tới survivor (HTTP 301 tư tưởng).
- Mọi thao tác merge **audit log** kèm lý do và người duyệt (giá trị pháp lý).
- **Conflict resolution** khi 2 MPI có trường khác nhau:
  - Trường demographic → chọn theo nguồn mạnh nhất (CCCD chip > BHYT > khảo sát quầy).
  - Dị ứng / lịch sử bệnh → **giữ cả hai** (union), không bỏ bớt.
- Hỗ trợ **Unmerge** trong 30 ngày (vd. phát hiện merge sai); sau đó cần phê duyệt cấp cao + báo cáo KHTH.

### State machine MPI

```
NEW ─► ACTIVE ───────────────────────────────────────────────────────────────────┐
            ├─► MERGED (→ survivor) ─► có thể UNMERGE trong 30 ngày → về ACTIVE │
            ├─► INACTIVE (BN chết — từ HSSK / khai tử; vẫn read-only)              │
            └─► LOCKED (nghi giả mạo, chờ điều tra)                                  │
```

## Data model MPI (chi tiết)

```
PATIENT_MASTER
├── mpi_id (PK, ULID)
├── enterprise_id (PK nếu nhiều BV)
├── status (NEW | ACTIVE | MERGED | INACTIVE | LOCKED)
├── merged_into_id (FK self-ref)
├── cccd, vneid_id, passport_no, nationality
├── full_name, normalized_name, soundex_name
├── dob, dob_estimated
├── gender, blood_type
├── phone_e164, phone_verified
├── address (commune_code, district_code, province_code, raw_text)
├── ethnicity, religion, occupation
├── photo_id (FK files)
├── face_embedding, fingerprint_template (encrypted, consent flag)
├── created_at, updated_at, last_seen_at
└── created_by, updated_by

PATIENT_INSURANCE_HISTORY
├── id, mpi_id (FK), card_no, valid_from, valid_to, ma_dkbd, muc_huong
└── source (BHXH | BV | manual)

PATIENT_ALIAS
├── id, mpi_id (FK), alias_type (NAME | CCCD_OLD | CMND_9 | PASSPORT_OLD)
└── alias_value, valid_from, valid_to

MPI_MERGE_LOG
├── id, survivor_id, merged_id, merge_score, merge_type (AUTO | STEWARD)
├── reason, evidence_doc_id
├── reviewer_id, approved_at
└── reverted_at, reverted_by

MPI_MATCH_QUEUE (Steward worklist)
├── id, candidate_a_id, candidate_b_id, score, breakdown (JSON)
├── status (PENDING | CONFIRMED | REJECTED | NEED_INFO)
└── assigned_to, due_at
```

## MPI Sync giữa các cơ sở

```
[BV A] ────────┐
[BV B] ────────┼──► [Enterprise MPI Hub]
[BV C] ────────┘          │
                            ├──► HSSK quốc gia (FHIR Patient)
                            ├──► VNeID (verify)
                            └──► Cổng BHYT (verify thẻ)
```

- Truyền thông qua **HL7 v2 ADT^A04** (register), **A40** (merge), **A45** (move account); hoặc **FHIR R4 Patient + $match**.
- Mỗi BV giữ `local_mpi_id`; map về `enterprise_mpi_id` chung trong Hub.
- Hub thay đổi → publish event (Kafka / RabbitMQ) → các BV consume để update local.

### Mẫu HL7 A40 (merge)

```
MSH|^~\&|MPIHUB|ENT|HIS|BVA|20260512090000||ADT^A40|MSG00500|P|2.5
EVN|A40|20260512090000
PID|||LOCAL_001~SURVIVOR^^^MPI||NGUYEN^VAN^AN||19850515|M
MRG|LOCAL_002~MERGED^^^MPI
```

### Mẫu FHIR `Patient.$match`

```http
POST /fhir/Patient/$match
Content-Type: application/fhir+json

{
  "resourceType": "Parameters",
  "parameter": [
    {"name": "resource", "resource": {"resourceType": "Patient",
      "identifier": [{"system": "urn:oid:2.16.840.1.113883.4.7", "value": "012345678901"}],
      "name": [{"family": "NGUYEN", "given": ["VAN", "AN"]}],
      "birthDate": "1985-05-15", "gender": "male"}},
    {"name": "count", "valueInteger": 5},
    {"name": "onlyCertainMatches", "valueBoolean": false}
  ]
}
```

Response: Bundle of `Patient` với `search.score` (0–1) — client (HIS) quyết định chuỗi xử lý.

## Tích hợp HSSK quốc gia & Đề án 06

Theo lộ trình **QĐ 5454/QĐ-BYT** (Sổ Sức khỏe điện tử) và **Đề án 06**:

- **ID y tế** = CCCD (mặc định) → giúp MPI ngành gắn được với danh pháp quốc gia.
- HIS gọi API HSSK để:
  - Lấy / tạo ID y tế khi BN chưa có.
  - Đẩy tóm tắt KCB (CCD/CCDA / FHIR Bundle) khi xuất viện (xem bài 14, 46).
  - Lấy lịch sử KCB tại cơ sở khác → hiển thị cho BS.
- Bảo mật: mọi truy vấn HSSK phải có **consent BN** (NĐ 13/2023 — PHI nhạy cảm). Có 2 mức:
  - Consent break-glass (cấp cứu) → tự động cho phép, log audit + notify BN sau.
  - Consent thường → BN xác nhận qua VNeID OTP / app.

## Edge case phức tạp

- **Trẻ sơ sinh chưa có tên / không có CCCD**: tạm dùng tên "BABY of NGUYEN THI HOA" + DOB; sau khi có giấy khai sinh, **rename + lên khóa CCCD** — không tạo mới.
- **BN mất ý thức, vô danh** (cardio arrest mà không có người nhà): MPI tạm "Unknown_2026_05_12_001" → sau khi nhận dạng → merge vào MPI chính.
- **2 BN trùng họ tên + DOB nhưng khác CCCD**: không được merge — mỗi người 1 MPI; UI phải hiển thị rõ "cảnh báo trùng tên" để nhân viên tiếp nhận không nhầm lộn.
- **Đổi CCCD từ 9 số (CMND) sang 12 số**: lưu CMND cũ đi vào `PATIENT_ALIAS` → vẫn tìm được.
- **Người chuyển giới (sau khi có quyết định pháp lý)**: giới tính thay đổi → vẫn 1 MPI; flag `gender_history`.
- **Trùng do quét CCCD kết quả sai** (chip hỏng → đọc nhầm số): thêm guard "CCCD chưa từng thấy, đồng thời tên khác hàng trăm record → cảnh báo".
- **BN quốc tệ du lịch đến Việt Nam**: không có CCCD; map theo passport. Cần lưu country code, phòng trường hợp giấy CMND bị mất sau đó vào KCB.

## Sai lầm thường gặp

- **Cho UI "Tạo nhanh"** không tra MPI → sinh trùng hàng loạt.
- **Trọng số Fellegi–Sunter copy nguyên từ tài liệu nước ngoài** — không tune cho tên Việt → Soundex sai → false-merge.
- **Auto-merge ở score 6** → rủi ro merge sai 2 BN → thay máu nhầm. Ngưỡng auto phải ≥ 8.
- **Xoá vật lý MPI trùng** → không undo được, mất lịch sử.
- **Không có Steward** → worklist dồn hàng nghìn item, không ai xử lý → tích luỹ nợ.
- **Không đồng bộ từ HSSK** sau khi có Đề án 06 → BN đã có ID y tế nhưng BV tạo ID mới → mất liên thông.
- **Truy vấn MPI không phân trang** → tìm "Nguyễn Văn" trả về 200k record → slập database.

## Checklist UAT

- [ ] Tìm BN qua CCCD chip NFC → đúng MPI sẵn có.
- [ ] Tìm fuzzy: "NGUYỄN VĂN AN" vs "NGUYEN VAN AN" → ra cùng MPI.
- [ ] Tạo BN mới đúng khi score < 4.
- [ ] Vào STEWARD QUEUE đúng khi 4 ≤ score < 8.
- [ ] Steward MERGE 2 MPI → tất cả encounter/RX/lab remap sang survivor.
- [ ] Truy vấn MPI đã merge → redirect tới survivor.
- [ ] UNMERGE trong 30 ngày → hoàn nguyên.
- [ ] UNMERGE sau 30 ngày → cần phê duyệt Trưởng KHTH.
- [ ] Sync HL7 A40 sang LIS/RIS → các hệ nhận merge đúng.
- [ ] FHIR `Patient.$match` trả score giảm dần.
- [ ] Gọi HSSK → có consent thì thành công, không consent thì bị từ chối.
- [ ] Thay đổi CCCD từ CMND 9 số → alias lưu, tìm vẫn ra.

## KPI vận hành

| KPI | Mục tiêu | Cách đo |
| --- | --- | --- |
| Tỷ lệ MPI trùng (estimated duplicate rate) | < 1 % | Job dò trùng hàng tuần |
| Steward queue size | < 200 item | Worklist size |
| Thời gian Steward xử lý 1 case | < 5 phút | Timestamp |
| % MPI có CCCD verified | > 90 % | Field check |
| % MPI sync với HSSK | > 80 % (sau lộ trình) | Compare |
| False merge phát hiện / 1000 merge | < 1 | Audit unmerge |

## Cơ sở pháp lý áp dụng (2026)

- Luật KCB **15/2023/QH15** — quyền tiếp cận hồ sơ.
- NĐ **13/2023/NĐ-CP** — PHI, sinh trắc là nhóm nhạy cảm.
- QĐ **06/QĐ-TTg 2022** — Đề án 06.
- QĐ **5454/QĐ-BYT** — Sổ Sức khỏe điện tử.
- TT **06/2021/TT-BCA** — cấu trúc CCCD 12 số.

> **Bài tiếp theo:** Lịch hẹn (Appointment) và đặt khám đa kênh.
