<script setup>
// Drop-down holding the British Business Bank's approved wording, word for word,
// under the plain-English summary. Native <details>, so it still works without JS
// and stays searchable (Ctrl+F) and indexable while closed. Opening and closing are
// animated by the shared smoothDetails helper (same timing as the FAQ).
import { ref } from 'vue'
import { ChevronDown, X } from '@lucide/vue'
import { vSmoothDetails } from '../composables/useSmoothDetails.js'

const props = defineProps({
  label: { type: String, default: 'Official scheme info' },
  context: { type: String, default: '' }, // screen-reader suffix, e.g. the card title
  paras: { type: Array, default: () => [] },
  list: { type: Array, default: () => [] }
})

const el = ref(null)
const summary = ref(null)
const closeLabel = `Close ${props.label}${props.context ? ': ' + props.context : ''}`

function close() {
  el.value._smoothDetails.close()
  summary.value.focus()
}
</script>

<template>
  <details ref="el" v-smooth-details class="read-more">
    <summary ref="summary">
      <span>{{ label }}<span v-if="context" class="visually-hidden">: {{ context }}</span></span>
      <ChevronDown :size="20" :stroke-width="2" class="chev" aria-hidden="true" />
    </summary>
    <div class="body">
      <button type="button" class="close" :aria-label="closeLabel" @click="close">
        <X :size="20" :stroke-width="2" aria-hidden="true" />
      </button>
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
.chev { flex: none; transition: transform .32s cubic-bezier(.22, .61, .36, 1); }
.expanded .chev { transform: rotate(180deg); }

.body {
  display: flow-root; /* contains the floated close button */
  margin-top: 2px; padding: 14px 16px; border-radius: var(--r-sm);
  background: rgba(127, 127, 127, .13); font-size: .875rem; line-height: 1.6;
}
.body p + p, .body p + ul { margin-top: 8px; }
ul { margin: 0; padding-left: 1.1em; display: flex; flex-direction: column; gap: 4px; }

/* Close button: 40px target, floated so the text wraps around it instead of losing width. */
.close {
  float: right; width: 40px; height: 40px; margin: -6px -8px 6px 12px;
  display: inline-flex; align-items: center; justify-content: center;
  border: 0; border-radius: 12px; background: rgba(127, 127, 127, .2); color: inherit;
  cursor: pointer; transition: background-color .15s ease;
}
.close:hover { background: rgba(127, 127, 127, .32); }

@media (prefers-reduced-motion: reduce) {
  .chev, .close { transition: none; }
}
</style>
