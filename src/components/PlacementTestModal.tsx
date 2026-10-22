import React, { useState } from 'react';
import { Award, Brain, Sparkles, X } from 'lucide-react';
import { UserProgress, CEFRLevel } from '../types';
import { AdaptivePlacementExam } from './assessment/AdaptivePlacementExam';
import { soundEffects } from '../utils/audio';

interface PlacementTestModalProps {
  onClose: () => void;
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

export const PlacementTestModal: React.FC<PlacementTestModalProps> = ({
  onClose,
  userProgress,
  setUserProgress
}) => {
  const handleApplyLevel = (level: CEFRLevel, xpAwarded: number = 100) => {
    setUserProgress(prev => ({
      ...prev,
      currentLevel: level,
      xp: prev.xp + xpAwarded
    }));
    soundEffects.playLevelUp();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl my-auto">
        <AdaptivePlacementExam
          isModal={true}
          onClose={onClose}
          onApplyLevel={handleApplyLevel}
        />
      </div>
    </div>
  );
};
