<script setup>
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import EligibilitySection from './components/EligibilitySection.vue'
import HowItWorks from './components/HowItWorks.vue'
import FaqSection from './components/FaqSection.vue'
import ClosingCta from './components/ClosingCta.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <a class="skip-link" href="#enquire">Skip to the enquiry form</a>
  <main>
    <HeroSection />
    <AboutSection />
    <FeaturesSection />
    <EligibilitySection />
    <HowItWorks />
    <FaqSection />
    <ClosingCta />
  </main>
  <SiteFooter />
</template>
