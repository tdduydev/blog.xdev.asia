---
id: 01970000-b2c3-8d4e-f5a6-789012345def
title: 'Gemma 4：Googleが誇る最強オープンAIモデル — アジェンティックワークフロー、オンデバイス、Apache 2.0'
slug: gemma-4-most-powerful-google-open-ai-model-agentic-edge
excerpt: Google DeepMindがGemma 4を発表——Arena AIでオープンモデル世界第3位を獲得したオープンモデルファミリー。アジェンティックワークフロー、ビジョン、オーディオ、140以上の言語をサポートし、Raspberry PiからH100 GPUまでオンデバイスで動作。4サイズ（E2B、E4B、26B MoE、31B Dense）のアーキテクチャ分析、ベンチマーク比較、デプロイガイド。
featured_image: /images/blog/gemma-4-featured.webp
type: blog
reading_time: 15
view_count: 0
meta: null
published_at: '2026-04-03T10:00:00.000000Z'
created_at: '2026-04-03T10:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: AI, slug: ai}, {name: LLM, slug: llm}, {name: Machine Learning, slug: machine-learning}, {name: Deep Learning, slug: deep-learning}]
locale: ja
comments: []
---

2026年4月2日、Google DeepMindはこれまでで最も強力なオープンAIモデルファミリー、**Gemma 4** を正式にリリースしました。**Apache 2.0** ライセンスのもと、**アジェンティックワークフロー**、**ビジョン＆オーディオ**、**140以上の言語**をサポートし、Raspberry Piからスマートフォンまであらゆるデバイス上で動作するGemma 4は、単なるアップグレードではなく、オープンソースAIのゲームチェンジャーです。

その結果は明白です。31Bモデルはオープンモデル部門でArena AIランキングの**世界第3位**に輝き、パラメータ数で**20倍以上**大きなモデルを凌駕しています。26B MoEモデルは**第6位**を獲得。そしてエッジ版のE2Bは、わずか**1.5GB未満のRAM**でスマートフォン上でも快適に動作します。

本記事では、アーキテクチャ、機能、ベンチマーク、エコシステム、そして今日からGemma 4を使い始める方法について総合的に分析します。

* * *

## 1. Gemma 4とは？

Gemma 4は、Google DeepMindが開発した大規模言語モデル（LLM）ファミリーです。**Gemini 3**と同じ技術・研究をベースにしながらも、**ユーザーのハードウェア上で動作する**ことを前提に設計されています。

初代Gemmaのリリース以来、シリーズは**4億回以上ダウンロード**され、コミュニティによる**10万以上のバリアント**からなる**Gemmaverse**エコシステムが形成されました。Gemma 4はこのシリーズ最大の進化です。

### 設計哲学

Gemma 4は、数千億パラメータを擁する巨大モデルを追い求めません。代わりに、Googleは**パラメータあたりの知性**——つまりパラメータ1つあたりの最大知性——に注力しています。目標は、はるかに低い要件のハードウェアでフロンティアレベルの能力を実現することです。

* * *

## 2. 4つのサイズ、4つのユースケース

GoogleはGemma 4を、異なるハードウェアセグメント向けに設計された**4つのバリアント**でリリースしています。

| モデル | アーキテクチャ | コンテキストウィンドウ | 対象ハードウェア | 主な特徴 |
|-------|-----------|----------------|--------------------|--------------------|
| **E2B** (Effective 2B) | コンパクト | 128K | スマートフォン、IoT、Raspberry Pi | Audio + Vision、<1.5GB RAM |
| **E4B** (Effective 4B) | コンパクト | 128K | スマートフォン、タブレット | マルチモーダル、オンデバイスエージェント |
| **26B MoE** | Mixture of Experts | 256K | コンシューマGPU、ワークステーション | 推論時に3.8Bパラメータのみ活性化 → 高速 |
| **31B Dense** | Dense | 256K | GPU H100 80GB (bfloat16) | 最高品質、ファインチューニング基盤 |

### 2.1. E2BとE4B — あらゆるデバイスのためのAI

これら2つのエッジモデルは、計算効率とメモリ効率を最大化すべく**最初から**設計されています。推論時に実際に活性化するのはそれぞれ2Bと4Bのパラメータのみで、RAMとバッテリーを節約します。

