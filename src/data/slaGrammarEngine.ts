export interface DemonstrationPoint {
  point_number: number;
  point_type:
    | 'affirmative_yo'
    | 'negative_yo'
    | 'question_tu'
    | 'plural_subject'
    | 'desire_need'
    | 'real_dialogue'
    | 'mistake_correction'
    | 'mexican_dialect'
    | 'polite_formal'
    | 'rapid_trigger';
  label: string;
  es: string;
  en: string;
  ar?: string;
  phonetic: string;
  note: string;
}

export interface GrammarRuleMatrix {
  topicId: string;
  title: string;
  formula: string;
  plain_english_concept: string;
  ten_point_matrix: DemonstrationPoint[];
}

export interface ContrastiveInterferenceNote {
  title: string;
  trap_en: string;
  trap_ar: string;
  correctRule_en: string;
  correctRule_ar: string;
  contrastExample_es: string;
  contrastExample_en: string;
  contrastExample_ar: string;
}

export interface PatternDiscoveryItem {
  id: string;
  topicId: string;
  title: string;
  cefr: 'A1' | 'A2' | 'B1' | 'B2';
  sentences: {
    es: string;
    en: string;
    ar: string;
    highlightWord: string;
    syntaxTags: { word: string; tag: string; color: string }[];
  }[];
  question: string;
  question_ar: string;
  options: {
    text: string;
    text_ar: string;
    isCorrect: boolean;
  }[];
  ruleExplanation_en: string;
  ruleExplanation_ar: string;
  contrastiveNotes?: ContrastiveInterferenceNote[];
}

export interface MinimalPairCard {
  id: string;
  topic: string;
  topicId: string;
  cefr: 'A1' | 'A2' | 'B1' | 'B2';
  optionA: {
    es: string;
    en: string;
    ar: string;
    nuance: string;
    grammarTag: string;
  };
  optionB: {
    es: string;
    en: string;
    ar: string;
    nuance: string;
    grammarTag: string;
  };
  keyTakeaway_en: string;
  keyTakeaway_ar: string;
}

export interface ProcessingInstructionDrill {
  id: string;
  topicId: string;
  topic: string;
  cefr: 'A1' | 'A2' | 'B1' | 'B2';
  audioPrompt_es: string;
  targetTranslation_en: string;
  targetTranslation_ar: string;
  grammarMarkerFocus: string;
  wordTiles: string[];
  correctSequence: string[];
  explanation: string;
}

export interface SyntaxRepairChallenge {
  id: string;
  topicId: string;
  brokenSentence: string;
  errorWord: string;
  correctedWord: string;
  wordTiles: string[];
  correctSentence: string;
  translation_en: string;
  translation_ar: string;
  explanation_en: string;
  explanation_ar: string;
}

