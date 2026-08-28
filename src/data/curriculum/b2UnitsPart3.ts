import { Unit } from '../../types';

export const B2_UNITS_PART3: Unit[] = [
  // UNIT 47: Humor, Ironía, Doble Sentido y Registro Coloquial
  {
    id: 'unit-b2-47',
    level: 'B2',
    unitNumber: 47,
    title_es: 'Humor, Ironía, Sarcasmo y Registro Coloquial',
    title_en: 'Humor, Irony, Sarcasm & Colloquial Nuance',
    title_ar: 'الفكاهة، السخرية والتهكم، التورية والدلالات الدارجة',
    description_en: 'Master cultural humor, understanding irony, wordplay (doble sentido), regional slang in Spain & Latin America, and social pragmatic nuance.',
    description_ar: 'إتقان الفكاهة الإسبانية، فهم السخرية الذكية، التورية والتلاعب بالألفاظ، التعبيرات الدارجة في إسبانيا وأمريكا اللاتينية، والدلالات التداولية الاجتماعية.',
    lessons: [
      {
        id: 'lesson-b2-47-1',
        unitId: 'unit-b2-47',
        lessonNumber: 1,
        title_es: 'La Ironía y el Sarcasmo en la Conversación Diaria',
        title_en: 'Irony & Sarcasm in Daily Spanish Interaction',
        title_ar: 'السخرية الذكية والتهكم في المحادثات اليومية',
        cefr: 'B2',
        objectives_en: ['Recognize intonation shifts signalling ironic intent ("¡Qué puntual eres!" said to someone 30 min late)', 'Use expressions like "¡Menos mal!", "¡Solo faltaba eso!", "¡Sí, claro!"', 'Respond to banter without taking offense'],
        objectives_ar: ['التعرف على نبرة الصوت الدالة على السخرية (مثال: "ما أشد التزامك بالمواعيد!" لمن تأخر نصف ساعة)', 'استخدام عبارات التفاعل الساخرة: ¡Menos mal! ، ¡Solo faltaba eso!', 'التجاوب مع الدعابة الودية بمرونة وذكاء اجتماعي'],
        vocabWordIds: ['w-ironia', 'w-sarcasmo', 'w-tono-ironico', 'w-chiste', 'w-menos-mal'],
        dialogue: [
          { speaker: 'Clara', es: '¡Menudo día de playa nos ha tocado con esta tormenta y este frío polar! (ironía)', en: 'What a "great" beach day we got with this storm and polar chill! (ironic)', ar: 'يا له من يوم شاطئي "رائع" مع هذه العاصفة والبرد القارس! (سخرية)' },
          { speaker: 'Sergio', es: 'Sí, claro, perfecto para broncearse en bikini. ¡Solo nos faltaba que granizara!', en: 'Yeah, right, perfect for tanning in bikini. Only missing hail now!', ar: 'نعم بالطبع، مثالي لاكتساب السمرة! ولم يكن ينقصنا إلا تساقط البرد!' }
        ],
        exercises: [
          {
            id: 'ex-b2-47-1-1',
            type: 'multiple_choice',
            prompt_es: 'Si alguien dice "¡Qué genio eres!" tras romper un plato sin querer, está utilizando:',
            prompt_en: 'What literary device is being used here?',
            prompt_ar: 'ما الأسلوب البلاغي المستخدم هنا؟',
            options: ['La ironía cotidiana en tono de broma', 'Un insulto grave', 'Una teoría matemática', 'Un poema de amor'],
            correctAnswer: 'La ironía cotidiana en tono de broma',
            explanation_en: 'It is a friendly ironic reaction saying the opposite of the literal meaning.',
            explanation_ar: 'إنها سخرية يومية ودية تعبر عن عكس المعنى الحرفي لتلطيف الموقف.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a humorous 3-turn dialogue where two friends react with good-humored irony to an unexpected rainy day or comical mishap.',
          prompt_ar: 'اكتب حواراً مرحاً من 3 تبادلات يتفاعل فيه صديقان بسخرية ذكية مرحة مع مفارقة طريفة.',
          minSentences: 3,
          sampleTarget: '— ¡Qué maravilla de paseo campestre con este diluvio universal! — Sí, claro, ideal para practicar natación en el sendero de barro. — ¡Menos mal que trajimos impermeables, ahora solo nos falta encontrar un barco salvavidas!'
        }
      },
      {
        id: 'lesson-b2-47-2',
        unitId: 'unit-b2-47',
        lessonNumber: 2,
        title_es: 'El Doble Sentido y los Juegos de Palabras en Español',
        title_en: 'Wordplay, Puns & Double Entendre in Spanish',
        title_ar: 'التورية والتلاعب اللفظي والجناس في اللغة الإسبانية',
        cefr: 'B2',
        objectives_en: ['Understand polysemy and phonetic puns in Spanish comedy', 'Analyze iconic jokes (chistes de "¿Qué le dice una taza a otra?")', 'Cultivate linguistic wit and mental agility'],
        objectives_ar: ['فهم تعدد المعاني والتلاعب الصوتي في النكات والفكاهة الإسبانية', 'تحليل النكات الشعبية القائمة على الجناس والاشتراك اللفظي', 'تنمية سرعة البديهة والذكاء اللغوي اللماح'],
        vocabWordIds: ['w-doble-sentido', 'w-juego-de-palabras', 'w-polisemia', 'w-agudeza', 'w-humor-inteligente'],
        dialogue: [
          { speaker: 'Comediante', es: '— ¿Qué le dice una taza a otra taza? — ¡¿Qué taza-ciendo?! (¿Qué estás haciendo?)', en: '— What does one cup say to another cup? — What are you doing?! (pun on taza/estás)', ar: '— ماذا تقول فنجان لفنجان آخر؟ — ماذا تفعلين؟! (تلاعب صوتي بين taza و estás)' }
        ],
        exercises: [
          {
            id: 'ex-b2-47-2-1',
            type: 'multiple_choice',
            prompt_es: 'Los juegos de palabras basados en el "doble sentido" aprovechan principalmente:',
            prompt_en: 'Wordplay based on double meaning primarily exploits:',
            prompt_ar: 'يعتمد التلاعب اللفظي القائم على "التورية" بشكل أساسي على:',
            options: ['La polisemia y la similitud fonética de las palabras para generar sorpresa humorística', 'El silencio absoluto', 'La traducción literal al inglés', 'Los signos de puntuación'],
            correctAnswer: 'La polisemia y la similitud fonética de las palabras para generar sorpresa humorística',
            explanation_en: 'Double meanings exploit polysemy and word sounds to spark wit and laughter.',
            explanation_ar: 'تستغل التورية الاشتراك اللفظي والتشابه الصوتي لتوليد مفارقة فكاهية ذكية.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences reflecting on why understanding humor and wordplay is the ultimate test of advanced language fluency.',
          prompt_ar: 'اكتب 3 جمل تتأمل فيها لماذا يعد فهم الفكاهة والتلاعب اللفظي الاختبار الأسمى للطلاقة اللغوية المتقدمة.',
          minSentences: 3,
          sampleTarget: 'Comprender el humor y los juegos de palabras en un idioma extranjero requiere un dominio profundo de la cultura y la polisemia léxica. Cuando un estudiante es capaz de captar la ironía y reírse de un chiste sutil, ha alcanzado un nivel de fluidez verdaderamente avanzado. El humor conecta a las personas más allá de las fronteras lingüísticas mediante la complicidad y la alegría compartida.'
        }
      },
      {
        id: 'lesson-b2-47-3',
        unitId: 'unit-b2-47',
        lessonNumber: 3,
        title_es: 'Contrastes Coloquiales: España vs México, Argentina y Colombia',
        title_en: 'Colloquial Contrasts: Spain vs Latin America',
        title_ar: 'التباينات الدارجة: إسبانيا مقابل المكسيك والأرجنتين وكولومبيا',
        cefr: 'B2',
        objectives_en: ['Cool/Great: ¡Mola! / ¡Qué guay! (Spain) vs ¡Chido! / ¡Padrísimo! (Mexico) vs ¡Copado! / ¡Bárbaro! (Argentina) vs ¡Chévere! / ¡Bacano! (Colombia)', 'Understand "voseo" in Argentina (vos tenés, vos sos)', 'Navigate regional colloquial diversity effortlessly'],
        objectives_ar: ['كلمات "رائع/جميل": Guay/Mola (إسبانيا) ، Chido/Padrísimo (المكسيك) ، Copado (الأرجنتين) ، Chévere/Bacano (كولومبيا)', 'فهم ضمير vos وتصريفه في الأرجنتين (vos tenés, vos hablás)', 'التعامل مع التنوع اللهجي الثري بكل أريحية'],
        vocabWordIds: ['w-guay', 'w-mola', 'w-chido', 'w-chevere', 'w-voseo'],
        dialogue: [
          { speaker: 'Español', es: '¡Esta película mola un montón, es genial!', en: 'This movie is so cool, it\'s great! (Spain)', ar: 'هذا الفيلم رائع جداً وممتع! (إسبانيا)' },
          { speaker: 'Mexicano', es: '¡Sí, está bien chida y padrísima!', en: 'Yes, it is super cool! (Mexico)', ar: 'نعم، إنه رائع ومذهل للغاية! (المكسيك)' },
          { speaker: 'Colombiano', es: '¡Qué bacano, parce! Totalmente chévere.', en: 'So awesome, buddy! Totally cool. (Colombia)', ar: 'كم هو مذهل يا صاحبي! رائع تماماً. (كولومبيا)' }
        ],
        exercises: [
          {
            id: 'ex-b2-47-3-1',
            type: 'multiple_choice',
            prompt_es: 'Para decir que algo es "fantástico o genial" en España se dice coloquialmente:',
            prompt_en: 'In Spain, how do you say something is "cool / great" colloquially?',
            prompt_ar: 'للتعبير عن أن شيئاً ما "رائع جداً" بالعامية في إسبانيا يقال:',
            options: ['¡Mola mucho! / ¡Está muy guay!', '¡Está muy triste!', '¡Es muy aburrido!', '¡No tiene sentido!'],
            correctAnswer: '¡Mola mucho! / ¡Está muy guay!',
            explanation_en: '"Mola" and "guay" are the classic Spanish colloquial expressions for cool/great.',
            explanation_ar: '"Mola" و "Guay" هما التعبيران الدارجان الأكثر شهرة في إسبانيا للتعبير عن الروعة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-turn friendly dialogue where speakers from Spain, Mexico, and Colombia express excitement about a concert using their respective regional expressions.',
          prompt_ar: 'اكتب حواراً ودياً من 3 تبادلات يعبر فيه متحدثون من إسبانيا والمكسيك وكولومبيا عن حماسهم لحفل موسيقي بلهجاتهم.',
          minSentences: 3,
          sampleTarget: '— ¡El concierto de anoche en Madrid moló una barbaridad, fue una auténtica pasada! — ¡Totalmente de acuerdo, la energía de la banda estuvo súper chida y padrísima! — ¡Qué chimba de experiencia, parceros, fue algo verdaderamente bacano e inolvidable!'
        }
      },
      {
        id: 'lesson-b2-47-4',
        unitId: 'unit-b2-47',
        lessonNumber: 4,
        title_es: 'Adaptación del Registro: Del Café Entre Amigos a la Junta Directiva',
        title_en: 'Register Shifting: Casual Café to Executive Boardroom',
        title_ar: 'التحول المرن في مستويات الخطاب: من مقهى الأصدقاء إلى قاعة مجلس الإدارة',
        cefr: 'B2',
        objectives_en: ['Translate thoughts across registers: Colloquial (Oye tío, esto es un lío) -> Standard (Tenemos un problema técnico) -> Formal/Executive (Nos enfrentamos a una contingencia operativa compleja)', 'Avoid sounding overly formal with friends or overly casual with executives', 'Achieve full pragmatic mastery'],
        objectives_ar: ['التحويل السلس لنفس الفكرة عبر المستويات اللغوية الثلاثة: الدارج -> المعياري -> الأكاديمي التنفيذي', 'تجنب التكلف مع الأصدقاء وتجنب التبسط المفرط مع مجالس الإدارة', 'بلوغ الكفاءة التداولية المتكاملة'],
        vocabWordIds: ['w-registro-coloquial', 'w-registro-formal', 'w-registro-estandar', 'w-adecuacion', 'w-competencia-comunicativa'],
        dialogue: [
          { speaker: 'Coloquial', es: '¡Vaya chapuza han hecho aquí, tío!', en: 'What a botched job they did here, man!', ar: 'يا لها من فوضى عارمة واستهتار صنعوه هنا!' },
          { speaker: 'Formal Ejecutivo', es: 'Se aprecian notables deficiencias técnicas en la ejecución de este proyecto que requieren subsanación urgente.', en: 'Notable technical deficiencies are observed requiring urgent remediation.', ar: 'تُلاحظ أوجه قصور فنية ملحوظة في تنفيذ هذا المشروع تتطلب معالجة عاجلة.' }
        ],
        exercises: [
          {
            id: 'ex-b2-47-4-1',
            type: 'multiple_choice',
            prompt_es: 'La transformación culta y ejecutiva de "Oye, pásame la pasta rápido" es:',
            prompt_en: 'The formal executive transformation of this casual request is:',
            prompt_ar: 'التحويل الرسمي الراقي للعبارة الدارجة "Oye pásame la pasta rápido" هو:',
            options: ['Le agradecería que procediera a la liquidación del pago correspondiente a la mayor brevedad', '¡Dame el dinero ya!', 'Quiero monedas ahora mismo', 'Tráeme un plato de espaguetis'],
            correctAnswer: 'Le agradecería que procediera a la liquidación del pago correspondiente a la mayor brevedad',
            explanation_en: 'This phrase elevates the casual phrasing to pristine professional executive Spanish.',
            explanation_ar: 'هذه الصياغة ترتقي بالمعنى إلى أرفع معايير المخاطبات المالية المهنية.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 versions of the same message (Colloquial, Standard, Formal Executive) declining an invitation or meeting.',
          prompt_ar: 'اكتب 3 صياغات لنفس الرسالة (دارجة، معيارية، رسمية تنفيذية) تعتذر فيها عن حضور اجتماع.',
          minSentences: 3,
          sampleTarget: 'Coloquial: Oye, qué pena pero no voy a poder ir a la quedada porque estoy a tope de líos. Estándar: Disculpa, pero no podré asistir a la reunión de hoy porque tengo un compromiso previo. Formal Ejecutivo: Lamento comunicarle que, debido a imprevistos de agenda institucional, me resultará imposible acudir a la sesión convocada.'
        }
      }
    ]
  },

  // UNIT 48: Ciencia, Filosofía, Bioética y Debates Contemporáneos
  {
    id: 'unit-b2-48',
    level: 'B2',
    unitNumber: 48,
    title_es: 'Ciencia, Filosofía y Debates Éticos Contemporáneos',
    title_en: 'Science, Philosophy & Contemporary Bioethics',
    title_ar: 'العلوم والفلسفة والأخلاقيات الحيوية والقضايا المعاصرة',
    description_en: 'Debate artificial intelligence, genetic engineering, human longevity, renewable energy, and philosophical epistemology in refined academic Spanish.',
    description_ar: 'مناقشة الذكاء الاصطناعي، الهندسة الوراثية، إطالة العمر البشري، الطاقة المتجددة، وفلسفة المعرفة بلغة أكاديمية إسبانية رصينة وثرية.',
    lessons: [
      {
        id: 'lesson-b2-48-1',
        unitId: 'unit-b2-48',
        lessonNumber: 1,
        title_es: 'La Inteligencia Artificial y el Futuro de la Humanidad',
        title_en: 'Artificial Intelligence & the Future of Humanity',
        title_ar: 'الذكاء الاصطناعي ومستقبل الإنسانية والعمل',
        cefr: 'B2',
        objectives_en: ['Debate AI ethics (algoritmos, sesgos cognitivos, automatización, creatividad computacional)', 'Use subjunctive for ethical concerns (Es crucial que la IA respete los derechos)', 'Formulate balanced technocentric and humanist arguments'],
        objectives_ar: ['مناقشة أخلاقيات الذكاء الاصطناعي (الخوارزميات، الانحيازات المعرفية، الأتمتة، الإبداع الحوسبي)', 'استخدام Subjuntivo للتعبير عن الضرورات الأخلاقية (من الجوهري أن تحترم الأنظمة الذكية حقوق الإنسان)', 'صياغة أطروحات متوازنة بين التفاؤل التقني والرؤية الإنسانية'],
        vocabWordIds: ['w-inteligencia-artificial', 'w-algoritmo', 'w-automatizacion', 'w-sesgo-cognitivo', 'w-etica-digital'],
        dialogue: [
          { speaker: 'Científica', es: 'Es imprescindible que desarrollemos marcos regulatorios sólidos para que la inteligencia artificial potencie el bienestar colectivo sin comprometer la privacidad ni la equidad social.', en: 'It is essential that we develop regulatory frameworks so AI enhances collective welfare without compromising privacy.', ar: 'من الضروري جداً أن نطور أطراً تنظيمية متينة ليساهم الذكاء الاصطناعي في رفاهية المجتمع دون المساس بالخصوصية أو العدالة.' }
        ],
        exercises: [
          {
            id: 'ex-b2-48-1-1',
            type: 'multiple_choice',
            prompt_es: 'Para garantizar un desarrollo ético de la IA, los expertos señalan que es fundamental que los algoritmos:',
            prompt_en: 'To ensure ethical AI development, experts emphasize that algorithms must:',
            prompt_ar: 'لضمان تطوير أخلاقي للذكاء الاصطناعي، يشدد الخبراء على ضرورة أن تكون الخوارزميات:',
            options: ['Sean transparentes, auditables y libres de sesgos discriminatorios', 'Permanezcan ocultos y secretos', 'Reemplacen todas las escuelas', 'Consuman toda la energía'],
            correctAnswer: 'Sean transparentes, auditables y libres de sesgos discriminatorios',
            explanation_en: 'Ethical AI requires transparency, auditability, and freedom from bias.',
            explanation_ar: 'يتطلب الذكاء الاصطناعي الأخلاقي الشفافية وقابلية التدقيق والخلو من الانحيازات.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence balanced philosophical reflection on how AI will transform humanity’s creative and professional future.',
          prompt_ar: 'اكتب تأملاً فلسفياً متوازناً من 3 جمل حول كيفية تحويل الذكاء الاصطناعي للمستقبل الإبداعي والمهني للبشرية.',
          minSentences: 3,
          sampleTarget: 'La inteligencia artificial representa uno de los saltos evolutivos más trascendentales en la historia del conocimiento humano. Lejos de sustituir la chispa creativa innata del ser humano, estas herramientas pueden democratizar el acceso a la ciencia y la innovación. Es fundamental que la ética guíe permanentemente el desarrollo tecnológico para asegurar un porvenir más inclusivo y solidario.'
        }
      },
      {
        id: 'lesson-b2-48-2',
        unitId: 'unit-b2-48',
        lessonNumber: 2,
        title_es: 'La Bioética y la Edición Genética: Prometeo Moderno',
        title_en: 'Bioethics & Genetic Editing: Modern Prometheus',
        title_ar: 'الأخلاقيات الحيوية والهندسة الوراثية: تساؤلات بروميثيوس المعاصر',
        cefr: 'B2',
        objectives_en: ['Discuss CRISPR, gene editing, disease eradication, and designer genetics', 'Debate the limits of human intervention in nature', 'Employ subjunctive in hypothetical conditions (Si modificáramos el genoma humano...)'],
        objectives_ar: ['مناقشة تقنية كريسبر وتعديل الجينات والقضاء على الأمراض الوراثية', 'مناقشة حدود التدخل البشري في الطبيعة', 'استخدام الشرط الافتراضي مع Subjuntivo (لو قمنا بتعديل الجينوم البشري...)'],
        vocabWordIds: ['w-bioetica', 'w-edicion-genetica', 'w-genoma', 'w-terapia-genica', 'w-limite-etico'],
        dialogue: [
          { speaker: 'Bioeticista', es: 'Aunque la edición genética ofrece esperanzas inmensas para curar enfermedades hereditarias graves, debemos reflexionar sobre las implicaciones éticas de modificar la línea germinal humana.', en: 'Although gene editing offers huge hopes to cure hereditary diseases, we must reflect on the ethics...', ar: 'على الرغم من أن تعديل الجينات يفتح آمالاً عريضة لعلاج الأمراض الوراثية، يجب أن نتأمل في التبعات الأخلاقية للتعديل.' }
        ],
        exercises: [
          {
            id: 'ex-b2-48-2-1',
            type: 'multiple_choice',
            prompt_es: 'El principal dilema bioético de la edición genética en embriones radica en:',
            prompt_en: 'The main bioethical dilemma of embryonic gene editing lies in:',
            prompt_ar: 'تكمن المعضلة الأخلاقية الحيوية الرئيسية لتعديل الجينات في الأجنة في:',
            options: ['La posibilidad de generar desigualdades genéticas hereditarias y cambios irreversibles en la especie humana', 'El coste del papel en los laboratorios', 'El color de los microscopios', 'La velocidad de las computadoras'],
            correctAnswer: 'La posibilidad de generar desigualdades genéticas hereditarias y cambios irreversibles en la especie humana',
            explanation_en: 'Heritable genetic modifications pose profound ethical dilemmas regarding human lineage and inequality.',
            explanation_ar: 'التعديلات الجينية الوراثية تثير معضلات عميقة حول التفاوت الوراثي والتأثير الدائم في السلالة البشرية.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences evaluating the promises and ethical limits of genetic biotechnology using hypothetical conditional structures.',
          prompt_ar: 'اكتب 3 جمل تقيم فيها وعود وحدود التكنولوجيا الحيوية الجينية باستخدام صيغ الشرط الافتراضي.',
          minSentences: 3,
          sampleTarget: 'Si la ingeniería genética se utilizara exclusivamente para erradicar patologías degenerativas, la humanidad daría un paso gigantesco hacia la salud universal. No obstante, si se abriera la puerta a la manipulación estética o al perfeccionamiento selectivo, correríamos el riesgo de profundizar las brechas sociales. Es imperativo que la comunidad internacional establezca tratados vinculantes que regulen estas tecnologías con prudencia.'
        }
      },
      {
        id: 'lesson-b2-48-3',
        unitId: 'unit-b2-48',
        lessonNumber: 3,
        title_es: 'Epistemología y Filosofía de la Ciencia: ¿Qué es la Verdad?',
        title_en: 'Epistemology & Philosophy of Science: What is Truth?',
        title_ar: 'نظرية المعرفة وفلسفة العلوم: ما هي الحقيقة؟',
        cefr: 'B2',
        objectives_en: ['Discuss the scientific method, falsifiability (Karl Popper), paradigm shifts (Thomas Kuhn)', 'Distinguish belief (creencia), evidence (evidencia empírica), and truth (verdad)', 'Engage in rigorous epistemological inquiry in Spanish'],
        objectives_ar: ['مناقشة المنهج العلمي، قابلية التكذيب (كارل بوبر)، والتحولات المعرفية (توماس كون)', 'التمييز بين المعتقد، الدليل التجريبي، والحقيقة العلمية المثبتة', 'خوض نقاشات معرفية إبستيمولوجية رصينة بالإسبانية'],
        vocabWordIds: ['w-epistemologia', 'w-falsabilidad', 'w-metodo-cientifico', 'w-paradigma', 'w-evidencia-empirica'],
        dialogue: [
          { speaker: 'Filósofo de la Ciencia', es: 'Una teoría solo es genuinamente científica si es falsable; es decir, si existe algún experimento concebible capaz de refutarla.', en: 'A theory is only genuinely scientific if it is falsifiable; that is, if an experiment could refute it.', ar: 'لا تكون النظرية علمية حقاً إلا إذا كانت قابلة للتكذيب والاختبار؛ أي إذا وجد اختبار تجريبي قادر على دحضها.' }
        ],
        exercises: [
          {
            id: 'ex-b2-48-3-1',
            type: 'multiple_choice',
            prompt_es: 'Según el filósofo Karl Popper, el criterio fundamental de demarcación de la ciencia es:',
            prompt_en: 'According to Karl Popper, the fundamental demarcation criterion of science is:',
            prompt_ar: 'وفقاً للفيلسوف كارل بوبر، معيار التمييز الجوهري للعلم هو:',
            options: ['La falsabilidad empírica de sus hipótesis', 'La opinión de la mayoría', 'La antigüedad del texto', 'La belleza de los gráficos'],
            correctAnswer: 'La falsabilidad empírica de sus hipótesis',
            explanation_en: 'Falsifiability is Popper\'s famous criterion distinguishing science from pseudoscience.',
            explanation_ar: 'قابلية الدحض والتكذيب التجريبي هي معيار بوبر الشهير لتمييز العلم الأصيل.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 philosophical sentences reflecting on how science progresses through doubt, curiosity, and evidence.',
          prompt_ar: 'اكتب 3 جمل فلسفية تتأمل فيها كيف يتقدم العلم عبر الشك المنهجي والفضول والدليل.',
          minSentences: 3,
          sampleTarget: 'El progreso del conocimiento científico no se sustenta en dogmas inmutables, sino en la constante disposición a cuestionar nuestras certezas. La duda metódica y la búsqueda rigurosa de evidencia empírica son los motores fundamentales de la verdad racional. Reconocer los límites de nuestro saber presente es el primer paso indispensable para alcanzar nuevos horizontes de descubrimiento.'
        }
      },
      {
        id: 'lesson-b2-48-4',
        unitId: 'unit-b2-48',
        lessonNumber: 4,
        title_es: 'Sostenibilidad Planetaria y la Transición Energética Justa',
        title_en: 'Planetary Sustainability & Just Energy Transition',
        title_ar: 'الاستدامة الكوكبية والتحول الطاقي العادل',
        cefr: 'B2',
        objectives_en: ['Discuss decarbonization, renewable energy grids, circular economy, and climate justice', 'Use high-register ecological syntax', 'Author a policy briefing for sustainable urban transformation'],
        objectives_ar: ['مناقشة خفض الانبعاثات الكربونية، شبكات الطاقة المتجددة، الاقتصاد الدائري، والعدالة المناخية', 'استخدام التراكيب اللغوية البيئية المتخصصة', 'صياغة ورقة سياسات للتحول الحضري المستدام'],
        vocabWordIds: ['w-descarbonizacion', 'w-economia-circular', 'w-justicia-climatica', 'w-renovables', 'w-biodiversidad'],
        dialogue: [
          { speaker: 'Ambientóloga', es: 'La transición hacia un modelo energético descarbonizado no es solo un imperativo ambiental, sino una oportunidad histórica para construir una economía más justa y circular.', en: 'The transition to a decarbonized energy model is not only an environmental imperative but a historical opportunity...', ar: 'إن التحول نحو نموذج طاقي خالٍ من الكربون ليس مجرد ضرورة بيئية، بل هو فرصة تاريخية لبناء اقتصاد أكثر عدالة واستدامة.' }
        ],
        exercises: [
          {
            id: 'ex-b2-48-4-1',
            type: 'multiple_choice',
            prompt_es: 'El concepto de "economía circular" promueve principalmente:',
            prompt_en: 'The circular economy concept primarily promotes:',
            prompt_ar: 'يروج مفهوم "الاقتصاد الدائري" بشكل أساسي لـ:',
            options: ['Rediseñar, reutilizar, reparar y reciclar materiales para eliminar los residuos y proteger los recursos del planeta', 'Comprar y tirar productos todos los días', 'Construir edificios redondos', 'Viajar en círculo'],
            correctAnswer: 'Rediseñar, reutilizar, reparar y reciclar materiales para eliminar los residuos y proteger los recursos del planeta',
            explanation_en: 'Circular economy eliminates waste through redesign, reuse, and closed-loop recycling.',
            explanation_ar: 'يقوم الاقتصاد الدائري على إعادة التدوير والاستخدام وإلغاء النفايات لحماية موارد الكوكب.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence policy proposal for an eco-sustainable smart city powered by 100% renewable energy and circular recycling systems.',
          prompt_ar: 'اكتب مقترح سياسات من 3 جمل لمدينة ذكية مستدامة تعمل بالطاقة المتجددة بالكامل وأنظمة الاقتصاد الدائري.',
          minSentences: 3,
          sampleTarget: 'Proponemos la transformación integral de los sistemas de transporte urbano mediante la adopción exclusiva de vehículos eléctricos no contaminantes. Es fundamental que todos los edificios de nueva construcción integren paneles solares y sistemas avanzados de reciclaje de aguas pluviales. Con estas medidas vanguardistas garantizaremos una reducción drástica de la huella de carbono y mejoraremos la calidad de vida de todos los ciudadanos.'
        }
      }
    ]
  },

  // UNIT 49: El Arte de la Oratoria y la Retórica Persuasiva
  {
    id: 'unit-b2-49',
    level: 'B2',
    unitNumber: 49,
    title_es: 'El Arte de la Oratoria y Retórica Persuasiva',
    title_en: 'The Art of Public Speaking & Persuasive Rhetoric',
    title_ar: 'فن الخطابة العامة والبلاغة الإقناعية الرفيعة',
    description_en: 'Master classical rhetoric (Ethos, Pathos, Logos), rhetorical figures (anaphora, antithesis, rhetorical questions), and public speaking delivery in Spanish.',
    description_ar: 'إتقان البلاغة الكلاسيكية (المصداقية، العاطفة، المنطق)، المحسنات البديعية (التكرار، الطباق، الاستفهام الاستنكاري)، وفنون الإلقاء المؤثر أمام الجماهير.',
    lessons: [
      {
        id: 'lesson-b2-49-1',
        unitId: 'unit-b2-49',
        lessonNumber: 1,
        title_es: 'Los Tres Pilares Clásicos: Ethos, Pathos y Logos en Español',
        title_en: 'The Three Classical Pillars: Ethos, Pathos & Logos',
        title_ar: 'الأركان البلاغية الكلاسيكية الثلاثة: المصداقية، الوجدان، والبرهان',
        cefr: 'B2',
        objectives_en: ['Ethos: Establish credibility and moral authority (Como médico con veinte años de servicio...)', 'Pathos: Connect emotionally and inspire empathy (Pensemos en el futuro de nuestros hijos...)', 'Logos: Provide rock-solid logic, causality, and evidence (Los datos demuestran de manera inequívoca...)'],
        objectives_ar: ['Ethos (المصداقية): إبراز الخبرة والمكانة الأخلاقية للمتحدث', 'Pathos (الوجدان): إثارة المشاعر الصادقة والتعاطف الإنساني', 'Logos (البرهان): تقديم الأدلة المنطقية والحجج العقلانية القاطعة'],
        vocabWordIds: ['w-oratoria', 'w-ethos', 'w-pathos', 'w-logos', 'w-retorica'],
        dialogue: [
          { speaker: 'Orador', es: 'No les hablo solo como científico (Ethos), sino como padre que sueña con un mundo mejor (Pathos), respaldado por décadas de rigurosa investigación científica (Logos).', en: 'I speak not only as a scientist (Ethos), but as a father (Pathos), backed by decades of research (Logos).', ar: 'لا أحدثكم فقط كعالم (مصداقية)، بل كأب يحلم بعالم أفضل (وجدان)، مستنداً لعقود من البحث العلمي الرصين (برهان).' }
        ],
        exercises: [
          {
            id: 'ex-b2-49-1-1',
            type: 'multiple_choice',
            prompt_es: 'En la retórica clásica, el "Pathos" apela fundamentalmente a:',
            prompt_en: 'In classical rhetoric, Pathos fundamentally appeals to:',
            prompt_ar: 'في البلاغة الكلاسيكية، يخاطب عنصر "Pathos" بشكل أساسي:',
            options: ['Las emociones, la empatía y los sentimientos del público', 'Las matemáticas puras', 'El diccionario etimológico', 'El reloj de la sala'],
            correctAnswer: 'Las emociones, la empatía y los sentimientos del público',
            explanation_en: 'Pathos moves the audience through emotional connection and empathy.',
            explanation_ar: 'يخاطب Pathos الوجدان والمشاعر والتعاطف الإنساني لتحريك قلوب المستمعين.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a powerful 3-sentence speech opening combining Ethos (credibility), Pathos (heart), and Logos (facts).',
          prompt_ar: 'اكتب افتتاحية خطاب مؤثرة من 3 جمل تدمج فيها الأركان الثلاثة: المصداقية، العاطفة، والمنطق.',
          minSentences: 3,
          sampleTarget: 'A lo largo de mis quince años como educador he sido testigo presencial del poder transformador del conocimiento en miles de jóvenes. Sé bien que cada niño que no tiene acceso a libros es una promesa truncada para el porvenir de nuestra sociedad. Las investigaciones demuestran de forma irrebatible que cada euro invertido en educación temprana genera un retorno social y económico multiplicador.'
        }
      },
      {
        id: 'lesson-b2-49-2',
        unitId: 'unit-b2-49',
        lessonNumber: 2,
        title_es: 'Figuras Retóricas: La Anáfora, la Antítesis y la Pregunta Retórica',
        title_en: 'Rhetorical Figures: Anaphora, Antithesis & Rhetorical Questions',
        title_ar: 'المحسنات البديعية: التكرار الصوتي Anáfora، الطباق، والاستفهام البلاغي',
        cefr: 'B2',
        objectives_en: ['Anaphora: Repeating opening words for cadence (Lucharemos por la verdad, lucharemos por la justicia, lucharemos por el mañana)', 'Antithesis: Contrasting opposing concepts (Un pequeño paso para el hombre, un gran salto para la humanidad)', 'Rhetorical Questions: Posing reflective questions that compel agreement'],
        objectives_ar: ['Anáfora (التكرار البلاغي): تكرار بدايات الجمل لإعطاء إيقاع نغمي مهيب', 'Antítesis (الطباق والمقابلة): الجمع بين المتناقضات لإبراز المعنى', 'الاستفهام الاستنكاري البلاغي: طرح أسئلة تحفز التفكير وتنتزع الإقرار'],
        vocabWordIds: ['w-anafora', 'w-antitesis', 'w-pregunta-retorica', 'w-cadencia', 'w-impacto-emocional'],
        dialogue: [
          { speaker: 'Líder', es: '¿Acaso podemos quedarnos de brazos cruzados? Lucharemos con la palabra, lucharemos con la razón, lucharemos hasta que la dignidad sea una realidad para todos.', en: 'Can we just stand by idly? We will fight with words, with reason, until dignity is real for all.', ar: 'هل يمكننا أن نقف مكتوفي الأيدي؟ سنناضل بالكلمة، سنناضل بالمنطق، سنناضل حتى تصبح الكرامة واقعاً للجميع.' }
        ],
        exercises: [
          {
            id: 'ex-b2-49-2-1',
            type: 'multiple_choice',
            prompt_es: 'La frase "Es tan corto el amor y es tan largo el olvido" (Pablo Neruda) es un ejemplo magistral de:',
            prompt_en: '"Es tan corto el amor y es tan largo el olvido" is a masterclass example of:',
            prompt_ar: 'عبارة بابلو نيرودا الخالدة "ما أقصر الحب وما أطول النسيان" هي مثال بديع على:',
            options: ['Antítesis poética (corto vs largo / amor vs olvido)', 'Un error de imprenta', 'Una factura comercial', 'Un informe meteorológico'],
            correctAnswer: 'Antítesis poética (corto vs largo / amor vs olvido)',
            explanation_en: 'Antithesis juxtaposes contrasting ideas (corto/largo, amor/olvido) to create profound poetic resonance.',
            explanation_ar: 'الطباق والمقابلة يجمعان بين الأضداد ليولدا عمقاً شعرياً وتأثيراً وجدانياً ساحراً.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence impassioned speech excerpt using anaphora (repetitive opening cadence) and an antithesis.',
          prompt_ar: 'اكتب مقتطفاً من 3 جمل لخطاب حماسي يوظف التكرار البلاغي والطباق.',
          minSentences: 3,
          sampleTarget: 'Creemos en la fuerza de la esperanza frente a la oscuridad del desánimo. Creemos en el diálogo constructivo donde otros solo ven división insuperable. Aunque el camino sea arduo y los desafíos sean inmensos, la recompensa de un mundo en paz será infinitamente mayor.'
        }
      },
      {
        id: 'lesson-b2-49-3',
        unitId: 'unit-b2-49',
        lessonNumber: 3,
        title_es: 'La Estructura Tripartita del Discurso: Exordio, Cuerpo y Peroración',
        title_en: 'Tripartite Speech Structure: Exordium, Body & Peroration',
        title_ar: 'الهيكل الثلاثي للخطبة: الاستهلال، المتن، والخاتمة الحماسية',
        cefr: 'B2',
        objectives_en: ['Exordio (Hook): Capture immediate attention and establish rapport', 'Cuerpo (Body): Present three strong structured points with seamless transitions', 'Peroración (Call to Action / Climax): Deliver an electrifying, unforgettable call to action'],
        objectives_ar: ['الاستهلال (Exordio): جذب انتباه الجمهور من اللحظة الأولى وبناء الألفة', 'المتن (Cuerpo): عرض 3 محاور محكمة مدعمة بالحجج وروابط الانتقال', 'الخاتمة الحماسية (Peroración): إطلاق نداء للعمل يخلد في ذاكرة السامعين'],
        vocabWordIds: ['w-exordio', 'w-cuerpo-del-discurso', 'w-peroracion', 'w-llamada-a-la-accion', 'w-climax'],
        dialogue: [
          { speaker: 'Profesor de Oratoria', es: 'Un discurso memorable comienza con un exordio que cautiva el alma, se sostiene con un cuerpo de argumentos impecables y culmina con una peroración que mueve voluntades.', en: 'A memorable speech captures the soul in the hook, persuades in the body, and moves action in the climax.', ar: 'الخطاب الخالد يبدأ باستهلال يأسر الأرواح، ويقوم على متن من الحجج المحكمة، ويتوج بخاتمة تحرك الإرادات.' }
        ],
        exercises: [
          {
            id: 'ex-b2-49-3-1',
            type: 'multiple_choice',
            prompt_es: 'La "peroración" en la oratoria clásica es:',
            prompt_en: 'The "peroración" in classical oratory is:',
            prompt_ar: '"الخاتمة الحماسية" (Peroración) في الخطابة الكلاسيكية هي:',
            options: ['La parte final y culminante del discurso donde se resume con emoción y se invita a la acción', 'El momento de apagar las luces', 'La lista de asistentes', 'La prueba de sonido'],
            correctAnswer: 'La parte final y culminante del discurso donde se resume con emoción y se invita a la acción',
            explanation_en: 'The peroration is the emotional climax and final call to action.',
            explanation_ar: 'الخاتمة الحماسية هي ذروة الخطاب التي تلخص الرسالة بعاطفة جياشة وتحفز على العمل.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write an electrifying 3-sentence Peroración (final call to action) for a speech on protecting nature.',
          prompt_ar: 'اكتب خاتمة حماسية مؤثرة من 3 جمل لخطاب يدعو لحماية كوكب الأرض.',
          minSentences: 3,
          sampleTarget: 'Ha llegado el momento de pasar de las palabras a los hechos transformadores. La historia no nos juzgará por nuestras intenciones declaradas, sino por la valentía de nuestras acciones concretas en favor de este planeta. ¡Unamos nuestras voluntades hoy mismo y leguemos a las generaciones venideras una Tierra viva, verde y próspera!'
        }
      },
      {
        id: 'lesson-b2-49-4',
        unitId: 'unit-b2-49',
        lessonNumber: 4,
        title_es: 'Manejo de Preguntas Hostiles y Argumentación Refutativa',
        title_en: 'Handling Hostile Questions & Refutation Tactics',
        title_ar: 'التعامل مع الأسئلة العدائية وتكتيكات التفنيد الدبلوماسي',
        cefr: 'B2',
        objectives_en: ['Neutralize adversarial questions with composure (Agradezco su pregunta porque me permite aclarar...)', 'Reframe loaded premises constructively', 'Refute fallacies with elegance and irrefutable empirical counter-examples'],
        objectives_ar: ['امتصاص الأسئلة المستفزة بدبلوماسية وهدوء واثق (أشكرك على سؤالك لأنه يتيح لي توضيح...)', 'إعادة صياغة الفرضيات المشحونة وتوجيهها بشكل بناء', 'تفنيد المغالطات المنطقية بأدلة تجريبية دامغة دون انفعال'],
        vocabWordIds: ['w-refutacion', 'w-pregunta-hostil', 'w-templanza', 'w-reencuadre', 'w-falacia'],
        dialogue: [
          { speaker: 'Portavoz', es: 'Comprendo perfectamente su inquietud y le agradezco la oportunidad de matizar ese punto: los datos demuestran que las medidas adoptadas no reducen el empleo, sino que lo cualifican.', en: 'I understand your concern and thank you for the chance to clarify: data shows jobs are upgraded, not cut.', ar: 'أتفهم قلقك تماماً وأشكرك على إتاحة الفرصة لتوضيح هذه النقطة: البيانات تثبت أن الإجراءات لم تقلص الوظائف بل رفعت كفاءتها.' }
        ],
        exercises: [
          {
            id: 'ex-b2-49-4-1',
            type: 'multiple_choice',
            prompt_es: 'Ante una pregunta agresiva en una rueda de prensa, la mejor técnica oratoria es:',
            prompt_en: 'When facing an aggressive question, the best oratory technique is:',
            prompt_ar: 'أمام سؤال هجومي في مؤتمر صحفي، التكتيك الخطابي الأمثل هو:',
            options: ['Mantener la serenidad, agradecer el tema y reencuadrar la respuesta con datos objetivos y tono constructivo', 'Gritar e insultar al periodista', 'Abandonar la sala corriendo', 'Negarse a hablar para siempre'],
            correctAnswer: 'Mantener la serenidad, agradecer el tema y reencuadrar la respuesta con datos objetivos y tono constructivo',
            explanation_en: 'Poise, reframing, and calm factual evidence defuse hostility effectively.',
            explanation_ar: 'الهدوء والثبات وإعادة صياغة الموضوع بالحقائق الدامغة يحيد الهجوم ببراعة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence masterclass diplomatic rebuttal responding calmly to a harsh criticism of your project.',
          prompt_ar: 'اكتب رداً دبلوماسياً رفيعاً من 3 جمل تفند فيه بهدوء نقداً لاذعاً وُجه لمشروعك.',
          minSentences: 3,
          sampleTarget: 'Agradezco sinceramente su objeción, ya que nos permite clarificar aspectos esenciales del proyecto que quizás no quedaron suficientemente explícitos. Si bien es comprensible su cautela inicial, los estudios de impacto independientes demuestran la plena viabilidad técnica y financiera de la iniciativa. Estamos plenamente abiertos a incorporar sus valiosas sugerencias para optimizar aún más los resultados colectivos.'
        }
      }
    ]
  },

  // UNIT 50: Gran Capstone B2 y Graduación hacia la Maestría
  {
    id: 'unit-b2-50',
    level: 'B2',
    unitNumber: 50,
    title_es: 'Gran Capstone B2 y Graduación hacia la Maestría',
    title_en: 'B2 Master Capstone & Graduation to Fluency',
    title_ar: 'المشروع الشامل الأكبر والتخرج إلى الطلاقة الكاملة B2',
    description_en: 'The ultimate synthesis of the entire Spanish learning journey across 50 units (200 lessons, 1000+ vocabulary words). Write a comprehensive thesis essay and achieve full CEFR B2 Independent Mastery.',
    description_ar: 'التتويج الشامل لرحلة تعلم اللغة الإسبانية عبر 50 وحدة كاملة (200 درس وأكثر من 1000 كلمة ومفردة). كتابة مقال تخرج أطروحة شامل والتتويج بالشهادة المتقدمة CEFR B2.',
    lessons: [
      {
        id: 'lesson-b2-50-1',
        unitId: 'unit-b2-50',
        lessonNumber: 1,
        title_es: 'El Gran Inventario Lingüístico: De A1 a B2',
        title_en: 'The Grand Linguistic Inventory: From A1 to B2',
        title_ar: 'الجرد اللغوي الشامل: من الألفباء A1 إلى الطلاقة المتقدمة B2',
        cefr: 'B2',
        objectives_en: ['Review the full structural arc: A1 Foundations -> A2 Past Tenses & Pronouns -> B1 Subjunctive & Connectors -> B2 Past Subjunctive, Conditionals & Rhetoric', 'Recognize your total linguistic transformation', 'Gain absolute pride and fluency confidence'],
        objectives_ar: ['استعراض المسار البنائي الكامل: أساسيات A1 -> أزمنة الماضي والضمائر A2 -> المنصوب وروابط الخطاب B1 -> ماضي المنصوب والشرط والبلاغة B2', 'إدراك التحول اللغوي والمعرفي الهائل الذي حققته', 'اكتساب ثقة مطلقة في التحدث والكتابة باللغة الإسبانية'],
        vocabWordIds: ['w-inventario-linguistico', 'w-transformacion', 'w-dominio-total', 'w-fluidez-absoluta', 'w-victoria'],
        dialogue: [
          { speaker: 'Tutor IA', es: 'Comenzaste diciendo "Hola, me llamo..." en la Unidad 1 y hoy eres capaz de debatir sobre bioética, filosofía y retórica en la Unidad 50. ¡Has conquistado el idioma español con excelencia!', en: 'You started with "Hola..." in Unit 1 and today you debate bioethics in Unit 50. You conquered Spanish!', ar: 'بدأت بـ "Hola..." في الوحدة 1 واليوم تناظر في الأخلاقيات والفلسفة والبلاغة في الوحدة 50. لقد قهرت اللغة الإسبانية بجدارة!' }
        ],
        exercises: [
          {
            id: 'ex-b2-50-1-1',
            type: 'multiple_choice',
            prompt_es: 'Completar 50 unidades y 200 lecciones estructuradas representa:',
            prompt_en: 'Completing 50 units and 200 lessons represents:',
            prompt_ar: 'إتمام 50 وحدة و 200 درس منظم يمثل:',
            options: ['El dominio integral y sólido del idioma español según el marco europeo CEFR (Niveles A1, A2, B1 y B2 completos)', 'Solo saber saludar', 'Aprender tres palabras', 'Un juego simple'],
            correctAnswer: 'El dominio integral y sólido del idioma español según el marco europeo CEFR (Niveles A1, A2, B1 y B2 completos)',
            explanation_en: 'You have conquered the full spectrum of Spanish from beginner to advanced mastery.',
            explanation_ar: 'لقد أتممت بنجاح كامل النطاق المعتمد للغة الإسبانية من المبتدئ إلى الطلاقة المتقدمة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 4 reflective sentences summarizing your incredible journey learning Spanish and the new doors it opens for your life.',
          prompt_ar: 'اكتب 4 جمل تلخص فيها رحلتك الاستثنائية في تعلم الإسبانية والآفاق الجديدة التي تفتحها في حياتك.',
          minSentences: 4,
          sampleTarget: 'El viaje a través de estas cincuenta unidades ha transformado profundamente mi capacidad de comprender el mundo hispanohablante. He aprendido no solo la gramática y el vocabulario esencial, sino también la riqueza cultural, histórica y humana que encierra cada palabra. Hoy me siento plenamente capacitado para expresar mis ideas, debatir con respeto y conectar con más de quinientos millones de personas. Esta conquista lingüística representa el inicio de innumerables oportunidades personales y profesionales.'
        }
      },
      {
        id: 'lesson-b2-50-2',
        unitId: 'unit-b2-50',
        lessonNumber: 2,
        title_es: 'Lectura Magistral B2: La Lengua Española como Puente Global',
        title_en: 'Master Reading B2: Spanish as a Global Cultural Bridge',
        title_ar: 'القراءة الأكاديمية الشاملة B2: اللغة الإسبانية كجسر حضاري عالمي',
        cefr: 'B2',
        objectives_en: ['Read a 400-word master text celebrating the history, diversity, literature, and global future of the Spanish language', 'Synthesize past subjunctive, conditionals, discourse markers, and advanced vocabulary', 'Demonstrate native-level comprehension'],
        objectives_ar: ['قراءة نص أكاديمي شامل من 400 كلمة يحتفي بتاريخ اللغة الإسبانية وتنوعها وآفاقها المستقبلية', 'استيعاب كل قواعد الماضي المنصوب والشرط وروابط الخطاب والمفردات الرفيعة', 'إثبات الفهم القرائي العميق'],
        vocabWordIds: ['w-puente-global', 'w-hispanidad', 'w-patrimonio-inmaterial', 'w-universalidad', 'w-horizonte'],
        dialogue: [
          { speaker: 'Catedrático', es: 'El español es una lengua viva, mestiza y hospitalaria que late con la fuerza de más de veinte naciones, uniendo continentes a través de la belleza compartida de la palabra.', en: 'Spanish is a living, hospitable language pulsating across 20+ nations, uniting continents.', ar: 'اللغة الإسبانية هي لسان حي مضياف ينبض بقوة أكثر من عشرين أمة، موحداً القارات بجمال الكلمة المشتركة.' }
        ],
        exercises: [
          {
            id: 'ex-b2-50-2-1',
            type: 'multiple_choice',
            prompt_es: 'La principal riqueza del idioma español radica en:',
            prompt_en: 'The core richness of the Spanish language lies in:',
            prompt_ar: 'تكمن الثروة الكبرى للغة الإسبانية في:',
            options: ['Su extraordinaria diversidad dialectal unida por una profunda fraternidad cultural y literaria', 'Tener una sola palabra para todo', 'Ser hablada solo en una pequeña isla', 'No tener literatura'],
            correctAnswer: 'Su extraordinaria diversidad dialectal unida por una profunda fraternidad cultural y literaria',
            explanation_en: 'Its immense cultural and dialectal diversity unites over 500 million speakers worldwide.',
            explanation_ar: 'تنوعها الثقافي واللهجي الهائل الذي يوحد أكثر من 500 مليون ناطق حول العالم.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences expressing your personal appreciation for the global Hispanic cultural heritage and literature.',
          prompt_ar: 'اكتب 3 جمل تعبر فيها عن تقديرك للتراث الثقافي والأدبي الإسباني واللاتيني.',
          minSentences: 3,
          sampleTarget: 'El patrimonio cultural hispanoamericano es un mosaico deslumbrante de música, arte, gastronomía y literatura inmortal. Autores como Cervantes, García Márquez y Lorca han enriquecido el imaginario universal con obras de una belleza insuperable. Dominar esta lengua es poseer la llave mágica para adentrarse en un universo de calidez humana inigualable.'
        }
      },
      {
        id: 'lesson-b2-50-3',
        unitId: 'unit-b2-50',
        lessonNumber: 3,
        title_es: 'Defensa Oral de Tesis y Debate Dialéctico B2',
        title_en: 'Oral Thesis Defense & Dialectical Debate B2',
        title_ar: 'الدفاع الشفهي عن الأطروحة والمناظرة الفكرية B2',
        cefr: 'B2',
        objectives_en: ['Structure a 3-minute oral thesis presentation in Spanish', 'Defend arguments against counter-points using conditional and subjunctive sequences', 'Deliver with executive stage presence, confidence, and rhetorical poise'],
        objectives_ar: ['هيكلة عرض تقديمي شفهي متكامل لأطروحة فكرية بالإسبانية', 'الدفاع عن الأفكار وتفنيد الحجج المضادة باستخدام تراكيب الشرط و Subjuntivo', 'الإلقاء بحضور مسرحي واثق وبلاغة رصينة'],
        vocabWordIds: ['w-defensa-de-tesis', 'w-debate-dialectico', 'w-aplomo', 'w-elocuencia', 'w-maestria'],
        dialogue: [
          { speaker: 'Tribunal', es: 'Su exposición ha sido sumamente elocuente, rigurosa y convincente. Ha demostrado un dominio lingüístico y conceptual digno del más alto reconocimiento académico.', en: 'Your defense was eloquent, rigorous, and persuasive. You demonstrated mastery worthy of top honors.', ar: 'لقد كان عرضك بليغاً ودقيقاً ومقنعاً للغاية. ولقد أثبتّ تمكناً لغوياً وفكرياً يستحق أرفع تقدير أكاديمي.' }
        ],
        exercises: [
          {
            id: 'ex-b2-50-3-1',
            type: 'multiple_choice',
            prompt_es: 'En una defensa de tesis académica, la cualidad más valorada es:',
            prompt_en: 'In an academic thesis defense, the most valued quality is:',
            prompt_ar: 'في الدفاع الأكاديمي عن الأطروحات، السمة الأكثر تقديراً هي:',
            options: ['La claridad argumentativa, el rigor metodológico y la solvencia comunicativa en el uso de la lengua', 'Hablar muy rápido sin respirar', 'Memorizar sin entender', 'Llevar muchos papeles'],
            correctAnswer: 'La claridad argumentativa, el rigor metodológico y la solvencia comunicativa en el uso de la lengua',
            explanation_en: 'Clarity, rigor, and communicative poise are the hallmarks of academic excellence.',
            explanation_ar: 'الوضوح المنطقي، الدقة المنهجية، والتمكن البلاغي هي ركائز التفوق الأكاديمي.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 4-sentence thesis defense excerpt asserting why linguistic empathy is essential for the future of global peace.',
          prompt_ar: 'اكتب مقتطفاً من 4 جمل للدفاع عن أطروحة تؤكد فيها أن التعاطف اللغوي جوهري لمستقبل السلام العالمي.',
          minSentences: 4,
          sampleTarget: 'Sostengo ante este distinguido tribunal que el aprendizaje intercultural de idiomas es la herramienta diplomática más eficaz para prevenir conflictos globales. Cuando nos esforzamos por hablar la lengua del otro, no solo aprendemos palabras, sino que abrazamos su cosmovisión y sus valores humanos. Si los líderes mundiales dialogaran con genuina empatía lingüística, las soluciones de consenso serían infinitamente más duraderas. En conclusión, educar para la comprensión lingüística es construir los cimientos indestructibles de una paz universal.'
        }
      },
      {
        id: 'lesson-b2-50-4',
        unitId: 'unit-b2-50',
        lessonNumber: 4,
        title_es: 'Gran Ensayo Magistral B2 y Graduación Oficial',
        title_en: 'Grand B2 Master Essay & Official Graduation',
        title_ar: 'المقال الأكاديمي الشامل الأكبر والتخرج الرسمي بمرتبة الشرف',
        cefr: 'B2',
        objectives_en: ['Author a comprehensive 10-sentence Masterpiece Essay integrating the entire spectrum of Spanish grammar and vocabulary', 'Earn the official CEFR Level B2 Independent Fluency Diploma', 'Embark upon native-level bilingual mastery'],
        objectives_ar: ['كتابة مقال التخرج الأكاديمي الأكبر (10 جمل مترابطة على الأقل) يدمج كامل خلاصة قواعد ومفردات الإسبانية', 'نيل شهادة التخرج الرسمية المعتمدة للمستوى B2', 'الانطلاق بثقة كاملة في آفاق الطلاقة الحقيقية ثنائية اللغة'],
        vocabWordIds: ['w-gran-ensayo-magistral', 'w-graduacion-oficial', 'w-diploma-b2', 'w-bilinguismo', 'w-cumbre-del-exito'],
        dialogue: [
          { speaker: 'Directora Académica', es: '¡Enhorabuena por esta monumental hazaña! Has completado las 50 unidades y 200 lecciones de nuestra plataforma de élite. Hoy te otorgamos el Diploma Oficial de Nivel B2. ¡El idioma español es ya tu hogar y tu superpoder para siempre!', en: 'Heartfelt congratulations on this monumental feat! You completed all 50 units and 200 lessons. Today we award you the Official Level B2 Diploma. Spanish is forever your home!', ar: 'مبارك من صميم القلب على هذا الإنجاز التاريخي الخالد! لقد أتممت الـ 50 وحدة و 200 درس في منصتنا العالمية. اليوم نمنحك الدبلوم الرسمي المعتمد للمستوى B2. لقد أصبحت اللغة الإسبانية وطنك وسلاحك المعرفي إلى الأبد!' }
        ],
        exercises: [
          {
            id: 'ex-b2-50-4-1',
            type: 'multiple_choice',
            prompt_es: '¡Has conquistado el Nivel B2! ¿Qué significa este logro en tu vida?',
            prompt_en: 'You have conquered Level B2! What does this milestone mean?',
            prompt_ar: 'لقد قهرت المستوى B2! ماذا يعني هذا الإنجاز الاستثنائي في حياتك؟',
            options: ['La capacidad de comunicarme, trabajar, debatir y crear con total fluidez, confianza y elegancia en el idioma español en cualquier lugar del mundo', 'Nada en absoluto', 'Solo un juego de computadora', 'Tener que empezar de cero'],
            correctAnswer: 'La capacidad de comunicarme, trabajar, debatir y crear con total fluidez, confianza y elegancia en el idioma español en cualquier lugar del mundo',
            explanation_en: 'Level B2 grants full operational independence to study, work, and thrive fluently in Spanish globally.',
            explanation_ar: 'يمنحك المستوى B2 الاستقلالية والطلاقة الكاملة للعمل والدراسة والعيش والإبداع بالإسبانية في أي مكان في العالم.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write your Grand B2 Master Essay (at least 10 sentences) delivering an articulate philosophical, cultural, or personal vision for your future, synthesizing the rich grammar and vocabulary of all 50 units.',
          prompt_ar: 'اكتب مقالك الأكاديمي الأكبر للتخرج (10 جمل متماسكة على الأقل) تقدم فيه رؤيتك الفكرية والشخصية للمستقبل مستعرضاً كل أدوات البلاغة واللغة الإسبانية.',
          minSentences: 10,
          sampleTarget: 'El dominio de la lengua española que he consolidado a lo largo de estas cincuenta unidades representa uno de los logros intelectuales más trascendentales de mi vida. Cuando miro hacia atrás y recuerdo mis primeros pasos con el alfabeto y los saludos básicos, me asombra constatar el inmenso poder de la perseverancia diaria. Hoy puedo adentrarme con absoluta confianza en debates filosóficos, analizar textos literarios de autores laureados con el Premio Nobel y formular argumentos diplomáticos con refinada precisión retórica. La lengua española me ha abierto las puertas a una cosmovisión vibrante donde la hospitalidad, la pasión y la creatividad se entrelazan de manera prodigiosa. Si no hubiera tenido el coraje de asumir este reto formativo, hoy no poseería la llave para conectar fraternalmente con más de quinientos millones de almas en todo el planeta. Dominar el subjuntivo, los condicionales hipotéticos y los conectores avanzados me permite matizar mis pensamientos con una sutileza que antes me parecía inalcanzable. Es indudable que el verdadero multilingüismo no consiste únicamente en traducir palabras, sino en ampliar la propia sensibilidad humana y cultivar una empatía universal sin fronteras. A partir de hoy, utilizaré este hermoso idioma para tender puentes de concordia, impulsar proyectos de innovación y celebrar la inagotable riqueza de la diversidad cultural. Agradezco profundamente cada lección, cada diálogo y cada ejercicio interactivo que guiaron mi sendero hacia esta cumbre del conocimiento. ¡Con orgullo inquebrantable y gratitud infinita, recibo este diploma de Nivel B2 y declaro que mi amor por el idioma español perdurará por siempre!'
        }
      }
    ]
  }
];
