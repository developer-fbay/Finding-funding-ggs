<script setup>
// Drop-down holding the British Business Bank's approved wording, word for word,
// under the plain-English summary. Native <details>, so it still works without JS
// and stays searchable (Ctrl+F) and indexable while closed. With JS, opening and
// closing animate the height; reduced-motion users get an instant toggle.
import { ref } from 'vue'
import { ChevronDown, X } from '@lucide/vue'

const props = defineProps({
  label: { type: String, default: 'Official scheme info' },
  context: { type: String, default: '' }, // screen-reader suffix, e.g. the card title
  paras: { type: Array, default: () => [] },
  list: { type: Array, default: () => [] }
})

const DURATION = 320
const EASING = 'cubic-bezier(.22, .61, .36, 1)'

const el = ref(null)
const summary = ref(null)
const body = ref(null)
const expanded = ref(false)
let anim = null

const closeLabel = `Close ${props.label}${props.context ? ': ' + props.context : ''}`
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function finish(open) {
  const d = el.value
  d.open = open
  d.style.overflow = ''
  anim = null
}

function animateTo(open) {
  const d = el.value
  expanded.value = open
  if (reducedMotion() || typeof d.animate !== 'function') { if (anim) anim.cancel(); finish(open); return }
  const start = d.offsetHeight // mid-animation this is the current animated height
  if (anim) anim.cancel()
  d.style.overflow = 'hidden'
  if (open) d.open = true
  const end = open ? d.scrollHeight : summary.value.offsetHeight
  const a = d.animate({ height: [`${start}px`, `${end}px`] }, { duration: DURATION, easing: EASING })
  anim = a
  if (open) body.value.animate({ opacity: [0, 1], transform: ['translateY(-6px)', 'none'] }, { duration: DURATION, easing: EASING })
  a.onfinish = () => { if (anim === a) finish(open) }
  // Safety net: if the browser isn't painting frames (background tab), the finish event
  // never fires, so settle the end state directly.
  setTimeout(() => { if (anim === a) { a.cancel(); finish(open) } }, DURATION + 150)
}

function onSummaryClick(e) {
  e.preventDefault()
  animateTo(!expanded.value)
}

function close() {
  animateTo(false)
  summary.value.focus()
}

// Keep state in step when the browser opens it natively (e.g. find-in-page).
function onToggle() {
  if (!anim) expanded.value = el.value.open
}
</script>

<template>
  <details ref="el" class="read-more" :class="{ expanded }" @toggle="onToggle">
    <summary ref="summary" @click="onSummaryClick">
      <span>{{ label }}<span v-if="context" class="visually-hidden">: {{ context }}</span></span>
      <ChevronDown :size="20" :stroke-width="2" class="chev" aria-hidden="true" />
    </summary>
    <div ref="body" class="body">
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
