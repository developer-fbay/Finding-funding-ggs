<script setup>
import { X, Check } from '@lucide/vue'
import { SITE } from '../../config.js'
const bank = [
  'One bank, one set of lending rules',
  'A “no” can leave you starting again',
  'Forms and appointments on their timetable',
  'You chase updates'
]
const us = [
  'A panel of lenders, matched to your case',
  'If one says no, we know who to try next',
  'One call to understand what you need',
  'A named contact who keeps you posted'
]
</script>

<template>
  <section id="why" class="section" aria-labelledby="why-title">
    <div class="wrap">
      <div class="section-head">
        <div><p class="eyebrow">Why use a broker</p><h2 id="why-title" class="h2">One call, not ten applications</h2></div>
        <p>Your bank can only offer what your bank offers. We work with a panel of lenders, so we can look for the one most likely to say yes, at a cost that suits you.</p>
      </div>
      <div class="cols">
        <div class="col bank">
          <h3>Going to your bank</h3>
          <ul role="list"><li v-for="b in bank" :key="b"><X :size="18" class="icon" aria-hidden="true" />{{ b }}</li></ul>
        </div>
        <div class="col us">
          <h3>Going through {{ SITE.brand }}</h3>
          <ul role="list"><li v-for="u in us" :key="u"><Check :size="18" class="icon icon-dark" aria-hidden="true" />{{ u }}</li></ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cols { display: grid; gap: 16px; }
@media (min-width: 860px) { .cols { grid-template-columns: 1fr 1fr; } }
.col { border-radius: var(--r-lg); padding: 32px; display: flex; flex-direction: column; gap: 18px; }
.bank { background: var(--zinc-100); color: var(--zinc-700); }
.us { background: var(--ink); color: #fff; box-shadow: 0 24px 50px -24px rgba(10,13,20,.6); }
h3 { font-size: 1.375rem; letter-spacing: -0.02em; }
.bank h3 { color: var(--ink); }
ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
li { display: flex; gap: 10px; align-items: flex-start; font-size: 1rem; line-height: 1.45; }
li .icon { margin-top: 2px; }
.bank li .icon { color: var(--zinc-500); }
</style>
