import {
  WritingTask,
  WritingAssessmentResult,
  InlineAnnotation,
  DimensionFeedback,
  ScoreLevel,
  ScoreLabel,
  CEFRLevel
} from '../types/assessment';

export const PRESET_WRITING_TASKS: WritingTask[] = [
  {
    id: 'dele_b1_tarea1',
    title: 'DELE B1 Tarea 1: Carta u Correo Formal',
    cefrTarget: 'B1',
    genre: 'dele_b1_tarea1',
    genreLabel: 'Carta Formal / Reclamación',
    minWords: 150,
    maxWords: 200,
    promptText:
      'Has contratado un curso de español en Madrid, pero al llegar te das cuenta de que el número de alumnos por clase supera el límite prometido y el horario no coincide con el folleto.',
    contextDescription:
      'Escribe una carta formal a la dirección de la escuela de idiomas exponiendo la situación, expresando tu insatisfacción y solicitando una solución razonable.',
    bulletPoints: [
      'Motivo de la carta y detalles de la reserva.',
      'Explicación clara de los dos problemas (número de estudiantes y horario).',
      'Propuesta de solución o solicitud de reembolso parcial.',
      'Fórmula de despedida formal adecuada (Un cordial saludo, Atentamente).'
    ],
    targetConnectors: ['En primer lugar', 'Por este motivo', 'Sin embargo', 'Por consiguiente', 'A la espera de su respuesta'],
    sampleTitle: 'Solicitud de corrección de condiciones de curso en Madrid'
  },
  {
    id: 'dele_b2_tarea1',
    title: 'DELE B2 Tarea 1: Artículo de Opinión o Ensayo Blog',
    cefrTarget: 'B2',
    genre: 'dele_b2_tarea1',
    genreLabel: 'Artículo de Opinión / Ensayo',
    minWords: 150,
    maxWords: 180,
    promptText:
      'Un periódico digital español ha abierto un debate sobre el impacto del teletrabajo y la inteligencia artificial en el equilibrio entre vida laboral y personal.',
    contextDescription:
      'Redacta un artículo de opinión bien estructurado argumentando ventajas, inconvenientes y proponiendo recomendaciones para evitar el aislamiento social.',
    bulletPoints: [
      'Introducción captadora presentando el tema y tu postura inicial.',
      'Argumentos a favor (flexibilidad, ahorro de tiempo en transporte).',
      'Argumentos en contra o riesgos (dificultad para desconectar, falta de contacto humano).',
      'Conclusión con recomendaciones prácticas y conector de cierre.'
    ],
    targetConnectors: ['Actualmente', 'Por una parte', 'Por otra parte', 'No obstante', 'En conclusión'],
    sampleTitle: 'El teletrabajo: ¿libertad o aislamiento en la era digital?'
  },
  {
    id: 'dele_a2_email',
    title: 'DELE A2 Tarea 1: Email a un Amigo',
    cefrTarget: 'A2',
    genre: 'email_informal',
    genreLabel: 'Correo Electrónico Informal',
    minWords: 100,
    maxWords: 140,
    promptText:
      'Tu amigo español Juan te ha invitado a pasar un fin de semana en su casa de campo en Andalucía.',
    contextDescription:
      'Escribe un correo electrónico para responder a su invitación, agradecerle la propuesta, confirmar tus fechas y preguntarle qué debes llevar.',
    bulletPoints: [
      'Agradecer la invitación con entusiasmo.',
      'Confirmar cuándo vas a llegar y qué medio de transporte usarás.',
      'Hacer preguntas sobre las actividades y el equipaje necesario.',
      'Despedida cariñosa e informal (Un abrazo, Nos vemos pronto).'
    ],
    targetConnectors: ['¡Qué buena noticia!', 'Además', 'Por eso', 'Un abrazo'],
    sampleTitle: '¡Confirmación para el fin de semana en Andalucía!'
  },
  {
    id: 'dele_c1_essay',
    title: 'DELE C1 Tarea 1: Informe o Ensayo Académico',
    cefrTarget: 'C1',
    genre: 'dele_c1_tarea1',
    genreLabel: 'Ensayo Argumentativo Formal',
    minWords: 220,
    maxWords: 280,
    promptText:
      'En un congreso sobre sostenibilidad urbana en Hispanoamérica, se debate si las ciudades deben priorizar el transporte público gratuito o la creación de zonas peatonales obligatorias.',
    contextDescription:
      'Redacta un ensayo analítico evaluando ambas posturas desde la perspectiva económica, ambiental y de cohesión social, justificando tu recomendación final.',
    bulletPoints: [
      'Planteamiento del problema y marco contextual.',
      'Análisis crítico del transporte público subvencionado vs. peatonalización.',
      'Implicaciones socioeconómicas y matices regionales.',
      'Dictamen final fundamentado con registro formal exquisito.'
    ],
    targetConnectors: ['A la luz de los acontecimientos', 'Asimismo', 'Cabe destacar que', 'Por ende', 'En suma'],
    sampleTitle: 'Sostenibilidad urbana: prioridades estratégicas en el siglo XXI'
  }
];

