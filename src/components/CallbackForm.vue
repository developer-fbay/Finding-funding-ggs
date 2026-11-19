<script setup>
import { nextTick, ref } from 'vue'
import { Clock, Phone, ShieldCheck, ArrowRight, ChevronDown, CircleAlert, CircleCheck } from '@lucide/vue'
import { useLeadForm, PURPOSES, MESSAGES } from '../composables/useLeadForm.js'

const { fields, errors, status, markStarted, check, recheck, tidyAmount, submit } = useLeadForm()

// On blur, only flag a field the visitor has typed in (or one already flagged).
// Empty fields are checked when they press the button.
function soft(name) {
  if (String(fields[name] || '').trim() || errors[name]) check(name)
}
const formEl = ref(null)
const resultTitle = ref(null)
const sendError = ref(null)

const TEXT_FIELDS = [
  { name: 'full_name', label: 'Full name', type: 'text', autocomplete: 'name' },
  { name: 'company', label: 'Company', type: 'text', autocomplete: 'organization' },
  { name: 'email', label: 'Business email', type: 'email', autocomplete: 'email', placeholder: 'you@company.co.uk', inputmode: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel', autocomplete: 'tel', placeholder: '07700 900123', inputmode: 'tel' }
]

async function onSubmit() {
  const firstBad = await submit()
  if (firstBad) {
    await nextTick()
    formEl.value?.querySelector(`[name="${firstBad}"]`)?.focus()
    return
  }
  await nextTick()
  if (status.value === 'sent') resultTitle.value?.focus()
  if (status.value === 'failed') sendError.value?.focus()
}
</script>

<template>
  <div class="form-card" aria-live="polite">
    <!-- Success -->
    <div v-if="status === 'sent'" class="result">
      <CircleCheck :size="40" class="icon icon-light" aria-hidden="true" />
      <h2 ref="resultTitle" tabindex="-1">Thanks. We’ll call you within one working day.</h2>
      <ol class="next-steps">
        <li><span class="num">1</span><span>Your adviser reads the enquiry and works out which lenders are worth approaching.</span></li>
        <li><span class="num">2</span><span>They’ll call or email to confirm a couple of details and give you a realistic range.</span></li>
        <li><span class="num hl">3</span><span>If you want to go ahead, we introduce you to the lenders that fit. You deal with them directly and decide at your own pace.</span></li>
      </ol>
    </div>

    <!-- Form -->
    <form v-else ref="formEl" novalidate @submit.prevent="onSubmit" @focusin="markStarted" :aria-busy="status === 'sending'">
      <div class="form-head">
        <div>
          <h2 id="form-title">Request a callback</h2>
          <p class="sub"><Clock :size="15" class="icon" aria-hidden="true" />1 minute, no documents</p>
        </div>
        <Phone :size="26" class="icon icon-light" aria-hidden="true" />
      </div>

      <div class="grid">
        <div v-for="f in TEXT_FIELDS" :key="f.name" class="field-wrap">
          <div class="field" :class="{ invalid: errors[f.name] }">
            <label :for="'f-' + f.name">{{ f.label }}</label>
            <input
              :id="'f-' + f.name" :name="f.name" :type="f.type" :autocomplete="f.autocomplete"
              :placeholder="f.placeholder" :inputmode="f.inputmode"
              v-model="fields[f.name]"
              :aria-invalid="errors[f.name] ? 'true' : 'false'"
              :aria-describedby="errors[f.name] ? 'e-' + f.name : undefined"
              @blur="soft(f.name)" @input="recheck(f.name)"
            >
          </div>
          <p v-if="errors[f.name]" :id="'e-' + f.name" class="error"><CircleAlert :size="15" class="icon" aria-hidden="true" />{{ errors[f.name] }}</p>
        </div>

        <div class="field-wrap">
          <div class="field" :class="{ invalid: errors.amount }">
            <label for="f-amount">Roughly how much?</label>
            <span class="prefix" aria-hidden="true">£</span>
              <input id="f-amount" class="has-prefix" name="amount" type="text" inputmode="numeric" autocomplete="off" placeholder="e.g. 250,000"
                v-model="fields.amount" :aria-invalid="errors.amount ? 'true' : 'false'"
                :aria-describedby="errors.amount ? 'e-amount' : undefined"
                @blur="tidyAmount(); soft('amount')" @input="recheck('amount')">
          </div>
          <p v-if="errors.amount" id="e-amount" class="error"><CircleAlert :size="15" class="icon" aria-hidden="true" />{{ errors.amount }}</p>
        </div>

        <div class="field-wrap">
          <div class="field select" :class="{ invalid: errors.purpose, empty: !fields.purpose }">
            <label for="f-purpose">What is this for?</label>
            <select id="f-purpose" name="purpose" v-model="fields.purpose"
              :aria-invalid="errors.purpose ? 'true' : 'false'"
              :aria-describedby="errors.purpose ? 'e-purpose' : undefined"
              @change="check('purpose')">
              <option value="" disabled>Choose one</option>
              <option v-for="p in PURPOSES" :key="p.value" :value="p.value">{{ p.label }}</option>
            </select>
            <ChevronDown :size="18" class="icon chev" aria-hidden="true" />
          </div>
          <p v-if="errors.purpose" id="e-purpose" class="error"><CircleAlert :size="15" class="icon" aria-hidden="true" />{{ errors.purpose }}</p>
        </div>
      </div>

      <!-- Honeypot, as on Lendpoint: hidden from people, catches bots -->
      <div class="hp" aria-hidden="true">
        <label for="f-website">Website</label>
        <input id="f-website" name="website" type="text" tabindex="-1" autocomplete="off" v-model="fields.website">
      </div>

      <p class="note"><ShieldCheck :size="17" class="icon icon-light" aria-hidden="true" />Won’t trigger a credit check. No obligation.</p>

      <button type="submit" class="btn submit" :disabled="status === 'sending'">
        {{ status === 'sending' ? 'Sending…' : 'Request a callback' }}
        <ArrowRight v-if="status !== 'sending'" :size="18" :stroke-width="2" aria-hidden="true" />
      </button>

      <p v-if="status === 'failed'" ref="sendError" class="send-error" role="alert" tabindex="-1">
        <CircleAlert :size="18" class="icon" aria-hidden="true" />{{ MESSAGES.send }}
      </p>

      <p class="privacy">We use your details to handle your enquiry.</p>
    </form>
  </div>
</template>

<style scoped>
.form-card { background: #fff; color: var(--ink); border-radius: var(--r-lg); padding: 22px 18px; box-shadow: var(--shadow-form); scroll-margin-top: 24px; }
@media (min-width: 480px) { .form-card { padding: 28px; } }
form { display: flex; flex-direction: column; gap: 14px; }
.form-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
.form-head h2 { font-size: 1.625rem; letter-spacing: -0.03em; line-height: 1.15; }
.sub { display: flex; align-items: center; gap: 6px; font-size: .875rem; color: var(--zinc-500); margin-top: 2px; }

.grid { display: grid; gap: 10px; grid-template-columns: 1fr; }
@media (min-width: 560px) { .grid { grid-template-columns: 1fr 1fr; } }

/* HeroUI-style filled field, label inside.
   The input/select fills the whole field, so a click anywhere on it focuses the input
   or opens the dropdown. The label and £ sit on top and let clicks pass through. */
.field {
  position: relative; height: 58px; border-radius: var(--r-sm); background: var(--zinc-100);
  transition: background-color .12s ease, box-shadow .12s ease;
}
.field:hover { background: var(--zinc-150); }
.field:focus-within { background: var(--zinc-150); box-shadow: inset 0 0 0 2px var(--coral); }
.field label {
  position: absolute; left: 14px; top: 9px; pointer-events: none;
  font-size: .75rem; font-weight: 500; color: var(--zinc-600); line-height: 1.3;
}
.field input, .field select {
  position: absolute; inset: 0; width: 100%; height: 100%; margin: 0; border: 0; outline: none;
  padding: 25px 14px 7px; border-radius: inherit; background: transparent;
  font: inherit; font-size: 1rem; line-height: 1.5; color: var(--ink);
}
.field input::placeholder { color: #a1a1aa; }
.field input.has-prefix { padding-left: 28px; }
.prefix { position: absolute; left: 14px; top: 25px; line-height: 1.5; color: var(--zinc-500); pointer-events: none; }
.select select { appearance: none; -webkit-appearance: none; cursor: pointer; padding-right: 42px; }
.select.empty select { color: #a1a1aa; }
.select select option { color: var(--ink); }
.chev { position: absolute; right: 14px; top: 20px; color: var(--zinc-500); pointer-events: none; }
.field.invalid { background: var(--danger-tint); box-shadow: inset 0 0 0 2px var(--danger-ring); }
.field.invalid label { color: var(--danger); }
.field.invalid .chev, .field.invalid .prefix { color: var(--danger); }
.error { display: flex; align-items: center; gap: 6px; margin: 6px 0 0 4px; font-size: .8125rem; font-weight: 500; color: var(--danger); }

.hp { position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden; }

.note { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-radius: 12px; background: var(--zinc-100); font-size: .875rem; color: var(--zinc-700); }
.submit { width: 100%; }
.send-error { display: flex; gap: 10px; align-items: flex-start; padding: 12px 14px; border-radius: 12px; background: #fdecea; color: #8a1c12; font-size: .875rem; font-weight: 500; }
.send-error .icon { color: var(--danger); margin-top: 1px; }
.privacy { font-size: .8125rem; text-align: center; color: var(--zinc-500); }

.result { display: flex; flex-direction: column; gap: 16px; padding: 4px 0; }
.result h2 { font-size: 1.75rem; line-height: 1.1; letter-spacing: -0.03em; }
.next-steps { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
.next-steps li { display: flex; gap: 12px; font-size: .9375rem; }
.num { flex: none; width: 28px; height: 28px; border-radius: 8px; background: var(--ink); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: .875rem; }
.num.hl { background: var(--coral); color: var(--ink); }
</style>
