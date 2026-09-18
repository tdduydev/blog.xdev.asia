---
id: 05e72d3d-f5d2-4304-8fe1-c29fe5ac8ec6
title: 'NVIDIA DLI Generative AI：全認定資格・コース・試験・詳細学習ロードマップ'
slug: nvidia-dli-generative-ai-certificate-learning-path
excerpt: NVIDIA DLIのGenerative AIとLLMに関する完全なエコシステムの詳細ガイド — Diffusion Models、RAG Agents、Agentic AIからTransformer NLPまで。試験内容、アセスメントの難易度、サンプル問題、試験のヒント、初心者からプロまでの学習ロードマップを解説します。
featured_image: /images/blog/nvidia-dli-genai-featured.webp
type: blog
reading_time: 30
view_count: 0
meta: null
published_at: '2026-04-13T14:00:00.000000Z'
created_at: '2026-04-13T14:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: AI, slug: ai}, {name: LLM, slug: llm}, {name: Deep Learning, slug: deep-learning}, {name: NVIDIA, slug: nvidia}, {name: Certification, slug: certification}]
locale: ja
comments: []
---

純粋な理論だけでなく**実践的なAI認定資格**をお探しなら、NVIDIA Deep Learning Institute（DLI）が最有力候補です。独自のクラウドプラットフォームに特化したAWSやAzureとは異なり、NVIDIA DLIはGPU上で**直接ハンズオンコーディング**を教えます — U-Net拡散モデルをゼロから構築することから、本番グレードのRAGエージェントのデプロイまで。

この記事ではNVIDIA DLIのGenerative AI**コースと認定資格システム全体**を深く掘り下げます：各コースの内容、試験フォーマット、アセスメントの難易度、サンプル問題、そして詳細な準備ロードマップ。

* * *

## 1. NVIDIA DLIシステム概要

NVIDIA DLIは**AWSやAzureのような従来の認定試験ではありません**。代わりに、NVIDIAには**2種類の異なるクレデンシャル**があります：

### DLIコース証明書（修了ベース）

- セルフペースまたはインストラクター主導のコースを修了
- **コース終了時のアセスメントに合格**する必要がある（ハンズオンコーディング、MCQではない）
- NVIDIAで確認可能な証明書をメールで受け取る
- 価格：**$30〜$90/コース**（セルフペース）またはワークショップ料金（インストラクター主導）
- **有効期限なし**

### NVIDIA Professional Certifications（試験ベース）

- Pearson VUEを通じてプロクター試験
- 多肢選択 + シナリオベース形式
- 価格：**$125（アソシエイト）**または**$400（プロフェッショナル）**
- 時間：**1〜2時間**
- 有効期間：**2年間**、その後は再受験が必要
- 現在の認定資格：**NCA-AIIO**（アソシエイト）、**NCP-AII**、**NCP-AIO**、**NCP-AIN**（プロフェッショナル）

> **重要な注意：** 2026年4月時点で、NVIDIAには**Generative AI/LLM専用のProfessional Certificationがまだありません**。現在のプロフェッショナル認定資格は**AIインフラ、オペレーション、ネットワーキング**に集中しています。ただし、GenAI/LLMのDLIコース証明書は業界で広く認められており、アセスメントは通常のMCQよりも**大幅に難しいです**。

* * *

## 2. Generative AI with Diffusion Models — 最も難しいコース

<table>
<tr><td><strong>コードコード</strong></td><td>DLI+S-FX-14+V1</td></tr>
<tr><td><strong>時間</strong></td><td>8時間</td></tr>
<tr><td><strong>価格</strong></td><td>$90</td></tr>
<tr><td><strong>レベル</strong></td><td>技術 - 中級</td></tr>
<tr><td><strong>言語</strong></td><td>英語</td></tr>
<tr><td><strong>フレームワーク</strong></td><td>PyTorch, CLIP</td></tr>
<tr><td><strong>証明書</strong></td><td>あり（アセスメント合格後）</td></tr>
</table>

### 各モジュールの詳細内容

**モジュール1：U-Netから拡散モデルへ**
- PyTorchで**U-Netアーキテクチャをゼロから構築**
- 画像からノイズを除去するモデルの訓練
- スキップコネクションを持つエンコーダー・デコーダーアーキテクチャの理解
- ハンズオン：順伝播、損失関数、学習ループの作成

**モジュール2：拡散モデル**
- **順方向拡散関数の実装** — 画像に徐々にノイズを追加
- **タイムステップ埋め込み**に対応するためのU-Netアーキテクチャの更新
- **逆方向拡散関数の実装** — 純粋なノイズから画像をノイズ除去
- 数学：マルコフ連鎖、分散スケジュール（$\beta_t$）、再パラメーター化トリック

