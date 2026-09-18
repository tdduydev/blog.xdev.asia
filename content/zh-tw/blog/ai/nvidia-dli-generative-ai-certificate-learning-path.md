---
id: 05e72d3d-f5d2-4304-8fe1-c29fe5ac8ec6
title: 'NVIDIA DLI Generative AI：完整認證、課程、考試與詳細學習路線'
slug: nvidia-dli-generative-ai-certificate-learning-path
excerpt: NVIDIA DLI Generative AI 與 LLM 完整生態系統詳細指南——從 Diffusion Models、RAG Agents、Agentic AI 到 Transformer NLP。涵蓋考試內容、評估難度、範例題目、考試技巧，以及從初學者到專業人士的完整學習路線。
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
locale: zh-tw
comments: []
---

如果你在尋找不只是純理論的**實踐性 AI 認證**，NVIDIA Deep Learning Institute（DLI）是最有力的選擇。與聚焦自家雲端平台的 AWS 或 Azure 不同，NVIDIA DLI 教你在 GPU 上**直接動手寫代碼**——從零開始建構 U-Net 擴散模型，到部署生產級 RAG Agent。

本文深入探討 NVIDIA DLI Generative AI **完整課程與認證體系**：每門課程的內容、考試形式、評估難度、範例題目，以及詳細的備考路線。

* * *

## 1. NVIDIA DLI 系統概覽

NVIDIA DLI **不是像 AWS 或 Azure 那樣的傳統認證考試**。相反地，NVIDIA 有**兩種截然不同的憑證**：

### DLI 課程證書（結業型）

- 完成自學或講師主導的課程
- 需要**通過課程末尾的評估**（動手編碼，非選擇題）
- 透過電子郵件收到可在 NVIDIA 核驗的證書
- 價格：**$30–$90/課程**（自學）或工作坊費用（講師主導）
- **永久有效**

### NVIDIA Professional Certifications（考試型）

- 透過 Pearson VUE 進行監考考試
- 多選題 + 情境題形式
- 價格：**$125（Associate）**或**$400（Professional）**
- 時間：**1–2 小時**
- 有效期：**2 年**，之後需重新考試
- 目前認證：**NCA-AIIO**（Associate）、**NCP-AII**、**NCP-AIO**、**NCP-AIN**（Professional）

> **重要提醒：** 截至 2026 年 4 月，NVIDIA **尚無專門針對 Generative AI/LLM 的 Professional Certification**。目前的 Professional 認證集中在 **AI 基礎設施、運營和網路**。不過，GenAI/LLM 的 DLI 課程證書在業界廣受認可，而且評估**遠比一般選擇題難得多**。

* * *

## 2. Generative AI with Diffusion Models — 最難的課程

<table>
<tr><td><strong>課程代碼</strong></td><td>DLI+S-FX-14+V1</td></tr>
<tr><td><strong>時長</strong></td><td>8 小時</td></tr>
<tr><td><strong>價格</strong></td><td>$90</td></tr>
<tr><td><strong>級別</strong></td><td>技術 - 中級</td></tr>
<tr><td><strong>語言</strong></td><td>英語</td></tr>
<tr><td><strong>框架</strong></td><td>PyTorch, CLIP</td></tr>
<tr><td><strong>證書</strong></td><td>有（通過評估後）</td></tr>
</table>

### 各模組詳細內容

**模組 1：從 U-Net 到擴散模型**
- 用 PyTorch **從零建構 U-Net 架構**
- 訓練模型從圖像中去除雜訊
- 理解帶有跳接連接的編碼器-解碼器架構
- 實作：前向傳播、損失函數、訓練迴圈

**模組 2：擴散模型**
- **實作前向擴散函數**——逐漸向圖像加入雜訊
- 更新 U-Net 架構以配合**時間步嵌入**
- **實作反向擴散函數**——從純雜訊中去除雜訊
- 數學：馬可夫鏈、方差調度（$\beta_t$）、重新參數化技巧

