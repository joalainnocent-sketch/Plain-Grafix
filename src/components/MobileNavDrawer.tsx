import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  Gift,
  HelpCircle,
  Briefcase,
  TrendingUp,
  Workflow,
  ArrowUpRight,
  Phone,
  Mail,
  Check,
  Copy,
  Instagram,
} from 'lucide-react';
import { CleanApertureLogo } from './Logo';
import { LanguageSelector } from './LanguageSelector';
import {
  WhatsAppIcon,
  WHATSAPP_LINK,
  CALL_LINK,
  WHATSAPP_DISPLAY,
  EMAIL_ADDRESS,
  FACEBOOK_LINK,
  INSTAGRAM_LINK,
  INSTAGRAM_HANDLE,
} from './ContactOptions';
import { useLanguage } from '../context/LanguageContext';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (destination: 'about' | 'journey' | 'results' | 'services' | 'process') => void;
  onOpenProjectBrief: () => void;
  onOpenFaq: () => void;
  onOpenReferral: () => void;
  onOpenFeaturedWorks: () => void;
  onOpenChat: () => void;
  hasCopiedEmail: boolean;
  onCopyEmail: () => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenProjectBrief,
  onOpenFaq,
  onOpenReferral,
  onOpenFeaturedWorks,
  onOpenChat,
  hasCopiedEmail,
  onCopyEmail,
}) => {
  const { t } = useLanguage();

  // Close when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end" id="mobile-nav-drawer-root">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Drawer Slide-over Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-sm sm:max-w-md h-full bg-neutral-950 border-l border-neutral-800 flex flex-col justify-between p-5 sm:p-6 shadow-2xl z-10 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Ambient Backlight Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ea580c]/15 blur-3xl rounded-full pointer-events-none" />

            {/* TOP HEADER OF DRAWER */}
            <div className="relative z-10">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-black/80 border border-[#ea580c]/50 flex items-center justify-center p-1">
                    <CleanApertureLogo size={22} />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white tracking-tight">Plain GraFix</span>
                    <span className="block text-[10px] text-[#ea580c] font-mono tracking-wider uppercase">Menu</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Language Selector Dropdown inside Drawer */}
                  <LanguageSelector variant="compact" dropdownAlign="right" />

                  {/* Close Icon Button */}
                  <button
                    onClick={onClose}
                    className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-[#ea580c] flex items-center justify-center transition cursor-pointer"
                    aria-label="Close navigation menu"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* PRIMARY NAVIGATION LINKS */}
              <nav className="mt-5 space-y-1.5" aria-label="Mobile Menu Navigation">
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('about');
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl bg-white/5 hover:bg-[#ea580c]/15 border border-neutral-800 hover:border-[#ea580c]/50 text-white transition text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#ea580c] group-hover:scale-105 transition-transform">
                      <Sparkles size={15} />
                    </div>
                    <div>
                      <span className="text-sm font-bold block text-white group-hover:text-[#ea580c] transition-colors">
                        {t('nav_about')}
                      </span>
                      <span className="text-[11px] text-neutral-400">Story, Ethos & Craft</span>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-neutral-500 group-hover:text-[#ea580c] group-hover:translate-x-0.5 transition-all" />
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenFeaturedWorks();
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl bg-white/5 hover:bg-[#ea580c]/15 border border-neutral-800 hover:border-[#ea580c]/50 text-white transition text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#ea580c] group-hover:scale-105 transition-transform">
                      <Briefcase size={15} />
                    </div>
                    <div>
                      <span className="text-sm font-bold block text-white group-hover:text-[#ea580c] transition-colors">
                        {t('nav_services')}
                      </span>
                      <span className="text-[11px] text-neutral-400">Featured Works & Capabilities</span>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-neutral-500 group-hover:text-[#ea580c] group-hover:translate-x-0.5 transition-all" />
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onNavigate('results');
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl bg-white/5 hover:bg-[#ea580c]/15 border border-neutral-800 hover:border-[#ea580c]/50 text-white transition text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#ea580c] group-hover:scale-105 transition-transform">
                      <TrendingUp size={15} />
                    </div>
                    <div>
                      <span className="text-sm font-bold block text-white group-hover:text-[#ea580c] transition-colors">
                        {t('nav_results')}
                      </span>
                      <span className="text-[11px] text-neutral-400">100+ Projects & Metrics</span>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-neutral-500 group-hover:text-[#ea580c] group-hover:translate-x-0.5 transition-all" />
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onNavigate('process');
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl bg-white/5 hover:bg-[#ea580c]/15 border border-neutral-800 hover:border-[#ea580c]/50 text-white transition text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#ea580c] group-hover:scale-105 transition-transform">
                      <Workflow size={15} />
                    </div>
                    <div>
                      <span className="text-sm font-bold block text-white group-hover:text-[#ea580c] transition-colors">
                        {t('nav_process')}
                      </span>
                      <span className="text-[11px] text-neutral-400">Design Sprint & Execution</span>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-neutral-500 group-hover:text-[#ea580c] group-hover:translate-x-0.5 transition-all" />
                </button>

                {/* FAQ Link */}
                <button
                  onClick={() => {
                    onClose();
                    onOpenFaq();
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl bg-white/5 hover:bg-[#ea580c]/15 border border-neutral-800 hover:border-[#ea580c]/50 text-white transition text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#ea580c] group-hover:scale-105 transition-transform">
                      <HelpCircle size={15} />
                    </div>
                    <div>
                      <span className="text-sm font-bold block text-white group-hover:text-[#ea580c] transition-colors">
                        {t('nav_faq')}
                      </span>
                      <span className="text-[11px] text-neutral-400">Pricing, Sprints & Guarantees</span>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-neutral-500 group-hover:text-[#ea580c] group-hover:translate-x-0.5 transition-all" />
                </button>

                {/* Referral Link */}
                <button
                  onClick={() => {
                    onClose();
                    onOpenReferral();
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl bg-white/5 hover:bg-[#ea580c]/15 border border-neutral-800 hover:border-[#ea580c]/50 text-white transition text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#ea580c] group-hover:scale-105 transition-transform">
                      <Gift size={15} />
                    </div>
                    <div>
                      <span className="text-sm font-bold block text-white group-hover:text-[#ea580c] transition-colors">
                        {t('nav_referral')}
                      </span>
                      <span className="text-[11px] text-neutral-400">Earn Studio Credit Rewards</span>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-neutral-500 group-hover:text-[#ea580c] group-hover:translate-x-0.5 transition-all" />
                </button>
              </nav>

              {/* SECONDARY QUICK ACTIONS: Gemini AI Consultant */}
              <div className="mt-4 pt-4 border-t border-neutral-800/80">
                <button
                  onClick={() => {
                    onClose();
                    onOpenChat();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#ea580c]/15 hover:bg-[#ea580c]/25 border border-[#ea580c]/50 text-white text-xs font-semibold transition cursor-pointer shadow-[0_0_15px_rgba(234,88,12,0.2)]"
                >
                  <Sparkles size={13} className="text-[#ea580c] animate-pulse" />
                  <span>Chat with Plain AI Consultant</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </button>
              </div>
            </div>

            {/* BOTTOM SECTION: Primary Start Project CTA & Contact Channels */}
            <div className="mt-6 pt-5 border-t border-neutral-800/90 relative z-10 space-y-4">
              {/* Primary Call to Action */}
              <button
                onClick={() => {
                  onClose();
                  onOpenProjectBrief();
                }}
                className="w-full bg-[#ea580c] hover:bg-[#c2410c] active:scale-95 text-white font-bold py-3.5 px-6 rounded-full text-sm transition shadow-[0_0_25px_rgba(234,88,12,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t('btn_start_project')}</span>
                <ArrowUpRight size={16} />
              </button>

              {/* Direct Quick Contact Pills */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#25D366]/10 border border-[#25D366]/40 text-[#25D366] text-xs font-semibold hover:bg-[#25D366]/20 transition"
                  title="WhatsApp"
                >
                  <WhatsAppIcon size={14} />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={CALL_LINK}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-neutral-700 text-white text-xs font-semibold hover:bg-white/10 transition"
                  title="Call Phone"
                >
                  <Phone size={13} />
                  <span>Call Us</span>
                </a>
              </div>

              {/* Email & Facebook Footer */}
              <div className="flex items-center justify-between pt-2 text-xs text-neutral-400">
                {/* Copy Email Button */}
                <button
                  onClick={onCopyEmail}
                  className="flex items-center gap-1.5 hover:text-white transition cursor-pointer text-left"
                  title="Click to copy contact email"
                >
                  {hasCopiedEmail ? (
                    <>
                      <Check size={13} className="text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} className="text-neutral-400" />
                      <span className="truncate max-w-[170px]">{EMAIL_ADDRESS}</span>
                    </>
                  )}
                </button>

                {/* Instagram Link */}
                <a
                  href={INSTAGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-bounce-shake hover:text-[#E1306C] transition flex items-center gap-1 font-semibold"
                  title="Instagram: @plain_grafix"
                >
                  <Instagram size={14} className="social-icon-shake" />
                  <span>Instagram</span>
                  <ArrowUpRight size={12} />
                </a>

                {/* Facebook Link */}
                <a
                  href={FACEBOOK_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-bounce-shake hover:text-[#1877F2] transition flex items-center gap-1 font-semibold"
                  title="Facebook: Plain GraFix"
                >
                  <span className="social-icon-shake font-bold text-xs">f</span>
                  <span>Facebook</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
