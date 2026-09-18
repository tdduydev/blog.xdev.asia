---
id: 019c9617-fd50-7374-a2de-b2d2ddf46be9
title: Mã Hóa Dữ Liệu Healthcare
slug: ma-hoa-du-lieu-healthcare
excerpt: >-
  Làm thế nào để tìm kiếm trên dữ liệu đã mã hóa? Bài viết này trình bày 3
  approaches và implementation thực tế với Spring Boot + PostgreSQL để bảo vệ
  100,000+ patient records.
featured_image: /images/blog/ma-hoa-du-lieu-healthcare-featured.webp
type: blog
reading_time: 15
view_count: 2
meta: null
published_at: '2025-12-15T15:40:21.000000Z'
created_at: '2026-02-25T18:38:00.000000Z'
author:
  id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf
  name: Duy Tran
  avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg
category:
  id: 019c9617-faae-7034-a12e-2330c5c73492
  name: Database
  slug: database
tags:
  - name: postgresql
    slug: postgresql
  - name: security
    slug: security
  - name: java
    slug: java
  - name: Spring Boot
    slug: spring-boot
  - name: AES-256
    slug: aes-256
  - name: encryption
    slug: encryption
  - name: Healthcare
    slug: healthcare
  - name: HIPAA
    slug: hipaa
  - name: PII
    slug: pii
  - name: PHI
    slug: phi
comments: []
---
<p>Repo cho các bạn tham khảo <a href="https://github.com/xdev-asia-labs/healthcare-pii-protection-patterns" rel="noreferrer">code tại đây</a></p><p><strong>Key Takeaways:</strong></p><ul><li>❌ AES-GCM với random IV → Không search được</li><li>✅ Searchable Hash Index → Search chính xác (exact match)</li><li>✅ Tokenization + Hashing → Search từng phần (partial match)</li></ul><hr><h2 id="1-th%C3%A1ch-th%E1%BB%A9c-encryption-vs-searchability">1. Thách Thức: Encryption vs Searchability</h2><h3 id="11-v%E1%BA%A5n-%C4%91%E1%BB%81">1.1 Vấn đề</h3><p>Healthcare applications cần lưu trữ <strong>PII (Personally Identifiable Information)</strong>:</p><ul><li>CMND/CCCD (National ID)</li><li>Số điện thoại</li><li>Họ tên</li><li>Địa chỉ</li></ul><p>Đây là những thông tin nhạy cảm thuộc nhóm <strong>PHI (Protected Health Information)</strong> theo tiêu chuẩn HIPAA.</p><p><strong>Yêu cầu mâu thuẫn:</strong></p><ol><li>🔒 <strong>Security</strong>: Data phải encrypted at-rest (HIPAA, GDPR compliance)</li><li>🔍 <strong>Usability</strong>: User cần search "Nguyễn Văn A", "Trần", etc.</li></ol><h3 id="12-t%E1%BA%A1i-sao-standard-encryption-kh%C3%B4ng-ho%E1%BA%A1t-%C4%91%E1%BB%99ng">1.2 Tại sao Standard Encryption không hoạt động?</h3><pre><code class="language-java">// AES-256-GCM với random IV
encrypt("Nguyễn Văn A") → "xK9L2m..."  // Lần 1
encrypt("Nguyễn Văn A") → "pQ3N7r..."  // Lần 2 - KHÁC!