**模組 3：最佳化**
- **實作 Group Normalization** 取代 Batch Norm（對小批次更穩定）
- **實作 GELU 激活函數**（Gaussian Error Linear Unit）
- **實作 Rearrange Pooling** 用於空間下採樣
- **實作正弦位置嵌入** 用於時間步編碼：

$$PE(t, 2i) = \sin\left(\frac{t}{10000^{2i/d}}\right)$$
$$PE(t, 2i+1) = \cos\left(\frac{t}{10000^{2i/d}}\right)$$

**模組 4：Classifier-Free Diffusion Guidance**
- 在 U-Net 中加入**類別嵌入**
- 使用**伯努利遮罩**訓練模型——隨機丟棄條件
- 實作推論用的 **CFG Scale**（$w$）：

$$\hat{\epsilon}_\theta(x_t, c) = \epsilon_\theta(x_t, \varnothing) + w \cdot (\epsilon_\theta(x_t, c) - \epsilon_\theta(x_t, \varnothing))$$

**模組 5：CLIP（Contrastive Language-Image Pretraining）**
- 使用 **CLIP 編碼**將文字映射到嵌入空間
- 結合 CLIP 與 U-Net 建立**文字到圖像管線**
- 實作文字嵌入與圖像特徵之間的交叉注意力

### 評估

**形式：** 在雲端 GPU 上的 Jupyter Notebook 中進行編碼評估

**要求：**
1. **修改 U-Net 架構**以支援新條件（不能直接從實驗室複製貼上）
2. **實作結合多種技術的自訂擴散管線**
3. 當輸出不正確時**調試模型**——找出雜訊調度或架構的 bug
4. 代碼必須**能夠運行**，輸出必須**符合品質門檻**

**難度：🔴🔴🔴🔴🔴（5/5）**

這是整個 GenAI 軌道**最難的課程**：
- 沒有選擇題——你需要**從零寫代碼**
- 需要深入理解**擴散模型數學**：方差調度、ELBO、分數匹配
- 必須**流利使用 PyTorch**：自訂模組、autograd、張量操作
- 有時間限制——無法在 Google 上查找每一行代碼

### 範例題目與形式

> **類型 1：實作元件**
> 給定骨架代碼，實作 `SinusoidalPositionEmbeddings` 類別，輸入時間步張量，輸出 `(batch_size, dim)` 大小的嵌入張量。

> **類型 2：調試**
> 擴散模型訓練後輸出純雜訊。找出以下 `reverse_diffusion()` 函數中的 bug。（提示：檢查方差調度）

> **類型 3：架構擴展**
> 在已訓練的模型中加入 Classifier-Free Guidance。實作 `guided_sampling(model, prompt, cfg_scale)` 函數，使得：
> - `cfg_scale=0` 時：輸出與無條件模型一致
> - `cfg_scale=7.5` 時：輸出符合 prompt

> **類型 4：整合**
> 結合 CLIP 編碼器和擴散模型。建立完整的文字輸入→生成圖像管線，包含：
> - CLIP 文字編碼
> - 向 U-Net 注入交叉注意力
> - 透過 DDPM 調度器的反向擴散迴圈

### 考試技巧

1. **仔細做實驗室，不要只是執行儲存格**——理解每行代碼，特別注意張量形狀
2. **記住公式**：$q(x_t | x_{t-1})$、$p_\theta(x_{t-1} | x_t)$、雜訊調度
3. **練習 PyTorch 基礎**：`nn.Module`、`forward()`、`torch.randn()`、einops
4. **模型輸出雜訊時不要慌張**——系統性調試：形狀檢查 → 損失檢查 → 調度檢查
5. **時間分配**：60% 時間用於實驗室，40% 用於評估

* * *

## 3. Building RAG Agents with LLMs — 最熱門課程

<table>
<tr><td><strong>課程代碼</strong></td><td>DLI+S-FX-15+V1</td></tr>
<tr><td><strong>時長</strong></td><td>8 小時</td></tr>
<tr><td><strong>價格</strong></td><td>$90</td></tr>
<tr><td><strong>級別</strong></td><td>技術 - 中級</td></tr>
<tr><td><strong>框架</strong></td><td>LangChain, Gradio, LangServe</td></tr>
<tr><td><strong>證書</strong></td><td>有</td></tr>
</table>

