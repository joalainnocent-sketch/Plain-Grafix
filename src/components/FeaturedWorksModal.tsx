import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  Maximize2,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Search,
  ArrowUpRight,
  Layers,
  Award,
  Calendar,
  MapPin,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import featuredWorkBranding from '../assets/images/plaingrafix_featured_work_1789402320845.jpg';
import luxuryPackagingShowcase from '../assets/images/luxury_packaging_showcase_1789402336240.jpg';
import { WhatsAppIcon, WHATSAPP_LINK } from './ContactOptions';

export interface FeaturedWorkItem {
  id: string;
  title: string;
  client: string;
  location: string;
  year: string;
  serviceCategory: 'Brand Identity & Systems' | 'Digital & UI/UX' | 'Packaging & Unboxing' | '3D & Motion Art';
  serviceModalKey: string; // Key to pre-select in ProjectModal
  badge: string;
  imageUrl: string;
  summary: string;
  description: string;
  deliverables: string[];
  metrics: string;
  featured?: boolean;
}

interface FeaturedWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectServiceForProject: (serviceKey: string) => void;
}

export const FEATURED_WORKS_DATA: FeaturedWorkItem[] = [
  {
    id: 'aura-botanica',
    title: 'Aura Botanical Fragrance & Identity',
    client: 'Aura Botanica Atelier',
    location: 'Cape Town & London',
    year: '2025',
    serviceCategory: 'Brand Identity & Systems',
    serviceModalKey: 'Brand Identity',
    badge: 'Flagship Identity',
    imageUrl: featuredWorkBranding,
    summary: 'Tactile, hot-stamped stationery and modern luxury brand guidelines for an artisanal perfume house.',
    description:
      'A minimalist, visceral brand identity engineered for an organic perfumery. Featuring custom letterforms, warm matte slate neutrals, deep debossed textures, and hot-stamped electric orange foil on heavy 600gsm cotton cardstock that commands tactile intrigue and luxury shelf presence.',
    deliverables: [
      'Visual Identity System',
      'Hot-Stamped Foil Stationery',
      'Bespoke Typography Hierarchy',
      'Brand Standards Manual',
    ],
    metrics: '+280% Pre-Order Velocity • Featured in Monocle',
    featured: true,
  },
  {
    id: 'kruger-reserve',
    title: 'Kruger Reserve Coffee & Unboxing Box',
    client: 'Kruger Reserve Roasters',
    location: 'Mpumalanga & Johannesburg',
    year: '2025',
    serviceCategory: 'Packaging & Unboxing',
    serviceModalKey: 'Packaging & Print',
    badge: 'Packaging Excellence',
    imageUrl: luxuryPackagingShowcase,
    summary: 'Bespoke rigid box architecture with holographic geometric embossing for rare African single-origin harvests.',
    description:
      'Engineered rigid packaging architecture for single-origin specialty coffees. Employs precision blind debossing, holographic orange geometric foil lines, and biodegradable plant-fiber unboxing sleeves that transform the morning coffee preparation into a sensorial luxury ritual.',
    deliverables: [
      'Rigid Box Packaging Design',
      'Holographic Foil Embellishments',
      'Die-Cut Unboxing Inserts',
      'Retail Shelf Display Trays',
    ],
    metrics: 'Winner: African Design Excellence 2025',
    featured: true,
  },
  {
    id: 'lumina-spatial',
    title: 'Lumina Spatial Analytics UI System',
    client: 'Lumina Spatial Intelligence',
    location: 'Zurich & San Francisco',
    year: '2024',
    serviceCategory: 'Digital & UI/UX',
    serviceModalKey: 'Digital Experience',
    badge: 'Awwwards SOTD',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=85',
    summary: 'An immersive digital design system and high-density telemetry platform built for spatial computing.',
    description:
      'A next-generation enterprise web application and design token system. We established a dark-mode first UI architecture with mathematical typographic scale, fluid micro-interactions, and low-latency visualization widgets supporting 50,000+ daily operational analysts.',
    deliverables: [
      'Enterprise UI/UX Architecture',
      'Component Library & Design Tokens',
      'Real-Time Telemetry Panels',
      'Responsive Web Application',
    ],
    metrics: '3.8x Conversion Rate Lift • Sub-100ms Micro-Interactions',
  },
  {
    id: 'nexus-motion',
    title: 'Nexus Kinetic 3D & Motion Art Direction',
    client: 'Nexus Studios Global',
    location: 'Amsterdam & Berlin',
    year: '2025',
    serviceCategory: '3D & Motion Art',
    serviceModalKey: '3D & Motion',
    badge: 'Visual Innovation',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85',
    summary: 'Procedural 3D kinetic forms and atmospheric lighting physics designed for high-profile product reveals.',
    description:
      'Comprehensive 3D art direction and fluid visual identity assets exploring organic curvatures, refractive caustics, and procedural studio lighting. Created as high-resolution hero banners and keynote animated loops that reinforce technological sophistication.',
    deliverables: [
      '3D Procedural Visual Art Direction',
      'Keynote Reveal Sequences',
      'Motion Physics Specification',
      'Social Video Loops',
    ],
    metrics: '2.4M+ Organic Showcase Impressions',
  },
  {
    id: 'solace-fintech',
    title: 'Solace Wealth Management Platform',
    client: 'Solace FinTech Capital',
    location: 'Sandton, Johannesburg',
    year: '2024',
    serviceCategory: 'Digital & UI/UX',
    serviceModalKey: 'Digital Experience',
    badge: 'FinTech Breakthrough',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85',
    summary: 'Comprehensive user experience overhaul for an institutional private equity and portfolio intelligence portal.',
    description:
      'Synthesized multifaceted multi-asset portfolios into crystal-clear visual hierarchies. Replaced cluttered tables with modern interactive sparklines, accessible color contrast ratios, and one-tap allocation workflows that drove institutional investor adoption.',
    deliverables: [
      'Multi-Platform App UX/UI',
      'Financial Charting Design System',
      'Institutional Investor Portal',
      'Design Sprint Validation',
    ],
    metrics: 'R45M+ Assets Managed in Q1 Post-Launch',
  },
  {
    id: 'elysian-vessels',
    title: 'Elysian Niche Perfumery & Glass Packaging',
    client: 'Elysian Parfums',
    location: 'Stellenbosch & Paris',
    year: '2024',
    serviceCategory: 'Packaging & Unboxing',
    serviceModalKey: 'Packaging & Print',
    badge: 'Luxury Packaging',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=85',
    summary: 'Refined glass bottle label typography, blind debossed sleeves, and sustainable packaging cases.',
    description:
      'Elevated botanical fragrance vessels through stark modern typography and tactile metallic foil stamped labels. The packaging combines eco-certified FSC paperboard with bespoke amber glassware that was celebrated across international design publications.',
    deliverables: [
      'Vessel Label & Screen-Print Art',
      'Custom Embossed Outer Sleeves',
      'Editorial Launch Monograph',
      'Retail Merchandising Display',
    ],
    metrics: '3 Limited Editions Sold Out in 48 Hours',
  },
  {
    id: 'vertex-architecture',
    title: 'Vertex Architecture Monograph & Identity',
    client: 'Vertex Architects Collective',
    location: 'Cape Town',
    year: '2024',
    serviceCategory: 'Brand Identity & Systems',
    serviceModalKey: 'Brand Identity',
    badge: 'Design Award Winner',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1600&q=85',
    summary: 'A disciplined, architectural identity grid, hardcover monographs, and responsive portfolio showcase.',
    description:
      'Rooted in structural harmony and mathematical proportions. We designed an identity system matching the architectural rigor of Vertex’s physical buildings, complete with custom editorial layouts, case study presentations, and custom bronze studio signage.',
    deliverables: [
      'Architectural Brand Identity',
      'Hardcover Printed Monograph Book',
      'Portfolio Showcase Website',
      'Physical Studio Wayfinding Signage',
    ],
    metrics: 'Selected as Best Architectural Identity 2024',
  },
  {
    id: 'komorebi-roasters',
    title: 'Komorebi Specialty Roasters Brand & Cafe',
    client: 'Komorebi Coffee Guild',
    location: 'Durban & Ballito',
    year: '2025',
    serviceCategory: 'Brand Identity & Systems',
    serviceModalKey: 'Marketing Assets',
    badge: 'Retail Transformation',
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1600&q=85',
    summary: 'Warm organic brand identity, craft kraft packaging bags, and experiential storefront signage.',
    description:
      'Created a rich visual and physical identity celebrating single-origin roasting culture. We paired earthy textured kraft materials with striking orange brand seals, bespoke iconography of coffee elevation zones, and comprehensive cafe collateral.',
    deliverables: [
      'Identity Seal & Brand Mascot',
      'Coffee Bean Bag Packaging',
      'Cafe Menu & Storefront Signage',
      'Apparel & Merchandising Line',
    ],
    metrics: '+180% Retail Distribution Expansion Across SA',
  },
];

