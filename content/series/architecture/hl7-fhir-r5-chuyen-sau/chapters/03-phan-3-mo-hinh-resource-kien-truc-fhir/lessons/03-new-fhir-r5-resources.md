---
id: 64e84a03-0e78-49f5-adf2-7acafc3517c3
title: 'New FHIR R5 Resources'
slug: new-fhir-r5-resources
description: 'Trong bài viết này, chúng ta sẽ đi sâu vào các tài nguyên mới của FHIR R5, phân tích cấu trúc, cách sử dụng và ví dụ cụ thể cho từng tài nguyên. Bài viết hướng tới các nhà phát triển và kiến trúc sư giải pháp đang làm…'
duration_minutes: 25
is_free: true
video_url: null
sort_order: 3
section_title: 'Phần 3: Mô hình Resource & Kiến trúc FHIR'
course:
  id: 019e3a00-0000-7001-e001-hl7r5000001
  title: 'HL7 FHIR R5 Chuyên Sâu — Reference & Thực hành'
  slug: hl7-fhir-r5-chuyen-sau
---
![New FHIR R5 Resources](/storage/uploads/hl7-r5/root/image_12_.webp)

*New FHIR R5 Resources*

Trong bài viết này, chúng ta sẽ đi sâu vào các tài nguyên mới của FHIR R5, phân tích cấu trúc, cách sử dụng và ví dụ cụ thể cho từng tài nguyên. Bài viết hướng tới các nhà phát triển và kiến trúc sư giải pháp đang làm việc với hệ thống thông tin y tế và mong muốn cập nhật kiến thức về những cải tiến mới nhất trong tiêu chuẩn FHIR.

### RequirementsDefinition (Định nghĩa Yêu cầu)

#### Tổng quan

`RequirementsDefinition` là tài nguyên giúp chúng ta mô hình hóa và tài liệu hóa các yêu cầu nghiệp vụ một cách chính thức. Đây là một bước tiến quan trọng trong việc kết nối giữa các yêu cầu nghiệp vụ và triển khai kỹ thuật.

#### Cấu trúc chính

```json
{
  "resourceType": "RequirementsDefinition",
  "id": "example",
  "status": "draft",
  "name": "yeu-cau-dang-ky-benh-nhan",
  "title": "Yêu cầu Hệ thống Đăng ký Bệnh nhân",
  "description": "Yêu cầu cho module đăng ký bệnh nhân",
  "purpose": "Định nghĩa yêu cầu nghiệp vụ cho quy trình đăng ký bệnh nhân",
  "statement": [
    {
      "key": "YC001",
      "label": "Định danh Bệnh nhân",
      "conformance": "shall",
      "requirement": "Hệ thống phải ghi nhận định danh duy nhất của bệnh nhân"
    },
    {
      "key": "YC002",
      "label": "Phát hiện Trùng lặp",
      "conformance": "should",
      "requirement": "Hệ thống nên triển khai thuật toán phát hiện trùng lặp"
    }
  ]
}
```

#### Trường hợp sử dụng

1. **Tài liệu hóa yêu cầu nghiệp vụ**: Ghi lại các yêu cầu từ các bên liên quan một cách có cấu trúc
2. **Liên kết với triển khai**: Tạo mối liên hệ giữa yêu cầu và các tài nguyên FHIR/profile thực hiện yêu cầu đó
3. **Quản lý sự tuân thủ**: Kiểm tra việc triển khai đáp ứng các yêu cầu đã đặt ra

#### Hướng dẫn triển khai

1. Xác định phạm vi và mục tiêu rõ ràng cho tài liệu yêu cầu
2. Phân loại yêu cầu theo mức độ ưu tiên và tính bắt buộc
3. Sử dụng mức độ tuân thủ chính xác: "shall" (bắt buộc), "should" (khuyến nghị), "may" (tùy chọn)
4. Liên kết với các tài nguyên triển khai thông qua các tham chiếu

#### Ví dụ thực tế

```json
{
  "resourceType": "RequirementsDefinition",
  "id": "yeu-cau-he-thong-thuoc",
  "status": "active",
  "name": "yeu-cau-he-thong-quan-ly-thuoc",
  "title": "Yêu cầu Hệ thống Quản lý Thuốc",
  "statement": [
    {
      "key": "THUOC001",
      "label": "Tương tác Thuốc-Thuốc",
      "conformance": "shall",
      "requirement": "Hệ thống phải kiểm tra tương tác thuốc-thuốc khi kê đơn thuốc mới",
      "derivedFrom": [
        {
          "reference": "DocumentReference/huong-dan-an-toan-2023"
        }
      ],
      "fulfills": [
        {
          "reference": "OperationDefinition/kiem-tra-tuong-tac-thuoc"
        }
      ]
    }
  ]
}
```

