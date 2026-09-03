import { VocabularyItem, SRSItem, SRSGrade, Lesson } from '../types';

export function getTodayDateString(): string {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

/**
 * SuperMemo SM-2 variation for spaced repetition interval calculation
 * Grade: 1 (Again), 2 (Hard), 3 (Good), 4 (Easy)
 */
export function calculateNextSRS(
  current: SRSItem | undefined,
  wordId: string,
  grade: SRSGrade
): SRSItem {
  const today = getTodayDateString();
  const easeFactor = current?.easeFactor ?? 2.5;
  const repetitions = current?.repetitions ?? 0;
  const interval = current?.interval ?? 0;
  const streak = current?.streak ?? 0;
  const successCount = current?.successCount ?? 0;
  const failCount = current?.failCount ?? 0;

  let nextInterval = 1;
  let nextRepetitions = repetitions;
  let nextEaseFactor = easeFactor;
  let nextStreak = streak;
  let nextSuccess = successCount;
  let nextFail = failCount;

  if (grade === 1) {
    // Again / Fail: reset interval, decrease ease
    nextInterval = 1;
    nextRepetitions = 0;
    nextEaseFactor = Math.max(1.3, easeFactor - 0.2);
    nextStreak = 0;
    nextFail += 1;
  } else if (grade === 2) {
    // Hard: small interval step
    nextInterval = Math.max(1, Math.round((interval || 1) * 1.2));
    nextRepetitions = repetitions + 1;
    nextEaseFactor = Math.max(1.3, easeFactor - 0.15);
    nextStreak += 1;
    nextSuccess += 1;
  } else if (grade === 3) {
    // Good: standard SM-2 progression
    if (repetitions === 0) {
      nextInterval = 1;
    } else if (repetitions === 1) {
      nextInterval = 3;
    } else {
      nextInterval = Math.max(1, Math.round(interval * easeFactor));
    }
    nextRepetitions = repetitions + 1;
    nextStreak += 1;
    nextSuccess += 1;
  } else if (grade === 4) {
    // Easy: accelerated interval, increase ease
    if (repetitions === 0) {
      nextInterval = 3;
    } else if (repetitions === 1) {
      nextInterval = 6;
    } else {
      nextInterval = Math.max(1, Math.round(interval * easeFactor * 1.35));
    }
    nextEaseFactor = Math.min(3.0, easeFactor + 0.15);
    nextRepetitions = repetitions + 1;
    nextStreak += 1;
    nextSuccess += 1;
  }

  const nextDateObj = new Date();
  nextDateObj.setDate(nextDateObj.getDate() + nextInterval);
  const nextReviewDate = nextDateObj.toISOString().split('T')[0];

  const history = current?.history ? [...current.history] : [];
  history.push({ date: today, grade });

  return {
    wordId,
    interval: nextInterval,
    repetitions: nextRepetitions,
    easeFactor: Math.round(nextEaseFactor * 100) / 100,
    nextReviewDate,
    lastReviewedDate: today,
    history: history.slice(-20), // keep last 20 records
    streak: nextStreak,
    successCount: nextSuccess,
    failCount: nextFail
  };
}

/**
 * Calculate Ebbinghaus Forgetting Curve memory retention rate R(t) = e^(-t/S)
 * where S (Stability) is derived from current interval and ease factor.
 * Returns percentage (0 to 100)
 */
export function calculateMemoryRetention(item?: SRSItem): number {
  if (!item || !item.lastReviewedDate) return 0;

  const today = new Date();
  const lastDate = new Date(item.lastReviewedDate);
  const diffDays = Math.max(0, Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)));

  const stability = Math.max(1, (item.interval || 1) * (item.easeFactor / 2.5));
  // R = e^(-t / S)
  const retention = Math.exp(-diffDays / stability);
  return Math.min(100, Math.max(0, Math.round(retention * 100)));
}

/**
 * Get projected interval preview string for grade button tooltips
 */
