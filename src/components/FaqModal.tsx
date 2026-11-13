import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronDown, Search, HelpCircle, ArrowUpRight, Sparkles, Phone, Mail } from 'lucide-react';
import { WhatsAppIcon, WHATSAPP_LINK, CALL_LINK, WHATSAPP_DISPLAY, EMAIL_ADDRESS, EMAIL_LINK } from './ContactOptions';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProject: () => void;
}

interface FaqItem {
  id: string;
  category: 'Services' | 'Process' | 'Deliverables' | 'Pricing';
  question: string;
  answer: string;
  tags: string[];
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'services-specialties',
    category: 'Services',
    question: 'What types of design projects does Plain GraFix specialize in?',
    answer:
      'We specialize in end-to-end brand transformation: iconic logo design, comprehensive visual identity systems, bespoke 3D graphics, typography guidelines, packaging, print collateral, and conversion-focused web/UI/UX design. Everything is tailored to make your brand memorable and commanding.',
    tags: ['branding', 'logo', 'identity', 'ui/ux', '3d', 'packaging'],
  },
  {
    id: 'turnaround-timeline',
    category: 'Process',
    question: 'How fast is the turnaround time for brand projects?',
    answer:
      'Most core brand identity sprints are delivered in 2 to 4 weeks. We replace traditional multi-month agency bureaucracy with tight, high-cadence design sprints where you collaborate directly with senior design directors.',
    tags: ['turnaround', 'timeline', 'speed', 'sprint', 'schedule'],
  },
  {
    id: 'collaboration-process',
    category: 'Process',
    question: 'How does the collaboration and review process work?',
    answer:
      'We work in transparent asynchronous sprints combined with structured design reviews. You receive access to interactive Figma workspaces, high-res preview staging links, and recorded video walkthroughs. Revisions are incorporated quickly and iteratively.',
    tags: ['review', 'revisions', 'figma', 'feedback', 'workflow'],
  },
  {
    id: 'ip-ownership',
    category: 'Deliverables',
    question: 'Do I own 100% of the copyright and intellectual property?',
    answer:
      'Yes, absolutely. Upon project completion and final payment, 100% full commercial rights, copyrights, and intellectual property transfers entirely to your company. You have unrestricted freedom to use, modify, trademark, and distribute your assets.',
    tags: ['copyright', 'ownership', 'intellectual property', 'rights', 'trademark'],
  },
  {
    id: 'file-deliverables',
    category: 'Deliverables',
    question: 'What file formats and assets will I receive upon completion?',
    answer:
      'You will receive comprehensive, organized asset packages including production-ready vector files (SVG, AI, EPS, PDF), high-resolution web formats (PNG, WebP, JPG in multiple colorways like Dark, Light, Monochrome), responsive social kit assets, typography specs, and interactive brand design guidelines.',
    tags: ['svg', 'ai', 'vector', 'png', 'brand guidelines', 'assets'],
  },
  {
    id: 'pricing-structure',
    category: 'Pricing',
    question: 'What currency and pricing structure do you use?',
    answer:
      'We quote all projects transparently in South African Rand (ZAR) with clear flat-fee sprint deliverables and zero hidden costs. Depending on project scope, branding packages range from focused sprints (from R5,000) to full multi-channel identity systems. We accept direct South African bank EFT, instant payment, and international wire transfers, typically structured with a 50% kick-off deposit and 50% upon final delivery.',
    tags: ['pricing', 'zar', 'rand', 'cost', 'rates', 'currency', 'deposit', 'flat fee'],
  },
  {
    id: 'team-integration',
    category: 'Process',
    question: 'Can Plain GraFix work alongside our in-house engineers and marketers?',
    answer:
      'Yes. We regularly embed directly alongside engineering leads, marketing directors, and founders. We provide developer-friendly design tokens, CSS specs, component guidelines, and direct Slack/Discord synchronization for seamless execution.',
    tags: ['engineering', 'in-house', 'developers', 'tokens', 'slack'],
  },
  {
    id: 'ongoing-support',
    category: 'Services',
    question: 'Do you offer ongoing design support after the initial launch?',
    answer:
      'Yes. Over 80% of our clients continue with our monthly design advisory or retainer sprints for ongoing marketing collateral, product UI evolution, pitch decks, and brand extensions as their company grows.',
    tags: ['retainer', 'ongoing', 'advisory', 'support', 'growth'],
  },
];

const CATEGORIES = ['All', 'Services', 'Process', 'Deliverables', 'Pricing'] as const;