// SQL query không hoạt động
WHERE encrypted_name = encrypt("Nguyễn Văn A")  // ❌ Fail!
</code></pre><p><strong>Random IV</strong> = high security nhưng <strong>impossible to search</strong>. Mỗi lần mã hóa cùng một giá trị sẽ cho kết quả khác nhau, đảm bảo semantic security nhưng không thể so sánh trực tiếp.</p><hr><h2 id="2-ki%E1%BA%BFn-tr%C3%BAc-b%E1%BA%A3o-m%E1%BA%ADt-nhi%E1%BB%81u-l%E1%BB%9Bp">2. Kiến Trúc Bảo Mật Nhiều Lớp</h2><p>Một hệ thống healthcare cần bảo vệ dữ liệu ở nhiều tầng:</p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Layer</th>
<th>Công nghệ</th>
<th>Mục đích</th>
</tr>
</thead>
<tbody>
<tr>
<td>Client Layer</td>
<td>TLS 1.3 (HTTPS)</td>
<td>Mã hóa khi truyền tải</td>
</tr>
<tr>
<td>Application Layer</td>
<td>AES-256-GCM, JPA Converter</td>
<td>Mã hóa field-level</td>
</tr>
<tr>
<td>Database Layer</td>
<td>pgcrypto, RLS</td>
<td>Row Level Security</td>
</tr>
<tr>
<td>Storage Layer</td>
<td>TDE, LUKS</td>
<td>Full disk encryption</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/227880af-b30a-4869-9151-6d62a4934004-1-201-a-6c589a5e.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">Kiến Trúc Bảo Mật Nhiều Lớp</span></figcaption></figure><hr><h2 id="3-solution-1-searchable-hash-index">3. Solution 1: Searchable Hash Index</h2><h3 id="31-%C3%BD-t%C6%B0%E1%BB%9Fng">3.1 Ý tưởng</h3><ul><li><strong>Encrypt</strong> data với AES-256-GCM (secure với random IV)</li><li>Tạo <strong>deterministic hash</strong> cho search (HMAC-SHA256)</li><li>Lưu cả hai: encrypted value + search hash</li></ul><h3 id="32-database-schema">3.2 Database Schema</h3><pre><code class="language-sql">CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_code VARCHAR(20) UNIQUE NOT NULL,
    
    -- PII (mã hóa ở Application Layer)
    encrypted_national_id BYTEA NOT NULL,
    encrypted_phone BYTEA,
    encrypted_full_name BYTEA NOT NULL,
    
    -- Hash để tìm kiếm (HMAC-SHA256)
    national_id_hash VARCHAR(64) UNIQUE NOT NULL,
    phone_hash VARCHAR(64),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_national_id_hash ON patients(national_id_hash);
</code></pre><h3 id="33-spring-boot-entity">3.3 Spring Boot Entity</h3><pre><code class="language-java">@Entity
@Table(name = "patients")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Convert(converter = EncryptedStringConverter.class)
    @Column(name = "national_id")
    private String nationalId;
    
    // Search hash (deterministic)
    @Column(name = "national_id_hash", unique = true)
    private String nationalIdHash;
}
</code></pre><h3 id="34-aes-256-gcm-encryption-service">3.4 AES-256-GCM Encryption Service</h3><pre><code class="language-java">@Service
public class AesEncryptionService {
    private static final String ALGORITHM = "AES/GCM/NoPadding";
    private static final int GCM_IV_LENGTH = 12;
    private static final int GCM_TAG_LENGTH = 128;
    
    private final SecretKey secretKey;
    
    public AesEncryptionService(@Value("${app.encryption.key}") String key) {
        byte[] keyBytes = Base64.getDecoder().decode(key);
        this.secretKey = new SecretKeySpec(keyBytes, "AES");
    }
    
    public String encrypt(String plaintext) {
        try {
            byte[] iv = new byte[GCM_IV_LENGTH];
            new SecureRandom().nextBytes(iv);
            
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, secretKey, 
                new GCMParameterSpec(GCM_TAG_LENGTH, iv));
            
            byte[] encrypted = cipher.doFinal(
                plaintext.getBytes(StandardCharsets.UTF_8));
            byte[] combined = new byte[iv.length + encrypted.length];
            System.arraycopy(iv, 0, combined, 0, iv.length);
            System.arraycopy(encrypted, 0, combined, iv.length, 
                encrypted.length);
            
            return Base64.getEncoder().encodeToString(combined);
        } catch (Exception e) {
            throw new EncryptionException("Encryption failed", e);
        }
    }
    
    public String decrypt(String ciphertext) {
        try {
            byte[] combined = Base64.getDecoder().decode(ciphertext);
            byte[] iv = Arrays.copyOfRange(combined, 0, GCM_IV_LENGTH);
            byte[] encrypted = Arrays.copyOfRange(combined, 
                GCM_IV_LENGTH, combined.length);
            
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, secretKey, 
                new GCMParameterSpec(GCM_TAG_LENGTH, iv));
            
            return new String(cipher.doFinal(encrypted), 
                StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new EncryptionException("Decryption failed", e);
        }
    }
}
</code></pre><h3 id="35-jpa-attributeconverter">3.5 JPA AttributeConverter</h3><pre><code class="language-java">@Converter
public class EncryptedStringConverter implements AttributeConverter&lt;String, String&gt; {
    
