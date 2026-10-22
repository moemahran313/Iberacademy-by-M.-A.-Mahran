export type DELELevel = 'B1' | 'B2';
export type DELEExamMode = 'exam' | 'practice';
export type DELETaskType = 'tarea1' | 'tarea2' | 'tarea3' | 'tarea4';

export interface DELETask1Question {
  id: string;
  questionNumber: number;
  text: string;
  options: {
    key: 'A' | 'B' | 'C';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C';
  explanation: string;
}

export interface DELETask1 {
  title: string;
  instructions: string;
  textTitle: string;
  textSubtitle?: string;
  paragraphs: string[];
  questions: DELETask1Question[];
}

export interface DELETask2Person {
  id: string;
  letter: 'A' | 'B' | 'C' | 'D';
  name: string;
  tagline: string;
  text: string;
}

export interface DELETask2Statement {
  id: string;
  statementNumber: number;
  text: string;
  correctPersonId: string;
  explanation: string;
}

export interface DELETask2 {
  title: string;
  instructions: string;
  people: DELETask2Person[];
  statements: DELETask2Statement[];
}

export interface DELETask3GapOption {
  id: string;
  letter: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
  text: string;
}

export interface DELETask3Segment {
  type: 'text' | 'gap';
  content?: string;
  gapIndex?: number; // 1 to 6
}

export interface DELETask3 {
  title: string;
  instructions: string;
  textTitle: string;
  segments: DELETask3Segment[];
  sentenceBank: DELETask3GapOption[];
  correctGaps: Record<number, string>; // gapIndex -> sentence Option ID
  explanations: Record<number, string>; // gapIndex -> explanation
}

export interface DELETask4Item {
  itemNumber: number; // 1 to 14
  options: {
    key: 'A' | 'B' | 'C';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C';
  grammarFocus: string;
  explanation: string;
}

export interface DELETask4Segment {
  type: 'text' | 'cloze';
  content?: string;
  itemNumber?: number;
}

export interface DELETask4 {
  title: string;
  instructions: string;
  textTitle: string;
  segments: DELETask4Segment[];
  items: DELETask4Item[];
}

export interface DELEExam {
  id: string;
  title: string;
  level: DELELevel;
  subtitle: string;
  description: string;
  timeLimitMinutes: number; // 70 mins for B2, 60 mins for B1
  totalItems: number; // 36 items total
  tarea1: DELETask1;
  tarea2: DELETask2;
  tarea3: DELETask3;
  tarea4: DELETask4;
}

export interface DELEUserAnswers {
  tarea1: Record<string, 'A' | 'B' | 'C'>;
  tarea2: Record<string, string>; // statementId -> personId
  tarea3: Record<number, string>; // gapIndex -> sentenceOptionId
  tarea4: Record<number, 'A' | 'B' | 'C'>; // itemNumber -> option key
}

export interface DELEScoreBreakdown {
  tarea1Score: { correct: number; total: number; percentage: number };
  tarea2Score: { correct: number; total: number; percentage: number };
  tarea3Score: { correct: number; total: number; percentage: number };
  tarea4Score: { correct: number; total: number; percentage: number };
  totalRawCorrect: number;
  totalItems: number;
  scaledScore: number; // Scaled out of 25.0 points
  isApto: boolean;
  statusLabel: 'APTO' | 'NO APTO';
  timeSpentSeconds: number;
}
