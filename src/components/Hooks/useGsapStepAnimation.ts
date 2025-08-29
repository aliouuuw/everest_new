import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useGsapStepAnimation = () => {
  const containerRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const stepCards = containerRef.current.querySelectorAll('li')

    stepCards.forEach((card, index) => {
      const isEven = index % 2 === 0

      // Set initial state
      gsap.set(card, {
        opacity: 0,
        x: isEven ? -50 : 50,
        y: 30
      })

      // Create animation
      gsap.to(card, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        }
      })
    })

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return containerRef
}