### 各模組詳細內容

**模組 1：LLM 推論介面和微服務**
- 設定環境以連接 NVIDIA NIM（推論微服務）
- 透過 API 查詢 LLM：提示格式、Token 管理
- 理解推論參數：temperature、top_p、max_tokens、stop sequences

**模組 2：使用 LangChain、Gradio、LangServe 的管線設計**
- 用 **LangChain Expression Language (LCEL)** 建構 LLM 管線
- 用 **Gradio** 快速建立 UI 原型
- 透過 **LangServe**（基於 FastAPI）將管線部署到生產環境
- 連接多個元件：提示模板 → LLM → 輸出解析器

**模組 3：帶有執行狀態的對話管理**
- **實作對話記憶**——在多個輪次中保留上下文
- 為對話流程建構**狀態機**
- 從自由測試對話中提取結構化資訊
- 將 LLM 輸出強制為 **Pydantic 模型**（結構化輸出）

**模組 4：文件操作**
- 載入、分割、解析文件（PDF、Markdown、代碼文件）
- **實作分塊策略**：遞迴字元、語義、句子
- 元資料提取和文件預處理

**模組 5：嵌入用於語義相似度和護欄**
- 使用嵌入模型進行**語義搜索**
- **實作餘弦相似度**用於搜索排名
- 使用嵌入距離建構**護欄**——偵測離題查詢

**模組 6：RAG Agent 的向量資料庫**
- 設定向量資料庫（FAISS/Milvus）
- 實作完整的 **RAG 管線**：查詢 → 檢索 → 增強 → 生成
- 評估 RAG 品質：相關性、忠實度、答案準確性

### 評估

**形式：** 基於編碼——建構並部署完整的 RAG Agent

**難度：🔴🔴🔴🔴⚪（4/5）**

**比 Diffusion Models 簡單**因為：
- 更多抽象層（LangChain、Gradio）——低階編碼較少
- 不需要繁重的數學
- 但仍然困難，因為需要**整合多個元件**成為完整系統

### 範例題目

> **類型 1：管線建構**
> 對於一個 PDF 論文資料集，建構以下 RAG 管線：
> - 塊大小 = 512，重疊 = 128
> - 嵌入模型：`NV-Embed-QA`
> - Top-k 檢索：5
> - 輸出：答案 + 來源引用

> **類型 2：護欄**
> 實作輸入護欄，讓與資料集無關的查詢被拒絕，回傳「I can only answer questions about AI research papers.」訊息。

> **類型 3：狀態管理**
> 修改 Agent 以支援後續問題。用戶問「什麼是 Attention？」→ Agent 回答。繼續問「誰發明了它？」→ Agent 必須理解「它」= Attention 機制。

### 考試技巧

1. **事先熟讀 LangChain 文件**——特別是 LCEL 語法
2. **理解嵌入維度**——維度不匹配是最常見的錯誤
3. **逐步測試管線**：先測試檢索，再加入生成
4. **塊大小很重要**——太小會丟失上下文，太大會帶入雜訊

* * *

## 4. Building Agentic AI Applications with LLMs — 最進階課程

<table>
<tr><td><strong>課程代碼</strong></td><td>DLI+C-FX-25+V1</td></tr>
<tr><td><strong>時長</strong></td><td>8 小時</td></tr>
<tr><td><strong>價格</strong></td><td>講師主導（聯繫 NVIDIA）</td></tr>
<tr><td><strong>級別</strong></td><td>技術 - 中級</td></tr>
<tr><td><strong>框架</strong></td><td>LangGraph, NVIDIA NIM, LangChain</td></tr>
<tr><td><strong>證書</strong></td><td>有</td></tr>
</table>

### 詳細內容