export const PATTERN_DISCOVERY_ITEMS: PatternDiscoveryItem[] = [
  {
    id: 'pd-noun-gender-plural',
    topicId: 'g-noun-gender-plural',
    title: 'Noun Gender & Plurals: Recognizing Irregular -ma Nouns',
    cefr: 'A1',
    sentences: [
      {
        es: 'El problema es difícil de resolver.',
        en: 'The problem is difficult to solve.',
        ar: 'المشكلة صعبة الحل (اسم مذكر ينتهي بـ -ma).',
        highlightWord: 'El',
        syntaxTags: [
          { word: 'El', tag: 'Masculine Article', color: 'bg-blue-100 text-blue-900 font-bold' },
          { word: 'problema', tag: 'Masculine Noun (-ma ending)', color: 'bg-blue-50 text-blue-800' }
        ]
      },
      {
        es: 'El idioma español es muy musical y expresivo.',
        en: 'The Spanish language is very musical and expressive.',
        ar: 'اللغة الإسبانية موسيقية ومعبرة جداً (اسم مذكر ينتهي بـ -ma).',
        highlightWord: 'El',
        syntaxTags: [
          { word: 'El', tag: 'Masculine Article', color: 'bg-blue-100 text-blue-900' },
          { word: 'idioma', tag: 'Masculine Noun (-ma ending)', color: 'bg-blue-50 text-blue-800' }
        ]
      },
      {
        es: 'El mapa del metro de Madrid es muy claro.',
        en: 'The map of the Madrid subway is very clear.',
        ar: 'خريطة مترو مدريد واضحة جداً (el mapa اسم مذكر شاذ).',
        highlightWord: 'El',
        syntaxTags: [
          { word: 'El', tag: 'Masculine Article', color: 'bg-blue-100 text-blue-900' },
          { word: 'mapa', tag: 'Irregular Masculine Noun', color: 'bg-blue-50 text-blue-800' }
        ]
      }
    ],
    question: 'Why do nouns like "problema", "idioma", and "mapa" take the masculine article "el"?',
    question_ar: 'لماذا تأخذ الأسماء مثل "problema" و "idioma" و "mapa" أداة التعريف المذكر "el"؟',
    options: [
      {
        text: 'Nouns of Greek origin ending in "-ma" (and exceptions like "mapa") are masculine despite ending in "-a".',
        text_ar: 'الأسماء ذات الأصل اليوناني المنتهية بـ "-ma" (والشواذ مثل "mapa") هي أسماء مذكرة على الرغم من انتهائها بـ "-a".',
        isCorrect: true
      },
      {
        text: 'Because all Spanish nouns ending in a vowel are masculine by default.',
        text_ar: 'لأن جميع الأسماء في اللغة الإسبانية المنتهية بحرف علة مذكرة بشكل تلقائي.',
        isCorrect: false
      },
      {
        text: 'They are dialectal slang mistakes and should strictly use "la".',
        text_ar: 'هي أخطاء عامية دارجة ويجب استخدام "la" معها بدقة.',
        isCorrect: false
      }
    ],
    ruleExplanation_en: 'Spanish words of Greek origin ending in "-ma" (like problema, idioma, sistema, tema, poema, dilema, clima) are grammatically masculine and take "el/los".',
    ruleExplanation_ar: 'الكلمات من أصل يوناني المنتهية بـ "-ma" (مثل problema و idioma و sistema و tema و clima) هي كلمات مذكرة قواعدياً وتأخذ el.',
    contrastiveNotes: [
      {
        title: 'False Friend: "La problema" vs "El problema"',
        trap_en: 'English speakers assume all -a nouns are feminine (saying "la problema").',
        trap_ar: 'المتحدثون بالعربية يترجمون "مشكلة" كمؤنث ويقولون خطأ "la problema".',
        correctRule_en: 'Always use "el problema", "el sistema", "el idioma", "el mapa", "el día".',
        correctRule_ar: 'استخدم دائماً "el problema" و "el idioma" و "el mapa" و "el día" كمذكر قواعدي.',
        contrastExample_es: 'Tengo un problema urgente (NO: una problema).',
        contrastExample_en: 'I have an urgent problem (masculine "un").',
        contrastExample_ar: 'لدي مشكلة عاجلة (باستخدام أداة التنكير المذكر un).'
      }
    ]
  },
  {
    id: 'pd-ser-estar',
    topicId: 'g-ser-vs-estar',
    title: 'Ser vs Estar: State vs Essence Pattern',
    cefr: 'A1',
    sentences: [
      {
        es: 'La manzana es verde (es de la variedad Granny Smith).',
        en: 'The apple is green (that is its inherent variety and color).',
        ar: 'التفاحة خضراء (نوعها ينتمي للصنف الأخضر بشكل دائم).',
        highlightWord: 'es',
        syntaxTags: [
          { word: 'La manzana', tag: 'Subject (Noun)', color: 'bg-blue-100 text-blue-900' },
          { word: 'es', tag: 'SER (Inherent Quality)', color: 'bg-emerald-100 text-emerald-900 font-bold' },
          { word: 'verde', tag: 'Inherent Characteristic', color: 'bg-purple-100 text-purple-900' }
        ]
      },
      {
        es: 'La manzana está verde (todavía no ha madurado).',
        en: 'The apple is unripe (temporary variable state).',
        ar: 'التفاحة فجة غير ناضجة (حالة مؤقتة تقتضي التغير والنضوج).',
        highlightWord: 'está',
        syntaxTags: [
          { word: 'La manzana', tag: 'Subject (Noun)', color: 'bg-blue-100 text-blue-900' },
          { word: 'está', tag: 'ESTAR (Temporary Condition)', color: 'bg-amber-100 text-amber-900 font-bold' },
          { word: 'verde', tag: 'Temporary State (Unripe)', color: 'bg-orange-100 text-orange-900' }
        ]
      },
      {
        es: 'Madrid está en España y es la capital del país.',
        en: 'Madrid is located in Spain (location = estar) and is the capital (identity = ser).',
        ar: 'مدريد تقع في إسبانيا (الموقع الجغرافي = estar) وهي عاصمة البلاد (الهوية والتعريف = ser).',
        highlightWord: 'está / es',
        syntaxTags: [
          { word: 'está', tag: 'ESTAR (Geographic Location)', color: 'bg-amber-100 text-amber-900 font-bold' },
          { word: 'es', tag: 'SER (Definition & Identity)', color: 'bg-emerald-100 text-emerald-900 font-bold' }
        ]
      }
    ],
    question: 'What fundamental rule dictates choosing between SER and ESTAR in Spanish?',
    question_ar: 'ما هي القاعدة الأساسية التي تحدد الاختيار الحاسم بين Ser و Estar؟',
    options: [
      {
        text: 'SER defines identity, origin, and intrinsic traits; ESTAR describes location, conditions, and temporary states.',
        text_ar: 'يعبر Ser عن الهوية والأصل والصفات الجوهرية؛ بينما يعبر Estar عن الموقع والحالات المؤقتة والمتغيرة.',
        isCorrect: true
      },
      {
        text: 'SER is only used for humans, while ESTAR is only used for physical objects.',
        text_ar: 'يُستخدم Ser للبشر فقط، بينما يُستخدم Estar للجماد والأشياء المادية فقط.',
        isCorrect: false
      }
    ],
    ruleExplanation_en: 'SER defines permanent identity and intrinsic traits (profession, nationality, time, material). ESTAR describes variable conditions, emotions, physical states, location, and actions in progress (estar + gerundio).',
    ruleExplanation_ar: 'يعبر Ser عن الهوية والصفات الثابتة والوقت والمهن. بينما يعبر Estar عن الحالات المؤقتة والمشاعر والمواقع الجغرافية والمضارع المستمر.',
    contrastiveNotes: [
      {
        title: 'L1 Interference: "Soy en Madrid" vs "Estoy en Madrid"',
        trap_en: 'English uses "to be" for both identity and location ("I am John" / "I am in Madrid").',
        trap_ar: 'اللغة العربية تستخدم الجملة الاسمية دون فعل كينونة (أنا في مدريد / أنا طالب).',
        correctRule_en: 'Location is ALWAYS expressed with ESTAR, never with SER.',
        correctRule_ar: 'الموقع الجغرافي يعبر عنه دائماً بـ ESTAR ولا يستخدم SER للموقع أبداً.',
        contrastExample_es: 'Estoy en casa descansando (NUNCA: Soy en casa).',
        contrastExample_en: 'I am at home resting (ESTAR for location).',
        contrastExample_ar: 'أنا في المنزل أستريح (باستخدام Estoy للمكان).'
      },
      {
        title: 'Adjective Semantic Shift: "Ser listo" vs "Estar listo"',
        trap_en: 'Translating "ready" literally without realizing the verb changes the meaning completely.',
        trap_ar: 'الخلط بين الصفة الجوهرية (ذكي) والحالة المؤقتة (مستعد وجاهز).',
        correctRule_en: '"Soy listo" = I am smart/clever. "Estoy listo" = I am ready.',
        correctRule_ar: '"Soy listo" تعني أنا ذكي، بينما "Estoy listo" تعني أنا مستعد وجاهز الآن.',
        contrastExample_es: 'Ya me puse el abrigo y estoy listo para salir.',
        contrastExample_en: 'I put on my coat and I am ready to leave.',
        contrastExample_ar: 'ارتديت معطفي وأنا الآن جاهز للانطلاق.'
      }
    ]
  },
  {
    id: 'pd-por-para',
    topicId: 'g-por-vs-para',
    title: 'Por vs Para: Cause vs Destination Pattern',
    cefr: 'A2',
    sentences: [
      {
        es: 'Estudio español para trabajar en una empresa en España.',
        en: 'I study Spanish in order to work at a company in Spain (future objective/goal).',
        ar: 'أدرس الإسبانية من أجل العمل في شركة بإسبانيا (الهدف والغاية المستقبلية).',
        highlightWord: 'para',
        syntaxTags: [
          { word: 'Estudio', tag: 'Action Verb', color: 'bg-blue-100 text-blue-900' },
          { word: 'para', tag: 'PARA (Goal/Purpose)', color: 'bg-emerald-100 text-emerald-900 font-bold' },
          { word: 'trabajar', tag: 'Future Purpose', color: 'bg-purple-100 text-purple-900' }
        ]
      },
      {
        es: 'Muchas gracias por tu valiosa ayuda con el proyecto.',
        en: 'Thank you very much because of your valuable help with the project (past cause/motive).',
        ar: 'شكراً جزيلاً لك بسبب مساعدتك القيمة في المشروع (السبب والدافع والرد).',
        highlightWord: 'por',
        syntaxTags: [
          { word: 'Gracias', tag: 'Expression', color: 'bg-stone-100 text-stone-900' },
          { word: 'por', tag: 'POR (Motive/Reason)', color: 'bg-amber-100 text-amber-900 font-bold' },
          { word: 'tu valiosa ayuda', tag: 'Past Cause', color: 'bg-rose-100 text-rose-900' }
        ]
      },
      {
        es: 'Caminamos por el parque para llegar a tiempo al museo.',
        en: 'We walked through the park (transit/path = por) in order to arrive on time (destination/goal = para).',
        ar: 'مشينا عبر الحديقة (المرور والمسار = por) من أجل الوصول في الوقت المحدد (الهدف = para).',
        highlightWord: 'por / para',
        syntaxTags: [
          { word: 'por el parque', tag: 'POR (Movement through space)', color: 'bg-amber-100 text-amber-900 font-bold' },
          { word: 'para llegar', tag: 'PARA (Target destination & goal)', color: 'bg-emerald-100 text-emerald-900 font-bold' }
        ]
      }
    ],
    question: 'How do you distinguish PARA from POR when expressing intentions and spatial movement?',
    question_ar: 'كيف تميز بين PARA و POR عند التعبير عن النوايا والأهداف والحركة المكانية؟',
    options: [
      {
        text: 'PARA points forward to future goals, destinations, and recipients; POR points backward to past causes, motives, exchanges, and routes.',
        text_ar: 'تشير PARA للأمام نحو الأهداف المستقبلية والوجهات والمستلم؛ بينما تشير POR للخلف نحو الأسباب والدوافع والبدل والمسارات.',
        isCorrect: true
      },
      {
        text: 'POR is only used for physical objects, while PARA is exclusively used for people.',
        text_ar: 'تُستخدم POR للأشياء المادية فقط بينما تُستخدم PARA حصرياً مع الأشخاص.',
        isCorrect: false
      }
    ],
    ruleExplanation_en: 'PARA focuses on destination (voy para Madrid), deadline (para mañana), recipient (es para ti), and ultimate purpose/in order to (para aprender). POR focuses on cause/motive (por el tráfico), duration (por dos horas), exchange price (por diez euros), and movement through space (por la calle).',
    ruleExplanation_ar: 'تركز PARA على الوجهة، الموعد النهائي، المستلم، والهدف المستقبلي (لكي). بينما تركز POR على السبب، المدة، سعر التبادل، والمرور عبر المكان.',
    contrastiveNotes: [
      {
        title: 'Interference with English "For" / Arabic "لـ / من أجل"',
        trap_en: 'English uses "for" for both "for you" (para ti) and "for three hours" (por tres horas).',
        trap_ar: 'اللغة العربية قد تستخدم "لـ" للسبب والغاية، مما يوقع المتعلم في فخ استخدام para للسبب.',
        correctRule_en: 'Always use POR for duration and cause; use PARA for deadlines and recipients.',
        correctRule_ar: 'استخدم دائماً POR للمدة والسبب (شكراً لك)، واستخدم PARA للهدف والمستلم والميعاد.',
        contrastExample_es: 'Este regalo es para ti (recipient) / Gracias por venir (cause).',
        contrastExample_en: 'This gift is for you (para) / Thanks for coming (por).',
        contrastExample_ar: 'هذه الهدية لك (para) / شكراً لحضورك (por).'
      }
    ]
  },
  {
    id: 'pd-preterite-imperfect',
    topicId: 'g-past-tenses',
    title: 'Preterite vs Imperfect: The Foreground Event vs Background Scene',
    cefr: 'A2',
    sentences: [
      {
        es: 'Ayer a las cinco sonó el teléfono y salí de casa.',
        en: 'Yesterday at five the phone rang and I left home (completed sequential events).',
        ar: 'أمس في الساعة الخامسة رن الهاتف وخرجت من المنزل (أحداث متتالية مكتملة = Pretérito).',
        highlightWord: 'sonó / salí',
        syntaxTags: [
          { word: 'sonó', tag: 'Preterite (Punctual event)', color: 'bg-emerald-100 text-emerald-900 font-bold' },
          { word: 'salí', tag: 'Preterite (Completed action)', color: 'bg-emerald-100 text-emerald-900 font-bold' }
        ]
      },
      {
        es: 'Cuando tenía diez años, vivía en Valencia y jugaba al fútbol.',
        en: 'When I was ten years old, I lived in Valencia and used to play soccer (ongoing habits & state).',
        ar: 'عندما كان عمري عشر سنوات، كنت أعيش في فالنسيا وكنت ألعب كرة القدم (عادات ووصف = Imperfecto).',
        highlightWord: 'tenía / vivía',
        syntaxTags: [
          { word: 'tenía', tag: 'Imperfect (Age/State)', color: 'bg-amber-100 text-amber-900 font-bold' },
          { word: 'vivía', tag: 'Imperfect (Habitual residence)', color: 'bg-amber-100 text-amber-900 font-bold' }
        ]
      },
      {
        es: 'Yo leía tranquilamente en el salón cuando de repente se fue la luz.',
        en: 'I was reading quietly in the living room (imperfect background) when suddenly the power went out (preterite interruption).',
        ar: 'كنت أقرأ بهدوء في الصالون (خلفية مستمرة = Imperfecto) عندما انقطعت الكهرباء فجأة (حدث قاطع = Pretérito).',
        highlightWord: 'leía / se fue',
        syntaxTags: [
          { word: 'leía', tag: 'Imperfect (Background action)', color: 'bg-amber-100 text-amber-900 font-bold' },
          { word: 'se fue', tag: 'Preterite (Interrupting event)', color: 'bg-emerald-100 text-emerald-900 font-bold' }
        ]
      }
    ],
    question: 'How do native speakers mentally divide actions between Pretérito and Imperfecto?',
    question_ar: 'كيف يقسم المتحدثون الأصليون الأحداث ذهنياً بين الماضي البسيط والماضي المستمر؟',
    options: [
      {
        text: 'Preterite marks completed historical plot points (foreground); Imperfect sets the atmospheric scenery, routines, descriptions, and age (background).',
        text_ar: 'الماضي البسيط يحدد أحداث القصة المكتملة المتتالية؛ بينما الماضي المستمر يرسم المشهد والوصف والعادات والعمر في الخلفية.',
        isCorrect: true
      },
      {
        text: 'Preterite is used only for things that happened this year; Imperfect is for things that happened centuries ago.',
        text_ar: 'الماضي البسيط يُستخدم لأحداث هذا العام فقط بينما الماضي المستمر للأحداث القديمة جداً.',
        isCorrect: false
      }
    ],
    ruleExplanation_en: 'Think of the Imperfect as the movie set and background music (era de noche, hacía frío, yo leía) and the Preterite as the sudden action that occurs on stage (alguien gritó, sonó el teléfono).',
    ruleExplanation_ar: 'تخيل Imperfecto كديكور المسرح والموسيقى التصويرية المستمرة (كان الوقت ليلاً، كان الجو بارداً، كنت أقرأ)، بينما Pretérito هو الحدث الطارئ الذي يقع فجأة (صرخ أحدهم، رن الهاتف).',
    contrastiveNotes: [
      {
        title: 'Verb Meaning Shifts in Preterite vs Imperfect',
        trap_en: 'Certain verbs alter their core translation between the two past tenses.',
        trap_ar: 'بعض الأفعال يتغير معناها بالكامل بين الماضي البسيط والماضي المستمر.',
        correctRule_en: '"Conocí" = I met for the first time vs "Conocía" = I already knew; "Supe" = I found out vs "Sabía" = I knew.',
        correctRule_ar: '"Conocí" = تعرفت لأول مرة، بينما "Conocía" = كنت أعرفه مسبقاً؛ "Supe" = علمت واكتشفت، بينما "Sabía" = كنت أعلم.',
        contrastExample_es: 'Ayer supe la verdad (I found out yesterday) / Ya lo sabía (I already knew).',
        contrastExample_en: 'Yesterday I found out the truth / I already knew it.',
        contrastExample_ar: 'أمس علمت بالحقيقة (اكتشاف = Pretérito) / كنت أعلم ذلك بالفعل (معرفة مسبقة = Imperfecto).'
      }
    ]
  },
  {
    id: 'pd-subjunctive-trigger',
    topicId: 'g-subjunctive-present',
    title: 'Subjunctive Mood: WEIRDO Triggers vs Facts',
    cefr: 'B1',
    sentences: [
      {
        es: 'Sé que tú estudias mucho para el examen (Hecho seguro / Indicativo).',
        en: 'I know that you study a lot for the exam (Objective certainty/fact -> Indicative).',
        ar: 'أعلم أنك تدرس كثيراً للامتحان (حقيقة مؤكدة موضوعية = Indicativo).',
        highlightWord: 'estudias',
        syntaxTags: [
          { word: 'Sé que', tag: 'Certainty Trigger', color: 'bg-sky-100 text-sky-900 font-bold' },
          { word: 'estudias', tag: 'Indicative Mood (Fact)', color: 'bg-emerald-100 text-emerald-900 font-bold' }
        ]
      },
      {
        es: 'Quiero que tú estudies mucho para asegurar tu futuro (Deseo / Subjuntivo).',
        en: 'I want you to study a lot to secure your future (Subjective wish directed at another -> Subjunctive).',
        ar: 'أريدك أن تدرس كثيراً لتضمن مستقبلك (رغبة وتمنٍ موجه لشخص آخر = Subjuntivo).',
        highlightWord: 'estudies',
        syntaxTags: [
          { word: 'Quiero que', tag: 'WEIRDO Wish Trigger', color: 'bg-purple-100 text-purple-900 font-bold' },
          { word: 'estudies', tag: 'Subjunctive Mood (Desire)', color: 'bg-amber-100 text-amber-900 font-bold' }
        ]
      },
      {
        es: 'Dudo que ellos tengan razón en esta discusión (Duda / Subjuntivo).',
        en: 'I doubt that they are right in this discussion (Doubt/Uncertainty -> Subjunctive).',
        ar: 'أشك في أنهم على حق في هذا النقاش (شك وعدم يقين = Subjuntivo).',
        highlightWord: 'tengan',
        syntaxTags: [
          { word: 'Dudo que', tag: 'Doubt Trigger', color: 'bg-purple-100 text-purple-900 font-bold' },
          { word: 'tengan', tag: 'Subjunctive Mood (Doubt)', color: 'bg-amber-100 text-amber-900 font-bold' }
        ]
      }
    ],
    question: 'Why does "Quiero que" change the verb ending from "-as" to "-es" (estudias ➔ estudies)?',
    question_ar: 'لماذا تغير العبارة "Quiero que" نهاية الفعل من "-as" إلى "-es" (estudias ➔ estudies)؟',
    options: [
      {
        text: 'Because "Quiero que" introduces a subjective desire for another subject, triggering the vowel-flip Subjunctive mood.',
        text_ar: 'لأن "Quiero que" تقدم رغبة شخصية ذاتية لفاعل آخر، مما يقتضي تبديل حرف العلة في صيغة المنصوب (Subjuntivo).',
        isCorrect: true
      },
      {
        text: 'Because the action has already finished in the past.',
        text_ar: 'لأن الحدث قد انتهى واكتمل بالفعل في الماضي.',
        isCorrect: false
      }
    ],
    ruleExplanation_en: 'The Subjunctive mood is triggered when the main clause expresses Wishes (Quiero que), Emotions (Me alegra que), Impersonal judgments (Es importante que), Recommendations (Te sugiero que), Doubt (Dudo que), or Denial targeting a different subject. The vowels flip: -AR verbs take "-e" (estudie), while -ER/-IR verbs take "-a" (viva).',
    ruleExplanation_ar: 'تُستثار صيغة Subjuntivo عندما تنقل الجملة الأولى أمنية، شعوراً، حكماً غير شخصي، نصيحة، أو شكاً لفاعل آخر. وتنقلب حروف العلة: أفعال -AR تأخذ e، وأفعال -ER/-IR تأخذ a.',
    contrastiveNotes: [
      {
        title: 'False Friend & English Interference: Infinitive Trap ("I want you to go")',
        trap_en: 'English uses infinitive ("I want you to go"); learners mistakenly say "Quiero tú ir".',
        trap_ar: 'المتعلمون يترجمون حرفياً "أريدك أن تذهب" بنقل الكلمات دون صياغة صيغة المنصوب.',
        correctRule_en: 'Spanish requires "Quiero que + Subjuntivo" whenever the two subjects differ: "Quiero que vayas".',
        correctRule_ar: 'في الإسبانية يجب استخدام "Quiero que + Subjuntivo" لاختلاف الفاعل: "Quiero que vayas".',
        contrastExample_es: 'Quiero que vengas a mi fiesta (NO: Quiero tú venir).',
        contrastExample_en: 'I want you to come to my party.',
        contrastExample_ar: 'أريدك أن تأتي إلى حفلتي (بصيغة المنصوب vengas).'
      }
    ]
  }
];


