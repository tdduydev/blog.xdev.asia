---
id: 02770003-omop-cdm5-b001-000000000010
title: "ベトナム向け OMOP：BHYT、HSDT、ICD-10 VN、54 民族、決定 3516/QĐ-BYT、個人データ保護法 2025"
slug: omop-viet-nam-bhyt-hsdt
excerpt: >-
  OMOP CDM はベトナムにどう適合するのか。本記事では政策（決定 3516/QĐ-BYT、ベトナム個人データ保護法 2025、
  診察治療法 15/2023、VNeID 上の HSDT）、保健省コードのマッピング、カスタム vocabulary、
  および国家研究データレイクのロードマップを分析します。
featured_image: /images/blog/omop-vietnam-featured.webp
type: blog
reading_time: 15
view_count: 0
meta: null
published_at: '2026-05-07T19:30:00.000000Z'
created_at: '2026-05-07T19:30:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat7-7007-a007-000000000007, name: Kiến trúc hệ thống, slug: architecture}
tags: [{name: OMOP, slug: omop}, {name: Vietnam Health, slug: vietnam-health}, {name: Healthcare, slug: healthcare}, {name: RWE, slug: rwe}]
comments: []
---

ベトナムの 2026 年は OMOP に大きな機会をもたらす 3 つの要素が収束しています：政策（決定 3516/QĐ-BYT）、データ規模（VNeID 上の HSDT 3,400 万件超、ベトナム健康保険（BHYT）のフルカバレッジ）、そして開かれた OHDSI コミュニティです。本記事では政策からコードまで、ベトナムへの OMOP 導入方法を分析します。

## 1. 2026 年の政策背景

![1. 2026 年の政策背景](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d01.webp)

### 1.1 決定 3516/QĐ-BYT（2025 年 11 月）

2030 年目標：
- すべての公的医療機関に HIS、EMR を導入
- 統一された国家医療データシステム
- 医療における AI、ビッグデータの推進
- 保健省 - 社会保険 - VNeID 間のデータ連携
- RWD を活用したエビデンスベース研究の促進

OMOP は RWD/RWE 目標に対して **自然な選択肢** です。

### 1.2 ベトナム個人データ保護法 2025（2026 年 1 月 1 日施行）

> **2026 年アップデート**：個人データ保護法（2025 年 6 月 26 日、第 9 回国会セッション通過）は **2026 年 1 月 1 日より政令 13/2023/NĐ-CP を継承・強化** し、行政罰の強化（年商の最大 5%）、影響評価（DPIA）の義務化、越境データ移転のより厳格な規定を追加しました。

医療データ処理（機微個人データ — *sensitive personal data*）の要件：
- 目的ごとの具体的かつ独立した同意（research consent）
- at-rest、in-transit の暗号化（必須）
- すべてのアクセスの監査ログ、最低 5 年保存
- 国内保管；越境移転には同意 + データ保護当局への通知
- 大規模処理組織には DPO 必須
- 新たな目的を導入する前に DPIA 必須
- データ削除/修正リクエストへの対応メカニズム

CCCD（市民 ID）/BHYT の pseudonymize は OMOP `person_source_value` での必須要件。

### 1.3 診察治療法 15/2023/QH15（2024 年 1 月 1 日施行）

- 医療施設に電子カルテ（EMR）導入をロードマップに沿って義務化
- 個人健康データは患者の権利 → 研究での共有には同意が必要
- 適切な手順で pseudonymize された場合、医療データの研究利用が可能
- 個人データ保護法と組み合わせ → 国家研究 OMOP CDM 構築の十分な法的基盤。

## 2. OMOP 向けベトナムソースデータ

![2. OMOP 向けベトナムソースデータ](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d02.webp)

## 3. ベトナム vocabulary のマッピング

### 3.1 既存の標準にマップできるカテゴリ

| ベトナムカテゴリ | 対応する標準 | ソース |
|---|---|---|
| ICD-10 VN（保健省） | Maps to を経由して ICD-10 → SNOMED | 保健省更新、WHO 由来 |
| 薬剤一般名 | RxNorm Ingredient | ATC → RxNorm マップ |
| 有効成分名 | RxNorm Ingredient | |
| 測定単位 | UCUM | ほぼ標準 |
| LOINC test | LOINC | 一部病院ラボで使用済み |

### 3.2 カスタム vocabulary が必要なもの

