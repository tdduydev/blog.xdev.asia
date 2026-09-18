---
id: 019c9617-fd50-7374-a2de-b2d2ddf46be9
title: 醫療保健資料加密
slug: ma-hoa-du-lieu-healthcare
excerpt: '如何搜尋加密資料？本文介紹了使用 Spring Boot + PostgreSQL 來保護 100,000 多筆病患記錄的 3 種實用方法和實作。'
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
  name: 資料庫
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
locale: zh-tw
---
<p>回購供您參考 <a href="https://github.com/xdev-asia-labs/healthcare-pii-protection-patterns" rel="noreferrer">代碼在這裡</a></p><p><strong>要點：</strong></p><ul><li>❌ 具有隨機 IV 的 AES-GCM → 無法搜尋</li><li>✅ 可搜尋的雜湊索引→精確搜尋（精確匹配）</li><li>✅ 標記化+哈希→部分匹配</li></ul><hr><h2 id="1-th%C3%A1ch-th%E1%BB%A9c-encryption-vs-searchability">1. 挑戰：加密與可搜尋性</h2><h3 id="11-v%E1%BA%A5n-%C4%91%E1%BB%81">1.1 問題</h3><p>醫療保健應用程式需要存儲 <strong>PII（個人識別資訊）</strong>:</p><ul><li>身分證/CCCD（國民身分證）</li><li>電話號碼</li><li>全名</li><li>地址</li></ul><p>這是群組敏感訊息 <strong>PHI（受保護的健康資訊）</strong> 根據 HIPAA 標準。</p><p><strong>衝突的要求：</strong></p><ol><li>🔒 <strong>安全性</strong>：資料必須靜態加密（HIPAA、GDPR 合規性）</li><li>🔍 <strong>可用性</strong>：用戶需要搜尋「Nguyen Van A」、「Tran」等。</li></ol><h3 id="12-t%E1%BA%A1i-sao-standard-encryption-kh%C3%B4ng-ho%E1%BA%A1t-%C4%91%E1%BB%99ng">1.2 為什麼標準加密不起作用？</h3><pre><code class="language-java">// AES-256-GCM với random IV
encrypt("Nguyễn Văn A") → "xK9L2m..."  // Lần 1
encrypt("Nguyễn Văn A") → "pQ3N7r..."  // Lần 2 - KHÁC!

// SQL query không hoạt động
WHERE encrypted_name = encrypt("Nguyễn Văn A")  // ❌ Fail!
</code></pre><p><strong>隨機IV</strong> = 高安全性但是 <strong>無法搜尋</strong>。每次編碼相同的值都會給出不同的結果，保證了語意安全，但不能直接比較。</p><hr><h2 id="2-ki%E1%BA%BFn-tr%C3%BAc-b%E1%BA%A3o-m%E1%BA%ADt-nhi%E1%BB%81u-l%E1%BB%9Bp">2. 多層安全架構</h2><p>醫療保健系統需要在多個層面上保護資料：</p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>圖層</th>
<th>科技</th>
<th>目的</th>
</tr>
</thead>
<tbody>
<tr>
<td>客戶端層</td>
<td>TLS 1.3 (HTTPS)</td>
<td>傳輸過程中加密</td>
</tr>
<tr>
<td>應用層</td>
<td>AES-256-GCM、JPA 轉換器</td>
<td>字段級加密</td>
</tr>
<tr>
<td>資料庫層</td>
<td>pgcrypto、RLS</td>
<td>行級安全性</td>
</tr>
<tr>
<td>儲存層</td>
<td>TDE、盧克斯</td>
<td>全碟加密</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/227880af-b30a-4869-9151-6d62a4934004-1-201-a-6c589a5e.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">多層安全架構</span></figcaption></figure><hr><h2 id="3-solution-1-searchable-hash-index">3.方案一：可搜尋哈希索引</h2><h3 id="31-%C3%BD-t%C6%B0%E1%BB%9Fng">3.1 思路</h3><ul><li><strong>加密</strong> 使用 AES-256-GCM 的資料（透過隨機 IV 進行安全保護）</li><li>創建 <strong>確定性哈希</strong> 用於搜尋（HMAC-SHA256）</li><li>保存兩者：加密值+搜尋哈希</li></ul><h3 id="32-database-schema">3.2 資料庫架構</h3><pre><code class="language-sql">CREATE TABLE patients (
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
</code></pre><h3 id="33-spring-boot-entity">3.3 Spring Boot實體</h3><pre><code class="language-java">@Entity
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
</code></pre><h3 id="34-aes-256-gcm-encryption-service">3.4 AES-256-GCM 加密服務</h3><pre><code class="language-java">@Service
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
</code></pre><h3 id="35-jpa-attributeconverter">3.5 JPA屬性轉換器</h3><pre><code class="language-java">@Converter
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
</code></pre><h3 id="36-%C6%B0u-v%C3%A0-nh%C6%B0%E1%BB%A3c-%C4%91i%E1%BB%83m">3.6 優點和缺點</h3><p><strong>✅ 優點：</strong></p><ul><li>非常安全（加密+雜湊）</li><li>快速尋找（索引哈希）</li><li>實施簡單</li></ul><p><strong>❌缺點：</strong></p><ul><li>僅精確匹配（不搜尋“079*”）</li><li>每個可搜尋字段需要單獨的哈希列</li></ul><hr><h2 id="4-solution-2-tokenization-search-index">4. 方案二：通證化+搜尋索引</h2><h3 id="41-v%E1%BA%A5n-%C4%91%E1%BB%81-v%E1%BB%9Bi-names">4.1 名稱問題</h3><p>無法對全名使用精確的雜湊值，因為使用者可以搜尋：</p><ul><li>「Tran」（姓 - 部分）</li><li>「範」（中間名）</li><li>「阮文A」（全名）</li></ul><h3 id="42-gi%E1%BA%A3i-ph%C3%A1p-tokenized-hashing">4.2 解決方案：代幣化哈希</h3><p>分別對每個單字進行雜湊處理並將其儲存到 PostgreSQL 陣列中：</p><pre><code>Input: "Nguyễn Văn A"
   ↓ 1. Remove diacritics
