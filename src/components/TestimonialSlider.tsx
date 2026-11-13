import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { CleanApertureLogo } from './Logo';

export interface Testimonial {
  id: string;
  author: string;
  roleInfo: string;
  timeAgo: string;
  rating: number;
  quote: string;
  verified?: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'maphefo-lucia',
    author: 'Maphefo Lucia',
    roleInfo: '1 review • 0 photos',
    timeAgo: '28 weeks ago',
    rating: 5,
    quote:
      "They're good at what they design. I've tried them, and they really produce quality. You have a design in mind; trust them with it, and your expectations will be exceeded. I love their work.",
    verified: true,
  },
  {
    id: 'dawn-lerato',
    author: 'Dawn Lerato',
    roleInfo: '1 review • 0 photos',
    timeAgo: '28 weeks ago',
    rating: 5,
    quote:
      'Their service is excellent; they are very professional, and their work is clean. They have meticulous attention to detail and can follow instructions.',
    verified: true,
  },
  {
    id: 'apostle-boago-setlhare',
    author: 'Apostle Boago Setlhare',
    roleInfo: '1 review • 0 photos',
    timeAgo: '47 weeks ago',
    rating: 5,
    quote:
      'Plain GraFix is the best deal: videography, photography, and all Graphics—very effective, efficient, and reliable (quick solutions). You will not regret, a deserving 5 stars for me.',
    verified: true,
  },
  {
    id: 'phenyo-mfumane',
    author: 'Phenyo Mfumane',
    roleInfo: '1 review • 0 photos',
    timeAgo: '49 weeks ago',
    rating: 5,
    quote:
      'Plain Grafix delivers professional, creative, and eye-catching designs. Fast, reliable, and affordable—highly recommended!',
    verified: true,
  },
];

export const TestimonialSlider: React.FC<{
  onOpenTestimonialModal?: () => void;
}> = ({ onOpenTestimonialModal: _onOpenTestimonialModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  // Autoplay carousel every 6.5 seconds when not hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const activeReview = TESTIMONIALS[currentIndex];

  // Variants for slide animation
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -30 : 30,
      opacity: 0,
    }),
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="bg-white text-black rounded-3xl sm:rounded-[2rem] p-5 sm:p-7 max-w-sm sm:max-w-md w-full shadow-2xl mt-6 sm:mt-8 lg:mt-12 lg:ml-auto group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Top Bar: Brand Badge, Logo & Nav Controls */}
      <div className="flex items-center justify-between gap-3 border-b border-neutral-100 pb-3.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-black flex items-center justify-center shrink-0 shadow-sm overflow-hidden p-1 border border-neutral-200">
            <CleanApertureLogo size={32} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm sm:text-base text-neutral-950 leading-tight">
                Plain GraFix
              </h3>
              <span className="text-[10px] bg-orange-100 text-[#ea580c] font-semibold px-1.5 py-0.5 rounded-full">
                5.0 ★
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium">
              Client Reviews ({currentIndex + 1}/{TESTIMONIALS.length})
            </p>
          </div>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 active:scale-90 flex items-center justify-center text-neutral-700 transition cursor-pointer"
            aria-label="Previous Review"
            data-cursor-label="PREV"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 active:scale-90 flex items-center justify-center text-neutral-700 transition cursor-pointer"
            aria-label="Next Review"
            data-cursor-label="NEXT"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Review Content Slider */}
      <div className="min-h-[140px] sm:min-h-[150px] flex flex-col justify-between py-4 relative">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={activeReview.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="flex flex-col justify-between h-full"
          >
            {/* 5-Star Rating & Time */}
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(activeReview.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-500 text-amber-500" />
                ))}
              </div>
              <span className="text-[11px] font-medium text-neutral-400">
                {activeReview.timeAgo}
              </span>
            </div>

            {/* Testimonial Quote */}
            <blockquote className="text-sm sm:text-base font-semibold text-neutral-900 leading-snug tracking-tight line-clamp-4">
              “{activeReview.quote}”
            </blockquote>

            {/* Author Attribution */}
            <div className="mt-3.5 pt-3 border-t border-neutral-100/90 flex items-center justify-between">
              <div>
                <div className="font-bold text-xs sm:text-sm text-neutral-950 flex items-center gap-1">
                  <span>{activeReview.author}</span>
                </div>
                <div className="text-[11px] text-neutral-400">
                  {activeReview.roleInfo}
                </div>
              </div>

              <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                <span>Verified</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Pagination Dots & Progress Bar */}
      <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
        <div className="flex items-center gap-1.5">
          {TESTIMONIALS.map((review, idx) => (
            <button
              key={review.id}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex ? 'w-6 bg-[#ea580c]' : 'w-1.5 bg-neutral-200 hover:bg-neutral-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <span className="text-[10px] text-neutral-400 font-medium tracking-wide">
          {isPaused ? 'Paused' : 'Auto-playing'}
        </span>
      </div>
    </div>
  );
};

export default TestimonialSlider;
