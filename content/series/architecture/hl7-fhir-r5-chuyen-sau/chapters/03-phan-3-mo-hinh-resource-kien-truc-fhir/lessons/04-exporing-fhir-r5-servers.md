---
id: a6ab3b7d-a743-4a3a-9888-ae0bd1926313
title: 'Exporing FHIR R5 Servers'
slug: exporing-fhir-r5-servers
description: 'FHIR (Fast Healthcare Interoperability Resources) phiên bản R5 là tiêu chuẩn mới nhất cho việc trao đổi dữ liệu y tế, được HL7 chính thức phát hành vào năm 2023. Với nhiều cải tiến đáng kể so với các phiên bản trước…'
duration_minutes: 28
is_free: true
video_url: null
sort_order: 4
section_title: 'Phần 3: Mô hình Resource & Kiến trúc FHIR'
course:
  id: 019e3a00-0000-7001-e001-hl7r5000001
  title: 'HL7 FHIR R5 Chuyên Sâu — Reference & Thực hành'
  slug: hl7-fhir-r5-chuyen-sau
---
![Exporing FHIR R5 Servers](/storage/uploads/hl7-r5/root/image_13_.webp)

*Exporing FHIR R5 Servers*

FHIR (Fast Healthcare Interoperability Resources) phiên bản R5 là tiêu chuẩn mới nhất cho việc trao đổi dữ liệu y tế, được HL7 chính thức phát hành vào năm 2023. Với nhiều cải tiến đáng kể so với các phiên bản trước, FHIR R5 mang đến khả năng tương tác và linh hoạt cao hơn cho các hệ thống thông tin y tế. Trong bài viết này, chúng ta sẽ tìm hiểu chi tiết về các máy chủ FHIR R5 và cách bắt đầu làm việc với chúng.

### HAPI FHIR R5 TestServer

