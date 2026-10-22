import { UserProgress, CEFRLevel } from '../types';

export interface TenseMilestone {
  id: string;
  levelNumber: number; // 1 to 8 (Natural Order Stages)
  name_es: string;
  name_en: string;
  name_ar: string;
  cefrLevel: CEFRLevel;
  prerequisiteTenseIds: string[];
  requiredMasteryPercentage: number;
  description_en: string;
  description_ar: string;
  triggerAnchors: string[];
  cognitiveLockExplanation: string;
  cognitiveLockExplanation_ar: string;
  subStages: Array<{
    title: string;
    focus: string;
    examples: { es: string; en: string };
  }>;
}

export interface TenseUnlockEvaluation {
  unlocked: boolean;
  milestone: TenseMilestone;
  currentMasteryPercentage: number;
  requiredMasteryPercentage: number;
  missingPrerequisites: Array<{
    id: string;
    name_es: string;
    currentScore: number;
    requiredScore: number;
  }>;
  cognitiveLockReason?: string;
  cognitiveLockReason_ar?: string;
  canBypassViaPlacement: boolean;
}

export interface TenseProgressionReport {
  overallTenseProgressPercentage: number;
  activeMilestoneId: string;
  highestUnlockedLevel: number;
  milestonesEvaluated: Record<string, TenseUnlockEvaluation>;
  isSubjunctiveGated: boolean;
  pastTenseContrastStabilized: boolean;
}

