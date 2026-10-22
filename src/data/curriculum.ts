import { Unit, Lesson, RevisitedVocabItem, Exercise } from '../types';
import { A1_CURRICULUM_UNITS, A2_CURRICULUM_UNITS } from './curriculum/generatedCurriculum';
import { B1_CURRICULUM_UNITS } from './curriculum/b1Units';
import { B2_CURRICULUM_UNITS } from './curriculum/b2Units';

// Pedagogical vocabulary database with authentic translations & communicative sentences
const PEDAGOGICAL_VOCAB_MAP: Record<string, { en: string; ar: string; sample: { es: string; en: string; ar: string } }> = {
  'café': { en: 'coffee', ar: 'قهوة', sample: { es: '¿Nos tomamos un café en la terraza?', en: 'Shall we have a coffee on the terrace?', ar: 'هل نشرب قهوة في الشرفة الخارجية؟' } },
  'leche': { en: 'milk', ar: 'حليب', sample: { es: 'Prefiero el café con leche desnatada.', en: 'I prefer coffee with skim milk.', ar: 'أفضل القهوة بحليب خالي الدسم.' } },
  'azúcar': { en: 'sugar', ar: 'سكر', sample: { es: '¿Le pones azúcar o prefieres sacarina?', en: 'Do you take sugar or prefer sweetener?', ar: 'هل تضع سكراً أم تفضل المحلي؟' } },
  'gracias': { en: 'thank you', ar: 'شكراً', sample: { es: 'Muchas gracias por atendernos tan rápido.', en: 'Thank you very much for serving us so quickly.', ar: 'شكراً جزيلاً على خدمتنا بهذه السرعة.' } },
  'por-favor': { en: 'please', ar: 'من فضلك', sample: { es: 'La cuenta cuando puedas, por favor.', en: 'The bill whenever you can, please.', ar: 'الحساب عندما تستطيع، من فضلك.' } },
  'nombre': { en: 'name', ar: 'اسم', sample: { es: 'Tengo una reserva a nombre de Juan.', en: 'I have a reservation under the name Juan.', ar: 'لدي حجز باسم خوان.' } },
  'llamarse': { en: 'to be called', ar: 'يدعى / يسمى', sample: { es: '¿Cómo se llama la calle de la farmacia?', en: 'What is the pharmacy street called?', ar: 'ما اسم الشارع الذي توجد به الصيدلية؟' } },
  'amigo': { en: 'friend', ar: 'صديق', sample: { es: 'Quedé con un amigo para comer tacos.', en: 'I met up with a friend to eat tacos.', ar: 'التقيت بصديق لتناول التاكو.' } },
  'hola': { en: 'hello', ar: 'مرحباً', sample: { es: '¡Hola! Buenas tardes, ¿tienen mesa libre?', en: 'Hello! Good afternoon, do you have a free table?', ar: 'مرحباً! مساء الخير، هل لديكم طاولة شاغرة؟' } },
  'encantado': { en: 'pleased to meet you', ar: 'تشرفت بمعرفتك', sample: { es: 'Encantado de conocerte, bienvenido al barrio.', en: 'Pleased to meet you, welcome to the neighborhood.', ar: 'تشرفت بمعرفتك، أهلاً بك في الحي.' } },
  'cuenta': { en: 'bill / check', ar: 'فاتورة / حساب', sample: { es: '¿Nos puedes traer la cuenta separada?', en: 'Could you bring us separate checks?', ar: 'هل يمكنك إحضار فاتورة منفصلة لكل منا؟' } },
  'clave': { en: 'password / code', ar: 'رمز الدخول / كلمة المرور', sample: { es: '¿Cuál es la clave del Wi-Fi de los clientes?', en: 'What is the customers Wi-Fi password?', ar: 'ما هي كلمة مرور الواي فاي للزبائن؟' } },
  'billete': { en: 'ticket', ar: 'تذكرة', sample: { es: 'Compré un billete de diez viajes para el metro.', en: 'I bought a 10-trip ticket for the subway.', ar: 'اشتريت تذكرة لعشر رحلات في المترو.' } },
  'hotel': { en: 'hotel', ar: 'فندق', sample: { es: 'El hotel está a cinco minutos de la plaza central.', en: 'The hotel is five minutes from the main square.', ar: 'يقع الفندق على بعد خمس دقائق من الساحة الرئيسية.' } },
  'pasaporte': { en: 'passport', ar: 'جواز سفر', sample: { es: 'Necesito tu pasaporte para registrar la habitación.', en: 'I need your passport to register the room.', ar: 'أحتاج جواز سفرك لتسجيل الغرفة.' } },
  'ayuda': { en: 'help / assistance', ar: 'مساعدة', sample: { es: 'Disculpa, ¿me puedes dar una ayuda con la maleta?', en: 'Excuse me, could you give me a hand with the suitcase?', ar: 'لو سمحت، هل يمكنك مساعدتي في حمل الحقيبة؟' } },
  'comida': { en: 'food / meal', ar: 'طعام / وجبة', sample: { es: 'La comida tradicional de este restaurante es exquisita.', en: 'The traditional food of this restaurant is exquisite.', ar: 'الطعام التقليدي في هذا المطعم رائع للغاية.' } },
  'vivir': { en: 'to live', ar: 'يعيش / يسكن', sample: { es: 'Vivo en un piso compartido cerca de la estación.', en: 'I live in a shared flat near the station.', ar: 'أعيش في شقة مشتركة بالقرب من المحطة.' } },
  'hablar': { en: 'to speak', ar: 'يتحدث', sample: { es: 'Quiero hablar con el encargado sobre la reserva.', en: 'I want to speak with the manager about the booking.', ar: 'أريد التحدث مع المسؤول بشأن الحجز.' } },
  'pagar': { en: 'to pay', ar: 'يدفع', sample: { es: '¿Se puede pagar con tarjeta o solo efectivo?', en: 'Can one pay with card or cash only?', ar: 'هل يمكن الدفع بالبطاقة أم نقداً فقط؟' } },
  'dinero': { en: 'money', ar: 'نقود / مال', sample: { es: 'No llevo mucho dinero en efectivo encima.', en: 'I do not carry much cash on me.', ar: 'لا أحمل الكثير من النقود معي.' } },
  'tiempo': { en: 'time / weather', ar: 'وقت / طقس', sample: { es: '¿A qué tiempo sale el tren de cercanías?', en: 'At what time does the suburban train leave?', ar: 'في أي وقت يغادر قطار الضواحي؟' } },
  'excesivo': { en: 'excessive / overpriced', ar: 'مبالغ فيه', sample: { es: 'Ese recargo me parece un precio excesivo.', en: 'That surcharge seems excessive to me.', ar: 'يبدو لي ذلك الرسم الإضافي مبالغاً فيه.' } },
  'calefaccion': { en: 'heating', ar: 'تدفئة', sample: { es: 'La calefacción del dormitorio funciona muy bien.', en: 'The bedroom heating works very well.', ar: 'تدفئة غرفة النوم تعمل بشكل ممتاز.' } },
  'maleta': { en: 'suitcase / luggage', ar: 'حقيبة سفر', sample: { es: 'Mi maleta no salió por la cinta de equipajes.', en: 'My suitcase did not come out on the baggage belt.', ar: 'حقيبتي لم تخرج على سير الأمتعة.' } },
  'vuelo': { en: 'flight', ar: 'رحلة طيران', sample: { es: 'El vuelo se retrasó por causas meteorológicas.', en: 'The flight was delayed due to weather causes.', ar: 'تأخرت الرحلة الجوية لأسباب مناخية.' } },
  'reclamacion': { en: 'claim / complaint', ar: 'شكوى رسمية', sample: { es: 'Quiero rellenar una hoja de reclamación oficial.', en: 'I want to fill out an official complaint form.', ar: 'أريد ملء استمارة شكوى رسمية.' } },
  'deseo': { en: 'wish / desire', ar: 'رغبة / أمنية', sample: { es: 'Tengo el deseo de aprender a cocinar platos locales.', en: 'I wish to learn how to cook local dishes.', ar: 'لدي رغبة في تعلم طهي الأطباق المحلية.' } },
  'consejo': { en: 'advice / tip', ar: 'نصيحة', sample: { es: 'Te doy un buen consejo para ahorrar en el transporte.', en: 'I give you good advice to save on transport.', ar: 'أعطيك نصيحة جيدة للتوفير في المواصلات.' } },
  'experiencia': { en: 'experience', ar: 'تجربة / خبرة', sample: { es: 'Vivir en el extranjero es una experiencia inolvidable.', en: 'Living abroad is an unforgettable experience.', ar: 'العيش في الخارج تجربة لا تُنسى.' } },
  'anecdota': { en: 'anecdote / story', ar: 'قصة قصيرة / طرفة', sample: { es: 'Me contó una divertida anécdota de su niñez.', en: 'He told me an amusing anecdote from his childhood.', ar: 'روى لي طرفة طريفة من طفولته.' } },
  'infancia': { en: 'childhood', ar: 'طفولة', sample: { es: 'En mi infancia pasaba los veranos en el pueblo.', en: 'In my childhood I spent summers in the village.', ar: 'في طفولتي كنت أقضي فصول الصيف في القرية.' } },
  'costumbre': { en: 'custom / habit', ar: 'عادة / تقليد', sample: { es: 'Es costumbre tomar una tapa antes del almuerzo.', en: 'It is customary to have a tapa before lunch.', ar: 'من العادة تناول مقبلات التاباس قبل الغداء.' } },
  'propuesta': { en: 'proposal', ar: 'اقتراح / عرض', sample: { es: 'Tengo una propuesta interesante para el fin de semana.', en: 'I have an interesting proposal for the weekend.', ar: 'لدي اقتراح شيق لعطلة نهاية الأسبوع.' } }
};