### TestPlan, TestScript, TestReport (Kế hoạch Kiểm thử, Kịch bản Kiểm thử, Báo cáo Kiểm thử)

#### TestPlan (Kế hoạch Kiểm thử)

**Tổng quan**

`TestPlan` định nghĩa chiến lược kiểm thử tổng thể, bao gồm phạm vi, mục tiêu và tập hợp các trường hợp kiểm thử cần thực hiện.

**Cấu trúc chính**

```json
{
  "resourceType": "TestPlan",
  "id": "ke-hoach-kiem-thu-api-benh-nhan",
  "status": "active",
  "name": "KeHoachKiemThuAPIBenhNhan",
  "title": "Kế hoạch Kiểm thử cho API Bệnh nhân",
  "description": "Kế hoạch kiểm thử toàn diện cho các endpoint API Bệnh nhân",
  "testCase": [
    {
      "name": "Tạo Bệnh nhân",
      "description": "Kiểm thử tạo mới hồ sơ bệnh nhân",
      "testScript": {
        "reference": "TestScript/kiem-thu-tao-benh-nhan"
      }
    },
    {
      "name": "Tìm kiếm Bệnh nhân",
      "description": "Kiểm thử tìm kiếm bệnh nhân theo nhiều tham số",
      "testScript": {
        "reference": "TestScript/kiem-thu-tim-kiem-benh-nhan"
      }
    }
  ]
}
```

**Trường hợp sử dụng**

1. **Quản lý kiểm thử**: Lập kế hoạch và quản lý tập hợp các kiểm thử cho một hệ thống
2. **Tài liệu hóa chiến lược kiểm thử**: Ghi lại cách tiếp cận kiểm thử và phạm vi
3. **Kiểm tra sự tuân thủ**: Xác minh hệ thống đáp ứng các yêu cầu từ `RequirementsDefinition`

#### TestScript (Kịch bản Kiểm thử)

**Tổng quan**

`TestScript` định nghĩa chi tiết các bước kiểm thử cụ thể, dữ liệu đầu vào và kết quả mong đợi.

**Cấu trúc chính**

```json
{
  "resourceType": "TestScript",
  "id": "kiem-thu-tao-benh-nhan",
  "url": "http://example.org/fhir/TestScript/kiem-thu-tao-benh-nhan",
  "name": "KiemThuTaoBenhNhan",
  "status": "active",
  "fixture": [
    {
      "id": "benh-nhan-mau",
      "resource": {
        "reference": "Patient/mau"
      }
    }
  ],
  "setup": {
    "action": [
      {
        "operation": {
          "type": {
            "system": "http://terminology.hl7.org/CodeSystem/testscript-operation-codes",
            "code": "delete"
          },
          "resource": "Patient",
          "description": "Xóa bệnh nhân mẫu nếu đã tồn tại",
          "encodeRequestUrl": true,
          "params": "?identifier=http://hospital.example.org|BNCM-0001"
        }
      }
    ]
  },
  "test": [
    {
      "id": "01-TaoBenhNhan",
      "name": "Tạo mới bệnh nhân",
      "action": [
        {
          "operation": {
            "type": {
              "system": "http://terminology.hl7.org/CodeSystem/testscript-operation-codes",
              "code": "create"
            },
            "resource": "Patient",
            "description": "Tạo mới hồ sơ bệnh nhân",
            "encodeRequestUrl": true,
            "sourceId": "benh-nhan-mau"
          }
        },
        {
          "assert": {
            "description": "Xác nhận phản hồi HTTP là 201 Created",
            "response": "created",
            "warningOnly": false
          }
        }
      ]
    }
  ]
}
```

**Trường hợp sử dụng**

1. **Kiểm thử tự động**: Tự động hóa kiểm thử các API FHIR
2. **Xác minh sự phù hợp**: Kiểm tra việc triển khai tuân thủ đặc tả
3. **Kiểm thử hồi quy**: Đảm bảo các thay đổi không làm hỏng chức năng hiện có

#### TestReport (Báo cáo Kiểm thử)

**Tổng quan**

`TestReport` ghi lại kết quả của việc thực thi một `TestScript`, cung cấp thông tin chi tiết về các bước đã thực hiện và kết quả.

**Cấu trúc chính**

