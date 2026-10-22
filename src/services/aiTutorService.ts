import { TutorPersona, UserProgress } from '../types';

export interface LinguisticCorrection {
  original: string;
  correction: string;
  explanation: string;
}

export interface TutorAnalysis {
  hasErrors: boolean;
  score?: number;
  verdict?: string;
  feedback_es?: string;
  feedback_en?: string;
  feedback_ar?: string;
  corrections?: LinguisticCorrection[];
  naturalAlternative?: string;
  dialectTip?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  spanishText: string;
  englishExplanation?: string;
  arabicExplanation?: string;
  phase?: string;
  analysis?: TutorAnalysis;
  corrections?: string[];
  vocabulary?: {
    word: string;
    en: string;
    ar: string;
    contextSentence?: string;
  }[];
  followUpQuestions?: string[];
  feedbackBadge?: {
    type: 'correct' | 'warning' | 'tip' | 'analyzing';
    text: string;
    xpBonus?: number;
  };
  audioAutoPlayed?: boolean;
}

export interface TutorPersonaConfig {
  id: TutorPersona;
  name: string;
  country: string;
  city: string;
  flag: string;
  gender: 'male' | 'female';
  voiceTag: string;
  avatar: string;
  role_en: string;
  role_ar: string;
  accent: string;
  colloquialisms: string[];
  sampleGreeting: string;
  avatarBg: string;
  accentColor: string;
  accentBorder: string;
  accentBgLight: string;
}

export const TUTOR_PERSONAS: TutorPersonaConfig[] = [
  {
    id: 'juan',
    name: 'Juan',
    city: 'Oaxaca',
    country: 'México',
    flag: '🇲🇽',
    gender: 'male',
    voiceTag: '👨 Barítono Cálido (México)',
    avatar: '👨‍🎨',
    role_en: 'Warm Native Conversationalist & Cultural Guide',
    role_ar: 'محاور إسباني دافئ ومرشد ثقافي من أواخاكا بالمكسيك',
    accent: 'Mexican Spanish (carro, platicar, ¿qué onda?, con ganas)',
    colloquialisms: ['¡Órale!', '¿Qué onda?', 'con ganas', 'chido', 'platicar'],
    sampleGreeting: '¡Hola, qué onda! Soy Juan de Oaxaca. ¿Listo para platicar con ganas hoy?',
    avatarBg: 'from-amber-600 to-orange-700',
    accentColor: 'text-[#B47832] dark:text-amber-400',
    accentBorder: 'border-[#B47832]/30',
    accentBgLight: 'bg-[#B47832]/10 dark:bg-[#B47832]/20'
  },
  {
    id: 'sofia',
    name: 'Sofía',
    city: 'Madrid',
    country: 'España',
    flag: '🇪🇸',
    gender: 'female',
    voiceTag: '👩 Vital y Directa (Madrid)',
    avatar: '👩',
    role_en: 'Spontaneous Native & Everyday Colloquial Spanish',
    role_ar: 'متحدثة إسبانية عفوية وحيوية من مدريد للتعبيرات اليومية',
    accent: 'Castilian Iberian (¿qué tal, tío?, vale, mola, de tapas)',
    colloquialisms: ['¿Qué tal, tío?', 'vale', 'mola', 'guay', 'de tapas'],
    sampleGreeting: '¡Hola! Soy Sofía de Madrid. ¿Qué tal, tío? ¡Venga, vamos a charlar que esto mola!',
    avatarBg: 'from-rose-600 to-red-700',
    accentColor: 'text-[#C85A32] dark:text-[#E07A5F]',
    accentBorder: 'border-[#C85A32]/30',
    accentBgLight: 'bg-[#C85A32]/10 dark:bg-[#C85A32]/20'
  },
  {
    id: 'mateo',
    name: 'Prof. Mateo',
    city: 'Salamanca',
    country: 'España',
    flag: '🇪🇸',
    gender: 'male',
    voiceTag: '👨 Académico Riguroso (Salamanca)',
    avatar: '👨‍🏫',
    role_en: 'DELE Preparation Specialist & Academic Grammar Master',
    role_ar: 'خبير تربوي ولغوي معتمد في إعداد اختبارات DELE والقواعد',
    accent: 'Standard Academic Castilian (precisión léxica y método comunicativo)',
    colloquialisms: ['en efecto', 'desde luego', 'precisión léxica', 'con rigor'],
    sampleGreeting: 'Saludos cordiales. Soy el Profesor Mateo desde Salamanca. Iniciemos nuestra sesión comunicativa con rigor y claridad.',
    avatarBg: 'from-blue-700 to-indigo-800',
    accentColor: 'text-blue-600 dark:text-blue-400',
    accentBorder: 'border-blue-500/30',
    accentBgLight: 'bg-blue-500/10 dark:bg-blue-500/20'
  },
  {
    id: 'elena',
    name: 'Elena',
    city: 'Medellín',
    country: 'Colombia',
    flag: '🇨🇴',
    gender: 'female',
    voiceTag: '👩 Melódica y Paciente (Colombia)',
    avatar: '👩‍💼',
    role_en: 'Clear Pronunciation Pacing & Melodic Conversation Coach',
    role_ar: 'مدربة محادثة ونطق صبور ومتأنٍ من ميديلين بكولومبيا',
    accent: 'Paisa Colombian (¡qué más!, con mucho gusto, chévere, súper bien)',
    colloquialisms: ['¡Qué más!', 'con mucho gusto', 'chévere', 'súper bien', 'parce'],
    sampleGreeting: '¡Hola! Soy Elena de Medellín. ¡Qué más! Con mucho gusto te acompaño paso a paso en tu pronunciación.',
    avatarBg: 'from-emerald-700 to-teal-800',
    accentColor: 'text-[#2D5A43] dark:text-emerald-400',
    accentBorder: 'border-[#2D5A43]/30',
    accentBgLight: 'bg-[#2D5A43]/10 dark:bg-[#2D5A43]/20'
  }
];

export interface MissionObjective {
  id: string;
  label_es: string;
  label_en: string;
  label_ar: string;
  completedPattern?: RegExp;
}

export interface ScenarioDefinition {
  id: string;
  icon: string;
  title_es: string;
  title_en: string;
  title_ar: string;
  difficulty: 'A1' | 'A2' | 'B1' | 'B2';
  category: 'mission' | 'daily' | 'travel' | 'food' | 'work' | 'grammar';
  isTaskMission?: boolean;
  missionGoal_es?: string;
  missionGoal_en?: string;
  missionGoal_ar?: string;
  objectives?: MissionObjective[];
  initialPrompt: Partial<Record<TutorPersona, { es: string; en: string; ar: string }>> & {
    juan: { es: string; en: string; ar: string };
  };
  suggestedReplies: { es: string; en: string }[];
}

