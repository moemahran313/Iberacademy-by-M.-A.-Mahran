import { Unit } from '../../types';

export const B1_UNITS_PART2: Unit[] = [
  // UNIT 31: El Condicional Simple: Cortesía y Consejos
  {
    id: 'unit-b1-31',
    level: 'B1',
    unitNumber: 31,
    title_es: 'El Condicional Simple: Cortesía e Hipótesis',
    title_en: 'Simple Conditional: Politeness & Advice',
    title_ar: 'الشرط البسيط Condicional: اللباقة وإسداء النصائح',
    description_en: 'Master forming the Conditional (-ía, -ías, -ía...), giving empathetic advice (Yo que tú / Yo en tu lugar), and polite requests (¿Podrías...?).',
    description_ar: 'صياغة صيغة الشرط البسيط بلاحقة -ía، إسداء النصائح الودية (لو كنت مكانك لفعلت كذا)، وتقديم الطلبات المهذبة الراقية.',
    lessons: [
      {
        id: 'lesson-b1-31-1',
        unitId: 'unit-b1-31',
        lessonNumber: 1,
        title_es: 'Formación del Condicional Simple Regular e Irregular',
        title_en: 'Forming Regular & Irregular Simple Conditional',
        title_ar: 'صياغة الشرط البسيط المنتظم والشاذ',
        cefr: 'B1',
        objectives_en: ['Add -ía, -ías, -ía, -íamos, -íais, -ían to the full infinitive', 'Use the EXACT same irregular stems as the Future (tendría, haría, sabría, podría, vendría, diría)', 'Distinguish between future (haré) and conditional (haría)'],
        objectives_ar: ['إضافة لاحقة -ía إلى المصدر الكامل لجميع الأفعال', 'استخدام نفس الجذور الشاذة لزمن المستقبل تماماً (tendr-, har-, sabr-, podr-, vendr-, dir-)', 'التمييز بين المستقبل والشرط البسيط'],
        vocabWordIds: ['w-hablaria', 'w-comeria', 'w-tendria', 'w-haria', 'w-podria'],
        grammarTopicId: 'g-conditional-simple',
        dialogue: [
          { speaker: 'Viajero', es: 'Me encantaría visitar la Patagonia argentina el próximo año.', en: 'I would love to visit Argentine Patagonia next year.', ar: 'يسعدني للغاية أن أزور باتاغونيا الأرجنتينية في العام القادم.' },
          { speaker: 'Guía', es: 'Sería una experiencia inolvidable. Tendrías paisajes impresionantes todos los días.', en: 'It would be an unforgettable experience. You would have stunning landscapes every day.', ar: 'ستكون تجربة لا تُنسى. ستحظى بمناظر طبيعية خلابة كل يوم.' }
        ],
        exercises: [
          {
            id: 'ex-b1-31-1-1',
            type: 'multiple_choice',
            prompt_es: 'El condicional simple de "hacer" para "yo" y "él" es:',
            prompt_en: 'The simple conditional of HACER for "yo" / "él" is:',
            prompt_ar: 'تصريف فعل hacer في صيغة الشرط البسيط مع yo و él هو:',
            options: ['haría', 'hacería', 'hiciera', 'haré'],
            correctAnswer: 'haría',
            explanation_en: 'Stem "har-" + ía = haría.',
            explanation_ar: 'الجذر har- + ía = haría.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences expressing things you would love to do, buy, or visit if you had total freedom.',
          prompt_ar: 'اكتب 3 جمل تعبر فيها عما يسعدك فعله أو شراؤه أو زيارته في ظروف مثالية.',
          minSentences: 3,
          sampleTarget: 'Me encantaría vivir un año en una hermosa ciudad mediterránea. Aprendería a cocinar todos los platos tradicionales con chefs locales. Haría excursiones en barco por las calas cristalinas cada fin de semana.'
        }
      },
      {
        id: 'lesson-b1-31-2',
        unitId: 'unit-b1-31',
        lessonNumber: 2,
        title_es: 'Fórmulas de Cortesía Suprema: ¿Podría...?, ¿Le importaría...?',
        title_en: 'Supreme Politeness Formulas in Spanish',
        title_ar: 'أرقى صيغ اللباقة والطلب المهذب في الإسبانية',
        cefr: 'B1',
        objectives_en: ['Use "¿Podría / Podrías + infinitivo?" for ultra-polite requests', 'Use "¿Le importaría / Te importaría + infinitivo?"', 'Use "Desearía / Quisiera" in restaurants, hotels, and formal settings'],
        objectives_ar: ['استخدام ¿Podrías / Podría للطلب المهذب بدلاً من صيغة الأمر الجافة', 'استخدام هل تمانع لو...؟ ¿Te importaría...?', 'استخدام Desearía و Quisiera في الفنادق والمطاعم والمكاتب'],
        vocabWordIds: ['w-podria', 'w-desearia', 'w-importaria', 'w-cortesia', 'w-favor'],
        dialogue: [
          { speaker: 'Cliente', es: 'Disculpe, ¿podría traerme un poco más de agua y la cuenta cuando pueda?', en: 'Excuse me, could you bring me a bit more water and the bill whenever you can?', ar: 'عفواً، هل يمكنك أن تحضر لي المزيد من الماء والحساب حين يتيسر لك؟' },
          { speaker: 'Camarero', es: 'Por supuesto, se lo traigo en un momento.', en: 'Of course, I’ll bring it in a moment.', ar: 'بكل سرور، سأجلبه لك في الحال.' }
        ],
        exercises: [
          {
            id: 'ex-b1-31-2-1',
            type: 'multiple_choice',
            prompt_es: 'La forma más elegante y cortés para pedir un favor a un desconocido es:',
            prompt_en: 'The most elegant and courteous way to ask a favor from a stranger is:',
            prompt_ar: 'الصيغة الأكثر تهذيباً وأناقة لطلب خدمة من شخص غريب هي:',
            options: ['¿Podría ayudarme, por favor?', '¡Ayúdame ahora!', 'Quiero tu ayuda', 'Tienes que ayudarme'],
            correctAnswer: '¿Podría ayudarme, por favor?',
            explanation_en: 'Conditional "Podría" expresses the highest level of respectful request.',
            explanation_ar: 'صيغة الشرط "Podría" تعبر عن أسمى درجات الاحترام واللباقة في الطلب.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 highly polite requests you would make at an international hotel reception using conditional forms.',
          prompt_ar: 'اكتب 3 طلبات غاية في اللباقة في مكتب استقبال فندق دولي.',
          minSentences: 3,
          sampleTarget: 'Buenas tardes, ¿podría indicarme cómo llegar al centro histórico en metro? ¿Le importaría guardarme la maleta en recepción hasta la hora de mi vuelo? Desearía solicitar una habitación tranquila con vistas al jardín.'
        }
      },
      {
        id: 'lesson-b1-31-3',
        unitId: 'unit-b1-31',
        lessonNumber: 3,
        title_es: 'Dar Consejos Empáticos: Yo que tú / Yo en tu lugar',
        title_en: 'Giving Empathetic Advice: Yo en tu lugar',
        title_ar: 'إسداء النصائح الودية: لو كنت مكانك / في موقفك',
        cefr: 'B1',
        objectives_en: ['Use "Yo en tu lugar + condicional" (Yo en tu lugar descansaría)', 'Use "Yo que tú + condicional" (Yo que tú hablaría con el jefe)', 'Use "Deberías + infinitivo" (Deberías tomarte unas vacaciones)'],
        objectives_ar: ['استخدام Yo en tu lugar + Condicional لتقمص مكان الشخص وتقديم النصيحة', 'استخدام Yo que tú + Condicional في الحوارات الودية', 'استخدام Deberías للتوجيه اللطيف'],
        vocabWordIds: ['w-en-tu-lugar', 'w-yo-que-tu', 'w-deberias', 'w-consejo', 'w-decision'],
        dialogue: [
          { speaker: 'Marta', es: 'No sé si aceptar la oferta de trabajo en el extranjero o quedarme en mi ciudad.', en: 'I don’t know whether to accept the job offer abroad or stay in my city.', ar: 'لا أعرف هل أقبل عرض العمل في الخارج أم أبقى في مدينتي.' },
          { speaker: 'Pablo', es: 'Yo que tú aceptaría la oferta. Es una gran oportunidad y ganarías una experiencia internacional incalculable.', en: 'If I were you I would accept the offer. You would gain invaluable international experience.', ar: 'لو كنت مكانك لقبلت العرض. إنها فرصة عظيمة وستكتسب خبرة دولية لا تقدر بثمن.' }
        ],
        exercises: [
          {
            id: 'ex-b1-31-3-1',
            type: 'multiple_choice',
            prompt_es: 'Completa el consejo: "Yo que tú ______ (hablar) con el médico antes de tomar esa medicina."',
            prompt_en: 'Choose the conditional form after "Yo que tú":',
            prompt_ar: 'اختر تصريف الشرط البسيط بعد Yo que tú:',
            options: ['hablaría', 'hablo', 'hablé', 'hables'],
            correctAnswer: 'hablaría',
            explanation_en: '"Yo que tú" triggers the conditional mood: hablaría.',
            explanation_ar: '"Yo que tú" تتطلب دائماً صيغة الشرط البسيط: hablaría.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 helpful pieces of advice to a friend facing a big life dilemma using "Yo en tu lugar", "Yo que tú", and "Deberías".',
          prompt_ar: 'اكتب 3 نصائح قيمة لصديق يواجه حيرة في اتخاذ قرار مصيري.',
          minSentences: 3,
          sampleTarget: 'Yo en tu lugar me tomaría un par de días de reflexión tranquila antes de tomar una decisión definitiva. Yo que tú consultaría la opinión de un profesional con experiencia en el sector. Deberías confiar en tu intuición y seguir lo que verdaderamente te apasiona.'
        }
      },
      {
        id: 'lesson-b1-31-4',
        unitId: 'unit-b1-31',
        lessonNumber: 4,
        title_es: 'El Condicional de Probabilidad en el Pasado',
        title_en: 'Past Conjecture with Conditional',
        title_ar: 'الشرط البسيط للتخمين والاحتمال في الماضي',
        cefr: 'B1',
        objectives_en: ['Understand conditional for past speculation (¿Qué hora sería? - Serían las ocho = It was probably 8)', 'Contrast with Future of present speculation (¿Qué hora será? - Serán las ocho)', 'Express chronological past conjectures'],
        objectives_ar: ['استخدام Condicional للتخمين في الماضي (كم كانت الساعة يا ترى؟ - لعلها كانت الثامنة)', 'المقارنة مع استخدام المستقبل للتخمين في الحاضر', 'صياغة افتراضات متماسكة حول أحداث ماضية'],
        vocabWordIds: ['w-serian', 'w-estaria', 'w-tendria-anos', 'w-conjetura', 'w-pasado'],
        dialogue: [
          { speaker: 'Policía', es: '¿A qué hora ocurrió el incidente anoche?', en: 'At what time did the incident occur last night?', ar: 'في أي وقت وقع الحادث الليلة الماضية؟' },
          { speaker: 'Testigo', es: 'No llevaba reloj, pero serían las once de la noche cuando escuché el ruido.', en: 'I wasn’t wearing a watch, but it was probably 11 PM when I heard the noise.', ar: 'لم أكن أرتدي ساعة، لكن الوقت كان قرابة الحادية عشرة ليلاً حين سمعت الصوت.' }
        ],
        exercises: [
          {
            id: 'ex-b1-31-4-1',
            type: 'multiple_choice',
            prompt_es: '"Ayer María no vino a trabajar, estaría enferma" expresa:',
            prompt_en: '"Ayer María no vino, estaría enferma" expresses:',
            prompt_ar: 'العبارة "Ayer María no vino, estaría enferma" تعبر عن:',
            options: ['Una conjetura o hipótesis sobre el pasado', 'Una orden obligatoria', 'Un plan futuro seguro', 'Un deseo para mañana'],
            correctAnswer: 'Una conjetura o hipótesis sobre el pasado',
            explanation_en: 'The conditional expresses probability about a past event (She was probably sick).',
            explanation_ar: 'صيغة Condicional هنا تعبر عن التخمين والترجيح لحدث في الماضي (لعلها كانت مريضة).'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 speculative sentences guessing past reasons why someone didn’t show up or why something happened using past probability.',
          prompt_ar: 'اكتب 3 جمل تخمينية تفسر فيها أسباب حدث ماضٍ باستخدام صيغة الاحتمال في الماضي.',
          minSentences: 3,
          sampleTarget: 'Ayer mi compañero no contestó a mis llamadas; tendría el teléfono sin batería. Cuando llegamos al museo estaba cerrado; tendrían horario especial de festivo. Serían las diez de la noche cuando terminó el emocionante partido.'
        }
      }
    ]
  },

  // UNIT 32: Oraciones Temporales y Conectores de Subjuntivo
  {
    id: 'unit-b1-32',
    level: 'B1',
    unitNumber: 32,
    title_es: 'Conectores Temporales y Subjuntivo',
    title_en: 'Temporal Connectors & Subjunctive',
    title_ar: 'الروابط الزمنية وصيغة المنصوب Subjuntivo',
    description_en: 'Master the universal rule: Cuando + Subjunctive for the Future (Cuando llegue a casa) vs Indicative for Habits/Past (Cuando llego / Cuando llegué), plus En cuanto, Antes de que, and Para que.',
    description_ar: 'إتقان القاعدة الذهبية: Cuando + Subjunctive عند الإشارة للمستقبل، مقابل Indicativo للعادات والماضي، مع روابط En cuanto و Antes de que و Para que.',
    lessons: [
      {
        id: 'lesson-b1-32-1',
        unitId: 'unit-b1-32',
        lessonNumber: 1,
        title_es: 'Cuando + Subjuntivo (Futuro) vs Cuando + Indicativo (Hábito/Pasado)',
        title_en: 'Cuando: Subjunctive (Future) vs Indicative (Habit/Past)',
        title_ar: 'عندما Cuando: مع Subjuntivo للمستقبل ومع Indicativo للعادات والماضي',
        cefr: 'B1',
        objectives_en: ['Use Subjunctive after Cuando when referring to future, unexperienced events (Cuando termine, te llamaré)', 'Use Indicative after Cuando for routines (Cuando termino, me voy) and past facts (Cuando terminé, me fui)', 'Never use future tense after Cuando in Spanish'],
        objectives_ar: ['استخدام Subjuntivo بعد Cuando عند الإشارة إلى حدث مستقبلي لم يقع بعد', 'استخدام Indicativo للروتين المتكرر أو الأحداث الماضية', 'تجنب وضع زمن المستقبل مباشرة بعد Cuando باللغة الإسبانية'],
        vocabWordIds: ['w-cuando', 'w-futuro', 'w-rutina', 'w-tiempo', 'w-conector'],
        grammarTopicId: 'g-temporal-subjunctive',
        dialogue: [
          { speaker: 'Marta', es: 'Cuando llegue a España el próximo mes, me matricularé en la universidad (Futuro -> Subjuntivo).', en: 'When I arrive in Spain next month, I will enroll in university.', ar: 'حين أصل إلى إسبانيا الشهر القادم، سأسجل في الجامعة (مستقبل -> Subjuntivo).' },
          { speaker: 'David', es: 'Cada vez que visito España, disfruto muchísimo de la comida (Hábito -> Indicativo).', en: 'Every time I visit Spain, I really enjoy the food.', ar: 'كلما زرت إسبانيا أستمتع كثيراً بالطعام (عادة -> Indicativo).' }
        ],
        exercises: [
          {
            id: 'ex-b1-32-1-1',
            type: 'multiple_choice',
            prompt_es: 'Completa la referencia futura: "Cuando yo ______ (tener) tiempo libre mañana, te ayudaré con la mudanza."',
            prompt_en: 'Because it refers to a future time ("mañana"), use subjunctive:',
            prompt_ar: 'نظراً لأنها إشارة مستقبلية (mañana)، اختر صيغة Subjuntivo:',
            options: ['tenga', 'tengo', 'tendré', 'tuve'],
            correctAnswer: 'tenga',
            explanation_en: '"Cuando" referring to future actions strictly requires the subjunctive: tenga.',
            explanation_ar: '"Cuando" الدالة على المستقبل تتطلب بالضرورة صيغة Subjuntivo: tenga.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences declaring what you will do when you achieve certain future milestones using "Cuando + subjuntivo".',
          prompt_ar: 'اكتب 3 جمل تعلن فيها عما ستفعله عند تحقيق إنجازات مستقبلية باستخدام Cuando + Subjuntivo.',
          minSentences: 3,
          sampleTarget: 'Cuando domine el idioma español con total fluidez, buscaré un trabajo en una empresa internacional. Cuando termine mis exámenes finales, viajaré a la costa para relajarme con mis amigos. Cuando tenga mi propia casa, adoptaré un perro cariñoso.'
        }
      },
      {
        id: 'lesson-b1-32-2',
        unitId: 'unit-b1-32',
        lessonNumber: 2,
        title_es: 'En cuanto, Tan pronto como y Hasta que',
        title_en: 'En cuanto, Tan pronto como & Hasta que',
        title_ar: 'بمجرد أن En cuanto، في أسرع وقت، وإلى أن Hasta que',
        cefr: 'B1',
        objectives_en: ['Use "En cuanto / Tan pronto como + subjuntivo" for immediacy in future (En cuanto sepa algo, te aviso)', 'Use "Hasta que + subjuntivo" for future boundaries (Esperaré hasta que llegues)', 'Handle rapid communicative timing'],
        objectives_ar: ['استخدام En cuanto و Tan pronto como للدلالة على الفورية المستقبلية', 'استخدام Hasta que لتحديد سقف الانتظار المستقبلي', 'إدارة التوقيت الحواري بدقة وسرعة بديهة'],
        vocabWordIds: ['w-en-cuanto', 'w-tan-pronto-como', 'w-hasta-que', 'w-inmediato', 'w-aviso'],
        dialogue: [
          { speaker: 'Jefe', es: 'En cuanto recibas la confirmación del cliente, envíame un mensaje urgente.', en: 'As soon as you receive the client’s confirmation, send me an urgent message.', ar: 'بمجرد أن تتسلم تأكيد العميل، أرسل لي رسالة عاجلة.' },
          { speaker: 'Asistente', es: 'No se preocupe, me quedaré en la oficina hasta que el contrato esté firmado.', en: 'Don’t worry, I’ll stay in the office until the contract is signed.', ar: 'لا تقلق، سأبقى في المكتب إلى أن يتم توقيع العقد.' }
        ],
        exercises: [
          {
            id: 'ex-b1-32-2-1',
            type: 'multiple_choice',
            prompt_es: 'Tan pronto como nosotros ______ (llegar) al hotel esta noche, os llamaremos.',
            prompt_en: 'Choose the correct subjunctive for future immediacy:',
            prompt_ar: 'اختر صيغة Subjuntivo المناسبة للدلالة على الفورية المستقبلية:',
            options: ['lleguemos', 'llegamos', 'llegaremos', 'llegáramos'],
            correctAnswer: 'lleguemos',
            explanation_en: '"Tan pronto como" with future reference takes subjunctive: lleguemos.',
            explanation_ar: '"Tan pronto como" مع المستقبل تتطلب صيغة Subjuntivo: lleguemos.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 urgent organizational commitments using "En cuanto", "Tan pronto como", and "Hasta que".',
          prompt_ar: 'اكتب 3 التزامات تنظيمية فورية باستخدام أدوات الربط الزمنية الثلاث.',
          minSentences: 3,
          sampleTarget: 'En cuanto reciba el correo con las instrucciones, me pondré a trabajar en el proyecto. Tan pronto como termines tus tareas, saldremos a cenar a nuestro restaurante favorito. Me quedaré estudiando en la biblioteca hasta que cierren las puertas esta noche.'
        }
      },
      {
        id: 'lesson-b1-32-3',
        unitId: 'unit-b1-32',
        lessonNumber: 3,
        title_es: 'Antes de que (Siempre Subjuntivo) vs Después de que',
        title_en: 'Antes de que (Always Subjunctive) vs Después de que',
        title_ar: 'قبل أن Antes de que (دائماً مع Subjuntivo) مقابل بعد أن',
        cefr: 'B1',
        objectives_en: ['Recognize that "Antes de que" ALWAYS takes Subjunctive in Spanish without exception (Antes de que sea tarde, Antes de que salgas)', 'Use "Después de que + subjuntivo" (future) / "Después de que + indicativo" (past)', 'Prevent preemptive errors'],
        objectives_ar: ['معرفة أن أداة Antes de que تقترن دائماً وبدون استثناء بصيغة Subjuntivo', 'استخدام Después de que مع Subjuntivo للمستقبل ومع Indicativo للماضي', 'تجنب الأخطاء الشائعة في تسلسل الأحداث'],
        vocabWordIds: ['w-antes-de-que', 'w-despues-de-que', 'w-tiempo', 'w-secuencia', 'w-precaucion'],
        dialogue: [
          { speaker: 'Madre', es: 'Abrígate bien antes de que salgas de casa, que hace mucho frío.', en: 'Bundle up well before you leave the house, as it’s very cold.', ar: 'ارتدِ ملابس دافئة قبل أن تخرج من المنزل، فالجو بارد للغاية.' }
        ],
        exercises: [
          {
            id: 'ex-b1-32-3-1',
            type: 'multiple_choice',
            prompt_es: 'La locución "Antes de que" se construye en español:',
            prompt_en: 'The connector "Antes de que" is followed by:',
            prompt_ar: 'أداة الربط "Antes de que" يتبعها في الإسبانية:',
            options: ['SIEMPRE por el modo Subjuntivo', 'Siempre por el modo Indicativo', 'Solo por imperativo', 'Solo por gerundio'],
            correctAnswer: 'SIEMPRE por el modo Subjuntivo',
            explanation_en: '"Antes de que" is a permanent trigger for the subjunctive mood.',
            explanation_ar: '"Antes de que" تتطلب دائماً وبشكل مطلق صيغة Subjuntivo.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 prudent precautionary sentences using "Antes de que + subjuntivo".',
          prompt_ar: 'اكتب 3 جمل تحذيرية وقائية باستخدام Antes de que + Subjuntivo.',
          minSentences: 3,
          sampleTarget: 'Debemos guardar todos los archivos de trabajo antes de que se apague el ordenador. Cierra bien todas las ventanas antes de que empiece la tormenta. Repasa tus apuntes con atención antes de que comience el examen de evaluación.'
        }
      },
      {
        id: 'lesson-b1-32-4',
        unitId: 'unit-b1-32',
        lessonNumber: 4,
        title_es: 'Conectores de Finalidad: Para que y A fin de que',
        title_en: 'Purpose Connectors: Para que & A fin de que',
        title_ar: 'روابط الغاية والهدف: لكي Para que ومن أجل أن',
        cefr: 'B1',
        objectives_en: ['Same Subject = "Para + infinitivo" (Estudio para aprender)', 'Different Subject = "Para que + subjuntivo" (Te lo explico para que me entiendas)', 'Articulate complex intentional objectives in writing and speaking'],
        objectives_ar: ['اتحاد الفاعل = Para + المصدر (Estudio para mejorar)', 'اختلاف الفاعل = Para que + Subjuntivo (Hablo claro para que me entiendas)', 'صياغة أهداف وغايات معقدة بوضوح واحترافية'],
        vocabWordIds: ['w-para-que', 'w-a-fin-de-que', 'w-proposito', 'w-objetivo', 'w-meta'],
        dialogue: [
          { speaker: 'Profesor', es: 'He preparado estos resúmenes detallados para que los estudiantes comprendan mejor los conceptos.', en: 'I have prepared these detailed summaries so that students understand the concepts better.', ar: 'لقد أعددت هذه الملخصات التفصيلية لكي يفهم الطلاب المفاهيم بشكل أفضل.' }
        ],
        exercises: [
          {
            id: 'ex-b1-32-4-1',
            type: 'multiple_choice',
            prompt_es: 'Te doy las llaves para que tú ______ (poder) entrar sin esperar.',
            prompt_en: 'Choose the correct subjunctive of poder after "para que":',
            prompt_ar: 'اختر تصريف poder في Subjuntivo بعد رابط الغاية "para que":',
            options: ['puedas', 'puedes', 'podrás', 'pudiste'],
            correctAnswer: 'puedas',
            explanation_en: '"Para que" introduces purpose for a different subject, requiring subjunctive: puedas.',
            explanation_ar: '"Para que" لفاعل مختلف تتطلب دائماً صيغة Subjuntivo: puedas.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 purposeful actions explaining why you do things to help others using "Para que + subjuntivo".',
          prompt_ar: 'اكتب 3 أفعال هادفة توضح فيها كيف تساعد الآخرين باستخدام Para que + Subjuntivo.',
          minSentences: 3,
          sampleTarget: 'Te presto mis mejores libros para que descubras autores fascinantes en español. Te envío la ubicación exacta para que encuentres el lugar sin perderte. Comparto mis notas de clase contigo para que preparemos el proyecto en equipo con éxito.'
        }
      }
    ]
  },

  // UNIT 33: El Trabajo, Negociación y Mundo Laboral
  {
    id: 'unit-b1-33',
    level: 'B1',
    unitNumber: 33,
    title_es: 'Negociación y Acuerdos Profesionales',
    title_en: 'Negotiation & Professional Agreements',
    title_ar: 'التفاوض والاتفاقيات المهنية في بيئة العمل',
    description_en: 'Participate in business meetings, negotiate contractual terms, defend professional proposals, and handle corporate correspondence.',
    description_ar: 'المشاركة في اجتماعات العمل، التفاوض على بنود العقود، الدفاع عن المقترحات المهنية، وإدارة المراسلات المؤسسية.',
    lessons: [
      {
        id: 'lesson-b1-33-1',
        unitId: 'unit-b1-33',
        lessonNumber: 1,
        title_es: 'Liderar y Participar en Reuniones de Trabajo',
        title_en: 'Leading & Participating in Business Meetings',
        title_ar: 'إدارة والمشاركة في اجتماعات العمل الرسمية',
        cefr: 'B1',
        objectives_en: ['Open meetings and state agenda (El orden del día)', 'Take turns to speak (Pedir la palabra, Ceder la palabra)', 'Synthesize key action points and conclusions'],
        objectives_ar: ['افتتاح الاجتماعات وتحديد جدول الأعمال', 'طلب الكلمة وتبادل الأدوار في الحديث بلباقة', 'تلخيص نقاط العمل الرئيسية والقرارات المتخذة'],
        vocabWordIds: ['w-orden-del-dia', 'w-reunion', 'w-palabra', 'w-conclusion', 'w-acuerdo'],
        dialogue: [
          { speaker: 'Moderador', es: 'Buenos días a todos. El objetivo principal de la reunión de hoy es revisar el presupuesto y acordar el calendario de entrega.', en: 'Good morning everyone. The main objective of today’s meeting is to review the budget...', ar: 'صباح الخير جميعاً. الهدف الرئيسي لاجتماع اليوم هو مراجعة الميزانية وتحديد جدول التسليم.' }
        ],
        exercises: [
          {
            id: 'ex-b1-33-1-1',
            type: 'multiple_choice',
            prompt_es: '"El orden del día" en una reunión empresarial significa:',
            prompt_en: '"El orden del día" in a business meeting means:',
            prompt_ar: '"El orden del día" في الاجتماعات تعني:',
            options: ['The meeting agenda / Topics to be discussed', 'Lunch order', 'Clock time of day', 'Office cleaning schedule'],
            correctAnswer: 'The meeting agenda / Topics to be discussed',
            explanation_en: '"El orden del día" is the formal term for meeting agenda.',
            explanation_ar: '"El orden del día" هو المصطلح القياسي لجدول أعمال الاجتماع.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence opening speech for a business meeting presenting the agenda and inviting contributions.',
          prompt_ar: 'اكتب كلمة افتتاحية لاجتماع عمل من 3 جمل تطرح فيها جدول الأعمال وتدعو للتعاون.',
          minSentences: 3,
          sampleTarget: 'Buenos días y bienvenidos a todos a la reunión mensual de estrategia. En el orden del día trataremos el lanzamiento del nuevo producto y la optimización de recursos. Les invito a compartir sus ideas y sugerencias para alcanzar los mejores resultados.'
        }
      },
      {
        id: 'lesson-b1-33-2',
        unitId: 'unit-b1-33',
        lessonNumber: 2,
        title_es: 'Negociar Condiciones Laborales y Sueldo',
        title_en: 'Negotiating Salary & Working Conditions',
        title_ar: 'التفاوض على الراتب وشروط عقد العمل',
        cefr: 'B1',
        objectives_en: ['Discuss salary brackets (sueldo bruto, neto, complementos)', 'Negotiate flexibility (teletrabajo, horario flexible, vacaciones)', 'Frame counterproposals constructively'],
        objectives_ar: ['مناقشة الراتب الإجمالي والصافي والبدلات', 'التفاوض على مرونة العمل والعمل عن بُعد والإجازات', 'صياغة العروض المضادة بأسلوب احترافي بناء'],
        vocabWordIds: ['w-sueldo-bruto', 'w-sueldo-neto', 'w-teletrabajo', 'w-negociar', 'w-beneficio'],
        dialogue: [
          { speaker: 'Candidato', es: 'Agradezco mucho la propuesta. Me gustaría proponer un esquema híbrido de dos días de teletrabajo a la semana y revisar el sueldo tras seis meses.', en: 'I really appreciate the offer. I would like to propose a hybrid scheme of two remote days...', ar: 'أقدر العرض كثيراً. أود أن أقترح نظام عمل هجين بيومين عن بُعد أسبوعياً ومراجعة الراتب بعد ستة أشهر.' }
        ],
        exercises: [
          {
            id: 'ex-b1-33-2-1',
            type: 'multiple_choice',
            prompt_es: 'El "sueldo neto" representa:',
            prompt_en: '"Sueldo neto" represents:',
            prompt_ar: '"Sueldo neto" يمثل:',
            options: ['La cantidad real que recibe el trabajador en su cuenta bancaria tras impuestos', 'El total antes de deducciones', 'Un bono navideño', 'El coste de los billetes de tren'],
            correctAnswer: 'La cantidad real que recibe el trabajador en su cuenta bancaria tras impuestos',
            explanation_en: '"Sueldo neto" is the take-home pay after tax and social security deductions.',
            explanation_ar: '"Sueldo neto" هو الراتب الصافي الفعلي بعد خصم الضرائب والتأمينات.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence polite counterproposal email negotiating work conditions with HR.',
          prompt_ar: 'اكتب رسالة تفاوض مهذبة من 3 جمل للموارد البشرية بخصوص شروط العمل.',
          minSentences: 3,
          sampleTarget: 'Agradezco sinceramente su oferta formal para unirme al equipo. Quisiera consultar si existiría la posibilidad de contar con una mayor flexibilidad horaria los viernes. Confío en que podamos llegar a un acuerdo mutuamente beneficioso.'
        }
      },
      {
        id: 'lesson-b1-33-3',
        unitId: 'unit-b1-33',
        lessonNumber: 3,
        title_es: 'Redacción de Correos Formales Corporativos',
        title_en: 'Writing Formal Corporate Emails',
        title_ar: 'صياغة رسائل البريد الإلكتروني الرسمية للشركات',
        cefr: 'B1',
        objectives_en: ['Use formal salutations (Estimado/a Sr./Sra., Muy señores míos)', 'State purpose concisely (Me dirijo a usted con el motivo de...)', 'Use elegant sign-offs (Atentamente, Cordialmente, Quedo a su entera disposición)'],
        objectives_ar: ['استخدام التحيات الرسمية الراقية', 'توضيح سبب المراسلة بإيجاز واحترافية', 'استخدام الخواتيم المؤسسية المعتمدة'],
        vocabWordIds: ['w-estimado', 'w-atentamente', 'w-cordialmente', 'w-disposicion', 'w-adjunto'],
        dialogue: [
          { speaker: 'Texto Formal', es: 'Estimada Sra. Morales: Me pongo en contacto con usted para hacerle llegar el informe adjunto. Quedo a su entera disposición para cualquier consulta. Atentamente, David Sánchez.', en: 'Dear Ms. Morales: I am contacting you to deliver the attached report...', ar: 'الأستاذة موراليس المحترمة: أتواصل مع حضرتك لأرفق لكم التقرير المطلوب...' }
        ],
        exercises: [
          {
            id: 'ex-b1-33-3-1',
            type: 'multiple_choice',
            prompt_es: 'La despedida más formal y estándar para un correo profesional en español es:',
            prompt_en: 'The standard formal sign-off for a business email in Spanish is:',
            prompt_ar: 'الخاتمة الرسمية القياسية للبريد المهني في الإسبانية هي:',
            options: ['Atentamente, / Le saluda atentamente,', '¡Chao amigo!', 'Besitos,', 'Nos vemos luego,'],
            correctAnswer: 'Atentamente, / Le saluda atentamente,',
            explanation_en: '"Atentamente" corresponds to Sincerely / Yours faithfully.',
            explanation_ar: '"Atentamente" هي الصيغة الرسمية الأكثر اعتماداً وتعني "وتفضلوا بقبول فائق الاحترام".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a complete 3-sentence formal email requesting an urgent status update from a business partner.',
          prompt_ar: 'اكتب بريداً إلكترونياً رسمياً من 3 جمل تطلب فيه تحديثاً عاجلاً من شريك عمل.',
          minSentences: 3,
          sampleTarget: 'Estimado Sr. Gómez: Me dirijo a usted para solicitar una actualización sobre el estado del proyecto acordado la semana pasada. Le agradecería enormemente si pudiera enviarnos los datos actualizados antes del viernes. Quedo a su entera disposición y le envío un cordial saludo.'
        }
      },
      {
        id: 'lesson-b1-33-4',
        unitId: 'unit-b1-33',
        lessonNumber: 4,
        title_es: 'Defender un Proyecto e Impacto con Persuasión',
        title_en: 'Pitching a Project with Persuasion',
        title_ar: 'عرض المشروعات والإقناع بقيمتها وأثرها',
        cefr: 'B1',
        objectives_en: ['Structure a 3-part elevator pitch (Problem, Solution, Value Proposition)', 'Use persuasive rhetorical devices (En primer lugar, Esto permitirá, El valor añadido)', 'Handle objections from investors or managers with composure'],
        objectives_ar: ['هيكلة عرض الفكرة السريع (المشكلة، الحل، القيمة المضافة)', 'استخدام أدوات الإقناع البلاغية والمنطقية', 'الرد على اعتراضات المستثمرين والمديرين بثقة وهدوء'],
        vocabWordIds: ['w-propuesta', 'w-inversion', 'w-innovacion', 'w-rentabilidad', 'w-ventaja'],
        dialogue: [
          { speaker: 'Emprendedor', es: 'Nuestra plataforma digital resuelve el problema de la gestión de inventarios para pequeñas empresas, ahorrando un 30% de costes operativos.', en: 'Our digital platform solves inventory management for small businesses, saving 30%...', ar: 'منصتنا الرقمية تحل مشكلة إدارة المخزون للشركات الصغيرة وتوفر 30% من التكاليف التشغيلية.' }
        ],
        exercises: [
          {
            id: 'ex-b1-33-4-1',
            type: 'multiple_choice',
            prompt_es: '"El valor añadido" (o valor agregado) de una propuesta es:',
            prompt_en: '"El valor añadido" of a proposal represents:',
            prompt_ar: '"El valor añadido" (القيمة المضافة) لمقترح تعني:',
            options: ['La ventaja diferencial y beneficio extra que aporta frente a la competencia', 'Un impuesto suplementario', 'El retraso en el proyecto', 'Una queja de cliente'],
            correctAnswer: 'La ventaja diferencial y beneficio extra que aporta frente a la competencia',
            explanation_en: '"Valor añadido" is the added value / competitive edge.',
            explanation_ar: '"Valor añadido" هي الميزة التنافسية والقيمة الإضافية الفريدة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a persuasive 3-sentence pitch for an innovative language learning tool highlighting its advantages and value.',
          prompt_ar: 'اكتب عرضاً إقناعياً من 3 جمل لأداة مبتكرة لتعلم اللغات تبرز فيها مزاياها وقيمتها.',
          minSentences: 3,
          sampleTarget: 'Nuestra aplicación ofrece un método inmersivo basado en inteligencia artificial y retroalimentación personalizada en tiempo real. Esta herramienta permitirá a los estudiantes alcanzar la fluidez comunicativa en la mitad de tiempo habitual. El valor añadido radica en la personalización absoluta adaptada al ritmo de cada usuario.'
        }
      }
    ]
  },

  // UNIT 34: El Medio Ambiente y el Futuro del Planeta
  {
    id: 'unit-b1-34',
    level: 'B1',
    unitNumber: 34,
    title_es: 'Medio Ambiente y Sostenibilidad',
    title_en: 'Environment & Planet Sustainability',
    title_ar: 'البيئة والاستدامة ومستقبل كوكب الأرض',
    description_en: 'Discuss global warming, renewable energy, plastic pollution, and formulate green initiatives using complex subjunctive structures.',
    description_ar: 'مناقشة الاحتباس الحراري، الطاقات المتجددة، التلوث البلاستيكي، وصياغة مبادرات بيئية مستدامة باستخدام تراكيب Subjuntivo المتقدمة.',
    lessons: [
      {
        id: 'lesson-b1-34-1',
        unitId: 'unit-b1-34',
        lessonNumber: 1,
        title_es: 'El Cambio Climático y sus Retos Globales',
        title_en: 'Climate Change & Global Challenges',
        title_ar: 'التغير المناخي والتحديات العالمية الكبرى',
        cefr: 'B1',
        objectives_en: ['Discuss emissions, deforestation, droughts, and melting glaciers', 'Use environmental vocabulary with scientific precision', 'Express cause and effect with "a causa de" and "debido a"'],
        objectives_ar: ['مناقشة الانبعاثات الكربونية، إزالة الغابات، الجفاف، وذوبان الجليد', 'استخدام المفردات البيئية بدقة علمية', 'التعبير عن السبب والنتيجة باستخدام a causa de و debido a'],
        vocabWordIds: ['w-cambio-climatico', 'w-calentamiento', 'w-emisiones', 'w-sequia', 'w-deshielo'],
        dialogue: [
          { speaker: 'Científica', es: 'El aumento global de las temperaturas provoca sequías más severas y amenaza la biodiversidad de nuestros ecosistemas.', en: 'The global rise in temperatures causes more severe droughts and threatens biodiversity.', ar: 'الارتفاع العالمي في درجات الحرارة يسبب موجات جفاف أشد خطورة ويهدد التنوع الحيوي في أنظمتنا البيئية.' }
        ],
        exercises: [
          {
            id: 'ex-b1-34-1-1',
            type: 'multiple_choice',
            prompt_es: '"El efecto invernadero" es el fenómeno responsable de:',
            prompt_en: '"El efecto invernadero" (greenhouse effect) is responsible for:',
            prompt_ar: '"El efecto invernadero" (ظاهرة الاحتباس الحراري) هي المسؤولة عن:',
            options: ['Retener el calor en la atmósfera terrestre elevando las temperaturas', 'Congelar los océanos', 'Crear noches eternas', 'Limpiar el aire automáticamente'],
            correctAnswer: 'Retener el calor en la atmósfera terrestre elevando las temperaturas',
            explanation_en: 'The greenhouse effect traps atmospheric heat.',
            explanation_ar: 'الاحتباس الحراري يحبس الحرارة في الغلاف الجوي مما يرفع درجات الحرارة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences analyzing the principal causes and consequences of climate change globally.',
          prompt_ar: 'اكتب 3 جمل تحلل فيها أهم أسباب وتبعات التغير المناخي على الصعيد العالمي.',
          minSentences: 3,
          sampleTarget: 'El uso excesivo de combustibles fósiles ha generado un aumento alarmante de emisiones contaminantes. A causa del calentamiento global, los glaciares polares se están derritiendo a un ritmo sin precedentes. Es urgente que los gobiernos internacionales tomen medidas contundentes para proteger el planeta.'
        }
      },
      {
        id: 'lesson-b1-34-2',
        unitId: 'unit-b1-34',
        lessonNumber: 2,
        title_es: 'Energías Renovables y Transición Ecológica',
        title_en: 'Renewable Energy & Green Transition',
        title_ar: 'الطاقات المتجددة والتحول البيئي النظيف',
        cefr: 'B1',
        objectives_en: ['Compare solar, wind, and hydroelectric power (energía solar, eólica, hidráulica)', 'Evaluate sustainable investments and circular economy', 'Advocate for clean energy transition'],
        objectives_ar: ['المقارنة بين الطاقة الشمسية، الريحية، والكهرومائية', 'تقييم الاستثمارات المستدامة والاقتصاد الدائري', 'الدعوة لتسريع التحول نحو الطاقة النظيفة'],
        vocabWordIds: ['w-energia-solar', 'w-energia-eolica', 'w-sostenible', 'w-reciclaje', 'w-limpio'],
        dialogue: [
          { speaker: 'Ingeniero', es: 'España lidera la generación de energía eólica y solar en Europa, demostrando que un modelo cien por cien renovable es viable.', en: 'Spain leads wind and solar energy generation in Europe, proving a 100% renewable model is viable.', ar: 'تقود إسبانيا توليد طاقتي الرياح والشمس في أوروبا، مبرهنة على أن النموذج المتجدد بنسبة 100% قابل للتطبيق.' }
        ],
        exercises: [
          {
            id: 'ex-b1-34-2-1',
            type: 'multiple_choice',
            prompt_es: 'La energía generada por la fuerza del viento se llama:',
            prompt_en: 'Energy generated by the force of the wind is called:',
            prompt_ar: 'الطاقة المتولدة من قوة الرياح تسمى:',
            options: ['Energía eólica', 'Energía solar', 'Energía nuclear', 'Energía fósil'],
            correctAnswer: 'Energía eólica',
            explanation_en: '"Energía eólica" is wind power (from Greek god Aeolus).',
            explanation_ar: '"Energía eólica" هي طاقة الرياح.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences highlighting the benefits of switching to renewable energy sources.',
          prompt_ar: 'اكتب 3 جمل تبرز فيها فوائد التحول إلى مصادر الطاقة المتجددة.',
          minSentences: 3,
          sampleTarget: 'Las energías renovables son inagotables y no producen gases de efecto invernadero perjudiciales. La inversión en paneles solares permite a las familias generar su propia electricidad limpia. Si apostamos por la energía eólica, reduciremos drásticamente nuestra dependencia de los combustibles contaminantes.'
        }
      },
      {
        id: 'lesson-b1-34-3',
        unitId: 'unit-b1-34',
        lessonNumber: 3,
        title_es: 'Consumo Responsable y Reducción de Plásticos',
        title_en: 'Responsible Consumption & Plastic Reduction',
        title_ar: 'الاستهلاك المسؤول والحد من النفايات البلاستيكية',
        cefr: 'B1',
        objectives_en: ['Apply the 3 Rs: Reducir, Reutilizar, Reciclar', 'Discuss zero waste lifestyles (residuo cero)', 'Propose concrete daily habits to protect oceans and wildlife'],
        objectives_ar: ['تطبيق قاعدة الراءات الثلاث: التقليل، إعادة الاستخدام، وإعادة التدوير', 'مناقشة نمط الحياة الخالي من النفايات', 'اقتراح عادات يومية لحماية المحيطات والحياة الفطرية'],
        vocabWordIds: ['w-reducir', 'w-reutilizar', 'w-reciclar', 'w-plastico', 'w-residuo'],
        dialogue: [
          { speaker: 'Activista', es: 'Es imprescindible que reduzcamos el consumo de plásticos de un solo uso para evitar la contaminación marina.', en: 'It is essential that we reduce single-use plastics to prevent marine pollution.', ar: 'من الضروري للغاية أن نقلل من استهلاك البلاستيك ذي الاستخدام الواحد لحماية البحار من التلوث.' }
        ],
        exercises: [
          {
            id: 'ex-b1-34-3-1',
            type: 'multiple_choice',
            prompt_es: 'En la jerarquía ecológica de las 3 R, la acción más prioritaria y eficaz es:',
            prompt_en: 'In the 3 Rs ecological hierarchy, the top priority and most impactful action is:',
            prompt_ar: 'في هرمية الراءات الثلاث البيئية، الخطوة الأكثر أولوية وفاعلية هي:',
            options: ['Reducir el consumo innecesario', 'Tirar todo a la basura', 'Comprar más plástico', 'Quemar residuos'],
            correctAnswer: 'Reducir el consumo innecesario',
            explanation_en: 'Reducing unnecessary consumption has the biggest ecological benefit before reuse and recycling.',
            explanation_ar: 'تقليل الاستهلاك غير الضروري هو الخطوة الأولى والأكثر تأثيراً قبل إعادة الاستخدام والتدوير.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 actionable eco-friendly habits you practice or recommend to reduce environmental footprint.',
          prompt_ar: 'اكتب 3 عادات بيئية عملية تمارسها أو توصي بها لتقليل الأثر البيئي.',
          minSentences: 3,
          sampleTarget: 'Siempre llevo mi propia bolsa de tela reutilizable cuando voy al supermercado a hacer la compra. Utilizo una botella de acero inoxidable para evitar comprar botellas de plástico desechables. Apago siempre las luces y los aparatos electrónicos cuando salgo de una habitación.'
        }
      },
      {
        id: 'lesson-b1-34-4',
        unitId: 'unit-b1-34',
        lessonNumber: 4,
        title_es: 'Propuestas para un Futuro Sostenible',
        title_en: 'Proposals for a Sustainable Future',
        title_ar: 'مقترحات متكاملة لمستقبل بيئي مستدام',
        cefr: 'B1',
        objectives_en: ['Draft a comprehensive green proposal using "Propongo que + subjuntivo"', 'Combine modal verbs (debemos, tenemos que, se debería)', 'Synthesize vocabulary of urban mobility, green architecture, and conservation'],
        objectives_ar: ['صياغة مقترح بيئي شامل باستخدام Propongo que + Subjuntivo', 'الجمع بين الأفعال الدالة على الالتزام والواجب', 'دمج مفردات النقل المستدام، العمارة الخضراء، وحماية المحميات الطبيعية'],
        vocabWordIds: ['w-propongo-que', 'w-biodiversidad', 'w-movilidad', 'w-conservacion', 'w-futuro-verde'],
        dialogue: [
          { speaker: 'Urbanista', es: 'Propongo que creemos más zonas peatonales y que ampliemos la red de carriles para bicicletas en toda la ciudad.', en: 'I propose that we create more pedestrian zones and expand the bicycle lane network...', ar: 'أقترح أن ننشئ المزيد من المناطق المخصصة للمشاة وأن نوسع شبكة مسارات الدراجات في المدينة بأسرها.' }
        ],
        exercises: [
          {
            id: 'ex-b1-34-4-1',
            type: 'multiple_choice',
            prompt_es: 'Propongo que los ciudadanos ______ (utilizar) más el transporte público.',
            prompt_en: 'Choose the correct subjunctive of utilizar for plural subject:',
            prompt_ar: 'اختر تصريف utilizar في Subjuntivo مع الجمع بعد فعل الاقتراح:',
            options: ['utilicen', 'utilizan', 'utilizarán', 'utilizaron'],
            correctAnswer: 'utilicen',
            explanation_en: '"Propongo que" requires subjunctive: utilicen.',
            explanation_ar: '"Propongo que" تتطلب صيغة Subjuntivo: utilicen.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence proposal to your local city council proposing green urban improvements using "Propongo que + subjuntivo" and "Es necesario que".',
          prompt_ar: 'اكتب مقترحاً من 3 جمل لمجلس مدينتك تقدم فيه حلولاً بيئية حضرية مستدامة.',
          minSentences: 3,
          sampleTarget: 'Propongo que el ayuntamiento plante más árboles autóctonos en los parques y avenidas de la ciudad. Es necesario que se mejore la frecuencia del transporte público para desincentivar el uso del coche privado. Sugiero que se instalen puntos de reciclaje inteligente en todos los barrios para facilitar la separación de residuos.'
        }
      }
    ]
  }
];
