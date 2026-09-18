---
id: 01970970-63e1-4389-a405-cc6388623b4e
title: 'MiniMax: A Detailed Review of the Chinese Full-Stack AI Platform — Text, Video, Speech, and Music in One Ecosystem'
slug: minimax-detailed-review-chinese-full-stack-ai-platform
excerpt: A comprehensive review of MiniMax — the Chinese AI startup with the world's most complete multimodal ecosystem. From M2.7 (text/code on par with Opus 4.6), Hailuo 2.3 (video), Speech 2.6, to Music 2.6. Analyzes models, products, API, pricing, compares with OpenAI, Google, and Anthropic, and includes a quick-start guide.
featured_image: /images/blog/minimax-review-featured.webp
type: blog
reading_time: 25
view_count: 0
meta: null
published_at: '2026-04-13T10:00:00.000000Z'
created_at: '2026-04-13T10:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: AI, slug: ai}, {name: LLM, slug: llm}, {name: Machine Learning, slug: machine-learning}, {name: Deep Learning, slug: deep-learning}]
locale: en
comments: []
---

In the global AI race, while all eyes are fixed on OpenAI, Google DeepMind, and Anthropic, a Chinese company has been quietly building the **world's most complete multimodal AI ecosystem** — from text, code, speech, and video to music — all from self-developed foundation models. That company is **MiniMax**.

Founded in early 2022, MiniMax now serves over **236 million individual users** in more than **200 countries**, along with **214,000+ enterprises and developers**. With the mission of "Co-create Intelligence with Everyone," MiniMax is not just a research lab — they have built a **platform company** with a complete AI-native product matrix.

This article provides a detailed review of each component in the MiniMax ecosystem: models, products, API platform, pricing, and comparisons with major competitors.

* * *

## 1. Overview of MiniMax

### Who Is MiniMax?

MiniMax is China's leading AI foundation model company, headquartered in Shanghai. The company was founded by an AI research team with backgrounds from major tech corporations, with a vision toward **Artificial General Intelligence (AGI)**.

The biggest differentiator of MiniMax compared to other AI startups: **they develop their own foundation models for ALL modalities** — text, speech, image, video, and music. No licensing, no fine-tuning third-party models. The entire stack from training infrastructure to consumer products is built by MiniMax.

### Core Values

MiniMax operates on 3 values:

- **No Shortcuts** — invest in fundamental research rather than chasing trends
- **User-in-the-Loop** — user feedback is the center of development
- **Tech-Driven** — technology is the foundation, not marketing

### Product Matrix

MiniMax has **two clear product layers**:

**Layer 1 — Foundation Models (for developers):**

| Model | Modality | Latest Version |
|-------|----------|-------------------|
| MiniMax M-series | Text / Code / Agent | M2.7 |
| MiniMax Speech | Text-to-Speech | Speech 2.6 |
| Hailuo | Video Generation | Hailuo 2.3 / 2.3 Fast |
| MiniMax Music | Music Generation | Music 2.6 |

**Layer 2 — AI-native Products (for end users):**

| Product | Description | Link |
|-----------|--------|------|
| **MiniMax Agent** | Comprehensive AI assistant (coding, office, research) | agent.minimax.io |
| **Hailuo AI** | AI video generation platform | hailuoai.video |
| **MiniMax Audio** | Voice & audio generation platform | minimax.io/audio |
| **Talkie** | AI companion / roleplay app | talkie-ai.com |

* * *

## 2. MiniMax M2.7 — Flagship Text Model

### Philosophy: "Early Echoes of Self-Evolution"

M2.7 is the latest text model (released March 18, 2026) and MiniMax's first model to **deeply participate in its own self-evolution process**.

What does that mean? MiniMax had M2.7 build its own **agent harness** to serve internal RL (Reinforcement Learning) research. The model:
- Reads papers, tracks experiments
- Pipelines data, launches experiments
- Monitors, debugs, and analyzes metrics
- Fixes code, creates merge requests, runs smoke tests
- **Improves its own harness** based on feedback

