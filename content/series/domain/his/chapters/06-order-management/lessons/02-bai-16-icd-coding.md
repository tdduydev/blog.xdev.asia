---
id: 019f5a01-d000-7001-his0-000000000602
title: "Bài 16: ICD-10/ICD-11, mã hoá bệnh tật & báo cáo dịch tễ"
slug: bai-16-icd-coding
description: >-
  Cách HIS quản lý bộ mã ICD (chính, phụ, biến chứng), DRG, gắn mã đúng để
  BHYT chấp nhận và phục vụ báo cáo dịch tễ Bộ Y tế / WHO.
duration_minutes: 45
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-16-icd-coding-banner.webp
video_url: null
sort_order: 2
section_title: "Phần 6: Order Management & ICD coding"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![ICD-10/11 coding & vai trò clinical coder](/storage/uploads/2026/05/his/bai-16-icd-coding-banner.webp)

## Vai trò của ICD

![Coder phân loại chẩn đoán theo cây mã ICD](/storage/uploads/2026/05/his/bai-16-icd-coding-workflow.webp)


## Mục tiêu bài học

- Phân biệt ICD-10 (đang dùng tại VN) và ICD-11 (lộ trình WHO/Bộ Y tế).
- Hiểu vai trò chẩn đoán **chính / phụ / biến chứng / kèm theo** và cách BHYT chấm điểm.
- Triển khai **DRG (Diagnosis Related Groups)** ở Việt Nam: vì sao chậm, ai đang thí điểm.
- Thiết kế **clinical coder workflow** trong HIS: từ y lệnh ban đầu → chốt mã trước khi xuất viện.
- Xử lý các tình huống "mã không khớp dịch vụ" làm BHYT xuất toán.

## Vai trò ICD trong HIS

ICD là "ngôn ngữ chung" để:

- Báo cáo **dịch tễ** Bộ Y tế (Thông tư 37/2014/TT-BYT về báo cáo bệnh truyền nhiễm, sửa đổi 2024).
- Thanh toán **BHYT** (theo Quyết định 130/QĐ-BHXH/2024).
- So sánh **chất lượng** giữa BV (case-mix index, mortality theo nhóm bệnh).
- Trao đổi **dữ liệu xuyên BV** trong tương lai theo HL7 FHIR.

Một encounter không có chẩn đoán đúng cấu trúc = một hồ sơ "rỗng" về mặt thống kê.

## Cấu trúc chẩn đoán theo BHYT

| Loại | Ý nghĩa | Quy tắc |
| --- | --- | --- |
| Chẩn đoán chính (principal Dx) | Lý do nhập viện chính, sau khi đã xác định | 1 và chỉ 1 |
| Chẩn đoán phụ (secondary) | Bệnh kèm có ý nghĩa điều trị | 0..n |
| Biến chứng | Phát sinh trong điều trị | 0..n, gắn cờ "complication" |
| Bệnh kèm theo | Có sẵn, ảnh hưởng điều trị | 0..n |
| Chẩn đoán vào viện | Ban đầu, có thể khác Dx chính | bắt buộc lưu cho audit |

BHYT ưu tiên Dx chính khi tính phí gói; Dx phụ ảnh hưởng case-mix khi áp dụng DRG.

## Workflow clinical coder trong HIS

```
[Tiếp nhận]            [BS khám/điều trị]               [Coder/Phòng KHTH]
   |                          |                                  |
   v                          v                                  v
Working Dx        Update Dx mỗi ngày            Audit Dx trước khi
(Z00 / R-codes)    + Dx phụ + biến chứng         encounter "CLOSED"
   |                          |                                  |
   +--------- HIS ----------> Encounter.diagnoses[] <-----------+
                                                                 |
                                                  Khoá Dx ⇒ gửi BHXH XML
```

- Tại tiếp nhận: tạm dùng nhóm **R/Z code** (triệu chứng, lý do gặp BS).
- Trong nội trú: BS update mã chẩn đoán mỗi ngày trên y bạ.
- Trước xuất viện: **clinical coder** rà lại bệnh án, chốt mã chính + mã phụ; HIS phải có UI riêng cho coder, không cho BS sửa lại sau khi đã chốt.

## Thiết kế dữ liệu

```sql
CREATE TABLE encounter_diagnoses (
  id            BIGSERIAL PRIMARY KEY,
  encounter_id  UUID NOT NULL,
  icd_version   VARCHAR(8) NOT NULL,         -- 'ICD-10' | 'ICD-11'
  code          VARCHAR(16) NOT NULL,        -- 'J18.9'
  rank          VARCHAR(16) NOT NULL,        -- PRINCIPAL|SECONDARY|COMPLICATION|COMORBID|ADMIT
  is_present_on_admission BOOLEAN,           -- POA flag
  certainty     VARCHAR(16),                 -- WORKING|CONFIRMED|RULE_OUT
  noted_by      UUID,
  noted_at      TIMESTAMPTZ DEFAULT now(),
  locked_by_coder BOOLEAN DEFAULT false,
  locked_at     TIMESTAMPTZ
);

CREATE INDEX ix_dx_enc ON encounter_diagnoses(encounter_id);
CREATE INDEX ix_dx_code ON encounter_diagnoses(code);
```

## DRG ở Việt Nam — bức tranh 2026

