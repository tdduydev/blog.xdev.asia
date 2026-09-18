---
id: 019c9619-ff04-7004-a004-ff0400000004
title: 'レッスン 4: ドキュメントの読み込み — PDF、DOCX、Web、YouTube、コード'
slug: bai-4-document-loading
description: >-
  PDF、DOCX、HTML/Web、YouTube トランスクリプト、コード リポジトリなど、さまざまなドキュメント ソースを処理します。
  LangChain ドキュメント ローダーと LlamaIndex リーダー。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 3
section_title: 'パート 2: ドキュメント処理パイプライン'
course:
  id: 019c9619-aa05-7005-b005-aa0500000005
  title: リアルバトルRAG：基礎から上級まで
  slug: rag-thuc-chien
locale: ja
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f472b6">🧠 AI と ML — レッスン 3</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 4: ドキュメントの読み込み — PDF、DOCX、Web、</tspan>
      <tspan x="60" dy="42">YouTube、コード</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">リアルバトルRAG：基礎から上級まで</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 2: ドキュメント処理パイプライン</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## はじめに

RAG パイプラインは **データ** から始まります。データは PDF、Word、Web ページ、YouTube ビデオ、コード リポジトリなど**任意の形式**にすることができます。このレッスンでは、すべての一般的なドキュメント タイプを RAG パイプラインに**ロード**する方法を説明します。

> **ルール:** ガベージイン = ガベージアウト。ドキュメントの読み込み **高品質** = RAG **高品質**。

---

## 1. ドキュメント ローダーの概要

### 1.1 一般的なデータソース

|出典 |フォーマット |チャレンジ |
|----------|----------|----------|
| **PDF** | .pdf |表、図、複数列、スキャン |
| **単語** | .docx、.doc |書式設定、ヘッダー/フッター |
| **ウェブページ** | HTML | JavaScript レンダリング、ノイズ |
| **YouTube** |ビデオ/オーディオ |トランスクリプト、タイムスタンプが必要 |
| **コード リポジトリ** | .py、.js、.md |構造、依存関係 |
| **CSV/Excel** | .csv、.xlsx |表形式データ → テキスト |
| **データベース** | SQL |クエリ、スキーマの理解 |

### 1.2 LangChain ドキュメント ローダー

LangChain は、ドキュメント ローダーの豊富なエコシステムを提供します。

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

## 2. PDF — 最も一般的なドキュメントの種類

### 2.1 PyPDFLoader — 基本

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

### 2.2 高度な PDF — 表と図の処理

PyPDF はシンプルですが、表や図を扱うのが **苦手**です。複雑な PDF には **非構造化** を使用します。

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

### 2.3 PDF ローダーの比較

|ローダー |表 |図 | OCR（スキャン） |スピード |設定 |
|----------|----------|----------|----------|----------|----------|
| **PyPDFLoader** | ❌ | ❌ | ❌ | ⚡ 速い | `pip install pypdf` |
| **PyMuPDFLoader** | ⚠️ | ❌ | ❌ | ⚡ 速い | `pip install pymupdf` |
| **非構造化PDFLoader** | ✅ | ✅ | ✅ | 🐢 遅い | `pip install unstructured[pdf]` |
| **Amazon Textract** | ✅ | ✅ | ✅ | ⚡ | AWS アカウント |

> **推奨事項:** **PyPDFLoader** から始めます。 PDF に表や図がある場合は、**非構造化** を使用してください。

---

## 3. Web ページ

### 3.1 Web サイトをロードする

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

### 3.2 Web サイトをクロールする (サイトマップ)

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

## 4. YouTube トランスクリプト

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

## 5. コードリポジトリ

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

## 6. バッチ処理 — 複数のファイルの処理

### 6.1 ドキュメントフォルダーの読み込み

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

### 6.2 マルチフォーマットローダー

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

> **💡 演習 6:** フォルダー内のすべてのドキュメントをロードするスクリプトを作成します (PDF + DOCX + TXT を混合)。出力: ファイル名、ページ/チャンク数、総文字数。エラーを適切に処理します。

---

## 7. ヒントとベストプラクティス

|ヒント |説明 |
|-----|----------|
| **積み込む前に掃除してください** |ヘッダー/フッター、ページ番号、透かしを削除 |
| **メタデータを追加** |ソース、日付、カテゴリ — 後でフィルタリングするために使用されます。
| **ハンドルエンコーディング** |ベトナム語: UTF-8。チェック `chardet` 不明な場合 |
| **バッチ処理** |大きなフォルダー (100 以上のファイル) にはマルチスレッドを使用する |
| **テストの品質** |ロード後に 10% のドキュメントを抜き取りチェック |
| **エラー処理** |ログ ファイルが破損しています。サイレント スキップしないでください。

---

## 概要

|出典 |ローダー |メモ |
|----------|----------|----------|
| **PDF** | PyPDFLoader / 非構造化 |表/図の非構造化 |
| **ウェブ** | WebBaseLoader / サイトマップローダー |サイトマップ経由でサイト全体をクロールする |
| **YouTube** | Youtubeローダー |自動転写 + メタデータ |
| **コード** | GitLoader |拡張子のファイルフィルター |
| **フォルダー** |ディレクトリローダー |マルチスレッド、再帰的 |

## 一般的な演習

1. ✅ 小さな演習を完了する (6)
2. **取り込みパイプラインの構築:** 関数の書き込み `ingest(folder_path)` フォルダー内のすべてのファイルをロードし、完全なメタデータを含むドキュメントのリストを返します。
3. **PDF ベンチマーク:** 複雑な PDF (表と画像を含む) を作成します。 PyPDFLoader と非構造化の出力を比較します。品質はどう違うのでしょうか？
4. **Web クローラー:** お気に入りの Web サイトから 10 件のブログ投稿をクロール → ChromaDB にロード → 「Chat with Blog」を作成します。

> **次の記事:** チャンキング戦略 — 文書を取得のために最適なチャンクに分割する方法。
