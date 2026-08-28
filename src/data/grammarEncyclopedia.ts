import { GrammarTopic } from '../types';

export const GRAMMAR_ENCYCLOPEDIA: GrammarTopic[] = [
  {
    id: 'g-ser-vs-estar',
    title_es: 'Ser vs Estar: La diferencia fundamental',
    title_en: 'Ser vs Estar: Essential Distinction',
    title_ar: 'الفرق الجوهري بين Ser و Estar',
    cefr: 'A1',
    category: 'foundations',
    summary_en: 'Ser defines identity, essence, origin, professions, and time. Estar describes temporary states, emotions, locations, and ongoing actions.',
    summary_ar: 'يُستخدم Ser لتعريف الهوية والأصل والمهن والوقت والصفات الدائمة. بينما يُستخدم Estar للموقع الجغرافي والحالات النفسية والصحية المؤقتة والأفعال المستمرة.',
    formula: 'Ser = D.O.C.T.O.R. (Description, Occupation, Characteristic, Time, Origin, Relationship) | Estar = P.L.A.C.E. (Position, Location, Action, Condition, Emotion)',
    fullContent_en: `### When to use SER:
1. **Description & Identity**: *Soy Carlos.* (I am Carlos.)
2. **Occupation**: *Ella es ingeniera.* (She is an engineer.)
3. **Characteristic (inherent quality)**: *El azúcar es dulce.* (Sugar is sweet.)
4. **Time & Date**: *Son las cuatro de la tarde.* (It is 4:00 PM.)
5. **Origin & Nationality**: *Somos de Colombia.* (We are from Colombia.)
6. **Relationship**: *Ellos son mis primos.* (They are my cousins.)

### When to use ESTAR:
1. **Position & Location**: *El restaurante está en la plaza.* (The restaurant is in the square.)
2. **Condition (temporary physical/mental)**: *Estoy muy cansado hoy.* (I am very tired today.)
3. **Emotion**: *María está contenta.* (Maria is happy.)
4. **Ongoing action (-ndo)**: *Estamos aprendiendo español.* (We are learning Spanish.)`,
    fullContent_ar: `### متى نستخدم فعل SER:
1. **الهوية والتعريف**: *Soy Carlos.* (أنا كارلوس.)
2. **المهنة والوظيفة**: *Ella es ingeniera.* (هي مهندسة.)
3. **الصفات الجوهرية الدائمة**: *El azúcar es dulce.* (السكر حلو.)
4. **الوقت والتاريخ**: *Son las cuatro.* (إنها الساعة الرابعة.)
5. **الأصل والجنسية**: *Somos de Egipto.* (نحن من مصر.)
6. **صلة القرابة والعلاقات**: *Ellos son mis amigos.* (هم أصدقائي.)

### متى نستخدم فعل ESTAR:
1. **الموقع الجغرافي والمكان**: *Madrid está en España.* (مدريد تقع في إسبانيا.)
2. **الحالة الصحية أو النفسية المؤقتة**: *Estoy enfermo / cansado.* (أنا مريض / متعب.)
3. **المشاعر المتغيرة**: *Estoy feliz.* (أنا سعيد الآن.)
4. **الأفعال المستمرة الحالية (Gerundio)**: *Estamos estudiando.* (نحن ندرس الآن.)`,
    examples: [
      { es: 'Juan es aburrido.', en: 'Juan is a boring person (inherent personality).', ar: 'خوان شخص ممل (طبيعته وشخصيته).', note: 'ser + aburrido' },
      { es: 'Juan está aburrido.', en: 'Juan is bored right now (temporary state).', ar: 'خوان يشعر بالملل حالياً (حالة مؤقتة).', note: 'estar + aburrido' },
      { es: 'La manzana es verde.', en: 'The apple is of the green variety.', ar: 'التفاحة خضراء (نوعها أخضر).', note: 'ser + verde' },
      { es: 'La manzana está verde.', en: 'The apple is unripe.', ar: 'التفاحة فجة / غير ناضجة بعد.', note: 'estar + verde' }
    ],
    commonMistakes: [
      {
        incorrect: 'Soy en la biblioteca.',
        correct: 'Estoy en la biblioteca.',
        reason_en: 'Location of people and physical objects always takes estar.',
        reason_ar: 'الموقع الجغرافي للأشخاص والأشياء المادية يتطلب دائماً استخدام فعل Estar.'
      },
      {
        incorrect: 'Madrid es en España.',
        correct: 'Madrid está en España.',
        reason_en: 'Geographical location always takes estar.',
        reason_ar: 'الموقع الجغرافي للمدن والبلدان يتطلب estar.'
      }
    ],
    quickQuiz: [
      {
        question_es: 'Mis padres ______ en el jardín ahora mismo.',
        question_en: 'My parents are in the garden right now.',
        question_ar: 'والداي في الحديقة الآن بالذات.',
        options: ['son', 'están', 'es', 'está'],
        answerIdx: 1,
        explanation_en: 'Location in space requires "están" (third person plural of estar).',
        explanation_ar: 'الموقع الجغرافي للجمع يتطلب استخدام están من فعل estar.'
      },
      {
        question_es: 'Elena ______ médica en el hospital central.',
        question_en: 'Elena is a doctor at the central hospital.',
        question_ar: 'إيلينا طبيبة في المستشفى المركزي.',
        options: ['está', 'es', 'sea', 'esté'],
        answerIdx: 1,
        explanation_en: 'Professions always take "ser" (es).',
        explanation_ar: 'المهن والوظائف تأخذ دائماً فعل ser (es).'
      }
    ]
  },
  {
    id: 'g-por-vs-para',
    title_es: 'Por vs Para: Guía Definitiva',
    title_en: 'Por vs Para: The Definitive Guide',
    title_ar: 'دليل التمييز الشامل بين Por و Para',
    cefr: 'A2',
    category: 'foundations',
    summary_en: 'POR looks backward to causes, motives, duration, exchanges, and means. PARA looks forward to destination, recipients, deadlines, and purposes.',
    summary_ar: 'حرف POR ينظر للخلف (السبب، الدافع، المدة الزمنية، التبادل، الوسيلة). بينما حرف PARA ينظر للأمام (الغاية، المستلم، الموعد النهائي، الوجهة، الهدف).',
    formula: 'POR = Cause / Motive / Through / Duration | PARA = Purpose / Recipient / Destination / Deadline',
    fullContent_en: `### Master Rules for POR:
- **Reason / Cause**: *Gracias por tu ayuda.* (Thanks because of your help.)
- **Duration / Time period**: *Estudié por tres horas.* (I studied for three hours.)
- **Movement through/along**: *Caminamos por el parque.* (We walk through the park.)
- **Exchange / Price**: *Compré este libro por 15 euros.* (I bought this book for 15 euros.)
- **Means of communication/travel**: *Te envié el mensaje por correo.* (I sent it by email.)

### Master Rules for PARA:
- **Purpose (In order to + infinitive)**: *Estudio español para conseguir un buen trabajo.* (I study in order to get a good job.)
- **Recipient**: *Este regalo es para ti.* (This gift is for you.)
- **Destination**: *El tren sale para Barcelona.* (The train is leaving for Barcelona.)
- **Deadline**: *La tarea es para el viernes.* (The homework is due by Friday.)
- **Opinion**: *Para mí, la gramática española es hermosa.* (In my opinion, Spanish grammar is beautiful.)`,
    fullContent_ar: `### القواعد الأساسية لـ POR:
- **السبب أو الدافع**: *Gracias por tu ayuda.* (شكراً بسبب مساعدتك.)
- **المدة الزمنية**: *Viví en Madrid por dos años.* (عشت في مدريد لمدة سنتين.)
- **المرور عبر مكان**: *Paseamos por el centro.* (تنزهنا عبر وسط المدينة.)
- **التبادل أو السعر**: *Lo compré por diez euros.* (اشتريته بعشرة يورو.)
- **الوسيلة (اتصال / نقل)**: *Hablamos por teléfono.* (تحدثنا عبر الهاتف.)

### القواعد الأساسية لـ PARA:
- **الهدف والغاية (لكي + المصدر)**: *Estudio para aprender.* (أدرس لكي أتعلم.)
- **المستفيد أو المتلقي**: *Esta carta es para mi madre.* (هذه الرسالة لأمي.)
- **الوجهة المقصودة**: *Salgo para el aeropuerto.* (أنا خارج باتجاه المطار.)
- **الموعد النهائي المحدد**: *El proyecto es para mañana.* (المشروع موعده غداً.)
- **إبداء الرأي**: *Para mí, es una gran idea.* (بالنسبة لي، هذه فكرة رائعة.)`,
    examples: [
      { es: 'Trabajo por mi familia.', en: 'I work for (motivated by / on behalf of) my family.', ar: 'أعمل بدافع حبي لعائلتي / من أجلهم كدافع.', note: 'por = motive' },
      { es: 'Compro comida para mi familia.', en: 'I buy food for (to be received by) my family.', ar: 'أشتري الطعام لعائلتي (هم المستلمون للسلعة).', note: 'para = recipient' }
    ],
    commonMistakes: [
      {
        incorrect: 'Estudio español por viajar.',
        correct: 'Estudio español para viajar.',
        reason_en: 'To express purpose ("in order to"), always use para + infinitive.',
        reason_ar: 'للتعبير عن الهدف والغاية (لكي أسافر)، نستخدم دائماً para + infinitivo.'
      }
    ],
    quickQuiz: [
      {
        question_es: 'Este informe debe estar listo ______ el lunes por la mañana.',
        question_en: 'This report must be ready by Monday morning.',
        question_ar: 'يجب أن يكون هذا التقرير جاهزاً بحلول صباح الاثنين.',
        options: ['por', 'para', 'de', 'en'],
        answerIdx: 1,
        explanation_en: 'Deadlines take "para".',
        explanation_ar: 'المواعيد النهائية (deadlines) تأخذ دائماً para.'
      }
    ]
  },
  {
    id: 'g-past-tenses',
    title_es: 'Pretérito Indefinido vs Imperfecto: El Sistema del Pasado',
    title_en: 'Preterite vs Imperfect: The Past Tense System',
    title_ar: 'الماضي البسيط (Indefinido) مقابل الماضي المستمر (Imperfecto)',
    cefr: 'A2',
    category: 'verbs',
    summary_en: 'Preterite narrates completed, punctual events on a timeline. Imperfect sets the scene, background, habitual past routines, age, and ongoing past descriptions.',
    summary_ar: 'الماضي البسيط (Pretérito) يسرد الأحداث المكتملة والمحددة زمنياً. بينما الماضي المستمر (Imperfecto) يصف الخلفية والمشهد، العادات المتكررة، العمر، والوصف في الماضي.',
    formula: 'Pretérito = Completed Action / Time Anchor | Imperfecto = Background / Habit / Description',
    fullContent_en: `### The Movie Metaphor:
- **Imperfect is the Background & Scenery**: The weather was warm (*hacía calor*), the birds were singing (*cantaban los pájaros*), and I was walking (*caminaba*).
- **Preterite is the Sudden Action**: Suddenly, a dog appeared (*apareció un perro*) and barked (*ladró*).

### Preterite Trigger Words:
*ayer* (yesterday), *anoche* (last night), *el año pasado* (last year), *de repente* (suddenly), *una vez* (once).

### Imperfect Trigger Words:
*siempre* (always), *todos los días* (every day), *mientras* (while), *a menudo* (often), *de niño* (as a child).`,
    fullContent_ar: `### تشبيه الفيلم السينمائي:
- **الـ Imperfecto هو المشهد الخلفي والديكور**: كان الجو حاراً (*hacía calor*)، وكنت أتمشى بهدوء (*caminaba*).
- **الـ Pretérito هو الحدث المفاجئ المكتمل**: فجأة رن الهاتف (*sonó el teléfono*) ودخل المعلم (*entró el profesor*).

### كلمات تدل على الماضي البسيط (Pretérito):
*ayer* (أمس)، *anoche* (البارحة)، *el año pasado* (العام الماضي)، *de repente* (فجأة).

### كلمات تدل على الماضي المستمر (Imperfecto):
*siempre* (دائماً في الماضي)، *todos los días* (كل يوم)، *mientras* (بينما)، *cuando era niño* (عندما كنت طفلاً).`,
    examples: [
      { es: 'Ayer fui al cine y compré palomitas.', en: 'Yesterday I went to the cinema and bought popcorn (completed events).', ar: 'أمس ذهبت إلى السينما واشتريت الفشار (أحداث مكتملة ومحددة).', note: 'Pretérito Indefinido' },
      { es: 'Cuando vivía en Granada, iba a la Alhambra cada mes.', en: 'When I lived in Granada, I used to go to the Alhambra every month (habitual).', ar: 'عندما كنت أعيش في غرناطة، كنت أذهب إلى قصر الحمراء شهرياً (عادة مستمرة).', note: 'Imperfecto' },
      { es: 'Yo leía un libro cuando mi amigo me llamó.', en: 'I was reading a book (imperfect) when my friend called me (preterite).', ar: 'كنت أقرأ كتاباً (مستمر) عندما اتصل بي صديقي (حدث قاطع).', note: 'Interrupted Action' }
    ],
    commonMistakes: [
      {
        incorrect: 'Ayer comía una pizza con Juan.',
        correct: 'Ayer comí una pizza con Juan.',
        reason_en: 'For a specific completed single event with "ayer", use preterite (comí).',
        reason_ar: 'لحدث واحد مكتمل ومحدد في زمن ماضٍ (أمس)، نستخدم الماضي البسيط comí.'
      }
    ],
    quickQuiz: [
      {
        question_es: 'Mientras yo ______ la cena, sonó el teléfono.',
        question_en: 'While I was making dinner, the phone rang.',
        question_ar: 'بينما كنت أعد العشاء، رن الهاتف.',
        options: ['hice', 'hacía', 'hago', 'haré'],
        answerIdx: 1,
        explanation_en: '"Mientras" describing an ongoing background action requires imperfect (hacía).',
        explanation_ar: 'الحدث المستمر في الخلفية مع mientras يتطلب الـ imperfecto (hacía).'
      }
    ]
  },
  {
    id: 'g-subjunctive-present',
    title_es: 'El Subjuntivo Presente: Deseos, Dudas y Emociones',
    title_en: 'The Present Subjunctive: Wishes, Doubts, and Emotions',
    title_ar: 'صيغة المنصوب الحالية (Subjuntivo): الرغبات، الشكوك والمشاعر',
    cefr: 'B1',
    category: 'subjunctive',
    summary_en: 'The Subjunctive is a MOOD (not a tense) expressing unreality, desires, doubt, subjectivity, uncertainty, and recommendations.',
    summary_ar: 'صيغة الـ Subjuntivo هي نمط إعرابي (Mood) يعبر عن اللايقين، الأمنيات، الشك، المشاعر، والتوصيات عندما يختلف فاعل الجملة الأولى عن فاعل الجملة الثانية.',
    formula: 'Trigger Verb (Indicative) + QUE + Different Subject (Subjunctive)',
    fullContent_en: `### The W.E.I.R.D.O. Triggers:
1. **Wishes / Desires**: *Quiero que vengas.* (I want you to come.)
2. **Emotions**: *Me alegro de que estés aquí.* (I am glad that you are here.)
3. **Impersonal Expressions**: *Es necesario que estudiemos.* (It is necessary that we study.)
4. **Requests & Recommendations**: *Te recomiendo que leas este libro.* (I recommend you read this book.)
5. **Doubt & Denial**: *Dudo que sea verdad.* (I doubt that it is true.)
6. **Ojalá (God willing / I wish)**: *¡Ojalá llueva!* (I hope it rains!)

### Formation Rule (The Opposite Vowel):
- For **-AR verbs**: use endings **-e, -es, -e, -emos, -éis, -en**
- For **-ER / -IR verbs**: use endings **-a, -as, -a, -amos, -áis, -an**
- Start from the "yo" form of the present indicative, drop the "o", and add opposite vowel!`,
    fullContent_ar: `### محفزات صيغة الـ Subjuntivo (قاعدة WEIRDO):
1. **الأمنيات والرغبات (Wishes)**: *Quiero que aprendas.* (أريدك أن تتعلم.)
2. **المشاعر والأحاسيس (Emotions)**: *Me alegra que estés bien.* (يسعدني أنك بخير.)
3. **العبارات المجردة (Impersonal)**: *Es importante que hables.* (من المهم أن تتحدث.)
4. **التوصيات والأوامر غير المباشرة (Recommendations)**: *Te aconsejo que descanses.* (أنصحك بأن ترتاح.)
5. **الشك والنفي (Doubt / Denial)**: *No creo que sea fácil.* (لا أعتقد أنه أمر سهل.)
6. **لفظة الرجاء والتمني (Ojalá)**: *¡Ojalá tengamos éxito!* (يا ليتنا ننجح!)

### طريقة صياغة الفعل (عكس حرف العلة):
- أفعال **-AR**: تأخذ نهايات حرف الـ **e** (hable, hables, hable, hablemos...)
- أفعال **-ER / -IR**: تأخذ نهايات حرف الـ **a** (coma, comas, coma, comamos... / viva, vivas...)`,
    examples: [
      { es: 'Espero que tengas un excelente día.', en: 'I hope you have an excellent day.', ar: 'آمل أن تقضي يوماً رائعاً.', note: 'Wishes (Esperar)' },
      { es: 'No pienso que él tenga razón.', en: 'I do not think he is right (doubt triggers subjunctive).', ar: 'لا أظن أنه على صواب (النفي والشك يتطلبان المنصوب).', note: 'Doubt (No pensar)' }
    ],
    commonMistakes: [
      {
        incorrect: 'Creo que él tenga razón.',
        correct: 'Creo que él tiene razón.',
        reason_en: 'Affirmative belief ("creo que") indicates certainty, so it uses Indicative (tiene), not Subjunctive!',
        reason_ar: 'الاعتقاد الإيجابي (creo que) يعبر عن اليقين ولذلك يأخذ صيغة التقرير Indicativo (tiene) وليس Subjuntivo!'
      }
    ],
    quickQuiz: [
      {
        question_es: 'Quiero que tú ______ a mi fiesta de cumpleaños.',
        question_en: 'I want you to come to my birthday party.',
        question_ar: 'أريدك أن تأتي إلى حفلة عيد ميلادي.',
        options: ['vienes', 'vengas', 'venir', 'vendrás'],
        answerIdx: 1,
        explanation_en: '"Quiero que tú..." expresses a desire with two different subjects, triggering present subjunctive (vengas).',
        explanation_ar: 'رغبة موجهة لشخص آخر تتطلب استخدام الـ Subjuntivo (vengas).'
      }
    ]
  }
];