**モジュール3：最適化**
- Batch Normの代わりに**Group Normalizationを実装**（小バッチに対してより安定）
- **GELU活性化関数の実装**（Gaussian Error Linear Unit）
- 空間ダウンサンプリングのための**Rearrange Poolingの実装**
- タイムステップエンコーディングのための**正弦波位置埋め込みの実装**：

$$PE(t, 2i) = \sin\left(\frac{t}{10000^{2i/d}}\right)$$
$$PE(t, 2i+1) = \cos\left(\frac{t}{10000^{2i/d}}\right)$$

**モジュール4：Classifier-Free Diffusion Guidance**
- U-Netへの**カテゴリカル埋め込みの追加**
- **ベルヌーイマスク**を用いてモデルを訓練 — ランダムに条件をドロップ
- 推論のための**CFGスケール**（$w$）の実装：

$$\hat{\epsilon}_\theta(x_t, c) = \epsilon_\theta(x_t, \varnothing) + w \cdot (\epsilon_\theta(x_t, c) - \epsilon_\theta(x_t, \varnothing))$$

**モジュール5：CLIP（Contrastive Language-Image Pretraining）**
- **CLIPエンコーディング**を使用してテキスト→埋め込み空間へのマッピング
- CLIPとU-Netを組み合わせて**テキストから画像へのパイプラインを作成**
- テキスト埋め込みと画像特徴間のクロスアテンションの実装

### アセスメント

**フォーマット：** クラウドGPU上のJupyter Notebook内でのコーディングアセスメント

**要件：**
1. 新しい条件をサポートするための**U-Netアーキテクチャの変更**（ラボからのコピー&ペーストではない）
2. 学習した複数のテクニックを組み合わせた**カスタム拡散パイプラインの実装**
3. 出力が正しくない場合の**モデルのデバッグ** — ノイズスケジュールまたはアーキテクチャのバグを見つける
4. コードは**実行できる**必要があり、出力は**品質閾値を満たす**必要がある

**難易度：🔴🔴🔴🔴🔴（5/5）**

これはGenAIトラック全体で**最も難しいコース**です：
- 多肢選択なし — **ゼロからコードを書く**必要がある
- **拡散モデルの数学**の深い理解が必要：分散スケジュール、ELBO、スコアマッチング
- **PyTorchを流暢に使える**必要がある：カスタムモジュール、autograd、テンソル演算
- 時間制限あり — すべての行をGoogleで調べることはできない

### サンプル問題と形式

> **タイプ1：コンポーネントの実装**
> スケルトンコードが与えられ、タイムステップテンソルを入力とし、`(batch_size, dim)`サイズの埋め込みテンソルを出力とする`SinusoidalPositionEmbeddings`クラスを実装する。

> **タイプ2：デバッグ**
> 拡散モデルが学習後に純粋なノイズを出力する。以下の`reverse_diffusion()`関数のバグを見つけよ。（ヒント：分散スケジュールを確認）

> **タイプ3：アーキテクチャの拡張**
> 学習済みモデルにClassifier-Free Guidanceを追加する。`guided_sampling(model, prompt, cfg_scale)`関数を実装し：
> - `cfg_scale=0`の時：出力が無条件モデルと一致
> - `cfg_scale=7.5`の時：出力がプロンプトに一致

> **タイプ4：統合**
> CLIPエンコーダーと拡散モデルを組み合わせる。テキスト入力→生成画像の完全なパイプラインを、以下を含めて作成する：
> - CLIPによるテキストエンコーディング
> - U-Netへのクロスアテンション注入
> - DDPMスケジューラーによる逆方向拡散ループ

### 試験のヒント

1. **ラボを丁寧に行い、セルを実行するだけにしない** — コードの各行を理解し、特にテンソルの形状に注意
2. **数式を覚える**：$q(x_t | x_{t-1})$、$p_\theta(x_{t-1} | x_t)$、ノイズスケジューリング
3. **PyTorchの基本を練習**：`nn.Module`、`forward()`、`torch.randn()`、einops
4. **モデルがノイズを出力しても焦らない** — 系統的にデバッグ：形状確認 → 損失確認 → スケジューリング確認
5. **時間配分**：時間の60%をラボに、40%をアセスメントに使う

* * *

## 3. Building RAG Agents with LLMs — 最も人気のコース

<table>
<tr><td><strong>コードコード</strong></td><td>DLI+S-FX-15+V1</td></tr>
<tr><td><strong>時間</strong></td><td>8時間</td></tr>
<tr><td><strong>価格</strong></td><td>$90</td></tr>
<tr><td><strong>レベル</strong></td><td>技術 - 中級</td></tr>
<tr><td><strong>フレームワーク</strong></td><td>LangChain, Gradio, LangServe</td></tr>
<tr><td><strong>証明書</strong></td><td>あり</td></tr>
</table>

