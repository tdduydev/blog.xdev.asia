---
id: 019e1a40-a119-7001-d001-f0a1b2c30119
title: 'Lesson 19: Data Masking, Anonymization & De-identification'
slug: bai-19-data-masking-anonymization
description: >-
  Medical data protection techniques: HIPAA Safe Harbor method (18 identifiers),
  Expert Determination method, dynamic data masking in PostgreSQL,
  k-anonymity/l-diversity/t-closeness for datasets, tokenization for sensitive
  fields, synthetic data generation for testing, and Quarkus implementation for
  data de-identification pipeline.
duration_minutes: 180
is_free: true
video_url: null
sort_order: 19
section_title: 'Part 5: Compliance, Audit & Data Protection'
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: >-
    Building a Microservices Healthcare System — Quarkus, PostgreSQL, Keycloak
    with HIPAA standards
  slug: xay-dung-he-thong-y-te-microservices
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-8531" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-8531)"/>

  <!-- Decorations -->
  <g>
    <circle cx="1000" cy="230" r="18" fill="#38bdf8" opacity="0.05"/>
    <circle cx="900" cy="210" r="8" fill="#38bdf8" opacity="0.05"/>
    <circle cx="800" cy="190" r="28" fill="#38bdf8" opacity="0.05"/>
    <circle cx="700" cy="170" r="18" fill="#38bdf8" opacity="0.05"/>
    <circle cx="600" cy="150" r="8" fill="#38bdf8" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <line x1="600" y1="150" x2="1100" y2="230" stroke="#38bdf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="180" x2="1050" y2="250" stroke="#38bdf8" stroke-width="0.5" opacity="0.08"/>
    <polygon points="971.650635094611,137.5 971.650635094611,162.5 950,175 928.349364905389,162.5 928.349364905389,137.5 950,125" fill="none" stroke="#38bdf8" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#38bdf8"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#38bdf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#38bdf8">🏗️ Architecture — Lesson 19</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 19: Data Masking, Anonymization &</tspan>
      <tspan x="60" dy="42">De-identification</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Building a Microservices Healthcare System — Quarkus, PostgreSQL, Keycloak with HIPAA standards</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 5: Compliance, Audit & Data Protection</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. Overview of Data De-identification for Healthcare

![HIPAA De-identification — Safe Harbor vs Expert Determination](/storage/uploads/2026/04/healthcare-data-deidentification.webp)

HIPAA allows the use and sharing of medical data **without patient consent** if the data has been **de-identified** — that is, it cannot be used to identify the patient. This is the foundation for medical research, population health analytics, and machine learning in healthcare.

### 1.1. HIPAA De-identification Standards — §164.514

![HIPAA De-identification — Safe Harbor vs Expert Determination flow](/storage/uploads/2026/04/healthcare-safe-harbor-flow.webp)

**PHI (Protected Health Information)** has 2 de-identification methods under §164.514(a):

- **Method 1: Safe Harbor** §164.514(b)
  - Remove all **18 identifiers**
  - There is no actual knowledge about re-identification
  - Deterministic, rules-based
- **Method 2: Expert Determination** §164.514(b)(1)
  - Statistical/scientific expert certifications
  - Risk of re-identification is **"very small"**
  - Document methods and results

**→ De-identified Data**: NOT considered PHI, NOT subject to HIPAA Privacy Rule, can be shared freely for research

### 1.2. Data Protection Spectrum

![Data Protection Spectrum — from Synthetic Data to Original PHI](/storage/uploads/2026/04/healthcare-data-protection-spectrum.webp)

| Level | Description | Use Cases |
|-------|--------|----------|
| **Synthetic Data** | Fake data generated from patterns | Dev/Test, Training |
| **Anonymized Data** | Cannot reverse to original | Research, Analytics, Population Health |
| **De-identified Data** | 18 identifiers removed (Safe Harbor) | Research Sharing, Publications |
| **Masked Data** | Partial hiding (SSN: ***-4567) | Production Display, Logs |
| **Original PHI** | Full data visible | Testing (restricted) |

◄── **More Privacy** ─────────────────── **Less Privacy** ──►

## 2. HIPAA Safe Harbor Method — 18 Identifiers

### 2.1. List of 18 Identifiers that must be deleted

| # | Identifiers | Example | Implementation |
|---|-----------|-------|----------------|
| 1 | Names | Nguyen Van A | Remove or replace with pseudonym |
| 2 | Geographic data (< state) | 123 Nguyen Hue, District 1, HCM | Remove address; keep state/province only |
| 3 | Dates (except year) | March 15, 1990 → 1990 | Generalize to year only |
| 4 | Phone numbers | 0901234567 | Remove |
| 5 | Fax numbers | 028-12345678 | Remove |
| 6 | Email addresses | <patient@gmail.com> | Remove |
| 7 | SSN / CCCD | 079123456789 | Remove |
| 8 | Medical record numbers | MRN-2024-001 | Remove or re-key |
| 9 | Health plan beneficiary # | HI-123456 | Remove |
| 10 | Account numbers | ACC-789 | Remove |
| 11 | Certificate/license # | GP-2020-12345 | Remove |
| 12 | identifier Vehicles | 51A-12345 | Remove |
| 13 | Device identifiers/serials | DEV-XYZ-789 | Remove |
| 14 | Web URLs | patient-portal.hospital.vn | Remove |
| 15 | IP addresses | 192.168.1.100 | Remove |
| 16 | Biometric identifiers | Fingerprint hash | Remove |
| 17 | Full-face photos | patient_photo.jpg | Remove |
| 18 | Any other unique identifier | Custom patient code | Remove or re-key |

### 2.2. Safe Harbor Implementation