export const MINIMAL_PAIR_CARDS: MinimalPairCard[] = [
  {
    id: 'mp-noun-gender',
    topic: 'Noun Gender Meaning Shifts',
    topicId: 'g-noun-gender-plural',
    cefr: 'A1',
    optionA: {
      es: 'El cura.',
      en: 'The priest (masculine noun).',
      ar: 'الكاهن / القسيس (مذكر).',
      nuance: 'Religious figure',
      grammarTag: 'El cura (masc)'
    },
    optionB: {
      es: 'La cura.',
      en: 'The cure / treatment (feminine noun).',
      ar: 'العلاج / الشفاء (مؤنث).',
      nuance: 'Medical remedy',
      grammarTag: 'La cura (fem)'
    },
    keyTakeaway_en: 'Changing the grammatical article changes the noun meaning from "priest" to "cure".',
    keyTakeaway_ar: 'تغيير أداة الاسم يغير معناه بالكامل من "كاهن" إلى "علاج/شفاء".'
  },
  {
    id: 'mp-ser-estar-listo',
    topic: 'Ser vs Estar with Adjectives',
    topicId: 'g-ser-vs-estar',
    cefr: 'A1',
    optionA: {
      es: 'Soy listo.',
      en: 'I am smart / clever (inherent personality).',
      ar: 'أنا شخص ذكي وسريع الفهم (صفة شخصية ممتدة).',
      nuance: 'Intelligence trait',
      grammarTag: 'SER + listo'
    },
    optionB: {
      es: 'Estoy listo.',
      en: 'I am ready (prepared right now).',
      ar: 'أنا مستعد وجاهز الآن للانطلاق (حالة مؤقتة).',
      nuance: 'Preparedness state',
      grammarTag: 'ESTAR + listo'
    },
    keyTakeaway_en: 'Changing between SER and ESTAR fundamentally transforms adjective meanings: "listo" changes from "smart" to "ready".',
    keyTakeaway_ar: 'التبديل بين Ser و Estar يغير معنى الصفة بالكامل: listo تتغير من "ذكي" إلى "مستعد".'
  },
  {
    id: 'mp-preterite-imperfect',
    topic: 'Preterite vs Imperfect Aspect Shift',
    topicId: 'g-past-tenses',
    cefr: 'A2',
    optionA: {
      es: 'Ayer hablé con María.',
      en: 'Yesterday I spoke with María (Completed event, specific point).',
      ar: 'بالأمس تحدثت مع ماريا (حدث مكتمل وينتهي في نقطة زمنية محددة).',
      nuance: 'Single completed event',
      grammarTag: 'Pretérito Indefinido'
    },
    optionB: {
      es: 'Antes hablaba con María.',
      en: 'In the past I used to speak with María (Habitual / Ongoing state).',
      ar: 'في الماضي كنت أتحدث مع ماريا باعتياد (عادة ماضية وتصوير مستمر).',
      nuance: 'Habitual past background',
      grammarTag: 'Pretérito Imperfecto'
    },
    keyTakeaway_en: 'Preterite (hablé) views actions as completed snapshot boxes. Imperfect (hablaba) views actions as ongoing background movies or habits.',
    keyTakeaway_ar: 'الماضي البسيط (hablé) ينظر للفعل كحدث منتهي في صندوق، بينما الماضي المستمر (hablaba) ينظر إليه كفيلم خلفي ممتد أو عادة.'
  },
  {
    id: 'mp-direct-object-gender',
    topic: 'Direct Object Pronouns (Lo vs La)',
    topicId: 'g-direct-objects',
    cefr: 'A2',
    optionA: {
      es: 'Compré el libro y lo leí.',
      en: 'I bought the book and read it (Masculine item).',
      ar: 'اشتريت الكتاب وقرأته (ضمير مذكر يعود على el libro).',
      nuance: 'Masculine Object (el libro -> lo)',
      grammarTag: 'Pronombre LO'
    },
    optionB: {
      es: 'Compré la revista y la leí.',
      en: 'I bought the magazine and read it (Feminine item).',
      ar: 'اشتريت المجلة وقرأتها (ضمير مؤنث يعود على la revista).',
      nuance: 'Feminine Object (la revista -> la)',
      grammarTag: 'Pronombre LA'
    },
    keyTakeaway_en: 'Direct object pronouns must strictly match the grammatical gender of the replaced noun (el libro -> lo, la casa -> la).',
    keyTakeaway_ar: 'يجب أن يطابق ضمير المفعول المباشر جنس الاسم المستبدل تماماً (el libro -> lo, la revista -> la).'
  },
  {
    id: 'mp-subjunctive-indicative-search',
    topic: 'Subjunctive vs Indicative (Known vs Unknown)',
    topicId: 'g-subjunctive-present',
    cefr: 'B1',
    optionA: {
      es: 'Busco un hotel que tiene piscina.',
      en: 'I am looking for a specific hotel that has a pool (I know it exists).',
      ar: 'أبحث عن فندق محدد أعرفه يحتوي على مسبح (موجود بالفعل = Indicativo).',
      nuance: 'Specific known entity',
      grammarTag: 'Indicativo (tiene)'
    },
    optionB: {
      es: 'Busco un hotel que tenga piscina.',
      en: 'I am looking for any hotel that has a pool (Uncertain if exists).',
      ar: 'أبحث عن أي فندق بشرط أن يحتوي على مسبح (غير محدد وجوده = Subjuntivo).',
      nuance: 'Uncertain hypothetical entity',
      grammarTag: 'Subjuntivo (tenga)'
    },
    keyTakeaway_en: 'When looking for someone or something specific and known, use Indicative (tiene). When seeking any hypothetical entity with desired qualities, use Subjunctive (tenga).',
    keyTakeaway_ar: 'عند البحث عن شيء محدد ومعروف استخدم الإخبار (tiene)، وعند البحث عن نموذج مفترض غير محدد استخدم المنصوب (tenga).'
  }
];

