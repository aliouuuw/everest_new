import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
        opacity: 0,
        y: 40
      });

      const tl = gsap.timeline({ delay: 0.4 });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out"
      }, "-=0.5")
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4");

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-[var(--pure-white)] overflow-hidden"
    >
      <div className="absolute inset-0 gradient-gold-subtle opacity-60 pointer-events-none"></div>
      <img
        src="/bg-mountain-1.webp"
        alt=""
        className="absolute inset-0 -z-10 w-full h-full object-cover object-bottom opacity-70 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 
            ref={titleRef}
            className="heading-display text-5xl md:text-6xl lg:text-7xl text-night tracking-tight mb-8"
          >
            Des idées et des valeurs
            <span className="block text-gradient-gold mt-3">au service de vos ambitions</span>
          </h1>

          <p 
            ref={subtitleRef}
            className="text-secondary kicker mb-12"
          >
            Gestion • Intermédiation • Conseil
          </p>

          <div 
            ref={ctaRef}
            className="flex items-center justify-center"
          >
            <a
              href="#contact"
              className="px-8 py-3 rounded-full border border-[var(--gold-metallic)] text-night text-sm md:text-base font-medium transition-colors duration-200 hover:bg-[var(--gold-metallic)] hover:text-[var(--pure-white)]"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
