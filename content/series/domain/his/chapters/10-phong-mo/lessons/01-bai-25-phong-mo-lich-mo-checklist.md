---
id: 019f5a01-d000-7001-his0-000000001001
title: "Bài 25: Phòng mổ — lịch mổ, đội ngũ & checklist WHO"
slug: bai-25-phong-mo-lich-mo-checklist
description: >-
  Quy trình phòng mổ (OR): đặt lịch mổ phiên / mổ cấp cứu, thành phần kíp,
  Surgical Safety Checklist của WHO (Sign-in / Time-out / Sign-out).
duration_minutes: 55
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-25-phong-mo-lich-mo-checklist-banner.png
video_url: null
sort_order: 1
section_title: "Phần 10: Phòng mổ (Surgery)"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![Phòng mổ — lịch mổ & WHO checklist](/storage/uploads/2026/05/his/bai-25-phong-mo-lich-mo-checklist-banner.png)

## Phân loại ca mổ

![Time-out trước rạch da theo WHO Surgical Safety Checklist](/storage/uploads/2026/05/his/bai-25-phong-mo-lich-mo-checklist-workflow.webp)


## Mục tiêu bài học

- Mô hình hoá phòng mổ trong HIS: lịch máy — đội ngũ — vật tư — checklist an toàn.
- Triển khai **WHO Surgical Safety Checklist** (Sign-In, Time-Out, Sign-Out) bắt buộc theo Quyết định 7482/QĐ-BYT/2018 và sửa đổi 2024.
- Quản lý **block schedule** (giờ chia theo BS/khoa) để tối ưu sử dụng phòng — KPI chính của BV chuyên khoa.
- Ghi nhận **tường trình phẫu thuật** (operative note) đúng cấu trúc cho EMR và BHYT.
- Theo dõi chỉ số an toàn: SSI (surgical site infection), wrong-site surgery, retained foreign body.

## Bối cảnh: phòng mổ là "khúc cua nguy hiểm" của BV

- Một ca mổ trung bình huy động 6-12 nhân lực (BS chính, phụ, gây mê, dụng cụ, vòng ngoài, KTV); trễ 10 phút đầu giờ → ảnh hưởng dây chuyền 3-4 ca sau.
- Sự cố mổ nhầm bên/nhầm vị trí ở VN: WHO ước tính 1/50.000-100.000 ca; nguyên nhân chính là thiếu Time-Out chuẩn hoá.
- BV tuyến tỉnh trung bình **lãng phí 25-35% giờ mổ** do lịch trống, hoãn ca, chuẩn bị BN chậm.
- Tường trình phẫu thuật viết tay sau ca → 22% thiếu trường bắt buộc khi BHXH thanh tra (mã thủ thuật, thời gian rạch da, ASA, đếm gạc).

## Phân loại ca mổ

| Loại | Đặc thù | Ưu tiên lịch | Thời gian dự kiến |
| --- | --- | --- | --- |
| Mổ phiên | có lịch trước ≥ 24h | block schedule | theo CPT |
| Mổ cấp cứu | trong 24h | chen vào block trống/OR cấp cứu | linh động |
| Mổ tối khẩn | < 30 phút | ưu tiên tuyệt đối | < 1h chuẩn bị |
| Mổ trong ngày | day-surgery, xuất viện trong ngày | OR riêng, gây mê ngắn | 30-90 phút |
| Mổ phối hợp đa chuyên khoa | nhiều ekip | cần điều phối block | dài, đặt full ngày |

## Lịch mổ (OR Schedule)

Mô hình **block schedule** phổ biến:

```
   Phòng OR-1  | Phòng OR-2  | Phòng OR-3  | Phòng OR-CC
T2 sáng:  CTCH  | Sản         | Mắt         | (giữ trống)
T2 chiều: CTCH  | Sản         | TMH         | (giữ trống)
T3 sáng:  Tim mạch | Tiêu hoá | Tiết niệu | (giữ trống)
...
```

- Block release: nếu chủ block không đăng ký ca trước 48h → tự release cho khoa khác.
- Utilization mục tiêu: ≥ 75% giờ làm việc.
- First-case on-time start: ≥ 85% (rạch da trong vòng 15 phút sau giờ start dự kiến).

## Vòng đời một ca mổ (state machine)

```
SCHEDULED ── BS đăng ký, đủ điều kiện
   │ Đến ngày, BN xác nhận, gây mê khám
   ▼
PRE-OP ──── BN tới khu chờ tiền mê
   │ Sign-In (gây mê)
   ▼
IN-OR ────── BN vào phòng mổ
   │ Time-Out (cả ekip)
   ▼
INCISION ── rạch da
   │ Sign-Out (đếm gạc, đếm dụng cụ, mẫu GPB)
   ▼
CLOSE ────── đóng vết
   │
   ▼
POST-OP ─── BN sang hồi tỉnh (PACU)
   │
   ▼
DISCHARGED-OR → về khoa hoặc về nhà (day-surgery)
```

Mỗi mốc ghi `event_time`, `actor_id` — phục vụ tính turnover time, room utilization, anesthesia time.

## WHO Surgical Safety Checklist 3 bước

| Bước | Trước khi | Người chủ trì | Trường bắt buộc trong HIS |
| --- | --- | --- | --- |
| Sign-In | gây mê | BS gây mê | xác nhận BN, vị trí, thủ thuật, kiểm tra dị ứng, đường thở, máu chuẩn bị |
| Time-Out | rạch da | BS chính + cả ekip | tự giới thiệu thành viên, xác nhận BN-vị trí-thủ thuật, kháng sinh dự phòng, hình ảnh sẵn sàng |
| Sign-Out | rời phòng | điều dưỡng dụng cụ | tên thủ thuật đã làm, đếm gạc/dụng cụ/kim đủ, mẫu bệnh phẩm dán nhãn, vấn đề thiết bị |

