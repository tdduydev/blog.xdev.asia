---
id: 18612601-535f-4573-98b2-e43ffff6e2d9
title: 'FHIR R5 Resource Classification'
slug: fhir-r5-resource-classification
description: 'FHIR (Fast Healthcare Interoperability Resources) là tiêu chuẩn hiện đại nhất cho việc trao đổi dữ liệu y tế điện tử. Với phiên bản R5, FHIR đã mở rộng và hoàn thiện hơn với nhiều loại tài nguyên giúp mô hình hóa hầu…'
duration_minutes: 15
is_free: true
video_url: null
sort_order: 2
section_title: 'Phần 3: Mô hình Resource & Kiến trúc FHIR'
course:
  id: 019e3a00-0000-7001-e001-hl7r5000001
  title: 'HL7 FHIR R5 Chuyên Sâu — Reference & Thực hành'
  slug: hl7-fhir-r5-chuyen-sau
---
![FHIR R5 Resource Classification](/storage/uploads/hl7-r5/root/image.webp)

*FHIR R5 Resource Classification*

FHIR (Fast Healthcare Interoperability Resources) là tiêu chuẩn hiện đại nhất cho việc trao đổi dữ liệu y tế điện tử. Với phiên bản R5, FHIR đã mở rộng và hoàn thiện hơn với nhiều loại tài nguyên giúp mô hình hóa hầu hết các khía cạnh của hệ thống y tế. Bài viết này sẽ giúp bạn hiểu rõ cách phân loại các tài nguyên FHIR R5 cùng với ví dụ cụ thể cho mỗi loại.

### 1. Clinical Resources (Tài nguyên lâm sàng)

Các tài nguyên lâm sàng tập trung vào thông tin y tế của bệnh nhân, bao gồm những dữ liệu liên quan đến chẩn đoán, điều trị và kết quả lâm sàng.

#### Ví dụ quan trọng:

**Patient (Bệnh nhân)**

