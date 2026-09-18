---
id: 019f5a01-d000-7001-his0-000000001302
title: "Bài 34: BHYT — giám định, chuẩn dữ liệu QĐ 130/QĐ-BYT 2023"
slug: bai-34-bhyt-giam-dinh-xml-4210
description: >-
  Cổng giám định BHXH, chuẩn dữ liệu đầu ra HIS theo **QĐ 130/QĐ-BYT 2023**
  (thay QĐ 4210/QĐ-BHXH), Luật BHYT sửa đổi 51/2024, giám định tự động, xuất
  toán & quy trình BV phản hồi.
duration_minutes: 60
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-34-bhyt-giam-dinh-xml-4210-banner.webp
video_url: null
sort_order: 2
section_title: "Phần 13: Viện phí, BHYT & Hóa đơn điện tử"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![BHYT — giám định & XML 4210](/storage/uploads/2026/05/his/bai-34-bhyt-giam-dinh-xml-4210-banner.webp)

## Cổng tiếp nhận BHXH

![Giám định viên BHYT soi từng dòng phí trên claim](/storage/uploads/2026/05/his/bai-34-bhyt-giam-dinh-xml-4210-workflow.webp)


## Mục tiêu bài học

- Hiểu chuẩn dữ liệu giám định BHYT theo **Quyết định 130/QĐ-BYT/2023** (thay Bộ XML 4210 cũ).
- Triển khai luồng đẩy claim: phát sinh → đẩy hàng ngày → tổng hợp tháng → hậu kiểm.
- Phân tích các nguyên nhân **xuất toán** thường gặp và cách phòng ngừa từ HIS.
- Triển khai cơ chế **giám định trước** (pre-check) tự động trong HIS để giảm xuất toán.
- Đối soát kết quả giám định với BHXH qua Cổng tiếp nhận.

## Bối cảnh: BHYT là dòng tiền chính của BV công lập

- Trung bình 70-85% doanh thu BV công lập đến từ BHYT.
- Mỗi đồng bị xuất toán = mất doanh thu thật, trong khi chi phí đã phát sinh.
- BV tuyến tỉnh điển hình: 800-1500 tỉ doanh thu BHYT/năm; xuất toán 5% = 40-75 tỉ.
- BHXH áp dụng thanh tra dữ liệu lớn — phát hiện sai pattern (kê khống dịch vụ, trùng dịch vụ trong 24h, kê thuốc không phù hợp ICD) tự động.

## QĐ 130/QĐ-BYT 2023 — chuẩn dữ liệu mới

Bộ tài liệu gồm các bảng:

| Bảng | Nội dung | Tần suất gửi |
| --- | --- | --- |
| XML 1 | Thông tin đợt KCB (encounter) | mỗi lần xuất viện |
| XML 2 | Chi tiết thuốc | mỗi đợt |
| XML 3 | Chi tiết DV kỹ thuật, PT/TT | mỗi đợt |
| XML 4 | Chi tiết CLS | mỗi đợt |
| XML 5 | Chỉ số diễn biến lâm sàng (huyết áp, mạch...) | đợt nội trú |
| XML 6 | Hồ sơ bệnh án nội trú | đợt nội trú |
| XML 7 | Phiếu phẫu thuật, thủ thuật | đợt có PT/TT |
| XML 8 | Hồ sơ tóm tắt nội trú/ngoại trú | mọi đợt |
| XML 9 | Đơn thuốc ngoại trú | mọi đơn |
| XML 13 | Giấy chuyển tuyến | khi chuyển |
| XML 14 | Giấy hẹn khám lại | khi hẹn |
| XML 15 | Giấy ra viện | khi xuất viện |

Luồng:

1. HIS sinh XML đợt → ký số HĐ y tế → đẩy lên **giamdinhbhyt.baohiemxahoi.gov.vn** (Cổng tiếp nhận).
2. BHXH chấm điểm tự động + hậu kiểm thủ công.
3. Kết quả về dạng XML phản hồi (chấp nhận/yêu cầu sửa/từ chối/xuất toán).
4. HIS tiếp nhận, hiển thị cho BV xử lý kháng nghị.

## Pre-check tự động trong HIS

Để giảm xuất toán, HIS phải kiểm tra **trước khi đẩy** các rule:

| Rule | Ví dụ |
| --- | --- |
| Trùng dịch vụ trong N giờ | CT sọ 2 lần/24h → cảnh báo |
| Thuốc — chẩn đoán không phù hợp | kháng sinh kê đơn thuần do "đau đầu" → cảnh báo |
| Vượt định mức | xét nghiệm > số lần khuyến cáo theo phác đồ |
| Sai mã giá | dùng giá BHYT cho BN không thẻ |
| Mức hưởng sai đối tượng | trẻ < 6 tuổi mà tính 80% |
| Thiếu chữ ký | không có chữ ký số BS chỉ định |
| Thuốc ngoài danh mục thầu | tự ý thay thế biệt dược |
| Trùng tỉnh ngày | 1 BN có 2 đợt KCB cùng ngày tại 2 BV |

