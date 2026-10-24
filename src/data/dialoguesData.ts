import { CEFRLevel } from '../types';

export interface AuthenticDialogueTurn {
  speaker: string;
  es: string;
  en: string;
  ar: string;
}

export interface AuthenticDialogue {
  id: string;
  category: 'housing' | 'bureaucracy' | 'social' | 'frustrations' | 'career';
  level: CEFRLevel;
  title_es: string;
  title_en: string;
  title_ar: string;
  context: string;
  discourseMarkers: string[];
  culturalConcepts: string[];
  turns: AuthenticDialogueTurn[];
}

export const AUTHENTIC_DIALOGUES: AuthenticDialogue[] = [
  // 1. HOUSING & RENT: PISO COMPARTIDO & CASERO
  {
    id: 'dial-housing-piso-limpieza',
    category: 'housing',
    level: 'A2',
    title_es: 'El turno de limpieza en el piso compartido',
    title_en: 'Cleaning Schedule Dispute in the Shared Flat',
    title_ar: 'نزاع جدول تنظيف الشقة المشتركة',
    context: 'Dos compañeros de piso en el barrio de Lavapiés (Madrid) discuten por los turnos de la cocina.',
    discourseMarkers: ['A ver...', 'Pues la verdad es que...', 'Oye...', 'Total, que...'],
    culturalConcepts: ['piso compartido', 'cuadrante de limpieza', 'fianza'],
    turns: [
      {
        speaker: 'Lucía',
        es: 'A ver, Marcos, no es por ser pesada, pero te tocaba fregar la cocina el miércoles y las sartenes llevan dos días en el fregadero.',
        en: 'Look, Marcos, not to be annoying, but it was your turn to clean the kitchen on Wednesday and the pans have been in the sink for two days.',
        ar: 'اسمع يا ماركوس، لا أقصد إزعاجك، لكن كان دورك لتنظيف المطبخ يوم الأربعاء والمقالي في الحوض منذ يومين.'
      },
      {
        speaker: 'Marcos',
        es: 'Pues la verdad es que tienes toda la razón. Estuve de cierre en el curro y llegué reventado a las tantas. Lo recojo ahora mismo, te lo juro.',
        en: 'Well, to tell you the truth, you are completely right. I was on closing shift at work and arrived exhausted at an ungodly hour. I will clean it up right now, I swear.',
        ar: 'في الحقيقة معك كل الحق. كنت في مناوبة إغلاق العمل ووصلت منهكاً جداً في وقت متأخر. سأنظفه حالاً، أعدك بذلك.'
      },
      {
        speaker: 'Lucía',
        es: 'Venga, vale. Es que si viene el casero a revisar la caldera el viernes, no quiero que nos eche bronca ni amenace con quitarnos fianza.',
        en: 'Alright, deal. It’s just that if the landlord comes to check the boiler on Friday, I don’t want him giving us an earful or threatening our deposit.',
        ar: 'حسناً، اتفقنا. الأمر فقط أن المؤجر إذا جاء لفحص السخان يوم الجمعة، لا أريده أن يوبخنا أو يهدد بخصم مبلغ التأمين.'
      },
      {
        speaker: 'Marcos',
        es: 'Ni hablar, la fianza no se toca. En veinte minutos dejo la cocina que parece de quirófano.',
        en: 'No way, hands off the deposit. In twenty minutes I will leave the kitchen looking like an operating room.',
        ar: 'مستحيل، التأمين خط أحمر. في غضون عشرين دقيقة سأجعل المطبخ يلمع كغرفة العمليات.'
      }
    ]
  },
  {
    id: 'dial-housing-casero-caldera',
    category: 'housing',
    level: 'B1',
    title_es: 'Reclamar la avería de la calefacción al casero',
    title_en: 'Demanding the Landlord Fix the Broken Heating',
    title_ar: 'مطالبة المؤجر بإصلاح تدفئة الشقة المعطلة',
    context: 'Llamada telefónica a un casero tacaño en pleno invierno en Salamanca.',
    discourseMarkers: ['Mire usted...', 'Fíjate que...', 'Es que verás...', 'De ninguna manera'],
    culturalConcepts: ['avería de caldera', 'técnico autorizado', 'contrato de alquiler'],
    turns: [
      {
        speaker: 'Inquilino',
        es: 'Buenas tardes, Don Ramón. Mire, le llamo porque llevamos tres días sin agua caliente ni calefacción y estamos a cuatro grados bajo cero.',
        en: 'Good afternoon, Don Ramón. Look, I am calling because we have been without hot water or heating for three days and it is four below zero.',
        ar: 'مساء الخير يا دون رامون. انظر، أنا أتصل لأننا منذ ثلاثة أيام بلا ماء ساخن ولا تدفئة ودرجة الحرارة أربع تحت الصفر.'
      },
      {
        speaker: 'Casero',
        es: 'Fíjate que el técnico me dijo que hasta la semana que viene no tiene hueco. Poneos una manta extra mientras tanto, hombre.',
        en: 'Get this: the technician told me he has no opening until next week. Just put on an extra blanket in the meantime, man.',
        ar: 'تخيل أن الفني أخبرني أنه لا يملك وقتاً شاغراً حتى الأسبوع القادم. ضعوا غطاءً إضافياً في هذه الأثناء يا رجل.'
      },
      {
        speaker: 'Inquilino',
        es: '¿Qué te iba a decir? Con el dineral que pagamos de alquiler, tener agua caliente es una condición básica de habitabilidad por ley. O manda a alguien de urgencia hoy o llamo yo a un técnico y le descuento la factura del mes.',
        en: 'What can I say? With the fortune we pay in rent, hot water is a basic legal requirement for livability. Either you send an emergency repairman today or I call one myself and deduct the invoice from the rent.',
        ar: 'ماذا عساني أن أقول؟ مع المبلغ الباهظ الذي ندفعه للإيجار، الماء الساخن حق أساسي في صلاحية السكن قانوناً. إما أن ترسل فني طوارئ اليوم أو سأطلبه بنفسي وأخصم الفاتورة من إيجار الشهر.'
      },
      {
        speaker: 'Casero',
        es: 'Bueno, bueno, no te pongas así. Ahora mismo llamo a otra empresa de reparaciones para que se pasen esta tarde.',
        en: 'Alright, alright, do not get worked up. I will call another repair company right now so they drop by this afternoon.',
        ar: 'حسناً، حسناً، لا تنفعل هكذا. سأتصل بشركة صيانة أخرى في الحال لتمر عليكم بعد ظهر اليوم.'
      }
    ]
  },

  // 2. WORK, BUREAUCRACY & URBAN HUSTLE
  {
    id: 'dial-bureaucracy-nie-madrid',
    category: 'bureaucracy',
    level: 'B1',
    title_es: 'La odisea de conseguir cita previa para el NIE',
    title_en: 'The Odyssey of Booking a NIE Appointment in Madrid',
    title_ar: 'معاناة حجز موعد الهوية الإسبانية (NIE)',
    context: 'Dos amigos expatriados tomando un café mientras intentan conseguir cita en la web de Extranjería.',
    discourseMarkers: ['Fíjate que...', '¿Qué te iba a decir?', 'Ni de coña', 'Por si las moscas'],
    culturalConcepts: ['cita previa', 'NIE / TIE', 'extranjería', 'empadronamiento'],
    turns: [
      {
        speaker: 'Sofía',
        es: 'Fíjate que llevo dos semanas conectándome los viernes a las ocho y media en punto y la web de la policía se queda colgada.',
        en: 'Check this out: I have been logging in every Friday at eight-thirty sharp for two weeks and the police website always crashes.',
        ar: 'تصور أنني أحاول الدخول كل جمعة في الثامنة والنصف صباحاً تماماً منذ أسبوعين وموقع الشرطة يتعطل دائماً.'
      },
      {
        speaker: 'Mateo',
        es: '¡Qué me vas a contar! Yo para la toma de huellas tuve que irme hasta una comisaría en Aranjuez porque en el centro era imposible.',
        en: 'Tell me about it! For fingerprinting I had to travel all the way to a precinct in Aranjuez because downtown was impossible.',
        ar: 'وما أدراني بما عانيت! لأخذ البصمات اضطررت للسفر حتى مخفر في أرانخويث لأن وسط المدينة كان مستحيلاً.'
      },
      {
        speaker: 'Sofía',
        es: '¿Qué te iba a decir? ¿Llevaste el justificante del volante de empadronamiento actualizado o te sirvió el de hace tres meses?',
        en: 'What was I going to ask you? Did you bring the updated census registration certificate or did the 3-month-old one work?',
        ar: 'ماذا كنت سأسألك؟ هل أحضرت إثبات السكن (البادرون) المحدث أم كفاك الإثبات الصادر منذ ثلاثة أشهر؟'
      },
      {
        speaker: 'Mateo',
        es: '¡Ni hablar! Si tiene más de noventa días te echan para atrás sin miramientos. Pide uno nuevo por internet con el certificado digital, por si las moscas.',
        en: 'No way! If it is older than ninety days they turn you away without mercy. Request a fresh one online with the digital certificate, just in case.',
        ar: 'إياك ثم إياك! إذا مضى عليه أكثر من تسعين يوماً يرفضون طلبك فوراً دون نقاش. اطلب واحداً جديداً عبر الإنترنت بالشهادة الرقمية تحسباً لأي طارئ.'
      }
    ]
  },
  {
    id: 'dial-bureaucracy-monotributo-argentina',
    category: 'bureaucracy',
    level: 'B2',
    title_es: 'Facturar como freelance y lidiar con AFIP en Buenos Aires',
    title_en: 'Freelancing & Invoicing AFIP Monotributo in Buenos Aires',
    title_ar: 'العمل الحر وإصدار الفواتير الضريبية في بوينس آيرس',
    context: 'Charla entre dos diseñadores independientes en un café de Palermo Soho.',
    discourseMarkers: ['Che, mirá...', 'La verdad es que...', 'De una', 'Olvidate'],
    culturalConcepts: ['monotributo', 'factura C', 'AFIP', 'cierre de mes'],
    turns: [
      {
        speaker: 'Facundo',
        es: 'Che, mirá, ¿vos ya emitiste la factura electrónica para el cliente de Córdoba? Se me vence el plazo de AFIP hoy a medianoche.',
        en: 'Hey, look, have you issued the electronic invoice for the client in Córdoba yet? My AFIP deadline expires tonight at midnight.',
        ar: 'يا صاح، انظر، هل أصدرت الفاتورة الإلكترونية لعميل قرطبة بعد؟ الموعد النهائي للضرائب ينتهي الليلة عند منتصف الليل.'
      },
      {
        speaker: 'Camila',
        es: 'La verdad es que la mandé ayer temprano. Tuve que recategorizarme en el Monotributo porque con la inflación me pasaba del tope de la escala.',
        en: 'To be honest, I sent it early yesterday. I had to recategorize my Monotributo bracket because with inflation I was exceeding the scale cap.',
        ar: 'في الحقيقة أرسلتها في وقت مبكر أمس. اضطررت لتعديل شريحة ضريبتي الحرة لأن التضخم جعلني أتجاوز الحد الأقصى للشريحة.'
      },
      {
        speaker: 'Facundo',
        es: 'Un parto total cada semestre. ¿Te transfirieron por Mercado Pago o por transferencia bancaria directa?',
        en: 'A total nightmare every semester. Did they transfer via Mercado Pago or direct bank transfer?',
        ar: 'معاناة حقيقية كل نصف سنة. هل حولوا لك عبر ميركادو باجو أم بحوالة بنكية مباشرة؟'
      },
      {
        speaker: 'Camila',
        es: 'Por transferencia con alias bancario. Entró al toque, así que de una me puse al día con los pagos pendientes.',
        en: 'Direct transfer using bank alias. It arrived instantly, so I immediately caught up on my pending bills.',
        ar: 'بحوالة بنكية عبر الاسم المستعار (الآلياس). وصل المبلغ فوراً، فسارعت بسداد المدفوعات المعلقة دون تردد.'
      }
    ]
  },
  {
    id: 'dial-work-whatsapp-audios',
    category: 'career',
    level: 'A2',
    title_es: 'Etiqueta de WhatsApp: La pesadilla de los audios largos',
    title_en: 'WhatsApp Etiquette: The Nightmare of Long Voice Notes',
    title_ar: 'آداب الواتساب: كابوس التسجيلات الصوتية الطويلة في العمل',
    context: 'Dos compañeros de oficina en Barcelona tomándose un café tras recibir un mensaje del jefe.',
    discourseMarkers: ['Hombre, es que...', 'A ver...', 'Ni loco', 'O sea...'],
    culturalConcepts: ['audios de WhatsApp', 'reunión prescindible', 'modo 2x'],
    turns: [
      {
        speaker: 'Jordi',
        es: 'Hombre, es que no hay derecho. Me acaba de mandar el jefe un audio de WhatsApp de seis minutos para decirme que la reunión se cancela.',
        en: 'Man, it is just not fair. The boss just sent me a six-minute WhatsApp voice note just to tell me the meeting is cancelled.',
        ar: 'يا رجل، هذا ليس عدلاً أبداً! أرسل لي المدير لتوه تسجيلاً صوتياً لست دقائق على واتساب فقط ليخبرني بإلغاء الاجتماع.'
      },
      {
        speaker: 'Nuria',
        es: '¡Qué me dices! Eso ya no es un audio, es un capítulo de podcast. Yo los pongo siempre a velocidad dos equis (2x) porque si no, pierdo la mañana.',
        en: 'No way! That is not a voice note anymore, that is a podcast episode. I always play them at 2x speed, otherwise my whole morning is wasted.',
        ar: 'ماذا تقول! هذا لم يعد مجرد تسجيل صوتي، هذه حلقة بودكاست. أنا أستمع إليها دائماً بسرعة مضاعفة (2x) وإلا ضاع صباحي بأكمله.'
      },
      {
        speaker: 'Jordi',
        es: 'A ver, ¿tan difícil es escribir un mensaje de dos líneas en vez de grabarse la vida en el metro?',
        en: 'I mean, is it really so hard to type a two-line message instead of recording your life on the subway?',
        ar: 'بالله عليك، هل يصعب عليه كتابة سطرين بدلاً من تسجيل سيرة حياته في المترو؟'
      },
      {
        speaker: 'Nuria',
        es: 'Totalmente. Le respondo con un pulgar arriba (👍) y que se dé por enterado.',
        en: 'Totally. I will just reply with a thumbs-up emoji and consider it acknowledged.',
        ar: 'تماماً. سأرد عليه برمز الإبهام للأعلى (👍) ليعلم أن الرسالة وصلت وانتهى الأمر.'
      }
    ]
  },

  // 3. MODERN SOCIAL LIFE & GATHERINGS
  {
    id: 'dial-social-tardeo-bizum',
    category: 'social',
    level: 'A1',
    title_es: 'Organizar un tardeo y hacer cuentas por Bizum',
    title_en: 'Organizing an Afternoon "Tardeo" & Splitting via Bizum',
    title_ar: 'تنظيم قعدة مسائية وتقسيم الحساب عبر تطبيق بيزوم',
    context: 'Amigos organizando cañas de sábado por la tarde en el barrio del Carmen (Valencia).',
    discourseMarkers: ['Venga...', '¿Qué te parece si...?', 'A ver...', 'Listo'],
    culturalConcepts: ['tardeo', 'Bizum', 'pagar a medias', 'cañas y bravas'],
    turns: [
      {
        speaker: 'Pablo',
        es: '¿Qué te parece si en vez de salir de noche hacemos un buen tardeo? Quedamos a las cuatro en la terraza, nos pedimos unas cañas y unas patatas bravas.',
        en: 'How about instead of going out late at night we do an afternoon "tardeo"? We meet at four on the terrace, order beers and spicy bravas.',
        ar: 'ما رأيك لو قضينا سهرة مسائية مبكرة (تارديو) بدلاً من السهر المتأخر؟ نلتقي في الرابعة بالشرفة ونطلب مقبلات البطاطا الحارة.'
      },
      {
        speaker: 'Clara',
        es: '¡De cabeza! Me apunto. A ver si nos da el sol de la tarde que durante la semana no veo la luz.',
        en: 'Count me in! Sign me up. Let’s catch some afternoon sun, I haven’t seen daylight all week.',
        ar: 'أنا معك قلباً وقالباً! سجل اسمي. دعنا نستمتع بشمس الظهيرة فلست أرى ضوء النهار طوال الأسبوع.'
      },
      {
        speaker: 'Pablo',
        es: 'Por la cuenta no te preocupes: pide tú con tarjeta todo junto y te paso mi parte por Bizum al instante.',
        en: 'Don’t worry about the bill: pay everything with your card and I will transfer my share via Bizum right away.',
        ar: 'ولا تشغلي بالك بالحساب: ادفعي الإجمالي ببطاقتك وسأحول لك حصتي عبر تطبيق بيزوم فوراً.'
      },
      {
        speaker: 'Clara',
        es: 'Perfecto, número guardado. ¡Nos vemos en media hora!',
        en: 'Perfect, got your number saved. See you in half an hour!',
        ar: 'ممتاز، رقمك مسجل لدي. أراك بعد نصف ساعة!'
      }
    ]
  },
  {
    id: 'dial-social-asado-argentina',
    category: 'social',
    level: 'B1',
    title_es: 'El asado del domingo y las compras en la carnicería',
    title_en: 'Sunday Asado Prep & Authentic Cuts at the Butcher',
    title_ar: 'التحضير لحفل الشواء يوم الأحد واختيار اللحوم عند القصاب',
    context: 'Dos amigos organizando el asado dominguero con amigos en San Telmo.',
    discourseMarkers: ['Che, escúchame...', 'Ni hablar', 'Posta que...', 'Dale'],
    culturalConcepts: ['asado', 'vacío y entraña', 'chimichurri casero', 'carbón de quebracho'],
    turns: [
      {
        speaker: 'Matías',
        es: 'Che, escúchame una cosa: para el domingo somos ocho en la terraza. ¿Qué cortes compramos en la carnicería de Don Tito?',
        en: 'Hey, listen to me: for Sunday there are eight of us on the terrace. What cuts should we get at Don Tito’s butcher shop?',
        ar: 'اسمعني يا صاحبي: نحن ثمانية في الشرفة يوم الأحد. ما هي قطعيات اللحم التي سنشتريها من ملحمة دون تيتو؟'
      },
      {
        speaker: 'Leandro',
        es: 'Y... calculale medio kilo por persona. Mandale dos kilos de vacío bien tierno, un kilo de entraña y cuatro choris para arrancar con el choripán.',
        en: 'Well... calculate half a kilo per person. Put in two kilos of tender flank, one kilo of skirt steak, and four sausages to kick off with choripán.',
        ar: 'حسناً... احسب نصف كيلوغرام للشخص. خذ كيلوين من لحم الخاصرة الطري، وكيلو من شريحة الإنتراّنيا، وأربع قطع سجق لبدء المقبلات.'
      },
      {
        speaker: 'Matías',
        es: '¿Y del chimichurri quién se encarga? Porque comprar el del frasco del supermercado es un sacrilegio.',
        en: 'And who is in charge of the chimichurri? Because buying the supermarket jar version is a sacrilege.',
        ar: 'ومن سيتولى صلصة التشميتشوري؟ لأن شراء علبة معلبة من السوبرماركت إهانة للشواء.'
      },
      {
        speaker: 'Leandro',
        es: '¡Ni hablar! Lo preparo yo la noche anterior con perejil fresco, ajo, orégano y buen aceite. Dale, vos andá a buscar el carbón que yo me ocupo del resto.',
        en: 'No way! I will prepare it myself the night before with fresh parsley, garlic, oregano and good oil. Go on, get the charcoal and I handle the rest.',
        ar: 'مستحيل! سأعدها بنفسي الليلة السابقة بالبقدونس الطازج والثوم والزعتر والزيت الممتاز. اذهب أنت واشترِ الفحم وسأتولى أنا الباقي.'
      }
    ]
  },
  {
    id: 'dial-social-airbnb-oaxaca',
    category: 'social',
    level: 'A2',
    title_es: 'Consultar detalles del alojamiento en Oaxaca antes de reservar',
    title_en: 'Inquiring About an Airbnb in Oaxaca Before Booking',
    title_ar: 'الاستفسار عن تفاصيل سكن إير بي إن بي في أواخاكا قبل الحجز',
    context: 'Mensajes con el anfitrión de una casa colonial en Oaxaca para asegurar buena conexión y tranquilidad.',
    discourseMarkers: ['Hola, disculpa la molestia...', 'Es que verás...', 'Me surge una duda...', 'Mil gracias'],
    culturalConcepts: ['teletrabajo', 'presión del agua', 'centro histórico', 'mercado 20 de Noviembre'],
    turns: [
      {
        speaker: 'Huésped',
        es: 'Hola, disculpa la molestia. Estamos viendo tu departamento cerca del Mercado 20 de Noviembre y nos encanta, pero me surge una duda sobre el internet.',
        en: 'Hello, excuse the bother. We are looking at your apartment near the 20 de Noviembre Market and love it, but I have a question about the internet.',
        ar: 'مرحباً، معذرة على الإزعاج. نحن نتصفح شقتك بالقرب من سوق 20 نوفمبر وقد أعجبتنا، لكن لدي استفسار بشأن سرعة الإنترنت.'
      },
      {
        speaker: 'Anfitrión',
        es: '¡Hola! Para nada es molestia. Tenemos fibra óptica de trescientos megas y un ruteador dedicado. Varios nómadas digitales han trabajado aquí sin problemas.',
        en: 'Hello! Not a bother at all. We have 300 Mbps fiber optic and a dedicated router. Several digital nomads have worked here smoothly.',
        ar: 'أهلاً بك! ليس هناك أي إزعاج. لدينا ألياف بصرية بسرعة 300 ميغابت وجهاز راوتر مخصص. عمل العديد من الرحالة الرقميين هنا بلا مشاكل.'
      },
      {
        speaker: 'Huésped',
        es: '¡Buenísimo! ¿Y qué tal la presión del agua caliente en la regadera? Es que he tenido malas experiencias en casas coloniales antiguas.',
        en: 'Great! And how is the hot water pressure in the shower? I have had bad experiences in old colonial houses.',
        ar: 'رائع جداً! وماذا عن ضغط الماء الساخن في الدش؟ فلقد كانت لي تجارب سابقة سيئة في المنازل الاستعمارية القديمة.'
      },
      {
        speaker: 'Anfitrión',
        es: 'Instalamos bomba presurizadora y calentador solar con respaldo de gas hace dos meses, así que la regadera sale con excelente fuerza.',
        en: 'We installed a booster pump and solar heater with gas backup two months ago, so the shower runs with great pressure.',
        ar: 'قمنا بتركيب مضخة تقوية وسخان شمسي مع دعم بالغاز منذ شهرين، لذا يتدفق الدش بقوة ممتازة.'
      }
    ]
  },

  // 4. REAL FRUSTRATIONS & HUMOR
  {
    id: 'dial-frustrations-ola-calor',
    category: 'frustrations',
    level: 'A2',
    title_es: 'La ola de calor de cuarenta grados y el ventilador roto',
    title_en: 'The 40-Degree Heatwave & The Broken Fan',
    title_ar: 'موجة الحر اللاهبة وعطل المروحة في صيف مدريد',
    context: 'Dos vecinos quejándose del bochorno en el descansillo de la escalera en pleno julio madrileño.',
    discourseMarkers: ['¡Madre mía!...', 'Pues la verdad es que...', 'Es insoportable', 'No hay quien duerma'],
    culturalConcepts: ['ola de calor', 'persianas bajadas', 'dormir con bochorno', 'terraza climatizada'],
    turns: [
      {
        speaker: 'Ana',
        es: '¡Madre mía, qué bochorno! El termómetro de la farmacia de la esquina marcaba cuarenta y dos grados a las siete de la tarde.',
        en: 'My goodness, what stifling heat! The pharmacy thermometer on the corner showed forty-two degrees at seven in the evening.',
        ar: 'يا إلهي، ما هذا القيظ الخانق! مقياس حرارة الصيدلية في الزاوية كان يشير إلى اثنتين وأربعين درجة في السابعة مساءً.'
      },
      {
        speaker: 'Carlos',
        es: 'Es insoportable. Y para colmo de males, anoche se me murió el ventilador del dormitorio. No hay quien pegue ojo.',
        en: 'It is unbearable. And to top it off, my bedroom fan died last night. It is impossible to catch a wink of sleep.',
        ar: 'إنه أمر لا يُطاق. وفوق كل هذا تعطلت مروحة غرفة نومي البارحة. لا يستطيع أحد أن يغمض له جفن.'
      },
      {
        speaker: 'Ana',
        es: 'Pues la verdad es que yo tengo todas las persianas bajadas a cal y canto desde las diez de la mañana para no convertir el piso en un horno.',
        en: 'Well, honestly, I keep all my blinds shut tight since ten in the morning to avoid turning the flat into an oven.',
        ar: 'في الحقيقة، أنا أنزل جميع الستائر بإحكام منذ العاشرة صباحاً حتى لا تتحول الشقة إلى فرن مشتعل.'
      },
      {
        speaker: 'Carlos',
        es: 'Totalmente. Si esto sigue así me bajo al centro comercial a pasar la tarde con el aire acondicionado gratis.',
        en: 'Totally. If this keeps up I am heading down to the shopping mall to spend the afternoon with free air conditioning.',
        ar: 'تماماً. إذا استمر الوضع هكذا سأنزل إلى المركز التجاري لأقضي الظهيرة مع التكييف المجاني.'
      }
    ]
  },
  {
    id: 'dial-frustrations-ultimo-tren',
    category: 'frustrations',
    level: 'A2',
    title_es: 'Perder el último tren de cercanías por treinta segundos',
    title_en: 'Missing the Last Suburban Train by Thirty Seconds',
    title_ar: 'فوات قطار الضواحي الأخير بفارق ثلاثين ثانية',
    context: 'Dos amigos corriendo por los andenes de la estación de Atocha a medianoche.',
    discourseMarkers: ['¡No me lo puedo creer!', 'A ver...', 'Qué remedio', 'Menos mal'],
    culturalConcepts: ['tren de cercanías', 'último tren', 'Cabify / Uber compartido', 'validar billete'],
    turns: [
      {
        speaker: 'David',
        es: '¡No me lo puedo creer! Han cerrado las puertas del tren en nuestras narices por treinta segundos de retraso al validar el billete.',
        en: 'I can’t believe it! They shut the train doors right in our faces over a 30-second delay validating our tickets.',
        ar: 'لا أصدق هذا! أغلقت أبواب القطار في وجوهنا بسبب تأخرنا ثلاثين ثانية لتمرير التذكرة.'
      },
      {
        speaker: 'Laura',
        es: 'A ver, respira hondo. El siguiente ya no sale hasta las seis de la mañana, así que no nos queda otra.',
        en: 'Alright, breathe deeply. The next one won’t leave until six in the morning, so we have no other choice.',
        ar: 'اهدأ وتنفس بعمق. القطار التالي لن يغادر حتى السادسة صباحاً، لذا لا خيار أمامنا.'
      },
      {
        speaker: 'David',
        es: '¿Y qué hacemos ahora? Un taxi hasta las afueras nos va a costar un ojo de la cara.',
        en: 'And what do we do now? A cab to the suburbs is going to cost an arm and a leg.',
        ar: 'وماذا نفعل الآن؟ سيارة أجرة إلى الضواحي ستكلفنا مبلغاً باهظاً جداً.'
      },
      {
        speaker: 'Laura',
        es: 'Menos mal que tengo la aplicación de VTC con descuento de fin de semana. Lo pedimos compartido y nos sale a siete euros por cabeza.',
        en: 'Luckily I have the ride-hail app with a weekend discount. We order a shared ride and it comes out to seven euros a head.',
        ar: 'لحسن الحظ أن لدي تطبيق سيارات الأجرة مع خصم عطلة نهاية الأسبوع. سنطلبه معاً وسيكلفنا سبعة يورو فقط للشخص.'
      }
    ]
  },
  {
    id: 'dial-frustrations-pelea-cuenta',
    category: 'frustrations',
    level: 'B1',
    title_es: 'La típica pelea hispana por quién paga la cuenta',
    title_en: 'The Classic Hispanic Fight Over Who Pays the Bill',
    title_ar: 'الجدال الإسباني الودي المعتاد حول من يدفع الفاتورة',
    context: 'Fin de una larga sobremesa de domingo en un restaurante de tapas en Sevilla.',
    discourseMarkers: ['¡De eso nada!', 'Ni se te ocurra', 'Hombre, por favor', 'Para la próxima'],
    culturalConcepts: ['sobremesa', 'pelear por pagar', 'invitar', 'ronda de cafés'],
    turns: [
      {
        speaker: 'Alejandro',
        es: 'Camarero, cóbrese de aquí, por favor. Guarda esa tarjeta, Sergio, que hoy invito yo que es mi cumpleaños atrasado.',
        en: 'Waiter, charge it from here, please. Put that card away, Sergio, today is my treat since it’s my belated birthday.',
        ar: 'أيها النادل، خذ الحساب من هنا لو سمحت. أبعد تلك البطاقة يا سيرخيو، اليوم ضيافتي بمناسبة عيد ميلادي المتأخر.'
      },
      {
        speaker: 'Sergio',
        es: '¡Ni se te ocurra! La última vez ya pagaste tú la cena en Triana. De ninguna manera vuelves a pagar solo.',
        en: 'Don’t even think about it! Last time you already paid for dinner in Triana. No way you are paying alone again.',
        ar: 'إياك أن تفكر في ذلك! المرة الماضية دفعت أنت ثمن العشاء في تريانا. مستحيل أن تدفع بمفردك مجدداً.'
      },
      {
        speaker: 'Alejandro',
        es: '¡De eso nada! Si no me dejas invitar me voy a ofender de verdad. No discutas más delante del camarero.',
        en: 'No way! If you don’t let me treat you I will be genuinely offended. Don’t argue in front of the waiter.',
        ar: 'مستحيل! إذا لم تتركني أدفع سأغضب منك حقاً. لا تجادل أمام النادل أكثر من هذا.'
      },
      {
        speaker: 'Sergio',
        es: 'Venga, trato hecho: tú pagas la comida y yo me encargo de la ronda de cafés y los postres en la terraza de enfrente.',
        en: 'Fine, deal: you pay for lunch and I cover the round of coffees and desserts on the terrace across the street.',
        ar: 'حسناً، اتفقنا: أنت تدفع ثمن الغداء وأنا أتولى جولة القهوة والحلويات في الشرفة المقابلة.'
      }
    ]
  }
];

