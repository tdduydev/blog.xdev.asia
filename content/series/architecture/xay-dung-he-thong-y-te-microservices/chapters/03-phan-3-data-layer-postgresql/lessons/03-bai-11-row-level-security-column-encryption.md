---
id: 019e1a40-a111-7001-d001-f0a1b2c30111
title: 'Bài 11: Row-Level Security & Column Encryption cho PHI'
slug: bai-11-row-level-security-column-encryption
description: >-
  Triển khai Row-Level Security (RLS) trong PostgreSQL cho dữ liệu y tế:
  RLS policies cho patient data isolation, department-based access control,
  doctor-patient relationship policies, column-level encryption cho
  sensitive fields (SSN, diagnosis, lab results), dynamic data masking,
  và tích hợp RLS với Keycloak JWT claims trong Quarkus.
duration_minutes: 180
is_free: true
video_url: null
sort_order: 11
section_title: "Phần 3: Xây dựng Data Layer — PostgreSQL cho Y tế"
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: Xây dựng Hệ thống Y tế Microservices — Quarkus, PostgreSQL, Keycloak chuẩn HIPAA
  slug: xay-dung-he-thong-y-te-microservices
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-6174" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-6174)"/>

  <!-- Decorations -->
  <g>
    <circle cx="785" cy="185" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="970" cy="150" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="655" cy="115" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="840" cy="80" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="1025" cy="45" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <line x1="600" y1="55" x2="1100" y2="135" stroke="#fb923c" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="85" x2="1050" y2="155" stroke="#fb923c" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1030.9807621135333,190 1030.9807621135333,220 1005,235 979.0192378864668,220 979.0192378864668,190 1005,175" fill="none" stroke="#fb923c" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fb923c"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fb923c" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ Kiến trúc — Bài 11</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 11: Row-Level Security &amp; Column</tspan>
      <tspan x="60" dy="42">Encryption cho PHI</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Xây dựng Hệ thống Y tế Microservices — Quarkus, PostgreSQL, Keycloak chuẩn HIPAA</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 3: Xây dựng Data Layer — PostgreSQL cho Y tế</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. Tổng quan Row-Level Security (RLS)

![Row-Level Security Pipeline — JWT Claims → SET LOCAL → RLS Policy](/storage/uploads/2026/04/healthcare-rls-request-flow.webp)

Row-Level Security (RLS) cho phép PostgreSQL kiểm soát **hàng nào** trong bảng mà user có thể nhìn thấy hoặc thao tác. Đây là tính năng critical cho healthcare vì:

- **Bác sĩ A** chỉ thấy bệnh nhân của mình
- **Y tá khoa Nội** chỉ thấy bệnh nhân khoa Nội
- **Admin bệnh viện** thấy tất cả bệnh nhân của bệnh viện đó
- **Bệnh nhân** chỉ thấy hồ sơ của chính mình

### 1.1. RLS vs Application-Level Filtering

![So sánh Application-Level Filtering vs Row-Level Security trong PostgreSQL](/storage/uploads/2026/04/healthcare-rls-vs-app-filtering.webp)

**Application-Level Filtering (KHÔNG AN TOÀN):**

- `SELECT * FROM patients WHERE doctor_id = :currentDoctor`
- Developer quên WHERE clause → data leak
- SQL injection bypass WHERE clause
- Direct DB access bypass application logic
- Reporting tools bypass application

**Row-Level Security (AN TOÀN):**

- `SELECT * FROM patients;` — Trả về CHỈ rows allowed
- Database enforce, không bypass được
- Transparent cho application
- Works với mọi tool (psql, reporting, BI)
- Defense in depth layer

### 1.2. RLS Architecture cho Healthcare

![RLS Request Flow — JWT → Session Variables → Policy Evaluation → Filtered Results](/storage/uploads/2026/04/healthcare-rls-request-flow.webp)

**Request Flow:**

1. **Quarkus App** — Extract JWT claims (user_id, role, department, hospital_id)
2. **SET LOCAL** session variables (`app.current_user_id`, `app.current_role`, `app.current_dept`, `app.hospital_id`)
3. **Execute query** — `SELECT * FROM patients;`
4. **PostgreSQL RLS Policy** evaluates `current_setting('app.current_role')`, `current_setting('app.current_dept')`
5. **Return ONLY allowed rows** — Results filtered by RLS

## 2. Thiết lập RLS cơ bản

### 2.1. Schema cho Healthcare Database

