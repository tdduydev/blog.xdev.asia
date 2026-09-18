---
id: 2a9fe81a-2cd2-44b3-8dfc-c394d58ff58b
title: 'FHIR resources & extensions'
slug: fhir-resources-and-extensions
description: 'FHIR R5 cung cấp một bộ resources được chuẩn hóa để mô tả dữ liệu y tế. Mỗi resource là một đơn vị thông tin có thể được trao đổi độc lập. Các resources này được tổ chức thành các nhóm chính:'
duration_minutes: 15
is_free: true
video_url: null
sort_order: 2
section_title: 'Phần 11: Kiến trúc & Thiết kế (Hands-on)'
course:
  id: 019e3a00-0000-7001-e001-hl7r5000001
  title: 'HL7 FHIR R5 Chuyên Sâu — Reference & Thực hành'
  slug: hl7-fhir-r5-chuyen-sau
---
![FHIR resources &#x26; extensions](/storage/uploads/hl7-r5/handson/image_1_1_.webp)

*FHIR resources &#x26; extensions*

FHIR R5 cung cấp một bộ resources được chuẩn hóa để mô tả dữ liệu y tế. Mỗi resource là một đơn vị thông tin có thể được trao đổi độc lập. Các resources này được tổ chức thành các nhóm chính:

1. **Nhóm hành chính** (dữ liệu về con người và tổ chức):
   * **Patient**: Thông tin người bệnh
   * **Practitioner**: Thông tin nhân viên y tế
   * **Organization**: Thông tin về bệnh viện, phòng khám
   * **Location**: Địa điểm cung cấp dịch vụ y tế
2. **Nhóm lâm sàng** (dữ liệu y tế):
   * **Observation**: Kết quả xét nghiệm, sinh hiệu
   * **Condition**: Bệnh, chẩn đoán
   * **Procedure**: Thủ thuật, phẫu thuật
   * **MedicationRequest**: Đơn thuốc
   * **AllergyIntolerance**: Thông tin về dị ứng
3. **Nhóm quy trình** (luồng công việc):
   * **Encounter**: Lần khám bệnh
   * **Appointment**: Lịch hẹn
   * **ServiceRequest**: Yêu cầu dịch vụ
   * **CarePlan**: Kế hoạch chăm sóc

### Cách resources liên kết với nhau

Resources trong FHIR liên kết với nhau tạo thành một mạng lưới thông tin:

```
Patient ←→ Encounter ←→ Observation
   ↑          ↑             ↑
   |          |             |
   ↓          ↓             ↓
Practitioner ←→ ServiceRequest ←→ DiagnosticReport
```

Ví dụ: Khi bệnh nhân (Patient) đến khám (Encounter), bác sĩ (Practitioner) yêu cầu xét nghiệm máu (ServiceRequest), kết quả được lưu thành Observation và tổng hợp trong DiagnosticReport.

### Extensions - Cách sử dụng chi tiết

Extensions có hai loại:

1. **Simple Extensions**: Chỉ chứa một giá trị đơn
2. **Complex Extensions**: Chứa nhiều giá trị con (nested extensions)

Ví dụ về Complex Extension - thông tin về người giám hộ bệnh nhân:

```json
{
  "resourceType": "Patient",
  "extension": [
    {
      "url": "http://hospital.vn/fhir/nguoi-giam-ho",
      "extension": [
        {
          "url": "ho-ten",
          "valueString": "Nguyễn Văn B"
        },
        {
          "url": "moi-quan-he",
          "valueString": "Cha"
        },
        {
          "url": "so-dien-thoai",
          "valueString": "0901234567"
        }
      ]
    }
  ],
  "name": [
    {
      "family": "Nguyễn",
      "given": ["Văn A"]
    }
  ]
}
```

### Profiles - Tùy chỉnh resources theo nhu cầu

Profiles là cách để điều chỉnh resources theo nhu cầu cụ thể của bệnh viện:

1. **Giới hạn các trường**: Quy định trường nào bắt buộc
2. **Thêm extensions**: Đưa các extensions thành phần chuẩn
3. **Giới hạn giá trị**: Quy định danh sách giá trị được phép

Ví dụ: Profile "BenhNhanNoiTru" có thể quy định:

* Bắt buộc phải có số CMND/CCCD
* Phải có thông tin bảo hiểm y tế
* Cần có thông tin người thân

### Ví dụ thực tế: Hồ sơ sức khỏe điện tử

Một hồ sơ bệnh án trong FHIR có thể gồm:

1. **Patient**: Thông tin cá nhân bệnh nhân
2. **Encounter**: Thông tin về đợt điều trị
3. **Observation**: Các kết quả xét nghiệm
4. **Condition**: Các chẩn đoán
5. **MedicationRequest**: Đơn thuốc
6. **Procedure**: Các thủ thuật đã thực hiện
7. **CarePlan**: Kế hoạch điều trị

### Cách triển khai FHIR trong dự án

1. **Phân tích nghiệp vụ**: Xác định quy trình làm việc của bệnh viện
2. **Chọn resources phù hợp**: Xác định các resources cần dùng
3. **Tạo profiles**: Điều chỉnh resources theo nhu cầu
4. **Tạo extensions**: Thêm các thông tin đặc thù
5. **Xây dựng API**: Triển khai server FHIR
6. **Kết nối với HIS**: Tích hợp với hệ thống thông tin bệnh viện

### Ưu điểm của FHIR R5 so với các phiên bản trước

1. **Resources mới**: Nhiều resources đã được bổ sung
2. **Cải thiện workfow**: Quản lý quy trình tốt hơn
3. **Chuẩn hóa extensions**: Nhiều extensions phổ biến đã trở thành chuẩn
4. **Hỗ trợ AI/ML**: Tích hợp tốt hơn với các hệ thống trí tuệ nhân tạo
