---
id: 019d8a21-c503-7005-d001-e1f2a3b4c503
title: 'レッスン 3: 規制の遵守 - PCI-DSS、PSD2、およびベトナム国立銀行の規制'
slug: bai-3-regulatory-compliance-pci-dss-psd2-quy-dinh-nhnn
description: >-
  FinTech におけるコンプライアンスの概要。支払い処理のための PCI-DSS 要件。 PSD2 とオープン
  バンキング。電子決済および電子ウォレットに関するベトナム国立銀行の規制。コンプライアンスを満たすシステムを設計します。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 3
section_title: 'パート 1: FinTech と決済プラットフォーム'
course:
  id: 019d8a21-c500-7005-d001-e1f2a3b4c5d6
  title: FinTech と決済プラットフォームのアーキテクチャ
  slug: kien-truc-fintech-payment-platform
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-5203" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-5203)"/>

  <!-- Decorations -->
  <g>
    <circle cx="650" cy="220" r="28" fill="#38bdf8" opacity="0.05"/>
    <circle cx="700" cy="110" r="8" fill="#38bdf8" opacity="0.05"/>
    <circle cx="750" cy="260" r="18" fill="#38bdf8" opacity="0.05"/>
    <circle cx="800" cy="150" r="28" fill="#38bdf8" opacity="0.05"/>
    <circle cx="850" cy="40" r="8" fill="#38bdf8" opacity="0.05"/>
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
    <line x1="600" y1="100" x2="1100" y2="180" stroke="#38bdf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="130" x2="1050" y2="200" stroke="#38bdf8" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1030.3108891324553,182.5 1030.3108891324553,217.5 1000,235 969.6891108675446,217.5 969.6891108675446,182.5 1000,165" fill="none" stroke="#38bdf8" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#38bdf8"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#38bdf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#38bdf8">🏗️ アーキテクチャ — レッスン 3</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 3: 規制遵守 - PCI-DSS、</tspan>
      <tspan x="60" dy="42">PSD2 およびベトナム国立銀行の規制</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">FinTech と決済プラットフォームのアーキテクチャ</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 1: FinTech と決済プラットフォーム</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![レッスン 3: 規制の遵守 - PCI-DSS、PSD2、およびベトナム国立銀行の規制](/storage/uploads/2026/03/fintech-bai-3-diagram.webp)

## はじめに

FinTech では、コンプライアンスは「あればいいもの」ではなく、**必須**です。決済プラットフォームは、セキュリティ、プライバシー、レポートに関する一連の規制に準拠する必要があります。違反すると、数百万ドルの罰金、ライセンスの剥奪、顧客の信頼の喪失につながる可能性があります。

---

## 1. PCI-DSS — ペイメントカード業界のデータセキュリティ標準

### 1.1 PCI-DSS の概要

PCI-DSS は、ペイメント カード データを処理、保存、送信する組織にとって必須のセキュリティ標準です。

```
PCI-DSS v4.0 (2024+) — 12 Requirements:
├── Build & Maintain Secure Network
│   ├── 1. Firewall configuration
│   └── 2. No vendor-supplied defaults
├── Protect Cardholder Data
│   ├── 3. Protect stored data
│   └── 4. Encrypt transmission
├── Vulnerability Management
│   ├── 5. Anti-malware
│   └── 6. Secure development
├── Access Control
│   ├── 7. Restrict access (need-to-know)
│   ├── 8. Unique IDs for access
│   └── 9. Physical access control
├── Monitoring & Testing
│   ├── 10. Track & monitor access
│   └── 11. Regular security testing
└── Security Policy
    └── 12. Information security policy
```

### 1.2 PCI-DSS 準拠レベル

|レベル |基準 |リクエスト |
|----------|----------|----------|
| **レベル 1** | >600万トランザクション/年 |年次オンサイト監査 (QSA) |
| **レベル 2** |年間 100 万～600 万のトランザクション |年次 SAQ、四半期スキャン |
| **レベル 3** | 20,000 ～ 100 万トランザクション/年 |年次 SAQ、四半期スキャン |
| **レベル 4** | <20K transactions/year | Annual SAQ |

### 1.3 PCI-DSS 準拠システムの設計