```java
package vn.hospital.deidentification;

import jakarta.enterprise.context.ApplicationScoped;
import org.jboss.logging.Logger;

import java.time.LocalDate;
import java.util.UUID;
import java.util.regex.Pattern;

/**
 * HIPAA Safe Harbor De-identification — §164.514(b)(2)
 * Xóa tất cả 18 identifiers khỏi patient record.
 */
@ApplicationScoped
public class SafeHarborDeidentifier {

    private static final Logger LOG = Logger.getLogger(SafeHarborDeidentifier.class);

    // Regex patterns cho detection
    private static final Pattern SSN_PATTERN =
        Pattern.compile("\\b\\d{3}-?\\d{2}-?\\d{4}\\b");
    private static final Pattern CCCD_PATTERN =
        Pattern.compile("\\b\\d{12}\\b");
    private static final Pattern PHONE_PATTERN =
        Pattern.compile("\\b(0|\\+84)\\d{9,10}\\b");
    private static final Pattern EMAIL_PATTERN =
        Pattern.compile("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
    private static final Pattern IP_PATTERN =
        Pattern.compile("\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b");
    private static final Pattern URL_PATTERN =
        Pattern.compile("https?://[\\w.-]+(?:/[\\w.-]*)*");
    private static final Pattern MRN_PATTERN =
        Pattern.compile("\\bMRN[:-]?\\s*[A-Z0-9-]{4,20}\\b");

    /**
     * De-identify một patient record theo Safe Harbor method.
     * Trả về DeidentifiedRecord — chỉ chứa non-identifying data.
     */
    public DeidentifiedRecord deidentify(PatientRecord record) {
        DeidentifiedRecord result = new DeidentifiedRecord();

        // Gán random de-identification ID (re-key)
        result.setDeidentifiedId(UUID.randomUUID().toString());

        // 1. Names → REMOVED
        result.setName(null);

        // 2. Geographic → Keep province/state only
        result.setGeographicRegion(extractProvince(record.getAddress()));

        // 3. Dates → Year only (nếu age > 89, generalize thành "90+")
        result.setBirthYear(generalizeDateToYear(record.getDateOfBirth()));

        // 4-6. Phone, Fax, Email → REMOVED
        result.setPhone(null);
        result.setEmail(null);

        // 7. SSN/CCCD → REMOVED
        result.setSsn(null);

        // 8. MRN → REMOVED (hoặc re-keyed nếu cần link datasets)
        result.setMrn(null);

        // 9-18. Các identifiers khác → REMOVED

        // Non-identifying data → KEPT
        result.setGender(record.getGender());
        result.setDiagnosisCodes(record.getDiagnosisCodes()); // ICD-10 codes
        result.setProcedureCodes(record.getProcedureCodes());
        result.setLabResults(record.getLabResults()); // Numeric values
        result.setMedications(record.getMedications());
        result.setAdmissionYear(extractYear(record.getAdmissionDate()));
        result.setDischargeYear(extractYear(record.getDischargeDate()));
        result.setLengthOfStay(record.getLengthOfStay());

        LOG.infof("DEIDENTIFIED: original_mrn_hash=%s deidentified_id=%s",
            hashForAudit(record.getMrn()), result.getDeidentifiedId());

        return result;
    }

    /**
     * De-identify free text (clinical notes, discharge summaries).
     * Scrub tất cả identified patterns từ text.
     */
    public String deidentifyText(String text) {
        if (text == null) return null;

        String result = text;

        // Remove patterns
        result = SSN_PATTERN.matcher(result).replaceAll("[SSN_REMOVED]");
        result = CCCD_PATTERN.matcher(result).replaceAll("[ID_REMOVED]");
        result = PHONE_PATTERN.matcher(result).replaceAll("[PHONE_REMOVED]");
        result = EMAIL_PATTERN.matcher(result).replaceAll("[EMAIL_REMOVED]");
        result = IP_PATTERN.matcher(result).replaceAll("[IP_REMOVED]");
        result = URL_PATTERN.matcher(result).replaceAll("[URL_REMOVED]");
        result = MRN_PATTERN.matcher(result).replaceAll("[MRN_REMOVED]");

        // Dates: Replace specific dates with year only
        result = result.replaceAll(
            "\\b\\d{1,2}[/\\-.]\\d{1,2}[/\\-.]\\d{4}\\b",
            "[DATE_REMOVED]"
        );

        return result;
    }

    /**
     * Generalize date of birth to year.
     * HIPAA: Nếu tuổi > 89, gộp thành "90+".
     */
    private Integer generalizeDateToYear(LocalDate dateOfBirth) {
        if (dateOfBirth == null) return null;

        int age = LocalDate.now().getYear() - dateOfBirth.getYear();
        if (age > 89) {
            return null; // Age > 89 → suppress year entirely
        }
        return dateOfBirth.getYear();
    }

    /**
     * Giữ lại province/state, bỏ chi tiết address.
     * HIPAA: Geographic data nhỏ hơn state phải xóa.
     * Ngoại lệ: ZIP code 3 chữ số đầu nếu population > 20,000.
     */
    private String extractProvince(String address) {
        if (address == null) return null;

        // Simple extraction — production cần NLP hoặc structured address
        if (address.contains("Hồ Chí Minh") || address.contains("HCM")) {
            return "Hồ Chí Minh";
        } else if (address.contains("Hà Nội")) {
            return "Hà Nội";
        } else if (address.contains("Đà Nẵng")) {
            return "Đà Nẵng";
        }

        return "Unknown Province";
    }

    private Integer extractYear(LocalDate date) {
        return date != null ? date.getYear() : null;
    }

    private String hashForAudit(String value) {
        if (value == null) return "null";
        try {
            java.security.MessageDigest md =
                java.security.MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(value.getBytes());
            return java.util.HexFormat.of().formatHex(hash).substring(0, 16);
        } catch (Exception e) {
            return "hash_error";
        }
    }
}
```

### 2.3. DeidentifiedRecord DTO

