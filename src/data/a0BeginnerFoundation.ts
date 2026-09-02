export interface AnchorWord {
  word: string;
  translation: string;
  ipa: string;
  phonetic_guide: string;
  audio_cue: string;
  emoji: string;
}

export interface ChunkStep {
  step: number;
  text_es: string;
  text_en: string;
  audio_text: string;
  explanation: string;
}

export interface MicroDrill {
  id: string;
  type: 'tap_to_translate' | 'word_swap' | 'audio_match' | 'sentence_builder' | 'visual_match' | 'rapid_choice';
  prompt: string;
  audio_text?: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

export interface A0Unit {
  unit_id: string;
  title: string;
  category: string;
  emoji: string;
  anchor_words: AnchorWord[];
  chunk_building_ladder: ChunkStep[];
  zero_jargon_explanation: string;
  micro_drills: MicroDrill[];
}

export const A0_BEGINNER_UNITS: A0Unit[] = [
  {
    unit_id: 'unit_0_1',
    title: 'Unit 0.1: Ordering Your First Drink',
    category: 'Cafe & Survival',
    emoji: '☕',
    anchor_words: [
      { word: 'Hola', translation: 'Hello / Hi', ipa: '/ˈola/', phonetic_guide: 'OH-lah', audio_cue: 'Hola', emoji: '👋' },
      { word: 'Un', translation: 'A / One (masculine)', ipa: '/un/', phonetic_guide: 'OON', audio_cue: 'Un', emoji: '1️⃣' },
      { word: 'Café', translation: 'Coffee', ipa: '/kaˈfe/', phonetic_guide: 'kah-FEH', audio_cue: 'Café', emoji: '☕' },
      { word: 'Por favor', translation: 'Please', ipa: '/poɾ faˈβoɾ/', phonetic_guide: 'por fah-VOR', audio_cue: 'Por favor', emoji: '🙏' },
      { word: 'Quiero', translation: 'I want / I would like', ipa: '/ˈkjeɾo/', phonetic_guide: 'KYEH-roh', audio_cue: 'Quiero', emoji: '🙋‍♂️' }
    ],
    chunk_building_ladder: [
      { step: 1, text_es: 'Café', text_en: 'Coffee', audio_text: 'Café', explanation: 'Step 1: Start with the item.' },
      { step: 2, text_es: 'Un café', text_en: 'A coffee', audio_text: 'Un café', explanation: 'Step 2: Add "a" (Un).' },
      { step: 3, text_es: 'Un café, por favor', text_en: 'A coffee, please', audio_text: 'Un café, por favor', explanation: 'Step 3: Add courtesy.' },
      { step: 4, text_es: 'Quiero un café, por favor', text_en: 'I want a coffee, please', audio_text: 'Quiero un café, por favor', explanation: 'Step 4: Full survival sentence!' }
    ],
    zero_jargon_explanation: 'In Spanish, you can order easily by placing "Quiero" (I want) before any drink and adding "por favor" at the end.',
    micro_drills: [
      {
        id: 'u01_d1',
        type: 'tap_to_translate',
        prompt: 'How do you say "Please" in Spanish?',
        options: ['Por favor', 'Hola', 'Café', 'Quiero'],
        correct_answer: 'Por favor',
        explanation: '"Por favor" literally means "for favor" and is used everywhere for "please".'
      },
      {
        id: 'u01_d2',
        type: 'sentence_builder',
        prompt: 'Assemble: "A coffee, please"',
        options: ['Un', 'café,', 'por', 'favor'],
        correct_answer: 'Un café, por favor',
        explanation: 'Combine "Un" + "café" + "por favor".'
      },
      {
        id: 'u01_d3',
        type: 'word_swap',
        prompt: 'Swap "Café" to order "Tea" (Té): "Quiero un _____ , por favor"',
        options: ['té', 'hola', 'un', 'gracias'],
        correct_answer: 'té',
        explanation: 'Replacing "café" with "té" lets you order tea instantly using the exact same structure.'
      },
      {
        id: 'u01_d4',
        type: 'audio_match',
        prompt: 'Listen and select the word spoken:',
        audio_text: 'Quiero',
        options: ['Quiero', 'Café', 'Hola', 'Favor'],
        correct_answer: 'Quiero',
        explanation: '"Quiero" means "I want" or "I would like".'
      },
      {
        id: 'u01_d5',
        type: 'visual_match',
        prompt: 'Match "☕ Un café"',
        options: ['A coffee', 'A tea', 'Water', 'Please'],
        correct_answer: 'A coffee',
        explanation: '☕ represents "Un café".'
      },
      {
        id: 'u01_d6',
        type: 'rapid_choice',
        prompt: 'Select the polite way to say "I want a coffee, please":',
        options: ['Quiero un café, por favor', 'Hola café quiero', 'Por favor café un', 'Café hola gracias'],
        correct_answer: 'Quiero un café, por favor',
        explanation: 'Quiero + item + por favor is the standard polite order phrase.'
      }
    ]
  },
  {
    unit_id: 'unit_0_2',
    title: 'Unit 0.2: Essential Courtesies',
    category: 'Manners & Greetings',
    emoji: '🤝',
    anchor_words: [
      { word: 'Gracias', translation: 'Thank you / Thanks', ipa: '/ˈɡɾasjas/', phonetic_guide: 'GRAH-syahs', audio_cue: 'Gracias', emoji: '🙌' },
      { word: 'De nada', translation: 'You are welcome', ipa: '/de ˈnaða/', phonetic_guide: 'deh NAH-dah', audio_cue: 'De nada', emoji: '😊' },
      { word: 'Muchas gracias', translation: 'Thank you very much', ipa: '/ˈmutʃas ˈɡɾasjas/', phonetic_guide: 'MOO-chahs GRAH-syahs', audio_cue: 'Muchas gracias', emoji: '🌟' },
      { word: 'Perdón', translation: 'Excuse me / Sorry', ipa: '/peɾˈdon/', phonetic_guide: 'pehr-DOHN', audio_cue: 'Perdón', emoji: '😅' },
      { word: 'Disculpe', translation: 'Excuse me (polite attention)', ipa: '/disˈkulpe/', phonetic_guide: 'dees-KOOL-peh', audio_cue: 'Disculpe', emoji: '🙋‍♀️' }
    ],
    chunk_building_ladder: [
      { step: 1, text_es: 'Gracias', text_en: 'Thanks', audio_text: 'Gracias', explanation: 'Step 1: Basic thanks.' },
      { step: 2, text_es: 'Muchas gracias', text_en: 'Thank you very much', audio_text: 'Muchas gracias', explanation: 'Step 2: Adding emphasis with "Muchas".' },
      { step: 3, text_es: 'Disculpe, por favor', text_en: 'Excuse me, please', audio_text: 'Disculpe, por favor', explanation: 'Step 3: Polite attention grabbing.' },
      { step: 4, text_es: 'Disculpe, muchas gracias', text_en: 'Excuse me, thank you very much', audio_text: 'Disculpe, muchas gracias', explanation: 'Step 4: Combining polite phrases.' }
    ],
    zero_jargon_explanation: 'Use "Disculpe" to get a waiter\'s attention politely, and "Gracias" when receiving your order.',
    micro_drills: [
      {
        id: 'u02_d1',
        type: 'tap_to_translate',
        prompt: 'How do you say "You are welcome" in Spanish?',
        options: ['De nada', 'Gracias', 'Perdón', 'Hola'],
        correct_answer: 'De nada',
        explanation: '"De nada" literally means "of nothing", used for "you\'re welcome".'
      },
      {
        id: 'u02_d2',
        type: 'sentence_builder',
        prompt: 'Assemble: "Thank you very much"',
        options: ['Muchas', 'gracias'],
        correct_answer: 'Muchas gracias',
        explanation: 'Muchas + gracias = Thank you very much.'
      },
      {
        id: 'u02_d3',
        type: 'word_swap',
        prompt: 'If someone bumps into you, you say: "_____ !"',
        options: ['Perdón', 'De nada', 'Un café', 'Té'],
        correct_answer: 'Perdón',
        explanation: '"Perdón" is the go-to word when bumping into someone or apologizing.'
      },
      {
        id: 'u02_d4',
        type: 'audio_match',
        prompt: 'Listen and identify the audio:',
        audio_text: 'Disculpe',
        options: ['Disculpe', 'Gracias', 'Hola', 'De nada'],
        correct_answer: 'Disculpe',
        explanation: '"Disculpe" means "Excuse me".'
      },
      {
        id: 'u02_d5',
        type: 'visual_match',
        prompt: 'Match "🙌 Gracias"',
        options: ['Thank you', 'Excuse me', 'Please', 'Hello'],
        correct_answer: 'Thank you',
        explanation: 'Gracias = Thank you.'
      },
      {
        id: 'u02_d6',
        type: 'rapid_choice',
        prompt: 'How do you politely get a waiter\'s attention in Mexico?',
        options: ['Disculpe', 'De nada', 'Adiós', 'No'],
        correct_answer: 'Disculpe',
        explanation: '"Disculpe" is the most polite way to call attention in a café or restaurant.'
      }
    ]
  },
  {
    unit_id: 'unit_0_3',
    title: 'Unit 0.3: Expressing Basic Needs',
    category: 'Daily Survival',
    emoji: '💧',
    anchor_words: [
      { word: 'Necesito', translation: 'I need', ipa: '/neseˈsito/', phonetic_guide: 'neh-seh-SEE-toh', audio_cue: 'Necesito', emoji: '🆘' },
      { word: 'Agua', translation: 'Water', ipa: '/ˈaɣwa/', phonetic_guide: 'AH-gwah', audio_cue: 'Agua', emoji: '💧' },
      { word: 'Tengo', translation: 'I have', ipa: '/ˈteŋɡo/', phonetic_guide: 'TEN-goh', audio_cue: 'Tengo', emoji: '🎒' },
      { word: 'Sed', translation: 'Thirst', ipa: '/sed/', phonetic_guide: 'SEHD', audio_cue: 'Sed', emoji: '🌵' },
      { word: 'Hambre', translation: 'Hunger', ipa: '/ˈambɾe/', phonetic_guide: 'AHM-breh', audio_cue: 'Hambre', emoji: '🌮' }
    ],
    chunk_building_ladder: [
      { step: 1, text_es: 'Agua', text_en: 'Water', audio_text: 'Agua', explanation: 'Step 1: Core need.' },
      { step: 2, text_es: 'Necesito agua', text_en: 'I need water', audio_text: 'Necesito agua', explanation: 'Step 2: Express need.' },
      { step: 3, text_es: 'Tengo sed', text_en: 'I am thirsty (I have thirst)', audio_text: 'Tengo sed', explanation: 'Step 3: Express state.' },
      { step: 4, text_es: 'Tengo sed, necesito agua, por favor', text_en: 'I am thirsty, I need water, please', audio_text: 'Tengo sed, necesito agua, por favor', explanation: 'Step 4: Full survival chain!' }
    ],
    zero_jargon_explanation: 'In Spanish, you say "I have thirst" (Tengo sed) and "I have hunger" (Tengo hambre) instead of "I am thirsty/hungry".',
    micro_drills: [
      {
        id: 'u03_d1',
        type: 'tap_to_translate',
        prompt: 'Translate: "I need water"',
        options: ['Necesito agua', 'Tengo café', 'Hola por favor', 'Gracias agua'],
        correct_answer: 'Necesito agua',
        explanation: 'Necesito (I need) + agua (water).'
      },
      {
        id: 'u03_d2',
        type: 'sentence_builder',
        prompt: 'Assemble: "I am hungry" (I have hunger)',
        options: ['Tengo', 'hambre'],
        correct_answer: 'Tengo hambre',
        explanation: 'Tengo (I have) + hambre (hunger) = I am hungry.'
      },
      {
        id: 'u03_d3',
        type: 'word_swap',
        prompt: 'Swap "sed" to say "I am hungry": "Tengo _____ "',
        options: ['hambre', 'agua', 'gracias', 'café'],
        correct_answer: 'hambre',
        explanation: 'Tengo + hambre = I am hungry.'
      },
      {
        id: 'u03_d4',
        type: 'audio_match',
        prompt: 'Listen to the audio and select what it means:',
        audio_text: 'Tengo sed',
        options: ['I am thirsty', 'I am hungry', 'I need coffee', 'I have water'],
        correct_answer: 'I am thirsty',
        explanation: 'Tengo sed = I am thirsty.'
      },
      {
        id: 'u03_d5',
        type: 'visual_match',
        prompt: 'Match "💧 Agua"',
        options: ['Water', 'Coffee', 'Tea', 'Juice'],
        correct_answer: 'Water',
        explanation: 'Agua = Water.'
      },
      {
        id: 'u03_d6',
        type: 'rapid_choice',
        prompt: 'How do you say "I need water, please"?',
        options: ['Necesito agua, por favor', 'Tengo agua gracias', 'Hola agua quiero', 'De nada agua'],
        correct_answer: 'Necesito agua, por favor',
        explanation: 'Necesito + agua + por favor.'
      }
    ]
  },
  {
    unit_id: 'unit_0_4',
    title: 'Unit 0.4: Navigating a Café',
    category: 'Food & Drinks',
    emoji: '🥐',
    anchor_words: [
      { word: 'Pan', translation: 'Bread / Pastry', ipa: '/pan/', phonetic_guide: 'PAHN', audio_cue: 'Pan', emoji: '🍞' },
      { word: 'Jugo', translation: 'Juice', ipa: '/ˈxuɣo/', phonetic_guide: 'HOO-goh', audio_cue: 'Jugo', emoji: '🧃' },
      { word: 'Leche', translation: 'Milk', ipa: '/ˈletʃe/', phonetic_guide: 'LEH-cheh', audio_cue: 'Leche', emoji: '🥛' },
      { word: 'Con', translation: 'With', ipa: '/kon/', phonetic_guide: 'KOHN', audio_cue: 'Con', emoji: '➕' },
      { word: 'Sin', translation: 'Without', ipa: '/sin/', phonetic_guide: 'SEEN', audio_cue: 'Sin', emoji: '🚫' }
    ],
    chunk_building_ladder: [
      { step: 1, text_es: 'Café con leche', text_en: 'Coffee with milk', audio_text: 'Café con leche', explanation: 'Step 1: Pairing items.' },
      { step: 2, text_es: 'Café sin leche', text_en: 'Coffee without milk', audio_text: 'Café sin leche', explanation: 'Step 2: Modifying with "sin".' },
      { step: 3, text_es: 'Quiero un café con leche', text_en: 'I want a coffee with milk', audio_text: 'Quiero un café con leche', explanation: 'Step 3: Ordering with specifics.' },
      { step: 4, text_es: 'Quiero un café con leche y un pan, por favor', text_en: 'I want a coffee with milk and a pastry, please', audio_text: 'Quiero un café con leche y un pan, por favor', explanation: 'Step 4: Full breakfast combo!' }
    ],
    zero_jargon_explanation: 'Use "con" for WITH and "sin" for WITHOUT to easily customize any drink or food order.',
    micro_drills: [
      {
        id: 'u04_d1',
        type: 'tap_to_translate',
        prompt: 'Translate: "Coffee without milk"',
        options: ['Café sin leche', 'Café con leche', 'Jugo de agua', 'Pan con jugo'],
        correct_answer: 'Café sin leche',
        explanation: 'Café + sin (without) + leche (milk).'
      },
      {
        id: 'u04_d2',
        type: 'sentence_builder',
        prompt: 'Assemble: "Coffee with milk, please"',
        options: ['Café', 'con', 'leche,', 'por', 'favor'],
        correct_answer: 'Café con leche, por favor',
        explanation: 'Café + con + leche + por favor.'
      },
      {
        id: 'u04_d3',
        type: 'word_swap',
        prompt: 'Change "con" to "without": "Café _____ azúcar"',
        options: ['sin', 'con', 'un', 'hola'],
        correct_answer: 'sin',
        explanation: '"Sin" means without.'
      },
      {
        id: 'u04_d4',
        type: 'audio_match',
        prompt: 'Listen to the audio clip:',
        audio_text: 'Jugo',
        options: ['Jugo', 'Leche', 'Pan', 'Agua'],
        correct_answer: 'Jugo',
        explanation: 'Jugo = Juice.'
      },
      {
        id: 'u04_d5',
        type: 'visual_match',
        prompt: 'Match "🥛 Leche"',
        options: ['Milk', 'Juice', 'Water', 'Coffee'],
        correct_answer: 'Milk',
        explanation: 'Leche = Milk.'
      },
      {
        id: 'u04_d6',
        type: 'rapid_choice',
        prompt: 'How do you ask for "A juice without sugar, please"?',
        options: ['Un jugo sin azúcar, por favor', 'Con jugo leche azúcar', 'Quiero azúcar con agua', 'Sin jugo café favor'],
        correct_answer: 'Un jugo sin azúcar, por favor',
        explanation: 'Un jugo + sin azúcar + por favor.'
      }
    ]
  },
  {
    unit_id: 'unit_0_5',
    title: 'Unit 0.5: Numbers 1-5 & Quantity',
    category: 'Numbers & Shopping',
    emoji: '🔢',
    anchor_words: [
      { word: 'Uno', translation: 'One', ipa: '/ˈuno/', phonetic_guide: 'OO-noh', audio_cue: 'Uno', emoji: '1️⃣' },
      { word: 'Dos', translation: 'Two', ipa: '/dos/', phonetic_guide: 'DOHS', audio_cue: 'Dos', emoji: '2️⃣' },
      { word: 'Tres', translation: 'Three', ipa: '/tɾes/', phonetic_guide: 'TREHS', audio_cue: 'Tres', emoji: '3️⃣' },
      { word: 'Cuatro', translation: 'Four', ipa: '/ˈkwatɾo/', phonetic_guide: 'KWAH-troh', audio_cue: 'Cuatro', emoji: '4️⃣' },
      { word: 'Cinco', translation: 'Five', ipa: '/ˈsinko/', phonetic_guide: 'SEEN-koh', audio_cue: 'Cinco', emoji: '5️⃣' }
    ],
    chunk_building_ladder: [
      { step: 1, text_es: 'Dos', text_en: 'Two', audio_text: 'Dos', explanation: 'Step 1: Single number.' },
      { step: 2, text_es: 'Dos cafés', text_en: 'Two coffees', audio_text: 'Dos cafés', explanation: 'Step 2: Number + plural noun.' },
      { step: 3, text_es: 'Dos cafés, por favor', text_en: 'Two coffees, please', audio_text: 'Dos cafés, por favor', explanation: 'Step 3: Numbered order.' },
      { step: 4, text_es: 'Quiero tres tacos, por favor', text_en: 'I want three tacos, please', audio_text: 'Quiero tres tacos, por favor', explanation: 'Step 4: Complete quantity order!' }
    ],
    zero_jargon_explanation: 'To make nouns plural after a number bigger than 1, simply add "-s" to the word (café -> cafés, taco -> tacos).',
    micro_drills: [
      {
        id: 'u05_d1',
        type: 'tap_to_translate',
        prompt: 'Translate: "Dos cafés, por favor"',
        options: ['Two coffees, please', 'One coffee, please', 'Three teas, please', 'Four juices, please'],
        correct_answer: 'Two coffees, please',
        explanation: 'Dos = 2, cafés = coffees.'
      },
      {
        id: 'u05_d2',
        type: 'sentence_builder',
        prompt: 'Assemble: "Three tacos, please"',
        options: ['Tres', 'tacos,', 'por', 'favor'],
        correct_answer: 'Tres tacos, por favor',
        explanation: 'Tres + tacos + por favor.'
      },
      {
        id: 'u05_d3',
        type: 'word_swap',
        prompt: 'Order 4 drinks instead of 2: "_____ cafés, por favor"',
        options: ['Cuatro', 'Uno', 'Cinco', 'Gracias'],
        correct_answer: 'Cuatro',
        explanation: 'Cuatro = 4.'
      },
      {
        id: 'u05_d4',
        type: 'audio_match',
        prompt: 'Listen and pick the correct number:',
        audio_text: 'Cinco',
        options: ['5', '3', '2', '1'],
        correct_answer: '5',
        explanation: 'Cinco = 5.'
      },
      {
        id: 'u05_d5',
        type: 'visual_match',
        prompt: 'Match "3️⃣ Tres"',
        options: ['Three', 'Two', 'Four', 'Five'],
        correct_answer: 'Three',
        explanation: 'Tres = 3.'
      },
      {
        id: 'u05_d6',
        type: 'rapid_choice',
        prompt: 'How do you order "One water and two teas"?',
        options: ['Un agua y dos tés', 'Tres aguas y cuatro tés', 'Cinco agua un té', 'Dos agua tres gracias'],
        correct_answer: 'Un agua y dos tés',
        explanation: 'Un (1) agua + y (and) + dos (2) tés.'
      }
    ]
  },
  {
    unit_id: 'unit_0_6',
    title: 'Unit 0.6: Asking for Prices',
    category: 'Money & Shopping',
    emoji: '💵',
    anchor_words: [
      { word: '¿Cuánto cuesta?', translation: 'How much does it cost?', ipa: '/ˈkwanto ˈkwesta/', phonetic_guide: 'KWAN-toh KWEHS-tah', audio_cue: '¿Cuánto cuesta?', emoji: '🏷️' },
      { word: '¿Cuánto es?', translation: 'How much is it total?', ipa: '/ˈkwanto es/', phonetic_guide: 'KWAN-toh EHS', audio_cue: '¿Cuánto es?', emoji: '🔢' },
      { word: 'Pesos', translation: 'Pesos (currency)', ipa: '/ˈpesos/', phonetic_guide: 'PAY-sohs', audio_cue: 'Pesos', emoji: '🇲🇽' },
      { word: 'Dólares', translation: 'Dollars', ipa: '/ˈdolaɾes/', phonetic_guide: 'DOH-lah-rehs', audio_cue: 'Dólares', emoji: '💵' },
      { word: 'Barato', translation: 'Cheap', ipa: '/baˈɾato/', phonetic_guide: 'bah-RAH-toh', audio_cue: 'Barato', emoji: '🏷️' }
    ],
    chunk_building_ladder: [
      { step: 1, text_es: '¿Cuánto cuesta?', text_en: 'How much does it cost?', audio_text: '¿Cuánto cuesta?', explanation: 'Step 1: Core price question.' },
      { step: 2, text_es: '¿Cuánto cuesta el café?', text_en: 'How much is the coffee?', audio_text: '¿Cuánto cuesta el café?', explanation: 'Step 2: Specific item price.' },
      { step: 3, text_es: 'Disculpe, ¿cuánto cuesta el café?', text_en: 'Excuse me, how much is the coffee?', audio_text: 'Disculpe, ¿cuánto cuesta el café?', explanation: 'Step 3: Polite question.' },
      { step: 4, text_es: 'Disculpe, ¿cuánto es en total, por favor?', text_en: 'Excuse me, how much is it in total, please?', audio_text: 'Disculpe, ¿cuánto es en total, por favor?', explanation: 'Step 4: Paying the bill inquiry!' }
    ],
    zero_jargon_explanation: 'Use "¿Cuánto cuesta?" when pointing at a single item, and "¿Cuánto es?" when asking for the total total bill.',
    micro_drills: [
      {
        id: 'u06_d1',
        type: 'tap_to_translate',
        prompt: 'Translate: "How much is the coffee?"',
        options: ['¿Cuánto cuesta el café?', '¿Dónde está el café?', 'Quiero café gracias', 'Un café por favor'],
        correct_answer: '¿Cuánto cuesta el café?',
        explanation: '¿Cuánto cuesta? = How much does it cost?'
      },
      {
        id: 'u06_d2',
        type: 'sentence_builder',
        prompt: 'Assemble: "Excuse me, how much is it?"',
        options: ['Disculpe,', '¿cuánto', 'es?'],
        correct_answer: 'Disculpe, ¿cuánto es?',
        explanation: 'Disculpe + ¿cuánto es?'
      },
      {
        id: 'u06_d3',
        type: 'word_swap',
        prompt: 'Ask the price of water: "¿Cuánto cuesta _____ ?"',
        options: ['el agua', 'gracias', 'por favor', 'tres'],
        correct_answer: 'el agua',
        explanation: '¿Cuánto cuesta + item?'
      },
      {
        id: 'u06_d4',
        type: 'audio_match',
        prompt: 'Listen to the audio:',
        audio_text: '¿Cuánto cuesta?',
        options: ['How much is it?', 'Where is it?', 'What is it?', 'Who is it?'],
        correct_answer: 'How much is it?',
        explanation: '¿Cuánto cuesta? = How much does it cost?'
      },
      {
        id: 'u06_d5',
        type: 'visual_match',
        prompt: 'Match "🏷️ ¿Cuánto cuesta?"',
        options: ['How much does it cost?', 'Where is the bathroom?', 'I want coffee', 'Thank you'],
        correct_answer: 'How much does it cost?',
        explanation: '🏷️ relates to prices.'
      },
      {
        id: 'u06_d6',
        type: 'rapid_choice',
        prompt: 'Which phrase is best when asking for the total bill at a register?',
        options: ['¿Cuánto es, por favor?', 'Hola gracias tres', 'Agua sin leche', 'Tengo sed mucho'],
        correct_answer: '¿Cuánto es, por favor?',
        explanation: '¿Cuánto es? asks for the total sum.'
      }
    ]
  },
  {
    unit_id: 'unit_0_7',
    title: 'Unit 0.7: Where is it? (Basic Directions)',
    category: 'Navigation',
    emoji: '📍',
    anchor_words: [
      { word: '¿Dónde está...?', translation: 'Where is...?', ipa: '/ˈdonde esˈta/', phonetic_guide: 'DOHN-deh ehs-TAH', audio_cue: '¿Dónde está?', emoji: '🔍' },
      { word: 'El baño', translation: 'The bathroom / Restroom', ipa: '/el ˈbaɲo/', phonetic_guide: 'ehl BAH-nyoh', audio_cue: 'El baño', emoji: '🪠' },
      { word: 'Aquí', translation: 'Here', ipa: '/aˈki/', phonetic_guide: 'ah-KEE', audio_cue: 'Aquí', emoji: '👇' },
      { word: 'Allá', translation: 'Over there', ipa: '/aˈʝa/', phonetic_guide: 'ah-YAH', audio_cue: 'Allá', emoji: '👉' },
      { word: 'El hotel', translation: 'The hotel', ipa: '/el oˈtel/', phonetic_guide: 'ehl oh-TEHL', audio_cue: 'El hotel', emoji: '🏨' }
    ],
    chunk_building_ladder: [
      { step: 1, text_es: '¿Dónde está?', text_en: 'Where is it?', audio_text: '¿Dónde está?', explanation: 'Step 1: Universal location question.' },
      { step: 2, text_es: '¿Dónde está el baño?', text_en: 'Where is the bathroom?', audio_text: '¿Dónde está el baño?', explanation: 'Step 2: #1 most crucial travel question!' },
      { step: 3, text_es: 'Disculpe, ¿dónde está el baño?', text_en: 'Excuse me, where is the bathroom?', audio_text: 'Disculpe, ¿dónde está el baño?', explanation: 'Step 3: Adding polite entry.' },
      { step: 4, text_es: 'Está allá, gracias', text_en: 'It is over there, thank you', audio_text: 'Está allá, gracias', explanation: 'Step 4: Recognizing the answer!' }
    ],
    zero_jargon_explanation: 'Use "¿Dónde está...?" + any place or item to ask where something is located.',
    micro_drills: [
      {
        id: 'u07_d1',
        type: 'tap_to_translate',
        prompt: 'Translate: "Where is the bathroom?"',
        options: ['¿Dónde está el baño?', '¿Cuánto cuesta el baño?', 'Quiero un baño por favor', 'Gracias el baño'],
        correct_answer: '¿Dónde está el baño?',
        explanation: '¿Dónde está (Where is) + el baño (the bathroom).'
      },
      {
        id: 'u07_d2',
        type: 'sentence_builder',
        prompt: 'Assemble: "Excuse me, where is the hotel?"',
        options: ['Disculpe,', '¿dónde', 'está', 'el', 'hotel?'],
        correct_answer: 'Disculpe, ¿dónde está el hotel?',
        explanation: 'Disculpe + ¿dónde está + el hotel?'
      },
      {
        id: 'u07_d3',
        type: 'word_swap',
        prompt: 'Ask where the café is: "¿Dónde está _____ ?"',
        options: ['el café', 'gracias', 'por favor', 'tres'],
        correct_answer: 'el café',
        explanation: '¿Dónde está + el café?'
      },
      {
        id: 'u07_d4',
        type: 'audio_match',
        prompt: 'Listen to the audio response:',
        audio_text: 'Está allá',
        options: ['It is over there', 'It is here', 'Where is it?', 'How much is it?'],
        correct_answer: 'It is over there',
        explanation: 'Está allá = It is over there.'
      },
      {
        id: 'u07_d5',
        type: 'visual_match',
        prompt: 'Match "🪠 El baño"',
        options: ['The bathroom', 'The bedroom', 'The hotel', 'The store'],
        correct_answer: 'The bathroom',
        explanation: 'El baño = The bathroom.'
      },
      {
        id: 'u07_d6',
        type: 'rapid_choice',
        prompt: 'How do you point and say "It is here"?',
        options: ['Está aquí', 'Está allá', 'Dónde está', 'Cuánto cuesta'],
        correct_answer: 'Está aquí',
        explanation: 'Está aquí = It is here.'
      }
    ]
  },
  {
    unit_id: 'unit_0_8',
    title: 'Unit 0.8: Food & Taco Stand Essentials',
    category: 'Food & Dining',
    emoji: '🌮',
    anchor_words: [
      { word: 'Taco', translation: 'Taco', ipa: '/ˈtako/', phonetic_guide: 'TAH-koh', audio_cue: 'Taco', emoji: '🌮' },
      { word: 'Salsa', translation: 'Sauce / Salsa', ipa: '/ˈsalsa/', phonetic_guide: 'SAHL-sah', audio_cue: 'Salsa', emoji: '🌶️' },
      { word: 'Picante', translation: 'Spicy / Hot', ipa: '/piˈkante/', phonetic_guide: 'pee-KAHN-teh', audio_cue: 'Picante', emoji: '🔥' },
      { word: 'Sin picante', translation: 'Not spicy / No chili', ipa: '/sin piˈkante/', phonetic_guide: 'seen pee-KAHN-teh', audio_cue: 'Sin picante', emoji: '🥦' },
      { word: 'La cuenta', translation: 'The bill / check', ipa: '/la ˈkwenta/', phonetic_guide: 'lah KWEHN-tah', audio_cue: 'La cuenta', emoji: '🧾' }
    ],
    chunk_building_ladder: [
      { step: 1, text_es: 'Tres tacos', text_en: 'Three tacos', audio_text: 'Tres tacos', explanation: 'Step 1: Item & quantity.' },
      { step: 2, text_es: 'Tres tacos sin picante', text_en: 'Three tacos, not spicy', audio_text: 'Tres tacos sin picante', explanation: 'Step 2: Adding preference.' },
      { step: 3, text_es: 'Quiero tres tacos sin picante, por favor', text_en: 'I want three tacos, not spicy, please', audio_text: 'Quiero tres tacos sin picante, por favor', explanation: 'Step 3: Complete taquería order.' },
      { step: 4, text_es: 'La cuenta, por favor', text_en: 'The check, please', audio_text: 'La cuenta, por favor', explanation: 'Step 4: Finishing your meal!' }
    ],
    zero_jargon_explanation: 'In Mexico, always specify "sin picante" if you cannot eat spicy food, or "con salsa" if you want sauce.',
    micro_drills: [
      {
        id: 'u08_d1',
        type: 'tap_to_translate',
        prompt: 'Translate: "The check, please"',
        options: ['La cuenta, por favor', 'El baño, por favor', 'Un taco, gracias', 'Agua sin picante'],
        correct_answer: 'La cuenta, por favor',
        explanation: 'La cuenta = The bill / check.'
      },
      {
        id: 'u08_d2',
        type: 'sentence_builder',
        prompt: 'Assemble: "Two tacos without spicy sauce, please"',
        options: ['Dos', 'tacos', 'sin', 'picante,', 'por', 'favor'],
        correct_answer: 'Dos tacos sin picante, por favor',
        explanation: 'Dos tacos + sin picante + por favor.'
      },
      {
        id: 'u08_d3',
        type: 'word_swap',
        prompt: 'Ask if it is spicy: "¿Es _____ ?"',
        options: ['picante', 'café', 'gracias', 'baño'],
        correct_answer: 'picante',
        explanation: '¿Es picante? = Is it spicy?'
      },
      {
        id: 'u08_d4',
        type: 'audio_match',
        prompt: 'Listen to the taco stand audio:',
        audio_text: 'La cuenta, por favor',
        options: ['The bill, please', 'Where is the bathroom?', 'Two tacos, please', 'Thank you very much'],
        correct_answer: 'The bill, please',
        explanation: 'La cuenta = The bill.'
      },
      {
        id: 'u08_d5',
        type: 'visual_match',
        prompt: 'Match "🧾 La cuenta"',
        options: ['The bill', 'The taco', 'The water', 'The money'],
        correct_answer: 'The bill',
        explanation: '🧾 = La cuenta.'
      },
      {
        id: 'u08_d6',
        type: 'rapid_choice',
        prompt: 'What do you say to order 3 tacos with salsa, please?',
        options: ['Tres tacos con salsa, por favor', 'La cuenta sin picante gracias', 'Donde esta taco tres', 'Un café picante por favor'],
        correct_answer: 'Tres tacos con salsa, por favor',
        explanation: 'Tres tacos + con salsa + por favor.'
      }
    ]
  },
  {
    unit_id: 'unit_0_9',
    title: 'Unit 0.9: Greetings & Time of Day',
    category: 'Social Essentials',
    emoji: '☀️',
    anchor_words: [
      { word: 'Buenos días', translation: 'Good morning', ipa: '/ˈbwenos ˈdjas/', phonetic_guide: 'BWAY-nohs DEE-ahs', audio_cue: 'Buenos días', emoji: '🌅' },
      { word: 'Buenas tardes', translation: 'Good afternoon', ipa: '/ˈbwenas ˈtaɾðes/', phonetic_guide: 'BWAY-nahs TAR-dehs', audio_cue: 'Buenas tardes', emoji: '☀️' },
      { word: 'Buenas noches', translation: 'Good evening / Good night', ipa: '/ˈbwenas ˈnotʃes/', phonetic_guide: 'BWAY-nahs NOH-chehs', audio_cue: 'Buenas noches', emoji: '🌙' },
      { word: '¿Cómo estás?', translation: 'How are you? (informal)', ipa: '/ˈkomo esˈtas/', phonetic_guide: 'KOH-moh ehs-TAHS', audio_cue: '¿Cómo estás?', emoji: '❓' },
      { word: 'Bien, gracias', translation: 'Fine / Good, thanks', ipa: '/bjen ˈɡɾasjas/', phonetic_guide: 'BYEHN GRAH-syahs', audio_cue: 'Bien, gracias', emoji: '👍' }
    ],
    chunk_building_ladder: [
      { step: 1, text_es: 'Buenos días', text_en: 'Good morning', audio_text: 'Buenos días', explanation: 'Step 1: Morning greeting.' },
      { step: 2, text_es: 'Hola, buenos días', text_en: 'Hello, good morning', audio_text: 'Hola, buenos días', explanation: 'Step 2: Combining greetings.' },
      { step: 3, text_es: 'Hola, ¿cómo estás?', text_en: 'Hi, how are you?', audio_text: 'Hola, ¿cómo estás?', explanation: 'Step 3: Friendly check-in.' },
      { step: 4, text_es: 'Muy bien, gracias, ¿y tú?', text_en: 'Very good, thanks, and you?', audio_text: 'Muy bien, gracias, ¿y tú?', explanation: 'Step 4: Full greeting exchange!' }
    ],
    zero_jargon_explanation: 'Notice that "días" is masculine (buenos), while "tardes" and "noches" are feminine (buenas).',
    micro_drills: [
      {
        id: 'u09_d1',
        type: 'tap_to_translate',
        prompt: 'Translate: "Good morning"',
        options: ['Buenos días', 'Buenas tardes', 'Buenas noches', 'Hola gracias'],
        correct_answer: 'Buenos días',
        explanation: 'Buenos días = Good morning.'
      },
      {
        id: 'u09_d2',
        type: 'sentence_builder',
        prompt: 'Assemble: "Very well, thanks, and you?"',
        options: ['Muy', 'bien,', 'gracias,', '¿y', 'tú?'],
        correct_answer: 'Muy bien, gracias, ¿y tú?',
        explanation: 'Muy bien + gracias + ¿y tú?'
      },
      {
        id: 'u09_d3',
        type: 'word_swap',
        prompt: 'Greeting someone in the evening: "Buenas _____ "',
        options: ['noches', 'días', 'tacos', 'gracias'],
        correct_answer: 'noches',
        explanation: 'Buenas noches = Good evening / night.'
      },
      {
        id: 'u09_d4',
        type: 'audio_match',
        prompt: 'Listen to the audio clip:',
        audio_text: '¿Cómo estás?',
        options: ['How are you?', 'Where are you?', 'Who are you?', 'What is your name?'],
        correct_answer: 'How are you?',
        explanation: '¿Cómo estás? = How are you?'
      },
      {
        id: 'u09_d5',
        type: 'visual_match',
        prompt: 'Match "🌅 Buenos días"',
        options: ['Good morning', 'Good night', 'Good afternoon', 'Goodbye'],
        correct_answer: 'Good morning',
        explanation: '🌅 = Morning.'
      },
      {
        id: 'u09_d6',
        type: 'rapid_choice',
        prompt: 'What is the natural response to "Hola, ¿cómo estás?"',
        options: ['Bien, gracias, ¿y tú?', 'Un café por favor', 'La cuenta gracias', 'Dónde está el baño'],
        correct_answer: 'Bien, gracias, ¿y tú?',
        explanation: 'Bien, gracias, ¿y tú? is the polite standard response.'
      }
    ]
  },
  {
    unit_id: 'unit_0_10',
    title: 'Unit 0.10: Saying Goodbye & See You Soon',
    category: 'Social Essentials',
    emoji: '👋',
    anchor_words: [
      { word: 'Adiós', translation: 'Goodbye', ipa: '/aˈdjos/', phonetic_guide: 'ah-DYOHS', audio_cue: 'Adiós', emoji: '👋' },
      { word: 'Hasta luego', translation: 'See you later', ipa: '/ˈasta ˈlweɣo/', phonetic_guide: 'AHS-tah LWAY-goh', audio_cue: 'Hasta luego', emoji: '⏳' },
      { word: 'Hasta mañana', translation: 'See you tomorrow', ipa: '/ˈasta maˈɲana/', phonetic_guide: 'AHS-tah mah-NYAH-nah', audio_cue: 'Hasta mañana', emoji: '📅' },
      { word: 'Nos vemos', translation: 'See you (we see each other)', ipa: '/nos ˈbemos/', phonetic_guide: 'nohs VEH-mohs', audio_cue: 'Nos vemos', emoji: '👀' },
      { word: 'Chao', translation: 'Bye (casual)', ipa: '/tʃao/', phonetic_guide: 'CHOW', audio_cue: 'Chao', emoji: '✌️' }
    ],
    chunk_building_ladder: [
      { step: 1, text_es: 'Hasta luego', text_en: 'See you later', audio_text: 'Hasta luego', explanation: 'Step 1: Standard farewell.' },
      { step: 2, text_es: 'Gracias, hasta luego', text_en: 'Thanks, see you later', audio_text: 'Gracias, hasta luego', explanation: 'Step 2: Polite exit.' },
      { step: 3, text_es: 'Muchas gracias, nos vemos', text_en: 'Thank you very much, see you', audio_text: 'Muchas gracias, nos vemos', explanation: 'Step 3: Friendly wrap-up.' },
      { step: 4, text_es: 'Hasta mañana, que tengas buen día', text_en: 'See you tomorrow, have a good day', audio_text: 'Hasta mañana, que tengas buen día', explanation: 'Step 4: Warm, complete goodbye!' }
    ],
    zero_jargon_explanation: '"Hasta" literally means "until". So "Hasta luego" is "until later" and "Hasta mañana" is "until tomorrow".',
    micro_drills: [
      {
        id: 'u10_d1',
        type: 'tap_to_translate',
        prompt: 'Translate: "See you later"',
        options: ['Hasta luego', 'Hasta mañana', 'Buenos días', 'De nada'],
        correct_answer: 'Hasta luego',
        explanation: 'Hasta luego = See you later.'
      },
      {
        id: 'u10_d2',
        type: 'sentence_builder',
        prompt: 'Assemble: "Thank you very much, see you!"',
        options: ['Muchas', 'gracias,', 'nos', 'vemos'],
        correct_answer: 'Muchas gracias, nos vemos',
        explanation: 'Muchas gracias + nos vemos.'
      },
      {
        id: 'u10_d3',
        type: 'word_swap',
        prompt: 'Say "See you tomorrow": "Hasta _____ "',
        options: ['mañana', 'luego', 'gracias', 'café'],
        correct_answer: 'mañana',
        explanation: 'Mañana = tomorrow.'
      },
      {
        id: 'u10_d4',
        type: 'audio_match',
        prompt: 'Listen to the audio clip:',
        audio_text: 'Nos vemos',
        options: ['See you', 'Good morning', 'How are you?', 'Please'],
        correct_answer: 'See you',
        explanation: 'Nos vemos = See you / We see each other.'
      },
      {
        id: 'u10_d5',
        type: 'visual_match',
        prompt: 'Match "⏳ Hasta luego"',
        options: ['See you later', 'See you tomorrow', 'Hello', 'Thank you'],
        correct_answer: 'See you later',
        explanation: 'Hasta luego = See you later.'
      },
      {
        id: 'u10_d6',
        type: 'rapid_choice',
        prompt: 'When leaving a store after paying, what is the best natural thing to say?',
        options: ['Gracias, hasta luego', 'Dónde está el baño', 'Quiero un café', 'No comprendo'],
        correct_answer: 'Gracias, hasta luego',
        explanation: 'Gracias, hasta luego is standard polite store etiquette.'
      }
    ]
  },
  {
    unit_id: 'unit_0_11',
    title: 'Unit 0.11: Likes & Dislikes (Me gusta)',
    category: 'Preferences',
    emoji: '❤️',
    anchor_words: [
      { word: 'Me gusta', translation: 'I like (it pleases me)', ipa: '/me ˈɡusta/', phonetic_guide: 'meh GOOS-tah', audio_cue: 'Me gusta', emoji: '👍' },
      { word: 'No me gusta', translation: 'I do not like', ipa: '/no me ˈɡusta/', phonetic_guide: 'noh meh GOOS-tah', audio_cue: 'No me gusta', emoji: '👎' },
      { word: 'Mucho', translation: 'A lot / Very much', ipa: '/ˈmutʃo/', phonetic_guide: 'MOO-choh', audio_cue: 'Mucho', emoji: '💯' },
      { word: 'El café', translation: 'The coffee', ipa: '/el kaˈfe/', phonetic_guide: 'ehl kah-FEH', audio_cue: 'El café', emoji: '☕' },
      { word: 'El taco', translation: 'The taco', ipa: '/el ˈtako/', phonetic_guide: 'ehl TAH-koh', audio_cue: 'El taco', emoji: '🌮' }
    ],
    chunk_building_ladder: [
      { step: 1, text_es: 'Me gusta', text_en: 'I like it', audio_text: 'Me gusta', explanation: 'Step 1: Basic preference.' },
      { step: 2, text_es: 'Me gusta el café', text_en: 'I like coffee', audio_text: 'Me gusta el café', explanation: 'Step 2: Liking an item.' },
      { step: 3, text_es: 'Me gusta mucho el café', text_en: 'I like coffee a lot', audio_text: 'Me gusta mucho el café', explanation: 'Step 3: Expressing strong liking.' },
      { step: 4, text_es: 'No me gusta el café sin azúcar', text_en: 'I do not like coffee without sugar', audio_text: 'No me gusta el café sin azúcar', explanation: 'Step 4: Expressing specific dislike!' }
    ],
    zero_jargon_explanation: 'In Spanish, "Me gusta" literally means "It pleases me". Just put "No" in front to say you don\'t like something.',
    micro_drills: [
      {
        id: 'u11_d1',
        type: 'tap_to_translate',
        prompt: 'Translate: "I like coffee a lot"',
        options: ['Me gusta mucho el café', 'No me gusta el café', 'Quiero un café por favor', 'Dónde está el café'],
        correct_answer: 'Me gusta mucho el café',
        explanation: 'Me gusta + mucho + el café.'
      },
      {
        id: 'u11_d2',
        type: 'sentence_builder',
        prompt: 'Assemble: "I do not like spicy food (el picante)"',
        options: ['No', 'me', 'gusta', 'el', 'picante'],
        correct_answer: 'No me gusta el picante',
        explanation: 'No + me gusta + el picante.'
      },
      {
        id: 'u11_d3',
        type: 'word_swap',
        prompt: 'Say you like tacos: "Me gusta _____ "',
        options: ['el taco', 'gracias', 'hasta luego', 'donde'],
        correct_answer: 'el taco',
        explanation: 'Me gusta + el taco.'
      },
      {
        id: 'u11_d4',
        type: 'audio_match',
        prompt: 'Listen to the audio:',
        audio_text: 'No me gusta',
        options: ['I do not like', 'I like', 'I want', 'I need'],
        correct_answer: 'I do not like',
        explanation: 'No me gusta = I don\'t like.'
      },
      {
        id: 'u11_d5',
        type: 'visual_match',
        prompt: 'Match "👍 Me gusta"',
        options: ['I like it', 'I dislike it', 'I need it', 'I have it'],
        correct_answer: 'I like it',
        explanation: '👍 = Me gusta.'
      },
      {
        id: 'u11_d6',
        type: 'rapid_choice',
        prompt: 'How do you say "I really like tea"?',
        options: ['Me gusta mucho el té', 'No me gusta nada el té', 'Tengo un té por favor', 'Cuánto cuesta el té'],
        correct_answer: 'Me gusta mucho el té',
        explanation: 'Me gusta mucho = I like a lot.'
      }
    ]
  },
  {
    unit_id: 'unit_0_12',
    title: "Unit 0.12: Getting Someone's Attention",
    category: 'Social Etiquette',
    emoji: '🙋‍♂️',
    anchor_words: [
      { word: 'Disculpe', translation: 'Excuse me (formal/polite)', ipa: '/disˈkulpe/', phonetic_guide: 'dees-KOOL-peh', audio_cue: 'Disculpe', emoji: '🙇‍♂️' },
      { word: 'Oiga', translation: 'Excuse me / Hey (listen)', ipa: '/ˈojɣa/', phonetic_guide: 'OY-gah', audio_cue: 'Oiga', emoji: '👂' },
      { word: 'Una pregunta', translation: 'A question', ipa: '/ˈuna pɾeˈɣunta/', phonetic_guide: 'OO-nah preh-GOON-tah', audio_cue: 'Una pregunta', emoji: '❓' },
      { word: 'Por favor', translation: 'Please', ipa: '/poɾ faˈβoɾ/', phonetic_guide: 'por fah-VOR', audio_cue: 'Por favor', emoji: '🙏' },
      { word: 'Joven', translation: 'Young man / Waiter / Miss', ipa: '/ˈxoβen/', phonetic_guide: 'HOH-behn', audio_cue: 'Joven', emoji: '🧍‍♂️' }
    ],
    chunk_building_ladder: [
      { step: 1, text_es: 'Disculpe', text_en: 'Excuse me', audio_text: 'Disculpe', explanation: 'Step 1: Polite call.' },
      { step: 2, text_es: 'Disculpe, señor', text_en: 'Excuse me, sir', audio_text: 'Disculpe, señor', explanation: 'Step 2: Addressing someone.' },
      { step: 3, text_es: 'Disculpe, tengo una pregunta', text_en: 'Excuse me, I have a question', audio_text: 'Disculpe, tengo una pregunta', explanation: 'Step 3: Stating intent.' },
      { step: 4, text_es: 'Disculpe, ¿dónde está el baño, por favor?', text_en: 'Excuse me, where is the bathroom, please?', audio_text: 'Disculpe, ¿dónde está el baño, por favor?', explanation: 'Step 4: Seamless polite query!' }
    ],
    zero_jargon_explanation: 'In Mexico, calling a waiter "Joven" (young man/person) or "Disculpe" is universally friendly and polite.',
    micro_drills: [
      {
        id: 'u12_d1',
        type: 'tap_to_translate',
        prompt: 'Translate: "Excuse me, I have a question"',
        options: ['Disculpe, tengo una pregunta', 'Gracias, tengo un café', 'Hola, quiero agua', 'Hasta luego señor'],
        correct_answer: 'Disculpe, tengo una pregunta',
        explanation: 'Disculpe + tengo (I have) + una pregunta (a question).'
      },
      {
        id: 'u12_d2',
        type: 'sentence_builder',
        prompt: 'Assemble: "Disculpe, ¿cuánto cuesta?"',
        options: ['Disculpe,', '¿cuánto', 'cuesta?'],
        correct_answer: 'Disculpe, ¿cuánto cuesta?',
        explanation: 'Disculpe + ¿cuánto cuesta?'
      },
      {
        id: 'u12_d3',
        type: 'word_swap',
        prompt: 'Politely call a server in Mexico: "_____ , por favor!"',
        options: ['Joven', 'Adiós', 'Hambre', 'Sed'],
        correct_answer: 'Joven',
        explanation: '"Joven" is widely used in Mexican restaurants.'
      },
      {
        id: 'u12_d4',
        type: 'audio_match',
        prompt: 'Listen to the audio clip:',
        audio_text: 'Una pregunta',
        options: ['A question', 'A bathroom', 'A coffee', 'A taco'],
        correct_answer: 'A question',
        explanation: 'Una pregunta = A question.'
      },
      {
        id: 'u12_d5',
        type: 'visual_match',
        prompt: 'Match "❓ Una pregunta"',
        options: ['A question', 'An answer', 'A problem', 'A bill'],
        correct_answer: 'A question',
        explanation: '❓ = Question.'
      },
      {
        id: 'u12_d6',
        type: 'rapid_choice',
        prompt: 'How do you ask someone politely if you can ask a question?',
        options: ['Disculpe, ¿puedo hacer una pregunta?', 'Hola dame la cuenta', 'Donde esta agua picante', 'No me gusta nada'],
        correct_answer: 'Disculpe, ¿puedo hacer una pregunta?',
        explanation: 'Disculpe + question request is natural.'
      }
    ]
  },
  {
    unit_id: 'unit_0_13',
    title: 'Unit 0.13: Paying the Bill (La cuenta)',
    category: 'Money & Dining',
    emoji: '💳',
    anchor_words: [
      { word: 'La cuenta', translation: 'The bill / check', ipa: '/la ˈkwenta/', phonetic_guide: 'lah KWEHN-tah', audio_cue: 'La cuenta', emoji: '🧾' },
      { word: 'Efectivo', translation: 'Cash', ipa: '/efekˈtiβo/', phonetic_guide: 'eh-fehk-TEE-boh', audio_cue: 'Efectivo', emoji: '💵' },
      { word: 'Tarjeta', translation: 'Card (credit/debit)', ipa: '/taɾˈxeta/', phonetic_guide: 'tar-HEH-tah', audio_cue: 'Tarjeta', emoji: '💳' },
      { word: 'Propina', translation: 'Tip / Gratuity', ipa: '/pɾoˈpina/', phonetic_guide: 'proh-PEE-nah', audio_cue: 'Propina', emoji: '🪙' },
      { word: '¿Aceptan...?', translation: 'Do you accept...?', ipa: '/aˈtseptan/', phonetic_guide: 'ah-SEHP-tahn', audio_cue: '¿Aceptan?', emoji: '🏦' }
    ],
    chunk_building_ladder: [
      { step: 1, text_es: 'La cuenta', text_en: 'The bill', audio_text: 'La cuenta', explanation: 'Step 1: Check request.' },
      { step: 2, text_es: 'Con tarjeta', text_en: 'With card', audio_text: 'Con tarjeta', explanation: 'Step 2: Payment method.' },
      { step: 3, text_es: '¿Aceptan tarjeta?', text_en: 'Do you accept card?', audio_text: '¿Aceptan tarjeta?', explanation: 'Step 3: Checking card acceptance.' },
      { step: 4, text_es: 'La cuenta, por favor, ¿aceptan tarjeta?', text_en: 'The bill please, do you take card?', audio_text: 'La cuenta, por favor, ¿aceptan tarjeta?', explanation: 'Step 4: Smooth restaurant departure!' }
    ],
    zero_jargon_explanation: 'In Mexico, tip is usually 10-15% (la propina). Asking "¿Aceptan tarjeta?" saves you if a small stall only takes cash (efectivo).',
    micro_drills: [
      {
        id: 'u13_d1',
        type: 'tap_to_translate',
        prompt: 'Translate: "Do you accept credit cards?"',
        options: ['¿Aceptan tarjeta?', '¿Tiene efectivo?', 'Dónde está la tarjeta', 'Quiero pagar cuenta'],
        correct_answer: '¿Aceptan tarjeta?',
        explanation: '¿Aceptan (Do you take) + tarjeta (card)?'
      },
      {
        id: 'u13_d2',
        type: 'sentence_builder',
        prompt: 'Assemble: "I pay in cash" (Pago en efectivo)',
        options: ['Pago', 'en', 'efectivo'],
        correct_answer: 'Pago en efectivo',
        explanation: 'Pago + en + efectivo.'
      },
      {
        id: 'u13_d3',
        type: 'word_swap',
        prompt: 'Ask if they take cash: "¿Aceptan _____ ?"',
        options: ['efectivo', 'baño', 'café', 'hola'],
        correct_answer: 'efectivo',
        explanation: 'Efectivo = Cash.'
      },
      {
        id: 'u13_d4',
        type: 'audio_match',
        prompt: 'Listen to the payment term:',
        audio_text: 'Propina',
        options: ['Tip / Gratuity', 'Bill', 'Cash', 'Card'],
        correct_answer: 'Tip / Gratuity',
        explanation: 'Propina = Tip.'
      },
      {
        id: 'u13_d5',
        type: 'visual_match',
        prompt: 'Match "💳 Tarjeta"',
        options: ['Card', 'Cash', 'Coins', 'Receipt'],
        correct_answer: 'Card',
        explanation: 'Tarjeta = Card.'
      },
      {
        id: 'u13_d6',
        type: 'rapid_choice',
        prompt: 'How do you ask for the check when paying with cash?',
        options: ['La cuenta por favor, pago en efectivo', 'Donde esta agua picante', 'No me gusta la cuenta', 'Hola buenos dias taco'],
        correct_answer: 'La cuenta por favor, pago en efectivo',
        explanation: 'La cuenta por favor, pago en efectivo.'
      }
    ]
  },
  {
    unit_id: 'unit_0_14',
    title: 'Unit 0.14: Question Words (Qué & Dónde)',
    category: 'Questions',
    emoji: '❓',
    anchor_words: [
      { word: '¿Qué...?', translation: 'What...?', ipa: '/ke/', phonetic_guide: 'KEH', audio_cue: '¿Qué?', emoji: '❓' },
      { word: '¿Dónde...?', translation: 'Where...?', ipa: '/ˈdonde/', phonetic_guide: 'DOHN-deh', audio_cue: '¿Dónde?', emoji: '📍' },
      { word: '¿Es...?', translation: 'Is it...?', ipa: '/es/', phonetic_guide: 'EHS', audio_cue: '¿Es?', emoji: '🤔' },
      { word: '¿Esto?', translation: 'This?', ipa: '/ˈesto/', phonetic_guide: 'EHS-toh', audio_cue: '¿Esto?', emoji: '👇' },
      { word: '¿Qué es esto?', translation: 'What is this?', ipa: '/ke es ˈesto/', phonetic_guide: 'KEH ehs EHS-toh', audio_cue: '¿Qué es esto?', emoji: '🔍' }
    ],
    chunk_building_ladder: [
      { step: 1, text_es: '¿Qué es?', text_en: 'What is it?', audio_text: '¿Qué es?', explanation: 'Step 1: Simple curiosity.' },
      { step: 2, text_es: '¿Qué es esto?', text_en: 'What is this?', audio_text: '¿Qué es esto?', explanation: 'Step 2: Pointing at something unknown.' },
      { step: 3, text_es: 'Disculpe, ¿qué es esto?', text_en: 'Excuse me, what is this?', audio_text: 'Disculpe, ¿qué es esto?', explanation: 'Step 3: Polite question.' },
      { step: 4, text_es: 'Disculpe, ¿dónde está esto, por favor?', text_en: 'Excuse me, where is this, please?', audio_text: 'Disculpe, ¿dónde está esto, por favor?', explanation: 'Step 4: Location inquiry using pointing!' }
    ],
    zero_jargon_explanation: 'All Spanish question words have an accent mark on top (Qué, Dónde, Cuándo, Cómo). "Esto" means "this" when pointing at anything.',
    micro_drills: [
      {
        id: 'u14_d1',
        type: 'tap_to_translate',
        prompt: 'Translate: "What is this?"',
        options: ['¿Qué es esto?', '¿Dónde está esto?', '¿Cuánto cuesta esto?', '¿Cómo estás esto?'],
        correct_answer: '¿Qué es esto?',
        explanation: '¿Qué (What) + es (is) + esto (this)?'
      },
      {
        id: 'u14_d2',
        type: 'sentence_builder',
        prompt: 'Assemble: "Excuse me, where is this?"',
        options: ['Disculpe,', '¿dónde', 'está', 'esto?'],
        correct_answer: 'Disculpe, ¿dónde está esto?',
        explanation: 'Disculpe + ¿dónde + está + esto?'
      },
      {
        id: 'u14_d3',
        type: 'word_swap',
        prompt: 'Ask "Where is it?": "_____ está?"',
        options: ['Dónde', 'Qué', 'Gracias', 'Un'],
        correct_answer: 'Dónde',
        explanation: 'Dónde = Where.'
      },
      {
        id: 'u14_d4',
        type: 'audio_match',
        prompt: 'Listen to the question:',
        audio_text: '¿Qué es esto?',
        options: ['What is this?', 'Where is this?', 'How much is this?', 'Who is this?'],
        correct_answer: 'What is this?',
        explanation: '¿Qué es esto? = What is this?'
      },
      {
        id: 'u14_d5',
        type: 'visual_match',
        prompt: 'Match "👇 Esto"',
        options: ['This', 'That', 'Where', 'What'],
        correct_answer: 'This',
        explanation: 'Esto = This.'
      },
      {
        id: 'u14_d6',
        type: 'rapid_choice',
        prompt: 'If you point at an unknown dish at a food market, what do you ask?',
        options: ['Disculpe, ¿qué es esto?', 'Buenas noches adiós', 'Donde esta la tarjeta', 'No me gusta el agua'],
        correct_answer: 'Disculpe, ¿qué es esto?',
        explanation: '¿Qué es esto? is ideal for identifying unknown foods or items.'
      }
    ]
  },
  {
    unit_id: 'unit_0_15',
    title: 'Unit 0.15: Yes, No & Understanding Answers',
    category: 'Communication',
    emoji: '✅',
    anchor_words: [
      { word: 'Sí', translation: 'Yes', ipa: '/si/', phonetic_guide: 'SEE', audio_cue: 'Sí', emoji: '✅' },
      { word: 'No', translation: 'No / Not', ipa: '/no/', phonetic_guide: 'NOH', audio_cue: 'No', emoji: '❌' },
      { word: 'Claro', translation: 'Sure / Of course', ipa: '/ˈklaɾo/', phonetic_guide: 'KLAH-roh', audio_cue: 'Claro', emoji: '👌' },
      { word: 'No entiendo', translation: 'I do not understand', ipa: '/no enˈtjendo/', phonetic_guide: 'noh ehn-TYEHN-doh', audio_cue: 'No entiendo', emoji: '🤷‍♂️' },
      { word: 'Más despacio', translation: 'More slowly', ipa: '/mas desˈpasjo/', phonetic_guide: 'mahs dehs-PAH-syoh', audio_cue: 'Más despacio', emoji: '🐢' }
    ],
    chunk_building_ladder: [
      { step: 1, text_es: 'Sí, claro', text_en: 'Yes, of course', audio_text: 'Sí, claro', explanation: 'Step 1: Enthusiastic yes.' },
      { step: 2, text_es: 'No entiendo', text_en: 'I don\'t understand', audio_text: 'No entiendo', explanation: 'Step 2: Emergency signaling.' },
      { step: 3, text_es: 'Más despacio, por favor', text_en: 'More slowly, please', audio_text: 'Más despacio, por favor', explanation: 'Step 3: Slowing down rapid native speakers!' },
      { step: 4, text_es: 'Lo siento, no entiendo, ¿más despacio, por favor?', text_en: 'I\'m sorry, I don\'t understand, more slowly please?', audio_text: 'Lo siento, no entiendo, ¿más despacio, por favor?', explanation: 'Step 4: Ultimate survival bailout sentence!' }
    ],
    zero_jargon_explanation: 'Never panic if a native speaker talks too fast! Just say "Más despacio, por favor" (more slowly, please).',
    micro_drills: [
      {
        id: 'u15_d1',
        type: 'tap_to_translate',
        prompt: 'Translate: "More slowly, please"',
        options: ['Más despacio, por favor', 'No entiendo, gracias', 'Sí claro, por favor', 'Dónde está el baño'],
        correct_answer: 'Más despacio, por favor',
        explanation: 'Más despacio = More slowly.'
      },
      {
        id: 'u15_d2',
        type: 'sentence_builder',
        prompt: 'Assemble: "I do not understand, sorry"',
        options: ['No', 'entiendo,', 'lo', 'siento'],
        correct_answer: 'No entiendo, lo siento',
        explanation: 'No entiendo + lo siento (sorry).'
      },
      {
        id: 'u15_d3',
        type: 'word_swap',
        prompt: 'Say "Of course!": "_____ , sí!"',
        options: ['Claro', 'No', 'Agua', 'Taco'],
        correct_answer: 'Claro',
        explanation: 'Claro = Sure / Of course.'
      },
      {
        id: 'u15_d4',
        type: 'audio_match',
        prompt: 'Listen to the audio:',
        audio_text: 'No entiendo',
        options: ['I do not understand', 'I don\'t want', 'I don\'t have', 'I am not ready'],
        correct_answer: 'I do not understand',
        explanation: 'No entiendo = I don\'t understand.'
      },
      {
        id: 'u15_d5',
        type: 'visual_match',
        prompt: 'Match "🐢 Más despacio"',
        options: ['More slowly', 'Faster', 'Louder', 'Stop'],
        correct_answer: 'More slowly',
        explanation: '🐢 = Slow.'
      },
      {
        id: 'u15_d6',
        type: 'rapid_choice',
        prompt: 'When someone speaks Spanish too fast for you, what should you say?',
        options: ['Disculpe, más despacio, por favor', 'Quiero la cuenta tres pesos', 'Buenas noches con leche', 'Me gusta mucho el jugo'],
        correct_answer: 'Disculpe, más despacio, por favor',
        explanation: 'Disculpe, más despacio, por favor requests slower speech.'
      }
    ]
  },
  {
    unit_id: 'unit_0_16',
    title: 'Unit 0.16: Expressing Emergency & Help',
    category: 'Safety & Help',
    emoji: '🚨',
    anchor_words: [
      { word: '¡Ayuda!', translation: 'Help!', ipa: '/aˈʝuða/', phonetic_guide: 'ah-YOO-dah', audio_cue: '¡Ayuda!', emoji: '🆘' },
      { word: 'Emergencia', translation: 'Emergency', ipa: '/emeɾˈxensja/', phonetic_guide: 'eh-mehr-HEHN-syah', audio_cue: 'Emergencia', emoji: '🚨' },
      { word: 'El policía', translation: 'The police / officer', ipa: '/el poliˈtsja/', phonetic_guide: 'ehl poh-lee-SEE-ah', audio_cue: 'El policía', emoji: '👮‍♂️' },
      { word: 'El doctor', translation: 'The doctor', ipa: '/el dokˈtoɾ/', phonetic_guide: 'ehl dohk-TOHR', audio_cue: 'El doctor', emoji: '👨‍⚕️' },
      { word: 'Me siento mal', translation: 'I feel sick / unwell', ipa: '/me ˈsjento mal/', phonetic_guide: 'meh SYEHN-toh MAHL', audio_cue: 'Me siento mal', emoji: '🤒' }
    ],
    chunk_building_ladder: [
      { step: 1, text_es: '¡Ayuda!', text_en: 'Help!', audio_text: '¡Ayuda!', explanation: 'Step 1: Emergency call.' },
      { step: 2, text_es: 'Necesito ayuda', text_en: 'I need help', audio_text: 'Necesito ayuda', explanation: 'Step 2: Asking for help.' },
      { step: 3, text_es: 'Me siento mal', text_en: 'I feel unwell', audio_text: 'Me siento mal', explanation: 'Step 3: Medical state.' },
      { step: 4, text_es: 'Por favor, necesito un doctor, me siento mal', text_en: 'Please, I need a doctor, I feel sick', audio_text: 'Por favor, necesito un doctor, me siento mal', explanation: 'Step 4: Medical emergency request!' }
    ],
    zero_jargon_explanation: 'In Mexico, dial 911 for emergencies. Saying "Necesito ayuda" (I need help) is universally understood.',
    micro_drills: [
      {
        id: 'u16_d1',
        type: 'tap_to_translate',
        prompt: 'Translate: "I feel sick / unwell"',
        options: ['Me siento mal', 'Tengo hambre', 'Tengo sed', 'Me gusta mucho'],
        correct_answer: 'Me siento mal',
        explanation: 'Me siento mal = I feel sick/unwell.'
      },
      {
        id: 'u16_d2',
        type: 'sentence_builder',
        prompt: 'Assemble: "Please, I need help!"',
        options: ['Por', 'favor,', '¡necesito', 'ayuda!'],
        correct_answer: 'Por favor, ¡necesito ayuda!',
        explanation: 'Por favor + necesito ayuda.'
      },
      {
        id: 'u16_d3',
        type: 'word_swap',
        prompt: 'Say "I need a doctor": "Necesito un _____ "',
        options: ['doctor', 'café', 'taco', 'gracias'],
        correct_answer: 'doctor',
        explanation: 'Doctor = Doctor.'
      },
      {
        id: 'u16_d4',
        type: 'audio_match',
        prompt: 'Listen to the emergency shout:',
        audio_text: '¡Ayuda!',
        options: ['Help!', 'Goodbye!', 'Hello!', 'Please!'],
        correct_answer: 'Help!',
        explanation: '¡Ayuda! = Help!'
      },
      {
        id: 'u16_d5',
        type: 'visual_match',
        prompt: 'Match "👨‍⚕️ El doctor"',
        options: ['The doctor', 'The police', 'The waiter', 'The driver'],
        correct_answer: 'The doctor',
        explanation: '👨‍⚕️ = Doctor.'
      },
      {
        id: 'u16_d6',
        type: 'rapid_choice',
        prompt: 'What should you say if you feel dizzy or ill at a hotel desk?',
        options: ['Disculpe, me siento mal, necesito ayuda', 'Buenas noches un taco con picante', 'La cuenta por favor tarjeta', 'Donde esta la cerveza tres'],
        correct_answer: 'Disculpe, me siento mal, necesito ayuda',
        explanation: 'Disculpe, me siento mal, necesito ayuda clearly requests assistance.'
      }
    ]
  },
  {
    unit_id: 'unit_0_17',
    title: 'Unit 0.17: Ordering Transport (Uber & Taxi)',
    category: 'Transportation',
    emoji: '🚗',
    anchor_words: [
      { word: 'El taxi', translation: 'The taxi', ipa: '/el ˈtaksi/', phonetic_guide: 'ehl TAHK-see', audio_cue: 'El taxi', emoji: '🚕' },
      { word: 'El Uber', translation: 'The Uber', ipa: '/el ˈuβeɾ/', phonetic_guide: 'ehl OO-behr', audio_cue: 'El Uber', emoji: '🚗' },
      { word: 'Aquí', translation: 'Here', ipa: '/aˈki/', phonetic_guide: 'ah-KEE', audio_cue: 'Aquí', emoji: '📍' },
      { word: 'Al centro', translation: 'To downtown / city center', ipa: '/al ˈsentɾo/', phonetic_guide: 'ahl SEHN-troh', audio_cue: 'Al centro', emoji: '🏙️' },
      { word: 'Al aeropuerto', translation: 'To the airport', ipa: '/al aeɾoˈpweɾto/', phonetic_guide: 'ahl ah-eh-roh-PWEHR-toh', audio_cue: 'Al aeropuerto', emoji: '✈️' }
    ],
    chunk_building_ladder: [
      { step: 1, text_es: 'Al aeropuerto', text_en: 'To the airport', audio_text: 'Al aeropuerto', explanation: 'Step 1: Destination.' },
      { step: 2, text_es: 'Al aeropuerto, por favor', text_en: 'To the airport, please', audio_text: 'Al aeropuerto, por favor', explanation: 'Step 2: Giving destination to driver.' },
      { step: 3, text_es: '¿Vamos al centro?', text_en: 'Are we going downtown?', audio_text: '¿Vamos al centro?', explanation: 'Step 3: Checking route.' },
      { step: 4, text_es: 'Hola, al aeropuerto, por favor, muchas gracias', text_en: 'Hello, to the airport, please, thank you very much', audio_text: 'Hola, al aeropuerto, por favor, muchas gracias', explanation: 'Step 4: Full ride interaction!' }
    ],
    zero_jargon_explanation: 'In Spanish, "Al" is a combination of "A" (to) + "El" (the) = "Al" (To the). So "Al centro" means "To downtown".',
    micro_drills: [
      {
        id: 'u17_d1',
        type: 'tap_to_translate',
        prompt: 'Translate: "To the airport, please"',
        options: ['Al aeropuerto, por favor', 'Al centro, por favor', 'Al hotel, gracias', 'Dónde está el Uber'],
        correct_answer: 'Al aeropuerto, por favor',
        explanation: 'Al aeropuerto = To the airport.'
      },
      {
        id: 'u17_d2',
        type: 'sentence_builder',
        prompt: 'Assemble: "To downtown, please"',
        options: ['Al', 'centro,', 'por', 'favor'],
        correct_answer: 'Al centro, por favor',
        explanation: 'Al + centro + por favor.'
      },
      {
        id: 'u17_d3',
        type: 'word_swap',
        prompt: 'Tell the driver "To the hotel": "_____ hotel, por favor"',
        options: ['Al', 'Un', 'Con', 'Sin'],
        correct_answer: 'Al',
        explanation: 'Al = To the.'
      },
      {
        id: 'u17_d4',
        type: 'audio_match',
        prompt: 'Listen to the destination:',
        audio_text: 'Al aeropuerto',
        options: ['To the airport', 'To the hotel', 'To downtown', 'To the bathroom'],
        correct_answer: 'To the airport',
        explanation: 'Al aeropuerto = To the airport.'
      },
      {
        id: 'u17_d5',
        type: 'visual_match',
        prompt: 'Match "✈️ Al aeropuerto"',
        options: ['To the airport', 'To the train station', 'To the hotel', 'To the store'],
        correct_answer: 'To the airport',
        explanation: '✈️ = Airport.'
      },
      {
        id: 'u17_d6',
        type: 'rapid_choice',
        prompt: 'What do you tell your Uber driver when getting into the car?',
        options: ['Hola, al centro, por favor', 'Me siento mal ayuda', 'Tengo sed tres café', 'La cuenta tarjeta'],
        correct_answer: 'Hola, al centro, por favor',
        explanation: 'Hola, al centro, por favor is courteous and clear.'
      }
    ]
  },
  {
    unit_id: 'unit_0_18',
    title: 'Unit 0.18: Describing Feelings (Tengo & Estoy)',
    category: 'Feelings & States',
    emoji: '😊',
    anchor_words: [
      { word: 'Tengo frío', translation: 'I am cold (I have cold)', ipa: '/ˈteŋɡo ˈfɾjo/', phonetic_guide: 'TEN-goh FREE-oh', audio_cue: 'Tengo frío', emoji: '🥶' },
      { word: 'Tengo calor', translation: 'I am hot (I have heat)', ipa: '/ˈteŋɡo kaˈloɾ/', phonetic_guide: 'TEN-goh kah-LOHR', audio_cue: 'Tengo calor', emoji: '🥵' },
      { word: 'Estoy cansado', translation: 'I am tired (masculine)', ipa: '/esˈtoj kanˈsaðo/', phonetic_guide: 'ehs-TOY kahn-SAH-doh', audio_cue: 'Estoy cansado', emoji: '😴' },
      { word: 'Estoy feliz', translation: 'I am happy', ipa: '/esˈtoj feˈlis/', phonetic_guide: 'ehs-TOY feh-LEES', audio_cue: 'Estoy feliz', emoji: '😀' },
      { word: 'Estoy listo', translation: 'I am ready', ipa: '/esˈtoj ˈlisto/', phonetic_guide: 'ehs-TOY LEES-toh', audio_cue: 'Estoy listo', emoji: '👍' }
    ],
    chunk_building_ladder: [
      { step: 1, text_es: 'Estoy listo', text_en: 'I am ready', audio_text: 'Estoy listo', explanation: 'Step 1: Readiness state.' },
      { step: 2, text_es: 'Estoy muy cansado', text_en: 'I am very tired', audio_text: 'Estoy muy cansado', explanation: 'Step 2: Adding intensity.' },
      { step: 3, text_es: 'Tengo mucho frío', text_en: 'I am very cold', audio_text: 'Tengo mucho frío', explanation: 'Step 3: Body temperature state.' },
      { step: 4, text_es: 'Estoy feliz, muchas gracias', text_en: 'I am happy, thank you very much', audio_text: 'Estoy feliz, muchas gracias', explanation: 'Step 4: Expressing satisfaction!' }
    ],
    zero_jargon_explanation: 'Use "Tengo" for physical feelings (cold, heat, hunger) and "Estoy" for emotional states (happy, tired, ready).',
    micro_drills: [
      {
        id: 'u18_d1',
        type: 'tap_to_translate',
        prompt: 'Translate: "I am ready"',
        options: ['Estoy listo', 'Tengo frío', 'Estoy cansado', 'Me gusta'],
        correct_answer: 'Estoy listo',
        explanation: 'Estoy listo = I am ready.'
      },
      {
        id: 'u18_d2',
        type: 'sentence_builder',
        prompt: 'Assemble: "I am very tired"',
        options: ['Estoy', 'muy', 'cansado'],
        correct_answer: 'Estoy muy cansado',
        explanation: 'Estoy + muy + cansado.'
      },
      {
        id: 'u18_d3',
        type: 'word_swap',
        prompt: 'Say "I am cold": "_____ frío"',
        options: ['Tengo', 'Estoy', 'Como', 'Donde'],
        correct_answer: 'Tengo',
        explanation: 'Tengo + frío (I have cold / I am cold).'
      },
      {
        id: 'u18_d4',
        type: 'audio_match',
        prompt: 'Listen to the feeling:',
        audio_text: 'Estoy feliz',
        options: ['I am happy', 'I am tired', 'I am hot', 'I am cold'],
        correct_answer: 'I am happy',
        explanation: 'Estoy feliz = I am happy.'
      },
      {
        id: 'u18_d5',
        type: 'visual_match',
        prompt: 'Match "🥶 Tengo frío"',
        options: ['I am cold', 'I am hot', 'I am thirsty', 'I am hungry'],
        correct_answer: 'I am cold',
        explanation: '🥶 = Cold.'
      },
      {
        id: 'u18_d6',
        type: 'rapid_choice',
        prompt: 'How do you tell your guide you are ready to go?',
        options: ['Estoy listo, gracias', 'Tengo mucho calor', 'No entiendo el baño', 'La cuenta en efectivo'],
        correct_answer: 'Estoy listo, gracias',
        explanation: 'Estoy listo, gracias = I am ready, thanks.'
      }
    ]
  },
  {
    unit_id: 'unit_0_19',
    title: 'Unit 0.19: Wi-Fi & Phone Essentials',
    category: 'Technology & Connectivity',
    emoji: '📶',
    anchor_words: [
      { word: 'La clave', translation: 'The password / key', ipa: '/la ˈklaβe/', phonetic_guide: 'lah KLAH-beh', audio_cue: 'La clave', emoji: '🔑' },
      { word: 'El Wi-Fi', translation: 'The Wi-Fi', ipa: '/el wai fai/', phonetic_guide: 'ehl WEE-fee / WAI-fai', audio_cue: 'El Wi-Fi', emoji: '📶' },
      { word: '¿Tienen...?', translation: 'Do you (plural) have...?', ipa: '/ˈtjenen/', phonetic_guide: 'TYEH-nehn', audio_cue: '¿Tienen?', emoji: '❓' },
      { word: 'El teléfono', translation: 'The phone', ipa: '/el teˈlefono/', phonetic_guide: 'ehl teh-LEH-foh-noh', audio_cue: 'El teléfono', emoji: '📱' },
      { word: 'El cargador', translation: 'The charger', ipa: '/el kaɾɣaˈðoɾ/', phonetic_guide: 'ehl kar-gah-DOHR', audio_cue: 'El cargador', emoji: '🔌' }
    ],
    chunk_building_ladder: [
      { step: 1, text_es: 'La clave del Wi-Fi', text_en: 'The Wi-Fi password', audio_text: 'La clave del Wi-Fi', explanation: 'Step 1: Key phrase.' },
      { step: 2, text_es: '¿Tienen Wi-Fi?', text_en: 'Do you have Wi-Fi?', audio_text: '¿Tienen Wi-Fi?', explanation: 'Step 2: Checking connectivity.' },
      { step: 3, text_es: '¿Cuál es la clave del Wi-Fi?', text_en: 'What is the Wi-Fi password?', audio_text: '¿Cuál es la clave del Wi-Fi?', explanation: 'Step 3: Standard password query.' },
      { step: 4, text_es: 'Disculpe, ¿cuál es la clave del Wi-Fi, por favor?', text_en: 'Excuse me, what is the Wi-Fi password, please?', audio_text: 'Disculpe, ¿cuál es la clave del Wi-Fi, por favor?', explanation: 'Step 4: Ultimate café connectivity question!' }
    ],
    zero_jargon_explanation: 'In Mexico, password is usually called "La clave" or "La contraseña". "Wi-Fi" is pronounced either "wee-fee" or "wai-fai".',
    micro_drills: [
      {
        id: 'u19_d1',
        type: 'tap_to_translate',
        prompt: 'Translate: "What is the Wi-Fi password?"',
        options: ['¿Cuál es la clave del Wi-Fi?', '¿Dónde está el Wi-Fi?', 'Quiero un Wi-Fi por favor', 'Cuánto cuesta el teléfono'],
        correct_answer: '¿Cuál es la clave del Wi-Fi?',
        explanation: '¿Cuál es la clave del Wi-Fi?'
      },
      {
        id: 'u19_d2',
        type: 'sentence_builder',
        prompt: 'Assemble: "Excuse me, do you have Wi-Fi?"',
        options: ['Disculpe,', '¿tienen', 'Wi-Fi?'],
        correct_answer: 'Disculpe, ¿tienen Wi-Fi?',
        explanation: 'Disculpe + ¿tienen Wi-Fi?'
      },
      {
        id: 'u19_d3',
        type: 'word_swap',
        prompt: 'Ask for a charger: "Necesito un _____ "',
        options: ['cargador', 'café', 'baño', 'taco'],
        correct_answer: 'cargador',
        explanation: 'Cargador = Charger.'
      },
      {
        id: 'u19_d4',
        type: 'audio_match',
        prompt: 'Listen to the phrase:',
        audio_text: 'La clave del Wi-Fi',
        options: ['The Wi-Fi password', 'The hotel key', 'The phone number', 'The check total'],
        correct_answer: 'The Wi-Fi password',
        explanation: 'La clave del Wi-Fi = Wi-Fi password.'
      },
      {
        id: 'u19_d5',
        type: 'visual_match',
        prompt: 'Match "📶 El Wi-Fi"',
        options: ['The Wi-Fi', 'The television', 'The radio', 'The phone'],
        correct_answer: 'The Wi-Fi',
        explanation: '📶 = Wi-Fi.'
      },
      {
        id: 'u19_d6',
        type: 'rapid_choice',
        prompt: 'How do you politely ask for the Wi-Fi code at a coffee shop?',
        options: ['Disculpe, ¿cuál es la clave del Wi-Fi, por favor?', 'Tengo hambre picante tres tacos', 'Donde esta el taxi aeropuerto', 'Buenas noches gracias adiós'],
        correct_answer: 'Disculpe, ¿cuál es la clave del Wi-Fi, por favor?',
        explanation: 'Disculpe, ¿cuál es la clave del Wi-Fi, por favor?'
      }
    ]
  },
  {
    unit_id: 'unit_0_20',
    title: 'Unit 0.20: Shopping & Sizes',
    category: 'Shopping',
    emoji: '🛍️',
    anchor_words: [
      { word: 'Grande', translation: 'Big / Large', ipa: '/ˈɡɾande/', phonetic_guide: 'GRAHN-deh', audio_cue: 'Grande', emoji: '🐘' },
      { word: 'Chico', translation: 'Small (also Pequeño)', ipa: '/ˈtʃiko/', phonetic_guide: 'CHEE-koh', audio_cue: 'Chico', emoji: '🐭' },
      { word: 'Mediano', translation: 'Medium', ipa: '/meˈðjano/', phonetic_guide: 'meh-DYAH-noh', audio_cue: 'Mediano', emoji: '📏' },
      { word: 'Solo', translation: 'Only / Just', ipa: '/ˈsolo/', phonetic_guide: 'SOH-loh', audio_cue: 'Solo', emoji: '☝️' },
      { word: 'Mirando', translation: 'Looking', ipa: '/miˈɾando/', phonetic_guide: 'mee-RAHN-doh', audio_cue: 'Mirando', emoji: '👀' }
    ],
    chunk_building_ladder: [
      { step: 1, text_es: 'Un café grande', text_en: 'A large coffee', audio_text: 'Un café grande', explanation: 'Step 1: Size descriptor.' },
      { step: 2, text_es: 'Solo estoy mirando', text_en: 'I am just looking', audio_text: 'Solo estoy mirando', explanation: 'Step 2: Polite store browser phrase!' },
      { step: 3, text_es: 'Gracias, solo estoy mirando', text_en: 'Thanks, I am just looking', audio_text: 'Gracias, solo estoy mirando', explanation: 'Step 3: Polite response to salespeople.' },
      { step: 4, text_es: 'Un café grande con leche, por favor', text_en: 'A large coffee with milk, please', audio_text: 'Un café grande con leche, por favor', explanation: 'Step 4: Detailed order with size!' }
    ],
    zero_jargon_explanation: 'In Mexico, sizes for drinks or clothes are usually "chico" (small), "mediano" (medium), and "grande" (large).',
    micro_drills: [
      {
        id: 'u20_d1',
        type: 'tap_to_translate',
        prompt: 'Translate: "Thanks, I am just looking"',
        options: ['Gracias, solo estoy mirando', 'Gracias, quiero un café grande', 'Dónde está la tienda grande', 'Cuánto cuesta chico'],
        correct_answer: 'Gracias, solo estoy mirando',
        explanation: 'Solo estoy mirando = Just browsing/looking.'
      },
      {
        id: 'u20_d2',
        type: 'sentence_builder',
        prompt: 'Assemble: "A large coffee, please"',
        options: ['Un', 'café', 'grande,', 'por', 'favor'],
        correct_answer: 'Un café grande, por favor',
        explanation: 'Un café + grande + por favor.'
      },
      {
        id: 'u20_d3',
        type: 'word_swap',
        prompt: 'Order a small size instead: "Un café _____ , por favor"',
        options: ['chico', 'grande', 'mucho', 'gracias'],
        correct_answer: 'chico',
        explanation: 'Chico = Small.'
      },
      {
        id: 'u20_d4',
        type: 'audio_match',
        prompt: 'Listen to the retail response:',
        audio_text: 'Solo estoy mirando',
        options: ['I am just looking', 'I want to buy this', 'How much is this?', 'I need help'],
        correct_answer: 'I am just looking',
        explanation: 'Solo estoy mirando = Just looking.'
      },
      {
        id: 'u20_d5',
        type: 'visual_match',
        prompt: 'Match "🐘 Grande"',
        options: ['Large / Big', 'Small', 'Medium', 'Tiny'],
        correct_answer: 'Large / Big',
        explanation: 'Grande = Large.'
      },
      {
        id: 'u20_d6',
        type: 'rapid_choice',
        prompt: 'When a store clerk approaches you in Mexico, how do you say "Just looking, thanks"?',
        options: ['Gracias, solo estoy mirando', 'Necesito un doctor ayuda', 'Al aeropuerto por favor', 'Dónde está el baño chico'],
        correct_answer: 'Gracias, solo estoy mirando',
        explanation: 'Gracias, solo estoy mirando is universally used in retail.'
      }
    ]
  },
  {
    unit_id: 'unit_0_21',
    title: 'Unit 0.21: Restroom & Amenities',
    category: 'Amenities',
    emoji: '🚻',
    anchor_words: [
      { word: 'El baño', translation: 'The restroom / bathroom', ipa: '/el ˈbaɲo/', phonetic_guide: 'ehl BAH-nyoh', audio_cue: 'El baño', emoji: '🪠' },
      { word: 'Papel', translation: 'Toilet paper / Paper', ipa: '/paˈpel/', phonetic_guide: 'pah-PEHL', audio_cue: 'Papel', emoji: '🧻' },
      { word: 'Jabón', translation: 'Soap', ipa: '/xaˈβon/', phonetic_guide: 'hah-BOHN', audio_cue: 'Jabón', emoji: '🧼' },
      { word: 'Toalla', translation: 'Towel', ipa: '/toˈaʎa/', phonetic_guide: 'toh-AH-yah', audio_cue: 'Toalla', emoji: '🧴' },
      { word: 'Ocupado', translation: 'Occupied / Busy', ipa: '/okuˈpaðo/', phonetic_guide: 'oh-koo-PAH-doh', audio_cue: 'Ocupado', emoji: '🔴' }
    ],
    chunk_building_ladder: [
      { step: 1, text_es: 'No hay papel', text_en: 'There is no paper', audio_text: 'No hay papel', explanation: 'Step 1: Missing item state.' },
      { step: 2, text_es: '¿Dónde está el baño?', text_en: 'Where is the bathroom?', audio_text: '¿Dónde está el baño?', explanation: 'Step 2: Location query.' },
      { step: 3, text_es: 'El baño está ocupado', text_en: 'The bathroom is occupied', audio_text: 'El baño está ocupado', explanation: 'Step 3: Checking status.' },
      { step: 4, text_es: 'Disculpe, no hay papel en el baño', text_en: 'Excuse me, there is no paper in the bathroom', audio_text: 'Disculpe, no hay papel en el baño', explanation: 'Step 4: Reporting amenity issue!' }
    ],
    zero_jargon_explanation: '"No hay" means "There is no" or "There are no". Use it whenever an item is missing (paper, soap, water).',
    micro_drills: [
      {
        id: 'u21_d1',
        type: 'tap_to_translate',
        prompt: 'Translate: "There is no toilet paper"',
        options: ['No hay papel', 'Dónde está el papel', 'Quiero papel por favor', 'Gracias por el papel'],
        correct_answer: 'No hay papel',
        explanation: 'No hay = There is no.'
      },
      {
        id: 'u21_d2',
        type: 'sentence_builder',
        prompt: 'Assemble: "The bathroom is occupied"',
        options: ['El', 'baño', 'está', 'ocupado'],
        correct_answer: 'El baño está ocupado',
        explanation: 'El baño + está + ocupado.'
      },
      {
        id: 'u21_d3',
        type: 'word_swap',
        prompt: 'Say "There is no soap": "No hay _____ "',
        options: ['jabón', 'baño', 'café', 'gracias'],
        correct_answer: 'jabón',
        explanation: 'Jabón = Soap.'
      },
      {
        id: 'u21_d4',
        type: 'audio_match',
        prompt: 'Listen to the status:',
        audio_text: 'Ocupado',
        options: ['Occupied / Busy', 'Free / Available', 'Clean', 'Closed'],
        correct_answer: 'Occupied / Busy',
        explanation: 'Ocupado = Occupied.'
      },
      {
        id: 'u21_d5',
        type: 'visual_match',
        prompt: 'Match "🧻 Papel"',
        options: ['Paper / Toilet paper', 'Soap', 'Towel', 'Water'],
        correct_answer: 'Paper / Toilet paper',
        explanation: '🧻 = Papel.'
      },
      {
        id: 'u21_d6',
        type: 'rapid_choice',
        prompt: 'How do you inform hotel staff that there is no soap in your room?',
        options: ['Disculpe, no hay jabón', 'Tengo hambre tres tacos', 'Al centro por favor taxi', 'Buenas tardes me gusta'],
        correct_answer: 'Disculpe, no hay jabón',
        explanation: 'Disculpe, no hay jabón clearly explains the issue.'
      }
    ]
  },
  {
    unit_id: 'unit_0_22',
    title: 'Unit 0.22: Time & Schedule (Ahora & Más tarde)',
    category: 'Time & Scheduling',
    emoji: '⏰',
    anchor_words: [
      { word: 'Ahora', translation: 'Now', ipa: '/aˈoɾa/', phonetic_guide: 'ah-OH-rah', audio_cue: 'Ahora', emoji: '⚡' },
      { word: 'Más tarde', translation: 'Later', ipa: '/mas ˈtaɾðe/', phonetic_guide: 'mahs TAR-deh', audio_cue: 'Más tarde', emoji: '⏳' },
      { word: 'Hoy', translation: 'Today', ipa: '/oj/', phonetic_guide: 'OY', audio_cue: 'Hoy', emoji: '📅' },
      { word: 'Mañana', translation: 'Tomorrow', ipa: '/maˈɲana/', phonetic_guide: 'mah-NYAH-nah', audio_cue: 'Mañana', emoji: '🌅' },
      { word: '¿A qué hora?', translation: 'At what time?', ipa: '/a ke ˈoɾa/', phonetic_guide: 'ah KEH OH-rah', audio_cue: '¿A qué hora?', emoji: '⌚' }
    ],
    chunk_building_ladder: [
      { step: 1, text_es: 'Ahora mismo', text_en: 'Right now', audio_text: 'Ahora mismo', explanation: 'Step 1: Immediate time.' },
      { step: 2, text_es: '¿A qué hora?', text_en: 'At what time?', audio_text: '¿A qué hora?', explanation: 'Step 2: Asking schedule.' },
      { step: 3, text_es: 'Más tarde, gracias', text_en: 'Later, thank you', audio_text: 'Más tarde, gracias', explanation: 'Step 3: Deferring an action.' },
      { step: 4, text_es: '¿A qué hora es hoy, por favor?', text_en: 'At what time is it today, please?', audio_text: '¿A qué hora es hoy, por favor?', explanation: 'Step 4: Full schedule query!' }
    ],
    zero_jargon_explanation: '"Ahora" means now, while "Ahorita" in Mexican Spanish can mean right now, in 5 minutes, or eventually!',
    micro_drills: [
      {
        id: 'u22_d1',
        type: 'tap_to_translate',
        prompt: 'Translate: "At what time?"',
        options: ['¿A qué hora?', '¿Dónde está?', '¿Cuánto cuesta?', '¿Qué es esto?'],
        correct_answer: '¿A qué hora?',
        explanation: '¿A qué hora? = At what time?'
      },
      {
        id: 'u22_d2',
        type: 'sentence_builder',
        prompt: 'Assemble: "Later, please"',
        options: ['Más', 'tarde,', 'por', 'favor'],
        correct_answer: 'Más tarde, por favor',
        explanation: 'Más tarde + por favor.'
      },
      {
        id: 'u22_d3',
        type: 'word_swap',
        prompt: 'Say "Right now": "_____ mismo"',
        options: ['Ahora', 'Hoy', 'Mañana', 'Luego'],
        correct_answer: 'Ahora',
        explanation: 'Ahora mismo = Right now.'
      },
      {
        id: 'u22_d4',
        type: 'audio_match',
        prompt: 'Listen to the time word:',
        audio_text: 'Mañana',
        options: ['Tomorrow', 'Today', 'Now', 'Yesterday'],
        correct_answer: 'Tomorrow',
        explanation: 'Mañana = Tomorrow.'
      },
      {
        id: 'u22_d5',
        type: 'visual_match',
        prompt: 'Match "⚡ Ahora"',
        options: ['Now', 'Later', 'Tomorrow', 'Yesterday'],
        correct_answer: 'Now',
        explanation: '⚡ = Now.'
      },
      {
        id: 'u22_d6',
        type: 'rapid_choice',
        prompt: 'How do you ask what time your tour starts?',
        options: ['Disculpe, ¿a qué hora es?', 'Dónde está la clave del Wi-Fi', 'No hay papel en el baño', 'Quiero un café grande'],
        correct_answer: 'Disculpe, ¿a qué hora es?',
        explanation: 'Disculpe, ¿a qué hora es? asks for the scheduled time.'
      }
    ]
  },
  {
    unit_id: 'unit_0_23',
    title: 'Unit 0.23: People & Family (Amigo & Familia)',
    category: 'People',
    emoji: '👥',
    anchor_words: [
      { word: 'Amigo', translation: 'Friend (male)', ipa: '/aˈmiɣo/', phonetic_guide: 'ah-MEE-goh', audio_cue: 'Amigo', emoji: '🧑‍🤝‍🧑' },
      { word: 'Amiga', translation: 'Friend (female)', ipa: '/aˈmiɣa/', phonetic_guide: 'ah-MEE-gah', audio_cue: 'Amiga', emoji: '👩‍🤝‍👩' },
      { word: 'Familia', translation: 'Family', ipa: '/faˈmilja/', phonetic_guide: 'fah-MEE-lyah', audio_cue: 'Familia', emoji: '👨‍👩‍👧' },
      { word: 'Mi', translation: 'My', ipa: '/mi/', phonetic_guide: 'MEE', audio_cue: 'Mi', emoji: '🙋‍♂️' },
      { word: 'Con mi...', translation: 'With my...', ipa: '/kon mi/', phonetic_guide: 'KOHN MEE', audio_cue: 'Con mi', emoji: '👥' }
    ],
    chunk_building_ladder: [
      { step: 1, text_es: 'Mi amigo', text_en: 'My friend', audio_text: 'Mi amigo', explanation: 'Step 1: Possessive phrase.' },
      { step: 2, text_es: 'Con mi familia', text_en: 'With my family', audio_text: 'Con mi familia', explanation: 'Step 2: Group phrase.' },
      { step: 3, text_es: 'Estoy con mi amigo', text_en: 'I am with my friend', audio_text: 'Estoy con mi amigo', explanation: 'Step 3: Current social company.' },
      { step: 4, text_es: 'Hola, una mesa para dos con mi amigo, por favor', text_en: 'Hello, a table for two with my friend, please', audio_text: 'Hola, una mesa para dos con mi amigo, por favor', explanation: 'Step 4: Restaurant seating request!' }
    ],
    zero_jargon_explanation: 'Use "Mi" for "My" before any singular word (mi amigo, mi familia, mi teléfono).',
    micro_drills: [
      {
        id: 'u23_d1',
        type: 'tap_to_translate',
        prompt: 'Translate: "With my family"',
        options: ['Con mi familia', 'Con mi amigo', 'Sin mi familia', 'Mi familia feliz'],
        correct_answer: 'Con mi familia',
        explanation: 'Con (With) + mi (my) + familia (family).'
      },
      {
        id: 'u23_d2',
        type: 'sentence_builder',
        prompt: 'Assemble: "I am with my friend"',
        options: ['Estoy', 'con', 'mi', 'amigo'],
        correct_answer: 'Estoy con mi amigo',
        explanation: 'Estoy + con + mi + amigo.'
      },
      {
        id: 'u23_d3',
        type: 'word_swap',
        prompt: 'Say "My female friend": "Mi _____ "',
        options: ['amiga', 'amigo', 'familia', 'gracias'],
        correct_answer: 'amiga',
        explanation: 'Amiga = Female friend.'
      },
      {
        id: 'u23_d4',
        type: 'audio_match',
        prompt: 'Listen to the audio clip:',
        audio_text: 'Mi familia',
        options: ['My family', 'My friend', 'My doctor', 'My waiter'],
        correct_answer: 'My family',
        explanation: 'Mi familia = My family.'
      },
      {
        id: 'u23_d5',
        type: 'visual_match',
        prompt: 'Match "👨‍👩‍👧 Familia"',
        options: ['Family', 'Friends', 'Colleagues', 'Neighbors'],
        correct_answer: 'Family',
        explanation: '👨‍👩‍👧 = Family.'
      },
      {
        id: 'u23_d6',
        type: 'rapid_choice',
        prompt: 'How do you tell a host you are traveling with your family?',
        options: ['Estoy aquí con mi familia', 'No me gusta la cuenta', 'Dónde está el cargador', 'Un agua sin picante'],
        correct_answer: 'Estoy aquí con mi familia',
        explanation: 'Estoy aquí con mi familia = I am here with my family.'
      }
    ]
  },
  {
    unit_id: 'unit_0_24',
    title: 'Unit 0.24: Weather & Temperature',
    category: 'Weather',
    emoji: '☀️',
    anchor_words: [
      { word: 'Hace calor', translation: 'It is hot (makes heat)', ipa: '/ˈase kaˈloɾ/', phonetic_guide: 'AH-seh kah-LOHR', audio_cue: 'Hace calor', emoji: '☀️' },
      { word: 'Hace frío', translation: 'It is cold (makes cold)', ipa: '/ˈase ˈfɾjo/', phonetic_guide: 'AH-seh FREE-oh', audio_cue: 'Hace frío', emoji: '❄️' },
      { word: 'El sol', translation: 'The sun', ipa: '/el sol/', phonetic_guide: 'ehl SOHL', audio_cue: 'El sol', emoji: '🌞' },
      { word: 'La lluvia', translation: 'The rain', ipa: '/la ˈʎuβja/', phonetic_guide: 'lah YOO-byah', audio_cue: 'La lluvia', emoji: '🌧️' },
      { word: 'Está bonito', translation: 'It is nice / beautiful (weather)', ipa: '/esˈta boˈnito/', phonetic_guide: 'ehs-TAH boh-NEE-toh', audio_cue: 'Está bonito', emoji: '🌈' }
    ],
    chunk_building_ladder: [
      { step: 1, text_es: 'Hace calor', text_en: 'It is hot', audio_text: 'Hace calor', explanation: 'Step 1: Weather descriptor.' },
      { step: 2, text_es: 'Hoy hace mucho calor', text_en: 'Today it is very hot', audio_text: 'Hoy hace mucho calor', explanation: 'Step 2: Adding time & intensity.' },
      { step: 3, text_es: 'El día está bonito', text_en: 'The day is nice', audio_text: 'El día está bonito', explanation: 'Step 3: Pleasant greeting comment.' },
      { step: 4, text_es: 'Buenos días, hoy hace mucho calor, necesito agua, por favor', text_en: 'Good morning, today it is very hot, I need water, please', audio_text: 'Buenos días, hoy hace mucho calor, necesito agua, por favor', explanation: 'Step 4: Master natural conversation thread!' }
    ],
    zero_jargon_explanation: 'In Spanish, weather "makes" heat or cold! You say "Hace calor" (It makes heat) and "Hace frío" (It makes cold).',
    micro_drills: [
      {
        id: 'u24_d1',
        type: 'tap_to_translate',
        prompt: 'Translate: "Today it is very hot"',
        options: ['Hoy hace mucho calor', 'Hoy hace frío', 'Está lloviendo mucho', 'Dónde está el sol'],
        correct_answer: 'Hoy hace mucho calor',
        explanation: 'Hoy (Today) + hace mucho calor (it is very hot).'
      },
      {
        id: 'u24_d2',
        type: 'sentence_builder',
        prompt: 'Assemble: "Good morning, it is nice today"',
        options: ['Buenos', 'días,', 'hoy', 'está', 'bonito'],
        correct_answer: 'Buenos días, hoy está bonito',
        explanation: 'Buenos días + hoy está bonito.'
      },
      {
        id: 'u24_d3',
        type: 'word_swap',
        prompt: 'Say "It is cold today": "Hoy hace _____ "',
        options: ['frío', 'calor', 'sol', 'lluvia'],
        correct_answer: 'frío',
        explanation: 'Frío = Cold.'
      },
      {
        id: 'u24_d4',
        type: 'audio_match',
        prompt: 'Listen to the weather description:',
        audio_text: 'Hace mucho calor',
        options: ['It is very hot', 'It is very cold', 'It is raining', 'It is dark'],
        correct_answer: 'It is very hot',
        explanation: 'Hace mucho calor = It is very hot.'
      },
      {
        id: 'u24_d5',
        type: 'visual_match',
        prompt: 'Match "☀️ Hace calor"',
        options: ['It is hot', 'It is cold', 'It is raining', 'It is windy'],
        correct_answer: 'It is hot',
        explanation: '☀️ = Heat.'
      },
      {
        id: 'u24_d6',
        type: 'rapid_choice',
        prompt: 'What is a friendly small-talk sentence to start a morning chat with a local?',
        options: ['¡Buenos días! Hoy hace mucho calor', 'No entiendo el teléfono cargador', 'Dónde está el baño ocupado', 'La cuenta en dólares por favor'],
        correct_answer: '¡Buenos días! Hoy hace mucho calor',
        explanation: '¡Buenos días! Hoy hace mucho calor is friendly natural small talk.'
      }
    ]
  },
  {
    unit_id: 'unit_0_25',
    title: 'Unit 0.25: Putting It All Together (First Conversation)',
    category: 'Graduation',
    emoji: '🏆',
    anchor_words: [
      { word: 'Hola', translation: 'Hello', ipa: '/ˈola/', phonetic_guide: 'OH-lah', audio_cue: 'Hola', emoji: '👋' },
      { word: 'Por favor', translation: 'Please', ipa: '/poɾ faˈβoɾ/', phonetic_guide: 'por fah-VOR', audio_cue: 'Por favor', emoji: '🙏' },
      { word: 'Gracias', translation: 'Thank you', ipa: '/ˈɡɾasjas/', phonetic_guide: 'GRAH-syahs', audio_cue: 'Gracias', emoji: '🙌' },
      { word: 'La cuenta', translation: 'The bill', ipa: '/la ˈkwenta/', phonetic_guide: 'lah KWEHN-tah', audio_cue: 'La cuenta', emoji: '🧾' },
      { word: 'Hasta luego', translation: 'See you later', ipa: '/ˈasta ˈlweɣo/', phonetic_guide: 'AHS-tah LWAY-goh', audio_cue: 'Hasta luego', emoji: '👋' }
    ],
    chunk_building_ladder: [
      { step: 1, text_es: 'Hola, buenos días', text_en: 'Hello, good morning', audio_text: 'Hola, buenos días', explanation: 'Step 1: Greeting the waiter.' },
      { step: 2, text_es: 'Quiero dos tacos y un café con leche, por favor', text_en: 'I want two tacos and a coffee with milk, please', audio_text: 'Quiero dos tacos y un café con leche, por favor', explanation: 'Step 2: Placing complete order.' },
      { step: 3, text_es: 'Disculpe, la cuenta, por favor, ¿acepta tarjeta?', text_en: 'Excuse me, the bill please, do you accept card?', audio_text: 'Disculpe, la cuenta, por favor, ¿acepta tarjeta?', explanation: 'Step 3: Paying comfortably.' },
      { step: 4, text_es: 'Muchas gracias, todo muy rico. ¡Hasta luego!', text_en: 'Thank you very much, everything was delicious. See you later!', audio_text: 'Muchas gracias, todo muy rico. ¡Hasta luego!', explanation: 'Step 4: You completed your first 100% real Mexican Spanish conversation!' }
    ],
    zero_jargon_explanation: '🎉 Congratulations! You have mastered 25 foundational units without any dry linguistic jargon. You can now navigate real daily situations in Spanish!',
    micro_drills: [
      {
        id: 'u25_d1',
        type: 'tap_to_translate',
        prompt: 'Translate your complete farewell: "Thank you very much, see you later!"',
        options: ['Muchas gracias, ¡hasta luego!', 'Hola, quiero la cuenta', 'Dónde está el baño', 'No entiendo nada'],
        correct_answer: 'Muchas gracias, ¡hasta luego!',
        explanation: 'Muchas gracias + ¡hasta luego!'
      },
      {
        id: 'u25_d2',
        type: 'sentence_builder',
        prompt: 'Assemble: "I want two tacos and a water, please"',
        options: ['Quiero', 'dos', 'tacos', 'y', 'un', 'agua,', 'por', 'favor'],
        correct_answer: 'Quiero dos tacos y un agua, por favor',
        explanation: 'Quiero dos tacos y un agua, por favor.'
      },
      {
        id: 'u25_d3',
        type: 'word_swap',
        prompt: 'Complete the conversation ender: "Todo muy _____ , gracias!"',
        options: ['rico', 'baño', 'dónde', 'cuánto'],
        correct_answer: 'rico',
        explanation: 'Rico = Delicious.'
      },
      {
        id: 'u25_d4',
        type: 'audio_match',
        prompt: 'Listen to the full interaction:',
        audio_text: 'La cuenta, por favor, ¿acepta tarjeta?',
        options: ['The bill please, do you accept card?', 'Where is the bathroom please?', 'I want coffee with milk', 'Good morning, how are you?'],
        correct_answer: 'The bill please, do you accept card?',
        explanation: 'La cuenta, por favor, ¿acepta tarjeta?'
      },
      {
        id: 'u25_d5',
        type: 'visual_match',
        prompt: 'Match "🏆 Graduation"',
        options: ['A0 Beginner Foundation Mastered', 'A1 Advanced', 'B2 Expert', 'C1 Native'],
        correct_answer: 'A0 Beginner Foundation Mastered',
        explanation: '🏆 Represents mastering the 25 A0 Foundation units!'
      },
      {
        id: 'u25_d6',
        type: 'rapid_choice',
        prompt: 'What is the full flow when entering a cafe, ordering, paying, and leaving?',
        options: [
          '1. Hola, buenos días. 2. Quiero un café, por favor. 3. La cuenta, por favor. 4. ¡Gracias, hasta luego!',
          '1. Adiós. 2. No entiendo. 3. Dónde está el baño. 4. Cuánto cuesta.',
          '1. Tengo hambre. 2. No hay papel. 3. Doctor ayuda. 4. En efectivo.',
          '1. Hace frío. 2. Solo mirando. 3. Taxi centro. 4. Dólares.'
        ],
        correct_answer: '1. Hola, buenos días. 2. Quiero un café, por favor. 3. La cuenta, por favor. 4. ¡Gracias, hasta luego!',
        explanation: 'This is the exact authentic flow of everyday life in Spanish speaking countries.'
      }
    ]
  }
];
