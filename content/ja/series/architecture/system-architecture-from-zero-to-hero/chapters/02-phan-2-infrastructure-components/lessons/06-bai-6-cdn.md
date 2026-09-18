---
id: 019d8a21-c106-7001-d001-e1f2a3b4c506
title: 'レッスン 6: CDN (コンテンツ配信ネットワーク) - グローバル アクセラレーション'
slug: bai-6-cdn-content-delivery-network-tang-toc-toan-cau
description: >-
  CDN とは何ですか?またどのように機能しますか?プッシュ CDN とプル CDN の比較。キャッシュ無効化戦略。多層 CDN
  アーキテクチャ。エッジコンピューティング。 CloudFlare、AWS CloudFront、Fastly を比較します。ユースケースとアンチパターン。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 6
section_title: 'パート 2: インフラストラクチャ コンポーネント'
course:
  id: 019d8a21-c100-7001-d001-e1f2a3b4c5d6
  title: 'システムアーキテクチャ: ゼロからヒーローへ'
  slug: system-architecture-from-zero-to-hero
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-624" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-624)"/>

  <!-- Decorations -->
  <g>
    <circle cx="932" cy="266" r="20" fill="#f87171" opacity="0.11"/>
    <circle cx="764" cy="258" r="26" fill="#f87171" opacity="0.07"/>
    <circle cx="1096" cy="250" r="32" fill="#f87171" opacity="0.13"/>
    <circle cx="928" cy="242" r="8" fill="#f87171" opacity="0.09"/>
    <circle cx="760" cy="234" r="14" fill="#f87171" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <line x1="600" y1="86" x2="1100" y2="166" stroke="#f87171" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="116" x2="1050" y2="186" stroke="#f87171" stroke-width="0.5" opacity="0.08"/>
    <polygon points="971.507041555162,115.5 971.507041555162,156.5 936,177 900.492958444838,156.5 900.492958444838,115.50000000000001 936,95" fill="none" stroke="#f87171" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#f87171"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#f87171" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f87171">🏗️ アーキテクチャ — レッスン 6</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 6: CDN (コンテンツ配信ネットワーク) -</tspan>
      <tspan x="60" dy="42">グローバルな加速</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">システムアーキテクチャ: ゼロからヒーローへ</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 2: インフラストラクチャ コンポーネント</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## はじめに

サーバーがシンガポールにある場合、ハノイのユーザーはリクエストごとに往復で最大 50 ミリ秒待つ必要があります。米国のユーザーは最大 200 ミリ秒待つ必要があります。 CDN は、**できるだけユーザーの近くにコンテンツを配置**することで、この問題を解決します。

---

## 1.CDNとは何ですか?

CDN は、プロキシ サーバーのグローバルに分散されたネットワークであり、ユーザーに最も近い場所からコンテンツを提供します。

```
Không có CDN:
  User (Hà Nội) ──── 200ms ────► Origin Server (US)

Có CDN:
  User (Hà Nội) ──── 10ms ────► CDN Edge (Hà Nội)
                                    │ cache miss
                                    ▼
                              CDN Edge ── 200ms ──► Origin Server (US)
                                    │ cache result
                                    ▼
  User (Hà Nội) ──── 10ms ────► CDN Edge (Hà Nội)  ← Lần sau = 10ms!
```

### 1.1 CDN アーキテクチャ

```
                    Origin Server
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
         ┌────────┐ ┌────────┐ ┌────────┐
         │Regional│ │Regional│ │Regional│
         │  PoP   │ │  PoP   │ │  PoP   │
         │ (Asia) │ │  (EU)  │ │ (US)   │
         └───┬────┘ └───┬────┘ └───┬────┘
         ┌───┴───┐  ┌───┴───┐  ┌───┴───┐
         │Edge   │  │Edge   │  │Edge   │
         │Servers│  │Servers│  │Servers│
         └───────┘  └───────┘  └───────┘
             ▲           ▲          ▲
           Users       Users      Users
```

---

## 2. プッシュ CDN とプル CDN の比較

### 2.1 プッシュ CDN

```
Origin Server ──push──► CDN Edge
  Khi content thay đổi, origin chủ động push lên CDN

Flow:
  1. Developer deploy new image
  2. CI/CD pipeline push image to CDN
  3. CDN distributes to all edges
  4. User request → Edge server → Return immediately
```

|利点 |デメリット |
|----------|----------|
|コンテンツはいつでも利用可能 |プッシュプロセスを管理する必要があります |
| 「最初のリクエスト」の遅延はありません |すべてのエッジでストレージを消費します |
|フルコントロール |コンテンツが大幅に変更されると複雑になる |