**第 1 節：Agent 抽象化與 LLM 基礎**
- LLM 的能力 vs. 陷阱（幻覺、上下文限制、推理失敗）
- Agent 作為**任務分解的抽象**
- 最小化 Agent 示範：自由測試 LLM → 結構化行動 → 執行

**第 2 節：結構化輸出與基礎實現**
- 將 LLM 輸出收斂到 **JSON/任務型 Schema**
- 領域對齊和穩定的 Schema 強制
- **認知架構介紹**（ReAct、Plan-and-Execute、LATS）

**第 3 節：檢索機制與環境工具化**
- 形式化 Agent 的**環境訪問策略**
- 為 DB、API、外部儲存庫建構工具介面
- 語義文件搜索的向量型 RAG
- 結構化領域知識的**知識圖譜**

**第 4 節：多 Agent 系統與框架**
- 在**專業化 Agent** 之間進行任務分解
- 通訊緩衝區和進程分配方案
- LangGraph：用於複雜 Agent 工作流程的狀態機

**第 5 節：最終評估**
- **難度：🔴🔴🔴🔴🔴（5/5）**

需要部署完整的**多 Agent 系統**：
- 接收用戶的複雜查詢
- 分解為子任務
- 路由到專業 Agent
- 聚合結果
- 返回連貫的回應

* * *

## 5. Evaluation and Light Customization of LLMs — 最新課程

<table>
<tr><td><strong>課程代碼</strong></td><td>DLI+S-FX-34+V1</td></tr>
<tr><td><strong>時長</strong></td><td>3 小時</td></tr>
<tr><td><strong>價格</strong></td><td>$90</td></tr>
<tr><td><strong>級別</strong></td><td>中級</td></tr>
<tr><td><strong>框架</strong></td><td>NVIDIA NeMo, NIM, MLflow, Docker</td></tr>
<tr><td><strong>證書</strong></td><td>有</td></tr>
</table>

### 詳細內容

**第一部分：LLM 評估基礎**
- 查詢已部署的 NVIDIA NIM
- 評估技術：目視確認 → 系統性基準測試
- **GSM8K 基準**——評估數學推理
- **LLM-as-a-Judge**——用強大的 LLM 評估較弱的 LLM

**第二部分：用 NeMo 進行系統性評估**
- **NeMo Evaluator** 微服務用於強健的評估工作流程
- 為**法律領域 QA** 準備自訂資料集
- 比較**零樣本 vs. 少樣本（ICL）**
- 指標：**BLEU、F1 Score、相似度分數**
- **MLflow** 實驗追蹤

**第三部分：使用 LoRA 的輕量自訂**
- **Parameter-Efficient Fine-Tuning (PEFT)** 原則
- **Low-Rank Adaptation (LoRA)**——只微調極少部分參數：

$$W' = W + \Delta W = W + BA$$

其中 $B \in \mathbb{R}^{d \times r}$，$A \in \mathbb{R}^{r \times k}$，秩 $r \ll \min(d, k)$

- **難度：🔴🔴🔴⚪⚪（3/5）**

* * *

## 6. GenAI 軌道補充課程

### Introduction to Transformer-Based NLP (S-FX-08)
- **6 小時 | $30 | 初級**
- 所有 LLM 課程的基礎
- NLP 任務：文字分類、NER、作者歸因、QA
- **推薦**：在開始任何其他課程之前先修

### Generative AI Explained (S-FX-07)
- **2 小時 | 免費 | 初級**
- 無代碼課程，概念概覽
- 適合管理者或非技術角色
- **無評估**——僅結業

### Prompt Engineering with LLaMA-2 (S-FX-12)
- **3 小時 | $30 | 初級**
- ⚠️ **已過期**（2025 年 12 月）——NVIDIA 可能發布新版本

### Building AI Agents with Multimodal Models (C-FX-17)
- **8 小時 | 講師主導**
- 專注於多模態 Agent——結合視覺 + 語言
- 2026 年目錄中的最新課程

* * *

## 7. 所有 GenAI 課程比較表

