<script setup>
import { Utensils, Hammer, ShoppingBag } from '@lucide/vue'
// Illustrative examples, not real customers. Label stays visible.
const cases = [
  { icon: Utensils, who: 'A restaurant group', need: '£60,000 to refit a second site before a summer opening.', route: 'Unsecured business loan over 3 years' },
  { icon: Hammer, who: 'A building contractor', need: '£150,000 tied up in invoices on 60-day terms while wages are due weekly.', route: 'Invoice finance on the sales ledger' },
  { icon: ShoppingBag, who: 'An online retailer', need: '£40,000 of stock ahead of Black Friday, repaid from the sales.', route: 'Short-term loan or revolving credit' }
]
</script>

<template>
  <section class="section section-soft" aria-labelledby="ex-title">
    <div class="wrap">
      <div class="section-head">
        <div><p class="eyebrow">Examples</p><h2 id="ex-title" class="h2">What this can look like</h2></div>
        <p>Illustrative examples to show how different needs match different finance. Not real customers, and not an offer.</p>
      </div>
      <div class="grid">
        <article v-for="c in cases" :key="c.who" class="card case">
          <div class="top"><component :is="c.icon" :size="28" class="icon icon-light" aria-hidden="true" /><span class="label">Example</span></div>
          <h3>{{ c.who }}</h3>
          <p>{{ c.need }}</p>
          <p class="route"><span>Likely route</span>{{ c.route }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid { display: grid; gap: 16px; }
@media (min-width: 900px) { .grid { grid-template-columns: repeat(3, 1fr); } }
.case { display: flex; flex-direction: column; gap: 12px; padding: 30px; }
.top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.label { font-size: .75rem; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: var(--zinc-600); padding: 4px 10px; border-radius: 999px; border: 1px solid var(--zinc-200); }
h3 { font-size: 1.25rem; letter-spacing: -0.02em; }
.case > p { font-size: .9375rem; color: var(--zinc-700); }
.route { margin-top: auto !important; padding: 14px 16px; border-radius: var(--r-sm); background: var(--coral-tint); color: var(--ink) !important; font-weight: 600; display: flex; flex-direction: column; gap: 2px; }
.route span { font-size: .75rem; font-weight: 500; color: var(--coral-deep); }
</style>