export function getIntervalPreview(current: SRSItem | undefined, grade: SRSGrade): string {
  const easeFactor = current?.easeFactor ?? 2.5;
  const repetitions = current?.repetitions ?? 0;
  const interval = current?.interval ?? 0;

  if (grade === 1) return '< 1 day';
  if (grade === 2) {
    const days = Math.max(1, Math.round((interval || 1) * 1.2));
    return `${days} day${days > 1 ? 's' : ''}`;
  }
  if (grade === 3) {
    let days = 1;
    if (repetitions === 0) days = 1;
    else if (repetitions === 1) days = 3;
    else days = Math.max(1, Math.round(interval * easeFactor));
    return `${days} day${days > 1 ? 's' : ''}`;
  }
  if (grade === 4) {
    let days = 3;
    if (repetitions === 0) days = 3;
    else if (repetitions === 1) days = 6;
    else days = Math.max(1, Math.round(interval * easeFactor * 1.35));
    return `${days} day${days > 1 ? 's' : ''}`;
  }
  return '1 day';
}

/**
 * Filter words into due, learning, and mastered categories based on SRS records and the forgetting curve
 */
export function categorizeSRSWords(
  allWords: VocabularyItem[],
  srsData: Record<string, SRSItem>,
  savedWordIds: string[] = []
) {
  const today = getTodayDateString();
  const dueWords: VocabularyItem[] = [];
  const learningWords: VocabularyItem[] = [];
  const masteredWords: VocabularyItem[] = [];
  const newWords: VocabularyItem[] = [];

  allWords.forEach(word => {
    const record = srsData[word.id];
    if (!record) {
      if (savedWordIds.includes(word.id)) {
        dueWords.push(word);
      }
      newWords.push(word);
    } else {
      const retention = calculateMemoryRetention(record);
      // Marked as due if scheduled date is reached or estimated memory retention drops below 80%
      if (record.nextReviewDate <= today || retention < 80) {
        dueWords.push(word);
      }
      if (record.interval >= 21 && record.repetitions >= 4) {
        masteredWords.push(word);
      } else {
        learningWords.push(word);
      }
    }
  });

  return {
    dueWords,
    learningWords,
    masteredWords,
    newWords
  };
}

/**
 * Get overall SRS statistics and forgetting curve health for the learner
 */
export function getSRSStats(allWords: VocabularyItem[], srsData: Record<string, SRSItem>) {
  const today = getTodayDateString();
  let totalReviews = 0;
  let totalSuccess = 0;
  let totalFail = 0;
  let dueCount = 0;
  let learningCount = 0;
  let matureCount = 0;
  let totalRetentionSum = 0;
  let activeCardsCount = 0;

  Object.values(srsData).forEach(item => {
    totalSuccess += item.successCount || 0;
    totalFail += item.failCount || 0;
    totalReviews += (item.successCount || 0) + (item.failCount || 0);

    const retention = calculateMemoryRetention(item);
    totalRetentionSum += retention;
    activeCardsCount += 1;

    if (item.nextReviewDate <= today || retention < 80) {
      dueCount += 1;
    }
    if (item.interval >= 21) {
      matureCount += 1;
    } else {
      learningCount += 1;
    }
  });

  const avgRetention = activeCardsCount > 0 ? Math.round(totalRetentionSum / activeCardsCount) : 100;
  const overallSuccessRate = totalReviews > 0 ? Math.round((totalSuccess / totalReviews) * 100) : 100;

  return {
    totalWordsInSRS: Object.keys(srsData).length,
    dueCount,
    learningCount,
    matureCount,
    totalReviews,
    retentionRate: avgRetention,
    overallSuccessRate
  };
}

/**
 * Daily SRS Review Prompt generator
 */
