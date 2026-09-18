---
id: 7c40ccc8-c6ce-47f2-ae99-221b54d640c9
title: 'HTTP & FHIR REST API'
slug: http-and-fhir-rest-api
description: 'HIR (Fast Healthcare Interoperability Resources) là tiêu chuẩn trao đổi dữ liệu y tế được phát triển bởi HL7 International. FHIR kết hợp các ưu điểm của các tiêu chuẩn HL7 trước đó (v2.x, v3, CDA) và áp dụng các phương…'
duration_minutes: 15
is_free: true
video_url: null
sort_order: 2
section_title: 'Phần 2: RESTful API & FHIR'
course:
  id: 019e3a00-0000-7001-e001-hl7r5000001
  title: 'HL7 FHIR R5 Chuyên Sâu — Reference & Thực hành'
  slug: hl7-fhir-r5-chuyen-sau
---
HIR (Fast Healthcare Interoperability Resources) là tiêu chuẩn trao đổi dữ liệu y tế được phát triển bởi HL7 International. FHIR kết hợp các ưu điểm của các tiêu chuẩn HL7 trước đó (v2.x, v3, CDA) và áp dụng các phương pháp hiện đại dựa trên web RESTful API. Bài viết này sẽ phân tích chi tiết về cách FHIR sử dụng HTTP để xây dựng REST API.

### 1. HTTP Methods trong FHIR (GET, POST, PUT, DELETE, PATCH)

FHIR REST API sử dụng các phương thức HTTP tiêu chuẩn để thao tác với tài nguyên y tế. Mỗi phương thức có vai trò và quy tắc sử dụng riêng.

![HTTP Methods in FHIR](/storage/uploads/hl7-r5/root/image_8_.webp)

*HTTP Methods in FHIR*

#### GET

GET được sử dụng để đọc (truy xuất) tài nguyên FHIR. Đây là phương thức phổ biến nhất và là phương thức duy nhất mà mọi server FHIR đều phải hỗ trợ.

**Ví dụ:**

```
GET https://server.example.com/fhir/Patient/123456
```

**Các biến thể GET:**

* **Read:** Lấy một tài nguyên cụ thể theo ID
* **Vread:** Lấy một phiên bản cụ thể của tài nguyên
* **Search:** Tìm kiếm tài nguyên theo các tham số
* **History:** Lấy lịch sử thay đổi của tài nguyên
* **Capabilities:** Lấy thông tin về khả năng của server

**Đặc điểm:**

* Idempotent (thực hiện nhiều lần cho kết quả giống nhau)
* Không thay đổi dữ liệu trên server
* Có thể được cache

#### POST

POST được sử dụng để tạo tài nguyên mới hoặc thực hiện các hoạt động phức tạp.

**Ví dụ tạo tài nguyên mới:**

```
POST https://server.example.com/fhir/Patient
Content-Type: application/fhir+json

{
  "resourceType": "Patient",
  "name": [
    {
      "family": "Nguyễn",
      "given": ["Văn", "A"]
    }
  ],
  "gender": "male",
  "birthDate": "1974-12-25"
}
```

**Các biến thể POST:**

* **Create:** Tạo tài nguyên mới
* **Transaction/Batch:** Xử lý nhiều tài nguyên trong một request
* **Operation:** Thực hiện các hoạt động tùy chỉnh (ví dụ: `$everything`, `$validate`)
* **Search:** Tìm kiếm phức tạp với nhiều tham số

**Đặc điểm:**

* Không idempotent (có thể tạo ra nhiều tài nguyên khi thực hiện nhiều lần)
* Thay đổi dữ liệu trên server
* Không được cache

#### PUT

PUT được sử dụng để cập nhật tài nguyên hiện có hoặc tạo tài nguyên với ID được chỉ định.

**Ví dụ:**

```
PUT https://server.example.com/fhir/Patient/123456
Content-Type: application/fhir+json

{
  "resourceType": "Patient",
  "id": "123456",
  "name": [
    {
      "family": "Nguyễn",
      "given": ["Văn", "A"]
    }
  ],
  "gender": "male",
  "birthDate": "1974-12-25",
  "telecom": [
    {
      "system": "phone",
      "value": "+84123456789",
      "use": "mobile"
    }
  ]
}
```

