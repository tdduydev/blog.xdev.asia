---
id: 02760001-ba02-4001-a007-000000000001
title: BA のセキュリティ、プライバシー、コンプライアンス要件
slug: security-privacy-compliance-requirements-ba
excerpt: >-
  BA はセキュリティ エンジニアである必要はありませんが、仕様の欠落を避けるために、認証、認可、監査ログ、データ
  マスキング、同意、保持、PII/PHI/PCI、およびコンプライアンスに関する要件を記述する方法を知っている必要があります。
featured_image: /images/blog/responsible-ai-requirements.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-06T10:00:00.000000Z'
created_at: '2026-05-06T10:00:00.000000Z'
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
  - name: Security
    slug: security
  - name: Privacy
    slug: privacy
  - name: Compliance
    slug: compliance
  - name: Requirements
    slug: requirements
comments: []
locale: ja
---
多くの BA は、セキュリティ/プライバシーはテック リードまたはセキュリティ チームの仕事だと考えています。はい、彼らは広範囲に設計とテストを行っています。しかし、元の要件に、どのデータが機密であるか、誰が閲覧できるか、誰がエクスポートできるか、保存期間、およびどのような監査が実行されるかが明確に記載されていない場合、技術チームは簡単に欠陥のある構造を構築してしまいます。

BA はペネトレーションテストを知る必要はありませんが、適切な質問をし、要件を十分に明確に記述する方法を知る必要があります。

## 1. BA は何に注意する必要がありますか?

主な要件グループ:

|グループ | BA は説明が必要です |
|---|---|
|認証 |ユーザーはどのようにログインしますか? SSO/MFA? |
|認可 |どの役割で何ができるのか？ |
|データ分類 | PII/PHI/支払い/機密データは何ですか? |
|プライバシー |同意、保持、削除、マスキング |
|監査 |どのようなアクションを記録し、どのくらいの期間保存しますか? |
|コンプライアンス | GDPR、PDPA、HIPAA、PCI-DSS または内部ポリシー |
|事件 |漏洩や不正な権限があった場合にエスカレーションするにはどうすればよいですか? |

## 2. 認証と認可

認証応答: **あなたは誰ですか?**

認証の答え: **何ができるのですか?**

要件の例:

```text
AUTHN-001:
User nội bộ phải đăng nhập bằng SSO công ty. Nếu user truy cập từ thiết bị mới, hệ thống yêu cầu MFA.

AUTHZ-001:
Chỉ role Finance Manager được approve refund trên 50 triệu VND.
```

一般的な言葉で書かないでください:

> システムは分散化されている必要があります。

RBAC行列で書いてみましょう。

## 3. RBAC マトリックスのサンプル

|役割 |顧客を見る |顧客の編集 |輸出顧客 |顧客を削除 |
|---|---:|---:|---:|---:|
|サポートエージェント |はい、マスクされています |いいえ |いいえ |いいえ |
|サポートマネージャー |はい |はい |いいえ |いいえ |
|コンプライアンス責任者 |はい |いいえ |はい |いいえ |
|管理者 |はい |はい |はい |はい、承認を得て |

表からの要件:

```text
AUTHZ-004:
Support Agent chỉ được xem email và số điện thoại ở dạng masked, ví dụ du***@mail.com và 090***123.
```

## 4. データの分類

BA は SRS でデータを正しく分類する必要があります。

|タイプ |例 |取り扱い方法 |
|---|---|---|
|パブリック |製品名・よくある質問 |ワイドに表示可能 |
|内部 |運用報告 |内部のみ |
|機密 |約定価格、マージン |権限制限 |
|個人情報 |電子メール、電話番号、CCCD |マスキング、同意、保持 |
|ファイ |健康記録 |厳しい規制 |
|お支払い |カードデータ、取引 | PCI-DSS、トークン化 |

分類がないと、開発/QA は、どのデータをマスクする必要があるか、どのログに生の値を記録すべきではないか、どのエクスポートに承認が必要かがわかりません。

## 5. プライバシー要件 BA は忘れっぽいです

### 同意

```text
PRIV-001:
Trước khi dùng email khách hàng cho marketing, hệ thống phải ghi nhận explicit consent gồm user_id, timestamp, consent_version và channel.
```

### 保持

```text
PRIV-002:
Chat transcript chứa PII chỉ được lưu tối đa 180 ngày, sau đó phải anonymize hoặc xóa theo policy.
```

### 削除リクエスト

```text
PRIV-003:
Khi khách gửi yêu cầu xóa dữ liệu, hệ thống tạo ticket DSAR và hoàn tất trong SLA 30 ngày nếu không có ràng buộc pháp lý giữ lại.
```

### データの最小化

```text
PRIV-004:
Form đặt lịch không được yêu cầu CCCD nếu quy trình chỉ cần tên, số điện thoại và email.
```

## 6. 監査ログの要件

優れた監査ログでは、次のような答えが得られます。