```
┌─────────────────────────────────────────────────────┐
│                  PCI-DSS SCOPE                       │
│  ┌─────────────────────────────────────────────┐    │
│  │         Cardholder Data Environment (CDE)    │    │
│  │                                               │    │
│  │  ┌──────────┐    ┌──────────┐   ┌─────────┐ │    │
│  │  │ Payment  │    │   HSM    │   │Tokenizer│ │    │
│  │  │ Service  │    │          │   │         │ │    │
│  │  └──────────┘    └──────────┘   └─────────┘ │    │
│  │                                               │    │
│  │  Network Segmentation (VLAN/Firewall)        │    │
│  └─────────────────────────────────────────────┘    │
│                                                      │
│  ┌─────────────────────────────────────────────┐    │
│  │         Connected Systems (Reduced Scope)    │    │
│  │  ┌──────────┐    ┌──────────┐               │    │
│  │  │ API GW   │    │ Logging  │               │    │
│  │  └──────────┘    └──────────┘               │    │
│  └─────────────────────────────────────────────┘    │
│                                                      │
│  Out of Scope: Wallet Service, Reporting, etc.      │
│  (if properly segmented)                             │
└─────────────────────────────────────────────────────┘
```

**戦略: トークン化により PCI スコープを最小限に抑える** - カード データを直ちにトークンに置き換え、他のサービスはトークンのみを処理します。

### 1.4 Tokenization Flow

```
Customer ─── PAN: 4111...1111 ───► Tokenizer ─── Token: tok_abc123 ──►
                                       │
                                  ┌────▼────┐
                                  │   HSM   │  (Hardware Security Module)
                                  │ Encrypt │
                                  │ & Store │
                                  └─────────┘

Everywhere else in the system: only tok_abc123 is used
PAN never leaves the CDE (Cardholder Data Environment)
```

---

## 2. PSD2 とオープン バンキング

### 2.1 PSD2 — Payment Services Directive 2

PSD2 は、銀行に API をサードパーティに公開することを要求する EU 指令です。

```
PSD2 Key Requirements:
├── Strong Customer Authentication (SCA)
│   ├── Knowledge (password, PIN)
│   ├── Possession (phone, token)
│   └── Inherence (biometrics)
│   → At least 2 of 3 factors required
│
├── Open Banking APIs
│   ├── Account Information Service (AIS)
│   ├── Payment Initiation Service (PIS)
│   └── Card-Based Payment Instrument (CBPII)
│
└── Consumer Protection
    ├── Reduced liability for unauthorized transactions
    ├── No surcharges for card payments
    └── Faster complaint resolution
```

### 2.2 3D Secure 2 (3DS2) — SCA Implementation

```
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│ Customer │   │ Merchant │   │  Card    │   │  Issuer  │
│          │   │  (PSP)   │   │ Network  │   │  Bank    │
└────┬─────┘   └────┬─────┘   └────┬─────┘   └────┬─────┘
     │              │              │              │
     │  Checkout    │              │              │
     ├─────────────►│              │              │
     │              │  3DS Auth    │              │
     │              ├─────────────►│              │
     │              │              │  Auth Req    │
     │              │              ├─────────────►│
     │              │              │              │
     │              │              │  Risk-based  │
     │              │              │  Decision    │
     │              │              │◄─────────────┤
     │              │              │              │
     │     Challenge (if needed)   │              │
     │◄────────────────────────────┤              │
     │  OTP/Biometric              │              │
     ├────────────────────────────►│              │
     │              │              │              │
     │              │  Auth Result │              │
     │              │◄─────────────┤              │
     │  Result      │              │              │
     │◄─────────────┤              │              │
```

---

## 3. ベトナム国立銀行の規制

### 3.1 法的枠組み

```
Hệ thống quy định FinTech tại Việt Nam:
├── Luật Ngân hàng Nhà nước (2010)
├── Luật Các tổ chức tín dụng (2024, sửa đổi)
├── Luật Giao dịch điện tử (2023)
├── Nghị định 101/2012 về thanh toán không dùng tiền mặt
│   └── Nghị định 35/2023 (sửa đổi)
├── Thông tư 39/2014 về trung gian thanh toán
├── Thông tư 23/2022 về dịch vụ ví điện tử
└── Sandbox FinTech (Nghị định 13/2023)
```

### 3.2 eウォレットの要件

|リクエスト |コンテンツ |
|---------|---------|
| **ライセンス** |ベトナム国立銀行から決済仲介業者としての認可を受ける必要がある
| **憲章資本** |最低 500 億 VND |
| **本人確認** | CCCD/eKYC による本人確認 |
| **制限** |未確認のウォレット: 1,000 万。検証済み: 1 億 |
| **リンク** |銀行口座にリンクされている必要があります |
| **レポート** |州立銀行への定期報告 |
| **アーカイブ** |トランザクションを最低 10 年間保存 |
| **安全** | SBV 情報セキュリティ基準に準拠する |

