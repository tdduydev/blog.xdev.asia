---
id: b78af483-c058-4805-984d-d78e88dab1e1
title: 'Content Negotiation FHIR'
slug: content-negotiation-fhir
description: 'Content Negotiation là một khía cạnh quan trọng của FHIR (Fast Healthcare Interoperability Resources), cho phép clients và servers thỏa thuận về định dạng nội dung tốt nhất để trao đổi. Trong bài viết này, chúng ta sẽ…'
duration_minutes: 15
is_free: true
video_url: null
sort_order: 3
section_title: 'Phần 2: RESTful API & FHIR'
course:
  id: 019e3a00-0000-7001-e001-hl7r5000001
  title: 'HL7 FHIR R5 Chuyên Sâu — Reference & Thực hành'
  slug: hl7-fhir-r5-chuyen-sau
---
![Content Negotiation for FHIR](/storage/uploads/hl7-r5/root/image_1_1_.webp)

*Content Negotiation for FHIR*

Content Negotiation là một khía cạnh quan trọng của FHIR (Fast Healthcare Interoperability Resources), cho phép clients và servers thỏa thuận về định dạng nội dung tốt nhất để trao đổi. Trong bài viết này, chúng ta sẽ khám phá chi tiết về content negotiation trong FHIR, bao gồm các định dạng, MIME types, và cách kiểm soát phiên bản thông qua content negotiation.

### 1. JSON vs XML Format

FHIR hỗ trợ cả hai định dạng XML và JSON làm định dạng chính cho tài nguyên. Mỗi định dạng có những ưu điểm và nhược điểm riêng, và lựa chọn giữa chúng thường phụ thuộc vào đặc điểm kỹ thuật và hệ sinh thái hiện có của ứng dụng.

#### JSON Format

JSON (JavaScript Object Notation) đã trở thành định dạng phổ biến nhất cho FHIR do tính nhẹ nhàng và phổ biến trong các ứng dụng web hiện đại.

**Ví dụ tài nguyên Patient trong JSON:**

```json
{
  "resourceType": "Patient",
  "id": "example",
  "meta": {
    "versionId": "1",
    "lastUpdated": "2023-10-25T12:00:00Z"
  },
  "text": {
    "status": "generated",
    "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">John Smith</div>"
  },
  "active": true,
  "name": [
    {
      "use": "official",
      "family": "Smith",
      "given": ["John"]
    }
  ],
  "gender": "male",
  "birthDate": "1974-12-25",
  "address": [
    {
      "use": "home",
      "line": ["123 Main St"],
      "city": "Anytown",
      "state": "CA",
      "postalCode": "12345",
      "country": "USA"
    }
  ]
}
```

**Ưu điểm của JSON:**

* Nhỏ gọn hơn XML (ít ký tự truyền tải hơn)
* Phân tích cú pháp dễ dàng trong JavaScript
* Định dạng phổ biến trong các API web hiện đại
* Dễ đọc và viết cho con người
* Được hỗ trợ tốt trong nhiều ngôn ngữ lập trình

**Nhược điểm của JSON:**

* Không hỗ trợ comments
* Ít hỗ trợ schema validation hơn XML
* Không có namespaces tích hợp

#### XML Format

XML là định dạng truyền thống được sử dụng trong các hệ thống y tế và tiếp tục được FHIR hỗ trợ đầy đủ.

**Ví dụ tài nguyên Patient trong XML:**

```xml
<Patient xmlns="http://hl7.org/fhir">
  <id value="example"/>
  <meta>
    <versionId value="1"/>
    <lastUpdated value="2023-10-25T12:00:00Z"/>
  </meta>
  <text>
    <status value="generated"/>
    <div xmlns="http://www.w3.org/1999/xhtml">John Smith</div>
  </text>
  <active value="true"/>
  <name>
    <use value="official"/>
    <family value="Smith"/>
    <given value="John"/>
  </name>
  <gender value="male"/>
  <birthDate value="1974-12-25"/>
  <address>
    <use value="home"/>
    <line value="123 Main St"/>
    <city value="Anytown"/>
    <state value="CA"/>
    <postalCode value="12345"/>
    <country value="USA"/>
  </address>
</Patient>
```

