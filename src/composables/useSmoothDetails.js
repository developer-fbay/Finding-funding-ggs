// Smooth open/close for native <details> (FAQ answers, "Official scheme info" drop-downs).
// Clicking the summary animates the height over 320ms and fades the content in; reduced-motion
// users get an instant toggle. The "expanded" class flips straight away, so icons can turn
// while the panel is still moving (the native [open] attribute only drops at the end of a close).
// Without JavaScript the <details> still opens and closes normally.

const DURATION = 320
const EASING = 'cubic-bezier(.22, .61, .36, 1)'
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function smoothDetails(details) {
  const summary = details.querySelector(':scope > summary')
  let anim = null

  function finish(open) {
    details.open = open
    details.style.overflow = ''
    anim = null
  }

  function set(open) {
    details.classList.toggle('expanded', open)
    if (reducedMotion() || typeof details.animate !== 'function') {
      if (anim) anim.cancel()
      finish(open)
      return
    }
    const cs = getComputedStyle(details)
    const borders = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth)
    const padding = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom)
    const start = details.offsetHeight // mid-animation this is the current animated height
    if (anim) anim.cancel()
    details.style.overflow = 'hidden'
    if (open) details.open = true
    const end = open ? details.scrollHeight + borders : summary.offsetHeight + padding + borders
    const a = details.animate({ height: [`${start}px`, `${end}px`] }, { duration: DURATION, easing: EASING })
    anim = a
    const content = details.querySelector(':scope > :not(summary)')
    if (open && content) content.animate({ opacity: [0, 1], transform: ['translateY(-6px)', 'none'] }, { duration: DURATION, easing: EASING })
    a.onfinish = () => { if (anim === a) finish(open) }
    // Safety net: with no frames painted (background tab) the finish event never fires.
    setTimeout(() => { if (anim === a) { a.cancel(); finish(open) } }, DURATION + 150)
  }

  const onClick = (e) => { e.preventDefault(); set(!details.classList.contains('expanded')) }
  // Keep the class in step when the browser opens it natively (e.g. find-in-page).
  const onToggle = () => { if (!anim) details.classList.toggle('expanded', details.open) }

  summary.addEventListener('click', onClick)
  details.addEventListener('toggle', onToggle)
  details.classList.toggle('expanded', details.open)

  return {
    open: () => set(true),
    close: () => set(false),
    destroy() {
      summary.removeEventListener('click', onClick)
      details.removeEventListener('toggle', onToggle)
      if (anim) anim.cancel()
    }
  }
}

// Directive for plain <details> in templates: <details v-smooth-details>
export const vSmoothDetails = {
  mounted(el) { el._smoothDetails = smoothDetails(el) },
  unmounted(el) { el._smoothDetails?.destroy() }
}
