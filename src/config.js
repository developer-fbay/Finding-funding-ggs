// Everything that changes per environment comes from .env (see .env.example).
const env = import.meta.env

export const SITE = {
  brand: 'Funding Finder',
  formId: 'ggs_onepager',
  webhookUrl: env.VITE_WEBHOOK_URL || '',
  gtmId: env.VITE_GTM_ID || '',
  gtmHosts: (env.VITE_GTM_HOSTS || '').split(',').map((h) => h.trim()).filter(Boolean),
  cookieYesId: env.VITE_COOKIEYES_ID || '',
  heroVideo: env.VITE_HERO_VIDEO || '',
  minAmount: 20000
}

export const demoMode = !SITE.webhookUrl
