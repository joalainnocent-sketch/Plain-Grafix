import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, CheckCircle, Calendar, Sparkles, User, FileText, ArrowRight } from 'lucide-react';

interface PrioritiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProject?: () => void;
}

export const PrioritiesModal: React.FC<PrioritiesModalProps> = ({
  isOpen,
  onClose,
  onOpenProject,
}) => {
  const priorities = [
    {
      id: 1,
      time: '10:00 AM',
      title: 'Deep Design Review: Apex FinTech Rebrand',
      badge: 'High Priority',
      badgeColor: 'bg-[#ea580c]/20 text-[#ea580c] border-[#ea580c]/30',
      description: 'Reviewing 4 core identity directions, typography pairings, and responsive design systems with client leads.',
      status: 'Upcoming',
      isHero: true,
    },
    {
      id: 2,
      time: '02:30 PM',
      title: 'Motion Guidelines Hand-off',
      badge: 'Production',
      badgeColor: 'bg-white/10 text-white/90 border-white/20',
      description: 'Finalizing 3D motion transitions, micro-interactions, and Lottie asset exports.',
      status: 'Ready',
      isHero: false,
    },
    {
      id: 3,
      time: '04:45 PM',
      title: 'Packaging Proof Approvals',
      badge: 'Client Deliverable',
      badgeColor: 'bg-white/10 text-white/90 border-white/20',
      description: 'Sign off on custom foil stamp tolerances and sustainable unboxing materials.',
      status: 'In Queue',
      isHero: false,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden"
          >
            {/* Ambient amber glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ea580c]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-0.5 rounded-full text-xs font-semibold tracking-wide bg-white/10 text-white border border-white/20">
                Studio Vision
              </span>
              <span className="text-xs text-neutral-400">Creative Agency • Dedicated Craft</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome to <span className="text-[#ea580c]">Plain GraFix</span>
            </h3>
            <p className="text-base font-semibold text-neutral-200 mt-1">
              Where Ideas Become <span className="text-[#ea580c]">Powerful Visuals</span>.
            </p>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2 mb-6 leading-relaxed">
              From branding and graphic design to digital experiences, we turn your vision into creative work that gets noticed, remembered, and trusted. <span className="text-white font-medium">Let’s create something remarkable.</span>
            </p>

            {/* Priority Items */}
            <div className="space-y-3 mb-6">
              {priorities.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    item.isHero
                      ? 'bg-neutral-900 border-[#ea580c]/40 ring-1 ring-[#ea580c]/20'
                      : 'bg-neutral-900/50 border-neutral-800/80 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-xs font-semibold text-neutral-300">
                        <Clock size={13} className="text-[#ea580c]" />
                        {item.time}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-neutral-400">
                      {item.status}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom actions */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-900">
              <div className="text-xs text-neutral-500">
                Clarity. Creativity. Measurable impact.
              </div>
              <button
                onClick={() => {
                  onClose();
                  if (onOpenProject) onOpenProject();
                }}
                className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition flex items-center gap-1.5"
              >
                <span>Launch New Brief</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
