export interface VerbSentenceIllustration {
  verbId: string;
  tense: string;
  subjectKey: string;
  verbForm: string;
  sentence_es: string;
  sentence_en: string;
  sentence_ar: string;
  contextNote?: string;
}

export interface SituationalFillInDrill {
  id: string;
  situation: string;
  situation_ar: string;
  sentenceWithBlank: string;
  verbInfinitive: string;
  tenseLabel: string;
  subjectLabel: string;
  correctAnswer: string;
  options: string[];
  fullSentence: string;
  translation_en: string;
  translation_ar: string;
  formativeExplanation_en: string;
  formativeExplanation_ar: string;
}

export interface TenseContrastDrill {
  id: string;
  title: string;
  title_ar: string;
  category: 'preterite_vs_imperfect' | 'por_vs_para' | 'ser_vs_estar' | 'saber_vs_conocer' | 'subjunctive_vs_indicative' | 'hay_vs_estar';
  conceptExplanation_en: string;
  conceptExplanation_ar: string;
  pairA: {
    label: string;
    sentence_es: string;
    sentence_en: string;
    sentence_ar: string;
    aspectNote: string;
    keyForm: string;
  };
  pairB: {
    label: string;
    sentence_es: string;
    sentence_en: string;
    sentence_ar: string;
    aspectNote: string;
    keyForm: string;
  };
  challenge: {
    prompt: string;
    prompt_ar: string;
    options: {
      text: string;
      isCorrect: boolean;
      explanation: string;
      explanation_ar: string;
    }[];
  };
}

/**
 * Authentic real-world sentence bank for Spanish verbs across communicative contexts.
 */
