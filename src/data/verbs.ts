import { Verb } from '../types';

export const SPANISH_VERBS: Verb[] = [
  {
    id: 'v-ser',
    infinitive: 'ser',
    english: 'to be (identity, origin, permanent traits)',
    arabic: 'يكون (للهوية، الأصل، والصفات الجوهرية)',
    gerund: 'siendo',
    participle: 'sido',
    cefr: 'A1',
    regularType: 'irregular',
    isReflexive: false,
    frequencyRank: 1,
    conjugations: {
      present: { yo: 'soy', tu: 'eres', el_ella_usted: 'es', nosotros: 'somos', vosotros: 'sois', ellos_ellas_ustedes: 'son' },
      preterite: { yo: 'fui', tu: 'fuiste', el_ella_usted: 'fue', nosotros: 'fuimos', vosotros: 'fuisteis', ellos_ellas_ustedes: 'fueron' },
      imperfect: { yo: 'era', tu: 'eras', el_ella_usted: 'era', nosotros: 'éramos', vosotros: 'erais', ellos_ellas_ustedes: 'eran' },
      future: { yo: 'seré', tu: 'serás', el_ella_usted: 'será', nosotros: 'seremos', vosotros: 'seréis', ellos_ellas_ustedes: 'serán' },
      conditional: { yo: 'sería', tu: 'serías', el_ella_usted: 'sería', nosotros: 'seríamos', vosotros: 'seríais', ellos_ellas_ustedes: 'serían' },
      presentSubjunctive: { yo: 'sea', tu: 'seas', el_ella_usted: 'sea', nosotros: 'seamos', vosotros: 'seáis', ellos_ellas_ustedes: 'sean' },
      imperfectSubjunctive: { yo: 'fuera', tu: 'fueras', el_ella_usted: 'fuera', nosotros: 'fuéramos', vosotros: 'fuerais', ellos_ellas_ustedes: 'fueran' },
      imperativeAffirmative: { tu: 'sé', usted: 'sea', nosotros: 'seamos', vosotros: 'sed', ustedes: 'sean' }
    },
    commonPrepositions: ['de', 'para'],
    examples: [
      { es: 'Soy profesor de español.', en: 'I am a Spanish teacher.', ar: 'أنا أستاذ لغة إسبانية.', tense: 'present' },
      { es: 'Ayer fue un día inolvidable.', en: 'Yesterday was an unforgettable day.', ar: 'أمس كان يوماً لا يُنسى.', tense: 'preterite' },
      { es: 'Cuando era niño, vivía en Valencia.', en: 'When I was a child, I lived in Valencia.', ar: 'عندما كنت طفلاً، كنت أعيش في فالنسيا.', tense: 'imperfect' }
    ],
    commonMistakes: 'Never use ser for location (Say "Estoy en Madrid", NOT "Soy en Madrid").',
    commonMistakes_ar: 'لا تستخدم ser أبداً للموقع الجغرافي (قل Estoy en Madrid وليس Soy en Madrid).',
    collocations: ['ser de + país (أصله من)', 'ser capaz de (قادر على)', 'ser necesario (من الضروري)']
  },
  {
    id: 'v-estar',
    infinitive: 'estar',
    english: 'to be (location, temporary states, conditions)',
    arabic: 'يكون (للموقع الجغرافي، الحالات المؤقتة والمزاجية)',
    gerund: 'estando',
    participle: 'estado',
    cefr: 'A1',
    regularType: 'irregular',
    isReflexive: false,
    frequencyRank: 2,
    conjugations: {
      present: { yo: 'estoy', tu: 'estás', el_ella_usted: 'está', nosotros: 'estamos', vosotros: 'estáis', ellos_ellas_ustedes: 'están' },
      preterite: { yo: 'estuve', tu: 'estuviste', el_ella_usted: 'estuvo', nosotros: 'estuvimos', vosotros: 'estuvisteis', ellos_ellas_ustedes: 'estuvieron' },
      imperfect: { yo: 'estaba', tu: 'estabas', el_ella_usted: 'estaba', nosotros: 'estábamos', vosotros: 'estabais', ellos_ellas_ustedes: 'estaban' },
      future: { yo: 'estaré', tu: 'estarás', el_ella_usted: 'estará', nosotros: 'estaremos', vosotros: 'estaréis', ellos_ellas_ustedes: 'estarán' },
      conditional: { yo: 'estaría', tu: 'estarías', el_ella_usted: 'estaría', nosotros: 'estaríamos', vosotros: 'estaríais', ellos_ellas_ustedes: 'estarían' },
      presentSubjunctive: { yo: 'esté', tu: 'estés', el_ella_usted: 'esté', nosotros: 'estemos', vosotros: 'estéis', ellos_ellas_ustedes: 'estén' },
      imperfectSubjunctive: { yo: 'estuviera', tu: 'estuvieras', el_ella_usted: 'estuviera', nosotros: 'estuviéramos', vosotros: 'estuvierais', ellos_ellas_ustedes: 'estuvieran' },
      imperativeAffirmative: { tu: 'está', usted: 'esté', nosotros: 'estemos', vosotros: 'estad', ustedes: 'estén' }
    },
    commonPrepositions: ['en', 'con', 'de'],
    examples: [
      { es: 'El museo está en el centro de la ciudad.', en: 'The museum is in the city center.', ar: 'المتحف يقع في وسط المدينة.', tense: 'present' },
      { es: 'Estuve enfermo todo el fin de semana.', en: 'I was sick all weekend.', ar: 'كنت مريضاً طوال عطلة نهاية الأسبوع.', tense: 'preterite' },
      { es: 'Estoy estudiando gramática ahora mismo.', en: 'I am studying grammar right now.', ar: 'أنا أدرس القواعد في هذه اللحظة بالذات.', tense: 'present progressive' }
    ],
    commonMistakes: 'Remember that estar + gerund forms the continuous present (estoy comiendo).',
    commonMistakes_ar: 'تذكر أن estar + gerund تشكل المضارع المستمر (estoy comiendo).',
    collocations: ['estar de acuerdo (متفق مع)', 'estar seguro (متأكد)', 'estar listo (جاهز)']
  },
  {
    id: 'v-tener',
    infinitive: 'tener',
    english: 'to have / possess / feelings & age',
    arabic: 'يملك / لديه (يستخدم أيضاً للعمر والشعور بالجوع والعطش)',
    gerund: 'teniendo',
    participle: 'tenido',
    cefr: 'A1',
    regularType: 'irregular',
    isReflexive: false,
    frequencyRank: 3,
    conjugations: {
      present: { yo: 'tengo', tu: 'tienes', el_ella_usted: 'tiene', nosotros: 'tenemos', vosotros: 'tenéis', ellos_ellas_ustedes: 'tienen' },
      preterite: { yo: 'tuve', tu: 'tuviste', el_ella_usted: 'tuvo', nosotros: 'tuvimos', vosotros: 'tuvisteis', ellos_ellas_ustedes: 'tuvieron' },
      imperfect: { yo: 'tenía', tu: 'tenías', el_ella_usted: 'tenía', nosotros: 'teníamos', vosotros: 'teníais', ellos_ellas_ustedes: 'tenían' },
      future: { yo: 'tendré', tu: 'tendrás', el_ella_usted: 'tendrá', nosotros: 'tendremos', vosotros: 'tendréis', ellos_ellas_ustedes: 'tendrán' },
      conditional: { yo: 'tendría', tu: 'tendrías', el_ella_usted: 'tendría', nosotros: 'tendríamos', vosotros: 'tendríais', ellos_ellas_ustedes: 'tendrían' },
      presentSubjunctive: { yo: 'tenga', tu: 'tengas', el_ella_usted: 'tenga', nosotros: 'tengamos', vosotros: 'tengáis', ellos_ellas_ustedes: 'tengan' },
      imperfectSubjunctive: { yo: 'tuviera', tu: 'tuvieras', el_ella_usted: 'tuviera', nosotros: 'tuviéramos', vosotros: 'tuvierais', ellos_ellas_ustedes: 'tuvieran' },
      imperativeAffirmative: { tu: 'ten', usted: 'tenga', nosotros: 'tengamos', vosotros: 'tened', ustedes: 'tengan' }
    },
    commonPrepositions: ['que (tener que + inf)'],
    examples: [
      { es: 'Tengo veintiocho años y dos hermanos.', en: 'I am 28 years old and have two brothers.', ar: 'عمري 28 عاماً ولدي أخوان.', tense: 'present' },
      { es: 'Ayer tuve una idea excelente.', en: 'Yesterday I had an excellent idea.', ar: 'أمس راودتني فكرة ممتازة.', tense: 'preterite' },
      { es: 'Si tuviera más tiempo, viajaría más.', en: 'If I had more time, I would travel more.', ar: 'لو كان لدي المزيد من الوقت، لسافرت أكثر.', tense: 'imperfect subjunctive' }
    ],
    commonMistakes: 'In Spanish you "have" age, hunger, cold, and fear (Tengo frío, NOT Soy frío).',
    commonMistakes_ar: 'في الإسبانية نستخدم tener للعمر، الجوع، البرد، والخوف (Tengo frío وليس Soy frío).',
    collocations: ['tener que + inf (يجب أن)', 'tener ganas de (يرغب في)', 'tener razón (على حق)']
  },
  {
    id: 'v-haber',
    infinitive: 'haber',
    english: 'to have (auxiliary) / there is/are (hay)',
    arabic: 'يوجد (hay) / فعل مساعد للأزمنة التامة',
    gerund: 'habiendo',
    participle: 'habido',
    cefr: 'A1',
    regularType: 'irregular',
    isReflexive: false,
    frequencyRank: 4,
    conjugations: {
      present: { yo: 'he', tu: 'has', el_ella_usted: 'ha / hay', nosotros: 'hemos', vosotros: 'habéis', ellos_ellas_ustedes: 'han' },
      preterite: { yo: 'hube', tu: 'hubiste', el_ella_usted: 'hubo', nosotros: 'hubimos', vosotros: 'hubisteis', ellos_ellas_ustedes: 'hubieron' },
      imperfect: { yo: 'había', tu: 'habías', el_ella_usted: 'había', nosotros: 'habíamos', vosotros: 'habíais', ellos_ellas_ustedes: 'habían' },
      future: { yo: 'habré', tu: 'habrás', el_ella_usted: 'habrá', nosotros: 'habremos', vosotros: 'habréis', ellos_ellas_ustedes: 'habrán' },
      conditional: { yo: 'habría', tu: 'habrías', el_ella_usted: 'habría', nosotros: 'habríamos', vosotros: 'habríais', ellos_ellas_ustedes: 'habrían' },
      presentSubjunctive: { yo: 'haya', tu: 'hayas', el_ella_usted: 'haya', nosotros: 'hayamos', vosotros: 'hayáis', ellos_ellas_ustedes: 'hayan' },
      imperfectSubjunctive: { yo: 'hubiera', tu: 'hubieras', el_ella_usted: 'hubiera', nosotros: 'hubiéramos', vosotros: 'hubierais', ellos_ellas_ustedes: 'hubieran' },
      imperativeAffirmative: { tu: 'he', usted: 'haya', nosotros: 'hayamos', vosotros: 'habed', ustedes: 'hayan' }
    },
    examples: [
      { es: 'Hay muchas cosas interesantes que ver aquí.', en: 'There are many interesting things to see here.', ar: 'هناك العديد من الأشياء الممتعة لرؤيتها هنا.', tense: 'present (hay)' },
      { es: 'He aprendido mucho esta semana.', en: 'I have learned a lot this week.', ar: 'لقد تعلمت الكثير هذا الأسبوع.', tense: 'perfect' }
    ],
    commonMistakes: 'For existence, "hay" is invariant in present tense (Hay un libro / Hay tres libros).',
    commonMistakes_ar: 'للوجود، hay تظل ثابتة في المفرد والجمع (Hay un libro / Hay tres libros).',
    collocations: ['hay que + inf (يجب أن للعموم)', 'haber de (ينبغي)']
  },
  {
    id: 'v-ir',
    infinitive: 'ir',
    english: 'to go',
    arabic: 'يذهب',
    gerund: 'yendo',
    participle: 'ido',
    cefr: 'A1',
    regularType: 'irregular',
    isReflexive: false,
    frequencyRank: 5,
    conjugations: {
      present: { yo: 'voy', tu: 'vas', el_ella_usted: 'va', nosotros: 'vamos', vosotros: 'vais', ellos_ellas_ustedes: 'van' },
      preterite: { yo: 'fui', tu: 'fuiste', el_ella_usted: 'fue', nosotros: 'fuimos', vosotros: 'fuisteis', ellos_ellas_ustedes: 'fueron' },
      imperfect: { yo: 'iba', tu: 'ibas', el_ella_usted: 'iba', nosotros: 'íbamos', vosotros: 'ibais', ellos_ellas_ustedes: 'iban' },
      future: { yo: 'iré', tu: 'irás', el_ella_usted: 'irá', nosotros: 'iremos', vosotros: 'iréis', ellos_ellas_ustedes: 'irán' },
      conditional: { yo: 'iría', tu: 'irías', el_ella_usted: 'iría', nosotros: 'iríamos', vosotros: 'iríais', ellos_ellas_ustedes: 'irían' },
      presentSubjunctive: { yo: 'vaya', tu: 'vayas', el_ella_usted: 'vaya', nosotros: 'vayamos', vosotros: 'vayáis', ellos_ellas_ustedes: 'vayan' },
      imperfectSubjunctive: { yo: 'fuera', tu: 'fueras', el_ella_usted: 'fuera', nosotros: 'fuéramos', vosotros: 'fuerais', ellos_ellas_ustedes: 'fueran' },
      imperativeAffirmative: { tu: 've', usted: 'vaya', nosotros: 'vamos / vayamos', vosotros: 'id', ustedes: 'vayan' }
    },
    commonPrepositions: ['a', 'en', 'hacia'],
    examples: [
      { es: 'Voy a la biblioteca en metro.', en: 'I go to the library by subway.', ar: 'أذهب إلى المكتبة بالمترو.', tense: 'present' },
      { es: 'El año pasado fuimos a Costa Rica.', en: 'Last year we went to Costa Rica.', ar: 'العام الماضي ذهبنا إلى كوستاريكا.', tense: 'preterite' }
    ],
    commonMistakes: 'Ir in preterite (fui, fuiste...) has the exact same forms as ser.',
    commonMistakes_ar: 'تصريف ir في الماضي البسيط (fui, fuiste...) يتطابق تماماً مع تصريف ser.',
    collocations: ['ir a + inf (المستقبل القريب)', 'irse (ينصرف / يغادر)', 'ir de compras (يتسوق)']
  },
  {
    id: 'v-hacer',
    infinitive: 'hacer',
    english: 'to do / to make',
    arabic: 'يفعل / يصنع / يستخدم للطقس',
    gerund: 'haciendo',
    participle: 'hecho',
    cefr: 'A1',
    regularType: 'irregular',
    isReflexive: false,
    frequencyRank: 6,
    conjugations: {
      present: { yo: 'hago', tu: 'haces', el_ella_usted: 'hace', nosotros: 'hacemos', vosotros: 'hacéis', ellos_ellas_ustedes: 'hacen' },
      preterite: { yo: 'hice', tu: 'hiciste', el_ella_usted: 'hizo', nosotros: 'hicimos', vosotros: 'hicisteis', ellos_ellas_ustedes: 'hicieron' },
      imperfect: { yo: 'hacía', tu: 'hacías', el_ella_usted: 'hacía', nosotros: 'hacíamos', vosotros: 'hacíais', ellos_ellas_ustedes: 'hacían' },
      future: { yo: 'haré', tu: 'harás', el_ella_usted: 'hará', nosotros: 'haremos', vosotros: 'haréis', ellos_ellas_ustedes: 'harán' },
      conditional: { yo: 'haría', tu: 'harías', el_ella_usted: 'haría', nosotros: 'haríamos', vosotros: 'haríais', ellos_ellas_ustedes: 'harían' },
      presentSubjunctive: { yo: 'haga', tu: 'hagas', el_ella_usted: 'haga', nosotros: 'hagamos', vosotros: 'hagáis', ellos_ellas_ustedes: 'hagan' },
      imperfectSubjunctive: { yo: 'hiciera', tu: 'hicieras', el_ella_usted: 'hiciera', nosotros: 'hiciéramos', vosotros: 'hicierais', ellos_ellas_ustedes: 'hicieran' },
      imperativeAffirmative: { tu: 'haz', usted: 'haga', nosotros: 'hagamos', vosotros: 'haced', ustedes: 'hagan' }
    },
    examples: [
      { es: 'Hago ejercicio por las mañanas.', en: 'I do exercise in the mornings.', ar: 'أمارس التمارين الرياضية في الصباح.', tense: 'present' },
      { es: '¿Qué hiciste el sábado por la noche?', en: 'What did you do Saturday night?', ar: 'ماذا فعلت ليلة السبت؟', tense: 'preterite' }
    ],
    commonMistakes: 'Note preterite spelling: él/ella hizo (with "z" to preserve the sound).',
    commonMistakes_ar: 'انتبه لإملاء الغائب في الماضي: él/ella hizo (بحرف z للحفاظ على النطق).',
    collocations: ['hacer la maleta (يحزم الحقائب)', 'hacer falta (ينقص / يلزم)', 'hacerse (يصبح)']
  },
  {
    id: 'v-poder',
    infinitive: 'poder',
    english: 'to be able to / can',
    arabic: 'يستطيع / يقدر',
    gerund: 'pudiendo',
    participle: 'podido',
    cefr: 'A1',
    regularType: 'stem-changing',
    isReflexive: false,
    frequencyRank: 7,
    conjugations: {
      present: { yo: 'puedo', tu: 'puedes', el_ella_usted: 'puede', nosotros: 'podemos', vosotros: 'podéis', ellos_ellas_ustedes: 'pueden' },
      preterite: { yo: 'pude', tu: 'pudiste', el_ella_usted: 'pudo', nosotros: 'pudimos', vosotros: 'pudisteis', ellos_ellas_ustedes: 'pudieron' },
      imperfect: { yo: 'podía', tu: 'podías', el_ella_usted: 'podía', nosotros: 'podíamos', vosotros: 'podíais', ellos_ellas_ustedes: 'podían' },
      future: { yo: 'podré', tu: 'podrás', el_ella_usted: 'podrá', nosotros: 'podremos', vosotros: 'podréis', ellos_ellas_ustedes: 'podrán' },
      conditional: { yo: 'podría', tu: 'podrías', el_ella_usted: 'podría', nosotros: 'podríamos', vosotros: 'podríais', ellos_ellas_ustedes: 'podrían' },
      presentSubjunctive: { yo: 'pueda', tu: 'puedas', el_ella_usted: 'pueda', nosotros: 'podamos', vosotros: 'podáis', ellos_ellas_ustedes: 'puedan' },
      imperfectSubjunctive: { yo: 'pudiera', tu: 'pudieras', el_ella_usted: 'pudiera', nosotros: 'pudiéramos', vosotros: 'pudierais', ellos_ellas_ustedes: 'pudieran' },
      imperativeAffirmative: { tu: 'puede', usted: 'pueda', nosotros: 'podamos', vosotros: 'poded', ustedes: 'puedan' }
    },
    examples: [
      { es: '¿Puedes repetir más despacio?', en: 'Can you repeat more slowly?', ar: 'هل يمكنك الإعادة ببطء أكثر؟', tense: 'present' },
      { es: 'No pude asistir a la conferencia.', en: 'I could not attend the conference.', ar: 'لم أتمكن من حضور المؤتمر.', tense: 'preterite' }
    ],
    collocations: ['no poder más (لم يعد يتحمل)', 'puede ser (قد يكون / ربما)']
  },
  {
    id: 'v-decir',
    infinitive: 'decir',
    english: 'to say / to tell',
    arabic: 'يقول / يخبر',
    gerund: 'diciendo',
    participle: 'dicho',
    cefr: 'A1',
    regularType: 'irregular',
    isReflexive: false,
    frequencyRank: 8,
    conjugations: {
      present: { yo: 'digo', tu: 'dices', el_ella_usted: 'dice', nosotros: 'decimos', vosotros: 'decís', ellos_ellas_ustedes: 'dicen' },
      preterite: { yo: 'dije', tu: 'dijiste', el_ella_usted: 'dijo', nosotros: 'dijimos', vosotros: 'dijisteis', ellos_ellas_ustedes: 'dijeron' },
      imperfect: { yo: 'decía', tu: 'decías', el_ella_usted: 'decía', nosotros: 'decíamos', vosotros: 'decíais', ellos_ellas_ustedes: 'decían' },
      future: { yo: 'diré', tu: 'dirás', el_ella_usted: 'dirá', nosotros: 'diremos', vosotros: 'diréis', ellos_ellas_ustedes: 'dirán' },
      conditional: { yo: 'diría', tu: 'dirías', el_ella_usted: 'diría', nosotros: 'diríamos', vosotros: 'diríais', ellos_ellas_ustedes: 'dirían' },
      presentSubjunctive: { yo: 'diga', tu: 'digas', el_ella_usted: 'diga', nosotros: 'digamos', vosotros: 'digáis', ellos_ellas_ustedes: 'digan' },
      imperfectSubjunctive: { yo: 'dijera', tu: 'dijeras', el_ella_usted: 'dijera', nosotros: 'dijéramos', vosotros: 'dijerais', ellos_ellas_ustedes: 'dijeran' },
      imperativeAffirmative: { tu: 'di', usted: 'diga', nosotros: 'digamos', vosotros: 'decid', ustedes: 'digan' }
    },
    examples: [
      { es: 'Dime la verdad sin miedo.', en: 'Tell me the truth without fear.', ar: 'قل لي الحقيقة دون خوف.', tense: 'imperative' },
      { es: 'Mi abuela siempre me decía refranes sabios.', en: 'My grandmother always used to tell me wise proverbs.', ar: 'جدتي كانت دائماً تقول لي أمثالاً حكيمة.', tense: 'imperfect' }
    ],
    collocations: ['es decir (أي / بمعنى آخر)', 'querer decir (يقصد / يعني)']
  },
  {
    id: 'v-querer',
    infinitive: 'querer',
    english: 'to want / to love',
    arabic: 'يريد / يحب',
    gerund: 'queriendo',
    participle: 'querido',
    cefr: 'A1',
    regularType: 'stem-changing',
    isReflexive: false,
    frequencyRank: 9,
    conjugations: {
      present: { yo: 'quiero', tu: 'quieres', el_ella_usted: 'quiere', nosotros: 'queremos', vosotros: 'queréis', ellos_ellas_ustedes: 'quieren' },
      preterite: { yo: 'quise', tu: 'quisiste', el_ella_usted: 'quiso', nosotros: 'quisimos', vosotros: 'quisisteis', ellos_ellas_ustedes: 'quisieron' },
      imperfect: { yo: 'quería', tu: 'querías', el_ella_usted: 'quería', nosotros: 'queríamos', vosotros: 'queríais', ellos_ellas_ustedes: 'querían' },
      future: { yo: 'querré', tu: 'querrás', el_ella_usted: 'querrá', nosotros: 'querremos', vosotros: 'querréis', ellos_ellas_ustedes: 'querrán' },
      conditional: { yo: 'querría', tu: 'querrías', el_ella_usted: 'querría', nosotros: 'querríamos', vosotros: 'querríais', ellos_ellas_ustedes: 'querrían' },
      presentSubjunctive: { yo: 'quiera', tu: 'quieras', el_ella_usted: 'quiera', nosotros: 'queramos', vosotros: 'queráis', ellos_ellas_ustedes: 'quieran' },
      imperfectSubjunctive: { yo: 'quisiera', tu: 'quisieras', el_ella_usted: 'quisiera', nosotros: 'quisiéramos', vosotros: 'quisierais', ellos_ellas_ustedes: 'quisieran' },
      imperativeAffirmative: { tu: 'quiere', usted: 'quiera', nosotros: 'queramos', vosotros: 'quered', ustedes: 'quieran' }
    },
    examples: [
      { es: 'Quisiera reservar una mesa para dos personas.', en: 'I would like to reserve a table for two.', ar: 'أود حجز طاولة لشخصين (بصيغة التأدب).', tense: 'imperfect subjunctive' },
      { es: 'Te quiero mucho.', en: 'I love you very much.', ar: 'أحبك كثيراً.', tense: 'present' }
    ],
    collocations: ['sin querer (دون قصد / بالخطأ)', 'querer a alguien (يحب شخصاً)']
  },
  {
    id: 'v-saber',
    infinitive: 'saber',
    english: 'to know (facts, information, skills)',
    arabic: 'يعرف (حقائق، معلومات، مهارات)',
    gerund: 'sabiendo',
    participle: 'sabido',
    cefr: 'A1',
    regularType: 'irregular',
    isReflexive: false,
    frequencyRank: 10,
    conjugations: {
      present: { yo: 'sé', tu: 'sabes', el_ella_usted: 'sabe', nosotros: 'sabemos', vosotros: 'sabéis', ellos_ellas_ustedes: 'saben' },
      preterite: { yo: 'supe', tu: 'supiste', el_ella_usted: 'supo', nosotros: 'supimos', vosotros: 'supisteis', ellos_ellas_ustedes: 'supieron' },
      imperfect: { yo: 'sabía', tu: 'sabías', el_ella_usted: 'sabía', nosotros: 'sabíamos', vosotros: 'sabíais', ellos_ellas_ustedes: 'sabían' },
      future: { yo: 'sabré', tu: 'sabrás', el_ella_usted: 'sabrá', nosotros: 'sabremos', vosotros: 'sabréis', ellos_ellas_ustedes: 'sabrán' },
      conditional: { yo: 'sabría', tu: 'sabrías', el_ella_usted: 'sabría', nosotros: 'sabríamos', vosotros: 'sabríais', ellos_ellas_ustedes: 'sabrían' },
      presentSubjunctive: { yo: 'sepa', tu: 'sepas', el_ella_usted: 'sepa', nosotros: 'sepamos', vosotros: 'sepáis', ellos_ellas_ustedes: 'sepan' },
      imperfectSubjunctive: { yo: 'supiera', tu: 'supieras', el_ella_usted: 'supiera', nosotros: 'supiéramos', vosotros: 'supierais', ellos_ellas_ustedes: 'supieran' },
      imperativeAffirmative: { tu: 'sabe', usted: 'sepa', nosotros: 'sepamos', vosotros: 'sabed', ustedes: 'sepan' }
    },
    examples: [
      { es: 'No sé cómo conjugar este verbo irregular.', en: 'I do not know how to conjugate this irregular verb.', ar: 'لا أعرف كيف أصرف هذا الفعل الشاذ.', tense: 'present' },
      { es: 'Ayer supe la gran noticia.', en: 'Yesterday I found out the big news (in preterite = found out).', ar: 'أمس علمت بالخبر السار (في الماضي = علم/اكتشف).', tense: 'preterite' }
    ],
    collocations: ['saber a + sabor (له نكهة)', 'a saber (أي / على وجه التحديد)']
  },
  {
    id: 'v-poner',
    infinitive: 'poner',
    english: 'to put / place / set / (ponerse = become/wear)',
    arabic: 'يضع / يثبت / (ponerse = يرتدي / يصبح)',
    gerund: 'poniendo',
    participle: 'puesto',
    cefr: 'A1',
    regularType: 'irregular',
    isReflexive: false,
    frequencyRank: 11,
    conjugations: {
      present: { yo: 'pongo', tu: 'pones', el_ella_usted: 'pone', nosotros: 'ponemos', vosotros: 'ponéis', ellos_ellas_ustedes: 'ponen' },
      preterite: { yo: 'puse', tu: 'pusiste', el_ella_usted: 'puso', nosotros: 'pusimos', vosotros: 'pusisteis', ellos_ellas_ustedes: 'pusieron' },
      imperfect: { yo: 'ponía', tu: 'ponías', el_ella_usted: 'ponía', nosotros: 'poníamos', vosotros: 'poníais', ellos_ellas_ustedes: 'ponían' },
      future: { yo: 'pondré', tu: 'pondrás', el_ella_usted: 'pondrá', nosotros: 'pondremos', vosotros: 'pondréis', ellos_ellas_ustedes: 'pondrán' },
      conditional: { yo: 'pondría', tu: 'pondrías', el_ella_usted: 'pondría', nosotros: 'pondríamos', vosotros: 'pondríais', ellos_ellas_ustedes: 'pondrían' },
      presentSubjunctive: { yo: 'ponga', tu: 'pongas', el_ella_usted: 'ponga', nosotros: 'pongamos', vosotros: 'pongáis', ellos_ellas_ustedes: 'pongan' },
      imperfectSubjunctive: { yo: 'pusiera', tu: 'pusieras', el_ella_usted: 'pusiera', nosotros: 'pusiéramos', vosotros: 'pusierais', ellos_ellas_ustedes: 'pusieran' },
      imperativeAffirmative: { tu: 'pon', usted: 'ponga', nosotros: 'pongamos', vosotros: 'poned', ustedes: 'pongan' }
    },
    examples: [
      { es: 'Pongo la mesa antes de cenar.', en: 'I set the table before dinner.', ar: 'أرتب الطاولة قبل العشاء.', tense: 'present' },
      { es: 'Me pongo el abrigo porque hace frío.', en: 'I put on my coat because it is cold.', ar: 'أرتدي معطفي لأن الجو بارد.', tense: 'present (reflexive)' }
    ],
    collocations: ['ponerse a + inf (يبدأ في)', 'poner de manifiesto (يظهر للعيان)', 'ponerse contento (يفرح)']
  },
  {
    id: 'v-dar',
    infinitive: 'dar',
    english: 'to give / produce',
    arabic: 'يعطي / يمنح',
    gerund: 'dando',
    participle: 'dado',
    cefr: 'A1',
    regularType: 'irregular',
    isReflexive: false,
    frequencyRank: 12,
    conjugations: {
      present: { yo: 'doy', tu: 'das', el_ella_usted: 'da', nosotros: 'damos', vosotros: 'dais', ellos_ellas_ustedes: 'dan' },
      preterite: { yo: 'di', tu: 'diste', el_ella_usted: 'dio', nosotros: 'dimos', vosotros: 'disteis', ellos_ellas_ustedes: 'dieron' },
      imperfect: { yo: 'daba', tu: 'dabas', el_ella_usted: 'daba', nosotros: 'dábamos', vosotros: 'dabais', ellos_ellas_ustedes: 'daban' },
      future: { yo: 'daré', tu: 'darás', el_ella_usted: 'dará', nosotros: 'daremos', vosotros: 'daréis', ellos_ellas_ustedes: 'darán' },
      conditional: { yo: 'daría', tu: 'darías', el_ella_usted: 'daría', nosotros: 'daríamos', vosotros: 'daríais', ellos_ellas_ustedes: 'darían' },
      presentSubjunctive: { yo: 'dé', tu: 'des', el_ella_usted: 'dé', nosotros: 'demos', vosotros: 'deis', ellos_ellas_ustedes: 'den' },
      imperfectSubjunctive: { yo: 'diera', tu: 'dieras', el_ella_usted: 'diera', nosotros: 'diéramos', vosotros: 'dierais', ellos_ellas_ustedes: 'dieran' },
      imperativeAffirmative: { tu: 'da', usted: 'dé', nosotros: 'demos', vosotros: 'dad', ustedes: 'den' }
    },
    examples: [
      { es: 'Te doy las gracias por todo.', en: 'I thank you for everything.', ar: 'أشكرك على كل شيء.', tense: 'present' },
      { es: 'Me da miedo la oscuridad.', en: 'Darkness scares me.', ar: 'الظلام يخيفني.', tense: 'present' }
    ],
    collocations: ['darse cuenta de (يدرك / ينتبه إلى)', 'dar un paseo (يتنزه)', 'dar igual (لا يهم / سيان)']
  }
];
