import { Unit } from '../../types';

export const A2_UNITS_PART2: Unit[] = [
  // UNIT 19: Pronombres de Objeto Directo e Indirecto
  {
    id: 'unit-a2-19',
    level: 'A2',
    unitNumber: 19,
    title_es: 'Pronombres de Objeto: Directo e Indirecto',
    title_en: 'Direct & Indirect Object Pronouns',
    title_ar: 'ضمائر المفعول به المباشر وغير المباشر',
    description_en: 'Master replacing nouns with pronouns (lo, la, los, las, le, les), placing pronouns with infinitives and gerunds, and the "se lo" transformation.',
    description_ar: 'إتقان استبدال الأسماء بضمائر المفعول المباشر وغير المباشر، ومواقع الضمائر مع المصدر، وتحول le lo إلى se lo.',
    lessons: [
      {
        id: 'lesson-a2-19-1',
        unitId: 'unit-a2-19',
        lessonNumber: 1,
        title_es: 'Pronombres de Objeto Directo (OD: lo, la, los, las)',
        title_en: 'Direct Object Pronouns (lo, la, los, las)',
        title_ar: 'ضمائر المفعول به المباشر (lo, la, los, las)',
        cefr: 'A2',
        objectives_en: ['Identify the direct object by asking "¿Qué?" or "¿A quién?"', 'Substitute masculine/feminine singular/plural nouns (el libro -> lo, la carta -> la)', 'Place pronouns before conjugated verbs'],
        objectives_ar: ['تحديد المفعول به المباشر', 'استبدال الأسماء المذكرة والمؤنثة بضمائرها المناسبة', 'وضع الضمير قبل الفعل المصرف'],
        vocabWordIds: ['w-libro', 'w-carta', 'w-comprar', 'w-leer', 'w-ver'],
        grammarTopicId: 'g-direct-indirect-pronouns',
        dialogue: [
          { speaker: 'Sara', es: '¿Has comprado las entradas para el concierto?', en: 'Have you bought the concert tickets?', ar: 'هل اشتريت تذاكر الحفل الموسيقي؟' },
          { speaker: 'Mateo', es: 'Sí, las compré esta mañana por internet. Ya las tengo en mi móvil.', en: 'Yes, I bought them this morning online. I already have them on my phone.', ar: 'نعم، اشتريتها هذا الصباح عبر الإنترنت. أصبحت معي على هاتفي.' }
        ],
        exercises: [
          {
            id: 'ex-a2-19-1-1',
            type: 'multiple_choice',
            prompt_es: 'Reemplaza el objeto: "Leo el periódico todos los días" -> "______ leo todos los días."',
            prompt_en: 'Choose the correct direct object pronoun for "el periódico":',
            prompt_ar: 'اختر ضمير المفعول به المباشر المناسب لـ el periódico:',
            options: ['Lo', 'La', 'Le', 'Los'],
            correctAnswer: 'Lo',
            explanation_en: '"El periódico" is masculine singular, so the direct pronoun is "Lo".',
            explanation_ar: '"El periódico" مذكر مفرد، لذا ضمير المفعول المباشر هو "Lo".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences replacing direct objects with lo, la, los, and las in response to questions.',
          prompt_ar: 'اكتب 3 جمل تستبدل فيها المفعول به المباشر بضمائر lo و la و los و las.',
          minSentences: 3,
          sampleTarget: '— ¿Dónde compraste esa chaqueta azul? — La compré en el centro comercial. — ¿Y los zapatos? — Los compré ayer por la tarde.'
        }
      },
      {
        id: 'lesson-a2-19-2',
        unitId: 'unit-a2-19',
        lessonNumber: 2,
        title_es: 'Pronombres de Objeto Indirecto (OI: me, te, le, nos, os, les)',
        title_en: 'Indirect Object Pronouns (me, te, le, nos, les)',
        title_ar: 'ضمائر المفعول به غير المباشر (me, te, le, nos, les)',
        cefr: 'A2',
        objectives_en: ['Identify recipient of actions (asking "¿A quién?")', 'Use LE and LES for 3rd person recipients', 'Understand pronoun redundancy in Spanish (Le di el libro a Juan)'],
        objectives_ar: ['تحديد المتلقي والمستفيد من الفعل', 'استخدام le و les للمفرد والجمع الغائب', 'فهم ظاهرة تكرار الضمير لتأكيد المتلقي في الإسبانية'],
        vocabWordIds: ['w-dar', 'w-regalar', 'w-decir', 'w-explicar', 'w-enviar'],
        dialogue: [
          { speaker: 'Daniel', es: '¿Qué le regalaste a tu madre por su cumpleaños?', en: 'What did you give your mother for her birthday?', ar: 'ماذا أهديت والدتك في عيد ميلادها؟' },
          { speaker: 'Lucía', es: 'Le regalé un perfume floral y le escribí una tarjeta muy bonita.', en: 'I gave her a floral perfume and wrote her a very nice card.', ar: 'أهديتها عطراً زهرياً وكتبت لها بطاقة تهنئة لطيفة للغاية.' }
        ],
        exercises: [
          {
            id: 'ex-a2-19-2-1',
            type: 'fill_blank',
            prompt_es: 'Yo ______ (to them) envié un correo electrónico a mis profesores.',
            prompt_en: 'Choose the indirect object pronoun for plural recipients (a mis profesores):',
            prompt_ar: 'اختر ضمير المفعول به غير المباشر للمتلقين الجمع (a mis profesores):',
            options: ['les', 'le', 'los', 'las'],
            correctAnswer: 'les',
            explanation_en: 'Plural recipient ("a mis profesores") takes "les".',
            explanation_ar: 'المتلقي الجمع (a mis profesores) يأخذ ضمير "les".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences telling what you gave or sent to your friends or family using "le" and "les".',
          prompt_ar: 'اكتب 3 جمل تخبر فيها عما أعطيته أو أرسلته لأصدقائك أو عائلتك باستخدام le و les.',
          minSentences: 3,
          sampleTarget: 'Le preparé una cena especial a mi hermano el sábado. Les envié postales de viaje a mis abuelos. También le regalé flores a mi madre.'
        }
      },
      {
        id: 'lesson-a2-19-3',
        unitId: 'unit-a2-19',
        lessonNumber: 3,
        title_es: 'Combinación Doble y la Regla "SE LO"',
        title_en: 'Double Object Pronouns & The "SE LO" Rule',
        title_ar: 'دمج الضميرين وقاعدة تحول Se Lo',
        cefr: 'A2',
        objectives_en: ['Order pronouns: Indirect First, Direct Second (OI + OD + Verbo)', 'Transform "le lo / les lo" into "se lo" to avoid phonetic cacophony', 'Place double pronouns attached to infinitives and gerunds (dárselo, explicándotelo)'],
        objectives_ar: ['ترتيب الضمائر: غير المباشر أولاً ثم المباشر ثانياً', 'تحويل le lo / les lo إلى se lo لتسهيل النطق وتجنب ثقل اللفظ', 'وصل الضمائر بنهاية المصدر واسم الفاعل'],
        vocabWordIds: ['w-se-lo', 'w-prestar', 'w-entregar', 'w-pedir', 'w-traer'],
        dialogue: [
          { speaker: 'Carlos', es: '¿Le entregaste el informe al director?', en: 'Did you deliver the report to the director?', ar: 'هل سلمت التقرير إلى المدير؟' },
          { speaker: 'Ana', es: 'Sí, se lo entregué a primera hora de la mañana.', en: 'Yes, I delivered it to him first thing in the morning.', ar: 'نعم، سلمته له في الصباح الباكر.' }
        ],
        exercises: [
          {
            id: 'ex-a2-19-3-1',
            type: 'multiple_choice',
            prompt_es: '"¿Le compraste el regalo a María?" -> "Sí, ______ compré ayer."',
            prompt_en: 'Combine indirect (María = le->se) + direct (el regalo = lo):',
            prompt_ar: 'اجمع بين الضمير غير المباشر (se) والمباشر (lo):',
            options: ['se lo', 'le lo', 'lo le', 'se la'],
            correctAnswer: 'se lo',
            explanation_en: '"Le lo" transforms to "se lo".',
            explanation_ar: '"Le lo" تتحول بالضرورة إلى "se lo".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences using the double pronoun construction "se lo / se la / se los / se las".',
          prompt_ar: 'اكتب 3 جمل مستخدماً التركيب المزدوج للضمائر se lo / se la / se los / se las.',
          minSentences: 3,
          sampleTarget: 'Mi amigo me pidió mi bicicleta y se la presté con gusto. El profesor nos pidió los ejercicios y se los enviamos por correo. Mi madre quería la receta y se la expliqué paso a paso.'
        }
      },
      {
        id: 'lesson-a2-19-4',
        unitId: 'unit-a2-19',
        lessonNumber: 4,
        title_es: 'Pronombres con Infinitivo, Gerundio e Imperativo',
        title_en: 'Pronouns with Infinitive, Gerund & Imperative',
        title_ar: 'مواقع الضمائر مع المصدر واسم الفاعل وفعل الأمر',
        cefr: 'A2',
        objectives_en: ['Choose between pre-verbal placement (Te lo quiero decir) and post-verbal enclitic attachment (Quiero decírtelo)', 'Add written accent marks on attached gerunds and imperatives (haciéndolo, dámelo)', 'Speak fluently with pronoun attachments'],
        objectives_ar: ['الاختيار بين وضع الضمير قبل الفعل أو وصله بآخره', 'إضافة النبرات الصوتية المكتوبة عند الوصل للحفاظ على النبر الصحيح', 'التحدث بطلاقة مع وصل الضمائر'],
        vocabWordIds: ['w-decirtelo', 'w-haciendolo', 'w-damelo', 'w-explicar', 'w-posicion'],
        dialogue: [
          { speaker: 'Jefe', es: '¿Puedes enviarme el documento por favor?', en: 'Can you send me the document please?', ar: 'هل يمكنك أن ترسل لي الوثيقة من فضلك؟' },
          { speaker: 'Empleado', es: 'Puedo enviárselo ahora mismo o se lo puedo llevar en mano.', en: 'I can send it to you right now or I can take it to you by hand.', ar: 'يمكنني إرسالها لحضرتك حالاً أو أستطيع جلبها لك يداً بيد.' }
        ],
        exercises: [
          {
            id: 'ex-a2-19-4-1',
            type: 'multiple_choice',
            prompt_es: 'Ambas opciones son correctas en español: "Te lo voy a decir" y...',
            prompt_en: 'Which attached form is equally correct?',
            prompt_ar: 'أي صيغة متصلة صحيحة تماماً ومكافئة لـ Te lo voy a decir؟',
            options: ['Voy a decírtelo', 'Voy a te lo decir', 'Voy te a decirlo', 'Voy a decir te lo'],
            correctAnswer: 'Voy a decírtelo',
            explanation_en: 'Pronouns can attach directly to the infinitive: "decírtelo".',
            explanation_ar: 'يمكن وصل الضمائر مباشرة بنهاية المصدر: "decírtelo".'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 sentences demonstrating both pre-verbal and attached pronoun placements with modal verbs.',
          prompt_ar: 'اكتب 3 جمل تظهر فيها موقع الضمائر المنفصلة والمتصلة مع الأفعال المساعدة والمصادر.',
          minSentences: 3,
          sampleTarget: 'Tengo que comprar un regalo y voy a comprárselo mañana. Si necesitas ayuda con el proyecto, puedo explicártelo esta tarde. El informe es urgente y se lo tengo que entregar al jefe hoy.'
        }
      }
    ]
  },

  // UNIT 20: El Cuerpo, la Salud y Consejos con Imperativo
  {
    id: 'unit-a2-20',
    level: 'A2',
    unitNumber: 20,
    title_es: 'Salud y Consejos: El Imperativo Afirmativo',
    title_en: 'Health & Advice: Affirmative Imperative',
    title_ar: 'الصحة والنصائح: صيغة الأمر المثبت',
    description_en: 'Master giving direct advice, instructions, remedies, and the 8 essential irregular imperatives (ven, di, sal, haz, ten, ve, pon, sé).',
    description_ar: 'إتقان إعطاء النصائح المباشرة، التعليمات، الوصفات العلاجية، وأفعال الأمر الشاذة الثمانية الأساسية (ven, di, sal, haz, ten, ve, pon, sé).',
    lessons: [
      {
        id: 'lesson-a2-20-1',
        unitId: 'unit-a2-20',
        lessonNumber: 1,
        title_es: 'Imperativo Afirmativo Regular para TÚ y USTED',
        title_en: 'Regular Affirmative Imperative (Tú & Usted)',
        title_ar: 'الأمر المثبت المنتظم للضميرين Tú و Usted',
        cefr: 'A2',
        objectives_en: ['Form tú imperative (drop -s from present 3rd person: habla, come, escribe)', 'Form usted imperative (opposite vowel: hable, coma, escriba)', 'Give clear instructions in everyday life'],
        objectives_ar: ['صياغة أمر المخاطب tú بحذف حرف s', 'صياغة أمر صيغة الاحترام usted بتبديل الحرف الصوتي', 'إعطاء تعليمات واضحة في المواقف الحياتية'],
        vocabWordIds: ['w-habla', 'w-come', 'w-escribe', 'w-hable', 'w-tome'],
        grammarTopicId: 'g-imperative-mood',
        dialogue: [
          { speaker: 'Doctor', es: 'Descanse mucho, tome este jarabe tres veces al día y beba abundante agua.', en: 'Rest a lot, take this syrup three times a day, and drink plenty of water.', ar: 'استرح كثيراً، وتناول هذا الشراب 3 مرات يومياً واشرب كمية وفيرة من الماء.' }
        ],
        exercises: [
          {
            id: 'ex-a2-20-1-1',
            type: 'multiple_choice',
            prompt_es: 'El imperativo informal (tú) del verbo "comer" es:',
            prompt_en: 'The informal (tú) affirmative command of "comer" is:',
            prompt_ar: 'صيغة الأمر غير الرسمي (tú) لفعل comer هي:',
            options: ['Come', 'Comas', 'Coma', 'Comes'],
            correctAnswer: 'Come',
            explanation_en: 'For regular verbs, the affirmative tú command matches the 3rd person singular present: come.',
            explanation_ar: 'أمر tú المثبت يطابق صيغة المفرد الغائب في المضارع: come.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 healthy commands to a friend using regular affirmative imperatives (tú).',
          prompt_ar: 'اكتب 3 نصائح بصيغة الأمر لصديق باستخدام أفعال الأمر المنتظمة (tú).',
          minSentences: 3,
          sampleTarget: 'Camina treinta minutos cada día al aire libre. Come más frutas frescas y verduras. Bebe mucha agua para mantenerte hidratado.'
        }
      },
      {
        id: 'lesson-a2-20-2',
        unitId: 'unit-a2-20',
        lessonNumber: 2,
        title_es: 'Los 8 Imperativos Irregulares Clave (TÚ)',
        title_en: 'The 8 Essential Irregular Imperatives (Tú)',
        title_ar: 'أفعال الأمر الشاذة الثمانية الأساسية (Tú)',
        cefr: 'A2',
        objectives_en: ['Memorize the 8 irregular tú commands: Ven (venir), Di (decir), Sal (salir), Haz (hacer), Ten (tener), Ve (ir), Pon (poner), Sé (ser)', 'Use catchy mnemonic triggers', 'Apply in urgent everyday dialogues'],
        objectives_ar: ['حفظ أفعال الأمر الشاذة الثمانية', 'استخدامها بتلقائية وسرعة بديهة', 'تطبيقها في المواقف والحوارات السريعة'],
        vocabWordIds: ['w-ven', 'w-di', 'w-sal', 'w-haz', 'w-ten'],
        dialogue: [
          { speaker: 'Madre', es: '¡Haz la cama, pon la mesa y ten cuidado al cruzar la calle!', en: 'Make the bed, set the table, and be careful crossing the street!', ar: 'رتب السرير، وجهز المائدة، وكن حذراً عند عبور الشارع!' },
          { speaker: 'Hijo', es: '¡Ya voy mamá, no te preocupes!', en: 'I’m on my way mom, don’t worry!', ar: 'أنا قادم يا أمي، لا تقلقي!' }
        ],
        exercises: [
          {
            id: 'ex-a2-20-2-1',
            type: 'multiple_choice',
            prompt_es: 'El imperativo informal (tú) de "hacer" y "poner" es:',
            prompt_en: 'The informal command forms for HACER and PONER are:',
            prompt_ar: 'صيغة الأمر لـ hacer و poner مع tú هي:',
            options: ['Haz / Pon', 'Haga / Ponga', 'Haces / Pones', 'Haced / Poned'],
            correctAnswer: 'Haz / Pon',
            explanation_en: 'Hacer -> Haz, Poner -> Pon.',
            explanation_ar: 'أمر hacer هو Haz، وأمر poner هو Pon.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 dynamic commands to a friend using at least three irregular imperatives (Haz, Ven, Pon, Ten, Sé).',
          prompt_ar: 'اكتب 3 أوامر لصديق مستخدماً 3 أفعال أمر شاذة على الأقل.',
          minSentences: 3,
          sampleTarget: 'Ven a mi casa después de clase. Haz tus deberes con calma y sé paciente con los resultados. Pon tu chaqueta en el perchero al entrar.'
        }
      },
      {
        id: 'lesson-a2-20-3',
        unitId: 'unit-a2-20',
        lessonNumber: 3,
        title_es: 'Imperativo con Pronombres Unidos (Enclíticos)',
        title_en: 'Imperatives with Attached Pronouns (Enclitics)',
        title_ar: 'أفعال الأمر المتصلة بضمائر المفعول والانعكاس',
        cefr: 'A2',
        objectives_en: ['Attach pronouns to the end of affirmative commands (Dime, Hazlo, Siéntate, Explícaselo)', 'Calculate written accent placement on stressed syllables', 'Use reflexive commands naturally (Levántate, Dúchate)'],
        objectives_ar: ['وصل الضمائر بآخر فعل الأمر المثبت دائماً', 'تحديد مكان النبرة الصوتية المكتوبة بدقة', 'استخدام أوامر الأفعال الانعكاسية (Levántate, Siéntate)'],
        vocabWordIds: ['w-dime', 'w-hazlo', 'w-sientate', 'w-levantate', 'w-ponte'],
        dialogue: [
          { speaker: 'Profesor', es: 'Por favor, siéntate en tu pupitre y escúchame con atención.', en: 'Please sit at your desk and listen to me carefully.', ar: 'من فضلك اجلس في مقعدك واستمع إليّ باهتمام.' }
        ],
        exercises: [
          {
            id: 'ex-a2-20-3-1',
            type: 'multiple_choice',
            prompt_es: 'Al añadir pronombres al imperativo afirmativo, los pronombres van:',
            prompt_en: 'With affirmative imperatives, pronouns MUST be placed:',
            prompt_ar: 'مع فعل الأمر المثبت، يجب وضع الضمائر دائماً:',
            options: ['Unidos al final del verbo (Dámelo / Siéntate)', 'Delante del verbo separados', 'En medio del verbo', 'Al principio de la frase siempre'],
            correctAnswer: 'Unidos al final del verbo (Dámelo / Siéntate)',
            explanation_en: 'Affirmative commands strictly attach pronouns to the end as a single word.',
            explanation_ar: 'أفعال الأمر المثبتة تتصل بها الضمائر في النهاية ككلمة واحدة مركبة.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write 3 polite instructions connecting pronouns to imperatives (e.g. escúchame, explícamelo, siéntate).',
          prompt_ar: 'اكتب 3 تعليمات لبقة توصل فيها الضمائر بفعل الأمر.',
          minSentences: 3,
          sampleTarget: 'Ponte cómodo en el sofá y descansa. Cuéntame todos los detalles de tu nuevo proyecto. Si tienes alguna duda, pregúntamela con total confianza.'
        }
      },
      {
        id: 'lesson-a2-20-4',
        unitId: 'unit-a2-20',
        lessonNumber: 4,
        title_es: 'Recetas de Cocina y Guías de Instrucciones',
        title_en: 'Cooking Recipes & How-to Guides',
        title_ar: 'وصفات الطهي ودليل الإرشادات العملية',
        cefr: 'A2',
        objectives_en: ['Write step-by-step culinary recipes (corta, añade, mezcla, calienta, sirve)', 'Understand instructional packaging manuals', 'Explain how to prepare a traditional Hispanic dish'],
        objectives_ar: ['كتابة وصفات الطهي خطوة بخطوة', 'فهم كتيبات الإرشادات والاستعمال', 'شرح كيفية إعداد طبق تقليدي شهير'],
        vocabWordIds: ['w-cortar', 'w-anadir', 'w-mezclar', 'w-calentar', 'w-servir'],
        dialogue: [
          { speaker: 'Chef', es: 'Para la tortilla española: corta las patatas en rodajas finas, fríelas en aceite de oliva, bate los huevos en un bol, mezcla todo y cocínalo a fuego medio.', en: 'For Spanish omelette: slice the potatoes thin, fry in olive oil, beat eggs, mix and cook over medium heat.', ar: 'لإعداد التورتيلا الإسبانية: قطّع البطاطس شرائح رقيقة، واقلِها بزيت الزيتون، واخفق البيض، واخلط الكل واطهُه على نار متوسطة.' }
        ],
        exercises: [
          {
            id: 'ex-a2-20-4-1',
            type: 'multiple_choice',
            prompt_es: '"Bate los huevos" significa en una receta:',
            prompt_en: '"Bate los huevos" means in a recipe:',
            prompt_ar: '"Bate los huevos" تعني في وصفة الطهي:',
            options: ['Beat/whisk the eggs', 'Boil the eggs', 'Freeze the eggs', 'Throw the eggs away'],
            correctAnswer: 'Beat/whisk the eggs',
            explanation_en: '"Batir" means to beat or whisk.',
            explanation_ar: '"Batir" تعني خفق المكونات.'
          }
        ],
        productionPrompt: {
          prompt_en: 'Write a 4-step recipe for your favorite dish or hot drink using affirmative imperatives.',
          prompt_ar: 'اكتب وصفة من 4 خطوات لطبقك أو مشروبك المفضل باستخدام أفعال الأمر.',
          minSentences: 4,
          sampleTarget: 'Primero calienta una taza de agua en una olla. Añade una cucharada de café aromático y mezcla bien. Deja hervir durante dos minutos a fuego lento. Finalmente sirve el café bien caliente con un toque de azúcar.'
        }
      }
    ]
  }
];
