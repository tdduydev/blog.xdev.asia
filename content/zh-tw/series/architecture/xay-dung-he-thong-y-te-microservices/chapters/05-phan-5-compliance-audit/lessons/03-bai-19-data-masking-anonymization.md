---
id: 019e1a40-a119-7001-d001-f0a1b2c30119
title: 第 19 課：資料脫敏、匿名化與去識別化
slug: bai-19-data-masking-anonymization
description: >-
  醫療資料保護技術：HIPAA 安全港方法（18 個識別碼）、專家判定方法、PostgreSQL 中的動態資料脫敏、資料集的
  k-匿名/l-多樣性/t-封閉性、敏感欄位的標記化、用於測試的合成資料產生以及用於資料去識別化管道的 Quarkus 實作。
duration_minutes: 180
is_free: true
video_url: null
sort_order: 19
section_title: 第 5 部分：合規性、稽核與資料保護
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: 建構微服務醫療保健系統 — Quarkus、PostgreSQL、符合 HIPAA 標準的 Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: zh-tw
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#38bdf8">🏗️ 建築 — 第 19 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 19 課：資料脫敏、匿名化和</tspan>
      <tspan x="60" dy="42">去識別化</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">建構微服務醫療保健系統 — Quarkus、PostgreSQL、符合 HIPAA 標準的 Keycloak</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 5 部分：合規性、稽核與資料保護</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 1. 醫療保健資料去識別化概述

![HIPAA De-identification — Safe Harbor vs Expert Determination](/storage/uploads/2026/04/healthcare-data-deidentification.webp)

如果資料已**去識別化**，即無法用於識別患者身份，則 HIPAA 允許在**未經患者同意**的情況下使用和共享醫療資料。這是醫學研究、人口健康分析和醫療保健機器學習的基礎。

### 1.1。 HIPAA 去識別化標準 — §164.514

![HIPAA De-identification — Safe Harbor vs Expert Determination flow](/storage/uploads/2026/04/healthcare-safe-harbor-flow.webp)

**PHI（受保護的健康資訊）** 根據 §164.514(a) 有 2 種去識別化方法：

- **方法 1：安全港** §164.514(b)
  - 刪除所有 **18 個識別符**
  - 沒有關於重新識別的實際知識
  - 確定性、基於規則
- **方法 2：專家裁決** §164.514(b)(1)
  - 統計/科學專家認證
  - 重新識別的風險**「非常小」**
  - 記錄方法和結果

**→ 去識別化資料**：不被視為 PHI，不受 HIPAA 隱私規則的約束，可以免費共享用於研究

### 1.2。資料保護範圍

![資料保護範圍 — 從合成資料到原始 PHI](/storage/uploads/2026/04/healthcare-data-protection-spectrum.webp)

|水平|描述 |使用案例 |
|--------|--------|----------|
| **綜合資料** |從模式產生的假資料 |開發/測試、訓練 |
| **匿名資料** |無法恢復原狀 |研究、分析、人口健康 |
| **去識別化資料** |刪除了 18 個識別碼（安全港）|研究分享、出版物 |
| **屏蔽資料** |部分隱藏（SSN：***-4567）|生產顯示、日誌 |
| **原始 PHI** |完整資料可見 |測試（受限）|

◄── **更多隱私** ────────────────── **更少隱私** ──►

## 2.HIPAA 安全港方法 — 18 個識別符

### 2.1。必須刪除的 18 個識別符列表

