import React, { useRef } from 'react';
import { gsap } from 'gsap';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: any;
  to?: string;
  href?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = '', 
  strength = 30, 
  as: Component = 'button',
  to,
  href,
  ...props 
}) => {
  const buttonRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || !textRef.current) return;
    
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center, normalized to -1 to 1
    const distanceX = (e.clientX - centerX) / (width / 2);
    const distanceY = (e.clientY - centerY) / (height / 2);
    
    // Only apply effect if mouse is near or inside the button
    // This allows for a slightly larger hit area for the magnetic effect
    const deltaX = distanceX * strength;
    const deltaY = distanceY * strength;

    gsap.to(buttonRef.current, {
      x: deltaX,
      y: deltaY,
      duration: 1,
      ease: "power3.out"
    });
    
    gsap.to(textRef.current, {
      x: deltaX * 0.5, // Inner text moves slightly less to create parallax
      y: deltaY * 0.5,
      duration: 1,
      ease: "power3.out"
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current || !textRef.current) return;
    
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)"
    });
    
    gsap.to(textRef.current, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <Component
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-flex items-center justify-center overflow-hidden transition-colors ${className}`}
      to={to}
      href={href}
      {...props}
    >
      <div ref={textRef} className="pointer-events-none flex items-center gap-2">
        {children}
      </div>
    </Component>
  );
};
