---
id: 019c9619-ff04-7004-a004-ff0400000004
title: 第 4 課：文件載入 — PDF、DOCX、Web、YouTube、程式碼
slug: bai-4-document-loading
description: >-
  處理各種文件來源：PDF、DOCX、HTML/Web、YouTube 轉錄本、程式碼儲存庫。 LangChain 文件載入器與 LlamaIndex
  閱讀器。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 3
section_title: 第 2 部分：文件處理管道
course:
  id: 019c9619-aa05-7005-b005-aa0500000005
  title: 真實戰鬥 RAG：從基礎到高級
  slug: rag-thuc-chien
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-9842" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-9842)"/>

  <!-- Decorations -->
  <g>
    <circle cx="874" cy="212" r="12" fill="#f472b6" opacity="0.07"/>
    <circle cx="648" cy="186" r="14" fill="#f472b6" opacity="0.09"/>
    <circle cx="922" cy="160" r="16" fill="#f472b6" opacity="0.11"/>
    <circle cx="696" cy="134" r="18" fill="#f472b6" opacity="0.13"/>
    <circle cx="970" cy="108" r="20" fill="#f472b6" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <line x1="600" y1="152" x2="1100" y2="232" stroke="#f472b6" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="182" x2="1050" y2="252" stroke="#f472b6" stroke-width="0.5" opacity="0.08"/>
    <polygon points="925.3826859021799,88.5 925.3826859021799,115.5 902,129 878.6173140978201,115.5 878.6173140978201,88.5 902,75" fill="none" stroke="#f472b6" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#f472b6"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="99" height="28" rx="14" fill="#f472b6" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f472b6">🧠 人工智慧與機器學習 — 第 3 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 4 課：文件載入 — PDF、DOCX、Web、</tspan>
      <tspan x="60" dy="42">YouTube、程式碼</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">真實戰鬥 RAG：從基礎到高級</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 2 部分：文件處理管道</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 簡介

RAG 管道從 **資料** 開始 - 資料可以是 **任何格式**：PDF、Word、網頁、YouTube 影片、程式碼儲存庫...本課程教您如何 **載入** 所有常見文件類型到 RAG 管道中。

> **規則：** 垃圾輸入 = 垃圾輸出。文檔載入**高品質** = RAG **高品質**。

---

## 1. 文件載入器概述

### 1.1 熱門資料來源

|來源 |格式|挑戰|
|--------|--------|------------|
| **PDF** | .pdf |表格、圖形、多列、掃描 |
| **字** | .docx、.doc |格式、頁首/頁尾 |
| **網頁** | HTML | JavaScript 渲染，噪音 |
| **YouTube** |影片/音訊|需要成績單、時間戳記 |
| **程式碼儲存庫** | .py、.js、.md |結構、依賴關係 |
| **CSV/Excel** | .csv、.xlsx |表格資料→文字|
| **資料庫** | SQL |查詢、模式理解 |

### 1.2 LangChain文件載入器

LangChain提供了豐富的文件載入器生態系統：

```python
from langchain_community.document_loaders import (
    PyPDFLoader,          # PDF
    Docx2txtLoader,       # Word
    WebBaseLoader,        # Web pages
    YoutubeLoader,        # YouTube
    GitLoader,            # Git repos
    CSVLoader,            # CSV files
    TextLoader,           # Plain text
    UnstructuredExcelLoader,  # Excel
)
```

---

## 2. PDF — 最受歡迎的文件類型

### 2.1 PyPDFLoader — 基礎知識

```python
"""Load PDF đơn giản nhất — PyPDFLoader"""
from langchain_community.document_loaders import PyPDFLoader

# Load từng trang
loader = PyPDFLoader("company_handbook.pdf")
pages = loader.load()

print(f"Số trang: {len(pages)}")
for i, page in enumerate(pages[:3]):
    print(f"\n--- Trang {i+1} ---")
    print(f"Nội dung: {page.page_content[:200]}...")
    print(f"Metadata: {page.metadata}")
    # metadata = {"source": "company.pdf", "page": 0}
```