| ＃|標識符|範例|實施|
|---|-----------|--------------------|----------------|
| 1 |姓名 |阮文A |刪除或用筆名取代 |
| 2 | 地理資料（<州) |胡志明市第 1 區阮惠 123 號 |刪除地址；僅保留州/省 |
| 3 |日期（年份除外）|三月 15, 1990 → 1990 |僅推廣到年份 |
| 4 | Phone numbers | 0901234567 | Remove |
| 5 | Fax numbers | 028-12345678 | Remove |
| 6 | Email addresses | <patient@gmail.com> |刪除|
| 7 | SSN / CCCD | 079123456789 |刪除|
| 8 |病歷號碼 | MRN-2024-001 |刪除或重新設定密鑰 |
| 9 |健康計畫受益人# | HI-123456 |刪除 |
| 10 | 10帳號 | ACC-789 |刪除|
| 11 | 11證書/許可證# | GP-2020-12345 |刪除|
| 12 | 12車輛識別碼 | 51A-12345 |刪除 |
| 13 |裝置識別碼/序號 |開發-XYZ-789 |刪除 |
| 14 | 14網址 |病人入口網站.hospital.vn |刪除 |
| 15 | 15 IP 位址 | 192.168.1.100 |刪除|
| 16 | 16生物辨識標識符 |指紋哈希 |刪除 |
| 17 | 17全臉照片|病人照片.jpg |刪除 |
| 18 | 18任何其他唯一識別碼 |自訂病患代碼 |刪除或重新設定密鑰 |

### 2.2。安全港實施

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

### 2.3。去識別記錄 DTO

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

## 3. 專家判定方法 — §164.514(b)(1)

### 3.1。概述

專家裁決方法比安全港方法具有更大的靈活性，但需要：

1. 統計或科學專家評估數據
2.專家確認重新識別風險**「非常小」**
3. 記錄評估方法和結果

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
-- PostgreSQL 的動態資料屏蔽
-- 根據使用者角色建立屏蔽視圖

-- 基底表（包含完整的 PHI）
--healthcare.患者（從上一篇文章創建）

-- === 臨床工作人員的屏蔽視圖 ===
-- 醫護人員：查看姓名、性別、年齡，但不查看 SSN、完整地址
建立或取代檢視healthcare. Patients_clinical_view AS
選擇
    身分證號，
    先生，
    full_name, -- 臨床需要知道病人的姓名
    案例
        WHEN current_setting('app.user_role', true) IN ('醫生', '護士')
        然後'***-**-' ||右（ssn，4）
        其他'***-**-****'
    結束為 ssn,
    出生日期，
    性別，
    案例
        WHEN current_setting('app.user_role', true) IN ('醫生', '護士')
        然後電話號碼
        其他 '****' ||右（電話號碼，4）
    END AS 電話號碼，
    '***@***.***' AS 電子郵件，-- 隨時屏蔽
    案例
        當 current_setting('app.user_role', true) = '醫生'
        然後地址
        ELSE regexp_replace(address, '^[^,]+,\s*', '', 'g') -- 只保留城市/省份
    結束地址，
    診斷代碼，
    部門,
    醫院_id，
    創建時間
來自醫療保健、病人；

-- === 研究/分析的屏蔽視圖 ===
-- 研究人員：只能看到去識別化的數據
建立或取代檢視healthcare. Patients_research_view AS
選擇
    gen_random_uuid() AS Research_id, -- 每個查詢的隨機 ID
    NULL 身為 先生，
    NULL 作為全名，
    空作為 ssn，
    EXTRACT(YEAR FROM date_of_birth)::INTEGER ASbirth_year,
    案例
        當提取（年齡（出生日期））> 89 那麼“90+”
        ELSE (FLOOR(EXTRACT(年齡(出生日期)) / 5) * 5)::TEXT
             || '-'
             || (FLOOR(EXTRACT(年齡(出生日期)) / 5) * 5 + 4)::TEXT
    END AS 年齡範圍，
    性別，
    NULL 作為電話號碼，
    空作為電子郵件，
    AS 位址為空，
    -- 只保留省/市
    案例
        WHEN 地址ILIKE '%ho chi minh%' 或地址ILIKE '%hcm%' THEN 'Ho Chi Minh'
        WHEN 地址 ILIKE '%hanoi%' THEN 'Hanoi'
        WHEN 地址ILIKE '%da Nang%' THEN 'Da Nang'
        ELSE“其他”
    END AS 區域，
    診斷代碼，
    部門,
    created_at::DATE AScreated_date -- 刪除時間部分
來自醫療保健、病人；

