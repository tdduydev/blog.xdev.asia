---
id: b40353f5-82e7-4b48-ba5e-63a7ddb90b61
title: 'Lịch sử FHIR đến R5'
slug: lich-su-fhir-den-r5
description: 'FHIR (Fast Healthcare Interoperability Resources) đã trải qua một hành trình phát triển đáng kinh ngạc kể từ khi ra đời. Bài viết này sẽ đưa bạn qua quá trình tiến hóa của FHIR từ những ngày đầu cho đến phiên bản R5…'
duration_minutes: 15
is_free: true
video_url: null
sort_order: 3
section_title: 'Phần 1: Giới thiệu HL7 R5'
course:
  id: 019e3a00-0000-7001-e001-hl7r5000001
  title: 'HL7 FHIR R5 Chuyên Sâu — Reference & Thực hành'
  slug: hl7-fhir-r5-chuyen-sau
---
## Lịch sử phát triển FHIR đến R5: Hành trình của một tiêu chuẩn đột phá

![HL7 FHIR R5](/storage/uploads/hl7-r5/root/image_2_.webp)

FHIR (Fast Healthcare Interoperability Resources) đã trải qua một hành trình phát triển đáng kinh ngạc kể từ khi ra đời. Bài viết này sẽ đưa bạn qua quá trình tiến hóa của FHIR từ những ngày đầu cho đến phiên bản R5 hiện tại, đồng thời nhìn về tương lai của tiêu chuẩn này.

### Từ DSTU1 đến R5

#### DSTU1 (2014) - Bước đầu tiên

Phiên bản DSTU1 (Draft Standard for Trial Use 1) được phát hành vào tháng 2/2014, đánh dấu sự ra mắt chính thức của FHIR. Đây là phiên bản thử nghiệm đầu tiên với những đặc điểm:

* 55 tài nguyên cơ bản
* Giới thiệu cơ chế RESTful API
* Tập trung vào các tình huống sử dụng đơn giản
* Thiết lập các nguyên tắc cốt lõi về Resources và Extensions

Mặc dù còn sơ khai, DSTU1 đã tạo nên một làn sóng phấn khích trong cộng đồng y tế, với nhiều tổ chức bắt đầu thử nghiệm triển khai.

#### DSTU2 (2015) - Mở rộng và hoàn thiện

DSTU2 được phát hành vào tháng 10/2015, mang đến nhiều cải tiến quan trọng:

* Tăng lên 92 tài nguyên
* Thêm khung tìm kiếm và truy vấn toàn diện hơn
* Cải thiện hỗ trợ về các tình huống sử dụng lâm sàng
* Giới thiệu cơ chế profiling chặt chẽ hơn
* Thêm hỗ trợ cho các tình huống tương tác phức tạp
* Phát triển khung bảo mật và ủy quyền

DSTU2 đánh dấu bước tiến lớn về độ trưởng thành và được sử dụng rộng rãi hơn trong triển khai thực tế.

#### STU3 (2017) - Bước tiến lớn về sự ổn định

STU3 (Standard for Trial Use 3) được phát hành vào tháng 3/2017, với nhiều cải tiến đáng kể:

* 116 tài nguyên, mở rộng phạm vi ứng dụng
* Cải thiện đáng kể về tính nhất quán giữa các tài nguyên
* Hỗ trợ mạnh mẽ hơn cho các quy trình lâm sàng
* Cải thiện cơ chế trao đổi dữ liệu giữa các hệ thống
* Phát triển cơ sở hạ tầng cho các tổ chức triển khai
* Thêm hỗ trợ cho dữ liệu nghiên cứu và y tế công cộng

STU3 được sử dụng rộng rãi và là phiên bản mà nhiều tổ chức vẫn đang sử dụng ngày nay.

#### R4 (2018) - Đầu tiên với các phần Normative

R4 phát hành vào tháng 12/2018, đánh dấu một cột mốc quan trọng với nội dung Normative (chuẩn hóa) đầu tiên:

* 145 tài nguyên
* Các phần cốt lõi đầu tiên đạt trạng thái Normative:
  * RESTful API
  * Các định dạng dữ liệu JSON và XML
  * DataTypes
  * Một số tài nguyên như Patient, Observation
* Cải thiện lớn về tính nhất quán và chất lượng
* Hỗ trợ mạnh mẽ hơn cho tương tác lâm sàng và quản lý
* Phát triển khung tương tác người dùng với SMART on FHIR

R4 là bước ngoặt quan trọng, khi FHIR chính thức "trưởng thành" với các phần Normative đầu tiên.

#### R5 (2023) - Sự trưởng thành đầy đủ

