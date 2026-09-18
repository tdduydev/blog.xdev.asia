---
id: 02770003-omop-cdm5-b001-000000000001
title: "OMOP CDM 概要：RWE のためになぜ医療データを標準化する必要があるのか"
slug: omop-cdm-tong-quan-vi-sao-can-chuan-hoa
excerpt: >-
  Real-World Evidence（RWE）は FDA、EMA、各国規制当局の意思決定の在り方を変えつつあります。
  OMOP CDM は、1 つの研究を世界中の数百組織で同時に実行できるデータ標準です。
  本記事では OHDSI、CDM 5.4、そしてベトナムにおける文脈を紹介します。
featured_image: /images/blog/omop-overview-featured.webp
type: blog
reading_time: 14
view_count: 0
meta: null
published_at: '2026-05-07T15:00:00.000000Z'
created_at: '2026-05-07T15:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat7-7007-a007-000000000007, name: Kiến trúc hệ thống, slug: architecture}
tags: [{name: OMOP, slug: omop}, {name: OHDSI, slug: ohdsi}, {name: CDM, slug: cdm}, {name: Healthcare, slug: healthcare}]
comments: []
---

2026 年現在、世界中で **8 億人を超える患者** のデータが OMOP Common Data Model に標準化されています。FDA Sentinel、EMA DARWIN EU、EHDEN（欧州 200+ データパートナー）、N3C（米国 COVID-19）はいずれも OMOP を採用しています。本記事では OMOP がなぜ重要なのか、そして決定 3516/QĐ-BYT に基づく電子カルテ（HSDT）展開を進めるベトナムにとってなぜ適しているのかを解説します。

## 1. RWD と RWE — 本質的な違い

- **RWD（Real-World Data）**：EHR、ベトナム健康保険（BHYT）クレーム、レジストリ、ウェアラブル、健康アプリから得られる生の医療データ
- **RWE（Real-World Evidence）**：文脈と科学的厳密性を備えたインサイトで、臨床的・規制的な意思決定に利用可能なもの

例：
- RCT（臨床試験）が答えるのは「選択された 1000 人の患者で薬 A は有効か？」
- RWE が答えるのは「ベトナムの 100 万人の患者における実臨床下で薬 A は RCT と何が違うか？年齢／性別／併存疾患でどう変わるか？」

重要な臨床課題のうち RCT がカバーしているのは 5% 未満であり、それゆえ RWE は不可欠です。

## 2. なぜ Common Data Model が必要か

![2. なぜ Common Data Model が必要か](/images/blog/diagrams/omop-cdm-tong-quan-vi-sao-can-chuan-hoa-d01.webp)

5 つの利点：
1. **マルチソース解析**：1 つの研究を 200 組織で同時実行（federated）
2. **再現性（Reproducibility）**：R/SQL コードがすべての CDM 上で同一に動作
3. **統一された Vocabulary**：ICD/SNOMED/RxNorm/LOINC があらかじめマッピング済み
4. **オープンソースのツール**：ATLAS、HADES、DQD、Achilles はすべて無料
5. **ネットワーク**：EHDEN や OHDSI ワーキンググループに参加でき、サポートが得られる

## 3. OMOP と OHDSI の歴史

![3. OMOP と OHDSI の歴史](/images/blog/diagrams/omop-cdm-tong-quan-vi-sao-can-chuan-hoa-d02.webp)

OHDSI = Observational Health Data Sciences and Informatics。企業ではなく、Apache 2.0 で運営されるオープンコミュニティで、ワーキンググループ、ネットワーク研究、年次シンポジウムを擁します。

## 4. OHDSI スタック 2026

![4. OHDSI スタック 2026](/images/blog/diagrams/omop-cdm-tong-quan-vi-sao-can-chuan-hoa-d03.webp)

## 5. CDM 5.4 — グループ別 37 テーブル

| グループ | 代表的なテーブル |
|---|---|
| **Clinical Data** | PERSON, VISIT_OCCURRENCE, CONDITION_OCCURRENCE, DRUG_EXPOSURE, PROCEDURE_OCCURRENCE, MEASUREMENT, OBSERVATION, DEVICE_EXPOSURE, NOTE, NOTE_NLP, SPECIMEN, DEATH, EPISODE |
| **Health System** | LOCATION, CARE_SITE, PROVIDER |
| **Health Economics** | PAYER_PLAN_PERIOD, COST |
| **Standardized Vocabularies** | CONCEPT, VOCABULARY, DOMAIN, CONCEPT_RELATIONSHIP, CONCEPT_ANCESTOR, CONCEPT_SYNONYM, CONCEPT_CLASS, RELATIONSHIP, DRUG_STRENGTH |
| **Derived Elements** | DRUG_ERA, DOSE_ERA, CONDITION_ERA, COHORT, COHORT_DEFINITION |
| **Metadata** | CDM_SOURCE, METADATA |

PERSON が中心であり、すべての臨床イベントは外部キー `person_id` を持ちます。

