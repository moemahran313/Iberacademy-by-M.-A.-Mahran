import { PlacementQuestion, VideoCourse } from '../types';

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  {
    id: 1,
    level: 'A1',
    category: 'vocabulary',
    question_es: '¿Cómo se dice "good morning" en español?',
    question_en: 'How do you say "good morning" in Spanish?',
    question_ar: 'كيف نقول "صباح الخير" بالإسبانية؟',
    options: ['Buenas noches', 'Buenos días', 'Buenas tardes', 'Hasta luego'],
    correctIdx: 1,
    explanation_en: '"Buenos días" is the standard greeting for "Good morning".',
    explanation_ar: '"Buenos días" هي التحية القياسية لصباح الخير.'
  },
  {
    id: 2,
    level: 'A1',
    category: 'grammar',
    question_es: 'Nosotros ______ estudiantes de medicina.',
    question_en: 'We are medical students.',
    question_ar: 'نحن طلاب طب.',
    options: ['somos', 'estamos', 'son', 'están'],
    correctIdx: 0,
    explanation_en: 'For permanent identity / profession of "nosotros", use "somos" (ser).',
    explanation_ar: 'للهوية والمهنة مع الضمير nosotros، نستخدم somos من فعل ser.'
  },
  {
    id: 3,
    level: 'A1',
    category: 'sentence_logic',
    question_es: 'A María le ______ mucho los libros de historia.',
    question_en: 'Maria likes history books a lot.',
    question_ar: 'ماريا تعجبها كتب التاريخ كثيراً.',
    options: ['gusta', 'gustan', 'gustas', 'gusto'],
    correctIdx: 1,
    explanation_en: 'The subject of gustar is plural ("los libros"), so it takes "gustan".',
    explanation_ar: 'الفاعل النحوي لفعل gustar هنا جمع (los libros)، ولذلك نستخدم gustan.'
  },
  {
    id: 4,
    level: 'A2',
    category: 'grammar',
    question_es: 'Ayer por la tarde yo ______ una película emocionante.',
    question_en: 'Yesterday afternoon I watched an exciting movie.',
    question_ar: 'أمس بعد الظهر شاهدت فيلماً مشوقاً.',
    options: ['veo', 'vi', 'veía', 'visto'],
    correctIdx: 1,
    explanation_en: 'Completed action yesterday in the first person singular preterite is "vi".',
    explanation_ar: 'حدث مكتمل أمس للشخص الأول المفرد في الماضي البسيط هو vi.'
  },
  {
    id: 5,
    level: 'A2',
    category: 'vocabulary',
    question_es: 'Este informe es muy urgente, lo necesito ______ mañana.',
    question_en: 'This report is very urgent, I need it by tomorrow.',
    question_ar: 'هذا التقرير عاجل جداً، أحتاجه بحلول يوم غد.',
    options: ['por', 'para', 'de', 'en'],
    correctIdx: 1,
    explanation_en: 'Deadlines in Spanish always require "para".',
    explanation_ar: 'المواعيد النهائية (deadlines) تأخذ دائماً para.'
  },
  {
    id: 6,
    level: 'A2',
    category: 'reading',
    question_es: 'Cuando era niño, siempre ______ con mis amigos en el parque.',
    question_en: 'When I was a child, I always used to play with my friends in the park.',
    question_ar: 'عندما كنت طفلاً، كنت دائماً ألعب مع أصدقائي في الحديقة.',
    options: ['jugué', 'jugaba', 'juego', 'jugaré'],
    correctIdx: 1,
    explanation_en: 'Habitual past actions ("siempre") in childhood take imperfect "jugaba".',
    explanation_ar: 'العادات المتكررة في الطفولة تتطلب الـ Imperfecto (jugaba).'
  },
  {
    id: 7,
    level: 'B1',
    category: 'grammar',
    question_es: 'Es imprescindible que todos los participantes ______ a tiempo.',
    question_en: 'It is essential that all participants arrive on time.',
    question_ar: 'من الضروري أن يصل جميع المشاركين في الوقت المحدد.',
    options: ['llegan', 'lleguen', 'llegaron', 'llegarán'],
    correctIdx: 1,
    explanation_en: 'Impersonal trigger "Es imprescindible que..." requires present subjunctive (lleguen).',
    explanation_ar: 'التركيب غير الشخصي "Es imprescindible que" يتطلب صيغة المنصوب (lleguen).'
  },
  {
    id: 8,
    level: 'B1',
    category: 'sentence_logic',
    question_es: 'Si yo ______ más dinero, viajaría por toda América Latina.',
    question_en: 'If I had more money, I would travel all over Latin America.',
    question_ar: 'لو كان لدي المزيد من المال، لسافرت في أنحاء أمريكا اللاتينية.',
    options: ['tengo', 'tuviera', 'tendría', 'tenga'],
    correctIdx: 1,
    explanation_en: 'Hypothetical "Si" clauses paired with conditional take imperfect subjunctive (tuviera).',
    explanation_ar: 'الجمل الشرطية الافتراضية مع لو (Si) المقترنة بجواب الشرط Condicional تأخذ imperfecto de subjuntivo (tuviera).'
  },
  {
    id: 9,
    level: 'B2',
    category: 'vocabulary',
    question_es: '______ los múltiples contratiempos, el equipo concluyó la investigación con éxito.',
    question_en: 'Despite the multiple setbacks, the team successfully concluded the investigation.',
    question_ar: 'على الرغم من العقبات المتعددة، أنهى الفريق البحث بنجاح.',
    options: ['No obstante', 'A pesar de', 'Por lo tanto', 'En cambio'],
    correctIdx: 1,
    explanation_en: '"A pesar de" introduces a noun phrase expressing concession.',
    explanation_ar: '"A pesar de" تفيد الاستدراك والمعارضة ويليها تركيب اسمي.'
  },
  {
    id: 10,
    level: 'B2',
    category: 'reading',
    question_es: 'No creo que las medidas adoptadas ______ suficientes para frenar la inflación.',
    question_en: 'I do not believe the adopted measures are sufficient to curb inflation.',
    question_ar: 'لا أعتقد أن التدابير المتخذة كافية لكبح التضخم.',
    options: ['son', 'sean', 'fueron', 'serán'],
    correctIdx: 1,
    explanation_en: 'Negative belief ("No creo que...") expresses doubt and demands subjunctive (sean).',
    explanation_ar: 'نفي الاعتقاد (No creo que) يعبر عن الشك ويتطلب صيغة الـ Subjuntivo (sean).'
  }
];