[HAPI FHIR](https://hapifhir.io/) là một trong những triển khai mã nguồn mở phổ biến nhất của tiêu chuẩn FHIR, được phát triển bằng Java. HAPI FHIR TestServer cung cấp một môi trường thử nghiệm hoàn chỉnh để làm việc với FHIR R5.

#### Đặc điểm chính:

* **Endpoint**: [https://hapi.fhir.org/baseR5/](https://hapi.fhir.org/baseR5/)
* **Hỗ trợ đầy đủ FHIR R5**: Triển khai tất cả các resource types và operations của R5
* **Giao diện người dùng tích hợp**: Cung cấp giao diện web để thử nghiệm và khám phá
* **RESTful API**: Tuân thủ đầy đủ đặc tả RESTful API của FHIR
* **Không cần đăng ký**: Cho phép truy cập tự do để thử nghiệm
* **Development Mode**: Cho phép tạo, đọc, cập nhật và xóa resources

#### Cách sử dụng HAPI FHIR TestServer:

**1. Truy cập và khám phá giao diện web:**

Truy cập [https://hapi.fhir.org/baseR5/](https://hapi.fhir.org/baseR5/) trong trình duyệt để xem trang chủ của máy chủ. Từ đây, bạn có thể:

* Xem danh sách các resource types được hỗ trợ
* Thực hiện tìm kiếm trên server
* Khám phá các tài liệu và hướng dẫn

**2. Thực hiện các thao tác cơ bản với cURL:**

```bash
# Lấy danh sách 10 bệnh nhân đầu tiên
curl -X GET https://hapi.fhir.org/baseR5/Patient?_count=10

# Tìm kiếm bệnh nhân theo tên
curl -X GET https://hapi.fhir.org/baseR5/Patient?name=Smith

# Tạo bệnh nhân mới (POST)
curl -X POST -H "Content-Type: application/fhir+json" \
  -d '{"resourceType":"Patient","name":[{"family":"Nguyễn","given":["Văn","A"]}],"gender":"male","birthDate":"1980-07-15"}' \
  https://hapi.fhir.org/baseR5/Patient

# Lấy thông tin một bệnh nhân cụ thể (thay [id] bằng ID thực tế)
curl -X GET https://hapi.fhir.org/baseR5/Patient/[id]

# Cập nhật thông tin bệnh nhân (PUT)
curl -X PUT -H "Content-Type: application/fhir+json" \
  -d '{"resourceType":"Patient","id":"[id]","name":[{"family":"Nguyễn","given":["Văn","B"]}],"gender":"male","birthDate":"1980-07-15"}' \
  https://hapi.fhir.org/baseR5/Patient/[id]

# Xóa bệnh nhân
curl -X DELETE https://hapi.fhir.org/baseR5/Patient/[id]
```

**3. Sử dụng tham số tìm kiếm nâng cao:**

```bash
# Tìm tất cả bệnh nhân nữ sinh năm 1990
curl -X GET "https://hapi.fhir.org/baseR5/Patient?gender=female&birthdate=1990"

# Tìm kiếm kết hợp nhiều tham số
curl -X GET "https://hapi.fhir.org/baseR5/Observation?code=http://loinc.org|8480-6&patient.name=Smith"

# Sử dụng tìm kiếm toàn văn
curl -X GET "https://hapi.fhir.org/baseR5/Patient?_content=diabetes"

# Tìm kiếm theo _include để lấy resources liên quan
curl -X GET "https://hapi.fhir.org/baseR5/MedicationRequest?_include=MedicationRequest:patient"
```

**4. Thực hiện các FHIR Operations:**

```bash
# Thực hiện phép toán $everything để lấy tất cả dữ liệu của bệnh nhân
curl -X GET https://hapi.fhir.org/baseR5/Patient/[id]/$everything

# Sử dụng $validate để kiểm tra tính hợp lệ của resource
curl -X POST -H "Content-Type: application/fhir+json" \
  -d '{"resourceType":"Parameters","parameter":[{"name":"resource","resource":{"resourceType":"Patient","name":[{"family":"Test"}]}}]}' \
  https://hapi.fhir.org/baseR5/Patient/$validate
```

#### Hạn chế của HAPI FHIR TestServer:

* **Không bảo mật**: Đây là một máy chủ công khai, không nên sử dụng cho dữ liệu thật
* **Xóa dữ liệu định kỳ**: Dữ liệu có thể bị xóa mà không có thông báo
* **Giới hạn hiệu suất**: Có thể gặp vấn đề về hiệu suất nếu sử dụng quá mức
* **Không có hỗ trợ xác thực**: Không triển khai SMART on FHIR hoặc OAuth2

### Firely Server R5 instances

![Firely Server](/storage/uploads/hl7-r5/root/Screenshot_2025-03-13_111809.webp)

*Firely Server*

Firely Server (trước đây được gọi là Vonk) là một máy chủ FHIR thương mại được phát triển bởi Firely. Nó cung cấp cả phiên bản doanh nghiệp trả phí và phiên bản cộng đồng miễn phí (có giới hạn).

#### Đặc điểm chính:

* **Endpoint chính thức**: [https://server.fire.ly/r5/](https://server.fire.ly/r5/)
* **Hiệu suất cao**: Được tối ưu hóa cho môi trường sản xuất
* **Tuân thủ nghiêm ngặt**: Đảm bảo tuân thủ đầy đủ các đặc tả của FHIR R5
* **Kiểm tra tính hợp lệ**: Hỗ trợ validation dựa trên StructureDefinitions và Profiles
* **Bảo mật nâng cao**: Hỗ trợ SMART on FHIR, OAuth2 và RBAC (trong phiên bản doanh nghiệp)
* **Lịch sử và versioning**: Theo dõi mọi thay đổi của resources

#### Cách sử dụng Firely Server R5:

**1. Truy cập endpoint và khám phá:**

```bash
# Kiểm tra khả năng của server (Capability Statement)
curl -X GET https://server.fire.ly/r5/metadata

# Xem danh sách resources được hỗ trợ
curl -X GET https://server.fire.ly/r5/
```

**2. Thực hiện các thao tác CRUD:**

```bash
# Tạo bệnh nhân mới
curl -X POST -H "Content-Type: application/fhir+json" \
  -d '{"resourceType":"Patient","name":[{"family":"Lê","given":["Thị","C"]}]}' \
  https://server.fire.ly/r5/Patient

# Tìm kiếm bệnh nhân theo tiêu chí
curl -X GET "https://server.fire.ly/r5/Patient?family=Lê&given=Thị"

# Đọc thông tin chi tiết bệnh nhân
curl -X GET https://server.fire.ly/r5/Patient/[id]
```

**3. Sử dụng các tính năng nâng cao:**

```bash
# Lấy lịch sử thay đổi của resource
curl -X GET https://server.fire.ly/r5/Patient/[id]/_history

# Lấy phiên bản cụ thể của resource
curl -X GET https://server.fire.ly/r5/Patient/[id]/_history/[version]

# Kiểm tra tính hợp lệ theo profile cụ thể
curl -X POST -H "Content-Type: application/fhir+json" \
  -d '{"resourceType":"Parameters","parameter":[{"name":"resource","resource":{"resourceType":"Patient",...}},{"name":"profile","valueUri":"http://example.org/fhir/StructureDefinition/MyPatientProfile"}]}' \
  https://server.fire.ly/r5/Patient/$validate
```

#### Phiên bản doanh nghiệp của Firely Server:

Firely Server Enterprise cung cấp thêm nhiều tính năng như:

* **Multi-tenancy**: Hỗ trợ nhiều tenant trên cùng một instance
* **Subscription**: Hỗ trợ theo dõi và thông báo khi có thay đổi dữ liệu
* **Terminology Services**: Dịch vụ quản lý mã và thuật ngữ
* **Custom Operations**: Khả năng mở rộng với các operation tùy chỉnh
* **High Availability**: Cấu hình cluster để đảm bảo tính sẵn sàng cao
* **Auditing**: Theo dõi và ghi nhật ký chi tiết cho mọi hoạt động

#### Lưu ý về Firely Server Sandbox:

* Sandbox là môi trường công khai, không bảo mật cho dữ liệu nhạy cảm
* Dữ liệu có thể bị xóa hoặc reset định kỳ
* Có giới hạn số lượng requests để tránh quá tải server

### Sử dụng FHIR Browser để khám phá resources

FHIR Browser là các công cụ trực quan giúp bạn khám phá và tương tác với FHIR resources mà không cần phải viết code phức tạp. Dưới đây là một số FHIR Browser hỗ trợ R5:

![FHIR Browser](/storage/uploads/hl7-r5/root/image_15_.webp)

*FHIR Browser*

#### 1. Simplifier.net FHIR Browser

[Simplifier.net](https://simplifier.net/) là nền tảng toàn diện cho phát triển, quản lý và chia sẻ các đặc tả FHIR.

* **URL**: [https://simplifier.net/browser](https://simplifier.net/browser)
* **Đặc điểm chính**:
  * Hỗ trợ đầy đủ FHIR R5
  * Giao diện trực quan, dễ sử dụng
  * Cho phép khám phá cấu trúc của mọi resource type
  * Có thể duyệt các profiles, extensions, và value sets
  * Tích hợp với các registry FHIR như HL7 và các registry quốc gia
  * Hỗ trợ nhiều định dạng xuất (JSON, XML, Turtle)

**Cách sử dụng Simplifier FHIR Browser:**

1. Truy cập [https://simplifier.net/browser](https://simplifier.net/browser)
2. Chọn FHIR version R5
3. Chọn một resource type từ menu để xem cấu trúc chi tiết
4. Khám phá các thuộc tính, datatype và mối quan hệ

#### 2. FHIR Web Client của HL7

HAPI FHIR cung cấp một FHIR Web Client cho phép bạn tương tác trực tiếp với FHIR servers.

* **URL**: [http://hapi.fhir.org/resource?serverId=home\_r5](http://hapi.fhir.org/resource?serverId=home_r5)
* **Đặc điểm chính**:
  * Giao diện tích hợp sẵn trong HAPI FHIR TestServer
  * Cho phép tạo, đọc, cập nhật và xóa resources
  * Hỗ trợ tìm kiếm với nhiều tham số
  * Hiển thị resources ở định dạng JSON và XML
  * Có thể chuyển đổi giữa các phiên bản FHIR
  * Cung cấp lịch sử thay đổi của resources

**Cách sử dụng HAPI FHIR Web Client:**

1. Truy cập [http://hapi.fhir.org/resource?serverId=home\_r5](http://hapi.fhir.org/resource?serverId=home_r5)
2. Chọn loại resource từ dropdown menu
3. Sử dụng "Search" để tìm kiếm resources
4. Nhấp vào ID của resource để xem chi tiết
5. Sử dụng nút "Create" để tạo resource mới
6. Sử dụng "Update" để sửa đổi resources hiện có

#### 3. Firely Terminal

Firely Terminal là một công cụ mạnh mẽ cho các nhà phát triển FHIR, cung cấp môi trường desktop để làm việc với FHIR.

* **URL**: [https://fire.ly/products/firely-terminal/](https://fire.ly/products/firely-terminal/)
* **Đặc điểm chính**:
  * IDE đầy đủ tính năng cho FHIR
  * Hỗ trợ FSH (FHIR Shorthand) để tạo profiles và resources
  * Quản lý nhiều FHIR servers
  * Hỗ trợ trực tiếp cho FHIR R5
  * Tính năng debug và validation tích hợp
  * Tự động hoàn thành mã và kiểm tra lỗi cú pháp

**Cài đặt và sử dụng Firely Terminal:**

1. Tải và cài đặt từ [https://fire.ly/products/firely-terminal/](https://fire.ly/products/firely-terminal/)
2. Khởi động ứng dụng và đăng nhập (có thể tạo tài khoản miễn phí)
3.  Kết nối với FHIR server R5 bằng cách thêm server mới:

    ```
    server add r5 https://server.fire.ly/r5
    ```
4.  Chuyển đổi giữa các server bằng lệnh:

    ```
    server focus r5
    ```
5.  Thực hiện các thao tác FHIR, ví dụ:

    ```
    read Patient/examplesearch Patient name=Smith
    ```

### Tools khám phá R5 resources

![Tools R5 resources](/storage/uploads/hl7-r5/root/image_16_.webp)

*Tools R5 resources*

#### 1. FHIR Validator

FHIR Validator là công cụ quan trọng để kiểm tra tính hợp lệ của FHIR resources theo các đặc tả và profiles.

* **URL**: [https://validator.fhir.org/](https://validator.fhir.org/)
* **Đặc điểm chính**:
  * Hỗ trợ đầy đủ FHIR R5
  * Kiểm tra cú pháp và ngữ nghĩa của resources
  * Xác thực dựa trên StructureDefinitions và Profiles
  * Báo cáo lỗi và cảnh báo chi tiết
  * Hỗ trợ nhiều định dạng (JSON, XML)
  * Cung cấp API để tích hợp vào pipeline CI/CD

**Cách sử dụng FHIR Validator:**

1. Truy cập [https://validator.fhir.org/](https://validator.fhir.org/)
2. Chọn phiên bản FHIR R5
3. Dán resource cần kiểm tra (JSON hoặc XML)
4. Chọn profile cụ thể (nếu cần)
5. Nhấp "Validate" để kiểm tra
6. Xem báo cáo lỗi và cảnh báo

#### 2. Clinicians on FHIR

Clinicians on FHIR là môi trường mô phỏng cho phép bạn tạo và khám phá dữ liệu lâm sàng theo định dạng FHIR.

* **URL R5**: [https://clinfhir.com/](https://clinfhir.com/) (Chọn R5 từ menu)
* **Đặc điểm chính**:
  * Giao diện thân thiện với người dùng lâm sàng
  * Hỗ trợ các kịch bản lâm sàng thực tế
  * Tạo và liên kết các resources lâm sàng
  * Hiển thị dữ liệu dưới dạng biểu đồ và timeline
  * Hỗ trợ tìm kiếm và lọc
  * Tích hợp với nhiều FHIR servers

**Cách sử dụng Clinicians on FHIR:**

1. Truy cập [https://clinfhir.com/](https://clinfhir.com/)
2. Chọn phiên bản R5 từ settings
3. Chọn một kịch bản lâm sàng hoặc tạo kịch bản mới
4. Khám phá và tương tác với các resources lâm sàng
5. Sử dụng chức năng "Resource Builder" để tạo resources mới

#### 3. Forge

Forge là một công cụ desktop chuyên dụng để tạo và chỉnh sửa FHIR Profiles và Extensions.

* **URL**: [https://fire.ly/products/forge/](https://fire.ly/products/forge/)
* **Đặc điểm chính**:
  * Hỗ trợ FHIR R5
  * Giao diện đồ họa để tạo và chỉnh sửa StructureDefinitions
  * Tạo và quản lý các extensions
  * Xuất profiles dưới nhiều định dạng
  * Tích hợp với Simplifier.net và FHIR registries
  * Hỗ trợ validation và testing

**Cài đặt và sử dụng Forge:**

1. Tải và cài đặt từ [https://fire.ly/products/forge/](https://fire.ly/products/forge/)
2. Khởi động ứng dụng và chọn phiên bản FHIR R5
3. Tạo profile mới hoặc mở profile có sẵn
4. Sử dụng giao diện đồ họa để chỉnh sửa các ràng buộc và thuộc tính
5. Xuất profile dưới dạng JSON hoặc XML
6. Xuất bản lên Simplifier.net hoặc FHIR registry khác

#### 4. FHIR API Calls với Postman

Postman là công cụ phổ biến để thử nghiệm và tài liệu hóa API, rất hữu ích cho làm việc với FHIR APIs.

**Thiết lập Postman cho FHIR R5:**

1. **Tải Postman**: [https://www.postman.com/downloads/](https://www.postman.com/downloads/)
2. **Tạo workspace mới** cho FHIR R5
3. **Thiết lập biến môi trường**:
   * `fhir_server`: https://hapi.fhir.org/baseR5
   * `content_type`: application/fhir+json
4.  **Tạo collection với các requests mẫu**:

    a. **Capability Statement**:

    * Method: GET
    * URL: \{{fhir\_server\}}/metadata
    * Headers: Accept: application/fhir+json

    b. **Tìm kiếm bệnh nhân**:

    * Method: GET
    * URL: \{{fhir\_server\}}/Patient?name=Smith
    * Headers: Accept: application/fhir+json

    c. **Tạo bệnh nhân mới**:

    * Method: POST
    * URL: \{{fhir\_server\}}/Patient
    * Headers:
      * Content-Type: \{{content\_type\}}
      * Accept: application/fhir+json
    *   Body (raw, JSON):

        ```json
        {  "resourceType": "Patient",  "name": [    {      "family": "Phạm",      "given": ["Văn", "D"]    }  ],  "gender": "male",  "birthDate": "1985-08-01",  "address": [    {      "use": "home",      "line": ["789 Đường Nguyễn Du"],      "city": "Hà Nội",      "country": "VN"    }  ]}
        ```

    d. **Cập nhật bệnh nhân**:

    * Method: PUT
    * URL: \{{fhir\_server\}}/Patient/\{{patient\_id\}}
    * Headers và Body tương tự như tạo mới, nhưng thêm trường "id"

    e. **Xóa bệnh nhân**:

    * Method: DELETE
    * URL: \{{fhir\_server\}}/Patient/\{{patient\_id\}}
5. **Sử dụng Collection Runner** để thực hiện chuỗi requests tự động
6. **Lưu responses** để tham khảo và so sánh
7. **Chia sẻ collection** với team thông qua Postman Teams

#### 5. GraphQL cho FHIR

GraphQL ngày càng phổ biến trong làm việc với FHIR, cho phép truy vấn chính xác những dữ liệu cần thiết.

* **HAPI FHIR GraphQL endpoint**: https://hapi.fhir.org/baseR5/$graphql
* **Đặc điểm chính**:
  * Truy vấn nhiều resources trong một request
  * Chỉ định chính xác các trường cần lấy
  * Giảm kích thước dữ liệu phản hồi
  * Hỗ trợ relations và nested queries
  * Tương thích với các công cụ và thư viện GraphQL

**Ví dụ GraphQL với FHIR R5:**

```graphql
{
  # Tìm bệnh nhân với tên "Smith"
  PatientList(name: "Smith") {
    # Chỉ lấy những trường cần thiết
    name {
      family
      given
    }
    birthDate
    gender
    telecom {
      system
      value
    }
    # Lấy các Observations liên quan
    ObservationList(_reference: patient) {
      code {
        coding {
          system
          code
          display
        }
      }
      valueQuantity {
        value
        unit
      }
      effectiveDateTime
    }
  }
}
```

Để sử dụng GraphQL với FHIR R5:

1. Gửi POST request đến endpoint `$graphql`
2. Đặt Content-Type: application/json
3. Body bao gồm object với trường "query" chứa GraphQL query
4. Thực hiện truy vấn và nhận kết quả theo cấu trúc yêu cầu

### Ví dụ thực hành: Tạo và quản lý hồ sơ bệnh nhân trên HAPI FHIR R5

Dưới đây là một ví dụ thực tế về việc tạo và quản lý hồ sơ bệnh nhân hoàn chỉnh trên HAPI FHIR R5 TestServer.

#### 1. Tạo bệnh nhân mới:

```bash
curl -X POST -H "Content-Type: application/fhir+json" \
  -d '{
    "resourceType": "Patient",
    "identifier": [
      {
        "system": "https://example.org/fhir/identifiers/mrn",
        "value": "MRN12345"
      }
    ],
    "active": true,
    "name": [
      {
        "use": "official",
        "family": "Nguyễn",
        "given": ["Thị", "Hoa"]
      }
    ],
    "telecom": [
      {
        "system": "phone",
        "value": "0912345678",
        "use": "mobile"
      },
      {
        "system": "email",
        "value": "hoa.nguyen@example.com"
      }
    ],
    "gender": "female",
    "birthDate": "1990-05-15",
    "address": [
      {
        "use": "home",
        "line": ["123 Đường Lê Lợi"],
        "city": "Hồ Chí Minh",
        "postalCode": "70000",
        "country": "VN"
      }
    ],
    "contact": [
      {
        "relationship": [
          {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/v2-0131",
                "code": "C",
                "display": "Emergency Contact"
              }
            ]
          }
        ],
        "name": {
          "family": "Nguyễn",
          "given": ["Văn", "An"]
        },
        "telecom": [
          {
            "system": "phone",
            "value": "0987654321"
          }
        ],
        "relationship": [
          {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/v3-RoleCode",
                "code": "SPS",
                "display": "spouse"
              }
            ]
          }
        ]
      }
    ],
    "communication": [
      {
        "language": {
          "coding": [
            {
              "system": "urn:ietf:bcp:47",
              "code": "vi",
              "display": "Vietnamese"
            }
          ]
        },
        "preferred": true
      }
    ]
  }' \
  https://hapi.fhir.org/baseR5/Patient
```

Kết quả trả về sẽ bao gồm ID của bệnh nhân. Lưu ID này để sử dụng cho các bước tiếp theo.

#### 2. Thêm thông tin liên quan:

**a. Thêm thông tin tiền sử bệnh:**

```bash
curl -X POST -H "Content-Type: application/fhir+json" \
  -d '{
    "resourceType": "Condition",
    "clinicalStatus": {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
          "code": "active",
          "display": "Active"
        }
      ]
    },
    "verificationStatus": {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
          "code": "confirmed",
          "display": "Confirmed"
        }
      ]
    },
    "category": [
      {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/condition-category",
            "code": "problem-list-item",
            "display": "Problem List Item"
          }
        ]
      }
    ],
    "code": {
      "coding": [
        {
          "system": "http://snomed.info/sct",
          "code": "73211009",
          "display": "Diabetes mellitus"
        }
      ],
      "text": "Diabetes mellitus type 2"
    },
    "subject": {
      "reference": "Patient/[patient_id]"
    },
    "onsetDateTime": "2018-03-01"
  }' \
  https://hapi.fhir.org/baseR5/Condition
```

**b. Thêm thông tin dị ứng:**

```bash
curl -X POST -H "Content-Type: application/fhir+json" \
  -d '{
    "resourceType": "AllergyIntolerance",
    "clinicalStatus": {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
          "code": "active",
          "display": "Active"
        }
      ]
    },
    "verificationStatus": {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
          "code": "confirmed",
          "display": "Confirmed"
        }
      ]
    },
    "type": "allergy",
    "category": ["medication"],
    "criticality": "high",
    "code": {
      "coding": [
        {
          "system": "http://www.nlm.nih.gov/research/umls/rxnorm",
          "code": "3498",
          "display": "Penicillin"
        }
      ],
      "text": "Penicillin"
    },
    "patient": {
      "reference": "Patient/[patient_id]"
    },
    "onsetDateTime": "2010-07-18",
    "reaction": [
      {
        "manifestation": [
          {
            "coding": [
              {
                "system": "http://snomed.info/sct",
                "code": "247472004",
                "display": "Hives"
              }
            ],
            "text": "Phát ban nổi mề đay"
          }
        ],
        "severity": "severe"
      }
    ]
  }' \
  https://hapi.fhir.org/baseR5/AllergyIntolerance
```

**c. Thêm thông tin xét nghiệm:**

```bash
curl -X POST -H "Content-Type: application/fhir+json" \
  -d '{
    "resourceType": "Observation",
    "status": "final",
    "category": [
      {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/observation-category",
            "code": "laboratory",
            "display": "Laboratory"
          }
        ]
      }
    ],
    "code": {
      "coding": [
        {
          "system": "http://loinc.org",
          "code": "2339-0",
          "display": "Glucose [Mass/volume] in Blood"
        }
      ],
      "text": "Đường huyết lúc đói"
    },
    "subject": {
      "reference": "Patient/[patient_id]"
    },
    "effectiveDateTime": "2023-07-19T08:00:00+07:00",
    "issued": "2023-07-19T10:30:00+07:00",
    "valueQuantity": {
      "value": 135,
      "unit": "mg/dL",
      "system": "http://unitsofmeasure.org",
      "code": "mg/dL"
    },
    "referenceRange": [
      {
        "low": {
          "value": 70,
          "unit": "mg/dL",
          "system": "http://unitsofmeasure.org",
          "code": "mg/dL"
        },
        "high": {
          "value": 100,
          "unit": "mg/dL",
          "system": "http://unitsofmeasure.org",
          "code": "mg/dL"
        },
        "type": {
          "coding": [
            {
              "system": "http://terminology.hl7.org/CodeSystem/referencerange-meaning",
              "code": "normal",
              "display": "Normal Range"
            }
          ]
        }
      }
    ]
  }' \
  https://hapi.fhir.org/baseR5/Observation
```

**d. Thêm thông tin thuốc:**

```bash
curl -X POST -H "Content-Type: application/fhir+json" \
  -d '{
    "resourceType": "MedicationRequest",
    "status": "active",
    "intent": "order",
    "medicationCodeableConcept": {
      "coding": [
        {
          "system": "http://www.nlm.nih.gov/research/umls/rxnorm",
          "code": "213469",
          "display": "Metformin 500 MG"
        }
      ],
      "text": "Metformin 500mg"
    },
    "subject": {
      "reference": "Patient/[patient_id]"
    },
    "authoredOn": "2023-07-19",
    "requester": {
      "reference": "Practitioner/example",
      "display": "Bác sĩ Trần Văn Minh"
    },
    "dosageInstruction": [
      {
        "text": "Uống 1 viên, ngày 2 lần sau bữa ăn sáng và tối",
        "timing": {
          "repeat": {
            "frequency": 2,
            "period": 1,
            "periodUnit": "d"
          }
        },
        "route": {
          "coding": [
            {
              "system": "http://snomed.info/sct",
              "code": "26643006",
              "display": "Oral route"
            }
          ]
        },
        "doseAndRate": [
          {
            "doseQuantity": {
              "value": 1,
              "unit": "viên",
              "system": "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
              "code": "TAB"
            }
          }
        ]
      }
    ],
    "dispenseRequest": {
      "numberOfRepeatsAllowed": 2,
      "quantity": {
        "value": 60,
        "unit": "viên",
        "system": "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
        "code": "TAB"
      },
      "expectedSupplyDuration": {
        "value": 30,
        "unit": "ngày",
        "system": "http://unitsofmeasure.org",
        "code": "d"
      }
    }
  }' \
  https://hapi.fhir.org/baseR5/MedicationRequest
```

#### 3. Tìm kiếm dữ liệu liên quan đến bệnh nhân:

```bash
# Lấy tất cả thông tin về bệnh nhân
curl -X GET "https://hapi.fhir.org/baseR5/Patient/[patient_id]"

# Lấy tất cả các bệnh lý của bệnh nhân
curl -X GET "https://hapi.fhir.org/baseR5/Condition?subject=Patient/[patient_id]"

# Lấy tất cả các dị ứng của bệnh nhân
curl -X GET "https://hapi.fhir.org/baseR5/AllergyIntolerance?patient=Patient/[patient_id]"

# Lấy tất cả xét nghiệm của bệnh nhân
curl -X GET "https://hapi.fhir.org/baseR5/Observation?subject=Patient/[patient_id]"

# Lấy tất cả đơn thuốc của bệnh nhân
curl -X GET "https://hapi.fhir.org/baseR5/MedicationRequest?subject=Patient/[patient_id]"

# Lấy tất cả dữ liệu lâm sàng của bệnh nhân trong một request
curl -X GET "https://hapi.fhir.org/baseR5/Patient/[patient_id]/$everything"
```

#### 4. Cập nhật thông tin bệnh nhân:

```bash
# Đầu tiên lấy thông tin hiện tại của bệnh nhân
curl -X GET "https://hapi.fhir.org/baseR5/Patient/[patient_id]" > patient.json

# Sửa đổi file patient.json
# Sau đó gửi PUT request để cập nhật
curl -X PUT -H "Content-Type: application/fhir+json" \
  -d @patient.json \
  "https://hapi.fhir.org/baseR5/Patient/[patient_id]"
```

### Sử dụng React FHIR Client để khám phá R5 Resources

[FHIR React Client](https://github.com/1uphealth/fhir-react) là một thư viện React giúp bạn xây dựng các ứng dụng FHIR một cách nhanh chóng. Dưới đây là một ví dụ đơn giản để bắt đầu:

#### Thiết lập dự án:

```bash
# Tạo dự án React mới
npx create-react-app fhir-explorer
cd fhir-explorer

# Cài đặt các thư viện cần thiết
npm install fhir-kit-client fhir-react bootstrap
```

#### Tạo component để khám phá Patient Resources:

Tạo file `src/PatientExplorer.js`:

```jsx
import React, { useState, useEffect } from 'react';
import Client from 'fhir-kit-client';
import { FhirResource } from 'fhir-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PatientExplorer = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Khởi tạo FHIR Client
  const client = new Client({
    baseUrl: 'https://hapi.fhir.org/baseR5',
  });

  // Lấy danh sách bệnh nhân khi component mount
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await client.search({
          resourceType: 'Patient',
          searchParams: { _count: 10 },
        });
        setPatients(response.entry?.map(e => e.resource) || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Lấy chi tiết bệnh nhân khi chọn
  const handlePatientSelect = async (id) => {
    try {
      setLoading(true);
      const patient = await client.read({ resourceType: 'Patient', id });
      setSelectedPatient(patient);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div className="p-3">Đang tải...</div>;
  if (error) return <div className="p-3 text-danger">Lỗi: {error}</div>;

  return (
    <div className="container mt-4">
      <h1>FHIR R5 Patient Explorer</h1>
      
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Danh sách bệnh nhân</div>
            <ul className="list-group list-group-flush">
              {patients.length === 0 ? (
                <li className="list-group-item">Không tìm thấy bệnh nhân</li>
              ) : (
                patients.map((patient) => (
                  <li 
                    key={patient.id} 
                    className="list-group-item" 
                    style={{ cursor: 'pointer' }}
                    onClick={() => handlePatientSelect(patient.id)}
                  >
                    {patient.name?.[0]?.family}, {patient.name?.[0]?.given?.join(' ') || 'N/A'}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        
        <div className="col-md-8">
          {selectedPatient ? (
            <div className="card">
              <div className="card-header">Chi tiết bệnh nhân</div>
              <div className="card-body">
                <FhirResource fhirResource={selectedPatient} />
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-body">
                <p>Chọn một bệnh nhân để xem chi tiết</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientExplorer;
```

Cập nhật `src/App.js`:

```jsx
import React from 'react';
import PatientExplorer from './PatientExplorer';

function App() {
  return (
    <div className="App">
      <PatientExplorer />
    </div>
  );
}

export default App;
```

Khởi chạy ứng dụng:

```bash
npm start
```

### SMART on FHIR với FHIR R5

SMART on FHIR là một bộ đặc tả cho phép ứng dụng y tế tích hợp với các EHR (Electronic Health Record) sử dụng FHIR. Dưới đây là các bước cơ bản để bắt đầu với SMART on FHIR trên R5:

#### 1. Cài đặt các thư viện cần thiết:

```bash
npm install fhirclient
```

#### 2. Thiết lập SMART App:

```jsx
import React, { useState, useEffect } from 'react';
import { oauth2 as SMART } from 'fhirclient';

const SMARTApp = () => {
  const [client, setClient] = useState(null);
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Khởi tạo SMART client
    SMART.ready()
      .then(client => {
        setClient(client);
        return client.patient.read();
      })
      .then(pt => {
        setPatient(pt);
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!client) return <div>Loading SMART client...</div>;
  if (!patient) return <div>Loading patient data...</div>;

  return (
    <div>
      <h1>SMART on FHIR Demo</h1>
      <h2>Patient: {patient.name?.[0]?.given?.join(' ')} {patient.name?.[0]?.family}</h2>
      <pre>{JSON.stringify(patient, null, 2)}</pre>
    </div>
  );
};

export default SMARTApp;
```

#### 3. Khởi tạo SMART authorization:

```jsx
import React from 'react';
import { oauth2 as SMART } from 'fhirclient';

const SMARTLauncher = () => {
  const handleLaunch = () => {
    SMART.authorize({
      clientId: 'my-client-id',
      scope: 'launch/patient patient/*.read',
      redirectUri: 'http://localhost:3000/app',
      iss: 'https://launch.smarthealthit.org/v/r5/fhir',
      completeInTarget: true
    });
  };

  return (
    <div>
      <h1>SMART on FHIR Launcher</h1>
      <button onClick={handleLaunch}>Launch App</button>
    </div>
  );
};

export default SMARTLauncher;
```

### Lưu ý quan trọng khi làm việc với FHIR R5 Servers

#### 1. Sự khác biệt giữa các phiên bản:

FHIR R5 có nhiều thay đổi so với R4:

* Thêm nhiều resource types mới
* Thay đổi cấu trúc một số resources
* Thay đổi trong bộ mã (codesystems và valuesets)
* Các operations mới

Nếu bạn đã quen với phiên bản cũ, hãy tham khảo tài liệu chuyển đổi: [R4 to R5 Conversion Guide](http://hl7.org/fhir/r5/diff.html)

#### 2. Xác thực và Bảo mật:

* Không lưu trữ dữ liệu nhạy cảm trên các public sandbox servers
* Sử dụng HTTPS cho mọi yêu cầu
* Khi triển khai sản phẩm, luôn sử dụng OAuth2 và SMART on FHIR
* Tuân thủ các quy định về bảo mật dữ liệu y tế như HIPAA, GDPR, hoặc CCPA

#### 3. Hiệu suất:

* Sử dụng \_include và \_revinclude để giảm số lượng requests
* Thêm tham số \_count để giới hạn kích thước kết quả
* Sử dụng tham số \_elements để chỉ lấy các trường cần thiết
* Tránh truy vấn quá rộng có thể gây quá tải server

#### 4. Conformance:

* Luôn kiểm tra CapabilityStatement của server để biết các tính năng được hỗ trợ
* Sử dụng validator để kiểm tra resources trước khi gửi
* Khi tạo profiles, hãy hạn chế sự khác biệt với các resources cơ bản

#### 5. Khi triển khai trên môi trường sản xuất:

* Sử dụng Implementation Guides chính thức khi có thể
* Tài liệu hóa đầy đủ mọi sự mở rộng và tùy chỉnh
* Triển khai hệ thống theo dõi và cảnh báo
* Xây dựng mô hình test tự động để đảm bảo tuân thủ HL7 FHIR

### Các nguồn tài nguyên FHIR R5 hữu ích

1. **Tài liệu chính thức**: [HL7 FHIR R5](http://hl7.org/fhir/R5/)
2. **FHIR Community**: [chat.fhir.org](https://chat.fhir.org/)
3. **Thư viện FHIR**:
   * [HAPI FHIR (Java)](https://hapifhir.io/)
   * [FHIR.NET API (.NET)](https://github.com/FirelyTeam/firely-net-sdk)
   * [fhir.js (JavaScript)](https://github.com/FHIR/fhir.js)
   * [fhir-py (Python)](https://github.com/nazrulworld/fhir.resources)
4. **Các khóa học FHIR**:
   * [Firely FHIR Training](https://fire.ly/training/)
   * [HL7 FHIR Fundamentals](https://www.hl7.org/training/fhir-fundamentals.cfm)
5. **Cộng đồng và Blog**:
   * [FHIR Confluence](https://confluence.hl7.org/display/FHIR/)
   * [Đầu tư sức khỏe FHIR](https://investhealth.vn/fhir)

### Kết luận

FHIR R5 Servers cung cấp nền tảng mạnh mẽ để phát triển các ứng dụng y tế hiện đại và khả năng tương tác. Thông qua các công cụ như HAPI FHIR TestServer, Firely Server, và các FHIR Browsers, bạn có thể nhanh chóng làm quen với cấu trúc và chức năng của FHIR R5.

Khi tiếp tục khám phá, hãy nhớ rằng FHIR là một tiêu chuẩn linh hoạt được thiết kế để hỗ trợ nhiều trường hợp sử dụng khác nhau. Đừng ngại tùy chỉnh và mở rộng khi cần thiết, nhưng luôn tuân thủ các nguyên tắc cơ bản để đảm bảo khả năng tương tác.

Trong các bài viết tiếp theo, chúng ta sẽ khám phá sâu hơn về việc xây dựng profiles, triển khai implementation guides, và phát triển các ứng dụng FHIR phức tạp hơn.