R5 được phát hành vào tháng 3/2023, đánh dấu sự trưởng thành đầy đủ của FHIR:

* Tăng lên 161 tài nguyên
* Mở rộng phạm vi Normative bao gồm nhiều tài nguyên quan trọng
* Các cải tiến lớn trong mô hình nội dung lâm sàng
* Tích hợp tốt hơn với các tiêu chuẩn khác như DICOM, IHE
* Cải thiện hỗ trợ cho tương tác dựa trên sự kiện (Event-based interaction)
* Thêm khung logic lâm sàng và các tài nguyên hỗ trợ AI/ML
* Nâng cao khả năng mở rộng và quy mô hóa

### Roadmap tương lai sau R5

![HL7 FHIR R5](/storage/uploads/hl7-r5/root/image_1_1_1_.webp)

Sau R5, cộng đồng FHIR đã vạch ra một lộ trình phát triển đầy tham vọng:

#### FHIR R6 (dự kiến 2025-2026)

* **Mở rộng phạm vi Normative**: Mục tiêu đưa hầu hết các tài nguyên lâm sàng trở thành Normative
* **Tăng cường khung Genomics**: Hoàn thiện và mở rộng hỗ trợ cho dữ liệu genomics
* **Phát triển khung AI/ML**: Tài nguyên và hướng dẫn cho việc tích hợp AI/ML trong chăm sóc y tế
* **Cải thiện tính liên thông toàn cầu**: Thúc đẩy triển khai nhất quán trên quy mô toàn cầu
* **Cải tiến API cho ứng dụng di động**: Tối ưu hóa API cho các ứng dụng di động và IoT

#### Các hướng phát triển dài hạn

* **FHIR Accelerator Programs**: Mở rộng các chương trình thúc đẩy triển khai FHIR trong các lĩnh vực chuyên biệt
* **Tích hợp với các tiêu chuẩn mới nổi**: Phối hợp với các tiêu chuẩn như W3C SOLID, IETF
* **FHIR Infrastructure for Public Health**: Xây dựng cơ sở hạ tầng FHIR cho y tế công cộng và ứng phó với đại dịch
* **Global FHIR Registry**: Phát triển hệ thống đăng ký FHIR toàn cầu để hỗ trợ triển khai nhất quán
* **FHIR Governance Models**: Mô hình quản trị để hỗ trợ việc triển khai FHIR ở cấp quốc gia và khu vực

#### Các xu hướng đổi mới

* **GraphQL và FHIR**: Mở rộng hỗ trợ cho giao diện truy vấn GraphQL
* **FHIR Bulk Data**: Nâng cao khả năng xử lý dữ liệu lớn
* **CDS Hooks**: Tích hợp sâu hơn hỗ trợ ra quyết định lâm sàng
* **SMART App Launch Framework**: Cải tiến khung triển khai ứng dụng

### Các phần Normative trong R5

![Đây là danh sách không đầy đủ của một số tài nguyên quan trọng](/storage/uploads/hl7-r5/root/image_2_1_.webp)

*Đây là danh sách không đầy đủ của một số tài nguyên quan trọng*

R5 đã mở rộng đáng kể phạm vi Normative, củng cố vị thế của FHIR là tiêu chuẩn ổn định và đáng tin cậy:

#### Core Infrastructure (Cơ sở hạ tầng cốt lõi)

* RESTful API (đã Normative từ R4)
* Định dạng JSON, XML (đã Normative từ R4)
* Framework mở rộng (Extensions Framework)
* Cơ chế tìm kiếm (Search Framework)
* Cơ chế xác thực và ủy quyền
* Quy tắc phân trang và liên kết

#### Datatype (Kiểu dữ liệu)

* Tất cả các primitive types (string, integer, boolean, etc.)
* Các kiểu dữ liệu phức tạp như Identifier, CodeableConcept, Reference
* Phần lớn các kiểu dữ liệu đã được Normative từ R4

#### Clinical Resources (Tài nguyên lâm sàng)

* **Đã Normative trong R4 và tiếp tục trong R5**: Patient, Observation, Condition, AllergyIntolerance
* **Mới Normative trong R5**: Procedure, MedicationRequest, DiagnosticReport, Immunization, CarePlan

#### Administrative Resources (Tài nguyên quản lý)

* **Đã Normative từ R4**: Organization, Practitioner, PractitionerRole
* **Mới Normative trong R5**: Encounter, Location, RelatedPerson, Schedule, Appointment

#### Conformance Resources (Tài nguyên tuân thủ)

* StructureDefinition (đã Normative từ R4)
* CapabilityStatement (mới Normative trong R5)
* OperationDefinition (mới Normative trong R5)

