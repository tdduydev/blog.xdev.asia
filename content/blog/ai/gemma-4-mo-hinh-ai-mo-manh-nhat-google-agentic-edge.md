---
id: 01970000-b2c3-8d4e-f5a6-789012345def
title: 'Gemma 4: Mô hình AI mở mạnh nhất Google --- Agentic Workflow, On-Device và Apache 2.0'
slug: gemma-4-mo-hinh-ai-mo-manh-nhat-google-agentic-edge
excerpt: Google DeepMind ra mắt Gemma 4 --- gia đình mô hình mở đạt #3 thế giới trên Arena AI, hỗ trợ agentic workflow, vision, audio, 140+ ngôn ngữ, chạy on-device từ Raspberry Pi đến GPU H100. Phân tích kiến trúc 4 kích thước (E2B, E4B, 26B MoE, 31B Dense), benchmark so sánh, và hướng dẫn triển khai.
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
comments: []
---

Ngày 2 tháng 4 năm 2026, Google DeepMind chính thức ra mắt **Gemma 4** --- gia đình mô hình AI mở mạnh nhất từ trước đến nay của họ. Với giấy phép **Apache 2.0**, hỗ trợ **agentic workflow**, **vision & audio**, **140+ ngôn ngữ**, và khả năng chạy trực tiếp trên thiết bị từ Raspberry Pi đến smartphone, Gemma 4 không chỉ là một bản nâng cấp --- nó thay đổi hoàn toàn cuộc chơi cho open-source AI.

Kết quả? Mô hình 31B xếp **#3 thế giới** trên bảng xếp hạng Arena AI (open model), đánh bại nhiều mô hình lớn hơn **20 lần** về số parameter. Mô hình 26B MoE giành **#6**. Và phiên bản edge E2B chạy mượt trên điện thoại với dưới **1.5GB RAM**.

Bài viết này phân tích toàn diện: kiến trúc, khả năng, benchmark, hệ sinh thái, và cách bạn có thể bắt đầu sử dụng Gemma 4 ngay hôm nay.

* * *

## 1. Gemma 4 là gì?

Gemma 4 là gia đình mô hình ngôn ngữ lớn (LLM) mã nguồn mở của Google DeepMind, được xây dựng từ cùng công nghệ và nghiên cứu với **Gemini 3** --- nhưng thiết kế để chạy trên **phần cứng của bạn**.

Kể từ thế hệ đầu tiên, Gemma đã được tải xuống hơn **400 triệu lần**, tạo ra hệ sinh thái **Gemmaverse** với hơn **100,000 biến thể** do cộng đồng đóng góp. Gemma 4 là bước tiến lớn nhất trong dòng sản phẩm này.

### Triết lý thiết kế

Gemma 4 không theo đuổi mô hình khổng lồ hàng trăm tỷ parameter. Thay vào đó, Google tập trung vào **intelligence-per-parameter** --- tức là trí thông minh tối đa trên mỗi parameter. Mục tiêu: đạt khả năng frontier-level với phần cứng tiêu thụ thấp hơn đáng kể.

* * *

## 2. Bốn kích thước, bốn use case

Google phát hành Gemma 4 với **4 biến thể** được thiết kế cho các phân khúc phần cứng khác nhau:

| Mô hình | Kiến trúc | Context Window | Phần cứng mục tiêu | Đặc điểm nổi bật |
|---------|-----------|----------------|--------------------|--------------------|
| **E2B** (Effective 2B) | Compact | 128K | Smartphone, IoT, Raspberry Pi | Audio + Vision, <1.5GB RAM |
| **E4B** (Effective 4B) | Compact | 128K | Smartphone, tablet | Multimodal, agentic on-device |
| **26B MoE** | Mixture of Experts | 256K | Consumer GPU, workstation | Chỉ activate 3.8B params → tốc độ cao |
| **31B Dense** | Dense | 256K | GPU H100 80GB (bfloat16) | Chất lượng tối đa, fine-tuning foundation |

### 2.1. E2B và E4B --- AI trên mọi thiết bị

