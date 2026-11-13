import React from 'react';

export const PLAIN_GRAFIX_LOGO_URL = 'https://res.cloudinary.com/nac8cpnc/image/upload/v1787408863/PLAIN_GRAFIX.png';

interface LogoProps {
  className?: string;
  size?: number;
  alt?: string;
  withWordmark?: boolean;
}

/**
 * Plain GraFix Official Brand Logo Image
 * Loaded directly from the official Cloudinary asset CDN
 */
export const PlainGrafixLogoImage: React.FC<{
  size?: number;
  className?: string;
  alt?: string;
}> = ({ size = 36, className = '', alt = 'Plain GraFix Logo' }) => {
  return (
    <img
      src={PLAIN_GRAFIX_LOGO_URL}
      alt={alt}
      width={size}
      height={size}
      style={{ width: `${size}px`, height: 'auto', maxHeight: `${size * 1.5}px` }}
      className={`object-contain select-none shrink-0 ${className}`}
      loading="eager"
      decoding="async"
    />
  );
};

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 36,
  alt = 'Plain GraFix',
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <PlainGrafixLogoImage size={size} alt={alt} />
    </div>
  );
};

export const PlainGrafixBrandIcon: React.FC<{
  size?: number;
  className?: string;
  innerColor?: string;
}> = ({ size = 36, className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <PlainGrafixLogoImage size={size} />
    </div>
  );
};

export const CleanApertureLogo: React.FC<{
  size?: number;
  color?: string;
  className?: string;
  withText?: boolean;
}> = ({ size = 36, className = '' }) => {
  return (
    <PlainGrafixLogoImage size={size} className={className} />
  );
};

export const PlainGrafixMonogram = CleanApertureLogo;
export default Logo;