```json
{
  "resourceType": "Patient",
  "id": "example",
  "active": true,
  "name": [
    {
      "use": "official",
      "family": "Nguyễn",
      "given": ["Văn", "A"]
    }
  ],
  "gender": "male",
  "birthDate": "1974-12-25",
  "address": [
    {
      "use": "home",
      "line": ["Số 123 Đường Lê Lợi"],
      "city": "Hà Nội",
      "country": "VN"
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

**Observation (Kết quả quan sát)**

```json
{
  "resourceType": "Observation",
  "id": "blood-glucose",
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
    ]
  },
  "subject": {
    "reference": "Patient/example"
  },
  "effectiveDateTime": "2023-01-15T08:30:00+07:00",
  "valueQuantity": {
    "value": 6.3,
    "unit": "mmol/L",
    "system": "http://unitsofmeasure.org",
    "code": "mmol/L"
  }
}
```

**Condition (Tình trạng bệnh)**

```json
{
  "resourceType": "Condition",
  "id": "diabetes",
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
        "display": "Diabetes mellitus type 2"
      }
    ]
  },
  "subject": {
    "reference": "Patient/example"
  },
  "onsetDateTime": "2022-06-10"
}
```

#### Tài nguyên lâm sàng quan trọng khác:

* **AllergyIntolerance**: Dị ứng và không dung nạp
* **MedicationRequest**: Chỉ định thuốc
* **DiagnosticReport**: Báo cáo chẩn đoán (CT scan, kết quả xét nghiệm,...)
* **CarePlan**: Kế hoạch chăm sóc
* **Procedure**: Thủ thuật y tế

### 2. Administrative Resources (Tài nguyên hành chính)

Tài nguyên hành chính giúp quản lý các thông tin về cơ sở y tế, nhân viên y tế và các hoạt động hành chính.

#### Ví dụ quan trọng:

**Practitioner (Nhân viên y tế)**

```json
{
  "resourceType": "Practitioner",
  "id": "doctor-example",
  "active": true,
  "name": [
    {
      "family": "Trần",
      "given": ["Bác sĩ", "B"],
      "prefix": ["BS."]
    }
  ],
  "telecom": [
    {
      "system": "phone",
      "value": "0987654321",
      "use": "work"
    }
  ],
  "gender": "female",
  "birthDate": "1980-07-22",
  "qualification": [
    {
      "code": {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0360",
            "code": "MD",
            "display": "Doctor of Medicine"
          }
        ]
      },
      "period": {
        "start": "2005-05-15"
      }
    }
  ]
}
```

**Organization (Tổ chức)**

```json
{
  "resourceType": "Organization",
  "id": "hospital-example",
  "active": true,
  "type": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/organization-type",
          "code": "prov",
          "display": "Healthcare Provider"
        }
      ]
    }
  ],
  "name": "Bệnh viện Đa khoa Trung ương",
  "telecom": [
    {
      "system": "phone",
      "value": "024.38252131",
      "use": "work"
    },
    {
      "system": "email",
      "value": "contact@bvdktw.vn",
      "use": "work"
    }
  ],
  "address": [
    {
      "use": "work",
      "line": ["40 Tràng Thi"],
      "city": "Hà Nội",
      "postalCode": "100000",
      "country": "VN"
    }
  ]
}
```

**Location (Địa điểm)**

```json
{
  "resourceType": "Location",
  "id": "clinic-example",
  "status": "active",
  "name": "Phòng khám Nội",
  "description": "Phòng khám Nội - Tầng 2",
  "mode": "instance",
  "type": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/v3-RoleCode",
          "code": "OUTPHARM",
          "display": "outpatient pharmacy"
        }
      ]
    }
  ],
  "telecom": [
    {
      "system": "phone",
      "value": "024.38252131 (ext 234)",
      "use": "work"
    }
  ],
  "address": {
    "use": "work",
    "line": ["40 Tràng Thi, Tầng 2, Phòng 201"],
    "city": "Hà Nội",
    "country": "VN"
  },
  "managingOrganization": {
    "reference": "Organization/hospital-example"
  }
}
```

#### Tài nguyên hành chính quan trọng khác:

* **Encounter**: Cuộc thăm khám/nhập viện
* **EpisodeOfCare**: Quá trình chăm sóc
* **Schedule**: Lịch trình
* **Slot**: Khung giờ hẹn
* **Appointment**: Cuộc hẹn

### 3. Infrastructure Resources (Tài nguyên cơ sở hạ tầng)

Tài nguyên cơ sở hạ tầng cung cấp các chức năng nền tảng cho hệ thống FHIR, bao gồm xử lý lỗi, quản lý phiên bản và mô tả các khả năng của hệ thống.

#### Ví dụ quan trọng:

**OperationOutcome (Kết quả hoạt động)**

Mô tả lỗi hoặc cảnh báo khi xử lý yêu cầu FHIR:

```json
{
  "resourceType": "OperationOutcome",
  "issue": [
    {
      "severity": "error",
      "code": "processing",
      "diagnostics": "Mã bệnh nhân không tồn tại trong hệ thống",
      "details": {
        "text": "Không tìm thấy bệnh nhân với ID: PAT123456"
      }
    }
  ]
}
```

**CapabilityStatement (Khả năng của hệ thống)**

Mô tả các tính năng và khả năng của máy chủ FHIR:

```json
{
  "resourceType": "CapabilityStatement",
  "status": "active",
  "date": "2023-01-15",
  "kind": "instance",
  "software": {
    "name": "BV System FHIR Server",
    "version": "1.0.0"
  },
  "fhirVersion": "5.0.0",
  "format": ["json", "xml"],
  "rest": [
    {
      "mode": "server",
      "resource": [
        {
          "type": "Patient",
          "interaction": [
            {
              "code": "read"
            },
            {
              "code": "search-type"
            }
          ],
          "searchParam": [
            {
              "name": "name",
              "type": "string"
            },
            {
              "name": "identifier",
              "type": "token"
            }
          ]
        },
        {
          "type": "Observation",
          "interaction": [
            {
              "code": "read"
            },
            {
              "code": "search-type"
            }
          ]
        }
      ]
    }
  ]
}
```

**Bundle (Gói)**

Tập hợp nhiều tài nguyên trong một tài liệu:

```json
{
  "resourceType": "Bundle",
  "id": "bundle-example",
  "type": "transaction",
  "entry": [
    {
      "fullUrl": "urn:uuid:61ebe359-bfdc-4613-8bf2-c5e300945f0a",
      "resource": {
        "resourceType": "Patient",
        "name": [
          {
            "use": "official",
            "family": "Lê",
            "given": ["Thị", "C"]
          }
        ],
        "gender": "female",
        "birthDate": "1982-05-23"
      },
      "request": {
        "method": "POST",
        "url": "Patient"
      }
    },
    {
      "fullUrl": "urn:uuid:88f151c0-a954-468a-88bd-5ae15c08e059",
      "resource": {
        "resourceType": "Observation",
        "status": "final",
        "code": {
          "coding": [
            {
              "system": "http://loinc.org",
              "code": "8867-4",
              "display": "Heart rate"
            }
          ]
        },
        "subject": {
          "reference": "urn:uuid:61ebe359-bfdc-4613-8bf2-c5e300945f0a"
        },
        "valueQuantity": {
          "value": 80,
          "unit": "beats/minute"
        }
      },
      "request": {
        "method": "POST",
        "url": "Observation"
      }
    }
  ]
}
```

#### Tài nguyên cơ sở hạ tầng quan trọng khác:

* **MessageHeader**: Tiêu đề tin nhắn
* **Parameters**: Tham số cho hoạt động
* **Subscription**: Đăng ký nhận thông báo
* **AuditEvent**: Sự kiện kiểm toán

### 4. Conformance Resources (Tài nguyên tuân thủ)

Tài nguyên tuân thủ định nghĩa cách sử dụng FHIR trong một bối cảnh cụ thể, bao gồm cấu trúc dữ liệu, bộ mã hóa và các ràng buộc.

#### Ví dụ quan trọng:

**StructureDefinition (Định nghĩa cấu trúc)**

Định nghĩa cấu trúc cho một tài nguyên tùy chỉnh hoặc mở rộng:

```json
{
  "resourceType": "StructureDefinition",
  "id": "vn-patient",
  "url": "http://example.org/fhir/StructureDefinition/vn-patient",
  "name": "VietnamPatientProfile",
  "status": "draft",
  "fhirVersion": "5.0.0",
  "kind": "resource",
  "abstract": false,
  "type": "Patient",
  "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Patient",
  "derivation": "constraint",
  "differential": {
    "element": [
      {
        "id": "Patient.identifier",
        "path": "Patient.identifier",
        "slicing": {
          "discriminator": [
            {
              "type": "value",
              "path": "system"
            }
          ],
          "ordered": false,
          "rules": "open"
        },
        "min": 1
      },
      {
        "id": "Patient.identifier:cmnd",
        "path": "Patient.identifier",
        "sliceName": "cmnd",
        "min": 0,
        "max": "1",
        "type": [
          {
            "code": "Identifier"
          }
        ]
      },
      {
        "id": "Patient.identifier:cmnd.system",
        "path": "Patient.identifier.system",
        "min": 1,
        "fixedUri": "http://example.org/fhir/identifier/cmnd"
      }
    ]
  }
}
```

**ValueSet (Tập giá trị)**

Định nghĩa một tập hợp các mã để sử dụng:

```json
{
  "resourceType": "ValueSet",
  "id": "vietnam-provinces",
  "url": "http://example.org/fhir/ValueSet/vietnam-provinces",
  "version": "1.0.0",
  "name": "VietnamProvinces",
  "status": "active",
  "description": "Danh sách các tỉnh thành Việt Nam",
  "compose": {
    "include": [
      {
        "system": "http://example.org/fhir/CodeSystem/vietnam-provinces",
        "concept": [
          {
            "code": "HN",
            "display": "Hà Nội"
          },
          {
            "code": "HCMC",
            "display": "Hồ Chí Minh"
          },
          {
            "code": "DN",
            "display": "Đà Nẵng"
          },
          {
            "code": "HP",
            "display": "Hải Phòng"
          },
          {
            "code": "CT",
            "display": "Cần Thơ"
          }
        ]
      }
    ]
  }
}
```

**CodeSystem (Hệ thống mã)**

Định nghĩa một hệ thống mã:

```json
{
  "resourceType": "CodeSystem",
  "id": "vietnam-ethnic-groups",
  "url": "http://example.org/fhir/CodeSystem/vietnam-ethnic-groups",
  "version": "1.0.0",
  "name": "VietnamEthnicGroups",
  "status": "active",
  "content": "complete",
  "concept": [
    {
      "code": "kinh",
      "display": "Kinh"
    },
    {
      "code": "tay",
      "display": "Tày"
    },
    {
      "code": "thai",
      "display": "Thái"
    },
    {
      "code": "muong",
      "display": "Mường"
    },
    {
      "code": "khmer",
      "display": "Khmer"
    }
  ]
}
```

#### Tài nguyên tuân thủ quan trọng khác:

* **ImplementationGuide**: Hướng dẫn triển khai
* **SearchParameter**: Tham số tìm kiếm
* **CompartmentDefinition**: Định nghĩa phân vùng
* **OperationDefinition**: Định nghĩa thao tác

### 5. Financial Resources (Tài nguyên tài chính)

Tài nguyên tài chính quản lý các khía cạnh tài chính của chăm sóc sức khỏe, bao gồm thanh toán, bảo hiểm và hóa đơn.

#### Ví dụ quan trọng:

**Claim (Yêu cầu thanh toán)**

```json
{
  "resourceType": "Claim",
  "id": "claim-example",
  "status": "active",
  "type": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/claim-type",
        "code": "institutional",
        "display": "Institutional"
      }
    ]
  },
  "use": "claim",
  "patient": {
    "reference": "Patient/example"
  },
  "created": "2023-01-15",
  "provider": {
    "reference": "Organization/hospital-example"
  },
  "priority": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/processpriority",
        "code": "normal"
      }
    ]
  },
  "insurance": [
    {
      "sequence": 1,
      "focal": true,
      "coverage": {
        "reference": "Coverage/example"
      }
    }
  ],
  "item": [
    {
      "sequence": 1,
      "productOrService": {
        "coding": [
          {
            "system": "http://example.org/fhir/CodeSystem/medical-services",
            "code": "exam-general",
            "display": "Khám tổng quát"
          }
        ]
      },
      "unitPrice": {
        "value": 500000,
        "currency": "VND"
      },
      "quantity": {
        "value": 1
      }
    }
  ],
  "total": {
    "value": 500000,
    "currency": "VND"
  }
}
```

**Coverage (Bảo hiểm)**

```json
{
  "resourceType": "Coverage",
  "id": "example",
  "status": "active",
  "type": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
        "code": "PUBLICPOL",
        "display": "Bảo hiểm y tế"
      }
    ]
  },
  "subscriber": {
    "reference": "Patient/example"
  },
  "beneficiary": {
    "reference": "Patient/example"
  },
  "relationship": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/subscriber-relationship",
        "code": "self"
      }
    ]
  },
  "period": {
    "start": "2023-01-01",
    "end": "2023-12-31"
  },
  "payor": [
    {
      "reference": "Organization/bhyt"
    }
  ],
  "class": [
    {
      "type": {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/coverage-class",
            "code": "group"
          }
        ]
      },
      "value": "BHYT"
    }
  ]
}
```

**Account (Tài khoản)**

```json
{
  "resourceType": "Account",
  "id": "example",
  "status": "active",
  "type": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
        "code": "PBILLACCT",
        "display": "Patient billing account"
      }
    ],
    "text": "Tài khoản thanh toán của bệnh nhân"
  },
  "name": "Tài khoản của Nguyễn Văn A",
  "subject": [
    {
      "reference": "Patient/example"
    }
  ],
  "owner": {
    "reference": "Organization/hospital-example"
  },
  "coverage": [
    {
      "coverage": {
        "reference": "Coverage/example"
      },
      "priority": 1
    }
  ]
}
```

#### Tài nguyên tài chính quan trọng khác:

* **ClaimResponse**: Phản hồi yêu cầu thanh toán
* **ExplanationOfBenefit**: Giải thích quyền lợi bảo hiểm
* **PaymentNotice**: Thông báo thanh toán
* **Invoice**: Hóa đơn
* **ChargeItem**: Mục thanh toán

### 6. Specialized Resources (Tài nguyên chuyên biệt)

Tài nguyên chuyên biệt được thiết kế cho các lĩnh vực cụ thể trong y tế, bao gồm nghiên cứu, di truyền, và nhiều lĩnh vực khác.

#### Ví dụ quan trọng:

**ResearchStudy (Nghiên cứu khoa học)**

```json
{
  "resourceType": "ResearchStudy",
  "id": "example",
  "status": "active",
  "title": "Đánh giá hiệu quả của phác đồ điều trị mới cho bệnh nhân tiểu đường type 2",
  "description": "Nghiên cứu đa trung tâm đánh giá hiệu quả và tính an toàn của phác đồ kết hợp thuốc A và B trong điều trị bệnh nhân tiểu đường type 2",
  "period": {
    "start": "2023-01-01",
    "end": "2024-12-31"
  },
  "sponsor": {
    "reference": "Organization/research-org"
  },
  "principalInvestigator": {
    "reference": "Practitioner/doctor-example"
  },
  "site": [
    {
      "reference": "Location/clinic-example"
    }
  ],
  "enrollment": [
    {
      "reference": "Group/diabetes-patients"
    }
  ]
}
```

**MolecularSequence (Trình tự phân tử)**

```json
{
  "resourceType": "MolecularSequence",
  "id": "example",
  "type": "dna",
  "coordinateSystem": 0,
  "patient": {
    "reference": "Patient/example"
  },
  "specimen": {
    "reference": "Specimen/example"
  },
  "device": {
    "reference": "Device/sequencer"
  },
  "performer": {
    "reference": "Organization/lab-example"
  },
  "quantity": {
    "value": 10,
    "unit": "ng",
    "system": "http://unitsofmeasure.org",
    "code": "ng"
  },
  "referenceSeq": {
    "referenceSeqId": {
      "coding": [
        {
          "system": "http://www.ncbi.nlm.nih.gov/nuccore",
          "code": "NC_000002.12"
        }
      ]
    },
    "strand": "watson",
    "windowStart": 15000,
    "windowEnd": 15100
  },
  "variant": [
    {
      "start": 15032,
      "end": 15032,
      "observedAllele": "A",
      "referenceAllele": "G"
    }
  ],
  "repository": [
    {
      "type": "directlink",
      "url": "http://example.org/genetics/sequence/15032",
      "name": "Genetic Variant Repository"
    }
  ]
}
```

**Questionnaire (Bảng câu hỏi)**

```json
{
  "resourceType": "Questionnaire",
  "id": "example",
  "title": "Đánh giá triệu chứng COVID-19",
  "status": "active",
  "date": "2023-01-01",
  "item": [
    {
      "linkId": "1",
      "text": "Bạn có bị sốt trong 14 ngày qua không?",
      "type": "boolean",
      "required": true
    },
    {
      "linkId": "2",
      "text": "Bạn có bị ho trong 14 ngày qua không?",
      "type": "boolean",
      "required": true
    },
    {
      "linkId": "3",
      "text": "Bạn có bị khó thở trong 14 ngày qua không?",
      "type": "boolean",
      "required": true
    },
    {
      "linkId": "4",
      "text": "Nhiệt độ cơ thể cao nhất của bạn trong 14 ngày qua là bao nhiêu?",
      "type": "decimal",
      "required": false,
      "enableWhen": [
        {
          "question": "1",
          "operator": "=",
          "answerBoolean": true
        }
      ]
    }
  ]
}
```

#### Tài nguyên chuyên biệt quan trọng khác:

* **QuestionnaireResponse**: Phản hồi bảng câu hỏi
* **RiskAssessment**: Đánh giá rủi ro
* **ImagingStudy**: Nghiên cứu hình ảnh
* **DeviceMetric**: Chỉ số thiết bị
* **BodyStructure**: Cấu trúc cơ thể

### Lời kết

FHIR R5 cung cấp một bộ tài nguyên toàn diện để mô hình hóa hầu hết các khía cạnh của hệ thống y tế. Hiểu rõ cách phân loại các tài nguyên này sẽ giúp lập trình viên và kiến trúc sư giải pháp xây dựng các ứng dụng y tế hiệu quả và tương tác tốt.

Để áp dụng FHIR vào dự án thực tế, bạn nên:

1. **Xác định các tài nguyên phù hợp** với nhu cầu nghiệp vụ
2. **Tuân thủ các profiles** trong hướng dẫn triển khai cụ thể cho khu vực hoặc quốc gia
3. **Tận dụng các tài nguyên cơ sở hạ tầng** để xây dựng hệ thống mạnh mẽ
4. **Sử dụng tài nguyên tuân thủ** để định nghĩa mở rộng phù hợp với bối cảnh cụ thể

Với sự phát triển liên tục của FHIR, việc nắm vững các loại tài nguyên và cách sử dụng chúng sẽ giúp bạn xây dựng các hệ thống y tế hiện đại, tương tác và có khả năng mở rộng.