```java
package vn.hospital.deidentification;

import java.util.List;

/**
 * Record đã de-identified — không chứa bất kỳ PHI nào.
 */
public class DeidentifiedRecord {
    private String deidentifiedId;     // Random ID, không liên kết tới patient
    private String name;               // null (removed)
    private String geographicRegion;   // Province/state only
    private Integer birthYear;         // Year only (null if age > 89)
    private String phone;              // null (removed)
    private String email;              // null (removed)
    private String ssn;                // null (removed)
    private String mrn;                // null (removed)
    private String gender;             // Kept
    private List<String> diagnosisCodes;   // ICD-10 codes (kept)
    private List<String> procedureCodes;   // CPT codes (kept)
    private String labResults;         // Numeric results (kept)
    private List<String> medications;  // Medication names (kept)
    private Integer admissionYear;     // Year only
    private Integer dischargeYear;     // Year only
    private Integer lengthOfStay;      // Days (kept)

    // Getters and setters
    public String getDeidentifiedId() { return deidentifiedId; }
    public void setDeidentifiedId(String id) { this.deidentifiedId = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getGeographicRegion() { return geographicRegion; }
    public void setGeographicRegion(String r) { this.geographicRegion = r; }
    public Integer getBirthYear() { return birthYear; }
    public void setBirthYear(Integer y) { this.birthYear = y; }
    public String getPhone() { return phone; }
    public void setPhone(String p) { this.phone = p; }
    public String getEmail() { return email; }
    public void setEmail(String e) { this.email = e; }
    public String getSsn() { return ssn; }
    public void setSsn(String s) { this.ssn = s; }
    public String getMrn() { return mrn; }
    public void setMrn(String m) { this.mrn = m; }
    public String getGender() { return gender; }
    public void setGender(String g) { this.gender = g; }
    public List<String> getDiagnosisCodes() { return diagnosisCodes; }
    public void setDiagnosisCodes(List<String> c) { this.diagnosisCodes = c; }
    public List<String> getProcedureCodes() { return procedureCodes; }
    public void setProcedureCodes(List<String> c) { this.procedureCodes = c; }
    public String getLabResults() { return labResults; }
    public void setLabResults(String r) { this.labResults = r; }
    public List<String> getMedications() { return medications; }
    public void setMedications(List<String> m) { this.medications = m; }
    public Integer getAdmissionYear() { return admissionYear; }
    public void setAdmissionYear(Integer y) { this.admissionYear = y; }
    public Integer getDischargeYear() { return dischargeYear; }
    public void setDischargeYear(Integer y) { this.dischargeYear = y; }
    public Integer getLengthOfStay() { return lengthOfStay; }
    public void setLengthOfStay(Integer d) { this.lengthOfStay = d; }
}
```

## 3. Expert Determination Method — §164.514(b)(1)

### 3.1. Overview

The Expert Determination method allows more flexibility than Safe Harbor but requires:

1. A statistical or scientific expert evaluates the data
2. Experts confirm re-identification risk is **"very small"**
3. Document assessment methods and results

```

**Expert Determination Process:**

1. **Identify quasi-identifiers** — Tổ hợp các fields có thể re-identify (ví dụ: ZIP + DOB + Gender → 87% population unique)
2. **Apply statistical methods** — k-anonymity (k ≥ 5 recommended), l-diversity, t-closeness
3. **Re-identification risk assessment** — Prosecutor/Journalist/Marketer risk < 0.04 (1/25)
4. **Document and certify** — Expert’s qualifications, methods used, risk assessment results, signed certification

### 3.2. Quasi-Identifier Analysis

Nghiên cứu của Latanya Sweeney (2000) cho thấy tổ hợp **ZIP code + Date of birth + Gender** có thể xác định **87%** dân số Mỹ. Đây gọi là quasi-identifiers — không phải direct identifiers nhưng khi kết hợp có thể re-identify.

| Quasi-Identifier Combination | Uniqueness Risk |
|------------------------------|----------------|
| ZIP (5 digits) + DOB + Gender | 87% (very high) |
| ZIP (3 digits) + Birth Year + Gender | ~0.04% (acceptable) |
| Province + Birth Year + Gender | Low risk |
| Province + Age Range (5-year) + Gender | Very low risk |

## 4. Dynamic Data Masking trong PostgreSQL

### 4.1. Role-Based Masking với Views

```sql
-- Dynamic Data Masking for PostgreSQL
-- Create masked views based on user role

-- Base table (contains full PHI)
-- healthcare.patients (created from previous post)

-- === Masked View for Clinical Staff ===
-- Medical staff: see name, gender, age but do not see SSN, full address
CREATE OR REPLACE VIEW healthcare.patients_clinical_view AS
SELECT
    id,
    mrn,
    full_name, -- Clinical needs to know the patient's name
    CASE
        WHEN current_setting('app.user_role', true) IN ('physician', 'nurse')
        THEN '***-**-' || RIGHT(ssn, 4)
        ELSE '***-**-****'
    END AS ssn,
    date_of_birth,
    gender,
    CASE
        WHEN current_setting('app.user_role', true) IN ('physician', 'nurse')
        THEN phone_number
        ELSE '****' || RIGHT(phone_number, 4)
    END AS phone_number,
    '***@***.***' AS email, -- Always mask
    CASE
        WHEN current_setting('app.user_role', true) = 'physician'
        THEN address
        ELSE regexp_replace(address, '^[^,]+,\s*', '', 'g') -- Keep only city/province
    END AS address,
    diagnosis_codes,
    department,
    hospital_id,
    created_at
FROM healthcare.patients;

-- === Masked View for Research/Analytics ===
-- Researcher: only see de-identified data
CREATE OR REPLACE VIEW healthcare.patients_research_view AS
SELECT
    gen_random_uuid() AS research_id, -- Random ID per query
    NULL AS mrn,
    NULL AS full_name,
    NULL AS ssn,
    EXTRACT(YEAR FROM date_of_birth)::INTEGER AS birth_year,
    CASE
        WHEN EXTRACT(YEAR FROM age(date_of_birth)) > 89 THEN '90+'
        ELSE (FLOOR(EXTRACT(YEAR FROM age(date_of_birth)) / 5) * 5)::TEXT
             || '-'
             || (FLOOR(EXTRACT(YEAR FROM age(date_of_birth)) / 5) * 5 + 4)::TEXT
    END AS age_range,
    gender,
    NULL AS phone_number,
    NULL AS email,
    NULL AS address,
    -- Only keep province/city
    CASE
        WHEN address ILIKE '%ho chi minh%' OR address ILIKE '%hcm%' THEN 'Ho Chi Minh'
        WHEN address ILIKE '%hanoi%' THEN 'Hanoi'
        WHEN address ILIKE '%da Nang%' THEN 'Da Nang'
        ELSE 'Other'
    END AS region,
    diagnosis_codes,
    department,
    created_at::DATE AS created_date -- Remove time component