### 2.2 進階 PDF — 處理表格和圖形

PyPDF 很簡單，但在表格和圖形方面**弱**。對複雜的 PDF 使用 **非結構化**：

```python
"""Unstructured: xử lý PDF phức tạp (bảng, hình, multi-column)"""
from langchain_community.document_loaders import UnstructuredPDFLoader

# Partition strategy: "hi_res" cho chất lượng cao
loader = UnstructuredPDFLoader(
    "financial_report.pdf",
    mode="elements",           # Tách từng element (text, table, image)
    strategy="hi_res",         # OCR + layout analysis
)
elements = loader.load()

# Lọc theo loại element
for elem in elements[:10]:
    elem_type = elem.metadata.get("category", "unknown")
    print(f"[{elem_type}] {elem.page_content[:100]}...")
```

### 2.3 比較 PDF 載入器

|裝載機|表|圖| OCR（掃描）|速度|設定|
|--------|--------|--------|------------|--------|--------|
| **PyPDFLoader** | ❌ | ❌ | ❌ | ⚡ 快| `pip install pypdf` |
| **PyMuPDFLoader** | ⚠️ | ❌ | ❌ | ⚡ 快| `pip install pymupdf` |
| **非結構化PDFLoader** | ✅ | ✅ | ✅ | 🐢 慢 | `pip install unstructured[pdf]` |
| **亞馬遜 Textract** | ✅ | ✅ | ✅ | ⚡ | AWS 帳號 |

> **建議：** 從 **PyPDFLoader** 開始。如果 PDF 包含表格/圖形，請使用 **非結構化**。

---

## 3. 網頁

### 3.1 載入網站

```python
"""Load nội dung từ trang web"""
from langchain_community.document_loaders import WebBaseLoader

# Load 1 trang
loader = WebBaseLoader("https://blog.xdev.asia/ai/")
docs = loader.load()

print(f"Content length: {len(docs[0].page_content)} chars")
print(docs[0].page_content[:500])

# Load nhiều trang
urls = [
    "https://blog.xdev.asia/blog/post-1",
    "https://blog.xdev.asia/blog/post-2",
    "https://blog.xdev.asia/blog/post-3",
]
loader = WebBaseLoader(urls)
docs = loader.load()
print(f"Loaded {len(docs)} pages")
```

### 3.2 爬取網站（網站地圖）

```python
"""Crawl tất cả trang từ sitemap"""
from langchain_community.document_loaders.sitemap import SitemapLoader

loader = SitemapLoader(
    web_path="https://blog.xdev.asia/sitemap.xml",
    filter_urls=["https://blog.xdev.asia/blog/"],  # Chỉ blog
)
docs = loader.load()
print(f"Crawled {len(docs)} pages from blog")
```

---

## 4. YouTube 腳本

```python
"""Load transcript từ YouTube video"""
from langchain_community.document_loaders import YoutubeLoader

# Load transcript (auto-generated hoặc manual)
loader = YoutubeLoader.from_youtube_url(
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    add_video_info=True,         # Thêm title, description
    language=["vi", "en"],       # Ưu tiên tiếng Việt
)
docs = loader.load()

print(f"Title: {docs[0].metadata.get('title')}")
print(f"Duration: {docs[0].metadata.get('length')} seconds")
print(f"Transcript: {docs[0].page_content[:300]}...")
```

---

## 5. 程式碼儲存庫

```python
"""Load code từ Git repo"""
from langchain_community.document_loaders import GitLoader

# Clone + load tất cả files
loader = GitLoader(
    clone_url="https://github.com/user/project",
    repo_path="./temp_repo",
    branch="main",
    file_filter=lambda f: f.endswith((".py", ".md", ".yaml")),
)
docs = loader.load()

print(f"Loaded {len(docs)} files")
for doc in docs[:5]:
    print(f"  {doc.metadata['file_path']} ({len(doc.page_content)} chars)")
```

