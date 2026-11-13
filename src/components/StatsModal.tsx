import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';

interface StatsModalProps {
  type: 'projects' | 'satisfaction' | null;
  onClose: () => void;
  onOpenProject: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  type,
  onClose,
  onOpenProject,
}) => {
  const isProjects = type === 'projects';

  return (
    <AnimatePresence>
      {type && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-xl bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden"
        >
          {/* Glow */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-[#ea580c]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-0.5 rounded-full text-xs font-semibold tracking-wide bg-[#ea580c]/15 text-[#ea580c] border border-[#ea580c]/30">
              {isProjects ? 'Portfolio Metric' : 'Client Success'}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {isProjects ? '100+ Completed Projects' : '200% Client Satisfaction'}
          </h3>
          <p className="text-sm text-neutral-400 mt-1 mb-6">
            {isProjects
              ? 'Over a hundred iconic brands, products, and visual identities crafted across 14 countries.'
              : 'Our clients do not just stay satisfied—over 82% expand their scope and refer Plain GraFix within 6 months.'}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {isProjects ? (
              <>
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4">
                  <div className="text-2xl font-black text-white">48+</div>
                  <div className="text-xs text-neutral-400 mt-1">Brand Identity Systems</div>
                </div>
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4">
                  <div className="text-2xl font-black text-[#ea580c]">36+</div>
                  <div className="text-xs text-neutral-400 mt-1">Web & Digital Launches</div>
                </div>
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4">
                  <div className="text-2xl font-black text-[#ea580c]">24+</div>
                  <div className="text-xs text-neutral-400 mt-1">Packaging & Print Runs</div>
                </div>
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4">
                  <div className="text-2xl font-black text-white">99.4%</div>
                  <div className="text-xs text-neutral-400 mt-1">On-Time Sprint Delivery</div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4">
                  <div className="text-2xl font-black text-[#ea580c]">4.98/5</div>
                  <div className="text-xs text-neutral-400 mt-1">Average Client Rating</div>
                </div>
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4">
                  <div className="text-2xl font-black text-white">82%</div>
                  <div className="text-xs text-neutral-400 mt-1">Repeat Partnership Rate</div>
                </div>
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4">
                  <div className="text-2xl font-black text-white">14</div>
                  <div className="text-xs text-neutral-400 mt-1">International Design Awards</div>
                </div>
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4">
                  <div className="text-2xl font-black text-[#ea580c]">100%</div>
                  <div className="text-xs text-neutral-400 mt-1">Ownership & Asset Transfer</div>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-neutral-900">
            <button
              onClick={onClose}
              className="text-xs text-neutral-400 hover:text-white transition"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenProject();
              }}
              className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs sm:text-sm hover:bg-neutral-200 transition flex items-center gap-1.5 shadow-[0_0_20px_rgba(234,88,12,0.3)]"
            >
              <span>Start Your Project</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