主な特徴：
- **ネイティブオーディオ入力**：音声認識とオーディオ理解をデバイス上で直接処理
- **ネイティブビジョン**：複数解像度での動画・画像処理、OCR、グラフの理解
- **完全オフライン動作**：Raspberry Pi 5、NVIDIA Jetson Orin Nano、Qualcomm、MediaTekで動作
- **Android AICore Developer Preview**との統合——Gemini Nano 4との上位互換性

Raspberry Pi 5上でのLiteRT-LMによる印象的な数値：
- **プリフィル**：133トークン/秒
- **デコード**：7.6トークン/秒
- スマートホームコントローラー、音声アシスタント、オフラインロボティクスに十分な速度

### 2.2. 26B MoE — コンシューマハードウェアでフロンティア速度を実現

総パラメータ数26Bのところ、推論1回につき**3.8Bのみを活性化**するMixture of Expertsモデルです。結果として、フロンティア品質を保ちながら驚異的なトークン/秒速度を実現しています。

- オープンモデル部門でArena AI**第6位**
- 量子化版がコンシューマGPUで動作
- 低レイテンシを必要とするIDE、コーディングアシスタント、アジェンティックワークフローに最適

### 2.3. 31B Dense — 最高品質

従来の密なモデルで、生の品質とファインチューニング基盤として最も強力です。

- オープンモデル部門でArena AIテキストランキング**世界第3位**
- パラメータ数で20倍大きなモデルを凌駕
- bfloat16の重みが単一のNVIDIA H100 80GB GPUに収まる
- 量子化版がコンシューマGPUで動作

* * *

## 3. 注目の機能

### 3.1. アジェンティックワークフロー — チャットボット以上の存在

これが前世代からGemma 4が最も大きく飛躍した点です。モデルはネイティブで以下をサポートします：

- **関数呼び出し**：ツールとAPIの直接呼び出し
- **構造化JSON出力**：本番環境向けの信頼性の高い構造化出力
- **ネイティブシステム命令**：ネイティブレベルでのシステム指示
- **マルチステップ計画**：複数ステップのワークフローの計画と実行

これにより、インターネット不要・クラウドへのデータ送信不要で、完全にオンデバイスで動作する**自律エージェント**を構築できます。

### 3.2. ビジョン＆オーディオ

すべてのGemma 4モデルが**動画と画像**をネイティブで処理します：
- 可変解像度サポート
- 高品質OCR
- チャートやグラフの理解
- E2B/E4Bは音声認識のための**ネイティブオーディオ入力**もサポート

### 3.3. コード生成

Gemma 4はオフラインで高品質なコード生成をサポートし、ワークステーションを**ローカルファーストのAIコーディングアシスタント**に変えます。26B MoE（高速）または31B Dense（最高品質）と組み合わせることで、クラウドに依存しないコーディングアシスタント体験が得られます。

### 3.4. 140以上の言語

140以上の言語でネイティブトレーニング——日本語を含みます。多言語・グローバル市場向けアプリケーションを構築する開発者にとって大きな利点です。

### 3.5. 拡張コンテキストウィンドウ

- **エッジモデル**（E2B、E4B）：128Kトークン
- **大型モデル**（26B、31B）：256Kトークン

コードリポジトリ全体や長いドキュメントをプロンプト1つで渡すのに十分です。

* * *

## 4. エッジ上のAgent Skills — オンデバイスAIの未来

