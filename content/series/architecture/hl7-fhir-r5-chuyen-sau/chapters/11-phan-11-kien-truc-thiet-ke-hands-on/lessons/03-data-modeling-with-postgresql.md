---
id: 4aa6b1b0-6b5e-45d3-8923-d4823504436d
title: 'Data Modeling with PostgreSQL'
slug: data-modeling-with-postgresql
description: 'Tài liệu này trình bày phương pháp tối ưu để thiết kế cơ sở dữ liệu PostgreSQL'
duration_minutes: 15
is_free: true
video_url: null
sort_order: 3
section_title: 'Phần 11: Kiến trúc & Thiết kế (Hands-on)'
course:
  id: 019e3a00-0000-7001-e001-hl7r5000001
  title: 'HL7 FHIR R5 Chuyên Sâu — Reference & Thực hành'
  slug: hl7-fhir-r5-chuyen-sau
---
Trong xu hướng chuyển đổi số ngành y tế, việc lựa chọn mô hình dữ liệu phù hợp đóng vai trò quyết định đến hiệu quả hoạt động của toàn bộ hệ thống. Tiêu chuẩn HL7 FHIR (Fast Healthcare Interoperability Resources) phiên bản 5 mang đến khả năng tương tác dữ liệu y tế vượt trội, trong khi PostgreSQL cung cấp nền tảng cơ sở dữ liệu mạnh mẽ, linh hoạt và mở rộng.

Bài viết này trình bày cách thiết kế mô hình dữ liệu PostgreSQL tối ưu cho việc triển khai FHIR, giúp các đơn vị y tế xây dựng hệ thống thông tin hiệu quả, đáp ứng các tiêu chuẩn quốc tế trong khi vẫn đáp ứng các yêu cầu đặc thù của ngành y tế Việt Nam.

### Tổng quan về FHIR và PostgreSQL

![Data Modeling with PostgreSQL](/storage/uploads/hl7-r5/handson/image_3_.webp)

*Data Modeling with PostgreSQL*

#### FHIR v5 - Điểm mạnh cho hệ thống y tế

FHIR v5 cung cấp cấu trúc dữ liệu chuẩn hóa cho hơn 150 loại tài nguyên (resources) khác nhau, từ thông tin bệnh nhân, nhân viên y tế, đến các quan sát lâm sàng, kế hoạch điều trị và chỉ định thuốc. Mỗi tài nguyên đều được định nghĩa bởi một tập hợp các trường dữ liệu và có thể mở rộng thông qua cơ chế Extensions.

#### PostgreSQL - Nền tảng lý tưởng cho FHIR

PostgreSQL là hệ quản trị cơ sở dữ liệu quan hệ mã nguồn mở với nhiều ưu điểm nổi bật:

* Hỗ trợ kiểu dữ liệu JSONB - lý tưởng cho lưu trữ dữ liệu FHIR
* Khả năng đánh chỉ mục trên dữ liệu JSON
* Hỗ trợ toàn diện các ràng buộc và giao dịch
* Khả năng mở rộng cao với nhiều extension

### Thiết kế Mô hình Dữ liệu FHIR trên PostgreSQL

#### 1. Kiến trúc Bảng Tài nguyên (Resource Tables)

Trong thiết kế này, mỗi loại tài nguyên FHIR chính sẽ có một bảng riêng, với cấu trúc cơ bản như sau:

**Bảng Patient (Bệnh nhân)**

```sql
CREATE TABLE patient (
    id UUID PRIMARY KEY,
    version_id UUID NOT NULL,
    last_updated TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(50) NOT NULL,
    resource_data JSONB NOT NULL,
    
    -- Các trường riêng biệt cho tìm kiếm nhanh
    identifier JSONB,
    family_name VARCHAR(255),
    given_name VARCHAR(255),
    birth_date DATE
);
```

**Bảng Observation (Quan sát y tế)**

```sql
CREATE TABLE observation (
    id UUID PRIMARY KEY,
    version_id UUID NOT NULL,
    subject_reference UUID, -- Liên kết đến bệnh nhân
    status VARCHAR(50) NOT NULL,
    issued_date TIMESTAMP WITH TIME ZONE,
    resource_data JSONB NOT NULL,
    
    -- Các trường thường dùng cho tìm kiếm
    code VARCHAR(100),
    value_quantity NUMERIC,
    value_unit VARCHAR(50)
);
```

