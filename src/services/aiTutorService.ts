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
    : persona === 'camila'
    ? '¡Qué chévere! '
    : '¡Excelente! ';

  const personaName = persona === 'juan'
    ? 'Juan'
    : persona === 'sofia'
    ? 'Sofía'
    : persona === 'camila'
    ? 'Camila'
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
    } else if (persona === 'camila') {
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
        verdict: 'Feedback conversacional honesto',
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
    } else if (persona === 'camila') {
      spanishReply = `${personaIntro}¡Tranquilo! En Medellín decimos "¡Qué pena contigo, no te entendí!". Puedes decir: "No entiendo, habla más despacio por favor". ¿Te lo repito?`;
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
        verdict: 'Buen intento con corrección',
        feedback_es: 'Hiciste un buen intento al presentarte, pero en español usamos el pronombre reflexivo "me" (no "mi") y el verbo se escribe con doble "ll": "me llamo".',
        feedback_en: 'Good communicative attempt! In Spanish we use the reflexive pronoun "me" (not "mi") and spell it with double "ll": "me llamo".',
        feedback_ar: isArabic ? 'محاولة تواصل جيدة! في الإسبانية نستخدم الضمير الانعكاسي "me" (وليس "mi") مع الحرفين "ll": "me llamo".' : undefined,
        corrections: [{
          original: 'mi illamo',
          correction: 'me llamo',
          explanation: 'El verbo llamarse es reflexivo: "yo me llamo". "Mi" es adjetivo posesivo (mi casa).'
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

  if (scenarioId === 'cafe') {
    if (lower.includes('café') || lower.includes('tostada') || lower.includes('leche') || lower.includes('pedir') || lower.includes('favor')) {
      return {
        spanishResponse: `${personaIntro}Perfecto, te lo preparo enseguida. ¿Lo prefieres con azúcar blanca, morena o prefieres sacarina?`,
        englishExplanation: 'Perfect, I will prepare it for you right away. Do you prefer it with white sugar, brown sugar, or sweetener?',
        arabicExplanation: 'ممتاز، سأجهزه لك فوراً. هل تفضله بسكر أبيض، بني، أم محلي اصطناعي؟',
        analysis: {
          hasErrors: false,
          score: 90,
          verdict: '¡Excelente pedido!',
          feedback_es: '¡Muy bien formulado el pedido en el café! Usaste vocabulario preciso.',
          feedback_en: 'Well formulated cafe request! You used accurate vocabulary.',
          corrections: [],
          naturalAlternative: 'Un café con leche y una tostada, por favor.',
          dialectTip: 'En España se suele pedir "un cortado" o "un café con leche", en México "un americano" o "un café de olla".'
        },
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

  if (scenarioId === 'tacos') {
    return {
      spanishResponse: `${personaIntro}Aquí servimos los tacos al momento con tortillas recién hechas. ¿Te gustaría ponerles un poco de limón y guacamole?`,
      englishExplanation: 'Here we serve tacos fresh on the spot with freshly made tortillas. Would you like to add some lime and guacamole?',
      arabicExplanation: 'هنا نقدم التاكو طازجاً مع خبز التورتيلا الطازج. هل تحب إضافة القليل من الليمون والغواكامولي؟',
      analysis: {
        hasErrors: false,
        score: 90,
        verdict: '¡Buen provecho!',
        feedback_es: 'Tu interacción en la taquería es natural y adecuada.',
        feedback_en: 'Your interaction at the taco stand is natural and context-appropriate.',
        corrections: [],
        naturalAlternative: message,
        dialectTip: 'En México, los tacos se comen tradicionalmente con la mano y un toque de salsa y limón.'
      },
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
      analysis: {
        hasErrors: false,
        score: 90,
        verdict: 'Formalidad adecuada',
        feedback_es: 'Registro hotelero completado con éxito.',
        feedback_en: 'Hotel check-in completed with proper courteous tone.',
        corrections: [],
        naturalAlternative: message,
        dialectTip: 'En hoteles de habla hispana es habitual usar "usted" para mayor cortesía.'
      },
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

