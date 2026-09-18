---
id: dab3692b-510d-449a-aff7-7f00fe5163a8
title: 'Nguyên tắc thiết kế FHIR'
slug: nguyen-tac-thiet-ke-fhir
description: 'Nguyên tắc thiết kế FHIR: Nền tảng của tiêu chuẩn y tế hiện đại'
duration_minutes: 15
is_free: true
video_url: null
sort_order: 2
section_title: 'Phần 1: Giới thiệu HL7 R5'
course:
  id: 019e3a00-0000-7001-e001-hl7r5000001
  title: 'HL7 FHIR R5 Chuyên Sâu — Reference & Thực hành'
  slug: hl7-fhir-r5-chuyen-sau
---
Nguyên tắc thiết kế FHIR: Nền tảng của tiêu chuẩn y tế hiện đại

FHIR (Fast Healthcare Interoperability Resources) đã trở thành tiêu chuẩn thông tin y tế hiện đại nhất, mang lại sự thay đổi lớn cho cách các hệ thống y tế trao đổi dữ liệu. Trong bài viết này, tôi sẽ phân tích các nguyên tắc thiết kế cốt lõi đằng sau FHIR, đồng thời giải thích tại sao chúng lại quan trọng đối với các nhà phát triển và các tổ chức y tế.

### 80/20 rule trong thiết kế tài nguyên

![HL7 FHIR R5](/storage/uploads/hl7-r5/root/image_2_1_1_.webp)

Nguyên tắc Pareto (hay quy tắc 80/20) là một trong những nền tảng quan trọng nhất trong thiết kế FHIR. Cách tiếp cận này công nhận rằng:

**20% công sức có thể giải quyết 80% vấn đề.**

#### Ví dụ thực tế về 80/20 rule:

**1. Resource Patient trong FHIR so với HL7 v2:**

FHIR Patient resource chỉ tập trung vào:

```json
{
  "resourceType": "Patient",
  "id": "example",
  "name": [
    {
      "use": "official",
      "family": "Đặng",
      "given": ["Thanh", "Tùng"]
    }
  ],
  "gender": "male",
  "birthDate": "1974-12-25",
  "address": [
    {
      "use": "home",
      "line": ["456 Nguyễn Huệ"],
      "city": "Hà Nội",
      "country": "Việt Nam"
    }
  ],
  "telecom": [
    {
      "system": "phone",
      "value": "0912345678",
      "use": "mobile"
    }
  ]
}
```

Trong khi đó, một segment PID trong HL7 v2 chứa hàng chục fields, nhiều field không được sử dụng thường xuyên:

```
PID|1||MR12345^^^HIS||Đặng^Thanh^Tùng^^^||19741225|M|||456 Nguyễn Huệ^^Hà Nội^^100000^Việt Nam||0912345678^PRN^PH^^^84^0912345678||VI|M|BUDD|||||Việt Nam|||||N||...
```

**2. Cách mở rộng trong FHIR:**

Nếu cần thêm thông tin hiếm khi sử dụng, FHIR sử dụng cơ chế extension thay vì thêm thuộc tính vào tài nguyên cốt lõi:

```json
{
  "resourceType": "Patient",
  "id": "example",
  "name": [
    {
      "use": "official",
      "family": "Đặng",
      "given": ["Thanh", "Tùng"]
    }
  ],
  "gender": "male",
  "birthDate": "1974-12-25",
  "extension": [
    {
      "url": "http://example.org/fhir/StructureDefinition/nhom-mau",
      "valueString": "O+"
    },
    {
      "url": "http://example.org/fhir/StructureDefinition/ma-so-BHYT",
      "valueString": "BHYT1234567890"
    }
  ]
}
```

### Implementer-friendly approach

FHIR được thiết kế với triết lý "implementer-friendly" (thân thiện với người triển khai) - đặt nhu cầu của nhà phát triển phần mềm lên hàng đầu.

#### Ví dụ về tính thân thiện với nhà phát triển:

**1. Truy vấn Observation trong FHIR:**

Một truy vấn đơn giản để lấy tất cả các kết quả glucose của bệnh nhân:

```
GET https://hospital-api.org/fhir/Observation?patient=123&code=2339-0
```

Phản hồi được trả về dưới dạng JSON tương tự như các API REST hiện đại khác:

```json
{
  "resourceType": "Bundle",
  "type": "searchset",
  "entry": [
    {
      "resource": {
        "resourceType": "Observation",
        "id": "blood-glucose-1",
        "status": "final",
        "code": {
          "coding": [
            {
              "system": "http://loinc.org",
              "code": "2339-0",
              "display": "Glucose [Mass/volume] in Blood"
            }
          ]
        },
        "subject": {
          "reference": "Patient/123"
        },
        "effectiveDateTime": "2023-04-10T09:30:00Z",
        "valueQuantity": {
          "value": 6.3,
          "unit": "mmol/L",
          "system": "http://unitsofmeasure.org",
          "code": "mmol/L"
        }
      }
    }
  ]
}
```

So sánh với HL7 v2, nơi bạn phải phân tích cú pháp như:

