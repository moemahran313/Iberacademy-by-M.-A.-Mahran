import { ComprehensibleStory } from '../types';

export const MEXICO_ARGENTINA_STORIES: ComprehensibleStory[] = [
  // ==========================================
  // LEVEL A1: ABSOLUTE BEGINNER (8 STORIES)
  // ==========================================
  {
    id: 'story-mx-1',
    title_es: 'Un Tianguis Lleno de Color en Coyoacán',
    title_en: 'A Colorful Open-Air Market in Coyoacán',
    title_ar: 'سوق شعبي مليء بالألوان في كويواكان',
    cefr: 'A1',
    difficulty: 'Easy',
    wordCount: 135,
    audioDurationSec: 60,
    paragraphs: [
      {
        es: 'Elena camina por el tianguis de Coyoacán en la Ciudad de México. El mercado al aire libre tiene frutas frescas, verduras y artesanías mexicanas de muchos colores.',
        en: 'Elena walks through the tianguis (open-air market) of Coyoacán in Mexico City. The outdoor market has fresh fruits, vegetables, and colorful Mexican handicrafts.',
        ar: 'تسير إلينا في سوق "تيانغيس" (السوق الشعبي) في كويواكان بمدينة مكسيكو. يحتوي السوق المفتوح على فواكه طازجة وخضروات ومشغولات يدوية مكسيكية متعددة الألوان.'
      },
      {
        es: 'Elena habla con un vendedor amable y pregunta: "¿Cuánto cuesta esta piña dulce?". El vendedor sonríe y responde: "Cuesta veinte pesos, señorita".',
        en: 'Elena talks to a friendly vendor and asks: "How much is this sweet pineapple?". The vendor smiles and answers: "It costs twenty pesos, miss."',
        ar: 'تتحدث إلينا مع بائع ودود وتسأل: "بكم هذا الأناناس الحلو؟". يبتسم البائع ويجيب: "سعره عشرون بيزو، يا أنسة".'
      },
      {
        es: 'Elena compra la piña y unos mangos jugosos. Le encanta comprar en el tianguis porque todo es fresco, bonito y muy barato.',
        en: 'Elena buys the pineapple and some juicy mangoes. She loves buying at the tianguis because everything is fresh, pretty, and very cheap.',
        ar: 'تشتري إلينا الأناناس وبعض المانجو العصيرية. تحب الشراء من السوق الشعبي لأن كل شيء طازج وجميل ورخيص جداً.'
      }
    ],
    vocabHighlights: [
      { word: 'tianguis', en: 'open-air market (Mexico)', ar: 'سوق شعبي مفتوح (المكسيك)' },
      { word: 'artesanías', en: 'handicrafts', ar: 'مشغولات يدوية' },
      { word: 'cuánto cuesta', en: 'how much does it cost', ar: 'بكم هذا / ما سعره' }
    ],
    grammarHighlights: ['Present tense verbs (camina, habla, cuesta)', 'Demonstrative adjectives (esta piña)', 'Plural agreement (mangos jugosos)'],
    comprehensionQuiz: [
      {
        question_es: '¿Qué compra Elena en el tianguis?',
        question_en: 'What does Elena buy at the tianguis?',
        question_ar: 'ماذا تشتري إلينا من السوق الشعبي؟',
        options: ['Zapato y ropa', 'Una piña y mangos jugosos', 'Un libro de historia', 'Un coche azul'],
        answerIdx: 1,
        explanation_en: 'Elena buys a sweet pineapple and juicy mangoes from the market vendor.',
        explanation_ar: 'اشترت إلينا أناناسة حلوة ومانجو عصيرية من بائع السوق.'
      }
    ]
  },
  {
    id: 'story-arg-1',
    title_es: 'Un Mate en los Bosques de Palermo',
    title_en: 'A Mate in the Woods of Palermo',
    title_ar: 'مشروب الماتي في حدائق باليرمو',
    cefr: 'A1',
    difficulty: 'Easy',
    wordCount: 140,
    audioDurationSec: 62,
    paragraphs: [
      {
        es: 'Hoy es un sábado soleado en Buenos Aires, Argentina. Lucas y Sofía caminan hacia los Bosques de Palermo para tomar mate bajo la sombra de un gran árbol.',
        en: 'Today is a sunny Saturday in Buenos Aires, Argentina. Lucas and Sofía walk towards the Woods of Palermo to drink mate under the shade of a big tree.',
        ar: 'اليوم هو سبت مشمس في بوانس آيرس، الأرجنتين. يسير لوكاس وصوفيا نحو حدائق باليرمو لشرب الماتي تحت ظلال شجرة كبيرة.'
      },
      {
        es: 'Lucas lleva el termo con agua caliente, el calabazo y la bombilla de metal. Sofía abre una bolsa con facturas dulces, especialmente medialunas calientes.',
        en: 'Lucas carries the thermos with hot water, the gourd, and the metal straw (bombilla). Sofía opens a bag with sweet pastries (facturas), especially warm croissants (medialunas).',
        ar: 'يحمل لوكاس الثرموس المحتوي على الماء الساخن، وكأس الماتي (الكالاباصو) والمصاصة المعدنية (البومبيخا). تفتح صوفيا كيس مخبوزات حلوة (فاكتوراس)، وخاصة الميداليوناس الساخنة.'
      },
      {
        es: 'Ellos comparten el mate en ronda y conversan sobre la universidad. En Argentina, tomar mate no es solo beber una infusión, es compartir la amistad.',
        en: 'They share the mate in a circle and talk about university. In Argentina, drinking mate is not just drinking a tea, it is sharing friendship.',
        ar: 'يتشاركون الماتي في حلقة ويتحدثون عن الجامعة. في الأرجنتين، شرب الماتي ليس مجرد احتساء مشروب، بل هو مشاركة للصداقة.'
      }
    ],
    vocabHighlights: [
      { word: 'mate', en: 'herbal tea drink (Argentina)', ar: 'مشروب الماتي الشائع في الأرجنتين' },
      { word: 'bombilla', en: 'metal straw for mate', ar: 'مصاصة معدنية للماتي' },
      { word: 'facturas', en: 'sweet pastries / croissants', ar: 'مخبوزات أرجنتينية حلوة' }
    ],
    grammarHighlights: ['Verb llevar with physical objects', 'Infinitives after verbs (para tomar mate)', 'Verb compartir in present tense'],
    comprehensionQuiz: [
      {
        question_es: '¿Qué comida dulce lleva Sofía para acompañar el mate?',
        question_en: 'What sweet food does Sofía bring to accompany the mate?',
        question_ar: 'ما هو الطعام الحلو الذي أحضرته صوفيا مع الماتي؟',
        options: ['Tacos de canasta', 'Facturas y medialunas', 'Empanadas de carne', 'Churros con dulce de leche'],
        answerIdx: 1,
        explanation_en: 'Sofía brings facturas, especially warm medialunas (croissants).',
        explanation_ar: 'أحضرت صوفيا المخبوزات الحلوة (facturas) وخاصة الكرواسون الدافئ (medialunas).'
      }
    ]
  },
  {
    id: 'story-mx-2',
    title_es: 'Tacos de Canasta en el Centro Histórico',
    title_en: 'Basket Tacos in the Historic Center',
    title_ar: 'تاكو السلة في المركز التاريخي',
    cefr: 'A1',
    difficulty: 'Easy',
    wordCount: 130,
    audioDurationSec: 58,
    paragraphs: [
      {
        es: 'Don Pedro rueda su bicicleta por las calles del Centro Histórico de la Ciudad de México. En la parte trasera de la bicicleta lleva una canasta grande cubierta con plástico azul.',
        en: 'Don Pedro rides his bicycle through the streets of the Historic Center of Mexico City. On the back of the bicycle, he carries a large basket covered with blue plastic.',
        ar: 'يقود دون بيدرو دراجته في شوارع المركز التاريخي لمدينة مكسيكو. وفي الجزء الخلفي من الدراجة يحمل سلة كبيرة مغطاة بالبلاستيك الأزرق.'
      },
      {
        es: '¡Hay tacos de canasta calientitos! Tiene tacos de chicharrón prensado, papa, frijol y adobo. Muchos trabajadores de la zona hacen fila para desayunar.',
        en: 'There are warm basket tacos! He has tacos filled with pressed pork rind, potato, beans, and marinated meat. Many local workers line up to eat breakfast.',
        ar: 'يوجد تاكو سلة ساخن! لديه تاكو بجلد الخنزير، والبطاطس، والفول، واللحم المتبل. يقف العديد من العمال في المنطقة في صف لتناول الافطار.'
      },
      {
        es: 'Mateo pide tres tacos de papa con salsa verde de chile serrano. Paga solo treinta pesos y dice: "¡Están riquísimos, Don Pedro!".',
        en: 'Mateo orders three potato tacos with green serrano pepper salsa. He pays only thirty pesos and says: "They are delicious, Don Pedro!".',
        ar: 'يطرد ماتيو ثلاثة تاكو بالبطاطس مع الصلصة الخضراء الحارة. يدفع ثلاثين بيزو فقط ويقول: "إنها لديدة جداً يا دون بيدرو!".'
      }
    ],
    vocabHighlights: [
      { word: 'tacos de canasta', en: 'steamed basket tacos', ar: 'تاكو السلة المكسيكي الساخن' },
      { word: 'hacer fila', en: 'to stand in line / queue', ar: 'الوقوف في صف' },
      { word: 'riquísimo', en: 'extremely delicious', ar: 'لذيذ جداً' }
    ],
    grammarHighlights: ['Expressing quantity (tres tacos)', 'Exclamatory expressions (¡Están riquísimos!)', 'Present tense verbs (rueda, lleva, pide)'],
    comprehensionQuiz: [
      {
        question_es: '¿Cómo transporta Don Pedro sus tacos?',
        question_en: 'How does Don Pedro transport his tacos?',
        question_ar: 'كيف ينقل دون بيدرو التاكو الخاص به؟',
        options: ['En un camión grande', 'En una bicicleta con una canasta', 'En un barco por el canal', 'En un metro rápido'],
        answerIdx: 1,
        explanation_en: 'Don Pedro transports his steamed tacos in a basket mounted on his bicycle.',
        explanation_ar: 'ينقل دون بيدرو التاكو الخاص به في سلة مثبته على دراجته.'
      }
    ]
  },
  {
    id: 'story-arg-2',
    title_es: 'El Colectivo 60 por las Calles de Buenos Aires',
    title_en: 'Bus Line 60 Through Buenos Aires Streets',
    title_ar: 'حافلة الخط 60 في شوارع بوانس آيرس',
    cefr: 'A1',
    difficulty: 'Easy',
    wordCount: 135,
    audioDurationSec: 60,
    paragraphs: [
      {
        es: 'Martín espera el colectivo número sesenta en la parada cerca del Obelisco en Buenos Aires. Lleva su tarjeta SUBE en la mano para pagar el pasaje.',
        en: 'Martín waits for bus number 60 at the bus stop near the Obelisk in Buenos Aires. He holds his SUBE transit card in his hand to pay the fare.',
        ar: 'ينتظر مارتين حافلة (كوليكتيبو) رقم 60 في المحطة القريبة من المسلة في بوانس آيرس. يحمل بطاقة "SUBE" في يده لدفغ أجرة الركوب.'
      },
      {
        es: 'El colectivo llega rápido. Martín sube, apoya la tarjeta en la máquina lectora y busca un asiento junto a la ventana para mirar la ciudad.',
        en: 'The bus arrives quickly. Martín gets on, taps his card on the reader machine, and looks for a seat next to the window to watch the city.',
        ar: 'تصل الحافلة بسرعة. يصعد مارتين، ويضع البطاقة على جهاز القراءة، ويبحث عن مقعد بجوار النافذة لمشاهدة المدينة.'
      },
      {
        es: 'Observa los edificios antiguos de la Avenida de Mayo y los cafés con gente leyendo el periódico. Le gusta mucho viajar en colectivo por su ciudad natal.',
        en: 'He observes the old buildings on Avenida de Mayo and the cafes with people reading the newspaper. He really likes traveling by bus through his hometown.',
        ar: 'يشاهد المباني القديمة في شارع المايو والمقاهي المليئة بأناس يقرؤون الصحف. يحب كثيراً السفر بالحافلة في مدينته المسقط.'
      }
    ],
    vocabHighlights: [
      { word: 'colectivo', en: 'city bus (Argentina)', ar: 'حافلة المدينة (الأرجنتين)' },
      { word: 'tarjeta SUBE', en: 'transit payment card', ar: 'بطاقة مواصلات SUBE الأرجنتينية' },
      { word: 'parada', en: 'bus stop', ar: 'موقف الحافلة' }
    ],
    grammarHighlights: ['Verbs of motion (espera, sube, llega)', 'Prepositions (cerca de, junto a, por)', 'Gerund structure (leyendo)'],
    comprehensionQuiz: [
      {
        question_es: '¿Qué usa Martín para pagar su pasaje de colectivo?',
        question_en: 'What does Martín use to pay his bus fare?',
        question_ar: 'ماذا يستخدم مارتين لدفع أجرة الحافلة؟',
        options: ['Dinero en efectivo', 'Una tarjeta SUBE', 'Un billete de avión', 'Una ficha de metal'],
        answerIdx: 1,
        explanation_en: 'In Buenos Aires, passengers use the SUBE card to pay for bus and subway rides.',
        explanation_ar: 'في بوانس آيرس، يستخدم الركاب بطاقة SUBE لدفع رسوم الحافلات والمترو.'
      }
    ]
  },
  {
    id: 'story-mx-3',
    title_es: 'Un Paseo Alegre por Xochimilco',
    title_en: 'A Joyful Ride in Xochimilco',
    title_ar: 'جولة ممتعة في زوتشيميلكو',
    cefr: 'A1',
    difficulty: 'Easy',
    wordCount: 140,
    audioDurationSec: 62,
    paragraphs: [
      {
        es: 'La familia Gómez visita los canales de Xochimilco en el sur de la Ciudad de México. Alquilan una trajinera de madera pintada con flores amarillas y rojas.',
        en: 'The Gómez family visits the canals of Xochimilco in southern Mexico City. They rent a wooden trajinera boat painted with yellow and red flowers.',
        ar: 'تزور عائلة غوميز قنوات زوتشيميلكو في جنوب مدينة مكسيكو. يستأجرون قارب "تراجينيرا" خشبياً مدهوناً بأزهار صفراء وحمراء.'
      },
      {
        es: 'La trajinera flota despacio sobre el agua tranquila. Mientras navegan, escuchan a un grupo de mariachis que canta canciones mexicanas tradicionales con guitarras.',
        en: 'The boat floats slowly on the calm water. As they navigate, they listen to a mariachi group singing traditional Mexican songs with guitars.',
        ar: 'يطفو القارب ببطء على المياه الهادئة. وبينما يبحرون، يستمعون إلى فرقة مارياتشي تغني أغاني مكسيكية تقليدية بالجيتار.'
      },
      {
        es: 'Comen elotes con mayonesa y queso fresco que compran a una vendedora en otra pequeña barca. Es un día lleno de música, alegría y tradición.',
        en: 'They eat corn on the cob with mayonnaise and fresh cheese bought from a vendor in another small boat. It is a day full of music, joy, and tradition.',
        ar: 'يأكلون الذرة المشوية مع المايونيز والجبن الطازج الذي اشتروه من بائعة في قارب صغير آخر. إنه يوم مليء بالموسيقى والفرح والتقاليد.'
      }
    ],
    vocabHighlights: [
      { word: 'trajinera', en: 'flat-bottomed wooden boat', ar: 'قارب خشب تقليدي مسطح في زوتشيميلكو' },
      { word: 'elotes', en: 'corn on the cob (Mexico)', ar: 'ذرة مشوية / مسلوقة (المكسيك)' },
      { word: 'mariachi', en: 'traditional Mexican musician group', ar: 'فرقة عزف مارياتشي مكسيكية' }
    ],
    grammarHighlights: ['Adjectives describing objects (madera pintada, agua tranquila)', 'Temporal connectors (mientras)', 'Descriptive adjectives (lleno de)'],
    comprehensionQuiz: [
      {
        question_es: '¿Qué tipo de embarcación alquila la familia Gómez?',
        question_en: 'What kind of boat does the Gómez family rent?',
        question_ar: 'ما نوع القارب الذي استأجرته عائلة غوميز؟',
        options: ['Un yate moderno', 'Una trajinera de madera', 'Un kayak de plástico', 'Un crucero grande'],
        answerIdx: 1,
        explanation_en: 'They rent a trajinera, a traditional colorful wooden boat used in Xochimilco.',
        explanation_ar: 'استأجروا قارب تراجينيرا خشبياً تقليدياً ملوناً يستخدم في قنوات زوتشيميلكو.'
      }
    ]
  },
  {
    id: 'story-arg-3',
    title_es: 'Las Empanadas Tucumanas de la Abuela',
    title_en: 'Grandma\'s Tucumán Empanadas',
    title_ar: 'فطائر الإمبانادا الخاصة بالجدة',
    cefr: 'A1',
    difficulty: 'Easy',
    wordCount: 138,
    audioDurationSec: 61,
    paragraphs: [
      {
        es: 'En la cocina de la abuela Lucía, huele a comino, cebolla frita y carne cortada a cuchillo. Hoy enseña a su nieto Tomás a hacer empanadas tucumanas tradicionales.',
        en: 'In grandmother Lucía\'s kitchen, it smells of cumin, fried onion, and knife-cut meat. Today she teaches her grandson Tomás how to make traditional Tucumán empanadas.',
        ar: 'في مطبخ الجدة لوسيا، تفوح رائحة الكمون والبصل المقلي واللحم المفروم بالسكين. اليوم تعلّم حفيدها توماس كيفية صنع الإمبانادا التقليدية.'
      },
      {
        es: 'Tomás dobla la masa con los dedos haciendo el repulgue perfecto. Pone doce empanadas en una bandeja y las mete al horno bien caliente.',
        en: 'Tomás folds the dough with his fingers making the perfect braided edge (repulgue). He puts twelve empanadas on a tray and puts them into the very hot oven.',
        ar: 'يطوي توماس العجين بأصابعه صانعاً الحافة المعقودة المثالية (repulgue). يضع اثنتي عشرة إمبانادا في صينية ويدخلها الفرن الساخن.'
      },
      {
        es: 'Veinte minutos después, las empanadas están doradas y jugosas. La abuela prueba una y dice: "¡Sos un gran cocinero, Tomás!".',
        en: 'Twenty minutes later, the empanadas are golden and juicy. Grandmother tastes one and says: "You are a great cook, Tomás!".',
        ar: 'بعد عشرين دقيقة، أصبحت الإمبانادا ذهبية وعصيرية. تتذوق الجدة واحدة وتقول: "أنت طباخ رائع يا توماس!".'
      }
    ],
    vocabHighlights: [
      { word: 'corta a cuchillo', en: 'knife-cut (hand-diced meat)', ar: 'مقطع بالسكين يدوياً' },
      { word: 'repulgue', en: 'braided edge seam on empanadas', ar: 'طيّة العجين المعقودة للإمبانادا' },
      { word: 'sos (voseo)', en: 'you are (Argentine voseo for tú eres)', ar: 'أنت تكون (استخدام voseo الأرجنتيني)' }
    ],
    grammarHighlights: ['Basic Voseo form (sos)', 'Sequence words (veinte minutos después)', 'Sensory verbs (huele a)'],
    comprehensionQuiz: [
      {
        question_es: '¿Cómo aprende Tomás a cerrar la masa de la empanada?',
        question_en: 'How does Tomás learn to close the empanada dough?',
        question_ar: 'كيف يتعلم توماس إغلاق عجينة الإمبانادا؟',
        options: ['Usando un tenedor', 'Haciendo el repulgue con los dedos', 'Pegándola con agua fría', 'Cortándola con tijeras'],
        answerIdx: 1,
        explanation_en: 'He folds the dough with his fingers making the traditional braided edge called repulgue.',
        explanation_ar: 'يطوي العجين بأصابعه صانعاً طيّة العقدة التقليدية المسمّاة repulgue.'
      }
    ]
  },
  {
    id: 'story-mx-4',
    title_es: 'Un Domingo en el Zócalo de la Ciudad de México',
    title_en: 'A Sunday at the Zócalo in Mexico City',
    title_ar: 'يوم أحد في ساحة السوكالو بمدينة مكسيكو',
    cefr: 'A1',
    difficulty: 'Easy',
    wordCount: 135,
    audioDurationSec: 60,
    paragraphs: [
      {
        es: 'El Zócalo es la plaza principal de la Ciudad de México y una de las más grandes del mundo. Carlos camina por la gran plaza bajo el sol de la tarde.',
        en: 'The Zócalo is the main square of Mexico City and one of the largest in the world. Carlos walks through the massive square under the afternoon sun.',
        ar: 'السوكالو هي الساحة الرئيسية في مدينة مكسيكو وواحدة من أكبر الساحات في العالم. يسير كارلوس في الساحة الكبيرة تحت شمس الظهيرة.'
      },
      {
        es: 'En el centro ondea una enorme bandera mexicana con el águila y la serpiente. Al lado está la Catedral Metropolitana y el Palacio Nacional con sus paredes históricas.',
        en: 'In the center waves a huge Mexican flag with the eagle and serpent. Next to it is the Metropolitan Cathedral and the National Palace with its historic walls.',
        ar: 'في المنتصف يرفرف علم مكسيكي ضخم يضم النسر والأفعى. وبجانبه تقع الكاتدرائية الرئيسية والقصر الوطني بجدرانه التاريخية.'
      },
      {
        es: 'Carlos toma muchas fotografías con su teléfono. Siente mucha admiración al ver a bailarines tradicionales con plumas de colores que danzan cerca del Templo Mayor.',
        en: 'Carlos takes many photos with his phone. He feels great admiration watching traditional dancers with colorful feathers dancing near the Templo Mayor.',
        ar: 'يلتقط كارلوس العديد من الصور بهاتفه. يشعر بإعجاب كبير عندما يرى راقصين تقليديين بريش ملون يرقصون بالقرب من معبد تيمبلو مايور.'
      }
    ],
    vocabHighlights: [
      { word: 'Zócalo', en: 'main central square (Mexico)', ar: 'الساحة الرئيسية الكبرى (المكسيك)' },
      { word: 'bandera', en: 'flag', ar: 'علم / راية' },
      { word: 'plumas', en: 'feathers', ar: 'ريش' }
    ],
    grammarHighlights: ['Superlative adjectives (una de las más grandes)', 'Prepositions of location (en el centro, al lado, cerca de)', 'Mental state verbs (siente admiración)'],
    comprehensionQuiz: [
      {
        question_es: '¿Qué símbolo está en el centro de la bandera mexicana?',
        question_en: 'What symbol is in the center of the Mexican flag?',
        question_ar: 'ما هو الرمز الموجود في منتصف العلم المكسيكي؟',
        options: ['Un sol dorado', 'El águila y la serpiente', 'Un jaguar blanco', 'Una flor de cempasúchil'],
        answerIdx: 1,
        explanation_en: 'The Mexican flag features the golden eagle devouring a serpent on a cactus.',
        explanation_ar: 'يحتوي العلم المكسيكي على النسر الذهبي وهو يلتهم الأفعى فوق الصبار.'
      }
    ]
  },
  {
    id: 'story-arg-4',
    title_es: 'Viaje en el Subte A de Buenos Aires',
    title_en: 'Trip on Buenos Aires Subway Line A',
    title_ar: 'رحلة في مترو الأنفاق الخط A ببوانس آيرس',
    cefr: 'A1',
    difficulty: 'Easy',
    wordCount: 130,
    audioDurationSec: 58,
    paragraphs: [
      {
        es: 'Camila entra a la estación Plaza de Mayo para tomar la Línea A del Subte de Buenos Aires. Es la red de metro más antigua de toda América Latina.',
        en: 'Camila enters Plaza de Mayo station to take Line A of the Buenos Aires Subway (Subte). It is the oldest subway network in all of Latin America.',
        ar: 'تدخل كاميلا إلى محطة بلاثا دي مايو لركوب الخط A في مترو أنفاق بوانس آيرس (Subte). وهي أقدم شبكة مترو في أمريكا اللاتينية بأكملها.'
      },
      {
        es: 'Las estaciones conservan espejos antiguos, azulejos de colores y lámparas de época. El tren llega con su ruido característico y abre sus puertas.',
        en: 'The stations retain antique mirrors, colorful tiles, and vintage lamps. The train arrives with its characteristic noise and opens its doors.',
        ar: 'تحتفظ المحطات بمرآة قديمة، وسيراميك ملون، ومصابيح كلاسيكية. يصل القطار بضجيجه المميز ويفتح أبوابه.'
      },
      {
        es: 'Camila viaja hasta la estación San José de Flores para visitar a su amiga Valentina. Le encanta el encanto histórico del Subte porteño.',
        en: 'Camila travels to San José de Flores station to visit her friend Valentina. She loves the historical charm of the Buenos Aires subway.',
        ar: 'تسافر كاميلا إلى محطة سان خوسيه دي فلوريس لزيارة صديقتها فالنتينا. تحب السحر التاريخي لمترو بوانس آيرس.'
      }
    ],
    vocabHighlights: [
      { word: 'Subte', en: 'subway / metro (Argentina)', ar: 'مترو الأنفاق (الأرجنتين)' },
      { word: 'porteño', en: 'pertaining to Buenos Aires City', ar: 'خاص بمدينة بوانس آيرس / سكانها' },
      { word: 'azulejos', en: 'decorative ceramic tiles', ar: 'بلاط سيراميك ممتد ملون' }
    ],
    grammarHighlights: ['Comparative and superlative forms (más antigua)', 'Reflexive verbs in passive sense (conservan)', 'Directional preposition (hasta)'],
    comprehensionQuiz: [
      {
        question_es: '¿Por qué es famosa la Línea A del Subte de Buenos Aires?',
        question_en: 'Why is Line A of the Buenos Aires Subte famous?',
        question_ar: 'لماذا يشتهر الخط A في مترو بوانس آيرس؟',
        options: ['Es el más rápido del mundo', 'Es la red de metro más antigua de América Latina', 'Es un tren que flota sobre el agua', 'Es completamente gratuito'],
        answerIdx: 1,
        explanation_en: 'Inaugurated in 1913, Line A of the Buenos Aires Subte is the oldest subway line in Latin America.',
        explanation_ar: 'تأسس الخط A عام 1913 وهو أقدم خط مترو في أمريكا اللاتينية.'
      }
    ]
  },

  // ==========================================
  // LEVEL A2: ELEMENTARY EXPLORER (8 STORIES)
  // ==========================================
  {
    id: 'story-mx-5',
    title_es: 'Los Misteriosos Alebrijes de Oaxaca',
    title_en: 'The Mysterious Alebrijes of Oaxaca',
    title_ar: 'تماثيل الأليبريخيس الغامضة في أوكساكا',
    cefr: 'A2',
    difficulty: 'Moderate',
    wordCount: 170,
    audioDurationSec: 75,
    paragraphs: [
      {
        es: 'El año pasado, Mateo visitó el pintoresco pueblo de San Martín Tilcajete en Oaxaca, famoso mundialmente por sus artesanos que crean alebrijes.',
        en: 'Last year, Mateo visited the picturesque town of San Martín Tilcajete in Oaxaca, world-famous for its artisans who create alebrijes.',
        ar: 'في العام الماضي، زار ماتيو بلدة سان مارتين تيلكاخيتي الخلابة في أوكساكا، الشهيرة عالمياً بحرفييها الذين يصنعون تمثيلات "الأليبريخيس".'
      },
      {
        es: 'Un artesano llamado Don Manuel le mostró cómo talla la suave madera del árbol de copal con cuchillos tradicionales. Después, su hija pintó la figura con pinceles finos, aplicando patrones geométricos e historias ancestrales.',
        en: 'An artisan named Don Manuel showed him how he carves the soft wood of the copal tree with traditional knives. Afterward, his daughter painted the figure with fine brushes, applying geometric patterns and ancestral stories.',
        ar: 'أراه حرفي يُدعى دون مانويل كيف ينحت خشب شجرة "الكوبال" اللين بسكاكين تقليدية. وبعد ذلك، قامت ابنتة برسم التمثال بفرشاة دقيقة، مستخدمة أنماطاً هندسية وقصصاً من التراث.'
      },
      {
        es: 'Mateo aprendió que los alebrijes son criaturas fantásticas que combinan partes de distintos animales, como las alas de un águila con el cuerpo de un jaguar. Quedó fascinado y compró un alebrije para guardarlo como un amuleto mágico.',
        en: 'Mateo learned that alebrijes are fantastical creatures that combine parts of different animals, like the wings of an eagle with the body of a jaguar. He was fascinated and bought an alebrije to keep as a magical amulet.',
        ar: 'تعلم ماتيو أن الأليبريخيس هي مخلوقات خيالية تجمع بين أجزاء من حيوانات مختلفة، مثل أجنحة النسر مع جسد الفهد (الخنازير). ذُهل واشترى تمثالاً ليحتفظ به كتميمة سحرية.'
      }
    ],
    vocabHighlights: [
      { word: 'alebrije', en: 'folk-art fantastical creature sculpture', ar: 'تمثال خرافي ملون من التراث المكسيكي' },
      { word: 'tallar', en: 'to carve (wood or stone)', ar: 'ينحت (الخشب أو الحجر)' },
      { word: 'ancestral', en: 'ancestral / heritage', ar: 'تراثي / من الأجداد' }
    ],
    grammarHighlights: ['Pretérito Indefinido for completed narrative past (visitó, mostró, pintó, compró)', 'Relative clause connectors (que combinan, que crean)'],
    comprehensionQuiz: [
      {
        question_es: '¿De qué material tallan tradicionalmente los alebrijes en Oaxaca?',
        question_en: 'What material do they traditionally carve alebrijes from in Oaxaca?',
        question_ar: 'من أي مادة ينحتون الأليبريخيس تقليدياً في أوكساكا؟',
        options: ['De piedra mármol', 'De madera del árbol de copal', 'De plástico reciclado', 'De barro negro cocido'],
        answerIdx: 1,
        explanation_en: 'Alebrijes in Oaxaca are traditionally hand-carved from the soft wood of the copal tree.',
        explanation_ar: 'ينحت الأليبريخيس في أوكساكا تقليدياً يدوياً من خشب شجرة الكوبال اللين.'
      }
    ]
  },
  {
    id: 'story-arg-5',
    title_es: 'Un Asado de Domingo en la Casa de Campo',
    title_en: 'A Sunday Asado at the Country House',
    title_ar: 'شواء يوم الأحد في بيت الريف الأرجنتيني',
    cefr: 'A2',
    difficulty: 'Moderate',
    wordCount: 175,
    audioDurationSec: 78,
    paragraphs: [
      {
        es: 'El domingo pasado, la familia de Rodrigo organizó un gran asado criollo en su casa de campo en la provincia de Buenos Aires.',
        en: 'Last Sunday, Rodrigo\'s family organized a big traditional barbecue (asado) at their country house in the province of Buenos Aires.',
        ar: 'في الأحد الماضي، نظمت عائلة رودريغو حفل شواء تقليدي كبير (أسادو) في منزلهم الريفي بمحافظة بوانس آيرس.'
      },
      {
        es: 'Su tío Gonzalo, el parrillero oficial, encendió el fuego temprano con leña de quebracho para conseguir brasas rojas y calientes. Puso en la parrilla tiras de asado, chorizos para choripán y provoleta con orégano.',
        en: 'His uncle Gonzalo, the official grillmaster (parrillero), lit the fire early with hard wood (quebracho) to get hot red coals. He placed ribs, sausages for choripán, and provoleta cheese with oregano on the grill.',
        ar: 'أشعل عمه غونثالو، شيف الشواء الرسمي، النار باثراً بحطب خشب "الكيبراشو" القوي للحصول على جمر أحمر ساخن. وضع على شواية الفحم أضلع اللحم، والنقانق، وجبن البروفوليتا مع الزعتر.'
      },
      {
        es: 'Mientras la carne se cocinaba lentamente, todos conversaban y comían picada con salame y queso. Cuando el asador sirvió la primera bandeja, todos aplaudieron con entusiasmo gritando: "¡Un aplauso para el asador!".',
        en: 'While the meat cooked slowly, everyone chatted and ate an appetizer board (picada) with salami and cheese. When the grillmaster served the first tray, everyone applauded enthusiastically shouting: "An applause for the grillmaster!".',
        ar: 'بينما كان اللحم ينضج ببطء، كان الجميع يتجاذبون أطراف الحديث ويأكلون طبق مقبلات (بيكادا) بالسلامي والجبن. وعندما قدم الشيف الصينية الأولى، صفق الجميع بحماس هاتفين: "تصفيق حار للشيف!".'
      }
    ],
    vocabHighlights: [
      { word: 'asado', en: 'barbecue / grilled meats gathering', ar: 'حفل شواء أرجنتيني تقليدي' },
      { word: 'parrillero / asador', en: 'grillmaster / cook in charge of barbecue', ar: 'شيف الشواء المسؤول عن النار' },
      { word: 'choripán', en: 'sausage sandwich with chimichurri', ar: 'شطيرة نقانق مشوية مع صلصة تشيميتشوري' }
    ],
    grammarHighlights: ['Imperfect (se cocinaba, conversaban) for ongoing past actions', 'Pretérito (organizó, encendió, sirvió) for main actions', 'Time clauses with mientras'],
    comprehensionQuiz: [
      {
        question_es: '¿Qué tradición argentina hacen los invitados cuando sirven la carne del asado?',
        question_en: 'What Argentine tradition do guests do when the barbecue meat is served?',
        question_ar: 'ما هي العادة الأرجنتينية التي يفعلها الضيوف عند تقديم لحم الشواء؟',
        options: ['Cantan el himno nacional', 'Piden un aplauso para el asador', 'Bailan tango en la cocina', 'Pagan en efectivo al cocinero'],
        answerIdx: 1,
        explanation_en: 'It is a beloved tradition in Argentina to applaud and say "Un aplauso para el asador!" to honor the cook.',
        explanation_ar: 'من التقاليد المحبوبة في الأرجنتين التصفيق وهتاف "تصفيق للشيف!" تكريماً لمن أعد الشواء.'
      }
    ]
  },
  {
    id: 'story-mx-6',
    title_es: 'El Baño Sagrado en los Cenotes de Yucatán',
    title_en: 'Sacred Swimming in the Cenotes of Yucatán',
    title_ar: 'السباحة المقدسة في كهوف السينوتي باليوكاتان',
    cefr: 'A2',
    difficulty: 'Moderate',
    wordCount: 165,
    audioDurationSec: 72,
    paragraphs: [
      {
        es: 'Durante sus vacaciones por la península de Yucatán, Sofía viajó a la selva para nadar en el famoso Cenote Ik Kil, cerca de las ruinas mayas de Chichén Itzá.',
        en: 'During her vacation through the Yucatán peninsula, Sofía traveled to the jungle to swim in the famous Cenote Ik Kil, near the Mayan ruins of Chichén Itzá.',
        ar: 'خلال عطلتها في شبه جزيرة يوكاتان، سافرت صوفيا إلى الأدغال للسباحة في كهف "سينوتي إيك كيل" الشهير بالقرب من آصار المايا في تشيتشن إيتزا.'
      },
      {
        es: 'El cenote es un pozo natural de agua dulce rodeado de altas paredes de roca y raíces de árboles tropicales que caen como cortinas verdes desde la superficie.',
        en: 'The cenote is a natural freshwater sinkhole surrounded by tall rock walls and roots of tropical trees falling like green curtains from the surface.',
        ar: 'السينوتي هو مجرى مائي طبيعي عذب محاط بجدران صخرية عالية وجذور أشجار استوائية تتدلى كستائر خضراء من السطح.'
      },
      {
        es: 'El agua estaba fresca y totalmente transparente. Sofía se tiró al agua con emoción y nadó junto a pequeños peces negros. Los antiguos mayas consideraban que estos cenotes eran entradas sagradas al inframundo.',
        en: 'The water was cool and completely transparent. Sofía jumped into the water with excitement and swam alongside small black fish. Ancient Mayans considered these cenotes sacred entrances to the underworld.',
        ar: 'كانت المياه منعشة وشفافة تماماً. قفزت صوفيا في الماء بحماس وسبحت بجانب أسماك سوداء صغيرة. كان المايا القدماء يعتبرون هذه الكهوف المائية المائية مداخل مقدسة إلى العالم السفلي.'
      }
    ],
    vocabHighlights: [
      { word: 'cenote', en: 'natural freshwater sinkhole / cave pool', ar: 'كهف مائي عذب طبيعي في المكسيك' },
      { word: 'pozo natural', en: 'natural well / sinkhole', ar: 'بئر مائي طبيعي' },
      { word: 'inframundo', en: 'underworld (mythology)', ar: 'العالم السفلي (في الأساطير)' }
    ],
    grammarHighlights: ['Contrast between Preterite (viajó, se tiró, nadó) and Imperfect (estaba, consideraban)', 'Simile expressions (como cortinas verdes)'],
    comprehensionQuiz: [
      {
        question_es: '¿Qué significado sagrado tenían los cenotes para los antiguos mayas?',
        question_en: 'What sacred meaning did cenotes hold for ancient Mayans?',
        question_ar: 'ما المعنى المقدس الذي كانت تحمله كهوف السينوتي بالنسبة لشعب المايا القديم؟',
        options: ['Eran mercados de frutas', 'Eran entradas sagradas al inframundo', 'Eran fortalezas de guerra', 'Eran templos de astronomía'],
        answerIdx: 1,
        explanation_en: 'Mayans revered cenotes as sacred portals connecting the earth to the spiritual underworld.',
        explanation_ar: 'كان المايا يقدسون كهوف السينوتي ويعتبرونها بوابات مقدسة تربط الأرض بالعالم الروحي السفلي.'
      }
    ]
  },
  {
    id: 'story-arg-6',
    title_es: 'El Arte del Tango en las Calles de San Telmo',
    title_en: 'The Art of Tango in the Streets of San Telmo',
    title_ar: 'فن التانغو في شوارع سان تيلمو',
    cefr: 'A2',
    difficulty: 'Moderate',
    wordCount: 170,
    audioDurationSec: 75,
    paragraphs: [
      {
        es: 'Un domingo por la tarde, Lucas caminaba por el histórico barrio de San Telmo en Buenos Aires, admirando la feria de antigüedades en la Plaza Dorrego.',
        en: 'One Sunday afternoon, Lucas walked through the historic neighborhood of San Telmo in Buenos Aires, admiring the antique fair in Plaza Dorrego.',
        ar: 'في أحد أيام الأحد عصراً، كان لوكاس يسير في حي سان تيلمو التاريخي بمدينة بوانس آيرس، معجباً بمعرض التحف الأثرية في ساحة دوريغو.'
      },
      {
        es: 'De repente, escuchó el sonido nostálgico de un bandoneón. Se acercó a la esquina y vio a una pareja bailarines profesionales bailando tango sobre las piedras del empedrado.',
        en: 'Suddenly, he heard the nostalgic sound of a bandoneon (accordion). He approached the corner and saw a couple of professional dancers dancing tango on the cobblestones.',
        ar: 'فجأة، سمع الصوت الشجي لأكورديون "الباندونيون". اقترب من الزاوية ورأى زوجاً من الراقصين المحترفين يرقصون التانغو فوق الحصى المرصوف.'
      },
      {
        es: 'Los bailarines se movían con una elegancia increíble, ejecutando ganchos y ochos precisos al ritmo de la música. La gente aplaudió con admiración al finalizar la melodía.',
        en: 'The dancers moved with incredible elegance, executing precise legs hooks and turns to the rhythm of the music. People applauded with admiration as the melody ended.',
        ar: 'كان الراقصون يتحركون بأناقة مذهلة، ينفذون حركات وحلقات دقيقة على إيقاع الموسيقى. صفق الحضور بإعجاب شديد فور انتهاء المعزوفة.'
      }
    ],
    vocabHighlights: [
      { word: 'bandoneón', en: 'concertina / accordion used in tango', ar: 'آلة الباندونيون الموسيقية الخاصة بالتانغو' },
      { word: 'empedrado', en: 'cobblestone pavement', ar: 'رصيف مرصوف بالحجارة' },
      { word: 'ochos', en: 'figure-eight tango dance step', ar: 'حركة الثمانية الشهيرة في رقصة التانغو' }
    ],
    grammarHighlights: ['Action interruptions (caminaba cuando escuchó)', 'Adverbs of manner (nostálgico, con elegancia)', 'Participle forms (admirando, bailando)'],
    comprehensionQuiz: [
      {
        question_es: '¿Qué instrumento musical le dio el sonido tradicional al tango en la historia?',
        question_en: 'Which musical instrument gave the traditional sound to tango in history?',
        question_ar: 'ما هي الآلة الموسيقية التي أضفت الصوت التقليدي للتانغو عبر التاريخ؟',
        options: ['La trompeta de jazz', 'El bandoneón', 'El tambor africano', 'La flauta dulce'],
        answerIdx: 1,
        explanation_en: 'The bandoneon is the iconic accordion-like instrument central to tango music.',
        explanation_ar: 'آلة الباندونيون هي الآلة الموسيقية الأسطورية الأساسية في عزف موسيقى التانغو.'
      }
    ]
  },
  {
    id: 'story-mx-7',
    title_es: 'Noche de Máscaras en la Lucha Libre',
    title_en: 'Night of Masks at Professional Wrestling',
    title_ar: 'ليلة الأقنعة في المصارعة المكسيكية الحرة',
    cefr: 'A2',
    difficulty: 'Moderate',
    wordCount: 168,
    audioDurationSec: 74,
    paragraphs: [
      {
        es: 'El viernes por la noche, Alejandro y sus amigos compraron boletos para ir a la legendaria Arena México a ver un espectáculo de Lucha Libre.',
        en: 'On Friday night, Alejandro and his friends bought tickets to go to the legendary Arena México to watch a professional wrestling show.',
        ar: 'في ليلة الجمعة، اشترى أليخاندرو وأصدقاؤه تذاكر للذهاب إلى حلبة "أرينا مكسيكو" الأسطورية لمشاهدة عرض المصارعة المكسيكية الحرة (Lucha Libre).'
      },
      {
        es: 'Antes de entrar, compraron máscaras de colores brillantes afuera del estadio. Alejandro eligió la máscara dorada de su luchador favorito, "El Santo".',
        en: 'Before entering, they bought bright colorful masks outside the stadium. Alejandro chose the golden mask of his favorite wrestler, "El Santo".',
        ar: 'قبل الدخول، اشتروا أقنعة زاهية الألوان خارج الاستاد. اختار أليخاندرو القناع الذهبي لمصارعه المفضل "إل سانتو".'
      },
      {
        es: 'Dentro de la arena, el ambiente era electrizante. Los luchadores hacían acrobacias voladoras espectaculares desde las cuerdas del cuadrilátero mientras todo el público gritaba y aplaudía con entusiasmo.',
        en: 'Inside the arena, the atmosphere was electrifying. Wrestlers performed spectacular flying acrobatics from the ring ropes while the whole audience cheered and applauded with enthusiasm.',
        ar: 'داخل الحلبة، كان الجو مشحوناً بالإثارة. كان المصارعون يقومون بحركات استعراضية طائرة مذهلة من حبال حلبة المصارعة بينما كان جميع الجمهور يصرخ ويصفق بحماس.'
      }
    ],
    vocabHighlights: [
      { word: 'lucha libre', en: 'Mexican professional wrestling', ar: 'المصارعة المكسيكية الحرة الاستعراضية' },
      { word: 'máscara', en: 'wrestling mask', ar: 'قناع المصارعة' },
      { word: 'cuadrilátero', en: 'wrestling ring', ar: 'حلبة المصارعة الرباعية' }
    ],
    grammarHighlights: ['Time expressions before action (antes de entrar)', 'Imperfect description of atmosphere (era electrizante, hacían)', 'Preterite actions (compraron, eligió)'],
    comprehensionQuiz: [
      {
        question_es: '¿Qué accesorio tradicional compran los aficionados antes de entrar a la Lucha Libre?',
        question_en: 'What traditional accessory do fans buy before entering Lucha Libre?',
        question_ar: 'ما هي الإكسسوارات التقليدية التي يشتريها المشجعون قبل دخول عرض المصارعة؟',
        options: ['Sombreros de copa', 'Máscaras de colores de luchadores', 'Guantes de boxeo', 'Capas rojas'],
        answerIdx: 1,
        explanation_en: 'Fans love buying iconic, colorful wrestling masks representing legendary fighters outside the arena.',
        explanation_ar: 'يحب المشجعون شراء أقنعة المصارعة الملونة الأسطورية خارج الحلبة.'
      }
    ]
  },
  {
    id: 'story-arg-7',
    title_es: 'Nieve y Chocolates en San Carlos de Bariloche',
    title_en: 'Snow and Chocolates in Bariloche',
    title_ar: 'الثلوج والشوكولاتة في باريليوتشي',
    cefr: 'A2',
    difficulty: 'Moderate',
    wordCount: 172,
    audioDurationSec: 76,
    paragraphs: [
      {
        es: 'En el mes de julio, durante el invierno austral, Valeria viajó a San Carlos de Bariloche, una hermosa ciudad en la Patagonia argentina famosa por sus lagos y montañas.',
        en: 'In the month of July, during the southern winter, Valeria traveled to San Carlos de Bariloche, a beautiful city in Argentine Patagonia famous for its lakes and mountains.',
        ar: 'في شهر يوليو، خلال الشتاء الجنوبي، سافرت فاليريا إلى سان كارلوس دي باريليوتشي، وهي مدينة جميلة في منطقة باتاغونيا الأرجنتينية شهيرة ببحيراتها وجبالها.'
      },
      {
        es: 'Subió en telesilla hasta el Cerro Catedral para esquiar sobre la nieve blanca y ver la vista panorámica del enorme Lago Nahuel Huapi.',
        en: 'She rode the chairlift up to Cerro Catedral to ski on the white snow and see the panoramic view of the massive Lake Nahuel Huapi.',
        ar: 'صعدت في المكبس الهوائي (المقعد المعلق) إلى جبل كاثيدرال للتزلج على الثلج الأبيض ورؤية المنظر البانورامي لبحيرة ناهويل هوابي الضخمة.'
      },
      {
        es: 'Por la tarde, caminó por la calle Mitre y entró a una chocolatería artesanal. Tomó un chocolate caliente espeso y compró una caja de alfajores rellenos con mucho dulce de leche.',
        en: 'In the afternoon, she walked along Mitre street and entered an artisan chocolate shop. She drank a thick hot chocolate and bought a box of alfajores filled with rich dulce de leche.',
        ar: 'في الظهيرة، سارت في شارع ميتر ودخلت متجر شوكولاتة حرفي. شربت شوكولاتة ساخنة سميكة واشترت علبة حلوى "الفاهوريس" المحشوة بكثافة بحلوى الحليب (dulce de leche).'
      }
    ],
    vocabHighlights: [
      { word: 'invierno austral', en: 'Southern Hemisphere winter (June-Aug)', ar: 'الشتاء في النصف الجنوبي للكرة الأرضية' },
      { word: 'chocolatería artesanal', en: 'artisan chocolate store', ar: 'متجر شوكولاتة حرفية فاخرة' },
      { word: 'dulce de leche', en: 'caramelized milk sweet spread', ar: 'حلوى الحليب المكرمل الشائعة أرجنتينياً' }
    ],
    grammarHighlights: ['Sequential verbs in narrative (subió, caminó, tomó, compró)', 'Nouns with compound modifiers (invierno austral, chocolatería artesanal)'],
    comprehensionQuiz: [
      {
        question_es: '¿En qué meses ocurre el invierno en Argentina y Bariloche?',
        question_en: 'In which months does winter occur in Argentina and Bariloche?',
        question_ar: 'في أي أشهر يحدث الشتاء في الأرجنتين وباريليوتشي؟',
        options: ['En diciembre y enero', 'En junio, julio y agosto', 'En marzo y abril', 'En septiembre y octubre'],
        answerIdx: 1,
        explanation_en: 'Because Argentina is in the Southern Hemisphere, winter takes place between June and August.',
        explanation_ar: 'نظراً لأن الأرجنتين تقع في نصف الكرة الجنوبي، يحدث الشتاء بين شهري يونيو وأغسطس.'
      }
    ]
  },
  {
    id: 'story-mx-8',
    title_es: 'Mariachis en la Plaza Garibaldi',
    title_en: 'Mariachis in Plaza Garibaldi',
    title_ar: 'عازفو المارياتشي في ساحة غاريبالدي',
    cefr: 'A2',
    difficulty: 'Moderate',
    wordCount: 165,
    audioDurationSec: 73,
    paragraphs: [
      {
        es: 'Ayer por la noche, Javier llevó a sus amigos extranjeros a la Plaza Garibaldi, el lugar emblemático donde se reúnen los mariachis en la Ciudad de México.',
        en: 'Last night, Javier took his foreign friends to Plaza Garibaldi, the emblematic spot where mariachis gather in Mexico City.',
        ar: 'ليلة أمس، أخذ خافيير أصدقاءه الأجانب إلى ساحة غاريبالدي، المكان الرمز الذي يجتمع فيه عازفو المارياتشي في مدينة مكسيكو.'
      },
      {
        es: 'Los músicos vestían elegantes trajes de charro con botones de plata y sombreros grandes. Contrataron a un grupo para dedicarle una serenata romántica a su amiga por su cumpleaños.',
        en: 'The musicians wore elegant charro suits with silver buttons and large hats. They hired a group to perform a romantic serenade for their friend\'s birthday.',
        ar: 'كان الموسيقيون يرتدون بدلات "تشارو" أنيقة بأزرار فضية وقبعات كبيرة. استأجروا فرقة لإهداء معزوفة شجية رومانسية لصديقتهم بمناسبة عيد ميلادها.'
      },
      {
        es: 'El trompetista tocó notas brillantes y el cantante entonó "Cielito Lindo". Todos cantaron en coro el famoso "¡Canta y no llores!" llenos de emoción y alegría.',
        en: 'The trumpeter played brilliant notes and the singer belt out "Cielito Lindo". Everyone sang along in chorus the famous "Sing and don\'t cry!" full of emotion and joy.',
        ar: 'عزف عازف البوق نغمات رائعة واسترسل المغني في أغنية "سيليتو ليندو". غنى الجميع في كورال واحد العبارة الشهيرة "غنِّ ولا تبكِ!" وهم مليئون بالمشاعر والفرح.'
      }
    ],
    vocabHighlights: [
      { word: 'traje de charro', en: 'traditional Mexican horseman suit', ar: 'بدلة التشارو المكسيكية الأنيقة العريقة' },
      { word: 'serenata', en: 'outdoor music serenade', ar: 'معزوفة موسيقية رومانسية في الهواء الطلق' },
      { word: 'Cielito Lindo', en: 'famous traditional Mexican folk song', ar: 'الأغنية التراثية المكسيكية الأسطورية' }
    ],
    grammarHighlights: ['Direct and indirect object pronouns (le dedicaron, los contrataron)', 'Past habitual vs specific action (vestían vs entonó)'],
    comprehensionQuiz: [
      {
        question_es: '¿Cómo se llama la famosa canción folclórica mexicana que dice "Canta y no llores"?',
        question_en: 'What is the name of the famous Mexican folk song with the lyric "Sing and don\'t cry"?',
        question_ar: 'ما اسم الأغنية التراثية المكسيكية الشهيرة التي تقال فيها العبارة "غنِّ ولا تبكِ"؟',
        options: ['La Bamba', 'Cielito Lindo', 'El Rey', 'Guantanamera'],
        answerIdx: 1,
        explanation_en: '"Cielito Lindo" is one of Mexico\'s most recognized anthem-like songs worldwide.',
        explanation_ar: 'تعد "سيليتو ليندو" واحدة من أشهر الأغاني الوطنية التراثية للمكسيك في جميع أنحاء العالم.'
      }
    ]
  },
  {
    id: 'story-arg-8',
    title_es: 'El Tren a las Nubes en las Alturas de Salta',
    title_en: 'The Train to the Clouds in Salta Highs',
    title_ar: 'قطار السحاب في مرتفعات سالتا',
    cefr: 'A2',
    difficulty: 'Moderate',
    wordCount: 175,
    audioDurationSec: 77,
    paragraphs: [
      {
        es: 'El mes pasado, Fernando viajó a la provincia de Salta, en el norte de Argentina, para vivir una experiencia inolvidable a bordo del "Tren a las Nubes".',
        en: 'Last month, Fernando traveled to the province of Salta, in northern Argentina, to live an unforgettable experience aboard the "Train to the Clouds".',
        ar: 'في الشهر الماضي، سافر فيرناندو إلى محافظة سالتا في شمال الأرجنتين، ليعيش تجربة لا تُنسى على متن "قطار السحاب".'
      },
      {
        es: 'Este histórico ferrocarril atraviesa valles, quebradas de tierra roja y montañas majestuosas de la Cordillera de los Andes hasta llegar a más de cuatro mil metros sobre el nivel del mar.',
        en: 'This historical railway crosses valleys, red earth ravines, and majestic mountains of the Andes Range until reaching over four thousand meters above sea level.',
        ar: 'يعبر هذا القطار التاريخي الفتيان، والوديان الصخرية حمراء اللون، والجبال المهيبة لسلسلة جبال الأنديز حتى يصل إلى ارتفاع يربو على أربعة آلاف متر فوق سطح البحر.'
      },
      {
        es: 'El punto culminante del viaje fue cruzar el viaducto La Polvorilla, una obra de ingeniería impresionante suspended en el aire. Fernando sintió que literalmente estaba tocando las nubes con las manos.',
        en: 'The highlight of the trip was crossing the La Polvorilla viaduct, an impressive engineering marvel suspended in the air. Fernando felt like he was literally touching the clouds with his hands.',
        ar: 'كانت النقطة الأبرز في الرحلة هي عبور جسر "لا بولبوريخا"، وهو إنجاز هندسي مذهل معلق في الهواء. شعر فيرناندو بأنه يلمس السحاب يديه حرفياً.'
      }
    ],
    vocabHighlights: [
      { word: 'Cordillera de los Andes', en: 'Andes Mountain Range', ar: 'سلسلة جبال الأنديز العظيمة' },
      { word: 'viaducto', en: 'elevated railway bridge / viaduct', ar: 'جسر قطار مرتفع' },
      { word: 'sobre el nivel del mar', en: 'above sea level', ar: 'فوق سطح البحر' }
    ],
    grammarHighlights: ['Prepositional phrases (sobre el nivel del mar, a bordo de)', 'Metaphorical expressions (tocando las nubes)'],
    comprehensionQuiz: [
      {
        question_es: '¿A qué altura aproximada llega el Tren a las Nubes en Salta?',
        question_en: 'To what approximate height does the Train to the Clouds reach in Salta?',
        question_ar: 'ما هو الارتفاع التقريبي الذي يصل إليه قطار السحاب في سالتا؟',
        options: ['A mil metros', 'A más de cuatro mil metros sobre el nivel del mar', 'A cien metros', 'A diez mil metros'],
        answerIdx: 1,
        explanation_en: 'The train reaches an astounding elevation of over 4,220 meters above sea level in the Andes.',
        explanation_ar: 'يصل القطار إلى ارتفاع مذهل يتجاوز 4,220 متراً فوق سطح البحر في جبال الأنديز.'
      }
    ]
  },

  // ==========================================
  // LEVEL B1: INTERMEDIATE CONVERSATIONALIST (8 STORIES)
  // ==========================================
  {
    id: 'story-mx-9',
    title_es: 'El Misterio Astronómico de Chichén Itzá',
    title_en: 'The Astronomical Mystery of Chichén Itzá',
    title_ar: 'اللغز الفلكي لمدينة تشيتشن إيتزا',
    cefr: 'B1',
    difficulty: 'Moderate',
    wordCount: 205,
    audioDurationSec: 90,
    paragraphs: [
      {
        es: 'Durante el equinoccio de primavera en marzo, miles de visitantes de todo el mundo se congregan en las ruinas mayas de Chichén Itzá, situadas en la península de Yucatán, para presenciar un fenómeno astronómico asombroso.',
        en: 'During the spring equinox in March, thousands of visitors from around the world gather at the Mayan ruins of Chichén Itzá, located in the Yucatán peninsula, to witness an amazing astronomical phenomenon.',
        ar: 'خلال الاعتدال الربيعي في شهر مارس، يتجمع آلاف الزوار من جميع أنحاء العالم في آصار المايا في تشيتشن إيتزا، الواقعة في شبه جزيرة يوكاتان، لمشاهدة ظاهرة فلكية مذهلة.'
      },
      {
        es: 'Conforme el sol comienza a descender en la tarde, las esquinas de la pirámide de Kukulkán proyectan una serie de sombras triangulares sobre la escalinata norte. Estas sombras crean la ilusión óptica de una serpiente de luz gigantesca que baja lentamente hasta unirse con la cabeza de piedra tallada en la base.',
        en: 'As the sun begins to descend in the afternoon, the corners of the Kukulkán pyramid project a series of triangular shadows onto the northern staircase. These shadows create the optical illusion of a gigantic snake of light slowly descending until joining the carved stone head at the base.',
        ar: 'مع بدء غروب الشمس في الظهيرة، تعرض زوايا هرم "كوكولكان" سلسلة من الظلال المثلثية على الدرج الشمالي. تخلق هذه الظلال خداعاً بصرياً لثعبان ضخم من الضوء ينزل ببطء حتى يتصل بالرأس الحجري المنحوت في القاعدة.'
      },
      {
        es: 'Este cálculo matemático y astronómico tan preciso demuestra el conocimiento profundo que poseían los mayas sobre los ciclos solares. Es fascinante pensar cómo lograron diseñar una estructura tan compleja sin la tecnología moderna de hoy en día.',
        en: 'This remarkably precise mathematical and astronomical calculation demonstrates the profound knowledge Mayans possessed about solar cycles. It is fascinating to think how they managed to design such a complex structure without modern technology.',
        ar: 'يظهر هذا الحساب الرياضي والفلكي الدقيق للغاية المعرفة العميقة التي كان يملكها المايا عن الدورات الشمسية. إنه لأمر مذهل التفكير في كيفية نجاحهم في تصميم مبنى بضخامة هذا التعقيد دون تكنولوجيا حديثة.'
      }
    ],
    vocabHighlights: [
      { word: 'equinoccio', en: 'equinox (day/night equal duration)', ar: 'الاعتدال الربيعي / الخريفي الفلكي' },
      { word: 'ilusión óptica', en: 'optical illusion', ar: 'خداع بصري' },
      { word: 'ciclos solares', en: 'solar cycles', ar: 'الدورات الشمسية' }
    ],
    grammarHighlights: ['Subjunctive in subjective clauses (Es fascinante pensar cómo lograron)', 'Temporal adverbial clauses (Conforme el sol comienza a descender)'],
    comprehensionQuiz: [
      {
        question_es: '¿Qué ilusión óptica se forma en la pirámide de Kukulkán durante el equinoccio?',
        question_en: 'What optical illusion forms on the Kukulkán pyramid during the equinox?',
        question_ar: 'ما الخداع البصري الذي يتشكل على هرم كوكولكان خلال الاعتدال الفلكي؟',
        options: ['Un jaguar de fuego', 'Una serpiente de luz descendiendo', 'Un águila volando', 'Un templo flotante'],
        answerIdx: 1,
        explanation_en: 'The play of light and shadow creates the illusion of a feathered serpent slithering down the pyramid.',
        explanation_ar: 'يخلق تلاعب الضوء والظل خداعاً بصرياً لثعبان مجنح يتلوى نازلاً على الهرم.'
      }
    ]
  },
  {
    id: 'story-arg-9',
    title_es: 'El Caminito y el Alma del Barrio de La Boca',
    title_en: 'El Caminito and the Soul of La Boca Neighborhood',
    title_ar: 'حي الكامينيتو وروح منطقة لا بوكا',
    cefr: 'B1',
    difficulty: 'Moderate',
    wordCount: 200,
    audioDurationSec: 88,
    paragraphs: [
      {
        es: 'Ubicado a orillas del Riachuelo en Buenos Aires, el pintoresco barrio de La Boca destaca por sus casas de chapa acanalada pintadas con colores vivos y contrastantes. Este diseño único nació a finales del siglo XIX con la llegada masiva de inmigrantes italianos, principalmente genoveses.',
        en: 'Located on the banks of the Riachuelo river in Buenos Aires, the picturesque La Boca neighborhood stands out for its corrugated sheet-metal houses painted in bright, contrasting colors. This unique design was born at the end of the 19th century with the massive arrival of Italian immigrants, mainly Genoese.',
        ar: 'يقع حي لا بوكا الخلاب على ضفاف نهر رياشويلو في بوانس آيرس، ويثير الانتباه ببيوته المصنوعة من الصفائح المعدنية المموجة والمدهونة بألوان زاهية وبارزة. ولد هذا التصميم الفريد في نهاية القرن التاسع عشر مع الوصول الهائل للمهاجرين الإيطاليين، وخاصة من مدينة جنوة.'
      },
      {
        es: 'Dado que los obreros no tenían suficiente dinero para comprar pintura, utilizaban los sobrantes de los barcos del puerto. Como los tarros de pintura no alcanzaban para toda una casa, pintaban cada pared y ventana de un color diferente.',
        en: 'Given that the workers didn\'t have enough money to buy paint, they used leftover paint from port ships. Since paint cans weren\'t enough for an entire house, they painted each wall and window a different color.',
        ar: 'نظراً لأن العمال لم يكونوا يملكون ما يكفي من المال لشراء الطلاء، كانوا يستخدمون بقايا طلاء سفن الميناء. ولأن علب الطلاء لم تكن تكفي لمنزل بأكمله، كانوا يدهنون كل جدار ونافذة بلون مختلف.'
      },
      {
        es: 'Hoy en día, el pasaje peatonal "Caminito" es un museo a cielo abierto donde artistas plásticos exponen sus obras y las parejas bailan tango al aire libre, manteniendo viva la memoria de la clase trabajadora porteña.',
        en: 'Today, the pedestrian alley "Caminito" is an open-air museum where visual artists exhibit their work and couples dance tango outdoors, keeping alive the memory of Buenos Aires\' working class.',
        ar: 'اليوم، يعد ممر "كامينيتو" للمشاة متحفاً مفتوحاً تحت السماء حيث يعرض الفنانون التشكيليون أعمالهم ويرقص الأزواج التانغو في الهواء الطلق، محافظين على أثر الطبقة العاملة الأرجنتينية.'
      }
    ],
    vocabHighlights: [
      { word: 'chapa acanalada', en: 'corrugated sheet metal', ar: 'صفائح معدنية مموجة' },
      { word: 'sobrantes', en: 'leftovers / surplus materials', ar: 'بقايا مواد / فائض' },
      { word: 'museo a cielo abierto', en: 'open-air museum', ar: 'متحف مفتوح تحت السماء' }
    ],
    grammarHighlights: ['Causal conjunctions (Dado que, Como los tarros no alcanzaban)', 'Passive expressions (fue construido, eran utilizadas)'],
    comprehensionQuiz: [
      {
        question_es: '¿Por qué las casas de La Boca tienen paredes de diferentes colores?',
        question_en: 'Why do houses in La Boca have walls of different colors?',
        question_ar: 'لماذا تمتلك بيوت حي لا بوكا جدراناً بألوان مختلفة؟',
        options: ['Por una ley del gobierno', 'Porque usaban los sobrantes de pintura de los barcos', 'Para ahuyentar a los mosquitos', 'Porque era una tradición azteca'],
        answerIdx: 1,
        explanation_en: 'Immigrant workers used leftover boat paint, mixing leftover cans of different colors for each section of their homes.',
        explanation_ar: 'كان العمال المهاجرون يستخدمون بقايا طلاء السفن، مجمعين علباً ألوان مختلفة لكل جزء من منازلهم.'
      }
    ]
  },
  {
    id: 'story-mx-10',
    title_es: 'Los Voladores de Papantla y el Ritual del Aire',
    title_en: 'The Papantla Flyers and the Ritual of the Air',
    title_ar: 'استعراض طائري بابانتلا وطقوس الهواء',
    cefr: 'B1',
    difficulty: 'Moderate',
    wordCount: 195,
    audioDurationSec: 86,
    paragraphs: [
      {
        es: 'En el estado de Veracruz y cerca de las ruinas de El Tajín, se realiza una de las tradiciones prehispánicas más deslumbrantes de México: la ceremonia ritual de los Voladores de Papantla, declarada Patrimonio Cultural Inmaterial de la Humanidad.',
        en: 'In the state of Veracruz and near the ruins of El Tajín, one of Mexico\'s most dazzling pre-Hispanic traditions takes place: the ritual ceremony of the Papantla Flyers, declared Intangible Cultural Heritage of Humanity.',
        ar: 'في ولاية بيراكروز وبالقرب من آصار التاخين، تُقام واحدة من أكثر التقاليد التراثية إبهاراً في المكسيك: مراسم استعراض "طائري بابانتلا"، المصنفة كإرث ثقافي غير مادي للإنسانية.'
      },
      {
        es: 'Cinco hombres vestidos con trajes multicolores que representan aves sagradas suben a un poste de madera de treinta metros de altura. Uno de ellos, el Caporal, se sitúa en la cima sin arnés, tocando una flauta de carrizo y un tambor para rendir tributo a los cuatro puntos cardinales.',
        en: 'Five men dressed in multicolored costumes representing sacred birds climb a thirty-meter-high wooden pole. One of them, the Caporal, stands at the top without a harness, playing a reed flute and a drum to pay tribute to the four cardinal directions.',
        ar: 'يشرف خمسة رجال يرتدون أزياء زاهية الألوان تمثل طيوراً مقدسة على تسلق عمود خشبي بارتفاع ثلاثين متراً. يقف أحدهم (الكابورال) في القمة دون حزام أمان، عزفاً على مزمار القصب وطبل تقديم القربان للجهات الأربع.'
      },
      {
        es: 'Los otros cuatro voladores se atan cuerdas a los tobillos y se lanzan al vacío de cabeza. Mientras giran en círculos descendentes emulando el vuelo de las aves, piden a los dioses lluvia y fertilidad para la tierra.',
        en: 'The other four flyers tie ropes to their ankles and launch themselves into the void upside down. As they spin in descending circles emulating the flight of birds, they ask the gods for rain and fertility for the land.',
        ar: 'يربط الطائرون الأربعة الآخرون حبالاً حول كواحلهم ويلقون بأنفسهم في الفراغ رأساً على عقب. وبينما يدورون في دوائر تنازلية محاكين طيران الطيور، يطلبون من الآلهة المطر والخصوبة للأرض.'
      }
    ],
    vocabHighlights: [
      { word: 'lanzarse al vacío', en: 'to throw oneself into the void', ar: 'إلقاء النفس في الفراغ' },
      { word: 'puntos cardinales', en: 'cardinal points (North, South, East, West)', ar: 'الجهات الأصلية الأربع' },
      { word: 'flauta de carrizo', en: 'reed flute', ar: 'مزمار القصب التقليدي' }
    ],
    grammarHighlights: ['Gerund for simultaneous action (tocando, emulando, girando)', 'Prepositional phrases (al vacío de cabeza)'],
    comprehensionQuiz: [
      {
        question_es: '¿Cuántos hombres participan en la ceremonia tradicional arriba del poste?',
        question_en: 'How many men participate in the traditional ceremony atop the pole?',
        question_ar: 'كم عدد الرجال المشاركين في المراسم التقليدية فوق العمود؟',
        options: ['Dos personas', 'Cinco hombres (un caporal y cuatro voladores)', 'Diez bailarines', 'Un solo músico'],
        answerIdx: 1,
        explanation_en: 'Five men participate: four flyers representing the four elements/directions and one leader (caporal) playing music.',
        explanation_ar: 'يشارك خمسة رجال: أربعة طائرين يمثلون الاتجاهات الأربعة وقائد واحد (كابورال) يعزف الموسيقى.'
      }
    ]
  },
  {
    id: 'story-arg-10',
    title_es: 'La Fiesta de la Vendimia en los Viñedos de Mendoza',
    title_en: 'The Grape Harvest Festival in Mendoza Vineyards',
    title_ar: 'مهرجان حصاد العنب في كروم مندوزا',
    cefr: 'B1',
    difficulty: 'Moderate',
    wordCount: 198,
    audioDurationSec: 87,
    paragraphs: [
      {
        es: 'Cada año entre febrero y marzo, la provincia de Mendoza, situada al pie de la imponente Cordillera de los Andes, celebra la Fiesta Nacional de la Vendimia, uno de los festivales vitivinícolas más importantes del mundo.',
        en: 'Every year between February and March, the province of Mendoza, located at the foot of the imposing Andes Mountain Range, celebrates the National Grape Harvest Festival (Vendimia), one of the most important wine festivals in the world.',
        ar: 'في كل عام بين شهري فبراير ومارس، تحتفل محافظة مندوزا، الواقعة عند أقدام جبال الأنديز العظيمة، بالمهرجان الوطني لحصاد العنب (البنديميا)، وهو أحد أهم مهرجانات صناعة النبيذ في العالم.'
      },
      {
        es: 'Durante esta celebración, se rinde homenaje al esfuerzo arduo de los cosechadores que recogen manualmente toneladas de uvas de las cepas de Malbec. El suelo árido irrigado por aguas puras de deshielo andino crea las condiciones perfectas para producir vinos de renombre internacional.',
        en: 'During this celebration, tribute is paid to the hard effort of harvesters who manually collect tons of grapes from Malbec vines. The arid soil irrigated by pure Andean meltwater creates perfect conditions to produce world-renowned wines.',
        ar: 'خلال هذا الاحتفال، يقدَّم التكريم للجهد الشاق للعمال الذين يجمعون يدوياً أطناً من العنب من أغصان المالبيك. تخلق التربة الجافة المروية بماء الثلوج المذابة الصافية من الأنديز ظروفاً مثالية لإنتاج عصائر عالمية الشهرة.'
      },
      {
        es: 'El evento principal incluye espectáculos teatrales multitudinarios con cientos de bailarines en escenarios gigantescos y la coronación de la Reina de la Vendimia entre luces y fuegos artificiales.',
        en: 'The main event includes massive theatrical shows with hundreds of dancers on gigantic stages and the crowning of the Harvest Queen amidst lights and fireworks.',
        ar: 'يتضمن الحدث الرئيسي عروضاً مسرحية ضخمة بمشاركة مئات الراقصين على مسارح عملاقة وتتويج ملكة الحصاد وسط الأضواء والألعاب النارية.'
      }
    ],
    vocabHighlights: [
      { word: 'vendimia', en: 'grape harvest season/festival', ar: 'موسم ومهرجان حصاد العنب' },
      { word: 'aguas de deshielo', en: 'meltwater from mountain snow', ar: 'مياه ذوبان الثلوج الجبلية' },
      { word: 'cepas', en: 'vines / grape varieties', ar: 'أغصان الكروم / سلالات العنب' }
    ],
    grammarHighlights: ['Passive voice with se (se rinde homenaje, se celebra)', 'Complex descriptive adjectives (vitivinícola, multitudinario)'],
    comprehensionQuiz: [
      {
        question_es: '¿Qué cepa de uva es la más emblemática y famosa de Mendoza?',
        question_en: 'Which grape variety is the most emblematic and famous in Mendoza?',
        question_ar: 'ما هي سلالة العنب الأكثر تميزاً وشهرة في مندوزا؟',
        options: ['La cepa Malbec', 'La cepa Chardonnay', 'La cepa Merlot', 'La cepa Cabernet'],
        answerIdx: 0,
        explanation_en: 'Mendoza is globally famous for its iconic flagship Malbec grape.',
        explanation_ar: 'تعد مندوزا شهيرة عالمياً بعنب المالبيك (Malbec) الذي يمثل واجهتها الأولى.'
      }
    ]
  },
  {
    id: 'story-mx-11',
    title_es: 'El Día de Muertos y el Camino de Cempasúchil',
    title_en: 'Day of the Dead and the Cempasúchil Path',
    title_ar: 'يوم الموتى ومسار أزهار السيمباسوتشيل',
    cefr: 'B1',
    difficulty: 'Moderate',
    wordCount: 202,
    audioDurationSec: 89,
    paragraphs: [
      {
        es: 'A principios de noviembre, todo México se transforma para celebrar el Día de Muertos, una festividad ancestral que combina raíces indígenas prehispánicas con el catolicismo colonial para honrar la memoria de los difuntos.',
        en: 'At the beginning of November, all of Mexico transforms to celebrate Day of the Dead, an ancestral holiday combining pre-Hispanic indigenous roots with colonial Catholicism to honor the memory of the deceased.',
        ar: 'في بداية شهر نوفمبر، تتحول المكسيك بأكملها للاحتفال بـ "يوم الموتى"، وهو عيد عريق يجمع بين الجذور الهندية الأهلية والكاثوليكية الاستعمارية لتكريم ذكرى الراحلين.'
      },
      {
        es: 'En los hogares y cementerios, las familias construyen ofrendas detalladas decoradas con la flor de cempasúchil, cuyos pétalos de color naranja brillante trazaban un camino perfumado para guiar a las almas de regreso a casa durante esa noche mágica.',
        en: 'In homes and cemeteries, families build detailed altars decorated with the cempasúchil flower (marigold), whose bright orange petals trace a scented path to guide the souls back home during that magical night.',
        ar: 'في المنازل والمقابر، تبني العائلات مزارات تذكارية مفصلة تزين بأزهار "السيمباسوتشيل" البرتقالية الزاهية التي ترسم بتلاتها مساراً معطراً لإرشاد أرواح الراحلين في طريق العودة للمنزل.'
      },
      {
        es: 'Se colocan platos de pan de muerto, calaveritas de azúcar, velas encendidas y las comidas favoritas que disfrutaba el difunto en vida. Lejos de ser una jornada triste, es una fiesta alegre de reencuentro y amor eterno.',
        en: 'Plates of pan de muerto (sweet bread), sugar skulls, lit candles, and the deceased\'s favorite meals are placed on the altar. Far from being a sad day, it is a joyful celebration of reunion and eternal love.',
        ar: 'يوضع خبز الموتى الحلو، وجمال السكر، والشموع المشتعلة، والأطعمة المفضلة التي كان يستمتع بها الراحل في حياته. وبعيداً عن كونها مناسبة حزينة، فهي احتفال مبهج بإعادة اللقاء والحب الأبدي.'
      }
    ],
    vocabHighlights: [
      { word: 'cempasúchil', en: 'Mexican marigold flower for Day of the Dead', ar: 'زهرة السيمباسوتشيل البرتقالية التراثية' },
      { word: 'ofrenda', en: 'memorial altar / offering', ar: 'مزار تذكاري لتقديم القرابين الذكرية' },
      { word: 'pan de muerto', en: 'traditional Day of the Dead sweet bread', ar: 'خبز الموتى المكسيكي التراثي' }
    ],
    grammarHighlights: ['Relative pronoun cuyo/cuyos (cuyos pétalos trazaban)', 'Reflexive verbs with generic subject (Se colocan, se transforma)'],
    comprehensionQuiz: [
      {
        question_es: '¿Para qué se utilizan los pétalos de flor de cempasúchil en la ofrenda?',
        question_en: 'What are cempasúchil flower petals used for on the altar?',
        question_ar: 'فيما تستخدم بتلات أزهار السيمباسوتشيل في المزار التذكاري؟',
        options: ['Para hacer té caliente', 'Para guiar el camino de las almas con su color y aroma', 'Para cocinar sopa', 'Para pintar paredes'],
        answerIdx: 1,
        explanation_en: 'The vibrant orange petals and aroma are believed to guide spirits back to their loved ones.',
        explanation_ar: 'يعتقد أن البتلات البرتقالية المشرقة وعبيرها يبينان الطريق للأرواح للعودة إلى أحبائها.'
      }
    ]
  },
  {
    id: 'story-arg-11',
    title_es: 'La Leyenda de la Luz Mala en la Pampa',
    title_en: 'The Legend of the Evil Light in the Pampas',
    title_ar: 'أسطورة الضوء الشرير في سهول البامبا',
    cefr: 'B1',
    difficulty: 'Moderate',
    wordCount: 190,
    audioDurationSec: 84,
    paragraphs: [
      {
        es: 'En las vastas y solitarias llanuras de la pampa argentina, los gauchos transmiten desde hace generaciones la espeluznante leyenda de "La Luz Mala", un fenómeno folclórico que aterroriza a los viajeros nocturnos.',
        en: 'In the vast and lonely plains of the Argentine pampas, gauchos have passed down for generations the chilling legend of "La Luz Mala" (The Evil Light), a folkloric phenomenon that terrifies night travelers.',
        ar: 'في سهول البامبا الأرجنتينية الشاسعة والمنعزلة، ينقل فرسان "الغاوتشو" عبر الجيل تلو الآخر أسطورة "الضوء الشرير" المرعبة، وهي ظاهرة تراثية ترعب المسافرين ليلاً.'
      },
      {
        es: 'Cuentan que en las noches oscuras de invierno, una luz fosforescente de color verdoso flota misteriosamente a pocos centímetros del suelo sobre los cerros y quebradas. Según la creencia popular, esta luz representa el alma en pena de un difunto que no recibió cristiana sepultura.',
        en: 'They say that on dark winter nights, a greenish phosphorescent light floats mysteriously a few centimeters off the ground over hills and ravines. According to popular belief, this light represents the tormented soul of a deceased person who didn\'t receive proper burial.',
        ar: 'يروون أنه في ليالي الشتاء المظلمة، يطفو ضوء مخضر مشع بغروبة على بعد سنتيمترات قليلة من الأرض فوق التلال. ووفقاً للاعتقاد الشعبي، يمثل هذا الضوء روحاً معذبة لشخص راحل لم يدفن بشكل لائق.'
      },
      {
        es: 'Los gauchos experimentados aconsejan no acercarse nunca a la luz ni intentar atacarla, sino rezar una oración y alejarse despacio para evitar el peligro de sus emanaciones tóxicas.',
        en: 'Experienced gauchos advise never approaching the light nor trying to attack it, but rather saying a prayer and moving away slowly to avoid the danger of its toxic gas emanations.',
        ar: 'ينصح فرسان الغاوتشو الخبراء بعدم الاقتراب مطلقاً من الضوء أو محاولة مهاجمته، بل تلاوة صلاة والابتعاد ببطء لتجنب خطر انبعاثاته الغازية السامة.'
      }
    ],
    vocabHighlights: [
      { word: 'gauchos', en: 'Argentine prairie horsemen / cowboys', ar: 'فرسان الغاوتشو في سهول الأرجنتين' },
      { word: 'alma en pena', en: 'tormented / wandering soul', ar: 'روح هائمة معذبة' },
      { word: 'pampa', en: 'vast Argentine agricultural grasslands', ar: 'سهول البامبا الشاسعة الأرجنتينية' }
    ],
    grammarHighlights: ['Reporting verbs in story telling (Cuentan que, Según la creencia)', 'Advising structures with infinitive (aconsejan no acercarse)'],
    comprehensionQuiz: [
      {
        question_es: '¿Qué aconsejan los gauchos si alguien ve "La Luz Mala" en la noche?',
        question_en: 'What do gauchos advise if someone sees "La Luz Mala" at night?',
        question_ar: 'بماذا ينصح فرسان الغاوتشو إذا رأى أحد "الضوء الشرير" ليلاً؟',
        options: ['Correr hacia ella rápidamente', 'Rezar y alejarse despacio sin atacarla', 'Apagar el termo', 'Tomar una foto con luz flash'],
        answerIdx: 1,
        explanation_en: 'Gauchos warn never to attack the floating light, but to say a prayer and retreat quietly.',
        explanation_ar: 'يحذر الغاوتشو من مهاجمة الضوء الطافي، بل ينصحون بتلاوة صلاة والابتعاد بهدوء.'
      }
    ]
  },
  {
    id: 'story-mx-12',
    title_es: 'El Callejón del Beso y la Leyenda de Guanajuato',
    title_en: 'The Alleyway of the Kiss and the Legend of Guanajuato',
    title_ar: 'زقاق القبلة وأسطورة مدينة غواناخواتو',
    cefr: 'B1',
    difficulty: 'Moderate',
    wordCount: 195,
    audioDurationSec: 86,
    paragraphs: [
      {
        es: 'Guanajuato es una ciudad colonial fascinante construida sobre túneles subterráneos y colinas empinadas. Entre sus estrechas calles destaca "El Callejón del Beso", un paso tan angosto que los balcones de dos casas opuestas casi se tocan a pocos centímetros de distancia.',
        en: 'Guanajuato is a fascinating colonial city built over underground tunnels and steep hills. Among its narrow streets stands out "The Alleyway of the Kiss", a passage so narrow that the balconies of two opposite houses almost touch inches apart.',
        ar: 'غواناخواتو هي مدينة استعمارية ساحرة مبنية فوق أنفاق تحت الأرض وتلال شديدة الانحدار. ومن بين شوارعها الضيقة يبرز "زقاق القبلة"، وهو ممر ضيق جداً لدرجة أن شرفات منزلين متقابلين تكاد تتلامس على بعد سنتيمترات معدودة.'
      },
      {
        es: 'La leyenda narra el amor prohibido entre Doña Carmen, una joven noble de familia rica, y Don Luis, un humilde minero. Como el padre estricto de la joven prohibió su romance, Don Luis compró la casa de enfrente para poder hablar con su amada desde el balcón todas las noches.',
        en: 'The legend tells the forbidden love between Doña Carmen, a wealthy noble girl, and Don Luis, a humble miner. As the girl\'s strict father forbade their romance, Don Luis bought the house opposite to talk to his beloved from the balcony every night.',
        ar: 'تروي الأسطورة الحب المحرم بين دونيا كارمن، الفتاة النبيلة الثرية، ودون لويس، العامل البسيط في المناجم. ولأن والد الفتاة الصارم منع حبهما، اشترى دون لويس المنزل المقابل ليتمكن من الحديث مع حبيبته من الشرفة كل ليلة.'
      },
      {
        es: 'Hoy en día, la tradición exige que todas las parejas que visitan Guanajuato se paren en el tercer escalón del callejón y se den un beso para garantizar siete años de buena suerte y amor duradero.',
        en: 'Today, tradition dictates that all couples visiting Guanajuato stand on the third step of the alley and share a kiss to guarantee seven years of good luck and lasting love.',
        ar: 'اليوم، تقتضي التقاليد أن تقف جميع الأزواج الذين يزورون غواناخواتو على الدرجة الثالثة من الزقاق وتبادل قبلة لضمان سبع سنوات من الحظ السعيد والحب الداعم.'
      }
    ],
    vocabHighlights: [
      { word: 'callejón', en: 'narrow alleyway', ar: 'زقاق ضيق' },
      { word: 'angosto', en: 'narrow / tight space', ar: 'ضيق / محصور' },
      { word: 'amor prohibido', en: 'forbidden love', ar: 'حب محرم / ممنوع' }
    ],
    grammarHighlights: ['Consecutive clause with tan... que (tan angosto que se tocan)', 'Imperative in tradition reporting (exige que se paren)'],
    comprehensionQuiz: [
      {
        question_es: '¿En qué escalón del callejón deben besarse los enamorados según la tradición?',
        question_en: 'On which step of the alley must lovers kiss according to tradition?',
        question_ar: 'على أي درجة من الزقاق يجب أن يتبادل العشاق القبلات وفقاً للتقاليد؟',
        options: ['En el primer escalón', 'En el tercer escalón', 'En el último escalón', 'En el balcón superior'],
        answerIdx: 1,
        explanation_en: 'Tradition mandates kissing on the third step of the Alleyway of the Kiss for good luck.',
        explanation_ar: 'تقتضي التقاليد التبادل القبلات على الدرجة الثالثة في زقاق القبلة لجلب الحظ السعيد.'
      }
    ]
  },
  {
    id: 'story-arg-12',
    title_es: 'El Teatro Colón y la Acústica Perfecta',
    title_en: 'Teatro Colón and Perfect Acoustics',
    title_ar: 'مسرح كولون والصوتيات المثالية',
    cefr: 'B1',
    difficulty: 'Moderate',
    wordCount: 198,
    audioDurationSec: 87,
    paragraphs: [
      {
        es: 'El Teatro Colón de Buenos Aires está considerado por expertos internacionales como una de las cinco salas de ópera con mejor acústica del planeta, rivalizando con la Scala de Milán y el Ópera de París.',
        en: 'The Teatro Colón in Buenos Aires is considered by international experts as one of the top five opera houses with the best acoustics on the planet, rivaling Milan\'s La Scala and the Paris Opera.',
        ar: 'يُعتبر مسرح كولون في بوانس آيرس من قبل الخبراء الدوليين واحداً من أفضل خمس دور أوبرا تمتلك أفضل صوتيات على كوكب الأرض، منافساً مسرح لا سكالا في ميلانو وأوبرا باريس.'
      },
      {
        es: 'Inaugurado en mil novecientos ocho, su arquitectura ecléctica combina mármoles italianos, cristales franceses y una cúpula monumental decorada por el famoso pintor Raúl Soldi. Su diseño con forma de herradura permite que el sonido viaje de manera uniforme a cada rincón.',
        en: 'Inaugurated in 1908, its eclectic architecture combines Italian marble, French crystal, and a monumental dome decorated by painter Raúl Soldi. Its horseshoe-shaped design allows sound to travel uniformly to every corner.',
        ar: 'افتُتح المسرح عام 1908، وتدمج معماريته الانتقائية بين الرخام الإيطالي، والبلور الفرنسي، وقبة ضخمة مزينة من قبل الرسام الشهير راؤول سولدي. يسمح تصميمه على شكل نعل الفرس للصوت بالانتقال بشكل متساوٍ إلى كل زاوية.'
      },
      {
        es: 'Directores y cantantes líricos legendarios como Luciano Pavarotti afirmaron que el Teatro Colón tiene un defecto único: su acústica es tan perfecta que si un artista comete el más mínimo error, todo el público lo escucha de inmediato.',
        en: 'Legendary conductors and opera singers like Luciano Pavarotti stated that Teatro Colón has a unique flaw: its acoustics are so perfect that if an artist makes the slightest mistake, the entire audience hears it immediately.',
        ar: 'أكد رؤساء الفرق الموسيقية ومغنو الأوبرا الأسطوريون مثل لوتشيانو بافاروتي أن مسرح كولون يمتلك عيباً فريداً: وهو أن صوتياته مثالية جداً لدرجة أنه إذا ارتكب الفنان أصغر خطأ، يسمعه الجمهور بأكمله فوراً.'
      }
    ],
    vocabHighlights: [
      { word: 'acústica', en: 'acoustics / sound transmission quality', ar: 'جودة الصوتيات / هندسة الصوت' },
      { word: 'cúpula', en: 'architectural dome / cupola', ar: 'قبة معمارية' },
      { word: 'forma de herradura', en: 'horseshoe shape', ar: 'شكل نعل الفرس' }
    ],
    grammarHighlights: ['Passive voice (está considerado, fue decorado)', 'Conditionals in indirect speech (si comete un error, lo escucha)'],
    comprehensionQuiz: [
      {
        question_es: '¿Qué curioso "defecto" bromeaba Luciano Pavarotti sobre la acústica del Teatro Colón?',
        question_en: 'What curious "flaw" did Luciano Pavarotti joke about regarding Teatro Colón\'s acoustics?',
        question_ar: 'ما هو "العيب" الطريف الذي كان يمزح به لوتشيانو بافاروتي حول صوتيات مسرح كولون؟',
        options: ['Que el teatro era muy frío', 'Que si un artista comete un error, todos lo escuchan', 'Que los asientos eran duros', 'Que no había luces'],
        answerIdx: 1,
        explanation_en: 'Pavarotti joked that the acoustics are so precise that any small error is instantly heard by everyone.',
        explanation_ar: 'كان بافاروتي يمزح بأن الصوتيات دقيقة لدرجة أن أي خطأ صغير يُسمع فوراً من الجميع.'
      }
    ]
  },

  // ==========================================
  // LEVEL B2: ADVANCED FLUENCY & NUANCE (6 STORIES)
  // ==========================================
  {
    id: 'story-mx-13',
    title_es: 'El Muralismo de Siqueiros y la Geometría Dinámica',
    title_en: 'Siqueiros\' Muralism and Dynamic Geometry',
    title_ar: 'جداريات سيكيروس والفيزياء البصرية المزدوجة',
    cefr: 'B2',
    difficulty: 'Challenging',
    wordCount: 225,
    audioDurationSec: 105,
    paragraphs: [
      {
        es: 'Junto con Diego Rivera y José Clemente Orozco, David Alfaro Siqueiros conformó la tríada fundamental del muralismo mexicano. Sin embargo, Siqueiros se distanció de sus contemporáneos al concebir el arte público no solo como una narrativa histórica, sino como un fenómeno físico de transformación espacial.',
        en: 'Along with Diego Rivera and José Clemente Orozco, David Alfaro Siqueiros formed the fundamental triad of Mexican muralism. However, Siqueiros distanced himself from his contemporaries by conceiving public art not just as a historical narrative, but as a physical phenomenon of spatial transformation.',
        ar: 'إلى جانب دييغو ريفيرا وخوسيه كليمنتي أوروزكو، شكل ديفيد ألفارو سيكيروس الثلاثي الأساسي للرسم الجداري المكسيكي. ومع ذلك، ابتعد سيكيروس عن أقرانه من خلال تصور الفن العام ليس مجرد سرد تاريخي، بل كظاهرة فيزيائية للتحول المكاني.'
      },
      {
        es: 'Siqueiros desarrolló la teoría de la "poliangularidad", un método compositivo que contemplaba al espectador en constante movimiento y no como un observador estático. Utilizando materiales industriales vanguardistas como la piroxilina y la fibra de vidrio, creó superficies cóncavas y convexas que generan una ilusión cinemática de dinamismo.',
        en: 'Siqueiros developed the theory of "polyangularity," a compositional method contemplating the viewer in constant motion rather than a static observer. Using cutting-edge industrial materials like pyroxylin and fiberglass, he created concave and convex surfaces generating a cinematic illusion of dynamism.',
        ar: 'طور سيكيروس نظرية "تعدد الزوايا البصرية"، وهي طريقة تكوينية تأخذ في الاعتبار المشاهد وهو في حركة مستمرة وليس كمراقب ثابت. وباستخدام مواد صنعتیة متطورة مثل البايروكسيلين والألياف الزجاجية، خلق أسطحاً مقعرة ومحدبة تولد إيحاءً سينمائياً بالديناميكية.'
      },
      {
        es: 'Su obra cumbre, el Polyforum Siqueiros en la Ciudad de México, constituye el mural más grande del mundo. Resulta imperativo comprender cómo Siqueiros logró sintetizar la lucha de clases sociopolítica con una revolución estética que desafió los límites tridimensionales de la arquitectura.',
        en: 'His masterpiece, the Polyforum Siqueiros in Mexico City, constitutes the largest mural in the world. It is imperative to understand how Siqueiros synthesized sociopolitical class struggle with an aesthetic revolution that challenged the three-dimensional limits of architecture.',
        ar: 'تشكل تحفته الفنية، "بوليفوروم سيكيروس" في مدينة مكسيكو، أكبر جدارية في العالم. ومن الضروري فهم كيف نجح سيكيروس في دمج النضال الطبقي الاجتماعي والسياسي مع ثورة جمالية تحدت الحدود ثلاثية الأبعاد للعمارة.'
      }
    ],
    vocabHighlights: [
      { word: 'poliangularidad', en: 'polyangularity (multi-angle perspective)', ar: 'تعدد الزوايا البصرية في الفن' },
      { word: 'obra cumbre', en: 'masterpiece / pinnacle work', ar: 'العمل الفني الأسمى / التحفة' },
      { word: 'vanguardista', en: 'avant-garde / cutting-edge', ar: 'طليعي / متقدم عن عصره' }
    ],
    grammarHighlights: ['Advanced evaluative subjunctive (Resulta imperativo comprender cómo logró)', 'Complex discourse markers (Sin embargo, No solo... sino como)'],
    comprehensionQuiz: [
      {
        question_es: '¿En qué consiste el concepto estético de "poliangularidad" ideado por Siqueiros?',
        question_en: 'What does the aesthetic concept of "polyangularity" devised by Siqueiros consist of?',
        question_ar: 'فيما ينحصر المفهوم الجمالي لـ "تعدد الزوايا" الذي ابتكره سيكيروس؟',
        options: [
          'Pintar solo en cuadros cuadrados',
          'Diseñar la obra para un espectador en constante movimiento',
          'Utilizar un solo color primario',
          'Pintar paisajes exclusivamente rurales'
        ],
        answerIdx: 1,
        explanation_en: 'Polyangularity designed murals to interact with a walking, moving viewer rather than a stationary spectator.',
        explanation_ar: 'صممت نظرية تعدد الزوايا الجداريات لتتفاعل مع مشاهد متحرك ويسير وليس مع مراقب ثابت.'
      }
    ]
  },
  {
    id: 'story-arg-13',
    title_es: 'Jorge Luis Borges y los Laberintos Infinitos de Buenos Aires',
    title_en: 'Jorge Luis Borges and the Infinite Labyrinths of Buenos Aires',
    title_ar: 'خورخي لويس بورخيس ومتاهات بوانس آيرس اللانهائية',
    cefr: 'B2',
    difficulty: 'Challenging',
    wordCount: 230,
    audioDurationSec: 108,
    paragraphs: [
      {
        es: 'Considerado uno de los eruditos más geniales de la literatura universal del siglo veinte, Jorge Luis Borges transformó la fisonomía poética de Buenos Aires. A través de sus cuentos filosóficos, convirtió las calles tranquilas del barrio de Palermo y la Biblioteca Nacional en escenarios metafísicos donde el tiempo se bifurca.',
        en: 'Considered one of the most brilliant scholars of 20th-century universal literature, Jorge Luis Borges transformed the poetic landscape of Buenos Aires. Through his philosophical short stories, he turned the quiet streets of Palermo and the National Library into metaphysical settings where time forks.',
        ar: 'يُعتبر خورخي لويس بورخيس أحد أباطرة الأدب العالمي في القرن العشرين، حيث أحدث تحولاً في المشهد الشعري لبوانس آيرس. ومن خلال قصصه الفلسفية القصيرة، حوّل شوارع باليرمو الهادئة والمكتبة الوطنية إلى مسارح ما وراء الطبيعة حيث ينشعب الزمن.'
      },
      {
        es: 'Los temas recurrentes en la narrativa borgiana —los laberintos, los espejos, los libros infinitos y los tigres— no son meros recursos estilísticos, sino indagaciones profundas sobre la naturaleza de la realidad y la memoria humana. En su obra célebre "El Aleph", describe un punto en el espacio que contiene simultáneamente todos los lugares del universo sin solaparse.',
        en: 'Recurring themes in Borgesian narrative —labyrinths, mirrors, infinite books, and tigers— are not mere stylistic tropes, but profound inquiries into the nature of reality and human memory. In his famous work "The Aleph", he describes a point in space containing simultaneously all locations in the universe without overlapping.',
        ar: 'إن الموضوعات المتكررة في سرديات بورخيس — كالمتاهات، والمرايا، والكتب اللانهائية، والنمر — ليست مجرد أدوات أسلوبية، بل هي تحقيقات عميقة في طبيعة الواقع والذاكرة البشرية. وفي عمله الشهير "الأليف" (El Aleph)، يصف نقطة في الفضاء تحتوي في وقت واحد على كل الأماكن في الكون دون أن تتداخل.'
      },
      {
        es: 'Es imprescindible reconocer que la ceguera progresiva de Borges no impidió su vasta producción intelectual; al contrario, agudizó su visión interior, permitiéndole dictar ensayos magistrales a su madre y colaboradores. Su legado continúa fascinando a filósofos y lingüistas en todas las latitudes.',
        en: 'It is essential to recognize that Borges\' progressive blindness did not impede his vast intellectual production; on the contrary, it sharpened his inner vision, allowing him to dictate masterly essays to his mother and collaborators. His legacy continues to fascinate philosophers and linguists across all latitudes.',
        ar: 'من الضروري الاعتراف بأن العمى التدريجي لبورخيس لم يمنع إنتاجه الفكري الهائل؛ بل على العكس، زاد من حدة رؤيته الداخلية، مما سمح له بإملاء مقالات بارعة على والدته ومساعديه. ولا يزال إرثه يفتن الفلاسفة واللغويين في جميع أنحاء العالم.'
      }
    ],
    vocabHighlights: [
      { word: 'laberinto', en: 'labyrinth / maze', ar: 'متاهة' },
      { word: 'El Aleph', en: 'mystical point containing all universe points', ar: 'نقطة الأليف الفلسفية الحاوية للكون' },
      { word: 'indagación', en: 'deep inquiry / investigation', ar: 'تحقيق عميق / استقصاء' }
    ],
    grammarHighlights: ['Subjunctive clauses with obligation (Es imprescindible reconocer que no impidió)', 'Complex literary sentence structures'],
    comprehensionQuiz: [
      {
        question_es: '¿Qué representa "El Aleph" en la famosa obra homónima de Borges?',
        question_en: 'What does "The Aleph" represent in Borges\' famous work of the same name?',
        question_ar: 'ماذا تمثل نقطة "الأليف" في عمل بورخيس الشهير الذي يحمل الاسم نفسه؟',
        options: [
          'Un libro impreso en papel de oro',
          'Un punto espacial que contiene todos los lugares del universo simultáneamente',
          'Un espejo roto en el desierto',
          'Un café histórico en Buenos Aires'
        ],
        answerIdx: 1,
        explanation_en: 'In Borgesian lore, El Aleph is a point in space where all points in the universe coincide simultaneously.',
        explanation_ar: 'في إرث بورخيس الفلسفي، يعد الأليف نقطة في الفضاء تجتمع فيها كل نقاط الكون في وقت واحد.'
      }
    ]
  },
  {
    id: 'story-mx-14',
    title_es: 'El Ruido del Hielo en el Glaciar Perito Moreno',
    title_en: 'The Roar of Ice at Perito Moreno Glacier',
    title_ar: 'صوت جليد نهر بيريتو مورينو المتساقط',
    cefr: 'B2',
    difficulty: 'Challenging',
    wordCount: 220,
    audioDurationSec: 102,
    paragraphs: [
      {
        es: 'Situado en el Parque Nacional Los Glaciares en la Patagonia argentina, el Glaciar Perito Moreno constituye una de las reservas de agua dulce más imponentes del planeta. A diferencia de la mayoría de los glaciares del mundo que sufren un retroceso drástico por el cambio climático, el Perito Moreno se mantiene en un estado de equilibrio dinámico insólito.',
        en: 'Located in Los Glaciares National Park in Argentine Patagonia, the Perito Moreno Glacier constitutes one of the most imposing freshwater reserves on the planet. Unlike most glaciers worldwide undergoing drastic retreat due to climate change, Perito Moreno remains in an unusual state of dynamic equilibrium.',
        ar: 'يقع نهر بيريتو مورينو الجليدي في متنزه خلاسيايرس الوطني في باتاغونيا الأرجنتينية، ويشكل أحد أكثر احتياطيات المياه العذبة إبهاراً على كوكب الأرض. وعلى عكس معظم الأنهار الجليدية في العالم التي تعاني من تراجع حاد بسبب التغير المناخي، يحافظ بيريتو مورينو على حالة فريدة من التوازن الديناميكي.'
      },
      {
        es: 'El fenómeno más espectacular ocurre cuando el glaciar avanza hasta tocar la península de Magallanes, bloqueando el flujo del agua del Lago Argentino. Al quedar dividido, el nivel del agua en el brazo rico se eleva dramáticamente, ejerciendo una presión hidráulica colosal contra el muro de hielo azulado.',
        en: 'The most spectacular phenomenon occurs when the glacier advances until touching the Magallanes peninsula, blocking the water flow of Lake Argentino. Becoming divided, the water level in the flooded arm rises dramatically, exerting colossal hydraulic pressure against the bluish wall of ice.',
        ar: 'تحدث الظاهرة الأكثر إبهاراً عندما يتقدم النهر الجليدي حتى يلمس شبه جزيرة ماغالانيس، حابساً تدفق مياه بحيرة أرجنتينو. وبانقسامها، يرتفع مستوى الماء في الجزء المحتجز بشكل درامي، ممارساً ضغطاً هيدروليكياً هائلاً ضد جدار الجليد الأزرق.'
      },
      {
        es: 'Eventualmente, el agua filtra la estructura helada generando un túnel natural que colapsa con un estruendo ensordecedor comparable al trueno. Miles de turistas de todas las latitudes aguardan con contención para contemplar la ruptura de este gigante de hielo.',
        en: 'Eventually, the water seeps through the frozen structure creating a natural arch that collapses with a deafening roar comparable to thunder. Thousands of tourists from all latitudes wait breathlessly to contemplate the rupture of this icy giant.',
        ar: 'وفي النهاية، تتسرب المياه عبر الهيكل المتجمد مخترقة نفقاً طبيعياً ينهار بدوي صام للآذان يشبه الرعد. ينتظر آلاف السياح من جميع أنحاء العالم بحبس للأنفاس لمشاهدة انهيار هذا العملاق الجليدي.'
      }
    ],
    vocabHighlights: [
      { word: 'equilibrio dinámico', en: 'dynamic equilibrium', ar: 'توازن ديناميكي مستمر' },
      { word: 'presión hidráulica', en: 'hydraulic pressure', ar: 'ضغط هيدروليكي للمياه' },
      { word: 'estruendo ensordecedor', en: 'deafening roar / crash', ar: 'دوي صام للآذان' }
    ],
    grammarHighlights: ['Participial clauses (Al quedar dividido, ejerciendo una presión)', 'Advanced environmental vocabulary'],
    comprehensionQuiz: [
      {
        question_es: '¿Por qué es especial el estado del Glaciar Perito Moreno en comparación con otros glaciares?',
        question_en: 'Why is the state of the Perito Moreno Glacier special compared to other glaciers?',
        question_ar: 'لماذا تعد حالة نهر بيريتو مورينو الجليدي مميزة مقارنة بالأنهار الجليدية الأخرى؟',
        options: [
          'Está hecho de agua salada',
          'Mantiene un estado de equilibrio dinámico en lugar de retroceder drásticamente',
          'Se encuentra en un desierto cálido',
          'Es el glaciar más pequeño del mundo'
        ],
        answerIdx: 1,
        explanation_en: 'Unlike most receding glaciers, Perito Moreno advances and maintains a unique balance.',
        explanation_ar: 'على عكس معظم الأنهار الجليدية المتراجعة، يتقدم بيريتو مورينو ويحافظ على توازن فريد.'
      }
    ]
  },
  {
    id: 'story-mx-15',
    title_es: 'Frida Kahlo: Resiliencia, Identidad y Simbolismo',
    title_en: 'Frida Kahlo: Resilience, Identity and Symbolism',
    title_ar: 'فريدا كاهلو: الصمود والإرث والرمزية',
    cefr: 'B2',
    difficulty: 'Challenging',
    wordCount: 228,
    audioDurationSec: 106,
    paragraphs: [
      {
        es: 'La figura de Frida Kahlo ha trascendido las fronteras de la historia del arte para convertirse en un ícono global de resiliencia y emancipación cultural. Afectada por la poliomielitis en su infancia y víctima de un trágico accidente de autobús a los dieciocho años, Kahlo convirtió el sufrimiento físico e introspectivo en la materia prima de su pintura.',
        en: 'The figure of Frida Kahlo has transcended the borders of art history to become a global icon of resilience and cultural emancipation. Affected by polio in childhood and victim of a tragic bus accident at eighteen, Kahlo transformed physical and introspective suffering into the raw material of her painting.',
        ar: 'تجاوزت شخصية فريدا كاهلو حدود تاريخ الفن لتصبح أيقونة عالمية للصمود والتحرر الثقافي. وبسبب إصابتها بشلل الأطفال في طفولتها وكونها ضحية لحادث حافلة مأساوي في سن الثامنة عشرة، حوّلت كاهلو المعاناة الجسدية والنفسية إلى المادة الخام للوحاتها.'
      },
      {
        es: 'En lugar de adherirse al surrealismo europeo impulsado por André Breton —quien definió su obra como una cinta de seda alrededor de una bomba—, Frida insistió en que ella nunca pintó sueños, sino su propia realidad cruda. Sus autorretratos exploran la dualidad de la identidad mestiza mexicana, vistiendo vestidos huipiles tradicionales de Tehuana.',
        en: 'Instead of adhering to European surrealism promoted by André Breton —who defined her work as a ribbon of silk around a bomb—, Frida insisted she never painted dreams, but her own raw reality. Her self-portraits explore the duality of Mexican mestizo identity, wearing traditional Tehuana huipil dresses.',
        ar: 'وبدلاً من الالتزام بالسريالية الأوروبية التي روّج لها أندريه بريتون — الذي وصف عملها بـ "شريط من الحرير حول قنبلة" — أصرت فريدا على أنها لم ترسم أحلاماً قط، بل رسمت واقعها القاسي الخاص. تستكشف لوحاتها الشخصية ازدواجية الهوية المكسيكية التراثية، مجهزة بفساتين "التيهوانا" التقليدية.'
      },
      {
        es: 'Resulta fascinante analizar cómo Frida integró elementos de la botánica autóctona, corazones sangrantes y la cosmogónica prehispánica para construir una mitología personal e inconfundible. Su legado en La Casa Azul de Coyoacán continúa inspirando a generaciones sobre la fuerza transformadora del arte frente a la adversidad.',
        en: 'It is fascinating to analyze how Frida integrated elements of native botany, bleeding hearts, and pre-Hispanic cosmogony to construct a personal, unmistakable mythology. Her legacy at La Casa Azul in Coyoacán continues to inspire generations on art\'s transformative power against adversity.',
        ar: 'إنه لمن المثير للفهم تحليل كيف دمجت فريدا عناصر من النباتات المحلية، والقلوب النازفة، والأساطير المكسيكية لبناء ميثولوجيا شخصية لا تُخطئها العين. ولا يزال إرثها في "البيت الأزرق" بكويواكان يلهم الجيل بعد الآخر حول قوة الفن التحويلية في مواجهة الشدائد.'
      }
    ],
    vocabHighlights: [
      { word: 'resiliencia', en: 'resilience / psychological endurance', ar: 'الصمود النفسي والقدرة على النهوض' },
      { word: 'autorretrato', en: 'self-portrait', ar: 'بورتريه شخصي ذاتي' },
      { word: 'huipil', en: 'traditional indigenous embroidered blouse', ar: 'قميص الهوي بيل التقليدي المكسيكي' }
    ],
    grammarHighlights: ['Discourse opposition (En lugar de adherirse, sino su propia realidad)', 'Evaluative subjunctive constructions'],
    comprehensionQuiz: [
      {
        question_es: '¿Por qué rechazaba Frida Kahlo la etiqueta de "surrealista" para sus pinturas?',
        question_en: 'Why did Frida Kahlo reject the "surrealist" label for her paintings?',
        question_ar: 'لماذا رفضت فريدا كاهلو وصف لوحاتها بـ "السريالية"؟',
        options: [
          'Porque no le gustaban los pintores franceses',
          'Porque afirmaba que no pintaba sueños sino su propia realidad',
          'Porque solo pintaba animales domésticos',
          'Porque sus pinturas eran en blanco y negro'
        ],
        answerIdx: 1,
        explanation_en: 'Frida famously stated she never painted dreams, but her own deeply felt lived reality.',
        explanation_ar: 'صرحت فريدا بعبارتها الشهيرة بأنها لم ترسم أحلاماً قط، بل رسمت واقعها المعاش العميق.'
      }
    ]
  },
  {
    id: 'story-arg-14',
    title_es: 'El Fileteado Porteño: Arte Popular Urbano de Buenos Aires',
    title_en: 'El Fileteado Porteño: Urban Folk Art of Buenos Aires',
    title_ar: 'فن الفيلتيادو البورتيني: الفن الشعبي الحضري لبوانس آيرس',
    cefr: 'B2',
    difficulty: 'Challenging',
    wordCount: 222,
    audioDurationSec: 104,
    paragraphs: [
      {
        es: 'Surgido de forma humilde a comienzos del siglo veinte en las carrocerías de los carros de tracción a sangre que transportaban alimentos por Buenos Aires, el Fileteado Porteño evolucionó hasta convertirse en la expresión gráfica tradicional más emblemática de la capital argentina.',
        en: 'Emerging humbly at the beginning of the 20th century on the wooden bodies of horse-drawn carts transporting food through Buenos Aires, Fileteado Porteño evolved into the most emblematic traditional graphic expression of the Argentine capital.',
        ar: 'نشأ فن "الفيلتيادو البورتيني" بشكل تواضع في بداية القرن العشرين على هياكل عربات الخيول التي تنقل الأطعمة عبر بوانس آيرس، وتطور ليصبح التعبير الجرافيكي التقليدي الأكثر تميزاً في العاصمة الأرجنتينية.'
      },
      {
        es: 'Esta técnica ornamental se caracteriza por el uso de líneas en espiral, hojas de acanto estilizadas, cintas con los colores de la bandera nacional, flores carnosas y dragones. Asimismo, suele incorporar frases refranescas o sabidurías populares redactadas en lunfardo, el argot porteño nacido en los arrabales.',
        en: 'This ornamental technique is characterized by spiral lines, stylized acanthus leaves, ribbons with national flag colors, fleshy flowers, and dragons. Furthermore, it incorporates proverbs or popular wisdoms written in lunfardo, the Buenos Aires slang born in working-class outskirts.',
        ar: 'تتميز هذه التقنية الزخرفية باستخدام خطوط حلزونية، وأوراق نباتية صفراء، وأشرطة بألوان العلم الوطني، وأزهار داكنة، وتنانين. كما أنها تتضمن أمثالاً شعبيات أو حكماً مكتوبة بلغة "اللونفاردو" (Lunfardo)، وهي اللهجة المكسيكية الشعبية المجهولة في الضواحي.'
      },
      {
        es: 'Inscrito por la UNESCO en la lista representativa del Patrimonio Cultural Inmaterial de la Humanidad, es fundamental preservar el fileteado no solo como un oficio artesanal nostálgico, sino como un lenguaje visual vibrante que continúa vistiendo colectivos, letreros de cafés y fachadas urbanas.',
        en: 'Inscribed by UNESCO on the Representative List of the Intangible Cultural Heritage of Humanity, it is essential to preserve fileteado not merely as a nostalgic craft, but as a vibrant visual language continuing to dress buses, cafe signs, and urban facades.',
        ar: 'وبإدراجه من قبل اليونسكو في القائمة التمثيلية للتراث الثقافي غير المادي للإنسانية، فمن الضروري الحفاظ على هذا الفن ليس فقط كحرفة أرجنتينية حنينية، بل كبلسان بصري نابض بالحياة يزين الحافلات والشاحنات وواجهات المحال.'
      }
    ],
    vocabHighlights: [
      { word: 'fileteado', en: 'traditional decorative painting technique of Buenos Aires', ar: 'فن الفيلتيادو البورتيني الزخرفي التراثي' },
      { word: 'lunfardo', en: 'slang argot of Buenos Aires working class', ar: 'عامية اللونفاردو الشعبية ببوانس آيرس' },
      { word: 'hojas de acanto', en: 'stylized acanthus leaf motifs', ar: 'أوراق نبات الأكانثوس الزخرفية' }
    ],
    grammarHighlights: ['Participial clauses (Surgido de forma humilde, Inscrito por la UNESCO)', 'Formal connectors (Asimismo, De forma humilde)'],
    comprehensionQuiz: [
      {
        question_es: '¿En qué tipo de transporte nació originalmente la técnica del Fileteado Porteño?',
        question_en: 'On what type of transport did the Fileteado Porteño technique originally emerge?',
        question_ar: 'على أي نوع من المواصلات نشأت تقنية الفيلتيادو البورتيني في البداية؟',
        options: [
          'En los aviones comerciales',
          'En los carros de tracción a sangre (caballos) que transportaban alimentos',
          'En barcos de vela italianos',
          'En los trenes de alta velocidad'
        ],
        answerIdx: 1,
        explanation_en: 'It originated on horse-drawn food delivery carts driven by Italian immigrants in Buenos Aires.',
        explanation_ar: 'نشأت التقنية على عربات الخيول الخشبية لنقل الأطعمة التي كان يقودها المهاجرون الإيطاليون في بوانس آيرس.'
      }
    ]
  },
  {
    id: 'story-mx-16',
    title_es: 'La Santuario de la Mariposa Monarca en Michoacán',
    title_en: 'The Monarch Butterfly Sanctuary in Michoacán',
    title_ar: 'محمية الفراشات الملكية الهائجة في ميتشواكان',
    cefr: 'B2',
    difficulty: 'Challenging',
    wordCount: 220,
    audioDurationSec: 102,
    paragraphs: [
      {
        es: 'Cada otoño, millones de mariposas monarca emprenden una travesía migratoria épica de más de cuatro mil kilómetros desde los bosques de Canadá y Estados Unidos hasta las montañas boscosas de oyamel en el estado de Michoacán, México.',
        en: 'Every autumn, millions of monarch butterflies undertake an epic migratory journey of over four thousand kilometers from the forests of Canada and the United States to the oyamel fir forests in Michoacán state, Mexico.',
        ar: 'في كل خريف، تخوض ملايين الفراشات الملكية رحلة هجرة ملحمية تتجاوز أربعة آلاف كيلومتر من غابات كندا والولايات المتحدة إلى جبال الصنوبر في ولاية ميتشواكان بالمكسيك.'
      },
      {
        es: 'Este fenómeno biológico único en la naturaleza resulta prodigioso porque las mariposas que completan el viaje pertenecen a la "generación Methuselah", una generación especial que vive hasta ocho meses —a diferencia de las mariposas comunes que solo viven pocas semanas— para poder completar el ciclo migratorio.',
        en: 'This unique biological phenomenon in nature is prodigious because the butterflies completing the trip belong to the "Methuselah generation," a special generation living up to eight months —unlike common butterflies living only a few weeks— to complete the migratory cycle.',
        ar: 'تعتبر هذه الظاهرة البيولوجية الفريدة في الطبيعة مذهلة لأن الفراشات التي تكمل الرحلة تنتمي إلى "جيل متوشالح"، وهو جيل خاص يعيش حتى ثمانية أشهر — على عكس الفراشات العادية التي تعيش بضعة أسابيع فقط — لتمكينها من إكمال دورة الهجرة.'
      },
      {
        es: 'Al llegar a los santuarios de Michoacán, las mariposas se agrupan por millones en los troncos y ramas de los árboles para protegerse del frío invernal, tiñendo el bosque de un color naranja dorado deslumbrante. Proteger este ecosistema es una prioridad crucial para la biodiversidad global.',
        en: 'Upon arriving at the Michoacán sanctuaries, the butterflies cluster by the millions on tree trunks and branches to protect against winter cold, dyeing the forest a dazzling golden orange. Protecting this ecosystem is a crucial priority for global biodiversity.',
        ar: 'وعند وصولها إلى محميات ميتشواكان، تتجمع الفراشات بالملايين على جذوع وأغصان الأشجار لحماية نفسها من برد الشتاء، صابغة الغابة بلون برتقالي ذهبي مذهل. وتعد حماية هذا النظام البيئي أولوية حاسمة للتنوع البيولوجي العالمي.'
      }
    ],
    vocabHighlights: [
      { word: 'travesía migratoria', en: 'migratory journey', ar: 'رحلة هجرة ملحمية' },
      { word: 'bosques de oyamel', en: 'oyamel fir tree forests', ar: 'غابات أشجار الصنوبر المكسيكية' },
      { word: 'generación Methuselah', en: 'Methuselah generation (long-lived monarch butterfly gen)', ar: 'جيل متوشالح المعمر من الفراشات' }
    ],
    grammarHighlights: ['Gerund of effect (tiñendo el bosque de un color naranja)', 'Comparative clause with a diferencia de'],
    comprehensionQuiz: [
      {
        question_es: '¿Por qué es especial la llamada "generación Methuselah" de la mariposa monarca?',
        question_en: 'Why is the so-called "Methuselah generation" of the monarch butterfly special?',
        question_ar: 'لماذا يُعد جيل "متوشالح" من الفراشات الملكية خاصاً ومميزاً؟',
        options: [
          'Porque son mariposas de color azul',
          'Porque viven hasta ocho meses para realizar la larga migración',
          'Porque no pueden volar en el frío',
          'Porque nacen en cuevas subterráneas'
        ],
        answerIdx: 1,
        explanation_en: 'This special long-lived generation can live up to 8 months to complete the 4,000 km migration journey.',
        explanation_ar: 'يمكن لِهذا الجيل المعمر الخاص أن يعيش حتى 8 أشهر لقطع رحلة الهجرة الهائلة البالغة 4,000 كم.'
      }
    ]
  }
];
