---
id: 019f5a01-d000-7001-his0-000000001101
title: "Bài 27: Sản khoa — quản lý thai sản & sinh đẻ"
slug: bai-27-san-khoa-thai-san
description: >-
  Quy trình quản lý thai từ khám đầu, các mốc khám thai, partogram trong
  chuyển dạ, sinh thường / mổ và hồ sơ mẹ — bé.
duration_minutes: 50
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-27-san-khoa-thai-san-banner.webp
video_url: null
sort_order: 1
section_title: "Phần 11: Chuyên khoa đặc thù"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![Sản khoa & quản lý thai sản](/storage/uploads/2026/05/his/bai-27-san-khoa-thai-san-banner.webp)

## Hồ sơ thai phụ

![Khám thai với CTG và siêu âm thai](/storage/uploads/2026/05/his/bai-27-san-khoa-thai-san-workflow.webp)


## Mục tiêu bài học

- Mô hình hoá chu trình thai sản: đăng ký → khám thai định kỳ → sàng lọc → chuyển dạ → sinh → hậu sản.
- Tuân thủ **Hướng dẫn Quốc gia về dịch vụ chăm sóc sức khoẻ sinh sản** (QĐ 4128/QĐ-BYT/2016, sửa đổi 2024) về số lần khám thai, mốc sàng lọc.
- Tích hợp HIS với CTG (cardiotocography), siêu âm 4D, máy theo dõi mẹ và thai.
- Sinh đẻ: ghi nhận partogram điện tử, APGAR, cấp giấy chứng sinh điện tử theo **Nghị định 04/2024**.
- Báo cáo thống kê sinh tử mẹ-trẻ về Vụ Sức khoẻ Bà mẹ-Trẻ em.

## Bối cảnh: vì sao sản khoa là phân hệ "khó nhằn" nhất

- Một thai phụ tạo 8-12 lượt khám trong 9 tháng → khối lượng dữ liệu lớn, cần view "đường thai kỳ" thống nhất.
- Sự cố sản khoa (băng huyết, sản giật, vỡ tử cung) cần dữ liệu **realtime đến giây** — partogram giấy không kịp.
- Giấy chứng sinh từ 2024 chuyển sang điện tử (NĐ 04/2024) — HIS phải tích hợp với hệ thống Hộ tịch của Bộ Tư pháp.
- Theo dõi mẹ — con trên cùng một "encounter sinh" nhưng tách thành 2 hồ sơ độc lập sau sinh.

## Hồ sơ thai phụ — cấu trúc

```sql
CREATE TABLE pregnancy (
  pregnancy_id    uuid PRIMARY KEY,
  mother_id       uuid REFERENCES patient,
  lmp             date,             -- last menstrual period
  edd             date,             -- estimated delivery date
  gravida         int,              -- số lần có thai (G)
  para            varchar(10),      -- TPAL: term/preterm/abortion/living
  blood_type      varchar(3),
  rh              varchar(2),
  high_risk_flags text[],           -- TIỀN_SẢN_GIẬT, ĐTĐ_THAI_KỲ, SẸO_MỔ_CŨ...
  status          varchar(20)       -- ACTIVE/DELIVERED/MISCARRIED/TERMINATED
);

CREATE TABLE antenatal_visit (
  visit_id      uuid PRIMARY KEY,
  pregnancy_id  uuid REFERENCES pregnancy,
  ga_weeks      numeric,            -- gestational age
  visit_date    date,
  bp_systolic   int,
  bp_diastolic  int,
  weight        numeric,
  fundal_height numeric,
  fetal_hr      int,
  ultrasound_findings jsonb,
  screening_results jsonb,          -- double/triple test, NIPT, OGTT...
  next_appointment date
);
```

## Mốc khám thai bắt buộc (theo BYT)

| Tuần thai | Nội dung chính |
| --- | --- |
| ≤ 12 | Đăng ký, xét nghiệm máu cơ bản, siêu âm xác định tuổi thai, double test |
| 16-18 | Triple test hoặc NIPT, siêu âm hình thái sớm |
| 20-24 | Siêu âm hình thái 4D, sàng lọc tim thai |
| 24-28 | Tầm soát đái tháo đường thai kỳ (OGTT 75g) |
| 28-32 | Tiêm Anti-D nếu Rh-, theo dõi tiền sản giật |
| 32-36 | Khám trọng điểm, đánh giá ngôi thai |
| ≥ 36 | Khám hàng tuần, CTG nếu có chỉ định |

HIS phải:

- Tự sinh **lịch khám** theo EDD và mốc trên.
- Cảnh báo nếu thai phụ trễ khám.
- Hiển thị **biểu đồ tăng trưởng thai** theo chuẩn WHO/INTERGROWTH-21st.

## Chuyển dạ & sinh — Partogram điện tử

Partogram WHO 2018 yêu cầu theo dõi đồng thời:

- Tim thai (FHR) mỗi 15-30 phút.
- Cơn co tử cung (tần số, cường độ, thời gian).
- Độ mở cổ tử cung (mỗi 4 giờ ở pha tích cực).
- Ngôi, kiểu thế, độ lọt.
- Mạch, HA, nhiệt độ mẹ.
- Dịch ối (màu sắc, có su).
- Thuốc đã dùng (oxytocin, giảm đau).

