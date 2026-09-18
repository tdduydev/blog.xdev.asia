---
id: 02760001-ba02-4001-a012-000000000001
title: 'ソフトウェア BA の BPMN と UML: ビジネスが理解し、開発者が実装できるようにワークフローを描く'
slug: bpmn-uml-workflow-modeling-software-ba
excerpt: >-
  BA はあらゆる種類の図を描く必要はありませんが、BPMN、アクティビティ図、シーケンス図、状態図、ドメイン
  モデルをいつ使用するかを知っておく必要があります。この記事では、図を選択する方法、たとえば、引き継ぎ前に図を確認するためのスケジュールとチェックリストを設定する方法について説明します。
featured_image: /images/blog/uml-bpmn-ai-assisted-flows.webp
type: blog
reading_time: 16
view_count: 0
meta: null
published_at: '2026-05-06T10:20:00.000000Z'
created_at: '2026-05-06T10:20:00.000000Z'
author:
  id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf
  name: Duy Tran
  avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg
category:
  id: 019c9616-cat1-7001-a001-000000000001
  name: AI
  slug: ai
tags:
  - name: BA
    slug: ba
  - name: BPMN
    slug: bpmn
  - name: UML
    slug: uml
  - name: Modeling
    slug: modeling
  - name: Software BA
    slug: software-ba
comments: []
locale: ja
---
図は文書を装飾するためのものではありません。優れた図は、チームが迅速に対応するのに役立ちます。

- ここからどこまでのプロセスはどこに行くのですか？
- 誰がどのステップを担当しますか?
- どのシステムが関係していますか?
- ステータスはどのように変化しますか？
- どの API/サービスがどのサービスを呼び出すか?
- エラーが発生した場合、どちらに進むべきですか?

BA はソリューション アーキテクトになる必要はありませんが、ソフトウェア BA は誤解を減らすために適切な種類の図を選択する方法を知っておく必要があります。

## 1. BPMN はどのような場合に使用されますか?

BPMN は、多くのアクター、多くのステップ、多くの意思決定分岐を含む **ビジネス プロセス**を記述する必要がある場合に適しています。

たとえば:

- 保険請求の承認プロセス。
- 顧客のオンボーディング プロセス。
- 検査予約のプロセス。
- 返金処理プロセス。
- KYC検証プロセス。

OMG によると、BPMN はビジネス プロセス図を使用してビジネス プロセスを記述するための標準表記法であり、ビジネスにとって理解しやすいだけでなく、技術ユーザーにとっても十分正確です。

BA は、主な質問が次のような場合に BPMN を使用する必要があります: **ビジネスはどのように運営されていますか?**

## 2. UML はいつ使用されますか?

UML にはさまざまな種類の図があります。 BA は通常、いくつかのタイプのみを必要とします。

|ダイアグラム | | の場合に使用します。
|---|---|
|ユースケース図 |主要なアクターと機能を特定する必要がある |
|アクティビティ図 | BPMN より表記を減らして、より単純な処理フローを記述する必要がある |
|シーケンス図 |ユーザー、UI、API、サービス、外部システム間のインタラクションを記述する必要がある |
|状態図 |注文、チケット、請求、予約のステータスのライフサイクルを説明する必要があります |
|クラス/ドメインモデル |エンティティ、属性、ビジネス関係を統合する必要がある

BA は、「プロフェッショナル」だと感じるという理由だけで UML を描画すべきではありません。答える必要がある質問に応じて図を選択してください。

## 3. 例: 予約スケジュール機能

### BPMN レベルのビジネス

目標: ビジネスはエンドツーエンドのプロセスを理解します。

```text
Patient -> Search doctor -> Select slot -> Submit booking
System -> Check slot availability
Gateway:
  - Slot available -> Create appointment -> Send confirmation
  - Slot unavailable -> Show alternative slots
Clinic staff -> Review appointment list
```

このレベルでは、BA は次のことを実証する必要があります。

- プール/レーン: 患者、システム、クリニックのスタッフ。
- ゲートウェイ: スロットが利用可能/利用不可。
- イベント: 予約が送信され、確認が送信されました。
- 例外: 支払いが失敗した、スロットの有効期限が切れた、医師が不在。

### シーケンス図レベルのソフトウェア

目標: 開発者は、システムがどのように相互作用するかを理解します。

```text
User -> Web App: Submit booking
Web App -> Booking API: POST /appointments
Booking API -> Schedule Service: reserveSlot(slotId)
Schedule Service -> Database: lock slot
Booking API -> Notification Service: send confirmation
Booking API -> Web App: appointmentId + status
```

このレベルでは、BA はアーキテクチャを決定する必要はありませんが、次のことを示す必要があります。

- どの外部システムが関係していますか?
- 送信されるデータ。
- ビジネスで処理する必要があるエラーはどれですか?
- UI が表示する必要がある応答。

### 状態図レベルのライフサイクル

目標：販売状況を統一する。

```text
Draft -> Pending Confirmation -> Confirmed -> Checked In -> Completed
Confirmed -> Cancelled
Pending Confirmation -> Expired
Confirmed -> No Show
```