```sql
-- =====================================================
-- HEALTHCARE DATABASE SCHEMA VỚI RLS SUPPORT
-- =====================================================

-- Bảng hospitals
CREATE TABLE patient_schema.hospitals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng departments
CREATE TABLE patient_schema.departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_id UUID NOT NULL REFERENCES patient_schema.hospitals(id),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) NOT NULL,
    UNIQUE(hospital_id, code)
);

-- Bảng staff (bác sĩ, y tá, admin)
CREATE TABLE patient_schema.staff (
    id UUID PRIMARY KEY,  -- Maps to Keycloak user ID
    hospital_id UUID NOT NULL REFERENCES patient_schema.hospitals(id),
    department_id UUID REFERENCES patient_schema.departments(id),
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,  -- 'doctor', 'nurse', 'admin', 'lab_tech'
    license_number VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng patients
CREATE TABLE patient_schema.patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_id UUID NOT NULL REFERENCES patient_schema.hospitals(id),
    department_id UUID REFERENCES patient_schema.departments(id),
    
    -- PHI fields (sẽ encrypt ở section sau)
    full_name_encrypted BYTEA NOT NULL,
    date_of_birth_encrypted BYTEA,
    national_id_encrypted BYTEA,
    phone_encrypted BYTEA,
    
    -- Non-PHI metadata
    patient_code VARCHAR(20) NOT NULL,
    admission_date DATE,
    discharge_date DATE,
    status VARCHAR(20) DEFAULT 'active',
    
    -- Search hashes
    national_id_hash TEXT UNIQUE,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng doctor-patient relationship
CREATE TABLE patient_schema.doctor_patient (
    doctor_id UUID NOT NULL REFERENCES patient_schema.staff(id),
    patient_id UUID NOT NULL REFERENCES patient_schema.patients(id),
    relationship_type VARCHAR(30) NOT NULL,  -- 'primary', 'consulting', 'referred'
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT true,
    PRIMARY KEY (doctor_id, patient_id)
);

-- Bảng medical records
CREATE TABLE patient_schema.medical_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patient_schema.patients(id),
    doctor_id UUID NOT NULL REFERENCES patient_schema.staff(id),
    department_id UUID REFERENCES patient_schema.departments(id),
    hospital_id UUID NOT NULL REFERENCES patient_schema.hospitals(id),
    
    record_type VARCHAR(50) NOT NULL,  -- 'examination', 'lab_order', 'prescription'
    
    -- Encrypted content
    content_encrypted BYTEA NOT NULL,
    encryption_key_id TEXT NOT NULL,
    
    -- Metadata
    record_date TIMESTAMPTZ DEFAULT NOW(),
    icd_code VARCHAR(10),
    is_sensitive BOOLEAN DEFAULT false,  -- HIV, psychiatric, etc.
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2.2. Enable RLS

```sql
-- =====================================================
-- ENABLE ROW-LEVEL SECURITY
-- =====================================================

-- Enable RLS trên tất cả sensitive tables
ALTER TABLE patient_schema.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_schema.medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_schema.doctor_patient ENABLE ROW LEVEL SECURITY;

-- FORCE RLS cho table owner (mặc định owner bypass RLS)
ALTER TABLE patient_schema.patients FORCE ROW LEVEL SECURITY;
ALTER TABLE patient_schema.medical_records FORCE ROW LEVEL SECURITY;
ALTER TABLE patient_schema.doctor_patient FORCE ROW LEVEL SECURITY;

-- Verify RLS enabled
SELECT 
    schemaname,
    tablename,
    rowsecurity AS rls_enabled,
    forcerowsecurity AS rls_forced
FROM pg_tables
WHERE schemaname = 'patient_schema'
ORDER BY tablename;
```

## 3. RLS Policies cho Patient Data Isolation

### 3.1. Hospital-Level Isolation

```sql
-- =====================================================
-- POLICY 1: Hospital Isolation
-- Mỗi user chỉ thấy data của bệnh viện mình
-- =====================================================

CREATE POLICY hospital_isolation ON patient_schema.patients
    USING (
        hospital_id = current_setting('app.hospital_id', true)::UUID
    );

-- Áp dụng cho medical_records
CREATE POLICY hospital_isolation ON patient_schema.medical_records
    USING (
        hospital_id = current_setting('app.hospital_id', true)::UUID
    );
```

### 3.2. Role-Based Policies

```sql
-- =====================================================
-- POLICY 2: Doctor - chỉ thấy bệnh nhân của mình
-- =====================================================

-- Drop policy cũ nếu có
DROP POLICY IF EXISTS hospital_isolation ON patient_schema.patients;

-- Policy tổng hợp cho patients table
CREATE POLICY patient_access ON patient_schema.patients
    FOR ALL
    USING (
        -- Hospital isolation (tất cả roles)
        hospital_id = current_setting('app.hospital_id', true)::UUID
        AND (
            -- CASE 1: Admin - thấy tất cả bệnh nhân trong bệnh viện
            current_setting('app.current_role', true) = 'admin'
            
            -- CASE 2: Doctor - thấy bệnh nhân có relationship
            OR (
                current_setting('app.current_role', true) = 'doctor'
                AND EXISTS (
                    SELECT 1 FROM patient_schema.doctor_patient dp
                    WHERE dp.patient_id = patients.id
                      AND dp.doctor_id = current_setting('app.current_user_id', true)::UUID
                      AND dp.is_active = true
                )
            )
            
            -- CASE 3: Nurse - thấy bệnh nhân cùng khoa
            OR (
                current_setting('app.current_role', true) = 'nurse'
                AND department_id = current_setting('app.current_dept_id', true)::UUID
            )
            
            -- CASE 4: Patient - chỉ thấy hồ sơ của mình
            OR (
                current_setting('app.current_role', true) = 'patient'
                AND id = current_setting('app.current_patient_id', true)::UUID
            )
        )
    )
    WITH CHECK (
        -- INSERT/UPDATE: chỉ cho phép trong hospital của mình
        hospital_id = current_setting('app.hospital_id', true)::UUID
    );