-- === 計費屏蔽視圖 ===
-- 計費人員：看付款訊息，看不到臨床數據
建立或取代檢視healthcare. Patients_billing_view AS
選擇
    身分證號，
    先生，
    全名，
    空作為 ssn，
    NULL 作為出生日期，
    電話號碼，
    電子郵件，
    地址，
    NULL AS Diagnostic_codes, -- 計費不需要知道診斷
    部門,
    醫院_id，
    創建時間
來自醫療保健、病人；

-- === 行級安全性 ===
-- 確保每個部門只接待自己的患者
更改表healthcare.患者啟用行級安全；

在healthcare.患者上建立政策患者_部門_政策
    使用（
        部門 = current_setting('app.user_department', true)
        或 current_setting('app.user_role', true) IN ('admin', 'privacy_officer')
    ）；

-- ===授予權限===
將 Healthcare.病患_臨床_視圖上的選擇授予臨床_角色；
將 Healthcare.病患_研究_視圖上的選擇授予研究_角色；
將 Healthcare.患者_billing_view 上的選擇授予 billing_role；

-- 不要直接在基底表上授予
從臨床角色、研究角色、計費角色中撤銷醫療保健.病人的所有內容；
```

### 4.2. Dynamic Masking Functions

```sql
-- 可重複使用的屏蔽功能

-- 口罩電子郵件：病人@hospital.vn → p***@h***.vn
建立或取代函數healthcare.mask_email(email TEXT)
回傳文字為 $$
開始
    如果電子郵件為 NULL，則傳回 NULL；結束如果；
    返回正規表示式_替換（
        電子郵件，
        '(.)([^@]*)(@.)(.*)(\..*)',
        '\1***\3***\5'
    ）；
結尾;
$$ 語言 plpgsql 不可變；

-- 口罩電話：0901234567 → ****34567
建立或取代函數healthcare.mask_phone(phone TEXT)
回傳文字為 $$
開始
    如果電話為 NULL，則傳回 NULL；結束如果；
    返回 '***' ||右（電話，5）；
結尾;
$$ 語言 plpgsql 不可變；

-- 面具名稱：Nguyen Van A → N*** V*** A
建立或取代函數healthcare.mask_name(name TEXT)
回傳文字為 $$
開始
    如果名稱為 NULL，則傳回 NULL；結束如果；
    RETURN regexp_replace(name, '(\w)\w+', '\1***', 'g');
結尾;
$$ 語言 plpgsql 不可變；

-- 將年齡歸納為 5 歲範圍
建立或取代函數healthcare.age_range(dob DATE)
回傳文字為 $$
聲明
    齡 INTEGER；
    範圍_起始整數；
開始
    如果 dob 為 NULL，則傳回 NULL；結束如果；
    age_years := EXTRACT(年份來自年齡(dob));
    IF 年齡 > 89 THEN RETURN '90+';結束如果；
    範圍_開始 := (年齡_年 / 5) * 5;
    返回範圍_開始|| '-' || (範圍開始+4);
結尾;
$$ 語言 plpgsql 不可變；
```

## 5. Static Data Masking cho Dev/Test

### 5.1. Masking Pipeline cho Non-Production

```

**靜態資料屏蔽管道：**

1. **生產資料庫** → `pg_dump` （邏輯備份）
2. **暫存區**（臨時、隔離網路）
3. **應用遮罩變換：**
   - 名稱 → Faker 產生的名稱
   - SSN → 隨機 SSN 格式
   - 日期 → 以隨機偏移移動
   - 地址 → 隨機
   - MRN → 重新加密
4. **驗證屏蔽資料：**
   - 沒有剩餘的真實 PHI
   - 保留參照完整性
   - 數據分佈相似
5. **開發/測試資料庫** — 可以安全使用，不受 HIPAA 限制

> ⚠️ 屏蔽後暫存區域被安全刪除

### 5.2。基於 SQL 的靜態屏蔽腳本

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

## 6. K-匿名性、L-多樣性、T-親密性

### 6.1。 K-匿名

**定義**：如果每個準標識符組合出現至少 **k 次**，則資料集實現 k-匿名。這意味著每筆記錄無法與至少 k-1 個其他記錄區分開來。

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

