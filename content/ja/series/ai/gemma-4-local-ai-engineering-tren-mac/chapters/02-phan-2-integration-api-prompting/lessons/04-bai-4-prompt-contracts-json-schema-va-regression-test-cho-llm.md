---
id: 01970001-bb04-7004-d004-bb0400001004
title: 'レッスン4：LLM向けプロンプトコントラクト、JSONスキーマ＆リグレッションテスト'
slug: bai-4-prompt-contracts-json-schema-va-regression-test-cho-llm
description: >-
  ユースケース別のプロンプトコントラクトを定義し、出力スキーマを強制し、
  プロンプトやモデル変更時の品質を制御するリグレッションテストスイートを構築する。
duration_minutes: 95
is_free: true
video_url: null
sort_order: 1
section_title: "パート2：Integration - API、プロンプティング＆アプリ組み込み"
course:
  id: 01970001-aa11-7011-b011-aa1100001011
  title: Gemma 4 ローカルAIエンジニアリング on Mac
  slug: gemma-4-local-ai-engineering-tren-mac
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-1957" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-1957)"/>
  <g>
    <circle cx="933" cy="269" r="16" fill="#c084fc" opacity="0.14"/>
    <circle cx="766" cy="262" r="35" fill="#c084fc" opacity="0.13"/>
    <circle cx="1099" cy="255" r="24" fill="#c084fc" opacity="0.12"/>
    <circle cx="932" cy="248" r="13" fill="#c084fc" opacity="0.11"/>
    <circle cx="765" cy="241" r="32" fill="#c084fc" opacity="0.1"/>
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
    <line x1="600" y1="59" x2="1100" y2="139" stroke="#c084fc" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="89" x2="1050" y2="159" stroke="#c084fc" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1038.444863728671,192 1038.444863728671,226 1009,243 979.555136271329,226 979.555136271329,192 1009,175" fill="none" stroke="#c084fc" stroke-width="1" opacity="0.12"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#c084fc"/>
  <rect x="80" y="50" width="99" height="28" rx="14" fill="#c084fc" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#c084fc">🧠 AI &amp; ML — L1</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン4：プロンプトコントラクト、</tspan>
      <tspan x="60" dy="42">JSONスキーマ＆LLMリグレッションテスト</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Gemma 4 ローカルAIエンジニアリング on Mac</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート2：Integration - API、プロンプティング＆アプリ組み込み</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## はじめに

多くのチームが失敗するのは、モデルが弱いからではなく、プロンプトに明確なコントラクトがないからです。プロンプトが変更されると、出力がドリフトし、アプリがサイレントに壊れます。

## 1. プロンプトコントラクトとは

プロンプトコントラクトは4つの部分で構成されます：

- 役割とタスクの範囲
- 入力フォーマット
- 出力フォーマット
- データ不足時のフェイルビヘイビア

フェイルビヘイビアの例：でっち上げずに、「データ不足」のような正確なフレーズを返す。

## 2. 出力用JSONスキーマ

アクションアイテム抽出のスキーマ例：

```json
{
  "type": "object",
  "required": ["summary", "items"],
  "properties": {
    "summary": {"type": "string"},
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["task", "owner"],
        "properties": {
          "task": {"type": "string"},
          "owner": {"type": "string"},
          "deadline": {"type": "string"}
        }
      }
    }
  }
}
```

モデル出力を受信した直後にスキーマを検証します。

## 3. ゴールデンテストの設計

以下を含むテストファイルを作成：

- 入力プロンプト
- 含まれるべき内容
- 含まれてはいけない内容
- スキーマのパス/フェイル

プロンプトやモデルを変更するたびに、テストスイート全体を再実行します。

## 4. エラー分類

- フォーマットエラー：スキーマに一致しない
- グラウンディングエラー：コンテキストに準拠しない
- セーフティエラー：機密データを返す
- インストラクションエラー：システムの制約を無視する

明確なエラーコードは時間の経過とともにトレンドを追跡するのに役立ちます。

## 5. プロンプトバージョニング

以下のルールを適用：

- すべてのプロンプトにバージョンコードを付与
- 各変更の簡潔な変更履歴
- 品質が低下した場合のクイックロールバック

バージョンを保存せずにプロダクションのプロンプトを直接編集しないでください。

## デモコード

プロンプトコントラクトテスト結果 — 6/6パス：

![プロンプトコントラクトテスト](/images/blog/gemma4-series-demo/04-prompt-contract-tests.webp)

> ソースコード：[03-prompt-contracts](https://github.com/xdev-asia-labs/gemma-4-local-ai-engineering-on-mac/tree/main/03-prompt-contracts)

## まとめ
