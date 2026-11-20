<script setup>
import { Wallet, Package, Truck, TrendingUp, FileClock, Landmark, ArrowRight } from '@lucide/vue'
import LogoGhost from '../LogoGhost.vue'
import { choosePurpose, currentPurpose } from '../../composables/useLeadForm.js'

// Each tile picks the form's "What is this for?" and jumps to the form.
// Ad links can do the same with ?purpose=cashflow|stock|equipment|growth|invoices|tax.
const tiles = [
  { icon: Wallet, value: 'cashflow', title: 'Cash flow', text: 'Cover a gap between paying out and getting paid.' },
  { icon: Package, value: 'stock', title: 'Stock', text: 'Buy ahead of a busy season or take a bulk discount.' },
  { icon: Truck, value: 'equipment', title: 'Equipment or vehicles', text: 'Spread the cost of what you need to work.' },
  { icon: TrendingUp, value: 'growth', title: 'Growth', text: 'Hire, fit out, open a new site or take on a contract.' },
  { icon: FileClock, value: 'invoices', title: 'Unpaid invoices', text: 'Release cash tied up in invoices you’re waiting on.' },
  { icon: Landmark, value: 'tax', title: 'A tax bill', text: 'Spread a VAT or corporation tax bill over months.' }
]

function pick(v) {
  choosePurpose(v)
  const target = document.getElementById('enquire')
  if (!target) return
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  setTimeout(() => document.getElementById('f-full_name')?.focus({ preventScroll: true }), reduce ? 0 : 500)
}
</script>

<template>
  <section id="need" class="section" aria-labelledby="need-title">
    <div class="wrap layout">
      <div class="panel">
        <div class="panel-text">
          <p class="kicker">
            <svg width="12" height="12" viewBox="0 0 9 9" aria-hidden="true"><rect width="9" height="9" rx="2.5" fill="#ff9472" /></svg>
            What do you need it for?
          </p>
          <h2 id="need-title">Start with the job, not the product</h2>
          <p class="sub">Tell us what the money is for and we’ll work out the route to the right finance. Pick one to start your enquiry.</p>
        </div>
        <div class="ghost" aria-hidden="true">
          <LogoGhost :size="250" stroke="#ff9472" fill="#ff9472" route="#ff9472" :stroke-width="2" :stroke-opacity="0.4" :fill-opacity="0.92" :route-opacity="0.75" />
        </div>
      </div>

      <ul class="tiles" role="list">
        <li v-for="(t, i) in tiles" :key="t.value">
          <button type="button" class="tile" :class="{ selected: currentPurpose === t.value }" :aria-pressed="currentPurpose === t.value" @click="pick(t.value)">
            <span class="top">
              <component :is="t.icon" :size="28" class="icon icon-light" aria-hidden="true" />
              <span class="num" aria-hidden="true">0{{ i + 1 }}</span>
            </span>
            <strong>{{ t.title }}</strong>
            <span class="txt">{{ t.text }}</span>
            <span class="go">Start here <ArrowRight :size="16" :stroke-width="2" aria-hidden="true" /></span>
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.layout { display: grid; gap: 16px; }
@media (min-width: 1024px) { .layout { grid-template-columns: 5fr 8fr; } }

/* Dark panel. The logo ghost sits in its own space under the text, never behind it. */
.panel {
  display: flex; flex-direction: column; gap: 24px; padding: 32px 28px; border-radius: var(--r-lg); color: #fff;
  background: radial-gradient(circle at 85% 70%, rgba(255, 148, 114, .2), transparent 60%), var(--ink);
}
@media (min-width: 640px) { .panel { padding: 40px; } }
.panel-text { display: flex; flex-direction: column; gap: 16px; }
.kicker { display: inline-flex; align-items: center; gap: 10px; font-size: .875rem; font-weight: 500; color: #ffd3c4; }
.panel h2 { font-size: clamp(2rem, 1.5rem + 2vw, 3.25rem); line-height: 1; letter-spacing: -0.045em; }
.sub { color: var(--on-dark); font-size: 1.0625rem; line-height: 1.6; max-width: 30em; }
.ghost { display: none; }
@media (min-width: 1024px) {
  .panel { background: radial-gradient(circle at 88% 88%, rgba(255, 148, 114, .2), transparent 50%), var(--ink); }
  .ghost { display: flex; justify-content: flex-end; margin-top: auto; }
}

/* Tiles: two across at every width. */
.tiles { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; grid-template-columns: 1fr 1fr; }
@media (min-width: 640px) { .tiles { gap: 16px; } }
.tile {
  width: 100%; height: 100%; text-align: left; font: inherit; color: var(--ink); cursor: pointer;
  display: flex; flex-direction: column; gap: 8px; padding: 18px; border-radius: var(--r-md);
  background: #fff; border: 1px solid var(--zinc-200);
  transition: background-color .15s, border-color .15s, transform .15s;
}
@media (min-width: 640px) { .tile { padding: 26px; gap: 10px; } }
.tile:hover { background: var(--zinc-100); transform: translateY(-2px); }
.tile.selected { background: var(--coral-tint); border-color: var(--coral); }
.top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
.num { font-size: .8125rem; font-weight: 600; color: var(--zinc-600); font-variant-numeric: tabular-nums; }
strong { font-family: var(--font-head); font-size: 1.1875rem; font-weight: 600; letter-spacing: -0.02em; line-height: 1.2; }
@media (min-width: 640px) { strong { font-size: 1.3125rem; } }
.txt { font-size: .9375rem; color: var(--zinc-700); line-height: 1.5; }
@media (max-width: 419px) { .txt { display: none; } }
.go { margin-top: auto; padding-top: 10px; display: inline-flex; align-items: center; gap: 6px; font-size: .9375rem; font-weight: 600; color: var(--coral-deep); }
.go svg { transition: transform .15s; }
.tile:hover .go svg { transform: translateX(3px); }
@media (prefers-reduced-motion: reduce) { .tile, .go svg { transition: none; } .tile:hover { transform: none; } }
</style>
