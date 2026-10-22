export interface TaskGoal {
  id: string;
  description: string;
  keywords: string[];
  isRequired: boolean;
  completed: boolean;
  hint: string;
}

export interface KeyPhrase {
  spanish: string;
  english: string;
  category: 'politeness' | 'negotiation' | 'description' | 'discourse';
}

export interface Interlocutor {
  name: string;
  role: string;
  avatar: string;
  initialMessage: string;
  register: 'usted' | 'tú';
  typingDelayMs?: number;
}

export interface TaskScenario {
  id: 'madrid_apartment' | 'seville_tapas' | 'mexico_baggage';
  title: string;
  subtitle: string;
  cefrLevel: 'A2' | 'B1' | 'B2';
  canDoStatement: string;
  location: string;
  context: string;
  interlocutor: Interlocutor;
  goals: TaskGoal[];
  requiredRegister: 'usted' | 'tú';
  keyPhrases: KeyPhrase[];
  theme: 'whatsapp' | 'bar' | 'airport';
}

export interface PragmaticFeedbackTurn {
  politenessScore: number; // 0 - 100
  registerUsed: 'tú' | 'usted' | 'mixed';
  discourseMarkersFound: string[];
  goalsMetThisTurn: string[];
  feedbackTip?: string;
}

export interface ConversationTurn {
  id: string;
  sender: 'user' | 'interlocutor' | 'system';
  text: string;
  timestamp: string;
  pragmaticFeedback?: PragmaticFeedbackTurn;
}

export interface PragmaticEvaluation {
  taskSuccess: boolean;
  goalsCompletedCount: number;
  totalGoalsCount: number;
  politenessScore: number; // 0 - 100
  registerAccuracy: number; // 0 - 100
  discourseMarkersUsed: string[];
  strengths: string[];
  pragmaticTips: string[];
  detailedAnalysis: string;
}

export interface TaskCertificate {
  id: string;
  scenarioId: string;
  scenarioTitle: string;
  cefrLevel: string;
  userName: string;
  completedAt: string;
  politenessScore: number;
  registerAccuracy: number;
  pragmaticIndexGrade: 'Excelente' | 'Satisfactorio' | 'En Desarrollo';
  canDoAchieved: string;
}
