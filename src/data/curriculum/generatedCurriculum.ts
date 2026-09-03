import { Unit, Lesson, Exercise, ExerciseType, CEFRLevel } from '../../types';

// Raw specifications for A1: 16 Units, exactly 81 Lessons total
const a1Specs = [
  {
    unitNumber: 1,
    title_es: 'Saludos y Primeros Contactos en la Calle',
    title_en: 'Greetings & Icebreakers in the Street',
    title_ar: 'التحيات وأول اللقاءات في الشارع',
    description_en: 'Break the ice with confidence. Learn high-frequency greeting collocations used by native speakers every day.',
    description_ar: 'اكسر الجليد بثقة. تعلم تراكيب التحيات الأكثر شيوعاً والمستخدمة يومياً من السكان المحليين.',
    lessons: [
      {
        lessonNumber: 1,
        title_es: 'Pedir Café: "Me pones un cortado, por favor"',
        title_en: 'Ordering Coffee: "Get me a cortado, please"',
        title_ar: 'طلب القهوة: "ضع لي كورتادو، من فضلك"',
        objectives_en: ['Order coffee like a native Spaniard', 'Inquire about milk and sweetness options', 'Use polite request chunks'],
        objectives_ar: ['طلب القهوة كالسكان المحليين في إسبانيا', 'الاستفسار عن خيارات الحليب والسكر', 'استخدام تراكيب الطلب المهذبة'],
        vocabWordIds: ['café', 'leche', 'azúcar', 'gracias', 'por-favor'],
        dialogue: [
          { speaker: 'Karim', es: 'Buenas, me pones un cortado con leche templada, por favor.', en: 'Hello, get me a cortado with warm milk, please.', ar: 'مرحباً، ضع لي قهوة كورتادو بحليب دافئ، من فضلك.' },
          { speaker: 'Camarero', es: '¡Claro que sí! ¿Quieres azúcar o sacarina? ¿Algo para comer?', en: 'Of course! Do you want sugar or sweetener? Anything to eat?', ar: 'بالتأكيد! هل تريد سكراً أم محلياً صناعياً؟ هل تريد شيئاً لتأكله؟' },
          { speaker: 'Karim', es: 'Azúcar, por favor. Y nada para comer, gracias.', en: 'Sugar, please. And nothing to eat, thank you.', ar: 'سكر، من فضلك. ولا شيء لآكله، شكراً.' }
        ],
        exercises: [
          {
            type: 'multiple_choice',
            prompt_es: '¿Qué significa "Me pones un cortado, por favor"?',
            prompt_en: 'What does "Me pones un cortado, por favor" mean?',
            prompt_ar: 'ماذا تعني عبارة "Me pones un cortado, por favor"؟',
            options: ['Can you bring me a coffee, please?', 'Get me a cortado, please', 'I do not want coffee', 'Where is the coffee shop?'],
            correctAnswer: 'Get me a cortado, please',
            explanation_en: '"Me pones..." is the most natural colloquial way to order in a Spanish bar or cafe.',
            explanation_ar: '"Me pones..." هي الطريقة العامية الأكثر طبيعية للطلب في المقاهي الإسبانية.'
          }
        ]
      },
      {
        lessonNumber: 2,
        title_es: 'Romper el Hielo en un Encuentro: "Me llamo..."',
        title_en: 'Icebreaker at a Meetup: "My name is..."',
        title_ar: 'كسر الجليد في لقاء: "اسمي..."',
        objectives_en: ['Introduce your name fluently', 'Ask other people for their names', 'Use natural greeting replies'],
        objectives_ar: ['ذكر اسمك بطلاقة', 'سؤال الآخرين عن أسمائهم', 'استخدام ردود التحية الطبيعية'],
        vocabWordIds: ['nombre', 'llamarse', 'amigo', 'hola', 'encantado'],
        dialogue: [
          { speaker: 'Karim', es: 'Hola, buenas tardes. Me llamo Karim, ¿y tú?', en: 'Hello, good afternoon. My name is Karim, and you?', ar: 'مرحباً، مساء الخير. اسمي كريم، وأنتِ؟' },
          { speaker: 'Lucía', es: 'Hola, Karim. Yo soy Lucía. Encantada de conocerte.', en: 'Hi, Karim. I am Lucia. Delighted to meet you.', ar: 'أهلاً يا كريم. أنا لوسيا. تشرفت بمعرفتك.' },
          { speaker: 'Karim', es: 'El gusto es mío, Lucía. ¿Eres de aquí?', en: 'The pleasure is mine, Lucia. Are you from here?', ar: 'الشرف لي يا لوسيا. هل أنتِ من هنا؟' }
        ]
      },
      {
        lessonNumber: 3,
        title_es: 'Tarde de Despedidas: "Hasta luego, gracias por todo"',
        title_en: 'Farewell Afternoon: "See you later, thanks for everything"',
        title_ar: 'مساء الوداع: "إلى اللقاء، شكراً على كل شيء"',
        objectives_en: ['End conversations politely and naturally', 'Express gratitude for help or service', 'Use diverse farewell chunks'],
        objectives_ar: ['إنهاء المحادثات بلباقة وطبيعية', 'التعبير عن الامتنان للمساعدة أو الخدمة', 'استخدام تراكيب التوديع المتنوعة'],
        vocabWordIds: ['adios', 'gracias', 'tarde', 'hablar', 'quedar'],
        dialogue: [
          { speaker: 'Karim', es: 'Bueno, Lucía, me tengo que ir ya. ¡Hasta luego!', en: 'Well, Lucia, I have to go now. See you later!', ar: 'حسنٌ يا لوسيا، يجب أن أذهب الآن. إلى اللقاء!' },
          { speaker: 'Lucía', es: '¡Hasta luego, Karim! Muchas gracias por la charla.', en: 'See you later, Karim! Thank you very much for the chat.', ar: 'إلى اللقاء يا كريم! شكراً جزيلاً على هذه الدردشة اللطيفة.' },
          { speaker: 'Karim', es: 'A ti. ¡Estamos en contacto!', en: 'To you. We are in touch!', ar: 'بل الشكر لكِ. نحن على تواصل!' }
        ]
      },
      {
        lessonNumber: 4,
        title_es: 'Hacks de Cortesía: "Disculpa, ¿me cobras?"',
        title_en: 'Politeness Hacks: "Excuse me, can I pay?"',
        title_ar: 'حيل اللباقة: "معذرة، هل تحاسبني؟"',
        objectives_en: ['Request the bill in restaurants politely', 'Get a waiter\'s attention naturally', 'Handle payment interactions'],
        objectives_ar: ['طلب الحساب في المطاعم بلباقة', 'لفت انتباه النادل بشكل طبيعي', 'التعامل مع تفاعلات الدفع'],
        vocabWordIds: ['pagar', 'cuenta', 'dinero', 'ayuda', 'por-favor'],
        dialogue: [
          { speaker: 'Karim', es: 'Disculpa, ¿me cobras cuando puedas por favor?', en: 'Excuse me, can you bill me when you can please?', ar: 'لو سمحت، هل تحاسبني عندما تستطيع من فضلك؟' },
          { speaker: 'Camarero', es: 'Sí, claro. Son doce euros en total. ¿Pagas con tarjeta?', en: 'Yes, of course. It is twelve euros in total. Are you paying with a card?', ar: 'نعم، بالطبع. الحساب اثنا عشر يورو إجمالاً. هل تدفع بالبطاقة؟' },
          { speaker: 'Karim', es: 'Sí, con tarjeta por favor. Quédate con el cambio.', en: 'Yes, with a card please. Keep the change.', ar: 'نعم، بالبطاقة من فضلك. احتفظ بالباقي كبقشيش.' }
        ]
      },
      {
        lessonNumber: 5,
        title_es: 'El Hielo Roto: "¿De qué parte eres?"',
        title_en: 'Icebreaker Challenge: "Whereabouts are you from?"',
        title_ar: 'تحدي كسر الجليد: "من أي مكان أنت؟"',
        objectives_en: ['Ask where people are from colloquially', 'Respond with your hometown and country', 'Describe your purpose in the city'],
        objectives_ar: ['السؤال عن موطن الأشخاص بأسلوب محلي', 'الرد بذكر مدينتك وبلدك الأم', 'وصف سبب تواجدك في المدينة'],
        vocabWordIds: ['vivir', 'estudiar', 'país', 'ciudad', 'nombre'],
        dialogue: [
          { speaker: 'Amigo', es: 'Oye Karim, ¿de qué parte de Egipto eres?', en: 'Hey Karim, what part of Egypt are you from?', ar: 'اسمع يا كريم، من أي مكان في مصر أنت؟' },
          { speaker: 'Karim', es: 'Soy de El Cairo, la capital. Pero ahora vivo en Madrid para aprender español.', en: 'I am from Cairo, the capital. But now I live in Madrid to learn Spanish.', ar: 'أنا من القاهرة، العاصمة. لكني أعيش الآن في مدريد لأتعلم اللغة الإسبانية.' },
          { speaker: 'Amigo', es: '¡Qué bien! El Cairo es una ciudad impresionante.', en: 'How great! Cairo is an impressive city.', ar: 'رائع جداً! القاهرة مدينة مذهلة.' }
        ]
      }
    ]
  },
  {
    unitNumber: 2,
    title_es: 'Identidad Social y Registro de Supervivencia',
    title_en: 'Personal Info & Social Identity',
    title_ar: 'المعلومات الشخصية والهوية الاجتماعية',
    description_en: 'Master registering at shared hostels, swapping WhatsApp numbers, and explaining what you do naturally.',
    description_ar: 'إتقان إجراءات التسجيل في النزل المشتركة، تبادل أرقام الواتساب، والتعريف بعملك بطلاقة.',
    lessons: [
      {
        lessonNumber: 1,
        title_es: 'Registro del Hostal: "Tengo una reserva a nombre de..."',
        title_en: 'Hostel Registration: "I have a booking under..."',
        title_ar: 'تسجيل النزل: "لدي حجز باسم..."',
        objectives_en: ['Register fluently at hotels or hostels', 'Provide passport details and spell names', 'Inquire about basic facilities'],
        objectives_ar: ['التسجيل بطلاقة في الفنادق أو النزل', 'تقديم تفاصيل جواز السفر وتهجئة الأسماء', 'الاستفسار عن المرافق الأساسية'],
        vocabWordIds: ['hotel', 'pasaporte', 'nombre', 'clave', 'entrar'],
        dialogue: [
          { speaker: 'Recepcionista', es: '¡Buenas! Bienvenido. ¿Tiene una reserva con nosotros?', en: 'Hi! Welcome. Do you have a reservation with us?', ar: 'مرحباً! أهلاً بك. هل لديك حجز معنا؟' },
          { speaker: 'Karim', es: 'Sí, buenas tardes. Tengo una reserva a nombre de Karim Mansour.', en: 'Yes, good afternoon. I have a reservation under the name Karim Mansour.', ar: 'نعم، مساء الخير. لدي حجز باسم كريم منصور.' },
          { speaker: 'Recepcionista', es: 'Perfecto. Déjame ver tu pasaporte por favor.', en: 'Perfect. Let me see your passport please.', ar: 'ممتاز. دعني أرى جواز سفرك من فضلك.' }
        ]
      },
      {
        lessonNumber: 2,
        title_es: 'Hacks de WhatsApp: "Te paso mi número móvil"',
        title_en: 'WhatsApp Hacks: "I\'ll give you my mobile number"',
        title_ar: 'حيل الواتساب: "سأعطيك رقم هاتفي المحمول"',
        objectives_en: ['Exchange phone numbers with international codes', 'Request contact handles on social networks', 'End interactions with warm messages'],
        objectives_ar: ['تبادل أرقام الهواتف برموز الاتصال الدولية', 'طلب حسابات التواصل الاجتماعي', 'إنهاء التفاعل برسائل ودية حارة'],
        vocabWordIds: ['móvil', 'escribir', 'amigo', 'enviar', 'hola'],
        dialogue: [
          { speaker: 'Lucía', es: 'Me lo he pasado muy bien hoy. ¿Te paso mi número móvil?', en: 'I had a really good time today. Shall I give you my mobile number?', ar: 'لقد قضيت وقتاً رائعاً اليوم. هل أعطيكِ رقم هاتفي المحمول؟' },
          { speaker: 'Karim', es: '¡Sí, claro! Apúntalo: más veinte, doce, tres, cuatro...', en: 'Yes, of course! Write it down: plus twenty, twelve, three, four...', ar: 'نعم، بالطبع! سجله: زائد عشرين، اثني عشر، ثلاثة، أربعة...' },
          { speaker: 'Lucía', es: 'Perfecto, te escribo un mensaje por WhatsApp ahora.', en: 'Perfect, I will write you a message on WhatsApp now.', ar: 'ممتاز، سأكتب لك رسالة على الواتساب الآن.' }
        ]
      },
      {
        lessonNumber: 3,
        title_es: 'Mis Lenguas: "Soy de... y hablo..."',
        title_en: 'My Languages: "I am from... and I speak..."',
        title_ar: 'لغاتي: "أنا من... وأتحدث..."',
        objectives_en: ['Describe your nationalities and country of origin', 'List the languages you speak fluently or are learning', 'Explain language proficiency simply'],
        objectives_ar: ['وصف جنسيتك وبلدك الأم', 'تعداد اللغات التي تتحدثها بطلاقة أو تتعلمها', 'شرح مستوى إتقانك للغات ببساطة'],
        vocabWordIds: ['país', 'hablar', 'estudiar', 'vida', 'aprender'],
        dialogue: [
          { speaker: 'Compañero', es: '¿Y qué idiomas hablas, Karim?', en: 'And what languages do you speak, Karim?', ar: 'وما هي اللغات التي تتحدثها يا كريم؟' },
          { speaker: 'Karim', es: 'Hablo árabe nativo, inglés fluido y un poco de español.', en: 'I speak native Arabic, fluent English, and a little Spanish.', ar: 'أتحدث العربية كلغة أم، الإنجليزية بطلاقة، وقليلاً من الإسبانية.' },
          { speaker: 'Compañero', es: '¡Tu español es muy bueno! Se te entiende perfectamente.', en: 'Your Spanish is very good! You are understood perfectly.', ar: 'لغتك الإسبانية جيدة جداً! كلامك مفهوم تماماً.' }
        ]
      },
      {
        lessonNumber: 4,
        title_es: 'Supervivencia Profesional: "Trabajo como..."',
        title_en: 'Professional Survival: "I work as..."',
        title_ar: 'النجاة المهنية: "أعمل كـ..."',
        objectives_en: ['Describe your job or studies naturally', 'Talk about your daily professional routine', 'Introduce professional titles simply'],
        objectives_ar: ['وصف وظيفتك أو دراستك بشكل طبيعي', 'التحدث عن روتينك المهني اليومي', 'تقديم المسميات الوظيفية ببساطة'],
        vocabWordIds: ['trabajo', 'hacer', 'vida', 'oficina', 'estudiar'],
        dialogue: [
          { speaker: 'Lucía', es: 'Karim, ¿a qué te dedicas? ¿Trabajas o estudias?', en: 'Karim, what do you do? Do you work or study?', ar: 'كريم، ماذا تعمل؟ هل تعمل أم تدرس؟' },
          { speaker: 'Karim', es: 'Trabajo como programador de software en remoto. ¿Y tú?', en: 'I work as a remote software programmer. And you?', ar: 'أعمل كمبرمج برمجيات عن بُعد. وأنتِ؟' },
          { speaker: 'Lucía', es: 'Yo estudio medicina y trabajo los fines de semana.', en: 'I study medicine and work on weekends.', ar: 'أنا أدرس الطب وأعمل في عطلات نهاية الأسبوع.' }
        ]
      },
      {
        lessonNumber: 5,
        title_es: 'Socios en la Ciudad: "Mucho gusto, igualmente"',
        title_en: 'Partners in Town: "Nice to meet you, likewise"',
        title_ar: 'شركاء في المدينة: "تشرفت بك، وأنا كذلك"',
        objectives_en: ['Express warmth when meeting new companions', 'Coordinate casual group interactions', 'Introduce friends to each other'],
        objectives_ar: ['التعبير عن الود عند لقاء رفقاء جدد', 'تنسيق التفاعلات الجماعية غير الرسمية', 'تقديم الأصدقاء لبعضهم البعض'],
        vocabWordIds: ['nombre', 'amigo', 'mucho-gusto', 'encantado', 'gracias'],
        dialogue: [
          { speaker: 'Karim', es: 'Lucía, te presento a mi compañero de cuarto, Carlos.', en: 'Lucia, I present to you my roommate, Carlos.', ar: 'لوسيا، أقدم لكِ شريكي في السكن، كارلوس.' },
          { speaker: 'Lucía', es: '¡Hola, Carlos! Mucho gusto en conocerte.', en: 'Hi, Carlos! Nice to meet you.', ar: 'أهلاً يا كارلوس! تشرفت بمعرفتك.' },
          { speaker: 'Carlos', es: 'Hola, Lucía. Igualmente, el gusto es mío.', en: 'Hi, Lucia. Likewise, the pleasure is mine.', ar: 'أهلاً يا لوسيا. وأنا كذلك، الشرف لي.' }
        ]
      }
    ]
  }
];

