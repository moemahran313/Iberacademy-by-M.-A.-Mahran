export interface ListeningQuestion {
  id: string;
  questionText: string;
  options: [string, string, string];
  correctOptionIndex: number;
  explanation: string;
  targetedSkill: string;
  transcriptRef: string;
}

export interface ListeningTask {
  id: string;
  title: string;
  subtitle: string;
  cefrLevel: 'A2' | 'B1' | 'B2' | 'C1';
  taskType: 'radio_news' | 'phone_voicenote' | 'lecture_consultation';
  taskTypeLabel: string;
  region: string;
  regionFlag: string;
  accentTitle: string;
  accentDescription: string;
  phenomenaNotes: string[];
  ambientType: 'radio_studio' | 'phone_cafeteria' | 'lecture_hall';
  durationSeconds: number;
  transcript: string;
  annotatedTranscript: Array<{
    speaker: string;
    text: string;
    timestamp: string;
    note?: string;
  }>;
  notesPrompt?: string;
  questions: ListeningQuestion[];
}

export const LISTENING_TASKS: ListeningTask[] = [
  {
    id: 'listening_task_1_radio',
    title: 'Tarea 1: Boletín Informativo Radiofónico',
    subtitle: 'Radio Nacional de España - Informativo de Medio Ambiente y Tecnología',
    cefrLevel: 'B2',
    taskType: 'radio_news',
    taskTypeLabel: 'Boletín de Noticias (DELE B2 Tarea 1)',
    region: 'España (Madrid / Castilla)',
    regionFlag: '🇪🇸',
    accentTitle: 'Español Peninsular Septentrional (Radiofónico)',
    accentDescription: 'Locución formal con ritmo ágil de 160-180 palabras por minuto. Articulación clara pero rápida, distinción c/z y s, sintaxis periodística compleja.',
    phenomenaNotes: [
      'Ritmo acelerado característico de boletines de noticias en vivo.',
      'Distinción clara fonética fonemas /θ/ (z, ci, ce) y /s/.',
      'Uso de conectores periodísticos: "asimismo", "por su parte", "en cuanto a".'
    ],
    ambientType: 'radio_studio',
    durationSeconds: 95,
    transcript: `Buenos días. Les transmitimos desde Radio Nacional. El Ayuntamiento de Madrid ha aprobado esta mañana la ampliación del plan de sostenibilidad urbana "Madrid Verde 2030". La iniciativa, dotada con un presupuesto inicial de doce millones de euros, prevé la creación de tres nuevos corredores ecológicos que conectarán el parque del Retiro con la Casa de Campo. Según ha informado la consejera de Medio Ambiente, las obras comenzarán el próximo mes de mayo y se extenderán durante dieciocho meses. La medida no solo busca reducir la emisión de gases contaminantes en un quince por ciento, sino también fomentar la movilidad peatonal y el uso de la bicicleta. Sin embargo, las asociaciones de comerciantes del centro han expresado su preocupación por los posibles cortes de tráfico en arterias principales durante el periodo estival. Por su parte, la junta directiva del transporte público ha confirmado un refuerzo especial en las líneas de metro cinco y seis para mitigar el impacto en la circulación diaria.`,
    annotatedTranscript: [
      {
        speaker: 'Locutora RNE',
        text: 'Buenos días. Les transmitimos desde Radio Nacional. El Ayuntamiento de Madrid ha aprobado esta mañana la ampliación del plan de sostenibilidad urbana "Madrid Verde 2030".',
        timestamp: '00:00 - 00:15',
        note: 'Introducción de noticia con cadencia periodística estándar.'
      },
      {
        speaker: 'Locutora RNE',
        text: 'La iniciativa, dotada con un presupuesto inicial de doce millones de euros, prevé la creación de tres nuevos corredores ecológicos que conectarán el parque del Retiro con la Casa de Campo.',
        timestamp: '00:15 - 00:35',
        note: 'Dato numérico clave: 12 millones de euros y 3 corredores ecológicos.'
      },
      {
        speaker: 'Locutora RNE',
        text: 'Según ha informado la consejera de Medio Ambiente, las obras comenzarán el próximo mes de mayo y se extenderán durante dieciocho meses.',
        timestamp: '00:35 - 00:50',
        note: 'Inicio en mayo / duración 18 meses.'
      },
      {
        speaker: 'Locutora RNE',
        text: 'La medida no solo busca reducir la emisión de gases contaminantes en un quince por ciento, sino también fomentar la movilidad peatonal y el uso de la bicicleta.',
        timestamp: '00:50 - 01:10',
        note: 'Objetivo doble: -15% emisiones + transporte sostenible.'
      },
      {
        speaker: 'Locutora RNE',
        text: 'Sin embargo, las asociaciones de comerciantes del centro han expresado su preocupación por los posibles cortes de tráfico en arterias principales durante el periodo estival. Por su parte, la junta directiva del transporte público ha confirmado un refuerzo especial en las líneas de metro cinco y seis.',
        timestamp: '01:10 - 01:35',
        note: 'Contraste de opiniones: preocupación comercial vs refuerzo de metro.'
      }
    ],
    questions: [
      {
        id: 'q1_1',
        questionText: '¿Cuál es la inversión económica asignada al proyecto "Madrid Verde 2030"?',
        options: [
          'Ocho millones de euros.',
          'Doce millones de euros.',
          'Dieciocho millones de euros.'
        ],
        correctOptionIndex: 1,
        explanation: 'La locutora indica explícitamente: "dotada con un presupuesto inicial de doce millones de euros". El número 18 corresponde a la duración en meses de las obras, no al presupuesto.',
        targetedSkill: 'Extracción de datos cuantitativos específicos',
        transcriptRef: 'dotada con un presupuesto inicial de doce millones de euros'
      },
      {
        id: 'q1_2',
        questionText: '¿Qué áreas madrileñas estarán unidas mediante los nuevos corredores ecológicos?',
        options: [
          'El parque del Retiro y la Casa de Campo.',
          'La Plaza Mayor y el Palacio Real.',
          'El distrito centro y la estación de Atocha.'
        ],
        correctOptionIndex: 0,
        explanation: 'El texto afirma que los tres corredores "conectarán el parque del Retiro con la Casa de Campo".',
        targetedSkill: 'Comprensión de relaciones geográficas y espaciales',
        transcriptRef: 'conectarán el parque del Retiro con la Casa de Campo'
      },
      {
        id: 'q1_3',
        questionText: '¿Cuándo está previsto el inicio de los trabajos de construcción?',
        options: [
          'En el mes de mayo.',
          'Durante el periodo estival.',
          'Dentro de dieciocho meses.'
        ],
        correctOptionIndex: 0,
        explanation: 'Se especifica que "las obras comenzarán el próximo mes de mayo". Dieciocho meses es la duración total del proyecto.',
        targetedSkill: 'Identificación de marcos temporales precisos',
        transcriptRef: 'las obras comenzarán el próximo mes de mayo'
      },
      {
        id: 'q1_4',
        questionText: 'Además de disminuir los gases nocivos, ¿qué otro objetivo persigue el plan?',
        options: [
          'Prohibir por completo la circulación de vehículos privados.',
          'Impulsar el tránsito a pie y los desplazamientos en bicicleta.',
          'Construir nuevos aparcamientos subterráneos en el centro.'
        ],
        correctOptionIndex: 1,
        explanation: 'La emisión menciona "fomentar la movilidad peatonal y el uso de la bicicleta". No se menciona la prohibición total ni aparcamientos.',
        targetedSkill: 'Comprensión de metas secundarias del proyecto',
        transcriptRef: 'fomentar la movilidad peatonal y el uso de la bicicleta'
      },
      {
        id: 'q1_5',
        questionText: '¿Por qué manifiestan temor los comerciantes de la zona céntrica?',
        options: [
          'Por el incremento en los impuestos municipales de medio ambiente.',
          'Por la falta de iluminación en los parques públicos.',
          'Por las interrupciones del tráfico rodado durante el verano.'
        ],
        correctOptionIndex: 2,
        explanation: 'Los comerciantes están preocupados por "los posibles cortes de tráfico en arterias principales durante el periodo estival" (verano).',
        targetedSkill: 'Identificación de posturas y preocupaciones de actores sociales',
        transcriptRef: 'preocupación por los posibles cortes de tráfico en arterias principales'
      },
      {
        id: 'q1_6',
        questionText: '¿Qué medida complementaria implementará el transporte público?',
        options: [
          'La gratuidad de los billetes durante los fines de semana.',
          'El aumento de la frecuencia en las líneas 5 y 6 de metro.',
          'La creación de nuevas rutas de autobuses eléctricos.'
        ],
        correctOptionIndex: 1,
        explanation: 'El informe confirma "un refuerzo especial en las líneas de metro cinco y seis para mitigar el impacto".',
        targetedSkill: 'Reconocimiento de soluciones institucionales',
        transcriptRef: 'refuerzo especial en las líneas de metro cinco y seis'
      }
    ]
  },
  {
    id: 'listening_task_2_voicenote',
    title: 'Tarea 2: Nota de Voz Telefónica e Intercambio Informal',
    subtitle: 'Mensaje de audio entre amigos organizando una ruta de tapas en Sevilla',
    cefrLevel: 'B1',
    taskType: 'phone_voicenote',
    taskTypeLabel: 'Mensaje de Voz Telefónico (Pragmática Dialéctica)',
    region: 'Andalucía (Sevilla)',
    regionFlag: '🇪🇸',
    accentTitle: 'Español Andaluz Occidental (Dialectal Coloquial)',
    accentDescription: 'Habla coloquial fluida con aspiración/caída de consonantes finales (s, d intervocálica), acortamiento de palabras (pa\', cansao, esta\') y conectores coloquiales (oye, mira, o sea, pues nada).',
    phenomenaNotes: [
      'Pérdida de la -s final o aspiración en [h]: "las tapas" -> "la\' tapa\'".',
      'Elisión de la -d- intervocálica: "cansado" -> "cansa\'o", "quedado" -> "queda\'o".',
      'Apócope de preposiciones: "para" -> "pa\'", "donde" -> "onde".',
      'Muletillas andaluzas de apertura y cierre: "¡Oye, socio!", "pues nada, ya me dices".'
    ],
    ambientType: 'phone_cafeteria',
    durationSeconds: 80,
    transcript: `¡Oye, Guille! ¿Qué pasa, socio? Oye, te grabo este audio rapidito porque voy camino de la Alameda. Mira, te cuento: al final la mesa que teníamos apalabrá' en el bar de la esquina nos la han cambia'o pa' más tarde, porque tienen el local hasta arriba de gente. O sea, que en vez de quedar a las dos y media, ¿te parece bien si nos vemos a las tres y cuarto cerca de la iglesia de San Lorenzo? Es que Dani viene súper cansa'o del trabajo y prefiere pasar primero por casa pa' ducharse y cambiarse. Además, me ha dicho Rocío que en la taberna de enfrente tienen unas cazón en adobo y unas coquinas frescas recién traídas que están pa' chuparse los dedos. Yo ya voy con un hambre que me muero. Oye, avísame en cuanto escuches esto, ¿vale? Si no puedes a esa hora, dime algo y buscamos otro sitio por el centro. ¡Venga, un abrazo, nos vemos ahora!`,
    annotatedTranscript: [
      {
        speaker: 'Manolo (Sevilla)',
        text: '¡Oye, Guille! ¿Qué pasa, socio? Oye, te grabo este audio rapidito porque voy camino de la Alameda.',
        timestamp: '00:00 - 00:12',
        note: 'Saludo informal andaluz con tono amigable y directo.'
      },
      {
        speaker: 'Manolo (Sevilla)',
        text: 'Mira, te cuento: al final la mesa que teníamos apalabrá\' en el bar de la esquina nos la han cambia\'o pa\' más tarde, porque tienen el local hasta arriba de gente.',
        timestamp: '00:12 - 00:28',
        note: 'Cambio de planes: "apalabrá\'" (apalabrada) y "cambia\'o" (cambiada).'
      },
      {
        speaker: 'Manolo (Sevilla)',
        text: 'O sea, que en vez de quedar a las dos y media, ¿te parece bien si nos vemos a las tres y cuarto cerca de la iglesia de San Lorenzo?',
        timestamp: '00:28 - 00:45',
        note: 'Nueva hora: de 14:30 a 15:15 en San Lorenzo.'
      },
      {
        speaker: 'Manolo (Sevilla)',
        text: 'Es que Dani viene súper cansa\'o del trabajo y prefiere pasar primero por casa pa\' ducharse y cambiarse. Además, me ha dicho Rocío que en la taberna de enfrente tienen unas cazón en adobo y unas coquinas frescas...',
        timestamp: '00:45 - 01:05',
        note: 'Motivo del retraso (Dani cansado) y recomendación gastronómica.'
      },
      {
        speaker: 'Manolo (Sevilla)',
        text: 'Oye, avísame en cuanto escuches esto, ¿vale? Si no puedes a esa hora, dime algo y buscamos otro sitio por el centro. ¡Venga, un abrazo!',
        timestamp: '01:05 - 01:20',
        note: 'Solicitud de confirmación y cierre amigable.'
      }
    ],
    questions: [
      {
        id: 'q2_1',
        questionText: '¿Cuál es la razón principal por la que se modifica el plan inicial?',
        options: [
          'El bar original está completamente lleno y cambiaron la reserva.',
          'Guille no puede llegar a tiempo al centro de la ciudad.',
          'Manolo equivocó la ubicación de la taberna de tapas.'
        ],
        correctOptionIndex: 0,
        explanation: 'Manolo explica que "la mesa que teníamos apalabrá\'... nos la han cambia\'o... porque tienen el local hasta arriba de gente".',
        targetedSkill: 'Comprensión de la causa del cambio de planes',
        transcriptRef: 'tienen el local hasta arriba de gente'
      },
      {
        id: 'q2_2',
        questionText: '¿A qué hora propone Manolo reunirse finalmente?',
        options: [
          'A las dos y media (14:30).',
          'A las tres en punto (15:00).',
          'A las tres y cuarto (15:15).'
        ],
        correctOptionIndex: 2,
        explanation: 'Plantea exactamente: "en vez de quedar a las dos y media, ¿te parece bien si nos vemos a las tres y cuarto?".',
        targetedSkill: 'Decodificación de horarios y ajustes temporales',
        transcriptRef: 'nos vemos a las tres y cuarto'
      },
      {
        id: 'q2_3',
        questionText: '¿Por qué necesita Dani ir antes a su vivienda?',
        options: [
          'Porque debe recoger las llaves del coche.',
          'Porque termina exhausto del trabajo y quiere ducharse.',
          'Porque olvidó su cartera y la documentación.'
        ],
        correctOptionIndex: 1,
        explanation: 'Dice: "Dani viene súper cansa\'o del trabajo y prefiere pasar primero por casa pa\' ducharse y cambiarse".',
        targetedSkill: 'Identificación de motivos personales de terceros',
        transcriptRef: 'Dani viene súper cansa\'o del trabajo y prefiere pasar primero por casa'
      },
      {
        id: 'q2_4',
        questionText: '¿Qué especialidad gastronómica ha recomendado Rocío?',
        options: [
          'Paella marinera y calamares fritos.',
          'Cazón en adobo y coquinas frescas.',
          'Gazpacho andaluz y jamón ibérico.'
        ],
        correctOptionIndex: 1,
        explanation: 'Se menciona explícitamente: "me ha dicho Rocío que en la taberna de enfrente tienen unas cazón en adobo y unas coquinas frescas".',
        targetedSkill: 'Reconocimiento de léxico regional gastronómico',
        transcriptRef: 'cazón en adobo y unas coquinas frescas'
      },
      {
        id: 'q2_5',
        questionText: 'En el habla de Manolo, ¿qué significa la expresión "hasta arriba de gente"?',
        options: [
          'Que el establecimiento está totalmente abarrotado.',
          'Que las personas están en la planta superior del edificio.',
          'Que los clientes son gente muy importante o de clase alta.'
        ],
        correctOptionIndex: 0,
        explanation: '"Estar hasta arriba de gente" es una locución idiolectal que indica que un lugar está completamente lleno sin capacidad libre.',
        targetedSkill: 'Interpretación de frases hechas y modismos informales',
        transcriptRef: 'tienen el local hasta arriba de gente'
      },
      {
        id: 'q2_6',
        questionText: '¿Qué actitud demuestra Manolo al finalizar su mensaje de audio?',
        options: [
          'Molestia e impaciencia por los inconvenientes surgidos.',
          'Flexibilidad para negociar otra hora o lugar si a Guille no le conviene.',
          'Exigencia estricta de llegar puntual al punto fijado.'
        ],
        correctOptionIndex: 1,
        explanation: 'Aclara abiertamente: "Si no puedes a esa hora, dime algo y buscamos otro sitio por el centro".',
        targetedSkill: 'Evaluación del tono pragmático y flexibilidad comunicativa',
        transcriptRef: 'Si no puedes a esa hora, dime algo y buscamos otro sitio'
      }
    ]
  },
  {
    id: 'listening_task_3_lecture',
    title: 'Tarea 3: Conferencia Universitaria y Apuntes',
    subtitle: 'Extracto de clase magistral sobre Sociolingüística y Contacto de Lenguas',
    cefrLevel: 'C1',
    taskType: 'lecture_consultation',
    taskTypeLabel: 'Conferencia Académica con Toma de Notas (DELE C1 Tarea 3)',
    region: 'México (CDMX / UNAM)',
    regionFlag: '🇲🇽',
    accentTitle: 'Español Mexicano Académico Culto',
    accentDescription: 'Elocución formal, clara y pausada con entonación melódica característica del centro de México. Uso denso de conectores discursivos de nivel superior, léxico abstracto y pausas estructuradas.',
    phenomenaNotes: [
      'Entonación descendente suave al final de los enunciados.',
      'Claridad absoluta en la pronunciación de consonantes compuestas.',
      'Marcadores discursivos académicos: "cabe señalar", "en última instancia", "por consiguiente", "desde esta perspectiva".'
    ],
    ambientType: 'lecture_hall',
    durationSeconds: 120,
    transcript: `Buenas tardes a todos. En la sesión de hoy analizaremos el fenómeno del préstamo lingüístico y la interferencia léxica en las comunidades hispanohablantes de frontera. Es fundamental, antes que nada, establecer una distinción conceptual rigurosa entre dos procesos que con frecuencia se confunden: la alternancia de código, o "code-switching", y la adopción léxica simplificada. Mientras que la alternancia de código implica un dominio pragmático avanzado de ambas estructuras sintácticas por parte del hablante, el préstamo integrado responde generalmente a una necesidad denominativa inmediata, cuando la lengua receptora carece de un equivalente exacto para una innovación tecnológica o cultural. Tomemos como ejemplo el término "escáner" o los verbos derivados en la era digital. La investigación sociolingüística reciente llevada a cabo en la UNAM demuestra que el noventa y dos por ciento de estos préstamos no debilitan la estructura morfológica del español, sino que, por el contrario, son asimilados siguiendo los patrones de conjugación tradicionales de la primera conjugación en "-ar". Cabe señalar, por consiguiente, que el dinamismo de una lengua no debe interpretarse como una degradación, sino como un síntoma de vitalidad comunicativa.`,
    annotatedTranscript: [
      {
        speaker: 'Dr. Ramírez (UNAM)',
        text: 'Buenas tardes a todos. En la sesión de hoy analizaremos el fenómeno del préstamo lingüístico y la interferencia léxica en las comunidades hispanohablantes de frontera.',
        timestamp: '00:00 - 00:20',
        note: 'Presentación del tema: préstamos e interferencia léxica.'
      },
      {
        speaker: 'Dr. Ramírez (UNAM)',
        text: 'Es fundamental establecer una distinción conceptual rigurosa entre dos procesos: la alternancia de código ("code-switching") y la adopción léxica simplificada.',
        timestamp: '00:20 - 00:45',
        note: 'Distinción clave entre code-switching y préstamo.'
      },
      {
        speaker: 'Dr. Ramírez (UNAM)',
        text: 'Mientras que la alternancia implica un dominio pragmático avanzado de ambas estructuras, el préstamo responde a una necesidad denominativa inmediata ante vacíos léxicos.',
        timestamp: '00:45 - 01:10',
        note: 'Causa del préstamo: necesidad denominativa por falta de término equivalente.'
      },
      {
        speaker: 'Dr. Ramírez (UNAM)',
        text: 'La investigación sociolingüística de la UNAM demuestra que el 92% de estos préstamos son asimilados siguiendo los patrones de la primera conjugación en "-ar".',
        timestamp: '01:10 - 01:35',
        note: 'Dato empírico: 92% se adaptan a verbos en -ar.'
      },
      {
        speaker: 'Dr. Ramírez (UNAM)',
        text: 'Cabe señalar que el dinamismo de una lengua no debe interpretarse como degradación, sino como un síntoma de vitalidad comunicativa.',
        timestamp: '01:35 - 02:00',
        note: 'Conclusión teórica: dinamismo como signo de vitalidad.'
      }
    ],
    notesPrompt: 'Completa tu esquema de apuntes académicos identificando: 1) Definición de préstamo frente a alternancia, 2) Porcentaje de asimilación según la UNAM, y 3) Conclusión del profesor sobre la evolución idiomática.',
    questions: [
      {
        id: 'q3_1',
        questionText: 'Según el ponente, ¿cuál es la diferencia crucial entre la alternancia de código y el préstamo léxico?',
        options: [
          'La alternancia de código requiere un dominio fluido y bidireccional de ambas gramáticas.',
          'El préstamo léxico solo se produce en personas sin educación formal.',
          'La alternancia de código está prohibida por las academias de la lengua.'
        ],
        correctOptionIndex: 0,
        explanation: 'El profesor señala explícitamente que la alternancia de código "implica un dominio pragmático avanzado de ambas estructuras sintácticas por parte del hablante".',
        targetedSkill: 'Comprensión de distinciones teóricas académicas',
        transcriptRef: 'alternancia de código implica un dominio pragmático avanzado de ambas estructuras'
      },
      {
        id: 'q3_2',
        questionText: '¿Qué desencadena habitualmente la adopción de un préstamo en la lengua receptora?',
        options: [
          'La imposición gubernamental de leyes lingüísticas.',
          'La urgencia de nombrar una realidad o innovación tecnológica sin equivalente previo.',
          'El rechazo intencionado a utilizar las palabras nativas existentes.'
        ],
        correctOptionIndex: 1,
        explanation: 'Se especifica que el préstamo "responde generalmente a una necesidad denominativa inmediata, cuando la lengua receptora carece de un equivalente exacto".',
        targetedSkill: 'Identificación de causales en discursos científicos',
        transcriptRef: 'responde generalmente a una necesidad denominativa inmediata'
      },
      {
        id: 'q3_3',
        questionText: '¿Qué dato aporta el estudio de la UNAM respecto a los verbos importados?',
        options: [
          'El 92% son rechazados por los hispanohablantes mayores de 50 años.',
          'El 92% se adaptan morfológicamente incorporándose a la conjugación en "-ar".',
          'El 92% provocan errores graves en la sintaxis de las oraciones complejas.'
        ],
        correctOptionIndex: 1,
        explanation: 'El texto afirma que "el noventa y dos por ciento... son asimilados siguiendo los patrones de conjugación tradicionales de la primera conjugación en -ar".',
        targetedSkill: 'Retención e interpretación de evidencia empírica en conferencias',
        transcriptRef: 'el noventa y dos por ciento de estos préstamos... son asimilados siguiendo los patrones de conjugación'
      },
      {
        id: 'q3_4',
        questionText: '¿Cuál es la tesis final sostenida por el profesor sobre la evolución de los idiomas?',
        options: [
          'Que el ingreso de extranjerismos destruye la identidad cultural de los pueblos.',
          'Que el cambio lingüístico constante es reflejo de riqueza y vitalidad comunicativa.',
          'Que la Real Academia Española debería unificar los criterios gramaticales urgentes.'
        ],
        correctOptionIndex: 1,
        explanation: 'Sostiene que "el dinamismo de una lengua no debe interpretarse como una degradación, sino como un síntoma de vitalidad comunicativa".',
        targetedSkill: 'Síntesis de la postura o tesis del ponente',
        transcriptRef: 'no debe interpretarse como una degradación, sino como un síntoma de vitalidad comunicativa'
      },
      {
        id: 'q3_5',
        questionText: '¿Qué conector discursivo utiliza el profesor para introducir la investigación de la UNAM?',
        options: [
          'Por otra parte...',
          'Tomemos como ejemplo...',
          'Sin ir más lejos...'
        ],
        correctOptionIndex: 1,
        explanation: 'El profesor dice: "Tomemos como ejemplo el término escáner... La investigación sociolingüística reciente llevada a cabo en la UNAM...".',
        targetedSkill: 'Reconocimiento de marcadores de ejemplificación',
        transcriptRef: 'Tomemos como ejemplo el término escáner'
      },
      {
        id: 'q3_6',
        questionText: 'En el contexto de la ponencia, ¿qué connota el término "necesidad denominativa"?',
        options: [
          'La obligación de poner nombre a conceptos nuevos para poder comunicarse eficazmente.',
          'La exigencia administrativa de bautizar un nuevo departamento de la universidad.',
          'El deseo arbitrario de inventar palabras complicadas en un examen.'
        ],
        correctOptionIndex: 0,
        explanation: 'La "necesidad denominativa" se refiere al requerimiento comunicativo de designar un objeto, concepto o innovación que carecía de nombre preexistente en la lengua.',
        targetedSkill: 'Interpretación semántica en registro formal y de especialidad',
        transcriptRef: 'necesidad denominativa inmediata'
      }
    ]
  }
];
