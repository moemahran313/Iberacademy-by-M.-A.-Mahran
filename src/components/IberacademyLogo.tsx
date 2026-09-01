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
        
        {/* Minimalist modern Mexican Aztec Bird Mascot */}
        <svg
          viewBox="0 0 100 100"
          className="w-7 h-7 text-white"
          fill="none"
        >
          {/* Beak lines */}
          <line x1="41" y1="21" x2="31" y2="21" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="41" y1="27" x2="29" y2="27" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="41" y1="33" x2="31" y2="33" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

          {/* Head & Neck */}
          <path d="M 43 37 C 43 18, 59 18, 59 29 C 59 36, 54 39, 50 41" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none" />

          {/* Eye (Concentric) */}
          <circle cx="50" cy="27" r="7.5" stroke="currentColor" strokeWidth="2.2" fill="none" />
          <circle cx="50" cy="27" r="3" fill="currentColor" />

          {/* Central Aztec Shield Body (Concentric Circles) */}
          <circle cx="50" cy="53" r="14.5" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <circle cx="50" cy="53" r="9.5" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <circle cx="50" cy="53" r="4.5" fill="currentColor" />

          {/* Left Wing & Feathers */}
          <path d="M 36 41 L 13 41 C 11 41, 11 43, 11 45 L 11 61" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
          <line x1="17" y1="41" x2="17" y2="61" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="23" y1="41" x2="23" y2="61" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="29" y1="41" x2="29" y2="61" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="35" y1="41" x2="35" y2="61" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

          {/* Right Wing & Feathers */}
          <path d="M 64 41 L 87 41 C 89 41, 89 43, 89 45 L 89 61" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
          <line x1="83" y1="41" x2="83" y2="61" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="77" y1="41" x2="77" y2="61" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="71" y1="41" x2="71" y2="61" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="65" y1="41" x2="65" y2="61" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

          {/* Tail Feathers (Splayed) */}
          <line x1="41" y1="67" x2="37" y2="85" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="45" y1="68" x2="43" y2="88" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="50" y1="69" x2="50" y2="90" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="55" y1="68" x2="57" y2="88" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="59" y1="67" x2="63" y2="85" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
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

export const AztecBirdMascot: React.FC<{
  size?: number;
  className?: string;
  interactive?: boolean;
  showAura?: boolean;
  onSpeech?: () => void;
}> = ({ size = 64, className = '', interactive = true, showAura = true, onSpeech }) => {
  return (
    <motion.div
      onClick={onSpeech}
      whileHover={interactive ? { scale: 1.05, rotate: -2 } : {}}
      whileTap={interactive ? { scale: 0.95, rotate: 2 } : {}}
      className={`relative inline-flex items-center justify-center cursor-pointer group ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer Aztec Sun Aura */}
      {showAura && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/20 via-orange-500/20 to-red-500/20 blur-xl group-hover:blur-2xl transition-all duration-300 animate-pulse" />
      )}

      {/* Main Mascot Emblem Container */}
      <div 
        className="w-full h-full rounded-2xl bg-gradient-to-br from-orange-500 via-amber-600 to-stone-900 flex items-center justify-center p-2.5 shadow-xl shadow-orange-500/20 border border-orange-400/30 relative overflow-hidden"
      >
        {/* Sunbeam Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-300/20 via-transparent to-transparent opacity-60 pointer-events-none" />

        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-white drop-shadow-md transition-transform duration-300 group-hover:scale-105"
          fill="none"
        >
          {/* Solar Ray Accents around Mascot Head */}
          <line x1="50" y1="6" x2="50" y2="12" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" />
          <line x1="68" y1="12" x2="64" y2="17" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" />
          <line x1="32" y1="12" x2="36" y2="17" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" />

          {/* Beak lines */}
          <line x1="41" y1="21" x2="27" y2="21" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="41" y1="27" x2="25" y2="27" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="41" y1="33" x2="27" y2="33" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />

          {/* Head & Neck */}
          <path d="M 43 37 C 43 18, 61 18, 61 29 C 61 36, 56 39, 50 41" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />

          {/* Eye (Concentric Golden Sun Eye) */}
          <circle cx="50" cy="27" r="8" stroke="currentColor" strokeWidth="2.5" fill="#fbbf24" />
          <circle cx="50" cy="27" r="3.5" fill="#78350f" />

          {/* Central Aztec Shield Body */}
          <circle cx="50" cy="53" r="15" stroke="currentColor" strokeWidth="3" fill="none" />
          <circle cx="50" cy="53" r="10" stroke="#fef08a" strokeWidth="2.5" fill="none" />
          <circle cx="50" cy="53" r="5" fill="#f59e0b" />

          {/* Left Wing & Feathers */}
          <path d="M 36 41 L 11 41 C 9 41, 9 43, 9 45 L 9 61" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <line x1="15" y1="41" x2="15" y2="61" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="21" y1="41" x2="21" y2="61" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="27" y1="41" x2="27" y2="61" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="33" y1="41" x2="33" y2="61" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

          {/* Right Wing & Feathers */}
          <path d="M 64 41 L 89 41 C 91 41, 91 43, 91 45 L 91 61" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <line x1="85" y1="41" x2="85" y2="61" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="79" y1="41" x2="79" y2="61" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="73" y1="41" x2="73" y2="61" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="67" y1="41" x2="67" y2="61" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

          {/* Tail Feathers */}
          <line x1="41" y1="67" x2="35" y2="88" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="45" y1="68" x2="43" y2="92" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="50" y1="69" x2="50" y2="94" stroke="#fef08a" strokeWidth="4" strokeLinecap="round" />
          <line x1="55" y1="68" x2="57" y2="92" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="59" y1="67" x2="65" y2="88" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      </div>
    </motion.div>
  );
};

export const IberacademyLogo = IberioLogo;
