export interface VisualCardOption {
  id: string;
  label_es: string;
  visual_emoji: string;
  visual_bg_gradient: string;
  visual_description: string;
  is_correct: boolean;
}

export interface VisualAssociationItem {
  id: string;
  category: 'Gender Agreement' | 'Singular vs Plural' | 'Spatial Prepositions' | 'Verb Actions' | 'Object States & Adjectives';
  grammar_focus: string;
  prompt_audio_es: string;
  prompt_target_es: string;
  prompt_target_en?: string; // Optional for non-English zero-translation mode
  options: [VisualCardOption, VisualCardOption, VisualCardOption, VisualCardOption];
  explanation_es: string;
}

export const VISUAL_ASSOCIATION_ENGINE: VisualAssociationItem[] = [
  // 1. SINGULAR VS PLURAL - MASCULINE
  {
    id: 'vis_1',
    category: 'Singular vs Plural',
    grammar_focus: 'Masculine Plural Agreement (El vs Los)',
    prompt_audio_es: 'Los hombres caminan',
    prompt_target_es: 'Los hombres caminan',
    prompt_target_en: 'The men walk',
    options: [
      {
        id: 'vis_1_a',
        label_es: 'El hombre camina',
        visual_emoji: '🚶‍♂️',
        visual_bg_gradient: 'from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900',
        visual_description: 'One man walking alone',
        is_correct: false
      },
      {
        id: 'vis_1_b',
        label_es: 'La mujer camina',
        visual_emoji: '🚶‍♀️',
        visual_bg_gradient: 'from-pink-50 to-rose-100 dark:from-slate-800 dark:to-slate-900',
        visual_description: 'One woman walking alone',
        is_correct: false
      },
      {
        id: 'vis_1_c',
        label_es: 'Los hombres caminan',
        visual_emoji: '🚶‍♂️🚶‍♂️🚶‍♂️',
        visual_bg_gradient: 'from-amber-100 to-amber-200 dark:from-amber-950 dark:to-stone-900',
        visual_description: 'Three men walking together',
        is_correct: true
      },
      {
        id: 'vis_1_d',
        label_es: 'Las mujeres caminan',
        visual_emoji: '🚶‍♀️🚶‍♀️🚶‍♀️',
        visual_bg_gradient: 'from-purple-50 to-purple-100 dark:from-slate-800 dark:to-slate-900',
        visual_description: 'Three women walking together',
        is_correct: false
      }
    ],
    explanation_es: 'Plural masculino: "El hombre" se transforma en "Los hombres" y el verbo lleva "n" final ("caminan").'
  },

  // 2. SINGULAR VS PLURAL - FEMININE
  {
    id: 'vis_2',
    category: 'Singular vs Plural',
    grammar_focus: 'Feminine Plural Agreement (La vs Las)',
    prompt_audio_es: 'Las manzanas rojas',
    prompt_target_es: 'Las manzanas rojas',
    prompt_target_en: 'The red apples',
    options: [
      {
        id: 'vis_2_a',
        label_es: 'La manzana roja',
        visual_emoji: '🍎',
        visual_bg_gradient: 'from-rose-50 to-red-100 dark:from-slate-800 dark:to-slate-900',
        visual_description: 'Single red apple',
        is_correct: false
      },
      {
        id: 'vis_2_b',
        label_es: 'Las manzanas rojas',
        visual_emoji: '🍎🍎🍎',
        visual_bg_gradient: 'from-amber-100 to-amber-200 dark:from-amber-950 dark:to-stone-900',
        visual_description: 'Group of three red apples',
        is_correct: true
      },
      {
        id: 'vis_2_c',
        label_es: 'El plátano amarillo',
        visual_emoji: '🍌',
        visual_bg_gradient: 'from-yellow-50 to-amber-100 dark:from-slate-800 dark:to-slate-900',
        visual_description: 'Single yellow banana',
        is_correct: false
      },
      {
        id: 'vis_2_d',
        label_es: 'Las uvas moradas',
        visual_emoji: '🍇🍇',
        visual_bg_gradient: 'from-purple-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900',
        visual_description: 'Grapes bundle',
        is_correct: false
      }
    ],
    explanation_es: 'Plural femenino: "La manzana roja" cambia a "Las manzanas rojas" agregando la "s" a la forma femenina.'
  },

  // 3. GENDER AGREEMENT - ANIMALS
  {
    id: 'vis_3',
    category: 'Gender Agreement',
    grammar_focus: 'Gender Distinction (El gato vs La gata)',
    prompt_audio_es: 'El perro negro',
    prompt_target_es: 'El perro negro',
    prompt_target_en: 'The black dog (masculine)',
    options: [
      {
        id: 'vis_3_a',
        label_es: 'El perro negro',
        visual_emoji: '🐕‍🦺🖤',
        visual_bg_gradient: 'from-amber-100 to-amber-200 dark:from-amber-950 dark:to-stone-900',
        visual_description: 'Black dog with masculine collar tag',
        is_correct: true
      },
      {
        id: 'vis_3_b',
        label_es: 'La perra blanca',
        visual_emoji: '🐕🤍',
        visual_bg_gradient: 'from-stone-50 to-stone-200 dark:from-slate-800 dark:to-slate-900',
        visual_description: 'White dog with feminine collar',
        is_correct: false
      },
      {
        id: 'vis_3_c',
        label_es: 'El gato negro',
        visual_emoji: '🐈‍⬛',
        visual_bg_gradient: 'from-gray-100 to-slate-200 dark:from-slate-800 dark:to-slate-900',
        visual_description: 'Black cat',
        is_correct: false
      },
      {
        id: 'vis_3_d',
        label_es: 'Los perros negros',
        visual_emoji: '🐕‍🦺🐕‍🦺',
        visual_bg_gradient: 'from-orange-50 to-amber-100 dark:from-slate-800 dark:to-slate-900',
        visual_description: 'Two black dogs',
        is_correct: false
      }
    ],
    explanation_es: 'Concordancia de género: "El perro negro" es masculino singular.'
  },

  // 4. SPATIAL PREPOSITIONS - ENCIMA VS DEBAJO
  {
    id: 'vis_4',
    category: 'Spatial Prepositions',
    grammar_focus: 'Encima de vs Debajo de (On top vs Under)',
    prompt_audio_es: 'El gato está encima de la mesa',
    prompt_target_es: 'El gato está encima de la mesa',
    prompt_target_en: 'The cat is on top of the table',
    options: [
      {
        id: 'vis_4_a',
        label_es: 'El gato está debajo de la mesa',
        visual_emoji: '🪑👇🐈',
        visual_bg_gradient: 'from-slate-50 to-stone-100 dark:from-slate-800 dark:to-slate-900',
        visual_description: 'Cat sitting under the table',
        is_correct: false
      },
      {
        id: 'vis_4_b',
        label_es: 'El gato está encima de la mesa',
        visual_emoji: '🐈☝️🪑',
        visual_bg_gradient: 'from-amber-100 to-amber-200 dark:from-amber-950 dark:to-stone-900',
        visual_description: 'Cat sitting right on top of the table surface',
        is_correct: true
      },
      {
        id: 'vis_4_c',
        label_es: 'El gato está adentro de la caja',
        visual_emoji: '📦🐈',
        visual_bg_gradient: 'from-amber-50 to-yellow-100 dark:from-slate-800 dark:to-slate-900',
        visual_description: 'Cat inside a cardboard box',
        is_correct: false
      },
      {
        id: 'vis_4_d',
        label_es: 'El gato está al lado de la mesa',
        visual_emoji: '🪑➡️🐈',
        visual_bg_gradient: 'from-blue-50 to-sky-100 dark:from-slate-800 dark:to-slate-900',
        visual_description: 'Cat standing beside the table',
        is_correct: false
      }
    ],
    explanation_es: 'Preposiciones de lugar: "Encima de" expresa posición sobre una superficie elevada.'
  },

  // 5. SPATIAL PREPOSITIONS - ADENTRO VS AFUERA
  {
    id: 'vis_5',
    category: 'Spatial Prepositions',
    grammar_focus: 'Adentro de vs Afuera de (Inside vs Outside)',
    prompt_audio_es: 'El perro está adentro de la casa',
    prompt_target_es: 'El perro está adentro de la casa',
    prompt_target_en: 'The dog is inside the house',
    options: [
      {
        id: 'vis_5_a',
        label_es: 'El perro está afuera de la casa',
        visual_emoji: '🏡🐕',
        visual_bg_gradient: 'from-emerald-50 to-teal-100 dark:from-slate-800 dark:to-slate-900',
        visual_description: 'Dog standing outdoors in front of house',
        is_correct: false
      },
      {
        id: 'vis_5_b',
        label_es: 'El perro está adentro de la casa',
        visual_emoji: '🏠🐕‍🦺',
        visual_bg_gradient: 'from-amber-100 to-amber-200 dark:from-amber-950 dark:to-stone-900',
        visual_description: 'Dog visible inside room through house window',
        is_correct: true
      },
      {
        id: 'vis_5_c',
        label_es: 'El perro está encima del techo',
        visual_emoji: '🐕🏠',
        visual_bg_gradient: 'from-rose-50 to-orange-100 dark:from-slate-800 dark:to-slate-900',
        visual_description: 'Dog standing on roof',
        is_correct: false
      },
      {
        id: 'vis_5_d',
        label_es: 'El perro está corriendo en el jardín',
        visual_emoji: '🌳🐕💨',
        visual_bg_gradient: 'from-green-50 to-emerald-100 dark:from-slate-800 dark:to-slate-900',
        visual_description: 'Dog running in grass',
        is_correct: false
      }
    ],
    explanation_es: 'Ubicación espacial: "Adentro de" se refiere al espacio interior de un lugar cerrado.'
  },

  // 6. VERB ACTIONS - COMER VS BEBER
  {
    id: 'vis_6',
    category: 'Verb Actions',
    grammar_focus: 'Action Contrast (Comer vs Beber)',
    prompt_audio_es: 'El niño bebe agua',
    prompt_target_es: 'El niño bebe agua',
    prompt_target_en: 'The boy drinks water',
    options: [
      {
        id: 'vis_6_a',
        label_es: 'El niño come manzana',
        visual_emoji: '👦🍎😋',
        visual_bg_gradient: 'from-red-50 to-rose-100 dark:from-slate-800 dark:to-slate-900',
        visual_description: 'Boy taking a bite of an apple',
        is_correct: false
      },
      {
        id: 'vis_6_b',
        label_es: 'El niño bebe agua',
        visual_emoji: '👦🥤💧',
        visual_bg_gradient: 'from-amber-100 to-amber-200 dark:from-amber-950 dark:to-stone-900',
        visual_description: 'Boy drinking water from a clear glass',
        is_correct: true
      },
      {
        id: 'vis_6_c',
        label_es: 'El niño duerme en la cama',
        visual_emoji: '👦💤🛌',
        visual_bg_gradient: 'from-indigo-50 to-blue-100 dark:from-slate-800 dark:to-slate-900',
        visual_description: 'Boy sleeping peacefully in bed',
        is_correct: false
      },
      {
        id: 'vis_6_d',
        label_es: 'El niño corre rápido',
        visual_emoji: '👦🏃‍♂️💨',
        visual_bg_gradient: 'from-cyan-50 to-teal-100 dark:from-slate-800 dark:to-slate-900',
        visual_description: 'Boy running down path',
        is_correct: false
      }
    ],
    explanation_es: 'Verbos de acción: "Beber" es ingerir líquidos, mientras que "comer" es para alimentos sólidos.'
  },

  // 7. VERB ACTIONS - CORRER VS DORMIR
  {
    id: 'vis_7',
    category: 'Verb Actions',
    grammar_focus: 'Action Contrast (Corre vs Duerme)',
    prompt_audio_es: 'La niña duerme',
    prompt_target_es: 'La niña duerme',
    prompt_target_en: 'The girl sleeps',
    options: [
      {
        id: 'vis_7_a',
        label_es: 'La niña corre',
        visual_emoji: '👧🏃‍♀️',
        visual_bg_gradient: 'from-amber-50 to-orange-100 dark:from-slate-800 dark:to-slate-900',
        visual_description: 'Girl sprinting fast',
        is_correct: false
      },
      {
        id: 'vis_7_b',
        label_es: 'La niña escribe',
        visual_emoji: '👧📝',
        visual_bg_gradient: 'from-purple-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900',
        visual_description: 'Girl writing at desk',
        is_correct: false
      },
      {
        id: 'vis_7_c',
        label_es: 'La niña duerme',
        visual_emoji: '👧🛌💤',
        visual_bg_gradient: 'from-amber-100 to-amber-200 dark:from-amber-950 dark:to-stone-900',
        visual_description: 'Girl sleeping in bed with Zzz icons',
        is_correct: true
      },
      {
        id: 'vis_7_d',
        label_es: 'La niña canta',
        visual_emoji: '👧🎤🎶',
        visual_bg_gradient: 'from-pink-50 to-rose-100 dark:from-slate-800 dark:to-slate-900',
        visual_description: 'Girl singing into microphone',
        is_correct: false
      }
    ],
    explanation_es: 'Acciones de descanso: "Dormir" indica reposo inconsciente en la cama.'
  },

  // 8. OBJECT STATES & ADJECTIVES - CALIENTE VS FRÍO
  {
    id: 'vis_8',
    category: 'Object States & Adjectives',
    grammar_focus: 'Adjective States (El café caliente vs El café helado)',
    prompt_audio_es: 'El café está bien caliente',
    prompt_target_es: 'El café está bien caliente',
    prompt_target_en: 'The coffee is very hot',
    options: [
      {
        id: 'vis_8_a',
        label_es: 'El café está helado',
        visual_emoji: '🧊☕',
        visual_bg_gradient: 'from-cyan-50 to-blue-100 dark:from-slate-800 dark:to-slate-900',
        visual_description: 'Iced coffee cup filled with ice cubes',
        is_correct: false
      },
      {
        id: 'vis_8_b',
        label_es: 'El café está bien caliente',
        visual_emoji: '☕♨️🔥',
        visual_bg_gradient: 'from-amber-100 to-amber-200 dark:from-amber-950 dark:to-stone-900',
        visual_description: 'Hot steaming mug of freshly brewed coffee',
        is_correct: true
      },
      {
        id: 'vis_8_c',
        label_es: 'El helado de fresa',
        visual_emoji: '🍨🍓',
        visual_bg_gradient: 'from-pink-50 to-rose-100 dark:from-slate-800 dark:to-slate-900',
        visual_description: 'Bowl of strawberry ice cream',
        is_correct: false
      },
      {
        id: 'vis_8_d',
        label_es: 'La sopa de verduras',
        visual_emoji: '🍲🥦',
        visual_bg_gradient: 'from-emerald-50 to-green-100 dark:from-slate-800 dark:to-slate-900',
        visual_description: 'Bowl of vegetable soup',
        is_correct: false
      }
    ],
    explanation_es: 'Estados físicos: "Caliente" se ilustra con vapor levantándose del café.'
  }
];
