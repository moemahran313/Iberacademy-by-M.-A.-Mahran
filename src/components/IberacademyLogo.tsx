import React from 'react';
import { motion } from 'motion/react';

interface IberioLogoProps {
  variant?: 'full' | 'compact' | 'icon' | 'banner';
  className?: string;
  showSubtitle?: boolean;
}

export const IberioLogo: React.FC<IberioLogoProps> = ({
  variant = 'full',
  className = '',
  showSubtitle = true,
}) => {
  // Custom spring physics for world-class, premium feel on interaction
  const logoTransition = {
    type: "spring",
    stiffness: 380,
    damping: 18,
    mass: 0.8
  };

  const IconSymbol = (
    <motion.div
      className="relative flex items-center justify-center shrink-0 cursor-pointer"
      whileHover={{ scale: 1.1, rotate: -2 }}
      whileTap={{ scale: 0.9, rotate: 3, y: 1 }}
      transition={logoTransition}
    >
      {/* World-class geometric "IB" Badge - Pure luxury orange design */}
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 flex items-center justify-center shadow-lg shadow-orange-500/15 border border-white/10 relative overflow-hidden group">
        {/* Subtle inner light gloss effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Minimalist modern SVG Monogram (IB) */}
        <svg
          viewBox="0 0 24 24"
          className="w-5.5 h-5.5 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Elegant geometric 'I' */}
          <path d="M5 5v14" />
          
          {/* Elegant geometric 'B' */}
          <path d="M10 5v14" />
          <path d="M10 5h4.5a3.25 3.25 0 0 1 0 6.5H10" />
          <path d="M10 11.5h5a3.75 3.75 0 0 1 0 7.5H10" />
        </svg>
      </div>
    </motion.div>
  );

  if (variant === 'icon') {
    return IconSymbol;
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {IconSymbol}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center gap-1">
          <span className="text-2xl font-black tracking-tight text-orange-500 font-sans">
            Iberio
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block shrink-0 animate-pulse" />
        </div>
        {showSubtitle && (
          <span className="text-[9px] font-bold text-stone-400 dark:text-stone-500 tracking-widest mt-0.5 font-mono uppercase">
            by M. Mahran
          </span>
        )}
      </div>
    </div>
  );
};

export const IberacademyLogo = IberioLogo;
