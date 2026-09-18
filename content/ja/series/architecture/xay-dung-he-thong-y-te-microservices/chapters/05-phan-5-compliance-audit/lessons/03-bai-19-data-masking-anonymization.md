---
id: 019e1a40-a119-7001-d001-f0a1b2c30119
title: 'レッスン 19: データのマスキング、匿名化、匿名化'
slug: bai-19-data-masking-anonymization
description: >-
  医療データ保護技術: HIPAA セーフハーバー法 (18 個の識別子)、エキスパート判定法、PostgreSQL の動的データ マスキング、データセットの
  k-匿名性/l-多様性/t-近さ、機密フィールドのトークン化、テスト用の合成データ生成、およびデータ匿名化パイプラインのための Quarkus 実装。
duration_minutes: 180
is_free: true
video_url: null
sort_order: 19
section_title: 'パート 5: コンプライアンス、監査、データ保護'
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: ja
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#38bdf8">🏗️ アーキテクチャ — レッスン 19</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 19: データのマスキング、匿名化、</tspan>
      <tspan x="60" dy="42">匿名化</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 5: コンプライアンス、監査、データ保護</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. 医療向けデータ匿名化の概要

![HIPAA De-identification — Safe Harbor vs Expert Determination](/storage/uploads/2026/04/healthcare-data-deidentification.webp)

HIPAA では、医療データが **匿名化**されている場合、**患者の同意なし**、つまり患者の特定に使用できない医療データの使用と共有を許可しています。これは、医療研究、人口健康分析、医療における機械学習の基盤です。

＃＃＃１．１． HIPAA 匿名化標準 — §164.514

![HIPAA De-identification — Safe Harbor vs Expert Determination flow](/storage/uploads/2026/04/healthcare-safe-harbor-flow.webp)

**PHI (保護された健康情報)** には、§164.514(a) に基づいて 2 つの匿名化方法があります。

- **方法 1: セーフハーバー** §164.514(b)
  - **18 個の識別子**をすべて削除します
  - 再識別に関する実際の知識がない
  - 決定的、ルールベース
- **方法 2: 専門家の決定** §164.514(b)(1)
  - 統計/科学の専門家認定
  - 再識別のリスクは **「非常に小さい」**
  - 方法と結果を文書化する

**→ 匿名化データ**: PHI とみなされず、HIPAA プライバシー規則の対象ではなく、研究目的で自由に共有できます

＃＃＃１．２．データ保護のスペクトル

![データ保護のスペクトル — 合成データからオリジナルの PHI まで](/storage/uploads/2026/04/healthcare-data-protection-spectrum.webp)

|レベル |説明 |使用例 |
|----------|----------|----------|
| **合成データ** |パターンから生成された偽データ |開発/テスト、トレーニング |
| **匿名化されたデータ** |元に戻すことはできません |研究、分析、人口の健康 |
| **匿名化されたデータ** | 18 個の識別子を削除 (セーフハーバー) |研究の共有、出版物 |
| **マスクされたデータ** |部分的な非表示 (SSN: ***-4567) |生産表示、ログ |
| **オリジナルの PHI** |完全なデータを表示 |テスト (制限付き) |

◄── **プライバシーの強化** ──---------------------------- **プライバシーの削減** ──►

## 2. HIPAA セーフハーバー手法 — 18 の識別子

＃＃＃２．１． List of 18 Identifiers that must be deleted

| # |識別子 |例 |実装 |
|---|-----------|------|-----|
| 1 |名前 |グエン・ヴァン・A |削除するか仮名に置き換える |
| 2 |地理データ (< 州) | 123 グエン フエ、1 区、ホーチミン市 |アドレスを削除します。州/県のみを保持 |
| 3 |日付 (年を除く) | 1990 年 3 月 15 日 → 1990 年 |年のみに一般化する |
| 4 | Phone numbers | 0901234567 | Remove |
| 5 | Fax numbers | 028-12345678 | Remove |
| 6 | Email addresses | <patient@gmail.com> |削除 |
| 7 | SSN/CCCD | 079123456789 |削除 |
| 8 |医療記録番号 | MRN-2024-001 |削除または再キー |
| 9 |健康保険の受取人 # | HI-123456 |削除 |
| 10 |口座番号 | ACC-789 |削除 |
| 11 |証明書/ライセンス番号 | GP-2020-12345 |削除 |
| 12 |識別子51A-12345 |削除 |
| 13 |デバイス識別子/シリアル | DEV-XYZ-789 |削除 |
| 14 |ウェブ URL |患者ポータル.病院.vn |削除 |
| 15 | IPアドレス | 192.168.1.100 |削除 |
| 16 |生体認証識別子 |指紋ハッシュ |削除 |
| 17 |正面写真 |患者の写真.jpg |削除 |
| 18 |その他の一意の識別子 |カスタム患者コード |削除または再キー |

