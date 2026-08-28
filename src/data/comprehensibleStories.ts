import { ComprehensibleStory } from '../types';

export const COMPREHENSIBLE_STORIES: ComprehensibleStory[] = [
  {
    id: 'story-1',
    title_es: 'Un Día Tranquilo en Madrid',
    title_en: 'A Peaceful Day in Madrid',
    title_ar: 'يوم هادئ في مدريد',
    cefr: 'A1',
    difficulty: 'Easy',
    wordCount: 140,
    audioDurationSec: 65,
    paragraphs: [
      {
        es: 'Hoy es domingo y el sol brilla en el cielo azul de Madrid. Carlos se levanta a las ocho de la mañana, abre la ventana y respira el aire fresco.',
        en: 'Today is Sunday and the sun is shining in the blue sky of Madrid. Carlos gets up at eight in the morning, opens the window and breathes the fresh air.',
        ar: 'اليوم هو الأحد والشمس تسطع في سماء مدريد الزرقاء. يستيقظ كارلوس في الثامنة صباحاً، ويفتح النافذة ويتنفس الهواء العليل.'
      },
      {
        es: 'Prepara un café caliente con leche y come una tostada con aceite de oliva y tomate fresco. Luego, decide salir a caminar por el Parque del Retiro.',
        en: 'He prepares a hot coffee with milk and eats a piece of toast with olive oil and fresh tomato. Then, he decides to go for a walk in Retiro Park.',
        ar: 'يعد قهوة ساخنة بالحليب ويتناول شريحة خبز محمص بزيت الزيتون والطماطم الطازجة. ثم يقرر الخروج للتنزه في حديقة الريتيرو.'
      },
      {
        es: 'En el parque, ve a muchas familias felices. Algunos niños juegan con una pelota y otros montan en bicicleta. Carlos lee su libro favorito bajo la sombra de un gran árbol.',
        en: 'In the park, he sees many happy families. Some children play with a ball and others ride bicycles. Carlos reads his favorite book under the shade of a large tree.',
        ar: 'في الحديقة، يرى العديد من العائلات السعيدة. بعض الأطفال يلعبون بالكرة والبعض الآخر يركب الدراجات. يقرأ كارلوس كتابه المفضل تحت ظل شجرة كبيرة.'
      }
    ],
    vocabHighlights: [
      { word: 'levantarse', en: 'to get up', ar: 'يستيقظ / ينهض' },
      { word: 'tostada', en: 'toast', ar: 'خبز محمص' },
      { word: 'bajo la sombra', en: 'under the shade', ar: 'تحت الظل' }
    ],
    grammarHighlights: ['Regular present tense', 'Reflexive verbs (se levanta)', 'Gender agreement (cielo azul, aire fresco)'],
    comprehensionQuiz: [
      {
        question_es: '¿Qué día de la semana es en la historia?',
        question_en: 'What day of the week is it in the story?',
        question_ar: 'أي يوم من أيام الأسبوع في القصة؟',
        options: ['Lunes', 'Domingo', 'Sábado', 'Viernes'],
        answerIdx: 1,
        explanation_en: 'The story begins with "Hoy es domingo" (Today is Sunday).',
        explanation_ar: 'تبدأ القصة بعبارة "Hoy es domingo" (اليوم هو الأحد).'
      },
      {
        question_es: '¿Dónde lee Carlos su libro?',
        question_en: 'Where does Carlos read his book?',
        question_ar: 'أين يقرأ كارلوس كتابه؟',
        options: ['En su cama', 'En una cafetería', 'Bajo la sombra de un gran árbol en el parque', 'En el tren'],
        answerIdx: 2,
        explanation_en: 'Carlos reads under the shade of a big tree in Retiro park.',
        explanation_ar: 'يقرأ كارلوس تحت ظل شجرة كبيرة في حديقة الريتيرو.'
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
        es: 'Allí encontró telas tejidas a mano con colores brillantes y probó el auténtico chocolate caliente con canela. Fue la mejor experiencia de todo su viaje.',
        en: 'There she found hand-woven fabrics in bright colors and tasted authentic hot chocolate with cinnamon. It was the best experience of her entire trip.',
        ar: 'هناك وجدت أقمشة منسوجة يدوياً بألوان زاهية وتذوقت الشوكولاتة الساخنة الأصلية بالقرفة. كانت أفضل تجربة في رحلتها بأكملها.'
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
    title_es: 'El Dilema de las Ciudades Sostenibles',
    title_en: 'The Dilemma of Sustainable Cities',
    title_ar: 'معضلة المدن المستدامة',
    cefr: 'B1',
    difficulty: 'Moderate',
    wordCount: 220,
    audioDurationSec: 100,
    paragraphs: [
      {
        es: 'A medida que las poblaciones urbanas crecen a un ritmo acelerado, los arquitectos y planificadores se enfrentan a un desafío crucial: ¿cómo transformar las metrópolis en espacios ecológicos sin perder la vitalidad económica?',
        en: 'As urban populations grow at an accelerated pace, architects and urban planners face a crucial challenge: how to transform metropolises into ecological spaces without losing economic vitality?',
        ar: 'مع نمو سكان المدن بوتيرة متسارعة، يواجه المعماريون ومخططو المدن تحدياً حاسماً: كيف نحول المدن الكبرى إلى مساحات بيئية دون فقدان الحيوية الاقتصادية؟'
      },
      {
        es: 'Varios expertos sugieren que es fundamental que los gobiernos inviertan en transporte público eficiente y en energías renovables. Si todos utilizáramos bicicletas para trayectos cortos, la calidad del aire mejoraría sustancialmente.',
        en: 'Several experts suggest that it is essential for governments to invest in efficient public transport and renewable energies. If we all used bicycles for short trips, air quality would substantially improve.',
        ar: 'يقترح العديد من الخبراء أنه من الضروري أن تستثمر الحكومات في النقل العام الفعال والطاقات المتجددة. لو استخدمنا جميعاً الدراجات للمسافات القصيرة، لتحسنت جودة الهواء بشكل ملحوظ.'
      }
    ],
    vocabHighlights: [
      { word: 'ritmo acelerado', en: 'accelerated pace', ar: 'وتيرة متسارعة' },
      { word: 'vitalidad', en: 'vitality', ar: 'حيوية' },
      { word: 'sustancialmente', en: 'substantially', ar: 'بشكل جوهري / ملحوظ' }
    ],
    grammarHighlights: ['Subjunctive in impersonal clauses (es fundamental que inviertan)', 'Conditional hypothetical (Si utilizáramos..., mejoraría)', 'Complex relative connectors'],
    comprehensionQuiz: [
      {
        question_es: 'Según el texto, ¿qué mejoraría si usáramos más la bicicleta?',
        question_en: 'According to the text, what would improve if we used bicycles more?',
        question_ar: 'وفقاً للنص، ماذا سيتحسن لو استخدمنا الدراجات أكثر؟',
        options: ['La calidad del aire', 'El precio del petróleo', 'La velocidad de los coches', 'El turismo'],
        answerIdx: 0,
        explanation_en: 'Air quality would improve substantially.',
        explanation_ar: 'جودة الهواء ستتحسن بشكل جوهري.'
      }
    ]
  }
];
