---
id: 02760001-ba01-4001-a004-000000000002
title: "BA のための REST API とデータ検証：API コントラクトとデータ品質ルールの理解"
slug: rest-api-data-validation-ba
excerpt: >-
  BA は API をコード化する必要はありませんが、リクエスト/レスポンス、エラーハンドリング、
  データコントラクト、検証ルールを理解する必要があります。このガイドは BA が OpenAPI 仕様を読み、
  API 設計をレビューし、AI 機能のデータ品質受け入れ基準を作成するのに役立ちます。
featured_image: /images/blog/rest-api-data-validation-ba.webp
type: blog
reading_time: 9
view_count: 0
meta: null
published_at: '2026-05-05T13:00:00.000000Z'
created_at: '2026-05-05T13:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: API, slug: api}, {name: Technical, slug: technical}, {name: Data Quality, slug: data-quality}]
comments: []
---

多くの BA は、開発者が API、データベーススキーマ、データ検証について話すときに目を通します。その後、仕様は詳細が不足しています。このガイドは BA が API コントラクトをレビューし、データ品質要件を作成する自信を得るのに役立ちます。

---

## 1. BA が API を理解する必要があるのはいつか？

常にではありませんが、確実に理解すべき場合：
- AI 機能が外部サービスからの API を消費する場合（LLM API、決済ゲートウェイ、ナレッジベース）
- BA がフロントエンド ↔ バックエンド間のデータコントラクトを検証する必要がある場合
- エラーハンドリング用の受け入れ基準を作成する場合（タイムアウト、無効な応答）
- ソースデータベースからのデータ品質ルールをレビューする場合

---

## 2. 基本的なリクエスト/レスポンス

すべての API 呼び出しは以下で構成されます：

```
Request:
  - Method (GET, POST, PUT, DELETE)
  - URL/Endpoint
  - Headers (authorization, content-type)
  - Body (JSON, form data)

Response:
  - Status code (200, 400, 500, etc.)
  - Headers
  - Body (通常は JSON)
```

**実世界の例 — AI モデル API を呼び出す：**

```bash
POST /v1/messages
Content-Type: application/json
Authorization: Bearer YOUR-API-KEY

{
  "model": "claude-opus-4-7",
  "max_tokens": 1024,
  "messages": [{"role": "user", "content": "What is BA?"}]
}

Response (200 OK):
{
  "id": "msg_123",
  "content": [{"type": "text", "text": "Business Analyst is..."}],
  "usage": {"input_tokens": 50, "output_tokens": 200},
  "stop_reason": "end_turn"
}
```

**BA がチェックすべきこと：**
- 必須フィールドは何か？（model、max_tokens）
- レスポンスのフィールドは何か？（id、content、usage）
- データ型：string vs number vs object?

---

## 3. BA が知るべき HTTP ステータスコード

| コード | 意味 | ハンドリング |
|------|------|----------|
| **200** | OK — 成功 | レスポンスを処理 |
| **400** | Bad request — 無効な入力 | 送信前に入力を検証 |
| **401** | Unauthorized — 認証失敗 | API キーを確認 |
| **403** | Forbidden — 権限なし | ユーザー権限を確認 |
| **404** | Not found | エンドポイント URL を確認 |
| **429** | Rate limit exceeded | 遅延後に再試行 |
| **500** | Server error — API サービスダウン | 再試行、エスカレーション |
| **503** | Service unavailable | 再試行、フォールバック |

**AC の例：**

```gherkin
Scenario: API が 429（レート制限）を返す
Given AI サービスが 1 分間に 100 リクエストを処理済み
When ユーザーが 101 番目のリクエストを送信
Then API は Retry-After: 60 ヘッダー付きでステータス 429 を返す
And システムは「リクエストが多すぎます。60 秒後にもう一度お試しください。」というメッセージを表示
And ユーザーが緊急の場合、人間エージェントにエスカレーション
```

---

## 4. エラーハンドリング＆冪等性

### エラーハンドリング

AI API が失敗した場合、明確なポリシーが必要です：