### 各モジュールの詳細内容

**モジュール1：LLM推論インターフェースとマイクロサービス**
- NVIDIA NIM（推論マイクロサービス）と接続する環境のセットアップ
- APIを通じたLLMへのクエリ：プロンプトフォーマット、トークン管理
- 推論パラメーターの理解：temperature、top_p、max_tokens、stop sequences

**モジュール2：LangChain、Gradio、LangServeによるパイプライン設計**
- **LangChain Expression Language (LCEL)**でLLMパイプラインを構築
- **Gradio**で素早くUIプロトタイプを作成
- **LangServe**（FastAPIベース）を通じてパイプラインを本番デプロイ
- 複数コンポーネントのチェーン：プロンプトテンプレート → LLM → 出力パーサー

**モジュール3：実行状態を持つダイアログ管理**
- **会話メモリの実装** — 複数のターンでコンテキストを保持
- ダイアログフローのための**ステートマシンの構築**
- 自由テスト会話からの構造化情報の抽出
- LLM出力を**Pydanticモデル**に強制（構造化出力）

**モジュール4：ドキュメントの操作**
- ドキュメントの読み込み、分割、解析（PDF、マークダウン、コードファイル）
- **チャンキング戦略の実装**：再帰的文字、セマンティック、センテンス
- メタデータ抽出とドキュメントの前処理

**モジュール5：セマンティック類似性とガードレーリングのための埋め込み**
- **セマンティック検索**のための埋め込みモデルの使用
- 検索ランキングのための**コサイン類似度の実装**
- 埋め込み距離を使用した**ガードレールの構築** — トピック外のクエリを検出

**モジュール6：RAGエージェントのためのベクターストア**
- ベクターデータベースのセットアップ（FAISS/Milvus）
- 完全な**RAGパイプラインの実装**：クエリ → 検索 → 拡張 → 生成
- RAG品質の評価：関連性、忠実性、回答の正確性

### アセスメント

**フォーマット：** コーディングベース — 完全なRAGエージェントのビルドとデプロイ

**難易度：🔴🔴🔴🔴⚪（4/5）**

**Diffusion Modelsより簡単です**なぜなら：
- より多くの抽象化レイヤー（LangChain、Gradio）— 低レベルコーディングが少ない
- 重い数学は不要
- しかし**複数のコンポーネントを統合**して完全なシステムにする必要があるため依然として難しい

### サンプル問題

> **タイプ1：パイプライン構築**
> PDF論文のデータセットで、以下のRAGパイプラインを構築：
> - チャンクサイズ = 512、オーバーラップ = 128
> - 埋め込みモデル：`NV-Embed-QA`
> - Top-k検索：5
> - 出力：回答 + ソース引用

> **タイプ2：ガードレーリング**
> データセットに関連しないクエリが「I can only answer questions about AI research papers.」というメッセージで拒否されるように入力ガードレールを実装する。

> **タイプ3：状態管理**
> フォローアップ質問をサポートするようにエージェントを変更する。ユーザーが「Attentionとは何ですか？」と質問 → エージェントが回答。続けて「誰がそれを発明しましたか？」と質問 → エージェントは「それ」 = attentionメカニズムと理解しなければならない。

### 試験のヒント

1. **事前にLangChainのドキュメントを熟読する** — 特にLCEL構文
2. **埋め込み次元を理解する** — 次元のミスマッチが最も一般的なエラー
3. **パイプラインをステップバイステップでテスト**：最初に検索、次に生成を追加
4. **チャンクサイズが重要** — 小さすぎるとコンテキストが失われ、大きすぎるとノイズが多い

* * *

## 4. Building Agentic AI Applications with LLMs — 最も高度なコース

<table>
<tr><td><strong>コードコード</strong></td><td>DLI+C-FX-25+V1</td></tr>
<tr><td><strong>時間</strong></td><td>8時間</td></tr>
<tr><td><strong>価格</strong></td><td>インストラクター主導（NVIDIAへ問い合わせ）</td></tr>
<tr><td><strong>レベル</strong></td><td>技術 - 中級</td></tr>
<tr><td><strong>フレームワーク</strong></td><td>LangGraph, NVIDIA NIM, LangChain</td></tr>
<tr><td><strong>証明書</strong></td><td>あり</td></tr>
</table>

### 詳細内容

**セクション1：エージェント抽象化とLLMの基礎**
- LLMの能力 vs. 落とし穴（幻覚、コンテキスト制限、推論の失敗）
- **タスク分解の抽象化**としてのエージェント
- 最小限のエージェントデモ：自由形式テストLLM → 構造化アクション → 実行