export const PROCESSING_INSTRUCTION_DRILLS: ProcessingInstructionDrill[] = [
  {
    id: 'pi-gender',
    topicId: 'g-noun-gender-plural',
    topic: 'Noun Plural Accent Drops',
    cefr: 'A1',
    audioPrompt_es: 'La lección es fácil y las lecciones son útiles.',
    targetTranslation_en: 'The lesson is easy and the lessons are useful.',
    targetTranslation_ar: 'الدرس سهل والدروس مفيدة (لاحظ سقوط النبرة عند الجمع).',
    grammarMarkerFocus: 'Notice the accent mark drop: lección -> lecciones',
    wordTiles: ['La', 'lección', 'es', 'fácil', 'y', 'las', 'lecciones', 'son', 'útiles.'],
    correctSequence: ['La', 'lección', 'es', 'fácil', 'y', 'las', 'lecciones', 'son', 'útiles.'],
    explanation: 'Nouns ending in -ón drop the written accent mark in plural because the added syllable naturally moves the stress to the correct vowel.'
  },
  {
    id: 'pi-1',
    topicId: 'g-past-tenses',
    topic: 'Preterite Ending Recognition (-é vs -o)',
    cefr: 'A1',
    audioPrompt_es: 'Ayer hablé con el médico.',
    targetTranslation_en: 'Yesterday I spoke with the doctor.',
    targetTranslation_ar: 'بالأمس تحدثتُ أنا مع الطبيب.',
    grammarMarkerFocus: 'Notice the accent on "-é" indicating First Person Past (Yo hablé)',
    wordTiles: ['Ayer', 'hablé', 'con', 'el', 'médico.'],
    correctSequence: ['Ayer', 'hablé', 'con', 'el', 'médico.'],
    explanation: 'The "-é" ending on "hablé" signals that "I" (yo) performed the action in the completed past.'
  },
  {
    id: 'pi-2',
    topicId: 'g-subjunctive-present',
    topic: 'Subjunctive Command Marker',
    cefr: 'B1',
    audioPrompt_es: 'Es importante que estudies ahora.',
    targetTranslation_en: 'It is important that you study now.',
    targetTranslation_ar: 'من المهم أن تدرس أنت الآن.',
    grammarMarkerFocus: 'Notice the vowel swap: estudiar (AR verb) -> estudies (E ending for Subjunctive)',
    wordTiles: ['Es', 'importante', 'que', 'estudies', 'ahora.'],
    correctSequence: ['Es', 'importante', 'que', 'estudies', 'ahora.'],
    explanation: 'AR verbs swap their vowel to -e in the Subjunctive mood following impersonal triggers like "Es importante que".'
  },
  {
    id: 'pi-3',
    topicId: 'g-gustar',
    topic: 'Indirect Object Position with Gustar',
    cefr: 'A2',
    audioPrompt_es: 'Me gusta la música clásica.',
    targetTranslation_en: 'Classical music pleases me (I like classical music).',
    targetTranslation_ar: 'الموسيقى الكلاسيكية تعجبني.',
    grammarMarkerFocus: 'Notice "Me" is the recipient of pleasure, "la música" is the real subject',
    wordTiles: ['Me', 'gusta', 'la', 'música', 'clásica.'],
    correctSequence: ['Me', 'gusta', 'la', 'música', 'clásica.'],
    explanation: 'In Spanish, "gustar" literally means "to be pleasing to someone". "La música" is the subject causing the action.'
  }
];