**Đặc điểm:**

* Idempotent (thực hiện nhiều lần cho kết quả giống nhau)
* Yêu cầu phải chứa toàn bộ tài nguyên (không cập nhật một phần)
* Client cần biết ID của tài nguyên
* Thay thế hoàn toàn tài nguyên hiện có

#### DELETE

DELETE được sử dụng để xóa tài nguyên FHIR. Trong FHIR, việc xóa có thể là "logical delete" (đánh dấu là đã xóa nhưng vẫn giữ trong lịch sử) hoặc "physical delete" (xóa hoàn toàn).

**Ví dụ:**

```
DELETE https://server.example.com/fhir/Patient/123456
```

**Đặc điểm:**

* Idempotent (thực hiện nhiều lần cho kết quả giống nhau)
* Server có thể từ chối xóa tài nguyên nếu có ràng buộc tham chiếu
* Nhiều server FHIR thực hiện "logical delete" thay vì xóa hoàn toàn

#### PATCH

PATCH được sử dụng để cập nhật một phần tài nguyên. Đây là phương thức tùy chọn trong FHIR và không phải tất cả server đều hỗ trợ.

**Ví dụ sử dụng JSON Patch:**

```
PATCH https://server.example.com/fhir/Patient/123456
Content-Type: application/json-patch+json

[
  { "op": "replace", "path": "/gender", "value": "female" },
  { "op": "add", "path": "/telecom/0/value", "value": "+84987654321" }
]
```

**Đặc điểm:**

* Không idempotent (kết quả phụ thuộc vào trạng thái hiện tại của tài nguyên)
* Chỉ cập nhật các trường được chỉ định
* FHIR hỗ trợ nhiều định dạng patch: JSON Patch, FHIRPath Patch, XML Patch

### 2. HTTP Status Codes và Ý nghĩa trong FHIR

FHIR sử dụng các mã trạng thái HTTP tiêu chuẩn để truyền đạt kết quả của các hoạt động API. Hiểu được các mã này là cần thiết để xử lý lỗi và xác nhận thành công trong ứng dụng FHIR.

####

![HTTP Status Codes](/storage/uploads/hl7-r5/root/image_9_.webp)

*HTTP Status Codes*

#### Mã thành công (2xx)

| Mã  | Tên        | Ý nghĩa trong FHIR                                                                  |
| --- | ---------- | ----------------------------------------------------------------------------------- |
| 200 | OK         | Request thành công và response chứa tài nguyên được yêu cầu (GET, PUT, POST-search) |
| 201 | Created    | Tài nguyên mới đã được tạo thành công (POST, PUT)                                   |
| 202 | Accepted   | Request đã được chấp nhận để xử lý bất đồng bộ                                      |
| 204 | No Content | Request thành công nhưng không có nội dung trả về (DELETE)                          |

#### Mã chuyển hướng (3xx)

| Mã  | Tên          | Ý nghĩa trong FHIR                                       |
| --- | ------------ | -------------------------------------------------------- |
| 304 | Not Modified | Tài nguyên không thay đổi kể từ lần GET trước (với ETag) |

#### Mã lỗi client (4xx)

| Mã  | Tên                  | Ý nghĩa trong FHIR                                                 |
| --- | -------------------- | ------------------------------------------------------------------ |
| 400 | Bad Request          | Request không hợp lệ (ví dụ: JSON/XML không đúng định dạng)        |
| 401 | Unauthorized         | Authentication cần thiết nhưng không được cung cấp                 |
| 403 | Forbidden            | Người dùng đã xác thực nhưng không có quyền truy cập               |
| 404 | Not Found            | Tài nguyên không tồn tại                                           |
| 405 | Method Not Allowed   | Phương thức HTTP không được hỗ trợ cho tài nguyên này              |
| 409 | Conflict             | Xung đột khi cập nhật tài nguyên (ví dụ: version mismatch)         |
| 412 | Precondition Failed  | Điều kiện tiên quyết không thỏa mãn (thường liên quan đến version) |
| 422 | Unprocessable Entity | Tài nguyên không vượt qua validation                               |
| 429 | Too Many Requests    | Client gửi quá nhiều requests (rate limiting)                      |

#### Mã lỗi server (5xx)

