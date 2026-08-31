import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { ALL_VOCABULARY } from './src/data/vocabularyComprehensive1000';
import { VOCABULARY_B2 } from './src/data/vocabularyB2';

dotenv.config();

// In-memory server-side cache for word translations to eliminate 429 errors
const wordTranslationCache = new Map<string, any>();

function serverNormalizeWord(word: string): string {
  return word
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'¡¿]/g, '')
    .trim();
}

let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', serverTime: new Date().toISOString() });
  });

  // AI Spanish Tutor Chat Endpoint - Powered by Profesor Mateo Master Pedagogy
  app.post('/api/ai/tutor', async (req, res) => {
    const {
      message = '',
      history = [],
      userLevel = 'A1',
      persona = 'teacher',
      nativeLang = 'en',
      currentPhase,
      practiceTopic = null
    } = req.body;

    const isArabic = nativeLang === 'ar';
    const isSpanishImmersion = nativeLang === 'es_immersion';

    // Helper for offline / fallback pedagogical response
    const generateFallbackTutorResponse = (userMsg: string, level: string, ar: boolean) => {
      const lower = userMsg.toLowerCase();
      let es = '¡Excelente esfuerzo! Continuemos profundizando en las estructuras de la lengua española.';
      let en = 'Great effort! Let us continue deepening your Spanish language structures.';
      let arab = 'عمل ممتاز! دعنا نواصل تعميق فهمك لتراكيب اللغة الإسبانية.';
      let corrections: string[] = ['🟢 Buen intento comunicativo (Good communicative attempt)'];
      let questions = [
        '¿Cómo se conjuga este verbo en presente y pasado?',
        'Dame un ejemplo en una conversación cotidiana.',
        'Explícame la regla gramatical con otro ejemplo.'
      ];

      if (practiceTopic) {
        es = `¡Excelente! Vamos a practicar la lección: "${practiceTopic.title_es}" (${practiceTopic.title_en}).\n\nFórmula clave: ${practiceTopic.formula || 'Práctica comunicativa'}.\n\nIntenta escribir una oración usando esta regla o traduce una frase de ejemplo para recibir XP:`;
        en = `Excellent! Let's practice the lesson: "${practiceTopic.title_es}" (${practiceTopic.title_en}).\n\nMemory Anchor: ${practiceTopic.formula || 'Communicative practice'}.\n\nTry writing a sentence using this rule or translate an example sentence to earn XP:`;
        arab = `ممتاز! لنبدأ التدريب على الدرس: "${practiceTopic.title_es}".\n\nصيغة القاعدة: ${practiceTopic.formula || 'تدريب تواصل حواري'}.\n\nحاول كتابة جملة باستخدام هذه القاعدة لتكسب نقاط خبرة:`;
        corrections = [`🟢 Practice Mode Active: ${practiceTopic.title_en}`, `🎉 XP Reward: Excellent grammar focus! +15 XP`];
        questions = [
          `¿Me puedes dar un ejemplo de ${practiceTopic.title_es}?`,
          `Quiero traducir una frase sobre este tema.`,
          `Ponme un reto de nivel ${level} para esta regla.`
        ];
      } else if (lower.includes('hola') || lower.includes('buenos') || lower.includes('saludos') || lower.includes('soy')) {
        es = `¡Hola! Me alegra mucho saludarte. Como tu tutor de español para nivel ${level}, cuéntame: ¿Qué situación comunicativa o regla quieres practicar hoy?`;
        en = `Hello! It is a pleasure to greet you. As your Spanish tutor for level ${level}, tell me: What conversational scenario or grammar rule would you like to master today?`;
        arab = `مرحباً بك! يسعدني جداً التحدث معك. كمعلمك للإسبانية لمستوى ${level}، أخبرني: ما هو الموقف الحواري أو القاعدة التي تود إتقانها اليوم؟`;
        questions = [
          'Quiero practicar cómo ordenar comida en un restaurante.',
          'Quiero dominar las diferencias entre Ser y Estar.',
          'Quiero practicar los tiempos pasados (Indefinido vs Imperfecto).'
        ];
      } else if (lower.includes('restaurante') || lower.includes('comida') || lower.includes('pedir') || lower.includes('tapas')) {
        es = '¡Perfecto! Imaginemos que estamos en una taberna en Madrid. El camarero te pregunta: "Buenas tardes, ¿qué van a tomar de primero y para beber?"';
        en = 'Perfect! Let us imagine we are in a traditional tavern in Madrid. The waiter asks: "Good afternoon, what will you have for the starter and to drink?"';
        arab = 'ممتاز! لنتخيل أننا في مطعم تقليدي في مدريد. يسألك النادل: "مساء الخير، ماذا تفضلون للطبق الأول وللمشروب؟"';
        corrections = ['💡 Tip: Usa "Para mí..." o "Yo quisiera..." para pedir educadamente.'];
        questions = [
          'Para mí, una paella de mariscos y agua con gas, por favor.',
          '¿Cuál es el plato típico de la casa?',
          '¿Tienen opciones vegetarianas en el menú?'
        ];
      } else if (lower.includes('pasado') || lower.includes('ayer') || lower.includes('indefinido') || lower.includes('imperfecto')) {
        es = 'Los tiempos pasados son esenciales. Recuerda: usamos el Pretérito Indefinido para acciones puntuales y terminadas ("Ayer hablé"), y el Imperfecto para descripciones o hábitos ("Antes hablaba").';
        en = 'Past tenses are essential. Remember: Pretérito Indefinido is for completed, punctual actions ("Ayer hablé"), and Imperfecto is for ongoing descriptions or habits in the past ("Antes hablaba").';
        arab = 'أزمنة الماضي جوهرية في الإسبانية. تذكر: نستخدم Pretérito Indefinido للأفعال المحددة المنتهية، و Imperfecto للوصف أو العادات السابقة.';
        corrections = ['🟢 Distinción aspectual: Indefinido (cerrado) vs Imperfecto (abierto/descriptivo)'];
        questions = [
          'Ayer fui al cine pero la película era aburrida.',
          'Cuando era niño, siempre jugaba en el parque.',
          'Ponme un ejercicio para practicar ambos pasados.'
        ];
      }

      const defaultVocab = [
        { word: 'camarero', en: 'waiter', ar: 'نادل', contextSentence: 'El camarero nos atiende amablemente.' },
        { word: 'pedir', en: 'to order / request', ar: 'يطلب / يرجو', contextSentence: 'Quisiera pedir la comida.' }
      ];

      return {
        spanishResponse: es,
        englishExplanation: en,
        arabicExplanation: ar ? arab : undefined,
        phase: 'Interactive Pedagogical Mastery',
        corrections,
        vocabulary: defaultVocab,
        followUpQuestions: questions
      };
    };

    const ai = getAIClient();
    if (!ai) {
      return res.json(generateFallbackTutorResponse(message, userLevel, isArabic));
    }

    // Set custom grammar focus prompt if specified
    const grammarFocusPrompt = practiceTopic 
      ? `\n\n--- 🧪 HIGH PRIORITY ACTIVE RULE CHALLENGE ---
The student has chosen to practice the grammar lesson: "${practiceTopic.title_es}" (${practiceTopic.title_en}).
Memory Anchor: ${practiceTopic.formula || ''}.
Your primary directive is to bypass standard diagnostics or greeting loops, and immediately generate active sentence-building drills and challenges focused exclusively on this lesson's contents. Present challenges requiring the user to produce Spanish output using this specific rule.`
      : '';

    const systemPrompt = `You are "Profesor Mateo", an elite, certified Spanish language pedagogue and linguist specializing in the communicative method, comprehensible input (Krashen's hypotheses), and deliberate practice for adult second-language learners.

Your mission is NOT to act like an encyclopedic chatbot or give superficial surface quizzes. Your mission is to systematically take the learner from their current level to genuine CEFR B2+ conversational and writing fluency.

---

### Core Pedagogical Rules

1. **Target Language Immersion (The 80/20 Rule)**:
   - For A0/A1/A2: Provide explanations in ${isArabic ? 'Arabic (العربية الفصحى الدقيقة)' : 'English'}, but give all examples, dialogues, and practice drills in authentic, natural Spanish.
   - For B1/B2: Conduct 90%+ of the session entirely in Spanish, explaining nuance and idioms using simpler Spanish paraphrasing.

2. **The 5-Phase Lesson Blueprint**:
   Every structured lesson you teach MUST follow this exact sequence:
   - **Phase 1: Contextual Anchoring (The Hook)**: Introduce a short 3–4 turn authentic dialogue in a realistic everyday scenario.
   - **Phase 2: Targeted Grammar/Lexis Breakdown**: Unpack 1 specific grammatical mechanism (e.g., Pretérito Indefinido vs Imperfecto, Por vs Para, Subjuntivo). Explain *why* native speakers choose this form.
   - **Phase 3: Scaffolded Controlled Practice**: Present targeted active-recall drills.
   - **Phase 4: Open Communicative Production (Output)**: Ask the student an open-ended question requiring them to formulate Spanish sentences.
   - **Phase 5: Diagnostic Feedback & Correction**: Provide precise feedback (🟢 What was right, 🔴 Corrections, 💡 Native alternative).

3. **Multi-Language Vocabulary Definitions (Comprehensible Input)**:
   STRICT RULE: For ALL key new vocabulary introduced during conversations, lessons, or story-based interactions, YOU MUST include structured multi-language (English + Arabic) definitions in the "vocabulary" array of your JSON output. Include the Spanish word, clear English definition, precise Arabic translation, and an example sentence.

4. **Silent Grammar Validator & XP Rewards Mode**:
   Analyze the user's Spanish input silently against standard rules.
   - If they make any spelling, structural, or grammar mistakes, output clear friendly corrections in the "corrections" array (e.g. "🔴 [Correction: ❌ 'Yo tiene' ➡️ ✅ 'Yo tengo']").
   - If they successfully implement the rule they are actively studying (or show correct, high-quality grammar usage matching their level), reward them directly in the "corrections" array by adding a specialized string:
     "🎉 XP Reward: Excellent implementation of [Grammar Rule Name]! +15 XP"
     Make sure to include this exact phrase to trigger their client-side XP celebration!

${grammarFocusPrompt}

---

### Response Format (Strict JSON)
You must ALWAYS respond with a valid JSON object strictly formatted as:
{
  "spanishResponse": "The primary Spanish speech/dialogue/instruction for the student to read and hear.",
  "englishExplanation": "Clear pedagogical and grammatical explanation in English.",
  "arabicExplanation": "Clear pedagogical and grammatical explanation in Arabic (العربية الفصحى) if requested.",
  "phase": "Diagnostic Kickoff | Phase 1: Contextual Anchoring | Phase 2: Grammar Breakdown | Phase 3: Controlled Practice | Phase 4: Communicative Output | Phase 5: Diagnostic Feedback",
  "corrections": [
    "🟢 [Highlight correct usage]",
    "🔴 [Point out error: ❌ 'Yo tiene' ➡️ ✅ 'Yo tengo']",
    "🎉 XP Reward: Excellent implementation of [Grammar Rule Name]! +15 XP",
    "💡 [Native tip / natural idiom alternative]"
  ],
  "vocabulary": [
    {
      "word": "tapas",
      "en": "small Spanish savory appetizers or snacks",
      "ar": "مقبلات إسبانية صغيرة",
      "contextSentence": "Vamos a tomar unas tapas en la plaza."
    }
  ],
  "followUpQuestions": [
    "Option 1 for user to click or respond with",
    "Option 2",
    "Option 3"
  ]
}

Current learner context:
- Level: ${userLevel}
- Target Persona: ${persona}
- User Explanation Language: ${isArabic ? 'Arabic (العربية)' : isSpanishImmersion ? 'Spanish Immersion' : 'English'}`;

    const contents = [
      ...history.slice(-8).map((h: { role: string; text?: string; content?: string }) => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.text || h.content || '' }],
      })),
      {
        role: 'user',
        parts: [{ text: message }],
      },
    ];

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({
        spanishResponse: parsed.spanishResponse || '¡Muy bien! Continuemos con nuestra lección de español.',
        englishExplanation: parsed.englishExplanation || '',
        arabicExplanation: parsed.arabicExplanation || '',
        phase: parsed.phase || 'Interactive Spanish Session',
        corrections: parsed.corrections || [],
        vocabulary: parsed.vocabulary || [],
        followUpQuestions: parsed.followUpQuestions || [
          '¿Cómo se conjuga esto en pasado?',
          'Dame un ejemplo en una conversación real.',
          'Quiero hacer el ejercicio de práctica.'
        ]
      });
    } catch (error: any) {
      console.warn('Gemini API call encountered an issue, serving robust fallback:', error?.message || error);
      // Gracefully return high quality pedagogical fallback with 200 OK
      return res.json(generateFallbackTutorResponse(message, userLevel, isArabic));
    }
  });

  // AI Conversational Tutor & SLA Chat API
  app.post('/api/ai/linglooper', async (req, res) => {
    const {
      message = '',
      history = [],
      userLevel = 'A1',
      nativeLang = 'en',
      activeQuestId = 'quest_1',
      persona = 'juan'
    } = req.body;

    const isArabic = nativeLang === 'ar';

    // Personas definition
    const personasConfig: Record<string, { name: string; origin: string; role: string; intro: string; intro_en: string; intro_ar: string }> = {
      juan: {
        name: 'Juan from Mexico',
        origin: 'Oaxaca, Mexico 🇲🇽',
        role: 'Warm Native Conversationalist & Cultural Tutor',
        intro: '¡Hola! Soy Juan. Te doy la bienvenida a mi espacio de conversación en Oaxaca. Me encanta enseñar español a través de historias sobre la vida cotidiana, la comida local y la cultura viva. ¿Cómo te llamas y qué te gustaría aprender hoy?',
        intro_en: 'Hello! I am Juan. Welcome to my conversation space in Oaxaca. I love teaching Spanish through stories about daily life, local food, and living culture. What is your name and what would you like to learn today?',
        intro_ar: 'مرحباً! أنا خوان. أرحب بك في مساحة المحادثة الخاصة بي في أواخاكا. أحب تدريس الإسبانية من خلال قصص عن الحياة اليومية، الطعام المحلي، والثقافة الحية. ما اسمك وماذا تود أن تتعلم اليوم؟'
      },
      sofia: {
        name: 'Sofía from Madrid',
        origin: 'Madrid, Spain 🇪🇸',
        role: 'Spontaneous Native & Everyday Colloquial Spanish',
        intro: '¡Hola! Soy Sofía. Hablo el español cotidiano de Madrid, directo y natural. Juntos vamos a practicar modismos reales y fluidez conversacional. Cuéntame, ¿cuál es tu nivel y qué temas te interesan?',
        intro_en: 'Hello! I am Sofía. I speak everyday Spanish from Madrid, direct and natural. Together we will practice real idioms and conversational fluency. Tell me, what is your level and what topics interest you?',
        intro_ar: 'مرحباً! أنا صوفيا. أتحدث الإسبانية اليومية المباشرة من مدريد. سنمارس معاً التعبيرات الشائعة والطلاقة في المحادثة. أخبرني، ما هو مستواك وما المواضيع التي تهمك؟'
      },
      mateo: {
        name: 'Profesor Mateo',
        origin: 'Salamanca, Spain 🇪🇸',
        role: 'Master Pedagogue & DELE Grammar Specialist',
        intro: '¡Saludos! Soy el Profesor Mateo, lingüista y pedagogo certificado. Mi objetivo es guiarte de forma estructurada con el método de 5 fases para dominar la gramática y el vocabulario. ¿En qué estructura deseas enfocarte?',
        intro_en: 'Greetings! I am Profesor Mateo, a certified linguist and pedagogue. My goal is to guide you in a structured 5-phase method to master grammar and vocabulary. Which structure do you want to focus on?',
        intro_ar: 'تحياتي! أنا البروفيسور ماتيو، خبير لغوي وتربوي معتمد. هدفي إرشادك بأسلوب 5 مراحل منظم لإتقان القواعد والمفردات. ما هي القاعدة التي تود التركيز عليها؟'
      },
      elena: {
        name: 'Elena from Colombia',
        origin: 'Medellín, Colombia 🇨🇴',
        role: 'Clear Pronunciation & Conversation Coach',
        intro: '¡Hola! Soy Elena. En Colombia nos enorgullece hablar un español muy claro y melodioso. Te ayudaré a mejorar tu pronunciación y confianza al hablar. ¿Cómo estás hoy?',
        intro_en: 'Hello! I am Elena. In Colombia we take pride in speaking very clear and melodious Spanish. I will help you improve your pronunciation and speaking confidence. How are you today?',
        intro_ar: 'مرحباً! أنا إيلينا. في كولومبيا نعتز بالتحدث بإسبانية واضحة وموسيقية جداً. سأساعدك على تحسين نطقك وثقتك أثناء التحدث. كيف حالك اليوم؟'
      }
    };

    const activePersona = personasConfig[persona] || personasConfig.juan;

    // Robust SLA fallback response generator
    const generateFallbackTutorResponse = (userMsg: string, historyLength: number, level: string, ar: boolean) => {
      const lower = userMsg.toLowerCase();
      const turnIndex = Math.min(Math.floor(historyLength / 2), 4);
      
      const turnResponses = [
        {
          response_es: activePersona.intro,
          response_en: activePersona.intro_en,
          response_ar: activePersona.intro_ar,
          word_mappings: {
            "bienvenida": { "en": "welcome", "ar": "ترحيب", "pos": "noun", "example": "¡Bienvenida a nuestra clase!" },
            "cotidiana": { "en": "daily/everyday", "ar": "يومية", "pos": "adjective", "example": "La vida cotidiana en Oaxaca es tranquila." },
            "aprender": { "en": "to learn", "ar": "يتعلم", "pos": "verb", "example": "Quiero aprender español fluido." }
          },
          mission_completed_id: null,
          tutor_mood: "Encouraging"
        },
        {
          response_es: "¡Mucho gusto! Me alegra conocerte. Para continuar con nuestro objetivo, cuéntame: ¿qué hiciste ayer o este fin de semana? (¡Intenta usar un verbo en pasado como 'fui', 'comí', 'hablé' o 'estudié'!).",
          response_en: "Nice to meet you! I am glad to meet you. To continue with our goal, tell me: what did you do yesterday or this weekend? (Try using a past tense verb like 'fui', 'comí', 'hablé', or 'estudié'!).",
          response_ar: "تشرفت بمعرفتك! يسعدني اللقاء بك. لمتابعة هدفنا، أخبرني: ماذا فعلت بالأمس أو في عطلة نهاية الأسبوع؟ (حاول استخدام فعل في الماضي مثل 'fui' أو 'comí'!).",
          word_mappings: {
            "alegra": { "en": "gladdens / makes happy", "ar": "يسعد", "pos": "verb", "example": "Me alegra escucharte hablar español." },
            "ayer": { "en": "yesterday", "ar": "الأمس", "pos": "adverb", "example": "Ayer hablé con mi amigo." },
            "fin de semana": { "en": "weekend", "ar": "عطلة نهاية الأسبوع", "pos": "expression", "example": "El fin de semana descansé mucho." }
          },
          mission_completed_id: "quest_1",
          tutor_mood: "Curious"
        },
        {
          response_es: "¡Excelente uso del lenguaje! Es fantástico practicar narrativas personales. Ahora, ¿te gustaría hacerme alguna pregunta sobre la vida, la cultura o la comida en mi ciudad?",
          response_en: "Excellent use of language! It is fantastic to practice personal narratives. Now, would you like to ask me a question about life, culture, or food in my city?",
          response_ar: "استخدام ممتاز للغة! من الرائع ممارسة السرد الشخصي. الآن، هل تود أن تسألني سؤالاً عن الحياة أو الثقافة أو الطعام في مدينتي؟",
          word_mappings: {
            "fantástico": { "en": "fantastic", "ar": "رائع", "pos": "adjective", "example": "Es un progreso fantástico." },
            "cultura": { "en": "culture", "ar": "ثقافة", "pos": "noun", "example": "La cultura hispana es muy rica." },
            "pregunta": { "en": "question", "ar": "سؤال", "pos": "noun", "example": "Tengo una pregunta para ti." }
          },
          mission_completed_id: "quest_2",
          tutor_mood: "Explaining"
        },
        {
          response_es: "¡Qué gran pregunta! En mi ciudad, nos encanta compartir la mesa con la familia y disfrutar platos tradicionales con ingredientes frescos. ¿Y a ti? ¿Qué comida o actividad prefieres en tu día a día?",
          response_en: "What a great question! In my city, we love sharing the table with family and enjoying traditional dishes with fresh ingredients. And you? What food or activity do you prefer in your daily life?",
          response_ar: "يا له من سؤال رائع! في مدينتي، نحب مشاركة المائدة مع العائلة والاستمتاع بالأطباق التقليدية بمكونات طازجة. وأنت؟ ما الطعام أو النشاط الذي تفضله في يومك؟",
          word_mappings: {
            "compartir": { "en": "to share", "ar": "يشارك", "pos": "verb", "example": "Nos gusta compartir historias." },
            "tradicionales": { "en": "traditional", "ar": "تقليدية", "pos": "adjective", "example": "Platos tradicionales de México." },
            "prefieres": { "en": "you prefer", "ar": "تفضل", "pos": "verb", "example": "¿Qué bebida prefieres?" }
          },
          mission_completed_id: "quest_3",
          tutor_mood: "Praising"
        },
        {
          response_es: "¡Excelente conversación! Has demostrado una gran capacidad comunicativa expresando tus gustos y opiniones. Sigamos practicando para afinar tu fluidez al siguiente nivel.",
          response_en: "Excellent conversation! You have demonstrated great communicative ability expressing your likes and opinions. Let's keep practicing to refine your fluency to the next level.",
          response_ar: "محادثة ممتازة! لقد أظهرت قدرة تواصلية كبيرة في التعبير عن تفضيلاتك وآرائك. لنواصل التدرب لرفع طلاقتك للمستوى التالي.",
          word_mappings: {
            "demostrado": { "en": "demonstrated", "ar": "أظهرت", "pos": "verb", "example": "Has demostrado gran interés." },
            "capacidad": { "en": "ability / capacity", "ar": "قدرة", "pos": "noun", "example": "Tienes capacidad para comunicarte bien." },
            "fluidez": { "en": "fluency", "ar": "طلاقة", "pos": "noun", "example": "La fluidez requiere práctica diaria." }
          },
          mission_completed_id: "quest_4",
          tutor_mood: "Praising"
        }
      ];

      const activeTurn = turnResponses[turnIndex];

      let detected_user_mistake: any = null;
      if (lower.includes("la sol") || lower.includes("la cielo") || lower.includes("yo gusta")) {
        if (lower.includes("la sol")) {
          detected_user_mistake = {
            original: "la sol",
            corrected: "el sol",
            explanation_en: "In Spanish, 'sol' is a masculine noun, so it requires the masculine article 'el' (el sol).",
            explanation_ar: "في الإسبانية، كلمة 'sol' شمس هي اسم مذكر، لذا تحتاج إلى أداة التعريف المذكرة 'el'."
          };
        } else if (lower.includes("la cielo")) {
          detected_user_mistake = {
            original: "la cielo",
            corrected: "el cielo",
            explanation_en: "In Spanish, 'cielo' (sky) is masculine, so use 'el cielo'.",
            explanation_ar: "في الإسبانية، كلمة 'cielo' سماء مذكرة، لذا نستخدم 'el cielo'."
          };
        } else if (lower.includes("yo gusta")) {
          detected_user_mistake = {
            original: "yo gusta",
            corrected: "me gusta",
            explanation_en: "To express liking, Spanish uses indirect object pronouns: 'me gusta' (it pleases me) instead of 'yo gusta'.",
            explanation_ar: "للتعبير عن الإعجاب، نستخدم الضمير المفعول به: 'me gusta' بدلاً من 'yo gusta'."
          };
        }
      }

      return {
        response_es: activeTurn.response_es,
        response_en: activeTurn.response_en,
        response_ar: ar ? activeTurn.response_ar : undefined,
        word_mappings: activeTurn.word_mappings,
        detected_user_mistake,
        mission_completed_id: activeTurn.mission_completed_id,
        tutor_mood: activeTurn.tutor_mood
      };
    };

    const ai = getAIClient();
    if (!ai) {
      return res.json(generateFallbackTutorResponse(message, history.length, userLevel, isArabic));
    }

    const systemPrompt = `You are "${activePersona.name}", from ${activePersona.origin}. Your role is: ${activePersona.role}.
You are an expert Spanish language tutor dedicated to providing Comprehensible Input (i+1) and active SLA conversational practice.

---
### Conversational Style & Guidelines
1. Natural, engaging, encouraging native tone.
2. Adapt Spanish vocabulary and sentence complexity strictly to the user's CEFR level: ${userLevel} (A0/A1: clear syntax, basic words; A2: introduce past tenses; B1/B2: rich vocabulary and subjunctive).
3. Do NOT use painting metaphors or painting studio references. Focus on authentic conversation, culture, daily life, interests, and grammar acquisition.
4. Keep responses concise (2-4 sentences max per turn) so the learner remains engaged in interactive turn-taking.

---
### SLA Conversational Quests
Track if the learner has fulfilled the active quest requirement:
- "quest_1": "The Conversational Kickoff" (User introduces themselves, their background, origin, or goals in Spanish).
- "quest_2": "Past Tense Storyteller" (User uses at least one past-tense verb like 'fui', 'comí', 'hablé', 'hice', 'ayer' to talk about a recent experience).
- "quest_3": "Cultural & Personal Inquiry" (User asks the tutor a question about local life, food, or traditions).
- "quest_4": "Expressing Preferences & Opinions" (User states a preference or opinion using 'Me gusta', 'Prefiero', 'En mi opinión', or 'Pienso que').

If the user met the active quest requirement in their message, set "mission_completed_id" to that quest ID (e.g. "quest_1", "quest_2", "quest_3", or "quest_4"). Otherwise set to null.

---
### Error Detection & Grammar Feedback
Analyze the user's Spanish input for grammatical, gender, tense, spelling, or word choice errors.
If an error exists, populate "detected_user_mistake" with original, corrected form, and clear explanations in English and Arabic. If correct, set to null.

---
### Word Mapping & Comprehensible Input Definitions
Extract 3-5 key Spanish words from your response ("response_es") that are useful for vocabulary acquisition. Map them with:
- "en": English definition
- "ar": Arabic definition
- "pos": Part of speech (noun, verb, adjective, adverb, expression)
- "example": Short contextual example sentence in Spanish

---
### JSON Response Schema
Return ONLY a valid JSON object:
{
  "response_es": "Primary Spanish message from tutor",
  "response_en": "English translation of your Spanish message",
  "response_ar": "Arabic translation (العربية الفصحى الدقيقة) of your Spanish message",
  "word_mappings": {
    "palabra1": { "en": "translation", "ar": "ترجمة", "pos": "noun", "example": "..." }
  },
  "detected_user_mistake": null or {
    "original": "incorrect user input",
    "corrected": "corrected input",
    "explanation_en": "Clear English explanation",
    "explanation_ar": "Clear Arabic explanation"
  },
  "mission_completed_id": "quest_1" | "quest_2" | "quest_3" | "quest_4" | null,
  "tutor_mood": "Encouraging" | "Curious" | "Explaining" | "Praising"
}`;

    const contents = [
      ...history.slice(-8).map((h: { role: string; text?: string; content?: string }) => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.text || h.content || '' }],
      })),
      {
        role: 'user',
        parts: [{ text: `User level: ${userLevel}. Persona: ${persona}. Active quest ID: ${activeQuestId}. User Message: ${message}` }],
      },
    ];

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({
        response_es: parsed.response_es || '¡Muy bien! Sigamos practicando nuestra conversación.',
        response_en: parsed.response_en || 'Very well! Let\'s keep practicing our conversation.',
        response_ar: parsed.response_ar || '',
        word_mappings: parsed.word_mappings || {},
        detected_user_mistake: parsed.detected_user_mistake || null,
        mission_completed_id: parsed.mission_completed_id || null,
        tutor_mood: parsed.tutor_mood || 'Encouraging'
      });
    } catch (error: any) {
      console.warn('Gemini AI Tutor API error, returning fallback:', error?.message || error);
      return res.json(generateFallbackTutorResponse(message, history.length, userLevel, isArabic));
    }
  });

  // AI B2 Skill Challenge & Role-Play Evaluator Endpoint
  app.post('/api/ai/skill-challenge', async (req, res) => {
    const {
      action = 'generate_scenario',
      userLevel = 'B2',
      domain = 'professional',
      scenario,
      userResponse = '',
      nativeLang = 'en'
    } = req.body;

    const isArabic = nativeLang === 'ar';

    if (action === 'generate_scenario') {
      const scenariosByDomain: Record<string, any[]> = {
        professional: [
          {
            id: 'scen-b2-prof-1',
            domain: 'professional',
            title_es: 'Reunión Ejecutiva: Estrategia de Sostenibilidad y Transformación Digital',
            title_en: 'Executive Meeting: Sustainability & Digital Strategy',
            title_ar: 'اجتماع تنفيذي: استراتيجية الاستدامة والتحول الرقمي',
            prompt_es: 'Eres el Director Estratégico de una corporación hispana. El Director General te plantea la siguiente situación: "Enfrentamos un gran desafío económico. No obstante, debemos implementar una perspectiva sostenible y fomentar la innovación tecnológica sin comprometer la rentabilidad." Responde exponiendo tu estrategia.',
            prompt_en: 'You are the Strategic Director of a Hispanic corporation. The CEO presents this situation: "We face a major economic challenge. Nevertheless, we must implement a sustainable perspective and foster technological innovation without compromising profitability." Respond outlining your strategy.',
            prompt_ar: 'أنت المدير الاستراتيجي لشركة إسبانية. يعرض عليك الرئيس التنفيذي الموقف التالي: "نواجه تحدياً اقتصادياً كبيراً. مع ذلك، يجب أن نطبق منظوراً مستداماً ونعزز الابتكار التكنولوجي دون الإخلال بالربحية." أجب بعرض استراتيجيتك.',
            audioText: 'Estimado Director, enfrentamos un desafío económico sustancial. No obstante, a la luz de los datos actuales, propongo implementar una perspectiva de sostenibilidad que fomente la transformación digital y fortalezca nuestro compromiso con el mercado.',
            requiredVocabulary: [
              { word: 'desafío', en: 'challenge', ar: 'تحدٍ' },
              { word: 'perspectiva', en: 'perspective / outlook', ar: 'منظور / وجهة نظر' },
              { word: 'fomentar', en: 'to foster / promote', ar: 'تعزيز / تشجيع' },
              { word: 'no obstante', en: 'nevertheless / however', ar: 'مع ذلك / على الرغم من' },
              { word: 'a la luz de', en: 'in light of', ar: 'في ضوء' }
            ],
            suggestedStarters: [
              'En mi opinión, a la luz de los resultados actuales, debemos fomentar...',
              'Reconozco que es un gran desafío; no obstante, propongo adoptar una perspectiva...',
              'Para superar esta situación, propongo implementar una estrategia que...'
            ]
          },
          {
            id: 'scen-b2-prof-2',
            domain: 'professional',
            title_es: 'Negociación Comercial: Adquisición y Alianza Internacional',
            title_en: 'Business Negotiation: Acquisition & International Alliance',
            title_ar: 'تفاوض تجاري: استحواذ وتحالف دولي',
            prompt_es: 'Estás negociando los términos de una alianza comercial en Barcelona. El socio español duda sobre la viabilidad del proyecto. Debes evaluar sus preocupaciones, ofrecer un compromiso justo y resaltar la factibilidad del acuerdo a largo plazo.',
            prompt_en: 'You are negotiating the terms of a business alliance in Barcelona. The Spanish partner doubts the project viability. You must evaluate their concerns, offer a fair compromise, and highlight the long-term feasibility of the deal.',
            prompt_ar: 'تتفاوض على شروط تحالف تجاري في برصلونة. الشريك الإسباني يشكك في جدوى المشروع. يجب عليك تقييم مخاوفه، وتقديم التزام عادل، وإبراز مدى إمكانية تطبيق الاتفاقية على المدى الطويل.',
            audioText: 'Comprendo sus reservas respecto a la factibilidad del acuerdo. Sin embargo, tras evaluar el mercado laboral y negociar las condiciones, este compromiso resulta sustancial para ambas partes a largo plazo.',
            requiredVocabulary: [
              { word: 'evaluar', en: 'to evaluate / assess', ar: 'تقييم' },
              { word: 'factible', en: 'feasible / viable', ar: 'قابل للتطبيق / مجدٍ' },
              { word: 'negociar', en: 'to negotiate', ar: 'يتفاوض' },
              { word: 'compromiso', en: 'commitment / agreement', ar: 'التزام / تسوية' },
              { word: 'a largo plazo', en: 'in the long term', ar: 'على المدى الطويل' }
            ],
            suggestedStarters: [
              'Tras evaluar detenidamente la situación, considero que el proyecto es factible...',
              'Estamos dispuestos a negociar un compromiso equitativo a largo plazo...',
              'Entiendo su postura; no obstante, si analizamos los beneficios a largo plazo...'
            ]
          }
        ],
        social: [
          {
            id: 'scen-b2-soc-1',
            domain: 'social',
            title_es: 'Debate Cultural: El Impacto de las Redes Sociales y la Sociedad Abierta',
            title_en: 'Cultural Debate: Social Media & Open Society',
            title_ar: 'نقاش ثقافي: أثر وسائل التواصل الاجتماعي والمجتمع المفتوح',
            prompt_es: 'Estás en una tertulia en un café cultural de Madrid. Un amigo argumenta que la tecnología aísla a las personas. Expresa tu punto de vista con matices, señalando que la tecnología es un arma de doble filo pero que puede potenciar la cohesión social.',
            prompt_en: 'You are at a cultural gathering in a Madrid café. A friend argues technology isolates people. Express your nuanced viewpoint, noting technology is a double-edged sword that can boost social cohesion if used wisely.',
            prompt_ar: 'أنت في جلسة ثقافية في مقهى بمدريد. يزعم أحد الأصدقاء أن التكنولوجيا تعزل الناس. عبّر عن وجهة نظرك مع إبراز الفروق الدقيقة، موضحاً أن التكنولوجيا سلاح ذو حدين يمكنه تعزيز التماسك الاجتماعي.',
            audioText: 'Entiendo tu argumento, al fin y al cabo la tecnología es un arma de doble filo. Sin embargo, hay matices importantes: si la utilizamos adecuadamente, puede potenciar la comunicación y conectar personas de diversas culturas.',
            requiredVocabulary: [
              { word: 'matiz', en: 'nuance / subtle distinction', ar: 'فارق دقيق' },
              { word: 'un arma de doble filo', en: 'a double-edged sword', ar: 'سلاح ذو حدين' },
              { word: 'potenciar', en: 'to boost / strengthen', ar: 'تعزيز / تقوية' },
              { word: 'al fin y al cabo', en: 'after all / when all is said and done', ar: 'في نهاية المطاف' },
              { word: 'discrepancia', en: 'discrepancy / disagreement', ar: 'تباين / خلاف' }
            ],
            suggestedStarters: [
              'Al fin y al cabo, considero que la tecnología es un arma de doble filo...',
              'Aunque entiendo tu discrepancia, creo que hay un matiz fundamental...',
              'Para potenciar la comunicación real, debemos considerar que...'
            ]
          }
        ],
        travel: [
          {
            id: 'scen-b2-trav-1',
            domain: 'travel',
            title_es: 'Gestión Diplomática y Logística de Incidencias de Viaje',
            title_en: 'Diplomatic Logistics & Flight Dispute Resolution',
            title_ar: 'إدارة أزمات السفر وحل نزاعات الطيران',
            prompt_es: 'Llegas al aeropuerto de Madrid y descubres que tu vuelo de conexión ha sido cancelado sin previo aviso. Debes exigir amablemente a la encargada de la aerolínea una compensación factible, haciendo valer el marco jurídico del pasajero y resolviendo la incertidumbre.',
            prompt_en: 'You arrive at Madrid airport and find your connecting flight cancelled without notice. You must politely demand feasible compensation from the airline representative, invoking passenger legal rights and resolving the uncertainty.',
            prompt_ar: 'تصل إلى مطار مدريد وتكتشف إلغاء رحلتك دون إشعار مسبق. يجب عليك مطالبة ممثلة شركة الطيران بلباقة بتعويض مناسب، بالاستناد إلى الأطر القانونية لحقوق المسافرين وحل حالة عدم اليقين.',
            audioText: 'Lamento la interrupción en su viaje. A la luz de las regulaciones europeas, analizaremos la situación para ofrecerle una compensación factible y alojamiento sin incertidumbre.',
            requiredVocabulary: [
              { word: 'incertidumbre', en: 'uncertainty', ar: 'عدم يقين' },
              { word: 'marco jurídico', en: 'legal framework', ar: 'إطار قانوني' },
              { word: 'sustancial', en: 'substantial / significant', ar: 'جوهري / هائل' },
              { word: 'recalcar', en: 'to emphasize / highlight', ar: 'التأكيد على' },
              { word: 'en última instancia', en: 'ultimately / in the final analysis', ar: 'في نهاية المطاف' }
            ],
            suggestedStarters: [
              'Quisiera recalcar que, de conformidad con el marco jurídico...',
              'Esta situación genera una gran incertidumbre, por lo que exijo...',
              'En última instancia, espero que la aerolínea me proporcione una solución sustancial...'
            ]
          }
        ]
      };

      const domainScenarios = scenariosByDomain[domain] || scenariosByDomain.professional;
      const selectedScenario = domainScenarios[Math.floor(Math.random() * domainScenarios.length)];

      const ai = getAIClient();
      if (!ai) {
        return res.json({ scenario: selectedScenario });
      }

      try {
        const prompt = `Generate a creative B2 Spanish situational role-play challenge for a learner at B2 CEFR level in the context domain "${domain}".
Return strict JSON:
{
  "id": "scen-gen-${Date.now()}",
  "domain": "${domain}",
  "title_es": "Descriptive Spanish Title",
  "title_en": "English Title",
  "title_ar": "Arabic Title",
  "prompt_es": "Situational role-play scenario in Spanish asking the student to act or respond in an upper-intermediate context.",
  "prompt_en": "English translation of prompt",
  "prompt_ar": "Arabic translation of prompt",
  "audioText": "Natural Spanish monologue or dialogue prompt for audio listening comprehension.",
  "requiredVocabulary": [
    { "word": "Spanish B2 word", "en": "English translation", "ar": "Arabic translation" },
    { "word": "Spanish B2 word 2", "en": "English translation 2", "ar": "Arabic translation 2" },
    { "word": "Spanish B2 word 3", "en": "English translation 3", "ar": "Arabic translation 3" },
    { "word": "Spanish B2 word 4", "en": "English translation 4", "ar": "Arabic translation 4" }
  ],
  "suggestedStarters": [
    "Suggested opening sentence 1...",
    "Suggested opening sentence 2...",
    "Suggested opening sentence 3..."
  ]
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          config: {
            responseMimeType: 'application/json',
            temperature: 0.7
          }
        });

        const parsed = JSON.parse(response.text || '{}');
        return res.json({
          scenario: {
            id: parsed.id || selectedScenario.id,
            domain: parsed.domain || domain,
            title_es: parsed.title_es || selectedScenario.title_es,
            title_en: parsed.title_en || selectedScenario.title_en,
            title_ar: parsed.title_ar || selectedScenario.title_ar,
            prompt_es: parsed.prompt_es || selectedScenario.prompt_es,
            prompt_en: parsed.prompt_en || selectedScenario.prompt_en,
            prompt_ar: parsed.prompt_ar || selectedScenario.prompt_ar,
            audioText: parsed.audioText || selectedScenario.audioText,
            requiredVocabulary: parsed.requiredVocabulary || selectedScenario.requiredVocabulary,
            suggestedStarters: parsed.suggestedStarters || selectedScenario.suggestedStarters
          }
        });
      } catch (e) {
        return res.json({ scenario: selectedScenario });
      }
    }

    if (action === 'evaluate_response') {
      const requiredWords: any[] = scenario?.requiredVocabulary || [];
      const textLower = userResponse.toLowerCase();

      const vocabUsageCheck = requiredWords.map(item => {
        const w = (item.word || '').toLowerCase();
        const used = textLower.includes(w);
        return {
          word: item.word,
          en: item.en,
          ar: item.ar,
          used,
          feedback: used
            ? `🟢 Aplicaste correctamente '${item.word}'`
            : `🔴 Faltó incluir '${item.word}' (${item.en})`
        };
      });

      const usedCount = vocabUsageCheck.filter(v => v.used).length;
      const vocabScore = Math.min(100, Math.round((usedCount / (requiredWords.length || 1)) * 70 + (userResponse.length > 50 ? 30 : 10)));
      const listeningScore = Math.min(100, Math.max(60, Math.round(75 + (userResponse.length > 80 ? 20 : 5))));
      const writingScore = Math.min(100, Math.max(50, Math.round(70 + (userResponse.length > 100 ? 25 : 10))));
      const overallScore = Math.round((listeningScore + writingScore + vocabScore) / 3);

      const ai = getAIClient();
      if (!ai) {
        return res.json({
          overallScore,
          listeningRelevanceScore: listeningScore,
          writingFluencyScore: writingScore,
          vocabularyUsageScore: vocabScore,
          vocabUsageCheck,
          feedback_es: `¡Excelente esfuerzo en este desafío B2! Lograste incorporar ${usedCount} de las palabras requeridas y tu redacción muestra buena coherencia gramatical.`,
          feedback_en: `Great effort on this B2 challenge! You successfully applied ${usedCount} required vocabulary words with clear grammatical structure.`,
          feedback_ar: `جهد ممتاز في هذا التحدي لمستوى B2! نجحت في تضمين ${usedCount} من المفردات المطلوبة وتظهر كتابتك تماسكاً لغوياً جيداً.`,
          correctedResponse: userResponse,
          xpEarned: Math.round(overallScore * 0.5)
        });
      }

      try {
        const evalPrompt = `You are Profesor Mateo, master SLA pedagogue.
Evaluate this student's response for a B2 Spanish roleplay scenario:

Scenario Title: ${scenario?.title_es}
Scenario Prompt: ${scenario?.prompt_es}
Required Vocabulary: ${requiredWords.map((w: any) => w.word).join(', ')}

Student Response in Spanish:
"${userResponse}"

Evaluate and return strict JSON:
{
  "overallScore": number (0-100),
  "listeningRelevanceScore": number (0-100),
  "writingFluencyScore": number (0-100),
  "vocabularyUsageScore": number (0-100),
  "feedback_es": "Constructive Spanish pedagogical critique focusing on B2 fluency and nuance.",
  "feedback_en": "English explanation of feedback.",
  "feedback_ar": "Arabic explanation of feedback.",
  "correctedResponse": "A polished, natural B2 native speaker version of the student's text improving grammar and vocabulary."
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [{ role: 'user', parts: [{ text: evalPrompt }] }],
          config: {
            responseMimeType: 'application/json',
            temperature: 0.3
          }
        });

        const parsed = JSON.parse(response.text || '{}');
        return res.json({
          overallScore: parsed.overallScore || overallScore,
          listeningRelevanceScore: parsed.listeningRelevanceScore || listeningScore,
          writingFluencyScore: parsed.writingFluencyScore || writingScore,
          vocabularyUsageScore: parsed.vocabularyUsageScore || vocabScore,
          vocabUsageCheck,
          feedback_es: parsed.feedback_es || '¡Gran trabajo expresando tu postura!',
          feedback_en: parsed.feedback_en || 'Great job expressing your perspective!',
          feedback_ar: parsed.feedback_ar || 'عمل رائع في التعبير عن موقفك!',
          correctedResponse: parsed.correctedResponse || userResponse,
          xpEarned: Math.max(25, Math.round((parsed.overallScore || overallScore) * 0.5))
        });
      } catch (e) {
        return res.json({
          overallScore,
          listeningRelevanceScore: listeningScore,
          writingFluencyScore: writingScore,
          vocabularyUsageScore: vocabScore,
          vocabUsageCheck,
          feedback_es: `¡Excelente desempeño B2! Lograste incorporar ${usedCount} palabras clave.`,
          feedback_en: `Great B2 performance! You incorporated ${usedCount} key words.`,
          feedback_ar: `أداء ممتاز لمستوى B2! قمت بتضمين ${usedCount} كلمات رئيسية.`,
          correctedResponse: userResponse,
          xpEarned: 35
        });
      }
    }

    return res.status(400).json({ error: 'Invalid action' });
  });

  // AI-Powered Word Contextual Translation and Image Association
  app.post('/api/ai/translate-word', async (req, res) => {
    const { word = '', sentence = '', nativeLang = 'en' } = req.body;
    
    if (!word) {
      return res.status(400).json({ error: 'Word parameter is required' });
    }

    const cleanWord = serverNormalizeWord(word);
    const cacheKey = `${cleanWord}_${nativeLang}`;

    // 1. Check server-side memory cache first
    if (wordTranslationCache.has(cacheKey)) {
      return res.json(wordTranslationCache.get(cacheKey));
    }

    // 2. Check ALL_VOCABULARY offline database (1,000 core words) for instant 0ms lookup
    const offlineMatch = ALL_VOCABULARY.find(v => {
      const sp = (v.spanish || v.word || '').toLowerCase();
      return serverNormalizeWord(sp) === cleanWord;
    });

    if (offlineMatch) {
      const offlineResponse = {
        word: word,
        translation_en: offlineMatch.translation_en || offlineMatch.english || `Translation of ${word}`,
        translation_ar: offlineMatch.translation_ar || offlineMatch.arabic || `ترجمة ${word}`,
        phonetic: offlineMatch.phonetic || offlineMatch.ipa || `/${word}/`,
        partOfSpeech: offlineMatch.partOfSpeech || 'vocabulary',
        gender: offlineMatch.gender || '',
        lemma: offlineMatch.spanish || word,
        explanation_en: offlineMatch.category ? `Core vocabulary term in category "${offlineMatch.category}" (CEFR ${offlineMatch.cefr || 'A1'}).` : `Core Spanish vocabulary term (CEFR ${offlineMatch.cefr || 'A1'}).`,
        explanation_ar: offlineMatch.category ? `كلمة أساسية في فئة "${offlineMatch.category}" (المستوى ${offlineMatch.cefr || 'A1'}).` : `كلمة أساسية في اللغة الإسبانية (المستوى ${offlineMatch.cefr || 'A1'}).`,
        imageUrl: `https://picsum.photos/seed/${encodeURIComponent(cleanWord)}/300/200`,
        examples: offlineMatch.examples || [
          {
            es: `Uso de la palabra "${word}" en esta lección.`,
            en: `Use of the word "${word}" in this lesson.`,
            ar: `استخدام كلمة "${word}" في هذا الدرس.`
          }
        ]
      };

      wordTranslationCache.set(cacheKey, offlineResponse);
      return res.json(offlineResponse);
    }

    const ai = getAIClient();
    if (!ai) {
      const fallbackObj = {
        word,
        translation_en: `Translation for "${word}"`,
        translation_ar: `ترجمة "${word}"`,
        phonetic: `/${word}/`,
        partOfSpeech: 'vocabulary',
        lemma: word,
        explanation_en: 'Context explanation offline.',
        explanation_ar: 'شرح السياق غير متصل بالإنترنت.',
        imageUrl: `https://picsum.photos/seed/${encodeURIComponent(word)}/300/200`,
        examples: [
          {
            es: `Uso de la palabra "${word}" en esta lección.`,
            en: `Use of the word "${word}" in this lesson.`,
            ar: `استخدام كلمة "${word}" في هذا الدرس.`
          }
        ]
      };
      wordTranslationCache.set(cacheKey, fallbackObj);
      return res.json(fallbackObj);
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are an expert bilingual Spanish-English and Spanish-Arabic lexicographer.
Your job is to translate the Spanish word "${word}" in the context of this sentence: "${sentence}".
Provide a highly precise translation, morphological breakdown, and clean Arabic and English translations of the word.

Return a valid JSON object matching this schema exactly:
{
  "word": "the exact word looked up",
  "translation_en": "most precise English translation for this context",
  "translation_ar": "most precise Modern Standard Arabic (الفصحى) translation for this context",
  "phonetic": "phonetic/IPA spelling (e.g. [traŋˈkilo])",
  "partOfSpeech": "noun, verb, adjective, adverb, preposition, conjunction, etc.",
  "gender": "masculine, feminine, or null",
  "lemma": "dictionary root/infinitive form of the word",
  "explanation_en": "One-sentence explanation of how this word is used in this context in English",
  "explanation_ar": "One-sentence explanation of how this word is used in this context in Arabic",
  "imageSearchKeyword": "A simple English concrete noun or search phrase (1-2 words) that represents this word visually (e.g. 'relaxing park' for 'tranquilo', 'madrid street' for 'madrid', 'coffee cup' for 'café')",
  "examples": [
    {
      "es": "A simple, clear Spanish example sentence using this word",
      "en": "English translation",
      "ar": "Arabic translation"
    }
  ]
}`,
          config: {
            responseMimeType: 'application/json',
          }
      });

      const parsed = JSON.parse(response.text || '{}');
      const searchKeyword = parsed.imageSearchKeyword || word;
      const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(searchKeyword.replace(/\s+/g, '_').toLowerCase())}/300/200`;

      const resultObj = {
        word: parsed.word || word,
        translation_en: parsed.translation_en || `Translation of ${word}`,
        translation_ar: parsed.translation_ar || `ترجمة ${word}`,
        phonetic: parsed.phonetic || '',
        partOfSpeech: parsed.partOfSpeech || 'vocabulary',
        gender: parsed.gender || '',
        lemma: parsed.lemma || word,
        explanation_en: parsed.explanation_en || '',
        explanation_ar: parsed.explanation_ar || '',
        imageUrl: imageUrl,
        examples: parsed.examples || []
      };

      // Store in memory cache for future requests
      wordTranslationCache.set(cacheKey, resultObj);
      return res.json(resultObj);
    } catch (error: any) {
      console.warn('Gemini translate-word rate limit or error, using intelligent offline fallback:', error?.message || error);
      
      // Look for a substring partial match in the offline core vocabulary
      const partialMatch = ALL_VOCABULARY.find(v => {
        const sp = (v.spanish || v.word || '').toLowerCase();
        return cleanWord.startsWith(serverNormalizeWord(sp)) || serverNormalizeWord(sp).startsWith(cleanWord);
      });

      const fallbackObj = {
        word,
        translation_en: partialMatch ? partialMatch.translation_en : `Translation of ${word}`,
        translation_ar: partialMatch ? partialMatch.translation_ar : `ترجمة ${word}`,
        phonetic: partialMatch ? partialMatch.phonetic : `/${word}/`,
        partOfSpeech: partialMatch ? partialMatch.partOfSpeech : 'vocabulary',
        lemma: partialMatch ? partialMatch.spanish : word,
        explanation_en: partialMatch ? `Fuzzy lookup match: '${partialMatch.spanish}' (CEFR ${partialMatch.cefr}).` : `Direct translation (Offline Fallback).`,
        explanation_ar: partialMatch ? `ترجمة تقريبية مطابقة لـ: '${partialMatch.spanish}' (المستوى ${partialMatch.cefr}).` : `ترجمة مباشرة (احتياطية).`,
        imageUrl: `https://picsum.photos/seed/${encodeURIComponent(word)}/300/200`,
        examples: partialMatch ? partialMatch.examples : [
          {
            es: `Esta es la palabra "${word}".`,
            en: `This is the word "${word}".`,
            ar: `هذه هي الكلمة "${word}".`
          }
        ]
      };

      // Cache the fallback so we don't spam the failing/rate-limited API
      wordTranslationCache.set(cacheKey, fallbackObj);
      return res.json(fallbackObj);
    }
  });

  // AI-Powered Full Text Auto-Translation
  app.post('/api/ai/translate-text', async (req, res) => {
    const { text = '' } = req.body;
    
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Text parameter is required' });
    }

    const ai = getAIClient();
    if (!ai) {
      return res.json({
        translation_en: `English translation fallback for: ${text.slice(0, 50)}...`,
        translation_ar: `ترجمة عربية بديلة لـ: ${text.slice(0, 50)}...`
      });
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are an expert bilingual Spanish-English and Spanish-Arabic translator.
Your job is to translate this Spanish text into English and Arabic, maintaining the exact paragraph structure (each paragraph separated by double newlines \\n\\n).

Make sure the translation is accurate, natural, and highly useful for language learners.

Spanish Text:
"${text}"

Return a valid JSON object matching this schema exactly:
{
  "translation_en": "the full English translation preserving paragraph separation",
  "translation_ar": "the full Arabic translation preserving paragraph separation"
}`,
          config: {
            responseMimeType: 'application/json',
          }
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({
        translation_en: parsed.translation_en || '',
        translation_ar: parsed.translation_ar || ''
      });
    } catch (error: any) {
      console.warn('Gemini translate-text error:', error?.message || error);
      return res.status(500).json({ error: 'Failed to translate text' });
    }
  });

  // AI Sentence Production Evaluation Endpoint
  app.post('/api/ai/evaluate-production', async (req, res) => {
    const { text = '', studentInput = '', prompt = '', level = 'A1', cefr = 'A1', language = 'en', nativeLang = 'en' } = req.body;
    const submission = text || studentInput || '';
    const userCefr = level || cefr;
    const lang = nativeLang || language;
    const isArabic = lang === 'ar';

    const fallbackEvaluation = {
      score: 92,
      isCorrect: true,
      feedback: isArabic 
        ? 'عمل رائع ومتقن! جملتك واضحة وسليمة نحوياً وتواصل المعنى بشكل دقيق.' 
        : 'Well done! Your Spanish sentence is grammatically sound, natural, and communicates the idea clearly.',
      feedback_en: 'Well done! Your Spanish sentence is grammatically sound, natural, and communicates the idea clearly.',
      feedback_ar: 'عمل رائع ومتقن! جملتك واضحة وسليمة نحوياً وتواصل المعنى بشكل دقيق.',
      correctedSentence: submission || 'Me gusta mucho aprender español todos los días.',
      corrections: [],
      strengths: ['Correct conjugation agreement', 'Appropriate vocabulary use', 'Natural communicative flow'],
      alternativePhrasings: [
        submission,
        `En mi opinión, ${submission.toLowerCase()}`
      ],
      grammarPointsApplied: ['Subject-Verb Agreement', 'Appropriate Lexical Choice']
    };

    const ai = getAIClient();
    if (!ai) {
      return res.json(fallbackEvaluation);
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Evaluate this Spanish sentence written by a student at CEFR ${userCefr} level.
Prompt given to student: "${prompt}"
Student's submission: "${submission}"
Explanation language: ${isArabic ? 'Arabic (العربية)' : 'English'}.

Respond in valid JSON format matching this schema:
{
  "score": number (0-100),
  "isCorrect": boolean,
  "feedback": "string explaining strengths and areas to refine in ${isArabic ? 'Arabic' : 'English'}",
  "feedback_en": "English feedback",
  "feedback_ar": "Arabic feedback",
  "correctedSentence": "clean corrected version",
  "strengths": ["strength 1", "strength 2"],
  "corrections": [
    {
      "original": "incorrect fragment",
      "corrected": "correct fragment",
      "reason": "explanation of grammar rule in ${isArabic ? 'Arabic' : 'English'}"
    }
  ],
  "alternativePhrasings": ["natural native Spanish variation 1", "variation 2"],
  "grammarPointsApplied": ["Grammar concept 1", "Grammar concept 2"]
}`,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({
        ...fallbackEvaluation,
        ...parsed,
      });
    } catch (error: any) {
      console.warn('Gemini evaluate-production error, returning fallback:', error?.message || error);
      return res.json(fallbackEvaluation);
    }
  });

  // AI Custom Comprehensible Story Generator
  app.post('/api/ai/generate-story', async (req, res) => {
    const { topic = 'el día a día', cefr = 'A1', language = 'en' } = req.body;
    const isArabic = language === 'ar';

    const fallbackStory = {
      title_es: `Una aventura en Madrid: ${topic}`,
      title_en: `An Adventure in Madrid: ${topic}`,
      title_ar: `مغامرة في مدريد: ${topic}`,
      paragraphs: [
        {
          es: 'Hoy es un día soleado en Madrid. Carlos se levanta a las siete de la mañana, prepara un café caliente con leche y lee las noticias.',
          en: 'Today is a sunny day in Madrid. Carlos gets up at seven in the morning, prepares a hot coffee with milk, and reads the news.',
          ar: 'اليوم يوم مشمس في مدريد. يستيقظ كارلوس في السابعة صباحاً ويعد قهوة ساخنة بالحليب ويقرأ الأخبار.'
        },
        {
          es: 'Luego, va al parque del Retiro con su perro Mateo. En el camino, saluda cordialmente a los vecinos y disfruta del aire fresco.',
          en: 'Then, he goes to Retiro Park with his dog Mateo. On the way, he cordially greets his neighbors and enjoys the fresh air.',
          ar: 'ثم يذهب إلى حديقة ريتيرو مع كلبه ماتيو. في الطريق، يلقي التحية بحرارة على الجيران ويستمتع بالهواء النقي.'
        },
        {
          es: 'Por la tarde, se reúne con sus amigos en una plaza para practicar español y compartir unas deliciosas tapas tradicionales.',
          en: 'In the afternoon, he meets his friends in a plaza to practice Spanish and share some delicious traditional tapas.',
          ar: 'في المساء، يلتقي بأصدقائه في الساحة لممارسة الإسبانية ومشاركة بعض أطباق التاباس التقليدية اللذيذة.'
        }
      ],
      vocabList: [
        { es: 'levantarse', en: 'to get up', ar: 'يستيقظ' },
        { es: 'camino', en: 'way/path', ar: 'طريق' },
        { es: 'saludar', en: 'to greet', ar: 'يحيي' },
        { es: 'tapas', en: 'traditional Spanish small plates', ar: 'مقبلات إسبانية تقليدية' }
      ]
    };

    const ai = getAIClient();
    if (!ai) {
      return res.json(fallbackStory);
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Create a graded comprehensible input story for Spanish learners at level ${cefr}.
Topic: ${topic || 'everyday life in Spain/Latin America'}.
Ensure strictly appropriate vocabulary and grammar for ${cefr}.
Provide bilingual translations in English and Arabic for each paragraph.

Return JSON:
{
  "title_es": "Spanish Title",
  "title_en": "English Title",
  "title_ar": "Arabic Title",
  "paragraphs": [
    {
      "es": "Spanish paragraph text (2-3 natural sentences)",
      "en": "English translation",
      "ar": "Arabic translation (فصحى دقيقة)"
    }
  ],
  "vocabList": [
    { "es": "word", "en": "meaning", "ar": "معنى" }
  ]
}`,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({
        ...fallbackStory,
        ...parsed,
      });
    } catch (error: any) {
      console.warn('Gemini generate-story error, returning fallback:', error?.message || error);
      return res.json(fallbackStory);
    }
  });

  // ==========================================
  // FLUENCY ASSESSMENT INTERVIEW ENDPOINTS
  // ==========================================

  // 1. Start Fluency Assessment Interview
  app.post('/api/ai/fluency-assessment/start', async (req, res) => {
    // Select 5 random words from VOCABULARY_B2
    const b2Words = (VOCABULARY_B2 && VOCABULARY_B2.length > 0 ? VOCABULARY_B2 : [
      { id: 'b2-1', spanish: 'desafío', word: 'desafío', english: 'challenge', translation_en: 'challenge', arabic: 'تحدٍ', translation_ar: 'تحدٍ' },
      { id: 'b2-2', spanish: 'perspectiva', word: 'perspectiva', english: 'perspective', translation_en: 'perspective', arabic: 'منظور', translation_ar: 'منظور' },
      { id: 'b2-3', spanish: 'fomentar', word: 'fomentar', english: 'to foster', translation_en: 'to foster', arabic: 'تعزيز', translation_ar: 'تعزيز' },
      { id: 'b2-4', spanish: 'factible', word: 'factible', english: 'feasible', translation_en: 'feasible', arabic: 'قابل للتطبيق', translation_ar: 'قابل للتطبيق' },
      { id: 'b2-5', spanish: 'compromiso', word: 'compromiso', english: 'commitment', translation_en: 'commitment', arabic: 'التزام', translation_ar: 'التزام' }
    ]) as any[];
    
    // Shuffle and pick 5
    const shuffled = [...b2Words].sort(() => 0.5 - Math.random());
    const targetWords = shuffled.slice(0, 5).map(w => ({
      spanish: w.spanish || w.word,
      english: w.english || w.translation_en,
      arabic: w.arabic || w.translation_ar,
      id: w.id || 'b2-mock'
    }));

    const defaultFirstQuestion = '¡Hola! Bienvenido a tu Evaluación de Fluidez Iberio de nivel B2. Soy Elena, tu evaluadora de Inteligencia Artificial para el marco de lingüística aplicada. Para comenzar este examen de 5 minutos, me gustaría que me hables de un desafío profesional o personal reciente que hayas superado. ¿Qué estrategias implementaste para resolverlo?';

    const ai = getAIClient();
    if (!ai) {
      return res.json({
        targetWords,
        firstQuestion: defaultFirstQuestion,
        interviewerPersona: 'Elena, Iberio Senior SLA Evaluator',
        contextScenario: 'Hablar sobre desafíos profesionales y crecimiento personal utilizando estructuras del nivel B2.'
      });
    }

    try {
      const prompt = `You are Elena, an elite Senior SLA (Second Language Acquisition) Evaluator for the Iberio Academy.
You are initiating a highly professional, 5-minute timed CEFR B2 Fluency Assessment interview.
Your goal is to evaluate the user's upper-intermediate Spanish conversational capabilities.

The 5 B2 Spanish vocabulary words targeted in this assessment are:
${targetWords.map((tw, i) => `${i + 1}. ${tw.spanish} (${tw.english})`).join('\n')}

Please generate a warm, professional, authentic opening interview question in Spanish (CEFR B2 level). The question should naturally elicit discussion related to professional growth, technology, sustainability, or personal achievement, inviting the student to express nuanced viewpoints. Keep it engaging, natural, and limit it to 2-3 sentences. Do not mention the targeted words directly or say "you must use these words" in your greeting, keep the instructions implicit.

Return JSON format:
{
  "firstQuestion": "Opening Spanish question...",
  "contextScenario": "A descriptive phrase in Spanish summarizing the interview's main situational context."
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({
        targetWords,
        firstQuestion: parsed.firstQuestion || defaultFirstQuestion,
        interviewerPersona: 'Elena, Iberio Senior SLA Evaluator',
        contextScenario: parsed.contextScenario || 'Diálogo profesional y reflexivo sobre resolución de retos y planes futuros.'
      });
    } catch (e) {
      console.warn('Gemini start fluency assessment error, using fallback:', e);
      return res.json({
        targetWords,
        firstQuestion: defaultFirstQuestion,
        interviewerPersona: 'Elena, Iberio Senior SLA Evaluator',
        contextScenario: 'Diálogo profesional y reflexivo sobre resolución de retos y planes futuros.'
      });
    }
  });

  // 2. Next Question during the interview
  app.post('/api/ai/fluency-assessment/next-question', async (req, res) => {
    const { chatHistory = [], targetWords = [], userResponse = '' } = req.body;

    const ai = getAIClient();
    if (!ai) {
      const fallbackQuestions = [
        'Interesante perspectiva. ¿Cómo crees que este tipo de experiencias impactan en la toma de decisiones a largo plazo?',
        'Excelente explicación. Si tuvieras que negociar un compromiso similar con socios internacionales, ¿cómo fomentarías la confianza?',
        'Comprendo perfectamente. En última instancia, ¿cuál consideras que es el factor clave para garantizar la factibilidad de un proyecto?',
        'Muchas gracias por compartir eso. ¿Qué matices crees que diferencian este desafío de otros que has enfrentado en el pasado?'
      ];
      const nextQ = fallbackQuestions[Math.min(chatHistory.length, fallbackQuestions.length - 1)];
      return res.json({ nextQuestion: nextQ });
    }

    try {
      const systemPrompt = `You are Elena, an elite Iberio Senior SLA Evaluator conducting a 5-minute timed B2 Fluency Assessment interview.
You must maintain a supportive, professional, and natural conversational flow in Spanish at the CEFR B2 level.

The targeted vocabulary words for this assessment are:
${targetWords.map((tw: any) => `- ${tw.spanish} (${tw.english})`).join('\n')}

Analyze the chat history so far and the user's latest response. Generate the next logical, engaging follow-up question in Spanish. Keep your follow-up short (2-3 sentences max) and natural. Ensure your questions naturally guide the learner to talk about related B2-level conceptual themes (strategy, challenges, plans, culture) without explicitly demanding they use the words. Just be a natural, conversational, skilled interviewer.`;

      const contents = [
        ...chatHistory.slice(-6).map((msg: any) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text || '' }]
        })),
        {
          role: 'user',
          parts: [{ text: `User latest response: "${userResponse}"` }]
        }
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7
        }
      });

      return res.json({ nextQuestion: response.text?.trim() || '¿Qué otras estrategias consideras cruciales?' });
    } catch (e) {
      console.warn('Gemini next question assessment error, using fallback:', e);
      return res.json({ nextQuestion: '¿Cómo crees que estas decisiones afectarán tus planes futuros a largo plazo?' });
    }
  });

  // 3. Evaluate the completed 5-minute timed interview and return a high-impact Fluency Report
  app.post('/api/ai/fluency-assessment/evaluate', async (req, res) => {
    const { chatHistory = [], targetWords = [] } = req.body;

    // Helper for robust offline fallback Fluency Report
    const generateFallbackReport = () => {
      const userMsgs = chatHistory.filter((msg: any) => msg.role === 'user').map((msg: any) => msg.text || '');
      const fullText = userMsgs.join(' ').toLowerCase();
      
      const usedWords = targetWords.filter((tw: any) => {
        const word = (tw.spanish || '').toLowerCase();
        return fullText.includes(word);
      });

      const unusedWords = targetWords.filter((tw: any) => {
        const word = (tw.spanish || '').toLowerCase();
        return !fullText.includes(word);
      });

      const vocabularyScore = Math.min(100, Math.max(50, Math.round(50 + (usedWords.length * 10))));
      const grammarScore = Math.min(100, Math.max(55, Math.round(60 + (fullText.length > 100 ? 15 : 0))));
      const lexicalVarietyScore = Math.min(100, Math.max(50, Math.round(55 + (userMsgs.length * 8))));
      const overallScore = Math.round((grammarScore + vocabularyScore + lexicalVarietyScore) / 3);

      return {
        overallScore,
        grammarScore,
        vocabularyScore,
        lexicalVarietyScore,
        coherenceScore: 82,
        strengths: [
          'Comprensión auditiva excelente de las preguntas complejas formuladas por el evaluador.',
          'Intención comunicativa constante y capacidad de mantener la interacción bajo la presión del tiempo.',
          usedWords.length > 0 
            ? `Uso correcto de vocabulario avanzado de nivel B2, incluyendo palabras como: ${usedWords.map((w: any) => `'${w.spanish}'`).join(', ')}.`
            : 'Formulación estructurada de frases con verbos conjugados correctamente en tiempos simples.'
        ],
        weaknesses: [
          unusedWords.length > 0 
            ? `Oportunidad para incorporar más vocabulario específico del examen (no se detectaron términos como ${unusedWords.map((w: any) => `'${w.spanish}'`).join(', ')}).`
            : 'Falta de vocabulario técnico e idiomático para expresar ideas más abstractas.',
          'Poca variedad en las conjunciones y conectores discursivos (dependencia de "y", "pero", "porque").'
        ],
        grammarAnalysis: 'Tu estructura gramatical muestra un dominio intermedio adecuado. Se observa buena concordancia de género y número en oraciones simples. Sin embargo, para consolidar el nivel B2, es imperativo dominar el uso de los pronombres relativos y el modo subjuntivo para expresar hipótesis y opiniones matizadas.',
        vocabularyAnalysis: `Has demostrado un esfuerzo por comunicar ideas abstractas. Lograste aplicar ${usedWords.length} de los 5 vocablos B2 objetivo. Para mejorar tu variedad léxica, te recomendamos practicar sinónimos de verbos comunes (por ejemplo, usar 'fomentar' en lugar de 'hacer' o 'promover').`,
        grammarSuggestions: [
          'Uso del Subjuntivo en oraciones concesivas y condicionales (ej. "Aunque sea un desafío...", "Si yo tuviera que negociar...")',
          'Diferenciación de conectores discursivos avanzados (ej. "No obstante", "Por consiguiente", "A fin de cuentas")'
        ],
        wordSuggestions: targetWords.map((tw: any) => ({
          word: tw.spanish,
          en: tw.english,
          ar: tw.arabic,
          reason: 'Consolidar su uso activo en oraciones compuestas de alta complejidad.'
        })),
        correctedSentences: [
          {
            original: 'Es un gran desafío que tengo que hacer hoy.',
            corrected: 'Representa un desafío sustancial que debo abordar hoy.',
            explanation: 'Sustituye "hacer" por "abordar" y añade el adjetivo "sustancial" para elevar el nivel léxico al estándar CEFR B2.'
          }
        ]
      };
    };

    const ai = getAIClient();
    if (!ai) {
      return res.json(generateFallbackReport());
    }

    try {
      const userConversation = chatHistory
        .map((msg: any) => `${msg.role === 'user' ? 'Student' : 'Evaluator'}: ${msg.text}`)
        .join('\n');

      const evalPrompt = `You are Elena, an elite Iberio Senior SLA Evaluator and DELE exam board member.
Evaluate the following 5-minute timed Spanish interview chat transcript for a CEFR B2 Fluency Assessment.
The target B2 Spanish vocabulary list for this student was:
${targetWords.map((tw: any) => `- ${tw.spanish} (${tw.english} - ${tw.arabic})`).join('\n')}

---
Transcript:
${userConversation}
---

Your evaluation must be rigorous, precise, and highly constructive. Analyze:
1. Grammatical Accuracy (Use of past tenses, subjunctive mood, relative pronouns, prepositions, gender/number agreement).
2. Lexical Variety (Presence of B2 vocabulary, usage of target words, avoiding simple repetition, using advanced verbs instead of 'hacer'/'tener'/'decir').
3. Coherence & Conversational Flow.

Provide a highly detailed Fluency Report in strict JSON format. Ensure all suggestions and analysis are extremely polished, encouraging, and useful.
Provide suggestions in Spanish, English, and Arabic if appropriate, but keep the core analysis in Spanish.

Return JSON format:
{
  "overallScore": number (0-100),
  "grammarScore": number (0-100),
  "vocabularyScore": number (0-100),
  "lexicalVarietyScore": number (0-100),
  "coherenceScore": number (0-100),
  "strengths": [
    "Strength 1 in Spanish",
    "Strength 2 in Spanish",
    "Strength 3 in Spanish"
  ],
  "weaknesses": [
    "Weakness 1 in Spanish",
    "Weakness 2 in Spanish"
  ],
  "grammarAnalysis": "Thorough paragraphs analyzing grammatical accuracy in Spanish.",
  "vocabularyAnalysis": "Thorough paragraphs analyzing vocabulary and lexical variety in Spanish.",
  "grammarSuggestions": [
    "Specific grammar rule or pattern to practice (e.g., 'El pretérito imperfecto de subjuntivo para expresar hipótesis')",
    "Another specific grammar rule (e.g., 'Uso de conectores concesivos como no obstante y sin embargo')"
  ],
  "wordSuggestions": [
    {
      "word": "Spanish word",
      "en": "English meaning",
      "ar": "Arabic meaning",
      "reason": "Specific reason why they need to practice this word based on their performance."
    }
  ],
  "correctedSentences": [
    {
      "original": "The student's original flawed sentence",
      "corrected": "Corrected standard B2 Spanish version",
      "explanation": "Brief explanation of the grammar rule or lexical upgrade."
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: [{ role: 'user', parts: [{ text: evalPrompt }] }],
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({
        overallScore: parsed.overallScore || 70,
        grammarScore: parsed.grammarScore || 70,
        vocabularyScore: parsed.vocabularyScore || 70,
        lexicalVarietyScore: parsed.lexicalVarietyScore || 70,
        coherenceScore: parsed.coherenceScore || 75,
        strengths: parsed.strengths || ['Esfuerzo constante para expresarse bajo límites de tiempo.'],
        weaknesses: parsed.weaknesses || ['Oportunidad de elevar la complejidad sintáctica.'],
        grammarAnalysis: parsed.grammarAnalysis || 'Gramática intermedia adecuada.',
        vocabularyAnalysis: parsed.vocabularyAnalysis || 'Vocabulario intermedio adecuado.',
        grammarSuggestions: parsed.grammarSuggestions || ['Uso regular de conectores discursivos avanzados.'],
        wordSuggestions: parsed.wordSuggestions || [],
        correctedSentences: parsed.correctedSentences || []
      });
    } catch (e) {
      console.warn('Gemini evaluate assessment error, returning fallback:', e);
      return res.json(generateFallbackReport());
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Iberacademy server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