Hai mô hình edge này được thiết kế **từ đầu** cho hiệu quả tính toán và bộ nhớ tối đa. Chúng chỉ activate footprint hiệu dụng 2B và 4B parameter trong quá trình inference, giúp tiết kiệm RAM và pin.

Điểm đặc biệt:
- **Audio input native**: Nhận diện giọng nói và hiểu âm thanh trực tiếp
- **Vision native**: Xử lý video và hình ảnh ở nhiều độ phân giải, OCR, hiểu biểu đồ
- **Chạy hoàn toàn offline** trên Raspberry Pi 5, NVIDIA Jetson Orin Nano, Qualcomm, MediaTek
- Tích hợp với **Android AICore Developer Preview** --- tương thích forward với Gemini Nano 4

Số liệu ấn tượng trên Raspberry Pi 5 với LiteRT-LM:
- **Prefill**: 133 tokens/giây
- **Decode**: 7.6 tokens/giây
- Đủ nhanh cho smart home controller, voice assistant, robotics offline

### 2.2. 26B MoE --- Tốc độ frontier trên consumer hardware

Mô hình Mixture of Experts với tổng 26B parameter nhưng chỉ **activate 3.8B** trong mỗi lần inference. Kết quả: tốc độ tokens-per-second nhanh đáng kinh ngạc trong khi vẫn đạt chất lượng frontier.

- **#6** trên bảng xếp hạng Arena AI (open model)
- Phiên bản quantized chạy trên consumer GPU
- Lý tưởng cho IDE, coding assistant, agentic workflow cần latency thấp

### 2.3. 31B Dense --- Chất lượng tối đa

Mô hình dense truyền thống, tối ưu cho chất lượng raw và là foundation mạnh nhất cho fine-tuning.

- **#3 thế giới** trên Arena AI text leaderboard (open model)
- Đánh bại mô hình lớn hơn 20x về parameter
- Weights bfloat16 vừa khít trên một GPU NVIDIA H100 80GB
- Phiên bản quantized chạy trên consumer GPU

* * *

## 3. Khả năng nổi bật

### 3.1. Agentic Workflow --- Không chỉ chatbot

Đây là bước nhảy lớn nhất của Gemma 4 so với thế hệ trước. Mô hình hỗ trợ native:

- **Function calling**: Gọi tool và API trực tiếp
- **Structured JSON output**: Đầu ra có cấu trúc, đáng tin cậy cho production
- **System instructions native**: Hướng dẫn hệ thống ở tầng native
- **Multi-step planning**: Lập kế hoạch và thực thi workflow nhiều bước

Điều này có nghĩa bạn có thể xây dựng **autonomous agent** chạy hoàn toàn on-device, không cần internet, không cần gửi data lên cloud.

### 3.2. Vision & Audio

Tất cả mô hình Gemma 4 đều xử lý **video và hình ảnh** native:
- Variable resolution support
- OCR chất lượng cao
- Hiểu biểu đồ và đồ thị
- E2B/E4B còn hỗ trợ **audio input native** cho speech recognition

### 3.3. Code Generation

Gemma 4 hỗ trợ sinh code chất lượng cao offline, biến workstation của bạn thành **local-first AI code assistant**. Kết hợp với 26B MoE (tốc độ cao) hoặc 31B Dense (chất lượng tối đa), bạn có trải nghiệm coding assistant không phụ thuộc cloud.

### 3.4. 140+ Ngôn ngữ

Được huấn luyện native trên hơn 140 ngôn ngữ --- bao gồm tiếng Việt. Đây là lợi thế lớn cho developer xây dụng ứng dụng phục vụ thị trường đa ngôn ngữ và toàn cầu.

### 3.5. Context Window mở rộng

- **Edge models** (E2B, E4B): 128K token
- **Larger models** (26B, 31B): 256K token

Đủ để truyền cả repository code hoặc tài liệu dài trong một prompt duy nhất.

* * *

## 4. Agent Skills trên Edge --- Tương lai On-Device AI

