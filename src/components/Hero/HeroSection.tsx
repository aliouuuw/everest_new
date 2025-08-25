import { MountainWireframe } from './MountainWireframe';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden" style={{ background: 'var(--pure-white)' }}>
      {/* Background wireframe animation */}
      <div className="absolute inset-0" style={{ opacity: 0.4 }}>
        <MountainWireframe
          color={0x1a1a1a}
          opacity={0.4}
          elevationScale={0.9}
        />
      </div>
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 gradient-gold-subtle opacity-30"></div>
      
      {/* Content overlay */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="text-center px-6 max-w-5xl mx-auto">
          <div className="luxury-heading text-6xl md:text-8xl mb-8">
            Scale New
            <span className="block text-gradient-gold font-display">
              Financial Heights
            </span>
          </div>
          
          <div className="luxury-subheading mb-12 max-w-3xl mx-auto">
            Navigate the peaks and valleys of finance with precision, insight, and unwavering determination. Experience the pinnacle of financial excellence.
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="btn-primary rounded-xl shimmer-effect font-display tracking-wide">
              Start Your Journey
            </button>
            
            <button className="btn-secondary rounded-xl font-display tracking-wide">
              Explore Services
            </button>
          </div>
        </div>
      </div>
      
      {/* Enhanced grid overlay with glassmorphism */}
      <div className="absolute inset-0" style={{ opacity: 0.15 }}>
        <div className="w-full h-full" 
             style={{
               backgroundImage: `linear-gradient(var(--night-10) 1px, transparent 1px), linear-gradient(90deg, var(--night-10) 1px, transparent 1px)`,
               backgroundSize: '60px 60px'
             }}>
        </div>
      </div>
      
      {/* Floating elements for depth */}
      <div className="absolute top-1/4 left-8 w-2 h-2 rounded-full floating-animation" style={{ background: 'var(--gold-metallic)', opacity: 0.6 }}></div>
      <div className="absolute top-1/3 right-12 w-1 h-1 rounded-full floating-animation" style={{ background: 'var(--gold-metallic)', opacity: 0.4, animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/3 left-16 w-1.5 h-1.5 rounded-full floating-animation" style={{ background: 'var(--gold-metallic)', opacity: 0.5, animationDelay: '4s' }}></div>
      
      {/* Elegant scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2" style={{ color: 'var(--night-80)' }}>
        <div className="flex flex-col items-center glassmorphism px-4 py-3 rounded-full">
          <span className="kicker mb-3 opacity-80">Scroll to explore</span>
          <div className="w-5 h-8 border border-current rounded-full flex justify-center opacity-60">
            <div className="w-0.5 h-2 bg-current rounded-full mt-1.5 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