| 課程 | 代碼 | 時長 | 價格 | 評估難度 | 前置要求 |
|------|------|------|------|---------|---------|
| **Generative AI Explained** | S-FX-07 | 2h | 免費 | 無 | 無 |
| **Intro to Transformer NLP** | S-FX-08 | 6h | $30 | ⭐⭐ | 基礎深度學習 |
| **Generative AI with Diffusion Models** | S-FX-14 | 8h | $90 | ⭐⭐⭐⭐⭐ | PyTorch + 深度學習 |
| **Building RAG Agents** | S-FX-15 | 8h | $90 | ⭐⭐⭐⭐ | Python OOP + DL 基礎 |
| **Eval & Customization of LLMs** | S-FX-34 | 3h | $90 | ⭐⭐⭐ | Python + LLM 基礎 |
| **Agentic AI Applications** | C-FX-25 | 8h | 工作坊 | ⭐⭐⭐⭐⭐ | DL + Python 中級 |
| **AI Agents with Multimodal** | C-FX-17 | 8h | 工作坊 | ⭐⭐⭐⭐ | DL + 視覺 |

* * *

## 8. NVIDIA DLI 與其他認證的比較

| 標準 | NVIDIA DLI GenAI | AWS AI Practitioner | Azure AI-102 | Databricks GenAI |
|------|-----------------|---------------------|-------------|-----------------|
| **考試形式** | 動手編碼 | 85 題選擇題 | 50 題選擇題 + 案例研究 | 45 題選擇題 |
| **實際編碼** | ✅ 在 GPU 上寫代碼 | ❌ | ❌ | ❌ 但有情境 |
| **考試時間** | 1–2 小時（評估） | 120 分鐘 | 100 分鐘 | 120 分鐘 |
| **價格** | $30–$90（課程） | $150 | $165 | $200 |
| **GPU 存取** | ✅ 免費雲端 GPU | ❌ | ❌ | ❌ |
| **深度** | 🔴 非常深（代碼層面） | 🟡 淺（概念） | 🟠 中等（Azure 服務） | 🟠 中等（RAG/評估） |
| **供應商鎖定** | 低（PyTorch、開放標準） | 高（僅 AWS） | 高（僅 Azure） | 中等（Databricks） |
| **業界認可度** | ⭐⭐⭐⭐（技術界） | ⭐⭐⭐⭐⭐（普遍） | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **最適合** | ML 工程師、AI 研究者 | SA、PM、各級開發者 | Azure 開發者 | 資料工程師、MLOps |

**注意：**
- **NVIDIA DLI** 是**技術深度最高**的認證——你實際上在編碼深度學習模型
- **如果你是 ML 工程師**：NVIDIA DLI → Databricks → AWS
- **如果你是雲端架構師**：AWS → Azure → Databricks

* * *

## 9. 詳細備考路線

### 第一階段：基礎（2 週）

**目標：** 掌握深度學習基礎和 PyTorch

<table>
<tr><th>週</th><th>活動</th><th>資源</th></tr>
<tr><td>1</td><td>深度學習基礎：神經網路、反向傳播、CNN、RNN</td><td>DLI: Getting Started with Deep Learning（免費）</td></tr>
<tr><td>1</td><td>PyTorch 基礎：張量、autograd、nn.Module</td><td>PyTorch 官方教學</td></tr>
<tr><td>2</td><td>Transformer 架構：注意力機制、多頭注意力</td><td>DLI: Intro to Transformer NLP（S-FX-08，$30）</td></tr>
<tr><td>2</td><td>動手實作：微調 BERT 進行文字分類</td><td>HuggingFace 教學</td></tr>
</table>

### 第二階段：生成式 AI 核心（3 週）

**目標：** 掌握擴散模型和 LLM 基礎

<table>
<tr><th>週</th><th>活動</th><th>資源</th></tr>
<tr><td>3</td><td>擴散理論：前向/反向過程、DDPM 論文</td><td>論文：「Denoising Diffusion Probabilistic Models」（Ho et al.）</td></tr>
<tr><td>3–4</td><td><strong>主課程：Generative AI with Diffusion Models（S-FX-14，$90）</strong></td><td>NVIDIA DLI，8 小時</td></tr>
<tr><td>4</td><td>複習：U-Net 代碼、雜訊調度、CLIP 整合</td><td>複習實驗室筆記本</td></tr>
<tr><td>5</td><td>加分：Stable Diffusion 內部機制、Latent Diffusion</td><td>論文：「High-Resolution Image Synthesis with LDM」</td></tr>
</table>