移行のたびに、BA は次のことを尋ねる必要があります。

- ステータスを変更できるのは誰ですか?
――移籍の条件は何ですか？
- 監査ログはありますか?
―何かお知らせはありますか？
- 返金や手数料はありますか?

## 4. 図にはテキストを添付する必要があります

図だけでは十分ではないことがよくあります。各図には次のものが必要です。

- 目的: この図はどのような質問に答えますか?
- 範囲: 範囲内/範囲外。
- 凡例: 特別な記号がある場合。
- 仮定。
- 関連するビジネス ルール。
- 自由な質問。
- バージョンと所有者。

例えば：

```markdown
Diagram: Appointment Booking BPMN v1.2
Purpose: Align future-state booking workflow before sprint planning.
Scope: Online booking for outpatient consultation.
Out of scope: Insurance claim, offline booking, recurring appointment.
Owner: BA + Clinic Ops Lead
Approved by: Product Owner
```

## 5. チェックリストの検討図

図を送信する前に、次のことを確認してください。

- 図には明確な目的がありますか?
- アクター/レーンだけで十分ですか?
- 開始/終了イベントはありますか?
- ゲートウェイには明確な条件がありますか?
- 例外フローが表現されているか?
・状態遷移にガード条件はありますか？
- 図は読者にとって詳細すぎますか?
- ユーザー ストーリー/SRS へのマッピングはありますか?
- バージョンと更新日はありますか?
- ビジネス関係者は BA の説明を必要とせずに理解できますか?

## 6. よくあるエラー

**エラー 1: 1 つの図がすべての質問に答えようとする**

BPMN は、企業がプロセスを理解するのに役立ちます。技術チームが相互作用を理解するためのシーケンス図。ライフサイクルを理解するための状態図。 1 つの図ですべてを実行することを強制しないでください。

**エラー 2: ハッピー パスを描画し、例外を忘れています**

ソフトウェアのバグは、例外の中に潜んでいることがよくあります。スロットが他の人によって予約されたばかりである、支払いのタイムアウト、ユーザーがブラウザを閉じた、外部 API がダウンしているなどです。

**エラー 3: 図が要件と同期していません**

ユーザーストーリーが一方的に言い、BPMN が一方的に言い、テストケースが一方的に言ってしまうと、チームは BA 文書に対する信頼を失うことになります。図はトレースするか、少なくとも SRS/バックログでレビューする必要があります。

## フルパッケージモデルの例

機能: 相談のスケジュールを変更します。

### BPMN の概要

```text
Customer lane:
  Open appointment detail -> Click Reschedule -> Select new slot -> Confirm

System lane:
  Validate owner -> Validate appointment status -> Validate cutoff -> Validate slot
  Gateway:
    All valid -> Update appointment -> Release old slot -> Lock new slot -> Send notification
    Invalid owner -> Return 403
    Cutoff expired -> Show hotline message
    Slot unavailable -> Show alternative slots

CSKH lane:
  Handle exception for cutoff-expired case if customer calls hotline
```

### 状態遷移

|から |イベント |条件 |大きい |
|---|---|---|---|
|確認済み |顧客のスケジュール変更 |オーナー、4 時間以上、新しいスロットが利用可能 |確認済み |
|確認済み |顧客がキャンセル |オーナー、4 時間以上 |キャンセルされました |
|確認済み |時間が経つ |予約時間に達しましたが、顧客が不在 |ノーショー |
|確認済み |コンサルティングはセッションを完了します |セッションが完了しました |完了 |

### シーケンスの概要

```text
Customer -> Web App: confirm reschedule(new_slot_id)
Web App -> Appointment API: PATCH /appointments/{id}/reschedule
Appointment API -> Auth Service: check owner
Appointment API -> Schedule Service: reserve new slot + release old slot
Appointment API -> Audit Log: write old_slot/new_slot
Appointment API -> Notification Service: send reschedule email
Appointment API -> Web App: updated appointment
```

このダイアグラム パッケージは、各チームが自分の部分を正しく読み取るのに役立ちます。ビジネスは BPMN を確認し、開発はシーケンス/API タッチポイントを確認し、QA は状態遷移と例外パスを確認します。

## 練習問題を練習する

返金、スケジュール、レビューなどのプロセスを選択します。作成:

1. 少なくとも 2 つのレーンと 2 つのゲートウェイを備えた将来の BPMN。
2. メインオブジェクトの状態図。
3. ハッピーパスのシーケンス図。
4. 利害関係者に問い合わせる必要がある、不明瞭な例外フロー 5 つのリスト。

## 参照元

- OMG BPMN 仕様: https://www.omg.org/spec/BPMN
- OMG BPMN の概要: https://www.omg.org/bpmn/
- OMG UML 仕様: https://www.omg.org/spec/UML/
- IIBA BABOK ガイド: https://www.iiba.org/standards-and-resources/babok/

## 結論

良い図とは、最も美しい図ではなく、適切な人々が正しい決定を下すのに役立つ図です。 BA は、ビジネスを調整するために BPMN を使用し、システムの動作を記述するのに十分な UML を使用し、常に図を要件、ルール、テスト ケースと結び付ける必要があります。
