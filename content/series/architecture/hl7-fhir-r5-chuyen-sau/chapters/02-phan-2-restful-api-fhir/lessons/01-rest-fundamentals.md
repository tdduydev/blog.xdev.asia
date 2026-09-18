---
id: 446fdc08-dcc6-4669-a49f-c3ae2708ae16
title: 'REST Fundamentals'
slug: rest-fundamentals
description: 'REST (Representational State Transfer) là một kiến trúc phần mềm dùng để thiết kế các API. Được Roy Fielding giới thiệu năm 2000 trong luận án tiến sĩ của mình, REST đã trở thành tiêu chuẩn de facto cho việc phát triển…'
duration_minutes: 15
is_free: true
video_url: null
sort_order: 1
section_title: 'Phần 2: RESTful API & FHIR'
course:
  id: 019e3a00-0000-7001-e001-hl7r5000001
  title: 'HL7 FHIR R5 Chuyên Sâu — Reference & Thực hành'
  slug: hl7-fhir-r5-chuyen-sau
---
REST (Representational State Transfer) là một kiến trúc phần mềm dùng để thiết kế các API. Được Roy Fielding giới thiệu năm 2000 trong luận án tiến sĩ của mình, REST đã trở thành tiêu chuẩn de facto cho việc phát triển các web API hiện đại. Dưới đây là phân tích chi tiết về 6 nguyên tắc cơ bản của REST.

![6 Nguyên tắc có bản của REST](/storage/uploads/hl7-r5/root/image_7_.webp)

*6 Nguyên tắc có bản của REST*

### 1. Stateless Communication (Giao tiếp phi trạng thái)

REST yêu cầu giao tiếp giữa client và server phải là phi trạng thái. Điều này có nghĩa là:

* Mỗi request từ client đến server phải chứa đầy đủ thông tin cần thiết để server hiểu và xử lý
* Server không lưu trữ bất kỳ thông tin nào về trạng thái client giữa các request
* Không có "session state" được lưu trên server

**Ví dụ**: Khi client gửi request lấy thông tin bệnh nhân, request phải chứa tất cả thông tin xác thực và context cần thiết, không phụ thuộc vào request trước đó.

**Lợi ích**:

* Khả năng mở rộng cao (scalability) vì server không cần lưu trữ thông tin trạng thái
* Độ tin cậy tăng vì mỗi request độc lập với các request khác
* Cân bằng tải (load balancing) dễ dàng hơn

### 2. Uniform Interface (Giao diện đồng nhất)

REST định nghĩa một giao diện đồng nhất giữa client và server, bao gồm bốn ràng buộc chính:

* **Resource identification through URIs**: Tài nguyên phải được xác định bằng URI
* **Resource manipulation through representations**: Thao tác với tài nguyên thông qua biểu diễn
* **Self-descriptive messages**: Tin nhắn tự mô tả
* **HATEOAS**: Hypermedia as the Engine of Application State

**Ví dụ**: Giao diện đồng nhất trên HTTP sử dụng các động từ chuẩn (GET, POST, PUT, DELETE) và URI để xác định tài nguyên.

**Lợi ích**:

* Đơn giản hóa kiến trúc
* Cải thiện khả năng quan sát (visibility)
* Tăng khả năng mở rộng và bảo trì

### 3. Resource Identification (Nhận dạng tài nguyên)

Trong REST, mọi thông tin được coi là một tài nguyên, và mỗi tài nguyên phải có định danh duy nhất, thường là URI.

**Ví dụ**:

* `/patients/12345` - Thông tin bệnh nhân có ID 12345
* `/medications/aspirin` - Thông tin về thuốc aspirin
* `/lab-results/67890` - Kết quả xét nghiệm có ID 67890

**Thiết kế URI tốt**:

* Sử dụng danh từ số nhiều cho tài nguyên (ví dụ: `/patients` thay vì `/patient`)
* Thiết kế phân cấp logic (ví dụ: `/patients/12345/lab-results`)
* Tránh động từ trong URI (thay vào đó, sử dụng HTTP methods)
* Sử dụng dấu gạch ngang `-` thay vì dấu gạch dưới `_`