export const DISCURSIVE_CONNECTORS = [
  'en primer lugar',
  'en segundo lugar',
  'por un lado',
  'por otro lado',
  'por una parte',
  'por otra parte',
  'sin embargo',
  'no obstante',
  'por lo tanto',
  'por consiguiente',
  'en consecuencia',
  'por ende',
  'asimismo',
  'de igual modo',
  'además',
  'en cambio',
  'por el contrario',
  'a pesar de que',
  'aunque',
  'dado que',
  'puesto que',
  'debido a',
  'gracias a',
  'en conclusión',
  'para resumir',
  'en suma',
  'a modo de conclusión',
  'atentamente',
  'un cordial saludo'
];

export const OVERUSED_REPETITIVE_WORDS = [
  'hacer',
  'hace',
  'hice',
  'hacen',
  'haciendo',
  'tener',
  'tiene',
  'tienen',
  'tenía',
  'estar',
  'está',
  'están',
  'decir',
  'dice',
  'dicen',
  'cosa',
  'cosas',
  'muy bueno',
  'muy malo',
  'gente'
];

export const ADVANCED_LEXICON_MARKERS = [
  'fundamental',
  'imprescindible',
  'sustancial',
  'abordar',
  'fomentar',
  'propiciar',
  'garantizar',
  'perspectiva',
  'repercusión',
  'desafío',
  'idóneo',
  'desempeñar',
  'sobresaliente',
  'sensibilizar',
  'consolidar',
  'priorizar',
  'viabilidad',
  'cohesión'
];