**Ưu điểm của XML:**

* Hỗ trợ namespaces, giúp phân biệt giữa các phần mở rộng
* Hỗ trợ schema validation tốt (XSD)
* Hỗ trợ các công cụ xử lý như XSLT và XPath
* Có thể chứa comments
* Được sử dụng rộng rãi trong các hệ thống y tế truyền thống

**Nhược điểm của XML:**

* Dài dòng hơn JSON (nhiều bytes hơn để truyền tải cùng một thông tin)
* Khó đọc hơn đối với người không quen thuộc
* Phân tích cú pháp trong JavaScript phức tạp hơn
* Yêu cầu nhiều bộ nhớ hơn khi phân tích

#### So sánh JSON và XML

| Tiêu chí                  | JSON    | XML        |
| ------------------------- | ------- | ---------- |
| Kích thước                | Nhỏ gọn | Lớn hơn    |
| Khả năng đọc              | Tốt     | Trung bình |
| Khả năng phân tích        | Nhanh   | Chậm hơn   |
| Hỗ trợ comments           | Không   | Có         |
| Schema validation         | Hạn chế | Mạnh mẽ    |
| Namespaces                | Không   | Có         |
| Phổ biến trong web APIs   | Rất cao | Trung bình |
| Hỗ trợ cho legacy systems | Hạn chế | Tốt        |

#### Tương thích giữa JSON và XML

FHIR được thiết kế để đảm bảo ánh xạ 1:1 giữa cả hai định dạng, có nghĩa là bất kỳ tài nguyên FHIR nào cũng có thể được chuyển đổi từ JSON sang XML hoặc ngược lại mà không mất thông tin. Tuy nhiên, có một số khác biệt tinh tế cần lưu ý:

* Trong XML, tất cả các giá trị primitive đều được gói trong thuộc tính `value`, trong khi JSON sử dụng trực tiếp giá trị
* XML cần các namespace để phân biệt giữa các phần mở rộng, trong khi JSON không có khái niệm này

### 2. MIME Types và Accept Header

Content negotiation trong FHIR chủ yếu dựa vào các MIME types và HTTP headers để quyết định định dạng nội dung.

#### MIME Types chính trong FHIR

| MIME Type                     | Mô tả                        | Ví dụ sử dụng                                       |
| ----------------------------- | ---------------------------- | --------------------------------------------------- |
| `application/fhir+json`       | FHIR Resource trong JSON     | Biểu diễn tiêu chuẩn cho tài nguyên FHIR trong JSON |
| `application/fhir+xml`        | FHIR Resource trong XML      | Biểu diễn tiêu chuẩn cho tài nguyên FHIR trong XML  |
| `application/json`            | JSON không đặc biệt hóa FHIR | Tương thích với các hệ thống JSON cũ hơn            |
| `application/xml`             | XML không đặc biệt hóa FHIR  | Tương thích với các hệ thống XML cũ hơn             |
| `text/html`                   | Biểu diễn HTML               | Giúp hiển thị dữ liệu FHIR trong trình duyệt        |
| `application/json-patch+json` | JSON Patch                   | Sử dụng cho các hoạt động PATCH                     |
| `application/fhir+turtle`     | RDF Turtle                   | Biểu diễn ngữ nghĩa (RDF) của tài nguyên FHIR       |
| `application/fhir+n-triples`  | RDF N-Triples                | Biểu diễn ngữ nghĩa (RDF) của tài nguyên FHIR       |

#### Sử dụng HTTP Accept Header

Header `Accept` cho phép client chỉ định định dạng mong muốn trong response. Server sẽ cố gắng cung cấp dữ liệu ở định dạng được yêu cầu, hoặc trả về lỗi `406 Not Acceptable` nếu không thể.

**Ví dụ các Accept headers:**

```
Accept: application/fhir+json
```

Yêu cầu FHIR JSON.

```
Accept: application/fhir+xml
```

Yêu cầu FHIR XML.

```
Accept: application/fhir+json; application/fhir+xml; q=0.9
```

Ưu tiên JSON, nhưng XML cũng chấp nhận được với chất lượng thấp hơn.

```
Accept: application/fhir+json; fhirVersion=4.0
```