FROM healthcare.patients;

-- === Masked View for Billing ===
-- Billing staff: see payment information, do not see clinical data
CREATE OR REPLACE VIEW healthcare.patients_billing_view AS
SELECT
    id,
    mrn,
    full_name,
    NULL AS ssn,
    NULL AS date_of_birth,
    phone_number,
    email,
    address,
    NULL AS diagnosis_codes, -- Billing does not need to know diagnoses
    department,
    hospital_id,
    created_at
FROM healthcare.patients;

-- === Row-Level Security ===
-- Make sure each department only sees its own patients
ALTER TABLE healthcare.patients ENABLE ROW LEVEL SECURITY;

CREATE POLICY patients_department_policy ON healthcare.patients
    USING (
        department = current_setting('app.user_department', true)
        OR current_setting('app.user_role', true) IN ('admin', 'privacy_officer')
    );

-- === Grant permissions ===
GRANT SELECT ON healthcare.patients_clinical_view TO clinical_role;
GRANT SELECT ON healthcare.patients_research_view TO research_role;
GRANT SELECT ON healthcare.patients_billing_view TO billing_role;

-- DO NOT grant directly on the base table
REVOKE ALL ON healthcare.patients FROM clinical_role, research_role, billing_role;
```

### 4.2. Dynamic Masking Functions

```sql
-- Reusable masking functions

-- Mask email: patient@hospital.vn → p***@h***.vn
CREATE OR REPLACE FUNCTION healthcare.mask_email(email TEXT)
RETURNS TEXT AS $$
BEGIN
    IF email IS NULL THEN RETURN NULL; END IF;
    RETURN regexp_replace(
        email,
        '(.)([^@]*)(@.)(.*)(\..*)',
        '\1***\3***\5'
    );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Mask phone: 0901234567 → ****34567
CREATE OR REPLACE FUNCTION healthcare.mask_phone(phone TEXT)
RETURNS TEXT AS $$
BEGIN
    IF phone IS NULL THEN RETURN NULL; END IF;
    RETURN '****' || RIGHT(phone, 5);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Mask name: Nguyen Van A → N*** V*** A
CREATE OR REPLACE FUNCTION healthcare.mask_name(name TEXT)
RETURNS TEXT AS $$
BEGIN
    IF name IS NULL THEN RETURN NULL; END IF;
    RETURN regexp_replace(name, '(\w)\w+', '\1***', 'g');
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Generalize age to 5-year range
CREATE OR REPLACE FUNCTION healthcare.age_range(dob DATE)
RETURNS TEXT AS $$
DECLARE
    age_years INTEGER;
    range_start INTEGER;
BEGIN
    IF dob IS NULL THEN RETURN NULL; END IF;
    age_years := EXTRACT(YEAR FROM age(dob));
    IF age_years > 89 THEN RETURN '90+'; END IF;
    range_start := (age_years / 5) * 5;
    RETURN range_start || '-' || (range_start + 4);
END;
$$ LANGUAGE plpgsql IMMUTABLE;
```

## 5. Static Data Masking cho Dev/Test

### 5.1. Masking Pipeline cho Non-Production

```

**Static Data Masking Pipeline:**

1. **Production DB** → `pg_dump` (logical backup)
2. **Staging Area** (temporary, isolated network)
3. **Apply masking transformations:**
   - Names → Faker-generated names
   - SSN → Random SSN format
   - Dates → Shifted by random offset
   - Addresses → Randomized
   - MRN → Re-keyed
4. **Validate masked data:**
   - No real PHI remaining
   - Referential integrity preserved
   - Data distributions similar
5. **Dev/Test DB** — Safe to use without HIPAA constraints

> ⚠️ Staging area is securely deleted after masking

### 5.2. SQL-Based Static Masking Script

```sql
-- static-mask.sql
-- Chạy trên copy của production database

BEGIN;

-- Disable triggers temporarily
SET session_replication_role = 'replica';

-- === Mask patient names ===
UPDATE healthcare.patients SET
    full_name = 'Patient_' || LPAD(id::TEXT, 8, '0'),
    ssn = LPAD(floor(random() * 999)::TEXT, 3, '0') || '-'
          || LPAD(floor(random() * 99)::TEXT, 2, '0') || '-'
          || LPAD(floor(random() * 9999)::TEXT, 4, '0'),
    phone_number = '09' || LPAD(floor(random() * 99999999)::TEXT, 8, '0'),
    email = 'patient_' || LPAD(id::TEXT, 8, '0') || '@test.hospital.vn',
    address = (ARRAY[
        '123 Test Street, Quận 1, Hồ Chí Minh',
        '456 Dev Road, Quận Hoàn Kiếm, Hà Nội',
        '789 Staging Ave, Quận Hải Châu, Đà Nẵng'
    ])[floor(random() * 3) + 1],
    -- Shift DOB by random -30 to +30 days
    date_of_birth = date_of_birth + (floor(random() * 61) - 30)::INTEGER;

-- === Re-key MRN ===
UPDATE healthcare.patients SET
    mrn = 'TST-' || LPAD(floor(random() * 9999999)::TEXT, 7, '0');

-- Re-enable triggers
SET session_replication_role = 'origin';

-- Verify no real PHI
DO $$
DECLARE
    real_email_count INTEGER;
    real_phone_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO real_email_count
    FROM healthcare.patients
    WHERE email NOT LIKE '%@test.hospital.vn';

    SELECT COUNT(*) INTO real_phone_count
    FROM healthcare.patients
    WHERE phone_number NOT LIKE '09________';

    IF real_email_count > 0 OR real_phone_count > 0 THEN
        RAISE EXCEPTION 'MASKING VERIFICATION FAILED: % unmasked emails, % unmasked phones',
            real_email_count, real_phone_count;
    END IF;

    RAISE NOTICE 'Static masking verification PASSED';
END $$;

COMMIT;
```

## 6. K-Anonymity, L-Diversity, T-Closeness

### 6.1. K-Anonymity

**Definition**: A dataset achieves k-anonymity if each combination of quasi-identifiers appears at least **k times**. This means that each record cannot be distinguished from at least k-1 other records.

