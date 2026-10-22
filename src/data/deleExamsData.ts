import { DELEExam } from '../types/dele';

export const DELE_B2_EXAM: DELEExam = {
  id: 'dele-b2-oficial-1',
  title: 'DELE B2 - Examen Oficial de Comprensión de Lectura',
  level: 'B2',
  subtitle: 'Prueba de Comprensión de Lectura (Instituto Cervantes)',
  description: 'Examen oficial cronometrado según las directrices del Instituto Cervantes. Evalúa la comprensión de textos complejos, reconstrucción textual, análisis de opiniones y precisión léxico-gramatical.',
  timeLimitMinutes: 70,
  totalItems: 36, // 6 + 10 + 6 + 14 = 36 items
  tarea1: {
    title: 'Tarea 1: Texto Informativo Complejo',
    instructions: 'Lea el siguiente texto informativo sobre innovación urbana y sostenibilidad. A continuación, responda a las 6 preguntas eligiendo la opción correcta (A, B o C).',
    textTitle: 'La transformación ecológica de las ciudades mediterráneas: El modelo de las supermanzanas',
    textSubtitle: 'Un análisis de la reestructuración urbana en el área metropolitana de Barcelona y sus efectos medioambientales',
    paragraphs: [
      'Durante la última década, las grandes urbes mediterráneas han afrontado un desafío sin precedentes debido al incremento sostenido de los niveles de contaminación atmosférica y acústica. En respuesta a esta crisis de habitabilidad, diversas administraciones locales han implementado el modelo conceptual denominado "supermanzanas" (superilles), una estrategia de diseño urbano que busca pacificar el tráfico rodado e intensificar el espacio dedicado al peatón y a las zonas verdes.',
      'El principio estructural de una supermanzana consiste en agrupar una red de tres por tres manzanas de viviendas tradicionales, restringiendo el tráfico motorizado de paso en el interior de dicho perímetro. Los vehículos de residentes, servicios de emergencia y repartos comerciales pueden acceder únicamente a una velocidad máxima de diez kilómetros por hora. Esta restricción ha permitido liberar más del setenta por ciento del suelo antes dominado por el asfalto, transformándolo en espacios comunitarios equipados con arbolado, huertos urbanos y mobiliario ergonómico.',
      'Sin embargo, la implantación de este modelo no ha estado exenta de encendidas controversias sociopolíticas. Por un lado, las asociaciones de comerciantes del centro urbano expresaron inicialmente serias reticencias, argumentando que la dificultad para el estacionamiento de clientes externos reduciría drásticamente la facturación del pequeño comercio. No obstante, los análisis económicos posteriores revelaron un fenómeno inesperado: la afluencia de viandantes aumentó un treinta y cinco por ciento, lo que derivó en un repunte notable del consumo de cercanía y en la apertura de nuevos establecimientos de hostelería ecológica.',
      'Desde el punto de vista de la salud pública, la Agencia de Salud Pública ha constatado una reducción media del veinticinco por ciento en las concentraciones de dióxido de nitrógeno (NO2) en las áreas reestructuradas, así como un descenso de hasta cinco decibelios en los niveles de ruido ambiental. Estos indicadores coinciden con una disminución perceptible del estrés crónico entre los vecinos de edad avanzada y un incremento del ejercicio físico diario en la población infantil.',
      'A pesar de los incuestionables beneficios medioambientales, algunos sociólogos advierten sobre el riesgo inminente de la "gentrificación verde". La notable mejora en la calidad de vida urbana ha provocado un encarecimiento progresivo del precio del suelo y de los alquileres residenciales en el interior de las supermanzanas, empujando a familias de rentas medias y bajas hacia la periferia menos acondicionada. Los expertos recalcan la urgencia de acompañar estas reformas físicas con políticas públicas de vivienda protegida para garantizar una equidad social duradera.',
      'En conclusión, el modelo de supermanzana se perfila como un referente internacional de regeneración urbana exportable a otras metrópolis europeas y latinoamericanas. La clave de su sostenibilidad futura no residirá únicamente en la ingeniería técnica del tráfico, sino en la capacidad de las instituciones de armonizar la conservación medioambiental con la cohesión socioeconómica de los barrios.'
    ],
    questions: [
      {
        id: 'b2-t1-q1',
        questionNumber: 1,
        text: 'Según el primer párrafo, la razón principal para adoptar el modelo de supermanzanas fue:',
        options: [
          { key: 'A', text: 'El continuo crecimiento demográfico del centro metropolitano.' },
          { key: 'B', text: 'La necesidad de mitigar los severos problemas de contaminación en la ciudad.' },
          { key: 'C', text: 'La exigencia de crear nuevas vías rápidas para el transporte masivo.' }
        ],
        correctAnswer: 'B',
        explanation: 'En el primer párrafo se menciona explícitamente que el modelo surge "en respuesta a esta crisis de habitabilidad" provocada por "el incremento sostenido de los niveles de contaminación atmosférica y acústica".'
      },
      {
        id: 'b2-t1-q2',
        questionNumber: 2,
        text: 'En el interior de una supermanzana, el tránsito de automóviles:',
        options: [
          { key: 'A', text: 'Está prohibido de forma absoluta para todo tipo de vehículos.' },
          { key: 'B', text: 'Se mantiene igual pero exige el pago de un peaje de acceso.' },
          { key: 'C', text: 'Queda limitado a ciertos usuarios bajo una restricción de velocidad estricta.' }
        ],
        correctAnswer: 'C',
        explanation: 'El texto indica que "Los vehículos de residentes, servicios de emergencia y repartos comerciales pueden acceder únicamente a una velocidad máxima de diez kilómetros por hora".'
      },
      {
        id: 'b2-t1-q3',
        questionNumber: 3,
        text: '¿Qué actitud inicial mantuvieron los comerciantes locales respecto al proyecto?',
        options: [
          { key: 'A', text: 'Rechazo por temor a perder ventas debido al menor acceso de vehículos.' },
          { key: 'B', text: 'Apoyo entusiasta por el subsidio estatal que recibirían.' },
          { key: 'C', text: 'Indiferencia absoluta hasta la finalización de las obras.' }
        ],
        correctAnswer: 'A',
        explanation: 'El texto señala que expresaron "serias reticencias, argumentando que la dificultad para el estacionamiento de clientes externos reduciría drásticamente la facturación".'
      },
      {
        id: 'b2-t1-q4',
        questionNumber: 4,
        text: 'Los estudios económicos posteriores demostraron que la creación de supermanzanas:',
        options: [
          { key: 'A', text: 'Provocó el cierre masivo de tiendas tradicionales en favor de grandes cadenas.' },
          { key: 'B', text: 'Dificultó el abastecimiento de productos frescos de proximidad.' },
          { key: 'C', text: 'Fomentó el paso de peatones y dinamizó el comercio local de la zona.' }
        ],
        correctAnswer: 'C',
        explanation: 'Se señala que "la afluencia de viandantes aumentó un treinta y cinco por ciento, lo que derivó en un repunte notable del consumo de cercanía".'
      },
      {
        id: 'b2-t1-q5',
        questionNumber: 5,
        text: 'El fenómeno de la "gentrificación verde" mencionado en el quinto párrafo implica:',
        options: [
          { key: 'A', text: 'El rechazo de los vecinos a cuidar los huertos comunitarios.' },
          { key: 'B', text: 'El aumento de precios inmobiliarios que desplaza a residentes con menos recursos.' },
          { key: 'C', text: 'La sustitución de arbolado nativo por especies vegetales exóticas.' }
        ],
        correctAnswer: 'B',
        explanation: 'El texto define el riesgo como "un encarecimiento progresivo del precio del suelo y de los alquileres... empujando a familias de rentas medias y bajas hacia la periferia".'
      },
      {
        id: 'b2-t1-q6',
        questionNumber: 6,
        text: 'En la conclusión, el autor sostiene que el éxito duradero del modelo depende de:',
        options: [
          { key: 'A', text: 'Aumentar las sanciones económicas a los conductores infractores.' },
          { key: 'B', text: 'Combinar la mejora del medio ambiente con medidas de equilibrio social.' },
          { key: 'C', text: 'Exportar la patente técnica antes de modificar otras ciudades.' }
        ],
        correctAnswer: 'B',
        explanation: 'La frase final subraya la importancia de "armonizar la conservación medioambiental con la cohesión socioeconómica de los barrios".'
      }
    ]
  },
  tarea2: {
    title: 'Tarea 2: Correspondencia de Comentarios / Opiniones',
    instructions: 'Lea las 4 reseñas escritas por distintos profesionales sobre la implementación del teletrabajo y la desconexión digital (A, B, C y D). A continuación, relacione cada una de las 10 afirmaciones con la persona correspondiente. Cada persona puede ser seleccionada más de una vez.',
    people: [
      {
        id: 'persona-a',
        letter: 'A',
        name: 'Dra. Marta Benítez',
        tagline: 'Especialista en Salud Laboral y Ergonomía',
        text: 'El trabajo remoto ha eliminado el desgaste físico asociado a los desplazamientos diarios, pero ha generado un problema invisible más grave: la difuminación total de las fronteras psicológicas entre el espacio personal y el entorno profesional. Detecto un incremento preocupante de trastornos del sueño e hipervigilancia por la recepción constante de notificaciones fuera de horario. Es imperativo tipificar legislativamente el derecho a la desconexión estricta y obligar a las empresas a desactivar servidores de correo durante los fines de semana.'
      },
      {
        id: 'persona-b',
        letter: 'B',
        name: 'Carlos Santillana',
        tagline: 'Director de Recursos Humanos en Consultoría',
        text: 'Desde la perspectiva organizativa, el teletrabajo ha demostrado disparar los índices de productividad y permitirnos contratar talento sin barreras geográficas. Sin embargo, no podemos ignorar la pérdida paulatina de la cultura corporativa y la dificultad para cohesionar equipos jóvenes. No creo en prohibiciones drásticas ni en apagar servidores; la clave está en capacitar a los mandos intermedios para que gestionen por objetivos evaluables y no por horas de presencia en pantalla.'
      },
      {
        id: 'persona-c',
        letter: 'C',
        name: 'Lucía Alarcón',
        tagline: 'Desarrolladora Senior de Software',
        text: 'Llevo cinco años trabajando al cien por cien a distancia para una multinacional y no volvería jamás a una oficina tradicional. La flexibilidad para conciliar el cuidado de mis hijos con las entregas de proyectos es inigualable. Para mí, la responsabilidad del descanso recae en el propio profesional: basta con silenciar el móvil de empresa al terminar la jornada. Pretender que el Estado controle los horarios individuales es una injerencia innecesaria en la autonomía individual.'
      },
      {
        id: 'persona-d',
        letter: 'D',
        name: 'Javier Oteiza',
        tagline: 'Representante Sindical de Servicios',
        text: 'El discurso de la flexibilidad individual es una trampa si no hay un convenio colectivo fuerte que proteja al trabajador más vulnerable. Constantemente recibimos denuncias de empleados que asumen de su propio bolsillo los costes energéticos y de banda ancha de sus hogares mientras las empresas reducen costes de oficina. Exigimos una auditoría transparente del teletrabajo y una compensación económica fija por gastos derivados del puesto en casa.'
      }
    ],
    statements: [
      {
        id: 'b2-t2-s1',
        statementNumber: 7,
        text: 'Opina que la legislación no debe intervenir en los hábitos de descanso personal del trabajador.',
        correctPersonId: 'persona-c',
        explanation: 'Lucía Alarcón sostiene que "Pretender que el Estado controle los horarios individuales es una injerencia innecesaria".'
      },
      {
        id: 'b2-t2-s2',
        statementNumber: 8,
        text: 'Pone de relieve los efectos perjudiciales del uso continuo de dispositivos en el bienestar psicológico.',
        correctPersonId: 'persona-a',
        explanation: 'Marta Benítez destaca trastornos del sueño e hipervigilancia por notificaciones constantes.'
      },
      {
        id: 'b2-t2-s3',
        statementNumber: 9,
        text: 'Advierte que el trabajo a distancia dificulta la consolidación del sentimiento de pertenencia en la empresa.',
        correctPersonId: 'persona-b',
        explanation: 'Carlos Santillana señala "la pérdida paulatina de la cultura corporativa y la dificultad para cohesionar equipos".'
      },
      {
        id: 'b2-t2-s4',
        statementNumber: 10,
        text: 'Reclama que las organizaciones abonen los suministros del hogar ocasionados por el trabajo remoto.',
        correctPersonId: 'persona-d',
        explanation: 'Javier Oteiza exige "una compensación económica fija por gastos derivados del puesto en casa".'
      },
      {
        id: 'b2-t2-s5',
        statementNumber: 11,
        text: 'Sugiere que el rendimiento laboral debe evaluarse mediante resultados concretos y no por presencia.',
        correctPersonId: 'persona-b',
        explanation: 'Carlos Santillana afirma que la clave está en "gestionar por objetivos evaluables y no por horas de presencia".'
      },
      {
        id: 'b2-t2-s6',
        statementNumber: 12,
        text: 'Propone apagar los sistemas de mensajería empresarial de manera automatizada fuera del horario laboral.',
        correctPersonId: 'persona-a',
        explanation: 'Marta Benítez aboga por "obligar a las empresas a desactivar servidores de correo durante los fines de semana".'
      },
      {
        id: 'b2-t2-s7',
        statementNumber: 13,
        text: 'Valora muy positivamente la posibilidad de compaginar la vida familiar con los compromisos profesionales.',
        correctPersonId: 'persona-c',
        explanation: 'Lucía Alarcón destaca la "flexibilidad para conciliar el cuidado de mis hijos con las entregas de proyectos".'
      },
      {
        id: 'b2-t2-s8',
        statementNumber: 14,
        text: 'Critica que las corporaciones ahorren costes inmobiliarios a expensas del presupuesto doméstico del empleado.',
        correctPersonId: 'persona-d',
        explanation: 'Javier Oteiza señala que las empresas reducen costes mientras el trabajador asume gastos energéticos y de internet.'
      },
      {
        id: 'b2-t2-s9',
        statementNumber: 15,
        text: 'Menciona la posibilidad de reclutar personal cualificado sin limitaciones de origen geográfico.',
        correctPersonId: 'persona-b',
        explanation: 'Carlos Santillana indica que el teletrabajo permite "contratar talento sin barreras geográficas".'
      },
      {
        id: 'b2-t2-s10',
        statementNumber: 16,
        text: 'Considera que la autorregulación individual del móvil basta para desconectar tras el trabajo.',
        correctPersonId: 'persona-c',
        explanation: 'Lucía Alarcón afirma que "basta con silenciar el móvil de empresa al terminar la jornada".'
      }
    ]
  },
  tarea3: {
    title: 'Tarea 3: Reconstrucción de Texto (Inserción de Fragmentos)',
    instructions: 'Lea el siguiente artículo sobre arqueología submarina al que se le han extraído 6 fragmentos. A continuación, seleccione de la lista de oraciones (A–H) el fragmento que corresponde a cada hueco (17–22). Recuerde que hay 2 fragmentos sobrantes que no corresponden a ningún hueco.',
    textTitle: 'El misterio de los galeones hundidos en la Costa de la Luz',
    segments: [
      {
        type: 'text',
        content: 'La arqueología submarina en las costas del suroeste peninsular vive un momento de esplendor histórico gracias a las nuevas tecnologías de escaneo sonográfico. Durante siglos, las corrientes del Golfo de Cádiz provocaron el naufragio de decenas de navíos comerciales que regresaban del continente americano cargados de mercancías valiosas.'
      },
      { type: 'gap', gapIndex: 1 },
      {
        type: 'text',
        content: 'Recientemente, un equipo multidisciplinar del Instituto Español de Oceanografía localizó a cuarenta metros de profundidad los restos casi intactos del galeón "Nuestra Señora de la Encarnación", hundido en 1708. Lo extraordinario de este hallazgo no es solo la conservación de la estructura de madera de roble, sino el estado del cargamento de bodegas.'
      },
      { type: 'gap', gapIndex: 2 },
      {
        type: 'text',
        content: 'Los investigadores aplicaron fotogrametría tridimensional de alta resolución para cartografiar cada pieza sin necesidad de alterar el frágil ecosistema marino que las recubre. A diferencia de las expediciones del siglo pasado, caracterizadas por extracciones masivas y destructivas, la metodología científica actual prioriza la conservación in situ.'
      },
      { type: 'gap', gapIndex: 3 },
      {
        type: 'text',
        content: 'Este cambio de paradigma responde a los estrictos protocolos fijados por la UNESCO en la Convención sobre la Protección del Patrimonio Cultural Subacuático. Gracias a estas directrices, las piezas solo se extraen del lecho marino si existe un riesgo inminente de espolio por cazatesoros o si se garantiza un proceso posterior de desalinización en laboratorios especializados.'
      },
      { type: 'gap', gapIndex: 4 },
      {
        type: 'text',
        content: 'Uno de los mayores retos de la expedición radicaba en la escasa visibilidad del agua causada por las mareas vivas y la constante suspensión de sedimentos arcillosos. Para paliar este obstáculo, los ingenieros adaptaron un sistema de iluminación multiespectral montado sobre vehículos operados remotamente (ROV).'
      },
      { type: 'gap', gapIndex: 5 },
      {
        type: 'text',
        content: 'Los datos recopilados por estos robots submarinos se transmiten en tiempo real a una plataforma digital pública de acceso abierto. De este modo, estudiantes e investigadores de todo el mundo pueden explorar virtualmente el yacimiento en tres dimensiones como si estuvieran sumergidos.'
      },
      { type: 'gap', gapIndex: 6 },
      {
        type: 'text',
        content: 'En los próximos meses, el Centro de Arqueología Subacuática inaugurará una exposición interactiva basándose en estas recreaciones digitales, consolidando un hito sin precedentes en la divulgación patrimonial.'
      }
    ],
    sentenceBank: [
      {
        id: 'opt-a',
        letter: 'A',
        text: 'Entre los objetos recuperados destacan lingotes de plata peruana, cerámica fina de Talavera y miles de monedas con el sello real intacto.'
      },
      {
        id: 'opt-b',
        letter: 'B',
        text: 'Sin embargo, la gran mayoría de estos yacimientos permanecía sumergida e inexplorada debido a la falta de instrumentación adecuada.'
      },
      {
        id: 'opt-c',
        letter: 'C',
        text: 'Este dispositivo permitió capturar imágenes nítidas de los detalles ornamentales del casco que antes resultaban completamente invisibles.'
      },
      {
        id: 'opt-d',
        letter: 'D',
        text: 'Cualquier inmersión recreativa no autorizada en esta franja marítima está castigada con penas de prisión por la legislación vigente.'
      },
      {
        id: 'opt-e',
        letter: 'E',
        text: 'De esta manera, el yacimiento se preserva intacto para las futuras generaciones mientras se estudia meticulosamente su contexto.'
      },
      {
        id: 'opt-f',
        letter: 'F',
        text: 'Dicho tratamiento químico de desalinización puede demorarse hasta dos años para evitar el colapso celular de los materiales orgánicos.'
      },
      {
        id: 'opt-g',
        letter: 'G',
        text: 'Esta iniciativa de democratización científica ha recibido el aplauso unánime de las instituciones educativas internacionales.'
      },
      {
        id: 'opt-h',
        letter: 'H',
        text: 'Los costes económicos de construir réplicas a tamaño real obligaron a suspender las campañas anteriores.'
      }
    ],
    correctGaps: {
      1: 'opt-b',
      2: 'opt-a',
      3: 'opt-e',
      4: 'opt-f',
      5: 'opt-c',
      6: 'opt-g'
    },
    explanations: {
      1: 'El fragmento B da continuidad contrastiva a la presencia histórica de navíos explicando por qué permanecían inexplorados.',
      2: 'El fragmento A especifica exactamente qué tipo de objetos valiosos contenían las bodegas del galeón encarnación.',
      3: 'El fragmento E concluye la idea de priorizar la "conservación in situ" sin alterar el ecosistema.',
      4: 'El fragmento F conecta directamente con la mención de la "desalinización en laboratorios especializados" al final del párrafo previo.',
      5: 'El fragmento C se refiere directamente al "sistema de iluminación multiespectral" instalado en los ROV para superar la mala visibilidad.',
      6: 'El fragmento G sintetiza el impacto de la "plataforma digital pública de acceso abierto" descrita en el párrafo antecedente.'
    }
  },
  tarea4: {
    title: 'Tarea 4: Prueba Cloze de Opción Múltiple (Gramática y Léxico)',
    instructions: 'Lea el siguiente texto en el que faltan 14 palabras o expresiones. Seleccione para cada espacio (23–36) la opción correcta (A, B o C).',
    textTitle: 'El renacimiento del aceite de oliva virgen extra en la gastronomía global',
    segments: [
      {
        type: 'text',
        content: 'El aceite de oliva virgen extra ha dejado de ser un mero ingrediente mediterráneo para convertirse en un objeto de culto gastronómico '
      },
      { type: 'cloze', itemNumber: 23 },
      {
        type: 'text',
        content: ' internacional. Este fenómeno se debe, '
      },
      { type: 'cloze', itemNumber: 24 },
      {
        type: 'text',
        content: ', a los rigurosos análisis científicos que avalan sus propiedades cardioprotectoras. Diversos estudios han demostrado que su consumo diario '
      },
      { type: 'cloze', itemNumber: 25 },
      {
        type: 'text',
        content: ' prevenir enfermedades crónicas, siempre que se '
      },
      { type: 'cloze', itemNumber: 26 },
      {
        type: 'text',
        content: ' de aceites de extracción en frío de alta pureza. No obstante, el mercado se enfrenta a grandes desafíos debido '
      },
      { type: 'cloze', itemNumber: 27 },
      {
        type: 'text',
        content: ' severas sequías que han azotado a los olivares de Jaén y Córdoba durante las últimas cosechas. Esta escasez ha provocado un incremento drástico en los precios de origen, '
      },
      { type: 'cloze', itemNumber: 28 },
      {
        type: 'text',
        content: ' que muchos consumidores se vean obligados a recurrir a grasas alternativas. A pesar de '
      },
      { type: 'cloze', itemNumber: 29 },
      {
        type: 'text',
        content: ' encarecimiento, los grandes chefs insisten '
      },
      { type: 'cloze', itemNumber: 30 },
      {
        type: 'text',
        content: ' que no existe ningún sustituto capaz de igualar la complejidad aromática del zumo de aceituna. '
      },
      { type: 'cloze', itemNumber: 31 },
      {
        type: 'text',
        content: ' los esfuerzos promocionales, aún queda un largo camino por recorrer para instruir al público '
      },
      { type: 'cloze', itemNumber: 32 },
      {
        type: 'text',
        content: ' las diferencias organolépticas entre un aceite virgen y uno refinado. Es fundamental que el etiquetado sea claro '
      },
      { type: 'cloze', itemNumber: 33 },
      {
        type: 'text',
        content: ' de evitar fraudes comerciales. En este sentido, los productores abogan '
      },
      { type: 'cloze', itemNumber: 34 },
      {
        type: 'text',
        content: ' una regulación uniforme que proteja la denominación de origen protegida. Solo '
      },
      { type: 'cloze', itemNumber: 35 },
      {
        type: 'text',
        content: ' se logre blindar la autenticidad del producto, el sector podrá consolidar '
      },
      { type: 'cloze', itemNumber: 36 },
      {
        type: 'text',
        content: ' liderazgo indiscutible en los mercados asiáticos y norteamericanos.'
      }
    ],
    items: [
      {
        itemNumber: 23,
        options: [
          { key: 'A', text: 'a nivel' },
          { key: 'B', text: 'en base' },
          { key: 'C', text: 'de cara' }
        ],
        correctAnswer: 'A',
        grammarFocus: 'Locución prepositiva escalar ("a nivel internacional")',
        explanation: '"a nivel internacional" es la expresión adecuada para ámbito o dimensión geográfica.'
      },
      {
        itemNumber: 24,
        options: [
          { key: 'A', text: 'en gran medida' },
          { key: 'B', text: 'a la fuerza' },
          { key: 'C', text: 'de memoria' }
        ],
        correctAnswer: 'A',
        grammarFocus: 'Marcador discursivo causal/cuantitativo',
        explanation: '"en gran medida" expresa que la causa principal se debe a los análisis científicos.'
      },
      {
        itemNumber: 25,
        options: [
          { key: 'A', text: 'consigue' },
          { key: 'B', text: 'contribuye a' },
          { key: 'C', text: 'insiste en' },
        ],
        correctAnswer: 'B',
        grammarFocus: 'Régimen verbal preposicional ("contribuir a + infinitivo")',
        explanation: 'El verbo "contribuir" rige la preposición "a" delante de un infinitivo ("contribuye a prevenir").'
      },
      {
        itemNumber: 26,
        options: [
          { key: 'A', text: 'trate' },
          { key: 'B', text: 'trata' },
          { key: 'C', text: 'tratará' }
        ],
        correctAnswer: 'A',
        grammarFocus: 'Subjuntivo en condicional restrictiva ("siempre que + subjuntivo")',
        explanation: 'La locución condicional "siempre que" exige subjuntivo ("se trate").'
      },
      {
        itemNumber: 27,
        options: [
          { key: 'A', text: 'a las' },
          { key: 'B', text: 'por las' },
          { key: 'C', text: 'de las' }
        ],
        correctAnswer: 'A',
        grammarFocus: 'Complemento de adjetivo ("debido a")',
        explanation: 'La locución causal "debido a" rige siempre la preposición "a".'
      },
      {
        itemNumber: 28,
        options: [
          { key: 'A', text: 'haciendo' },
          { key: 'B', text: 'provocando' },
          { key: 'C', text: 'lo que conlleva' }
        ],
        correctAnswer: 'C',
        grammarFocus: 'Nexo consecutivo relativo explicativo',
        explanation: '"lo que conlleva que" introduce consecutivamente la cláusula con subjuntivo ("se vean obligados").'
      },
      {
        itemNumber: 29,
        options: [
          { key: 'A', text: 'dicho' },
          { key: 'B', text: 'mismo' },
          { key: 'C', text: 'semejante' }
        ],
        correctAnswer: 'A',
        grammarFocus: 'Determinante anafórico formal ("a pesar de dicho encarecimiento")',
        explanation: '"Dicho" funciona como anafórico formal para referirse al aumento de precio mencionado antes.'
      },
      {
        itemNumber: 30,
        options: [
          { key: 'A', text: 'en' },
          { key: 'B', text: 'por' },
          { key: 'C', text: 'de' }
        ],
        correctAnswer: 'A',
        grammarFocus: 'Régimen preposicional ("insistir en que")',
        explanation: 'El verbo "insistir" rige la preposición "en" antes de la subordinada sustantiva.'
      },
      {
        itemNumber: 31,
        options: [
          { key: 'A', text: 'Pese a' },
          { key: 'B', text: 'A causa de' },
          { key: 'C', text: 'A fin de' }
        ],
        correctAnswer: 'A',
        grammarFocus: 'Conector concesivo ("Pese a + sustantivo")',
        explanation: '"Pese a" introduce el obstáculo concesivo ("los esfuerzos promocionales").'
      },
      {
        itemNumber: 32,
        options: [
          { key: 'A', text: 'sobre' },
          { key: 'B', text: 'para' },
          { key: 'C', text: 'hacia' }
        ],
        correctAnswer: 'A',
        grammarFocus: 'Preposición temática ("instruir sobre algo")',
        explanation: '"instruir sobre" indica la materia sobre la que se imparte enseñanza.'
      },
      {
        itemNumber: 33,
        options: [
          { key: 'A', text: 'a fin' },
          { key: 'B', text: 'con tal' },
          { key: 'C', text: 'de modo' }
        ],
        correctAnswer: 'A',
        grammarFocus: 'Locución final ("a fin de + infinitivo")',
        explanation: '"a fin de evitar" expresa la finalidad con infinitivo.'
      },
      {
        itemNumber: 34,
        options: [
          { key: 'A', text: 'por' },
          { key: 'B', text: 'con' },
          { key: 'C', text: 'sobre' }
        ],
        correctAnswer: 'A',
        grammarFocus: 'Régimen preposicional ("abogar por")',
        explanation: 'El verbo "abogar" rige la preposición "por" cuando significa defender una causa.'
      },
      {
        itemNumber: 35,
        options: [
          { key: 'A', text: 'cuando' },
          { key: 'B', text: 'siempre' },
          { key: 'C', text: 'hasta' }
        ],
        correctAnswer: 'A',
        grammarFocus: 'Conjunción temporal con valor condicional futuro ("Solo cuando + subjuntivo")',
        explanation: '"Solo cuando" con subjuntivo ("se logre") indica la condición temporal futura necesaria.'
      },
      {
        itemNumber: 36,
        options: [
          { key: 'A', text: 'su' },
          { key: 'B', text: 'el' },
          { key: 'C', text: 'un' }
        ],
        correctAnswer: 'A',
        grammarFocus: 'Posesivo anafórico de objeto ("su liderazgo")',
        explanation: 'El posesivo "su" concierta con "el sector" mencionado anteriormente.'
      }
    ]
  }
};

