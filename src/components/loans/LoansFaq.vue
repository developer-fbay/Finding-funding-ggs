<script setup>
import { Plus, Minus, ArrowRight } from '@lucide/vue'
import { vSmoothDetails } from '../../composables/useSmoothDetails.js'
</script>

<template>
  <section id="questions" class="section" aria-labelledby="faq-title">
    <div class="wrap grid">
      <div class="left">
        <p class="eyebrow">Questions</p>
        <h2 id="faq-title" class="h2">Questions, answered</h2>
        <p class="muted">Can’t see yours? Ask us on the call. There’s no obligation.</p>
        <a href="#enquire" class="btn btn-dark">Request a callback <ArrowRight :size="16" :stroke-width="2" aria-hidden="true" /></a>
      </div>

      <div class="faq">
        <details v-smooth-details open>
          <summary>How fast can I get the money?<span class="toggle" aria-hidden="true"><Plus :size="18" class="plus" /><Minus :size="18" class="minus" /></span></summary>
          <div class="a">
            <p>It depends on the type of finance and how quickly the paperwork comes together. Some unsecured loans and asset finance can pay out within days of an application. Larger or secured loans usually take a few weeks.</p>
            <p>On our call we’ll tell you which options are realistic for your timeline.</p>
          </div>
        </details>
        <details v-smooth-details>
          <summary>Will enquiring affect my credit score?<span class="toggle" aria-hidden="true"><Plus :size="18" class="plus" /><Minus :size="18" class="minus" /></span></summary>
          <div class="a">
            <p>No. Sending an enquiry doesn’t involve a credit search. If you go on to apply, the lender will carry out its standard credit and fraud checks.</p>
          </div>
        </details>
        <details v-smooth-details>
          <summary>Can I get a loan with bad credit or existing borrowing?<span class="toggle" aria-hidden="true"><Plus :size="18" class="plus" /><Minus :size="18" class="minus" /></span></summary>
          <div class="a">
            <p>Often, yes. Lenders look at the whole picture, including how the business is trading now. Tell us about it on the call and we’ll look for lenders who are comfortable with your situation. We can’t promise approval; the lender decides.</p>
          </div>
        </details>
        <details v-smooth-details>
          <summary>What documents will I need?<span class="toggle" aria-hidden="true"><Plus :size="18" class="plus" /><Minus :size="18" class="minus" /></span></summary>
          <div class="a">
            <p>Usually recent bank statements and your latest accounts. Larger loans may also need management accounts, a forecast or details of assets. We’ll tell you exactly what your lender wants, so you only gather it once.</p>
          </div>
        </details>
        <details v-smooth-details>
          <summary>Can startups and sole traders apply?<span class="toggle" aria-hidden="true"><Plus :size="18" class="plus" /><Minus :size="18" class="minus" /></span></summary>
          <div class="a">
            <p>It depends on the lender. Each one sets its own rules on how long you need to have been trading and what type of business it lends to.</p>
            <p>Tell us about your business on the call and we’ll tell you what’s realistic.</p>
          </div>
        </details>
        <details v-smooth-details>
          <summary>Do you charge a fee or earn commission?<span class="toggle" aria-hidden="true"><Plus :size="18" class="plus" /><Minus :size="18" class="minus" /></span></summary>
          <div class="a">
            <p>We’ll explain any fees on our call, before you agree to anything.</p>
            <p>If a lender pays us commission, we’ll tell you that too. That includes how it may affect the total cost.</p>
          </div>
        </details>
        <details v-smooth-details>
          <summary>I don’t need it yet. Should I still enquire?<span class="toggle" aria-hidden="true"><Plus :size="18" class="plus" /><Minus :size="18" class="minus" /></span></summary>
          <div class="a">
            <p>Yes. Knowing your options early means you can move fast when you do need it. There’s no obligation to go ahead.</p>
          </div>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid { display: grid; gap: 40px; }
@media (min-width: 960px) { .grid { grid-template-columns: 4fr 8fr; gap: 80px; align-items: start; } .left { position: sticky; top: 32px; } }
.left { display: flex; flex-direction: column; gap: 18px; align-items: flex-start; }
.muted { color: var(--zinc-700); }
details { border-top: 1px solid var(--zinc-200); }
details:last-child { border-bottom: 1px solid var(--zinc-200); }
summary {
  list-style: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 16px;
  padding: 24px 0; font-family: var(--font-head); font-weight: 600; font-size: 1.25rem; letter-spacing: -0.015em; line-height: 1.3;
}
summary::-webkit-details-marker { display: none; }
.toggle { flex: none; width: 36px; height: 36px; border-radius: 50%; background: var(--coral-tint); color: var(--coral-deep); display: flex; align-items: center; justify-content: center; transition: background-color .15s, color .15s; }
summary:hover .toggle { background: #ffe3d8; }
.minus { display: none; }
details.expanded .toggle { background: #ffd4c4; color: var(--ink); }
details.expanded .plus { display: none; }
details.expanded .minus { display: block; }
.a { padding: 0 56px 24px 0; display: flex; flex-direction: column; gap: 10px; color: var(--zinc-700); }
@media (max-width: 640px) { .a { padding-right: 0; } }
</style>
