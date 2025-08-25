import { MountainWireframe } from './MountainWireframe';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden" style={{ background: 'var(--pure-white)' }}>
      {/* Background wireframe animation */}
      <div className="absolute inset-0" style={{ opacity: 0.28 }}>
        <MountainWireframe
          color={0x0e0e10}
          opacity={0.35}
          elevationScale={0.75}
        />
      </div>
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 gradient-gold-subtle opacity-30"></div>
      
      {/* Content overlay */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="text-center px-6 max-w-4xl mx-auto">
          <h1 className="luxury-heading mb-6">
            SGI agréée au service de vos ambitions
          </h1>
          
          <p className="luxury-subheading mb-10">
            Société de Gestion et d’Intermédiation basée à Dakar, licenciée CREPMF SGI/DA/2016/60. Courtage BRVM, émissions primaires et ingénierie financière avec écoute, accompagnement et performance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button className="btn-primary rounded-lg shimmer-effect font-display tracking-wide">
              Nous contacter
            </button>
            
            <button className="btn-secondary rounded-lg font-display tracking-wide">
              Découvrir nos services
            </button>
          </div>
        </div>
      </div>
      
      {/* Enhanced grid overlay with glassmorphism */}
      <div className="absolute inset-0" style={{ opacity: 0.1 }}>
        <div className="w-full h-full" 
             style={{
               backgroundImage: `linear-gradient(var(--night-10) 1px, transparent 1px), linear-gradient(90deg, var(--night-10) 1px, transparent 1px)`,
               backgroundSize: '72px 72px'
             }}>
        </div>
      </div>
      
      {/* Floating elements for depth */}
      <div className="absolute top-1/4 left-8 w-2 h-2 rounded-full floating-animation" style={{ background: 'var(--gold-metallic)', opacity: 0.6 }}></div>
      <div className="absolute top-1/3 right-12 w-1 h-1 rounded-full floating-animation" style={{ background: 'var(--gold-metallic)', opacity: 0.4, animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/3 left-16 w-1.5 h-1.5 rounded-full floating-animation" style={{ background: 'var(--gold-metallic)', opacity: 0.5, animationDelay: '4s' }}></div>
      
      {/* Elegant scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2" style={{ color: 'var(--night-80)' }}>
        <div className="flex flex-col items-center glassmorphism px-3.5 py-2.5 rounded-full">
          <span className="kicker mb-2 opacity-80">Scroll</span>
          <div className="w-5 h-8 border border-current rounded-full flex justify-center opacity-60">
            <div className="w-0.5 h-2 bg-current rounded-full mt-1.5 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
