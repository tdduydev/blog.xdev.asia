---
id: 019e1a40-a103-7001-d001-f0a1b2c30103
title: 'レッスン 3: 健康データ分類 (PHI/ePHI) とリスク評価'
slug: bai-3-phan-loai-du-lieu-y-te-danh-gia-rui-ro
description: >-
  医療データを機密レベルに従って分類します: PHI、ePHI、PII、臨床データ、管理データ。 NIST SP 800-30
  に従ってデータ分類ポリシー、データ フロー マッピング、リスク評価を開発し、医療マイクロサービス システムのリスク レジスタを設定します。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 3
section_title: 'パート 1: アーキテクチャとプラットフォーム'
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-461" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-461)"/>

  <!-- Decorations -->
  <g>
    <circle cx="653" cy="89" r="36" fill="#c084fc" opacity="0.14"/>
    <circle cx="706" cy="282" r="35" fill="#c084fc" opacity="0.13"/>
    <circle cx="759" cy="215" r="34" fill="#c084fc" opacity="0.12000000000000001"/>
    <circle cx="812" cy="148" r="33" fill="#c084fc" opacity="0.11"/>
    <circle cx="865" cy="81" r="32" fill="#c084fc" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <line x1="600" y1="119" x2="1100" y2="199" stroke="#c084fc" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="149" x2="1050" y2="219" stroke="#c084fc" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1048.444863728671,202 1048.444863728671,236 1019,253 989.555136271329,236 989.555136271329,202 1019,185" fill="none" stroke="#c084fc" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#c084fc"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#c084fc" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#c084fc">🏗️ アーキテクチャ — レッスン 3</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 3: 医療データ分類 (PHI/ePHI) &</tspan>
      <tspan x="60" dy="42">リスク評価</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービス ヘルスケア システムの構築 — HIPAA 標準を備えた Quarkus、PostgreSQL、Keycloak</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 1: アーキテクチャとプラットフォーム</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## 1. 医療向けのデータ分類フレームワーク

![医療データ分類ピラミッド — 公開から制限付きまでの 4 レベル](/storage/uploads/2026/04/healthcare-data-classification-pyramid.webp)

＃＃＃１．１．データを分類する必要があるのはなぜですか?

すべてのデータに同じレベルの保護が必要なわけではありません。データ分類は次のことに役立ちます。

- **セキュリティ コストの最適化**: リソースを最も重要なデータに集中させます
- **法的遵守**: 規制要件に従って正しい管理を適用します。
- **攻撃対象領域を削減**: 機密データの範囲を制限します
- **インシデント対応**: 侵害が発生した場合の対処を優先します。

＃＃＃１．２．医療データの分類レベル

![医療データ分類ピラミッド — 公開から制限付きまでの 4 レベル](/storage/uploads/2026/04/healthcare-data-classification-levels.webp)

|レベル |名前 |例 |暗号化 |アクセス |監査 |
|----------|-----|----------|----------|--------|----------|
| **4 - 制限付き** |最大制限 | HIV/エイズ、メンタルヘルス、遺伝学、依存症治療、リプロダクティブ・ヘルス |必須 (AES-256) |指名された個人のみ |完全なログ記録、リアルタイムのアラート |
| **3 - 機密** |セキュリティ |カルテ、検査、処方箋、画像診断、健康保険 |必須 (AES-256) |役割ベース（治療臨床医） |完全なログ |
| **2 - 内部** |内部 |予約スケジュール、統計 (匿名)、医療スタッフ、構成 |おすすめ |部門別 |標準ロギング |
| **1 - パブリック** |パブリック |サービス、勤務時間、病院の連絡先、健康上の指示のリスト |不要 |パブリック |基本的なロギング |

＃＃＃１．３． PostgreSQL スキーマにおけるデータ分類

