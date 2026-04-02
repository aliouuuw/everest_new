import React, { useMemo } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import { LenisProvider, useLenisContext } from './Hooks/useLenisContext.tsx'

gsap.registerPlugin(ScrollTrigger)

interface LenisWrapperProps {
  children: React.ReactNode
}

const LenisContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { lenis, isReady } = useLenisContext()

  // ── Lenis → ScrollTrigger sync ──────────────────────────────────────────
  // Modern Lenis (1.x) uses native scroll under the hood, so we do NOT need
  // ScrollTrigger.scrollerProxy on document.body. That proxy causes GSAP's
  // _getComputedProperty to enter infinite recursion when reading CSS
  // transforms/filters. Instead we just keep ScrollTrigger in sync via the
  // scroll event and periodic refresh.
  React.useEffect(() => {
    if (!lenis || !isReady) return

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)

    // Initial refresh so triggers pick up correct positions
    ScrollTrigger.refresh()

    return () => {
      lenis.off('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [lenis, isReady])

  // Handle anchor clicks for smooth scrolling
  const handleAnchorClick = (e: Event) => {
    const target = e.target as HTMLAnchorElement
    if (target.tagName === 'A' && target.hash && target.hash.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(target.hash)
      if (element && lenis && isReady) {
        lenis.scrollTo(element as HTMLElement, { offset: -80 })
      }
    }
  }

  React.useEffect(() => {
    if (isReady) {
      document.addEventListener('click', handleAnchorClick)
      return () => document.removeEventListener('click', handleAnchorClick)
    }
  }, [lenis, isReady])

  return <>{children}</>
}

export const LenisWrapper: React.FC<LenisWrapperProps> = ({ children }) => {
  const lenisOptions = useMemo(
    () => ({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical' as const,
      gestureDirection: 'vertical' as const,
      smooth: true,
      mouseMultiplier: 0.7,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
    }),
    [],
  )

  return (
    <LenisProvider options={lenisOptions}>
      <LenisContent>{children}</LenisContent>
    </LenisProvider>
  )
}
