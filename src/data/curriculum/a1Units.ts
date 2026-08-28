import { Unit } from '../../types';
import { A1_UNITS_PART2 } from './a1UnitsPart2';
import { A1_UNITS_PART3 } from './a1UnitsPart3';

export const A1_UNITS_PART1: Unit[] = [
  // UNIT 1: Primeros pasos y saludos
  {
    id: 'unit-a1-1',
    level: 'A1',
    unitNumber: 1,
    title_es: 'Primeros Pasos y Saludos',
    title_en: 'First Steps & Greetings',
    title_ar: 'الخطوات الأولى والتحيات',
    description_en: 'Learn basic greetings, introducing yourself, polite expressions, and the Spanish alphabet.',
    description_ar: 'تعلم التحيات الأساسية، التعريف بالنفس، عبارات اللباقة، والأبجدية الإسبانية.',
    lessons: [
      {
        id: 'lesson-a1-1-1',
        unitId: 'unit-a1-1',
        lessonNumber: 1,
        title_es: 'Saludos Formales e Informales',
        title_en: 'Formal & Informal Greetings',
        title_ar: 'التحيات الرسمية وغير الرسمية',
        cefr: 'A1',
        objectives_en: ['Greet people at different times of day', 'Understand the difference between tú and usted', 'Say goodbye politely'],
        objectives_ar: ['إلقاء التحية في مختلف أوقات اليوم', 'فهم الفرق بين tú و usted', 'التوديع بلباقة'],
        vocabWordIds: ['w-hola', 'w-buenos-dias', 'w-buenas-tardes', 'w-adios', 'w-gracias'],
        grammarTopicId: 'g-ser-vs-estar',
        culturalNote: {
          title: 'Greetings & Saludos in the Hispanic World',
          content_en: 'In Spain and Latin America, greetings are warm and expressive. Friends often greet with a handshake, hug, or cheek kiss depending on the country.',
          content_ar: 'في إسبانيا وأمريكا اللاتينية، تتسم التحيات بالدفء والود، وغالباً ما تترافق بمصافحة أو عناق أو قبلات على الوجنتين بحسب البلد.'
        },
        dialogue: [
          { speaker: 'Mateo', es: '¡Hola! Buenos días, ¿cómo estás?', en: 'Hello! Good morning, how are you?', ar: 'مرحباً! صباح الخير، كيف حالك؟' },
          { speaker: 'Sofía', es: 'Muy bien, gracias. ¿Y tú?', en: 'Very well, thank you. And you?', ar: 'بخير جداً، شكراً. وأنت؟' },
          { speaker: 'Mateo', es: 'Excelente. Me llamo Mateo.', en: 'Excellent. My name is Mateo.', ar: 'ممتاز. اسمي ماتيو.' }
        ],
        exercises: [
          {
            id: 'ex-a1-1-1-1',
            type: 'multiple_choice',
            prompt_es: '¿Cómo se dice "Good morning" en español?',
            prompt_en: 'How do you say "Good morning" in Spanish?',
            prompt_ar: 'كيف تقول "صباح الخير" بالإسبانية؟',
            options: ['Buenos días', 'Buenas noches', 'Hasta luego', 'Por favor'],
            correctAnswer: 'Buenos días',
            explanation_en: '"Buenos días" is used in the morning until noon.',
            explanation_ar: '"Buenos días" تستخدم في الصباح حتى وقت الظهيرة.'
          },
          {
            id: 'ex-a1-1-1-2',
            type: 'fill_blank',
            prompt_es: 'Completa: "Hola, ¿cómo ______?"',
            prompt_en: 'Complete: "Hola, ¿cómo ______?" (informal)',
            prompt_ar: 'أكمل: "Hola, ¿cómo ______?"',
            options: ['estás', 'está', 'eres', 'somos'],
            correctAnswer: 'estás',
            explanation_en: '"¿Cómo estás?" uses the informal tú form of estar.',
            explanation_ar: '"¿Cómo estás?" تستخدم صيغة المخاطب غير الرسمي tú.'
          },
          {
            id: 'ex-a1-1-1-3',
            type: 'translation',
            prompt_es: 'Traduce: "See you later, thank you."',
            prompt_en: 'Translate to Spanish: "See you later, thank you."',
            prompt_ar: 'ترجم: "أراك لاحقاً، شكراً."',
            options: ['Hasta luego, gracias', 'Buenos días, por favor', 'Mucho gusto, adiós', 'Buenas tardes, perdón'],
            correctAnswer: 'Hasta luego, gracias',
            explanation_en: '"Hasta luego" means see you later, and "gracias" means thank you.',
            explanation_ar: '"Hasta luego" تعني إلى اللقاء / أراك لاحقاً، و "gracias" تعني شكراً.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 short sentences greeting someone, asking how they are, and saying goodbye.',
          prompt_ar: 'اكتب 3 جمل قصيرة تحيي فيها شخصاً، وتسأله عن حاله، وتودعه بالإسبانية.',
          minSentences: 3,
          sampleTarget: '¡Hola! Buenos días. ¿Cómo estás hoy? Hasta luego y muchas gracias.'
        }
      },
      {
        id: 'lesson-a1-1-2',
        unitId: 'unit-a1-1',
        lessonNumber: 2,
        title_es: 'Presentaciones Personales y Nombres',
        title_en: 'Personal Introductions & Names',
        title_ar: 'التعريف بالنفس والأسماء',
        cefr: 'A1',
        objectives_en: ['Introduce your name using llamarse and ser', 'Ask someone their name', 'Express pleasure in meeting someone'],
        objectives_ar: ['ذكر اسمك باستخدام llamarse و ser', 'سؤال الآخرين عن أسمائهم', 'التعبير عن سرور اللقاء'],
        vocabWordIds: ['w-llamarse', 'w-nombre', 'w-mucho-gusto', 'w-encantado', 'w-senor'],
        dialogue: [
          { speaker: 'Alejandro', es: 'Hola, ¿cómo te llamas?', en: 'Hello, what is your name?', ar: 'مرحباً، ما اسمك؟' },
          { speaker: 'Lucía', es: 'Me llamo Lucía. ¿Y tú?', en: 'My name is Lucía. And you?', ar: 'اسمي لوسيا. وأنت؟' },
          { speaker: 'Alejandro', es: 'Yo soy Alejandro. Mucho gusto en conocerte.', en: 'I am Alejandro. Pleased to meet you.', ar: 'أنا أليخاندرو. تشرفت بمعرفتك.' }
        ],
        exercises: [
          {
            id: 'ex-a1-1-2-1',
            type: 'multiple_choice',
            prompt_es: '¿Cómo respondes a "Mucho gusto"?',
            prompt_en: 'How do you respond to "Mucho gusto" (Pleased to meet you)?',
            prompt_ar: 'كيف تجيب على "Mucho gusto" (تشرفت بمعرفتك)؟',
            options: ['Igualmente', 'Por favor', 'Hasta mañana', 'De nada'],
            correctAnswer: 'Igualmente',
            explanation_en: '"Igualmente" means "likewise / same to you".',
            explanation_ar: '"Igualmente" تعني "بالمثل / وأنا كذلك".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Introduce yourself with your name and express pleasure to meet someone in 3 sentences.',
          prompt_ar: 'عرف بنفسك واذكر اسمك وعبر عن سعادتك باللقاء في 3 جمل.',
          minSentences: 3,
          sampleTarget: '¡Hola a todos! Me llamo Daniel. Encantado de conocerlos.'
        }
      },
      {
        id: 'lesson-a1-1-3',
        unitId: 'unit-a1-1',
        lessonNumber: 3,
        title_es: 'El Alfabeto y la Pronunciación',
        title_en: 'The Alphabet & Pronunciation',
        title_ar: 'الأبجدية والنطق الصحيح',
        cefr: 'A1',
        objectives_en: ['Spell words in Spanish', 'Pronounce vowels and consonants correctly (c, z, j, ñ, ll, rr)', 'Understand Spanish syllable stress rules'],
        objectives_ar: ['تهجئة الكلمات بالإسبانية', 'نطق الحروف الصوتية والساكنة بدقة', 'فهم قواعد نبر المقاطع الصوتية'],
        vocabWordIds: ['w-letra', 'w-palabra', 'w-escribir', 'w-deletrear', 'w-acento'],
        dialogue: [
          { speaker: 'Profesor', es: '¿Cómo se deletrea tu apellido?', en: 'How do you spell your surname?', ar: 'كيف تتهجى لقب عائلتك؟' },
          { speaker: 'Elena', es: 'Se escribe G-A-R-C-Í-A con acento en la I.', en: 'It is written G-A-R-C-I-A with an accent on the I.', ar: 'يكتب G-A-R-C-Í-A مع نبرة على حرف I.' }
        ],
        exercises: [
          {
            id: 'ex-a1-1-3-1',
            type: 'multiple_choice',
            prompt_es: '¿Qué letra es exclusiva del abecedario español?',
            prompt_en: 'Which letter is iconic to the Spanish alphabet?',
            prompt_ar: 'أي حرف مميز وخاص بالأبجدية الإسبانية؟',
            options: ['Ñ (eñe)', 'W (doble v)', 'K (ka)', 'Y (i griega)'],
            correctAnswer: 'Ñ (eñe)',
            explanation_en: 'The letter Ñ represents the [ɲ] sound in words like España.',
            explanation_ar: 'حرف Ñ هو علامة مميزة للأبجدية الإسبانية وينطق كصوت النون المعجمة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Spell your first name and your country in Spanish.',
          prompt_ar: 'قم بتهجئة اسمك الأول واسم بلدك بالإسبانية.',
          minSentences: 2,
          sampleTarget: 'Mi nombre es Sara: S-A-R-A. Soy de Egipto: E-G-I-P-T-O.'
        }
      },
      {
        id: 'lesson-a1-1-4',
        unitId: 'unit-a1-1',
        lessonNumber: 4,
        title_es: 'Tú vs Usted: Cortesía y Registro',
        title_en: 'Tú vs Usted: Politeness & Register',
        title_ar: 'الضمير Tú مقابل Usted: اللباقة والرسمية',
        cefr: 'A1',
        objectives_en: ['Distinguish formal (usted) vs informal (tú)', 'Address elders and professionals respectfully', 'Conjugate verbs for both registers'],
        objectives_ar: ['التمييز بين الأسلوب الرسمي وغير الرسمي', 'مخاطبة كبار السن والمهنيين باحترام', 'تصريف الأفعال مع كلا الضميرين'],
        vocabWordIds: ['w-usted', 'w-tu', 'w-senor', 'w-senora', 'w-disculpe'],
        dialogue: [
          { speaker: 'Cliente', es: 'Disculpe, señor, ¿es usted el gerente del hotel?', en: 'Excuse me, sir, are you the hotel manager?', ar: 'عفواً يا سيدي، هل حضرتك مدير الفندق؟' },
          { speaker: 'Gerente', es: 'Sí, buenas tardes. ¿En qué le puedo ayudar?', en: 'Yes, good afternoon. How can I help you?', ar: 'نعم، مساؤك خير. كيف يمكنني مساعدة حضرتك؟' }
        ],
        exercises: [
          {
            id: 'ex-a1-1-4-1',
            type: 'multiple_choice',
            prompt_es: 'Para hablar con un profesor mayor o en una entrevista, usamos:',
            prompt_en: 'To speak with an older professor or in an interview, we use:',
            prompt_ar: 'للحديث مع أستاذ مسن أو في مقابلة عمل، نستخدم:',
            options: ['Usted', 'Tú', 'Vosotros', 'Ellos'],
            correctAnswer: 'Usted',
            explanation_en: '"Usted" expresses formal respect and takes 3rd person verb forms.',
            explanation_ar: '"Usted" تعبر عن الاحترام واللباقة وتأخذ تصريف الغائب المفرد.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a polite 3-sentence dialogue asking a stranger for directions or information using "usted".',
          prompt_ar: 'اكتب حواراً لبقاً من 3 جمل تسأل فيه شخصاً غريباً عن معلومة باستخدام صيغة الاحترام usted.',
          minSentences: 3,
          sampleTarget: 'Disculpe, señor. ¿Sabe usted dónde está la estación? Muchas gracias por su ayuda.'
        }
      }
    ]
  },

  // UNIT 2: Yo y mi mundo
  {
    id: 'unit-a1-2',
    level: 'A1',
    unitNumber: 2,
    title_es: 'Yo y Mi Mundo',
    title_en: 'Me & My World',
    title_ar: 'أنا وعالمي',
    description_en: 'Master expressing nationality, origin, age, occupations, and family relationships with ser and tener.',
    description_ar: 'إتقان التعبير عن الجنسية، الأصل، العمر، المهن، والعلاقات العائلية باستخدام ser و tener.',
    lessons: [
      {
        id: 'lesson-a1-2-1',
        unitId: 'unit-a1-2',
        lessonNumber: 1,
        title_es: 'Países, Nacionalidades y Origen',
        title_en: 'Countries, Nationalities & Origin',
        title_ar: 'البلدان والجنسيات والأصل',
        cefr: 'A1',
        objectives_en: ['State where you are from with "ser de"', 'Form masculine and feminine nationalities', 'Ask others about their origin'],
        objectives_ar: ['ذكر موطنك باستخدام ser de', 'صياغة المذكر والمؤنث في الجنسيات', 'سؤال الآخرين عن أصولهم'],
        vocabWordIds: ['w-pais', 'w-espana', 'w-mexico', 'w-argentina', 'w-egipto'],
        dialogue: [
          { speaker: 'Karim', es: 'Hola Camila, ¿de dónde eres?', en: 'Hello Camila, where are you from?', ar: 'مرحباً كاميلا، من أين أنتِ؟' },
          { speaker: 'Camila', es: 'Soy de Bogotá, soy colombiana. ¿Y tú?', en: 'I am from Bogotá, I am Colombian. And you?', ar: 'أنا من بوغوتا، أنا كولومبية. وأنت؟' },
          { speaker: 'Karim', es: 'Yo soy egipcio, de la ciudad de Alejandría.', en: 'I am Egyptian, from the city of Alexandria.', ar: 'أنا مصري، من مدينة الإسكندرية.' }
        ],
        exercises: [
          {
            id: 'ex-a1-2-1-1',
            type: 'multiple_choice',
            prompt_es: 'María es de España. Ella es:',
            prompt_en: 'Maria is from Spain. She is:',
            prompt_ar: 'ماريا من إسبانيا. إذن هي:',
            options: ['española', 'español', 'españoles', 'españolas'],
            correctAnswer: 'española',
            explanation_en: 'Nationalities agree in gender and number: María is feminine singular (española).',
            explanation_ar: 'الجنسيات تطابق الاسم جنساً وعدداً: María مؤنث مفرد فتكون española.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences stating your nationality, city of origin, and languages you speak.',
          prompt_ar: 'اكتب 3 جمل تذكر فيها جنسيتك، مدينتك الأم، واللغات التي تتحدث بها.',
          minSentences: 3,
          sampleTarget: 'Soy de Marruecos y soy marroquí. Vivo en Casablanca. Hablo árabe, francés y un poco de español.'
        }
      },
      {
        id: 'lesson-a1-2-2',
        unitId: 'unit-a1-2',
        lessonNumber: 2,
        title_es: 'La Edad y los Números del 1 al 100',
        title_en: 'Age & Numbers 1–100',
        title_ar: 'العمر والأرقام من 1 إلى 100',
        cefr: 'A1',
        objectives_en: ['Count from 1 to 100 fluently', 'Ask and state age using the verb tener', 'Understand why Spanish uses tener (not ser) for age'],
        objectives_ar: ['العد من 1 إلى 100 بطلاقة', 'سؤال وذكر العمر باستخدام فعل tener', 'فهم سبب استخدام tener للعمر في الإسبانية'],
        vocabWordIds: ['w-tener', 'w-ano', 'w-edad', 'w-veinte', 'w-cincuenta'],
        dialogue: [
          { speaker: 'Diego', es: '¿Cuántos años tienes, Laura?', en: 'How old are you, Laura?', ar: 'كم عمرك يا لاورا؟' },
          { speaker: 'Laura', es: 'Tengo veinticinco años. ¿Y tú?', en: 'I am 25 years old. And you?', ar: 'عمري 25 سنة. وأنت؟' },
          { speaker: 'Diego', es: 'Yo tengo treinta y dos años.', en: 'I am 32 years old.', ar: 'أنا عمري 32 سنة.' }
        ],
        exercises: [
          {
            id: 'ex-a1-2-2-1',
            type: 'multiple_choice',
            prompt_es: '¿Cómo se dice "I am 20 years old" correctamente?',
            prompt_en: 'How do you say "I am 20 years old" correctly in Spanish?',
            prompt_ar: 'كيف تقول "عمري 20 سنة" بشكل صحيح بالإسبانية؟',
            options: ['Tengo veinte años', 'Soy veinte años', 'Estoy veinte años', 'Hago veinte años'],
            correctAnswer: 'Tengo veinte años',
            explanation_en: 'In Spanish, age is expressed with the verb TENER (literally "I have 20 years").',
            explanation_ar: 'في الإسبانية، يُعبر عن العمر دائماً بفعل TENER (حرفياً: أملك 20 سنة).'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences stating your age and the ages of two family members or friends.',
          prompt_ar: 'اكتب 3 جمل تذكر فيها عمرك وأعمار شخصين من عائلتك أو أصدقائك.',
          minSentences: 3,
          sampleTarget: 'Tengo veintiocho años. Mi hermano tiene veintidós años y mi madre tiene cincuenta y cinco años.'
        }
      },
      {
        id: 'lesson-a1-2-3',
        unitId: 'unit-a1-2',
        lessonNumber: 3,
        title_es: 'Profesiones y Ocupaciones',
        title_en: 'Professions & Occupations',
        title_ar: 'المهن والوظائف',
        cefr: 'A1',
        objectives_en: ['State professions without indefinite articles (Soy médico)', 'Form feminine and masculine job titles', 'Talk about work and workplace'],
        objectives_ar: ['ذكر المهن بدون أداة تنكير (Soy médico)', 'صياغة المذكر والمؤنث في ألقاب الوظائف', 'الحديث عن العمل ومكانه'],
        vocabWordIds: ['w-profesor', 'w-medico', 'w-ingeniero', 'w-estudiante', 'w-trabajar'],
        dialogue: [
          { speaker: 'Andrés', es: '¿A qué te dedicas, Marta?', en: 'What do you do for a living, Marta?', ar: 'ما هي مهنتك يا مارتا؟' },
          { speaker: 'Marta', es: 'Soy ingeniera de software en una empresa tecnológica. ¿Y tú?', en: 'I am a software engineer at a tech company. And you?', ar: 'أنا مهندسة برمجيات في شركة تقنية. وأنت؟' },
          { speaker: 'Andrés', es: 'Yo soy profesor de idiomas en la universidad.', en: 'I am a language teacher at the university.', ar: 'أنا أستاذ لغات في الجامعة.' }
        ],
        exercises: [
          {
            id: 'ex-a1-2-3-1',
            type: 'multiple_choice',
            prompt_es: 'Traduce correctamente: "Carlos is an architect."',
            prompt_en: 'Choose the natural Spanish translation:',
            prompt_ar: 'اختر الترجمة الطبيعية: "كارلوس مهندس معماري."',
            options: ['Carlos es arquitecto', 'Carlos es un arquitecto', 'Carlos está arquitecto', 'Carlos tiene arquitecto'],
            correctAnswer: 'Carlos es arquitecto',
            explanation_en: 'Spanish does NOT use "un/una" before professions when stating what someone does.',
            explanation_ar: 'في الإسبانية لا نضع أداة التنكير un/una قبل المهن عند الإخبار عن الوظيفة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Describe your job or studies and where you work/study in 3 sentences.',
          prompt_ar: 'صف مهنتك أو دراستك ومكان عملك أو دراستك في 3 جمل.',
          minSentences: 3,
          sampleTarget: 'Soy estudiante de medicina. Estudio en la universidad central. Trabajo en un hospital los fines de semana.'
        }
      },
      {
        id: 'lesson-a1-2-4',
        unitId: 'unit-a1-2',
        lessonNumber: 4,
        title_es: 'La Familia y los Posesivos',
        title_en: 'Family & Possessive Adjectives',
        title_ar: 'العائلة وصفات الملكية',
        cefr: 'A1',
        objectives_en: ['Identify family members (padre, madre, hermano, hijo)', 'Use short possessive adjectives (mi, tu, su, nuestro)', 'Describe family structure'],
        objectives_ar: ['معرفة أفراد الأسرة', 'استخدام صفات الملكية القصيرة (mi, tu, su, nuestro)', 'وصف هيكل الأسرة'],
        vocabWordIds: ['w-padre', 'w-madre', 'w-hermano', 'w-hijo', 'w-familia'],
        dialogue: [
          { speaker: 'Gabriel', es: '¿Tienes hermanos, Valentina?', en: 'Do you have siblings, Valentina?', ar: 'هل لديك إخوة يا فالنتينا؟' },
          { speaker: 'Valentina', es: 'Sí, tengo un hermano mayor y dos hermanas menores. Mi familia es grande.', en: 'Yes, I have an older brother and two younger sisters. My family is big.', ar: 'نعم، لدي أخ أكبر وأختان أصغر. عائلتي كبيرة.' }
        ],
        exercises: [
          {
            id: 'ex-a1-2-4-1',
            type: 'fill_blank',
            prompt_es: 'Ella vive con ______ (her) padres.',
            prompt_en: 'Complete with the possessive adjective for "her":',
            prompt_ar: 'أكمل بصفة الملكية المناسبة لـ "والديها":',
            options: ['sus', 'su', 'mis', 'nuestros'],
            correctAnswer: 'sus',
            explanation_en: '"Padres" is plural, so the possessive adjective must be plural: "sus".',
            explanation_ar: '"Padres" جمع، لذا يجب أن تكون صفة الملكية جمعاً: "sus".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Describe your family in 3 sentences using family vocabulary and possessive adjectives.',
          prompt_ar: 'صف عائلتك في 3 جمل باستخدام مفردات الأسرة وصفات الملكية.',
          minSentences: 3,
          sampleTarget: 'Mi familia vive en Madrid. Mi padre es médico y mi madre es profesora. Tengo un hermano menor.'
        }
      }
    ]
  },

  // UNIT 3: Mi día y mi rutina
  {
    id: 'unit-a1-3',
    level: 'A1',
    unitNumber: 3,
    title_es: 'Mi Día y Mi Rutina',
    title_en: 'My Day & Daily Routine',
    title_ar: 'يومي وروتيني اليومي',
    description_en: 'Express daily schedules, tell the time, master reflexive verbs, and regular present tense conjugation.',
    description_ar: 'التعبير عن الجداول اليومية، إخبار الوقت، إتقان الأفعال الانعكاسية، وتصريف المضارع المنتظم.',
    lessons: [
      {
        id: 'lesson-a1-3-1',
        unitId: 'unit-a1-3',
        lessonNumber: 1,
        title_es: 'La Hora y los Momentos del Día',
        title_en: 'Telling Time & Parts of the Day',
        title_ar: 'الوقت وأجزاء اليوم',
        cefr: 'A1',
        objectives_en: ['Ask and tell the time with "Es la una / Son las..."', 'Use time expressions (en punto, y cuarto, y media, menos cuarto)', 'Differentiate parts of the day'],
        objectives_ar: ['سؤال وإخبار الوقت', 'استخدام تعبيرات التوقيت الدقيقة', 'التمييز بين أوقات اليوم المختلفة'],
        vocabWordIds: ['w-hora', 'w-manana', 'w-tarde', 'w-noche', 'w-minuto'],
        dialogue: [
          { speaker: 'Pedro', es: '¿Qué hora es, por favor?', en: 'What time is it, please?', ar: 'كم الساعة من فضلك؟' },
          { speaker: 'Ana', es: 'Son las ocho y media de la mañana.', en: 'It is eight thirty in the morning.', ar: 'إنها الثامنة والنصف صباحاً.' },
          { speaker: 'Pedro', es: '¡Gracias! Mi clase empieza a las nueve en punto.', en: 'Thanks! My class starts at nine o’clock sharp.', ar: 'شكراً! صفي يبدأ في التاسعة تماماً.' }
        ],
        exercises: [
          {
            id: 'ex-a1-3-1-1',
            type: 'multiple_choice',
            prompt_es: 'Para las 1:15 decimos:',
            prompt_en: 'For 1:15 PM we say:',
            prompt_ar: 'للساعة 1:15 نقول:',
            options: ['Es la una y cuarto', 'Son las una y cuarto', 'Es las una y quince', 'Son la una y media'],
            correctAnswer: 'Es la una y cuarto',
            explanation_en: 'For 1:00 we use singular "Es la una", for all other hours "Son las...".',
            explanation_ar: 'للساعة الواحدة نستخدم المفرد "Es la una"، وللساعات الأخرى نستخدم "Son las...".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences detailing what time you wake up, have lunch, and go to bed.',
          prompt_ar: 'اكتب 3 جمل توضح فيها موعد استيقاظك، غدائك، ونومك.',
          minSentences: 3,
          sampleTarget: 'Me despierto a las siete de la mañana. Almuerzo a las dos de la tarde y duermo a las once de la noche.'
        }
      },
      {
        id: 'lesson-a1-3-2',
        unitId: 'unit-a1-3',
        lessonNumber: 2,
        title_es: 'Verbos Reflexivos y Rutina Matutina',
        title_en: 'Reflexive Verbs & Morning Routine',
        title_ar: 'الأفعال الانعكاسية والروتين الصباحي',
        cefr: 'A1',
        objectives_en: ['Conjugate reflexive verbs (levantarse, ducharse, vestirse)', 'Place reflexive pronouns correctly (me, te, se, nos, os, se)', 'Describe personal hygiene actions'],
        objectives_ar: ['تصريف الأفعال الانعكاسية', 'وضع ضمائر الانعكاس في مكانها الصحيح', 'وصف أفعال النظافة والعناية الشخصية'],
        vocabWordIds: ['w-levantarse', 'w-ducharse', 'w-despertarse', 'w-lavarse', 'w-vestirse'],
        dialogue: [
          { speaker: 'Javier', es: '¿A qué hora te levantas normalmente?', en: 'What time do you usually get up?', ar: 'في أي وقت تستيقظ عادةً؟' },
          { speaker: 'Sara', es: 'Me levanto a las seis y media, me ducho con agua tibia y me visto rápido.', en: 'I get up at six thirty, take a shower with warm water, and get dressed quickly.', ar: 'أستيقظ في السادسة والنصف، وأستحم بماء دافئ وأرتدي ملابسي بسرعة.' }
        ],
        exercises: [
          {
            id: 'ex-a1-3-2-1',
            type: 'fill_blank',
            prompt_es: 'Nosotros ______ a las siete de la mañana.',
            prompt_en: 'Complete with the correct reflexive form of levantarse:',
            prompt_ar: 'أكمل بالصيغة الانعكاسية الصحيحة لفعل levantarse مع Nosotros:',
            options: ['nos levantamos', 'me levanto', 'se levantan', 'te levantas'],
            correctAnswer: 'nos levantamos',
            explanation_en: 'The reflexive pronoun for "nosotros" is "nos", and the verb ending is "-amos".',
            explanation_ar: 'ضمير الانعكاس مع نحن هو nos وتصريف الفعل ينتهي بـ -amos.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Describe your entire morning routine in 3 sentences using at least two reflexive verbs.',
          prompt_ar: 'صف روتينك الصباحي الكامل في 3 جمل باستخدام فعلين انعكاسيين على الأقل.',
          minSentences: 3,
          sampleTarget: 'Primero me despierto temprano. Luego me ducho y me lavo los dientes. Finalmente tomo el desayuno tranquilamente.'
        }
      },
      {
        id: 'lesson-a1-3-3',
        unitId: 'unit-a1-3',
        lessonNumber: 3,
        title_es: 'Presente Regular: Verbos en -AR, -ER, -IR',
        title_en: 'Regular Present Tense: -AR, -ER, -IR',
        title_ar: 'المضارع البسيط المنتظم للأفعال',
        cefr: 'A1',
        objectives_en: ['Master present tense endings for -ar, -er, and -ir verbs', 'Form affirmative and negative sentences', 'Ask questions about everyday activities'],
        objectives_ar: ['إتقان نهايات المضارع لمجموعات الأفعال الثلاث', 'تكوين الجمل المثبتة والمنفية', 'طرح الأسئلة عن الأنشطة اليومية'],
        vocabWordIds: ['w-hablar', 'w-comer', 'w-vivir', 'w-estudiar', 'w-leer'],
        dialogue: [
          { speaker: 'Carlos', es: '¿Dónde trabajas y qué estudias?', en: 'Where do you work and what do you study?', ar: 'أين تعمل وماذا تدرس؟' },
          { speaker: 'Elena', es: 'Trabajo en una oficina céntrica y estudio español todos los días.', en: 'I work in a downtown office and study Spanish every day.', ar: 'أعمل في مكتب بوسط المدينة وأدرس الإسبانية كل يوم.' }
        ],
        exercises: [
          {
            id: 'ex-a1-3-3-1',
            type: 'multiple_choice',
            prompt_es: 'Ellos ______ (vivir) en Madrid.',
            prompt_en: 'Choose the correct form of "vivir" for "ellos":',
            prompt_ar: 'اختر التصريف الصحيح لفعل vivir مع ellos:',
            options: ['viven', 'vivimos', 'vive', 'vivo'],
            correctAnswer: 'viven',
            explanation_en: 'Third-person plural for -ir verbs takes "-en" (viven).',
            explanation_ar: 'تصريف أفعال -ir مع ضمير الجمع الغائب ellos ينتهي بـ -en.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences about your daily activities using regular -ar, -er, and -ir verbs.',
          prompt_ar: 'اكتب 3 جمل عن أنشطتك اليومية مستخدماً أفعالاً من المجموعات الثلاث.',
          minSentences: 3,
          sampleTarget: 'Hablo español con mis amigos. Como comida saludable todos los días. Vivo cerca de mi trabajo.'
        }
      },
      {
        id: 'lesson-a1-3-4',
        unitId: 'unit-a1-3',
        lessonNumber: 4,
        title_es: 'Días de la Semana y Frecuencia',
        title_en: 'Days of the Week & Frequency Words',
        title_ar: 'أيام الأسبوع وكلمات التكرار',
        cefr: 'A1',
        objectives_en: ['Name all 7 days of the week', 'Use frequency adverbs (siempre, a menudo, a veces, nunca)', 'Talk about weekly schedules'],
        objectives_ar: ['تسمية أيام الأسبوع السبعة', 'استخدام ظروف التكرار', 'الحديث عن الجدول الأسبوعي'],
        vocabWordIds: ['w-lunes', 'w-domingo', 'w-siempre', 'w-nunca', 'w-semana'],
        dialogue: [
          { speaker: 'Lucía', es: '¿Qué haces los fines de semana?', en: 'What do you do on weekends?', ar: 'ماذا تفعل في عطلات نهاية الأسبوع؟' },
          { speaker: 'Pablo', es: 'Los sábados siempre voy al gimnasio y los domingos descanso con mi familia.', en: 'On Saturdays I always go to the gym, and on Sundays I rest with my family.', ar: 'أيام السبت أذهب دائماً إلى النادي الرياضي وأيام الأحد أستريح مع عائلتي.' }
        ],
        exercises: [
          {
            id: 'ex-a1-3-4-1',
            type: 'multiple_choice',
            prompt_es: 'En español, para decir "On Mondays", usamos:',
            prompt_en: 'To say "On Mondays" in Spanish, we say:',
            prompt_ar: 'لقول "في أيام الإثنين" بالإسبانية، نستخدم:',
            options: ['Los lunes', 'En lunes', 'A lunes', 'Por lunes'],
            correctAnswer: 'Los lunes',
            explanation_en: 'Spanish uses the masculine plural definite article "los" for recurring days: "los lunes".',
            explanation_ar: 'نستخدم أداة التعريف الجمع los للتعبير عن الأيام المتكررة: los lunes.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences explaining what you do on different days of the week using frequency adverbs.',
          prompt_ar: 'اكتب 3 جمل توضح ما تفعله في أيام مختلفة من الأسبوع مع استخدام ظروف التكرار.',
          minSentences: 3,
          sampleTarget: 'Los lunes siempre trabajo muchas horas. Los viernes a veces salgo con amigos. Los domingos nunca me despierto temprano.'
        }
      }
    ]
  },

  // UNIT 4: Mi casa y mi entorno
  {
    id: 'unit-a1-4',
    level: 'A1',
    unitNumber: 4,
    title_es: 'Mi Casa y Mi Entorno',
    title_en: 'My Home & Environment',
    title_ar: 'بيتي والبيئة المحيطة بي',
    description_en: 'Describe rooms, furniture, household objects, spatial prepositions, and master the contrast between Hay and Estar.',
    description_ar: 'وصف الغرف، الأثاث، الأدوات المنزلية، حروف الجر المكانية، وإتقان الفرق بين Hay و Estar.',
    lessons: [
      {
        id: 'lesson-a1-4-1',
        unitId: 'unit-a1-4',
        lessonNumber: 1,
        title_es: 'Las Habitaciones de la Casa',
        title_en: 'Rooms of the House',
        title_ar: 'غرف وأقسام المنزل',
        cefr: 'A1',
        objectives_en: ['Name all main rooms of a home', 'Describe your apartment or house size', 'Use basic descriptive adjectives (amplio, luminoso, pequeño)'],
        objectives_ar: ['تسمية الغرف الرئيسية في المنزل', 'وصف مساحة البيت أو الشقة', 'استخدام الصفات الوصفية الأساسية'],
        vocabWordIds: ['w-casa', 'w-habitacion', 'w-cocina', 'w-salon', 'w-bano'],
        dialogue: [
          { speaker: 'Agente', es: 'Este apartamento tiene dos habitaciones, un salón luminoso y una cocina moderna.', en: 'This apartment has two bedrooms, a bright living room, and a modern kitchen.', ar: 'هذه الشقة بها غرفتا نوم، وصالة مضيئة، ومطبخ حديث.' },
          { speaker: 'Inquilino', es: 'Me gusta mucho. ¿Tiene balcón?', en: 'I like it a lot. Does it have a balcony?', ar: 'تعجبني كثيراً. هل بها شرفة؟' }
        ],
        exercises: [
          {
            id: 'ex-a1-4-1-1',
            type: 'multiple_choice',
            prompt_es: '¿Dónde preparamos la comida en casa?',
            prompt_en: 'Where do we prepare food at home?',
            prompt_ar: 'أين نعد الطعام في المنزل؟',
            options: ['En la cocina', 'En el dormitorio', 'En el baño', 'En el garaje'],
            correctAnswer: 'En la cocina',
            explanation_en: '"La cocina" is the kitchen.',
            explanation_ar: '"La cocina" تعني المطبخ.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Describe your house or apartment in 3 sentences mentioning at least 3 rooms.',
          prompt_ar: 'صف منزلك أو شقتك في 3 جمل مع ذكر 3 غرف على الأقل.',
          minSentences: 3,
          sampleTarget: 'Mi casa tiene tres habitaciones y dos baños. La cocina es amplia y luminosa. El salón es muy cómodo para ver películas.'
        }
      },
      {
        id: 'lesson-a1-4-2',
        unitId: 'unit-a1-4',
        lessonNumber: 2,
        title_es: 'Muebles y Objetos del Hogar',
        title_en: 'Furniture & Household Objects',
        title_ar: 'الأثاث والأدوات المنزلية',
        cefr: 'A1',
        objectives_en: ['Identify furniture (mesa, silla, sofá, cama, armario)', 'Describe what is inside each room', 'Ask about the location of household items'],
        objectives_ar: ['معرفة قطع الأثاث الرئيسية', 'وصف محتويات كل غرفة', 'السؤال عن مكان الأدوات المنزلية'],
        vocabWordIds: ['w-mesa', 'w-silla', 'w-sofa', 'w-cama', 'w-armario'],
        dialogue: [
          { speaker: 'Marcos', es: '¿Dónde está el libro que compré ayer?', en: 'Where is the book I bought yesterday?', ar: 'أين الكتاب الذي اشتريته أمس؟' },
          { speaker: 'Clara', es: 'Está en la mesa pequeña al lado del sofá.', en: 'It is on the small table next to the sofa.', ar: 'إنه على الطاولة الصغيرة بجانب الأريكة.' }
        ],
        exercises: [
          {
            id: 'ex-a1-4-2-1',
            type: 'fill_blank',
            prompt_es: 'En el dormitorio hay una ______ muy cómoda para dormir.',
            prompt_en: 'Complete with the furniture item for sleeping:',
            prompt_ar: 'أكمل بقطعة الأثاث المخصصة للنوم:',
            options: ['cama', 'silla', 'estantería', 'nevera'],
            correctAnswer: 'cama',
            explanation_en: '"Cama" means bed.',
            explanation_ar: '"Cama" تعني السرير.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Describe the furniture in your bedroom in 3 sentences.',
          prompt_ar: 'صف الأثاث الموجود في غرفة نومك في 3 جمل.',
          minSentences: 3,
          sampleTarget: 'En mi dormitorio hay una cama grande y un armario de madera. También tengo una mesa de noche con una lámpara bonita.'
        }
      },
      {
        id: 'lesson-a1-4-3',
        unitId: 'unit-a1-4',
        lessonNumber: 3,
        title_es: 'Hay vs Estar: Existencia y Ubicación',
        title_en: 'Hay vs Estar: Existence vs Location',
        title_ar: 'الفرق بين Hay و Estar: الوجود وتحديد الموقع',
        cefr: 'A1',
        objectives_en: ['Use HAY for indefinite existence (Hay una farmacia aquí)', 'Use ESTAR for specific location (La farmacia está allí)', 'Avoid mixing up hay and está'],
        objectives_ar: ['استخدام HAY للوجود غير المحدد', 'استخدام ESTAR للموقع المحدد', 'تجنب الخلط بين hay و está'],
        vocabWordIds: ['w-hay', 'w-estar', 'w-aqui', 'w-alli', 'w-cerca'],
        dialogue: [
          { speaker: 'Turista', es: 'Perdón, ¿hay algún supermercado cerca?', en: 'Excuse me, is there any supermarket nearby?', ar: 'عفواً، هل يوجد أي سوبرماركت قريب؟' },
          { speaker: 'Vecino', es: 'Sí, hay uno en la avenida principal. El supermercado está al lado del banco.', en: 'Yes, there is one on the main avenue. The supermarket is next to the bank.', ar: 'نعم، يوجد واحد في الشارع الرئيسي. السوبرماركت يقع بجانب البنك.' }
        ],
        exercises: [
          {
            id: 'ex-a1-4-3-1',
            type: 'multiple_choice',
            prompt_es: '¿______ tres sillas en el salón?',
            prompt_en: 'Choose the correct form for indefinite quantity existence:',
            prompt_ar: 'اختر الأداة الصحيحة للتعبير عن وجود كمية غير محددة:',
            options: ['Hay', 'Están', 'Son', 'Tiene'],
            correctAnswer: 'Hay',
            explanation_en: '"Hay" expresses the existence of items (there is / there are).',
            explanation_ar: '"Hay" تعبر عن وجود الأشياء (يوجد / هناك).'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences using both "Hay" and "Está/Están" to describe places in your neighborhood.',
          prompt_ar: 'اكتب 3 جمل تستخدم فيها Hay و Está/Están لوصف أماكن في حيك.',
          minSentences: 3,
          sampleTarget: 'En mi barrio hay un parque muy bonito. El parque está cerca de mi casa. También hay dos cafeterías excelentes.'
        }
      },
      {
        id: 'lesson-a1-4-4',
        unitId: 'unit-a1-4',
        lessonNumber: 4,
        title_es: 'Preposiciones de Lugar Espaciales',
        title_en: 'Spatial Prepositions of Place',
        title_ar: 'حروف الجر والتعبيرات المكانية',
        cefr: 'A1',
        objectives_en: ['Use encima de, debajo de, al lado de, enfrente de, dentro de, entre', 'Combine "de + el = del"', 'Give precise descriptions of object positions'],
        objectives_ar: ['استخدام تعبيرات المكان فوق، تحت، بجانب، أمام، داخل، بين', 'دمج de + el لتصبح del', 'إعطاء وصف دقيق لمواقع الأشياء'],
        vocabWordIds: ['w-encima-de', 'w-debajo-de', 'w-al-lado-de', 'w-delante-de', 'w-entre'],
        dialogue: [
          { speaker: 'Hijo', es: 'Mamá, ¿dónde están mis llaves?', en: 'Mom, where are my keys?', ar: 'أمي، أين مفاتيحي؟' },
          { speaker: 'Madre', es: 'Están encima de la mesa, al lado del teléfono.', en: 'They are on top of the table, next to the phone.', ar: 'إنها فوق الطاولة، بجانب الهاتف.' }
        ],
        exercises: [
          {
            id: 'ex-a1-4-4-1',
            type: 'fill_blank',
            prompt_es: 'El gato está ______ (under) la cama.',
            prompt_en: 'Complete with the preposition for "under":',
            prompt_ar: 'أكمل بحرف الجر الدال على "تحت":',
            options: ['debajo de', 'encima de', 'lejos de', 'dentro de'],
            correctAnswer: 'debajo de',
            explanation_en: '"Debajo de" means under / underneath.',
            explanation_ar: '"Debajo de" تعني تحت / أسفل.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences describing where three objects in your room are located using spatial prepositions.',
          prompt_ar: 'اكتب 3 جمل تصف فيها أماكن 3 أغراض في غرفتك باستخدام حروف الجر المكانية.',
          minSentences: 3,
          sampleTarget: 'Mi ordenador está encima del escritorio. La mochila está debajo de la silla. Los libros están dentro del armario.'
        }
      }
    ]
  },

  // UNIT 5: Comer y beber (Alimentos, restaurantes, gustar)
  {
    id: 'unit-a1-5',
    level: 'A1',
    unitNumber: 5,
    title_es: 'Comer y Beber',
    title_en: 'Eating & Drinking',
    title_ar: 'الطعام والشراب',
    description_en: 'Master ordering at restaurants, food vocabulary, prices, quantities, and using the verb gustar / encantar.',
    description_ar: 'إتقان الطلب في المطعم، مفردات الأطعمة، الأسعار والكميات، واستخدام أفعال الإعجاب مثل gustar و encantar.',
    lessons: [
      {
        id: 'lesson-a1-5-1',
        unitId: 'unit-a1-5',
        lessonNumber: 1,
        title_es: 'En el Restaurante: Pedir la Comida',
        title_en: 'At the Restaurant: Ordering Food',
        title_ar: 'في المطعم: طلب الطعام',
        cefr: 'A1',
        objectives_en: ['Order dishes politely with "Para mí...", "Quería...", "De primero/segundo"', 'Ask for the bill (La cuenta, por favor)', 'Inquire about ingredients'],
        objectives_ar: ['طلب الأطباق بلباقة', 'طلب الحساب وفاتورة الطعام', 'السؤال عن مكونات الوجبة'],
        vocabWordIds: ['w-restaurante', 'w-camarero', 'w-menu', 'w-cuenta', 'w-plato'],
        dialogue: [
          { speaker: 'Camarero', es: 'Buenas tardes, ¿qué desean tomar de primero?', en: 'Good afternoon, what would you like to have as a starter?', ar: 'مساؤكم خير، ماذا تودون كطبق أول؟' },
          { speaker: 'Cliente', es: 'Para mí, una ensalada mixta y de segundo, paella de marisco, por favor.', en: 'For me, a mixed salad, and as a main course, seafood paella, please.', ar: 'بالنسبة لي، سلطة مشكلة وكطبق رئيسي، بايلا المأكولات البحرية من فضلك.' },
          { speaker: 'Camarero', es: '¿Y para beber?', en: 'And to drink?', ar: 'وماذا عن المشروب؟' },
          { speaker: 'Cliente', es: 'Agua con gas, por favor.', en: 'Sparkling water, please.', ar: 'ماء غازي من فضلك.' }
        ],
        exercises: [
          {
            id: 'ex-a1-5-1-1',
            type: 'multiple_choice',
            prompt_es: 'Para pedir el total a pagar al camarero decimos:',
            prompt_en: 'To ask the waiter for the bill, we say:',
            prompt_ar: 'لطلب الفاتورة من النادل نقول:',
            options: ['La cuenta, por favor', 'La comida, por favor', 'La mesa, por favor', 'El menú, por favor'],
            correctAnswer: 'La cuenta, por favor',
            explanation_en: '"La cuenta, por favor" is the standard phrase to ask for the bill.',
            explanation_ar: '"La cuenta, por favor" هي العبارة القياسية لطلب الحساب.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-turn dialogue ordering your favorite meal and drink in a Spanish restaurant.',
          prompt_ar: 'اكتب حواراً من 3 تبادلات تطلب فيه وجبتك ومشروبك المفضل في مطعم إسباني.',
          minSentences: 3,
          sampleTarget: '— Buenas tardes, ¿tienen mesa para dos? — Sí, claro. ¿Qué van a comer? — Para mí una sopa de verduras y pollo asado, por favor.'
        }
      },
      {
        id: 'lesson-a1-5-2',
        unitId: 'unit-a1-5',
        lessonNumber: 2,
        title_es: 'Alimentos Básicos, Frutas y Verduras',
        title_en: 'Basic Foods, Fruits & Vegetables',
        title_ar: 'الأطعمة الأساسية والفواكه والخضروات',
        cefr: 'A1',
        objectives_en: ['Name essential meats, fish, vegetables, and fruits', 'State tastes and dietary preferences', 'Describe food freshness'],
        objectives_ar: ['تسمية اللحوم والأسماك والخضار والفواكه', 'التعبير عن المذاق والتفضيلات الغذائية', 'وصف جودة وطزاجة الطعام'],
        vocabWordIds: ['w-fruta', 'w-manzana', 'w-carne', 'w-pescado', 'w-pan'],
        dialogue: [
          { speaker: 'Vendedor', es: '¡Buenas! Las naranjas y los tomates están muy frescos hoy.', en: 'Hello! The oranges and tomatoes are very fresh today.', ar: 'مرحباً! البرتقال والطماطم طازجة جداً اليوم.' },
          { speaker: 'Cliente', es: 'Excelente, deme un kilo de naranjas y medio kilo de manzanas.', en: 'Excellent, give me a kilo of oranges and half a kilo of apples.', ar: 'ممتاز، أعطني كيلوغراماً من البرتقال ونصف كيلو من التفاح.' }
        ],
        exercises: [
          {
            id: 'ex-a1-5-2-1',
            type: 'fill_blank',
            prompt_es: 'Compro un kilo de ______ (apples) en el mercado.',
            prompt_en: 'Fill with the Spanish word for apples:',
            prompt_ar: 'أكمل بالكلمة الإسبانية الدالة على التفاح:',
            options: ['manzanas', 'naranjas', 'plátanos', 'fresas'],
            correctAnswer: 'manzanas',
            explanation_en: '"Manzanas" means apples.',
            explanation_ar: '"Manzanas" تعني التفاح.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences describing what foods you buy when you go to the supermarket.',
          prompt_ar: 'اكتب 3 جمل تصف فيها الأطعمة التي تشتريها عندما تذهب إلى السوبرماركت.',
          minSentences: 3,
          sampleTarget: 'Siempre compro pan fresco, leche y huevos. También compro muchas frutas como manzanas y plátanos. Me gusta comer pescado los viernes.'
        }
      },
      {
        id: 'lesson-a1-5-3',
        unitId: 'unit-a1-5',
        lessonNumber: 3,
        title_es: 'El Verbo Gustar y Encantar',
        title_en: 'The Verbs Gustar & Encantar',
        title_ar: 'أفعال الإعجاب والتفضيل Gustar و Encantar',
        cefr: 'A1',
        objectives_en: ['Use indirect object pronouns with gustar (me, te, le, nos, os, les)', 'Distinguish "gusta + singular/infinitive" vs "gustan + plural"', 'Express strong enthusiasm with encantar'],
        objectives_ar: ['استخدام ضمائر المفعول به غير المباشر مع gustar', 'التمييز بين gusta للمفرد والمصدر و gustan للجمع', 'التعبير عن الإعجاب الشديد بفعل encantar'],
        vocabWordIds: ['w-gustar', 'w-encantar', 'w-mucho', 'w-nada', 'w-tambien'],
        dialogue: [
          { speaker: 'Carmen', es: '¿Te gusta la comida picante?', en: 'Do you like spicy food?', ar: 'هل يعجبك الطعام الحار؟' },
          { speaker: 'Sergio', es: 'No, no me gusta nada. Prefiero la comida mediterránea, me encantan las tapas.', en: 'No, I do not like it at all. I prefer Mediterranean food, I love tapas.', ar: 'لا، لا يعجبني على الإطلاق. أفضل طعام البحر المتوسط، أعشق المقبلات (التاباس).' }
        ],
        exercises: [
          {
            id: 'ex-a1-5-3-1',
            type: 'multiple_choice',
            prompt_es: 'A mí me ______ los postres dulces.',
            prompt_en: 'Choose the correct form of gustar for plural noun "postres":',
            prompt_ar: 'اختر الصيغة الصحيحة لـ gustar مع الاسم الجمع postres:',
            options: ['gustan', 'gusta', 'gusto', 'gustamos'],
            correctAnswer: 'gustan',
            explanation_en: 'With plural subjects ("los postres"), we use "gustan".',
            explanation_ar: 'مع الفاعل الجمع (los postres) نستخدم صيغة الجمع "gustan".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences expressing things you like, love, and dislike using me gusta, me encanta, and no me gusta.',
          prompt_ar: 'اكتب 3 جمل تعبر فيها عما يعجبك، وما تعشقه، وما لا تحبه باستخدام me gusta و me encanta و no me gusta.',
          minSentences: 3,
          sampleTarget: 'Me encanta cocinar para mi familia los fines de semana. Me gusta mucho el café por la mañana. No me gusta la comida rápida.'
        }
      },
      {
        id: 'lesson-a1-5-4',
        unitId: 'unit-a1-5',
        lessonNumber: 4,
        title_es: 'Precios, Moneda y Cantidades',
        title_en: 'Prices, Currency & Quantities',
        title_ar: 'الأسعار والعملات وتحديد الكميات',
        cefr: 'A1',
        objectives_en: ['Ask how much things cost (¿Cuánto cuesta / cuestan?)', 'Use euro/peso amounts and decimals', 'Understand packaging units (un paquete, una botella, una lata)'],
        objectives_ar: ['السؤال عن الأسعار (كم يكلف / تكلف؟)', 'استخدام مبالغ اليورو والبيزو والكسور', 'فهم وحدات التعبئة (عبوة، زجاجة، علبة)'],
        vocabWordIds: ['w-costar', 'w-euro', 'w-precio', 'w-botella', 'w-kilo'],
        dialogue: [
          { speaker: 'Cliente', es: 'Disculpe, ¿cuánto cuesta este queso curado?', en: 'Excuse me, how much is this cured cheese?', ar: 'عفواً، كم يكلف هذا الجبن المعتق؟' },
          { speaker: 'Tendero', es: 'Cuesta doce euros con cincuenta céntimos el kilo.', en: 'It costs twelve euros and fifty cents per kilo.', ar: 'يكلف اثني عشر يورو وخمسين سنتاً للكيلو.' }
        ],
        exercises: [
          {
            id: 'ex-a1-5-4-1',
            type: 'multiple_choice',
            prompt_es: '¿Cuánto ______ estos dos libros?',
            prompt_en: 'Complete with the correct form of costar for plural items:',
            prompt_ar: 'أكمل بالتصريف الصحيح لفعل costar مع الجمع:',
            options: ['cuestan', 'cuesta', 'costar', 'cuesto'],
            correctAnswer: 'cuestan',
            explanation_en: 'For plural nouns ("estos dos libros"), use "cuestan".',
            explanation_ar: 'مع الجمع (estos dos libros) نستخدم "cuestan".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a short 3-sentence shopping interaction asking for prices of two different items.',
          prompt_ar: 'اكتب محادثة تسوق قصيرة من 3 جمل تسأل فيها عن أسعار غرضين مختلفين.',
          minSentences: 3,
          sampleTarget: '— ¿Cuánto cuesta la botella de aceite de oliva? — Cuesta ocho euros. — Está muy bien, me llevo dos botellas, por favor.'
        }
      }
    ]
  },

  // UNIT 6: La ciudad y el transporte
  {
    id: 'unit-a1-6',
    level: 'A1',
    unitNumber: 6,
    title_es: 'La Ciudad y el Transporte',
    title_en: 'The City & Transportation',
    title_ar: 'المدينة ووسائل المواصلات',
    description_en: 'Navigate urban spaces, ask for directions, use public transport, and master the verb Ir a + Place.',
    description_ar: 'التنقل في الأماكن الحضرية، طلب الاتجاهات، استخدام المواصلات العامة، وإتقان استخدام Ir a + المكان.',
    lessons: [
      {
        id: 'lesson-a1-6-1',
        unitId: 'unit-a1-6',
        lessonNumber: 1,
        title_es: 'Lugares Públicos en la Ciudad',
        title_en: 'Public Places in the City',
        title_ar: 'الأماكن العامة والمرافق في المدينة',
        cefr: 'A1',
        objectives_en: ['Identify urban locations (banco, hospital, farmacia, parque, biblioteca)', 'Describe the city center and neighborhood facilities', 'Use "Hay + lugar" in town'],
        objectives_ar: ['معرفة الأماكن الحضرية الرئيسية', 'وصف وسط المدينة ومرافق الحي', 'استخدام Hay مع الأماكن الحضرية'],
        vocabWordIds: ['w-ciudad', 'w-calle', 'w-plaza', 'w-parque', 'w-banco'],
        dialogue: [
          { speaker: 'Manuel', es: 'En mi ciudad hay un parque enorme, tres museos de arte y una plaza histórica muy bonita.', en: 'In my city there is a huge park, three art museums, and a very pretty historic square.', ar: 'في مدينتي حديقة ضخمة، وثلاثة متاحف فنية، وساحة تاريخية جميلة جداً.' },
          { speaker: 'Silvia', es: '¡Qué maravilla! En mi pueblo solo hay una plaza pequeña y una farmacia.', en: 'How wonderful! In my town there is only a small square and a pharmacy.', ar: 'يا له من أمر رائع! في قريتي لا يوجد سوى ساحة صغيرة وصيدلية.' }
        ],
        exercises: [
          {
            id: 'ex-a1-6-1-1',
            type: 'multiple_choice',
            prompt_es: '¿Dónde compramos medicinas?',
            prompt_en: 'Where do we buy medicine?',
            prompt_ar: 'أين نشتري الأدوية؟',
            options: ['En la farmacia', 'En el banco', 'En el cine', 'En la iglesia'],
            correctAnswer: 'En la farmacia',
            explanation_en: '"La farmacia" is the pharmacy / chemist.',
            explanation_ar: '"La farmacia" تعني الصيدلية.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Describe 3 public places located in your city or neighborhood.',
          prompt_ar: 'صف 3 أماكن عامة ومرافق تقع في مدينتك أو حيك.',
          minSentences: 3,
          sampleTarget: 'En el centro de mi ciudad hay una catedral antigua y una biblioteca pública. Cerca de mi casa hay un supermercado grande y un hospital moderno.'
        }
      },
      {
        id: 'lesson-a1-6-2',
        unitId: 'unit-a1-6',
        lessonNumber: 2,
        title_es: 'Pedir y Dar Direcciones en la Calle',
        title_en: 'Asking For & Giving Directions',
        title_ar: 'طلب وإعطاء الاتجاهات في الشارع',
        cefr: 'A1',
        objectives_en: ['Ask "Para ir a...", "¿Dónde está...?"', 'Give directions with "todo recto", "a la derecha", "a la izquierda", "cruzar la calle"', 'Understand distance phrases'],
        objectives_ar: ['السؤال عن الطريق إلى مكان ما', 'إعطاء التوجيهات إلى الأمام، يميناً، يساراً، عبور الشارع', 'فهم تعبيرات المسافة والقرب والبعد'],
        vocabWordIds: ['w-derecha', 'w-izquierda', 'w-recto', 'w-cruzar', 'w-calle'],
        dialogue: [
          { speaker: 'Turista', es: 'Perdón, ¿cómo puedo ir a la estación de tren?', en: 'Excuse me, how can I get to the train station?', ar: 'عفواً، كيف يمكنني الذهاب إلى محطة القطار؟' },
          { speaker: 'Policía', es: 'Siga todo recto por esta avenida dos calles y gire a la derecha. La estación está enfrente del parque.', en: 'Go straight ahead on this avenue for two blocks and turn right. The station is opposite the park.', ar: 'امشِ مباشرة في هذا الشارع لشارعين ثم انعطف يميناً. المحطة تقع أمام الحديقة.' }
        ],
        exercises: [
          {
            id: 'ex-a1-6-2-1',
            type: 'multiple_choice',
            prompt_es: '"Todo recto" significa:',
            prompt_en: '"Todo recto" means:',
            prompt_ar: '"Todo recto" تعني:',
            options: ['Straight ahead', 'To the right', 'To the left', 'Behind'],
            correctAnswer: 'Straight ahead',
            explanation_en: '"Todo recto" indicates continuing in a straight line.',
            explanation_ar: '"Todo recto" تدل على الاستمرار للأمام بشكل مستقيم.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write directions explaining how to get from your home to the nearest metro station or shop.',
          prompt_ar: 'اكتب توجيهات توضح كيفية الوصول من بيتك إلى أقرب محطة مترو أو متجر.',
          minSentences: 3,
          sampleTarget: 'Sal de mi casa y ve todo recto por la calle principal. Cruza el semáforo y gira a la izquierda. La estación de metro está a cien metros.'
        }
      },
      {
        id: 'lesson-a1-6-3',
        unitId: 'unit-a1-6',
        lessonNumber: 3,
        title_es: 'Medios de Transporte y el Verbo IR',
        title_en: 'Means of Transport & The Verb IR',
        title_ar: 'وسائل النقل وفعل الذهاب IR',
        cefr: 'A1',
        objectives_en: ['Conjugate the irregular verb IR (voy, vas, va, vamos, vais, van)', 'Use "en + transport" (en autobús, en metro, en tren, en coche, en avión)', 'Use "a pie / andando" for walking'],
        objectives_ar: ['تصريف فعل الذهاب الشاذ IR', 'استخدام حرف الجر en مع وسائل المواصلات', 'استخدام a pie للمشي على الأقدام'],
        vocabWordIds: ['w-ir', 'w-metro', 'w-autobus', 'w-tren', 'w-coche'],
        dialogue: [
          { speaker: 'Lucía', es: '¿Cómo vas al trabajo todos los días?', en: 'How do you go to work every day?', ar: 'كيف تذهب إلى العمل يومياً؟' },
          { speaker: 'Raúl', es: 'Normalmente voy en metro porque es muy rápido, pero si hace buen tiempo voy a pie.', en: 'Normally I go by metro because it is very fast, but if the weather is nice I walk.', ar: 'عادة أذهب بالمترو لأنه سريع جداً، ولكن إذا كان الطقس جميلاً أذهب سيراً على الأقدام.' }
        ],
        exercises: [
          {
            id: 'ex-a1-6-3-1',
            type: 'fill_blank',
            prompt_es: 'Nosotros ______ (ir) a la universidad en autobús.',
            prompt_en: 'Complete with the present tense of "ir" for nosotros:',
            prompt_ar: 'أكمل بتصريف فعل ir مع nosotros:',
            options: ['vamos', 'van', 'voy', 'vais'],
            correctAnswer: 'vamos',
            explanation_en: 'The "nosotros" form of IR is "vamos".',
            explanation_ar: 'تصريف فعل ir مع الضمير nosotros هو vamos.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences stating how you travel to work/school, to the supermarket, and to another city.',
          prompt_ar: 'اكتب 3 جمل تذكر فيها كيف تسافر إلى عملك/مدرستك، وإلى السوبرماركت، وإلى مدينة أخرى.',
          minSentences: 3,
          sampleTarget: 'Voy a mi universidad en metro todos los días. Para ir al supermercado voy a pie porque está muy cerca. Para viajar a otra ciudad voy en tren de alta velocidad.'
        }
      },
      {
        id: 'lesson-a1-6-4',
        unitId: 'unit-a1-6',
        lessonNumber: 4,
        title_es: 'Billetes, Horarios y Estaciones',
        title_en: 'Tickets, Schedules & Stations',
        title_ar: 'التذاكر والمواعيد والمحطات',
        cefr: 'A1',
        objectives_en: ['Buy one-way and return tickets (ida y vuelta)', 'Ask for schedules (¿A qué hora sale el tren?)', 'Understand platform announcements'],
        objectives_ar: ['شراء تذاكر ذهاب وإياب', 'السؤال عن مواعيد الانطلاق والوصول', 'فهم إعلانات الأرصفة في المحطة'],
        vocabWordIds: ['w-billete', 'w-estacion', 'w-anden', 'w-salida', 'w-llegada'],
        dialogue: [
          { speaker: 'Pasajero', es: 'Buenos días, un billete de ida y vuelta a Sevilla para hoy, por favor.', en: 'Good morning, a round-trip ticket to Seville for today, please.', ar: 'صباح الخير، تذكرة ذهاب وإياب إلى إشبيلية لليوم من فضلك.' },
          { speaker: 'Taquillero', es: 'Muy bien. El próximo tren sale a las diez y cuarto del andén número cuatro.', en: 'Very well. The next train leaves at ten fifteen from platform number four.', ar: 'حسناً جداً. القطار القادم ينطلق في العاشرة والربع من الرصيف رقم أربعة.' }
        ],
        exercises: [
          {
            id: 'ex-a1-6-4-1',
            type: 'multiple_choice',
            prompt_es: '"Billete de ida y vuelta" significa:',
            prompt_en: '"Billete de ida y vuelta" means:',
            prompt_ar: '"Billete de ida y vuelta" تعني:',
            options: ['Round-trip ticket', 'One-way ticket', 'Monthly pass', 'First class seat'],
            correctAnswer: 'Round-trip ticket',
            explanation_en: '"Ida y vuelta" means round trip / return.',
            explanation_ar: '"Ida y vuelta" تعني ذهاب وإياب.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence interaction buying a train ticket to a Spanish city with schedule details.',
          prompt_ar: 'اكتب محادثة من 3 جمل تشتري فيها تذكرة قطار إلى مدينة إسبانية مع تفاصيل التوقيت.',
          minSentences: 3,
          sampleTarget: '— Quisiera un billete de tren para Madrid para las nueve de la mañana. — Son cuarenta euros. El tren sale del andén dos. — Muchas gracias, que tenga buen día.'
        }
      }
    ]
  }
];

export const A1_CURRICULUM_UNITS: Unit[] = [
  ...A1_UNITS_PART1,
  ...A1_UNITS_PART2,
  ...A1_UNITS_PART3
];

export const A1_UNITS = A1_CURRICULUM_UNITS;
