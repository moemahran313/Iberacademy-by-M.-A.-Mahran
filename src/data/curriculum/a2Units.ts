import { Unit } from '../../types';
import { A2_UNITS_PART2 } from './a2UnitsPart2';
import { A2_UNITS_PART3 } from './a2UnitsPart3';

export const A2_UNITS_PART1: Unit[] = [
  // UNIT 15: Biografías y Vida Pasada (Pretérito Indefinido Irregular)
  {
    id: 'unit-a2-15',
    level: 'A2',
    unitNumber: 15,
    title_es: 'Biografías y Vida Pasada',
    title_en: 'Biographies & Past Life',
    title_ar: 'السير الذاتية وحياة الماضي',
    description_en: 'Master irregular preterite verbs (tuve, estuve, puse, supe, hice, dije, vine) and narrate historical biographies.',
    description_ar: 'إتقان الأفعال الشاذة في الماضي البسيط (tuve, estuve, puse, supe, hice, dije, vine) وسرد السير الذاتية التاريخية.',
    lessons: [
      {
        id: 'lesson-a2-15-1',
        unitId: 'unit-a2-15',
        lessonNumber: 1,
        title_es: 'Indefinidos con Raíz Fuerte (U-Stem & I-Stem)',
        title_en: 'Irregular Preterite Stems (U & I Stems)',
        title_ar: 'جذور الماضي الشاذة القوية (U و I)',
        cefr: 'A2',
        objectives_en: ['Master U-stem verbs (tener->tuv-, estar->estuv-, poder->pud-, poner->pus-, saber->sup-)', 'Apply irregular preterite endings (-e, -iste, -o, -imos, -isteis, -ieron)', 'Narrate past accomplishments'],
        objectives_ar: ['إتقان الأفعال ذات جذر U', 'تطبيق نهايات الماضي الشاذ بدون نبرة', 'سرد الإنجازات والأحداث السابقة'],
        vocabWordIds: ['w-tener', 'w-estar', 'w-poner', 'w-saber', 'w-poder'],
        dialogue: [
          { speaker: 'Profesor', es: '¿Qué supiste de las noticias de ayer?', en: 'What did you find out from yesterday’s news?', ar: 'ماذا علمت من أخبار الأمس؟' },
          { speaker: 'Estudiante', es: 'Supe que mi escritor favorito tuvo un gran éxito con su nueva novela histórica.', en: 'I found out that my favorite writer had great success with his new historical novel.', ar: 'علمت أن كاتبي المفضل حقق نجاحاً كبيراً بروايته التاريخية الجديدة.' }
        ],
        exercises: [
          {
            id: 'ex-a2-15-1-1',
            type: 'multiple_choice',
            prompt_es: 'Ayer nosotros no ______ (poder) terminar el informe.',
            prompt_en: 'Choose the correct preterite of PODER for nosotros:',
            prompt_ar: 'اختر تصريف الماضي لفعل poder مع nosotros:',
            options: ['pudimos', 'podemos', 'pudieron', 'podimos'],
            correctAnswer: 'pudimos',
            explanation_en: 'Poder becomes pud- + imos = pudimos.',
            explanation_ar: 'جذر poder في الماضي هو pud- + imos = pudimos.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences about challenges you had in the past using tuve, pude, and supe.',
          prompt_ar: 'اكتب 3 جمل عن تحديات واجهتها في الماضي باستخدام tuve و pude و supe.',
          minSentences: 3,
          sampleTarget: 'El mes pasado tuve mucho trabajo pero pude terminar todos mis exámenes. Cuando supe mis excelentes notas me sentí muy feliz y aliviado.'
        }
      },
      {
        id: 'lesson-a2-15-2',
        unitId: 'unit-a2-15',
        lessonNumber: 2,
        title_es: 'Hacer, Decir, Traer y Verbos en -J',
        title_en: 'Hacer, Decir, Traer & J-Stem Preterites',
        title_ar: 'أفعال Hacer و Decir و Traer وجذور حرف J',
        cefr: 'A2',
        objectives_en: ['Conjugate hacer (hice, hiciste, hizo, hicimos, hicisteis, hicieron)', 'Conjugate decir and traer (dije/dijo/dijeron, traje/trajo/trajeron)', 'Understand the 3rd person plural -eron ending'],
        objectives_ar: ['تصريف فعل hacer مع تغيير c إلى z في hizo', 'تصريف decir و traer وحذف حرف i في صيغة الجمع dijeron', 'استخدام هذه الأفعال في الحوارات اليومية'],
        vocabWordIds: ['w-hacer', 'w-decir', 'w-traer', 'w-conducir', 'w-traducir'],
        dialogue: [
          { speaker: 'Mateo', es: '¿Qué te dijo el médico en la consulta?', en: 'What did the doctor tell you in the consultation?', ar: 'ماذا قال لك الطبيب في الكشف؟' },
          { speaker: 'Sara', es: 'Me dijo que no era nada grave y me trajo una receta para el dolor.', en: 'He told me it was nothing serious and brought me a prescription for the pain.', ar: 'أخبرني أنه لا شيء خطير وأحضر لي وصفة طبية للألم.' }
        ],
        exercises: [
          {
            id: 'ex-a2-15-2-1',
            type: 'multiple_choice',
            prompt_es: 'Ellos ______ (decir) toda la verdad al juez.',
            prompt_en: 'Choose the correct preterite of DECIR for ellos:',
            prompt_ar: 'اختر تصريف فعل decir في الماضي مع ellos:',
            options: ['dijeron', 'dijieron', 'decieron', 'dijaron'],
            correctAnswer: 'dijeron',
            explanation_en: 'J-stem verbs drop the "i" in 3rd person plural: dijeron (not dijieron).',
            explanation_ar: 'أفعال جذر J تحذف حرف i في جمع الغائب: dijeron.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences telling what someone said, brought, or did for you recently.',
          prompt_ar: 'اكتب 3 جمل تخبر فيها عما قاله أو أحضره أو فعله شخص لك مؤخراً.',
          minSentences: 3,
          sampleTarget: 'Mi amigo me trajo un regalo hermoso de su viaje a Colombia. Me dijo muchas anécdotas divertidas de sus aventuras. Hicimos una cena especial para celebrar.'
        }
      },
      {
        id: 'lesson-a2-15-3',
        unitId: 'unit-a2-15',
        lessonNumber: 3,
        title_es: 'Biografía Histórica: Frida Kahlo y García Márquez',
        title_en: 'Historical Biographies: Hispanic Icons',
        title_ar: 'السير التاريخية: رموز الثقافة الإسبانية واللاتينية',
        cefr: 'A2',
        objectives_en: ['Read and understand historical biographical texts', 'Use date markers (nació en..., murió en..., a los 20 años...)', 'Connect historical milestones chronologically'],
        objectives_ar: ['قراءة وفهم نصوص السير الذاتية التاريخية', 'استخدام علامات التواريخ (ولد في، توفي في، في سن العشرين)', 'ربط المحطات التاريخية ترتيباً زمنياً'],
        vocabWordIds: ['w-nacer', 'w-morir', 'w-pintor', 'w-escritor', 'w-premio'],
        dialogue: [
          { speaker: 'Guía', es: 'Gabriel García Márquez nació en Colombia en 1927. Escribió "Cien años de soledad" y ganó el Premio Nobel de Literatura en 1982.', en: 'Gabriel García Márquez was born in Colombia in 1927...', ar: 'ولد غابرييل غارسيا ماركيز في كولومبيا عام 1927 وكتب مئة عام من العزلة...' }
        ],
        exercises: [
          {
            id: 'ex-a2-15-3-1',
            type: 'multiple_choice',
            prompt_es: 'Frida Kahlo ______ (nacer) en Coyoacán, México, en 1907.',
            prompt_en: 'Choose the preterite of NACER for Frida (ella):',
            prompt_ar: 'اختر تصريف فعل nacer في الماضي مع هي:',
            options: ['nació', 'nace', 'nacía', 'nacido'],
            correctAnswer: 'nació',
            explanation_en: 'Third person singular preterite of nacer is "nació".',
            explanation_ar: 'تصريف المفرد الغائب لفعل nacer في الماضي هو "nació".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a short 3-sentence biography of an admired historical or family figure with dates.',
          prompt_ar: 'اكتب سيرة ذاتية قصيرة من 3 جمل لشخصية تاريخية أو عائلية مع ذكر التواريخ.',
          minSentences: 3,
          sampleTarget: 'Mi abuelo nació en un pequeño pueblo en 1940. Trabajó como maestro de escuela durante cuarenta años y ayudó a cientos de niños. Vivió una vida llena de generosidad.'
        }
      },
      {
        id: 'lesson-a2-15-4',
        unitId: 'unit-a2-15',
        lessonNumber: 4,
        title_es: 'Conectores Temporales para Narrar el Pasado',
        title_en: 'Time Connectors for Past Narratives',
        title_ar: 'روابط السرد الزمني للقصص والماضي',
        cefr: 'A2',
        objectives_en: ['Use "al principio", "luego", "más tarde", "después", "finalmente", "de repente"', 'Structure narrative paragraphs with smooth flow', 'Signal surprising events with "de repente"'],
        objectives_ar: ['استخدام الروابط في البداية، ثم، لاحقاً، بعد ذلك، وأخيراً، وفجأة', 'هيكلة الفقرات السردية بتدفق متناغم', 'التعبير عن المفاجآت باستخدام de repente'],
        vocabWordIds: ['w-principio', 'w-despues', 'w-finalmente', 'w-repente', 'w-entonces'],
        dialogue: [
          { speaker: 'Marcos', es: 'Al principio el viaje fue tranquilo. Pero de repente empezó a llover torrencialmente y tuvimos que parar.', en: 'At first the trip was calm. But suddenly it began to rain heavily and we had to stop.', ar: 'في البداية كانت الرحلة هادئة، لكن فجأة بدأت الأمطار تهطل بغزارة واضطررنا للتوقف.' }
        ],
        exercises: [
          {
            id: 'ex-a2-15-4-1',
            type: 'multiple_choice',
            prompt_es: 'Para indicar un suceso inesperado que interrumpe la calma usamos:',
            prompt_en: 'To indicate an unexpected sudden event, we use:',
            prompt_ar: 'للدلالة على حدث مفاجئ وغير متوقع نستخدم:',
            options: ['De repente', 'Al principio', 'Todos los días', 'Siempre'],
            correctAnswer: 'De repente',
            explanation_en: '"De repente" means suddenly / all of a sudden.',
            explanation_ar: '"De repente" تعني فجأة / على حين غرة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence past narrative using "Al principio", "De repente", and "Finalmente".',
          prompt_ar: 'اكتب قصة من 3 جمل في الماضي مستخدماً Al principio و De repente و Finalmente.',
          minSentences: 3,
          sampleTarget: 'Al principio buscamos el hotel por todo el centro histórico. De repente un taxista muy amable nos explicó el camino exacto. Finalmente llegamos a salvo y descansamos.'
        }
      }
    ]
  },

  // UNIT 16: Recuerdos e Infancia (Pretérito Imperfecto)
  {
    id: 'unit-a2-16',
    level: 'A2',
    unitNumber: 16,
    title_es: 'Recuerdos e Infancia: El Imperfecto',
    title_en: 'Memories & Childhood: The Imperfect',
    title_ar: 'ذكريات الطفولة: الماضي المستمر Imperfecto',
    description_en: 'Describe childhood habits, past routines, and nostalgia using the regular and irregular Pretérito Imperfecto (iba, era, veía).',
    description_ar: 'وصف عادات الطفولة، الروتين القديم، والمشاعر الحنينية باستخدام زمن الماضي المستمر Imperfecto وتصريفاته الشاذة الثلاثة فقط.',
    lessons: [
      {
        id: 'lesson-a2-16-1',
        unitId: 'unit-a2-16',
        lessonNumber: 1,
        title_es: 'Formación del Pretérito Imperfecto (-aba / -ía)',
        title_en: 'Forming the Imperfect Tense (-aba / -ía)',
        title_ar: 'صياغة زمن الماضي المستمر (-aba / -ía)',
        cefr: 'A2',
        objectives_en: ['Conjugate -ar verbs with -aba (hablaba, hablabas, hablábamos)', 'Conjugate -er/-ir verbs with -ía (comía, vivía, vivíamos)', 'Describe background scenes and continuous past habits'],
        objectives_ar: ['تصريف أفعال -ar بنهايات -aba', 'تصريف أفعال -er/-ir بنهايات -ía مع نبرة دائمة', 'وصف المشاهد الخلفية والعادات المستمرة في الماضي'],
        vocabWordIds: ['w-infancia', 'w-nino', 'w-jugar', 'w-vivir', 'w-siempre'],
        grammarTopicId: 'g-imperfect-vs-preterite',
        dialogue: [
          { speaker: 'Abuela', es: 'Cuando yo era pequeña, no teníamos televisión ni teléfonos móviles. Jugábamos en la calle todo el día.', en: 'When I was little, we didn’t have TV or mobile phones. We used to play in the street all day.', ar: 'حين كنت صغيرة، لم يكن لدينا تلفاز ولا هواتف محمولة. كنا نلعب في الشارع طوال اليوم.' }
        ],
        exercises: [
          {
            id: 'ex-a2-16-1-1',
            type: 'multiple_choice',
            prompt_es: 'De niño, Carlos siempre ______ (jugar) en el parque del barrio.',
            prompt_en: 'Choose the imperfect form of JUGAR for Carlos:',
            prompt_ar: 'اختر تصريف الماضي المستمر لفعل jugar مع كارلوس:',
            options: ['jugaba', 'jugó', 'juega', 'jugaría'],
            correctAnswer: 'jugaba',
            explanation_en: 'Habitual past actions use the imperfect: "jugaba".',
            explanation_ar: 'العادات المتكررة في الماضي تأخذ زمن Imperfecto: "jugaba".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences describing what you used to do during your childhood summers using the imperfect.',
          prompt_ar: 'اكتب 3 جمل تصف فيها ما اعتدت فعله في عطلات صيف طفولتك باستخدام Imperfecto.',
          minSentences: 3,
          sampleTarget: 'Cuando era niño pasaba los veranos en la playa con mis primos. Nadábamos todos los días en el mar y comíamos helados de fresa. La vida era muy sencilla y divertida.'
        }
      },
      {
        id: 'lesson-a2-16-2',
        unitId: 'unit-a2-16',
        lessonNumber: 2,
        title_es: 'Los 3 Únicos Verbos Irregulares: SER, IR, VER',
        title_en: 'The Only 3 Irregular Verbs: SER, IR, VER',
        title_ar: 'الأفعال الشاذة الثلاثة الوحيدة: SER و IR و VER',
        cefr: 'A2',
        objectives_en: ['Conjugate SER (era, eras, era, éramos, erais, eran)', 'Conjugate IR (iba, ibas, iba, íbamos, ibais, iban)', 'Conjugate VER (veía, veías, veía, veíamos, veíais, veían)'],
        objectives_ar: ['إتقان تصريف الأفعال الشاذة الثلاثة الوحيدة في زمن Imperfecto في كل اللغة الإسبانية', 'استخدامها في وصف الماضي والهيئة القديمة', 'التحدث عن الزيارات المتكررة في الماضي'],
        vocabWordIds: ['w-era', 'w-iba', 'w-veia', 'w-costumbre', 'w-tiempo'],
        dialogue: [
          { speaker: 'Lucas', es: 'Mi abuelo era muy alto y sabio. Todos los domingos iba al campo y veía el amanecer con alegría.', en: 'My grandfather was very tall and wise. Every Sunday he used to go to the countryside and watch the sunrise with joy.', ar: 'كان جدي طويلاً وحكيماً جداً. في كل يوم أحد كان يذهب إلى الريف ويشاهد شروق الشمس بفرح.' }
        ],
        exercises: [
          {
            id: 'ex-a2-16-2-1',
            type: 'multiple_choice',
            prompt_es: 'Nosotros ______ (ir) a la biblioteca todos los viernes después de clase.',
            prompt_en: 'Choose the imperfect form of IR for nosotros:',
            prompt_ar: 'اختر تصريف IR في الماضي المستمر مع nosotros:',
            options: ['íbamos', 'fuimos', 'vamos', 'iremos'],
            correctAnswer: 'íbamos',
            explanation_en: 'The imperfect of IR for nosotros is "íbamos" (with an accent on the í).',
            explanation_ar: 'تصريف فعل IR مع nosotros في الماضي المستمر هو "íbamos" مع نبرة على حرف i.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences using "era", "iba", and "veía" to describe your life 5 years ago.',
          prompt_ar: 'اكتب 3 جمل باستخدام era و iba و veía لوصف حياتك قبل 5 سنوات.',
          minSentences: 3,
          sampleTarget: 'Hace cinco años yo era estudiante universitario. Iba a la facultad todas las mañanas en bicicleta. Por las tardes veía documentales de historia para aprender.'
        }
      },
      {
        id: 'lesson-a2-16-3',
        unitId: 'unit-a2-16',
        lessonNumber: 3,
        title_es: 'Descripciones de Personas y Lugares en el Pasado',
        title_en: 'Past Descriptions of People & Places',
        title_ar: 'وصف الأشخاص والأماكن في الزمن الماضي',
        cefr: 'A2',
        objectives_en: ['Describe how a city or house was in the past (Había, Tenía, Era)', 'Describe old physical features and personalities', 'Contrast past states with the present'],
        objectives_ar: ['وصف كيف كانت المدينة أو البيت في الماضي', 'وصف الملامح والطباع القديمة', 'المقارنة بين الماضي والحاضر بوضوح'],
        vocabWordIds: ['w-habia', 'w-antiguo', 'w-moderno', 'w-antes', 'w-ahora'],
        dialogue: [
          { speaker: 'Clara', es: 'Antes, esta ciudad era muy tranquila y había muchos árboles grandes. Ahora hay mucho tráfico.', en: 'Before, this city was very quiet and there were many big trees. Now there is a lot of traffic.', ar: 'في السابق، كانت هذه المدينة هادئة جداً وكان هناك العديد من الأشجار الضخمة. أما الآن فهناك ازدحام مروري كبير.' }
        ],
        exercises: [
          {
            id: 'ex-a2-16-3-1',
            type: 'multiple_choice',
            prompt_es: 'En mi antiguo colegio ______ (haber) un patio enorme con flores.',
            prompt_en: 'Choose the imperfect form of HABER for past existence:',
            prompt_ar: 'اختر صيغة الماضي المستمر لفعل haber للدلالة على الوجود:',
            options: ['había', 'hubo', 'hay', 'habrá'],
            correctAnswer: 'había',
            explanation_en: '"Había" describes ongoing past existence / setting the scene.',
            explanation_ar: '"Había" تصف الوجود الممتد وتأثيث المشهد في الماضي.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Contrast your hometown or school in the past with the present using "Antes era/había..." and "Ahora es/hay...".',
          prompt_ar: 'قارن بين مدينتك في الماضي والحاضر باستخدام Antes era/había و Ahora es/hay في 3 جمل.',
          minSentences: 3,
          sampleTarget: 'Antes mi barrio era muy tranquilo y había pocos coches. La gente se conocía bien y los niños jugaban en la calle. Ahora hay tiendas modernas y avenidas amplias.'
        }
      },
      {
        id: 'lesson-a2-16-4',
        unitId: 'unit-a2-16',
        lessonNumber: 4,
        title_es: 'Soler + Infinitivo en el Pasado (Solía)',
        title_en: 'Soler + Infinitive in the Past (Solía)',
        title_ar: 'فعل Soler + المصدر في الماضي (كنت أعتاد على)',
        cefr: 'A2',
        objectives_en: ['Conjugate soler in imperfect (solía, solías, solía, solíamos, solíais, solían)', 'Express discontinued past habits', 'Compare past and current lifestyles'],
        objectives_ar: ['تصريف فعل soler في الماضي المستمر', 'التعبير عن العادات السابقة المنقطعة (كنت أعتاد أن...)', 'المقارنة بين أنماط الحياة السابقة والحالية'],
        vocabWordIds: ['w-soler', 'w-habito', 'w-costumbre', 'w-cambiar', 'w-vida'],
        dialogue: [
          { speaker: 'David', es: '¿Qué solías hacer los domingos por la tarde cuando vivías en el pueblo?', en: 'What did you used to do on Sunday afternoons when you lived in the village?', ar: 'ماذا كنت تعتاد أن تفعل في ظهيرة أيام الأحد حين كنت تعيش في القرية؟' },
          { speaker: 'Nuria', es: 'Solía pasear por el bosque con mis perros y solíamos merendar chocolate caliente.', en: 'I used to walk through the woods with my dogs, and we used to have hot chocolate for snack.', ar: 'كنت أعتاد التنزه في الغابة مع كلابي، وكنا نعتاد تناول الشوكولاتة الساخنة كوجبة خفيفة.' }
        ],
        exercises: [
          {
            id: 'ex-a2-16-4-1',
            type: 'multiple_choice',
            prompt_es: 'De joven yo ______ (soler) leer hasta altas horas de la madrugada.',
            prompt_en: 'Choose the imperfect form of SOLER for "yo":',
            prompt_ar: 'اختر تصريف soler في الماضي المستمر مع yo:',
            options: ['solía', 'solí', 'suelo', 'solería'],
            correctAnswer: 'solía',
            explanation_en: '"Solía + infinitive" translates to "I used to [verb]".',
            explanation_ar: '"Solía + المصدر" تترجم إلى "كنت أعتاد أن...".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences detailing 3 things you used to do regularly in the past using "Solía + infinitivo".',
          prompt_ar: 'اكتب 3 جمل توضح فيها 3 أشياء اعتدت فعلها بانتظام في الماضي باستخدام Solía + المصدر.',
          minSentences: 3,
          sampleTarget: 'Solía levantarme muy tarde los fines de semana. Solía viajar en bicicleta a todos lados. También solía escribir poesías en mi cuaderno personal.'
        }
      }
    ]
  },

  // UNIT 17: Contar Historias: Indefinido vs Imperfecto
  {
    id: 'unit-a2-17',
    level: 'A2',
    unitNumber: 17,
    title_es: 'Contar Historias: Indefinido vs Imperfecto',
    title_en: 'Storytelling: Preterite vs Imperfect',
    title_ar: 'سرد القصص: المقارنة بين Indefinido و Imperfecto',
    description_en: 'Master the classic past tense contrast: setting the scene (Imperfect) vs advancing the plot actions (Preterite).',
    description_ar: 'إتقان التمييز الجوهري بين الماضي التام والمستمر: وصف المشهد والخلفية (Imperfecto) مقابل أحداث القصة المحددة (Indefinido).',
    lessons: [
      {
        id: 'lesson-a2-17-1',
        unitId: 'unit-a2-17',
        lessonNumber: 1,
        title_es: 'La Regla de Oro: Acción Puntual vs Escenario de Fondo',
        title_en: 'Golden Rule: Background vs Main Action',
        title_ar: 'القاعدة الذهبية: المشهد الخلفي مقابل الحدث المكتمل',
        cefr: 'A2',
        objectives_en: ['Identify background conditions (weather, age, time, ongoing action = Imperfect)', 'Identify specific completed events (Preterite)', 'Combine both tenses in single narrative sentences'],
        objectives_ar: ['تمييز الظروف الخلفية (الطقس، العمر، الوقت، الفعل المستمر = Imperfecto)', 'تمييز الأحداث المكتملة المحددة (Indefinido)', 'دمج الزمنين في جملة سردية واحدة متناسقة'],
        vocabWordIds: ['w-mientras', 'w-cuando', 'w-tiempo', 'w-lluvia', 'w-ocurrir'],
        grammarTopicId: 'g-imperfect-vs-preterite',
        dialogue: [
          { speaker: 'Narrador', es: 'Eran las diez de la noche y llovía suavemente (Imperfecto) cuando de repente alguien llamó a la puerta (Indefinido).', en: 'It was 10 PM and it was raining softly when suddenly someone knocked on the door.', ar: 'كانت الساعة العاشرة ليلاً وكانت الأمطار تهطل بهدوء حين طرق أحدهم الباب فجأة.' }
        ],
        exercises: [
          {
            id: 'ex-a2-17-1-1',
            type: 'multiple_choice',
            prompt_es: 'Mientras yo ______ (estudiar), mi hermano ______ (llegar) a casa.',
            prompt_en: 'Choose the correct combination (Ongoing background + Interrupting event):',
            prompt_ar: 'اختر التركيبة الصحيحة (فعل مستمر في الخلفية + حدث مفاجئ قاطع):',
            options: ['estudiaba / llegó', 'estudié / llegaba', 'estudiaba / llegaba', 'estudié / llegó'],
            correctAnswer: 'estudiaba / llegó',
            explanation_en: 'Ongoing action uses Imperfect (estudiaba); the interruption uses Preterite (llegó).',
            explanation_ar: 'الفعل الممتد في الخلفية يأخذ Imperfecto (estudiaba)، والحدث القاطع يأخذ Indefinido (llegó).'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences setting a past scene and describing an action that happened using "Mientras... cuando...".',
          prompt_ar: 'اكتب 3 جمل تؤثث فيها مشهداً في الماضي وتصف حدثاً قاطعاً مستخدماً Mientras و cuando.',
          minSentences: 3,
          sampleTarget: 'Hacía mucho sol y los pájaros cantaban en los árboles. Mientras caminaba tranquilamente por el parque, me encontré con un viejo amigo de la escuela. Nos abrazamos con alegría.'
        }
      },
      {
        id: 'lesson-a2-17-2',
        unitId: 'unit-a2-17',
        lessonNumber: 2,
        title_es: 'Verbos que Cambian de Significado en el Pasado',
        title_en: 'Verbs with Meaning Changes in the Past',
        title_ar: 'أفعال يتغير معناها الدقيق باختلاف زمن الماضي',
        cefr: 'A2',
        objectives_en: ['Distinguish Conocer: Conocía (I knew) vs Conocí (I met for the first time)', 'Distinguish Saber: Sabía (I knew info) vs Supe (I found out)', 'Distinguish Querer / No querer in preterite vs imperfect'],
        objectives_ar: ['فهم تغير معنى Conocer: كنت أعرف مقابل تعرفت عليه لأول مرة', 'فهم Saber: كنت أعلم معلومة مقابل علمت واكتشفت', 'فهم Querer و No querer في الماضي'],
        vocabWordIds: ['w-conocer', 'w-saber', 'w-querer', 'w-poder', 'w-significado'],
        dialogue: [
          { speaker: 'Elena', es: 'Yo ya conocía Madrid, pero el año pasado conocí a mi esposo en la Plaza Mayor.', en: 'I already knew Madrid, but last year I met my husband in Plaza Mayor.', ar: 'كنت أعرف مدريد مسبقاً، لكن في العام الماضي تعرفت على زوجي في الساحة الكبرى.' }
        ],
        exercises: [
          {
            id: 'ex-a2-17-2-1',
            type: 'multiple_choice',
            prompt_es: '"Ayer supe la verdad" significa en inglés:',
            prompt_en: '"Ayer supe la verdad" means in English:',
            prompt_ar: '"Ayer supe la verdad" تعني:',
            options: ['Yesterday I found out the truth', 'Yesterday I always knew the truth', 'Yesterday I forgot the truth', 'Yesterday I hid the truth'],
            correctAnswer: 'Yesterday I found out the truth',
            explanation_en: 'Saber in the preterite (supe) means "found out / discovered".',
            explanation_ar: 'فعل Saber في الماضي البسيط (supe) يعني "اكتشفت / علمت بالخبر للتو".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences using "conocí", "supe", and "quise" to describe recent personal discoveries.',
          prompt_ar: 'اكتب 3 جمل باستخدام conocí و supe و quise لوصف اكتشافات وتجارب شخصية حديثة.',
          minSentences: 3,
          sampleTarget: 'El mes pasado conocí a personas increíbles en mi curso de idiomas. Ayer supe que gané una beca de estudios. Siempre quise viajar a España y ahora puedo hacerlo.'
        }
      },
      {
        id: 'lesson-a2-17-3',
        unitId: 'unit-a2-17',
        lessonNumber: 3,
        title_es: 'Relatar una Anécdota Inesperada',
        title_en: 'Telling an Unexpected Anecdote',
        title_ar: 'رواية طرفة أو موقف غير متوقع',
        cefr: 'A2',
        objectives_en: ['Narrate a funny or surprising travel anecdote', 'Use suspense phrases (no te imaginas lo que pasó...)', 'Conclude with reactions and lessons learned'],
        objectives_ar: ['سرد موقف طريف أو مفاجئ أثناء السفر', 'استخدام عبارات التشويق (لن تتخيل ما حدث...)', 'اختتام القصة برد الفعل والعبرة المستفادة'],
        vocabWordIds: ['w-anecdota', 'w-gracioso', 'w-sorpresa', 'w-viaje', 'w-reir'],
        dialogue: [
          { speaker: 'Raúl', es: 'El verano pasado estaba en Barcelona esperando el autobús. De repente subí a un vehículo pensando que era el transporte público, ¡y era el autobús privado de un equipo de fútbol!', en: 'Last summer I was in Barcelona waiting for the bus. Suddenly I got on thinking it was public transport, and it was a private football team bus!', ar: 'في الصيف الماضي كنت في برشلونة أنتظر الحافلة. وفجأة صعدت إلى حافلة ظاناً أنها عامة، فإذا بها حافلة خاصة لفريق كرة قدم!' }
        ],
        exercises: [
          {
            id: 'ex-a2-17-3-1',
            type: 'multiple_choice',
            prompt_es: 'Para introducir una anécdota emocionante decimos:',
            prompt_en: 'To introduce an exciting anecdote, we say:',
            prompt_ar: 'لتقديم قصة أو طرفة مشوقة نقول:',
            options: ['No te vas a creer lo que me pasó...', 'Buenos días señor', 'Hasta luego gracias', 'Tengo hambre'],
            correctAnswer: 'No te vas a creer lo que me pasó...',
            explanation_en: '"No te vas a creer lo que me pasó..." is a classic conversational hook meaning "You won\'t believe what happened to me...".',
            explanation_ar: '"No te vas a creer lo que me pasó..." عبارة كلاسيكية لجذب انتباه المستمع بمعنى "لن تصدق ما حدث لي...".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a short 3-sentence anecdote about a surprising event that happened to you while traveling or studying.',
          prompt_ar: 'اكتب طرفة قصيرة من 3 جمل عن موقف مفاجئ حدث لك أثناء السفر أو الدراسة.',
          minSentences: 3,
          sampleTarget: 'Un día estaba caminando por el centro cuando perdí el mapa de la ciudad. Pregunté a un anciano muy amable y resultó ser el autor de mi libro favorito. Charlamos durante una hora y nos tomamos un café.'
        }
      },
      {
        id: 'lesson-a2-17-4',
        unitId: 'unit-a2-17',
        lessonNumber: 4,
        title_es: 'Taller de Escritura Narrativa: Un Día Inolvidable',
        title_en: 'Narrative Workshop: An Unforgettable Day',
        title_ar: 'ورشة الكتابة السردية: يوم لا يُنسى',
        cefr: 'A2',
        objectives_en: ['Write an extended narrative combining Imperfect (setting/feelings) and Preterite (actions)', 'Use rich temporal connectors', 'Produce a polished Spanish story'],
        objectives_ar: ['كتابة نص سردي متكامل يدمج بين الوصف والأحداث', 'استخدام روابط زمنية متنوعة ومتقنة', 'إنتاج قصة إسبانية مصقولة وأصيلة'],
        vocabWordIds: ['w-inolvidable', 'w-emocion', 'w-recordar', 'w-experiencia', 'w-final'],
        dialogue: [
          { speaker: 'Tutor', es: 'Excelente estructura. Has combinado perfectamente las descripciones en imperfecto con los momentos clave en pretérito.', en: 'Excellent structure. You combined imperfect descriptions with key preterite moments perfectly.', ar: 'بنية ممتازة. لقد وفقت تماماً بين الوصف بالماضي المستمر والأحداث المفصلية بالماضي التام.' }
        ],
        exercises: [
          {
            id: 'ex-a2-17-4-1',
            type: 'multiple_choice',
            prompt_es: 'En una narración, para describir los sentimientos internos de un personaje usamos:',
            prompt_en: 'In a past story, to describe a character\'s ongoing internal state, we use:',
            prompt_ar: 'في القصة السردية، لوصف المشاعر الداخلية المستمرة للشخصية نستخدم:',
            options: ['El Pretérito Imperfecto (estaba nervioso / se sentía feliz)', 'El Futuro Simple', 'El Imperativo', 'El Infinitivo solo'],
            correctAnswer: 'El Pretérito Imperfecto (estaba nervioso / se sentía feliz)',
            explanation_en: 'Internal states, thoughts, and feelings in past narratives are expressed with the imperfect.',
            explanation_ar: 'الحالات الداخلية والأفكار والمشاعر في السرد يُعبر عنها بـ Imperfecto.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write your 4-sentence story titled "Un Día Inolvidable" describing where you were, what was happening, what occurred, and why you remember it.',
          prompt_ar: 'اكتب قصتك في 4 جمل بعنوان "يوم لا يُنسى" تصف فيها أين كنت، وماذا كان يحدث، وما وقع تحديداً، وسبب تذكرك له.',
          minSentences: 4,
          sampleTarget: 'Era una hermosa mañana de primavera y el sol brillaba en el cielo. Yo caminaba por la playa mientras escuchaba las olas del mar. De repente encontré una botella con un mensaje antiguo en su interior. Fue un momento mágico que nunca olvidaré en mi vida.'
        }
      }
    ]
  },

  // UNIT 18: Experiencias de Vida: Pretérito Perfecto
  {
    id: 'unit-a2-18',
    level: 'A2',
    unitNumber: 18,
    title_es: 'Experiencias de Vida: Pretérito Perfecto',
    title_en: 'Life Experiences: Present Perfect',
    title_ar: 'تجارب الحياة: الماضي القريب التام Pretérito Perfecto',
    description_en: 'Master talking about life experiences (He viajado, ¿Alguna vez has comido...?), regular and irregular participles, and time markers (ya, todavía no, nunca).',
    description_ar: 'إتقان الحديث عن تجارب الحياة والخبرات السابقة، تصريف اسم المفعول المنتظم والشاذ، والظروف الزمنية (ya, todavía no, nunca, alguna vez).',
    lessons: [
      {
        id: 'lesson-a2-18-1',
        unitId: 'unit-a2-18',
        lessonNumber: 1,
        title_es: 'Formación con HABER + Participio Pasado',
        title_en: 'Formation with HABER + Past Participle',
        title_ar: 'صياغة الزمن المساعد HABER + اسم المفعول',
        cefr: 'A2',
        objectives_en: ['Conjugate auxiliary HABER (he, has, ha, hemos, habéis, han)', 'Form regular past participles (-ado for -ar, -ido for -er/-ir)', 'Understand invariable participle ending in compound tenses'],
        objectives_ar: ['تصريف الفعل المساعد HABER في المضارع', 'صياغة اسم المفعول المنتظم (-ado و -ido)', 'معرفة أن اسم المفعول لا يتغير تذكيراً وتأنيثاً مع فعل haber'],
        vocabWordIds: ['w-haber', 'w-viajado', 'w-comido', 'w-vivido', 'w-experiencia'],
        grammarTopicId: 'g-present-perfect',
        dialogue: [
          { speaker: 'Mateo', es: '¿Has viajado alguna vez a España?', en: 'Have you ever traveled to Spain?', ar: 'هل سافرت في أي وقت إلى إسبانيا؟' },
          { speaker: 'Lucía', es: 'Sí, he visitado Madrid y Barcelona dos veces. Ha sido una experiencia inolvidable.', en: 'Yes, I have visited Madrid and Barcelona twice. It has been an unforgettable experience.', ar: 'نعم، زرت مدريد وبرشلونة مرتين. لقد كانت تجربة لا تُنسى.' }
        ],
        exercises: [
          {
            id: 'ex-a2-18-1-1',
            type: 'multiple_choice',
            prompt_es: 'Nosotros ______ (aprender) mucho vocabulario nuevo hoy.',
            prompt_en: 'Choose the correct form of Pretérito Perfecto for nosotros:',
            prompt_ar: 'اختر الصيغة الصحيحة لـ Pretérito Perfecto مع nosotros:',
            options: ['hemos aprendido', 'han aprendido', 'ha aprendido', 'he aprendido'],
            correctAnswer: 'hemos aprendido',
            explanation_en: 'Nosotros takes "hemos" + participle "aprendido" = hemos aprendido.',
            explanation_ar: 'مع nosotros نستخدم "hemos" + اسم المفعول "aprendido" = hemos aprendido.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences stating 3 positive things you have done or accomplished this week using "He + participio".',
          prompt_ar: 'اكتب 3 جمل تذكر فيها 3 أشياء إيجابية أنجزتها هذا الأسبوع باستخدام He + اسم المفعول.',
          minSentences: 3,
          sampleTarget: 'Esta semana he practicado español todos los días con entusiasmo. He leído tres artículos interesantes en el periódico. También he preparado recetas saludables para cenar.'
        }
      },
      {
        id: 'lesson-a2-18-2',
        unitId: 'unit-a2-18',
        lessonNumber: 2,
        title_es: 'Participios Irregulares Indispensables',
        title_en: 'Essential Irregular Past Participles',
        title_ar: 'أسماء المفعول الشاذة التي لا غنى عنها',
        cefr: 'A2',
        objectives_en: ['Master irregular participles: hecho (hacer), dicho (decir), escrito (escribir), visto (ver), abierto (abrir), puesto (poner), vuelto (volver), muerto (morir)', 'Avoid regularizing irregular forms', 'Use in realistic life experience questions'],
        objectives_ar: ['إتقان أسماء المفعول الشاذة (hecho, dicho, escrito, visto, abierto, puesto, vuelto, muerto)', 'تجنب الوقوع في الأخطاء الشائعة', 'طرح أسئلة عن التجارب الحياتية'],
        vocabWordIds: ['w-hecho', 'w-dicho', 'w-escrito', 'w-visto', 'w-abierto'],
        dialogue: [
          { speaker: 'Carmen', es: '¿Has visto la última película del director mexicano?', en: 'Have you seen the Mexican director’s latest movie?', ar: 'هل شاهدت أحدث أفلام المخرج المكسيكي؟' },
          { speaker: 'Diego', es: 'Sí, la he visto este fin de semana y me ha parecido una obra de arte. Además he escrito una reseña en mi blog.', en: 'Yes, I saw it this weekend and thought it was a work of art. I also wrote a review on my blog.', ar: 'نعم، شاهدته في عطلة نهاية هذا الأسبوع ورأيته عملاً فنياً. كما كتبت مراجعة عنه في مدونتي.' }
        ],
        exercises: [
          {
            id: 'ex-a2-18-2-1',
            type: 'multiple_choice',
            prompt_es: 'El participio correcto de "abrir" y "poner" es:',
            prompt_en: 'The correct past participles of "abrir" and "poner" are:',
            prompt_ar: 'اسم المفعول الصحيح لفعل abrir و poner هو:',
            options: ['abierto / puesto', 'abrido / ponido', 'abierto / ponido', 'abrido / puesto'],
            correctAnswer: 'abierto / puesto',
            explanation_en: 'Abrir becomes abierto, and poner becomes puesto.',
            explanation_ar: 'اسم المفعول من abrir هو abierto، ومن poner هو puesto.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences using irregular participles (hecho, escrito, visto).',
          prompt_ar: 'اكتب 3 جمل باستخدام أسماء مفعول شاذة (hecho, escrito, visto).',
          minSentences: 3,
          sampleTarget: 'Hoy he hecho todos mis deberes a tiempo. He escrito un correo formal a mi profesor. Por la tarde he visto una serie en español con subtítulos.'
        }
      },
      {
        id: 'lesson-a2-18-3',
        unitId: 'unit-a2-18',
        lessonNumber: 3,
        title_es: 'Marcadores Temporales: Ya, Todavía no, Alguna vez',
        title_en: 'Time Markers: Ya, Todavía no & Ever',
        title_ar: 'الظروف الدالة: بالفعل، ليس بعد، هل سبق لك',
        cefr: 'A2',
        objectives_en: ['Use "Ya he..." for finished actions ahead of expectations', 'Use "Todavía no he / Aún no he..." for actions yet to occur', 'Ask "¿Alguna vez has...?" for bucket-list experiences'],
        objectives_ar: ['استخدام Ya للإشارة إلى إنجاز الفعل بالفعل', 'استخدام Todavía no للإشارة إلى أمر لم يكتمل بعد ولكن متوقع', 'استخدام Alguna vez للسؤال عن خوض التجربة مسبقاً'],
        vocabWordIds: ['w-ya', 'w-todavia-no', 'w-alguna-vez', 'w-nunca', 'w-jamas'],
        dialogue: [
          { speaker: 'Paula', es: '¿Has comido ya los churros con chocolate?', en: 'Have you already eaten the churros with chocolate?', ar: 'هل تناولت التشوروس مع الشوكولاتة بالفعل؟' },
          { speaker: 'Tomás', es: 'Todavía no los he probado, pero he escuchado que son deliciosos.', en: 'I haven’t tried them yet, but I have heard they are delicious.', ar: 'لم أجربها بعد، لكنني سمعت أنها لذيذة للغاية.' }
        ],
        exercises: [
          {
            id: 'ex-a2-18-3-1',
            type: 'multiple_choice',
            prompt_es: 'Para decir "I have not yet finished", decimos en español:',
            prompt_en: 'To say "I have not yet finished", we say:',
            prompt_ar: 'لقول "لم أنتهِ بعد" بالإسبانية، نقول:',
            options: ['Todavía no he terminado', 'Ya he terminado', 'Siempre termino', 'Terminé ayer'],
            correctAnswer: 'Todavía no he terminado',
            explanation_en: '"Todavía no + Pretérito Perfecto" expresses "not yet done".',
            explanation_ar: '"Todavía no + Pretérito Perfecto" تعبر عن شيء لم يتم بعد.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences expressing something you have already done, something you have never done, and something you have not yet done.',
          prompt_ar: 'اكتب 3 جمل تعبر فيها عن شيء قمت به بالفعل، وشيء لم تفعله قط، وشيء لم تفعله بعد.',
          minSentences: 3,
          sampleTarget: 'Ya he terminado el primer nivel de español. Nunca he viajado en globo aerostático. Todavía no he visitado la Alhambra de Granada pero es mi gran sueño.'
        }
      },
      {
        id: 'lesson-a2-18-4',
        unitId: 'unit-a2-18',
        lessonNumber: 4,
        title_es: 'Diferencia de Uso: Perfecto vs Indefinido',
        title_en: 'Regional & Temporal Contrast: Perfecto vs Indefinido',
        title_ar: 'الفروق الإقليمية والزمنية بين Perfecto و Indefinido',
        cefr: 'A2',
        objectives_en: ['Distinguish connected time periods (hoy, este mes = Perfecto) from finished periods (ayer, el año pasado = Indefinido)', 'Understand regional preferences across Spain vs Latin America', 'Choose the natural tense effortlessly'],
        objectives_ar: ['التمييز بين الفترات الممتدة المتصلة بالحاضر والفترات المنتهية', 'فهم تفضيل الاستخدام في إسبانيا مقابل أمريكا اللاتينية', 'اختيار الزمن الطبيعي بسلاسة ودقة'],
        vocabWordIds: ['w-hoy', 'w-este-mes', 'w-ayer', 'w-diferencia', 'w-tiempo'],
        dialogue: [
          { speaker: 'Profesor', es: 'Hoy he tomado tres cafés (el día no ha terminado). Ayer tomé solo uno (el día terminó).', en: 'Today I have had three coffees (today is not over). Yesterday I had just one (yesterday is finished).', ar: 'اليوم شربت 3 فناجين قهوة (اليوم مستمر). أمس شربت فنجاناً واحداً (الأمس انتهى تماماً).' }
        ],
        exercises: [
          {
            id: 'ex-a2-18-4-1',
            type: 'multiple_choice',
            prompt_es: 'Este año nosotros ______ (hacer) muchos progresos.',
            prompt_en: 'Because "este año" is an open/current time frame, we use:',
            prompt_ar: 'نظراً لأن este año إطار زمني مفتوح ومستمر، نستخدم:',
            options: ['hemos hecho', 'hicimos', 'hacemos', 'hacíamos'],
            correctAnswer: 'hemos hecho',
            explanation_en: 'Current ongoing time periods (este año, este mes, esta semana) trigger the Pretérito Perfecto: hemos hecho.',
            explanation_ar: 'الفترات الزمنية الجارية التي لم تنتهِ تتطلب Pretérito Perfecto: hemos hecho.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences contrasting what you did yesterday (Pretérito Indefinido) with what you have done today (Pretérito Perfecto).',
          prompt_ar: 'اكتب 3 جمل تقارن فيها بين ما فعلته أمس (Indefinido) وما فعلته اليوم (Perfecto).',
          minSentences: 3,
          sampleTarget: 'Ayer trabajé hasta muy tarde en la oficina. Hoy he descansado más y he salido a dar un paseo matutino. Esta semana ha sido muy productiva para mí.'
        }
      }
    ]
  }
];

export const A2_CURRICULUM_UNITS: Unit[] = [
  ...A2_UNITS_PART1,
  ...A2_UNITS_PART2,
  ...A2_UNITS_PART3
];

export const A2_UNITS = A2_CURRICULUM_UNITS;
