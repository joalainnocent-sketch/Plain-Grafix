import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageCode } from '../translations/types';

interface LanguageSelectorProps {
  className?: string;
  variant?: 'compact' | 'expanded';
  dropdownAlign?: 'left' | 'right' | 'auto';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className = '',
  variant = 'compact',
  dropdownAlign = 'right',
}) => {
  const { language, setLanguage, languages, currentLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const saLanguages = languages.filter((l) => l.region === 'South Africa');
  const intlLanguages = languages.filter((l) => l.region === 'International');

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      {/* Dropdown Toggle Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Language selector. Current language: ${currentLanguage.label}`}
        data-cursor-label="LANG"
        className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer focus:outline-none ${
          isOpen
            ? 'bg-neutral-800/90 border-[#ea580c] text-white shadow-[0_0_15px_rgba(234,88,12,0.3)]'
            : 'bg-white/5 hover:bg-white/10 border-neutral-800 hover:border-neutral-700 text-white/90 hover:text-white'
        }`}
      >
        <span className="text-xs sm:text-sm">{currentLanguage.flag}</span>
        <span className="text-xs sm:text-sm font-semibold tracking-tight uppercase">
          {currentLanguage.code}
        </span>
        {variant === 'expanded' && (
          <span className="hidden md:inline text-xs text-neutral-400 font-normal">
            {currentLanguage.label}
          </span>
        )}
        <ChevronDown
          size={13}
          className={`text-neutral-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#ea580c]' : ''
          }`}
        />
      </button>

      {/* Animated Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={`absolute ${
              dropdownAlign === 'left'
                ? 'left-0'
                : dropdownAlign === 'auto'
                ? 'right-0 sm:right-0 max-sm:-right-4'
                : 'right-0'
            } mt-2 w-[calc(100vw-2rem)] max-w-[280px] sm:w-72 rounded-2xl bg-neutral-950/95 border border-neutral-800 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(234,88,12,0.15)] backdrop-blur-xl z-50 p-2 overflow-hidden`}
            role="listbox"
            aria-label={t('lang_selector_title')}
          >
            {/* Header / Title */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-800/80 mb-1">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#ea580c]">
                <Globe size={12} />
                <span>{t('lang_selector_title')}</span>
              </div>
              <span className="text-[10px] font-mono text-neutral-400">ZA & INT</span>
            </div>

            <div className="max-h-[340px] overflow-y-auto space-y-3 py-1 custom-scrollbar">
              {/* SOUTH AFRICAN LANGUAGES SECTION */}
              <div>
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  🇿🇦 {t('lang_region_sa')}
                </div>
                <div className="space-y-0.5 mt-1">
                  {saLanguages.map((item) => {
                    const isSelected = language === item.code;
                    return (
                      <button
                        key={item.code}
                        onClick={() => handleSelect(item.code)}
                        role="option"
                        aria-selected={isSelected}
                        data-cursor-label={item.code.toUpperCase()}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition cursor-pointer ${
                          isSelected
                            ? 'bg-[#ea580c]/15 text-[#ea580c] font-semibold border border-[#ea580c]/30'
                            : 'text-neutral-300 hover:bg-white/5 hover:text-white border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-sm">{item.flag}</span>
                          <div className="flex flex-col">
                            <span className="font-medium text-white">{item.nativeName}</span>
                            <span className="text-[10px] text-neutral-400">
                              {item.label} • South Africa
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                            {item.code}
                          </span>
                          {isSelected && <Check size={14} className="text-[#ea580c]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* INTERNATIONAL LANGUAGES SECTION */}
              <div className="border-t border-neutral-900 pt-2">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  🌐 {t('lang_region_intl')}
                </div>
                <div className="space-y-0.5 mt-1">
                  {intlLanguages.map((item) => {
                    const isSelected = language === item.code;
                    return (
                      <button
                        key={item.code}
                        onClick={() => handleSelect(item.code)}
                        role="option"
                        aria-selected={isSelected}
                        data-cursor-label={item.code.toUpperCase()}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition cursor-pointer ${
                          isSelected
                            ? 'bg-[#ea580c]/15 text-[#ea580c] font-semibold border border-[#ea580c]/30'
                            : 'text-neutral-300 hover:bg-white/5 hover:text-white border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-sm">{item.flag}</span>
                          <div className="flex flex-col">
                            <span className="font-medium text-white">{item.nativeName}</span>
                            <span className="text-[10px] text-neutral-400">
                              {item.label} • Global
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">
                            {item.code}
                          </span>
                          {isSelected && <Check size={14} className="text-[#ea580c]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
