---
id: 01970001-bb02-7002-d002-bb0200001002
title: 'Bài 2: Setup Gemma 4 với Ollama và Open WebUI trên Mac'
slug: bai-2-setup-gemma-4-voi-ollama-va-open-webui-tren-mac
description: >-
  Cài đặt đầy đủ runtime trên Apple Silicon, cấu hình model theo RAM,
  triển khai chat UI nội bộ cho QA, PM và Content.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 1
section_title: "Phần 1: Foundation - Gemma 4 Local Stack"
course:
  id: 01970001-aa11-7011-b011-aa1100001011
  title: Gemma 4 Local AI Engineering trên Mac
  slug: gemma-4-local-ai-engineering-tren-mac
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-8762" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-8762)"/>

  <!-- Decorations -->
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

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fbbf24"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="99" height="28" rx="14" fill="#fbbf24" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🧠 AI &amp; ML — Bài 1</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 2: Setup Gemma 4 với Ollama và Open</tspan>
      <tspan x="60" dy="42">WebUI trên Mac</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Gemma 4 Local AI Engineering trên Mac</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 1: Foundation - Gemma 4 Local Stack</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Giới thiệu

Trong bài này bạn sẽ dựng một local stack chạy được ngay:

- Ollama làm model runtime
- Gemma 4 làm model chính
- Open WebUI làm giao diện chat cho toàn team

## 1. Cài Ollama

```bash
brew install ollama
brew services start ollama
curl http://127.0.0.1:11434/api/tags
```

Nếu endpoint trả JSON, runtime đã sẵn sàng.

## 2. Pull model Gemma 4

```bash
ollama pull gemma4
ollama run gemma4
```

Với máy RAM thấp hơn, ưu tiên biến thể quantized nhẹ để tránh swap.

## 3. Chạy Open WebUI

```bash
docker run -d \
  --name open-webui \
  -p 3000:8080 \
  -e OLLAMA_BASE_URL=http://host.docker.internal:11434 \
  -v open-webui:/app/backend/data \
  --restart unless-stopped \
  ghcr.io/open-webui/open-webui:main
```

Truy cập `http://localhost:3000` và đăng nhập tài khoản admin đầu tiên.

## 4. Chuẩn hóa model preset

Tạo preset theo use case:

- Coding: temperature thấp, context cao vừa phải
- Summarization: temperature trung bình, format ngắn
- Extraction: temperature thấp, output JSON cố định

Giữ preset ở tài liệu nội bộ để ai mới vào team dùng đúng mặc định.

## 5. Theo dõi tài nguyên trên Mac

Theo dõi 3 thứ:

- Memory pressure
- Swap usage
- Tokens/second thực tế

Khi swap tăng mạnh, giảm `num_ctx` hoặc model size trước khi tối ưu sâu.

## 6. Troubleshooting nhanh

1. Docker không gọi được Ollama: dùng `host.docker.internal`.
2. Model chạy chậm dần: kiểm tra swap và app nền.
3. UI không thấy model: kiểm tra `ollama list` và `OLLAMA_BASE_URL`.

## Bài tập

- Cài stack hoàn chỉnh và chụp lại sơ đồ endpoint.
- Tạo 3 preset model theo 3 use case.
- So sánh tốc độ với một prompt dài 2 lần liên tiếp.

## Demo code

Sau khi cài đặt xong, kiểm tra health check endpoint:

![Health Check](/images/blog/gemma4-series-demo/02-health-check.webp)

Swagger UI tự động tạo documentation cho API:

![Swagger Docs](/images/blog/gemma4-series-demo/02-swagger-docs.webp)

> Source code: [xdev-asia-labs/gemma-4-local-ai-engineering-on-mac](https://github.com/xdev-asia-labs/gemma-4-local-ai-engineering-on-mac)

## Tóm tắt

Bạn đã có local runtime đầy đủ cho cả kỹ thuật và non-tech. Bài sau sẽ đưa stack này vào chuẩn API gateway để ứng dụng có thể tích hợp ổn định.