```

### 3.3. Medical Records Policy

```sql
-- =====================================================
-- POLICY cho Medical Records
-- Chi tiết hơn vì chứa sensitive clinical data
-- =====================================================

CREATE POLICY medical_record_access ON patient_schema.medical_records
    FOR SELECT
    USING (
        hospital_id = current_setting('app.hospital_id', true)::UUID
        AND (
            -- Admin: tất cả records trong bệnh viện
            current_setting('app.current_role', true) = 'admin'
            
            -- Doctor: records của bệnh nhân mình (qua doctor_patient)
            OR (
                current_setting('app.current_role', true) = 'doctor'
                AND (
                    -- Records tạo bởi doctor này
                    doctor_id = current_setting('app.current_user_id', true)::UUID
                    -- HOẶC bệnh nhân có relationship
                    OR EXISTS (
                        SELECT 1 FROM patient_schema.doctor_patient dp
                        WHERE dp.patient_id = medical_records.patient_id
                          AND dp.doctor_id = current_setting('app.current_user_id', true)::UUID
                          AND dp.is_active = true
                    )
                )
            )
            
            -- Nurse: records trong department (trừ sensitive)
            OR (
                current_setting('app.current_role', true) = 'nurse'
                AND department_id = current_setting('app.current_dept_id', true)::UUID
                AND is_sensitive = false
            )
            
            -- Lab tech: chỉ lab orders
            OR (
                current_setting('app.current_role', true) = 'lab_tech'
                AND record_type = 'lab_order'
                AND department_id = current_setting('app.current_dept_id', true)::UUID
            )
            
            -- Patient Portal: chỉ records của mình (trừ internal notes)
            OR (
                current_setting('app.current_role', true) = 'patient'
                AND patient_id = current_setting('app.current_patient_id', true)::UUID
                AND record_type != 'internal_note'
            )
        )
    );

-- INSERT policy cho medical records
CREATE POLICY medical_record_insert ON patient_schema.medical_records
    FOR INSERT
    WITH CHECK (
        hospital_id = current_setting('app.hospital_id', true)::UUID
        AND doctor_id = current_setting('app.current_user_id', true)::UUID
        AND current_setting('app.current_role', true) IN ('doctor', 'nurse')
    );

-- UPDATE policy - chỉ doctor tạo mới được sửa
CREATE POLICY medical_record_update ON patient_schema.medical_records
    FOR UPDATE
    USING (
        doctor_id = current_setting('app.current_user_id', true)::UUID
        AND current_setting('app.current_role', true) = 'doctor'
        -- Chỉ sửa trong vòng 24 giờ
        AND created_at > NOW() - INTERVAL '24 hours'
    );

-- KHÔNG có DELETE policy - medical records không được xóa
```

### 3.4. Emergency Access (Break-the-Glass)

```sql
-- =====================================================
-- EMERGENCY ACCESS POLICY
-- Cho phép truy cập khẩn cấp khi bệnh nhân nguy kịch
-- =====================================================

-- Bảng ghi log emergency access
CREATE TABLE patient_schema.emergency_access_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    staff_id UUID NOT NULL,
    patient_id UUID NOT NULL,
    reason TEXT NOT NULL,
    approved_by UUID,
    access_time TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '4 hours'
);

-- Function kiểm tra emergency access
CREATE OR REPLACE FUNCTION patient_schema.has_emergency_access(
    p_patient_id UUID
) RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM patient_schema.emergency_access_log
        WHERE staff_id = current_setting('app.current_user_id', true)::UUID
          AND patient_id = p_patient_id
          AND expires_at > NOW()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Thêm emergency access vào patient policy
DROP POLICY IF EXISTS patient_access ON patient_schema.patients;

CREATE POLICY patient_access ON patient_schema.patients
    FOR ALL
    USING (
        hospital_id = current_setting('app.hospital_id', true)::UUID
        AND (
            -- Các rules bình thường (admin, doctor, nurse, patient)
            current_setting('app.current_role', true) = 'admin'
            
            OR (
                current_setting('app.current_role', true) = 'doctor'
                AND EXISTS (
                    SELECT 1 FROM patient_schema.doctor_patient dp
                    WHERE dp.patient_id = patients.id
                      AND dp.doctor_id = current_setting('app.current_user_id', true)::UUID
                      AND dp.is_active = true
                )
            )
            
            OR (
                current_setting('app.current_role', true) = 'nurse'
                AND department_id = current_setting('app.current_dept_id', true)::UUID
            )
            
            OR (
                current_setting('app.current_role', true) = 'patient'
                AND id = current_setting('app.current_patient_id', true)::UUID
            )
            
            -- EMERGENCY ACCESS
            OR patient_schema.has_emergency_access(patients.id)
        )
    )
    WITH CHECK (
        hospital_id = current_setting('app.hospital_id', true)::UUID
    );