Yêu cầu FHIR JSON với phiên bản FHIR 4.0.

#### Content-Type Header

Khi gửi dữ liệu đến server (POST, PUT), client phải chỉ định loại nội dung đang gửi bằng header `Content-Type`:

```
Content-Type: application/fhir+json
```

```
Content-Type: application/fhir+xml
```

Nếu không chỉ định `Content-Type`, server có thể từ chối request với lỗi `415 Unsupported Media Type`.

#### Ví dụ Content Negotiation

**Request:**

```
GET /fhir/Patient/example
Host: server.example.com
Accept: application/fhir+json
```

**Response:**

```
HTTP/1.1 200 OK
Content-Type: application/fhir+json
Content-Length: 1287

{
  "resourceType": "Patient",
  "id": "example",
  ...
}
```

### 3. \_format Parameter

Ngoài việc sử dụng header `Accept`, FHIR cũng hỗ trợ cơ chế thay thế thông qua tham số URL `_format` để chỉ định định dạng mong muốn. Điều này hữu ích trong các tình huống khi không thể kiểm soát HTTP headers, như khi sử dụng trình duyệt web đơn giản.

#### Giá trị \_format được hỗ trợ

| Giá trị \_format   | Tương đương với MIME Type |
| ------------------ | ------------------------- |
| `json`             | `application/fhir+json`   |
| `xml`              | `application/fhir+xml`    |
| `application/json` | `application/json`        |
| `application/xml`  | `application/xml`         |
| `text/html`        | `text/html`               |

#### Ví dụ sử dụng \_format

```
GET /fhir/Patient/example?_format=json
```

Yêu cầu tài nguyên ở định dạng JSON.

```
GET /fhir/Patient/example?_format=xml
```

Yêu cầu tài nguyên ở định dạng XML.

```
GET /fhir/Patient/example?_format=application/fhir%2Bjson
```

Sử dụng MIME type đầy đủ (URL encoded).

#### Ưu tiên giữa Accept header và \_format

Khi cả hai đều được sử dụng, FHIR đặc tả khuyến nghị ưu tiên tham số `_format` hơn header `Accept`. Tuy nhiên, một số triển khai có thể khác nhau, vì vậy hãy kiểm tra tài liệu của server cụ thể.

### 4. Versioning through Content Negotiation

FHIR sử dụng content negotiation không chỉ để chọn định dạng dữ liệu mà còn để chọn phiên bản của đặc tả FHIR. Điều này cho phép client yêu cầu một phiên bản cụ thể của tài nguyên FHIR.

#### Phiên bản của FHIR Specification

FHIR có các phiên bản chính thức, như:

* DSTU1 (0.0.82)
* DSTU2 (1.0.2)
* STU3 (3.0.2)
* R4 (4.0.1)
* R4B (4.3.0)
* R5 (5.0.0)

Mỗi phiên bản có thể có cấu trúc tài nguyên và quy tắc khác nhau.

#### Chỉ định phiên bản thông qua Accept header

Client có thể chỉ định phiên bản FHIR mong muốn bằng cách sử dụng tham số `fhirVersion` trong header `Accept`:

```
Accept: application/fhir+json; fhirVersion=4.0
```

```
Accept: application/fhir+xml; fhirVersion=3.0
```

#### Chỉ định phiên bản thông qua \_format

Phiên bản có thể được chỉ định thông qua tham số `_format` kết hợp với tham số `_fhirVersion`:

```
GET /fhir/Patient/example?_format=json&_fhirVersion=4.0
```

#### Versioning trong FHIR Capabilities Statement

Server FHIR phải khai báo các phiên bản được hỗ trợ trong Capabilities Statement (trước đây gọi là Conformance Statement). Client có thể truy vấn điểm cuối `/metadata` để xác định các phiên bản được hỗ trợ:

```
GET /fhir/metadata
Accept: application/fhir+json
```

**Ví dụ response:**

```json
{
  "resourceType": "CapabilityStatement",
  "status": "active",
  "date": "2023-10-25",
  "fhirVersion": "4.0.1",
  "format": [
    "application/fhir+json",
    "application/fhir+xml"
  ],
  "implementationGuide": [
    "http://hl7.org/fhir/us/core/ImplementationGuide/hl7.fhir.us.core"
  ],
  ...
}
```