export const VERB_COMMUNICATIVE_SENTENCES: Record<string, Record<string, Record<string, { es: string; en: string; ar: string }>>> = {
  'v-ser': {
    present: {
      yo: { es: 'Soy profesor de español en Madrid.', en: 'I am a Spanish teacher in Madrid.', ar: 'أنا أستاذ لغة إسبانية في مدريد.' },
      tu: { es: '¿Eres de México o de Colombia?', en: 'Are you from Mexico or Colombia?', ar: 'هل أنت من المكسيك أم من كولومبيا؟' },
      el_ella_usted: { es: 'Ella es muy inteligente y trabajadora.', en: 'She is very intelligent and hardworking.', ar: 'هي ذكية جداً ومجتهدة.' },
      nosotros: { es: 'Nosotros somos amigos desde la infancia.', en: 'We have been friends since childhood.', ar: 'نحن أصدقاء منذ الطفولة.' },
      vosotros: { es: 'Vosotros sois bienvenidos a nuestra casa.', en: 'You all are welcome in our home.', ar: 'أنتم مرحب بكم في بيتنا.' },
      ellos_ellas_ustedes: { es: 'Ellos son los mejores músicos de la ciudad.', en: 'They are the best musicians in the city.', ar: 'هم أفضل موسيقيين في المدينة.' }
    },
    preterite: {
      yo: { es: 'Ayer fui el primero en llegar a la oficina.', en: 'Yesterday I was the first to arrive at the office.', ar: 'أمس كنت أول من وصل إلى المكتب.' },
      tu: { es: 'Fuiste muy valiente al decir la verdad.', en: 'You were very brave to tell the truth.', ar: 'كنت شجاعاً جداً بقول الحقيقة.' },
      el_ella_usted: { es: 'El concierto de ayer fue una experiencia inolvidable.', en: 'Yesterday\'s concert was an unforgettable experience.', ar: 'كان حفل البارحة تجربة لا تُنسى.' },
      nosotros: { es: 'Nosotros fuimos los organizadores del evento cultural.', en: 'We were the organizers of the cultural event.', ar: 'كنا نحن منظمي الفعالية الثقافية.' },
      vosotros: { es: 'Vosotros fuisteis muy amables con los invitados.', en: 'You all were very kind to the guests.', ar: 'كنتم لطفاء للغاية مع الضيوف.' },
      ellos_ellas_ustedes: { es: 'Aquellos años fueron muy prósperos para todos.', en: 'Those years were very prosperous for everyone.', ar: 'كانت تلك السنوات مزدهرة جداً للجميع.' }
    },
    imperfect: {
      yo: { es: 'Cuando era joven, pasaba los veranos en Valencia.', en: 'When I was young, I used to spend summers in Valencia.', ar: 'عندما كنت صغيراً، كنت أقضي الصيف في فالنسيا.' },
      tu: { es: 'De niño eras muy curioso con los libros.', en: 'As a child you were very curious about books.', ar: 'عندما كنت طفلاً كنت فضولياً جداً بالكتب.' },
      el_ella_usted: { es: 'Mi abuela era una cocinera extraordinaria.', en: 'My grandmother was an extraordinary cook.', ar: 'كانت جدتي طاهية استثنائية.' },
      nosotros: { es: 'En aquella época éramos inseparables.', en: 'At that time we were inseparable.', ar: 'في تلك الفترة كنا لا نفترق أبداً.' },
      vosotros: { es: 'Vosotros erais los más rápidos del equipo.', en: 'You all used to be the fastest in the team.', ar: 'كنتم الأسرع في الفريق.' },
      ellos_ellas_ustedes: { es: 'Las calles de la ciudad eran muy tranquilas de noche.', en: 'The streets of the city were very quiet at night.', ar: 'كانت شوارع المدينة هادئة جداً ليلاً.' }
    },
    future: {
      yo: { es: 'El próximo año seré graduado en lingüística.', en: 'Next year I will be a graduate in linguistics.', ar: 'العام المقبل سأكون خريجاً في اللغويات.' },
      tu: { es: 'Con esfuerzo serás un gran médico.', en: 'With effort you will be a great doctor.', ar: 'بالجهد ستكون طبيباً رائعاً.' },
      el_ella_usted: { es: 'La reunión de mañana será decisiva.', en: 'Tomorrow\'s meeting will be decisive.', ar: 'سيكون اجتماع الغد حاسماً.' },
      nosotros: { es: 'Pronto seremos capaces de hablar con fluidez.', en: 'Soon we will be able to speak fluently.', ar: 'قريباً سنكون قادرين على التحدث بطلاقة.' },
      vosotros: { es: 'Vosotros seréis los encargados del nuevo proyecto.', en: 'You all will be in charge of the new project.', ar: 'ستكونون أنتم المسؤولين عن المشروع الجديد.' },
      ellos_ellas_ustedes: { es: 'Ellos serán los primeros en conocer la noticia.', en: 'They will be the first to hear the news.', ar: 'سيكونون أول من يعلم بالخبر.' }
    },
    conditional: {
      yo: { es: 'Sin dudarlo, yo sería voluntario en ese hospital.', en: 'Without hesitation, I would be a volunteer at that hospital.', ar: 'بدون تردد، لكنت متطوعاً في ذلك المستشفى.' },
      tu: { es: '¿Serías capaz de vivir en otro país?', en: 'Would you be able to live in another country?', ar: 'هل ستكون قادراً على العيش في بلد آخر؟' },
      el_ella_usted: { es: 'Sería estupendo verte este fin de semana.', en: 'It would be great to see you this weekend.', ar: 'سيكون من الرائع رؤيتك في عطلة نهاية الأسبوع.' },
      nosotros: { es: 'Nosotros seríamos más felices viviendo cerca del mar.', en: 'We would be happier living near the sea.', ar: 'سنكون أكثر سعادة لو عشنا قرب البحر.' },
      vosotros: { es: 'Vosotros seríais bienvenidos en cualquier momento.', en: 'You all would be welcome at any time.', ar: 'ستكونون مرحباً بكم في أي وقت.' },
      ellos_ellas_ustedes: { es: 'Ellos serían unos candidatos ideales para el puesto.', en: 'They would be ideal candidates for the job.', ar: 'سيكونون مرشحين مثاليين للوظيفة.' }
    },
    presentSubjunctive: {
      yo: { es: 'Mis padres quieren que yo sea médico.', en: 'My parents want me to be a doctor.', ar: 'يريد والداي أن أكون طبيباً.' },
      tu: { es: 'Espero que seas muy feliz en tu nuevo hogar.', en: 'I hope you are very happy in your new home.', ar: 'أتمنى أن تكون سعيداً جداً في منزلك الجديد.' },
      el_ella_usted: { es: 'Es importante que el informe sea claro y conciso.', en: 'It is important that the report is clear and concise.', ar: 'من المهم أن يكون التقرير واضحاً وموجزاً.' },
      nosotros: { es: 'El profesor pide que seamos puntuales en clase.', en: 'The teacher asks that we be punctual in class.', ar: 'يطلب الأستاذ منا أن نكون منضبطين في المواعيد.' },
      vosotros: { es: 'Deseo que seáis honestos el uno con el otro.', en: 'I wish that you all are honest with each other.', ar: 'أتمنى أن تكونوا صادقين مع بعضكم البعض.' },
      ellos_ellas_ustedes: { es: 'No creo que sean tan caros esos billetes.', en: 'I don\'t think those tickets are that expensive.', ar: 'لا أعتقد أن تلك التذاكر غالية إلى هذا الحد.' }
    },
    imperfectSubjunctive: {
      yo: { es: 'Si yo fuera millonario, viajaría por todo el mundo.', en: 'If I were a millionaire, I would travel the world.', ar: 'لو كنت مليونيراً لسافرت حول العالم.' },
      tu: { es: 'Si fueras más paciente, evitarías malentendidos.', en: 'If you were more patient, you would avoid misunderstandings.', ar: 'لو كنت أكثر صبراً لتجنبت سوء التفاهم.' },
      el_ella_usted: { es: 'Ojalá fuera más fácil conseguir el visado.', en: 'I wish it were easier to get the visa.', ar: 'يا ليت الحصول على التأشيرة كان أسهل.' },
      nosotros: { es: 'Si fuéramos ricos, compraríamos esa casa de campo.', en: 'If we were rich, we would buy that country house.', ar: 'لو كنا أثرياء لاشترينا ذلك المنزل الريفي.' },
      vosotros: { es: 'Si fuerais más activos, tendríais mejor salud.', en: 'If you all were more active, you would have better health.', ar: 'لو كنتم أكثر نشاطاً لكانت صحتكم أفضل.' },
      ellos_ellas_ustedes: { es: 'Dudaba de que fueran capaces de terminar a tiempo.', en: 'I doubted they were able to finish on time.', ar: 'كنت أشك في أنهم قادرون على الإنهاء في الموعد.' }
    },
    imperativeAffirmative: {
      tu: { es: 'Sé valiente y persigue tus sueños con pasión.', en: 'Be brave and pursue your dreams with passion.', ar: 'كن شجاعاً واسع وراء أحلامك بشغف.' },
      usted: { es: 'Sea bienvenido a nuestro centro cultural.', en: 'Welcome to our cultural center (formal).', ar: 'أهلاً بحضرتك في مركزنا الثقافي.' },
      nosotros: { es: 'Seamos optimistas ante los nuevos retos.', en: 'Let us be optimistic before new challenges.', ar: 'لنكن متفائلين أمام التحديات الجديدة.' },
      vosotros: { es: 'Sed pacientes, que el postre ya llega.', en: 'Be patient, dessert is arriving now.', ar: 'كونوا صبورين، فالحلوى قادمة الآن.' },
      ustedes: { es: 'Sean amables y pasen a la sala principal.', en: 'Please be so kind and step into the main hall.', ar: 'تفضلوا بلطف إلى القاعة الرئيسية.' }
    }
  },

  'v-estar': {
    present: {
      yo: { es: 'Estoy en la biblioteca preparando el examen final.', en: 'I am in the library preparing for the final exam.', ar: 'أنا في المكتبة أستعد للامتحان النهائي.' },
      tu: { es: '¿Estás listo para salir al aeropuerto?', en: 'Are you ready to leave for the airport?', ar: 'هل أنت جاهز للانطلاق إلى المطار؟' },
      el_ella_usted: { es: 'El museo del Prado está en el centro de Madrid.', en: 'The Prado Museum is in the center of Madrid.', ar: 'يقع متحف البرادو في وسط مدريد.' },
      nosotros: { es: 'Estamos muy contentos con los resultados de hoy.', en: 'We are very happy with today\'s results.', ar: 'نحن مسرورون جداً بنتائج اليوم.' },
      vosotros: { es: '¿Estáis seguros de que el tren sale a las seis?', en: 'Are you all sure the train departs at six?', ar: 'هل أنتم متأكدون من أن القطار يغادر في السادسة؟' },
      ellos_ellas_ustedes: { es: 'Mis llaves están encima de la mesa del salón.', en: 'My keys are on the living room table.', ar: 'مفاتيحي موجودة على طاولة الصالون.' }
    },
    preterite: {
      yo: { es: 'Ayer estuve enfermo todo el día en cama.', en: 'Yesterday I was sick in bed all day.', ar: 'أمس كنت مريضاً طوال اليوم في الفراش.' },
      tu: { es: '¿Dónde estuviste anoche durante la tormenta?', en: 'Where were you last night during the storm?', ar: 'أين كنت الليلة الماضية أثناء العاصفة؟' },
      el_ella_usted: { es: 'La reunión estuvo muy interesante y productiva.', en: 'The meeting was very interesting and productive.', ar: 'كان الاجتماع ممتعاً ومثمراً للغاية.' },
      nosotros: { es: 'El verano pasado estuvimos dos semanas en Granada.', en: 'Last summer we were in Granada for two weeks.', ar: 'الصيف الماضي قضينا أسبوعين في غرناطة.' },
      vosotros: { es: '¿Estuvisteis presentes en la conferencia de ayer?', en: 'Were you all present at yesterday\'s lecture?', ar: 'هل كنتم حاضرين في محاضرة الأمس؟' },
      ellos_ellas_ustedes: { es: 'Ellos estuvieron esperando el autobús casi una hora.', en: 'They were waiting for the bus for nearly an hour.', ar: 'ظلوا ينتظرون الحافلة لما يقارب الساعة.' }
    },
    imperfect: {
      yo: { es: 'Yo estaba leyendo tranquilamente cuando sonó el teléfono.', en: 'I was reading quietly when the phone rang.', ar: 'كنت أقرأ بهدوء عندما رن الهاتف.' },
      tu: { es: '¿Estabas durmiendo cuando toqué a tu puerta?', en: 'Were you sleeping when I knocked on your door?', ar: 'هل كنت نائماً عندما طرقت بابك؟' },
      el_ella_usted: { es: 'El cielo estaba despejado y hacía un día radiante.', en: 'The sky was clear and it was a radiant day.', ar: 'كانت السماء صافية وكان اليوم مشرقاً.' },
      nosotros: { es: 'Estábamos preparando la cena cuando llegaron los amigos.', en: 'We were preparing dinner when our friends arrived.', ar: 'كنا نعد العشاء عندما وصل الأصدقاء.' },
      vosotros: { es: 'Vosotros estabais muy concentrados en el estudio.', en: 'You all were very focused on studying.', ar: 'كنتم في غاية التركيز في الدراسة.' },
      ellos_ellas_ustedes: { es: 'Los niños estaban jugando alegres en el jardín.', en: 'The children were playing happily in the garden.', ar: 'كان الأطفال يلعبون بمرح في الحديقة.' }
    },
    future: {
      yo: { es: 'Mañana estaré disponible a partir de las tres.', en: 'Tomorrow I will be available after three o\'clock.', ar: 'غداً سأكون متاحاً بعد الساعة الثالثة.' },
      tu: { es: 'Pronto estarás hablando español con total naturalidad.', en: 'Soon you will be speaking Spanish completely naturally.', ar: 'قريباً ستتحدث الإسبانية بعفوية تامة.' },
      el_ella_usted: { es: 'El paquete estará en tu casa este viernes.', en: 'The package will be at your house this Friday.', ar: 'سيكون الطرد في منزلك هذا الجمعة.' },
      nosotros: { es: 'El próximo mes estaremos descansando en la playa.', en: 'Next month we will be relaxing at the beach.', ar: 'الشهر القادم سنكون مسترخين على الشاطئ.' },
      vosotros: { es: 'Vosotros estaréis orgullosos de vuestro progreso.', en: 'You all will be proud of your progress.', ar: 'ستكونون فخورين بتقدمكم.' },
      ellos_ellas_ustedes: { es: 'Ellos estarán esperándote en la puerta del teatro.', en: 'They will be waiting for you at the theater gate.', ar: 'سيكونون بانتظارك عند باب المسرح.' }
    },
    conditional: {
      yo: { es: 'Con más tiempo libre, yo estaría aprendiendo italiano.', en: 'With more free time, I would be learning Italian.', ar: 'لو كان لدي وقت فراغ أكبر لكنت أتعلم الإيطالية.' },
      tu: { es: '¿Estarías dispuesto a mudarte a otra ciudad?', en: 'Would you be willing to move to another city?', ar: 'هل ستكون مستعداً للانتقال إلى مدينة أخرى؟' },
      el_ella_usted: { es: 'Mi hermana estaría encantada de conocerte.', en: 'My sister would be delighted to meet you.', ar: 'ستكون أختي سعيدة جداً بالتعرف عليك.' },
      nosotros: { es: 'Nosotros estaríamos encantados de colaborar contigo.', en: 'We would be delighted to collaborate with you.', ar: 'يسعدنا جداً التعاون معك.' },
      vosotros: { es: 'Vosotros estaríais más tranquilos si planificarais antes.', en: 'You all would be calmer if you planned beforehand.', ar: 'ستكونون أكثر هدوءاً لو خططتم مسبقاً.' },
      ellos_ellas_ustedes: { es: 'Ellos estarían muy agradecidos por tu consejo.', en: 'They would be very grateful for your advice.', ar: 'سيكونون شاكرين جداً لنصيحتك.' }
    },
    presentSubjunctive: {
      yo: { es: 'Espero que yo esté a la altura de esta oportunidad.', en: 'I hope I am up to this opportunity.', ar: 'آمل أن أكون على قدر هذه الفرصة.' },
      tu: { es: 'Ojalá estés recuperado pronto del resfriado.', en: 'I hope you are recovered soon from the cold.', ar: 'أتمنى أن تتعافى قريباً من الزكام.' },
      el_ella_usted: { es: 'Es necesario que la comida esté caliente al servirla.', en: 'It is necessary that the food is hot when served.', ar: 'من الضروري أن يكون الطعام ساخناً عند تقديمه.' },
      nosotros: { es: 'El jefe quiere que estemos atentos a las llamadas.', en: 'The boss wants us to be alert to phone calls.', ar: 'يريد المدير أن نكون متيقظين للاتصالات.' },
      vosotros: { es: 'Deseo que estéis cómodos en esta sala.', en: 'I hope you all are comfortable in this room.', ar: 'أتمنى أن تكونوا مرتاحين في هذه القاعة.' },
      ellos_ellas_ustedes: { es: 'No creo que ellos estén enterados de la reunión.', en: 'I don\'t think they are aware of the meeting.', ar: 'لا أعتقد أنهم على علم بالاجتماع.' }
    },
    imperfectSubjunctive: {
      yo: { es: 'Si yo estuviera en tu lugar, aceptaría la oferta.', en: 'If I were in your shoes, I would accept the offer.', ar: 'لو كنت في مكانك لقبلت العرض فوراً.' },
      tu: { es: 'Si estuvieras aquí, lo celebraríamos juntos.', en: 'If you were here, we would celebrate together.', ar: 'لو كنت هنا لاحتفلنا معاً.' },
      el_ella_usted: { es: 'Ojalá el tiempo estuviera más soleado.', en: 'I wish the weather were sunnier.', ar: 'يا ليت الطقس كان أكثر إشراقاً.' },
      nosotros: { es: 'Si estuviéramos libres, iríamos al cine contigo.', en: 'If we were free, we would go to the movies with you.', ar: 'لو كنا متفرغين لذهبنا معك إلى السينما.' },
      vosotros: { es: 'Si estuvierais atentos, entenderíais la lección.', en: 'If you all were paying attention, you would understand.', ar: 'لو كنتم منتبهين لفهمتم الدرس.' },
      ellos_ellas_ustedes: { es: 'Dudaba que ellos estuvieran listos para el examen.', en: 'I doubted that they were ready for the exam.', ar: 'كنت أشك في أنهم جاهزون للامتحان.' }
    },
    imperativeAffirmative: {
      tu: { es: 'Está tranquilo, todo se resolverá sin problemas.', en: 'Be calm, everything will resolve without trouble.', ar: 'كن هادئاً، فكل شيء سيُحل بلا مشاكل.' },
      usted: { es: 'Esté atento a las instrucciones del guía, por favor.', en: 'Please pay attention to the guide\'s instructions.', ar: 'كن متنبهاً لتعليمات المرشد من فضلك.' },
      nosotros: { es: 'Estemos unidos ante cualquier dificultad.', en: 'Let us stay united before any difficulty.', ar: 'لنكن متحدين في وجه أي صعوبة.' },
      vosotros: { es: 'Estad preparados para salir en diez minutos.', en: 'Be prepared to leave in ten minutes.', ar: 'كونوا مستعدين للمغادرة خلال عشر دقائق.' },
      ustedes: { es: 'Estén atentos a la pantalla para su número de turno.', en: 'Please watch the screen for your ticket number.', ar: 'انتبهوا للشاشة لظهور رقم دوركم.' }
    }
  },

  'v-tener': {
    present: {
      yo: { es: 'Tengo una reunión muy importante a las cinco.', en: 'I have a very important meeting at five.', ar: 'لدي اجتماع مهم جداً في الساعة الخامسة.' },
      tu: { es: '¿Tienes tiempo para tomar un café y charlar?', en: 'Do you have time to grab a coffee and chat?', ar: 'هل لديك وقت لتناول قهوة والدردشة؟' },
      el_ella_usted: { es: 'Mi hermana tiene veinticinco años y dos gatos.', en: 'My sister is 25 years old and has two cats.', ar: 'أختي عمرها خمسة وعشرون عاماً ولديها قطتان.' },
      nosotros: { es: 'Tenemos que darnos prisa para no perder el tren.', en: 'We have to hurry so we don\'t miss the train.', ar: 'علينا الإسراع حتى لا يفوتنا القطار.' },
      vosotros: { es: '¿Tenéis ganas de probar comida típica mexicana?', en: 'Do you all feel like trying authentic Mexican food?', ar: 'هل ترغبون في تجربة طعام مكسيكي أصيل؟' },
      ellos_ellas_ustedes: { es: 'Ellos tienen muchas dudas sobre el nuevo contrato.', en: 'They have many doubts about the new contract.', ar: 'لديهم شكوك كثيرة حول العقد الجديد.' }
    },
    preterite: {
      yo: { es: 'Ayer tuve una idea brillante para el proyecto.', en: 'Yesterday I had a brilliant idea for the project.', ar: 'أمس راودتني فكرة رائعة للمشروع.' },
      tu: { es: '¿Tuviste algún problema para encontrar la dirección?', en: 'Did you have any trouble finding the address?', ar: 'هل واجهت أي صعوبة في العثور على العنوان؟' },
      el_ella_usted: { es: 'El profesor tuvo la paciencia de explicármelo otra vez.', en: 'The teacher had the patience to explain it to me again.', ar: 'تحلى الأستاذ بالصبر وشرحه لي مرة أخرى.' },
      nosotros: { es: 'Nosotros tuvimos la suerte de conseguir entradas para el teatro.', en: 'We were lucky enough to get theater tickets.', ar: 'حالفنا الحظ وحصلنا على تذاكر المسرح.' },
      vosotros: { es: '¿Tuvisteis tiempo de visitar la Alhambra de Granada?', en: 'Did you all have time to visit the Alhambra in Granada?', ar: 'هل كان لديكم وقت لزيارة قصر الحمراء في غرناطة؟' },
      ellos_ellas_ustedes: { es: 'Los vecinos tuvieron que llamar al fontanero anoche.', en: 'The neighbors had to call the plumber last night.', ar: 'اضطر الجيران للاتصال بالسباك الليلة الماضية.' }
    },
    imperfect: {
      yo: { es: 'Cuando tenía diez años, vivía en Valencia.', en: 'When I was ten years old, I lived in Valencia.', ar: 'عندما كان عمري عشر سنوات، كنت أعيش في فالنسيا.' },
      tu: { es: 'Siempre que tenías dudas, me llamabas enseguida.', en: 'Whenever you had doubts, you called me right away.', ar: 'كلما راودتك شكوك، كنت تتصل بي فوراً.' },
      el_ella_usted: { es: 'La casa del abuelo tenía un huerto con limoneros.', en: 'Grandpa\'s house had an orchard with lemon trees.', ar: 'كان في منزل جدي بستان بأشجار الليمون.' },
      nosotros: { es: 'Nosotros teníamos la costumbre de cenar todos juntos.', en: 'We used to have the habit of having dinner all together.', ar: 'كانت لدينا عادة تناول العشاء معاً كل يوم.' },
      vosotros: { es: 'Vosotros teníais razón y yo estaba equivocado.', en: 'You all were right and I was mistaken.', ar: 'كان معكم حق وكنت أنا على خطأ.' },
      ellos_ellas_ustedes: { es: 'Ellos no tenían idea de la fiesta sorpresa.', en: 'They had no idea about the surprise party.', ar: 'لم تكن لديهم أية فكرة عن الحفل المفاجئ.' }
    },
    future: {
      yo: { es: 'La próxima semana tendré listos todos los documentos.', en: 'Next week I will have all documents ready.', ar: 'الأسبوع المقبل سأجهز جميع الوثائق.' },
      tu: { es: 'Si estudias con constancia, tendrás un gran éxito.', en: 'If you study consistently, you will have great success.', ar: 'إذا درست بانتظام، فستحقق نجاحاً باهراً.' },
      el_ella_usted: { es: 'Mañana el presidente tendrá una rueda de prensa.', en: 'Tomorrow the president will hold a press conference.', ar: 'سيعقد الرئيس مؤتمراً صحفياً غداً.' },
      nosotros: { es: 'Pronto tendremos las respuestas que estamos buscando.', en: 'Soon we will have the answers we are searching for.', ar: 'قريباً سنحصل على الإجابات التي نبحث عنها.' },
      vosotros: { es: 'Vosotros tendréis acceso prioritario a la plataforma.', en: 'You all will have priority access to the platform.', ar: 'سيكون لديكم وصول أولوي إلى المنصة.' },
      ellos_ellas_ustedes: { es: 'Ellos tendrán que decidir antes del viernes.', en: 'They will have to decide before Friday.', ar: 'سيتعين عليهم اتخاذ القرار قبل يوم الجمعة.' }
    },
    conditional: {
      yo: { es: 'Con más presupuesto, yo tendría un equipo más grande.', en: 'With more budget, I would have a larger team.', ar: 'لو توفرت ميزانية أكبر لكان لدي فريق أضخم.' },
      tu: { es: '¿Tendrías la amabilidad de cerrar la ventana?', en: 'Would you be so kind as to close the window?', ar: 'هل تتكرم وتغلق النافذة من فضلك؟' },
      el_ella_usted: { es: 'Cualquier estudiante tendría ganas de aprender con este método.', en: 'Any student would want to learn with this method.', ar: 'أي طالب ستكون لديه الرغبة في التعلم بهذه الطريقة.' },
      nosotros: { es: 'Nosotros tendríamos mucho gusto en recibirles.', en: 'We would be delighted to receive you all.', ar: 'يسعدنا ويشرفنا كثيراً استقبالكم.' },
      vosotros: { es: 'Vosotros tendríais más ventajas si os inscribierais ahora.', en: 'You all would have more benefits if you signed up now.', ar: 'سيكون لديكم مزايا أكثر لو سجلتم الآن.' },
      ellos_ellas_ustedes: { es: 'Ellos tendrían dificultades para viajar sin visado.', en: 'They would have difficulty traveling without a visa.', ar: 'سيواجهون صعوبات في السفر بدون تأشيرة.' }
    },
    presentSubjunctive: {
      yo: { es: 'Ojalá yo tenga suficiente tiempo para terminar el libro.', en: 'I hope I have enough time to finish the book.', ar: 'أتمنى أن يكون لدي متسع من الوقت لإنهاء الكتاب.' },
      tu: { es: 'Deseo que tengas un viaje seguro y divertido.', en: 'I hope you have a safe and fun trip.', ar: 'أتمنى لك رحلة آمنة وممتعة.' },
      el_ella_usted: { es: 'Es fundamental que el candidato tenga experiencia previa.', en: 'It is essential that the candidate has prior experience.', ar: 'من الضروري أن يمتلك المرشح خبرة سابقة.' },
      nosotros: { es: 'El guía pide que tengamos cuidado en este sendero.', en: 'The guide asks that we be careful on this trail.', ar: 'يطلب منا المرشد أن نكون حذرين في هذا الممر.' },
      vosotros: { es: 'Espero que tengáis mucha suerte en la competición.', en: 'I hope you all have great luck in the competition.', ar: 'أتمنى لكم حظاً وافراً في المنافسة.' },
      ellos_ellas_ustedes: { es: 'No creo que ellos tengan la culpa de lo sucedido.', en: 'I don\'t think they are to blame for what happened.', ar: 'لا أعتقد أنهم يلامون على ما حدث.' }
    },
    imperfectSubjunctive: {
      yo: { es: 'Si tuviera más tiempo libre, aprendería a tocar la guitarra.', en: 'If I had more free time, I would learn to play the guitar.', ar: 'لو كان لدي المزيد من وقت الفراغ لتعلمت العزف على الغيتار.' },
      tu: { es: 'Si tuvieras paciencia, lograrías mejores resultados.', en: 'If you had patience, you would achieve better results.', ar: 'لو كان لديك صبر لحققت نتائج أفضل.' },
      el_ella_usted: { es: 'Ojalá tuviera una respuesta clara para darte.', en: 'I wish he/she had a clear answer to give you.', ar: 'يا ليته كان يملك إجابة واضحة ليقدمها لك.' },
      nosotros: { es: 'Si tuviéramos coche, iríamos a la montaña el domingo.', en: 'If we had a car, we would go to the mountains on Sunday.', ar: 'لو كانت لدينا سيارة لذهبنا للجبل يوم الأحد.' },
      vosotros: { es: 'Si tuvierais hambre, prepararíamos unas tapas.', en: 'If you all were hungry, we would prepare some tapas.', ar: 'لو كنتم جائعين لأعددنا بعض المقبلات.' },
      ellos_ellas_ustedes: { es: 'Dudaba de que ellos tuvieran suficientes recursos.', en: 'I doubted they had enough resources.', ar: 'كنت أشك في أن لديهم موارد كافية.' }
    },
    imperativeAffirmative: {
      tu: { es: 'Ten paciencia, las cosas buenas toman tiempo.', en: 'Have patience, good things take time.', ar: 'تحلَّ بالصبر، فالأشياء الجميلة تستغرق وقتاً.' },
      usted: { es: 'Tenga la bondad de tomar asiento en la sala de espera.', en: 'Please be so kind as to take a seat in the waiting room.', ar: 'تفضل بالجلوس في قاعة الانتظار بكل لطف.' },
      nosotros: { es: 'Tengamos fe en nuestras capacidades.', en: 'Let us have faith in our abilities.', ar: 'لنثق بقدراتنا وإمكانياتنا.' },
      vosotros: { es: 'Tened cuidado con el suelo resbaladizo.', en: 'Be careful with the slippery floor.', ar: 'احذروا من الأرضية الزلقة.' },
      ustedes: { es: 'Tengan un excelente día y buen viaje.', en: 'Have an excellent day and a safe journey.', ar: 'أتمنى لحضراتكم يوماً رائعاً ورحلة موفقة.' }
    }
  },

  'v-ir': {
    present: {
      yo: { es: 'Voy a la biblioteca en metro todos los días.', en: 'I go to the library by subway every day.', ar: 'أذهب إلى المكتبة بالمترو كل يوم.' },
      tu: { es: '¿Vas al gimnasio después del trabajo?', en: 'Are you going to the gym after work?', ar: 'هل تذهب إلى النادي الرياضي بعد العمل؟' },
      el_ella_usted: { es: 'Carlos va a estudiar medicina en Salamanca.', en: 'Carlos is going to study medicine in Salamanca.', ar: 'كارلوس ذاهب لدراسة الطب في سالامانكا.' },
      nosotros: { es: 'Nosotros vamos al cine este fin de semana.', en: 'We are going to the cinema this weekend.', ar: 'نحن ذاهبون إلى السينما في نهاية هذا الأسبوع.' },
      vosotros: { es: '¿Vais a pie o cogéis el autobús urbano?', en: 'Are you all walking or taking the city bus?', ar: 'هل تذهبون سيراً على الأقدام أم تستقلون الحافلة؟' },
      ellos_ellas_ustedes: { es: 'Mis primos van de vacaciones a Cancún.', en: 'My cousins are going on vacation to Cancun.', ar: 'أبناء عمومتي ذاهبون في عطلة إلى كانكون.' }
    },
    preterite: {
      yo: { es: 'Ayer fui al supermercado a comprar fruta fresca.', en: 'Yesterday I went to the supermarket to buy fresh fruit.', ar: 'أمس ذهبت إلى السوبرماركت لشراء فواكه طازجة.' },
      tu: { es: '¿Fuiste a la fiesta de cumpleaños de Sofía?', en: 'Did you go to Sofia\'s birthday party?', ar: 'هل ذهبت إلى حفل عيد ميلاد صوفيا؟' },
      el_ella_usted: { es: 'El verano pasado ella fue a visitar a sus abuelos.', en: 'Last summer she went to visit her grandparents.', ar: 'الصيف الماضي ذهبت لزيارة جديها.' },
      nosotros: { es: 'Nosotros fuimos a cenar a un restaurante andaluz.', en: 'We went to dinner at an Andalusian restaurant.', ar: 'ذهبنا لتناول العشاء في مطعم أندلسي.' },
      vosotros: { es: '¿Fuisteis al museo arqueológico durante el viaje?', en: 'Did you all go to the archaeological museum during the trip?', ar: 'هل ذهبتم إلى المتحف الأثري أثناء الرحلة؟' },
      ellos_ellas_ustedes: { es: 'Ellos fueron directamente al hotel a descansar.', en: 'They went directly to the hotel to rest.', ar: 'ذهبوا مباشرة إلى الفندق لأخذ قسط من الراحة.' }
    },
    imperfect: {
      yo: { es: 'De pequeño yo iba a la escuela en bicicleta.', en: 'As a child I used to go to school by bicycle.', ar: 'عندما كنت صغيراً كنت أذهب للمدرسة بالدراجة.' },
      tu: { es: 'Tú siempre ibas al parque los sábados por la mañana.', en: 'You always used to go to the park on Saturday mornings.', ar: 'كنت تذهب دائماً إلى الحديقة صباح كل سبت.' },
      el_ella_usted: { es: 'Mi padre iba a trabajar muy temprano cada día.', en: 'My father used to go to work very early every day.', ar: 'كان والدي يذهب إلى العمل مبكراً جداً كل يوم.' },
      nosotros: { es: 'Nosotros íbamos a la playa todos los meses de julio.', en: 'We used to go to the beach every July.', ar: 'كنا نذهب إلى الشاطئ في شهر يوليو من كل عام.' },
      vosotros: { es: 'Vosotros ibais a menudo a la casa de campo.', en: 'You all frequently went to the country cottage.', ar: 'كنتم تذهبون باستمرار إلى منزل الريف.' },
      ellos_ellas_ustedes: { es: 'Ellos iban a clases de baile flamenco por las tardes.', en: 'They used to go to flamenco dance classes in the evenings.', ar: 'كانوا يذهبون إلى دروس رقص الفلامنكو مساءً.' }
    },
    future: {
      yo: { es: 'Mañana iré a la embajada a renovar mi pasaporte.', en: 'Tomorrow I will go to the embassy to renew my passport.', ar: 'غداً سأذهب إلى السفارة لتجديد جواز سفري.' },
      tu: { es: '¿Irás a la feria del libro este sábado?', en: 'Will you go to the book fair this Saturday?', ar: 'هل ستذهب إلى معرض الكتاب هذا السبت؟' },
      el_ella_usted: { es: 'El equipo irá a competir a Barcelona el mes que viene.', en: 'The team will go compete in Barcelona next month.', ar: 'سيذهب الفريق للمنافسة في برشلونة الشهر المقبل.' },
      nosotros: { es: 'Mañana iremos al mercado central a comprar especias.', en: 'Tomorrow we will go to the central market to buy spices.', ar: 'غداً سنذهب إلى السوق المركزي لشراء التوابل.' },
      vosotros: { es: 'Vosotros iréis con nosotros en el mismo autobús.', en: 'You all will go with us on the same bus.', ar: 'ستذهبون معنا في نفس الحافلة.' },
      ellos_ellas_ustedes: { es: 'Los delegados irán a la cumbre internacional en Madrid.', en: 'The delegates will go to the international summit in Madrid.', ar: 'سيذهب المندوبون إلى القمة الدولية في مدريد.' }
    },
    conditional: {
      yo: { es: 'Yo iría a vivir a Sevilla si consiguiera ese puesto.', en: 'I would go live in Seville if I got that job.', ar: 'لكنت ذهبت للعيش في إشبيلية لو حصلت على تلك الوظيفة.' },
      tu: { es: '¿Irías a una isla desierta por un año?', en: 'Would you go to a deserted island for a year?', ar: 'هل تذهب إلى جزيرة مهجورة لمدة عام؟' },
      el_ella_usted: { es: 'Ella iría con gusto si no tuviera que estudiar.', en: 'She would gladly go if she didn\'t have to study.', ar: 'لذهبت بكل سرور لو لم تكن مضطرة للدراسة.' },
      nosotros: { es: 'Nosotros iríamos al concierto si quedaran entradas.', en: 'We would go to the concert if tickets were left.', ar: 'لكنا ذهبنا للحفل الموسيقي لو تبقت تذاكر.' },
      vosotros: { es: 'Vosotros iríais más tranquilos si salierais con tiempo.', en: 'You all would go much calmer if you left early.', ar: 'لذهبتم براحة أكبر لو غادرتم في وقت مبكر.' },
      ellos_ellas_ustedes: { es: 'Ellos irían a visitarte si supieran tu dirección.', en: 'They would go visit you if they knew your address.', ar: 'لكانوا ذهبوا لزيارتك لو علموا بعنوانك.' }
    },
    presentSubjunctive: {
      yo: { es: 'Mis amigos insisten en que yo vaya con ellos al viaje.', en: 'My friends insist that I go with them on the trip.', ar: 'يصر أصدقائي على أن أذهب معهم في الرحلة.' },
      tu: { es: 'No quiero que vayas solo por esa calle tan oscura.', en: 'I don\'t want you to go alone along that dark street.', ar: 'لا أريدك أن تذهب وحدك في ذلك الشارع المظلم.' },
      el_ella_usted: { es: 'Es mejor que el doctor vaya a ver al paciente a su casa.', en: 'It is best that the doctor goes to see the patient at home.', ar: 'من الأفضل أن يذهب الطبيب لزيارة المريض في منزله.' },
      nosotros: { es: 'La profesora sugiere que vayamos al museo de historia.', en: 'The teacher suggests that we go to the history museum.', ar: 'تقترح المعلمة أن نذهب إلى متحف التاريخ.' },
      vosotros: { es: 'Espero que vayáis preparados para la caminata.', en: 'I hope you all go prepared for the hike.', ar: 'أتمنى أن تذهبوا مستعدين للمسير الجبلي.' },
      ellos_ellas_ustedes: { es: 'Es importante que ellos vayan a votar temprano.', en: 'It is important that they go vote early.', ar: 'من المهم أن يذهبوا للتصويت مبكراً.' }
    },
    imperfectSubjunctive: {
      yo: { es: 'Si yo fuera a España, visitaría Granada primero.', en: 'If I were to go to Spain, I would visit Granada first.', ar: 'لو ذهبت إلى إسبانيا لزرت غرناطة أولاً.' },
      tu: { es: 'Ojalá fueras más seguido a ver a tus abuelos.', en: 'I wish you went more often to see your grandparents.', ar: 'يا ليتك كنت تذهب أكثر لرؤية أجدادك.' },
      el_ella_usted: { es: 'Le pedí que fuera conmigo a la farmacia.', en: 'I asked him/her to go with me to the pharmacy.', ar: 'طلبت منه أن يذهب معي إلى الصيدلية.' },
      nosotros: { es: 'Si fuéramos a Roma, visitaríamos el Coliseo.', en: 'If we were to go to Rome, we would visit the Colosseum.', ar: 'لو ذهبنا إلى روما لزرنا الكولوسيوم.' },
      vosotros: { es: 'Si fuerais al norte, veríais paisajes verdes increíbles.', en: 'If you all went north, you would see incredible green landscapes.', ar: 'لو ذهبتم إلى الشمال لرأيتم مناظر خضراء مذهلة.' },
      ellos_ellas_ustedes: { es: 'Me alegró que ellos fueran a la ceremonia de graduación.', en: 'I was glad that they went to the graduation ceremony.', ar: 'أسعدني أنهم ذهبوا إلى حفل التخرج.' }
    },
    imperativeAffirmative: {
      tu: { es: 'Ve con cuidado y llámame en cuanto llegues.', en: 'Go carefully and call me as soon as you arrive.', ar: 'اذهب بحذر واتصل بي فور وصولك.' },
      usted: { es: 'Vaya por la primera calle a la derecha y verá la plaza.', en: 'Go down the first street on the right and you\'ll see the square.', ar: 'امشِ في أول شارع على اليمين وسترى الساحة.' },
      nosotros: { es: '¡Vamos juntos a celebrar este gran triunfo!', en: 'Let\'s go together to celebrate this great triumph!', ar: 'هيا نذهب معاً للاحتفال بهذا الإنجاز العظيم!' },
      vosotros: { es: 'Id despacio, que la carretera tiene curvas peligrosas.', en: 'Go slowly, the road has dangerous curves.', ar: 'اذهبوا بتمهل فالطريق به منعطفات خطيرة.' },
      ustedes: { es: 'Vayan directamente a la puerta de embarque número cuatro.', en: 'Please proceed directly to boarding gate number four.', ar: 'توجهوا مباشرة إلى بوابة الصعود رقم أربعة.' }
    }
  },

  'v-hacer': {
    present: {
      yo: { es: 'Hago ejercicio aeróbico todas las mañanas.', en: 'I do aerobic exercise every morning.', ar: 'أمارس التمارين الرياضية كل صباح.' },
      tu: { es: '¿Qué haces en tu tiempo libre los fines de semana?', en: 'What do you do in your free time on weekends?', ar: 'ماذا تفعل في وقت فراغك في عطلة نهاية الأسبوع؟' },
      el_ella_usted: { es: 'Hoy hace un día espléndido para pasear por el parque.', en: 'Today the weather is splendid for a walk in the park.', ar: 'الطقس رائع اليوم للتنزه في الحديقة العامة.' },
      nosotros: { es: 'Nosotros hacemos paella casera los domingos.', en: 'We make homemade paella on Sundays.', ar: 'نحن نعد الباييا المنزلية أيام الأحد.' },
      vosotros: { es: '¿Qué hacéis aquí tan temprano?', en: 'What are you all doing here so early?', ar: 'ماذا تفعلون هنا في هذا الوقت المبكر؟' },
      ellos_ellas_ustedes: { es: 'Ellos hacen un gran esfuerzo para aprender español.', en: 'They make a great effort to learn Spanish.', ar: 'يبذلون جهداً كبيراً لتعلم اللغة الإسبانية.' }
    },
    preterite: {
      yo: { es: 'Ayer hice una tarta de chocolate deliciosa.', en: 'Yesterday I made a delicious chocolate cake.', ar: 'أمس صنعت كعكة شوكولاتة لذيذة.' },
      tu: { es: '¿Hiciste los deberes de gramática española?', en: 'Did you do the Spanish grammar homework?', ar: 'هل أنجزت واجب قواعد اللغة الإسبانية؟' },
      el_ella_usted: { es: 'Mi compañero hizo una presentación impecable.', en: 'My partner gave an impeccable presentation.', ar: 'قدم زميلي عرضاً تقديمياً لا تشوبه شائبة.' },
      nosotros: { es: 'Nosotros hicimos una reserva en el hotel del centro.', en: 'We made a reservation at the downtown hotel.', ar: 'أجرينا حجزاً في الفندق الواقع بوسط المدينة.' },
      vosotros: { es: '¿Hicisteis la maleta para el vuelo de mañana?', en: 'Did you all pack your suitcase for tomorrow\'s flight?', ar: 'هل حزمتم أمتعتكم لرحلة طيران الغد؟' },
      ellos_ellas_ustedes: { es: 'Los arquitectos hicieron un diseño ecológico innovador.', en: 'The architects made an innovative ecological design.', ar: 'ابتكر المعماريون تصميماً بيئياً مبتكراً.' }
    },
    imperfect: {
      yo: { es: 'Cuando vivía en la costa, hacía surf casi a diario.', en: 'When I lived on the coast, I used to surf almost daily.', ar: 'عندما كنت أعيش على الساحل كنت أمارس ركوب الأمواج يومياً.' },
      tu: { es: 'Tú siempre hacías reír a todo el grupo.', en: 'You always used to make the whole group laugh.', ar: 'كنت دائماً تضحك كل أفراد المجموعة.' },
      el_ella_usted: { es: 'Hacía mucho frío aquella noche de diciembre.', en: 'It was very cold that December night.', ar: 'كان الجو بارداً جداً في تلك الليلة من شهر ديسمبر.' },
      nosotros: { es: 'Nosotros hacíamos senderismo por la sierra los sábados.', en: 'We used to hike through the mountains on Saturdays.', ar: 'كنا نتنزه مشياً في الجبال كل يوم سبت.' },
      vosotros: { es: 'Vosotros hacíais preguntas muy interesantes en clase.', en: 'You all used to ask very interesting questions in class.', ar: 'كنتم تطرحون أسئلة شيقة للغاية في الصف.' },
      ellos_ellas_ustedes: { es: 'Ellos hacían proyectos comunitarios para el barrio.', en: 'They used to do community projects for the neighborhood.', ar: 'كانوا ينفذون مشاريع مجتمعية لخدمة الحي.' }
    },
    future: {
      yo: { es: 'Mañana haré todo lo posible por ayudarte.', en: 'Tomorrow I will do everything possible to help you.', ar: 'غداً سأبذل كل ما بوسعي لمساعدتك.' },
      tu: { es: 'Verás que harás nuevos amigos muy pronto.', en: 'You\'ll see that you will make new friends very soon.', ar: 'سترى أنك ستكون صداقات جديدة قريباً جداً.' },
      el_ella_usted: { es: 'El nuevo director hará cambios importantes en la empresa.', en: 'The new manager will make important changes in the company.', ar: 'سيجري المدير الجديد تغييرات هامة في الشركة.' },
      nosotros: { es: 'El próximo año haremos un viaje inolvidable a Perú.', en: 'Next year we will take an unforgettable trip to Peru.', ar: 'العام المقبل سنقوم برحلة لا تُنسى إلى بيرو.' },
      vosotros: { es: 'Vosotros haréis un papel excelente en la obra.', en: 'You all will play an excellent role in the play.', ar: 'ستؤدون دوراً ممتازاً في المسرحية.' },
      ellos_ellas_ustedes: { es: 'Ellos harán las reformas de la casa el mes próximo.', en: 'They will do the house renovations next month.', ar: 'سيقومون بترميمات المنزل الشهر القادم.' }
    },
    conditional: {
      yo: { es: 'Yo haría ese curso si tuviera más tiempo libre.', en: 'I would take that course if I had more free time.', ar: 'لكنت أخذت تلك الدورة لو توفر لدي وقت كافٍ.' },
      tu: { es: '¿Qué harías tú en esta situación tan difícil?', en: 'What would you do in this difficult situation?', ar: 'ماذا كنت ستفعل أنت في هذا الموقف الصعب؟' },
      el_ella_usted: { es: 'Cualquiera haría lo mismo para proteger a su familia.', en: 'Anyone would do the same to protect their family.', ar: 'أي شخص سيفعل الشيء نفسه لحماية عائلته.' },
      nosotros: { es: 'Nosotros haríamos una fiesta si ganara nuestro equipo.', en: 'We would throw a party if our team won.', ar: 'لكنا أقمنا حفلة لو فاز فريقنا.' },
      vosotros: { es: 'Vosotros haríais bien en consultar con un experto.', en: 'You all would do well to consult an expert.', ar: 'من الأفضل لكم استشارة خبير.' },
      ellos_ellas_ustedes: { es: 'Ellos harían las paces si hablaran con calma.', en: 'They would make peace if they spoke calmly.', ar: 'لتصالحوا لو تحدثوا بهدوء.' }
    },
    presentSubjunctive: {
      yo: { es: 'Mi jefe quiere que yo haga un informe detallado.', en: 'My boss wants me to make a detailed report.', ar: 'يريد مني مديري إعداد تقرير مفصل.' },
      tu: { es: 'Espero que hagas un viaje seguro y enriquecedor.', en: 'I hope you have a safe and enriching journey.', ar: 'أتمنى أن تخوض رحلة آمنة ومثرية.' },
      el_ella_usted: { es: 'Es importante que el médico haga un diagnóstico preciso.', en: 'It is important that the doctor makes an accurate diagnosis.', ar: 'من المهم أن يضع الطبيب تشخيصاً دقيقاً.' },
      nosotros: { es: 'El profesor pide que hagamos las actividades en parejas.', en: 'The teacher asks that we do the activities in pairs.', ar: 'يطلب الأستاذ أن ننجز الأنشطة في ثنائيات.' },
      vosotros: { es: 'Deseo que hagáis un buen trabajo con el proyecto.', en: 'I hope you all do a good job with the project.', ar: 'أتمنى أن تقدموا عملاً رائعاً في المشروع.' },
      ellos_ellas_ustedes: { es: 'No me parece bien que ellos hagan tanto ruido.', en: 'I don\'t think it\'s right that they make so much noise.', ar: 'لا يعجبني إصدارهم لكل هذا الضجيج.' }
    },
    imperfectSubjunctive: {
      yo: { es: 'Si yo hiciera más deporte, me sentiría con más energía.', en: 'If I did more sports, I would feel more energized.', ar: 'لو مارست الرياضة أكثر لشعرت بطاقة أكبر.' },
      tu: { es: 'Ojalá hicieras caso de los buenos consejos.', en: 'I wish you listened to good advice.', ar: 'يا ليتك كنت تصغي للنصائح السديدة.' },
      el_ella_usted: { es: 'Si el tren no hiciera tantas paradas, llegaríamos antes.', en: 'If the train didn\'t make so many stops, we would arrive sooner.', ar: 'لو لم يتوقف القطار في محطات كثيرة لوصلنا أبكر.' },
      nosotros: { es: 'Si hiciéramos una pausa ahora, rendiríamos mejor después.', en: 'If we took a break now, we would perform better later.', ar: 'لو أخذنا استراحة الآن لكان أداؤنا أفضل لاحقاً.' },
      vosotros: { es: 'Si hicierais un esfuerzo conjunto, lo lograríais.', en: 'If you all made a joint effort, you would achieve it.', ar: 'لو بذلتم جهداً جماعياً لحققتم الهدف.' },
      ellos_ellas_ustedes: { es: 'Dudaba que ellos hicieran el trabajo sin ayuda.', en: 'I doubted they did the work without help.', ar: 'كنت أشك في قدرتهم على إنجاز العمل دون مساعدة.' }
    },
    imperativeAffirmative: {
      tu: { es: 'Haz lo correcto aunque nadie te esté mirando.', en: 'Do the right thing even when no one is watching.', ar: 'افعل الصواب حتى لو لم يكن أحد يراك.' },
      usted: { es: 'Haga el favor de firmar en la parte inferior del documento.', en: 'Please do the favor of signing at the bottom of the document.', ar: 'تفضل بالتوقيع في أسفل الوثيقة من فضلك.' },
      nosotros: { es: 'Hagamos un brindis por la salud y la amistad.', en: 'Let us make a toast to health and friendship.', ar: 'لنرفع نخب الصحة والصداقة.' },
      vosotros: { es: 'Haced las maletas pronto, que el taxi ya viene.', en: 'Pack your bags quickly, the taxi is already coming.', ar: 'احزموا الحقائب بسرعة، فالتاكسي قادم.' },
      ustedes: { es: 'Hagan silencio durante la proyección de la película.', en: 'Please keep silence during the screening of the movie.', ar: 'الرجاء التزام الهدوء أثناء عرض الفيلم.' }
    }
  }
};