export const AUTHENTIC_DIALOGUES_MAP: Record<string, AuthenticDialogue> = Object.fromEntries(
  AUTHENTIC_DIALOGUES.map(d => [d.id, d])
);

/**
 * Returns a culturally grounded dialogue for any communicative task.
 * Guarantees absence of artificial textbook tropes.
 */
export function getAuthenticDialogueForTopic(topicKey: string, level: CEFRLevel = 'A1'): AuthenticDialogue {
  const norm = topicKey.toLowerCase();

  if (norm.includes('piso') || norm.includes('alquiler') || norm.includes('casero') || norm.includes('limpieza') || norm.includes('casa')) {
    return norm.includes('caldera') || norm.includes('averia')
      ? AUTHENTIC_DIALOGUES_MAP['dial-housing-casero-caldera']
      : AUTHENTIC_DIALOGUES_MAP['dial-housing-piso-limpieza'];
  }

  if (norm.includes('nie') || norm.includes('tramite') || norm.includes('papeles') || norm.includes('cita')) {
    return AUTHENTIC_DIALOGUES_MAP['dial-bureaucracy-nie-madrid'];
  }

  if (norm.includes('monotributo') || norm.includes('factura') || norm.includes('afip') || norm.includes('freelance') || norm.includes('argentina')) {
    return AUTHENTIC_DIALOGUES_MAP['dial-bureaucracy-monotributo-argentina'];
  }

  if (norm.includes('whatsapp') || norm.includes('mensaje') || norm.includes('audio') || norm.includes('oficina') || norm.includes('trabajo')) {
    return AUTHENTIC_DIALOGUES_MAP['dial-work-whatsapp-audios'];
  }

  if (norm.includes('asado') || norm.includes('carne') || norm.includes('parrilla')) {
    return AUTHENTIC_DIALOGUES_MAP['dial-social-asado-argentina'];
  }

  if (norm.includes('airbnb') || norm.includes('hotel') || norm.includes('reserva') || norm.includes('viaje')) {
    return AUTHENTIC_DIALOGUES_MAP['dial-social-airbnb-oaxaca'];
  }

  if (norm.includes('calor') || norm.includes('verano') || norm.includes('tiempo') || norm.includes('clima')) {
    return AUTHENTIC_DIALOGUES_MAP['dial-frustrations-ola-calor'];
  }

  if (norm.includes('tren') || norm.includes('metro') || norm.includes('transporte') || norm.includes('cercanias')) {
    return AUTHENTIC_DIALOGUES_MAP['dial-frustrations-ultimo-tren'];
  }

  if (norm.includes('cuenta') || norm.includes('pagar') || norm.includes('restaurante') || norm.includes('bar')) {
    return AUTHENTIC_DIALOGUES_MAP['dial-frustrations-pelea-cuenta'];
  }

  // Fallback to high-frequency modern social interaction (Bizum & Tardeo)
  return AUTHENTIC_DIALOGUES_MAP['dial-social-tardeo-bizum'];
}
