<script setup>
import BrandLogo from './BrandLogo.vue'
import { SITE } from '../config.js'
const year = new Date().getFullYear()
function cookieSettings(e) {
  e.preventDefault()
  if (typeof window.revisitCkyConsent === 'function') window.revisitCkyConsent()
}
</script>

<template>
  <footer class="footer">
    <div class="wrap grid">
      <div class="col">
        <BrandLogo :size="20" />
        <p><mark class="ph">[[REGISTERED COMPANY NAME]]</mark> trading as Funding Finder, registered in <mark class="ph">[[England and Wales]]</mark>, company number <mark class="ph">[[00000000]]</mark>. Registered address: <mark class="ph">[[ADDRESS]]</mark>. <mark class="ph">[[FCA STATUS LINE AND FRN, IF ANY]]</mark></p>
      </div>
      <div class="col wide">
        <p><strong>Funding Finder is a commercial finance broker, not a lender.</strong> <mark class="ph">[[CODI: FEES AND COMMISSION LINE]]</mark></p>
        <p>The Growth Guarantee Scheme is managed by the British Business Bank on behalf of, and with the financial backing of, the Secretary of State for Business &amp; Trade. British Business Bank plc is a development bank wholly owned by HM Government. It is not authorised or regulated by the PRA or the FCA. British Business Bank plc and its subsidiaries are not banking institutions and do not operate as such.</p>
        <p class="links"><a href="./privacy.html">Privacy policy</a><template v-if="SITE.cookieYesId"> · <a href="#" @click="cookieSettings">Cookie settings</a></template></p>
        <p class="copy">© {{ year }} Funding Finder</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer { background: var(--ink); color: #a9b0bd; font-size: .875rem; padding: 56px 0 64px; }
.grid { display: grid; gap: 32px; }
@media (min-width: 900px) { .grid { grid-template-columns: 5fr 7fr; gap: 56px; } }
.col { display: flex; flex-direction: column; gap: 12px; }
strong { color: #fff; font-weight: 600; }
a { color: #fff; }
.copy { color: #71717a; }
</style>