export const NATURAL_ORDER_TENSE_MILESTONES: TenseMilestone[] = [
  // LEVEL 1: Presente de Indicativo
  {
    id: 'level_1_present',
    levelNumber: 1,
    name_es: 'Presente de Indicativo',
    name_en: 'Present Indicative (Regulars, Stem-Changers & Core Irregulars)',
    name_ar: 'المضارع البسيط (الأفعال المنتظمة، الشاذة، وأفعال الجذر)',
    cefrLevel: 'A1',
    prerequisiteTenseIds: [],
    requiredMasteryPercentage: 75,
    description_en: 'Foundational baseline: Regular verbs (-ar, -er, -ir), boot verbs (e->ie, o->ue), G-stems (tengo, hago), and absolute irregulars (ser, estar, ir, haber).',
    description_ar: 'الأساس الجوهري: الأفعال المنتظمة، أفعال الأحذية، أفعال الجيم، والأفعال الشاذة الأساسية.',
    triggerAnchors: ['hoy', 'ahora', 'siempre', 'todos los días', 'normalmente', 'a menudo'],
    cognitiveLockExplanation: 'Nivel fundacional básico: disponible de forma predeterminada.',
    cognitiveLockExplanation_ar: 'المستوى التأسيسي الأول: متاح لجميع الدارسين دون متطلبات مسبقة.',
    subStages: [
      {
        title: 'Regular Paradigms (-ar, -er, -ir)',
        focus: 'hablo/comes/vive',
        examples: { es: 'Hablo español todos los días con mis amigos.', en: 'I speak Spanish every day with my friends.' }
      },
      {
        title: 'Stem-Changing Boot Verbs',
        focus: 'e->ie (quiero), o->ue (puedo), e->i (pido)',
        examples: { es: 'No puedo salir porque tengo mucho trabajo.', en: 'I cannot go out because I have a lot of work.' }
      },
      {
        title: 'G-Stem & First Person Irregulars',
        focus: 'hago, pongo, salgo, vengo, sé, veo',
        examples: { es: 'Pongo las llaves sobre la mesa y salgo.', en: 'I put the keys on the table and leave.' }
      },
      {
        title: 'Core Irregulars: Ser / Estar / Ir / Haber',
        focus: 'es vs está, voy, hay',
        examples: { es: 'Hay una cafetería muy bonita cerca de aquí.', en: 'There is a very nice café near here.' }
      }
    ]
  },

  // LEVEL 2: Perífrasis de Futuro y Progresivo
  {
    id: 'level_2_progressive_future',
    levelNumber: 2,
    name_es: 'Perífrasis de Futuro y Progresivo',
    name_en: 'Proximate Future (Ir + a) & Progressive Aspect (Estar + Gerundio)',
    name_ar: 'المستقبل القريب (Ir + a) والحاضر المستمر (Estar + Gerundio)',
    cefrLevel: 'A1',
    prerequisiteTenseIds: ['level_1_present'],
    requiredMasteryPercentage: 80,
    description_en: 'Expanding time boundaries: Expressing immediate planned actions and ongoing actions in progress without heavy morphological inflection.',
    description_ar: 'توسيع الإطار الزمني: التعبير عن الخطط المستقبلية المؤكدة والأفعال المستمرة دون تصريفات معقدة.',
    triggerAnchors: ['ahora mismo', 'en este momento', 'mañana', 'esta tarde', 'el próximo año'],
    cognitiveLockExplanation: 'Para dominar el futuro perifrástico y el gerundio continuo, consolida primero el presente de indicativo (nivel 1).',
    cognitiveLockExplanation_ar: 'للتمكن من المستقبل القريب والحاضر المستمر، يجب ترسيخ تصريف أفعال المضارع البسيط أولاً.',
    subStages: [
      {
        title: 'Futuro Próximo: Ir + a + Infinitivo',
        focus: 'voy a comer, vamos a viajar',
        examples: { es: 'Mañana voy a estudiar en la biblioteca.', en: 'Tomorrow I am going to study at the library.' }
      },
      {
        title: 'Estar + Gerundio (-ando / -iendo)',
        focus: 'estoy trabajando, están comiendo',
        examples: { es: 'En este momento estoy preparando la cena.', en: 'Right now I am preparing dinner.' }
      }
    ]
  },

  // LEVEL 3: Pretérito Perfecto Compuesto
  {
    id: 'level_3_preterite_perfect',
    levelNumber: 3,
    name_es: 'Pretérito Perfecto Compuesto',
    name_en: 'Present Perfect (Haber + Participio)',
    name_ar: 'الماضي القريب التام (Haber + Participio)',
    cefrLevel: 'A2',
    prerequisiteTenseIds: ['level_1_present', 'level_2_progressive_future'],
    requiredMasteryPercentage: 80,
    description_en: 'First entrance into past episodic memory: Expressing past actions in an open, uncompleted time period or life experiences.',
    description_ar: 'المدخل الأول للذاكرة الماضية: التعبير عن الأحداث المرتبطة بالحاضر أو التجارب الحياتية.',
    triggerAnchors: ['hoy', 'esta mañana', 'esta semana', 'este año', 'ya', 'todavía no', 'alguna vez', 'nunca'],
    cognitiveLockExplanation: 'El pretérito perfecto requiere conjugar el auxiliar "haber" en presente y manejar participios regulares e irregulares.',
    cognitiveLockExplanation_ar: 'الماضي التام يتطلب إتقان تصريف فعل المساعدة (Haber) في المضارع وضبط أسماء المفعول.',
    subStages: [
      {
        title: 'Haber en Presente + Participio Regular',
        focus: 'he hablado, has vivido, hemos comido',
        examples: { es: 'Hoy he desayunado fruta fresca con café.', en: 'Today I have eaten fresh fruit with coffee.' }
      },
      {
        title: 'Participios Irregulares Clave',
        focus: 'abierto, dicho, escrito, hecho, puesto, visto, vuelto',
        examples: { es: '¿Has hecho ya la reserva del restaurante?', en: 'Have you already made the restaurant reservation?' }
      }
    ]
  },

  // LEVEL 4: Pretérito Indefinido vs Imperfecto (CRITICAL SLA MILESTONE)
  {
    id: 'level_4_past_contrast',
    levelNumber: 4,
    name_es: 'Contraste Indefinido vs Imperfecto',
    name_en: 'Preterite vs. Imperfect (Aspectual Mastery)',
    name_ar: 'المقارنة الحاسمة بين الماضي البسيط والماضي المستمر',
    cefrLevel: 'A2',
    prerequisiteTenseIds: ['level_3_preterite_perfect'],
    requiredMasteryPercentage: 85, // Strictly 85% requirement
    description_en: 'The definitive empirical hurdle of ELE: Differentiating completed episodic events (indefinido) from habitual, descriptive, background reality (imperfecto).',
    description_ar: 'الحاجز الجوهري في اكتساب الإسبانية: التمييز القاطع بين الأحداث المكتملة والسياق الوصفي المستمر.',
    triggerAnchors: [
      'ayer', 'anoche', 'la semana pasada', 'de repente', 'el otro día', // Indefinido
      'siempre', 'mientras', 'todos los veranos', 'de niño', 'a menudo', 'antes' // Imperfecto
    ],
    cognitiveLockExplanation: '¡Piedra angular de la adquisición! Es imprescindible consolidar el Pretérito Perfecto antes de contrastar los dos pasados narrativos.',
    cognitiveLockExplanation_ar: 'حجر الزاوية لاكتساب اللغة! يلزم ترسيخ الماضي القريب قبل التفرقة بين الماضي النقطي والمستمر.',
    subStages: [
      {
        title: 'Pretérito Indefinido: Eventos Concluidos',
        focus: 'hablé, comió, salieron, fue, tuvo, hizo',
        examples: { es: 'Ayer fui al mercado y compré ingredientes frescos.', en: 'Yesterday I went to the market and bought fresh ingredients.' }
      },
      {
        title: 'Pretérito Imperfecto: Trasfondo y Hábitos',
        focus: 'era, estaba, vivía, comíamos, jugaban',
        examples: { es: 'Cuando era niño, vivía en un pueblo muy tranquilo.', en: 'When I was a child, I lived in a very quiet village.' }
      },
      {
        title: 'Narración Integrada: Interrupción y Simultaneidad',
        focus: 'Caminaba (imperfecto) cuando empezó (indefinido) a llover',
        examples: { es: 'Caminaba por la calle cuando de repente me llamó Juan.', en: 'I was walking down the street when suddenly Juan called me.' }
      }
    ]
  },

  // LEVEL 5: Imperativo Afirmativo y Pronombres Clíticos
  {
    id: 'level_5_imperative',
    levelNumber: 5,
    name_es: 'Imperativo Afirmativo',
    name_en: 'Affirmative Commands & Clitic Pronoun Attachment',
    name_ar: 'صيغة الأمر التوكيدي وموضع الضمائر المتصلة',
    cefrLevel: 'B1',
    prerequisiteTenseIds: ['level_1_present', 'level_4_past_contrast'],
    requiredMasteryPercentage: 80,
    description_en: 'Communicative directives: Direct recommendations, recipes, street directions (tú / usted) with enclitic pronouns (dímelo, escúchame).',
    description_ar: 'التوجيهات المباشرة: التوصيات، الإرشادات، ووصف الطرق مع ربط ضمائر المفعول في نهاية الفعل.',
    triggerAnchors: ['por favor', 'mira', 'oye', 'disculpe', 'pasa', 'dime'],
    cognitiveLockExplanation: 'Para formular órdenes con pronombres enclíticos (cómpralo, dímelo), afianza la estructura del presente y los contrastes de pasado.',
    cognitiveLockExplanation_ar: 'لإتقان الأمر مع الضمائر المتصلة، يلزم استقرار المضارع وتراكيب الماضي الأساسية.',
    subStages: [
      {
        title: 'Imperativo Afirmativo Tú (Regular e Irregular)',
        focus: 'habla, come, ven, di, sal, haz, pon',
        examples: { es: 'Haz los deberes ahora y pon la mesa, por favor.', en: 'Do the homework now and set the table, please.' }
      },
      {
        title: 'Colocación de Pronombres Enclíticos',
        focus: 'dímelo, cómprala, siéntate, explícanos',
        examples: { es: 'Si tienes dudas, pregúntamelo con total confianza.', en: 'If you have doubts, ask me with total confidence.' }
      }
    ]
  },

  // LEVEL 6: Presente de Subjuntivo (WEIRDOS Framework)
  {
    id: 'level_6_present_subjunctive',
    levelNumber: 6,
    name_es: 'Presente de Subjuntivo',
    name_en: 'Present Subjunctive (WEIRDOS Triggers)',
    name_ar: 'المضارع المنصوب (صيغة الاحتمال والرغبة والشك)',
    cefrLevel: 'B1',
    prerequisiteTenseIds: ['level_4_past_contrast', 'level_5_imperative'],
    requiredMasteryPercentage: 85, // Gated by 85% on Level 4!
    description_en: 'The subjective realm: Expressing wishes, doubts, emotions, impersonal opinions, and purpose clauses (quiero que vengas, ojalá llueva).',
    description_ar: 'عالم الذاتية والاحتمال: التعبير عن الرغبات، الشك، المشاعر، والأحكام غير الشخصية.',
    triggerAnchors: ['quiero que', 'dudo que', 'es necesario que', 'ojalá', 'para que', 'espero que', 'cuando + subjuntivo'],
    cognitiveLockExplanation: '🔒 Bloqueado: Para dominar el Subjuntivo ("Ojalá vengas"), primero debes consolidar el aspecto del pasado (Indefinido vs Imperfecto) con al menos un 85% de precisión.',
    cognitiveLockExplanation_ar: '🔒 مقفل: لإتقان صيغة الـ Subjuntivo، يجب أولاً ترسيخ التمييز بين الماضي النقطي والمستمر بنسبة إتقان لا تقل عن 85%.',
    subStages: [
      {
        title: 'Morfología Inversa del Subjuntivo',
        focus: '-ar -> -e, -er/-ir -> -a (hable, coma, viva)',
        examples: { es: 'Espero que tengas un viaje maravilloso.', en: 'I hope you have a wonderful trip.' }
      },
      {
        title: 'Disparadores WEIRDOS (Duda, Deseo, Impersonal)',
        focus: 'Deseo (quiero que), Emoción (me alegra que), Duda (dudo que)',
        examples: { es: 'Dudo que los trenes lleguen a tiempo con esta tormenta.', en: 'I doubt the trains will arrive on time with this storm.' }
      }
    ]
  },

  // LEVEL 7: Condicional Simple y Pluscuamperfecto
  {
    id: 'level_7_conditional_pluperfect',
    levelNumber: 7,
    name_es: 'Condicional y Pluscuamperfecto',
    name_en: 'Simple Conditional & Past Perfect (Pluscuamperfecto)',
    name_ar: 'الماضي الأسبق (Pluscuamperfecto) والصيغة الشرطية البسيطة',
    cefrLevel: 'B2',
    prerequisiteTenseIds: ['level_4_past_contrast', 'level_6_present_subjunctive'],
    requiredMasteryPercentage: 80,
    description_en: 'Hypothetical politeness and past-prior-to-past: Expressing courtesy requests, hypothetical possibilities, and actions preceding another past event.',
    description_ar: 'الطلب المهذب والأحداث السابقة لماضٍ آخر: التعبير عن الاحتمالات المهذبة وما حدث قبل نقطة زمنية ماضية.',
    triggerAnchors: ['me gustaría', 'deberías', 'yo en tu lugar', 'ya había + participio', 'antes de que llegara'],
    cognitiveLockExplanation: 'Requiere la estabilidad combinada del indicativo pasado y la flexibilidad modal del subjuntivo presente.',
    cognitiveLockExplanation_ar: 'يتطلب ترسيخاً متزامناً لأزمنة الماضي الإخبارية ومرونة تصريف صيغ الاحتمال.',
    subStages: [
      {
        title: 'Condicional Simple: Cortesía e Hipótesis',
        focus: 'gustaría, podría, hablaría, tendríamos',
        examples: { es: '¿Podría traernos la carta de postres, por favor?', en: 'Could you bring us the dessert menu, please?' }
      },
      {
        title: 'Pretérito Pluscuamperfecto (Había + Participio)',
        focus: 'había llegado, habíamos terminado',
        examples: { es: 'Cuando llegamos a la estación, el tren ya había salido.', en: 'When we arrived at the station, the train had already left.' }
      }
    ]
  },

  // LEVEL 8: Pretérito Imperfecto de Subjuntivo y Oraciones Condicionales
  {
    id: 'level_8_imperfect_subjunctive',
    levelNumber: 8,
    name_es: 'Imperfecto de Subjuntivo y Cláusulas Si',
    name_en: 'Imperfect Subjunctive (-ra/-se) & Hypothetical Si-Clauses',
    name_ar: 'ماضي صيغة الاحتمال وجمل الشرط الافتراضية غير المحققة',
    cefrLevel: 'B2',
    prerequisiteTenseIds: ['level_6_present_subjunctive', 'level_7_conditional_pluperfect'],
    requiredMasteryPercentage: 85,
    description_en: 'Advanced hypothetical discourse: Deriving forms from the 3rd person plural preterite (dijeron -> dijera) and constructing unreal hypothetical conditionals (Si tuviera dinero, viajaría).',
    description_ar: 'المرحلة المتقدمة للجمل الافتراضية: اشتقاق صيغة الماضي المنصوب وصياغة جمل الشرط الخيالية.',
    triggerAnchors: ['si tuviera', 'ojalá pudiera', 'como si fuera', 'si supiera', 'si tuviese'],
    cognitiveLockExplanation: '🔒 Bloqueado: Para dominar "Ojalá vinieras" y las oraciones con Si irreal, primero debes consolidar el subjuntivo presente y el condicional simple.',
    cognitiveLockExplanation_ar: '🔒 مقفل: لإتقان الجمل الافتراضية المعقدة (Si tuviera...), يلزم إتمام مستويات المضارع المنصوب والشرط البسيط بنجاح.',
    subStages: [
      {
        title: 'Derivación desde la 3ª Plural del Indefinido',
        focus: 'tuvieron -> tuviera/tuviese, hicieron -> hiciera, fueron -> fuera',
        examples: { es: 'Me pidió que fuera con él a la embajada.', en: 'He asked me to go with him to the embassy.' }
      },
      {
        title: 'Oraciones Condicionales Irreales (Si + Imperf. Subj. + Condicional)',
        focus: 'Si tuviera tiempo, aprendería a bailar tango',
        examples: { es: 'Si tuviera más tiempo libre, viajaría por toda América Latina.', en: 'If I had more free time, I would travel all over Latin America.' }
      }
    ]
  }
];

