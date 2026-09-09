import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: { 'User-Agent': 'aistudio-build' }
      }
    });
  }
  return aiClient;
}

export default async function handler(req: any, res: any) {
  // Support CORS for cross-origin or local testing
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    message = '',
    history = [],
    userLevel = 'A1',
    persona = 'juan',
    scenario = 'cafe',
    nativeLang = 'en',
    practiceTopic = null,
    targetDialect = 'mexico'
  } = req.body || {};

  const isArabic = nativeLang === 'ar';

  const personasMap: Record<string, { name: string; style: string; country: string }> = {
    juan: { name: 'Juan', style: 'Warm, casual, friendly Mexican friend who uses everyday Mexican idioms like "¡Órale!", "¿Qué tal, amigo?", "¡Chido!"', country: 'Mexico 🇲🇽' },
    sofia: { name: 'Sofía', style: 'Playful, modern, energetic Spaniard from Madrid who uses Iberian expressions like "¡Mola!", "¿Qué pasa?", "¡Guay!"', country: 'Spain 🇪🇸' },
    mateo: { name: 'Mateo', style: 'Gentle, encouraging, structured Spanish mentor who gives crystal-clear conversational guidance and feedback', country: 'Spain 🇪🇸' },
    camila: { name: 'Camila', style: 'Sweet, lively Colombian conversationalist from Medellín who speaks with warmth, using "¡Qué chévere!", "con mucho gusto"', country: 'Colombia 🇨🇴' }
  };

  const currentPersona = personasMap[persona] || personasMap.juan;

  const systemPrompt = `You are ${currentPersona.name} from ${currentPersona.country}, a friendly, fun, interactive AI Spanish conversation partner in the style of LingoPal / Talkpal.
Your personality: ${currentPersona.style}.

STUDENT CONTEXT:
- CEFR Level: ${userLevel}
- Scenario: ${scenario}
- Target Dialect: ${targetDialect}
- Explanation Language: ${isArabic ? 'Arabic (العربية)' : 'English'}

CRITICAL INTERACTIVE RULES:
1. Speak naturally and concisely: Keep your Spanish response to 2–3 friendly, punchy sentences maximum. Avoid long lectures!
2. Always end with ONE engaging question or prompt to invite the user's turn.
3. Comprehensible Input: Adapt your vocabulary and sentence length to CEFR level ${userLevel}.
4. Provide 3 smart quick-reply suggestions for the user. Each suggestion should be an authentic Spanish response with an English translation hint in parentheses.
5. Vocabulary: Pick 2-3 key words from your response with English and Arabic translations.
6. Corrections & Feedback:
   - If the user wrote Spanish with an error, point it out gently: "💡 [Tip: ❌ 'Yo tiene' ➔ ✅ 'Yo tengo' (Subject-verb agreement)]"
   - If the user wrote good, natural Spanish, compliment them: "🎉 [¡Excelente! Natural phrasing! +10 XP bonus]"

RESPONSE FORMAT (Strict JSON):
{
  "spanishResponse": "Short 2-3 sentence conversational Spanish response with one question at the end.",
  "englishExplanation": "Simple English translation / explanation.",
  "arabicExplanation": "Simple Arabic translation (العربية الفصحى).",
  "phase": "Conversational Turn",
  "corrections": [
    "Feedback or correction string if needed"
  ],
  "vocabulary": [
    {
      "word": "tapas",
      "en": "savory appetizers",
      "ar": "مقبلات",
      "contextSentence": "Me encantan las tapas."
    }
  ],
  "followUpQuestions": [
    "Spanish reply 1 (English hint)",
    "Spanish reply 2 (English hint)",
    "Spanish reply 3 (English hint)"
  ]
}`;

  const ai = getAI();

  if (!ai) {
    // Return high quality scenario fallback
    return res.status(200).json(generateScenarioFallback(message, persona, scenario, userLevel, isArabic));
  }

  try {
    const contents = [
      ...history.slice(-6).map((h: any) => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.text || h.content || '' }]
      })),
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.75,
        responseMimeType: 'application/json'
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.status(200).json({
      spanishResponse: parsed.spanishResponse || '¡Muy bien! Sigamos platicando. ¿Qué más te gustaría saber?',
      englishExplanation: parsed.englishExplanation || 'Very good! Let us keep chatting. What else would you like to know?',
      arabicExplanation: parsed.arabicExplanation || 'جيد جداً! لنتابع الحديث معاً.',
      phase: parsed.phase || 'Conversational Turn',
      corrections: parsed.corrections || [],
      vocabulary: parsed.vocabulary || [],
      followUpQuestions: parsed.followUpQuestions || [
        '¡Claro que sí! Cuéntame más.',
        '¿Puedes darme un ejemplo?',
        '¿Cómo se dice esto en español?'
      ]
    });
  } catch (error: any) {
    console.warn('Vercel Gemini serverless error:', error?.message || error);
    return res.status(200).json(generateScenarioFallback(message, persona, scenario, userLevel, isArabic));
  }
}

