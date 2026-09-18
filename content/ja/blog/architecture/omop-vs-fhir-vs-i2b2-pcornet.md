---
id: 02770003-omop-cdm5-b001-000000000002
title: "OMOP、FHIR、i2b2、PCORnet、Sentinel の比較：どの CDM を選ぶか"
slug: omop-vs-fhir-vs-i2b2-pcornet
excerpt: >-
  あなたの組織にはどの Common Data Model が適していますか？本記事では OMOP、FHIR、i2b2、PCORnet、Sentinel を
  Schema、Vocabulary、ガバナンス、ツール、Use case の観点から詳しく比較し、選定のためのデシジョンツリーを提示します。
featured_image: /images/blog/omop-vs-other-cdm-featured.webp
type: blog
reading_time: 13
view_count: 0
meta: null
published_at: '2026-05-07T15:30:00.000000Z'
created_at: '2026-05-07T15:30:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat7-7007-a007-000000000007, name: Kiến trúc hệ thống, slug: architecture}
tags: [{name: OMOP, slug: omop}, {name: HL7 FHIR, slug: hl7-fhir}, {name: Healthcare, slug: healthcare}, {name: CDM, slug: cdm}]
comments: []
---

「OMOP、FHIR、i2b2 のどれを使うべきか？」— これは医療データの旅を始めるあらゆる組織で出る質問です。「すべてに当てはまる答え」はありません。本記事は use case に応じて正しく選ぶための指針を示します。

## 1. 医療 CDM のマップ

![1. 医療 CDM のマップ](/images/blog/diagrams/omop-vs-fhir-vs-i2b2-pcornet-d01.webp)

## 2. 比較表

| 観点 | OMOP | FHIR | i2b2 | PCORnet | Sentinel |
|---|---|---|---|---|---|
| Owner | OHDSI（オープン） | HL7（オープン） | Harvard（オープン） | PCORI（米） | FDA（米） |
| 開発開始年 | 2008 | 2014 | 2007 | 2014 | 2008 |
| 主目的 | マルチソース RWE | 業務交換 | セルフサービスクエリ | プラグマティック試験 | 医薬品安全性 |
| Schema | 37 テーブルのリレーショナル | Resource（REST） | スタースキーマ（fact + dim） | フラットな表形式 | フラットな表形式 |
| Vocabulary | Standard Concept（標準化） | CodeableConcept（柔軟） | ローカル | ローカル + 標準 | ローカル |
| オープンツール | ATLAS、HADES、DQD、ACHILLES | HAPI、Cerner SMART | i2b2 web client | 自前構築 | クローズド |
| Real-time | ❌ | ✅ | ❌ | ❌ | ❌ |
| Federated network | ✅ EHDEN、DARWIN、OHDSI | ⚠ Bulk Export 経由 | ✅ SHRINE | ✅ DRN | ✅ |
| Best for | 観察解析 | EHR／モバイル／クラウド | 病院内クエリ | プラグマティック RCT | 市販後安全性監視 |
| Adoption 2026 | 8 億人患者 | 業界全体 | ~200 サイト | ~70 サイト | FDA 内部 |
| ベトナムのコミュニティ | 立ち上がり期 | 急速に拡大中 | 限定的 | なし | なし |

## 3. 本質的な違い

### 3.1 Schema の思想

![3.1 Schema の思想](/images/blog/diagrams/omop-vs-fhir-vs-i2b2-pcornet-d02.webp)

OMOP = 正規化されたリレーショナル DB → SQL 解析に最適。
FHIR = ドキュメント指向の Resource → API 交換に最適。

### 3.2 Vocabulary

OMOP はあらゆるコードを Standard Concept にマッピングすることを **必須** とします（例：ICD-10 → SNOMED）。FHIR は **必須ではなく**、内部で一貫性が保てればローカルコードシステムを使うこともできます。

→ OMOP は ETL コストが高い反面、解析能力ははるかに優れます。

### 3.3 Federated と Centralized