export function getDailyReviewPrompt(srsData: Record<string, SRSItem>, allWords: VocabularyItem[]) {
  const { dueCount, retentionRate } = getSRSStats(allWords, srsData);

  if (dueCount === 0) {
    return {
      hasDue: false,
      title: 'Memory Consolidation Up to Date! 🎉',
      title_ar: 'ذاكرتك في أوج قوتها اليوم! 🎉',
      message: `Your active Spanish vocabulary retention is currently at ${retentionRate}%. Check back tomorrow for the next forgetting-curve review.`,
      message_ar: `نسبة استبقاء المفردات النشطة في ذاكرتك حالياً ${retentionRate}%. عد غداً لجلسة المراجعة القادمة.`,
      urgency: 'low' as const
    };
  }

  return {
    hasDue: true,
    dueCount,
    title: `⚡ Daily SRS Review: ${dueCount} term${dueCount > 1 ? 's' : ''} due today`,
    title_ar: `⚡ مراجعة التكرار المتباعد: لديك ${dueCount} كلمة مستحقة المراجعة اليوم`,
    message: `According to the Ebbinghaus forgetting curve, reviewing these ${dueCount} terms today will reset your retention to 100% and extend memory stability.`,
    message_ar: `وفقاً لمنحنى النسيان لإبنجهاوس، فإن مراجعة هذه الكلمات الـ ${dueCount} اليوم سترفع نسبة التذكر إلى 100% وتضاعف ثبات الكلمات في ذاكرتك طويلة المدى.`,
    urgency: dueCount > 10 ? ('high' as const) : ('medium' as const)
  };
}

/**
 * Generate at least 15 distinct, non-repeating vocabulary items for a given lesson
 * and ensure that all 1000+ words are systematically covered across the entire curriculum!
 */
export function getLessonVocabulary(
  lesson: Lesson,
  allVocab: VocabularyItem[],
  globalLessonIndex: number = 0
): VocabularyItem[] {
  const TARGET_COUNT = 15; // At least 15 distinct words per lesson

  // 1. Explicitly designated lesson words
  const explicitWords: VocabularyItem[] = [];
  if (lesson.vocabWordIds && lesson.vocabWordIds.length > 0) {
    lesson.vocabWordIds.forEach(id => {
      const found = allVocab.find(
        w => w.id === id || w.spanish?.toLowerCase() === id.replace(/^w-/, '').toLowerCase()
      );
      if (found && !explicitWords.some(e => e.id === found.id)) {
        explicitWords.push(found);
      }
    });
  }

  // 2. Deterministic offset batch from the 1000+ vocabulary pool based on lesson ID hash / index
  const hashString = (lesson.id || '') + (lesson.title_es || '');
  let seed = 0;
  for (let i = 0; i < hashString.length; i++) {
    seed = (seed * 31 + hashString.charCodeAt(i)) % 100000;
  }
  const lessonOffset = (seed + globalLessonIndex * TARGET_COUNT) % Math.max(1, allVocab.length);

  // 3. Match words matching lesson CEFR level first
  const levelVocab = allVocab.filter(w => w.cefr === lesson.cefr);
  const otherVocab = allVocab.filter(w => w.cefr !== lesson.cefr);
  const sortedVocabPool = [...levelVocab, ...otherVocab];

  const assignedWords = [...explicitWords];
  let poolIndex = lessonOffset % sortedVocabPool.length;

  while (assignedWords.length < TARGET_COUNT && assignedWords.length < allVocab.length) {
    const candidate = sortedVocabPool[poolIndex % sortedVocabPool.length];
    if (!assignedWords.some(w => w.id === candidate.id || (w.spanish && w.spanish === candidate.spanish))) {
      assignedWords.push(candidate);
    }
    poolIndex++;
  }

  return assignedWords;
}

/**
 * Auto-enroll lesson vocabulary into user's SRS queue with starting initial state
 */
export function autoEnrollLessonWordsInSRS(
  vocabItems: VocabularyItem[],
  currentSrs: Record<string, SRSItem>
): Record<string, SRSItem> {
  const today = getTodayDateString();
  const updated = { ...currentSrs };

  vocabItems.forEach(item => {
    if (!updated[item.id]) {
      // First review scheduled for tomorrow
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + 1);

      updated[item.id] = {
        wordId: item.id,
        interval: 1,
        repetitions: 1,
        easeFactor: 2.5,
        nextReviewDate: nextDate.toISOString().split('T')[0],
        lastReviewedDate: today,
        streak: 1,
        successCount: 1,
        failCount: 0,
        history: [{ date: today, grade: 3 }]
      };
    }
  });

  return updated;
}

export interface ChunkCollocationSRSItem extends VocabularyItem {
  chunkType: 'collocation' | 'conversational_phrase' | 'survival_expression';
  contextSentence_es?: string;
  contextSentence_en?: string;
  contextSentence_ar?: string;
  sourceLessonTitle?: string;
}

/**
 * Generate custom SRS practice sets based on 'chunks and collocations' taught in recent lessons
 */
