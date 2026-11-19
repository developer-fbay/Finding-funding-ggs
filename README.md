# Finding Funding · GGS one-pager (Vue)

A one-page lead capture site about the Growth Guarantee Scheme (GGS), plus a privacy policy page.
Built with **Vue 3 + Vite**, **Lucide** icons (`@lucide/vue`) and self-hosted **Inter / Inter Tight** fonts.
The build is plain static files, so it can be hosted anywhere (Cloudflare Pages recommended).

Design source: the "Final one-pager" page on the GGS design canvas (HeroUI-style components, coral `#FF9472` on ink `#0A0D14`, step-tiles logo).

## Run it

You need Node.js 20 or newer.

```bash
npm install
npm run dev        # local preview at http://localhost:5173
npm run build      # production files in dist/
npm run preview    # serve the built dist/ locally
```

Test tracking with a URL like `http://localhost:5173/?utm_source=test&utm_medium=email&gclid=TEST123`.

## Local-only folders

`planning/` (brief, plan, tracking spec, toolkit) and `design/` (canvas renders and source) sit in this folder for reference but are listed in `.gitignore`, so they are never pushed to GitHub. `dist/` and `node_modules/` are ignored too.

## Settings (.env)

Copy `.env.example` to `.env`. Everything is optional; with nothing set the page runs in **demo mode** (the form validates and shows the success screen, but nothing is sent and no conversion fires).

| Variable | What it does |
|---|---|
| `VITE_WEBHOOK_URL` | n8n webhook the form POSTs JSON to |
| `VITE_GTM_ID` | Google Tag Manager container |
| `VITE_GTM_HOSTS` | Live hostnames (comma-separated). GTM only loads there, or with `?gtm_debug` |
| `VITE_COOKIEYES_ID` | CookieYes site key (adds the banner and the "Cookie settings" link) |
| `VITE_HERO_VIDEO` | Optional muted background video for the hero (photo is the poster/fallback) |

Settings are baked in at build time, so rebuild after changing `.env`.

## Structure

```
index.html, privacy.html     the two pages (nothing else, per the brief)
src/config.js                reads .env
src/boot.js                  CookieYes + GTM loader (host-gated)
src/composables/useLeadForm.js   form fields, Lendpoint messages, validation, send
src/composables/useTracking.js   UTM/gclid capture, lead source, dataLayer
src/components/              one component per page section
src/styles/base.css          tokens: colours, corner scale, shadows, buttons
src/assets/                  photos (see "Images" below)
```

## The form

Matches lendpoint.co.uk's live form (checked 18 Nov 2026): one step, same fields and order, same purpose list, same messages.

- Fields: Full name, Company, Business email, Phone (UK), Roughly how much? (min £20,000), What is this for?
- "Website" is a **hidden honeypot**, exactly as on Lendpoint. People never see it; if a bot fills it, the page shows success but sends nothing.
- Hidden tracking: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`, `gbraid`, `wbraid`, `gad_source`, `landing_page`, `referrer`. Read from the URL, no cookies.
- Payload also carries `lead_source` (PPC / Email / Web Inbound), `purpose_label`, `fill_seconds` (spam signal), `submitted_at`.
- The webhook should reply `200` with `{ "ok": true }` once the lead is stored.

### dataLayer

Pushed **once, only after the webhook confirms**, never in demo mode or for the honeypot:

```js
{ event: 'ggs_form_submitted', form_id: 'ggs_onepager', form_page: '/', lead_source: 'PPC',
  purpose: 'growth', user_data: { email: '…', phone_number: '+447700900123' } }