```json
{
  "resourceType": "TestReport",
  "id": "bao-cao-kiem-thu-benh-nhan-001",
  "status": "completed",
  "testScript": {
    "reference": "TestScript/kiem-thu-tao-benh-nhan"
  },
  "result": "pass",
  "score": 100,
  "tester": "NguyễnVănA",
  "issued": "2023-05-15T14:30:00+07:00",
  "setup": {
    "action": [
      {
        "operation": {
          "result": "pass"
        }
      }
    ]
  },
  "test": [
    {
      "id": "01-TaoBenhNhan",
      "name": "Tạo mới bệnh nhân",
      "action": [
        {
          "operation": {
            "result": "pass"
          }
        },
        {
          "assert": {
            "result": "pass",
            "message": "Phản hồi HTTP 201 Created"
          }
        }
      ]
    }
  ]
}
```

**Trường hợp sử dụng**

1. **Theo dõi kết quả kiểm thử**: Ghi lại kết quả kiểm thử để phân tích
2. **Đánh giá chất lượng**: Đánh giá mức độ đáp ứng yêu cầu của hệ thống
3. **Báo cáo quy định**: Cung cấp bằng chứng về việc kiểm thử cho mục đích tuân thủ

#### Hướng dẫn triển khai bộ ba kiểm thử

1. **Bắt đầu với TestPlan**: Xác định phạm vi tổng thể và các trường hợp kiểm thử cần thiết
2. **Phát triển TestScript**: Tạo kịch bản chi tiết cho từng trường hợp kiểm thử
3. **Tự động hóa thực thi**: Sử dụng công cụ như FHIR TestScript Executor hoặc Touchstone
4. **Phân tích TestReport**: Đánh giá kết quả và xác định các vấn đề cần giải quyết
5. **Cải tiến liên tục**: Cập nhật TestScript dựa trên phản hồi và thay đổi yêu cầu

### InventoryReport (Báo cáo Tồn kho)

#### Tổng quan

`InventoryReport` là tài nguyên mới được thiết kế để quản lý hàng tồn kho trong môi trường y tế, giúp theo dõi số lượng, vị trí và tình trạng của thuốc, vật tư y tế và các nguồn lực khác.

#### Cấu trúc chính

```json
{
  "resourceType": "InventoryReport",
  "id": "bao-cao-ton-kho-thuoc-q2-2023",
  "status": "final",
  "countType": "snapshot",
  "operationType": "physical-count",
  "reportedDateTime": "2023-06-30T17:00:00+07:00",
  "reporter": {
    "reference": "Practitioner/duoc-si-001"
  },
  "inventoryListing": [
    {
      "location": {
        "reference": "Location/kho-thuoc-chinh"
      },
      "itemStatus": "available",
      "item": {
        "reference": "Medication/paracetamol-500mg"
      },
      "quantity": {
        "value": 1500,
        "unit": "viên",
        "system": "http://unitsofmeasure.org",
        "code": "TAB"
      },
      "expiry": "2024-12-31"
    },
    {
      "location": {
        "reference": "Location/kho-thuoc-chinh"
      },
      "itemStatus": "available",
      "item": {
        "reference": "Medication/amoxicillin-500mg"
      },
      "quantity": {
        "value": 800,
        "unit": "viên",
        "system": "http://unitsofmeasure.org",
        "code": "TAB"
      },
      "expiry": "2024-08-31"
    }
  ]
}
```

#### Trường hợp sử dụng

1. **Quản lý hàng tồn kho dược phẩm**: Theo dõi số lượng thuốc và hạn sử dụng
2. **Kiểm kê vật tư y tế**: Ghi lại kết quả kiểm kê định kỳ
3. **Quản lý chuỗi cung ứng**: Tối ưu hóa việc phân phối thuốc và vật tư
4. **Cảnh báo hết hàng**: Phát hiện khi số lượng tồn kho đạt ngưỡng cần bổ sung

#### Hướng dẫn triển khai

1. **Xác định loại kiểm kê**: Sử dụng `countType` và `operationType` phù hợp
   * countType: "snapshot" (ảnh chụp tại thời điểm) hoặc "difference" (thay đổi)
   * operationType: "physical-count" (đếm thực tế), "reconciliation" (đối chiếu)
2. **Duy trì thông tin chi tiết**: Ghi nhận đầy đủ về vị trí, số lượng và hạn sử dụng
3. **Cấu trúc báo cáo theo định kỳ**: Theo dõi xu hướng tồn kho qua thời gian
4. **Liên kết với các tài nguyên khác**: Tham chiếu đến Location, Medication, Device

#### Ví dụ thực tế: Quản lý vật tư y tế

