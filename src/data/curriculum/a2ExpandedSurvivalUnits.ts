import { Unit, Lesson, ExerciseType } from '../../types';

export const A2_EXPANDED_SURVIVAL_UNITS: Unit[] = [];

const specs = [
  {
    unitNumber: 27,
    title_es: 'Misión: Gastronomía Avanzada y Cocina de la Abuela',
    title_en: 'Mission: Advanced Gastronomy & Grandma\'s Kitchen',
    title_ar: 'مهمة: فن الطهي المتقدم ومطبخ الجدة',
    description_en: 'Navigate regional Spanish cooking, master culinary action verbs, and give direct cooking recipes using the imperative mood.',
    description_ar: 'تصفح فن الطهي الإسباني الإقليمي، إتقان أفعال الطهي الحركية، وتقديم وصفات طبخ مباشرة باستخدام صيغة الأمر.',
    lessons: [
      {
        lessonNumber: 1,
        title_es: 'Almorzando en la Taquería de la Esquina: "¿De qué va la salsa?"',
        title_en: 'Lunch at the Local Taqueria: "What\'s the salsa made of?"',
        title_ar: 'الغداء في تاكيريا الحي: "مما تتكون الصلصة الحارة؟"',
        objectives_en: ['Order specialty dishes with complex custom toppings', 'Inquire about precise ingredient origins and recipes', 'Describe distinct levels of spiciness and flavors'],
        objectives_ar: ['طلب الأطباق المميزة بإضافات وتعديلات مخصصة ومعقدة', 'الاستفسار عن منشأ المكونات والوصفات بدقة', 'وصف مستويات الحرارة المختلفة والنكهات بدقة متناهية'],
        vocabWordIds: ['gastronomía', 'sabor', 'picante', 'restaurante', 'tradición'],
        dialogue: [
          { speaker: 'Huésped', es: 'Disculpe, me gustaría probar los tacos de mole. ¿De qué va la salsa?', en: 'Excuse me, I\'d like to try the mole tacos. What\'s the sauce made of?', ar: 'لو سمحت، أود تجربة تاكو بصلصة المولي. مما تتكون هذه الصلصة؟' },
          { speaker: 'Mesero', es: 'Lleva chiles secos, chocolate, especias y almendras. Tiene un sabor exquisito y un toque picante.', en: 'It has dried chilies, chocolate, spices, and almonds. It has an exquisite flavor and a touch of spice.', ar: 'تتكون من فلفل مجفف، شوكولاتة، بهارات، ولوز. لها مذاق فريد ولمسة حارة خفيفة.' },
          { speaker: 'Huésped', es: 'Suena espectacular. Tráigame una orden, por favor.', en: 'Sounds spectacular. Bring me an order, please.', ar: 'تبدو مذهلة ومغرية للغاية. أحضر لي طلباً منها من فضلك.' }
        ],
        exercises: [
          {
            id: 'ex-a2-27-1-1',
            type: 'multiple_choice',
            prompt_es: '¿Qué significa "¿De qué va la salsa?" en un contexto gastronómico?',
            prompt_en: 'What does "¿De qué va la salsa?" mean in a culinary context?',
            prompt_ar: 'ماذا تعني عبارة "¿De qué va la salsa?" في السياق الغذائي؟',
            options: ['What is the sauce made of / what is it about?', 'Is the sauce clean?', 'Where is the salsa dancer?', 'I do not want sauce'],
            correctAnswer: 'What is the sauce made of / what is it about?',
            explanation_en: 'This is a highly colloquial way to ask about the ingredients or nature of a sauce or dish.',
            explanation_ar: 'هذه طريقة عامية ممتازة وشائعة جداً للسؤال عن مكونات الصلصة أو طبيعة الطبق.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 3-sentence dialogue at a restaurant ordering an authentic dish and asking about its ingredients.',
          prompt_ar: 'اكتب حواراً من 3 جمل في مطعم تطلب فيه طبقاً محلياً وتستفسر عن مكوناته بدقة.',
          minSentences: 3,
          sampleTarget: '— Buenas tardes, quiero probar la paella valenciana. ¿Qué ingredientes lleva? — Lleva arroz, pollo, judías verdes y azafrán de gran calidad. — Excelente, por favor póngame una ración.'
        }
      },
      {
        lessonNumber: 2,
        title_es: 'El Arte del Mole Poblano: "Lleva más de veinte ingredientes"',
        title_en: 'The Art of Mole: "It has over twenty ingredients"',
        title_ar: 'فن صلصة المولي: "تحتوي على أكثر من عشرين مكوناً"',
        objectives_en: ['Discuss complex regional food histories', 'Express appreciation for slow-cooked culinary traditions', 'Describe delicate textures and taste nuances'],
        objectives_ar: ['مناقشة تاريخ الأطعمة الإقليمية المعقدة بطلاقة', 'التعبير عن التقدير لتقاليد الطهي البطيء والتقليدي', 'وصف قوام الأغذية الدقيق والنبرات المذاقية المتميزة'],
        vocabWordIds: ['ingrediente', 'exótico', 'sabor', 'dulce', 'cocinar'],
        dialogue: [
          { speaker: 'Cliente', es: 'Este mole poblano es increíble. Tiene notas dulces y saladas a la vez.', en: 'This mole poblano is incredible. It has sweet and salty notes at the same time.', ar: 'صلصة المولي هذه مذهلة وممتازة. تجمع بين نبرات حلوة ومالحة في ذات الوقت.' },
          { speaker: 'Cocinero', es: 'Es que lleva más de veinte ingredientes y se cocina a fuego lento por horas.', en: 'That\'s because it has over twenty ingredients and is slow-cooked for hours.', ar: 'ذلك لأنها تحتوي على أكثر من عشرين مكوناً وتُطبخ على نار هادئة لساعات طويلة.' },
          { speaker: 'Cliente', es: 'Es una verdadera obra de arte gastronómica. ¡Mis felicitaciones!', en: 'It is a true gastronomic masterpiece. My congratulations!', ar: 'إنها بحق تحفة فنية في عالم الطهي. تهاني الحارة لك!' }
        ]
      },
      {
        lessonNumber: 3,
        title_es: 'La Receta de la Abuela: "Échale una pizca de sal"',
        title_en: 'Grandma\'s Recipe: "Toss in a pinch of salt"',
        title_ar: 'وصفة الجدة: "أضف رشة صغيرة من الملح"',
        objectives_en: ['Use the informal imperative mood for instructions', 'Measure cooking quantities (pizca, cucharada, chorrito)', 'Sequential recipe transition markers'],
        objectives_ar: ['استخدام صيغة الأمر غير الرسمي (imperativo) لتقديم التعليمات والوصفات', 'تحديد كميات الطهي بدقة (رشة، ملعقة، قطرة زيت)', 'استخدام أدوات التتابع المتسلسل لخطوات الوصفة'],
        vocabWordIds: ['receta', 'hervir', 'freír', 'sabor', 'cocinar'],
        dialogue: [
          { speaker: 'Abuela', es: 'Primero corta la cebolla fina, luego fríela en la sartén con un chorrito de aceite.', en: 'First chop the onion finely, then fry it in the pan with a splash of oil.', ar: 'أولاً قطّع البصل ناعماً، ثم اقله في المقلاة بقطرة من زيت الزيتون.' },
          { speaker: 'Nieto', es: '¿Y cuándo echo las especias y los tomates?', en: 'And when do I throw in the spices and tomatoes?', ar: 'ومتى أضيف البهارات والطماطم؟' },
          { speaker: 'Abuela', es: 'Cuando la cebolla esté dorada, échalos y ponle una pizca de sal.', en: 'When the onion is golden, throw them in and add a pinch of salt.', ar: 'عندما يصبح البصل ذهبياً، أضفهم ورش رشة صغيرة من الملح.' }
        ]
      },
      {
        lessonNumber: 4,
        title_es: 'Cena de Gala y Maridaje: "Este tinto le va genial"',
        title_en: 'Gala Dinner & Pairings: "This red wine goes great with it"',
        title_ar: 'عشاء فاخر وتناغم المذاق: "هذا النبيذ أو العصير يتناسب معها تماماً"',
        objectives_en: ['Recommend appropriate food and beverage pairings', 'Describe textures (crujiente, cremoso, suave)', 'Formulate elegant reviews of dining experiences'],
        objectives_ar: ['التوصية بتناغم وتناسق الأطعمة والمشروبات بأسلوب احترافي', 'وصف قوام الأطعمة (مقرمش، كريمي، ناعم)', 'صياغة مراجعات وتقييمات أنيقة لتجارب عشاء فاخرة'],
        vocabWordIds: ['recomendar', 'exquisito', 'restaurante', 'sabor', 'servicio'],
        dialogue: [
          { speaker: 'Sommelier', es: 'Para acompañar la carne asada, le recomiendo este vino tinto de Rioja. Le va genial.', en: 'To accompany the grilled meat, I recommend this Rioja red wine. It pairs great with it.', ar: 'لمرافقة اللحم المشوي، أنصحكم بهذا العصير العنب الفاخر من ريوخا (Rioja). يتناغم معه تماماً.' },
          { speaker: 'Cliente', es: 'Excelente sugerencia. La carne está súper tierna y el maridaje es exquisito.', en: 'Excellent suggestion. The meat is super tender and the pairing is exquisite.', ar: 'اقتراح رائع ومثالي. اللحم طري للغاية والتناغم المذاقي رائع.' },
          { speaker: 'Sommelier', es: 'Me alegro mucho. Que disfruten de su cena de gala.', en: 'I\'m very glad. Enjoy your gala dinner.', ar: 'أنا سعيد جداً بذلك. أتمنى لكم عشاءً فاخراً وممتعاً.' }
        ]
      }
    ]
  },
  {
    unitNumber: 28,
    title_es: 'Misión: Negociación y Resolución de Conflictos',
    title_en: 'Mission: Negotiation & Dispute Resolutions',
    title_ar: 'مهمة: التفاوض وحل النزاعات الحضرية',
    description_en: 'Negotiate rental prices, handle Airbnb heating complaints, and file emergency lost reports.',
    description_ar: 'التفاوض على أسعار الإيجار، التعامل مع شكاوى التدفئة في الشقق السياحية، وتقديم بلاغات فقدان الأمتعة والممتلكات.',
    lessons: [
      {
        lessonNumber: 1,
        title_es: 'Negociando un Alquiler: "Me parece un precio excesivo"',
        title_en: 'Negotiating Rent: "It seems like an excessive price"',
        title_ar: 'التفاوض على الإيجار: "يبدو لي السعر مبالغاً فيه"',
        objectives_en: ['Debate housing prices politely but firmly', 'Request financial modifications and deposit adjustments', 'Discuss lease terms and utility inclusions'],
        objectives_ar: ['مناقشة أسعار السكن بلباقة ولكن بحزم', 'طلب تعديلات مالية وتخفيضات في التأمين', 'مناقشة شروط عقد الإيجار ومشتملات فواتير الخدمات'],
        vocabWordIds: ['precio', 'decisión', 'gastar', 'solución', 'cambiar'],
        dialogue: [
          { speaker: 'Inquilino', es: 'Hola, me interesa mucho el piso, pero ochocientos euros me parece un precio excesivo.', en: 'Hello, I\'m very interested in the apartment, but 800 euros seems like an excessive price.', ar: 'مرحباً، أنا مهتم جداً بالشقة، ولكن 800 يورو يبدو لي سعراً مبالغاً فيه.' },
          { speaker: 'Casero', es: 'Bueno, el barrio es muy tranquilo y céntrico. Pero si firmamos por un año, puedo dejarlo en setecientos cincuenta.', en: 'Well, the neighborhood is very quiet and central. But if we sign for a year, I can lower it to 750.', ar: 'حسناً، الحي هادئ جداً وفي مركز المدينة. ولكن إذا وقعنا عقداً لمدة سنة، يمكنني تركه بـ 750 يورو.' },
          { speaker: 'Inquilino', es: 'Si incluye los gastos de agua y comunidad, cerramos el trato ahora.', en: 'If it includes water and community expenses, we close the deal now.', ar: 'إذا كان يشتمل على فواتير المياه ومصاريف الصيانة المشتركة، نتمم الاتفاق الآن.' }
        ]
      },
      {
        lessonNumber: 2,
        title_es: 'Problemas en el AirBnB: "La calefacción no funciona"',
        title_en: 'Airbnb Issues: "The heating is not working"',
        title_ar: 'مشكلات الشقق السياحية: "التدفئة لا تعمل"',
        objectives_en: ['Report maintenance failures firmly', 'Negotiate immediate technician visits or refunds', 'Use formal complaint vocabulary'],
        objectives_ar: ['الإبلاغ عن أعطال الصيانة بحزم ووضوح', 'التفاوض على إرسال فني فوري أو استرداد جزء من القيمة', 'استخدام مفردات تقديم الشكاوى الرسمية'],
        vocabWordIds: ['ayuda', 'malo', 'solución', 'calor', 'frío'],
        dialogue: [
          { speaker: 'Huésped', es: 'Hola, disculpa. Llevamos dos horas en el apartamento y la calefacción no funciona. Hace mucho frío.', en: 'Hello, excuse me. We\'ve been in the apartment for two hours and the heating isn\'t working. It\'s very cold.', ar: 'مرحباً، لو سمحت. نحن في الشقة منذ ساعتين والتدفئة لا تعمل. الجو بارد جداً هنا.' },
          { speaker: 'Anfitrión', es: 'Vaya, qué pena. Ayer funcionaba bien. Voy a llamar al técnico para que vaya mañana.', en: 'Oh, what a shame. Yesterday it was working fine. I will call the technician to go tomorrow.', ar: 'يا للأسف، هذا سيء. أمس كانت تعمل بشكل ممتاز. سأتصل بالفني ليأتي غداً صباحاً.' },
          { speaker: 'Huésped', es: 'Mañana es tarde, necesitamos una solución hoy o solicitaremos un reembolso.', en: 'Tomorrow is late, we need a solution today or we will request a refund.', ar: 'غداً متأخر جداً، نحتاج حلاً اليوم وإلا سنطالب باسترداد مالي فوري.' }
        ]
      },
      {
        lessonNumber: 3,
        title_es: 'Accidente Menor en la Calle: "¿Qué ha pasado aquí?"',
        title_en: 'Minor Street Accident: "What has happened here?"',
        title_ar: 'حادث بسيط في الشارع: "ماذا حدث هنا؟"',
        objectives_en: ['Explain unexpected mishaps to authorities and insurance companies', 'Describe precise physical collisions and locations', 'Exchange contact details systematically'],
        objectives_ar: ['شرح الأعطال والوقائع غير المتوقعة للسلطات وشركات التأمين', 'وصف التصادمات المادية والمواقع بدقة بالغة', 'تبادل بيانات الاتصال والتأمين بأسلوب منظم وسليم'],
        vocabWordIds: ['ayuda', 'calle', 'perderse', 'explicar', 'pasar'],
        dialogue: [
          { speaker: 'Policía', es: 'Buenas tardes. ¿Qué ha pasado aquí? ¿Están todos bien?', en: 'Good afternoon. What happened here? Is everyone okay?', ar: 'مساء الخير. ماذا حدث هنا؟ هل الجميع بخير؟' },
          { speaker: 'Conductor', es: 'Sí, todo bien. El coche de atrás no ha frenado a tiempo y ha golpeado mi parachoques.', en: 'Yes, all good. The car behind didn\'t brake in time and hit my bumper.', ar: 'نعم، الكل بخير. السيارة التي في الخلف لم تفرمل في الوقت المناسب وصدمت ممتص الصدمات الخاص بي.' },
          { speaker: 'Policía', es: 'De acuerdo. Intercambien sus datos de seguro y rellenen el parte amistoso.', en: 'Understood. Exchange your insurance details and fill out the amicable report.', ar: 'مفهوم. تبادلوا بيانات التأمين بينكم واملأوا استمارة التقرير الودي.' }
        ]
      },
      {
        lessonNumber: 4,
        title_es: 'En la Oficina de Correos: "Enviar un paquete urgente"',
        title_en: 'At the Post Office: "Sending an urgent package"',
        title_ar: 'في مكتب البريد: "إرسال طرد عاجل وسريع"',
        objectives_en: ['Specify shipping speeds (urgente, certificado)', 'Declare package contents and value for customs', 'Obtain tracking codes and verify addresses'],
        objectives_ar: ['تحديد سرعة الشحن (عاجل، مسجل ومضمون)', 'التصريح عن محتويات الطرود وقيمتها للجمارك', 'الحصول على رموز التتبع والتحقق من العناوين الدولية'],
        vocabWordIds: ['enviar', 'correo', 'recibir', 'precio', 'entrar'],
        dialogue: [
          { speaker: 'Cliente', es: 'Hola, quiero enviar este paquete urgente a El Cairo, por favor.', en: 'Hello, I want to send this urgent package to Cairo, please.', ar: 'مرحباً، أريد إرسال هذا الطرد العاجل والسريع إلى القاهرة من فضلك.' },
          { speaker: 'Empleado', es: 'Muy bien. ¿Contiene líquidos o baterías? ¿Qué valor tiene para la aduana?', en: 'Very well. Does it contain liquids or batteries? What value does it have for customs?', ar: 'حسن جداً. هل يحتوي على سوائل أو بطاريات؟ ما قيمته المصرح بها للجمارك؟' },
          { speaker: 'Cliente', es: 'No, solo son libros y dulces de regalo. El valor es de cincuenta euros.', en: 'No, only books and gift sweets. The value is fifty euros.', ar: 'لا، مجرد كتب وحلويات للهدايا. القيمة خمسون يورو.' }
        ]
      }
    ]
  },
  {
    unitNumber: 29,
    title_es: 'Misión: Inmersión Cultural y Reto de Fluidez A2',
    title_en: 'Mission: Cultural Immersion & A2 Fluency Challenge',
    title_ar: 'مهمة: الانغماس الثقافي وتحدي طلاقة المستوى A2',
    description_en: 'Chat with locals in neighborhood squares, tell spooky legends, conduct live community interviews, and complete the final A2 capstone.',
    description_ar: 'التحدث مع السكان المحليين في الساحات، سرد الأساطير المخيفة للحي، إجراء مقابلات حية، وإتمام مشروع تخرج A2 الأكبر.',
    lessons: [
      {
        lessonNumber: 1,
        title_es: 'Charlando en la Plaza: "Me flipa el ambiente"',
        title_en: 'Plaza Chat: "I\'m crazy about the vibe"',
        title_ar: 'دردشة الساحة العامة: "أنا معجب جداً بالأجواء هنا"',
        objectives_en: ['Express extreme enthusiasm using Spanish colloquialisms (me flipa)', 'Describe urban community atmospheres lively', 'Engage in spontaneous social commentary'],
        objectives_ar: ['التعبير عن الحماس الشديد باستخدام العامية الإسبانية (me flipa)', 'وصف أجواء المجتمع المحلي والساحات الحضرية بحيوية', 'المشاركة في تعليقات اجتماعية عفوية مع الأصدقاء'],
        vocabWordIds: ['gente', 'pueblo', 'celebrar', 'vida', 'compartir'],
        dialogue: [
          { speaker: 'Estudiante', es: 'Me flipa el ambiente de esta plaza los viernes por la noche. Hay tanta vida.', en: 'I\'m crazy about the vibe of this square on Friday nights. There is so much life.', ar: 'أنا معجب جداً بأجواء هذه الساحة في ليالي الجمعة. تضج بالحياة والحيوية.' },
          { speaker: 'Vecino', es: 'Sí, aquí la gente acostumbra a salir a cenar y charlar al aire libre. Es nuestra tradición.', en: 'Yes, here people usually go out to dine and chat in the open air. It is our tradition.', ar: 'نعم، اعتاد الناس هنا على الخروج للعشاء والدردشة في الهواء الطلق. هذا هو تقليدنا الحميم.' },
          { speaker: 'Estudiante', es: 'Es maravilloso. En mi país también nos encanta compartir momentos en la calle.', en: 'It is wonderful. In my country we also love sharing moments in the street.', ar: 'إنه أمر رائع وممتاز. في بلدي أيضاً نحب مشاركة اللحظات الجميلة في الشوارع.' }
        ]
      },
      {
        lessonNumber: 2,
        title_es: 'Leyendas de Coyoacán: "Cuentan que en esta casa..."',
        title_en: 'Coyoacan Legends: "They say that in this house..."',
        title_ar: 'أساطير حي كويواكان: "يروون أنه في هذا المنزل..."',
        objectives_en: ['Narrate neighborhood spooky urban legends', 'Use preterite/imperfect structures for atmospheric stories', 'Express suspense and surprise effectively'],
        objectives_ar: ['سرد الأساطير والقصص الحضرية المرعبة للحي', 'استخدام قواعد الماضي البسيط والمستمر لرواية الحكايات المشوقة', 'التعبير عن التشويق والمفاجأة بأسلوب حكائي بليغ'],
        vocabWordIds: ['leyenda', 'misterio', 'historia', 'noche', 'antiguo'],
        dialogue: [
          { speaker: 'Guía', es: 'Cuentan que en esta casa del callejón vivía una mujer misteriosa en el siglo diecinueve.', en: 'They say that in this alleyway house a mysterious woman lived in the 19th century.', ar: 'يروون أنه في هذا المنزل القديم بالزقاق كانت تعيش امرأة غامضة في القرن التاسع عشر.' },
          { speaker: 'Estudiante', es: '¿Y qué pasó con ella? La atmósfera del lugar da un poco de miedo.', en: 'And what happened to her? The atmosphere of the place is a bit scary.', ar: 'وماذا حدث لها؟ إن أجواء المكان مخيفة ومرعبة بعض الشيء.' },
          { speaker: 'Guía', es: 'Desapareció una noche de tormenta y muchos dicen que aún escuchan sus pasos.', en: 'She disappeared on a stormy night and many say they still hear her footsteps.', ar: 'لقد اختفت في ليلة عاصفة، وكثيرون يقولون إنهم لا يزالون يسمعون خطواتها الحزينة.' }
        ]
      },
      {
        lessonNumber: 3,
        title_es: 'La Entrevista Radial: "Cuéntanos de tu país..."',
        title_en: 'The Radio Interview: "Tell us about your country..."',
        title_ar: 'المقابلة الإذاعية: "حدثنا عن بلدك وثقافتك..."',
        objectives_en: ['Speak spontaneously during media/public opportunities', 'Compare hometown routines and cultures with Spanish ones', 'Incorporate polite interview openings and closings'],
        objectives_ar: ['التحدث بعفوية تامة في الفرص الإعلامية واللقاءات العامة', 'مقارنة عادات وروتين مدينتك الأم بالثقافة الإسبانية', 'استخدام افتتاحات وخاتمات المقابلات المهذبة بطلاقة'],
        vocabWordIds: ['explicar', 'opinión', 'cultura', 'compartir', 'hablar'],
        dialogue: [
          { speaker: 'Locutor', es: 'Hoy tenemos a Karim en nuestro programa. Cuéntanos de tu país, ¿cómo es la vida allí?', en: 'Today we have Karim on our show. Tell us about your country, what is life like there?', ar: 'اليوم نستضيف كريم في برنامجنا. حدثنا عن بلدك، كيف تبدو الحياة اليومية هناك؟' },
          { speaker: 'Karim', es: 'Pues El Cairo es una ciudad gigante que nunca duerme. La gente es súper acogedora y siempre hay comida deliciosa en la calle a cualquier hora.', en: 'Well Cairo is a giant city that never sleeps. The people are super welcoming and there is always delicious food in the street at any hour.', ar: 'حسناً، القاهرة مدينة عملاقة للغاية لا تنام أبداً. الناس هناك ودودون للغاية وهناك دائماً طعام شارع لذيذ في أي وقت.' },
          { speaker: 'Locutor', es: '¡Qué fascinante! Gracias por compartir tu cultura con nosotros hoy.', en: 'How fascinating! Thank you for sharing your culture with us today.', ar: 'يا له من أمر رائع ومشوق! شكراً لمشاركتك ثقافتك الغنية معنا اليوم.' }
        ]
      },
      {
        lessonNumber: 4,
        title_es: 'La Fiesta del Barrio: "¡Traigo unos tamales!"',
        title_en: 'The Block Party: "I brought some tamales!"',
        title_ar: 'احتفال الحي: "لقد أحضرت بعض فطائر التاماليس!"',
        objectives_en: ['Socialize at neighborhood block potlucks', 'Introduce regional culinary gifts proudly', 'Express compliments to other cooks'],
        objectives_ar: ['المشاركة الاجتماعية الفعالة في احتفالات ومآدب الحي المشتركة', 'تقديم أطباق وهدايا غذائية من بلدك بفخر واعتزاز', 'تبادل عبارات الإطراء والمدح لمهارات الطهاة الآخرين'],
        vocabWordIds: ['comida', 'celebrar', 'amigo', 'compartir', 'dulce'],
        dialogue: [
          { speaker: 'Vecina', es: '¡Karim, bienvenido a la fiesta del barrio! Qué bueno que has venido.', en: 'Karim, welcome to the block party! Great that you came.', ar: 'يا كريم، أهلاً بك في احتفال الحي الجميل! كم هو رائع أنك جئت اليوم.' },
          { speaker: 'Karim', es: '¡Hola! Muchas gracias. Traigo unos tamales calientes hechos por mí para compartir.', en: 'Hello! Thank you very much. I brought some hot tamales made by me to share.', ar: 'مرحباً! شكراً جزيلاً لكِ. لقد أحضرت بعض فطائر التاماليس الساخنة صنعتها بنفسي لنشاركها سوياً.' },
          { speaker: 'Vecina', es: '¡Madre mía! Qué delicia. Te van a llover cumplidos hoy, seguro.', en: 'My goodness! What a delight. You\'re going to be showered with compliments today, for sure.', ar: 'يا إلهي! يا لها من لذة وجمال. ستحظى بالكثير من الإطراء والمديح اليوم بالتأكيد.' }
        ]
      },
      {
        lessonNumber: 5,
        title_es: 'Reto Capstone: El Cortometraje de mi Nueva Vida A2',
        title_en: 'Capstone Challenge: Short Film of My New A2 Life',
        title_ar: 'تحدي التخرج: الفيلم القصير لحياتي الجديدة A2',
        objectives_en: ['Synthesize Level A2 milestones in a rich, multi-paragraph travel and life portfolio', 'Narrate complex past experiences and project future desires with excellent cohesion', 'Celebrate graduating to Intermediate Level B1!'],
        objectives_ar: ['دمج كل إنجازات ومكتسبات المستوى A2 في نص سيرة ومحطات حياة ثري ومتعدد الفقرات', 'سرد خبرات الماضي المعقدة والتعبير عن الخطط المستقبلية بترابط لغوي ممتاز', 'الاحتفال بالتخرج والانطلاق بكل فخر إلى المستوى المتوسط B1!'],
        vocabWordIds: ['proyecto', 'vida', 'fluidez', 'meta', 'éxito'],
        dialogue: [
          { speaker: 'Tutor IA', es: '¡Impresionante! Has dominado el nivel A2 con una fluidez práctica increíble. Ya puedes negociar, resolver problemas e integrarte culturalmente. ¡Bienvenido al nivel B1!', en: 'Impressive! You have mastered level A2 with incredible practical fluency. You can now negotiate, solve problems, and integrate culturally. Welcome to level B1!', ar: 'مذهل ومبهر بحق! لقد أتقنت المستوى A2 بطلاقة عملية رائعة وممتازة. أصبحت الآن قادراً على التفاوض، حل النزاعات، والانغماس الثقافي. أهلاً بك بفخر في المستوى المتوسط B1!' }
        ],
        exercises: [
          {
            id: 'ex-a2-capstone-survival-1',
            type: 'multiple_choice',
            prompt_es: 'Si un anfitrión te cobra un precio excesivo por un alquiler y quieres negociar con firmeza, dices:',
            prompt_en: 'If a host charges you an excessive price for a rental and you want to negotiate firmly, you say:',
            prompt_ar: 'إذا فرض عليك المالك سعراً مبالغاً فيه للإيجار وتريد التفاوض معه بحزم، تقول:',
            options: ['Me parece un precio excesivo, ¿podemos ajustarlo?', 'Me flipa el ambiente de este lugar', 'Tráigame un cortado, por favor', 'No hay agua caliente en el baño'],
            correctAnswer: 'Me parece un precio excesivo, ¿podemos ajustarlo?',
            explanation_en: '"Me parece un precio excesivo" is a highly precise and advanced collocation used to address overcharging firmly.',
            explanation_ar: '"Me parece un precio excesivo" هو تركيب حواري متقدم ودقيق للغاية لمعالجة ارتفاع الأسعار بحزم.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write your comprehensive A2 Capstone Portfolio (at least 6 sentences) detailing a rental negotiation, resolving a household dispute, ordering slow-cooked regional food, and sharing local legends.',
          prompt_ar: 'اكتب مقال تخرج المستوى A2 الشامل (6 جمل على الأقل) تصف فيها تفاوضاً على الإيجار، حل مشكلة منزلية، طلب طعام محلي، وسرد بعض أساطير الحي بطلاقة.',
          minSentences: 6,
          sampleTarget: 'Durante mi estancia en Coyoacán, negocié un alquiler porque ochocientos euros me parecía un precio excesivo y el casero lo bajó a setecientos cincuenta. Un día la calefacción no funcionaba y le exigí una solución rápida para evitar el frío. Me encantaba comer mole poblano en la taquería de la esquina y el mesero me explicó que llevaba más de veinte ingredientes. Por las noches charlaba con los vecinos en la plaza y me contaban leyendas misteriosas sobre fantasmas antiguos de la calle. He aprendido a resolver cualquier problema de la vida diaria en español. ¡Espero seguir creciendo con la misma pasión en el nivel B1!'
        }
      }
    ]
  }
];

// Map specs to correct structure and export
specs.forEach(spec => {
  const unitId = `unit-a2-${spec.unitNumber}`;
  const lessons: Lesson[] = spec.lessons.map(les => ({
    id: `lesson-a2-${spec.unitNumber}-${les.lessonNumber}`,
    unitId: unitId,
    lessonNumber: les.lessonNumber,
    title_es: les.title_es,
    title_en: les.title_en,
    title_ar: les.title_ar,
    cefr: 'A2',
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
      prompt_en: `Write 3 sentences using the conversational chunks learned in '${les.title_en}'.`,
      prompt_ar: `اكتب 3 جمل مفيدة مستخدماً التراكيب الحوارية التي تعلمتها في '${les.title_es}'.`,
      minSentences: 3,
      sampleTarget: 'Me parece un precio excesivo por el piso. Exijo una solución hoy mismo. Muchas gracias por su ayuda.'
    }
  }));

  A2_EXPANDED_SURVIVAL_UNITS.push({
    id: unitId,
    level: 'A2',
    unitNumber: spec.unitNumber,
    title_es: spec.title_es,
    title_en: spec.title_en,
    title_ar: spec.title_ar,
    description_en: spec.description_en,
    description_ar: spec.description_ar,
    lessons: lessons
  });
});
