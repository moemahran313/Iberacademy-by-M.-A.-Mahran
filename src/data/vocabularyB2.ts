import { VocabularyItem } from '../types';

/**
 * Exhaustive CEFR B2 Vocabulary Dataset
 * Aligned with official CEFR B2 specifications & ESL/DELE upper-intermediate lexical frameworks.
 * Spans abstract concepts, executive verbs, nuanced adjectives, discourse markers,
 * idioms, and professional/academic domains with trilingual annotations (ES, EN, AR).
 */
export const VOCABULARY_B2: VocabularyItem[] = [
  // ==========================================
  // 1. ABSTRACT & CONCEPTUAL NOUNS
  // ==========================================
  {
    id: 'b2-1',
    spanish: 'desafío',
    word: 'desafío',
    english: 'challenge / dare',
    translation_en: 'challenge / dare',
    arabic: 'تحدٍ / معضلة',
    translation_ar: 'تحدٍ / معضلة',
    gender: 'el',
    phonetic: 'desaˈfi.o',
    cefr: 'B2',
    category: 'abstract',
    partOfSpeech: 'noun',
    frequencyRank: 129,
    examples: [
      { es: 'Superar este desafío tecnológico requiere perseverancia y trabajo en equipo.', en: 'Overcoming this technological challenge requires perseverance and teamwork.', ar: 'التغلب على هذا التحدي التكنولوجي يتطلب مثابرة وعملاً جماعياً.' }
    ]
  },
  {
    id: 'b2-2',
    spanish: 'perspectiva',
    word: 'perspectiva',
    english: 'perspective / outlook',
    translation_en: 'perspective / outlook',
    arabic: 'منظور / وجهة نظر',
    gender: 'la',
    phonetic: 'peɾspekˈtiβa',
    cefr: 'B2',
    category: 'abstract',
    partOfSpeech: 'noun',
    frequencyRank: 130,
    examples: [
      { es: 'El análisis ofrece una perspectiva innovadora sobre la economía global.', en: 'The analysis offers an innovative perspective on the global economy.', ar: 'يقدم التحليل منظوراً مبتكراً حول الاقتصاد العالمي.' }
    ]
  },
  {
    id: 'b2-3',
    spanish: 'matiz',
    word: 'matiz',
    english: 'nuance / subtle distinction',
    translation_en: 'nuance / subtle distinction',
    arabic: 'فارق دقيق / لمسة فارقة',
    gender: 'el',
    phonetic: 'maˈtis',
    cefr: 'B2',
    category: 'discourse',
    partOfSpeech: 'noun',
    frequencyRank: 131,
    examples: [
      { es: 'Es fundamental captar cada matiz cultural durante la negociación.', en: 'It is essential to grasp every cultural nuance during negotiations.', ar: 'من الضروري استيعاب كل فارق دقيق ثقافي أثناء المفاوضات.' }
    ]
  },
  {
    id: 'b2-4',
    spanish: 'hipótesis',
    word: 'hipótesis',
    english: 'hypothesis / assumption',
    translation_en: 'hypothesis / assumption',
    arabic: 'فرضية / افتراض علمي',
    gender: 'la',
    phonetic: 'iˈpotesis',
    cefr: 'B2',
    category: 'academic',
    partOfSpeech: 'noun',
    frequencyRank: 132,
    examples: [
      { es: 'Los investigadores confirmaron su hipótesis inicial tras el experimento.', en: 'The researchers confirmed their initial hypothesis following the experiment.', ar: 'أكد الباحثون فرضيتهم الأولية بعد التجربة.' }
    ]
  },
  {
    id: 'b2-5',
    spanish: 'consecuencia',
    word: 'consecuencia',
    english: 'consequence / aftermath',
    translation_en: 'consequence / aftermath',
    arabic: 'عاقبة / نتيجة',
    gender: 'la',
    phonetic: 'konseˈkwensja',
    cefr: 'B2',
    category: 'discourse',
    partOfSpeech: 'noun',
    frequencyRank: 133,
    examples: [
      { es: 'Asumir las consecuencias de nuestras decisiones es señal de madurez.', en: 'Accepting the consequences of our decisions is a sign of maturity.', ar: 'تحمل عواقب قراراتنا علامة على النضج.' }
    ]
  },
  {
    id: 'b2-6',
    spanish: 'tendencia',
    word: 'tendencia',
    english: 'trend / inclination',
    translation_en: 'trend / inclination',
    arabic: 'نزعة / اتجاه سائد',
    gender: 'la',
    phonetic: 'tenˈdensja',
    cefr: 'B2',
    category: 'society',
    partOfSpeech: 'noun',
    frequencyRank: 134,
    examples: [
      { es: 'La nueva tendencia del mercado apunta hacia la digitalización integral.', en: 'The new market trend points toward full digitalization.', ar: 'الاتجاه السائد الجديد في السوق يشير نحو التحول الرقمي الشامل.' }
    ]
  },
  {
    id: 'b2-7',
    spanish: 'paradigma',
    word: 'paradigma',
    english: 'paradigm / shift',
    translation_en: 'paradigm / shift',
    arabic: 'نموذج فكري / نموذج أصلي',
    gender: 'el',
    phonetic: 'paɾaˈðiɣma',
    cefr: 'B2',
    category: 'academic',
    partOfSpeech: 'noun',
    frequencyRank: 135,
    examples: [
      { es: 'El aprendizaje virtual representa un cambio de paradigma educativo.', en: 'Virtual learning represents an educational paradigm shift.', ar: 'التعليم الافتراضي يمثل تحولاً في النموذج الفكري التعليمي.' }
    ]
  },
  {
    id: 'b2-8',
    spanish: 'sostenibilidad',
    word: 'sostenibilidad',
    english: 'sustainability',
    translation_en: 'sustainability',
    arabic: 'استدامة',
    gender: 'la',
    phonetic: 'sosteniβiliˈðað',
    cefr: 'B2',
    category: 'nature',
    partOfSpeech: 'noun',
    frequencyRank: 136,
    examples: [
      { es: 'La sostenibilidad ambiental es prioritaria para el desarrollo urbano.', en: 'Environmental sustainability is a priority for urban development.', ar: 'الاستدامة البيئية هي أولوية للتنمية الحضرية.' }
    ]
  },
  {
    id: 'b2-9',
    spanish: 'elocuencia',
    word: 'elocuencia',
    english: 'eloquence / articulateness',
    translation_en: 'eloquence / articulateness',
    arabic: 'فصاحة / بلاغة',
    gender: 'la',
    phonetic: 'eloˈkwensja',
    cefr: 'B2',
    category: 'discourse',
    partOfSpeech: 'noun',
    frequencyRank: 137,
    examples: [
      { es: 'El orador cautivó a la audiencia con su extraordinaria elocuencia.', en: 'The speaker captivated the audience with his extraordinary eloquence.', ar: 'سحر الخطيب الجمهور ببلاغته الاستثنائية.' }
    ]
  },
  {
    id: 'b2-10',
    spanish: 'discrepancia',
    word: 'discrepancia',
    english: 'discrepancy / disagreement',
    translation_en: 'discrepancy / disagreement',
    arabic: 'تعارض / تباين',
    gender: 'la',
    phonetic: 'diskɾeˈpansja',
    cefr: 'B2',
    category: 'discourse',
    partOfSpeech: 'noun',
    frequencyRank: 138,
    examples: [
      { es: 'Existe una clara discrepancia entre los datos teóricos y los resultados prácticos.', en: 'There is a clear discrepancy between theoretical data and practical results.', ar: 'هناك تباين واضح بين البيانات النظرية والنتائج العملية.' }
    ]
  },
  {
    id: 'b2-11',
    spanish: 'dilema',
    word: 'dilema',
    english: 'dilemma / predicament',
    translation_en: 'dilemma / predicament',
    arabic: 'معضلة / مأزق',
    gender: 'el',
    phonetic: 'diˈlema',
    cefr: 'B2',
    category: 'abstract',
    partOfSpeech: 'noun',
    frequencyRank: 139,
    examples: [
      { es: 'El comité se enfrentó a un dilema ético complejo antes de tomar la decisión.', en: 'The committee faced a complex ethical dilemma before making the decision.', ar: 'واجهت اللجنة معضلة أخلاقية معقدة قبل اتخاذ القرار.' }
    ]
  },
  {
    id: 'b2-12',
    spanish: 'paradoja',
    word: 'paradoja',
    english: 'paradox / contradiction',
    translation_en: 'paradox / contradiction',
    arabic: 'تناقض ظاهري / مفارقة',
    gender: 'la',
    phonetic: 'paɾaˈðoxa',
    cefr: 'B2',
    category: 'academic',
    partOfSpeech: 'noun',
    frequencyRank: 140,
    examples: [
      { es: 'Es una paradoja que en la era de la conectividad muchos se sientan aislados.', en: 'It is a paradox that in the age of connectivity many feel isolated.', ar: 'من المفارقات أنه في عصر التواصل يشعر الكثيرون بالعزلة.' }
    ]
  },
  {
    id: 'b2-13',
    spanish: 'consenso',
    word: 'consenso',
    english: 'consensus / agreement',
    translation_en: 'consensus / agreement',
    arabic: 'إجماع / توافق الآراء',
    gender: 'el',
    phonetic: 'konˈsen.so',
    cefr: 'B2',
    category: 'society',
    partOfSpeech: 'noun',
    frequencyRank: 141,
    examples: [
      { es: 'Alcanzamos un consenso general tras un extenso debate multilateral.', en: 'We reached a general consensus after extensive multilateral debate.', ar: 'وصلنا إلى إجماع عام بعد نقاش متعدد الأطراف مطول.' }
    ]
  },
  {
    id: 'b2-14',
    spanish: 'compromiso',
    word: 'compromiso',
    english: 'commitment / obligation',
    translation_en: 'commitment / obligation',
    arabic: 'التزام / تعهد',
    gender: 'el',
    phonetic: 'kompɾoˈmi.so',
    cefr: 'B2',
    category: 'society',
    partOfSpeech: 'noun',
    frequencyRank: 142,
    examples: [
      { es: 'Demostró un firme compromiso con la excelencia profesional.', en: 'He demonstrated a firm commitment to professional excellence.', ar: 'أظهر التزاماً راسخاً بالتميز المهني.' }
    ]
  },
  {
    id: 'b2-15',
    spanish: 'integridad',
    word: 'integridad',
    english: 'integrity / honesty',
    translation_en: 'integrity / honesty',
    arabic: 'نزاهة / استقامة',
    gender: 'la',
    phonetic: 'inteɣɾiˈðað',
    cefr: 'B2',
    category: 'abstract',
    partOfSpeech: 'noun',
    frequencyRank: 143,
    examples: [
      { es: 'La integridad del líder inspiró confianza en toda la organización.', en: 'The leader’s integrity inspired trust across the entire organization.', ar: 'أوحت نزاهة القائد بالثقة في المنظمة بأكملها.' }
    ]
  },
  {
    id: 'b2-16',
    spanish: 'ambigüedad',
    word: 'ambigüedad',
    english: 'ambiguity / vagueness',
    translation_en: 'ambiguity / vagueness',
    arabic: 'غموض / إبهام',
    gender: 'la',
    phonetic: 'ambiɣweˈðað',
    cefr: 'B2',
    category: 'discourse',
    partOfSpeech: 'noun',
    frequencyRank: 144,
    examples: [
      { es: 'El contrato fue redactado sin ambigüedad para evitar litigios futuros.', en: 'The contract was drafted without ambiguity to avoid future litigation.', ar: 'تمت صياغة العقد دون غموض لتجنب النزاعات المستقبلية.' }
    ]
  },
  {
    id: 'b2-17',
    spanish: 'magnitud',
    word: 'magnitud',
    english: 'magnitude / scale',
    translation_en: 'magnitude / scale',
    arabic: 'حجم / ضخامة',
    gender: 'la',
    phonetic: 'maɣniˈtuð',
    cefr: 'B2',
    category: 'academic',
    partOfSpeech: 'noun',
    frequencyRank: 145,
    examples: [
      { es: 'Pocos comprendían la magnitud real del descubrimiento científico.', en: 'Few understood the true magnitude of the scientific discovery.', ar: 'قليلون فهموا الحجم الحقيقي للكتشاف العلمي.' }
    ]
  },
  {
    id: 'b2-18',
    spanish: 'repercusión',
    word: 'repercusión',
    english: 'repercussion / impact',
    translation_en: 'repercussion / impact',
    arabic: 'تأثير / انعكاس',
    gender: 'la',
    phonetic: 'repeɾkuˈsjon',
    cefr: 'B2',
    category: 'society',
    partOfSpeech: 'noun',
    frequencyRank: 146,
    examples: [
      { es: 'La nueva reforma fiscal tuvo una enorme repercusión en la economía.', en: 'The new tax reform had a massive impact on the economy.', ar: 'كان للإصلاح الضريبي الجديد انعكاس هائل على الاقتصاد.' }
    ]
  },
  {
    id: 'b2-19',
    spanish: 'vulnerabilidad',
    word: 'vulnerabilidad',
    english: 'vulnerability',
    translation_en: 'vulnerability',
    arabic: 'هشاشة / قابلية للتأثر',
    gender: 'la',
    phonetic: 'bulneɾaβiliˈðað',
    cefr: 'B2',
    category: 'society',
    partOfSpeech: 'noun',
    frequencyRank: 147,
    examples: [
      { es: 'El informe analiza la vulnerabilidad de las comunidades costeras ante el cambio climático.', en: 'The report analyzes the vulnerability of coastal communities to climate change.', ar: 'يحلل التقرير هشاشة المجتمعات الساحلية أمام التغير المناخي.' }
    ]
  },
  {
    id: 'b2-20',
    spanish: 'incertidumbre',
    word: 'incertidumbre',
    english: 'uncertainty / doubt',
    translation_en: 'uncertainty / doubt',
    arabic: 'عدم يقين / حيرة',
    gender: 'la',
    phonetic: 'inseɾtiˈðumbɾe',
    cefr: 'B2',
    category: 'abstract',
    partOfSpeech: 'noun',
    frequencyRank: 148,
    examples: [
      { es: 'En tiempos de incertidumbre económica, la prudencia es vital.', en: 'In times of economic uncertainty, prudence is vital.', ar: 'في أوقات عدم اليقين الاقتصادي، يكون الحذر أمراً حيوياً.' }
    ]
  },

  // ==========================================
  // 2. EXECUTIVE & ADVANCED VERBS
  // ==========================================
  {
    id: 'b2-21',
    spanish: 'fomentar',
    word: 'fomentar',
    english: 'to foster / promote',
    translation_en: 'to foster / promote',
    arabic: 'تعزيز / تشجيع',
    phonetic: 'fomenˈtaɾ',
    cefr: 'B2',
    category: 'verbs',
    partOfSpeech: 'verb',
    frequencyRank: 149,
    examples: [
      { es: 'El gobierno busca fomentar la innovación tecnológica en las escuelas.', en: 'The government seeks to foster technological innovation in schools.', ar: 'تسعى الحكومة إلى تشجيع الابتكار التكنولوجي في المدارس.' }
    ]
  },
  {
    id: 'b2-22',
    spanish: 'superar',
    word: 'superar',
    english: 'to overcome / surpass',
    translation_en: 'to overcome / surpass',
    arabic: 'يتغلب على / يتجاوز',
    phonetic: 'supeˈɾaɾ',
    cefr: 'B2',
    category: 'verbs',
    partOfSpeech: 'verb',
    frequencyRank: 150,
    examples: [
      { es: 'Con determinación, ella logró superar todos los obstáculos personales.', en: 'With determination, she managed to overcome all personal obstacles.', ar: 'بإصرار، تمكنت من التغلب على جميع العقبات الشخصية.' }
    ]
  },
  {
    id: 'b2-23',
    spanish: 'evaluar',
    word: 'evaluar',
    english: 'to evaluate / assess',
    translation_en: 'to evaluate / assess',
    arabic: 'يُقَيِّم / يثمن',
    phonetic: 'eβaluˈaɾ',
    cefr: 'B2',
    category: 'verbs',
    partOfSpeech: 'verb',
    frequencyRank: 151,
    examples: [
      { es: 'Debemos evaluar los riesgos antes de invertir en la nueva empresa.', en: 'We must assess the risks before investing in the new venture.', ar: 'يجب أن نقيم المخاطر قبل الاستثمار في المشروع الجديد.' }
    ]
  },
  {
    id: 'b2-24',
    spanish: 'negociar',
    word: 'negociar',
    english: 'to negotiate / bargain',
    translation_en: 'to negotiate / bargain',
    arabic: 'يتفاوض / يساوم',
    phonetic: 'neɣoˈsjaɾ',
    cefr: 'B2',
    category: 'verbs',
    partOfSpeech: 'verb',
    frequencyRank: 152,
    examples: [
      { es: 'Los diplomáticos se reunieron para negociar un acuerdo de paz duradero.', en: 'Diplomats met to negotiate a lasting peace agreement.', ar: 'اجتمع الدبلوماسيون للتفاوض على اتفاقية سلام دائمة.' }
    ]
  },
  {
    id: 'b2-25',
    spanish: 'implementar',
    word: 'implementar',
    english: 'to implement / execute',
    translation_en: 'to implement / execute',
    arabic: 'يطبق / ينفذ',
    phonetic: 'implemenˈtaɾ',
    cefr: 'B2',
    category: 'verbs',
    partOfSpeech: 'verb',
    frequencyRank: 153,
    examples: [
      { es: 'Vamos a implementar una nueva estrategia de ciberseguridad.', en: 'We are going to implement a new cybersecurity strategy.', ar: 'سننفذ استراتيجية جديدة للأمن السيبراني.' }
    ]
  },
  {
    id: 'b2-26',
    spanish: 'adquirir',
    word: 'adquirir',
    english: 'to acquire / gain',
    translation_en: 'to acquire / gain',
    arabic: 'يكتسب / يستحوذ',
    phonetic: 'aðkiˈɾiɾ',
    cefr: 'B2',
    category: 'verbs',
    partOfSpeech: 'verb',
    frequencyRank: 154,
    examples: [
      { es: 'Aprender idiomas permite adquirir competencias interculturales valiosas.', en: 'Learning languages allows one to acquire valuable intercultural skills.', ar: 'تعلم اللغات يتيح اكتساب مهارات قيمة بين الثقافات.' }
    ]
  },
  {
    id: 'b2-27',
    spanish: 'desencadenar',
    word: 'desencadenar',
    english: 'to trigger / unleash',
    translation_en: 'to trigger / unleash',
    arabic: 'يطلق العنان / يثير',
    phonetic: 'deseŋkaðeˈnaɾ',
    cefr: 'B2',
    category: 'verbs',
    partOfSpeech: 'verb',
    frequencyRank: 155,
    examples: [
      { es: 'El anuncio imprevisto desencadenó una ola de reacciones en las redes sociales.', en: 'The unexpected announcement triggered a wave of reactions on social media.', ar: 'أثار الإعلان غير المتوقع موجة من ردود الفعل على وسائل التواصل الاجتماعي.' }
    ]
  },
  {
    id: 'b2-28',
    spanish: 'potenciar',
    word: 'potenciar',
    english: 'to enhance / boost',
    translation_en: 'to enhance / boost',
    arabic: 'يعزز / يقوي',
    phonetic: 'potenˈsjaɾ',
    cefr: 'B2',
    category: 'verbs',
    partOfSpeech: 'verb',
    frequencyRank: 156,
    examples: [
      { es: 'Este taller está diseñado para potenciar tus habilidades directivas.', en: 'This workshop is designed to boost your leadership skills.', ar: 'تم تصميم ورشة العمل هذه لتعزيز مهاراتك القيادية.' }
    ]
  },
  {
    id: 'b2-29',
    spanish: 'adjudicar',
    word: 'adjudicar',
    english: 'to allocate / award / grant',
    translation_en: 'to allocate / award / grant',
    arabic: 'يمعن / يمنح / يرسو',
    phonetic: 'aðxuðiˈkaɾ',
    cefr: 'B2',
    category: 'verbs',
    partOfSpeech: 'verb',
    frequencyRank: 157,
    examples: [
      { es: 'El ayuntamiento decidió adjudicar el contrato a la empresa más sostenible.', en: 'The city council decided to award the contract to the most sustainable firm.', ar: 'قرر مجلس المدينة ترسية العقد على الشركة الأكثر استدامة.' }
    ]
  },
  {
    id: 'b2-30',
    spanish: 'albergar',
    word: 'albergar',
    english: 'to house / accommodate / harbor',
    translation_en: 'to house / accommodate / harbor',
    arabic: 'يستضيف / يحتوي',
    phonetic: 'alβeɾˈɣaɾ',
    cefr: 'B2',
    category: 'verbs',
    partOfSpeech: 'verb',
    frequencyRank: 158,
    examples: [
      { es: 'El museo alberga una colección invaluable de obras vanguardistas.', en: 'The museum houses an invaluable collection of avant-garde artworks.', ar: 'يضم التحف مجموعة لا تُقدر بثمان من الأعمال الطليعية.' }
    ]
  },
  {
    id: 'b2-31',
    spanish: 'anticipar',
    word: 'anticipar',
    english: 'to anticipate / foresee',
    translation_en: 'to anticipate / foresee',
    arabic: 'يتوقع / يستبق',
    phonetic: 'antisiˈpaɾ',
    cefr: 'B2',
    category: 'verbs',
    partOfSpeech: 'verb',
    frequencyRank: 159,
    examples: [
      { es: 'Es fundamental anticipar los cambios del mercado para mantener la ventaja.', en: 'It is vital to anticipate market changes to maintain the edge.', ar: 'من الضروري استباق تغيرات السوق للحفاظ على الميزة التنافسية.' }
    ]
  },
  {
    id: 'b2-32',
    spanish: 'transigir',
    word: 'transigir',
    english: 'to compromise / yield',
    translation_en: 'to compromise / yield',
    arabic: 'يتساهل / يساوم',
    phonetic: 'tɾansiˈxiɾ',
    cefr: 'B2',
    category: 'verbs',
    partOfSpeech: 'verb',
    frequencyRank: 160,
    examples: [
      { es: 'En asuntos de ética profesional, la dirección rehusó transigir.', en: 'In matters of professional ethics, management refused to compromise.', ar: 'في مسائل الأخلاقيات المهنية، رفضت الإدارة المساومة.' }
    ]
  },
  {
    id: 'b2-33',
    spanish: 'recalcar',
    word: 'recalcar',
    english: 'to stress / emphasize',
    translation_en: 'to stress / emphasize',
    arabic: 'يؤكد شديداً / يشدد',
    phonetic: 'rekalˈkaɾ',
    cefr: 'B2',
    category: 'verbs',
    partOfSpeech: 'verb',
    frequencyRank: 161,
    examples: [
      { es: 'El profesor volvió a recalcar la importancia del pensamiento crítico.', en: 'The professor stressed once again the importance of critical thinking.', ar: 'شدد أستاذ الجامعة مرة أخرى على أهمية التفكير النقدي.' }
    ]
  },
  {
    id: 'b2-34',
    spanish: 'abogar',
    word: 'abogar',
    english: 'to advocate / plead for',
    translation_en: 'to advocate / plead for',
    arabic: 'يدافع عن / يناصر',
    phonetic: 'aβoˈɣaɾ',
    cefr: 'B2',
    category: 'verbs',
    partOfSpeech: 'verb',
    frequencyRank: 162,
    examples: [
      { es: 'Diversas organizaciones abogan por los derechos de los consumidores.', en: 'Various organizations advocate for consumer rights.', ar: 'تناصر منظمات متعددة حقوق المستهلكين.' }
    ]
  },
  {
    id: 'b2-35',
    spanish: 'desempeñar',
    word: 'desempeñar',
    english: 'to perform / play a role',
    translation_en: 'to perform / play a role',
    arabic: 'يؤدي دوراً / يمارس',
    phonetic: 'desempeˈɲaɾ',
    cefr: 'B2',
    category: 'verbs',
    partOfSpeech: 'verb',
    frequencyRank: 163,
    examples: [
      { es: 'Ella desempeña un papel clave en el departamento de innovación.', en: 'She plays a key role in the innovation department.', ar: 'تؤدي دوراً رئيسياً في قسم الابتكار.' }
    ]
  },

  // ==========================================
  // 3. NUANCED ADJECTIVES & QUALIFIERS
  // ==========================================
  {
    id: 'b2-36',
    spanish: 'convincente',
    word: 'convincente',
    english: 'compelling / persuasive',
    translation_en: 'compelling / persuasive',
    arabic: 'مقنع / دامغ',
    phonetic: 'kombinˈsente',
    cefr: 'B2',
    category: 'adjectives',
    partOfSpeech: 'adjective',
    frequencyRank: 164,
    examples: [
      { es: 'El abogado presentó un argumento sumamente convincente ante el tribunal.', en: 'The lawyer presented a highly compelling argument before the court.', ar: 'قدم المحامي حجة مقنعة للغاية أمام المحكمة.' }
    ]
  },
  {
    id: 'b2-37',
    spanish: 'reticente',
    word: 'reticente',
    english: 'reluctant / hesitant',
    translation_en: 'reluctant / hesitant',
    arabic: 'متردد / متحفظ',
    phonetic: 'retiˈsente',
    cefr: 'B2',
    category: 'adjectives',
    partOfSpeech: 'adjective',
    frequencyRank: 165,
    examples: [
      { es: 'Al principio se mostró reticente a adoptar las nuevas herramientas digitales.', en: 'At first he was reluctant to adopt the new digital tools.', ar: 'في البداية كان متردداً في اعتماد الأدوات الرقمية الجديدة.' }
    ]
  },
  {
    id: 'b2-38',
    spanish: 'lucrativo',
    word: 'lucrativo',
    english: 'lucrative / profitable',
    translation_en: 'lucrative / profitable',
    arabic: 'مربح / مجدٍ ماليّاً',
    phonetic: 'lukɾaˈtiβo',
    cefr: 'B2',
    category: 'adjectives',
    partOfSpeech: 'adjective',
    frequencyRank: 166,
    examples: [
      { es: 'Firmaron un contrato lucrativo que expandió sus operaciones internacionales.', en: 'They signed a lucrative deal that expanded their international operations.', ar: 'وقعوا عقداً مربحاً وسع عملياتهم الدولية.' }
    ]
  },
  {
    id: 'b2-39',
    spanish: 'obsoleto',
    word: 'obsoleto',
    english: 'obsolete / outdated',
    translation_en: 'obsolete / outdated',
    arabic: 'عفا عليه الزمن / مهجور',
    phonetic: 'obsoˈleto',
    cefr: 'B2',
    category: 'adjectives',
    partOfSpeech: 'adjective',
    frequencyRank: 167,
    examples: [
      { es: 'El antiguo sistema informático quedó obsoleto tras la actualización.', en: 'The old computer system became obsolete after the upgrade.', ar: 'أصبح النظام المعلوماتي القديم مهجوراً بعد التحديث.' }
    ]
  },
  {
    id: 'b2-40',
    spanish: 'sustancial',
    word: 'sustancial',
    english: 'substantial / considerable',
    translation_en: 'substantial / considerable',
    arabic: 'جوهري / كبير',
    phonetic: 'sustanˈsjal',
    cefr: 'B2',
    category: 'adjectives',
    partOfSpeech: 'adjective',
    frequencyRank: 168,
    examples: [
      { es: 'El proyecto logró un avance sustancial durante el último trimestre.', en: 'The project made substantial progress during the last quarter.', ar: 'حقق المشروع تحسناً جوهرياً خلال الربع الأخير.' }
    ]
  },
  {
    id: 'b2-41',
    spanish: 'factible',
    word: 'factible',
    english: 'feasible / workable',
    translation_en: 'feasible / workable',
    arabic: 'قابلة للتطبيق / عملي',
    phonetic: 'fakˈtiβle',
    cefr: 'B2',
    category: 'adjectives',
    partOfSpeech: 'adjective',
    frequencyRank: 169,
    examples: [
      { es: 'Los ingenieros confirmaron que la propuesta es técnicamente factible.', en: 'Engineers confirmed that the proposal is technically feasible.', ar: 'أكد المهندسون أن الاقتراح قابل للتطبيق فنياً.' }
    ]
  },
  {
    id: 'b2-42',
    spanish: 'prominente',
    word: 'prominente',
    english: 'prominent / notable',
    translation_en: 'prominent / notable',
    arabic: 'بارز / مرموق',
    phonetic: 'pɾomiˈnente',
    cefr: 'B2',
    category: 'adjectives',
    partOfSpeech: 'adjective',
    frequencyRank: 170,
    examples: [
      { es: 'Fue invitado por un prominente científico de la universidad nacional.', en: 'He was invited by a prominent scientist from the national university.', ar: 'تمت دعوته من قبل عالم بارز في الجامعة الوطنية.' }
    ]
  },
  {
    id: 'b2-43',
    spanish: 'resiliente',
    word: 'resiliente',
    english: 'resilient / adaptable',
    translation_en: 'resilient / adaptable',
    arabic: 'مرن / قادر على التعافي',
    phonetic: 'resiˈljente',
    cefr: 'B2',
    category: 'adjectives',
    partOfSpeech: 'adjective',
    frequencyRank: 171,
    examples: [
      { es: 'Demostraron ser una comunidad resiliente capaz de superar adversidades.', en: 'They proved to be a resilient community capable of overcoming adversity.', ar: 'أثبتوا أنهم مجتمع مرن قادر على تجاوز المحن.' }
    ]
  },
  {
    id: 'b2-44',
    spanish: 'profundo',
    word: 'profundo',
    english: 'profound / deep-seated',
    translation_en: 'profound / deep-seated',
    arabic: 'عميق / ذو أثر',
    phonetic: 'pɾoˈfundo',
    cefr: 'B2',
    category: 'adjectives',
    partOfSpeech: 'adjective',
    frequencyRank: 172,
    examples: [
      { es: 'La lectura del ensayo causó un impacto profundo en sus ideas políticas.', en: 'Reading the essay had a profound impact on his political views.', ar: 'كان لقراءة المقال أثر عميق في آرائه السياسية.' }
    ]
  },
  {
    id: 'b2-45',
    spanish: 'riguroso',
    word: 'riguroso',
    english: 'rigorous / exacting',
    translation_en: 'rigorous / exacting',
    arabic: 'صارم / دقيق للغاية',
    phonetic: 'riɣuˈɾoso',
    cefr: 'B2',
    category: 'adjectives',
    partOfSpeech: 'adjective',
    frequencyRank: 173,
    examples: [
      { es: 'Sometieron la teoría a un análisis científico sumamente riguroso.', en: 'They subjected the theory to a highly rigorous scientific analysis.', ar: 'أخضعوا النظرية لتحليل علمي صارم ودقيق.' }
    ]
  },
  {
    id: 'b2-46',
    spanish: 'tenaz',
    word: 'tenaz',
    english: 'tenacious / persistent',
    translation_en: 'tenacious / persistent',
    arabic: 'عنيد بالحق / مثابر',
    phonetic: 'teˈnas',
    cefr: 'B2',
    category: 'adjectives',
    partOfSpeech: 'adjective',
    frequencyRank: 174,
    examples: [
      { es: 'Su trabajo tenaz dio frutos tras años de investigación ininterrumpida.', en: 'Her tenacious work bore fruit after years of uninterrupted research.', ar: 'أثمر عملها المثابر بعد سنوات من البحث المتواصل.' }
    ]
  },
  {
    id: 'b2-47',
    spanish: 'exhaustivo',
    word: 'exhaustivo',
    english: 'exhaustive / thorough',
    translation_en: 'exhaustive / thorough',
    arabic: 'شامل / مستفيض',
    phonetic: 'ewsausˈtiβo',
    cefr: 'B2',
    category: 'adjectives',
    partOfSpeech: 'adjective',
    frequencyRank: 175,
    examples: [
      { es: 'Publicaron un informe exhaustivo sobre el estado de la biodiversidad.', en: 'They published an exhaustive report on the state of biodiversity.', ar: 'نشروا تقريراً مستفيضاً حول حالة التنوع البيولوجي.' }
    ]
  },
  {
    id: 'b2-48',
    spanish: 'sutil',
    word: 'sutil',
    english: 'subtle / delicate',
    translation_en: 'subtle / delicate',
    arabic: 'خفي / لطيف',
    phonetic: 'suˈtil',
    cefr: 'B2',
    category: 'adjectives',
    partOfSpeech: 'adjective',
    frequencyRank: 176,
    examples: [
      { es: 'Hay una diferencia sutil pero determinante entre ambos conceptos.', en: 'There is a subtle yet decisive difference between both concepts.', ar: 'هناك فرق خفي لكنه حاسم بين المفهومين.' }
    ]
  },
  {
    id: 'b2-49',
    spanish: 'fiable',
    word: 'fiable',
    english: 'reliable / dependable',
    translation_en: 'reliable / dependable',
    arabic: 'موثوق / يعتمد عليه',
    phonetic: 'ˈfjaβle',
    cefr: 'B2',
    category: 'adjectives',
    partOfSpeech: 'adjective',
    frequencyRank: 177,
    examples: [
      { es: 'Necesitamos fuentes de información fiables antes de emitir un veredicto.', en: 'We need reliable information sources before issuing a verdict.', ar: 'نحتاج مصادر معلومات موثوقة قبل إصدار حكم.' }
    ]
  },
  {
    id: 'b2-50',
    spanish: 'vanguardista',
    word: 'vanguardista',
    english: 'cutting-edge / avant-garde',
    translation_en: 'cutting-edge / avant-garde',
    arabic: 'طليعي / ممتد المستقبل',
    phonetic: 'baŋɡwaɾˈdista',
    cefr: 'B2',
    category: 'adjectives',
    partOfSpeech: 'adjective',
    frequencyRank: 178,
    examples: [
      { es: 'El diseño arquitectónico del nuevo edificio es verdaderamente vanguardista.', en: 'The architectural design of the new building is truly cutting-edge.', ar: 'التصميم المعماري للمبنى الجديد طليعي حقاً.' }
    ]
  },

  // ==========================================
  // 4. DISCOURSE MARKERS & CONNECTORS
  // ==========================================
  {
    id: 'b2-51',
    spanish: 'asimismo',
    word: 'asimismo',
    english: 'furthermore / likewise',
    translation_en: 'furthermore / likewise',
    arabic: 'علاوة على ذلك / كذلك',
    phonetic: 'asiˈmismo',
    cefr: 'B2',
    category: 'connectors',
    partOfSpeech: 'adverb',
    frequencyRank: 179,
    examples: [
      { es: 'Se aprobaron los presupuestos; asimismo, se acordó revisar las tasas.', en: 'The budgets were approved; furthermore, it was agreed to review rates.', ar: 'تمت المصادقة على الميزانيات؛ وعلاوة على ذلك، تم الاتفاق على مراجعة الرسوم.' }
    ]
  },
  {
    id: 'b2-52',
    spanish: 'no obstante',
    word: 'no obstante',
    english: 'nevertheless / however',
    translation_en: 'nevertheless / however',
    arabic: 'مع ذلك / على الرغم من ذلك',
    phonetic: 'no obsˈtante',
    cefr: 'B2',
    category: 'connectors',
    partOfSpeech: 'expression',
    frequencyRank: 180,
    examples: [
      { es: 'El desafío era monumental; no obstante, mantuvieron el optimismo.', en: 'The challenge was monumental; nevertheless, they kept their optimism.', ar: 'كان التحدي ضخماً؛ ومع ذلك، حافظوا على تفاؤلهم.' }
    ]
  },
  {
    id: 'b2-53',
    spanish: 'a pesar de',
    word: 'a pesar de',
    english: 'despite / in spite of',
    translation_en: 'despite / in spite of',
    arabic: 'بالرغم من',
    phonetic: 'a peˈsaɾ de',
    cefr: 'B2',
    category: 'connectors',
    partOfSpeech: 'preposition',
    frequencyRank: 181,
    examples: [
      { es: 'Lograron llegar a tiempo a la reunión a pesar de la lluvia densa.', en: 'They managed to arrive on time for the meeting despite the heavy rain.', ar: 'تمكنوا من الوصول في الوقت المحدد للاجتماع بالرغم من المطر الغزير.' }
    ]
  },
  {
    id: 'b2-54',
    spanish: 'en consecuencia',
    word: 'en consecuencia',
    english: 'consequently / therefore',
    translation_en: 'consequently / therefore',
    arabic: 'بناء على ذلك / بالتالي',
    phonetic: 'en konseˈkwensja',
    cefr: 'B2',
    category: 'connectors',
    partOfSpeech: 'expression',
    frequencyRank: 182,
    examples: [
      { es: 'Aumentaron los costes de materias primas; en consecuencia, subieron los precios.', en: 'Raw material costs rose; consequently, prices went up.', ar: 'ارتفعت تكاليف المواد الخام؛ وبناء على ذلك، ارتفعت الأسعار.' }
    ]
  },
  {
    id: 'b2-55',
    spanish: 'mientras que',
    word: 'mientras que',
    english: 'whereas / while',
    translation_en: 'mientras que',
    arabic: 'في حين أن / بينما',
    phonetic: 'ˈmjentɾas ke',
    cefr: 'B2',
    category: 'connectors',
    partOfSpeech: 'conjunction',
    frequencyRank: 183,
    examples: [
      { es: 'El sector turístico crece, mientras que la industria tradicional decae.', en: 'The tourism sector grows, whereas traditional industry declines.', ar: 'ينمو قطاع السياحة، في حين أن الصناعة التقليدية تتراجع.' }
    ]
  },
  {
    id: 'b2-56',
    spanish: 'por el contrario',
    word: 'por el contrario',
    english: 'on the contrary / conversely',
    translation_en: 'on the contrary / conversely',
    arabic: 'على العكس من ذلك',
    phonetic: 'poɾ el konˈtɾaɾjo',
    cefr: 'B2',
    category: 'connectors',
    partOfSpeech: 'expression',
    frequencyRank: 184,
    examples: [
      { es: 'No disminuyó el interés; por el contrario, las ventas se triplicaron.', en: 'Interest did not wane; on the contrary, sales tripled.', ar: 'لم يقل الاهتمام؛ بل على العكس من ذلك، تضاعفت المبيعات ثلاث مرات.' }
    ]
  },
  {
    id: 'b2-57',
    spanish: 'a la luz de',
    word: 'a la luz de',
    english: 'in light of / considering',
    translation_en: 'in light of / considering',
    arabic: 'في ضوء / على ضوء',
    phonetic: 'a la lus de',
    cefr: 'B2',
    category: 'connectors',
    partOfSpeech: 'expression',
    frequencyRank: 185,
    examples: [
      { es: 'Revisaremos la estrategia a la luz de los recientes acontecimientos.', en: 'We will review the strategy in light of recent events.', ar: 'سنراجع الاستراتيجية في ضوء التطورات الأخيرة.' }
    ]
  },
  {
    id: 'b2-58',
    spanish: 'en líneas generales',
    word: 'en líneas generales',
    english: 'overall / broadly speaking',
    translation_en: 'overall / broadly speaking',
    arabic: 'بشكل عام / بوجه عام',
    phonetic: 'en ˈlineas xeneˈɾales',
    cefr: 'B2',
    category: 'connectors',
    partOfSpeech: 'expression',
    frequencyRank: 186,
    examples: [
      { es: 'En líneas generales, la conferencia fue todo un éxito organizativo.', en: 'Overall, the conference was a complete organizational success.', ar: 'بشكل عام، كانت المؤتمر نجاحاً تنظيمياً كاملاً.' }
    ]
  },
  {
    id: 'b2-59',
    spanish: 'de conformidad con',
    word: 'de conformidad con',
    english: 'in accordance with / complying with',
    translation_en: 'in accordance with / complying with',
    arabic: 'وفقاً لـ / بموجب',
    phonetic: 'de komfoɾmiˈðað kon',
    cefr: 'B2',
    category: 'connectors',
    partOfSpeech: 'expression',
    frequencyRank: 187,
    examples: [
      { es: 'El procedimiento se ejecutó de conformidad con la normativa europea.', en: 'The procedure was executed in accordance with European regulations.', ar: 'تم تنفيذ الإجراء وفقاً للوائح الأوروبية.' }
    ]
  },
  {
    id: 'b2-60',
    spanish: 'en última instancia',
    word: 'en última instancia',
    english: 'ultimately / in the final analysis',
    translation_en: 'ultimately / in the final analysis',
    arabic: 'في نهاية المطاف / أخيرًا',
    phonetic: 'en ˈultima insˈtansja',
    cefr: 'B2',
    category: 'connectors',
    partOfSpeech: 'expression',
    frequencyRank: 188,
    examples: [
      { es: 'En última instancia, la responsabilidad recae sobre la junta directiva.', en: 'Ultimately, the responsibility rests with the board of directors.', ar: 'في نهاية المطاف، تقع المسؤولية على عاتق مجلس الإدارة.' }
    ]
  },

  // ==========================================
  // 5. IDIOMS, COLLOQUIALISMS & FIXED PHRASES
  // ==========================================
  {
    id: 'b2-61',
    spanish: 'un arma de doble filo',
    word: 'un arma de doble filo',
    english: 'a double-edged sword',
    translation_en: 'a double-edged sword',
    arabic: 'سلاح ذو حدين',
    phonetic: 'un ˈaɾma de ˈdoβle ˈfilo',
    cefr: 'B2',
    category: 'idioms',
    partOfSpeech: 'expression',
    frequencyRank: 189,
    examples: [
      { es: 'La inteligencia artificial puede ser un arma de doble filo si no se regula.', en: 'Artificial intelligence can be a double-edged sword if unregulated.', ar: 'يمكن للذكاء الاصطناعي أن يكون سلاحاً ذو حدين إذا لم يُنظم.' }
    ]
  },
  {
    id: 'b2-62',
    spanish: 'al fin y al cabo',
    word: 'al fin y al cabo',
    english: 'at the end of the day / after all',
    translation_en: 'at the end of the day / after all',
    arabic: 'في نهاية المطاف / على أي حال',
    phonetic: 'al fin i al ˈkaβo',
    cefr: 'B2',
    category: 'idioms',
    partOfSpeech: 'expression',
    frequencyRank: 190,
    examples: [
      { es: 'Debes tomar la decisión tú mismo; al fin y al cabo, es tu futuro.', en: 'You must make the decision yourself; after all, it is your future.', ar: 'يجب أن تتخذ القرار بنفسك؛ ففي نهاية المطاف هذا مستقبلك.' }
    ]
  },
  {
    id: 'b2-63',
    spanish: 'dar en el clavo',
    word: 'dar en el clavo',
    english: 'to hit the nail on the head',
    translation_en: 'to hit the nail on the head',
    arabic: 'يصيب كبد الحقيقة / يحدد الدقة',
    phonetic: 'daɾ en el ˈklaβo',
    cefr: 'B2',
    category: 'idioms',
    partOfSpeech: 'expression',
    frequencyRank: 191,
    examples: [
      { es: 'Su diagnóstico sobre el problema técnico dio exactamente en el clavo.', en: 'Her diagnosis of the technical issue hit the nail on the head.', ar: 'أصاب تشخيصها للمشكلة الفنية كبد الحقيقة تماماً.' }
    ]
  },
  {
    id: 'b2-64',
    spanish: 'leer entre líneas',
    word: 'leer entre líneas',
    english: 'to read between the lines',
    translation_en: 'to read between the lines',
    arabic: 'يقرأ ما بين السطور',
    phonetic: 'leˈeɾ ˈentɾe ˈlineas',
    cefr: 'B2',
    category: 'idioms',
    partOfSpeech: 'expression',
    frequencyRank: 192,
    examples: [
      { es: 'Para entender la diplomacia internacional, hay que aprender a leer entre líneas.', en: 'To understand international diplomacy, one must learn to read between the lines.', ar: 'لفهم الدبلوماسية الدولية، يجب أن تتعلم قراءة ما بين السطور.' }
    ]
  },
  {
    id: 'b2-65',
    spanish: 'quemarse las pestañas',
    word: 'quemarse las pestañas',
    english: 'to burn the midnight oil / study hard',
    translation_en: 'to burn the midnight oil / study hard',
    arabic: 'يسهر الليالي للدراسة / يجهد نفسه',
    phonetic: 'keˈmaɾse las pesˈtaɲas',
    cefr: 'B2',
    category: 'idioms',
    partOfSpeech: 'expression',
    frequencyRank: 193,
    examples: [
      { es: 'Se quemó las pestañas estudiando antes de los exámenes finales.', en: 'She burned the midnight oil studying before final exams.', ar: 'سهرت الليالي تدرس قبل الامتحانات النهائية.' }
    ]
  },
  {
    id: 'b2-66',
    spanish: 'tomar con reservas',
    word: 'tomar con reservas',
    english: 'to take with a grain of salt',
    translation_en: 'to take with a grain of salt',
    arabic: 'يأخذ بحذر / يتحفظ على',
    phonetic: 'toˈmaɾ kon reˈseɾβas',
    cefr: 'B2',
    category: 'idioms',
    partOfSpeech: 'expression',
    frequencyRank: 194,
    examples: [
      { es: 'Es aconsejable tomar los rumores no confirmados con ciertas reservas.', en: 'It is advisable to take unconfirmed rumors with a grain of salt.', ar: 'من المستحسن أخذ الشائعات غير المؤكدة بحذر وتحفظ.' }
    ]
  },
  {
    id: 'b2-67',
    spanish: 'a largo plazo',
    word: 'a largo plazo',
    english: 'in the long run / long-term',
    translation_en: 'in the long run / long-term',
    arabic: 'على المدى البعيد',
    phonetic: 'a ˈlaɾɣo ˈplaso',
    cefr: 'B2',
    category: 'idioms',
    partOfSpeech: 'expression',
    frequencyRank: 195,
    examples: [
      { es: 'Invertir en educación de calidad genera enormes beneficios a largo plazo.', en: 'Investing in quality education yields immense benefits in the long run.', ar: 'الاستثمار في التعليم العالي يقدم فوائد هائلة على المدى البعيد.' }
    ]
  },
  {
    id: 'b2-68',
    spanish: 'en pocas palabras',
    word: 'en pocas palabras',
    english: 'in a nutshell / in short',
    translation_en: 'in a nutshell / in short',
    arabic: 'باختصار شديد / في كلمات معدودة',
    phonetic: 'en ˈpokas paˈlaβɾas',
    cefr: 'B2',
    category: 'idioms',
    partOfSpeech: 'expression',
    frequencyRank: 196,
    examples: [
      { es: 'En pocas palabras, el proyecto requiere más presupuesto y personal.', en: 'In a nutshell, the project requires more budget and staff.', ar: 'باختصار شديد، يتطلب المشروع مزيداً من الميزانية والموظفين.' }
    ]
  },
  {
    id: 'b2-69',
    spanish: 'no hay mal que por bien no venga',
    word: 'no hay mal que por bien no venga',
    english: 'every cloud has a silver lining',
    translation_en: 'every cloud has a silver lining',
    arabic: 'عسى أن تكرهوا شيئاً وهو خير لكم',
    phonetic: 'no aj mal ke poɾ bjen no ˈbeŋɡa',
    cefr: 'B2',
    category: 'idioms',
    partOfSpeech: 'expression',
    frequencyRank: 197,
    examples: [
      { es: 'Aunque perdió aquel empleo, encontró una oportunidad mejor: no hay mal que por bien no venga.', en: 'Although he lost that job, he found a better opportunity: every cloud has a silver lining.', ar: 'رغم أنه فقد تلك الوظيفة، وجد فرصة أفضل: عسى أن تكرهوا شيئاً وهو خير لكم.' }
    ]
  },
  {
    id: 'b2-70',
    spanish: 'hacer la vista gorda',
    word: 'hacer la vista gorda',
    english: 'to turn a blind eye',
    translation_en: 'to turn a blind eye',
    arabic: 'يغض الطرف / يتغاضى',
    phonetic: 'aˈseɾ la ˈbista ˈɣoɾða',
    cefr: 'B2',
    category: 'idioms',
    partOfSpeech: 'expression',
    frequencyRank: 198,
    examples: [
      { es: 'Las autoridades advirtieron que no harán la vista gorda ante la evasión fiscal.', en: 'Authorities warned that they will not turn a blind eye to tax evasion.', ar: 'حذرت السلطات من أنها لن تغض الطرف عن التهرب الضريبي.' }
    ]
  },

  // ==========================================
  // 6. PROFESSIONAL, SOCIETY & ENVIRONMENT
  // ==========================================
  {
    id: 'b2-71',
    spanish: 'entorno laboral',
    word: 'entorno laboral',
    english: 'workplace environment',
    translation_en: 'workplace environment',
    arabic: 'بيئة العمل',
    gender: 'el',
    phonetic: 'enˈtoɾno laβoˈɾal',
    cefr: 'B2',
    category: 'work',
    partOfSpeech: 'noun',
    frequencyRank: 199,
    examples: [
      { es: 'Fomentar un entorno laboral inclusivo aumenta la productividad del equipo.', en: 'Fostering an inclusive workplace environment boosts team productivity.', ar: 'يعزز تشجيع بيئة عمل شاملة إنتاجية الفريق.' }
    ]
  },
  {
    id: 'b2-72',
    spanish: 'desarrollo urbano',
    word: 'desarrollo urbano',
    english: 'urban development',
    translation_en: 'urban development',
    arabic: 'التنمية الحضرية',
    gender: 'el',
    phonetic: 'desaˈroʎo uɾˈβano',
    cefr: 'B2',
    category: 'society',
    partOfSpeech: 'noun',
    frequencyRank: 200,
    examples: [
      { es: 'El desarrollo urbano inteligente integra transporte ecológico y zonas verdes.', en: 'Smart urban development integrates eco-friendly transport and green spaces.', ar: 'تدمج التنمية الحضرية الذكية وسائل النقل البيئية والمساحات الخضراء.' }
    ]
  },
  {
    id: 'b2-73',
    spanish: 'huella de carbono',
    word: 'huella de carbono',
    english: 'carbon footprint',
    translation_en: 'carbon footprint',
    arabic: 'البصمة الكربونية',
    gender: 'la',
    phonetic: 'ˈweʎa de kaɾˈβono',
    cefr: 'B2',
    category: 'environment',
    partOfSpeech: 'noun',
    frequencyRank: 201,
    examples: [
      { es: 'Muchas empresas buscan reducir su huella de carbono antes del año 2030.', en: 'Many companies seek to reduce their carbon footprint before 2030.', ar: 'تسعى شركات عديدة لتقليل بصمتها الكربونية قبل عام 2030.' }
    ]
  },
  {
    id: 'b2-74',
    spanish: 'marco jurídico',
    word: 'marco jurídico',
    english: 'legal framework',
    translation_en: 'legal framework',
    arabic: 'الإطار القانوني',
    gender: 'el',
    phonetic: 'ˈmaɾko xuˈɾjðiko',
    cefr: 'B2',
    category: 'society',
    partOfSpeech: 'noun',
    frequencyRank: 202,
    examples: [
      { es: 'El nuevo marco jurídico garantiza la protección de los datos personales.', en: 'The new legal framework guarantees the protection of personal data.', ar: 'يضمن الإطار القانوني الجديد حماية البيانات الشخصية.' }
    ]
  },
  {
    id: 'b2-75',
    spanish: 'transformación digital',
    word: 'transformación digital',
    english: 'digital transformation',
    translation_en: 'digital transformation',
    arabic: 'التحول الرقمي',
    gender: 'la',
    phonetic: 'tɾansfoɾmaˈsjon dixiˈtal',
    cefr: 'B2',
    category: 'technology',
    partOfSpeech: 'noun',
    frequencyRank: 203,
    examples: [
      { es: 'La transformación digital ha redefinido el comercio minorista tradicional.', en: 'Digital transformation has redefined traditional retail trade.', ar: 'أعاد التحول الرقمي تعريف تجارة التجزئة التقليدية.' }
    ]
  },
  {
    id: 'b2-76',
    spanish: 'equidad social',
    word: 'equidad social',
    english: 'social equity / fairness',
    translation_en: 'social equity / fairness',
    arabic: 'العدالة الاجتماعية',
    gender: 'la',
    phonetic: 'ekiˈðað soˈsjal',
    cefr: 'B2',
    category: 'society',
    partOfSpeech: 'noun',
    frequencyRank: 204,
    examples: [
      { es: 'Promover la equidad social es pilar fundamental para la paz ciudadana.', en: 'Promoting social equity is a fundamental pillar for civic peace.', ar: 'تعزيز العدالة الاجتماعية ركيزة أساسية للسلم المجتمعي.' }
    ]
  },
  {
    id: 'b2-77',
    spanish: 'libertad de prensa',
    word: 'libertad de prensa',
    english: 'freedom of the press',
    translation_en: 'freedom of the press',
    arabic: 'حرية الصحافة',
    gender: 'la',
    phonetic: 'liβeɾˈtað de ˈpɾensa',
    cefr: 'B2',
    category: 'society',
    partOfSpeech: 'noun',
    frequencyRank: 205,
    examples: [
      { es: 'La libertad de prensa es vital para el escrutinio democrático.', en: 'Freedom of the press is vital for democratic scrutiny.', ar: 'حرية الصحافة أمر حيوي للرقابة الديمقراطية.' }
    ]
  },
  {
    id: 'b2-78',
    spanish: 'investigación científica',
    word: 'investigación científica',
    english: 'scientific research',
    translation_en: 'scientific research',
    arabic: 'البحث العلمي',
    gender: 'la',
    phonetic: 'imbestiɣaˈsjon sjenˈtifika',
    cefr: 'B2',
    category: 'academic',
    partOfSpeech: 'noun',
    frequencyRank: 206,
    examples: [
      { es: 'La investigación científica descubrió nuevos tratamientos farmacológicos.', en: 'Scientific research discovered new pharmacological treatments.', ar: 'اكتشف البحث العلمي علاجات دوائية جديدة.' }
    ]
  },
  {
    id: 'b2-79',
    spanish: 'política pública',
    word: 'política pública',
    english: 'public policy',
    translation_en: 'public policy',
    arabic: 'السياسة العامة',
    gender: 'la',
    phonetic: 'poˈlitika ˈpuβlika',
    cefr: 'B2',
    category: 'society',
    partOfSpeech: 'noun',
    frequencyRank: 207,
    examples: [
      { es: 'Diseñaron una política pública orientada al acceso universal a la salud.', en: 'They designed a public policy aimed at universal healthcare access.', ar: 'صمموا سياسة عامة تهدف إلى الوصول الشامل إلى الرعاية الصحية.' }
    ]
  },
  {
    id: 'b2-80',
    spanish: 'gobernanza transparente',
    word: 'gobernanza transparente',
    english: 'transparent governance',
    translation_en: 'transparent governance',
    arabic: 'الحوكمة الشفافة',
    gender: 'la',
    phonetic: 'ɣoβeɾˈnansa tɾanspaˈɾente',
    cefr: 'B2',
    category: 'society',
    partOfSpeech: 'noun',
    frequencyRank: 208,
    examples: [
      { es: 'La gobernanza transparente combate la corrupción y fortalece las instituciones.', en: 'Transparent governance combats corruption and strengthens institutions.', ar: 'تكافح الحوكمة الشفافة الفساد وتقوي المؤسسات.' }
    ]
  }
];
