import React, { useEffect, useRef } from "react";
import { useLenisScrollReveal } from "../Hooks/useLenisReveal";

export const MountainTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const revealRef = useLenisScrollReveal(
    {
      rootMargin: '0px 0px -20% 0px',
      threshold: 0.1,
      once: true,
    },
    'mountain-reveal'
  );

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    let animationFrame: number;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      const containerRect = container.getBoundingClientRect();
      const isVisible = containerRect.top < window.innerHeight && containerRect.bottom > 0;

      if (isVisible) {
        // Enhanced parallax effect for mountain layers with smoother transitions
        const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - containerRect.top) / window.innerHeight));
        
        // Apply smoother parallax transform to SVG with easing
        const parallaxOffset = scrollDelta * 0.15;
        svg.style.transform = `translateY(${parallaxOffset}px)`;
        svg.style.transition = 'transform 0.2s cubic-bezier(0.22, 0.61, 0.36, 1)';

        // Animate mountain layers with different speeds and enhanced depth perception
        const layers = svg.querySelectorAll('path');
        layers.forEach((layer, index) => {
          const speed = (index + 1) * 0.12;
          // Add exponential easing for more natural movement
          const easedProgress = 1 - Math.pow(1 - scrollProgress, 3);
          const layerOffset = easedProgress * speed * 30;
          
          // Apply transform with smoother transition
          (layer as SVGElement).style.transform = `translateY(${layerOffset}px)`;
          (layer as SVGElement).style.transition = `transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1)`;
          
          // Add subtle scaling effect for depth
          const scaleValue = 1 + (easedProgress * 0.02);
          (layer as SVGElement).style.transform += ` scale(${scaleValue})`;
        });
      }

      lastScrollY = currentScrollY;
      animationFrame = requestAnimationFrame(handleScroll);
    };

    // Start scroll animation loop
    animationFrame = requestAnimationFrame(handleScroll);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div
      ref={(el) => {
        containerRef.current = el;
        if (revealRef.current !== el) {
          revealRef.current = el;
        }
      }}
      className="relative w-full h-32 overflow-hidden mountain-transition"
    >
      {/* Mountain SVG transition */}
      <svg
        ref={svgRef}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-full transition-transform duration-300 ease-out"
      >
        <defs>
          <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--pure-white)" />
            <stop offset="100%" stopColor="var(--night)" />
          </linearGradient>
        </defs>

        {/* Mountain layers for depth with staggered animation */}
        <path
          d="M0,120 L0,80 L200,40 L400,60 L600,30 L800,50 L1000,35 L1200,65 L1200,120 Z"
          fill="url(#mountainGradient)"
          opacity="0.9"
          className="transition-all duration-1000 ease-out mountain-layer-1"
          style={{ transform: 'translateY(0px)' }}
        />

        <path
          d="M0,120 L0,90 L150,60 L350,80 L550,45 L750,70 L950,55 L1200,85 L1200,120 Z"
          fill="url(#mountainGradient)"
          opacity="0.7"
          className="transition-all duration-1000 ease-out mountain-layer-2"
          style={{ transform: 'translateY(0px)' }}
        />

        <path
          d="M0,120 L0,100 L100,80 L300,95 L500,70 L700,90 L900,75 L1200,95 L1200,120 Z"
          fill="url(#mountainGradient)"
          opacity="0.5"
          className="transition-all duration-1000 ease-out mountain-layer-3"
          style={{ transform: 'translateY(0px)' }}
        />
      </svg>
    </div>
  );
};