"nguyen van a"
   ↓ 2. Tokenize
["nguyen", "van", "a", "nguyenvana"]
   ↓ 3. Hash each token
[hash("nguyen"), hash("van"), hash("a"), hash("nguyenvana")]
   ↓ 4. Store in PostgreSQL array
fullNameTokens: TEXT[]
</code></pre><h3 id="43-vietnamese-text-processing">4.3 越南文處理</h3><pre><code class="language-java">public class VietnameseTextUtils {
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
</code></pre><h3 id="44-token-generation-service">4.4 代幣生成服務</h3><pre><code class="language-java">@Service
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
</code></pre><h3 id="45-database-schema-v%E1%BB%9Bi-gin-index">4.5 帶有 GIN 索引的資料庫模式</h3><pre><code class="language-sql">CREATE TABLE patients (
    id UUID PRIMARY KEY,
    full_name TEXT,           -- AES-256-GCM encrypted
    full_name_tokens TEXT[],  -- Hashed search tokens
    ...
);

-- GIN index for array search
CREATE INDEX idx_full_name_tokens 
ON patients USING GIN(full_name_tokens);
</code></pre><h3 id="46-search-query">4.6 搜尋查詢</h3><pre><code class="language-java">@Repository
public interface PatientRepository extends JpaRepository&lt;Patient, UUID&gt; {
    
    @Query("SELECT p FROM Patient p WHERE :token = ANY(p.fullNameTokens)")
    Page&lt;Patient&gt; findByFullNameTokensContaining(
        @Param("token") String hashedToken, 
        Pageable pageable
    );
}
</code></pre><h3 id="47-search-service">4.7 搜尋服務</h3><pre><code class="language-java">@Service
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
</code></pre><hr><h2 id="5-postgresql-1718t%C3%ADnh-n%C4%83ng-m%E1%BB%9Bi">5.PostgreSQL 17/18 - 新功能</h2><p>PostgreSQL 18（2025 年 9 月 25 日發布）帶來了許多重要的安全性改進：</p><h3 id="51-c%E1%BA%A3i-ti%E1%BA%BFn-pgcrypto">5.1 pgcrypto 的改進</h3><pre><code class="language-sql">-- PostgreSQL 18 hỗ trợ SHA-2 cho password hashing
SELECT sha256crypt('password', gen_salt('sha256'));
SELECT sha512crypt('password', gen_salt('sha512'));

-- Hỗ trợ CFB mode cho AES
SELECT encrypt('sensitive data'::bytea, 'key'::bytea, 'aes-cfb');
</code></pre><h3 id="52-oauth-20-native-support">5.2 OAuth 2.0 原生支持</h3><p>PostgreSQL 18 核心支援 OAuth 2.0，與 Keycloak、Okta、Azure AD 整合：</p><pre><code># pg_hba.conf - PostgreSQL 18
host all all 0.0.0.0/0 oauth \
    issuer="https://keycloak.example.com/realms/myrealm" \
    scope="openid"
</code></pre><h3 id="53-md5-deprecation">5.3 MD5 棄用</h3><p>⚠️ <strong>警告：</strong> MD5 驗證已在 PostgreSQL 18 中棄用。</p><pre><code class="language-sql">-- Chuyển sang SCRAM-SHA-256
ALTER ROLE myuser PASSWORD 'newpassword';

-- Password nên bắt đầu với 'SCRAM-SHA-256$'
</code></pre><pre><code># pg_hba.conf - Sử dụng SCRAM thay MD5
host all all 0.0.0.0/0 scram-sha-256
</code></pre><h3 id="54-so-s%C3%A1nh-phi%C3%AAn-b%E1%BA%A3n">5.4 版本對比</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>特點</th>
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
<td>OAuth 2.0 本機</td>
<td>❌</td>
<td>❌</td>
<td>✅</td>
</tr>
<tr>
<td>FIPS模式功能</td>
<td>❌</td>
<td>⚠️</td>
<td>✅</td>
</tr>
<tr>
<td>TLS 1.3 密碼配置</td>
<td>❌</td>
<td>❌</td>
<td>✅</td>
</tr>
<tr>
<td>dblink 的 SCRAM</td>
<td>❌</td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td>直接傳輸層安全</td>
<td>❌</td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td>增量備份</td>
<td>❌</td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td>MD5 已棄用</td>
<td>❌</td>
<td>❌</td>
<td>✅</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<hr><h2 id="6-trade-offs-analysis">6. 權衡分析</h2>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>方法</th>
<th>可搜尋性</th>
<th>安全性</th>
<th>效能</th>
<th>複雜性</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>標準加密</strong></td>
<td>❌無</td>
<td>⭐⭐⭐⭐⭐</td>
<td>⭐⭐⭐⭐⭐</td>
<td>⭐ 簡單</td>
</tr>
<tr>
<td><strong>哈希索引</strong></td>
<td>⚠️僅準確</td>
<td>⭐⭐⭐⭐</td>
<td>⭐⭐⭐⭐⭐</td>
<td>⭐⭐ 簡單</td>
</tr>
<tr>
<td><strong>代幣化</strong></td>
<td>✅ 部分匹配</td>
<td>⭐⭐⭐</td>
<td>⭐⭐⭐⭐</td>
<td>⭐⭐⭐⭐ 綜合體</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="61-khi-n%C3%A0o-d%C3%B9ng-hash-index">6.1 什麼時候使用哈希索引？</h3><ul><li>國民身分證、社會安全號碼、稅號</li><li>信用卡號碼</li><li>現有的確切標識符</li></ul><h3 id="62-khi-n%C3%A0o-d%C3%B9ng-tokenization">6.2 何時使用標記化？</h3><ul><li>姓名（全名、名字/姓氏）</li><li>地址</li><li>自由文字字段</li></ul><hr><h2 id="7-real-world-results">7. 實際結果</h2><h3 id="71-test-setup">7.1 測試設置</h3><ul><li><strong>數據集</strong>： 10,000 名越南患者</li><li><strong>資料庫</strong>： PostgreSQL 18</li><li><strong>加密</strong>：AES-256-GCM</li><li><strong>後端</strong>：春季啟動3.4</li></ul><h3 id="72-performance-metrics">7.2 性能指標</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>操作</th>
<th>時間</th>
<th>註解</th>
</tr>
</thead>
<tbody>
<tr>
<td>創建病人</td>
<td>〜6毫秒</td>
<td>包括加密+標記化</td>
</tr>
<tr>
<td>搜尋“特蘭”</td>
<td>〜300毫秒</td>
<td>10K 筆記錄中的 6,092 筆匹配項</td>
</tr>
<tr>
<td>搜尋“文學”</td>
<td>〜250毫秒</td>
<td>~7K 場比賽</td>
</tr>
<tr>
<td>精確ID查找</td>
<td>〜2毫秒</td>
<td>使用哈希索引</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="73-security-summary">7.3 安全總結</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>方面</th>
<th>實施</th>
<th>好處</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>靜態加密</strong></td>
<td>AES-256-GCM + 隨機 IV</td>
<td>符合 FIPS 140-2 標準</td>
</tr>
<tr>
<td><strong>可搜尋性</strong></td>
<td>HMAC-SHA256 哈希索引</td>
<td>快速 O(1) 查找</td>
</tr>
<tr>
<td><strong>透明度</strong></td>
<td>JPA 屬性轉換器</td>
<td>零程式碼更改</td>
</tr>
<tr>
<td><strong>合規性</strong></td>
<td>HIPAA、GDPR 就緒</td>
<td>審計追蹤、加密粉碎</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="74-performance-characteristics">7.4 性能特點</h3><ul><li><strong>加密開銷</strong>：~2-5% CPU</li><li><strong>搜尋速度</strong>：與明文相同（索引哈希）</li><li><strong>儲存開銷</strong>：~30%（Base64 編碼）</li><li><strong>吞吐量</strong>：10K+ 操作/秒</li></ul><hr><h2 id="8-production-checklist">8. 生產清單</h2><ol><li>密鑰管理（使用KMS，而不是硬編碼）</li><li>☐ 單獨的加密和雜湊金鑰</li><li>所有 PHI 存取的審核日誌記錄</li><li>☐ 指數表現監控</li><li>安全備份加密金鑰</li><li>☐ 使用者的文件搜尋限制</li><li>遷移 MD5 → SCRAM-SHA-256 (PostgreSQL 18)</li><li>為資料庫連線啟用 TLS 1.3</li></ol><h3 id="81-configuration-example">8.1 設定範例</h3><pre><code class="language-yaml"># application.yml
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
</code></pre><h3 id="82-key-management-v%E1%BB%9Bi-aws-kms">8.2 使用 AWS KMS 進行金鑰管理</h3><pre><code class="language-java">@Configuration
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
</code></pre><hr><h2 id="9-k%E1%BA%BFt-lu%E1%BA%ADn">9. 結論</h2><h3 id="key-insights">主要見解</h3><ol><li><strong>沒有銀彈</strong>：加密與搜尋是基本的權衡</li><li><strong>混合方法效果最好</strong>:<ul><li>高風險欄位→加密+哈希</li><li>名稱 → 標記化</li><li>元資料→有存取控制的明文</li></ul></li><li><strong>複雜性是有代價的</strong>：僅在確實需要時添加</li></ol><h3 id="khi-n%C3%A0o-d%C3%B9ng-tokenization">何時使用標記化？</h3><ul><li>✅ 醫療保健（病人姓名）</li><li>✅ 金融（客戶搜尋）</li><li>✅ 電子商務（使用者資料）</li></ul><h3 id="khi-n%C3%A0o-skip">什麼時候跳過？</h3><ul><li>❌ 內部工具（使用存取控制）</li><li>❌ 公開數據</li><li>❌ 非生產環境</li></ul><h3 id="best-practices">最佳實踐</h3><ol><li>✅ <strong>使用混合方法</strong> 對於可搜尋字段</li><li>✅ <strong>索引哈希列</strong> 為了表現</li><li>✅ <strong>單獨的按鍵</strong> 加密與雜湊</li><li>✅ <strong>輪換鑰匙</strong> 有時</li><li>✅ <strong>審計</strong> 所有解密操作</li><li>✅ <strong>從不記錄</strong> 解密的 PII/PHI</li></ol><hr><h2 id="t%C3%A0i-li%E1%BB%87u-tham-kh%E1%BA%A3o">參考文獻</h2><ul><li><a href="https://www.postgresql.org/docs/18/release-18.html">PostgreSQL 18 發行說明</a></li><li><a href="https://www.postgresql.org/docs/17/release-17.html">PostgreSQL 17 發行說明</a></li><li><a href="https://nvlpubs.nist.gov/nistpubs/ir/2017/NIST.IR.8011-1.pdf">NIST 可搜尋加密</a></li><li><a href="https://people.csail.mit.edu/nickolai/papers/raluca-cryptdb.pdf">CryptDB 論文</a></li></ul>