**セクション2：構造化出力と基本的な実現**
- LLM出力を**JSON/タスクベースのスキーマ**に絞り込む
- ドメインアライメントと安定したスキーマ強制
- **認知アーキテクチャの紹介**（ReAct、Plan-and-Execute、LATS）

**セクション3：検索メカニズムと環境ツーリング**
- エージェントの**環境アクセス戦略の形式化**
- DB、API、外部リポジトリのためのツールインターフェースの構築
- セマンティックドキュメント検索のためのベクターベースRAG
- 構造化ドメイン知識のための**ナレッジグラフ**

**セクション4：マルチエージェントシステムとフレームワーク**
- **専門化されたエージェント**間のタスク分解
- 通信バッファとプロセス分散スキーム
- LangGraph：複雑なエージェントワークフローのためのステートマシン

**セクション5：最終アセスメント**
- **難易度：🔴🔴🔴🔴🔴（5/5）**

完全な**マルチエージェントシステム**をデプロイする必要があります：
- ユーザーからの複雑なクエリを受け取る
- サブタスクに分解する
- 専門エージェントにルーティングする
- 結果を集約する
- まとまりのある応答を返す

* * *

## 5. Evaluation and Light Customization of LLMs — 最新コース

<table>
<tr><td><strong>コードコード</strong></td><td>DLI+S-FX-34+V1</td></tr>
<tr><td><strong>時間</strong></td><td>3時間</td></tr>
<tr><td><strong>価格</strong></td><td>$90</td></tr>
<tr><td><strong>レベル</strong></td><td>中級</td></tr>
<tr><td><strong>フレームワーク</strong></td><td>NVIDIA NeMo, NIM, MLflow, Docker</td></tr>
<tr><td><strong>証明書</strong></td><td>あり</td></tr>
</table>

### 詳細内容

**パート1：LLM評価の基礎**
- デプロイされたNVIDIA NIMへのクエリ
- 評価テクニック：目視確認 → 体系的なベンチマーク
- **GSM8Kベンチマーク** — 数学的推論の評価
- **LLM-as-a-Judge** — 強いLLMを使って弱いLLMを評価

**パート2：NeMoによる体系的評価**
- ロバストな評価ワークフローのための**NeMo Evaluator**マイクロサービス
- **法律ドメインQA**のためのカスタムデータセット準備
- **ゼロショット vs. フューショット（ICL）**の比較
- メトリクス：**BLEU、F1スコア、類似度スコア**
- **MLflow**実験追跡

**パート3：LoRAによる軽量カスタマイズ**
- **Parameter-Efficient Fine-Tuning (PEFT)**の原則
- **Low-Rank Adaptation (LoRA)** — パラメーターのごく一部のみをファインチューニング：

$$W' = W + \Delta W = W + BA$$

ここで $B \in \mathbb{R}^{d \times r}$、$A \in \mathbb{R}^{r \times k}$、ランク $r \ll \min(d, k)$

- **難易度：🔴🔴🔴⚪⚪（3/5）**

* * *

## 6. GenAIトラックの補足コース

### Introduction to Transformer-Based NLP (S-FX-08)
- **6時間 | $30 | 初級**
- すべてのLLMコースの基礎
- NLPタスク：テキスト分類、NER、著者帰属、QA
- **推奨**：他のどのコースを始める前に受講

### Generative AI Explained (S-FX-07)
- **2時間 | 無料 | 初級**
- ノーコードコース、概念概要
- マネージャーや非技術系の役割に適している
- **アセスメントなし** — 修了のみ

### Prompt Engineering with LLaMA-2 (S-FX-12)
- **3時間 | $30 | 初級**
- ⚠️ **期限切れ**（2025年12月）— NVIDIAが新バージョンをリリースする可能性あり

### Building AI Agents with Multimodal Models (C-FX-17)
- **8時間 | インストラクター主導**
- マルチモーダルエージェントに特化 — ビジョン + 言語を組み合わせる
- 2026年カタログ内の最新コース

* * *

## 7. 全GenAIコース比較表

| コース | コード | 時間 | 価格 | アセスメント難易度 | 前提条件 |
|--------|------|-------|-------|---------------------|---------|
| **Generative AI Explained** | S-FX-07 | 2h | 無料 | なし | なし |
| **Intro to Transformer NLP** | S-FX-08 | 6h | $30 | ⭐⭐ | 基礎的な深層学習 |
| **Generative AI with Diffusion Models** | S-FX-14 | 8h | $90 | ⭐⭐⭐⭐⭐ | PyTorch + 深層学習 |
| **Building RAG Agents** | S-FX-15 | 8h | $90 | ⭐⭐⭐⭐ | Python OOP + DL基礎 |
| **Eval & Customization of LLMs** | S-FX-34 | 3h | $90 | ⭐⭐⭐ | Python + LLM基礎 |
| **Agentic AI Applications** | C-FX-25 | 8h | ワークショップ | ⭐⭐⭐⭐⭐ | DL + Python中級 |
| **AI Agents with Multimodal** | C-FX-17 | 8h | ワークショップ | ⭐⭐⭐⭐ | DL + ビジョン |