＃＃＃２．２．セーフハーバーの実装

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

＃＃＃２．３．匿名化記録 DTO

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

## 3. 専門家の決定方法 — §164.514(b)(1)

＃＃＃３．１．概要

専門家による決定方法では、セーフ ハーバーよりも柔軟性が高くなりますが、次のことが必要です。

1. 統計または科学の専門家がデータを評価します
2. 専門家は、再識別のリスクは **「非常に小さい」** と確認しています
3. 評価方法と結果の文書化

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

```SQL
-- PostgreSQL の動的データ マスキング
-- ユーザーの役割に基づいてマスクされたビューを作成する

-- ベース テーブル (完全な PHI を含む)
--healthcare.patients (前の投稿から作成)

-- === 臨床スタッフ向けのマスクされたビュー ===
-- 医療スタッフ: 名前、性別、年齢は表示されますが、SSN、完全な住所は表示されません
ビューhealthcare.patients_clinical_view ASを作成または置換します
選択
    ID、
    さん、
    full_name, -- 臨床現場では患者の名前を知る必要があります
    ケース
        WHEN current_setting('app.user_role', true) IN ('医師', '看護師')
        その後 '***-**-' ||右(SSN、4)
        ELSE '***-**-****'
    ssnとして終了、
    生年月日、
    性別、
    ケース
        WHEN current_setting('app.user_role', true) IN ('医師', '看護師')
        THEN phone_number
        ELSE '****' || RIGHT(電話番号, 4)
    END AS 電話番号、
    '***@***.***' AS email、 -- 常にマスク
    ケース
        WHEN current_setting('app.user_role', true) = '医師'
        次に住所
        ELSE regexp_replace(address, '^[^,]+,\s*', '', 'g') -- 市/県のみを保持します
    END AS アドレス、
    診断コード、
    部門、
    病院ID、
    作成日
ヘルスケア、患者から。

-- === リサーチ/分析用のマスクされたビュー ===
-- 研究者: 匿名化されたデータのみを表示します
ビューhealthcare.patients_research_view ASを作成または置換します
選択
    gen_random_uuid() AS Research_id, -- クエリごとのランダム ID
    NULL AS mrn、
    full_name として NULL、
    ssnとしてNULL、
    EXTRACT(誕生日からの年)::INTEGER AS 誕生年、
    ケース
        WHEN EXTRACT(年齢(生年月日)からの年) > 89 THEN '90+'
        ELSE (FLOOR(EXTRACT(年齢(生年月日)からの年) / 5) * 5)::TEXT
             || 「-」
             || (FLOOR(EXTRACT(年齢(生年月日)からの年) / 5) * 5 + 4)::TEXT
    age_range として終了、
    性別、
    電話番号として NULL、
    NULL ASメール、
    NULL AS アドレス、
    -- 県/市のみを保持します
    ケース
        WHEN 住所 ILIKE '%ho chi minh%' または 住所 ILIKE '%hcm%' THEN 'Ho Chi Minh'
        アドレスが '%hanoi%' のような場合、THEN 'ハノイ'
        住所が '%da Nang%' のような場合、THEN 'Da Nang'
        ELSE「その他」
    END AS 領域、
    診断コード、
    部門、
    created_at::DATE AS created_date -- 時間コンポーネントを削除します
ヘルスケア、患者から。

-- === 請求用のマスクされたビュー ===
-- 請求担当者: 支払い情報を参照します。臨床データは参照しません。
ビューhealthcare.patients_billing_view ASを作成または置換します
選択
    ID、
    さん、
    フルネーム、
    ssnとしてNULL、
    生年月日として NULL、
    電話番号、
    メール、
    住所、
    NULL AS Diagnostic_codes、 -- 請求では診断を知る必要はありません
    部門、
    病院ID、
    作成日
ヘルスケア、患者から。

-- === 行レベルのセキュリティ ===
-- 各科が自分の患者のみを診察するようにする
ALTER TABLE healthcare.patients 行レベルのセキュリティを有効にします。

CREATE POLICY 患者_部門_ポリシー ONhealthcare.patients
    (を使用しています)
        部門 = current_setting('app.user_Department', true)
        または current_setting('app.user_role', true) IN ('admin', 'privacy_officer')
    );

-- === 権限を付与する ===
Clinical_role にhealthcare.patients_clinical_viewの選択を許可します。
Research_role にhealthcare.patients_research_viewの選択を許可します。
billing_role にhealthcare.patients_billing_viewの選択を許可します。

-- ベーステーブルに直接付与しないでください。
Clinical_role、research_role、billing_role からhealthcare.patientsのすべてを取り消します。
```

