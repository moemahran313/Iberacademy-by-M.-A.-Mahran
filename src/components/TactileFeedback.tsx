import React from 'react';
import { motion } from 'motion/react';

interface TactileFeedbackProps {
  children: React.ReactNode;
  /**
   * The style of the pulse/tactile feedback.
   * 'click': High-frequency crisp button feedback
   * 'success': Expanding physical bounce + pulse
   * 'subtle': Tiny crisp spring tap
   */
  variant?: 'click' | 'success' | 'subtle';
  /**
   * Can trigger a manual pulse when this value changes (e.g. completion trigger)
   */
  triggerKey?: any;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * Centralized Tactile Feedback Component.
 * Employs high-frequency, short-duration spring physics for haptic-like responsiveness,
 * coupled with Framer Motion layout animations for a physically weighted feel.
 */
export const TactileFeedback: React.FC<TactileFeedbackProps> = ({
  children,
  variant = 'click',
  triggerKey,
  className = '',
  onClick
}) => {
  // Snappy haptic presets
  const springConfig = {
    click: {
      hover: { scale: 1.02, y: -1 },
      tap: { scale: 0.95, y: 1 },
      transition: { type: 'spring', stiffness: 550, damping: 18 }
    },
    subtle: {
      hover: { scale: 1.01 },
      tap: { scale: 0.97 },
      transition: { type: 'spring', stiffness: 600, damping: 22 }
    },
    success: {
      hover: { scale: 1.03 },
      tap: { scale: 0.94 },
      transition: { type: 'spring', stiffness: 450, damping: 15 }
    }
  };

  const preset = springConfig[variant] || springConfig.click;

  // Custom keyframes to simulate a physical haptic pulse tap on trigger
  const triggerVariants = {
    pulse: {
      scale: [1, 1.06, 0.96, 1.02, 1],
      transition: {
        duration: 0.45,
        ease: [0.25, 1, 0.5, 1] // fluid speed decay
      }
    },
    idle: { scale: 1 }
  };

  return (
    <motion.div
      layout
      variants={triggerVariants}
      animate={triggerKey ? 'pulse' : 'idle'}
      whileHover={preset.hover}
      whileTap={preset.tap}
      transition={preset.transition}
      onClick={onClick}
      className={`inline-block select-none ${className}`}
    >
      {children}
    </motion.div>
  );
};
