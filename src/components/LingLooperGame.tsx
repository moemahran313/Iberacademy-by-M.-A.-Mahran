import React from 'react';
import { UserProgress } from '../types';
import { AITutorChat } from './AITutorChat';

interface LingLooperGameProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

/**
 * @deprecated LingLooperGame has been consolidated into the unified Conversational Immersion Studio (AITutorChat).
 * All routes and references now render AITutorChat directly for optimal performance and unified state.
 */
export const LingLooperGame: React.FC<LingLooperGameProps> = (props) => {
  return <AITutorChat {...props} />;
};

export default LingLooperGame;
