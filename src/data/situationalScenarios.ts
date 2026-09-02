export interface RoleplayOption {
  id: string;
  option_es: string;
  option_en: string;
  quality: 'natural_polite' | 'grammatically_incorrect' | 'culturally_unnatural';
  feedback_es: string;
  feedback_en: string;
  score_delta: number;
}

export interface DialogueTurn {
  turn_number: number;
  npc_speaker: string;
  npc_line_es: string;
  npc_line_en: string;
  npc_audio_script: string;
  user_prompt_context: string;
  options: RoleplayOption[];
}

export interface SituationalScenario {
  id: string;
  title: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  category: string;
  emoji: string;
  roleplay_goal: string;
  environment_setting: string;
  location_city: string;
  dialogue_turns: DialogueTurn[];
}

export const SITUATIONAL_SCENARIOS: SituationalScenario[] = [
  // 1. TAQUERÍA STREET FOOD
  {
    id: 'scen_1',
    title: 'Late Night Taquería Order',
    level: 'A1',
    category: 'Dining & Street Food',
    emoji: '🌮',
    roleplay_goal: 'Order 3 tacos al pastor without cilantro, ask for mild salsa, and request the check in cash.',
    environment_setting: 'A bustling taquería in Roma Norte, Mexico City. Sizzle of roasting pork on the trompo, ambient mariachi music in background.',
    location_city: 'Roma Norte, Mexico City',
    dialogue_turns: [
      {
        turn_number: 1,
        npc_speaker: 'Taquero (Don Beto)',
        npc_line_es: '¡Buenas noches, güero! ¿Qué le vamos a poner hoy?',
        npc_line_en: 'Good evening! What can we get for you today?',
        npc_audio_script: 'Buenas noches, güero. ¿Qué le vamos a poner hoy?',
        user_prompt_context: 'Order 3 tacos al pastor and specify NO cilantro.',
        options: [
          {
            id: 't1_o1',
            option_es: 'Hola, dame tres de pastor sin cilantro, por favor.',
            option_en: 'Hello, give me three pastor tacos without cilantro, please.',
            quality: 'natural_polite',
            feedback_es: '¡Excelente! "Dame tres de pastor" es la forma perfecta de pedir en una taquería mexicana.',
            feedback_en: 'Perfect! "Dame tres de pastor" is authentic street taco ordering syntax.',
            score_delta: 25
          },
          {
            id: 't1_o2',
            option_es: 'Yo deseo comer tres cerdos tacos sin plantas.',
            option_en: 'I desire to eat three pig tacos without plants.',
            quality: 'grammatically_incorrect',
            feedback_es: 'Incorrecto: No se dice "cerdos tacos" ni "plantas". Usa "tacos de pastor" y "sin cilantro".',
            feedback_en: 'Incorrect: Nobody says "pig tacos" or "plants". Say "de pastor" and "sin cilantro".',
            score_delta: 0
          },
          {
            id: 't1_o3',
            option_es: 'Usted me concederá tres piezas de tortilla con carne suave.',
            option_en: 'You shall grant me three pieces of tortilla with soft meat.',
            quality: 'culturally_unnatural',
            feedback_es: 'Muy acartonado: Nadie habla de forma aristocrática en una taquería.',
            feedback_en: 'Overly formal: Sounds like 18th-century royalty at a street stand.',
            score_delta: 10
          }
        ]
      },
      {
        turn_number: 2,
        npc_speaker: 'Taquero (Don Beto)',
        npc_line_es: '¡Sale vale! Tres de pastor sin cilantro. ¿Le pongo de la salsa verde o de la roja?',
        npc_line_en: 'Right away! Three pastor without cilantro. Should I put green or red salsa?',
        npc_audio_script: '¡Sale vale! Tres de pastor sin cilantro. ¿Le pongo de la salsa verde o de la roja?',
        user_prompt_context: 'Ask if the green salsa is spicy before deciding.',
        options: [
          {
            id: 't2_o1',
            option_es: '¿La salsa verde pica mucho o está tranquila?',
            option_en: 'Is the green salsa very spicy or is it mild?',
            quality: 'natural_polite',
            feedback_es: '¡Auténtico! "Está tranquila" es modismo mexicano perfecto para salsa no muy picante.',
            feedback_en: 'Authentic! "Está tranquila" is the exact Mexican phrase for "mild salsa".',
            score_delta: 25
          },
          {
            id: 't2_o2',
            option_es: '¿Salsa verde tiene fuego grande en la boca?',
            option_en: 'Does green salsa have big fire in mouth?',
            quality: 'grammatically_incorrect',
            feedback_es: 'Gramática rota: Para preguntar si pica se usa el verbo "picar" (¿pica mucho?).',
            feedback_en: 'Broken grammar: Use the verb "picar" (¿pica mucho?) to ask about spice level.',
            score_delta: 0
          },
          {
            id: 't2_o3',
            option_es: 'Exijo conocer el nivel de escoville de su aderezo verde.',
            option_en: 'I demand to know the Scoville rating of your green dressing.',
            quality: 'culturally_unnatural',
            feedback_es: 'Demasiado académico: El taquero solo necesita saber si le pone o no.',
            feedback_en: 'Too academic: Ask simply "pica mucho?" instead of mentioning Scoville ratings.',
            score_delta: 10
          }
        ]
      },
      {
        turn_number: 3,
        npc_speaker: 'Taquero (Don Beto)',
        npc_line_es: 'Tranquila, joven. La verde es de aguacate. Aquí tiene sus tres tacos.',
        npc_line_en: 'It’s mild! Green is avocado salsa. Here are your three tacos.',
        npc_audio_script: 'Tranquila, joven. La verde es de aguacate. Aquí tiene sus tres tacos.',
        user_prompt_context: 'Order a cold Horchata drink to go with your tacos.',
        options: [
          {
            id: 't3_o1',
            option_es: 'Muchas gracias. ¿Me regalas un agua de horchata bien fría?',
            option_en: 'Thank you very much. Can I get a cold horchata drink?',
            quality: 'natural_polite',
            feedback_es: '¡Perfecto! "¿Me regalas...?" es la cortesía mexicana por excelencia para pedir bebidas.',
            feedback_en: 'Perfect! "¿Me regalas...?" is the warm Mexican standard for ordering drinks.',
            score_delta: 25
          },
          {
            id: 't3_o2',
            option_es: 'Gracias. Dámelo agua blanca de arroz rápido.',
            option_en: 'Thanks. Give me white rice water fast.',
            quality: 'grammatically_incorrect',
            feedback_es: 'Incorrecto: Se llama "agua de horchata", no "agua blanca de arroz".',
            feedback_en: 'Incorrect: Ask for "agua de horchata" directly.',
            score_delta: 0
          },
          {
            id: 't3_o3',
            option_es: 'Agradezco el platillo. Ahora sírvame la bebida tradicional de la casa.',
            option_en: 'I appreciate the dish. Now serve me the traditional beverage.',
            quality: 'culturally_unnatural',
            feedback_es: 'Demasiado rígido: "Agradezco el platillo" suena demasiado serio para un puesto callejero.',
            feedback_en: 'Unnatural tone: Keep it simple with "Muchas gracias".',
            score_delta: 10
          }
        ]
      },
      {
        turn_number: 4,
        npc_speaker: 'Taquero (Don Beto)',
        npc_line_es: 'Aquí está su horchata. ¿Se le ofrece algo más?',
        npc_line_en: 'Here is your horchata. Would you like anything else?',
        npc_audio_script: 'Aquí está su horchata. ¿Se le ofrece algo más?',
        user_prompt_context: 'Say you are finished and ask for the bill.',
        options: [
          {
            id: 't4_o1',
            option_es: 'No, sería todo. ¿Me da la cuenta, por favor?',
            option_en: 'No, that will be all. Can I get the check, please?',
            quality: 'natural_polite',
            feedback_es: '¡Impecable! "Sería todo, ¿me da la cuenta?" es la frase exacta usada en México.',
            feedback_en: 'Flawless! "Sería todo" is the precise way to wrap up an order in Mexico.',
            score_delta: 25
          },
          {
            id: 't4_o2',
            option_es: 'No más. ¿Cuánto es el dinero total de mi estómago?',
            option_en: 'No more. How much is the total money of my stomach?',
            quality: 'grammatically_incorrect',
            feedback_es: 'Gramática absurda: Se dice "¿Cuánto es?" o "¿Me da la cuenta?".',
            feedback_en: 'Absurd literal translation: Always ask "¿Me da la cuenta?".',
            score_delta: 0
          },
          {
            id: 't4_o3',
            option_es: 'He concluido la ingesta. Procedamos al cálculo financiero.',
            option_en: 'I have concluded ingestion. Let us proceed to financial calculation.',
            quality: 'culturally_unnatural',
            feedback_es: 'Completamente antinatural: Suena como un robot calculando la cuenta.',
            feedback_en: 'Robot tone: Avoid artificial academic jargon in real interactions.',
            score_delta: 5
          }
        ]
      },
      {
        turn_number: 5,
        npc_speaker: 'Taquero (Don Beto)',
        npc_line_es: 'Son 95 pesos en total. ¿Paga en efectivo o tarjeta?',
        npc_line_en: 'That comes to 95 pesos in total. Cash or card?',
        npc_audio_script: 'Son noventa y cinco pesos en total. ¿Paga en efectivo o tarjeta?',
        user_prompt_context: 'Pay with a 100 peso bill in cash and tell him to keep the change.',
        options: [
          {
            id: 't5_o1',
            option_es: 'Aquí tiene 100 pesos. Quédate con el cambio, muchas gracias.',
            option_en: 'Here is 100 pesos. Keep the change, thank you very much.',
            quality: 'natural_polite',
            feedback_es: '¡Grandioso! "Quédate con el cambio" es una excelente propina para el taquero.',
            feedback_en: 'Great job! "Quédate con el cambio" is polite street tipping etiquette.',
            score_delta: 25
          },
          {
            id: 't5_o2',
            option_es: 'Toma billete cien. Guarda el dinero sobrante para ti.',
            option_en: 'Take hundred bill. Keep surplus money for yourself.',
            quality: 'grammatically_incorrect',
            feedback_es: 'Incorrecto: Falta fluidez. Di "Aquí tiene 100 pesos, quédate con el cambio".',
            feedback_en: 'Clunky phrasing. Use standard "Quédate con el cambio".',
            score_delta: 0
          },
          {
            id: 't5_o3',
            option_es: 'Le entrego este papel moneda. La diferencia constituye su gratificación.',
            option_en: 'I hand you this paper currency. The difference constitutes your gratuity.',
            quality: 'culturally_unnatural',
            feedback_es: 'Demasiado pretencioso: Nadie llama al dinero "papel moneda" al pagar tacos.',
            feedback_en: 'Pretentious: Nobody calls paper cash "papel moneda" at a taco stand.',
            score_delta: 10
          }
        ]
      }
    ]
  },

  // 2. UBER RIDE IN CDMX TRAFFIC
  {
    id: 'scen_2',
    title: 'Uber Ride & Custom Drop-off',
    level: 'A2',
    category: 'Transportation',
    emoji: '🚗',
    roleplay_goal: 'Confirm driver identity, verify destination, request window adjustment, and specify drop-off at the corner.',
    environment_setting: 'Inside a Nissan Versa in Mexico City traffic on Avenida Insurgentes. Soft radio music in Spanish.',
    location_city: 'Guadalajara / CDMX',
    dialogue_turns: [
      {
        turn_number: 1,
        npc_speaker: 'Uber Driver (Carlos)',
        npc_line_es: 'Hola, buenas tardes. ¿Usted es el usuario del viaje a Condesa?',
        npc_line_en: 'Hello, good afternoon. Are you the passenger for the ride to Condesa?',
        npc_audio_script: 'Hola, buenas tardes. ¿Usted es el usuario del viaje a Condesa?',
        user_prompt_context: 'Greet politely and confirm you are the passenger.',
        options: [
          {
            id: 'u1_o1',
            option_es: 'Hola, buenas tardes, sí. ¿Usted es Carlos?',
            option_en: 'Hello, good afternoon, yes. Are you Carlos?',
            quality: 'natural_polite',
            feedback_es: '¡Excelente! Saludo cordial y verificación rápida de seguridad.',
            feedback_en: 'Excellent! Polite greeting and swift driver verification.',
            score_delta: 25
          },
          {
            id: 'u1_o2',
            option_es: 'Sí, yo soy persona para el carro azul.',
            option_en: 'Yes, I am person for blue car.',
            quality: 'grammatically_incorrect',
            feedback_es: 'Gramática rota: Di "Sí, soy yo" o "Buenas tardes, sí".',
            feedback_en: 'Broken phrasing: Say "Sí, soy yo".',
            score_delta: 0
          },
          {
            id: 'u1_o3',
            option_es: 'Efectivamente, mi presencia coincide con la reserva de su automóvil.',
            option_en: 'Indeed, my presence coincides with the booking of your motorcar.',
            quality: 'culturally_unnatural',
            feedback_es: 'Demasiado rígido: Suena a diálogo teatral exagerado.',
            feedback_en: 'Overly formal: Unnatural speech for rideshares.',
            score_delta: 10
          }
        ]
      },
      {
        turn_number: 2,
        npc_speaker: 'Uber Driver (Carlos)',
        npc_line_es: 'Así es, servidor. Hay un poco de tráfico por Insurgentes, pero tomaremos el viaducto.',
        npc_line_en: 'That’s right, at your service. A bit of traffic on Insurgentes, but we’ll take the viaduct.',
        npc_audio_script: 'Así es, servidor. Hay un poco de tráfico por Insurgentes, pero tomaremos el viaducto.',
        user_prompt_context: 'Acknowledge the route choice politely.',
        options: [
          {
            id: 'u2_o1',
            option_es: 'Súper bien, muchas gracias. Sin prisa, con cuidado.',
            option_en: 'Super good, thank you. No rush, drive safely.',
            quality: 'natural_polite',
            feedback_es: '¡Muy natural! "Sin prisa" tranquiliza al chofer en el tráfico pesado.',
            feedback_en: 'Very natural! "Sin prisa" puts Mexican drivers at ease in traffic.',
            score_delta: 25
          },
          {
            id: 'u2_o2',
            option_es: 'Está bien. No maneja rápido para no choque.',
            option_en: 'It is fine. No drive fast for no crash.',
            quality: 'grammatically_incorrect',
            feedback_es: 'Incorrecto: Di "Maneje con cuidado" o "Sin prisa".',
            feedback_en: 'Grammatically broken: Say "Maneje con cuidado".',
            score_delta: 0
          },
          {
            id: 'u2_o3',
            option_es: 'Apruebo su decisión logística de cambiar la ruta vial.',
            option_en: 'I approve your logistical decision to alter the roadway route.',
            quality: 'culturally_unnatural',
            feedback_es: 'Rígido: "Súper bien, gracias" es mucho más natural.',
            feedback_en: 'Unnatural: Use casual agreement phrasing like "Súper bien".',
            score_delta: 10
          }
        ]
      },
      {
        turn_number: 3,
        npc_speaker: 'Uber Driver (Carlos)',
        npc_line_es: 'Entendido. ¿Le parece bien la temperatura o prendo el aire acondicionado?',
        npc_line_en: 'Understood. Is the temperature okay or should I turn on the AC?',
        npc_audio_script: 'Entendido. ¿Le parece bien la temperatura o prendo el aire acondicionado?',
        user_prompt_context: 'Ask if you can roll up the window a little bit.',
        options: [
          {
            id: 'u3_o1',
            option_es: '¿Le molesta si subo un poco la ventana, por favor?',
            option_en: 'Do you mind if I roll up the window a bit, please?',
            quality: 'natural_polite',
            feedback_es: '¡Impecable! "¿Le molesta si...?" es el estándar de educación en México.',
            feedback_en: 'Flawless! "¿Le molesta si...?" is top-tier polite Mexican Spanish.',
            score_delta: 25
          },
          {
            id: 'u3_o2',
            option_es: 'Yo quiero cerrar cristal arriba porque viento.',
            option_en: 'I want close glass up because wind.',
            quality: 'grammatically_incorrect',
            feedback_es: 'Incorrecto: Se dice "subir la ventana", no "cerrar cristal arriba".',
            feedback_en: 'Incorrect terminology: Say "subir la ventana".',
            score_delta: 0
          },
          {
            id: 'u3_o3',
            option_es: 'Proceda al bloqueo del flujo de aire exterior inmediatamente.',
            option_en: 'Proceed to block exterior airflow immediately.',
            quality: 'culturally_unnatural',
            feedback_es: 'Muy brusco y extraño: Usa frases más cálidas.',
            feedback_en: 'Abrupt and unnatural tone.',
            score_delta: 5
          }
        ]
      },
      {
        turn_number: 4,
        npc_speaker: 'Uber Driver (Carlos)',
        npc_line_es: 'Para nada, adelante. Ya vamos llegando a la calle Ámsterdam.',
        npc_line_en: 'Not at all, go right ahead. We are arriving at Amsterdam Street now.',
        npc_audio_script: 'Para nada, adelante. Ya vamos llegando a la calle Ámsterdam.',
        user_prompt_context: 'Ask the driver to drop you off right at the corner by the pharmacy.',
        options: [
          {
            id: 'u4_o1',
            option_es: '¿Me puede dejar aquí en la esquina frente a la farmacia, por favor?',
            option_en: 'Can you drop me off here at the corner in front of the pharmacy, please?',
            quality: 'natural_polite',
            feedback_es: '¡Perfecto! "Me puede dejar en la esquina" es la forma exacta usada en México.',
            feedback_en: 'Perfect drop-off location phrasing.',
            score_delta: 25
          },
          {
            id: 'u4_o2',
            option_es: 'Detener coche en la calle tienda ahora.',
            option_en: 'Stop car in street store now.',
            quality: 'grammatically_incorrect',
            feedback_es: 'Gramática incorrecta: Usa "¿Me deja aquí en la esquina?".',
            feedback_en: 'Broken command. Use polite "¿Me deja aquí?".',
            score_delta: 0
          },
          {
            id: 'u4_o3',
            option_es: 'Ordeno la inmovilización del vehículo junto al establecimiento médico.',
            option_en: 'I order the immobilization of the vehicle beside the medical establishment.',
            quality: 'culturally_unnatural',
            feedback_es: 'Excesivamente formal: Nadie le dice "establecimiento médico" a una farmacia.',
            feedback_en: 'Completely unnatural phrasing for dropping off.',
            score_delta: 10
          }
        ]
      },
      {
        turn_number: 5,
        npc_speaker: 'Uber Driver (Carlos)',
        npc_line_es: 'Listo, en la esquina de la farmacia. ¡Que tenga excelente tarde!',
        npc_line_en: 'Done, at the corner by the pharmacy. Have a great afternoon!',
        npc_audio_script: 'Listo, en la esquina de la farmacia. ¡Que tenga excelente tarde!',
        user_prompt_context: 'Thank the driver and wish him a good day.',
        options: [
          {
            id: 'u5_o1',
            option_es: 'Muchas gracias por el viaje, Carlos. ¡Igualmente, buen día!',
            option_en: 'Thank you very much for the ride, Carlos. Likewise, have a good day!',
            quality: 'natural_polite',
            feedback_es: '¡Grandioso! "Igualmente, buen día" cierra la conversación con calidez.',
            feedback_en: 'Warm, natural closing statement.',
            score_delta: 25
          },
          {
            id: 'u5_o2',
            option_es: 'Gracias para conducir. Adiós hoy.',
            option_en: 'Thanks for driving. Bye today.',
            quality: 'grammatically_incorrect',
            feedback_es: 'Incorrecto: Se dice "Gracias por el viaje", no "para conducir".',
            feedback_en: 'Incorrect preposition: Use "por el viaje".',
            score_delta: 0
          },
          {
            id: 'u5_o3',
            option_es: 'Agradezco sus servicios de transportación. Me retiro.',
            option_en: 'I appreciate your transportation services. I withdraw.',
            quality: 'culturally_unnatural',
            feedback_es: 'Muy distante: "Muchas gracias, buen día" es mil veces mejor.',
            feedback_en: 'Too cold and distant.',
            score_delta: 10
          }
        ]
      }
    ]
  }
];
