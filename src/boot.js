// Loads the cookie banner and Google Tag Manager before the app renders.
// GTM only loads on the live hostnames (or with ?gtm_debug for GTM Preview),
// so preview and localhost visits never reach GA4 or Google Ads.
import { SITE } from './config.js'

const q = new URLSearchParams(location.search)
const host = location.hostname
const onLiveHost = SITE.gtmHosts.some((d) => host === d || host.endsWith('.' + d))

if (SITE.cookieYesId) {
  const c = document.createElement('script')
  c.id = 'cookieyes'
  c.src = `https://cdn-cookieyes.com/client_data/${SITE.cookieYesId}/script.js`
  document.head.appendChild(c)
}

if (SITE.gtmId && (onLiveHost || q.has('gtm_debug'))) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
  const g = document.createElement('script')
  g.async = true
  g.src = `https://www.googletagmanager.com/gtm.js?id=${SITE.gtmId}`
  document.head.appendChild(g)
}