* * *

## 8. NVIDIA DLIと他の認定資格との比較

| 基準 | NVIDIA DLI GenAI | AWS AI Practitioner | Azure AI-102 | Databricks GenAI |
|-----------|-----------------|---------------------|-------------|-----------------|
| **試験形式** | ハンズオンコーディング | 85問MCQ | 50問MCQ + ケーススタディ | 45問MCQ |
| **実際のコーディング** | ✅ GPU上でコード作成 | ❌ | ❌ | ❌ ただしシナリオあり |
| **試験時間** | 1〜2時間（アセスメント） | 120分 | 100分 | 120分 |
| **価格** | $30〜$90（コース） | $150 | $165 | $200 |
| **GPUアクセス** | ✅ 無料クラウドGPU | ❌ | ❌ | ❌ |
| **深さ** | 🔴 非常に深い（コードレベル） | 🟡 浅い（概念） | 🟠 中程度（Azureサービス） | 🟠 中程度（RAG/評価） |
| **ベンダーロックイン** | 低（PyTorch、オープン標準） | 高（AWSのみ） | 高（Azureのみ） | 中程度（Databricks） |
| **業界認知度** | ⭐⭐⭐⭐（技術系） | ⭐⭐⭐⭐⭐（一般的） | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **最適な対象** | MLエンジニア、AI研究者 | SA、PM、あらゆるレベルの開発者 | Azure開発者 | データエンジニア、MLOps |

**注意：**
- **NVIDIA DLI**は**最も技術的に深い**認定資格 — 実際に深層学習モデルをコーディングする
- **MLエンジニアの場合**：NVIDIA DLI → Databricks → AWS
- **クラウドアーキテクトの場合**：AWS → Azure → Databricks

* * *

## 9. 詳細な準備ロードマップ

### フェーズ1：基礎（2週間）

**目標：** 深層学習の基礎とPyTorchをマスター

<table>
<tr><th>週</th><th>活動</th><th>リソース</th></tr>
<tr><td>1</td><td>深層学習の基礎：ニューラルネットワーク、逆伝播、CNN、RNN</td><td>DLI: Getting Started with Deep Learning（無料）</td></tr>
<tr><td>1</td><td>PyTorchの基礎：テンソル、autograd、nn.Module</td><td>PyTorch公式チュートリアル</td></tr>
<tr><td>2</td><td>Transformerアーキテクチャ：アテンションメカニズム、マルチヘッドアテンション</td><td>DLI: Intro to Transformer NLP（S-FX-08、$30）</td></tr>
<tr><td>2</td><td>ハンズオン：テキスト分類のためのBERTのファインチューニング</td><td>HuggingFaceチュートリアル</td></tr>
</table>

### フェーズ2：Generative AIコア（3週間）

**目標：** 拡散モデルとLLMの基礎をマスター

<table>
<tr><th>週</th><th>活動</th><th>リソース</th></tr>
<tr><td>3</td><td>拡散理論：順方向/逆方向プロセス、DDPMペーパー</td><td>論文：「Denoising Diffusion Probabilistic Models」（Ho et al.）</td></tr>
<tr><td>3〜4</td><td><strong>メインコース：Generative AI with Diffusion Models（S-FX-14、$90）</strong></td><td>NVIDIA DLI、8時間</td></tr>
<tr><td>4</td><td>復習：U-Netコード、ノイズスケジューリング、CLIP統合</td><td>ラボノートブックのレビュー</td></tr>
<tr><td>5</td><td>ボーナス：Stable Diffusionの内部、Latent Diffusion</td><td>論文：「High-Resolution Image Synthesis with LDM」</td></tr>
</table>

### フェーズ3：LLMアプリケーション（3週間）

**目標：** 本番対応のLLMシステムを構築

<table>
<tr><th>週</th><th>活動</th><th>リソース</th></tr>
<tr><td>6</td><td>LangChainの基礎、LCEL、プロンプトテンプレート</td><td>LangChainドキュメント + チュートリアル</td></tr>
<tr><td>6〜7</td><td><strong>メインコース：Building RAG Agents（S-FX-15、$90）</strong></td><td>NVIDIA DLI、8時間</td></tr>
<tr><td>7</td><td>ベクターデータベース深掘り：FAISS、Milvus、pgvector</td><td>公式ドキュメント</td></tr>
<tr><td>8</td><td><strong>メインコース：Eval & Customization of LLMs（S-FX-34、$90）</strong></td><td>NVIDIA DLI、3時間</td></tr>
</table>

