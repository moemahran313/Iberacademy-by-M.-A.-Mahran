import { Unit, Lesson, ExerciseType } from '../../types';

export const A1_EXPANDED_SURVIVAL_UNITS: Unit[] = [];


const specs = [
  {
    unitNumber: 15,
    title_es: 'Misión: El Mercado y Comida Callejera',
    title_en: 'Mission: Markets & Street Food',
    title_ar: 'مهمة: الأسواق وطعام الشارع',
    description_en: 'Master survival chunks for ordering food like a local, requesting recommendations, and dealing with street market pricing.',
    description_ar: 'إتقان تراكيب البقاء لطلب الطعام كالسكان المحليين، طلب التوصيات، والتعامل مع تسعير أسواق الشوارع.',
    lessons: [
      {
        lessonNumber: 1,
        title_es: 'Pedir Tacos: "¿De qué me recomiendas?"',
        title_en: 'Ordering Tacos: "What do you recommend?"',
        title_ar: 'طلب التاكو: "بماذا تنصحني؟"',
        objectives_en: ['Request local street food recommendations', 'Understand meat and vegetarian fillings', 'Specify spice level preferences'],
        objectives_ar: ['طلب توصيات طعام الشارع المحلي', 'فهم حشوات اللحوم والنباتية', 'تحديد درجة حرارة البهارات المفضلة'],
        vocabWordIds: ['comida', 'recomendar', 'gustar', 'sabor', 'picante'],
        dialogue: [
          { speaker: 'Karim', es: 'Hola, buenas tardes. ¿De qué me recomiendas hoy?', en: 'Hello, good afternoon. What do you recommend today?', ar: 'مرحباً، مساء الخير. بماذا تنصحني اليوم؟' },
          { speaker: 'Taquero', es: '¡Qué onda, amigo! Los de pastor y los de asada son la especialidad. ¿Te pongo tres?', en: 'What\'s up, friend! The pastor and asada are the specialty. Shall I get you three?', ar: 'أهلاً بصاحبي! تاكو باستور وأسادا هما التخصص. هل أضع لك ثلاثة؟' },
          { speaker: 'Karim', es: 'Sí, por favor. Pero sin picante, que me pica mucho.', en: 'Yes, please. But no spicy sauce, it\'s too hot for me.', ar: 'نعم، من فضلك. ولكن بدون بهارات حارة، فهي حارة جداً بالنسبة لي.' }
        ],
        exercises: [
          {
            id: 'ex-a1-15-1-1',
            type: 'multiple_choice',
            prompt_es: '¿Qué significa "¿De qué me recomiendas?"?',
            prompt_en: 'What does "¿De qué me recomiendas?" mean?',
            prompt_ar: 'ماذا تعني عبارة "¿De qué me recomiendas?"؟',
            options: ['What do you recommend?', 'How much does it cost?', 'Where is the bathroom?', 'I do not want tacos'],
            correctAnswer: 'What do you recommend?',
            explanation_en: 'This is a highly useful conversational chunk to ask for suggestions.',
            explanation_ar: 'هذا تركيب حواري مفيد للغاية لطلب الاقتراحات والتوصيات.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence interaction ordering street tacos and asking for a non-spicy recommendation.',
          prompt_ar: 'اكتب محادثة من 3 جمل تطلب فيها تاكو من الشارع وتطلب توصية غير حارة.',
          minSentences: 3,
          sampleTarget: 'Hola, ¿de qué me recomiendas hoy? Los tacos de asada no pican nada. Excelente, ponme tres de asada por favor.'
        }
      },
      {
        lessonNumber: 2,
        title_es: 'En el Mercado: "Ponme un kilo de..."',
        title_en: 'At the Market: "Give me a kilo of..."',
        title_ar: 'في السوق: "ضع لي كيلوغراماً من..."',
        objectives_en: ['Use "ponme" to order produce colloquially', 'Ask for prices per kilo', 'Handle weight measurements'],
        objectives_ar: ['استخدام "ponme" لطلب الخضار والفاكهة بأسلوب محلي', 'السؤال عن الأسعار لكل كيلو', 'التعامل مع مقاييس الوزن'],
        vocabWordIds: ['comprar', 'fruta', 'precio', 'kilo', 'dar'],
        dialogue: [
          { speaker: 'Estudiante', es: 'Hola, ¿a cómo están los tomates hoy?', en: 'Hello, how much are the tomatoes today?', ar: 'مرحباً، بكم الطماطم اليوم؟' },
          { speaker: 'Vendedor', es: 'Están a dos euros el kilo. Están súper frescos.', en: 'They are two euros a kilo. They are super fresh.', ar: 'بيوروين للكيلوغرام. إنها طازجة وممتازة.' },
          { speaker: 'Estudiante', es: 'Perfecto, ponme un kilo de tomates y medio kilo de limones.', en: 'Perfect, give me a kilo of tomatoes and half a kilo of lemons.', ar: 'ممتاز، ضع لي كيلو طماطم ونصف كيلو ليمون.' }
        ],
        exercises: [
          {
            id: 'ex-a1-15-2-1',
            type: 'fill_blank',
            prompt_es: 'Completa para pedir un kilo: "Por favor, ______ un kilo de naranjas."',
            prompt_en: 'Complete to order a kilo: "Please, ______ un kilo de naranjas."',
            prompt_ar: 'أكمل لطلب كيلو: "من فضلك، ______ كيلو برتقال."',
            options: ['ponme', 'tengo', 'hablo', 'vuelo'],
            correctAnswer: 'ponme',
            explanation_en: '"Ponme" is a native conversational chunk meaning "put/give me" when ordering.',
            explanation_ar: '"Ponme" هو تركيب حواري محلي شائع يعني "ضع لي / أعطني" عند طلب السلع.'
          }
        ]
      },
      {
        lessonNumber: 3,
        title_es: 'La Cuenta: "¿Cuánto te debo?"',
        title_en: 'The Bill: "How much do I owe you?"',
        title_ar: 'الحساب: "كم أدين لك؟"',
        objectives_en: ['Ask for the bill using native phrases', 'Inquire about payment methods', 'Calculate tips and totals'],
        objectives_ar: ['طلب الفاتورة باستخدام جمل محلية', 'الاستفسار عن طرق الدفع المقبولة', 'حساب البقشيش والإجمالي'],
        vocabWordIds: ['pagar', 'cuenta', 'dinero', 'tarjeta', 'deber'],
        dialogue: [
          { speaker: 'Cliente', es: 'Disculpa, ¿me cobras cuando puedas? ¿Cuánto te debo?', en: 'Excuse me, can you bill me when you can? How much do I owe you?', ar: 'لو سمحت، هل تحاسبني عندما تستطيع؟ كم أدين لك؟' },
          { speaker: 'Mesero', es: 'Son quince euros en total. ¿Pagas con tarjeta o en efectivo?', en: 'It is fifteen euros in total. Are you paying with card or cash?', ar: 'الحساب خمسة عشر يورو إجمالاً. هل تدفع بالبطاقة أم نقداً؟' },
          { speaker: 'Cliente', es: 'Con tarjeta, por favor. Quédate con el cambio.', en: 'With card, please. Keep the change.', ar: 'بالبطاقة، من فضلك. احتفظ بالباقي كبقشيش.' }
        ]
      },
      {
        lessonNumber: 4,
        title_es: 'Misión Cafetería: "Un cortado con leche fría"',
        title_en: 'Café Mission: "A cortado with cold milk"',
        title_ar: 'مهمة المقاهي: "قهوة كورتادو بحليب بارد"',
        objectives_en: ['Order coffee like a native Spaniard', 'Specify milk temperatures and sweetness', 'Ask for breakfast pastries'],
        objectives_ar: ['طلب القهوة كالمحليين في إسبانيا', 'تحديد درجة حرارة الحليب والمحليات', 'طلب معجنات الإفطار التقليدية'],
        vocabWordIds: ['café', 'leche', 'azúcar', 'desayuno', 'caliente'],
        dialogue: [
          { speaker: 'Cliente', es: 'Buenas, me pones un cortado con la leche fría, por favor.', en: 'Hi, get me a cortado with cold milk, please.', ar: 'مرحباً، ضع لي قهوة كورتادو بحليب بارد، من فضلك.' },
          { speaker: 'Camarero', es: '¡Marchando! ¿Quieres azúcar o sacarina? ¿Algo para comer?', en: 'Coming up! Do you want sugar or sweetener? Anything to eat?', ar: 'حاضر! هل تريد سكراً أم محلياً صناعياً؟ هل تريد شيئاً لتأكله؟' },
          { speaker: 'Cliente', es: 'Con azúcar. Y ponme también un croissant de mantequilla.', en: 'With sugar. And also give me a butter croissant.', ar: 'بالسكر. وضع لي أيضاً كرواسون بالزبدة.' }
        ]
      }
    ]
  },
  {
    unitNumber: 16,
    title_es: 'Misión: Supervivencia Urbana y Transporte',
    title_en: 'Mission: Urban Survival & Transport',
    title_ar: 'مهمة: النجاة في المدينة والمواصلات',
    description_en: 'Navigate subway ticket machines, direct taxi drivers with precise chunks, and handle bicycle rentals.',
    description_ar: 'تصفح آلات تذاكر المترو، توجيه سائقي التاكسي بجمل دقيقة، والتعامل مع استئجار الدراجات العامة.',
    lessons: [
      {
        lessonNumber: 1,
        title_es: 'El Metro: "Saca un billete de diez viajes"',
        title_en: 'The Subway: "Get a 10-trip ticket"',
        title_ar: 'المترو: "احصل على تذكرة العشر رحلات"',
        objectives_en: ['Buy transit passes from ticket machines', 'Ask for subway directions and platforms', 'Understand transit notifications'],
        objectives_ar: ['شراء بطاقات العبور من آلات التذاكر', 'السؤال عن اتجاهات المترو والأرصفة', 'فهم تنبيهات حركة المرور والنقل'],
        vocabWordIds: ['viaje', 'tren', 'estacion', 'salida', 'entrar'],
        dialogue: [
          { speaker: 'Pasajero', es: 'Hola, ¿dónde puedo comprar la tarjeta de diez viajes?', en: 'Hello, where can I buy the 10-trip card?', ar: 'مرحباً، أين يمكنني شراء بطاقة العشر رحلات؟' },
          { speaker: 'Agente', es: 'En las máquinas rojas de ahí. Cuesta doce euros más el plástico.', en: 'In the red machines over there. It costs twelve euros plus the plastic.', ar: 'في تلك الآلات الحمراء هناك. تكلفتها 12 يورو بالإضافة لثمن البطاقة البلاستيكية.' },
          { speaker: 'Pasajero', es: 'Perfecto, gracias. ¿Esta línea va directa al centro?', en: 'Perfect, thank you. Does this line go directly to the center?', ar: 'ممتاز، شكراً. هل هذا الخط يذهب مباشرة إلى وسط المدينة؟' }
        ]
      },
      {
        lessonNumber: 2,
        title_es: 'Perdido en el Barrio: "¿Por dónde se va a...?"',
        title_en: 'Lost in the Quarter: "How do you get to...?"',
        title_ar: 'تائه في الحي: "من أين نذهب إلى...؟"',
        objectives_en: ['Ask for directions using native patterns', 'Identify local city landmarks', 'Understand left, right, and straight instructions'],
        objectives_ar: ['السؤال عن الاتجاهات باستخدام الأنماط المحلية', 'التعرف على معالم المدينة الشهيرة', 'فهم توجيهات اليمين واليسار والسير للأمام'],
        vocabWordIds: ['calle', 'mapa', 'ayuda', 'derecha', 'izquierda'],
        dialogue: [
          { speaker: 'Perdido', es: 'Perdona, me he perdido. ¿Por dónde se va a la Plaza Mayor?', en: 'Excuse me, I\'m lost. How do you get to Plaza Mayor?', ar: 'عذراً، لقد تهت. من أين نذهب إلى الساحة الكبرى (Plaza Mayor)؟' },
          { speaker: 'Vecina', es: 'Sigue recto por esta calle y gira a la derecha en la farmacia.', en: 'Go straight along this street and turn right at the pharmacy.', ar: 'واصل السير مستقيماً في هذا الشارع وانعطف يميناً عند الصيدلية.' },
          { speaker: 'Perdido', es: '¿Está lejos caminando?', en: 'Is it far walking?', ar: 'هل هي بعيدة سيراً على الأقدام؟' }
        ]
      },
      {
        lessonNumber: 3,
        title_es: 'Tomar un Taxi: "Déjame en la esquina"',
        title_en: 'Taking a Taxi: "Drop me at the corner"',
        title_ar: 'ركوب التاكسي: "أنزلني عند المنعطف"',
        objectives_en: ['Direct taxi drivers with specific landmarks', 'Instruct drivers to stop or drop you off', 'Verify fares and receipts'],
        objectives_ar: ['توجيه سائقي التاكسي بمعالم محددة', 'توجيه السائق للتوقف أو إنزالك', 'التحقق من الأجرة والحصول على إيصالات الدفع'],
        vocabWordIds: ['bajar', 'parar', 'coche', 'esquina', 'rapido'],
        dialogue: [
          { speaker: 'Pasajero', es: 'Buenas, vamos a la calle Gran Vía, número cuarenta.', en: 'Hello, we are going to Gran Via street, number 40.', ar: 'مرحباً، سنذهب إلى شارع غران فيا، رقم 40.' },
          { speaker: 'Taxista', es: 'Muy bien. ¿Quiere que vaya por el túnel para evitar el tráfico?', en: 'Very well. Do you want me to go through the tunnel to avoid traffic?', ar: 'حسن جداً. هل تريدني أن أسلك النفق لتجنب الازدحام؟' },
          { speaker: 'Pasajero', es: 'Sí, por favor. Déjame en la esquina de la farmacia.', en: 'Yes, please. Drop me at the corner of the pharmacy.', ar: 'نعم، من فضلك. أنزلني عند منعطف الصيدلية.' }
        ]
      },
      {
        lessonNumber: 4,
        title_es: 'Alquiler de Bici: "Desbloquear una bici"',
        title_en: 'Bike Rental: "Unlocking a bike"',
        title_ar: 'استئجار الدراجات: "إلغاء قفل الدراجة"',
        objectives_en: ['Understand app bike rental instructions', 'Inquire about bike lanes and safety rules', 'Report locked or broken bikes'],
        objectives_ar: ['فهم تعليمات استئجار الدراجات عبر التطبيقات', 'الاستفسar عن مسارات الدراجات وقواعد السلامة', 'الإبلاغ عن الدراجات المقفلة أو المعطلة'],
        vocabWordIds: ['usar', 'parque', 'seguro', 'ciudad', 'estacion'],
        dialogue: [
          { speaker: 'Cliente', es: 'Hola, ¿cómo hago para desbloquear la bicicleta pública?', en: 'Hello, how do I unlock the public bicycle?', ar: 'مرحباً، كيف يمكنني إلغاء قفل الدراجة الهوائية العامة؟' },
          { speaker: 'Ayudante', es: 'Tienes que descargar la app, escanear el código QR y listo.', en: 'You have to download the app, scan the QR code and that\'s it.', ar: 'يجب عليك تحميل التطبيق، مسح رمز الـ QR وكل شيء جاهز.' },
          { speaker: 'Cliente', es: '¡Qué fácil! ¿Hay carril bici para ir al retiro?', en: 'How easy! Is there a bike lane to go to El Retiro?', ar: 'ما أسهل هذا! هل هناك مسار دراجات للذهاب إلى حديقة الريتيرو؟' }
        ]
      }
    ]
  },
  {
    unitNumber: 17,
    title_es: 'Misión: El Arte del Regateo y las Compras',
    title_en: 'Mission: The Art of Bargaining & Shopping',
    title_ar: 'مهمة: فن الفصال والتسوق',
    description_en: 'Bargain politely at street flea markets, request sizes in clothing stores, and handle exchanges.',
    description_ar: 'الفصال والمساومة بلباقة في أسواق السلع المستعملة، طلب المقاسات في محلات الملابس، والتعامل مع التبديل والاسترجاع.',
    lessons: [
      {
        lessonNumber: 1,
        title_es: 'El Rastro: "Hazme una rebajita"',
        title_en: 'The Flea Market: "Give me a small discount"',
        title_ar: 'سوق السلع المستعملة: "اعمل لي تخفيضاً بسيطاً"',
        objectives_en: ['Negotiate prices politely in flea markets', 'Use "rebaja" and "descuento" appropriately', 'Express hesitation or walking away'],
        objectives_ar: ['تفاوض على الأسعار بلباقة في أسواق الشوارع', 'استخدام مصطلحات التخفيض والخصم بشكل مناسب', 'التعبير عن التردد أو التلميح بالمغادرة'],
        vocabWordIds: ['comprar', 'barato', 'precio', 'gastar', 'dar'],
        dialogue: [
          { speaker: 'Comprador', es: 'Hola, ¿cuánto cuesta este cuadro antiguo?', en: 'Hello, how much is this antique painting?', ar: 'مرحباً، بكم هذه اللوحة القديمة؟' },
          { speaker: 'Vendedor', es: 'Para ti, son cincuenta euros. Es una pieza única.', en: 'For you, it\'s fifty euros. It\'s a unique piece.', ar: 'لك أنت، بخمسين يورو. إنها قطعة فريدة.' },
          { speaker: 'Comprador', es: 'Uf, es un poco caro. Si me haces una rebajita, me lo llevo ahora.', en: 'Uf, that\'s a bit expensive. If you give me a small discount, I\'ll take it now.', ar: 'أوف، غالية بعض الشيء. إذا عملت لي تخفيضاً بسيطاً، سآخذها الآن.' }
        ]
      },
      {
        lessonNumber: 2,
        title_es: 'Buscando Ropa: "¿Tiene una talla más?"',
        title_en: 'Looking for Clothes: "Do you have a size larger?"',
        title_ar: 'البحث عن ملابس: "هل لديك مقاس أكبر؟"',
        objectives_en: ['Ask shop assistants for alternative sizes and colors', 'Locate and use the fitting rooms', 'Describe tight or loose clothing fit'],
        objectives_ar: ['سؤال البائعين عن مقاسات وألوان بديلة', 'تحديد مكان واستخدام غرف قياس الملابس', 'وصف ملاءمة الملابس الضيقة أو الواسعة'],
        vocabWordIds: ['camisa', 'pantalon', 'vestido', 'probar', 'grande'],
        dialogue: [
          { speaker: 'Cliente', es: 'Disculpe, me he probado estos pantalones pero me quedan estrechos. ¿Tiene una talla más?', en: 'Excuse me, I tried these pants on but they are too tight. Do you have a size larger?', ar: 'لو سمحت، لقد قست هذا البنطال ولكنه ضيق علي. هل لديك مقاس أكبر؟' },
          { speaker: 'Dependiente', es: 'Sí, claro. Aquí tiene la talla cuarenta y dos. Los probadores están al fondo.', en: 'Yes, of course. Here you have size 42. The fitting rooms are at the back.', ar: 'نعم، بالطبع. تفضل هذا مقاس 42. غرف القياس في نهاية الممر.' },
          { speaker: 'Cliente', es: 'Gracias, voy a probármelos.', en: 'Thank you, I am going to try them on.', ar: 'شكراً، سأذهب لأقيسهم.' }
        ]
      },
      {
        lessonNumber: 3,
        title_es: 'Cambios: "Quiero cambiar esto"',
        title_en: 'Exchanges: "I want to exchange this"',
        title_ar: 'التبديل: "أريد تبديل هذا الشيء"',
        objectives_en: ['Explain reasons for returning or exchanging items', 'Request cash refunds or vouchers', 'Present purchase receipts'],
        objectives_ar: ['شرح أسباب إرجاع أو تبديل السلع', 'طلب استرداد النقود أو الحصول على قسيمة شراء', 'تقديم إيصالات الشراء والفواتير'],
        vocabWordIds: ['dinero', 'comprar', 'cambiar', 'recibir', 'ticket'],
        dialogue: [
          { speaker: 'Cliente', es: 'Hola, buenas tardes. Quiero cambiar esta camisa. Fue un regalo pero no es mi color.', en: 'Hello, good afternoon. I want to exchange this shirt. It was a gift but it is not my color.', ar: 'مرحباً، مساء الخير. أريد تبديل هذا القميص. لقد كان هدية ولكنه ليس لوني المفضل.' },
          { speaker: 'Cajera', es: 'Sin problema. ¿Tiene el ticket de compra o de regalo?', en: 'No problem. Do you have the purchase or gift receipt?', ar: 'لا توجد مشكلة. هل لديك إيصال الشراء أو إيصال الهدية؟' },
          { speaker: 'Cliente', es: 'Sí, aquí tiene el ticket. Quiero cambiarlo por esa de color azul.', en: 'Yes, here is the receipt. I want to exchange it for that blue one.', ar: 'نعم، تفضلي الإيصال. أريد تبديله بذلك القميص ذي اللون الأزرق.' }
        ]
      },
      {
        lessonNumber: 4,
        title_es: 'Boutique: "Solo estoy mirando, gracias"',
        title_en: 'Boutique: "Just looking, thank you"',
        title_ar: 'البوتيك: "أنا أتفرج فقط، شكراً لك"',
        objectives_en: ['Politely decline aggressive shop assistance', 'Inquire about current store promotions and sales', 'Ask if items are on sale'],
        objectives_ar: ['الاعتذار بلباقة من المساعدة الملحّة للبائعين', 'الاستفسار عن العروض والتخفيضات الحالية في المتجر', 'السؤال عما إذا كانت القطعة مشمولة بالتخفيضات'],
        vocabWordIds: ['ver', 'entrar', 'gracias', 'tienda', 'buscar'],
        dialogue: [
          { speaker: 'Dependiente', es: 'Hola, buenas. ¿Buscas algo en especial? Te puedo ayudar.', en: 'Hello, hi. Are you looking for anything in particular? I can help you.', ar: 'مرحباً، أهلاً بك. هل تبحث عن شيء معين؟ يمكنني مساعدتك.' },
          { speaker: 'Cliente', es: 'Hola, muchas gracias. Solo estoy mirando, si necesito algo te aviso.', en: 'Hello, thank you very much. I am just looking, if I need anything I\'ll let you know.', ar: 'مرحباً، شكراً جزيلاً لك. أنا أتفرج فقط، وإذا احتجت شيئاً سأناديك.' },
          { speaker: 'Dependiente', es: 'Perfecto, tómate tu tiempo. Todo lo de esa mesa tiene descuento.', en: 'Perfect, take your time. Everything on that table is discounted.', ar: 'ممتاز، خذ وقتك. كل المعروض على تلك الطاولة مشمول بالخصم.' }
        ]
      }
    ]
  },
  {
    unitNumber: 18,
    title_es: 'Misión: Hospedaje y Check-in Auténtico',
    title_en: 'Mission: Booking & Check-in Hacks',
    title_ar: 'مهمة: حجوزات السكن وإجراءات الدخول الذكية',
    description_en: 'Solve registration issues, secure essential amenities, report room issues, and request luggage storage.',
    description_ar: 'حل مشكلات تسجيل الحجز، تأمين الاحتياجات الأساسية للغرفة، الإبلاغ عن الأعطال، وطلب تخزين الأمتعة.',
    lessons: [
      {
        lessonNumber: 1,
        title_es: 'Check-in: "Tengo una reserva a nombre de..."',
        title_en: 'Check-in: "I have a reservation under..."',
        title_ar: 'تسجيل الدخول: "لدي حجز باسم..."',
        objectives_en: ['Complete check-in procedures fluently', 'Spell names and provide passports', 'Inquire about check-out times'],
        objectives_ar: ['إتمام إجراءات تسجيل الدخول بطلاقة', 'تهجئة الأسماء وتقديم جوازات السفر', 'الاستفسار عن مواعيد المغادرة وتسليم الغرفة'],
        vocabWordIds: ['hotel', 'pasaporte', 'nombre', 'entrar', 'clave'],
        dialogue: [
          { speaker: 'Recepcionista', es: 'Buenas tardes, bienvenido al hostal. ¿Tiene reserva?', en: 'Good afternoon, welcome to the hostel. Do you have a reservation?', ar: 'مساء الخير، أهلاً بك في النزل. هل لديك حجز؟' },
          { speaker: 'Huésped', es: 'Sí, buenas tardes. Tengo una reserva a nombre de Karim Mansour.', en: 'Yes, good afternoon. I have a reservation under the name Karim Mansour.', ar: 'نعم، مساء الخير. لدي حجز باسم كريم منصور.' },
          { speaker: 'Recepcionista', es: 'Perfecto. ¿Me permite su pasaporte para el registro, por favor?', en: 'Perfect. May I have your passport for registration, please?', ar: 'ممتاز. هل تسمح لي بجواز سفرك للتسجيل، من فضلك؟' }
        ]
      },
      {
        lessonNumber: 2,
        title_es: 'Hacks del Hostal: "¿Me das la clave del Wi-Fi?"',
        title_en: 'Hostel Hacks: "Can I have the Wi-Fi password?"',
        title_ar: 'حيل النزل: "هل تعطيني كلمة مرور الواي فاي؟"',
        objectives_en: ['Request internet access details', 'Ask about kitchen access and shared rules', 'Identify communal laundry areas'],
        objectives_ar: ['طلب تفاصيل الدخول إلى شبكة الإنترنت', 'السؤال عن استخدام المطبخ والقواعد المشتركة', 'تحديد مناطق غسيل الملابس المشتركة'],
        vocabWordIds: ['clave', 'cocinar', 'agua', 'limpiar', 'usar'],
        dialogue: [
          { speaker: 'Huésped', es: 'Hola, disculpa. ¿Me das la clave del Wi-Fi? Es que no me conecta.', en: 'Hello, excuse me. Can you give me the Wi-Fi password? It is not connecting.', ar: 'مرحباً، لو سمحت. هل تعطيني كلمة مرور الواي فاي؟ لم يتصل هاتفي بعد.' },
          { speaker: 'Recepcionista', es: 'Claro, la clave está escrita en esta tarjeta. Todo en minúsculas.', en: 'Sure, the password is written on this card. All lowercase.', ar: 'بالتأكيد، كلمة المرور مكتوبة على هذه البطاقة. كلها بحروف صغيرة.' },
          { speaker: 'Huésped', es: 'Genial. ¿Y a qué hora abren la cocina para preparar el desayuno?', en: 'Great. And what time do you open the kitchen to prepare breakfast?', ar: 'رائع. وفي أي ساعة تفتحون المطبخ لتحضير الإفطار؟' }
        ]
      },
      {
        lessonNumber: 3,
        title_es: 'Problemas: "No hay agua caliente"',
        title_en: 'Issues: "There is no hot water"',
        title_ar: 'المشكلات: "لا يوجد ماء ساخن"',
        objectives_en: ['Complain about room plumbing or heating issues', 'Request prompt maintenance visits', 'Request room changes if issues persist'],
        objectives_ar: ['الشكوى من أعطال المياه أو التدفئة في الغرفة', 'طلب زيارة صيانة عاجلة لحل العطل', 'طلب تغيير الغرفة إذا استمرت المشكلة دون حل'],
        vocabWordIds: ['agua', 'caliente', 'frío', 'ayuda', 'malo'],
        dialogue: [
          { speaker: 'Huésped', es: 'Hola, disculpe, tengo un problema en la habitación doscientos tres. No hay agua caliente.', en: 'Hello, excuse me, I have a problem in room 203. There is no hot water.', ar: 'مرحباً، لو سمحت، لدي مشكلة في الغرفة 203. لا يوجد ماء ساخن في الحمام.' },
          { speaker: 'Recepcionista', es: 'Vaya, lo siento mucho. Voy a mandar al técnico de inmediato para revisarlo.', en: 'Oh, I\'m so sorry. I am going to send the technician immediately to check it.', ar: 'يا إلهي، أنا آسف جداً. سأرسل فني الصيانة فوراً للتحقق من الأمر.' },
          { speaker: 'Huésped', es: 'Gracias. Si no funciona rápido, ¿me pueden cambiar de habitación?', en: 'Thank you. If it doesn\'t work quickly, can you change my room?', ar: 'شكراً. إذا لم يتم تصليحه سريعاً، هل يمكنكم تغييري لغرفة أخرى؟' }
        ]
      },
      {
        lessonNumber: 4,
        title_es: 'Check-out: "¿Me guardas el equipaje?"',
        title_en: 'Check-out: "Can you keep my luggage?"',
        title_ar: 'تسجيل المغادرة: "هل تحتفظ بحقائبي مؤقتاً؟"',
        objectives_en: ['Complete check-out billing settlement', 'Request luggage storage while exploring', 'Leave reviews and farewell greetings'],
        objectives_ar: ['تسوية فواتير المغادرة والدفع النهائي', 'طلب تخزين الحقائب مؤقتاً لمواصلة التجول قبل السفر', 'ترك تقييمات إيجابية وعبارات التوديع الحارة'],
        vocabWordIds: ['maleta', 'guardar', 'salir', 'gracias', 'viajar'],
        dialogue: [
          { speaker: 'Huésped', es: 'Hola, quiero hacer el check-out de la habitación ciento cuatro.', en: 'Hello, I want to check out of room 104.', ar: 'مرحباً، أريد تسجيل مغادرة الغرفة 104.' },
          { speaker: 'Recepcionista', es: 'Perfecto. Todo está pagado. ¿Qué tal fue tu estancia con nosotros?', en: 'Perfect. Everything is paid. How was your stay with us?', ar: 'ممتاز. كل شيء مدفوع بالكامل. كيف كانت إقامتك معنا؟' },
          { speaker: 'Huésped', es: 'Increíble. ¿Me guardas el equipaje hasta las cinco? Mi vuelo sale tarde.', en: 'Incredible. Can you store my luggage until five? My flight leaves late.', ar: 'كانت رائعة وممتازة. هل تحتفظ بحقائبي حتى الخامسة عصراً؟ موعد طائرتي متأخر.' }
        ]
      }
    ]
  },
  {
    unitNumber: 19,
    title_es: 'Misión: Conexiones Sociales y Encontrarse',
    title_en: 'Mission: Social Links & Hanging Out',
    title_ar: 'مهمة: الروابط الاجتماعية والتجمع واللقاءات',
    description_en: 'Break the ice with locals, extend casual social invites, arrange coffee meetups, and swap social handles.',
    description_ar: 'كسر الجليد مع السكان المحليين، تقديم دعوات اجتماعية ودية، تنسيق لقاءات المقاهي، وتبادل حسابات التواصل الاجتماعي.',
    lessons: [
      {
        lessonNumber: 1,
        title_es: 'Romper el Hielo: "¿De qué parte eres?"',
        title_en: 'Icebreaker: "Whereabouts are you from?"',
        title_ar: 'كسر الجليد: "من أي مكان أنت تحديداً؟"',
        objectives_en: ['Initiate casual social chats with locals', 'Ask where people are from and what they do', 'Find common baseline topics'],
        objectives_ar: ['بدء محادثات اجتماعية ودية مع السكان المحليين', 'السؤال عن مواطن الناس وأعمالهم اليومية', 'العثور على اهتمامات وموضوعات مشتركة'],
        vocabWordIds: ['nombre', 'amigo', 'vivir', 'estudiar', 'gustar'],
        dialogue: [
          { speaker: 'Estudiante', es: 'Hola, disculpa. ¿De qué parte de España eres?', en: 'Hello, excuse me. What part of Spain are you from?', ar: 'مرحباً، لو سمحت. من أي مكان في إسبانيا أنت؟' },
          { speaker: 'Local', es: 'Soy de Sevilla, pero vivo en Madrid por estudios. ¿Y tú?', en: 'I am from Seville, but I live in Madrid for studies. And you?', ar: 'أنا من إشبيلية، لكني أعيش في مدريد من أجل الدراسة. وأنت؟' },
          { speaker: 'Estudiante', es: 'Soy de El Cairo, estoy aquí aprendiendo español.', en: 'I am from Cairo, I am here learning Spanish.', ar: 'أنا من القاهرة، وأنا هنا لأدرس وأتعلم اللغة الإسبانية.' }
        ]
      },
      {
        lessonNumber: 2,
        title_es: 'Planes de Fiesta: "¿Te hace una caña?"',
        title_en: 'Party Plans: "Are you up for a beer?"',
        title_ar: 'خطط الخروج الحرة: "هل يناسبك شرب كأس قهوة أو عصير؟"',
        objectives_en: ['Use "te hace" to invite people casually', 'Decline or accept social invitations', 'Suggest times and central meeting spots'],
        objectives_ar: ['استخدام تركيب "te hace" لتقديم دعوات غير رسمية ومحببة', 'قبول أو رفض الدعوات الاجتماعية بمرونة وسهولة', 'اقتراح أوقات وأماكن تجمع مركزية في المدينة'],
        vocabWordIds: ['bebida', 'salir', 'amigo', 'fiesta', 'tiempo'],
        dialogue: [
          { speaker: 'Local', es: 'Oye, Karim, ¿te hace tomar una caña o una tapa luego por el centro?', en: 'Hey, Karim, are you up for a beer or a tapa later in the center?', ar: 'اسمع يا كريم، هل يناسبك شرب عصير أو تناول مقبلات tapas لاحقاً في وسط المدينة؟' },
          { speaker: 'Estudiante', es: '¡Claro que sí! Me apunto. ¿A qué hora quedamos?', en: 'Of course! I\'m in. What time are we meeting?', ar: 'بالتأكيد! أنا معكم. في أي ساعة نلتقي؟' },
          { speaker: 'Local', es: 'A las ocho en la salida de metro de Sol.', en: 'At eight at the Sol subway exit.', ar: 'في الثامنة عند مخرج مترو ساحة سول (Sol).' }
        ]
      },
      {
        lessonNumber: 3,
        title_es: 'Citas y Café: "¿Quedamos por la tarde?"',
        title_en: 'Dates & Coffee: "Shall we meet in the afternoon?"',
        title_ar: 'المواعيد والمقاهي: "هل نلتقي بعد الظهر؟"',
        objectives_en: ['Coordinate meetup schedules precisely', 'Negotiate convenient locations', 'Confirm details using texting shorthand'],
        objectives_ar: ['تنسيق جداول اللقاءات بدقة', 'التفاوض حول أماكن مريحة ومناسبة للطرفين', 'تأكيد التفاصيل وتلقي رسائل الموعد السريعة'],
        vocabWordIds: ['café', 'tarde', 'quedar', 'hablar', 'hora'],
        dialogue: [
          { speaker: 'Estudiante', es: 'Hola, Sofía. ¿Quedamos por la tarde para practicar mi español?', en: 'Hello, Sofia. Shall we meet in the afternoon to practice my Spanish?', ar: 'مرحباً يا صوفيا. هل نلتقي بعد الظهر لنمارس لغتي الإسبانية؟' },
          { speaker: 'Amiga', es: '¡Me parece genial! ¿Te viene bien a las cinco en la cafetería del barrio?', en: 'That sounds great! Does five o\'clock at the local café work for you?', ar: 'يبدو هذا رائعاً جداً! هل يناسبك المجيء في الخامسة بمقهى الحي؟' },
          { speaker: 'Estudiante', es: 'Sí, perfecto. Allí nos vemos.', en: 'Yes, perfect. See you there.', ar: 'نعم، ممتاز. نلتقي هناك.' }
        ]
      },
      {
        lessonNumber: 4,
        title_es: 'Sociales: "¡Estamos al habla!"',
        title_en: 'Socials: "We are in touch!"',
        title_ar: 'وسائل التواصل: "نحن على تواصل!"',
        objectives_en: ['Ask for and swap social media user handles', 'Save phone numbers with country codes', 'End meetups with warm assurances'],
        objectives_ar: ['السؤال عن حسابات التواصل الاجتماعي وتبادلها', 'حفظ أرقام الهواتف برموز الاتصال الدولية', 'إنهاء اللقاءات بعبارات توديع حارة ووعود تواصل مستقبلي'],
        vocabWordIds: ['enviar', 'escribir', 'móvil', 'amigo', 'salir'],
        dialogue: [
          { speaker: 'Estudiante', es: 'Me lo he pasado genial hoy. ¿Cómo apareces en Instagram?', en: 'I had a great time today. What\'s your Instagram handle?', ar: 'لقد قضيت وقتاً رائعاً اليوم. ما هو اسم حسابك على إنستغرام؟' },
          { speaker: 'Amiga', es: 'Búscame como @sofia_vlc. Y pásame tu número de móvil.', en: 'Search for me as @sofia_vlc. And give me your mobile number.', ar: 'ابحث عني باسم @sofia_vlc. وأعطني رقم هاتفك المحمول.' },
          { speaker: 'Estudiante', es: 'Te lo envío ahora mismo. ¡Estamos al habla!', en: 'I\'ll send it to you right now. We\'re in touch!', ar: 'سأرسله لك الآن فوراً. نحن على تواصل دائم!' }
        ]
      }
    ]
  },
  {
    unitNumber: 20,
    title_es: 'Misión: El Reto Final de Supervivencia A1',
    title_en: 'Mission: The Final A1 Survival Challenge',
    title_ar: 'مهمة: التحدي النهائي للنجاة والبقاء A1',
    description_en: 'Perform airport emergency filings, order takeout over the phone, request pharmacy help, and complete the ultimate A1 capstone.',
    description_ar: 'إجراء بلاغات طوارئ المطارات، طلب وجبات خارجية عبر الهاتف، طلب المساعدة في الصيدلية، وإتمام مشروع تخرج A1 الأكبر.',
    lessons: [
      {
        lessonNumber: 1,
        title_es: 'Aeropuerto: "Perdí mi equipaje"',
        title_en: 'Airport: "I lost my luggage"',
        title_ar: 'المطار: "لقد فقدت حقائبي"',
        objectives_en: ['File lost baggage claims with airlines', 'Describe physical luggage tags and sizes', 'Provide local address delivery details'],
        objectives_ar: ['تقديم بلاغات فقدان الأمتعة مع شركات الطيران', 'وصف العلامات المادية للحقائب وأحجامها وألوانها', 'تقديم تفاصيل العنوان المحلي للتوصيل السريع'],
        vocabWordIds: ['maleta', 'viajar', 'ayuda', 'malo', 'perderse'],
        dialogue: [
          { speaker: 'Pasajero', es: 'Hola, buenas. Mi vuelo acaba de llegar pero no sale mi maleta. Creo que se ha perdido.', en: 'Hello, hi. My flight just arrived but my suitcase isn\'t coming out. I think it\'s lost.', ar: 'مرحباً، لو سمحت. لقد وصلت طائرتي للتو ولكن حقيبتي لم تظهر على السير. أعتقد أنها فُقدت.' },
          { speaker: 'Agente', es: 'Vaya. Rellene este formulario con la descripción de la maleta y su dirección aquí.', en: 'Oh. Fill out this form with the description of the suitcase and your address here.', ar: 'يا للأسف. املأ هذه الاستمارة بوصف كامل للحقيبة وعنوان إقامتك هنا.' },
          { speaker: 'Pasajero', es: 'Es una maleta grande de color rojo. Estoy en el Hostal Central de la calle Mayor.', en: 'It is a large red suitcase. I am staying at the Central Hostel on Mayor street.', ar: 'إنها حقيبة كبيرة الحجم حمراء اللون. أنا أقيم في نزل Hostal Central بشارع مايور.' }
        ]
      },
      {
        lessonNumber: 2,
        title_es: 'Llamada: "Quiero pedir comida para llevar"',
        title_en: 'Call: "I want to order food to go"',
        title_ar: 'الاتصال: "أريد طلب طعام للمغادرة والتوصيل"',
        objectives_en: ['Order restaurant delivery over the phone', 'Confirm pricing and estimated delivery windows', 'Spell tricky delivery addresses'],
        objectives_ar: ['طلب توصيل الطعام من المطاعم عبر الهاتف', 'تأكيد الأسعار ونوافذ وقت التوصيل المتوقعة', 'تهجئة العناوين الصعبة بدقة لتجنب الأخطاء'],
        vocabWordIds: ['comida', 'llamar', 'precio', 'casa', 'calle'],
        dialogue: [
          { speaker: 'Cliente', es: 'Hola, buenas noches. Quiero pedir una pizza de jamón y queso para llevar a domicilio.', en: 'Hello, good evening. I want to order a ham and cheese pizza for home delivery.', ar: 'مرحباً، مساء الخير. أريد طلب بيتزا باللحم والجبن لتوصيلها إلى المنزل.' },
          { speaker: 'Pizzero', es: 'Perfecto. ¿Me da su dirección de entrega y un número de teléfono?', en: 'Perfect. Can you give me your delivery address and a telephone number?', ar: 'ممتاز. هل تعطيني عنوان التوصيل ورقم الهاتف من فضلك؟' },
          { speaker: 'Cliente', es: 'Sí, calle Libertad número quince, piso tercero B. ¿Cuánto tarda?', en: 'Yes, Libertad street number 15, third floor B. How long does it take?', ar: 'نعم، شارع الحرية (Libertad) رقم 15، الشقة 3B. كم تستغرق؟' }
        ]
      },
      {
        lessonNumber: 3,
        title_es: 'Farmacia: "Me duele la cabeza"',
        title_en: 'Pharmacy: "My head hurts"',
        title_ar: 'الصيدلية: "رأسي يؤلمني بشدة"',
        objectives_en: ['Describe acute body symptoms to pharmacists', 'Request over-the-counter local remedies', 'Inquire about dosage and timing rules'],
        objectives_ar: ['وصف أعراض الجسم الحادة للصيادلة', 'طلب الأدوية والمسكنات المتاحة بدون وصفة طبية', 'الاستفسار عن جرعات الدواء ومواعيد تناولها السليمة'],
        vocabWordIds: ['ayuda', 'salud', 'malo', 'comprar', 'tiempo'],
        dialogue: [
          { speaker: 'Cliente', es: 'Hola, buenas tardes. Me duele mucho la cabeza. ¿Tiene algo rápido?', en: 'Hello, good afternoon. My head hurts a lot. Do you have something quick?', ar: 'مرحباً، مساء الخير. رأسي يؤلمني بشدة. هل لديك مسكن سريع؟' },
          { speaker: 'Farmacéutico', es: 'Sí, claro. Aquí tiene paracetamol de un gramo. Tome uno cada ocho horas con agua.', en: 'Yes, of course. Here you have one gram paracetamol. Take one every eight hours with water.', ar: 'نعم، بالطبع. تفضل هذا باراسيتامول عيار واحد غرام. تناول قرصاً واحداً كل ثماني ساعات بالماء.' },
          { speaker: 'Cliente', es: 'Perfecto. ¿Cuánto es en total?', en: 'Perfect. How much is it in total?', ar: 'ممتاز. كم الحساب الإجمالي؟' }
        ]
      },
      {
        lessonNumber: 4,
        title_es: 'Encuentro Casual: "¡Cuánto tiempo sin verte!"',
        title_en: 'Casual Reunion: "Long time no see!"',
        title_ar: 'اللقاء المفاجئ: "مر وقت طويل لم أرك فيه!"',
        objectives_en: ['React to running into old friends randomly', 'Catch up on high-level updates rapidly', 'Plan immediate follow-up social meetings'],
        objectives_ar: ['التفاعل عند لقاء الأصدقاء القدامى بالصدفة في الشارع', 'تبادل المستجدات والتطورات الشخصية السريعة بطلاقة', 'التخطيط الفوري للقاءات اجتماعية قادمة لمواصلة الحديث'],
        vocabWordIds: ['amigo', 'tiempo', 'hablar', 'quedar', 'vida'],
        dialogue: [
          { speaker: 'Amigo', es: '¡Karim! ¡No me lo puedo creer! ¡Cuánto tiempo sin verte!', en: 'Karim! I can\'t believe it! Long time no see!', ar: 'كريم! لا أصدق عيني! مر وقت طويل لم أرك فيه!' },
          { speaker: 'Karim', es: '¡Hombre, Alejandro! Qué alegría. Sí, hace casi seis meses.', en: 'Man, Alejandro! What a joy. Yes, it\'s been almost six months.', ar: 'يا أهلاً بصاحبي أليخاندرو! يا لها من فرحة. نعم، مر ما يقرب من ستة أشهر.' },
          { speaker: 'Amigo', es: 'Tenemos que tomar un café esta semana para ponernos al día.', en: 'We have to get a coffee this week to catch up.', ar: 'يجب أن نشرب كوب قهوة هذا الأسبوع لنسترجع أخبارنا ونستطلع المستجدات.' }
        ]
      },
      {
        lessonNumber: 5,
        title_es: 'Reto Capstone: El Diario del Viajero A1',
        title_en: 'Capstone Challenge: Traveler\'s Diary A1',
        title_ar: 'تحدي التخرج: مذكرات المسافر الذكي A1',
        objectives_en: ['Synthesize all survival A1 skills in a comprehensive autobiographical travel piece', 'Draft a high-stakes, real-world narrative detailing trip hacks, routes, and food orders', 'Celebrate graduating to CEFR Level A2!'],
        objectives_ar: ['دمج كل مهارات البقاء والنجاة للمستوى A1 في قطعة مذكرات سفر شاملة', 'كتابة نص حواري حقيقي واقعي يفصل حيل السفر، خطوط السير، وطلب الوجبات المحلية', 'الاحتفال بالتخرج والانطلاق إلى المستوى A2!'],
        vocabWordIds: ['proyecto', 'perfil', 'vida', 'meta', 'éxito'],
        dialogue: [
          { speaker: 'Tutor IA', es: '¡Has superado todas tus misiones urbanas con un éxito espectacular! Tu español ya no es académico, es de supervivencia real.', en: 'You have passed all your urban missions with spectacular success! Your Spanish is no longer academic, it is real-world survival.', ar: 'لقد اجتزت كل مهامك الحضرية بنجاح مبهر ومثالي! لغتك الإسبانية لم تعد مجرد دراسة أكاديمية جافة، بل أداة نجاة وبقاء واقعية بامتياز.' }
        ],
        exercises: [
          {
            id: 'ex-a1-capstone-survival-1',
            type: 'multiple_choice',
            prompt_es: 'Si estás en un restaurante y quieres pedir la cuenta de forma natural, dices:',
            prompt_en: 'If you are in a restaurant and want to ask for the bill naturally, you say:',
            prompt_ar: 'إذا كنت في مطعم وتريد طلب الحساب بأسلوب محلي طبيعي، تقول:',
            options: ['¿Me cobras cuando puedas?', 'Quiero darte dinero ahora', 'Dame el ticket de regalo', '¿Dónde está la farmacia?'],
            correctAnswer: '¿Me cobras cuando puedas?',
            explanation_en: '"¿Me cobras cuando puedas?" is an extremely natural native collocation used daily to request the bill.',
            explanation_ar: '"¿Me cobras cuando puedas?" هو تركيب حواري محلي طبيعي للغاية ومستعمل يومياً لطلب الحساب.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write your comprehensive traveler diary entry (at least 5 sentences) describing arriving at a Spanish hostel, ordering street food, buying transport tickets, and talking to locals.',
          prompt_ar: 'اكتب مذكرات سفرك الشاملة (5 جمل على الأقل) تصف فيها وصولك لنزل إسباني، طلب طعام الشارع، شراء تذاكر المواصلات، والحديث مع السكان المحليين بطلاقة.',
          minSentences: 5,
          sampleTarget: 'Hola, hoy he llegado al Hostal Central de Madrid y he registrado mi entrada en recepción. Después fui al metro y saqué una tarjeta de diez viajes para moverme por el centro. Comí unos deliciosos tacos en el mercado de San Miguel y le pedí sugerencias al taquero. Por la tarde quedé con mi amigo Alejandro para tomar un cortado y practicar conversación. ¡Estoy súper feliz con mi viaje y hablo español con total seguridad todos los días!'
        }
      }
    ]
  }
];

// Map specs to correct structure and export
specs.forEach(spec => {
  const unitId = `unit-a1-${spec.unitNumber}`;
  const lessons: Lesson[] = spec.lessons.map(les => ({
    id: `lesson-a1-${spec.unitNumber}-${les.lessonNumber}`,
    unitId: unitId,
    lessonNumber: les.lessonNumber,
    title_es: les.title_es,
    title_en: les.title_en,
    title_ar: les.title_ar,
    cefr: 'A1',
    objectives_en: les.objectives_en,
    objectives_ar: les.objectives_ar,
    vocabWordIds: les.vocabWordIds,
    dialogue: les.dialogue,
    exercises: (les.exercises || []).map(ex => ({
      id: ex.id,
      type: ex.type as ExerciseType,
      prompt_es: ex.prompt_es,
      prompt_en: ex.prompt_en,
      prompt_ar: ex.prompt_ar,
      options: ex.options,
      correctAnswer: ex.correctAnswer,
      explanation_en: ex.explanation_en,
      explanation_ar: ex.explanation_ar
    })),
    productionPrompt: les.productionPrompt || {
      prompt_en: `Write 3 sentences using the collocations learned in '${les.title_en}'.`,
      prompt_ar: `اكتب 3 جمل مفيدة مستخدماً التراكيب التي تعلمتها في '${les.title_es}'.`,
      minSentences: 3,
      sampleTarget: 'Quiero pedir un café por favor. Me pones un croissant delicioso. ¿Cuánto te debo por todo?'
    }
  }));

  A1_EXPANDED_SURVIVAL_UNITS.push({
    id: unitId,
    level: 'A1',
    unitNumber: spec.unitNumber,
    title_es: spec.title_es,
    title_en: spec.title_en,
    title_ar: spec.title_ar,
    description_en: spec.description_en,
    description_ar: spec.description_ar,
    lessons: lessons
  });
});
