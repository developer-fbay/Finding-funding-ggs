<script setup>
import { Plus, Minus, ArrowRight } from '@lucide/vue'
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
        <details open>
          <summary>Is this a government loan?<span class="toggle" aria-hidden="true"><Plus :size="18" class="plus" /><Minus :size="18" class="minus" /></span></summary>
          <div class="a">
            <p>No. The finance comes from an Accredited Lender, and the government guarantee is given to that lender, not to your business.</p>
            <p>The Scheme provides the Accredited Lender with a 70% government backed guarantee against the outstanding balance of the facility after it has completed its normal recovery process. The borrower always remains 100% liable for the debt.</p>
          </div>
        </details>
        <details>
          <summary>Am I personally liable?<span class="toggle" aria-hidden="true"><Plus :size="18" class="plus" /><Minus :size="18" class="minus" /></span></summary>
          <div class="a">
            <p>The borrower always remains 100% liable for the debt.</p>
            <p>Personal guarantees can be taken at the GGS Accredited Lenders’ discretion, in line with their normal commercial lending practices. Taking security over Principal Private Residences is strictly prohibited within the Scheme though.</p>
          </div>
        </details>
        <details>
          <summary>Can I use it to refinance?<span class="toggle" aria-hidden="true"><Plus :size="18" class="plus" /><Minus :size="18" class="minus" /></span></summary>
          <div class="a">
            <p><mark class="ph" title="Toolkit page 7 (eligibility checklist), not the approved wording on pages 11–12. Codi to OK.">The eligible purposes are working capital, investment and growth, and refinancing existing debt or debt consolidation.</mark></p>
            <p>If you’re thinking about refinancing, we’ll talk it through with you to check it’s the right move for your business before anything goes to a lender.</p>
          </div>
        </details>
        <details>
          <summary>I had a Bounce Back Loan or CBILS. Can I still apply?<span class="toggle" aria-hidden="true"><Plus :size="18" class="plus" /><Minus :size="18" class="minus" /></span></summary>
          <div class="a">
            <p>Businesses that took out a Coronavirus Business Interruption Loan Scheme (CBILS), Coronavirus Large Business Interruption Loan Scheme (CLBILS), Bounce Back Loan Scheme (BBLS) or a Recovery Loan Scheme (RLS) facility before 30 June 2022 are not prevented from accessing the Growth Guarantee Scheme, but borrowing under some of these Schemes may reduce the maximum amount the borrower is eligible for.</p>
          </div>
        </details>
        <details>
          <summary>Does enquiring affect my credit score?<span class="toggle" aria-hidden="true"><Plus :size="18" class="plus" /><Minus :size="18" class="minus" /></span></summary>
          <div class="a">
            <p><mark class="ph" title="Codi to confirm no credit search is run at enquiry stage.">No. Sending an enquiry doesn’t involve a credit search.</mark> If you go on to apply, the lender will carry out its standard credit and fraud checks.</p>
          </div>
        </details>
        <details>
          <summary>Do you charge a fee or earn commission?<span class="toggle" aria-hidden="true"><Plus :size="18" class="plus" /><Minus :size="18" class="minus" /></span></summary>
          <div class="a">
            <p><mark class="ph">[[CODI: do we charge the client anything? Wording for the commission lenders pay us.]]</mark></p>
            <p>If a lender pays us commission, you’ll be told about it before you agree to anything, including how it may affect the total cost of credit.</p>
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
details[open] .toggle { background: var(--ink); color: #fff; }
details[open] .plus { display: none; }
details[open] .minus { display: block; }
.a { padding: 0 56px 24px 0; display: flex; flex-direction: column; gap: 10px; color: var(--zinc-700); }
@media (max-width: 640px) { .a { padding-right: 0; } }
</style>