```
MSH|^~\&|LAB|HIS|CLINIC|CLINIC|20230410093000||ORU^R01|58123|P|2.5
PID|1||123^^^MRN||Đặng^Thanh^Tùng|||M
OBR|1||BG1234|2339-0^Glucose [Mass/volume] in Blood^LN|
OBX|1|NM|2339-0^Glucose [Mass/volume] in Blood^LN||6.3|mmol/L|3.9-6.1|H|||F
```

**2. Xác thực FHIR validate:**

FHIR cung cấp các validator đơn giản cho phép nhà phát triển kiểm tra tính hợp lệ của tài nguyên:

```bash
$ java -jar validator.jar patient-example.json -profile http://hl7.org/fhir/StructureDefinition/Patient

Success: 0 errors, 0 warnings, 1 notes
```

### Sử dụng các công nghệ web hiện đại

![Web Technologies](https://api.placeholder.com/400/320)

FHIR tận dụng các công nghệ web hiện đại và đã được chứng minh là hiệu quả, giúp nó dễ tiếp cận hơn đối với nhà phát triển phần mềm.

#### Ví dụ về việc sử dụng công nghệ web hiện đại:

**1. RESTful API:**

Các thao tác chuẩn CRUD (Create, Read, Update, Delete) trên tài nguyên:

```
# Lấy thông tin bệnh nhân
GET https://hospital-api.org/fhir/Patient/123

# Tạo mới bệnh nhân
POST https://hospital-api.org/fhir/Patient
Content-Type: application/fhir+json
{...}

# Cập nhật bệnh nhân
PUT https://hospital-api.org/fhir/Patient/123
Content-Type: application/fhir+json
{...}

# Xóa bệnh nhân
DELETE https://hospital-api.org/fhir/Patient/123
```

**2. OAuth 2.0 cho bảo mật:**

Một client phần mềm có thể sử dụng OAuth 2.0 để truy cập API FHIR:

```
# 1. Nhận token
POST https://auth-server.org/token
grant_type=authorization_code&
code=AUTH_CODE_HERE&
redirect_uri=https://client-app.org/callback&
client_id=CLIENT_ID

# 2. Sử dụng token để truy cập FHIR API
GET https://hospital-api.org/fhir/Patient/123
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
```

**3. Tìm kiếm và lọc hiện đại:**

FHIR hỗ trợ các tham số tìm kiếm phức tạp tương tự như các API hiện đại:

```
# Tìm tất cả bệnh nhân họ Nguyễn, sắp xếp theo ngày sinh, giới hạn 20 kết quả
GET https://hospital-api.org/fhir/Patient?family=Nguyễn&_sort=birthdate&_count=20

# Tìm tất cả các lần nhập viện trong tháng 3/2023
GET https://hospital-api.org/fhir/Encounter?date=ge2023-03-01&date=lt2023-04-01&status=finished
```

### Xây dựng trên nền tảng của các tiêu chuẩn hiện có

FHIR không cố gắng "phát minh lại bánh xe" mà thay vào đó tích hợp với các tiêu chuẩn hiện có khi có thể.

#### Ví dụ về việc sử dụng tiêu chuẩn hiện có:

**1. Sử dụng mã hóa chuẩn:**

LOINC cho xét nghiệm:

```json
{
  "resourceType": "Observation",
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "8867-4",
        "display": "Nhịp tim"
      }
    ]
  },
  "valueQuantity": {
    "value": 80,
    "unit": "bpm"
  }
}
```

SNOMED CT cho chẩn đoán:

```json
{
  "resourceType": "Condition",
  "code": {
    "coding": [
      {
        "system": "http://snomed.info/sct",
        "code": "44054006",
        "display": "Viêm phổi"
      }
    ]
  }
}
```

**2. Tích hợp với hướng dẫn IHE:**

FHIR có thể triển khai các hồ sơ tương tác IHE như Mobile access to Health Documents (MHD):

```
# Tìm kiếm tài liệu theo IHE MHD sử dụng FHIR
GET https://hospital-api.org/fhir/DocumentReference?patient=123&status=current&_sort=-date
```

**3. Sử dụng các chuẩn bảo mật Internet:**

TLS/SSL là bắt buộc cho giao tiếp FHIR:

```
# Luôn sử dụng HTTPS
https://hospital-api.org/fhir/Patient/123
```

### Kết luận

Các nguyên tắc thiết kế của FHIR - tập trung vào quy tắc 80/20, thân thiện với người triển khai, sử dụng công nghệ web hiện đại, và xây dựng trên các tiêu chuẩn hiện có - đã biến nó thành một bước tiến lớn trong tiêu chuẩn hóa thông tin y tế. Chúng không chỉ làm cho FHIR dễ học và triển khai hơn, mà còn đảm bảo rằng tiêu chuẩn này sẽ thích ứng được với môi trường công nghệ và y tế luôn thay đổi.

Qua các ví dụ thực tế, chúng ta có thể thấy cách FHIR đã áp dụng thành công các nguyên tắc này để tạo ra một tiêu chuẩn vừa mạnh mẽ vừa dễ sử dụng. Đối với các tổ chức và nhà phát triển đang xem xét áp dụng FHIR, việc hiểu những nguyên tắc này không chỉ giúp triển khai hiệu quả hơn mà còn giúp tận dụng tối đa tiềm năng của tiêu chuẩn để cải thiện khả năng tương tác trong lĩnh vực y tế.
