import { TaskScenario } from '../types/tasks';

export const TASK_SCENARIOS: TaskScenario[] = [
  {
    id: 'madrid_apartment',
    title: 'Alquilar un piso en Madrid vía WhatsApp',
    subtitle: 'Negociación de contrato, fianza y suministros en Malasaña',
    cefrLevel: 'B1',
    canDoStatement: 'Puedo negociar las condiciones de un alquiler por escrito, solicitar aclaraciones sobre fianzas y gastos, y acordar plazos contractuales.',
    location: 'Madrid, España',
    context: 'Has encontrado un piso luminoso de un dormitorio en el barrio de Malasaña por 850€/mes. Estás hablando por WhatsApp con Don Fernando, el propietario, para cerrar los detalles del contrato antes de hacer la reserva.',
    theme: 'whatsapp',
    requiredRegister: 'usted',
    interlocutor: {
      name: 'Don Fernando',
      role: 'Propietario del inmueble en Malasaña',
      avatar: '👨‍💼',
      initialMessage: 'Hola, buenas tardes. Soy Fernando, el propietario del piso en la calle Velarde. Me alegro de que esté interesado. ¿Qué dudas tiene sobre el inmueble o el contrato?',
      register: 'usted',
      typingDelayMs: 1200
    },
    goals: [
      {
        id: 'negotiate_deposit',
        description: 'Negociar el importe de la fianza (depósito)',
        keywords: ['fianza', 'depósito', 'meses de fianza', 'cuánto es la fianza', 'un mes', 'dos meses'],
        isRequired: true,
        completed: false,
        hint: 'Pregunta por el importe de la fianza (ej. "¿De cuánto es la fianza?") o negocia si se pide más de 1 mes.'
      },
      {
        id: 'confirm_utilities',
        description: 'Consultar si los gastos de comunidad y suministros están incluidos',
        keywords: ['gastos', 'comunidad', 'incluidos', 'gastos de comunidad', 'luz', 'agua', 'suministros', 'facturas'],
        isRequired: true,
        completed: false,
        hint: 'Inquire if community fees or utilities are included (ej. "¿Están los gastos de comunidad incluidos en el precio?").'
      },
      {
        id: 'contract_duration',
        description: 'Acordar la duración del contrato y la fecha de entrada',
        keywords: ['duración', 'contrato', 'meses', 'año', 'tiempo', 'mínimo', 'entrada', 'firmar', 'permanencia'],
        isRequired: true,
        completed: false,
        hint: 'State your intended length of stay or contract duration (ej. "Me gustaría alquilarlo durante 10 meses").'
      }
    ],
    keyPhrases: [
      { spanish: 'Disculpe, ¿la fianza es de un solo mes?', english: 'Excuse me, is the deposit just one month?', category: 'negotiation' },
      { spanish: '¿Están los gastos de comunidad incluidos en los 850€?', english: 'Are community expenses included in the 850€?', category: 'negotiation' },
      { spanish: 'Mire, mi idea es alquilarlo a partir del próximo mes por un año.', english: 'Look, my plan is to rent it starting next month for one year.', category: 'discourse' },
      { spanish: '¿Sería posible firmar un contrato de 9 u 11 meses?', english: 'Would it be possible to sign a 9 or 11-month contract?', category: 'politeness' }
    ]
  },
  {
    id: 'seville_tapas',
    title: 'Pedir tapas en un bar concurrido de Sevilla',
    subtitle: 'Sugerencias de la casa, consulta de alérgenos y la cuenta en Triana',
    cefrLevel: 'A2',
    canDoStatement: 'Puedo interactuar con desenvoltura en un bar o restaurante, pedir recomendaciones de productos frescos, consultar ingredientes/alérgenos y solicitar la cuenta.',
    location: 'Sevilla, España',
    context: 'Estás en "Casa Manolo", un animado bar de tapas en el barrio de Triana. El bar está repleto, hay murmullo de fondo y el camarero se acerca a tu mesa entre la multitud.',
    theme: 'bar',
    requiredRegister: 'tú',
    interlocutor: {
      name: 'Manolo',
      role: 'Camarero principal en Casa Manolo (Triana)',
      avatar: '👨‍🍳',
      initialMessage: '¡Oye, buenas noches! Pasa para acá. Hoy tenemos la barra de bote en bote. ¿Qué te pongo de beber para empezar y qué te apetece de comer?',
      register: 'tú',
      typingDelayMs: 1000
    },
    goals: [
      {
        id: 'ask_fresh_recommendations',
        description: 'Preguntar qué hay fresco hoy o pedir recomendaciones de la casa',
        keywords: ['fresco', 'fresca', 'recomiendas', 'recomendación', 'especialidad', 'sugerencia', 'hoy', 'pescado', 'tapa del día'],
        isRequired: true,
        completed: false,
        hint: 'Ask what is fresh today or request a specialty (ej. "¿Qué me recomiendas hoy?" o "¿Qué tenéis fresco?").'
      },
      {
        id: 'inquire_allergens',
        description: 'Consultar sobre alérgenos (gluten, mariscos, frutos secos)',
        keywords: ['gluten', 'marisco', 'mariscos', 'alergia', 'alérgico', 'alérgenos', 'llegar', 'harina', 'intolerancia'],
        isRequired: true,
        completed: false,
        hint: 'Check if a dish has gluten, shellfish, or allergens (ej. "Tengo alergia al gluten, ¿esta tapa lleva harina?").'
      },
      {
        id: 'request_bill',
        description: 'Pedir la cuenta para finalizar el servicio',
        keywords: ['cuenta', 'cobrar', 'cuánto es', 'me cobras', 'traes la cuenta', 'tarjeta'],
        isRequired: true,
        completed: false,
        hint: 'Politely ask for the bill (ej. "Manolo, cuando puedas me traes la cuenta, por favor").'
      }
    ],
    keyPhrases: [
      { spanish: 'Mira, ¿qué tenéis de pescado o marisco bien fresco hoy?', english: 'Look, what do you have in very fresh fish or seafood today?', category: 'discourse' },
      { spanish: 'Disculpa, ¿esta tapa de carrillada tiene algún ingrediente con gluten?', english: 'Excuse me, does this pork cheek dish contain any gluten ingredient?', category: 'politeness' },
      { spanish: '¿Qué me recomiendas de la tierra que no sea muy pesado?', english: 'What local dish do you recommend that is not too heavy?', category: 'negotiation' },
      { spanish: 'Oye, Manolo, cuando puedas tráeme la cuenta, por favor.', english: 'Hey Manolo, whenever you get a chance bring me the check please.', category: 'discourse' }
    ]
  },
  {
    id: 'mexico_baggage',
    title: 'Reclamación de equipaje perdido en el AICM',
    subtitle: 'Descripción minuciosa y registro formal en el Aeropuerto de Ciudad de México',
    cefrLevel: 'B2',
    canDoStatement: 'Puedo redactar o exponer una reclamación formal por pérdida de equipaje describiendo con precisión rasgos físicos, contenidos y antecedentes del viaje en pasado.',
    location: 'Ciudad de México (AICM), México',
    context: 'Tu equipaje no apareció en la cinta tras aterrizar en el Aeropuerto Internacional Benito Juárez de la Ciudad de México. Te encuentras en el mostrador de objetos perdidos y equipaje de la aerolínea para rellenar el parte de irregularidad (PIR).',
    theme: 'airport',
    requiredRegister: 'usted',
    interlocutor: {
      name: 'Sra. Mendoza',
      role: 'Agente de Servicio a Pasajeros y Reclamaciones (AICM)',
      avatar: '👩‍💼',
      initialMessage: 'Buenas tardes, bienvenido al mostrador de equipajes. Lamento mucho el inconveniente con su maleta. Para iniciar el reporte de pérdida, ¿me permite su boleto de abordar y su número de vuelo, por favor?',
      register: 'usted',
      typingDelayMs: 1400
    },
    goals: [
      {
        id: 'describe_suitcase_specs',
        description: 'Describir dimensiones, color, tipo de material y marca de la maleta',
        keywords: ['maleta', 'color', 'negra', 'roja', 'azul', 'rígida', 'mediana', 'grande', 'marca', 'samsonite', 'ruedas', 'candado'],
        isRequired: true,
        completed: false,
        hint: 'Describe suitcase appearance precisely (ej. "Es una maleta rígida, mediana, de color negro, marca Samsonite con cuatro ruedas").'
      },
      {
        id: 'detail_past_flight_and_contents',
        description: 'Explicar los antecedentes en pasado (origen/vuelo) y enumerar los contenidos principales',
        keywords: ['vuelo', 'venía', 'llegué', 'origen', 'dentro', 'adentro', 'tenía', 'ropa', 'documentos', 'computadora', 'zapatos'],
        isRequired: true,
        completed: false,
        hint: 'Use past tenses to describe flight origin and suitcase contents (ej. "Venía en el vuelo 402 desde Madrid y dentro llevaba ropa formal y documentos").'
      },
      {
        id: 'provide_contact_and_tracking',
        description: 'Proporcionar datos de contacto o solicitar el número de folio/referencia',
        keywords: ['teléfono', 'correo', 'contacto', 'número', 'folio', 'referencia', 'seguimiento', 'hotel', 'dirección'],
        isRequired: true,
        completed: false,
        hint: 'Provide contact info or ask for tracking code (ej. "Le dejo mi número de teléfono y la dirección de mi hotel para el seguimiento").'
      }
    ],
    keyPhrases: [
      { spanish: 'Disculpe, mi maleta no apareció en la banda número 4.', english: 'Excuse me, my suitcase did not show up on carousel number 4.', category: 'politeness' },
      { spanish: 'Es una maleta mediana, de cubierta rígida negra y con una cinta roja alrededor.', english: 'It is a medium suitcase with a hard black shell and a red strap around it.', category: 'description' },
      { spanish: 'Mire, venía en el vuelo directo desde Madrid y dentro traía pertenencias personales de valor.', english: 'Look, I came on the direct flight from Madrid and inside I had valuable personal items.', category: 'discourse' },
      { spanish: '¿Podría darme el número de folio del reporte para hacer el seguimiento por internet?', english: 'Could you give me the report reference number to track it online?', category: 'politeness' }
    ]
  }
];

export function getScenarioById(id: string): TaskScenario | undefined {
  return TASK_SCENARIOS.find(s => s.id === id);
}