### 4.2. Dynamic Masking Functions

```SQL
-- 再利用可能なマスキング関数

-- マスクメール:patient@hospital.vn → p***@h***.vn
関数を作成または置換しますhealthcare.mask_email(email TEXT)
テキストを $$ として返します
始める
    電子メールが NULL の場合は、NULL を返します。終了 IF;
    RETURN regexp_replace(
        メール、
        '(.)([^@]*)(@.)(.*)(\..*)',
        '\1***\3***\5'
    );
終わり;
$$ 言語 plpgsql 不変;

-- マスク電話：0901234567 → ****34567
関数healthcare.mask_phone(電話テキスト)の作成または置換
テキストを $$ として返します
始める
    電話が NULL の場合は、NULL を返します。終了 IF;
    '****' を返します ||右(電話、5);
終わり;
$$ 言語 plpgsql 不変;

-- マスク名：Nguyen Van A → N*** V*** A
関数を作成または置換しますhealthcare.mask_name(name TEXT)
テキストを $$ として返します
始める
    名前が NULL の場合は、NULL を返します。終了 IF;
    RETURN regexp_replace(name, '(\w)\w+', '\1***', 'g');
終わり;
$$ 言語 plpgsql 不変;

-- 年齢を 5 歳の範囲に一般化します
関数を作成または置換しますhealthcare.age_range(dob DATE)
テキストを $$ として返します
宣言する
    age_year INTEGER;
    range_start INTEGER;
始める
    dob が NULL の場合は、NULL を返します。終了 IF;
    age_year := EXTRACT(YEAR FROM age(dob));
    if age_year > 89 THEN RETURN '90+';終了 IF;
    範囲開始 := (年齢 / 5) * 5;
    RETURN 範囲開始 || '-' || (範囲開始 + 4);
終わり;
$$ 言語 plpgsql 不変;
```

## 5. Static Data Masking cho Dev/Test

### 5.1. Masking Pipeline cho Non-Production

```

**静的データ マスキング パイプライン:**

1. **本番DB** → `pg_dump` (論理バックアップ)
2. **ステージングエリア** (一時的な分離されたネットワーク)
3. **マスキング変換を適用します:**
   - 名前 → Faker が生成した名前
   - SSN → ランダム SSN 形式
   - 日付 → ランダムなオフセットでシフト
   - アドレス → ランダム化
   - MRN → 再キー化
4. **マスクされたデータを検証します:**
   - 本物の PHI は残っていない
   - 参照整合性の保持
   - データ分布が類似している
5. **開発/テスト DB** — HIPAA 制約なしで安全に使用できます

> ⚠️ ステージング領域はマスク後に安全に削除されます

＃＃＃５．２． SQLベースの静的マスキングスクリプト

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

## 6. K-匿名性、L-多様性、T-親密性

＃＃＃６．１． K-匿名性

**定義**: 準識別子の各組み合わせが少なくとも **k 回**出現する場合、データセットは k-匿名性を達成します。これは、各レコードを少なくとも k-1 個の他のレコードから区別できないことを意味します。

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

```ジャワ
パッケージ vn.hospital.deidentification;

インポートjakarta.enterprise.context.ApplicationScoped;
org.jboss.logging.Logger をインポートします。

java.util.* をインポートします。
java.util.stream.Collectorsをインポートします。