type CategoryFilter = 'All' | 'Brand Identity & Systems' | 'Digital & UI/UX' | 'Packaging & Unboxing' | '3D & Motion Art';

export const FeaturedWorksModal: React.FC<FeaturedWorksModalProps> = ({
  isOpen,
  onClose,
  onSelectServiceForProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxWork, setLightboxWork] = useState<FeaturedWorkItem | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState(1);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxWork) {
          setLightboxWork(null);
          setLightboxZoom(1);
        } else if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, lightboxWork, onClose]);

  // Lock body scroll when modal is open
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

  const filteredWorks = useMemo(() => {
    return FEATURED_WORKS_DATA.filter((work) => {
      const matchesCategory =
        selectedCategory === 'All' || work.serviceCategory === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch =
        work.title.toLowerCase().includes(query) ||
        work.client.toLowerCase().includes(query) ||
        work.description.toLowerCase().includes(query) ||
        work.deliverables.some((d) => d.toLowerCase().includes(query)) ||
        work.location.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categories: { key: CategoryFilter; label: string; count: number }[] = [
    { key: 'All', label: 'All Services & Works', count: FEATURED_WORKS_DATA.length },
    {
      key: 'Brand Identity & Systems',
      label: 'Brand Identity',
      count: FEATURED_WORKS_DATA.filter((w) => w.serviceCategory === 'Brand Identity & Systems').length,
    },
    {
      key: 'Digital & UI/UX',
      label: 'Digital & UI/UX',
      count: FEATURED_WORKS_DATA.filter((w) => w.serviceCategory === 'Digital & UI/UX').length,
    },
    {
      key: 'Packaging & Unboxing',
      label: 'Packaging & Print',
      count: FEATURED_WORKS_DATA.filter((w) => w.serviceCategory === 'Packaging & Unboxing').length,
    },
    {
      key: '3D & Motion Art',
      label: '3D & Motion',
      count: FEATURED_WORKS_DATA.filter((w) => w.serviceCategory === '3D & Motion Art').length,
    },
  ];

  const handleNextLightbox = () => {
    if (!lightboxWork) return;
    const currentIndex = filteredWorks.findIndex((w) => w.id === lightboxWork.id);
    const nextIndex = (currentIndex + 1) % filteredWorks.length;
    setLightboxWork(filteredWorks[nextIndex]);
    setLightboxZoom(1);
  };

  const handlePrevLightbox = () => {
    if (!lightboxWork) return;
    const currentIndex = filteredWorks.findIndex((w) => w.id === lightboxWork.id);
    const prevIndex = (currentIndex - 1 + filteredWorks.length) % filteredWorks.length;
    setLightboxWork(filteredWorks[prevIndex]);
    setLightboxZoom(1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-7xl max-h-[94vh] bg-neutral-950 border border-neutral-800 rounded-[1.75rem] sm:rounded-[2.25rem] shadow-[0_0_80px_rgba(234,88,12,0.2)] flex flex-col overflow-hidden z-10 text-white"
        >
          {/* TOP HEADER BAR */}
          <div className="p-4 sm:p-6 md:p-8 border-b border-neutral-800/80 bg-neutral-950/95 sticky top-0 z-20 backdrop-blur-md">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ea580c]/15 border border-[#ea580c]/40 text-[#ea580c] text-xs font-semibold tracking-wide uppercase mb-2 sm:mb-2.5">
                  <Sparkles size={12} />
                  <span>Plain GraFix Services • Featured Works</span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  High-Resolution Portfolio & Deliverables
                </h2>
                <p className="text-neutral-400 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
                  Discover our flagship client deliverables across brand identity systems, tactile packaging, spatial 3D art direction, and high-conversion digital product interfaces.
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-700/80 flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#ea580c] transition cursor-pointer shrink-0"
                aria-label="Close featured works modal"
                data-cursor-label="CLOSE"
              >
                <X size={18} />
              </button>
            </div>

            {/* FILTER CONTROLS & SEARCH */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 mt-5 sm:mt-6">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 sm:pb-0 scrollbar-none">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[#ea580c] text-white font-bold shadow-[0_0_15px_rgba(234,88,12,0.4)]'
                          : 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          isActive ? 'bg-black/30 text-white' : 'bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[220px] sm:min-w-[260px]">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search works, styles, clients..."
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-full pl-9 pr-8 py-1.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ea580c] transition select-text"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* MAIN SCROLLABLE SHOWCASE GRID */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8 custom-scrollbar">
            {filteredWorks.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <Filter size={32} className="text-neutral-600 mb-3" />
                <h3 className="text-lg font-bold text-white">No featured works match your search</h3>
                <p className="text-sm text-neutral-400 mt-1 max-w-sm">
                  Try adjusting your search keywords or select "All Services & Works" to browse our complete agency catalog.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 bg-[#ea580c] text-white rounded-full text-xs font-bold hover:bg-[#c2410c] transition"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {filteredWorks.map((work, idx) => (
                  <motion.div
                    key={work.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="group bg-neutral-900/70 border border-neutral-800 hover:border-[#ea580c]/80 rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_0_30px_rgba(234,88,12,0.15)]"
                  >
                    {/* IMAGE CONTAINER WITH LIGHTBOX TRIGGER */}
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-neutral-950 cursor-pointer">
                      <img
                        src={work.imageUrl}
                        alt={work.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        onClick={() => {
                          setLightboxWork(work);
                          setLightboxZoom(1);
                        }}
                      />

                      {/* Dark gradient overlay on bottom for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-black/30 pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-white text-[11px] font-semibold tracking-wide">
                            {work.serviceCategory}
                          </span>
                          {work.badge && (
                            <span className="px-2.5 py-1 rounded-full bg-[#ea580c] text-white text-[11px] font-bold tracking-wide shadow-sm">
                              {work.badge}
                            </span>
                          )}
                        </div>

                        <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-neutral-300 text-[11px] font-medium flex items-center gap-1">
                          <Calendar size={11} />
                          {work.year}
                        </span>
                      </div>

                      {/* Floating Click-to-Zoom Button on Hover */}
                      <div className="absolute bottom-3 right-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setLightboxWork(work);
                            setLightboxZoom(1);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 hover:bg-[#ea580c] text-white text-xs font-semibold backdrop-blur-md border border-white/15 transition-colors cursor-pointer"
                          title="View High-Resolution Image"
                          data-cursor-label="EXPAND"
                        >
                          <Maximize2 size={12} />
                          <span>View Full-Res</span>
                        </button>
                      </div>

                      {/* Client Location Badge */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] text-white/90 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                        <MapPin size={11} className="text-[#ea580c]" />
                        <span>{work.location}</span>
                      </div>
                    </div>

                    {/* CARD CONTENT */}
                    <div className="p-5 sm:p-6 md:p-7 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Client & Title */}
                        <div className="text-xs text-[#ea580c] font-semibold tracking-wider uppercase mb-1">
                          {work.client}
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-[#ea580c] transition-colors">
                          {work.title}
                        </h3>

                        {/* Description */}
                        <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mt-2.5">
                          {work.description}
                        </p>

                        {/* Deliverables tags */}
                        <div className="mt-4 pt-4 border-t border-neutral-800/80">
                          <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Layers size={12} className="text-[#ea580c]" />
                            <span>Key Deliverables</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {work.deliverables.map((item, dIdx) => (
                              <span
                                key={dIdx}
                                className="text-[11px] px-2.5 py-1 rounded-md bg-neutral-800/90 text-neutral-200 border border-neutral-700/60"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Measurable Client Metric */}
                        <div className="mt-4 p-2.5 rounded-xl bg-[#ea580c]/10 border border-[#ea580c]/25 flex items-center gap-2">
                          <Award size={15} className="text-[#ea580c] shrink-0" />
                          <span className="text-xs font-semibold text-white/90">
                            {work.metrics}
                          </span>
                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
                        <button
                          onClick={() => {
                            setLightboxWork(work);
                            setLightboxZoom(1);
                          }}
                          className="text-xs text-neutral-300 hover:text-white font-medium flex items-center gap-1 transition cursor-pointer"
                        >
                          <ZoomIn size={14} className="text-[#ea580c]" />
                          <span>Inspect High-Res</span>
                        </button>

                        <button
                          onClick={() => {
                            onSelectServiceForProject(work.serviceModalKey);
                            onClose();
                          }}
                          className="bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full transition flex items-center gap-1.5 cursor-pointer shadow-[0_0_16px_rgba(234,88,12,0.3)] active:scale-95"
                          data-cursor-label="REQUEST"
                        >
                          <span>Inquire This Service</span>
                          <ArrowUpRight size={13} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* BOTTOM REASSURANCE & CONTACT STRIP */}
            <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 bg-gradient-to-r from-neutral-900 via-neutral-900 to-black border border-[#ea580c]/30 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-[#ea580c] font-bold text-xs tracking-wider uppercase mb-1">
                  <CheckCircle2 size={14} />
                  <span>Your Vision, Executed With Precision</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white">
                  Have a specific creative brief or custom brand request?
                </h4>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
                  Collaborate directly with senior design leads on fast, laser-focused sprints. 100% intellectual property transfer on final hand-off.
                </p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0 w-full md:w-auto justify-end">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-[#25D366]/20 hover:bg-[#25D366] border border-[#25D366]/50 text-white font-semibold text-xs sm:text-sm transition flex items-center gap-1.5 cursor-pointer"
                  title="Chat on WhatsApp"
                >
                  <WhatsAppIcon size={14} />
                  <span>WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    onSelectServiceForProject('Brand Identity');
                    onClose();
                  }}
                  className="px-5 py-2 rounded-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs sm:text-sm transition shadow-[0_0_20px_rgba(234,88,12,0.4)] cursor-pointer"
                >
                  Start a Project
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FULLSCREEN LIGHTBOX PREVIEW */}
        <AnimatePresence>
          {lightboxWork && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-60 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-3 sm:p-6"
            >
              {/* Lightbox Top Controls */}
              <div className="flex items-center justify-between gap-3 text-white border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#ea580c] font-bold text-white uppercase tracking-wider">
                    {lightboxWork.serviceCategory}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white truncate max-w-[200px] sm:max-w-md">
                    {lightboxWork.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Zoom controls */}
                  <button
                    onClick={() => setLightboxZoom((prev) => Math.max(0.75, prev - 0.25))}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                    title="Zoom out"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <span className="text-xs font-mono text-neutral-400 w-12 text-center">
                    {Math.round(lightboxZoom * 100)}%
                  </span>
                  <button
                    onClick={() => setLightboxZoom((prev) => Math.min(2.5, prev + 0.25))}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                    title="Zoom in"
                  >
                    <ZoomIn size={16} />
                  </button>

                  <div className="w-[1px] h-5 bg-white/20 mx-1" />

                  {/* Close Lightbox */}
                  <button
                    onClick={() => {
                      setLightboxWork(null);
                      setLightboxZoom(1);
                    }}
                    className="p-2 rounded-full bg-white/10 hover:bg-[#ea580c] text-white transition"
                    title="Close preview"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Lightbox Image Area */}
              <div className="relative flex-1 flex items-center justify-center overflow-hidden my-2 sm:my-4">
                {/* Prev arrow */}
                <button
                  onClick={handlePrevLightbox}
                  className="absolute left-2 sm:left-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#ea580c] text-white border border-white/20 flex items-center justify-center transition cursor-pointer"
                  aria-label="Previous work"
                >
                  <ChevronLeft size={22} />
                </button>

                {/* Main High-Res Image */}
                <motion.div
                  key={lightboxWork.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: lightboxZoom }}
                  transition={{ duration: 0.3 }}
                  className="max-w-full max-h-full flex items-center justify-center"
                >
                  <img
                    src={lightboxWork.imageUrl}
                    alt={lightboxWork.title}
                    referrerPolicy="no-referrer"
                    className="max-h-[78vh] max-w-[90vw] object-contain rounded-lg shadow-2xl transition-transform duration-200"
                  />
                </motion.div>

                {/* Next arrow */}
                <button
                  onClick={handleNextLightbox}
                  className="absolute right-2 sm:right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#ea580c] text-white border border-white/20 flex items-center justify-center transition cursor-pointer"
                  aria-label="Next work"
                >
                  <ChevronRight size={22} />
                </button>
              </div>

              {/* Lightbox Bottom Details Banner */}
              <div className="p-3 sm:p-4 rounded-xl bg-neutral-900/90 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
                <div>
                  <div className="text-xs text-neutral-400">
                    Client: <span className="text-white font-semibold">{lightboxWork.client}</span> • {lightboxWork.location} • {lightboxWork.year}
                  </div>
                  <div className="text-xs sm:text-sm text-neutral-300 mt-0.5 line-clamp-1">
                    {lightboxWork.summary}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      const key = lightboxWork.serviceModalKey;
                      setLightboxWork(null);
                      setLightboxZoom(1);
                      onSelectServiceForProject(key);
                      onClose();
                    }}
                    className="px-4 py-2 bg-[#ea580c] hover:bg-[#c2410c] text-white rounded-full text-xs font-bold transition flex items-center gap-1"
                  >
                    <span>Inquire About {lightboxWork.serviceCategory}</span>
                    <ArrowUpRight size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
};