```sql
-- Data classification metadata table
CREATE TABLE data_classification (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    schema_name VARCHAR(100) NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    column_name VARCHAR(100) NOT NULL,
    classification_level INTEGER NOT NULL CHECK (classification_level BETWEEN 1 AND 4),
    classification_label VARCHAR(50) NOT NULL,
    contains_phi BOOLEAN DEFAULT false,
    encryption_required BOOLEAN DEFAULT false,
    masking_rule VARCHAR(100),
    retention_days INTEGER,
    legal_basis TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ví dụ classification cho patient table
INSERT INTO data_classification (schema_name, table_name, column_name,
    classification_level, classification_label, contains_phi, encryption_required, masking_rule)
VALUES
    ('public', 'patients', 'id', 2, 'INTERNAL', false, false, NULL),
    ('public', 'patients', 'full_name', 3, 'CONFIDENTIAL', true, true, 'PARTIAL_MASK'),
    ('public', 'patients', 'date_of_birth', 3, 'CONFIDENTIAL', true, false, 'YEAR_ONLY'),
    ('public', 'patients', 'cccd_number', 3, 'CONFIDENTIAL', true, true, 'FULL_MASK'),
    ('public', 'patients', 'phone', 3, 'CONFIDENTIAL', true, true, 'PARTIAL_MASK'),
    ('public', 'patients', 'email', 3, 'CONFIDENTIAL', true, true, 'PARTIAL_MASK'),
    ('public', 'patients', 'address', 3, 'CONFIDENTIAL', true, true, 'CITY_ONLY'),
    ('public', 'patients', 'blood_type', 2, 'INTERNAL', false, false, NULL),
    ('public', 'patients', 'hiv_status', 4, 'RESTRICTED', true, true, 'FULL_MASK'),
    ('public', 'patients', 'insurance_number', 3, 'CONFIDENTIAL', true, true, 'PARTIAL_MASK');
```

## 2. データ フロー マッピング

＃＃＃２．１．マイクロサービスにおける PHI データ フロー

![マイクロサービス間の PHI データの流れ — 患者ポータルから API ゲートウェイ、Keycloak を経て、サービスとデータベースまで](/storage/uploads/2026/04/healthcare-phi-data-flow.webp)

＃＃＃２．２．データ フロー ドキュメント テンプレート

| # |データ要素 |出典 |目的地 |交通機関 |暗号化 |分類 |
|---|-------------|----------|---------------|-----------|-------------|----------|
| 1 |患者名 |ポータル |患者サービス | HTTPS/TLS 1.3 |輸送中 + 静止中 | L3 |
| 2 |ラボの結果 |実験器具 |ラボサービス | TLS 上の HL7v2/MLLP |輸送中 + 静止中 | L3 |
| 3 |診断コード |臨床サービス |請求サービス |カフカ (SSL) |アプリケーションレベル | L3 |
| 4 | HIV ステータス |臨床サービス |臨床DB | JDBC/SSL |列の暗号化 | L4 |
| 5 |監査イベント |すべてのサービス |監査サービス |カフカ (SSL) |イベントの暗号化 | L2 |
| 6 |予約 |スケジューリングサービス |通知サービス |カフカ (SSL) |輸送中 | L2 |

## 3. NIST SP 800-30 に基づくリスク評価

＃＃＃３．１．リスク評価方法

![NIST SP 800-30 に従ってリスクを評価する 6 つのステップ — 脅威の特定からリスク対応まで](/storage/uploads/2026/04/healthcare-risk-assessment-steps.webp)

＃＃＃３．２．医療マイクロサービスの脅威の特定

|脅威カテゴリ |脅威 |脅威の発生源 |
|----------------|--------|--------------|
| **外部** |患者サービスへの SQL インジェクション |攻撃者 |
| **外部** |ランサムウェアはデータベースを暗号化します |サイバー犯罪 |
| **外部** | API 呼び出しに対する MITM 攻撃 |ネットワーク攻撃 |
| **外部** |患者ポータルへの資格情報の詰め込み |ボットネットワーク |
| **内部** |従業員による PHI への不正アクセス |インサイダー |
| **内部** |データベース管理者はすべての患者データをエクスポートします |特権ユーザー |
| **内部** |開発者のハードコード資格情報 |怠慢な従業員 |
| **環境** |ハードウェア障害によるデータベースの破損 |インフラ |
| **環境** |自然災害によるデータ損失 |自然災害 |
| **サプライチェーン** | Quarkus 依存関係の脆弱性 |サードパーティ |

