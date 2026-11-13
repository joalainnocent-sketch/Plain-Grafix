import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Gift, Sparkles, Mail, Check, Copy, Menu, Instagram } from 'lucide-react';
import { CleanApertureLogo } from './components/Logo';
import { ProjectModal } from './components/ProjectModal';
import { PrioritiesModal } from './components/PrioritiesModal';
import { NavSectionModal } from './components/NavSectionModal';
import { StatsModal } from './components/StatsModal';
import { VisionJourney } from './components/VisionJourney';
import { AboutPage } from './components/AboutPage';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { CustomCursor } from './components/CustomCursor';
import { FaqModal } from './components/FaqModal';
import { FeaturedWorksModal } from './components/FeaturedWorksModal';
import { ReferralModal } from './components/ReferralModal';
import { GeminiChatbot } from './components/GeminiChatbot';
import { CoolLoader } from './components/CoolLoader';
import { AudioPlayer } from './components/AudioPlayer';
import { TestimonialSlider } from './components/TestimonialSlider';
import { MobileNavDrawer } from './components/MobileNavDrawer';
import {
  FACEBOOK_LINK,
  INSTAGRAM_LINK,
  INSTAGRAM_HANDLE,
  WHATSAPP_LINK,
  WhatsAppIcon,
  EMAIL_ADDRESS,
} from './components/ContactOptions';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { LanguageSelector } from './components/LanguageSelector';