```爪哇
軟體包 vn.hospital.deidentification；

導入 jakarta.enterprise.context.ApplicationScoped;
導入 org.jboss.logging.Logger;

導入 java.util.*;
導入java.util.stream.Collectors；

/**
 * 醫療保健資料集的 K-匿名實作。
 */
@ApplicationScoped
公共類別 KAnonymityService {

    私有靜態最終 Logger LOG = Logger.getLogger(KAnonymityService.class);

    /**
     * 將 k-匿名套用至資料集。
     * @param記錄原始資料集
     * @param k 最小組大小（建議：k ≥ 5）
     * @param quasiIdentifiers 準標識符欄位列表
     * @return k-匿名資料集
     */
    公共列表<Map<String, Object>>匿名化(
            清單<Map<String, Object>> 記錄，
            整數 k，
            清單<String> 準標識符）{

        LOG.infof("正在對 %d 筆記錄套用 %d-匿名，QI: %s",
            k、records.size()、quasiIdentifiers)；

        清單<Map<String, Object>> 結果 = new ArrayList<>();

        對於（地圖<String, Object> 記錄：記錄）{
            地圖<String, Object> 匿名 = new LinkedHashMap<>(記錄);

            // 泛化準標識符
            for (String qi : quasiIdentifiers) {
                物件值 = record.get(qi);
                anonymized.put（qi，generalizeValue（qi，值））；
            }

            結果.add(匿名);
        }

        // 驗證 k-匿名性
        布林有效 = verifyKAnonymity(結果, k, quasiIdentifiers);
        如果（！有效）{
            // 對群組應用抑制 < k
            result = suppressSmallGroups(result, k, quasiIdentifiers);
        }

        LOG.infof("K-anonymity applied: %d records → %d records (suppressed: %d)",
            records.size(), result.size(), records.size() - result.size());

        return result;
    }

    /**
* 根據欄位類型概括值。
     */
    private Object generalizeValue(String fieldName, Object value) {
        if (value == null) return null;

        return switch (fieldName) {
            case "age", "birth_year" -> genericizeAge(((Number) value).intValue());
            case "zip_code", "postal_code" -> genericizeZipCode(value.toString());
            案例“出生日期”-> genericizeDate(value.toString());
            案例「性別」-> 值； // 必要時維持或抑制
            預設值->值；
        };
    }

    /**
     * 將年齡概括為 5 歲範圍。
     * 28→“25-29”，35→“35-39”，90→“90+”
     */
    私人字符串generalizeAge（int年齡）{
        如果（年齡 > 89）返回“90+”；
        int lowerBound = (年齡 / 5) * 5;
        返回 lowerBound + "-" + (lowerBound + 4);
    }

    /**
     * 概括郵遞區號。
     *“70000”→“700**”（3 位元前綴）
     */
    私有字串generalizeZipCode（字串zip）{
        if (zip.length() >= 3) {
            返回 zip.substring(0, 3) + "**";
        }
        返回 ”***”;
    }

    /**
     * 將日期概括為年份。
     */
    私有字串generalizeDate（字串日期）{
        if (date.length() >= 4) {
            回傳日期.substring(0, 4); // 只保留年份
        }
        返回“****”；
    }

    /**
     * 驗證資料集達到 k-匿名性。
     */
    公共布爾驗證KAnonymity（
            清單<Map<String, Object>> 記錄，
            整數 k，
            清單<String> 準標識符）{

        地圖<String, Long> 等價類=記錄.stream()
            .collect(Collectors.groupingBy(
                記錄 -> quasiIdentifiers.stream()
                    .map(qi -> String.valueOf(record.get(qi)))
                    .collect(Collectors.joining("|")),
                Collectors.counting()
            ））；

        長 violatingClasses = equalenceClasses.values().stream()
            .filter(計數 -> 計數 < k)
            .count();

        if (violatingClasses > 0) {
            LOG.warnf("K-匿名違規：%d 等價類的記錄少於 %d",
                違反類別，k)；
            返回假；
        }

        返回真；
    }

    /**
     * 抑制（刪除）小於 k 的群組中的記錄。
     */
    私人名單<Map<String, Object>> 抑制小團體(
            清單<Map<String, Object>> 記錄，
            整數 k，
            清單<String> 準標識符）{

        地圖<String, List<Map<String, Object>>> 組 = 記錄.stream()
            .collect(Collectors.groupingBy(
                記錄 -> quasiIdentifiers.stream()
                    .map(qi -> String.valueOf(record.get(qi)))
                    .collect(Collectors.joining("|"))
            ））；

        返回 groups.values().stream()
            .filter(群組 -> group.size() >= k)
            .flatMap(集合::流)
            .collect(Collectors.toList());
    }
}
```