/**
 * 医療データセットの K-匿名性の実装。
 */
@ApplicationScoped
パブリック クラス KAAnonymityService {

    プライベート静的最終ロガーLOG = Logger.getLogger(KAnonymityService.class);

    /**
     * データセットに k-匿名性を適用します。
     * @param は元のデータセットを記録します
     * @param k 最小グループサイズ (推奨: k ≥ 5)
     * @param quasiIdentifiers 準識別子フィールドのリスト
     * @return k-匿名化データセット
     */
    パブリックリスト<Map<String, Object>>匿名化(
            リスト<Map<String, Object>> 記録、
            int k、
            リスト<String> 準識別子) {

        LOG.infof("%d 匿名性を %d レコードに適用しています。QI: %s",
            k、records.size()、quasiIdentifiers);

        リスト<Map<String, Object>> 結果 = 新しい ArrayList<>();

        (地図<String, Object> レコード : レコード) {
            地図<String, Object> 匿名化 = 新しい LinkedHashMap<>(レコード);

            // 準識別子を一般化する
            for (String qi : quasiIdentifiers) {
                オブジェクト値 = Record.get(qi);
                anonymized.put(qi, generalizeValue(qi, value));
            }

            result.add(匿名化);
        }

        // k-匿名性を検証する
        ブール値有効 = verifyKAnonymity(result, k, quasiIdentifiers);
        if (!有効) {
            // グループに抑制を適用します < k
            result = suppressSmallGroups(result, k, quasiIdentifiers);
        }

        LOG.infof("K-anonymity applied: %d records → %d records (suppressed: %d)",
            records.size(), result.size(), records.size() - result.size());

        return result;
    }

    /**
*フィールドタイプに基づいて値を一般化します。
     */
    private Object generalizeValue(String fieldName, Object value) {
        if (value == null) return null;

        return switch (fieldName) {
            case "age", "birth_year" -> generalizeAge(((数値) 値).intValue());
            case "郵便番号"、"郵便番号" -> generalizeZipCode(value.toString());
            case "生年月日" -> generalizeDate(value.toString());
            case "性別" -> 値; // 必要に応じて維持または抑制します
            デフォルト -> 値;
        };
    }

    /**
     * 年齢を 5 歳の範囲に一般化します。
     ※28→「25～29」、35→「35～39」、90→「90+」
     */
    private String generalizeAge(int age) {
        (年齢 > 89) の場合は「90+」を返します。
        int lowerBound = (年齢 / 5) * 5;
        return lowerBound + "-" + ( lowerBound + 4);
    }

    /**
     * 郵便番号を一般化します。
     ※「70000」→「700**」（先頭3桁）
     */
    private String generalizeZipCode(String zip) {
        if (zip.length() >= 3) {
            zip.substring(0, 3) + "**" を返します。
        }
        戻る "***";
    }

    /**
     * 日付を年に一般化します。
     */
    private String generalizeDate(String date) {
        if (date.length() >= 4) {
            date.substring(0, 4) を返します。 // 年のみを保持します
        }
        "****" を返します。
    }

    /**
     * データセットが k-匿名性に達していることを確認します。
     */
    public boolean verifyKAnonymity(
            リスト<Map<String, Object>> 記録、
            int k、
            リスト<String> 準識別子) {

        地図<String, Long> equivalenceClasses = records.stream()
            .collect(コレクター.groupingBy(
                レコード -> quasiIdentifiers.stream()
                    .map(qi -> String.valueOf(record.get(qi)))
                    .collect(Collectors.joining("|")),
                Collectors.counting()
            ));

        長い違反クラス = equivalenceClasses.values().stream()
            .filter(カウント -> カウント < k)
            .count();

        if (violatingClasses > 0) {
            LOG.warnf("K-匿名性違反: %d 個の等価クラスのレコード数は %d 未満です",
                違反クラス、k);
            false を返します。
        }

        true を返します。
    }

    /**
     * k より小さいグループのレコードを抑制 (削除) します。
     */
    プライベートリスト<Map<String, Object>> 抑制SmallGroups(
            リスト<Map<String, Object>> 記録、
            int k、
            リスト<String> 準識別子) {

        地図<String, List<Map<String, Object>>> グループ = レコード.ストリーム()
            .collect(コレクター.groupingBy(
                レコード -> quasiIdentifiers.stream()
                    .map(qi -> String.valueOf(record.get(qi)))
                    .collect(Collectors.joining("|"))
            ));

        groups.values().stream() を返す
            .filter(group -> group.size() >= k)
            . flatMap(コレクション::ストリーム)
            .collect(Collectors.toList());
    }
}
```

### 6.3. L-Diversity và T-Closeness

**L-Diversity**: Mở rộng k-anonymity — mỗi equivalence class phải chứa ít nhất **l** giá trị khác nhau của sensitive attribute. Ngăn chặn **homogeneity attack** (khi tất cả records trong 1 group có cùng diagnosis).

**T-Closeness**: Phân phối sensitive attribute trong mỗi equivalence class phải gần với phân phối tổng thể (khoảng cách ≤ t). Ngăn chặn **skewness attack**.

```

