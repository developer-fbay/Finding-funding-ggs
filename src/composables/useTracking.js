// Tracking helpers. Campaign tags come from the URL (no cookies), so a lead keeps
// its source even when the visitor rejects cookies.
import { SITE, demoMode } from '../config.js'

export const TRACK_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'gbraid', 'wbraid', 'gad_source']

export function captureTracking() {
  const q = new URLSearchParams(window.location.search)
  const t = {}
  TRACK_PARAMS.forEach((k) => { t[k] = (q.get(k) || '').slice(0, 300) })
  t.landing_page = window.location.href.slice(0, 2000)
  t.referrer = (document.referrer || '').slice(0, 2000)
  return t
}

export function leadSource(t) {
  if (t.gclid || t.gbraid || t.wbraid || t.gad_source) return 'PPC'
  if ((t.utm_medium || '').toLowerCase() === 'email') return 'Email'
  return 'Web Inbound'
}

export function toE164(phone) {
  const p = String(phone || '').replace(/[^\d+]/g, '')
  if (p.startsWith('+')) return p
  if (p.startsWith('44')) return '+' + p
  if (p.startsWith('0')) return '+44' + p.slice(1)
  return p
}

export function pushEvent(obj) {
  // Never record a conversion in demo mode.
  if (demoMode && obj.event === 'ggs_form_submitted') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(obj)
}

export const FORM_ID = SITE.formId