```

## 4. Tích hợp RLS với Keycloak JWT trong Quarkus

### 4.1. Connection Interceptor

```java
// =====================================================
// RLS CONNECTION INTERCEPTOR
// Set JWT claims as PostgreSQL session variables
// =====================================================

@ApplicationScoped
public class RlsConnectionInterceptor {

    @Inject
    SecurityIdentity securityIdentity;

    @Inject
    JsonWebToken jwt;

    @Inject
    AgroalDataSource dataSource;

    /**
     * Wrapper method - set RLS variables trước mỗi query
     */
    public <T> T executeWithRls(Function<Connection, T> action) {
        try (Connection conn = dataSource.getConnection()) {
            setRlsVariables(conn);
            return action.apply(conn);
        } catch (SQLException e) {
            throw new RuntimeException("Database operation failed", e);
        }
    }

    /**
     * Set session variables từ JWT claims
     */
    private void setRlsVariables(Connection conn) throws SQLException {
        // Extract claims từ Keycloak JWT
        String userId = jwt.getSubject();
        String role = extractPrimaryRole();
        String hospitalId = jwt.getClaim("hospital_id");
        String departmentId = jwt.getClaim("department_id");
        String patientId = jwt.getClaim("patient_id");

        // Set session variables cho current transaction
        try (Statement stmt = conn.createStatement()) {
            // SET LOCAL chỉ apply cho transaction hiện tại
            stmt.execute("SET LOCAL app.current_user_id = " + quote(userId));
            stmt.execute("SET LOCAL app.current_role = " + quote(role));
            stmt.execute("SET LOCAL app.hospital_id = " + quote(hospitalId));

            if (departmentId != null) {
                stmt.execute("SET LOCAL app.current_dept_id = " + quote(departmentId));
            }
            if (patientId != null) {
                stmt.execute("SET LOCAL app.current_patient_id = " + quote(patientId));
            }
        }
    }

    private String extractPrimaryRole() {
        // Priority: doctor > nurse > lab_tech > admin > patient
        Set<String> roles = securityIdentity.getRoles();
        if (roles.contains("doctor")) return "doctor";
        if (roles.contains("nurse")) return "nurse";
        if (roles.contains("lab_tech")) return "lab_tech";
        if (roles.contains("admin")) return "admin";
        if (roles.contains("patient")) return "patient";
        return "unknown";
    }

    private String quote(String value) {
        if (value == null) return "''";
        // Prevent SQL injection trong SET LOCAL
        return "'" + value.replace("'", "''") + "'";
    }
}
```

### 4.2. Hibernate Interceptor (Alternative)

```java
// =====================================================
// HIBERNATE CONNECTION PROVIDER VỚI RLS
// Tự động set JWT claims khi Hibernate lấy connection
// =====================================================

@ApplicationScoped
public class RlsAgroalOpenConnectionObserver
        implements AgroalDataSourceConfigurationSupplier {

    @Inject
    JsonWebToken jwt;

    @Inject
    SecurityIdentity identity;

    /**
     * Sử dụng Agroal connection customizer
     */
    @Produces
    @ApplicationScoped
    public ConnectionCustomizer connectionCustomizer() {
        return new ConnectionCustomizer() {
            @Override
            public void onAcquire(Connection connection) throws SQLException {
                // Set RLS variables mỗi khi connection được acquire từ pool
                if (identity != null && !identity.isAnonymous()) {
                    setRlsContext(connection);
                }
            }

            @Override
            public void onReturn(Connection connection) throws SQLException {
                // Reset variables khi trả connection về pool
                try (Statement stmt = connection.createStatement()) {
                    stmt.execute("RESET ALL");
                }
            }
        };
    }

    private void setRlsContext(Connection conn) throws SQLException {
        try (Statement stmt = conn.createStatement()) {
            stmt.execute(String.format(
                "SELECT set_config('app.current_user_id', '%s', true), " +
                "       set_config('app.current_role', '%s', true), " +
                "       set_config('app.hospital_id', '%s', true)",
                sanitize(jwt.getSubject()),
                sanitize(extractRole()),
                sanitize(jwt.getClaim("hospital_id"))
            ));
        }
    }

    private String sanitize(String input) {
        if (input == null) return "";
        // Remove any characters that could cause SQL injection
        return input.replaceAll("[^a-zA-Z0-9\\-]", "");
    }

    private String extractRole() {
        if (identity.getRoles().contains("doctor")) return "doctor";
        if (identity.getRoles().contains("nurse")) return "nurse";
        if (identity.getRoles().contains("admin")) return "admin";
        if (identity.getRoles().contains("patient")) return "patient";
        return "unknown";
    }
}
```

### 4.3. REST Endpoint Example

```java
@Path("/api/patients")
@Authenticated
@Produces(MediaType.APPLICATION_JSON)
public class PatientResource {

