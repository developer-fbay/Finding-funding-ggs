<script setup>
// Footer laid out like lendpoint.co.uk's: brand + one-line description, two link
// columns, then a bottom bar with copyright and the broker line.
import BrandLogo from './BrandLogo.vue'
import { SITE } from '../config.js'

// On the privacy page the section links need to point back to the one-pager.
const props = defineProps({ home: { type: String, default: '' } })
const to = (hash) => `${props.home}${hash}`

const year = new Date().getFullYear()
function cookieSettings(e) {
  e.preventDefault()
  if (typeof window.revisitCkyConsent === 'function') window.revisitCkyConsent()
}
</script>

<template>
  <footer class="footer">
    <div class="wrap">
      <div class="top">
        <div class="about">
          <a :href="to('#top')" class="brand-link" :aria-label="`${SITE.brand}, back to top`"><BrandLogo :size="20" /></a>
          <p>Growth Guarantee Scheme finance for smaller UK businesses. {{ SITE.brand }} is a broker, not a lender.</p>
        </div>
        <nav class="cols" aria-label="Footer">
          <div>
            <p class="col-title">The scheme</p>
            <ul role="list">
              <li><a :href="to('#about')">What is GGS?</a></li>
              <li><a :href="to('#features')">Key features</a></li>
              <li><a :href="to('#eligibility')">Who can apply</a></li>
              <li><a :href="to('#how')">How it works</a></li>
            </ul>
          </div>
          <div>
            <p class="col-title">Company</p>
            <ul role="list">
              <li><a :href="to('#enquire')">Request a callback</a></li>
              <li><a :href="to('#questions')">Questions</a></li>
              <li v-if="SITE.cookieYesId"><a href="#" @click="cookieSettings">Cookie settings</a></li>
            </ul>
          </div>
        </nav>
      </div>
      <div class="bottom">
        <p>© {{ year }} {{ SITE.brand }}</p>
        <p>Broker, not a lender. Enquiring won’t trigger a credit check.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer { background: var(--ink); color: #a9b0bd; font-size: .9375rem; padding: 56px 0 40px; }
.top { display: grid; gap: 36px; padding-bottom: 40px; }
@media (min-width: 860px) { .top { grid-template-columns: 5fr 6fr; gap: 64px; } }
.about { display: flex; flex-direction: column; gap: 16px; max-width: 420px; }
.brand-link { align-self: flex-start; text-decoration: none; }
.cols { display: grid; gap: 28px; grid-template-columns: 1fr 1fr; }
.col-title { color: #fff; font-weight: 600; margin-bottom: 12px; }
ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
ul a { display: inline-flex; align-items: center; min-height: 36px; color: var(--on-dark); text-decoration: none; }
ul a:hover { color: #fff; text-decoration: underline; }
.bottom {
  display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px 24px;
  padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, .12); font-size: .875rem; color: #8b93a1;
}
</style>
