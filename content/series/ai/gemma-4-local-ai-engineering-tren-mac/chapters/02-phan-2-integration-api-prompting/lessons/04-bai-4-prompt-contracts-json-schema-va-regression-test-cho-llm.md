---
id: 01970001-bb04-7004-d004-bb0400001004
title: 'Bài 4: Prompt contracts, JSON schema và regression test cho LLM'
slug: bai-4-prompt-contracts-json-schema-va-regression-test-cho-llm
description: >-
  Định nghĩa prompt contract theo từng use case, ép output theo schema,
  xây regression test để kiểm soát quality khi đổi prompt hoặc model.
duration_minutes: 95
is_free: true
video_url: null
sort_order: 1
section_title: "Phần 2: Integration - API, Prompting và App Embedding"
course:
  id: 01970001-aa11-7011-b011-aa1100001011
  title: Gemma 4 Local AI Engineering trên Mac
  slug: gemma-4-local-ai-engineering-tren-mac
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-1957" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-1957)"/>

  <!-- Decorations -->
  <g>
    <circle cx="933" cy="269" r="16" fill="#c084fc" opacity="0.14"/>
    <circle cx="766" cy="262" r="35" fill="#c084fc" opacity="0.13"/>
    <circle cx="1099" cy="255" r="24" fill="#c084fc" opacity="0.12000000000000001"/>
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

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#c084fc"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="99" height="28" rx="14" fill="#c084fc" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#c084fc">🧠 AI &amp; ML — Bài 1</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 4: Prompt contracts, JSON schema và</tspan>
      <tspan x="60" dy="42">regression test cho LLM</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Gemma 4 Local AI Engineering trên Mac</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 2: Integration - API, Prompting và App Embedding</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Giới thiệu

Nhiều team thất bại không phải vì model yếu, mà vì prompt không có hợp đồng rõ ràng. Khi prompt thay đổi, output drift và app hỏng ngầm.

## 1. Prompt contract là gì?

Prompt contract gồm 4 phần:

- Role và phạm vi nhiệm vụ
- Input format
- Output format
- Failure behavior khi thiếu dữ liệu

Ví dụ failure behavior: trả đúng câu "không đủ dữ liệu" thay vì bịa.

## 2. JSON schema cho output

Ví dụ schema trích xuất action items:

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

Validate schema ngay sau khi nhận output từ model.

## 3. Thiết kế golden tests

Tạo file test chứa:

- Input prompt
- Must include
- Must not include
- Schema pass/fail

Mỗi lần đổi prompt/model phải chạy lại toàn bộ bộ test.

## 4. Phân loại lỗi

- Format error: không đúng schema
- Grounding error: không bám context
- Safety error: trả dữ liệu nhạy cảm
- Instruction error: bỏ qua ràng buộc hệ thống

Gắn mã lỗi rõ ràng giúp theo dõi xu hướng theo thời gian.

## 5. Versioning prompt

Áp dụng quy tắc:

- Mỗi prompt có mã phiên bản
- Changelog ngắn gọn cho từng lần đổi
- Rollback nhanh nếu quality giảm

Không chỉnh prompt trực tiếp trên production mà không lưu version.

## Demo code

Kết quả chạy prompt contract tests — 6/6 passed:

![Prompt Contract Tests](/images/blog/gemma4-series-demo/04-prompt-contract-tests.webp)

> Source code: [03-prompt-contracts](https://github.com/xdev-asia-labs/gemma-4-local-ai-engineering-on-mac/tree/main/03-prompt-contracts)

## Tóm tắt

Prompt contract + schema + regression test là bộ ba bắt buộc để biến LLM thành thành phần kỹ thuật có thể bảo trì. Bài tiếp theo sẽ chuyển sang RAG engineering, bắt đầu từ ingestion và chunking tiếng Việt.