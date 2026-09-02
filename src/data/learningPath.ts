export interface CorePhrase {
  phrase_es: string;
  phrase_en: string;
  phonetic: string;
  audio_text: string;
  context_note: string;
}

export interface ContrastExample {
  textbook_formal: string;
  natural_mexican: string;
  english_translation: string;
  why_natural: string;
}

export interface ExampleVariation {
  original_structure: string;
  varied_es: string;
  varied_en: string;
  swapped_element: string;
}

export interface LearningPathModule {
  id: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  title: string;
  scenario_context: string;
  category: string;
  emoji: string;
  core_phrases: CorePhrase[];
  contrast_examples: ContrastExample[];
  example_variations: ExampleVariation[];
}

export const HIGH_UTILITY_LEARNING_PATH: LearningPathModule[] = [
  // ==================== LEVEL A1: ABSOLUTE SURVIVAL & DAILY INTERACTION ====================
  {
    id: 'a1_mod_1',
    level: 'A1',
    title: 'Café & Wi-Fi Command Center',
    scenario_context: 'Ordering espresso drinks, requesting Wi-Fi credentials, and securing power outlets at a specialty café in Roma Norte, Mexico City.',
    category: 'Daily Survival',
    emoji: '☕',
    core_phrases: [
      {
        phrase_es: '¿Cuál es la clave del Wi-Fi, por favor?',
        phrase_en: 'What is the Wi-Fi password, please?',
        phonetic: 'KWAL ehs lah KLAH-veh dehl wy-fy por fah-VOR',
        audio_text: '¿Cuál es la clave del Wi-Fi, por favor?',
        context_note: 'In Mexico, Wi-Fi password is almost universally called "la clave".'
      },
      {
        phrase_es: '¿Me da un café americano para llevar?',
        phrase_en: 'Can I get an Americano coffee to go?',
        phonetic: 'meh DAH oon kah-FEH ah-meh-ree-KAH-noh PAH-rah yeh-VAR',
        audio_text: '¿Me da un café americano para llevar?',
        context_note: '"¿Me da...?" is the standard polite formula for requesting items in shops.'
      },
      {
        phrase_es: '¿Tienen leche de avena o de almendra?',
        phrase_en: 'Do you have oat milk or almond milk?',
        phonetic: 'TYEH-nehn LEH-cheh deh ah-VEH-nah oh deh ahl-MEHN-drah',
        audio_text: '¿Tienen leche de avena o de almendra?',
        context_note: 'Essential for dietary preferences in modern cafés.'
      },
      {
        phrase_es: '¿Tendrá algún enchufe cerca de esta mesa?',
        phrase_en: 'Would you happen to have a power outlet near this table?',
        phonetic: 'tehn-DRAH ahl-GOON ehn-CHOO-feh SEHR-kah deh EHS-tah MEH-sah',
        audio_text: '¿Tendrá algún enchufe cerca de esta mesa?',
        context_note: 'Using the future of probability ("¿Tendrá...?") sounds extremely polite.'
      }
    ],
    contrast_examples: [
      {
        textbook_formal: '¿Usted me concede la contraseña de la red inalámbrica?',
        natural_mexican: '¿Cuál es la clave del Wi-Fi?',
        english_translation: 'What is the Wi-Fi password?',
        why_natural: 'Textbook versions use archaic verbs. "La clave del Wi-Fi" is fast, modern, and direct.'
      },
      {
        textbook_formal: 'Deseo adquirir un café para consumo fuera del establecimiento.',
        natural_mexican: '¿Me da un café para llevar, por favor?',
        english_translation: 'Can I get a coffee to go, please?',
        why_natural: 'Everyday Mexican ordering relies on the warm "¿Me da...?" phrasing.'
      }
    ],
    example_variations: [
      {
        original_structure: '¿Me da un [ITEM] para llevar?',
        varied_es: '¿Me da un té verde frío para llevar?',
        varied_en: 'Can I get an iced green tea to go?',
        swapped_element: 'Swapped coffee for iced green tea'
      },
      {
        original_structure: '¿Me da un [ITEM] para llevar?',
        varied_es: '¿Me da un croissant de almendra para llevar?',
        varied_en: 'Can I get an almond croissant to go?',
        swapped_element: 'Swapped drink for bakery item'
      },
      {
        original_structure: '¿Tienen [MILK_TYPE]?',
        varied_es: '¿Tienen leche deslactosada?',
        varied_en: 'Do you have lactose-free milk?',
        swapped_element: 'Swapped oat milk for lactose-free milk'
      },
      {
        original_structure: '¿Tienen [MILK_TYPE]?',
        varied_es: '¿Tienen jarabe de vainilla sin azúcar?',
        varied_en: 'Do you have sugar-free vanilla syrup?',
        swapped_element: 'Swapped milk for flavor syrup'
      }
    ]
  },
  {
    id: 'a1_mod_2',
    level: 'A1',
    title: 'Taquería & Street Food Mastery',
    scenario_context: 'Ordering authentic street tacos, specifying meats, requesting salsas, and paying at a Condesa food stand.',
    category: 'Food & Dining',
    emoji: '🌮',
    core_phrases: [
      {
        phrase_es: '¿Me da tres de pastor con todo, por favor?',
        phrase_en: 'Can I get three pastor tacos with everything, please?',
        phonetic: 'meh DAH trehs deh pahs-TOR kohn TOH-doh por fah-VOR',
        audio_text: '¿Me da tres de pastor con todo, por favor?',
        context_note: '"Con todo" at a taco stand means with cilantro, onion, and pineapple.'
      },
      {
        phrase_es: '¿La salsa verde pica mucho?',
        phrase_en: 'Is the green salsa very spicy?',
        phonetic: 'lah SAHL-sah VEHR-deh PEE-kah MOO-choh',
        audio_text: '¿La salsa verde pica mucho?',
        context_note: 'Crucial question before pouring salsa liberally.'
      },
      {
        phrase_es: 'Sin picante para mí, por favor.',
        phrase_en: 'No spicy salsa for me, please.',
        phonetic: 'seen pee-KAHN-teh PAH-rah MEE por fah-VOR',
        audio_text: 'Sin picante para mí, por favor.',
        context_note: 'Clear instruction if you have low spice tolerance.'
      },
      {
        phrase_es: '¿Cuánto le debo, joven?',
        phrase_en: 'How much do I owe you?',
        phonetic: 'KWAN-toh leh DEH-boh HOH-vehn',
        audio_text: '¿Cuánto le debo, joven?',
        context_note: '"Joven" is a friendly, customary address for service staff in Mexico regardless of age.'
      }
    ],
    contrast_examples: [
      {
        textbook_formal: 'Quisiera pagar la cuenta de mis alimentos consumidos.',
        natural_mexican: '¿Cuánto le debo, güero?',
        english_translation: 'How much do I owe you, chief?',
        why_natural: 'Street food stands use friendly, warm colloquialisms like "güero" or "joven".'
      },
      {
        textbook_formal: 'Por favor no agregue salsa picante a mi platillo.',
        natural_mexican: 'Sin salsa, porfa.',
        english_translation: 'No salsa, please.',
        why_natural: 'Shortened "porfa" is standard casual Mexican Spanish.'
      }
    ],
    example_variations: [
      {
        original_structure: '¿Me da tres de [MEAT] con todo?',
        varied_es: '¿Me da dos de suadero con todo?',
        varied_en: 'Can I get two suadero tacos with everything?',
        swapped_element: 'Swapped pastor for suadero meat'
      },
      {
        original_structure: '¿Me da tres de [MEAT] con todo?',
        varied_es: '¿Me da cuatro de campechano sin cebolla?',
        varied_en: 'Can I get four campechano tacos without onions?',
        swapped_element: 'Swapped meat and requested no onions'
      },
      {
        original_structure: '¿Cuánto le debo por [ITEM]?',
        varied_es: '¿Cuánto le debo por las dos gringas y el refresco?',
        varied_en: 'How much do I owe you for the two gringas and the soda?',
        swapped_element: 'Specified exact items eaten'
      },
      {
        original_structure: '¿Cuánto le debo por [ITEM]?',
        varied_es: '¿Cuánto va a ser en total?',
        varied_en: 'How much is it going to be in total?',
        swapped_element: 'General total cost query'
      }
    ]
  },
  {
    id: 'a1_mod_3',
    level: 'A1',
    title: 'Supermarket & Grocery Navigation',
    scenario_context: 'Locating products, asking for specific weights at the deli, and checking out at a supermarket in CDMX.',
    category: 'Shopping',
    emoji: '🛒',
    core_phrases: [
      {
        phrase_es: 'Disculpe, ¿en qué pasillo están las tortillas?',
        phrase_en: 'Excuse me, in which aisle are the tortillas?',
        phonetic: 'dees-KOOL-peh ehn keh pah-SEE-yoh ehs-TAHN lahs tor-TEE-yahs',
        audio_text: 'Disculpe, ¿en qué pasillo están las tortillas?',
        context_note: 'Polite way to ask for item locations in large stores.'
      },
      {
        phrase_es: '¿Me da medio kilo de queso oaxaca, por favor?',
        phrase_en: 'Can I get half a kilo of Oaxaca cheese, please?',
        phonetic: 'meh DAH MEH-dee-oh KEE-loh deh KEH-soh wah-HAH-kah por fah-VOR',
        audio_text: '¿Me da medio kilo de queso oaxaca, por favor?',
        context_note: 'Food is bought in kilos (kilo) or fractions (medio kilo, un cuarto de kilo).'
      },
      {
        phrase_es: '¿Aceptan tarjeta de crédito o solo efectivo?',
        phrase_en: 'Do you accept credit cards or cash only?',
        phonetic: 'ah-SEHP-tahn tar-HEH-tah deh KREH-dee-toh oh SOH-loh eh-fehk-TEE-boh',
        audio_text: '¿Aceptan tarjeta de crédito o solo efectivo?',
        context_note: 'Crucial before ringing up items at small markets.'
      },
      {
        phrase_es: '¿Necesita cambio de quinientos pesos?',
        phrase_en: 'Do you need change for a 500 peso bill?',
        phonetic: 'neh-seh-SEE-tah KAHM-bee-oh deh kee-NYEHN-tos PEH-sos',
        audio_text: '¿Necesita cambio de quinientos pesos?',
        context_note: 'In Mexico, vendors appreciate knowing if you pay with a large 500 bill.'
      }
    ],
    contrast_examples: [
      {
        textbook_formal: '¿Cuál es el lugar exacto de exhibición de los lácteos?',
        natural_mexican: 'Disculpe, ¿dónde encuentro los lácteos?',
        english_translation: 'Excuse me, where do I find dairy products?',
        why_natural: '"¿Dónde encuentro...?" is natural and direct.'
      },
      {
        textbook_formal: '¿Es posible realizar la transacción con divisas digitales?',
        natural_mexican: '¿Paso tarjeta o pago en efectivo?',
        english_translation: 'Shall I pay by card or in cash?',
        why_natural: '"Pasar tarjeta" is the natural phrase for paying via card terminal.'
      }
    ],
    example_variations: [
      {
        original_structure: '¿Me da [QUANTITY] de [ITEM]?',
        varied_es: '¿Me da doscientos gramos de jamón de pavo?',
        varied_en: 'Can I get 200 grams of turkey ham?',
        swapped_element: 'Swapped cheese for 200g of turkey ham'
      },
      {
        original_structure: '¿Me da [QUANTITY] de [ITEM]?',
        varied_es: '¿Me da un kilo de aguacate hass?',
        varied_en: 'Can I get one kilo of Hass avocado?',
        swapped_element: 'Swapped for 1kg of avocados'
      },
      {
        original_structure: '¿En qué pasillo está [PRODUCT]?',
        varied_es: '¿En qué pasillo encuentro el agua embotellada?',
        varied_en: 'In which aisle do I find bottled water?',
        swapped_element: 'Swapped product for bottled water'
      },
      {
        original_structure: '¿En qué pasillo está [PRODUCT]?',
        varied_es: '¿En qué pasillo está el café en grano?',
        varied_en: 'In which aisle is the whole bean coffee?',
        swapped_element: 'Swapped product for whole bean coffee'
      }
    ]
  },
  {
    id: 'a1_mod_4',
    level: 'A1',
    title: 'Uber & Transit Directions',
    scenario_context: 'Giving clear drop-off instructions to Uber drivers or asking directions on CDMX streets.',
    category: 'Transportation',
    emoji: '🚗',
    core_phrases: [
      {
        phrase_es: 'Me puede dejar aquí en la esquina, por favor.',
        phrase_en: 'You can drop me off right here at the corner, please.',
        phonetic: 'meh PWEH-deh deh-HAR ah-KEE ehn lah ehs-KEE-nah por fah-VOR',
        audio_text: 'Me puede dejar aquí en la esquina, por favor.',
        context_note: 'Standard instruction for Uber or taxi drivers.'
      },
      {
        phrase_es: 'Vuelta a la derecha en el semáforo, por favor.',
        phrase_en: 'Turn right at the traffic light, please.',
        phonetic: 'VWEHL-tah ah lah deh-REH-chah ehn ehl seh-MAH-foh-roh por fah-VOR',
        audio_text: 'Vuelta a la derecha en el semáforo, por favor.',
        context_note: '"Vuelta a la derecha" is turn right; "vuelta a la izquierda" is turn left.'
      },
      {
        phrase_es: '¿Sigue la ruta del mapa o prefiere otra calle?',
        phrase_en: 'Are you following the map route or do you prefer another street?',
        phonetic: 'SEE-geh lah ROO-tah dehl MAH-pah oh preh-FYEH-reh OH-trah KAH-yeh',
        audio_text: '¿Sigue la ruta del mapa o prefiere otra calle?',
        context_note: 'Polite way to check route preference with driver.'
      },
      {
        phrase_es: 'Muchas gracias, ¡que tenga buen día!',
        phrase_en: 'Thank you very much, have a great day!',
        phonetic: 'MOO-chas GRAH-see-ahs keh TEHN-gah bwehn DEE-ah',
        audio_text: 'Muchas gracias, ¡que tenga buen día!',
        context_note: 'Warm farewell when stepping out of a ride.'
      }
    ],
    contrast_examples: [
      {
        textbook_formal: 'Solicito la detención inmediata del vehículo en la intersección.',
        natural_mexican: 'Aquí en el semáforo está perfecto, gracias.',
        english_translation: 'Right here at the traffic light is perfect, thanks.',
        why_natural: 'Conversational directions use "aquí está perfecto" instead of formal command verbs.'
      },
      {
        textbook_formal: 'Gire hacia la dirección diestra en la señal luminosa.',
        natural_mexican: 'Doble a la derecha, porfa.',
        english_translation: 'Turn right, please.',
        why_natural: '"Doble" or "vuelta" is the authentic Mexican verb for turning in a vehicle.'
      }
    ],
    example_variations: [
      {
        original_structure: 'Me puede dejar en [LOCATION].',
        varied_es: 'Me puede dejar pasando el parque, por favor.',
        varied_en: 'You can drop me off just past the park, please.',
        swapped_element: 'Swapped corner for past the park'
      },
      {
        original_structure: 'Me puede dejar en [LOCATION].',
        varied_es: 'Me puede dejar frente al OXXO, por favor.',
        varied_en: 'You can drop me off in front of the OXXO store, please.',
        swapped_element: 'Used popular landmark anchor'
      },
      {
        original_structure: 'Vuelta a la [DIRECTION].',
        varied_es: 'Vuelta a la izquierda en la siguiente cuadra.',
        varied_en: 'Turn left at the next block.',
        swapped_element: 'Swapped right for left at next block'
      },
      {
        original_structure: 'Vuelta a la [DIRECTION].',
        varied_es: 'Todo derecho hasta topes.',
        varied_en: 'Straight ahead until the speed bumps.',
        swapped_element: 'Changed to straight ahead until speed bumps'
      }
    ]
  },

  // ==================== LEVEL A2: DOMESTIC AUTONOMY & LOCAL SOCIAL LIFE ====================
  {
    id: 'a2_mod_5',
    level: 'A2',
    title: 'Apartment Maintenance & Landlord Chat',
    scenario_context: 'Reporting apartment repairs, hot water issues, and Wi-Fi glitches via WhatsApp to a landlord in Mexico.',
    category: 'Home & Living',
    emoji: '🏠',
    core_phrases: [
      {
        phrase_es: 'Hola, disculpe la molestia, pero no hay agua caliente.',
        phrase_en: 'Hello, sorry to bother you, but there is no hot water.',
        phonetic: 'OH-lah dees-KOOL-peh lah moh-LEHS-tee-ah peh-roh noh ay AH-gwah kah-LYEHN-teh',
        audio_text: 'Hola, disculpe la molestia, pero no hay agua caliente.',
        context_note: '"Disculpe la molestia" is the gold standard polite opener for issue reporting.'
      },
      {
        phrase_es: '¿Cree que pueda venir un técnico a revisarlo hoy?',
        phrase_en: 'Do you think a technician could come check it today?',
        phonetic: 'keh KREH-eh keh PWEH-dah veh-NEER oon TEHK-nee-koh ah reh-vee-SAR-loh oy',
        audio_text: '¿Cree que pueda venir un técnico a revisarlo hoy?',
        context_note: 'Polite request using "cree que pueda...".'
      },
      {
        phrase_es: 'El internet se desconectó desde la mañana.',
        phrase_en: 'The internet has been disconnected since this morning.',
        phonetic: 'ehl een-tehr-NEHT seh dehs-koh-nehk-TOH DEHS-deh lah mah-NYAH-nah',
        audio_text: 'El internet se desconectó desde la mañana.',
        context_note: 'Clear time framing for service outages.'
      },
      {
        phrase_es: 'Ya quedó solucionado, ¡muchas gracias por su ayuda!',
        phrase_en: 'It is resolved now, thank you so much for your help!',
        phonetic: 'yah keh-DOH soh-loo-see-oh-NAH-doh MOO-chas GRAH-see-ahs por soo ah-YOO-dah',
        audio_text: 'Ya quedó solucionado, ¡muchas gracias por su ayuda!',
        context_note: '"Ya quedó..." is a key Mexican phrase meaning "it is done / all set".'
      }
    ],
    contrast_examples: [
      {
        textbook_formal: 'Exijo la reparación inmediata del sistema de tuberías de mi piso.',
        natural_mexican: 'Hola, disculpe la molestia, es que la fuga del baño sigue saliendo.',
        english_translation: 'Hi, sorry for the trouble, it is just that the bathroom leak is still dripping.',
        why_natural: 'Mexican resolution culture favors soft polite openers like "es que..." over demands.'
      },
      {
        textbook_formal: 'El problema ha sido resuelto de manera satisfactoria.',
        natural_mexican: 'Ya quedó listo, muchas gracias.',
        english_translation: 'It is all set now, thanks a lot.',
        why_natural: '"Ya quedó listo" is the standard phrase for task completion.'
      }
    ],
    example_variations: [
      {
        original_structure: 'No hay [SERVICE/ITEM] en la casa.',
        varied_es: 'No hay luz en la cocina desde hace una hora.',
        varied_en: 'There is no electricity in the kitchen since an hour ago.',
        swapped_element: 'Swapped hot water for electricity in kitchen'
      },
      {
        original_structure: 'No hay [SERVICE/ITEM] en la casa.',
        varied_es: 'No funciona el aire acondicionado de la recámara.',
        varied_en: 'The bedroom air conditioner is not working.',
        swapped_element: 'Swapped for bedroom AC failure'
      },
      {
        original_structure: '¿Cree que pueda venir alguien a [ACTION]?',
        varied_es: '¿Cree que pueda venir el plomero a cambiar el empaque?',
        varied_en: 'Do you think the plumber could come replace the seal?',
        swapped_element: 'Requested plumber for seal replacement'
      },
      {
        original_structure: '¿Cree que pueda venir alguien a [ACTION]?',
        varied_es: '¿Cree que puedan mandar otra llave de repuesto?',
        varied_en: 'Do you think you could send another spare key?',
        swapped_element: 'Requested spare key delivery'
      }
    ]
  },
  {
    id: 'a2_mod_6',
    level: 'A2',
    title: 'Pharmacy & Medical Needs',
    scenario_context: 'Describing symptoms, buying over-the-counter medicine, and understanding dosage at a Farmacia del Ahorro.',
    category: 'Health & Wellness',
    emoji: '💊',
    core_phrases: [
      {
        phrase_es: 'Me duele mucho la garganta y tengo dolor de cabeza.',
        phrase_en: 'My throat hurts a lot and I have a headache.',
        phonetic: 'meh DWEH-leh MOO-choh lah gar-GAHN-tah ee TEHN-goh doh-LOR deh kah-BEH-sah',
        audio_text: 'Me duele mucho la garganta y tengo dolor de cabeza.',
        context_note: 'Standard structure "Me duele [BODY_PART]". Body parts use "la/el", not "mi".'
      },
      {
        phrase_es: '¿Tendrá algo para el malestar de estómago?',
        phrase_en: 'Would you have something for stomach discomfort?',
        phonetic: 'tehn-DRAH AHL-goh PAH-rah ehl mahl-ehs-TAR deh ehs-TOH-mah-goh',
        audio_text: '¿Tendrá algo para el malestar de estómago?',
        context_note: '"Malestar" is the soft, universal word for physical discomfort.'
      },
      {
        phrase_es: '¿Cada cuántas horas me debo tomar esta pastilla?',
        phrase_en: 'How many hours apart should I take this pill?',
        phonetic: 'KAH-dah KWAN-tas OH-ras meh DEH-boh toh-MAR EHS-tah pahs-TEE-yah',
        audio_text: '¿Cada cuántas horas me debo tomar esta pastilla?',
        context_note: 'Essential question for dosage instructions.'
      },
      {
        phrase_es: '¿Este medicamento requiere receta médica?',
        phrase_en: 'Does this medication require a prescription?',
        phonetic: 'EHS-teh meh-dee-kah-MEHN-toh reh-KYEH-reh reh-SEH-tah MEH-dee-kah',
        audio_text: '¿Este medicamento requiere receta médica?',
        context_note: '"Receta" means prescription (as well as recipe).'
      }
    ],
    contrast_examples: [
      {
        textbook_formal: 'Padezco de una afección aguda en la cavidad faríngea.',
        natural_mexican: 'Siento como raspada la garganta.',
        english_translation: 'My throat feels scratchy.',
        why_natural: 'Locals use descriptive sensory feelings like "raspada" or "cuerpo cortado".'
      },
      {
        textbook_formal: 'Indíqueme la posología de este fármaco.',
        natural_mexican: '¿Cómo me la tomo, perdón?',
        english_translation: 'How do I take it, sorry?',
        why_natural: 'Natural spoken Spanish uses simple "cómo me la tomo".'
      }
    ],
    example_variations: [
      {
        original_structure: 'Me duele [BODY_PART] desde ayer.',
        varied_es: 'Me duele mucho la espalda baja.',
        varied_en: 'My lower back hurts a lot.',
        swapped_element: 'Swapped throat for lower back'
      },
      {
        original_structure: 'Me duele [BODY_PART] desde ayer.',
        varied_es: 'Tengo los ojos muy irritados por el sol.',
        varied_en: 'My eyes are very irritated from the sun.',
        swapped_element: 'Swapped for irritated eyes'
      },
      {
        original_structure: '¿Tiene algo para [SYMPTOM]?',
        varied_es: '¿Tiene algún suero oral para la deshidratación?',
        varied_en: 'Do you have an oral rehydration drink for dehydration?',
        swapped_element: 'Asked for rehydration drink'
      },
      {
        original_structure: '¿Tiene algo para [SYMPTOM]?',
        varied_es: '¿Tiene pomada para las picaduras de mosquito?',
        varied_en: 'Do you have cream for mosquito bites?',
        swapped_element: 'Asked for cream for mosquito bites'
      }
    ]
  },
  {
    id: 'a2_mod_7',
    level: 'A2',
    title: 'Socializing & Making Local Friends',
    scenario_context: 'Introducing yourself at a local language exchange or park in CDMX, sharing hobbies, and exchanging WhatsApp handles.',
    category: 'Socializing',
    emoji: '👋',
    core_phrases: [
      {
        phrase_es: '¡Hola! ¿A qué te dedicas por acá?',
        phrase_en: 'Hi! What do you do for work around here?',
        phonetic: 'OH-lah ah keh teh deh-DEE-kas por ah-KAH',
        audio_text: '¡Hola! ¿A qué te dedicas por acá?',
        context_note: '"¿A qué te dedicas?" is the standard polite way to ask someone what they do.'
      },
      {
        phrase_es: 'Llevo tres meses viviendo en la Ciudad de México.',
        phrase_en: 'I have been living in Mexico City for three months.',
        phonetic: 'YEH-boh trehs MEH-sehs vee-VYEHN-doh ehn lah see-oo-DAD deh MEH-hee-koh',
        audio_text: 'Llevo tres meses viviendo en la Ciudad de México.',
        context_note: 'Structure "Llevo [TIME] [VERB-ING]" is the natural way to express duration.'
      },
      {
        phrase_es: 'Me encanta caminar por Coyoacán los fines de semana.',
        phrase_en: 'I love walking through Coyoacán on weekends.',
        phonetic: 'meh ehn-KAHN-tah kah-mee-NAR por koh-yo-ah-KAHN los FEE-nehs deh seh-MAH-nah',
        audio_text: 'Me encanta caminar por Coyoacán los fines de semana.',
        context_note: 'Sharing favorite city spots builds instant social rapport.'
      },
      {
        phrase_es: '¿Tienes WhatsApp para estar en contacto?',
        phrase_en: 'Do you have WhatsApp to stay in touch?',
        phonetic: 'TYEH-nehs WhatsApp PAH-rah ehs-TAR ehn kohn-TAHK-toh',
        audio_text: '¿Tienes WhatsApp para estar en contacto?',
        context_note: 'WhatsApp is the primary messaging tool across all of Latin America.'
      }
    ],
    contrast_examples: [
      {
        textbook_formal: '¿Cuál es su ocupación laboral en este país?',
        natural_mexican: '¿A qué te dedicas?',
        english_translation: 'What do you do for work?',
        why_natural: '"¿A qué te dedicas?" is warm and conversational.'
      },
      {
        textbook_formal: '¿Me concede su número telefónico residencial?',
        natural_mexican: '¿Te paso mi Whats?',
        english_translation: 'Shall I give you my WhatsApp?',
        why_natural: 'Everyone shortens WhatsApp to "Whats".'
      }
    ],
    example_variations: [
      {
        original_structure: 'Llevo [TIME] viviendo en [CITY].',
        varied_es: 'Llevo un año trabajando de forma remota.',
        varied_en: 'I have been working remotely for a year.',
        swapped_element: 'Swapped living location for remote work duration'
      },
      {
        original_structure: 'Llevo [TIME] viviendo en [CITY].',
        varied_es: 'Llevo un par de semanas aprendiendo español.',
        varied_en: 'I have been learning Spanish for a couple of weeks.',
        swapped_element: 'Swapped for Spanish learning duration'
      },
      {
        original_structure: 'Me encanta [ACTIVITY] los [DAYS].',
        varied_es: 'Me encanta probar restaurantes nuevos los viernes.',
        varied_en: 'I love trying new restaurants on Fridays.',
        swapped_element: 'Swapped walking for trying restaurants'
      },
      {
        original_structure: 'Me encanta [ACTIVITY] los [DAYS].',
        varied_es: 'Me encanta ir en bici por Reforma los domingos.',
        varied_en: 'I love cycling down Reforma street on Sundays.',
        swapped_element: 'Swapped activity for Sunday bike rides'
      }
    ]
  },
  {
    id: 'a2_mod_8',
    level: 'A2',
    title: 'Hotel Check-In & Travel Upgrades',
    scenario_context: 'Checking into a hotel in Oaxaca or Cancún, asking for quiet rooms, late check-out, and local recommendations.',
    category: 'Travel & Lodging',
    emoji: '🏨',
    core_phrases: [
      {
        phrase_es: 'Tengo una reservación a nombre de Alex Smith.',
        phrase_en: 'I have a reservation under the name Alex Smith.',
        phonetic: 'TEHN-goh OO-nah reh-sehr-vah-SEE-ohn ah NOHM-breh deh Alex Smith',
        audio_text: 'Tengo una reservación a nombre de Alex Smith.',
        context_note: 'Standard check-in phrase at any hotel front desk.'
      },
      {
        phrase_es: '¿Sería posible tener una habitación en un piso alto?',
        phrase_en: 'Would it be possible to get a room on a high floor?',
        phonetic: 'seh-REE-ah poh-SEE-bleh teh-NER OO-nah ah-bee-tah-SEE-ohn ehn oon PEE-soh AHL-toh',
        audio_text: '¿Sería posible tener una habitación en un piso alto?',
        context_note: 'Polite request using conditional "¿Sería posible...?"'
      },
      {
        phrase_es: '¿A qué hora se sirve el desayuno mañana?',
        phrase_en: 'What time is breakfast served tomorrow?',
        phonetic: 'ah keh OH-rah seh SEER-veh ehl deh-sah-YOO-noh mah-NYAH-nah',
        audio_text: '¿A qué hora se sirve el desayuno mañana?',
        context_note: 'Key question for morning schedules.'
      },
      {
        phrase_es: '¿Tendrán opción de late check-out para la salida?',
        phrase_en: 'Would you have a late check-out option for departure?',
        phonetic: 'tehn-DRAHN ohp-SEE-ohn deh late check-out PAH-rah lah sah-LEE-dah',
        audio_text: '¿Tendrán opción de late check-out para la salida?',
        context_note: '"Late check-out" is widely understood in hospitality.'
      }
    ],
    contrast_examples: [
      {
        textbook_formal: 'Deseo efectuar mi registro de entrada en el hospedaje.',
        natural_mexican: 'Buenas tardes, vengo a hacer el check-in.',
        english_translation: 'Good afternoon, I am here to check in.',
        why_natural: '"Hacer el check-in" is universal in Mexican hotels.'
      },
      {
        textbook_formal: 'Solicito la extensión del horario de mi partida.',
        natural_mexican: '¿Se podrá salir un poquito más tarde?',
        english_translation: 'Could I leave a little bit later?',
        why_natural: 'Mexican Spanish relies on friendly diminutives like "un poquito".'
      }
    ],
    example_variations: [
      {
        original_structure: '¿Sería posible tener una habitación con [FEATURE]?',
        varied_es: '¿Sería posible tener una habitación más silenciosa?',
        varied_en: 'Would it be possible to get a quieter room?',
        swapped_element: 'Swapped high floor for quieter room'
      },
      {
        original_structure: '¿Sería posible tener una habitación con [FEATURE]?',
        varied_es: '¿Sería posible tener una habitación con vista al jardín?',
        varied_en: 'Would it be possible to get a room with a garden view?',
        swapped_element: 'Swapped for garden view room'
      },
      {
        original_structure: '¿Nos puede recomendar un buen lugar para [ACTIVITY]?',
        varied_es: '¿Nos puede recomendar un buen lugar para cenar comida típica?',
        varied_en: 'Could you recommend a good place for typical local dinner?',
        swapped_element: 'Asked for local dinner spot'
      },
      {
        original_structure: '¿Nos puede recomendar un buen lugar para [ACTIVITY]?',
        varied_es: '¿Nos puede recomendar un taxi seguro para el aeropuerto?',
        varied_en: 'Could you recommend a safe taxi to the airport?',
        swapped_element: 'Asked for safe airport taxi'
      }
    ]
  },

  // ==================== LEVEL B1: FLUID EXPRESSIVENESS & STORYTELLING ====================
  {
    id: 'b1_mod_9',
    level: 'B1',
    title: 'Storytelling & Past Anecdotes',
    scenario_context: 'Sharing travel stories, unexpected occurrences, and funny personal anecdotes during a dinner party in Mexico.',
    category: 'Conversational Fluency',
    emoji: '📖',
    core_phrases: [
      {
        phrase_es: 'No te imaginas lo que me pasó el fin de semana pasado.',
        phrase_en: 'You cannot imagine what happened to me last weekend.',
        phonetic: 'noh teh ee-mah-HEE-nas loh keh meh pah-SOH ehl feen deh seh-MAH-nah pah-SAH-doh',
        audio_text: 'No te imaginas lo que me pasó el fin de semana pasado.',
        context_note: 'Perfect narrative hook to grab attention in a group conversation.'
      },
      {
        phrase_es: 'Estaba caminando tranquilamente cuando de repente empezó a llover fortísimo.',
        phrase_en: 'I was walking peacefully when suddenly it started raining super hard.',
        phonetic: 'ehs-TAH-bah kah-mee-NAHN-doh trahn-KEE-lah-MEHN-teh KWAN-doh deh reh-PEHN-teh ehm-peh-ZOH ah yo-VER for-TEE-see-moh',
        audio_text: 'Estaba caminando tranquilamente cuando de repente empezó a llover fortísimo.',
        context_note: 'Preterite vs Imperfect harmony: Imperfect sets background ("estaba caminando"), Preterite breaks in ("empezó").'
      },
      {
        phrase_es: 'Al final, un señor súper amable me prestó un paraguas.',
        phrase_en: 'In the end, a super nice man lent me an umbrella.',
        phonetic: 'ahl fee-NAL oon seh-NYOR SOO-pehr ah-MAH-bleh meh prehs-TOH oon pah-RAH-gwahs',
        audio_text: 'Al final, un señor súper amable me prestó un paraguas.',
        context_note: '"Al final..." resolves a narrative arc smoothly.'
      },
      {
        phrase_es: '¡Fue una aventura total!',
        phrase_en: 'It was a total adventure!',
        phonetic: 'FWEH OO-nah ahv-ehn-TOO-rah toh-TAL',
        audio_text: '¡Fue una aventura total!',
        context_note: 'Enthusiastic takeaway phrase.'
      }
    ],
    contrast_examples: [
      {
        textbook_formal: 'Ocurrió un acontecimiento imprevisto durante mi trayecto peatonal.',
        natural_mexican: 'No sabes la bronca en la que me metí.',
        english_translation: 'You have no idea what a mess I got into.',
        why_natural: '"Bronca" is authentic Mexican slang for a predicament or issue.'
      },
      {
        textbook_formal: 'Posteriormente concluyó la situación adversa.',
        natural_mexican: 'Total que al final todo salió bien.',
        english_translation: 'In short, in the end everything turned out fine.',
        why_natural: '"Total que..." is the universal Mexican conversational transition.'
      }
    ],
    example_variations: [
      {
        original_structure: 'Estaba [ACTION-ING] cuando de repente [SUDDEN-EVENT].',
        varied_es: 'Estaba pidiendo la cuenta cuando de repente se fue la luz.',
        varied_en: 'I was asking for the bill when suddenly the power went out.',
        swapped_element: 'Swapped walking for asking for bill when power cut'
      },
      {
        original_structure: 'Estaba [ACTION-ING] cuando de repente [SUDDEN-EVENT].',
        varied_es: 'Estaba buscando el camión cuando se me apagó el celular.',
        varied_en: 'I was looking for the bus when my phone died.',
        swapped_element: 'Swapped for phone dying while taking bus'
      },
      {
        original_structure: 'Al final, [RESOLUTION].',
        varied_es: 'Al final, unos chavos me ayudaron a pedir un taxi.',
        varied_en: 'In the end, some guys helped me order a taxi.',
        swapped_element: 'Swapped umbrella for helpful locals'
      },
      {
        original_structure: 'Al final, [RESOLUTION].',
        varied_es: 'Al final, todo quedó en una buena anécdota.',
        varied_en: 'In the end, it all became a funny story.',
        swapped_element: 'Philosophical story resolution'
      }
    ]
  },
  {
    id: 'b1_mod_10',
    level: 'B1',
    title: 'Expressing Opinions & Debating Topics',
    scenario_context: 'Participating in friendly debates about films, gastronomy, or urban developments in Mexico.',
    category: 'Discussion & Debates',
    emoji: '💬',
    core_phrases: [
      {
        phrase_es: 'Desde mi punto de vista, la comida oaxaqueña es la más rica de México.',
        phrase_en: 'From my point of view, Oaxacan food is the delicious in Mexico.',
        phonetic: 'DEHS-deh mee POON-toh deh VEES-tah lah koh-MEE-dah wah-hah-KEH-nyah ehs lah mas REE-kah deh MEH-hee-koh',
        audio_text: 'Desde mi punto de vista, la comida oaxaqueña es la más rica de México.',
        context_note: 'Polite opinion anchor.'
      },
      {
        phrase_es: 'Coincido contigo en parte, pero hay que considerar el precio.',
        phrase_en: 'I agree with you in part, but one must consider the price.',
        phonetic: 'koh-een-SEE-doh kohn-TEE-goh ehn PAR-teh peh-roh ay keh kohn-see-deh-RAR ehl PREH-see-oh',
        audio_text: 'Coincido contigo en parte, pero hay que considerar el precio.',
        context_note: 'Diplomatic partial agreement.'
      },
      {
        phrase_es: 'No me parece que esa sea la mejor alternativa.',
        phrase_en: 'It does not seem to me that that is the best alternative.',
        phonetic: 'noh meh pah-REH-seh keh EH-sah seh-ah lah meh-HOR ahl-tehr-nah-TEE-vah',
        audio_text: 'No me parece que esa sea la mejor alternativa.',
        context_note: 'Uses subjunctive ("sea") after negative opinion trigger ("no me parece que...").'
      },
      {
        phrase_es: '¿Tú qué opinas al respecto?',
        phrase_en: 'What is your opinion regarding this?',
        phonetic: 'too keh oh-PEE-nas ahl rehs-PEHK-toh',
        audio_text: '¿Tú qué opinas al respecto?',
        context_note: 'Passes the microphone back to the speaker.'
      }
    ],
    contrast_examples: [
      {
        textbook_formal: 'Manifiesto mi discrepancia categórica con su aseveración.',
        natural_mexican: 'Siento que no va por ahí la cosa.',
        english_translation: 'I feel that is not really how it goes.',
        why_natural: '"No va por ahí" is a very common Mexican way to soften disagreement.'
      },
      {
        textbook_formal: 'Comparto plenamente su juicio ético.',
        natural_mexican: 'Totalmente de acuerdo contigo.',
        english_translation: 'Totally agree with you.',
        why_natural: 'Direct and enthusiastic agreement.'
      }
    ],
    example_variations: [
      {
        original_structure: 'Desde mi punto de vista, [OPINION].',
        varied_es: 'Desde mi punto de vista, es mejor viajar en tren que en avión.',
        varied_en: 'From my point of view, it is better to travel by train than plane.',
        swapped_element: 'Swapped food opinion for travel preferences'
      },
      {
        original_structure: 'Desde mi punto de vista, [OPINION].',
        varied_es: 'Siento que hace falta más transporte público nocturno.',
        varied_en: 'I feel that more night public transport is needed.',
        swapped_element: 'Swapped for urban infrastructure view'
      },
      {
        original_structure: 'No me parece que [SUBJUNCTIVE-CLAUSE].',
        varied_es: 'No me parece que valga la pena esperar dos horas.',
        varied_en: 'It does not seem to me to be worth waiting two hours.',
        swapped_element: 'Used subjunctive "valga"'
      },
      {
        original_structure: 'No me parece que [SUBJUNCTIVE-CLAUSE].',
        varied_es: 'No me parece que sea necesario gastar tanto.',
        varied_en: 'It does not seem to me that it is necessary to spend so much.',
        swapped_element: 'Used subjunctive "sea"'
      }
    ]
  },
  {
    id: 'b1_mod_11',
    level: 'B1',
    title: 'Professional Slack & Email Etiquette',
    scenario_context: 'Communicating asynchronously on Slack or email with Mexican colleagues, scheduling syncs, and asking for updates.',
    category: 'Workplace & Business',
    emoji: '💼',
    core_phrases: [
      {
        phrase_es: 'Hola equipo, quedo al pendiente de sus comentarios.',
        phrase_en: 'Hello team, I remain attentive to your feedback.',
        phonetic: 'OH-lah eh-KEE-poh KEH-doh ahl pehn-DYEHN-teh deh soos koh-mehn-TAH-ree-os',
        audio_text: 'Hola equipo, quedo al pendiente de sus comentarios.',
        context_note: '"Quedo al pendiente" is the standard Mexican professional email sign-off.'
      },
      {
        phrase_es: '¿Tendrás diez minutitos para una llamada rápida?',
        phrase_en: 'Would you have ten short minutes for a quick call?',
        phonetic: 'tehn-DRAHS dyehs mee-noo-TEE-tos PAH-rah OO-nah yah-MAH-dah RAH-pee-dah',
        audio_text: '¿Tendrás diez minutitos para una llamada rápida?',
        context_note: 'Polite, soft request for ad-hoc syncs.'
      },
      {
        phrase_es: 'Le doy seguimiento al proyecto y les aviso por aquí.',
        phrase_en: 'I am following up on the project and will update you all here.',
        phonetic: 'leh doy seh-gwee-MYEHN-toh ahl proh-YEHK-toh ee lehs ah-VEE-soh por ah-KEE',
        audio_text: 'Le doy seguimiento al proyecto y les aviso por aquí.',
        context_note: '"Dar seguimiento" is the universal workplace verb for following up.'
      },
      {
        phrase_es: 'Agradezco de antemano su pronta respuesta.',
        phrase_en: 'Thank you in advance for your prompt reply.',
        phonetic: 'ah-grah-DEHS-koh deh ahn-teh-MAH-noh soo PROHN-tah rehs-PWEHS-tah',
        audio_text: 'Agradezco de antemano su pronta respuesta.',
        context_note: 'Formal closing for client-facing communications.'
      }
    ],
    contrast_examples: [
      {
        textbook_formal: 'Aguardaré su respuesta oficial mediante correo electrónico.',
        natural_mexican: 'Quedo al pendiente de tus comentarios por Slack.',
        english_translation: 'I stay tuned for your feedback via Slack.',
        why_natural: '"Quedo al pendiente" is the standard professional cadence.'
      },
      {
        textbook_formal: 'Requiero una conferencia síncrona con usted.',
        natural_mexican: '¿Echarás un minilink o llamada rapidita?',
        english_translation: 'Would you hop on a quick mini-link or call?',
        why_natural: 'Casual, modern startup atmosphere in CDMX.'
      }
    ],
    example_variations: [
      {
        original_structure: 'Quedo al pendiente de [DOCUMENT/UPDATE].',
        varied_es: 'Quedo al pendiente de la confirmación de la fecha.',
        varied_en: 'I remain attentive to the confirmation of the date.',
        swapped_element: 'Swapped comments for date confirmation'
      },
      {
        original_structure: 'Quedo al pendiente de [DOCUMENT/UPDATE].',
        varied_es: 'Quedo al pendiente de la versión final del reporte.',
        varied_en: 'I remain attentive to the final version of the report.',
        swapped_element: 'Swapped for final report version'
      },
      {
        original_structure: 'Le doy seguimiento a [TASK].',
        varied_es: 'Le doy seguimiento a la factura pendiente.',
        varied_en: 'I am following up on the pending invoice.',
        swapped_element: 'Followed up on invoice'
      },
      {
        original_structure: 'Le doy seguimiento a [TASK].',
        varied_es: 'Le doy seguimiento a la propuesta para el cliente.',
        varied_en: 'I am following up on the client proposal.',
        swapped_element: 'Followed up on client proposal'
      }
    ]
  },
  {
    id: 'b1_mod_12',
    level: 'B1',
    title: 'Customer Support & Refunds',
    scenario_context: 'Resolving billing errors, disputed credit card charges, or requesting product exchanges politely yet assertively.',
    category: 'Problem Solving',
    emoji: '📞',
    core_phrases: [
      {
        phrase_es: 'Llamo para solicitar una aclaración sobre un cargo en mi cuenta.',
        phrase_en: 'I am calling to request a clarification regarding a charge on my account.',
        phonetic: 'YAH-moh PAH-rah soh-lee-see-TAR OO-nah ah-klah-rah-SEE-ohn SOH-breh oon KAHR-goh ehn mee KWEHN-tah',
        audio_text: 'Llamo para solicitar una aclaración sobre un cargo en mi cuenta.',
        context_note: 'Standard opening line for banking or service customer service.'
      },
      {
        phrase_es: 'El producto llegó dañado y quisiera pedir un reembolso.',
        phrase_en: 'The product arrived damaged and I would like to request a refund.',
        phonetic: 'ehl proh-DOOK-toh yeh-GOH dah-NYAH-doh ee kee-SYEH-rah peh-DEER oon rehem-BOHL-soh',
        audio_text: 'El producto llegó dañado y quisiera pedir un reembolso.',
        context_note: 'Polite conditional "quisiera" makes requests smooth.'
      },
      {
        phrase_es: '¿Con quién me puedo dirigir para resolver este asunto?',
        phrase_en: 'Whom can I address to resolve this matter?',
        phonetic: 'kohn KYEHN meh PWEH-doh dee-ree-HEER PAH-rah reh-sohl-VER EHS-teh ah-SOON-toh',
        audio_text: '¿Con quién me puedo dirigir para resolver este asunto?',
        context_note: 'Escalation phrase when talking to first-tier support agents.'
      },
      {
        phrase_es: 'Le agradezco mucho la atención brindada.',
        phrase_en: 'I thank you very much for the assistance provided.',
        phonetic: 'leh ah-grah-DEHS-koh MOO-choh lah ah-tehn-SEE-ohn breen-DAH-dah',
        audio_text: 'Le agradezco mucho la atención brindada.',
        context_note: 'Polite closing for customer support calls.'
      }
    ],
    contrast_examples: [
      {
        textbook_formal: 'Exijo la devolución pecuniaria de mis fondos retenidos.',
        natural_mexican: 'Quisiera pedir el reembolso de la compra, por favor.',
        english_translation: 'I would like to request a refund for the purchase, please.',
        why_natural: '"Quisiera pedir el reembolso" gets fast results without hostility.'
      },
      {
        textbook_formal: 'Transfiérame inmediatamente con su superior jerárquico.',
        natural_mexican: '¿Habrá manera de checarlo con un supervisor?',
        english_translation: 'Would there be a way to check it with a supervisor?',
        why_natural: '"¿Habrá manera de...?" is polite escalation.'
      }
    ],
    example_variations: [
      {
        original_structure: 'Quisiera pedir [REQUEST] por favor.',
        varied_es: 'Quisiera pedir un cambio de talla por favor.',
        varied_en: 'I would like to request a size change please.',
        swapped_element: 'Swapped refund for size exchange'
      },
      {
        original_structure: 'Quisiera pedir [REQUEST] por favor.',
        varied_es: 'Quisiera pedir la cancelación del servicio sin penalización.',
        varied_en: 'I would like to request service cancellation without penalty.',
        swapped_element: 'Swapped for service cancellation'
      },
      {
        original_structure: 'Llamo para solicitar [REASON].',
        varied_es: 'Llamo para solicitar una prórroga de pago.',
        varied_en: 'I am calling to request a payment extension.',
        swapped_element: 'Requested payment extension'
      },
      {
        original_structure: 'Llamo para solicitar [REASON].',
        varied_es: 'Llamo para solicitar el comprobante fiscal.',
        varied_en: 'I am calling to request the tax invoice receipt (factura).',
        swapped_element: 'Requested tax receipt invoice'
      }
    ]
  },

  // ==================== LEVEL B2: PROFESSIONAL COMMAND & SUBJUNCTIVE DIPLOMACY ====================
  {
    id: 'b2_mod_13',
    level: 'B2',
    title: 'Salary & Contract Negotiations',
    scenario_context: 'Negotiating compensation terms, project scopes, and contract clauses in high-stakes professional meetings.',
    category: 'High-Stakes Business',
    emoji: '🤝',
    core_phrases: [
      {
        phrase_es: 'Propongo que revisemos las cláusulas del contrato antes de firmar.',
        phrase_en: 'I propose that we review the contract clauses before signing.',
        phonetic: 'proh-POHN-goh keh reh-vee-SEH-mos lahs KLOW-soo-lahs dehl kohn-TRAH-toh AHN-tehs deh feer-MAR',
        audio_text: 'Propongo que revisemos las cláusulas del contrato antes de firmar.',
        context_note: 'Uses subjunctive "revisemos" after proposal trigger "propongo que...".'
      },
      {
        phrase_es: 'En caso de que sea posible ajustar la propuesta salarial, estaríamos listos para avanzar.',
        phrase_en: 'In case it is possible to adjust the salary proposal, we would be ready to move forward.',
        phonetic: 'ehn KAH-soh deh keh SEH-ah poh-SEE-bleh ah-hoos-TAR lah proh-PWEHS-tah sah-lah-RYAL ehs-tah-REE-ah-mos LEES-tos PAH-rah ah-vahn-SAR',
        audio_text: 'En caso de que sea posible ajustar la propuesta salarial, estaríamos listos para avanzar.',
        context_note: 'Combines subjunctive ("sea posible") with conditional ("estaríamos listos").'
      },
      {
        phrase_es: '¿Qué margen de maniobra tenemos respecto al presupuesto?',
        phrase_en: 'What room for maneuver do we have regarding the budget?',
        phonetic: 'keh MAHR-hen deh mah-NYOH-brah teh-NEH-mos rehs-PEHK-toh ahl prehs-oo-PWEHS-toh',
        audio_text: '¿Qué margen de maniobra tenemos respecto al presupuesto?',
        context_note: '"Margen de maniobra" is executive vocabulary for flexibility.'
      },
      {
        phrase_es: 'Nos gustaría encontrar un punto medio que beneficie a ambas partes.',
        phrase_en: 'We would like to find a middle ground that benefits both parties.',
        phonetic: 'nos goos-tah-REE-ah ehn-kohn-TRAR oon POON-toh MEH-dee-oh keh beh-neh-FEE-see-eh ah AHM-bas PAR-tehs',
        audio_text: 'Nos gustaría encontrar un punto medio que beneficie a ambas partes.',
        context_note: 'Diplomatic positioning phrase.'
      }
    ],
    contrast_examples: [
      {
        textbook_formal: 'Rechazo sus términos y exijo una suma pecuniaria superior.',
        natural_mexican: 'Siento que podemos ajustar la cifra para llegar a un buen acuerdo.',
        english_translation: 'I feel we can adjust the figure to reach a good agreement.',
        why_natural: 'Softened language builds trust during high-stakes Mexican negotiations.'
      },
      {
        textbook_formal: 'Si usted no accede, cancelaré el contrato.',
        natural_mexican: 'En caso de no ser viable, tendríamos que evaluar otras opciones.',
        english_translation: 'In case it is not viable, we would have to evaluate other options.',
        why_natural: 'Diplomatic conditionals maintain professional goodwill.'
      }
    ],
    example_variations: [
      {
        original_structure: 'Propongo que [SUBJUNCTIVE-ACTION] antes de [EVENT].',
        varied_es: 'Propongo que agendemos una reunión técnica antes del lanzamiento.',
        varied_en: 'I propose that we schedule a technical meeting before launch.',
        swapped_element: 'Proposed technical meeting before launch'
      },
      {
        original_structure: 'Propongo que [SUBJUNCTIVE-ACTION] antes de [EVENT].',
        varied_es: 'Propongo que consultemos con el equipo legal antes de responder.',
        varied_en: 'I propose that we consult with the legal team before responding.',
        swapped_element: 'Proposed consulting legal team'
      },
      {
        original_structure: '¿Qué margen de maniobra tenemos respecto a [TOPIC]?',
        varied_es: '¿Qué margen de maniobra tenemos respecto al tiempo de entrega?',
        varied_en: 'What room for maneuver do we have regarding delivery timeline?',
        swapped_element: 'Inquired about delivery timeline flexibility'
      },
      {
        original_structure: '¿Qué margen de maniobra tenemos respecto a [TOPIC]?',
        varied_es: '¿Qué margen de maniobra tenemos respecto al alcance del proyecto?',
        varied_en: 'What room for maneuver do we have regarding project scope?',
        swapped_element: 'Inquired about project scope flexibility'
      }
    ]
  },
  {
    id: 'b2_mod_14',
    level: 'B2',
    title: 'Emergency Mechanics & Complex Logistics',
    scenario_context: 'Handling unexpected car repair estimates, dealing with mechanics, or resolving complex paperwork at official offices.',
    category: 'High-Stakes Problem Solving',
    emoji: '🛠️',
    core_phrases: [
      {
        phrase_es: '¿Me podría desglosar el presupuesto por mano de obra y refacciones?',
        phrase_en: 'Could you break down the estimate by labor and spare parts?',
        phonetic: 'meh poh-DREE-ah dehs-gloh-SAR ehl prehs-oo-PWEHS-toh por MAH-noh deh OH-brah ee reh-fahk-SEE-oh-nehs',
        audio_text: '¿Me podría desglosar el presupuesto por mano de obra y refacciones?',
        context_note: 'Crucial breakdown request when evaluating repair quotes.'
      },
      {
        phrase_es: 'Si fuera posible tener la pieza para mañana, se lo agradecería enormemente.',
        phrase_en: 'If it were possible to have the part by tomorrow, I would greatly appreciate it.',
        phonetic: 'see FWEH-rah poh-SEE-bleh teh-NER lah PYEH-sah PAH-rah mah-NYAH-nah seh loh ah-grah-deh-seh-REE-ah eh-nor-meh-MEHN-teh',
        audio_text: 'Si fuera posible tener la pieza para mañana, se lo agradecería enormemente.',
        context_note: 'Hypothetical subjunctive ("fuera") combined with conditional ("agradecería").'
      },
      {
        phrase_es: '¿Hay alguna garantía en caso de que vuelva a fallar?',
        phrase_en: 'Is there any warranty in case it fails again?',
        phonetic: 'ay ahl-GOO-nah gah-rahn-TEE-ah ehn KAH-soh deh keh VWEHL-vah ah fah-YAR',
        audio_text: '¿Hay alguna garantía en caso de que vuelva a fallar?',
        context_note: 'Essential consumer protection query.'
      },
      {
        phrase_es: 'Prefiero que me avise antes de hacer cualquier cambio adicional.',
        phrase_en: 'I prefer that you notify me before making any additional changes.',
        phonetic: 'preh-FYEH-roh keh meh ah-VEE-seh AHN-tehs deh ah-SER kwal-KYER KAHM-bee-oh ah-dee-see-oh-NAL',
        audio_text: 'Prefiero que me avise antes de hacer cualquier cambio adicional.',
        context_note: 'Sets clear boundaries for cost control.'
      }
    ],
    contrast_examples: [
      {
        textbook_formal: 'Exijo la garantía estipulada en el contrato de prestación de servicios.',
        natural_mexican: '¿Qué garantía me da por el trabajo realizado?',
        english_translation: 'What warranty do you give me for the work performed?',
        why_natural: 'Direct and respectful accountability phrase.'
      },
      {
        textbook_formal: 'Prohíbo de manera tajante la instalación de repuestos no autorizados.',
        natural_mexican: 'Écheme un telefonazo antes de meterle mano a otra cosa.',
        english_translation: 'Give me a quick call before touching anything else.',
        why_natural: '"Écheme un telefonazo" is a colorful, expressive Mexican colloquialism.'
      }
    ],
    example_variations: [
      {
        original_structure: '¿Me podría desglosar [COST_ITEM]?',
        varied_es: '¿Me podría desglosar los costos de importación y envío?',
        varied_en: 'Could you break down the import and shipping costs?',
        swapped_element: 'Asked for import and shipping breakdown'
      },
      {
        original_structure: '¿Me podría desglosar [COST_ITEM]?',
        varied_es: '¿Me podría desglosar el costo de los materiales?',
        varied_en: 'Could you break down the cost of materials?',
        swapped_element: 'Asked for materials breakdown'
      },
      {
        original_structure: 'Si fuera posible [HYPOTHETICAL], se lo agradecería.',
        varied_es: 'Si fuera posible adelantar la entrega, se lo agradecería.',
        varied_en: 'If it were possible to move up the delivery, I would appreciate it.',
        swapped_element: 'Asked for earlier delivery'
      },
      {
        original_structure: 'Si fuera posible [HYPOTHETICAL], se lo agradecería.',
        varied_es: 'Si fuera posible enviarme el comprobante en PDF, se lo agradecería.',
        varied_en: 'If it were possible to send me the PDF receipt, I would appreciate it.',
        swapped_element: 'Asked for PDF receipt'
      }
    ]
  },
  {
    id: 'b2_mod_15',
    level: 'B2',
    title: 'Mexican Idioms & Register Nuances',
    scenario_context: 'Understanding authentic Mexican idioms, switching registers between formal offices and street banter smoothly.',
    category: 'Cultural Mastery',
    emoji: '🇲🇽',
    core_phrases: [
      {
        phrase_es: '¡Qué padre está este lugar, la verdad se lucieron!',
        phrase_en: 'How cool this place is, honestly they outdid themselves!',
        phonetic: 'keh PAH-dreh ehs-TAH EHS-teh loo-GAR lah vehr-DAD seh loo-SYEH-rohn',
        audio_text: '¡Qué padre está este lugar, la verdad se lucieron!',
        context_note: '"¡Qué padre!" is the quintessentially Mexican phrase for "how cool / awesome!".'
      },
      {
        phrase_es: 'No te preocupes por eso, ¡no hay bronca!',
        phrase_en: 'Do not worry about that, no problem at all!',
        phonetic: 'noh teh preh-oh-KOO-pehs por EH-soh noh ay BROHN-kah',
        audio_text: 'No te preocupes por eso, ¡no hay bronca!',
        context_note: '"No hay bronca" = "No problem / no trouble".'
      },
      {
        phrase_es: '¿Me haces un paro con esto, por favor?',
        phrase_en: 'Can you do me a quick favor with this, please?',
        phonetic: 'meh AH-sehs oon PAH-roh kohn EHS-toh por fah-VOR',
        audio_text: '¿Me haces un paro con esto, por favor?',
        context_note: '"Hacer un paro" is the friendly Mexican slang for doing a favor.'
      },
      {
        phrase_es: 'Anda con todo el ánimo trabajando en su proyecto.',
        phrase_en: 'They are super enthusiastic working on their project.',
        phonetic: 'AHN-dah kohn TOH-doh ehl AH-nee-moh trah-bah-HAHN-doh ehn soo proh-YEHK-toh',
        audio_text: 'Anda con todo el ánimo trabajando en su proyecto.',
        context_note: '"Con todo el ánimo" expresses high positive energy.'
      }
    ],
    contrast_examples: [
      {
        textbook_formal: 'El inmueble posee características altamente estéticas.',
        natural_mexican: '¡Está chidísimo el departamento!',
        english_translation: 'The apartment is super cool!',
        why_natural: '"Chidísimo" is Mexican slang for awesome/cool.'
      },
      {
        textbook_formal: 'No existe inconveniente alguno al respecto.',
        natural_mexican: 'Cero bronca, todo bien.',
        english_translation: 'Zero problem, all good.',
        why_natural: 'Ultra-casual Mexican reassurance.'
      }
    ],
    example_variations: [
      {
        original_structure: '¡Qué [IDIOM] está esto!',
        varied_es: '¡Qué chido estuvo el concierto de ayer!',
        varied_en: 'How cool yesterday concert was!',
        swapped_element: 'Swapped place for yesterday concert'
      },
      {
        original_structure: '¡Qué [IDIOM] está esto!',
        varied_es: '¡Qué suave está la música de fondo!',
        varied_en: 'How nice the background music is!',
        swapped_element: 'Swapped for background music'
      },
      {
        original_structure: '¿Me haces un paro con [ACTION]?',
        varied_es: '¿Me haces un paro cuidándome la mochila dos minutos?',
        varied_en: 'Can you do me a favor watching my backpack for two minutes?',
        swapped_element: 'Asked favor watching backpack'
      },
      {
        original_structure: '¿Me haces un paro con [ACTION]?',
        varied_es: '¿Me haces un paro compartiéndome tu ubicación?',
        varied_en: 'Can you do me a favor sharing your location?',
        swapped_element: 'Asked favor sharing location'
      }
    ]
  },
  {
    id: 'b2_mod_16',
    level: 'B2',
    title: 'Public Presentation & Strategic Vision',
    scenario_context: 'Pitching a strategic project, presenting data, and articulating hypothetical visions before investors or stakeholders in CDMX.',
    category: 'Executive Leadership',
    emoji: '📊',
    core_phrases: [
      {
        phrase_es: 'Si lográramos implementar esta tecnología, transformaríamos la eficiencia operativa.',
        phrase_en: 'If we were to succeed in implementing this technology, we would transform operational efficiency.',
        phonetic: 'see loh-GRAH-rah-mos eem-pleh-mehn-TAR EHS-tah tehk-noh-loh-HEE-ah trahns-for-mah-REE-ah-mos lah eh-fee-SYEHN-see-ah oh-peh-rah-TEE-vah',
        audio_text: 'Si lográramos implementar esta tecnología, transformaríamos la eficiencia operativa.',
        context_note: 'Hypothetical conditional structure: Imperfect Subjunctive ("lográramos") + Conditional ("transformaríamos").'
      },
      {
        phrase_es: 'A continuación, me gustaría destacar tres indicadores clave de crecimiento.',
        phrase_en: 'Next, I would like to highlight three key growth indicators.',
        phonetic: 'ah kohn-tee-noo-ah-SEE-ohn meh goos-tah-REE-ah dehs-tah-KAR trehs een-dee-kah-DOH-rehs KLAH-veh deh kreh-see-MYEHN-toh',
        audio_text: 'A continuación, me gustaría destacar tres indicadores clave de crecimiento.',
        context_note: 'Executive transition marker.'
      },
      {
        phrase_es: 'Cedo la palabra a mi colega para profundizar en el análisis de mercado.',
        phrase_en: 'I hand the floor over to my colleague to delve deeper into the market analysis.',
        phonetic: 'SEH-doh lah pah-LAH-brah ah mee koh-LEH-gah PAH-rah proh-foon-dee-ZAR ehn ehl ah-NAH-lee-sees deh mehr-KAH-doh',
        audio_text: 'Cedo la palabra a mi colega para profundizar en el análisis de mercado.',
        context_note: 'Formal hand-off phrase in keynote speeches.'
      },
      {
        phrase_es: 'Quedamos a su entera disposición para resolver cualquier duda o inquietud.',
        phrase_en: 'We remain at your complete disposal to resolve any questions or concerns.',
        phonetic: 'keh-DAH-mos ah soo ehn-TEH-rah dees-poh-see-SEE-ohn PAH-rah reh-sohl-VER kwal-KYER DWEH-dah oh een-kyeh-TOOD',
        audio_text: 'Quedamos a su entera disposición para resolver cualquier duda o inquietud.',
        context_note: 'Polite executive Q&A opener.'
      }
    ],
    contrast_examples: [
      {
        textbook_formal: 'Finalizo mi alocución verbal cediendo el estrado.',
        natural_mexican: 'Les agradezco su tiempo y abrimos el espacio para preguntas.',
        english_translation: 'I thank you for your time and we open the floor for questions.',
        why_natural: 'Direct, inspiring, and professional presentation conclusion.'
      },
      {
        textbook_formal: 'Si nuestra entidad mercantil alcanzare la meta, obtendríamos ganancias.',
        natural_mexican: 'Si alcanzamos este hito, el crecimiento será exponencial.',
        english_translation: 'If we reach this milestone, growth will be exponential.',
        why_natural: 'Modern executive pitch language.'
      }
    ],
    example_variations: [
      {
        original_structure: 'Si lográramos [ACTION], [CONDITIONAL-OUTCOME].',
        varied_es: 'Si lográramos expandir la cobertura, duplicaríamos los ingresos.',
        varied_en: 'If we were to expand coverage, we would double revenue.',
        swapped_element: 'Swapped technology for coverage expansion'
      },
      {
        original_structure: 'Si lográramos [ACTION], [CONDITIONAL-OUTCOME].',
        varied_es: 'Si lográramos optimizar los tiempos, reduciríamos el costo en un veinte por ciento.',
        varied_en: 'If we were to optimize times, we would reduce costs by twenty percent.',
        swapped_element: 'Swapped for time optimization and 20% cost reduction'
      },
      {
        original_structure: 'Me gustaría destacar [KEY_POINTS].',
        varied_es: 'Me gustaría destacar el impacto positivo en la comunidad local.',
        varied_en: 'I would like to highlight the positive impact on the local community.',
        swapped_element: 'Highlighted local community impact'
      },
      {
        original_structure: 'Me gustaría destacar [KEY_POINTS].',
        varied_es: 'Me gustaría destacar la sostenibilidad financiera del modelo.',
        varied_en: 'I would like to highlight the financial sustainability of the model.',
        swapped_element: 'Highlighted financial sustainability'
      }
    ]
  }
];
