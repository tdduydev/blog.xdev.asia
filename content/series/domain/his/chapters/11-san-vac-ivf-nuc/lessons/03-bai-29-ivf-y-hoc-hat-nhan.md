---
id: 019f5a01-d000-7001-his0-000000001103
title: "Bài 29: IVF & Y học hạt nhân — quy trình đặc thù"
slug: bai-29-ivf-y-hoc-hat-nhan
description: >-
  Hai chuyên khoa có quy trình rất khác biệt mà HIS cần hỗ trợ riêng: hỗ
  trợ sinh sản (IVF) và y học hạt nhân (Nuclear Medicine — PET/SPECT,
  Iod-131).
duration_minutes: 45
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-29-ivf-y-hoc-hat-nhan-banner.webp
video_url: null
sort_order: 3
section_title: "Phần 11: Chuyên khoa đặc thù"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![IVF & Y học hạt nhân](/storage/uploads/2026/05/his/bai-29-ivf-y-hoc-hat-nhan-banner.webp)

## IVF — Hỗ trợ sinh sản

![Lab IVF với phôi và phòng PET/SPECT](/storage/uploads/2026/05/his/bai-29-ivf-y-hoc-hat-nhan-workflow.webp)


## Mục tiêu bài học

- Nắm các đặc thù dữ liệu của trung tâm **IVF** (hỗ trợ sinh sản) trong HIS: chu kỳ kích trứng, lab phôi, đông phôi, chuyển phôi.
- Hiểu yêu cầu pháp lý IVF tại VN: **Nghị định 10/2015/NĐ-CP** (sinh con bằng kỹ thuật hỗ trợ sinh sản) và sửa đổi NĐ 98/2024.
- Quản lý phòng **Y học hạt nhân (Nuclear Medicine)** với PET/CT, SPECT, xạ trị I-131: an toàn bức xạ, khu vực kiểm soát.
- Tuân thủ **Luật Năng lượng nguyên tử 18/2008** và Thông tư 13/2018/TT-BKHCN về an toàn bức xạ y tế.
- Tích hợp HIS với máy PET/CT qua DICOM, theo dõi liều xạ (DRL) cho BN.

## Phần 1 — IVF (Assisted Reproductive Technology)

### Bối cảnh

- IVF là dịch vụ "đầu tư cao, sai sót đắt giá": một chu kỳ chi phí 70-200 triệu, tỉ lệ thành công 35-50%.
- Sự cố nhầm phôi/nhầm tinh trùng tại VN đã ghi nhận → trung tâm bị đình chỉ + bồi thường rất lớn.
- Phôi đông trữ phải lưu **vô thời hạn** đến khi cặp vợ chồng quyết định dùng/huỷ — quản trị dữ liệu trọn đời.

### Cấu trúc dữ liệu IVF

```sql
CREATE TABLE ivf_couple (
  couple_id     uuid PRIMARY KEY,
  female_patient_id uuid REFERENCES patient,
  male_patient_id   uuid REFERENCES patient,
  marriage_cert_no  varchar(50),  -- bắt buộc theo NĐ 10/2015 (trừ trường hợp đặc biệt)
  consent_doc_id    uuid,
  registered_at     date
);

CREATE TABLE ivf_cycle (
  cycle_id      uuid PRIMARY KEY,
  couple_id     uuid REFERENCES ivf_couple,
  cycle_no      int,
  protocol      varchar(50),     -- LONG/SHORT/ANTAGONIST/MILD
  start_date    date,
  trigger_date  date,
  opu_date      date,            -- chọc hút trứng
  oocytes_retrieved int,
  status        varchar(20)
);

CREATE TABLE embryo (
  embryo_id     uuid PRIMARY KEY,
  cycle_id      uuid REFERENCES ivf_cycle,
  embryo_label  varchar(50),     -- mã đĩa nuôi cấy
  fertilization_method varchar(10), -- IVF/ICSI
  day3_grade    varchar(10),
  day5_grade    varchar(10),
  outcome       varchar(20),     -- TRANSFERRED/FROZEN/DISCARDED/DONATED/RESEARCH
  freeze_date   date,
  freeze_tank   varchar(20),
  freeze_position varchar(20),
  thaw_date     date
);

CREATE TABLE embryo_transfer (
  transfer_id   uuid PRIMARY KEY,
  cycle_id      uuid REFERENCES ivf_cycle,
  embryo_ids    uuid[],
  transfer_date date,
  endometrial_thickness numeric,
  beta_hcg_14d  numeric,
  pregnancy_outcome varchar(20)  -- POSITIVE/NEGATIVE/CHEMICAL/CLINICAL/ONGOING/LIVE_BIRTH
);
```

### Witness rule (chống nhầm)

- Mọi thao tác lab IVF (nhận tinh trùng, ICSI, chuyển phôi, đông phôi) cần **2 KTV chứng kiến** (witness) — HIS log cả 2.
- Hệ thống **electronic witnessing** (RI Witness, Matcher, FertiProof) tự match RFID/barcode đĩa nuôi cấy với BN — thay người chứng.
- Nếu mismatch → khoá thiết bị, không cho thao tác tiếp.

### Đặc thù pháp lý

- Cặp vợ chồng phải có giấy đăng ký kết hôn (trừ phụ nữ độc thân theo NĐ 10/2015).
- Phôi đông trữ thuộc sở hữu chung; quyết định huỷ/hiến tặng cần đồng thuận **2 vợ chồng** (HIS lưu chữ ký số).
- Báo cáo Vụ SKSS hàng năm: số chu kỳ, tỉ lệ có thai lâm sàng, sinh sống, biến chứng.