/**
 * Universal Fallback Contextualizer for verbs not fully mapped in dictionary
 */
export const getContextualVerbSentence = (
  verbInfinitive: string,
  verbId: string,
  tense: string,
  subjectKey: string,
  conjugation: string,
  englishDef: string
): { es: string; en: string; ar: string } => {
  // Check curated authentic dictionary first
  if (VERB_COMMUNICATIVE_SENTENCES[verbId]?.[tense]?.[subjectKey]) {
    return VERB_COMMUNICATIVE_SENTENCES[verbId][tense][subjectKey];
  }

  // Curated templates based on tense and subject for flawless natural Spanish
  const subjectPronounMap: Record<string, { es: string; en: string; ar: string }> = {
    yo: { es: 'Yo', en: 'I', ar: 'أنا' },
    tu: { es: 'Tú', en: 'You', ar: 'أنتَ' },
    el_ella_usted: { es: 'Él', en: 'He', ar: 'هو' },
    nosotros: { es: 'Nosotros', en: 'We', ar: 'نحن' },
    vosotros: { es: 'Vosotros', en: 'You all', ar: 'أنتم' },
    ellos_ellas_ustedes: { es: 'Ellos', en: 'They', ar: 'هم' }
  };

  const sub = subjectPronounMap[subjectKey] || { es: 'Él', en: 'He', ar: 'هو' };

  if (tense === 'present') {
    return {
      es: `${sub.es} ${conjugation} con entusiasmo cada día.`,
      en: `${sub.en} ${englishDef.replace('to ', '')} with enthusiasm every day.`,
      ar: `${sub.ar} يقوم بهذا العمل بحماس كل يوم.`
    };
  }
  if (tense === 'preterite') {
    return {
      es: `Ayer ${sub.es.toLowerCase()} ${conjugation} en el momento oportuno.`,
      en: `Yesterday ${sub.en.toLowerCase()} did this at the right time.`,
      ar: `أمس قام ${sub.ar} بذلك في اللحظة المناسبة تماماً.`
    };
  }
  if (tense === 'imperfect') {
    return {
      es: `En aquella época ${sub.es.toLowerCase()} ${conjugation} con frecuencia.`,
      en: `At that time ${sub.en.toLowerCase()} used to do this frequently.`,
      ar: `في تلك الحقبة اعتاد ${sub.ar} على فعل ذلك بانتظام.`
    };
  }
  if (tense === 'future') {
    return {
      es: `Mañana ${sub.es.toLowerCase()} ${conjugation} sin ninguna duda.`,
      en: `Tomorrow ${sub.en.toLowerCase()} will do this without any doubt.`,
      ar: `غداً سيقوم ${sub.ar} بهذا الأمر دون أي شك.`
    };
  }
  if (tense === 'conditional') {
    return {
      es: `Con más tiempo, ${sub.es.toLowerCase()} ${conjugation} con mucho gusto.`,
      en: `With more time, ${sub.en.toLowerCase()} would do this with pleasure.`,
      ar: `لو توفر المزيد من الوقت، لقام ${sub.ar} بذلك بكل سرور.`
    };
  }
  if (tense === 'presentSubjunctive') {
    return {
      es: `Es importante que ${sub.es.toLowerCase()} ${conjugation} con atención.`,
      en: `It is important that ${sub.en.toLowerCase()} do this attentively.`,
      ar: `من الأهمية بمكان أن يقوم ${sub.ar} بذلك بعناية واهتمام.`
    };
  }

  return {
    es: `${sub.es} ${conjugation} habitualmente en España.`,
    en: `${sub.en} typically do this in Spain.`,
    ar: `يقوم ${sub.ar} بهذا التصريف بصورة طبيعية في إسبانيا.`
  };
};