### 3.3 eKYC Requirements

```
eKYC Flow (theo quy định NHNN):
├── 1. Thu thập thông tin
│   ├── CCCD (Căn cước công dân gắn chip)
│   ├── NFC đọc chip CCCD
│   └── Video call / Liveness detection
├── 2. Xác minh
│   ├── OCR trích xuất thông tin CCCD
│   ├── Face matching (ảnh CCCD vs selfie)
│   ├── Liveness check (chống giả mạo)
│   └── Cross-check với CSDL quốc gia
├── 3. Phân loại rủi ro
│   ├── Low risk: Giao dịch < 10 triệu
│   ├── Medium risk: 10-100 triệu
│   └── High risk: > 1億（さらなる検証が必要）
━── 4. 保管と報告
    §── KYC 記録の保存期間は 5 年以上
    └── 規定に従ってSBVに報告する
```

---

## 4. Compliance Architecture

### 4.1 Compliance-by-Design Principles

```
┌─────────────────────────────┐
│ 設計によるコンプライアンス │
━━━━━━━━━━━━━━━━━━━━━━━━━━┤
│ │
│ 1. データの最小化 │
│ → 必要なデータのみ収集 │
│ │
│ 2. どこでも暗号化 │
│ → 保存中 (AES-256)、転送中 (TLS 1.3) │
│ │
│ 3. 監査証跡 │
│ → すべての変更に対する不変ログ │
│ │
│ 4. アクセス制御 │
│ → RBAC + 必知原則 │
│ │
│ 5. データの保持 │
│ → ポリシーに基づく保存と削除 │
│ │
│ 6. 同意管理 │
│ → 明示的な同意、簡単な撤回 │
│ │
━━━━━━━━━━━━━━━━━━━━━━━━┘
```

### 4.2 Audit Trail Design

```SQL
-- 不変の監査ログ テーブル
CREATE TABLE 監査ログ (
    id UUID 主キー デフォルト gen_random_uuid(),
    タイムスタンプ TIMESTAMPTZ NOT NULL DEFAULT NOW()、
    Actor_id UUID が NULL ではありません。
    Actor_type VARCHAR(50) NOT NULL、-- 'ユーザー'、'システム'、'管理者'
    アクション VARCHAR(100) NOT NULL、
    resource_type VARCHAR(100) NOT NULL、
    resource_id UUID が NULL ではありません。
    old_value JSONB、
    new_value JSONB、
    ip_address INET、
    user_agent テキスト、
    correlation_id UUID が NULL ではありません。
    -- UPDATE または DELETE は許可されません
    CHECK (アクション IN ('CREATE', 'UPDATE', 'DELETE', 'READ', 'EXPORT'))
);

-- 追加のみ: UPDATE と DELETE を取り消します。
app_user からの監査ログの更新を取り消し、削除します。
```

---

## 5. Compliance Monitoring & Reporting

### 5.1 Automated Compliance Checks

```ヤムル
コンプライアンスチェック:
  pci_dss:
    - 名前: 「保存時の暗号化」
      チェック: 「すべてのデータベースは AES-256 暗号化を使用します」
      頻度: 毎日
    - 名前: 「アクセスログ」
      チェック: 「すべての CDE アクセスがログに記録される」
      頻度: リアルタイム
    - 名前: 「脆弱性スキャン」
      チェック: 「ASV スキャンが完了しました」
      頻度: 四半期ごと

  んんん:
    - 名前: 「トランザクション制限」
      チェック: 「ウォレット制限が適用されています」
      頻度: リアルタイム
    - 名前: 「KYC 検証」
      チェック: 「制限を増やす前にすべてのユーザーが確認された」
      頻度: イベント時
    - 名前: 「規制報告」
      チェック：「月次レポートの提出」
      頻度: 毎月
```

---

## 概要

FinTechにおけるコンプライアンスは不可欠な基盤です。重要なポイント:
- **PCI-DSS**: トークン化、ネットワークのセグメント化により範囲を最小限に抑える
- **PSD2/SCA**: 強力な顧客認証のための 3D セキュア 2
- **ベトナムのSBV**: eKYC、ウォレット制限、定期レポート
- **設計原則**: データの最小化、暗号化、監査証跡

**次の記事**: **ペイメント ゲートウェイ アーキテクチャ**、つまりチェックアウトから決済までのエンドツーエンドの支払いフローの構築を開始します。