/**
 * Retrieves a specific milestone by its ID
 */
export function getTenseMilestoneById(id: string): TenseMilestone | undefined {
  return NATURAL_ORDER_TENSE_MILESTONES.find(m => m.id === id);
}

/**
 * Helper to compute learner's recorded mastery score for a tense milestone.
 */
export function getTenseMasteryScore(milestoneId: string, userProgress: UserProgress): number {
  if (userProgress.tenseMilestoneMastery && userProgress.tenseMilestoneMastery[milestoneId]) {
    return userProgress.tenseMilestoneMastery[milestoneId].score;
  }

  // Fallback heuristic derived from passed quizzes and completed lessons
  const milestone = getTenseMilestoneById(milestoneId);
  if (!milestone) return 0;

  // Level 1 is unlocked by default with at least base exposure
  if (milestone.levelNumber === 1) {
    const completedCount = (userProgress.completedLessonIds || []).length;
    return Math.min(100, Math.max(80, completedCount * 10));
  }

  return 0;
}

/**
 * Checks if a user has tested out via formal placement exam or manual override.
 */
export function canBypassPrerequisitesViaPlacement(userProgress: UserProgress, milestoneId: string): boolean {
  const milestone = getTenseMilestoneById(milestoneId);
  if (!milestone) return false;

  // If user placed into B1 or higher, levels 1 to 4 are considered validated
  if (['B1', 'B2'].includes(userProgress.currentLevel) && milestone.levelNumber <= 4) {
    return true;
  }

  // If user placed into B2, levels 1 to 6 are validated
  if (userProgress.currentLevel === 'B2' && milestone.levelNumber <= 6) {
    return true;
  }

  return false;
}

