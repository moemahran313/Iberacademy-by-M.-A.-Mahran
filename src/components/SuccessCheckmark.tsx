import React from 'react';
import { motion } from 'motion/react';
import { TactileFeedback } from './TactileFeedback';

interface SuccessCheckmarkProps {
  size?: number;
  message?: string;
}

export const SuccessCheckmark: React.FC<SuccessCheckmarkProps> = ({
  size = 80,
  message = "Unit Cleared!"
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-4 space-y-3">
      <TactileFeedback variant="success" triggerKey={message}>
        <div className="relative" style={{ width: size, height: size }}>
          {/* Glowing aura background effect */}
          <motion.div
            className="absolute inset-0 bg-emerald-500/20 rounded-full blur-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [1, 1.3, 1.2],
              opacity: [0.5, 0.8, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />

          <motion.svg
            className="relative z-10 text-emerald-500 w-full h-full"
            viewBox="0 0 52 52"
            initial="hidden"
            animate="visible"
          >
            {/* Animated Circle outline */}
            <motion.circle
              className="stroke-emerald-500"
              strokeWidth="3.5"
              fill="none"
              cx="26"
              cy="26"
              r="23"
              strokeDasharray="150"
              variants={{
                hidden: { pathLength: 0, opacity: 0, rotate: -90 },
                visible: {
                  pathLength: 1,
                  opacity: 1,
                  rotate: 0,
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                }
              }}
            />

            {/* Fill circle with subtle opacity color */}
            <motion.circle
              className="fill-emerald-500/10"
              cx="26"
              cy="26"
              r="22"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            />

            {/* Drawing checkmark path */}
            <motion.path
              className="stroke-emerald-500"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
              strokeDasharray="50"
              variants={{
                hidden: { pathLength: 0 },
                visible: {
                  pathLength: 1,
                  transition: { delay: 0.45, duration: 0.4, ease: "easeOut" }
                }
              }}
            />
          </motion.svg>
        </div>
      </TactileFeedback>

      {message && (
        <motion.p
          className="text-emerald-700 dark:text-emerald-300 font-extrabold text-sm uppercase tracking-wider font-header"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200, damping: 15 }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};
