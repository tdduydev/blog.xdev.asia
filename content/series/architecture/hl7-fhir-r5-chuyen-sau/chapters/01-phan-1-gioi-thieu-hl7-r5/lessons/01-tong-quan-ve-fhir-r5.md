---
id: 08eb4ac6-7688-47cf-a0cc-21ea2ca09e65
title: 'Tổng quan về FHIR R5'
slug: tong-quan-ve-fhir-r5
description: 'FHIR (Fast Healthcare Interoperability Resources) là tiêu chuẩn trao đổi dữ'
duration_minutes: 15
is_free: true
video_url: null
sort_order: 1
section_title: 'Phần 1: Giới thiệu HL7 R5'
course:
  id: 019e3a00-0000-7001-e001-hl7r5000001
  title: 'HL7 FHIR R5 Chuyên Sâu — Reference & Thực hành'
  slug: hl7-fhir-r5-chuyen-sau
---
![HL7 FHIR R5](/storage/uploads/hl7-r5/root/image_4_.webp)

**FHIR** (Fast Healthcare Interoperability Resources) là tiêu chuẩn trao đổi dữ liệu y tế thế hệ mới được phát triển bởi HL7 International. FHIR được thiết kế để giải quyết các vấn đề tương tác giữa các hệ thống thông tin y tế, giúp dữ liệu y tế có thể được chia sẻ dễ dàng và an toàn.

FHIR kết hợp các ưu điểm của các tiêu chuẩn trước đó (như HL7 v2, HL7 v3, và CDA) với các công nghệ web hiện đại, tạo nên một tiêu chuẩn:

* **Dễ triển khai**: Sử dụng các công nghệ web phổ biến (REST, JSON, XML)
* **Linh hoạt**: Có thể áp dụng cho nhiều trường hợp sử dụng khác nhau
* **Mở rộng được**: Cơ chế extension cho phép tùy chỉnh mà không làm mất tương thích
* **Dựa trên tài nguyên**: Chia nhỏ thông tin y tế thành các đơn vị có ý nghĩa (resources)
* **Human-readable**: Dễ hiểu đối với con người và máy tính
* **Có cộng đồng lớn**: Được hỗ trợ bởi cộng đồng developer toàn cầu

FHIR được sử dụng rộng rãi vì khả năng giải quyết các vấn đề tương tác y tế bằng cách:

* Giảm chi phí và độ phức tạp của việc tích hợp hệ thống
* Cải thiện khả năng truy cập dữ liệu y tế
* Hỗ trợ ứng dụng di động và web hiện đại
* Tạo điều kiện thuận lợi cho sự đổi mới trong chăm sóc sức khỏe
* Cung cấp các quy trình làm việc hiệu quả hơn cho nhân viên y tế

![HL7 FHIR R5](/storage/uploads/hl7-r5/root/svgviewer-output_1_.svg)

### Sự khác biệt giữa FHIR R5 với các phiên bản trước (R4, R3)

FHIR R5 (phiên bản 5.0.0) được phát hành vào tháng 3/2023, mang đến nhiều cải tiến đáng kể so với các phiên bản trước:

## So sánh FHIR R5 với R4

