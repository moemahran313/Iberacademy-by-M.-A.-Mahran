import { Unit } from '../../types';

export const A1_UNITS_PART3: Unit[] = [
  // UNIT 11: Planes y Futuro Próximo
  {
    id: 'unit-a1-11',
    level: 'A1',
    unitNumber: 11,
    title_es: 'Planes y Futuro Próximo',
    title_en: 'Plans & Near Future',
    title_ar: 'الخطط والمستقبل القريب',
    description_en: 'Express future intentions, appointments, weekend plans using the periphrasis Ir a + Infinitive.',
    description_ar: 'التعبير عن النوايا المستقبلية، المواعيد، وخطط العطلات باستخدام تركيب Ir a + المصدر.',
    lessons: [
      {
        id: 'lesson-a1-11-1',
        unitId: 'unit-a1-11',
        lessonNumber: 1,
        title_es: 'La Perífrasis: Ir a + Infinitivo',
        title_en: 'The Periphrasis: Ir a + Infinitive',
        title_ar: 'التركيب القريب: فعل الذهاب + a + المصدر',
        cefr: 'A1',
        objectives_en: ['Form the near future formula (Voy a + infinitive)', 'Express intentions for today, tomorrow, and next week', 'Ask others about upcoming plans'],
        objectives_ar: ['صياغة قاعدة المستقبل القريب (Voy a + المصدر)', 'التعبير عن النوايا لليوم، الغد، والأسبوع القادم', 'سؤال الآخرين عن خططهم المستقبلية'],
        vocabWordIds: ['w-ir', 'w-manana', 'w-proximo', 'w-viajar', 'w-comprar'],
        dialogue: [
          { speaker: 'Sergio', es: '¿Qué vas a hacer este fin de semana?', en: 'What are you going to do this weekend?', ar: 'ماذا ستفعل في عطلة نهاية هذا الأسبوع؟' },
          { speaker: 'Elena', es: 'Voy a viajar a Sevilla con mis amigos. Vamos a visitar la Plaza de España y comer tapas.', en: 'I am going to travel to Seville with my friends. We are going to visit Plaza de España and eat tapas.', ar: 'سأسافر إلى إشبيلية مع أصدقائي. سنزور ساحة إسبانيا ونتناول التاباس.' }
        ],
        exercises: [
          {
            id: 'ex-a1-11-1-1',
            type: 'multiple_choice',
            prompt_es: 'Mañana nosotros ______ a estudiar en la biblioteca.',
            prompt_en: 'Choose the correct form of IR for the near future:',
            prompt_ar: 'اختر تصريف فعل IR المناسب لصيغة المستقبل القريب مع nosotros:',
            options: ['vamos', 'va', 'van', 'voy'],
            correctAnswer: 'vamos',
            explanation_en: '"Nosotros vamos a + infinitive" indicates our future plan.',
            explanation_ar: '"Nosotros vamos a + المصدر" تدل على خطتنا المستقبلية.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences describing 3 things you are going to do next weekend using "Voy a / Vamos a".',
          prompt_ar: 'اكتب 3 جمل تصف فيها 3 أشياء ستفعلها في عطلة نهاية الأسبوع القادمة باستخدام Voy a / Vamos a.',
          minSentences: 3,
          sampleTarget: 'El próximo sábado voy a descansar y leer mi libro favorito. El domingo voy a cocinar una paella para mi familia. Por la tarde vamos a dar un paseo por el parque.'
        }
      },
      {
        id: 'lesson-a1-11-2',
        unitId: 'unit-a1-11',
        lessonNumber: 2,
        title_es: 'Citas y Compromisos en la Agenda',
        title_en: 'Appointments & Schedule Commitments',
        title_ar: 'المواعيد والارتباطات في جدول الأعمال',
        cefr: 'A1',
        objectives_en: ['Schedule appointments with doctors, dentists, colleagues', 'Confirm dates and times', 'Apologize for schedule conflicts'],
        objectives_ar: ['حجز وتنسيق المواعيد مع الأطباء والزملاء', 'تأكيد التواريخ والأوقات', 'الاعتذار عن تضارب المواعيد'],
        vocabWordIds: ['w-cita', 'w-agenda', 'w-reunion', 'w-confirmar', 'w-posible'],
        dialogue: [
          { speaker: 'Recepcionista', es: 'Clínica Dental, buenos días. ¿En qué puedo ayudarle?', en: 'Dental Clinic, good morning. How can I help you?', ar: 'عيادة الأسنان، صباح الخير. كيف يمكنني مساعدة حضرتك؟' },
          { speaker: 'Paciente', es: 'Quisiera pedir una cita con el doctor para el próximo martes a las diez.', en: 'I would like to make an appointment with the doctor for next Tuesday at ten.', ar: 'أود حجز موعد مع الطبيب ليوم الثلاثاء القادم في العاشرة صباحاً.' }
        ],
        exercises: [
          {
            id: 'ex-a1-11-2-1',
            type: 'multiple_choice',
            prompt_es: '"Pedir una cita" significa:',
            prompt_en: '"Pedir una cita" means:',
            prompt_ar: '"Pedir una cita" تعني:',
            options: ['To book an appointment', 'To cancel a flight', 'To pay the bill', 'To order food'],
            correctAnswer: 'To book an appointment',
            explanation_en: '"Pedir una cita" means to request/schedule an appointment.',
            explanation_ar: '"Pedir una cita" تعني حجز موعد.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence message booking or confirming an appointment with someone next week.',
          prompt_ar: 'اكتب رسالة من 3 جمل لحجز أو تأكيد موعد مع شخص ما في الأسبوع القادم.',
          minSentences: 3,
          sampleTarget: 'Hola doctor, quisiera confirmar mi cita para el jueves a las cuatro de la tarde. Si hay algún cambio, por favor avíseme. Muchas gracias por su atención.'
        }
      },
      {
        id: 'lesson-a1-11-3',
        unitId: 'unit-a1-11',
        lessonNumber: 3,
        title_es: 'Preposiciones Temporales: Desde, Hasta, De... A...',
        title_en: 'Time Prepositions: Desde, Hasta, De... A...',
        title_ar: 'حروف الجر الزمنية: من، إلى، حتى',
        cefr: 'A1',
        objectives_en: ['Use "desde las... hasta las..." and "de... a..." for time spans', 'State business hours and work shifts', 'Express project deadlines'],
        objectives_ar: ['استخدام تعبيرات المدة الزمنية من... إلى...', 'تحديد ساعات العمل والدوام', 'التعبير عن المواعيد النهائية'],
        vocabWordIds: ['w-desde', 'w-hasta', 'w-horario', 'w-abierto', 'w-cerrado'],
        dialogue: [
          { speaker: 'Cliente', es: '¿Cuál es el horario de la biblioteca?', en: 'What are the library hours?', ar: 'ما هي ساعات عمل المكتبة؟' },
          { speaker: 'Bibliotecario', es: 'Abrimos de lunes a viernes desde las nueve de la mañana hasta las ocho de la tarde.', en: 'We are open Monday to Friday from nine in the morning until eight in the evening.', ar: 'نفتح من الإثنين إلى الجمعة من التاسعة صباحاً حتى الثامنة مساءً.' }
        ],
        exercises: [
          {
            id: 'ex-a1-11-3-1',
            type: 'fill_blank',
            prompt_es: 'La tienda está abierta ______ (from) las nueve ______ (to) las dos.',
            prompt_en: 'Choose the correct pair:',
            prompt_ar: 'اختر الزوج الصحيح لحرفي الجر من... إلى...:',
            options: ['de / a', 'en / por', 'con / sin', 'por / para'],
            correctAnswer: 'de / a',
            explanation_en: 'We pair "de... a..." or "desde... hasta...".',
            explanation_ar: 'نقرن "de... a..." أو "desde... hasta...".'
          }
        ],
        productionPrompt: {
          prompt_en: 'State your daily working or study schedule using "de... a..." or "desde... hasta..." in 3 sentences.',
          prompt_ar: 'اذكر جدول عملك أو دراستك اليومي باستخدام تعبيرات المدة في 3 جمل.',
          minSentences: 3,
          sampleTarget: 'Trabajo de lunes a viernes desde las ocho de la mañana hasta las cuatro de la tarde. Estudio español de seis a siete de la tarde. Los fines de semana descanso totalmente.'
        }
      },
      {
        id: 'lesson-a1-11-4',
        unitId: 'unit-a1-11',
        lessonNumber: 4,
        title_es: 'Expresar Deseos e Intenciones con Querer y Pensar',
        title_en: 'Expressing Wishes with Querer & Pensar + Inf',
        title_ar: 'التعبير عن الرغبات والنوايا مع Querer و Pensar',
        cefr: 'A1',
        objectives_en: ['Use "Quiero + infinitivo" to express desires', 'Use "Pienso + infinitivo" to express planned intentions', 'Use "Me gustaría + infinitivo" for polite wishes'],
        objectives_ar: ['استخدام Quiero + المصدر للتعبير عن الرغبة', 'استخدام Pienso + المصدر للتعبير عن النية المخططة', 'استخدام Me gustaría للتمني بلباقة'],
        vocabWordIds: ['w-querer', 'w-pensar', 'w-gustaria', 'w-deseo', 'w-futuro'],
        dialogue: [
          { speaker: 'Mario', es: '¿Qué quieres hacer después de terminar el curso?', en: 'What do you want to do after finishing the course?', ar: 'ماذا تريد أن تفعل بعد إنهاء الدورة التدريبية؟' },
          { speaker: 'Lucía', es: 'Pienso buscar trabajo en una empresa internacional y me gustaría vivir en Valencia.', en: 'I plan to look for a job at an international company, and I would like to live in Valencia.', ar: 'أنوي البحث عن عمل في شركة دولية، وأود العيش في فالنسيا.' }
        ],
        exercises: [
          {
            id: 'ex-a1-11-4-1',
            type: 'multiple_choice',
            prompt_es: 'Yo ______ (querer) aprender a cocinar paella.',
            prompt_en: 'Choose the correct first-person present form of stem-changing QUERER (e->ie):',
            prompt_ar: 'اختر تصريف المتكلم لفعل querer (شاذ التفرع e->ie):',
            options: ['quiero', 'quero', 'queremos', 'quieren'],
            correctAnswer: 'quiero',
            explanation_en: 'Querer is a stem-changing verb: yo quiero.',
            explanation_ar: 'فعل querer يتغير فيه الجذر في المضارع: yo quiero.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences expressing your personal dreams, goals, and upcoming intentions using quiero, pienso, and me gustaría.',
          prompt_ar: 'اكتب 3 جمل تعبر فيها عن أحلامك، أهدافك، ونواياك القادمة.',
          minSentences: 3,
          sampleTarget: 'Quiero hablar español con fluidez para viajar por América Latina. Pienso estudiar todos los días con constancia. Me gustaría visitar México el próximo año.'
        }
      }
    ]
  },

  // UNIT 12: Supervivencia y Viajes
  {
    id: 'unit-a1-12',
    level: 'A1',
    unitNumber: 12,
    title_es: 'Supervivencia y Viajes',
    title_en: 'Survival Spanish & Travel',
    title_ar: 'الإسبانية للمواقف الطارئة والسفر',
    description_en: 'Navigate airports, hotels, emergencies, asking for help, and essential survival phrases.',
    description_ar: 'التنقل في المطارات، الفنادق، المواقف الطارئة، طلب المساعدة، والعبارات الحيوية للسفر.',
    lessons: [
      {
        id: 'lesson-a1-12-1',
        unitId: 'unit-a1-12',
        lessonNumber: 1,
        title_es: 'En el Aeropuerto: Facturación y Control',
        title_en: 'At the Airport: Check-in & Security',
        title_ar: 'في المطار: تسجيل الوصول والتفتيش الأمني',
        cefr: 'A1',
        objectives_en: ['Understand airport signs (facturación, puerta de embarque, control de seguridad, equipaje)', 'Answer customs/check-in questions', 'Show passport and boarding pass'],
        objectives_ar: ['فهم لافتات المطار (تسجيل، بوابة الصعود، التفتيش، الأمتعة)', 'الإجابة على أسئلة الجوازات وموظف التسجيل', 'إبراز جواز السفر وبطاقة الصعود'],
        vocabWordIds: ['w-aeropuerto', 'w-vuelo', 'w-pasaporte', 'w-equipaje', 'w-puerta'],
        dialogue: [
          { speaker: 'Agente', es: 'Buenos días, su pasaporte y tarjeta de embarque, por favor. ¿Lleva equipaje para facturar?', en: 'Good morning, your passport and boarding pass, please. Do you have luggage to check in?', ar: 'صباح الخير، جواز سفرك وبطاقة الصعود من فضلك. هل لديك أمتعة لشحنها؟' },
          { speaker: 'Pasajero', es: 'Sí, llevo una maleta grande y una mochila de mano.', en: 'Yes, I have one large suitcase and a carry-on backpack.', ar: 'نعم، لدي حقيبة سفر كبيرة وحقيبة ظهر يدية.' }
        ],
        exercises: [
          {
            id: 'ex-a1-12-1-1',
            type: 'multiple_choice',
            prompt_es: '"Puerta de embarque" significa:',
            prompt_en: '"Puerta de embarque" means:',
            prompt_ar: '"Puerta de embarque" تعني:',
            options: ['Boarding gate', 'Baggage claim', 'Customs office', 'Ticket counter'],
            correctAnswer: 'Boarding gate',
            explanation_en: '"Puerta de embarque" is the boarding gate.',
            explanation_ar: '"Puerta de embarque" تعني بوابة صعود الطائرة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence interaction at the airport check-in desk explaining your destination and luggage.',
          prompt_ar: 'اكتب محادثة من 3 جمل في مكتب تسجيل المطار توضح فيها وجهتك وأمتعتك.',
          minSentences: 3,
          sampleTarget: '— Buenos días, voy en el vuelo directo a Madrid. — ¿Cuántas maletas tiene para facturar? — Solo tengo una maleta y este bolso de mano. Aquí está mi pasaporte.'
        }
      },
      {
        id: 'lesson-a1-12-2',
        unitId: 'unit-a1-12',
        lessonNumber: 2,
        title_es: 'En el Hotel: Recepción y Servicios',
        title_en: 'At the Hotel: Reception & Amenities',
        title_ar: 'في الفندق: الاستقبال والخدمات',
        cefr: 'A1',
        objectives_en: ['Check in with a reservation (Tengo una reserva a nombre de...)', 'Ask for amenities (wifi, desayuno incluido, llave/tarjeta)', 'Report room issues politely'],
        objectives_ar: ['تسجيل الوصول بالحجز الفندقي', 'السؤال عن الخدمات (واي فاي، إفطار، بطاقة الغرفة)', 'الإبلاغ عن أي نقص في الغرفة بلباقة'],
        vocabWordIds: ['w-hotel', 'w-reserva', 'w-habitacion', 'w-desayuno', 'w-llave'],
        dialogue: [
          { speaker: 'Recepcionista', es: '¡Buenas tardes! Bienvenido al Hotel Sol. ¿Tiene reserva?', en: 'Good afternoon! Welcome to Hotel Sol. Do you have a reservation?', ar: 'مساؤكم خير! مرحباً بكم في فندق سول. هل لديكم حجز مسبق؟' },
          { speaker: 'Huésped', es: 'Sí, tengo una reserva para tres noches a nombre de Carlos Ruiz. ¿Está incluido el desayuno?', en: 'Yes, I have a reservation for three nights under the name Carlos Ruiz. Is breakfast included?', ar: 'نعم، لدي حجز لثلاث ليالٍ باسم كارلوس رويز. هل الإفطار مشمول؟' },
          { speaker: 'Recepcionista', es: 'Sí, se sirve de siete a diez. Aquí tiene su tarjeta de la habitación 304.', en: 'Yes, it is served from seven to ten. Here is your keycard for room 304.', ar: 'نعم، يقدم من السابعة حتى العاشرة. تفضل بطاقة غرفتك رقم 304.' }
        ],
        exercises: [
          {
            id: 'ex-a1-12-2-1',
            type: 'multiple_choice',
            prompt_es: 'Para decir que la reserva está a tu nombre dices:',
            prompt_en: 'To state the reservation is in your name, you say:',
            prompt_ar: 'للقول بأن الحجز مسجل باسمك تقول:',
            options: ['Tengo una reserva a nombre de...', 'Soy una reserva de...', 'Hago una reserva con...', 'Estoy el nombre de...'],
            correctAnswer: 'Tengo una reserva a nombre de...',
            explanation_en: '"A nombre de..." is the standard phrase for "under the name of".',
            explanation_ar: '"A nombre de..." هي العبارة القياسية لقول "باسم فلان".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence hotel check-in dialogue asking for the room key and wifi password.',
          prompt_ar: 'اكتب حواراً من 3 جمل في استقبال الفندق تطلب فيه مفتاح الغرفة وكلمة سر الواي فاي.',
          minSentences: 3,
          sampleTarget: '— Hola, tengo una reserva para dos personas a nombre de David Smith. — Perfecto, aquí tiene su llave para la habitación doscientos dos. — Muchas gracias, ¿cuál es la contraseña del wifi, por favor?'
        }
      },
      {
        id: 'lesson-a1-12-3',
        unitId: 'unit-a1-12',
        lessonNumber: 3,
        title_es: 'Emergencias y Pedir Ayuda',
        title_en: 'Emergencies & Asking For Help',
        title_ar: 'حالات الطوارئ وطلب المساعدة العاجلة',
        cefr: 'A1',
        objectives_en: ['Call for emergency help (¡Ayuda!, ¡Socorro!, ¡Llame a la policía/ambulancia!)', 'Explain urgent problems (He perdido mi pasaporte, Necesito un médico)', 'State urgency clearly'],
        objectives_ar: ['طلب النجدة في الطوارئ (المساعدة!، اتصل بالإسعاف/الشرطة!)', 'شرح المشكلات العاجلة (فقدت جوازي، أحتاج طبيباً)', 'توضيح حالة الطوارئ بعبارات مباشرة'],
        vocabWordIds: ['w-ayuda', 'w-policia', 'w-medico', 'w-urgente', 'w-perder'],
        dialogue: [
          { speaker: 'Afectado', es: '¡Por favor, ayúdeme! He perdido mi cartera con todo mi dinero y mis documentos.', en: 'Please help me! I have lost my wallet with all my money and documents.', ar: 'أرجوك ساعدني! لقد فقدت محفظتي وبها كل نقودي ووثائقي الرسمية.' },
          { speaker: 'Oficial', es: 'Tranquilo, vamos a ir a la comisaría para poner una denuncia de inmediato.', en: 'Stay calm, we are going to the police station to file a report immediately.', ar: 'اهدأ، سنذهب إلى قسم الشرطة لتقديم بلاغ رسمي فوراً.' }
        ],
        exercises: [
          {
            id: 'ex-a1-12-3-1',
            type: 'multiple_choice',
            prompt_es: 'Para pedir auxilio urgente gritamos:',
            prompt_en: 'To call for urgent emergency help in Spanish, you shout:',
            prompt_ar: 'لطلب النجدة العاجلة في حالات الخطر نقول:',
            options: ['¡Socorro! / ¡Ayuda!', '¡Buenos días!', '¡Por favor!', '¡Buen viaje!'],
            correctAnswer: '¡Socorro! / ¡Ayuda!',
            explanation_en: '"¡Socorro!" and "¡Ayuda!" are the universal Spanish emergency calls.',
            explanation_ar: '"¡Socorro!" و "¡Ayuda!" هما نداء الاستغاثة والمساعدة في الإسبانية.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 urgent sentences explaining a lost document or urgent medical need.',
          prompt_ar: 'اكتب 3 جمل عاجلة توضح فيها فقدان وثيقة أو حاجة طبية ملحة.',
          minSentences: 3,
          sampleTarget: '¡Disculpe, necesito ayuda urgente! No encuentro mi pasaporte y mi vuelo sale en dos horas. ¿Dónde está la oficina de objetos perdidos?'
        }
      },
      {
        id: 'lesson-a1-12-4',
        unitId: 'unit-a1-12',
        lessonNumber: 4,
        title_es: 'Frases de Supervivencia y Malentendidos',
        title_en: 'Survival Phrases & Clarification',
        title_ar: 'عبارات استيضاح الفهم وتجاوز اللبس',
        cefr: 'A1',
        objectives_en: ['Ask someone to speak slower (¿Puede hablar más despacio, por favor?)', 'Ask for repetition (¿Puede repetir?)', 'State comprehension level (No entiendo, Hablo un poco de español)'],
        objectives_ar: ['طلب التحدث ببطء أكبر', 'طلب إعادة الجملة والتكرار', 'توضيح مستوى الفهم بوضوح'],
        vocabWordIds: ['w-entender', 'w-repetir', 'w-despacio', 'w-significar', 'w-idioma'],
        dialogue: [
          { speaker: 'Estudiante', es: 'Disculpe, ¿puede hablar más despacio, por favor? Estoy aprendiendo español y no entiendo todo.', en: 'Excuse me, could you speak slower, please? I am learning Spanish and do not understand everything.', ar: 'عفواً، هل يمكن لحضرتك التحدث ببطء أكثر من فضلك؟ أنا أتعلم الإسبانية ولا أفهم كل شيء.' },
          { speaker: 'Local', es: '¡Claro que sí! Con mucho gusto te lo explico paso a paso.', en: 'Of course! With pleasure I will explain it to you step by step.', ar: 'بالتأكيد! بكل سرور سأشرح لك الأمر خطوة بخطوة.' }
        ],
        exercises: [
          {
            id: 'ex-a1-12-4-1',
            type: 'multiple_choice',
            prompt_es: '¿Cómo preguntas el significado de una palabra desconocida?',
            prompt_en: 'How do you ask the meaning of an unknown Spanish word?',
            prompt_ar: 'كيف تسأل عن معنى كلمة إسبانية غير معروفة لديك؟',
            options: ['¿Qué significa esta palabra?', '¿Dónde está esta palabra?', '¿Cuánto cuesta esta palabra?', '¿Cómo se llama la palabra?'],
            correctAnswer: '¿Qué significa esta palabra?',
            explanation_en: '"¿Qué significa...?" asks for the meaning/definition of something.',
            explanation_ar: '"¿Qué significa...?" تسأل عن معنى ومدلول الشيء.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences asking for clarification, slower speech, and the meaning of a Spanish word.',
          prompt_ar: 'اكتب 3 جمل تطلب فيها الاستيضاح، التحدث ببطء، والسؤال عن معنى كلمة.',
          minSentences: 3,
          sampleTarget: 'Perdón, ¿puede repetir la última frase más despacio? Todavía no entiendo bien esa palabra. ¿Qué significa "andén" en español?'
        }
      }
    ]
  },

  // UNIT 13: La Salud y el Cuerpo
  {
    id: 'unit-a1-13',
    level: 'A1',
    unitNumber: 13,
    title_es: 'La Salud y el Cuerpo Humano',
    title_en: 'Health & The Human Body',
    title_ar: 'الصحة وجسم الإنسان',
    description_en: 'Name body parts, express physical symptoms using "Doler" (Me duele...), and visit the pharmacy.',
    description_ar: 'تسمية أجزاء الجسم، التعبير عن الأعراض والآلام بفعل Doler (يؤلمني)، والتعامل في الصيدلية.',
    lessons: [
      {
        id: 'lesson-a1-13-1',
        unitId: 'unit-a1-13',
        lessonNumber: 1,
        title_es: 'Las Partes del Cuerpo Humano',
        title_en: 'Parts of the Human Body',
        title_ar: 'أجزاء وأعضاء جسم الإنسان',
        cefr: 'A1',
        objectives_en: ['Identify head, face, torso, limbs, hands, feet', 'Use correct gender with body parts (la cabeza, el brazo, la pierna, los ojos)', 'Describe body posture'],
        objectives_ar: ['معرفة الرأس والوجه والجذع والأطراف واليدين والقدمين', 'استخدام المذكر والمؤنث بدقة مع أجزاء الجسم', 'وصف وضعيات الجسد الأساسية'],
        vocabWordIds: ['w-cabeza', 'w-brazo', 'w-pierna', 'w-mano', 'w-pie'],
        dialogue: [
          { speaker: 'Doctor', es: '¿Dónde siente la molestia exactamente?', en: 'Where do you feel discomfort exactly?', ar: 'أين تشعر بالألم وعدم الارتياح تحديداً؟' },
          { speaker: 'Paciente', es: 'Me caí corriendo y me golpeé la rodilla derecha y el brazo.', en: 'I fell while running and hit my right knee and my arm.', ar: 'سقطت أثناء الجري واصطدمت ركبتي اليمنى وذراعي.' }
        ],
        exercises: [
          {
            id: 'ex-a1-13-1-1',
            type: 'multiple_choice',
            prompt_es: 'La parte del cuerpo con la que pensamos y donde están los ojos y la boca es:',
            prompt_en: 'The body part where our eyes, mouth, and brain are is:',
            prompt_ar: 'جزء الجسم الذي توجد به العيون والفم والدماغ هو:',
            options: ['La cabeza', 'El pie', 'La espalda', 'El estómago'],
            correctAnswer: 'La cabeza',
            explanation_en: '"La cabeza" means the head.',
            explanation_ar: '"La cabeza" تعني الرأس.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences mentioning 4 different parts of the human body and their functions.',
          prompt_ar: 'اكتب 3 جمل تذكر فيها 4 أجزاء مختلفة من جسم الإنسان ووظائفها.',
          minSentences: 3,
          sampleTarget: 'Con los ojos podemos ver los hermosos colores del mundo. Usamos las piernas y los pies para caminar y correr. Con las manos escribimos y trabajamos todos los días.'
        }
      },
      {
        id: 'lesson-a1-13-2',
        unitId: 'unit-a1-13',
        lessonNumber: 2,
        title_es: 'El Verbo Doler: Expresar Molestias y Dolor',
        title_en: 'The Verb Doler: Expressing Pain',
        title_ar: 'فعل Doler: التعبير عن الألم والأوجاع',
        cefr: 'A1',
        objectives_en: ['Conjugate doler like gustar (me/te/le/nos/os/les duele / duelen)', 'Use "duele + singular" vs "duelen + plural"', 'Express headache, stomach ache, backache'],
        objectives_ar: ['تصريف فعل doler بنفس نمط gustar', 'التمييز بين duele للمفرد و duelen للجمع', 'التعبير عن الصداع وآلام المعدة والظهر'],
        vocabWordIds: ['w-doler', 'w-dolor', 'w-espalda', 'w-estomago', 'w-garganta'],
        dialogue: [
          { speaker: 'Amiga', es: '¿Te encuentras bien, Sofía? Tienes mala cara.', en: 'Are you feeling okay, Sofía? You look unwell.', ar: 'هل تشعرين أنكِ بخير يا صوفيا؟ يبدو عليكِ الإعياء.' },
          { speaker: 'Sofía', es: 'No mucho, me duele la cabeza y también me duele la garganta desde ayer.', en: 'Not really, my head hurts and my throat also hurts since yesterday.', ar: 'ليس تماماً، رأسي يؤلمني وحلقي يؤلمني أيضاً منذ الأمس.' }
        ],
        exercises: [
          {
            id: 'ex-a1-13-2-1',
            type: 'multiple_choice',
            prompt_es: 'A mí me ______ (doler) los pies de tanto caminar.',
            prompt_en: 'Choose the correct form of DOLER for plural "los pies":',
            prompt_ar: 'اختر تصريف DOLER المناسب مع الجمع los pies:',
            options: ['duelen', 'duele', 'dolo', 'dolemos'],
            correctAnswer: 'duelen',
            explanation_en: 'With plural subjects ("los pies"), DOLER conjugates as "duelen".',
            explanation_ar: 'مع الفاعل الجمع (los pies) يصرف الفعل إلى "duelen".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences expressing physical ailments using "Me duele..." and "Me duelen...".',
          prompt_ar: 'اكتب 3 جمل تعبر فيها عن أوجاع وأعراض بدنية باستخدام Me duele و Me duelen.',
          minSentences: 3,
          sampleTarget: 'Hoy no puedo ir al gimnasio porque me duele la espalda. Además, me duelen mucho los ojos de mirar la pantalla. Me voy a tomar un té caliente y descansar.'
        }
      },
      {
        id: 'lesson-a1-13-3',
        unitId: 'unit-a1-13',
        lessonNumber: 3,
        title_es: 'En la Farmacia: Medicamentos y Síntomas',
        title_en: 'At the Pharmacy: Remedies & Symptoms',
        title_ar: 'في الصيدلية: الأدوية والأعراض',
        cefr: 'A1',
        objectives_en: ['Describe symptoms (tengo fiebre, tos, gripe, alergia)', 'Ask for remedies (pastillas, jarabe, tiritas, aspirina)', 'Understand dosage advice (cada ocho horas)'],
        objectives_ar: ['وصف الأعراض المرضية (حمى، سعال، زكام، حساسية)', 'طلب العلاجات المناسبة (أقراص، شراب، ضمادات، مسكن)', 'فهم إرشادات الجرعات الموصى بها'],
        vocabWordIds: ['w-farmacia', 'w-fiebre', 'w-pastilla', 'w-jarabe', 'w-tos'],
        dialogue: [
          { speaker: 'Farmacéutico', es: 'Hola, ¿qué síntomas tiene?', en: 'Hello, what symptoms do you have?', ar: 'مرحباً، ما هي الأعراض التي تعاني منها؟' },
          { speaker: 'Cliente', es: 'Tengo fiebre alta y mucha tos. ¿Tiene algo para el resfriado?', en: 'I have a high fever and a lot of coughing. Do you have something for a cold?', ar: 'لدي حمى مرتفعة وسعال شديد. هل لديك علاج للزكام؟' },
          { speaker: 'Farmacéutico', es: 'Tome estas pastillas de paracetamol cada ocho horas con abundante agua.', en: 'Take these paracetamol tablets every eight hours with plenty of water.', ar: 'تناول أقراص الباراسيتامول هذه كل ثماني ساعات مع كمية وفيرة من الماء.' }
        ],
        exercises: [
          {
            id: 'ex-a1-13-3-1',
            type: 'multiple_choice',
            prompt_es: '"Tener fiebre" significa:',
            prompt_en: '"Tener fiebre" means:',
            prompt_ar: '"Tener fiebre" تعني:',
            options: ['To have a fever/temperature', 'To have a cough', 'To feel dizzy', 'To have a broken bone'],
            correctAnswer: 'To have a fever/temperature',
            explanation_en: '"Fiebre" means fever / high body temperature.',
            explanation_ar: '"Fiebre" تعني الحمى وارتفاع درجة حرارة الجسم.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence pharmacy conversation describing a cold and buying medicine.',
          prompt_ar: 'اكتب محادثة من 3 جمل في الصيدلية تصف فيها أعراض البرد وتشتري دواءً.',
          minSentences: 3,
          sampleTarget: '— Buenas tardes, tengo dolor de garganta y un poco de fiebre. — Le recomiendo este jarabe natural y pastillas para la garganta. — Perfecto, ¿cuánto cuesta todo, por favor?'
        }
      },
      {
        id: 'lesson-a1-13-4',
        unitId: 'unit-a1-13',
        lessonNumber: 4,
        title_es: 'Consejos de Salud con Tener Que y Deber',
        title_en: 'Health Advice with Tener Que & Deber',
        title_ar: 'النصائح الصحية مع أفعال الإلزام Tener Que و Deber',
        cefr: 'A1',
        objectives_en: ['Give health advice with "Tienes que + infinitivo"', 'Use "Debes descansar / comer sano"', 'Recommend healthy lifestyle habits'],
        objectives_ar: ['إعطاء نصائح صحية بتركيب Tienes que + المصدر', 'استخدام فعل الوجوب Deber للنصح', 'التوصية بعادات نمط الحياة الصحي'],
        vocabWordIds: ['w-deber', 'w-descansar', 'w-dormir', 'w-saludable', 'w-agua'],
        dialogue: [
          { speaker: 'Médico', es: 'Para recuperarte rápido de la gripe, tienes que guardar reposo en cama y beber mucha agua.', en: 'To recover quickly from the flu, you must rest in bed and drink plenty of water.', ar: 'للتعافي سريعاً من الإنفلونزا، يجب عليك التزام الراحة في الفراش وشرب الكثير من الماء.' },
          { speaker: 'Paciente', es: 'Entendido, doctor. ¿Debo tomar las medicinas con las comidas?', en: 'Understood, doctor. Should I take the medicines with meals?', ar: 'مفهوم يا دكتور. هل ينبغي أن أتناول الأدوية مع الوجبات؟' }
        ],
        exercises: [
          {
            id: 'ex-a1-13-4-1',
            type: 'multiple_choice',
            prompt_es: 'Para estar sano, tú ______ (tener que) comer muchas frutas y verduras.',
            prompt_en: 'Choose the correct form of "tener que" for tú:',
            prompt_ar: 'اختر التصريف الصحيح لـ tener que مع tú:',
            options: ['tienes que', 'tiene que', 'tengo que', 'tenemos que'],
            correctAnswer: 'tienes que',
            explanation_en: 'For "tú" obligation we say "tienes que + infinitive".',
            explanation_ar: 'للإلزام مع المخاطب tú نقول "tienes que + المصدر".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 healthy lifestyle recommendations using "Tienes que..." and "Debes...".',
          prompt_ar: 'اكتب 3 توصيات لنمط حياة صحي باستخدام Tienes que و Debes.',
          minSentences: 3,
          sampleTarget: 'Para tener buena salud, tienes que dormir al menos ocho horas cada noche. Debes beber dos litros de agua al día. También tienes que hacer ejercicio físico con regularidad.'
        }
      }
    ]
  },

  // UNIT 14: Consolidación y Proyecto A1
  {
    id: 'unit-a1-14',
    level: 'A1',
    unitNumber: 14,
    title_es: 'Consolidación y Proyecto Final A1',
    title_en: 'A1 Consolidation & Capstone Project',
    title_ar: 'تثبيت المستوى ومشروع التخرج A1',
    description_en: 'Review all A1 grammar and vocabulary, consolidate listening and reading skills, and create a comprehensive personal portfolio.',
    description_ar: 'مراجعة شاملة لقواعد ومفردات المستوى A1، وتثبيت مهارات الاستماع والقراءة، وإنشاء ملف شخصي متكامل.',
    lessons: [
      {
        id: 'lesson-a1-14-1',
        unitId: 'unit-a1-14',
        lessonNumber: 1,
        title_es: 'Gran Repaso: Presente, Pasado y Futuro A1',
        title_en: 'Comprehensive Tense Review: A1 Tenses',
        title_ar: 'المراجعة الكبرى: الحاضر والماضي والمستقبل',
        cefr: 'A1',
        objectives_en: ['Seamlessly switch between present (hago), preterite (hice), and near future (voy a hacer)', 'Identify correct time triggers', 'Tell a cohesive multi-tense personal story'],
        objectives_ar: ['الربط السلس بين أزمنة المضارع والماضي البسيط والمستقبل القريب', 'تحديد الدلالات الزمنية لكل زمن بدقة', 'سرد قصة شخصية مترابطة متعددة الأزمنة'],
        vocabWordIds: ['w-hoy', 'w-ayer', 'w-manana', 'w-siempre', 'w-ahora'],
        dialogue: [
          { speaker: 'Profesor', es: 'Cuéntanos un resumen de tu semana, Daniel.', en: 'Tell us a summary of your week, Daniel.', ar: 'أخبرنا بملخص لأسبوعك يا دانييل.' },
          { speaker: 'Daniel', es: 'Ayer estudié mucho en la biblioteca. Hoy estoy en clase con mis amigos, y mañana voy a viajar a Toledo para conocer la ciudad histórica.', en: 'Yesterday I studied a lot in the library. Today I am in class with my friends, and tomorrow I am going to travel to Toledo to see the historic city.', ar: 'أمس درست كثيراً في المكتبة. اليوم أنا في الصف مع أصدقائي، وغداً سأسافر إلى طليطلة لاستكشاف المدينة التاريخية.' }
        ],
        exercises: [
          {
            id: 'ex-a1-14-1-1',
            type: 'multiple_choice',
            prompt_es: 'Ayer yo ______ (comer) paella, hoy ______ (comer) ensalada y mañana ______ (ir a comer) pescado.',
            prompt_en: 'Choose the correct sequence of tenses (Past, Present, Future):',
            prompt_ar: 'اختر التسلسل الصحيح للأزمنة (ماضي، حاضر، مستقبل):',
            options: ['comí / como / voy a comer', 'como / comí / comí', 'comeré / comí / como', 'comía / como / fui a comer'],
            correctAnswer: 'comí / como / voy a comer',
            explanation_en: 'Ayer (past: comí) + Hoy (present: como) + Mañana (near future: voy a comer).',
            explanation_ar: 'أمس (ماضي: comí) + اليوم (حاضر: como) + غداً (مستقبل قريب: voy a comer).'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences: one in the past (yesterday), one in the present (today), and one in the future (tomorrow).',
          prompt_ar: 'اكتب 3 جمل: واحدة في الماضي، وواحدة في الحاضر، وواحدة في المستقبل القريب.',
          minSentences: 3,
          sampleTarget: 'Ayer compré un libro en español muy interesante. Hoy estoy leyendo los primeros capítulos con mi diccionario. Mañana voy a escribir un resumen de la historia.'
        }
      },
      {
        id: 'lesson-a1-14-2',
        unitId: 'unit-a1-14',
        lessonNumber: 2,
        title_es: 'Lectura Comprensiva Integrada A1',
        title_en: 'Integrated Reading Comprehension A1',
        title_ar: 'القراءة الاستيعابية التراكمية A1',
        cefr: 'A1',
        objectives_en: ['Read a 150-word authentic Spanish narrative', 'Extract main ideas and specific details', 'Demonstrate complete reading comprehension without relying on translations'],
        objectives_ar: ['قراءة نص سردي إسباني أصيل من 150 كلمة', 'استخراج الأفكار الرئيسية والتفاصيل الدقيقة', 'إثبات الفهم القرائي المستقل'],
        vocabWordIds: ['w-historia', 'w-texto', 'w-comprender', 'w-pregunta', 'w-respuesta'],
        dialogue: [
          { speaker: 'Narrador', es: 'Mi nombre es Alejandro. Tengo veinticuatro años y soy de Valencia, España. Vivo en un piso céntrico con mi perro Toby. Todos los días me levanto temprano, desayuno un café con leche y voy a la universidad en bicicleta. Los fines de semana me encanta cocinar para mis amigos y tocar la guitarra en el parque. El verano pasado viajé por primera vez a Egipto y fue una experiencia maravillosa.', en: 'My name is Alejandro. I am 24 years old and from Valencia, Spain...', ar: 'اسمي أليخاندرو. عمري 24 سنة وأنا من فالنسيا، إسبانيا...' }
        ],
        exercises: [
          {
            id: 'ex-a1-14-2-1',
            type: 'multiple_choice',
            prompt_es: 'Según el texto, ¿cómo va Alejandro a la universidad?',
            prompt_en: 'According to the text, how does Alejandro travel to university?',
            prompt_ar: 'وفقاً للنص، كيف يذهب أليخاندرو إلى الجامعة؟',
            options: ['En bicicleta', 'En metro', 'En autobús', 'En coche'],
            correctAnswer: 'En bicicleta',
            explanation_en: 'The text states: "voy a la universidad en bicicleta".',
            explanation_ar: 'يذكر النص بوضوح: "voy a la universidad en bicicleta" (بالدراجة).'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence summary of Alejandro’s life based on the reading text.',
          prompt_ar: 'اكتب تلخيصاً من 3 جمل عن حياة أليخاندرو استناداً إلى نص القراءة.',
          minSentences: 3,
          sampleTarget: 'Alejandro es un estudiante español de veinticuatro años que vive en Valencia. Tiene una rutina activa, le gusta cocinar y toca la guitarra. El año pasado disfrutó de un gran viaje a Egipto.'
        }
      },
      {
        id: 'lesson-a1-14-3',
        unitId: 'unit-a1-14',
        lessonNumber: 3,
        title_es: 'Audición y Diálogo Situacional de Fluidez',
        title_en: 'Listening & Situational Fluency Drill',
        title_ar: 'الاستماع والمحادثة الموقفية السلسة',
        cefr: 'A1',
        objectives_en: ['Understand natural spoken Spanish at A1 speed', 'Respond spontaneously to everyday social questions', 'Demonstrate correct pronunciation and intonation'],
        objectives_ar: ['فهم الإسبانية المنطوقة بسرعة المتحدث الطبيعي لـ A1', 'الرد التلقائي على الأسئلة الاجتماعية اليومية', 'إظهار النطق والنبر الصوتي السليم'],
        vocabWordIds: ['w-escuchar', 'w-hablar', 'w-fluidez', 'w-conversacion', 'w-amigo'],
        dialogue: [
          { speaker: 'Entrevistador', es: 'Hola, ¿puedes presentarte y contarme sobre tu rutina y tus pasatiempos?', en: 'Hello, can you introduce yourself and tell me about your routine and hobbies?', ar: 'مرحباً، هل يمكنك التعريف بنفسك وإخباري عن روتينك وهواياتك؟' },
          { speaker: 'Estudiante', es: '¡Claro! Me llamo Omar, soy ingeniero y vivo en El Cairo. Todos los días estudio español y hago deporte. En mi tiempo libre me gusta leer y escuchar música latina.', en: 'Sure! My name is Omar, I am an engineer and live in Cairo. Every day I study Spanish and do sports. In my free time I like reading and listening to Latin music.', ar: 'بالتأكيد! اسمي عمر، أنا مهندس وأعيش في القاهرة. كل يوم أدرس الإسبانية وأمارس الرياضة...' }
        ],
        exercises: [
          {
            id: 'ex-a1-14-3-1',
            type: 'multiple_choice',
            prompt_es: 'Omar menciona que en su tiempo libre le gusta:',
            prompt_en: 'What does Omar like doing in his free time?',
            prompt_ar: 'ماذا يحب عمر أن يفعل في وقت فراغه؟',
            options: ['Leer y escuchar música latina', 'Dormir todo el día', 'Comprar ropa cara', 'Jugar a los videojuegos'],
            correctAnswer: 'Leer y escuchar música latina',
            explanation_en: 'Omar explicitly states: "me gusta leer y escuchar música latina".',
            explanation_ar: 'يقول عمر بوضوح: "me gusta leer y escuchar música latina".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write your own spoken response to the interview question in 4 complete Spanish sentences.',
          prompt_ar: 'اكتب إجابتك الخاصة على سؤال المقابلة في 4 جمل إسبانية كاملة ومتقنة.',
          minSentences: 4,
          sampleTarget: 'Hola, me llamo Sara y soy de Egipto. Trabajo como profesora y vivo en una ciudad hermosa. Por las mañanas me gusta tomar café y estudiar idiomas. Los fines de semana salgo con mi familia al campo.'
        }
      },
      {
        id: 'lesson-a1-14-4',
        unitId: 'unit-a1-14',
        lessonNumber: 4,
        title_es: 'Proyecto Final A1: Mi Perfil y Mi Vida Completa',
        title_en: 'A1 Capstone Project: My Complete Profile',
        title_ar: 'مشروع تخرج المستوى A1: ملفي الشخصي الشامل',
        cefr: 'A1',
        objectives_en: ['Synthesize all A1 learning in a comprehensive autobiographical piece', 'Include personal details, family, home, routines, past experiences, and future plans', 'Celebrate mastery of CEFR Level A1'],
        objectives_ar: ['دمج كل مكتسبات المستوى A1 في نص سيرة ذاتية شامل', 'تضمين البيانات الشخصية، الأسرة، المنزل، الروتين، تجارب الماضي، والخطط المستقبلية', 'الاحتفال بإتقان المستوى المبتدئ A1'],
        vocabWordIds: ['w-proyecto', 'w-perfil', 'w-vida', 'w-meta', 'w-exito'],
        dialogue: [
          { speaker: 'Tutor IA', es: '¡Felicidades por llegar al proyecto final de A1! Ahora tienes todas las herramientas para comunicarte en español.', en: 'Congratulations on reaching the final A1 project! Now you have all the tools to communicate in Spanish.', ar: 'تهانينا الحارة لبلوغك المشروع النهائي للمستوى A1! لقد أصبحت تمتلك الأدوات الأساسية للتواصل بالإسبانية.' }
        ],
        exercises: [
          {
            id: 'ex-a1-14-4-1',
            type: 'multiple_choice',
            prompt_es: '¡Has completado las 14 unidades del nivel A1 con éxito! ¿Qué nivel sigue ahora?',
            prompt_en: 'You have mastered all 14 units of Level A1! What level comes next?',
            prompt_ar: 'لقد أكملت وحدات المستوى A1 الـ 14 بنجاح! ما هو المستوى التالي الآن؟',
            options: ['A2 — Elementary Spanish', 'B2 — Advanced', 'C2 — Native Mastery', 'A0 — Zero'],
            correctAnswer: 'A2 — Elementary Spanish',
            explanation_en: 'Level A2 builds upon your solid A1 foundation with rich past narrative tenses, object pronouns, and real-world travel fluency.',
            explanation_ar: 'المستوى A2 يبني على أساسك القوي ليتعمق في أزمنة الماضي المتنوعة، ضمائر المفعول، والطلاقة الحياتية.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write your comprehensive A1 Capstone Essay (at least 5 sentences) introducing yourself, your family, your daily routine, what you did recently, and your future Spanish goals.',
          prompt_ar: 'اكتب مقال تخرج المستوى A1 الشامل (5 جمل على الأقل) تذكر فيها اسمك، عائلتك، روتينك، ما فعلته مؤخراً، وأهدافك المستقبلية بالإسبانية.',
          minSentences: 5,
          sampleTarget: '¡Hola a todos! Me llamo Karim, tengo treinta años y soy de El Cairo. Vivo en un apartamento amplio y trabajo como diseñador gráfico. Todos los días me levanto a las siete, estudio español y voy al trabajo en metro. El fin de semana pasado visité a mis padres y cocinamos una cena deliciosa. El próximo año voy a viajar a España para hablar con nativos con total seguridad.'
        }
      }
    ]
  }
];