```sql
CREATE TABLE labor_event (
  event_id      uuid PRIMARY KEY,
  delivery_id   uuid,
  event_time    timestamptz,
  cervical_dilation numeric,      -- cm
  fetal_hr      int,
  contractions_per_10min int,
  amniotic_fluid varchar(20),     -- INTACT/CLEAR/MECONIUM/BLOODY
  maternal_bp_sys int,
  maternal_bp_dia int,
  maternal_pulse int,
  recorded_by   uuid REFERENCES staff
);
```

Cảnh báo bắt buộc khi vượt **action line** WHO partogram → HIS hiện đỏ, đề xuất can thiệp (oxytocin, mổ lấy thai).

## Ghi nhận sinh & APGAR

```sql
CREATE TABLE delivery (
  delivery_id   uuid PRIMARY KEY,
  pregnancy_id  uuid REFERENCES pregnancy,
  delivery_mode varchar(20),    -- VAGINAL/INSTRUMENTAL/CSECTION
  delivery_time timestamptz,
  episiotomy    boolean,
  blood_loss_ml int,
  placenta_complete boolean,
  complications text[]
);

CREATE TABLE newborn (
  newborn_id    uuid PRIMARY KEY,
  mother_id     uuid REFERENCES patient,
  delivery_id   uuid REFERENCES delivery,
  sex           varchar(1),
  birth_weight_g int,
  birth_length_cm numeric,
  apgar_1min    int,
  apgar_5min    int,
  apgar_10min   int,
  resuscitation jsonb,
  created_patient_id uuid REFERENCES patient   -- tách hồ sơ sau sinh
);
```

## Giấy chứng sinh điện tử (NĐ 04/2024)

- Sau sinh, HIS tự tạo bản nháp Giấy chứng sinh (Mẫu CS1).
- Hộ sinh/BS ký số → đẩy lên **Hệ thống đăng ký, quản lý hộ tịch điện tử dùng chung**.
- Hệ thống Bộ Tư pháp trả mã giấy chứng sinh → đính vào hồ sơ mẹ + con.
- Bản giấy chỉ còn cấp khi gia đình yêu cầu.

## Sai lầm thường gặp

1. Tách rời "khám thai" và "sinh" — không có pregnancy_id xuyên suốt → không thấy timeline.
2. Partogram nhập sau 4-6 giờ thay vì realtime → vô nghĩa, không có giá trị pháp lý.
3. Không tách hồ sơ con sau sinh → thuốc của mẹ ghi nhầm cho con (gây nhầm trong sơ sinh).
4. APGAR ghi "8/10/10" dạng text → không phân tích thống kê được.
5. Không kết nối hệ thống hộ tịch → BV vẫn cấp giấy chứng sinh giấy → vi phạm NĐ 04/2024 từ 01/01/2025.

## Output / Deliverables

- Dashboard "đường thai kỳ" — timeline tất cả khám, xét nghiệm, siêu âm.
- Module partogram điện tử với cảnh báo action line.
- Tự sinh giấy chứng sinh điện tử + ký số + đẩy hộ tịch.
- Báo cáo Vụ Sức khoẻ BMTE: tỉ lệ mổ lấy thai, biến chứng, sinh non, tử vong mẹ/sơ sinh.

## UAT checklist

- [ ] Đăng ký thai phụ → tự sinh đủ 8 lịch khám theo mốc BYT.
- [ ] Nhập partogram, vượt action line → cảnh báo đỏ + ghi audit.
- [ ] Sinh xong → tự tách hồ sơ trẻ sơ sinh, gắn `created_patient_id`.
- [ ] Giấy chứng sinh đẩy hộ tịch thành công, nhận lại số giấy.
- [ ] Báo cáo BMTE xuất đúng mẫu Excel/XML BYT.

## KPI

| Chỉ số | Mục tiêu |
| --- | --- |
| % thai phụ có ≥ 4 lần khám thai | ≥ 95% |
| % sinh có partogram điện tử | 100% |
| % giấy chứng sinh đẩy hộ tịch trong 24h | ≥ 98% |
| Tỉ lệ mổ lấy thai (so chỉ số WHO) | ≤ 30% (lý tưởng 10-15%) |
| Tỉ lệ tử vong mẹ | < trung bình quốc gia |

## Cơ sở pháp lý 2026

- **Luật Khám bệnh, Chữa bệnh 15/2023/QH15**.
- **Quyết định 4128/QĐ-BYT/2016** (sửa đổi QĐ 1907/QĐ-BYT/2024) — Hướng dẫn Quốc gia chăm sóc SKSS.
- **Nghị định 04/2024/NĐ-CP** — đăng ký, quản lý hộ tịch điện tử (giấy chứng sinh).
- **Thông tư 56/2017/TT-BYT** (sửa đổi TT 18/2022) — giám định BHXH, có giấy chứng sinh.
- **Luật Bảo hiểm xã hội 41/2024/QH15** — chế độ thai sản (hiệu lực 01/07/2025).
- **Quyết định 1718/QĐ-BYT/2024** — bộ chỉ số chất lượng SKSS.
- **WHO Partograph 2018** — chuẩn quốc tế tham chiếu.
