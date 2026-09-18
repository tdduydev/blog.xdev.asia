---
id: 01970001-bb02-7002-d002-bb0200001002
title: 'レッスン2：MacでGemma 4をOllamaとOpen WebUIでセットアップ'
slug: bai-2-setup-gemma-4-voi-ollama-va-open-webui-tren-mac
description: >-
  Apple Siliconでのランタイムフルインストール、RAM別モデル設定、
  QA・PM・コンテンツチーム向け内部チャットUIのデプロイ。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 1
section_title: "パート1：Foundation - Gemma 4 ローカルスタック"
course:
  id: 01970001-aa11-7011-b011-aa1100001011
  title: Gemma 4 ローカルAIエンジニアリング on Mac
  slug: gemma-4-local-ai-engineering-tren-mac
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-8762" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-8762)"/>
  <g>
    <circle cx="688" cy="214" r="36" fill="#fbbf24" opacity="0.09"/>
    <circle cx="776" cy="102" r="20" fill="#fbbf24" opacity="0.13"/>
    <circle cx="864" cy="250" r="34" fill="#fbbf24" opacity="0.07"/>
    <circle cx="952" cy="138" r="18" fill="#fbbf24" opacity="0.11"/>
    <circle cx="1040" cy="286" r="32" fill="#fbbf24" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <line x1="600" y1="74" x2="1100" y2="154" stroke="#fbbf24" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="104" x2="1050" y2="174" stroke="#fbbf24" stroke-width="0.5" opacity="0.08"/>
    <polygon points="999.1147367097487,159.5 999.1147367097487,188.5 974,203 948.8852632902513,188.5 948.8852632902513,159.5 974,145" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.12"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fbbf24"/>
  <rect x="80" y="50" width="99" height="28" rx="14" fill="#fbbf24" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🧠 AI &amp; ML — L1</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン2：MacでGemma 4を</tspan>
      <tspan x="60" dy="42">OllamaとOpen WebUIでセットアップ</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Gemma 4 ローカルAIエンジニアリング on Mac</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート1：Foundation - Gemma 4 ローカルスタック</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## はじめに

このレッスンでは、動作するローカルスタックをセットアップします：

- モデルランタイムとしてのOllama
- プライマリモデルとしてのGemma 4
- チーム全体のチャットインターフェースとしてのOpen WebUI

## 1. Ollamaのインストール

```bash
brew install ollama
brew services start ollama
curl http://127.0.0.1:11434/api/tags
```

エンドポイントがJSONを返せば、ランタイムの準備は完了です。

## 2. Gemma 4モデルのプル

```bash
ollama pull gemma4
ollama run gemma4
```

RAMが少ないマシンでは、スワップ圧力を避けるために量子化バリアントを選択してください。

## 3. Open WebUIの実行

```bash
docker run -d \
  --name open-webui \
  -p 3000:8080 \
  -e OLLAMA_BASE_URL=http://host.docker.internal:11434 \
  -v open-webui:/app/backend/data \
  --restart unless-stopped \
  ghcr.io/open-webui/open-webui:main
```

`http://localhost:3000`にアクセスし、最初の管理者アカウントを作成します。

## 4. モデルプリセットの標準化

ユースケース別にプリセットを作成：

- コーディング：低い温度、やや高いコンテキスト
- 要約：中程度の温度、短いフォーマット
- 抽出：低い温度、固定JSON出力

新しいチームメンバーが正しいデフォルトを使用できるよう、プリセットを内部ドキュメントに保存します。

## 5. Macでのリソースモニタリング

3つを追跡します：

- メモリプレッシャー
- スワップ使用量
- 実際のトークン/秒

スワップが急増したら、より深い最適化を試みる前に`num_ctx`またはモデルサイズを削減してください。

## 6. クイックトラブルシューティング

1. DockerがOllamaに接続できない：`host.docker.internal`を使用する。
2. モデルが徐々に遅くなる：スワップとバックグラウンドアプリを確認する。
3. UIにモデルが表示されない：`ollama list`と`OLLAMA_BASE_URL`を確認する。

## 演習

- フルスタックをインストールし、エンドポイントの図をキャプチャする。
- 3つの異なるユースケースのモデルプリセットを3つ作成する。
- 同じ長いプロンプトを2回連続で実行して速度を比較する。

## デモコード

インストール後、ヘルスチェックエンドポイントを確認：

![ヘルスチェック](/images/blog/gemma4-series-demo/02-health-check.webp)

Swagger UIが自動的にAPIドキュメントを生成：

![Swaggerドキュメント](/images/blog/gemma4-series-demo/02-swagger-docs.webp)

> ソースコード：[xdev-asia-labs/gemma-4-local-ai-engineering-on-mac](https://github.com/xdev-asia-labs/gemma-4-local-ai-engineering-on-mac)

## まとめ