### 6.3. L-Diversity và T-Closeness

**L-Diversity**: Mở rộng k-anonymity — mỗi equivalence class phải chứa ít nhất **l** giá trị khác nhau của sensitive attribute. Ngăn chặn **homogeneity attack** (khi tất cả records trong 1 group có cùng diagnosis).

**T-Closeness**: Phân phối sensitive attribute trong mỗi equivalence class phải gần với phân phối tổng thể (khoảng cách ≤ t). Ngăn chặn **skewness attack**.

```

**K-匿名 (k=3) — 易受攻擊（同質性攻擊）：**

|年齡範圍 |診斷 |
|------------|----------|
| 25-35 | 25-35愛滋病毒 ← 所有人都患有愛滋病毒！ |
| 25-35 | 25-35 HIV ← 攻擊者知道診斷 |
| 25-35 | 25-35 HIV ← 即使不知道是誰 |

**L-多樣性 (l=3) — 受保護：**

|年齡範圍 |診斷|
|------------|----------|
| 25-35 | 25-35糖尿病 ← 3 種不同的診斷 |
| 25-35 | 25-35心 ← 攻擊者無法推論 |
| 25-35 | 25-35冷←哪一個屬於目標|

|方法|防止 |弱點|
|--------|------------|----------|
| K-匿名 |身分洩漏|同質性攻擊（相同敏感值） |
| L-多樣性 |屬性揭露 |偏度攻擊（分佈不均勻）|
| T-緊密度|分配揭露|比較複雜，實施起來比較困難 |

## 7. 使用保留格式加密進行標記化

### 7.1。代幣化架構

**流量：**
- **原始 SSN**： `079-123-456789`
- → **令牌化服務**（格式保留加密 — FPE）
  - **令牌**： `248-971-832145` （相同格式，不同值，用鑰匙可逆）
  - **Token Vault**：加密映射令牌→原始

**優點：**
- 相同的格式 → 現有系統工作（驗證、UI）
- 可逆 → 授權用戶可以去代幣化
- 參考完整性→始終相同的SSN→相同的令牌

### 7.2。 FPE 代幣化服務

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

## 8. 合成資料生成

### 8.1。用於測試的綜合數據產生器

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

## 9. 去識別化REST API

### 9.1。 Quarkus REST 端點

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

## 10. 資料脫敏管道架構

### 10.1。完整的管道

**資料減敏與去識別化管道：**

1. **摘錄** — `pg_dump --format=custom --compress=9` → 加密轉儲文件
2. **載入到暫存** — `pg_restore` → 臨時資料庫（隔離網絡，無外部存取）
3. **應用屏蔽規則：**
   - 直接標識符→刪除/替換
   - 準標識符 → 泛化
   - 日期 → 以隨機偏移移動
   - 自由文字 → NLP 擦洗
   - 驗證：k-匿名檢查
4. **驗證：**
   - 沒有剩餘的真實 PHI（正規表示式掃描）
   - 保留參照完整性
   - 保持統計屬性
   - K-匿名性驗證（k ≥ 5）
5. **出口** — `pg_dump staging` → 屏蔽轉儲檔案 → 載入到開發/測試/研究資料庫中
6. **清理** — 刪除暫存資料庫，安全刪除臨時文件，審核整個過程的日誌

### 10.2。比較表

|方法|雙面 |保留格式 |使用案例| HIPAA 狀態 |
|--------|---------|------------|---------|------------|
|安全港|沒有 |沒有 |研究、分析 |去識別化（不是 PHI）|
|專家判定|沒有 |部分|人口健康|去識別化（不是 PHI）|
|動態遮罩（視圖）| N/A（視圖層級）|是的 |生產展示|仍然是 PHI（受控存取）|
|靜態遮蔽|沒有 |部分|開發/測試環境 |如果操作正確，則不是 PHI |
|代幣化（FPE）|是（帶鑰匙）|是的 |付款處理 |仍然 PHI（可逆）|
| K-匿名 |沒有 |部分|資料集共用 |如果 k ≥ 5 則取消識別 |
|綜合資料|不適用（產生）|是的 |測驗、訓練|不是 PHI（沒有真實資料）|
|加密 |是（帶鑰匙）|沒有 |儲存、運輸|仍然 PHI |

## 總結

在本課中，我們為醫療保健實施了全面的**數據脫敏、匿名化和去識別化**：

1. **HIPAA 安全港方法**：實施刪除所有 18 個識別碼、臨床記錄的文字清理、日期概括（僅限年份，如果年齡 > 89 則禁止）
2. **專家判定方法**：準識別碼分析、重識別風險評估框架
3. **動態資料屏蔽**：PostgreSQL視圖基於角色（臨床、研究、計費）、屏蔽功能、行級安全性
4. **靜態資料屏蔽**：生產到開發管道、基於 SQL 的屏蔽腳本、驗證檢查
5. **K-Anonymity**：泛化和抑制的實現，驗證醫療資料集的 k ≥ 5
6. **L-Diversity & T-Closeness**：概念與比較 - 防止同質性和偏斜攻擊
7. **標記化 (FPE)**：SSN、電話、MRN 的格式保留標記化 — 保留格式，變更值
8. **合成資料產生**：用於開發/測試的越南病患資料產生器 - 零真實 PHI
9. **去辨識 REST API**：用於安全港、標記化、批次、合成資料的 Quarkus 端點
10. **管道架構**：從生產→登台→屏蔽→開發/測試的端到端屏蔽管道

## 練習

1. **安全港實施**：為您的專案實施 SafeHarborDeidentifier。建立 10 個範例 PatientRecord 物件。取消所有 10 筆記錄的標識。驗證：輸出中沒有姓名、SSN、電話、電子郵件、地址詳細資料。驗證：保留診斷代碼、藥物、性別。使用包含姓名、SSN、日期的臨床記錄測試 deidentifyText()。

2. **使用 PostgreSQL 進行動態屏蔽**：在 PostgreSQL 中建立 3 個屏蔽視圖（臨床、研究、計費）。建立3個對應的資料庫角色。設定會話變數 `app.user_role` 查詢之前。驗證：research_view 不顯示姓名、SSN、完整地址。驗證：clinical_view 顯示姓名但掩蓋 SSN。測試行級安全性：心臟科使用者無法看到手術病人。

3. **K-匿名**：建立包含 100 筆記錄的資料集，其中包含準識別碼（年齡、郵遞區號、性別）。實作 k-匿名，k=5。驗證：每個等價類有 ≥ 5 筆記錄。衡量數據效用損失（有多少記錄被抑制）。比較 k=3 與 k=5 與 k=10 的效用損失。

4. **合成資料管道**：實作SyntheticDataGenerator。生成 1000 名合成患者。匯出為 CSV 並匯入測試資料庫。使用合成數據運行應用程式測試。驗證：使用正規表示式掃描腳本測試資料庫中沒有真正的 PHI。

---

---

<!-- SERIES-NAV:START -->
| ◀ 上一篇 |下一篇文章 ▶ |
|:---|---:|
| [第 18 課：使用 OpenTelemetry 和 ELK Stack 進行集中審計追蹤](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-18-centralized-audit-trail-opentelemetry-elk) | [第 20 課：醫療資料的備份、災難復原和業務連續性](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-20-backup-dr-business-continuity-du-lieu-y-te) |
<!-- SERIES-NAV:END -->