**K-匿名性 (k=3) — 脆弱性 (同質性攻撃):**

|年齢層 |診断 |
|----------|----------|
| 25-35 | HIV ← 全員がHIVに感染している！ |
| 25-35 | HIV ← 攻撃者は診断を知っている |
| 25-35 | HIV ← WHOがわからなくても |

**L-ダイバーシティ (l=3) — 保護中:**

|年齢層 |診断 |
|----------|----------|
| 25-35 |糖尿病 ← 3 つの異なる診断 |
| 25-35 |ハート ← 攻撃者は推測できない |
| 25-35 |風邪 ← どっちが対象 |

|方法 |から守る |弱点 |
|----------|-----------|----------|
| K-匿名性 |身元開示 |同質性攻撃 (同じ感度値) |
| L-ダイバーシティ |属性開示 |歪度攻撃（不均一分布） |
| T-親密度 |配布開示 |より複雑で実装が難しい |

## 7. 形式を保持した暗号化によるトークン化

＃＃＃７．１．トークン化アーキテクチャ

**フロー:**
- **オリジナルの SSN**: `079-123-456789`
- → **トークン化サービス** (フォーマット保持暗号化 - FPE)
  - **トークン**: `248-971-832145` (同じ形式、異なる値、キーで反転可能)
  - **Token Vault**: 暗号化マッピング トークン → オリジナル

**利点:**
- 同じ形式 → 既存システムで動作 (検証、UI)
- 可逆的 → 承認されたユーザーがトークン化を解除できる  
- 参照整合性 → 常に同じ SSN → 同じトークン

＃＃＃７．２． FPEトークン化サービス

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

## 8. 合成データの生成

### 8.1。テスト用の合成データ ジェネレーター

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

## 9. 匿名化 REST API

＃＃＃９．１． Quarkus REST エンドポイント

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

## 10. データマスキングパイプラインアーキテクチャ

### 10.1。完全なパイプライン

**データマスキングと匿名化パイプライン:**

1. **抽出** — `pg_dump --format=custom --compress=9` → 暗号化されたダンプファイル
2. **ステージングにロード** — `pg_restore` → ステージング データベース (隔離されたネットワーク、外部アクセスなし)
3. **マスキング ルールを適用します:**
   - 直接識別子 → 削除/置換
   - 準識別子 → 一般化
   - 日付 → ランダムなオフセットでシフト
   - フリーテキスト → NLP スクラブ
   - 検証: k-匿名性チェック
4. **検証:**
   - 実際の PHI が残っていない (正規表現スキャン)
   - 参照整合性の保持
   - 統計的特性が維持される
   - K-匿名性が検証済み (k ≥ 5)
5. **エクスポート** — `pg_dump staging` → マスクされたダンプ ファイル → 開発/テスト/研究データベースにロード
6. **クリーンアップ** — ステージング データベースを削除し、一時ファイルを安全に削除し、プロセス全体の監査ログを作成します

### 10.2。比較表

