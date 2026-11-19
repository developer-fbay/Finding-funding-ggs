<script setup>
import { UserRoundCheck } from '@lucide/vue'
import LogoGhost from './LogoGhost.vue'
import ReadMore from './ReadMore.vue'
</script>

<template>
  <section class="section about" aria-labelledby="about-title">
    <div class="wrap grid">
      <div class="left">
        <div class="head">
          <p class="eyebrow">About the scheme</p>
          <h2 id="about-title" class="h2">What is the Growth Guarantee Scheme?</h2>
        </div>
        <div class="ghost"><LogoGhost :size="300" /></div>
      </div>
      <div class="right">
        <p class="big">GGS helps smaller UK businesses get finance that lenders might not offer them otherwise.</p>
        <ul class="points" role="list">
          <li><strong>How it works.</strong> The government gives the lender a guarantee on part of the loan. This lowers the lender’s risk, so it can lend to more businesses.</li>
          <li><strong>You still owe it all.</strong> The guarantee protects the lender, not you. You owe 100% of what you borrow.</li>
          <li><strong>The lender decides.</strong> It runs its usual credit and fraud checks. If it can offer you a normal loan on better terms, it will.</li>
        </ul>
        <ReadMore context="About the Growth Guarantee Scheme" :paras="[
          'The Growth Guarantee Scheme (GGS) aims to provide greater certainty over credit risk, enabling lenders to provide finance to more viable smaller businesses that they wouldn’t otherwise consider. If an Accredited Lender can offer a commercial loan on better terms, they will do so.',
          'Growth Guarantee Scheme backed facilities are provided at the discretion of Accredited lenders, who must carry out their standard credit and fraud checks for all applicants.'
        ]" />
        <div class="callout">
          <UserRoundCheck :size="28" class="icon icon-light" aria-hidden="true" />
          <p><strong>Who handles your enquiry.</strong> Funding Finder is a broker, not a lender. Brokers aren’t accredited under the scheme. We’re not approved, accredited or endorsed by the British Business Bank, which runs it.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid { display: grid; gap: 28px; }
@media (min-width: 960px) { .grid { grid-template-columns: 5fr 8fr; gap: 64px; } .right { padding-top: 34px; } }
.left { display: flex; flex-direction: column; justify-content: space-between; gap: 32px; }
.head { display: flex; flex-direction: column; gap: 14px; }
.ghost { display: none; }
@media (min-width: 960px) { .ghost { display: flex; } }
.right { display: flex; flex-direction: column; gap: 18px; }
.big { font-size: clamp(1.125rem, 1rem + .5vw, 1.3125rem); line-height: 1.5; }
.points { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
.points li { padding-left: 18px; border-left: 3px solid var(--coral); color: var(--zinc-700); }
.points strong { color: var(--ink); font-weight: 600; }
.right > .read-more { margin-top: -6px; }
.callout { display: flex; gap: 16px; align-items: flex-start; padding: 22px; border-radius: var(--r-md); background: var(--coral-tint); font-size: .9375rem; }
.callout strong { font-weight: 600; }
</style>
