import { Unit } from '../../types';

export const B1_UNITS_PART1: Unit[] = [
  // UNIT 27: El Presente de Subjuntivo: Formación y Deseos
  {
    id: 'unit-b1-27',
    level: 'B1',
    unitNumber: 27,
    title_es: 'Presente de Subjuntivo: Deseos y Voluntad',
    title_en: 'Present Subjunctive: Wishes & Will',
    title_ar: 'المضارع المنصوب Subjuntivo: الرغبات والتمنيات',
    description_en: 'Master the fundamental grammar shift from reality (indicative) to subjective wishes (Quiero que vengas, Ojalá que, Espero que).',
    description_ar: 'إتقان التحول الجوهري من صيغة اليقين إلى صيغة الشك والرغبة Subjuntivo مع أفعال الإرادة والتمني (Quiero que, Ojalá que, Espero que).',
    lessons: [
      {
        id: 'lesson-b1-27-1',
        unitId: 'unit-b1-27',
        lessonNumber: 1,
        title_es: 'Formación Regular: El Cruce de Vocales (-ar -> -e, -er/-ir -> -a)',
        title_en: 'Regular Formation: The Vowel Swap Rule',
        title_ar: 'الصياغة المنتظمة: قاعدة تبديل الحروف الصوتية',
        cefr: 'B1',
        objectives_en: ['Start from 1st person singular present indicative (yo hablo -> hable, yo como -> coma)', '-AR verbs swap to -e, -es, -e, -emos, -éis, -en', '-ER/-IR verbs swap to -a, -as, -a, -amos, -áis, -an'],
        objectives_ar: ['الانطلاق من صيغة المتكلم في المضارع (yo hablo -> hable)', 'تبديل أفعال -AR بحرف e', 'تبديل أفعال -ER/-IR بحرف a'],
        vocabWordIds: ['w-hable', 'w-coma', 'w-viva', 'w-subjuntivo', 'w-deseo'],
        grammarTopicId: 'g-present-subjunctive',
        dialogue: [
          { speaker: 'Profesor', es: 'Para formar el subjuntivo, tomas la forma "yo" del presente, quitas la "o" y pones la vocal opuesta: hablar -> hable, comer -> coma.', en: 'To form the subjunctive, take the "yo" present form, drop "o" and add the opposite vowel.', ar: 'لصياغة Subjuntivo تأخذ تصريف yo في المضارع وتحذف o وتضع الحرف الصوتي المعاكس.' }
        ],
        exercises: [
          {
            id: 'ex-b1-27-1-1',
            type: 'multiple_choice',
            prompt_es: 'El presente de subjuntivo del verbo "escribir" para "tú" es:',
            prompt_en: 'The present subjunctive of "escribir" for "tú" is:',
            prompt_ar: 'صيغة المضارع المنصوب Subjuntivo لفعل escribir مع tú هي:',
            options: ['escribas', 'escribes', 'escribis', 'escribieras'],
            correctAnswer: 'escribas',
            explanation_en: 'Escribir (yo escribo) -> drop o -> add -as = escribas.',
            explanation_ar: 'فعل escribir من أفعال -ir فيأخذ الحرف المعاكس a فتصبح escribas.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences expressing sincere wishes for a friend using "Espero que + subjuntivo".',
          prompt_ar: 'اكتب 3 جمل تعبر فيها عن أمنيات صادقة لصديق باستخدام Espero que + subjuntivo.',
          minSentences: 3,
          sampleTarget: 'Espero que tengas un día maravilloso y productivo. Deseo que apruebes todos tus exámenes con honores. Quiero que descanses bien esta noche.'
        }
      },
      {
        id: 'lesson-b1-27-2',
        unitId: 'unit-b1-27',
        lessonNumber: 2,
        title_es: 'Los 6 Subjuntivos Completamente Irregulares: DISHES',
        title_en: 'The 6 Fully Irregular Subjunctives: DISHES',
        title_ar: 'الأفعال الشاذة كلياً الستة في Subjuntivo: DISHES',
        cefr: 'B1',
        objectives_en: ['Memorize DISHES: Dar (dé), Ir (vaya), Ser (sea), Haber (haya), Estar (esté), Saber (sepa)', 'Apply across all persons', 'Use in high-frequency conversational expressions'],
        objectives_ar: ['حفظ الأفعال الشاذة الستة: Dar (dé), Ir (vaya), Ser (sea), Haber (haya), Estar (esté), Saber (sepa)', 'تطبيقها مع جميع الضمائر', 'استخدامها في التعبيرات اليومية الشائعة'],
        vocabWordIds: ['w-sea', 'w-vaya', 'w-haya', 'w-sepa', 'w-este'],
        dialogue: [
          { speaker: 'Madre', es: '¡Que te vaya muy bien en tu entrevista y que seas muy feliz!', en: 'May your interview go great and may you be very happy!', ar: 'أتمنى أن تسير مقابلتك على أفضل ما يرام وأن تكون سعيداً جداً!' },
          { speaker: 'Hijo', es: '¡Muchas gracias mamá! Ojalá que el director esté de buen humor.', en: 'Thank you mom! Hopefully the director is in a good mood.', ar: 'شكراً جزيلاً يا أمي! عسى أن يكون المدير في مزاج جيد.' }
        ],
        exercises: [
          {
            id: 'ex-b1-27-2-1',
            type: 'multiple_choice',
            prompt_es: 'El presente de subjuntivo de "IR" para "nosotros" es:',
            prompt_en: 'The present subjunctive of IR for "nosotros" is:',
            prompt_ar: 'تصريف فعل IR في Subjuntivo مع nosotros هو:',
            options: ['vayamos', 'vamos', 'íbamos', 'fuéramos'],
            correctAnswer: 'vayamos',
            explanation_en: 'Ir becomes vay- + amos = vayamos.',
            explanation_ar: 'تصريف فعل IR في Subjuntivo مع nosotros هو vayamos.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences using irregular subjunctive verbs (sea, vaya, esté, sepa).',
          prompt_ar: 'اكتب 3 جمل مستخدماً أفعال Subjuntivo الشاذة (sea, vaya, esté, sepa).',
          minSentences: 3,
          sampleTarget: 'Quiero que mi hermano sea muy exitoso en su carrera. Espero que nos vaya genial en el viaje de vacaciones. Deseo que toda mi familia esté sana y feliz.'
        }
      },
      {
        id: 'lesson-b1-27-3',
        unitId: 'unit-b1-27',
        lessonNumber: 3,
        title_es: 'El Mágico "Ojalá (que)" y Fórmulas de Buenos Deseos',
        title_en: 'The Magic of "Ojalá (que)" & Well Wishes',
        title_ar: 'كلمة الرجاء "Ojalá" وصيغ التمنيات الطيبة',
        cefr: 'B1',
        objectives_en: ['Trace the Arabic origin of "Ojalá" (Law sha\' Allah / Inshallah)', 'Always pair Ojalá with Subjunctive for present/future hopes', 'Use independent wish triggers: ¡Que cumplas muchos más!, ¡Que aproveche!, ¡Que te mejores!'],
        objectives_ar: ['معرفة الأصل التاريخي العربي لكلمة Ojalá (إن شاء الله / لو شاء الله)', 'اقتران Ojalá الدائم بصيغة Subjuntivo للتمني', 'استخدام صيغ التهنئة المستقلة (¡Que aproveche! بالهناء والشفاء، ¡Que te mejores! بالشفاء العاجل)'],
        vocabWordIds: ['w-ojala', 'w-que-aproveche', 'w-que-te-mejores', 'w-esperanza', 'w-suerte'],
        dialogue: [
          { speaker: 'Amigo', es: 'Mañana tengo el examen final para conseguir la beca.', en: 'Tomorrow I have the final exam to win the scholarship.', ar: 'غداً لدي الامتحان النهائي للحصول على المنحة الدراسية.' },
          { speaker: 'Compañero', es: '¡Ojalá que apruebes con la máxima calificación! ¡Que tengas muchísima suerte!', en: 'Hopefully you pass with top marks! Best of luck!', ar: 'عسى أن تجتاز الامتحان بأعلى درجة! أتمنى لك أوفر الحظ والتوفيق!' }
        ],
        exercises: [
          {
            id: 'ex-b1-27-3-1',
            type: 'multiple_choice',
            prompt_es: 'Cuando alguien está comiendo, le deseamos buen provecho diciendo en español:',
            prompt_en: 'When someone is eating, we politely say in Spanish:',
            prompt_ar: 'حين يتناول شخص الطعام، نقول له بلباقة وتمنٍ طيب:',
            options: ['¡Que aproveche! (o ¡Buen provecho!)', '¡Que descanses!', '¡Que te mejores!', '¡Que cumplas muchos más!'],
            correctAnswer: '¡Que aproveche! (o ¡Buen provecho!)',
            explanation_en: '"¡Que aproveche!" is the subjunctive well-wish for dining (Bon appétit).',
            explanation_ar: '"¡Que aproveche!" هي العبارة القياسية للتمني بالهناء والشفاء أثناء تناول الطعام.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 spontaneous well-wishes for different life moments using "¡Que + subjuntivo!" and "Ojalá que".',
          prompt_ar: 'اكتب 3 عبارات تمنيات طيبة لمناسبات مختلفة باستخدام ¡Que + subjuntivo! و Ojalá que.',
          minSentences: 3,
          sampleTarget: '¡Ojalá que encuentres el trabajo que tanto sueñas! ¡Que disfrutes al máximo de tus merecidas vacaciones! ¡Que te mejores muy pronto de ese resfriado!'
        }
      },
      {
        id: 'lesson-b1-27-4',
        unitId: 'unit-b1-27',
        lessonNumber: 4,
        title_es: 'Dos Sujetos Diferentes: La Clave del Subjuntivo',
        title_en: 'Two Different Subjects: Subjunctive vs Infinitive',
        title_ar: 'اختلاف الفاعل: الشرط الحاسم بين Subjuntivo والمصدر',
        cefr: 'B1',
        objectives_en: ['Same Subject = Infinitive (Yo quiero viajar)', 'Two Different Subjects = Que + Subjunctive (Yo quiero QUE TÚ viajes)', 'Never use subjunctive when both clauses share the exact same subject'],
        objectives_ar: ['اتحاد الفاعل = المصدر مباشرة (Quiero estudiar)', 'اختلاف الفاعل = Que + Subjuntivo (Quiero que estudies)', 'تجنب الوقوع في خطأ استخدام Subjuntivo مع نفس الفاعل'],
        vocabWordIds: ['w-sujeto', 'w-infinitivo', 'w-diferencia', 'w-querer', 'w-necesitar'],
        dialogue: [
          { speaker: 'Padre', es: 'Yo quiero comprar un coche (mismo sujeto: infinitivo). Pero quiero que tú estudies con disciplina (sujetos distintos: subjuntivo).', en: 'I want to buy a car (same subject: infinitive). But I want YOU to study with discipline (different subjects: subjunctive).', ar: 'أنا أريد أن أشتري سيارة (نفس الفاعل: مصدر). لكني أريد منك أن تدرس بجد (فاعلان مختلفان: Subjuntivo).' }
        ],
        exercises: [
          {
            id: 'ex-b1-27-4-1',
            type: 'multiple_choice',
            prompt_es: 'Completa: "Yo deseo ______ (aprender) español" vs "Yo deseo que tú ______ (aprender) español."',
            prompt_en: 'Choose the correct pair (Same subject vs Different subject):',
            prompt_ar: 'اختر الزوج الصحيح (نفس الفاعل مقابل فاعلين مختلفين):',
            options: ['aprender / aprendas', 'aprenda / aprendas', 'aprender / aprender', 'aprendas / aprender'],
            correctAnswer: 'aprender / aprendas',
            explanation_en: 'Same subject takes infinitive (aprender); different subject takes subjunctive (aprendas).',
            explanation_ar: 'مع نفس الفاعل نستخدم المصدر (aprender)، ومع اختلاف الفاعل نستخدم Subjuntivo (aprendas).'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences contrasting what you want to do yourself (infinitive) with what you want others to do (subjunctive).',
          prompt_ar: 'اكتب 3 جمل تقارن فيها بين ما ترغب بفعله بنفسك (مصدر) وما ترغب أن يفعله الآخرون (Subjuntivo).',
          minSentences: 3,
          sampleTarget: 'Yo quiero viajar por todo el mundo este verano. Sin embargo, mis padres quieren que yo termine primero todos mis proyectos. Yo deseo que todos seamos felices y alcancemos nuestras metas.'
        }
      }
    ]
  },

  // UNIT 28: Emociones y Valoraciones con Subjuntivo
  {
    id: 'unit-b1-28',
    level: 'B1',
    unitNumber: 28,
    title_es: 'Emociones y Valoraciones con Subjuntivo',
    title_en: 'Emotions & Value Judgments in Subjunctive',
    title_ar: 'المشاعر والتقييمات مع صيغة المنصوب Subjuntivo',
    description_en: 'Express personal emotions (Me alegro de que, Siento que) and impersonal value judgments (Es importante que, Es necesario que).',
    description_ar: 'التعبير عن المشاعر والانفعالات (Me alegro de que, Siento que) والأحكام التقييمية الموضوعية (Es importante que, Es necesario que).',
    lessons: [
      {
        id: 'lesson-b1-28-1',
        unitId: 'unit-b1-28',
        lessonNumber: 1,
        title_es: 'Verbos de Sentimiento: Alegrarse, Sentir, Temer',
        title_en: 'Feeling Verbs: Alegrarse, Sentir, Temer',
        title_ar: 'أفعال المشاعر: الفرح، الأسف، والخوف',
        cefr: 'B1',
        objectives_en: ['Use "Me alegro de que + subjuntivo" (I’m glad that)', 'Use "Siento que + subjuntivo" (I’m sorry that)', 'Use "Temo que / Tengo miedo de que + subjuntivo" (I fear that)'],
        objectives_ar: ['استخدام Me alegro de que للتعبير عن الفرح لفعل شخص آخر', 'استخدام Siento que للأسف والاعتذار', 'استخدام Temo que للتعبير عن الخوف والتوجس'],
        vocabWordIds: ['w-alegrarse', 'w-sentir', 'w-temer', 'w-emocion', 'w-sorprender'],
        dialogue: [
          { speaker: 'Carla', es: '¡Me alegro muchísimo de que hayas venido a visitarme!', en: 'I am so glad that you came to visit me!', ar: 'أنا في غاية السعادة لأنك جئت لزيارتي!' },
          { speaker: 'Andrés', es: 'Siento mucho que hayas tenido una semana tan pesada, pero hoy vamos a relajarnos.', en: 'I’m so sorry that you had such a heavy week, but today we’re going to relax.', ar: 'يؤسفني جداً أنك مررت بأسبوع شاق، لكننا اليوم سنسترخي ونستمتع.' }
        ],
        exercises: [
          {
            id: 'ex-b1-28-1-1',
            type: 'multiple_choice',
            prompt_es: 'Me alegro de que tú ______ (estar) aquí con nosotros.',
            prompt_en: 'Choose the correct subjunctive form of ESTAR for tú:',
            prompt_ar: 'اختر تصريف فعل estar في Subjuntivo مع tú:',
            options: ['estés', 'estás', 'estuviste', 'seas'],
            correctAnswer: 'estés',
            explanation_en: 'Feeling trigger "Me alegro de que" requires subjunctive: estés.',
            explanation_ar: 'فعل المشاعر "Me alegro de que" يتطلب دائماً صيغة Subjuntivo: estés.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences expressing your feelings about your friends\' or family\'s actions using "Me alegro de que" and "Siento que".',
          prompt_ar: 'اكتب 3 جمل تعبر فيها عن مشاعرك تجاه مواقف أصدقائك أو عائلتك.',
          minSentences: 3,
          sampleTarget: 'Me alegro mucho de que mi mejor amigo tenga un nuevo trabajo excelente. Siento que no puedas venir a la fiesta de cumpleaños este sábado. Me fascina que aprendamos juntos tantas cosas nuevas.'
        }
      },
      {
        id: 'lesson-b1-28-2',
        unitId: 'unit-b1-28',
        lessonNumber: 2,
        title_es: 'Estructuras Impersonales: Es importante que, Es necesario que',
        title_en: 'Impersonal Structures: Es importante que, Es necesario que',
        title_ar: 'التراكيب التقييمية: من المهم أن، من الضروري أن',
        cefr: 'B1',
        objectives_en: ['Use "Es + adjetivo + que + subjuntivo" (Es bueno que, Es fundamental que, Es una lástima que)', 'Contrast with general statements without "que" (Es importante estudiar = infinitive)', 'Formulate social and professional advice'],
        objectives_ar: ['استخدام Es + صفة + que + Subjuntivo للأحكام الموجهة لشخص', 'المقارنة مع التعميم بدون que الذي يأخذ المصدر (Es importante estudiar)', 'صياغة توصيات اجتماعية ومهنية حكيمة'],
        vocabWordIds: ['w-es-importante-que', 'w-es-necesario-que', 'w-es-bueno-que', 'w-es-una-lastima-que', 'w-fundamental'],
        dialogue: [
          { speaker: 'Consejero', es: 'Es necesario que duermas ocho horas y es fundamental que mantengas una actitud positiva ante los retos.', en: 'It is necessary that you sleep eight hours and essential that you maintain a positive attitude.', ar: 'من الضروري أن تنام ثماني ساعات ومن الجوهري أن تحافظ على موقف إيجابي تجاه التحديات.' }
        ],
        exercises: [
          {
            id: 'ex-b1-28-2-1',
            type: 'multiple_choice',
            prompt_es: 'Es fundamental que nosotros ______ (proteger) el medio ambiente.',
            prompt_en: 'Choose the correct subjunctive of proteger for nosotros:',
            prompt_ar: 'اختر تصريف فعل proteger في Subjuntivo مع nosotros:',
            options: ['protejamos', 'protegemos', 'protegamos', 'protegimos'],
            correctAnswer: 'protejamos',
            explanation_en: 'Proteger (yo protejo) -> drop o -> add -amos with "j" to keep the soft sound = protejamos.',
            explanation_ar: 'فعل proteger يتغير فيه الحرف إلى j في Subjuntivo للحفاظ على الصوت الرقيق: protejamos.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 advice sentences about succeeding in language learning using "Es importante que", "Es necesario que", and "Es bueno que".',
          prompt_ar: 'اكتب 3 جمل تقدم فيها نصائح للنجاح في تعلم اللغات باستخدام التراكيب التقييمية الثلاثة.',
          minSentences: 3,
          sampleTarget: 'Es fundamental que practiques la expresión oral todos los días sin miedo a cometer errores. Es necesario que escuches podcasts en español para acostumbrar tu oído. Es bueno que leas historias interesantes para ampliar tu vocabulario.'
        }
      },
      {
        id: 'lesson-b1-28-3',
        unitId: 'unit-b1-28',
        lessonNumber: 3,
        title_es: 'Expresar Sorpresa e Indignación: ¡Es increíble que!',
        title_en: 'Expressing Surprise & Outrage in Subjunctive',
        title_ar: 'التعبير عن الدهشة والاستنكار: من غير المعقول أن!',
        cefr: 'B1',
        objectives_en: ['Use "Es increíble que / Es injusto que / Es ilógico que + subjuntivo"', 'React with disbelief to startling news', 'Argue against unfair societal conditions'],
        objectives_ar: ['استخدام تعبيرات الدهشة والاستنكار المقترنة بـ Subjuntivo', 'إبداء ردود الفعل التفاعلية تجاه الأخبار المفاجئة', 'المنافحة عن العدالة ونبذ الظلم في القضايا الاجتماعية'],
        vocabWordIds: ['w-increible', 'w-injusto', 'w-sorprendente', 'w-ilogico', 'w-sociedad'],
        dialogue: [
          { speaker: 'Elena', es: '¡Es increíble que todavía exista tanta discriminación en el mundo!', en: 'It is unbelievable that so much discrimination still exists in the world!', ar: 'من غير المعقول أنه لا يزال هناك هذا القدر من التمييز في العالم!' },
          { speaker: 'Mateo', es: 'Sí, es injusto que muchas personas no tengan las mismas oportunidades de desarrollo.', en: 'Yes, it is unfair that many people do not have the same development opportunities.', ar: 'نعم، من الظلم ألا يحظى الكثير من الناس بنفس فرص التطور والنمو.' }
        ],
        exercises: [
          {
            id: 'ex-b1-28-3-1',
            type: 'multiple_choice',
            prompt_es: 'Es una lástima que muchas lenguas indígenas ______ (estar) en peligro de desaparecer.',
            prompt_en: 'Choose the correct subjunctive of estar for plural subject:',
            prompt_ar: 'اختر تصريف estar في Subjuntivo مع الجمع:',
            options: ['estén', 'están', 'estuvieran', 'sean'],
            correctAnswer: 'estén',
            explanation_en: '"Es una lástima que" (It is a pity that) triggers the subjunctive: estén.',
            explanation_ar: '"Es una lástima que" (من المؤسف أن) تتطلب صيغة Subjuntivo: estén.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences expressing your reactions to global challenges using "Es increíble que", "Es injusto que", and "Es una lástima que".',
          prompt_ar: 'اكتب 3 جمل تعبر فيها عن رد فعلك تجاه قضايا عالمية.',
          minSentences: 3,
          sampleTarget: 'Es una lástima que se talen miles de árboles en las selvas tropicales cada día. Es injusto que algunos niños no tengan acceso a una educación de calidad. Es increíble que la humanidad no colabore más para resolver el cambio climático.'
        }
      },
      {
        id: 'lesson-b1-28-4',
        unitId: 'unit-b1-28',
        lessonNumber: 4,
        title_es: 'Aconsejar e Influir: Te recomiendo que, Te pido que',
        title_en: 'Advising & Influencing: Recomendar & Pedir que',
        title_ar: 'التوجيه والتأثير: أوصيك بأن، أطلب منك أن',
        cefr: 'B1',
        objectives_en: ['Use "Te aconsejo que / Te sugiero que / Te recomiendo que + subjuntivo"', 'Use "Te pido que / Te ruego que / Te exijo que + subjuntivo"', 'Negotiate politely without being aggressive'],
        objectives_ar: ['استخدام أفعال النصح والاقتراح المقترنة بـ Subjuntivo', 'استخدام أفعال الطلب والرجاء', 'التفاوض والإقناع بلباقة واقتدار'],
        vocabWordIds: ['w-recomendar', 'w-aconsejar', 'w-pedir', 'w-sugerir', 'w-exigir'],
        dialogue: [
          { speaker: 'Médico', es: 'Le recomiendo que reduzca el consumo de sal y le sugiero que camine al menos cuarenta minutos diarios.', en: 'I recommend that you reduce salt intake and suggest that you walk at least 40 minutes daily.', ar: 'أوصيك بأن تقلل من استهلاك الملح وأقترح عليك أن تمشي 40 دقيقة يومياً على الأقل.' }
        ],
        exercises: [
          {
            id: 'ex-b1-28-4-1',
            type: 'multiple_choice',
            prompt_es: 'Te pido por favor que me ______ (escuchar) con atención.',
            prompt_en: 'Choose the correct subjunctive of escuchar for tú:',
            prompt_ar: 'اختر تصريف escuchar في Subjuntivo مع tú:',
            options: ['escuches', 'escuchas', 'escuchaste', 'escuche'],
            correctAnswer: 'escuches',
            explanation_en: '"Te pido que" triggers the subjunctive: escuches.',
            explanation_ar: '"Te pido que" تتطلب صيغة Subjuntivo: escuches.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 constructive recommendations to a friend preparing for a big job interview using "Te recomiendo que" and "Te sugiero que".',
          prompt_ar: 'اكتب 3 توصيات بناءة لصديق يستعد لمقابلة عمل هامة.',
          minSentences: 3,
          sampleTarget: 'Te recomiendo que investigues a fondo los valores y proyectos de la empresa antes de la entrevista. Te sugiero que prepares respuestas claras y concisas para las preguntas más habituales. Te pido que mantengas la calma y confíes plenamente en tu talento.'
        }
      }
    ]
  },

  // UNIT 29: Duda, Probabilidad y Negación de la Opinión
  {
    id: 'unit-b1-29',
    level: 'B1',
    unitNumber: 29,
    title_es: 'Duda, Probabilidad y Negación de la Opinión',
    title_en: 'Doubt, Probability & Negated Opinion',
    title_ar: 'الشك والاحتمال ونفي الرأي في Subjuntivo',
    description_en: 'Master the classic dichotomy: Creo que + Indicativo vs NO creo que + Subjuntivo, and adverbial doubt triggers (Quizás, Tal vez, Dudo que).',
    description_ar: 'إتقان المعادلة الكلاسيكية: إثبات الرأي يأخذ الإخبار Creo que + Indicativo، ونفي الرأي يأخذ المنصوب No creo que + Subjuntivo، وأدوات الشك (Quizás, Tal vez, Dudo que).',
    lessons: [
      {
        id: 'lesson-b1-29-1',
        unitId: 'unit-b1-29',
        lessonNumber: 1,
        title_es: 'Creo que (Indicativo) vs NO creo que (Subjuntivo)',
        title_en: 'Creo que (Indicative) vs NO creo que (Subjunctive)',
        title_ar: 'إثبات الرأي (Indicativo) مقابل نفي الرأي (Subjuntivo)',
        cefr: 'B1',
        objectives_en: ['Affirmative Opinion = Indicativo (Creo que es verdad / Pienso que viene)', 'Negated Opinion = Subjuntivo (No creo que sea verdad / No pienso que venga)', 'Understand why doubt triggers mood shift'],
        objectives_ar: ['الرأي المثبت يعبر عن يقين المتكلم فيأخذ Indicativo', 'الرأي المنفي يعبر عن الشك وعدم التصديق فيأخذ Subjuntivo', 'فهم الفلسفة اللغوية وراء تحول الصيغة'],
        vocabWordIds: ['w-creo-que', 'w-no-creo-que', 'w-no-pienso-que', 'w-verdad', 'w-duda'],
        grammarTopicId: 'g-subjunctive-triggers',
        dialogue: [
          { speaker: 'Sergio', es: 'Creo que ese restaurante es muy bueno (Indicativo: certeza).', en: 'I think that restaurant is very good.', ar: 'أعتقد أن ذلك المطعم جيد جداً (يقين: Indicativo).' },
          { speaker: 'Laura', es: 'Pues yo no creo que valga tanto la pena como dicen (Subjuntivo: duda).', en: 'Well I don’t think it is worth as much as they say.', ar: 'أما أنا فلا أعتقد أنه يستحق كل هذا العناء كما يقولون (شك: Subjuntivo).' }
        ],
        exercises: [
          {
            id: 'ex-b1-29-1-1',
            type: 'multiple_choice',
            prompt_es: 'Completa: "No creo que él ______ (tener) razón en este debate."',
            prompt_en: 'Choose the correct verb form after negated opinion "No creo que":',
            prompt_ar: 'اختر الصيغة الصحيحة بعد نفي الرأي No creo que:',
            options: ['tenga', 'tiene', 'tuviera', 'tenía'],
            correctAnswer: 'tenga',
            explanation_en: 'Negated opinion ("No creo que") requires the subjunctive: tenga.',
            explanation_ar: 'نفي الرأي "No creo que" يتطلب صيغة Subjuntivo: tenga.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences contrasting what you believe to be true (Creo que + ind) with what you doubt (No creo que + subj).',
          prompt_ar: 'اكتب 3 جمل تقارن فيها بين ما تعتقده صحيحاً وما تشك في صحته.',
          minSentences: 3,
          sampleTarget: 'Creo que el esfuerzo constante siempre da frutos positivos en la vida. Sin embargo, no creo que el éxito llegue de la noche a la mañana sin disciplina. Tampoco pienso que el dinero sea lo más importante para alcanzar la felicidad.'
        }
      },
      {
        id: 'lesson-b1-29-2',
        unitId: 'unit-b1-29',
        lessonNumber: 2,
        title_es: 'Dudar que, No estar seguro de que y la Incertidumbre',
        title_en: 'Dudar que & Uncertainty Triggers',
        title_ar: 'أفعال الشك وعدم اليقين Dudar que و No estar seguro de',
        cefr: 'B1',
        objectives_en: ['Use "Dudo que + subjuntivo" (I doubt that)', 'Use "No estoy seguro de que + subjuntivo" (I’m not sure that)', 'Express nuanced skepticism in intellectual discussions'],
        objectives_ar: ['استخدام Dudo que للتعبير عن الشك المباشر', 'استخدام No estoy seguro de que للتعبير عن عدم اليقين', 'صياغة التساؤلات الفكرية النقدية بدقة'],
        vocabWordIds: ['w-dudar', 'w-seguro', 'w-incertidumbre', 'w-posibilidad', 'w-realidad'],
        dialogue: [
          { speaker: 'Investigador', es: 'Dudo que ese método tradicional resuelva el problema moderno de forma eficaz.', en: 'I doubt that traditional method solves the modern problem effectively.', ar: 'أشك في أن تلك الطريقة التقليدية تحل المشكلة الحديثة بفعالية.' },
          { speaker: 'Colega', es: 'No estoy seguro de que tengamos suficientes datos para descartarlo todavía.', en: 'I am not sure that we have enough data to rule it out yet.', ar: 'لست متأكداً من أن لدينا بيانات كافية لاستبعادها بعد.' }
        ],
        exercises: [
          {
            id: 'ex-b1-29-2-1',
            type: 'multiple_choice',
            prompt_es: 'Dudo que ellos ______ (saber) la respuesta correcta.',
            prompt_en: 'Choose the correct subjunctive of saber for ellos:',
            prompt_ar: 'اختر تصريف فعل saber في Subjuntivo مع ellos:',
            options: ['sepan', 'saben', 'supieron', 'sabían'],
            correctAnswer: 'sepan',
            explanation_en: '"Dudo que" requires subjunctive: sepan.',
            explanation_ar: '"Dudo que" تتطلب صيغة Subjuntivo: sepan.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences expressing legitimate doubts about future predictions using "Dudo que" and "No estoy seguro de que".',
          prompt_ar: 'اكتب 3 جمل تعبر فيها عن شكوك منطقية تجاه تنبؤات مستقبلية.',
          minSentences: 3,
          sampleTarget: 'Dudo que los coches voladores sean comunes en los próximos diez años. No estoy seguro de que la inteligencia artificial pueda reemplazar la creatividad humana auténtica. No creo que la vida en otros planetas sea fácil de descubrir a corto plazo.'
        }
      },
      {
        id: 'lesson-b1-29-3',
        unitId: 'unit-b1-29',
        lessonNumber: 3,
        title_es: 'Adverbios de Probabilidad: Quizás, Tal vez, Probablemente',
        title_en: 'Adverbs of Probability: Quizás, Tal vez',
        title_ar: 'ظروف الاحتمال: ربما، لعل، من المحتمل',
        cefr: 'B1',
        objectives_en: ['Use Quizás / Tal vez + Subjuntivo for strong uncertainty (Quizás llueva mañana)', 'Use Quizás + Indicativo when speaker feels it is likely (Quizás llueve)', 'Use "A lo mejor" strictly with Indicative (A lo mejor viene = never subjunctive)'],
        objectives_ar: ['استخدام Quizás و Tal vez مع Subjuntivo عند غلبة الشك', 'استخدام Quizás مع Indicativo عند ترجيح الوقوع', 'معرفة أن التعبير الشائع A lo mejor يأخذ Indicativo دائماً ولا يقترن بـ Subjuntivo'],
        vocabWordIds: ['w-quizas', 'w-tal-vez', 'w-a-lo-mejor', 'w-probablemente', 'w-seguro'],
        dialogue: [
          { speaker: 'Pedro', es: '¿Vendrá Juan a la reunión de esta tarde?', en: 'Will Juan come to this afternoon’s meeting?', ar: 'هل سيأتي خوان إلى اجتماع بعد ظهر اليوم؟' },
          { speaker: 'Marta', es: 'Tal vez llegue un poco tarde porque tenía una cita médica, pero a lo mejor nos llama antes.', en: 'Perhaps he arrives a bit late due to a doctor\'s appointment, but maybe he calls us first.', ar: 'ربما يصل متأخراً قليلاً بسبب موعد طبي، ولكن لعله يتصل بنا قبل ذلك.' }
        ],
        exercises: [
          {
            id: 'ex-b1-29-3-1',
            type: 'multiple_choice',
            prompt_es: 'La expresión "A lo mejor" en español se combina SIEMPRE con:',
            prompt_en: 'The idiom "A lo mejor" in Spanish is ALWAYS followed by:',
            prompt_ar: 'التعبير الشائع "A lo mejor" يقترن دائماً بـ:',
            options: ['Modo Indicativo (A lo mejor viene)', 'Modo Subjuntivo (A lo mejor venga)', 'Imperativo', 'Infinitivo obligatorio'],
            correctAnswer: 'Modo Indicativo (A lo mejor viene)',
            explanation_en: '"A lo mejor" is a unique probability expression that strictly takes the Indicative mood.',
            explanation_ar: '"A lo mejor" هو تعبير احتمال فريد يقترن حصراً بزمن الإخبار Indicativo.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences exploring hypothetical weekend plans using "Quizás + subjuntivo", "Tal vez + subjuntivo", and "A lo mejor + indicativo".',
          prompt_ar: 'اكتب 3 جمل تستكشف فيها خطط عطلة نهاية الأسبوع باستخدام Quizás و Tal vez و A lo mejor.',
          minSentences: 3,
          sampleTarget: 'Quizás viaje a la sierra este fin de semana si el clima es favorable. Tal vez visite a mis primos en su nueva casa de campo. A lo mejor me quedo en casa descansando tranquilamente con un buen libro.'
        }
      },
      {
        id: 'lesson-b1-29-4',
        unitId: 'unit-b1-29',
        lessonNumber: 4,
        title_es: 'El Subjuntivo en Preguntas: ¿Crees que...?',
        title_en: 'Subjunctive in Questions: Do you think...?',
        title_ar: 'صيغة Subjuntivo في الأسئلة: هل تعتقد أن...؟',
        cefr: 'B1',
        objectives_en: ['Understand "¿Crees que + Indicativo?" (Asking normal belief: ¿Crees que es bueno?)', 'Understand "¿No crees que + Indicativo?" (Seeking agreement: ¿No crees que es caro?)', 'Distinguish genuine doubts from rhetorical questions'],
        objectives_ar: ['فهم السؤال المباشر ¿Crees que + Indicativo? لسؤال الشخص عن رأيه', 'فهم السؤال الاستنكاري أو التوكيدي ¿No crees que + Indicativo? لطلب التأييد', 'التمييز بين الأسئلة الحقيقية والأسئلة البلاغية'],
        vocabWordIds: ['w-crees-que', 'w-no-crees-que', 'w-pregunta', 'w-debate', 'w-respuesta'],
        dialogue: [
          { speaker: 'Lucas', es: '¿Crees que la energía solar reemplazará a los combustibles fósiles en este siglo?', en: 'Do you think solar energy will replace fossil fuels this century?', ar: 'هل تعتقد أن الطاقة الشمسية ستحل محل الوقود الأحفوري في هذا القرن؟' },
          { speaker: 'Sara', es: 'Creo que sí será la fuente principal, aunque dudo que el cambio sea instantáneo.', en: 'I think it will be the main source, although I doubt the change will be instantaneous.', ar: 'أعتقد أنها ستكون المصدر الرئيسي، وإن كنت أشك في أن يكون التحول فورياً.' }
        ],
        exercises: [
          {
            id: 'ex-b1-29-4-1',
            type: 'multiple_choice',
            prompt_es: 'En la pregunta "¿Crees que mañana ______ (llover)?", el verbo va en:',
            prompt_en: 'In affirmative questions with "¿Crees que...?", the verb is conjugated in:',
            prompt_ar: 'في السؤال المثبت مع ¿Crees que...؟، يصرف الفعل في:',
            options: ['Indicativo (va a llover / lloverá)', 'Subjuntivo obligatorio', 'Imperativo', 'Gerundio solo'],
            correctAnswer: 'Indicativo (va a llover / lloverá)',
            explanation_en: 'Questions with affirmative "creer" take the indicative mood.',
            explanation_ar: 'الأسئلة التي تبدأ بفعل الاعتقاد المثبت ¿Crees que تأخذ صيغة Indicativo.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 thought-provoking debate questions to a colleague using "¿Crees que...?" and "¿No crees que...?".',
          prompt_ar: 'اكتب 3 أسئلة نقاشية فكرية لزميل باستخدام ¿Crees que...? و ¿No crees que...?.',
          minSentences: 3,
          sampleTarget: '¿Crees que el teletrabajo aumentará la productividad de las empresas en el futuro? ¿No crees que es fundamental preservar los espacios naturales en las ciudades? ¿Crees que aprender idiomas fomenta la empatía entre las culturas?'
        }
      }
    ]
  },

  // UNIT 30: El Imperativo Negativo y Prohibiciones
  {
    id: 'unit-b1-30',
    level: 'B1',
    unitNumber: 30,
    title_es: 'Imperativo Negativo y Prohibiciones',
    title_en: 'Negative Commands & Prohibitions',
    title_ar: 'صيغة النهي والأمر المنفي وقواعد السلامة',
    description_en: 'Master negative commands formed identically to the Present Subjunctive (No hables, No comas, No te rindas), safety rules, and pronoun placement.',
    description_ar: 'إتقان صيغ النهي والأمر المنفي المتطابقة كلياً مع أفعال Presente de Subjuntivo، قواعد السلامة، ومواقع الضمائر المنفصلة أمام الفعل المنفي.',
    lessons: [
      {
        id: 'lesson-b1-30-1',
        unitId: 'unit-b1-30',
        lessonNumber: 1,
        title_es: 'Formación del Imperativo Negativo (NO + Subjuntivo)',
        title_en: 'Forming Negative Commands (NO + Subjunctive)',
        title_ar: 'صياغة النهي: لا الناهية + تصريف Subjuntivo',
        cefr: 'B1',
        objectives_en: ['Recognize that ALL negative commands use Present Subjunctive (No hables, No comas, No escribas)', 'Apply to all persons (No hables tú, No hable usted, No hablemos nosotros, No habléis vosotros, No hablen ustedes)', 'Contrast with affirmative commands (Habla vs No hables)'],
        objectives_ar: ['معرفة أن جميع أفعال النهي في الإسبانية تستعير تصريفها من Presente de Subjuntivo', 'تطبيقها على كافة الضمائر', 'المقارنة بين الأمر المثبت والنهي المنفي'],
        vocabWordIds: ['w-no-hables', 'w-no-comas', 'w-no-vayas', 'w-no-hagas', 'w-prohibicion'],
        grammarTopicId: 'g-imperative-mood',
        dialogue: [
          { speaker: 'Entrenador', es: '¡No te rindas nunca y no tengas miedo de cometer errores! ¡Sigue luchando!', en: 'Never give up and don’t be afraid of making mistakes! Keep fighting!', ar: 'لا تستسلم أبداً ولا تخف من ارتكاب الأخطاء! واصل الكفاح!' }
        ],
        exercises: [
          {
            id: 'ex-b1-30-1-1',
            type: 'multiple_choice',
            prompt_es: 'El imperativo negativo (prohibición) de "hacer" para "tú" es:',
            prompt_en: 'The negative command (Don’t do it!) for "tú" is:',
            prompt_ar: 'صيغة النهي لفعل hacer مع tú (لا تفعل!) هي:',
            options: ['No hagas', 'No haz', 'No haces', 'No haga'],
            correctAnswer: 'No hagas',
            explanation_en: 'Negative commands use the present subjunctive: No hagas (unlike affirmative "Haz").',
            explanation_ar: 'الأمر المنفي يستخدم صيغة Subjuntivo: No hagas (على عكس الأمر المثبت Haz).'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 encouraging negative commands to a stressed student (e.g. No te preocupes, No te rindas, No olvides).',
          prompt_ar: 'اكتب 3 نصائح بصيغة النهي التشجيعي لطالب يعاني من التوتر والضغط.',
          minSentences: 3,
          sampleTarget: 'No te preocupes por los pequeños obstáculos del camino. No te rindas antes de dar tu máximo esfuerzo. No olvides que cada error es una valiosa oportunidad de aprendizaje.'
        }
      },
      {
        id: 'lesson-b1-30-2',
        unitId: 'unit-b1-30',
        lessonNumber: 2,
        title_es: 'Posición de Pronombres: Afirmativo vs Negativo',
        title_en: 'Pronoun Placement: Affirmative vs Negative',
        title_ar: 'مواقع الضمائر: الأمر المثبت مقابل النهي المنفي',
        cefr: 'B1',
        objectives_en: ['Affirmative = Attached at the END (Hazlo, Dímelo, Siéntate)', 'Negative = Placed BEFORE the verb (No lo hagas, No me lo digas, No te sientes)', 'Master this critical contrast without hesitation'],
        objectives_ar: ['الأمر المثبت: الضمائر تتصل بنهاية الفعل ككلمة واحدة (Dámelo)', 'النهي المنفي: الضمائر تنفصل وتأتي قبل الفعل مباشرة (No me lo des)', 'إتقان هذه المفارقة المحورية بدون تردد'],
        vocabWordIds: ['w-no-lo-hagas', 'w-no-me-lo-digas', 'w-no-te-vayas', 'w-hazlo', 'w-dimelo'],
        dialogue: [
          { speaker: 'Profesor', es: 'Recuerda: "Dímelo" (afirmativo, unido al final) pero "No me lo digas" (negativo, separado delante).', en: 'Remember: "Dímelo" (affirmative, attached) but "No me lo digas" (negative, in front).', ar: 'تذكر: Dímelo (مثبت، متصل بالآخر) لكن No me lo digas (منفي، منفصل في الأمام).' }
        ],
        exercises: [
          {
            id: 'ex-b1-30-2-1',
            type: 'multiple_choice',
            prompt_es: 'Transforma al negativo: "¡Cómpratelo!" -> "¡______!"',
            prompt_en: 'Transform the command into negative:',
            prompt_ar: 'حول صيغة الأمر المثبت إلى نهي منفي: "¡Cómpratelo!" -> "¡______!"',
            options: ['¡No te lo compres!', '¡No cómpratelo!', '¡No te lo compra!', '¡No compres te lo!'],
            correctAnswer: '¡No te lo compres!',
            explanation_en: 'In negative commands, pronouns go in front: "No te lo compres".',
            explanation_ar: 'في النهي المنفي تنفصل الضمائر وتتقدم على الفعل: "No te lo compres".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 pairs of contrasting affirmative and negative commands with pronouns (e.g. Hazlo / No lo hagas).',
          prompt_ar: 'اكتب 3 أزواج من الأوامر المتقابلة (مثبت ومنفي) مع ضمائر المفعول.',
          minSentences: 3,
          sampleTarget: '— Explícaselo con calma. — No, no se lo expliques todavía hasta que tengamos todos los datos. — Llámalo ahora mismo. — Mejor no lo llames a estas horas de la noche.'
        }
      },
      {
        id: 'lesson-b1-30-3',
        unitId: 'unit-b1-30',
        lessonNumber: 3,
        title_es: 'Señales de Tráfico, Seguridad y Normas Públicas',
        title_en: 'Traffic Signs, Safety & Public Rules',
        title_ar: 'لافتات المرور والسلامة واللوائح العامة',
        cefr: 'B1',
        objectives_en: ['Understand safety signs (Prohibido fumar, No pasar, Prohibido estacionar, No tocar)', 'Use "Está prohibido + infinitivo" and "No se permite + sustantivo"', 'Formulate regulations for museums, libraries, and transport'],
        objectives_ar: ['فهم لافتات المرور والسلامة العامة (ممنوع التدخين، ممنوع الدخول)', 'استخدام Está prohibido + المصدر و No se permite', 'صياغة لوائح إرشادية للمتاحف والمكتبات ووسائل النقل'],
        vocabWordIds: ['w-prohibido', 'w-seguridad', 'w-norma', 'w-fumar', 'w-estacionar'],
        dialogue: [
          { speaker: 'Guardia', es: 'Disculpe señor, está terminantemente prohibido hacer fotos con flash dentro de esta sala del museo.', en: 'Excuse me sir, flash photography is strictly prohibited inside this museum room.', ar: 'عفواً يا سيدي، يُمنع منعاً باتاً التقاط الصور بالفلاش داخل هذه القاعة بالمتحف.' }
        ],
        exercises: [
          {
            id: 'ex-b1-30-3-1',
            type: 'multiple_choice',
            prompt_es: '"Prohibido el paso" significa:',
            prompt_en: '"Prohibido el paso" means:',
            prompt_ar: '"Prohibido el paso" تعني:',
            options: ['No entry / Do not enter', 'Pedestrian walkway', 'Free parking area', 'Emergency exit open'],
            correctAnswer: 'No entry / Do not enter',
            explanation_en: '"Prohibido el paso" indicates that entry is forbidden.',
            explanation_ar: '"Prohibido el paso" تدل على منع الدخول والعبور.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 public safety and conduct rules for a modern library or laboratory using "No + subjuntivo" and "Está prohibido".',
          prompt_ar: 'اكتب 3 لوائح إرشادية لمكتبة حديثة أو معمل علمي.',
          minSentences: 3,
          sampleTarget: 'No hables en voz alta en las salas de lectura silenciosa. Está terminantemente prohibido introducir comidas y bebidas cerca de los ordenadores. No olvides apagar el volumen de tu teléfono móvil antes de entrar.'
        }
      },
      {
        id: 'lesson-b1-30-4',
        unitId: 'unit-b1-30',
        lessonNumber: 4,
        title_es: 'El Decálogo del Buen Estudiante de Idiomas',
        title_en: 'The Ten Commandments of Great Language Learners',
        title_ar: 'الوصايا العشر لمتعلم اللغات المتفوق',
        cefr: 'B1',
        objectives_en: ['Synthesize affirmative and negative imperatives in an inspiring manifesto', 'Express habits to embrace and pitfalls to avoid', 'Commit to active, daily Spanish learning habits'],
        objectives_ar: ['دمج صيغ الأمر المثبت والنهي في بيان إرشادي ملهم', 'تحديد العادات الإيجابية الواجب تبنيها والأخطاء الواجب تجنبها', 'الالتزام بعادات يومية فعالة لتعلم الإسبانية'],
        vocabWordIds: ['w-decalogo', 'w-estudiante', 'w-habito', 'w-exito', 'w-disciplina'],
        dialogue: [
          { speaker: 'Mentor', es: 'Lee nuestro decálogo: Practica a diario, no temas a los errores, sumérgete en el idioma y nunca te compares con los demás.', en: 'Read our manifesto: Practice daily, don’t fear mistakes, immerse yourself in the language, and never compare yourself to others.', ar: 'اقرأ وصايانا: تدرب يومياً، لا تخف من الأخطاء، انغمس في اللغة، ولا تقارن نفسك بالآخرين أبداً.' }
        ],
        exercises: [
          {
            id: 'ex-b1-30-4-1',
            type: 'multiple_choice',
            prompt_es: 'En el decálogo del estudiante: "No ______ (tener) vergüenza al hablar español."',
            prompt_en: 'Choose the correct negative command for "tener":',
            prompt_ar: 'اختر تصريف النهي لفعل tener مع tú:',
            options: ['tengas', 'ten', 'tienes', 'tuvieras'],
            correctAnswer: 'tengas',
            explanation_en: 'Negative command for tú of tener is "No tengas".',
            explanation_ar: 'صيغة النهي لفعل tener مع tú هي "No tengas".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 4 inspiring guidelines for your personal Spanish study routine balancing affirmative and negative commands.',
          prompt_ar: 'اكتب 4 إرشادات ملهمة لروتين دراستك للإسبانية تجمع بين الأمر المثبت والنهي.',
          minSentences: 4,
          sampleTarget: 'Dedica al menos veinte minutos diarios al repaso de vocabulario. No tengas miedo de hablar con personas nativas en cualquier oportunidad. Escucha música y podcasts en español mientras haces deporte. No te rindas nunca ante las dificultades gramaticales, la constancia siempre vence.'
        }
      }
    ]
  }
];
