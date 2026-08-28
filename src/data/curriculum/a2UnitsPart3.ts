import { Unit } from '../../types';

export const A2_UNITS_PART3: Unit[] = [
  // UNIT 21: La Casa Ideal y el Alquiler (Comparativos y Superlativos)
  {
    id: 'unit-a2-21',
    level: 'A2',
    unitNumber: 21,
    title_es: 'La Casa Ideal: Comparativos y Superlativos',
    title_en: 'The Ideal Home: Comparisons & Superlatives',
    title_ar: 'المنزل المثالي: المقارنات وصيغ التفضيل',
    description_en: 'Compare apartments, neighborhoods, and amenities using "más... que", "menos... que", "tan... como", and absolute superlatives (-ísimo).',
    description_ar: 'المقارنة بين الشقق والأحياء والخدمات باستخدام más que و menos que و tan como وصيغ المبالغة المطلقة -ísimo.',
    lessons: [
      {
        id: 'lesson-a2-21-1',
        unitId: 'unit-a2-21',
        lessonNumber: 1,
        title_es: 'Comparativos de Superioridad, Inferioridad e Igualdad',
        title_en: 'Comparatives of Superiority, Inferiority & Equality',
        title_ar: 'المقارنات: الأفضلية، الأقلية، والتساوي',
        cefr: 'A2',
        objectives_en: ['Use "más + adjetivo + que" (más grande que)', 'Use "menos + adjetivo + que" (menos ruidoso que)', 'Use "tan + adjetivo + como" & "tanto/a/os/as + sustantivo + como"'],
        objectives_ar: ['استخدام más que للأفضلية والزيادة', 'استخدام menos que للأقلية', 'استخدام tan como و tanto como للتساوي في الصفات والأسماء'],
        vocabWordIds: ['w-mas-que', 'w-menos-que', 'w-tan-como', 'w-tanto-como', 'w-alquiler'],
        dialogue: [
          { speaker: 'Inquilino', es: 'Este piso es más luminoso que el anterior, pero es menos céntrico.', en: 'This apartment is brighter than the previous one, but it is less centrally located.', ar: 'هذه الشقة أكثر إضاءة من السابقة، لكنها أقل قرباً من المركز.' },
          { speaker: 'Agente', es: 'Sí, pero es tan tranquilo como una casa de campo y cuesta menos dinero.', en: 'Yes, but it is as quiet as a country house and costs less money.', ar: 'نعم، لكنها هادئة تماماً كالريف وتكلف مالاً أقل.' }
        ],
        exercises: [
          {
            id: 'ex-a2-21-1-1',
            type: 'multiple_choice',
            prompt_es: 'Para comparar igualdad en adjetivos usamos la fórmula:',
            prompt_en: 'To compare equality with adjectives we use:',
            prompt_ar: 'لمقارنة التساوي في الصفات نستخدم التركيب:',
            options: ['tan + adjetivo + como', 'más + adjetivo + que', 'tanto + adjetivo + que', 'muy + adjetivo + de'],
            correctAnswer: 'tan + adjetivo + como',
            explanation_en: '"Tan + adjective + como" expresses "as [adjective] as".',
            explanation_ar: '"Tan + صفة + como" تعبر عن التساوي في الصفة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Compare two cities or apartments you know well using superiority, inferiority, and equality in 3 sentences.',
          prompt_ar: 'قارن بين مدينتين أو شقتين تعرفهما جيداً باستخدام المقارنات الثلاث في 3 جمل.',
          minSentences: 3,
          sampleTarget: 'Madrid es más grande que Valencia. Sin embargo, Valencia es menos cara que la capital. Ambas ciudades son tan bonitas y acogedoras como puedas imaginar.'
        }
      },
      {
        id: 'lesson-a2-21-2',
        unitId: 'unit-a2-21',
        lessonNumber: 2,
        title_es: 'Comparativos Irregulares: Mejor, Peor, Mayor, Menor',
        title_en: 'Irregular Comparatives: Mejor, Peor, Mayor, Menor',
        title_ar: 'المقارنات الشاذة: أفضل، أسوأ، أكبر، أصغر',
        cefr: 'A2',
        objectives_en: ['Avoid "más bueno" (use mejor) and "más malo" (use peor)', 'Use mayor (older/greater) and menor (younger/lesser)', 'Apply to products, services, and ages'],
        objectives_ar: ['تجنب más bueno واستخدام mejor بدلاً منها، وتجنب más malo واستخدام peor', 'استخدام mayor للعمر الأكبر و menor للعمر الأصغر', 'المقارنة بين جودة المنتجات والخدمات'],
        vocabWordIds: ['w-mejor', 'w-peor', 'w-mayor', 'w-menor', 'w-calidad'],
        dialogue: [
          { speaker: 'Cliente', es: '¿Cuál de estos dos ordenadores tiene mejor rendimiento?', en: 'Which of these two computers has better performance?', ar: 'أيهما أفضل أداءً بين هذين الحاسوبين؟' },
          { speaker: 'Técnico', es: 'Este modelo es mucho mejor en velocidad y batería, aunque su precio es un poco mayor.', en: 'This model is much better in speed and battery, although its price is a bit higher.', ar: 'هذا الموديل أفضل بكثير في السرعة والبطارية، وإن كان سعره أعلى قليلاً.' }
        ],
        exercises: [
          {
            id: 'ex-a2-21-2-1',
            type: 'multiple_choice',
            prompt_es: 'En español estándar nunca decimos "más bueno que", sino:',
            prompt_en: 'In standard Spanish, instead of "más bueno que", we say:',
            prompt_ar: 'في الإسبانية الفصيحة لا نقول más bueno que بل نقول:',
            options: ['mejor que', 'peor que', 'mayor que', 'buenísimo que'],
            correctAnswer: 'mejor que',
            explanation_en: '"Mejor que" is the correct comparative form of bueno.',
            explanation_ar: '"Mejor que" هي الصيغة الصحيحة للمقارنة من bueno.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences comparing two things using "mejor", "peor", and "mayor".',
          prompt_ar: 'اكتب 3 جمل تقارن فيها بين أمرين باستخدام mejor و peor و mayor.',
          minSentences: 3,
          sampleTarget: 'El transporte público en esta ciudad es mucho mejor que el tráfico en coche. La comida casera es de mayor calidad nutricional. Trabajar sin dormir es lo peor para la salud.'
        }
      },
      {
        id: 'lesson-a2-21-3',
        unitId: 'unit-a2-21',
        lessonNumber: 3,
        title_es: 'El Superlativo Relativo y Absoluto (-ísimo)',
        title_en: 'Relative & Absolute Superlatives (-ísimo)',
        title_ar: 'صيغ التفضيل الأقصى والمبالغة المطلقة (-ísimo)',
        cefr: 'A2',
        objectives_en: ['Form relative superlative: el/la/los/las más + adjetivo + de (El más rápido del mundo)', 'Form absolute superlative suffix: -ísimo/a/os/as (carísimo, facilísimo, riquísimo)', 'Apply spelling changes with -ísimo (rico -> riquísimo, largo -> larguísimo)'],
        objectives_ar: ['صياغة التفضيل النسبي (الأفضل في العالم / الأكبر في الحي)', 'صياغة المبالغة المطلقة بلاحقة -ísimo', 'مراعاة التغيرات الإملائية (c->qu, g->gu)'],
        vocabWordIds: ['w-el-mas', 'w-el-menos', 'w-carisimo', 'w-facilisimo', 'w-buenisimo'],
        dialogue: [
          { speaker: 'Viajero', es: 'Esta paella está riquísima. Es el mejor plato de toda la región.', en: 'This paella is extremely delicious. It is the best dish in the entire region.', ar: 'هذه البايلا في غاية اللذة! إنها أفضل طبق في الإقليم بأسره.' }
        ],
        exercises: [
          {
            id: 'ex-a2-21-3-1',
            type: 'multiple_choice',
            prompt_es: 'El superlativo absoluto de "fácil" es:',
            prompt_en: 'The absolute superlative of "fácil" is:',
            prompt_ar: 'صيغة المبالغة المطلقة لصفة "fácil" هي:',
            options: ['facilísimo', 'más fácil', 'facilado', 'muy fácilísimo'],
            correctAnswer: 'facilísimo',
            explanation_en: 'Fácil + ísimo = facilísimo (extremely easy).',
            explanation_ar: 'Fácil + ísimo = facilísimo (في غاية السهولة).'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences using relative and absolute superlatives (e.g. el más bonito, riquísimo, comodísimo).',
          prompt_ar: 'اكتب 3 جمل تستخدم فيها التفضيل النسبي والمبالغة بـ -ísimo.',
          minSentences: 3,
          sampleTarget: 'El apartamento que visitamos ayer es el más luminoso de todo el edificio. El sofá del salón es comodísimo para descansar. Además, la terraza tiene unas vistas hermosísimas.'
        }
      },
      {
        id: 'lesson-a2-21-4',
        unitId: 'unit-a2-21',
        lessonNumber: 4,
        title_es: 'Búsqueda de Vivienda y Contrato de Alquiler',
        title_en: 'House Hunting & Rental Agreements',
        title_ar: 'البحث عن سكن وتوقيع عقد الإيجار',
        cefr: 'A2',
        objectives_en: ['Understand rental listings (fianza, gastos incluidos, amueblado, exterior)', 'Inquire about rental conditions with a landlord', 'Describe your ideal apartment requirements'],
        objectives_ar: ['فهم إعلانات تأجير العقارات (التأمين، الفواتير مشمولة، مفروشة، إطلالة خارجية)', 'الاستفسار عن شروط الإيجار من المؤجر', 'وصف متطلبات شقتك المثالية بدقة'],
        vocabWordIds: ['w-alquiler', 'w-fianza', 'w-amueblado', 'w-propietario', 'w-contrato'],
        dialogue: [
          { speaker: 'Inquilino', es: 'Buenos días, llamo por el piso en alquiler. ¿El precio incluye los gastos de comunidad y wifi?', en: 'Good morning, I’m calling about the apartment for rent. Does the price include community fees and wifi?', ar: 'صباح الخير، أتصل بخصوص الشقة المعروضة للإيجار. هل يشمل السعر مصاريف الخدمات والإنترنت؟' },
          { speaker: 'Propietario', es: 'Sí, la comunidad está incluida. Solo se pide un mes de fianza y el piso está totalmente amueblado.', en: 'Yes, community fees are included. Only one month deposit is required and it is fully furnished.', ar: 'نعم، الخدمات مشمولة. يُطلب فقط شهر تأمين والشقة مفروشة بالكامل.' }
        ],
        exercises: [
          {
            id: 'ex-a2-21-4-1',
            type: 'multiple_choice',
            prompt_es: '"Piso amueblado" significa que la vivienda:',
            prompt_en: '"Piso amueblado" means the apartment:',
            prompt_ar: '"Piso amueblado" تعني أن الشقة:',
            options: ['Incluye todos los muebles necesarios (cama, mesa, sofás)', 'Está completamente vacía', 'No tiene ventanas', 'Está en obras'],
            correctAnswer: 'Incluye todos los muebles necesarios (cama, mesa, sofás)',
            explanation_en: '"Amueblado" means furnished.',
            explanation_ar: '"Amueblado" تعني مؤثثة ومفروشة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence message to a landlord asking about an apartment for rent, deposit, and furniture.',
          prompt_ar: 'اكتب رسالة من 3 جمل لمالك عقار تسأله فيها عن شقة للإيجار والتأمين والأثاث.',
          minSentences: 3,
          sampleTarget: 'Hola, he visto el anuncio de su apartamento en alquiler en el centro. Quisiera saber si está completamente amueblado y cuántos meses de fianza solicita. ¿Cuándo sería posible concertar una visita?'
        }
      }
    ]
  },

  // UNIT 22: El Trabajo y el Futuro Simple
  {
    id: 'unit-a2-22',
    level: 'A2',
    unitNumber: 22,
    title_es: 'El Futuro Simple y el Trabajo',
    title_en: 'Simple Future & The Workplace',
    title_ar: 'المستقبل البسيط وعالم العمل',
    description_en: 'Conjugate regular and irregular Simple Future (tendré, haré, podré, sabré, diré, vendré), make predictions, and discuss career ambitions.',
    description_ar: 'تصريف المستقبل البسيط المنتظم والشاذ، إطلاق التوقعات والتنبؤات، ومناقشة الطموحات المهنية.',
    lessons: [
      {
        id: 'lesson-a2-22-1',
        unitId: 'unit-a2-22',
        lessonNumber: 1,
        title_es: 'Formación del Futuro Simple Regular (-é, -ás, -á...)',
        title_en: 'Forming Regular Simple Future Tense',
        title_ar: 'صياغة المستقبل البسيط المنتظم',
        cefr: 'A2',
        objectives_en: ['Add endings to the full infinitive (-é, -ás, -á, -emos, -éis, -án) for all 3 verb groups', 'Express long-term plans and promises', 'Talk about technology and future society'],
        objectives_ar: ['إضافة نهايات المستقبل إلى المصدر الكامل لجميع الأفعال', 'التعبير عن الخطط والوعود طويلة الأجل', 'الحديث عن التكنولوجيا ومستقبل المجتمع'],
        vocabWordIds: ['w-hablare', 'w-comere', 'w-vivire', 'w-futuro', 'w-tecnologia'],
        grammarTopicId: 'g-future-simple',
        dialogue: [
          { speaker: 'Elena', es: 'En el futuro trabajaré como investigadora científica y viviré cerca del mar.', en: 'In the future I will work as a scientific researcher and will live near the sea.', ar: 'في المستقبل سأعمل باحثة علمية وسأعيش بالقرب من البحر.' },
          { speaker: 'Lucas', es: '¡Qué gran meta! Yo aprenderé varios idiomas y abriré mi propia empresa.', en: 'What a great goal! I will learn several languages and open my own company.', ar: 'يا له من هدف رائع! أنا سأتعلم عدة لغات وسأفتتح شركتي الخاصة.' }
        ],
        exercises: [
          {
            id: 'ex-a2-22-1-1',
            type: 'multiple_choice',
            prompt_es: 'En el futuro nosotros ______ (viajar) por todo el mundo.',
            prompt_en: 'Choose the correct Simple Future form for nosotros:',
            prompt_ar: 'اختر تصريف المستقبل البسيط المنتظم مع nosotros:',
            options: ['viajaremos', 'viajarán', 'viajaremos', 'viajaré'],
            correctAnswer: 'viajaremos',
            explanation_en: 'Infinitive viajar + emos = viajaremos.',
            explanation_ar: 'المصدر viajar + emos = viajaremos.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences stating your long-term career and life predictions using the simple future.',
          prompt_ar: 'اكتب 3 جمل تذكر فيها تنبؤاتك وأهدافك المستقبلية باستخدام المستقبل البسيط.',
          minSentences: 3,
          sampleTarget: 'El próximo año trabajaré en una empresa tecnológica internacional. Compraré una casa con jardín y viajaré a países de habla hispana con frecuencia.'
        }
      },
      {
        id: 'lesson-a2-22-2',
        unitId: 'unit-a2-22',
        lessonNumber: 2,
        title_es: 'Futuros Irregulares Clave: Tendré, Haré, Sabré, Podré',
        title_en: 'Key Irregular Futures: Tendré, Haré, Sabré, Podré',
        title_ar: 'أفعال المستقبل الشاذة الأساسية',
        cefr: 'A2',
        objectives_en: ['Master irregular future roots: tendr- (tener), pondr- (poner), vendr- (venir), saldr- (salir), habr- (haber), sabr- (saber), podr- (poder), har- (hacer), dir- (decir)', 'Apply standard future endings to irregular roots', 'Express future abilities and obligations'],
        objectives_ar: ['إتقان الجذور الشاذة في المستقبل (tendr-, har-, sabr-, podr-, dir-, vendr-)', 'إضافة نهايات المستقبل القياسية إلى هذه الجذور', 'التعبير عن القدرات والالتزامات المستقبلية'],
        vocabWordIds: ['w-tendre', 'w-hare', 'w-sabre', 'w-podre', 'w-dire'],
        dialogue: [
          { speaker: 'Profesor', es: 'Mañana sabremos los resultados de las pruebas y tendremos una reunión informativa.', en: 'Tomorrow we will find out the test results and will have an informative meeting.', ar: 'غداً سنعرف نتائج الاختبارات وسيكون لدينا اجتماع إعلامي.' },
          { speaker: 'Estudiante', es: 'Perfecto. Haré todo lo posible por llegar temprano.', en: 'Perfect. I will do everything possible to arrive early.', ar: 'ممتاز. سأبذل كل ما في وسعي للوصول مبكراً.' }
        ],
        exercises: [
          {
            id: 'ex-a2-22-2-1',
            type: 'multiple_choice',
            prompt_es: 'El futuro simple del verbo "hacer" para "yo" es:',
            prompt_en: 'The Simple Future of HACER for "yo" is:',
            prompt_ar: 'تصريف فعل hacer في المستقبل البسيط مع yo هو:',
            options: ['haré', 'haceré', 'haciré', 'hicié'],
            correctAnswer: 'haré',
            explanation_en: 'Hacer has the irregular stem "har-" + é = haré.',
            explanation_ar: 'جذر hacer في المستقبل هو har- + é = haré.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences using at least three irregular future verbs (tendré, haré, podré, sabré).',
          prompt_ar: 'اكتب 3 جمل مستخدماً 3 أفعال شاذة في المستقبل على الأقل.',
          minSentences: 3,
          sampleTarget: 'El próximo mes tendré más tiempo libre para estudiar. Haré un viaje cultural por Andalucía. Pronto podré comunicarme con total seguridad en español.'
        }
      },
      {
        id: 'lesson-a2-22-3',
        unitId: 'unit-a2-22',
        lessonNumber: 3,
        title_es: 'El Futuro de Probabilidad e Hipótesis en el Presente',
        title_en: 'Future of Probability & Conjecture',
        title_ar: 'المستقبل الدال على التخمين والاحتمال في الحاضر',
        cefr: 'A2',
        objectives_en: ['Use the future tense to express speculation about current reality (¿Qué hora será? - Serán las tres)', 'Express uncertainty (Tendrá unos 40 años)', 'Distinguish real future from speculative future'],
        objectives_ar: ['استخدام زمن المستقبل للتخمين في الوقت الحاضر (كم الساعة يا ترى؟ - لعله الثالثة)', 'التعبير عن عدم اليقين والتوقع', 'التمييز بين المستقبل الحقيقي ومستقبل الاحتمال'],
        vocabWordIds: ['w-probabilidad', 'w-hipotesis', 'w-seguramente', 'w-quizas', 'w-posible'],
        dialogue: [
          { speaker: 'Carla', es: '¿Dónde estará Marcos? No contesta al teléfono.', en: 'Where could Marcos be? He’s not answering his phone.', ar: 'أين تراه يكون ماركوس؟ إنه لا يجيب على الهاتف.' },
          { speaker: 'Tomás', es: 'Estará en una reunión de trabajo o conducirá hacia su casa.', en: 'He’s probably in a work meeting or driving home.', ar: 'لعله في اجتماع عمل أو يقود سيارته في طريقه إلى البيت.' }
        ],
        exercises: [
          {
            id: 'ex-a2-22-3-1',
            type: 'multiple_choice',
            prompt_es: '"¿Quién será a estas horas?" expresa:',
            prompt_en: '"¿Quién será a estas horas?" expresses:',
            prompt_ar: '"¿Quién será a estas horas?" تعبر عن:',
            options: ['Una conjetura o duda en el presente', 'Un plan futuro confirmado', 'Una orden obligatoria', 'Un saludo formal'],
            correctAnswer: 'Una conjetura o duda en el presente',
            explanation_en: 'The future tense here expresses wonder/conjecture about the present (Who could it be?).',
            explanation_ar: 'المستقبل هنا يعبر عن التخمين والتساؤل في الحاضر (من تراه يكون في هذه الساعة؟).'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 speculative sentences guessing why someone is late or where they are using future of probability.',
          prompt_ar: 'اكتب 3 جمل تخمينية تفسر فيها سبب تأخر شخص ما باستخدام مستقبل الاحتمال.',
          minSentences: 3,
          sampleTarget: '¿Dónde estará mi compañero de trabajo? Estará atascado en el tráfico de la avenida principal. Seguro que llegará en pocos minutos.'
        }
      },
      {
        id: 'lesson-a2-22-4',
        unitId: 'unit-a2-22',
        lessonNumber: 4,
        title_es: 'La Entrevista de Trabajo y el Currículum (CV)',
        title_en: 'Job Interview & Professional Resume (CV)',
        title_ar: 'مقابلة العمل والسيرة الذاتية المهنية',
        cefr: 'A2',
        objectives_en: ['Present professional skills, studies, and past experience', 'Answer standard interview questions with confidence', 'State future contributions to a company'],
        objectives_ar: ['عرض المهارات المهنية والمؤهلات والخبرات السابقة', 'الإجابة على أسئلة المقابلات الوظيفية القياسية', 'توضيح القيمة المضافة والإسهامات المستقبلية في العمل'],
        vocabWordIds: ['w-entrevista', 'w-curriculum', 'w-experiencia', 'w-habilidad', 'w-puesto'],
        dialogue: [
          { speaker: 'Entrevistador', es: '¿Por qué le interesa este puesto en nuestra empresa?', en: 'Why are you interested in this position at our company?', ar: 'لماذا تهتم بشغل هذا المنصب في شركتنا؟' },
          { speaker: 'Candidato', es: 'Porque tengo experiencia sólida en gestión de proyectos y aportaré soluciones innovadoras a su equipo.', en: 'Because I have solid experience in project management and will bring innovative solutions to your team.', ar: 'لأن لدي خبرة راسخة في إدارة المشاريع وسأقدم حلولاً مبتكرة لفريقكم.' }
        ],
        exercises: [
          {
            id: 'ex-a2-22-4-1',
            type: 'multiple_choice',
            prompt_es: '"Tener don de gentes" en un currículum significa:',
            prompt_en: '"Tener don de gentes" on a Spanish CV means:',
            prompt_ar: '"Tener don de gentes" في السيرة الذاتية تعني:',
            options: ['Tener excelentes habilidades interpersonales y de comunicación', 'Saber programar ordenadores', 'Tener permiso de conducir', 'Hablar solo un idioma'],
            correctAnswer: 'Tener excelentes habilidades interpersonales y de comunicación',
            explanation_en: '"Tener don de gentes" means having great interpersonal and people skills.',
            explanation_ar: '"Tener don de gentes" تعني امتلاك مهارات تواصل وبناء علاقات إنسانية ممتازة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence professional pitch summarizing your experience, strengths, and what you will achieve.',
          prompt_ar: 'اكتب عرضاً مهنياً موجزاً من 3 جمل يلخص خبرتك، نقاط قوتك، وما ستحققه مستقبلاً.',
          minSentences: 3,
          sampleTarget: 'Tengo cinco años de experiencia en el sector tecnológico y hablo tres idiomas con fluidez. Soy una persona organizada, proactiva y orientada a resultados. En este puesto aportaré innovación y liderazgo a los proyectos de la empresa.'
        }
      }
    ]
  },

  // UNIT 23: Relaciones y Sentimientos
  {
    id: 'unit-a2-23',
    level: 'A2',
    unitNumber: 23,
    title_es: 'Relaciones, Emociones y Verbos de Cambio',
    title_en: 'Relationships, Emotions & Change Verbs',
    title_ar: 'العلاقات والمشاعر وأفعال التحول والصيرورة',
    description_en: 'Express emotional reactions, interpersonal chemistry (llevarse bien/mal, caer bien/mal), and change verbs (ponerse, hacerse, volverse).',
    description_ar: 'التعبير عن الانفعالات العاطفية، التوافق الاجتماعي (الانسجام مع الآخرين)، وأفعال التحول والصيرورة (ponerse, hacerse, volverse).',
    lessons: [
      {
        id: 'lesson-a2-23-1',
        unitId: 'unit-a2-23',
        lessonNumber: 1,
        title_es: 'Afinidad y Química: Caer Bien / Llevarse Bien',
        title_en: 'Interpersonal Chemistry: Caer Bien & Llevarse',
        title_ar: 'التوافق الاجتماعي: الارتياح والانسجام مع الآخرين',
        cefr: 'A2',
        objectives_en: ['Use "Caer bien/mal" with indirect object pronouns (Me cae genial Marta)', 'Use "Llevarse bien/mal con alguien" for relationships', 'Describe social group dynamics'],
        objectives_ar: ['استخدام Caer bien/mal للتعبير عن الانطباع الأول والارتياح لشخص ما', 'استخدام Llevarse bien/mal للتعبير عن جودة العلاقة مع شخص', 'وصف ديناميكيات المجموعات والأصدقاء'],
        vocabWordIds: ['w-caer-bien', 'w-llevarse-bien', 'w-amigo', 'w-relacion', 'w-confianza'],
        dialogue: [
          { speaker: 'Sergio', es: '¿Conociste al nuevo compañero de piso?', en: 'Did you meet the new flatmate?', ar: 'هل تعرفت على زميل السكن الجديد؟' },
          { speaker: 'Laura', es: 'Sí, me cae súper bien. Es muy educado y nos llevamos de maravilla.', en: 'Yes, I really like him. He is very polite and we get along wonderfully.', ar: 'نعم، ارتحت له كثيراً. إنه مهذب للغاية ونحن ننسجم بشكل رائع.' }
        ],
        exercises: [
          {
            id: 'ex-a2-23-1-1',
            type: 'multiple_choice',
            prompt_es: '"Nosotros nos llevamos muy bien" significa en inglés:',
            prompt_en: '"Nosotros nos llevamos muy bien" means:',
            prompt_ar: '"Nosotros nos llevamos muy bien" تعني:',
            options: ['We get along very well', 'We carry heavy bags', 'We argue constantly', 'We left the party early'],
            correctAnswer: 'We get along very well',
            explanation_en: '"Llevarse bien" means to get along well with someone.',
            explanation_ar: '"Llevarse bien" تعني الانسجام والتفاهم الجيد مع شخص ما.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences describing people you get along with and why they make a good impression on you.',
          prompt_ar: 'اكتب 3 جمل تصف فيها أشخاصاً تنسجم معهم وسبب انطباعك الإيجابي عنهم.',
          minSentences: 3,
          sampleTarget: 'Mis compañeros de trabajo me caen muy bien porque son amables y cooperativos. Me llevo genial con mi hermano menor y siempre nos apoyamos. Es maravilloso tener amigos de total confianza.'
        }
      },
      {
        id: 'lesson-a2-23-2',
        unitId: 'unit-a2-23',
        lessonNumber: 2,
        title_es: 'Verbos de Cambio: Ponerse, Hacerse, Volverse',
        title_en: 'Change of State Verbs: Ponerse, Hacerse, Volverse',
        title_ar: 'أفعال التحول: Ponerse و Hacerse و Volverse',
        cefr: 'A2',
        objectives_en: ['Use "Ponerse + adjetivo" for sudden temporary emotional/physical changes (se puso rojo, se puso triste)', 'Use "Hacerse + adjetivo/sustantivo" for gradual voluntary changes (se hizo médico, se hizo rico)', 'Use "Volverse + adjetivo" for profound personality shifts (se volvió loco, se volvió exigente)'],
        objectives_ar: ['استخدام Ponerse للتغيرات المؤقتة المفاجئة في المشاعر أو المظهر', 'استخدام Hacerse للتغيرات التدريجية الإرادية (المهن والمكانة)', 'استخدام Volverse للتحولات العميقة في الشخصية والطباع'],
        vocabWordIds: ['w-ponerse', 'w-hacerse', 'w-volverse', 'w-cambio', 'w-emocion'],
        dialogue: [
          { speaker: 'Carlos', es: 'Cuando escuchó la noticia se puso muy contento y se emocionó.', en: 'When he heard the news he became very happy and got emotional.', ar: 'حين سمع الخبر أصبح في غاية السعادة وتأثر كثيراً.' },
          { speaker: 'Marta', es: 'Con los años y el esfuerzo constante se hizo un experto en su campo.', en: 'With the years and constant effort he became an expert in his field.', ar: 'مع السنوات والجهد المتواصل أصبح خبيراً في مجاله.' }
        ],
        exercises: [
          {
            id: 'ex-a2-23-2-1',
            type: 'multiple_choice',
            prompt_es: 'Para un cambio repentino y temporal de emoción (como ponerse nervioso) usamos:',
            prompt_en: 'For a sudden temporary shift in mood, we use:',
            prompt_ar: 'للتحول المفاجئ المؤقت في المزاج والشعور نستخدم:',
            options: ['Ponerse (Me puse nervioso)', 'Hacerse (Me hice nervioso)', 'Quedarse (Me quedé nervioso)', 'Estarse (Me estuve nervioso)'],
            correctAnswer: 'Ponerse (Me puse nervioso)',
            explanation_en: '"Ponerse" expresses sudden, involuntary, temporary physical or emotional changes.',
            explanation_ar: '"Ponerse" تعبر عن التغيرات الانفعالية أو الجسدية المؤقتة السريعة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences using "se puso", "se hizo", and "me pongo".',
          prompt_ar: 'اكتب 3 جمل مستخدماً se puso و se hizo و me pongo.',
          minSentences: 3,
          sampleTarget: 'Siempre me pongo muy contento cuando recibo buenas noticias de mi familia. Mi primo estudió mucho y se hizo un gran abogado. Ante el problema, todo el equipo se puso a trabajar de inmediato.'
        }
      },
      {
        id: 'lesson-a2-23-3',
        unitId: 'unit-a2-23',
        lessonNumber: 3,
        title_es: 'Expresar Sentimientos con Verbos Tipo Gustar',
        title_en: 'Emotions with Gustar-type Verbs',
        title_ar: 'المشاعر مع الأفعال المصرفة على نمط Gustar',
        cefr: 'A2',
        objectives_en: ['Use "Me molesta...", "Me preocupa...", "Me fascina...", "Me da miedo/vergüenza..."', 'Follow with singular noun, plural noun, or infinitive', 'Express nuanced emotional reactions to daily situations'],
        objectives_ar: ['استخدام أفعال Me molesta و Me preocupa و Me fascina و Me da miedo', 'ربطها بالاسم المفرد والجمع والمصدر', 'التعبير عن ردود الفعل العاطفية الدقيقة تجاه المواقف'],
        vocabWordIds: ['w-molestar', 'w-preocupar', 'w-fascinar', 'w-miedo', 'w-verguenza'],
        dialogue: [
          { speaker: 'Diego', es: 'Me preocupa el cambio climático y me molesta el ruido excesivo de la ciudad.', en: 'Climate change worries me and excessive city noise bothers me.', ar: 'يقلقني التغير المناخي ويزعجني الضجيج المفرط في المدينة.' },
          { speaker: 'Sofía', es: 'A mí me fascina la astronomía y me encanta observar las estrellas.', en: 'Astronomy fascinates me and I love observing the stars.', ar: 'أما أنا فيبهرني علم الفلك وأعشق مراقبة النجوم.' }
        ],
        exercises: [
          {
            id: 'ex-a2-23-3-1',
            type: 'multiple_choice',
            prompt_es: 'A nosotros nos ______ (preocupar) los exámenes finales.',
            prompt_en: 'Choose the correct form of preocupar for plural subject "los exámenes":',
            prompt_ar: 'اختر تصريف preocupar المناسب مع الفاعل الجمع los exámenes:',
            options: ['preocupan', 'preocupa', 'preocupamos', 'preocupo'],
            correctAnswer: 'preocupan',
            explanation_en: 'Plural subject "los exámenes" requires the plural verb "preocupan".',
            explanation_ar: 'الفاعل الجمع "los exámenes" يتطلب صيغة الجمع "preocupan".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences expressing what worries, fascinates, or bothers you in life.',
          prompt_ar: 'اكتب 3 جمل تعبر فيها عما يقلقك أو يبهرك أو يزعجك في الحياة.',
          minSentences: 3,
          sampleTarget: 'Me fascina aprender sobre la historia y la cultura de diferentes civilizaciones. Me preocupa que la gente pase demasiado tiempo pegada a las pantallas. Me molesta la impuntualidad en las reuniones.'
        }
      },
      {
        id: 'lesson-a2-23-4',
        unitId: 'unit-a2-23',
        lessonNumber: 4,
        title_es: 'Resolver Conflictos y Pedir Disculpas Sinceras',
        title_en: 'Resolving Conflicts & Sincere Apologies',
        title_ar: 'حل النزاعات والاعتذار الصادق',
        cefr: 'A2',
        objectives_en: ['Apologize sincerely (Lo siento mucho, Te pido disculpas, No fue mi intención)', 'Accept apologies (No pasa nada, No te preocupes, Está todo bien)', 'Reach peaceful compromises'],
        objectives_ar: ['الاعتذار الصادق بلباقة', 'قبول الاعتذار وتطييب الخواطر', 'الوصول إلى حلول وسط وتفاهمات ودية'],
        vocabWordIds: ['w-disculpa', 'w-perdon', 'w-intencion', 'w-solucion', 'w-tranquilo'],
        dialogue: [
          { speaker: 'Javier', es: 'Siento mucho haber llegado tarde, había un atasco enorme en la carretera.', en: 'I am so sorry for arriving late, there was a huge traffic jam on the highway.', ar: 'أعتذر بشدة عن تأخري، كان هناك ازدحام مروري خانق على الطريق السريع.' },
          { speaker: 'Clara', es: 'No te preocupes, lo entiendo perfectamente. Lo importante es que ya estás aquí.', en: 'Don’t worry, I completely understand. The important thing is that you’re here now.', ar: 'لا تقلق، أنا أتفهم ذلك تماماً. المهم أنك وصلت بخير.' }
        ],
        exercises: [
          {
            id: 'ex-a2-23-4-1',
            type: 'multiple_choice',
            prompt_es: 'La respuesta más amable y natural para aceptar una disculpa es:',
            prompt_en: 'The most gracious response to accept an apology in Spanish is:',
            prompt_ar: 'الرد الأكثر لطافة وطبيعية لقبول الاعتذار هو:',
            options: ['No te preocupes, no pasa nada', 'No quiero verte nunca', 'Págame dinero ahora', 'Es tu culpa siempre'],
            correctAnswer: 'No te preocupes, no pasa nada',
            explanation_en: '"No te preocupes, no pasa nada" reassures the person gracefully.',
            explanation_ar: '"No te preocupes, no pasa nada" تطمئن الشخص بلباقة وأدب رفيع.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-turn dialogue apologizing for an honest mistake and reassuring the other person.',
          prompt_ar: 'اكتب حواراً من 3 تبادلات تعتذر فيه عن خطأ غير مقصود وتطمئن الطرف الآخر.',
          minSentences: 3,
          sampleTarget: '— Te pido disculpas por haber olvidado enviarte el documento ayer. — No te preocupes en absoluto, todos tenemos días ocupados. — Muchas gracias por tu comprensión y paciencia.'
        }
      }
    ]
  },

  // UNIT 24: Medios de Comunicación y Opiniones
  {
    id: 'unit-a2-24',
    level: 'A2',
    unitNumber: 24,
    title_es: 'Medios de Comunicación y Opinión',
    title_en: 'Media, News & Expressing Opinions',
    title_ar: 'وسائل الإعلام والأخبار والتعبير عن الرأي',
    description_en: 'Express agreement and disagreement, talk about news and social media, and use "Creo que / Pienso que + Indicativo".',
    description_ar: 'التعبير عن الموافقة والمعارضة، مناقشة الأخبار وشبكات التواصل الاجتماعي، واستخدام أفعال الرأي مع صيغة اليقين.',
    lessons: [
      {
        id: 'lesson-a2-24-1',
        unitId: 'unit-a2-24',
        lessonNumber: 1,
        title_es: 'Expresar Opiniones: Creo que, Pienso que, En mi opinión',
        title_en: 'Expressing Opinions: Creo que, Pienso que',
        title_ar: 'إبداء الرأي: أعتقد أن، أرى أن، في رأيي',
        cefr: 'A2',
        objectives_en: ['Use opinion triggers in affirmative with Indicative (Creo que es importante, Pienso que tenemos razón)', 'Use "Desde mi punto de vista" and "En mi opinión"', 'Structure well-argued viewpoints'],
        objectives_ar: ['استخدام أفعال الرأي المثبتة مع صيغة الإخبار', 'استخدام عبارات في رأيي ومن وجهة نظري', 'بناء حجج وآراء منطقية متماسكة'],
        vocabWordIds: ['w-creo-que', 'w-pienso-que', 'w-opinion', 'w-punto-de-vista', 'w-importante'],
        dialogue: [
          { speaker: 'Marcos', es: 'Creo que las redes sociales tienen ventajas para comunicar, pero pienso que a veces nos distraen demasiado.', en: 'I think social networks have communication benefits, but I think they sometimes distract us too much.', ar: 'أعتقد أن شبكات التواصل لها فوائد في الاتصال، لكنني أرى أنها تشتت انتباهنا أحياناً بشكل مفرط.' },
          { speaker: 'Elena', es: 'Estoy de acuerdo contigo. En mi opinión, el equilibrio es fundamental.', en: 'I agree with you. In my opinion, balance is essential.', ar: 'أنا أتفق معك. في رأيي، التوازن أمر جوهري.' }
        ],
        exercises: [
          {
            id: 'ex-a2-24-1-1',
            type: 'multiple_choice',
            prompt_es: 'Cuando expresamos una opinión afirmativa (Creo que...), el verbo subordinado va en:',
            prompt_en: 'After affirmative "Creo que...", the following verb is conjugated in:',
            prompt_ar: 'بعد عبارة الرأي المثبتة Creo que... يأتي الفعل التابع في صيغة:',
            options: ['Indicativo (es / tiene / hace)', 'Subjuntivo', 'Imperativo', 'Infinitivo solo'],
            correctAnswer: 'Indicativo (es / tiene / hace)',
            explanation_en: 'Affirmative belief/thought (Creo que, Pienso que) takes the Indicative mood in Spanish.',
            explanation_ar: 'الاعتقاد المثبت (Creo que, Pienso que) يتبعه دائماً زمن الإخبار المباشر Indicativo.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences expressing your personal opinion on artificial intelligence or language learning using "Creo que" and "En mi opinión".',
          prompt_ar: 'اكتب 3 جمل تبدي فيها رأيك الشخصي في الذكاء الاصطناعي أو تعلم اللغات باستخدام Creo que و En mi opinión.',
          minSentences: 3,
          sampleTarget: 'Creo que aprender un nuevo idioma abre puertas maravillosas en la vida. En mi opinión, la práctica diaria y la constancia son la clave del éxito. Pienso que la tecnología moderna es una herramienta de gran ayuda.'
        }
      },
      {
        id: 'lesson-a2-24-2',
        unitId: 'unit-a2-24',
        lessonNumber: 2,
        title_es: 'Estar de Acuerdo y Desacuerdo con Matices',
        title_en: 'Agreeing & Disagreeing with Nuance',
        title_ar: 'الموافقة والمعارضة بدرجات متفاوتة من اللباقة',
        cefr: 'A2',
        objectives_en: ['Express full agreement (Estoy totalmente de acuerdo, Tienes toda la razón)', 'Express partial agreement (Tienes razón en parte, pero...)', 'Disagree politely (No lo veo así, No estoy de acuerdo)'],
        objectives_ar: ['التعبير عن الاتفاق التام (أوافقك تماماً، معك كل الحق)', 'التعبير عن الاتفاق الجزئي (معك حق جزئياً لكن...)', 'الاعتراض بأدب واحترام لوجهات النظر'],
        vocabWordIds: ['w-de-acuerdo', 'w-razon', 'w-desacuerdo', 'w-matiz', 'w-respeto'],
        dialogue: [
          { speaker: 'Pedro', es: 'El teletrabajo es mucho mejor que el trabajo presencial.', en: 'Remote work is much better than in-person work.', ar: 'العمل عن بُعد أفضل بكثير من العمل الحضوري.' },
          { speaker: 'Lucía', es: 'Tienes razón en que ahorra tiempo de transporte, pero en mi opinión el contacto humano en la oficina también es valioso.', en: 'You are right that it saves travel time, but in my opinion human contact in the office is also valuable.', ar: 'معك حق في أنه يوفر وقت التنقل، لكن في رأيي التواصل الإنساني في المكتب قيّم أيضاً.' }
        ],
        exercises: [
          {
            id: 'ex-a2-24-2-1',
            type: 'multiple_choice',
            prompt_es: 'Para expresar acuerdo total con alguien decimos:',
            prompt_en: 'To express complete agreement with someone, we say:',
            prompt_ar: 'للتعبير عن الاتفاق التام مع شخص ما نقول:',
            options: ['Estoy totalmente de acuerdo contigo', 'No tienes ni idea', 'A mí no me importa', 'Cállate por favor'],
            correctAnswer: 'Estoy totalmente de acuerdo contigo',
            explanation_en: '"Estoy totalmente de acuerdo contigo" means I completely agree with you.',
            explanation_ar: '"Estoy totalmente de acuerdo contigo" تعني أوافقك الرأي تماماً وبكل تأكيد.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence polite debate expressing agreement with a point and offering a constructive alternative.',
          prompt_ar: 'اكتب نقاشاً لبقاً من 3 جمل توافق فيه على نقطة وتقدم بديلاً بناءً.',
          minSentences: 3,
          sampleTarget: 'Estoy de acuerdo en que las grandes ciudades ofrecen muchas oportunidades culturales. Sin embargo, pienso que la vida en el campo es más tranquila y saludable. Creo que encontrar un equilibrio entre ambas es la mejor opción.'
        }
      },
      {
        id: 'lesson-a2-24-3',
        unitId: 'unit-a2-24',
        lessonNumber: 3,
        title_es: 'Noticias, Prensa y Titulares de Actualidad',
        title_en: 'News, Press & Current Headlines',
        title_ar: 'الأخبار والصحافة وعناوين الأحداث الجارية',
        cefr: 'A2',
        objectives_en: ['Read newspaper headlines and summarize current events', 'Identify sections of news (economía, cultura, deportes, sociedad, medio ambiente)', 'Extract central facts (¿Quién? ¿Qué? ¿Cuándo? ¿Dónde?)'],
        objectives_ar: ['قراءة عناوين الصحف وتلخيص الأحداث الجارية', 'التعرف على أقسام الأخبار (اقتصاد، ثقافة، رياضة، مجتمع، بيئة)', 'استخراج الحقائق الجوهرية (من، ماذا، متى، أين)'],
        vocabWordIds: ['w-noticia', 'w-periodico', 'w-titular', 'w-suceso', 'w-mundo'],
        dialogue: [
          { speaker: 'Locutor', es: 'Última hora: Los científicos anuncian un avance histórico en energías renovables que reducirá las emisiones de carbono en un 40%.', en: 'Breaking news: Scientists announce a historic breakthrough in renewable energy...', ar: 'أخبار عاجلة: العلماء يعلنون عن إنجاز تاريخي في الطاقة المتجددة...' }
        ],
        exercises: [
          {
            id: 'ex-a2-24-3-1',
            type: 'multiple_choice',
            prompt_es: '"Última hora" en los medios de comunicación significa:',
            prompt_en: '"Última hora" in media news means:',
            prompt_ar: '"Última hora" في وسائل الإعلام تعني:',
            options: ['Breaking news / Latest news', 'Final hour of the day', 'Late clock arrival', 'Expired ticket'],
            correctAnswer: 'Breaking news / Latest news',
            explanation_en: '"Última hora" is the standard Spanish phrase for breaking news.',
            explanation_ar: '"Última hora" هي العبارة القياسية للأخبار العاجلة وآخر المستجدات.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence positive news report summarizing an exciting cultural or scientific discovery.',
          prompt_ar: 'اكتب تقريراً إخبارياً إيجابياً من 3 جمل يلخص اكتشافاً ثقافياً أو علمياً مثيراً.',
          minSentences: 3,
          sampleTarget: 'Noticia de última hora: Un equipo de arqueólogos ha descubierto una ciudad antigua intacta en el sur de España. Los expertos afirman que los restos tienen más de dos mil años de antigüedad. El hallazgo abrirá nuevas puertas al conocimiento de la historia mediterránea.'
        }
      },
      {
        id: 'lesson-a2-24-4',
        unitId: 'unit-a2-24',
        lessonNumber: 4,
        title_es: 'Redes Sociales y Ciudadanía Digital Responsable',
        title_en: 'Social Media & Digital Citizenship',
        title_ar: 'شبكات التواصل والمواطنة الرقمية الواعية',
        cefr: 'A2',
        objectives_en: ['Discuss digital habits (publicar fotos, seguir cuentas, enviar mensajes, compartir contenido)', 'Express advantages and disadvantages of technology', 'Formulate advice for healthy screen habits'],
        objectives_ar: ['مناقشة العادات الرقمية ومفردات الإنترنت والتطبيقات', 'التعبير عن إيجابيات وسلبيات التكنولوجيا', 'صياغة إرشادات للاستخدام الرقمي المتوازن والصحي'],
        vocabWordIds: ['w-redes-sociales', 'w-publicar', 'w-seguir', 'w-compartir', 'w-pantalla'],
        dialogue: [
          { speaker: 'Sara', es: 'Uso las redes sociales para mantenerme en contacto con mis amigos internacionales y aprender español con creadores nativos.', en: 'I use social media to stay in touch with international friends and learn Spanish with native creators.', ar: 'أستخدم شبكات التواصل للبقاء على اتصال بأصدقائي الدوليين وتعلم الإسبانية مع صناع محتوى أصليين.' }
        ],
        exercises: [
          {
            id: 'ex-a2-24-4-1',
            type: 'multiple_choice',
            prompt_es: '"Compartir una publicación" significa:',
            prompt_en: '"Compartir una publicación" means:',
            prompt_ar: '"Compartir una publicación" تعني:',
            options: ['To share a post', 'To delete a post', 'To hide the screen', 'To turn off the phone'],
            correctAnswer: 'To share a post',
            explanation_en: '"Compartir" means to share.',
            explanation_ar: '"Compartir" تعني مشاركة المحتوى مع الآخرين.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences analyzing your personal relationship with digital devices and social networks.',
          prompt_ar: 'اكتب 3 جمل تحلل فيها علاقتك الشخصية بالأجهزة الرقمية وشبكات التواصل.',
          minSentences: 3,
          sampleTarget: 'Utilizo las aplicaciones educativas para repasar español todos los días. Intento limitar el uso de redes sociales a una hora por jornada para no perder el tiempo. Creo que la tecnología es maravillosa si sabemos usarla con moderación.'
        }
      }
    ]
  },

  // UNIT 25: Viajar por el Mundo Hispano
  {
    id: 'unit-a2-25',
    level: 'A2',
    unitNumber: 25,
    title_es: 'Viajar por el Mundo Hispano',
    title_en: 'Traveling the Hispanic World',
    title_ar: 'السفر عبر العالم الناطق بالإسبانية',
    description_en: 'Explore diverse regions, cultural traditions (España, México, Argentina, Colombia, Perú), local idioms, and long-distance travel.',
    description_ar: 'استكشاف التنوع الثقافي والجغرافي (إسبانيا، المكسيك، الأرجنتين، كولومبيا، بيرو)، التقاليد المحلية، ووسائل السفر الطويل.',
    lessons: [
      {
        id: 'lesson-a2-25-1',
        unitId: 'unit-a2-25',
        lessonNumber: 1,
        title_es: 'Diversidad Geográfica y Cultural del Español',
        title_en: 'Geographical & Cultural Diversity of Spanish',
        title_ar: 'التنوع الجغرافي والثقافي للغة الإسبانية',
        cefr: 'A2',
        objectives_en: ['Recognize the 21 Spanish-speaking countries across 4 continents', 'Appreciate regional vocabulary variations (coche/carro/auto, móvil/celular)', 'Understand the richness of Hispanic heritage'],
        objectives_ar: ['التعرف على الدول الـ 21 الناطقة بالإسبانية عبر القارات', 'إدراك التنوع في المفردات الإقليمية (coche/carro/auto)', 'تقدير ثراء التراث الثقافي الإسباني واللاتيني'],
        vocabWordIds: ['w-continente', 'w-cultura', 'w-variedad', 'w-riqueza', 'w-tradicion'],
        dialogue: [
          { speaker: 'Profesor', es: 'El español es una lengua global hablada por más de quinientos millones de personas con fascinantes matices culturales.', en: 'Spanish is a global language spoken by over 500 million people with fascinating cultural nuances.', ar: 'الإسبانية لغة عالمية يتحدث بها أكثر من 500 مليون شخص بظلال ثقافية ساحرة.' }
        ],
        exercises: [
          {
            id: 'ex-a2-25-1-1',
            type: 'multiple_choice',
            prompt_es: 'En España se dice "coche" y "ordenador", mientras que en gran parte de América Latina se dice:',
            prompt_en: 'In Latin America, instead of "coche" and "ordenador", people often say:',
            prompt_ar: 'في معظم أمريكا اللاتينية، بدلاً من coche و ordenador يقال غالباً:',
            options: ['carro (o auto) y computadora', 'bicicleta y televisor', 'barco y radio', 'tren y teléfono'],
            correctAnswer: 'carro (o auto) y computadora',
            explanation_en: 'Carro/auto and computadora are the common Latin American equivalents.',
            explanation_ar: 'Carro/auto و computadora هما المقابلان الشائعان في أمريكا اللاتينية.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences about a Spanish-speaking country you dream of visiting and why.',
          prompt_ar: 'اكتب 3 جمل عن دولة ناطقة بالإسبانية تحلم بزيارتها واذكر السبب.',
          minSentences: 3,
          sampleTarget: 'Mi gran sueño es viajar a México para conocer las pirámides mayas y disfrutar de su gastronomía tradicional. También quiero visitar los pueblos mágicos llenos de color e historia. Me gustaría hablar con los lugareños y aprender sobre sus hermosas tradiciones.'
        }
      },
      {
        id: 'lesson-a2-25-2',
        unitId: 'unit-a2-25',
        lessonNumber: 2,
        title_es: 'Fiestas Tradicionales: San Fermín, Día de Muertos y La Tomatina',
        title_en: 'Traditional Festivals: Celebrations & Folklore',
        title_ar: 'المهرجانات والاحتفالات الشعبية التقليدية',
        cefr: 'A2',
        objectives_en: ['Describe cultural festivals (Día de Muertos en México, Las Fallas en Valencia, Feria de Abril en Sevilla)', 'Explain holiday customs and dates', 'Use cultural vocabulary with pride and respect'],
        objectives_ar: ['وصف الاحتفالات الثقافية البارزة', 'شرح عادات وتقاليد الأعياد وتواريخها', 'استخدام المفردات الثقافية بدقة واحترام'],
        vocabWordIds: ['w-fiesta', 'w-celebracion', 'w-disfraz', 'w-costumbre', 'w-musica'],
        dialogue: [
          { speaker: 'Valeria', es: 'El Día de Muertos en México es una fiesta llena de color, flores de cempasúchil y música donde recordamos con amor a nuestros seres queridos.', en: 'Day of the Dead in Mexico is a celebration full of color, marigold flowers, and music where we remember our loved ones with love.', ar: 'يوم الموتى في المكسيك احتفال مفعم بالألوان والورود والموسيقى نستحضر فيه أحباءنا بكل محبة.' }
        ],
        exercises: [
          {
            id: 'ex-a2-25-2-1',
            type: 'multiple_choice',
            prompt_es: 'La famosa fiesta de "Las Fallas" donde se crean impresionantes esculturas artísticas se celebra en:',
            prompt_en: 'The famous "Las Fallas" festival is celebrated in:',
            prompt_ar: 'مهرجان Las Fallas الشهير بمجسماته الفنية الضخمة يقام في مدينة:',
            options: ['Valencia, España', 'Bogotá, Colombia', 'Buenos Aires, Argentina', 'Lima, Perú'],
            correctAnswer: 'Valencia, España',
            explanation_en: 'Las Fallas takes place every March in Valencia.',
            explanation_ar: 'يقام مهرجان Las Fallas سنوياً في شهر مارس بمدينة فالنسيا الإسبانية.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Describe a traditional festival from your own country or the Hispanic world in 3 sentences.',
          prompt_ar: 'صف احتفالاً تقليدياً من بلدك أو من العالم الإسباني في 3 جمل.',
          minSentences: 3,
          sampleTarget: 'En mi país celebramos grandes fiestas tradicionales con deliciosas comidas familiares y música folclórica. Las calles se iluminan con luces de colores y la gente viste sus mejores trajes. Es una época maravillosa de alegría, solidaridad y unión.'
        }
      },
      {
        id: 'lesson-a2-25-3',
        unitId: 'unit-a2-25',
        lessonNumber: 3,
        title_es: 'Gastronomía y Sabores: Del Ceviche al Asado',
        title_en: 'Gastronomy & Flavors: From Ceviche to Asado',
        title_ar: 'المطبخ وفنون الطهي: من السيفيتشي إلى الأسادو',
        cefr: 'A2',
        objectives_en: ['Identify iconic dishes (tapas, ceviche peruano, asado argentino, tacos mexicanos, arepas colombianas)', 'Describe flavors (dulce, salado, picante, amargo, ácido)', 'Explain dietary traditions'],
        objectives_ar: ['معرفة أشهر الأطباق التقليدية في مختلف البلدان', 'وصف النكهات والأطعمة (حلو، مالح، حار، مر، حامض)', 'شرح التقاليد الغذائية وثقافة المائدة'],
        vocabWordIds: ['w-gastronomia', 'w-plato-tipico', 'w-sabor', 'w-dulce', 'w-picante'],
        dialogue: [
          { speaker: 'Guía', es: 'El ceviche peruano se prepara con pescado fresco marinado en zumo de lima, cebolla morada y ají. ¡Es fresco y delicioso!', en: 'Peruvian ceviche is prepared with fresh fish marinated in lime juice, red onion, and chili...', ar: 'يُحضر السيفيتشي البيروفي بالسمك الطازج المتبل بعصير الليمون والبصل الأحمر والفلفل...' }
        ],
        exercises: [
          {
            id: 'ex-a2-25-3-1',
            type: 'multiple_choice',
            prompt_es: 'El "Asado" tradicional con carne a la parrilla es un emblema cultural de:',
            prompt_en: 'The traditional "Asado" (grilled barbecue) is a cultural emblem of:',
            prompt_ar: 'وجبة "Asado" التقليدية للشواء على الفحم هي رمز ثقافي شهير في:',
            options: ['Argentina y Uruguay', 'España y Francia', 'México y Cuba', 'Perú y Ecuador'],
            correctAnswer: 'Argentina y Uruguay',
            explanation_en: 'Asado is iconic in Argentine and Uruguayan culture.',
            explanation_ar: 'الأسادو هو أشهر تقاليد المائدة في الأرجنتين وأوروغواي.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences describing a traditional dish you love, its ingredients, and its flavor profile.',
          prompt_ar: 'اكتب 3 جمل تصف فيها طبقاً تقليدياً تحبه، مكوناته، ونكهته المميزة.',
          minSentences: 3,
          sampleTarget: 'Mi plato favorito de la cocina hispana es el ceviche tradicional. Se prepara con pescado muy fresco, zumo de lima ácida, cilantro y maíz tostado. Es un plato ligero, saludable y con un sabor increíblemente refrescante.'
        }
      },
      {
        id: 'lesson-a2-25-4',
        unitId: 'unit-a2-25',
        lessonNumber: 4,
        title_es: 'Planear un Itinerario de Viaje Completo',
        title_en: 'Planning a Complete Travel Itinerary',
        title_ar: 'تخطيط مسار وبرنامج رحلة سياحية متكاملة',
        cefr: 'A2',
        objectives_en: ['Create day-by-day travel itineraries', 'Combine transport, accommodation, meals, and cultural visits', 'Handle budget calculations and bookings in Spanish'],
        objectives_ar: ['إنشاء جدول سياحي يومي مفصل للرحلة', 'الدمج بين المواصلات، الإقامة، الوجبات، والزيارات الثقافية', 'حساب الميزانية وإجراء الحجوزات بالإسبانية'],
        vocabWordIds: ['w-itinerario', 'w-presupuesto', 'w-excursion', 'w-monumento', 'w-guia'],
        dialogue: [
          { speaker: 'Agente', es: 'Para su viaje de diez días por Andalucía, el primer día visitarán la Giralda de Sevilla, el tercer día la Mezquita de Córdoba y el quinto la Alhambra de Granada.', en: 'For your 10-day trip through Andalusia: day 1 Giralda in Seville, day 3 Cordoba Mosque, day 5 Alhambra...', ar: 'لبرنامج رحلتكم لمدة 10 أيام في الأندلس: اليوم الأول إشبيلية، واليوم الثالث قرطبة، واليوم الخامس قصر الحمراء...' }
        ],
        exercises: [
          {
            id: 'ex-a2-25-4-1',
            type: 'multiple_choice',
            prompt_es: '"Itinerario de viaje" significa:',
            prompt_en: '"Itinerario de viaje" means:',
            prompt_ar: '"Itinerario de viaje" تعني:',
            options: ['Travel itinerary / Planned route', 'Lost passport claim', 'Luggage receipt', 'Hotel bill'],
            correctAnswer: 'Travel itinerary / Planned route',
            explanation_en: '"Itinerario de viaje" is the planned schedule and route for a journey.',
            explanation_ar: '"Itinerario de viaje" هو مسار وبرنامج الرحلة المخطط له مسبقاً.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-day travel itinerary for a trip to Spain or Latin America in 3 clear chronological sentences.',
          prompt_ar: 'اكتب برنامج رحلة سياحية من 3 أيام لزيارة إسبانيا أو أمريكا اللاتينية في 3 جمل.',
          minSentences: 3,
          sampleTarget: 'El primer día llegaremos a Madrid y pasearemos por el Parque del Retiro y la Gran Vía. El segundo día tomaremos el tren de alta velocidad a Toledo para explorar sus calles medievales. El tercer día visitaremos el Museo del Prado y cenaremos unas tapas exquisitas en La Latina.'
        }
      }
    ]
  },

  // UNIT 26: Consolidación y Proyecto Final A2
  {
    id: 'unit-a2-26',
    level: 'A2',
    unitNumber: 26,
    title_es: 'Consolidación y Proyecto Final A2',
    title_en: 'A2 Consolidation & Capstone Project',
    title_ar: 'تثبيت المستوى ومشروع التخرج A2',
    description_en: 'Synthesize all A2 past tenses, pronouns, future, comparisons, and prepare for intermediate fluency at Level B1.',
    description_ar: 'دمج وتثبيت كل أزمنة الماضي، الضمائر، المستقبل، المقارنات، والاستعداد للانطلاق إلى المستوى المتوسط B1.',
    lessons: [
      {
        id: 'lesson-a2-26-1',
        unitId: 'unit-a2-26',
        lessonNumber: 1,
        title_es: 'Gran Síntesis de los 3 Pasados: Indefinido, Imperfecto y Perfecto',
        title_en: 'Grand Synthesis of the 3 Past Tenses',
        title_ar: 'التركيب الشامل لأزمنة الماضي الثلاثة في الإسبانية',
        cefr: 'A2',
        objectives_en: ['Master the exact purpose of each past tense', 'Pretérito Perfecto = connected to now (he comido hoy)', 'Pretérito Indefinido = completed point in history (comí ayer)', 'Pretérito Imperfecto = ongoing scene/habit (comía todos los días)'],
        objectives_ar: ['إتقان الوظيفة الدقيقة لكل زمن من أزمنة الماضي', 'المقارنة الفورية والتبديل التلقائي بين الأزمنة الثلاثة في فقرة واحدة', 'الوصول إلى دقة لغوية رفيعة'],
        vocabWordIds: ['w-sintesis', 'w-pasado', 'w-indefinido', 'w-imperfecto', 'w-perfecto'],
        dialogue: [
          { speaker: 'Profesor', es: 'Cuando yo era niño (Imperfecto), vivía en una casa de campo. Un día mi familia decidió (Indefinido) mudarse a la ciudad. Desde entonces he aprendido (Perfecto) muchas cosas valiosas.', en: 'When I was a kid (Imperfect), I lived in the country. One day my family decided (Preterite) to move to the city. Since then I have learned (Present Perfect) many valuable things.', ar: 'حين كنت طفلاً (ماضي مستمر)، عشت في الريف. وفي أحد الأيام قررت عائلتي (ماضي تام) الانتقال للمدينة. ومنذ ذلك الحين تعلمت (ماضي قريب) الكثير...' }
        ],
        exercises: [
          {
            id: 'ex-a2-26-1-1',
            type: 'multiple_choice',
            prompt_es: '"Ayer ______ (llegar), mientras todos ______ (dormir), y hoy ya ______ (hacer) todo el trabajo."',
            prompt_en: 'Choose the correct sequence of all 3 past tenses:',
            prompt_ar: 'اختر التسلسل الصحيح لأزمنة الماضي الثلاثة:',
            options: ['llegué / dormían / he hecho', 'llegaba / durmieron / hice', 'he llegado / dormían / hacía', 'llegué / han dormido / hago'],
            correctAnswer: 'llegué / dormían / he hecho',
            explanation_en: 'Ayer punto (Indefinido: llegué) + Escenario continuo (Imperfecto: dormían) + Hoy (Perfecto: he hecho).',
            explanation_ar: 'نقطة الأمس (Indefinido: llegué) + المشهد المستمر (Imperfecto: dormían) + اليوم الممتد (Perfecto: he hecho).'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences using all three past tenses (Imperfecto, Indefinido, and Pretérito Perfecto) seamlessly.',
          prompt_ar: 'اكتب 3 جمل تدمج فيها ببراعة أزمنة الماضي الثلاثة (Imperfecto و Indefinido و Pretérito Perfecto).',
          minSentences: 3,
          sampleTarget: 'Cuando era estudiante vivía con mis mejores amigos en un piso luminoso. El año pasado terminé mis estudios universitarios con éxito. Esta semana he empezado a trabajar en mi profesión con gran ilusión.'
        }
      },
      {
        id: 'lesson-a2-26-2',
        unitId: 'unit-a2-26',
        lessonNumber: 2,
        title_es: 'Lectura Avanzada A2: Una Aventura en los Andes',
        title_en: 'Advanced A2 Reading: An Andean Adventure',
        title_ar: 'القراءة المتقدمة A2: مغامرة في جبال الأنديز',
        cefr: 'A2',
        objectives_en: ['Read a 200-word immersive story set in Peru and Ecuador', 'Understand complex descriptive phrases and indirect pronouns', 'Answer analytical comprehension questions'],
        objectives_ar: ['قراءة قصة مشوقة من 200 كلمة تدور أحداثها في جبال الأنديز', 'فهم التراكيب الوصفية وضمائر المفعول المزدوجة', 'الإجابة على أسئلة الفهم والتحليل'],
        vocabWordIds: ['w-aventura', 'w-montana', 'w-valle', 'w-paisaje', 'w-recuerdo'],
        dialogue: [
          { speaker: 'Narrador', es: 'El viaje por la cordillera de los Andes fue la experiencia más impresionante de mi vida. Mientras subíamos por los senderos antiguos, el aire era fresco y puro. De repente vimos la ciudadela sagrada de Machu Picchu iluminada por los primeros rayos del sol. Sentí una emoción profunda y le prometí a mi corazón que volvería algún día.', en: 'The journey through the Andes mountains was the most impressive experience of my life...', ar: 'كانت الرحلة عبر سلسلة جبال الأنديز التجربة الأكثر إبهاراً في حياتي...' }
        ],
        exercises: [
          {
            id: 'ex-a2-26-2-1',
            type: 'multiple_choice',
            prompt_es: 'Según el texto, ¿qué momento causó una emoción profunda en el narrador?',
            prompt_en: 'According to the reading, what moment caused deep emotion in the narrator?',
            prompt_ar: 'وفقاً للنص، ما هي اللحظة التي أثارت تأثراً عميقاً لدى الراوي؟',
            options: ['Ver Machu Picchu iluminado por el sol matutino', 'Perder el billete de tren', 'Comer en un restaurante caro', 'Dormir en el hotel'],
            correctAnswer: 'Ver Machu Picchu iluminado por el sol matutino',
            explanation_en: 'The text describes seeing Machu Picchu under the morning sun rays as deeply emotional.',
            explanation_ar: 'يذكر النص بوضوح أن مشهد ماتشو بيتشو تحت أشعة شمس الصباح هو ما أثار المشاعر العميقة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence summary of a memorable natural or mountain excursion you experienced or dream of experiencing.',
          prompt_ar: 'اكتب تلخيصاً من 3 جمل لرحلة جبلية أو طبيعية خضتها أو تحلم بخوضها.',
          minSentences: 3,
          sampleTarget: 'Caminar por senderos naturales entre montañas altas es una experiencia revitalizante para el espíritu. El aire puro y los paisajes verdes te hacen olvidar todo el estrés de la rutina diaria. En el futuro haré más excursiones ecológicas con mis amigos.'
        }
      },
      {
        id: 'lesson-a2-26-3',
        unitId: 'unit-a2-26',
        lessonNumber: 3,
        title_es: 'Taller de Expresión Oral y Fluidez Situacional',
        title_en: 'Oral Expression & Situational Fluency Drill',
        title_ar: 'ورشة التعبير الشفوي والطلاقة الحوارية',
        cefr: 'A2',
        objectives_en: ['Engage in multi-turn spontaneous dialogues', 'Use conversational connectors (por cierto, o sea, es decir, pues la verdad es que...)', 'Demonstrate natural rhythm and self-correction'],
        objectives_ar: ['خوض حوارات تلقائية متعددة التبادلات', 'استخدام روابط الحديث اليومية (بالمناسبة، يعني، في الحقيقة...)', 'إظهار إيقاع كلامي طبيعي مع التصحيح الذاتي التلقائي'],
        vocabWordIds: ['w-por-cierto', 'w-o-sea', 'w-la-verdad', 'w-conversar', 'w-fluidez'],
        dialogue: [
          { speaker: 'Examinador', es: 'Cuéntame, ¿qué cambios importantes has experimentado en tu vida durante los últimos años y qué metas tienes para el futuro?', en: 'Tell me, what important changes have you experienced in your life recently and what are your future goals?', ar: 'أخبرني، ما هي التحولات المهمة التي عشتها في السنوات الأخيرة وما هي أهدافك المستقبلية؟' },
          { speaker: 'Candidato', es: 'Pues la verdad es que he aprendido mucho. Antes era más tímido, pero ahora tengo más confianza. En el futuro trabajaré en proyectos internacionales y viajaré con frecuencia.', en: 'Well, the truth is I’ve learned a lot. Before I was shyer, but now I’m more confident. In the future I will work on international projects and travel often.', ar: 'في الحقيقة لقد تعلمت الكثير. في السابق كنت خجولاً، أما الآن فأنا أكثر ثقة. وفي المستقبل سأعمل في مشاريع دولية...' }
        ],
        exercises: [
          {
            id: 'ex-a2-26-3-1',
            type: 'multiple_choice',
            prompt_es: '"Por cierto" se utiliza en una conversación para:',
            prompt_en: '"Por cierto" is used in conversation to:',
            prompt_ar: '"Por cierto" تستخدم في المحادثة لـ:',
            options: ['Introducir un tema relacionado o recordar un dato (By the way)', 'Despedirse para siempre', 'Pedir la cuenta en un bar', 'Insultar a alguien'],
            correctAnswer: 'Introducir un tema relacionado o recordar un dato (By the way)',
            explanation_en: '"Por cierto" means "by the way" or "incidentally".',
            explanation_ar: '"Por cierto" تعني بالمناسبة / على فكرة وتستخدم لإيراد معلومة متصلة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write your 4-sentence conversational response explaining past changes in your habits and your future dreams.',
          prompt_ar: 'اكتب إجابتك الحوارية في 4 جمل توضح فيها التغيرات في عاداتك وأحلامك المستقبلية.',
          minSentences: 4,
          sampleTarget: 'La verdad es que mi vida ha cambiado mucho positivamente este año. Antes no tenía tiempo para mí, pero ahora hago ejercicio y estudio español con disciplina. El próximo año haré un viaje inolvidable por varios países hispanohablantes. Estoy seguro de que será una experiencia transformadora.'
        }
      },
      {
        id: 'lesson-a2-26-4',
        unitId: 'unit-a2-26',
        lessonNumber: 4,
        title_es: 'Proyecto Final A2: Mi Autobiografía y Mis Metas B1',
        title_en: 'A2 Capstone: Autobiography & B1 Trajectory',
        title_ar: 'مشروع تخرج المستوى A2: سيرتي الذاتية ومسار الانطلاق لـ B1',
        cefr: 'A2',
        objectives_en: ['Author a rich 6-sentence autobiographical essay integrating all A2 grammatical structures', 'Synthesize past memories, present status, pronoun mastery, comparisons, and future visions', 'Graduate with full distinction to CEFR Level B1'],
        objectives_ar: ['كتابة مقال سيرة ذاتية ثري من 6 جمل يدمج كل قواعد A2', 'الجمع بين ذكريات الماضي، الواقع الحالي، استخدام الضمائر، المقارنات، والرؤى المستقبلية', 'التخرج بجدارة واستحقاق والانطلاق إلى المستوى B1'],
        vocabWordIds: ['w-graduacion', 'w-autobiografia', 'w-logro', 'w-meta', 'w-b1'],
        dialogue: [
          { speaker: 'Tutor IA', es: '¡Enhorabuena! Has completado las 12 unidades del nivel A2 (unidades 15 a 26). Ahora dominas los tiempos del pasado, los pronombres y el futuro. ¡Bienvenido al nivel intermedio B1!', en: 'Congratulations! You have completed all 12 units of Level A2. Welcome to Intermediate Level B1!', ar: 'مبارك بكل فخر! لقد أتممت وحدات المستوى A2 الـ 12 بنجاح وأصبحت تتقن أزمنة الماضي والضمائر والمستقبل. مرحباً بك في المستوى المتوسط B1!' }
        ],
        exercises: [
          {
            id: 'ex-a2-26-4-1',
            type: 'multiple_choice',
            prompt_es: '¡Has dominado el nivel A2! En el nivel B1 aprenderemos la joya de la corona del español:',
            prompt_en: 'You have mastered Level A2! In Level B1 we unlock the crown jewel of Spanish:',
            prompt_ar: 'لقد أتقنت المستوى A2! في المستوى B1 سنتعلم جوهرة التاج في اللغة الإسبانية:',
            options: ['El Modo Subjuntivo y la expresión de deseos, hipótesis y dudas', 'El abecedario de nuevo', 'Los números del 1 al 10', 'Los saludos básicos'],
            correctAnswer: 'El Modo Subjuntivo y la expresión de deseos, hipótesis y dudas',
            explanation_en: 'Level B1 introduces the Subjunctive mood, conditional clauses, and sophisticated debating tools.',
            explanation_ar: 'المستوى B1 يفتح آفاق صيغة المنصوب والمشكوك فيه Subjuntivo، الجمل الشرطية، وأدوات النقاش المتقدمة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write your comprehensive A2 Capstone Essay (at least 6 complete sentences) covering childhood, recent milestones, comparisons, lessons learned, and your future ambitions.',
          prompt_ar: 'اكتب مقال تخرج المستوى A2 الشامل (6 جمل على الأقل) تغطي الطفولة، الإنجازات الحديثة، المقارنات، والخطط المستقبلية.',
          minSentences: 6,
          sampleTarget: 'Cuando era pequeño pasaba horas soñando con viajar por el mundo y conocer culturas diversas. Con el paso de los años me di cuenta de que los idiomas son el puente más poderoso hacia la libertad. El año pasado tomé la firme decisión de aprender español y desde entonces he practicado con pasión todos los días. Ahora entiendo películas, canciones y textos complejos con gran soltura. En el futuro viajaré por América Latina, hablaré con personas locales y escribiré historias sobre mis vivencias. ¡El nivel B1 será el siguiente gran paso en mi emocionante viaje lingüístico!'
        }
      }
    ]
  }
];
