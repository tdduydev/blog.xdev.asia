---
id: 02760001-ba01-4001-a001-000000000003
title: "AI Literacy for BA: LLM, RAG, Hallucination, and Guardrails Explained Without Code"
slug: ai-literacy-for-ba-llm-rag-hallucination-guardrails
excerpt: >-
  BAs don't need to code AI, but they need to understand enough to write correct requirements and work effectively with the technical team. LLM, RAG, hallucination, confidence scores, and guardrails explained in business language — with real-world examples.
featured_image: /images/blog/ai-literacy-ba.webp
type: blog
reading_time: 15
view_count: 0
meta: null
published_at: '2026-05-05T09:00:00.000000Z'
created_at: '2026-05-05T09:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: AI, slug: ai}, {name: LLM, slug: llm}, {name: Requirements, slug: requirements}]
comments: []
---

You don't need to know how to train models to be a great BA in the AI era. But if you don't understand **how LLMs work**, you'll write the wrong acceptance criteria, overlook serious risks, and be unable to push back when the technical team proposes an inappropriate solution.

This article explains core AI concepts **in business language** — no code, no math.

---

## 1. What Is an LLM — Explained in BA Language

An LLM (Large Language Model) is a type of AI trained on massive amounts of text to **predict the next token** in a plausible way.

Think of it this way: you give the model a question → the model finds patterns from the billions of text fragments it has read → it generates an answer that **sounds reasonable**.

**What BAs need to remember:**
- LLMs **have no memory** between conversations (unless the system stores it)
- LLMs **don't know the latest information** after their training cutoff date
- LLMs **don't "know" the truth** — they generate plausible text, not necessarily accurate text

→ **Requirement to write:** "The system must display a disclaimer when answering questions about the latest policies/prices/regulations, as the LLM may be out of date."

---

## 2. RAG — When AI Needs to Read Your Documents

**RAG (Retrieval-Augmented Generation)** solves the problem of LLMs not knowing a company's internal information.

How it works:
1. User asks: "What is our refund policy?"
2. The system **searches** an internal knowledge base (FAQs, policy docs...)
3. Retrieves relevant passages → appends them to the prompt → LLM answers based on that context

**What BAs need to remember:**
- RAG is only as good as the **source documents** — garbage in, garbage out
- Decisions need to be made: which documents are allowed to be indexed?
- A policy is needed for updating the knowledge base when policies change

→ **Requirement to write:** "The knowledge base must be updated within 24 hours of a policy change. The system must log which source document was used for each response."

---

## 3. Hallucination — A Risk BA Cannot Ignore

**Hallucination** is when AI generates false or nonexistent information, but presents it with confident authority as if it were fact.

**Real-world examples:**
- AI says "Product X has a 3-year warranty" when it's actually 1 year
- AI generates a support phone number that doesn't exist
- AI cites contract clauses not present in the original document

**Why does this matter to a BA?**

If an AI product gives incorrect information to customers → **legal risk, loss of trust, or real financial damage**.

→ **Sample acceptance criteria:**
```
GIVEN a user asks about policy information
WHEN AI cannot find the information in the knowledge base
THEN AI must respond with "I'm not certain about this, please contact..." instead of making assumptions
```

---

## 4. Confidence Score — When to Trust AI

Many AI systems have a **confidence score** — a number indicating how "confident" the model is in its answer.

**What BAs need to decide:**
- At what confidence threshold is AI allowed to answer on its own?
- Below that threshold, what happens: show a disclaimer, escalate to a human agent, or decline to answer?

→ **Sample requirement:** "When confidence score < 0.7, the system must append the phrase 'This information should be verified' and provide a link to contact an agent."

---

## 5. Guardrails — Protecting Users and the Business

**Guardrails** are rules that limit what AI is allowed to do or say.

Common types of guardrails:

| Type | Example |
|------|---------|
| **Content filter** | Must not generate violent or discriminatory content |
| **Topic restriction** | Customer service chatbot only answers product questions, not politics |
| **Output format** | Always respond in English, no more than 200 words |
| **PII protection** | Must not repeat credit card numbers or national IDs in responses |
| **Human override** | When a user requests a human agent, cannot refuse |

**The BA is the one who defines guardrails** — not the AI Engineer. Because the BA understands business context, legal risk, and user expectations.

---

## 6. AI Literacy Checklist for BA — Summary

When working on an AI feature, ask yourself these questions:

**About data:**
- [ ] Does the training data contain PII or sensitive information?
- [ ] How frequently is the knowledge base updated?

**About AI behavior:**
- [ ] When AI doesn't know → what happens?
- [ ] When AI is wrong → who is accountable?
- [ ] What is the confidence threshold for self-answering vs escalating?

**About limitations:**
- [ ] Which topics is AI not allowed to discuss?
- [ ] What output format standards must be followed?
- [ ] When must the user be transferred to a human agent?

> BAs don't need to code guardrails, but **must write the spec** so AI Engineers implement them correctly.
