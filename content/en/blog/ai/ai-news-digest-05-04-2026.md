---
id: 01970000-a1b2-7c03-d004-e5f6a7b8c0e1
title: "AI News Digest 5/4/2026: Microsoft Launches 3 New Models, Holo3 Breaks Computer Use Records, Anthropic Acquires Biotech for $400M"
slug: ai-news-digest-05-04-2026
excerpt: >-
  A particularly eventful week in AI: Microsoft simultaneously launches 3 MAI
  foundational models (speech, voice, image); H Company's Holo3 achieves 78.85%
  SoTA on the OSWorld computer use benchmark; Anthropic spends $400M acquiring
  biotech startup Coefficient Bio and locks OpenClaw out of Claude Code subscription plans.
featured_image: /images/blog/ban-tin-ai-05-04-2026.webp
type: blog
reading_time: 10
view_count: 0
meta: null
published_at: '2026-04-05T08:00:00.000000Z'
created_at: '2026-04-05T08:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: AI, slug: ai}, {name: News, slug: news}, {name: LLM, slug: llm}, {name: Microsoft, slug: microsoft}, {name: Anthropic, slug: anthropic}, {name: OpenAI, slug: openai}]
locale: en
comments: []
---

In the past 72 hours, the AI world has seen a string of major breaking news: Microsoft officially entered the AI model race with 3 new foundational products priced lower than Google and OpenAI, H Company broke computer use records with Holo3, and Anthropic acquired a biotech startup for $400M while stirring controversy by locking OpenClaw out of Claude Code subscriptions.

---

## 📰 Quick Summary

| Event | Organization | Date | Significance |
|-------|-------------|------|--------------|
| Launch of MAI-Transcribe-1, MAI-Voice-1, MAI-Image-2 | Microsoft | Apr 2 | ⭐⭐⭐⭐⭐ |
| Holo3 achieves 78.85% SoTA on OSWorld | H Company | Apr 1 | ⭐⭐⭐⭐⭐ |
| Acquires Coefficient Bio — $400M | Anthropic | Apr 3 | ⭐⭐⭐⭐ |
| Claude Code locks out OpenClaw, adds fees | Anthropic | Apr 4 | ⭐⭐⭐⭐ |
| Executive shuffle: COO, CMO, CEO step aside | OpenAI | Apr 3 | ⭐⭐⭐ |

---

## 1. Microsoft Launches 3 MAI Foundational Models — "Cheaper Than Google and OpenAI"

On April 2, 2026, **Microsoft AI** — the research lab led by Mustafa Suleyman — unveiled 3 new foundational models, all available on **Microsoft Foundry** and **MAI Playground**:

- **MAI-Transcribe-1**: Speech-to-text supporting **25 languages**, **2.5×** faster than Azure Fast, priced at **$0.36/hour**.
- **MAI-Voice-1**: Audio generation, producing **60 seconds of audio in just 1 second**, with custom voice creation support, starting at **$22/1 million characters**.
- **MAI-Image-2**: An image/video generation model, available for testing at MAI Playground since March 19 and now officially released, priced at **$5/1M text input tokens**, **$33/1M image output tokens**.

These three models are the first products from the **MAI Superintelligence Team** — a research group established in November 2025. According to Suleyman: *"We are building Humanist AI — placing humans at the center, optimized for how people actually communicate."*

Notably, Microsoft is positioning MAI as cheaper than equivalent models from Google and OpenAI — a clear pricing competition signal. Suleyman also affirmed that Microsoft is maintaining its partnership with OpenAI, and this is just the beginning: *"You'll see more models from us soon."*

This strategy reflects Microsoft's desire not to rely entirely on a single partner. Microsoft has invested over **$13 billion** in OpenAI, but is clearly building its own "backup stack."

> **Key takeaway:** Microsoft is no longer just an OpenAI reseller — they are becoming a genuinely independent AI lab.

---

## 2. Holo3 — AI Agent Achieves 78.85% on OSWorld, Breaks Computer Use Records

On April 1, 2026, **H Company** announced **Holo3** — their latest computer use model — achieving **78.85% on OSWorld-Verified**, setting a new state of the art on what is considered the most rigorous desktop automation benchmark currently available.

What makes Holo3 special:

- **35B total parameters** but only **10B active** during inference (MoE: Mixture of Experts architecture)
- Ability to "see, reason, and act" in real desktop environments
- Outperforms competing models with far larger parameter counts
- **Apache 2.0** license — weights publicly available on HuggingFace

Holo3's power comes from the **Agentic Learning Flywheel** — a specialized training pipeline with 3 components: synthetic navigation data, out-of-domain augmentation, and curated reinforcement learning. H Company also built the **Synthetic Environment Factory** — an automated "factory" that recreates enterprise systems to train the model in realistic scenarios such as e-commerce software, business tools, and collaboration platforms.

The **H Corporate Benchmarks** with **486 multi-step tasks** show that Holo3 can handle complex multi-step tasks — for example: retrieving prices from a PDF, cross-referencing with employee budgets, then sending personalized approval/rejection emails to each individual.

Holo3 is currently available via **H Company's Inference API** with a free tier.

> **Key takeaway:** 78.85% on OSWorld is a significant milestone — computer use agents are approaching the reliability threshold needed for real enterprise deployment.

---

## 3. Anthropic Spends $400M on Coefficient Bio — Betting on Drug Discovery

