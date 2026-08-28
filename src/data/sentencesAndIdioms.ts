import { SentencePattern, Idiom } from '../types';

export const SENTENCE_PATTERNS: SentencePattern[] = [
  {
    id: 'sp-1',
    spanish: 'Tengo que estudiar mucho para el examen de mañana.',
    english: 'I have to study a lot for tomorrow’s exam.',
    arabic: 'يجب أن أدرس كثيراً لامتحان الغد.',
    cefr: 'A1',
    pattern: 'Tener que + Infinitivo',
    patternBreakdown: 'Tener (conjugado) + que + verbo en infinitivo (Obligación personal)',
    tags: ['obligation', 'daily_routine', 'study']
  },
  {
    id: 'sp-2',
    spanish: 'Voy a viajar a Madrid el próximo mes con mi familia.',
    english: 'I am going to travel to Madrid next month with my family.',
    arabic: 'سوف أسافر إلى مدريد الشهر القادم مع عائلتي.',
    cefr: 'A1',
    pattern: 'Ir a + Infinitivo (Futuro Próximo)',
    patternBreakdown: 'Ir (presente) + a + infinitivo (Acción planeada)',
    tags: ['future', 'travel', 'plans']
  },
  {
    id: 'sp-3',
    spanish: 'Me gusta mucho escuchar música mientras cocino.',
    english: 'I really like listening to music while I cook.',
    arabic: 'يعجبني كثيراً الاستماع إلى الموسيقى بينما أطبخ.',
    cefr: 'A1',
    pattern: 'Gusta / Gustan + Infinitivo o Sustantivo',
    patternBreakdown: 'Me/Te/Le/Nos/Os/Les + gusta + infinitivo',
    tags: ['preferences', 'hobbies', 'daily_life']
  },
  {
    id: 'sp-4',
    spanish: 'Acabo de terminar mi tarea de español.',
    english: 'I have just finished my Spanish homework.',
    arabic: 'لقد انتهيت للتو من واجبي المنزلي للإسبانية.',
    cefr: 'A2',
    pattern: 'Acabar de + Infinitivo',
    patternBreakdown: 'Acabar (presente) + de + infinitivo (Acción recién completada)',
    tags: ['recent_past', 'study', 'time']
  },
  {
    id: 'sp-5',
    spanish: 'Quiero que vengas a mi fiesta de graduación.',
    english: 'I want you to come to my graduation party.',
    arabic: 'أريدك أن تأتي إلى حفلة تخرجي.',
    cefr: 'B1',
    pattern: 'Verbo de deseo + que + Subjuntivo',
    patternBreakdown: 'Querer (Sujeto 1) + que + Verbo en subjuntivo (Sujeto 2)',
    tags: ['subjunctive', 'wishes', 'social']
  },
  {
    id: 'sp-6',
    spanish: 'Si tuviera más tiempo libre, aprendería otro idioma.',
    english: 'If I had more free time, I would learn another language.',
    arabic: 'لو كان لدي المزيد من وقت الفراغ، لتعلمت لغة أخرى.',
    cefr: 'B1',
    pattern: 'Si + Imperfecto de Subjuntivo + Condicional Simple',
    patternBreakdown: 'Condicional hipotético irreal en el presente',
    tags: ['hypothetical', 'conditional', 'advanced_grammar']
  },
  {
    id: 'sp-7',
    spanish: 'A pesar de que llovía intensamente, decidieron salir.',
    english: 'Even though it was raining heavily, they decided to go out.',
    arabic: 'على الرغم من هطول المطر بغزارة، قرروا الخروج.',
    cefr: 'B2',
    pattern: 'A pesar de que + Indicativo / Subjuntivo',
    patternBreakdown: 'Conector concesivo para contrastar hechos y dificultades',
    tags: ['connectors', 'discourse', 'advanced_writing']
  }
];