## Phần 2 — Y học hạt nhân (Nuclear Medicine)

### Bối cảnh

- Phòng YHHN sử dụng **dược chất phóng xạ** (radiopharmaceutical) như F-18 FDG, Tc-99m, I-131, Ga-68 PSMA.
- BN sau tiêm trở thành **nguồn phóng xạ di động** — cần khu vực chờ riêng, hướng dẫn cách ly.
- Chất thải phóng xạ phải lưu suy giảm hoạt độ trước khi thải — quản trị nghiêm theo Luật Năng lượng nguyên tử.
- DRL (Diagnostic Reference Level) là yêu cầu mới của TT 25/2024/TT-BKHCN về liều bức xạ y tế.

### Cấu trúc dữ liệu

```sql
CREATE TABLE nuc_med_study (
  study_id      uuid PRIMARY KEY,
  patient_id    uuid REFERENCES patient,
  procedure     varchar(100),    -- PET/CT FDG, SPECT bone, I-131 ablation
  radiopharmaceutical varchar(50),
  activity_mbq  numeric,         -- liều tiêm theo MBq
  injection_time timestamptz,
  scan_start_time timestamptz,
  patient_weight_kg numeric,
  effective_dose_msv numeric,    -- liều hiệu dụng cho BN
  dicom_study_uid varchar(100),
  reading_doctor uuid,
  reported_at   timestamptz
);

CREATE TABLE radioactive_waste (
  waste_id      uuid PRIMARY KEY,
  isotope       varchar(20),
  initial_activity_mbq numeric,
  storage_location varchar(50),
  decayed_to_release_at timestamptz,
  released_at   timestamptz,
  measured_by   uuid
);
```

### An toàn bức xạ — yêu cầu HIS

- Hồ sơ liều cá nhân nhân viên y tế (badge dosimeter) — báo cáo Cục An toàn bức xạ hạt nhân hàng quý.
- Hồ sơ liều BN — tích luỹ qua các lần chụp, cảnh báo khi gần ngưỡng khuyến cáo (theo ICRP).
- Khu vực kiểm soát: chỉ nhân viên có chứng chỉ + badge mới được vào — HIS tích hợp với hệ thống kiểm soát ra vào.
- Sự cố tràn/rò rỉ → form báo cáo Cục An toàn BX hạt nhân trong 8 giờ.

### Tích hợp DICOM

- PET/CT, SPECT/CT xuất DICOM với tag liều: (0018,1402) `Patient Orientation`, (0054,0016) `Radiopharmaceutical Information Sequence` — HIS đọc và lưu vào `nuc_med_study`.
- Truyền sang PACS chuyên dụng (chứa cả CT attenuation correction và PET emission).
- Đọc kết quả: BS YHHN ký số PKI, đẩy về EMR; tích hợp với GPB nếu là chẩn đoán u.

## Sai lầm thường gặp (cả 2 phần)

1. IVF dùng Excel theo dõi phôi → không có witness audit, dễ nhầm.
2. IVF không quản lý vị trí đông trữ → tìm phôi mất giờ, thất lạc.
3. YHHN không log liều BN → vi phạm DRL, không truy vết khi BN khiếu kiện ung thư do bức xạ.
4. YHHN không quản lý waste decay → thải sớm, vi phạm Luật NL nguyên tử.
5. Tích hợp DICOM không lấy tag liều → không tính được effective dose.
6. Nhân viên không có badge điện tử → không báo cáo Cục An toàn BX được.

## Output / Deliverables

- Module IVF với electronic witnessing + ngân hàng phôi.
- Sổ liều BN tích luỹ + cảnh báo DRL.
- Báo cáo Vụ SKSS (IVF) và Cục An toàn BX hạt nhân (YHHN).
- Tích hợp DICOM với PET/CT, SPECT/CT.

## UAT checklist

- [ ] Thao tác chuyển phôi không có witness → bị chặn.
- [ ] Phôi mismatch RFID đĩa → khoá thiết bị.
- [ ] Tiêm FDG > 8 MBq/kg cho BN > 100kg → cảnh báo vượt DRL.
- [ ] Waste I-131 chưa decay đủ → không cho release.
- [ ] Báo cáo IVF năm xuất đúng mẫu Vụ SKSS.
- [ ] Báo cáo liều bức xạ NV xuất đúng mẫu Cục ATBX.

## KPI

| Chỉ số | Mục tiêu |
| --- | --- |
| % thao tác lab IVF có witness | 100% |
| % phôi truy vết được vị trí đông | 100% |
| % nghiên cứu PET có effective dose | 100% |
| % waste decay đủ trước release | 100% |
| Sự cố nhầm phôi/nhầm BN | 0 |

## Cơ sở pháp lý 2026

- **Nghị định 10/2015/NĐ-CP** + **NĐ 98/2024/NĐ-CP** sửa đổi — sinh con bằng kỹ thuật hỗ trợ sinh sản.
- **Luật Năng lượng nguyên tử 18/2008/QH12** (đang dự thảo sửa đổi 2026).
- **Thông tư 13/2018/TT-BKHCN** — an toàn bức xạ y tế.
- **Thông tư 25/2024/TT-BKHCN** — DRL và quản lý liều BN.
- **Thông tư 22/2014/TT-BKHCN** + sửa đổi 2024 — quản lý chất thải phóng xạ.
- **Luật KCB 15/2023/QH15** — Điều 49-50 trang thiết bị y tế.
- **ICRP Publication 135** — DRL chẩn đoán hình ảnh (tham chiếu quốc tế).
