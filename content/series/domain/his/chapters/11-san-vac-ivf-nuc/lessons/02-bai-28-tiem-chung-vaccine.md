---
id: 019f5a01-d000-7001-his0-000000001102
title: "Bài 28: Tiêm chủng — sổ tiêm điện tử & quản lý vaccine"
slug: bai-28-tiem-chung-vaccine
description: >-
  Quản lý tiêm chủng mở rộng & dịch vụ: lịch tiêm theo độ tuổi, lưu lô —
  hạn — tủ lạnh, ghi nhận phản ứng sau tiêm, đẩy lên hệ thống TCQG.
duration_minutes: 40
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-28-tiem-chung-vaccine-banner.webp
video_url: null
sort_order: 2
section_title: "Phần 11: Chuyên khoa đặc thù"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![Tiêm chủng & sổ tiêm điện tử](/storage/uploads/2026/05/his/bai-28-tiem-chung-vaccine-banner.webp)

## Đối tượng

![Tiêm vaccine và đẩy lên sổ tiêm chủng quốc gia](/storage/uploads/2026/05/his/bai-28-tiem-chung-vaccine-workflow.webp)


## Mục tiêu bài học

- Mô hình hoá quy trình tiêm chủng: sàng lọc trước tiêm → tiêm → theo dõi sau tiêm 30 phút → cập nhật sổ tiêm.
- Tích hợp HIS với **Hệ thống thông tin tiêm chủng quốc gia** (tiemchung.vn) theo Quyết định 5946/QĐ-BYT/2018 và cập nhật 2024.
- Quản lý cold-chain vaccine end-to-end (kho → tủ buồng tiêm → ống tiêm).
- Theo dõi phản ứng sau tiêm (AEFI) và báo cáo về Cục Y tế dự phòng.
- Triển khai sổ tiêm chủng cá nhân điện tử trên VNeID Health theo QĐ 06/QĐ-TTg/2022.

## Bối cảnh: vì sao tiêm chủng cần module riêng

- Trẻ em VN có lịch tiêm hơn 20 mũi/2 năm đầu — không thể quản lý bằng giấy.
- COVID-19 đã chứng minh giá trị **sổ tiêm điện tử quốc gia** — nhưng cũng phơi bày lỗ hổng dữ liệu (sai họ tên, trùng mũi).
- Phản ứng phản vệ tiêm chủng cần ghi nhận realtime để nghiên cứu lô vaccine; chậm báo cáo = mất an toàn cộng đồng.
- BV/TYT có **bàn tiêm dịch vụ** ngoài chương trình mở rộng (TCMR) → 2 luồng song song, dễ trùng lặp.

## Đối tượng tiêm chủng

| Nhóm | Quy định | Văn bản |
| --- | --- | --- |
| Trẻ < 2 tuổi (TCMR) | miễn phí, lịch BYT | TT 38/2017/TT-BYT (sửa đổi TT 10/2024) |
| Trẻ 2-5 tuổi vaccine bổ sung | miễn phí một số loại | QĐ 1796/QĐ-BYT/2024 |
| Học sinh | tiêm trường (sởi-rubella, HPV, viêm gan B mũi nhắc) | TT 23/2017 |
| Người lớn (cúm, viêm gan B, HPV, zona, dengue) | dịch vụ trả phí | TT 38/2017 + TT 12/2024 mở rộng vaccine dengue Qdenga |
| Phụ nữ có thai | uốn ván, cúm, ho gà, COVID-19 | TT 38 + QĐ 4128 |
| Nhóm nguy cơ cao (NVYT, người tiếp xúc) | theo CDC | hướng dẫn cụ thể |

## Sổ tiêm điện tử — cấu trúc

```sql
CREATE TABLE immunization_record (
  record_id     uuid PRIMARY KEY,
  patient_id    uuid REFERENCES patient,
  vaccine_code  varchar(20),     -- mã ATC/CVX/BYT
  vaccine_name  varchar(200),
  manufacturer  varchar(200),
  lot_no        varchar(50),
  expiry_date   date,
  dose_no       int,             -- mũi 1, 2, 3, nhắc...
  series_total  int,
  route         varchar(10),     -- IM/SC/PO/ID/IN
  site          varchar(20),     -- LEFT_DELTOID/RIGHT_THIGH...
  given_at      timestamptz,
  given_by      uuid REFERENCES staff,
  facility_id   uuid,
  funding       varchar(20),     -- TCMR/SERVICE/INSURED
  national_sync_status varchar(20)  -- PENDING/SYNCED/FAILED
);

CREATE TABLE vaccination_screening (
  screening_id  uuid PRIMARY KEY,
  patient_id    uuid,
  scheduled_vaccine varchar(20),
  temperature   numeric,
  weight        numeric,         -- bắt buộc cho trẻ < 1
  contraindications text[],
  decision      varchar(20),     -- PROCEED/POSTPONE/REFER/CANCEL
  decision_reason text,
  screened_by   uuid,
  screened_at   timestamptz
);

CREATE TABLE aefi_report (
  aefi_id       uuid PRIMARY KEY,
  immunization_record_id uuid REFERENCES immunization_record,
  onset_minutes int,
  reaction      text,
  severity      varchar(20),     -- MILD/MODERATE/SEVERE/ANAPHYLAXIS
  outcome       varchar(20),
  reported_to_yt boolean,
  reported_at   timestamptz
);
```

## Workflow tiêm chủng

