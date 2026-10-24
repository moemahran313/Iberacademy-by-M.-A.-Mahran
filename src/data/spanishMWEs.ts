import { MultiWordExpression, MWEMatch } from '../types/vocabulary';
import { WordToken } from '../utils/lingqEngine';

/**
 * Curated database of Spanish Multi-Word Expressions (MWEs):
 * Compound prepositions, phrasal idioms, conversational chunks, and lexical collocations.
 */
export const SPANISH_MWE_DATABASE: MultiWordExpression[] = [
  // Compound Prepositions & Connectors
  {
    id: 'mwe_a_pesar_de_que',
    phrase_es: 'a pesar de que',
    phrase_en: 'even though / in spite of the fact that',
    phrase_ar: 'على الرغم من أن / بالرغم من أن',
    category: 'compound_preposition',
    categoryLabel: 'Preposición compuesta',
    cefr: 'B1',
    constituentTokensCount: 4,
    example_es: 'A pesar de que llovía mucho, fuimos a pasear por el parque.',
    example_en: 'Even though it was raining heavily, we went for a walk in the park.',
    example_ar: 'على الرغم من أنها كانت تمطر بغزارة، خرجنا في نزهة في الحديقة.'
  },
  {
    id: 'mwe_a_pesar_de',
    phrase_es: 'a pesar de',
    phrase_en: 'despite / in spite of',
    phrase_ar: 'على الرغم من',
    category: 'compound_preposition',
    categoryLabel: 'Preposición compuesta',
    cefr: 'B1',
    constituentTokensCount: 3,
    example_es: 'Llegamos a tiempo a pesar del tráfico intenso.',
    example_en: 'We arrived on time despite the heavy traffic.',
    example_ar: 'وصلنا في الوقت المحدد على الرغم من حركة المرور الكثيفة.'
  },
  {
    id: 'mwe_con_respecto_a',
    phrase_es: 'con respecto a',
    phrase_en: 'with regard to / regarding',
    phrase_ar: 'فيما يتعلق بـ / بخصوص',
    category: 'compound_preposition',
    categoryLabel: 'Preposición compuesta',
    cefr: 'B2',
    constituentTokensCount: 3,
    example_es: 'Con respecto a su propuesta, la evaluaremos con detenimiento.',
    example_en: 'Regarding your proposal, we will evaluate it carefully.',
    example_ar: 'فيما يتعلق بمقترحك، سنقوم بتقييمه بعناية.'
  },
  {
    id: 'mwe_a_traves_de',
    phrase_es: 'a través de',
    phrase_en: 'through / across / via',
    phrase_ar: 'من خلال / عبر',
    category: 'compound_preposition',
    categoryLabel: 'Preposición compuesta',
    cefr: 'B1',
    constituentTokensCount: 3,
    example_es: 'Nos comunicamos a través de una videollamada.',
    example_en: 'We communicated through a video call.',
    example_ar: 'تواصلنا من خلال مكالمة فيديو.'
  },
  {
    id: 'mwe_en_lugar_de',
    phrase_es: 'en lugar de',
    phrase_en: 'instead of',
    phrase_ar: 'بدلاً من',
    category: 'compound_preposition',
    categoryLabel: 'Preposición compuesta',
    cefr: 'A2',
    constituentTokensCount: 3,
    example_es: 'Prefiero tomar té en lugar de café por la noche.',
    example_en: 'I prefer to drink tea instead of coffee at night.',
    example_ar: 'أفضل شرب الشاي بدلاً من القهوة في الليل.'
  },
  {
    id: 'mwe_en_vez_de',
    phrase_es: 'en vez de',
    phrase_en: 'instead of',
    phrase_ar: 'عوضاً عن / بدلاً من',
    category: 'compound_preposition',
    categoryLabel: 'Preposición compuesta',
    cefr: 'A2',
    constituentTokensCount: 3,
    example_es: 'Fui en bicicleta en vez de usar el coche.',
    example_en: 'I went by bike instead of using the car.',
    example_ar: 'ذهبت بالدراجة عوضاً عن استخدام السيارة.'
  },
  {
    id: 'mwe_gracias_a',
    phrase_es: 'gracias a',
    phrase_en: 'thanks to',
    phrase_ar: 'بفضل / شكراً لـ',
    category: 'compound_preposition',
    categoryLabel: 'Preposición compuesta',
    cefr: 'A2',
    constituentTokensCount: 2,
    example_es: 'Aprobé el examen oficial gracias a tu ayuda constante.',
    example_en: 'I passed the official exam thanks to your constant help.',
    example_ar: 'اجتزت الامتحان الرسمي بفضل مساعدتك المستمرة.'
  },
  {
    id: 'mwe_debido_a',
    phrase_es: 'debido a',
    phrase_en: 'due to / owing to',
    phrase_ar: 'بسبب / نظراً لـ',
    category: 'compound_preposition',
    categoryLabel: 'Preposición compuesta',
    cefr: 'B1',
    constituentTokensCount: 2,
    example_es: 'El vuelo se canceló debido al mal tiempo en la costa.',
    example_en: 'The flight was cancelled due to bad weather on the coast.',
    example_ar: 'أُلغيت الرحلة بسبب سوء الأحوال الجوية على الساحل.'
  },
  {
    id: 'mwe_junto_a',
    phrase_es: 'junto a',
    phrase_en: 'next to / beside / together with',
    phrase_ar: 'بجانب / إلى جوار',
    category: 'compound_preposition',
    categoryLabel: 'Preposición compuesta',
    cefr: 'A2',
    constituentTokensCount: 2,
    example_es: 'Mi apartamento está situado junto a la plaza mayor.',
    example_en: 'My apartment is located next to the main square.',
    example_ar: 'تقع شقتي بجانب الساحة الكبرى.'
  },
  {
    id: 'mwe_frente_a',
    phrase_es: 'frente a',
    phrase_en: 'in front of / facing / compared to',
    phrase_ar: 'أمام / في مواجهة',
    category: 'compound_preposition',
    categoryLabel: 'Preposición compuesta',
    cefr: 'B1',
    constituentTokensCount: 2,
    example_es: 'La cafetería está justo frente a la biblioteca central.',
    example_en: 'The coffee shop is right in front of the central library.',
    example_ar: 'المقهى يقع مباشرة أمام المكتبة المركزية.'
  },
  {
    id: 'mwe_a_punto_de',
    phrase_es: 'a punto de',
    phrase_en: 'about to / on the verge of',
    phrase_ar: 'على وشك',
    category: 'compound_preposition',
    categoryLabel: 'Locución preposicional',
    cefr: 'B1',
    constituentTokensCount: 3,
    example_es: 'Estábamos a punto de salir cuando comenzó a nevar.',
    example_en: 'We were about to leave when it began to snow.',
    example_ar: 'كنا على وشك الخروج عندما بدأت تثلج.'
  },
  {
    id: 'mwe_de_acuerdo_con',
    phrase_es: 'de acuerdo con',
    phrase_en: 'according to / in agreement with',
    phrase_ar: 'وفقاً لـ / بحسب',
    category: 'compound_preposition',
    categoryLabel: 'Locución preposicional',
    cefr: 'B1',
    constituentTokensCount: 3,
    example_es: 'De acuerdo con las estadísticas, el aprendizaje diario acelera la fluidez.',
    example_en: 'According to statistics, daily learning accelerates fluency.',
    example_ar: 'وفقاً للإحصاءات، فإن التعلم اليومي يسرع الطلاقة.'
  },

  // Phrasal Expressions & Idioms
  {
    id: 'mwe_echar_de_menos',
    phrase_es: 'echar de menos',
    phrase_en: 'to miss (someone or something)',
    phrase_ar: 'يشتاق إلى / يفتقد',
    category: 'phrasal_expression',
    categoryLabel: 'Locución verbal',
    cefr: 'A2',
    constituentTokensCount: 3,
    example_es: 'Echo mucho de menos a mis amigos y la comida de mi tierra.',
    example_en: 'I miss my friends and the food from my homeland a lot.',
    example_ar: 'أشتاق كثيراً إلى أصدقائي وطعام وطني.'
  },
  {
    id: 'mwe_tener_ganas_de',
    phrase_es: 'tener ganas de',
    phrase_en: 'to feel like (doing something) / to look forward to',
    phrase_ar: 'يرغب في / يتوق إلى',
    category: 'phrasal_expression',
    categoryLabel: 'Locución verbal',
    cefr: 'A2',
    constituentTokensCount: 3,
    example_es: 'Tengo muchas ganas de conocer Granada y la Alhambra.',
    example_en: 'I really feel like visiting Granada and the Alhambra.',
    example_ar: 'لدي رغبة شديدة في زيارة غرناطة وقصر الحمراء.'
  },
  {
    id: 'mwe_dar_de_alta',
    phrase_es: 'dar de alta',
    phrase_en: 'to register / to discharge (hospital) / to activate a service',
    phrase_ar: 'يسجل / يمنح إذناً بالخروج من المستشفى / يفعل خدمة',
    category: 'phrasal_expression',
    categoryLabel: 'Locución verbal administrativa',
    cefr: 'B1',
    constituentTokensCount: 3,
    example_es: 'Ayer le dieron el alta médica tras recuperarse por completo.',
    example_en: 'Yesterday they discharged him from the hospital after fully recovering.',
    example_ar: 'أعطوه الأمس تصريح الخروج الطبي بعد تعافيه التام.'
  },
  {
    id: 'mwe_dar_de_baja',
    phrase_es: 'dar de baja',
    phrase_en: 'to cancel a subscription / to write off / sick leave',
    phrase_ar: 'يلغي اشتراكاً / يشطب / إجازة مرضية',
    category: 'phrasal_expression',
    categoryLabel: 'Locución verbal administrativa',
    cefr: 'B1',
    constituentTokensCount: 3,
    example_es: 'Quiero dar de baja mi suscripción mensual a este servicio.',
    example_en: 'I want to cancel my monthly subscription to this service.',
    example_ar: 'أريد إلغاء اشتراكي الشهري في هذه الخدمة.'
  },
  {
    id: 'mwe_por_si_las_moscas',
    phrase_es: 'por si las moscas',
    phrase_en: 'just in case',
    phrase_ar: 'احتياطاً / تحسباً لأي طارئ',
    category: 'idiom',
    categoryLabel: 'Modismo idiomático',
    cefr: 'B2',
    constituentTokensCount: 4,
    example_es: 'Llevaré un paraguas en la mochila por si las moscas.',
    example_en: "I'll take an umbrella in my backpack just in case.",
    example_ar: 'سآخذ مظلة في حقيبة ظهري احتياطاً.'
  },
  {
    id: 'mwe_tomar_el_pelo',
    phrase_es: 'tomar el pelo',
    phrase_en: 'to pull someone\'s leg / to tease',
    phrase_ar: 'يمازح / يخدع على سبيل المزاح',
    category: 'idiom',
    categoryLabel: 'Modismo idiomático',
    cefr: 'B1',
    constituentTokensCount: 3,
    example_es: '¿Estás hablando en serio o me estás tomando el pelo?',
    example_en: 'Are you being serious or are you pulling my leg?',
    example_ar: 'هل تتحدث بجدية أم أنك تمازحني؟'
  },
  {
    id: 'mwe_valer_la_pena',
    phrase_es: 'valer la pena',
    phrase_en: 'to be worth it',
    phrase_ar: 'يستحق العناء / جدير بالاهتمام',
    category: 'phrasal_expression',
    categoryLabel: 'Locución verbal',
    cefr: 'A2',
    constituentTokensCount: 3,
    example_es: 'Subir hasta la cumbre de la montaña valió totalmente la pena.',
    example_en: 'Climbing to the mountain summit was totally worth it.',
    example_ar: 'كان الصعود إلى قمة الجبل يستحق العناء تماماً.'
  },
  {
    id: 'mwe_darse_cuenta_de',
    phrase_es: 'darse cuenta de',
    phrase_en: 'to realize / to notice',
    phrase_ar: 'يدرك / يلاحظ',
    category: 'phrasal_expression',
    categoryLabel: 'Locución verbal',
    cefr: 'B1',
    constituentTokensCount: 3,
    example_es: 'Al llegar a la estación me di cuenta de que olvidé el billete.',
    example_en: 'When arriving at the station I realized I had forgotten the ticket.',
    example_ar: 'عند وصولي إلى المحطة أدركت أنني نسيت التذكرة.'
  },
  {
    id: 'mwe_darse_cuenta',
    phrase_es: 'darse cuenta',
    phrase_en: 'to realize / become aware',
    phrase_ar: 'يدرك / ينتبه',
    category: 'phrasal_expression',
    categoryLabel: 'Locución verbal',
    cefr: 'B1',
    constituentTokensCount: 2,
    example_es: 'No te preocupes, cualquiera puede equivocarse sin darse cuenta.',
    example_en: 'Do not worry, anyone can make a mistake without realizing it.',
    example_ar: 'لا تقلق، أي شخص يمكن أن يخطئ دون أن يدرك.'
  },
  {
    id: 'mwe_tener_en_cuenta',
    phrase_es: 'tener en cuenta',
    phrase_en: 'to take into account / to bear in mind',
    phrase_ar: 'يأخذ بعين الاعتبار / يضع في الحسبان',
    category: 'phrasal_expression',
    categoryLabel: 'Locución verbal',
    cefr: 'B1',
    constituentTokensCount: 3,
    example_es: 'Debes tener en cuenta las condiciones climáticas antes de viajar.',
    example_en: 'You must take the weather conditions into account before traveling.',
    example_ar: 'يجب أن تأخذ بعين الاعتبار الظروف الجوية قبل السفر.'
  },
  {
    id: 'mwe_llevar_a_cabo',
    phrase_es: 'llevar a cabo',
    phrase_en: 'to carry out / to execute / to accomplish',
    phrase_ar: 'ينفذ / ينجز / يقوم بـ',
    category: 'phrasal_expression',
    categoryLabel: 'Locución verbal formal',
    cefr: 'B2',
    constituentTokensCount: 3,
    example_es: 'El equipo de investigación llevó a cabo el experimento con éxito.',
    example_en: 'The research team successfully carried out the experiment.',
    example_ar: 'أجرى فريق البحث التجربة بنجاح.'
  },
  {
    id: 'mwe_prestar_atencion',
    phrase_es: 'prestar atención',
    phrase_en: 'to pay attention',
    phrase_ar: 'ينتبه / يعير اهتماماً',
    category: 'collocation_verb',
    categoryLabel: 'Colocación verbal fija',
    cefr: 'A2',
    constituentTokensCount: 2,
    example_es: 'Es imprescindible prestar atención a los detalles gramaticales.',
    example_en: 'It is essential to pay attention to grammatical details.',
    example_ar: 'من الضروري إيلاء الاهتمام للتفاصيل النحوية.'
  },
  {
    id: 'mwe_hacer_una_pregunta',
    phrase_es: 'hacer una pregunta',
    phrase_en: 'to ask a question (not "preguntar una pregunta")',
    phrase_ar: 'يطرح سؤالاً',
    category: 'collocation_verb',
    categoryLabel: 'Colocación verbal fija',
    cefr: 'A1',
    constituentTokensCount: 3,
    example_es: 'Disculpe, profesor, ¿puedo hacer una pregunta sobre este ejercicio?',
    example_en: 'Excuse me, professor, may I ask a question about this exercise?',
    example_ar: 'عفواً يا أستاذ، هل يمكنني طرح سؤال حول هذا التمرين؟'
  },
  {
    id: 'mwe_tomar_una_decision',
    phrase_es: 'tomar una decisión',
    phrase_en: 'to make a decision',
    phrase_ar: 'يتخذ قراراً',
    category: 'collocation_verb',
    categoryLabel: 'Colocación verbal fija',
    cefr: 'B1',
    constituentTokensCount: 3,
    example_es: 'Debemos evaluar todas las alternativas antes de tomar una decisión.',
    example_en: 'We must evaluate all alternatives before making a decision.',
    example_ar: 'يجب أن نقيم جميع البدائل قبل اتخاذ القرار.'
  },
  {
    id: 'mwe_correr_un_riesgo',
    phrase_es: 'correr un riesgo',
    phrase_en: 'to run a risk / to take a risk',
    phrase_ar: 'يخاطر / يتحمل مخاطرة',
    category: 'collocation_verb',
    categoryLabel: 'Colocación verbal fija',
    cefr: 'B1',
    constituentTokensCount: 3,
    example_es: 'Emprender un nuevo negocio siempre implica correr un riesgo.',
    example_en: 'Starting a new business always involves taking a risk.',
    example_ar: 'بدء عمل تجاري جديد ينطوي دائماً على خوض مخاطرة.'
  },
  {
    id: 'mwe_dar_un_paseo',
    phrase_es: 'dar un paseo',
    phrase_en: 'to go for a walk / to take a stroll',
    phrase_ar: 'يقوم بنزهة / يتمشى',
    category: 'collocation_verb',
    categoryLabel: 'Colocación verbal fija',
    cefr: 'A1',
    constituentTokensCount: 3,
    example_es: 'Por las tardes me gusta dar un paseo por la orilla del mar.',
    example_en: 'In the afternoons I like to take a walk along the seashore.',
    example_ar: 'في فترات بعد الظهر أحب أن أتمشى على شاطئ البحر.'
  },
  {
    id: 'mwe_hacer_caso',
    phrase_es: 'hacer caso',
    phrase_en: 'to pay attention / to listen to / to obey',
    phrase_ar: 'يصغي / يعير انتباهاً / يطيع',
    category: 'phrasal_expression',
    categoryLabel: 'Locución verbal',
    cefr: 'B1',
    constituentTokensCount: 2,
    example_es: 'Deberías hacer caso a las advertencias de tu médico.',
    example_en: "You should listen to your doctor's warnings.",
    example_ar: 'عليك أن تصغي لتحذيرات طبيبك.'
  },
  {
    id: 'mwe_hacer_la_vista_gorda',
    phrase_es: 'hacer la vista gorda',
    phrase_en: 'to turn a blind eye',
    phrase_ar: 'يغض الطرف / يتغاضى عن الأمر',
    category: 'idiom',
    categoryLabel: 'Modismo idiomático',
    cefr: 'B2',
    constituentTokensCount: 4,
    example_es: 'El supervisor decidió hacer la vista gorda con el pequeño retraso.',
    example_en: 'The supervisor decided to turn a blind eye to the slight delay.',
    example_ar: 'قرر المشرف أن يغض الطرف عن التأخير البسيط.'
  },
  {
    id: 'mwe_costar_un_ojo_de_la_cara',
    phrase_es: 'costar un ojo de la cara',
    phrase_en: 'to cost an arm and a leg / to be extremely expensive',
    phrase_ar: 'يكلف ثمناً باهظاً للغاية',
    category: 'idiom',
    categoryLabel: 'Modismo idiomático',
    cefr: 'B2',
    constituentTokensCount: 6,
    example_es: 'Reparar el motor del coche me costó un ojo de la cara.',
    example_en: 'Fixing the car engine cost me an arm and a leg.',
    example_ar: 'إصلاح محرك السيارة كلفني ثمناً باهظاً جداً.'
  },
  {
    id: 'mwe_estar_al_tanto',
    phrase_es: 'estar al tanto',
    phrase_en: 'to be up to date / to be in the know',
    phrase_ar: 'يكون على اطلاع / على دراية',
    category: 'phrasal_expression',
    categoryLabel: 'Locución verbal',
    cefr: 'B1',
    constituentTokensCount: 3,
    example_es: 'Leo las noticias a diario para estar al tanto de la actualidad.',
    example_en: 'I read the news daily to keep up with current events.',
    example_ar: 'أقرأ الأخبار يومياً لأكون على اطلاع بالأحداث الجارية.'
  },
  {
    id: 'mwe_de_vez_en_cuando',
    phrase_es: 'de vez en cuando',
    phrase_en: 'from time to time / once in a while',
    phrase_ar: 'من حين لآخر / بين الحين والآخر',
    category: 'phrasal_expression',
    categoryLabel: 'Locución adverbial',
    cefr: 'A2',
    constituentTokensCount: 4,
    example_es: 'De vez en cuando nos reunimos para cenar y charlar en familia.',
    example_en: 'From time to time we meet for dinner and talk as a family.',
    example_ar: 'بين الحين والآخر نجتمع لتناول العشاء والحديث كعائلة.'
  },
  {
    id: 'mwe_a_fin_de_cuentas',
    phrase_es: 'a fin de cuentas',
    phrase_en: 'after all / in the end / at the end of the day',
    phrase_ar: 'في نهاية المطاف / بعد كل شيء',
    category: 'discursive_marker',
    categoryLabel: 'Marcador discursivo',
    cefr: 'B2',
    constituentTokensCount: 4,
    example_es: 'A fin de cuentas, lo que importa es la constancia en el estudio.',
    example_en: 'At the end of the day, what matters is consistency in study.',
    example_ar: 'في نهاية المطاف، ما يهم حقاً هو الاستمرارية في الدراسة.'
  },
  {
    id: 'mwe_en_un_abrir_y_cerrar_de_ojos',
    phrase_es: 'en un abrir y cerrar de ojos',
    phrase_en: 'in the blink of an eye',
    phrase_ar: 'في طرفة عين / بلمح البصر',
    category: 'idiom',
    categoryLabel: 'Modismo idiomático',
    cefr: 'B2',
    constituentTokensCount: 7,
    example_es: 'Las vacaciones pasaron en un abrir y cerrar de ojos.',
    example_en: 'The vacation went by in the blink of an eye.',
    example_ar: 'مرت العطلة بلمح البصر.'
  },
  {
    id: 'mwe_meter_la_pata',
    phrase_es: 'meter la pata',
    phrase_en: 'to put one\'s foot in it / to mess up',
    phrase_ar: 'يقع في الخطأ / يرتكب هفوة',
    category: 'idiom',
    categoryLabel: 'Modismo coloquial',
    cefr: 'B1',
    constituentTokensCount: 3,
    example_es: 'Metí la pata al felicitarla por su cumpleaños antes de tiempo.',
    example_en: 'I put my foot in it by congratulating her on her birthday too early.',
    example_ar: 'أوقعت نفسي في حرج عندما هنأتها بعيد ميلادها قبل موعده.'
  },
  {
    id: 'mwe_dar_en_el_clavo',
    phrase_es: 'dar en el clavo',
    phrase_en: 'to hit the nail on the head',
    phrase_ar: 'يصيب كبد الحقيقة / يحل المشكلة بدقة',
    category: 'idiom',
    categoryLabel: 'Modismo idiomático',
    cefr: 'B2',
    constituentTokensCount: 4,
    example_es: 'Tu análisis sobre la economía dio exactamente en el clavo.',
    example_en: 'Your analysis of the economy hit the nail on the head exactly.',
    example_ar: 'أصاب تحليلك للاقتصاد كبد الحقيقة تماماً.'
  },
  {
    id: 'mwe_poco_a_poco',
    phrase_es: 'poco a poco',
    phrase_en: 'little by little / step by step',
    phrase_ar: 'شيئاً فشيئاً / خطوة بخطوة',
    category: 'phrasal_expression',
    categoryLabel: 'Locución adverbial',
    cefr: 'A1',
    constituentTokensCount: 3,
    example_es: 'Poco a poco notarás cómo aumenta tu soltura al hablar.',
    example_en: 'Little by little you will notice how your speaking fluency increases.',
    example_ar: 'شيئاً فشيئاً ستلاحظ كيف تزداد طلاقتك في التحدث.'
  },
  {
    id: 'mwe_hoy_en_dia',
    phrase_es: 'hoy en día',
    phrase_en: 'nowadays / these days',
    phrase_ar: 'في هذه الأيام / في الوقت الحاضر',
    category: 'phrasal_expression',
    categoryLabel: 'Locución temporal',
    cefr: 'A2',
    constituentTokensCount: 3,
    example_es: 'Hoy en día podemos aprender cualquier idioma desde el móvil.',
    example_en: 'Nowadays we can learn any language from a mobile phone.',
    example_ar: 'في هذه الأيام يمكننا تعلم أي لغة من الهاتف المحمول.'
  },
  {
    id: 'mwe_sin_embargo',
    phrase_es: 'sin embargo',
    phrase_en: 'however / nevertheless',
    phrase_ar: 'ومع ذلك / إلا أن',
    category: 'discursive_marker',
    categoryLabel: 'Conector discursivo de contraste',
    cefr: 'B1',
    constituentTokensCount: 2,
    example_es: 'El examen era difícil; sin embargo, todos aprobamos con buena nota.',
    example_en: 'The exam was difficult; however, we all passed with good marks.',
    example_ar: 'كان الامتحان صعباً؛ ومع ذلك، اجتزنا جميعاً بعلامات جيدة.'
  },
  {
    id: 'mwe_por_lo_tanto',
    phrase_es: 'por lo tanto',
    phrase_en: 'therefore / consequently',
    phrase_ar: 'لذلك / بناءً عليه',
    category: 'discursive_marker',
    categoryLabel: 'Conector discursivo consecutivo',
    cefr: 'B1',
    constituentTokensCount: 3,
    example_es: 'Practicamos todos los días, por lo tanto hemos mejorado notablemente.',
    example_en: 'We practice every day, therefore we have improved remarkably.',
    example_ar: 'نتدرب كل يوم، وبناءً عليه فقد تحسنا بشكل ملحوظ.'
  },
  {
    id: 'mwe_por_consiguiente',
    phrase_es: 'por consiguiente',
    phrase_en: 'consequently / as a result',
    phrase_ar: 'وبالتالي / وتبعاً لذلك',
    category: 'discursive_marker',
    categoryLabel: 'Conector discursivo formal',
    cefr: 'B2',
    constituentTokensCount: 2,
    example_es: 'No asistió a las sesiones; por consiguiente, deberá repetir el examen.',
    example_en: 'He did not attend the sessions; consequently, he must repeat the exam.',
    example_ar: 'لم يحضر الجلسات؛ وبالتالي، سيتعين عليه إعادة الامتحان.'
  },
  {
    id: 'mwe_en_cambio',
    phrase_es: 'en cambio',
    phrase_en: 'on the other hand / instead',
    phrase_ar: 'في المقابل / بالمقابل',
    category: 'discursive_marker',
    categoryLabel: 'Conector de contraste',
    cefr: 'B1',
    constituentTokensCount: 2,
    example_es: 'A Juan le gusta madrugar; en cambio, yo prefiero la noche.',
    example_en: 'Juan likes waking up early; on the other hand, I prefer the night.',
    example_ar: 'خوان يحب الاستيقاظ مبكراً؛ في المقابل، أنا أفضل الليل.'
  },
  {
    id: 'mwe_por_cierto',
    phrase_es: 'por cierto',
    phrase_en: 'by the way',
    phrase_ar: 'بالمناسبة',
    category: 'discursive_marker',
    categoryLabel: 'Marcador conversacional',
    cefr: 'A2',
    constituentTokensCount: 2,
    example_es: 'Por cierto, ¿recibiste el correo que te envié esta mañana?',
    example_en: 'By the way, did you receive the email I sent you this morning?',
    example_ar: 'بالمناسبة، هل استلمت البريد الذي أرسلته لك هذا الصباح؟'
  },
  {
    id: 'mwe_de_repente',
    phrase_es: 'de repente',
    phrase_en: 'suddenly / all of a sudden',
    phrase_ar: 'فجأة / على حين غرة',
    category: 'phrasal_expression',
    categoryLabel: 'Locución adverbial',
    cefr: 'A2',
    constituentTokensCount: 2,
    example_es: 'Estábamos hablando tranquilamente cuando de repente se apagó la luz.',
    example_en: 'We were talking quietly when suddenly the lights went out.',
    example_ar: 'كنا نتحدث بهدوء عندما انطفأت الأضواء فجأة.'
  },
  {
    id: 'mwe_a_lo_mejor',
    phrase_es: 'a lo mejor',
    phrase_en: 'maybe / perhaps',
    phrase_ar: 'ربما / قد',
    category: 'phrasal_expression',
    categoryLabel: 'Locución de probabilidad',
    cefr: 'A2',
    constituentTokensCount: 3,
    example_es: 'A lo mejor nos vemos este fin de semana si tienes tiempo libre.',
    example_en: 'Maybe we will see each other this weekend if you have free time.',
    example_ar: 'ربما نلتقي في عطلة نهاية هذا الأسبوع إن كان لديك وقت فراغ.'
  },
  {
    id: 'mwe_por_supuesto',
    phrase_es: 'por supuesto',
    phrase_en: 'of course / naturally',
    phrase_ar: 'بالتأكيد / طبعاً',
    category: 'phrasal_expression',
    categoryLabel: 'Locución afirmativa',
    cefr: 'A1',
    constituentTokensCount: 2,
    example_es: 'Por supuesto que puedes contar con mi apoyo para la presentación.',
    example_en: 'Of course you can count on my support for the presentation.',
    example_ar: 'بالتأكيد يمكنك الاعتماد على دعمي في العرض التقديمي.'
  },
  {
    id: 'mwe_echar_una_mano',
    phrase_es: 'echar una mano',
    phrase_en: 'to lend a hand / to help out',
    phrase_ar: 'يمد يد العون / يساعد',
    category: 'idiom',
    categoryLabel: 'Modismo coloquial',
    cefr: 'B1',
    constituentTokensCount: 3,
    example_es: '¿Te importa echarme una mano con estas cajas tan pesadas?',
    example_en: 'Would you mind lending me a hand with these heavy boxes?',
    example_ar: 'هل تمانع في أن تمد لي يد العون مع هذه الصناديق الثقيلة؟'
  },
  {
    id: 'mwe_ponerse_las_pilas',
    phrase_es: 'ponerse las pilas',
    phrase_en: 'to get one\'s act together / to pull one\'s socks up',
    phrase_ar: 'يشحذ همته / ينشط ويعمل بجدية',
    category: 'idiom',
    categoryLabel: 'Modismo coloquial',
    cefr: 'B2',
    constituentTokensCount: 3,
    example_es: 'Queda solo un mes para el examen DELE, así que hay que ponerse las pilas.',
    example_en: 'There is only one month left until the DELE exam, so we need to get our act together.',
    example_ar: 'لم يتبق سوى شهر واحد على امتحان DELE، لذا يجب أن نشحذ همتنا.'
  }
];

