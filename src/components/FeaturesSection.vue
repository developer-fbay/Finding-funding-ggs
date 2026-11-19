<script setup>
import { PoundSterling, Layers, CalendarRange, History, Percent, UserRound, Building2, Scale } from '@lucide/vue'
import cityJpg from '../assets/city-underground-1200.jpg'
import cityWebp1200 from '../assets/city-underground-1200.webp'
import cityWebp800 from '../assets/city-underground-800.webp'

const weigh = [
  { icon: Percent, title: 'Pricing', text: 'Interest rates and fees charged by Accredited Lenders will vary and will depend on the specific lending proposal. The Accredited Lender’s pricing will take into account the benefit of the Government guarantee and a fee that is charged to the Accredited Lender for the guarantee.' },
  { icon: UserRound, title: 'Personal Guarantees', text: 'Personal guarantees can be taken at the GGS Accredited Lenders’ discretion, in line with their normal commercial lending practices. Taking security over Principal Private Residences is strictly prohibited within the Scheme though.' },
  { icon: Building2, title: 'Guarantee is to the Accredited lender', text: 'The Scheme provides the Accredited Lender with a 70% government backed guarantee against the outstanding balance of the facility after it has completed its normal recovery process. The borrower always remains 100% liable for the debt.' },
  { icon: Scale, title: 'Decision making delegated to the GGS Accredited Lenders', text: 'Growth Guarantee Scheme-backed facilities are provided at the discretion of the Accredited Lender. GGS accredited lenders are required to undertake standard credit and fraud checks for all applicants.' }
]
</script>

<template>
  <section class="section features" aria-labelledby="features-title">
    <div class="wrap">
      <div class="section-head">
        <div><h2 id="features-title" class="h2">Key features</h2></div>
        <p class="source">Scheme details: British Business Bank approved wording.</p>
      </div>

      <div class="bento">
        <article class="photo">
          <picture>
            <source type="image/webp" :srcset="`${cityWebp800} 800w, ${cityWebp1200} 1200w`" sizes="(min-width: 1100px) 420px, (min-width: 760px) 50vw, 100vw">
            <img :src="cityJpg" alt="London Underground sign on a stone building in the City of London" loading="lazy" decoding="async" width="1200" height="800">
          </picture>
          <div class="fade" aria-hidden="true"></div>
          <div class="photo-body">
            <PoundSterling :size="28" class="icon icon-dark" aria-hidden="true" />
            <h3>Up to £2m per business group</h3>
            <p>The maximum amount for a facility provided under the scheme is generally £2m per business group for borrowers outside the scope of the Northern Ireland Protocol, and up to £1m in accordance with the relevant legal agreement(s) per business group for Northern Ireland Protocol borrowers. Minimum facility sizes vary, starting at £1,000 for asset finance, invoice finance and asset-based lending, and £25,001 for term loans and overdrafts.</p>
          </div>
        </article>
        <article class="card tile">
          <Layers :size="28" class="icon icon-light" aria-hidden="true" />
          <h3>Wide range of products</h3>
          <p>The Growth Guarantee Scheme supports term loans, overdrafts, asset finance, invoice finance, and asset-based lending facilities.</p>
          <p class="small">Not all Accredited lenders will be able to offer all products.</p>
        </article>
        <article class="card tile">
          <CalendarRange :size="28" class="icon icon-light" aria-hidden="true" />
          <h3>Term length</h3>
          <p>Term loans and asset finance facilities are available from three months up to six years, with overdrafts, invoice finance and asset-based lending available from three months up to three years.</p>
        </article>
        <article class="tile tint wide">
          <History :size="28" class="icon icon-light" aria-hidden="true" />
          <h3>Access to multiple schemes</h3>
          <p>Businesses that took out a Coronavirus Business Interruption Loan Scheme (CBILS), Coronavirus Large Business Interruption Loan Scheme (CLBILS), Bounce Back Loan Scheme (BBLS) or a Recovery Loan Scheme (RLS) facility before 30 June 2022 are not prevented from accessing the Growth Guarantee Scheme, but borrowing under some of these Schemes may reduce the maximum amount the borrower is eligible for.</p>
        </article>
      </div>

      <div class="weigh">
        <h3 class="weigh-title">And what to <span>weigh up</span></h3>
        <div class="weigh-grid">
          <div v-for="w in weigh" :key="w.title" class="weigh-card">
            <component :is="w.icon" :size="28" class="icon icon-dark" aria-hidden="true" />
            <p class="wt">{{ w.title }}</p>
            <p class="wb">{{ w.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features { padding-top: 0; }
.source { font-size: .9375rem; color: var(--zinc-500); }
.bento { display: grid; gap: 16px; grid-template-columns: 1fr; }
@media (min-width: 760px) { .bento { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1100px) { .bento { grid-template-columns: repeat(3, 1fr); } .photo { grid-row: span 2; } .wide { grid-column: span 2; } }
.tile { display: flex; flex-direction: column; gap: 12px; padding: 28px; border-radius: var(--r-lg); }
.tile h3, .photo h3 { font-size: 1.375rem; letter-spacing: -0.02em; line-height: 1.2; margin-top: 4px; }
.tile p { font-size: .9375rem; color: var(--zinc-700); }
.tile .small { font-size: .875rem; color: var(--zinc-500); }
.tint { background: var(--coral-tint); }
.photo { position: relative; overflow: hidden; min-height: 460px; border-radius: var(--r-lg); background: var(--ink); color: #fff; display: flex; flex-direction: column; justify-content: flex-end; }
.photo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.fade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(10,13,20,0) 0%, rgba(10,13,20,.25) 40%, rgba(10,13,20,.6) 100%); }
.photo-body {
  position: relative; margin: 12px; padding: 22px; border-radius: var(--r-md);
  display: flex; flex-direction: column; gap: 10px;
  /* Frosted glass: the photo shows through, blurred. Light sheen on top; the .6 dark tint keeps
     white text at 5:1 or better over the brightest part of this photo (checked at phone, tablet, desktop). */
  background: linear-gradient(180deg, rgba(255,255,255,.08) 0%, rgba(255,255,255,.02) 100%), rgba(10,13,20,.6);
  border: 1px solid rgba(255,255,255,.22);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.18), 0 8px 32px rgba(10,13,20,.25);
  -webkit-backdrop-filter: blur(22px) saturate(160%); backdrop-filter: blur(22px) saturate(160%);
}
/* No blur support: fall back to the solid dark panel so the text stays readable. */
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .photo-body { background: rgba(10,13,20,.86); }
}
.photo-body p { font-size: 1rem; line-height: 1.65; font-weight: 450; color: #ffffff; }
.photo-body h3 { color: #ffffff; }

.weigh { margin-top: 16px; border-radius: var(--r-lg); background: var(--ink); color: #fff; padding: 28px 22px; display: flex; flex-direction: column; gap: 24px; }
@media (min-width: 760px) { .weigh { padding: 44px; } }
.weigh-title { font-size: clamp(1.75rem, 1.4rem + 1.2vw, 2.125rem); letter-spacing: -0.035em; }
.weigh-title span { color: var(--coral); }
.weigh-grid { display: grid; gap: 14px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
.weigh-card { border-radius: var(--r-md); border: 1px solid rgba(255,255,255,.14); padding: 22px; display: flex; flex-direction: column; gap: 10px; }
.wt { font-weight: 600; margin-top: 4px; }
.wb { font-size: .875rem; color: var(--on-dark); }
</style>