const a2Specs = [
  {
    unitNumber: 17,
    title_es: 'Misión: Problemas de Viaje y Pérdidas',
    title_en: 'Mission: Travel Problems & Lost Items',
    title_ar: 'مهمة: مشكلات السفر والمفقودات',
    description_en: 'Navigate flight cancellations, report delayed bags, and claim compensation confidently in Spanish.',
    description_ar: 'التعامل مع إلغاء الرحلات الجوية، الإبلاغ عن الحقائب المتأخرة، والمطالبة بالتعويضات بثقة بالإسبانية.',
    lessons: [
      {
        lessonNumber: 1,
        title_es: 'Aeropuerto: "Perdí mi equipaje, es una maleta roja"',
        title_en: 'Airport: "I lost my luggage, it is a red bag"',
        title_ar: 'المطار: "لقد فقدت حقائبي، إنها حقيبة حمراء"',
        objectives_en: ['Describe physical attributes of lost bags', 'File official luggage tracking reports', 'Provide local address delivery details'],
        objectives_ar: ['وصف السمات المادية للحقائب المفقودة', 'تقديم تقارير تتبع الأمتعة الرسمية', 'تقديم تفاصيل عنوان السكن المحلي للتوصيل'],
        vocabWordIds: ['maleta', 'perderse', 'ayuda', 'malo', 'viajar'],
        dialogue: [
          { speaker: 'Huésped', es: 'Hola, buenas tardes. Acabo de aterrizar pero mi maleta roja no sale por la cinta.', en: 'Hello, good afternoon. I just landed but my red suitcase is not coming out on the belt.', ar: 'مرحباً، مساء الخير. لقد هبطت طائرتي للتو ولكن حقيبتي الحمراء لم تظهر على السير.' },
          { speaker: 'Agente', es: 'Vaya, lo lamento. Rellene este formulario de pérdida con sus datos de contacto.', en: 'Oh, I\'m sorry. Fill out this loss form with your contact details.', ar: 'يا للأسف، أنا آسف. املأ استمارة الفقدان هذه ببيانات الاتصال الخاصة بك.' },
          { speaker: 'Huésped', es: 'Perfecto. Estoy alojado en el Hostal Central de la calle Mayor.', en: 'Perfect. I am staying at the Central Hostel on Mayor street.', ar: 'ممتاز. أنا أقيم في نزل Hostal Central بشارع مايور.' }
        ],
        exercises: [
          {
            type: 'multiple_choice',
            prompt_es: '¿Qué significa "Perdí mi equipaje" en el aeropuerto?',
            prompt_en: 'What does "Perdí mi equipaje" mean at the airport?',
            prompt_ar: 'ماذا تعني عبارة "Perdí mi equipaje" في المطار؟',
            options: ['I lost my luggage', 'I found my bag', 'I want to buy a ticket', 'Where is the gate?'],
            correctAnswer: 'I lost my luggage',
            explanation_en: '"Equipaje" is the general word for luggage, and "perdí" is the preterite of perder (to lose).',
            explanation_ar: '"Equipaje" هي الكلمة العامة للأمتعة والحقائب، و "perdí" هو الماضي البسيط من فعل perder (يفقد).'
          }
        ]
      },
      {
        lessonNumber: 2,
        title_es: 'Retrasos: "Mi vuelo se ha retrasado"',
        title_en: 'Delays: "My flight has been delayed"',
        title_ar: 'التأخيرات: "لقد تأخرت رحلتي الجوية"',
        objectives_en: ['Inquire about delayed flights and gates', 'Request meal vouchers during long waits', 'Understand boarding announcement vocabulary'],
        objectives_ar: ['الاستفسار عن الرحلات المتأخرة وبوابات الصعود', 'طلب قسائم وجبات الطعام أثناء فترات الانتظار الطويلة', 'فهم مفردات إعلانات بوابات الصعود'],
        vocabWordIds: ['viajar', 'tren', 'tiempo', 'ayuda', 'malo'],
        dialogue: [
          { speaker: 'Pasajero', es: 'Disculpe, mi vuelo para Barcelona se ha retrasado tres horas. ¿Hay alguna compensación?', en: 'Excuse me, my flight to Barcelona has been delayed three hours. Is there any compensation?', ar: 'لو سمحت، لقد تأخرت رحلتي إلى برشلونة ثلاث ساعات. هل هناك أي تعويض؟' },
          { speaker: 'Agente', es: 'Sí, claro. Aquí tiene un vale de comida para usar en los restaurantes del aeropuerto.', en: 'Yes, of course. Here is a food voucher to use in the airport restaurants.', ar: 'نعم، بالطبع. تفضل هذه قسيمة وجبة طعام لاستخدامها في مطاعم المطار.' },
          { speaker: 'Pasajero', es: 'Muchas gracias. ¿Sabe cuál será la puerta de embarque final?', en: 'Thank you very much. Do you know which will be the final boarding gate?', ar: 'شكراً جزيلاً لك. هل تعرف أي بوابة ستكون بوابة الصعود النهائية؟' }
        ]
      },
      {
        lessonNumber: 3,
        title_es: 'Transbordos: "He perdido mi vuelo de conexión"',
        title_en: 'Connections: "I missed my connecting flight"',
        title_ar: 'الرحلات المتصلة: "لقد فاتتني رحلة المتابعة الخاصة بي"',
        objectives_en: ['Explain missing a tight connecting flight', 'Request rebooking on the next available plane', 'Negotiate complimentary airport hotels'],
        objectives_ar: ['شرح تفويت رحلة متابعة متصلة ضيقة الوقت', 'طلب إعادة الحجز على أول طائرة متاحة', 'التفاوض للحصول على فندق مجاني بالمطار'],
        vocabWordIds: ['perderse', 'ayuda', 'hotel', 'entrar', 'viajar'],
        dialogue: [
          { speaker: 'Pasajero', es: 'Ayuda, por favor. El primer vuelo llegó tarde y he perdido mi vuelo de conexión.', en: 'Help, please. The first flight arrived late and I have missed my connecting flight.', ar: 'المساعدة، من فضلك. الطائرة الأولى وصلت متأخرة وقد فاتتني رحلة المتابعة الخاصة بي.' },
          { speaker: 'Agente', es: 'No se preocupe. Lo voy a reubicar en el próximo vuelo de las ocho de la noche sin coste.', en: 'Don\'t worry. I will rebook you on the next flight at eight in the evening at no cost.', ar: 'لا تقلق. سأقوم بإعادة حجزك على الرحلة التالية في الثامنة مساءً دون أي تكلفة إضافية.' },
          { speaker: 'Pasajero', es: 'Menos mal. ¿Me puede dar también un billete de hotel si se cancela?', en: 'Thank goodness. Can you also give me a hotel voucher if it gets cancelled?', ar: 'الحمد لله. هل يمكنكم أيضاً إعطائي قسيمة فندق إذا تم إلغاؤها؟' }
        ]
      },
      {
        lessonNumber: 4,
        title_es: 'Atención al Cliente: "¿Dónde está el mostrador?"',
        title_en: 'Customer Service: "Where is the counter?"',
        title_ar: 'خدمة العملاء: "أين يوجد مكتب الاستقبال؟"',
        objectives_en: ['Locate airline customer service counters', 'Complain about poor transit treatments', 'Request official written complaints sheets'],
        objectives_ar: ['تحديد مكان مكاتب خدمة عملاء شركات الطيران', 'الشكوى من سوء المعاملة أو التأخير', 'طلب نموذج شكوى رسمي مكتوب'],
        vocabWordIds: ['buscar', 'ayuda', 'calle', 'explicar', 'solución'],
        dialogue: [
          { speaker: 'Pasajero', es: 'Disculpe, ¿dónde está el mostrador de atención al cliente de Iberia?', en: 'Excuse me, where is the customer service counter of Iberia?', ar: 'لو سمحت، أين يوجد مكتب خدمة عملاء طيران إيبيريا؟' },
          { speaker: 'Informativo', es: 'Está en la tercera planta, justo al lado de las máquinas de facturación.', en: 'It is on the third floor, right next to the check-in machines.', ar: 'إنه في الطابق الثالث، بجانب آلات تسجيل الحقائب مباشرة.' },
          { speaker: 'Pasajero', es: 'Gracias. Voy a poner una reclamación oficial por la pérdida.', en: 'Thank you. I am going to file an official complaint for the loss.', ar: 'شكراً لك. سأذهب لتقديم شكوى رسمية بشأن فقدان الأمتعة.' }
        ]
      },
      {
        lessonNumber: 5,
        title_es: 'Misión Aeropuerto: El Reclamo Final',
        title_en: 'Airport Mission: The Final Claim',
        title_ar: 'مهمة المطار: المطالبة النهائية بالحقائب',
        objectives_en: ['Synthesize airline complaint and lost luggage skills', 'Present ticket slips and receipts systematically', 'Verify compensation totals fluently'],
        objectives_ar: ['دمج مهارات شكاوى شركات الطيران وفقدان الأمتعة الشاملة', 'تقديم تذاكر الصعود والإيصالات بشكل منظم وسليم', 'التحقق من إجمالي مبالغ التعويضات بطلاقة'],
        vocabWordIds: ['dinero', 'pagar', 'ayuda', 'recibir', 'solución'],
        dialogue: [
          { speaker: 'Agente', es: 'Hola. He visto su reporte. Aquí tiene la confirmación y los cien euros para gastos básicos.', en: 'Hello. I have seen your report. Here is the confirmation and the hundred euros for basic expenses.', ar: 'مرحباً. لقد اطلعت على بلاغك. تفضل هذا تأكيد استلام الشكوى ومبلغ مئة يورو للمصاريف الأساسية.' },
          { speaker: 'Huésped', es: 'Perfecto. Espero que localicen mi maleta roja pronto y la envíen a mi dirección.', en: 'Perfect. I hope they locate my red suitcase soon and send it to my address.', ar: 'ممتاز. آمل أن تعثروا على حقيبتي الحمراء قريباً وترسلوها إلى عنوان إقامتي.' },
          { speaker: 'Agente', es: 'Así será. Le mantendremos informado por correo electrónico a diario.', en: 'So it shall be. We will keep you updated by email daily.', ar: 'سيكون كذلك بالتأكيد. سنبقيك على اطلاع دائم عبر البريد الإلكتروني يومياً.' }
        ]
      }
    ]
  }
];

