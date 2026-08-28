import { Unit } from '../../types';

export const B2_UNITS_PART1: Unit[] = [
  // UNIT 39: El Pretérito Imperfecto de Subjuntivo
  {
    id: 'unit-b2-39',
    level: 'B2',
    unitNumber: 39,
    title_es: 'Pretérito Imperfecto de Subjuntivo',
    title_en: 'Imperfect Subjunctive (-ra / -se)',
    title_ar: 'الماضي من صيغة المنصوب Imperfecto de Subjuntivo',
    description_en: 'Master deriving the imperfect subjunctive from the 3rd person plural preterite (ellos hablaron -> hablara), both -ra and -se endings, and expressing impossible wishes (¡Ojalá pudiera!).',
    description_ar: 'اشتقاق الماضي من Subjuntivo من صيغة الجمع الغائب للماضي البسيط (ellos hablaron -> hablara)، استخدام نهايتي -ra و -se، والتعبير عن الأمنيات الافتراضية المستحيلة (¡Ojalá pudiera!).',
    lessons: [
      {
        id: 'lesson-b2-39-1',
        unitId: 'unit-b2-39',
        lessonNumber: 1,
        title_es: 'La Regla Universal de Formación: Desde "Ellos" del Indefinido',
        title_en: 'Universal Formation Rule: From 3rd Person Plural Preterite',
        title_ar: 'القاعدة القياسية العالمية: الانطلاق من صيغة الجمع الغائب للماضي',
        cefr: 'B2',
        objectives_en: ['Take 3rd person plural Pretérito Indefinido (hablaron, comieron, vivieron, tuvieron, fueron)', 'Drop "-ron" and add: -ra, -ras, -ra, -ramos (with accent on preceding vowel), -rais, -ran', 'Understand that ALL irregulars inherit their exact preterite root (tuviera, hiciera, pudiera, supiera, fuera)'],
        objectives_ar: ['أخذ صيغة الجمع الغائب في الماضي البسيط (hablaron, comieron, tuvieron, fueron)', 'حذف -ron وإضافة: -ra, -ras, -ra, -ramos (مع إضافة نبرة مكتوبة للمتكلمين), -rais, -ran', 'معرفة أن جميع الأفعال الشاذة ترث جذرها من الماضي مباشرة (tuviera, fuera, hiciera)'],
        vocabWordIds: ['w-hablara', 'w-comiera', 'w-tuviera', 'w-fuera', 'w-hiciera'],
        grammarTopicId: 'g-imperfect-subjunctive',
        dialogue: [
          { speaker: 'Profesor', es: 'Si sabes conjugar "ellos" en indefinido (ellos dijeron), solo quitas "-ron" y tienes el imperfecto de subjuntivo: dijera, dijeras, dijera, dijéramos...', en: 'If you know 3rd person plural preterite (ellos dijeron), just drop "-ron" for imperfect subjunctive: dijera...', ar: 'إذا كنت تعرف تصريف الجمع في الماضي البسيط (ellos dijeron)، فقط احذف -ron لتحصل على dijera, dijéramos...' }
        ],
        exercises: [
          {
            id: 'ex-b2-39-1-1',
            type: 'multiple_choice',
            prompt_es: 'El pretérito imperfecto de subjuntivo de "saber" (ellos supieron) para "yo" es:',
            prompt_en: 'The imperfect subjunctive of "saber" for "yo" is:',
            prompt_ar: 'تصريف فعل saber في Imperfecto de Subjuntivo مع yo هو:',
            options: ['supiera (o supiese)', 'sabiera', 'supa', 'sabría'],
            correctAnswer: 'supiera (o supiese)',
            explanation_en: 'Ellos supieron -> drop -ron -> supiera.',
            explanation_ar: 'صيغة supieron -> نحذف -ron -> تصبح supiera.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences using irregular imperfect subjunctive forms (tuviera, pudiera, supiera, fuera).',
          prompt_ar: 'اكتب 3 جمل مستخدماً أفعال Imperfecto de Subjuntivo الشاذة.',
          minSentences: 3,
          sampleTarget: 'Si tuviera más tiempo libre, estudiaría astronomía y filosofía antigua. Ojalá pudiera viajar al espacio y contemplar la Tierra desde las estrellas. Deseaba que todo el equipo fuera reconocido por su arduo trabajo.'
        }
      },
      {
        id: 'lesson-b2-39-2',
        unitId: 'unit-b2-39',
        lessonNumber: 2,
        title_es: 'Deseos Difíciles o Imposibles: ¡Ojalá tuviera!',
        title_en: 'Challenging or Impossible Wishes: ¡Ojalá tuviera!',
        title_ar: 'الأمنيات الافتراضية المستحيلة أو صعبة المنال: ¡Ojalá tuviera!',
        cefr: 'B2',
        objectives_en: ['Contrast "Ojalá + Presente de Subjuntivo" (Real possible hope: ¡Ojalá haga sol mañana!) with "Ojalá + Imperfecto de Subjuntivo" (Unreal/impossible desire: ¡Ojalá tuviera alas!)', 'Express deep longing and poetic yearnings', 'Use with "Quién pudiera..." (Who could...!)'],
        objectives_ar: ['المقارنة بين Ojalá + المضارع (أمنية ممكنة الحدوث) و Ojalá + الماضي (أمنية مستحيلة أو بعيدة المنال في الحاضر)', 'التعبير عن التوق والشغف الوجداني', 'استخدام التعبير البلاغي ¡Quién pudiera...! (يا ليتني أستطيع...!)'],
        vocabWordIds: ['w-ojala-tuviera', 'w-quien-pudiera', 'w-anhelo', 'w-deseo-imposible', 'w-fantasia'],
        dialogue: [
          { speaker: 'Poeta', es: '¡Ojalá supiera descifrar el secreto de las estrellas y pudiera detener el tiempo en este instante!', en: 'If only I knew how to decipher the secret of the stars and could stop time at this instant!', ar: 'يا ليتني أعرف كيف أفك شفرة النجوم ويا ليتني أستطيع إيقاف الزمن في هذه اللحظة!' }
        ],
        exercises: [
          {
            id: 'ex-b2-39-2-1',
            type: 'multiple_choice',
            prompt_es: 'Para expresar un deseo imposible en el presente (como tener 18 años de nuevo), decimos:',
            prompt_en: 'To express an impossible wish in the present, we say:',
            prompt_ar: 'للتعبير عن أمنية مستحيلة في الوقت الحاضر (كأن أعود بعمر 18 عاماً) نقول:',
            options: ['¡Ojalá tuviera 18 años otra vez!', '¡Ojalá tengo 18 años!', '¡Ojalá tendré 18 años!', '¡Ojalá he tenido 18 años!'],
            correctAnswer: '¡Ojalá tuviera 18 años otra vez!',
            explanation_en: '"Ojalá + Imperfecto de Subjuntivo" expresses an unreal present wish.',
            explanation_ar: '"Ojalá + Imperfecto de Subjuntivo" تعبر عن الأمنية الافتراضية المستحيلة في الحاضر.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 imaginative sentences expressing extraordinary wishes using "¡Ojalá + imperfecto de subjuntivo!" and "¡Quién pudiera...!".',
          prompt_ar: 'اكتب 3 جمل خيالية تعبر فيها عن أمنيات خارقة باستخدام ¡Ojalá + imperfecto de subjuntivo! و ¡Quién pudiera...!.',
          minSentences: 3,
          sampleTarget: '¡Ojalá pudiera hablar todos los idiomas del mundo con perfecta elocuencia! ¡Quién pudiera viajar en el tiempo para conversar con los grandes sabios de la historia! ¡Ojalá existiera una solución mágica e instantánea para erradicar todas las guerras del planeta!'
        }
      },
      {
        id: 'lesson-b2-39-3',
        unitId: 'unit-b2-39',
        lessonNumber: 3,
        title_es: 'La Concordancia Temporal en el Pasado con Subjuntivo',
        title_en: 'Past Tense Sequence with Subjunctive',
        title_ar: 'التطابق والتوافق الزمني في الماضي مع Subjuntivo',
        cefr: 'B2',
        objectives_en: ['When main clause is in past (Indefinido, Imperfecto, Condicional), subordinate subjunctive MUST be Imperfect Subjunctive (Quería que VINIERAS / Me alegró que ESTUVIERAS / Sería bueno que LO HICIERAS)', 'Maintain seamless sequence of tenses across extended discourse', 'Avoid mixing present subjunctive with past main clauses'],
        objectives_ar: ['عندما يكون الفعل الرئيسي في الماضي أو الشرط، يجب أن يكون الفعل التابع في Imperfecto de Subjuntivo بالضرورة', 'الحفاظ على اتساق التسلسل الزمني في الفقرات الطويلة', 'تجنب خلط مضارع المنصوب مع أفعال ماضية رئيسية'],
        vocabWordIds: ['w-concordancia', 'w-pasado-subjuntivo', 'w-pedia-que', 'w-esperaba-que', 'w-sintaxis'],
        dialogue: [
          { speaker: 'Historiadora', es: 'El rey ordenó que los embajadores partieran de inmediato y esperaba que la misión tuviera éxito.', en: 'The king ordered the ambassadors to depart immediately and hoped the mission would succeed.', ar: 'أمر الملك السفراء بأن ينطلقوا على الفور وكان يأمل أن تتكلل المهمة بالنجاح.' }
        ],
        exercises: [
          {
            id: 'ex-b2-39-3-1',
            type: 'multiple_choice',
            prompt_es: '"Mis padres querían que yo ______ (estudiar) medicina."',
            prompt_en: 'Because main verb "querían" is in past, use imperfect subjunctive:',
            prompt_ar: 'نظراً لأن الفعل الرئيسي querían في الماضي، استخدم Imperfecto de Subjuntivo:',
            options: ['estudiara (o estudiase)', 'estudie', 'estudiaré', 'haya estudiado'],
            correctAnswer: 'estudiara (o estudiase)',
            explanation_en: 'Past trigger "querían que" demands imperfect subjunctive: estudiara.',
            explanation_ar: 'فعل الرغبة في الماضي "querían que" يتطلب ماضي Subjuntivo: estudiara.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences narrating past wishes, orders, or emotions from your teachers or family using proper past subjunctive sequence.',
          prompt_ar: 'اكتب 3 جمل تسرد فيها رغبات أو توجيهات سابقة من معلميك أو عائلتك مع مراعاة التطابق الزمني.',
          minSentences: 3,
          sampleTarget: 'Mi abuela siempre deseaba que nosotros fuéramos personas justas, humildes y trabajadoras. El profesor nos pidió encarecidamente que leyéramos la novela completa antes del debate académico. Me alegró muchísimo que mis antiguos compañeros asistieran a mi ceremonia de graduación.'
        }
      },
      {
        id: 'lesson-b2-39-4',
        unitId: 'unit-b2-39',
        lessonNumber: 4,
        title_es: 'Peticiones Ultracorteses con Quisiera, Pudiera y Debiera',
        title_en: 'Ultra-Courteous Requests: Quisiera, Pudiera, Debiera',
        title_ar: 'الطلبات فائقة اللباقة والدبلوماسية: Quisiera و Pudiera و Debiera',
        cefr: 'B2',
        objectives_en: ['Use "Quisiera..." instead of "Quiero" for refined diplomacy', 'Use "¿Pudiera usted indicarme...?" in high-level protocol and diplomatic contexts', 'Understand why imperfect subjunctive softens demands in Spanish'],
        objectives_ar: ['استخدام "Quisiera..." بدلاً من Quiero لإضفاء نبرة دبلوماسية راقية', 'استخدام Pudiera في سياقات البروتوكول والمخاطبات الرسمية العليا', 'فهم دور Imperfecto de Subjuntivo في تلطيف الخطاب وتحويل الأمر إلى رغبة خجولة مهذبة'],
        vocabWordIds: ['w-quisiera', 'w-pudiera', 'w-debiera', 'w-diplomacia', 'w-protocolo'],
        dialogue: [
          { speaker: 'Diplomático', es: 'Quisiera agradecer a las distinguidas delegaciones su presencia y desearía que alcanzáramos un consenso constructivo hoy.', en: 'I would like to thank the distinguished delegations and wish that we reach a constructive consensus.', ar: 'أود أن أشكر الوفود الكريمة على حضورها وأرجو أن نتوصل اليوم إلى توافق بناء.' }
        ],
        exercises: [
          {
            id: 'ex-b2-39-4-1',
            type: 'multiple_choice',
            prompt_es: 'En el registro culto español, "Quisiera hacerle una consulta" es sinónimo extremadamente cortés de:',
            prompt_en: '"Quisiera hacerle una consulta" is a refined courteous synonym for:',
            prompt_ar: 'العبارة الراقية "Quisiera hacerle una consulta" هي مرادف فائق التهذيب لـ:',
            options: ['Me gustaría preguntarle algo / Deseo consultarle algo', '¡Respóndeme ya!', 'No quiero saber nada', 'Tengo que gritarte'],
            correctAnswer: 'Me gustaría preguntarle algo / Deseo consultarle algo',
            explanation_en: '"Quisiera" is the quintessential polite formula for requesting or asking something.',
            explanation_ar: '"Quisiera" هي الصيغة الدبلوماسية الأرقى للطلب والاستفسار.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 highly diplomatic statements you would make when addressing an international academic committee using "Quisiera", "Pudiera", and "Desearía que".',
          prompt_ar: 'اكتب 3 عبارات دبلوماسية رفيعة توجهها للجنة أكاديمية دولية.',
          minSentences: 3,
          sampleTarget: 'Quisiera expresar mi más sincero agradecimiento a este prestigioso comité por su tiempo y consideración. Si me permitieran unos minutos, pudiera presentar los hallazgos principales de nuestra investigación científica. Desearía que este proyecto sirviera como punto de partida para futuras colaboraciones globales.'
        }
      }
    ]
  },

  // UNIT 40: Oraciones Condicionales Irreales de Presente
  {
    id: 'unit-b2-40',
    level: 'B2',
    unitNumber: 40,
    title_es: 'Condicionales Irreales de Presente (Si tuviera... haría)',
    title_en: 'Unreal Present Conditionals (Si tuviera... haría)',
    title_ar: 'الجمل الشرطية الافتراضية في الحاضر (لو كان لدي... لفعلت)',
    description_en: 'Master the second conditional structure: Si + Imperfecto de Subjuntivo + Condicional Simple (Si fuera rico, viajaría por el mundo).',
    description_ar: 'إتقان تركيب الجمل الشرطية من النوع الثاني: Si + Imperfecto de Subjuntivo + Condicional Simple للافتراضات غير الواقعية في الحاضر.',
    lessons: [
      {
        id: 'lesson-b2-40-1',
        unitId: 'unit-b2-40',
        lessonNumber: 1,
        title_es: 'La Estructura Inquebrantable: Si + Subjuntivo (-ra), + Condicional (-ía)',
        title_en: 'The Golden Formula: Si + Imperfect Subjunctive, Condicional',
        title_ar: 'المعادلة الذهبية: Si + ماضي Subjuntivo ، جواب الشرط بـ Condicional',
        cefr: 'B2',
        objectives_en: ['Never put conditional directly after "Si" (NEVER say: Si tendría)', 'Rule: Si + Imperfecto de Subjuntivo (Si tuviera), Condicional Simple (viajaría)', 'Express hypothetical current alternate realities'],
        objectives_ar: ['تجنب الخطأ القاتل بوضع Condicional بعد Si مباشرة (لا يصح إطلاقاً: Si tendría)', 'القاعدة الثابتة: بعد Si يأتي Imperfecto de Subjuntivo وجواب الشرط يأتي بـ Condicional', 'التعبير عن واقع بديل وافتراضات خيالية في الحاضر'],
        vocabWordIds: ['w-si-tuviera', 'w-si-fuera', 'w-si-pudiera', 'w-condicional-irreal', 'w-hipotesis'],
        grammarTopicId: 'g-conditional-clauses',
        dialogue: [
          { speaker: 'Amigo 1', es: 'Si fueras el presidente del país por un día, ¿qué ley cambiarías primero?', en: 'If you were the president of the country for a day, what law would you change first?', ar: 'لو كنت رئيساً للبلاد ليوم واحد، ما هو القانون الأول الذي ستغيره؟' },
          { speaker: 'Amigo 2', es: 'Si tuviera ese poder, invertiría el doble en educación pública y energías limpias.', en: 'If I had that power, I would invest double in public education and clean energy.', ar: 'لو كان لدي ذلك النفوذ، لاستثمرت الضعف في التعليم الحكومي والطاقات النظيفة.' }
        ],
        exercises: [
          {
            id: 'ex-b2-40-1-1',
            type: 'multiple_choice',
            prompt_es: 'Completa la frase condicional: "Si yo ______ (saber) la verdad, te la ______ (decir) ahora mismo."',
            prompt_en: 'Choose the correct pair (Imperfect Subjunctive + Conditional):',
            prompt_ar: 'اختر الزوج الصحيح للشرط الافتراضي في الحاضر:',
            options: ['supiera / diría', 'sabría / dijera', 'sé / diría', 'supiera / digo'],
            correctAnswer: 'supiera / diría',
            explanation_en: 'The second conditional formula is: Si + Imperfect Subjunctive (supiera) + Simple Conditional (diría).',
            explanation_ar: 'معادلة الشرط الثاني: Si + ماضي Subjuntivo (supiera) + جواب الشرط Condicional (diría).'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 hypothetical sentences imagining what you would do if you had unlimited resources, superpowers, or free time.',
          prompt_ar: 'اكتب 3 جمل شرطية افتراضية تتخيل فيها ما ستفعله لو امتلكت موارد لا محدودة أو قوى خارقة.',
          minSentences: 3,
          sampleTarget: 'Si tuviera recursos financieros ilimitados, fundaría centros de investigación científica gratuita en todo el mundo. Si pudiera teletransportarme a cualquier rincón de la Tierra, pasaría cada fin de semana en un continente distinto. Si no necesitara dormir, dedicaría las noches a escribir novelas y componer música.'
        }
      },
      {
        id: 'lesson-b2-40-2',
        unitId: 'unit-b2-40',
        lessonNumber: 2,
        title_es: 'Como si + Imperfecto de Subjuntivo (Comparaciones Irreales)',
        title_en: 'Como si + Imperfect Subjunctive (Unreal Comparisons)',
        title_ar: 'كما لو أن Como si + ماضي Subjuntivo للمقارنات التخيلية',
        cefr: 'B2',
        objectives_en: ['Recognize that "Como si" is ALWAYS followed by Subjunctive (Habla como si fuera un experto / Me mira como si no me conociera)', 'Express dramatic psychological and visual observations', 'Analyze body language and metaphor in literature'],
        objectives_ar: ['معرفة أن أداة التشبيه التخيلي "Como si" تتبع دائماً بـ Subjuntivo', 'التعبير عن الملاحظات السلوكية والنفسية الدرامية (يتحدث كما لو كان خبيراً، ينظر إلي كما لو لم يعرفني)', 'تحليل لغة الجسد والاستعارات الأدبية'],
        vocabWordIds: ['w-como-si', 'w-como-si-fuera', 'w-como-si-supiera', 'w-comparacion-irreal', 'w-actitud'],
        dialogue: [
          { speaker: 'Observador', es: 'Camina con una seguridad imponente, como si fuera el dueño del mundo entero.', en: 'He walks with imposing confidence, as if he were the owner of the whole world.', ar: 'يمشي بثقة مهيبة، كما لو كان مالكاً للعالم بأسره.' }
        ],
        exercises: [
          {
            id: 'ex-b2-40-2-1',
            type: 'multiple_choice',
            prompt_es: 'La locución "como si" en español se construye SIEMPRE con:',
            prompt_en: '"Como si" in Spanish is ALWAYS constructed with:',
            prompt_ar: 'التركيب التشبيهي "como si" في الإسبانية يقترن دائماً بـ:',
            options: ['Pretérito imperfecto o pluscuamperfecto de subjuntivo', 'Presente de indicativo', 'Futuro simple', 'Imperativo'],
            correctAnswer: 'Pretérito imperfecto o pluscuamperfecto de subjuntivo',
            explanation_en: '"Como si" strictly demands past subjunctive tenses (habla como si supiera).',
            explanation_ar: '"Como si" تتطلب دائماً ماضي Subjuntivo.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 vivid descriptive sentences about characters or behaviors using "como si + imperfecto de subjuntivo".',
          prompt_ar: 'اكتب 3 جمل وصفية بليغة لشخصيات أو تصرفات باستخدام como si + ماضي Subjuntivo.',
          minSentences: 3,
          sampleTarget: 'Ese joven prodigio toca el piano con tanta maestría como si llevara cincuenta años sobre los escenarios. Me recibió en su casa con los brazos abiertos, como si fuéramos viejos amigos de la infancia. Actúa con total serenidad en los momentos de crisis, como si no temiera a ninguna tempestad.'
        }
      },
      {
        id: 'lesson-b2-40-3',
        unitId: 'unit-b2-40',
        lessonNumber: 3,
        title_es: 'Dilemas Éticos y Juegos de Rol Hipotéticos',
        title_en: 'Ethical Dilemmas & Hypothetical Roleplays',
        title_ar: 'المعضلات الأخلاقية وتقمص الأدوار الافتراضية',
        cefr: 'B2',
        objectives_en: ['Debate ethical quandaries (The Trolley Problem, Medical triage, AI ethics)', 'Use "En caso de que ocurriera...", "Si te encontraras en esa situación..."', 'Articulate moral reasoning with nuanced linguistic precision'],
        objectives_ar: ['مناقشة المعضلات الأخلاقية المعقدة (معضلة القطار، الفرز الطبي، أخلاقيات الذكاء الاصطناعي)', 'استخدام تراكيب الفرضيات الأخلاقية (لو وجدت نفسك في هذا الموقف...)', 'صياغة المحاكمة الأخلاقية بدقة لغوية رفيعة'],
        vocabWordIds: ['w-dilema-etico', 'w-moral', 'w-conciencia', 'w-responsabilidad', 'w-decision-dificil'],
        dialogue: [
          { speaker: 'Filósofo', es: 'Si tuvieras que elegir entre salvar un monumento histórico milenario o salvar la vida de un desconocido, ¿qué dictaría tu conciencia?', en: 'If you had to choose between saving a millennium-old monument or saving a stranger\'s life...', ar: 'لو كان عليك الاختيار بين إنقاذ أثر تاريخي عمره ألف عام أو إنقاذ حياة شخص غريب، فماذا كان سيملي عليك ضميرك؟' }
        ],
        exercises: [
          {
            id: 'ex-b2-40-3-1',
            type: 'multiple_choice',
            prompt_es: '"Si encontraras una cartera con diez mil euros en la calle, ¿qué harías?" La respuesta ética ideal es:',
            prompt_en: 'The most ethical response in Spanish to this hypothetical scenario is:',
            prompt_ar: 'الرد الأخلاقي الأمثل على هذا الافتراض بالإسبانية هو:',
            options: ['La entregaría de inmediato a la policía para que encuentren al dueño', 'Me la quedaría y saldría corriendo', 'La tiraría a la basura', 'Compraría billetes de lotería'],
            correctAnswer: 'La entregaría de inmediato a la policía para que encuentren al dueño',
            explanation_en: '"La entregaría" correctly uses the conditional mood to resolve the dilemma with integrity.',
            explanation_ar: '"La entregaría" تستخدم صيغة الشرط Condicional لحل المعضلة بأمانة ونزاهة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences resolving a challenging moral dilemma explaining what you would do and why using "Si estuviera en esa posición... haría...".',
          prompt_ar: 'اكتب 3 جمل تحل فيها معضلة أخلاقية صعبة موضحاً ما ستفعله ولماذا.',
          minSentences: 3,
          sampleTarget: 'Si me encontrara en una situación donde tuviera que elegir entre la comodidad personal y la verdad, siempre elegiría defender la justicia. Aunque fuera una decisión dolorosa y me trajera críticas, actuaría conforme a mis principios éticos. Si todos mantuviéramos la integridad moral en los momentos difíciles, la sociedad sería mucho más confiable y solidaria.'
        }
      },
      {
        id: 'lesson-b2-40-4',
        unitId: 'unit-b2-40',
        lessonNumber: 4,
        title_es: 'Simulación de Escenarios Futuros y Toma de Decisiones',
        title_en: 'Future Scenario Simulation & Strategic Decisions',
        title_ar: 'محاكاة السيناريوهات المستقبلية واتخاذ القرارات الاستراتيجية',
        cefr: 'B2',
        objectives_en: ['Simulate corporate, economic, and technological scenarios', 'Use conditional hypothesis matrices (Si el mercado cayera, activaríamos el plan B)', 'Synthesize executive decision-making under uncertainty'],
        objectives_ar: ['محاكاة سيناريوهات الأعمال والاقتصاد والتكنولوجيا في ظروف عدم اليقين', 'استخدام مصفوفة الفرضيات الاستراتيجية (لو انخفضت السوق لنشطنا الخطة البديلة)', 'صياغة القرارات الإدارية التنفيذية بحنكة'],
        vocabWordIds: ['w-simulacion', 'w-estrategia', 'w-plan-de-contingencia', 'w-riesgo', 'w-escenario'],
        dialogue: [
          { speaker: 'Director de Estrategia', es: 'Si se produjera una interrupción imprevista en la cadena de suministros, activaríamos de inmediato nuestros proveedores locales alternativos.', en: 'If an unforeseen disruption occurred in supply chain, we would immediately activate local alternatives.', ar: 'لو حدث انقطاع غير متوقع في سلاسل الإمداد، لقمنا على الفور بتفعيل الموردين المحليين البدلاء.' }
        ],
        exercises: [
          {
            id: 'ex-b2-40-4-1',
            type: 'multiple_choice',
            prompt_es: 'En planificación estratégica: "Si la demanda ______ (aumentar) un 50%, nosotros ______ (duplicar) la producción."',
            prompt_en: 'Choose the conditional pair for strategic simulation:',
            prompt_ar: 'اختر تصريف الشرط الاستراتيجي المناسب للمحاكاة:',
            options: ['aumentara / duplicaríamos', 'aumentaría / duplicáramos', 'aumenta / duplicábamos', 'aumentó / duplicaremos'],
            correctAnswer: 'aumentara / duplicaríamos',
            explanation_en: 'Strategic hypothetical condition: Si aumentara (Subjunctive) + duplicaríamos (Conditional).',
            explanation_ar: 'الفرضية الاستراتيجية: Si aumentara + duplicaríamos.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 strategic contingency sentences for a company or organization using "Si + imperfecto de subjuntivo, + condicional".',
          prompt_ar: 'اكتب 3 جمل استراتيجية لخطط الطوارئ في مؤسسة باستخدام صيغة الشرط الافتراضي.',
          minSentences: 3,
          sampleTarget: 'Si surgiera una crisis económica imprevista, reestructuraríamos nuestros costes operativos sin reducir el personal. Si los clientes solicitaran más servicios digitales, invertiríamos de inmediato en modernizar nuestra infraestructura tecnológica. Si expandiéramos nuestras operaciones a nuevos países, contrataríamos a especialistas locales con amplio conocimiento del mercado.'
        }
      }
    ]
  },

  // UNIT 41: El Pluscuamperfecto de Subjuntivo y Condicional Compuesto
  {
    id: 'unit-b2-41',
    level: 'B2',
    unitNumber: 41,
    title_es: 'Condicionales Irreales de Pasado (Si hubiera sabido...)',
    title_en: 'Third Conditional & Past Regrets (Si hubiera sabido...)',
    title_ar: 'الشرط المستحيل في الماضي والحسرة (لو كنت أعلم لفعلت كذا)',
    description_en: 'Master the third conditional for past regrets and unchangeable history: Si + hubiera/hubiese + participio, habría + participio (Si hubiera sabido, habría ido).',
    description_ar: 'إتقان الشرط من النوع الثالث للماضي الذي فات ولا يمكن تغييره والتعبير عن الندم والحسرة: Si + hubiera + اسم المفعول ، habría + اسم المفعول.',
    lessons: [
      {
        id: 'lesson-b2-41-1',
        unitId: 'unit-b2-41',
        lessonNumber: 1,
        title_es: 'Formación del Pluscuamperfecto de Subjuntivo (Hubiera + Participio)',
        title_en: 'Forming Pluperfect Subjunctive (Hubiera + Past Participle)',
        title_ar: 'صياغة ماضي الأسبقية المنصوب (Hubiera + اسم المفعول)',
        cefr: 'B2',
        objectives_en: ['Conjugate auxiliary HABER in imperfect subjunctive: hubiera, hubieras, hubiera, hubiéramos, hubierais, hubieran (or hubiese)', 'Combine with past participle (hablado, comido, vivido, hecho, dicho, visto)', 'Express past hypothetical actions that never happened'],
        objectives_ar: ['تصريف الفعل المساعد haber في ماضي Subjuntivo: hubiera, hubieras, hubiera, hubiéramos...', 'إضافة اسم المفعول الثابت (comido, hecho, escrito, visto)', 'التعبير عن افتراضات لأحداث ماضية لم تقع على أرض الواقع'],
        vocabWordIds: ['w-hubiera-sabido', 'w-hubiera-hecho', 'w-hubiera-dicho', 'w-pluscuamperfecto-subjuntivo', 'w-pasado-irreal'],
        grammarTopicId: 'g-past-subjunctive-complex',
        dialogue: [
          { speaker: 'Lucas', es: 'Si me hubieras avisado con tiempo, te habría acompañado con mucho gusto al aeropuerto.', en: 'If you had let me know in time, I would have gladly accompanied you to the airport.', ar: 'لو كنت قد أخبرتني مسبقاً في الوقت المناسب، لرافقتك بكل سرور إلى المطار.' },
          { speaker: 'Carla', es: 'No te preocupes, el viaje surgió de manera imprevista a última hora.', en: 'Don’t worry, the trip came up unexpectedly at the last minute.', ar: 'لا تقلق، فقد طرأت الرحلة بشكل مفاجئ في آخر لحظة.' }
        ],
        exercises: [
          {
            id: 'ex-b2-41-1-1',
            type: 'multiple_choice',
            prompt_es: 'Completa el tercer condicional: "Si nosotros ______ (estudiar) más, ______ (aprobar) el examen con mejor nota."',
            prompt_en: 'Choose the correct pair for the 3rd conditional (Past Subjunctive + Compound Conditional):',
            prompt_ar: 'اختر الزوج الصحيح للشرط الثالث في الماضي:',
            options: ['hubiéramos estudiado / habríamos aprobado', 'habríamos estudiado / hubiéramos aprobado', 'estudiáramos / aprobaríamos', 'estudiamos / aprobamos'],
            correctAnswer: 'hubiéramos estudiado / habríamos aprobado',
            explanation_en: 'Third conditional formula: Si + Pluperfect Subjunctive (hubiéramos estudiado) + Compound Conditional (habríamos aprobado).',
            explanation_ar: 'معادلة الشرط الثالث: Si + Pluscuamperfecto de Subjuntivo (hubiéramos estudiado) + Condicional Compuesto (habríamos aprobado).'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences reflecting on past events that could have turned out differently using "Si hubiera... habría...".',
          prompt_ar: 'اكتب 3 جمل تتأمل فيها أحداثاً ماضية كان يمكن أن تنتهي بنتيجة مختلفة باستخدام Si hubiera... habría....',
          minSentences: 3,
          sampleTarget: 'Si hubiera empezado a aprender español hace cinco años, hoy hablaría con la soltura de un nativo. Si no hubiéramos tomado aquel tren equivocado, jamás habríamos descubierto ese pintoresco pueblo medieval. Si hubiera sabido que la conferencia era tan enriquecedora, habría invitado a todos mis compañeros.'
        }
      },
      {
        id: 'lesson-b2-41-2',
        unitId: 'unit-b2-41',
        lessonNumber: 2,
        title_es: 'El Condicional Mixto (Pasado que Influye en el Presente)',
        title_en: 'Mixed Conditionals: Past Cause, Present Effect',
        title_ar: 'الشرط المختلط: سبب في الماضي ونتيجته تؤثر في الحاضر',
        cefr: 'B2',
        objectives_en: ['Combine: Si + Pluscuamperfecto de Subjuntivo (Past Condition), Condicional Simple (Present Consequence)', 'Example: Si hubiera nacido en España, hoy hablaría español perfecto', 'Analyze how historical choices shape current reality'],
        objectives_ar: ['الدمج بين: شرط في الماضي (Si hubiera...) ونتيجة مستمرة في الحاضر بـ Condicional Simple', 'مثال: لو كنت قد ولدت في إسبانيا لكانت لغتي الإسبانية اليوم متقنة تماماً', 'تحليل كيف تشكل القرارات التاريخية الواقع الراهن'],
        vocabWordIds: ['w-condicional-mixto', 'w-consecuencia-presente', 'w-eleccion', 'w-destino', 'w-vida'],
        dialogue: [
          { speaker: 'Historiador', es: 'Si la biblioteca de Alejandría no se hubiera quemado en la antigüedad, hoy tendríamos un conocimiento científico mucho más avanzado.', en: 'If the Library of Alexandria hadn’t burned down in antiquity, today we would have much more advanced knowledge.', ar: 'لو لم تحترق مكتبة الإسكندرية في العصور القديمة، لكان لدينا اليوم معرفة علمية أكثر تقدماً بمراحل.' }
        ],
        exercises: [
          {
            id: 'ex-b2-41-2-1',
            type: 'multiple_choice',
            prompt_es: 'En el condicional mixto: "Si no ______ (estudiar) tanto el año pasado, hoy no ______ (estar) en este puesto directivo."',
            prompt_en: 'Choose the mixed conditional pair (Past cause -> Present result):',
            prompt_ar: 'اختر زوج الشرط المختلط (سبب ماضٍ -> نتيجة حاضرة):',
            options: ['hubiera estudiado / estaría', 'estudiara / habría estado', 'habría estudiado / estuviera', 'hubiera estudiado / haya estado'],
            correctAnswer: 'hubiera estudiado / estaría',
            explanation_en: 'Past pluperfect subjunctive (hubiera estudiado) leads to present simple conditional (estaría).',
            explanation_ar: 'الماضي الأسبق المنصوب (hubiera estudiado) يؤدي إلى جواب شرط حاضر بسيط (estaría).'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 mixed conditional sentences analyzing how past life decisions directly affect your current present.',
          prompt_ar: 'اكتب 3 جمل شرطية مختلطة تحلل فيها كيف تؤثر قرارات ماضية في حياتك على واقعك الحاضر.',
          minSentences: 3,
          sampleTarget: 'Si no hubiera tomado la decisión de estudiar este idioma, hoy no tendría la oportunidad de comunicarme con personas tan extraordinarias. Si mis abuelos no hubieran emigrado a la gran ciudad, hoy viviría en un entorno rural completamente diferente. Si no me hubiera apasionado por la lectura desde niño, hoy no apreciaría la belleza de las palabras con tanta intensidad.'
        }
      },
      {
        id: 'lesson-b2-41-3',
        unitId: 'unit-b2-41',
        lessonNumber: 3,
        title_es: 'Expresar Arrepentimiento y Reproche: ¡Habrías podido...!',
        title_en: 'Regrets, Reproaches & What Could Have Been',
        title_ar: 'التعبير عن الندم واللوم والعتاب: كان بإمكانك أن تفعل كذا!',
        cefr: 'B2',
        objectives_en: ['Use "Habrías podido + infinitivo" (You could have...)', 'Use "Deberías haber + participio" (You should have...)', 'Use "¡Ojalá hubiera sabido...!" for deep wistful regret'],
        objectives_ar: ['استخدام Habrías podido للعتاب البناء (كان بإمكانك أن تخبرني)', 'استخدام Deberías haber + اسم المفعول (كان يجدر بك أن تفعل كذا)', 'استخدام ¡Ojalá hubiera...! للتحسر على ما فات'],
        vocabWordIds: ['w-arrepentimiento', 'w-reproche', 'w-deberias-haber', 'w-habrias-podido', 'w-lamento'],
        dialogue: [
          { speaker: 'Compañero', es: '¡Deberías haberme avisado de que la entrega era hoy! Habríamos podido terminar el trabajo juntos a tiempo.', en: 'You should have let me know the delivery was today! We could have finished together in time.', ar: 'كان يجدر بك أن تنبهني بأن موعد التسليم اليوم! كان بإمكاننا إنهاء العمل معاً في الوقت المحدد.' }
        ],
        exercises: [
          {
            id: 'ex-b2-41-3-1',
            type: 'multiple_choice',
            prompt_es: '"¡Deberías haber tenido más cuidado!" expresa:',
            prompt_en: '"¡Deberías haber tenido más cuidado!" expresses:',
            prompt_ar: '"¡Deberías haber tenido más cuidado!" تعبر عن:',
            options: ['Un reproche o llamada de atención sobre una acción pasada', 'Un plan futuro prometedor', 'Una felicitación alegre', 'Una orden presente'],
            correctAnswer: 'Un reproche o llamada de atención sobre una acción pasada',
            explanation_en: '"Deberías haber + participle" expresses past reproach or regret (You should have been more careful).',
            explanation_ar: '"Deberías haber + اسم المفعول" تعبر عن اللوم والعتاب على تقصير في الماضي.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences expressing constructive feedback or reflections on past missteps using "Deberías haber..." and "Habrías podido...".',
          prompt_ar: 'اكتب 3 جمل تعبر فيها عن ملاحظات بناءة على أخطاء سابقة.',
          minSentences: 3,
          sampleTarget: 'Deberías haber revisado los datos financieros dos veces antes de enviar el informe a la dirección. Habrías podido consultar a un especialista si tenías dudas técnicas durante el proceso. En el futuro debemos comunicarnos con mayor fluidez para evitar malentendidos semejantes.'
        }
      },
      {
        id: 'lesson-b2-41-4',
        unitId: 'unit-b2-41',
        lessonNumber: 4,
        title_es: 'Ucronías y Realidades Históricas Alternativas',
        title_en: 'Uchronias & Alternate Historical Realities',
        title_ar: 'التاريخ البديل والروايات الافتراضية (ماذا لو لم يحدث كذا؟)',
        cefr: 'B2',
        objectives_en: ['Write compelling historical "what-if" analyses (ucronías)', 'Debate major turning points (Columbus, Printing press, Industrial revolution, Moon landing)', 'Synthesize high-level argumentative essays on historical contingency'],
        objectives_ar: ['كتابة تحليلات معمقة للتاريخ البديل الافتراضي (ماذا لو لم تُخترع الطباعة؟)', 'مناقشة المنعطفات التاريخية الكبرى في الحضارة الإنسانية', 'صياغة مقالات فكرية رفيعة حول السببية التاريخية'],
        vocabWordIds: ['w-ucronia', 'w-historia-alternativa', 'w-punto-de-inflexion', 'w-revolucion', 'w-civilizacion'],
        dialogue: [
          { speaker: 'Historiador', es: 'Si Gutenberg no hubiera inventado la imprenta de tipos móviles en el siglo XV, la difusión del conocimiento y la revolución científica se habrían retrasado durante siglos.', en: 'If Gutenberg had not invented the movable type printing press, scientific dissemination would have been delayed for centuries.', ar: 'لو لم يخترع غوتنبرغ الطباعة في القرن الخامس عشر، لتأخر انتشار المعرفة والثورة العلمية لقرون طويلة.' }
        ],
        exercises: [
          {
            id: 'ex-b2-41-4-1',
            type: 'multiple_choice',
            prompt_es: 'Una "ucronía" en la literatura e historia es:',
            prompt_en: 'A "ucronía" (uchronia) in literature and history is:',
            prompt_ar: 'مصطلح "ucronía" (التاريخ البديل) في الأدب والتاريخ يعني:',
            options: ['La reconstrucción imaginaria de la historia basada en qué habría ocurrido si un hecho no hubiera sucedido', 'Un libro de recetas de cocina', 'Un mapa geográfico militar', 'Un diccionario etimológico'],
            correctAnswer: 'La reconstrucción imaginaria de la historia basada en qué habría ocurrido si un hecho no hubiera sucedido',
            explanation_en: 'An uchronia explores alternate historical outcomes if a pivotal event had gone differently.',
            explanation_ar: 'اليوكرونيا هي إعادة بناء تخيلية للتاريخ تستكشف ماذا كان ليحدث لو تغير حدث مفصلي في الماضي.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 4-sentence alternate history analysis imagining how the world would be if a major historical discovery had never happened.',
          prompt_ar: 'اكتب تحليلاً تاريخياً افتراضياً من 4 جمل تتخيل فيه كيف كان ليكون العالم لو لم يقع اكتشاف تاريخي عظيم.',
          minSentences: 4,
          sampleTarget: 'Si Alexander Fleming no hubiera descubierto la penicilina en 1928, millones de personas habrían fallecido a causa de infecciones bacterianas comunes. La medicina moderna no habría podido desarrollar cirugías complejas ni tratamientos avanzados sin el respaldo de los antibióticos. El curso de la demografía y la esperanza de vida mundial habrían sido drásticamente inferiores. Este hallazgo fortuito transformó para siempre el destino de la humanidad.'
        }
      }
    ]
  },

  // UNIT 42: Ser vs Estar Avanzado y Cambios de Significado
  {
    id: 'unit-b2-42',
    level: 'B2',
    unitNumber: 42,
    title_es: 'Ser vs Estar Avanzado: Cambios de Significado',
    title_en: 'Advanced Ser vs Estar: Meaning Shifts',
    title_ar: 'التمييز المتقدم بين Ser و Estar وتغير معاني الصفات',
    description_en: 'Master subtle semantic shifts with adjectives (ser listo = smart vs estar listo = ready; ser bueno = good person vs estar bueno = delicious/attractive; ser atento vs estar atento).',
    description_ar: 'إتقان الفروق الدلالية العميقة للصفات حسب استخدامها مع Ser أو Estar (ser listo ذكي مقابل estar listo جاهز؛ ser rico ثري مقابل estar rico لذيذ الطعم).',
    lessons: [
      {
        id: 'lesson-b2-42-1',
        unitId: 'unit-b2-42',
        lessonNumber: 1,
        title_es: 'Los 10 Adjetivos Clave que Cambian Radicalmente de Sentido',
        title_en: 'The 10 Core Adjectives with Radical Meaning Shifts',
        title_ar: 'الصفات العشر الأساسية التي يتغير معناها جذرياً بين Ser و Estar',
        cefr: 'B2',
        objectives_en: ['Ser listo (smart/clever) vs Estar listo (ready)', 'Ser rico (wealthy) vs Estar rico (delicious food)', 'Ser atento (polite/courteous) vs Estar atento (paying close attention)', 'Ser verde (green color/obscene) vs Estar verde (unripe/inexperienced)'],
        objectives_ar: ['ser listo (ذكي وداهية) مقابل estar listo (مستعد وجاهز)', 'ser rico (غني وثري) مقابل estar rico (لذيذ وشهي)', 'ser atento (مهذب ومجامل) مقابل estar atento (منتبه ومركز)', 'ser verde (أخضر اللون) مقابل estar verde (غير ناضج / قليل الخبرة)'],
        vocabWordIds: ['w-ser-listo', 'w-estar-listo', 'w-ser-rico', 'w-estar-rico', 'w-ser-atento'],
        grammarTopicId: 'g-ser-vs-estar-advanced',
        dialogue: [
          { speaker: 'Chef', es: 'Este empresario es inmensamente rico (wealthy), pero este plato de trufa que preparé está riquísimo (delicious).', en: 'This businessman is immensely wealthy, but this truffle dish is delicious.', ar: 'هذا رجل الأعمال فاحش الثراء، لكن هذا الطبق الذي أعددته في غاية اللذة.' }
        ],
        exercises: [
          {
            id: 'ex-b2-42-1-1',
            type: 'multiple_choice',
            prompt_es: '"El camarero es muy atento, pero hoy no está atento a los clientes" significa:',
            prompt_en: 'What does this sentence express?',
            prompt_ar: 'ماذا تعني هذه الجملة؟',
            options: ['Es una persona educada por naturaleza, pero hoy está distraído', 'Es sordo', 'No trabaja allí', 'Es muy rico'],
            correctAnswer: 'Es una persona educada por naturaleza, pero hoy está distraído',
            explanation_en: 'Ser atento = polite nature; Estar atento = focused state.',
            explanation_ar: 'Ser atento تدل على خلقه المهذب بطبعه، و Estar atento تدل على حالة التركيز والانتباه.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences illustrating the contrasting meanings of adjectives with Ser and Estar (e.g. listo, rico, atento).',
          prompt_ar: 'اكتب 3 جمل تبرز فيها التباين الدلالي للصفات مع Ser و Estar.',
          minSentences: 3,
          sampleTarget: 'Ese científico es sumamente listo y siempre encuentra soluciones ingeniosas a los problemas. Ya tengo las maletas hechas y el coche preparado, así que estoy totalmente listo para salir. El postre casero que preparaste ayer estaba riquísimo.'
        }
      },
      {
        id: 'lesson-b2-42-2',
        unitId: 'unit-b2-42',
        lessonNumber: 2,
        title_es: 'Estar de vs Ser de: Modismos de Estado y Rol',
        title_en: 'Estar de vs Ser de: Idiomatic States & Roles',
        title_ar: 'التعبيرات الاصطلاحية مع Estar de و Ser de',
        cefr: 'B2',
        objectives_en: ['Use "Estar de + sustantivo" for temporary jobs or mood states (estar de guardia, estar de viaje, estar de acuerdo, estar de mal humor)', 'Use "Ser de + origen/material" (ser de Madrid, ser de oro)', 'Handle nuanced daily colloquial expressions'],
        objectives_ar: ['استخدام Estar de للوظائف المؤقتة أو الحالات العابرة (estar de guardia في نوبة حراسة، estar de viaje في سفر)', 'استخدام Ser de للأصل والمنشأ والمادة المصنوع منها الشيء', 'استخدام التعبيرات الاصطلاحية الشائعة بطلاقة'],
        vocabWordIds: ['w-estar-de-guardia', 'w-estar-de-viaje', 'w-estar-de-acuerdo', 'w-ser-de', 'w-estado-temporal'],
        dialogue: [
          { speaker: 'Doctora', es: 'Hoy estoy de guardia en urgencias del hospital hasta las ocho de la mañana.', en: 'Today I am on duty in the hospital emergency room until 8 AM.', ar: 'أنا اليوم في نوبة مناوبة بقسم الطوارئ في المستشفى حتى الثامنة صباحاً.' }
        ],
        exercises: [
          {
            id: 'ex-b2-42-2-1',
            type: 'multiple_choice',
            prompt_es: '"Estar de guardia" significa que un profesional:',
            prompt_en: '"Estar de guardia" means a professional is:',
            prompt_ar: '"Estar de guardia" تعني أن المهني:',
            options: ['En turno de servicio de guardia disponible para emergencias', 'De vacaciones en la playa', 'Despedido del trabajo', 'Durmiendo en su casa'],
            correctAnswer: 'En turno de servicio de guardia disponible para emergencias',
            explanation_en: '"Estar de guardia" means on call / on duty for emergency shifts.',
            explanation_ar: '"Estar de guardia" تعني في نوبة مناوبة أو حراسة طارئة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences using "estar de" idioms (e.g. estar de viaje, estar de broma, estar de acuerdo).',
          prompt_ar: 'اكتب 3 جمل مستخدماً تعبيرات اصطلاحية مع estar de.',
          minSentences: 3,
          sampleTarget: 'Mi hermano no está en la ciudad porque está de viaje de negocios en Barcelona. No te enfades por lo que dijo, solo estaba de broma para animar el ambiente. Estamos totalmente de acuerdo en las cláusulas principales del nuevo contrato.'
        }
      },
      {
        id: 'lesson-b2-42-3',
        unitId: 'unit-b2-42',
        lessonNumber: 3,
        title_es: 'Ser y Estar con Participios: Acción vs Estado Resultante',
        title_en: 'Ser vs Estar with Participles: Action vs Result',
        title_ar: 'Ser و Estar مع أسماء المفعول: الحدث المستمر مقابل الحالة الناتجة',
        cefr: 'B2',
        objectives_en: ['Ser + Participio = Passive Action (La casa FUE CONSTRUIDA por mi abuelo en 1950)', 'Estar + Participio = Resulting State (La casa ESTÁ CONSTRUIDA con materiales ecológicos)', 'Distinguish process from consequence'],
        objectives_ar: ['Ser + اسم المفعول = المبني للمجهول الدال على وقوع الفعل في نقطة زمنية', 'Estar + اسم المفعول = الحالة الناتجة القائمة التي نراها الآن', 'التمييز الدقيق بين عملية الفعل ونتيجة الفعل'],
        vocabWordIds: ['w-fue-construido', 'w-esta-construido', 'w-fue-abierto', 'w-esta-abierto', 'w-estado-resultante'],
        dialogue: [
          { speaker: 'Guía', es: 'La catedral fue construida en el siglo XIII (acción histórica con SER) y actualmente está perfectamente conservada (estado resultante con ESTAR).', en: 'The cathedral was built in 13th century (action: ser) and is preserved (state: estar).', ar: 'شُيدت الكاتدرائية في القرن الثالث عشر (حدث: ser) وهي حالياً بحالة حفظ ممتازة (حالة ناتجة: estar).' }
        ],
        exercises: [
          {
            id: 'ex-b2-42-3-1',
            type: 'multiple_choice',
            prompt_es: '"La puerta ______ (cerrar) por el vigilante a las diez" vs "A las once la puerta ya ______ (cerrar)."',
            prompt_en: 'Choose the correct pair (Action with SER vs State with ESTAR):',
            prompt_ar: 'اختر الزوج الصحيح (الحدث مع SER مقابل الحالة الناتجة مع ESTAR):',
            options: ['fue cerrada / estaba cerrada', 'estaba cerrada / fue cerrada', 'era cerrada / era cerrada', 'estuvo cerrada / estaba cerrada'],
            correctAnswer: 'fue cerrada / estaba cerrada',
            explanation_en: 'Action by an agent takes SER (fue cerrada); resulting state takes ESTAR (estaba cerrada).',
            explanation_ar: 'الفعل الذي قام به الفاعل يأخذ SER (fue cerrada) والحالة الناتجة تأخذ ESTAR (estaba cerrada).'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 pairs of sentences contrasting the action (Ser + participle) with the resulting state (Estar + participle).',
          prompt_ar: 'اكتب 3 أزواج من الجمل تقارن فيها بين الحدث مع Ser والحالة الناتجة مع Estar.',
          minSentences: 3,
          sampleTarget: 'El puente histórico fue restaurado por ingenieros expertos el año pasado. Hoy en día el puente está totalmente abierto al tránsito peatonal. Las invitaciones fueron enviadas a tiempo y la sala de conferencias está perfectamente decorada.'
        }
      },
      {
        id: 'lesson-b2-42-4',
        unitId: 'unit-b2-42',
        lessonNumber: 4,
        title_es: 'Ser y Estar en la Caracterización Psicológica y Literaria',
        title_en: 'Ser & Estar in Psychological & Literary Portraits',
        title_ar: 'Ser و Estar في رسم الشخصيات النفسية والأدبية المعقدة',
        cefr: 'B2',
        objectives_en: ['Paint multi-layered psychological portraits in Spanish', 'Synthesize essential identity (ser leal, ser melancólico) and transient psychological pressures (estar agobiado, estar deslumbrado)', 'Author rich literary character descriptions'],
        objectives_ar: ['رسم لوحات نفسية متعددة الأبعاد للشخصيات في الأدب', 'الدمج بين الهوية والطباع الجوهرية (ser) والضغوط والمشاعر العابرة (estar)', 'كتابة نصوص سردية متقدمة تفيض بالدقة والجمال'],
        vocabWordIds: ['w-retrato-psicologico', 'w-identidad', 'w-agobiado', 'w-leal', 'w-serenidad'],
        dialogue: [
          { speaker: 'Novelista', es: 'Don Rodrigo era un hombre generoso y leal por naturaleza, pero en aquellos días de invierno estaba profundamente abatido por la soledad.', en: 'Don Rodrigo was generous and loyal by nature, but in those winter days he was deeply despondent from loneliness.', ar: 'كان دون رودريغو رجلاً كريماً ومخلصاً بطبعه، لكنه في تلك الأيام الشتوية كان يشعر بكآبة عميقة من فرط الوحدة.' }
        ],
        exercises: [
          {
            id: 'ex-b2-42-4-1',
            type: 'multiple_choice',
            prompt_es: 'En una descripción literaria, la frase "Aunque ella es optimista, hoy está desanimada" demuestra:',
            prompt_en: 'What does this literary contrast illustrate?',
            prompt_ar: 'ماذا يوضح هذا التقابل الأدبي؟',
            options: ['El contraste perfecto entre un rasgo de personalidad intrínseco (SER) y un estado emocional transitorio (ESTAR)', 'Que la persona no tiene sentimientos', 'Que habla otro idioma', 'Un error gramatical'],
            correctAnswer: 'El contraste perfecto entre un rasgo de personalidad intrínseco (SER) y un estado emocional transitorio (ESTAR)',
            explanation_en: 'SER captures core identity; ESTAR captures temporary emotional states.',
            explanation_ar: 'Ser تصف السمة الجوهرية الدائمة للشخصية، بينما Estar تصف الحالة المزاجية العارضة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence psychological character portrait balancing intrinsic personality traits (SER) with temporary emotional states (ESTAR).',
          prompt_ar: 'اكتب وصفاً نفسياً لشخصية من 3 جمل يوازن بين الطباع الجوهرية (Ser) والحالات المزاجية المؤقتة (Estar).',
          minSentences: 3,
          sampleTarget: 'El protagonista era una persona extremadamente sabia, reflexiva y serena por naturaleza. No obstante, en aquel momento crucial estaba sumamente inquieto por el destino de su familia. A pesar de que la situación era crítica, supo mantener la calma y actuar con determinación.'
        }
      }
    ]
  }
];