function AppContent() {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState<'hero' | 'journey' | 'about'>('hero');
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectInitialService, setProjectInitialService] = useState<string | undefined>(undefined);
  const [isFeaturedWorksOpen, setIsFeaturedWorksOpen] = useState(false);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [isPrioritiesModalOpen, setIsPrioritiesModalOpen] = useState(false);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNavSection, setActiveNavSection] = useState<'About' | 'Results' | 'Services' | 'Process' | null>(null);
  const [activeStatType, setActiveStatType] = useState<'projects' | 'satisfaction' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hasCopiedEmail, setHasCopiedEmail] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const videoUrl = "https://res.cloudinary.com/nac8cpnc/video/upload/v1787401419/kling_20260822_VIDEO__4962_0_1.mov";

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => setToastMessage(null), 2500);
  };

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
      showToast(`Email copied: ${EMAIL_ADDRESS}`);
      setTimeout(() => setHasCopiedEmail(false), 2000);
    } catch {
      showToast(`Email: ${EMAIL_ADDRESS}`);
    }
  };

  return (
    <main className="min-h-screen w-full relative flex items-center justify-center p-3 sm:p-5 md:p-6 lg:p-8 select-none overflow-x-hidden bg-black">
      {/* High-Tech Futuristic Agency Loader with Aperture Rings & Progress Counter */}
      <CoolLoader />

      {/* Premium Design Agency Interactive Follower Cursor */}
      <CustomCursor />

      {/* Glowing Orange Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Background Video Layer */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl} type="video/quicktime" />
          Your browser does not support the video tag.
        </video>
        {/* Subtle dark vignette overlay to ensure text contrast while keeping video fully visible */}
        <div className="absolute inset-0 bg-black/25 backdrop-brightness-[0.85] pointer-events-none" />
      </div>

      <AnimatePresence mode="wait">
        {currentPage === 'hero' ? (
          /* Main Orange-Framed Hero Board - Transparent Background */
          <motion.div
            key="hero-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[1440px] min-h-[92vh] lg:min-h-[880px] bg-transparent border-[1.5px] border-[#ea580c] rounded-[1.75rem] sm:rounded-[2.5rem] md:rounded-[3rem] p-4 sm:p-7 md:p-10 lg:p-12 xl:p-14 flex flex-col justify-between relative overflow-hidden shadow-[0_0_80px_-20px_rgba(234,88,12,0.35)] z-10"
          >
            {/* Subtle background radial light behind the CTA button */}
            <div className="absolute top-[42%] left-[12%] w-[320px] h-[180px] bg-[#ea580c]/20 blur-[90px] rounded-full pointer-events-none" />

            {/* TOP NAVIGATION BAR */}
            <header className="flex items-center justify-between w-full relative z-10">
              {/* Logo Brand Mark (Top Left) */}
              <button
                onClick={() => showToast('Plain GraFix • Crafting iconic identities')}
                className="group flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
                aria-label="Plain GraFix Home"
                data-cursor-label="PG"
              >
                <CleanApertureLogo size={36} className="group-hover:opacity-90 transition-opacity sm:w-[40px] sm:h-[40px]" />
              </button>

              {/* Desktop Navigation Links & Language Dropdown (Hidden on mobile/tablet, shown on lg+) */}
              <div className="hidden lg:flex items-center gap-5 md:gap-7 lg:gap-9">
                <nav className="flex items-center gap-5 md:gap-7 lg:gap-9" aria-label="Main Navigation">
                  {[
                    { key: 'About' as const, label: t('nav_about') },
                    { key: 'Results' as const, label: t('nav_results') },
                    { key: 'Services' as const, label: t('nav_services') },
                    { key: 'Process' as const, label: t('nav_process') },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => {
                        if (item.key === 'About') {
                          setCurrentPage('about');
                        } else if (item.key === 'Services') {
                          setIsFeaturedWorksOpen(true);
                        } else {
                          setActiveNavSection(item.key);
                        }
                      }}
                      className="text-white/90 hover:text-white text-xs sm:text-sm md:text-base font-normal tracking-tight transition-colors duration-200 focus:outline-none relative group cursor-pointer whitespace-nowrap"
                      data-cursor-label={item.key.toUpperCase()}
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#ea580c] group-hover:w-full transition-all duration-300" />
                    </button>
                  ))}
                  {/* Dedicated FAQ Navigation Button */}
                  <button
                    onClick={() => setIsFaqModalOpen(true)}
                    className="text-white/90 hover:text-white text-xs sm:text-sm md:text-base font-normal tracking-tight transition-colors duration-200 focus:outline-none relative group cursor-pointer flex items-center gap-1 whitespace-nowrap"
                    data-cursor-label="FAQ"
                  >
                    <span>{t('nav_faq')}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] animate-pulse" />
                    <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#ea580c] group-hover:w-full transition-all duration-300" />
                  </button>

                  {/* Dedicated Refer a Client Navigation Button */}
                  <button
                    onClick={() => setIsReferralModalOpen(true)}
                    className="text-white/90 hover:text-white text-xs sm:text-sm md:text-base font-normal tracking-tight transition-colors duration-200 focus:outline-none relative group cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                    data-cursor-label="REFERRAL"
                    title="Refer a Client & Earn Studio Credit"
                  >
                    <Gift size={14} className="text-[#ea580c]" />
                    <span>{t('nav_referral')}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#ea580c] group-hover:w-full transition-all duration-300" />
                  </button>
                </nav>

                {/* Accessible Language Selection Dropdown (South African & International) */}
                <LanguageSelector variant="compact" />
              </div>

              {/* Mobile Controls: Language Selector + Hamburger Menu Button (Shown on mobile & tablet) */}
              <div className="flex lg:hidden items-center gap-2">
                <LanguageSelector variant="compact" dropdownAlign="right" />
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-900/90 border border-neutral-700/80 text-white hover:border-[#ea580c] hover:bg-neutral-800 transition active:scale-95 cursor-pointer shadow-lg"
                  aria-label="Open mobile navigation menu"
                >
                  <Menu size={20} className="text-white" />
                </button>
              </div>
            </header>

            {/* HERO MAIN BODY GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-start my-auto py-6 sm:py-10 md:py-12 relative z-10">
              
              {/* LEFT COLUMN: Agency Headline, CTA & Stat Cards */}
              <div className="lg:col-span-7 flex flex-col items-start">
                {/* Pill Badge */}
                <button
                  onClick={() => setCurrentPage('about')}
                  className="inline-flex items-center justify-center px-3.5 sm:px-4 py-1 rounded-full border border-neutral-700/80 bg-black/40 text-xs sm:text-sm font-medium text-white/90 tracking-wide mb-5 sm:mb-8 hover:border-[#ea580c]/60 hover:text-white transition cursor-pointer"
                  data-cursor-label="ABOUT"
                >
                  {t('hero_badge')}
                </button>

                {/* Giant Title Typography */}
                <h1 className="text-[2.6rem] xs:text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.4rem] xl:text-[6.1rem] font-bold tracking-tight leading-[1.05] text-left">
                  <span className="text-white">{t('hero_title_line1')}</span>
                  <span className="text-[#ea580c]">{t('hero_title_accent1')}</span>
                  {t('hero_title_accent2') ? (
                    <>
                      <br />
                      <span className="text-[#ea580c]">{t('hero_title_accent2')}</span>
                    </>
                  ) : null}
                  <br />
                  <span className="text-white">{t('hero_title_line3')}</span>
                  {t('hero_title_accent4') ? (
                    <>
                      <br />
                      <span className="text-[#ea580c]">{t('hero_title_accent4')}</span>
                    </>
                  ) : null}
                </h1>

                {/* Call to Action Button with Orange Halo Glow -> Navigates to Vision Section */}
                <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mt-6 sm:mt-10 mb-6 sm:mb-12">
                  <div className="relative group">
                    {/* Backlight glowing aura behind the button */}
                    <div className="absolute inset-0 bg-[#ea580c] blur-xl opacity-75 rounded-full scale-105 pointer-events-none orange-glow-pulse" />
                    
                    <button
                      onClick={() => setCurrentPage('journey')}
                      className="relative z-10 bg-white text-black font-bold px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-sm sm:text-lg hover:bg-neutral-100 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-[0_0_35px_8px_rgba(234,88,12,0.45)]"
                      data-cursor-label="START"
                    >
                      {t('btn_start_project')}
                    </button>
                  </div>
                </div>

                {/* Two Bottom Left Stat Cards */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-auto">
                  {/* Stat 1: Projects Completed */}
                  <div
                    onClick={() => setActiveStatType('projects')}
                    className="bg-white text-black rounded-2xl sm:rounded-[1.4rem] p-3.5 sm:p-5 w-[130px] sm:w-[158px] flex flex-col justify-between shadow-xl cursor-pointer hover:-translate-y-1 transition-all duration-200 group"
                    data-cursor-label="STATS"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-[11px] sm:text-xs font-semibold leading-tight text-neutral-900">
                        {t('stat_projects_label_top')}<br />{t('stat_projects_label_bottom')}
                      </span>
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#ea580c] flex items-center justify-center text-black group-hover:rotate-45 transition-transform shrink-0">
                        <ArrowUpRight size={14} strokeWidth={2.5} className="text-black" />
                      </div>
                    </div>
                    <div className="text-2xl sm:text-[2.1rem] font-extrabold text-neutral-950 mt-3 sm:mt-4 tracking-tight">
                      100+
                    </div>
                  </div>

                  {/* Stat 2: Client Satisfaction */}
                  <div
                    onClick={() => setActiveStatType('satisfaction')}
                    className="bg-white text-black rounded-2xl sm:rounded-[1.4rem] p-3.5 sm:p-5 w-[130px] sm:w-[158px] flex flex-col justify-between shadow-xl cursor-pointer hover:-translate-y-1 transition-all duration-200 group"
                    data-cursor-label="STATS"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-[11px] sm:text-xs font-semibold leading-tight text-neutral-900">
                        {t('stat_satisfaction_label_top')}<br />{t('stat_satisfaction_label_bottom')}
                      </span>
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#ea580c] flex items-center justify-center text-black group-hover:rotate-45 transition-transform shrink-0">
                        <ArrowUpRight size={14} strokeWidth={2.5} className="text-black" />
                      </div>
                    </div>
                    <div className="text-2xl sm:text-[2.1rem] font-extrabold text-neutral-950 mt-3 sm:mt-4 tracking-tight">
                      200%
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Welcome Studio Statement & Client Testimonial Card */}
              <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-between h-full">
                <div className="w-full max-w-md lg:ml-auto">
                  {/* Pill Badge */}
                  <button
                    onClick={() => setIsPrioritiesModalOpen(true)}
                    className="inline-flex items-center justify-center px-4 py-1 rounded-full border border-neutral-700/80 bg-black/40 text-xs sm:text-sm font-medium text-white/90 tracking-wide mb-4 sm:mb-5 hover:border-[#ea580c]/60 hover:text-white transition cursor-pointer"
                    data-cursor-label="STUDIO"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] mr-2" />
                    <span>{t('greeting_badge')}</span>
                  </button>

                  {/* Welcome Message & Tagline */}
                  <div
                    onClick={() => setIsPrioritiesModalOpen(true)}
                    className="cursor-pointer group"
                  >
                    <h2 className="text-2xl sm:text-3xl lg:text-[1.85rem] xl:text-[2.05rem] font-extrabold text-white leading-[1.2] tracking-tight uppercase group-hover:text-neutral-100 transition-colors">
                      {t('greeting_salutation')}
                    </h2>
                    <p className="text-xl sm:text-2xl lg:text-[1.5rem] font-bold text-neutral-100 mt-2.5 tracking-tight leading-snug">
                      {t('greeting_tagline_part1')} <span className="text-[#ea580c]">{t('greeting_tagline_part2')}</span>
                    </p>
                  </div>

                  {/* Body description & Call to create */}
                  <div className="text-xs sm:text-sm text-neutral-300/90 font-normal leading-relaxed mt-4 space-y-3">
                    <p>
                      {t('greeting_description')}
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-white flex items-center gap-2 pt-0.5">
                      <span className="w-2 h-2 rounded-full bg-[#ea580c] shrink-0" />
                      <span className="text-white tracking-tight">{t('greeting_cta')}</span>
                    </p>
                  </div>
                </div>

                {/* Interactive Client Testimonial Carousel / Slider */}
                <TestimonialSlider onOpenTestimonialModal={() => setIsProjectModalOpen(true)} />
              </div>
            </div>

            {/* BOTTOM CENTER SOCIAL & DIRECT CONTACT */}
            <footer className="w-full flex flex-col lg:flex-row items-center justify-between gap-4 pt-4 sm:pt-6 relative z-10">
              {/* About link & Gemini Chatbot Trigger */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <button
                  onClick={() => setCurrentPage('about')}
                  className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-neutral-800 hover:border-[#ea580c] text-white text-xs font-semibold transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
                  data-cursor-label="ABOUT"
                  title="Full Information About Plain GraFix"
                >
                  <span className="w-2 h-2 rounded-full bg-[#ea580c]" />
                  <span className="text-[11px] sm:text-xs">{t('footer_about_badge')}</span>
                </button>

                {/* Plain AI Gemini Chatbot Trigger with Tooltip */}
                <div className="relative group/chat flex items-center">
                  <button
                    onClick={() => setIsChatOpen(true)}
                    className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#ea580c]/15 hover:bg-[#ea580c]/25 border border-[#ea580c]/50 text-white text-xs font-semibold transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 shadow-[0_0_16px_rgba(234,88,12,0.25)]"
                    data-cursor-label="CHAT"
                    title="Chat with Plain AI (Gemini + Live Google Search)"
                  >
                    <Sparkles size={12} className="text-[#ea580c] animate-pulse" />
                    <span className="text-[11px] sm:text-xs">Plain AI Consultant</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping hidden sm:inline-block" />
                  </button>

                  {/* Tooltip */}
                  <div
                    role="tooltip"
                    className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-700/80 text-white text-[11px] font-medium tracking-tight shadow-xl pointer-events-none opacity-0 scale-95 group-hover/chat:opacity-100 group-hover/chat:scale-100 group-focus-within/chat:opacity-100 group-focus-within/chat:scale-100 transition-all duration-200 z-30 whitespace-nowrap"
                  >
                    Gemini AI Chat & Google Search
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 border-b border-r border-neutral-700/80 rotate-45" />
                  </div>
                </div>
              </div>

              {/* Social Channels & Contact Icons */}
              <div className="flex items-center gap-2 sm:gap-2.5">
                {/* WhatsApp Direct Chat with Bounce, Shake & Tooltip */}
                <div className="relative group/social flex items-center justify-center">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Plain GraFix WhatsApp Direct Chat (+27 69 702 2221)"
                    data-cursor-label="WHATSAPP"
                    className="social-bounce-shake w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-700/90 text-white/80 hover:text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366]/15 hover:shadow-[0_0_16px_rgba(37,211,102,0.35)] flex items-center justify-center cursor-pointer focus:outline-none"
                    title="WhatsApp: +27 69 702 2221"
                  >
                    <WhatsAppIcon size={16} className="social-icon-shake text-current" />
                  </a>
                  {/* Floating Tooltip Pill */}
                  <div
                    role="tooltip"
                    className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-700/80 text-white text-[11px] font-medium tracking-tight shadow-xl pointer-events-none opacity-0 scale-95 group-hover/social:opacity-100 group-hover/social:scale-100 group-focus-within/social:opacity-100 group-focus-within/social:scale-100 transition-all duration-200 z-30 whitespace-nowrap flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                    <span>WhatsApp (+27 69 702 2221)</span>
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 border-b border-r border-neutral-700/80 rotate-45" />
                  </div>
                </div>

                {/* Instagram with Bounce, Shake & Tooltip */}
                <div className="relative group/social flex items-center justify-center">
                  <a
                    href={INSTAGRAM_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Plain GraFix Instagram (@plain_grafix)"
                    data-cursor-label="INSTAGRAM"
                    className="social-bounce-shake w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-700/90 text-white/80 hover:text-[#E1306C] hover:border-[#E1306C] hover:bg-gradient-to-tr hover:from-[#F58529]/20 hover:via-[#DD2A7B]/20 hover:to-[#8134AF]/20 hover:shadow-[0_0_16px_rgba(225,48,108,0.35)] flex items-center justify-center cursor-pointer focus:outline-none"
                    title="Instagram: @plain_grafix"
                  >
                    <Instagram size={16} className="social-icon-shake" />
                  </a>
                  {/* Floating Tooltip Pill */}
                  <div
                    role="tooltip"
                    className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-700/80 text-white text-[11px] font-medium tracking-tight shadow-xl pointer-events-none opacity-0 scale-95 group-hover/social:opacity-100 group-hover/social:scale-100 group-focus-within/social:opacity-100 group-focus-within/social:scale-100 transition-all duration-200 z-30 whitespace-nowrap flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E1306C]" />
                    <span>Instagram {INSTAGRAM_HANDLE}</span>
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 border-b border-r border-neutral-700/80 rotate-45" />
                  </div>
                </div>

                {/* Facebook with Bounce, Shake & Tooltip */}
                <div className="relative group/social flex items-center justify-center">
                  <a
                    href={FACEBOOK_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Plain GraFix Facebook Page"
                    data-cursor-label="FACEBOOK"
                    className="social-bounce-shake w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-700/90 text-white/80 hover:text-[#1877F2] hover:border-[#1877F2] hover:bg-[#1877F2]/15 hover:shadow-[0_0_16px_rgba(24,119,242,0.35)] flex items-center justify-center font-bold text-sm sm:text-base cursor-pointer focus:outline-none"
                    title="Facebook: Plain GraFix"
                  >
                    <span className="social-icon-shake inline-block">f</span>
                  </a>
                  {/* Floating Tooltip Pill */}
                  <div
                    role="tooltip"
                    className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-700/80 text-white text-[11px] font-medium tracking-tight shadow-xl pointer-events-none opacity-0 scale-95 group-hover/social:opacity-100 group-hover/social:scale-100 group-focus-within/social:opacity-100 group-focus-within/social:scale-100 transition-all duration-200 z-30 whitespace-nowrap flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1877F2]" />
                    <span>Facebook</span>
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 border-b border-r border-neutral-700/80 rotate-45" />
                  </div>
                </div>

                {/* Copy Email to Clipboard with Bounce, Shake & Success Tooltip */}
                <div className="relative group/copy-email flex items-center justify-center">
                  <button
                    onClick={handleCopyEmail}
                    aria-label="Copy Plain GraFix contact email to clipboard"
                    data-cursor-label="COPY EMAIL"
                    className={`social-bounce-shake w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center cursor-pointer focus:outline-none ${
                      hasCopiedEmail
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400 scale-105 shadow-[0_0_16px_rgba(16,185,129,0.35)]'
                        : 'border-neutral-700/90 text-white/80 hover:text-[#ea580c] hover:border-[#ea580c] hover:bg-[#ea580c]/15 hover:shadow-[0_0_16px_rgba(234,88,12,0.35)]'
                    }`}
                    title={`Click to copy: ${EMAIL_ADDRESS}`}
                  >
                    {hasCopiedEmail ? (
                      <Check size={16} className="text-emerald-400" />
                    ) : (
                      <Mail size={16} className="social-icon-shake" />
                    )}
                  </button>

                  {/* Floating Tooltip Pill */}
                  <div
                    role="tooltip"
                    className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-700/80 text-white text-[11px] font-medium tracking-tight shadow-xl pointer-events-none opacity-0 scale-95 group-hover/copy-email:opacity-100 group-hover/copy-email:scale-100 group-focus-within/copy-email:opacity-100 group-focus-within/copy-email:scale-100 transition-all duration-200 z-30 whitespace-nowrap flex items-center gap-1.5"
                  >
                    {hasCopiedEmail ? (
                      <>
                        <Check size={11} className="text-emerald-400" />
                        <span className="text-emerald-300 font-semibold">Email Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={11} className="text-neutral-400" />
                        <span>Copy {EMAIL_ADDRESS}</span>
                      </>
                    )}
                    {/* Tooltip caret arrow pointing down */}
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 border-b border-r border-neutral-700/80 rotate-45" />
                  </div>
                </div>
              </div>
            </footer>
          </motion.div>
        ) : currentPage === 'about' ? (
          /* Full Dedicated About Plain GraFix Page */
          <AboutPage
            key="about-view"
            onBackToHome={() => setCurrentPage('hero')}
            onNavigateToJourney={() => setCurrentPage('journey')}
            onOpenProjectBrief={() => setIsProjectModalOpen(true)}
            onOpenFaq={() => setIsFaqModalOpen(true)}
            onOpenFeaturedWorks={() => setIsFeaturedWorksOpen(true)}
            onOpenChat={() => setIsChatOpen(true)}
          />
        ) : (
          /* Vision & Design Process Journey */
          <VisionJourney
            key="journey-view"
            onBackToHome={() => setCurrentPage('hero')}
            onOpenProjectBrief={() => setIsProjectModalOpen(true)}
            onOpenFaq={() => setIsFaqModalOpen(true)}
            onOpenAbout={() => setCurrentPage('about')}
            onOpenFeaturedWorks={() => setIsFeaturedWorksOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* Interactive Modals */}
      <FeaturedWorksModal
        isOpen={isFeaturedWorksOpen}
        onClose={() => setIsFeaturedWorksOpen(false)}
        onSelectServiceForProject={(serviceKey) => {
          setProjectInitialService(serviceKey);
          setIsProjectModalOpen(true);
        }}
      />

      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => {
          setIsProjectModalOpen(false);
          setProjectInitialService(undefined);
        }}
        initialService={projectInitialService}
      />

      <PrioritiesModal
        isOpen={isPrioritiesModalOpen}
        onClose={() => setIsPrioritiesModalOpen(false)}
        onOpenProject={() => {
          setIsPrioritiesModalOpen(false);
          setIsProjectModalOpen(true);
        }}
      />

      <NavSectionModal
        section={activeNavSection}
        onClose={() => setActiveNavSection(null)}
        onOpenProject={() => {
          setActiveNavSection(null);
          setIsProjectModalOpen(true);
        }}
        onOpenAbout={() => {
          setActiveNavSection(null);
          setCurrentPage('about');
        }}
        onOpenFeaturedWorks={() => {
          setActiveNavSection(null);
          setIsFeaturedWorksOpen(true);
        }}
      />

      <StatsModal
        type={activeStatType}
        onClose={() => setActiveStatType(null)}
        onOpenProject={() => {
          setActiveStatType(null);
          setIsProjectModalOpen(true);
        }}
      />

      <FaqModal
        isOpen={isFaqModalOpen}
        onClose={() => setIsFaqModalOpen(false)}
        onOpenProject={() => {
          setIsFaqModalOpen(false);
          setIsProjectModalOpen(true);
        }}
      />

      {/* Refer a Client Modal */}
      <ReferralModal
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
        onOpenProject={() => {
          setIsReferralModalOpen(false);
          setIsProjectModalOpen(true);
        }}
      />

      {/* Gemini AI Multi-turn Chatbot with Google Search Grounding */}
      <GeminiChatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpenProjectBrief={() => {
          setIsChatOpen(false);
          setIsProjectModalOpen(true);
        }}
      />

      {/* Mobile Navigation Drawer */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={(dest) => {
          if (dest === 'about') {
            setCurrentPage('about');
          } else if (dest === 'journey') {
            setCurrentPage('journey');
          } else if (dest === 'results') {
            setActiveNavSection('Results');
          } else if (dest === 'services') {
            setIsFeaturedWorksOpen(true);
          } else if (dest === 'process') {
            setActiveNavSection('Process');
          }
        }}
        onOpenProjectBrief={() => setIsProjectModalOpen(true)}
        onOpenFaq={() => setIsFaqModalOpen(true)}
        onOpenReferral={() => setIsReferralModalOpen(true)}
        onOpenFeaturedWorks={() => setIsFeaturedWorksOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        hasCopiedEmail={hasCopiedEmail}
        onCopyEmail={handleCopyEmail}
      />

      {/* Persistent Elegant Floating Audio Player */}
      <AudioPlayer />

      {/* Floating Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-neutral-900 border border-neutral-700 text-white text-xs sm:text-sm rounded-full shadow-2xl animate-fade-in flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ea580c]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </main>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