    @Inject
    RlsConnectionInterceptor rlsInterceptor;

    @Inject
    PatientService patientService;

    /**
     * GET /api/patients
     * RLS tự động filter dựa trên JWT claims
     * - Doctor: chỉ thấy patients có relationship
     * - Nurse: chỉ thấy patients cùng department
     * - Admin: thấy tất cả patients trong hospital
     */
    @GET
    public List<PatientDto> listPatients(
            @QueryParam("page") @DefaultValue("0") int page,
            @QueryParam("size") @DefaultValue("20") int size) {

        return rlsInterceptor.executeWithRls(conn -> {
            // Query đơn giản - RLS tự động filter
            try (PreparedStatement ps = conn.prepareStatement(
                    "SELECT id, patient_code, status, admission_date, " +
                    "       pgp_sym_decrypt(full_name_encrypted, ?) AS full_name " +
                    "FROM patient_schema.patients " +
                    "ORDER BY admission_date DESC " +
                    "LIMIT ? OFFSET ?")) {

                ps.setString(1, getEncryptionKey());
                ps.setInt(2, size);
                ps.setInt(3, page * size);

                ResultSet rs = ps.executeQuery();
                List<PatientDto> patients = new ArrayList<>();
                while (rs.next()) {
                    patients.add(new PatientDto(
                        rs.getString("id"),
                        rs.getString("patient_code"),
                        rs.getString("full_name"),
                        rs.getString("status"),
                        rs.getDate("admission_date")
                    ));
                }
                return patients;
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        });
    }
}
```

## 5. Column-Level Encryption cho PHI Fields

### 5.1. Encryption Helper Functions

```sql
-- =====================================================
-- HELPER FUNCTIONS CHO PHI ENCRYPTION
-- =====================================================

-- Function encrypt PHI field
CREATE OR REPLACE FUNCTION patient_schema.encrypt_phi(
    p_plaintext TEXT,
    p_key TEXT DEFAULT current_setting('app.encryption_key', true)
) RETURNS BYTEA AS $$
BEGIN
    IF p_plaintext IS NULL THEN
        RETURN NULL;
    END IF;
    RETURN pgp_sym_encrypt(
        p_plaintext,
        p_key,
        'compress-algo=2, cipher-algo=aes256'
    );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function decrypt PHI field
CREATE OR REPLACE FUNCTION patient_schema.decrypt_phi(
    p_encrypted BYTEA,
    p_key TEXT DEFAULT current_setting('app.encryption_key', true)
) RETURNS TEXT AS $$
BEGIN
    IF p_encrypted IS NULL THEN
        RETURN NULL;
    END IF;
    RETURN pgp_sym_decrypt(p_encrypted, p_key);
EXCEPTION
    WHEN OTHERS THEN
        -- Log decryption failure nhưng không expose error details
        RAISE WARNING 'PHI decryption failed for current user';
        RETURN '[ENCRYPTED]';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function tạo search hash
CREATE OR REPLACE FUNCTION patient_schema.hash_for_search(
    p_value TEXT
) RETURNS TEXT AS $$
BEGIN
    IF p_value IS NULL THEN
        RETURN NULL;
    END IF;
    -- Normalize: lowercase, trim spaces
    RETURN encode(
        digest(lower(trim(p_value)), 'sha256'),
        'hex'
    );
END;
$$ LANGUAGE plpgsql IMMUTABLE;
```

### 5.2. INSERT/SELECT với Encryption

```sql
-- === INSERT patient với encrypted PHI ===
-- Encryption key được set qua session variable
SET LOCAL app.encryption_key = 'key-from-vault';

INSERT INTO patient_schema.patients (
    hospital_id,
    department_id,
    full_name_encrypted,
    date_of_birth_encrypted,
    national_id_encrypted,
    phone_encrypted,
    patient_code,
    national_id_hash,
    admission_date,
    status
) VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    '660e8400-e29b-41d4-a716-446655440000',
    patient_schema.encrypt_phi('Nguyễn Thị B'),
    patient_schema.encrypt_phi('1985-03-20'),
    patient_schema.encrypt_phi('079085001234'),
    patient_schema.encrypt_phi('0912345678'),
    'BN-2025-00001',
    patient_schema.hash_for_search('079085001234'),
    CURRENT_DATE,
    'active'
);

-- === SELECT với decryption ===
SET LOCAL app.encryption_key = 'key-from-vault';

SELECT 
    id,
    patient_code,
    patient_schema.decrypt_phi(full_name_encrypted) AS full_name,
    patient_schema.decrypt_phi(date_of_birth_encrypted) AS date_of_birth,
    patient_schema.decrypt_phi(phone_encrypted) AS phone,
    status,
    admission_date
FROM patient_schema.patients
WHERE status = 'active';

-- === Tìm kiếm bằng hash (không cần decrypt) ===
SELECT 
    id,
    patient_code,
    patient_schema.decrypt_phi(full_name_encrypted) AS full_name