- BHXH/Bộ Y tế thí điểm DRG từ 2018 tại 6 BV (Chợ Rẫy, ĐH Y Dược TP.HCM, BV Bạch Mai, BV TƯ Huế, BV Việt Đức, BV Nhi TƯ).
- Mã hoá theo **AR-DRG (Australian Refined DRG)** với bộ "VN-DRG" hiệu chỉnh.
- 2024-2025: mở rộng thêm ~30 BV hạng đặc biệt và hạng I.
- HIS chuẩn bị DRG: phải lưu **POA flag**, phân biệt **biến chứng vs bệnh kèm**, và xuất XML đúng schema VN-DRG.

## ICD-11 — lộ trình

- WHO chính thức ICD-11 từ 2022, có **MMS, ICHI, foundation**.
- Bộ Y tế chưa có thông tư chính thức bắt buộc, nhưng các BV mới nên thiết kế HIS **đa phiên bản** (`icd_version` trong bảng) để chuyển đổi không phải đập đi xây lại.
- Ánh xạ ICD-10 ↔ ICD-11 không phải 1-1; cần lưu cả 2 cho giai đoạn chuyển tiếp.

## 10 quy tắc nghiệp vụ ICD trong HIS

1. **Bắt buộc Dx chính trước khi đóng encounter** — không cho close nếu thiếu.
2. **Một Dx chính duy nhất** — DB ràng buộc unique `(encounter_id, rank='PRINCIPAL')`.
3. **POA flag bắt buộc** cho nội trú — phục vụ DRG và chỉ số chất lượng.
4. **Mã đến mức cụ thể nhất** — chặn nhập "J18" mà không có ".9" nếu code parent có con (cảnh báo coder).
5. **Khoá sau khi coder chốt** — BS muốn sửa phải request, coder approve, lưu lý do.
6. **Audit log đầy đủ** — ai thêm/sửa/xoá mã nào lúc nào.
7. **Đồng bộ với BHXH XML** — `MA_BENH`, `MA_BENHKEM` đúng định dạng QĐ 4750/QĐ-BYT (sửa đổi 2024).
8. **Liên kết Dx với order** — mỗi order phải có `reason_dx`; nếu không có Dx tương ứng trong encounter, BHYT có thể từ chối.
9. **Versioning danh mục ICD** — có ngày hiệu lực, không xoá mã cũ.
10. **Hỗ trợ tìm kiếm song ngữ** Việt/Anh/mã — coder gõ "viêm phổi" hoặc "pneumonia" hoặc "J18".

## Sai lầm phổ biến

- Cho BS chọn Dx tự do bằng text → coder không tra cứu được, BHYT từ chối.
- Quên `is_present_on_admission` → mọi biến chứng coi như "có sẵn" → bóp méo thống kê chất lượng.
- Dùng mã quá general (R50.9 sốt không xác định) cho ca đã ra viện — coder phải refine.
- Không versioning danh mục — danh mục BHYT đổi T7 hằng năm, mã cũ vẫn cần cho audit hồi tố.
- Lock quá sớm (ngay khi BS điền) — coder không sửa được.

## Tích hợp BHYT XML (QĐ 4750/QĐ-BYT)

Trong file XML 1 (TONG_HOP) và XML 4 (DIEN_BIEN_BENH) gửi BHXH:

- `MA_BENH` = Dx chính (ICD-10).
- `MA_BENHKEM` = chuỗi mã phụ phân tách bằng dấu `;` (tối đa N theo schema 2024).
- `MA_LOAIKCB` phải khớp với loại điều trị (ngoại trú/nội trú).
- `LY_DO_VVIEN` phải khớp Dx khi nhập viện.

HIS phải tự sinh các trường này từ `encounter_diagnoses`, không cho user gõ tay.

## Output bài học

- Phân biệt rõ 5 loại Dx và quy tắc rank.
- Vẽ workflow coder, biết khi nào lock.
- Đọc được phần Dx trong XML BHYT.
- Hiểu vì sao "mã không khớp dịch vụ" gây xuất toán.

## Checklist UAT

- [ ] Không cho close encounter thiếu Dx chính.
- [ ] Không cho 2 Dx chính.
- [ ] POA flag bắt buộc cho nội trú.
- [ ] Coder chốt → BS không sửa được trừ khi request.
- [ ] Tìm kiếm theo từ khoá tiếng Việt + Anh + mã.
- [ ] Xuất XML BHYT đúng định dạng QĐ 4750 sửa đổi 2024.
- [ ] Báo cáo case-mix theo Dx chính chạy đúng.

## KPI

| KPI | Ngưỡng |
| --- | --- |
| % encounter thiếu Dx chính lúc close | 0% (cứng) |
| % Dx dùng mã ".9" (unspecified) | < 10% |
| Sai lệch giữa Dx HIS và Dx XML BHYT | 0% |
| Thời gian coder chốt sau xuất viện | ≤ 48h |
| % bị BHYT trả lại do sai mã | < 1% |

## Cơ sở pháp lý 2026

- **Quyết định 4750/QĐ-BYT** và các sửa đổi 2023-2024 — chuẩn dữ liệu đầu ra HIS gửi BHXH (XML 1-15).
- **Quyết định 130/QĐ-BHXH/2024** (hiệu lực 01/01/2025) — chuẩn dữ liệu giám định.
- **Thông tư 37/2014/TT-BYT** và các sửa đổi — báo cáo bệnh truyền nhiễm theo nhóm ICD.
- **WHO ICD-11** — tham chiếu, chưa bắt buộc tại VN nhưng nên hỗ trợ.

## Bài tiếp

Phần 7 sẽ vào sâu LIS — luồng xét nghiệm end-to-end từ lấy mẫu đến critical value.