<table><thead><tr><th>Đặc điểm</th><th>FHIR R4</th><th width="346">FHIR R5</th></tr></thead><tbody><tr><td><strong>Tài nguyên mới</strong></td><td>Không có</td><td><ul><li>RequirementsDefinition</li></ul><ul><li>TestPlan, TestScript, TestReport</li></ul><ul><li>InventoryReport</li></ul><ul><li>MedicinalProductDefinition</li></ul><ul><li>SubscriptionStatus, SubscriptionTopic</li></ul></td></tr><tr><td><strong>Mô hình Subscription</strong></td><td>Mô hình cũ</td><td><ul><li>Kiến trúc Subscription hoàn toàn mới</li><li> Topic-based subscriptions</li><li>Nhiều kênh gửi thông báo khác nhau</li></ul></td></tr><tr><td><strong>Normative content</strong></td><td>Một số resources ở trạng thái trial use</td><td><ul><li>Nhiều resources chuyển từ trial use sang normative</li></ul><ul><li>Các phần chính của framework trở nên ổn định hơn</li></ul></td></tr><tr><td><strong>Workflow</strong></td><td>Cơ bản</td><td><ul><li>Cải thiện các resource liên quan đến workflow</li><li>Mở rộng status pattern</li></ul></td></tr><tr><td><strong>Khả năng Terminology</strong></td><td>Cơ bản</td><td><ul><li>ConceptMap enhancements</li></ul><ul><li>Improved ValueSet expansion</li></ul></td></tr><tr><td><strong>Verifiable credentials</strong></td><td>Không hỗ trợ</td><td><ul><li>Hỗ trợ cho chứng chỉ kỹ thuật số</li><li> Nền tảng cho identity management</li></ul></td></tr></tbody></table>

## So sánh FHIR R5 với R3

<table><thead><tr><th>Đặc điểm</th><th>FHIR R4</th><th width="374">FHIR R5</th></tr></thead><tbody><tr><td><strong>Tài nguyên mới</strong></td><td>Không có</td><td><ul><li>RequirementsDefinition</li><li>TestPlan, TestScript, TestReport</li><li>InventoryReport</li><li>MedicinalProductDefinition</li><li>SubscriptionStatus, SubscriptionTopic</li></ul></td></tr><tr><td><strong>Mô hình Subscription</strong></td><td>Mô hình cũ</td><td><ul><li>Kiến trúc Subscription hoàn toàn mới</li><li>Topic-based subscriptions</li><li>Nhiều kênh gửi thông báo khác nhau</li></ul></td></tr><tr><td><strong>Normative content</strong></td><td>Một số resources ở trạng thái trial use</td><td><ul><li>Nhiều resources chuyển từ trial use sang normative</li><li>Các phần chính của framework trở nên ổn định hơn</li></ul></td></tr><tr><td><strong>Kiến trúc</strong></td><td>Đang phát triển</td><td><ul><li>Các tài nguyên cốt lõi đã normative</li><li>APIs và format đã ổn định</li></ul></td></tr><tr><td><strong>Tài nguyên</strong></td><td>Số lượng cơ bản</td><td><ul><li>Số lượng tài nguyên tăng đáng kể</li><li>Bao phủ nhiều lĩnh vực y tế hơn</li></ul></td></tr><tr><td><strong>Workflow</strong></td><td>Cơ bản</td><td><ul><li>Cải thiện các resource liên quan đến workflow</li><li>Mở rộng status pattern</li></ul></td></tr><tr><td><strong>Khả năng Terminology</strong></td><td>Cơ bản</td><td><ul><li>ConceptMap enhancements</li><li>Improved ValueSet expansion</li></ul></td></tr><tr><td><strong>Cơ chế search</strong></td><td>Cơ bản</td><td><ul><li>Cải tiến search parameters</li><li>Hỗ trợ nhiều cách lọc phức tạp hơn</li></ul></td></tr><tr><td><strong>Quy tắc validation</strong></td><td>Đơn giản</td><td><ul><li>FHIRPath expressions</li><li>Invariants được nâng cấp</li></ul></td></tr><tr><td><strong>Conformance framework</strong></td><td>Chưa hoàn thiện</td><td><ul><li>Implementation Guides framework</li><li>Package management</li></ul></td></tr><tr><td><strong>Verifiable credentials</strong></td><td>Không hỗ trợ</td><td><ul><li>Hỗ trợ cho chứng chỉ kỹ thuật số</li><li>Nền tảng cho identity management</li></ul></td></tr></tbody></table>

### Các thành phần chính trong FHIR R5

FHIR R5 bao gồm các thành phần chính sau:

