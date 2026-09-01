import { ComprehensibleStory } from '../types';

export const COMPREHENSIBLE_STORIES: ComprehensibleStory[] = [
  {
    id: 'story-1',
    title_es: 'Un Paseo por Coyoacán',
    title_en: 'A Walk through Coyoacán',
    title_ar: 'نزهة في كويواكان',
    cefr: 'A1',
    difficulty: 'Easy',
    wordCount: 145,
    audioDurationSec: 65,
    paragraphs: [
      {
        es: 'Hoy es domingo y el sol brilla en el cielo de Coyoacán, un barrio muy hermoso e histórico en el sur de la Ciudad de México. Carlos camina por la plaza principal, respira el aire fresco y compra unos churros calientes con chocolate.',
        en: 'Today is Sunday and the sun is shining in the sky of Coyoacán, a very beautiful and historic neighborhood in the south of Mexico City. Carlos walks through the main plaza, breathes the fresh air and buys some hot churros with chocolate.',
        ar: 'اليوم هو الأحد والشمس تشرق في سماء كويواكان، وهو حي جميل وتاريخي للغاية جنوب مدينة مكسيكو. يسير كارلوس في الساحة الرئيسية، ويستنشق الهواء النقي ويشتري بعض الشوروز الساخنة مع الشوكولاتة.'
      },
      {
        es: 'Visita la famosa Casa Azul, el hogar de la pintora Frida Kahlo y el gran muralista Diego Rivera. Allí ve los jardines llenos de plantas tropicales y las obras de arte que celebran la identidad mexicana.',
        en: 'He visits the famous Casa Azul (Blue House), the home of the painter Frida Kahlo and the great muralist Diego Rivera. There he sees gardens full of tropical plants and artworks that celebrate Mexican identity.',
        ar: 'يزور البيت الأزرق الشهير (Casa Azul)، وهو منزل الرسامة فريدا كاهلو والرسام الجداري الكبير دييغو ريفيرا. هناك يرى حدائق مليئة بالنباتات الاستوائية والأعمال الفنية التي تحتفي بالهوية المكسيكية.'
      },
      {
        es: 'Luego, decide comer unos deliciosos tacos al pastor con cilantro, cebolla y piña en un mercado tradicional. Carlos sonríe porque ama vivir en una ciudad con tanta cultura, color e historia.',
        en: 'Then, he decides to eat some delicious tacos al pastor with cilantro, onion and pineapple in a traditional market. Carlos smiles because he loves living in a city with so much culture, color and history.',
        ar: 'ثم يقرر تناول تاكو الـ "باستور" اللذيذ مع الكزبرة والبصل والأناناس في سوق تقليدي. يبتسم كارلوس لأنه يحب العيش في مدينة غنية بالثقافة والألوان والتاريخ.'
      }
    ],
    vocabHighlights: [
      { word: 'barrio', en: 'neighborhood', ar: 'حيّ' },
      { word: 'hogar', en: 'home', ar: 'منزل / بيت' },
      { word: 'tacos al pastor', en: 'spit-roasted pork tacos', ar: 'تاكو الباستور (لحم مشوي على السيخ)' }
    ],
    grammarHighlights: ['Regular present tense', 'Noun-adjective agreement (churros calientes)', 'Prepositions of place (en el sur de)'],
    comprehensionQuiz: [
      {
        question_es: '¿Qué barrio de la Ciudad de México visita Carlos?',
        question_en: 'Which neighborhood of Mexico City does Carlos visit?',
        question_ar: 'أي حي في مدينة مكسيكو يزوره كارلوس؟',
        options: ['Madrid', 'Coyoacán', 'Oaxaca', 'Cancún'],
        answerIdx: 1,
        explanation_en: 'The story is centered on Coyoacán, located in the south of Mexico City.',
        explanation_ar: 'تتمحور القصة حول حي كويواكان الواقع في جنوب مدينة مكسيكو.'
      },
      {
        question_es: '¿De quiénes era la Casa Azul?',
        question_en: 'Whose home was the Blue House (Casa Azul)?',
        question_ar: 'من كان يملك البيت الأزرق؟',
        options: ['Hernán Cortés', 'Don Rodrigo y Mateo', 'Frida Kahlo y Diego Rivera', 'Carlos y Lucía'],
        answerIdx: 2,
        explanation_en: 'The Casa Azul was the home of legendary artists Frida Kahlo and Diego Rivera.',
        explanation_ar: 'كان البيت الأزرق هو منزل الفنانين الأسطوريين فريدا كاهلو ودييغو ريفيرا.'
      }
    ]
  },
  {
    id: 'story-2',
    title_es: 'El Viaje a Oaxaca y el Mercado Secreto',
    title_en: 'The Trip to Oaxaca and the Secret Market',
    title_ar: 'الرحلة إلى أوكساكا والسوق السري',
    cefr: 'A2',
    difficulty: 'Moderate',
    wordCount: 190,
    audioDurationSec: 85,
    paragraphs: [
      {
        es: 'El verano pasado, Lucía viajó a Oaxaca, una ciudad famosa en el sur de México por su gastronomía y sus tradiciones vivas.',
        en: 'Last summer, Lucía traveled to Oaxaca, a famous city in southern Mexico known for its gastronomy and living traditions.',
        ar: 'في الصيف الماضي، سافرت لوسيا إلى أوكساكا، وهي مدينة شهيرة في جنوب المكسيك بفنون الطهي وتقاليدها الحية.'
      },
      {
        es: 'Un día, mientras caminaba por las calles empedradas, una señora amable le recomendó visitar un pequeño mercado artesanal que no aparecía en los mapas turísticos.',
        en: 'One day, while walking along the cobblestone streets, a kind lady recommended she visit a small artisan market that did not appear on tourist maps.',
        ar: 'في أحد الأيام، وبينما كانت تمشي في الشوارع المرصوفة بالحصى، نصحتها سيدة لطيفة بزيارة سوق حرفي صغير لم يكن موجوداً على الخرائط السياحية.'
      },
      {
        es: 'Allí encontró telas tejidas a mano con colores brillantes y probó el auténtico chocolate caliente con canela y el mole tradicional de siete ingredientes. Fue la mejor experiencia de todo su viaje.',
        en: 'There she found hand-woven fabrics in bright colors and tasted authentic hot chocolate with cinnamon and traditional mole with seven ingredients. It was the best experience of her entire trip.',
        ar: 'هناك وجدت أقمشة منسوجة يدوياً بألوان زاهية وتذوقت الشوكولاتة الساخنة الأصلية بالقرفة وطبق "المولي" التقليدي المكون من سبعة مكونات. كانت أفضل تجربة في رحلتها بأكملها.'
      }
    ],
    vocabHighlights: [
      { word: 'gastronomía', en: 'gastronomy / cuisine', ar: 'فنون الطهي' },
      { word: 'calles empedradas', en: 'cobblestone streets', ar: 'شوارع مرصوفة بالحجارة' },
      { word: 'tejidas a mano', en: 'hand-woven', ar: 'منسوجة يدوياً' }
    ],
    grammarHighlights: ['Pretérito Indefinido (viajó, encontró, probó)', 'Imperfecto (caminaba, aparecía)', 'Adjective placement'],
    comprehensionQuiz: [
      {
        question_es: '¿Por qué era especial el mercado artesanal?',
        question_en: 'Why was the artisan market special?',
        question_ar: 'لماذا كان السوق الحرفي مميزاً؟',
        options: ['Era muy caro', 'No aparecía en los mapas turísticos', 'Estaba cerrado', 'Estaba en el aeropuerto'],
        answerIdx: 1,
        explanation_en: 'It did not appear on tourist maps, making it a hidden gem.',
        explanation_ar: 'لم يكن يظهر على الخرائط السياحية مما جعله كنزاً مخفياً.'
      }
    ]
  },
  {
    id: 'story-3',
    title_es: 'La Leyenda de Tenochtitlan y el Águila',
    title_en: 'The Legend of Tenochtitlan and the Eagle',
    title_ar: 'أسطورة تينوتشيتيتلان والنسر',
    cefr: 'B1',
    difficulty: 'Moderate',
    wordCount: 210,
    audioDurationSec: 95,
    paragraphs: [
      {
        es: 'Hace muchos siglos, el pueblo azteca (o mexica) caminó durante años buscando una señal sagrada enviada por su dios Huitzilopochtli para fundar su gran imperio.',
        en: 'Many centuries ago, the Aztec (or Mexica) people walked for years looking for a sacred sign sent by their god Huitzilopochtli to found their great empire.',
        ar: 'قبل قرون عديدة، سار شعب الأزتيك (أو المكسيكا) لسنوات بحثاً عن إشارة مقدسة أرسلها إلههم ويتزيلوبوتشتلي لتأسيس إمبراطوريتهم العظيمة.'
      },
      {
        es: 'La profecía decía que debían construir su ciudad en el lugar donde vieran un águila real devorando una serpiente sobre un nopal en medio de un lago. Finalmente, en el año mil trescientos veinticinco, vieron esta imagen exacta en el Lago de Texcoco.',
        en: 'The prophecy said they had to build their city where they saw a golden eagle devouring a serpent on a cactus in the middle of a lake. Finally, in the year 1325, they saw this exact image in Lake Texcoco.',
        ar: 'تقول النبوءة إن عليهم بناء مدينتهم في المكان الذي يرون فيه نسراً ذهبياً يلتهم ثعباناً فوق صبار في وسط بحيرة. وأخيراً، في عام 1325، رأوا هذه الصورة بالضبط في بحيرة تيكسكوكو.'
      },
      {
        es: 'Allí fundaron Tenochtitlan, una majestuosa metrópolis flotante con templos gigantescos y calzadas avanzadas. Siglos después, tras la llegada de los españoles liderados por Hernán Cortés, la ciudad se transformó en la actual Ciudad de México, pero el águila y el nopal siguen brillando con orgullo en el escudo nacional.',
        en: 'There they founded Tenochtitlan, a majestic floating metropolis with gigantic temples and advanced causeways. Centuries later, after the arrival of the Spaniards led by Hernán Cortés, the city transformed into modern-day Mexico City, but the eagle and the cactus continue to shine with pride on the national shield.',
        ar: 'هناك أسسوا تينوتشيتيتلان، وهي مدينة عائمة مهيبة ذات معابد عملاقة وطرق متطورة. بعد قرون، عقب وصول الإسبان بقيادة هيرنان كورتيس، تحولت المدينة إلى مدينة مكسيكو الحالية، لكن النسر والصبار لا يزالان يلمعان بفخر في الدرع الوطني المكسيكي.'
      }
    ],
    vocabHighlights: [
      { word: 'profecía', en: 'prophecy', ar: 'نبوءة' },
      { word: 'nopal', en: 'prickly pear cactus', ar: 'صبار النوبال' },
      { word: 'escudo nacional', en: 'national coat of arms', ar: 'الشعار الوطني' }
    ],
    grammarHighlights: ['Imperfect tense for backgrounds (decía, buscaban)', 'Pretérito Indefinido (fundaron, vieron, transformó)', 'Subjunctive in relative clauses (vieran)'],
    comprehensionQuiz: [
      {
        question_es: '¿Cuál era la señal sagrada que buscaban los aztecas?',
        question_en: 'What was the sacred sign the Aztecs were looking for?',
        question_ar: 'ما هي الإشارة المقدسة التي كان الأزتيك يبحثون عنها؟',
        options: [
          'Un jaguar negro corriendo en la selva',
          'Un águila devorando una serpiente sobre un nopal',
          'Una tormenta de fuego en las montañas',
          'Un templo de oro flotando en el agua'
        ],
        answerIdx: 1,
        explanation_en: 'They sought an eagle devouring a snake on a prickly pear cactus, which became the modern coat of arms of Mexico.',
        explanation_ar: 'كانوا يبحثون عن نسر يلتهم ثعباناً فوق صبار، والذي أصبح الشعار الوطني للمكسيك اليوم.'
      }
    ]
  },
  {
    id: 'story-4',
    title_es: 'Diego Rivera y los Murales de la Patria',
    title_en: 'Diego Rivera and the Murals of the Homeland',
    title_ar: 'دييغو ريفيرا وجداريات الوطن',
    cefr: 'B2',
    difficulty: 'Challenging',
    wordCount: 230,
    audioDurationSec: 110,
    paragraphs: [
      {
        es: 'En las paredes majestuosas del Palacio Nacional, situado en el corazón del Zócalo de la Ciudad de México, descansa uno de los tesoros artísticos más significativos del planeta: los murales de Diego Rivera.',
        en: 'On the majestic walls of the National Palace, located in the heart of Mexico City\'s Zócalo, rests one of the most significant artistic treasures on the planet: the murals of Diego Rivera.',
        ar: 'على الجدران المهيبة للقصر الوطني، الواقع في قلب ساحة السوكالو (Zócalo) في مدينة مكسيكو، يرقد أحد أهم الكنوز الفنية على كوكب الأرض: جداريات دييغو ريفيرا.'
      },
      {
        es: 'A lo largo de los años veinte y treinta, Rivera pintó "La Epopeya del Pueblo Mexicano", una representación visual masiva que abarca desde la civilización prehispánica azteca hasta los ideales de la Revolución de mil novecientos diez. Sus obras destacan por la fusión de colores vibrantes y el rescate de las raíces indígenas y obreras del país.',
        en: 'Throughout the 1920s and 30s, Rivera painted "The Epic of the Mexican People," a massive visual representation spanning from the pre-Hispanic Aztec civilization to the ideals of the 1910 Revolution. His works stand out for the fusion of vibrant colors and the reclaiming of the country\'s indigenous and working-class roots.',
        ar: 'طوال عشرينيات وثلاثينيات القرن الماضي، رسم ريفيرا جدارية "ملحمة الشعب المكسيكي"، وهي تمثيل بصري هائل يمتد من حضارة الأزتيك ما قبل الغزو الإسباني إلى مبادئ ثورة عام 1910. تتميز أعماله بدمج الألوان النابضة بالحياة وإحياء الجذور الأصلية والعمالية للبلاد.'
      },
      {
        es: 'Es fundamental que valoremos cómo Rivera convirtió el arte público en una herramienta educativa e histórica para el pueblo. Gracias a su visión monumental, hoy millones de visitantes de todo el mundo pueden comprender el dolor, la lucha y el triunfo de la historia de México en un solo golpe de vista.',
        en: 'It is essential that we value how Rivera turned public art into an educational and historical tool for the people. Thanks to his monumental vision, today millions of visitors from around the world can understand the pain, struggle, and triumph of Mexican history in a single glance.',
        ar: 'من الضروري أن نقدّر كيف حوّل ريفيرا الفن العام إلى أداة تعليمية وتاريخية للشعب. وبفضل رؤيته التاريخية العظيمة، يمكن لملايين الزوار من جميع أنحاء العالم اليوم فهم آلام ونضال وانتصارات تاريخ المكسيك في نظرة واحدة.'
      }
    ],
    vocabHighlights: [
      { word: 'muralista', en: 'muralist', ar: 'رسام جداريات' },
      { word: 'prehispánica', en: 'pre-Hispanic', ar: 'ما قبل الغزو الإسباني' },
      { word: 'herramienta', en: 'tool / instrument', ar: 'أداة' }
    ],
    grammarHighlights: ['Subjunctive in value clauses (Es fundamental que valoremos)', 'Compound prepositions (A lo largo de)', 'Complex relative sentences'],
    comprehensionQuiz: [
      {
        question_es: '¿Dónde se encuentran pintados los murales históricos de Diego Rivera mencionados?',
        question_en: 'Where are the mentioned historical murals of Diego Rivera painted?',
        question_ar: 'أين توجد جداريات دييغو ريفيرا التاريخية المذكورة في القصة؟',
        options: ['En la Casa Azul de Coyoacán', 'En el Palacio Nacional, en el Zócalo', 'En el Parque del Retiro', 'En un mercado secreto de Oaxaca'],
        answerIdx: 1,
        explanation_en: 'The murals are painted on the walls of the Palacio Nacional, located in the Zócalo (main square) of Mexico City.',
        explanation_ar: 'رُسمت الجداريات على جدران القصر الوطني الواقع في ساحة السوكالو (الساحة الرئيسية) بوسط مدينة مكسيكو.'
      }
    ]
  }
];