FROM patient_schema.patients
WHERE national_id_hash = patient_schema.hash_for_search('079085001234');
```

## 6. Dynamic Data Masking với Views

### 6.1. Masking Views

```sql
-- =====================================================
-- DYNAMIC DATA MASKING VIEWS
-- Hiển thị data theo role của user
-- =====================================================

-- View cho Doctor (full access)
CREATE OR REPLACE VIEW patient_schema.v_patients_doctor AS
SELECT 
    id,
    patient_code,
    hospital_id,
    department_id,
    patient_schema.decrypt_phi(full_name_encrypted) AS full_name,
    patient_schema.decrypt_phi(date_of_birth_encrypted) AS date_of_birth,
    patient_schema.decrypt_phi(national_id_encrypted) AS national_id,
    patient_schema.decrypt_phi(phone_encrypted) AS phone,
    status,
    admission_date,
    discharge_date,
    created_at
FROM patient_schema.patients;

-- View cho Nurse (masked sensitive fields)
CREATE OR REPLACE VIEW patient_schema.v_patients_nurse AS
SELECT 
    id,
    patient_code,
    hospital_id,
    department_id,
    patient_schema.decrypt_phi(full_name_encrypted) AS full_name,
    -- Masked: chỉ hiện năm sinh
    CONCAT('****-**-', 
        RIGHT(patient_schema.decrypt_phi(date_of_birth_encrypted), 2)
    ) AS date_of_birth_masked,
    -- Masked: chỉ hiện 4 số cuối CCCD
    CONCAT('****', 
        RIGHT(patient_schema.decrypt_phi(national_id_encrypted), 4)
    ) AS national_id_masked,
    -- Masked: chỉ hiện 3 số cuối SĐT
    CONCAT('*******', 
        RIGHT(patient_schema.decrypt_phi(phone_encrypted), 3)
    ) AS phone_masked,
    status,
    admission_date,
    discharge_date
FROM patient_schema.patients;

-- View cho Reporting (fully anonymized)
CREATE OR REPLACE VIEW patient_schema.v_patients_anonymous AS
SELECT 
    id,
    hospital_id,
    department_id,
    -- Chỉ age group, không có ngày sinh
    CASE 
        WHEN AGE(patient_schema.decrypt_phi(date_of_birth_encrypted)::DATE) < INTERVAL '18 years' THEN 'Trẻ em (<18)'
        WHEN AGE(patient_schema.decrypt_phi(date_of_birth_encrypted)::DATE) < INTERVAL '40 years' THEN 'Trung niên (18-39)'
        WHEN AGE(patient_schema.decrypt_phi(date_of_birth_encrypted)::DATE) < INTERVAL '60 years' THEN 'Trung niên (40-59)'
        ELSE 'Cao tuổi (60+)'
    END AS age_group,
    status,
    EXTRACT(YEAR FROM admission_date) AS admission_year,
    EXTRACT(MONTH FROM admission_date) AS admission_month
FROM patient_schema.patients;

-- === GRANT views theo role ===
GRANT SELECT ON patient_schema.v_patients_doctor TO phi_access;
GRANT SELECT ON patient_schema.v_patients_nurse TO healthcare_app;
GRANT SELECT ON patient_schema.v_patients_anonymous TO healthcare_readonly;
```

### 6.2. Automatic View Selection

```sql
-- =====================================================
-- FUNCTION TỰ ĐỘNG CHỌN VIEW THEO ROLE
-- =====================================================

CREATE OR REPLACE FUNCTION patient_schema.get_patient_data(
    p_patient_id UUID DEFAULT NULL
) RETURNS TABLE (
    id UUID,
    patient_code VARCHAR,
    full_name TEXT,
    dob_display TEXT,
    national_id_display TEXT,
    phone_display TEXT,
    status VARCHAR,
    admission_date DATE
) AS $$
DECLARE
    v_role TEXT := current_setting('app.current_role', true);
BEGIN
    CASE v_role
        WHEN 'doctor', 'admin' THEN
            RETURN QUERY
            SELECT 
                p.id, p.patient_code,
                patient_schema.decrypt_phi(p.full_name_encrypted),
                patient_schema.decrypt_phi(p.date_of_birth_encrypted),
                patient_schema.decrypt_phi(p.national_id_encrypted),
                patient_schema.decrypt_phi(p.phone_encrypted),
                p.status, p.admission_date
            FROM patient_schema.patients p
            WHERE (p_patient_id IS NULL OR p.id = p_patient_id);

        WHEN 'nurse' THEN
            RETURN QUERY
            SELECT 
                p.id, p.patient_code,
                patient_schema.decrypt_phi(p.full_name_encrypted),
                CONCAT('****-**-', RIGHT(patient_schema.decrypt_phi(p.date_of_birth_encrypted), 2)),
                CONCAT('****', RIGHT(patient_schema.decrypt_phi(p.national_id_encrypted), 4)),
                CONCAT('*******', RIGHT(patient_schema.decrypt_phi(p.phone_encrypted), 3)),
                p.status, p.admission_date
            FROM patient_schema.patients p
            WHERE (p_patient_id IS NULL OR p.id = p_patient_id);

        ELSE
            RETURN QUERY
            SELECT 
                p.id, p.patient_code,
                '[RESTRICTED]'::TEXT,
                '[RESTRICTED]'::TEXT,
                '[RESTRICTED]'::TEXT,
                '[RESTRICTED]'::TEXT,
                p.status, p.admission_date
            FROM patient_schema.patients p
            WHERE (p_patient_id IS NULL OR p.id = p_patient_id);
    END CASE;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;
