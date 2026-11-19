<script setup>
import { onMounted, ref } from 'vue'
import { ArrowRight, PoundSterling, Layers, CircleCheck } from '@lucide/vue'
import BrandLogo from './BrandLogo.vue'
import CallbackForm from './CallbackForm.vue'
import heroJpg from '../assets/hero-city-1920.jpg'
import heroWebp1920 from '../assets/hero-city-1920.webp'
import heroWebp960 from '../assets/hero-city-960.webp'
import heroMp4 from '../assets/hero-city.mp4'
import heroWebm from '../assets/hero-city.webm'
import { SITE } from '../config.js'

// Muted background video (Pexels stock), autoplaying on a loop with no controls.
// WebM (VP9) first, MP4 (H.264) fallback. Skipped for reduced motion, data-saver and
// small screens; the poster still shows instead.
const useVideo = ref(false)
const customVideo = SITE.heroVideo && SITE.heroVideo !== 'off' ? SITE.heroVideo : ''
const videoOn = SITE.heroVideo !== 'off'
onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const saveData = navigator.connection && navigator.connection.saveData
  const wide = window.matchMedia('(min-width: 768px)').matches
  useVideo.value = videoOn && !reduce && !saveData && wide
})
const usps = [
  { icon: PoundSterling, big: 'Up to £2m', small: 'per business group' },
  { icon: Layers, big: '5', small: 'types of finance' },
  { icon: CircleCheck, big: 'No', small: 'obligation to apply' }
]

</script>

<template>
  <section id="top" class="hero">
    <video v-if="useVideo" class="media" :poster="heroWebp1920" autoplay muted loop playsinline preload="auto" aria-hidden="true">
      <source v-if="customVideo" :src="customVideo">
      <template v-else>
        <source :src="heroWebm" type="video/webm">
        <source :src="heroMp4" type="video/mp4">
      </template>
    </video>
    <picture v-else>
      <source type="image/webp" :srcset="`${heroWebp960} 960w, ${heroWebp1920} 1920w`" sizes="100vw">
      <img class="media" :src="heroJpg" alt="" aria-hidden="true" fetchpriority="high" width="1920" height="1080">
    </picture>
    <div class="scrim" aria-hidden="true"></div>

    <div class="wrap inner">
      <header class="header">
        <a href="#top" aria-label="Funding Finder, back to top"><BrandLogo :size="22" /></a>
        <a href="#enquire" class="btn btn-small">Request a callback <ArrowRight :size="16" :stroke-width="2" aria-hidden="true" /></a>
      </header>

      <div class="grid">
        <div class="intro">
          <p class="kicker">
            <svg width="12" height="12" viewBox="0 0 9 9" aria-hidden="true"><rect width="9" height="9" rx="2.5" fill="#ff9472" /></svg>
            Growth Guarantee Scheme · Broker enquiries
          </p>
          <h1>Find your route to <span>Growth Guarantee Scheme</span> finance</h1>
          <p class="lead">The Growth Guarantee Scheme (GGS) helps smaller UK businesses get finance. We check if it could fit you, then introduce you to a lender.</p>
          <ul class="usps" role="list">
            <li v-for="u in usps" :key="u.big" class="usp">
              <component :is="u.icon" :size="26" class="icon icon-dark" aria-hidden="true" />
              <span><strong>{{ u.big }}</strong><small>{{ u.small }}</small></span>
            </li>
          </ul>
        </div>

        <div id="enquire" class="form-col">
          <CallbackForm />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { position: relative; overflow: hidden; background: var(--ink); color: #fff; }
.media { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 50%; }
.scrim { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(10,13,20,.86) 0%, rgba(10,13,20,.72) 45%, var(--ink) 100%); }
@media (min-width: 960px) {
  .scrim { background: linear-gradient(90deg, rgba(10,13,20,.93) 0%, rgba(10,13,20,.74) 48%, rgba(10,13,20,.38) 100%); }
}
.inner { position: relative; }
.header { min-height: 72px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.header > a:first-child { text-decoration: none; }
@media (max-width: 420px) { .header .btn-small { height: 44px; padding: 0 12px; font-size: .8125rem; } }

.grid { display: grid; gap: 28px; padding: 24px 0 56px; }
@media (min-width: 1024px) {
  .grid { grid-template-columns: minmax(0, 1fr) 500px; gap: 56px; padding: 56px 0 96px; align-items: start; }
  .intro { padding-top: 24px; }
}
.intro { display: flex; flex-direction: column; gap: 24px; }
.kicker { display: inline-flex; align-items: center; gap: 10px; font-size: .875rem; font-weight: 500; color: #ffd3c4; }
h1 { font-size: clamp(2.5rem, 1.6rem + 3.4vw, 4.5rem); line-height: .98; letter-spacing: -0.045em; }
h1 span { color: var(--coral); }
.lead { max-width: 34em; font-size: clamp(1rem, .95rem + .3vw, 1.1875rem); color: var(--on-dark); }
.usps { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 10px; }
.usp {
  display: flex; align-items: center; gap: 12px; padding: 12px 16px 12px 14px; border-radius: var(--r-md);
  background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12);
  -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px);
}
.usp span { display: flex; flex-direction: column; line-height: 1.25; }
.usp strong { font-family: var(--font-head); font-size: 1.125rem; letter-spacing: -0.02em; }
.usp small { font-size: .8125rem; color: var(--on-dark); }

.form-col { display: flex; flex-direction: column; gap: 12px; scroll-margin-top: 16px; }
</style>