/**
 * High-yield Communicative Situational Fill-in Drills (Mode A)
 */
export const SITUATIONAL_FILL_IN_DRILLS: SituationalFillInDrill[] = [
  {
    id: 's-fill-1',
    situation: 'Estás en un restaurante en Madrid y pides amablemente la cuenta al camarero:',
    situation_ar: 'أنت في مطعم في مدريد وتطلب الفاتورة بلطف من النادل:',
    sentenceWithBlank: 'Por favor, ¿____ (poder / usted / presente) traernos la cuenta?',
    verbInfinitive: 'poder',
    tenseLabel: 'Presente (Cortesía / Usted)',
    subjectLabel: 'Usted (Formal)',
    correctAnswer: 'puede',
    options: ['puede', 'puedo', 'podemos', 'pueden'],
    fullSentence: 'Por favor, ¿puede traernos la cuenta?',
    translation_en: 'Please, could you bring us the bill?',
    translation_ar: 'من فضلك، هل يمكنك إحضار الفاتورة لنا؟',
    formativeExplanation_en: 'In Spanish service encounters, use the 3rd person singular "puede" with "usted" for respectful, polite requests.',
    formativeExplanation_ar: 'في مواقف الخدمة والمطاعم بإسبانيا، نستخدم صيغة الغائب "puede" مع ضمير المخاطب الرسمي usted لطلب الشيء بأدب.'
  },
  {
    id: 's-fill-2',
    situation: 'Hablas con un colega sobre tus planes para mañana por la tarde:',
    situation_ar: 'تتحدث مع زميلك عن خططك لغدٍ بعد الظهر:',
    sentenceWithBlank: 'Mañana nosotros ____ (ir / futuro) al mercado central a comprar fruta fresca.',
    verbInfinitive: 'ir',
    tenseLabel: 'Futuro Simple',
    subjectLabel: 'Nosotros',
    correctAnswer: 'iremos',
    options: ['iremos', 'vamos', 'íbamos', 'irán'],
    fullSentence: 'Mañana nosotros iremos al mercado central a comprar fruta fresca.',
    translation_en: 'Tomorrow we will go to the central market to buy fresh fruit.',
    translation_ar: 'غداً سنذهب نحن إلى السوق المركزي لشراء الفواكه الطازجة.',
    formativeExplanation_en: 'The simple future for "nosotros" with the verb "ir" adds the regular ending "-emos" directly to the full infinitive stem: ir + emos = iremos.',
    formativeExplanation_ar: 'المستقبل البسيط للضمير nosotros مع الفعل ir يضيف اللاحقة القياسية -emos مباشرة إلى المصدر: ir + emos = iremos.'
  },
  {
    id: 's-fill-3',
    situation: 'Recuerdas anécdotas de tu niñez mientras miras fotos familiares:',
    situation_ar: 'تتذكر مواقف من طفولتك أثناء مشاهدة الصور العائلية:',
    sentenceWithBlank: 'Cuando yo ____ (tener / imperfecto) diez años, vivía en Valencia.',
    verbInfinitive: 'tener',
    tenseLabel: 'Pretérito Imperfecto (Edad / Marco temporal)',
    subjectLabel: 'Yo',
    correctAnswer: 'tenía',
    options: ['tenía', 'tuve', 'tengo', 'tendré'],
    fullSentence: 'Cuando yo tenía diez años, vivía en Valencia.',
    translation_en: 'When I was ten years old, I lived in Valencia.',
    translation_ar: 'عندما كان عمري عشر سنوات، كنت أعيش في فالنسيا.',
    formativeExplanation_en: 'Background states such as age, descriptions, and ongoing circumstances in the past always trigger the Imperfect ("tenía"), not the Preterite.',
    formativeExplanation_ar: 'الحالات الوصفية في الماضي مثل العمر والوصف المستمر تستخدم دائماً الماضي المستمر Imperfecto (tenía) وليس الماضي البسيط.'
  },
  {
    id: 's-fill-4',
    situation: 'Tu amigo tiene fiebre y le recomiendas cuidarse:',
    situation_ar: 'صديقك مصاب بالحمى وأنت تنصحه بالاعتناء بنفسه:',
    sentenceWithBlank: 'Espero que tú ____ (estar / subjuntivo presente) mejor mañana.',
    verbInfinitive: 'estar',
    tenseLabel: 'Presente de Subjuntivo (Deseo / Ojalá)',
    subjectLabel: 'Tú',
    correctAnswer: 'estés',
    options: ['estés', 'estás', 'estuvieras', 'este'],
    fullSentence: 'Espero que tú estés mejor mañana.',
    translation_en: 'I hope that you are better tomorrow.',
    translation_ar: 'أتمنى أن تكون بحال أفضل غداً.',
    formativeExplanation_en: 'Verbs of wishing and hoping (esperar que...) express a subjective desire directed at someone else, requiring the Subjunctive ("estés").',
    formativeExplanation_ar: 'أفعال التمني والرغبة (esperar que) تعبر عن رغبة شخصية تجاه شخص آخر، مما يقتضي استخدام صيغة المنصوب (estés).'
  },
  {
    id: 's-fill-5',
    situation: 'Explicas a tu jefe lo que hiciste ayer antes del cierre:',
    situation_ar: 'تشرح لمديرك ما قمت به أمس قبل موعد الإغلاق:',
    sentenceWithBlank: 'Ayer yo ____ (hacer / pretérito indefinido) todas las copias de seguridad.',
    verbInfinitive: 'hacer',
    tenseLabel: 'Pretérito Indefinido (Acción puntual)',
    subjectLabel: 'Yo',
    correctAnswer: 'hice',
    options: ['hice', 'hacía', 'hago', 'haré'],
    fullSentence: 'Ayer yo hice todas las copias de seguridad.',
    translation_en: 'Yesterday I made all the backup copies.',
    translation_ar: 'أمس قمت بعمل جميع النسخ الاحتياطية.',
    formativeExplanation_en: '"Hacer" has an irregular preterite root ("hic-"). For "yo", the form is "hice" with an unstressed final -e.',
    formativeExplanation_ar: 'الفعل hacer له جذر شاذ في الماضي البسيط (hic-). ومع الضمير yo يكون التصريف hice بدون نبر على الحرف الأخير.'
  },
  {
    id: 's-fill-6',
    situation: 'En una entrevista de trabajo te preguntan por tus habilidades:',
    situation_ar: 'في مقابلة عمل يسألونك عن مهاراتك:',
    sentenceWithBlank: 'Yo ____ (saber / presente) programar en TypeScript y hablar tres idiomas.',
    verbInfinitive: 'saber',
    tenseLabel: 'Presente (Habilidad / Saber + Inf)',
    subjectLabel: 'Yo',
    correctAnswer: 'sé',
    options: ['sé', 'sabo', 'supo', 'sabré'],
    fullSentence: 'Yo sé programar en TypeScript y hablar tres idiomas.',
    translation_en: 'I know how to code in TypeScript and speak three languages.',
    translation_ar: 'أنا أعرف كيف أبرمج بلغة TypeScript وأتحدث ثلاث لغات.',
    formativeExplanation_en: 'The 1st person singular "yo" of "saber" in the present is the irregular accent-marked monosyllable "sé". "Saber + infinitive" indicates knowing how to do a skill.',
    formativeExplanation_ar: 'تصريف الضمير yo مع الفعل saber في المضارع هو الكلمة الشاذة المعلمة بالنبرة "sé". واستخدام saber + مصدر يعني معرفة كيفية أداء مهارة.'
  }
];