| ベトナムカテゴリ | カスタム化の理由 | 戦略 |
|---|---|---|
| 54 民族 | 対応 concept なし | Vocabulary `VN_DANTOC`（54 concept） |
| 省/県/区 | 標準と一致せず | 3 階層 vocabulary `VN_GEO` |
| BHYT 種別 | 米国 Payer と一致せず | Vocabulary `VN_BHYT`（強制 BHYT、世帯、生徒、…） |
| 病院ランク | concept なし | カスタム care_site setting |
| 保健省薬剤目録 2025 | RxNorm へのマップが必要 | USAGI マッピング + 伝統薬向けカスタム |
| 医療技術目録 | カスタム procedure コード | USAGI → SNOMED procedure |

### 3.3 VN_DANTOC vocabulary の作成

```sql
INSERT INTO vocabulary (vocabulary_id, vocabulary_name, vocabulary_reference, vocabulary_version, vocabulary_concept_id) VALUES
  ('VN_DANTOC', 'Danh mục dân tộc Việt Nam', 'TCVN 54', '1.0', 2000000001);

INSERT INTO concept VALUES
  (2000000001, 'Vietnamese ethnicities (vocabulary)', 'Metadata', 'VN_DANTOC', 'Vocabulary', 'C', 'OMOP generated', NULL, NULL, NULL, NULL),
  (2000001001, 'Kinh', 'Race', 'VN_DANTOC', 'Race', 'S', '01', NULL, NULL, NULL, NULL),
  (2000001002, 'Tày', 'Race', 'VN_DANTOC', 'Race', 'S', '02', NULL, NULL, NULL, NULL),
  (2000001003, 'Thái', 'Race', 'VN_DANTOC', 'Race', 'S', '03', NULL, NULL, NULL, NULL),
  -- ... 54 民族
  (2000001054, 'Dân tộc khác', 'Race', 'VN_DANTOC', 'Race', 'S', '99', NULL, NULL, NULL, NULL);
```

Concept_id は 20 億以上（OHDSI がカスタム用に予約した範囲）。

### 3.4 伝統薬 vocabulary

ベトナムには RxNorm にない伝統薬（YHCT）が多数あります。カスタム vocabulary `VN_YHCT`：

```sql
INSERT INTO concept VALUES
  (2000020001, 'Cảm xuyên hương', 'Drug', 'VN_YHCT', 'Branded Drug', 'S', 'YHCT001', ...),
  (2000020002, 'Hoạt huyết Nhất Nhất', 'Drug', 'VN_YHCT', 'Branded Drug', 'S', 'YHCT002', ...);
```

標準化のために保健省伝統医療管理局との連携が必要。

## 4. HSDT（VNeID）の ETL パターン

VNeID 上の HSDT（電子健康記録）は比較的 FHIR ライクな構造を持ちます：

![4. HSDT（VNeID）の ETL パターン](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d03.webp)

注意点：
- HSDT はサマリーのみ — フル EMR ではない
- → HSDT から構築される CDM は高レベルの visit/condition のみで、drug/measurement の詳細は含まない
- 詳細は病院 EMR で補完

## 5. BHYT の ETL パターン

![5. BHYT の ETL パターン](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d04.webp)

BHYT データの利点：
- 大規模カバレッジ（約 9,500 万人）
- 良いコード化（保健省準拠）
- 長い履歴（10 年超）

制約：
- バイタルサイン、検査値なし
- 症状なし（診断のみ）
- バイアス：BHYT で受診した人のみ

→ フルな RWE には EMR とペアで使用。

## 6. ベトナムでの RWE ユースケース

| 質問 | ソースデータ | 手法 |
|---|---|---|
| ベトナム人高血圧治療プロトコルの有効性 | EMR + BHYT | CohortMethod (PLE) |
| 糖尿病集団における脳卒中リスク予測 | EMR + lab | PatientLevelPrediction (PLP) |
| 地域別がん疫学の記述 | BHYT + Registry | Characterization |
| COVID ワクチン副作用追跡 | HSDT + EMR | SCCS |
| 不適切な抗生物質処方率 | EMR + 薬剤ガイドライン | カスタム analytic |
| 併存症別の医療費 | BHYT + Cost | 医療経済学 |
| 希少疾患に関する DARWIN EU 研究への参加 | OMOP CDM | Strategus + 集計共有 |