#### Versioning trong tài nguyên cụ thể

Ngoài phiên bản của đặc tả FHIR, mỗi tài nguyên FHIR cũng có phiên bản riêng, được theo dõi thông qua phần tử `meta.versionId`. Để truy cập phiên bản cụ thể của tài nguyên, sử dụng cú pháp:

```
GET /fhir/Patient/example/_history/2
```

Điều này khác với versioning thông qua content negotiation vì nó đề cập đến phiên bản cụ thể của tài nguyên, không phải phiên bản của đặc tả FHIR.

### Các kịch bản Content Negotiation phổ biến

#### 1. Chuyển đổi từ hệ thống cũ sang FHIR

Một hệ thống cũ có thể không hỗ trợ MIME types đặc biệt của FHIR:

**Request:**

```
GET /fhir/Patient/example
Accept: application/xml
```

**Response:**

```
HTTP/1.1 200 OK
Content-Type: application/xml
...
```

#### 2. Client và Server với khả năng FHIR đầy đủ

**Request:**

```
GET /fhir/Patient/example
Accept: application/fhir+json; fhirVersion=4.0
```

**Response:**

```
HTTP/1.1 200 OK
Content-Type: application/fhir+json; fhirVersion=4.0
...
```

#### 3. Trình duyệt web truy cập trực tiếp

**Request:**

```
GET /fhir/Patient/example?_format=html
```

**Response:**

```
HTTP/1.1 200 OK
Content-Type: text/html
...
```

#### 4. Fallback nếu định dạng yêu cầu không khả dụng

**Request:**

```
GET /fhir/Patient/example
Accept: application/fhir+turtle, application/fhir+json;q=0.9
```

Server không hỗ trợ Turtle nhưng cung cấp JSON như là fallback:

**Response:**

```
HTTP/1.1 200 OK
Content-Type: application/fhir+json
...
```

### Thực hành tốt nhất cho Content Negotiation

#### Cho Client

1. **Luôn chỉ định Accept header**: Để đảm bảo nhận được định dạng mong muốn
2. **Cung cấp fallback formats**: Sử dụng `q` parameter để chỉ định ưu tiên
3. **Xử lý 406 Not Acceptable**: Chuẩn bị xử lý khi server không thể đáp ứng yêu cầu định dạng
4. **Kiểm tra phiên bản FHIR**: Chỉ định `fhirVersion` nếu ứng dụng của bạn phụ thuộc vào phiên bản cụ thể
5. **Kiểm tra Content-Type trong response**: Đảm bảo xử lý chính xác định dạng nhận được

#### Cho Server

1. **Hỗ trợ cả JSON và XML**: Để tương thích tối đa với nhiều loại clients
2. **Triển khai \_format parameter**: Hỗ trợ các clients không thể kiểm soát HTTP headers
3. **Xử lý yêu cầu không có Accept header**: Thường trả về định dạng mặc định (JSON)
4. **Khai báo định dạng hỗ trợ**: Trong Capabilities Statement
5. **Cung cấp triển khai HTML**: Cho phép trình duyệt hiển thị dữ liệu FHIR một cách thân thiện

### Tổng kết

Content negotiation là một khía cạnh quan trọng của FHIR, cho phép clients và servers giao tiếp hiệu quả bằng các định dạng khác nhau. Hiểu và triển khai đúng content negotiation sẽ cải thiện khả năng tương tác giữa các hệ thống y tế khác nhau.

Các điểm chính cần nhớ:

* FHIR hỗ trợ đầy đủ cả JSON và XML với ánh xạ 1:1 giữa hai định dạng
* Content negotiation được thực hiện chủ yếu thông qua HTTP Accept header và tham số \_format
* Versioning có thể được quản lý thông qua content negotiation
* Tuân thủ thực hành tốt nhất về content negotiation sẽ cải thiện khả năng tương tác và độ tin cậy của ứng dụng FHIR

Trong series tiếp theo, chúng ta sẽ khám phá các khía cạnh khác của FHIR, bao gồm profile, extensions, và triển khai các hoạt động search nâng cao.