On April 3, 2026, according to reports from *The Information* and *Eric Newcomer*, **Anthropic** completed the acquisition of **Coefficient Bio** — a stealth biotech AI startup — for **$400 million in stock**.

Coefficient Bio was founded just **8 months ago** by **Samuel Stanton** and **Nathan C. Frey** — both former employees of Prescient Design (Genentech's computational drug discovery division). This startup of approximately **10 people** is using AI to accelerate drug discovery and biological research.

This deal follows Anthropic's **Claude for Life Sciences** announcement in October 2025 — a platform to support scientific researchers. The entire Coefficient Bio team is expected to join Anthropic's **health and life science team**.

At the implied valuation from this deal ($40M per person — though paid in stock), this is an expensive "acquihire" — showing Anthropic is making a big bet on AI for bio/pharma, a field where DeepMind (with AlphaFold) and startups like Isomorphic Labs are currently leading.

> **Key takeaway:** Anthropic is expanding beyond LLM/coding assistants — biotech AI is a new frontier they want to capture.

---

## 4. Anthropic vs OpenClaw: The Battle for Developers

On April 4, 2026 (today), **Anthropic** notified Claude Code subscribers: starting at noon on April 4, they **cannot use subscription limits to run Claude through OpenClaw** and other third-party harnesses. Instead, they must pay separately via **pay-as-you-go**.

**OpenClaw** is a highly popular open-source coding tool — created by Peter Steinberger, who recently [left OpenClaw to join OpenAI](https://techcrunch.com/2026/02/15/openclaw-creator-peter-steinberger-joins-openai/).

Anthropic's head of Claude Code Boris Cherny explained: *"Subscriptions weren't built for the usage patterns of these third-party tools."* The company is offering full refunds to subscribers.

However, Steinberger responded sharply on X: *"Funny how timings match up — first they copy some popular features into their closed harness, then they lock out open source."* He and board member Dave Morin attempted to persuade Anthropic but only managed to delay the decision by one week.

This event has a broader context: OpenAI recently shut down the Sora App to focus on developer tools — exactly the market Claude Code is competing in. The race for AI developers is intensifying, and Anthropic clearly wants to retain revenue from its own platform.

> **Key takeaway:** Open-source tooling and commercial AI subscriptions are in conflict — this will be a hotspot throughout 2026.

---

## 5. OpenAI Leadership Shuffle: COO, CMO Depart, CEO on Medical Leave

On April 3, 2026, OpenAI made a series of executive-level changes:

- **Brad Lightcap** (COO) moves to a new role leading **"special projects"** — including complex deals and investments — reporting directly to CEO Sam Altman. His commercial operations responsibilities were transferred to Denise Dresser (former CEO of Slack, who joined OpenAI in late 2025 as CRO).

- **Fidji Simo** (CEO of AGI Development) announced she is taking medical leave for several weeks to treat a **neuroimmune condition**. During this time, co-founder and president **Greg Brockman** will manage the product.

- **Kate Rouch** (CMO) resigned to focus on her cancer recovery. OpenAI is searching for a new CMO.

OpenAI has **nearly 1 billion users** globally and is operating with "continuity and momentum" according to an official statement. However, the simultaneous high-level changes — even with reasonable explanations — are signals worth monitoring.

> **Key takeaway:** OpenAI is undergoing a significant leadership transition — watch whether Brockman's return to product management makes a difference.

---

## 🔮 This Week's Analysis

**Microsoft is becoming a real AI lab.** With the MAI Superintelligence Team and 3 new models positioned cheaper than Google/OpenAI, Microsoft is no longer just "OpenAI's cloud partner." The dual-track strategy (maintaining the OpenAI partnership while building independently) is a smart move — especially since the OpenAI agreement was renegotiated to give Microsoft more freedom.

**Computer use agents are entering the production-ready phase.** Holo3 with 78.85% OSWorld + lightweight architecture (10B active params) + Apache 2.0 license is a clear signal: in the next 6–12 months, agents capable of automating desktop workflows will appear widely in enterprise. This will be the real "RPA 2.0."

**Anthropic is running on multiple fronts simultaneously.** $400M into biotech, war with OpenClaw, a new political PAC, and a $400M private market deal — this was an extremely busy week for the company. The risk is they're spreading too thin. The opportunity is that if biotech AI explodes (as many predict), Anthropic has established an early foothold.

---

## 📌 Further Reading

- [Microsoft blog: 3 MAI models on Foundry](https://microsoft.ai/news/today-were-announcing-3-new-world-class-mai-models-available-in-foundry/) — Official announcement from Mustafa Suleyman
- [Holo3 on HuggingFace](https://huggingface.co/blog/Hcompany/holo3) — Technical blog from H Company, with training pipeline details
- [TechCrunch: Anthropic acquires Coefficient Bio](https://techcrunch.com/2026/04/03/anthropic-buys-biotech-startup-coefficient-bio-in-400m-deal-reports/) — Original report
- [TechCrunch: Claude Code vs OpenClaw](https://techcrunch.com/2026/04/04/anthropic-says-claude-code-subscribers-will-need-to-pay-extra-for-openclaw-support/) — The full story
- [TechCrunch: OpenAI executive shuffle](https://techcrunch.com/2026/04/03/openai-executive-shuffle-new-roles-coo-brad-lightcap-fidji-simo-kate-rouch/) — Detailed personnel changes

---

*The AI News Digest is updated daily at xdev.asia. Follow us so you never miss important AI news.*