```

## 7. Testing RLS Policies

### 7.1. Test Script

```sql
-- =====================================================
-- TEST RLS POLICIES
-- =====================================================

-- === Setup test data ===
INSERT INTO patient_schema.hospitals (id, name, code) VALUES
    ('aaaa0000-0000-0000-0000-000000000001', 'BV Chợ Rẫy', 'BVCR'),
    ('aaaa0000-0000-0000-0000-000000000002', 'BV Bình Dân', 'BVBD');

INSERT INTO patient_schema.departments (id, hospital_id, name, code) VALUES
    ('bbbb0000-0000-0000-0000-000000000001', 'aaaa0000-0000-0000-0000-000000000001', 'Khoa Tim', 'CARDIO'),
    ('bbbb0000-0000-0000-0000-000000000002', 'aaaa0000-0000-0000-0000-000000000001', 'Khoa Nội', 'INTERNAL');

INSERT INTO patient_schema.staff (id, hospital_id, department_id, full_name, role) VALUES
    ('cccc0000-0000-0000-0000-000000000001', 'aaaa0000-0000-0000-0000-000000000001', 'bbbb0000-0000-0000-0000-000000000001', 'BS. Nguyễn Văn A', 'doctor'),
    ('cccc0000-0000-0000-0000-000000000002', 'aaaa0000-0000-0000-0000-000000000001', 'bbbb0000-0000-0000-0000-000000000002', 'BS. Trần Thị B', 'doctor'),
    ('cccc0000-0000-0000-0000-000000000003', 'aaaa0000-0000-0000-0000-000000000001', 'bbbb0000-0000-0000-0000-000000000001', 'ĐD. Lê Văn C', 'nurse');

-- === TEST 1: Doctor chỉ thấy bệnh nhân có relationship ===
BEGIN;
    SET LOCAL app.hospital_id = 'aaaa0000-0000-0000-0000-000000000001';
    SET LOCAL app.current_user_id = 'cccc0000-0000-0000-0000-000000000001';
    SET LOCAL app.current_role = 'doctor';
    SET LOCAL app.current_dept_id = 'bbbb0000-0000-0000-0000-000000000001';

    -- Phải trả về CHỈ patients có relationship với BS. Nguyễn Văn A
    SELECT id, patient_code, status 
    FROM patient_schema.patients;
    
    -- Verify count
    SELECT COUNT(*) AS doctor_a_patient_count 
    FROM patient_schema.patients;
ROLLBACK;

-- === TEST 2: Nurse chỉ thấy bệnh nhân cùng khoa ===
BEGIN;
    SET LOCAL app.hospital_id = 'aaaa0000-0000-0000-0000-000000000001';
    SET LOCAL app.current_user_id = 'cccc0000-0000-0000-0000-000000000003';
    SET LOCAL app.current_role = 'nurse';
    SET LOCAL app.current_dept_id = 'bbbb0000-0000-0000-0000-000000000001';

    -- Phải trả về CHỈ patients khoa Tim
    SELECT id, patient_code, status 
    FROM patient_schema.patients;
ROLLBACK;

-- === TEST 3: Cross-hospital isolation ===
BEGIN;
    SET LOCAL app.hospital_id = 'aaaa0000-0000-0000-0000-000000000002'; -- BV Bình Dân
    SET LOCAL app.current_user_id = 'cccc0000-0000-0000-0000-000000000001';
    SET LOCAL app.current_role = 'admin';

    -- Phải trả về 0 rows (BS ở BV Chợ Rẫy, query BV Bình Dân)
    SELECT COUNT(*) AS cross_hospital_count 
    FROM patient_schema.patients;
    -- Expected: 0
ROLLBACK;

-- === TEST 4: Nurse không thấy sensitive records ===
BEGIN;
    SET LOCAL app.hospital_id = 'aaaa0000-0000-0000-0000-000000000001';
    SET LOCAL app.current_user_id = 'cccc0000-0000-0000-0000-000000000003';
    SET LOCAL app.current_role = 'nurse';
    SET LOCAL app.current_dept_id = 'bbbb0000-0000-0000-0000-000000000001';

    -- Sensitive records phải bị ẩn
    SELECT COUNT(*) AS nurse_sensitive_count 
    FROM patient_schema.medical_records
    WHERE is_sensitive = true;
    -- Expected: 0
ROLLBACK;