// Helper to fill other lessons up to 81 for A1 and 61 for A2 to guarantee absolute completeness
export function generateLessons(level: CEFRLevel, startUnit: number, totalLessons: number): Lesson[] {
  const lessons: Lesson[] = [];
  const startLessonNum = 1;

  for (let i = startLessonNum; i <= totalLessons; i++) {
    const lessonId = `lesson-${level.toLowerCase()}-${startUnit}-${i}`;
    const unitId = `unit-${level.toLowerCase()}-${startUnit}`;

    // Highly practical, real-world scenario titles based on level and index
    let title_es = `Misión Conversacional ${i}`;
    let title_en = `Conversational Mission ${i}`;
    let title_ar = `مهمة حوارية ${i}`;
    let objectives_en = ['Master high-frequency conversational collocations', 'Practice active listening in real-world contexts'];
    let objectives_ar = ['إتقان التراكيب الحوارية الأكثر شيوعاً واستخداماً', 'التدرب على الاستماع الفعال في سياقات واقعية'];
    let dialogue = [
      { speaker: 'Hispano', es: 'Hola, buenas. ¿Qué tal va tu día aprendiendo español?', en: 'Hi, hello. How is your day going learning Spanish?', ar: 'مرحباً، أهلاً بك. كيف يسير يومك في تعلم اللغة الإسبانية؟' },
      { speaker: 'Estudiante', es: '¡Me flipa el ambiente! Cada día hablo con más seguridad y fluidez.', en: 'I am crazy about the vibe! Every day I speak with more confidence and fluency.', ar: 'أنا معجب جداً بالأجواء! أتحدث كل يوم بثقة وطلاقة أكبر.' }
    ];

    if (level === 'A1') {
      if (startUnit === 1) {
        title_es = 'Ordenando Comida en la Calle: "¿Qué me recomiendas?"';
        title_en = 'Ordering Street Food: "What do you recommend?"';
        title_ar = 'طلب طعام الشارع: "بماذا تنصحني؟"';
        objectives_en = ['Order tacos like a local', 'Ask for meat or vegetarian recommendations', 'Specify spice level preferences'];
        objectives_ar = ['طلب التاكو كالمحليين', 'طلب توصيات للأطباق النباتية أو اللحوم', 'تحديد درجة حرارة البهارات المفضلة'];
      } else if (startUnit === 2) {
        title_es = 'WhatsApp y Contactos: "Pásame tu número móvil"';
        title_en = 'WhatsApp Exchange: "Give me your mobile number"';
        title_ar = 'تبادل الواتساب: "أعطني رقم هاتفك المحمول"';
        objectives_en = ['Swap contact numbers with country codes', 'Save social media profiles in your phone', 'Coordinate immediate meetup texts'];
        objectives_ar = ['تبادل أرقام الهواتف برموز الدول', 'حفظ حسابات التواصل الاجتماعي في هاتفك', 'تنسيق نصوص اللقاءات العاجلة'];
      } else {
        // Descriptive real-world situational scenarios
        const scenarios = [
          { es: 'En el Mercado: "Ponme un kilo de tomates"', en: 'At the Market: "Give me a kilo of tomatoes"', ar: 'في السوق: "ضع لي كيلو طماطم"', obj_en: 'Buy fresh produce from local market vendors', obj_ar: 'شراء المنتجات الطازجة من بائعي السوق المحليين' },
          { es: 'La Cuenta: "¿Cuánto te debo en total?"', en: 'The Bill: "How much do I owe you in total?"', ar: 'الحساب: "كم أدين لك إجمالاً؟"', obj_en: 'Ask for the restaurant bill and calculate tips', obj_ar: 'طلب فاتورة المطعم وحساب البقشيش المناسب' },
          { es: 'En el Hostal: "¿Me das la clave del Wi-Fi?"', en: 'Hostel Hacks: "Can I have the Wi-Fi password?"', ar: 'في النزل: "هل تعطيني كلمة مرور الواي فاي؟"', obj_en: 'Request amenities and Wi-Fi access codes', obj_ar: 'طلب الاحتياجات الأساسية وكلمات مرور الإنترنت' },
          { es: 'Urbano: "Saca un billete de diez viajes"', en: 'Urban Transit: "Get a 10-trip card"', ar: 'المواصلات: "احصل على بطاقة عشر رحلات"', obj_en: 'Buy subway cards and ask for central lines', obj_ar: 'شراء تذاكر المترو والاستفسار عن الخطوط المركزية' },
          { es: 'Alquiler: "Desbloquear una bici pública"', en: 'Bike Rental: "Unlocking a public bike"', ar: 'استئجار الدراجات: "إلغاء قفل دراجة عامة"', obj_en: 'Download transport apps and unlock rental bikes', obj_ar: 'تحميل تطبيقات النقل وإلغاء قفل دراجات الإيجار' },
          { es: 'Boutique: "Solo estoy mirando, gracias"', en: 'Boutique Shop: "Just looking, thank you"', ar: 'البوتيك: "أنا أتفرج فقط، شكراً لك"', obj_en: 'Decline pushy sales assistants politely', obj_ar: 'الاعتذار بلباقة من البائعين الملحّين في المتاجر' },
          { es: 'El Rastro: "Hazme una rebajita por el cuadro"', en: 'Flea Market: "Give me a small discount on the painting"', ar: 'سوق السلع: "اعمل لي تخفيضاً على اللوحة"', obj_en: 'Bargain and negotiate prices at street markets', obj_ar: 'الفصال والمساومة على الأسعار في أسواق الشوارع' },
          { es: 'Farmacia: "Me duele mucho la cabeza"', en: 'At the Pharmacy: "My head hurts a lot"', ar: 'في الصيدلية: "رأسي يؤلمني بشدة"', obj_en: 'Explain acute pain symptoms and request remedies', obj_ar: 'شرح أعراض الآلام الحادة وطلب العلاج والمسكنات' }
        ];
        const sc = scenarios[i % scenarios.length];
        title_es = sc.es;
        title_en = sc.en;
        title_ar = sc.ar;
        objectives_en = [sc.obj_en];
        objectives_ar = [sc.obj_ar];
      }
    } else {
      // Level A2
      const scenariosA2 = [
        { es: 'Negociando Alquiler: "Me parece excesivo"', en: 'Negotiating Rent: "It seems excessive to me"', ar: 'تفاوض الإيجار: "يبدو السعر مبالغاً فيه"', obj_en: 'Debate rent prices firmly and adjust deposits', obj_ar: 'مناقشة أسعار السكن بحزم وتعديل مبالغ التأمين' },
        { es: 'Problema en AirBnB: "La calefacción no va"', en: 'Airbnb Issues: "The heating is not working"', ar: 'مشكلات السكن: "التدفئة لا تعمل"', obj_en: 'Report maintenance failures and demand immediate repairs', obj_ar: 'الإبلاغ عن أعطال الصيانة والمطالبة بإصلاح عاجل' },
        { es: 'Accidente Menor: "¿Qué ha pasado aquí?"', en: 'Minor Accident: "What has happened here?"', ar: 'حادث بسيط: "ماذا حدث هنا؟"', obj_en: 'Describe collisions to police and exchange insurance', obj_ar: 'وصف وقائع التصادم للشرطة وتبادل بيانات التأمين' },
        { es: 'En Correos: "Enviar un paquete urgente"', en: 'Post Office: "Sending an urgent package"', ar: 'في البريد: "إرسال طرد عاجل وسريع"', obj_en: 'Specify delivery speeds and declare package customs values', obj_ar: 'تحديد سرعة الشحن والتصريح عن محتويات الطرد للجمارك' },
        { es: 'Charlando en la Plaza: "Me flipa el ambiente"', en: 'Plaza Chat: "I am crazy about the atmosphere"', ar: 'دردشة الساحة: "أنا معجب جداً بالأجواء"', obj_en: 'Socialize at plazas and express high enthusiasm', obj_ar: 'التواصل الاجتماعي في الساحات والتعبير عن الحماس' },
        { es: 'Leyendas de Coyoacán: "Cuentan que en esta casa..."', en: 'Coyoacan Legends: "They say that in this house..."', ar: 'أساطير الحي: "يروون أنه في هذا المنزل..."', obj_en: 'Narrate spooky urban legends using past tenses', obj_ar: 'سرد أساطير الحي المرعبة باستخدام صيغ الماضي' },
        { es: 'La Entrevista: "Cuéntanos de tu país"', en: 'The Interview: "Tell us about your country"', ar: 'المقابلة الإذاعية: "حدثنا عن بلدك وثقافتك"', obj_en: 'Speak spontaneously on public media about your life', obj_ar: 'التحدث بعفوية في المقابلات العامة عن روتين حياتك' },
        { es: 'Fiesta del Barrio: "¡Traigo unos tamales!"', en: 'Block Party: "I brought some tamales!"', ar: 'احتفال الحي: "لقد أحضرت بعض فطائر التاماليس!"', obj_en: 'Introduce cultural food gifts and praise other cooks', obj_ar: 'تقديم الأطعمة التقليدية كهدية ومدح مهارات الطهاة' }
      ];
      const sc = scenariosA2[i % scenariosA2.length];
      title_es = sc.es;
      title_en = sc.en;
      title_ar = sc.ar;
      objectives_en = [sc.obj_en];
      objectives_ar = [sc.obj_ar];
    }

    const exercises: Exercise[] = [];

    // Build scenario-specific, non-repetitive exercises for generated lessons
    if (level === 'A1') {
      if (startUnit === 1) {
        exercises.push(
          {
            id: `ex-${lessonId}-1`,
            type: 'multiple_choice',
            prompt_es: `Completa para pedir comida en la calle: "Disculpa, ¿qué me ________ para cenar?"`,
            prompt_en: `Complete to order street food: "Excuse me, what do you ________ for dinner?"`,
            prompt_ar: `أكمل لطلب الطعام في الشارع: "عفواً، بماذا تنصحني للعشاء؟"`,
            options: ['recomiendas', 'escribes', 'vuelas', 'duermes'],
            correctAnswer: 'recomiendas',
            explanation_en: '"¿Qué me recomiendas?" asks for recommendations.',
            explanation_ar: '"¿Qué me recomiendas?" تسأل عن التوصيات والمقترحات.'
          },
          {
            id: `ex-${lessonId}-2`,
            type: 'fill_blank',
            prompt_es: `Si no te gusta el picante, dices: "Sin salsa ________, por favor."`,
            prompt_en: `If you dislike spicy food, you say: "Without ________ sauce, please."`,
            prompt_ar: `إذا كنت لا تحب الحار تقول: "بدون صلصة حارة من فضلك."`,
            options: ['picosa', 'dulce', 'fría', 'lenta'],
            correctAnswer: 'picosa',
            explanation_en: '"Picosa" means spicy or hot in Mexican and everyday Spanish.',
            explanation_ar: '"Picosa" تعني حارة أو ذات بهارات شديدة.'
          }
        );
      } else if (startUnit === 2) {
        exercises.push(
          {
            id: `ex-${lessonId}-1`,
            type: 'multiple_choice',
            prompt_es: `Para intercambiar contactos dices: "Pásame tu ________ móvil por favor."`,
            prompt_en: `To exchange contacts you say: "Send me your mobile ________ please."`,
            prompt_ar: `لتبادل أرقام التواصل تقول: "أرسل لي رقم هاتفك المحمول."`,
            options: ['número', 'nombre', 'coche', 'billete'],
            correctAnswer: 'número',
            explanation_en: '"Número móvil" means mobile phone number.',
            explanation_ar: '"Número móvil" يعني رقم الهاتف المحمول.'
          },
          {
            id: `ex-${lessonId}-2`,
            type: 'fill_blank',
            prompt_es: `Para enviar un mensaje rápido dices: "Te ________ por WhatsApp cuando llegue."`,
            prompt_en: `To send a quick text you say: "I will ________ you on WhatsApp when I arrive."`,
            prompt_ar: `لإرسال رسالة سريعة تقول: "سأكتب لك على الواتساب عند وصولي."`,
            options: ['escribo', 'como', 'bailo', 'abro'],
            correctAnswer: 'escribo',
            explanation_en: '"Te escribo" means I will text/write to you.',
            explanation_ar: '"Te escribo" تعني سأكتب لك رسالة.'
          }
        );
      } else {
        const scenarioTopic = title_es.toLowerCase();
        if (scenarioTopic.includes('mercado')) {
          exercises.push(
            {
              id: `ex-${lessonId}-1`,
              type: 'multiple_choice',
              prompt_es: `En el mercado dices: "Ponme un ________ de tomates frescos."`,
              prompt_en: `At the market you say: "Give me a ________ of fresh tomatoes."`,
              prompt_ar: `في السوق تقول: "ضع لي كيلو طماطم طازجة."`,
              options: ['kilo', 'metro', 'minuto', 'libro'],
              correctAnswer: 'kilo',
              explanation_en: '"Un kilo" is a kilogram.',
              explanation_ar: '"Un kilo" يعني كيلو جرام.'
            }
          );
        } else if (scenarioTopic.includes('cuenta')) {
          exercises.push(
            {
              id: `ex-${lessonId}-1`,
              type: 'multiple_choice',
              prompt_es: `Para pedir lo que debes en un café dices: "¿Me traes la ________, por favor?"`,
              prompt_en: `To ask what you owe at a cafe you say: "Can you bring me the ________, please?"`,
              prompt_ar: `لطلب الحساب في المقهى تقول: "هل تحضر لي الفاتورة من فضلك؟"`,
              options: ['cuenta', 'puerta', 'carta', 'mesa'],
              correctAnswer: 'cuenta',
              explanation_en: '"La cuenta" means the bill.',
              explanation_ar: '"La cuenta" تعني الفاتورة.'
            }
          );
        } else if (scenarioTopic.includes('hostal')) {
          exercises.push(
            {
              id: `ex-${lessonId}-1`,
              type: 'multiple_choice',
              prompt_es: `En la recepción pides: "¿Cuál es la ________ del Wi-Fi?"`,
              prompt_en: `At reception you ask: "What is the Wi-Fi ________?"`,
              prompt_ar: `في الاستقبال تسأل: "ما هي كلمة مرور الواي فاي؟"`,
              options: ['clave', 'cama', 'calle', 'llave'],
              correctAnswer: 'clave',
              explanation_en: '"La clave" means the password or key code.',
              explanation_ar: '"La clave" تعني كلمة المرور أو رمز الدخول.'
            }
          );
        } else if (scenarioTopic.includes('urbano') || scenarioTopic.includes('billete')) {
          exercises.push(
            {
              id: `ex-${lessonId}-1`,
              type: 'multiple_choice',
              prompt_es: `En el metro pides: "Un ________ de diez viajes, por favor."`,
              prompt_en: `At the metro you ask: "A 10-trip ________, please."`,
              prompt_ar: `في المترو تطلب: "تذكرة عشر رحلات من فضلك."`,
              options: ['billete', 'autobús', 'avión', 'coche'],
              correctAnswer: 'billete',
              explanation_en: '"Billete" means ticket in Spain.',
              explanation_ar: '"Billete" يعني تذكرة سفر.'
            }
          );
        } else {
          exercises.push(
            {
              id: `ex-${lessonId}-1`,
              type: 'multiple_choice',
              prompt_es: `Selecciona la respuesta adecuada en la situación: "${title_es}"`,
              prompt_en: `Select the appropriate practical phrase for: "${title_en}"`,
              prompt_ar: `اختر العبارة المناسبة للموقف: "${title_ar}"`,
              options: ['Por favor, ¿me pones un cortado?', 'No gracias, solo estoy mirando', '¿Dónde está la parada más cercana?', 'Muchas gracias por todo'],
              correctAnswer: 'Por favor, ¿me pones un cortado?',
              explanation_en: 'Selects a natural conversational expression.',
              explanation_ar: 'اختيار تعبير حواري طبيعي ومناسب.'
            }
          );
        }
      }
    } else {
      // Level A2 scenario-tailored exercises
      const scenarioTopic = title_es.toLowerCase();
      if (scenarioTopic.includes('alquiler') || scenarioTopic.includes('excesivo')) {
        exercises.push(
          {
            id: `ex-${lessonId}-1`,
            type: 'multiple_choice',
            prompt_es: `Para negociar el precio del piso dices: "El precio me parece un poco ________."`,
            prompt_en: `To negotiate apartment rent you say: "The price seems a bit ________ to me."`,
            prompt_ar: `لتفاوض سعر الشقة تقول: "يبدو السعر مبالغاً فيه قليلاً."`,
            options: ['excesivo', 'barato', 'amable', 'nuevo'],
            correctAnswer: 'excesivo',
            explanation_en: '"Excesivo" means excessive or overpriced.',
            explanation_ar: '"Excesivo" يعني مبالغ فيه أو مرتفع جداً.'
          }
        );
      } else if (scenarioTopic.includes('airbnb') || scenarioTopic.includes('calefacción')) {
        exercises.push(
          {
            id: `ex-${lessonId}-1`,
            type: 'multiple_choice',
            prompt_es: `Para reportar una avería al anfitrión dices: "Disculpa, la calefacción no ________."`,
            prompt_en: `To report a issue to the host you say: "Excuse me, the heating is not ________."`,
            prompt_ar: `للإبلاغ عن عطل للمضيف تقول: "عفواً، التدفئة لا تعمل."`,
            options: ['funciona', 'come', 'vuela', 'escribe'],
            correctAnswer: 'funciona',
            explanation_en: '"No funciona" means it is not working.',
            explanation_ar: '"No funciona" تعني لا تعمل أو بها عطل.'
          }
        );
      } else if (scenarioTopic.includes('correos') || scenarioTopic.includes('paquete')) {
        exercises.push(
          {
            id: `ex-${lessonId}-1`,
            type: 'multiple_choice',
            prompt_es: `En la oficina de Correos dices: "Quiero enviar este paquete de forma ________."`,
            prompt_en: `At the post office you say: "I want to send this package ________."`,
            prompt_ar: `في مكتب البريد تقول: "أريد إرسال هذا الطرد بشكل عاجل."`,
            options: ['urgente', 'lenta', 'callada', 'triste'],
            correctAnswer: 'urgente',
            explanation_en: '"Urgente" means urgent/express delivery.',
            explanation_ar: '"Urgente" تعني عاجل أو سريع.'
          }
        );
      } else {
        exercises.push(
          {
            id: `ex-${lessonId}-1`,
            type: 'multiple_choice',
            prompt_es: `En la situación "${title_es}", ¿cuál es la expresión correcta?`,
            prompt_en: `In the situation "${title_en}", which is the correct phrase?`,
            prompt_ar: `في موقف "${title_ar}"، ما هي العبارة الصحيحة؟`,
            options: ['¡Me flipa el ambiente!', 'Disculpa, ¿dónde está el baño?', 'Un café solo, por favor', 'Hasta mañana a primera hora'],
            correctAnswer: '¡Me flipa el ambiente!',
            explanation_en: '"¡Me flipa el ambiente!" expresses enthusiastic appreciation of the vibe.',
            explanation_ar: '"¡Me flipa el ambiente!" تعبر عن الإعجاب الشديد بالأجواء.'
          }
        );
      }
    }

    lessons.push({
      id: lessonId,
      unitId: unitId,
      lessonNumber: i,
      title_es: title_es,
      title_en: title_en,
      title_ar: title_ar,
      cefr: level,
      objectives_en: objectives_en,
      objectives_ar: objectives_ar,
      vocabWordIds: ['comida', 'gracias', 'amigo', 'ayuda'],
      dialogue: dialogue,
      exercises: exercises,
      productionPrompt: {
        prompt_en: `Write 3 practical sentences based on the communication objective of '${title_en}'.`,
        prompt_ar: `اكتب 3 جمل مفيدة مستندة إلى الهدف الحواري لدرس '${title_en}'.`,
        minSentences: 3,
        sampleTarget: 'Hola, buenas tardes. ¿Me pones un café por favor? Muchas gracias por la ayuda.'
      }
    });
  }

  return lessons;
}

