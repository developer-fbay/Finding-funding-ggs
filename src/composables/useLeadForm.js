// Callback form logic: same fields, order and messages as lendpoint.co.uk,
// plus hidden tracking fields and a honeypot.
import { reactive, ref, watch } from 'vue'
import { SITE, demoMode } from '../config.js'
import { captureTracking, leadSource, toE164, pushEvent, FORM_ID } from './useTracking.js'

export const PURPOSES = [
  { value: 'cashflow', label: 'Cash flow / working capital' },
  { value: 'growth', label: 'Growth or expansion' },
  { value: 'equipment', label: 'Equipment or vehicles' },
  { value: 'stock', label: 'Buying stock' },
  { value: 'invoices', label: 'Unpaid invoices' },
  { value: 'refinance', label: 'Refinancing what we have' },
  { value: 'property', label: 'Buying or developing property' },
  { value: 'tax', label: 'A tax bill' },
  { value: 'unsure', label: 'Not sure yet' }
]

// Lets other sections (e.g. purpose tiles) pre-pick the form's purpose, and see which is picked.
// The form also reads ?purpose=cashflow from the URL so ads can deep-link.
export const presetPurpose = ref('')
export const currentPurpose = ref('')
export function choosePurpose(value) {
  presetPurpose.value = ''
  presetPurpose.value = value
}

export const MESSAGES = {
  full_name: 'Enter your name.',
  company: 'Enter your company name.',
  email: 'Enter a valid email address.',
  phone: 'Enter a UK phone number.',
  amount: 'Enter £20,000 or more.',
  purpose: 'Pick the closest option.',
  send: 'That didn’t send. Check your connection and try again.'
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Accepts 250000, 250,000, £250k, 1.5m
export function parseAmount(raw) {
  const s = String(raw || '').toLowerCase().replace(/[£,\s]/g, '')
  const m = s.match(/^(\d+(?:\.\d+)?)(k|m)?$/)
  if (!m) return NaN
  let n = parseFloat(m[1])
  if (m[2] === 'k') n *= 1e3
  if (m[2] === 'm') n *= 1e6
  return Math.round(n)
}

function validUkPhone(v) {
  const d = String(v || '').replace(/[^\d+]/g, '')
  if (/^\+44\d{9,10}$/.test(d)) return true
  if (/^44\d{9,10}$/.test(d)) return true
  return /^0\d{9,10}$/.test(d)
}

const RULES = {
  full_name: (v) => v.trim().length >= 2,
  company: (v) => v.trim().length >= 2,
  email: (v) => EMAIL_RE.test(v.trim()),
  phone: (v) => validUkPhone(v),
  amount: (v) => parseAmount(v) >= SITE.minAmount,
  purpose: (v) => !!v
}

export function useLeadForm() {
  const fields = reactive({ full_name: '', company: '', email: '', phone: '', amount: '', purpose: '', website: '' })
  const errors = reactive({})
  const fromUrl = typeof location !== 'undefined' ? new URLSearchParams(location.search).get('purpose') : ''
  if (fromUrl && PURPOSES.some((p) => p.value === fromUrl)) fields.purpose = fromUrl
  // 'sync' so picking the same tile again still applies after the visitor changed the dropdown.
  watch(presetPurpose, (v) => { if (v) { fields.purpose = v; errors.purpose = '' } }, { flush: 'sync' })
  watch(() => fields.purpose, (v) => { currentPurpose.value = v }, { immediate: true })
  const status = ref('idle') // idle | sending | sent | failed
  let startedAt = 0

  function markStarted() { if (!startedAt) startedAt = Date.now() }

  function check(name) {
    errors[name] = RULES[name](fields[name]) ? '' : MESSAGES[name]
    return !errors[name]
  }

  function recheck(name) { if (errors[name]) check(name) }

  function validateAll() {
    let first = null
    Object.keys(RULES).forEach((name) => { if (!check(name) && !first) first = name })
    return first
  }

  function tidyAmount() {
    const n = parseAmount(fields.amount)
    if (n > 0) fields.amount = n.toLocaleString('en-GB')
  }

  async function send(payload) {
    if (demoMode) {
      console.info('[GGS form] Demo mode: nothing sent. Payload:', payload)
      await new Promise((r) => setTimeout(r, 700))
      return
    }
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 15000)
    try {
      const res = await fetch(SITE.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: ctrl.signal
      })
      if (!res.ok) throw new Error('HTTP ' + res.status)
      const body = await res.json().catch(() => ({}))
      if (body && body.ok === false) throw new Error('Rejected')
    } finally {
      clearTimeout(timer)
    }
  }

  async function submit() {
    if (status.value === 'sending') return null
    const firstBad = validateAll()
    if (firstBad) return firstBad

    const tracking = captureTracking()
    const payload = {
      form_id: FORM_ID,
      brand: SITE.brand,
      full_name: fields.full_name.trim(),
      company: fields.company.trim(),
      email: fields.email.trim(),
      phone: fields.phone.trim(),
      amount: parseAmount(fields.amount),
      purpose: fields.purpose,
      purpose_label: (PURPOSES.find((p) => p.value === fields.purpose) || {}).label || '',
      website: fields.website, // honeypot: people never see or fill this
      ...tracking,
      lead_source: leadSource(tracking),
      fill_seconds: startedAt ? Math.round((Date.now() - startedAt) / 1000) : null,
      submitted_at: new Date().toISOString()
    }

    // Spam trap filled: behave as if it worked, send nothing, track nothing.
    if (payload.website) { status.value = 'sent'; return null }

    status.value = 'sending'
    try {
      await send(payload)
      pushEvent({
        event: 'ggs_form_submitted',
        form_id: FORM_ID,
        form_page: window.location.pathname,
        lead_source: payload.lead_source,
        purpose: payload.purpose,
        user_data: { email: payload.email.toLowerCase(), phone_number: toE164(payload.phone) }
      })
      status.value = 'sent'
    } catch (e) {
      status.value = 'failed'
    }
    return null
  }

  return { fields, errors, status, markStarted, check, recheck, tidyAmount, submit }
}
