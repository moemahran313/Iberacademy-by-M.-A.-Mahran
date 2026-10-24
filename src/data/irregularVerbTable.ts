export interface IrregularVerbInfo {
  lemma: string;
  parsing: string;
  tense?: string;
  mood?: 'Indicativo' | 'Subjuntivo' | 'Imperativo';
  personNumber?: string;
  disambiguationContext?: string;
}

/**
 * Comprehensive high-frequency irregular Spanish verb forms lookup table.
 * Maps conjugated forms -> primary base lemmas & morphological parsing.
 */
export const IRREGULAR_VERB_TABLE: Record<string, IrregularVerbInfo[]> = {
  // --- SER & IR (Disambiguation required for past forms) ---
  'fue': [
    { lemma: 'ser', parsing: '3ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo', personNumber: '3ª sing', disambiguationContext: 'ser (to be)' },
    { lemma: 'ir', parsing: '3ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo', personNumber: '3ª sing', disambiguationContext: 'ir (to go)' }
  ],
  'fui': [
    { lemma: 'ser', parsing: '1ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo', personNumber: '1ª sing', disambiguationContext: 'ser (to be)' },
    { lemma: 'ir', parsing: '1ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo', personNumber: '1ª sing', disambiguationContext: 'ir (to go)' }
  ],
  'fuiste': [
    { lemma: 'ser', parsing: '2ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo', personNumber: '2ª sing' },
    { lemma: 'ir', parsing: '2ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo', personNumber: '2ª sing' }
  ],
  'fuimos': [
    { lemma: 'ser', parsing: '1ª persona plural, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo', personNumber: '1ª plur' },
    { lemma: 'ir', parsing: '1ª persona plural, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo', personNumber: '1ª plur' }
  ],
  'fuisteis': [
    { lemma: 'ser', parsing: '2ª persona plural, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo', personNumber: '2ª plur' },
    { lemma: 'ir', parsing: '2ª persona plural, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo', personNumber: '2ª plur' }
  ],
  'fueron': [
    { lemma: 'ser', parsing: '3ª persona plural, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo', personNumber: '3ª plur' },
    { lemma: 'ir', parsing: '3ª persona plural, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo', personNumber: '3ª plur' }
  ],
  'fuera': [
    { lemma: 'ser', parsing: '1ª/3ª persona singular, Pretérito Imperfecto de Subjuntivo', tense: 'Imperfecto', mood: 'Subjuntivo' },
    { lemma: 'ir', parsing: '1ª/3ª persona singular, Pretérito Imperfecto de Subjuntivo', tense: 'Imperfecto', mood: 'Subjuntivo' }
  ],
  'fueras': [
    { lemma: 'ser', parsing: '2ª persona singular, Pretérito Imperfecto de Subjuntivo', tense: 'Imperfecto', mood: 'Subjuntivo' },
    { lemma: 'ir', parsing: '2ª persona singular, Pretérito Imperfecto de Subjuntivo', tense: 'Imperfecto', mood: 'Subjuntivo' }
  ],
  'fuéramos': [
    { lemma: 'ser', parsing: '1ª persona plural, Pretérito Imperfecto de Subjuntivo', tense: 'Imperfecto', mood: 'Subjuntivo' },
    { lemma: 'ir', parsing: '1ª persona plural, Pretérito Imperfecto de Subjuntivo', tense: 'Imperfecto', mood: 'Subjuntivo' }
  ],
  'fueran': [
    { lemma: 'ser', parsing: '3ª persona plural, Pretérito Imperfecto de Subjuntivo', tense: 'Imperfecto', mood: 'Subjuntivo' },
    { lemma: 'ir', parsing: '3ª persona plural, Pretérito Imperfecto de Subjuntivo', tense: 'Imperfecto', mood: 'Subjuntivo' }
  ],

  // --- SER ---
  'soy': [{ lemma: 'ser', parsing: '1ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'eres': [{ lemma: 'ser', parsing: '2ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'es': [{ lemma: 'ser', parsing: '3ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'somos': [{ lemma: 'ser', parsing: '1ª persona plural, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'sois': [{ lemma: 'ser', parsing: '2ª persona plural, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'son': [{ lemma: 'ser', parsing: '3ª persona plural, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'era': [{ lemma: 'ser', parsing: '1ª/3ª persona singular, Pretérito Imperfecto de Indicativo', tense: 'Imperfecto', mood: 'Indicativo' }],
  'eras': [{ lemma: 'ser', parsing: '2ª persona singular, Pretérito Imperfecto de Indicativo', tense: 'Imperfecto', mood: 'Indicativo' }],
  'éramos': [{ lemma: 'ser', parsing: '1ª persona plural, Pretérito Imperfecto de Indicativo', tense: 'Imperfecto', mood: 'Indicativo' }],
  'erais': [{ lemma: 'ser', parsing: '2ª persona plural, Pretérito Imperfecto de Indicativo', tense: 'Imperfecto', mood: 'Indicativo' }],
  'eran': [{ lemma: 'ser', parsing: '3ª persona plural, Pretérito Imperfecto de Indicativo', tense: 'Imperfecto', mood: 'Indicativo' }],
  'sea': [{ lemma: 'ser', parsing: '1ª/3ª persona singular, Presente de Subjuntivo', tense: 'Presente', mood: 'Subjuntivo' }],
  'seas': [{ lemma: 'ser', parsing: '2ª persona singular, Presente de Subjuntivo', tense: 'Presente', mood: 'Subjuntivo' }],
  'seamos': [{ lemma: 'ser', parsing: '1ª persona plural, Presente de Subjuntivo', tense: 'Presente', mood: 'Subjuntivo' }],
  'sean': [{ lemma: 'ser', parsing: '3ª persona plural, Presente de Subjuntivo', tense: 'Presente', mood: 'Subjuntivo' }],

  // --- IR ---
  'voy': [{ lemma: 'ir', parsing: '1ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'vas': [{ lemma: 'ir', parsing: '2ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'va': [{ lemma: 'ir', parsing: '3ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'vamos': [{ lemma: 'ir', parsing: '1ª persona plural, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'vais': [{ lemma: 'ir', parsing: '2ª persona plural, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'van': [{ lemma: 'ir', parsing: '3ª persona plural, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'iba': [{ lemma: 'ir', parsing: '1ª/3ª persona singular, Pretérito Imperfecto de Indicativo', tense: 'Imperfecto', mood: 'Indicativo' }],
  'ibas': [{ lemma: 'ir', parsing: '2ª persona singular, Pretérito Imperfecto de Indicativo', tense: 'Imperfecto', mood: 'Indicativo' }],
  'íbamos': [{ lemma: 'ir', parsing: '1ª persona plural, Pretérito Imperfecto de Indicativo', tense: 'Imperfecto', mood: 'Indicativo' }],
  'iban': [{ lemma: 'ir', parsing: '3ª persona plural, Pretérito Imperfecto de Indicativo', tense: 'Imperfecto', mood: 'Indicativo' }],
  'vaya': [{ lemma: 'ir', parsing: '1ª/3ª persona singular, Presente de Subjuntivo', tense: 'Presente', mood: 'Subjuntivo' }],
  'vayas': [{ lemma: 'ir', parsing: '2ª persona singular, Presente de Subjuntivo', tense: 'Presente', mood: 'Subjuntivo' }],
  'vayamos': [{ lemma: 'ir', parsing: '1ª persona plural, Presente de Subjuntivo', tense: 'Presente', mood: 'Subjuntivo' }],
  'vayan': [{ lemma: 'ir', parsing: '3ª persona plural, Presente de Subjuntivo', tense: 'Presente', mood: 'Subjuntivo' }],

  // --- ESTAR ---
  'estoy': [{ lemma: 'estar', parsing: '1ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'estás': [{ lemma: 'estar', parsing: '2ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'está': [{ lemma: 'estar', parsing: '3ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'estamos': [{ lemma: 'estar', parsing: '1ª persona plural, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'estáis': [{ lemma: 'estar', parsing: '2ª persona plural, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'están': [{ lemma: 'estar', parsing: '3ª persona plural, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'estuve': [{ lemma: 'estar', parsing: '1ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'estuviste': [{ lemma: 'estar', parsing: '2ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'estuvo': [{ lemma: 'estar', parsing: '3ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'estuvimos': [{ lemma: 'estar', parsing: '1ª persona plural, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'estuvieron': [{ lemma: 'estar', parsing: '3ª persona plural, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'estuviera': [{ lemma: 'estar', parsing: '1ª/3ª persona singular, Imperfecto de Subjuntivo', tense: 'Imperfecto', mood: 'Subjuntivo' }],
  'estuviéramos': [{ lemma: 'estar', parsing: '1ª persona plural, Imperfecto de Subjuntivo', tense: 'Imperfecto', mood: 'Subjuntivo' }],
  'esté': [{ lemma: 'estar', parsing: '1ª/3ª persona singular, Presente de Subjuntivo', tense: 'Presente', mood: 'Subjuntivo' }],
  'estés': [{ lemma: 'estar', parsing: '2ª persona singular, Presente de Subjuntivo', tense: 'Presente', mood: 'Subjuntivo' }],
  'estén': [{ lemma: 'estar', parsing: '3ª persona plural, Presente de Subjuntivo', tense: 'Presente', mood: 'Subjuntivo' }],

  // --- TENER ---
  'tengo': [{ lemma: 'tener', parsing: '1ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'tienes': [{ lemma: 'tener', parsing: '2ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'tiene': [{ lemma: 'tener', parsing: '3ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'tienen': [{ lemma: 'tener', parsing: '3ª persona plural, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'tuve': [{ lemma: 'tener', parsing: '1ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'tuviste': [{ lemma: 'tener', parsing: '2ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'tuvo': [{ lemma: 'tener', parsing: '3ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'tuvimos': [{ lemma: 'tener', parsing: '1ª persona plural, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'tuvieron': [{ lemma: 'tener', parsing: '3ª persona plural, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'tendré': [{ lemma: 'tener', parsing: '1ª persona singular, Futuro Simple', tense: 'Futuro', mood: 'Indicativo' }],
  'tendrás': [{ lemma: 'tener', parsing: '2ª persona singular, Futuro Simple', tense: 'Futuro', mood: 'Indicativo' }],
  'tendrá': [{ lemma: 'tener', parsing: '3ª persona singular, Futuro Simple', tense: 'Futuro', mood: 'Indicativo' }],
  'tendremos': [{ lemma: 'tener', parsing: '1ª persona plural, Futuro Simple', tense: 'Futuro', mood: 'Indicativo' }],
  'tendrán': [{ lemma: 'tener', parsing: '3ª persona plural, Futuro Simple', tense: 'Futuro', mood: 'Indicativo' }],
  'tendría': [{ lemma: 'tener', parsing: '1ª/3ª persona singular, Condicional Simple', tense: 'Condicional', mood: 'Indicativo' }],
  'tendrías': [{ lemma: 'tener', parsing: '2ª persona singular, Condicional Simple', tense: 'Condicional', mood: 'Indicativo' }],
  'tendríamos': [{ lemma: 'tener', parsing: '1ª persona plural, Condicional Simple', tense: 'Condicional', mood: 'Indicativo' }],
  'tenga': [{ lemma: 'tener', parsing: '1ª/3ª persona singular, Presente de Subjuntivo', tense: 'Presente', mood: 'Subjuntivo' }],
  'tengas': [{ lemma: 'tener', parsing: '2ª persona singular, Presente de Subjuntivo', tense: 'Presente', mood: 'Subjuntivo' }],
  'tengamos': [{ lemma: 'tener', parsing: '1ª persona plural, Presente de Subjuntivo', tense: 'Presente', mood: 'Subjuntivo' }],
  'tengan': [{ lemma: 'tener', parsing: '3ª persona plural, Presente de Subjuntivo', tense: 'Presente', mood: 'Subjuntivo' }],
  'tuviera': [{ lemma: 'tener', parsing: '1ª/3ª persona singular, Imperfecto de Subjuntivo', tense: 'Imperfecto', mood: 'Subjuntivo' }],
  'tuviéramos': [{ lemma: 'tener', parsing: '1ª persona plural, Imperfecto de Subjuntivo', tense: 'Imperfecto', mood: 'Subjuntivo' }],

  // --- HACER ---
  'hago': [{ lemma: 'hacer', parsing: '1ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'haces': [{ lemma: 'hacer', parsing: '2ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'hace': [{ lemma: 'hacer', parsing: '3ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'hacen': [{ lemma: 'hacer', parsing: '3ª persona plural, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'hice': [{ lemma: 'hacer', parsing: '1ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'hiciste': [{ lemma: 'hacer', parsing: '2ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'hizo': [{ lemma: 'hacer', parsing: '3ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'hicimos': [{ lemma: 'hacer', parsing: '1ª persona plural, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'hicieron': [{ lemma: 'hacer', parsing: '3ª persona plural, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'haré': [{ lemma: 'hacer', parsing: '1ª persona singular, Futuro Simple', tense: 'Futuro', mood: 'Indicativo' }],
  'hará': [{ lemma: 'hacer', parsing: '3ª persona singular, Futuro Simple', tense: 'Futuro', mood: 'Indicativo' }],
  'haría': [{ lemma: 'hacer', parsing: '1ª/3ª persona singular, Condicional Simple', tense: 'Condicional', mood: 'Indicativo' }],
  'harías': [{ lemma: 'hacer', parsing: '2ª persona singular, Condicional Simple', tense: 'Condicional', mood: 'Indicativo' }],
  'haga': [{ lemma: 'hacer', parsing: '1ª/3ª persona singular, Presente de Subjuntivo', tense: 'Presente', mood: 'Subjuntivo' }],
  'hagamos': [{ lemma: 'hacer', parsing: '1ª persona plural, Presente de Subjuntivo', tense: 'Presente', mood: 'Subjuntivo' }],
  'hiciera': [{ lemma: 'hacer', parsing: '1ª/3ª persona singular, Imperfecto de Subjuntivo', tense: 'Imperfecto', mood: 'Subjuntivo' }],
  'hiciéramos': [{ lemma: 'hacer', parsing: '1ª persona plural, Imperfecto de Subjuntivo', tense: 'Imperfecto', mood: 'Subjuntivo' }],
  'hecho': [{ lemma: 'hacer', parsing: 'Participio Pasado' }],

  // --- PODER ---
  'puedo': [{ lemma: 'poder', parsing: '1ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'puedes': [{ lemma: 'poder', parsing: '2ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'puede': [{ lemma: 'poder', parsing: '3ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'pueden': [{ lemma: 'poder', parsing: '3ª persona plural, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'pude': [{ lemma: 'poder', parsing: '1ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'pudiste': [{ lemma: 'poder', parsing: '2ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'pudo': [{ lemma: 'poder', parsing: '3ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'pudimos': [{ lemma: 'poder', parsing: '1ª persona plural, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'pudieron': [{ lemma: 'poder', parsing: '3ª persona plural, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'podré': [{ lemma: 'poder', parsing: '1ª persona singular, Futuro Simple', tense: 'Futuro', mood: 'Indicativo' }],
  'podrá': [{ lemma: 'poder', parsing: '3ª persona singular, Futuro Simple', tense: 'Futuro', mood: 'Indicativo' }],
  'podría': [{ lemma: 'poder', parsing: '1ª/3ª persona singular, Condicional Simple', tense: 'Condicional', mood: 'Indicativo' }],
  'podrías': [{ lemma: 'poder', parsing: '2ª persona singular, Condicional Simple', tense: 'Condicional', mood: 'Indicativo' }],
  'pueda': [{ lemma: 'poder', parsing: '1ª/3ª persona singular, Presente de Subjuntivo', tense: 'Presente', mood: 'Subjuntivo' }],
  'puedan': [{ lemma: 'poder', parsing: '3ª persona plural, Presente de Subjuntivo', tense: 'Presente', mood: 'Subjuntivo' }],
  'pudiera': [{ lemma: 'poder', parsing: '1ª/3ª persona singular, Imperfecto de Subjuntivo', tense: 'Imperfecto', mood: 'Subjuntivo' }],
  'pudiéramos': [{ lemma: 'poder', parsing: '1ª persona plural, Imperfecto de Subjuntivo', tense: 'Imperfecto', mood: 'Subjuntivo' }],

  // --- PONER ---
  'pongo': [{ lemma: 'poner', parsing: '1ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'pones': [{ lemma: 'poner', parsing: '2ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'pone': [{ lemma: 'poner', parsing: '3ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'ponen': [{ lemma: 'poner', parsing: '3ª persona plural, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'puse': [{ lemma: 'poner', parsing: '1ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'pusiste': [{ lemma: 'poner', parsing: '2ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'puso': [{ lemma: 'poner', parsing: '3ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'pusimos': [{ lemma: 'poner', parsing: '1ª persona plural, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'pusieron': [{ lemma: 'poner', parsing: '3ª persona plural, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'pondré': [{ lemma: 'poner', parsing: '1ª persona singular, Futuro Simple', tense: 'Futuro', mood: 'Indicativo' }],
  'pondría': [{ lemma: 'poner', parsing: '1ª/3ª persona singular, Condicional Simple', tense: 'Condicional', mood: 'Indicativo' }],
  'ponga': [{ lemma: 'poner', parsing: '1ª/3ª persona singular, Presente de Subjuntivo', tense: 'Presente', mood: 'Subjuntivo' }],
  'pusiera': [{ lemma: 'poner', parsing: '1ª/3ª persona singular, Imperfecto de Subjuntivo', tense: 'Imperfecto', mood: 'Subjuntivo' }],
  'puesto': [{ lemma: 'poner', parsing: 'Participio Pasado' }],

  // --- SABER ---
  'sé': [{ lemma: 'saber', parsing: '1ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'sabes': [{ lemma: 'saber', parsing: '2ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'sabe': [{ lemma: 'saber', parsing: '3ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'saben': [{ lemma: 'saber', parsing: '3ª persona plural, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'supe': [{ lemma: 'saber', parsing: '1ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'supo': [{ lemma: 'saber', parsing: '3ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'supieron': [{ lemma: 'saber', parsing: '3ª persona plural, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'sabré': [{ lemma: 'saber', parsing: '1ª persona singular, Futuro Simple', tense: 'Futuro', mood: 'Indicativo' }],
  'sabría': [{ lemma: 'saber', parsing: '1ª/3ª persona singular, Condicional Simple', tense: 'Condicional', mood: 'Indicativo' }],
  'sepa': [{ lemma: 'saber', parsing: '1ª/3ª persona singular, Presente de Subjuntivo', tense: 'Presente', mood: 'Subjuntivo' }],
  'supiera': [{ lemma: 'saber', parsing: '1ª/3ª persona singular, Imperfecto de Subjuntivo', tense: 'Imperfecto', mood: 'Subjuntivo' }],

  // --- QUERER ---
  'quiero': [{ lemma: 'querer', parsing: '1ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'quieres': [{ lemma: 'querer', parsing: '2ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'quiere': [{ lemma: 'querer', parsing: '3ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'quieren': [{ lemma: 'querer', parsing: '3ª persona plural, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'quise': [{ lemma: 'querer', parsing: '1ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'quiso': [{ lemma: 'querer', parsing: '3ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'quisieron': [{ lemma: 'querer', parsing: '3ª persona plural, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'querré': [{ lemma: 'querer', parsing: '1ª persona singular, Futuro Simple', tense: 'Futuro', mood: 'Indicativo' }],
  'querría': [{ lemma: 'querer', parsing: '1ª/3ª persona singular, Condicional Simple', tense: 'Condicional', mood: 'Indicativo' }],
  'quiera': [{ lemma: 'querer', parsing: '1ª/3ª persona singular, Presente de Subjuntivo', tense: 'Presente', mood: 'Subjuntivo' }],
  'quisiera': [{ lemma: 'querer', parsing: '1ª/3ª persona singular, Imperfecto de Subjuntivo', tense: 'Imperfecto', mood: 'Subjuntivo' }],
  'quisiéramos': [{ lemma: 'querer', parsing: '1ª persona plural, Imperfecto de Subjuntivo', tense: 'Imperfecto', mood: 'Subjuntivo' }],

  // --- VENIR ---
  'vengo': [{ lemma: 'venir', parsing: '1ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'vienes': [{ lemma: 'venir', parsing: '2ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'viene': [{ lemma: 'venir', parsing: '3ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'vienen': [{ lemma: 'venir', parsing: '3ª persona plural, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'vine': [{ lemma: 'venir', parsing: '1ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'vino': [{ lemma: 'venir', parsing: '3ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'vinieron': [{ lemma: 'venir', parsing: '3ª persona plural, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'vendré': [{ lemma: 'venir', parsing: '1ª persona singular, Futuro Simple', tense: 'Futuro', mood: 'Indicativo' }],
  'vendría': [{ lemma: 'venir', parsing: '1ª/3ª persona singular, Condicional Simple', tense: 'Condicional', mood: 'Indicativo' }],
  'venga': [{ lemma: 'venir', parsing: '1ª/3ª persona singular, Presente de Subjuntivo', tense: 'Presente', mood: 'Subjuntivo' }],
  'viniera': [{ lemma: 'venir', parsing: '1ª/3ª persona singular, Imperfecto de Subjuntivo', tense: 'Imperfecto', mood: 'Subjuntivo' }],

  // --- DECIR ---
  'digo': [{ lemma: 'decir', parsing: '1ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'dices': [{ lemma: 'decir', parsing: '2ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'dice': [{ lemma: 'decir', parsing: '3ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'dicen': [{ lemma: 'decir', parsing: '3ª persona plural, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'dije': [{ lemma: 'decir', parsing: '1ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'dijo': [{ lemma: 'decir', parsing: '3ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'dijeron': [{ lemma: 'decir', parsing: '3ª persona plural, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'diré': [{ lemma: 'decir', parsing: '1ª persona singular, Futuro Simple', tense: 'Futuro', mood: 'Indicativo' }],
  'diría': [{ lemma: 'decir', parsing: '1ª/3ª persona singular, Condicional Simple', tense: 'Condicional', mood: 'Indicativo' }],
  'diga': [{ lemma: 'decir', parsing: '1ª/3ª persona singular, Presente de Subjuntivo', tense: 'Presente', mood: 'Subjuntivo' }],
  'dijera': [{ lemma: 'decir', parsing: '1ª/3ª persona singular, Imperfecto de Subjuntivo', tense: 'Imperfecto', mood: 'Subjuntivo' }],
  'dicho': [{ lemma: 'decir', parsing: 'Participio Pasado' }],

  // --- DORMIR ---
  'duermo': [{ lemma: 'dormir', parsing: '1ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'duermes': [{ lemma: 'dormir', parsing: '2ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'duerme': [{ lemma: 'dormir', parsing: '3ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'duermen': [{ lemma: 'dormir', parsing: '3ª persona plural, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'durmió': [{ lemma: 'dormir', parsing: '3ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'durmieron': [{ lemma: 'dormir', parsing: '3ª persona plural, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'durmiera': [{ lemma: 'dormir', parsing: '1ª/3ª persona singular, Imperfecto de Subjuntivo', tense: 'Imperfecto', mood: 'Subjuntivo' }],
  'durmiéramos': [{ lemma: 'dormir', parsing: '1ª persona plural, Imperfecto de Subjuntivo', tense: 'Imperfecto', mood: 'Subjuntivo' }],
  'durmiendo': [{ lemma: 'dormir', parsing: 'Gerundio' }],

  // --- HABER ---
  'he': [{ lemma: 'haber', parsing: '1ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'has': [{ lemma: 'haber', parsing: '2ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'ha': [{ lemma: 'haber', parsing: '3ª persona singular, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'hemos': [{ lemma: 'haber', parsing: '1ª persona plural, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'habéis': [{ lemma: 'haber', parsing: '2ª persona plural, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'han': [{ lemma: 'haber', parsing: '3ª persona plural, Presente de Indicativo', tense: 'Presente', mood: 'Indicativo' }],
  'había': [{ lemma: 'haber', parsing: '1ª/3ª persona singular, Pretérito Imperfecto', tense: 'Imperfecto', mood: 'Indicativo' }],
  'hubo': [{ lemma: 'haber', parsing: '3ª persona singular, Pretérito Indefinido', tense: 'Pretérito Indefinido', mood: 'Indicativo' }],
  'habrá': [{ lemma: 'haber', parsing: '3ª persona singular, Futuro Simple', tense: 'Futuro', mood: 'Indicativo' }],
  'habría': [{ lemma: 'haber', parsing: '1ª/3ª persona singular, Condicional Simple', tense: 'Condicional', mood: 'Indicativo' }],
  'habrías': [{ lemma: 'haber', parsing: '2ª persona singular, Condicional Simple', tense: 'Condicional', mood: 'Indicativo' }],
  'haya': [{ lemma: 'haber', parsing: '1ª/3ª persona singular, Presente de Subjuntivo', tense: 'Presente', mood: 'Subjuntivo' }]
};
