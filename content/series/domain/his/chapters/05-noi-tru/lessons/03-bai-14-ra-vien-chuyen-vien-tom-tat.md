---
id: 019f5a01-d000-7001-his0-000000000503
title: "Bài 14: Ra viện, chuyển viện & tóm tắt bệnh án"
slug: bai-14-ra-vien-chuyen-vien-tom-tat
description: >-
  Quy trình ra viện: chốt y lệnh, tổng kết HSBA, kết toán BHYT, in giấy ra
  viện, đơn ra viện, tóm tắt bệnh án (CCD), chuyển viện đúng tuyến.
duration_minutes: 50
is_free: true
featured_image: /storage/uploads/2026/05/his/bai-14-ra-vien-chuyen-vien-tom-tat-banner.webp
video_url: null
sort_order: 3
section_title: "Phần 5: Nội trú (IPD)"
course:
  id: 019f5a01-d000-7001-his0-000000000001
  title: "Hospital Information System (HIS) — Tổng quan & Triển khai"
  slug: his
---

![Ra viện, chuyển viện & tóm tắt HSBA](/storage/uploads/2026/05/his/bai-14-ra-vien-chuyen-vien-tom-tat-banner.webp)

## Mục tiêu

![Trao tóm tắt ra viện, ký số và lưu trữ EMR](/storage/uploads/2026/05/his/bai-14-ra-vien-chuyen-vien-tom-tat-workflow.webp)

Ra viện là **giai đoạn risk cao thứ 2** sau chuyển ICU — 20 % BN có "adverse event" trong 30 ngày sau ra viện (Forster et al, NEJM). Module này phải:

- Quản lý **các loại disposition** (về nhà, chuyển viện, AMA, tử vong).
- Sinh **discharge summary chuẩn CCD/CCDA + FHIR Bundle** đẩy lên HSSK.
- **Medication reconciliation** đầy đủ (home med vs in-hospital vs at-discharge).
- Đơn thuốc ngoại trú liên thông Đơn thuốc QG.
- Hẹn tái khám + chuyển tuyến đúng quy chế (TT 14/2014 + cập nhật).
- Chốt BHYT XML, hoá đơn điện tử, giấy ra viện.
- DRG mapping (case-mix bài 16) cho thanh toán.

## Bối cảnh

- 2024–2025: BHXH thí điểm thanh toán theo **DRG / case-mix** ở 33 BV — module ra viện phải xuất được mã DRG.
- HSSK quốc gia (QĐ 5454/QĐ-BYT) yêu cầu BV đẩy summary mỗi lần xuất viện.
- Re-admission 30 ngày là KPI BHXH theo dõi (nếu cao → BV bị giảm thanh toán).
- TT 18/2022 quy định HSBA phải đầy đủ chữ ký số trước lưu MRA.

> **Case study**: BV TW giảm 35 % re-admission CHF 30 ngày sau khi triển khai discharge education + tele-follow-up + heart failure clinic referral từ discharge summary.

## Các loại ra viện (Disposition)

| Loại | Mô tả | Chứng từ |
| --- | --- | --- |
| **Về nhà** (HOME) | điều trị xong / ổn định | giấy ra viện, đơn ngoại trú, hẹn tái khám |
| **Chuyển viện** (REFER_OUT) | tuyến trên/tuyến chuyên khoa | giấy chuyển tuyến TT 14 |
| **Chuyển về tuyến dưới** (REFER_DOWN) | hồi phục, tuyến dưới theo dõi | giấy chuyển + tóm tắt |
| **AMA** (LEFT_AMA) | tự nguyện, chống chỉ định BS | cam kết AMA ký số |
| **LWA** (LEFT_WITHOUT_AUTH) | bỏ trốn | báo công an, đóng encounter |
| **Tử vong** (DECEASED) | trong viện | giấy báo tử, GPB, đăng ký hộ tịch |
| **Chuyển khoa nội bộ** | đổi khoa trong cùng BV | encounter mới, không discharge BHYT |

## Luồng ra viện

