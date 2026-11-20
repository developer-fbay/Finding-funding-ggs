<script setup>
import { Banknote, Truck, FileText, Check, Timer } from '@lucide/vue'

// Typical amounts and speeds still need Codi's sign-off before go-live (see README).
const products = [
  {
    icon: Banknote, name: 'Business loans', tag: 'Most asked for',
    text: 'A lump sum repaid over a set term. Unsecured for smaller amounts; secured options for larger ones.',
    amount: '£20k to £2m', speed: 'Days to weeks',
    uses: ['Unsecured and secured loans', 'Short-term and bridging', 'Revolving credit facilities', 'Merchant cash advance']
  },
  {
    icon: Truck, name: 'Asset finance',
    text: 'Spread the cost of equipment or vehicles. The asset itself usually secures the finance.',
    amount: '£20k to £1m+', speed: 'Days',
    uses: ['Hire purchase', 'Leasing', 'Refinance assets you own']
  },
  {
    icon: FileText, name: 'Invoice finance',
    text: 'Borrow against invoices you’ve raised, so you aren’t waiting 30 to 90 days to get paid.',
    amount: 'Based on your sales ledger', speed: 'Days once set up',
    uses: ['Invoice factoring', 'Invoice discounting', 'Single invoice finance']
  }
]
</script>

<template>
  <section id="types" class="section section-soft" aria-labelledby="prod-title">
    <div class="wrap">
      <div class="section-head">
        <div><p class="eyebrow">Types of finance</p><h2 id="prod-title" class="h2">Every type of business finance, one enquiry</h2></div>
        <p>You don’t need to know which you need. We’ll match you to the right type and the right lender on our call.</p>
      </div>
      <div class="grid">
        <article v-for="(p, i) in products" :key="p.name" class="card prod" :class="{ dark: i === 0 }">
          <div class="head">
            <component :is="p.icon" :size="30" class="icon" :class="i === 0 ? 'icon-dark' : 'icon-light'" aria-hidden="true" />
            <span v-if="p.tag" class="tag">{{ p.tag }}</span>
          </div>
          <h3>{{ p.name }}</h3>
          <p class="text">{{ p.text }}</p>
          <dl class="facts">
            <div><dt>Typical amount</dt><dd>{{ p.amount }}</dd></div>
            <div><dt><Timer :size="14" aria-hidden="true" /> Typical speed</dt><dd>{{ p.speed }}</dd></div>
          </dl>
          <ul role="list" class="uses">
            <li v-for="u in p.uses" :key="u"><Check :size="16" class="icon" :class="i === 0 ? 'icon-dark' : 'icon-light'" aria-hidden="true" />{{ u }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid { display: grid; gap: 16px; grid-template-columns: 1fr; }
@media (min-width: 1024px) { .grid { grid-template-columns: 1.15fr 1fr 1fr; } }
.prod { display: flex; flex-direction: column; gap: 14px; padding: 30px; }
.prod.dark { background: var(--ink); color: #fff; }
.head { display: flex; justify-content: space-between; align-items: center; }
.tag { font-size: .8125rem; font-weight: 600; padding: 5px 10px; border-radius: 999px; background: var(--coral); color: var(--ink); }
h3 { font-size: 1.625rem; letter-spacing: -0.03em; margin-top: 6px; }
.text { font-size: .9375rem; color: var(--zinc-700); }
.dark .text { color: var(--on-dark); }
.facts { margin: 4px 0 0; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.facts div { padding: 12px 14px; border-radius: var(--r-sm); background: var(--zinc-100); }
.dark .facts div { background: rgba(255,255,255,.08); }
dt { display: flex; align-items: center; gap: 5px; font-size: .75rem; color: var(--zinc-600); }
.dark dt { color: var(--on-dark); }
dd { margin: 4px 0 0; font-family: var(--font-head); font-weight: 600; font-size: 1.0625rem; letter-spacing: -0.01em; }
.uses { list-style: none; margin: 4px 0 0; padding: 0; display: grid; gap: 8px; }
.uses li { display: flex; gap: 8px; align-items: center; font-size: .9375rem; }
</style>