OMOP では、データを移動させずに研究を実行できます（R 製の study package を各パートナーがローカル実行し、結果のみ集約）。**ベトナム個人データ保護法 2025**（2026 年 1 月 1 日施行、政令 13/2023/NĐ-CP を継承・強化）が機微データの国内保管と特別な処理同意を要求するベトナムの状況に極めて適しています。

![3.3 Federated と Centralized](/images/blog/diagrams/omop-vs-fhir-vs-i2b2-pcornet-d03.webp)

## 4. デシジョンツリー

![4. デシジョンツリー](/images/blog/diagrams/omop-vs-fhir-vs-i2b2-pcornet-d04.webp)

## 5. ハイブリッドパターン：FHIR + OMOP

これは 2026 年で最も一般的なパターンです：

![5. ハイブリッドパターン：FHIR + OMOP](/images/blog/diagrams/omop-vs-fhir-vs-i2b2-pcornet-d05.webp)

→ EHR の業務系には FHIR（リアルタイム、Web／モバイルに優しい）、研究データレイクには OMOP（federated 解析）。詳細は [FHIR ↔ OMOP ブリッジ](/blog/omop-fhir-mapping-bridge) を参照。

## 6. なぜ OMOP が RWE で勝つのか

![6. なぜ OMOP が RWE で勝つのか](/images/blog/diagrams/omop-vs-fhir-vs-i2b2-pcornet-d06.webp)

比較のポイント：i2b2 はコミュニティが小さく更新も少ない、PCORnet はより米国向けのクローズド寄り、Sentinel は FDA のみ、CDISC は試験申請専用。

## 7. OMOP を選ばないケース

- ニーズが **EHR をリアルタイム交換するだけ** → FHIR で十分
- **データセットが非常に小さい**（数百人規模）→ 直接 SQL クエリの方がシンプル
- **FDA への新薬申請** → SDTM が必須
- **米国の医薬品安全性監視** → Sentinel
- **データエンジニアがいない** 組織 → OMOP の ETL は投資が必要

## 8. ベトナム向けの推奨

| 組織 | 推奨 |
|---|---|
| 大規模公立病院 | FHIR（業務）+ OMOP（研究 DWH） |
| 民間病院 | まずは FHIR で十分、RWE 研究を始める段階で OMOP |
| 研究機関 | OMOP を中心に、複数の病院パートナーから ETL |
| BHYT／監督官庁 | 国家データレイクとして OMOP、病院との交換に FHIR |
| AI 医療スタートアップ | FHIR + OMOP — 連携には FHIR、学習データには OMOP |

## 9. CDM 間の Migration

以下からのマイグレーションが可能です：
- **i2b2 → OMOP**：Georgia Tech の i2b2-to-OMOP ツール
- **PCORnet → OMOP**：Duke の既製 ETL
- **FHIR → OMOP**：FHIR-OMOP-on-FHIR（HL7 + OHDSI）
- **Sentinel → OMOP**：より深い解析が必要になり移行

ツールの充実度から、OMOP は最終目的地となることが多いです。

## 10. コミュニティリソース

- **OHDSI Forum** — 24 時間以内に回答が得られる
- **Book of OHDSI** — 無料の教科書
- **EHDEN Academy** — 無料のオンライン講座
- **OHDSI Symposium** — 年次、バーチャルトラックあり
- **Working groups** — Vocabulary、Themis（ETL 規約）、AI/ML、Vietnam（まだ存在せず、誰かが立ち上げる絶好のチャンス！）

## まとめ

CDM はゼロサムではありません。2026 年の多くの組織は FHIR と OMOP を併用しています — FHIR を業務に、OMOP を解析に。ベトナムで RWE、AI 臨床トレーニング、公衆衛生研究をやりたいなら、OMOP は十分に投資する価値のある選択です。

次の記事：[標準化 Vocabulary と Athena — OMOP CDM の心臓](/blog/omop-standardized-vocabularies-athena)。