### フェーズ4：高度なエージェント（2週間）

**目標：** エージェントアーキテクチャとマルチエージェントシステム

<table>
<tr><th>週</th><th>活動</th><th>リソース</th></tr>
<tr><td>9</td><td>LangGraph深掘り：ステートマシン、条件付きエッジ</td><td>LangGraphチュートリアル</td></tr>
<tr><td>10</td><td><strong>メインコース：Agentic AI Applications（C-FX-25）</strong></td><td>NVIDIA DLIインストラクター主導、8時間</td></tr>
</table>

### 推定総費用

| 項目 | 費用 |
|------|------|
| Generative AI Explained（無料） | $0 |
| Intro to Transformer NLP | $30 |
| Generative AI with Diffusion Models | $90 |
| Building RAG Agents | $90 |
| Eval & Customization of LLMs | $90 |
| Agentic AI Applications（ワークショップ） | ~$500〜$1,000 |
| **合計（セルフペースのみ）** | **$300** |
| **合計（ワークショップ含む）** | **$800〜$1,300** |

> **節約のヒント：** NVIDIAウェビナー（2026年4月30日）に登録して、**50%割引コード**を受け取る。

* * *

## 10. 20問のサンプルアセスメント（模擬試験）

### 拡散モデル（S-FX-14）

**Q1.** 以下のスケルトンコードで`forward_diffusion()`を実装する：

```python
def forward_diffusion(x_0, t, noise_schedule):
    """
    Args:
        x_0: clean image tensor (B, C, H, W)
        t: timestep tensor (B,)
        noise_schedule: dict with 'alpha_bar' tensor (T,)
    Returns:
        x_t: noisy image at timestep t
        noise: the noise added
    """
    # YOUR CODE HERE
    pass
```

<details>
<summary><strong>回答</strong></summary>

```python
def forward_diffusion(x_0, t, noise_schedule):
    alpha_bar_t = noise_schedule['alpha_bar'][t]  # (B,)
    alpha_bar_t = alpha_bar_t[:, None, None, None]  # (B, 1, 1, 1)
    noise = torch.randn_like(x_0)
    x_t = torch.sqrt(alpha_bar_t) * x_0 + torch.sqrt(1 - alpha_bar_t) * noise
    return x_t, noise
```

**解説：** 順方向拡散は以下の公式に従ってノイズを追加します：
$$q(x_t | x_0) = \mathcal{N}(x_t; \sqrt{\bar{\alpha}_t} x_0, (1 - \bar{\alpha}_t) \mathbf{I})$$

</details>

---

**Q2.** タイムステップの正弦波位置埋め込みはどんな形をしているか？出力次元 = 128で`TimestepEmbedding(nn.Module)`クラスを実装する。

<details>
<summary><strong>回答</strong></summary>

```python
class TimestepEmbedding(nn.Module):
    def __init__(self, dim=128):
        super().__init__()
        self.dim = dim

    def forward(self, t):
        half_dim = self.dim // 2
        emb = math.log(10000) / (half_dim - 1)
        emb = torch.exp(torch.arange(half_dim, device=t.device) * -emb)
        emb = t[:, None] * emb[None, :]
        emb = torch.cat([torch.sin(emb), torch.cos(emb)], dim=-1)
        return emb  # (B, dim)
```

</details>

---

**Q3.** Classifier-Free Guidanceスケール $w = 7.5$。無条件予測 = $\epsilon_u$、条件付き予測 = $\epsilon_c$。ガイドされた予測を計算するコードを書く。

<details>
<summary><strong>回答</strong></summary>

```python
guided_pred = epsilon_u + 7.5 * (epsilon_c - epsilon_u)
```

</details>

---

**Q4.** Group NormalizationはBatch Normalizationとどう違うか？拡散モデルがGroup Normを優先するのはなぜか？

<details>
<summary><strong>回答</strong></summary>

- **BatchNorm**はバッチ次元で正規化 → バッチサイズに依存、小バッチで不安定
- **GroupNorm**は各サンプル内のチャンネルのグループで正規化 → **バッチサイズに依存しない**
- 拡散モデルは通常**小さいバッチサイズ**で訓練する（大きな画像がGPUメモリを消費する）→ GroupNormがより安定

</details>

---

**Q5.** デバッグ：逆方向拡散後にモデルが完全に黒い画像を出力する。以下のコードのバグは何か？

```python
for t in range(T, 0, -1):
    pred_noise = model(x_t, t)
    alpha_t = noise_schedule['alpha'][t]
    alpha_bar_t = noise_schedule['alpha_bar'][t]
    x_t = (x_t - pred_noise) / torch.sqrt(alpha_t)  # BUG
```

