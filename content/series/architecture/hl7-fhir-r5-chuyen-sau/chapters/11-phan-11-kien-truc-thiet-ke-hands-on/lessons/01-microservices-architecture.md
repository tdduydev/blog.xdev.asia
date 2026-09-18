---
id: 95219252-fae2-485d-8d3e-35bb9d3237e6
title: 'Microservices Architecture'
slug: microservices-architecture
description: 'Kiến trúc microservices cho hệ thống y tế thông minh dựa trên HL7 FHIR R5 được thiết kế nhằm tạo ra một nền tảng y tế số linh hoạt, có khả năng mở rộng cao và khả năng tích hợp mạnh mẽ. Hệ thống được phân chia thành các…'
duration_minutes: 15
is_free: true
video_url: null
sort_order: 1
section_title: 'Phần 11: Kiến trúc & Thiết kế (Hands-on)'
course:
  id: 019e3a00-0000-7001-e001-hl7r5000001
  title: 'HL7 FHIR R5 Chuyên Sâu — Reference & Thực hành'
  slug: hl7-fhir-r5-chuyen-sau
---
![FHIR Microservices Overview](/storage/uploads/hl7-r5/handson/image_1_.webp)

*FHIR Microservices Overview*

Kiến trúc microservices cho hệ thống y tế thông minh dựa trên HL7 FHIR R5 được thiết kế nhằm tạo ra một nền tảng y tế số linh hoạt, có khả năng mở rộng cao và khả năng tích hợp mạnh mẽ. Hệ thống được phân chia thành các dịch vụ nhỏ, độc lập, mỗi dịch vụ chịu trách nhiệm cho một phần chức năng cụ thể của hệ thống y tế.

### Nguyên tắc thiết kế

1. **Phân tách theo Domain**: Mỗi service đại diện cho một domain cụ thể trong hệ thống y tế
2. **Độc lập dữ liệu**: Mỗi service quản lý dữ liệu riêng của mình
3. **Giao tiếp không đồng bộ**: Sử dụng event-driven architecture để giảm phụ thuộc
4. **Chuẩn hóa giao tiếp**: REST API và FHIR làm chuẩn giao tiếp
5. **Khả năng thay thế**: Các service có thể được phát triển/thay thế mà không ảnh hưởng toàn hệ thống
6. **Security-by-design**: Áp dụng SMART on FHIR và các chuẩn bảo mật hiện đại

### Cấu trúc tổng thể

Hệ thống được chia thành 3 nhóm service chính:

#### 1. Core FHIR Resource Services

Các service quản lý tài nguyên FHIR cốt lõi, bao gồm:

* **Patient-Service**: Quản lý thông tin bệnh nhân (Patient, RelatedPerson, Person)
* **Encounter-Service**: Quản lý lịch sử khám (Encounter, Condition, AllergyIntolerance)
* **Appointment-Service**: Quản lý lịch tái khám (Appointment, Schedule, Slot)
* **Observation-Service**: Quản lý diễn biến lâm sàng (Observation, DeviceMetric, Procedure)
* **Medication-Service**: Quản lý đơn thuốc (MedicationRequest, Medication, MedicationDispense)
* **Analytics-Service**: Báo cáo thống kê (Measure, MeasureReport, DiagnosticReport)

#### 2. Patient-Facing Services

Các service phục vụ trực tiếp cho bệnh nhân:

* **Communication-Service**: Kết nối bệnh nhân với CSYT
* **Health-Tracking-Service**: Theo dõi sức khỏe cá nhân
* **Medication-Reminder-Service**: Nhắc lịch uống thuốc
* **Appointment-Reminder-Service**: Nhắc lịch tái khám
* **Community-Service**: Cộng đồng sức khỏe
* **Goal-Tracking-Service**: Theo dõi mục tiêu sức khỏe

#### 3. Infrastructure Services

Các service hạ tầng và tích hợp:

* **API-Gateway-Service**: Routing, Authorization
* **Authentication-Service**: Keycloak, SMART on FHIR
* **FHIR-Server-Service**: HAPI FHIR Server R5
* **Analytics-AI-Service**: Phân tích dữ liệu và AI
* **HIS-Integration-Service**: Tích hợp với HIS
* **EHR-Service**: Quản lý hồ sơ KCB

### Luồng dữ liệu

Hệ thống sử dụng hai mô hình giao tiếp chính:

1. **Giao tiếp đồng bộ (Synchronous)**:
   * API Gateway nhận request từ client
   * Routing đến service phù hợp
   * Service xử lý và trả về kết quả
2. **Giao tiếp bất đồng bộ (Asynchronous)**:
   * Service phát sinh sự kiện (event) qua Event Bus
   * Các service khác nhận và xử lý sự kiện
   * Đảm bảo tính nhất quán dữ liệu cuối cùng (eventual consistency)

### Công nghệ triển khai

* **Backend**: Spring Boot 3.4.3, HAPI FHIR Server R5
* **Database**: PostgreSQL + JSONB cho lưu trữ tài nguyên FHIR
* **Event Streaming**: Kafka/RabbitMQ
* **Service Discovery**: Eureka
* **API Gateway**: Spring Cloud Gateway/Kong
* **Authentication**: Keycloak (SMART on FHIR)
* **Containerization**: Docker, Kubernetes
* **Monitoring**: Prometheus, Grafana, ELK stack

### Ưu điểm của kiến trúc

1. **Khả năng mở rộng**: Dễ dàng thêm service mới khi có nhu cầu
2. **Độc lập triển khai**: Các team có thể làm việc độc lập trên các service
3. **Khả năng chịu lỗi**: Lỗi một service không ảnh hưởng toàn bộ hệ thống
4. **Đa công nghệ**: Có thể áp dụng công nghệ phù hợp cho từng service
5. **Tuân thủ chuẩn**: Hoàn toàn tuân thủ chuẩn FHIR R5
6. **Tích hợp linh hoạt**: Dễ dàng tích hợp với các hệ thống khác (HIS, LIS, RIS...)

### Thách thức và giải pháp

1. **Phức tạp trong quản lý**:
   * Giải pháp: CI/CD pipeline, Kubernetes orchestration
2. **Tính nhất quán dữ liệu**:
   * Giải pháp: Event sourcing, Saga pattern
3. **Monitoring & Debugging**:
   * Giải pháp: Distributed tracing, Centralized logging
4. **Security**:
   * Giải pháp: OAuth2/OIDC, SMART on FHIR authorization
5. **Performance**:
   * Giải pháp: Caching, API Gateway optimization

Kiến trúc microservices này cung cấp nền tảng vững chắc cho hệ thống y tế thông minh, cho phép phát triển linh hoạt và mở rộng dễ dàng, đồng thời đảm bảo khả năng tích hợp cao với hệ sinh thái y tế.
