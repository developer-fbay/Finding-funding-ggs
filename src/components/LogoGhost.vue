<script setup>
// Large ghost of the logo with a dashed "route" climbing the steps.
// Decorative only: always place it where it never sits behind text.
defineProps({
  size: { type: Number, default: 300 },
  stroke: { type: String, default: '#ffd9cc' },
  fill: { type: String, default: '#fff0ea' },
  route: { type: String, default: '#ff9472' },
  strokeWidth: { type: Number, default: 1.5 },
  routeOpacity: { type: Number, default: 0.45 },
  fillOpacity: { type: Number, default: 1 },
  strokeOpacity: { type: Number, default: 1 }
})
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 320 320" fill="none" aria-hidden="true">
    <rect x="20" y="210" width="90" height="90" rx="25" :stroke="stroke" :stroke-width="strokeWidth" :stroke-opacity="strokeOpacity" />
    <rect x="115" y="115" width="90" height="90" rx="25" :stroke="stroke" :stroke-width="strokeWidth" :stroke-opacity="strokeOpacity" />
    <rect x="210" y="20" width="90" height="90" rx="25" :fill="fill" :fill-opacity="fillOpacity" />
    <path d="M65 255H160V160H255V65" :stroke="route" :stroke-width="strokeWidth" stroke-dasharray="2 7" stroke-linecap="round" :stroke-opacity="routeOpacity" />
    <circle cx="65" cy="255" r="4" :fill="route" :fill-opacity="routeOpacity" />
    <circle cx="255" cy="65" r="5" :fill="route" :fill-opacity="Math.min(1, routeOpacity * 1.6)" />
  </svg>
</template>
