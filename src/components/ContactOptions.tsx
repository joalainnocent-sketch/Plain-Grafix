import React from 'react';
import { Phone } from 'lucide-react';

export const WHATSAPP_NUMBER = '+27697022221';
export const WHATSAPP_DISPLAY = '+27 69 702 2221';
export const WHATSAPP_LINK = 'https://wa.me/27697022221?text=Hello%20Plain%20GraFix!%20I%20would%20like%20to%20inquire%20about%20your%20design%20services.';
export const CALL_LINK = 'tel:+27697022221';
export const EMAIL_ADDRESS = 'plaingrafix@gmail.com';
export const EMAIL_LINK = 'mailto:plaingrafix@gmail.com?subject=Design%20Inquiry%20-%20Plain%20GraFix';
export const FACEBOOK_LINK = 'https://web.facebook.com/profile.php?id=61576931625644';
export const INSTAGRAM_LINK = 'https://www.instagram.com/plain_grafix?srtk=MXNlenVtMW8wc3piZA==';
export const INSTAGRAM_HANDLE = '@plain_grafix';

export const WhatsAppIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 18,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    <path
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982 1-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.888 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.952 3.71 1.453 5.711 1.454h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z"
      fill="currentColor"
    />
  </svg>
);

export const ContactQuickPill: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 sm:gap-2 bg-neutral-950/80 border border-neutral-800 rounded-full p-1 sm:p-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)] ${className}`}
    >
      {/* Phone Number Display */}
      <span className="text-[11px] sm:text-xs font-mono font-medium text-neutral-300 px-2 sm:px-2.5 select-all">
        {WHATSAPP_DISPLAY}
      </span>

      {/* WhatsApp Action */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-black font-bold text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full transition-all duration-200 cursor-pointer shadow-[0_0_12px_rgba(37,211,102,0.3)]"
        data-cursor-label="CHAT"
        title="Chat on WhatsApp (+27 69 702 2221)"
      >
        <WhatsAppIcon size={13} className="text-black" />
        <span>WhatsApp</span>
      </a>

      {/* Direct Call Action */}
      <a
        href={CALL_LINK}
        className="inline-flex items-center gap-1 bg-white hover:bg-neutral-200 active:scale-95 text-black font-bold text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full transition-all duration-200 cursor-pointer shadow-sm"
        data-cursor-label="CALL"
        title="Call Plain GraFix (+27 69 702 2221)"
      >
        <Phone size={11} className="text-black fill-black" />
        <span>Call</span>
      </a>
    </div>
  );
};