    private static AesEncryptionService encryptionService;
    
    @Autowired
    public void setEncryptionService(AesEncryptionService service) {
        EncryptedStringConverter.encryptionService = service;
    }
    
    @Override
    public String convertToDatabaseColumn(String attribute) {
        if (attribute == null) return null;
        return encryptionService.encrypt(attribute);
    }
    
    @Override
    public String convertToEntityAttribute(String dbData) {
        if (dbData == null) return null;
        return encryptionService.decrypt(dbData);
    }
}
</code></pre><h3 id="36-%C6%B0u-v%C3%A0-nh%C6%B0%E1%BB%A3c-%C4%91i%E1%BB%83m">3.6 Ưu và Nhược điểm</h3><p><strong>✅ Ưu điểm:</strong></p><ul><li>Very secure (encrypted + hashed)</li><li>Fast lookup (indexed hash)</li><li>Simple implementation</li></ul><p><strong>❌ Nhược điểm:</strong></p><ul><li>Chỉ exact match (không search "079*")</li><li>Cần separate hash column cho mỗi searchable field</li></ul><hr><h2 id="4-solution-2-tokenization-search-index">4. Solution 2: Tokenization + Search Index</h2><h3 id="41-v%E1%BA%A5n-%C4%91%E1%BB%81-v%E1%BB%9Bi-names">4.1 Vấn đề với Names</h3><p>Không thể dùng exact hash cho họ tên vì user có thể search:</p><ul><li>"Trần" (họ - partial)</li><li>"Van" (tên đệm)</li><li>"Nguyen Van A" (full name)</li></ul><h3 id="42-gi%E1%BA%A3i-ph%C3%A1p-tokenized-hashing">4.2 Giải pháp: Tokenized Hashing</h3><p>Hash từng word riêng biệt và lưu vào PostgreSQL array:</p><pre><code>Input: "Nguyễn Văn A"
   ↓ 1. Remove diacritics
"nguyen van a"
   ↓ 2. Tokenize
["nguyen", "van", "a", "nguyenvana"]
   ↓ 3. Hash each token
[hash("nguyen"), hash("van"), hash("a"), hash("nguyenvana")]
   ↓ 4. Store in PostgreSQL array
fullNameTokens: TEXT[]
</code></pre><h3 id="43-vietnamese-text-processing">4.3 Vietnamese Text Processing</h3><pre><code class="language-java">public class VietnameseTextUtils {
    public static String removeDiacritics(String text) {
        String normalized = text.toLowerCase();
        
        // Replace đ/Đ
        normalized = normalized.replace('đ', 'd')
                               .replace('Đ', 'd');
        
        // Remove diacritical marks
        normalized = Normalizer.normalize(
            normalized, Normalizer.Form.NFD);
        normalized = normalized.replaceAll("\\p{M}", "");
        
        return normalized.trim();
    }
}
</code></pre><h3 id="44-token-generation-service">4.4 Token Generation Service</h3><pre><code class="language-java">@Service
public class SearchableEncryptionService {
    
    private final String hmacKey;
    
    public String[] generateSearchTokens(String text) {
        // 1. Normalize
        String normalized = VietnameseTextUtils.removeDiacritics(text);
        
        // 2. Split into words
        String[] words = normalized.split("\\s+");
        
        // 3. Create token set
        Set&lt;String&gt; tokens = new HashSet&lt;&gt;(Arrays.asList(words));
        
        // 4. Add full string (for exact match)
        tokens.add(normalized.replace(" ", ""));
        
        // 5. Hash each token
        return tokens.stream()
                .map(this::hmacSha256)
                .toArray(String[]::new);
    }
    
