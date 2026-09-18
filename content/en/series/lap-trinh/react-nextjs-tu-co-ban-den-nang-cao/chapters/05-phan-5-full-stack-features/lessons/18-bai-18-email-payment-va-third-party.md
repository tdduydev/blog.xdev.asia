---
id: 019d8b40-d503-7001-b005-reactnx000503
title: 'Lesson 18: Email, Payment & Third-party Integration'
slug: bai-18-email-payment-va-third-party
description: >-
  Send emails with Resend & React Email. Stripe payment integration. Checkout
  flow, subscription. Third-party SDK patterns.
duration_minutes: 120
is_free: true
video_url: null
sort_order: 18
section_title: 'Part 5: Full-Stack Features'
course:
  id: 019d8b40-d100-7001-b005-reactnx000001
  title: 'React & Next.js: From Basics to Advanced'
  slug: react-nextjs-tu-co-ban-den-nang-cao
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-3374" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#121a2b"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-3374)"/>

  <!-- Decorations -->
  <g>
    <circle cx="895" cy="235" r="18" fill="#fb923c" opacity="0.1"/>
    <circle cx="690" cy="130" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="985" cy="285" r="28" fill="#fb923c" opacity="0.1"/>
    <circle cx="780" cy="180" r="33" fill="#fb923c" opacity="0.05"/>
    <circle cx="1075" cy="75" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <line x1="600" y1="185" x2="1100" y2="265" stroke="#fb923c" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="215" x2="1050" y2="285" stroke="#fb923c" stroke-width="0.5" opacity="0.08"/>
    <polygon points="969.6410161513776,115 969.6410161513776,155 935,175 900.3589838486224,155 900.3589838486224,115.00000000000001 935,95" fill="none" stroke="#fb923c" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fb923c"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fb923c" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">💻 Programming — Lesson 18</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 18: Email, Payment & Third-party</tspan>
      <tspan x="60" dy="42">Integration</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">React & Next.js: From Basics to Advanced</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 5: Full-Stack Features</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

<h2 id="1-resend"><strong>1. Email with Resend</strong></h2>

<pre><code class="language-bash">npm install resend @react-email/components
</code></pre>

<pre><code class="language-tsx">// emails/welcome.tsx — React Email template
import { Html, Head, Body, Container, Heading, Text, Button } from '@react-email/components';

export function WelcomeEmail({ name, url }: { name: string; url: string }) {
  return (
    &lt;Html&gt;
      &lt;Head /&gt;
      &lt;Body style={{ fontFamily: 'sans-serif' }}&gt;
        &lt;Container&gt;
          &lt;Heading&gt;Chào mừng, {name}!&lt;/Heading&gt;
          &lt;Text&gt;Cảm ơn bạn đã đăng ký tài khoản.&lt;/Text&gt;
          &lt;Button href={url} style={{ background: '#0070f3', color: '#fff', padding: '12px 24px' }}&gt;
            Xác nhận email
          &lt;/Button&gt;
        &lt;/Container&gt;
      &lt;/Body&gt;
    &lt;/Html&gt;
  );
}
</code></pre>

<pre><code class="language-ts">// lib/email.ts
import { Resend } from 'resend';
import { WelcomeEmail } from '@/emails/welcome';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string, name: string) {
  await resend.emails.send({
    from: 'noreply@xdev.asia',
    to: email,
    subject: `Chào mừng ${name} đến với xDev!`,
    react: WelcomeEmail({ name, url: `https://blog.xdev.asia/verify?email=${email}` }),
  });
}
</code></pre>

<h2 id="2-stripe-setup"><strong>2. Stripe Payment Setup</strong></h2>

<pre><code class="language-bash">npm install stripe @stripe/stripe-js @stripe/react-stripe-js
</code></pre>

<pre><code class="language-ts">// lib/stripe.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});
</code></pre>

<h2 id="3-checkout"><strong>3. Checkout Flow</strong></h2>

<pre><code class="language-ts">// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { auth } from '@/auth';

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { priceId } = await request.json();

  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user?.email!,
    mode: 'payment', // or 'subscription'
    payment_method_types: ['card'],
    line_items: [
      { price: priceId, quantity: 1 },
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/cancel`,
    metadata: {
      userId: session.user?.id!,
    },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
</code></pre>

<pre><code class="language-tsx">// Client — Redirect to Stripe Checkout
'use client';

export function CheckoutButton({ priceId }: { priceId: string }) {
  const handleCheckout = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    });
    const { url } = await res.json();
    window.location.href = url;
  };

  return (
    &lt;button onClick={handleCheckout}&gt;
      Mua ngay
    &lt;/button&gt;
  );
}
</code></pre>

<h2 id="4-webhook"><strong>4. Stripe Webhooks</strong></h2>

<pre><code class="language-ts">// app/api/webhooks/stripe/route.ts
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature')!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return new Response('Invalid signature', { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      await db.order.create({
        data: {
          userId: session.metadata?.userId!,
          stripeSessionId: session.id,
          amount: session.amount_total! / 100,
          status: 'completed',
        },
      });
      break;
    }
    case 'invoice.payment_failed': {
      const invoice = event.data.object;
      // Handle failed subscription payment
      break;
    }
  }

  return new Response('OK');
}
</code></pre>

<h2 id="5-subscription"><strong>5. Subscription Management</strong></h2>

<pre><code class="language-ts">// Server Action — manage subscription
'use server';
import { stripe } from '@/lib/stripe';
import { auth } from '@/auth';
import { db } from '@/lib/db';

export async function createCustomerPortal() {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const user = await db.user.findUnique({
    where: { id: session.user?.id },
  });

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: user!.stripeCustomerId!,
    return_url: `${process.env.NEXT_PUBLIC_URL}/settings/billing`,
  });

  return { url: portalSession.url };
}
</code></pre>

<p>Next article: <strong>Testing React & Next.js</strong> — unit tests, integration tests, E2E.</p>
