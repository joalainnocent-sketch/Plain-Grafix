import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, Phone, Mail } from 'lucide-react';
import { CleanApertureLogo } from './Logo';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import { WhatsAppIcon, WHATSAPP_LINK, CALL_LINK, EMAIL_ADDRESS, EMAIL_LINK } from './ContactOptions';

interface VisionJourneyProps {
  onBackToHome: () => void;
  onOpenProjectBrief: () => void;
  onOpenFaq?: () => void;
  onOpenAbout?: () => void;
  onOpenFeaturedWorks?: () => void;
}

interface SlideData {
  id: string;
  stepNumber: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  stats: { label: string; value: string };
  sphereColor: string;
}

export const VisionJourney: React.FC<VisionJourneyProps> = ({
  onBackToHome,
  onOpenProjectBrief,
  onOpenFaq,
  onOpenAbout,
  onOpenFeaturedWorks,
}) => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(1); // 0-indexed: 1 is slide 02 (matching reference)

  const slides: SlideData[] = [
    {
      id: 'vision',
      stepNumber: '01',
      category: 'OUR PURPOSE',
      title: 'VISION',
      subtitle: 'Clarity Before Execution',
      description:
        'We decode your market positioning, pinpoint the raw essence of your ambition, and formulate a visual trajectory that outpaces conventions.',
      highlights: ['Deep competitor auditing', 'Audience psychographics', 'Brand positioning matrix'],
      stats: { label: 'Strategic Clarity', value: '100%' },
      sphereColor: 'from-[#ea580c]/30 via-[#c2410c]/20 to-transparent',
    },
    {
      id: 'design',
      stepNumber: '02',
      category: 'OUR VISION',
      title: 'DESIGN',
      subtitle: 'Modern & Convenient Craft',
      description:
        'Our craft is a modern and convenient design, the key to successful communication with the client and enduring brand loyalty.',
      highlights: ['Iconic mark engineering', 'Modular grid typography', 'High-resonance color palettes'],
      stats: { label: 'Brand Memorability', value: '3.4x' },
      sphereColor: 'from-[#ea580c]/40 via-[#9a3412]/25 to-transparent',
    },
    {
      id: 'systems',
      stepNumber: '03',
      category: 'OUR ECOSYSTEM',
      title: 'SYSTEMS',
      subtitle: 'Scalable Visual Architecture',
      description:
        'We build living design systems and digital tokens that allow your brand to expand across apps, physical packaging, and 3D environments seamlessly.',
      highlights: ['Multi-platform UI tokens', 'Motion physics guidelines', 'Print & packaging specifications'],
      stats: { label: 'Sprint Speed', value: '2x Faster' },
      sphereColor: 'from-[#f97316]/35 via-[#ea580c]/20 to-transparent',
    },
    {
      id: 'impact',
      stepNumber: '04',
      category: 'OUR RESULT',
      title: 'IMPACT',
      subtitle: 'Measurable Commercial Lift',
      description:
        'Designs that not only stun audiences, but command premium pricing, elevate market share, and convert first-time viewers into loyal advocates.',
      highlights: ['Conversion-tuned layouts', 'Venture fundraising decks', 'Award-winning aesthetics'],
      stats: { label: 'Client Satisfaction', value: '200%' },
      sphereColor: 'from-[#ea580c]/40 via-[#c2410c]/30 to-transparent',
    },
    {
      id: 'launch',
      stepNumber: '05',
      category: 'NEXT STEP',
      title: 'LAUNCH',
      subtitle: 'Your Transformation Begins Here',
      description:
        'Partner directly with Plain GraFix senior design directors to turn your vision into an iconic brand presence.',
      highlights: ['Rapid 2-4 week sprints', 'Direct senior-level access', 'Complete asset ownership'],
      stats: { label: 'Turnaround Time', value: '24h Quote' },
      sphereColor: 'from-[#ff7828]/45 via-[#ea580c]/25 to-transparent',
    },
  ];

  const totalSlides = slides.length;
  const activeData = slides[currentSlide];

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  }, [totalSlides]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInteractive =
        target &&
        (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A'].includes(target.tagName) ||
          target.isContentEditable);

      if (e.key === 'ArrowRight') {
        if (!isInteractive) handleNext();
      } else if (e.key === ' ') {
        if (!isInteractive) {
          e.preventDefault();
          handleNext();
        }
      } else if (e.key === 'ArrowLeft') {
        if (!isInteractive) handlePrev();
      } else if (e.key === 'Escape') {
        onBackToHome();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onBackToHome]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[1440px] min-h-[92vh] lg:min-h-[880px] bg-transparent border-[1.5px] border-[#ea580c] rounded-[1.5rem] sm:rounded-[2.5rem] md:rounded-[3rem] p-4 sm:p-8 md:p-10 lg:p-12 xl:p-14 flex flex-col justify-between relative overflow-hidden shadow-[0_0_80px_-20px_rgba(234,88,12,0.35)] z-10 select-none"
    >
      {/* Top Header */}
      <header className="flex flex-wrap items-center justify-between gap-3 w-full relative z-20">
        <button
          onClick={onBackToHome}
          className="group flex items-center gap-2 p-1.5 sm:p-2 -ml-1 sm:-ml-2 rounded-full hover:bg-white/10 transition duration-200 focus:outline-none cursor-pointer"
          title="Back to Home"
          aria-label="Back to Home"
          data-cursor-label="HOME"
        >
          <CleanApertureLogo size={36} className="group-hover:opacity-80 transition-opacity" />
        </button>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
          {/* Language Selector Dropdown */}
          <LanguageSelector variant="compact" dropdownAlign="auto" />

          {/* Quick WhatsApp Link */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#25D366] hover:bg-[#25D366]/20 text-xs sm:text-sm font-semibold tracking-tight px-2.5 sm:px-3 py-1.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/40 transition cursor-pointer flex items-center gap-1.5"
            data-cursor-label="WHATSAPP"
            title="Chat on WhatsApp +27 69 702 2221"
          >
            <WhatsAppIcon size={14} />
            <span className="hidden md:inline">{t('whatsapp_chat_label')}</span>
          </a>

          {/* Quick Call Link */}
          <a
            href={CALL_LINK}
            className="text-white/90 hover:text-white hover:bg-white/20 text-xs sm:text-sm font-semibold tracking-tight px-2.5 sm:px-3 py-1.5 rounded-full bg-white/10 border border-neutral-700 hover:border-white transition cursor-pointer flex items-center gap-1.5"
            data-cursor-label="CALL"
            title="Call +27 69 702 2221"
          >
            <Phone size={12} className="fill-white/80" />
            <span className="hidden md:inline">{t('call_label')}</span>
          </a>

          {/* Quick Email Link */}
          <a
            href={EMAIL_LINK}
            className="text-[#ea580c] hover:text-white hover:bg-[#ea580c]/20 text-xs sm:text-sm font-semibold tracking-tight px-2.5 sm:px-3 py-1.5 rounded-full bg-[#ea580c]/10 border border-[#ea580c]/40 transition cursor-pointer flex items-center gap-1.5"
            data-cursor-label="EMAIL"
            title={`Email ${EMAIL_ADDRESS}`}
          >
            <Mail size={12} />
            <span className="hidden md:inline">{t('email_label')}</span>
          </a>

          {onOpenFeaturedWorks && (
            <button
              onClick={onOpenFeaturedWorks}
              className="text-white/80 hover:text-white text-xs sm:text-sm font-medium tracking-tight px-2.5 sm:px-3.5 py-1.5 rounded-full bg-white/5 border border-neutral-700/80 hover:border-[#ea580c] transition cursor-pointer flex items-center gap-1.5"
              data-cursor-label="SERVICES"
            >
              <span>{t('nav_services')}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c]" />
            </button>
          )}

          {onOpenAbout && (
            <button
              onClick={onOpenAbout}
              className="text-white/80 hover:text-white text-xs sm:text-sm font-medium tracking-tight px-2.5 sm:px-3.5 py-1.5 rounded-full bg-white/5 border border-neutral-700/80 hover:border-[#ea580c] transition cursor-pointer flex items-center gap-1.5"
              data-cursor-label="ABOUT"
            >
              <span>{t('nav_about')}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c]" />
            </button>
          )}

          {onOpenFaq && (
            <button
              onClick={onOpenFaq}
              className="text-white/80 hover:text-white text-xs sm:text-sm font-medium tracking-tight px-2.5 sm:px-3.5 py-1.5 rounded-full bg-white/5 border border-neutral-700/80 hover:border-[#ea580c] transition cursor-pointer flex items-center gap-1.5"
              data-cursor-label="FAQ"
            >
              <span>{t('nav_faq')}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c]" />
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-6 sm:py-10 relative z-10">
        
        {/* Left Column: Category, Big Typography, Description & Swipe Action */}
        <div className="lg:col-span-7 flex flex-col items-start relative z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeData.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full"
            >
              {/* Category Subhead with glow effect */}
              <div className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#ea580c] uppercase mb-3 sm:mb-6">
                {activeData.category}
              </div>

              {/* Massive Bold Headline responsive for mobile */}
              <h2 className="text-[2.75rem] xs:text-[3.4rem] sm:text-[5.5rem] md:text-[7.5rem] lg:text-[9rem] font-extrabold tracking-tight text-white leading-[0.98] sm:leading-[0.95] mb-4 sm:mb-8 uppercase break-words">
                {activeData.title}
              </h2>

              {/* Subheading + Description */}
              <div className="max-w-xl">
                <p className="text-sm sm:text-base md:text-xl text-neutral-200 font-normal leading-relaxed">
                  {activeData.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Interactive Swipe Right & Project Brief CTAs */}
          <div className="mt-6 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={handleNext}
              className="group flex items-center gap-3 sm:gap-4 px-1 py-1 sm:px-2 sm:py-2 rounded-full focus:outline-none cursor-pointer"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-[#ea580c]/60 bg-black/40 group-hover:bg-[#ea580c]/20 group-hover:border-[#ea580c] group-hover:scale-105 active:scale-95 flex items-center justify-center text-white transition-all duration-300 shadow-[0_0_25px_rgba(234,88,12,0.25)]">
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
              <span className="text-sm sm:text-lg text-white font-medium tracking-wide group-hover:text-[#ea580c] transition-colors">
                {currentSlide === totalSlides - 1 ? 'Restart Journey' : 'Next Stage'}
              </span>
            </button>

            <button
              onClick={onOpenProjectBrief}
              className={`px-5 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                currentSlide === totalSlides - 1
                  ? 'bg-[#ea580c] hover:bg-[#c2410c] text-white shadow-[0_0_30px_rgba(234,88,12,0.5)] scale-105'
                  : 'bg-white/10 hover:bg-white text-white hover:text-black border border-white/20'
              }`}
              data-cursor-label="BRIEF"
            >
              <span>{t('btn_start_project')}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Right Column: Giant Circular Luminous Aura & Arc matching reference */}
        <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end min-h-[260px] sm:min-h-[400px] lg:min-h-[500px]">
          {/* Outer Arc Outline */}
          <div className="relative w-[260px] h-[260px] sm:w-[420px] sm:h-[420px] lg:w-[540px] lg:h-[540px] xl:w-[600px] xl:h-[600px] flex items-center justify-center">
            
            {/* The Thin Geometric Brand Arc */}
            <div className="absolute inset-0 rounded-full border-[1.5px] border-[#ea580c]/70 shadow-[0_0_40px_rgba(234,88,12,0.3)] pointer-events-none" />

            {/* Inner Concentric Glow Sphere */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`absolute inset-3 sm:inset-6 rounded-full bg-gradient-to-tr ${activeData.sphereColor} blur-xl sm:blur-2xl pointer-events-none`}
              />
            </AnimatePresence>

            {/* Core Dark Gradient Orb with Plain GraFix Motif */}
            <div className="relative w-40 h-40 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-full bg-neutral-950/70 border border-[#ea580c]/40 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 text-center shadow-[inset_0_0_40px_rgba(234,88,12,0.2)]">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-black/80 border border-[#ea580c]/50 flex items-center justify-center mb-2 sm:mb-3 p-1">
                <CleanApertureLogo size={24} />
              </div>
              <div className="text-xl sm:text-3xl font-black text-white tracking-tight">
                {activeData.stats.value}
              </div>
              <div className="text-[11px] sm:text-xs text-neutral-400 font-medium mt-1">
                {activeData.stats.label}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Step Indicator Bar: Matching reference: "02 ▬▬ ── ── ── 05" */}
      <footer className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-neutral-900/60 relative z-20">
        
        {/* Step Progress Segments */}
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
          {/* Current Step Number */}
          <span className="text-base sm:text-lg font-bold text-white tracking-tight min-w-[24px]">
            {activeData.stepNumber}
          </span>

          {/* Progress Segment Bars */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1 sm:flex-initial">
            {slides.map((s, index) => {
              const isActive = index <= currentSlide;
              const isCurrent = index === currentSlide;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(index)}
                  className="group py-2 focus:outline-none cursor-pointer"
                  aria-label={`Go to slide ${s.stepNumber} - ${s.title}`}
                >
                  <div
                    className={`h-[3px] rounded-full transition-all duration-300 ${
                      isCurrent
                        ? 'w-10 sm:w-14 bg-[#ea580c] shadow-[0_0_12px_#ea580c]'
                        : isActive
                        ? 'w-8 sm:w-12 bg-[#ea580c]/60'
                        : 'w-6 sm:w-10 bg-neutral-800 group-hover:bg-neutral-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Total Step Number */}
          <span className="text-base sm:text-lg font-bold text-neutral-500 tracking-tight">
            0{totalSlides}
          </span>
        </div>

        {/* Right quick switch controls & hints */}
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
          <span className="text-xs text-neutral-500 hidden md:inline-block">
            Use <kbd className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300">→</kbd> to navigate
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-full bg-neutral-950/80 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition cursor-pointer"
              aria-label="Previous step"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-full bg-neutral-950/80 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#ea580c] transition cursor-pointer"
              aria-label="Next step"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};
