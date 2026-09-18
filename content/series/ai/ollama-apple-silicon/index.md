---
id: 019c9619-aa11-7011-b011-aa1100000011
title: Chạy AI Local với Ollama trên Apple Silicon
slug: ollama-apple-silicon
description: Hướng dẫn toàn diện chạy LLM local trên Mac Apple Silicon (M1/M2/M3/M4) với Ollama và MLX. Từ cài đặt ban đầu đến tăng tốc 3x với MLX framework, quản lý nhiều model, tích hợp API vào ứng dụng, và tối ưu hiệu năng GPU/RAM. Tất cả đều hands-on, privacy-first, không cần internet.
featured_image: images/blog/ollama-mlx-featured.webp
level: beginner
duration_hours: 12
lesson_count: 12
price: '0.00'
is_free: true
view_count: 0
average_rating: '0.00'
review_count: 0
enrollment_count: 0
meta: null
published_at: '2026-04-01T08:00:00.000000Z'
created_at: '2026-04-01T08:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9618-bb00-7000-b000-bb0000000001, name: AI & Machine Learning, slug: ai-machine-learning}
tags: [{name: Ollama, slug: ollama}, {name: MLX, slug: mlx}, {name: Apple Silicon, slug: apple-silicon}, {name: LLM, slug: llm}, {name: local AI, slug: local-ai}, {name: Mac, slug: mac}, {name: privacy, slug: privacy}, {name: hands-on, slug: hands-on}, {name: Python, slug: python}, {name: REST API, slug: rest-api}]
sections: [{id: section-01, title: 'Phần 1: Nền tảng - Ollama & Apple Silicon', description: 'Hiểu kiến trúc Apple Silicon, cài đặt Ollama và chạy model đầu tiên', sort_order: 1, lessons: [{id: 019c9619-bb01-7001-d001-bb0100000001, title: 'Bài 1: Apple Silicon & AI - Tại sao M-chip là vua inference local', slug: bai-1-apple-silicon-ai-tai-sao-m-chip-la-vua-inference-local, description: 'Unified Memory Architecture (UMA) là gì và tại sao nó thay đổi cuộc chơi AI local. So sánh M1/M2/M3/M4 với NVIDIA GPU. Memory bandwidth, Neural Engine, GPU cores. Tại sao LLM 7B-30B chạy mượt trên MacBook.', duration_minutes: 45, is_free: true, sort_order: 0, video_url: null}, {id: 019c9619-bb02-7002-d002-bb0200000002, title: 'Bài 2: Cài đặt Ollama - Từ zero đến chạy LLM trong 5 phút', slug: bai-2-cai-dat-ollama-tu-zero-den-chay-llm-trong-5-phut, description: 'Cài Ollama trên macOS, hiểu cấu trúc thư mục và cách quản lý model. Pull và chạy Llama 3.2, Gemma 3, Mistral, Qwen 2.5. Ollama CLI commands quan trọng: run, pull, list, rm, show, ps.', duration_minutes: 60, is_free: true, sort_order: 1, video_url: null}, {id: 019c9619-bb03-7003-d003-bb0300000003, title: 'Bài 3: Chọn model phù hợp - So sánh LLM cho Mac', slug: bai-3-chon-model-phu-hop-so-sanh-llm-cho-mac, description: 'Bảng so sánh toàn diện: Llama 3.2 vs Gemma 3 vs Qwen 2.5 vs Mistral vs Phi-4. RAM requirements cho từng model size. Quantization (Q4, Q5, Q8) ảnh hưởng speed vs quality như thế nào. Chọn model theo use case.', duration_minutes: 75, is_free: true, sort_order: 2, video_url: null}]}, {id: section-02, title: 'Phần 2: MLX - Tăng tốc 3x với framework native của Apple', description: Tích hợp MLX để khai thác tối đa sức mạnh GPU và unified memory, sort_order: 2, lessons: [{id: 019c9619-bb04-7004-d004-bb0400000004, title: 'Bài 4: MLX Framework - Apple Intelligence dưới nắp capo', slug: bai-4-mlx-framework-apple-intelligence-duoi-nap-capo, description: 'MLX là gì, tại sao Apple tạo ra nó. Kiến trúc lazy evaluation, unified computation graph. So sánh MLX vs llama.cpp vs Core ML. Benchmarks thực tế trên M1/M2/M3/M4 với các model phổ biến.', duration_minutes: 60, is_free: true, sort_order: 0, video_url: null}, {id: 019c9619-bb05-7005-d005-bb0500000005, title: 'Bài 5: Cài đặt mlx-lm và chạy model MLX-quantized', slug: bai-5-cai-dat-mlx-lm-va-chay-model-mlx-quantized, description: 'Cài mlx-lm, mlx-vlm. Tải model từ Hugging Face MLX Community. So sánh tốc độ Ollama (llama.cpp) vs mlx-lm cùng model. Hiểu format safetensors và quantization trong MLX. Chạy chat inference.', duration_minutes: 75, is_free: true, sort_order: 1, video_url: null}, {id: 019c9619-bb06-7006-d006-bb0600000006, title: 'Bài 6: Ollama + MLX backend - Kết hợp tốt nhất của hai thế giới', slug: bai-6-ollama-mlx-backend-ket-hop-tot-nhat-cua-hai-the-gioi, description: 'Cấu hình Ollama dùng MLX backend thay vì llama.cpp. Benchmark chi tiết: prefill speed, generation speed, memory usage. Tối ưu context window. Khi nào dùng MLX backend, khi nào dùng llama.cpp.', duration_minutes: 90, is_free: true, sort_order: 2, video_url: null}]}, {id: section-03, title: 'Phần 3: Tích hợp API & lập trình ứng dụng', description: Dùng Ollama REST API và thư viện Python/JS để tích hợp LLM vào ứng dụng, sort_order: 3, lessons: [{id: 019c9619-bb07-7007-d007-bb0700000007, title: 'Bài 7: Ollama REST API - OpenAI-compatible endpoint', slug: bai-7-ollama-rest-api-openai-compatible-endpoint, description: 'Ollama expose REST API tương thích OpenAI: /api/chat, /api/generate, /api/embeddings. Dùng curl và Python requests. Streaming responses. Tích hợp với bất kỳ OpenAI SDK nào bằng cách đổi base_url.', duration_minutes: 60, is_free: true, sort_order: 0, video_url: null}, {id: 019c9619-bb08-7008-d008-bb0800000008, title: 'Bài 8: Python integration - Xây chatbot local với Ollama', slug: bai-8-python-integration-xay-chatbot-local-voi-ollama, description: 'Dùng thư viện Ollama cho Python và LangChain với Ollama backend. Tạo chatbot với memory, streaming UI trong terminal. Embeddings local với nomic-embed-text và ví dụ RAG đơn giản.', duration_minutes: 120, is_free: true, sort_order: 1, video_url: null}, {id: 019c9619-bb09-7009-d009-bb0900000009, title: 'Bài 9: Vision models - Phân tích hình ảnh không cần cloud', slug: bai-9-vision-models-phan-tich-hinh-anh-khong-can-cloud, description: 'Dùng LLaVA, Gemma 3 Vision, Qwen VL với Ollama. Gửi ảnh qua API, phân tích document scan, OCR nâng cao, mô tả UI screenshot. Dùng mlx-vlm cho vision tasks cần tốc độ cao.', duration_minutes: 90, is_free: true, sort_order: 2, video_url: null}]}, {id: section-04, title: 'Phần 4: Tối ưu, quản lý & production setup', description: Tối đa hóa hiệu năng và xây workflow AI cá nhân hoàn chỉnh, sort_order: 4, lessons: [{id: 019c9619-bb10-7010-d010-bb1000000010, title: 'Bài 10: Tối ưu hiệu năng - RAM, context, concurrency', slug: bai-10-toi-uu-hieu-nang-ram-context-concurrency, description: 'Tuning OLLAMA_NUM_PARALLEL, OLLAMA_MAX_LOADED_MODELS. Context window ảnh hưởng RAM như thế nào. Chạy nhiều model đồng thời. Monitor với Activity Monitor và ollama ps. Swap memory pitfalls.', duration_minutes: 75, is_free: true, sort_order: 0, video_url: null}, {id: 019c9619-bb11-7011-d011-bb1100000011, title: 'Bài 11: Modelfiles - Custom models & system prompts', slug: bai-11-modelfiles-custom-models-va-system-prompts, description: 'Viết Modelfile để tạo model tùy chỉnh: system prompt, temperature, top_p, stop tokens. Tạo AI assistant chuyên biệt cho code review, dịch thuật, writing. Kế thừa từ base model.', duration_minutes: 60, is_free: true, sort_order: 1, video_url: null}, {id: 019c9619-bb12-7012-d012-bb1200000012, title: 'Bài 12: Workflow hoàn chỉnh - Personal AI setup 2026', slug: bai-12-workflow-hoan-chinh-personal-ai-setup-2026, description: 'Tổng kết: xây dựng personal AI stack hoàn chỉnh. Open WebUI cho chat UI đẹp, Continue.dev cho coding assistant trong VS Code, Ollama + Obsidian cho knowledge base, và workflow privacy-first hoàn toàn local.', duration_minutes: 90, is_free: true, sort_order: 2, video_url: null}]}]
---