## 6. Vocabulary — CDM の心臓

OMOP は独自の Vocabulary を作りません。国際標準を採用し、各概念に対して **1 つの Standard Concept** を選定します：

| Domain | Standard Vocabulary | 一般的な Source |
|---|---|---|
| Condition | SNOMED CT | ICD-10、ICD-9 |
| Drug | RxNorm（米国）/ RxNorm Extension | NDC、ATC、ベトナム医薬品リスト |
| Procedure | SNOMED CT、CPT4、ICD-10-PCS | ベトナム DVKT |
| Measurement | LOINC、SNOMED CT | ローカル検査コード |
| Observation | SNOMED CT、LOINC | ローカル |
| Unit | UCUM | ローカル |
| Visit | SNOMED CT（visit subset） | ローカル |

ETL では source code → standard concept_id にマッピングする必要があります。トレーサビリティのため、source code は `*_source_value` に保持されます。

## 7. OMOP の Use case

| Use case | 実例 |
|---|---|
| **Drug safety** | Sentinel が市販後すべての薬の副作用を監視 |
| **Comparative effectiveness** | 糖尿病に対する Metformin + SGLT2 vs Metformin + DPP4 |
| **Patient-Level Prediction** | 30 日以内の再入院予測 |
| **Disease characterization** | 希少疾患の疫学記述 |
| **Health economics** | BHYT 対象人口の医療費分析 |
| **AI/ML training** | 標準化されたコホートを clinical LLM のデータセットに |

## 8. 他の CDM との比較

| CDM | コミュニティ | 強み | OMOP より弱い点 |
|---|---|---|---|
| **OMOP** | OHDSI、オープン | Vocabulary、federated、ツール | — |
| **i2b2** | Harvard / コミュニティ | UI が標準装備 | Vocabulary 標準化が弱い |
| **PCORnet** | 米国 PCORI | シンプル、claim 向き | 深い解析に限界 |
| **Sentinel** | 米国 FDA | 医薬品安全性監視 | クローズド、FDA 限定 |
| **CDISC** | 試験データ | 臨床試験申請 | RWE には不向き |

OMOP は最も包括的で、FDA・EMA でも採用されており、これが投資すべき理由です。

## 9. ベトナムにおける文脈

決定 3516/QĐ-BYT（2025 年 11 月）— 医療デジタルトランスフォーメーション 2025-2030：
- 国家医療データシステム
- VNeID 上の電子カルテ HSDT（2026 年 1 月時点で 3,400 万件以上）
- BHYT 電子化のフルカバレッジ
- エビデンスに基づく研究の推進

OMOP は国家研究データレイクに非常に適しています：
- 複数ソース（公立病院、民間病院、BHYT、レジストリ）を同時に標準化可能
- Federated 解析を可能にし、機微データを移動させる必要がない
- オープンソースでベンダーロックインなし
- OHDSI コミュニティのサポートが得られる

いくつかの研究グループ（VNU-HCM、ハノイ医科大学病院、公衆衛生研究所）はすでに試験運用を始めています。先駆者になる絶好の機会です。

## 10. OMOP は FHIR を置き換えるのか？

いいえ、補完関係です。[HL7 FHIR Practitioner ロードマップ](/roadmap/hl7-fhir) も参照してください：

| 観点 | FHIR | OMOP |
|---|---|---|
| 目的 | 業務上の交換 | 解析／RWE |
| Schema | 独立した Resource（50+ resource type） | 37 テーブルの正規化リレーショナル |
| Vocabulary | 柔軟な CodeableConcept | 必須の Standard Concept |
| Transport | REST API | DB 上の SQL／ファイルエクストラクト |
| Real-time | 可能（Subscription、CDS Hooks） | 不可（バッチ ETL） |
| Use case | EHR、モバイル、テレメディシン | ネットワーク研究、ML、BI |

同一組織内では両方を使うべきです — FHIR をオペレーション層に、OMOP を分析層に。ブリッジについては [FHIR ↔ OMOP](/blog/omop-fhir-mapping-bridge) を参照してください。

## 11. どこから始めるか

1. Book of OHDSI を読む（無料・オープンソース）
2. Eunomia（CDM サンプル R パッケージ）をインストールして SQL を練習
3. Athena（athena.ohdsi.org）で concept をルックアップ
4. Broadsea（ATLAS + WebAPI + Postgres の Docker compose）を構築
5. OHDSI フォーラムに参加

## まとめ

OMOP CDM は次世代の医療研究のためのデータ標準です。OHDSI コミュニティはオープンで、ツールは無料、そしてベトナムには国家研究データレイクを構築する大きなチャンスがあります。今こそ OMOP を学ぶに値する投資のタイミングです。

次の記事：[OMOP、FHIR、i2b2、PCORnet、Sentinel の比較 — どの CDM を選ぶか](/blog/omop-vs-fhir-vs-i2b2-pcornet) · または [OMOP CDM Practitioner ロードマップ](/roadmap/omop-cdm) を参照。
