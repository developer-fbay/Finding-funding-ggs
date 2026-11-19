<script setup>
import LogoMark from './LogoMark.vue'
defineProps({ size: { type: Number, default: 22 }, tone: { type: String, default: 'light' } })
</script>

<template>
  <span class="brand" :class="tone">
    <LogoMark :size="Math.round(size * 1.35)" :tone="tone" />
    <span class="word" :style="{ fontSize: size + 'px' }">funding<span class="accent">finder</span></span>
  </span>
</template>

<style scoped>
.brand { display: inline-flex; align-items: center; gap: 10px; }
.word { font-family: var(--font-head); font-weight: 700; letter-spacing: -0.045em; line-height: 1; }
.light .word { color: #fff; }
.light .accent { color: var(--coral); }
.dark .word { color: var(--ink); }
.dark .accent { color: var(--coral-deep); }
</style>