## Giới thiệu series

Bạn có Mac M-chip nhưng vẫn đang trả tiền cho ChatGPT hay Anthropic mỗi tháng?

Series này sẽ dạy bạn chạy AI hoàn toàn local trên máy của bạn: không internet, không API key, không phí hàng tháng, và dữ liệu không rời khỏi máy.

Apple Silicon là một trong những nền tảng inference local tốt nhất hiện nay nhờ Unified Memory Architecture. Một chiếc MacBook với 16GB hoặc 32GB RAM có thể chạy rất nhiều model 7B đến 30B mượt hơn mức nhiều người nghĩ.

## Bạn sẽ học được gì?

-   Cài đặt và vận hành Ollama để chạy LLM local
-   Tích hợp MLX của Apple để tăng tốc inference
-   Gọi model từ Python, JavaScript, hay bất kỳ ngôn ngữ nào qua REST API
-   Xây chatbot, vision app, embedding pipeline chạy local
-   Tối ưu memory, concurrency và custom AI assistant

## Prerequisites

-   Mac với chip Apple Silicon (M1 trở lên)
-   RAM 16GB trở lên, khuyến nghị 32GB nếu chạy model lớn
-   macOS Ventura 13.3+ hoặc mới hơn
-   Biết Terminal cơ bản
-   Python cơ bản để theo các bài thực hành

## Tại sao nên học series này?

Trong 2026, khả năng chạy AI locally là kỹ năng rất thực dụng cho developer:

1.  Privacy: code, data và chat không rời khỏi máy
2.  Cost: gần như $0 thay vì thuê API hàng tháng
3.  Speed: latency local thường thấp hơn cloud cho các tác vụ lặp lại
4.  Offline: vẫn làm việc được khi không có mạng
5.  Customization: dễ tạo workflow riêng, modelfile riêng, stack riêng