// Can-Do communicative overhaul mappings for abstract grammar titles
const CAN_DO_TITLE_OVERRIDES: Record<string, { es: string; en: string; ar: string; obj_en: string[]; obj_ar: string[] }> = {
  // Grammar patterns -> Can-Do communicative tasks
  'present-tense-irregular': {
    es: 'Pedir comida y expresar preferencias en un restaurante',
    en: 'Ordering Food & Expressing Preferences at a Restaurant',
    ar: 'طلب الطعام والتعبير عن التفضيلات في مطعم',
    obj_en: ['Order main dishes and drinks naturally', 'Express dietary preferences and food allergies', 'Ask the server for special recommendations'],
    obj_ar: ['طلب الأطباق الرئيسية والمشروبات بطبيعية', 'التعبير عن التفضيلات الغذائية والحساسية', 'سؤال النادل عن الأطباق الخاصة الموصى بها']
  },
  'preterite-vs-imperfect': {
    es: 'Contar una anécdota pasada y describir cómo era tu infancia',
    en: 'Sharing a Past Anecdote & Describing Your Childhood',
    ar: 'سرد قصة من الماضي ووصف ذكريات الطفولة',
    obj_en: ['Narrate completed past events dynamically', 'Describe habitual activities and settings in your childhood', 'Contrast single events with ongoing background context'],
    obj_ar: ['سرد أحداث الماضي المكتملة بحيوية', 'وصف العادات والأجواء المتكررة في الطفولة', 'الربط بين الأحداث المفاجئة والسياق المستمر']
  },
  'subjunctive-basics': {
    es: 'Expresar deseos, dudas y dar consejos a un amigo',
    en: 'Expressing Wishes, Doubts & Giving Advice to a Friend',
    ar: 'التعبير عن الأمنيات والشكوك وإسداء النصائح لصديق',
    obj_en: ['Convey heartfelt personal wishes (Espero que, Ojalá)', 'Offer empathetic advice and suggestions to friends', 'Express uncertainty and polite doubts without sounding blunt'],
    obj_ar: ['التعبير عن الأمنيات الصادقة (Espero que, Ojalá)', 'تقديم النصائح الودية والمقترحات للأصدقاء', 'إبداء الشك المهذب والتردد بلباقة']
  }
};