export const FaqModal: React.FC<FaqModalProps> = ({ isOpen, onClose, onOpenProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<(typeof CATEGORIES)[number]>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'services-specialties': true, // Keep first open by default
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesQuery =
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative w-full max-w-3xl bg-neutral-950 border border-neutral-800 rounded-3xl p-5 sm:p-8 md:p-9 shadow-[0_0_80px_rgba(234,88,12,0.2)] z-10 my-6 max-h-[90vh] flex flex-col overflow-hidden"
        >
          {/* Ambient Orange Glow */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#ea580c]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[#ea580c]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-800/80 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ea580c]/15 border border-[#ea580c]/30 text-[#ea580c] text-xs font-semibold uppercase tracking-wider mb-2">
                <HelpCircle size={14} />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Everything You Need to Know
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Straightforward answers about our design sprints, timelines, deliverables, and pricing.
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition cursor-pointer shrink-0"
              aria-label="Close FAQ Modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="py-4 space-y-3 relative z-10">
            {/* Search Input */}
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500"
              />
              <input
                type="text"
                placeholder="Search questions (e.g. turnaround, vector files, pricing, copyright)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900/90 border border-neutral-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]/50 transition select-text"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-white text-black font-semibold shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                        : 'bg-neutral-900/80 text-neutral-400 border border-neutral-800 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accordion FAQ Items List */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-3 relative z-10 my-1 custom-scrollbar">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = !!openItems[faq.id];
                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'bg-neutral-900/80 border-[#ea580c]/40 shadow-[0_0_20px_rgba(234,88,12,0.1)]'
                        : 'bg-neutral-900/40 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/60'
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] shrink-0" />
                        <span className="text-sm sm:text-base font-semibold text-white tracking-tight">
                          {faq.question}
                        </span>
                      </div>
                      <div
                        className={`w-7 h-7 rounded-full bg-neutral-800/80 border border-neutral-700/50 flex items-center justify-center text-neutral-300 transition-transform duration-300 shrink-0 ${
                          isOpen ? 'rotate-180 bg-[#ea580c] text-black border-[#ea580c]' : ''
                        }`}
                      >
                        <ChevronDown size={15} />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60 mt-1">
                            <p>{faq.answer}</p>
                            <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2">
                              {faq.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] px-2 py-0.5 rounded-md bg-black/50 border border-neutral-800 text-neutral-400 font-mono"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 px-4 rounded-2xl bg-neutral-900/30 border border-neutral-800/60">
                <HelpCircle size={32} className="text-neutral-600 mx-auto mb-2" />
                <p className="text-sm text-neutral-300 font-medium">
                  No matching questions found for "{searchQuery}"
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  Try another keyword or reach out directly to our team.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-3 text-xs text-[#ea580c] hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>

          {/* Footer Callout Banner */}
          <div className="mt-4 pt-4 border-t border-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-3 relative z-10">
            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-300 text-center sm:text-left">
              <Sparkles size={14} className="text-[#ea580c] shrink-0" />
              <span>Need an immediate answer?</span>
              <div className="flex flex-wrap items-center gap-1.5 ml-1">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 hover:bg-[#25D366] hover:text-black font-semibold text-[11px] transition"
                  data-cursor-label="WHATSAPP"
                >
                  <WhatsAppIcon size={12} />
                  <span>WhatsApp ({WHATSAPP_DISPLAY})</span>
                </a>
                <a
                  href={CALL_LINK}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-white border border-neutral-700 hover:bg-white hover:text-black font-semibold text-[11px] transition"
                  data-cursor-label="CALL"
                >
                  <Phone size={10} />
                  <span>Call</span>
                </a>
                <a
                  href={EMAIL_LINK}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ea580c]/20 text-[#ea580c] border border-[#ea580c]/40 hover:bg-[#ea580c] hover:text-white font-semibold text-[11px] transition"
                  data-cursor-label="EMAIL"
                  title={`Email ${EMAIL_ADDRESS}`}
                >
                  <Mail size={10} />
                  <span>Email ({EMAIL_ADDRESS})</span>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs text-neutral-400 hover:text-white transition cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenProject();
                }}
                className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs sm:text-sm hover:bg-neutral-200 transition flex items-center justify-center gap-1.5 shadow-[0_0_25px_rgba(234,88,12,0.35)] cursor-pointer"
                data-cursor-label="TALK"
              >
                <span>Ask Our Team</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FaqModal;