Result: M2.7 handles **30–50% of workflows** for the RL research team — a remarkable figure.

### Benchmark Comparison

M2.7 achieves impressive results on real-world benchmarks:

| Benchmark | M2.7 | Opus 4.6 | Sonnet 4.6 | GPT-5.4 | GPT-5.3 |
|-----------|-------|----------|------------|---------|---------|
| **SWE-Pro** (multi-lang) | 56.22% | ~57% | --- | --- | 56.2% (Codex) |
| **VIBE-Pro** (full project) | 55.6% | ~56% | --- | --- | --- |
| **Terminal Bench 2** | 57.0% | --- | --- | --- | --- |
| **SWE Multilingual** | 76.5 | --- | --- | --- | --- |
| **Multi SWE Bench** | 52.7 | --- | --- | --- | --- |
| **GDPval-AA** (ELO) | 1495 | #1 | #2 | #3 | --- |
| **MLE Bench Lite** (medal%) | 66.6% | 75.7% | --- | --- | 71.2% |
| **Toolathon** | 46.3% | --- | --- | --- | --- |
| **MM Claw** (office/agent) | 62.7% | --- | ~63% | --- | --- |

**Analysis:** M2.7 is not the strongest model on every benchmark, but it is **consistently competitive** with the highest tier (Opus 4.6, GPT-5.4) on practical tasks — particularly strong in software engineering and agent workflows.

### Standout Capabilities

**1. Professional Software Engineering**

M2.7 doesn't just write code — it **understands production systems**. When facing an alert in a production environment, M2.7 can:
- Correlate monitoring metrics with deployment timelines
- Statistical analysis of trace sampling
- Connect to databases to verify root cause
- Detect missing index migrations
- Use non-blocking index creation to "stop the bleeding" before submitting a merge request

MiniMax claims M2.7 has repeatedly helped reduce **production incident recovery time to under 3 minutes**.

**2. Agent Teams (Multi-Agent Collaboration)**

M2.7 supports native Agent Teams — the ability to coordinate multiple agents within the same workflow. The model needs to:
- Maintain role identity
- Apply adversarial reasoning with teammates
- Follow protocols
- Make autonomous decisions in complex state machines

This isn't "prompt engineering" — this is an **internalized** capability within the model.

**3. Office Work & Complex Editing**

M2.7 supports complex editing for **Excel, PPT, and Word**:
- Generate files from templates
- Multi-round editing based on interactive instructions
- Skill adherence 97% across 40+ complex skills (each skill >2000 tokens)

Real-world example: M2.7 can read TSMC's annual report and earnings call, cross-reference multiple research reports, build a revenue forecast model, then generate a PPT and Word research report — output that can be used as a **first draft** going directly into a workflow.

**4. Entertainment & Character Consistency**

Beyond productivity, M2.7 has high EQ with good character consistency. MiniMax has open-sourced **OpenRoom** — an interaction system in a 3D GUI environment, where AI characters actively interact with the environment.

### API Integration

```python
import requests

url = "https://api.minimax.io/v1/text/chatcompletion_v2"
payload = {
    "model": "MiniMax-M2.7",
    "messages": [
        {"role": "user", "content": "Hello"}
    ]
}
headers = {"Authorization": "Bearer <token>"}
response = requests.post(url, json=payload, headers=headers)
print(response.text)
```

M2.7 has 2 API versions:
- **MiniMax-M2.7**: Standard — highest quality
- **MiniMax-M2.7-highspeed**: Higher TPS, same results but faster speed

Supports integration with popular AI coding tools: **Claude Code, Roo Code, Kilo Code, Cline, Codex CLI, Cursor, TRAE, Grok CLI** and more.

* * *

## 3. Hailuo 2.3 — Video Generation

### Improvements Over Hailuo 02

Hailuo 2.3 (released October 28, 2025) is the latest video generation model, with significant improvements:

- **Complex body movements**: Renders complex body movements more fluidly and naturally
- **Physics understanding**: Better physics comprehension — lighting, shadows, tones approaching photorealistic
- **Stylization**: Supports anime, illustration, ink wash painting, game CG, and many special art styles
- **Facial micro-expressions**: More natural and subtle facial expressions
- **Motion commands**: More precise response to motion commands

### Cost-effectiveness

Hailuo 2.3 maintains the same price as Hailuo 02 but with significantly higher performance. The **Hailuo 2.3 Fast** version reduces batch creation costs by up to **50%**.

### Media Agent

Hailuo Video Agent has evolved into the **Media Agent** — supporting comprehensive multimodal content creation:
- Input desired content → Agent automatically selects the appropriate model
- "One-click video generation" without manual adjustments
- Or step-by-step creation for professional creators
- Upload image, video, audio to customize

Example: Create a 30-second advertisement for a brand by simply describing the scene, color tone, camera style, and music.

* * *

## 4. Speech 2.6 — Text-to-Speech

MiniMax Speech 2.6 is the latest TTS engine with three key strengths:

- **Real-Time Response**: Low latency, suitable for real-time applications
- **Intelligent Parsing**: Smart context analysis to choose appropriate intonation
- **Fluent LoRA Voice**: Supports custom voice with LoRA — create a unique voice