**Bảng Tài nguyên Khác**

Tương tự, các bảng khác như `medication_request`, `condition`, `encounter` và `care_plan` được thiết kế với cấu trúc tương tự, kết hợp giữa các trường thông thường và trường `resource_data` kiểu JSONB chứa toàn bộ nội dung tài nguyên FHIR.

#### 2. Thiết kế Bảng Chỉ mục và Phần mở rộng

**Bảng Chỉ mục Tham số Tìm kiếm**

```sql
CREATE TABLE search_parameter_index (
    id UUID PRIMARY KEY,
    resource_type VARCHAR(100) NOT NULL,
    resource_id UUID NOT NULL,
    param_name VARCHAR(100) NOT NULL,
    param_value_string VARCHAR(255),
    param_value_date DATE,
    param_value_number NUMERIC,
    param_value_reference UUID,
    
    CONSTRAINT fk_resource FOREIGN KEY (resource_id, resource_type) 
    REFERENCES resource(id, resource_type)
);

-- Chỉ mục để tối ưu truy vấn
CREATE INDEX idx_search_param_name_value 
ON search_parameter_index(resource_type, param_name, param_value_string);
```

**Bảng Chỉ mục Phần mở rộng (Extensions)**

```sql
CREATE TABLE extension_index (
    id UUID PRIMARY KEY,
    resource_type VARCHAR(100) NOT NULL,
    resource_id UUID NOT NULL,
    extension_url VARCHAR(255) NOT NULL,
    extension_value JSONB,
    
    CONSTRAINT fk_resource FOREIGN KEY (resource_id, resource_type) 
    REFERENCES resource(id, resource_type)
);

-- Chỉ mục cho extensions đặc thù Việt Nam
CREATE INDEX idx_extension_url 
ON extension_index(extension_url);
```

**Bảng Chỉ mục Tham chiếu (References)**

```sql
CREATE TABLE reference_index (
    id UUID PRIMARY KEY,
    resource_type VARCHAR(100) NOT NULL,
    resource_id UUID NOT NULL,
    reference_name VARCHAR(100) NOT NULL,
    target_resource_type VARCHAR(100),
    target_resource_id UUID,
    
    CONSTRAINT fk_resource FOREIGN KEY (resource_id, resource_type) 
    REFERENCES resource(id, resource_type)
);

-- Chỉ mục cho các quan hệ tham chiếu
CREATE INDEX idx_reference_target 
ON reference_index(target_resource_type, target_resource_id);
```

#### 3. Quản lý Phần mở rộng Đặc thù Việt Nam

FHIR cho phép mở rộng tài nguyên qua cơ chế Extensions. Trong bối cảnh y tế Việt Nam, một số extensions phổ biến cần được đánh chỉ mục hiệu quả:

```sql
-- Ví dụ extensions cho bệnh nhân Việt Nam
INSERT INTO extension_index (id, resource_type, resource_id, extension_url, extension_value)
VALUES (
    gen_random_uuid(),
    'Patient',
    '123e4567-e89b-12d3-a456-426614174000',
    'http://hospital.vn/fhir/dan-toc',
    '"Kinh"'
);

INSERT INTO extension_index (id, resource_type, resource_id, extension_url, extension_value)
VALUES (
    gen_random_uuid(),
    'Patient',
    '123e4567-e89b-12d3-a456-426614174000',
    'http://hospital.vn/fhir/nguoi-giam-ho',
    '{"ho-ten": "Nguyễn Văn B", "moi-quan-he": "Cha"}'
);
```

### Ưu điểm của Thiết kế

#### 1. Linh hoạt trong Lưu trữ Dữ liệu

Thiết kế này kết hợp ưu điểm của cả cơ sở dữ liệu quan hệ và NoSQL:

* Trường `resource_data` kiểu JSONB lưu trữ toàn bộ tài nguyên FHIR nguyên bản
* Các trường riêng biệt cho thông tin thường xuyên truy vấn và tìm kiếm
* Dễ dàng thích ứng với các phiên bản FHIR mới mà không cần thay đổi cấu trúc bảng

