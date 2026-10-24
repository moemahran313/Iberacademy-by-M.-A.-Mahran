import { Lesson } from '../types';
import { AUTHENTIC_DIALOGUES_MAP } from './dialoguesData';

export const SAMPLE_AUTHENTIC_LESSONS: Lesson[] = [
  // 1. Housing & Shared Flat Chores
  {
    id: 'lesson-housing-piso-limpieza',
    unitId: 'unit-housing-survival',
    lessonNumber: 1,
    title_es: 'Convivir en un piso compartido y negociar el cuadrante de limpieza',
    title_en: 'Living in a Shared Flat & Negotiating the Cleaning Schedule',
    title_ar: 'العيش في شقة مشتركة والتفاوض حول جدول التنظيف المنزلي',
    cefr: 'A2',
    objectives_en: [
      'Politely remind flatmates of pending chores without creating friction',
      'Use natural Spanish discourse markers like "A ver..." and "Pues la verdad es que..."',
      'Explain hectic work schedules and reach constructive agreements'
    ],
    objectives_ar: [
      'تذكير زملاء السكن بلباقة بالمهام المنزلية المعلقة دون خلق توتر',
      'استخدام علامات الخطاب الطبيعية مثل "A ver..." و"Pues la verdad es que..."',
      'شرح ضغوط العمل والتوصل إلى حلول عملية وتوافقية'
    ],
    vocabWordIds: ['piso', 'limpiar', 'casero', 'fianza', 'horario'],
    culturalNote: {
      title: 'La vida en pisos compartidos en España y Latinoamérica',
      content_en: 'With skyrocketing urban rents in Madrid, Barcelona, and Buenos Aires, living with flatmates (compañeros de piso) is the norm well into your thirties. A shared cleaning schedule (cuadrante) and common kitty (bote común) are vital to maintain peace.',
      content_ar: 'مع ارتفاع أسعار الإيجارات الحضرية في مدريد وبرشلونة وبوينس آيرس، أصبح السكن المشترك نمط حياة مألوفاً حتى بعد سن الثلاثين. يُعد جدول التنظيف والصندوق المالي المشترك أساساً للتعايش السلمي.'
    },
    dialogue: AUTHENTIC_DIALOGUES_MAP['dial-housing-piso-limpieza'].turns,
    exercises: [
      {
        id: 'ex-housing-1-1',
        type: 'multiple_choice',
        prompt_es: 'Cuando quieres llamar la atención de tu compañero con naturalidad antes de reclamar algo, dices:',
        prompt_en: 'When you want to grab your flatmate’s attention naturally before bringing up an issue, you say:',
        prompt_ar: 'عندما تريد لفت انتباه شريك سكنك بعفوية قبل طرح مشكلة، تقول:',
        options: [
          'A ver, no es por ser pesado, pero te toca limpiar hoy.',
          'El niño come una manzana roja en la cocina.',
          'La biblioteca cierra a las diez de la noche.',
          'Usted debe limpiar la mesa inmediatamente.'
        ],
        correctAnswer: 'A ver, no es por ser pesado, pero te toca limpiar hoy.',
        explanation_en: '"A ver, no es por ser pesado..." is the authentic colloquial way to soften a roommate complaint.',
        explanation_ar: '"A ver, no es por ser pesado..." هي الصيغة العفوية اللبقة لتلطيف التنبيه بين زملاء السكن.'
      },
      {
        id: 'ex-housing-1-2',
        type: 'fill_blank',
        prompt_es: 'Completa con el conector de discurso natural: "________ la verdad es que tienes toda la razón, llegué reventado."',
        prompt_en: 'Complete with the natural discourse marker: "________ the truth is you are totally right, I arrived exhausted."',
        prompt_ar: 'أكمل بعلامة الخطاب الطبيعية: "في الحقيقة معك كل الحق، لقد وصلت منهكاً."',
        options: ['Pues', 'Manzana', 'Garaje', 'Caballo'],
        correctAnswer: 'Pues',
        explanation_en: '"Pues la verdad es que..." introduces honest agreement with conversational flow.',
        explanation_ar: '"Pues la verdad es que..." تستخدم في الحديث اليومي للتعبير عن الاتفاق الصادق.'
      },
      {
        id: 'ex-housing-1-3',
        type: 'multiple_choice',
        prompt_es: 'Si temes que el casero descuente dinero del depósito si encuentra desorden, dices:',
        prompt_en: 'If you fear the landlord will deduct money from the deposit if he finds a mess, you say:',
        prompt_ar: 'إذا كنت تخشى أن يخصم المؤجر من التأمين المالي إذا رأى فوضى، تقول:',
        options: [
          'No quiero que nos eche bronca ni amenace con quitarnos la fianza.',
          'El coche está aparcado dentro del garaje.',
          'Ayer fui a comprar pan y fruta fresca.',
          'Mi abuela vive en un pueblo tranquilo.'
        ],
        correctAnswer: 'No quiero que nos eche bronca ni amenace con quitarnos la fianza.',
        explanation_en: 'Directly addresses authentic housing concerns ("fianza" = rental deposit, "echar bronca" = scold).',
        explanation_ar: 'تتناول واقع السكن الفعلي ("fianza" تعني التأمين المالي، و"echar bronca" تعني التوبيخ).'
      }
    ],
    productionPrompt: {
      prompt_en: 'Draft a short WhatsApp message to your flatmate proposing to swap cleaning chores this weekend because you have overtime at work.',
      prompt_ar: 'اكتب رسالة واتساب قصيرة لزميل سكنك تقترح فيها تبادل نوبة التنظيف لعطلة نهاية الأسبوع بسبب ساعات عمل إضافية.',
      minSentences: 3,
      sampleTarget: 'Oye, Marcos, ¿qué te iba a decir? Este finde tengo guardia en el curro y voy a llegar tardísimo. ¿Te importa que cambiemos el turno de la cocina y yo me encargo del salón la semana que viene? ¡Te debo un café!'
    }
  },

  // 2. Bureaucracy: NIE & Empadronamiento in Spain
  {
    id: 'lesson-bureaucracy-nie-padron',
    unitId: 'unit-bureaucracy-survival',
    lessonNumber: 1,
    title_es: 'Conseguir cita previa para el NIE y trámites de empadronamiento',
    title_en: 'Booking a NIE Appointment & Town Hall Census Registration',
    title_ar: 'حجز موعد الهوية الإسبانية وإجراءات إثبات السكن في البلدية',
    cefr: 'B1',
    objectives_en: [
      'Navigate the real hurdles of Spanish administrative appointments (cita previa)',
      'Understand documents needed for census registration (volante de empadronamiento)',
      'Use native expressions of frustration and reassurance ("Ni de coña", "Por si las moscas")'
    ],
    objectives_ar: [
      'التعامل مع عقبات حجز المواعيد الإدارية الإسبانية (Cita previa)',
      'فهم الأوراق المطلوبة للتسجيل البلدي (Volante de empadronamiento)',
      'استخدام التعابير العفوية الدارجة للتردد والاطمئنان ("Ni hablar", "Por si las moscas")'
    ],
    vocabWordIds: ['cita', 'documento', 'policia', 'ayuntamiento', 'esperar'],
    culturalNote: {
      title: 'El laberinto burocrático del NIE y el Padrón',
      content_en: 'Getting an immigration appointment (cita previa) in Spain is notorious among newcomers. The "padrón" (municipal registry) is the foundation of Spanish civil life, required for health cards, schooling, and residency card issuance.',
      content_ar: 'يُعد الحصول على موعد في مصلحة الهجرة الإسبانية من أشهر التحديات التي تواجه القادمين الجدد. يعتبر إثبات السكن (البادرون) هو الركيزة الأساسية للوصول إلى الخدمات الصحية والمدارس وتجديد الإقامة.'
    },
    dialogue: AUTHENTIC_DIALOGUES_MAP['dial-bureaucracy-nie-madrid'].turns,
    exercises: [
      {
        id: 'ex-bureaucracy-1-1',
        type: 'multiple_choice',
        prompt_es: '¿Por qué es crucial llevar el volante de empadronamiento con menos de 90 días de antigüedad?',
        prompt_en: 'Why is it crucial to bring a census certificate that is less than 90 days old?',
        prompt_ar: 'لماذا من الضروري إحضار إثبات سكن لم يمضِ على إصداره 90 يوماً؟',
        options: [
          'Porque si tiene más de tres meses caduca y te rechazan el trámite en Extranjería.',
          'Porque el banco no abre los domingos.',
          'Porque el metro de Madrid no acepta papel.',
          'Porque la biblioteca pública está en reformas.'
        ],
        correctAnswer: 'Porque si tiene más de tres meses caduca y te rechazan el trámite en Extranjería.',
        explanation_en: 'In Spanish bureaucracy, census certificates are strictly valid for 3 months.',
        explanation_ar: 'في المعاملات الحكومية الإسبانية، شهادة إثبات السكن صالحة بدقة لمدة 3 أشهر فقط.'
      },
      {
        id: 'ex-bureaucracy-1-2',
        type: 'fill_blank',
        prompt_es: 'Completa con la frase de precaución nativa: "Pide el certificado digital actualizado, por si las ________."',
        prompt_en: 'Complete with the native precaution idiom: "Request the updated digital certificate, just in case (por si las ________)."',
        prompt_ar: 'أكمل بالمثل الدارج للاحتياط: "اطلب الشهادة الرقمية المحدثة، تحسباً لأي طارئ (Por si las moscas)."',
        options: ['moscas', 'manzanas', 'mesas', 'ventanas'],
        correctAnswer: 'moscas',
        explanation_en: '"Por si las moscas" is the essential Spanish idiom meaning "just in case".',
        explanation_ar: '"Por si las moscas" هو التعبير الإسباني الشهير الذي يعني "تحسباً لأي ظرف".'
      }
    ],
    productionPrompt: {
      prompt_en: 'Explain to a friend who just arrived in Madrid what documents they need to take to their police fingerprinting appointment.',
      prompt_ar: 'اشرح لصديق وصل حديثاً إلى مدريد المستندات التي يحتاجها لموعد أخذ البصمات في مخفر الشرطة.',
      minSentences: 3,
      sampleTarget: 'Fíjate bien: tienes que llevar el pasaporte original en vigor, la confirmación de la cita previa impresa y la tasa 790 pagada en el banco. Sobre todo, no te olvides del volante de empadronamiento actualizado con menos de tres meses.'
    }
  },

  // 3. Modern Social Life: Tardeo & Bizum
  {
    id: 'lesson-social-tardeo-bizum',
    unitId: 'unit-social-life',
    lessonNumber: 1,
    title_es: 'Organizar un tardeo entre amigos y dividir la cuenta por Bizum',
    title_en: 'Organizing an Afternoon "Tardeo" & Splitting Bills with Bizum',
    title_ar: 'تنظيم قعدة مسائية وتقسيم حساب المشروبات والمقبلات عبر بيزوم',
    cefr: 'A1',
    objectives_en: [
      'Suggest an afternoon terrace plan ("tardeo") rather than late night clubbing',
      'Handle modern mobile payment etiquette ("Te hago un Bizum")',
      'Order tapas and rounds of drinks with native spontaneity'
    ],
    objectives_ar: [
      'اقتراح سهرة عصر ومساء مبكرة (Tardeo) بدلاً من السهر المتأخر',
      'التعامل مع ثقافة الدفع الفوري عبر الهاتف المحمول (Bizum)',
      'طلب المقبلات الإسبانية بأسلوب عفوي وطبيعي'
    ],
    vocabWordIds: ['cuenta', 'pagar', 'amigo', 'terraza', 'quedar'],
    culturalNote: {
      title: 'El auge del tardeo y el verbo "hacer un Bizum"',
      content_en: '"El tardeo" has become a cultural phenomenon across Spain: meeting up on sunny terraces at 4 PM for drinks, tapas, and music, finishing before midnight. "Bizum" is so universal in Spain that it has become an everyday verb: "hacer un Bizum".',
      content_ar: 'أصبح "التارديو" ظاهرة اجتماعية كبرى في إسبانيا، حيث يجتمع الأصدقاء في المقاهي الخارجية في الرابعة عصراً لتناول التاباس والدردشة حتى منتصف الليل. وتطبيق "بيزوم" أصبح فعلاً يومياً يقال: "سأعمل لك بيزوم".'
    },
    dialogue: AUTHENTIC_DIALOGUES_MAP['dial-social-tardeo-bizum'].turns,
    exercises: [
      {
        id: 'ex-social-1-1',
        type: 'multiple_choice',
        prompt_es: 'En un bar con amigos, si una persona paga el total con tarjeta y tú quieres devolverle tu parte al móvil al instante, dices:',
        prompt_en: 'At a bar with friends, if one person pays the whole bill by card and you want to instantly reimburse your share to their phone, you say:',
        prompt_ar: 'في مطعم مع أصدقائك، إذا دفع أحدهم الحساب بالبطاقة وتريد إرسال حصتك فوراً إلى هاتفه، تقول:',
        options: [
          'Paga tú todo y te hago un Bizum con mi parte ahora mismo.',
          'El tren llega a la estación con retraso.',
          'Me gusta comer manzanas rojas en el parque.',
          '¿Dónde está la farmacia más cercana?'
        ],
        correctAnswer: 'Paga tú todo y te hago un Bizum con mi parte ahora mismo.',
        explanation_en: '"Te hago un Bizum" is the ubiquitous way Spaniards split restaurant checks today.',
        explanation_ar: '"Te hago un Bizum" هي الطريقة الدارجة واليومية في إسبانيا لتقاسم فواتير المطاعم.'
      },
      {
        id: 'ex-social-1-2',
        type: 'multiple_choice',
        prompt_es: '¿Qué es exactamente un "tardeo"?',
        prompt_en: 'What is a "tardeo" in modern Spanish culture?',
        prompt_ar: 'ما هو الـ "Tardeo" في الثقافة الإسبانية الحديثة؟',
        options: [
          'Salir de cañas, tapas y música por la tarde para volver a casa a una hora prudente.',
          'Llegar tarde a una reunión de trabajo.',
          'Una siesta muy larga después de comer.',
          'Una clase nocturna en la universidad.'
        ],
        correctAnswer: 'Salir de cañas, tapas y música por la tarde para volver a casa a una hora prudente.',
        explanation_en: 'Tardeo is afternoon socializing that replaces exhausting late-night clubbing.',
        explanation_ar: 'التارديو هو الخروج للاستمتاع بعد الظهر بالمقبلات والموسيقى والعودة باكراً للنوم براحة.'
      }
    ],
    productionPrompt: {
      prompt_en: 'Propose a Saturday afternoon tardeo plan to your friends on WhatsApp and tell them you will split the bill with Bizum.',
      prompt_ar: 'اقترح خطة خروج عصر السبت (تارديو) على أصدقائك عبر واتساب وأخبرهم أنكم ستقسمون الفاتورة عبر بيزوم.',
      minSentences: 3,
      sampleTarget: '¡Buenas a todos! ¿Qué les parece si este sábado nos marcamos un tardeo en la plaza a partir de las cinco? Nos tomamos unas cañas al sol y picamos algo. Paga uno con tarjeta y nos arreglamos por Bizum al momento. ¡Díganme quién se apunta!'
    }
  },

  // 4. Frustrations: Summer Heatwave & Domestic Breakdowns
  {
    id: 'lesson-frustrations-ola-calor',
    unitId: 'unit-daily-realities',
    lessonNumber: 1,
    title_es: 'Sobrevivir a la ola de calor y quejarse del bochorno del verano',
    title_en: 'Surviving the 40°C Heatwave & Complaining About Summer Bochorno',
    title_ar: 'التعايش مع موجة الحر الشديدة والتذمر من القيظ الصيفي',
    cefr: 'A2',
    objectives_en: [
      'Complain authentically about extreme heat using native idioms ("hace un bochorno", "no hay quien duerma")',
      'Discuss practical heat mitigation (persianas bajadas, ventilador, aire acondicionado)',
      'Use natural empathetic discourse ("¡Madre mía!", "Para colmo de males")'
    ],
    objectives_ar: [
      'التذمر بأسلوب أصيل من الحر الشديد باستخدام التعابير المحلية ("bochorno", "no hay quien duerma")',
      'مناقشة طرق التعامل مع الحر (إنزال الستائر، المراوح، التكييف)',
      'استخدام عبارات التعاطف الطبيعية ("¡Madre mía!", "Para colmo de males")'
    ],
    vocabWordIds: ['calor', 'tiempo', 'verano', 'dormir', 'calle'],
    culturalNote: {
      title: 'El ritual español contra las olas de calor',
      content_en: 'During July and August across inland Spain (Madrid, Seville, Córdoba), temperatures routinely exceed 40°C. Spaniards practice a strict domestic ritual: closing all blinds and windows at 10 AM to trap cool air, venturing out only after 9 PM.',
      content_ar: 'خلال شهري يوليو وأغسطس في المدن الداخلية بإسبانيا (مدريد، إشبيلية، قرطبة)، تتجاوز الحرارة 40 درجة مئوية. يتبع السكان طقساً منزلياً صارماً: إنزال الستائر وإغلاق النوافذ بحلول العاشرة صباحاً لحبس البرودة، وعدم الخروج إلا بعد التاسعة ليلاً.'
    },
    dialogue: AUTHENTIC_DIALOGUES_MAP['dial-frustrations-ola-calor'].turns,
    exercises: [
      {
        id: 'ex-heat-1-1',
        type: 'multiple_choice',
        prompt_es: 'Si el calor es insoportable y el aire es muy pesado y húmedo, un español dice:',
        prompt_en: 'If the heat is unbearable and the air feels heavy and stifling, a native Spaniard says:',
        prompt_ar: 'إذا كان الحر خانقاً والهواء ثقيلاً جداً، يقول الإسباني بعفوية:',
        options: [
          '¡Qué bochorno hace hoy, no se puede ni respirar!',
          'El coche está en el garaje de la casa.',
          'Mi libro favorito está en la biblioteca.',
          'Buenos días, me llamo Carlos y soy estudiante.'
        ],
        correctAnswer: '¡Qué bochorno hace hoy, no se puede ni respirar!',
        explanation_en: '"Bochorno" specifically describes suffocating, heavy hot weather.',
        explanation_ar: '"Bochorno" كلمة إسبانية تعبر بدقة عن القيظ الخانق والهواء الثقيل.'
      },
      {
        id: 'ex-heat-1-2',
        type: 'fill_blank',
        prompt_es: 'Completa la expresión española para cuando es imposible conciliar el sueño: "Con este calor, esta noche no hay quien pegue ________."',
        prompt_en: 'Complete the idiom for when it is impossible to sleep: "Con este calor, no hay quien pegue ________ (catch a wink of sleep)."',
        prompt_ar: 'أكمل التعبير الإسباني الشهير للعجز عن النوم: "لا يستطيع أحد أن يغمض له جفن (pegar ojo)."',
        options: ['ojo', 'mesa', 'manzana', 'coche'],
        correctAnswer: 'ojo',
        explanation_en: '"Pegar ojo" is the standard idiomatic expression for falling asleep.',
        explanation_ar: '"Pegar ojo" هو التعبير الاصطلاحي الشائع الذي يعني النوم أو إغماض العين.'
      }
    ],
    productionPrompt: {
      prompt_en: 'Write a short message to a coworker complaining about the heat wave and suggesting having your afternoon meeting online instead of walking across town.',
      prompt_ar: 'اكتب رسالة لزميل عمل تتذمر فيها من موجة الحر وتقترح عقد اجتماعكما عبر الإنترنت بدلاً من السير في حرارة الشارع.',
      minSentences: 3,
      sampleTarget: 'Hola, Carlos. Mira, el termómetro marca cuarenta y un grados y la calle es un horno. ¿Te importa que hagamos la reunión de las cuatro por videollamada en vez de vernos en la oficina? Es que a estas horas no hay quien cruce el centro sin derretirse.'
    }
  }
];

export const SAMPLE_AUTHENTIC_LESSONS_MAP: Record<string, Lesson> = Object.fromEntries(
  SAMPLE_AUTHENTIC_LESSONS.map(l => [l.id, l])
);