```
Scenario: AI API タイムアウト
Given タイムアウト閾値 = 30 秒
When AI サービスが 30 秒以内に応答しない
Then:
  - タイムアウト例外をトリガー
  - リクエスト ID でエラーをログ
  - retry_count < 3 の場合：再度再試行
  - それ以外：人間エージェントにエスカレーション
  - ユーザーに通知：「処理に時間がかかっています。専門家がお手伝いします。」
```

### 冪等性

同じリクエストが再試行時に 2 回処理されないこと（支払い、AI 料金で重要）：

```json
{
  "idempotency_key": "request_12345_user_789",
  "messages": [...]
}
```

**BA がチェックすべき：** ネットワークが失敗してシステムが自動再試行した場合、2 回課金されませんか？

---

## 5. データ検証受け入れ基準

AI システムに入力するデータは検証に合格する必要があります。BA は各ルールの AC を作成します：

```gherkin
Scenario: メール検証
Given ユーザーがフォームにメールアドレスを入力
When メール形式が無効（例："user@"）
Then システムは「無効なメール形式です」というエラーを表示
And フォームは送信されない

Scenario: 電話検証
Given 電話番号フィールドは数字のみを受け入れる
When ユーザーが文字を入力
Then システムは拒否して再試行を求める

Scenario: AI 入力サニタイゼーション
Given AI 機能がユーザーテキスト入力を受け取る
When テキストに SQL インジェクションペイロードが含まれる（例："'; DROP TABLE users;"）
Then テキストは プロンプトに追加される前にエスケープ/サニタイズされる必要がある
And DB コマンドは実行されない
```

---

## 6. データ品質ルール

BA が開発開始前に定義すべきルール：

```
データ品質チェックリスト：
☐ Null ハンドリング：どの null 値が許可されているか？どれが必須か？
☐ 範囲：数値フィールドの最小/最大値
☐ フォーマット：メール正規表現、電話パターン、日付形式
☐ 一意性：どのフィールドがデータベース全体で一意である必要があるか？
☐ 参照整合性：外部キー制約
☐ 鮮度：最大データ経過時間？
```

**実世界の例 — AI 機能がナレッジベースを使用：**

```
ナレッジベースのデータ品質：
- Document ID：必須、一意
- Content：必須、文字数 50～50000
- Language：必須、[en、vi、ja、zh-tw] のいずれか
- Last updated：必須、日時、30 日以上古くない
- Embedding version：必須、現在のモデル バージョンと一致
- Accuracy tag：オプション、enum [verified、draft、deprecated]

アラート条件：30 日以上古いドキュメントが 5% を超える場合、レビュー ワークフローをトリガー
```

---

## 7. OpenAPI 仕様 — 本質的な理解

OpenAPI（Swagger）は API をドキュメント化するための標準です：

```yaml
openapi: 3.0.0
info:
  title: AI Message API
  version: 1.0
paths:
  /v1/messages:
    post:
      summary: AI にメッセージを送信
      parameters:
        - name: Authorization
          in: header
          required: true
          schema: { type: string }
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                model: { type: string }
                messages: { type: array }
              required: [model, messages]
      responses:
        '200':
          description: 成功
          content:
            application/json:
              schema:
                type: object
                properties:
                  id: { type: string }
                  content: { type: array }
        '400':
          description: Bad request
```

**BA が仕様でチェックすべきこと：**
- どのエンドポイントが必須で、どれがオプションか？
- リクエスト本文の必須フィールドは何か？
- レスポンス構造は何か？
- 考えられるエラー コードは何か？

ツール：Swagger UI、Postman — 直接テストするために使用します。

---

## まとめ

現代の BA が API コントラクトを読む必要があるのは以下の理由から：
1. **データ統合の検証**：フロントエンド/バックエンドが正しく通信する
2. **エラーハンドリング AC の作成**：システムが API 障害をどのように処理するか？
3. **データ品質の定義**：どの受け入れ基準、どの拒否基準？
4. **より速い トラブルシューティング**：QA がバグを報告したとき、BA は調査方法を知っている

API をコード化する必要はありませんが、OpenAPI 仕様をレビューし、エラー シナリオのテスト ケースを作成し、データ品質の受け入れ基準を定義するのに十分です。