Quy tắc HIS: **không cho phép chuyển sang state INCISION nếu chưa xong Time-Out** (hard stop). Sign-Out chưa xong → không in được tường trình.

## Data model

```sql
CREATE TABLE surgery_case (
  case_id          uuid PRIMARY KEY,
  patient_id       uuid REFERENCES patient,
  encounter_id     uuid REFERENCES encounter,
  scheduled_room   uuid REFERENCES or_room,
  scheduled_start  timestamptz,
  scheduled_duration_min int,
  primary_surgeon  uuid REFERENCES staff,
  anesthesiologist uuid REFERENCES staff,
  procedure_codes  text[],         -- ICD-9-CM hoặc danh mục PT/TT BYT
  asa_grade        int,            -- 1..6
  case_priority    varchar(10),    -- ELECTIVE/URGENT/EMERGENT
  status           varchar(20)     -- SCHEDULED/PRE_OP/IN_OR/INCISION/CLOSE/POST_OP/DONE/CANCELLED
);

CREATE TABLE surgery_event (
  event_id   uuid PRIMARY KEY,
  case_id    uuid REFERENCES surgery_case,
  event_type varchar(30),  -- IN_ROOM/ANES_START/INCISION/CLOSE/OUT_ROOM/SIGN_IN/TIME_OUT/SIGN_OUT
  occurred_at timestamptz,
  actor_id   uuid REFERENCES staff
);

CREATE TABLE surgery_team_member (
  case_id    uuid REFERENCES surgery_case,
  staff_id   uuid REFERENCES staff,
  role       varchar(30),  -- SURGEON/ASSISTANT/ANESTH/SCRUB_NURSE/CIRCULATING/PERFUSIONIST
  PRIMARY KEY (case_id, staff_id, role)
);

CREATE TABLE checklist_item (
  case_id     uuid,
  phase       varchar(10), -- SIGN_IN/TIME_OUT/SIGN_OUT
  item_code   varchar(30),
  is_checked  boolean,
  note        text,
  checked_by  uuid,
  checked_at  timestamptz,
  PRIMARY KEY (case_id, phase, item_code)
);
```

## Tường trình phẫu thuật (operative note)

Cấu trúc tối thiểu (theo TT 32/2023/TT-BYT về hồ sơ bệnh án và TT 46/2018):

1. Thông tin BN, ngày giờ.
2. Chẩn đoán trước mổ, sau mổ (ICD-10).
3. Tên thủ thuật theo danh mục BYT (mã PT/TT).
4. Phương pháp gây mê, ASA, rủi ro.
5. Mô tả kỹ thuật (template chuyên khoa).
6. Lượng máu mất, dịch truyền, máu truyền.
7. Vật tư cấy ghép (lot number, model, hạn).
8. Mẫu GPB (số phiếu, số mảnh).
9. Tình trạng BN khi rời phòng.
10. Y lệnh hậu phẫu.

## KPI vận hành phòng mổ

| Chỉ số | Mục tiêu |
| --- | --- |
| First-case on-time start | ≥ 85% |
| OR utilization (giờ mổ/giờ mở) | ≥ 75% |
| Turnover time giữa 2 ca | ≤ 25 phút |
| Tỉ lệ huỷ ca trong ngày | ≤ 5% |
| Tỉ lệ Time-Out đầy đủ trước rạch da | 100% |
| Wrong-site surgery | 0 |
| SSI (30 ngày) theo CDC NHSN | < trung bình quốc gia |

## Sai lầm thường gặp khi triển khai OR module

1. Lịch mổ tách rời HIS chính → BS không thấy y lệnh tiền mê, không reuse hồ sơ BN.
2. Cho phép skip Time-Out để "kịp giờ" → vô hiệu hoá toàn bộ giá trị checklist.
3. Đếm gạc/dụng cụ ghi trên giấy → mất, không truy vết được khi sự cố retained foreign body.
4. Không ghi đủ event_time → không tính được KPI utilization, không quản lý được hợp đồng máy.
5. Tường trình viết sau 24h → BHYT từ chối, EMR không khớp y lệnh.
6. Block schedule cố định không release → phòng trống mà không khoa nào dùng được.

## UAT checklist

- [ ] Đặt lịch ca mổ trùng giờ trùng phòng → bị chặn cứng.
- [ ] BN chưa khám tiền mê → không cho chuyển PRE-OP.
- [ ] Time-Out chưa đủ item → không nhập được mốc INCISION.
- [ ] Đếm gạc cuối ca lệch → cảnh báo bắt buộc, không cho Sign-Out.
- [ ] Tường trình PT > 24h sau ca → cảnh báo trưởng khoa.
- [ ] Báo cáo OR utilization tự sinh hàng ngày, hàng tháng.

## Cơ sở pháp lý 2026

- **Luật Khám bệnh, Chữa bệnh 15/2023/QH15** — Điều 64 an toàn người bệnh trong phẫu thuật.
- **Quyết định 7482/QĐ-BYT/2018** — hướng dẫn áp dụng WHO Surgical Safety Checklist (cập nhật QĐ 1313/QĐ-BYT/2024).
- **Thông tư 32/2023/TT-BYT** — hồ sơ bệnh án (thay TT 14/2018).
- **Thông tư 46/2018/TT-BYT** — quy định hồ sơ bệnh án điện tử.
- **Thông tư 13/2019/TT-BYT** (sửa đổi 2024) — danh mục PT/TT theo bảng giá BHYT.
- **Quyết định 4068/QĐ-BYT/2021** — quy chuẩn phòng mổ.
- **CDC NHSN guidelines** (tham chiếu quốc tế cho SSI).
