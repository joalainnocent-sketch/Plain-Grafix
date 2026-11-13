import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Share2,
  Copy,
  Check,
  Mail,
  Send,
  Sparkles,
  Gift,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { WhatsAppIcon, WHATSAPP_DISPLAY, EMAIL_ADDRESS } from './ContactOptions';

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProject?: () => void;
}

export const ReferralModal: React.FC<ReferralModalProps> = ({ isOpen, onClose, onOpenProject }) => {
  const [referrerName, setReferrerName] = useState('A Valued Client');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [emailSubject, setEmailSubject] = useState(
    'Recommendation: World-Class Brand & Graphic Design (Plain GraFix)'
  );
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [activeTab, setActiveTab] = useState<'email' | 'link'>('email');

  // Compute clean referral URL
  const referralCode = useMemo(() => {
    const sanitized = referrerName
      .trim()
      .replace(/[^a-zA-Z0-9]/g, '')
      .slice(0, 16);
    return sanitized || 'VIP';
  }, [referrerName]);

  const referralLink = useMemo(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://plaingrafix.com';
    return `${origin}/?ref=${referralCode}`;
  }, [referralCode]);

  // Compute pre-filled email body text
  const emailBody = useMemo(() => {
    const salutation = recipientName.trim() ? `Hi ${recipientName.trim()},` : 'Hi there,';
    const sender = referrerName.trim() ? referrerName.trim() : 'Your Colleague';

    return `${salutation}

I wanted to connect you with Plain GraFix (plaingrafix@gmail.com / WhatsApp: ${WHATSAPP_DISPLAY}) — a premier brand transformation and design studio.

They specialize in crafting iconic visual identities, bespoke 3D graphics, luxury packaging, and conversion-focused digital experiences. They have delivered 100+ projects with a 200% client satisfaction record and full commercial IP ownership.

You can explore their work and secure a priority design sprint using my personal referral link:
${referralLink}

When you contact them, mention that ${sender} referred you to receive priority scheduling and a complimentary creative consultation.

Warm regards,
${sender}`;
  }, [recipientName, referrerName, referralLink]);

  // WhatsApp share link
  const whatsappShareUrl = useMemo(() => {
    const text = `Hey! I wanted to recommend Plain GraFix for any branding or graphic design needs. Check out their portfolio and book priority onboarding through my link: ${referralLink}`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  }, [referralLink]);

  // Mailto link for direct launch of user's email client
  const mailtoUrl = useMemo(() => {
    const to = recipientEmail.trim();
    return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;
  }, [recipientEmail, emailSubject, emailBody]);

  const copyTextSafely = async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const copied = document.execCommand('copy');
      document.body.removeChild(textArea);
      return copied;
    } catch {
      return false;
    }
  };

  const handleCopyLink = async () => {
    const ok = await copyTextSafely(referralLink);
    if (ok) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleCopyTemplate = async () => {
    const fullText = `Subject: ${emailSubject}\n\n${emailBody}`;
    const ok = await copyTextSafely(fullText);
    if (ok) {
      setCopiedTemplate(true);
      setTimeout(() => setCopiedTemplate(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Plain GraFix - Referral Invitation',
          text: `Explore Plain GraFix design services via my referral link: ${referralLink}`,
          url: referralLink,
        });
      } catch {
        // User cancelled or share failed silently
      }
    } else {
      await handleCopyLink();
    }
  };

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

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-3xl p-5 sm:p-7 md:p-8 shadow-[0_0_80px_rgba(234,88,12,0.22)] z-10 my-4 max-h-[92vh] flex flex-col overflow-hidden text-left"
        >
          {/* Header Bar */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-800/80">
            <div className="flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ea580c]/10 border border-[#ea580c]/30 text-[#ea580c] text-xs font-semibold tracking-wide mb-2">
                <Gift size={13} />
                <span>REFERRAL PARTNER PROGRAM</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                Refer a Client & Grow Together
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-lg leading-relaxed">
                Connect your network with Plain GraFix. Your referrals skip the waitlist with VIP priority onboarding, and you earn an exclusive studio reward on your next project.
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 transition shrink-0 cursor-pointer"
              aria-label="Close Refer a Client modal"
              data-cursor-label="CLOSE"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto py-5 space-y-6 pr-1 custom-scrollbar">
            {/* Value Props & Incentives Pill Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-neutral-800/90 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-[#ea580c] font-semibold text-xs mb-1">
                  <Gift size={14} />
                  <span>Double Reward</span>
                </div>
                <p className="text-xs text-neutral-300 leading-snug">
                  15% credit or up to <span className="text-white font-semibold">R2,500</span> off your next design sprint.
                </p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-neutral-800/90 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-white font-semibold text-xs mb-1">
                  <Clock size={14} className="text-[#ea580c]" />
                  <span>VIP Priority Queue</span>
                </div>
                <p className="text-xs text-neutral-300 leading-snug">
                  Your referred colleague jumps to the top of our sprint calendar immediately.
                </p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-neutral-800/90 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-white font-semibold text-xs mb-1">
                  <ShieldCheck size={14} className="text-[#ea580c]" />
                  <span>Guaranteed Craft</span>
                </div>
                <p className="text-xs text-neutral-300 leading-snug">
                  100+ projects completed with 100% full commercial IP transfer upon delivery.
                </p>
              </div>
            </div>

            {/* Quick Tab Selector */}
            <div className="flex items-center gap-2 border-b border-neutral-800/70 pb-3">
              <button
                onClick={() => setActiveTab('email')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'email'
                    ? 'bg-[#ea580c] text-white shadow-[0_0_15px_rgba(234,88,12,0.4)]'
                    : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Mail size={13} />
                <span>Pre-Filled Email Template</span>
              </button>

              <button
                onClick={() => setActiveTab('link')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'link'
                    ? 'bg-[#ea580c] text-white shadow-[0_0_15px_rgba(234,88,12,0.4)]'
                    : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Share2 size={13} />
                <span>Referral Link & WhatsApp</span>
              </button>
            </div>

            {/* TAB 1: PRE-FILLED EMAIL TEMPLATE COMPOSER */}
            {activeTab === 'email' && (
              <div className="space-y-4">
                {/* Input Fields: Referrer Name & Recipient Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Your Name / Company
                    </label>
                    <input
                      type="text"
                      value={referrerName}
                      onChange={(e) => setReferrerName(e.target.value)}
                      placeholder="e.g. Alex M. or Veloce Labs"
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#ea580c] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none transition select-text"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Friend / Client's Email
                    </label>
                    <input
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="e.g. founder@company.co.za"
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#ea580c] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none transition select-text"
                    />
                  </div>
                </div>

                {/* Optional Recipient Name & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Their First Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="e.g. Sarah"
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#ea580c] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none transition select-text"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Email Subject
                    </label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#ea580c] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none transition select-text"
                    />
                  </div>
                </div>

                {/* Pre-filled Email Body Live Preview Box */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-neutral-400">
                      Pre-Filled Message Preview (Live Editable)
                    </span>
                    <button
                      onClick={handleCopyTemplate}
                      className="text-[11px] text-[#ea580c] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copiedTemplate ? (
                        <>
                          <Check size={12} className="text-green-400" />
                          <span className="text-green-400">Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy Template Text</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 font-mono text-xs text-neutral-300 whitespace-pre-wrap leading-relaxed max-h-52 overflow-y-auto selection:bg-[#ea580c] selection:text-white">
                    {emailBody}
                  </div>
                </div>

                {/* Action Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    {/* Send Email via User's Native Client (mailto) */}
                    <a
                      href={mailtoUrl}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs sm:text-sm transition-all duration-200 active:scale-95 shadow-[0_0_20px_rgba(234,88,12,0.4)] cursor-pointer"
                      data-cursor-label="SEND"
                    >
                      <Send size={14} />
                      <span>Send Email Now</span>
                    </a>

                    {/* Copy Template Button */}
                    <button
                      onClick={handleCopyTemplate}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-neutral-700 hover:border-neutral-500 text-white font-semibold text-xs sm:text-sm transition cursor-pointer"
                    >
                      {copiedTemplate ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                      <span>{copiedTemplate ? 'Copied!' : 'Copy Template'}</span>
                    </button>
                  </div>

                  {/* Share on WhatsApp */}
                  <a
                    href={whatsappShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/50 text-white font-medium text-xs transition cursor-pointer"
                    data-cursor-label="WHATSAPP"
                  >
                    <WhatsAppIcon size={14} />
                    <span>Share on WhatsApp</span>
                  </a>
                </div>
              </div>
            )}

            {/* TAB 2: REFERRAL LINK & MULTI-CHANNEL SHARE */}
            {activeTab === 'link' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Your Personalized Referral Link
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 font-mono text-xs text-neutral-200 truncate select-all">
                      {referralLink}
                    </div>
                    <button
                      onClick={handleCopyLink}
                      className="px-4 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-95 shadow-[0_0_15px_rgba(234,88,12,0.3)]"
                      data-cursor-label="COPY"
                    >
                      {copiedLink ? <Check size={14} className="text-white" /> : <Copy size={14} />}
                      <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                    </button>
                  </div>
                </div>

                {/* Instant Share Channels */}
                <div className="pt-3 border-t border-neutral-800/80">
                  <span className="block text-xs font-medium text-neutral-400 mb-2.5">
                    Direct One-Click Sharing Channels
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <a
                      href={whatsappShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 flex items-center gap-3 transition cursor-pointer group"
                      data-cursor-label="WHATSAPP"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-black shrink-0 shadow-sm">
                        <WhatsAppIcon size={16} />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-bold text-white group-hover:text-[#25D366] transition">
                          WhatsApp Message
                        </span>
                        <span className="text-[11px] text-neutral-400">Share with contact or group</span>
                      </div>
                    </a>

                    <a
                      href={mailtoUrl}
                      className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-neutral-800 flex items-center gap-3 transition cursor-pointer group"
                      data-cursor-label="EMAIL"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#ea580c] flex items-center justify-center text-white shrink-0 shadow-sm">
                        <Mail size={15} />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-bold text-white group-hover:text-[#ea580c] transition">
                          Email Invitation
                        </span>
                        <span className="text-[11px] text-neutral-400">Launch default email software</span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Native OS Share Button if available */}
                <div className="pt-2">
                  <button
                    onClick={handleNativeShare}
                    className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Share2 size={14} />
                    <span>Open System Share Sheet (AirDrop, Slack, Messages)</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Assistance */}
          <div className="pt-4 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
            <div className="flex items-center gap-1.5">
              <Sparkles size={13} className="text-[#ea580c]" />
              <span>Questions regarding our referral tiers? Contact our team anytime.</span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`mailto:${EMAIL_ADDRESS}?subject=Referral%20Inquiry%20-%20Plain%20GraFix`}
                className="text-neutral-300 hover:text-white underline text-xs"
              >
                {EMAIL_ADDRESS}
              </a>
              <span className="text-neutral-600">•</span>
              <span className="font-mono text-neutral-400">{WHATSAPP_DISPLAY}</span>
            </div>
          </div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
