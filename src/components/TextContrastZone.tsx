import React from 'react';

export interface TextContrastZoneProps {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  as?: 'p' | 'span' | 'div' | 'h2' | 'h3';
  className?: string;
  style?: React.CSSProperties;
}

/**
 * TextContrastZone creates a seamless, non-card reading zone
 * directly behind typography to ensure high contrast against the
 * 3D animated particle canvas without borders, boxes, shadows, or rounded cards.
 */
export const TextContrastZone: React.FC<TextContrastZoneProps> = ({
  children,
  align = 'left',
  as: Component = 'div',
  className = '',
  style = {}
}) => {
  const getGradient = () => {
    if (align === 'center') {
      return 'linear-gradient(90deg, rgba(10, 10, 10, 0) 0%, rgba(10, 10, 10, 0.90) 20%, rgba(10, 10, 10, 0.92) 50%, rgba(10, 10, 10, 0.90) 80%, rgba(10, 10, 10, 0) 100%)';
    }
    if (align === 'right') {
      return 'linear-gradient(270deg, rgba(10, 10, 10, 0.90) 0%, rgba(10, 10, 10, 0.70) 65%, rgba(10, 10, 10, 0) 100%)';
    }
    // Default left-to-right fade
    return 'linear-gradient(90deg, rgba(10, 10, 10, 0.90) 0%, rgba(10, 10, 10, 0.70) 65%, rgba(10, 10, 10, 0) 100%)';
  };

  const defaultPadding =
    align === 'center'
      ? 'py-1.5 px-6'
      : align === 'right'
      ? 'py-1.5 pl-6 pr-3 -mr-3'
      : 'py-1.5 pl-3 pr-8 -ml-3';

  return (
    <Component
      className={`inline-block text-[#F2F0E6] ${defaultPadding} ${className}`}
      style={{
        background: getGradient(),
        ...style
      }}
    >
      {children}
    </Component>
  );
};
