import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Zap,
  Compass,
  Palette,
  Layers,
  ShieldCheck,
  Eye,
  Phone,
  Mail,
  ChevronRight,
  Globe,
  Flame,
  Check,
  Copy,
  Instagram,
} from 'lucide-react';
import { CleanApertureLogo } from './Logo';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import {
  WhatsAppIcon,
  WHATSAPP_LINK,
  CALL_LINK,
  WHATSAPP_DISPLAY,
  EMAIL_ADDRESS,
  EMAIL_LINK,
  FACEBOOK_LINK,
  INSTAGRAM_LINK,
  INSTAGRAM_HANDLE,
} from './ContactOptions';

interface AboutPageProps {
  onBackToHome: () => void;
  onNavigateToJourney: () => void;
  onOpenProjectBrief: () => void;
  onOpenFaq: () => void;
  onOpenFeaturedWorks?: () => void;
  onOpenChat?: () => void;
}

type TabType = 'story' | 'services' | 'principles' | 'process';

export const AboutPage: React.FC<AboutPageProps> = ({
  onBackToHome,
  onNavigateToJourney,
  onOpenProjectBrief,
  onOpenFaq,
  onOpenFeaturedWorks,
  onOpenChat,
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('story');
  const [hasCopiedEmail, setHasCopiedEmail] = useState(false);
  const [aboutToast, setAboutToast] = useState<string | null>(null);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(EMAIL_ADDRESS);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = EMAIL_ADDRESS;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setHasCopiedEmail(true);
      setAboutToast(`Email copied: ${EMAIL_ADDRESS}`);
      setTimeout(() => setHasCopiedEmail(false), 2000);
      setTimeout(() => setAboutToast(null), 2500);
    } catch {
      setAboutToast(`Email: ${EMAIL_ADDRESS}`);
      setTimeout(() => setAboutToast(null), 2500);
    }
  };

  const stats = [
    { label: 'Projects Completed', value: '100+', desc: 'Across digital, physical, and venture brands' },
    { label: 'Client Satisfaction', value: '200%', desc: 'Repeat business & long-term creative retainers' },
    { label: 'Brand Recall Boost', value: '3.4x', desc: 'Measurable audience memory retention' },
    { label: 'Initial Briefing Turnaround', value: '24h', desc: 'Direct senior creative lead review' },
  ];

  const capabilities = [
    {
      title: 'Brand Identity & Visual Architecture',
      icon: Palette,
      desc: 'We craft unmistakable emblems, typographic hierarchies, color palettes, and comprehensive guideline books that establish instant category leadership.',
      deliverables: ['Custom Logo Marks & Symbols', 'Typography & Kerning Hierarchy', 'Color Chemistry & Contrast Systems', 'Vector Asset Master Suites (SVG/AI/EPS/PDF)'],
    },
    {
      title: 'Digital Experience & Web Design',
      icon: Layers,
      desc: 'High-converting digital journeys, responsive interactive platforms, and scalable design token systems that delight users on any viewport.',
      deliverables: ['Responsive Web & Mobile Layouts', 'Interactive Micro-interactions', 'Design Tokens & Component Libraries', 'Conversion-Optimized Landing Experiences'],
    },
    {
      title: 'Motion Design & Kinetic Art',
      icon: Zap,
      desc: 'Dynamic animations that bring brand narratives to life with fluid momentum, cinematic keyframes, and eye-catching social reel visuals.',
      deliverables: ['Animated Logo Reveal Sequences', 'Kinetic Social Campaign Assets', 'UI Transition Mechanics', 'High-Impact Brand Teasers'],
    },
    {
      title: 'Packaging & Tactile Collateral',
      icon: Compass,
      desc: 'Unforgettable tangible experiences that command shelf space, turn unboxing into a premium ritual, and inspire organic customer sharing.',
      deliverables: ['Luxury Box & Die-Cut Packaging', 'Custom Foil & Emboss Finishes', 'Corporate Stationery & Merchandising', 'Trade-Show & Environmental Graphics'],
    },
  ];

  const principles = [
    {
      number: '01',
      title: 'Craft Without Compromise',
      desc: 'We reject cookie-cutter templates, pre-made themes, and generic visual slop. Every curve, kerning pair, and color gradient is drawn with obsession.',
      tag: 'Pure Authenticity',
    },
    {
      number: '02',
      title: 'Design That Speaks',
      desc: 'True design is not decoration; it is clear, intentional communication. We strip away superficial noise until only pure, potent meaning remains.',
      tag: 'Clarity First',
    },
    {
      number: '03',
      title: 'Brands That Stick',
      desc: 'In an era of endless scrolling, we build visual anchors that lodge in the consumer mind, establishing durable emotional resonance and loyalty.',
      tag: 'Cognitive Impact',
    },
    {
      number: '04',
      title: 'Rapid Sprint Velocity',
      desc: 'No endless corporate bureaucracy or junior pass-offs. You collaborate directly with senior design leads on fast, laser-focused execution cycles.',
      tag: 'Zero Friction',
    },
  ];

  const processSteps = [
    {
      step: 'Step 01',
      title: 'Immersion & Strategic Discovery',
      desc: 'We analyze your competitive landscape, unpack your audience psychology, and define the singular strategic truth your brand must embody.',
    },
    {
      step: 'Step 02',
      title: 'Concept Exploration & Divergent Design',
      desc: 'We explore bold creative directions, testing radical metaphors and distinct aesthetics before converging on the most iconic solution.',
    },
    {
      step: 'Step 03',
      title: 'High-Fidelity Refinement & Systems',
      desc: 'Every touchpoint is locked down: micro-typography, responsive layouts, motion physics, color contrast, and production-ready assets.',
    },
    {
      step: 'Step 04',
      title: 'Production Hand-off & Ongoing Momentum',
      desc: 'Full vector asset packages, design systems, and direct launch support. You receive 100% intellectual property ownership from day one.',
    },
  ];

  return (
    <motion.div
      key="about-view"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[1440px] min-h-[92vh] bg-neutral-950/95 border-[1.5px] border-[#ea580c] rounded-[1.5rem] sm:rounded-[2.5rem] md:rounded-[3rem] p-4 sm:p-8 md:p-10 lg:p-12 xl:p-14 flex flex-col justify-between relative overflow-hidden shadow-[0_0_80px_-20px_rgba(234,88,12,0.35)] z-10 select-none text-white"
    >
      {/* Background Ambient Glow Accents */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[300px] bg-[#ea580c]/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[250px] bg-[#ea580c]/10 blur-[100px] rounded-full pointer-events-none" />

      {/* TOP HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 w-full relative z-20 pb-5 sm:pb-6 border-b border-neutral-800/80">
        {/* Brand Logo & Back to Home */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onBackToHome}
            className="group flex items-center justify-center p-1.5 sm:p-2 -ml-1 sm:-ml-2 rounded-full hover:bg-white/10 transition duration-200 focus:outline-none cursor-pointer"
            title="Return to Hero"
            aria-label="Back to Home"
            data-cursor-label="HOME"
          >
            <CleanApertureLogo size={34} className="group-hover:opacity-90 transition-opacity" />
          </button>

          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/5 border border-neutral-800 hover:border-[#ea580c]/60 text-xs sm:text-sm text-neutral-300 hover:text-white transition cursor-pointer"
            data-cursor-label="BACK"
          >
            <ArrowLeft size={13} className="text-[#ea580c]" />
            <span>{t('btn_back_to_home')}</span>
          </button>
        </div>

        {/* Navigation, Language Selector & Contact Bar */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
          {/* Language Selector Dropdown */}
          <LanguageSelector variant="compact" dropdownAlign="auto" />

          <button
            onClick={onNavigateToJourney}
            className="text-xs sm:text-sm font-medium tracking-tight px-2.5 sm:px-3.5 py-1.5 rounded-full bg-white/5 border border-neutral-800 hover:border-[#ea580c] text-white/90 hover:text-white transition cursor-pointer flex items-center gap-1.5"
            data-cursor-label="VISION"
          >
            <Sparkles size={13} className="text-[#ea580c]" />
            <span className="hidden xs:inline">{t('btn_vision_journey')}</span>
            <span className="xs:hidden">Vision</span>
          </button>

          <button
            onClick={onOpenFaq}
            className="text-xs sm:text-sm font-medium tracking-tight px-2.5 sm:px-3.5 py-1.5 rounded-full bg-white/5 border border-neutral-800 hover:border-neutral-700 text-white/80 hover:text-white transition cursor-pointer"
            data-cursor-label="FAQ"
          >
            {t('nav_faq')}
          </button>

          {/* Direct WhatsApp Callout */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#25D366] hover:bg-[#25D366]/20 text-xs sm:text-sm font-semibold px-2.5 sm:px-3 py-1.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/40 transition cursor-pointer flex items-center gap-1.5"
            data-cursor-label="WHATSAPP"
            title="Chat on WhatsApp"
          >
            <WhatsAppIcon size={13} />
            <span className="hidden md:inline">{t('whatsapp_chat_label')}</span>
          </a>

          {/* Primary CTA */}
          <button
            onClick={onOpenProjectBrief}
            className="bg-[#ea580c] hover:bg-[#c2410c] active:scale-95 text-white font-bold text-xs sm:text-sm px-3.5 sm:px-5 py-1.5 rounded-full transition shadow-[0_0_16px_rgba(234,88,12,0.4)] cursor-pointer"
            data-cursor-label="START"
          >
            {t('btn_start_project')}
          </button>
        </div>
      </header>

      {/* MAIN BODY SCROLLABLE CONTENT CONTAINER */}
      <div className="my-auto py-8 sm:py-10 relative z-10 space-y-10 lg:space-y-12">
        {/* HERO INTRO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 flex flex-col items-start">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#ea580c]/40 bg-[#ea580c]/10 text-xs sm:text-sm font-semibold text-[#ea580c] tracking-wide mb-4">
              <span className="w-2 h-2 rounded-full bg-[#ea580c] animate-pulse" />
              <span>THE PLAIN GRAFIX STORY</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-left">
              <span>We Don&apos;t Just Design.</span>
              <br />
              <span className="text-[#ea580c]">We Engineer Visual Power.</span>
            </h1>

            {/* Intro paragraph */}
            <p className="mt-5 text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed max-w-3xl">
              <strong className="text-white font-semibold">Plain GraFix</strong> is a bespoke graphic design and brand architecture company. We forge iconic visual identities, tactile digital systems, and memorable designs that command immediate attention, elevate market valuation, and turn casual observers into passionate brand advocates.
            </p>

            {/* Quick action buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenProjectBrief}
                className="bg-white text-black font-bold px-6 py-3 rounded-full text-sm sm:text-base hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer shadow-[0_0_25px_rgba(234,88,12,0.35)] flex items-center gap-2"
                data-cursor-label="BRIEF"
              >
                <span>Partner With Us</span>
                <ArrowUpRight size={16} />
              </button>

              <a
                href={CALL_LINK}
                className="px-5 py-3 rounded-full bg-neutral-900 border border-neutral-700 hover:border-white text-white font-medium text-sm sm:text-base hover:bg-neutral-800 transition cursor-pointer flex items-center gap-2"
                data-cursor-label="CALL"
              >
                <Phone size={15} />
                <span>Call {WHATSAPP_DISPLAY}</span>
              </a>
            </div>
          </div>

          {/* STATS BENTO PREVIEW */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3 sm:gap-4">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800/90 flex flex-col justify-between hover:border-[#ea580c]/50 transition-colors duration-200"
              >
                <span className="text-2xl sm:text-3xl font-black text-[#ea580c] tracking-tight">{s.value}</span>
                <div className="mt-2">
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">{s.label}</h4>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-tight">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NAVIGATION TABS FOR DEEP EXPLORATION */}
        <div className="border-t border-neutral-800/80 pt-8">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8">
            {[
              { id: 'story', label: 'Agency Philosophy', icon: Sparkles },
              { id: 'services', label: 'Capabilities & Deliverables', icon: Palette },
              { id: 'principles', label: 'The 4 Core Standards', icon: ShieldCheck },
              { id: 'process', label: 'Our Proven Sprint', icon: Compass },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#ea580c] text-white shadow-[0_0_20px_rgba(234,88,12,0.4)]'
                      : 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                  }`}
                  data-cursor-label={tab.label.toUpperCase()}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB CONTENT CAROUSEL/SWITCH */}
          <AnimatePresence mode="wait">
            {activeTab === 'story' && (
              <motion.div
                key="tab-story"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#ea580c]/15 text-[#ea580c] flex items-center justify-center mb-4">
                      <Flame size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-white">The Genesis</h3>
                    <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
                      Plain GraFix was built on a single, uncompromising premise: modern design was drowning in generic templates and cookie-cutter noise. We stripped the unnecessary layers away to create pure, electrifying craft.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-800 text-xs text-neutral-400">
                    Founded with a pure craft-first ethos.
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#ea580c]/15 text-[#ea580c] flex items-center justify-center mb-4">
                      <Eye size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-white">The Motto</h3>
                    <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
                      <em className="text-white font-serif">&ldquo;Design That Speaks. Brands That Stick.&rdquo;</em>
                      <br /><br />
                      If a mark doesn&apos;t command attention in the first three seconds, it is invisible. We engineer identity systems designed to be instantly remembered and impossible to ignore.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-800 text-xs text-neutral-400">
                    3.4x average verified increase in recall.
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#ea580c]/15 text-[#ea580c] flex items-center justify-center mb-4">
                      <Globe size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-white">Global Reach</h3>
                    <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
                      Operating from our South African design studio hub, we collaborate with ambitious visionary founders, venture-backed startups, and category leaders across the United Kingdom, United States, Europe, and Africa.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-800 text-xs text-neutral-400">
                    Direct studio hotline: {WHATSAPP_DISPLAY}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'services' && (
              <motion.div
                key="tab-services"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Featured Works Callout Banner */}
                {onOpenFeaturedWorks && (
                  <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-black border border-[#ea580c]/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_30px_rgba(234,88,12,0.15)]">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-[#ea580c] flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#ea580c]/30">
                        <Sparkles size={22} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#ea580c] uppercase tracking-wider">
                          High-Resolution Deliverables
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-white">
                          Explore Our 'Featured Works' Gallery
                        </h4>
                        <p className="text-xs text-neutral-400">
                          View real-world client brand systems, packaging boxes, and digital interfaces in full resolution.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={onOpenFeaturedWorks}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 shrink-0 shadow-[0_0_20px_rgba(234,88,12,0.4)] cursor-pointer"
                    >
                      <span>View Featured Works</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {capabilities.map((c, idx) => {
                    const Icon = c.icon;
                    return (
                      <div
                        key={idx}
                        className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 hover:border-[#ea580c]/60 transition duration-200"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-[#ea580c]/15 text-[#ea580c] flex items-center justify-center">
                            <Icon size={20} />
                          </div>
                          <h3 className="text-lg font-bold text-white">{c.title}</h3>
                        </div>
                        <p className="text-sm text-neutral-300 mb-4 leading-relaxed">{c.desc}</p>
                        <div className="space-y-2 border-t border-neutral-800 pt-3">
                          {c.deliverables.map((d, dIdx) => (
                            <div key={dIdx} className="flex items-center gap-2 text-xs text-neutral-300">
                              <CheckCircle2 size={13} className="text-[#ea580c] shrink-0" />
                              <span>{d}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === 'principles' && (
              <motion.div
                key="tab-principles"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {principles.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl font-black text-[#ea580c] font-mono">{p.number}</span>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300">
                          {p.tag}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                      <p className="text-xs text-neutral-300 leading-relaxed">{p.desc}</p>
                    </div>
                    <div className="mt-6 pt-3 border-t border-neutral-800 flex items-center gap-1.5 text-xs text-[#ea580c]">
                      <CheckCircle2 size={12} />
                      <span>Studio Guarantee</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'process' && (
              <motion.div
                key="tab-process"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {processSteps.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 relative flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-mono font-bold text-[#ea580c] uppercase tracking-wider block mb-2">
                        {s.step}
                      </span>
                      <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                      <p className="text-xs text-neutral-300 leading-relaxed">{s.desc}</p>
                    </div>
                    <div className="mt-6 pt-3 border-t border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between">
                      <span>Phase 0{idx + 1}</span>
                      <ChevronRight size={14} className="text-[#ea580c]" />
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* BOTTOM DIRECT REACH & INQUIRY BANNER */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-black border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-start text-left">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#ea580c] mb-1">
              <Sparkles size={14} />
              <span>DIRECT STUDIO LINE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">Ready to Elevate Your Brand?</h3>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl">
              Connect directly with our senior designers via WhatsApp, phone call, or email. We respond to initial briefs within 24 hours.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-start md:justify-end">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs sm:text-sm transition active:scale-95 shadow-[0_0_16px_rgba(37,211,102,0.3)]"
              data-cursor-label="WHATSAPP"
            >
              <WhatsAppIcon size={14} className="text-black" />
              <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
            </a>

            <a
              href={CALL_LINK}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-black font-bold text-xs sm:text-sm transition active:scale-95 shadow-sm"
              data-cursor-label="CALL"
            >
              <Phone size={13} className="fill-black" />
              <span>Direct Call</span>
            </a>

            <a
              href={EMAIL_LINK}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs sm:text-sm transition active:scale-95 shadow-sm"
              data-cursor-label="EMAIL"
            >
              <Mail size={13} />
              <span>Email Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-800/80 relative z-20 text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <span>Plain GraFix • All Rights Reserved © {new Date().getFullYear()}</span>
          <span className="text-neutral-600">•</span>
          <span className="font-mono text-neutral-300">{WHATSAPP_DISPLAY}</span>
        </div>

        <div className="flex items-center gap-4">
          {onOpenChat && (
            <div className="relative group/about-chat flex items-center">
              <button
                onClick={onOpenChat}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ea580c]/15 hover:bg-[#ea580c]/25 border border-[#ea580c]/40 text-white text-[11px] font-semibold transition cursor-pointer"
                data-cursor-label="CHAT"
                title="Open Plain AI Gemini Consultant"
              >
                <Sparkles size={11} className="text-[#ea580c]" />
                <span>Plain AI</span>
              </button>
              <div
                role="tooltip"
                className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700/80 text-white text-[10px] font-medium pointer-events-none opacity-0 scale-95 group-hover/about-chat:opacity-100 group-hover/about-chat:scale-100 group-focus-within/about-chat:opacity-100 group-focus-within/about-chat:scale-100 transition-all duration-200 z-30 whitespace-nowrap"
              >
                Gemini AI Chatbot
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-neutral-900 border-b border-r border-neutral-700/80 rotate-45" />
              </div>
            </div>
          )}

          {/* WhatsApp Direct */}
          <div className="relative group/about-social flex items-center justify-center">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Direct (+27 69 702 2221)"
              data-cursor-label="WHATSAPP"
              className="social-bounce-shake flex items-center gap-1 px-2.5 py-1 rounded-full border border-neutral-700/80 text-neutral-300 hover:text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366]/10 text-[11px] font-medium transition cursor-pointer"
              title="WhatsApp: +27 69 702 2221"
            >
              <WhatsAppIcon size={12} className="social-icon-shake text-current" />
              <span>WhatsApp</span>
            </a>
            <div
              role="tooltip"
              className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700/80 text-white text-[10px] font-medium pointer-events-none opacity-0 scale-95 group-hover/about-social:opacity-100 group-hover/about-social:scale-100 group-focus-within/about-social:opacity-100 group-focus-within/about-social:scale-100 transition-all duration-200 z-30 whitespace-nowrap flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
              <span>+27 69 702 2221</span>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-neutral-900 border-b border-r border-neutral-700/80 rotate-45" />
            </div>
          </div>

          {/* Instagram Link */}
          <div className="relative group/about-social flex items-center justify-center">
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Plain GraFix Instagram (@plain_grafix)"
              data-cursor-label="INSTAGRAM"
              className="social-bounce-shake flex items-center gap-1 px-2.5 py-1 rounded-full border border-neutral-700/80 text-neutral-300 hover:text-[#E1306C] hover:border-[#E1306C] hover:bg-gradient-to-tr hover:from-[#F58529]/15 hover:via-[#DD2A7B]/15 hover:to-[#8134AF]/15 text-[11px] font-medium transition cursor-pointer"
              title="Instagram: @plain_grafix"
            >
              <Instagram size={12} className="social-icon-shake text-current" />
              <span>Instagram</span>
            </a>
            <div
              role="tooltip"
              className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700/80 text-white text-[10px] font-medium pointer-events-none opacity-0 scale-95 group-hover/about-social:opacity-100 group-hover/about-social:scale-100 group-focus-within/about-social:opacity-100 group-focus-within/about-social:scale-100 transition-all duration-200 z-30 whitespace-nowrap flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E1306C]" />
              <span>{INSTAGRAM_HANDLE}</span>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-neutral-900 border-b border-r border-neutral-700/80 rotate-45" />
            </div>
          </div>

          {/* Facebook Link */}
          <div className="relative group/about-social flex items-center justify-center">
            <a
              href={FACEBOOK_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="social-bounce-shake flex items-center gap-1 px-2.5 py-1 rounded-full border border-neutral-700/80 text-neutral-300 hover:text-[#1877F2] hover:border-[#1877F2] hover:bg-[#1877F2]/10 text-[11px] font-medium transition cursor-pointer"
              data-cursor-label="FACEBOOK"
              title="Facebook: Plain GraFix"
            >
              <span className="social-icon-shake font-bold text-xs leading-none">f</span>
              <span>Facebook</span>
            </a>
            <div
              role="tooltip"
              className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700/80 text-white text-[10px] font-medium pointer-events-none opacity-0 scale-95 group-hover/about-social:opacity-100 group-hover/about-social:scale-100 group-focus-within/about-social:opacity-100 group-focus-within/about-social:scale-100 transition-all duration-200 z-30 whitespace-nowrap"
            >
              Facebook
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-neutral-900 border-b border-r border-neutral-700/80 rotate-45" />
            </div>
          </div>

          {/* Email Copy Pill */}
          <div className="relative group/about-copy-email flex items-center justify-center">
            <button
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              data-cursor-label="COPY EMAIL"
              className={`social-bounce-shake flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-medium transition cursor-pointer ${
                hasCopiedEmail
                  ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                  : 'border-neutral-700/80 text-neutral-300 hover:text-white hover:border-[#ea580c] hover:bg-[#ea580c]/10'
              }`}
              title={`Click to copy: ${EMAIL_ADDRESS}`}
            >
              {hasCopiedEmail ? <Check size={11} className="text-emerald-400" /> : <Mail size={11} className="social-icon-shake" />}
              <span>{hasCopiedEmail ? 'Copied' : 'Email'}</span>
            </button>
            <div
              role="tooltip"
              className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700/80 text-white text-[10px] font-medium pointer-events-none opacity-0 scale-95 group-hover/about-copy-email:opacity-100 group-hover/about-copy-email:scale-100 group-focus-within/about-copy-email:opacity-100 group-focus-within/about-copy-email:scale-100 transition-all duration-200 z-30 whitespace-nowrap flex items-center gap-1"
            >
              {hasCopiedEmail ? (
                <>
                  <Check size={10} className="text-emerald-400" />
                  <span className="text-emerald-300">Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={10} className="text-neutral-400" />
                  <span>Copy {EMAIL_ADDRESS}</span>
                </>
              )}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-neutral-900 border-b border-r border-neutral-700/80 rotate-45" />
            </div>
          </div>
        </div>
      </footer>

      {/* Toast Feedback for Copy Action */}
      {aboutToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-neutral-900 border border-neutral-700 text-white text-xs sm:text-sm rounded-full shadow-2xl animate-fade-in flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          <span>{aboutToast}</span>
        </div>
      )}
    </motion.div>
  );
};