export const LINGOPAL_SCENARIOS: ScenarioDefinition[] = [
  // 🎯 MISSION 1: El Mercado de Coyoacán
  {
    id: 'coyoacan_market',
    icon: '🥭',
    title_es: 'El Mercado de Coyoacán',
    title_en: 'Coyoacán Market Mission',
    title_ar: 'سوق كويواكان الشعبي',
    difficulty: 'A2',
    category: 'mission',
    isTaskMission: true,
    missionGoal_es: 'Regatea con respeto por fruta fresca de temporada y pregunta por los ingredientes locales.',
    missionGoal_en: 'Bargain respectfully for fresh fruit and ask about local ingredients.',
    missionGoal_ar: 'تفاوض باحترام لشراء فواكه طازجة واسأل عن المكونات المحلية.',
    objectives: [
      {
        id: 'greet_ask_fruit',
        label_es: 'Saluda y pregunta por la fruta de temporada',
        label_en: 'Greet politely and ask for seasonal fruit',
        label_ar: 'التحية والسؤال عن الفواكه الموسمية',
        completedPattern: /buen(as|os)|hola|fruta|mango|papaya|temporada/i
      },
      {
        id: 'ask_sweetness',
        label_es: 'Pregunta sobre la madurez o sabor del fruto',
        label_en: 'Inquire about freshness, sweetness or ripeness',
        label_ar: 'السؤال عن مدى نضج أو حلاوة الفاكهة',
        completedPattern: /dulce|madur|sabor|prob|probar|ingrediente|origen/i
      },
      {
        id: 'bargain_politely',
        label_es: 'Pide cantidad y negocia el precio con cortesía',
        label_en: 'Ask for price or negotiate politely (cuánto, kilo, rebaj)',
        label_ar: 'طلب الكمية والتفاوض بلباقة على السعر',
        completedPattern: /cuánto|cuesta|kilo|medio kilo|deja|precio|llevar/i
      }
    ],
    initialPrompt: {
      juan: {
        es: '¡Pásele, pásele marchante! Bienvenido a mi puesto en Coyoacán. Hoy nos llegó un mango ataulfo y una papaya de Oaxaca que están para chuparse los dedos. ¿Qué se le ofrece llevar hoy?',
        en: 'Step right up, friend! Welcome to my stall in Coyoacán. Today we received honey mangoes and papaya from Oaxaca that are delicious. What can I get for you today?',
        ar: 'تفضل يا محترم! مرحباً بك في كشكي في كويواكان. وصل اليوم مانجو وبابايا طازجة ولذيذة جداً من أواخاكا. ماذا تحب أن تأخذ اليوم؟'
      },
      sofia: {
        es: '¡Hola! Qué ambiente más vivo hay en este mercado de Coyoacán. Venga, ¿nos acercamos al puesto de frutas? ¿Qué fruta te apetece probar?',
        en: 'Hi! What a vibrant atmosphere in this Coyoacán market. Come on, shall we check out the fruit stall? What fruit do you feel like trying?',
        ar: 'مرحباً! يا له من جو مفعم بالحياة في هذا السوق. هل نقترب من كشك الفواكه؟ أي فاكهة ترغب بتجربتها؟'
      },
      mateo: {
        es: 'Iniciamos la misión comunicativa: interacción transaccional en un mercado tradicional. Salude al vendedor e indague por el precio y frescura de la fruta.',
        en: 'We begin the communicative task: transactional interaction in a traditional market. Greet the vendor and ask about fruit price and freshness.',
        ar: 'نبدأ المهمة التواصلية: محادثة تسوق في سوق تقليدي. حيّ البائع واسأله عن السعر والطزاجة.'
      },
      elena: {
        es: '¡Hola, qué más! ¡Qué delicia de frutas tienen aquí en el mercado! Con mucho gusto te ayudo a pedirle al señor los mejores mangos. ¿Qué le quieres preguntar primero?',
        en: 'Hello, how are you! What delightful fruit they have here in the market! I will gladly help you ask the vendor for the best mangoes. What do you want to ask him first?',
        ar: 'أهلاً بك، كيف حالك! ما ألذ الفواكه هنا في السوق! بكل سرور أساعدك في طلب أفضل حبات المانجو. ماذا تود أن تسأله أولاً؟'
      }
    },
    suggestedReplies: [
      { es: '¡Buenas! ¿A cuánto tiene el kilo de mango y qué tan dulce está?', en: 'Hello! How much is a kilo of mango and how sweet is it?' },
      { es: '¿Me permite probar un pedacito antes de decidir?', en: 'May I taste a little piece before deciding?' },
      { es: 'Deme un kilo, pero si llevo dos, ¿me hace una rebajita?', en: 'Give me one kilo, but if I take two, could you give a little discount?' }
    ]
  },

  // 🎯 MISSION 2: Check-in en el Hotel de Madrid
  {
    id: 'madrid_hotel',
    icon: '🏨',
    title_es: 'Check-in en el Hotel de Madrid',
    title_en: 'Madrid Hotel Check-in',
    title_ar: 'تسجيل الوصول في فندق مدريد',
    difficulty: 'A2',
    category: 'mission',
    isTaskMission: true,
    missionGoal_es: 'Realiza el check-in, solicita una habitación tranquila en planta alta y reporta que falta una toalla.',
    missionGoal_en: 'Complete check-in, request a quiet room on a high floor, and report a missing towel politely.',
    missionGoal_ar: 'أتمم تسجيل الدخول، واطلب غرفة هادئة في طابق علوي، وأبلغ بأدب عن نقص منشفة.',
    objectives: [
      {
        id: 'checkin_reservation',
        label_es: 'Saluda e indica tu nombre o reserva de hotel',
        label_en: 'Greet reception and give your name/reservation details',
        label_ar: 'التحية وذكر الاسم أو بيانات الحجز',
        completedPattern: /reserva|nombre|noche|lleg|habitaci/i
      },
      {
        id: 'request_quiet_high',
        label_es: 'Pide una habitación silenciosa en una planta alta',
        label_en: 'Request a quiet room on a high floor (piso alto, tranquila)',
        label_ar: 'طلب غرفة هادئة في طابق مرتفع',
        completedPattern: /alto|planta alta|piso alto|tranquil|silencio|ruido/i
      },
      {
        id: 'report_missing_towel',
        label_es: 'Reporta cortésmente que falta una toalla en el baño',
        label_en: 'Report politely that a towel is missing in the bathroom',
        label_ar: 'الإبلاغ بلباقة عن نقص منشفة في الحمام',
        completedPattern: /toalla|baño|falta|necesito|limpi/i
      }
    ],
    initialPrompt: {
      sofia: {
        es: '¡Buenas tardes y bienvenido al Hotel Gran Vía de Madrid! Tienes cara de cansado tras el viaje, majo. ¿Tienes una reserva con nosotros o te busco habitación disponible?',
        en: 'Good afternoon and welcome to Hotel Gran Vía in Madrid! You look tired after traveling, my friend. Do you have a reservation with us or shall I find a room?',
        ar: 'مساء الخير وأهلاً بك في فندق غران فيا بمدريد! تبدو متعباً بعد السفر. هل لديك حجز مسبق أم أبحث لك عن غرفة متاحة؟'
      },
      juan: {
        es: '¡Buenas tardes! Bienvenido a nuestro hotel en Madrid. Con gusto le atiendo para su registro. ¿Me permite su identificación o número de reserva, por favor?',
        en: 'Good afternoon! Welcome to our hotel in Madrid. I will gladly assist with your check-in. May I see your ID or reservation number, please?',
        ar: 'مساء الخير! مرحباً بك في فندقنا بمدريد. بكل سرور أساعدك في التسجيل. هل تتفضل ببطاقتك أو رقم الحجز؟'
      },
      mateo: {
        es: 'Iniciamos la simulación de recepción hotelera. Practique fórmulas de cortesía y registro: exprese sus preferencias de planta y reporte cualquier necesidad de la habitación.',
        en: 'We begin the hotel check-in simulation. Practice courtesy markers and registration: state your floor preferences and report any room needs.',
        ar: 'نبدأ محاكاة استقبال الفندق. تدرب على أسلوب اللباقة والتسجيل وبيان تفضيلات الغرفة.'
      },
      elena: {
        es: '¡Hola! Bien llegado al hotel. Con mucho gusto te recibimos. Dime, ¿tienes reserva hecha para estos días?',
        en: 'Hello! Welcome to the hotel. We gladly welcome you. Tell me, do you have a reservation for these days?',
        ar: 'أهلاً بك في الفندق! يسعدنا استقبالك. أخبرني، هل لديك حجز لهذه الأيام؟'
      }
    },
    suggestedReplies: [
      { es: 'Buenas tardes, tengo una reserva a mi nombre para tres noches.', en: 'Good afternoon, I have a reservation in my name for three nights.' },
      { es: 'Si es posible, preferiría una habitación tranquila en una planta alta.', en: 'If possible, I would prefer a quiet room on a high floor.' },
      { es: 'Muchas gracias. Noté que falta una toalla grande en el baño, ¿podrían enviarme una?', en: 'Thank you. I noticed a large towel is missing in the bathroom, could you send one?' }
    ]
  },

  // 🎯 MISSION 3: Entrevista de Trabajo
  {
    id: 'job_interview',
    icon: '💼',
    title_es: 'Entrevista de Trabajo',
    title_en: 'Job Interview Mission',
    title_ar: 'محاكاة مقابلة العمل',
    difficulty: 'B1',
    category: 'mission',
    isTaskMission: true,
    missionGoal_es: 'Explica tu trayectoria profesional y responde preguntas situacionales con registro formal.',
    missionGoal_en: 'Explain your professional background and answer situational questions in formal Spanish.',
    missionGoal_ar: 'اشرح مسارك المهني وأجب عن الأسئلة الموقفية بأسلوب مهني رسمي.',
    objectives: [
      {
        id: 'present_background',
        label_es: 'Presenta tu perfil y tu motivación para el puesto',
        label_en: 'Present your professional profile and motivation',
        label_ar: 'تقديم ملفك المهني ودوافعك للوظيفة',
        completedPattern: /experiencia|trabaj|estudi|perfil|carrera|interés|motiv/i
      },
      {
        id: 'handle_challenge',
        label_es: 'Explica cómo resuelves problemas o trabajas en equipo',
        label_en: 'Explain how you solve problems or collaborate in a team',
        label_ar: 'شرح كيفية حل المشكلات والعمل الجماعي',
        completedPattern: /equipo|problem|desafío|soluci|proyect|resolv/i
      },
      {
        id: 'ask_company_question',
        label_es: 'Haz una pregunta profesional sobre metas o cultura',
        label_en: 'Ask a pertinent professional question about goals or team culture',
        label_ar: 'طرح سؤال مهني ذكي حول أهداف الشركة وبيئة العمل',
        completedPattern: /[?¿]|objetiv|meta|cultura|siguiente|etapa|equipo/i
      }
    ],
    initialPrompt: {
      mateo: {
        es: 'Estimado/a candidato/a, bienvenido a esta entrevista de selección. Hemos examinado con detenimiento su expediente. Para comenzar, ¿podría resumir su trayectoria y qué le motivó a postularse con nosotros?',
        en: 'Dear candidate, welcome to this selection interview. We have carefully reviewed your file. To begin, could you summarize your background and what motivated you to apply with us?',
        ar: 'عزيزي المتقدم، مرحباً بك في مقابلة التوظيف هذه. لقد راجعنا ملفك بعناية. للبدء، هل يمكنك تلخيص مسارك وما دفعك للتقدم إلينا؟'
      },
      sofia: {
        es: '¡Hola! Qué placer conocerte en persona para esta entrevista. Tu perfil nos ha parecido súper interesante. Cuéntame, ¿cuál ha sido el proyecto del que más orgulloso te sientes?',
        en: 'Hi! What a pleasure to meet you in person for this interview. Your profile looked very interesting. Tell me, which project are you most proud of?',
        ar: 'مرحباً! يسعدني لقاؤك شخصياً في هذه المقابلة. وجدنا سيرتك مميزة. أخبرني، ما هو المشروع الذي تفخر به أكثر؟'
      },
      juan: {
        es: 'Bienvenido. Muchas gracias por tu tiempo hoy. Nos alegra mucho platicar contigo sobre este puesto. Cuéntanos un poco de ti y cómo te gusta trabajar en equipo.',
        en: 'Welcome. Thank you very much for your time today. We are glad to chat with you about this role. Tell us a bit about yourself and how you like working in a team.',
        ar: 'أهلاً بك. شكراً جزيلاً لوقتك اليوم. يسعدنا الحديث معك حول هذا المنصب. حدثنا قليلاً عن نفسك وكيف تحب العمل الجماعي.'
      },
      elena: {
        es: '¡Hola, bienvenido! Con mucho gusto te recibimos para conocer más sobre tu experiencia. Siéntete cómodo y cuéntanos sobre tus principales fortalezas.',
        en: 'Hello, welcome! We gladly welcome you to learn more about your experience. Make yourself comfortable and tell us about your main strengths.',
        ar: 'مرحباً وأهلاً بك! يسعدنا جداً التعرف على خبراتك. خذ راحتك وحدثنا عن أبرز نقاط قوتك.'
      }
    },
    suggestedReplies: [
      { es: 'He acumulado varios años de experiencia en proyectos colaborativos y me motiva aprender rápido.', en: 'I have accumulated several years of experience in collaborative projects and I am motivated to learn quickly.' },
      { es: 'Frente a un problema técnico o de plazos, priorizo la comunicación clara y el análisis estructurado.', en: 'Facing a technical or deadline issue, I prioritize clear communication and structured analysis.' },
      { es: '¿Cuáles son los retos más importantes que enfrentará el equipo durante este próximo trimestre?', en: 'What are the most important challenges the team will face during this upcoming quarter?' }
    ]
  },

  // ☕ CASUAL SCENARIOS
  {
    id: 'cafe',
    icon: '☕',
    title_es: 'En el Café',
    title_en: 'At the Café',
    title_ar: 'في المقهى',
    difficulty: 'A1',
    category: 'food',
    initialPrompt: {
      juan: {
        es: '¡Buenas! Bienvenido al Café El Sol. ¿Qué te gustaría tomar hoy para empezar con buen pie?',
        en: 'Hi! Welcome to Café El Sol. What would you like to drink today to get started?',
        ar: 'أهلاً بك! مرحباً بك في مقهى الشمس. ماذا تود أن تشرب اليوم؟'
      },
      sofia: {
        es: '¡Hola! Qué bien que hayas venido. Estoy pidiendo en la barra. ¿Qué te apetece tomar?',
        en: 'Hi! So glad you came. I am ordering at the bar. What do you fancy drinking?',
        ar: 'مرحباً! رائع أنك أتيت. أنا أطلب الآن. ماذا تحب أن تشرب؟'
      },
      mateo: {
        es: '¡Saludos! Imaginemos que estamos en una cafetería salmantina. ¿Cómo le pedirías un café al camarero?',
        en: 'Greetings! Let us imagine we are in a Salamanca café. How would you order a coffee from the waiter?',
        ar: 'تحياتي! لنتخيل أننا في مقهى بسلامنكا. كيف تطلب قهوة من النادل؟'
      },
      elena: {
        es: '¡Hola! Qué rico tenerte aquí en este café. ¿Te provoca un cafecito colombiano bien suave o algo frío?',
        en: 'Hello! How nice to have you here at this cafe. Do you fancy a nice mild Colombian coffee or something cold?',
        ar: 'مرحباً! كم هو جميل وجودك هنا في المقهى. هل ترغب في قهوة كولومبية خفيفة أم مشروب بارد؟'
      }
    },
    suggestedReplies: [
      { es: 'Un café con leche y una tostada, por favor.', en: 'A coffee with milk and toast, please.' },
      { es: '¿Qué me recomiendas para desayunar?', en: 'What do you recommend for breakfast?' },
      { es: '¿Tienen opciones con leche de avena o soja?', en: 'Do you have oat or soy milk options?' }
    ]
  },
  {
    id: 'friends',
    icon: '👋',
    title_es: 'Nuevos Amigos',
    title_en: 'Making Friends',
    title_ar: 'التعرف على أصدقاء',
    difficulty: 'A1',
    category: 'daily',
    initialPrompt: {
      juan: {
        es: '¡Hola, qué onda! Qué gusto conocerte. Yo soy Juan de Oaxaca, México. ¿Y tú, de dónde eres y qué te late hacer?',
        en: "Hey, what's up! Nice to meet you. I am Juan from Oaxaca, Mexico. And you, where are you from and what do you like to do?",
        ar: 'أهلاً، كيف الحال! سعيد بالتعرف عليك. أنا خوان من أواخاكا بالمكسيك. وأنت، من أين وماذا تحب أن تفعل؟'
      },
      sofia: {
        es: '¡Hola! Me alegro de verte por aquí en Madrid. ¿Qué tal, tío? Cuéntame, ¿hace cuánto tiempo estudias español?',
        en: "Hi! Glad to see you here in Madrid. How's it going, my friend? Tell me, how long have you been studying Spanish?",
        ar: 'مرحباً! سعيدة برؤيتك في مدريد. كيف الحال يا صديقي؟ أخبرني، كم لك تدرس الإسبانية؟'
      },
      mateo: {
        es: '¡Hola! Hoy practicaremos cómo presentarte e intercambiar impresiones sobre tus aficiones de forma fluida. ¿Cómo te llamas?',
        en: 'Hello! Today we practice introducing yourself and sharing impressions about your hobbies fluidly. What is your name?',
        ar: 'مرحباً! اليوم سنتدرب على التعريف بالنفس وتبادل الحديث عن الهوايات بطلاقة. ما اسمك؟'
      },
      elena: {
        es: '¡Hola! ¡Qué más! Me da mucho gusto saludarte desde Medellín. ¿Qué te motivó a empezar a hablar español?',
        en: 'Hello! How are you doing! It is a great pleasure to greet you from Medellín. What motivated you to start speaking Spanish?',
        ar: 'مرحباً! كيف حالك! يسعدني جداً الترحيب بك من ميديلين. ما الذي شجعك على تعلم التحدث بالإسبانية؟'
      }
    },
    suggestedReplies: [
      { es: '¡Mucho gusto! Estoy aprendiendo español para viajar y conversar con gente nativa.', en: 'Nice to meet you! I am learning Spanish to travel and chat with native speakers.' },
      { es: 'Vivo en una ciudad bonita y me apasiona la música y la gastronomía.', en: 'I live in a beautiful city and I love music and gastronomy.' },
      { es: 'Llevo unos meses practicando todos los días y me encanta el idioma.', en: 'I have been practicing every day for a few months and I love the language.' }
    ]
  }
];