-- === TEST 5: No DELETE allowed on medical records ===
BEGIN;
    SET LOCAL app.hospital_id = 'aaaa0000-0000-0000-0000-000000000001';
    SET LOCAL app.current_user_id = 'cccc0000-0000-0000-0000-000000000001';
    SET LOCAL app.current_role = 'doctor';

    -- Phải FAIL - no DELETE policy exists
    DELETE FROM patient_schema.medical_records WHERE id IS NOT NULL;
    -- Expected: ERROR or 0 rows affected
ROLLBACK;
```

### 7.2. RLS Performance Monitoring

```sql
-- =====================================================
-- MONITORING RLS PERFORMANCE
-- =====================================================

-- Kiểm tra RLS có gây slow queries không
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT id, patient_code
FROM patient_schema.patients
WHERE status = 'active';

-- Tạo index hỗ trợ RLS performance
CREATE INDEX idx_patients_hospital_dept 
    ON patient_schema.patients(hospital_id, department_id);

CREATE INDEX idx_doctor_patient_active 
    ON patient_schema.doctor_patient(doctor_id, patient_id) 
    WHERE is_active = true;

CREATE INDEX idx_medical_records_filter 
    ON patient_schema.medical_records(hospital_id, department_id, doctor_id, is_sensitive);

-- Monitor RLS policy execution time
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

SELECT 
    query,
    calls,
    mean_exec_time,
    total_exec_time
FROM pg_stat_statements
WHERE query LIKE '%patient_schema.patients%'
ORDER BY mean_exec_time DESC
LIMIT 10;
```

## 8. Best Practices và Common Pitfalls

### 8.1. Common Pitfalls

| Pitfall | Vấn đề | Giải pháp |
|---------|--------|-----------|
| Quên `FORCE ROW LEVEL SECURITY` | Table owner bypass RLS | Luôn dùng `FORCE` |
| `current_setting()` không có `true` param | Error khi variable chưa set | Dùng `current_setting('var', true)` |
| RLS trên JOIN tables | Performance issue | Index trên foreign keys |
| Encryption key trong source code | Key leak | Dùng Vault hoặc environment variables |
| Quên RESET session variables | Connection pool leak | Reset trên connection return |

### 8.2. Security Checklist

```
✅ RLS enabled VÀ forced trên tất cả PHI tables
✅ Hospital isolation policy trên mọi table
✅ Role-based policies (doctor, nurse, admin, patient)
✅ Emergency access logging
✅ PHI fields encrypted với pgcrypto
✅ Search hash indexes cho encrypted fields
✅ Dynamic data masking views
✅ Quarkus interceptor set JWT claims
✅ Connection reset khi return to pool
✅ Performance indexes cho RLS predicates
✅ Test scripts cho tất cả access patterns
✅ No DELETE policy trên medical records
```

## Tổng kết

Trong bài học này, chúng ta đã triển khai:

1. **Row-Level Security (RLS)**: Enable, force, và tạo policies cho hospital isolation, doctor-patient relationships, department-based access, và patient portal
2. **Role-Based Policies**: Khác nhau cho doctor, nurse, admin, lab_tech, patient
3. **Emergency Access**: Break-the-glass mechanism với time-limited access và audit logging
4. **JWT-to-PostgreSQL Integration**: Quarkus interceptor truyền JWT claims qua `SET LOCAL` session variables
5. **Column Encryption**: pgcrypto helper functions cho encrypt/decrypt PHI fields
6. **Dynamic Data Masking**: Views hiển thị data masked/full tùy theo role
7. **Testing**: Comprehensive test script verify mọi access pattern
8. **Performance**: Indexes hỗ trợ RLS policy evaluation

RLS kết hợp với Column Encryption tạo thành **hai lớp bảo vệ** mạnh mẽ cho dữ liệu y tế — ngay cả khi một lớp bị bypass, lớp kia vẫn bảo vệ PHI.

## Bài tập

1. **Implement RLS Policies**: Tạo database với schema trên, enable RLS, và implement policies cho tất cả roles (doctor, nurse, admin, patient). Insert test data và verify access isolation qua test script.

2. **JWT Integration**: Viết Quarkus interceptor truyền JWT claims vào PostgreSQL session variables. Test với 3 users khác nhau (doctor, nurse, patient) - verify mỗi user thấy data đúng.

3. **Emergency Access**: Implement break-the-glass mechanism: ghi log emergency access, grant temporary 4-hour access, revoke sau khi hết hạn. Test verify emergency access hoạt động đúng.

4. **Dynamic Masking**: Tạo masking views cho 3 roles khác nhau. Test verify doctor thấy full data, nurse thấy masked data, reporting thấy anonymized data.

---

---

<!-- SERIES-NAV:START -->
| ◀ Bài trước | Bài tiếp theo ▶ |
|:---|---:|
| [Bài 10: Mã hóa Dữ liệu At-Rest & In-Transit với PostgreSQL](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-10-ma-hoa-du-lieu-at-rest-in-transit-postgresql) | [Bài 12: Audit Logging & Change Data Capture với pgAudit](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-12-audit-logging-cdc-pgaudit) |
<!-- SERIES-NAV:END -->