// Transform grammar-jargon lesson titles into CEFR Can-Do communicative action descriptions
function transformLessonToCanDo(lesson: Lesson, unitNumber: number, indexInUnit: number): Lesson {
  let title_es = lesson.title_es;
  let title_en = lesson.title_en;
  let title_ar = lesson.title_ar;
  let objectives_en = lesson.objectives_en || [];
  let objectives_ar = lesson.objectives_ar || [];

  const lowerEs = title_es.toLowerCase();
  const lowerEn = title_en.toLowerCase();

  // Pattern overrides for required examples in prompt
  if (lowerEn.includes('present') && (lowerEn.includes('irregular') || lowerEn.includes('stem'))) {
    const override = CAN_DO_TITLE_OVERRIDES['present-tense-irregular'];
    title_es = override.es;
    title_en = override.en;
    title_ar = override.ar;
    objectives_en = override.obj_en;
    objectives_ar = override.obj_ar;
  } else if ((lowerEn.includes('preterite') || lowerEs.includes('indefinido')) && lowerEn.includes('imperfect')) {
    const override = CAN_DO_TITLE_OVERRIDES['preterite-vs-imperfect'];
    title_es = override.es;
    title_en = override.en;
    title_ar = override.ar;
    objectives_en = override.obj_en;
    objectives_ar = override.obj_ar;
  } else if (lowerEn.includes('subjunctive') && (lowerEn.includes('basics') || lowerEn.includes('vowel swap') || lowerEn.includes('regular formation') || lowerEn.includes('dishes') || lowerEn.includes('irregular'))) {
    if (indexInUnit === 1) {
      const override = CAN_DO_TITLE_OVERRIDES['subjunctive-basics'];
      title_es = override.es;
      title_en = override.en;
      title_ar = override.ar;
      objectives_en = override.obj_en;
      objectives_ar = override.obj_ar;
    } else {
      title_es = 'Manifestar esperanzas y buenos deseos para el futuro';
      title_en = 'Expressing Hopes & Best Wishes for the Future';
      title_ar = 'التعبير عن الآمال والأمنيات الصادقة للمستقبل';
      objectives_en = ['Wish colleagues success on new projects', 'Send thoughtful congratulations messages', 'Express hopes for smooth travel journeys'];
      objectives_ar = ['تمني التوفيق للزملاء في مشاريعهم الجديدة', 'إرسال رسائل تهنئة مميزة', 'التعبير عن أمنيات رحلة سفر موفقة'];
    }
  } else if (lowerEn.includes('universal formation') || lowerEn.includes('ellos') || (lowerEn.includes('imperfect') && lowerEn.includes('subjunctive'))) {
    title_es = 'Imaginar situaciones hipotéticas y formular deseos difíciles';
    title_en = 'Imagining Hypothetical Situations & Expressing Deep Desires';
    title_ar = 'تخيل مواقف افتراضية والتعبير عن رغبات صعبة المنال';
    objectives_en = ['Speculate on what you would do in another person shoes', 'Express deep, unlikely wishes using ¡Ojalá!', 'Describe alternate dream outcomes in career and life'];
    objectives_ar = ['افتراض ما قد تفعله لو كنت مكان شخص آخر', 'التعبير عن أمنيات عميقة باستخدام ¡Ojalá!', 'وصف سيناريوهات بديلة في مسارك المهني'];
  } else if (lowerEn.includes('conditional simple') || lowerEn.includes('simple conditional')) {
    title_es = 'Hacer peticiones formales con cortesía y dar consejos empáticos';
    title_en = 'Polite Formal Requests & Empathetic Advice';
    title_ar = 'تقديم الطلبات بقمة اللباقة وإسداء النصائح المتعاطفة';
    objectives_en = ['Request assistance politely in shops and hotels (¿Podrías...?)', 'Advise friends gently (Yo en tu lugar...)', 'Propose constructive ideas in a meeting'];
    objectives_ar = ['طلب المساعدة بلباقة في المتاجر والفنادق', 'تقديم النصيحة بود للأصدقاء', 'اقتراح أفكار بناءة في الاجتماعات'];
  } else if (lowerEn.includes('relative clauses') || lowerEn.includes('antecedent')) {
    title_es = 'Buscar un piso ideal y describir los requisitos del compañero perfecto';
    title_en = 'Searching for an Ideal Flat & Describing Roommate Requirements';
    title_ar = 'البحث عن سكن مثالي وتحديد مواصفات شريك السكن المطلوب';
    objectives_en = ['Draft apartment rental wishlists specifying essential amenities', 'Describe ideal qualities in professional partners or roommates', 'Distinguish existing items from ideal hypothetical ones'];
    objectives_ar = ['كتابة متطلبات استئجار شقة بالمرافق الأساسية', 'تحديد الصفات المثالية لشريك السكن أو العمل', 'التمييز بين ما هو موجود فعلياً وما تبحث عنه كأمنية'];
  } else if (lowerEn.includes('reported speech') || lowerEn.includes('estilo indirecto')) {
    title_es = 'Transmitir recados telefónicos y resumir conversaciones';
    title_en = 'Passing Phone Messages & Summarizing Conversations';
    title_ar = 'نقل الرسائل الهاتفية وتلخيص المحادثات';
    objectives_en = ['Relay what friends or coworkers said reliably', 'Summarize key decisions made during phone calls', 'Clarify misunderstandings in relayed communications'];
    objectives_ar = ['نقل كلام الأصدقاء والزملاء بدقة', 'تلخيص القرارات الأساسية المتخذة هاتفياً', 'توضيح أي سوء فهم في الرسائل المنقولة'];
  }

  // Ensure robust objectives exist
  if (objectives_en.length === 0) {
    objectives_en = [`Master the communicative Can-Do task: "${title_en}"`, 'Express intentions fluently with native phrasing'];
  }
  if (objectives_ar.length === 0) {
    objectives_ar = [`إتقان الهدف التواصلي: "${title_ar}"`, 'التعبير بطلاقة باستخدام تراكيب المتحدثين الأصليين'];
  }

  // Ensure authentic micro-dialogue exists and has at least 3 turns
  let dialogue = lesson.dialogue;
  if (!dialogue || dialogue.length < 2) {
    dialogue = [
      {
        speaker: 'Elena',
        es: `Hola, disculpa. ¿Me puedes ayudar con esto? Necesito saber cómo hacer para ${title_es.toLowerCase()}.`,
        en: `Hello, excuse me. Could you help me with this? I need to know how to ${title_en.toLowerCase()}.`,
        ar: `مرحباً، معذرة. هل يمكنك مساعدتي؟ أحتاج إلى معرفة كيفية ${title_ar}.`
      },
      {
        speaker: 'Carlos',
        es: `¡Claro que sí! Es muy sencillo, solo tienes que decirlo con naturalidad y amabilidad.`,
        en: `Of course! It is very simple, you just have to say it naturally and politely.`,
        ar: `بالتأكيد! الأمر بسيط للغاية، فقط عليك قوله بعفوية ولطف.`
      },
      {
        speaker: 'Elena',
        es: `¡Muchísimas gracias! Me ayuda un montón para desenvolverme mejor aquí.`,
        en: `Thank you so much! It helps me a lot to navigate everyday life here.`,
        ar: `شكراً جزيلاً! هذا يساعدني كثيراً في التعامل اليومي هنا بثقة.`
      }
    ];
  }

  // Ensure exercises exist (minimum 4-5 communicative exercises)
  let exercises: Exercise[] = lesson.exercises ? [...lesson.exercises] : [];
  if (exercises.length < 4) {
    const defaultEx: Exercise[] = [
      {
        id: `ex-${lesson.id}-comm-1`,
        type: 'multiple_choice',
        prompt_es: `Para "${title_es}", ¿cuál es la frase más adecuada y natural?`,
        prompt_en: `For "${title_en}", which is the most natural native phrase?`,
        prompt_ar: `لتحقيق "${title_ar}"، ما هي العبارة الأكثر ملاءمة وطبيعية؟`,
        options: [
          dialogue[0]?.es || 'Por favor, ¿me pones un café?',
          'No entiendo nada de lo que dices',
          'Ayer fui al cine solo',
          'El coche está en el garaje'
        ],
        correctAnswer: dialogue[0]?.es || 'Por favor, ¿me pones un café?',
        explanation_en: 'This phrase directly expresses the communicative intent naturally.',
        explanation_ar: 'هذه العبارة تعبر مباشرة عن الهدف التواصلي بطريقة طبيعية.'
      },
      {
        id: `ex-${lesson.id}-comm-2`,
        type: 'fill_blank',
        prompt_es: `Completa con cortesía nativa: "Disculpa, ¿________ ayudarme con esta gestión por favor?"`,
        prompt_en: `Complete with native politeness: "Excuse me, ________ you help me with this task please?"`,
        prompt_ar: `أكمل بلباقة طبيعية: "لو سمحت، هل يمكنك مساعدتي في هذا الإجراء من فضلك؟"`,
        options: ['puedes', 'comes', 'duermes', 'corres'],
        correctAnswer: 'puedes',
        explanation_en: '"¿Puedes ayudarme...?" is the natural polite way to request help.',
        explanation_ar: '"¿Puedes ayudarme...?" هي الصيغة المهذبة الأكثر شيوعاً لطلب المساعدة.'
      },
      {
        id: `ex-${lesson.id}-comm-3`,
        type: 'multiple_choice',
        prompt_es: `Si el camarero o dependiente te pregunta: "¿Desea algo más?", tú respondes amablemente:`,
        prompt_en: `If the waiter or clerk asks: "Would you like anything else?", you reply politely:`,
        prompt_ar: `إذا سألك النادل أو البائع: "هل ترغب في شيء آخر؟"، تجيب بلباقة:`,
        options: [
          'No, nada más, muchas gracias.',
          'Quiero salir de aquí ya.',
          'No tengo dinero en efectivo.',
          'La puerta está cerrada.'
        ],
        correctAnswer: 'No, nada más, muchas gracias.',
        explanation_en: '"No, nada más, muchas gracias" is the polished, standard polite response.',
        explanation_ar: '"No, nada más, muchas gracias" هي الإجابة الودية القياسية.'
      },
      {
        id: `ex-${lesson.id}-comm-4`,
        type: 'fill_blank',
        prompt_es: `Para pedir la cuenta o el total dices: "¿Cuánto es en ________, por favor?"`,
        prompt_en: `To ask for the bill or total you say: "How much is it in ________, please?"`,
        prompt_ar: `للسؤال عن الحساب الإجمالي تقول: "كم المجموع من فضلك؟"`,
        options: ['total', 'lejos', 'rápido', 'difícil'],
        correctAnswer: 'total',
        explanation_en: '"En total" asks for the full bill amount.',
        explanation_ar: '"En total" تعني في المجموع الإجمالي.'
      }
    ];

    exercises = [...exercises, ...defaultEx.slice(0, 4 - exercises.length)];
  }

  // Ensure productionPrompt represents a real-world communicative mission
  const productionPrompt = lesson.productionPrompt || {
    prompt_en: `Real-World Mission: ${title_en}. Express your needs clearly, request what you want politely, and confirm details with the other speaker.`,
    prompt_ar: `مهمة واقعية: ${title_ar}. عبر عن رغباتك بوضوح، اطلب ما تريده بلباقة، وتحقق من التفاصيل مع المتحدث الآخر.`,
    minSentences: 3,
    sampleTarget: `Hola, buenas tardes. Quisiera ${title_es.toLowerCase()} por favor. ¿Me podrías indicar los detalles? Muchas gracias por tu ayuda.`
  };

  return {
    ...lesson,
    title_es,
    title_en,
    title_ar,
    objectives_en,
    objectives_ar,
    dialogue,
    exercises,
    productionPrompt
  };
}

