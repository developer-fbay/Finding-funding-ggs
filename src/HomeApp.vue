<script setup>
import { Zap, LayoutGrid, ShieldCheck, Send, Phone, Handshake, Banknote } from '@lucide/vue'
import HeroSection from './components/HeroSection.vue'
import PurposeTiles from './components/loans/PurposeTiles.vue'
import ProductFamilies from './components/loans/ProductFamilies.vue'
import BrokerContrast from './components/loans/BrokerContrast.vue'
import HowItWorks from './components/HowItWorks.vue'
import Scenarios from './components/loans/Scenarios.vue'
import LoansFaq from './components/loans/LoansFaq.vue'
import ClosingCta from './components/ClosingCta.vue'
import SiteFooter from './components/SiteFooter.vue'

// Home page: business loans. Reuses the GGS page's hero, form, how it works, CTA and footer.
// Figures (amounts, speeds, timings) still need Codi's sign-off: see README "Before go-live".
const usps = [
  { icon: Zap, big: '1 working day', small: 'to hear back from us' },
  { icon: LayoutGrid, big: 'Every type', small: 'of business finance' },
  { icon: ShieldCheck, big: 'No credit check', small: 'to enquire' }
]
const steps = [
  { icon: Send, label: 'Minute 1', title: 'Tell us what you need', text: 'Six quick fields. No documents, no credit check.' },
  { icon: Phone, label: '1 day', title: 'We call you back', text: 'Within one working day, to understand the business and what the money is for.' },
  { icon: Handshake, label: 'Your pace', title: 'We match you to lenders', text: 'We go to the lenders most likely to say yes, and explain each option in plain English.' },
  { icon: Banknote, label: 'Funded', title: 'Offer and funds', text: 'You choose whether to go ahead. Once you accept and the lender’s checks are done, funds are released.', hl: true }
]
const docs = ['Last 3–6 months’ bank statements', 'Latest filed accounts', 'Management accounts (larger loans)', 'ID for directors']
</script>

<template>
  <a class="skip-link" href="#enquire">Skip to the enquiry form</a>
  <main>
    <HeroSection
      kicker="Business loans · Fast answers"
      title-before="Find your route to the "
      title-accent="right business finance"
      title-after=""
      lead="Business loans from £20,000 for cash flow, stock, equipment, growth or a tax bill. Tell us what you need in a minute and we’ll match you with the lenders most likely to say yes."
      :usps="usps"
    />
    <PurposeTiles />
    <ProductFamilies />
    <BrokerContrast />
    <HowItWorks
      intro="Four steps from enquiry to funds. Nothing goes to a lender until we’ve spoken and you’re happy."
      :steps="steps"
      docs-title="If you apply, lenders usually ask for:"
      :docs="docs"
    />
    <Scenarios />
    <LoansFaq />
    <ClosingCta title="Find out what you could get, and how fast" note="Won’t affect your credit score. No obligation." />
  </main>
  <SiteFooter :ggs="false" />
</template>