Googleは同時に[Google AI Edge Gallery](https://github.com/google-ai-edge/gallery)アプリ内で**Agent Skills**もリリースしました——**複数ステップの、自律的な、完全オンデバイスのアジェンティックワークフロー**を実行する最初期のアプリケーションの一つです。

### エッジ上のGemma 4で何ができるか？

**1. 知識ベースの拡張：**
エージェントはトレーニングデータを超えた情報にアクセスできます。例：あらゆる百科事典的な質問に答えるWikipediaクエリスキルの作成。

**2. インタラクティブなコンテンツ作成：**
テキストや動画をサマリー、フラッシュカード、インタラクティブなグラフに変換。例：ユーザーの音声から毎日の睡眠・気分の傾向を自動的に要約・表示。

**3. コア機能の拡張：**
テキスト読み上げ、画像生成、音楽合成などの他のモデルと統合。例：写真に雰囲気に合った音楽を組み合わせる。

**4. エンドツーエンド体験：**
複数のアプリを切り替えるのではなく、ユーザーが会話だけで複雑なワークフローを管理できます。Googleは会話だけで構築された、動物の説明と鳴き声を再生するアプリをデモしました。

### LiteRT-LM — オンデバイス向けランタイム

[LiteRT-LM](https://ai.google.dev/edge/litert-lm/overview)はあらゆるデバイスへのGemma 4デプロイを可能にする新しいランタイムです：

- **最小メモリ**：2ビットと4ビット重みのサポートにより、Gemma 4 E2Bは1.5GB未満のメモリで動作
- **制約付きデコーディング**：構造化出力により、本番環境での信頼性の高いツール呼び出しを保証
- **動的コンテキスト**：動的なコンテキスト長でCPUとGPUを柔軟に活用し、128Kコンテキストウィンドウを最大活用
- **パフォーマンス**：4,000入力トークンを2つの別々のスキルで3秒未満で処理

マルチプラットフォームサポート：

| プラットフォーム | サポート |
|----------|--------|
| **モバイル** | Android（CPU/GPU）、iOS、Android AICore |
| **デスクトップ＆ウェブ** | Windows、Linux、macOS（Metal）、WebGPU |
| **IoT＆ロボティクス** | Raspberry Pi 5、Qualcomm IQ8 NPU |

GoogleはLinux、macOS、Raspberry Pi向けの**Pythonパッケージとコマンドラインツール** `litert-lm` もリリースしました——コードを書かずにターミナルから直接Gemma 4を試せます：

```bash
# litert-lm CLIのインストール
pip install litert-lm

# Gemma 4 E2Bをターミナルから直接実行
litert-lm run gemma-4-e2b
```

* * *

## 5. Apache 2.0 — ライセンス上の転換点

これは戦略上の最大の変更点です。以前のGemmaバージョンは一部の制限を含むカスタムライセンス「**Gemma Terms of Use**」を使用していました。Gemma 4は完全に**Apache 2.0**に移行しました。

これが意味すること：

- **商業的自由**：無制限の使用、改変、配布が可能
- **デジタル主権**：データ、インフラ、モデルの完全な制御
- **制約なし**：オンプレミスやクラウドを問わず自由にデプロイ可能、報告や登録不要

Hugging FaceのCEO、クレモン・デランゲ氏は次のようにコメントしました：「*Gemma 4をApache 2.0ライセンスでリリースしたことは重要なマイルストーンです。*」

### 他のオープンモデルとのライセンス比較

| モデル | ライセンス | 商用利用 | 派生物 |
|-------|-----------|------------|------------------|
| **Gemma 4** | Apache 2.0 | ✅ 自由 | ✅ 自由 |
| Llama 3.x | Llama License | ✅（MAU 7億以上の場合は条件付き） | ✅ 制限あり |
| Mistral | Apache 2.0 | ✅ 自由 | ✅ 自由 |
| Qwen 2.5 | Apache 2.0 / Tongyi | ✅ バリアントによる | ✅ バリアントによる |

Gemma 4により、GoogleのオープンネスはMistralと同等となり、ライセンスの自由度ではMeta（Llama）を大きく上回ることになりました。

* * *

## 6. エコシステムのサポート

Gemma 4は主要なフレームワークとプラットフォームのほぼすべてで**初日から**サポートされています：

### フレームワーク＆ツール

- **Hugging Face**: Transformers、TRL、Transformers.js、Candle
- **推論**: vLLM、llama.cpp、SGLang、Ollama、LM Studio
- **Apple**: MLX（mlx-community）
- **NVIDIA**: NIM、NeMo
- **エッジ**: LiteRT-LM、Google AI Edge Gallery
- **ファインチューニング**: Unsloth、Google Colab、Vertex AI
- **その他**: Cactus、Baseten

### モデルのダウンロード

- [Hugging Face](https://huggingface.co/collections/google/gemma-4)
- [Kaggle](https://www.kaggle.com/models/google/gemma-4)
- [Ollama](https://ollama.com/library/gemma4)

### 最速でお試しになるには

```bash
# Ollamaで
ollama run gemma4

# Google AI Studio経由（31B、26B MoE）
# https://aistudio.google.com/prompts/new_chat?model=gemma-4-31b-it

# Google AI Edge Gallery経由（E2B、E4B）
# https://github.com/google-ai-edge/gallery
```

* * *

## 7. 比較：Gemma 4 vs 他のオープンモデル

Arena AIテキストリーダーボード（オープンモデル、2026年4月2日時点）に基づく：

| 順位 | モデル | サイズ | ライセンス |
|-----------|---------|------------|-----------|
| 第1位 | DeepSeek-V3 | 671B MoE | DeepSeek License |
| 第2位 | Qwen3-235B | 235B MoE | Apache 2.0 |
| **第3位** | **Gemma 4 31B** | **31B Dense** | **Apache 2.0** |
| 第4位 | Llama 4 Maverick | 400B MoE | Llama License |
| 第5位 | DeepSeek-R1 | 671B MoE | MIT |
| **第6位** | **Gemma 4 26B** | **26B MoE (アクティブ3.8B)** | **Apache 2.0** |

注目すべき点：Gemma 4 31B（310億パラメータ）はLlama 4 Maverick（4,000億パラメータ）を凌駕しています——**13倍小さい**にもかかわらず、より高い順位を誇ります。これはGoogleの「パラメータあたりの知性」哲学の最も明確な証明です。

* * *

## 8. 実用的なアプリケーションとユースケース

### 8.1. 個人開発者向け

- **オフラインコーディングアシスタント**：ゲーミングGPUで26B MoEを実行、APIの費用不要
- **コードレビューエージェント**：関数呼び出し＋構造化出力を使ってPRを自動レビューするエージェントを構築
- **ローカルRAG**：256KコンテキストウィンドウとローカルのQdrant/Chromadbを組み合わせる

### 8.2. 企業向け

- **オンプレミスAI**：Apache 2.0 + オンデバイス = データがインフラ外に出ない
- **ソブリンAI**：データの国内保管要件（デジタル主権）に適合
- **エッジAI本番環境**：E2B/E4Bを使ったスマートホーム、キオスク、POS、カメラAI

### 8.3. 研究向け

- **ファインチューニング基盤**：31B Denseはドメイン特化型チューニングの強力なベースモデル
- **多言語研究**：140以上の言語が低リソース言語NLP研究を開く
- **実際の例**：イェール大学がGemmaを使って癌治療の新しいパスウェイを発見（Cell2Sentence-Scale）

### 8.4. IoTとロボティクス向け

- **オフライン音声アシスタント**：ロボットやスマートスピーカー向けにRaspberry Pi 5上でE2Bを動作させる
- **エッジ分析**：NVIDIA Jetsonでのリアルタイム画像・動画解析
- **産業自動化**：Qualcomm IQ8 NPU上での自律エージェント

* * *

## 9. クイックスタートガイド

### 9.1. Ollamaで実行（最も簡単）

```bash
# Ollamaをインストール
curl -fsSL https://ollama.com/install.sh | sh

# Gemma 4を実行（適切なサイズを自動選択）
ollama run gemma4

# または特定のバリアントを指定
ollama run gemma4:26b
ollama run gemma4:31b
```

### 9.2. LiteRT-LMでエッジ実行

```bash
# LiteRT-LM CLIをインストール
pip install litert-lm

# モデルをダウンロードして実行
litert-lm download gemma-4-e2b
litert-lm run gemma-4-e2b
```

### 9.3. Pythonで使用（Hugging Face Transformers）

```python
from transformers import AutoTokenizer, AutoModelForCausalLM

model_id = "google/gemma-4-31b-it"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    device_map="auto",
    torch_dtype="auto"
)

messages = [
    {"role": "user", "content": "Mixture of Expertsアーキテクチャを3文で説明してください。"}
]

input_ids = tokenizer.apply_chat_template(
    messages, return_tensors="pt"
).to(model.device)

outputs = model.generate(input_ids, max_new_tokens=256)
print(tokenizer.decode(outputs[0], skip_special_tokens=True))
```

### 9.4. 関数呼び出し（アジェンティック）

```python
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get current weather for a location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {"type": "string", "description": "City name"}
                },
                "required": ["location"]
            }
        }
    }
]

messages = [
    {"role": "system", "content": "You are a helpful assistant with access to tools."},
    {"role": "user", "content": "東京の今日の天気はどうですか？"}
]
```
