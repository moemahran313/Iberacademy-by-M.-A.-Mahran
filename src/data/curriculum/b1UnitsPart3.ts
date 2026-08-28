import { Unit } from '../../types';

export const B1_UNITS_PART3: Unit[] = [
  // UNIT 35: Relaciones Complejas y Subjuntivo con Antecedente Desconocido
  {
    id: 'unit-b1-35',
    level: 'B1',
    unitNumber: 35,
    title_es: 'Subjuntivo en Oraciones de Relativo',
    title_en: 'Subjunctive in Relative Clauses',
    title_ar: 'صيغة المنصوب Subjuntivo في الجمل الموصولة',
    description_en: 'Master identifying known antecedents (Indicative: Conozco a un chico que habla árabe) vs unknown/nonexistent antecedents (Subjunctive: Busco a alguien que hable árabe / No hay nadie que sepa).',
    description_ar: 'التمييز الدقيق بين الموصول المعروف المعين (Indicativo) والموصول المجهول أو المنفي غير الموجود (Subjuntivo: Busco a alguien que hable / No hay nadie que sepa).',
    lessons: [
      {
        id: 'lesson-b1-35-1',
        unitId: 'unit-b1-35',
        lessonNumber: 1,
        title_es: 'Antecedente Conocido (Indicativo) vs Desconocido (Subjuntivo)',
        title_en: 'Known vs Unknown Antecedents',
        title_ar: 'الموصول المعروف المعين مقابل الموصول المجهول غير المحدد',
        cefr: 'B1',
        objectives_en: ['Known specific entity = Indicative (Tengo un piso que TIENE terraza)', 'Unknown hypothetical entity = Subjunctive (Busco un piso que TENGA terraza)', 'Apply to job searches, apartment hunting, and dating profiles'],
        objectives_ar: ['الشيء المعين المحدد في الواقع يأخذ Indicativo (Tengo un piso que tiene terraza)', 'الشيء المجهول المطلوب الذي تبحث عنه يأخذ Subjuntivo (Busco un piso que tenga terraza)', 'تطبيق القاعدة في إعلانات الوظائف والبحث عن سكن'],
        vocabWordIds: ['w-busco-a-alguien', 'w-necesito-algo', 'w-antecedente', 'w-requisito', 'w-perfil'],
        grammarTopicId: 'g-subjunctive-triggers',
        dialogue: [
          { speaker: 'Reclutador', es: 'Buscamos a un candidato que hable español con fluidez y que tenga experiencia en comercio internacional.', en: 'We are looking for a candidate who speaks Spanish fluently and has experience in international trade.', ar: 'نبحث عن مرشح يتحدث الإسبانية بطلاقة ولديه خبرة في التجارة الدولية.' },
          { speaker: 'Postulante', es: 'Yo soy esa persona. Conozco a muchos clientes que trabajan en ese mercado.', en: 'I am that person. I know many clients who work in that market.', ar: 'أنا هذا الشخص المطلوب. وأعرف العديد من العملاء الذين يعملون في تلك السوق.' }
        ],
        exercises: [
          {
            id: 'ex-b1-35-1-1',
            type: 'multiple_choice',
            prompt_es: '"Busco un hotel que ______ (tener) piscina climatizada."',
            prompt_en: 'Because you are searching for an unknown, hypothetical hotel, use:',
            prompt_ar: 'نظراً لأنك تبحث عن فندق غير محدد مسبقاً، استخدم صيغة Subjuntivo:',
            options: ['tenga', 'tiene', 'tenía', 'tendrá'],
            correctAnswer: 'tenga',
            explanation_en: 'Unknown/desired antecedent requires the subjunctive: tenga.',
            explanation_ar: 'الموصول المطلوب غير المحدد بعد فعل البحث يتطلب Subjuntivo: tenga.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences describing your ideal home, ideal job, or ideal travel partner using "Busco un/a... que + subjuntivo".',
          prompt_ar: 'اكتب 3 جمل تصف فيها منزلك المثالي أو وظيفتك المثالية باستخدام Busco... que + Subjuntivo.',
          minSentences: 3,
          sampleTarget: 'Busco un apartamento céntrico que tenga mucha luz natural y una terraza espaciosa. Necesito un empleo estimulante que me permita trabajar en remoto y viajar por el mundo. Busco un compañero de viaje que comparta mi pasión por la historia y la naturaleza.'
        }
      },
      {
        id: 'lesson-b1-35-2',
        unitId: 'unit-b1-35',
        lessonNumber: 2,
        title_es: 'Antecedente Negativo: No hay nadie que, No conozco ningún lugar que',
        title_en: 'Negative Antecedents: Nobody who, Nowhere that',
        title_ar: 'الموصول المنفي: لا يوجد أحد يعرف، لا أعرف أي مكان به',
        cefr: 'B1',
        objectives_en: ['When antecedent does not exist (Nadie, Ninguno, Nada), verb is ALWAYS Subjunctive (No hay nadie que sepa la verdad / No hay nada que me guste)', 'Formulate definitive exclusions', 'Master double negative structures in Spanish'],
        objectives_ar: ['عندما يكون الموصول منفياً أو غير موجود (Nadie, Nada, Ninguno) يأتي الفعل دائماً بصيغة Subjuntivo', 'صياغة الاستثناءات القاطعة', 'إتقان تراكيب النفي المزدوج في الإسبانية'],
        vocabWordIds: ['w-no-hay-nadie-que', 'w-no-hay-nada-que', 'w-ninguno', 'w-existencia', 'w-excepcion'],
        dialogue: [
          { speaker: 'Turista', es: '¿Conoce algún restaurante por aquí que sirva comida vegetariana a estas horas?', en: 'Do you know any restaurant around here that serves vegetarian food at this hour?', ar: 'هل تعرف أي مطعم هنا يقدم طعاماً نباتياً في هذه الساعة؟' },
          { speaker: 'Vecino', es: 'Lo siento, a estas horas de la madrugada no hay ningún lugar que esté abierto.', en: 'Sorry, at this early morning hour there is no place that is open.', ar: 'للأسف في هذه الساعة المتأخرة من الليل لا يوجد أي مكان مفتوح.' }
        ],
        exercises: [
          {
            id: 'ex-b1-35-2-1',
            type: 'multiple_choice',
            prompt_es: 'En la frase "No hay nadie en el aula que ______ (entender) este problema", el verbo va en:',
            prompt_en: 'After negative antecedent "No hay nadie que...", the verb is:',
            prompt_ar: 'بعد الموصول المنفي "No hay nadie que..." يصرف الفعل في:',
            options: ['entienda (Subjuntivo)', 'entiende (Indicativo)', 'entendió', 'entenderá'],
            correctAnswer: 'entienda (Subjuntivo)',
            explanation_en: 'Negative non-existent antecedent ("No hay nadie que") triggers the subjunctive: entienda.',
            explanation_ar: 'الموصول المنفي غير الموجود "No hay nadie que" يتطلب بالضرورة Subjuntivo: entienda.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 emphatic sentences using "No hay nadie que", "No hay nada que", and "No conozco ningún lugar que".',
          prompt_ar: 'اكتب 3 جمل توكيدية باستخدام تراكيب الموصول المنفي الثلاثة.',
          minSentences: 3,
          sampleTarget: 'No hay nada en este mundo que me haga más feliz que pasar tiempo de calidad con mi familia. No hay nadie en nuestro equipo que trabaje con tanta dedicación como nuestra líder. No conozco ningún lugar que tenga una atmósfera tan mágica como las montañas al atardecer.'
        }
      },
      {
        id: 'lesson-b1-35-3',
        unitId: 'unit-b1-35',
        lessonNumber: 3,
        title_es: 'Negociar Peticiones de Favores Delicadas',
        title_en: 'Delicate Favors & Interpersonal Negotiation',
        title_ar: 'طلب الخدمات الحساسة والتفاوض اللبق بين الأفراد',
        cefr: 'B1',
        objectives_en: ['Frame delicate requests with grace (¿Sería posible que me hicieras un favor?)', 'Mitigate imposition (Sé que estás muy ocupado, pero...)', 'Provide graceful face-saving exits for friends or colleagues'],
        objectives_ar: ['طلب الخدمات الحساسة بأقصى درجات اللباقة والتهذيب', 'تخفيف الحرج ومراعاة انشغال الطرف الآخر', 'إتاحة مخرج مريح للطرف الآخر بدون إحراج'],
        vocabWordIds: ['w-favor', 'w-delicado', 'w-agradecer', 'w-compromiso', 'w-confianza'],
        dialogue: [
          { speaker: 'Elena', es: 'Sé que estás con mucho trabajo, pero ¿sería posible que revisaras este documento antes de las cinco si tienes un momento?', en: 'I know you have a lot of work, but would it be possible for you to review this document...', ar: 'أعلم أنك منشغل جداً، ولكن هل يمكن أن تراجع هذه الوثيقة قبل الخامسة إن تيسر لك وقت؟' },
          { speaker: 'Carlos', es: 'Por supuesto, cuenta con ello. Con gusto te ayudo.', en: 'Of course, count on it. I’d gladly help you.', ar: 'بكل تأكيد، اعتمد عليّ. سأساعدك بكل سرور.' }
        ],
        exercises: [
          {
            id: 'ex-b1-35-3-1',
            type: 'multiple_choice',
            prompt_es: '¿Cuál es la fórmula más diplomática para pedir ayuda profesional?',
            prompt_en: 'What is the most diplomatic formula to ask for professional assistance?',
            prompt_ar: 'ما هي الصيغة الأكثر دبلوماسية ولباقة لطلب مساعدة مهنية؟',
            options: ['¿Sería posible que me ayudaras con este informe?', '¡Hazme este informe rápido!', 'Oye tú, trabaja para mí', 'Tienes que hacer esto'],
            correctAnswer: '¿Sería posible que me ayudaras con este informe?',
            explanation_en: 'Conditional + imperfect subjunctive creates the most courteous Spanish phrasing.',
            explanation_ar: 'صيغة ¿Sería posible que...? هي قمة اللباقة والدبلوماسية في اللغة الإسبانية.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-turn polite conversation requesting a delicate favor from a busy colleague and thanking them warmly.',
          prompt_ar: 'اكتب حواراً من 3 تبادلات تطلب فيه خدمة حساسة من زميل منشغل وتش Guten فيه بحرارة.',
          minSentences: 3,
          sampleTarget: '— Disculpa que te moleste, ¿sería posible que me cubrieras en la reunión de mañana por una urgencia familiar? — Por supuesto, no te preocupes en absoluto, yo me encargo de todo. — Muchísimas gracias, te agradezco enormemente tu generosidad y apoyo.'
        }
      },
      {
        id: 'lesson-b1-35-4',
        unitId: 'unit-b1-35',
        lessonNumber: 4,
        title_es: 'Redacción de Anuncios y Perfiles de Búsqueda',
        title_en: 'Writing Classifieds & Search Listings',
        title_ar: 'صياغة الإعلانات المبوبة وملفات البحث عن وظائف وسكن',
        cefr: 'B1',
        objectives_en: ['Draft professional job listings with required qualifications (Buscamos profesional que...)', 'Draft room rental listings with housemate criteria', 'Incorporate relative subjunctive clauses accurately'],
        objectives_ar: ['صياغة إعلانات التوظيف الرسمية متضمنة الشروط والمواصفات', 'صياغة إعلانات البحث عن رفقاء سكن مع الشروط المطلوبة', 'دمج جمل Subjuntivo الموصولة بدقة متناهية'],
        vocabWordIds: ['w-anuncio', 'w-clasificado', 'w-convivencia', 'w-requisitos', 'w-perfil-profesional'],
        dialogue: [
          { speaker: 'Anuncio', es: 'Se busca compañero de piso tranquilo y responsable que sea no fumador, que respete los horarios de descanso y que le guste mantener la casa limpia y ordenada.', en: 'Seeking quiet and responsible flatmate who is non-smoker, respects quiet hours...', ar: 'مطلوب رفيق سكن هادئ ومسؤول غير مدخن يحترم أوقات الراحة ويحب الحفاظ على نظافة وترتيب المنزل.' }
        ],
        exercises: [
          {
            id: 'ex-b1-35-4-1',
            type: 'multiple_choice',
            prompt_es: 'En el anuncio: "Empresa internacional busca diseñador gráfico que ______ (dominar) herramientas 3D."',
            prompt_en: 'Choose the correct subjunctive for the required profile:',
            prompt_ar: 'اختر تصريف Subjuntivo المناسب للمواصفات المطلوبة في الإعلان:',
            options: ['domine', 'domina', 'dominó', 'dominará'],
            correctAnswer: 'domine',
            explanation_en: 'Job ad requirements describe an ideal candidate, triggering subjunctive: domine.',
            explanation_ar: 'متطلبات إعلانات التوظيف تصف مرشحاً مثالياً مرجواً، فتتطلب Subjuntivo: domine.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence professional classified ad seeking an ideal candidate for your company or team with specific skills in subjunctive.',
          prompt_ar: 'اكتب إعلاناً وظيفياً من 3 جمل تبحث فيه عن المرشح المثالي لفريقك.',
          minSentences: 3,
          sampleTarget: 'Prestigiosa empresa de tecnología busca desarrollador web que tenga pasión por la innovación y el trabajo en equipo. Buscamos a un profesional que domine varios lenguajes de programación y que hable español e inglés con soltura. Ofrecemos un entorno laboral flexible y excelentes oportunidades de crecimiento profesional.'
        }
      }
    ]
  },

  // UNIT 36: Sociedad, Literatura e Identidad Iberoamericana
  {
    id: 'unit-b1-36',
    level: 'B1',
    unitNumber: 36,
    title_es: 'Sociedad, Literatura y Cultura Iberoamericana',
    title_en: 'Society, Literature & Ibero-American Culture',
    title_ar: 'المجتمع والأدب والهوية الثقافية الإيبيروأمريكية',
    description_en: 'Explore magical realism (Gabriel García Márquez), Latin American literature, cinema, iconic art (Frida Kahlo, Picasso), and cultural history.',
    description_ar: 'استكشاف الواقعية السحرية (غابرييل غارسيا ماركيز)، الأدب الإيبيروأمريكي، السينما، الفن الخالد (فريدا كاهلو، بيكاسو)، والتاريخ الثقافي المشترك.',
    lessons: [
      {
        id: 'lesson-b1-36-1',
        unitId: 'unit-b1-36',
        lessonNumber: 1,
        title_es: 'El Realismo Mágico y Gabriel García Márquez',
        title_en: 'Magical Realism & Gabriel García Márquez',
        title_ar: 'الواقعية السحرية ورائعة غابرييل غارسيا ماركيز',
        cefr: 'B1',
        objectives_en: ['Understand the literary concept of "Realismo Mágico" (where extraordinary events are treated as everyday reality)', 'Explore "Cien años de soledad" and Macondo', 'Discuss Nobel laureates in Hispanic literature'],
        objectives_ar: ['فهم مفهوم الواقعية السحرية في الأدب (حيث يُعامل الخارق كأمر يومي مألوف)', 'التعرف على رواية مائة عام من العزلة وقرية ماكوندو الأسطورية', 'مناقشة حائزي جائزة نوبل في الأدب الإسباني واللاتيني'],
        vocabWordIds: ['w-realismo-magico', 'w-literatura', 'w-premio-nobel', 'w-novela', 'w-metafora'],
        dialogue: [
          { speaker: 'Profesora', es: 'Gabriel García Márquez combinó la realidad histórica con la imaginación mítica, creando una de las obras cumbres de la literatura universal: Cien años de soledad.', en: 'García Márquez combined historical reality with mythical imagination...', ar: 'دمج غابرييل غارسيا ماركيز الواقع التاريخي بالخيال الأسطوري، مبدعاً إحدى أروع روائع الأدب العالمي: مائة عام من العزلة.' }
        ],
        exercises: [
          {
            id: 'ex-b1-36-1-1',
            type: 'multiple_choice',
            prompt_es: 'El "Realismo Mágico" se caracteriza principalmente por:',
            prompt_en: 'Magical Realism is characterized mainly by:',
            prompt_ar: 'تتميز الواقعية السحرية بشكل أساسي بـ:',
            options: ['Integrar elementos mágicos y fantásticos en la vida cotidiana de forma natural', 'Escribir manuales de matemáticas', 'Traducir leyes jurídicas', 'Relatar únicamente crónicas de guerra'],
            correctAnswer: 'Integrar elementos mágicos y fantásticos en la vida cotidiana de forma natural',
            explanation_en: 'Magical realism seamlessly integrates fantastical events into realistic daily life.',
            explanation_ar: 'تدمج الواقعية السحرية العناصر الخارقة في نسيج الحياة اليومية بتلقائية وسلاسة مدهشة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences expressing your reflection on how literature helps us understand different cultures and human emotions.',
          prompt_ar: 'اكتب 3 جمل تعبر فيها عن كيف يساعدنا الأدب في فهم الثقافات والمشاعر الإنسانية.',
          minSentences: 3,
          sampleTarget: 'La literatura en lengua española es un tesoro fascinante que refleja la riqueza de diversas realidades humanas. A través de las novelas de grandes maestros podemos viajar en el tiempo y conectar con emociones universales. Leer a grandes autores amplía nuestra visión del mundo y enriquece nuestro dominio del idioma.'
        }
      },
      {
        id: 'lesson-b1-36-2',
        unitId: 'unit-b1-36',
        lessonNumber: 2,
        title_es: 'El Arte Vanguardista: De Frida Kahlo a Picasso',
        title_en: 'Avant-Garde Art: From Frida Kahlo to Picasso',
        title_ar: 'الفن الطليعي الخالد: من فريدا كاهلو إلى بيكاسو',
        cefr: 'B1',
        objectives_en: ['Analyze symbolism in Frida Kahlo’s self-portraits', 'Understand Cubism and Picasso’s masterpiece "Guernica"', 'Describe visual artwork with rich aesthetic vocabulary'],
        objectives_ar: ['تحليل الرمزية في لوحات فريدا كاهلو وسيرتها الملهمة', 'فهم التكعيبية ورائعة بيكاسو العالمية "غيرنيكا"', 'وصف الأعمال التشكيلية بمفردات جمالية راقية'],
        vocabWordIds: ['w-arte', 'w-pintura', 'w-vanguardia', 'w-simbolismo', 'w-retrato'],
        dialogue: [
          { speaker: 'Crítico', es: 'Frida Kahlo plasmó en sus autorretratos su dolor físico, su identidad mexicana y su inquebrantable fuerza espiritual con una autenticidad conmovedora.', en: 'Frida Kahlo captured physical pain, Mexican identity, and spiritual strength...', ar: 'جسدت فريدا كاهلو في لوحاتها الشخصية آلامها الجسدية، هويتها المكسيكية، وقوتها الروحية بصدق مذهل.' }
        ],
        exercises: [
          {
            id: 'ex-b1-36-2-1',
            type: 'multiple_choice',
            prompt_es: 'La monumental obra "Guernica" de Pablo Picasso es un alegato universal contra:',
            prompt_en: 'Pablo Picasso\'s masterpiece "Guernica" is a universal statement against:',
            prompt_ar: 'لوحة "غيرنيكا" الضخمة لبابلو بيكاسو هي صرخة عالمية ضد:',
            options: ['Los horrores de la guerra y la violencia sobre inocentes', 'La comida rápida', 'El transporte público', 'La música clásica'],
            correctAnswer: 'Los horrores de la guerra y la violencia sobre inocentes',
            explanation_en: 'Guernica is renowned worldwide as a powerful anti-war masterpiece.',
            explanation_ar: 'غيرنيكا هي أشهر لوحة في تاريخ الفن الحديث تندد بفظائع الحرب والعنف ضد الأبرياء.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences describing an artwork, painting, or sculpture that inspires you deeply.',
          prompt_ar: 'اكتب 3 جمل تصف فيها عملاً فنياً أو لوحة أو منحوتة تلهمك بعمق.',
          minSentences: 3,
          sampleTarget: 'El cuadro de Guernica me impacta profundamente por su fuerza expresiva y su potente mensaje de paz universal. Las figuras dramáticas en blanco y negro transmiten el dolor humano con una intensidad sobrecogedora. Considero que el arte comprometido tiene el poder de transformar conciencias en el mundo.'
        }
      },
      {
        id: 'lesson-b1-36-3',
        unitId: 'unit-b1-36',
        lessonNumber: 3,
        title_es: 'El Cine Hispanoamericano y sus Grandes Directores',
        title_en: 'Hispanic Cinema & Acclaimed Directors',
        title_ar: 'السينما الإسبانية واللاتينية وكبار المخرجين',
        cefr: 'B1',
        objectives_en: ['Discuss Oscar-winning directors (Pedro Almodóvar, Guillermo del Toro, Alfonso Cuarón)', 'Review compelling films (El laberinto del fauno, Roma, Relatos salvajes)', 'Write cinematic critiques and synopsis'],
        objectives_ar: ['التعرف على كبار المخرجين الحائزين على جوائز الأوسكار (ألمودوفار، ديل تورو، كوارون)', 'مناقشة أفلام سينمائية بارزة', 'كتابة مراجعات نقدية وملخصات سينمائية'],
        vocabWordIds: ['w-cine', 'w-director', 'w-pelicula', 'w-guion', 'w-critica'],
        dialogue: [
          { speaker: 'Cinéfilo', es: 'El cine hispano destaca por su audacia visual, la profundidad psicológica de sus guiones y su capacidad para emocionar al público internacional.', en: 'Hispanic cinema stands out for visual audacity, psychological depth, and emotional power.', ar: 'تتميز السينما الناطقة بالإسبانية بجرأتها البصرية، عمقها النفسي، وقدرتها على التأثير في الجمهور العالمي.' }
        ],
        exercises: [
          {
            id: 'ex-b1-36-3-1',
            type: 'multiple_choice',
            prompt_es: 'La aclamada película "El laberinto del fauno" fue dirigida por el maestro mexicano:',
            prompt_en: 'The acclaimed film "Pan\'s Labyrinth" was directed by Mexican master:',
            prompt_ar: 'أخرج الفيلم الشهير "متاهة بان" المخرج المكسيكي العبقري:',
            options: ['Guillermo del Toro', 'Pedro Almodóvar', 'Quentin Tarantino', 'Steven Spielberg'],
            correctAnswer: 'Guillermo del Toro',
            explanation_en: 'Guillermo del Toro directed El laberinto del fauno.',
            explanation_ar: 'أخرج غييرمو ديل تورو فيلم متاهة بان وحاز به إشادة عالمية واسعة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence review of a movie you watched recently, mentioning genre, plot summary, and recommendation.',
          prompt_ar: 'اكتب مراجعة من 3 جمل لفيلم شاهدته مؤخراً، تذكر نوعه وحبكته وتوصيتك.',
          minSentences: 3,
          sampleTarget: 'Recientemente vi una película fascinante que combina el misterio histórico con el drama humano. La interpretación de los actores principales es magistral y la banda sonora crea una atmósfera cautivadora. Recomiendo esta obra a cualquiera que aprecie el cine con trasfondo intelectual.'
        }
      },
      {
        id: 'lesson-b1-36-4',
        unitId: 'unit-b1-36',
        lessonNumber: 4,
        title_es: 'La Herencia Lingüística del Árabe en el Español',
        title_en: 'The Arabic Linguistic Legacy in Spanish',
        title_ar: 'البصمة والتراث اللغوي العربي الخالد في الإسبانية',
        cefr: 'B1',
        objectives_en: ['Identify the 4,000+ Arabic loanwords in Spanish (almohada, aceite, azúcar, alcalde, jardín, guitarra)', 'Understand the 800 years of Al-Andalus history and co-existence in Córdoba and Granada', 'Synthesize cross-cultural historical appreciation'],
        objectives_ar: ['التعرف على أكثر من 4000 كلمة ذات أصل عربي في الإسبانية (almohada, azúcar, aceite, alcalde, guitarra, rincón)', 'فهم 800 عام من تاريخ الأندلس والتعايش الحضاري في قرطبة وغرناطة', 'تقدير التمازج الحضاري والعمق التاريخي المشترك'],
        vocabWordIds: ['w-al-andalus', 'w-herencia', 'w-arabismo', 'w-coexistencia', 'w-historia'],
        dialogue: [
          { speaker: 'Historiador', es: 'Durante ocho siglos en Al-Ándalus, la ciencia, la astronomía y la poesía florecieron, dejando en el idioma español más de cuatro mil palabras de origen árabe.', en: 'During eight centuries in Al-Andalus, science and poetry flourished, leaving over 4,000 Arabic words in Spanish.', ar: 'خلال ثمانية قرون في الأندلس ازدهرت العلوم والشعر، تاركة في اللغة الإسبانية أكثر من 4000 كلمة من أصل عربي.' }
        ],
        exercises: [
          {
            id: 'ex-b1-36-4-1',
            type: 'multiple_choice',
            prompt_es: 'Palabras españolas como "almohada", "azúcar", "aceite" y "alcalde" proceden del:',
            prompt_en: 'Spanish words like "almohada", "azúcar", "aceite" and "alcalde" originate from:',
            prompt_ar: 'الكلمات الإسبانية مثل almohada و azúcar و aceite و alcalde مشتقة من:',
            options: ['Árabe andalusí', 'Alemán antiguo', 'Chino mandarín', 'Ruso'],
            correctAnswer: 'Árabe andalusí',
            explanation_en: 'Arabic influenced Spanish deeply for 800 years, especially words beginning with "al-".',
            explanation_ar: 'أثرت اللغة العربية بعمق في الإسبانية عبر 8 قرون، ولا سيما الكلمات التي تبدأ بـ "al-".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences reflecting on the cultural bridges between the Arabic and Hispanic worlds through history and vocabulary.',
          prompt_ar: 'اكتب 3 جمل تتأمل فيها الجسور الحضارية واللغوية بين العالم العربي والعالم الإسباني.',
          minSentences: 3,
          sampleTarget: 'Es verdaderamente fascinante descubrir que más de cuatro mil palabras en español tienen un origen árabe directo. La arquitectura de monumentos como la Alhambra de Granada refleja una época dorada de esplendor cultural y científico. El aprendizaje de la lengua española nos conecta de forma natural con esta rica herencia compartida.'
        }
      }
    ]
  },

  // UNIT 37: Estilo Indirecto Básico
  {
    id: 'unit-b1-37',
    level: 'B1',
    unitNumber: 37,
    title_es: 'El Estilo Indirecto: Transmitir Mensajes',
    title_en: 'Reported Speech: Relaying Messages',
    title_ar: 'الكلام المنقول غير المباشر Estilo Indirecto',
    description_en: 'Relay statements, questions, and commands from others with tense backshifting (Me dijo que vendría, Nos preguntó si queríamos, Me pidió que le ayudara).',
    description_ar: 'نقل الأقوال والأسئلة والأوامر عن الآخرين مع التحولات الزمنية الدقيقة (قال لي إنه سيأتي، سألنا إن كنا نريد، طلب مني أن أساعده).',
    lessons: [
      {
        id: 'lesson-b1-37-1',
        unitId: 'unit-b1-37',
        lessonNumber: 1,
        title_es: 'Estilo Indirecto en Presente (Dice que...) vs Pasado (Dijo que...)',
        title_en: 'Reporting in Present (Dice que) vs Past (Dijo que)',
        title_ar: 'النقل بفعل مضارع (يقول إن) مقابل النقل بفعل ماضٍ (قال إن)',
        cefr: 'B1',
        objectives_en: ['When reporting verb is present: NO tense shift (Juan dice: "Tengo hambre" -> Juan dice que TIENE hambre)', 'When reporting verb is past: Tense shifts one step back (Juan dijo: "Tengo hambre" -> Juan dijo que TENÍA hambre)', 'Master reporting daily phone and office messages'],
        objectives_ar: ['عندما يكون فعل النقل في المضارع لا يتغير زمن الجملة (Dice que tiene hambre)', 'عندما يكون فعل النقل في الماضي يتراجع الزمن خطوة للماضي المستمر (Dijo que tenía hambre)', 'نقل المكالمات ورسائل العمل اليومية بدقة'],
        vocabWordIds: ['w-dice-que', 'w-dijo-que', 'w-estilo-indirecto', 'w-mensaje', 'w-explicar'],
        grammarTopicId: 'g-reported-speech',
        dialogue: [
          { speaker: 'Secretaria', es: 'El director me dijo que la reunión se posponía para el próximo lunes a primera hora.', en: 'The director told me that the meeting was postponed to next Monday first thing.', ar: 'أخبرني المدير بأن الاجتماع قد تم تأجيله إلى يوم الإثنين القادم في الصباح الباكر.' }
        ],
        exercises: [
          {
            id: 'ex-b1-37-1-1',
            type: 'multiple_choice',
            prompt_es: 'Transforma al estilo indirecto en pasado: María dijo: "Estoy muy contenta con el resultado" -> María dijo que ______ muy contenta.',
            prompt_en: 'Present "estoy" shifts to imperfect after past "dijo que":',
            prompt_ar: 'المضارع estoy يتحول إلى ماضٍ مستمر بعد فعل النقل الماضي dijo que:',
            options: ['estaba', 'está', 'estaría', 'haya estado'],
            correctAnswer: 'estaba',
            explanation_en: 'Present indicative (estoy) backshifts to imperfect indicative (estaba) in reported past.',
            explanation_ar: 'المضارع estoy يتراجع إلى الماضي المستمر estaba عند النقل بفعل ماضٍ.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences relaying what a colleague or friend told you recently using past reported speech (Dijo que tenía / Dijo que vendría).',
          prompt_ar: 'اكتب 3 جمل تنقل فيها ما قاله لك صديق أو زميل باستخدام الكلام المنقول في الماضي.',
          minSentences: 3,
          sampleTarget: 'Mi compañero me dijo que no podía asistir a la reunión matutina porque tenía una consulta médica. El profesor nos explicó que los resultados del examen final estarían listos el viernes. Mi hermano me prometió que vendría a visitarme este fin de semana.'
        }
      },
      {
        id: 'lesson-b1-37-2',
        unitId: 'unit-b1-37',
        lessonNumber: 2,
        title_es: 'Transmitir Preguntas: Me preguntó si / dónde / cuándo',
        title_en: 'Reporting Questions in Spanish',
        title_ar: 'نقل الأسئلة: سألني عما إذا كان / أين / متى',
        cefr: 'B1',
        objectives_en: ['Yes/No Questions -> use "si" (Me preguntó si yo quería un café)', 'Information Questions -> keep question word with accent (Me preguntó dónde vivía / cuándo llegaba)', 'Relay interviews and conversations smoothly'],
        objectives_ar: ['الأسئلة بنعم/لا تُنقل باستخدام "si" (سألني إن كنت أريد قهوة)', 'الأسئلة الاستفهامية تحتفظ بأداة الاستفهام ونبرتها المكتوبة (سألني أين أعيش / متى أصل)', 'نقل المقابلات الحوارية بسلاسة'],
        vocabWordIds: ['w-pregunto-si', 'w-pregunto-donde', 'w-pregunto-cuando', 'w-pregunta', 'w-curiosidad'],
        dialogue: [
          { speaker: 'Viajero', es: 'En el aeropuerto el agente me preguntó si llevaba líquidos en el equipaje de mano y cuánto tiempo me quedaría en el país.', en: 'At the airport the officer asked me if I had liquids and how long I would stay...', ar: 'في المطار سألني الضابط عما إذا كنت أحمل سوائل وكم من الوقت سأبقى في البلاد.' }
        ],
        exercises: [
          {
            id: 'ex-b1-37-2-1',
            type: 'multiple_choice',
            prompt_es: 'Transforma: Pedro me preguntó: "¿A qué hora empieza la película?" -> Pedro me preguntó a qué hora ______ la película.',
            prompt_en: 'Choose the backshifted verb for the reported question:',
            prompt_ar: 'اختر تصريف الفعل بعد نقل السؤال في الماضي:',
            options: ['empezaba', 'empieza', 'empezará', 'haya empezado'],
            correctAnswer: 'empezaba',
            explanation_en: 'Present "empieza" backshifts to imperfect "empezaba" in past reported questions.',
            explanation_ar: 'المضارع empieza يتحول إلى ماضٍ مستمر empezaba عند نقل السؤال.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences reporting questions people asked you during a trip, interview, or celebration.',
          prompt_ar: 'اكتب 3 جمل تنقل فيها أسئلة طُرحت عليك في رحلة أو مقابلة.',
          minSentences: 3,
          sampleTarget: 'El entrevistador me preguntó cuántos años de experiencia tenía en el sector del desarrollo web. El camarero me preguntó si deseaba tomar el café solo o con leche caliente. Mi madre me preguntó a qué hora llegaría mi tren a la estación central.'
        }
      },
      {
        id: 'lesson-b1-37-3',
        unitId: 'unit-b1-37',
        lessonNumber: 3,
        title_es: 'Transmitir Órdenes y Peticiones: Me pidió que...',
        title_en: 'Reporting Commands & Requests (Past Subjunctive Trigger)',
        title_ar: 'نقل الأوامر والطلبات: طلب مني أن (صيغة Imperfecto de Subjuntivo)',
        cefr: 'B1',
        objectives_en: ['When reporting commands in the past: use "Me dijo que / Me pidió que + Imperfecto de Subjuntivo (-ra)" (Me dijo: "Ven" -> Me dijo que VINIERA)', 'Recognize high-frequency imperfect subjunctive endings (-ara / -iera)', 'Relay workplace orders accurately'],
        objectives_ar: ['عند نقل الأوامر في الماضي يُستخدم Imperfecto de Subjuntivo بلاحقة -ra (قال لي: تعال -> Me dijo que viniera)', 'التعرف على نهايات الماضي من Subjuntivo الأكثر شيوعاً', 'نقل تعليمات العمل بدقة واحتراف'],
        vocabWordIds: ['w-me-pidio-que', 'w-me-dijo-que-hiciera', 'w-viniera', 'w-orden', 'w-instruccion'],
        dialogue: [
          { speaker: 'Empleado', es: 'Mi jefe me pidió que le enviara el informe financiero antes del mediodía y me dijo que no me preocupara por el retraso.', en: 'My boss asked me to send him the financial report before noon and told me not to worry.', ar: 'طلب مني مديري أن أرسل له التقرير المالي قبل الظهيرة وقال لي ألا أقلق بشأن التأخير.' }
        ],
        exercises: [
          {
            id: 'ex-b1-37-3-1',
            type: 'multiple_choice',
            prompt_es: 'El médico me dijo: "Descanse y beba agua" -> El médico me dijo que ______ y que ______ agua.',
            prompt_en: 'Report the doctor\'s command in past subjunctive:',
            prompt_ar: 'انقل أمر الطبيب في صيغة الماضي من Subjuntivo:',
            options: ['descansara / bebiera', 'descanse / beba', 'descansé / bebí', 'descansaría / bebería'],
            correctAnswer: 'descansara / bebiera',
            explanation_en: 'Commands in past reported speech shift to Imperfect Subjunctive: descansara / bebiera.',
            explanation_ar: 'الأوامر المنقولة في الماضي تتحول إلى Imperfecto de Subjuntivo: descansara / bebiera.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences relaying requests or instructions your doctor, teacher, or supervisor gave you recently.',
          prompt_ar: 'اكتب 3 جمل تنقل فيها تعليمات أو نصائح وجهها إليك طبيبك أو معلمك أو مشرفك.',
          minSentences: 3,
          sampleTarget: 'El médico me aconsejó que caminara todos los días y que redujera el estrés laboral. El profesor de español nos pidió que leyéramos un artículo de prensa para el próximo debate. Mi director me recomendó que preparara una presentación concisa para la junta directiva.'
        }
      },
      {
        id: 'lesson-b1-37-4',
        unitId: 'unit-b1-37',
        lessonNumber: 4,
        title_es: 'Verbos de Transmisión Enriquecidos: Asegurar, Advertir, Prometer',
        title_en: 'Rich Reporting Verbs: Asegurar, Advertir, Prometer',
        title_ar: 'أفعال النقل الإخبارية الثرية: أكد، حذر، وعد، نفى',
        cefr: 'B1',
        objectives_en: ['Avoid overusing "decir" by using rich reporting verbs (afirmar, asegurar, advertir, prometer, negar, reconocer)', 'Capture subtle speaker intent in reports', 'Author executive summaries of discussions'],
        objectives_ar: ['تجنب تكرار فعل decir واستخدام أفعال نقل إخبارية غنية (أكد، صرح، حذر، وعد، نفى، اعترف)', 'إبراز النوايا الدقيقة للمتحدث', 'صياغة ملخصات تنفيذية للمحادثات والاجتماعات'],
        vocabWordIds: ['w-asegurar', 'w-advertir', 'w-prometer', 'w-negar', 'w-reconocer'],
        dialogue: [
          { speaker: 'Portavoz', es: 'El ministro aseguró que las inversiones aumentarán y advirtió que será necesario un esfuerzo conjunto de toda la sociedad.', en: 'The minister assured that investments will increase and warned that a joint effort is needed.', ar: 'أكد الوزير أن الاستثمارات ستتزايد وحذر من أنه سيكون من الضروري تضافر جهود المجتمع بأسره.' }
        ],
        exercises: [
          {
            id: 'ex-b1-37-4-1',
            type: 'multiple_choice',
            prompt_es: '"El testigo negó haber visto al sospechoso" significa que el testigo:',
            prompt_en: '"El testigo negó haber visto..." means the witness:',
            prompt_ar: '"El testigo negó haber visto..." تعني أن الشاهد:',
            options: ['Dijo que NO vio al sospechoso', 'Confirmó que sí lo vio', 'Pidió dinero', 'Olvidó hablar'],
            correctAnswer: 'Dijo que NO vio al sospechoso',
            explanation_en: '"Negar" means to deny / state that something was not true.',
            explanation_ar: '"Negar" تعني نفي الأمر وتأكيد عدم وقوعه.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 journalistic sentences summarizing statements from official leaders using "aseguró que", "advirtió que", and "prometió que".',
          prompt_ar: 'اكتب 3 جمل بأسلوب صحفي تلخص تصريحات رسمية باستخدام أفعال النقل الثرية.',
          minSentences: 3,
          sampleTarget: 'El director general de la compañía aseguró que la innovación tecnológica será la máxima prioridad este año. Los científicos advirtieron que las olas de calor serán más frecuentes si no se reducen las emisiones. El presidente prometió que se destinarán más fondos públicos a la educación y la salud.'
        }
      }
    ]
  },

  // UNIT 38: Consolidación B1 y Proyecto Capstone
  {
    id: 'unit-b1-38',
    level: 'B1',
    unitNumber: 38,
    title_es: 'Consolidación B1 y Proyecto Capstone',
    title_en: 'B1 Consolidation & Capstone Project',
    title_ar: 'تثبيت المستوى ومشروع التخرج B1',
    description_en: 'Synthesize Subjunctive mastery, Conditional clauses, Reported speech, and author an argumentative essay preparing for Level B2.',
    description_ar: 'دمج وتثبيت كل قواعد صيغ المنصوب والشك Subjuntivo، الشرط، الكلام المنقول، وكتابة مقال جدلي إقناعي شامل تمهيداً للانطلاق إلى المستوى المتقدم B2.',
    lessons: [
      {
        id: 'lesson-b1-38-1',
        unitId: 'unit-b1-38',
        lessonNumber: 1,
        title_es: 'El Gran Mapa del Subjuntivo: Deseos, Emociones, Dudas y Tiempo',
        title_en: 'The Grand Subjunctive Map: Wishes, Emotions, Doubt & Time',
        title_ar: 'الخريطة الكبرى لصيغة Subjuntivo: الرغبات، المشاعر، الشك، والزمن',
        cefr: 'B1',
        objectives_en: ['Unify all 4 pillars of the Subjunctive: 1) Voluntad (Quiero que), 2) Sentimiento (Me alegro de que), 3) Duda/Negación (No creo que), 4) Tiempo futuro (Cuando llegue)', 'Switch seamlessly without hesitation', 'Achieve grammatical confidence'],
        objectives_ar: ['توحيد الأركان الأربعة الكبرى لـ Subjuntivo: الرغبة، المشاعر، الشك ونفي الرأي، والظروف الزمنية المستقبلية', 'التبديل التلقائي السلس بين الحالات الأربع بدون تردد', 'بلوغ الثقة والرسوخ اللغوي'],
        vocabWordIds: ['w-mapa-subjuntivo', 'w-voluntad', 'w-sentimiento', 'w-duda', 'w-tiempo-futuro'],
        dialogue: [
          { speaker: 'Profesor', es: 'Quiero que practiques (deseo), me alegro de que mejores (emoción), no creo que sea difícil (duda) y cuando hables con nativos (tiempo futuro), lo dominarás todo.', en: 'I want you to practice (wish), I’m glad you improve (emotion), I don’t think it is hard (doubt), and when you speak with natives (time), you will master it all.', ar: 'أريدك أن تتدرب (رغبة)، ويسعدني أنك تتحسن (مشاعر)، ولا أعتقد أن الأمر صعب (شك)، وحين تتحدث مع الناطقين الأصليين (زمن) ستتقن كل شيء.' }
        ],
        exercises: [
          {
            id: 'ex-b1-38-1-1',
            type: 'multiple_choice',
            prompt_es: 'En la frase "Quiero que ______ (venir) cuando ______ (tener) tiempo libre", ambos verbos van en:',
            prompt_en: 'In this compound sentence, both subordinate verbs are in:',
            prompt_ar: 'في الجملة المركبة السابقة، يصرف كِلا الفعلين في:',
            options: ['Subjuntivo (vengas / tengas)', 'Indicativo (vienes / tienes)', 'Condicional (vendrías / tendrías)', 'Infinitivo'],
            correctAnswer: 'Subjuntivo (vengas / tengas)',
            explanation_en: 'Both "Quiero que" (desire) and "cuando" (future time) trigger the Subjunctive: vengas / tengas.',
            explanation_ar: 'كلا التركيبين (الرغبة Quiero que والظرف الزمني المستقبلي cuando) يتطلبان صيغة Subjuntivo: vengas / tengas.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 4 connected sentences illustrating all four Subjunctive pillars (Wish, Emotion, Doubt, Future Time).',
          prompt_ar: 'اكتب 4 جمل متماسكة تمثل الأركان الأربعة لـ Subjuntivo.',
          minSentences: 4,
          sampleTarget: 'Deseo de corazón que tengas un futuro brillante y lleno de éxitos. Me alegra enormemente que compartamos esta pasión por el aprendizaje continuo. No creo que ningún obstáculo sea insuperable cuando se trabaja con disciplina. Cuando alcances tus metas más ambiciosas, celebrarás todo tu esfuerzo con orgullo.'
        }
      },
      {
        id: 'lesson-b1-38-2',
        unitId: 'unit-b1-38',
        lessonNumber: 2,
        title_es: 'El Arte de la Argumentación y el Debate Formal',
        title_en: 'The Art of Formal Argumentation & Debate',
        title_ar: 'فن المحاججة المنطقية وإدارة المناظرات الرسمية',
        cefr: 'B1',
        objectives_en: ['Structure balanced argumentation (Tesis, Argumentos a favor, Contraargumentos, Conclusión)', 'Use formal connectors (Por un lado, Por otro lado, No obstante, En conclusión)', 'Debate contemporary societal topics with intellectual poise'],
        objectives_ar: ['هيكلة النقاش المتوازن (الأطروحة، حجج التأييد، حجج التفنيد، والخلاصة)', 'استخدام أدوات الربط المنطقي الرسمية (من ناحية، ومن ناحية أخرى، ومع ذلك، وخلاصة القول)', 'مناظرة القضايا المعاصرة برصانة فكرية'],
        vocabWordIds: ['w-tesis', 'w-argumento', 'w-por-un-lado', 'w-no-obstante', 'w-conclusion'],
        dialogue: [
          { speaker: 'Debatiente 1', es: 'Por un lado, la inteligencia artificial acelera la investigación científica; por otro lado, debemos garantizar su uso ético y responsable.', en: 'On one hand, AI accelerates scientific research; on the other hand, we must guarantee ethical use.', ar: 'من ناحية فإن الذكاء الاصطناعي يسرع البحث العلمي، ومن ناحية أخرى يجب أن نضمن استخدامه الأخلاقي والمسؤول.' }
        ],
        exercises: [
          {
            id: 'ex-b1-38-2-1',
            type: 'multiple_choice',
            prompt_es: 'El conector "No obstante" se utiliza para:',
            prompt_en: 'The formal connector "No obstante" is used to:',
            prompt_ar: 'أداة الربط الرسمية "No obstante" تستخدم لـ:',
            options: ['Introducir una objeción o contraste (Sin embargo / Nevertheless)', 'Iniciar un saludo', 'Pedir disculpas', 'Contar un chiste'],
            correctAnswer: 'Introducir una objeción o contraste (Sin embargo / Nevertheless)',
            explanation_en: '"No obstante" is a formal discourse marker meaning nevertheless / however.',
            explanation_ar: '"No obstante" هي أداة ربط فصيحة للاستدراك والتعقيب بمعنى "ومع ذلك / إلا أن".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a balanced 4-sentence argumentative paragraph on working from home vs working in an office using formal connectors.',
          prompt_ar: 'اكتب فقرة جدلية متوازنة من 4 جمل حول العمل عن بُعد مقابل العمل المكتبي.',
          minSentences: 4,
          sampleTarget: 'Por un lado, el teletrabajo ofrece una flexibilidad horaria inestimable y elimina el estrés del tráfico diario. Por otro lado, la interacción presencial fomenta la cohesión del equipo y estimula la creatividad colectiva. No obstante, muchas empresas han optado por modelos híbridos que combinan las ventajas de ambos esquemas. En conclusión, el equilibrio personalizado es la clave del bienestar y la productividad.'
        }
      },
      {
        id: 'lesson-b1-38-3',
        unitId: 'unit-b1-38',
        lessonNumber: 3,
        title_es: 'Lectura Crítica B1: El Futuro de la Educación Global',
        title_en: 'Critical B1 Reading: The Future of Global Education',
        title_ar: 'القراءة النقدية B1: مستقبل التعليم العالمي في العصر الرقمي',
        cefr: 'B1',
        objectives_en: ['Read a 300-word analytical essay evaluating digital education, human teachers, and critical thinking', 'Synthesize complex subordinate clauses', 'Extract subtext, author stance, and philosophical implications'],
        objectives_ar: ['قراءة مقال تحليلي نقدي من 300 كلمة يناقش التعليم الرقمي ودور المعلم البشري والتفكير النقدي', 'استيعاب الجمل التابعة المعقدة', 'استخراج دلالات النص وموقف الكاتب وأبعاده الفلسفية'],
        vocabWordIds: ['w-educacion-global', 'w-pensamiento-critico', 'w-pedagogia', 'w-humanismo', 'w-transformacion'],
        dialogue: [
          { speaker: 'Autora', es: 'La educación del siglo XXI no debe limitarse a la transmisión técnica de datos, sino que debe cultivar el pensamiento crítico, la empatía intercultural y la creatividad humana inagotable.', en: '21st century education must cultivate critical thinking, intercultural empathy, and human creativity.', ar: 'إن التعليم في القرن الحادي والعشرين لا ينبغي أن يقتصر على النقل التقني للمعلومات، بل يجب أن يغرس التفكير النقدي، والتعاطف بين الثقافات، والإبداع الإنساني المتجدد.' }
        ],
        exercises: [
          {
            id: 'ex-b1-38-3-1',
            type: 'multiple_choice',
            prompt_es: 'Según la lectura crítica, el objetivo primordial de la educación moderna es:',
            prompt_en: 'According to the reading, the fundamental goal of modern education is:',
            prompt_ar: 'وفقاً للنص النقدي، الهدف الأسمى للتعليم الحديث هو:',
            options: ['Cultivar el pensamiento crítico, la empatía y la creatividad humana', 'Memorizar listas telefónicas', 'Prohibir los libros', 'Aislar a los estudiantes'],
            correctAnswer: 'Cultivar el pensamiento crítico, la empatía y la creatividad humana',
            explanation_en: 'The essay emphasizes critical thinking, empathy, and creativity as the true educational mission.',
            explanation_ar: 'يركز المقال على غرس التفكير النقدي والتعاطف الإنساني والإبداع كرسالة جوهرية للتعليم.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences expressing your personal philosophy on how education should evolve to empower future generations.',
          prompt_ar: 'اكتب 3 جمل تعبر فيها عن رؤيتك الفلسفية لتطوير التعليم وتمكين الأجيال القادمة.',
          minSentences: 3,
          sampleTarget: 'Considero que la educación debe ser un proceso liberador que despierte la curiosidad natural de cada ser humano. Es fundamental que las escuelas enseñen a pensar con criterio propio y no solo a memorizar respuestas automáticas. Si invertimos en una formación humanística y científica integral, construiremos un mundo más justo y solidario.'
        }
      },
      {
        id: 'lesson-b1-38-4',
        unitId: 'unit-b1-38',
        lessonNumber: 4,
        title_es: 'Proyecto Capstone B1: Ensayo Argumentativo y Graduación',
        title_en: 'B1 Capstone: Comprehensive Essay & Graduation',
        title_ar: 'مشروع التخرج B1: المقال الجدلي الشامل والتخرج لـ B2',
        cefr: 'B1',
        objectives_en: ['Author an articulate 8-sentence analytical essay integrating Subjunctive, Conditional, Discourse Markers, and Reported Speech', 'Demonstrate intermediate threshold fluency', 'Graduate with top honors to Advanced CEFR Level B2'],
        objectives_ar: ['كتابة مقال تحليلي إقناعي من 8 جمل يدمج كل قواعد Subjuntivo والشرط وروابط الخطاب والكلام المنقول', 'إثبات الطلاقة اللغوية المتوسطة الراسخة', 'التخرج بمرتبة الشرف والانطلاق إلى المستوى المتقدم B2'],
        vocabWordIds: ['w-graduacion-b1', 'w-ensayo-argumentativo', 'w-dominio-avanzado', 'w-meta-b2', 'w-excelencia'],
        dialogue: [
          { speaker: 'Tutor IA', es: '¡Enhorabuena de todo corazón! Has completado con éxito las 12 unidades del Nivel B1 (unidades 27 a 38). Tu dominio del subjuntivo, los conectores y la argumentación es extraordinario. ¡Te damos la bienvenida formal al Nivel Avanzado B2!', en: 'Heartfelt congratulations! You have mastered all 12 units of Level B1. Welcome to Advanced Level B2!', ar: 'مبارك من أعماق القلب! لقد أتممت بنجاح وحدات المستوى B1 الـ 12 وأصبحت تتقن Subjuntivo والروابط والمحاججة ببراعة. نرحب بك رسمياً في المستوى المتقدم B2!' }
        ],
        exercises: [
          {
            id: 'ex-b1-38-4-1',
            type: 'multiple_choice',
            prompt_es: '¡Has conquistado el nivel B1! En el nivel avanzado B2 exploraremos:',
            prompt_en: 'You have conquered Level B1! In advanced Level B2 we will explore:',
            prompt_ar: 'لقد قهرت المستوى B1! في المستوى المتقدم B2 سنستكشف:',
            options: ['El Subjuntivo Imperfecto y Pluscuamperfecto, oraciones condicionales irreales (Si hubiera sabido...), modismos avanzados y retórica superior', 'Los números del 1 al 10', 'Los días de la semana', 'Los pronombres personales básicos'],
            correctAnswer: 'El Subjuntivo Imperfecto y Pluscuamperfecto, oraciones condicionales irreales (Si hubiera sabido...), modismos avanzados y retórica superior',
            explanation_en: 'Level B2 unlocks past subjunctive, unreal conditionals (si hubiera...), nuanced idioms, and high-level debate.',
            explanation_ar: 'المستوى B2 يفتح آفاق الماضي من Subjuntivo، الجمل الشرطية الافتراضية، التعبيرات الاصطلاحية الراقية، والبلاغة المتقدمة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write your comprehensive B1 Capstone Essay (at least 8 complete sentences) arguing a compelling societal, educational, or cultural vision using Subjunctive, Conditional, and Discourse Connectors.',
          prompt_ar: 'اكتب مقال تخرج المستوى B1 الشامل (8 جمل على الأقل) تدافع فيه عن رؤية ثقافية أو مجتمعية متكاملة مستخدماً كل أدوات B1.',
          minSentences: 8,
          sampleTarget: 'El aprendizaje de un nuevo idioma no es únicamente la adquisición de reglas gramaticales, sino una profunda transformación de la mente humana. Cuando una persona decide estudiar español, se abre a un universo cultural de más de quinientos millones de hablantes con una historia milenaria. Por un lado, dominar el subjuntivo nos permite expresar con precisión nuestros deseos más profundos, nuestras dudas intelectuales y nuestras emociones más sinceras. Por otro lado, el uso del condicional y los conectores avanzados enriquece nuestro discurso haciéndolo más empático y persuasivo. Aunque algunas personas crean que aprender idiomas en la era de la inteligencia artificial es innecesario, yo no creo que ninguna máquina pueda reemplazar la calidez del contacto humano auténtico. Si todos nos esforzáramos por entender la lengua y la cultura del prójimo, construiríamos puentes indestructibles de paz y cooperación. Espero que mi viaje de aprendizaje continúe con la misma pasión y disciplina en el nivel avanzado B2. ¡Estoy convencido de que la perseverancia y el amor por el conocimiento son la llave que abre todas las puertas del futuro!'
        }
      }
    ]
  }
];
