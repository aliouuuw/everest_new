import React, { useRef, useCallback } from 'react';
import { gsap } from 'gsap';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
  href?: string;
  /** Max tilt angle in degrees */
  maxTilt?: number;
  /** Glare effect intensity 0-1 */
  glareIntensity?: number;
  /** Scale on hover */
  hoverScale?: number;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  style,
  as: Component = 'div',
  href,
  maxTilt = 8,
  glareIntensity = 0.15,
  hoverScale = 1.02,
  onMouseEnter,
  onMouseLeave,
}) => {
  const cardRef = useRef<HTMLElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    // Cancel previous rAF to avoid stacking
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalized -1 to 1
      const normalX = (e.clientX - centerX) / (rect.width / 2);
      const normalY = (e.clientY - centerY) / (rect.height / 2);

      // Tilt: rotateY follows X axis, rotateX is inverted Y axis
      const tiltX = -normalY * maxTilt;
      const tiltY = normalX * maxTilt;

      gsap.to(cardRef.current, {
        rotateX: tiltX,
        rotateY: tiltY,
        scale: hoverScale,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      // Glare position
      if (glareRef.current) {
        const glareX = ((e.clientX - rect.left) / rect.width) * 100;
        const glareY = ((e.clientY - rect.top) / rect.height) * 100;
        glareRef.current.style.background = `radial-gradient(600px circle at ${glareX}% ${glareY}%, rgba(255,255,255,${glareIntensity}), transparent 40%)`;
        glareRef.current.style.opacity = '1';
      }
    });
  }, [maxTilt, hoverScale, glareIntensity]);

  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    onMouseEnter?.(e);
  }, [onMouseEnter]);

  const handleMouseLeave = useCallback((e: React.MouseEvent) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }

    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }

    onMouseLeave?.(e);
  }, [onMouseLeave]);

  const Elem = Component as any;

  return (
    <div style={{ perspective: '1000px' }}>
      <Elem
        ref={cardRef}
        className={className}
        style={{
          ...style,
          transformStyle: 'preserve-3d' as const,
          willChange: 'transform',
        }}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Glare overlay */}
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-[1] transition-opacity duration-300"
          style={{ opacity: 0 }}
        />
        {/* Content raised slightly in Z for depth */}
        <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' as const }} className="relative z-[2]">
          {children}
        </div>
      </Elem>
    </div>
  );
};
