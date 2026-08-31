import React, { useState } from 'react';
import { getAvatarById, getDeterministicGradient } from '../data/avatars';

interface AvatarDisplayProps {
  photoURL?: string | null;
  avatarId?: string | null;
  name?: string | null;
  email?: string | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  showBorder?: boolean;
}

const SIZE_MAP = {
  xs: {
    container: 'w-6 h-6 text-xs',
    emoji: 'text-xs',
    initial: 'text-[10px]'
  },
  sm: {
    container: 'w-8 h-8 text-sm',
    emoji: 'text-sm',
    initial: 'text-xs'
  },
  md: {
    container: 'w-10 h-10 text-base',
    emoji: 'text-lg',
    initial: 'text-sm'
  },
  lg: {
    container: 'w-14 h-14 text-xl',
    emoji: 'text-2xl',
    initial: 'text-lg'
  },
  xl: {
    container: 'w-20 h-20 text-3xl',
    emoji: 'text-4xl',
    initial: 'text-2xl'
  },
  '2xl': {
    container: 'w-24 h-24 text-4xl',
    emoji: 'text-5xl',
    initial: 'text-3xl'
  }
};

export const AvatarDisplay: React.FC<AvatarDisplayProps> = ({
  photoURL,
  avatarId,
  name,
  email,
  size = 'md',
  className = '',
  showBorder = true
}) => {
  const [imgError, setImgError] = useState(false);
  const sizeConfig = SIZE_MAP[size] || SIZE_MAP.md;

  const displayName = name || email || 'Learner';
  const initial = displayName.trim().charAt(0).toUpperCase() || 'U';

  // 1. If photoURL is provided and has not failed to load
  if (photoURL && !imgError) {
    return (
      <div
        className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden shadow-xs ${
          sizeConfig.container
        } ${showBorder ? 'ring-2 ring-amber-500/40' : ''} ${className}`}
      >
        <img
          src={photoURL}
          alt={displayName}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // 2. If avatarId is provided
  if (avatarId) {
    const avatar = getAvatarById(avatarId);
    return (
      <div
        className={`relative inline-flex items-center justify-center shrink-0 rounded-full bg-gradient-to-br ${
          avatar.gradient
        } text-white shadow-sm select-none transition-transform ${sizeConfig.container} ${
          showBorder ? 'ring-2 ring-white/20 dark:ring-stone-700/60' : ''
        } ${className}`}
        title={`${displayName} • ${avatar.name}`}
      >
        <span className={`${sizeConfig.emoji} drop-shadow-sm`}>{avatar.emoji}</span>
      </div>
    );
  }

  // 3. Fallback to Initials with deterministic high-contrast gradient
  const gradient = getDeterministicGradient(displayName);
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full bg-gradient-to-br ${gradient} text-white font-black shadow-sm select-none ${
        sizeConfig.container
      } ${showBorder ? 'ring-2 ring-white/20 dark:ring-stone-700/60' : ''} ${className}`}
      title={displayName}
    >
      <span className={`${sizeConfig.initial} tracking-wider drop-shadow-xs`}>{initial}</span>
    </div>
  );
};