```

![K-Anonymity Example — Before (k=1) vs After (k=3) Generalization](/storage/uploads/2026/04/healthcare-k-anonymity-example.webp)

**BEFORE (k=1, not anonymous):**

| Age | ZIP | Gender | Diagnosis |
|-----|-----|--------|----------|
| 28 | 700 | M | Diabetes ← Unique! |
| 29 | 700 | M | Heart |
| 35 | 700 | F | Cancer ← Unique! |

**AFTER (k=3, generalized):**

| Age Range | ZIP | Gender | Diagnosis |
|-----------|-----|--------|----------|
| 25-35 | 7** | * | Diabetes ← 3 matches |
| 25-35 | 7** | * | Heart ← 3 matches |
| 25-35 | 7** | * | Cancer ← 3 matches |

**Techniques:** Generalization (age ranges, ZIP truncation), Suppression (remove rare values)

### 6.2. K-Anonymity Implementation

```java
package vn.hospital.deidentification;

import jakarta.enterprise.context.ApplicationScoped;
import org.jboss.logging.Logger;

import java.util.*;
import java.util.stream.Collectors;

/**
 * K-Anonymity implementation for healthcare datasets.
 */
@ApplicationScoped
public class KAnonymityService {

    private static final Logger LOG = Logger.getLogger(KAnonymityService.class);

    /**
     * Apply k-anonymity to dataset.
     * @param records Original Dataset
     * @param k Minimum group size (recommended: k ≥ 5)
     * @param quasiIdentifiers List of quasi-identifier fields
     * @return k-anonymized Dataset
     */
    publicList<Map<String, Object>>anonymize(
            List<Map<String, Object>> records,
            int k,
            List<String> quasiIdentifiers) {

        LOG.infof("Applying %d-anonymity to %d records, QIs: %s",
            k, records.size(), quasiIdentifiers);

        List<Map<String, Object>> result = new ArrayList<>();

        for (Map<String, Object> record : records) {
            Map<String, Object> anonymized = new LinkedHashMap<>(record);

            // Generalize quasi-identifiers
            for (String qi : quasiIdentifiers) {
                Object value = record.get(qi);
                anonymized.put(qi, generalizeValue(qi, value));
            }

            result.add(anonymized);
        }

        // Verify k-anonymity
        boolean valid = verifyKAnonymity(result, k, quasiIdentifiers);
        if (!valid) {
            // Apply suppression to groups < k
            result = suppressSmallGroups(result, k, quasiIdentifiers);
        }

        LOG.infof("K-anonymity applied: %d records → %d records (suppressed: %d)",
            records.size(), result.size(), records.size() - result.size());

        return result;
    }

    /**
* Generalize values ​​based on field type.
     */
    private Object generalizeValue(String fieldName, Object value) {
        if (value == null) return null;

        return switch (fieldName) {
            case "age", "birth_year" -> generalizeAge(((Number) value).intValue());
            case "zip_code", "postal_code" -> generalizeZipCode(value.toString());
            case "date_of_birth" -> generalizeDate(value.toString());
            case "gender" -> value; // Maintain or suppress if necessary
            default -> value;
        };
    }

    /**
     * Generalize age into 5-year ranges.
     * 28 → "25-29", 35 → "35-39", 90 → "90+"
     */
    private String generalizeAge(int age) {
        if (age > 89) return "90+";
        int lowerBound = (age / 5) * 5;
        return lowerBound + "-" + (lowerBound + 4);
    }

    /**
     * Generalize ZIP/postal code.
     * "70000" → "700**" (3-digit prefix)
     */
    private String generalizeZipCode(String zip) {
        if (zip.length() >= 3) {
            return zip.substring(0, 3) + "**";
        }
        return "***";
    }

    /**
     * Generalize date to year.
     */
    private String generalizeDate(String date) {
        if (date.length() >= 4) {
            return date.substring(0, 4); // Keep year only
        }
        return "****";
    }

    /**
     * Verify dataset reaches k-anonymity.
     */
    public boolean verifyKAnonymity(
            List<Map<String, Object>> records,
            int k,
            List<String> quasiIdentifiers) {

        Map<String, Long> equivalenceClasses = records.stream()
            .collect(Collectors.groupingBy(
                record -> quasiIdentifiers.stream()
                    .map(qi -> String.valueOf(record.get(qi)))
                    .collect(Collectors.joining("|")),
                Collectors.counting()
            ));

        long violatingClasses = equivalenceClasses.values().stream()
            .filter(count -> count < k)
            .count();

        if (violatingClasses > 0) {
            LOG.warnf("K-anonymity violation: %d equivalence classes have fewer than %d records",
                violatingClasses, k);
            return false;
        }

        return true;
    }

    /**
     * Suppress (remove) records in groups smaller than k.
     */
    private List<Map<String, Object>> suppressSmallGroups(
            List<Map<String, Object>> records,
            int k,
            List<String> quasiIdentifiers) {

        Map<String, List<Map<String, Object>>> groups = records.stream()
            .collect(Collectors.groupingBy(
                record -> quasiIdentifiers.stream()
                    .map(qi -> String.valueOf(record.get(qi)))
                    .collect(Collectors.joining("|"))
            ));

        return groups.values().stream()
            .filter(group -> group.size() >= k)
            .flatMap(Collection::stream)
            .collect(Collectors.toList());
    }
}
```

### 6.3. L-Diversity và T-Closeness

**L-Diversity**: Mở rộng k-anonymity — mỗi equivalence class phải chứa ít nhất **l** giá trị khác nhau của sensitive attribute. Ngăn chặn **homogeneity attack** (khi tất cả records trong 1 group có cùng diagnosis).

**T-Closeness**: Phân phối sensitive attribute trong mỗi equivalence class phải gần với phân phối tổng thể (khoảng cách ≤ t). Ngăn chặn **skewness attack**.

```

**K-Anonymity (k=3) — VULNERABLE (Homogeneity Attack):**

| Age Range | Diagnosis |
|-----------|----------|
| 25-35 | HIV ← ​​All have HIV! |
| 25-35 | HIV ← ​​Attacker knows diagnosis |
| 25-35 | HIV ← ​​even without knowing WHO |