// Build Level A1 Units: 16 Units, exactly 81 lessons in total
export const A1_CURRICULUM_UNITS: Unit[] = [];

// Base structure mapping for Level A1 units
const a1ThematicUnits = [
  { unitNumber: 1, title_es: 'Saludos y Primeros Contactos en la Calle', title_en: 'Greetings & Icebreakers', title_ar: 'التحيات وأول اللقاءات في الشارع', lessonsCount: 5 },
  { unitNumber: 2, title_es: 'Identidad Social y Registro de Supervivencia', title_en: 'Personal Info & Registration', title_ar: 'المعلومات الشخصية والتسجيل', lessonsCount: 5 },
  { unitNumber: 3, title_es: 'Relaciones de Confianza y Amigos de Viaje', title_en: 'Family & Travel Friends', title_ar: 'العلاقات والأصدقاء والأسرة', lessonsCount: 5 },
  { unitNumber: 4, title_es: 'Búsqueda de Alojamiento y Recorrer Pisos', title_en: 'Home & Rental Survival', title_ar: 'البحث عن سكن وإيجاد شقة', lessonsCount: 5 },
  { unitNumber: 5, title_es: 'Objetos Clave y Hacks Diarios', title_en: 'Everyday Objects & Hacks', title_ar: 'الأشياء اليومية والحلول الذكية', lessonsCount: 5 },
  { unitNumber: 6, title_es: 'Compras en el Supermercado y Fruterías', title_en: 'Markets & Fresh Food', title_ar: 'الأسواق وشراء المنتجات الغذائية', lessonsCount: 5 },
  { unitNumber: 7, title_es: 'Restaurantes y Cafeterías del Barrio', title_en: 'Restaurants & Cafés', title_ar: 'المطاعم والمقاهي المحلية', lessonsCount: 5 },
  { unitNumber: 8, title_es: 'Manejo del Tiempo y Quedar con Amigos', title_en: 'Time, Dates & Meetups', title_ar: 'إدارة الوقت واللقاءات الاجتماعية', lessonsCount: 5 },
  { unitNumber: 9, title_es: 'Rutina Diaria de un Nómada Digital', title_en: 'Daily Routines', title_ar: 'الروتين اليومي للحياة الحضرية', lessonsCount: 5 },
  { unitNumber: 10, title_es: 'Educación y Sobrevivir en Clases de Español', title_en: 'Studies & Classroom Survival', title_ar: 'الدراسة والنجاة في فصول اللغة', lessonsCount: 5 },
  { unitNumber: 11, title_es: 'Mundo Laboral y Videollamadas de Trabajo', title_en: 'Jobs & Professions', title_ar: 'العمل والوظائف والاتصالات المهنية', lessonsCount: 5 },
  { unitNumber: 12, title_es: 'De Compras por Boutiques sin que te Vendan', title_en: 'Shopping Clothes & Sizes', title_ar: 'التسوق واختيار المقاسات وتجنب البائعين', lessonsCount: 5 },
  { unitNumber: 13, title_es: 'Precios, Monedas y Cambiar Divisas', title_en: 'Money, Prices & Bargaining', title_ar: 'المال، الأسعار والتفاوض بلباقة', lessonsCount: 5 },
  { unitNumber: 14, title_es: 'Estilo Personal y Conseguir un Abrigo', title_en: 'Personal Style & Clothing', title_ar: 'الأناقة الشخصية وشراء معطف الشتاء', lessonsCount: 5 },
  { unitNumber: 15, title_es: 'Salud Básica y Comprar en Farmacias', title_en: 'Body & Pharmacy Emergencies', title_ar: 'الصحة الأساسية والتعامل مع الصيدليات', lessonsCount: 5 },
  { unitNumber: 16, title_es: 'Transporte Urbano y Proyecto de Viaje A1', title_en: 'Urban Transit & Capstone A1', title_ar: 'المواصلات الحضرية ومشروع تخرج A1 الأكبر', lessonsCount: 6 } // Exactly 15*5 + 6 = 81 lessons!
];

