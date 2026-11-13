import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ArrowRight, Phone, Mail } from 'lucide-react';
import { WhatsAppIcon, WHATSAPP_LINK, CALL_LINK, WHATSAPP_DISPLAY, EMAIL_ADDRESS, EMAIL_LINK } from './ContactOptions';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, initialService }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(['Brand Identity']);
  const [budget, setBudget] = useState<string>('R15,000 - R35,000');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [timeline, setTimeline] = useState('2-4 weeks');
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      if (initialService) {
        setSelectedServices([initialService]);
      }
    }
  }, [initialService, isOpen]);

  const services = [
    'Brand Identity',
    'Design Systems',
    'Digital Experience',
    '3D & Motion',
    'Packaging & Print',
    'Marketing Assets',
  ];

  const budgets = [
    'R5,000 - R15,000',
    'R15,000 - R35,000',
    'R35,000 - R75,000',
    'R75,000+',
  ];

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== service));
      }
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const timelines = ['1-2 weeks', '2-4 weeks', '1-2 months', 'Flexible'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

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

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-8 max-h-[90vh] overflow-y-auto"
          >
            {/* Ambient glow */}
            <div className="absolute top-0 right-1/4 w-48 h-48 bg-[#ea580c]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {!isSubmitted ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-0.5 rounded-full text-xs font-semibold tracking-wide bg-[#ea580c]/10 text-[#ea580c] border border-[#ea580c]/30">
                    Plain GraFix Studio
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Start Your <span className="text-[#ea580c]">Project</span>
                </h3>
                <p className="text-sm text-neutral-400 mt-1 mb-4">
                  Tell us about your brand vision and we will craft a high-impact design plan within 24 hours.
                </p>

                {/* Instant WhatsApp, Phone Call & Direct Email Reach Option */}
                <div className="mb-6 p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-300">
                    <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                    <span>Direct line & Email:</span>
                    <span className="font-mono text-white font-semibold">{WHATSAPP_DISPLAY}</span>
                    <span className="text-neutral-500">•</span>
                    <span className="font-mono text-[#ea580c] font-semibold">{EMAIL_ADDRESS}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs transition active:scale-95 shadow-[0_0_12px_rgba(37,211,102,0.3)]"
                      data-cursor-label="WHATSAPP"
                    >
                      <WhatsAppIcon size={13} className="text-black" />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={CALL_LINK}
                      className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-neutral-200 text-black font-bold text-xs transition active:scale-95 shadow-sm"
                      data-cursor-label="CALL"
                    >
                      <Phone size={12} className="text-black fill-black" />
                      <span>Call</span>
                    </a>
                    <a
                      href={EMAIL_LINK}
                      className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs transition active:scale-95 shadow-sm"
                      data-cursor-label="EMAIL"
                    >
                      <Mail size={12} className="text-white" />
                      <span>Email</span>
                    </a>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Services Selection */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2.5">
                      What are you looking to create?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {services.map((service) => {
                        const active = selectedServices.includes(service);
                        return (
                          <button
                            type="button"
                            key={service}
                            onClick={() => toggleService(service)}
                            className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium border text-left transition-all ${
                              active
                                ? 'bg-white text-black border-white shadow-sm'
                                : 'bg-neutral-900/80 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                            }`}
                          >
                            {service}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                        Estimated Project Budget (ZAR)
                      </label>
                      <span className="text-[11px] font-mono text-[#ea580c] font-semibold bg-[#ea580c]/10 border border-[#ea580c]/30 px-2 py-0.5 rounded-full">
                        South African Rand (R)
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgets.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setBudget(b)}
                          data-cursor-label="ZAR"
                          className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                            budget === b
                              ? 'bg-[#ea580c] text-white border-[#ea580c] shadow-[0_0_15px_rgba(234,88,12,0.35)]'
                              : 'bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Timeline Selector */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2.5">
                      Target Timeline
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {timelines.map((tl) => (
                        <button
                          type="button"
                          key={tl}
                          onClick={() => setTimeline(tl)}
                          className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                            timeline === tl
                              ? 'bg-white text-black border-white shadow-sm'
                              : 'bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                          }`}
                        >
                          {tl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Inputs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ea580c] transition select-text"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1.5">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ea580c] transition select-text"
                      />
                    </div>
                  </div>

                  {/* Details textarea */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1.5">
                      Project Goals & Context
                    </label>
                    <textarea
                      rows={3}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Briefly describe what makes your company unique and what you need Plain GraFix to achieve..."
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ea580c] transition resize-none select-text"
                    />
                  </div>

                  {/* Submit button with glow */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-full bg-white text-black font-bold text-sm sm:text-base hover:bg-neutral-100 transition shadow-[0_0_30px_rgba(234,88,12,0.35)] flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>Submit Inquiry</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#ea580c]/20 border border-[#ea580c] text-[#ea580c] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Inquiry Received!</h3>
                <p className="text-neutral-400 text-sm max-w-md mx-auto mb-6">
                  Thanks <span className="text-white font-medium">{name || 'there'}</span>. Our design director is reviewing your <span className="text-white font-medium">{timeline}</span> brief for <span className="text-[#ea580c]">{selectedServices.join(', ')}</span> ({budget}). We&apos;ll be in touch at {email || 'your email'} shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition"
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
