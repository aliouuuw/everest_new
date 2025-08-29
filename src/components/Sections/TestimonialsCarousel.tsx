import { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import { useReveal } from '../Hooks/useReveal';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  service: 'discretionary' | 'mandate' | 'assisted' | 'all';
  avatar?: string;
}

const testimonials: Array<Testimonial> = [
  {
    id: '1',
    name: 'Marie Dupont',
    role: 'Directrice Financière',
    company: 'Entreprise Tech SA',
    content: 'La gestion libre me permet de garder le contrôle total de mes décisions d\'investissement tout en bénéficiant d\'une exécution professionnelle. Les frais sont transparents et le service est impeccable.',
    rating: 5,
    service: 'discretionary'
  },
  {
    id: '2',
    name: 'Jean-Baptiste Kouamé',
    role: 'Chef d\'Entreprise',
    company: 'Kouamé Industries',
    content: 'La gestion sous-mandat est parfaite pour quelqu\'un comme moi qui n\'a pas le temps de suivre les marchés quotidiennement. L\'équipe fait un travail remarquable avec des résultats constants.',
    rating: 5,
    service: 'mandate'
  },
  {
    id: '3',
    name: 'Aminata Sow',
    role: 'Consultante Indépendante',
    company: 'Cabinet Sow Consulting',
    content: 'La gestion assistée est idéale pour moi. Je garde la main sur les décisions importantes tout en bénéficiant des conseils avisés de professionnels expérimentés. Un excellent compromis.',
    rating: 5,
    service: 'assisted'
  },
  {
    id: '4',
    name: 'Paul Ndiaye',
    role: 'Médecin',
    company: 'Clinique Saint-Louis',
    content: 'Après avoir essayé plusieurs gestionnaires, Everest Finance se distingue par sa transparence et ses performances. La plateforme est intuitive et le support réactif.',
    rating: 5,
    service: 'all'
  },
  {
    id: '5',
    name: 'Sophie Diop',
    role: 'Architecte',
    company: 'Diop Architecture',
    content: 'Les analyses et recommandations sont toujours pertinentes et bien étayées. L\'accompagnement personnalisé fait vraiment la différence dans mes choix d\'investissement.',
    rating: 5,
    service: 'assisted'
  },
  {
    id: '6',
    name: 'Mamadou Ba',
    role: 'Commerçant',
    company: 'Ba Commerce',
    content: 'La gestion sous-mandat m\'a permis de diversifier mon portefeuille sans stress. Les rendements sont stables et les rapports réguliers me tiennent informé.',
    rating: 4,
    service: 'mandate'
  },
  {
    id: '7',
    name: 'Fatou Sall',
    role: 'Professeure',
    company: 'Université Dakar',
    content: 'L\'interface est simple d\'utilisation et les outils d\'analyse sont puissants. Je peux suivre mes investissements en temps réel depuis mon téléphone.',
    rating: 5,
    service: 'discretionary'
  },
  {
    id: '8',
    name: 'Ibrahima Faye',
    role: 'Ingénieur',
    company: 'Sénégal Telecom',
    content: 'Le conseiller dédié est une vraie valeur ajoutée. Ses recommandations sont toujours pertinentes et il prend le temps d\'expliquer ses analyses.',
    rating: 5,
    service: 'assisted'
  }
];

interface TestimonialsCarouselProps {
  service?: 'discretionary' | 'mandate' | 'assisted' | 'all';
  title?: string;
  subtitle?: string;
  maxItems?: number;
}

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  service = 'all',
  title = 'Témoignages clients',
  subtitle = 'Découvrez ce que disent nos clients satisfaits',
  maxItems = 6
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const sectionRef = useReveal<HTMLElement>();

  // Filter testimonials based on service
  const filteredTestimonials = testimonials.filter(t =>
    service === 'all' || t.service === service || t.service === 'all'
  ).slice(0, maxItems);

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, filteredTestimonials.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Auto-play functionality
  useEffect(() => {
    if (filteredTestimonials.length <= itemsPerView) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, maxIndex, itemsPerView, filteredTestimonials.length]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-[var(--gold-metallic)] text-[var(--gold-metallic)]' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getServiceLabel = (serviceType: string) => {
    switch (serviceType) {
      case 'discretionary':
        return 'Gestion Libre';
      case 'mandate':
        return 'Gestion Sous-Mandat';
      case 'assisted':
        return 'Gestion Assistée';
      default:
        return '';
    }
  };

  if (filteredTestimonials.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} className="reveal py-14 sm:py-18 bg-[var(--white-smoke)]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="kicker text-gradient-gold">{title}</span>
          <h2 className="luxury-heading mt-3">Ils nous font confiance</h2>
          <p className="luxury-subheading mt-5 pt-8">{subtitle}</p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          {filteredTestimonials.length > itemsPerView && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/90 backdrop-blur-sm border border-[var(--gold-metallic)]/25 rounded-full shadow-lg hover:bg-[var(--gold-light)]/10 transition-all"
                aria-label="Previous testimonials"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/90 backdrop-blur-sm border border-[var(--gold-metallic)]/25 rounded-full shadow-lg hover:bg-[var(--gold-light)]/10 transition-all"
                aria-label="Next testimonials"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Testimonials Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                width: `${(filteredTestimonials.length / itemsPerView) * 100}%`
              }}
            >
              {filteredTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
                >
                  <div className="group relative overflow-hidden rounded-2xl border border-[var(--gold-metallic)]/25 bg-[var(--pure-white)]/80 backdrop-blur-sm p-6 transition-all card-hover h-full">
                    <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--gold-metallic-10)] blur-2xl" />

                    {/* Quote Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <FaQuoteLeft className="text-2xl text-[var(--gold-metallic)] opacity-60" />
                      {testimonial.service !== 'all' && (
                        <span className="text-xs bg-[var(--gold-light)]/20 text-[var(--gold-dark)] px-2 py-1 rounded-full">
                          {getServiceLabel(testimonial.service)}
                        </span>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Content */}
                    <blockquote className="text-secondary text-sm leading-relaxed mb-6">
                      "{testimonial.content}"
                    </blockquote>

                    {/* Author */}
                    <div className="border-t border-[var(--gold-metallic)]/25 pt-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--gold-light)]/30 flex items-center justify-center">
                          <span className="text-sm font-display text-[var(--gold-dark)]">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-display text-sm text-[var(--night)]">
                            {testimonial.name}
                          </div>
                          <div className="text-xs text-secondary">
                            {testimonial.role} • {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          {filteredTestimonials.length > itemsPerView && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxIndex + 1 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex
                      ? 'bg-[var(--gold-metallic)] w-6'
                      : 'bg-[var(--gold-metallic)]/30'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-[var(--pure-white)]/60 backdrop-blur-sm rounded-xl border border-[var(--gold-metallic)]/25">
            <div className="text-center">
              <div className="font-display text-xl text-[var(--gold-dark)]">500+</div>
              <div className="text-xs text-secondary">Clients satisfaits</div>
            </div>
            <div className="w-px h-8 bg-[var(--gold-metallic)]/25" />
            <div className="text-center">
              <div className="font-display text-xl text-[var(--gold-dark)]">4.9/5</div>
              <div className="text-xs text-secondary">Note moyenne</div>
            </div>
            <div className="w-px h-8 bg-[var(--gold-metallic)]/25" />
            <div className="text-center">
              <div className="font-display text-xl text-[var(--gold-dark)]">98%</div>
              <div className="text-xs text-secondary">Recommandation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