| Mã  | Tên                   | Ý nghĩa trong FHIR                                               |
| --- | --------------------- | ---------------------------------------------------------------- |
| 500 | Internal Server Error | Lỗi server không xác định                                        |
| 501 | Not Implemented       | Server không hỗ trợ chức năng được yêu cầu                       |
| 503 | Service Unavailable   | Server tạm thời không khả dụng (quá tải hoặc bảo trì)            |
| 504 | Gateway Timeout       | Server FHIR không nhận được response kịp thời từ upstream server |

#### OperationOutcome

Khi có lỗi, FHIR thường trả về tài nguyên `OperationOutcome` để cung cấp thông tin chi tiết về lỗi.

**Ví dụ:**

```json
{
  "resourceType": "OperationOutcome",
  "issue": [
    {
      "severity": "error",
      "code": "processing",
      "diagnostics": "Patient resource could not be updated due to version conflict"
    }
  ]
}
```

### 3. HTTP Headers phổ biến trong FHIR

FHIR sử dụng nhiều HTTP headers để điều khiển hành vi của API và cung cấp metadata.

![HTTP Headers](/storage/uploads/hl7-r5/root/image_11_.webp)

*HTTP Headers*

#### Headers trong Request

| Header            | Mục đích                                   | Ví dụ                                               |
| ----------------- | ------------------------------------------ | --------------------------------------------------- |
| Content-Type      | Định dạng của dữ liệu trong request body   | `Content-Type: application/fhir+json`               |
| Accept            | Định dạng dữ liệu mong muốn trong response | `Accept: application/fhir+json`                     |
| Authorization     | Thông tin xác thực (thường là token)       | `Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5...` |
| If-None-Match     | Chỉ trả về nếu khác với ETag đã cho        | `If-None-Match: W/"3"`                              |
| If-Modified-Since | Chỉ trả về nếu thay đổi sau thời điểm      | `If-Modified-Since: Wed, 21 Oct 2023 07:28:00 GMT`  |
| If-Match          | Chỉ thực hiện nếu version/ETag khớp        | `If-Match: W/"2"`                                   |
| Prefer            | Tùy chọn xử lý cho server                  | `Prefer: return=minimal`                            |

#### Headers trong Response

| Header           | Mục đích                                    | Ví dụ                                                                 |
| ---------------- | ------------------------------------------- | --------------------------------------------------------------------- |
| Content-Type     | Định dạng của dữ liệu trong response body   | `Content-Type: application/fhir+json; charset=utf-8`                  |
| Location         | URI của tài nguyên mới tạo                  | `Location: https://server.example.com/fhir/Patient/123456/_history/1` |
| ETag             | Version identifier của tài nguyên           | `ETag: W/"3"`                                                         |
| Last-Modified    | Thời điểm tài nguyên được cập nhật lần cuối | `Last-Modified: Wed, 21 Oct 2023 07:28:00 GMT`                        |
| Content-Location | Canonical URL của tài nguyên được trả về    | `Content-Location: https://server.example.com/fhir/Patient/123456`    |

#### FHIR-Specific Headers

| Header               | Mục đích                          | Ví dụ                                                     |
| -------------------- | --------------------------------- | --------------------------------------------------------- |
| X-FHIR-Request-ID    | ID duy nhất cho request (tracing) | `X-FHIR-Request-ID: 60e0b5d2-c396-4be7-a614-9b3476631051` |
| X-FHIR-Forwarded-For | Tương tự như X-Forwarded-For      | `X-FHIR-Forwarded-For: 203.0.113.195`                     |

### 4. Request và Response Structure

Cấu trúc của request và response FHIR tuân theo chuẩn HTTP với một số quy ước đặc biệt.

#### Request Structure

**1. URL Structure:**

FHIR URL có cấu trúc chung như sau:

```
[base]/[resource-type]/[id]{?[parameters]}
```

Ví dụ:

* `https://server.example.com/fhir/Patient` - Tất cả bệnh nhân
* `https://server.example.com/fhir/Patient/123456` - Bệnh nhân cụ thể
* `https://server.example.com/fhir/Patient?name=nguyễn&gender=male` - Tìm kiếm
* `https://server.example.com/fhir/Patient/123456/_history/2` - Version cụ thể
* `https://server.example.com/fhir/Patient/123456/$everything` - Operation