**次の場合に最適:** 小さな変更がほとんどない静的コンテンツ

### 2.2 プル CDN

```
User ──request──► CDN Edge
  Edge: "Tôi không có content này"
  Edge ──request──► Origin Server
  Origin ──response──► Edge
  Edge: cache content + return to user

Lần sau:
  User ──request──► CDN Edge
  Edge: "Tôi có rồi!" → Return from cache
```

|利点 |デメリット |
|----------|----------|
|自動、管理不要 |最初のリクエストが遅い (キャッシュミス) |
|キャッシュ コンテンツのみが要求される | TTL 戦略が必要 |
|簡単なセットアップ |キャッシュスタンピードのリスク |

**最適な用途:** 動的コンテンツ、高トラフィック

---

## 3. キャッシュの無効化戦略

### 3.1 TTL (生存時間)

```
CDN cache product image với TTL = 1 giờ
  T=0:  User request → Cache MISS → Fetch from origin → Cache 1 giờ
  T=30m: User request → Cache HIT → Return cached
  T=61m: Cache expired → Fetch from origin → Cache lại

Trade-off: TTL ngắn = fresh hơn nhưng nhiều origin hits
           TTL dài = nhanh hơn nhưng content có thể cũ
```

### 3.2 キャッシュのパージ

```
CDN API: DELETE /cache?url=https://blog.xdev.asia/images/logo.png
→ Xóa content khỏi tất cả edge servers

Use case: Cập nhật logo, fix typo trong hình ảnh
```

### 3.3 キャッシュ無効化

```
Thay đổi URL khi content thay đổi:

Trước: /style.css
Sau:   /style.css?v=2
Hoặc:  /style.a1b2c3d4.css (hash trong filename)

→ CDN coi đây là content mới → fetch from origin
```

### 3.4 再検証中に失効する

```
Cache expired, nhưng:
  1. Trả cached content ngay (stale)
  2. Đồng thời fetch fresh content từ origin
  3. Update cache khi origin respond

→ User luôn nhận response nhanh
→ Content cuối cùng sẽ fresh
```

---

## 4. エッジ コンピューティング

```
Traditional CDN:
  Edge chỉ serve static files

Edge Computing:
  Edge chạy code (logic) tại edge location

Ví dụ Cloudflare Workers:
  - A/B testing tại edge
  - Geolocation-based redirects
  - Authentication tại edge
  - Image resizing tại edge
  - API response transformation
```

---

## 5. CDN プロバイダーの比較

|特長 |クラウドフレア | AWS クラウドフロント |早く |
|----------|-----------|-----------|----------|
| **ポップ** | 300+ | 450+ | 90+ |
| **エッジ コンピューティング** |労働者 |ラムダ@エッジ |コンピューティング@エッジ |
| **無料利用枠** |寛大 |限定 |なし |
| **価格** | $ | $$ | $$$ |
| **DDoS 保護** |内蔵 | AWS シールド |限定 |
| **こんな用途に最適** |一般、中小規模 | AWS エコシステム |パフォーマンス重視 |

---

## 6. CDN アンチパターン

|アンチパターン |問題 |ソリューション |
|---------------|--------|----------|
|パーソナライズされたコンテンツをキャッシュする |ユーザー A がデータを参照 ユーザー B |キャッシュ制御: プライベート |
| API の TTL が長すぎます |データが古い |短い TTL + 再検証中の失効 |
| API に CDN を使用しない |リモートの API が遅い | GET API をエッジでキャッシュする |
|すべての CDN | CDN 経由で POST/PUT/DELETE | GET リクエストのみの CDN |

---

## 概要

|コンセプト |重要なポイント |
|----------|---------------|
| CDN |ユーザーに最も近い場所からコンテンツを提供する |
|プッシュ vs プル |静的場合はプッシュ、動的場合はプル |
|キャッシュの無効化 | TTL + パージ + キャッシュ無効化 |
|エッジコンピューティング |エッジでロジックを実行し、レイテンシーを削減 |

---

## 演習

1. **CDN 戦略:** 製品画像 (変更はほとんどありません)、製品価格 (頻繁に変更されます)、ユーザー プロファイル (パーソナライズされた) を考慮して、電子商取引サイトの CDN 戦略を設計します。

2. **キャッシュの無効化:** ブログ プラットフォームは、作成者が編集したらすぐに投稿を更新する必要があります。キャッシュ無効化戦略を設計します。

3. **コストの見積もり:** Web サイトは 1 日あたり 1,000 万ページビューあり、各ページは 2MB (500KB HTML + 1.5MB 画像) です。推定 CDN 帯域幅/月とコスト (CloudFront: $0.085/GB)。