<details>
<summary><strong>回答</strong></summary>

バグ：逆方向拡散の公式が間違っている。正しいバージョン：

```python
x_t = (1 / torch.sqrt(alpha_t)) * (
    x_t - (1 - alpha_t) / torch.sqrt(1 - alpha_bar_t) * pred_noise
)
if t > 1:
    x_t += torch.sqrt(noise_schedule['beta'][t]) * torch.randn_like(x_t)
```

欠落しているのは：(1) ノイズの前の正しい係数、(2) t > 1の事後分散項。

</details>

---

### RAGエージェント（S-FX-15）

**Q6.** コサイン類似度によるセマンティック類似度検索を実装する。`query_embedding`（1, 768）と`doc_embeddings`（N, 768）が与えられ、上位5つのインデックスを返す。

<details>
<summary><strong>回答</strong></summary>

```python
import torch.nn.functional as F

similarities = F.cosine_similarity(
    query_embedding, doc_embeddings, dim=1
)
top_5_indices = similarities.argsort(descending=True)[:5]
```

</details>

---

**Q7.** チャンキング戦略：ドキュメントは10,000トークンの長さ。チャンクサイズ = 512、オーバーラップ = 128。チャンク数を計算する。

<details>
<summary><strong>回答</strong></summary>

$$\text{チャンク数} = \lceil \frac{10000 - 512}{512 - 128} \rceil + 1 = \lceil \frac{9488}{384} \rceil + 1 = 25 + 1 = 26$$

</details>

---

**Q8.** 要約タスクのためのLangChain LCELパイプラインを書く：プロンプトテンプレート → LLM → 出力パーサー。

<details>
<summary><strong>回答</strong></summary>

```python
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

prompt = ChatPromptTemplate.from_template(
    "Summarize the following text in 3 bullet points:\n{text}"
)
chain = prompt | llm | StrOutputParser()
result = chain.invoke({"text": document_text})
```

</details>

---

**Q9.** 入力ガードレールを実装する：トピック埋め込みとのコサイン類似度 < 0.3のクエリを拒否する。

<details>
<summary><strong>回答</strong></summary>

```python
def guardrail_check(query_emb, topic_embs, threshold=0.3):
    max_sim = F.cosine_similarity(
        query_emb.unsqueeze(0), topic_embs, dim=1
    ).max().item()
    if max_sim < threshold:
        return False, "Sorry, this question is outside my scope."
    return True, None
```

</details>

---

**Q10.** RAG評価：Precision@5 = 0.6、Recall@5 = 0.3。意味を説明し、改善策を提案する。

<details>
<summary><strong>回答</strong></summary>

- **Precision@5 = 0.6**：取得した5件のうち3件が関連 → 検索はかなり良い
- **Recall@5 = 0.3**：全関連文書の30%しか見つけられていない → **リコールが低い**
- **改善策**：
  1. top-kを10〜20に増やす（精度とリコールをトレードオフ）
  2. チャンキングを改善 — より正確なマッチングのために小さいチャンク
  3. ハイブリッド検索：BM25 + セマンティック検索
  4. 初期検索後に再ランキングレイヤーを追加

</details>

---

### LLM評価とカスタマイズ（S-FX-34）

**Q11.** LoRAランク r = 16、モデル次元 d = 4096、k = 4096。フルファインチューニングと比較してファインチューニングされるパラメーターの%を計算する。

<details>
<summary><strong>回答</strong></summary>

$$\text{フルFTパラメーター} = d \times k = 4096 \times 4096 = 16,777,216$$
$$\text{LoRAパラメーター} = d \times r + r \times k = 4096 \times 16 + 16 \times 4096 = 131,072$$
$$\text{比率} = \frac{131,072}{16,777,216} = 0.78\%$$

LoRAは**パラメーターの1%未満**のみをファインチューニングしながら、フルファインチューニングに近いパフォーマンスを達成します。

</details>

---

**Q12.** BLEUスコア = 0.15、F1 = 0.72。モデルはどんな問題を抱えているか？

<details>
<summary><strong>回答</strong></summary>

- **低いBLEU（0.15）**：モデルはリファレンスと**異なる表現**でテキストを生成 — 必ずしも間違いではない
- **高いF1（0.72）**：コンテンツ（重要情報）はほとんど正しい
- **診断**：モデルは上手く言い換えるが、正確な表現とは一致しない → BLEUはQAタスクに不適切なメトリクス
- **対応**：より正確な評価のためにBLEUの代わりに**セマンティック類似度**または**LLM-as-a-judge**を使用

</details>

---

### エージェントAI（C-FX-25）

