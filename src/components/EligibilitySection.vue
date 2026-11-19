<script setup>
import { ChartColumn, MapPin, Lightbulb, Activity, FileCheck, Ban, X, ReceiptPoundSterling } from '@lucide/vue'
import ReadMore from './ReadMore.vue'

// Plain-English text is shown; the toolkit's approved wording (p12) sits word for word in "official".
const rules = [
  { icon: MapPin, title: 'Trading in the UK', big: 'UK', text: 'Your business trades in the UK. For most businesses, more than half their income must come from trading.',
    official: ['The borrower must be carrying out trading activity in the UK and, for most businesses, generating more than 50% of its income from trading activity.'] },
  { icon: Lightbulb, title: 'A viable business', text: 'The lender must believe your business is viable.',
    official: ['GGS Accredited Lenders must consider that the borrower has a viable business proposition.'] },
  { icon: Activity, title: 'Not in difficulty', text: 'Your business can’t be a “business in difficulty”. That includes being in insolvency proceedings.',
    official: ['The borrower must not be a business in difficulty, including not being in relevant insolvency proceedings.'] },
  { icon: FileCheck, title: 'Within subsidy limits', text: 'You’ll confirm in writing that this finance won’t take you over your subsidy limit. If you’ve had a subsidy from a public scheme, you should have a statement of how much and what type.',
    official: ['Borrowers will need to provide written confirmation that receipt of the Growth Guarantee Scheme facility will not mean that the business exceeds the maximum amount of subsidy they are allowed to receive. All borrowers in receipt of a subsidy from a publicly funded programme should be provided with a written statement, confirming the level and type of aid received.'] }
]
const excluded = [
  'Banks, building societies, insurers and reinsurers (insurance brokers can apply)',
  'Public sector bodies',
  'State-funded primary and secondary schools',
  'Businesses that mainly extract coal, lignite, crude oil or natural gas, and some support services for oil and gas extraction'
]
const excludedOfficial = [
  'Banks, Building Societies, Insurers and Reinsurers (excluding Insurance Brokers)',
  'Public sector bodies',
  'State-funded primary and secondary schools',
  'Principal Business activity of primary extraction of coal, lignite, crude petroleum and natural gas, and certain support activities for petroleum and natural gas extraction.'
]
</script>

<template>
  <section class="section section-soft" aria-labelledby="elig-title">
    <div class="wrap">
      <div class="section-head">
        <div><p class="eyebrow">Eligibility restrictions</p><h2 id="elig-title" class="h2">Who can apply</h2></div>
        <p>These are the scheme rules. The lender decides if your business is eligible. We check the basics on our call first.</p>
      </div>

      <div class="bento">
        <article class="card rule wide">
          <div class="top"><ChartColumn :size="30" class="icon icon-light" aria-hidden="true" /><span class="big">£45m</span></div>
          <h3>Turnover up to £45m</h3>
          <p>Your yearly turnover is £45m or less. If you’re part of a group, this is the whole group’s turnover.</p>
          <ReadMore context="Turnover up to £45m" :paras="['The Scheme is open to smaller businesses with a turnover of up to £45m (on a group basis, where part of a group).']" />
        </article>
        <article v-for="r in rules" :key="r.title" class="card rule">
          <div class="top"><component :is="r.icon" :size="30" class="icon icon-light" aria-hidden="true" /><span v-if="r.big" class="big">{{ r.big }}</span></div>
          <h3>{{ r.title }}</h3>
          <p>{{ r.text }}</p>
          <ReadMore :context="r.title" :paras="r.official" />
        </article>

        <article class="excluded wide">
          <div class="ex-head"><Ban :size="28" class="icon icon-dark" aria-hidden="true" /><h3>Who can’t apply</h3></div>
          <ul role="list" class="ex-list">
            <li v-for="e in excluded" :key="e"><X :size="16" :stroke-width="2" class="icon icon-dark" aria-hidden="true" /><span>{{ e }}</span></li>
          </ul>
          <ReadMore context="Who can’t apply" :paras="['Please note that the following are not eligible under Growth Guarantee Scheme:']" :list="excludedOfficial" />
        </article>
        <article class="subsidy">
          <ReceiptPoundSterling :size="28" class="icon icon-light" aria-hidden="true" />
          <h3>Subsidy</h3>
          <p>GGS counts as a subsidy. A business and its group can only get so much subsidy in any three years. Subsidies you’ve had before may lower how much you can borrow.</p>
          <p><a href="https://www.british-business-bank.co.uk/finance-options/debt-finance/growth-guarantee-scheme/subsidies" target="_blank" rel="noopener">Read about subsidies<span class="visually-hidden"> on the British Business Bank website (opens in a new tab)</span></a></p>
          <ReadMore context="Subsidy" :paras="['The assistance provided through the Growth Guarantee Scheme, like many Government-backed business support activities, is regarded as a subsidy and is deemed to benefit the borrower. There is a limit to the amount of subsidy that may be received by a borrower, and its wider group, over any rolling three-year period. Any previous subsidy may reduce the amount a business can borrow. More information on subsidies is available here.']" />
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bento { display: grid; gap: 16px; grid-template-columns: 1fr; }
@media (min-width: 760px) { .bento { grid-template-columns: 1fr 1fr; } .wide { grid-column: span 2; } }
@media (min-width: 1100px) { .bento { grid-template-columns: repeat(3, 1fr); } }
.rule { display: flex; flex-direction: column; gap: 12px; padding: 30px; }
.top { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
.big { font-family: var(--font-head); font-weight: 600; font-size: clamp(2.75rem, 2rem + 2vw, 4rem); line-height: 1; letter-spacing: -0.05em; color: var(--coral-deep); }
.rule h3, .subsidy h3 { font-size: 1.25rem; letter-spacing: -0.02em; line-height: 1.2; margin-top: 10px; }
.rule p { font-size: .9375rem; color: var(--zinc-700); }
.excluded { border-radius: var(--r-lg); background: var(--ink); color: #fff; padding: 30px; display: flex; flex-direction: column; gap: 18px; }
.ex-head { display: flex; align-items: center; gap: 12px; }
.ex-head h3 { font-size: 1.25rem; letter-spacing: -0.02em; line-height: 1.3; }
.excluded .ex-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
.excluded .ex-list li { display: flex; gap: 10px; align-items: flex-start; padding: 14px; border-radius: var(--r-sm); background: rgba(255,255,255,.06); font-size: .875rem; line-height: 1.5; color: #e4e4e7; }
.excluded li .icon { margin-top: 2px; }
.subsidy { border-radius: var(--r-lg); background: var(--coral-tint); padding: 30px; display: flex; flex-direction: column; gap: 12px; }
.subsidy p { font-size: .9375rem; color: var(--zinc-700); }
</style>
