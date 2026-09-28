import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, ArrowRight } from 'lucide-react';
import { HERO_SLIDES, ASSET_IMAGES } from '../data/mockData';
import { Product } from '../types';

interface HeroSectionProps {
  onSelectProduct: (productSlugOrId: string) => void;
  onExploreCatalog: (category?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectProduct,
  onExploreCatalog,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeSlide = HERO_SLIDES[currentSlideIndex];

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3" data-purpose="hero-grid">
      {/* Big Left Banner (Back to School / Tech Bundles) */}
      <section
        className={`lg:col-span-6 ${activeSlide.bgClass} rounded-2xl text-white relative overflow-hidden flex flex-col justify-between p-6 sm:p-8 min-h-[460px] lg:min-h-[500px] shadow-sm transition-colors duration-500`}
        data-purpose="primary-campaign-banner"
      >
        {/* Pause Toggle Icon (Top-right of Banner) */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? "Retomar carrossel" : "Pausar carrossel"}
          title={isPaused ? "Retomar rotação automática" : "Pausar rotação"}
          className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/60 bg-black/10 backdrop-blur-xs flex items-center justify-center text-white/90 hover:text-white hover:border-white transition-all cursor-pointer z-20"
        >
          {isPaused ? (
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          ) : (
            <Pause className="w-3.5 h-3.5 fill-current" />
          )}
        </button>

        {/* Banner Text Content */}
        <div className="max-w-md z-10">
          <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-white/90 block mb-2">
            {activeSlide.eyebrow}
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight mb-5">
            {activeSlide.title}
          </h1>
          <button
            onClick={() => {
              if (activeSlide.id === 'slide-1') {
                onSelectProduct('pack-essencial-pc');
              } else {
                onExploreCatalog(activeSlide.categoryTarget);
              }
            }}
            className="inline-block bg-white text-gray-900 font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-full hover:bg-gray-100 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            {activeSlide.ctaText}
          </button>
        </div>

        {/* Tech bundle montage image representing PC bundle */}
        <div 
          onClick={() => onSelectProduct('pack-essencial-pc')}
          className="relative w-full mt-4 flex items-end justify-center cursor-pointer group"
        >
          <img
            src={activeSlide.image}
            alt={activeSlide.imageAlt}
            referrerPolicy="no-referrer"
            className="max-h-56 object-contain drop-shadow-2xl mix-blend-screen opacity-95 group-hover:scale-[1.03] transition-transform duration-300"
          />
        </div>

        {/* Carousel Navigation & Dots */}
        <div className="flex items-center justify-between pt-2 z-10">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Slide anterior"
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Dot Indicators */}
          <div className="flex items-center gap-1.5" data-purpose="carousel-dots">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                aria-label={`Ir para slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentSlideIndex 
                    ? 'w-6 h-1.5 bg-white' 
                    : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            aria-label="Próximo slide"
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>
      </section>

      {/* Right Column: Two Stacked Promotional Banners */}
      <div className="lg:col-span-6 flex flex-col gap-3">
        {/* Top Right Banner: Apple iPhone Pre-Order */}
        <article
          onClick={() => onSelectProduct('iphone-18-pro')}
          className="banner-top-right rounded-2xl p-5 sm:p-7 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between min-h-[230px] lg:min-h-[244px] group cursor-pointer border border-gray-200/60 shadow-xs hover:shadow-md hover:border-gray-300 transition-all"
          data-purpose="iphone-promo"
        >
          {/* Left: Product Headline & Image */}
          <div className="sm:w-1/2 w-full z-10 flex flex-col items-center sm:items-start text-center sm:text-left mb-3 sm:mb-0">
            <div className="flex items-center gap-1.5 font-bold text-gray-900 text-lg mb-2">
              <span className="text-xl"></span>
              <span className="tracking-tight font-extrabold">iPhone 18 Pro</span>
            </div>
            <img
              src={ASSET_IMAGES.iphone18}
              alt="iPhone 18 Pro acabamento titânio escuro"
              referrerPolicy="no-referrer"
              className="h-28 object-contain my-1 drop-shadow-md group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Right: Financing & Eyebrow */}
          <div className="sm:w-1/2 w-full z-10 flex flex-col justify-between h-full text-left pl-2">
            <div>
              <span className="text-[10px] font-extrabold tracking-wider text-gray-700 uppercase block mb-1.5">
                PRÉ-VENDA DISPONÍVEL DE 12 A 18 SET ÀS 8H
              </span>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                iPhone 18 Pro com até 24x s/juros TAEG 18,5%*, até 1500€ na retoma e muito mais*
              </h2>
            </div>
            {/* Link Arrow Button */}
            <div className="self-end mt-4">
              <span className="w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-colors shadow-xs">
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </span>
            </div>
          </div>
        </article>

        {/* Bottom Right Banner: Merach Fitness Discount */}
        <article
          onClick={() => onSelectProduct('merach-fitness-t12')}
          className="banner-bottom-right rounded-2xl p-5 sm:p-7 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between min-h-[230px] lg:min-h-[244px] group cursor-pointer border border-blue-100 shadow-xs hover:shadow-md hover:border-blue-200 transition-all"
          data-purpose="fitness-promo"
        >
          {/* Left: Equipment Render */}
          <div className="sm:w-1/2 w-full z-10 flex items-center justify-center mb-3 sm:mb-0">
            <img
              src={ASSET_IMAGES.fitnessMerach}
              alt="Passadeira de corrida, remo e bicicleta estática Merach"
              referrerPolicy="no-referrer"
              className="max-h-36 object-contain drop-shadow group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Right: Text Offer */}
          <div className="sm:w-1/2 w-full z-10 flex flex-col justify-between h-full text-left pl-2">
            <div>
              <span className="text-[10px] font-extrabold tracking-wider text-gray-700 uppercase block mb-1.5">
                PROMOÇÃO NOS PRODUTOS ASSINALADOS DE 15 A 16 SET
              </span>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                Até 60% desconto direto numa seleção de equipamentos fitness da marca Merach
              </h2>
            </div>
            {/* Link Arrow Button */}
            <div className="self-end mt-4">
              <span className="w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-colors shadow-xs">
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