### 第三階段：LLM 應用（3 週）

**目標：** 建構生產就緒的 LLM 系統

<table>
<tr><th>週</th><th>活動</th><th>資源</th></tr>
<tr><td>6</td><td>LangChain 基礎、LCEL、提示模板</td><td>LangChain 文件 + 教學</td></tr>
<tr><td>6–7</td><td><strong>主課程：Building RAG Agents（S-FX-15，$90）</strong></td><td>NVIDIA DLI，8 小時</td></tr>
<tr><td>7</td><td>向量資料庫深入：FAISS、Milvus、pgvector</td><td>官方文件</td></tr>
<tr><td>8</td><td><strong>主課程：Eval & Customization of LLMs（S-FX-34，$90）</strong></td><td>NVIDIA DLI，3 小時</td></tr>
</table>

### 第四階段：進階 Agent（2 週）

**目標：** Agent 架構和多 Agent 系統

<table>
<tr><th>週</th><th>活動</th><th>資源</th></tr>
<tr><td>9</td><td>LangGraph 深入：狀態機、條件邊</td><td>LangGraph 教學</td></tr>
<tr><td>10</td><td><strong>主課程：Agentic AI Applications（C-FX-25）</strong></td><td>NVIDIA DLI 講師主導，8 小時</td></tr>
</table>

### 預估總費用

| 項目 | 費用 |
|------|------|
| Generative AI Explained（免費） | $0 |
| Intro to Transformer NLP | $30 |
| Generative AI with Diffusion Models | $90 |
| Building RAG Agents | $90 |
| Eval & Customization of LLMs | $90 |
| Agentic AI Applications（工作坊） | ~$500–$1,000 |
| **總計（僅自學）** | **$300** |
| **總計（含工作坊）** | **$800–$1,300** |

> **省錢技巧：** 報名 NVIDIA 網路研討會（2026 年 4 月 30 日），取得 **50% 折扣碼**。

* * *

## 10. 20 題範例評估（模擬測驗）

### 擴散模型（S-FX-14）

**Q1.** 用以下骨架代碼實作 `forward_diffusion()`：

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
<summary><strong>答案</strong></summary>

```python
def forward_diffusion(x_0, t, noise_schedule):
    alpha_bar_t = noise_schedule['alpha_bar'][t]  # (B,)
    alpha_bar_t = alpha_bar_t[:, None, None, None]  # (B, 1, 1, 1)
    noise = torch.randn_like(x_0)
    x_t = torch.sqrt(alpha_bar_t) * x_0 + torch.sqrt(1 - alpha_bar_t) * noise
    return x_t, noise
```

**解釋：** 前向擴散遵循以下公式加入雜訊：
$$q(x_t | x_0) = \mathcal{N}(x_t; \sqrt{\bar{\alpha}_t} x_0, (1 - \bar{\alpha}_t) \mathbf{I})$$

</details>

---

**Q2.** 時間步的正弦位置嵌入是什麼形狀的？實作輸出維度 = 128 的 `TimestepEmbedding(nn.Module)` 類別。

<details>
<summary><strong>答案</strong></summary>

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

**Q3.** Classifier-Free Guidance 比例 $w = 7.5$。無條件預測 = $\epsilon_u$，條件預測 = $\epsilon_c$。寫出計算引導預測的代碼。

<details>
<summary><strong>答案</strong></summary>

```python
guided_pred = epsilon_u + 7.5 * (epsilon_c - epsilon_u)
```

</details>

---

**Q4.** Group Normalization 與 Batch Normalization 有何不同？擴散模型為何偏好 Group Norm？

<details>
<summary><strong>答案</strong></summary>