- 誰がやったの？
- 何をするの？
- いつ？
- どこから？
- ビフォー/アフターデータとは何ですか?
- 操作が敏感な場合、その理由は何ですか?

例えば：

```text
AUD-001:
Khi user export danh sách khách hàng, hệ thống phải ghi audit log gồm user_id, role, timestamp, IP, filter sử dụng, số dòng export và file_id.
```

注: 監査ログには、生のパスワード、トークン、完全なカード番号、または不要な機密データを記録しないでください。

## 7. 要件の遵守

BA は弁護士ではありませんが、BA は適切なタイミングでコンプライアンスの責任者を連れてくる必要があります。

チェックリスト:

- [ ] データはどの国/地域に属しますか?
- [ ] 子供、健康、財務、支払いに関するデータはありますか?
- [ ] ベンダー/サードパーティがデータを処理しますか?
- [ ] 国境を越えた転送はありますか?
- [ ] データの削除依頼はありますか？
- [ ] 義務的な監査/報告はありますか?
- [ ] 従う必要のある内部ポリシーはありますか?

## 8. セキュリティの許容基準

ストーリーの例:

> サポート マネージャーとして、エスカレーションされたチケットを解決できるように顧客プロファイルを表示したいと考えています。

AC には次のものが必要です。

```gherkin
Scenario: Support Manager xem hồ sơ
Given user có role Support Manager
When user mở hồ sơ khách hàng
Then hệ thống hiển thị thông tin đầy đủ theo quyền
And ghi audit log hành động view_profile

Scenario: Support Agent xem hồ sơ
Given user có role Support Agent
When user mở hồ sơ khách hàng
Then email và số điện thoại được masked
And nút Export không hiển thị

Scenario: User không có quyền
Given user không thuộc team Support
When user truy cập URL hồ sơ khách hàng
Then hệ thống trả 403 và ghi security event
```

## 9. よくあるエラー

**エラー 1: 「承認に従って」のみを書き込みます**

分散化にはマトリックスが必要です。そうでなければ、誰もがそれを異なるように理解します。

**エラー 2: エクスポートを忘れました**

多くのスクリーンセーバー システムは見た目は優れていますが、CSV のエクスポート範囲が広すぎます。

**エラー 3: 機密データのログが多すぎる**

監査は必要ですが、生の PII/トークン/パスワードを記録することは大きなリスクです。

**エラー 4: プライバシーは後ほど**

プライバシーを放置すると、多くの場合、データ モデル、UI、同意フロー、雇用維持の変更にコストがかかります。

## スケジュール設定のセキュリティ/プライバシーの例

アクセスマトリックス:

|役割 |カレンダーを見る |カレンダーを作成する |スケジュールの変更・キャンセル |電話番号を表示 |エクスポート |
|---|---|---|---|---|---|
|お客様 |私のカレンダーだけ |はい |カットオフルールに従って私のカレンダーだけ |私のもの |いいえ |
|コンサルティング |割り当てられたスケジュール |いいえ |いいえ |マスクされた |いいえ |
|カスタマーケア |顧客カレンダー |ゲストの変更があります | SOP に従ってはい |サポートする理由がある場合はフル |いいえ |
|セールスマネージャー |チームダッシュボード |いいえ |いいえ |マスクされた |はい、監査が必要です |
|管理者 |フル |はい |はい |フル |はい、承認が必要です |

セキュリティの許容基準:

```gherkin
Scenario: Customer tries to view another customer's appointment
  Given customer A is logged in
  When customer A opens /appointments/APT-of-customer-B
  Then the system returns 403
  And no appointment details are displayed
  And a security event is logged
```

プライバシー要件:

| ID |要件 |
|---|---|
| PRIV-001 |予約フォームでは氏名、メールアドレス、電話番号、およびオプションの相談理由のみを収集します。 |
| PRIV-002 |サービスに必要でない場合、コンサルタントが機密情報を要求すべきではない理由。 |
| PRIV-003 |予約データは内部ポリシーに従って 7 年間保管され、法的義務がない場合は匿名化されます。 |
| PRIV-004 |電子メール/SMS リマインダーには機密情報は含まれておらず、時間、コンサルタント、カレンダー管理リンクのみが含まれています。 |
| AUD-001 |予定データをエクスポートするたびに、user_id、役割、タイムスタンプ、フィルター、行番号、理由を記録する必要があります。 |

BA は、開発者が「どの役割が何を参照できるのか」を疑問に思うことなく、SRS またはセキュリティ要件セクションにこのセクションを含める必要があります。

## 参照元

- IIBA BABOK ガイド: https://www.iiba.org/standards-and-resources/babok/
- IEEE/ISO/IEC 29148-2018: https://standards.ieee.org/ieee/29148/6937/

## 結論

セキュリティ、プライバシー、コンプライアンスは要件の一部ではありません。デジタル製品の場合、それは品質の一部です。優れた BA は、自分自身をセキュリティの専門家であるとは考えていませんが、早めに質問し、明確な要件を作成し、スプリントが始まる前に適切な人材をレビューに参加させる方法を知っています。
