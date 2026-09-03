export interface WorldGrammarSpec {
  grammarTitle_es: string;
  grammarTitle_en: string;
  grammarTitle_ar: string;
  keyRules: { rule_es: string; rule_en: string; example: string }[];
}

export interface WorldVocabSpec {
  vocabTitle_es: string;
  vocabTitle_en: string;
  vocabTitle_ar: string;
  targetCount: number;
  sampleChunks: { spanish: string; english: string; arabic: string }[];
}

export interface WorldCurriculumMeta {
  unitNumber: number;
  worldName_es: string;
  worldName_en: string;
  worldName_ar: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  grammar: WorldGrammarSpec;
  vocabulary: WorldVocabSpec;
}

export const WORLD_CURRICULUM_SPECS: Record<number, WorldCurriculumMeta> = {
  1: {
    unitNumber: 1,
    worldName_es: 'Saludos y Primeros Contactos',
    worldName_en: 'Greetings & Street Icebreakers',
    worldName_ar: 'التحيات واللقاءات الأولى',
    level: 'A1',
    grammar: {
      grammarTitle_es: 'Ser vs Estar Básico y Artículos',
      grammarTitle_en: 'Basic Ser vs Estar & Definite Articles',
      grammarTitle_ar: 'أساسيات Ser و Estar وأدوات التعريف',
      keyRules: [
        { rule_es: 'Verbo Ser para identidad y origen', rule_en: 'Use "Ser" for identity and origin (Soy Carlos, soy de Madrid)', example: 'Yo soy estudiante' },
        { rule_es: 'Verbo Estar para estado y ubicación', rule_en: 'Use "Estar" for states and locations (Estoy bien, estoy en el café)', example: '¿Cómo estás tú?' },
        { rule_es: 'Artículos definidos: el, la, los, las', rule_en: 'Definite articles agree in gender and number', example: 'el café / la cuenta' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Frases de Cortesía y Pedidos',
      vocabTitle_en: 'Courtesies & Café Requests',
      vocabTitle_ar: 'عبارات اللباقة وطلبات المقاهي',
      targetCount: 25,
      sampleChunks: [
        { spanish: '¡Mucho gusto!', english: 'Pleased to meet you!', arabic: 'تشرفت بمعرفتك!' },
        { spanish: '¿Me pones un café cortado?', english: 'Can I have an espresso with milk?', arabic: 'هل يمكنني الحصول على قهوة بالحليب؟' },
        { spanish: 'La cuenta, por favor', english: 'The bill, please', arabic: 'الفاتورة، من فضلك' }
      ]
    }
  },
  2: {
    unitNumber: 2,
    worldName_es: 'Identidad y Registro Social',
    worldName_en: 'Personal Info & Registration',
    worldName_ar: 'المعلومات الشخصية والتسجيل',
    level: 'A1',
    grammar: {
      grammarTitle_es: 'Presente de Indicativo (-AR) y Interrogativos',
      grammarTitle_en: 'Present Tense (-AR Verbs) & Question Words',
      grammarTitle_ar: 'المضارع للأفعال التي تنتهي بـ AR وأسماء الاستفهام',
      keyRules: [
        { rule_es: 'Conjugación de verbos -AR (hablar, trabajar)', rule_en: '-AR endings: -o, -as, -a, -amos, -áis, -an', example: 'Yo hablo español' },
        { rule_es: 'Partículas interrogativas principales', rule_en: 'Question words take written accents (cómo, dónde, cuántos)', example: '¿Dónde trabajas?' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Formularios y Documentos de Identidad',
      vocabTitle_en: 'Forms, IDs & Contact Info',
      vocabTitle_ar: 'الاستمارات ووثائق الهوية ومعلومات الاتصال',
      targetCount: 30,
      sampleChunks: [
        { spanish: 'Mi número de pasaporte es...', english: 'My passport number is...', arabic: 'رقم جواز السفر الخاص بي هو...' },
        { spanish: '¿Cuál es tu dirección de correo?', english: 'What is your email address?', arabic: 'ما هو عنوان بريدك الإلكتروني؟' },
        { spanish: 'Rellenar la ficha de registro', english: 'Fill out the registration form', arabic: 'ملء استمارة التسجيل' }
      ]
    }
  },
  3: {
    unitNumber: 3,
    worldName_es: 'Familia y Amigos de Viaje',
    worldName_en: 'Family & Travel Companions',
    worldName_ar: 'العلاقات والأصدقاء والأسرة',
    level: 'A1',
    grammar: {
      grammarTitle_es: 'Posesivos y Verbo Tener',
      grammarTitle_en: 'Possessive Adjectives & Verb Tener',
      grammarTitle_ar: 'صفات الملكية والفعل Tener',
      keyRules: [
        { rule_es: 'Adjetivos posesivos (mi, tu, su, nuestro)', rule_en: 'Possessives agree with the item owned, not owner', example: 'Mis amigos / Nuestra casa' },
        { rule_es: 'Verbo irregular Tener (tengo, tienes, tiene)', rule_en: 'Expressing age and possession with Tener', example: 'Tengo 28 años' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Membresía Familiar y Descripciones',
      vocabTitle_en: 'Family Members & Personal Traits',
      vocabTitle_ar: 'أفراد العائلة والصفات الشخصية',
      targetCount: 30,
      sampleChunks: [
        { spanish: 'Viajo con mi hermano menor', english: 'I am traveling with my younger brother', arabic: 'أن أسافر مع أخي الأصغر' },
        { spanish: 'Es una persona muy simpática', english: 'They are a very friendly person', arabic: 'إنه شخص لطيف للغاية' }
      ]
    }
  },
  4: {
    unitNumber: 4,
    worldName_es: 'Alojamiento y Alquileres',
    worldName_en: 'Housing & Rental Survival',
    worldName_ar: 'البحث عن سكن وإيجاد شقة',
    level: 'A1',
    grammar: {
      grammarTitle_es: 'Hay vs Estar y Preposiciones de Lugar',
      grammarTitle_en: 'Hay vs Estar & Spatial Prepositions',
      grammarTitle_ar: 'الفرق بين Hay و Estar وحروف الجر المكانية',
      keyRules: [
        { rule_es: 'Hay para existencia indefinida', rule_en: 'Use "Hay" for existence (Hay dos dormitorios)', example: '¿Hay ascensor en el piso?' },
        { rule_es: 'Estar para posición de elementos concretos', rule_en: 'Use "Estar" for specific location', example: 'El baño está a la derecha' },
        { rule_es: 'Preposiciones (al lado de, enfrente de, cerca de)', rule_en: 'Location prepositions guide directions', example: 'Cerca del centro' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Partes de la Casa y Muebles',
      vocabTitle_en: 'Apartment Rooms & Furnishings',
      vocabTitle_ar: 'غرف المنزل والأثاث والمرافق',
      targetCount: 35,
      sampleChunks: [
        { spanish: 'Piso amueblado con calefacción', english: 'Furnished apartment with heating', arabic: 'شقة مفروشة مع تدفئة' },
        { spanish: '¿Están incluidos los gastos de luz?', english: 'Are electricity bills included?', arabic: 'هل فواتير الكهرباء مشمولة؟' }
      ]
    }
  },
  5: {
    unitNumber: 5,
    worldName_es: 'Objetos Diarios y Hacks',
    worldName_en: 'Everyday Objects & Practical Hacks',
    worldName_ar: 'الأشياء اليومية والحلول الذكية',
    level: 'A1',
    grammar: {
      grammarTitle_es: 'Demonstrativos y Artículos Indefinidos',
      grammarTitle_en: 'Demonstrative Adjectives & Indefinites',
      grammarTitle_ar: 'أسماء الإشارة وأدوات التنكير',
      keyRules: [
        { rule_es: 'Demostrativos (este, ese, aquel)', rule_en: 'Demonstratives show proximity (este = here, ese = there)', example: 'Este cargador es mío' },
        { rule_es: 'Artículos indefinidos (un, una, unos, unas)', rule_en: 'Indefinite articles agree with nouns', example: 'Una llave de repuesto' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Dispositivos y Enseres de Bolsillo',
      vocabTitle_en: 'Gadgets & Pocket Essentials',
      vocabTitle_ar: 'الأجهزة الإلكترونية والأدوات الشخصية',
      targetCount: 25,
      sampleChunks: [
        { spanish: 'Se me ha olvidado el adaptador', english: 'I forgot the power adapter', arabic: 'لقد نسيت محول الكهرباء' },
        { spanish: '¿Tienes un adaptador de enchufe?', english: 'Do you have a plug adapter?', arabic: 'هل لديك محول قابس كهربائي؟' }
      ]
    }
  },
  6: {
    unitNumber: 6,
    worldName_es: 'Compras en el Mercado',
    worldName_en: 'Supermarkets & Fresh Food',
    worldName_ar: 'الأسواق وشراء المنتجات الغذائية',
    level: 'A1',
    grammar: {
      grammarTitle_es: 'Cuantificadores y Verbos Irregulares (-ER)',
      grammarTitle_en: 'Quantifiers, Numbers & -ER Conjugations',
      grammarTitle_ar: 'المحددات والكميات وتصريف أفعال ER',
      keyRules: [
        { rule_es: 'Cuantificadores (mucho, poco, bastante)', rule_en: 'Quantifiers modify nouns or verbs', example: 'Poca sal / Muchas manzanas' },
        { rule_es: 'Verbos -ER (comer, beber, vender)', rule_en: '-ER endings: -o, -es, -e, -emos, -éis, -en', example: 'Comemos fruta fresca' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Frutas, Verduras y Pesos',
      vocabTitle_en: 'Groceries, Weights & Quantities',
      vocabTitle_ar: 'الفواكه والخضروات والأوزان',
      targetCount: 35,
      sampleChunks: [
        { spanish: 'Un kilo de plátanos bien maduros', english: 'A kilo of ripe bananas', arabic: 'كيلو من الموز الناضج' },
        { spanish: 'Medio kilo de queso manchego', english: 'Half a kilo of Manchego cheese', arabic: 'نصف كيلو من جبن المانتشيجو' }
      ]
    }
  },
  7: {
    unitNumber: 7,
    worldName_es: 'Restaurantes y Cafés',
    worldName_en: 'Restaurants & Tapas Bars',
    worldName_ar: 'المطاعم والمقاهي المحلية',
    level: 'A1',
    grammar: {
      grammarTitle_es: 'Pronombres de Objeto Directo (lo, la, los, las)',
      grammarTitle_en: 'Direct Object Pronouns & Polite Requests',
      grammarTitle_ar: 'ضمائر المفعول به المباشر والطلبات المؤدبة',
      keyRules: [
        { rule_es: 'Pronombres de objeto directo', rule_en: 'Replace direct nouns (lo quiero, la prefiero)', example: 'El café lo quiero sin azúcar' },
        { rule_es: 'Verbo Poder para peticiones', rule_en: 'Use Poder + Infinitive for polite asks', example: '¿Puedo pedir la carta?' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Menú del Día y Platos Típicos',
      vocabTitle_en: 'Menus, Tapas & Dining Terms',
      vocabTitle_ar: 'قائمة الطعام، الأطباق، ومفردات العشاء',
      targetCount: 40,
      sampleChunks: [
        { spanish: 'De primer plato quiero gazpacho', english: 'For the starter I want gazpacho', arabic: 'كمقبلات أريد حساء الجازباتشو' },
        { spanish: '¿Qué me recomiendas de postre?', english: 'What dessert do you recommend?', arabic: 'بماذا توصيني للحلوى؟' }
      ]
    }
  },
  8: {
    unitNumber: 8,
    worldName_es: 'Manejo del Tiempo y Citas',
    worldName_en: 'Time, Dates & Meetups',
    worldName_ar: 'إدارة الوقت واللقاءات الاجتماعية',
    level: 'A1',
    grammar: {
      grammarTitle_es: 'La Hora, Días de la Semana y Verbo Ir',
      grammarTitle_en: 'Telling Time, Calendar & Verb Ir',
      grammarTitle_ar: 'الوقت وأيام الأسبوع والفعل Ir',
      keyRules: [
        { rule_es: 'Expresar la hora (Es la una / Son las tres)', rule_en: 'Telling time uses Ser + la/las', example: 'Quedamos a las siete y media' },
        { rule_es: 'Verbo irregular Ir (voy, vas, va, vamos)', rule_en: 'Ir movement verb conjugations', example: 'Hoy voy al centro' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Horarios, Meses y Quedadas',
      vocabTitle_en: 'Schedules, Appointments & Meetups',
      vocabTitle_ar: 'المواعيد والأشهر واللقاءات',
      targetCount: 30,
      sampleChunks: [
        { spanish: '¿A qué hora quedamos esta tarde?', english: 'What time shall we meet this afternoon?', arabic: 'في أي وقت نلتقي هذا المساء؟' },
        { spanish: 'El próximo viernes a las ocho', english: 'Next Friday at eight o\'clock', arabic: 'الجمعة القادم في الساعة الثامنة' }
      ]
    }
  },
  9: {
    unitNumber: 9,
    worldName_es: 'Rutina de Nómada Digital',
    worldName_en: 'Daily Routines & Habits',
    worldName_ar: 'الروتين اليومي للحياة الحضرية',
    level: 'A1',
    grammar: {
      grammarTitle_es: 'Verbos Reflexivos y Adverbios de Frecuencia',
      grammarTitle_en: 'Reflexive Verbs & Frequency Adverbs',
      grammarTitle_ar: 'الأفعال المنعكسة وظروف التكرار',
      keyRules: [
        { rule_es: 'Pronombres reflexivos (me, te, se, nos, os, se)', rule_en: 'Reflexives show action done to oneself', example: 'Me levanto a las ocho' },
        { rule_es: 'Frecuencia (siempre, normalmente, a veces, nunca)', rule_en: 'Frequency adverbs show routine patterns', example: 'Normalmente trabajo en un coworking' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Hábitos Diarios y Trabajo Remoto',
      vocabTitle_en: 'Daily Habits & Coworking Terms',
      vocabTitle_ar: 'العادات اليومية ومفردات العمل المشترك',
      targetCount: 35,
      sampleChunks: [
        { spanish: 'Me ducho y tomo un té verde', english: 'I take a shower and drink green tea', arabic: 'أستحم وأشرب الشاي الأخضر' },
        { spanish: 'Suelo trabajar en la biblioteca', english: 'I usually work at the library', arabic: 'عادة ما أعمل في المكتبة' }
      ]
    }
  },
  10: {
    unitNumber: 10,
    worldName_es: 'Clases y Supervivencia en Aula',
    worldName_en: 'Studies & Classroom Survival',
    worldName_ar: 'الدراسة والنجاة في فصول اللغة',
    level: 'A1',
    grammar: {
      grammarTitle_es: 'Saber vs Conocer e Imperativo Básico',
      grammarTitle_en: 'Saber vs Conocer & Basic Imperatives',
      grammarTitle_ar: 'الفرق بين Saber و Conocer وأمر الأساسيات',
      keyRules: [
        { rule_es: 'Saber para datos y habilidades', rule_en: 'Saber = facts/skills (Sé hablar español)', example: '¿Sabes dónde está la clase?' },
        { rule_es: 'Conocer para personas y lugares', rule_en: 'Conocer = familiar with people/places', example: 'Conozco a la profesora' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Útiles Escolares y Explicaciones',
      vocabTitle_en: 'Classroom Supplies & Clarifications',
      vocabTitle_ar: 'المستلزمات الدراسية وعبارات التوضيح',
      targetCount: 30,
      sampleChunks: [
        { spanish: '¿Puedes repetir más despacio, por favor?', english: 'Could you repeat slower, please?', arabic: 'هل يمكنك الإعادة ببطء أكثر من فضلك؟' },
        { spanish: '¿Qué significa esta palabra?', english: 'What does this word mean?', arabic: 'ماذا تعني هذه الكلمة؟' }
      ]
    }
  },
  11: {
    unitNumber: 11,
    worldName_es: 'Trabajo y Videollamadas',
    worldName_en: 'Jobs & Professional Calls',
    worldName_ar: 'العمل والوظائف والاتصالات المهنية',
    level: 'A1',
    grammar: {
      grammarTitle_es: 'Estar + Gerundio (Presente Continuo)',
      grammarTitle_en: 'Present Continuous (Estar + Gerund)',
      grammarTitle_ar: 'المضارع المستمر (Estar + اسم الفاعل)',
      keyRules: [
        { rule_es: 'Formación del gerundio (-ando, -iendo)', rule_en: '-AR -> -ando, -ER/-IR -> -iendo', example: 'Estoy hablando con el cliente' },
        { rule_es: 'Acciones en desarrollo en el momento', rule_en: 'Actions happening right now', example: 'Estamos preparando el informe' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Profesiones y Jerga Digital',
      vocabTitle_en: 'Professions & Virtual Meeting Terms',
      vocabTitle_ar: 'المهن ومفردات الاجتماعات الافتراضية',
      targetCount: 35,
      sampleChunks: [
        { spanish: '¿Me escuchas bien en la llamada?', english: 'Can you hear me well on the call?', arabic: 'هل تسمعني جيدا في المكالمة؟' },
        { spanish: 'Compartir pantalla para la presentación', english: 'Share screen for the presentation', arabic: 'مشاركة الشاشة للعرض التقديمي' }
      ]
    }
  },
  12: {
    unitNumber: 12,
    worldName_es: 'De Compras y Probadores',
    worldName_en: 'Clothes Shopping & Fitting Rooms',
    worldName_ar: 'التسوق واختيار المقاسات وتجنب البائعين',
    level: 'A1',
    grammar: {
      grammarTitle_es: 'Verbos Tipo Gustar (Gustar, Encantar, Quedar)',
      grammarTitle_en: 'Gustar-like Verbs & Indirect Pronouns',
      grammarTitle_ar: 'الأفعال الشبيهة بـ Gustar والضمائر',
      keyRules: [
        { rule_es: 'Estructura con Gustar (Me gusta / Me gustan)', rule_en: 'Agrees with the object (Me gusta la camisa / Me gustan las botas)', example: 'Me encanta este color' },
        { rule_es: 'Verbo Quedar para ropa (Me queda bien/grande)', rule_en: 'Expressing how clothes fit', example: 'Esta talla me queda pequeña' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Prendas de Vestir, Tallas y Telas',
      vocabTitle_en: 'Clothing Items, Sizes & Materials',
      vocabTitle_ar: 'الملابس والمقاسات والأنسجة',
      targetCount: 35,
      sampleChunks: [
        { spanish: '¿Tienen esta camiseta en la talla M?', english: 'Do you have this shirt in size M?', arabic: 'هل لديكم هذا القميص بـ مقاس M؟' },
        { spanish: '¿Dónde están los probadores?', english: 'Where are the fitting rooms?', arabic: 'أين توجد غرف قياس الملابس؟' }
      ]
    }
  },
  13: {
    unitNumber: 13,
    worldName_es: 'Dinero, Precios y Regateo',
    worldName_en: 'Money, Prices & Bargaining',
    worldName_ar: 'المال، الأسعار والتفاوض بلباقة',
    level: 'A1',
    grammar: {
      grammarTitle_es: 'Comparativos y Números Mayores',
      grammarTitle_en: 'Comparatives & Large Numbers (100-1000s)',
      grammarTitle_ar: 'المقارنات والأعداد الكبيرة',
      keyRules: [
        { rule_es: 'Estructuras comparativas (más... que, menos... que)', rule_en: 'Comparing prices and values', example: 'Este hotel es más barato que aquel' },
        { rule_es: 'Números grandes (cien, doscientos, mil)', rule_en: 'Counting currency amounts correctly', example: 'Cuesta doscientos cincuenta euros' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Divisas, Tarjetas y Cajeros',
      vocabTitle_en: 'Currency Exchange, Cards & Banking',
      vocabTitle_ar: 'تصريف العملات والبطاقات والصراف الآلي',
      targetCount: 30,
      sampleChunks: [
        { spanish: '¿Aceptan pago con tarjeta contactless?', english: 'Do you accept contactless card payment?', arabic: 'هل تقبلون الدفع بالبطاقة اللا تلامسية؟' },
        { spanish: 'Cambiar dólares a euros sin comisión', english: 'Exchange dollars to euros fee-free', arabic: 'تحويل الدولار إلى يورو بدون عمولة' }
      ]
    }
  },
  14: {
    unitNumber: 14,
    worldName_es: 'Estilo Personal y Abrigos',
    worldName_en: 'Personal Style & Winter Gear',
    worldName_ar: 'الأناقة الشخصية وشراء معطف الشتاء',
    level: 'A1',
    grammar: {
      grammarTitle_es: 'Posición de Adjetivos y Superlativos',
      grammarTitle_en: 'Adjective Placement & Superlatives',
      grammarTitle_ar: 'موقع الصفات وأسلوب التفضيل المطلق',
      keyRules: [
        { rule_es: 'Posición habitual tras el sustantivo', rule_en: 'Descriptive adjectives usually follow noun', example: 'Un abrigo elegante' },
        { rule_es: 'Superlativos relativos (el más bonito, la más cálida)', rule_en: 'Forming superlatives with el/la más', example: 'La chaqueta más abrigada' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Moda, Clima Frío y Tendencias',
      vocabTitle_en: 'Fashion, Cold Weather & Styles',
      vocabTitle_ar: 'الموضة، ملابس الشتاء والاتجاهات العصرية',
      targetCount: 30,
      sampleChunks: [
        { spanish: 'Necesito un abrigo para el invierno madrileño', english: 'I need a coat for Madrid\'s winter', arabic: 'أحتاج إلى معطف لفصل الشتاء في مدريد' },
        { spanish: 'Bufanda de lana y guantes de cuero', english: 'Wool scarf and leather gloves', arabic: 'وشاح من الصوف وقفازات جلديّة' }
      ]
    }
  },
  15: {
    unitNumber: 15,
    worldName_es: 'Salud y Farmacia de Urgencia',
    worldName_en: 'Body & Pharmacy Emergencies',
    worldName_ar: 'الصحة الأساسية والتعامل مع الصيدليات',
    level: 'A1',
    grammar: {
      grammarTitle_es: 'Verbo Doler y Obligación (Tener que / Deber)',
      grammarTitle_en: 'Verb Doler & Obligations (Tener que)',
      grammarTitle_ar: 'الفعل Doler وعبارات الالتزام والإجبار',
      keyRules: [
        { rule_es: 'Verbo Doler (Me duele la cabeza / Me duelen los pies)', rule_en: 'Doler functions like Gustar', example: 'Me duele mucho la garganta' },
        { rule_es: 'Expresar obligación (Tener que + infinitivo)', rule_en: 'Use Tener que to give advice or express obligation', example: 'Tienes que tomar este jarabe' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Anatomía, Síntomas y Medicinas',
      vocabTitle_en: 'Body Parts, Symptoms & Remedies',
      vocabTitle_ar: 'أجزاء الجسم والأعراض والعلب الدوائية',
      targetCount: 35,
      sampleChunks: [
        { spanish: 'Tengo fiebre y dolor de cabeza', english: 'I have a fever and a headache', arabic: 'عندي حمى وصداع في الرأس' },
        { spanish: '¿Tienes analgésicos o ibuprofeno?', english: 'Do you have painkillers or ibuprofen?', arabic: 'هل لديك مسكنات آلام أو إيبوبروفين؟' }
      ]
    }
  },
  16: {
    unitNumber: 16,
    worldName_es: 'Transporte Urbano y Capstone A1',
    worldName_en: 'Urban Transit & A1 Capstone Project',
    worldName_ar: 'المواصلات الحضرية ومشروع تخرج A1 الأكبر',
    level: 'A1',
    grammar: {
      grammarTitle_es: 'Pretérito Indefinido (Iniciación) e Indicaciones',
      grammarTitle_en: 'Intro to Pretérito Indefinido & Directions',
      grammarTitle_ar: 'مقدمة الماضي البسيط واتجاهات السير',
      keyRules: [
        { rule_es: 'Iniciación al Pretérito Indefinido (fui, estuve, compré)', rule_en: 'Completed past actions intro', example: 'Ayer fui en metro a la plaza' },
        { rule_es: 'Dar indicaciones urbanas (Sigue recto, gira a la izquierda)', rule_en: 'Giving direction commands', example: 'Gira a la derecha en el semáforo' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Metro, Billetes y Síntesis A1',
      vocabTitle_en: 'Transit Tickets, Maps & A1 Capstone',
      vocabTitle_ar: 'تذاكر المترو والخرائط ومشروع تخرج A1',
      targetCount: 45,
      sampleChunks: [
        { spanish: 'Un billete de diez viajes para el metro', english: 'A ten-trip ticket for the subway', arabic: 'تذكرة عشر رحلات للمترو' },
        { spanish: '¿En qué estación debo hacer transbordo?', english: 'At which station should I transfer?', arabic: 'في أي محطة يجب أن أغير الخط؟' }
      ]
    }
  },
  17: {
    unitNumber: 17,
    worldName_es: 'Problemas de Viaje y Pérdidas',
    worldName_en: 'Travel Problems & Dispute Claims',
    worldName_ar: 'مشكلات السفر والمطالبات وحل الخلافات',
    level: 'A2',
    grammar: {
      grammarTitle_es: 'Pretérito Indefinido Irregular (Ir, Estar, Tener, Hacer)',
      grammarTitle_en: 'Irregular Pretérito Indefinido Verbs',
      grammarTitle_ar: 'الأفعال الشاذة في الماضي البسيط',
      keyRules: [
        { rule_es: 'Verbos con raíz irregular (pude, tuve, hice, vine)', rule_en: 'Common irregular past roots', example: 'Ayer tuve un problema con la maleta' },
        { rule_es: 'Verbos ser/ir en pasado (fui, fuiste, fue)', rule_en: 'Ser/Ir share exact past forms', example: 'El vuelo fue cancelado' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Reclamaciones, Equipaje y Vuelos',
      vocabTitle_en: 'Claims, Luggage & Flight Delays',
      vocabTitle_ar: 'المطالبات والأمتعة وتأخير الرحلات',
      targetCount: 35,
      sampleChunks: [
        { spanish: 'Han perdido mi equipaje de mano', english: 'They lost my carry-on luggage', arabic: 'لقد فقدوا حقيبة يدي' },
        { spanish: 'Poner una hoja de reclamaciones', english: 'File an official complaint form', arabic: 'تقديم استمارة شكوى رسمية' }
      ]
    }
  },
  18: {
    unitNumber: 18,
    worldName_es: 'Gestión de Hoteles y Reservas',
    worldName_en: 'Hotels & Smart Accommodation',
    worldName_ar: 'حجوزات السكن وإجراءات الدخول الذكية',
    level: 'A2',
    grammar: {
      grammarTitle_es: 'Pretérito Imperfecto (Descripciones en Pasado)',
      grammarTitle_en: 'Pretérito Imperfecto (Past Descriptions)',
      grammarTitle_ar: 'الماضي المستمر والوصف في الماضي',
      keyRules: [
        { rule_es: 'Conjugación Imperfecto (-aba, -ía)', rule_en: 'Used for background states & habits in past', example: 'La habitación era espaciosa y tenía vistas' },
        { rule_es: 'Verbos irregulares en imperfecto (era, iba, veía)', rule_en: 'Only 3 irregular verbs in imperfect', example: 'Cuando iba al hotel siempre desayunaba café' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Comodidades, Check-in y Recepción',
      vocabTitle_en: 'Amenities, Upgrades & Reception',
      vocabTitle_ar: 'المرافق، الترقية وإجراءات الاستقبال',
      targetCount: 35,
      sampleChunks: [
        { spanish: 'Solicitar un cambio de habitación', english: 'Request a room change', arabic: 'طلب تغيير الغرفة' },
        { spanish: '¿A qué hora es el check-out mañana?', english: 'What time is check-out tomorrow?', arabic: 'في أي وقت يجب مغادرة الغرفة غدا؟' }
      ]
    }
  },
  19: {
    unitNumber: 19,
    worldName_es: 'Turismo y Secretos Locales',
    worldName_en: 'Tourism & Hidden Hotspots',
    worldName_ar: 'السياحة والاستكشاف والبحث عن الأماكن المخفية',
    level: 'A2',
    grammar: {
      grammarTitle_es: 'Contraste Indefinido vs Imperfecto',
      grammarTitle_en: 'Indefinido vs Imperfecto Contrast',
      grammarTitle_ar: 'المقارنة بين الماضي البسيط والماضي المستمر',
      keyRules: [
        { rule_es: 'Imperfecto (escenario) + Indefinido (interrupción)', rule_en: 'Imperfect sets scene, Indefinido interrupts', example: 'Caminaba por la plaza cuando empezó a llover' },
        { rule_es: 'Diferencia de perspectiva narrativa', rule_en: 'Completed event vs ongoing background', example: 'El guía explicaba la historia mientras tomábamos fotos' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Rutas Históricas y Joyas Ocultas',
      vocabTitle_en: 'Historic Routes & Hidden Gems',
      vocabTitle_ar: 'المسارات التاريخية والجواهر المخفية',
      targetCount: 40,
      sampleChunks: [
        { spanish: 'Un mirador secreto con vistas espectaculares', english: 'A secret viewpoint with breathtaking views', arabic: 'مطل سرّي ذو إطلالة رائعة' },
        { spanish: 'Hacer un recorrido a pie con un guía local', english: 'Take a walking tour with a local guide', arabic: 'القيام بجولة سيرا على الأقدام مع مرشد محلي' }
      ]
    }
  },
  20: {
    unitNumber: 20,
    worldName_es: 'Negociaciones y Debates Laborales',
    worldName_en: 'Workplace & Business Debates',
    worldName_ar: 'العمل والمفاوضات المهنية وحل النزاعات الوظيفية',
    level: 'A2',
    grammar: {
      grammarTitle_es: 'Condicional Simple para Cortesía y Sugerencias',
      grammarTitle_en: 'Conditional Simple for Suggestions',
      grammarTitle_ar: 'الصيغة الشرطية البسيطة للاقتراحات المؤدبة',
      keyRules: [
        { rule_es: 'Formación del condicional (-ía, -ías, -ía)', rule_en: 'Infinitive + conditional endings', example: 'Me gustaría proponer una alternativa' },
        { rule_es: 'Sugerencias educadas en el trabajo', rule_en: 'Softening requests (Deberías revisar esto)', example: '¿Sería posible aplazar la reunión?' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Términos de Negociación y Contratos',
      vocabTitle_en: 'Negotiations, Contracts & Deadlines',
      vocabTitle_ar: 'مصطلحات التفاوض والعقود والمواعيد النهائية',
      targetCount: 40,
      sampleChunks: [
        { spanish: 'Negociar las plazos de entrega del proyecto', english: 'Negotiate project delivery deadlines', arabic: 'التفاوض على مواعيد تسليم المشروع' },
        { spanish: 'Llegar a un acuerdo beneficioso para ambos', english: 'Reach a mutually beneficial agreement', arabic: 'الوصول إلى اتفاق مفيد للطرفين' }
      ]
    }
  },
  21: {
    unitNumber: 21,
    worldName_es: 'Salud y Citas Médicas',
    worldName_en: 'Health Emergencies & Clinic Appointments',
    worldName_ar: 'الرعاية الطبية والمواعيد وطوارئ الصحة',
    level: 'A2',
    grammar: {
      grammarTitle_es: 'Pretérito Perfecto Compuesto (Haber + Participio)',
      grammarTitle_en: 'Pretérito Perfecto Compuesto (Haber + Participle)',
      grammarTitle_ar: 'الماضي التام القريب (Haber + اسم المفعول)',
      keyRules: [
        { rule_es: 'Verbo Haber (he, has, ha, hemos, habéis, han)', rule_en: 'Use for recent past or life experience', example: 'Hoy he ido al médico de guardia' },
        { rule_es: 'Participios regulares e irregulares (-ado, -ido, dicho, hecho)', rule_en: 'Past participle forms', example: 'Me han recetado antibióticos' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Clínicas, Diagnósticos y Recetas',
      vocabTitle_en: 'Medical Clinics, Prescriptions & Diagnostics',
      vocabTitle_ar: 'العيادات الطبية والتشخيص والوصفات',
      targetCount: 35,
      sampleChunks: [
        { spanish: 'Pedir cita previa con el especialista', english: 'Book an appointment with the specialist', arabic: 'حجز موعد مسبق مع الطبيب المختص' },
        { spanish: 'Presentar la tarjeta sanitaria europea', english: 'Present the European Health Insurance Card', arabic: 'تقديم بطاقة التأمين الصحي الأوروبية' }
      ]
    }
  },
  22: {
    unitNumber: 22,
    worldName_es: 'Gastronomía y Recetas',
    worldName_en: 'Cooking & Regional Gastronomy',
    worldName_ar: 'فن الطهي ووصفات الطبخ والمأكولات الإقليمية',
    level: 'A2',
    grammar: {
      grammarTitle_es: 'Imperativo Afirmativo Informal (Tú)',
      grammarTitle_en: 'Informal Affirmative Imperative (Tú)',
      grammarTitle_ar: 'صيغة الأمر المباشر غير الرسمية',
      keyRules: [
        { rule_es: 'Imperativo regular para Tú (corta, añade, sirve)', rule_en: 'Same as 3rd person present (habla, come)', example: 'Añade una pizca de sal y remueve' },
        { rule_es: 'Imperativos irregulares (haz, pon, ten, sal, ven)', rule_en: 'Common irregular command forms', example: 'Haz la mezcla con cuidado' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Ingredientes, Técnicas e Instrucciones',
      vocabTitle_en: 'Ingredients, Cooking Methods & Recipes',
      vocabTitle_ar: 'المكونات وطرق الطهي والتعليمات',
      targetCount: 40,
      sampleChunks: [
        { spanish: 'Picar la cebolla a fuego lento', english: 'Chop the onion over low heat', arabic: 'تقطيع البصل على نار هادئة' },
        { spanish: 'Dejar reposar la tortilla cinco minutos', english: 'Let the Spanish omelette rest for 5 minutes', arabic: 'ترك العجة لترتاح خمس دقائق' }
      ]
    }
  },
  23: {
    unitNumber: 23,
    worldName_es: 'Tecnología y Nómadas Digitales',
    worldName_en: 'Apps, Tech & Nomad Hacks',
    worldName_ar: 'التكنولوجيا، التطبيقات، وإلغاء قفل الخدمات الحضرية',
    level: 'A2',
    grammar: {
      grammarTitle_es: 'Pronombres Relativos (que, donde, quien)',
      grammarTitle_en: 'Relative Pronouns (que, donde)',
      grammarTitle_ar: 'الأسماء الموصولة',
      keyRules: [
        { rule_es: 'Pronombre "que" para personas y cosas', rule_en: 'Use "que" to connect descriptive clauses', example: 'La app que uso para reservar' },
        { rule_es: 'Pronombre "donde" para lugares', rule_en: 'Connect location descriptors', example: 'El café donde suelo trabajar' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Conectividad, Velocidad y Plataformas',
      vocabTitle_en: 'Connectivity, Cloud & Digital Services',
      vocabTitle_ar: 'الاتصال والسرعة والمنصات الرقمية',
      targetCount: 35,
      sampleChunks: [
        { spanish: 'Conexión de fibra óptica de alta velocidad', english: 'High-speed fiber optic internet connection', arabic: 'اتصال إنترنت عالي السرعة بالألياف الضوئية' },
        { spanish: 'Desbloquear la cuenta de usuario', english: 'Unlock the user account', arabic: 'إلغاء قفل حساب المستخدم' }
      ]
    }
  },
  24: {
    unitNumber: 24,
    worldName_es: 'Clima, Naturaleza y Rutas',
    worldName_en: 'Weather, Nature & Environment',
    worldName_ar: 'الطقس والمناخ والمحميات الطبيعية والرحلات',
    level: 'A2',
    grammar: {
      grammarTitle_es: 'Futuro Simple e Impersonales del Tiempo',
      grammarTitle_en: 'Futuro Simple & Weather Impersonals',
      grammarTitle_ar: 'المستقبل البسيط وأفعال الطقس غير الشخصية',
      keyRules: [
        { rule_es: 'Futuro Simple (-ré, -rás, -rá, -remos, -rán)', rule_en: 'Infinitive + future endings', example: 'Mañana lloverá en la sierra' },
        { rule_es: 'Expresiones de clima (Hace sol, Hay niebla, Nieva)', rule_en: 'Weather structures with Hacer/Hay', example: 'Hará mucho calor este fin de semana' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Pronósticos, Senderismo y Equipo',
      vocabTitle_en: 'Forecasts, Hiking Gear & Nature',
      vocabTitle_ar: 'التوقعات الجوية ومعدات المشي والطبية',
      targetCount: 35,
      sampleChunks: [
        { spanish: 'Consultar la predicción meteorológica', english: 'Check the weather forecast', arabic: 'مراجعة توقعات حالة الطقس' },
        { spanish: 'Llevar botas de montaña impermeables', english: 'Wear waterproof hiking boots', arabic: 'ارتداء أحذية مشي مقاومة للماء' }
      ]
    }
  },
  25: {
    unitNumber: 25,
    worldName_es: 'Fiestas del Barrio y Tradiciones',
    worldName_en: 'Cultural Festivals & Block Parties',
    worldName_ar: 'الانغماس في احتفالات الحي والتقاليد التراثية',
    level: 'A2',
    grammar: {
      grammarTitle_es: 'Pronombres de Objeto Indirecto y Dobles Pronombres',
      grammarTitle_en: 'Indirect Object Pronouns & Double Pronouns',
      grammarTitle_ar: 'ضمائر المفعول غير المباشر والضمائر المزدوجة',
      keyRules: [
        { rule_es: 'Pronombres indirectos (me, te, le, nos, os, les)', rule_en: 'Identify to/for whom an action is done', example: 'Le regalé las entradas a mi amigo' },
        { rule_es: 'Cambio de le/les a "se" antes de lo/la', rule_en: 'Avoid "le lo" sound collision by changing to "se lo"', example: 'Se lo conté ayer' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Celebraciones, Música y Tradiciones',
      vocabTitle_en: 'Festivals, Music & Cultural Customs',
      vocabTitle_ar: 'الاحتفالات والموسيقى والتقاليد الثقافية',
      targetCount: 40,
      sampleChunks: [
        { spanish: 'Participar en la verbena popular del barrio', english: 'Join the neighbourhood street festival', arabic: 'المشاركة في المهرجان الشعبي للحي' },
        { spanish: 'Disfrutar de la música en directo', english: 'Enjoy live music', arabic: 'الاستمتاع بالموسيقى الحية' }
      ]
    }
  },
  26: {
    unitNumber: 26,
    worldName_es: 'Emociones, Infancia y Sueños',
    worldName_en: 'Emotions, Childhood Stories & Ambitions',
    worldName_ar: 'المشاعر والتعبير عن الطفولة والخطط المستقبلية',
    level: 'A2',
    grammar: {
      grammarTitle_es: 'Introducción al Subjuntivo (Deseos y Emociones)',
      grammarTitle_en: 'Intro to Present Subjunctive (Wishes & Feelings)',
      grammarTitle_ar: 'مقدمة في صيغة الشك والمشاعر (Subjuntivo)',
      keyRules: [
        { rule_es: 'Subjuntivo con verbos de deseo (Quiero que, Ojalá que)', rule_en: 'Vowel flip: -AR -> -e, -ER/-IR -> -a', example: 'Quiero que disfrutes del viaje' },
        { rule_es: 'Expresiones impersonales (Es importante que...)', rule_en: 'Triggering subjunctive mood for evaluation', example: 'Es necesario que practiques todos los días' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Sentimientos, Recuerdos y Proyectos',
      vocabTitle_en: 'Emotions, Nostalgia & Future Dreams',
      vocabTitle_ar: 'المشاعر والذكريات والخطط المستقبلية',
      targetCount: 35,
      sampleChunks: [
        { spanish: 'Recordar con nostalgia los veranos de niño', english: 'Nostalgically remember childhood summers', arabic: 'تذكر صيف الطفولة بالحنين' },
        { spanish: 'Espero que consigas todas tus metas', english: 'I hope you achieve all your goals', arabic: 'أتمنى أن تحقق كل أهدافك' }
      ]
    }
  },
  27: {
    unitNumber: 27,
    worldName_es: 'Conversaciones en la Plaza y Debates',
    worldName_en: 'Plaza Debates & Social Discussions',
    worldName_ar: 'النقاشات الحرة في الساحات وإبداء الآراء والمواقف',
    level: 'A2',
    grammar: {
      grammarTitle_es: 'Expresión de Opinión y Disconformidad',
      grammarTitle_en: 'Expressing Opinions & Disagreement',
      grammarTitle_ar: 'التعبير عن الرأي والاعتراض',
      keyRules: [
        { rule_es: 'Creo que + Indicativo / No creo que + Subjuntivo', rule_en: 'Positive belief = Indicative, Negative belief = Subjunctive', example: 'Creo que tienes razón / No creo que sea así' },
        { rule_es: 'Conectores de contraste (Sin embargo, Por el contrario)', rule_en: 'Structuring arguments politely', example: 'Respeto tu punto, sin embargo pienso diferente' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Debates, Argumentos y Puntos de Vista',
      vocabTitle_en: 'Debates, Arguments & Viewpoints',
      vocabTitle_ar: 'النقاشات الحرة والحجج وجهات النظر',
      targetCount: 40,
      sampleChunks: [
        { spanish: 'Desde mi punto de vista personal...', english: 'From my personal point of view...', arabic: 'من وجهة نظري الشخصية...' },
        { spanish: 'Estoy totalmente de acuerdo contigo', english: 'I completely agree with you', arabic: 'أنا متفق معك تماما' }
      ]
    }
  },
  28: {
    unitNumber: 28,
    worldName_es: 'Trámites Formales y Capstone A2',
    worldName_en: 'Everyday Bureaucracy & A2 Capstone',
    worldName_ar: 'المعاملات الحضرية الرسمية ومشروع تخرج A2 الأكبر',
    level: 'A2',
    grammar: {
      grammarTitle_es: 'Imperativo Formal (Usted) y Síntesis A2',
      grammarTitle_en: 'Formal Imperative (Usted) & A2 Synthesis',
      grammarTitle_ar: 'صيغة الأمر الرسمية (Usted) وتلخيص المستوى الثاني',
      keyRules: [
        { rule_es: 'Imperativo Usted (llene, firme, espere, pase)', rule_en: 'Uses subjunctive vowel flip for formal commands', example: 'Firme aquí y entregue la solicitud' },
        { rule_es: 'Consolidación de tiempos del pasado y subjuntivo A2', rule_en: 'Synthesizing A2 competencies for official interactions', example: 'Ayer vine a tramitar mi empadronamiento' }
      ]
    },
    vocabulary: {
      vocabTitle_es: 'Empadronamiento, Visados y Proyecto Capstone',
      vocabTitle_en: 'Residency Papers, Visas & A2 Capstone',
      vocabTitle_ar: 'معاملات الإقامة والفيزا ومشرع تخرج A2',
      targetCount: 50,
      sampleChunks: [
        { spanish: 'Certificado de empadronamiento actualizado', english: 'Updated town hall residency certificate', arabic: 'شهادة السكن والتسجيل البلدي المحدثة' },
        { spanish: 'Completar los trámites administrativos con éxito', english: 'Successfully complete administrative paperwork', arabic: 'إنجاز المعاملات الإدارية بنجاح' }
      ]
    }
  }
};