a1ThematicUnits.forEach(unit => {
  const unitId = `unit-a1-${unit.unitNumber}`;
  const lessons = generateLessons('A1', unit.unitNumber, unit.lessonsCount);

  // For Unit 1 and Unit 2, enrich with the rich custom lesson specifications above
  if (unit.unitNumber === 1 && a1Specs[0]) {
    a1Specs[0].lessons.forEach((les, idx) => {
      if (lessons[idx]) {
        lessons[idx].title_es = les.title_es;
        lessons[idx].title_en = les.title_en;
        lessons[idx].title_ar = les.title_ar;
        lessons[idx].objectives_en = les.objectives_en;
        lessons[idx].objectives_ar = les.objectives_ar;
        lessons[idx].dialogue = les.dialogue;
        if (les.exercises) {
          lessons[idx].exercises = les.exercises.map(ex => ({
            id: (ex as any).id || `ex-a1-1-${les.lessonNumber}`,
            type: ex.type as ExerciseType,
            prompt_es: ex.prompt_es,
            prompt_en: ex.prompt_en,
            prompt_ar: ex.prompt_ar,
            options: ex.options,
            correctAnswer: ex.correctAnswer,
            explanation_en: ex.explanation_en,
            explanation_ar: ex.explanation_ar
          }));
        }
      }
    });
  } else if (unit.unitNumber === 2 && a1Specs[1]) {
    a1Specs[1].lessons.forEach((les, idx) => {
      if (lessons[idx]) {
        lessons[idx].title_es = les.title_es;
        lessons[idx].title_en = les.title_en;
        lessons[idx].title_ar = les.title_ar;
        lessons[idx].objectives_en = les.objectives_en;
        lessons[idx].objectives_ar = les.objectives_ar;
        lessons[idx].dialogue = les.dialogue;
      }
    });
  }

  // Set the final capstone project at the absolute end of Level A1
  if (unit.unitNumber === 16) {
    const lastLessonIdx = lessons.length - 1;
    lessons[lastLessonIdx].title_es = 'Reto Capstone: El Diario del Viajero A1';
    lessons[lastLessonIdx].title_en = 'Capstone Project: Traveler\'s Diary A1';
    lessons[lastLessonIdx].title_ar = 'مشروع تخرج المستوى الأول: مذكرات المسافر A1';
    lessons[lastLessonIdx].objectives_en = ['Synthesize all survival A1 skills in a comprehensive autobiographical travel piece', 'Draft a high-stakes, real-world narrative detailing trip hacks, routes, and food orders'];
    lessons[lastLessonIdx].objectives_ar = ['دمج كل مهارات البقاء للمستوى A1 في قطعة مذكرات سفر شاملة', 'كتابة نص حواري حقيقي يفصل حيل السفر، خطوط السير، وطلب الوجبات المحلية'];
    lessons[lastLessonIdx].productionPrompt = {
      prompt_en: 'Write your comprehensive traveler diary entry (at least 5 sentences) describing arriving at a Spanish hostel, ordering street food, buying transport tickets, and talking to locals.',
      prompt_ar: 'اكتب مذكرات سفرك الشاملة (5 جمل على الأقل) تصف فيها وصولك لنزل إسباني، طلب طعام الشارع، شراء تذاكر المواصلات، والحديث مع السكان المحليين بطلاقة.',
      minSentences: 5,
      sampleTarget: 'Hola, hoy he llegado al Hostal Central de Madrid y he registrado mi entrada en recepción. Después fui al metro y saqué una tarjeta de diez viajes para moverme por el centro. Comí unos deliciosos tacos en el mercado de San Miguel y le pedí sugerencias al taquero. Por la tarde quedé con mi amigo Alejandro para tomar un cortado y practicar conversación. ¡Estoy súper feliz con mi viaje y hablo español con total seguridad todos los días!'
    };
  }

  A1_CURRICULUM_UNITS.push({
    id: unitId,
    level: 'A1',
    unitNumber: unit.unitNumber,
    title_es: unit.title_es,
    title_en: unit.title_en,
    title_ar: unit.title_ar,
    description_en: unit.title_en + ' - Master essential everyday collocations and communicative survival scripts.',
    description_ar: unit.title_ar + ' - إتقان التراكيب اليومية الأساسية ونصوص حوار النجاة للتحدث بطلاقة.',
    lessons: lessons
  });
});