```
ĐĂNG KÝ → SÀNG LỌC TRƯỚC TIÊM → KÊ ĐƠN/CẤP VACCINE
   │
   │ Quét lô + scan barcode lọ
   ▼
   TIÊM → THEO DÕI 30 PHÚT TẠI CHỖ
   │
   ├─ Bình thường → CẤP GIẤY XÁC NHẬN + ĐẨY SỔ QUỐC GIA
   │
   └─ AEFI → CẤP CỨU + BÁO CÁO Y TẾ DỰ PHÒNG (TT 24/2018)
```

Quy tắc bắt buộc:

- Sàng lọc bắt buộc trước tiêm — không sàng lọc → không cho ghi mũi tiêm.
- Quét barcode lọ vaccine — tự lấy lot + HSD → tránh nhập sai.
- Theo dõi 30 phút là trường timestamp riêng — chưa hết 30 phút thì không in giấy.
- Đẩy sổ tiêm quốc gia trong 24 giờ; failed → hàng chờ retry.

## Cold-chain vaccine

- Kho vaccine 2-8°C, ngăn cấp đông cho OPV.
- Nhiệt kế có data logger sync HIS mỗi 5-15 phút.
- Cảnh báo SMS/Telegram khi nhiệt độ ngoài ngưỡng > 5 phút (vaccine nhạy cảm hơn thuốc thường).
- Mỗi lọ vaccine có **VVM** (Vaccine Vial Monitor) — thẻ nhãn đổi màu khi tích nhiệt — HIS chụp ảnh trước khi tiêm với lô đặc biệt.
- Báo cáo cold-chain hàng ngày + báo cáo "excursion" — lưu 5 năm theo TT 34/2018 (sửa đổi 2024).

## Tích hợp Hệ thống tiêm chủng quốc gia

- API **tiemchung.vn** (do Viettel/VNPT vận hành theo BYT):
  - Đăng ký BN → trả `national_immunization_id`.
  - Đẩy mũi tiêm (vaccine_code, lot, ngày, cơ sở).
  - Tra cứu sổ tiêm cá nhân.
- Mã danh mục vaccine theo bộ mã BYT (V01, V02… hoặc CVX HL7).
- Lỗi sync (mất mạng) → queue local, tự retry — KPI: < 2% fail trong tháng.

## Sai lầm thường gặp

1. Tiêm trước, sàng lọc ghi sau → không có giá trị pháp lý.
2. Nhập lot bằng tay → sai 3-5%, không truy vết được khi recall vaccine.
3. Không theo dõi 30 phút → bỏ sót phản vệ chậm.
4. Sổ tiêm "song song": HIS + tiemchung.vn → BN có 2 sổ khác nhau.
5. Không báo cáo AEFI lên Y tế dự phòng → vi phạm TT 24/2018.
6. Vaccine dịch vụ + TCMR dùng cùng tủ không phân ngăn → BHYT/PMK lẫn lộn.

## Output / Deliverables

- Module sàng lọc - tiêm - theo dõi end-to-end.
- API connector tiemchung.vn với queue retry.
- Module IoT cold-chain.
- Form AEFI điện tử + đẩy báo cáo Cục YTDP.
- API xuất sổ tiêm cá nhân ra VNeID Health (FHIR Immunization).

## UAT checklist

- [ ] Tiêm mà chưa sàng lọc → bị chặn.
- [ ] Quét barcode lọ vaccine → autofill lot/HSD.
- [ ] Hết 30 phút theo dõi mới in được giấy xác nhận.
- [ ] Sync tiemchung.vn ngay sau tiêm + retry khi fail.
- [ ] Báo cáo AEFI severity SEVERE → tự gửi email Cục YTDP.
- [ ] Cảnh báo cold-chain ngoài ngưỡng → SMS dược trực.
- [ ] Sổ tiêm cá nhân hiển thị trên VNeID Health (FHIR Immunization Bundle).

## KPI

| Chỉ số | Mục tiêu |
| --- | --- |
| % mũi tiêm sync sổ quốc gia trong 24h | ≥ 98% |
| % sàng lọc trước tiêm | 100% |
| AEFI severity SEVERE báo cáo trong 24h | 100% |
| Cold-chain trong ngưỡng | ≥ 99.5% |
| Tỉ lệ vaccine huỷ do hết hạn | ≤ 1% |
| Sai sót trùng mũi/thiếu mũi | 0 |

## Cơ sở pháp lý 2026

- **Luật Phòng, chống bệnh truyền nhiễm 03/2007/QH12**.
- **Nghị định 104/2016/NĐ-CP** + **NĐ 13/2024/NĐ-CP** sửa đổi — tiêm chủng.
- **Thông tư 38/2017/TT-BYT** (sửa đổi TT 10/2024) — danh mục bệnh truyền nhiễm và vaccine TCMR.
- **Thông tư 24/2018/TT-BYT** — báo cáo phản ứng sau tiêm chủng (AEFI).
- **Thông tư 34/2018/TT-BYT** (sửa đổi 2024) — bảo quản vaccine, cold-chain.
- **Quyết định 5946/QĐ-BYT/2018** — Hệ thống quản lý thông tin tiêm chủng quốc gia.
- **Quyết định 1796/QĐ-BYT/2024** — kế hoạch tiêm chủng mở rộng giai đoạn 2024-2030.
- **Quyết định 06/QĐ-TTg/2022** — Đề án 06, sổ tiêm trên VNeID.
