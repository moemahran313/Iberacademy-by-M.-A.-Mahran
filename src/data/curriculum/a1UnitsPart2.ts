import { Unit } from '../../types';

export const A1_UNITS_PART2: Unit[] = [
  // UNIT 7: Compras y Ropa
  {
    id: 'unit-a1-7',
    level: 'A1',
    unitNumber: 7,
    title_es: 'Compras y Ropa',
    title_en: 'Shopping & Clothes',
    title_ar: 'التسوق والملابس',
    description_en: 'Master shopping vocabulary, clothing items, colors, sizes, and demonstrative pronouns (este, ese, aquel).',
    description_ar: 'إتقان مفردات التسوق، الملابس، الألوان، المقاسات، وأسماء الإشارة (este, ese, aquel).',
    lessons: [
      {
        id: 'lesson-a1-7-1',
        unitId: 'unit-a1-7',
        lessonNumber: 1,
        title_es: 'Prendas de Vestir y Calzado',
        title_en: 'Clothing Items & Footwear',
        title_ar: 'الملابس والأحذية',
        cefr: 'A1',
        objectives_en: ['Name essential clothes (camisa, pantalones, vestido, zapatos)', 'Describe what you are wearing with "llevar / vestir"', 'Ask for different clothing items'],
        objectives_ar: ['تسمية الملابس والأحذية الأساسية', 'وصف ما ترتديه بفعل llevar', 'طلب قطع ملابس مختلفة في المتجر'],
        vocabWordIds: ['w-camisa', 'w-pantalon', 'w-vestido', 'w-zapato', 'w-llevar'],
        dialogue: [
          { speaker: 'Dependiente', es: '¡Hola! ¿En qué puedo ayudarte?', en: 'Hello! How can I help you?', ar: 'مرحباً! كيف يمكنني مساعدتك؟' },
          { speaker: 'Cliente', es: 'Busco unos pantalones negros y una camisa blanca de algodón.', en: 'I am looking for black trousers and a white cotton shirt.', ar: 'أبحث عن بنطال أسود وقميص أبيض من القطن.' }
        ],
        exercises: [
          {
            id: 'ex-a1-7-1-1',
            type: 'multiple_choice',
            prompt_es: '¿Qué llevas en los pies para caminar?',
            prompt_en: 'What do you wear on your feet to walk?',
            prompt_ar: 'ماذا ترتدي في قدميك للمشي؟',
            options: ['Zapatos', 'Camisa', 'Sombrero', 'Gafas'],
            correctAnswer: 'Zapatos',
            explanation_en: '"Zapatos" means shoes.',
            explanation_ar: '"Zapatos" تعني الأحذية.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Describe what you are wearing today including colors in 3 sentences.',
          prompt_ar: 'صف ما ترتديه اليوم متضمناً الألوان في 3 جمل.',
          minSentences: 3,
          sampleTarget: 'Hoy llevo unos pantalones vaqueros azules y una camiseta blanca. También llevo zapatos deportivos negros y una chaqueta cómoda.'
        }
      },
      {
        id: 'lesson-a1-7-2',
        unitId: 'unit-a1-7',
        lessonNumber: 2,
        title_es: 'Colores y Concordancia con Sustantivos',
        title_en: 'Colors & Adjective Agreement',
        title_ar: 'الألوان ومطابقة الصفات للأسماء',
        cefr: 'A1',
        objectives_en: ['Name all main colors in Spanish', 'Match color adjectives in gender and number (camisa roja, zapatos rojos)', 'Identify invariant colors (verde, azul, rosa)'],
        objectives_ar: ['تسمية الألوان الأساسية', 'مطابقة ألوان الصفات للموصوف تذكيراً وتأنيثاً وجمعاً', 'معرفة الألوان الثابتة للمذكر والمؤنث'],
        vocabWordIds: ['w-rojo', 'w-azul', 'w-verde', 'w-negro', 'w-blanco'],
        dialogue: [
          { speaker: 'Marta', es: '¿Prefieres la falda roja o la falda verde?', en: 'Do you prefer the red skirt or the green skirt?', ar: 'هل تفضلين التنورة الحمراء أم التنورة الخضراء؟' },
          { speaker: 'Paula', es: 'Me gusta más la falda roja, combina mejor con mis zapatos negros.', en: 'I like the red skirt more, it matches better with my black shoes.', ar: 'تعجبني التنورة الحمراء أكثر، إنها تتناسق بشكل أفضل مع حذائي الأسود.' }
        ],
        exercises: [
          {
            id: 'ex-a1-7-2-1',
            type: 'multiple_choice',
            prompt_es: 'Tengo dos camisas ______ (white).',
            prompt_en: 'Choose the correct agreement for plural feminine "camisas":',
            prompt_ar: 'اختر المطابقة الصحيحة لكلمة camisas المؤنثة الجمع:',
            options: ['blancas', 'blancos', 'blanco', 'blanca'],
            correctAnswer: 'blancas',
            explanation_en: '"Camisas" is feminine plural, so the color adjective is "blancas".',
            explanation_ar: '"Camisas" جمع مؤنث، فتكون صفة اللون "blancas".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences describing the colors of various items in your room or wardrobe.',
          prompt_ar: 'اكتب 3 جمل تصف فيها ألوان أغراض مختلفة في غرفتك أو خزانة ملابسك.',
          minSentences: 3,
          sampleTarget: 'Tengo una mochila negra muy práctica. Mi chaqueta favorita es de color azul oscuro. Mis zapatillas son blancas y grises.'
        }
      },
      {
        id: 'lesson-a1-7-3',
        unitId: 'unit-a1-7',
        lessonNumber: 3,
        title_es: 'Tallas, Probarse Ropa y Devoluciones',
        title_en: 'Sizes, Trying on Clothes & Returns',
        title_ar: 'المقاسات وغرفة القياس والاستبدال',
        cefr: 'A1',
        objectives_en: ['Ask for clothing sizes (talla pequeña, mediana, grande)', 'Ask to try on clothes (¿Me puedo probar esto?)', 'Ask where the fitting rooms are (los probadores)'],
        objectives_ar: ['السؤال عن المقاسات (صغير، متوسط، كبير)', 'طلب قياس وتجربة الملابس', 'السؤال عن غرف القياس والتبديل'],
        vocabWordIds: ['w-talla', 'w-probador', 'w-probarse', 'w-pequeno', 'w-grande'],
        dialogue: [
          { speaker: 'Cliente', es: 'Disculpe, ¿dónde están los probadores para probarme esta chaqueta?', en: 'Excuse me, where are the fitting rooms to try on this jacket?', ar: 'عفواً، أين غرف القياس لتجربة هذه السترة؟' },
          { speaker: 'Dependiente', es: 'Están al fondo a la izquierda. Si le queda pequeña, tenemos una talla más grande.', en: 'They are at the back on the left. If it is too small, we have a larger size.', ar: 'إنها في نهاية الممر على اليسار. إذا كانت ضيقة وصغيرة، لدينا مقاس أكبر.' }
        ],
        exercises: [
          {
            id: 'ex-a1-7-3-1',
            type: 'multiple_choice',
            prompt_es: 'La talla "M" en español significa:',
            prompt_en: 'Size "M" in Spanish stands for:',
            prompt_ar: 'المقاس "M" بالإسبانية يعني:',
            options: ['Talla Mediana', 'Talla Máxima', 'Talla Menor', 'Talla Mucha'],
            correctAnswer: 'Talla Mediana',
            explanation_en: '"Talla Mediana" is Medium size.',
            explanation_ar: '"Talla Mediana" تعني المقاس المتوسط.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence shopping conversation asking to try on a size medium shirt.',
          prompt_ar: 'اكتب محادثة تسوق من 3 جمل تطلب فيها تجربة قميص بمقاس متوسط.',
          minSentences: 3,
          sampleTarget: '— ¿Tiene este vestido en talla mediana? — Sí, aquí tiene. — ¿Dónde están los probadores para probármelo, por favor?'
        }
      },
      {
        id: 'lesson-a1-7-4',
        unitId: 'unit-a1-7',
        lessonNumber: 4,
        title_es: 'Demostrativos: Este, Ese y Aquel',
        title_en: 'Demonstratives: Este, Ese & Aquel',
        title_ar: 'أسماء الإشارة: Este و Ese و Aquel',
        cefr: 'A1',
        objectives_en: ['Use este/esta for objects near the speaker', 'Use ese/esa for objects near the listener', 'Use aquel/aquella for objects far from both'],
        objectives_ar: ['استخدام este/esta للقريب من المتكلم', 'استخدام ese/esa للقريب من المخاطب', 'استخدام aquel/aquella للبعيد عن الاثنين'],
        vocabWordIds: ['w-este', 'w-ese', 'w-aquel', 'w-aqui', 'w-alla'],
        dialogue: [
          { speaker: 'Laura', es: 'Me gusta mucho esta camiseta que tengo aquí, pero aquel vestido rojo de la vitrina es espectacular.', en: 'I really like this t-shirt I have here, but that red dress in the window over there is spectacular.', ar: 'يعجبني كثيراً هذا القميص هنا، ولكن ذلك الفستان الأحمر في الواجهة هناك مذهل.' }
        ],
        exercises: [
          {
            id: 'ex-a1-7-4-1',
            type: 'multiple_choice',
            prompt_es: 'Para un objeto que está lejos de los dos hablantes usamos:',
            prompt_en: 'For an object far away from both speakers, we use:',
            prompt_ar: 'لغرض بعيد عن كلا المتحدثين نستخدم اسم الإشارة للبعيد:',
            options: ['Aquel / Aquella', 'Este / Esta', 'Ese / Esa', 'Estos / Estas'],
            correctAnswer: 'Aquel / Aquella',
            explanation_en: '"Aquel / Aquella" indicates far spatial distance.',
            explanation_ar: '"Aquel / Aquella" تشير إلى المسافة المكانية البعيدة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences pointing out items at different distances using este, ese, and aquel.',
          prompt_ar: 'اكتب 3 جمل تشير فيها إلى أغراض على مسافات مختلفة باستخدام este و ese و aquel.',
          minSentences: 3,
          sampleTarget: 'Este teléfono que tengo en la mano es nuevo. Ese libro en tu mesa parece interesante. Aquella casa blanca al final de la calle es de mi abuelo.'
        }
      }
    ]
  },

  // UNIT 8: Personas y Descripciones
  {
    id: 'unit-a1-8',
    level: 'A1',
    unitNumber: 8,
    title_es: 'Personas y Descripciones',
    title_en: 'People & Descriptions',
    title_ar: 'وصف الأشخاص والشخصيات',
    description_en: 'Describe physical appearance, personality traits, hair and eye colors with ser and tener.',
    description_ar: 'وصف المظهر الخارجي، السمات الشخصية، ألوان الشعر والعيون باستخدام أفعال ser و tener.',
    lessons: [
      {
        id: 'lesson-a1-8-1',
        unitId: 'unit-a1-8',
        lessonNumber: 1,
        title_es: 'Aspecto Físico: Altura, Constitución y Edad',
        title_en: 'Physical Appearance: Height & Build',
        title_ar: 'المظهر الجسدي: الطول والبنية والعمر',
        cefr: 'A1',
        objectives_en: ['Describe height (alto, bajo)', 'Describe build (delgado, fuerte, gordo)', 'Use ser + physical adjective with correct gender agreement'],
        objectives_ar: ['وصف الطول (طويل، قصير)', 'وصف البنية (نحيف، قوي، ممتلئ)', 'استخدام ser مع صفات المظهر بمطابقة دقيقة'],
        vocabWordIds: ['w-alto', 'w-bajo', 'w-delgado', 'w-joven', 'w-mayor'],
        dialogue: [
          { speaker: 'Carlos', es: '¿Cómo es tu primo Daniel?', en: 'What does your cousin Daniel look like?', ar: 'كيف يبدو ابن عمك دانييل في مظهره؟' },
          { speaker: 'Sofía', es: 'Es muy alto, delgado y tiene el pelo castaño. Es un chico muy deportista.', en: 'He is very tall, slim, and has brown hair. He is a very sporty guy.', ar: 'هو طويل جداً، نحيف وله شعر بني كستنائي. إنه شاب رياضي جداً.' }
        ],
        exercises: [
          {
            id: 'ex-a1-8-1-1',
            type: 'fill_blank',
            prompt_es: 'Mi hermana es muy ______ (tall) y simpática.',
            prompt_en: 'Choose the correct feminine form for "tall":',
            prompt_ar: 'اختر الصيغة المؤنثة الصحيحة لصفة "طويل":',
            options: ['alta', 'alto', 'altos', 'altas'],
            correctAnswer: 'alta',
            explanation_en: '"Hermana" is feminine singular, so we use "alta".',
            explanation_ar: '"Hermana" مؤنث مفرد فنستخدم "alta".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Describe the physical appearance of a close friend or family member in 3 sentences.',
          prompt_ar: 'صف المظهر الجسدي لصديق مقرب أو فرد من عائلتك في 3 جمل.',
          minSentences: 3,
          sampleTarget: 'Mi mejor amigo es alto y tiene los ojos verdes. Es joven y muy fuerte porque entrena todos los días. Siempre lleva ropa moderna.'
        }
      },
      {
        id: 'lesson-a1-8-2',
        unitId: 'unit-a1-8',
        lessonNumber: 2,
        title_es: 'Pelo, Ojos y Rasgos Faciales con Tener',
        title_en: 'Hair, Eyes & Facial Features with Tener',
        title_ar: 'الشعر والعيون والملامح مع فعل Tener',
        cefr: 'A1',
        objectives_en: ['Describe hair type and color (pelo rubio, moreno, rizado, liso)', 'Describe eye color (ojos marrones, azules, verdes, negros)', 'Express wearing glasses or having a beard'],
        objectives_ar: ['وصف نوع ولون الشعر', 'وصف ألوان العيون', 'التعبير عن ارتداء النظارة أو إطلاق اللحية'],
        vocabWordIds: ['w-pelo', 'w-ojo', 'w-rubio', 'w-moreno', 'w-barba'],
        dialogue: [
          { speaker: 'Elena', es: 'Mi profesora tiene el pelo rubio y rizado, y tiene unos ojos azules muy expresivos.', en: 'My teacher has curly blonde hair, and has very expressive blue eyes.', ar: 'معلمتي تمتلك شعراً أشقر ومجعداً، وعينين زرقاوين معبرتين للغاية.' }
        ],
        exercises: [
          {
            id: 'ex-a1-8-2-1',
            type: 'multiple_choice',
            prompt_es: 'Para describir los ojos usamos el verbo:',
            prompt_en: 'To describe having eye color we use the verb:',
            prompt_ar: 'لوصف امتلاك لون العيون نستخدم فعل:',
            options: ['Tener (Tengo los ojos...)', 'Ser (Soy los ojos...)', 'Estar (Estoy los ojos...)', 'Hacer (Hago los ojos...)'],
            correctAnswer: 'Tener (Tengo los ojos...)',
            explanation_en: 'In Spanish we say "Tener los ojos + color" (I have blue eyes).',
            explanation_ar: 'نقول "Tener los ojos + color" (امتلاك عيون بلون كذا).'
          }
        ],
        productionPrompt: {
          prompt_en: 'Describe your own hair and eyes in 3 sentences using the verb tener.',
          prompt_ar: 'صف شعرك وعينيك في 3 جمل باستخدام فعل tener.',
          minSentences: 3,
          sampleTarget: 'Tengo el pelo corto, negro y liso. Mis ojos son de color marrón oscuro. Llevo gafas para leer y trabajar.'
        }
      },
      {
        id: 'lesson-a1-8-3',
        unitId: 'unit-a1-8',
        lessonNumber: 3,
        title_es: 'Personalidad y Carácter',
        title_en: 'Personality & Character Traits',
        title_ar: 'الشخصية والطباع والسمات المعنوية',
        cefr: 'A1',
        objectives_en: ['Use character adjectives (simpático, inteligente, trabajador, tímido, generoso)', 'State qualities with ser', 'Contrast personality traits'],
        objectives_ar: ['استخدام صفات الشخصية والطباع', 'ذكر السمات الإيجابية والسلبية مع فعل ser', 'المقارنة بين الطباع المختلفة'],
        vocabWordIds: ['w-simpatico', 'w-inteligente', 'w-trabajador', 'w-timido', 'w-divertido'],
        dialogue: [
          { speaker: 'Andrés', es: 'Mi hermano es muy tímido, pero cuando tiene confianza es súper divertido y bromista.', en: 'My brother is very shy, but when he feels comfortable he is super funny and a joker.', ar: 'أخي خجول جداً، ولكن عندما يطمئن ويألف المكان يصبح مرحاً جداً ومحباً للمزاح.' }
        ],
        exercises: [
          {
            id: 'ex-a1-8-3-1',
            type: 'multiple_choice',
            prompt_es: 'Una persona que ayuda a los demás y da sin esperar nada a cambio es:',
            prompt_en: 'A person who gives and helps others is:',
            prompt_ar: 'الشخص الذي يساعد ويعطي بكرم هو شخص:',
            options: ['Generosa', 'Tacaña', 'Perezosa', 'Tímida'],
            correctAnswer: 'Generosa',
            explanation_en: '"Generoso/a" means generous.',
            explanation_ar: '"Generoso/a" تعني كريم / سخي.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Describe your own personality mentioning 3 strong character qualities.',
          prompt_ar: 'صف شخصيتك مع ذكر 3 سمات وصفات إيجابية فيك.',
          minSentences: 3,
          sampleTarget: 'Soy una persona trabajadora, responsable y muy curiosa. Me gusta aprender cosas nuevas todos los días. También soy muy paciente con mis amigos.'
        }
      },
      {
        id: 'lesson-a1-8-4',
        unitId: 'unit-a1-8',
        lessonNumber: 4,
        title_es: 'Estados de Ánimo y Emociones con Estar',
        title_en: 'Moods & Emotions with Estar',
        title_ar: 'المشاعر والحالات المزاجية المؤقتة مع Estar',
        cefr: 'A1',
        objectives_en: ['Use estar + mood adjective (contento, triste, cansado, preocupado, nervioso)', 'Express reasons for temporary feelings with "porque"', 'Contrast permanent character (ser) with mood (estar)'],
        objectives_ar: ['استخدام estar مع صفات المزاج والشعور', 'التعبير عن أسباب المشاعر المؤقتة باستخدام porque', 'التمييز بين الطبع الدائم والمزاج المؤقت'],
        vocabWordIds: ['w-contento', 'w-cansado', 'w-triste', 'w-nervioso', 'w-porque'],
        dialogue: [
          { speaker: 'Mateo', es: '¿Por qué estás tan contento hoy?', en: 'Why are you so happy today?', ar: 'لماذا أنت سعيد ومبتهج هكذا اليوم؟' },
          { speaker: 'Lucía', es: 'Porque aprobé mi examen de español con la máxima nota.', en: 'Because I passed my Spanish exam with top marks.', ar: 'لأنني اجتزت امتحان الإسبانية بأعلى درجة.' }
        ],
        exercises: [
          {
            id: 'ex-a1-8-4-1',
            type: 'multiple_choice',
            prompt_es: 'Hoy los estudiantes ______ (tired) después del largo viaje.',
            prompt_en: 'Choose the correct form of estar and adjective for plural students:',
            prompt_ar: 'اختر الصيغة الصحيحة لفعل estar والصفة مع الطلاب الجمع:',
            options: ['están cansados', 'son cansados', 'está cansado', 'es cansado'],
            correctAnswer: 'están cansados',
            explanation_en: 'Temporary tiredness takes ESTAR + agreeing plural adjective: "están cansados".',
            explanation_ar: 'الشعور بالتعب حالة مؤقتة تتطلب ESTAR ومطابقة الصفة للجمع: "están cansados".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Explain how you feel today and the reason why in 3 sentences.',
          prompt_ar: 'اشرح كيف تشعر اليوم واذكر السبب في 3 جمل.',
          minSentences: 3,
          sampleTarget: 'Hoy estoy muy emocionado porque es viernes. También estoy un poco cansado por el trabajo de la semana. Esta noche voy a descansar tranquilamente.'
        }
      }
    ]
  },

  // UNIT 9: Tiempo Libre y Aficiones
  {
    id: 'unit-a1-9',
    level: 'A1',
    unitNumber: 9,
    title_es: 'Tiempo Libre y Aficiones',
    title_en: 'Free Time & Hobbies',
    title_ar: 'وقت الفراغ والهوايات',
    description_en: 'Talk about sports, music, cultural activities, leisure verbs (jugar vs hacer), and frequency expressions.',
    description_ar: 'الحديث عن الرياضة، الموسيقى، الأنشطة الثقافية، أفعال الهوايات (jugar و hacer)، وتعبيرات التكرار.',
    lessons: [
      {
        id: 'lesson-a1-9-1',
        unitId: 'unit-a1-9',
        lessonNumber: 1,
        title_es: 'Deportes y Actividades al Aire Libre',
        title_en: 'Sports & Outdoor Activities',
        title_ar: 'الرياضة والأنشطة في الهواء الطلق',
        cefr: 'A1',
        objectives_en: ['Use "Jugar a + deporte" (jugar al fútbol, al tenis)', 'Use "Hacer + actividad" (hacer natación, senderismo, yoga)', 'Talk about active pastimes'],
        objectives_ar: ['استخدام Jugar a مع الرياضات ذات الكرة', 'استخدام Hacer مع الأنشطة البدنية', 'الحديث عن الهوايات الرياضية'],
        vocabWordIds: ['w-jugar', 'w-futbol', 'w-deporte', 'w-correr', 'w-nadar'],
        dialogue: [
          { speaker: 'Raúl', es: '¿Practicas algún deporte los fines de semana?', en: 'Do you practice any sport on weekends?', ar: 'هل تمارس أي رياضة في عطلات نهاية الأسبوع؟' },
          { speaker: 'David', es: 'Sí, juego al fútbol con mis amigos los sábados y los domingos hago natación.', en: 'Yes, I play football with my friends on Saturdays, and on Sundays I go swimming.', ar: 'نعم، ألعب كرة القدم مع أصدقائي أيام السبت، وأمارس السباحة أيام الأحد.' }
        ],
        exercises: [
          {
            id: 'ex-a1-9-1-1',
            type: 'multiple_choice',
            prompt_es: 'Para deportes con pelota como el baloncesto usamos:',
            prompt_en: 'For ball sports like basketball, we say in Spanish:',
            prompt_ar: 'للرياضات التي تعتمد على الكرة مثل كرة السلة، نقول:',
            options: ['Jugar al baloncesto', 'Hacer baloncesto', 'Practicar el correr', 'Estar baloncesto'],
            correctAnswer: 'Jugar al baloncesto',
            explanation_en: 'Ball and team sports use "Jugar a + el deporte" (Jugar al baloncesto).',
            explanation_ar: 'الرياضات ذات الكرة تستخدم "Jugar a + الرياضة" فتصبح Jugar al baloncesto.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences detailing the sports you like to practice and how often you do them.',
          prompt_ar: 'اكتب 3 جمل توضح فيها الرياضات التي تحب ممارستها ومدى تكرارك لها.',
          minSentences: 3,
          sampleTarget: 'Me gusta mucho correr por el parque tres veces por semana. Los domingos juego al tenis con mi hermano. En verano siempre hago natación en la playa.'
        }
      },
      {
        id: 'lesson-a1-9-2',
        unitId: 'unit-a1-9',
        lessonNumber: 2,
        title_es: 'Música, Cine, Lectura y Arte',
        title_en: 'Music, Cinema, Reading & Art',
        title_ar: 'الموسيقى والسينما والقراءة والفنون',
        cefr: 'A1',
        objectives_en: ['Use "Tocar + instrumento" (tocar la guitarra, el piano)', 'Use "Escuchar + música" (escuchar rock, pop, música clásica)', 'Discuss books and movies'],
        objectives_ar: ['استخدام فعل Tocar مع الآلات الموسيقية', 'استخدام Escuchar مع أنماط الموسيقى', 'مناقشة الأفلام والكتب والاهتمامات الفنية'],
        vocabWordIds: ['w-musica', 'w-pelicula', 'w-libro', 'w-guitarra', 'w-tocar'],
        dialogue: [
          { speaker: 'Carla', es: '¿Qué tipo de música escuchas cuando estudias?', en: 'What type of music do you listen to when you study?', ar: 'ما نوع الموسيقى التي تستمع إليها حين تدرس؟' },
          { speaker: 'Tomás', es: 'Escucho música instrumental clásica, me ayuda a concentrarme. También toco la guitarra acústica.', en: 'I listen to classical instrumental music, it helps me concentrate. I also play acoustic guitar.', ar: 'أستمع إلى الموسيقى الكلاسيكية، فهي تساعدني على التركيز. كما أنني أعزف على الغيتار.' }
        ],
        exercises: [
          {
            id: 'ex-a1-9-2-1',
            type: 'multiple_choice',
            prompt_es: 'Para un instrumento musical como el piano usamos el verbo:',
            prompt_en: 'To say you play a musical instrument like the piano, you say:',
            prompt_ar: 'للعزف على آلة موسيقية مثل البيانو نستخدم فعل:',
            options: ['Tocar el piano', 'Jugar el piano', 'Hacer el piano', 'Hablar el piano'],
            correctAnswer: 'Tocar el piano',
            explanation_en: 'In Spanish, "tocar" is used for musical instruments (not jugar).',
            explanation_ar: 'في الإسبانية نستخدم فعل "tocar" مع الآلات الموسيقية وليس فعل jugar.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Describe your favorite cultural hobbies (music, books, movies) in 3 sentences.',
          prompt_ar: 'صف هواياتك الثقافية المفضلة (الموسيقى، الكتب، الأفلام) في 3 جمل.',
          minSentences: 3,
          sampleTarget: 'En mi tiempo libre me encanta leer novelas históricas. También escucho música española para practicar el idioma. Los fines de semana veo películas en el cine con mis amigos.'
        }
      },
      {
        id: 'lesson-a1-9-3',
        unitId: 'unit-a1-9',
        lessonNumber: 3,
        title_es: 'Expresiones de Frecuencia y Hábitos',
        title_en: 'Frequency Expressions & Habits',
        title_ar: 'تعبيرات التكرار والعادات',
        cefr: 'A1',
        objectives_en: ['Use "todos los días", "una vez por semana", "a veces", "casi nunca", "de vez en cuando"', 'Ask how often someone does an activity (¿Con qué frecuencia...?)', 'Form sentences about routine regularity'],
        objectives_ar: ['استخدام تعبيرات التكرار المحددة (كل يوم، مرة في الأسبوع، أحياناً، نادراً)', 'السؤال عن مدى تكرار الأنشطة', 'تكوين جمل دقيقة عن العادات والانتظام'],
        vocabWordIds: ['w-frecuencia', 'w-semana', 'w-mes', 'w-aveces', 'w-siempre'],
        dialogue: [
          { speaker: 'Laura', es: '¿Con qué frecuencia viajas a tu pueblo natal?', en: 'How often do you travel to your hometown?', ar: 'كم مرة تسافر إلى مسقط رأسك؟' },
          { speaker: 'Sergio', es: 'Voy una vez al mes para visitar a mis abuelos y descansar en el campo.', en: 'I go once a month to visit my grandparents and rest in the countryside.', ar: 'أذهب مرة في الشهر لزيارة جديّ والاسترخاء في الريف.' }
        ],
        exercises: [
          {
            id: 'ex-a1-9-3-1',
            type: 'multiple_choice',
            prompt_es: '"Dos veces por semana" significa:',
            prompt_en: '"Dos veces por semana" means:',
            prompt_ar: '"Dos veces por semana" تعني:',
            options: ['Twice a week', 'Two weeks ago', 'Every other month', 'Twice a year'],
            correctAnswer: 'Twice a week',
            explanation_en: '"Dos veces por semana" means twice a week.',
            explanation_ar: '"Dos veces por semana" تعني مرتين في الأسبوع.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences detailing how often you do 3 different activities.',
          prompt_ar: 'اكتب 3 جمل توضح فيها وتيرة قيامك بثلاثة أنشطة مختلفة.',
          minSentences: 3,
          sampleTarget: 'Estudio español todos los días durante media hora. Voy al gimnasio tres veces por semana. Salgo a cenar a restaurantes una vez al mes.'
        }
      },
      {
        id: 'lesson-a1-9-4',
        unitId: 'unit-a1-9',
        lessonNumber: 4,
        title_es: 'Quedar con Amigos y Hacer Planes',
        title_en: 'Meeting Friends & Making Plans',
        title_ar: 'الالتقاء بالأصدقاء وتنسيق المواعيد',
        cefr: 'A1',
        objectives_en: ['Propose plans with "¿Te apetece...?", "¿Por qué no...?", "¿Quedamos a las...?"', 'Accept or decline invitations politely', 'Agree on a meeting place and time'],
        objectives_ar: ['اقتراح خطط ولقاءات بلباقة', 'قبول أو الاعتذار عن الدعوات بأسلوب مهذب', 'الاتفاق على مكان وزمان اللقاء'],
        vocabWordIds: ['w-quedar', 'w-apetecer', 'w-plan', 'w-hora', 'w-lugar'],
        dialogue: [
          { speaker: 'Nuria', es: 'Hola Marcos, ¿te apetece tomar un café esta tarde en la plaza?', en: 'Hi Marcos, fancy having a coffee this afternoon in the square?', ar: 'مرحباً ماركوس، هل تود تناول فنجان قهوة بعد ظهر اليوم في الساحة؟' },
          { speaker: 'Marcos', es: '¡Sí, genial! ¿A qué hora quedamos?', en: 'Yes, great! What time shall we meet?', ar: 'نعم، رائع! في أي ساعة نلتقي؟' },
          { speaker: 'Nuria', es: '¿A las cinco y media te va bien?', en: 'Does 5:30 work for you?', ar: 'هل يناسبك في الخامسة والنصف؟' }
        ],
        exercises: [
          {
            id: 'ex-a1-9-4-1',
            type: 'multiple_choice',
            prompt_es: 'Para rechazar una invitación educadamente decimos:',
            prompt_en: 'To politely decline an invitation in Spanish, we say:',
            prompt_ar: 'للاعتذار عن دعوة بلباقة نقول:',
            options: ['Me encantaría, pero hoy no puedo porque tengo que trabajar', 'No quiero hablar contigo', 'Hasta nunca', 'No me gusta tu ropa'],
            correctAnswer: 'Me encantaría, pero hoy no puedo porque tengo que trabajar',
            explanation_en: 'Polite refusal explains the constraint courteously.',
            explanation_ar: 'الاعتذار اللبق يتضمن الشكر وإبداء الرغبة مع توضيح العذر بلطف.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence invitation to a friend to watch a movie or have lunch, proposing time and place.',
          prompt_ar: 'اكتب دعوة من 3 جمل لصديق لمشاهدة فيلم أو تناول الغداء، مع اقتراح المكان والموعد.',
          minSentences: 3,
          sampleTarget: 'Hola Pablo, ¿te apetece ir al cine este sábado? Podemos ver la nueva película de acción a las seis de la tarde. Después cenamos unas tapas.'
        }
      }
    ]
  },

  // UNIT 10: El Pasado Básico (Pretérito Indefinido Regular)
  {
    id: 'unit-a1-10',
    level: 'A1',
    unitNumber: 10,
    title_es: 'El Pasado Básico',
    title_en: 'Basic Past Tense',
    title_ar: 'الماضي البسيط التأسيسي',
    description_en: 'Introduction to talking about yesterday, past weekends, and the regular preterite tense (-é, -í).',
    description_ar: 'مقدمة للحديث عن الأمس وعطلات نهاية الأسبوع، وتصريف الماضي البسيط المنتظم.',
    lessons: [
      {
        id: 'lesson-a1-10-1',
        unitId: 'unit-a1-10',
        lessonNumber: 1,
        title_es: '¿Qué hiciste ayer?: Verbos en -AR en Pasado',
        title_en: 'What did you do yesterday?: -AR Past Verbs',
        title_ar: 'ماذا فعلت أمس؟: أفعال -AR في الماضي',
        cefr: 'A1',
        objectives_en: ['Conjugate regular -ar verbs in preterite (hablé, hablaste, habló, hablamos, hablasteis, hablaron)', 'Use time markers (ayer, anoche, la semana pasada)', 'Narrate finished past actions'],
        objectives_ar: ['تصريف أفعال -ar في الماضي البسيط المنتظم', 'استخدام علامات الماضي (أمس، الليلة الماضية، الأسبوع الماضي)', 'سرد أحداث مكتملة في الماضي'],
        vocabWordIds: ['w-ayer', 'w-anoche', 'w-pasado', 'w-hablar', 'w-trabajar'],
        grammarTopicId: 'g-preterite-regular',
        dialogue: [
          { speaker: 'Carmen', es: '¿Qué hiciste ayer por la tarde?', en: 'What did you do yesterday afternoon?', ar: 'ماذا فعلت أمس بعد الظهر؟' },
          { speaker: 'Pablo', es: 'Trabajé hasta las cinco, luego caminé por el parque y hablé por teléfono con mis padres.', en: 'I worked until five, then I walked in the park and talked on the phone with my parents.', ar: 'عملت حتى الخامسة، ثم تمشيت في الحديقة وتحدثت عبر الهاتف مع والدي.' }
        ],
        exercises: [
          {
            id: 'ex-a1-10-1-1',
            type: 'multiple_choice',
            prompt_es: 'Ayer yo ______ (estudiar) cuatro horas para el examen.',
            prompt_en: 'Choose the correct first-person preterite form:',
            prompt_ar: 'اختر تصريف المتكلم في الماضي البسيط لفعل estudiar:',
            options: ['estudié', 'estudio', 'estudiaba', 'estudió'],
            correctAnswer: 'estudié',
            explanation_en: 'First-person singular regular -ar preterite ends in "-é" (estudié).',
            explanation_ar: 'نهاية الماضي للمتكلم مع أفعال -ar هي -é (estudié).'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences narrating 3 things you did yesterday using regular -ar past verbs.',
          prompt_ar: 'اكتب 3 جمل تسرد فيها 3 أشياء قمت بها أمس باستخدام أفعال -ar في الماضي.',
          minSentences: 3,
          sampleTarget: 'Ayer me levanté temprano y preparé el desayuno. Por la tarde estudié español con mis compañeros. Por la noche cociné una sopa deliciosa.'
        }
      },
      {
        id: 'lesson-a1-10-2',
        unitId: 'unit-a1-10',
        lessonNumber: 2,
        title_es: 'Verbos en -ER y -IR en Pasado Indefinido',
        title_en: '-ER & -IR Verbs in Preterite Tense',
        title_ar: 'أفعال -ER و -IR في الماضي البسيط',
        cefr: 'A1',
        objectives_en: ['Conjugate regular -er/-ir verbs in preterite (comí, comiste, comió, comimos, comisteis, comieron)', 'Recognize shared endings for both verb groups', 'Describe meals and places visited in the past'],
        objectives_ar: ['تصريف أفعال -er و -ir في الماضي البسيط', 'ملاحظة النهايات المشتركة للمجموعتين', 'وصف وجبات سابقة وأماكن عشت فيها'],
        vocabWordIds: ['w-comer', 'w-beber', 'w-vivir', 'w-escribir', 'w-abrir'],
        dialogue: [
          { speaker: 'Marta', es: '¿Dónde comiste el domingo?', en: 'Where did you eat on Sunday?', ar: 'أين تناولت طعام الغداء يوم الأحد؟' },
          { speaker: 'Lucas', es: 'Comí en un restaurante mexicano con mi familia. Comimos tacos y bebimos agua de jamaica.', en: 'I ate at a Mexican restaurant with my family. We ate tacos and drank hibiscus water.', ar: 'تناولت الطعام في مطعم مكسيكي مع عائلتي. أكلنا التاكو وشربنا الكركديه.' }
        ],
        exercises: [
          {
            id: 'ex-a1-10-2-1',
            type: 'multiple_choice',
            prompt_es: 'Nosotros ______ (vivir) en Barcelona el año pasado.',
            prompt_en: 'Choose the preterite form for "nosotros":',
            prompt_ar: 'اختر تصريف الماضي مع nosotros لفعل vivir:',
            options: ['vivimos', 'vivieron', 'vivisteis', 'vivió'],
            correctAnswer: 'vivimos',
            explanation_en: 'The "nosotros" form for -ir verbs is "vivimos" in both present and preterite.',
            explanation_ar: 'تصريف nosotros لأفعال -ir في الماضي والحاضر ينتهي بـ -imos (vivimos).'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences about what you ate, drank, and wrote last week.',
          prompt_ar: 'اكتب 3 جمل عما أكلته وشربته وكتبته في الأسبوع الماضي.',
          minSentences: 3,
          sampleTarget: 'El fin de semana comí paella en un restaurante cerca del mar. Bebí zumo de naranja natural. También escribí una carta a mis amigos.'
        }
      },
      {
        id: 'lesson-a1-10-3',
        unitId: 'unit-a1-10',
        lessonNumber: 3,
        title_es: 'El Fin de Semana Pasado: FUI y ESTUVE',
        title_en: 'Last Weekend: IR / SER & ESTAR in the Past',
        title_ar: 'عطلة نهاية الأسبوع: الأفعال الشاذة Fui و Estuve',
        cefr: 'A1',
        objectives_en: ['Master the irregular preterite of IR/SER (fui, fuiste, fue, fuimos, fuisteis, fueron)', 'Master ESTAR in preterite (estuve, estuviste, estuvo, estuvimos, estuvieron)', 'Narrate weekend trips and locations'],
        objectives_ar: ['إتقان تصريف فعل الذهاب/الكينونة في الماضي (Fui)', 'إتقان تصريف فعل التواجد في الماضي (Estuve)', 'سرد رحلات وأماكن التواجد في العطلة'],
        vocabWordIds: ['w-fui', 'w-estuve', 'w-viaje', 'w-fin-de-semana', 'w-increible'],
        dialogue: [
          { speaker: 'Sonia', es: '¿Qué tal tu fin de semana?', en: 'How was your weekend?', ar: 'كيف كانت عطلة نهاية الأسبوع الخاصة بك؟' },
          { speaker: 'Héctor', es: '¡Fue increíble! Fui a Granada y estuve tres días visitando la Alhambra.', en: 'It was incredible! I went to Granada and was there three days visiting the Alhambra.', ar: 'كانت رائعة! ذهبت إلى غرناطة ومكثت ثلاثة أيام أزور قصر الحمراء.' }
        ],
        exercises: [
          {
            id: 'ex-a1-10-3-1',
            type: 'multiple_choice',
            prompt_es: 'Ayer yo ______ al supermercado para comprar comida.',
            prompt_en: 'Choose the correct preterite of IR for "yo":',
            prompt_ar: 'اختر تصريف فعل الذهاب في الماضي مع yo:',
            options: ['fui', 'fue', 'iba', 'voy'],
            correctAnswer: 'fui',
            explanation_en: '"Fui" is the irregular first-person preterite of IR (I went).',
            explanation_ar: '"Fui" هي صيغة المتكلم في الماضي لفعل IR (ذهبتُ).'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences narrating where you went last weekend and how the experience was.',
          prompt_ar: 'اكتب 3 جمل تسرد فيها أين ذهبت في عطلة نهاية الأسبوع الماضية وكيف كانت التجربة.',
          minSentences: 3,
          sampleTarget: 'El sábado fui al museo nacional con mi familia. La exposición de arte fue fascinante. Después estuve en una cafetería antigua del centro.'
        }
      },
      {
        id: 'lesson-a1-10-4',
        unitId: 'unit-a1-10',
        lessonNumber: 4,
        title_es: 'Marcadores Temporales del Pasado',
        title_en: 'Time Markers of the Past',
        title_ar: 'الظروف والمؤشرات الزمنية للماضي',
        cefr: 'A1',
        objectives_en: ['Use "el año pasado", "hace dos días", "el mes pasado", "el otro día"', 'Build chronological timelines of past events', 'Ask when past actions happened'],
        objectives_ar: ['استخدام تعبيرات العام الماضي، منذ يومين، الشهر الفائت', 'بناء تسلسل زمني للأحداث الماضية', 'السؤال عن توقيت وقوع الأحداث في الماضي'],
        vocabWordIds: ['w-hace', 'w-ano', 'w-mes', 'w-cuando', 'w-despues'],
        dialogue: [
          { speaker: 'Valeria', es: '¿Cuándo empezaste a aprender español?', en: 'When did you start learning Spanish?', ar: 'متى بدأت تعلم الإسبانية؟' },
          { speaker: 'Emilio', es: 'Empecé hace seis meses, y el mes pasado viajé a Madrid para practicarlo.', en: 'I started six months ago, and last month I traveled to Madrid to practice it.', ar: 'بدأت منذ ستة أشهر، وفي الشهر الماضي سافرت إلى مدريد لممارستها.' }
        ],
        exercises: [
          {
            id: 'ex-a1-10-4-1',
            type: 'multiple_choice',
            prompt_es: '"Hace tres días" significa en inglés:',
            prompt_en: '"Hace tres días" means in English:',
            prompt_ar: '"Hace tres días" تعني بالإنجليزية:',
            options: ['Three days ago', 'In three days', 'Three days later', 'For three days'],
            correctAnswer: 'Three days ago',
            explanation_en: '"Hace + time" expresses time elapsed in the past (ago).',
            explanation_ar: '"Hace + زمن" تعبر عن المدة المنقضية في الماضي (منذ). '
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences about major events in your life using "hace...", "el año pasado", and "ayer".',
          prompt_ar: 'اكتب 3 جمل عن أحداث مهمة في حياتك باستخدام hace و el año pasado و ayer.',
          minSentences: 3,
          sampleTarget: 'Hace dos años me gradué de la universidad. El año pasado empecé un nuevo trabajo muy emocionante. Ayer terminé mi primer proyecto grande.'
        }
      }
    ]
  }
];
