<script setup>
// Drop-down holding the British Business Bank's approved wording, word for word,
// under the plain-English summary. Native <details>, so it works without JS and
// stays searchable (Ctrl+F) and indexable while closed.
import { ChevronDown } from '@lucide/vue'

defineProps({
  label: { type: String, default: 'Official scheme wording' },
  context: { type: String, default: '' }, // screen-reader suffix, e.g. the card title
  paras: { type: Array, default: () => [] },
  list: { type: Array, default: () => [] }
})
</script>

<template>
  <details class="read-more">
    <summary>
      <span>{{ label }}<span v-if="context" class="visually-hidden">: {{ context }}</span></span>
      <ChevronDown :size="16" :stroke-width="2" class="chev" aria-hidden="true" />
    </summary>
    <div class="body">
      <p v-for="p in paras" :key="p">{{ p }}</p>
      <ul v-if="list.length" role="list">
        <li v-for="item in list" :key="item">{{ item }}</li>
      </ul>
    </div>
  </details>
</template>

<style scoped>
/* Inherits text colour, so it works on light cards, dark cards and the glass panels. */
.read-more { margin-top: auto; }
summary {
  list-style: none; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;
  min-height: 44px; font-size: .875rem; font-weight: 600;
  text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 3px;
}
summary::-webkit-details-marker { display: none; }
.chev { flex: none; transition: transform .15s ease; }
details[open] .chev { transform: rotate(180deg); }
@media (prefers-reduced-motion: reduce) { .chev { transition: none; } }
.body {
  display: flex; flex-direction: column; gap: 8px; margin-top: 2px; padding: 14px 16px;
  border-radius: var(--r-sm); background: rgba(127, 127, 127, .13);
  font-size: .875rem; line-height: 1.6;
}
ul { margin: 0; padding-left: 1.1em; display: flex; flex-direction: column; gap: 4px; }
</style>