Google đồng thời ra mắt **Agent Skills** trong ứng dụng [Google AI Edge Gallery](https://github.com/google-ai-edge/gallery) --- một trong những ứng dụng đầu tiên chạy **agentic workflow nhiều bước, tự chủ, hoàn toàn on-device**.

### Gemma 4 trên Edge có thể làm gì?

**1. Mở rộng knowledge base:**
Agent có thể truy cập thông tin vượt ra ngoài training data. Ví dụ: tạo skill query Wikipedia để trả lời mọi câu hỏi bách khoa.

**2. Tạo nội dung tương tác:**
Biến đoạn văn hoặc video thành tóm tắt, flashcard, biểu đồ tương tác. Ví dụ: tự động tóm tắt và hiển thị xu hướng giấc ngủ/tâm trạng theo ngày từ giọng nói người dùng.

**3. Mở rộng khả năng core:**
Tích hợp với model khác như text-to-speech, image generation, music synthesis. Ví dụ: ghép ảnh với nhạc phù hợp tâm trạng.

**4. Trải nghiệm end-to-end:**
Thay vì chuyển đổi nhiều app, người dùng quản lý workflow phức tạp hoàn toàn qua hội thoại. Google demo một app mô tả và phát tiếng kêu của động vật --- xây dựng hoàn toàn thông qua conversation.

### LiteRT-LM --- Runtime cho on-device

[LiteRT-LM](https://ai.google.dev/edge/litert-lm/overview) là runtime mới cho phép triển khai Gemma 4 trên mọi thiết bị:

- **Minimal memory**: Gemma 4 E2B chạy với <1.5GB memory nhờ hỗ trợ 2-bit và 4-bit weights
- **Constrained decoding**: Đầu ra có cấu trúc, đảm bảo tool-calling đáng tin cậy trong production
- **Dynamic context**: Linh hoạt xử lý trên CPU và GPU với context length động, tận dụng tối đa 128K context window
- **Hiệu suất**: Xử lý 4,000 input tokens qua 2 skill riêng biệt trong dưới 3 giây

Hỗ trợ đa nền tảng:

| Nền tảng | Hỗ trợ |
|----------|--------|
| **Mobile** | Android (CPU/GPU), iOS, Android AICore |
| **Desktop & Web** | Windows, Linux, macOS (Metal), WebGPU |
| **IoT & Robotics** | Raspberry Pi 5, Qualcomm IQ8 NPU |

Google cũng ra mắt **Python package và CLI tool** `litert-lm` cho Linux, macOS, Raspberry Pi --- cho phép thử nghiệm Gemma 4 ngay từ terminal mà không cần viết code:

```bash
# Cài đặt litert-lm CLI
pip install litert-lm

# Chạy Gemma 4 E2B trực tiếp từ terminal
litert-lm run gemma-4-e2b
```

* * *

## 5. Apache 2.0 --- Bước ngoặt về giấy phép

Đây là thay đổi lớn nhất về mặt chiến lược. Các phiên bản Gemma trước sử dụng **Gemma Terms of Use** --- một giấy phép tùy chỉnh có một số hạn chế. Gemma 4 chuyển sang **Apache 2.0** hoàn toàn.

Điều này có nghĩa:

- **Tự do thương mại**: Sử dụng, sửa đổi, phân phối không giới hạn
- **Digital sovereignty**: Toàn quyền kiểm soát data, infrastructure, model
- **Không ràng buộc**: Deploy tự do, on-premises hay cloud, không cần báo cáo hay đăng ký

Clément Delangue, CEO Hugging Face, nhận xét: *"Việc phát hành Gemma 4 dưới giấy phép Apache 2.0 là một cột mốc quan trọng."*

### So sánh giấy phép với các mô hình mở khác

| Mô hình | Giấy phép | Thương mại | Derivative works |
|---------|-----------|------------|------------------|
| **Gemma 4** | Apache 2.0 | ✅ Tự do | ✅ Tự do |
| Llama 3.x | Llama License | ✅ (có điều kiện >700M MAU) | ✅ Có hạn chế |
| Mistral | Apache 2.0 | ✅ Tự do | ✅ Tự do |
| Qwen 2.5 | Apache 2.0 / Tongyi | ✅ Tùy biến thể | ✅ Tùy biến thể |

Gemma 4 đặt Google ngang hàng với Mistral về độ mở --- và vượt xa Meta (Llama) về tính tự do giấy phép.

* * *

## 6. Hệ sinh thái hỗ trợ

Gemma 4 được hỗ trợ **day-one** trên hầu hết các framework và platform phổ biến:

### Framework & Tool

- **Hugging Face**: Transformers, TRL, Transformers.js, Candle
- **Inference**: vLLM, llama.cpp, SGLang, Ollama, LM Studio
- **Apple**: MLX (mlx-community)
- **NVIDIA**: NIM, NeMo
- **Edge**: LiteRT-LM, Google AI Edge Gallery
- **Fine-tuning**: Unsloth, Google Colab, Vertex AI
- **Other**: Cactus, Baseten

### Tải model

- [Hugging Face](https://huggingface.co/collections/google/gemma-4)
- [Kaggle](https://www.kaggle.com/models/google/gemma-4)
- [Ollama](https://ollama.com/library/gemma4)

### Cách nhanh nhất để thử

```bash
# Qua Ollama
ollama run gemma4

# Qua Google AI Studio (31B, 26B MoE)
# https://aistudio.google.com/prompts/new_chat?model=gemma-4-31b-it

# Qua Google AI Edge Gallery (E2B, E4B)
# https://github.com/google-ai-edge/gallery
```

* * *

## 7. So sánh: Gemma 4 vs Các mô hình mở khác

Dựa trên kết quả Arena AI text leaderboard (open model, tính đến 2/4/2026):

| Xếp hạng | Mô hình | Kích thước | Giấy phép |
|-----------|---------|------------|-----------|
| #1 | DeepSeek-V3 | 671B MoE | DeepSeek License |
| #2 | Qwen3-235B | 235B MoE | Apache 2.0 |
| **#3** | **Gemma 4 31B** | **31B Dense** | **Apache 2.0** |
| #4 | Llama 4 Maverick | 400B MoE | Llama License |
| #5 | DeepSeek-R1 | 671B MoE | MIT |
| **#6** | **Gemma 4 26B** | **26B MoE (3.8B active)** | **Apache 2.0** |

Điểm đáng chú ý: Gemma 4 31B (31 tỷ parameter) đánh bại Llama 4 Maverick (400 tỷ parameter) --- **nhỏ hơn 13 lần** mà xếp hạng cao hơn. Đây là minh chứng rõ ràng nhất cho triết lý "intelligence-per-parameter" của Google.

* * *

## 8. Ứng dụng thực tế và use case

### 8.1. Cho developer cá nhân

- **Coding assistant offline**: Chạy 26B MoE trên gaming GPU, không cần trả phí API
- **Code review agent**: Sử dụng function calling + structured output để tạo agent tự động review PR
- **Local RAG**: Kết hợp 256K context window với qdrant/chromadb chạy local

### 8.2. Cho doanh nghiệp

- **On-premises AI**: Apache 2.0 + chạy on-device = không data rời khỏi infrastructure
- **Sovereign AI**: Phù hợp yêu cầu lưu trữ data trong nước (digital sovereignty)
- **Edge AI production**: Smart home, kiosk, POS, camera AI với E2B/E4B

### 8.3. Cho nghiên cứu

- **Fine-tuning foundation**: 31B Dense là base model mạnh cho domain-specific tuning
- **Multilingual research**: 140+ ngôn ngữ mở ra nghiên cứu NLP cho low-resource languages
- **Ví dụ thực tế**: Yale University sử dụng Gemma để phát hiện pathway mới cho liệu pháp ung thư (Cell2Sentence-Scale)

### 8.4. Cho IoT và Robotics

- **Voice assistant offline**: E2B trên Raspberry Pi 5 cho robot, smart speaker
- **Edge analytics**: Phân tích hình ảnh/video real-time trên NVIDIA Jetson
- **Industrial automation**: Agent tự chủ trên Qualcomm IQ8 NPU

* * *

## 9. Hướng dẫn bắt đầu nhanh

### 9.1. Chạy với Ollama (đơn giản nhất)

```bash
# Cài Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Chạy Gemma 4 (tự chọn size phù hợp)
ollama run gemma4

# Hoặc chỉ định biến thể cụ thể
ollama run gemma4:26b
ollama run gemma4:31b
```

### 9.2. Chạy trên Edge với LiteRT-LM

```bash
# Cài LiteRT-LM CLI
pip install litert-lm

# Tải và chạy model
litert-lm download gemma-4-e2b
litert-lm run gemma-4-e2b
```

### 9.3. Sử dụng với Python (Hugging Face Transformers)

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
    {"role": "user", "content": "Giải thích kiến trúc Mixture of Experts trong 3 câu."}
]

input_ids = tokenizer.apply_chat_template(
    messages, return_tensors="pt"
).to(model.device)

outputs = model.generate(input_ids, max_new_tokens=256)
print(tokenizer.decode(outputs[0], skip_special_tokens=True))
```

### 9.4. Function Calling (Agentic)

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
    {"role": "user", "content": "Thời tiết ở Hà Nội hôm nay thế nào?"}
]

# Gemma 4 sẽ tự động generate function call JSON
response = model.generate(
    tokenizer.apply_chat_template(
        messages, tools=tools, return_tensors="pt"
    ).to(model.device),
    max_new_tokens=256
)
```

* * *

## 10. Những điều cần lưu ý

### Yêu cầu phần cứng

| Mô hình | RAM/VRAM tối thiểu (quantized) | RAM/VRAM khuyến nghị |
|---------|-------------------------------|---------------------|
| E2B | ~1.5 GB | 2+ GB |
| E4B | ~3 GB | 4+ GB |
| 26B MoE | ~16 GB | 24+ GB VRAM |
| 31B Dense | ~20 GB | 24-80 GB VRAM |

### Hạn chế

- **So với Gemini 3 (proprietary)**: Gemma 4 mạnh cho open model nhưng vẫn kém proprietary model ở top (GPT-5, Gemini 3, Claude 4)
- **Edge model trade-off**: E2B/E4B hy sinh chất lượng cho tốc độ và bộ nhớ thấp --- phù hợp task focused, không thay thế được model lớn cho complex reasoning
- **Fine-tuning cost**: 31B Dense cần GPU H100 cho full fine-tuning; LoRA/QLoRA cần tối thiểu 24GB VRAM

* * *

## Kết luận

Gemma 4 đánh dấu một bước ngoặt cho open-source AI:

1. **Hiệu suất/parameter tốt nhất**: 31B đánh bại model 400B+ trên Arena AI
2. **Apache 2.0**: Tự do thương mại hoàn toàn, không ràng buộc
3. **Agentic native**: Function calling, structured output, multi-step planning --- không cần prompt hack
4. **Edge-first**: Từ Raspberry Pi đến smartphone, chạy offline hoàn toàn
5. **Multimodal**: Vision + Audio + Text + Code trong cùng một model

Với hệ sinh thái day-one support rộng lớn (Ollama, Hugging Face, vLLM, MLX, LiteRT-LM...), Gemma 4 là lựa chọn mặc định mới cho bất kỳ ai muốn triển khai AI mở, mạnh mẽ, trên phần cứng của mình.

**Links hữu ích:**
- [Gemma 4 trên Hugging Face](https://huggingface.co/collections/google/gemma-4)
- [Google AI Edge Gallery](https://github.com/google-ai-edge/gallery)
- [LiteRT-LM Documentation](https://ai.google.dev/edge/litert-lm/overview)
- [Gemma 4 Model Card](https://ai.google.dev/gemma/docs/core/model_card_4)
- [Gemma 4 trên Ollama](https://ollama.com/library/gemma4)
- [Google AI Studio](https://aistudio.google.com/prompts/new_chat?model=gemma-4-31b-it)
- [Blog gốc Google](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/)
- [Blog Google AI Edge](https://developers.googleblog.com/bring-state-of-the-art-agentic-skills-to-the-edge-with-gemma-4/)
