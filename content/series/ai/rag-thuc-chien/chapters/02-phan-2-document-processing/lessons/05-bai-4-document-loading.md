---
id: 019c9619-ff04-7004-a004-ff0400000004
title: 'Bài 4: Document Loading — PDF, DOCX, Web, YouTube, Code'
slug: bai-4-document-loading
description: >-
  Xử lý đa dạng nguồn tài liệu: PDF, DOCX, HTML/Web, YouTube transcripts,
  code repos. LangChain document loaders vs LlamaIndex readers.
duration_minutes: 120
is_free: true
video_url: null
sort_order: 3
section_title: "Phần 2: Document Processing Pipeline"
course:
  id: 019c9619-aa05-7005-b005-aa0500000005
  title: "RAG Thực Chiến: Từ Basic đến Advanced"
  slug: rag-thuc-chien
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f472b6">🧠 AI &amp; ML — Bài 3</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 4: Document Loading — PDF, DOCX, Web,</tspan>
      <tspan x="60" dy="42">YouTube, Code</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">RAG Thực Chiến: Từ Basic đến Advanced</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 2: Document Processing Pipeline</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Giới thiệu

RAG pipeline bắt đầu từ **data** — và data có thể ở **mọi format**: PDF, Word, trang web, video YouTube, code repo... Bài này dạy bạn cách **load** tất cả các loại tài liệu phổ biến vào RAG pipeline.

> **Quy tắc:** Garbage in = Garbage out. Document loading **chất lượng cao** = RAG **chất lượng cao**.

---

## 1. Tổng quan Document Loaders

### 1.1 Các nguồn data phổ biến

| Nguồn | Format | Thách thức |
|-------|--------|-----------|
| **PDF** | .pdf | Bảng, hình, multi-column, scan |
| **Word** | .docx, .doc | Formatting, headers/footers |
| **Web Pages** | HTML | JavaScript rendering, noise |
| **YouTube** | Video/Audio | Cần transcript, timestamp |
| **Code Repository** | .py, .js, .md | Structure, dependencies |
| **CSV/Excel** | .csv, .xlsx | Tabular data → text |
| **Database** | SQL | Query, schema understanding |

### 1.2 LangChain Document Loaders

LangChain cung cấp ecosystem phong phú document loaders:

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

## 2. PDF — Loại tài liệu phổ biến nhất

### 2.1 PyPDFLoader — Cơ bản

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

### 2.2 PDF nâng cao — Xử lý bảng, hình

PyPDF đơn giản nhưng **yếu** với bảng và hình. Dùng **Unstructured** cho PDF phức tạp:

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

### 2.3 So sánh PDF loaders

| Loader | Bảng | Hình | OCR (scan) | Speed | Cài đặt |
|--------|------|------|-----------|-------|---------|
| **PyPDFLoader** | ❌ | ❌ | ❌ | ⚡ Nhanh | `pip install pypdf` |
| **PyMuPDFLoader** | ⚠️ | ❌ | ❌ | ⚡ Nhanh | `pip install pymupdf` |
| **UnstructuredPDFLoader** | ✅ | ✅ | ✅ | 🐢 Chậm | `pip install unstructured[pdf]` |
| **Amazon Textract** | ✅ | ✅ | ✅ | ⚡ | AWS account |

> **Recommendation:** Bắt đầu bằng **PyPDFLoader**. Nếu PDF có bảng/hình, dùng **Unstructured**.

---

## 3. Web Pages

### 3.1 Load trang web

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

## 6. Batch Processing — Xử lý nhiều files

### 6.1 Load folder tài liệu

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

> **💡 Bài tập 6:** Viết script load tất cả tài liệu trong 1 folder (mix PDF + DOCX + TXT). In ra: tên file, số pages/chunks, tổng characters. Xử lý lỗi gracefully.

---

## 7. Tips & Best Practices

| Tip | Giải thích |
|-----|-----------|
| **Clean trước khi load** | Xóa headers/footers, page numbers, watermarks |
| **Thêm metadata** | Source, date, category — dùng cho filtering sau này |
| **Handle encoding** | Tiếng Việt: UTF-8. Check `chardet` nếu unknown |
| **Batch processing** | Dùng multithread cho folder lớn (100+ files) |
| **Test quality** | Spot-check 10% documents sau khi load |
| **Error handling** | Log files bị lỗi, đừng skip silently |

---

## Tóm tắt

| Nguồn | Loader | Ghi chú |
|-------|--------|---------|
| **PDF** | PyPDFLoader / Unstructured | Unstructured cho bảng/hình |
| **Web** | WebBaseLoader / SitemapLoader | Crawl full site qua sitemap |
| **YouTube** | YoutubeLoader | Auto-transcript + metadata |
| **Code** | GitLoader | File filter cho extensions |
| **Folder** | DirectoryLoader | Multithread, recursive |

## Bài tập tổng hợp

1. ✅ Hoàn thành bài tập nhỏ (6)
2. **Build Ingestion Pipeline:** Viết function `ingest(folder_path)` load mọi file trong folder → trả về list documents có metadata đầy đủ.
3. **PDF Benchmark:** Lấy 1 PDF phức tạp (có bảng + hình). So sánh output giữa PyPDFLoader vs Unstructured. Chất lượng khác nhau thế nào?
4. **Web Crawler:** Crawl 10 bài blog từ 1 website yêu thích → load vào ChromaDB → tạo "Chat with Blog".

> **Bài tiếp theo:** Chunking Strategies — cách chia tài liệu thành chunks tối ưu cho retrieval.