```json
{
  "resourceType": "InventoryReport",
  "id": "bao-cao-ton-kho-vat-tu-y-te-2023Q3",
  "status": "final",
  "countType": "snapshot",
  "operationType": "physical-count",
  "reportedDateTime": "2023-09-30T16:00:00+07:00",
  "reporter": {
    "reference": "Practitioner/quan-ly-vat-tu-001"
  },
  "inventoryListing": [
    {
      "location": {
        "reference": "Location/phong-mo-1"
      },
      "itemStatus": "available",
      "item": {
        "reference": "Device/bang-y-te-vo-trung"
      },
      "quantity": {
        "value": 250,
        "unit": "gói",
        "system": "http://unitsofmeasure.org",
        "code": "PK"
      },
      "expiry": "2025-03-31"
    },
    {
      "location": {
        "reference": "Location/phong-mo-1"
      },
      "itemStatus": "low-stock",
      "item": {
        "reference": "Device/gant-y-te-vo-trung"
      },
      "quantity": {
        "value": 45,
        "unit": "đôi",
        "system": "http://unitsofmeasure.org",
        "code": "PR"
      },
      "expiry": "2024-06-30"
    }
  ]
}
```

### MedicinalProductDefinition (Định nghĩa Sản phẩm Thuốc)

#### Tổng quan

`MedicinalProductDefinition` là một tài nguyên toàn diện để mô tả các sản phẩm dược phẩm, từ thành phần hoạt chất đến thông tin quy định và đặc điểm bao bì.

#### Cấu trúc chính

```json
{
  "resourceType": "MedicinalProductDefinition",
  "id": "paracetamol-500mg-vien-nen",
  "status": "active",
  "name": [
    {
      "productName": "Paracetamol 500mg",
      "type": {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/medicinal-product-name-type",
            "code": "BAN",
            "display": "Tên chung"
          }
        ]
      }
    }
  ],
  "type": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/medicinal-product-type",
        "code": "CHEMICAL",
        "display": "Thuốc hóa học"
      }
    ]
  },
  "domain": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/medicinal-product-domain",
        "code": "Human",
        "display": "Thuốc cho người"
      }
    ]
  },
  "status": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/publication-status",
        "code": "active",
        "display": "Đang hoạt động"
      }
    ]
  },
  "legalStatusOfSupply": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/medicinal-product-legal-status-of-supply",
        "code": "OTC",
        "display": "Không kê đơn"
      }
    ]
  },
  "classification": [
    {
      "coding": [
        {
          "system": "http://www.whocc.no/atc",
          "code": "N02BE01",
          "display": "Paracetamol"
        }
      ]
    }
  ],
  "marketingStatus": [
    {
      "country": {
        "coding": [
          {
            "system": "urn:iso:std:iso:3166",
            "code": "VN",
            "display": "Việt Nam"
          }
        ]
      },
      "status": {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/medicinal-product-marketing-status",
            "code": "marketed",
            "display": "Đang lưu hành"
          }
        ]
      },
      "dateRange": {
        "start": "2020-01-01"
      }
    }
  ],
  "ingredient": [
    {
      "reference": {
        "reference": "Ingredient/paracetamol"
      },
      "role": {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/ingredient-role",
            "code": "ActiveBase",
            "display": "Hoạt chất chính"
          }
        ]
      },
      "strength": {
        "presentationRatio": {
          "numerator": {
            "value": 500,
            "unit": "miligam",
            "system": "http://unitsofmeasure.org",
            "code": "mg"
          },
          "denominator": {
            "value": 1,
            "unit": "viên",
            "system": "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
            "code": "TAB"
          }
        }
      }
    }
  ]
}
```

#### Trường hợp sử dụng

1. **Quản lý danh mục thuốc**: Duy trì danh mục thuốc được phê duyệt
2. **Hỗ trợ kê đơn**: Cung cấp thông tin chi tiết về thuốc cho hệ thống kê đơn
3. **Phân phối và logistics**: Hỗ trợ quản lý chuỗi cung ứng dược phẩm
4. **Tuân thủ quy định**: Theo dõi trạng thái pháp lý và cấp phép

#### Hướng dẫn triển khai

1. **Xác định thông tin cốt lõi**: Tập trung vào tên, phân loại và thành phần
2. **Sử dụng mã hóa chuẩn**: Áp dụng ATC, SNOMED CT hoặc mã địa phương
3. **Liên kết với tài nguyên khác**: Kết nối với `Ingredient`, `ManufacturedItemDefinition`
4. **Duy trì thông tin pháp lý**: Cập nhật trạng thái cấp phép và lưu hành

#### Ví dụ thực tế: Thuốc kê đơn