export const VIDEO_COURSES: VideoCourse[] = [
  {
    id: 'playlist-cartoons',
    title: 'Learn Spanish with Cartoons',
    creator: 'Iberio Spanish Masterclasses',
    youtubeId: 'PLkF0tPwXKUwDYkJ49riGfN1opbe-lvQTp',
    playlistId: 'PLkF0tPwXKUwDYkJ49riGfN1opbe-lvQTp',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLkF0tPwXKUwDYkJ49riGfN1opbe-lvQTp',
    cefr: 'A1',
    topic: 'Comprehensible Input & Cartoons',
    duration: 'Full Playlist',
    description_en: 'Learn Spanish naturally through engaging cartoons with clear pronunciation, visual storytelling, and high-frequency vocabulary designed for effective comprehensible input.',
    description_ar: 'تعلم الإسبانية بشكل طبيعي وممتع من خلال الرسوم المتحركة والكرتون مع نطق واضح وقصص مرئية ومفردات أساسية.',
    timestamps: [
      { time: 'Part 1', seconds: 0, title: 'Animated Dialogues & Visual Context', grammarOrVocab: 'Visual Comprehension' },
      { time: 'Part 2', seconds: 0, title: 'Everyday Vocabulary in Motion', grammarOrVocab: 'Contextual Acquisition' },
      { time: 'Part 3', seconds: 0, title: 'Listening Comprehension & Repetition', grammarOrVocab: 'Ear Training' }
    ],
    keyVocab: ['dibujos animados', 'historia', 'personajes', 'comprender'],
    grammarNote: 'Visual context and character expressions make acquiring natural conversational Spanish intuitive and effortless.'
  },
  {
    id: 'playlist-tv-series',
    title: 'Learn Spanish with TV Series',
    creator: 'Iberio Spanish Masterclasses',
    youtubeId: 'PLkF0tPwXKUwA4TZzliZjLWhNBi30UcH63',
    playlistId: 'PLkF0tPwXKUwA4TZzliZjLWhNBi30UcH63',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLkF0tPwXKUwA4TZzliZjLWhNBi30UcH63',
    cefr: 'B1',
    topic: 'Authentic TV Series & Dialogues',
    duration: 'Full Playlist',
    description_en: 'Immerse yourself in authentic Spanish spoken in real TV series. Learn native speed dialogues, cultural humor, colloquial expressions, and conversational idioms.',
    description_ar: 'انغمس في الإسبانية الحقيقية من خلال المسلسلات التلفزيونية الإسبانية، وتعلم سرعة الكلام الأصلية، والتعابير الدارجة، والفكاهة الثقافية.',
    timestamps: [
      { time: 'Part 1', seconds: 0, title: 'Real TV Dialogues & Native Cadence', grammarOrVocab: 'Authentic Spanish' },
      { time: 'Part 2', seconds: 0, title: 'Colloquial Expressions & Street Slang', grammarOrVocab: 'Colloquial & Idioms' },
      { time: 'Part 3', seconds: 0, title: 'Cultural Context & Dramatic Nuance', grammarOrVocab: 'Cultural Immersion' }
    ],
    keyVocab: ['serie', 'diálogo', 'expresiones', 'personaje'],
    grammarNote: 'Pay attention to native contractions, intonational stress, and pragmatic cues used in real television scenes.'
  },
  {
    id: 'playlist-2',
    title: 'Immersive Natural Conversations & Dialogues (Playlist 2)',
    creator: 'Iberio Spanish Masterclasses',
    youtubeId: 'PLkF0tPwXKUwBi67XY7x8xbTMfGVdsg-4z',
    playlistId: 'PLkF0tPwXKUwBi67XY7x8xbTMfGVdsg-4z',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLkF0tPwXKUwBi67XY7x8xbTMfGVdsg-4z',
    cefr: 'A2',
    topic: 'Real Street Dialogues & Fluency',
    duration: 'Full Playlist',
    description_en: 'Immersive playlist featuring natural conversations, everyday dialogue practice, intermediate syntax structures, and practical fluency drills.',
    description_ar: 'قائمة تشغيل تفاعلية تضم محادثات طبيعية، وتدريبات على الحوارات اليومية، والتراكيب النحوية المتوسطة للوصول إلى الطلاقة.',
    timestamps: [
      { time: 'Part 1', seconds: 0, title: 'Street Conversations & Natural Speed', grammarOrVocab: 'A2 Dialogues' },
      { time: 'Part 2', seconds: 0, title: 'Past Tense Contrast: Pretérito vs Imperfecto', grammarOrVocab: 'Grammar in Context' },
      { time: 'Part 3', seconds: 0, title: 'Contextual Idiomatic Phrases', grammarOrVocab: 'Real-world Usage' }
    ],
    keyVocab: ['fluidez', 'diálogo', 'expresiones', 'comunicación'],
    grammarNote: 'Notice native speed contractions, verbal connections, and real-life conversational turns of phrase.'
  },
  {
    id: 'playlist-3',
    title: 'Advanced Spanish Syntax & Cultural Immersion (Playlist 3)',
    creator: 'Iberio Spanish Masterclasses',
    youtubeId: 'PLkF0tPwXKUwBSWQSDjoAxe_plLfPTRjQB',
    playlistId: 'PLkF0tPwXKUwBSWQSDjoAxe_plLfPTRjQB',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLkF0tPwXKUwBSWQSDjoAxe_plLfPTRjQB',
    cefr: 'B1',
    topic: 'Advanced Grammar & Discourse',
    duration: 'Full Playlist',
    description_en: 'Advanced Spanish video series exploring complex subjunctive triggers, discourse connectors, cultural nuances, and high-level listening comprehension.',
    description_ar: 'سلسلة فيديوهات إسبانية متقدمة تشرح أدوات المنصوب، وروابط الحديث، واللمحات الثقافية، والاستماع المتقدم.',
    timestamps: [
      { time: 'Part 1', seconds: 0, title: 'Subjunctive Mood Triggers & Emotional Nuance', grammarOrVocab: 'B1 Subjunctive' },
      { time: 'Part 2', seconds: 0, title: 'Discourse Connectors & Complex Syntax', grammarOrVocab: 'B1-B2 Discourse' },
      { time: 'Part 3', seconds: 0, title: 'Cultural Deep Dives & Hispanic Literature', grammarOrVocab: 'Cultural Fluency' }
    ],
    keyVocab: ['subjuntivo', 'conectores', 'sintaxis', 'cultura'],
    grammarNote: 'Pay close attention to subjunctive moods, conditional hypotheses, and subtle discourse markers.'
  }
];