    private String hmacSha256(String data) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec keySpec = new SecretKeySpec(
                hmacKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(keySpec);
            byte[] hash = mac.doFinal(
                data.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            throw new RuntimeException("HMAC failed", e);
        }
    }
}
</code></pre><h3 id="45-database-schema-v%E1%BB%9Bi-gin-index">4.5 Database Schema với GIN Index</h3><pre><code class="language-sql">CREATE TABLE patients (
    id UUID PRIMARY KEY,
    full_name TEXT,           -- AES-256-GCM encrypted
    full_name_tokens TEXT[],  -- Hashed search tokens
    ...
);

-- GIN index for array search
CREATE INDEX idx_full_name_tokens 
ON patients USING GIN(full_name_tokens);
</code></pre><h3 id="46-search-query">4.6 Search Query</h3><pre><code class="language-java">@Repository
public interface PatientRepository extends JpaRepository&lt;Patient, UUID&gt; {
    
    @Query("SELECT p FROM Patient p WHERE :token = ANY(p.fullNameTokens)")
    Page&lt;Patient&gt; findByFullNameTokensContaining(
        @Param("token") String hashedToken, 
        Pageable pageable
    );
}
</code></pre><h3 id="47-search-service">4.7 Search Service</h3><pre><code class="language-java">@Service
public class PatientSearchService {
    
    @Autowired
    private SearchableEncryptionService searchableService;
    
    @Autowired
    private PatientRepository patientRepository;
    
    public Page&lt;Patient&gt; searchPatients(String query, int page, int size) {
        // 1. Normalize search query
        String normalized = VietnameseTextUtils.removeDiacritics(query);
        
        // 2. Hash the normalized query
        String hashedToken = searchableService.hmacSha256(normalized);
        
        // 3. Search using hashed token
        return patientRepository.findByFullNameTokensContaining(
            hashedToken, 
            PageRequest.of(page, size)
        );
    }
}
</code></pre><hr><h2 id="5-postgresql-1718t%C3%ADnh-n%C4%83ng-m%E1%BB%9Bi">5. PostgreSQL 17/18 - Tính năng Mới</h2><p>PostgreSQL 18 (phát hành 25/09/2025) mang đến nhiều cải tiến quan trọng về bảo mật:</p><h3 id="51-c%E1%BA%A3i-ti%E1%BA%BFn-pgcrypto">5.1 Cải tiến pgcrypto</h3><pre><code class="language-sql">-- PostgreSQL 18 hỗ trợ SHA-2 cho password hashing
SELECT sha256crypt('password', gen_salt('sha256'));
SELECT sha512crypt('password', gen_salt('sha512'));

-- Hỗ trợ CFB mode cho AES
SELECT encrypt('sensitive data'::bytea, 'key'::bytea, 'aes-cfb');
</code></pre><h3 id="52-oauth-20-native-support">5.2 OAuth 2.0 Native Support</h3><p>PostgreSQL 18 hỗ trợ OAuth 2.0 trong core, tích hợp với Keycloak, Okta, Azure AD:</p><pre><code># pg_hba.conf - PostgreSQL 18
host all all 0.0.0.0/0 oauth \
    issuer="https://keycloak.example.com/realms/myrealm" \
    scope="openid"
</code></pre><h3 id="53-md5-deprecation">5.3 MD5 Deprecation</h3><p>⚠️ <strong>Cảnh báo:</strong> MD5 authentication đã bị deprecated trong PostgreSQL 18.</p><pre><code class="language-sql">-- Chuyển sang SCRAM-SHA-256
ALTER ROLE myuser PASSWORD 'newpassword';