```
[BS quyết định ra viện]
        │
        ▼
[Discharge order] (cho thuốc về, hẹn tái khám, tóm tắt)
        │
        ▼
[Medication reconciliation 3 cột]
   • Home meds (BN khai)
   • In-hospital meds (eMAR)
   • At-discharge meds (BS chốt)
        │
        ▼
[Discharge summary template]
   • Lý do nhập viện
   • Diễn biến
   • Chẩn đoán cuối (ICD chính + phụ)
   • Thủ thuật / phẫu thuật (ICD-PCS)
   • Kết quả CLS quan trọng
   • Thuốc ra viện
   • Hẹn tái khám / chuyển viện
   • Lời dặn / dấu hiệu cần quay lại
        │
        ▼
[Ký số BS điều trị + Trưởng khoa]
        │
        ▼
[Chốt phí: chốt y lệnh — close orders chưa làm xong]
        │
        ▼
[BHYT XML 2 (chi tiết DV) + XML 3 (thuốc/VTYT) + XML 4 (CDHA)]
        │
        ▼
[Hoá đơn điện tử (NĐ 70/2025)]
        │
        ▼
[BN trả phí phần đồng chi trả → giải phóng giường]
        │
        ▼
[Push discharge summary lên HSSK quốc gia (FHIR Bundle)]
        │
        ▼
[Bed CLEANING → EMPTY]
```

## State machine

```
[ADMITTED] → [DISCHARGE_ORDERED] → [PREPARING_DOCS] → [DOCS_SIGNED]
                                                            │
                                                            ▼
                                                    [BILLING_FINALIZED]
                                                            │
                                                            ▼
                                                    [DISCHARGED] → [CLOSED]
```

## Discharge Summary chuẩn CCD/CCDA

CCD (Continuity of Care Document) = HL7 CDA R2 template, gồm các section:

| Section LOINC | Tên |
| --- | --- |
| 11450-4 | Active Problems |
| 10160-0 | Medications |
| 48765-2 | Allergies |
| 47519-4 | Procedures performed |
| 30954-2 | Lab results |
| 18776-5 | Plan of care |
| 8648-8 | Hospital course |
| 42349-1 | Reason for visit |
| 51847-2 | Assessment + plan |

FHIR R4 tương đương: **Bundle** type `document`, có `Composition` resource ở đầu, các section trỏ đến `Condition`, `MedicationStatement`, `AllergyIntolerance`, `Procedure`, `Observation`...

## Quy tắc nghiệp vụ

1. **Discharge order ký số** mới khởi động flow.
2. **Medication reconciliation** bắt buộc — đối chiếu 3 cột; không cho close nếu thiếu.
3. **Tất cả y lệnh chưa thực hiện** phải close (DC) hoặc ghi rõ lý do gối sang ngoại trú.
4. **Đơn ra viện** liên thông Đơn thuốc QG (TT 22/2024).
5. **Chuyển tuyến BHYT** đúng theo TT 14/2014 (đang chuẩn bị thay) — chỉ chuyển khi vượt khả năng; cần giấy chuyển có chữ ký Trưởng khoa.
6. **AMA** in cam kết, ký BN/người nhà + 2 nhân chứng + BS.
7. **Tử vong** → báo Y vụ, GPB nếu cần khám nghiệm, giấy báo tử cấp BV (TT 24/2020).
8. **Re-admission < 24h** cho cùng chẩn đoán → cảnh báo, có thể nối tiếp encounter cũ.
9. **HSSK push** trong 24h sau ra viện (theo QĐ 5454).
10. **DRG grouping** chạy cuối cùng dựa trên ICD chính + phụ + thủ thuật + LOS + tuổi.

## Data model

```
DISCHARGE_ORDER
├── id, encounter_id, ordered_by, ordered_at
├── disposition (HOME | REFER_OUT | REFER_DOWN | AMA | LWA | DECEASED | INTERNAL)
├── target_facility_id (nếu refer)
├── follow_up_date, follow_up_clinic
└── medication_count

MEDICATION_RECONCILIATION
├── id, encounter_id, reviewed_by, reviewed_at
├── home_meds[] (drug, dose, frequency, source)
├── in_hospital_meds[] (drug, last_given_at)
├── discharge_meds[] (drug, dose, frequency, duration, refills)
├── changes_summary, patient_education_doc_id

DISCHARGE_SUMMARY
├── id, encounter_id, version
├── reason_for_admission, hospital_course
├── final_diagnosis_primary, final_diagnosis_secondary[]
├── procedures[]
├── significant_results, discharge_meds_text
├── follow_up_plan, warning_signs
├── signed_by_attending_at, signed_by_chief_at
├── pdf_id, ccd_xml_id, fhir_bundle_id
└── pushed_to_hssk_at

REFERRAL_OUT
├── id, encounter_id, target_facility_id
├── reason, urgency (ROUTINE | URGENT | EMERGENCY)
├── attached_docs[], transport_method
├── ack_received_at (nếu BV đích trả lời)
└── insurance_referral_doc_id

DEATH_CERTIFICATE
├── id, encounter_id, time_of_death
├── cause_immediate, cause_underlying[], contributing[]
├── manner (NATURAL | ACCIDENT | SUICIDE | HOMICIDE | UNDETERMINED)
├── autopsy_required, signed_by, registered_at
```