**L-Diversity (l=3) — PROTECTED:**

| Age Range | Diagnosis |
|-----------|----------|
| 25-35 | Diabetes ← 3 different diagnoses |
| 25-35 | Heart ← Attacker cannot infer |
| 25-35 | Cold ← which one belongs to target |

| Method | Protects Against | Weakness |
|--------|-----------|----------|
| K-Anonymity | Identity disclosure | Homogeneity attack (same sensitive value) |
| L-Diversity | Attribute disclosure | Skewness attack (uneven distribution) |
| T-Closeness | Distribution disclosure | More complex, difficult to implement |

## 7. Tokenization with Format-Preserving Encryption

### 7.1. Tokenization Architecture

**Flow:**
- **Original SSN**: `079-123-456789`
- → **Tokenization Service** (Format-Preserving Encryption — FPE)
  - **Token**: `248-971-832145` (same format, different value, reversible with key)
  - **Token Vault**: Encrypted mapping Token → Original

**Advantages:**
- Same format → existing systems work (validation, UI)
- Reversible → authorized users can detokenize  
- Referential integrity → same SSN always → same token

### 7.2. FPE Tokenization Service

```java
package vn.hospital.deidentification;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.jboss.logging.Logger;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Arrays;

/**
 * Format-Preserving Tokenization cho PHI fields.
 * Token giữ nguyên format (SSN vẫn có dạng XXX-XX-XXXX).
 */
@ApplicationScoped
public class TokenizationService {

    private static final Logger LOG = Logger.getLogger(TokenizationService.class);

    @Inject
    @io.quarkus.vault.runtime.config.VaultConfigSource
    String tokenizationKey;

    /**
     * Tokenize SSN: 079-123-456789 → XXX-XXX-XXXXXX (same format).
     * Deterministic: cùng input luôn cho cùng token.
     */
    public String tokenizeSSN(String ssn) {
        if (ssn == null) return null;

        // Remove formatting
        String digits = ssn.replaceAll("[^0-9]", "");

        // Generate deterministic token
        String tokenDigits = generateDeterministicToken(digits, "ssn");

        // Re-apply format: XXX-XXX-XXXXXX
        if (tokenDigits.length() == 12) {
            return tokenDigits.substring(0, 3) + "-"
                 + tokenDigits.substring(3, 6) + "-"
                 + tokenDigits.substring(6);
        }
        return tokenDigits;
    }

    /**
     * Tokenize phone number: 0901234567 → 09XXXXXXXX (preserve prefix).
     */
    public String tokenizePhone(String phone) {
        if (phone == null) return null;

        String digits = phone.replaceAll("[^0-9]", "");
        String prefix = digits.substring(0, 2); // Keep carrier prefix
        String rest = digits.substring(2);

        String tokenizedRest = generateDeterministicToken(rest, "phone");
        return prefix + tokenizedRest.substring(0, rest.length());
    }

    /**
     * Tokenize MRN: MRN-2024-001 → MRN-XXXX-XXX (preserve prefix format).
     */
    public String tokenizeMRN(String mrn) {
        if (mrn == null) return null;

        String tokenValue = generateDeterministicToken(mrn, "mrn");
        // Keep "MRN-" prefix, tokenize the rest
        if (mrn.startsWith("MRN-")) {
            return "TOK-" + tokenValue.substring(0, Math.min(8, tokenValue.length()));
        }
        return "TOK-" + tokenValue.substring(0, 8);
    }

    /**
     * Detokenize (reverse lookup) — chỉ authorized users.
     */
    public String detokenizeSSN(String token) {
        // In production: lookup from secure token vault
        // Token vault stores encrypted mapping: token → original
        throw new UnsupportedOperationException(
            "Detokenization requires Token Vault access — implement with Vault KV");
    }

    /**
     * Generate deterministic token using HMAC.
     * Same input + same key = same token (idempotent).
     */
    private String generateDeterministicToken(String input, String domain) {
        try {
            String combined = domain + ":" + input;
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(tokenizationKey.getBytes(StandardCharsets.UTF_8));
            byte[] hash = md.digest(combined.getBytes(StandardCharsets.UTF_8));

            // Convert to numeric string (format-preserving for digit-only fields)
            StringBuilder sb = new StringBuilder();
            for (byte b : hash) {
                sb.append(Math.abs(b % 10));
            }
            return sb.toString();
        } catch (Exception e) {
            throw new RuntimeException("Token generation failed", e);
        }
    }
}
```

## 8. Synthetic Data Generation

### 8.1. Synthetic Data Generator for Testing

