---
id: 019c9617-fd50-7374-a2de-b2d2ddf46be9
title: 医療データの暗号化
slug: ma-hoa-du-lieu-healthcare
excerpt: >-
  暗号化されたデータを検索するにはどうすればよいですか?この記事では、100,000 件を超える患者記録を保護するための Spring Boot +
  PostgreSQL を使用した 3 つの実践的なアプローチと実装を紹介します。
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
  name: データベース
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
locale: ja
---
<p>参考までにレポ <a href="https://github.com/xdev-asia-labs/healthcare-pii-protection-patterns" rel="noreferrer">コードはここにあります</a></p><p><strong>重要なポイント:</strong></p><ul><li>❌ ランダム IV の AES-GCM → 検索できません</li><li>✅ 検索可能なハッシュインデックス → 完全一致検索（完全一致）</li><li>✅ トークン化 + ハッシュ化 → 部分一致</li></ul><hr><h2 id="1-th%C3%A1ch-th%E1%BB%A9c-encryption-vs-searchability">1. 課題: 暗号化と検索可能性</h2><h3 id="11-v%E1%BA%A5n-%C4%91%E1%BB%81">1.1 問題点</h3><p>医療アプリケーションにはストレージが必要です <strong>PII (個人を特定できる情報)</strong>:</p><ul><li>IDカード/CCCD（国民ID）</li><li>電話番号</li><li>フルネーム</li><li>住所</li></ul><p>これはグループの機密情報です <strong>PHI (保護された健康情報)</strong> HIPAA 規格に従って。</p><p><strong>矛盾する要件:</strong></p><ol><li>🔒 <strong>セキュリティ</strong>: データは保存時に暗号化する必要があります (HIPAA、GDPR 準拠)</li><li>🔍 <strong>使いやすさ</strong>: ユーザーは「Nguyen Van A」、「Tran」などを検索する必要があります。</li></ol><h3 id="12-t%E1%BA%A1i-sao-standard-encryption-kh%C3%B4ng-ho%E1%BA%A1t-%C4%91%E1%BB%99ng">1.2 標準暗号化が機能しないのはなぜですか?</h3><pre><code class="language-java">// AES-256-GCM với random IV
encrypt("Nguyễn Văn A") → "xK9L2m..."  // Lần 1
encrypt("Nguyễn Văn A") → "pQ3N7r..."  // Lần 2 - KHÁC!