### 4. Resource Manipulation through Representations (Thao tác tài nguyên thông qua biểu diễn)

Khi client có URI của tài nguyên, họ có thể sửa đổi hoặc xóa tài nguyên đó nếu có quyền. Client tương tác với tài nguyên thông qua biểu diễn của nó.

**Ví dụ**:

* Một bệnh nhân (tài nguyên) có thể được biểu diễn dưới dạng JSON, XML, HTML, v.v.
* Client sử dụng các phương thức HTTP để thao tác:
  * `GET /patients/12345` - Lấy thông tin bệnh nhân
  * `PUT /patients/12345` - Cập nhật thông tin bệnh nhân
  * `DELETE /patients/12345` - Xóa bệnh nhân khỏi hệ thống

**Phương thức HTTP và ngữ nghĩa**:

* `GET`: Lấy tài nguyên (idempotent)
* `POST`: Tạo tài nguyên mới
* `PUT`: Cập nhật tài nguyên (idempotent)
* `DELETE`: Xóa tài nguyên (idempotent)
* `PATCH`: Cập nhật một phần tài nguyên

### 5. Self-descriptive Messages (Tin nhắn tự mô tả)

Mỗi tin nhắn (request/response) phải chứa đủ thông tin để hiểu cách xử lý nó.

**Ví dụ**:

* Sử dụng HTTP headers để mô tả định dạng dữ liệu: `Content-Type: application/json`
* Status codes HTTP để truyền đạt kết quả: `200 OK`, `404 Not Found`, `500 Internal Server Error`
* Sử dụng định dạng tiêu chuẩn: JSON, XML

**HTTP request tự mô tả**:

```
GET /patients/12345 HTTP/1.1
Host: hospital-api.example.com
Accept: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**HTTP response tự mô tả**:

```
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: max-age=3600

{
  "id": "12345",
  "name": "John Doe",
  "dateOfBirth": "1980-01-01",
  "bloodType": "A+"
}
```

### 6. HATEOAS (Hypermedia as the Engine of Application State)

HATEOAS là nguyên tắc cho rằng client tương tác với ứng dụng hoàn toàn thông qua hypermedia được server cung cấp động.

**Ví dụ**:

```json
{
  "id": "12345",
  "name": "John Doe",
  "links": [
    {
      "rel": "self",
      "href": "/patients/12345"
    },
    {
      "rel": "lab-results",
      "href": "/patients/12345/lab-results"
    },
    {
      "rel": "prescriptions",
      "href": "/patients/12345/prescriptions"
    }
  ]
}
```

**Lợi ích của HATEOAS**:

* Giảm sự phụ thuộc giữa client và server
* Client có thể điều hướng API mà không cần biết trước tất cả endpoints
* Server có thể phát triển độc lập, thay đổi URI mà không ảnh hưởng đến client (chỉ cần cập nhật các liên kết)
* Tăng khả năng khám phá API

### Tổng kết

Tuân thủ các nguyên tắc REST giúp xây dựng API có khả năng mở rộng, dễ bảo trì và linh hoạt. Tuy nhiên, không phải lúc nào cũng cần tuân thủ nghiêm ngặt tất cả các nguyên tắc - đôi khi, chúng ta có thể chấp nhận những thỏa hiệp hợp lý.

Hầu hết các API hiện đại tự gọi mình là "RESTful" mặc dù không tuân thủ hoàn toàn các nguyên tắc của REST, đặc biệt là HATEOAS. Điều quan trọng là hiểu các nguyên tắc này và quyết định áp dụng chúng ở mức độ nào phù hợp với yêu cầu cụ thể của dự án.

Trong series tiếp theo, chúng ta sẽ khám phá cách triển khai các nguyên tắc REST trong các dự án thực tế và so sánh với các kiến trúc API khác như GraphQL và gRPC.