-- Password nên bắt đầu với 'SCRAM-SHA-256$'
</code></pre><pre><code># pg_hba.conf - Sử dụng SCRAM thay MD5
host all all 0.0.0.0/0 scram-sha-256
</code></pre><h3 id="54-so-s%C3%A1nh-phi%C3%AAn-b%E1%BA%A3n">5.4 So sánh Phiên bản</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Feature</th>
<th>PG 15</th>
<th>PG 17</th>
<th>PG 18</th>
</tr>
</thead>
<tbody>
<tr>
<td>pgcrypto SHA-2</td>
<td>❌</td>
<td>⚠️</td>
<td>✅</td>
</tr>
<tr>
<td>OAuth 2.0 native</td>
<td>❌</td>
<td>❌</td>
<td>✅</td>
</tr>
<tr>
<td>FIPS mode function</td>
<td>❌</td>
<td>⚠️</td>
<td>✅</td>
</tr>
<tr>
<td>TLS 1.3 cipher config</td>
<td>❌</td>
<td>❌</td>
<td>✅</td>
</tr>
<tr>
<td>SCRAM for dblink</td>
<td>❌</td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td>Direct TLS</td>
<td>❌</td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td>Incremental backup</td>
<td>❌</td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td>MD5 deprecated</td>
<td>❌</td>
<td>❌</td>
<td>✅</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<hr><h2 id="6-trade-offs-analysis">6. Trade-offs Analysis</h2>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Approach</th>
<th>Searchability</th>
<th>Security</th>
<th>Performance</th>
<th>Complexity</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Standard Encryption</strong></td>
<td>❌ None</td>
<td>⭐⭐⭐⭐⭐</td>
<td>⭐⭐⭐⭐⭐</td>
<td>⭐ Simple</td>
</tr>
<tr>
<td><strong>Hash Index</strong></td>
<td>⚠️ Exact only</td>
<td>⭐⭐⭐⭐</td>
<td>⭐⭐⭐⭐⭐</td>
<td>⭐⭐ Easy</td>
</tr>
<tr>
<td><strong>Tokenization</strong></td>
<td>✅ Partial match</td>
<td>⭐⭐⭐</td>
<td>⭐⭐⭐⭐</td>
<td>⭐⭐⭐⭐ Complex</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="61-khi-n%C3%A0o-d%C3%B9ng-hash-index">6.1 Khi nào dùng Hash Index?</h3><ul><li>National ID, SSN, Tax ID</li><li>Credit card numbers</li><li>Existing exact identifiers</li></ul><h3 id="62-khi-n%C3%A0o-d%C3%B9ng-tokenization">6.2 Khi nào dùng Tokenization?</h3><ul><li>Names (full name, first/last)</li><li>Addresses</li><li>Free-text fields</li></ul><hr><h2 id="7-real-world-results">7. Real-World Results</h2><h3 id="71-test-setup">7.1 Test Setup</h3><ul><li><strong>Dataset</strong>: 10,000 Vietnamese patients</li><li><strong>Database</strong>: PostgreSQL 18</li><li><strong>Encryption</strong>: AES-256-GCM</li><li><strong>Backend</strong>: Spring Boot 3.4</li></ul><h3 id="72-performance-metrics">7.2 Performance Metrics</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Operation</th>
<th>Time</th>
<th>Notes</th>
</tr>
</thead>
<tbody>
<tr>
<td>Create patient</td>
<td>~6ms</td>
<td>Including encryption + tokenization</td>
</tr>
<tr>
<td>Search "Trần"</td>
<td>~300ms</td>
<td>6,092 matches from 10K records</td>
</tr>
<tr>
<td>Search "Văn"</td>
<td>~250ms</td>
<td>~7K matches</td>
</tr>
<tr>
<td>Exact ID lookup</td>
<td>~2ms</td>
<td>Using hash index</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="73-security-summary">7.3 Security Summary</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>Aspect</th>
<th>Implementation</th>
<th>Benefits</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Encryption at Rest</strong></td>
<td>AES-256-GCM + random IV</td>
<td>FIPS 140-2 compliant</td>
</tr>
<tr>
<td><strong>Searchability</strong></td>
<td>HMAC-SHA256 hash index</td>
<td>Fast O(1) lookup</td>
</tr>
<tr>
<td><strong>Transparency</strong></td>
<td>JPA AttributeConverter</td>
<td>Zero code change</td>
</tr>
<tr>
<td><strong>Compliance</strong></td>
<td>HIPAA, GDPR ready</td>
<td>Audit trail, crypto shredding</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="74-performance-characteristics">7.4 Performance Characteristics</h3><ul><li><strong>Encryption overhead</strong>: ~2-5% CPU</li><li><strong>Search speed</strong>: Same as plaintext (indexed hash)</li><li><strong>Storage overhead</strong>: ~30% (Base64 encoding)</li><li><strong>Throughput</strong>: 10K+ ops/sec</li></ul><hr><h2 id="8-production-checklist">8. Production Checklist</h2><ol><li>☐ Key management (use KMS, not hardcoded)</li><li>☐ Separate encryption &amp; hashing keys</li><li>☐ Audit logging for all PHI access</li><li>☐ Index performance monitoring</li><li>☐ Backup encryption keys securely</li><li>☐ Document search limitations for users</li><li>☐ Migrate MD5 → SCRAM-SHA-256 (PostgreSQL 18)</li><li>☐ Enable TLS 1.3 for database connections</li></ol><h3 id="81-configuration-example">8.1 Configuration Example</h3><pre><code class="language-yaml"># application.yml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/healthcare?sslmode=require
    hikari:
      ssl-mode: require