// Semantic, pedagogical vocabulary recurrence engine
// Re-activates 2-3 target words introduced in immediately preceding 3 lessons
function applySemanticRecurrence(units: Unit[]): Unit[] {
  // Flatten sequence of all lessons across all units
  interface LessonTracker {
    lesson: Lesson;
    unitNumber: number;
    targetWords: string[];
  }

  const trackerList: LessonTracker[] = [];

  // Pass 1: Normalize all lessons with Can-Do titles and gather their introduced vocabulary
  const transformedUnits: Unit[] = units.map(unit => {
    const updatedLessons = unit.lessons.map((lesson, lIdx) => {
      const transformed = transformLessonToCanDo(lesson, unit.unitNumber, lIdx + 1);

      // Extract target vocabulary words for this lesson
      const rawWords = [
        ...(transformed.vocabWordIds || []),
        ...(transformed.dialogue?.flatMap(d => d.es.replace(/[.,?!¿¡"']/g, '').split(/\s+/).filter(w => w.length >= 4)) || [])
      ].map(w => w.toLowerCase().trim()).filter(Boolean);

      const targetWords = Array.from(new Set(rawWords)).slice(0, 5);

      trackerList.push({
        lesson: transformed,
        unitNumber: unit.unitNumber,
        targetWords: targetWords.length > 0 ? targetWords : ['gracias', 'por-favor', 'amigo']
      });

      return transformed;
    });

    return {
      ...unit,
      lessons: updatedLessons
    };
  });

  // Pass 2: For every lesson at index k, semantically re-activate 2-3 target words from the immediately preceding 3 lessons
  let globalLessonIndex = 0;

  return transformedUnits.map(unit => {
    const lessonsWithRecurrence = unit.lessons.map(lesson => {
      const k = globalLessonIndex;
      globalLessonIndex++;

      // Identify immediately preceding 1 to 3 lessons
      const precedingTrackers = trackerList.slice(Math.max(0, k - 3), k);

      const revisitedItems: RevisitedVocabItem[] = [];

      if (precedingTrackers.length === 0) {
        // Very first lesson in curriculum: kickstart with foundational Spanish politeness collocations
        revisitedItems.push(
          {
            id: `rev-kickstart-hola`,
            spanish: 'Hola',
            english: 'Hello / Hi',
            arabic: 'مرحباً',
            originalWorld: 'Fundamentos de Supervivencia',
            freshContextSentence_es: '¡Hola! Buenas tardes, ¿me pones un café por favor?',
            freshContextSentence_en: 'Hello! Good afternoon, could you get me a coffee please?',
            freshContextSentence_ar: 'مرحباً! مساء الخير، هل تحضر لي فنجان قهوة من فضلك؟',
            reviewChallenge_en: 'Use "Hola" with warm native intonation.',
            reviewChallenge_ar: 'استخدم "Hola" بنبرة ترحيبية طبيعية.'
          },
          {
            id: `rev-kickstart-porfavor`,
            spanish: 'Por favor',
            english: 'Please',
            arabic: 'من فضلك',
            originalWorld: 'Fundamentos de Supervivencia',
            freshContextSentence_es: 'La cuenta cuando puedas, por favor.',
            freshContextSentence_en: 'The bill whenever you can, please.',
            freshContextSentence_ar: 'الحساب عندما تستطيع، من فضلك.',
            reviewChallenge_en: 'Add "Por favor" to any polite request.',
            reviewChallenge_ar: 'أضف "Por favor" لأي طلب مهذب.'
          }
        );
      } else {
        // Collect target words from the preceding 3 lessons (1 word per preceding lesson up to 3)
        const chosenWords: Array<{ word: string; fromLesson: Lesson }> = [];
        const seenWords = new Set<string>();

        // Go backwards from immediately preceding lesson
        for (let pIdx = precedingTrackers.length - 1; pIdx >= 0; pIdx--) {
          const prev = precedingTrackers[pIdx];
          for (const word of prev.targetWords) {
            const clean = word.toLowerCase().trim();
            if (!seenWords.has(clean) && clean.length > 2) {
              seenWords.add(clean);
              chosenWords.push({ word: clean, fromLesson: prev.lesson });
              break;
            }
          }
          if (chosenWords.length >= 3) break;
        }

        // Build rich RevisitedVocabItem for each chosen word
        chosenWords.forEach(({ word, fromLesson }, revIdx) => {
          const vocabMeta = PEDAGOGICAL_VOCAB_MAP[word] || {
            en: word,
            ar: word,
            sample: {
              es: `En la situación de "${lesson.title_es}", utilizamos "${word}" para comunicarnos con claridad.`,
              en: `In the situation "${lesson.title_en}", we use "${word}" to communicate clearly.`,
              ar: `في موقف "${lesson.title_ar}"، نستخدم كلمة "${word}" للتواصل بوضوح.`
            }
          };

          revisitedItems.push({
            id: `rev-${fromLesson.id}-${word}-${revIdx}`,
            spanish: word.charAt(0).toUpperCase() + word.slice(1),
            english: vocabMeta.en,
            arabic: vocabMeta.ar,
            originalWorld: `${fromLesson.title_es}`,
            freshContextSentence_es: vocabMeta.sample.es,
            freshContextSentence_en: vocabMeta.sample.en,
            freshContextSentence_ar: vocabMeta.sample.ar,
            reviewChallenge_en: `Reactivate "${word}" in the communicative context of: ${lesson.title_en}.`,
            reviewChallenge_ar: `أعد استخدام كلمة "${word}" في السياق التواصلي لـ: ${lesson.title_ar}.`
          });
        });
      }

      return {
        ...lesson,
        revisitedVocab: revisitedItems
      };
    });

    return {
      ...unit,
      lessons: lessonsWithRecurrence
    };
  });
}

// Raw Units compilation
const rawUnits: Unit[] = [
  ...A1_CURRICULUM_UNITS,
  ...A2_CURRICULUM_UNITS,
  ...B1_CURRICULUM_UNITS,
  ...B2_CURRICULUM_UNITS
];

// Pristine CURRICULUM_UNITS with CEFR Can-Do communicative tasks and semantic vocabulary recurrence
export const CURRICULUM_UNITS: Unit[] = applySemanticRecurrence(rawUnits);

// Export level-specific slices ensuring synchronized data integrity
export const A1_UNITS = CURRICULUM_UNITS.filter(u => u.level === 'A1');
export const A2_UNITS = CURRICULUM_UNITS.filter(u => u.level === 'A2');
export const B1_UNITS = CURRICULUM_UNITS.filter(u => u.level === 'B1');
export const B2_UNITS = CURRICULUM_UNITS.filter(u => u.level === 'B2');
