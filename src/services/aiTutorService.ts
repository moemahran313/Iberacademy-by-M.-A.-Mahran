import { TutorPersona, UserProgress } from '../types';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  spanishText: string;
  englishExplanation?: string;
  arabicExplanation?: string;
  phase?: string;
  corrections?: string[];
  vocabulary?: {
    word: string;
    en: string;
    ar: string;
    contextSentence?: string;
  }[];
  followUpQuestions?: string[];
  feedbackBadge?: {
    type: 'correct' | 'warning' | 'tip';
    text: string;
    xpBonus?: number;
  };
  audioAutoPlayed?: boolean;
}

export interface ScenarioDefinition {
  id: string;
  icon: string;
  title_es: string;
  title_en: string;
  title_ar: string;
  difficulty: 'A1' | 'A2' | 'B1' | 'B2';
  category: 'daily' | 'travel' | 'food' | 'work' | 'grammar';
  initialPrompt: Partial<Record<TutorPersona, { es: string; en: string; ar: string }>> & {
    juan: { es: string; en: string; ar: string };
  };
  suggestedReplies: { es: string; en: string }[];
}

export const LINGOPAL_SCENARIOS: ScenarioDefinition[] = [
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
        es: '¡Saludos! Imaginemos que estamos en una cafetería madrileña. ¿Cómo le pedirías un café al camarero?',
        en: 'Greetings! Let us imagine we are in a Madrid café. How would you order a coffee from the waiter?',
        ar: 'تحياتي! لنتخيل أننا في مقهى بمدريد. كيف تطلب قهوة من النادل؟'
      },
      friend: {
        es: '¡Hola! Nos vemos en el café como quedamos. ¿Pido algo para ti?',
        en: 'Hi! We meet at the café as planned. Should I order something for you?',
        ar: 'مرحباً! التقينا في المقهى كما اتفقنا. هل أطلب لك شيئاً؟'
      },
      grammar_doctor: {
        es: '¡Hola! Practiquemos el verbo "querer" y "pedir" en contexto de cafetería. ¿Qué pides?',
        en: 'Hello! Let us practice the verbs "to want" and "to order" at the café. What do you order?',
        ar: 'مرحباً! لنتدرب على فعلي "يريد" و "يطلب" في المقهى.'
      },
      dele_examiner: {
        es: 'Buenos días. En esta prueba de rol, usted está en un café. Ordene su consumición con cortesía.',
        en: 'Good day. In this roleplay task, you are in a café. Order politely.',
        ar: 'صباح الخير. في هذا الاختبار، أنت في مقهى. اطلب بأدب.'
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
        es: '¡Hola, qué onda! Qué gusto conocerte. Yo soy de Oaxaca, México. ¿Y tú, de dónde eres?',
        en: 'Hey, what\'s up! Nice to meet you. I am from Oaxaca, Mexico. And you, where are you from?',
        ar: 'أهلاً، كيف الحال! سعيد بالتعرف عليك. أنا من أواخاكا، المكسيك. وأنت، من أين أنت؟'
      },
      sofia: {
        es: '¡Hola! Me alegro de verte por aquí. Yo vivo en Madrid. Cuéntame, ¿qué tal tu día?',
        en: 'Hi! Glad to see you here. I live in Madrid. Tell me, how has your day been?',
        ar: 'مرحباً! سعيدة برؤيتك هنا. أعيش في مدريد. أخبرني، كيف كان يومك؟'
      },
      mateo: {
        es: '¡Hola! Hoy practicaremos cómo presentarte y hablar de tus aficiones. ¿Cómo te llamas y qué te gusta hacer?',
        en: 'Hello! Today we practice introducing yourself and talking about hobbies. What is your name and what do you like to do?',
        ar: 'مرحباً! اليوم نتدرب على التعريف بالنفس والهوايات. ما اسمك وماذا تحب أن تفعل؟'
      },
      friend: {
        es: '¡Hola! Qué alegría conocerte. ¿Hace cuánto tiempo estás estudiando español?',
        en: 'Hi! So happy to meet you. How long have you been studying Spanish?',
        ar: 'مرحباً! كم مضى عليك وأنت تدرس الإسبانية؟'
      },
      grammar_doctor: {
        es: '¡Hola! Practiquemos las formas de "ser" vs "estar" para presentarte y decir tu origen.',
        en: 'Hello! Let us practice "ser" vs "estar" to introduce yourself and state your origin.',
        ar: 'مرحباً! لنتدرب على صيغتي ser و estar للتعريف بالنفس.'
      },
      dele_examiner: {
        es: 'Por favor, realice una breve presentación personal sobre su ocupación e intereses.',
        en: 'Please give a short personal presentation about your occupation and interests.',
        ar: 'يرجى تقديم تعريف موجز عن نفسك وعملك واهتماماتك.'
      }
    },
    suggestedReplies: [
      { es: '¡Mucho gusto! Estoy aprendiendo español para viajar.', en: 'Nice to meet you! I am learning Spanish to travel.' },
      { es: 'Vivo en una ciudad hermosa y me gusta la música.', en: 'I live in a beautiful city and like music.' },
      { es: 'Llevo unos meses estudiando y me encanta.', en: 'I have been studying for a few months and love it.' }
    ]
  },
  {
    id: 'tacos',
    icon: '🌮',
    title_es: 'Puesto de Tacos',
    title_en: 'Street Food Market',
    title_ar: 'سوق الطعام الشعبي',
    difficulty: 'A2',
    category: 'food',
    initialPrompt: {
      juan: {
        es: '¡Pásele, marchante! Aquí los mejores tacos al pastor y de birria. ¿Cuántos le vamos preparando?',
        en: 'Step right up, friend! Best al pastor and birria tacos here. How many can we get ready for you?',
        ar: 'تفضل يا صديقي! أفضل تاكو باستور وبيريا هنا. كم قطعة نجهز لك؟'
      },
      sofia: {
        es: '¡Vaya pinta tienen estos puestos callejeros! ¿Qué plato típico quieres que probemos juntos?',
        en: 'These street stalls look amazing! Which typical dish do you want to try together?',
        ar: 'هذه الأكشاك تبدو شهية جداً! أي طبق تقليدي ترغب بتجربته معاً؟'
      },
      mateo: {
        es: '¡Excelente! En los mercados hispanos la interacción es viva. Intenta pedir tres cosas usando cantidades.',
        en: 'Excellent! In Hispanic markets interactions are lively. Try ordering 3 items using quantities.',
        ar: 'ممتاز! في الأسواق الشعبية يكون الحديث حيوياً. جرب طلب 3 أشياء مستخدماً الكميات.'
      },
      friend: {
        es: '¡Tengo muchísima hambre! Este puesto de comida huele delicioso. ¿Qué pedimos?',
        en: 'I am so hungry! This food stall smells delicious. What should we order?',
        ar: 'أنا جائع جداً! رائحة هذا الكشك شهية. ماذا نطلب؟'
      },
      grammar_doctor: {
        es: 'Practiquemos vocabulario de alimentos y pronombres de objeto directo: "¿Me los preparas?"',
        en: 'Let us practice food vocabulary and direct object pronouns.',
        ar: 'لنتدرب على مفردات الطعام وضمائر المفعول به.'
      },
      dele_examiner: {
        es: 'Simule una compra en un mercado de alimentos expresando preferencias y preguntando precios.',
        en: 'Simulate a food market purchase expressing preferences and inquiring about prices.',
        ar: 'قم بمحاكاة الشراء في سوق طعام مع التعبير عن التفضيل والسؤال عن الأسعار.'
      }
    },
    suggestedReplies: [
      { es: 'Deme tres tacos de pastor con todo, por favor.', en: 'Give me three pastor tacos with everything, please.' },
      { es: '¿La salsa roja pica mucho o es suave?', en: 'Is the red salsa very spicy or mild?' },
      { es: '¿Cuánto cuesta cada taco y qué bebida tienen?', en: 'How much is each taco and what drinks do you have?' }
    ]
  },
  {
    id: 'hotel',
    icon: '🏨',
    title_es: 'En el Hotel',
    title_en: 'Hotel Check-in',
    title_ar: 'تسجيل الدخول في الفندق',
    difficulty: 'A2',
    category: 'travel',
    initialPrompt: {
      juan: {
        es: '¡Buenas tardes! Bienvenido a nuestro hotel. ¿Tiene una reservación hecha o busca habitación?',
        en: 'Good afternoon! Welcome to our hotel. Do you have a reservation or are you looking for a room?',
        ar: 'مساء الخير! مرحباً بك في فندقنا. هل لديك حجز مسبق أم تبحث عن غرفة؟'
      },
      sofia: {
        es: '¡Hola! Llegamos por fin al hotel tras el viaje. Ayúdame con la recepción, por favor.',
        en: 'Hi! We finally arrived at the hotel after the trip. Help me at reception, please.',
        ar: 'مرحباً! وصلنا أخيراً إلى الفندق بعد السفر. ساعدني عند الاستقبال.'
      },
      mateo: {
        es: 'Bienvenido. Practiquemos el lenguaje formal y de cortesía para el registro en un hotel.',
        en: 'Welcome. Let us practice formal language and courtesy markers for hotel registration.',
        ar: 'مرحباً. لنتدرب على لغة الأدب واللباقة في الفندق.'
      },
      friend: {
        es: '¡Qué bonito es este hotel! Pregunta al recepcionista si tienen piscina y desayuno incluido.',
        en: 'How nice this hotel is! Ask the receptionist if they have a pool and included breakfast.',
        ar: 'ما أجمل هذا الفندق! اسأل موظف الاستقبال إن كان هناك مسبح وإفطار مشمول.'
      },
      grammar_doctor: {
        es: 'Practicaremos oraciones de cortesía con "quisiera" y "sería posible".',
        en: 'We will practice courtesy phrases with "quisiera" and "sería posible".',
        ar: 'سنتدرب على أساليب الطلب المؤدب مثل "أود" و "هل من الممكن".'
      },
      dele_examiner: {
        es: 'Comuníquese con el recepcionista para solucionar una incidencia con su reserva.',
        en: 'Communicate with the receptionist to resolve a reservation issue.',
        ar: 'تواصل مع موظف الاستقبال لحل مشكلة في حجزك.'
      }
    },
    suggestedReplies: [
      { es: 'Sí, tengo una reserva a mi nombre para tres noches.', en: 'Yes, I have a reservation in my name for three nights.' },
      { es: '¿A qué hora se sirve el desayuno por las mañanas?', en: 'What time is breakfast served in the mornings?' },
      { es: '¿La habitación cuenta con wifi de alta velocidad?', en: 'Does the room have high-speed wifi?' }
    ]
  },
  {
    id: 'airport',
    icon: '✈️',
    title_es: 'En el Aeropuerto',
    title_en: 'At the Airport',
    title_ar: 'في المطار',
    difficulty: 'B1',
    category: 'travel',
    initialPrompt: {
      juan: {
        es: '¡Buenos días! Mostrador de vuelos internacionales. ¿Hacia dónde viaja hoy y me permite su pasaporte?',
        en: 'Good morning! International flight desk. Where are you flying to today and may I see your passport?',
        ar: 'صباح الخير! مكتب الرحلات الدولية. إلى أين تسافر اليوم، وهل تسمح بجواز سفرك؟'
      },
      sofia: {
        es: '¡Uf, el aeropuerto está lleno! Debemos facturar el equipaje rápido. ¿Tienes los billetes a mano?',
        en: 'Phew, the airport is packed! We need to check luggage quickly. Do you have the tickets handy?',
        ar: 'يا إلهي، المطار مزدحم! علينا شحن الحقائب بسرعة. هل التذاكر معك؟'
      },
      mateo: {
        es: 'Situación de viaje: facturación y control de seguridad. Responde con precisión a las preguntas del agente.',
        en: 'Travel situation: check-in and security. Answer the agent\'s questions with precision.',
        ar: 'موقف السفر: تسجيل الأمتعة والأمن. أجب بدقة على أسئلة الموظف.'
      },
      friend: {
        es: '¡Qué emoción viajar juntos! ¿Llevas maleta de mano o vas a facturar?',
        en: 'So exciting to travel together! Do you have hand luggage or will you check a bag?',
        ar: 'كم هو رائع أن نسافر معاً! هل معك حقيبة يد أم ستشحن حقيبة؟'
      },
      grammar_doctor: {
        es: 'Practiquemos verbos de movimiento y preposiciones espaciales: hacia, hasta, en la puerta.',
        en: 'Let us practice verbs of motion and prepositions of place.',
        ar: 'لنتدرب على أفعال الحركة وحروف الجر الدالة على المكان.'
      },
      dele_examiner: {
        es: 'Usted ha perdido una maleta en la terminal. Reclame formalmente en el mostrador.',
        en: 'You have lost a bag at the terminal. File a formal claim at the counter.',
        ar: 'لقد فقدت حقيبة في المطار. قدم بلاغاً رسمياً عند المكتب.'
      }
    },
    suggestedReplies: [
      { es: 'Viajo a Madrid y solo llevo esta maleta de mano.', en: 'I am traveling to Madrid and only carrying this hand bag.' },
      { es: '¿A qué hora comienza el embarque de mi vuelo?', en: 'What time does boarding start for my flight?' },
      { es: '¿Podría darme un asiento junto a la ventana?', en: 'Could you give me a window seat, please?' }
    ]
  },
  {
    id: 'job_interview',
    icon: '💼',
    title_es: 'Entrevista Laboral',
    title_en: 'Job Interview',
    title_ar: 'مقابلة عمل',
    difficulty: 'B2',
    category: 'work',
    initialPrompt: {
      juan: {
        es: 'Bienvenido a nuestra empresa. Gracias por tu interés. Para comenzar, ¿qué te motivó a postularte?',
        en: 'Welcome to our company. Thank you for your interest. To start, what motivated you to apply?',
        ar: 'مرحباً بك في شركتنا. شكراً لاهتمامك. للبدء، ما الذي دفعك للتقدم لهذه الوظيفة؟'
      },
      sofia: {
        es: 'Hola, un placer. Hemos revisado tu perfil y nos parece muy interesante. ¿Cómo describirías tus mayores fortalezas?',
        en: 'Hello, a pleasure. We reviewed your profile and find it very interesting. How would you describe your greatest strengths?',
        ar: 'مرحباً، يسعدني لقاؤك. راجعنا ملفك ووجدناه مشوقاً. كيف تصف أبرز نقاط قوتك؟'
      },
      mateo: {
        es: 'Iniciamos la simulación de entrevista profesional. Utiliza conectores formales y tiempos compuestos.',
        en: 'We begin the professional interview simulation. Use formal discourse markers and compound tenses.',
        ar: 'نبدأ محاكاة المقابلة المهنية. استخدم روابط الكلام الرسمية والأزمنة المركبة.'
      },
      friend: {
        es: '¡Tranquilo, lo harás genial en tu entrevista! Practiquemos: ¿cómo responderás si te preguntan por tu experiencia?',
        en: 'Relax, you\'ll do great in your interview! Let\'s practice: how will you answer about your experience?',
        ar: 'اطمئن، ستبلي بلاءً حسناً! لنتدرب: كيف ستجيب إذا سألوك عن خبرتك؟'
      },
      grammar_doctor: {
        es: 'Enfócate en el pretérito perfecto ("he trabajado") y el subjuntivo de opinión ("no creo que sea").',
        en: 'Focus on present perfect and subjunctive of opinion.',
        ar: 'ركز على الماضي التام وصيغة Subjuntivo للتعبير عن الرأي.'
      },
      dele_examiner: {
        es: 'Defienda ante el tribunal su idoneidad para liderar un proyecto internacional.',
        en: 'Defend your suitability to lead an international project before the panel.',
        ar: 'دافع أمام اللجنة عن مدى ملاءمتك لقيادة مشروع دولي.'
      }
    },
    suggestedReplies: [
      { es: 'He trabajado en proyectos internacionales y disfruto del trabajo en equipo.', en: 'I have worked on international projects and enjoy teamwork.' },
      { es: 'Me apasiona resolver problemas y aprender nuevas herramientas rápidamente.', en: 'I love solving problems and learning new tools quickly.' },
      { es: '¿Cuáles son los objetivos principales para este puesto este año?', en: 'What are the main objectives for this role this year?' }
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
    : persona === 'camila'
    ? '¡Qué chévere! '
    : '¡Excelente! ';

  if (scenarioId === 'cafe') {
    if (lower.includes('café') || lower.includes('tostada') || lower.includes('leche') || lower.includes('pedir') || lower.includes('favor')) {
      return {
        spanishResponse: `${personaIntro}Perfecto, te lo preparo enseguida. ¿Lo prefieres con azúcar blanca, morena o prefieres sacarina?`,
        englishExplanation: 'Perfect, I will prepare it for you right away. Do you prefer it with white sugar, brown sugar, or sweetener?',
        arabicExplanation: 'ممتاز، سأجهزه لك فوراً. هل تفضله بسكر أبيض، بني، أم محلي اصطناعي؟',
        vocabulary: [
          { word: 'azúcar', en: 'sugar', ar: 'سكر', contextSentence: '¿Le pongo azúcar al café?' },
          { word: 'enseguida', en: 'right away / immediately', ar: 'فوراً / حالاً', contextSentence: 'Te lo traigo enseguida.' }
        ],
        followUpQuestions: [
          'Con azúcar morena, por favor. (With brown sugar, please.)',
          'Sin azúcar, me gusta amargo. (No sugar, I like it bitter.)',
          '¿Tienen sacarina o estevia? (Do you have sweetener or stevia?)'
        ]
      };
    }
    return {
      spanishResponse: `${personaIntro}En este café tenemos una terraza muy agradable. ¿Quieres que nos sentemos afuera para disfrutar del buen tiempo?`,
      englishExplanation: 'In this café we have a very nice outdoor terrace. Would you like to sit outside to enjoy the nice weather?',
      arabicExplanation: 'في هذا المقهى لدينا شرفة خارجية جميلة جداً. هل ترغب بالجلوس في الخارج؟',
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

  if (scenarioId === 'tacos') {
    return {
      spanishResponse: `${personaIntro}Aquí servimos los tacos al momento con tortillas recién hechas. ¿Te gustaría ponerles un poco de limón y guacamole?`,
      englishExplanation: 'Here we serve tacos fresh on the spot with freshly made tortillas. Would you like to add some lime and guacamole?',
      arabicExplanation: 'هنا نقدم التاكو طازجاً مع خبز التورتيلا الطازج. هل تحب إضافة القليل من الليمون والغواكامولي؟',
      vocabulary: [
        { word: 'recién', en: 'freshly / just now', ar: 'طازج / تواً', contextSentence: 'Tortillas recién hechas.' },
        { word: 'guacamole', en: 'avocado dip', ar: 'صلصة الأفوكادو', contextSentence: 'Un poco de guacamole sabroso.' }
      ],
      followUpQuestions: [
        'Sí, con mucho limón y guacamole. (Yes, with lots of lime and guacamole.)',
        '¿Tienen refrescos mexicanos fríos? (Do you have cold Mexican sodas?)',
        '¿Cuánto es la cuenta en total? (How much is the total bill?)'
      ]
    };
  }

  if (scenarioId === 'hotel') {
    return {
      spanishResponse: `${personaIntro}He registrado sus datos en el sistema. La habitación incluye toallas limpias, minibar y vistas panorámicas. ¿Desea servicio de despertador por la mañana?`,
      englishExplanation: 'I have registered your details in the system. The room includes clean towels, minibar, and panoramic views. Would you like a morning wake-up call?',
      arabicExplanation: 'سجلت بياناتك في النظام. تشمل الغرفة مناشف نظيفة ومشروبات وإطلالة بانورامية. هل ترغب في خدمة الإيقاظ صباحاً؟',
      vocabulary: [
        { word: 'registrado', en: 'registered / checked in', ar: 'مسجّل', contextSentence: 'Sus datos están registrados.' },
        { word: 'despertador', en: 'alarm / wake-up call', ar: 'منبه / خدمة إيقاظ', contextSentence: 'Servicio de despertador a las 8.' }
      ],
      followUpQuestions: [
        'Sí, por favor, a las ocho de la mañana. (Yes, please, at eight in the morning.)',
        'No, usaré la alarma de mi teléfono móvil. (No, I will use my phone alarm.)',
        '¿Dónde está la piscina y el gimnasio? (Where are the pool and gym?)'
      ]
    };
  }

  // General conversational response
  return {
    spanishResponse: `${personaIntro}Me gusta mucho conversar contigo sobre esto. Se nota tu progreso día a día. ¿Qué opinas si seguimos explorando este tema?`,
    englishExplanation: 'I really enjoy chatting with you about this. Your progress is noticeable day by day. How about we keep exploring this topic?',
    arabicExplanation: 'يسعدني جداً التحدث معك في هذا الموضوع. تقدمك ملحوظ يوماً بعد يوم. ما رأيك أن نواصل؟',
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
  corrections: string[];
  vocabulary: { word: string; en: string; ar: string; contextSentence: string }[];
  followUpQuestions: string[];
  isFallback: boolean;
}> {
  const { message, history, userProgress, persona, scenarioId, practiceTopic } = params;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

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
            phase: data.phase || 'Conversational Turn',
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
  corrections: string[];
  vocabulary: { word: string; en: string; ar: string; contextSentence: string }[];
  followUpQuestions: string[];
  isFallback: boolean;
}> {
  const { message, history, userProgress, persona, scenarioId, practiceTopic, onChunk } = params;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9500);

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
      let accumulatedText = '';
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
              accumulatedText += parsed.text;
              if (onChunk) onChunk(accumulatedText);
            } else if (parsed.type === 'chunk' && parsed.raw) {
              // Extract partial spanishResponse if available in raw stream
              const match = parsed.raw.match(/"spanishResponse"\s*:\s*"([^"]*)/);
              if (match && match[1]) {
                accumulatedText = match[1];
                if (onChunk) onChunk(accumulatedText);
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
          phase: donePayload.phase || 'Conversational Turn',
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
    // Simulate high-speed natural streaming revelation
    const words = clientData.spanishResponse.split(' ');
    let currentStream = '';
    for (let i = 0; i < words.length; i++) {
      currentStream += (i === 0 ? '' : ' ') + words[i];
      onChunk(currentStream);
      await new Promise(r => setTimeout(r, 25));
    }
  }

  return {
    spanishResponse: clientData.spanishResponse,
    englishExplanation: clientData.englishExplanation,
    arabicExplanation: clientData.arabicExplanation,
    phase: 'LingoPal Interactive Session',
    corrections: ['🟢 Instant conversational feedback active', '🎉 XP Reward: +15 XP'],
    vocabulary: clientData.vocabulary,
    followUpQuestions: clientData.followUpQuestions,
    isFallback: true
  };
}