// Client-side smart grammar and phrasing validator
export function analyzeUserSpanishInput(input: string): {
  feedback: { type: 'correct' | 'warning' | 'tip'; text: string; xpBonus?: number };
  detectedCorrection?: string;
} {
  const clean = input.trim();
  const lower = clean.toLowerCase();

  // Common errors check
  if (/\byo tiene\b/i.test(lower)) {
    return {
      feedback: {
        type: 'warning',
        text: '❌ "Yo tiene" ➔ ✅ "Yo tengo" (Primera persona del verbo tener)'
      },
      detectedCorrection: 'Recuerda: con "yo" decimos "yo tengo".'
    };
  }

  if (/\byo gusta\b/i.test(lower)) {
    return {
      feedback: {
        type: 'warning',
        text: '❌ "Yo gusta" ➔ ✅ "A mí me gusta" (El verbo gustar requiere pronombre indirecto)'
      },
      detectedCorrection: 'En español usamos: "Me gusta" o "A mí me gusta".'
    };
  }

  if (/\bsoy calor\b|\bsoy frío\b/i.test(lower)) {
    return {
      feedback: {
        type: 'warning',
        text: '❌ "Soy calor/frío" ➔ ✅ "Tengo calor/frío" (En español usamos el verbo tener)'
      },
      detectedCorrection: 'Las sensaciones físicas usan "tener": "Tengo calor".'
    };
  }

  // Detect meta-feedback or comments about robotic tone
  const isMetaFeedback = /\b(robotic|robot|same|generic|repetitive|boring|fake|real|human|ai|stop|talk normal|speak normal)\b/i.test(lower);
  if (isMetaFeedback) {
    return {
      feedback: {
        type: 'correct',
        text: '💬 Feedback conversacional procesado',
        xpBonus: 10
      }
    };
  }

  // Detect English or expressions of confusion
  const englishConfusionMatch = /\b(what|understand|heard|repeat|slower|slow|dont|don't|huh|mean|say|saying|speak|how|why|who|where|when|can|could|please|yea|yeah|talk|tell)\b/i.test(lower);
  const isPredominantlyEnglish = englishConfusionMatch || (clean.length > 3 && !/[áéíóúñ¿¡]|(hola|gracias|por favor|bueno|bien|si|no|que|para|por|con|como|donde|cuando)/i.test(lower) && /\b(the|is|are|you|i|my|we|they|he|she|it|to|and|same|robotic)\b/i.test(lower));

  if (isPredominantlyEnglish) {
    return {
      feedback: {
        type: 'warning',
        text: '💡 Expresión en inglés detectada. En español di: "No entiendo" o "¿Puedes repetir?"',
        xpBonus: 5
      },
      detectedCorrection: 'En español: "No entiendo" (I don\'t understand) o "¿Cómo?"'
    };
  }

  if (/\bestoy de acuerdo\b/i.test(lower) || /\bpor favor\b/i.test(lower) || /\bmuchas gracias\b/i.test(lower)) {
    return {
      feedback: {
        type: 'correct',
        text: '✨ ¡Excelente cortesía y modismo natural! +15 XP',
        xpBonus: 15
      }
    };
  }

  if (clean.length > 25 && /[áéíóúñ¿¡]/i.test(clean)) {
    return {
      feedback: {
        type: 'correct',
        text: '🌟 ¡Excelente ortografía y expresión en español! +15 XP',
        xpBonus: 15
      }
    };
  }

  return {
    feedback: {
      type: 'correct',
      text: '🟢 ¡Muy bien dicho! +10 XP',
      xpBonus: 10
    }
  };
}

// Client-side conversational generator for 100% offline & Vercel resilience
export function generateClientSideLingoPalResponse(
  message: string,
  persona: TutorPersona,
  scenarioId: string,
  userLevel: string,
  nativeLang: string
): {
  spanishResponse: string;
  englishExplanation: string;
  arabicExplanation: string;
  analysis?: TutorAnalysis;
  vocabulary: { word: string; en: string; ar: string; contextSentence: string }[];
  followUpQuestions: string[];
} {
  const isArabic = nativeLang === 'ar';
  const lower = message.toLowerCase();

  // Persona name and flavor
  const personaIntro = persona === 'juan'
    ? '¡Órale! '
    : persona === 'sofia'
    ? '¡Qué guay! '
    : persona === 'elena' || persona === 'camila'
    ? '¡Qué más! '
    : '¡Excelente! ';

  const personaName = persona === 'juan'
    ? 'Juan'
    : persona === 'sofia'
    ? 'Sofía'
    : persona === 'elena' || persona === 'camila'
    ? 'Elena'
    : 'el Profesor Mateo';

  // Handling direct meta-feedback on conversational tone
  const isMetaFeedback = /\b(robotic|robot|same|generic|repetitive|boring|fake|real|human|ai|stop|talk normal|speak normal)\b/i.test(lower);
  if (isMetaFeedback) {
    let spanishReply = '';
    let englishExplanation = '';
    let arabicExplanation = '';
    if (persona === 'juan') {
      spanishReply = '¡Jajaja, tienes toda la razón, perdóname! Me puse en modo profesor aburrido. Vamos a hablar normal, como compas de verdad. Dime, ¿qué música te late o qué hiciste hoy?';
      englishExplanation = 'Haha, you are totally right, forgive me! I switched into stiff teacher mode. Let\'s chat normally, like real friends. Tell me, what music do you like or what did you do today?';
      arabicExplanation = isArabic ? 'هههه، معك كامل الحق، اعذرني! تحولت إلى وضع المعلم الممل. لنتحدث بشكل طبيعي كأصدقاء حقيقيين. أخبرني، ما هي الموسيقى التي تحبها أو ماذا فعلت اليوم؟' : '';
    } else if (persona === 'sofia') {
      spanishReply = '¡Ostras, qué razón tienes! Qué vergüenza, parecía un contestador automático. Nada de rollos mecánicos: hablemos de tú a tú como amigos en una terraza. ¿Qué planes tienes o de qué te apetece hablar?';
      englishExplanation = 'You are completely right! How embarrassing, I sounded like an answering machine. No more robotic scripts: let\'s talk like friends hanging out. What are your plans or what do you feel like talking about?';
      arabicExplanation = isArabic ? 'معك حق تماماً! يا للإحراج، بدوت كجهاز رد آلي. دعنا من القوالب الآلية: لنتحدث كأصدقاء. ما هي خططك أو ماذا تحب أن نناقش؟' : '';
    } else if (persona === 'elena' || persona === 'camila') {
      spanishReply = '¡Ay, qué pena contigo! Jajaja, me salió la voz de robot sin querer. Olvidémonos de formalidades y charlemos bien rico. Cuéntame algo de tu vida o de tu comida favorita.';
      englishExplanation = 'Oh, forgive me! Haha, my robot voice slipped out by accident. Let\'s forget formalities and have a nice friendly chat. Tell me about your life or your favorite food.';
      arabicExplanation = isArabic ? 'أعتذر منك بشدة! هههه، خرجت نبرة الروبوت بغير قصد. لننسَ الرسميات ونتحدث بود. أخبرني عن حياتك أو طعامك المفضل.' : '';
    } else {
      spanishReply = '¡Tienes toda la razón! A veces la costumbre pedagógica me hace sonar demasiado formal y rígido. Rompamos el protocolo: conversemos con espontaneidad. ¿Qué tema te apasiona?';
      englishExplanation = 'You are absolutely right! Sometimes academic habit makes me sound overly formal and stiff. Let\'s drop the protocol: let\'s converse with total spontaneity. What topic are you passionate about?';
      arabicExplanation = isArabic ? 'معك حق تماماً! أحياناً العادة الأكاديمية تجعلني أبدو رسمياً وقاسياً. لنكسر الرسميات ولنتحدث بعفوية. ما الموضوع الذي يشغلك؟' : '';
    }

    return {
      spanishResponse: spanishReply,
      englishExplanation,
      arabicExplanation,
      analysis: {
        hasErrors: false,
        score: 100,
        verdict: 'Feedback conversacional procesado',
        feedback_es: '¡Gracias por tu honestidad! Las conversaciones reales fluyen mejor cuando hablamos de forma directa y relajada.',
        feedback_en: 'Thank you for your candid feedback! Real language acquisition thrives when conversation is natural and relaxed.',
        feedback_ar: isArabic ? 'شكراً لصراحتك! المحادثات الحقيقية تكون أفضل عندما نتحدث بارتياح وعفوية.' : undefined,
        corrections: [],
        naturalAlternative: 'Hablemos de forma más natural y relajada.',
        dialectTip: 'En la cultura hispanohablante la cercanía y la naturalidad son muy valoradas.'
      },
      vocabulary: [
        { word: 'compas', en: 'buddies / friends (informal)', ar: 'أصدقاء / رفاق', contextSentence: 'Hablemos como buenos compas.' },
        { word: 'de verdad', en: 'for real / genuine', ar: 'حقيقي / بصدق', contextSentence: 'Una conversación de verdad.' }
      ],
      followUpQuestions: [
        'Hablemos de música o películas. (Let\'s talk about music or movies.)',
        'Cuéntame de tu comida favorita. (Tell me about your favorite food.)',
        '¿Cómo estuvo tu día hoy? (How was your day today?)'
      ]
    };
  }

  // Handling confusion, English input, and requests for clarification
  const isConfusion = /\b(what|understand|heard|repeat|slower|slow|dont|don't|huh|mean|english|say|saying|speak|no entiendo|cómo|mande|repita)\b/i.test(lower) ||
    (!/[áéíóúñ¿¡]|(hola|gracias|por favor|bueno|bien|si|no)/i.test(lower) && /\b(the|is|are|you|i|my|can|could|please|yea|yeah)\b/i.test(lower));

  if (isConfusion) {
    let spanishReply = `${personaIntro}¡No te preocupes, amigo! Es completamente normal no entender a la primera. En español decimos: "No entiendo" o "¿Puedes repetir más despacio?". ¿Quieres que te repita lo anterior?`;
    if (persona === 'sofia') {
      spanishReply = `${personaIntro}¡No pasa nada! Todos nos perdemos al aprender. En España decimos: "¿Cómo?" o "No te he entendido". ¿Quieres que te lo explique de otra forma?`;
    } else if (persona === 'elena' || persona === 'camila') {
      spanishReply = `${personaIntro}¡Tranquilo! En Medellín decimos "¡Qué pena contigo, no te entendí!". Puedes decir: "No entiendo, habla más despacio por favor". ¿Te lo repito con gusto?`;
    } else if (persona === 'mateo') {
      spanishReply = `¡Totalmente comprensible! Cuando experimentes una duda comunicativa, puedes solicitar aclaración diciendo: "Disculpe, no he entendido, ¿podría repetir?". ¿Qué concepto deseas repasar?`;
    }

    return {
      spanishResponse: spanishReply,
      englishExplanation: "Don't worry at all! It's completely normal to get lost. In Spanish, you can say: 'No entiendo' (I don't understand) or '¿Puedes repetir más despacio?' (Can you repeat more slowly?). Let's practice that!",
      arabicExplanation: isArabic ? 'لا تقلق على الإطلاق! هذا طبيعي عند تعلم لغة جديدة. في الإسبانية يمكنك قول "No entiendo" (لا أفهم) أو "¿Puedes repetir más despacio؟" (هل يمكنك التكرار ببطء أكثر؟).' : '',
      analysis: {
        hasErrors: true,
        score: 60,
        verdict: 'Expresión de duda en inglés detectada',
        feedback_es: 'Expresaste duda en inglés. En español para decir que no entendiste usamos "No entiendo" o "¿Puedes repetir?".',
        feedback_en: 'You expressed confusion in English. In Spanish, always use "No entiendo" (I don\'t understand) or "¿Puedes repetir más despacio?" (Can you repeat more slowly?).',
        feedback_ar: isArabic ? 'عبرت عن عدم الفهم بالإنجليزية. في الإسبانية نستخدم "No entiendo" أو "¿Puedes repetir؟".' : undefined,
        corrections: [{
          original: message.trim(),
          correction: 'No entiendo, ¿puedes repetir más despacio?',
          explanation: 'Usa "No entiendo" para "I don\'t understand" y "¿Puedes repetir?" para "Can you repeat?".'
        }],
        naturalAlternative: 'No entiendo, ¿puedes repetir más despacio, por favor?',
        dialectTip: persona === 'juan' ? 'En México se suele decir "¿Mande?" cuando no escuchas o no entiendes algo con educación.' : 'En España se suele decir "¿Cómo?" o "¿Puedes repetir?".'
      },
      vocabulary: [
        { word: 'no entiendo', en: 'I don\'t understand', ar: 'لا أفهم', contextSentence: 'Disculpa, no entiendo la palabra.' },
        { word: 'más despacio', en: 'more slowly', ar: 'ببطء أكثر', contextSentence: '¿Puedes hablar más despacio, por favor?' }
      ],
      followUpQuestions: [
        '¿Puedes hablar más despacio? (Can you speak more slowly?)',
        '¿Qué significa esa palabra? (What does that word mean?)',
        'No entiendo bien, repite por favor. (I don\'t understand well, repeat please.)'
      ]
    };
  }

  // Contextual Name & Self-Introduction handling
  const nameMatch = message.match(/(?:me llamo|mi illamo|mi llamo|soy|nombre es)\s+([A-Za-zÁ-ÿ]+)/i);
  const userName = nameMatch ? nameMatch[1] : '';

  if (userName || lower.includes('llamo') || lower.includes('illamo') || lower.includes('nombre')) {
    const hasMiIllamo = lower.includes('mi illamo') || lower.includes('mi llamo');
    const greeting = userName ? `¡Hola, ${userName}! Mucho gusto.` : '¡Mucho gusto!';
    return {
      spanishResponse: `${personaIntro}${greeting} Yo me llamo ${personaName}. Es un gran placer conversar contigo. ¿De dónde eres y qué te motivó a aprender español?`,
      englishExplanation: `Nice to meet you! My name is ${personaName}. It is a great pleasure to chat with you. Where are you from and what motivated you to learn Spanish?`,
      arabicExplanation: isArabic ? `سررت بلقائك! اسمي ${personaName}. يسعدني جداً التحدث معك. من أين أنت وما الذي شجعك لتعلم الإسبانية؟` : '',
      analysis: hasMiIllamo ? {
        hasErrors: true,
        score: 75,
        verdict: '💡 Consejo nativo',
        feedback_es: 'Hiciste un buen intento comunicativo. En español usamos el pronombre reflexivo "me": "me llamo".',
        feedback_en: 'Good communicative attempt! In Spanish we use the reflexive pronoun "me" (not "mi") and double "ll": "me llamo".',
        feedback_ar: isArabic ? 'محاولة تواصل ممتازة! في الإسبانية نستخدم الضمير الانعكاسي "me" (وليس "mi") مع الحرفين "ll": "me llamo".' : undefined,
        corrections: [{
          original: 'mi illamo',
          correction: 'me llamo',
          explanation: 'El verbo llamarse es reflexivo: "yo me llamo".'
        }],
        naturalAlternative: `¡Hola! Me llamo ${userName || '...'}. Mucho gusto.`,
        dialectTip: 'En todos los países hispanohablantes "me llamo..." es la forma más natural de presentarse.'
      } : {
        hasErrors: false,
        score: 95,
        verdict: '¡Excelente presentación!',
        feedback_es: '¡Excelente estructura y presentación! Tu frase es clara y natural.',
        feedback_en: 'Excellent self-introduction! Your sentence is clear, polite, and natural.',
        feedback_ar: isArabic ? 'تقديم ممتاز للنفس! جملتك واضحة وسليمة وطبيعية.' : undefined,
        corrections: [],
        naturalAlternative: `¡Hola! Me llamo ${userName || '...'}.`,
        dialectTip: 'En español usamos "mucho gusto" o "encantado/a" para responder con cortesía.'
      },
      vocabulary: [
        { word: 'mucho gusto', en: 'nice to meet you', ar: 'سررت بلقائك', contextSentence: '¡Mucho gusto en saludarte!' },
        { word: 'llamarse', en: 'to be called / named', ar: 'يُدعى / يُسمى', contextSentence: 'Me llamo Juan.' }
      ],
      followUpQuestions: [
        'Soy de Egipto / Estados Unidos. (I am from Egypt / USA.)',
        '¿De qué ciudad eres tú? (Which city are you from?)',
        'Estoy aprendiendo español para viajar. (I am learning Spanish to travel.)'
      ]
    };
  }

  // 🥭 MISSION 1: El Mercado de Coyoacán
  if (scenarioId === 'coyoacan_market') {
    const isFruitOrBargain = /kilo|cuánto|cuesta|mango|papaya|fruta|dulce|madur|rebaj|llevar/i.test(lower);
    if (isFruitOrBargain) {
      return {
        spanishResponse: `${personaIntro}¡Ándale, marchante! El mango ataulfo está a 35 pesos el kilo, dulce como miel. Si te llevas dos kilitos, te lo dejo en 60 pesos redondos. ¿Te lo pongo en bolsa?`,
        englishExplanation: 'Step right up! The ataulfo mango is 35 pesos per kilo, sweet like honey. If you take two kilos, I will give it to you for 60 pesos flat. Shall I bag it for you?',
        arabicExplanation: isArabic ? 'أهلاً بك يا محترم! مانجو أتاولفو بـ 35 بيزو للكيلو، حلو كالعسل. إذا أخذت كيلوين، سأحسبهما لك بـ 60 بيزو فقط. هل أضعهما لك في كيس؟' : '',
        analysis: {
          hasErrors: false,
          score: 95,
          verdict: '¡Misión comunicativa en progreso!',
          feedback_es: '¡Negociaste y preguntaste por el producto con excelente cortesía y naturalidad!',
          feedback_en: 'You inquired about the fruit and negotiated with natural native politeness!',
          feedback_ar: isArabic ? 'تفاوضت وسألت عن المنتج بلباقة وعفوية ممتازة!' : undefined,
          corrections: [],
          naturalAlternative: 'Deme dos kilos de mango bien dulce, por favor.',
          dialectTip: 'En los mercados mexicanos, el vendedor te llama afectuosamente "marchante" o "marchantita".'
        },
        vocabulary: [
          { word: 'marchante', en: 'valued customer / client', ar: 'زبون عزيز / مشترٍ', contextSentence: 'Pásele marchante, fruta fresca.' },
          { word: 'ataulfo', en: 'sweet honey mango variety', ar: 'نوع مانجو مكسيكي حلو جداً', contextSentence: 'Un mango ataulfo bien jugoso.' }
        ],
        followUpQuestions: [
          '¡Trato hecho! Póngame dos kilos bien maduros. (Deal! Give me two very ripe kilos.)',
          '¿Me regala una prueba de papaya también? (Could I taste a piece of papaya too?)',
          '¿Acepta tarjeta o sólo efectivo? (Do you accept cards or cash only?)'
        ]
      };
    }

    return {
      spanishResponse: `${personaIntro}Aquí en Coyoacán todo es fresco del día traído de Oaxaca y Veracruz. Huele este mango ataulfo, ¡está en su punto! ¿Quieres que te corte una rebanadita para que lo pruebes?`,
      englishExplanation: 'Here in Coyoacán everything is fresh daily from Oaxaca and Veracruz. Smell this ataulfo mango, it is at its prime! Would you like me to slice a little piece for you to taste?',
      arabicExplanation: isArabic ? 'هنا في كويواكان كل شيء طازج من أواخاكا وفيراكروز. استنشق رائحة هذا المانجو! هل تحب أن أقطع لك شريحة لتتذوقها؟' : '',
      analysis: {
        hasErrors: false,
        score: 90,
        verdict: 'Interacción de mercado lograda',
        feedback_es: 'Muy buena formulación de saludo e interés por los productos.',
        feedback_en: 'Very good greeting and inquiry about local market produce.',
        corrections: [],
        naturalAlternative: message,
        dialectTip: 'En los mercados de México, probar la fruta antes de comprar es costumbre común y bienvenida ("la prueba").'
      },
      vocabulary: [
        { word: 'en su punto', en: 'at its peak ripeness / just right', ar: 'في قمة نضجه / مثالي', contextSentence: 'La fruta está en su punto.' },
        { word: 'rebanada', en: 'slice', ar: 'شريحة', contextSentence: 'Una rebanada de papaya.' }
      ],
      followUpQuestions: [
        '¡Sí, por favor! Me encantaría probarlo. (Yes please! I would love to taste it.)',
        '¿A cómo tiene el kilo hoy? (How much is a kilo today?)',
        '¿Qué otras frutas de temporada me recomienda? (What other seasonal fruits do you recommend?)'
      ]
    };
  }

  // 🏨 MISSION 2: Check-in en el Hotel de Madrid
  if (scenarioId === 'madrid_hotel' || scenarioId === 'hotel') {
    const isQuietOrTowel = /toalla|tranquil|silencio|piso alto|planta alta|alta|falta/i.test(lower);
    if (isQuietOrTowel) {
      return {
        spanishResponse: `${personaIntro}¡Por supuesto que sí! Le he asignado la habitación 504 en la última planta, con vistas al patio interior ajardinado para garantizar máximo silencio. Y sobre la toalla, ya mismo le pido al servicio de habitaciones que le suban un juego completo. ¿Necesita algo más?`,
        englishExplanation: 'Of course! I have assigned you room 504 on the top floor, facing the quiet interior courtyard garden. And regarding the towel, I am immediately sending room service up with a full fresh set. Do you need anything else?',
        arabicExplanation: isArabic ? 'بالتأكيد! لقد خصصت لك الغرفة 504 في الطابق الأخير المطلة على الفناء الداخلي الهادئ. وبالنسبة للمنشفة، طلبت فوراً من خدمة الغرف إحضار طقم كامل. هل تحتاج أي شيء آخر؟' : '',
        analysis: {
          hasErrors: false,
          score: 95,
          verdict: '¡Petición hotelera perfecta!',
          feedback_es: 'Solicitaste la habitación tranquila y reportaste la toalla con una cortesía impecable.',
          feedback_en: 'You requested the quiet room and reported the missing towel with impeccable courtesy.',
          feedback_ar: isArabic ? 'طلبت الغرفة الهادئة وأبلغت عن المنشفة بلباقة وأدب فائقين.' : undefined,
          corrections: [],
          naturalAlternative: 'Preferiría una habitación en planta alta y necesitaría una toalla adicional en el baño, por favor.',
          dialectTip: 'En España se usa "planta" para pisos en edificios y hoteles ("tercera planta", "planta alta").'
        },
        vocabulary: [
          { word: 'planta alta', en: 'high floor / upper story', ar: 'طابق علوي', contextSentence: 'Una habitación en planta alta.' },
          { word: 'servicio de habitaciones', en: 'room service', ar: 'خدمة الغرف', contextSentence: 'Avisaré al servicio de habitaciones.' }
        ],
        followUpQuestions: [
          'Muchísimas gracias por su amabilidad. (Thank you very much for your kindness.)',
          '¿A qué hora se sirve el desayuno mañana? (What time is breakfast served tomorrow?)',
          '¿Tienen servicio de consigna para guardar maletas? (Do you have luggage storage service?)'
        ]
      };
    }

    return {
      spanishResponse: `${personaIntro}He localizado su reserva en el sistema a nombre del titular. La estancia incluye desayuno buffet y conexión wifi de alta velocidad. ¿Tiene alguna preferencia especial para su habitación, como planta o vistas?`,
      englishExplanation: 'I have located your reservation in the system. The stay includes buffet breakfast and high-speed wifi. Do you have any special preferences for your room, such as floor or views?',
      arabicExplanation: isArabic ? 'لقد وجدت حجزك في النظام. تشمل الإقامة بوفيه إفطار وإنترنت سريع. هل لديك أي تفضيلات خاصة للغرفة كالطابق أو الإطلالة؟' : '',
      analysis: {
        hasErrors: false,
        score: 90,
        verdict: 'Registro hotelero en curso',
        feedback_es: 'Registro fluido y profesional.',
        feedback_en: 'Smooth and professional registration turn.',
        corrections: [],
        naturalAlternative: message,
        dialectTip: 'En recepciones formales es estándar emplear fórmulas de usted ("le atiendo", "su estancia").'
      },
      vocabulary: [
        { word: 'estancia', en: 'stay / visit duration', ar: 'إقامة', contextSentence: 'Que disfrute de su estancia.' },
        { word: 'vistas', en: 'views', ar: 'إطلالات', contextSentence: 'Habitación con buenas vistas.' }
      ],
      followUpQuestions: [
        'Preferiría una habitación tranquila en una planta alta. (I would prefer a quiet room on a high floor.)',
        'Noté que falta una toalla en el baño, ¿pueden enviarme una? (I noticed a towel is missing in the bathroom, can you send one?)',
        '¿Dónde está ubicado el ascensor? (Where is the elevator located?)'
      ]
    };
  }

  // 💼 MISSION 3: Entrevista de Trabajo
  if (scenarioId === 'job_interview') {
    const isProfessionalPitch = /experiencia|trabaj|proyect|equipo|desafío|solucion|meta|objetiv|carrera/i.test(lower);
    if (isProfessionalPitch) {
      return {
        spanishResponse: `${personaIntro}Me parece una respuesta sumamente sólida y estructurada. Se aprecia que valoras el impacto colaborativo y la proactividad. En cuanto a nuestros objetivos este año, buscamos expandir nuestras operaciones internacionales con un equipo dinámico. ¿Cómo te ves contribuyendo a esa meta?`,
        englishExplanation: 'That strikes me as a remarkably solid and structured answer. It is clear you value collaborative impact and proactivity. Regarding our goals this year, we aim to expand our international operations with a dynamic team. How do you see yourself contributing to that goal?',
        arabicExplanation: isArabic ? 'إجابة قوية ومنظمة جداً. يتضح تقديرك للعمل التعاوني والمبادرة. بالنسبة لأهدافنا هذا العام، نسعى لتوسيع أعمالنا الدولية بفريق ديناميكي. كيف ترى مساهمتك في ذلك؟' : '',
        analysis: {
          hasErrors: false,
          score: 95,
          verdict: '¡Dominio profesional demostrado!',
          feedback_es: 'Utilizaste un registro formal excelente, coherente y persuasivo para el ámbito laboral.',
          feedback_en: 'You used an excellent, coherent, and persuasive formal register appropriate for professional settings.',
          feedback_ar: isArabic ? 'استخدمت أسلوباً رسمياً ممتازاً ومقنعاً في السياق المهني.' : undefined,
          corrections: [],
          naturalAlternative: 'Cuento con experiencia sólida resolviendo desafíos en equipo y me adapto con rapidez.',
          dialectTip: 'En entrevistas formales en el mundo hispano se combinan la calidez humana y la precisión en los logros alcanzados.'
        },
        vocabulary: [
          { word: 'sumamente', en: 'extremely / highly', ar: 'للغاية / بشكل ملحوظ', contextSentence: 'Una propuesta sumamente clara.' },
          { word: 'proactividad', en: 'proactivity', ar: 'المبادرة والاستباقية', contextSentence: 'Valoramos la proactividad en el equipo.' }
        ],
        followUpQuestions: [
          'Me entusiasma liderar iniciativas y aportar ideas creativas. (I am excited to lead initiatives and contribute creative ideas.)',
          '¿Cuál es el estilo de gestión predominante en el departamento? (What is the predominant management style in the department?)',
          '¿Cuáles serían los siguientes pasos del proceso de selección? (What would be the next steps in the selection process?)'
        ]
      };
    }

    return {
      spanishResponse: `${personaIntro}Nos entusiasma mucho tu interés en formar parte de nuestro equipo. Para conocerte mejor en el ámbito profesional, ¿podrías compartirnos un ejemplo concreto de cómo resolviste una situación desafiante en el pasado?`,
      englishExplanation: 'We are very excited about your interest in joining our team. To get to know you better professionally, could you share a concrete example of how you resolved a challenging situation in the past?',
      arabicExplanation: isArabic ? 'يسعدنا جداً اهتمامك بالانضمام إلى فريقنا. للتعرف عليك مهنياً بشكل أفضل، هل يمكنك مشاركة مثال ملموس عن كيفية تعاملك مع موقف صعب في الماضي؟' : '',
      analysis: {
        hasErrors: false,
        score: 90,
        verdict: 'Interacción formal iniciada',
        feedback_es: 'Inicio de entrevista con registro formal adecuado.',
        feedback_en: 'Interview opening with appropriate formal register.',
        corrections: [],
        naturalAlternative: message,
        dialectTip: 'Usar conectores como "por consiguiente", "en primer lugar" y "asimismo" eleva tu nivel percibido en el DELE B1/B2.'
      },
      vocabulary: [
        { word: 'desafiante', en: 'challenging / demanding', ar: 'مليء بالتحدي', contextSentence: 'Un proyecto desafiante pero gratificante.' },
        { word: 'desempeño', en: 'performance / track record', ar: 'أداء مهني', contextSentence: 'Un alto desempeño laboral.' }
      ],
      followUpQuestions: [
        'He liderado proyectos complejos coordinando equipos multidisciplinarios. (I have led complex projects coordinating multidisciplinary teams.)',
        'Frente a los imprevistos, mantengo la calma y analizo alternativas. (Facing the unexpected, I stay calm and analyze alternatives.)',
        '¿Qué cualidades consideran más importantes para triunfar en este rol? (What qualities do you consider most important to succeed in this role?)'
      ]
    };
  }

  // ☕ CAFE SCENARIO
  if (scenarioId === 'cafe') {
    if (lower.includes('café') || lower.includes('tostada') || lower.includes('leche') || lower.includes('pedir') || lower.includes('favor')) {
      return {
        spanishResponse: `${personaIntro}Perfecto, te lo preparo enseguida con mucho gusto. ¿Lo prefieres con azúcar blanca, morena o prefieres sacarina?`,
        englishExplanation: 'Perfect, I will prepare it for you right away. Do you prefer it with white sugar, brown sugar, or sweetener?',
        arabicExplanation: isArabic ? 'ممتاز، سأجهزه لك فوراً بكل سرور. هل تفضله بسكر أبيض، بني، أم محلي اصطناعي؟' : '',
        analysis: {
          hasErrors: false,
          score: 90,
          verdict: '¡Excelente pedido!',
          feedback_es: '¡Muy bien formulado el pedido en el café! Usaste vocabulario preciso.',
          feedback_en: 'Well formulated cafe request! You used accurate vocabulary.',
          corrections: [],
          naturalAlternative: 'Un café con leche y una tostada, por favor.',
          dialectTip: 'En España se suele pedir "un cortado" o "un café con leche", en México "un americano" o "un café de olla", y en Colombia "un tinto".'
        },
        vocabulary: [
          { word: 'azúcar', en: 'sugar', ar: 'سكر', contextSentence: '¿Le pongo azúcar al café?' },
          { word: 'enseguida', en: 'right away / immediately', ar: 'فوراً / حالاً', contextSentence: 'Te lo traigo enseguida.' }
        ],
        followUpQuestions: [
          'Con azúcar morena, por favor. (With brown sugar, please.)',
          'Sin azúcar, me gusta amargo. (No sugar, I like it bitter.)',
          '¿Tienen leche de avena o almendra? (Do you have oat or almond milk?)'
        ]
      };
    }
    return {
      spanishResponse: `${personaIntro}En este café tenemos una terraza muy agradable. ¿Quieres que nos sentemos afuera para disfrutar del buen tiempo?`,
      englishExplanation: 'In this café we have a very nice outdoor terrace. Would you like to sit outside to enjoy the nice weather?',
      arabicExplanation: isArabic ? 'في هذا المقهى لدينا شرفة خارجية جميلة جداً. هل ترغب بالجلوس في الخارج للاستمتاع بالطقس الجميل؟' : '',
      analysis: {
        hasErrors: false,
        score: 85,
        verdict: 'Conversación fluida',
        feedback_es: 'Buena iniciativa conversacional.',
        feedback_en: 'Good conversational participation.',
        corrections: [],
        naturalAlternative: message,
        dialectTip: 'La terraza es el punto de encuentro social preferido en el mundo hispano.'
      },
      vocabulary: [
        { word: 'terraza', en: 'outdoor terrace / patio', ar: 'شرفة خارجية', contextSentence: 'Nos sentamos en la terraza.' },
        { word: 'agradable', en: 'pleasant / nice', ar: 'لطيف / ممتع', contextSentence: 'El lugar es muy agradable.' }
      ],
      followUpQuestions: [
        '¡Sí, me encanta sentarme en la terraza! (Yes, I love sitting on the terrace!)',
        'Prefiero quedarme dentro, gracias. (I prefer staying inside, thanks.)',
        '¿Nos traes la carta, por favor? (Could you bring us the menu, please?)'
      ]
    };
  }

  // General conversational response
  return {
    spanishResponse: `${personaIntro}Me gusta mucho conversar contigo sobre esto. Se nota tu progreso día a día. ¿Qué opinas si seguimos explorando este tema?`,
    englishExplanation: 'I really enjoy chatting with you about this. Your progress is noticeable day by day. How about we keep exploring this topic?',
    arabicExplanation: isArabic ? 'يسعدني جداً التحدث معك في هذا الموضوع. تقدمك ملحوظ يوماً بعد يوم. ما رأيك أن نواصل؟' : '',
    analysis: {
      hasErrors: false,
      score: 85,
      verdict: 'Conversación en marcha',
      feedback_es: 'Tu mensaje comunica tu idea claramente.',
      feedback_en: 'Your message communicates your idea clearly.',
      corrections: [],
      naturalAlternative: message,
      dialectTip: 'Mantener el flujo conversacional sin miedo al error es la clave para la fluidez.'
    },
    vocabulary: [
      { word: 'progreso', en: 'progress', ar: 'تقدم / تطور', contextSentence: 'Tu progreso es notable.' },
      { word: 'notable', en: 'noticeable / remarkable', ar: 'ملحوظ / لافت', contextSentence: 'Un avance muy notable.' }
    ],
    followUpQuestions: [
      '¡Me parece una excelente idea! (Sounds like an excellent idea to me!)',
      '¿Puedes enseñarme una nueva palabra para esto? (Can you teach me a new word for this?)',
      '¿Cómo lo diría un hispanohablante nativo? (How would a native Spanish speaker say it?)'
    ]
  };
}

// Master caller: fetches `/api/ai/tutor`, with seamless client fallback
export async function sendTutorMessage(params: {
  message: string;
  history: { role: 'user' | 'model'; text: string }[];
  userProgress: UserProgress;
  persona: TutorPersona;
  scenarioId: string;
  practiceTopic?: any;
}): Promise<{
  spanishResponse: string;
  englishExplanation: string;
  arabicExplanation: string;
  phase: string;
  analysis?: TutorAnalysis | null;
  corrections: string[];
  vocabulary: { word: string; en: string; ar: string; contextSentence: string }[];
  followUpQuestions: string[];
  isFallback: boolean;
}> {
  const { message, history, userProgress, persona, scenarioId, practiceTopic } = params;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    const res = await fetch('/api/ai/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        history,
        userLevel: userProgress.currentLevel || 'A1',
        persona,
        scenario: scenarioId,
        nativeLang: userProgress.settings?.nativeLanguage || 'en',
        targetDialect: userProgress.targetDialect || 'mexico',
        practiceTopic
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        if (data && data.spanishResponse) {
          return {
            spanishResponse: data.spanishResponse,
            englishExplanation: data.englishExplanation || '',
            arabicExplanation: data.arabicExplanation || '',
            phase: data.phase || 'Conversación Activa',
            analysis: data.analysis || null,
            corrections: data.corrections || [],
            vocabulary: data.vocabulary || [],
            followUpQuestions: data.followUpQuestions || [],
            isFallback: false
          };
        }
      }
    }
  } catch (err) {
    console.warn('Backend tutor fetch unsuccessful, activating high-fidelity LingoPal engine:', err);
  }

  // Seamless client-side LingoPal engine
  const clientData = generateClientSideLingoPalResponse(
    message,
    persona,
    scenarioId,
    userProgress.currentLevel || 'A1',
    userProgress.settings?.nativeLanguage || 'en'
  );

  return {
    spanishResponse: clientData.spanishResponse,
    englishExplanation: clientData.englishExplanation,
    arabicExplanation: clientData.arabicExplanation,
    phase: 'LingoPal Interactive Session',
    analysis: clientData.analysis || null,
    corrections: ['🟢 Instant conversational feedback active'],
    vocabulary: clientData.vocabulary,
    followUpQuestions: clientData.followUpQuestions,
    isFallback: true
  };
}