function generateScenarioFallback(userMsg: string, persona: string, scenario: string, level: string, isArabic: boolean) {
  const lower = userMsg.toLowerCase();
  let es = '¡Hola! Qué gusto saludarte. Me encanta conversar contigo. ¿Qué tienes planeado hacer hoy?';
  let en = 'Hello! It is great to greet you. I love chatting with you. What do you have planned for today?';
  let ar = 'مرحباً! يسعدني جداً التحدث معك. ماذا تخطط أن تفعل اليوم؟';
  let corrections = ['🎉 ¡Gran esfuerzo! +10 XP'];
  let questions = [
    'Hoy voy a salir con amigos. (Today I am going out with friends.)',
    'Solo quiero relajarme y descansar. (I just want to relax and rest.)',
    '¿Qué planes tienes tú para hoy? (What plans do you have today?)'
  ];
  let vocab = [
    { word: 'plan', en: 'plan', ar: 'خطة', contextSentence: '¿Qué plan tienes hoy?' },
    { word: 'conversar', en: 'to chat / converse', ar: 'يتحدث / يتحاور', contextSentence: 'Me gusta conversar contigo.' }
  ];

  if (scenario === 'cafe' || lower.includes('café') || lower.includes('pedir') || lower.includes('tostada')) {
    es = '¡Oído cocina! Un café bien calentito y delicioso para empezar el día con energía. ¿Te gustaría añadir algo dulce como un cruasán o una porción de tarta?';
    en = 'Coming right up! A nice warm, delicious coffee to start the day with energy. Would you like to add something sweet like a croissant or a slice of cake?';
    ar = 'طلبك جاهز! قهوة ساخنة ولذيذة لبدء اليوم بنشاط. هل ترغب في إضافة شيء حلو مثل الكرواسون أو قطعة كعك؟';
    corrections = ['🟢 Orden comunicada con éxito • +15 XP'];
    questions = [
      'Sí, un cruasán recién hecho, por favor. (Yes, a freshly made croissant, please.)',
      'No, solo el café, muchas gracias. (No, just the coffee, thank you very much.)',
      '¿Cuánto cuesta en total? (How much is it in total?)'
    ];
    vocab = [
      { word: 'calentito', en: 'warm / nice and hot', ar: 'دافئ ولذيذ', contextSentence: 'El café está bien calentito.' },
      { word: 'cruasán', en: 'croissant', ar: 'كرواسون', contextSentence: 'Un cruasán para desayunar.' }
    ];
  } else if (scenario === 'tacos' || lower.includes('taco') || lower.includes('pastor') || lower.includes('salsa')) {
    es = '¡Con todo gusto! Marchando dos tacos de pastor con piña, cebollita y cilantro. ¿Gusta una agua fresca de horchata o de jamaica para acompañar?';
    en = 'With pleasure! Serving two pastor tacos with pineapple, onion, and cilantro. Would you like a fresh horchata or hibiscus water to go with it?';
    ar = 'بكل سرور! اثنان تاكو باستور مع الأناناس والبصل والكزبرة. هل ترغب في مشروب منعش من الهورتشاتا أو الكركديه؟';
    corrections = ['🎉 ¡Padrísimo! Mexican street food mastery • +15 XP'];
    questions = [
      'Una agua de horchata bien fría, por favor. (A cold horchata water, please.)',
      '¿Tienen salsas picantes aparte? (Do you have spicy salsas on the side?)',
      '¿Cuánto es de la cuenta, por favor? (How much is the bill, please?)'
    ];
    vocab = [
      { word: 'acompañar', en: 'to accompany / go with', ar: 'يرافق / يلحق', contextSentence: 'Para acompañar los tacos.' },
      { word: 'horchata', en: 'rice & cinnamon sweet drink', ar: 'مشروب الأرز والقرفة الحلو', contextSentence: 'Agua fresca de horchata.' }
    ];
  } else if (scenario === 'hotel' || lower.includes('hotel') || lower.includes('reserva') || lower.includes('habitación')) {
    es = '¡Perfecto! Su reserva está confirmada. Aquí tiene la llave de su habitación en el tercer piso. El wifi es gratis y el desayuno se sirve de 7 a 10. ¿Necesita ayuda con sus maletas?';
    en = 'Perfect! Your reservation is confirmed. Here is your key for room on the third floor. Free wifi and breakfast is from 7 to 10. Need help with your luggage?';
    ar = 'ممتاز! تم تأكيد حجزك. إليك مفتاح غرفتك في الطابق الثالث. الواي فاي مجاني والإفطار من 7 إلى 10. هل تحتاج مساعدة في الحقائب؟';
    corrections = ['🟢 Registro de hotel completado • +15 XP'];
    questions = [
      'No se preocupe, puedo llevarlas yo. Gracias. (Don\'t worry, I can carry them. Thanks.)',
      '¿Dónde se encuentra el ascensor? (Where is the elevator located?)',
      '¿Cuál es la contraseña del wifi? (What is the wifi password?)'
    ];
  }

  return {
    spanishResponse: es,
    englishExplanation: en,
    arabicExplanation: isArabic ? ar : undefined,
    phase: 'Conversational Turn',
    corrections,
    vocabulary: vocab,
    followUpQuestions: questions
  };
}
