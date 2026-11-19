<script setup>
import { Plus, Minus, ArrowRight } from '@lucide/vue'
import { vSmoothDetails } from '../composables/useSmoothDetails.js'
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
          <summary>Is this a government loan?<span class="toggle" aria-hidden="true"><Plus :size="18" class="plus" /><Minus :size="18" class="minus" /></span></summary>
          <div class="a">
            <p>No. The money comes from an Accredited Lender. The government guarantee is for the lender, not your business.</p>
            <p>It covers 70% of what’s still owed, after the lender has tried to recover it. You still owe 100% of the debt.</p>
          </div>
        </details>
        <details v-smooth-details>
          <summary>Am I personally liable?<span class="toggle" aria-hidden="true"><Plus :size="18" class="plus" /><Minus :size="18" class="minus" /></span></summary>
          <div class="a">
            <p>The borrower always owes 100% of the debt.</p>
            <p>A lender may also ask for a personal guarantee, as it would for any business loan. It can’t take your main home as security.</p>
          </div>
        </details>
        <details v-smooth-details>
          <summary>Can I use it to refinance?<span class="toggle" aria-hidden="true"><Plus :size="18" class="plus" /><Minus :size="18" class="minus" /></span></summary>
          <div class="a">
            <p><mark class="ph" title="Toolkit page 7 (eligibility checklist), not the approved wording on pages 11–12. Codi to OK.">Yes. You can use it to refinance or consolidate debt. You can also use it for working capital, or to invest and grow.</mark></p>
            <p>Thinking about refinancing? We’ll talk it through first, to check it’s right for your business.</p>
          </div>
        </details>
        <details v-smooth-details>
          <summary>I had a Bounce Back Loan or CBILS. Can I still apply?<span class="toggle" aria-hidden="true"><Plus :size="18" class="plus" /><Minus :size="18" class="minus" /></span></summary>
          <div class="a">
            <p>Yes, if you took it out before 30 June 2022. The same goes for CLBILS and Recovery Loans.</p>
            <p>But some of that borrowing may lower the most you can borrow under GGS.</p>
          </div>
        </details>
        <details v-smooth-details>
          <summary>Does enquiring affect my credit score?<span class="toggle" aria-hidden="true"><Plus :size="18" class="plus" /><Minus :size="18" class="minus" /></span></summary>
          <div class="a">
            <p><mark class="ph" title="Codi to confirm no credit search is run at enquiry stage.">No. Sending an enquiry doesn’t involve a credit search.</mark> If you go on to apply, the lender will carry out its standard credit and fraud checks.</p>
          </div>
        </details>
        <details v-smooth-details>
          <summary>Do you charge a fee or earn commission?<span class="toggle" aria-hidden="true"><Plus :size="18" class="plus" /><Minus :size="18" class="minus" /></span></summary>
          <div class="a">
            <p><mark class="ph">[[CODI: do we charge the client anything? Wording for the commission lenders pay us.]]</mark></p>
            <p>If a lender pays us commission, we’ll tell you before you agree to anything. That includes how it may affect the total cost.</p>
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
.toggle { flex: none; width: 36px; height: 36px; border-radius: 50%; background: var(--zinc-100); color: var(--ink); display: flex; align-items: center; justify-content: center; transition: background-color .15s; }
.minus { display: none; }
details.expanded .toggle { background: var(--ink); color: #fff; }
details.expanded .plus { display: none; }
details.expanded .minus { display: block; }
.a { padding: 0 56px 24px 0; display: flex; flex-direction: column; gap: 10px; color: var(--zinc-700); }
@media (max-width: 640px) { .a { padding-right: 0; } }
</style>