```json
{
  "resourceType": "MedicinalProductDefinition",
  "id": "rosuvastatin-10mg-vien-nen",
  "status": "active",
  "name": [
    {
      "productName": "Rosuvastatin 10mg",
      "type": {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/medicinal-product-name-type",
            "code": "BAN",
            "display": "Tên chung"
          }
        ]
      }
    },
    {
      "productName": "Crestor 10mg",
      "type": {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/medicinal-product-name-type",
            "code": "BRAND",
            "display": "Tên biệt dược"
          }
        ]
      }
    }
  ],
  "type": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/medicinal-product-type",
        "code": "CHEMICAL",
        "display": "Thuốc hóa học"
      }
    ]
  },
  "legalStatusOfSupply": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/medicinal-product-legal-status-of-supply",
        "code": "PRESCRIPTION",
        "display": "Thuốc kê đơn"
      }
    ]
  },
  "classification": [
    {
      "coding": [
        {
          "system": "http://www.whocc.no/atc",
          "code": "C10AA07",
          "display": "Rosuvastatin"
        }
      ]
    }
  ]
}
```

### ChargeItemDefinition (Định nghĩa Khoản Phí)

#### Tổng quan

`ChargeItemDefinition` mở rộng khả năng quản lý tài chính trong FHIR, cho phép định nghĩa các quy tắc tính phí cho dịch vụ y tế.

#### Cấu trúc chính

```json
{
  "resourceType": "ChargeItemDefinition",
  "id": "dinh-nghia-phi-kham-noi-khoa",
  "url": "http://benhvien.vn/fhir/ChargeItemDefinition/dinh-nghia-phi-kham-noi-khoa",
  "status": "active",
  "description": "Định nghĩa phí khám nội khoa cơ bản",
  "code": {
    "coding": [
      {
        "system": "http://benhvien.vn/fhir/CodeSystem/ma-dich-vu",
        "code": "DV001",
        "display": "Khám nội khoa"
      }
    ]
  },
  "instance": [
    {
      "reference": "ActivityDefinition/kham-noi-khoa"
    }
  ],
  "propertyGroup": [
    {
      "priceComponent": [
        {
          "type": "base",
          "code": {
            "coding": [
              {
                "system": "http://benhvien.vn/fhir/CodeSystem/thanh-phan-phi",
                "code": "KHAM",
                "display": "Phí khám cơ bản"
              }
            ]
          },
          "amount": {
            "value": 100000,
            "currency": "VND"
          }
        },
        {
          "type": "surcharge",
          "code": {
            "coding": [
              {
                "system": "http://benhvien.vn/fhir/CodeSystem/thanh-phan-phi",
                "code": "CUOI_TUAN",
                "display": "Phụ phí cuối tuần"
              }
            ]
          },
          "amount": {
            "value": 30000,
            "currency": "VND"
          },
          "applicability": {
            "description": "Áp dụng cho khám vào ngày Thứ Bảy và Chủ Nhật",
            "language": "text/fhirpath",
            "expression": "%weekend = true"
          }
        }
      ]
    }
  ]
}
```

#### Trường hợp sử dụng

1. **Quản lý giá dịch vụ**: Định nghĩa cấu trúc giá cho các dịch vụ y tế
2. **Áp dụng quy tắc tính phí**: Xác định khi nào áp dụng các khoản phí bổ sung
3. **Quản lý bảo hiểm**: Hỗ trợ xác định khoản chi trả bảo hiểm
4. **Tạo hóa đơn tự động**: Hỗ trợ tính phí tự động trong hệ thống hóa đơn

#### Hướng dẫn triển khai

1. **Xác định mã dịch vụ**: Liên kết với mã dịch vụ trong hệ thống
2. **Xây dựng cấu trúc giá**: Phân chia thành phí cơ bản và phụ phí
3. **Định nghĩa điều kiện áp dụng**: Sử dụng FHIRPath để mô tả điều kiện
4. **Kiểm tra tính nhất quán**: Đảm bảo các quy tắc tính phí không mâu thuẫn

#### Ví dụ thực tế: Giá xét nghiệm phân tầng