// Build Level A2 Units: 12 Units, exactly 61 lessons in total
export const A2_CURRICULUM_UNITS: Unit[] = [];

// Base structure mapping for Level A2 units (Units 17 to 28)
const a2ThematicUnits = [
  { unitNumber: 17, title_es: 'Misión: Problemas de Viaje y Pérdidas', title_en: 'Travel Problems & Disputes', title_ar: 'مشكلات السفر والمطالبات وحل الخلافات', lessonsCount: 5 },
  { unitNumber: 18, title_es: 'Gestión de Hoteles, Hostales y Reservas Inteligentes', title_en: 'Hotels & Smart Accommodation', title_ar: 'حجوزات السكن وإجراءات الدخول الذكية', lessonsCount: 5 },
  { unitNumber: 19, title_es: 'Turismo Extremo, Visitas y Secretos Locales', title_en: 'Tourism & Hidden Hotspots', title_ar: 'السياحة والاستكشاف والبحث عن الأماكن المخفية', lessonsCount: 5 },
  { unitNumber: 20, title_es: 'Negociaciones Profesionales y Conflictos Laborales', title_en: 'Workplace & Business Debates', title_ar: 'العمل والمفاوضات المهنية وحل النزاعات الوظيفية', lessonsCount: 5 },
  { unitNumber: 21, title_es: 'Salud, Citas Médicas y Urgencias de Bienestar', title_en: 'Health Emergencies & Clinic Appointments', title_ar: 'الرعاية الطبية والمواعيد وطوارئ الصحة', lessonsCount: 5 },
  { unitNumber: 22, title_es: 'Gastronomía Avanzada y la Receta de la Abuela', title_en: 'Cooking & Regional Gastronomy', title_ar: 'فن الطهي ووصفات الطبخ والمأكولات الإقليمية', lessonsCount: 5 },
  { unitNumber: 23, title_es: 'Tecnología, Aplicaciones y Desbloquear Servicios', title_en: 'Apps, Technology & Digital Nomad Hacks', title_ar: 'التكنولوجيا، التطبيقات، وإلغاء قفل الخدمات الحضرية', lessonsCount: 5 },
  { unitNumber: 24, title_es: 'Anomalías del Clima, Excursiones y Naturaleza', title_en: 'Weather, Nature & Environment', title_ar: 'الطقس والمناخ والمحميات الطبيعية والرحلات', lessonsCount: 5 },
  { unitNumber: 25, title_es: 'Inmersión en Fiestas del Barrio y Tradiciones', title_en: 'Cultural Festivals & Block Parties', title_ar: 'الانغماس في احتفالات الحي والتقاليد التراثية', lessonsCount: 5 },
  { unitNumber: 26, title_es: 'Compartir Sentimientos, Historias de Infancia y Sueños', title_en: 'Emotions, Childhood Stories & Ambitions', title_ar: 'المشاعر والتعبير عن الطفولة والخطط المستقبلية', lessonsCount: 5 },
  { unitNumber: 27, title_es: 'Conversaciones en la Plaza: Debates y Opiniones', title_en: 'Plaza Debates & Social Discussions', title_ar: 'النقاشات الحرة في الساحات وإبداء الآراء والمواقف', lessonsCount: 5 },
  { unitNumber: 28, title_es: 'Trámites de Mudanza, Empadronamiento y Despedida A2', title_en: 'Everyday Bureaucracy & Capstone A2', title_ar: 'المعاملات الحضرية الرسمية ومشروع تخرج A2 الأكبر', lessonsCount: 6 } // Exactly 11*5 + 6 = 61 lessons!
];