## Integration patterns

### 1) HL7 ADT^A03 (Discharge)

```
MSH|^~\&|HIS|BVH|EMR|EMR|20260514150000||ADT^A03|MSGD001|P|2.5
PID|||MPI001234||NGUYEN^VAN^AN
PV1|1|I|NOI-A^P305^B01||||BS_NOIA|||MED|||||DIS|HOME
DG1|1|J18.0|Viêm phổi||F
```

### 2) HL7 MDM^T02 (Medical Document Management)

Để gửi discharge summary CCD/CCDA tới EMR / HIE.

### 3) FHIR R4 Bundle

```http
POST /fhir
Content-Type: application/fhir+json

{
  "resourceType": "Bundle",
  "type": "document",
  "entry": [
    {"resource": {"resourceType": "Composition", "type": {"coding":[{"code":"34133-9","display":"Summarization of Episode Note"}]}, ...}},
    {"resource": {"resourceType": "Patient", ...}},
    {"resource": {"resourceType": "Encounter", "class":{"code":"IMP"}, "period":{"start":"...","end":"..."}}},
    {"resource": {"resourceType": "Condition", ...}},
    {"resource": {"resourceType": "MedicationStatement", ...}}
  ]
}
```

### 4) HSSK quốc gia

Đẩy bundle qua API gateway BYT; nhận `health_record_id`.

### 5) Đơn thuốc QG

Đơn ngoại trú từ ra viện liên thông Đơn thuốc QG → mã đơn (kèm QR) cho BN đi nhà thuốc ngoài.

### 6) eClaim BHYT

XML 1-15 đầy đủ theo QĐ 130/QĐ-BYT 2023, đẩy lên cổng giám định BHXH realtime.

### 7) Đăng ký hộ tịch điện tử (cho tử vong)

Sau khi cấp giấy báo tử → liên thông CSDL Hộ tịch điện tử (Bộ Tư pháp) theo NĐ 87/2020 + NĐ 158/2005 sửa đổi.

## Edge case

- **Ra viện cuối tuần / ngoài giờ**: BS Trưởng khoa có thể ký từ xa (USB token + VPN).
- **BN không có ai đón** (NCT cô đơn) → liên hệ Bảo trợ XH.
- **Trẻ sinh ra sống → ra viện cùng mẹ** → 2 discharge summary (mẹ + bé), 2 health_record_id riêng.
- **BN tử vong nhưng chưa rõ nguyên nhân** → autopsy_required = true, hồ sơ chờ kết quả GPB; giấy báo tử **chưa final**.
- **BN AMA giữa đêm**: ĐD trực ký nhân chứng nếu không gọi được BS.
- **BN nước ngoài**: discharge summary có bản tiếng Anh; đẩy bảo hiểm quốc tế (bài 36).
- **Thuốc gây nghiện ra viện**: bị giới hạn 7 ngày max (TT 22/2024); cần cam kết.
- **Re-admission cùng ngày** (< 24h cho lý do mới): mở encounter mới (không nối).
- **Không thể chốt BHYT** (cổng BHXH down): lưu pending, retry job; cảnh báo nếu > 24h.

## Sai lầm thường gặp