export function countSpanishWords(text: string): number {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

export function getScoreLabel(score: ScoreLevel): ScoreLabel {
  switch (score) {
    case 0:
      return 'Insuficiente';
    case 1:
      return 'En desarrollo';
    case 2:
      return 'Competente';
    case 3:
      return 'Excelente';
  }
}

/**
 * Local heuristic evaluation engine providing instant feedback and span detection
 */
export function evaluateWritingHeuristically(
  task: WritingTask,
  essayText: string
): WritingAssessmentResult {
  const wordCount = countSpanishWords(essayText);
  const lowerText = essayText.toLowerCase();

  // Word count constraint check
  let wordCountCompliant = true;
  let wordCountWarning: string | undefined;

  if (wordCount < task.minWords) {
    wordCountCompliant = false;
    wordCountWarning = `El texto tiene ${wordCount} palabras. El mínimo requerido para ${task.title} es de ${task.minWords} palabras.`;
  } else if (wordCount > task.maxWords) {
    wordCountCompliant = false;
    wordCountWarning = `El texto tiene ${wordCount} palabras, superando el límite de ${task.maxWords} palabras.`;
  }

  // Connectors detection
  const connectorsDetected = DISCURSIVE_CONNECTORS.filter(c => lowerText.includes(c));

  // Repetitive words search
  const repetitiveWordsFound = OVERUSED_REPETITIVE_WORDS.filter(w => {
    const regex = new RegExp(`\\b${w}\\b`, 'gi');
    const matches = lowerText.match(regex);
    return matches && matches.length >= 2;
  });

  const annotations: InlineAnnotation[] = [];
  let annotationCounter = 1;

  // 1. Detect Rich Connectors & Advanced Lexicon (GREEN Spans)
  DISCURSIVE_CONNECTORS.forEach(conn => {
    let pos = lowerText.indexOf(conn);
    while (pos !== -1) {
      annotations.push({
        id: `ann_g_${annotationCounter++}`,
        text: essayText.substring(pos, pos + conn.length),
        startIndex: pos,
        endIndex: pos + conn.length,
        type: 'green',
        category: 'Conector Discursivo Excelente',
        explanation: `Uso acertado del marcador discursivo "${conn}". Aporta fluidez y cohesión estructural al texto.`,
        ruleTip: 'Coherencia y cohesión (Dimensión 2 CEFR)'
      });
      pos = lowerText.indexOf(conn, pos + conn.length);
    }
  });

  ADVANCED_LEXICON_MARKERS.forEach(lex => {
    const regex = new RegExp(`\\b${lex}\\b`, 'gi');
    let match;
    while ((match = regex.exec(essayText)) !== null) {
      annotations.push({
        id: `ann_g_${annotationCounter++}`,
        text: match[0],
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        type: 'green',
        category: 'Riqueza Léxica Avanzada',
        explanation: `Vocabulario de nivel alto "${match[0]}". Evita la repetición de léxico genérico.`,
        ruleTip: 'Riqueza Léxica (Dimensión 4 CEFR)'
      });
    }
  });

  // 2. Detect Repetitive / Overused Verbs (AMBER Spans)
  ['hacer', 'tener', 'decir', 'cosa', 'muy bueno'].forEach(overused => {
    const regex = new RegExp(`\\b${overused}\\b`, 'gi');
    let match;
    while ((match = regex.exec(essayText)) !== null) {
      annotations.push({
        id: `ann_a_${annotationCounter++}`,
        text: match[0],
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        type: 'amber',
        category: 'Verbo / Término Repetitivo',
        explanation: `Sustituye "${match[0]}" por un verbo de mayor precisión semántica (ej. realizar, abordar, llevar a cabo, expresar, sustancial).`,
        correction: overused === 'hacer' ? 'realizar / llevar a cabo' : overused === 'tener' ? 'poseer / contar con' : 'expresar / manifestar',
        ruleTip: 'Evita verbos comodín en exámenes DELE'
      });
    }
  });

  // 3. Detect Common Errors (RED Spans)
  const commonErrors: { pattern: RegExp; category: string; explanation: string; correction: string }[] = [
    {
      pattern: /\byo voy a la ([a-záéíóúñ]+) ayer\b/gi,
      category: 'Incoherencia Temporal',
      explanation: 'Uso de presente de indicativo ("voy") con el marcador temporal de pasado ("ayer"). Debes usar Pretérito Indefinido.',
      correction: 'Ayer fui a la ...'
    },
    {
      pattern: /\bme llamo es\b/gi,
      category: 'Sintaxis Incorrecta',
      explanation: 'Redundancia verbal: no combines el verbo reflexivo "me llamo" con "es".',
      correction: 'Me llamo ... / Mi nombre es ...'
    },
    {
      pattern: /\bpor que\b(?!\?)/gi,
      category: 'Ortografía de Causa',
      explanation: 'Para expresar causa en oraciones afirmativas, escribe "porque" como una sola palabra sin tilde.',
      correction: 'porque'
    },
    {
      pattern: /\ba el ([a-záéíóúñ]+)\b/gi,
      category: 'Contracción Obligatoria',
      explanation: 'La preposición "a" seguida del artículo "el" debe contraerse siempre en "al".',
      correction: 'al'
    },
    {
      pattern: /\bde el ([a-záéíóúñ]+)\b/gi,
      category: 'Contracción Obligatoria',
      explanation: 'La preposición "de" seguida del artículo "el" debe contraerse siempre en "del".',
      correction: 'del'
    },
    {
      pattern: /\bla problema\b/gi,
      category: 'Error de Género',
      explanation: 'La palabra "problema" de origen griego es masculina: debe concordar como "el problema".',
      correction: 'el problema'
    },
    {
      pattern: /\bel gente\b/gi,
      category: 'Error de Género',
      explanation: 'El sustantivo "gente" es femenino en español: "la gente".',
      correction: 'la gente'
    }
  ];

  commonErrors.forEach(err => {
    let match;
    while ((match = err.pattern.exec(essayText)) !== null) {
      annotations.push({
        id: `ann_r_${annotationCounter++}`,
        text: match[0],
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        type: 'red',
        category: err.category,
        explanation: err.explanation,
        correction: err.correction,
        ruleTip: 'Corrección Gramatical (Dimensión 3 CEFR)'
      });
    }
  });

  // Sort annotations by startIndex
  annotations.sort((a, b) => a.startIndex - b.startIndex);

  // Compute Scores per dimension (0 to 3 points each)
  const redCount = annotations.filter(a => a.type === 'red').length;
  const greenCount = annotations.filter(a => a.type === 'green').length;

  // 1. Adecuación al texto (Task Achievement & Register)
  let adecScore: ScoreLevel = 2;
  if (wordCountCompliant && essayText.length > 100) adecScore = 3;
  else if (!wordCountCompliant) adecScore = 1;
  if (wordCount < task.minWords / 2) adecScore = 0;

  // 2. Coherencia y cohesión (Connectors & Organization)
  let cohScore: ScoreLevel = 1;
  if (connectorsDetected.length >= 4) cohScore = 3;
  else if (connectorsDetected.length >= 2) cohScore = 2;
  else if (connectorsDetected.length === 0) cohScore = 0;

  // 3. Corrección gramatical (Accuracy & Syntax)
  let gramScore: ScoreLevel = 2;
  if (redCount === 0) gramScore = 3;
  else if (redCount === 1 || redCount === 2) gramScore = 2;
  else if (redCount >= 3 && redCount <= 5) gramScore = 1;
  else gramScore = 0;

  // 4. Riqueza léxica (Lexical Range)
  let lexScore: ScoreLevel = 1;
  if (greenCount >= 3 && repetitiveWordsFound.length === 0) lexScore = 3;
  else if (greenCount >= 1 || repetitiveWordsFound.length <= 1) lexScore = 2;
  else if (repetitiveWordsFound.length >= 3) lexScore = 0;

  const totalPoints = (adecScore + cohScore + gramScore + lexScore) as number;
  const overallScore = Math.round((totalPoints / 12) * 100);

  let estimatedCefr: CEFRLevel = task.cefrTarget;
  if (overallScore >= 85) {
    if (task.cefrTarget === 'A2') estimatedCefr = 'B1';
    else if (task.cefrTarget === 'B1') estimatedCefr = 'B2';
    else if (task.cefrTarget === 'B2') estimatedCefr = 'C1';
  } else if (overallScore < 50) {
    if (task.cefrTarget === 'B2') estimatedCefr = 'B1';
    else if (task.cefrTarget === 'B1') estimatedCefr = 'A2';
  }

  const dimensionAdecuacion: DimensionFeedback = {
    dimensionKey: 'adecuacion',
    title: 'Task Achievement & Register',
    titleEs: 'Adecuación al Texto y Registro',
    score: adecScore,
    scoreLabel: getScoreLabel(adecScore),
    description: `Evaluación del cumplimiento del género (${task.genreLabel}) y el ajuste a las ${task.minWords}-${task.maxWords} palabras requeridas.`,
    positivePoints: wordCountCompliant
      ? [`Extensión dentro del rango oficial (${wordCount} palabras).`, 'Cumplimiento de las instrucciones iniciales del texto.']
      : [`Comprensión del propósito comunicativo general.`],
    improvements: !wordCountCompliant
      ? [wordCountWarning || 'Ajustar la longitud del texto al rango especificado por la prueba oficial.']
      : ['Asegurar fórmulas de saludo y despedida acordes al registro formal o informal.']
  };

  const dimensionCoherencia: DimensionFeedback = {
    dimensionKey: 'coherencia',
    title: 'Organization & Connectors',
    titleEs: 'Coherencia y Cohesión Discursiva',
    score: cohScore,
    scoreLabel: getScoreLabel(cohScore),
    description: 'Análisis de la estructuración en párrafos y el uso de marcadores discursivos y conectores de transición.',
    positivePoints: connectorsDetected.length > 0
      ? [`Identificados ${connectorsDetected.length} conectores discursivos: ${connectorsDetected.map(c => `"${c}"`).join(', ')}.`]
      : ['Estructura narrativa básica comprensible.'],
    improvements: connectorsDetected.length < 3
      ? ['Incorporar más marcadores de ordenación (en primer lugar, por consiguiente, en conclusión).']
      : ['Variar los conectores de causa y contraste para evitar repetir "pero" y "porque".']
  };

  const dimensionGramatica: DimensionFeedback = {
    dimensionKey: 'gramatica',
    title: 'Grammatical Accuracy',
    titleEs: 'Corrección Gramatical',
    score: gramScore,
    scoreLabel: getScoreLabel(gramScore),
    description: 'Control de la concordancia de género y número, tiempos verbales, pronombres y uso de preposiciones.',
    positivePoints: redCount === 0
      ? ['Excelente control de las estructuras sintácticas sin errores graves detectados.']
      : ['Uso correcto de oraciones simples y compuestas.'],
    improvements: redCount > 0
      ? [`Revisar ${redCount} inconsistencias gramaticales señaladas en rojo en el texto.`]
      : ['Practicar el modo subjuntivo para oraciones relativas y expresiones de hipótesis.']
  };

  const dimensionLexico: DimensionFeedback = {
    dimensionKey: 'lexico',
    title: 'Lexical Range & Precision',
    titleEs: 'Riqueza Léxica',
    score: lexScore,
    scoreLabel: getScoreLabel(lexScore),
    description: 'Variedad de vocabulario técnico/específico y evitación de verbos comodín o repeticiones innecesarias.',
    positivePoints: greenCount > 0
      ? [`Presencia de ${greenCount} términos de léxico avanzado y precisión semántica.`]
      : ['Uso de vocabulario comprensible acorde al tema.'],
    improvements: repetitiveWordsFound.length > 0
      ? [`Sustituir términos sobreutilizados (${repetitiveWordsFound.map(w => `"${w}"`).join(', ')}) por sinónimos precisos.`]
      : ['Incorporar modismos o locuciones específicas de la tarea.']
  };

  return {
    id: `eval_${Date.now()}`,
    taskId: task.id,
    taskTitle: task.title,
    essayText,
    wordCount,
    wordCountCompliant,
    wordCountWarning,
    overallScore,
    totalPoints,
    estimatedCefrLevel: estimatedCefr,
    dimensions: {
      adecuacion: dimensionAdecuacion,
      coherencia: dimensionCoherencia,
      gramatica: dimensionGramatica,
      lexico: dimensionLexico
    },
    annotations,
    summaryFeedback: `Tu texto alcanza una puntuación general de ${overallScore}/100 (${totalPoints}/12 puntos CEFR). Demuestras un dominio de nivel ${estimatedCefr} con ${connectorsDetected.length} conectores relevantes utilizados.`,
    strengths: [
      `Uso efectivo de ${connectorsDetected.length} marcadores discursivos para guiar al lector.`,
      `Adecuado ajuste al tono comunicativo del género ${task.genreLabel}.`,
      wordCountCompliant ? 'Respeto del límite de palabras estipulado en la prueba.' : 'Estructuración clara de la intención comunicativa.'
    ],
    keyRecommendations: [
      'Sustituye los verbos comodín (hacer, tener, estar) por verbos de mayor precisión semántica.',
      'Revisa las anotaciones en rojo para consolidar la concordancia y el uso de preposiciones.',
      'Enriquecer la conclusión con marcadores de cierre de alto nivel como "en suma" o "por consiguiente".'
    ],
    connectorsDetected,
    repetitiveWordsFound,
    evaluatedAt: new Date().toISOString()
  };
}

/**
 * Call backend AI evaluation API with fallback to local heuristic evaluation
 */
export async function evaluateSpanishEssay(
  task: WritingTask,
  essayText: string
): Promise<WritingAssessmentResult> {
  const localResult = evaluateWritingHeuristically(task, essayText);

  try {
    const response = await fetch('/api/writing/evaluate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        taskId: task.id,
        taskTitle: task.title,
        genre: task.genre,
        cefrTarget: task.cefrTarget,
        promptText: task.promptText,
        essayText,
        minWords: task.minWords,
        maxWords: task.maxWords
      })
    });

    if (!response.ok) {
      console.warn('Backend evaluation route returned error status, using local heuristic result.');
      return localResult;
    }

    const data = await response.json();
    if (data && data.dimensions) {
      return {
        ...localResult,
        ...data,
        // Ensure annotations are merged and formatted properly
        annotations: data.annotations || localResult.annotations,
        wordCount: localResult.wordCount,
        wordCountCompliant: localResult.wordCountCompliant,
        wordCountWarning: localResult.wordCountWarning
      };
    }
    return localResult;
  } catch (err) {
    console.warn('Network or server error while calling /api/writing/evaluate, using local evaluation:', err);
    return localResult;
  }
}