export const IDIOMS_AND_EXPRESSIONS: Idiom[] = [
  {
    id: 'id-1',
    spanish: 'Estar en las nubes',
    literal_en: 'To be in the clouds',
    meaning_en: 'To be daydreaming / distracted / not paying attention',
    meaning_ar: 'أن يكون الشخص شارد الذهن / سارحاً بأفكاره في عالم آخر',
    cefr: 'A2',
    formality: 'informal',
    region: 'General',
    example_es: 'Carlos no escuchó la pregunta del profesor porque estaba en las nubes.',
    example_en: 'Carlos didn’t hear the teacher’s question because he was daydreaming.',
    example_ar: 'لم يسمع كارلوس سؤال المعلم لأنه كان شارد الذهن.'
  },
  {
    id: 'id-2',
    spanish: 'Costar un ojo de la cara',
    literal_en: 'To cost an eye from the face',
    meaning_en: 'To be extremely expensive (cost an arm and a leg)',
    meaning_ar: 'أن يكون الشيء باهظ الثمن للغاية / يكلف ثمناً فاحشاً',
    cefr: 'A2',
    formality: 'informal',
    region: 'General',
    example_es: 'Ese coche deportivo nuevo cuesta un ojo de la cara.',
    example_en: 'That new sports car costs an arm and a leg.',
    example_ar: 'تلك السيارة الرياضية الجديدة تكلف ثمناً باهظاً جداً.'
  },
  {
    id: 'id-3',
    spanish: 'Tomar el pelo a alguien',
    literal_en: 'To take someone’s hair',
    meaning_en: 'To pull someone’s leg / tease / joke around',
    meaning_ar: 'أن يمازح شخصاً / يسخر منه بلطف / "يمشيها عليه"',
    cefr: 'A2',
    formality: 'informal',
    region: 'Spain',
    example_es: '—¿Ganaste la lotería? —No, solo te estoy tomando el pelo.',
    example_en: '—Did you win the lottery? —No, I’m just pulling your leg.',
    example_ar: '—هل فزت باليانصيب؟ —لا، أنا فقط أمازحك!'
  },
  {
    id: 'id-4',
    spanish: 'Ser pan comido',
    literal_en: 'To be eaten bread',
    meaning_en: 'To be a piece of cake / very easy',
    meaning_ar: 'أن يكون الأمر سهلاً جداً / كشربة ماء',
    cefr: 'A1',
    formality: 'informal',
    region: 'General',
    example_es: 'No te preocupes por el examen de mañana, es pan comido.',
    example_en: 'Don’t worry about tomorrow’s exam, it’s a piece of cake.',
    example_ar: 'لا تقلق بشأن امتحان الغد، فهو في غاية السهولة.'
  },
  {
    id: 'id-5',
    spanish: 'Ponerse las pilas',
    literal_en: 'To put in one’s batteries',
    meaning_en: 'To get one’s act together / work hard / energize oneself',
    meaning_ar: 'أن يشحذ همته / ينشط نفسه ويبذل قصارى جهده',
    cefr: 'B1',
    formality: 'informal',
    region: 'Latin America',
    example_es: 'Si quieres aprobar el nivel B2, tienes que ponerte las pilas.',
    example_en: 'If you want to pass level B2, you have to get your act together.',
    example_ar: 'إذا أردت اجتياز مستوى B2، فعليك أن تشحذ همتك وتعمل بجد.'
  },
  {
    id: 'id-6',
    spanish: 'No tener pelos en la lengua',
    literal_en: 'To not have hairs on the tongue',
    meaning_en: 'To be completely frank and outspoken / speak one’s mind bluntly',
    meaning_ar: 'أن يكون صريحاً جداً ولا يخجل من قول الحق بصراحة مطلقة',
    cefr: 'B1',
    formality: 'neutral',
    region: 'General',
    example_es: 'Sofía siempre dice lo que piensa; no tiene pelos en la lengua.',
    example_en: 'Sofia always speaks her mind; she doesn’t mince her words.',
    example_ar: 'صوفيا دائماً تقول ما في بالها بصراحة تامة ودون تردد.'
  },
  {
    id: 'id-7',
    spanish: 'Hablar por los codos',
    literal_en: 'To talk through one’s elbows',
    meaning_en: 'To talk excessively / chatter non-stop',
    meaning_ar: 'أن يكون كثير الثرثرة والحديث دون توقف',
    cefr: 'B1',
    formality: 'informal',
    region: 'Spain',
    example_es: 'Mi tío habla por los codos cuando viene de visita.',
    example_en: 'My uncle talks non-stop when he comes to visit.',
    example_ar: 'عمي يثرثر كثيراً دون توقف عندما يأتي لزيارتنا.'
  }
];