- **BatchNorm** 跨批次維度正規化 → 依賴批次大小，小批次時不穩定
- **GroupNorm** 在每個樣本內的通道組之間正規化 → **不依賴批次大小**
- 擴散模型通常用**小批次大小**訓練（大型圖像佔用 GPU 記憶體）→ GroupNorm 更穩定

</details>

---

**Q5.** 除錯：反向擴散後模型輸出全黑圖像。以下代碼中的 bug 是什麼？

```python
for t in range(T, 0, -1):
    pred_noise = model(x_t, t)
    alpha_t = noise_schedule['alpha'][t]
    alpha_bar_t = noise_schedule['alpha_bar'][t]
    x_t = (x_t - pred_noise) / torch.sqrt(alpha_t)  # BUG
```

<details>
<summary><strong>答案</strong></summary>

Bug：反向擴散公式錯誤。正確版本：

```python
x_t = (1 / torch.sqrt(alpha_t)) * (
    x_t - (1 - alpha_t) / torch.sqrt(1 - alpha_bar_t) * pred_noise
)
if t > 1:
    x_t += torch.sqrt(noise_schedule['beta'][t]) * torch.randn_like(x_t)
```

缺少的是：(1) 雜訊前的正確係數，(2) t > 1 時的後驗方差項。

</details>

---

### RAG Agent（S-FX-15）

**Q6.** 透過餘弦相似度實作語義相似度搜索。給定 `query_embedding`（1, 768）和 `doc_embeddings`（N, 768），返回前 5 個索引。

<details>
<summary><strong>答案</strong></summary>

```python
import torch.nn.functional as F

similarities = F.cosine_similarity(
    query_embedding, doc_embeddings, dim=1
)
top_5_indices = similarities.argsort(descending=True)[:5]
```

</details>

---

**Q7.** 分塊策略：文件長度為 10,000 個 Token。塊大小 = 512，重疊 = 128。計算塊數。

<details>
<summary><strong>答案</strong></summary>

$$\text{塊數} = \lceil \frac{10000 - 512}{512 - 128} \rceil + 1 = \lceil \frac{9488}{384} \rceil + 1 = 25 + 1 = 26$$

</details>

---

**Q8.** 為摘要任務寫一個 LangChain LCEL 管線：提示模板 → LLM → 輸出解析器。

<details>
<summary><strong>答案</strong></summary>

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

**Q9.** 實作輸入護欄：拒絕與主題嵌入的餘弦相似度 < 0.3 的查詢。

<details>
<summary><strong>答案</strong></summary>

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

**Q10.** RAG 評估：Precision@5 = 0.6，Recall@5 = 0.3。解釋含義並提出改進策略。

<details>
<summary><strong>答案</strong></summary>

- **Precision@5 = 0.6**：檢索的 5 個中有 3 個相關 → 搜索相當好
- **Recall@5 = 0.3**：只找到所有相關文件的 30% → **召回率低**
- **改進策略**：
  1. 增加 top-k 到 10–20（精確率-召回率權衡）
  2. 改善分塊——更小的塊以獲得更精確的匹配
  3. 混合搜索：BM25 + 語義搜索
  4. 初始檢索後加入重排層

</details>

---

### LLM 評估與自訂（S-FX-34）

**Q11.** LoRA 秩 r = 16，模型維度 d = 4096，k = 4096。計算相對於全量微調的微調參數百分比。

<details>
<summary><strong>答案</strong></summary>

$$\text{全量微調參數} = d \times k = 4096 \times 4096 = 16,777,216$$
$$\text{LoRA 參數} = d \times r + r \times k = 4096 \times 16 + 16 \times 4096 = 131,072$$
$$\text{比率} = \frac{131,072}{16,777,216} = 0.78\%$$

LoRA 只微調**不到 1% 的參數**，同時達到接近全量微調的性能。

</details>

---

**Q12.** BLEU score = 0.15，F1 = 0.72。模型存在什麼問題？

<details>
<summary><strong>答案</strong></summary>