export const SYNTAX_REPAIR_CHALLENGES: SyntaxRepairChallenge[] = [
  {
    id: 'sr-gender',
    topicId: 'g-noun-gender-plural',
    brokenSentence: 'El problema es difícil, pero la solución es bonita.',
    errorWord: 'La problema',
    correctedWord: 'El problema',
    wordTiles: ['El problema', 'La problema', 'Un problema', 'Una problema'],
    correctSentence: 'El problema es difícil, pero la solución es bonita.',
    translation_en: 'The problem is difficult, but the solution is pretty.',
    translation_ar: 'المشكلة صعبة، ولكن الحل جميل.',
    explanation_en: '"Problema" ends in "-ma", meaning it is masculine. It must take "el", not "la".',
    explanation_ar: 'كلمة "Problema" من الأسماء المنتهية بـ "-ma" وهي أسماء مذكرة تأخذ "el".'
  },
  {
    id: 'sr-1',
    topicId: 'g-time-numbers',
    brokenSentence: 'Yo soy 20 años de edad.',
    errorWord: 'soy',
    correctedWord: 'tengo',
    wordTiles: ['tengo', 'estoy', 'soy', 'hago'],
    correctSentence: 'Yo tengo 20 años de edad.',
    translation_en: 'I am 20 years old.',
    translation_ar: 'عمري 20 عاماً.',
    explanation_en: 'In Spanish, age is expressed using TENER (to have years), not SER.',
    explanation_ar: 'في اللغة الإسبانية نعبر عن العمر باستخدام فعل Tener (يملك سنوات) وليس Ser.'
  },
  {
    id: 'sr-2',
    topicId: 'g-gustar',
    brokenSentence: 'Me gusta los libros de historia.',
    errorWord: 'gusta',
    correctedWord: 'gustan',
    wordTiles: ['gustan', 'gusta', 'gustaría', 'gusto'],
    correctSentence: 'Me gustan los libros de historia.',
    translation_en: 'I like history books.',
    translation_ar: 'تعجبني كتب التاريخ.',
    explanation_en: 'Since "los libros" is plural, the verb must be plural: "gustan".',
    explanation_ar: 'بما أن "los libros" جمع، يجب أن يكون الفعل بصيغة الجمع: gustan.'
  },
  {
    id: 'sr-3',
    topicId: 'g-subjunctive-present',
    brokenSentence: 'Es necesario que tú estudias hoy.',
    errorWord: 'estudias',
    correctedWord: 'estudies',
    wordTiles: ['estudies', 'estudias', 'estudiar', 'estudié'],
    correctSentence: 'Es necesario que tú estudies hoy.',
    translation_en: 'It is necessary that you study today.',
    translation_ar: 'من الضروري أن تدرس اليوم.',
    explanation_en: 'Trigger "Es necesario que" requires the Subjunctive form "estudies" for AR verbs.',
    explanation_ar: 'المثير "Es necesario que" يتطلب صيغة المنصوب Subjuntivo (estudies).'
  },
  {
    id: 'sr-4',
    topicId: 'g-articles',
    brokenSentence: 'Vamos a el parque ahora.',
    errorWord: 'a el',
    correctedWord: 'al',
    wordTiles: ['al', 'a el', 'en el', 'del'],
    correctSentence: 'Vamos al parque ahora.',
    translation_en: 'Let us go to the park now.',
    translation_ar: 'لنذهب إلى الحديقة الآن.',
    explanation_en: 'In Spanish, the preposition "a" mandatory contracts with "el" to form "al".',
    explanation_ar: 'في الإسبانية، يندمج حرف الجر a بالضرورة مع أدوات التعريف el ليكونا al.'
  }
];