```json
{
  "resourceType": "ChargeItemDefinition",
  "id": "dinh-nghia-phi-xet-nghiem-mau",
  "url": "http://benhvien.vn/fhir/ChargeItemDefinition/dinh-nghia-phi-xet-nghiem-mau",
  "status": "active",
  "description": "Định nghĩa phí xét nghiệm máu cơ bản với phân tầng theo đối tượng",
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "58410-2",
        "display": "Công thức máu toàn phần"
      }
    ]
  },
  "propertyGroup": [
    {
      "priceComponent": [
        {
          "type": "base",
          "code": {
            "coding": [
              {
                "system": "http://benhvien.vn/fhir/CodeSystem/thanh-phan-phi",
                "code": "PHICO",
                "display": "Phí cơ bản"
              }
            ]
          },
          "amount": {
            "value": 120000,
            "currency": "VND"
          }
        }
      ]
    },
    {
      "applicability": {
        "description": "Giảm giá cho bệnh nhân trẻ em",
        "language": "text/fhirpath",
```

```json
  "language": "text/fhirpath",
  "expression": "Patient.age < 12 'years'"
}
```

### SubscriptionStatus và SubscriptionTopic (Trạng thái Đăng ký và Chủ đề Đăng ký)

#### SubscriptionStatus

**Tổng quan**

`SubscriptionStatus` cung cấp thông tin về trạng thái hiện tại của một đăng ký, giúp theo dõi tình trạng kết nối và các thông báo đã gửi.

**Cấu trúc chính**

```json
{
  "resourceType": "SubscriptionStatus",
  "id": "trang-thai-dang-ky-001",
  "status": "active",
  "type": "status",
  "subscription": {
    "reference": "Subscription/dang-ky-benh-nhan-moi"
  },
  "topic": {
    "reference": "SubscriptionTopic/benh-nhan-moi"
  },
  "eventsSinceSubscriptionStart": 15,
  "notificationEvent": [
    {
      "eventNumber": 15,
      "timestamp": "2023-06-15T10:30:45+07:00",
      "focus": {
        "reference": "Patient/nguyen-van-a"
      },
      "status": "success"
    },
    {
      "eventNumber": 14,
      "timestamp": "2023-06-14T14:20:10+07:00",
      "focus": {
        "reference": "Patient/tran-thi-b"
      },
      "status": "success"
    }
  ]
}
```

**Trường hợp sử dụng**

1. **Giám sát đăng ký**: Kiểm tra trạng thái kết nối và hoạt động
2. **Khắc phục sự cố**: Phát hiện và khắc phục lỗi gửi thông báo
3. **Xác minh nhận thông báo**: Đảm bảo các sự kiện quan trọng được gửi đi
4. **Tải lại sự kiện bị nhỡ**: Truy xuất thông báo đã bị mất hoặc không được xử lý

**Hướng dẫn triển khai**

1. **Theo dõi định kỳ**: Truy vấn trạng thái để đảm bảo đăng ký hoạt động
2. **Lưu trữ sự kiện**: Duy trì lịch sử các thông báo đã gửi
3. **Xử lý lỗi**: Phát triển cơ chế khắc phục khi phát hiện lỗi gửi thông báo
4. **Đồng bộ hóa dữ liệu**: Sử dụng để xác định sự kiện cần đồng bộ lại

#### SubscriptionTopic

**Tổng quan**

`SubscriptionTopic` định nghĩa các chủ đề mà hệ thống có thể đăng ký theo dõi, xác định cụ thể loại sự kiện và tiêu chí gửi thông báo.

**Cấu trúc chính**

```json
{
  "resourceType": "SubscriptionTopic",
  "id": "benh-nhan-moi",
  "url": "http://benhvien.vn/fhir/SubscriptionTopic/benh-nhan-moi",
  "title": "Chủ đề thông báo bệnh nhân mới",
  "status": "active",
  "resourceTrigger": [
    {
      "description": "Kích hoạt khi có bệnh nhân mới được tạo",
      "resourceType": "Patient",
      "supportedInteraction": [
        "create"
      ],
      "queryCriteria": {
        "previous": "false",
        "current": "true",
        "requireBoth": false
      }
    }
  ],
  "canFilterBy": [
    {
      "description": "Lọc theo địa chỉ thành phố",
      "resource": "Patient",
      "filterParameter": "address-city"
    },
    {
      "description": "Lọc theo giới tính",
      "resource": "Patient",
      "filterParameter": "gender"
    }
  ]
}
```

**Trường hợp sử dụng**

1. **Thông báo sự kiện lâm sàng**: Nhận biết khi có kết quả xét nghiệm mới
2. **Giám sát hồ sơ bệnh án**: Theo dõi thay đổi trong hồ sơ bệnh nhân
3. **Đồng bộ hóa hệ thống**: Kích hoạt cập nhật trong hệ thống phụ thuộc
4. **Cảnh báo dữ liệu quan trọng**: Thông báo khi có dữ liệu cần chú ý đặc biệt

**Hướng dẫn triển khai**

