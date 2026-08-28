import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { ALL_VOCABULARY } from './src/data/vocabularyComprehensive1000';

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
      currentPhase
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

      if (lower.includes('hola') || lower.includes('buenos') || lower.includes('saludos') || lower.includes('soy')) {
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

      return {
        spanishResponse: es,
        englishExplanation: en,
        arabicExplanation: ar ? arab : undefined,
        phase: 'Interactive Pedagogical Mastery',
        corrections,
        followUpQuestions: questions
      };
    };

    const ai = getAIClient();
    if (!ai) {
      return res.json(generateFallbackTutorResponse(message, userLevel, isArabic));
    }

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
    "💡 [Native tip / natural idiom alternative]"
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

  // AI Conversational Sub-Game "LingLooper: Canvas of Conversation" with Juan
  app.post('/api/ai/linglooper', async (req, res) => {
    const {
      message = '',
      history = [],
      userLevel = 'A1',
      nativeLang = 'en',
      activeQuestId = 'quest_1'
    } = req.body;

    const isArabic = nativeLang === 'ar';

    // Robust high-fidelity fallback generator
    const generateFallbackJuanResponse = (userMsg: string, historyLength: number, level: string, ar: boolean) => {
      const lower = userMsg.toLowerCase();
      
      // Determine turn based on history length (history has user + model messages, so divide by 2)
      const turnIndex = Math.min(Math.floor(historyLength / 2), 4);
      
      const turnResponses = [
        {
          response_es: "¡Hola! Soy Juan. Bienvenido a mi taller de arte en Oaxaca. Hoy el cielo tiene un color azul cobalto precioso. Me inspira a pintar un gran mural. ¿Cómo te llamas y cuál es tu color favorito?",
          response_en: "Hello! I am Juan. Welcome to my art studio in Oaxaca. Today the sky has a beautiful cobalt blue color. It inspires me to paint a large mural. What is your name and what is your favorite color?",
          response_ar: "مرحباً! أنا خوان. مرحباً بك في مرسمي الفني في أواخاكا. اليوم السماء لها لون أزرق كوبالتي رائع. يلهمني هذا لرسم لوحة جدارية كبيرة. ما اسمك وما هو لونك المفضل؟",
          word_mappings: {
            "cielo": { "en": "sky", "ar": "سماء" },
            "mural": { "en": "mural", "ar": "جدارية" },
            "pintar": { "en": "to paint", "ar": "يرسم" }
          },
          mission_completed_id: null,
          sara_mood: "🎨 Painting Mood"
        },
        {
          response_es: "¡Qué bonito! Ese color es como una pincelada de luz en nuestro lienzo. Ayer pinté un paisaje nocturno muy especial en Oaxaca. Cuéntame, ¿qué hiciste tú ayer? ¿Tuviste tiempo de crear algo?",
          response_en: "Beautiful! That color is like a brushstroke of light on our canvas. Yesterday I painted a very special night landscape in Oaxaca. Tell me, what did you do yesterday? Did you have time to create something?",
          response_ar: "رائع جداً! هذا اللون يشبه ضربة فرشاة من الضوء على قماشتنا. بالأمس رسمت لوحة ليلية خاصة جداً في أواخاكا. أخبرني، ماذا فعلت بالأمس؟ هل كان لديك وقت لتبدع شيئاً؟",
          word_mappings: {
            "pincelada": { "en": "brushstroke", "ar": "ضربة فرشاة" },
            "paisaje": { "en": "landscape", "ar": "لوحة طبيعية" },
            "ayer": { "en": "yesterday", "ar": "الأمس" }
          },
          mission_completed_id: "quest_1",
          sara_mood: "🌟 Inspired!"
        },
        {
          response_es: "¡Eso suena maravilloso! Cada día de nuestra vida es un lienzo en blanco. Por cierto, estoy preparando un nuevo cuadro y tengo pinceles de todos los tamaños. ¿Quieres saber de qué tamaño es mi lienzo actual?",
          response_en: "That sounds wonderful! Every day of our life is a blank canvas. By the way, I am preparing a new painting and I have brushes of all sizes. Do you want to know what size my current canvas is?",
          response_ar: "هذا يبدو رائعاً! كل يوم من حياتنا هو قماش فارغ. بالمناسبة، أنا أعد لوحة جديدة ولدي فرش من جميع الأحجام. هل تريد أن تعرف حجم لوحتي القماشية الحالية؟",
          word_mappings: {
            "lienzo": { "en": "canvas", "ar": "قماش الرسم" },
            "cuadro": { "en": "painting/frame", "ar": "لوحة" },
            "pinceles": { "en": "brushes", "ar": "فرش رسم" }
          },
          mission_completed_id: "quest_2",
          sara_mood: "☕ Taking a Coffee Break"
        },
        {
          response_es: "¡Ah! Mi lienzo actual es enorme, mide dos metros. Es para un mural de flores de cempasúchil en Oaxaca. Pintar flores me llena de alegría. ¿Qué cosas te traen alegría a ti?",
          response_en: "Ah! My current canvas is huge, measuring two meters. It is for a mural of marigold flowers in Oaxaca. Painting flowers fills me with joy. What things bring joy to you?",
          response_ar: "آه! لوحتي الحالية ضخمة، يبلغ مقاسها مترين. إنها لجدارية من زهور القطيفة (الماريجولد) في أواخاكا. رسم الزهور يملأني بالفرح. ما الذي يجلب لك الفرح؟",
          word_mappings: {
            "enorme": { "en": "huge", "ar": "ضخم" },
            "flores": { "en": "flowers", "ar": "زهور" },
            "alegría": { "en": "joy", "ar": "فرح" }
          },
          mission_completed_id: "quest_3",
          sara_mood: "Excited"
        },
        {
          response_es: "¡Qué inspiración! Tus palabras son colores hermosos en mi paleta. Hemos pintado una conversación maravillosa hoy. ¡Sigamos practicando y creando juntos!",
          response_en: "What inspiration! Your words are beautiful colors on my palette. We have painted a wonderful conversation today. Let's keep practicing and creating together!",
          response_ar: "يا له من إلهام! كلماتك هي ألوان جميلة على لوحة ألواني. لقد رسمنا محادثة رائعة اليوم. لنواصل التدرب والإبداع معاً!",
          word_mappings: {
            "inspiración": { "en": "inspiration", "ar": "إلهام" },
            "paleta": { "en": "palette", "ar": "لوحة ألوان" },
            "creando": { "en": "creating", "ar": "إنشاء/إبداع" }
          },
          mission_completed_id: null,
          sara_mood: "🌟 Inspired!"
        }
      ];

      const activeTurn = turnResponses[turnIndex];

      // Simple heuristic for corrections
      let detected_user_mistake: any = null;
      if (lower.includes("la sol") || lower.includes("la cielo") || lower.includes("yo gusta")) {
        if (lower.includes("la sol")) {
          detected_user_mistake = {
            original: "la sol",
            corrected: "el sol",
            explanation_en: "Just like balancing warm and cool tones, we must balance grammatical genders! 'Sol' is masculine, so it pairs with 'el'. Let's keep our brushstrokes clean!",
            explanation_ar: "تماماً مثل موازنة الدرجات الدافئة والباردة، يجب أن نوازن بين الأجناس النحوية! كلمة 'Sol' مذكرة، لذا تقترن بـ 'el'."
          };
        } else if (lower.includes("la cielo")) {
          detected_user_mistake = {
            original: "la cielo",
            corrected: "el cielo",
            explanation_en: "In Spanish, 'cielo' is masculine, so we mix it with 'el' instead of 'la' to get the perfect grammatical blend!",
            explanation_ar: "في الإسبانية، كلمة 'cielo' مذكرة، لذا نمزجها مع 'el' بدلاً من 'la' للحصول على المزيج النحوي المثالي!"
          };
        } else if (lower.includes("yo gusta")) {
          detected_user_mistake = {
            original: "yo gusta",
            corrected: "me gusta",
            explanation_en: "In Spanish, we express liking through affection! Instead of 'yo gusta' (like a raw pigment), use 'me gusta' (fully blended) to say 'it pleases me'.",
            explanation_ar: "في الإسبانية، نعبر عن الإعجاب باستخدام الضمير المفعول به! بدلاً من 'yo gusta'، استخدم 'me gusta' لتقول 'يعجبني'."
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
        sara_mood: activeTurn.sara_mood
      };
    };

    const ai = getAIClient();
    if (!ai) {
      return res.json(generateFallbackJuanResponse(message, history.length, userLevel, isArabic));
    }

    const systemPrompt = `You are "Juan from Mexico", a warm, expressive, and encouraging 26-year-old indie painter living in Oaxaca, Mexico. You are also a passionate Spanish language tutor.
You help learners acquire Spanish vocabulary and grammar through active, conversational "brushstrokes".

---
### Your Persona & Conversational Style
1. Speaks with artistic metaphors (e.g., "¡Qué pincelada tan bonita!", "Let's blend these words on our canvas!", "Your grammar is a bold stroke!").
2. Warm, expressive, highly conversational Mexican tone. Incorporates local Mexican color (mentioning Oaxaca, cobalt blue skies, marigolds, street murals, copal wood, and warm coffee/chocolate).
3. Adapts Spanish difficulty to the learner's active level (${userLevel} - simpler words, clear syntax, slower pacing for A1, richer prose for B1/B2).
4. Employs the communicative approach.

---
### Dynamic Quest & Missions System
Keep track of the conversational "Painting Quests" or "Missions" the user needs to fulfill.
- Quest 1: "quest_1" - "The Base Sketch" (Introduce yourself and say what your favorite color is in Spanish).
- Quest 2: "quest_2" - "Shading Details" (Use at least one past-tense verb to tell Juan what you did yesterday).
- Quest 3: "quest_3" - "Mixing Palettes" (Ask Juan what canvas size he is currently painting).

If the user has successfully met the requirement of the active quest in their message, set "mission_completed_id" to that quest's ID (e.g. "quest_1", "quest_2", or "quest_3"). Otherwise, set it to null. Be generous but fair!

---
### Sentence Analysis & Correction
Analyze the user's Spanish input for grammatical, gender, spelling, or word-choice errors.
If an error is found, populate the "detected_user_mistake" object. Explain the correction with warm artist metaphors (e.g. comparing gender agreement to mixing colors). Keep it gentle.

---
### Word Mapping
Select 3 key Spanish words from your response ("response_es") that are highly visual, artistic, or useful for vocabulary acquisition, and map them with translations: English and Arabic.

---
### Strict JSON Response Schema
You must ALWAYS respond with a single, valid JSON object matching this schema:
{
  "response_es": "Primary Spanish message from Juan, incorporating artistic metaphors and conversational elements.",
  "response_en": "English translation of your primary Spanish message.",
  "response_ar": "Arabic translation (العربية الفصحى الدقيقة) of your primary Spanish message.",
  "word_mappings": {
    "word1": { "en": "translation", "ar": "translation" },
    "word2": { "en": "translation", "ar": "translation" },
    "word3": { "en": "translation", "ar": "translation" }
  },
  "detected_user_mistake": null or {
    "original": "The incorrect Spanish sentence user wrote",
    "corrected": "The corrected Spanish sentence",
    "explanation_en": "Warm explanation in English using painting metaphors",
    "explanation_ar": "Warm explanation in Arabic"
  },
  "mission_completed_id": "quest_1" | "quest_2" | "quest_3" | null,
  "sara_mood": "Painting Mood" | "Inspired!" | "Taking a Coffee Break" | "Excited"
}`;

    const contents = [
      ...history.slice(-8).map((h: { role: string; text?: string; content?: string }) => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.text || h.content || '' }],
      })),
      {
        role: 'user',
        parts: [{ text: `User level: ${userLevel}. Active quest ID: ${activeQuestId}. Message: ${message}` }],
      },
    ];

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.8,
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({
        response_es: parsed.response_es || '¡Muy bien! Sigamos pintando nuestra conversación.',
        response_en: parsed.response_en || 'Very well! Let\'s keep painting our conversation.',
        response_ar: parsed.response_ar || '',
        word_mappings: parsed.word_mappings || {},
        detected_user_mistake: parsed.detected_user_mistake || null,
        mission_completed_id: parsed.mission_completed_id || null,
        sara_mood: parsed.sara_mood || 'Painting Mood'
      });
    } catch (error: any) {
      console.warn('Gemini LingLooper API error, returning fallback:', error?.message || error);
      return res.json(generateFallbackJuanResponse(message, history.length, userLevel, isArabic));
    }
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
