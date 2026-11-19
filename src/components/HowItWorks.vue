<script setup>
import { Send, Phone, Handshake, Scale, FileText } from '@lucide/vue'
import towerJpg from '../assets/city-tower-1920.jpg'
import towerWebp1920 from '../assets/city-tower-1920.webp'
import towerWebp960 from '../assets/city-tower-960.webp'

const steps = [
  { icon: Send, title: 'You enquire', text: 'Request a callback. It takes about a minute and needs no documents.' },
  { icon: Phone, title: 'We call to check it fits', text: 'We ask a few questions to check GGS could suit you. If another type of finance would suit you better, we’ll say so.' },
  { icon: Handshake, title: 'We introduce you to an Accredited Lender', text: 'One that offers the type of finance you need.' },
  { icon: Scale, title: 'The lender decides', text: 'Only the lender decides if your business is eligible. The British Business Bank leaves that decision fully to them.', hl: true }
]
const docs = ['Management accounts', 'Business plan', 'Historic accounts', 'Details of assets', 'Details of previous subsidy awards']
</script>

<template>
  <section class="how" aria-labelledby="how-title">
    <picture>
      <source type="image/webp" :srcset="`${towerWebp960} 960w, ${towerWebp1920} 1920w`" sizes="100vw">
      <img class="bg" :src="towerJpg" alt="" aria-hidden="true" loading="lazy" decoding="async" width="1920" height="1280">
    </picture>
    <div class="scrim" aria-hidden="true"></div>
    <div class="wrap inner">
      <div class="section-head">
        <div><h2 id="how-title" class="h2">How it works</h2></div>
        <p>Four steps from enquiry to a lender’s decision. Nothing goes to a lender until we’ve spoken.</p>
      </div>

      <div class="track">
        <div class="route" aria-hidden="true"></div>
        <ol class="steps" role="list">
          <li v-for="(s, i) in steps" :key="s.title" class="step" :class="s.hl ? 'hl' : 'glass'">
            <div class="step-top">
              <span class="num">0{{ i + 1 }}</span>
              <component :is="s.icon" :size="24" class="icon" aria-hidden="true" />
            </div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.text }}</p>
          </li>
        </ol>
      </div>

      <div class="docs glass">
        <p>When you apply, the lender is likely to ask for:</p>
        <ul role="list">
          <li v-for="d in docs" :key="d"><FileText :size="15" class="icon icon-dark" aria-hidden="true" />{{ d }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.how { position: relative; overflow: hidden; background: var(--ink); color: #fff; padding: 80px 0; }
@media (min-width: 960px) { .how { padding: 120px 0; } }
.bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 60%; transform: scale(1.06); }
.scrim { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(10,13,20,.78) 0%, rgba(10,13,20,.55) 50%, rgba(10,13,20,.82) 100%); }
.inner { position: relative; }
.section-head p { color: var(--on-dark); }

.track { position: relative; }
.route { display: none; }
@media (min-width: 1100px) { .route { display: block; position: absolute; left: 40px; right: 40px; top: 47px; border-top: 2px dashed rgba(255,148,114,.7); } }
.steps { position: relative; list-style: none; margin: 0; padding: 0; display: grid; gap: 16px; grid-template-columns: 1fr; }
@media (min-width: 640px) { .steps { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1100px) { .steps { grid-template-columns: repeat(4, 1fr); gap: 24px; } }
.step { border-radius: var(--r-md); padding: 24px; display: flex; flex-direction: column; gap: 12px; }
.step-top { display: flex; justify-content: space-between; align-items: center; }
.num { width: 44px; height: 44px; border-radius: var(--r-sm); display: flex; align-items: center; justify-content: center; font-family: var(--font-head); font-weight: 700; font-size: 1.0625rem; background: var(--coral); color: var(--ink); }
.step .icon { color: var(--coral); }
.step h3 { font-size: 1.3125rem; line-height: 1.2; letter-spacing: -0.02em; margin-top: 8px; }
.step p { font-size: .9375rem; color: #e4e4e7; }
.step.hl {
  background: rgba(255,148,114,.88); border: 1px solid rgba(255,255,255,.35); color: var(--ink);
  -webkit-backdrop-filter: blur(18px) saturate(140%); backdrop-filter: blur(18px) saturate(140%);
  box-shadow: 0 20px 50px -12px rgba(255,148,114,.45);
}
.step.hl .num { background: var(--ink); color: #fff; }
.step.hl .icon, .step.hl p { color: var(--ink); }

.docs { margin-top: 28px; border-radius: var(--r-md); padding: 20px 22px; display: flex; flex-wrap: wrap; align-items: center; gap: 10px 12px; }
.docs p { font-weight: 600; margin-right: 8px; }
.docs ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 10px; }
.docs li { display: inline-flex; align-items: center; gap: 6px; height: 34px; padding: 0 12px; border-radius: 10px; background: rgba(255,255,255,.12); font-size: .875rem; }
</style>