Diverse voice demos: Japanese ASMR, English Horror, English Character (Goblin's Trade)... Speech 2.6 doesn't just read text — it **performs** text.

* * *

## 5. Music 2.6 — AI Music Generation

### Standout Features

Music 2.6 is the most significant upgrade in MiniMax Music history:

**Cover Mode (NEW):** Upload a song → model extracts the melodic skeleton → you decide the style, arrangement, and atmosphere. Keep the melody while completely changing the genre — from folk to heavy metal, from classical symphony to cyberpunk electronic.

**Quality improvements:**
- **Mid-to-low frequency**: Bass and drums significantly improved in sub-bass depth and tightness
- **Song structure understanding**: Write "oppressive atmosphere → awakening → eruption" in the prompt and the model follows the exact structure
- **Performance nuance**: Understands vibrato, breath pauses, and dynamics of each instrument (especially traditional instruments)
- **First-packet latency <20 seconds**: Hear results almost instantly

**Enhanced instruction control:** BPM, key, song structure, emotional arc — write it in the prompt and the model executes precisely.

### Music Skills for Agent

Alongside Music 2.6, MiniMax open-sourced 3 Music Skills:
- **minimax-music-gen**: Gives Agent the ability to create music — original, instrumental, or Cover
- **minimax-music-playlist**: Turns Agent into a music curator — scans music apps, builds taste profiles, generates playlists
- **buddy-sings**: Gives virtual companions the ability to sing — reads character persona, builds unique voice identity

### Music 2.6 Pricing

- Consumer: **500 free creations/day** during beta
- Developer: Token Plan users receive an additional **100 free API calls/day**

* * *

## 6. Developer Ecosystem

### API Platform

MiniMax provides a comprehensive API platform at `platform.minimax.io` with:
- Detailed **Developer Docs** for each model
- **Console** for usage and billing management
- **MCP Server** — MiniMax MCP enables model integration into agentic workflows

### Token Plan

Token Plan is a pricing package for developers with 3 advantages:
- **Top Model**: Access to the most powerful, production-ready model
- **Unlimited Monthly Plan**: No worry about usage spikes
- **Out-of-the-Box**: One-click integration with popular dev tools

### Coding Plan

For coding use cases specifically, MiniMax offers the **Coding Plan** — an optimized package for AI coding tools with built-in support for Claude Code, Cursor, Roo Code, Cline, Codex CLI, and more.

* * *

## 7. Open Source — Ecosystem Assessment

MiniMax has an open-source strategy that is **clearly different** from Meta (Llama) or Mistral. Instead of releasing model weights for the community to fine-tune freely, MiniMax chooses **open-weight with a restrictive license** (modified-MIT) and focuses on open-sourcing the **tools around the model** rather than the model itself.

### GitHub: 25 repositories, 5.8K followers

| Repository | Stars | Description | License |
|------------|-------|--------|---------|
| **[skills](https://github.com/MiniMax-AI/skills)** | 10.1K ⭐ | Skills for agent ecosystem (C#) | MIT |
| **[MiniMax-01](https://github.com/MiniMax-AI/MiniMax-01)** | 3.4K ⭐ | MiniMax-Text-01 & VL-01, Linear Attention | --- |
| **[MiniMax-M1](https://github.com/MiniMax-AI/MiniMax-M1)** | 3.1K ⭐ | First hybrid-attention reasoning model | --- |
| **[MiniMax-M2](https://github.com/MiniMax-AI/MiniMax-M2)** | 2.6K ⭐ | Model for coding & agentic workflows | --- |
| **[Mini-Agent](https://github.com/MiniMax-AI/Mini-Agent)** | 2.4K ⭐ | Single agent demo with production-grade features | MIT |
| **[MiniMax-MCP](https://github.com/MiniMax-AI/MiniMax-MCP)** | 1.4K ⭐ | MCP server for TTS, image gen, video gen | --- |
| **[cli](https://github.com/MiniMax-AI/cli)** | 1.1K ⭐ | CLI tool for all modalities (TypeScript) | --- |
| **[OpenRoom](https://github.com/MiniMax-AI/OpenRoom)** | 994 ⭐ | Browser desktop for AI agent interaction | MIT |
| **[MiniMax-M2.5](https://github.com/MiniMax-AI/MiniMax-M2.5)** | 552 ⭐ | M2.5 model weights & docs | --- |
| **[VTP](https://github.com/MiniMax-AI/VTP)** | 468 ⭐ | Visual Tokenizer Pre-training (research) | --- |
| **[MiniMax-M2.7](https://github.com/MiniMax-AI/MiniMax-M2.7)** | 52 ⭐ | M2.7 model weights & deployment guides | Modified-MIT |

### HuggingFace: 17 models, 7 datasets, 84 team members

MiniMax publishes **all model weights** on HuggingFace:

| Model | Params | Downloads | Likes | Framework |
|-------|--------|-----------|-------|-----------|
| **MiniMax-M2.5** | 229B | 784K | 1.37K | Transformers, Safetensors |
| **MiniMax-M2** | 229B | 58.4K | 1.49K | Transformers, Safetensors |
| **MiniMax-M2.1** | 229B | 34.4K | 1.27K | Transformers, Safetensors |
| **MiniMax-M2.7** | 229B | 873 | 396 | Transformers, Safetensors (FP8) |
| **VTP-Large** | 0.7B | 63 | 14 | Image Feature Extraction |

**Open datasets:**
- **role-play-bench** (6.37K downloads) — benchmark for roleplay capability
- **VIBE** (325 likes) — benchmark for evaluating real workloads
- **OctoCodingBench** (410 likes) — multi-language coding benchmark
- **SynLogic** (3.04K likes) — synthetic data for logical reasoning

**Public research papers:**
- *MiniMax-01: Scaling Foundation Models with Lightning Attention*
- *MiniMax-M1: Scaling Test-Time Compute Efficiently with Lightning Attention*
- *SynLogic: Synthesizing Verifiable Reasoning Data at Scale*
- *VTP: Towards Scalable Pre-training of Visual Tokenizers for Generation*
- *MiniMax-Speech: Intrinsic Zero-Shot TTS with Learnable Speaker Encoder*

### Deployment & Self-hosting

M2.7 (229B params) can be self-hosted via multiple frameworks:
- **SGLang** — recommended for production
- **vLLM** — popular alternative
- **Transformers** — HuggingFace native
- **ModelScope** — mirror for Chinese users
- **NVIDIA NIM** — deploy on NVIDIA infrastructure
- **llama.cpp / LM Studio / Jan** — 29+ quantized versions for local inference

Third-party inference providers: **Together AI, Novita, Fireworks**.

### Open-Source Strategy Assessment

**Strengths:**

1. **Fully open-weight**: The entire M-series (M1 → M2.7) all have model weights on HuggingFace — something OpenAI and Anthropic don't do
2. **Rich tool ecosystem**: Skills (10.1K⭐), Mini-Agent (2.4K⭐), MCP Server, CLI — not just releasing models but the entire surrounding stack
3. **Research transparency**: Detailed papers and tech blogs on HuggingFace about architecture decisions (why they chose full attention for M2, reasoning data quality, agent RL framework Forge)
4. **Community quantization**: 29+ quantized versions of M2.7 by the community, showing model weights are truly usable

**Weaknesses:**

1. **Restrictive license**: Modified-MIT instead of Apache 2.0 or pure MIT — has restrictions for large commercial use
2. **Multimodal not open**: Speech, Video (Hailuo), Music models are **completely closed-source** — only text model is open-weight
3. **229B params is a high barrier**: Requires significant infrastructure to self-host (GPU H100 80GB+), not friendly for indie developers
4. **No small model**: No 7B, 13B, or 70B versions like Llama/Qwen — only 229B full size
5. **Smaller community**: Compared to Llama (300K+ GitHub stars) or Qwen, MiniMax's contributor ecosystem is still modest

### Open-Source Comparison with Competitors

| Criterion | MiniMax | Meta (Llama) | Alibaba (Qwen) | Mistral | DeepSeek |
|-----------|---------|-------------|----------------|---------|----------|
| **Text model open-weight** | ✅ 229B | ✅ 8B-405B | ✅ 0.6B-235B | ✅ 7B-123B | ✅ 7B-671B |
| **Small model (<13B)** | ❌ | ✅ | ✅ | ✅ | ✅ |
| **Vision model open** | ❌ (VTP tokenizer only) | ✅ Llama Vision | ✅ Qwen-VL | ✅ Pixtral | ✅ DeepSeek-VL |
| **Speech model open** | ❌ | ❌ | ✅ Qwen-Audio | ❌ | ❌ |
| **Video model open** | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Music model open** | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Agent framework** | ✅ Mini-Agent, Skills | ❌ | ❌ | ❌ | ❌ |
| **License** | Modified-MIT | Llama License | Apache 2.0 | Apache 2.0 | MIT |
| **GitHub total stars** | ~25K | 300K+ | 100K+ | 40K+ | 100K+ |

**Open-source conclusion:** MiniMax has an "open enough" strategy — sharing model weights sufficiently for the community to evaluate and use, but core value (multimodal models, agent platform) remains closed. Compared to Meta and Alibaba, MiniMax is weaker in breadth (number of model sizes) but excels in **agent tooling** (Skills, Mini-Agent, MCP). For developers wanting to self-host a large text model, MiniMax is a good choice. For those needing small models that run locally or multimodal open-source, Qwen or Llama should be considered.

* * *

## 8. Comparison with Competitors

### MiniMax vs. Major AI Platforms

| Criterion | MiniMax | OpenAI | Google | Anthropic |
|-----------|---------|--------|--------|-----------|
| **Text/Code Model** | M2.7 (tier 1–2) | GPT-5.x (tier 1) | Gemini 3 (tier 1) | Opus 4.6 (tier 1) |
| **Video Generation** | Hailuo 2.3 ✅ | Sora ✅ | Veo 2 ✅ | ❌ |
| **Music Generation** | Music 2.6 ✅ | ❌ | ❌ | ❌ |
| **TTS/Speech** | Speech 2.6 ✅ | TTS API ✅ | Cloud TTS ✅ | ❌ |
| **Consumer Products** | Agent, Hailuo, Talkie, Audio | ChatGPT | Gemini | Claude |
| **Full-stack Multimodal** | ✅ (5 modalities) | Partial | Partial | ❌ (text only) |
| **MCP Support** | ✅ | ✅ | ✅ | ✅ |
| **Pricing** | Competitive | Premium | Mid-range | Premium |

### MiniMax's Superior Strengths

1. **Only true full-stack multimodal**: No other platform self-develops foundation models for all 5 modalities (text, speech, image, video, music)
2. **Music generation leader**: Music 2.6 with Cover mode is unique — OpenAI, Google, Anthropic have no equivalent
3. **Aggressive pricing**: Token Plan is competitive, especially for developers in developing countries
4. **Agent ecosystem**: From Agent platform to MCP Server, everything connects seamlessly

### Weaknesses to Note

1. **Text model not #1**: M2.7 is very strong but still ranks below Opus 4.6, GPT-5.4 on many benchmarks
2. **Smaller ecosystem**: Community and third-party integrations are still fewer than OpenAI/Google
3. **Governance & data privacy**: As a Chinese company, some organizations may have concerns about data residency
4. **Documentation**: Though much improved, docs still aren't as detailed as OpenAI or Google

* * *

## 9. Try MiniMax — Quick Start Guide

### For End Users

| Product | Link | Free? |
|-----------|------|-----------|
| MiniMax Agent | [agent.minimax.io](https://agent.minimax.io/) | ✅ Free tier |
| Hailuo Video | [hailuoai.video](https://hailuoai.video/) | ✅ Free credits |
| MiniMax Audio | [minimax.io/audio](https://www.minimax.io/audio) | ✅ Free tier |
| Talkie | [talkie-ai.com](https://www.talkie-ai.com/) | ✅ Free |

### For Developers

**Step 1:** Register at [platform.minimax.io](https://platform.minimax.io/)

**Step 2:** Choose a Token Plan that fits or start with the free tier

**Step 3:** Integrate the API

```python
import requests

# Text Generation
url = "https://api.minimax.io/v1/text/chatcompletion_v2"
payload = {
    "model": "MiniMax-M2.7",
    "messages": [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Analyze the microservices architecture for an e-commerce system"}
    ]
}
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
response = requests.post(url, json=payload, headers=headers)
print(response.json())
```

**Step 4:** Explore the MCP Server for agentic workflows

* * *

## 10. Who Should Use MiniMax?

### Best suited for:

- **Content creators**: Need to generate video (Hailuo), music (Music), or speech (Speech) with high quality
- **Indie developers**: Token Plan competitive pricing, easy API integration
- **AI application builders**: Complete multimodal ecosystem, MCP support
- **Southeast Asian startups**: Appropriate pricing, no lock-in to Western ecosystems

### Consider carefully when:

- Enterprise requires **strict data residency** in EU/US
- Need the **absolute best text model** (Opus 4.6 / GPT-5.4 still edge ahead)
- Require **24/7 enterprise support** with clear SLAs

* * *

## 11. Conclusion

MiniMax is the **hidden gem** of the global AI race. While OpenAI focuses on text, Anthropic on safety, and Google on search integration, MiniMax is building something no one else has: **a full-stack AI platform with self-developed foundation models for every modality**.

M2.7 has proven that MiniMax can compete directly with tier 1 on coding and agentic tasks. Hailuo 2.3 is one of the best video models available. Music 2.6 with Cover mode has **virtually no competition**. Speech 2.6 is production-ready.

With **236 million+ users**, **214,000+ enterprise clients**, and an increasingly complete product matrix, MiniMax is no longer a small startup. They are becoming an **AI-era platform company** — and that is precisely the vision they declared in their 2025 financial report.

If you're a developer or creator looking for an alternative to Western AI platforms, MiniMax deserves a place in your toolbox.

**Website:** [minimax.io](https://www.minimax.io/)
**API Platform:** [platform.minimax.io](https://platform.minimax.io/)
**GitHub:** [github.com/MiniMax-AI](https://github.com/MiniMax-AI)
**HuggingFace:** [huggingface.co/MiniMaxAI](https://huggingface.co/MiniMaxAI)
**Discord:** [discord.gg/minimax](https://discord.gg/minimax)
