import { VocabularyWord } from '../types';

export const TOP_100_WORDS: VocabularyWord[] = [
  {
    id: 'w-1',
    word: 'el / la',
    translation_en: 'the',
    translation_ar: 'الـ (أداة التعريف)',
    pos: 'noun',
    gender: 'mf',
    cefr: 'A1',
    frequencyRank: 1,
    category: 'articles',
    topic: 'grammar_basics',
    ipa: '/el/ /la/',
    collocations: [
      {
        phrase_es: 'el libro / la casa',
        phrase_en: 'the book / the house',
        phrase_ar: 'الكتاب / المنزل',
        example_es: 'El libro está en la mesa.',
        example_en: 'The book is on the table.',
        example_ar: 'الكتاب موجود على الطاولة.'
      }
    ],
    exampleSentences: [
      { es: 'La casa es muy grande y luminosa.', en: 'The house is very big and bright.', ar: 'المنزل كبير ومضيء للغاية.' }
    ],
    commonMistakes: 'Remember that Spanish nouns have grammatical gender (el problema vs la mano).',
    commonMistakes_ar: 'انتبه إلى أن بعض الكلمات تنتهي بـ a لكنها مذكرة مثل (el problema).'
  },
  {
    id: 'w-2',
    word: 'de',
    translation_en: 'of / from',
    translation_ar: 'من / لـ (ملكية)',
    pos: 'preposition',
    cefr: 'A1',
    frequencyRank: 2,
    category: 'prepositions',
    topic: 'grammar_basics',
    collocations: [
      {
        phrase_es: 'ser de + lugar',
        phrase_en: 'to be from + place',
        phrase_ar: 'يكون من + مكان',
        example_es: 'Soy de España.',
        example_en: 'I am from Spain.',
        example_ar: 'أنا من إسبانيا.'
      }
    ],
    exampleSentences: [
      { es: 'El coche de María es rojo.', en: "Maria's car is red.", ar: 'سيارة ماريا حمراء.' }
    ]
  },
  {
    id: 'w-3',
    word: 'que',
    translation_en: 'that / which / who',
    translation_ar: 'الذي / أن',
    pos: 'conjunction',
    cefr: 'A1',
    frequencyRank: 3,
    category: 'conjunctions',
    topic: 'grammar_basics',
    collocations: [
      {
        phrase_es: 'tener que + infinitivo',
        phrase_en: 'to have to + verb',
        phrase_ar: 'يجب أن + فعل',
        example_es: 'Tengo que estudiar hoy.',
        example_en: 'I have to study today.',
        example_ar: 'يجب أن أدرس اليوم.'
      }
    ],
    exampleSentences: [
      { es: 'El hombre que habla es mi profesor.', en: 'The man who is speaking is my teacher.', ar: 'الرجل الذي يتحدث هو أستاذي.' }
    ]
  },
  {
    id: 'w-4',
    word: 'y',
    translation_en: 'and',
    translation_ar: 'و (حرف عطف)',
    pos: 'conjunction',
    cefr: 'A1',
    frequencyRank: 4,
    category: 'conjunctions',
    topic: 'connectors',
    collocations: [
      {
        phrase_es: 'tú y yo',
        phrase_en: 'you and I',
        phrase_ar: 'أنت وأنا',
        example_es: 'Tú y yo somos amigos.',
        example_en: 'You and I are friends.',
        example_ar: 'أنت وأنا أصدقاء.'
      }
    ],
    exampleSentences: [
      { es: 'Quiero pan y queso.', en: 'I want bread and cheese.', ar: 'أريد خبزاً وجبناً.' }
    ],
    commonMistakes: 'Becomes "e" before words starting with "i-" or "hi-" (padres e hijos).',
    commonMistakes_ar: 'يتحول حرف y إلى e قبل الكلمات التي تبدأ بحرف i أو hi مثل padres e hijos.'
  },
  {
    id: 'w-5',
    word: 'a',
    translation_en: 'to / at',
    translation_ar: 'إلى / لـ',
    pos: 'preposition',
    cefr: 'A1',
    frequencyRank: 5,
    category: 'prepositions',
    topic: 'grammar_basics',
    collocations: [
      {
        phrase_es: 'ir a + lugar',
        phrase_en: 'to go to + place',
        phrase_ar: 'يذهب إلى + مكان',
        example_es: 'Voy a la playa.',
        example_en: 'I am going to the beach.',
        example_ar: 'أنا ذاهب إلى الشاطئ.'
      }
    ],
    exampleSentences: [
      { es: 'Llamo a mi madre todos los domingos.', en: 'I call my mother every Sunday.', ar: 'أتصل بأمي كل يوم أحد (a الشخصية).' }
    ]
  },
  {
    id: 'w-6',
    word: 'en',
    translation_en: 'in / on / at',
    translation_ar: 'في / على',
    pos: 'preposition',
    cefr: 'A1',
    frequencyRank: 6,
    category: 'prepositions',
    topic: 'locations',
    collocations: [
      {
        phrase_es: 'en casa / en la oficina',
        phrase_en: 'at home / at the office',
        phrase_ar: 'في البيت / في المكتب',
        example_es: 'Estoy en casa ahora.',
        example_en: 'I am at home right now.',
        example_ar: 'أنا في المنزل الآن.'
      }
    ],
    exampleSentences: [
      { es: 'Vivo en Madrid.', en: 'I live in Madrid.', ar: 'أعيش في مدريد.' }
    ]
  },
  {
    id: 'w-7',
    word: 'un / una',
    translation_en: 'a / an / one',
    translation_ar: 'واحد / أداة تنكير',
    pos: 'noun',
    gender: 'mf',
    plural: 'unos / unas',
    cefr: 'A1',
    frequencyRank: 7,
    category: 'articles',
    topic: 'grammar_basics',
    collocations: [
      {
        phrase_es: 'un momento',
        phrase_en: 'one moment',
        phrase_ar: 'لحظة واحدة',
        example_es: 'Espera un momento, por favor.',
        example_en: 'Wait a moment, please.',
        example_ar: 'انتظر لحظة، من فضلك.'
      }
    ],
    exampleSentences: [
      { es: 'Tengo un hermano y una hermana.', en: 'I have a brother and a sister.', ar: 'لدي أخ وأخت.' }
    ]
  },
  {
    id: 'w-8',
    word: 'ser',
    translation_en: 'to be (permanent / identity)',
    translation_ar: 'يكون (للهوية والصفات الدائمة والأصل)',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 8,
    category: 'verbs',
    topic: 'essential_verbs',
    collocations: [
      {
        phrase_es: 'ser de + país',
        phrase_en: 'to be from + country',
        phrase_ar: 'يكون من + بلد',
        example_es: 'Soy de México.',
        example_en: 'I am from Mexico.',
        example_ar: 'أنا من المكسيك.'
      }
    ],
    exampleSentences: [
      { es: 'Ella es médica y es muy inteligente.', en: 'She is a doctor and is very intelligent.', ar: 'هي طبيبة وهي ذكية جداً.' }
    ],
    commonMistakes: 'Do not confuse with "estar" which indicates state or temporary location.',
    commonMistakes_ar: 'لا تخلط بين ser للهوية والأصل وبين estar للموقع والحالة المؤقتة.'
  },
  {
    id: 'w-9',
    word: 'se',
    translation_en: 'oneself / himself / herself / passive marker',
    translation_ar: 'ضمير انعكاسي / مبني للمجهول',
    pos: 'pronoun',
    cefr: 'A1',
    frequencyRank: 9,
    category: 'pronouns',
    topic: 'grammar_basics',
    collocations: [
      {
        phrase_es: 'llamarse',
        phrase_en: 'to be called / named',
        phrase_ar: 'يُدعى / اسمه',
        example_es: 'Se llama Alejandro.',
        example_en: 'His name is Alejandro.',
        example_ar: 'اسمه أليخاندرو.'
      }
    ],
    exampleSentences: [
      { es: 'Aquí se habla español.', en: 'Spanish is spoken here.', ar: 'هنا يُتحدث الإسبانية.' }
    ]
  },
  {
    id: 'w-10',
    word: 'no',
    translation_en: 'no / not',
    translation_ar: 'لا / ليس',
    pos: 'adverb',
    cefr: 'A1',
    frequencyRank: 10,
    category: 'adverbs',
    topic: 'negation',
    collocations: [
      {
        phrase_es: 'no ... nada',
        phrase_en: 'nothing at all / not anything',
        phrase_ar: 'لا شيء على الإطلاق',
        example_es: 'No entiendo nada.',
        example_en: 'I don’t understand anything.',
        example_ar: 'لا أفهم أي شيء.'
      }
    ],
    exampleSentences: [
      { es: 'No hablo francés.', en: 'I do not speak French.', ar: 'أنا لا أتحدث الفرنسية.' }
    ]
  },
  {
    id: 'w-11',
    word: 'haber',
    translation_en: 'to have (auxiliary) / there is/are (hay)',
    translation_ar: 'يوجد (hay) / فعل مساعد للماضي التام',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 11,
    category: 'verbs',
    topic: 'essential_verbs',
    collocations: [
      {
        phrase_es: 'hay que + infinitivo',
        phrase_en: 'one must / it is necessary to',
        phrase_ar: 'يجب أن / ينبغي',
        example_es: 'Hay que practicar todos los días.',
        example_en: 'One must practice every day.',
        example_ar: 'يجب التمرن كل يوم.'
      }
    ],
    exampleSentences: [
      { es: 'Hay tres manzanas en la mesa.', en: 'There are three apples on the table.', ar: 'يوجد ثلاث تفاحات على الطاولة.' }
    ]
  },
  {
    id: 'w-12',
    word: 'por',
    translation_en: 'for / by / through / because of',
    translation_ar: 'بسبب / بواسطة / عبر / لمدة',
    pos: 'preposition',
    cefr: 'A1',
    frequencyRank: 12,
    category: 'prepositions',
    topic: 'prepositions',
    collocations: [
      {
        phrase_es: 'por favor',
        phrase_en: 'please',
        phrase_ar: 'من فضلك',
        example_es: 'Un café, por favor.',
        example_en: 'A coffee, please.',
        example_ar: 'قهوة، من فضلك.'
      },
      {
        phrase_es: 'por la mañana',
        phrase_en: 'in the morning',
        phrase_ar: 'في الصباح',
        example_es: 'Estudio por la mañana.',
        example_en: 'I study in the morning.',
        example_ar: 'أدرس في الصباح.'
      }
    ],
    exampleSentences: [
      { es: 'Gracias por tu ayuda.', en: 'Thanks for your help.', ar: 'شكراً على مساعدتك.' }
    ]
  },
  {
    id: 'w-13',
    word: 'con',
    translation_en: 'with',
    translation_ar: 'مع / بـ',
    pos: 'preposition',
    cefr: 'A1',
    frequencyRank: 13,
    category: 'prepositions',
    topic: 'prepositions',
    collocations: [
      {
        phrase_es: 'conmigo / contigo',
        phrase_en: 'with me / with you',
        phrase_ar: 'معي / معك',
        example_es: '¿Quieres venir conmigo?',
        example_en: 'Do you want to come with me?',
        example_ar: 'هل تريد أن تأتي معي؟'
      }
    ],
    exampleSentences: [
      { es: 'Tomo café con leche.', en: 'I drink coffee with milk.', ar: 'أشرب القهوة مع الحليب.' }
    ]
  },
  {
    id: 'w-14',
    word: 'para',
    translation_en: 'for (purpose/deadline/recipient)',
    translation_ar: 'لأجل / لكي / من أجل',
    pos: 'preposition',
    cefr: 'A1',
    frequencyRank: 14,
    category: 'prepositions',
    topic: 'prepositions',
    collocations: [
      {
        phrase_es: 'para + infinitivo',
        phrase_en: 'in order to + verb',
        phrase_ar: 'لكي / من أجل أن',
        example_es: 'Estudio para aprender.',
        example_en: 'I study in order to learn.',
        example_ar: 'أدرس لكي أتعلم.'
      }
    ],
    exampleSentences: [
      { es: 'Este regalo es para ti.', en: 'This gift is for you.', ar: 'هذه الهدية لك.' }
    ]
  },
  {
    id: 'w-15',
    word: 'como',
    translation_en: 'as / like / how (cómo)',
    translation_ar: 'مثل / كـ / كيف (cómo)',
    pos: 'adverb',
    cefr: 'A1',
    frequencyRank: 15,
    category: 'adverbs',
    topic: 'comparisons',
    collocations: [
      {
        phrase_es: '¿Cómo te llamas?',
        phrase_en: 'What is your name?',
        phrase_ar: 'ما اسمك؟',
        example_es: '¿Cómo te llamas? - Me llamo David.',
        example_en: 'What is your name? - My name is David.',
        example_ar: 'ما اسمك؟ - اسمي ديفيد.'
      }
    ],
    exampleSentences: [
      { es: 'Trabajo como profesor.', en: 'I work as a teacher.', ar: 'أعمل كمعلم.' }
    ]
  },
  {
    id: 'w-16',
    word: 'estar',
    translation_en: 'to be (temporary state / location)',
    translation_ar: 'يكون (للموقع والحالة المزاجية أو الصحية المؤقتة)',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 16,
    category: 'verbs',
    topic: 'essential_verbs',
    collocations: [
      {
        phrase_es: 'estar bien / cansado',
        phrase_en: 'to be well / tired',
        phrase_ar: 'بخير / متعب',
        example_es: '¿Cómo estás? - Estoy muy bien.',
        example_en: 'How are you? - I am very well.',
        example_ar: 'كيف حالك؟ - أنا بخير جداً.'
      }
    ],
    exampleSentences: [
      { es: 'El hotel está cerca del centro.', en: 'The hotel is near the city center.', ar: 'الفندق قريب من وسط المدينة.' }
    ]
  },
  {
    id: 'w-17',
    word: 'tener',
    translation_en: 'to have / to possess / age/feelings',
    translation_ar: 'يملك / لديه (يستخدم أيضاً للعمر والشعور بالجوع والبرد)',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 17,
    category: 'verbs',
    topic: 'essential_verbs',
    collocations: [
      {
        phrase_es: 'tener hambre / sed / frío',
        phrase_en: 'to be hungry / thirsty / cold',
        phrase_ar: 'يشعر بالجوع / العطش / البرد',
        example_es: 'Tengo mucha hambre.',
        example_en: 'I am very hungry.',
        example_ar: 'أنا جائع جداً.'
      },
      {
        phrase_es: 'tener ... años',
        phrase_en: 'to be ... years old',
        phrase_ar: 'عمره ... سنة',
        example_es: 'Tengo veinticinco años.',
        example_en: 'I am twenty-five years old.',
        example_ar: 'عمري خمس وعشرون سنة.'
      }
    ],
    exampleSentences: [
      { es: 'Tengo dos gatos en mi apartamento.', en: 'I have two cats in my apartment.', ar: 'لدي قطتان في شقتي.' }
    ]
  },
  {
    id: 'w-18',
    word: 'le',
    translation_en: 'to him / to her / to you (indirect pronoun)',
    translation_ar: 'له / لها / لحضرتك (ضمير مفعول به غير مباشر)',
    pos: 'pronoun',
    cefr: 'A1',
    frequencyRank: 18,
    category: 'pronouns',
    topic: 'pronouns',
    collocations: [
      {
        phrase_es: 'le gusta',
        phrase_en: 'he/she likes',
        phrase_ar: 'يعجبه / يعجبها',
        example_es: 'A Juan le gusta la música.',
        example_en: 'Juan likes music.',
        example_ar: 'خوان تعجبه الموسيقى.'
      }
    ],
    exampleSentences: [
      { es: 'Le doy el libro a mi amigo.', en: 'I give the book to my friend.', ar: 'أعطي الكتاب لصديقي.' }
    ]
  },
  {
    id: 'w-19',
    word: 'su',
    translation_en: 'his / her / their / your (formal)',
    translation_ar: 'ـه / ـها / ـهم / لحضرتك (ضمير ملكية)',
    pos: 'pronoun',
    plural: 'sus',
    cefr: 'A1',
    frequencyRank: 19,
    category: 'pronouns',
    topic: 'possessives',
    collocations: [
      {
        phrase_es: 'su familia / sus amigos',
        phrase_en: 'his/her family / his/her friends',
        phrase_ar: 'عائلته / أصدقاؤه',
        example_es: 'Ella vive con su familia.',
        example_en: 'She lives with her family.',
        example_ar: 'هي تعيش مع عائلتها.'
      }
    ],
    exampleSentences: [
      { es: 'Su casa es muy bonita.', en: 'His/Her house is very pretty.', ar: 'منزله / منزلها جميل جداً.' }
    ]
  },
  {
    id: 'w-20',
    word: 'poder',
    translation_en: 'to be able to / can',
    translation_ar: 'يستطيع / يقدر',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 20,
    category: 'verbs',
    topic: 'modal_verbs',
    collocations: [
      {
        phrase_es: '¿Puedo + infinitivo?',
        phrase_en: 'May I / Can I + verb?',
        phrase_ar: 'هل يمكنني أن + فعل؟',
        example_es: '¿Puedo entrar?',
        example_en: 'May I come in?',
        example_ar: 'هل يمكنني الدخول؟'
      }
    ],
    exampleSentences: [
      { es: 'No puedo hablar ahora porque estoy ocupado.', en: 'I cannot talk right now because I am busy.', ar: 'لا أستطيع التحدث الآن لأنني مشغول.' }
    ]
  },
  {
    id: 'w-21',
    word: 'hacer',
    translation_en: 'to do / to make / weather phrases',
    translation_ar: 'يفعل / يصنع / يستخدم للطقس (hace calor)',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 21,
    category: 'verbs',
    topic: 'essential_verbs',
    collocations: [
      {
        phrase_es: 'hacer buen tiempo / frío / calor',
        phrase_en: 'to be nice weather / cold / hot',
        phrase_ar: 'الطقس جميل / بارد / حار',
        example_es: 'Hoy hace mucho calor.',
        example_en: 'Today it is very hot.',
        example_ar: 'اليوم الجو حار جداً.'
      },
      {
        phrase_es: 'hacer la comida',
        phrase_en: 'to cook/make food',
        phrase_ar: 'يعد الطعام',
        example_es: 'Hago la cena a las ocho.',
        example_en: 'I make dinner at eight.',
        example_ar: 'أعد العشاء في الثامنة.'
      }
    ],
    exampleSentences: [
      { es: '¿Qué haces este fin de semana?', en: 'What are you doing this weekend?', ar: 'ماذا تفعل في عطلة نهاية هذا الأسبوع؟' }
    ]
  },
  {
    id: 'w-22',
    word: 'ir',
    translation_en: 'to go',
    translation_ar: 'يذهب',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 22,
    category: 'verbs',
    topic: 'essential_verbs',
    collocations: [
      {
        phrase_es: 'ir a + infinitivo (futuro)',
        phrase_en: 'going to + verb (near future)',
        phrase_ar: 'سوف + فعل (مستقبل قريب)',
        example_es: 'Voy a viajar mañana.',
        example_en: 'I am going to travel tomorrow.',
        example_ar: 'سوف أسافر غداً.'
      }
    ],
    exampleSentences: [
      { es: 'Vamos al cine esta noche.', en: 'We are going to the cinema tonight.', ar: 'نحن ذاهبون إلى السينما الليلة.' }
    ]
  },
  {
    id: 'w-23',
    word: 'decir',
    translation_en: 'to say / to tell',
    translation_ar: 'يقول / يخبر',
    pos: 'verb',
    cefr: 'A1',
    frequencyRank: 23,
    category: 'verbs',
    topic: 'communication_verbs',
    collocations: [
      {
        phrase_es: 'decir la verdad',
        phrase_en: 'to tell the truth',
        phrase_ar: 'يقول الحقيقة',
        example_es: 'Siempre digo la verdad.',
        example_en: 'I always tell the truth.',
        example_ar: 'أنا دائماً أقول الحقيقة.'
      }
    ],
    exampleSentences: [
      { es: '¿Cómo se dice esto en español?', en: 'How do you say this in Spanish?', ar: 'كيف يقال هذا بالإسبانية؟' }
    ]
  },
  {
    id: 'w-24',
    word: 'pero',
    translation_en: 'but',
    translation_ar: 'لكن',
    pos: 'conjunction',
    cefr: 'A1',
    frequencyRank: 24,
    category: 'conjunctions',
    topic: 'connectors',
    collocations: [
      {
        phrase_es: 'difícil pero posible',
        phrase_en: 'difficult but possible',
        phrase_ar: 'صعب لكن ممكن',
        example_es: 'Es difícil pero no imposible.',
        example_en: 'It is difficult but not impossible.',
        example_ar: 'هو صعب لكن ليس مستحيلاً.'
      }
    ],
    exampleSentences: [
      { es: 'Quiero salir, pero está lloviendo.', en: 'I want to go out, but it is raining.', ar: 'أريد الخروج، لكن السماء تمطر.' }
    ]
  },
  {
    id: 'w-25',
    word: 'más',
    translation_en: 'more / plus',
    translation_ar: 'أكثر / زيادة / زائد',
    pos: 'adverb',
    cefr: 'A1',
    frequencyRank: 25,
    category: 'adverbs',
    topic: 'comparisons',
    collocations: [
      {
        phrase_es: 'más ... que',
        phrase_en: 'more ... than',
        phrase_ar: 'أكثر ... من',
        example_es: 'Madrid es más grande que Sevilla.',
        example_en: 'Madrid is bigger than Seville.',
        example_ar: 'مدريد أكبر من إشبيلية.'
      },
      {
        phrase_es: 'más o menos',
        phrase_en: 'more or less / approximately',
        phrase_ar: 'تقريباً / نوعاً ما',
        example_es: 'Hablo español más o menos bien.',
        example_en: 'I speak Spanish more or less well.',
        example_ar: 'أتحدث الإسبانية بشكل جيد نوعاً ما.'
      }
    ],
    exampleSentences: [
      { es: '¿Puedes hablar más despacio, por favor?', en: 'Can you speak more slowly, please?', ar: 'هل يمكنك التحدث ببطء أكثر، من فضلك؟' }
    ]
  }
];
