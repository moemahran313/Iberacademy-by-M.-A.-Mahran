import React from 'react';
import { playTactileClick, hapticTap } from '../../utils/haptics';

export type TactileButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'amber'
  | 'sky'
  | 'danger'
  | 'ghost';

export type TactileButtonSize = 'sm' | 'md' | 'lg';

export interface TactileButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TactileButtonVariant;
  size?: TactileButtonSize;
  haptic?: boolean;
  sound?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const VARIANT_STYLES: Record<TactileButtonVariant, string> = {
  primary:
    'bg-[#C85A32] text-white hover:bg-[#B34E29] shadow-[0_4px_0_#8F3415] active:shadow-[0_0_0_#8F3415]',
  success:
    'bg-emerald-600 text-white hover:bg-emerald-700 shadow-[0_4px_0_#065F46] active:shadow-[0_0_0_#065F46]',
  secondary:
    'bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-100 hover:bg-stone-300 dark:hover:bg-stone-700 shadow-[0_4px_0_#A8A29E] dark:shadow-[0_4px_0_#1C1917] active:shadow-[0_0_0_transparent]',
  amber:
    'bg-amber-500 text-stone-900 hover:bg-amber-400 shadow-[0_4px_0_#B45309] active:shadow-[0_0_0_#B45309]',
  sky:
    'bg-sky-600 text-white hover:bg-sky-700 shadow-[0_4px_0_#0369A1] active:shadow-[0_0_0_#0369A1]',
  danger:
    'bg-rose-600 text-white hover:bg-rose-700 shadow-[0_4px_0_#9F1239] active:shadow-[0_0_0_#9F1239]',
  ghost:
    'bg-transparent text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 shadow-none active:translate-y-0.5'
};

const SIZE_STYLES: Record<TactileButtonSize, string> = {
  sm: 'text-xs font-bold py-1.5 px-3 rounded-xl gap-1.5 min-h-[36px]',
  md: 'text-sm font-bold py-2.5 px-4 rounded-2xl gap-2 min-h-[44px]',
  lg: 'text-base font-bold py-3.5 px-6 rounded-2xl gap-2.5 min-h-[52px]'
};

/**
 * Tactile 3D Button Component
 * Features authentic mechanical bottom bevel (box-shadow: 0 4px 0 #...),
 * translating downwards by 4px on active press with synthesized Web Audio micro-click
 * and native mobile haptic feedback.
 */
export const TactileButton: React.FC<TactileButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  haptic = true,
  sound = true,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  disabled,
  onClick,
  onMouseDown,
  onTouchStart,
  ...rest
}) => {
  const handleInteractionFeedback = () => {
    if (disabled) return;
    if (sound) playTactileClick();
    if (haptic) hapticTap();
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    handleInteractionFeedback();
    onClick?.(e);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && sound) {
      playTactileClick();
    }
    onMouseDown?.(e);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    if (!disabled && haptic) {
      hapticTap();
    }
    onTouchStart?.(e);
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-sans tracking-tight select-none cursor-pointer transition-all duration-75 ease-out outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500';

  const motionTransformStyles = disabled
    ? 'opacity-40 cursor-not-allowed shadow-none active:translate-y-0'
    : 'active:translate-y-1';

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className={`${baseStyles} ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${motionTransformStyles} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...rest}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
