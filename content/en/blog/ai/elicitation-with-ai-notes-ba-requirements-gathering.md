---
id: 02760001-ba01-4001-a002-000000000001
title: "Elicitation with AI: How BA Gathers Requirements Faster Without Losing Context"
slug: elicitation-with-ai-notes-ba-requirements-gathering
excerpt: >-
  Traditional Elicitation techniques consume many hours of note-taking and synthesis. This guide teaches BA how to use AI to auto-summarize interviews, automatically cluster insights, detect requirement gaps, and create action items — maintaining quality while saving 60% of processing time.
featured_image: /images/blog/elicitation-ai-notes-ba.webp
type: blog
reading_time: 10
view_count: 0
meta: null
published_at: '2026-05-05T09:00:00.000000Z'
created_at: '2026-05-05T09:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Requirements, slug: requirements}, {name: AI, slug: ai}, {name: Elicitation, slug: elicitation}]
comments: []
---

Elicitation — gathering requirements — is the core skill of any BA. But the most time-consuming part isn't *asking questions*; it's *processing* afterward: replaying recordings, transcribing notes, clustering insights, writing summaries, finding gaps, sending follow-ups. A 2-hour workshop can cost an additional 3–4 hours of synthesis work.

AI doesn't replace BA in the meeting room — but AI **can handle most of the synthesis work** afterward.

---

## 1. What is Elicitation and Why is it Complex?

Elicitation is the process BA **pulls out** (not passively *collects*) information from stakeholders: needs, goals, constraints, expectations, and even things they *haven't said yet*.

Common techniques:
- **One-on-one interviews**: Deep exploration by role
- **Group workshops**: Multi-stakeholder alignment
- **Observation / Job shadowing**: Watching users work in reality
- **Document analysis**: Reading SOPs, reports, complaint logs
- **Surveys**: Collecting large-scale quantitative data

The challenge: After each session, BA must *connect* multiple information sources, identify contradictions, prioritize — all by hand.

---

## 2. What Can AI Do in Elicitation?

AI doesn't sit in interviews on your behalf. But AI excels at the steps **after the session**:

| Step | Traditional | With AI |
|------|-------------|---------|
| Transcribe recording | Listen back, type manually | Auto-transcribe (Whisper, Otter.ai) |
| Summarize content | Read again, highlight | Prompt → structured summary |
| Cluster insights by topic | Post-its + Miro | Prompt → affinity clusters |
| Detect gaps / contradictions | BA experience | Prompt cross-check multiple transcripts |
| Create action items | Write manually | Prompt → draft follow-up list |
| Draft follow-up email | Write from scratch | Prompt → email template |

---

## 3. Real-world Workflow: From Recording → Requirements

### Step 1: Transcribe

Use **Whisper** (local, free) or **Otter.ai / Fireflies** (cloud). Output: `.txt` or `.srt` file.

```bash
# Local Whisper
whisper interview.mp3 --language Vietnamese --output_format txt
```

### Step 2: Summary prompt

```
You are a Business Analyst. Here is a stakeholder interview transcript:
[PASTE TRANSCRIPT]

Summarize according to this format:
1. Stakeholder objectives (bullet points)
2. Current pain points (bullet points)
3. Implicit functional requirements (bullet points)
4. Constraints mentioned (time, budget, legal)
5. Questions needing clarification
```

### Step 3: Affinity clustering

When you have multiple transcripts from different stakeholders:

```
Here are 3 summaries from 3 different stakeholders:
[SUMMARY 1] [SUMMARY 2] [SUMMARY 3]

Group insights by topic. For each topic:
- Which stakeholders agree
- Which have different viewpoints
- Points of conflict needing resolution
```

### Step 4: Gap detection

```
Here are requirements from previous sessions:
[EXISTING REQUIREMENTS]

Here are new insights from today's workshop:
[NEW INSIGHTS]

Identify:
- Requirements that changed
- New gaps emerged
- Contradictions with old requirements
- Questions to ask stakeholders again
```

---

## 4. Prompt Pack for Interview Elicitation

### Discovery interview (first stakeholder meeting)

```
As-is process questions:
- "How are you currently doing this step?"
- "What takes the most time?"
- "When does this process fail?"
- "Who else is affected when this happens?"

To-be vision questions:
- "If you could change 1 thing, what would it be?"
- "What does success look like in 6 months?"
- "What CANNOT change?"
```

### Follow-up clarification template

```
Thank you for your time today. I have a few points to confirm:

1. [CLARIFICATION POINT 1] — I understood [YOUR INTERPRETATION], is that correct?
2. [CLARIFICATION POINT 2] — Can you give me a specific example?
3. [CONTRADICTION] — [STAKEHOLDER A] said X, while you mentioned Y. Who decides which direction?

Deadline for feedback: [DATE]
```

---

## 5. Quality Control for AI Output

AI can **hallucinate** — inventing "insights" that weren't actually in the transcript. BA must:

1. **Always cross-check against raw transcript**: If AI claims stakeholder said X, find that exact sentence in the transcript.
2. **Tag confidence levels**: High (stakeholder stated clearly) / Medium (implied) / Low (AI inference).
3. **Don't use AI output as a replacement for sign-off**: AI summary still needs stakeholder confirmation.

```
[ELICITATION CONFIRMATION CHECKLIST]
☐ Each requirement has a source (stakeholder + session + quote)
☐ Contradictions are noted, not auto-resolved
☐ Stakeholder has reviewed and confirmed summary
☐ Action items have owner and deadline
☐ Recording/transcript stored in correct location
```

---

## 6. Tools BA Should Know

| Tool | Purpose | Free? |
|------|---------|-------|
| **Whisper** (OpenAI) | Local transcription, Vietnamese support | ✅ |
| **Otter.ai** | Live transcription, speaker detection | Freemium |
| **Fireflies.ai** | Google Meet/Zoom integration, AI summary | Freemium |
| **Miro AI** | Automatic affinity diagram from notes | Freemium |
| **Notion AI** | Page summarization, write follow-up emails | Freemium |
| **Claude / ChatGPT** | Analyze transcripts, detect gaps | Freemium |

---

## 7. Red Flags: Elicitation May Be Incomplete

Many BA think they have enough requirements when they actually don't. Warning signs:

- **"I think the stakeholder wants..."** — No evidence
- **All requirements are HIGH priority** — Haven't forced ranking
- **No constraints mentioned** — Haven't dug deep enough
- **No non-functional requirements** — Missing performance, security, scalability
- **Zero contradictions between stakeholders** — Haven't explored deeply enough

---

## Summary

Good elicitation = Asking the right questions + Processing insights quickly + Finding gaps early + Confirming with stakeholders.

AI doesn't replace you asking questions, but AI helps you **go from raw notes to structured requirements 3–4x faster**. The key is BA maintaining quality control — AI is an accelerator, not a decision maker.