app:
  encryption:
    key: ${ENCRYPTION_KEY}      # From KMS/Vault
    algorithm: AES/GCM/NoPadding
  hashing:
    key: ${HMAC_KEY}            # Separate key for hashing
</code></pre><h3 id="82-key-management-v%E1%BB%9Bi-aws-kms">8.2 Key Management với AWS KMS</h3><pre><code class="language-java">@Configuration
public class KmsConfig {
    @Bean
    public KmsClient kmsClient() {
        return KmsClient.builder()
            .region(Region.AP_SOUTHEAST_1)
            .build();
    }
    
    @Bean
    public SecretKey dataEncryptionKey(KmsClient kmsClient, 
            @Value("${aws.kms.key-id}") String keyId) {
        GenerateDataKeyRequest request = GenerateDataKeyRequest.builder()
            .keyId(keyId)
            .keySpec(DataKeySpec.AES_256)
            .build();
        
        GenerateDataKeyResponse response = kmsClient.generateDataKey(request);
        return new SecretKeySpec(
            response.plaintext().asByteArray(), "AES");
    }
}
</code></pre><hr><h2 id="9-k%E1%BA%BFt-lu%E1%BA%ADn">9. Kết Luận</h2><h3 id="key-insights">Key Insights</h3><ol><li><strong>No silver bullet</strong>: Encryption vs search là fundamental tradeoff</li><li><strong>Hybrid approach works best</strong>:<ul><li>High-risk fields → encrypted + hash</li><li>Names → tokenization</li><li>Metadata → plaintext with access control</li></ul></li><li><strong>Complexity has cost</strong>: Only add if truly needed</li></ol><h3 id="khi-n%C3%A0o-d%C3%B9ng-tokenization">Khi nào dùng tokenization?</h3><ul><li>✅ Healthcare (patient names)</li><li>✅ Finance (customer search)</li><li>✅ E-commerce (user profiles)</li></ul><h3 id="khi-n%C3%A0o-skip">Khi nào skip?</h3><ul><li>❌ Internal tools (use access control)</li><li>❌ Public data</li><li>❌ Non-production environments</li></ul><h3 id="best-practices">Best Practices</h3><ol><li>✅ <strong>Use hybrid approach</strong> cho searchable fields</li><li>✅ <strong>Index hash columns</strong> for performance</li><li>✅ <strong>Separate keys</strong> cho encryption vs hashing</li><li>✅ <strong>Rotate keys</strong> periodically</li><li>✅ <strong>Audit</strong> all decryption operations</li><li>✅ <strong>Never log</strong> decrypted PII/PHI</li></ol><hr><h2 id="t%C3%A0i-li%E1%BB%87u-tham-kh%E1%BA%A3o">Tài liệu tham khảo</h2><ul><li><a href="https://www.postgresql.org/docs/18/release-18.html">PostgreSQL 18 Release Notes</a></li><li><a href="https://www.postgresql.org/docs/17/release-17.html">PostgreSQL 17 Release Notes</a></li><li><a href="https://nvlpubs.nist.gov/nistpubs/ir/2017/NIST.IR.8011-1.pdf">NIST Searchable Encryption</a></li><li><a href="https://people.csail.mit.edu/nickolai/papers/raluca-cryptdb.pdf">CryptDB Paper</a></li></ul>