#### 2. Hiệu suất Truy vấn Tối ưu

Thiết kế tập trung vào hiệu suất truy vấn với:

* Các bảng chỉ mục tách biệt cho từng loại thao tác tìm kiếm
* Chỉ mục GIN trên trường JSONB để tìm kiếm hiệu quả
* Bảng tham chiếu để truy vấn quan hệ giữa các tài nguyên

#### 3. Hỗ trợ Tìm kiếm Phức tạp

```sql
-- Ví dụ truy vấn tìm bệnh nhân dân tộc Kinh có chỉ số huyết áp cao
SELECT p.id, p.resource_data
FROM patient p
JOIN extension_index e ON p.id = e.resource_id AND e.resource_type = 'Patient'
JOIN observation o ON p.id = (
    SELECT r.resource_id FROM reference_index r 
    WHERE r.target_resource_id = p.id AND r.target_resource_type = 'Patient'
    AND r.resource_type = 'Observation'
)
WHERE e.extension_url = 'http://hospital.vn/fhir/dan-toc'
AND e.extension_value::text = '"Kinh"'
AND o.code = 'blood-pressure'
AND o.value_quantity > 140;
```

#### 4. Quản lý Phiên bản và Lịch sử

Thiết kế hỗ trợ phiên bản và lịch sử thay đổi thông qua:

* Trường `version_id` để theo dõi phiên bản
* Trường `last_updated` ghi nhận thời điểm cập nhật
* Có thể dễ dàng mở rộng để lưu trữ lịch sử đầy đủ

#### 5. Hỗ trợ Extensions Đặc thù Việt Nam

Bảng `extension_index` cho phép:

* Lưu trữ và tìm kiếm hiệu quả các extension đặc thù Việt Nam
* Đánh chỉ mục cho các thông tin như dân tộc, địa chỉ theo tỉnh/huyện/xã
* Hỗ trợ tìm kiếm thông tin người giám hộ, quan hệ gia đình

### Cân nhắc khi Triển khai

#### 1. Đánh chỉ mục Thông minh

```sql
-- Chỉ mục GIN cho trường JSONB
CREATE INDEX idx_patient_resource_data ON patient USING GIN (resource_data);

-- Chỉ mục cho các trường thường truy vấn
CREATE INDEX idx_patient_name ON patient (family_name, given_name);
```

#### 2. Hàm Truy vấn Tùy chỉnh

```sql
-- Hàm tìm kiếm bệnh nhân theo mã địa phương
CREATE OR REPLACE FUNCTION find_patient_by_local_id(local_id TEXT)
RETURNS TABLE (id UUID, resource_data JSONB) AS $$
BEGIN
    RETURN QUERY
    SELECT p.id, p.resource_data
    FROM patient p
    WHERE p.resource_data->'identifier' @> 
        '[{"system": "http://hospital.vn/id/patient", "value": ' || local_id || '}]';
END;
$$ LANGUAGE plpgsql;
```

#### 3. Kiểm soát Truy cập Dữ liệu

```sql
-- Tạo cơ chế quyền hạn và kiểm soát truy cập
CREATE TABLE resource_access (
    resource_type VARCHAR(100) NOT NULL,
    resource_id UUID NOT NULL,
    user_id UUID NOT NULL,
    permission_level VARCHAR(50) NOT NULL,
    PRIMARY KEY (resource_type, resource_id, user_id)
);
```

### Kết luận

Thiết kế mô hình dữ liệu PostgreSQL cho hệ thống y tế dựa trên HL7 FHIR v5 cần cân bằng giữa tính linh hoạt của dữ liệu FHIR và hiệu suất của cơ sở dữ liệu quan hệ. Mô hình được trình bày trong bài viết này cung cấp một cách tiếp cận tối ưu, kết hợp các ưu điểm của PostgreSQL như kiểu dữ liệu JSONB, chỉ mục GIN và các ràng buộc quan hệ.

Với mô hình này, các đơn vị y tế có thể xây dựng hệ thống thông tin tuân thủ tiêu chuẩn FHIR quốc tế, đồng thời đáp ứng các yêu cầu đặc thù của ngành y tế Việt Nam, hỗ trợ hiệu quả hoạt động chăm sóc sức khỏe, nghiên cứu y học và quản lý hành chính.