```

Change from the earlier two-step build: there is no `ggs_fit` any more (the form no longer asks eligibility questions; that check happens on the callback) and no `ggs_form_step` event. See planning/TRACKING-SPEC.md (updated for the single-step form).

## Images and video

Free-licence stock (no credit required), compressed for the web. Every image ships as **WebP** in two widths (served with `srcset`, so phones get the small one) plus a **JPG fallback**. The hero video ships as **WebM (VP9)** with an **MP4 (H.264, faststart)** fallback, no audio.

| File(s) | Used in | Source |
|---|---|---|
| `hero-city.webm` (2.1 MB), `hero-city.mp4` (2.4 MB) | Hero background loop (15s, 1600px, 30fps) | Pexels video 14089090, Canary Wharf riverside |
| `hero-city-1920.webp`, `-960.webp`, `-1920.jpg` | Hero poster / fallback | Frame from the hero video |
| `city-underground-1200.webp`, `-800.webp`, `-1200.jpg` | "Up to £2m" feature tile | Unsplash photo-1568649704650 |
| `city-tower-1920.webp`, `-960.webp`, `-1920.jpg` | "How it works" background | Unsplash photo-1768586429849 |

The video plays only on screens 768px and wider, never with reduced motion or data saver on; otherwise the poster shows. `VITE_HERO_VIDEO=off` = photo only; a URL = use that video.

How the files were made (re-run if you swap media):

```bash
# video: trim to a 15s loop, 1080p, no audio
ffmpeg -i source.mp4 -t 15 -an -vf "scale=1600:-2,fps=30" -c:v libx264 -crf 31 -preset slow -pix_fmt yuv420p -movflags +faststart src/assets/hero-city.mp4
ffmpeg -i src/assets/hero-city.mp4 -an -c:v libvpx-vp9 -b:v 900k -maxrate 1200k -row-mt 1 src/assets/hero-city.webm
# poster frame
ffmpeg -ss 2 -i src/assets/hero-city.mp4 -frames:v 1 poster.png
# images: WebP 1920/960 (or 1200/800) at quality ~78, JPG fallback at ~80
```

Unused older files you can delete: `src/assets/hero-city.jpg`, `city-underground.jpg`, `city-tower.jpg`.

## Copy and reading level

The aim is an easy read: short sentences, everyday words, all the vital facts. Target **Hemingway grade 9 or lower** for everything visible (Hemingway's grade is the Automated Readability Index).

- **Plain English on show, official wording one click away.** Each scheme fact is written in plain English. The British Business Bank's approved wording (toolkit pages 11–12) sits word for word underneath in an **"Official scheme info"** drop-down (`src/components/ReadMore.vue`, a native `<details>`, so it works without JavaScript and stays searchable). It opens and closes with a 320ms height animation (instant for reduced-motion users) and has an X button to close it.
- **Risk points stay visible, never only in a drop-down:** you still owe 100%, interest and fees vary, personal guarantees may be taken, the lender decides (toolkit page 10).
- **Footer** follows lendpoint.co.uk's layout: brand and one-line description, two link columns, a bottom bar with copyright and "Broker, not a lender". The toolkit's optional legal notice (page 13) is no longer shown.
- **FAQ answers and drop-downs** share one animation helper (`src/composables/useSmoothDetails.js`): 320ms height slide and fade, instant with reduced motion.
- To check a section: paste its visible text (not the drop-down text) into [hemingwayapp.com](https://hemingwayapp.com).

Scores on 19 Nov 2026 (visible text): hero 7, what GGS is 4, key features 6, who can apply 7.5, how it works 5, questions 3. Before the rewrite: 11, 12, 16.5, 14, 7, 8.5.

## Before go-live

- [x] Name: **Finding Funding** (changed from Funding Finder on 19 Nov 2026). Domain: finding-funding.co.uk, where to host it still to decide.
- [ ] Toolkit page 10 requires the firm's registered name and address to be shown clearly. The footer no longer shows them. Companies House lists FINDING FUNDING LTD (12383309, Beverley); confirm that's the firm behind this page and add one line to the footer.
- [x] Review copy cleaned (19 Nov 2026): all yellow `[[…]]` placeholders and "Codi to OK" highlights removed so the CEO can review the page as it would look live. The items below still need sign-off.
- [ ] FAQ "Do you charge a fee or earn commission?": the answer now says we'll explain any fees on the call. Confirm whether clients pay a fee and add the commission wording.
- [ ] Privacy policy: add the registered company name, number and address, a contact email for data requests, real retention periods, and the cookie list from CookieYes. Confirm the service providers listed (Cloudflare, n8n, Close, Slack) and who the data controller is if Funding Bay handles enquiries.
- [ ] Codi approves Lendpoint's success message for this page ("within one working day", "a realistic range", "lenders that fit") and that "Won't trigger a credit check" is true.
- [ ] Codi approves the FAQ answers on refinancing (from toolkit p7, not the approved wording) and on credit searches.
- [ ] Codi approves the plain-English versions of the scheme facts. The brief said to use the toolkit wording word for word; it's now in the "Official scheme info" drop-downs, with our plain summaries on show.
- [ ] Remove `<meta name="robots" content="noindex, nofollow">` from both HTML files.
- [ ] Change `og:url` and `og:image` in both HTML files from `finding-funding-ggs.pages.dev` to the live domain. The link preview image is `public/og-image.png` (1200×630, the favicon mark on ink).
- [ ] Set `.env` (webhook, GTM, hosts, CookieYes), rebuild, deploy `dist/`.
- [ ] Test: UTM and gclid links reach the CRM; GA4 event and Google Ads conversion fire once in GTM Preview; nothing fires after rejecting cookies.
- [ ] Lighthouse on mobile.