- Discharge summary thiếu thuốc về → BN không biết uống gì.
- Med reconciliation chỉ ghi tên thuốc, thiếu liều/đường → sai dùng.
- Đơn ngoại trú không liên thông QG → BN ra nhà thuốc bị từ chối.
- Chuyển viện không ack → BV đích không biết → BN tự đến.
- BHYT XML thiếu 1 trong 15 file → toàn bộ batch bị reject.
- HSSK push fail không retry → BV bị penalty từ BYT.
- Tử vong không cấp giấy báo tử trong 24h → người nhà gặp khó với hộ tịch.
- DRG mapping sai → mất doanh thu BHYT.

## Output / Chứng từ

| Chứng từ | Khi nào | Pháp lý |
| --- | --- | --- |
| Discharge summary (PDF/A) | sau ký 2 BS | TT 18/2022, TT 46/2018 |
| CCD/CCDA hoặc FHIR Bundle | gửi HSSK | QĐ 5454, QĐ 130 |
| Đơn thuốc ra viện | trước ra | TT 22/2024 |
| Giấy ra viện | mỗi BN | TT 56/2017 + sửa |
| Giấy chuyển tuyến BHYT | nếu refer | TT 14/2014 |
| Cam kết AMA | nếu AMA | TT 31/2021 |
| Giấy báo tử + thông tin hộ tịch | DECEASED | TT 24/2020, NĐ 87/2020 |
| Hoá đơn điện tử | sau billing | NĐ 70/2025 |
| XML BHYT 1-15 | EOD/realtime | QĐ 130/QĐ-BYT 2023 |

## Checklist UAT

- [ ] Discharge order ký số → khởi flow.
- [ ] Med reconciliation 3 cột bắt buộc.
- [ ] Tất cả order PENDING phải close trước billing.
- [ ] Discharge summary template render đầy đủ section.
- [ ] Ký số BS điều trị + Trưởng khoa.
- [ ] FHIR Bundle valid theo IPS / VN profile.
- [ ] HSSK push thành công, nhận health_record_id.
- [ ] Đơn ngoại trú liên thông Đơn thuốc QG.
- [ ] Chuyển tuyến: giấy có chữ ký Trưởng khoa.
- [ ] AMA cam kết PDF ký 4 bên.
- [ ] Tử vong: giấy báo tử trong 24h, push hộ tịch.
- [ ] BHYT XML 1-15 đầy đủ pass giám định.
- [ ] DRG mapping output mã đúng.
- [ ] HĐĐT phát hành (NĐ 70/2025).
- [ ] Bed CLEANING → EMPTY trong 60 phút.
- [ ] Re-admission 30 ngày dashboard cập nhật.

## KPI vận hành

| KPI | Mục tiêu |
| --- | --- |
| Discharge summary trong 24h | > 95 % |
| HSSK push success | > 99 % |
| Đơn thuốc QG liên thông | > 99 % |
| Med reconciliation compliance | 100 % |
| Re-admission 30 ngày | < 8 % |
| Avg time discharge order → physically left | < 4 giờ |
| BHYT XML pass first time | > 95 % |
| Death certificate in 24h | 100 % |
| DRG coding accuracy | > 95 % (audit ngẫu nhiên) |

## Cơ sở pháp lý áp dụng (2026)

- Luật KCB **15/2023/QH15** — Đ.66, hồ sơ, chuyển tuyến.
- Luật BHYT **51/2024/QH15** + NĐ **75/2023** — thanh toán.
- Luật GDĐT **20/2023/QH15** — chữ ký số.
- TT **14/2014/TT-BYT** — chuyển tuyến (đang sửa).
- TT **18/2022/TT-BYT** — quản lý HSBA.
- TT **22/2024/TT-BYT** — kê đơn (giới hạn opioid 7 ngày).
- TT **24/2020/TT-BYT** — giấy báo tử BV.
- TT **46/2018/TT-BYT** — bệnh án điện tử.
- TT **39/2024/TT-BYT** — giá DV BHYT.
- TT **56/2017/TT-BYT** — giấy ra viện (đang sửa).
- QĐ **130/QĐ-BYT 2023** — XML BHYT 1-15.
- QĐ **5454/QĐ-BYT** — HSSK quốc gia.
- NĐ **70/2025/NĐ-CP** sửa **123/2020** — HĐĐT.
- NĐ **87/2020/NĐ-CP** — CSDL Hộ tịch điện tử.

> **Bài tiếp theo:** Order Management — quản lý vòng đời chỉ định CLS xuyên các phân hệ.