**Q13.** 構造化出力の実装：LLMはスキーマ`{"action": str, "params": dict, "confidence": float}`でJSONを返す必要がある。

<details>
<summary><strong>回答</strong></summary>

```python
from pydantic import BaseModel, Field

class AgentAction(BaseModel):
    action: str = Field(description="Action to execute")
    params: dict = Field(description="Action parameters")
    confidence: float = Field(ge=0, le=1, description="Confidence score")

structured_llm = llm.with_structured_output(AgentAction)
result = structured_llm.invoke("Search for papers about attention mechanism")
```

</details>

---

**Q14.** LangGraph：条件付きエッジを実装 — クエリがリサーチを必要とする場合は`search_agent`へ、コンテキストが十分な場合は`answer_agent`へルーティング。

<details>
<summary><strong>回答</strong></summary>

```python
from langgraph.graph import StateGraph, END

def router(state):
    if state["needs_research"]:
        return "search_agent"
    return "answer_agent"

graph = StateGraph(AgentState)
graph.add_node("classifier", classify_query)
graph.add_node("search_agent", do_research)
graph.add_node("answer_agent", generate_answer)

graph.add_conditional_edges("classifier", router, {
    "search_agent": "search_agent",
    "answer_agent": "answer_agent"
})
graph.add_edge("search_agent", "answer_agent")
graph.add_edge("answer_agent", END)
```

</details>

---

### クロスコース問題

**Q15.** なぜDDPM（Denoising Diffusion Probabilistic Model）は推論に1000ステップが必要だが、Latent Diffusionは50ステップしか必要ないのか？

<details>
<summary><strong>回答</strong></summary>

- **DDPM**：**ピクセル空間**で拡散（256×256×3 = 196,608次元）→ ノイズ除去に多くのステップが必要
- **LDM**：**潜在空間**で拡散（32×32×4 = 4,096次元）→ 48倍圧縮 → 必要なステップが少ない
- さらに、LDMはDDPM（確率論的）の代わりに**DDIMスケジューラー**（決定論的）を使用 → ステップをスキップできる

</details>

---

**Q16.** システム設計：法律事務所のRAGエージェントを構築する。50,000件のドキュメント、100の同時ユーザー、応答 < 3秒。アーキテクチャを概略図で示す。

<details>
<summary><strong>回答</strong></summary>

```
ユーザー → ロードバランサー → APIゲートウェイ
    → 入力ガードレール（トピックフィルター）
    → クエリルーター
        → ベクターDB（Milvus、5万件、GPU加速）
        → BM25インデックス（Elasticsearch、キーワード検索）
    → Reciprocal Rank Fusion（結果のマージ）
    → 再ランカー（クロスエンコーダー、上位20→上位5）
    → LLM（NVIDIA NIM、8x H100、バッチ推論）
    → 出力ガードレール（PIIフィルター、引用チェック）
    → ソース付き応答
```

**主要な決定：**
- ベクター検索のためのMilvus（GPU加速、5万スケールで100ms未満）
- 法律ドメインの精度のためのハイブリッド検索
- 精度向上のための再ランカー
- 最適化されたLLM推論のためのNVIDIA NIM（2秒未満）
- PII検出（法的コンプライアンス）のための出力ガードレール

</details>

* * *

## 11. 結論

NVIDIA DLI Generative AIトラックは、**生成モデルで本当にハンズオンを望むエンジニアにとって最良の選択肢**です。MCQなし、空論なし — コードを書き、モデルをデバッグし、システムを構築する必要があります。

**1つのコースしか選べない場合：** **Building RAG Agents（S-FX-15）**から始める — 最も実践的なアプリケーション、業界の需要が最も高い。

**差別化したい場合：** **Generative AI with Diffusion Models（S-FX-14）**を追加 — 最も難しいコース、持っている人が少なく、深い技術的能力を証明する。

**フルスタックGenAIエンジニアになりたい場合：** セルフペース4コース全部 + インストラクター主導ワークショップ1つを修了する。

### 追加リソース

- [NVIDIA DLIコースカタログ](https://www.nvidia.com/en-us/training/self-paced-courses/)
- [NVIDIA認定ポータル](https://www.nvidia.com/en-us/learn/certification/)
- 論文：[Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239)（Ho et al.、2020）
- 論文：[LoRA: Low-Rank Adaptation of LLMs](https://arxiv.org/abs/2106.09685)（Hu et al.、2021）
- 論文：[Attention Is All You Need](https://arxiv.org/abs/1706.03762)（Vaswani et al.、2017）

> **次のウェビナー：** NVIDIA Certification 2026 — 2026年4月30日 — 認定試験の50%割引コードを受け取るために登録してください。[登録](https://www.nvidia.com/en-us/events/whats-new-with-nvidia-certification-2026/)