/**
 * High-yield Communicative Tense & Pair Contrast Drills (Mode B)
 */
export const TENSE_CONTRAST_DRILLS: TenseContrastDrill[] = [
  {
    id: 'contrast-pret-imp',
    title: 'Pretérito Indefinido vs Pretérito Imperfecto',
    title_ar: 'الماضي البسيط (المكتمل) مقابل الماضي المستمر (الوصف والحالة)',
    category: 'preterite_vs_imperfect',
    conceptExplanation_en: 'The Preterite (Indefinido) views actions as completed events on a timeline. The Imperfect views actions as ongoing backgrounds, habitual routines, or continuous states without focusing on their end.',
    conceptExplanation_ar: 'يعبر Pretérito Indefinido عن أحداث محددة انتهت واكتملت في نقطة زمنية. بينما يعبر Imperfecto عن خلفية الأحداث، العادات السابقة، الوصف والعمر دون تحديد نهاية الحدث.',
    pairA: {
      label: 'Pretérito Indefinido (Evento puntual)',
      sentence_es: 'Ayer conocí a la nueva vecina en el ascensor.',
      sentence_en: 'Yesterday I met the new neighbor in the elevator (First time meeting = event).',
      sentence_ar: 'أمس تعرفت على الجارة الجديدة في المصعد (اللقاء الأول للمرة الأولى = حدث مكتمل).',
      aspectNote: 'Conocí = "I met for the first time"',
      keyForm: 'conocí'
    },
    pairB: {
      label: 'Pretérito Imperfecto (Estado continuo)',
      sentence_es: 'Yo ya conocía a la vecina desde hacía muchos años.',
      sentence_en: 'I already knew the neighbor for many years (Ongoing state of familiarity).',
      sentence_ar: 'كنت أعرف الجارة بالفعل منذ سنوات عديدة (حالة معرفة ممتدة ومستمرة).',
      aspectNote: 'Conocía = "I already knew / was acquainted with"',
      keyForm: 'conocía'
    },
    challenge: {
      prompt: '¿Qué oración describe una acción que interrumpió una actividad continua en el pasado?',
      prompt_ar: 'أي جملة تصف حدثاً طارئاً قطع نشاطاً كان مستمراً في الماضي؟',
      options: [
        {
          text: '"Yo leía tranquilamente cuando de repente sonó el timbre."',
          isCorrect: true,
          explanation: '"Leía" (Imperfect) sets the ongoing background; "sonó" (Preterite) is the sudden interrupting event.',
          explanation_ar: '"Leía" (ماضي مستمر) تمثل الخلفية المستمرة؛ بينما "sonó" (ماضي بسيط) هو الحدث المفاجئ القاطع.'
        },
        {
          text: '"Yo leí tranquilamente y sonaba el timbre."',
          isCorrect: false,
          explanation: 'This reverses the aspectual logic of background vs interruption in Spanish.',
          explanation_ar: 'هذا الترتيب يعكس المنطق اللغوي؛ فالحدث المستمر يأخذ Imperfecto والحدث القاطع يأخذ Indefinido.'
        }
      ]
    }
  },
  {
    id: 'contrast-por-para',
    title: 'Por vs Para: Cause vs Destination',
    title_ar: 'Por مقابل Para: السبب والدافع مقابل الهدف والغاية المستهدفة',
    category: 'por_vs_para',
    conceptExplanation_en: 'POR points backwards: looking at the motive, cause, duration, exchange, or agent. PARA points forward: looking at the target, destination, recipient, deadline, or future purpose.',
    conceptExplanation_ar: 'POR تنظر للوراء: تعبر عن السبب، الدافع، المدة، والبدل والوسيلة. بينما PARA تنظر للأمام: تعبر عن الهدف، الوجهة، المستلم، والغاية المستقبلية.',
    pairA: {
      label: 'POR (Causa / Motivo hacia atrás)',
      sentence_es: 'No pudimos viajar por la fuerte tormenta de nieve.',
      sentence_en: 'We couldn\'t travel because of the heavy snowstorm (Cause / Reason).',
      sentence_ar: 'لم نتمكن من السفر بسبب العاصفة الثلجية الشديدة (السبب والعلة).',
      aspectNote: 'Por = "because of / due to"',
      keyForm: 'por'
    },
    pairB: {
      label: 'PARA (Objetivo / Meta hacia adelante)',
      sentence_es: 'Estudio tres horas diarias para aprobar el examen DELE.',
      sentence_en: 'I study three hours daily in order to pass the DELE exam (Future goal).',
      sentence_ar: 'أدرس ثلاث ساعات يومياً من أجل اجتياز امتحان DELE (الهدف والغاية المستقبلية).',
      aspectNote: 'Para = "in order to / for the purpose of"',
      keyForm: 'para'
    },
    challenge: {
      prompt: '¿Cuál es la forma correcta para expresar gratitud por un favor recibido?',
      prompt_ar: 'ما هو التركيب الصحيح للتعبير عن الشكر على مساعدة أو معروف تم تلقيه؟',
      options: [
        {
          text: '"Muchísimas gracias por tu generosa ayuda."',
          isCorrect: true,
          explanation: 'Gratitude is given in return for a past reason/action, which always demands POR.',
          explanation_ar: 'الشكر يُقدم كرد فعل على سبب أو عمل سابق، ولذلك يتطلب دائماً حرف الجر POR.'
        },
        {
          text: '"Muchísimas gracias para tu generosa ayuda."',
          isCorrect: false,
          explanation: 'PARA would incorrectly imply the help is a future recipient rather than the cause.',
          explanation_ar: 'استخدام PARA هنا خطأ فادح لأنه يعني أن المساعدة هي المستلم المستقبلي وليس سبب الشكر.'
        }
      ]
    }
  },
  {
    id: 'contrast-ser-estar',
    title: 'Ser vs Estar: Essence vs State',
    title_ar: 'Ser مقابل Estar: الهوية والجوهر مقابل الحالة والموقع المؤقت',
    category: 'ser_vs_estar',
    conceptExplanation_en: 'SER identifies what something is: identity, nationality, profession, permanent characteristics, and material. ESTAR locates where something is, describes temporary emotional or physical conditions, or ongoing actions (estar + gerund).',
    conceptExplanation_ar: 'SER يحدد هوية الشيء وجوهره الدائم (الجنسية، المهنة، المادة، الصفات الجوهرية). بينما ESTAR يحدد الموقع الجغرافي، الحالات المؤقتة (المزاج، الصحة)، والأفعال المستمرة.',
    pairA: {
      label: 'SER (Identidad y rasgo inherente)',
      sentence_es: 'Mateo es profesor y es una persona muy divertida.',
      sentence_en: 'Mateo is a teacher and is a very fun person (Profession & Inherent personality).',
      sentence_ar: 'ماتيو أستاذ وهو شخص مرح جداً (مهنة وصفة شخصية متأصلة).',
      aspectNote: 'Es = Inherent quality & identity',
      keyForm: 'es'
    },
    pairB: {
      label: 'ESTAR (Estado temporal y ubicación)',
      sentence_es: 'Mateo está en la universidad y hoy está muy cansado.',
      sentence_en: 'Mateo is at the university and today he is very tired (Location & Temporary physical state).',
      sentence_ar: 'ماتيو موجود في الجامعة واليوم هو متعب جداً (موقع وحالة بدنية مؤقتة).',
      aspectNote: 'Está = Location & Temporary condition',
      keyForm: 'está'
    },
    challenge: {
      prompt: 'Si dices "La sopa está fría", ¿qué estás comunicando?',
      prompt_ar: 'إذا قلت "La sopa está fría"، فما الذي تنقله للمستمع؟',
      options: [
        {
          text: 'Que la sopa debería estar caliente pero se ha enfriado ahora (estado temporal).',
          isCorrect: true,
          explanation: 'ESTAR describes the current condition of the food, not its intrinsic culinary nature.',
          explanation_ar: 'ESTAR تصف حالة الحساء الحالية (أنه برد الآن) وليست صفة جوهرية دائمة له.'
        },
        {
          text: 'Que es una receta que siempre se sirve fría por naturaleza (como el gazpacho).',
          isCorrect: false,
          explanation: 'For intrinsic nature, Spanish uses SER: "El gazpacho es una sopa fría".',
          explanation_ar: 'للصفة الجوهرية للطبق نستخدم SER مثل: El gazpacho es una sopa fría.'
        }
      ]
    }
  },
  {
    id: 'contrast-saber-conocer',
    title: 'Saber vs Conocer: Information & Skills vs Acquaintance',
    title_ar: 'Saber مقابل Conocer: الحقائق والمهارات مقابل المعرفة الشخصية بالأشخاص والأماكن',
    category: 'saber_vs_conocer',
    conceptExplanation_en: 'SABER is used for facts, pieces of information, and learned abilities/skills (saber + inf). CONOCER is used for acquaintance with people, places, cities, and cultural works (conocer a alguien / conocer una ciudad).',
    conceptExplanation_ar: 'SABER يُستخدم للمعلومات، الحقائق، والمهارات المكتسبة (saber + مصدر). بينما CONOCER يُستخدم للمعرفة الشخصية بالبشر، المدن، والأماكن (conocer a + شخص، أو معرفة مدينة وزيارتها).',
    pairA: {
      label: 'SABER (Habilidad y datos objetivos)',
      sentence_es: 'Yo sé dónde está la embajada y sé hablar español.',
      sentence_en: 'I know where the embassy is (fact) and I know how to speak Spanish (skill).',
      sentence_ar: 'أعلم أين تقع السفارة (معلومة) وأعرف كيف أتحدث الإسبانية (مهارة).',
      aspectNote: 'Sé = Fact & Learned skill',
      keyForm: 'sé'
    },
    pairB: {
      label: 'CONOCER (Familiaridad con personas y lugares)',
      sentence_es: 'Conozco Madrid muy bien y conozco a la directora.',
      sentence_en: 'I know Madrid very well (visited place) and I know the director (acquaintance).',
      sentence_ar: 'أعرف مدريد جيداً (زرتها وخبرتها) وأعرف المديرة شخصياً (معرفة إنسانية).',
      aspectNote: 'Conozco = Acquaintance & Familiarity',
      keyForm: 'conozco'
    },
    challenge: {
      prompt: '¿Cómo dices en español "I know your brother personally"?',
      prompt_ar: 'كيف تقول بالإسبانية "أنا أعرف أخاك شخصياً"؟',
      options: [
        {
          text: '"Conozco a tu hermano."',
          isCorrect: true,
          explanation: 'CONOCER with the personal preposition "a" is required for familiarity with people.',
          explanation_ar: 'الفعل Conocer مع حرف الجر الشخصي "a" هو الواجب استخدامه لمعرفة الأشخاص.'
        },
        {
          text: '"Sé a tu hermano."',
          isCorrect: false,
          explanation: '"Saber" cannot take human direct objects in Spanish.',
          explanation_ar: 'لا يمكن أبداً استخدام الفعل Saber مع الأشخاص كمعرفة شخصية في الإسبانية.'
        }
      ]
    }
  }
];
