---
id: 019f5a01-d000-7001-his0-000000000702
title: "Bài 18: Vi sinh, kháng sinh đồ & AMS"
slug: bai-18-vi-sinh-khang-sinh-do-ams
description: >-
  Quy trình vi sinh dài ngày, nhập kết quả nuôi cấy, kháng sinh đồ (AST),
  hỗ trợ chương trình quản lý kháng kháng sinh (Antimicrobial Stewardship).
duration_minutes: 50
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-18-vi-sinh-khang-sinh-do-ams-banner.webp
video_url: null
sort_order: 2
section_title: "Phần 7: Xét nghiệm (LIS)"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![Vi sinh, kháng sinh đồ & AMS](/storage/uploads/2026/05/his/bai-18-vi-sinh-khang-sinh-do-ams-banner.webp)

## Đặc thù vi sinh

![Đọc kháng sinh đồ S/I/R và dashboard AMS](/storage/uploads/2026/05/his/bai-18-vi-sinh-khang-sinh-do-ams-workflow.webp)


## Mục tiêu bài học

- Hiểu vì sao vi sinh **không thể** dùng chung quy trình với hoá sinh / huyết học.
- Mô hình hoá kết quả nuôi cấy nhiều ngày, nhiều tác nhân, nhiều kháng sinh.
- Triển khai báo cáo **antibiogram** theo CLSI / EUCAST.
- Tích hợp **AMS (Antimicrobial Stewardship)** — yêu cầu của Bộ Y tế từ 2016 và mạnh mẽ hơn theo Quyết định 5631/QĐ-BYT/2020 (vẫn áp dụng).
- Cảnh báo lâm sàng: kháng sinh không phù hợp, ESBL, MRSA, CRE.

## Đặc thù vi sinh

| Đặc điểm | Hoá sinh | Vi sinh |
| --- | --- | --- |
| Thời gian trả kết quả | phút–giờ | 24h – 7 ngày |
| Kết quả số | đa số | rất ít |
| Kết quả văn bản, bán định lượng | hiếm | chủ yếu |
| 1 mẫu → nhiều kết quả | hiếm | thường (Gram + nuôi cấy + AST + sinh hoá) |
| Cập nhật nhiều lần | hiếm | bắt buộc (preliminary → final) |
| Ý nghĩa lâm sàng phụ thuộc context | ít | rất nhiều (vị trí lấy, tình trạng BN) |

## Vòng đời ca nuôi cấy

```
Day 0:  Lấy mẫu (máu 2 chai HC + KK; đờm; nước tiểu...) → cấy
Day 1:  Báo "Đã có vi khuẩn mọc, đang định danh"      [PRELIM 1]
Day 2:  Định danh sơ bộ + Gram                          [PRELIM 2]
Day 3:  Định danh chính thức (MALDI-TOF/Vitek)          [PRELIM 3]
Day 3-4: AST (Antibiotic Susceptibility Test)          [FINAL]
Day 7+: Nuôi cấy âm tính nếu không mọc gì              [FINAL NEG]
```

LIS vi sinh phải hỗ trợ:
- Lưu nhiều **isolate** (chủng) trên 1 specimen, mỗi isolate có AST riêng.
- **Update đa version** kết quả mà không xoá history.
- Push từng PRELIM về HIS — BS thấy tiến trình.

## Mô hình dữ liệu

```sql
CREATE TABLE micro_specimens (
  sid          VARCHAR(20) PRIMARY KEY,
  source       VARCHAR(32),                -- BLOOD|URINE|SPUTUM|CSF|WOUND
  body_site    VARCHAR(64),
  collected_at TIMESTAMPTZ,
  ...
);

CREATE TABLE micro_isolates (
  isolate_id   UUID PRIMARY KEY,
  sid          VARCHAR(20),
  organism_code VARCHAR(32),               -- ECOLI, KPNEU, SAUREUS...
  organism_name TEXT,
  quantification VARCHAR(32),              -- 10^5 CFU/mL ...
  is_pathogen  BOOLEAN,
  resistance_marker VARCHAR(64),           -- ESBL, MRSA, CRE, VRE
  noted_at     TIMESTAMPTZ
);

CREATE TABLE micro_ast (
  id           BIGSERIAL PRIMARY KEY,
  isolate_id   UUID,
  drug_code    VARCHAR(32),                -- AMP, CIP, MEM...
  mic_value    NUMERIC,
  mic_unit     VARCHAR(8),
  interpretation VARCHAR(2),               -- S | I | R
  method       VARCHAR(32),                -- DD, MIC_MICRO, ETEST
  guideline    VARCHAR(16),                -- CLSI-2025 | EUCAST-15.0
  reported_at  TIMESTAMPTZ
);
```

## AST — interpretation S/I/R

- **S (Susceptible)** — KS có khả năng tiêu diệt với liều chuẩn.
- **I (Intermediate / Susceptible-Increased Exposure)** — cần tăng liều hoặc chỉ dùng vị trí KS tập trung cao.
- **R (Resistant)** — không nên dùng.