```java
package vn.hospital.deidentification;

import jakarta.enterprise.context.ApplicationScoped;
import org.jboss.logging.Logger;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

/**
 * Synthetic data generator cho dev/test environments.
 * Tạo dữ liệu giả có cùng statistical properties với production.
 * KHÔNG chứa bất kỳ real PHI nào.
 */
@ApplicationScoped
public class SyntheticDataGenerator {

    private static final Logger LOG = Logger.getLogger(SyntheticDataGenerator.class);

    // Vietnamese name components
    private static final String[] HO = {
        "Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh",
        "Phan", "Vũ", "Võ", "Đặng", "Bùi", "Đỗ"
    };
    private static final String[] TEN_DEM = {
        "Văn", "Thị", "Đức", "Minh", "Thanh", "Quang",
        "Ngọc", "Hồng", "Kim", "Anh"
    };
    private static final String[] TEN = {
        "An", "Bình", "Chi", "Dũng", "Em", "Giang",
        "Hà", "Khang", "Linh", "Mai", "Nam", "Phúc",
        "Quỳnh", "Sơn", "Tâm", "Uy", "Vy"
    };

    // Common ICD-10 codes for testing
    private static final String[] DIAGNOSIS_CODES = {
        "E11.9", "I10", "J06.9", "M54.5", "J20.9",
        "K21.0", "E78.5", "N39.0", "J45.909", "R10.9",
        "E11.65", "I25.10", "J44.1", "K80.20", "F32.9"
    };

    private static final String[] DEPARTMENTS = {
        "cardiology", "internal-medicine", "emergency",
        "surgery", "pediatrics", "ob-gyn",
        "orthopedics", "neurology", "oncology"
    };

    private static final String[] MEDICATIONS = {
        "Metformin 500mg", "Amlodipine 5mg", "Omeprazole 20mg",
        "Atorvastatin 20mg", "Losartan 50mg", "Aspirin 81mg",
        "Metoprolol 25mg", "Lisinopril 10mg", "Levothyroxine 50mcg"
    };

    /**
     * Generate n synthetic patient records.
     */
    public List<SyntheticPatient> generatePatients(int count) {
        List<SyntheticPatient> patients = new ArrayList<>(count);
        Random random = new Random();

        for (int i = 0; i < count; i++) {
            SyntheticPatient patient = new SyntheticPatient();
            patient.setId(UUID.randomUUID());
            patient.setMrn("SYN-" + String.format("%07d", i + 1));
            patient.setFullName(generateName(random));
            patient.setSsn(generateSSN(random));
            patient.setDateOfBirth(generateDOB(random));
            patient.setGender(random.nextBoolean() ? "M" : "F");
            patient.setPhoneNumber(generatePhone(random));
            patient.setEmail(generateEmail(patient.getFullName()));
            patient.setAddress(generateAddress(random));
            patient.setDiagnosisCodes(generateDiagnoses(random));
            patient.setMedications(generateMedications(random));
            patient.setDepartment(DEPARTMENTS[random.nextInt(DEPARTMENTS.length)]);
            patient.setHospitalId("SYN-HOSP-01");

            patients.add(patient);
        }

        LOG.infof("Generated %d synthetic patients", count);
        return patients;
    }

    private String generateName(Random random) {
        return HO[random.nextInt(HO.length)] + " "
             + TEN_DEM[random.nextInt(TEN_DEM.length)] + " "
             + TEN[random.nextInt(TEN.length)];
    }

    private String generateSSN(Random random) {
        return String.format("%03d-%03d-%06d",
            random.nextInt(999), random.nextInt(999), random.nextInt(999999));
    }

    private LocalDate generateDOB(Random random) {
        long minDay = LocalDate.of(1930, 1, 1).toEpochDay();
        long maxDay = LocalDate.of(2005, 12, 31).toEpochDay();
        long randomDay = ThreadLocalRandom.current().nextLong(minDay, maxDay);
        return LocalDate.ofEpochDay(randomDay);
    }

    private String generatePhone(Random random) {
        String[] prefixes = {"090", "091", "093", "097", "098", "032", "033"};
        return prefixes[random.nextInt(prefixes.length)]
             + String.format("%07d", random.nextInt(9999999));
    }

    private String generateEmail(String name) {
        String normalized = name.toLowerCase()
            .replaceAll("[àáạảãâầấậẩẫăằắặẳẵ]", "a")
            .replaceAll("[èéẹẻẽêềếệểễ]", "e")
            .replaceAll("[ìíịỉĩ]", "i")
            .replaceAll("[òóọỏõôồốộổỗơờớợởỡ]", "o")
            .replaceAll("[ùúụủũưừứựửữ]", "u")
            .replaceAll("[ỳýỵỷỹ]", "y")
            .replaceAll("[đ]", "d")
            .replaceAll("\\s+", ".");
        return normalized + "@synthetic.hospital.vn";
    }

    private String generateAddress(Random random) {
        String[] streets = {"Nguyễn Huệ", "Lê Lợi", "Trần Hưng Đạo",
            "Pasteur", "Nam Kỳ Khởi Nghĩa", "Hai Bà Trưng"};
        String[] districts = {"Quận 1", "Quận 3", "Quận 7",
            "Quận Bình Thạnh", "Quận Phú Nhuận", "Quận Tân Bình"};

        return (random.nextInt(200) + 1) + " " + streets[random.nextInt(streets.length)]
             + ", " + districts[random.nextInt(districts.length)]
             + ", Hồ Chí Minh";
    }

    private List<String> generateDiagnoses(Random random) {
        int count = random.nextInt(3) + 1;
        Set<String> selected = new HashSet<>();
        while (selected.size() < count) {
            selected.add(DIAGNOSIS_CODES[random.nextInt(DIAGNOSIS_CODES.length)]);
        }
        return new ArrayList<>(selected);
    }

    private List<String> generateMedications(Random random) {
        int count = random.nextInt(4) + 1;
        Set<String> selected = new HashSet<>();
        while (selected.size() < count) {
            selected.add(MEDICATIONS[random.nextInt(MEDICATIONS.length)]);
        }
        return new ArrayList<>(selected);
    }
}
```

## 9. De-identification REST API

### 9.1. Quarkus REST Endpoint

```java
package vn.hospital.deidentification;

import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;

import java.util.List;

/**
 * REST API cho data de-identification operations.
 * Chỉ privacy officer và researcher có quyền truy cập.
 */
@Path("/api/v1/deidentification")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class DeidentificationResource {

    private static final Logger LOG = Logger.getLogger(DeidentificationResource.class);

    @Inject
    SafeHarborDeidentifier safeHarborDeidentifier;

    @Inject
    KAnonymityService kAnonymityService;

    @Inject
    TokenizationService tokenizationService;

    @Inject
    SyntheticDataGenerator syntheticDataGenerator;

    /**
     * De-identify a single patient record (Safe Harbor method).
     */
    @POST
    @Path("/safe-harbor")
    @RolesAllowed({"privacy_officer", "researcher"})
    public Response deidentifySafeHarbor(PatientRecord record) {
        DeidentifiedRecord result = safeHarborDeidentifier.deidentify(record);
        return Response.ok(result).build();
    }

    /**
     * De-identify a batch of patient records.
     */
    @POST
    @Path("/safe-harbor/batch")
    @RolesAllowed({"privacy_officer", "researcher"})
    public Response deidentifyBatch(List<PatientRecord> records) {
        List<DeidentifiedRecord> results = records.stream()
            .map(safeHarborDeidentifier::deidentify)
            .toList();
        return Response.ok(results).build();
    }

    /**
     * De-identify free text (clinical notes).
     */
    @POST
    @Path("/scrub-text")
    @RolesAllowed({"privacy_officer", "researcher"})
    public Response scrubText(TextScrubRequest request) {
        String scrubbed = safeHarborDeidentifier.deidentifyText(request.getText());
        return Response.ok(new TextScrubResponse(scrubbed)).build();
    }

    /**
     * Tokenize specific fields.
     */
    @POST
    @Path("/tokenize")
    @RolesAllowed("privacy_officer")
    public Response tokenize(TokenizeRequest request) {
        TokenizeResponse response = new TokenizeResponse();
        if (request.getSsn() != null) {
            response.setTokenizedSsn(tokenizationService.tokenizeSSN(request.getSsn()));
        }
        if (request.getPhone() != null) {
            response.setTokenizedPhone(tokenizationService.tokenizePhone(request.getPhone()));
        }
        if (request.getMrn() != null) {
            response.setTokenizedMrn(tokenizationService.tokenizeMRN(request.getMrn()));
        }
        return Response.ok(response).build();
    }

    /**
     * Generate synthetic patient data for dev/test.
     */
    @GET
    @Path("/synthetic/{count}")
    @RolesAllowed({"developer", "tester", "privacy_officer"})
    public Response generateSynthetic(@PathParam("count") int count) {
        if (count > 10000) {
            return Response.status(Response.Status.BAD_REQUEST)
                .entity("Maximum 10000 records per request")
                .build();
        }

        var patients = syntheticDataGenerator.generatePatients(count);
        return Response.ok(patients).build();
    }
}
```

