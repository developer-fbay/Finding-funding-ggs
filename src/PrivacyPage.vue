<script setup>
import { ArrowLeft } from '@lucide/vue'
import BrandLogo from './components/BrandLogo.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <header class="top">
    <div class="wrap bar">
      <a href="./index.html" aria-label="Funding Finder home"><BrandLogo :size="20" /></a>
      <a href="./index.html" class="back"><ArrowLeft :size="16" aria-hidden="true" />Back to the enquiry form</a>
    </div>
  </header>
  <main class="wrap doc">
    <h1>Privacy policy</h1>
    <p>Last updated: <mark class="ph">[[date]]</mark></p>

    <h2>Who we are</h2>
    <p>This page is run by <mark class="ph">[[REGISTERED COMPANY NAME]]</mark>, trading as Funding Finder (company number <mark class="ph">[[00000000]]</mark>, registered address <mark class="ph">[[address]]</mark>), a commercial finance broker. <mark class="ph">[[If another firm handles enquiries, name it here and set out who is controller for what.]]</mark></p>

    <h2>What we collect</h2>
    <ul>
      <li><strong>Your enquiry:</strong> roughly how much you need and what it’s for.</li>
      <li><strong>Your contact details:</strong> full name, company name, business email and phone number.</li>
      <li><strong>How you found the page:</strong> the address of the page you landed on, including campaign tags (utm_source, utm_medium, utm_campaign, utm_term, utm_content) and Google Ads click identifiers (gclid, gbraid, wbraid, gad_source), and the referring page. These come from the link you clicked, not from cookies.</li>
      <li><strong>Cookies and similar technologies:</strong> only if you accept them in the cookie banner. See “Cookies” below.</li>
    </ul>

    <h2>How it’s used</h2>
    <p><mark class="ph">[[Purposes and lawful basis, e.g. we use your enquiry to contact you and check whether the Growth Guarantee Scheme or another option could suit you (steps at your request before a contract); we measure which adverts bring enquiries (legitimate interests, and consent for cookies).]]</mark></p>

    <h2>Who it’s shared with</h2>
    <ul>
      <li><strong>Accredited Lenders</strong> we introduce you to, only if you choose to go ahead.</li>
      <li><strong>Service providers:</strong> <mark class="ph">[[e.g. n8n (form processing) and Close (CRM)]]</mark>.</li>
      <li><strong>Google</strong>, if you accept advertising cookies: when you send an enquiry, your email address and phone number are passed to Google in hashed (scrambled) form to measure which adverts led to enquiries (Google Ads enhanced conversions).</li>
    </ul>

    <h2>How long it’s kept</h2>
    <p><mark class="ph">[[Retention period for enquiries and for analytics data]]</mark></p>

    <h2>Your rights</h2>
    <p><mark class="ph">[[Access, correction, deletion, objection, restriction, portability, and the right to complain to the ICO (ico.org.uk).]]</mark></p>

    <h2>Cookies</h2>
    <p><mark class="ph">[[Cookie list from the consent tool: strictly necessary, analytics (Google Analytics), advertising (Google Ads). Non-essential cookies are only set after you accept them, and you can change your choice at any time with the cookie settings link.]]</mark></p>
    <p>Fonts are self-hosted, so this page doesn’t connect to Google Fonts.</p>

    <h2>Contact and complaints</h2>
    <p><mark class="ph">[[How to contact us about your data, and how to complain to the ICO.]]</mark></p>
  </main>
  <SiteFooter />
</template>

<style scoped>
.top { border-bottom: 1px solid var(--zinc-200); background: var(--ink); }
.bar { min-height: 72px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.bar a { text-decoration: none; }
.back { display: inline-flex; align-items: center; gap: 6px; color: #fff; font-size: .9375rem; font-weight: 500; }
.back:hover { color: var(--coral); }
.doc { max-width: 760px; padding-top: 48px; padding-bottom: 80px; display: flex; flex-direction: column; gap: 14px; }
.doc h1 { font-size: clamp(2rem, 1.5rem + 2vw, 2.75rem); }
.doc h2 { font-size: 1.375rem; letter-spacing: -0.02em; margin-top: 24px; }
.doc ul { margin: 0; padding-left: 20px; display: flex; flex-direction: column; gap: 6px; }
</style>
