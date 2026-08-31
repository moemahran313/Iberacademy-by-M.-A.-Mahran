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
        es: 'El problema es difícil.',
        en: 'The problem is difficult.',
        ar: 'المشكلة صعبة (اسم مذكر ينتهي بـ -ma).',
        highlightWord: 'El',
        syntaxTags: [
          { word: 'El', tag: 'Masculine Article', color: 'bg-blue-100 text-blue-900 font-bold' },
          { word: 'problema', tag: 'Masculine Noun (-ma ending)', color: 'bg-blue-50 text-blue-800' }
        ]
      },
      {
        es: 'El idioma es interesante.',
        en: 'The language is interesting.',
        ar: 'اللغة ممتعة (اسم مذكر ينتهي بـ -ma).',
        highlightWord: 'El',
        syntaxTags: [
          { word: 'El', tag: 'Masculine Article', color: 'bg-blue-100 text-blue-900' },
          { word: 'idioma', tag: 'Masculine Noun (-ma ending)', color: 'bg-blue-50 text-blue-800' }
        ]
      },
      {
        es: 'Las lecciones son largas.',
        en: 'The lessons are long.',
        ar: 'الدروس طويلة (اسم مؤنث جمع ينتهي بـ -ción).',
        highlightWord: 'Las',
        syntaxTags: [
          { word: 'Las', tag: 'Feminine Plural Article', color: 'bg-rose-100 text-rose-900' },
          { word: 'lecciones', tag: 'Feminine Plural Noun (-ción)', color: 'bg-rose-50 text-rose-800' }
        ]
      }
    ],
    question: 'Why do nouns like "problema" and "idioma" take the masculine article "el"?',
    question_ar: 'لماذا تأخذ الأسماء مثل "problema" و "idioma" أداة التعريف المذكر "el"؟',
    options: [
      {
        text: 'Nouns of Greek origin ending in "-ma" are masculine despite ending in "-a".',
        text_ar: 'الأسماء ذات الأصل اليوناني المنتهية بـ "-ma" هي أسماء مذكرة على الرغم من انتهائها بـ "-a".',
        isCorrect: true
      },
      {
        text: 'Because all Spanish nouns are masculine by default.',
        text_ar: 'لأن جميع الأسماء في اللغة الإسبانية مذكرة بشكل تلقائي.',
        isCorrect: false
      },
      {
        text: 'They are mistakes in Spanish and should use "la".',
        text_ar: 'هي أخطاء في الإسبانية ويجب استخدام "la" معها.',
        isCorrect: false
      }
    ],
    ruleExplanation_en: 'Spanish words of Greek origin ending in "-ma" (like problema, idioma, sistema, tema, poema) are grammatically masculine.',
    ruleExplanation_ar: 'الكلمات من أصل يوناني المنتهية بـ "-ma" (مثل problema و idioma و sistema) هي كلمات مذكرة قواعدياً وتأخذ el.'
  },
  {
    id: 'pd-ser-estar',
    topicId: 'g-ser-vs-estar',
    title: 'Ser vs Estar: State vs Essence Pattern',
    cefr: 'A1',
    sentences: [
      {
        es: 'La manzana es verde.',
        en: 'The apple is green (a green variety).',
        ar: 'التفاحة خضراء (نوعها ينتمي للصنف الأخضر).',
        highlightWord: 'es',
        syntaxTags: [
          { word: 'La manzana', tag: 'Subject (Noun)', color: 'bg-blue-100 text-blue-900' },
          { word: 'es', tag: 'SER (Inherent Quality)', color: 'bg-emerald-100 text-emerald-900' },
          { word: 'verde', tag: 'Inherent Characteristic', color: 'bg-purple-100 text-purple-900' }
        ]
      },
      {
        es: 'La manzana está verde.',
        en: 'The apple is unripe (temporary state).',
        ar: 'التفاحة فجة غير ناضجة (حالة مؤقتة تقتضي التغير).',
        highlightWord: 'está',
        syntaxTags: [
          { word: 'La manzana', tag: 'Subject (Noun)', color: 'bg-blue-100 text-blue-900' },
          { word: 'está', tag: 'ESTAR (Temporary Condition)', color: 'bg-amber-100 text-amber-900' },
          { word: 'verde', tag: 'Temporary State (Unripe)', color: 'bg-orange-100 text-orange-900' }
        ]
      }
    ],
    question: 'What fundamental rule dictates using ESTAR over SER in Spanish?',
    question_ar: 'ما هي القاعدة الأساسية التي تحدد استخدام Estar بدلاً من Ser؟',
    options: [
      {
        text: 'ESTAR is used for temporary states, locations, and variable conditions.',
        text_ar: 'يُscتخدم Estar للحالات المؤقتة والمواقع والمواقف المتغيرة.',
        isCorrect: true
      },
      {
        text: 'ESTAR is used only for permanent traits.',
        text_ar: 'يُستخدم Estar فقط للصفات الشخصية الدائمة.',
        isCorrect: false
      }
    ],
    ruleExplanation_en: 'SER defines permanent identity and intrinsic traits. ESTAR describes variable conditions, emotions, physical states, and geographic location.',
    ruleExplanation_ar: 'يعبر Ser عن الهوية والصفات الثابتة. بينما يعبر Estar عن الحالات المؤقتة والمشاعر والمواقع الجغرافية.'
  },
  {
    id: 'pd-por-para',
    topicId: 'g-por-vs-para',
    title: 'Por vs Para: Cause vs Destination Pattern',
    cefr: 'A2',
    sentences: [
      {
        es: 'Estudio español para trabajar en España.',
        en: 'I study Spanish in order to work in Spain.',
        ar: 'أدرس الإسبانية من أجل العمل في إسبانيا (الهدف والغاية).',
        highlightWord: 'para',
        syntaxTags: [
          { word: 'Estudio', tag: 'Action Verb', color: 'bg-blue-100 text-blue-900' },
          { word: 'para', tag: 'PARA (Goal/Purpose)', color: 'bg-emerald-100 text-emerald-900' },
          { word: 'trabajar', tag: 'Future Purpose', color: 'bg-purple-100 text-purple-900' }
        ]
      },
      {
        es: 'Gracias por tu ayuda.',
        en: 'Thank you because of your help.',
        ar: 'شكراً لك بسبب مساعدتك (الدافع والسبب والرد).',
        highlightWord: 'por',
        syntaxTags: [
          { word: 'Gracias', tag: 'Expression', color: 'bg-stone-100 text-stone-900' },
          { word: 'por', tag: 'POR (Motive/Reason)', color: 'bg-amber-100 text-amber-900' },
          { word: 'tu ayuda', tag: 'Past Cause', color: 'bg-rose-100 text-rose-900' }
        ]
      }
    ],
    question: 'How do you distinguish PARA from POR when expressing intentions?',
    question_ar: 'كيف تميز بين PARA و POR عند التعبير عن النوايا والأهداف؟',
    options: [
      {
        text: 'PARA points forward to future goals; POR points backward to past causes.',
        text_ar: 'تشير PARA للأمام نحو أهداف مستهدفة؛ بينما تشير POR للخلف نحو الأسباب والدوافع.',
        isCorrect: true
      },
      {
        text: 'POR is used for deadlines; PARA is for duration.',
        text_ar: 'تُستخدم POR للمواعيد النهائية بينما PARA للمدة الزمنية.',
        isCorrect: false
      }
    ],
    ruleExplanation_en: 'PARA focuses on destination, deadline, recipient, and ultimate goal. POR focuses on motive, cause, exchange price, duration, and movement.',
    ruleExplanation_ar: 'تركز PARA على الوجهة، الموعد، المستلم، والهدف. بينما تركز POR على السبب، المدة، والتبادل والمرور.'
  },
  {
    id: 'pd-subjunctive-trigger',
    topicId: 'g-subjunctive-present',
    title: 'Subjunctive Mood: WEIRDO Triggers vs Facts',
    cefr: 'B1',
    sentences: [
      {
        es: 'Sé que tú estudias mucho.',
        en: 'I know that you study a lot (Fact / Certainty).',
        ar: 'أعلم أنك تدرس كثيراً (حقيقة مؤكدة = Indicativo).',
        highlightWord: 'estudias',
        syntaxTags: [
          { word: 'Sé que', tag: 'Certainty Trigger', color: 'bg-sky-100 text-sky-900 font-bold' },
          { word: 'estudias', tag: 'Indicative Mood (Fact)', color: 'bg-emerald-100 text-emerald-900' }
        ]
      },
      {
        es: 'Quiero que tú estudies mucho.',
        en: 'I want you to study a lot (Desire / Unfulfilled Wish).',
        ar: 'أريدك أن تدرس كثيراً (رغبة وأمنية = Subjuntivo).',
        highlightWord: 'estudies',
        syntaxTags: [
          { word: 'Quiero que', tag: 'WEIRDO Wish Trigger', color: 'bg-purple-100 text-purple-900 font-bold' },
          { word: 'estudies', tag: 'Subjunctive Mood (Desire)', color: 'bg-amber-100 text-amber-900' }
        ]
      }
    ],
    question: 'Why does "Quiero que" change the verb from "estudias" to "estudies"?',
    question_ar: 'لماذا تغير العبارة "Quiero que" الفعل من "estudias" إلى "estudies"؟',
    options: [
      {
        text: 'Because "Quiero que" expresses a subjective desire for someone else, triggering the Subjunctive mood.',
        text_ar: 'لأن "Quiero que" تعبر عن رغبة شخصية تجاه شخص آخر، مما يتطلب صيغة المنصوب (Subjuntivo).',
        isCorrect: true
      },
      {
        text: 'Because it is referring to past completed time.',
        text_ar: 'لأنها تشير إلى زمن ماضي مكتمل.',
        isCorrect: false
      }
    ],
    ruleExplanation_en: 'The Subjunctive mood is triggered when the main clause expresses a wish, emotion, impersonal judgment, recommendation, doubt, or denial (WEIRDO) targeting a different subject.',
    ruleExplanation_ar: 'تُستثار صيغة Subjuntivo عندما تنقل الجملة الرئيسية أمنية، شعوراً، تقييماً غير شخصي، شكاً، أو طلباً موظفاً لفاعل آخر.'
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