#### 1. Resources (Tài nguyên)

Tài nguyên là các đơn vị cơ bản của thông tin trong FHIR. R5 có 156 tài nguyên, được chia thành các nhóm:

* **Clinical**: Patient, Observation, Condition, Procedure...
* **Administrative**: Practitioner, Organization, Location...
* **Financial**: Claim, Account, Coverage...
* **Conformance**: StructureDefinition, ValueSet, CodeSystem...
* **Infrastructure**: OperationOutcome, Parameters, Bundle...
* **Specialized**: ResearchStudy, MolecularSequence...

#### 2. Data Types

FHIR sử dụng hai loại kiểu dữ liệu:

* **Primitive types**: string, integer, boolean, uri...
* **Complex types**: Identifier, HumanName, Address, CodeableConcept...

#### 3. Extension Framework

Cơ chế extension cho phép mở rộng tài nguyên mà không làm mất khả năng tương tác:

* Simple extensions
* Complex extensions
* modifierExtensions

#### 4. RESTful API

FHIR định nghĩa một API dựa trên REST:

* CRUD operations (Create, Read, Update, Delete)
* Search functionality
* Operations
* Batch và transactions

#### 5. Narrative

Mỗi tài nguyên có phần narrative hiển thị dữ liệu dưới dạng human-readable:

* Xây dựng từ dữ liệu có cấu trúc
* Hỗ trợ XHTML hạn chế
* Đảm bảo các hệ thống không cần phải hiểu dữ liệu có cấu trúc

#### 6. Conformance Layer

Các công cụ để xác định cách triển khai FHIR cụ thể:

* Profiles (StructureDefinition)
* Extensions
* Implementation Guides
* Capability Statements

#### 7. Terminologies

Hỗ trợ cho các hệ thống mã hóa và thuật ngữ:

* CodeSystem
* ValueSet
* ConceptMap
* NamingSystem

#### 8. Exchange Paradigms

FHIR hỗ trợ nhiều cách trao đổi dữ liệu:

* RESTful API
* Messaging
* Documents
* Services (SOA)
* Bulk Data

### Normative vs. Trial Use Elements trong R5

FHIR R5 phân biệt rõ ràng giữa các phần Normative và Trial Use:

#### Normative

Các phần Normative là những phần đã được xem xét kỹ lưỡng và được coi là ổn định. Chúng sẽ không thay đổi đáng kể trong các phiên bản tương lai, đảm bảo khả năng tương thích ngược.

**Các phần Normative trong R5 bao gồm**:

* RESTful API framework
* XML và JSON serialization
* Datatypes core
* Nhiều tài nguyên cốt lõi: Patient, Observation, Condition...
* Extension framework
* Search framework
* Terminology infrastructure
* Conformance framework

#### Trial Use

Các phần Trial Use vẫn đang trong quá trình phát triển và có thể thay đổi trong các phiên bản tương lai. Chúng được đưa vào tiêu chuẩn để thu thập phản hồi từ người triển khai.

**Các phần Trial Use trong R5 bao gồm**:

* Một số tài nguyên mới: RequirementsDefinition, InventoryReport...
* Subscription framework mới
* Một số operations cụ thể
* GraphQL interface
* Một số extensions của conformance framework
* Các phần mới của workflow pattern

Việc phân biệt giữa Normative và Trial Use giúp các nhà phát triển hiểu rõ:

* Những phần nào của tiêu chuẩn đã ổn định
* Những phần nào có thể thay đổi trong tương lai
* Mức độ cam kết về khả năng tương thích ngược

FHIR R5 đánh dấu một bước tiến quan trọng trong sự phát triển của tiêu chuẩn, với nhiều phần đã chuyển từ Trial Use sang Normative, cho thấy sự trưởng thành và ổn định ngày càng tăng của FHIR như một tiêu chuẩn tương tác y tế toàn cầu.