EUCAST từ 2019 đổi định nghĩa I — HIS phải hiển thị tooltip giải thích cho BS lâm sàng tránh hiểu nhầm.

## Antibiogram (báo cáo kháng KS theo BV/khoa)

LIS phải xuất được hằng năm (hoặc quý) bảng:

| Vi khuẩn | n | AMP %S | CIP %S | CRO %S | MEM %S |
| --- | --- | --- | --- | --- | --- |
| E. coli | 312 | 38% | 62% | 80% | 99% |
| K. pneumoniae (ESBL+) | 88 | 0% | 22% | 8% | 96% |

Đây là vũ khí cốt lõi của **AMS**: BS chọn KS empirical dựa vào antibiogram của chính BV, không dùng dữ liệu nước ngoài.

## AMS — Antimicrobial Stewardship trong HIS

Theo **Quyết định 5631/QĐ-BYT/2020** "Hướng dẫn thực hiện quản lý sử dụng kháng sinh trong BV":

- Mỗi BV có **đội AMS** (BS lâm sàng + dược lâm sàng + vi sinh).
- HIS/LIS hỗ trợ:
  - Cảnh báo khi BS kê **KS hạn chế** (carbapenem, colistin, tigecyclin, linezolid, vancomycin) — bắt nhập "lý do dùng" và xin phê duyệt AMS trong N giờ.
  - **De-escalation alert**: khi có kết quả AST, hệ thống gợi ý chuyển KS phổ rộng → KS phổ hẹp.
  - **Bug-drug mismatch**: kê KS mà AST đã trả R cho vi khuẩn đó → cảnh báo đỏ.
  - Báo cáo **DDD/100 giường-ngày** (Defined Daily Dose) định kỳ.
  - Cảnh báo isolate đặc biệt: MRSA, ESBL, CRE, VRE → tự động bật phòng ngừa cách ly (contact precaution) trong HIS.

## Tích hợp với HIS

- Mỗi PRELIM update → HIS hiển thị banner ở tab BS.
- Bug-drug mismatch chạy như CDS rule trong order management (xem bài 15).
- Khi LIS ghi nhận MRSA/CRE → HIS tự gắn tag bệnh nhân, hiện wristband đỏ và cảnh báo điều dưỡng.

## Sai lầm thường gặp

- LIS chỉ gửi FINAL → BS không thấy PRELIM, mất 24-48h vô ích.
- Không phân biệt **isolate vs specimen** → dữ liệu rối khi 1 mẫu mọc 2 vi khuẩn.
- Không lưu method và guideline (CLSI/EUCAST năm nào) → không reproducible.
- Antibiogram tính cả mẫu trùng (cùng BN, cùng vi khuẩn trong 30 ngày) → bị "nhân đôi" tỉ lệ kháng.
- AMS alert bật quá nhiều → BS bỏ qua hết.

## Output bài học

- Mô hình hoá vi sinh đúng (specimen → isolate → AST).
- Dựng được pipeline antibiogram đơn giản.
- Hiểu workflow AMS và biết HIS/LIS đóng vai trò nào.

## Checklist UAT

- [ ] 1 mẫu sinh 2 isolate → cả 2 đều có AST riêng.
- [ ] PRELIM ngày 1 hiển thị HIS.
- [ ] AST có guideline + version.
- [ ] Bug-drug mismatch (R) → cảnh báo đỏ khi BS kê KS đó.
- [ ] Kê meropenem → bắt buộc lý do, escalate AMS.
- [ ] Antibiogram annual khử trùng (1 isolate/BN/30 ngày/loại bệnh phẩm).
- [ ] Cờ MRSA/CRE auto bật contact precaution.

## KPI

| KPI | Ngưỡng |
| --- | --- |
| TAT cấy máu PRELIM ngày 1 | ≥ 95% |
| TAT AST sau định danh | ≤ 48h |
| % bug-drug mismatch (sau khi có AST > 24h vẫn dùng KS R) | < 5% |
| % carbapenem dùng có phê duyệt AMS | ≥ 95% |
| Giảm DDD carbapenem/100 BD/quý | ≥ 5% |

## Cơ sở pháp lý 2026

- **Quyết định 5631/QĐ-BYT/2020** — hướng dẫn AMS bệnh viện.
- **Quyết định 4554/QĐ-BYT/2017** — hướng dẫn giám sát kháng KS.
- **Thông tư 49/2018/TT-BYT** — quản lý chất lượng XN (áp dụng cả vi sinh).
- **Thông tư 21/2013/TT-BYT** — quy định Hội đồng Thuốc & Điều trị (cùng bộ phận với AMS).
- **CLSI M100 / EUCAST guideline** — chuẩn quốc tế cập nhật hằng năm.

## Bài tiếp

Phần 8 sẽ vào CĐHA: RIS quản lý lịch chụp, BS đọc kết quả, tích hợp PACS để lưu và xem ảnh.