// Pre-compiled fast lookup index by token length and normalized word sequence
const MWE_LOOKUP_MAP = new Map<string, MultiWordExpression>();
SPANISH_MWE_DATABASE.forEach(mwe => {
  const norm = mwe.phrase_es.toLowerCase().trim().replace(/[^a-záéíóúñü\s]/g, '');
  MWE_LOOKUP_MAP.set(norm, mwe);
});

/**
 * Scan an array of WordTokens in < 5ms to locate multi-word expressions.
 * Matches up to 7 consecutive tokens in a sliding window.
 */
export function findMWEMatchesInTokens(tokens: WordToken[]): MWEMatch[] {
  const matches: MWEMatch[] = [];
  const wordTokens = tokens.filter(t => t.isWord);
  if (wordTokens.length === 0) return matches;

  const usedTokenIndices = new Set<number>();

  // Check n-grams from 7 down to 2
  for (let n = 7; n >= 2; n--) {
    for (let i = 0; i <= wordTokens.length - n; i++) {
      // If any token in window is already matched by a longer MWE, skip
      let overlapping = false;
      for (let k = 0; k < n; k++) {
        if (usedTokenIndices.has(i + k)) {
          overlapping = true;
          break;
        }
      }
      if (overlapping) continue;

      // Extract window phrase
      const windowTokens = wordTokens.slice(i, i + n);
      // Ensure all tokens in window belong to the same sentence
      const firstSentence = windowTokens[0].sentenceIndex;
      const sameSentence = windowTokens.every(t => t.sentenceIndex === firstSentence);
      if (!sameSentence) continue;

      const candidatePhrase = windowTokens.map(t => t.clean).join(' ');
      const matchedMWE = MWE_LOOKUP_MAP.get(candidatePhrase);

      if (matchedMWE) {
        matches.push({
          mwe: matchedMWE,
          tokenIds: windowTokens.map(t => t.id),
          startTokenIndex: i,
          endTokenIndex: i + n - 1,
          matchedText: windowTokens.map(t => t.raw).join(' ')
        });

        // Mark indices as used
        for (let k = 0; k < n; k++) {
          usedTokenIndices.add(i + k);
        }
      }
    }
  }

  return matches;
}

/**
 * Lookup an MWE by exact phrase string
 */
export function lookupMWEByPhrase(phrase: string): MultiWordExpression | undefined {
  const norm = phrase.toLowerCase().trim().replace(/[^a-záéíóúñü\s]/g, '');
  return MWE_LOOKUP_MAP.get(norm);
}