＃＃＃３．３．脆弱性評価

```java
// Ví dụ: Checklist kiểm tra vulnerabilities trong Quarkus service
public class SecurityVulnerabilityChecklist {

    // V1: SQL Injection - Sử dụng parameterized queries
    // ❌ VULNERABLE
    String badQuery = "SELECT * FROM patients WHERE name = '" + userInput + "'";

    // ✅ SECURE
    @NamedQuery(name = "Patient.findByName",
                query = "SELECT p FROM Patient p WHERE p.name = :name")
    List<Patient> findByName(@Param("name") String name);

    // V2: Broken Authentication - Token validation
    // ❌ VULNERABLE: Không verify token
    String userId = jwt.getClaim("sub"); // Không verify expiration, issuer

    // ✅ SECURE: Quarkus OIDC tự động verify
    @Authenticated
    @RolesAllowed("doctor")
    public Response getPatient(UUID id) { ... }

    // V3: Sensitive Data Exposure in Logs
    // ❌ VULNERABLE
    log.info("Patient created: " + patient.toString()); // Logs PHI!

    // ✅ SECURE
    log.info("Patient created: id={}", patient.getId()); // Only log ID
}
```

＃＃＃３．４．リスクマトリクス

![5x5 リスク評価マトリックス — 可能性 x 低レベルから重大レベルまでの影響](/storage/uploads/2026/04/healthcare-risk-matrix-heatmap.webp)

| |無視できる (1) |低 (2) |中 (3) |高 (4) |クリティカル (5) |
|-|----------------|-----------|---------------|----------|-------------|
| **非常に高い (5)** |低い |中 |高い |クリティカル |クリティカル |
| **高 (4)** |低い |中 |高い |高い |クリティカル |
| **中 (3)** |低い |低い |中 |高い |高い |
| **低 (2)** |低い |低い |低い |中 |中 |
| **非常に低い (1)** |低い |低い |低い |低い |中 |

## 4. 医療マイクロサービスのリスク登録

＃＃＃４．１．リスク登録テンプレート

| ID |リスクの説明 |可能性 |影響 |リスクレベル |緩和 |オーナー |ステータス |
|----|------|-----------|----------|-------------|-----------|----------|----------|
| R001 |患者 API への SQL インジェクション |中 (3) |クリティカル (5) |高い |パラメータ化されたクエリ、入力検証、WAF |開発チーム |緩和 |
| R002 |インサイダー アクセス PHI は許可されていません |高 (4) |高 (4) |高い | RBAC、RLS、監査ログ、DLP |セキュリティチーム |進行中 |
| R003 |ランサムウェアは、patient_db を暗号化します。中 (3) |クリティカル (5) |高い |不変バックアップ、ネットワークセグメンテーション、EDR |運用チーム |緩和 |
| R004 | Keycloakトークンの盗難 |中 (3) |高 (4) |高い |有効期間の短いトークン、mTLS、DPoP |開発チーム |進行中 |
| R005 |ログ内の PHI 暴露 |高 (4) |高 (4) |高い |ログのサニタイズ、CI/CD での PHI 検出 |開発チーム |開く |
| R006 | Kafka の暗号化されていない PHI |中 (3) |高 (4) |高い |アプリケーションレベルの暗号化、Kafka SSL |開発チーム |開く |
| R007 |データベースのバックアップの盗難 |低 (2) |クリティカル (5) |中 |暗号化されたバックアップ、キー管理 |運用チーム |緩和 |
| R008 | API キー/認証情報の公開 |中 (3) |高 (4) |高い | Vault シークレット管理、ハードコーディングされたシークレットなし |すべてのチーム |進行中 |
| R009 |患者ポータルでの DDoS |中 (3) |中 (3) |中 |レート制限、WAF、CDN |運用チーム |緩和 |
| R010 |サードパーティの依存関係 CVE |高 (4) |中 (3) |高い |自動スキャン、Dependabot、SBOM |開発チーム |継続中 |

