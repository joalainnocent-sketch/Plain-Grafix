import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface NavSectionModalProps {
  section: 'About' | 'Results' | 'Services' | 'Process' | null;
  onClose: () => void;
  onOpenProject: () => void;
  onOpenAbout?: () => void;
  onOpenFeaturedWorks?: () => void;
}

export const NavSectionModal: React.FC<NavSectionModalProps> = ({
  section,
  onClose,
  onOpenProject,
  onOpenAbout,
  onOpenFeaturedWorks,
}) => {

  const contentMap = {
    About: {
      title: 'About Plain GraFix',
      subtitle: 'Design That Speaks. Brands That Stick.',
      badge: 'Agency Philosophy',
      description:
        'Plain GraFix is a bespoke brand transformation and graphic design company. We forge iconic identities, tactile digital systems, and memorable visuals that command attention and convert curiosity into enduring loyalty.',
      highlights: [
        'Founded with a pure craft-first ethos',
        'Award-winning multidisciplinary designers',
        'Zero fluff, rapid sprint-based delivery',
        'Global roster of venture-backed startups & category leaders',
      ],
    },
    Results: {
      title: 'Measurable Results',
      subtitle: '100+ Projects Completed • 200% Satisfaction',
      badge: 'Client Impact',
      description:
        'Our design deliverables do not just look stunning—they drive verifiable commercial growth, higher brand valuations, and industry recognition.',
      highlights: [
        '3.4x average increase in brand recall post-launch',
        '100+ end-to-end design systems shipped worldwide',
        '200% client satisfaction and repeat engagement rate',
        'Featured across top international design showcases',
      ],
    },
    Services: {
      title: 'Our Core Services',
      subtitle: 'Comprehensive Brand & Visual Architecture',
      badge: 'Capabilities',
      description:
        'From high-precision visual identities to full-scale digital product design and motion design, we handle every touchpoint of your brand narrative.',
      highlights: [
        'Brand Identity & Guideline Systems',
        'Art Direction & Bespoke 3D Graphics',
        'High-Converting Web & UI/UX Design',
        'Packaging, Print & Physical Unboxing',
      ],
    },
    Process: {
      title: 'Our Proven Process',
      subtitle: 'Clarity. Creativity. Measurable Impact.',
      badge: 'The 4-Step Sprint',
      description:
        'We replace endless stakeholder meetings with focused, high-cadence design sprints where you collaborate directly with senior design leads.',
      highlights: [
        '01. Discovery & Strategic Immersion',
        '02. Concept Exploration & Deep Design Review',
        '03. High-Fidelity Refinement & Design Systems',
        '04. Production Hand-off & Launch Acceleration',
      ],
    },
  };

  const current = section ? contentMap[section] : null;

  return (
    <AnimatePresence>
      {section && current && (
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
          {/* Ambient glow */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#ea580c]/15 rounded-full blur-3xl pointer-events-none" />

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
              {current.badge}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {current.title}
          </h3>
          <p className="text-sm font-medium text-[#ea580c] mt-0.5 mb-3">
            {current.subtitle}
          </p>
          <p className="text-sm text-neutral-300 leading-relaxed mb-6">
            {current.description}
          </p>

          <div className="bg-neutral-900/70 border border-neutral-800/80 rounded-2xl p-4 mb-6 space-y-2.5">
            {current.highlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                <CheckCircle2 size={16} className="text-[#ea580c] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-neutral-900">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="text-xs text-neutral-400 hover:text-white transition cursor-pointer"
              >
                Close
              </button>
              {section === 'Services' && onOpenFeaturedWorks && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenFeaturedWorks();
                  }}
                  className="text-xs text-[#ea580c] hover:underline transition cursor-pointer flex items-center gap-1 font-semibold"
                >
                  <span>View Featured Works Showcase</span>
                  <ArrowUpRight size={12} />
                </button>
              )}
              {onOpenAbout && section !== 'Services' && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenAbout();
                  }}
                  className="text-xs text-[#ea580c] hover:underline transition cursor-pointer flex items-center gap-1 font-medium"
                >
                  <span>Open Full About Page</span>
                  <ArrowUpRight size={12} />
                </button>
              )}
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenProject();
              }}
              className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs sm:text-sm hover:bg-neutral-200 transition flex items-center gap-1.5 shadow-[0_0_20px_rgba(234,88,12,0.3)] cursor-pointer"
            >
              <span>Start Your Project</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
