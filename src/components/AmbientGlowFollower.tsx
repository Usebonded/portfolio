import React, { useEffect, useState } from 'react';

export const AmbientGlowFollower: React.FC = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(650px circle at ${pos.x}px ${pos.y}px, rgba(91, 91, 255, 0.09), rgba(124, 124, 255, 0.04) 45%, transparent 75%)`
      }}
    />
  );
};