1. **Xác định tài nguyên quan trọng**: Tập trung vào các tài nguyên cần theo dõi
2. **Định nghĩa tiêu chí rõ ràng**: Xác định chính xác khi nào nên gửi thông báo
3. **Cung cấp tùy chọn lọc**: Cho phép người đăng ký tinh chỉnh thông báo
4. **Tài liệu hóa mục đích**: Mô tả rõ ràng mục đích của chủ đề đăng ký

#### Ví dụ thực tế: Hệ thống thông báo kết quả xét nghiệm

```json
{
  "resourceType": "SubscriptionTopic",
  "id": "ket-qua-xet-nghiem-khan",
  "url": "http://benhvien.vn/fhir/SubscriptionTopic/ket-qua-xet-nghiem-khan",
  "title": "Thông báo kết quả xét nghiệm khẩn cấp",
  "status": "active",
  "resourceTrigger": [
    {
      "description": "Kích hoạt khi có kết quả xét nghiệm mới được gắn cờ khẩn cấp",
      "resourceType": "DiagnosticReport",
      "supportedInteraction": [
        "create",
        "update"
      ],
      "fhirPathCriteria": "status = 'final' and category.coding.exists(code = 'URGENT')"
    }
  ],
  "notificationShape": [
    {
      "resource": "DiagnosticReport",
      "include": [
        "DiagnosticReport:subject",
        "DiagnosticReport:result"
      ]
    }
  ],
  "canFilterBy": [
    {
      "description": "Lọc theo loại xét nghiệm",
      "resource": "DiagnosticReport",
      "filterParameter": "code"
    },
    {
      "description": "Lọc theo khoa lâm sàng",
      "resource": "DiagnosticReport",
      "filterParameter": "department"
    }
  ]
}
```

### Kết hợp các tài nguyên mới: Ví dụ triển khai thực tế

Để minh họa cách các tài nguyên mới này làm việc cùng nhau, hãy xem xét ví dụ về một hệ thống quản lý dược phẩm:

#### 1. Định nghĩa yêu cầu cho hệ thống quản lý dược phẩm

```json
{
  "resourceType": "RequirementsDefinition",
  "id": "yeu-cau-he-thong-duoc",
  "status": "active",
  "title": "Yêu cầu Hệ thống Quản lý Dược phẩm",
  "statement": [
    {
      "key": "QD001",
      "label": "Theo dõi tồn kho",
      "conformance": "shall",
      "requirement": "Hệ thống phải theo dõi số lượng tồn kho của tất cả dược phẩm"
    },
    {
      "key": "QD002",
      "label": "Cảnh báo hết hàng",
      "conformance": "shall",
      "requirement": "Hệ thống phải gửi thông báo khi thuốc sắp hết hàng"
    },
    {
      "key": "QD003",
      "label": "Cảnh báo hạn sử dụng",
      "conformance": "shall",
      "requirement": "Hệ thống phải cảnh báo khi thuốc sắp hết hạn sử dụng"
    }
  ]
}
```

#### 2. Định nghĩa sản phẩm thuốc

```json
{
  "resourceType": "MedicinalProductDefinition",
  "id": "amoxicillin-500mg-vien-nang",
  "status": "active",
  "name": [
    {
      "productName": "Amoxicillin 500mg"
    }
  ],
  "classification": [
    {
      "coding": [
        {
          "system": "http://www.whocc.no/atc",
          "code": "J01CA04",
          "display": "Amoxicillin"
        }
      ]
    }
  ],
  "ingredient": [
    {
      "reference": {
        "reference": "Ingredient/amoxicillin"
      },
      "role": {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/ingredient-role",
            "code": "ActiveBase",
            "display": "Hoạt chất chính"
          }
        ]
      },
      "strength": {
        "presentationRatio": {
          "numerator": {
            "value": 500,
            "unit": "miligam",
            "code": "mg"
          },
          "denominator": {
            "value": 1,
            "unit": "viên nang",
            "code": "CAP"
          }
        }
      }
    }
  ]
}
```

#### 3. Báo cáo tồn kho

```json
{
  "resourceType": "InventoryReport",
  "id": "bao-cao-ton-kho-amoxicillin-2023-06",
  "status": "final",
  "countType": "snapshot",
  "operationType": "physical-count",
  "reportedDateTime": "2023-06-30T17:00:00+07:00",
  "inventoryListing": [
    {
      "location": {
        "reference": "Location/kho-duoc-chinh"
      },
      "itemStatus": "low-stock",
      "item": {
        "reference": "MedicinalProductDefinition/amoxicillin-500mg-vien-nang"
      },
      "quantity": {
        "value": 120,
        "unit": "viên",
        "code": "CAP"
      },
      "expiry": "2023-12-31"
    }
  ]
}
```