/**
 * Core SLA Gatekeeper: Evaluates whether a target tense milestone is unlocked.
 * Strictly enforces Krashen Natural Order prerequisite gates:
 * e.g., Subjunctive (Level 6) strictly requires >= 85% mastery on Past Tense Contrast (Level 4).
 */
export function isTenseUnlocked(milestoneId: string, userProgress: UserProgress): TenseUnlockEvaluation {
  const milestone = getTenseMilestoneById(milestoneId);
  if (!milestone) {
    throw new Error(`Unknown tense milestone ID: ${milestoneId}`);
  }

  // Level 1 is always unlocked
  if (milestone.levelNumber === 1) {
    return {
      unlocked: true,
      milestone,
      currentMasteryPercentage: getTenseMasteryScore(milestoneId, userProgress),
      requiredMasteryPercentage: milestone.requiredMasteryPercentage,
      missingPrerequisites: [],
      canBypassViaPlacement: false
    };
  }

  // Placement bypass check
  if (canBypassPrerequisitesViaPlacement(userProgress, milestoneId)) {
    return {
      unlocked: true,
      milestone,
      currentMasteryPercentage: 90,
      requiredMasteryPercentage: milestone.requiredMasteryPercentage,
      missingPrerequisites: [],
      canBypassViaPlacement: true
    };
  }

  const currentMastery = getTenseMasteryScore(milestoneId, userProgress);
  const missingPrerequisites: TenseUnlockEvaluation['missingPrerequisites'] = [];

  // Check all prerequisites
  for (const prereqId of milestone.prerequisiteTenseIds) {
    const prereqMilestone = getTenseMilestoneById(prereqId);
    if (!prereqMilestone) continue;

    const prereqScore = getTenseMasteryScore(prereqId, userProgress);
    const requiredScore = prereqMilestone.requiredMasteryPercentage;

    if (prereqScore < requiredScore) {
      missingPrerequisites.push({
        id: prereqId,
        name_es: prereqMilestone.name_es,
        currentScore: prereqScore,
        requiredScore
      });
    }
  }

  const isUnlocked = missingPrerequisites.length === 0;

  return {
    unlocked: isUnlocked,
    milestone,
    currentMasteryPercentage: currentMastery,
    requiredMasteryPercentage: milestone.requiredMasteryPercentage,
    missingPrerequisites,
    cognitiveLockReason: !isUnlocked ? milestone.cognitiveLockExplanation : undefined,
    cognitiveLockReason_ar: !isUnlocked ? milestone.cognitiveLockExplanation_ar : undefined,
    canBypassViaPlacement: false
  };
}