- **低 BLEU（0.15）**：模型用**不同的表達方式**生成文字——不一定是錯的
- **高 F1（0.72）**：內容（關鍵資訊）大部分正確
- **診斷**：模型能很好地改述，但與確切表達不匹配 → BLEU 對 QA 任務是不合適的指標
- **對策**：使用**語義相似度**或 **LLM-as-a-judge** 取代 BLEU 進行更精確的評估

</details>

---

### Agent AI（C-FX-25）

**Q13.** 實作結構化輸出：LLM 需要以 Schema `{"action": str, "params": dict, "confidence": float}` 返回 JSON。

<details>
<summary><strong>答案</strong></summary>

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

**Q14.** LangGraph：實作條件邊——如果查詢需要研究則路由到 `search_agent`，如果上下文足夠則路由到 `answer_agent`。

<details>
<summary><strong>答案</strong></summary>

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

### 跨課程問題

**Q15.** 為什麼 DDPM（Denoising Diffusion Probabilistic Model）推論需要 1000 步，而 Latent Diffusion 只需要 50 步？

<details>
<summary><strong>答案</strong></summary>

- **DDPM**：在**像素空間**擴散（256×256×3 = 196,608 維）→ 去噪需要更多步驟
- **LDM**：在**潛在空間**擴散（32×32×4 = 4,096 維）→ 壓縮 48 倍 → 需要的步驟更少
- 此外，LDM 使用 **DDIM 調度器**（確定性）代替 DDPM（隨機性）→ 可以跳過步驟

</details>

---

**Q16.** 系統設計：為一家律師事務所建構 RAG Agent。50,000 個文件，100 個並發用戶，響應 < 3 秒。概略描述架構。

<details>
<summary><strong>答案</strong></summary>

```
用戶 → 負載均衡器 → API 網關
    → 輸入護欄（主題過濾器）
    → 查詢路由器
        → 向量 DB（Milvus，50K 文件，GPU 加速）
        → BM25 索引（Elasticsearch，關鍵字搜索）
    → Reciprocal Rank Fusion（合併結果）
    → 重排器（交叉編碼器，Top 20 → Top 5）
    → LLM（NVIDIA NIM，8x H100，批次推論）
    → 輸出護欄（PII 過濾器、引用檢查）
    → 帶來源的回應
```

**關鍵決策：**
- Milvus 用於向量搜索（GPU 加速，50K 規模 < 100ms）
- 混合搜索用於法律領域精確度
- 重排器提升準確性
- NVIDIA NIM 用於最佳化 LLM 推論（< 2 秒）
- 輸出護欄中的 PII 偵測（法律合規）

</details>

* * *

## 11. 結論

NVIDIA DLI Generative AI 軌道是**對於真正想動手實作生成模型的工程師來說的最佳選擇**。沒有選擇題，沒有空談——你需要寫代碼、除錯模型、建構系統。

**如果只能選一門課程：** 從 **Building RAG Agents（S-FX-15）**開始——最實際的應用，業界需求最高。

**如果想要脫穎而出：** 加上 **Generative AI with Diffusion Models（S-FX-14）**——最難的課程，擁有的人不多，證明深厚的技術能力。

**如果想成為全棧 GenAI 工程師：** 修完所有 4 門自學課程 + 1 門講師主導工作坊。

### 額外資源

- [NVIDIA DLI 課程目錄](https://www.nvidia.com/en-us/training/self-paced-courses/)
- [NVIDIA 認證入口](https://www.nvidia.com/en-us/learn/certification/)
- 論文：[Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239)（Ho et al.，2020）
- 論文：[LoRA: Low-Rank Adaptation of LLMs](https://arxiv.org/abs/2106.09685)（Hu et al.，2021）
- 論文：[Attention Is All You Need](https://arxiv.org/abs/1706.03762)（Vaswani et al.，2017）

> **下一場網路研討會：** NVIDIA Certification 2026 — 2026 年 4 月 30 日 — 報名取得認證考試 50% 折扣碼。[立即報名](https://www.nvidia.com/en-us/events/whats-new-with-nvidia-certification-2026/)