/**
 * Real-time Streaming AI Tutor Engine - Vercel Serverless Optimized
 * Streams conversational tokens progressively and handles connection drops gracefully
 */
export async function streamTutorMessage(params: {
  message: string;
  history: { role: 'user' | 'model'; text: string }[];
  userProgress: UserProgress;
  persona: TutorPersona;
  scenarioId: string;
  practiceTopic?: any;
  onChunk?: (partialSpanishText: string) => void;
}): Promise<{
  spanishResponse: string;
  englishExplanation: string;
  arabicExplanation: string;
  phase: string;
  analysis?: TutorAnalysis | null;
  corrections: string[];
  vocabulary: { word: string; en: string; ar: string; contextSentence: string }[];
  followUpQuestions: string[];
  isFallback: boolean;
}> {
  const { message, history, userProgress, persona, scenarioId, practiceTopic, onChunk } = params;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 28000);

    const res = await fetch('/api/ai/tutor-stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        history,
        userLevel: userProgress.currentLevel || 'A1',
        persona,
        scenario: scenarioId,
        nativeLang: userProgress.settings?.nativeLanguage || 'en',
        targetDialect: userProgress.targetDialect || 'mexico',
        practiceTopic
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (res.ok && res.body) {
      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let fullAccumulatedRaw = '';
      let donePayload: any = null;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;
          const dataStr = trimmed.replace(/^data:\s*/, '').trim();
          if (dataStr === '[DONE]') continue;

          try {
            const parsed = JSON.parse(dataStr);
            if (parsed.type === 'token' && parsed.text) {
              fullAccumulatedRaw += parsed.text;
              if (onChunk) onChunk(fullAccumulatedRaw);
            } else if (parsed.type === 'chunk' && parsed.raw) {
              fullAccumulatedRaw += parsed.raw;
              // Extract partial spanishResponse from accumulated raw stream
              const match = fullAccumulatedRaw.match(/"spanishResponse"\s*:\s*"((?:[^"\\]|\\.)*)/);
              if (match && match[1]) {
                const unescaped = match[1].replace(/\\"/g, '"').replace(/\\n/g, '\n');
                if (onChunk) onChunk(unescaped);
              }
            } else if (parsed.type === 'done' && parsed.payload) {
              donePayload = parsed.payload;
              if (onChunk && donePayload.spanishResponse) {
                onChunk(donePayload.spanishResponse);
              }
            }
          } catch (e) {
            // Ignore parse errors on partial chunks
          }
        }
      }

      if (donePayload && donePayload.spanishResponse) {
        return {
          spanishResponse: donePayload.spanishResponse,
          englishExplanation: donePayload.englishExplanation || '',
          arabicExplanation: donePayload.arabicExplanation || '',
          phase: donePayload.phase || 'Conversación Activa',
          analysis: donePayload.analysis || null,
          corrections: donePayload.corrections || ['🟢 Great active participation! +15 XP'],
          vocabulary: donePayload.vocabulary || [],
          followUpQuestions: donePayload.followUpQuestions || [],
          isFallback: false
        };
      }
    }
  } catch (err) {
    console.warn('Streaming tutor response encountered timeout or network interruption, engaging client fallback:', err);
  }

  // Seamless client-side fallback with simulated streaming token typing
  const clientData = generateClientSideLingoPalResponse(
    message,
    persona,
    scenarioId,
    userProgress.currentLevel || 'A1',
    userProgress.settings?.nativeLanguage || 'en'
  );

  if (onChunk) {
    // Simulate natural streaming revelation
    const words = clientData.spanishResponse.split(' ');
    let currentStream = '';
    for (let i = 0; i < words.length; i++) {
      currentStream += (i === 0 ? '' : ' ') + words[i];
      onChunk(currentStream);
      await new Promise(r => setTimeout(r, 20));
    }
  }

  return {
    spanishResponse: clientData.spanishResponse,
    englishExplanation: clientData.englishExplanation,
    arabicExplanation: clientData.arabicExplanation,
    phase: 'LingoPal Interactive Session',
    analysis: clientData.analysis || null,
    corrections: ['🟢 Instant conversational feedback active', '🎉 XP Reward: +15 XP'],
    vocabulary: clientData.vocabulary,
    followUpQuestions: clientData.followUpQuestions,
    isFallback: true
  };
}

