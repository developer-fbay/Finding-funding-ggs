<script setup>
import { ShieldCheck, ArrowRight } from '@lucide/vue'
import LogoGhost from './LogoGhost.vue'
</script>

<template>
  <section class="wrap cta-wrap" aria-labelledby="cta-title">
    <div class="cta">
      <div class="text">
        <h2 id="cta-title">See if GGS could fit your business</h2>
        <p><ShieldCheck :size="18" class="icon" aria-hidden="true" />Won’t trigger a credit check. No obligation.</p>
        <a href="#enquire" class="btn btn-dark">Request a callback <ArrowRight :size="18" :stroke-width="2" aria-hidden="true" /></a>
      </div>
      <div class="ghost"><LogoGhost :size="340" stroke="#0a0d14" fill="#0a0d14" route="#0a0d14" :stroke-width="2" :route-opacity="0.5" :fill-opacity="0.92" :stroke-opacity="0.35" /></div>
    </div>
  </section>
</template>

<style scoped>
.cta-wrap { padding-top: 8px; padding-bottom: 72px; }
@media (min-width: 960px) { .cta-wrap { padding-bottom: 96px; } }
.cta { position: relative; overflow: hidden; border-radius: var(--r-lg); background: var(--coral); color: var(--ink); display: flex; align-items: center; justify-content: space-between; gap: 32px; padding: 40px 24px; }
@media (min-width: 760px) { .cta { padding: 72px 64px; } }
.text { display: flex; flex-direction: column; gap: 18px; align-items: flex-start; max-width: 640px; }
h2 { font-size: clamp(2.25rem, 1.5rem + 3vw, 3.75rem); line-height: 1; letter-spacing: -0.045em; }
.text p { display: flex; align-items: center; gap: 8px; font-size: 1.0625rem; }
.ghost { display: none; margin: -40px -20px -60px 0; }
@media (min-width: 960px) { .ghost { display: flex; } }
</style>