＃＃＃４．２．リスク治療計画

![4 つのリスク処理戦略 — 軽減、移転、受け入れ、回避](/storage/uploads/2026/04/healthcare-risk-response-strategies.webp)

- **軽減** ← リスクが高い場合に推奨: コントロールを実装し、可能性/影響を軽減します。
- **TRANSFER** (転送): サイバー保険、専門プロバイダーへのアウトソーシング
- **ACCEPT** (受け入れる) ← 低リスクの場合のみ: リスク受容の文書化、モニタリング
- **AVOID** (回避): リスク源を排除し、アーキテクチャを変更します。

## 5. データ保持ポリシー

＃＃＃５．１．ベトナムの健康に関する保持要件

|データ型 |保管時間 |法的根拠 |
|--------------|-------------------|----------------|
|外来診療記録 | 10年 |回覧 46/2018/TT-BYT |
|入院患者の医療記録 | 20年 |回覧 46/2018/TT-BYT |
|死亡医療記録 | 20年 |回覧 46/2018/TT-BYT |
|テスト結果 | 10年 |病院の規則 |
|画像診断 | 10年 |病院の規則 |
|監査ログ | 6 年 (HIPAA) | HIPAA §164.530(j) |
|処方箋 | 5年 |薬事法 |
|同意記録 |生涯 + 6 年 | HIPAA / 政令 13/2023 |

＃＃＃５．２． PostgreSQL での自動保存

```sql
-- Partition strategy for data retention
CREATE TABLE audit_events (
    id UUID DEFAULT gen_random_uuid(),
    event_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    event_type VARCHAR(50) NOT NULL,
    actor_id UUID NOT NULL,
    resource_type VARCHAR(100) NOT NULL,
    resource_id UUID,
    action VARCHAR(20) NOT NULL,
    outcome VARCHAR(20) NOT NULL,
    details JSONB
) PARTITION BY RANGE (event_time);

-- Create monthly partitions
CREATE TABLE audit_events_2026_01 PARTITION OF audit_events
    FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');

CREATE TABLE audit_events_2026_02 PARTITION OF audit_events
    FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');

-- Automated partition management
-- Drop partitions older than retention period (6 years for HIPAA)
-- Archive to cold storage before dropping
```

## 6. まとめ

このレッスンでは次のことを行います。

- 医療データのための 4 レベルの **データ分類フレームワーク** を開発する
- マイクロサービス アーキテクチャ経由で PHI の **データ フロー マッピング** を作成
- NIST SP 800-30 方法論に従って **リスク評価** を実行します
- リスク治療計画を含む **リスク登録** を設定します
- ベトナムの規制および HIPAA に基づく **データ保持ポリシー** の定義

## 演習

1. 医療システム データベース内のすべてのテーブル/列を 4 つのレベルに分類します。
2. 3 つの主な使用例のデータ フロー図を作成します: 検査への登録、検査結果の記録、薬の処方
3. リスク評価を実行し、少なくとも 15 個のリスクについてリスク登録を作成します
4. 組織に適したデータ保持ポリシーを策定する

---

---

<!-- SERIES-NAV:START -->
| ◀ 前の記事 |次の記事 ▶ |
|:---|---:|
| [レッスン 2: Quarkus Stack を使用した医療向けの安全なマイクロサービス アーキテクチャ](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-2-kien-truc-microservices-an-toan-cho-y-te) | [レッスン 4: 医療情報システムの STRIDE/DREAD の脅威モデリング](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-4-threat-modeling-stride-dread-cho-his) |
<!-- SERIES-NAV:END -->
