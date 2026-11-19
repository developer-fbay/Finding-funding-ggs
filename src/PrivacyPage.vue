<script setup>
import { ArrowLeft } from '@lucide/vue'
import BrandLogo from './components/BrandLogo.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <header class="top">
    <div class="wrap bar">
      <a href="./index.html" aria-label="Finding Funding home"><BrandLogo :size="20" /></a>
      <a href="./index.html" class="back"><ArrowLeft :size="16" aria-hidden="true" />Back to the enquiry form</a>
    </div>
  </header>
  <main class="wrap doc">
    <h1>Privacy policy</h1>
    <p>Last updated: 19 November 2026</p>

    <h2>Who we are</h2>
    <p>This website is run by Finding Funding, a commercial finance broker. We’re responsible for the personal data you send us through this site.</p>

    <h2>What we collect</h2>
    <ul>
      <li><strong>Your enquiry:</strong> roughly how much you need and what it’s for.</li>
      <li><strong>Your contact details:</strong> full name, company name, business email and phone number.</li>
      <li><strong>How you found the page:</strong> the address of the page you landed on, including campaign tags (utm_source, utm_medium, utm_campaign, utm_term, utm_content) and Google Ads click identifiers (gclid, gbraid, wbraid, gad_source), and the referring page. These come from the link you clicked, not from cookies.</li>
      <li><strong>Cookies and similar technologies:</strong> only if you accept them in the cookie banner. See “Cookies” below.</li>
    </ul>

    <h2>How it’s used</h2>
    <ul>
      <li><strong>To deal with your enquiry.</strong> We use your details to call you back and check whether the Growth Guarantee Scheme, or another type of finance, could suit your business. You asked us to do this, so we do it as a step before any agreement.</li>
      <li><strong>To introduce you to a lender</strong>, only if you choose to go ahead.</li>
      <li><strong>To improve our adverts and this page.</strong> We look at which adverts and links bring enquiries. We do this because it’s in our legitimate interests, and we only use cookies for it if you accept them.</li>
      <li><strong>To stop spam and fraud</strong> on our enquiry form.</li>
    </ul>

    <h2>Who it’s shared with</h2>
    <ul>
      <li><strong>Accredited Lenders</strong> we introduce you to, only if you choose to go ahead.</li>
      <li><strong>Service providers</strong> who help us run this site and handle enquiries: Cloudflare (website hosting), n8n (form processing), Close (our customer records) and Slack (alerts to our team). They only use your data to provide their service to us.</li>
      <li><strong>Google</strong>, if you accept advertising cookies: when you send an enquiry, your email address and phone number are passed to Google in hashed (scrambled) form to measure which adverts led to enquiries (Google Ads enhanced conversions).</li>
    </ul>

    <h2>How long it’s kept</h2>
    <p>We keep your details only for as long as we need them to deal with your enquiry, and then for as long as the law requires.</p>

    <h2>Your rights</h2>
    <p>You can ask us to:</p>
    <ul>
      <li>give you a copy of the data we hold about you</li>
      <li>correct it if it’s wrong</li>
      <li>delete it</li>
      <li>stop or limit how we use it</li>
      <li>send it to you or another company in a common format</li>
    </ul>

    <h2>Cookies</h2>
    <p>We only use analytics and advertising cookies (Google Analytics and Google Ads) if you accept them. Cookies the site needs to work are always on. You can change your choice at any time.</p>
    <p>Fonts are self-hosted, so this page doesn’t connect to Google Fonts.</p>

    <h2>Contact and complaints</h2>
    <p>To ask about your data or use any of your rights, ask us on your call or reply to any email we’ve sent you.</p>
    <p>If you’re unhappy with how we’ve handled your data, you can complain to the Information Commissioner’s Office (ICO) at <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener">ico.org.uk<span class="visually-hidden"> (opens in a new tab)</span></a>.</p>
  </main>
  <SiteFooter home="./index.html" />
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
