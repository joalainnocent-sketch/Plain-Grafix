import React, { useEffect, useState } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none overflow-visible"
      aria-hidden="true"
    >
      {/* Background Track (Subtle Dark Orange Tint) */}
      <div className="absolute inset-0 bg-[#ea580c]/15" />

      {/* Active Glowing Orange Progress Bar */}
      <div
        className="h-full bg-gradient-to-r from-[#ea580c] via-[#ff7828] to-[#ea580c] relative transition-[width] duration-150 ease-out shadow-[0_0_12px_2px_rgba(234,88,12,0.9),0_0_24px_4px_rgba(234,88,12,0.6)]"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Leading bright glow point */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full blur-[2px] opacity-90 shadow-[0_0_12px_#ffffff,0_0_20px_#ea580c]" />
      </div>
    </div>
  );
};