**2. Headers:**

```
GET https://server.example.com/fhir/Patient/123456
Accept: application/fhir+json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**3. Body (cho POST, PUT, PATCH):**

```json
{
  "resourceType": "Patient",
  "id": "123456",
  "meta": {
    "versionId": "2",
    "lastUpdated": "2023-10-21T07:28:00Z"
  },
  "name": [
    {
      "family": "Nguyễn",
      "given": ["Văn", "A"]
    }
  ],
  "gender": "male",
  "birthDate": "1974-12-25"
}
```

#### Response Structure

**1. Headers:**

```
HTTP/1.1 200 OK
Content-Type: application/fhir+json; charset=utf-8
ETag: W/"3"
Last-Modified: Wed, 21 Oct 2023 07:28:00 GMT
```

**2. Body:**

```json
{
  "resourceType": "Patient",
  "id": "123456",
  "meta": {
    "versionId": "3",
    "lastUpdated": "2023-10-21T07:28:00Z"
  },
  "name": [
    {
      "family": "Nguyễn",
      "given": ["Văn", "A"]
    }
  ],
  "gender": "male",
  "birthDate": "1974-12-25",
  "telecom": [
    {
      "system": "phone",
      "value": "+84123456789",
      "use": "mobile"
    }
  ]
}
```

#### Bundles

Khi trả về nhiều tài nguyên (ví dụ từ một search), FHIR sử dụng tài nguyên Bundle:

```json
{
  "resourceType": "Bundle",
  "id": "bundle-example",
  "type": "searchset",
  "total": 2,
  "link": [
    {
      "relation": "self",
      "url": "https://server.example.com/fhir/Patient?name=nguyễn"
    },
    {
      "relation": "next",
      "url": "https://server.example.com/fhir/Patient?name=nguyễn&page=2"
    }
  ],
  "entry": [
    {
      "fullUrl": "https://server.example.com/fhir/Patient/123456",
      "resource": {
        "resourceType": "Patient",
        "id": "123456",
        "name": [
          {
            "family": "Nguyễn",
            "given": ["Văn", "A"]
          }
        ]
      },
      "search": {
        "score": 0.9
      }
    },
    {
      "fullUrl": "https://server.example.com/fhir/Patient/789012",
      "resource": {
        "resourceType": "Patient",
        "id": "789012",
        "name": [
          {
            "family": "Nguyễn",
            "given": ["Thị", "B"]
          }
        ]
      },
      "search": {
        "score": 0.8
      }
    }
  ]
}
```

#### Các loại Bundle

FHIR sử dụng các loại Bundle khác nhau cho các mục đích khác nhau:

| Loại        | Mục đích                                         |
| ----------- | ------------------------------------------------ |
| searchset   | Kết quả của một search operation                 |
| transaction | Tập hợp các requests thực hiện như một giao dịch |
| batch       | Tập hợp các requests thực hiện tuần tự           |
| history     | Lịch sử của tài nguyên                           |
| document    | Bundle đại diện cho một tài liệu lâm sàng        |
| message     | Bundle đại diện cho một FHIR message             |
| collection  | Collection của các tài nguyên                    |

### Tổng kết

FHIR REST API dựa trên các nguyên tắc HTTP chuẩn nhưng thêm vào các quy tắc và quy ước đặc biệt cho dữ liệu y tế. Hiểu rõ cách sử dụng các HTTP methods, status codes, headers, và cấu trúc request/response là nền tảng để phát triển và tích hợp thành công với các hệ thống FHIR.

Các điểm quan trọng cần nhớ:

1. FHIR sử dụng các phương thức HTTP tiêu chuẩn (GET, POST, PUT, DELETE, PATCH) với ngữ nghĩa rõ ràng
2. Các mã trạng thái HTTP cung cấp thông tin quan trọng về kết quả của request
3. HTTP headers được sử dụng rộng rãi để kiểm soát hành vi và cung cấp metadata
4. Các tài nguyên FHIR có thể được biểu diễn dưới nhiều định dạng (JSON, XML) với cấu trúc chuẩn

Trong phần tiếp theo của series, chúng ta sẽ tìm hiểu sâu hơn về các loại tài nguyên FHIR, các tương tác phức tạp, và cách triển khai FHIR trong các dự án y tế thực tế.
