import { Unit } from '../../types';

export const B2_UNITS_PART2: Unit[] = [
  // UNIT 43: La Voz Pasiva y la Pasiva Refleja
  {
    id: 'unit-b2-43',
    level: 'B2',
    unitNumber: 43,
    title_es: 'Voz Pasiva, Pasiva Refleja y Se Impersonal',
    title_en: 'Passive Voice, Reflexive Passive & Impersonal Se',
    title_ar: 'المبني للمجهول، المبني للمجهول المنعكس Pasiva Refleja، و Se غير الشخصية',
    description_en: 'Master standard passive (fue escrito por), the ubiquitous natural reflexive passive (Se venden casas / Se habla español), and the impersonal SE (Se vive bien aquí).',
    description_ar: 'إتقان صيغة المبني للمجهول القياسية مع Ser، المبني للمجهول المنعكس الأكثر شيوعاً في الحياة اليومية (Se venden casas)، و Se غير الشخصية (Se vive bien aquí).',
    lessons: [
      {
        id: 'lesson-b2-43-1',
        unitId: 'unit-b2-43',
        lessonNumber: 1,
        title_es: 'La Pasiva con SER vs La Pasiva Refleja con SE',
        title_en: 'Passive with SER vs Reflexive Passive with SE',
        title_ar: 'المبني للمجهول مع Ser مقابل المبني للمجهول المنعكس مع Se',
        cefr: 'B2',
        objectives_en: ['Passive with SER (Formal/Journalistic): El libro fue publicado por la editorial en 1920', 'Passive with SE (Everyday Standard): Se publicaron tres libros este año', 'Agreement with grammatical subject: Se vende casa (sing) vs Se venden casas (plur)'],
        objectives_ar: ['المبني للمجهول مع Ser يُستخدم في السياقات الرسمية والصحفية عند ذكر الفاعل (por)', 'المبني للمجهول المنعكس مع Se هو الأكثر طبيعية وشيوعاً في الإسبانية', 'المطابقة الإلزامية في العدد: Se vende casa للمفرد مقابل Se venden casas للجمع'],
        vocabWordIds: ['w-se-vende', 'w-se-venden', 'w-fue-descubierto', 'w-pasiva-refleja', 'w-sujeto-paciente'],
        grammarTopicId: 'g-passive-voice',
        dialogue: [
          { speaker: 'Locutor', es: 'El acuerdo fue firmado por ambos presidentes (Pasiva con ser). En las calles se celebran manifestaciones pacíficas (Pasiva refleja).', en: 'The agreement was signed by both presidents. In the streets peaceful demonstrations are held.', ar: 'تم توقيع الاتفاقية من قِبل كِلا الرئيسين (مع Ser). وفي الشوارع تُقام مظاهرات سلمية (مع Se).' }
        ],
        exercises: [
          {
            id: 'ex-b2-43-1-1',
            type: 'multiple_choice',
            prompt_es: 'En español estándar, para cosas en plural decimos: "En esta tienda ______ (vender) productos artesanales."',
            prompt_en: 'Because "productos artesanales" is plural, the reflexive passive verb is:',
            prompt_ar: 'نظراً لأن "productos artesanales" جمع، يصرف الفعل في صيغة الجمع:',
            options: ['se venden', 'se vende', 'es vendido', 'son vendiendo'],
            correctAnswer: 'se venden',
            explanation_en: 'Plural passive subject "productos artesanales" requires plural verb: se venden.',
            explanation_ar: 'نائب الفاعل الجمع "productos artesanales" يتطلب فعلاً في صيغة الجمع: se venden.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences using the reflexive passive "SE" with both singular and plural subjects.',
          prompt_ar: 'اكتب 3 جمل مستخدماً المبني للمجهول المنعكس مع SE للمفرد والجمع.',
          minSentences: 3,
          sampleTarget: 'En esta prestigiosa academia se enseñan diez lenguas extranjeras con métodos modernos. Se requiere experiencia previa para solicitar el puesto directivo. En muchas ciudades se construyen edificios sostenibles que respetan el entorno natural.'
        }
      },
      {
        id: 'lesson-b2-43-2',
        unitId: 'unit-b2-43',
        lessonNumber: 2,
        title_es: 'El "SE" Impersonal (Sin Sujeto Determinado)',
        title_en: 'The Impersonal "SE" (No Specific Subject)',
        title_ar: 'أداة "SE" غير الشخصية الدالة على العموم (بدون فاعل محدد)',
        cefr: 'B2',
        objectives_en: ['Use Impersonal SE for general human truths (Se vive bien aquí, Se come de maravilla, Se trabaja mucho)', 'Always stays in 3rd person SINGULAR (never plural)', 'Distinguish Impersonal SE (Se trata a las personas con respeto) from Reflexive Passive'],
        objectives_ar: ['استخدام Se غير الشخصية للحقائق العامة والسلوك الإنساني (يُعاش هنا برغد، يُؤكل بلذة)', 'يظل الفعل دائماً بصيغة المفرد الغائب (لا يُجمع أبداً)', 'التمييز بين Se غير الشخصية والمبني للمجهول المنعكس'],
        vocabWordIds: ['w-se-vive-bien', 'w-se-come-bien', 'w-se-trabaja', 'w-se-impersonal', 'w-generalizacion'],
        dialogue: [
          { speaker: 'Viajero', es: 'En España se cena bastante más tarde que en el norte de Europa y se disfruta mucho de la vida en las terrazas.', en: 'In Spain people have dinner much later than in Northern Europe and enjoy terrace life.', ar: 'في إسبانيا يتناول الناس العشاء في وقت متأخر كثيراً عن شمال أوروبا ويستمتعون بالحياة في المقاهي المفتوحة.' }
        ],
        exercises: [
          {
            id: 'ex-b2-43-2-1',
            type: 'multiple_choice',
            prompt_es: 'En la frase impersonal: "En este pueblo ______ (vivir) con mucha tranquilidad", el verbo va en:',
            prompt_en: 'In an impersonal SE sentence, the verb is always:',
            prompt_ar: 'في جملة SE غير الشخصية، يصرف الفعل دائماً في:',
            options: ['Tercera persona singular (se vive)', 'Tercera persona plural (se viven)', 'Primera persona (se vivo)', 'Infinitivo solo'],
            correctAnswer: 'Tercera persona singular (se vive)',
            explanation_en: 'Impersonal SE sentences are strictly 3rd person singular.',
            explanation_ar: 'جمل SE غير الشخصية تأتي حصراً بصيغة المفرد الغائب (se vive).'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences describing lifestyle, dining, or work habits in a country you love using the impersonal "SE".',
          prompt_ar: 'اكتب 3 جمل تصف فيها نمط الحياة أو العمل في بلد تحبه باستخدام SE غير الشخصية.',
          minSentences: 3,
          sampleTarget: 'En los pueblos mediterráneos se vive a un ritmo pausado y saludable. En las mañanas de domingo se pasea por el paseo marítimo y se conversa con los vecinos. Se valora profundamente el tiempo compartido en familia alrededor de una buena mesa.'
        }
      },
      {
        id: 'lesson-b2-43-3',
        unitId: 'unit-b2-43',
        lessonNumber: 3,
        title_es: 'El SE Involuntario o Accidental (Se me cayó, Se nos olvidó)',
        title_en: 'Accidental & Involuntary "SE"',
        title_ar: 'صيغة "SE" للأحداث العارضة وغير المقصودة (سقط مني، نسينا فجأة)',
        cefr: 'B2',
        objectives_en: ['Structure: SE + Indirect Object (me, te, le, nos, les) + Verb + Subject (Se me rompieron las gafas / Se te olvidaron las llaves)', 'Frame accidental mishaps without assigning active fault', 'Avoid sounding guilty while expressing surprise'],
        objectives_ar: ['التركيب: SE + ضمير المفعول غير المباشر + الفعل + الشيء الفاعل (انكسرت نظارتي مني / فلتت المفاتيح من يدك)', 'التعبير عن الحوادث العارضة دون توجيه لوم مباشر للمتكلم', 'تلطيف الخطاب عند وقوع خطأ غير مقصود'],
        vocabWordIds: ['w-se-me-cayo', 'w-se-me-olvido', 'w-se-me-rompio', 'w-se-accidental', 'w-involuntario'],
        dialogue: [
          { speaker: 'Amiga', es: '¡Vaya! Se me cayó la taza de café al suelo y se me mancharon los pantalones.', en: 'Oh no! My coffee cup dropped on the floor and my pants got stained.', ar: 'يا للأسف! سقط مني فنجان القهوة على الأرض واتسخ بنطالي.' },
          { speaker: 'Compañero', es: 'No te preocupes, a cualquiera se le puede escapar un objeto de las manos.', en: 'Don’t worry, anyone can accidentally drop something.', ar: 'لا تقلقي، يمكن لأي شخص أن يفلت شيء من يده دون قصد.' }
        ],
        exercises: [
          {
            id: 'ex-b2-43-3-1',
            type: 'multiple_choice',
            prompt_es: '"Se me olvidaron las llaves en casa" utiliza el verbo en plural "olvidaron" porque:',
            prompt_en: 'Why is the verb plural in "Se me olvidaron las llaves"?',
            prompt_ar: 'لماذا جاء الفعل جمعاً في "Se me olvidaron las llaves"؟',
            options: ['Porque el sujeto gramatical es "las llaves" (plural)', 'Porque yo tengo dos manos', 'Porque es futuro', 'Es una falta gramatical'],
            correctAnswer: 'Porque el sujeto gramatical es "las llaves" (plural)',
            explanation_en: 'In accidental SE constructions, the object ("las llaves") is the grammatical subject, determining verb number.',
            explanation_ar: 'في تركيب SE للأحداث العارضة، الشيء المفقود ("las llaves") هو الفاعل النحوي للفعل ويحدد تذكيره أو جمعه.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 natural sentences recounting accidental mishaps using the accidental SE construction (e.g. se me cayó, se nos olvidó, se le perdió).',
          prompt_ar: 'اكتب 3 جمل تروي فيها مواقف عارضة غير مقصودة باستخدام تركيب SE العارض.',
          minSentences: 3,
          sampleTarget: 'Ayer se me cayó el teléfono móvil al suelo, pero afortunadamente no se rompió la pantalla. Al salir de viaje se nos olvidaron los pasaportes en el cajón y tuvimos que regresar rápidamente. A mi hermano se le perdieron las llaves del coche durante la caminata por el bosque.'
        }
      },
      {
        id: 'lesson-b2-43-4',
        unitId: 'unit-b2-43',
        lessonNumber: 4,
        title_es: 'Textos Jurídicos, Normativos y Discurso Oficial',
        title_en: 'Legal, Normative & Official Declarations',
        title_ar: 'النصوص القانونية واللوائح التنظيمية والبيانات الرسمية',
        cefr: 'B2',
        objectives_en: ['Synthesize formal passive and reflexive structures in legal clauses (Se hace constar que..., Queda prohibido...)', 'Draft official notices and university regulations', 'Maintain high objective registers'],
        objectives_ar: ['دمج صيغ المبني للمجهول والمنعكس في البنود القانونية (يُقر بموجب هذا بأن...، يُحظر تماماً...)', 'صياغة الإخطارات الرسمية واللوائح الجامعية', 'الحفاظ على مستوى بلاغي مؤسسي رفيع'],
        vocabWordIds: ['w-se-hace-constar', 'w-queda-prohibido', 'w-articulo-legal', 'w-clausula', 'w-decreto'],
        dialogue: [
          { speaker: 'Texto Legal', es: 'Por la presente se hace constar que el solicitante cumple con todos los requisitos estipulados en el artículo quinto del reglamento universitario.', en: 'It is hereby stated that the applicant fulfills all requirements in Article 5...', ar: 'يشهد بموجب هذا بأن مقدم الطلب مستوفٍ لكافة الشروط المنصوص عليها في المادة الخامسة من اللائحة الجامعية.' }
        ],
        exercises: [
          {
            id: 'ex-b2-43-4-1',
            type: 'multiple_choice',
            prompt_es: '"Se hace constar que..." es una fórmula formal utilizada para:',
            prompt_en: '"Se hace constar que..." is a formal expression used to:',
            prompt_ar: '"Se hace constar que..." هي صيغة قانونية رسمية تستخدم لـ:',
            options: ['Certificar o dejar constancia oficial de un hecho jurídico o administrativo', 'Invitar a una fiesta de cumpleaños', 'Pedir perdón a un amigo', 'Comprar entradas de cine'],
            correctAnswer: 'Certificar o dejar constancia oficial de un hecho jurídico o administrativo',
            explanation_en: '"Se hace constar que..." is the standard legal opening to certify a fact.',
            explanation_ar: '"Se hace constar que..." هي الصيغة الرسمية المعتمدة لتوثيق وإثبات الوقائع الإدارية والقانونية.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence formal legal or organizational decree establishing safety guidelines using formal passive and reflexive structures.',
          prompt_ar: 'اكتب مرسوماً تنظيمياً من 3 جمل يقر إرشادات سلامة رسمية.',
          minSentences: 3,
          sampleTarget: 'Por medio del presente decreto se hace constar la aprobación unánime de las nuevas normas de seguridad institucional. Queda terminantemente prohibido el acceso a las instalaciones sin la debida acreditación identificativa. Se publicará la resolución íntegra en el boletín oficial para el conocimiento de todos los ciudadanos.'
        }
      }
    ]
  },

  // UNIT 44: Marcadores del Discurso y Conectores de Alto Nivel
  {
    id: 'unit-b2-44',
    level: 'B2',
    unitNumber: 44,
    title_es: 'Marcadores del Discurso de Nivel Avanzado',
    title_en: 'Advanced Discourse Markers & High-Level Connectors',
    title_ar: 'روابط الخطاب المتقدمة وأدوات البلاغة العالية',
    description_en: 'Master sophisticated connectors: De ahí que + Subjuntivo (Hence why), Por consiguiente, En lo que atañe a, Dado que, A pesar de que.',
    description_ar: 'إتقان أدوات الربط البلاغية الرفيعة: De ahí que + Subjuntivo (ولهذا السبب بالذات)، Por consiguiente (وبناءً عليه)، En lo que atañe a (فيما يتعلق بـ)، و Dado que.',
    lessons: [
      {
        id: 'lesson-b2-44-1',
        unitId: 'unit-b2-44',
        lessonNumber: 1,
        title_es: 'De ahí que + Subjuntivo: Expresar Consecuencia con Énfasis',
        title_en: 'De ahí que + Subjunctive: Emphatic Consequence',
        title_ar: 'أداة النتيجة المؤكدة: De ahí que + Subjuntivo (ومن هنا كان...)',
        cefr: 'B2',
        objectives_en: ['Recognize that "De ahí que" ALWAYS takes Subjunctive in Spanish (Había mucho tráfico, de ahí que LLEGARA tarde)', 'Synthesize historical and logical deductions', 'Elevate written and academic prose'],
        objectives_ar: ['معرفة أن أداة النتيجة البليغة "De ahí que" تقترن دائماً بـ Subjuntivo', 'صياغة الاستنتاجات المنطقية والتاريخية الرصينة', 'الارتقاء بالأسلوب الكتابي والأكاديمي إلى أعلى المستويات'],
        vocabWordIds: ['w-de-ahi-que', 'w-consecuencia', 'w-deduccion', 'w-logica', 'w-estilo-culto'],
        grammarTopicId: 'g-discourse-markers-advanced',
        dialogue: [
          { speaker: 'Analista', es: 'La empresa invirtió con antelación en ciberseguridad, de ahí que no sufriera ningún daño durante el ataque informático global.', en: 'The company invested early in cybersecurity, hence why it suffered no damage...', ar: 'استثمرت الشركة مبكراً في الأمن السيبراني، ومن هنا لم تلحق بها أي أضرار أثناء الهجوم الإلكتروني العالمي.' }
        ],
        exercises: [
          {
            id: 'ex-b2-44-1-1',
            type: 'multiple_choice',
            prompt_es: 'El conector "De ahí que" se construye SIEMPRE con:',
            prompt_en: 'The connector "De ahí que" is ALWAYS followed by:',
            prompt_ar: 'أداة الربط البلاغية "De ahí que" تتبع دائماً بـ:',
            options: ['El modo Subjuntivo', 'El modo Indicativo', 'El imperativo', 'El gerundio'],
            correctAnswer: 'El modo Subjuntivo',
            explanation_en: '"De ahí que" is a prestigious consecutive connector that strictly takes the subjunctive.',
            explanation_ar: '"De ahí que" هي أداة ربط سببية نتيجية بليغة تتطلب صيغة Subjuntivo حصراً.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sophisticated sentences explaining logical causes and results using "De ahí que + subjuntivo".',
          prompt_ar: 'اكتب 3 جمل رفيعة الأسلوب توضح الأسباب والنتائج باستخدام De ahí que + Subjuntivo.',
          minSentences: 3,
          sampleTarget: 'El candidato se preparó con una disciplina impecable durante meses, de ahí que superara todas las pruebas con la máxima calificación. El clima en esta región es extremadamente árido, de ahí que la vegetación autóctona haya desarrollado mecanismos únicos de conservación de agua. La novela aborda temas universales de la condición humana, de ahí que haya cautivado a lectores de todos los continentes.'
        }
      },
      {
        id: 'lesson-b2-44-2',
        unitId: 'unit-b2-44',
        lessonNumber: 2,
        title_es: 'Conectores Consecutivos y Concesivos: Por consiguiente, A pesar de que',
        title_en: 'Consecutive & Concessive Markers: Por consiguiente, A pesar de',
        title_ar: 'روابط الاستنتاج والاستدراك: وبناءً عليه، على الرغم من أن',
        cefr: 'B2',
        objectives_en: ['Use consecutive markers: Por consiguiente, Por ende, En consecuencia', 'Use concessive markers: A pesar de que + indicativo (fact) / subjuntivo (hypothetical/undetermined), Si bien, Aun cuando', 'Maintain flawless textual coherence'],
        objectives_ar: ['استخدام روابط الاستنتاج الفصيحة: Por consiguiente, Por ende, En consecuencia', 'استخدام روابط الاستدراك: A pesar de que مع Indicativo للواقع ومع Subjuntivo للاحتمال، Si bien, Aun cuando', 'بناء نصوص متماسكة تسلسلياً ومنطقياً'],
        vocabWordIds: ['w-por-consiguiente', 'w-por-ende', 'w-a-pesar-de-que', 'w-si-bien', 'w-aun-cuando'],
        dialogue: [
          { speaker: 'Investigador', es: 'Los datos obtenidos son concluyentes; por consiguiente, debemos revisar la hipótesis inicial. A pesar de que el proceso sea complejo, los beneficios serán extraordinarios.', en: 'The data is conclusive; therefore we must revise the initial hypothesis...', ar: 'البيانات التي حصلنا عليها قاطعة؛ وبناءً عليه يجب أن نراجع الفرضية الأولى. وعلى الرغم من صعوبة العملية، فإن الفوائد ستكون مذهلة.' }
        ],
        exercises: [
          {
            id: 'ex-b2-44-2-1',
            type: 'multiple_choice',
            prompt_es: '"Por ende" y "Por consiguiente" son marcadores formales que indican:',
            prompt_en: '"Por ende" and "Por consiguiente" are formal markers indicating:',
            prompt_ar: 'الرابطان الفصيحان "Por ende" و "Por consiguiente" يدلان على:',
            options: ['Consecuencia lógica directa (Therefore / Consequently)', 'Un saludo informal', 'Una duda temporal', 'Una contradicción absurda'],
            correctAnswer: 'Consecuencia lógica directa (Therefore / Consequently)',
            explanation_en: '"Por consiguiente" and "Por ende" express formal logical consequence.',
            explanation_ar: '"Por consiguiente" و "Por ende" تعبران عن النتيجة المنطقية الحتمية المترتبة على ما سبق.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 analytical sentences integrating "Por consiguiente", "A pesar de que", and "Si bien".',
          prompt_ar: 'اكتب 3 جمل تحليلية تدمج فيها روابط الاستنتاج والاستدراك الثلاثة.',
          minSentences: 3,
          sampleTarget: 'El equipo cumplió todos los objetivos estratégicos del trimestre; por consiguiente, los directivos aprobaron una bonificación especial. A pesar de que el entorno económico era adverso, supieron innovar con audacia y resiliencia. Si bien el camino fue exigente, los aprendizajes adquiridos resultaron sumamente enriquecedores para todos.'
        }
      },
      {
        id: 'lesson-b2-44-3',
        unitId: 'unit-b2-44',
        lessonNumber: 3,
        title_es: 'Estructuradores Temáticos: En lo que atañe a, Por lo que respecta a',
        title_en: 'Topical Organizers: En lo que atañe a, Por lo que respecta a',
        title_ar: 'محددات الموضوع: فيما يتعلق بـ، أما من جهة كذا، بخصوص',
        cefr: 'B2',
        objectives_en: ['Introduce topical shifts seamlessly (En lo relativo a, Por lo que respecta a, En lo que concierne a, En cuanto a)', 'Avoid abrupt thematic jumps in presentations', 'Organize complex academic dissertations'],
        objectives_ar: ['الانتقال السلس بين محاور الحديث (فيما يخص، بالنظر إلى، من زاوية كذا)', 'تجنب القفزات المفاجئة وغير المنسقة في العروض التقديمية', 'تنظيم الأطروحات والمقالات الأكاديمية المطولة'],
        vocabWordIds: ['w-en-lo-que-atañe-a', 'w-por-lo-que-respecta-a', 'w-en-lo-relativo-a', 'w-enfoque', 'w-transicion'],
        dialogue: [
          { speaker: 'Conferenciante', es: 'En lo que atañe a la viabilidad económica, el proyecto es sólido; por lo que respecta a su impacto medioambiental, cumple los estándares más rigurosos.', en: 'Regarding economic viability, the project is solid; as for environmental impact, it meets the highest standards.', ar: 'فيما يتعلق بالجدوى الاقتصادية، فإن المشروع راسخ؛ وأما من حيث الأثر البيئي، فهو يستوفي أدق المعايير.' }
        ],
        exercises: [
          {
            id: 'ex-b2-44-3-1',
            type: 'multiple_choice',
            prompt_es: 'La locución culta "En lo que atañe a" es equivalente formal a:',
            prompt_en: '"En lo que atañe a" is a formal equivalent of:',
            prompt_ar: 'العبارة الفصيحة "En lo que atañe a" هي مرادف رسمي راقٍ لـ:',
            options: ['En cuanto a / Con respecto a / Regarding', 'Antes de ayer', 'En ningún sitio', 'Lejos de aquí'],
            correctAnswer: 'En cuanto a / Con respecto a / Regarding',
            explanation_en: '"En lo que atañe a" means regarding / with respect to.',
            explanation_ar: '"En lo que atañe a" تعني "فيما يتعلق بـ / بخصوص / من حيث".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences organizing a multi-faceted project overview using "En lo que atañe a", "Por lo que respecta a", and "En lo relativo a".',
          prompt_ar: 'اكتب 3 جمل تنظم فيها تقريراً متعدد الجوانب لمشروع باستخدام محددات الموضوع الفصيحة.',
          minSentences: 3,
          sampleTarget: 'En lo que atañe a la infraestructura tecnológica, hemos completado la migración de servidores con éxito. Por lo que respecta a la formación del personal, se impartirán talleres especializados a partir de la próxima semana. En lo relativo al presupuesto global, nos hemos mantenido estrictamente dentro de los límites acordados.'
        }
      },
      {
        id: 'lesson-b2-44-4',
        unitId: 'unit-b2-44',
        lessonNumber: 4,
        title_es: 'El Arte de la Reformulación: Dicho de otro modo, En resumidas cuentas',
        title_en: 'The Art of Reformulation & Synthesis',
        title_ar: 'فن إعادة الصياغة والتلخيص البلاغي: بعبارة أخرى، وخلاصة القول',
        cefr: 'B2',
        objectives_en: ['Use reformulation markers: Dicho de otro modo, Es decir, En otros términos, O sea (informal)', 'Use summarizing markers: En resumidas cuentas, En definitiva, A modo de balance, En suma', 'Deliver crisp, memorable conclusions'],
        objectives_ar: ['استخدام أدوات إعادة الصياغة البليغة: Dicho de otro modo, En otros términos, Es decir', 'استخدام أدوات الخلاصة والتلخيص: En resumidas cuentas, En definitiva, En suma', 'صياغة خواتيم مؤثرة تعلق في الأذهان'],
        vocabWordIds: ['w-dicho-de-otro-modo', 'w-en-resumidas-cuentas', 'w-en-definitiva', 'w-en-suma', 'w-sintesis-brillante'],
        dialogue: [
          { speaker: 'Profesor', es: 'Dicho de otro modo: el lenguaje no solo describe el mundo, sino que lo construye. En resumidas cuentas, ampliar nuestro vocabulario es expandir los límites de nuestra propia mente.', en: 'In other words: language not only describes the world, it builds it...', ar: 'بعبارة أخرى: اللغة لا تكتفي بوصف العالم، بل تشيده وتبنيه. وخلاصة القول، إن توسيع مفرداتنا هو توسيع لآفاق عقولنا ذاتها.' }
        ],
        exercises: [
          {
            id: 'ex-b2-44-4-1',
            type: 'multiple_choice',
            prompt_es: '"En resumidas cuentas" y "En definitiva" se emplean para:',
            prompt_en: '"En resumidas cuentas" and "En definitiva" are used to:',
            prompt_ar: 'يُستخدم التعبيران "En resumidas cuentas" و "En definitiva" لـ:',
            options: ['Sintetizar y concluir las ideas fundamentales de una exposición (In summary)', 'Contar dinero en el banco', 'Empezar una discusión', 'Interrumpir groseramente a alguien'],
            correctAnswer: 'Sintetizar y concluir las ideas fundamentales de una exposición (In summary)',
            explanation_en: '"En resumidas cuentas" provides a concise final synthesis.',
            explanation_ar: '"En resumidas cuentas" تقدم تلخيصاً نهائياً مكثفاً للأفكار الجوهرية.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a powerful 3-sentence concluding summary for a speech on human potential using "Dicho de otro modo" and "En resumidas cuentas".',
          prompt_ar: 'اكتب تلخيصاً ختامياً مؤثراً من 3 جمل لخطاب حول الإمكانات البشرية باستخدام أدوات إعادة الصياغة والتلخيص.',
          minSentences: 3,
          sampleTarget: 'El talento individual necesita del compromiso y la constancia para transformarse en verdadera excelencia. Dicho de otro modo: la genialidad no es un destello fortuito, sino el fruto de miles de horas de dedicación apasionada. En resumidas cuentas, cuando creemos en nuestras capacidades y trabajamos con disciplina, no existen límites que no podamos superar.'
        }
      }
    ]
  },

  // UNIT 45: Modismos, Frases Hechas y Refranes
  {
    id: 'unit-b2-45',
    level: 'B2',
    unitNumber: 45,
    title_es: 'Modismos, Frases Hechas y Refranes Populares',
    title_en: 'Idioms, Proverbs & Folk Wisdom',
    title_ar: 'التعبيرات الاصطلاحية والأمثال الشعبية في الثقافة الإسبانية',
    description_en: 'Master colloquial idioms (tomar el pelo, costar un ojo de la cara, estar en las nubes, no tener pelos en la lengua) and iconic proverbs (A quien madruga...).',
    description_ar: 'إتقان التعبيرات الاصطلاحية الشائعة (tomar el pelo يمزح/يخدع بلطف، costar un ojo de la cara باهظ الثمن جداً، estar en las nubes شارد الذهن) والأمثال والحكم الشعبية الخالدة.',
    lessons: [
      {
        id: 'lesson-b2-45-1',
        unitId: 'unit-b2-45',
        lessonNumber: 1,
        title_es: 'Modismos con Partes del Cuerpo: Tomar el pelo, Costar un ojo de la cara',
        title_en: 'Body Part Idioms in Spanish',
        title_ar: 'التعبيرات الاصطلاحية المقترنة بأعضاء الجسد',
        cefr: 'B2',
        objectives_en: ['Tomar el pelo (To pull someone\'s leg / joke)', 'Costar un ojo de la cara (To cost an arm and a leg / very expensive)', 'No tener pelos en la lengua (To speak one\'s mind frankly)', 'Echar una mano (To give a helping hand)', 'Meter la pata (To put one\'s foot in it / make a blunder)'],
        objectives_ar: ['Tomar el pelo (يمازح شخصاً أو يداعبه بخدعة لطيفة)', 'Costar un ojo de la cara (باهظ الثمن للغاية)', 'No tener pelos en la lengua (صريح وجريء لا يخشى قول الحقيقة)', 'Echar una mano (يمد يد العون والمساعدة)', 'Meter la pata (يرتكب هفوة أو خطأ محرجاً)'],
        vocabWordIds: ['w-tomar-el-pelo', 'w-costar-un-ojo', 'w-no-tener-pelos-en-la-lengua', 'w-echar-una-mano', 'w-meter-la-pata'],
        grammarTopicId: 'g-idioms-b2',
        dialogue: [
          { speaker: 'Andrés', es: '¿De verdad te compraste ese coche deportivo tan lujoso?', en: 'Did you really buy that luxurious sports car?', ar: 'هل حقاً اشتريت تلك السيارة الرياضية الفاخرة؟' },
          { speaker: 'Marcos', es: '¡Qué va! Te estaba tomando el pelo. Ese coche cuesta un ojo de la cara y no tengo tanto dinero.', en: 'No way! I was pulling your leg. That car costs an arm and a leg and I don’t have that much money.', ar: 'كلا بالطبع! كنت أداعبك فقط. تلك السيارة تكلف ثروة طائلة وليس لدي كل هذا المال.' }
        ],
        exercises: [
          {
            id: 'ex-b2-45-1-1',
            type: 'multiple_choice',
            prompt_es: '"No tener pelos en la lengua" significa que una persona:',
            prompt_en: '"No tener pelos en la lengua" means a person:',
            prompt_ar: '"No tener pelos en la lengua" تعني أن الشخص:',
            options: ['Dice lo que piensa con total franqueza y sin miedo', 'Tiene problemas dentales', 'No sabe hablar español', 'Come muy rápido'],
            correctAnswer: 'Dice lo que piensa con total franqueza y sin miedo',
            explanation_en: '"No tener pelos en la lengua" means being outspoken, direct, and straightforward.',
            explanation_ar: '"No tener pelos en la lengua" تعني التحدث بمنتهى الصراحة والجرأة دون مواربة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a natural 3-sentence conversational story weaving in at least two body-part idioms (e.g. meter la pata, echar una mano, tomar el pelo).',
          prompt_ar: 'اكتب قصة حوارية طبيعية من 3 جمل تدمج فيها تعبيرين اصطلاحيين مقترنين بأعضاء الجسد على الأقل.',
          minSentences: 3,
          sampleTarget: 'Ayer metí la pata en la oficina al revelar una sorpresa que estaban preparando para el director. Afortunadamente mi compañera me echó una mano para arreglar la situación y desviar la atención. Al final todos pensaron que solo le estaba tomando el pelo y nos reímos del malentendido.'
        }
      },
      {
        id: 'lesson-b2-45-2',
        unitId: 'unit-b2-45',
        lessonNumber: 2,
        title_es: 'Modismos con Elementos de la Naturaleza: Estar en las nubes, Ser pan comido',
        title_en: 'Nature & Food Idioms: Estar en las nubes, Pan comido',
        title_ar: 'التعبيرات الاصطلاحية المقترنة بالطبيعة والأطعمة',
        cefr: 'B2',
        objectives_en: ['Estar en las nubes (To daydream / be distracted)', 'Ser pan comido (To be a piece of cake / super easy)', 'Ponerse las pilas (To get one\'s act together / work hard)', 'Ahogarse en un vaso de agua (To make a mountain out of a molehill)', 'Dar la vuelta a la tortilla (To turn the tables)'],
        objectives_ar: ['Estar en las nubes (شارد الذهن في عالم الأحلام)', 'Ser pan comido (سهل جداً كشربة ماء)', 'Ponerse las pilas (يشحذ همته وينشط بجدية)', 'Ahogarse en un vaso de agua (يضخم الأمور البسيطة)', 'Dar la vuelta a la tortilla (يقلب الطاولة لصالحه)'],
        vocabWordIds: ['w-estar-en-las-nubes', 'w-pan-comido', 'w-ponerse-las-pilas', 'w-ahogarse-vaso-agua', 'w-dar-vuelta-tortilla'],
        dialogue: [
          { speaker: 'Profesora', es: '¡Mateo, aterriza que estás en las nubes! Hay que ponerse las pilas para el examen de la próxima semana.', en: 'Mateo, come back to earth, you’re in the clouds! We need to step up for next week\'s exam.', ar: 'يا ماتيو، عُد للواقع فأنت شارد في السحاب! يجب أن نشحذ همتنا لامتحان الأسبوع القادم.' },
          { speaker: 'Mateo', es: 'No se preocupe profe, si estudiamos con dedicación será pan comido.', en: 'Don’t worry teacher, if we study with dedication it will be a piece of cake.', ar: 'لا تقلقي يا أستاذة، إن درسنا بجد سيكون الامتحان سهلاً كشربة ماء.' }
        ],
        exercises: [
          {
            id: 'ex-b2-45-2-1',
            type: 'multiple_choice',
            prompt_es: '"¡Ponte las pilas!" es una expresión coloquial española muy común para animar a alguien a:',
            prompt_en: '"¡Ponte las pilas!" encourages someone to:',
            prompt_ar: '"¡Ponte las pilas!" تشجع الشخص على:',
            options: ['Espabilar, activarse y trabajar con energía y determinación', 'Comprar baterías en la tienda', 'Dormirse en el sofá', 'Apagar el teléfono'],
            correctAnswer: 'Espabilar, activarse y trabajar con energía y determinación',
            explanation_en: '"Ponerse las pilas" means to get to work with energy, step it up, or wake up.',
            explanation_ar: '"Ponerse las pilas" تعني شحذ الهمة والنشاط والعمل بحماس وعزم.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 lively sentences incorporating "ponerse las pilas", "pan comido", and "ahogarse en un vaso de agua".',
          prompt_ar: 'اكتب 3 جمل حيوية تدمج فيها التعبيرات الاصطلاحية الثلاثة.',
          minSentences: 3,
          sampleTarget: 'Al principio pensé que el examen de certificación sería complicadísimo, pero al final fue pan comido gracias a mi preparación. Mi hermano tiende a ahogarse en un vaso de agua ante cualquier pequeño imprevisto de la rutina. Le dije que era hora de ponerse las pilas y buscar soluciones prácticas con optimismo.'
        }
      },
      {
        id: 'lesson-b2-45-3',
        unitId: 'unit-b2-45',
        lessonNumber: 3,
        title_es: 'Los Grandes Refranes del Refranero Español y su Sabiduría',
        title_en: 'Classic Spanish Proverbs & Cultural Heritage',
        title_ar: 'روائع الأمثال والحكم الشعبية في التراث الإسباني',
        cefr: 'B2',
        objectives_en: ['"A quien madruga, Dios le ayuda" (Early bird gets the worm / God helps early risers)', '"No hay mal que por bien no venga" (Every cloud has a silver lining)', '"Más vale pájaro en mano que ciento volando" (A bird in the hand is worth two in the bush)', '"Dime con quién andas y te diré quién eres" (You are judged by the company you keep)'],
        objectives_ar: ['"A quien madruga, Dios le ayuda" (من بكّر نال التوفيق والبركة)', '"No hay mal que por bien no venga" (عسى أن تكرهوا شيئاً وهو خير لكم)', '"Más vale pájaro en mano que ciento volando" (عصفور في اليد خير من عشرة على الشجرة)', '"Dime con quién andas y te diré quién eres" (قل لي من تعاشر أقل لك من أنت)'],
        vocabWordIds: ['w-refran', 'w-refranero', 'w-a-quien-madruga', 'w-no-hay-mal-que-por-bien', 'w-sabiduria-popular'],
        dialogue: [
          { speaker: 'Abuelo', es: 'No te desanimes por haber perdido ese tren, hijo; recuerda siempre que no hay mal que por bien no venga.', en: 'Don’t be discouraged for missing that train, son; always remember every cloud has a silver lining.', ar: 'لا تحزن لأنك فاتك ذلك القطار يا بني؛ وتذكر دائماً أن في كل عسر يسراً وفي كل أمر خير.' }
        ],
        exercises: [
          {
            id: 'ex-b2-45-3-1',
            type: 'multiple_choice',
            prompt_es: 'El refrán "Más vale pájaro en mano que ciento volando" enseña a:',
            prompt_en: 'What does "Más vale pájaro en mano..." advise?',
            prompt_ar: 'ماذا يعلمنا المثل "Más vale pájaro en mano que ciento volando"؟',
            options: ['Valorar la seguridad de lo que ya tenemos seguro frente a promesas inciertas', 'Cazar pájaros en el bosque', 'Volar en avión', 'Comprar jaulas'],
            correctAnswer: 'Valorar la seguridad de lo que ya tenemos seguro frente a promesas inciertas',
            explanation_en: 'It advises appreciating what is certain over uncertain risky promises (A bird in hand...).',
            explanation_ar: 'يعلمنا الرضا والتمسك بالمكسب المضمون بدلاً من المجازفة وراء وعود غير مؤكدة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences narrating a personal anecdote that proves one of the classic Spanish proverbs true.',
          prompt_ar: 'اكتب 3 جمل تسرد فيها تجربة شخصية تؤكد صحة أحد الأمثال الإسبانية الشهيرة.',
          minSentences: 3,
          sampleTarget: 'Cuando perdí mi primer empleo sentí una gran frustración, pero poco después encontré una oportunidad laboral infinitamente superior. Aquella experiencia me demostró que el refrán popular "no hay mal que por bien no venga" es una verdad universal. La vida siempre nos depara caminos mejores cuando mantenemos la esperanza y seguimos trabajando con ilusión.'
        }
      },
      {
        id: 'lesson-b2-45-4',
        unitId: 'unit-b2-45',
        lessonNumber: 4,
        title_es: 'Integración Natural de Frases Hechas en el Discurso Fluido',
        title_en: 'Natural Integration of Idioms in Fluent Speech',
        title_ar: 'التوظيف التلقائي للأمثال والتعبيرات في الحديث المنساب',
        cefr: 'B2',
        objectives_en: ['Avoid sounding artificial or like a dictionary when using idioms', 'Use conversational bridges (Como suele decirse, Como dice el refrán, Para no andarme por las ramas)', 'Demonstrate native-like pragmatic competence'],
        objectives_ar: ['تجنب التكلف والافتعال عند إيراد التعبيرات الاصطلاحية', 'استخدام عبارات التمهيد الطبيعية (كما يقال عادة، وكما يقول المثل، ودون إطالة أو لف ودوران)', 'إظهار كفاءة تداولية تضاهي الناطقين الأصليين'],
        vocabWordIds: ['w-como-suele-decirse', 'w-para-no-andar-por-las-ramas', 'w-competencia-pragmatica', 'w-naturalidad', 'w-expresividad'],
        dialogue: [
          { speaker: 'Orador', es: 'Para no andarme por las ramas: el proyecto ha sido un rotundo éxito. Como suele decirse, la unión hace la fuerza.', en: 'To not beat around the bush: the project was a resounding success. As the saying goes, unity is strength.', ar: 'ودون لف أو دوران: لقد حقق المشروع نجاحاً باهراً. وكما يقال عادة: في الاتحاد قوة.' }
        ],
        exercises: [
          {
            id: 'ex-b2-45-4-1',
            type: 'multiple_choice',
            prompt_es: '"Para no andarme por las ramas" significa en una conversación:',
            prompt_en: '"Para no andarme por las ramas" means:',
            prompt_ar: '"Para no andarme por las ramas" تعني في الحديث:',
            options: ['Ir directamente al grano y decir lo fundamental sin rodeos ni rodeos innecesarios', 'Subir a un árbol alto', 'Recoger ramas caídas', 'Caminar por el bosque'],
            correctAnswer: 'Ir directamente al grano y decir lo fundamental sin rodeos ni rodeos innecesarios',
            explanation_en: '"No andarse por las ramas" means to not beat around the bush and get straight to the point.',
            explanation_ar: '"No andarse por las ramas" تعني الدخول في صلب الموضوع مباشرة دون لف أو دوران.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a short 3-sentence conversational story introducing a proverb using natural framing (e.g. para no andarme por las ramas, como suele decirse).',
          prompt_ar: 'اكتب قصة حوارية قصيرة من 3 جمل توظف فيها مثلاً شعبياً بتلقائية.',
          minSentences: 3,
          sampleTarget: 'Para no andarme por las ramas, tuvimos que trabajar durante semanas enteras para sacar adelante esta empresa. Nos levantábamos al amanecer con energía porque, como suele decirse, a quien madruga Dios le ayuda. Hoy celebramos con orgullo los maravillosos frutos de nuestro esfuerzo colectivo.'
        }
      }
    ]
  },

  // UNIT 46: Lenguaje Periodístico, Político y Jurídico
  {
    id: 'unit-b2-46',
    level: 'B2',
    unitNumber: 46,
    title_es: 'Lenguaje Periodístico, Político y Jurídico',
    title_en: 'Journalistic, Political & Legal Registers',
    title_ar: 'اللغة الصحفية والخطاب السياسي والقانوني الرفيع',
    description_en: 'Analyze editorial columns, political debates, legal contracts, civil rights declarations, and author high-register investigative reports.',
    description_ar: 'تحليل المقالات الافتتاحية الصحفية، المناظرات السياسية، العقود القانونية، إعلانات الحقوق المدنية، وصياغة تقارير استقصائية رفيعة المستوى.',
    lessons: [
      {
        id: 'lesson-b2-46-1',
        unitId: 'unit-b2-46',
        lessonNumber: 1,
        title_es: 'La Crónica y el Artículo de Opinión Periodístico',
        title_en: 'The Chronicle & Journalistic Opinion Editorial (Op-Ed)',
        title_ar: 'التقرير الاستقصائي والمقال الافتتاحي في الصحافة الرصينة',
        cefr: 'B2',
        objectives_en: ['Deconstruct op-eds and journalistic columns in renowned Spanish newspapers (El País, El Mundo, La Vanguardia)', 'Identify journalistic rhetoric (metaphors, irony, statistics, compelling leads)', 'Author a formal journalistic op-ed'],
        objectives_ar: ['تفكيك مقالات الرأي في كبريات الصحف الإسبانية الرصينة', 'التعرف على البلاغة الصحفية والمقدمات الجاذبة والأدلة الإحصائية', 'كتابة مقال رأي صحفي رصين'],
        vocabWordIds: ['w-cronica', 'w-editorial', 'w-columna-de-opinion', 'w-periodismo', 'w-rigor'],
        dialogue: [
          { speaker: 'Periodista', es: 'En su editorial de hoy, el diario analiza con rigor las consecuencias socioeconómicas de la transición energética y apela a la responsabilidad compartida.', en: 'In today\'s editorial, the newspaper rigorously analyzes socioeconomic effects...', ar: 'في مقالها الافتتاحي اليوم، تحلل الصحيفة بدقة التداعيات الاجتماعية والاقتصادية للتحول الطاقي وتدعو للمسؤولية المشتركة.' }
        ],
        exercises: [
          {
            id: 'ex-b2-46-1-1',
            type: 'multiple_choice',
            prompt_es: 'El "editorial" de un periódico representa:',
            prompt_en: 'The "editorial" of a newspaper represents:',
            prompt_ar: '"المقال الافتتاحي" في الصحيفة يمثل:',
            options: ['La postura u opinión institucional oficial del medio de comunicación sobre un tema de actualidad', 'Una carta de un lector enojado', 'El horóscopo del día', 'La sección de pasatiempos'],
            correctAnswer: 'La postura u opinión institucional oficial del medio de comunicación sobre un tema de actualidad',
            explanation_en: 'The editorial expresses the collective official stance of the news organization.',
            explanation_ar: 'المقال الافتتاحي يعبر عن الموقف الرسمي الجماعي للمؤسسة الإعلامية تجاه قضية راهنة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence journalistic lead for an editorial column analyzing the impact of technology on youth.',
          prompt_ar: 'اكتب مقدمة صحفية من 3 جمل لمقال افتتاحي يحلل أثر التكنولوجيا على جيل الشباب.',
          minSentences: 3,
          sampleTarget: 'La vertiginosa digitalización de la vida cotidiana plantea desafíos sin precedentes para el desarrollo cognitivo y emocional de las nuevas generaciones. Si bien las redes facilitan el acceso instantáneo al conocimiento, también generan una preocupante fragmentación de la atención. Es imperativo que la sociedad diseñe políticas educativas que fomenten una relación consciente y equilibrada con la tecnología.'
        }
      },
      {
        id: 'lesson-b2-46-2',
        unitId: 'unit-b2-46',
        lessonNumber: 2,
        title_es: 'El Discurso Político y la Diplomacia Internacional',
        title_en: 'Political Discourse & International Diplomacy',
        title_ar: 'الخطاب السياسي والدبلوماسية والعلاقات الدولية',
        cefr: 'B2',
        objectives_en: ['Analyze political rhetoric (appeals to unity, values, sovereignty, multilateralism)', 'Use diplomatic terminology (ratificar tratados, soberanía, consenso, bilateral)', 'Deliver a formal address to an international assembly'],
        objectives_ar: ['تحليل الخطاب السياسي (الدعوة للوحدة، السيادة، التعددية الدولية، والقيم الإنسانية)', 'استخدام المصطلحات الدبلوماسية (تصديق المعاهدات، التوافق، العلاقات الثنائية)', 'إلقاء كلمة رسمية أمام محفل دولي'],
        vocabWordIds: ['w-soberania', 'w-tratado-internacional', 'w-consenso', 'w-multilateralismo', 'w-diplomacia'],
        dialogue: [
          { speaker: 'Presidente', es: 'Reafirmamos nuestro compromiso inquebrantable con la paz, el multilateralismo y la cooperación internacional para superar los retos del siglo XXI.', en: 'We reaffirm our unwavering commitment to peace, multilateralism, and international cooperation...', ar: 'نؤكد من جديد التزامنا الراسخ بالسلام، والتعددية الدولية، والتعاون العالمي لتجاوز تحديات القرن الحادي والعشرين.' }
        ],
        exercises: [
          {
            id: 'ex-b2-46-2-1',
            type: 'multiple_choice',
            prompt_es: '"Ratificar un tratado internacional" significa:',
            prompt_en: '"Ratificar un tratado internacional" means:',
            prompt_ar: '"Ratificar un tratado internacional" تعني:',
            options: ['Aprobar y confirmar formalmente la validez jurídica de un acuerdo entre Estados', 'Cancelar una reunión', 'Romper relaciones diplomáticas', 'Imprimir folletos turísticos'],
            correctAnswer: 'Aprobar y confirmar formalmente la validez jurídica de un acuerdo entre Estados',
            explanation_en: '"Ratificar" means to formally approve and sanction an international treaty.',
            explanation_ar: '"Ratificar" تعني التصديق الرسمي وإقرار النفاذ القانوني لمعاهدة بين الدول.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence excerpt of a diplomatic speech championing peace and mutual cooperation among nations.',
          prompt_ar: 'اكتب مقتطفاً من 3 جمل لخطاب دبلوماسي يدعو للسلام والتعاون المثمر بين الشعوب.',
          minSentences: 3,
          sampleTarget: 'En este momento crucial de la historia humana, las naciones debemos privilegiar el diálogo constructivo por encima de cualquier discrepancia. Ningún país puede afrontar en solitario desafíos globales como el cambio climático y la erradicación de la pobreza. Reafirmamos nuestra firme voluntad de construir un orden internacional basado en el respeto mutuo y la solidaridad.'
        }
      },
      {
        id: 'lesson-b2-46-3',
        unitId: 'unit-b2-46',
        lessonNumber: 3,
        title_es: 'Interpretación de Contratos y Cláusulas Jurídicas',
        title_en: 'Interpreting Contracts & Legal Clauses',
        title_ar: 'تفسير العقود والبنود والوثائق القانونية',
        cefr: 'B2',
        objectives_en: ['Deconstruct legal clauses (indemnización, rescisión de contrato, jurisdicción competente, fuerza mayor)', 'Understand formal legal syntax and future subjunctive archaisms', 'Draft standard non-disclosure and service agreements'],
        objectives_ar: ['تفكيك بنود العقود (التعويض، فسخ العقد، الاختصاص القضائي، القوة القاهرة)', 'فهم التراكيب النحوية القانونية الرصينة', 'صياغة اتفاقيات الحفاظ على السرية وتقديم الخدمات'],
        vocabWordIds: ['w-rescision', 'w-indemnizacion', 'w-fuerza-mayor', 'w-jurisdiccion', 'w-clausula-contractual'],
        dialogue: [
          { speaker: 'Abogada', es: 'La cláusula de rescisión estipula que cualquiera de las partes podrá dar por terminado el contrato mediando un preaviso por escrito de treinta días.', en: 'The termination clause stipulates that either party may terminate with 30 days written notice.', ar: 'ينص بند فسخ العقد على أنه يجوز لأي من الطرفين إنهاء العقد بموجب إخطار كتابي مسبق مدته ثلاثون يوماً.' }
        ],
        exercises: [
          {
            id: 'ex-b2-46-3-1',
            type: 'multiple_choice',
            prompt_es: 'En un contrato legal, la cláusula de "fuerza mayor" cubre:',
            prompt_en: 'In a legal contract, a "fuerza mayor" (force majeure) clause covers:',
            prompt_ar: 'في العقود القانونية، يغطي بند "القوة القاهرة" (fuerza mayor):',
            options: ['Acontecimientos extraordinarios e imprevisibles fuera del control de las partes (catástrofes, guerras)', 'El retraso por levantarse tarde', 'El cambio de opinión de un cliente', 'Las compras de la oficina'],
            correctAnswer: 'Acontecimientos extraordinarios e imprevisibles fuera del control de las partes (catástrofes, guerras)',
            explanation_en: 'Force majeure exempts parties from liability during unforeseeable catastrophic events.',
            explanation_ar: 'القوة القاهرة تعفي الأطراف من المسؤولية عند وقوع أحداث كارثية استثنائية خارجة عن السيطرة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence formal contractual clause regarding confidentiality and intellectual property rights.',
          prompt_ar: 'اكتب بنداً تعاقدياً رسمياً من 3 جمل يخص حماية السرية وحقوق الملكية الفكرية.',
          minSentences: 3,
          sampleTarget: 'Ambas partes contratantes se comprometen a guardar estricta confidencialidad respecto a toda la información técnica y comercial compartida durante la vigencia del acuerdo. Todos los derechos de propiedad intelectual derivados de la presente colaboración pertenecerán exclusivamente a la entidad desarrolladora. El incumplimiento de esta obligación dará lugar a las indemnizaciones por daños y perjuicios legalmente procedentes.'
        }
      },
      {
        id: 'lesson-b2-46-4',
        unitId: 'unit-b2-46',
        lessonNumber: 4,
        title_es: 'La Declaración Universal de Derechos Humanos en Español',
        title_en: 'Universal Declaration of Human Rights in Spanish',
        title_ar: 'الإعلان العالمي لحقوق الإنسان باللغة الإسبانية',
        cefr: 'B2',
        objectives_en: ['Analyze the milestone 1948 Declaration in its authentic Spanish text', 'Key articles: "Todos los seres humanos nacen libres e iguales en dignidad y derechos"', 'Debate contemporary human rights challenges with eloquence'],
        objectives_ar: ['تحليل النص الإسباني الأصيل للإعلان العالمي لحقوق الإنسان الصادر عام 1948', 'دراسة المواد المحورية: "يولد جميع الناس أحراراً ومتساوين في الكرامة والحقوق"', 'مناقشة قضايا حقوق الإنسان المعاصرة بفصاحة واقتدار'],
        vocabWordIds: ['w-derechos-humanos', 'w-dignidad', 'w-igualdad', 'w-libertad', 'w-justicia-universal'],
        dialogue: [
          { speaker: 'Jurista', es: 'El Artículo Primero proclama: "Todos los seres humanos nacen libres e iguales en dignidad y derechos y, dotados como están de razón y conciencia, deben comportarse fraternalmente los unos con los otros."', en: 'Article 1 proclaims: "All human beings are born free and equal in dignity and rights..."', ar: 'تنص المادة الأولى: "يولد جميع الناس أحراراً ومتساوين في الكرامة والحقوق، وهم قد وهبوا العقل والوجدان وعليهم أن يعاملوا بعضهم بعضاً بروح الإخاء."' }
        ],
        exercises: [
          {
            id: 'ex-b2-46-4-1',
            type: 'multiple_choice',
            prompt_es: 'El principio fundacional de la Declaración Universal de Derechos Humanos sostiene que los derechos son:',
            prompt_en: 'The core foundation of the Universal Declaration holds that human rights are:',
            prompt_ar: 'يقوم الأساس الجوهري للإعلان العالمي لحقوق الإنسان على أن الحقوق هي:',
            options: ['Universales, inalienables e inherentes a toda persona sin distinción alguna', 'Exclusivos para personas ricas', 'Temporales según el clima', 'Opcionales en la vida diaria'],
            correctAnswer: 'Universales, inalienables e inherentes a toda persona sin distinción alguna',
            explanation_en: 'Human rights are universally recognized as inalienable and inherent to all people.',
            explanation_ar: 'حقوق الإنسان عالمية غير قابلة للتصرف ولصيقة بكل إنسان دون أي تمييز.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences expressing your personal philosophical defense of human dignity, equality, and universal education.',
          prompt_ar: 'اكتب 3 جمل تعبر فيها عن دفاعك الفلسفي عن الكرامة الإنسانية والمساواة والحق في التعليم.',
          minSentences: 3,
          sampleTarget: 'La dignidad humana es el pilar inquebrantable sobre el cual debe erigirse cualquier sociedad justa y democrática. El acceso a una educación de calidad es un derecho fundamental que empodera a los individuos y rompe los ciclos de exclusión social. Debemos salvaguardar las libertades civiles con determinación y promover una cultura global de paz y fraternidad.'
        }
      }
    ]
  }
];