---

## 6. 批次處理－處理多個文件

### 6.1 載入資料夾

```python
"""Load tất cả tài liệu trong folder"""
from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader
from pathlib import Path

# Load tất cả PDF trong folder
loader = DirectoryLoader(
    "./company_docs/",
    glob="**/*.pdf",           # Recursive, chỉ PDF
    loader_cls=PyPDFLoader,
    show_progress=True,
    use_multithreading=True,   # Parallel loading
)
docs = loader.load()
print(f"Loaded {len(docs)} pages from PDF files")

# Thêm custom metadata
for doc in docs:
    filename = Path(doc.metadata["source"]).stem
    doc.metadata["department"] = "HR" if "hr" in filename.lower() else "General"
    doc.metadata["doc_type"] = "policy"
```

### 6.2 多格式載入器

```python
"""Unified loader cho nhiều format"""
from langchain_community.document_loaders import (
    PyPDFLoader, Docx2txtLoader, TextLoader, CSVLoader
)
from pathlib import Path

def load_document(file_path: str):
    """Load document dựa trên extension."""
    ext = Path(file_path).suffix.lower()
    
    loaders = {
        ".pdf": PyPDFLoader,
        ".docx": Docx2txtLoader,
        ".txt": TextLoader,
        ".md": TextLoader,
        ".csv": CSVLoader,
    }
    
    loader_cls = loaders.get(ext)
    if not loader_cls:
        raise ValueError(f"Unsupported format: {ext}")
    
    return loader_cls(file_path).load()

# Usage
all_docs = []
for f in Path("./docs/").glob("**/*"):
    if f.suffix in [".pdf", ".docx", ".txt", ".md", ".csv"]:
        try:
            docs = load_document(str(f))
            all_docs.extend(docs)
            print(f"✅ {f.name}: {len(docs)} chunks")
        except Exception as e:
            print(f"❌ {f.name}: {e}")

print(f"\nTotal: {len(all_docs)} documents loaded")
```

> **💡練習 6：** 編寫一個腳本來載入資料夾中的所有文件（混合 PDF + DOCX + TXT）。列印輸出：檔案名稱、頁數/區塊數、總字元數。優雅地處理錯誤。

---

## 7. 提示與最佳實踐

|提示|說明|
|-----|------------|
| **裝載前清潔** |刪除頁首/頁尾、頁碼、浮水印 |
| **新增元資料** |來源、日期、類別－用於稍後過濾 |
| **處理編碼** |越南語：UTF-8。查看 `chardet` 如果未知 |
| **批次** |對大型資料夾（100+ 個檔案）使用多執行緒 |
| **測試品質** |裝載後抽查 10% 文件 |
| **錯誤處理** |日誌檔已損壞，不要默默跳過|

---

## 總結

|來源 |裝載機|筆記|
|--------|--------|--------|
| **PDF** | PyPDFLoader / 非結構化 |非結構化表格/數字 |
| **網頁** | WebBaseLoader / 網站地圖載入器 |透過網站地圖抓取整個網站 |
| **YouTube** | YoutubeLoader |自動轉錄 + 元資料 |
| **程式碼** | GitLoader |副檔名檔案過濾器 |
| **資料夾** |目錄載入器 |多執行緒、遞迴 |

## 一般練習

1. ✅ 完成小練習（6）
2. **建立攝取管道：** 編寫函數 `ingest(folder_path)` 載入資料夾中的所有檔案 → 傳回包含完整元資料的文件清單。
3. **PDF基準：** 拍攝一個複雜的PDF（有表格+圖片）。比較 PyPDFLoader 與非結構化之間的輸出。品質有何不同？
4. **網路爬蟲：** 從喜愛的網站爬取 10 篇部落格文章 → 載入到 ChromaDB → 建立「與部落格聊天」。

> **下一篇文章：** 分塊策略 — 如何將文件分割為最佳區塊以供檢索。