Cảnh báo trước cho BS lâm sàng + chặn cứng các rule có severity cao.

## Data model claim

```sql
CREATE TABLE bhyt_claim (
  claim_id      uuid PRIMARY KEY,
  encounter_id  uuid REFERENCES encounter,
  bhxh_id       varchar(15),
  hospital_code varchar(10),
  total_amount  numeric,
  bhyt_amount   numeric,
  patient_amount numeric,
  status        varchar(20),    -- DRAFT/SUBMITTED/ACCEPTED/REJECTED/PARTIAL/SETTLED
  submitted_at  timestamptz,
  resolved_at   timestamptz,
  rejection_codes text[]        -- mã lỗi BHXH trả về
);

CREATE TABLE bhyt_audit_finding (
  finding_id    uuid PRIMARY KEY,
  claim_id      uuid REFERENCES bhyt_claim,
  finding_code  varchar(20),
  finding_text  text,
  amount_disallowed numeric,
  bv_response   text,
  resolution    varchar(20)     -- ACCEPTED/APPEALED/UPHELD
);
```

## Quy trình kháng nghị xuất toán

1. Nhận kết quả giám định, list các finding.
2. Phân loại: lỗi nghiệp vụ (sửa được) vs lỗi hệ thống (kháng nghị).
3. BV chuẩn bị hồ sơ kháng nghị (chứng cứ EMR, ảnh chụp, biên bản hội chẩn).
4. Gửi qua Cổng — BHXH xử lý trong 30-60 ngày.
5. Lưu kết quả vào HIS để rút kinh nghiệm.

## Sai lầm thường gặp

1. Đẩy XML 1 lần/tháng vào ngày cuối → BHXH bị quá tải, lỗi tự sinh nhiều, không kịp sửa.
2. Không có pre-check, đẩy tất tần tật → tỉ lệ xuất toán cao.
3. Sửa hồ sơ sau khi đẩy XML mà không tracking → XML 2 đẩy lại không khớp.
4. Bỏ qua kháng nghị vì "tiền nhỏ" → tích luỹ vài tỉ/năm.
5. Không cập nhật bộ mã/giá khi BYT/BHXH ra TT mới → toàn bộ tháng bị từ chối.
6. Đẩy XML không có chữ ký số HĐ y tế → không hợp lệ.

## Output / Deliverables

- Module sinh XML 1-15 đúng schema QĐ 130.
- Pre-check engine với rule có thể cấu hình.
- Connector Cổng tiếp nhận BHYT (REST/SOAP).
- Dashboard giám định: % chấp nhận, top lỗi, top BS gây xuất toán.
- Module kháng nghị có template đính kèm chứng cứ EMR.

## UAT checklist

- [ ] BN xuất viện → XML 1+8+15 đẩy trong 24h.
- [ ] CT sọ 2 lần/24h → pre-check chặn trước khi BS chỉ định lần 2.
- [ ] BHXH trả về mã lỗi → finding hiện trên dashboard, gán BS phụ trách.
- [ ] Kháng nghị có thể đính kèm ảnh chụp EMR + biên bản.
- [ ] Báo cáo % xuất toán theo khoa, theo BS, theo lý do.

## KPI

| Chỉ số | Mục tiêu |
| --- | --- |
| % đợt KCB đẩy XML trong 24h | ≥ 95% |
| % claim được BHXH chấp nhận lần đầu | ≥ 95% |
| Tỉ lệ xuất toán | ≤ 3% |
| % kháng nghị thành công | ≥ 60% |
| Thời gian từ xuất viện → tiền BHXH về | ≤ 60 ngày |

## Cơ sở pháp lý 2026

- **Luật BHYT 25/2008** (sửa đổi 51/2024/QH15, hiệu lực 01/07/2025).
- **Luật KCB 15/2023/QH15** + **NĐ 96/2023** + **NĐ 70/2025**.
- **Nghị định 146/2018/NĐ-CP** (sửa đổi NĐ 75/2023, NĐ 02/2025) — hướng dẫn BHYT.
- **Quyết định 130/QĐ-BYT/2023** — chuẩn dữ liệu giám định BHYT.
- **Quyết định 4210/QĐ-BYT/2017** — bộ XML cũ (đã chuyển QĐ 130).
- **Thông tư 22/2023/TT-BYT** + sửa đổi — giá KCB BHYT.
- **Quyết định 1399/QĐ-BHXH/2014** + cập nhật 2024 — quy trình giám định.
- **Quyết định 6556/QĐ-BHXH/2018** + cập nhật 2024 — Cổng tiếp nhận điện tử.
