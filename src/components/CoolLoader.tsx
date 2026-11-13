import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { PLAIN_GRAFIX_LOGO_URL } from './Logo';

interface CoolLoaderProps {
  onFinish?: () => void;
  minDuration?: number; // milliseconds
  isAppReady?: boolean;
}

const PHRASES = [
  'INITIALIZING DESIGN SYSTEMS...',
  'CALIBRATING PIXELS...',
  'WHERE IDEAS BECOME POWERFUL VISUALS...',
  'PREPARING CREATIVE CANVAS...',
  'PLAIN GRAFIX READY',
];

export const CoolLoader: React.FC<CoolLoaderProps> = ({
  onFinish,
  minDuration = 1800,
  isAppReady = true,
}) => {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const finishedRef = useRef(false);
  const finishTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const startTime = Date.now();
    const intervalMs = 25;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawPct = Math.min(100, Math.floor((elapsed / minDuration) * 100));

      setProgress((prev) => Math.max(prev, rawPct));

      const phraseStep = Math.min(
        PHRASES.length - 1,
        Math.floor((elapsed / minDuration) * PHRASES.length)
      );
      setPhraseIndex(phraseStep);

      if (rawPct >= 100 && isAppReady && !finishedRef.current) {
        finishedRef.current = true;
        clearInterval(timer);
        setProgress(100);
        setIsCompleted(true);
        finishTimeoutRef.current = setTimeout(() => {
          onFinish?.();
        }, 450);
      }
    }, intervalMs);

    return () => {
      clearInterval(timer);
      if (finishTimeoutRef.current) {
        clearTimeout(finishTimeoutRef.current);
      }
    };
  }, [minDuration, isAppReady, onFinish]);

  return (
    <AnimatePresence>
      {!isCompleted && (
        <motion.div
          key="cool-loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden select-none pointer-events-auto"
        >
          {/* Subtle Cybernetic Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Ambient Orange Central Glow */}
          <div className="absolute w-96 h-96 rounded-full bg-[#ea580c]/12 blur-[120px] pointer-events-none -translate-y-6" />

          {/* Glowing Aperture Loader Rings & Monogram */}
          <div className="relative flex items-center justify-center mb-8">
            {/* Outer Pulsing Kinetic Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-dashed border-[#ea580c]/30 flex items-center justify-center"
            >
              {/* Orbital Satellite Node */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#ea580c] shadow-[0_0_12px_#ea580c]" />
            </motion.div>

            {/* Middle Reverse Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
              className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-t-[#ea580c] border-r-transparent border-b-white/20 border-l-transparent"
            />

            {/* Inner Precision Ring with Hex Corner Accents */}
            <div className="absolute w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-neutral-800 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center shadow-[inset_0_0_20px_rgba(234,88,12,0.15)]">
              {/* Centered Plain GraFix Monogram / Logo */}
              <motion.img
                src={PLAIN_GRAFIX_LOGO_URL}
                alt="Plain GraFix"
                className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
                animate={{
                  scale: [0.94, 1.05, 0.94],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </div>

          {/* Title & Micro Tag */}
          <div className="flex flex-col items-center gap-2 mb-6 text-center z-10 px-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] shadow-[0_0_8px_#ea580c]" />
              <h2 className="text-sm sm:text-base font-extrabold tracking-[0.25em] text-white uppercase">
                Plain GraFix
              </h2>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] shadow-[0_0_8px_#ea580c]" />
            </div>
            <p className="text-[11px] sm:text-xs font-mono tracking-widest text-[#ea580c]/90 uppercase h-4">
              {PHRASES[phraseIndex]}
            </p>
          </div>

          {/* Precision Horizontal Progress Indicator */}
          <div className="w-64 sm:w-80 flex flex-col gap-2 z-10">
            <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800/80 p-[1px]">
              <motion.div
                className="h-full bg-gradient-to-r from-[#ea580c] via-[#f97316] to-amber-300 rounded-full shadow-[0_0_12px_rgba(234,88,12,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>

            {/* Numerical Percentage Counter */}
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span className="flex items-center gap-1 text-[10px]">
                <Sparkles size={10} className="text-[#ea580c]" />
                CREATIVE STUDIO
              </span>
              <span className="text-white font-bold">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
