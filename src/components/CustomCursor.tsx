import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) {
        setIsVisible(true);
        ringPos.current = { x: e.clientX, y: e.clientY };
      }

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = Boolean(
          target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer, [data-interactive="true"]')
        );
        setIsHovering(interactive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const updatePosition = () => {
      const lerp = 0.22;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId.current = requestAnimationFrame(updatePosition);
    };

    animationFrameId.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isVisible]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-200 hidden md:block ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Precision Lead Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full bg-white transition-all duration-100 ${
          isClicking ? 'w-1 h-1 scale-90' : isHovering ? 'w-1.5 h-1.5' : 'w-1.5 h-1.5'
        }`}
      />

      {/* Minimal Monochrome Circular Halo */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border border-white/40 transition-all duration-300 ease-out flex items-center justify-center ${
          isClicking
            ? 'w-6 h-6 scale-90 border-white/60 bg-white/10'
            : isHovering
            ? 'w-10 h-10 border-white bg-white/5 scale-110'
            : 'w-7 h-7 border-white/30 bg-transparent'
        }`}
      />
    </div>
  );
};