export function generateChunksAndCollocationsPracticeSet(
  completedLessonIds: string[],
  allUnits: { lessons: Lesson[] }[]
): ChunkCollocationSRSItem[] {
  const chunks: ChunkCollocationSRSItem[] = [];
  const seenSpanish = new Set<string>();

  // High-yield fallback collocations if no completed lessons yet
  const defaultCollocations: ChunkCollocationSRSItem[] = [
    {
      id: 'chunk-1',
      spanish: 'me pones un...',
      english: 'give me / I will have a...',
      arabic: 'ضع لي / أعطني...',
      partOfSpeech: 'collocation',
      cefr: 'A1',
      category: 'Food & Dining',
      chunkType: 'collocation',
      contextSentence_es: 'Por favor, ¿me pones un café cortado y agua?',
      contextSentence_en: 'Please, can I have a cortado coffee and water?',
      contextSentence_ar: 'من فضلك، هل تعطيني قهوة مع ماء؟',
      examples: [{ es: '¿Me pones un vaso de agua?', en: 'Can you give me a glass of water?', ar: 'هل تعطيني كأس ماء؟' }]
    },
    {
      id: 'chunk-2',
      spanish: '¿de qué me recomiendas?',
      english: 'what do you recommend?',
      arabic: 'بماذا تنصحني؟',
      partOfSpeech: 'conversational_phrase',
      cefr: 'A1',
      category: 'Food & Dining',
      chunkType: 'conversational_phrase',
      contextSentence_es: 'Disculpa, ¿de qué me recomiendas pedir para cenar?',
      contextSentence_en: 'Excuse me, what do you recommend ordering for dinner?',
      contextSentence_ar: 'عفواً، بماذا تنصحني أن أطلب للعشاء؟',
      examples: [{ es: '¿De qué me recomiendas probar?', en: 'What do you recommend I try?', ar: 'بماذا تنصحني أن أجرب؟' }]
    },
    {
      id: 'chunk-3',
      spanish: 'me parece un precio excesivo',
      english: 'it seems like an excessive price to me',
      arabic: 'يبدو لي السعر مبالغاً فيه',
      partOfSpeech: 'conversational_phrase',
      cefr: 'A2',
      category: 'Business & Negotiation',
      chunkType: 'conversational_phrase',
      contextSentence_es: 'Sinceramente, me parece un precio excesivo para el alquiler.',
      contextSentence_en: 'Honestly, it seems like an excessive rent price to me.',
      contextSentence_ar: 'صراحة، يبدو لي سعر الإيجار مبالغاً فيه.',
      examples: [{ es: 'Esa tarifa me parece un precio excesivo.', en: 'That rate seems excessive to me.', ar: 'تلك السعر تبدو مبالغ فيها.' }]
    },
    {
      id: 'chunk-4',
      spanish: 'pásame tu número móvil',
      english: 'send me your mobile number',
      arabic: 'أرسل لي رقم هاتفك',
      partOfSpeech: 'survival_expression',
      cefr: 'A1',
      category: 'Social Interaction',
      chunkType: 'survival_expression',
      contextSentence_es: '¡Qué buena charla! Pásame tu número móvil por WhatsApp.',
      contextSentence_en: 'Great talk! Send me your mobile number via WhatsApp.',
      contextSentence_ar: 'محادثة رائعة! أرسل لي رقم هاتفك المحمول على الواتساب.',
      examples: [{ es: 'Pásame tu contacto.', en: 'Send me your contact.', ar: 'أرسل لي رقم تواصلك.' }]
    },
    {
      id: 'chunk-5',
      spanish: 'sin salsa picosa',
      english: 'without spicy sauce',
      arabic: 'بدون صلصة حارة',
      partOfSpeech: 'collocation',
      cefr: 'A1',
      category: 'Street Food',
      chunkType: 'collocation',
      contextSentence_es: 'Quiero dos tacos de canasta pero sin salsa picosa, por favor.',
      contextSentence_en: 'I want two basket tacos but without spicy sauce, please.',
      contextSentence_ar: 'أريد اثنين من التاكو لكن بدون صلصة حارة من فضلك.',
      examples: [{ es: 'Por favor, sin salsa picosa.', en: 'Please, no spicy sauce.', ar: 'من فضلك بدون صلصة حارة.' }]
    },
    {
      id: 'chunk-6',
      spanish: '¿cuál es la clave del Wi-Fi?',
      english: 'what is the Wi-Fi password?',
      arabic: 'ما هي كلمة مرور الواي فاي؟',
      partOfSpeech: 'survival_expression',
      cefr: 'A1',
      category: 'Hostel & Travel',
      chunkType: 'survival_expression',
      contextSentence_es: 'Disculpa, ¿cuál es la clave del Wi-Fi de la recepción?',
      contextSentence_en: 'Excuse me, what is the reception Wi-Fi password?',
      contextSentence_ar: 'عفواً، ما هي كلمة مرور الواي فاي في الاستقبال؟',
      examples: [{ es: '¿Me das la clave del Wi-Fi?', en: 'Can you give me the Wi-Fi password?', ar: 'هل تعطيني كلمة مرور الواي فاي؟' }]
    },
    {
      id: 'chunk-7',
      spanish: 'no funciona la calefacción',
      english: 'the heating is not working',
      arabic: 'التدفئة لا تعمل',
      partOfSpeech: 'conversational_phrase',
      cefr: 'A2',
      category: 'Accommodation Disputes',
      chunkType: 'conversational_phrase',
      contextSentence_es: 'Hola, quería avisar que no funciona la calefacción en la habitación.',
      contextSentence_en: 'Hello, I wanted to report that the heating is not working in the room.',
      contextSentence_ar: 'مرحباً، أردت الإبلاغ عن أن التدفئة لا تعمل في الغرفة.',
      examples: [{ es: 'No funciona el aire acondicionado.', en: 'The air conditioning is not working.', ar: 'المكيف لا يعمل.' }]
    },
    {
      id: 'chunk-8',
      spanish: '¡me flipa el ambiente!',
      english: 'I absolutely love the vibe!',
      arabic: 'أعشق هذه الأجواء كثيراً!',
      partOfSpeech: 'collocation',
      cefr: 'A2',
      category: 'Social Slang & Culture',
      chunkType: 'collocation',
      contextSentence_es: '¡Madre mía, me flipa el ambiente de este barrio!',
      contextSentence_en: 'Wow, I absolutely love the vibe of this neighborhood!',
      contextSentence_ar: 'يا إلهي، أعشق أجواء هذا الحي كثيراً!',
      examples: [{ es: 'Me flipa esta música.', en: 'I love this music.', ar: 'أعشق هذه الموسيقى.' }]
    }
  ];

  // Collect lessons from all units
  const allLessons: Lesson[] = [];
  allUnits.forEach(u => {
    if (u.lessons) allLessons.push(...u.lessons);
  });

  // Extract chunks from completed lessons or recent lessons
  const targetLessons = allLessons.filter(l => completedLessonIds.includes(l.id));
  const lessonsToUse = targetLessons.length > 0 ? targetLessons : allLessons.slice(0, 10);

  lessonsToUse.forEach((l, lIdx) => {
    if (l.dialogue) {
      l.dialogue.forEach((turn, tIdx) => {
        const text = turn.es.trim();
        if (text.length > 5 && text.length < 65) {
          const clean = text.toLowerCase();
          if (!seenSpanish.has(clean)) {
            seenSpanish.add(clean);
            chunks.push({
              id: `chunk-lesson-${l.id}-${tIdx}`,
              spanish: text,
              english: turn.en,
              arabic: turn.ar,
              partOfSpeech: 'conversational_phrase',
              cefr: l.cefr,
              category: l.title_en || 'Recent Lesson Chunks',
              chunkType: 'conversational_phrase',
              contextSentence_es: text,
              contextSentence_en: turn.en,
              contextSentence_ar: turn.ar,
              sourceLessonTitle: l.title_es,
              examples: [{ es: text, en: turn.en, ar: turn.ar }]
            });
          }
        }
      });
    }
  });

  // Blend extracted chunks with default high-yield collocations
  defaultCollocations.forEach(dc => {
    if (!seenSpanish.has(dc.spanish.toLowerCase())) {
      chunks.push(dc);
    }
  });

  return chunks;
}