a2ThematicUnits.forEach(unit => {
  const unitId = `unit-a2-${unit.unitNumber}`;
  const lessons = generateLessons('A2', unit.unitNumber, unit.lessonsCount);

  // For Unit 17, enrich with the rich custom lost luggage specifications above
  if (unit.unitNumber === 17 && a2Specs[0]) {
    a2Specs[0].lessons.forEach((les, idx) => {
      if (lessons[idx]) {
        lessons[idx].title_es = les.title_es;
        lessons[idx].title_en = les.title_en;
        lessons[idx].title_ar = les.title_ar;
        lessons[idx].objectives_en = les.objectives_en;
        lessons[idx].objectives_ar = les.objectives_ar;
        lessons[idx].dialogue = les.dialogue;
        if (les.exercises) {
          lessons[idx].exercises = les.exercises.map(ex => ({
            id: (ex as any).id || `ex-a2-17-${les.lessonNumber}`,
            type: ex.type as ExerciseType,
            prompt_es: ex.prompt_es,
            prompt_en: ex.prompt_en,
            prompt_ar: ex.prompt_ar,
            options: ex.options,
            correctAnswer: ex.correctAnswer,
            explanation_en: ex.explanation_en,
            explanation_ar: ex.explanation_ar
          }));
        }
      }
    });
  }

  // Set the final A2 capstone project at the absolute end of Level A2
  if (unit.unitNumber === 28) {
    const lastLessonIdx = lessons.length - 1;
    lessons[lastLessonIdx].title_es = 'Reto Capstone: El Cortometraje de mi Nueva Vida A2';
    lessons[lastLessonIdx].title_en = 'Capstone Project: Short Film of My New A2 Life';
    lessons[lastLessonIdx].title_ar = 'مشروع تخرج المستوى الثاني: الفيلم القصير لحياتي الجديدة A2';
    lessons[lastLessonIdx].objectives_en = ['Synthesize Level A2 milestones in a rich, multi-paragraph travel and life portfolio', 'Narrate complex past experiences and project future desires with excellent cohesion'];
    lessons[lastLessonIdx].objectives_ar = ['دمج كل إنجازات المستوى A2 في نص سيرة ومحطات حياة ثري ومتعدد الفقرات', 'سرد خبرات الماضي المعقدة والتعبير عن الخطط المستقبلية بترابط لغوي ممتاز'];
    lessons[lastLessonIdx].productionPrompt = {
      prompt_en: 'Write your comprehensive A2 Capstone Portfolio (at least 6 sentences) detailing a rental negotiation, resolving a household dispute, ordering slow-cooked regional food, and sharing local legends.',
      prompt_ar: 'اكتب مقال تخرج المستوى A2 الشامل (6 جمل على الأقل) تصف فيها تفاوضاً على الإيجار، حل مشكلة منزلية، طلب طعام محلي، وسرد بعض أساطير الحي بطلاقة.',
      minSentences: 6,
      sampleTarget: 'Durante mi estancia en Coyoacán, negocié un alquiler porque ochocientos euros me parecía un precio excesivo y el casero lo bajó a setecientos cincuenta. Un día la calefacción no funcionaba y le exigí una solución rápida para evitar el frío. Me encantaba comer mole poblano en la taquería de la esquina y el mesero me explicó que llevaba más de veinte ingredientes. Por las noches charlaba con los vecinos en la plaza y me contaban leyendas misteriosas sobre fantasmas antiguos de la calle. He aprendido a resolver cualquier problema de la vida diaria en español. ¡Espero seguir creciendo con la misma pasión en el nivel B1!'
    };
  }

  A2_CURRICULUM_UNITS.push({
    id: unitId,
    level: 'A2',
    unitNumber: unit.unitNumber,
    title_es: unit.title_es,
    title_en: unit.title_en,
    title_ar: unit.title_ar,
    description_en: unit.title_en + ' - Deepen your communication hacks, debate viewpoints, and handle bureaucratic relocation steps.',
    description_ar: unit.title_ar + ' - تعميق حيل التواصل والقدرة على النقاش وإتمام المعاملات الرسمية والمMudanza.',
    lessons: lessons
  });
});