// SQL query không hoạt động
WHERE encrypted_name = encrypt("Nguyễn Văn A")  // ❌ Fail!
</code></pre><p><strong>ランダムIV</strong> = セキュリティは高いですが、 <strong>検索不可能</strong>。同じ値をエンコードするたびに異なる結果が得られ、セマンティックなセキュリティは確保されますが、直接比較することはできません。</p><hr><h2 id="2-ki%E1%BA%BFn-tr%C3%BAc-b%E1%BA%A3o-m%E1%BA%ADt-nhi%E1%BB%81u-l%E1%BB%9Bp">2. 多層セキュリティアーキテクチャ</h2><p>医療システムは、さまざまなレベルでデータを保護する必要があります。</p>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>レイヤー</th>
<th>テクノロジー</th>
<th>目的</th>
</tr>
</thead>
<tbody>
<tr>
<td>クライアント層</td>
<td>TLS 1.3 (HTTPS)</td>
<td>送信時の暗号化</td>
</tr>
<tr>
<td>アプリケーション層</td>
<td>AES-256-GCM、JPAコンバーター</td>
<td>フィールドレベルの暗号化</td>
</tr>
<tr>
<td>データベース層</td>
<td>pgcrypto、RLS</td>
<td>行レベルのセキュリティ</td>
</tr>
<tr>
<td>ストレージ層</td>
<td>TDE、ルークス</td>
<td>フルディスク暗号化</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<figure class="kg-card kg-image-card kg-card-hascaption"><img src="/storage/uploads/2025/12/227880af-b30a-4869-9151-6d62a4934004-1-201-a-6c589a5e.jpeg" class="kg-image" alt="" loading="lazy" width="2000" height="1091" sizes="(min-width: 720px) 720px"><figcaption><span style="white-space: pre-wrap;">多層セキュリティアーキテクチャ</span></figcaption></figure><hr><h2 id="3-solution-1-searchable-hash-index">3. 解決策 1: 検索可能なハッシュ インデックス</h2><h3 id="31-%C3%BD-t%C6%B0%E1%BB%9Fng">3.1 アイデア</h3><ul><li><strong>暗号化する</strong> AES-256-GCM によるデータ (ランダム IV で安全)</li><li>作成 <strong>決定論的ハッシュ</strong> 検索用(HMAC-SHA256)</li><li>両方を保存: 暗号化された値 + 検索ハッシュ</li></ul><h3 id="32-database-schema">3.2 データベーススキーマ</h3><pre><code class="language-sql">CREATE TABLE patients (
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
</code></pre><h3 id="33-spring-boot-entity">3.3 Spring Boot エンティティ</h3><pre><code class="language-java">@Entity
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
</code></pre><h3 id="34-aes-256-gcm-encryption-service">3.4 AES-256-GCM 暗号化サービス</h3><pre><code class="language-java">@Service
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
</code></pre><h3 id="35-jpa-attributeconverter">3.5 JPA属性コンバータ</h3><pre><code class="language-java">@Converter
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
</code></pre><h3 id="36-%C6%B0u-v%C3%A0-nh%C6%B0%E1%BB%A3c-%C4%91i%E1%BB%83m">3.6 メリットとデメリット</h3><p><strong>✅ 利点:</strong></p><ul><li>非常に安全 (暗号化 + ハッシュ)</li><li>高速ルックアップ (インデックス付きハッシュ)</li><li>シンプルな実装</li></ul><p><strong>❌ 短所:</strong></p><ul><li>完全一致のみ (「079*」は検索しないでください)</li><li>検索可能なフィールドごとに個別のハッシュ列が必要</li></ul><hr><h2 id="4-solution-2-tokenization-search-index">4. ソリューション 2: トークン化 + 検索インデックス</h2><h3 id="41-v%E1%BA%A5n-%C4%91%E1%BB%81-v%E1%BB%9Bi-names">4.1 名前の問題</h3><p>ユーザーは検索できるため、フルネームに正確なハッシュを使用できません:</p><ul><li>「トラン」（姓の一部）</li><li>「ヴァン」（ミドルネーム）</li><li>「グエン・ヴァン・A」（フルネーム）</li></ul><h3 id="42-gi%E1%BA%A3i-ph%C3%A1p-tokenized-hashing">4.2 解決策: トークン化されたハッシュ</h3><p>各単語を個別にハッシュし、PostgreSQL 配列に保存します。</p><pre><code>Input: "Nguyễn Văn A"
   ↓ 1. Remove diacritics
"nguyen van a"
   ↓ 2. Tokenize
["nguyen", "van", "a", "nguyenvana"]
   ↓ 3. Hash each token
[hash("nguyen"), hash("van"), hash("a"), hash("nguyenvana")]
   ↓ 4. Store in PostgreSQL array
fullNameTokens: TEXT[]
</code></pre><h3 id="43-vietnamese-text-processing">4.3 ベトナム語のテキスト処理</h3><pre><code class="language-java">public class VietnameseTextUtils {
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
</code></pre><h3 id="44-token-generation-service">4.4 トークン生成サービス</h3><pre><code class="language-java">@Service
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
</code></pre><h3 id="45-database-schema-v%E1%BB%9Bi-gin-index">4.5 GIN インデックスを使用したデータベース スキーマ</h3><pre><code class="language-sql">CREATE TABLE patients (
    id UUID PRIMARY KEY,
    full_name TEXT,           -- AES-256-GCM encrypted
    full_name_tokens TEXT[],  -- Hashed search tokens
    ...
);

-- GIN index for array search
CREATE INDEX idx_full_name_tokens 
ON patients USING GIN(full_name_tokens);
</code></pre><h3 id="46-search-query">4.6 検索クエリ</h3><pre><code class="language-java">@Repository
public interface PatientRepository extends JpaRepository&lt;Patient, UUID&gt; {
    
    @Query("SELECT p FROM Patient p WHERE :token = ANY(p.fullNameTokens)")
    Page&lt;Patient&gt; findByFullNameTokensContaining(
        @Param("token") String hashedToken, 
        Pageable pageable
    );
}
</code></pre><h3 id="47-search-service">4.7 検索サービス</h3><pre><code class="language-java">@Service
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
</code></pre><hr><h2 id="5-postgresql-1718t%C3%ADnh-n%C4%83ng-m%E1%BB%9Bi">5. PostgreSQL 17/18 - 新機能</h2><p>PostgreSQL 18 (2025 年 9 月 25 日リリース) では、多くの重要なセキュリティ改善が行われています。</p><h3 id="51-c%E1%BA%A3i-ti%E1%BA%BFn-pgcrypto">5.1 pgcrypto の改善</h3><pre><code class="language-sql">-- PostgreSQL 18 hỗ trợ SHA-2 cho password hashing
SELECT sha256crypt('password', gen_salt('sha256'));
SELECT sha512crypt('password', gen_salt('sha512'));

-- Hỗ trợ CFB mode cho AES
SELECT encrypt('sensitive data'::bytea, 'key'::bytea, 'aes-cfb');
</code></pre><h3 id="52-oauth-20-native-support">5.2 OAuth 2.0 ネイティブ サポート</h3><p>PostgreSQL 18 はコアで OAuth 2.0 をサポートし、Keycloak、Okta、Azure AD と統合します。</p><pre><code># pg_hba.conf - PostgreSQL 18
host all all 0.0.0.0/0 oauth \
    issuer="https://keycloak.example.com/realms/myrealm" \
    scope="openid"
</code></pre><h3 id="53-md5-deprecation">5.3 MD5 の廃止</h3><p>⚠️ <strong>警告:</strong> MD5 認証は PostgreSQL 18 で非推奨になりました。</p><pre><code class="language-sql">-- Chuyển sang SCRAM-SHA-256
ALTER ROLE myuser PASSWORD 'newpassword';

-- Password nên bắt đầu với 'SCRAM-SHA-256$'
</code></pre><pre><code># pg_hba.conf - Sử dụng SCRAM thay MD5
host all all 0.0.0.0/0 scram-sha-256
</code></pre><h3 id="54-so-s%C3%A1nh-phi%C3%AAn-b%E1%BA%A3n">5.4 バージョン比較</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>特長</th>
<th>PG15</th>
<th>PG17</th>
<th>PG18</th>
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
<td>OAuth 2.0 ネイティブ</td>
<td>❌</td>
<td>❌</td>
<td>✅</td>
</tr>
<tr>
<td>FIPSモード機能</td>
<td>❌</td>
<td>⚠️</td>
<td>✅</td>
</tr>
<tr>
<td>TLS 1.3暗号構成</td>
<td>❌</td>
<td>❌</td>
<td>✅</td>
</tr>
<tr>
<td>dblink のスクラム</td>
<td>❌</td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td>ダイレクトTLS</td>
<td>❌</td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td>増分バックアップ</td>
<td>❌</td>
<td>✅</td>
<td>✅</td>
</tr>
<tr>
<td>MD5は非推奨になりました</td>
<td>❌</td>
<td>❌</td>
<td>✅</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<hr><h2 id="6-trade-offs-analysis">6. トレードオフ分析</h2>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>アプローチ</th>
<th>検索性</th>
<th>セキュリティ</th>
<th>パフォーマンス</th>
<th>複雑さ</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>標準暗号化</strong></td>
<td>❌ なし</td>
<td>⭐⭐⭐⭐⭐</td>
<td>⭐⭐⭐⭐⭐</td>
<td>⭐シンプル</td>
</tr>
<tr>
<td><strong>ハッシュインデックス</strong></td>
<td>⚠️ 正確のみ</td>
<td>⭐⭐⭐⭐</td>
<td>⭐⭐⭐⭐⭐</td>
<td>⭐⭐簡単</td>
</tr>
<tr>
<td><strong>トークン化</strong></td>
<td>✅ 部分一致</td>
<td>⭐⭐⭐</td>
<td>⭐⭐⭐⭐</td>
<td>⭐⭐⭐⭐ コンプレックス</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="61-khi-n%C3%A0o-d%C3%B9ng-hash-index">6.1 ハッシュインデックスをいつ使用するか?</h3><ul><li>国民ID、SSN、納税者ID</li><li>クレジットカード番号</li><li>既存の正確な識別子</li></ul><h3 id="62-khi-n%C3%A0o-d%C3%B9ng-tokenization">6.2 トークン化をいつ使用するか?</h3><ul><li>名前（フルネーム、姓/名）</li><li>住所</li><li>自由記述フィールド</li></ul><hr><h2 id="7-real-world-results">7. 実際の結果</h2><h3 id="71-test-setup">7.1 テストのセットアップ</h3><ul><li><strong>データセット</strong>: ベトナム人患者10,000人</li><li><strong>データベース</strong>: PostgreSQL18</li><li><strong>暗号化</strong>: AES-256-GCM</li><li><strong>バックエンド</strong>：スプリングブート3.4</li></ul><h3 id="72-performance-metrics">7.2 パフォーマンス指標</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>操作</th>
<th>時間</th>
<th>注意事項</th>
</tr>
</thead>
<tbody>
<tr>
<td>患者の作成</td>
<td>~6ms</td>
<td>暗号化 + トークン化を含む</td>
</tr>
<tr>
<td>「トラン」で検索</td>
<td>~300ms</td>
<td>10,000 レコードからの 6,092 件の一致</td>
</tr>
<tr>
<td>「文学」で検索</td>
<td>~250ms</td>
<td>~7,000 件の一致</td>
</tr>
<tr>
<td>正確な ID 検索</td>
<td>~2ms</td>
<td>ハッシュインデックスの使用</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="73-security-summary">7.3 セキュリティの概要</h3>
<!--kg-card-begin: html-->
<table>
<thead>
<tr>
<th>アスペクト</th>
<th>実装</th>
<th>利点</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>保存時の暗号化</strong></td>
<td>AES-256-GCM + ランダム IV</td>
<td>FIPS 140-2準拠</td>
</tr>
<tr>
<td><strong>検索性</strong></td>
<td>HMAC-SHA256 ハッシュ インデックス</td>
<td>高速 O(1) ルックアップ</td>
</tr>
<tr>
<td><strong>透明性</strong></td>
<td>JPA属性コンバータ</td>
<td>コード変更なし</td>
</tr>
<tr>
<td><strong>コンプライアンス</strong></td>
<td>HIPAA、GDPR対応</td>
<td>監査証跡、暗号シュレッディング</td>
</tr>
</tbody>
</table>
<!--kg-card-end: html-->
<h3 id="74-performance-characteristics">7.4 性能特性</h3><ul><li><strong>暗号化のオーバーヘッド</strong>: ~2-5% CPU</li><li><strong>検索速度</strong>: 平文と同じ (インデックス付きハッシュ)</li><li><strong>ストレージのオーバーヘッド</strong>: ~30% (Base64 エンコーディング)</li><li><strong>スループット</strong>: 10,000+ オペレーション/秒</li></ul><hr><h2 id="8-production-checklist">8. 制作チェックリスト</h2><ol><li>☐ キー管理 (ハードコーディングではなく KMS を使用)</li><li>☐ 個別の暗号化キーとハッシュキー</li><li>☐ すべての PHI アクセスの監査ログ</li><li>☐ インデックスパフォーマンスの監視</li><li>☐ 暗号化キーを安全にバックアップする</li><li>☐ ユーザーに対する文書検索の制限</li><li>☐ MD5 → SCRAM-SHA-256 (PostgreSQL 18) への移行</li><li>☐ データベース接続に対して TLS 1.3 を有効にする</li></ol><h3 id="81-configuration-example">8.1 構成例</h3><pre><code class="language-yaml"># application.yml
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
</code></pre><h3 id="82-key-management-v%E1%BB%9Bi-aws-kms">8.2 AWS KMS によるキー管理</h3><pre><code class="language-java">@Configuration
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
</code></pre><hr><h2 id="9-k%E1%BA%BFt-lu%E1%BA%ADn">9. 結論</h2><h3 id="key-insights">重要な洞察</h3><ol><li><strong>特効薬はない</strong>: 暗号化と検索は基本的なトレードオフです</li><li><strong>ハイブリッドアプローチが最も効果的</strong>:<ul><li>高リスクフィールド → 暗号化 + ハッシュ</li><li>名前 → トークン化</li><li>メタデータ → アクセス制御付き平文</li></ul></li><li><strong>複雑さにはコストがかかる</strong>: 本当に必要な場合にのみ追加します</li></ol><h3 id="khi-n%C3%A0o-d%C3%B9ng-tokenization">トークン化をいつ使用するか?</h3><ul><li>✅ 医療（患者名）</li><li>✅ 財務（顧客検索）</li><li>✅ 電子商取引 (ユーザープロファイル)</li></ul><h3 id="khi-n%C3%A0o-skip">いつスキップするか？</h3><ul><li>❌ 内部ツール (アクセス制御を使用)</li><li>❌ 公開データ</li><li>❌ 非実稼働環境</li></ul><h3 id="best-practices">ベストプラクティス</h3><ol><li>✅ <strong>ハイブリッドアプローチを使用する</strong> 検索可能なフィールドの場合</li><li>✅ <strong>インデックスハッシュ列</strong> パフォーマンスのために</li><li>✅ <strong>個別のキー</strong> 暗号化とハッシュの比較</li><li>✅ <strong>キーを回転する</strong> 時々</li><li>✅ <strong>監査</strong> すべての復号化操作</li><li>✅ <strong>決してログに記録しないでください</strong> 復号化された PII/PHI</li></ol><hr><h2 id="t%C3%A0i-li%E1%BB%87u-tham-kh%E1%BA%A3o">参考文献</h2><ul><li><a href="https://www.postgresql.org/docs/18/release-18.html">PostgreSQL 18 リリースノート</a></li><li><a href="https://www.postgresql.org/docs/17/release-17.html">PostgreSQL 17 リリースノート</a></li><li><a href="https://nvlpubs.nist.gov/nistpubs/ir/2017/NIST.IR.8011-1.pdf">NIST 検索可能な暗号化</a></li><li><a href="https://people.csail.mit.edu/nickolai/papers/raluca-cryptdb.pdf">CryptDB ペーパー</a></li></ul>