Việc mở rộng phạm vi Normative trong R5 là yếu tố quan trọng tạo niềm tin cho các tổ chức đang xem xét đầu tư vào FHIR. Các tài nguyên Normative có cam kết về tính tương thích ngược trong tương lai, giảm thiểu rủi ro khi triển khai.

### Sự chuyển đổi giữa các phiên bản

![FHIR Version Migration](/storage/uploads/hl7-r5/root/image_3_.webp)

*FHIR Version Migration*

Một trong những thách thức lớn nhất khi làm việc với FHIR là quản lý việc chuyển đổi giữa các phiên bản. FHIR đã phát triển cơ chế hỗ trợ quá trình này:

#### Chuyển đổi từ DSTU2 lên STU3

* Thay đổi lớn trong cấu trúc một số tài nguyên
* Đòi hỏi công sức đáng kể để chuyển đổi
* Các công cụ mapping còn hạn chế

#### Chuyển đổi từ STU3 lên R4

* Ít thay đổi đột phá hơn
* Có nhiều công cụ mapping hỗ trợ
* Các tổ chức có thể theo một lộ trình chuyển đổi từng phần

#### Chuyển đổi từ R4 lên R5

* Tương đối suôn sẻ nhờ cam kết tương thích ngược cho các phần Normative
* HL7 cung cấp công cụ chuyển đổi và ánh xạ chính thức
* Hỗ trợ cơ chế version negotiation trong API
* Có thể triển khai song song R4 và R5 trong quá trình chuyển đổi

#### Các chiến lược chuyển đổi

1. **Tiếp cận từng phần**: Chuyển đổi từng hệ thống/ứng dụng một
2. **Sử dụng adapter**: Xây dựng adapter giữa các phiên bản FHIR
3. **Version negotiation**: Cho phép client chỉ định phiên bản FHIR họ muốn sử dụng
4. **Dual support**: Hỗ trợ cả hai phiên bản trong thời gian chuyển tiếp

#### Công cụ hỗ trợ chuyển đổi

* **FHIR Converter**: Công cụ chính thức từ HL7 để chuyển đổi giữa các phiên bản
* **HAPI FHIR Converter**: Thư viện Java hỗ trợ chuyển đổi
* **Tài liệu chuyển đổi**: HL7 cung cấp tài liệu chi tiết về thay đổi giữa các phiên bản
* **Validating converters**: Công cụ kiểm tra tính hợp lệ sau khi chuyển đổi

Ví dụ về cách xử lý thay đổi giữa R4 và R5 trong Observation:

```json
// R4 Observation
{
  "resourceType": "Observation",
  "status": "final",
  "code": {
    "coding": [{
      "system": "http://loinc.org",
      "code": "8867-4",
      "display": "Heart rate"
    }]
  },
  "subject": {
    "reference": "Patient/123" 
  },
  "valueQuantity": {
    "value": 80,
    "unit": "beats/minute",
    "system": "http://unitsofmeasure.org",
    "code": "/min"
  }
}

// R5 Observation (note the valueQuantity renamed to value[x])
{
  "resourceType": "Observation",
  "status": "final",
  "code": {
    "coding": [{
      "system": "http://loinc.org",
      "code": "8867-4",
      "display": "Heart rate"
    }]
  },
  "subject": {
    "reference": "Patient/123" 
  },
  "value": {
    "valueQuantity": {
      "value": 80,
      "unit": "beats/minute",
      "system": "http://unitsofmeasure.org",
      "code": "/min"
    }
  }
}
```

### Kết luận

Hành trình phát triển của FHIR từ DSTU1 đến R5 là minh chứng cho sự thành công của một tiêu chuẩn được thiết kế với nguyên tắc đặt nhu cầu thực tế lên hàng đầu. Với mỗi phiên bản, FHIR không chỉ mở rộng về phạm vi mà còn củng cố tính ổn định và độ tin cậy.

Phiên bản R5 đánh dấu sự trưởng thành của FHIR, với phần lớn cấu trúc cốt lõi và nhiều tài nguyên thông dụng đã đạt trạng thái Normative. Điều này tạo nền tảng vững chắc cho các tổ chức đầu tư vào hệ sinh thái FHIR mà không lo ngại về những thay đổi đột phá trong tương lai.

Lộ trình phát triển sau R5 hứa hẹn sẽ tiếp tục mở rộng khả năng của FHIR, đáp ứng các nhu cầu mới trong lĩnh vực y tế như AI/ML, genomics, và y tế công cộng. Với sự phát triển mạnh mẽ của cộng đồng và sự ủng hộ từ các tổ chức lớn, tương lai của FHIR chưa bao giờ sáng sủa hơn.
