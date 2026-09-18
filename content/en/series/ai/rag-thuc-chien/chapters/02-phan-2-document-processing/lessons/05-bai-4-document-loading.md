---
id: 019c9619-ff04-7004-a004-ff0400000004
title: 'Lesson 4: Document Loading — PDF, DOCX, Web, YouTube, Code'
slug: bai-4-document-loading
description: >-
  Handle a variety of document sources: PDF, DOCX, HTML/Web, YouTube
  transcripts, code repos. LangChain document loaders vs LlamaIndex readers.
duration_minutes: 120
is_free: true
video_url: null
sort_order: 3
section_title: 'Part 2: Document Processing Pipeline'
course:
  id: 019c9619-aa05-7005-b005-aa0500000005
  title: 'Real Battle RAG: From Basic to Advanced'
  slug: rag-thuc-chien
locale: en
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f472b6">🧠 AI & ML — Lesson 3</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 4: Document Loading — PDF, DOCX, Web,</tspan>
      <tspan x="60" dy="42">YouTube, Code</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Real Battle RAG: From Basic to Advanced</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 2: Document Processing Pipeline</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Introduction

RAG pipeline starts from **data** — and data can be in **any format**: PDF, Word, web page, YouTube video, code repo... This lesson teaches you how to **load** all common document types into RAG pipeline.

> **Rule:** Garbage in = Garbage out. Document loading **high quality** = RAG **high quality**.

---

## 1. Overview of Document Loaders

### 1.1 Popular data sources

| Source | Format | Challenge |
|-------|--------|-----------|
| **PDF** | .pdf | Table, figure, multi-column, scan |
| **Word** | .docx, .doc | Formatting, headers/footers |
| **Web Pages** | HTML | JavaScript rendering, noise |
| **YouTube** | Video/Audio | Need transcript, timestamp |
| **Code Repository** | .py, .js, .md | Structure, dependencies |
| **CSV/Excel** | .csv, .xlsx | Tabular data → text |
| **Database** | SQL | Query, schema understanding |

### 1.2 LangChain Document Loaders

LangChain provides a rich ecosystem of document loaders:

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

## 2. PDF — The most popular document type

### 2.1 PyPDFLoader — Basics

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

### 2.2 Advanced PDF — Handling tables and figures

PyPDF is simple but **weak** with tables and figures. Use **Unstructured** for complex PDFs:

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

### 2.3 Compare PDF loaders

| Loader | Table | Figure | OCR (scan) | Speed ​​| Settings |
|--------|--------|-------|-----------|-------|--------|
| **PyPDFLoader** | ❌ | ❌ | ❌ | ⚡ Fast | `pip install pypdf` |
| **PyMuPDFLoader** | ⚠️ | ❌ | ❌ | ⚡ Fast | `pip install pymupdf` |
| **UnstructuredPDFLoader** | ✅ | ✅ | ✅ | 🐢 Slow | `pip install unstructured[pdf]` |
| **Amazon Textract** | ✅ | ✅ | ✅ | ⚡ | AWS accounts |

> **Recommendation:** Start with **PyPDFLoader**. If the PDF has tables/figures, use **Unstructured**.

---

## 3. Web Pages

### 3.1 Load website

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

### 3.2 Crawl website (Sitemap)

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

## 4. YouTube Transcripts

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

## 5. Code Repositories

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

## 6. Batch Processing — Processing multiple files

### 6.1 Load document folder

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

### 6.2 Multi-format loader

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

> **💡 Exercise 6:** Write a script to load all documents in a folder (mix PDF + DOCX + TXT). Print out: file name, number of pages/chunks, total characters. Handle errors gracefully.

---

## 7. Tips & Best Practices

| Tip | Explanation |
|-----|-----------|
| **Clean before loading** | Delete headers/footers, page numbers, watermarks |
| **Add metadata** | Source, date, category — used for filtering later |
| **Handle encoding** | Vietnamese: UTF-8. Check `chardet` if unknown |
| **Batch processing** | Use multithread for large folders (100+ files) |
| **Test quality** | Spot-check 10% documents after loading |
| **Error handling** | Log files are corrupted, do not skip silently |

---

## Summary

| Source | Loader | Notes |
|-------|--------|--------|
| **PDF** | PyPDFLoader / Unstructured | Unstructured for tables/figures |
| **Web** | WebBaseLoader / SitemapLoader | Crawl full site via sitemap |
| **YouTube** | YoutubeLoader | Auto-transcript + metadata |
| **Code** | GitLoader | File filter for extensions |
| **Folder** | DirectoryLoader | Multithread, recursive |

## General exercises

1. ✅ Complete small exercises (6)
2. **Build Ingestion Pipeline:** Write function `ingest(folder_path)` Load all files in the folder → return a list of documents with complete metadata.
3. **PDF Benchmark:** Take a complex PDF (with tables + pictures). Compare output between PyPDFLoader vs Unstructured. How does the quality differ?
4. **Web Crawler:** Crawl 10 blog posts from a favorite website → load into ChromaDB → create "Chat with Blog".

> **Next article:** Chunking Strategies — how to divide documents into optimal chunks for retrieval.