/**
 * Validates the learner's entire verb tense progression against the Natural Order graph.
 */
export function validateTenseProgression(userProgress: UserProgress): TenseProgressionReport {
  let highestUnlocked = 1;
  let pastTenseContrastScore = 0;
  const evaluations: Record<string, TenseUnlockEvaluation> = {};

  for (const milestone of NATURAL_ORDER_TENSE_MILESTONES) {
    const evalResult = isTenseUnlocked(milestone.id, userProgress);
    evaluations[milestone.id] = evalResult;

    if (evalResult.unlocked) {
      highestUnlocked = Math.max(highestUnlocked, milestone.levelNumber);
    }

    if (milestone.id === 'level_4_past_contrast') {
      pastTenseContrastScore = evalResult.currentMasteryPercentage;
    }
  }

  const pastTenseStabilized = pastTenseContrastScore >= 85 || ['B1', 'B2'].includes(userProgress.currentLevel);
  const subjunctiveEval = evaluations['level_6_present_subjunctive'];

  return {
    overallTenseProgressPercentage: Math.round((highestUnlocked / 8) * 100),
    activeMilestoneId: `level_${highestUnlocked}`,
    highestUnlockedLevel: highestUnlocked,
    milestonesEvaluated: evaluations,
    isSubjunctiveGated: !subjunctiveEval?.unlocked,
    pastTenseContrastStabilized: pastTenseStabilized
  };
}

/**
 * Stores a verified milestone completion with timestamp and mastery score in the learner profile.
 */
export function recordTenseMilestoneMastery(
  userProgress: UserProgress,
  milestoneId: string,
  score: number
): UserProgress {
  const milestone = getTenseMilestoneById(milestoneId);
  if (!milestone) return userProgress;

  const passed = score >= milestone.requiredMasteryPercentage;
  const currentRecord = userProgress.tenseMilestoneMastery?.[milestoneId];

  // Preserve highest score achieved
  const newScore = Math.max(score, currentRecord?.score || 0);

  return {
    ...userProgress,
    tenseMilestoneMastery: {
      ...(userProgress.tenseMilestoneMastery || {}),
      [milestoneId]: {
        score: newScore,
        completedAt: new Date().toISOString(),
        passed
      }
    },
    xp: passed ? userProgress.xp + 50 : userProgress.xp
  };
}
