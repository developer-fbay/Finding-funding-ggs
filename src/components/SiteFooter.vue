<script setup>
// Footer laid out like lendpoint.co.uk's: brand + one-line description, two link
// columns, then a bottom bar with copyright and the broker line.
import BrandLogo from './BrandLogo.vue'
import { SITE } from '../config.js'

// `ggs`: true on the Growth Guarantee Scheme page; false on the home page (business loans)
// and the privacy page, which use the home page's description and section links.
// `home`: set on pages without those sections, so section links point back to that page.
const props = defineProps({
  home: { type: String, default: '' },
  ggs: { type: Boolean, default: true }
})
const to = (href) => (href.startsWith('#') ? `${props.home}${href}` : href)
const pageCol = props.ggs
  ? { title: 'The scheme', links: [['#about', 'What is GGS?'], ['#features', 'Key features'], ['#eligibility', 'Who can apply'], ['#how', 'How it works']] }
  : { title: 'Business finance', links: [['#need', 'What it’s for'], ['#types', 'Types of finance'], ['#why', 'Why use a broker'], ['#how', 'How it works']] }
const otherPage = props.ggs ? ['./index.html', 'All business finance'] : null
const blurb = props.ggs ? 'Growth Guarantee Scheme finance for smaller UK businesses.' : 'Business loans and finance for UK businesses.'

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
          <p>{{ blurb }} {{ SITE.brand }} is a broker, not a lender.</p>
        </div>
        <nav class="cols" aria-label="Footer">
          <div>
            <p class="col-title">{{ pageCol.title }}</p>
            <ul role="list">
              <li v-for="[hash, text] in pageCol.links" :key="hash"><a :href="to(hash)">{{ text }}</a></li>
            </ul>
          </div>
          <div>
            <p class="col-title">Company</p>
            <ul role="list">
              <li><a :href="to('#enquire')">Request a callback</a></li>
              <li><a :href="to('#questions')">Questions</a></li>
              <li v-if="otherPage"><a :href="otherPage[0]">{{ otherPage[1] }}</a></li>
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