## 10. Data Masking Pipeline Architecture

### 10.1. Complete Pipeline

**Data Masking & De-identification Pipeline:**

1. **Extract** — `pg_dump --format=custom --compress=9` → encrypted dump file
2. **Load into Staging** — `pg_restore` → staging database (isolated network, no external access)
3. **Apply Masking Rules:**
   - Direct identifiers → Remove/Replace
   - Quasi-identifiers → Generalize
   - Dates → Shift by random offset
   - Free text → NLP scrubbing
   - Verify: k-anonymity check
4. **Validate:**
   - No real PHI remaining (regex scan)
   - Referential integrity preserved
   - Statistical properties maintained
   - K-anonymity verified (k ≥ 5)
5. **Export** — `pg_dump staging` → masked dump file → load into dev/test/research databases
6. **Cleanup** — DROP staging database, securely delete temp files, audit log the entire process

### 10.2. Comparison Table

| Method | Reversible | Format Preserved | Use Case | HIPAA Status |
|--------|-----------|-----------|----------|-------------|
| Safe Harbor | No | No | Research, analytics | De-identified (not PHI) |
| Expert Determination | No | Partial | Population health | De-identified (not PHI) |
| Dynamic Masking (Views) | N/A (view-level) | Yes | Production display | Still PHI (controlled access) |
| Static Masking | No | Partial | Dev/test environments | Not PHI if done correctly |
| Tokenization (FPE) | Yes (with key) | Yes | Payment processing | Still PHI (reversible) |
| K-Anonymity | No | Partial | Dataset sharing | De-identified if k ≥ 5 |
| Synthetic Data | N/A (generated) | Yes | Testing, training | Not PHI (no real data) |
| Encryption | Yes (with key) | No | Storage, transportation | Still PHI |

## Summary

In this lesson, we have implemented comprehensive **Data Masking, Anonymization & De-identification** for healthcare:

1. **HIPAA Safe Harbor Method**: Implementation deletes all 18 identifiers, text scrubbing for clinical notes, date generalization (year only, suppress if age > 89)
2. **Expert Determination Method**: Quasi-identifier analysis, re-identification risk assessment framework
3. **Dynamic Data Masking**: PostgreSQL views role-based (clinical, research, billing), masking functions, Row-Level Security
4. **Static Data Masking**: Production-to-dev pipeline, SQL-based masking scripts, verification checks
5. **K-Anonymity**: Implementation with generalization and suppression, verify k ≥ 5 for healthcare datasets
6. **L-Diversity & T-Closeness**: Concepts and comparison — protecting against homogeneity and skewness attacks
7. **Tokenization (FPE)**: Format-preserving tokenization for SSN, phone, MRN — keep format, change value
8. **Synthetic Data Generation**: Vietnamese patient data generator for dev/test — zero real PHI
9. **De-identification REST API**: Quarkus endpoints for Safe Harbor, tokenization, batch processing, synthetic data
10. **Pipeline Architecture**: End-to-end masking pipeline from production → staging → masked → dev/test

## Exercises

1. **Safe Harbor Implementation**: Implement SafeHarborDeidentifier for your project. Create 10 sample PatientRecord objects. De-identify all 10 records. Verify: no name, SSN, phone, email, address details in output. Verify: diagnosis codes, medications, gender are retained. Test deidentifyText() with a clinical note containing name, SSN, date.

2. **Dynamic Masking with PostgreSQL**: Create 3 masked views (clinical, research, billing) in PostgreSQL. Create 3 corresponding database roles. Set session variables `app.user_role` before query. Verify: research_view does not display name, SSN, full address. Verify: clinical_view displays name but masks SSN. Test Row-Level Security: cardiology user cannot see surgery patients.

3. **K-Anonymity**: Create a dataset of 100 records with quasi-identifiers (age, zip, gender). Implement k-anonymity with k=5. Verify: each equivalence class has ≥ 5 records. Measure data utility loss (how many records are suppressed). Compare k=3 vs k=5 vs k=10 in terms of utility loss.

4. **Synthetic Data Pipeline**: Implement SyntheticDataGenerator. Generate 1000 synthetic patients. Export to CSV and import into test database. Run application tests with synthetic data. Verify: there is no real PHI in the test database using regex scan script.

---

---

<!-- SERIES-NAV:START -->
| ◀ Previous article | Next article ▶ |
|:---|---:|
| [Lesson 18: Centralized Audit Trail with OpenTelemetry & ELK Stack](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-18-centralized-audit-trail-opentelemetry-elk) | [Lesson 20: Backup, Disaster Recovery & Business Continuity for Medical Data](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-20-backup-dr-business-continuity-du-lieu-y-te) |
<!-- SERIES-NAV:END -->
