export interface HighFrequencyVocabEntry {
  id: string;
  word: string;
  frequency_rank: number;
  pos: 'verb' | 'noun' | 'adjective' | 'connector' | 'adverb' | 'phrase' | 'pronoun';
  bucket: 'Bucket A: Connectors & Transitions' | 'Bucket B: Survival Needs' | 'Bucket C: Opinions & Reactions' | 'Bucket D: Time & Frequency' | 'Bucket E: High-Frequency Verbs';
  english_primary: string;
  collocations: [string, string, string];
  audio_phonetic: string;
  mexican_usage_note: string;
  example_es: string;
  example_en: string;
}

export const HIGH_FREQUENCY_VOCAB_ENGINE: HighFrequencyVocabEntry[] = [
  // BUCKET A: CONNECTORS & TRANSITIONS
  {
    id: 'hf_1',
    word: 'entonces',
    frequency_rank: 12,
    pos: 'connector',
    bucket: 'Bucket A: Connectors & Transitions',
    english_primary: 'then / so / in that case',
    collocations: ['¿entonces qué?', 'entonces podemos ir', 'desde entonces'],
    audio_phonetic: 'ehn-TOHN-sehs',
    mexican_usage_note: 'Used constantly in conversation to transition between thoughts or summarize plans.',
    example_es: 'Si estás libre, entonces vamos por unos tacos.',
    example_en: 'If you are free, then let’s go get some tacos.'
  },
  {
    id: 'hf_2',
    word: 'pero',
    frequency_rank: 8,
    pos: 'connector',
    bucket: 'Bucket A: Connectors & Transitions',
    english_primary: 'but / however',
    collocations: ['pero bueno', 'pero es que', 'pero no importa'],
    audio_phonetic: 'PEH-roh',
    mexican_usage_note: '"Pero bueno" is the standard Mexican conversational soft reset when moving to a new topic.',
    example_es: 'Quiero ir a la fiesta, pero tengo que trabajar.',
    example_en: 'I want to go to the party, but I have to work.'
  },
  {
    id: 'hf_3',
    word: 'mira',
    frequency_rank: 24,
    pos: 'connector',
    bucket: 'Bucket A: Connectors & Transitions',
    english_primary: 'look / listen / check this out',
    collocations: ['mira esto', 'mira, te cuento', 'mira nada más'],
    audio_phonetic: 'MEE-rah',
    mexican_usage_note: 'Used at the start of sentences to grab attention before making a point.',
    example_es: 'Mira, te explico cómo llegar a la estación.',
    example_en: 'Look, let me explain how to get to the station.'
  },
  {
    id: 'hf_4',
    word: 'o sea',
    frequency_rank: 30,
    pos: 'connector',
    bucket: 'Bucket A: Connectors & Transitions',
    english_primary: 'I mean / in other words / like',
    collocations: ['o sea que sí', 'o sea, no entiendo', 'o sea, imagínate'],
    audio_phonetic: 'oh SEH-ah',
    mexican_usage_note: 'The ultimate Mexican conversational filler used when clarifying or elaborating.',
    example_es: 'No tengo mucho dinero, o sea, mejor comemos aquí.',
    example_en: 'I don’t have much money, I mean, we’d better eat here.'
  },
  {
    id: 'hf_5',
    word: 'la verdad',
    frequency_rank: 45,
    pos: 'connector',
    bucket: 'Bucket A: Connectors & Transitions',
    english_primary: 'to be honest / truthfully',
    collocations: ['la verdad no sé', 'la verdad sí', 'la verdad es que'],
    audio_phonetic: 'lah vehr-DAHD',
    mexican_usage_note: 'Softens opinions or polite refusals in natural Mexican speech.',
    example_es: 'La verdad no me gusta mucho la comida picante.',
    example_en: 'To be honest, I don’t really like spicy food.'
  },

  // BUCKET B: SURVIVAL NEEDS
  {
    id: 'hf_6',
    word: 'clave',
    frequency_rank: 60,
    pos: 'noun',
    bucket: 'Bucket B: Survival Needs',
    english_primary: 'code / password / key',
    collocations: ['clave del Wi-Fi', 'dar la clave', 'cambiar la clave'],
    audio_phonetic: 'KLAH-veh',
    mexican_usage_note: '"Clave del Wi-Fi" is far more common in Mexico than "contraseña" in coffee shops.',
    example_es: '¿Me puedes dar la clave del Wi-Fi, por favor?',
    example_en: 'Can you give me the Wi-Fi password, please?'
  },
  {
    id: 'hf_7',
    word: 'necesito',
    frequency_rank: 15,
    pos: 'verb',
    bucket: 'Bucket B: Survival Needs',
    english_primary: 'I need',
    collocations: ['necesito ayuda', 'necesito saber', 'necesito ir'],
    audio_phonetic: 'neh-seh-SEE-toh',
    mexican_usage_note: 'Direct and polite way to express urgent survival requirements.',
    example_es: 'Necesito ir al cajero automático antes de pagar.',
    example_en: 'I need to go to the ATM before paying.'
  },
  {
    id: 'hf_8',
    word: 'cuánto cuesta',
    frequency_rank: 22,
    pos: 'phrase',
    bucket: 'Bucket B: Survival Needs',
    english_primary: 'how much does it cost',
    collocations: ['¿cuánto cuesta esto?', '¿cuánto cuesta el viaje?', '¿cuánto cuesta la entrada?'],
    audio_phonetic: 'KWAN-toh KWEHS-tah',
    mexican_usage_note: 'Essential price check phrase at markets and street stands.',
    example_es: 'Disculpe, ¿cuánto cuesta esta playera?',
    example_en: 'Excuse me, how much does this t-shirt cost?'
  },
  {
    id: 'hf_9',
    word: 'dónde está',
    frequency_rank: 5,
    pos: 'phrase',
    bucket: 'Bucket B: Survival Needs',
    english_primary: 'where is',
    collocations: ['¿dónde está el baño?', '¿dónde está la estación?', '¿dónde está mi Uber?'],
    audio_phonetic: 'DOHN-deh ehs-TAH',
    mexican_usage_note: 'Number one navigation query everywhere in Latin America.',
    example_es: '¿Dónde está la parada de autobús más cercana?',
    example_en: 'Where is the nearest bus stop?'
  },
  {
    id: 'hf_10',
    word: 'efectivo',
    frequency_rank: 88,
    pos: 'noun',
    bucket: 'Bucket B: Survival Needs',
    english_primary: 'cash money',
    collocations: ['pagar en efectivo', 'solo efectivo', 'sacar efectivo'],
    audio_phonetic: 'eh-fehk-TEE-boh',
    mexican_usage_note: 'Crucial for street food stalls and local markets where cards aren’t taken.',
    example_es: 'Lo siento, solo aceptamos pago en efectivo.',
    example_en: 'Sorry, we only accept cash payment.'
  },

  // BUCKET C: OPINIONS & REACTIONS
  {
    id: 'hf_11',
    word: 'chido',
    frequency_rank: 50,
    pos: 'adjective',
    bucket: 'Bucket C: Opinions & Reactions',
    english_primary: 'cool / awesome / neat',
    collocations: ['¡qué chido!', 'está bien chido', 'un lugar muy chido'],
    audio_phonetic: 'CHEE-doh',
    mexican_usage_note: 'The most ubiquitous Mexican slang adjective for expressing approval or coolness.',
    example_es: '¡Qué chido está este restaurante!',
    example_en: 'How cool is this restaurant!'
  },
  {
    id: 'hf_12',
    word: 'pienso que',
    frequency_rank: 35,
    pos: 'phrase',
    bucket: 'Bucket C: Opinions & Reactions',
    english_primary: 'I think that',
    collocations: ['pienso que sí', 'pienso que es mejor', 'yo pienso que no'],
    audio_phonetic: 'PYEHN-soh keh',
    mexican_usage_note: 'Used to introduce personal perspectives in conversation.',
    example_es: 'Pienso que deberíamos pedir la salsa aparte.',
    example_en: 'I think we should order the salsa on the side.'
  },
  {
    id: 'hf_13',
    word: 'claro',
    frequency_rank: 18,
    pos: 'adverb',
    bucket: 'Bucket C: Opinions & Reactions',
    english_primary: 'of course / sure / clearly',
    collocations: ['¡claro que sí!', 'claro que no', 'ah, claro'],
    audio_phonetic: 'KLAH-roh',
    mexican_usage_note: '"¡Claro que sí!" expresses strong, warm agreement.',
    example_es: '—¿Me puedes ayudar? —¡Claro que sí, dime!',
    example_en: '—Can you help me? —Of course, tell me!'
  },
  {
    id: 'hf_14',
    word: 'me parece',
    frequency_rank: 40,
    pos: 'phrase',
    bucket: 'Bucket C: Opinions & Reactions',
    english_primary: 'it seems to me / I think',
    collocations: ['me parece bien', 'me parece una buena idea', '¿qué te parece?'],
    audio_phonetic: 'meh pah-REH-seh',
    mexican_usage_note: '"Me parece bien" is the polite standard response to agree to plans.',
    example_es: 'Nos vemos a las cuatro, ¿me parece bien?',
    example_en: 'We see each other at four, sounds good to me?'
  },

  // BUCKET D: TIME & FREQUENCY
  {
    id: 'hf_15',
    word: 'ahorita',
    frequency_rank: 2,
    pos: 'adverb',
    bucket: 'Bucket D: Time & Frequency',
    english_primary: 'right now / in a moment / shortly',
    collocations: ['ahorita vengo', 'ahorita te digo', 'ahorita mismo'],
    audio_phonetic: 'ah-oh-REE-tah',
    mexican_usage_note: 'Famous Mexican time word that can mean instantly, in 10 minutes, or later today.',
    example_es: 'Ahorita voy para allá, dame cinco minutos.',
    example_en: 'I’m heading there right now, give me five minutes.'
  },
  {
    id: 'hf_16',
    word: 'luego',
    frequency_rank: 25,
    pos: 'adverb',
    bucket: 'Bucket D: Time & Frequency',
    english_primary: 'later / then / afterwards',
    collocations: ['hasta luego', 'luego nos vemos', 'luego te hablo'],
    audio_phonetic: 'LWAY-goh',
    mexican_usage_note: 'Used both for immediate sequences ("luego comemos") and future farewells ("hasta luego").',
    example_es: 'Termino de trabajar y luego voy a tu casa.',
    example_en: 'I finish work and then I go to your house.'
  },
  {
    id: 'hf_17',
    word: 'siempre',
    frequency_rank: 28,
    pos: 'adverb',
    bucket: 'Bucket D: Time & Frequency',
    english_primary: 'always',
    collocations: ['para siempre', 'como siempre', 'casi siempre'],
    audio_phonetic: 'SYEHM-preh',
    mexican_usage_note: 'High frequency time adverb used daily.',
    example_es: 'Ese café siempre está lleno por las mañanas.',
    example_en: 'That coffee shop is always full in the mornings.'
  },

  // BUCKET E: HIGH-FREQUENCY VERBS
  {
    id: 'hf_18',
    word: 'querer',
    frequency_rank: 6,
    pos: 'verb',
    bucket: 'Bucket E: High-Frequency Verbs',
    english_primary: 'to want / to love',
    collocations: ['quiero pedir', '¿qué quieres hacer?', 'te quiero mucho'],
    audio_phonetic: 'keh-REHR',
    mexican_usage_note: 'Used for ordering food/drinks ("Quiero...") and expressing affection.',
    example_es: 'Quiero pedir dos tacos de pastor y una horchata.',
    example_en: 'I want to order two tacos al pastor and a horchata.'
  },
  {
    id: 'hf_19',
    word: 'poder',
    frequency_rank: 4,
    pos: 'verb',
    bucket: 'Bucket E: High-Frequency Verbs',
    english_primary: 'can / to be able to',
    collocations: ['¿puedo pasar?', 'no puedo ir', '¿se puede?'],
    audio_phonetic: 'poh-DEHR',
    mexican_usage_note: 'Crucial modal verb for requests, permissions, and abilities.',
    example_es: '¿Puedo pagar con tarjeta de crédito?',
    example_en: 'Can I pay with credit card?'
  },
  {
    id: 'hf_20',
    word: 'hacer',
    frequency_rank: 3,
    pos: 'verb',
    bucket: 'Bucket E: High-Frequency Verbs',
    english_primary: 'to do / to make',
    collocations: ['hacer una pregunta', 'hacer la reserva', 'hacer calor'],
    audio_phonetic: 'ah-SEHR',
    mexican_usage_note: 'Multipurpose verb used for weather ("hace calor"), tasks, and questions.',
    example_es: '¿Qué vas a hacer este fin de semana?',
    example_en: 'What are you going to do this weekend?'
  }
];