#### 4. Định nghĩa chủ đề đăng ký cho cảnh báo tồn kho

```json
{
  "resourceType": "SubscriptionTopic",
  "id": "canh-bao-ton-kho-thap",
  "url": "http://benhvien.vn/fhir/SubscriptionTopic/canh-bao-ton-kho-thap",
  "title": "Cảnh báo tồn kho thấp",
  "status": "active",
  "resourceTrigger": [
    {
      "description": "Kích hoạt khi có báo cáo tồn kho với trạng thái tồn kho thấp",
      "resourceType": "InventoryReport",
      "supportedInteraction": [
        "create",
        "update"
      ],
      "fhirPathCriteria": "inventoryListing.where(itemStatus = 'low-stock').exists()"
    }
  ],
  "canFilterBy": [
    {
      "description": "Lọc theo loại thuốc",
      "resource": "InventoryReport",
      "filterParameter": "item"
    },
    {
      "description": "Lọc theo vị trí kho",
      "resource": "InventoryReport",
      "filterParameter": "location"
    }
  ]
}
```

#### 5. Kế hoạch kiểm thử cho hệ thống

```json
{
  "resourceType": "TestPlan",
  "id": "ke-hoach-kiem-thu-he-thong-duoc",
  "status": "active",
  "name": "KeHoachKiemThuHeThongDuoc",
  "title": "Kế hoạch Kiểm thử cho Hệ thống Quản lý Dược phẩm",
  "description": "Kế hoạch kiểm thử toàn diện cho các chức năng quản lý dược phẩm",
  "testCase": [
    {
      "name": "Kiểm tra cảnh báo tồn kho",
      "description": "Kiểm thử khả năng phát hiện và cảnh báo khi thuốc có tồn kho thấp",
      "testScript": {
        "reference": "TestScript/kiem-thu-canh-bao-ton-kho"
      }
    },
    {
      "name": "Kiểm tra cảnh báo hết hạn",
      "description": "Kiểm thử khả năng cảnh báo khi thuốc sắp hết hạn sử dụng",
      "testScript": {
        "reference": "TestScript/kiem-thu-canh-bao-het-han"
      }
    }
  ]
}
```

### Kết luận

FHIR R5 đã mang đến những tài nguyên mới quan trọng, mở rộng khả năng ứng dụng của tiêu chuẩn trong nhiều lĩnh vực của hệ thống thông tin y tế:

1. **RequirementsDefinition** cho phép định nghĩa rõ ràng yêu cầu nghiệp vụ, tạo nền tảng vững chắc cho quá trình triển khai.
2. **TestPlan, TestScript và TestReport** tạo thành framework kiểm thử toàn diện, hỗ trợ đảm bảo chất lượng và tuân thủ.
3. **InventoryReport** cung cấp công cụ hiệu quả để quản lý hàng tồn kho, quan trọng cho quản lý nguồn lực y tế.
4. **MedicinalProductDefinition** nâng cao khả năng mô tả sản phẩm dược phẩm, hỗ trợ quản lý thuốc và kê đơn.
5. **ChargeItemDefinition** mở rộng khả năng quản lý tài chính với cấu trúc giá linh hoạt và quy tắc tính phí phức tạp.
6. **SubscriptionStatus và SubscriptionTopic** cải tiến cơ chế thông báo, cho phép theo dõi thay đổi dữ liệu theo thời gian thực.

Khi triển khai các tài nguyên này, các tổ chức y tế nên:

* Bắt đầu với các trường hợp sử dụng đơn giản, mở rộng dần độ phức tạp
* Xây dựng các prototype để hiểu rõ hơn về cách các tài nguyên hoạt động
* Tuân theo các hướng dẫn triển khai và mẫu thực tiễn tốt nhất
* Tận dụng các cộng đồng FHIR để học hỏi từ kinh nghiệm của người khác

Các tài nguyên mới trong FHIR R5 không chỉ đơn thuần là sự bổ sung về kỹ thuật, mà còn thể hiện sự trưởng thành của tiêu chuẩn, đáp ứng nhu cầu ngày càng phức tạp của ngành y tế hiện đại. Bằng cách áp dụng hiệu quả các tài nguyên này, các nhà phát triển và kiến trúc sư giải pháp có thể xây dựng các hệ thống thông tin y tế mạnh mẽ hơn, linh hoạt hơn và hỗ trợ tốt hơn cho công tác chăm sóc bệnh nhân.
