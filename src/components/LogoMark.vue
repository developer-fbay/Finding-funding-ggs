<script setup>
// The step-tiles mark: two tiles climbing to a coral one.
defineProps({ size: { type: Number, default: 30 }, tone: { type: String, default: 'light' } })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 32 32" aria-hidden="true">
    <rect x="2" y="21" width="9" height="9" rx="2.5" :fill="tone === 'light' ? '#ffffff' : '#0a0d14'" />
    <rect x="11.5" y="11.5" width="9" height="9" rx="2.5" :fill="tone === 'light' ? '#ffffff' : '#0a0d14'" />
    <rect x="21" y="2" width="9" height="9" rx="2.5" fill="#ff9472" />
  </svg>
</template>
