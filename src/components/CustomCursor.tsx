import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Mouse coords
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only activate custom cursor on fine pointer devices (desktop mouse/trackpad)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsPointerDevice(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsPointerDevice(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    if (!mediaQuery.matches) {
      return () => mediaQuery.removeEventListener('change', handleMediaChange);
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible((prev) => (prev ? prev : true));

      // Direct update for the fast inner dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'button, a, input, textarea, select, [role="button"], .cursor-pointer, [data-interactive="true"], summary'
      );

      if (interactive) {
        setIsHovered(true);
        // Check for custom cursor label attribute if present
        const customLabel = interactive.getAttribute('data-cursor-label');
        setHoverLabel(customLabel);
      } else {
        setIsHovered(false);
        setHoverLabel(null);
      }
    };

    // Smooth animation loop for the outer trailing ring
    const renderLoop = () => {
      const ease = 0.18; // smooth trailing speed
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    rafId.current = requestAnimationFrame(renderLoop);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', onMouseOver);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!isPointerDevice) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Outer Smooth Trailing Ring (Expands on Hover) */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none transition-all duration-300 ease-out flex items-center justify-center ${
          isHovered
            ? 'w-14 h-14 bg-[#ea580c]/15 border-2 border-[#ea580c] shadow-[0_0_24px_rgba(234,88,12,0.5),inset_0_0_12px_rgba(234,88,12,0.25)] backdrop-blur-[1px]'
            : isClicked
            ? 'w-7 h-7 bg-[#ea580c]/25 border border-[#ea580c] shadow-[0_0_12px_rgba(234,88,12,0.4)]'
            : 'w-9 h-9 border border-[#ea580c]/60 bg-[#ea580c]/5 shadow-[0_0_14px_rgba(234,88,12,0.2)]'
        }`}
        style={{ willChange: 'transform, width, height' }}
      >
        {/* Subtle label if element has data-cursor-label */}
        {hoverLabel && (
          <span className="text-[9px] font-black uppercase text-white tracking-widest px-1 py-0.5 rounded bg-black/80 border border-[#ea580c]/40 animate-pulse">
            {hoverLabel}
          </span>
        )}
      </div>

      {/* Inner Precision Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none transition-transform duration-100 ease-out ${
          isHovered
            ? 'w-2 h-2 bg-[#ff7828] shadow-[0_0_8px_#ff7828]'
            : isClicked
            ? 'w-3 h-3 bg-[#ea580c] shadow-[0_0_12px_#ea580c]'
            : 'w-2 h-2 bg-[#ea580c] shadow-[0_0_8px_#ea580c]'
        }`}
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};

export default CustomCursor;