export const DELE_B1_EXAM: DELEExam = {
  id: 'dele-b1-oficial-1',
  title: 'DELE B1 - Examen Oficial de Comprensión de Lectura',
  level: 'B1',
  subtitle: 'Prueba de Comprensión de Lectura (Instituto Cervantes)',
  description: 'Examen oficial para el nivel Umbral (B1). Comprueba la capacidad para entender puntos principales de textos claros en lengua estándar sobre cuestiones cotidianas, de estudio o de trabajo.',
  timeLimitMinutes: 60,
  totalItems: 36,
  tarea1: {
    title: 'Tarea 1: Cartas y Textos de la Vida Cotidiana',
    instructions: 'Lea el correo electrónico enviado por una estudiante sobre sus experiencias en un programa de intercambio cultural en Valencia. A continuación, responda a las 6 preguntas eligiendo la opción correcta (A, B o C).',
    textTitle: 'Mi primer mes de intercambio universitario en Valencia',
    textSubtitle: 'Correo de Sofía a su familia en Argentina relatando su adaptación',
    paragraphs: [
      '¡Hola a todos en casa! Les escribo este correo al cumplir justo cuatro semanas desde mi llegada a Valencia. Al principio, debo confesar que sentí bastante incertidumbre al adaptarme al ritmo de vida de aquí. Los horarios de las comidas fueron lo primero que me sorprendió: cenar a las diez de la noche me parecía una locura, pero ahora ya me he acostumbrado del todo y hasta disfruto de la famosa "sobremesa".',
      'La universidad está excelente. Estoy cursando cuatro asignaturas en la Facultad de Filología. Lo que más me fascina de las clases es la interacción constante entre profesores y alumnos. En Argentina solíamos tener clases magistrales más teóricas, mientras que aquí dedicamos casi la mitad del tiempo a debatir artículos de opinión e investigar en grupos pequeños.',
      'Mi residencia universitaria queda a quince minutos en bicicleta de la playa de la Malvarrosa. Casi todas las tardes, cuando termino las clases de la facultad, me reúno con mis compañeros de piso para pasear por el antiguo cauce del río Turia, que lo han convertido en un parque lineal precioso que cruza toda la ciudad de este a oeste.',
      'El fin de semana pasado fuimos de excursión al Parque Natural de la Albufera. Un compañero valenciano nos llevó a una barraca tradicional donde probamos la auténtica paella de pollo y conejo hecha a la leña. Nos explicó que los valencianos nunca ponen marisco ni chorizo en la receta tradicional de la huerta, un detalle gastronómico que yo desconocía por completo.',
      'Lo único que me preocupa un poco es la llegada de los exámenes parciales el mes que viene. Aunque entiendo prácticamente todo en las clases, aún me cuesta escribir ensayos académicos con la rapidez que exigen los profesores. Por suerte, la universidad ofrece un taller gratuito de redacción para estudiantes de intercambio al que me he inscrito para mejorar mi ortografía y conectores.',
      'Bueno, los dejo por hoy porque tengo que repasar la sintaxis para mañana. Les mandaré fotos de la Albufera en el próximo mensaje. ¡Un beso enorme para todos!'
    ],
    questions: [
      {
        id: 'b1-t1-q1',
        questionNumber: 1,
        text: 'Al llegar a Valencia, a Sofía le resultó chocante:',
        options: [
          { key: 'A', text: 'El clima caluroso de la costa levantina.' },
          { key: 'B', text: 'La costumbre local de Cenar bastante tarde.' },
          { key: 'C', text: 'El transporte público que conectaba con la universidad.' }
        ],
        correctAnswer: 'B',
        explanation: 'Sofía menciona que "cenar a las diez de la noche me parecía una locura".'
      },
      {
        id: 'b1-t1-q2',
        questionNumber: 2,
        text: '¿En qué se diferencian las clases en Valencia de sus clases anteriores en Argentina?',
        options: [
          { key: 'A', text: 'Son exclusivamente virtuales y sin controles de asistencia.' },
          { key: 'B', text: 'Tienen un carácter más participativo y basado en debates.' },
          { key: 'C', text: 'Requieren leer libros únicamente en idioma inglés.' }
        ],
        correctAnswer: 'B',
        explanation: 'En Argentina tenía clases teóricas mientras que aquí dedican mucho tiempo a "debatir artículos de opinión e investigar en grupos".'
      },
      {
        id: 'b1-t1-q3',
        questionNumber: 3,
        text: 'El antiguo cauce del río Turia es utilizado actualmente como:',
        options: [
          { key: 'A', text: 'Un canal navegable para barcos turísticos.' },
          { key: 'B', text: 'Una autopista subterránea de alta velocidad.' },
          { key: 'C', text: 'Un extenso parque público para el esparcimiento.' }
        ],
        correctAnswer: 'C',
        explanation: 'Sofía explica que lo han convertido en "un parque lineal precioso que cruza toda la ciudad".'
      },
      {
        id: 'b1-t1-q4',
        questionNumber: 4,
        text: 'Durante la excursión a la Albufera, Sofía aprendió que la paella valenciana tradicional:',
        options: [
          { key: 'A', text: 'No lleva marisco ni chorizo en su elaboración clásica.' },
          { key: 'B', text: 'Se sirve fría durante los meses de verano.' },
          { key: 'C', text: 'Se cocina obligatoriamente en hornos eléctricos.' }
        ],
        correctAnswer: 'A',
        explanation: 'Un compañero le explicó que "nunca ponen marisco ni chorizo en la receta tradicional de la huerta".'
      },
      {
        id: 'b1-t1-q5',
        questionNumber: 5,
        text: '¿Cuál es la principal dificultad de Sofía de cara a los próximos exámenes?',
        options: [
          { key: 'A', text: 'Comprender el acento de sus profesores en el aula.' },
          { key: 'B', text: 'Redactar textos académicos con soltura y agilidad.' },
          { key: 'C', text: 'Conseguir el material bibliográfico en la biblioteca.' }
        ],
        correctAnswer: 'B',
        explanation: 'Afirma que "aún me cuesta escribir ensayos académicos con la rapidez que exigen los profesores".'
      },
      {
        id: 'b1-t1-q6',
        questionNumber: 6,
        text: 'Para superar su dificultad académica, Sofía ha decidido:',
        options: [
          { key: 'A', text: 'Contratar un profesor particular de apoyo.' },
          { key: 'B', text: 'Asistir a un taller de escritura organizado por la universidad.' },
          { key: 'C', text: 'Solicitar una prórroga en la entrega de sus trabajos.' }
        ],
        correctAnswer: 'B',
        explanation: 'Menciona que la universidad ofrece "un taller gratuito de redacción... al que me he inscrito".'
      }
    ]
  },
  tarea2: {
    title: 'Tarea 2: Anuncios y Perfiles de Ofertas de Servicios',
    instructions: 'Lea las 4 descripciones de centros de actividades al aire libre (A, B, C y D). A continuación, relacione las 10 necesidades de diferentes usuarios con el centro adecuado.',
    people: [
      {
        id: 'centro-a',
        letter: 'A',
        name: 'Aventura Picos de Europa',
        tagline: 'Deportes de montaña y alta adrenalina',
        text: 'Especializados en escalada en roca, descenso de cañones y senderismo de alta montaña. Ofrecemos guías titulados de alta montaña para grupos reducidos. Incluimos todo el material técnico homologado y seguro de accidentes. Recomendado para personas con buena forma física previa.'
      },
      {
        id: 'centro-b',
        letter: 'B',
        name: 'EcoRutas en la Naturaleza',
        tagline: 'Paseos familiares y observación de fauna',
        text: 'Organizamos caminatas suaves y recorridos en bicicleta eléctrica por parques naturales protegidos. Ideal para familias con niños pequeños y personas mayores. Contamos con biólogos que explican la flora local y prismáticos para avistar aves.'
      },
      {
        id: 'centro-c',
        letter: 'C',
        name: 'Náutica y Surf Cantábrico',
        tagline: 'Cursos de agua y deportes marinos',
        text: 'Escuela de surf, paddle surf y kayak de mar ubicada en la playa. Ofrecemos clases desde nivel iniciación hasta perfeccionamiento para todas las edades. Alquilamos trajes de neopreno y tablas por horas con vestuarios y duchas de agua caliente.'
      },
      {
        id: 'centro-d',
        letter: 'D',
        name: 'Granja Escuela El Roble',
        tagline: 'Talleres rurales y gastronomía tradicional',
        text: 'Ubicados en una finca rústica, ofrecemos talleres de elaboración casera de queso, pan de masa madre y huerto ecológico. Ideal para grupos que buscan una experiencia tranquila de fin de semana con degustación de productos artesanales.'
      }
    ],
    statements: [
      {
        id: 'b1-t2-s1',
        statementNumber: 7,
        text: 'Busca una actividad acuática con posibilidad de alquilar equipamiento por horas.',
        correctPersonId: 'centro-c',
        explanation: 'Náutica y Surf Cantábrico ofrece "alquilamos trajes de neopreno y tablas por horas".'
      },
      {
        id: 'b1-t2-s2',
        statementNumber: 8,
        text: 'Quiere hacer un recorrido relajado en bicicleta que no requiera excesivo esfuerzo físico.',
        correctPersonId: 'centro-b',
        explanation: 'EcoRutas ofrece "recorridos en bicicleta eléctrica... ideal para familias y personas mayores".'
      },
      {
        id: 'b1-t2-s3',
        statementNumber: 9,
        text: 'Desea practicar deportes de riesgo en la montaña con guías certificados.',
        correctPersonId: 'centro-a',
        explanation: 'Aventura Picos de Europa ofrece escalada y cañones con "guías titulados de alta montaña".'
      },
      {
        id: 'b1-t2-s4',
        statementNumber: 10,
        text: 'Tiene interés en aprender a fabricar alimentos tradicionales con productos del campo.',
        correctPersonId: 'centro-d',
        explanation: 'Granja Escuela El Roble imparte talleres de "elaboración casera de queso, pan y huerto ecológico".'
      },
      {
        id: 'b1-t2-s5',
        statementNumber: 11,
        text: 'Le gustaría observar animales silvestres acompañado de un experto en biología.',
        correctPersonId: 'centro-b',
        explanation: 'EcoRutas cuenta con "biólogos que explican la flora local y prismáticos para avistar aves".'
      },
      {
        id: 'b1-t2-s6',
        statementNumber: 12,
        text: 'Busca clases grupales de surf para principiantes a orillas del mar.',
        correctPersonId: 'centro-c',
        explanation: 'Náutica y Surf Cantábrico es una "escuela de surf... clases desde nivel iniciación".'
      },
      {
        id: 'b1-t2-s7',
        statementNumber: 13,
        text: 'Necesita que la empresa proporcione cascos y arneses de seguridad homologados.',
        correctPersonId: 'centro-a',
        explanation: 'Aventura Picos de Europa garantiza "todo el material técnico homologado y seguro de accidentes".'
      },
      {
        id: 'b1-t2-s8',
        statementNumber: 14,
        text: 'Prefiere una jornada gastronómica tranquila en el campo con cata de productos locales.',
        correctPersonId: 'centro-d',
        explanation: 'Granja Escuela El Roble ofrece experiencia "tranquila de fin de semana con degustación de productos artesanales".'
      },
      {
        id: 'b1-t2-s9',
        statementNumber: 15,
        text: 'Requiere instalaciones con duchas templadas tras realizar la actividad en la playa.',
        correctPersonId: 'centro-c',
        explanation: 'Náutica y Surf Cantábrico dispone de "vestuarios y duchas de agua caliente".'
      },
      {
        id: 'b1-t2-s10',
        statementNumber: 16,
        text: 'Planea una excursión adecuada para niños pequeños en un entorno protegido.',
        correctPersonId: 'centro-b',
        explanation: 'EcoRutas ofrece caminatas suaves "Ideal para familias con niños pequeños".'
      }
    ]
  },
  tarea3: {
    title: 'Tarea 3: Reconstrucción de Texto Breve',
    instructions: 'Lea el siguiente artículo sobre la historia del chocolate al que le faltan 6 fragmentos. Elija para cada hueco (17–22) la opción correcta de la lista (A–H). Hay 2 fragmentos que no debe usar.',
    textTitle: 'Del cacao azteca a la barra de chocolate moderna',
    segments: [
      {
        type: 'text',
        content: 'El origen del cacao se remonta a las antiguas civilizaciones mesoamericanas, donde los mayas y los aztecas consideraban las semillas de este árbol como un regalo divino.'
      },
      { type: 'gap', gapIndex: 1 },
      {
        type: 'text',
        content: 'En aquella época, el cacao no se consumía en forma de tableta dulce como hoy en día, sino como una bebida amarga y especiada llamada "xocolātl".'
      },
      { type: 'gap', gapIndex: 2 },
      {
        type: 'text',
        content: 'Con la llegada de los conquistadores españoles en el siglo XVI, esta bebida fue introducida en las cortes europeas, donde causó una auténtica sensación.'
      },
      { type: 'gap', gapIndex: 3 },
      {
        type: 'text',
        content: 'Para adaptar la bebida al paladar europeo, los reposteros españoles decidieron añadirle azúcar de caña y canela, sirviéndola siempre muy caliente.'
      },
      { type: 'gap', gapIndex: 4 },
      {
        type: 'text',
        content: 'Durante la Revolución Industrial, la invención de la prensa hidráulica por parte del neerlandés Coenraad van Houten cambió la historia del cacao para siempre.'
      },
      { type: 'gap', gapIndex: 5 },
      {
        type: 'text',
        content: 'Esta máquina permitía separar la manteca de cacao del polvo seco, haciendo posible la fabricación masiva de las primeras tabletas sólidas de chocolate.'
      },
      { type: 'gap', gapIndex: 6 },
      {
        type: 'text',
        content: 'En la actualidad, el chocolate sigue siendo uno de los manjares más populares del mundo, combinando tradición artesanal e innovación gastronómica.'
      }
    ],
    sentenceBank: [
      {
        id: 'b1-opt-a',
        letter: 'A',
        text: 'A causa de su altísimo valor, las semillas se utilizaban también como moneda de cambio para comprar alimentos y telas.'
      },
      {
        id: 'b1-opt-b',
        letter: 'B',
        text: 'Esta infusión se mezclaba con agua, chile y harina de maíz durante los rituales sagrados.'
      },
      {
        id: 'b1-opt-c',
        letter: 'C',
        text: 'Sin embargo, la receta original se mantuvo en estricto secreto de Estado durante más de medio siglo.'
      },
      {
        id: 'b1-opt-d',
        letter: 'D',
        text: 'Esta nueva fórmula dulce se convirtió en la bebida favorita de la aristocracia europea.'
      },
      {
        id: 'b1-opt-e',
        letter: 'E',
        text: 'Muchos científicos afirman que comer cacao crudo mejora la memoria a largo plazo.'
      },
      {
        id: 'b1-opt-f',
        letter: 'F',
        text: 'Gracias a este avance tecnológico, el coste de producción disminuyó considerablemente.'
      },
      {
        id: 'b1-opt-g',
        letter: 'G',
        text: 'Los agricultores actuales prefieren cultivar únicamente café en lugar de cacao.'
      },
      {
        id: 'b1-opt-h',
        letter: 'H',
        text: 'Posteriormente, los suizos añadieron leche condensada a la mezcla para crear el popular chocolate con leche.'
      }
    ],
    correctGaps: {
      1: 'b1-opt-a',
      2: 'b1-opt-b',
      3: 'b1-opt-c',
      4: 'b1-opt-d',
      5: 'b1-opt-f',
      6: 'b1-opt-h'
    },
    explanations: {
      1: 'El fragmento A explica la importancia económica de las semillas de cacao como moneda divina.',
      2: 'El fragmento B describe la preparación de la bebida "xocolātl" mencionada justo antes.',
      3: 'El fragmento C introduce la restricción inicial del secreto de Estado al llegar a Europa.',
      4: 'El fragmento D da continuidad a la adaptación dulce elaborada por reposteros españoles.',
      5: 'El fragmento F hace referencia directa al "avance tecnológico" de la prensa hidráulica.',
      6: 'El fragmento H añade el paso histórico suizo de incorporación de leche condensada.'
    }
  },
  tarea4: {
    title: 'Tarea 4: Prueba Cloze de Gramática B1',
    instructions: 'Lea el texto y elija para cada espacio (23–36) la opción correcta (A, B o C).',
    textTitle: 'Consejos para viajar de forma sostenible por España',
    segments: [
      {
        type: 'text',
        content: 'Viajar en tren es una de las mejores opciones '
      },
      { type: 'cloze', itemNumber: 23 },
      {
        type: 'text',
        content: ' recorrer la península ibérica reduciendo la huella de carbono. La red de ferrocarril conecta casi todas las capitales de provincia '
      },
      { type: 'cloze', itemNumber: 24 },
      {
        type: 'text',
        content: ' forma rápida y cómoda. Si compras los billetes con '
      },
      { type: 'cloze', itemNumber: 25 },
      {
        type: 'text',
        content: ' antelación, puedes conseguir descuentos de hasta el cincuenta por ciento. Además, cuando '
      },
      { type: 'cloze', itemNumber: 26 },
      {
        type: 'text',
        content: ' a una ciudad nueva, te recomendamos alquilar una bicicleta urbana '
      },
      { type: 'cloze', itemNumber: 27 },
      {
        type: 'text',
        content: ' desplazarte por el centro histórico. Es muy importante que '
      },
      { type: 'cloze', itemNumber: 28 },
      {
        type: 'text',
        content: ' la cultura local respetando los horarios del comercio tradicional. '
      },
      { type: 'cloze', itemNumber: 29 },
      {
        type: 'text',
        content: ' vas a un restaurante, pide siempre productos '
      },
      { type: 'cloze', itemNumber: 30 },
      {
        type: 'text',
        content: ' temporada cultivados por agricultores cercanos. No olvides llevar contigo una botella reutilizable '
      },
      { type: 'cloze', itemNumber: 31 },
      {
        type: 'text',
        content: ' evitar el consumo excesivo de plásticos de un solo uso. Si tienes alguna duda sobre las rutas, '
      },
      { type: 'cloze', itemNumber: 32 },
      {
        type: 'text',
        content: ' en la oficina de turismo local; los informadores '
      },
      { type: 'cloze', itemNumber: 33 },
      {
        type: 'text',
        content: ' encantados de ayudarte con mapas gratuitos. Esperamos que '
      },
      { type: 'cloze', itemNumber: 34 },
      {
        type: 'text',
        content: ' de tu viaje responsable y '
      },
      { type: 'cloze', itemNumber: 35 },
      {
        type: 'text',
        content: ' muchos recuerdos inolvidables '
      },
      { type: 'cloze', itemNumber: 36 },
      {
        type: 'text',
        content: ' tus vacaciones.'
      }
    ],
    items: [
      {
        itemNumber: 23,
        options: [
          { key: 'A', text: 'para' },
          { key: 'B', text: 'por' },
          { key: 'C', text: 'con' }
        ],
        correctAnswer: 'A',
        grammarFocus: 'Preposición de finalidad ("para + infinitivo")',
        explanation: 'Se utiliza "para" para expresar el objetivo o finalidad de recorrer la península.'
      },
      {
        itemNumber: 24,
        options: [
          { key: 'A', text: 'de' },
          { key: 'B', text: 'en' },
          { key: 'C', text: 'por' }
        ],
        correctAnswer: 'A',
        grammarFocus: 'Locución modal ("de forma rápida")',
        explanation: 'La locución adverbial modal requiere "de forma...".'
      },
      {
        itemNumber: 25,
        options: [
          { key: 'A', text: 'suficiente' },
          { key: 'B', text: 'demasiada' },
          { key: 'C', text: 'bastantes' }
        ],
        correctAnswer: 'A',
        grammarFocus: 'Adjetivo cuantitativo ("con suficiente antelación")',
        explanation: '"suficiente" concierta en singular con el sustantivo incontable "antelación".'
      },
      {
        itemNumber: 26,
        options: [
          { key: 'A', text: 'llegues' },
          { key: 'B', text: 'llegas' },
          { key: 'C', text: 'llegaste' }
        ],
        correctAnswer: 'A',
        grammarFocus: 'Subjuntivo en temporal con valor futuro ("cuando + subjuntivo")',
        explanation: 'La conjunción temporal "cuando" con referencia futura exige presente de subjuntivo ("llegues").'
      },
      {
        itemNumber: 27,
        options: [
          { key: 'A', text: 'para' },
          { key: 'B', text: 'por' },
          { key: 'C', text: 'desde' }
        ],
        correctAnswer: 'A',
        grammarFocus: 'Preposición de finalidad ("para + infinitivo")',
        explanation: '"para desplazarte" indica la finalidad del alquiler.'
      },
      {
        itemNumber: 28,
        options: [
          { key: 'A', text: 'apoyes' },
          { key: 'B', text: 'apoyas' },
          { key: 'C', text: 'apoyaste' }
        ],
        correctAnswer: 'A',
        grammarFocus: 'Subjuntivo en oración sustantiva valorativa ("es muy importante que + subjuntivo")',
        explanation: 'La estructura valorativa "es muy importante que" requiere subjuntivo ("apoyes").'
      },
      {
        itemNumber: 29,
        options: [
          { key: 'A', text: 'Si' },
          { key: 'B', text: 'Como' },
          { key: 'C', text: 'Aunque' }
        ],
        correctAnswer: 'A',
        grammarFocus: 'Conjunción condicional real ("Si + presente")',
        explanation: '"Si" introduce la condición probable en presente ("Si vas...").'
      },
      {
        itemNumber: 30,
        options: [
          { key: 'A', text: 'de' },
          { key: 'B', text: 'con' },
          { key: 'C', text: 'en' }
        ],
        correctAnswer: 'A',
        grammarFocus: 'Locución adjetival ("de temporada")',
        explanation: 'Los alimentos frescos se denominan "productos de temporada".'
      },
      {
        itemNumber: 31,
        options: [
          { key: 'A', text: 'para' },
          { key: 'B', text: 'por' },
          { key: 'C', text: 'sin' }
        ],
        correctAnswer: 'A',
        grammarFocus: 'Preposición de finalidad ("para + infinitivo")',
        explanation: '"para evitar" indica la meta perseguida al llevar botella.'
      },
      {
        itemNumber: 32,
        options: [
          { key: 'A', text: 'pregunta' },
          { key: 'B', text: 'preguntes' },
          { key: 'C', text: 'preguntar' }
        ],
        correctAnswer: 'A',
        grammarFocus: 'Imperativo afirmativo (tú)',
        explanation: '"pregunta" es la forma afirmativa de imperativo para la segunda persona tú.'
      },
      {
        itemNumber: 33,
        options: [
          { key: 'A', text: 'estarán' },
          { key: 'B', text: 'estén' },
          { key: 'C', text: 'estaban' }
        ],
        correctAnswer: 'A',
        grammarFocus: 'Futuro simple de indicativo ("estarán encantados")',
        explanation: 'Expresa una certeza o probabilidad futura en el trato al visitante.'
      },
      {
        itemNumber: 34,
        options: [
          { key: 'A', text: 'disfrutes' },
          { key: 'B', text: 'disfrutas' },
          { key: 'C', text: 'disfrutar' }
        ],
        correctAnswer: 'A',
        grammarFocus: 'Subjuntivo en subordinada de deseo ("esperamos que + subjuntivo")',
        explanation: 'El verbo de deseo "esperar que" exige presente de subjuntivo ("disfrutes").'
      },
      {
        itemNumber: 35,
        options: [
          { key: 'A', text: 'te lleves' },
          { key: 'B', text: 'te llevas' },
          { key: 'C', text: 'llevarte' }
        ],
        correctAnswer: 'A',
        grammarFocus: 'Subjuntivo coordinado ("esperamos que disfrutes y te lleves...")',
        explanation: 'Coordina con "disfrutes" bajo el mismo verbo rector de deseo.'
      },
      {
        itemNumber: 36,
        options: [
          { key: 'A', text: 'de' },
          { key: 'B', text: 'por' },
          { key: 'C', text: 'a' }
        ],
        correctAnswer: 'A',
        grammarFocus: 'Preposición posesiva de marco temporal ("de tus vacaciones")',
        explanation: 'Indica la procedencia temporal del recuerdo ("de tus vacaciones").'
      }
    ]
  }
};