|方法 |リバーシブル |保存されたフォーマット |使用例 | HIPAA ステータス |
|----------|-----------|---------------|----------|---------------|
|セーフハーバー |いいえ |いいえ |研究、分析 |匿名化 (PHI ではない) |
|専門家の判断 |いいえ |部分的 |集団の健康 |匿名化 (PHI ではない) |
|動的マスキング (ビュー) |該当なし (ビューレベル) |はい |生産展示 |まだ PHI (アクセス制御) |
|静的マスキング |いいえ |部分的 |開発/テスト環境 |正しく行われた場合は PHI ではありません。
|トークン化 (FPE) |はい (鍵あり) |はい |支払い処理 |スティル PHI (リバーシブル) |
| K-匿名性 |いいえ |部分的 |データセットの共有 | k ≥ 5 | の場合は匿名化されます。
|合成データ | N/A (生成) |はい |テスト、トレーニング | PHI ではありません (実際のデータはありません) |
|暗号化 |はい (鍵あり) |いいえ |保管、輸送 |まだPHI |

## 概要

このレッスンでは、医療向けに包括的な **データ マスキング、匿名化、匿名化**を実装しました。

1. **HIPAA セーフ ハーバー メソッド**: 実装により、18 個の識別子すべてが削除され、臨床メモのテキスト スクラブ、日付の一般化 (年のみ、年齢が 89 歳を超える場合は抑制)
2. **専門家による判定方法**: 準識別子分析、再識別リスク評価フレームワーク
3. **動的データ マスキング**: PostgreSQL ビューの役割ベース (臨床、研究、請求)、マスキング機能、行レベルのセキュリティ
4. **静的データ マスキング**: 実稼働から開発へのパイプライン、SQL ベースのマスキング スクリプト、検証チェック
5. **K-匿名性**: 一般化と抑制を伴う実装。医療データセットの k ≥ 5 を検証します。
6. **L-多様性と T-近さ**: 概念と比較 — 均一性および歪度攻撃からの保護
7. **トークン化 (FPE)**: SSN、電話、MRN のフォーマットを保持したトークン化 — フォーマットを維持し、値を変更
8. **合成データ生成**: 開発/テスト用のベトナムの患者データ生成器 — 実質 PHI はゼロ
9. **匿名化 REST API**: セーフ ハーバー、トークン化、バッチ処理、合成データ用の Quarkus エンドポイント
10. **パイプライン アーキテクチャ**: 本番環境→ステージング→マスク→開発/テストのエンドツーエンドのマスキング パイプライン

## 演習

1. **セーフハーバーの実装**: プロジェクトに SafeHarborDeidentifier を実装します。 10 個のサンプルの PatientRecord オブジェクトを作成します。 10 件のレコードすべてを匿名化します。出力に名前、SSN、電話番号、電子メール、住所の詳細がないことを確認します。検証: 診断コード、薬剤、性別が保持されます。名前、SSN、日付を含む臨床メモを使用して deidentifyText() をテストします。

2. **PostgreSQL による動的マスキング**: PostgreSQL で 3 つのマスクされたビュー (臨床、研究、請求) を作成します。対応する 3 つのデータベース ロールを作成します。セッション変数を設定する `app.user_role` クエリの前に。確認: Research_view には名前、SSN、完全なアドレスが表示されません。確認: Clinical_view には名前が表示されますが、SSN はマスクされます。テスト行レベルのセキュリティ: 心臓病のユーザーは外科患者を診察できません。

3. **K-匿名性**: 準識別子 (年齢、郵便番号、性別) を持つ 100 件のレコードのデータセットを作成します。 k=5 で k-匿名性を実装します。検証: 各等価クラスには 5 つ以上のレコードがあります。データ ユーティリティの損失 (抑制されたレコードの数) を測定します。効用損失の観点から、k=3 と k=5 と k=10 を比較します。

4. **合成データ パイプライン**: SyntheticDataGenerator を実装します。 1000 人の合成患者を生成します。 CSV にエクスポートし、テスト データベースにインポートします。合成データを使用してアプリケーション テストを実行します。確認: 正規表現スキャン スクリプトを使用したテスト データベースに実際の PHI が存在しないことを確認します。

---

---

<!-- SERIES-NAV:START -->
| ◀ 前の記事 |次の記事 ▶ |
|:---|---:|
| [レッスン 18: OpenTelemetry と ELK スタックを使用した一元的な監査証跡](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-18-centralized-audit-trail-opentelemetry-elk) | [レッスン 20: 医療データのバックアップ、災害復旧、ビジネス継続性](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-20-backup-dr-business-continuity-du-lieu-y-te) |
<!-- SERIES-NAV:END -->
