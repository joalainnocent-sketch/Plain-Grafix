export type LanguageCode = 'en' | 'zu' | 'xh' | 'af' | 'st' | 'fr' | 'es';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeName: string;
  region: 'South Africa' | 'International';
  flag: string;
}

export interface TranslationDictionary {
  // Navigation
  nav_about: string;
  nav_results: string;
  nav_services: string;
  nav_process: string;
  nav_faq: string;
  nav_referral: string;
  
  // Header & Brand
  hero_badge: string;
  hero_title_line1: string;
  hero_title_accent1: string;
  hero_title_accent2: string;
  hero_title_line3: string;
  hero_title_accent4: string;
  
  // CTAs
  btn_start_project: string;
  btn_partner_with_us: string;
  btn_vision_journey: string;
  btn_back_to_home: string;
  btn_call_direct: string;
  btn_email_us: string;
  
  // Stats
  stat_projects_label_top: string;
  stat_projects_label_bottom: string;
  stat_satisfaction_label_top: string;
  stat_satisfaction_label_bottom: string;
  
  // Welcome & studio statement
  greeting_badge: string;
  greeting_salutation: string;
  greeting_tagline_part1: string;
  greeting_tagline_part2: string;
  greeting_description: string;
  greeting_cta: string;
  
  // Testimonial
  testimonial_quote_1: string;
  testimonial_author_1: string;
  testimonial_client_label: string;
  
  // Footer & Links
  footer_about_badge: string;
  footer_rights: string;
  whatsapp_chat_label: string;
  call_label: string;
  email_label: string;
  
  // Language Switcher
  lang_selector_title: string;
  lang_region_sa: string;
  lang_region_intl: string;
}