export const TEN_POINT_GRAMMAR_MATRICES: GrammarRuleMatrix[] = [
  {
    topicId: 'g-tener-expressions',
    title: 'The Verb TENER (To Have / Expressions)',
    formula: 'TENER + [Age / Hunger / Thirst / Cold / Heat / Fear / Need]',
    plain_english_concept: 'Spanish uses TENER (to possess) for physical states, age, and feelings where English uses "to be".',
    ten_point_matrix: [
      {
        point_number: 1,
        point_type: 'affirmative_yo',
        label: '1. Affirmative Statement (Yo)',
        es: 'Yo tengo mucha hambre y quiero comer tacos.',
        en: 'I am very hungry and want to eat tacos.',
        ar: 'أنا جائع جداً وأريد تناول التاكو.',
        phonetic: 'YOH TEHN-goh MOO-chah AHM-breh',
        note: 'Expresses physical state as possession of hunger.'
      },
      {
        point_number: 2,
        point_type: 'negative_yo',
        label: '2. Negative Statement (Yo no...)',
        es: 'Yo no tengo efectivo en este momento.',
        en: 'I do not have cash at this moment.',
        ar: 'ليس لدي مال نقدي في هذه اللحظة.',
        phonetic: 'YOH noh TEHN-goh eh-fehk-TEE-boh',
        note: '"No" always directly precedes "tengo".'
      },
      {
        point_number: 3,
        point_type: 'question_tu',
        label: '3. Question Form (¿Tú...?)',
        es: '¿Tú tienes frío o prendo el aire?',
        en: 'Are you cold or should I turn on the AC?',
        ar: 'هل تشعر بالبرد أم أغلّق التكييف؟',
        phonetic: 'too TYEH-nehs FREE-oh',
        note: 'Tener + frío = to be cold.'
      },
      {
        point_number: 4,
        point_type: 'plural_subject',
        label: '4. Plural Subject (Nosotros / Ustedes)',
        es: 'Nosotros tenemos una reunión a las tres de la tarde.',
        en: 'We have a meeting at three in the afternoon.',
        ar: 'لدينا اجتماع في الساعة الثالثة عصراً.',
        phonetic: 'noh-SOH-trohs teh-NEH-mohs OO-nah reh-oo-NYOHN',
        note: 'We form "tenemos" preserves root stem.'
      },
      {
        point_number: 5,
        point_type: 'desire_need',
        label: '5. Expressing Desire / Need (Quiero / Necesito)',
        es: 'Necesito tener la clave del Wi-Fi antes de empezar.',
        en: 'I need to have the Wi-Fi key before starting.',
        ar: 'أحتاج إلى الحصول على كلمة سر الواي فاي قبل البدء.',
        phonetic: 'neh-seh-SEE-toh teh-NEHR lah KLAH-veh',
        note: 'Infinitive "tener" follows modal verb "necesito".'
      },
      {
        point_number: 6,
        point_type: 'real_dialogue',
        label: '6. Real Conversation Snippet',
        es: '—¿Tienes prisa? —No, tengo todo el tiempo del mundo.',
        en: '—Are you in a rush? —No, I have all the time in the world.',
        ar: '—هل أنت مستعجل؟ —لا، لدي كل الوقت في العالم.',
        phonetic: 'TYEH-nehs PREE-sah? Noh, TEHN-goh TOH-doh',
        note: 'Tener prisa = to be in a hurry.'
      },
      {
        point_number: 7,
        point_type: 'mistake_correction',
        label: '7. Common Beginner Mistake & Correction',
        es: '❌ "Soy 25 años" ➔ ✅ "Tengo 25 años."',
        en: 'Wrong: "I am 25 years" ➔ Correct: "I have 25 years."',
        ar: 'خطأ: "Soy 25 años" ➔ صواب: "Tengo 25 años."',
        phonetic: 'TEHN-goh VEHN-tee-SEEN-koh AH-nyohs',
        note: 'Never use SER for age in Spanish!'
      },
      {
        point_number: 8,
        point_type: 'mexican_dialect',
        label: '8. Mexican Dialect Variant',
        es: '¿Qué onda, mano? ¿Tienes chance de hablar ahorita?',
        en: 'What’s up, bro? Do you have a moment to talk right now?',
        ar: 'أهلاً يا صديقي، هل لديك وقت للحديث الآن؟',
        phonetic: 'keh OHN-dah MAH-noh TYEH-nehs CHAHN-seh',
        note: '"Tener chance" is authentic Mexican slang for having time/availability.'
      },
      {
        point_number: 9,
        point_type: 'polite_formal',
        label: '9. Polite / Formal Request (Usted)',
        es: '¿Usted tiene alguna pregunta sobre el contrato?',
        en: 'Do you (formal) have any questions regarding the contract?',
        ar: 'هل لدى حضرتك أي سؤال بخصوص العقد؟',
        phonetic: 'OOS-tehd TYEH-neh ahl-GOO-nah preh-GOON-tah',
        note: 'Formal subject uses 3rd person form "tiene".'
      },
      {
        point_number: 10,
        point_type: 'rapid_trigger',
        label: '10. Rapid Output Trigger',
        es: 'Si trabajas todo el día bajo el sol, tú _____ mucha sed.',
        en: 'Fill in: "tienes" (If you work all day under the sun, you are very thirsty).',
        ar: 'أكمل: tienes (إذا عملت طوال اليوم تحت الشمس، تكون عطشاناً جداً).',
        phonetic: 'TYEH-nehs MOO-chah SEHD',
        note: 'Target: tienes.'
      }
    ]
  },
  {
    topicId: 'g-ser-vs-estar',
    title: 'SER vs ESTAR (Permanent Identity vs Temporary State)',
    formula: 'SER = Identity / Origin / Traits | ESTAR = Location / Emotional & Physical States',
    plain_english_concept: 'SER describes WHO or WHAT something inherently is. ESTAR describes HOW or WHERE something currently is.',
    ten_point_matrix: [
      {
        point_number: 1,
        point_type: 'affirmative_yo',
        label: '1. Affirmative Statement (Yo)',
        es: 'Yo soy desarrollador de software y estoy muy emocionado hoy.',
        en: 'I am a software developer (SER) and I am very excited today (ESTAR).',
        ar: 'أنا مبرمج برمجيات (Ser) وأنا متحمس جداً اليوم (Estar).',
        phonetic: 'YOH SOY deh-sah-roh-yah-DOR... ehs-TOY MOO-y eh-moh-syoh-NAH-doh',
        note: 'Profession = SER, Emotion = ESTAR.'
      },
      {
        point_number: 2,
        point_type: 'negative_yo',
        label: '2. Negative Statement (Yo no...)',
        es: 'Yo no estoy cansado, pero no soy de esta ciudad.',
        en: 'I am not tired (ESTAR), but I am not from this city (SER).',
        ar: 'لستُ تعباناً (Estar)، ولكني لستُ من هذه المدينة (Ser).',
        phonetic: 'YOH noh ehs-TOY kahn-SAH-doh... noh SOY deh EHS-tah syoo-DAHD',
        note: 'State of fatigue = ESTAR, Origin = SER.'
      },
      {
        point_number: 3,
        point_type: 'question_tu',
        label: '3. Question Form (¿Tú...?)',
        es: '¿Dónde estás tú y por qué no estás listo todavía?',
        en: 'Where are you (ESTAR) and why are you not ready yet (ESTAR)?',
        phonetic: 'DOHN-deh ehs-TAHS too',
        note: 'Location and state of readiness both require ESTAR.'
      },
      {
        point_number: 4,
        point_type: 'plural_subject',
        label: '4. Plural Subject (Nosotros / Ustedes)',
        es: 'Nosotros somos mexicanos y estamos orgullosos de nuestra cultura.',
        en: 'We are Mexican (SER) and we are proud of our culture (ESTAR).',
        phonetic: 'noh-SOH-trohs SOH-mohs meh-hee-KAH-nohs',
        note: 'Nationality = SER, Current sentiment = ESTAR.'
      },
      {
        point_number: 5,
        point_type: 'desire_need',
        label: '5. Expressing Desire / Need (Quiero / Necesito)',
        es: 'Quiero estar tranquilo este fin de semana en la playa.',
        en: 'I want to be relaxed (ESTAR) this weekend at the beach.',
        phonetic: 'KYEH-roh ehs-TAR trahn-KEE-loh',
        note: 'Infinitive "estar" denotes state of peace.'
      },
      {
        point_number: 6,
        point_type: 'real_dialogue',
        label: '6. Real Conversation Snippet',
        es: '—¿De dónde eres? —Soy de Guadalajara, pero estoy viviendo en CDMX.',
        en: '—Where are you from? —I’m from Guadalajara, but I’m living in CDMX.',
        phonetic: 'Deh DOHN-deh EH-rehs? SOY deh Gwah-dah-lah-HAH-rah',
        note: 'Origin = SER, Temporary residence/action = ESTAR.'
      },
      {
        point_number: 7,
        point_type: 'mistake_correction',
        label: '7. Common Beginner Mistake & Correction',
        es: '❌ "La comida es fría." ➔ ✅ "La comida está fría."',
        en: 'Wrong: Food is cold inherently ➔ Correct: Food has gone cold right now.',
        ar: 'خطأ: La comida es fría ➔ صواب: La comida está fría.',
        phonetic: 'lah koh-MEE-dah ehs-TAH FREE-ah',
        note: 'Food temperature is a variable state (ESTAR).'
      },
      {
        point_number: 8,
        point_type: 'mexican_dialect',
        label: '8. Mexican Dialect Variant',
        es: '¡Esta salsa está buenísima! ¡Está de poca madre!',
        en: 'This salsa is amazing! It’s insanely good!',
        phonetic: 'EHS-tah SAHL-sah ehs-TAH bweh-NEE-see-mah',
        note: 'Food taste evaluation in current moment = ESTAR.'
      },
      {
        point_number: 9,
        point_type: 'polite_formal',
        label: '9. Polite / Formal Request (Usted)',
        es: '¿Usted está libre para una reunión ejecutiva hoy?',
        en: 'Are you (formal) free for an executive meeting today?',
        phonetic: 'OOS-tehd ehs-TAH LEE-breh',
        note: 'Availability state requires ESTAR with Usted.'
      },
      {
        point_number: 10,
        point_type: 'rapid_trigger',
        label: '10. Rapid Output Trigger',
        es: 'El evento _____ en el auditorio principal a las seis.',
        en: 'Fill in: "es" (The event TAKES PLACE in the main auditorium - Event location uses SER!).',
        ar: 'أكمل: es (موقع الفعاليات والأحداث يستخدم Ser وليس Estar).',
        phonetic: 'ehl eh-VEHN-toh EHS ehn ehl ow-dee-TOH-ryoh',
        note: 'Target: es (Event locations = SER).'
      }
    ]
  }
];