## 7. 国家データレイクのロードマップ

![7. 国家データレイクのロードマップ](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d05.webp)

パイロットパターン：
1. 代表的な 5〜10 病院を選定（地域、ランク、専門）
2. 各病院に OMOP CDM 構築（federated）
3. 中央コーディネーターがネットワーク研究を実行
4. 価値を実証するモデル研究を発表
5. 段階的に拡大

## 8. ガバナンスパターン

![8. ガバナンスパターン](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d06.webp)

ベトナムは **OHDSI Vietnam chapter** を設立する必要 — OHDSI で公式 working group として登録。

## 9. person ID の Pseudonymize

```sql
-- 生 CCCD は保存しない
person_source_value = encode(
  hmac(
    cccd::bytea, 
    current_setting('app.cccd_secret')::bytea, 
    'sha256'
  ),
  'hex'
);

-- 鍵は別の Vault で保管
-- 再識別には複数当事者承認が必要（DPO + IRB）
```

病院間で同じハッシュアルゴリズム + secret を使用 → CCCD を露出せずに **レコードリンクが可能**。

## 10. ベトナムリソース

| Resource | Note |
|---|---|
| 決定 3516/QĐ-BYT 2025 | 2025-2030 医療デジタル変革政策 |
| ベトナム個人データ保護法 2025 | 2026 年 1 月 1 日施行、政令 13/2023 を置換 |
| 診察治療法 15/2023/QH15 | 2024 年 1 月 1 日施行、EMR 義務化 |
| 政令 13/2023/NĐ-CP | 基盤（2026 年から個人データ保護法に置換） |
| SNOMED CT VN ポータル | アフィリエイト登録（無料） |
| ICD-10 VN 目録 | 保健省公開 |
| 保健省薬剤目録 | 年次更新 |
| 医療技術目録 | 保健省公開 |
| OHDSI フォーラム | VN スレッドに参加（始動中） |
| Book of OHDSI | 無料の教科書 |
| EHDEN Academy | 無料の OMOP コース |

## 11. ベトナム向け個人ロードマップ

1. Book of OHDSI を読む（1 か月）
2. Eunomia をインストールし SQL を実践（2 週間）
3. Broadsea をローカルにインストール（1 週間）
4. ベトナムモック 1000 患者でテスト CDM を構築（1 か月）
5. USAGI で ICD-10 VN → SNOMED マッピング（2 週間）
6. ATLAS + DQD + ACHILLES を実行（1 週間）
7. HADES R を学習：CohortMethod、PLP（2 か月）
8. OHDSI Symposium に参加（年次バーチャルトラックは無料）
9. ベトナム CDM で小規模研究をリード（3〜6 か月）
10. OHDSI Vietnam chapter を提案

## 12. 構築すべきコミュニティ

![12. 構築すべきコミュニティ](/images/blog/diagrams/omop-viet-nam-bhyt-hsdt-d07.webp)

## 13. ベトナム特有の落とし穴

- ❌ ICD-10 VN を SNOMED 経由せず直接 `condition_concept_id` にマップ → analytic がネットワーク化不可
- ❌ CCCD の pseudonymize を忘れる → 個人データ保護法 2025 違反（罰則は年商の最大 5%）
- ❌ カスタム concept で 20 億未満の ID を使用 → 標準と衝突
- ❌ vocabulary バージョンをバックアップしない → 過去研究を再現不可
- ❌ 海外でデータ保管 → 越境データ規定違反
- ❌ YHCT（伝統薬）を無視 → drug exposure を過小評価するバイアス
- ❌ BHYT の種別が複数あることを忘れる → analytic が正しく層別化できない

## まとめ

ベトナムの 2026-2030 年は、OMOP 上に国家医療研究データレイクを構築する機会があります — オープンソース、federated、ネットワーク親和的で、**個人データ保護法 2025**（2026 年 1 月 1 日施行）、**診察治療法 15/2023**、**決定 3516/QĐ-BYT** に適合します。ベトナム vocabulary、ガバナンス、コミュニティへの投資が必要です。OHDSI Vietnam chapter は、ベトナムが EHDEN や DARWIN EU と肩を並べるための原動力になるでしょう。

→ [OMOP CDM Practitioner ロードマップ](/roadmap/omop-cdm) に戻り、5〜9 か月の体系的な学習計画をご覧ください。
