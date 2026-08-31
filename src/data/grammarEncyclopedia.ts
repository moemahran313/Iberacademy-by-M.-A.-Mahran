import { GrammarTopic } from '../types';

export const GRAMMAR_ENCYCLOPEDIA: (GrammarTopic & { unit: number })[] = [
  // UNIT 1: Foundations & Basics
  {
    id: 'g-noun-gender-plural',
    unit: 1,
    title_es: 'Género de Sustantivos y Pluralización',
    title_en: 'Gender of Nouns & Pluralization',
    title_ar: 'جنس الأسماء وجمعها في الإسبانية',
    cefr: 'A1',
    category: 'foundations',
    summary_en: 'Every Spanish noun has a grammatical gender (masculine or feminine). Generally, -o is masculine and -a is feminine. Plurals are formed by adding -s or -es.',
    summary_ar: 'كل اسم في الإسبانية له جنس قواعدي (مذكر أو مؤنث). عادة ما تنتهي الأسماء المذكرة بـ -o والمؤنثة بـ -a. يُصاغ الجمع بإضافة -s أو -es.',
    formula: 'Nouns ending in -o / -ma / -l / -r = Usually Masculine | Nouns ending in -a / -ción / -tad / -dad = Usually Feminine',
    fullContent_en: `### 1. Masculine Nouns:
- Ends in **-o**: *el libro* (the book), *el perro* (the dog).
- Ends in **-ma**: *el problema* (the problem), *el idioma* (the language).
- Ends in **-l, -r, -n, -s**: *el papel* (the paper), *el tren* (the train).

### 2. Feminine Nouns:
- Ends in **-a**: *la mesa* (the table), *la gata* (the female cat).
- Ends in **-ción / -sión**: *la lección* (the lesson), *la televisión* (the television).
- Ends in **-dad / -tad**: *la ciudad* (the city), *la libertad* (the liberty).

### 3. Rule of Pluralization:
- If a noun ends in a **vowel**, add **-s**: *libro* -> *libros*.
- If a noun ends in a **consonant**, add **-es**: *papel* -> *papeles*.
- If a noun ends in **-z**, change to **-ces**: *lápiz* -> *lápices*.`,
    fullContent_ar: `### 1. الأسماء المذكرة (Masculine):
- المنتهية بحرف **-o**: مثل *el libro* (الكتاب).
- المنتهية بـ **-ma**: مثل *el problema* (المشكلة)، *el idioma* (اللغة).
- المنتهية بحروف **-l, -r, -n, -s**: مثل *el papel* (الورقة)، *el tren* (القطار).

### 2. الأسماء المؤنثة (Feminine):
- المنتهية بحرف **-a**: مثل *la mesa* (الطاولة).
- المنتهية بـ **-ción / -sión**: مثل *la lección* (الدرس)، *la decisión* (القرار).
- المنتهية بـ **-dad / -tad**: مثل *la ciudad* (المدينة)، *la libertad* (الحرية).

### 3. قواعد صياغة الجمع:
- إذا انتهى الاسم بـ **حرف علة**، نضيف **-s**: مثل *libro* -> *libros*.
- إذا انتهى الاسم بـ **حرف ساكن**، نضيف **-es**: مثل *papel* -> *papeles*.
- إذا انتهى الاسم بـ **-z**، نقوم بتحويلها إلى **-ces**: مثل *lápiz* (قلم) -> *lápices* (أقلام).`,
    examples: [
      { es: 'El mapa es grande.', en: 'The map is big (mapa is irregular masculine).', ar: 'الخريطة كبيرة (خريطة هي اسم مذكر شاذ).', note: 'el mapa' },
      { es: 'La mano está limpia.', en: 'The hand is clean (mano is irregular feminine).', ar: 'اليد نظيفة (يد هي اسم مؤنث شاذ).', note: 'la mano' }
    ],
    commonMistakes: [
      {
        incorrect: 'El mano es pequeño.',
        correct: 'La mano es pequeña.',
        reason_en: 'Although ending in -o, "mano" is a feminine noun.',
        reason_ar: 'على الرغم من انتهاء كلمة mano بـ -o، إلا أنها اسم مؤنث شاذ في قواعد الإسبانية.'
      }
    ],
    quickQuiz: [
      {
        question_es: '¿Cuál es el plural correcto de la palabra "luz" (light)?',
        question_en: 'What is the correct plural of the word "luz"?',
        question_ar: 'ما هو الجمع الصحيح لكلمة "luz" (ضوء)؟',
        options: ['luzes', 'luces', 'luzs', 'lucces'],
        answerIdx: 1,
        explanation_en: 'Nouns ending in -z change to -ces in plural.',
        explanation_ar: 'الأسماء المنتهية بـ -z تتحول إلى -ces عند صياغة الجمع.'
      }
    ]
  },
  {
    id: 'g-articles',
    unit: 1,
    title_es: 'Artículos Definidos e Indefinidos',
    title_en: 'Definite & Indefinite Articles',
    title_ar: 'أدوات التعريف والتنكير',
    cefr: 'A1',
    category: 'foundations',
    summary_en: 'Spanish has four definite articles (the) and four indefinite articles (a/some). They must agree in gender and number with the nouns they modify.',
    summary_ar: 'تمتلك اللغة الإسبانية أربع أدوات تعريف (الـ) وأربع أدوات تنكير (اسم نكرة / بعض). يجب أن تطابق الأداة الاسم في الجنس والعدد.',
    formula: 'Definite: el, la, los, las | Indefinite: un, una, unos, unas',
    fullContent_en: `### 1. Definite Articles ("The" - specific entities):
- **Masculine Singular**: *el* (*el chico* - the boy)
- **Feminine Singular**: *la* (*la chica* - the girl)
- **Masculine Plural**: *los* (*los chicos* - the boys)
- **Feminine Plural**: *las* (*las chicas* - the girls)

### 2. Indefinite Articles ("A / An / Some" - unspecific):
- **Masculine Singular**: *un* (*un libro* - a book)
- **Feminine Singular**: *una* (*una mesa* - a table)
- **Masculine Plural**: *unos* (*unos libros* - some books)
- **Feminine Plural**: *unas* (*unas mesas* - some tables)

### 3. Special Union:
- **a + el** contractions to **al**: *Voy al parque* (I go to the park).
- **de + el** contractions to **del**: *Es el libro del profesor* (It is the teacher's book).`,
    fullContent_ar: `### 1. أدوات التعريف (Definite Articles):
تستخدم لتحديد شيء معروف ومحدد:
- **مفرد مذكر**: *el* (مثل *el chico* - الولد)
- **مفرد مؤنث**: *la* (مثل *la chica* - البنت)
- **جمع مذكر**: *los* (مثل *los chicos* - الأولاد)
- **جمع مؤنث**: *las* (مثل *las chicas* - البنات)

### 2. أدوات التنكير (Indefinite Articles):
تستخدم للإشارة لشيء غير محدد أو عام:
- **مفرد مذكر**: *un* (مثل *un libro* - كتاب)
- **مفرد مؤنث**: *una* (مثل *una mesa* - طاولة)
- **جمع مذكر**: *unos* (مثل *unos libros* - بعض الكتب)
- **جمع مؤنث**: *unas* (مثل *unas mesas* - بعض الطاولات)

### 3. الإدغام (Contractions):
- **a + el** تندمج لتصبح **al**: *Voy al parque* (أنا ذاهب إلى الحديقة).
- **de + el** تندمج لتصبح **del**: *El libro del profesor* (كتاب الأستاذ).`,
    examples: [
      { es: 'Voy al cine los fines de semana.', en: 'I go to the cinema on weekends ("a el" becomes "al").', ar: 'أذهب إلى السينما في عطلات نهاية الأسبوع ("a el" تصبح "al").', note: 'al contraction' },
      { es: 'El libro es del estudiante.', en: 'The book is the student’s ("de el" becomes "del").', ar: 'الكتاب يخص الطالب ("de el" تصبح "del").', note: 'del contraction' }
    ],
    commonMistakes: [
      {
        incorrect: 'Voy a el hospital.',
        correct: 'Voy al hospital.',
        reason_en: 'Preposition "a" and article "el" must contract to "al".',
        reason_ar: 'يجب دائماً دمج حرف الجر a مع أداة التعريف el لتصبح al.'
      }
    ],
    quickQuiz: [
      {
        question_es: 'Completa: Es el carro ______ padre de Juan.',
        question_en: 'Complete: It is the car of Juans father.',
        question_ar: 'أكمل الجملة: Es el carro ______ padre de Juan.',
        options: ['de el', 'del', 'al', 'de la'],
        answerIdx: 1,
        explanation_en: '"de" + "el" contracts to "del".',
        explanation_ar: 'حرف الجر de مع أداة التعريف el يندمجان في كلمة del.'
      }
    ]
  },
  {
    id: 'g-subject-pronouns',
    unit: 1,
    title_es: 'Pronombres Personales de Sujeto',
    title_en: 'Subject Pronouns & Verb Agreement',
    title_ar: 'ضمائر الفاعل ومطابقة الأفعال',
    cefr: 'A1',
    category: 'foundations',
    summary_en: 'Spanish subject pronouns replace nouns as the subject of the sentence. They are often omitted in speech because verb endings clearly indicate who is acting.',
    summary_ar: 'تستبدل ضمائر الفاعل الأسماء كفاعل للجملة. غالباً ما يتم حذفها في الحديث اليومي لأن نهايات الفعل تدل بوضوح على الفاعل.',
    formula: 'Pronouns can be dropped | Verb endings act as the pronoun!',
    fullContent_en: `### Spanish Subject Pronouns:
| English | Singular | Plural |
|---|---|---|
| 1st Person | **Yo** (I) | **Nosotros/as** (We) |
| 2nd Person | **Tú** (You - informal) | **Vosotros/as** (You all - Spain) |
| 3rd Person | **Él/Ella** (He/She) <br> **Usted** (You - formal) | **Ellos/Ellas** (They) <br> **Ustedes** (You all - LatAm) |

- **Usted / Ustedes**: Expresses formal respect, but grammatically acts like the 3rd person (*él/ellos*).
- **Nosotros / Vosotros**: Use feminine ending (*nosotras/vosotras*) if the group is entirely female.`,
    fullContent_ar: `### ضمائر الفاعل في اللغة الإسبانية:
| الضمير بالإنجليزية | المفرد | الجمع |
|---|---|---|
| المتحدث (1st) | **Yo** (أنا) | **Nosotros/as** (نحن) |
| المخاطب (2nd) | **Tú** (أنت - عام) | **Vosotros/as** (أنتم - في إسبانيا) |
| الغائب (3rd) | **Él/Ella** (هو / هي) <br> **Usted** (حضرتك - رسمي) | **Ellos/Ellas** (هم / هن) <br> **Ustedes** (أنتم - رسمي / أمريكا اللاتينية) |

- **Usted / Ustedes**: تُستخدم لإظهار الاحترام والتقدير، وتُعامل قواعدياً كضمائر الغائب الثالث (*él/ellos*).
- **Nosotros / Vosotros**: تُستخدم بصيغة المؤنث (*nosotras/vosotras*) عندما تكون المجموعة بأكملها إناثاً.`,
    examples: [
      { es: '¿De dónde eres (tú)?', en: 'Where are you from? (The pronoun "tú" is dropped but implied by "eres").', ar: 'من أين أنت؟ (الضمير tú محذوف هنا لأن تصريف الفعل eres يدل عليه).', note: 'Pronoun dropping' },
      { es: 'Ellas estudian en la universidad.', en: 'They (all female) study at the university.', ar: 'هن يدرسن في الجامعة (مجموعة إناث غائبات).', note: 'Ellas (Feminine plural)' }
    ],
    commonMistakes: [
      {
        incorrect: 'Yo soy de España, y yo vivo en Madrid.',
        correct: 'Soy de España, y vivo en Madrid.',
        reason_en: 'Repeating "yo" is grammatically redundant and sounds highly unnatural in Spanish.',
        reason_ar: 'تكرار الضمير "yo" في كل جملة غير طبيعي ومستهجن في التحدث بالإسبانية.'
      }
    ],
    quickQuiz: [
      {
        question_es: 'Si un grupo está formado por 10 chicas y 1 chico, ¿qué pronombre usamos?',
        question_en: 'If a group is made of 10 girls and 1 boy, which pronoun is used?',
        question_ar: 'إذا كانت هناك مجموعة مكونة من 10 بنات وولد واحد، أي ضمير نستخدم؟',
        options: ['Nosotras', 'Ellas', 'Ellos', 'Vosotras'],
        answerIdx: 2,
        explanation_en: 'Spanish defaults to the masculine form if even one male is in the group.',
        explanation_ar: 'تتحول صيغة الجمع للذكور (Ellos) فوراً بمجرد وجود ذكر واحد في المجموعة.'
      }
    ]
  },
  {
    id: 'g-present-regular',
    unit: 1,
    title_es: 'Presente de Indicativo: Verbos Regulares',
    title_en: 'Present Indicative: Regular Verbs',
    title_ar: 'المضارع البسيط للأفعال القياسية',
    cefr: 'A1',
    category: 'verbs',
    summary_en: 'Spanish regular verbs belong to three conjugation families: -AR, -ER, and -IR. To conjugate, drop the ending and add the specific present tense terminations.',
    summary_ar: 'تنقسم الأفعال القياسية في الإسبانية إلى ثلاث مجموعات حسب نهايتها: -AR و -ER و -IR. للتصريف، نحذف النهاية ونضيف الحروف المناسبة للزمن.',
    formula: 'Drop (-ar / -er / -ir) + Add Present Tense Endings!',
    fullContent_en: `### Present Regular Endings:
1. **-AR Verbs** (*Hablar* - to speak):
   - Yo: **-o** (*hablo*)
   - Tú: **-as** (*hablas*)
   - Él/Ella/Ud: **-a** (*habla*)
   - Nosotros: **-amos** (*hablamos*)
   - Vosotros: **-áis** (*habláis*)
   - Ellos/Ellas/Uds: **-an** (*hablan*)

2. **-ER Verbs** (*Comer* - to eat):
   - Yo: **-o** (*como*)
   - Tú: **-es** (*comes*)
   - Él/Ella/Ud: **-e** (*come*)
   - Nosotros: **-emos** (*comemos*)
   - Vosotros: **-éis** (*coméis*)
   - Ellos/Ellas/Uds: **-en** (*comen*)

3. **-IR Verbs** (*Vivir* - to live):
   - Yo: **-o** (*vivo*)
   - Tú: **-es** (*vives*)
   - Él/Ella/Ud: **-e** (*vive*)
   - Nosotros: **-imos** (*vivimos*)
   - Vosotros: **-ís** (*vivís*)
   - Ellos/Ellas/Uds: **-en** (*viven*)`,
    fullContent_ar: `### نهايات المضارع القياسي:
1. **أفعال المجموعة الأولى -AR** (مثل *Hablar* - يتحدث):
   - Yo: **-o** (*hablo*)
   - Tú: **-as** (*hablas*)
   - Él/Ella/Ud: **-a** (*habla*)
   - Nosotros: **-amos** (*hablamos*)
   - Vosotros: **-áis** (*habláis*)
   - Ellos/Ellas/Uds: **-an** (*hablan*)

2. **أفعال المجموعة الثانية -ER** (مثل *Comer* - يأكل):
   - Yo: **-o** (*como*)
   - Tú: **-es** (*comes*)
   - Él/Ella/Ud: **-e** (*come*)
   - Nosotros: **-emos** (*comemos*)
   - Vosotros: **-éis** (*coméis*)
   - Ellos/Ellas/Uds: **-en** (*comen*)

3. **أفعال المجموعة الثالثة -IR** (مثل *Vivir* - يعيش):
   - Yo: **-o** (*vivo*)
   - Tú: **-es** (*vives*)
   - Él/Ella/Ud: **-e** (*vive*)
   - Nosotros: **-imos** (*vivimos*)
   - Vosotros: **-ís** (*vivís*)
   - Ellos/Ellas/Uds: **-en** (*viven*)`,
    examples: [
      { es: 'Nosotros vivimos en Madrid.', en: 'We live in Madrid (-IR verb "vivir").', ar: 'نحن نعيش في مدريد (تصريف فعل vivir مع nosotros).', note: 'vivimos' },
      { es: '¿Qué comes tú?', en: 'What do you eat? (-ER verb "comer").', ar: 'ماذا تأكل؟ (تصريف comer مع tú).', note: 'comes' }
    ],
    commonMistakes: [
      {
        incorrect: 'Nosotros escribemos cartas.',
        correct: 'Nosotros escribimos cartas.',
        reason_en: '-IR verbs like "escribir" have -imos ending in the "nosotros" form, not -emos.',
        reason_ar: 'أفعال المجموعة الثالثة -IR تأخذ النهاية -imos في تصريف nosotros وليس -emos.'
      }
    ],
    quickQuiz: [
      {
        question_es: '¿Cómo se dice "They speak Spanish" en español?',
        question_en: 'How do you say "They speak Spanish"?',
        question_ar: 'كيف تقول "هم يتحدثون الإسبانية"؟',
        options: ['Ellos hablan español', 'Ellos hablas español', 'Ellos hablo español', 'Ellos hablan el español'],
        answerIdx: 0,
        explanation_en: '"Hablan" is the third-person plural (-an) present tense form of hablar.',
        explanation_ar: 'تصريف hablar للجمع الغائب هو hablan.'
      }
    ]
  },

  // UNIT 2: Essential Sentences
  {
    id: 'g-ser-vs-estar',
    unit: 2,
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
      { es: 'Juan está aburrido.', en: 'Juan is bored right now (temporary state).', ar: 'خوان يشعر بالملل حالياً (حالة مؤقتة).', note: 'estar + aburrido' }
    ],
    commonMistakes: [
      {
        incorrect: 'Soy en la biblioteca.',
        correct: 'Estoy en la biblioteca.',
        reason_en: 'Location of people and physical objects always takes estar.',
        reason_ar: 'الموقع الجغرافي للأشخاص والأشياء المادية يتطلب دائماً استخدام فعل Estar.'
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
      }
    ]
  },
  {
    id: 'g-adjectives-agreement',
    unit: 2,
    title_es: 'Acuerdo de Adjetivos y Orden de Palabras',
    title_en: 'Adjective Agreement & Word Order',
    title_ar: 'مطابقة الصفات وترتيب الكلمات',
    cefr: 'A1',
    category: 'foundations',
    summary_en: 'Spanish adjectives must match the noun they modify in gender (masculine/feminine) and number (singular/plural). They usually come AFTER the noun.',
    summary_ar: 'يجب أن تطابق الصفات الأسماء التي تصفها في الجنس (مذكر/مؤنث) والعدد (مفرد/جمع). عادةً ما تأتي الصفة بعد الاسم الموصوف.',
    formula: 'Noun + Adjective (with matched endings -o/a/os/as)',
    fullContent_en: `### 1. Adjective Agreement:
- **Masculine Singular**: *un coche rojo* (a red car)
- **Feminine Singular**: *una casa roja* (a red house)
- **Masculine Plural**: *unos coches rojos* (some red cars)
- **Feminine Plural**: *unas casas rojas* (some red houses)

Adjectives ending in **-e** or a **consonant** usually match both genders, but still change for plural:
- *el estudiante inteligente* / *la estudiante inteligente*
- *los estudiantes inteligentes*

### 2. Word Order:
Unlike English, descriptive adjectives come **after** the noun in Spanish:
- *el libro interesante* (the interesting book)
- *la comida deliciosa* (the delicious food)`,
    fullContent_ar: `### 1. مطابقة الصفة للموصوف:
- **مفرد مذكر**: *un coche rojo* (سيارة حمراء)
- **مفرد مؤنث**: *una casa roja* (بيت أحمر)
- **جمع مذكر**: *unos coches rojos* (سيارات حمراء)
- **جمع مؤنث**: *unas casas rojas* (بيوت حمراء)

الصفات المنتهية بـ **-e** أو بحرف ساكن تطابق كلا الجنسين في المفرد وتجمع فقط:
- *el estudiante inteligente* / *la estudiante inteligente* (الطالب الذكي / الطالبة الذكية)
- *los estudiantes inteligentes* (الطلاب الأذكياء)

### 2. ترتيب الكلمات:
على عكس الإنجليزية، تأتي الصفات الوصفية **بعد** الاسم في الإسبانية:
- *el libro interesante* (الكتاب الممتع)
- *la comida deliciosa* (الطعام اللذيذ)`,
    examples: [
      { es: 'Tengo un gato negro.', en: 'I have a black cat (adjective "negro" is masculine and after "gato").', ar: 'لدي قط أسود.', note: 'negro' },
      { es: 'Ellas son unas chicas simpáticas.', en: 'They are friendly girls (feminine plural agreement).', ar: 'هن فتيات لطيفات.', note: 'simpáticas' }
    ],
    commonMistakes: [
      {
        incorrect: 'Tengo un rojo coche.',
        correct: 'Tengo un coche rojo.',
        reason_en: 'Descriptive color adjectives must come after the noun.',
        reason_ar: 'الصفات الوصفية (مثل الألوان) يجب دائماً أن تأتي بعد الاسم.'
      }
    ],
    quickQuiz: [
      {
        question_es: '¿Cómo se dice "The smart girls" en español?',
        question_en: 'How do you say "The smart girls"?',
        question_ar: 'كيف تقول "الفتيات الذكيات"؟',
        options: ['Las inteligentes chicas', 'Las chicas inteligente', 'Las chicas inteligentes', 'Los chicos inteligentes'],
        answerIdx: 2,
        explanation_en: '"inteligentes" agrees in number with "las chicas" and comes after the noun.',
        explanation_ar: '"inteligentes" تطابق "las chicas" في الجمع وتأتي بعد الاسم.'
      }
    ]
  },
  {
    id: 'g-time-numbers',
    unit: 2,
    title_es: 'Decir la Hora y Números Cardinales',
    title_en: 'Telling Time & Numbers',
    title_ar: 'قول الوقت والأرقام',
    cefr: 'A1',
    category: 'foundations',
    summary_en: 'Telling time in Spanish uses the verb SER (es for 1:00, son for other hours) and feminine articles. Numbers are essential for prices, dates, and hours.',
    summary_ar: 'الحديث عن الوقت في الإسبانية يستدعي استخدام فعل SER (نستخدم es للساعة الواحدة و son لباقي الساعات) مع أدوات التعريف المؤنثة.',
    formula: 'Es la una (1:00) | Son las + Hour (2:00 to 12:00)',
    fullContent_en: `### 1. Telling Time:
- **Asking for time**: *¿Qué hora es?* (What time is it?)
- **At 1:00**: *Es la una.* (It is one o'clock.)
- **At other hours**: *Son las dos / las cinco.* (It is two / five o'clock.)
- **Adding minutes**: Use **y** (and) up to half-past:
  - *Son las tres y cuarto* (It is 3:15).
  - *Son las cuatro y media* (It is 4:30).
- **Subtracting minutes**: Use **menos** (less) after half-past:
  - *Son las seis menos diez* (It is 5:50).

### 2. Cardinal Numbers:
- 1 to 10: *uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez*
- 11 to 20: *once, doce, trece, catorce, quince, dieciséis, diecisiete, dieciocho, diecinueve, veinte*
- 30 to 100: *treinta, cuarenta, cincuenta, sesenta, setenta, ochenta, noventa, cien*`,
    fullContent_ar: `### 1. الإخبار عن الوقت:
- **السؤال عن الوقت**: *¿Qué hora es?* (كم الساعة؟)
- **الساعة الواحدة تماماً**: *Es la una.* (إنها الواحدة.)
- **باقي الساعات**: *Son las dos / las cinco.* (إنها الثانية / الخامسة.)
- **إضافة الدقائق**: نستخدم **y** (و) حتى نصف الساعة:
  - *Son las tres y cuarto* (إنها الثالثة والربع).
  - *Son las cuatro y media* (إنها الرابعة والنصف).
- **طرح الدقائق**: نستخدم **menos** (إلا) بعد النصف:
  - *Son las seis menos diez* (إنها السادسة إلا عشر دقائق - 5:50).

### 2. الأرقام الأساسية:
- من 1 لـ 10: *uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez*
- من 11 لـ 20: *once, doce, trece, catorce, quince, dieciséis... veinte*
- العقود: *treinta (30), cuarenta (40), cincuenta (50), sesenta (60), setenta (70), ochenta (80), noventa (90), cien (100)*`,
    examples: [
      { es: 'La clase empieza a las ocho y media.', en: 'The class starts at eight thirty.', ar: 'يبدأ الدرس في الساعة الثامنة والنصف.', note: 'a las + time' },
      { es: 'Es la una y cuarto de la tarde.', en: 'It is 1:15 in the afternoon.', ar: 'إنها الساعة الواحدة والربع ظهراً.', note: 'Es la una' }
    ],
    commonMistakes: [
      {
        incorrect: 'Son las una.',
        correct: 'Es la una.',
        reason_en: '"La una" is singular, so it must use "Es la" instead of "Son las".',
        reason_ar: 'الواحدة مفرد، لذا تستوجب فعل المفرد Es la بدلاً من Son las.'
      }
    ],
    quickQuiz: [
      {
        question_es: '¿Cómo se dice "It is 5:50" (Ten to six)?',
        question_en: 'How do you say "It is 5:50"?',
        question_ar: 'كيف تقول "إنها السادسة إلا عشر دقائق" (5:50)؟',
        options: ['Son las seis y diez', 'Es las seis menos diez', 'Son las seis menos diez', 'Son las cinco y cincuenta'],
        answerIdx: 2,
        explanation_en: '5:50 is literally expressed as "Six minus ten" (Son las seis menos diez).',
        explanation_ar: 'تُقال 5:50 "السادسة إلا عشرة" (Son las seis menos diez).'
      }
    ]
  },

  // UNIT 3: Present Tense Mastery
  {
    id: 'g-gustar',
    unit: 3,
    title_es: 'El verbo Gustar y similares',
    title_en: 'The Verbs Gustar & Similar Structures',
    title_ar: 'فعل Gustar وتراكيب الإعجاب',
    cefr: 'A2',
    category: 'verbs',
    summary_en: 'In Spanish, gustar literally means "to be pleasing to". The subject is actually the thing that you like, and the person who likes it is represented by an indirect object pronoun.',
    summary_ar: 'في الإسبانية يعني فعل gustar حرفياً "يكون ساراً لـ". الفاعل الحقيقي في الجملة هو الشيء المحبوب، بينما الشخص المعجب يُعبر عنه بضمير مفعول غير مباشر.',
    formula: 'Indirect Pronoun (me/te/le/nos/os/les) + gusta (singular item) / gustan (plural items)',
    fullContent_en: `### Grammatical Mechanics of Gustar:
Unlike English "I like books", Spanish reverses this to "Books please me" (*Me gustan los libros*).

1. **The Pronouns (Indirect)**:
   - Me (to me)
   - Te (to you)
   - Le (to him/her/you formal)
   - Nos (to us)
   - Os (to you all - Spain)
   - Les (to them/you all)

2. **The Verb Forms**:
   - **Gusta**: If liked thing is **singular** or an **infinitive verb** (*Me gusta el café*, *Te gusta cantar*).
   - **Gustan**: If liked things are **plural** (*Me gustan los libros*).

3. **Clarification with "A"**:
   Because *le* and *les* can be ambiguous, use **a + person** to clarify:
   - *A Juan le gusta el coche* (Juan likes the car).`,
    fullContent_ar: `### الآلية القواعدية لفعل Gustar:
على عكس الإنجليزية "I like books"، تعكس الإسبانية البنية لتصبح "الكتب تعجبني" (*Me gustan los libros*).

1. **ضمائر المفعول غير المباشر**:
   - Me (يعجبني)
   - Te (يعجبك)
   - Le (يعجبه / يعجبها / يعجب حضرتك)
   - Nos (يعجبنا)
   - Os (يعجبكم)
   - Les (يعجبهم)

2. **صيغ الفعل المعتادة**:
   - **Gusta**: إذا كان الشيء المحبوب **مفرداً** أو **فعلاً في المصدر** (*Me gusta el café* / *Me gusta viajar*).
   - **Gustan**: إذا كانت الأشياء المحبوبة **جمعاً** (*Me gustan los libros*).

3. **التوضيح بحرف الجر "A"**:
   لتوضيح فاعل الإعجاب الغامض مع le و les:
   - *A María le gusta leer* (ماريا يعجبها القراءة).`,
    examples: [
      { es: 'Me gustan las manzanas rojas.', en: 'I like red apples (literally: Red apples please me).', ar: 'يعجبني التفاح الأحمر.', note: 'gustan + plural' },
      { es: 'A nosotros nos gusta viajar en tren.', en: 'We like to travel by train (traveling is singular infinitive).', ar: 'يعجبنا السفر بالقطار.', note: 'nos gusta + infinitive' }
    ],
    commonMistakes: [
      {
        incorrect: 'Yo gusto los tacos.',
        correct: 'Me gustan los tacos.',
        reason_en: 'You cannot conjugate gustar directly with Yo as subject to mean "I like".',
        reason_ar: 'لا يمكن تصريف فعل gustar مباشرة مع الفاعل Yo ليعني "أنا أحب".'
      }
    ],
    quickQuiz: [
      {
        question_es: 'A Juan y a María ______ la música española.',
        question_en: 'Juan and María like Spanish music.',
        question_ar: 'خوان وماريا تعجبهما الموسيقى الإسبانية.',
        options: ['les gustan', 'les gusta', 'nos gusta', 'le gusta'],
        answerIdx: 1,
        explanation_en: '"la música" is singular, so we use "gusta", and "Juan y María" is represented by "les".',
        explanation_ar: '"الموسيقى" مفرد فتأخذ gusta، بينما خوان وماريا جمع غائب فيأخذان الضمير les.'
      }
    ]
  },
  {
    id: 'g-saber-conocer',
    unit: 3,
    title_es: 'Saber vs Conocer: Dos formas de saber',
    title_en: 'Saber vs Conocer: Knowing Facts vs People',
    title_ar: 'Saber مقابل Conocer: وجهان للمعرفة',
    cefr: 'A2',
    category: 'verbs',
    summary_en: 'Saber is used for facts, information, and skills (knowing how to do something). Conocer is used for people, places, and artistic works (being familiar with).',
    summary_ar: 'يُستخدم Saber لمعرفة الحقائق، المعلومات، والمهارات (معرفة كيفية فعل شيء). بينما يُستخدم Conocer لمعرفة الأشخاص، الأماكن، وتذوق الأعمال الفنية (الدرابة والتعارف).',
    formula: 'Saber = Information / How-to | Conocer = Person / Place / Familiarity',
    fullContent_en: `### 1. When to use SABER:
- **Facts & Information**: *Sé que Madrid es la capital.* (I know Madrid is the capital.)
- **Skills (Saber + Infinitive)**: *Sé hablar español.* (I know how to speak Spanish.)

### 2. When to use CONOCER:
- **People**: *Conozco a tu hermano.* (I know your brother. Note the "personal a").
- **Places**: *Conozco Barcelona.* (I am familiar with/have visited Barcelona.)
- **Familiarity**: *Conozco esa canción.* (I know that song.)

### Irregular "Yo" Forms in Present:
- Saber -> **Yo sé** (rest are regular: *sabes, sabe...*)
- Conocer -> **Yo conozco** (rest are regular: *conoces, conoce...*)`,
    fullContent_ar: `### 1. متى نستخدم SABER:
- **الحقائق والمعلومات**: *Sé tu número.* (أعرف رقمك.)
- **المهارات والقدرات (Saber + المصدر)**: *Sé nadar.* (أعرف كيف أسبح.)

### 2. متى نستخدم CONOCER:
- **الأشخاص**: *Conozco a tu padre.* (أعرف والدك. لاحظ استخدام a الشخصية).
- **الأماكن**: *Conozco Madrid.* (أعرف مدريد / زرتها ومطلع عليها.)
- **المعرفة والدرابة**: *Conozco el arte moderno.* (أعرف الفن الحديث / مطلع عليه).

### تصريف المتحدث الشاذ في المضارع:
- Saber -> **Yo sé** (باقي التصريفات قياسية: *sabes, sabe...*)
- Conocer -> **Yo conozco** (باقي التصريفات قياسية: *conoces, conoce...*)`,
    examples: [
      { es: 'Yo sé tocar la guitarra.', en: 'I know how to play the guitar (skill).', ar: 'أنا أعرف كيف أعزف على الجيتار (مهارة).', note: 'saber + infinitive' },
      { es: '¿Conoces a María?', en: 'Do you know María? (acquaintance with a person).', ar: 'هل تعرف ماريا؟ (شخص).', note: 'conocer + a' }
    ],
    commonMistakes: [
      {
        incorrect: 'Sé a tu amigo.',
        correct: 'Conozco a tu amigo.',
        reason_en: 'To know a person always requires Conocer.',
        reason_ar: 'معرفة الأشخاص تتطلب دائماً فعل Conocer وليس Saber.'
      }
    ],
    quickQuiz: [
      {
        question_es: 'Yo ______ que la biblioteca cierra temprano hoy.',
        question_en: 'I know that the library closes early today.',
        question_ar: 'أنا أعلم أن المكتبة تغلق مبكراً اليوم.',
        options: ['conozco', 'sé', 'sabo', 'conoces'],
        answerIdx: 1,
        explanation_en: '"Yo sé" is the irregular first-person present of saber, used for facts.',
        explanation_ar: 'sé هي تصريف المتحدث الشاذ لفعل saber المستخدم للحقائق.'
      }
    ]
  },
  {
    id: 'g-stem-changers',
    unit: 3,
    title_es: 'Verbos con Cambio de Raíz en Presente',
    title_en: 'Present Tense Stem-Changing Verbs',
    title_ar: 'الأفعال متغيرة الجذر في المضارع',
    cefr: 'A2',
    category: 'verbs',
    summary_en: 'Stem-changing verbs undergo a vowel change in their root (e->ie, o->ue, e->i) for all forms except nosotros and vosotros (the "boot" pattern).',
    summary_ar: 'الأفعال متغيرة الجذر يطرأ عليها تغير في حرف العلة الأصلي (e->ie, o->ue, e->i) في جميع التصريفات عدا nosotros و vosotros (رسم الحذاء البوت).',
    formula: 'Stem changes inside the Boot (Yo, Tú, Él, Ellos) | Outside remains regular!',
    fullContent_en: `### Vowel Change Families:
1. **e -> ie** (*Querer* - to want):
   - Yo **quiero** | Nosotros **queremos**
   - Tú **quieres** | Vosotros **queréis**
   - Él **quiere** | Ellos **quieren**

2. **o -> ue** (*Poder* - to be able to):
   - Yo **puedo** | Nosotros **podemos**
   - Tú **puedes** | Vosotros **podéis**
   - Él **puede** | Ellos **pueden**

3. **e -> i** (*Pedir* - to ask for):
   - Yo **pido** | Nosotros **pedimos**
   - Tú **pides** | Vosotros **pedís**
   - Él **pide** | Ellos **piden**`,
    fullContent_ar: `### عائلات التغير الصوتي للجذر:
1. **التغير e -> ie** (مثل فعل *Querer* - يريد):
   - Yo **quiero** | Nosotros **queremos** (بدون تغيير)
   - Tú **quieres** | Vosotros **queréis** (بدون تغيير)
   - Él **quiere** | Ellos **quieren**

2. **التغير o -> ue** (مثل فعل *Poder* - يستطيع):
   - Yo **puedo** | Nosotros **podemos** (بدون تغيير)
   - Tú **puedes** | Vosotros **podéis** (بدون تغيير)
   - Él **puede** | Ellos **pueden**

3. **التغير e -> i** (مثل فعل *Pedir* - يطلب):
   - Yo **pido** | Nosotros **pedimos** (بدون تغيير)
   - Tú **pides** | Vosotros **pedís** (بدون تغيير)
   - Él **pide** | Ellos **piden**`,
    examples: [
      { es: 'Ellos almuerzan a las dos.', en: 'They eat lunch at 2:00 (almorzar o->ue).', ar: 'هم يتناولون الغداء في الثانية (almorzar).', note: 'o -> ue change' },
      { es: 'Nosotros queremos aprender más.', en: 'We want to learn more (no change in nosotros).', ar: 'نحن نريد أن نتعلم أكثر (لا يوجد تغيير مع nosotros).', note: 'no change form' }
    ],
    commonMistakes: [
      {
        incorrect: 'Nosotros quieremos un coche nuevo.',
        correct: 'Nosotros queremos un coche nuevo.',
        reason_en: 'Stem changes NEVER occur in the nosotros or vosotros forms.',
        reason_ar: 'التغير في الجذر لا يحدث أبداً مع الضمائر nosotros و vosotros.'
      }
    ],
    quickQuiz: [
      {
        question_es: '¿Cómo se conjuga el verbo "entender" (e->ie) para "tú"?',
        question_en: 'How do you conjugate "entender" for "tú"?',
        question_ar: 'كيف تصرف فعل "entender" (يفهم - e->ie) مع الضمير "tú"؟',
        options: ['entendes', 'entiendes', 'entiendes', 'entiendo'],
        answerIdx: 1,
        explanation_en: '"entender" is e->ie, so the tú form is "entiendes".',
        explanation_ar: '"entender" يتبع e->ie، وتصريفه مع tú هو entiendes.'
      }
    ]
  },

  // UNIT 4: Object Pronouns
  {
    id: 'g-direct-objects',
    unit: 4,
    title_es: 'Pronombres de Objeto Directo',
    title_en: 'Direct Object Pronouns',
    title_ar: 'ضمائر المفعول به المباشر',
    cefr: 'A2',
    category: 'pronouns_se',
    summary_en: 'Direct object pronouns (lo, la, los, las) replace the noun that directly receives the action of the verb. They must match in gender and number and are placed before conjugated verbs.',
    summary_ar: 'تستبدل ضمائر المفعول المباشر (lo, la, los, las) الاسم الذي يقع عليه الفعل مباشرة. يجب أن تطابق الاسم جنساً وعدداً، وتوضع قبل الأفعال المصرفة.',
    formula: 'Pronoun + Conjugated Verb | Replaces the WHAT of the action',
    fullContent_en: `### Direct Object Pronoun Chart:
- Me (me) | Nos (us)
- Te (you) | Os (you all)
- **Lo** (him / it masc) | **Los** (them masc)
- **La** (her / it fem) | **Las** (them fem)

### Pronoun Placement Rules:
1. **Before conjugated verbs**: *Yo lo compro.* (I buy it.)
2. **Attached to infinitives**: *Quiero comprarlo.* (I want to buy it.)
3. **Attached to gerunds**: *Estoy comprándolo.* (I am buying it.)`,
    fullContent_ar: `### جدول ضمائر المفعول به المباشر:
- Me (ني) | Nos (نا)
- Te (ك) | Os (كم)
- **Lo** (هـ / مذكر) | **Los** (هم / جمع مذكر)
- **La** (ها / مؤنث) | **Las** (هن / جمع مؤنث)

### قواعد وضع الضمير في الجملة:
1. **قبل الأفعال المصرفة**: *Yo lo compro.* (أنا أشتريه.)
2. **متصلة بآخر الفعل المصدر**: *Quiero comprarlo.* (أريد شراءه.)
3. **متصلة بآخر اسم الفاعل المستمر**: *Estoy comprándolo.* (أنا مستمر في شرائه.)`,
    examples: [
      { es: '¿Has leído la novela? No, no la he leído.', en: 'Have you read the novel? No, I have not read it (la replaces la novela).', ar: 'هل قرأت الرواية؟ لا، لم أقرأها.', note: 'la replacement' },
      { es: 'No veo el libro. Voy a buscarlo.', en: 'I do not see the book. I am going to look for it.', ar: 'لا أرى الكتاب. سأبحث عنه (buscarlo).', note: 'attached form' }
    ],
    commonMistakes: [
      {
        incorrect: 'Compré la revista y lo leí.',
        correct: 'Compré la revista y la leí.',
        reason_en: 'Since "revista" is feminine, the pronoun must be "la", not "lo".',
        reason_ar: 'بما أن كلمة revista اسم مؤنث، يجب استخدام الضمير la بدلاً من lo.'
      }
    ],
    quickQuiz: [
      {
        question_es: '¿Dónde pones el pronombre en "Yo quiero comprar el coche"?',
        question_en: 'Where do you put the pronoun in "Yo quiero comprar el coche"?',
        question_ar: 'أين تضع الضمير في جملة "Yo quiero comprar el coche"؟',
        options: ['Yo lo quiero comprar', 'Yo quiero comprarlo', 'Ambas son correctas', 'Yo comprar lo quiero'],
        answerIdx: 2,
        explanation_en: 'With a conjugated verb + infinitive, you can put the pronoun either before the conjugated verb or attached to the infinitive.',
        explanation_ar: 'مع وجود فعل مصرف يليه مصدر، يمكنك وضع الضمير قبل الفعل المصرف أو ملتصقاً بالمصدر.'
      }
    ]
  },
  {
    id: 'g-indirect-objects',
    unit: 4,
    title_es: 'Pronombres de Objeto Indirecto',
    title_en: 'Indirect Object Pronouns',
    title_ar: 'ضمائر المفعول به غير المباشر',
    cefr: 'A2',
    category: 'pronouns_se',
    summary_en: 'Indirect object pronouns (me, te, le, nos, os, les) answer the question "to whom" or "for whom" the action is done.',
    summary_ar: 'تجيب ضمائر المفعول به غير المباشر (me, te, le, nos, os, les) عن السؤال "لمن" أو "لأجل من" يُفعل هذا الفعل.',
    formula: 'Pronoun + Conjugated Verb | Replaces the WHO is receiving the benefits',
    fullContent_en: `### Indirect Object Pronoun Chart:
- Me (to/for me) | Nos (to/for us)
- Te (to/for you) | Os (to/for you all)
- **Le** (to/for him, her, you formal) | **Les** (to/for them, you all)

### Double Representation:
Spanish often uses BOTH the indirect pronoun and the specific recipient noun in the same sentence for clarity:
- *Le di el libro a Juan.* (I gave the book to Juan. Literally: To him I gave the book to Juan.)`,
    fullContent_ar: `### جدول ضمائر المفعول غير المباشر:
- Me (لي) | Nos (لنا)
- Te (لك) | Os (لكم)
- **Le** (له / لها / لحضرتك) | **Les** (لهم / لهن)

### التكرار التوضيحي للضمير:
تتطلب الإسبانية في العادة ذكر كل من ضمير المفعول غير المباشر والاسم المستلم الفعلي معاً في نفس الجملة:
- *Le di el dinero a María.* (أعطيت النقود لماريا - حرفياً: لها أعطيت النقود لماريا).`,
    examples: [
      { es: 'Él me compró un regalo.', en: 'He bought a gift for me.', ar: 'هو اشترى هدية لي.', note: 'me comprar' },
      { es: 'Le escribo una carta a mi abuelo.', en: 'I am writing a letter to my grandfather (le is mandatory here).', ar: 'أنا أكتب رسالة لجدي.', note: 'le... a mi abuelo' }
    ],
    commonMistakes: [
      {
        incorrect: 'Escribo a Juan.',
        correct: 'Le escribo a Juan.',
        reason_en: 'In Spanish, the indirect pronoun "le" must be included even if "a Juan" is explicitly mentioned.',
        reason_ar: 'في الإسبانية، من الإلزامي ذكر الضمير le حتى لو تم تحديد الاسم (a Juan) صراحة.'
      }
    ],
    quickQuiz: [
      {
        question_es: '¿Cómo se dice "I send them a message" en español?',
        question_en: 'How do you say "I send them a message"?',
        question_ar: 'كيف تقول "أنا أرسل لهم رسالة"؟',
        options: ['Les envío un mensaje', 'Envío les un mensaje', 'Los envío un mensaje', 'Le envío un mensaje'],
        answerIdx: 0,
        explanation_en: '"Les" is the indirect object pronoun for "them" and is placed before the verb "envío".',
        explanation_ar: '"Les" هي ضمير المفعول غير المباشر لـ "هم" وتوضع قبل الفعل.'
      }
    ]
  },
  {
    id: 'g-double-objects',
    unit: 4,
    title_es: 'Pronombres de Doble Objeto y la regla "Se"',
    title_en: 'Double Object Pronouns & "Se" Rule',
    title_ar: 'ضمائر المفعول المزدوج وقاعدة "Se"',
    cefr: 'B1',
    category: 'pronouns_se',
    summary_en: 'When both direct and indirect object pronouns are used together, the indirect pronoun always comes first. If both begin with "L", the indirect pronoun changes to "se".',
    summary_ar: 'عند استخدام ضميري المفعول المباشر وغير المباشر معاً، يسبق غير المباشر المباشر دائماً. إذا بدأ كلا الضميرين بحرف L، يتحول الضمير غير المباشر إلى "se".',
    formula: 'Indirect (me/te/le/nos/les) + Direct (lo/la/los/las) | "le lo" becomes "se lo"',
    fullContent_en: `### 1. Pronoun Order Rule:
**People before things** (Indirect Object pronoun comes before Direct Object pronoun).
- *Te lo doy.* (I give it to you. *Te* = to you, *lo* = it).

### 2. The "La-Lo-La" La Var Rule (The "Se" Rule):
You cannot say *le lo*, *le la*, *les los*, *les las*. Pronouncing two "L" pronouns together is considered phonetically unpleasant in Spanish. 
Therefore, **le** and **les** change to **se** when followed by **lo, la, los, las**:
- *Le doy el regalo a ella.* -> *Se lo doy.* (I give it to her. *Se* = to her, *lo* = it).`,
    fullContent_ar: `### 1. قاعدة ترتيب الضمائر:
**الشخص يسبق الشيء دائماً** (ضمير المفعول غير المباشر يأتي قبل المباشر).
- *Te lo doy.* (أنا أعطيك إياه. *Te* = لك، *lo* = إياه).

### 2. قاعدة تحويل اللام الكثيرة (قاعدة "Se"):
في اللغة الإسبانية لا يصح اجتماع ضميرين يبدآن بحرف "L" متتاليين (مثل *le lo* أو *les la*). لتسهيل النطق، يتحول **le** و **les** إلى **se**:
- *Le doy el libro a él.* -> *Se lo doy.* (أنا أعطيه إياه. *Se* بديلة لـ le، و *lo* تعود على الكتاب).`,
    examples: [
      { es: '¿Te dio las llaves? Sí, me las dio.', en: 'Did he give you the keys? Yes, he gave them to me.', ar: 'هل أعطاك المفاتيح؟ نعم، أعطاني إياها.', note: 'me las' },
      { es: '¿Le prestaste el dinero a Carlos? Sí, se lo presté.', en: 'Did you lend the money to Carlos? Yes, I lent it to him (se replaces le).', ar: 'هل أقرضت المال لكارلوس؟ نعم، أقرضته إياه (se lo).', note: 'se lo' }
    ],
    commonMistakes: [
      {
        incorrect: 'Le lo di ayer.',
        correct: 'Se lo di ayer.',
        reason_en: '"le lo" must change to "se lo" due to phonetic restrictions.',
        reason_ar: 'يجب تبديل le إلى se لمنع تتابع حرف الـ L ثنائياً.'
      }
    ],
    quickQuiz: [
      {
        question_es: 'Transforma: "Ella escribe una carta a nosotros".',
        question_en: 'Transform: "She writes a letter to us".',
        question_ar: 'حول الجملة: "Ella escribe una carta a nosotros".',
        options: ['Ella nos la escribe', 'Ella escribe nos la', 'Ella se la escribe', 'Ella nos lo escribe'],
        answerIdx: 0,
        explanation_en: '"nos" (to us) comes first, and "la" replaces "la carta". Hence: "nos la".',
        explanation_ar: '"nos" تعني لنا وتأتي أولاً، وتستبدل "la" الرسالة (carta)، لتصبح "nos la".'
      }
    ]
  },

  // UNIT 5: Narrative Past
  {
    id: 'g-preterite',
    unit: 5,
    title_es: 'Pretérito Indefinido: Acciones Pasadas',
    title_en: 'Preterite Tense: Completed Past Actions',
    title_ar: 'الماضي البسيط: أحداث منتهية',
    cefr: 'A2',
    category: 'verbs',
    summary_en: 'The Preterite tense is used to talk about specific, completed actions in the past with definite starting and ending points.',
    summary_ar: 'يُستخدم زمن الماضي البسيط (Pretérito Indefinido) للتعبير عن أحداث محددة ومكتملة تماماً في الماضي مع تحديد بدايتها ونهايتها.',
    formula: 'Drop AR/ER/IR + Add Preterite Conjugation Endings',
    fullContent_en: `### 1. Regular Preterite Endings:
- **-AR Verbs** (*Hablar*):
  - Yo: **-é** (*hablé*) | Nosotros: **-amos** (*hablamos*)
  - Tú: **-aste** (*hablaste*) | Vosotros: **-asteis** (*hablasteis*)
  - Él: **-ó** (*habló*) | Ellos: **-aron** (*hablaron*)

- **-ER / -IR Verbs** (*Comer* / *Vivir*):
  - Yo: **-í** (*comí*) | Nosotros: **-imos** (*comimos*)
  - Tú: **-iste** (*comiste*) | Vosotros: **-isteis** (*comisteis*)
  - Él: **-ió** (*comió*) | Ellos: **-ieron** (*comieron*)

### 2. Key Irregular Verbs:
- **Fui** (Ir/Ser): *fui, fuiste, fue, fuimos, fuisteis, fueron*
- **Hice** (Hacer): *hice, hiciste, hizo, hicimos, hicisteis, hicieron*`,
    fullContent_ar: `### 1. نهايات الماضي البسيط القياسي:
- **أفعال -AR** (مثل *Hablar* - تحدث):
  - Yo: **-é** (*hablé*) | Nosotros: **-amos** (*hablamos*)
  - Tú: **-aste** (*hablaste*)
  - Él: **-ó** (*habló*) | Ellos: **-aron** (*hablaron*)

- **أفعال -ER / -IR** (مثل *Comer* - أكل):
  - Yo: **-í** (*comí*) | Nosotros: **-imos** (*comimos*)
  - Tú: **-iste** (*comiste*)
  - Él: **-ió** (*comió*) | Ellos: **-ieron** (*comieron*)

### 2. أفعال شاذة هامة جداً:
- **Fui** (فعل الذهاب ir وفعل الكينونة ser): *fui, fuiste, fue, fuimos, fuisteis, fueron*
- **Hice** (فعل يفعل hacer): *hice, hiciste, hizo, hicimos, hicisteis, hicieron*`,
    examples: [
      { es: 'Ayer compré un teléfono nuevo.', en: 'Yesterday I bought a new phone.', ar: 'أمس اشتريت هاتفاً جديداً.', note: 'compré' },
      { es: 'Nosotros fuimos al museo el sábado.', en: 'We went to the museum on Saturday.', ar: 'نحن ذهبنا إلى المتحف يوم السبت.', note: 'fuimos (Ir)' }
    ],
    commonMistakes: [
      {
        incorrect: 'El año pasado yo viajo a España.',
        correct: 'El año pasado yo viajé a España.',
        reason_en: '"El año pasado" requires the past preterite form (viajé) rather than present.',
        reason_ar: 'الظرف الزمنية "العام الماضي" يستوجب الماضي البسيط (viajé) وليس المضارع.'
      }
    ],
    quickQuiz: [
      {
        question_es: '¿Cómo se escribe la forma "Él hacer" en el pretérito?',
        question_en: 'What is the "Él" form of "hacer" in the preterite?',
        question_ar: 'ما هي صيغة "Él" لفعل "hacer" (يفعل) في الماضي البسيط؟',
        options: ['hició', 'hizo', 'hace', 'hice'],
        answerIdx: 1,
        explanation_en: '"hacer" is irregular; the third-person singular form is "hizo" to preserve pronunciation.',
        explanation_ar: '"hacer" فعل شاذ، تصريفه مع él هو hizo.'
      }
    ]
  },

  // UNIT 6: Past Tenses II
  {
    id: 'g-imperfect',
    unit: 6,
    title_es: 'Pretérito Imperfecto: Descripciones Pasadas',
    title_en: 'Imperfect Tense: Past Habits & Descriptions',
    title_ar: 'الماضي المستمر: العادات والوصف',
    cefr: 'A2',
    category: 'verbs',
    summary_en: 'The Imperfect tense sets the scene, narrates habitual past actions ("used to"), and describes ongoing background states, age, and time in the past.',
    summary_ar: 'يُستخدم زمن الماضي المستمر (Imperfecto) لوصف المشهد الخلفي، وتصوير العادات المتكررة في الماضي (كان يفعل)، ووصف الأحوال المستمرة، والعمر والوقت.',
    formula: 'AR -> -aba | ER/IR -> -ía (Used for routines and descriptions)',
    fullContent_en: `### 1. Regular Imperfect Endings:
- **-AR Verbs** (*Hablar*):
  - Yo: **-aba** | Nosotros: **-ábamos**
  - Tú: **-abas** | Vosotros: **-abais**
  - Él: **-aba** | Ellos: **-aban**

- **-ER / -IR Verbs** (*Comer* / *Vivir*):
  - Yo: **-ía** | Nosotros: **-íamos**
  - Tú: **-ías** | Vosotros: **-íais**
  - Él: **-ía** | Ellos: **-ían**

### 2. Only Three Irregular Verbs in Imperfect:
- **Ir** (to go): *iba, ibas, iba, íbamos, ibais, iban*
- **Ser** (to be): *era, eras, era, éramos, erais, eran*
- **Ver** (to see): *veía, veías, veía, veíamos, veíais, veían*`,
    fullContent_ar: `### 1. نهايات الماضي المستمر القياسي:
- **أفعال -AR** (مثل *Hablar* - تحدث):
  - Yo: **-aba** | Nosotros: **-ábamos**
  - Tú: **-abas**
  - Él: **-aba** | Ellos: **-aban**

- **أفعال -ER / -IR** (مثل *Comer* - أكل):
  - Yo: **-ía** | Nosotros: **-íamos**
  - Tú: **-ías**
  - Él: **-ía** | Ellos: **-ían**

### 2. ثلاثة أفعال شاذة فقط في الماضي المستمر:
- **Ir** (يذهب): *iba, ibas, iba, íbamos, ibais, iban*
- **Ser** (يكون): *era, eras, era, éramos, erais, eran*
- **Ver** (يرى): *veía, veías, veía, veíamos, veíais, veían*`,
    examples: [
      { es: 'Cuando era niño, jugaba al fútbol todos los días.', en: 'When I was a child, I used to play football every day.', ar: 'عندما كنت طفلاً، كنت ألعب كرة القدم يومياً.', note: 'habitual past' },
      { es: 'Hacía mucho frío y llovía.', en: 'It was very cold and it was raining (descriptions).', ar: 'كان الجو بارداً جداً وكانت تمطر (وصف الجو).', note: 'description' }
    ],
    commonMistakes: [
      {
        incorrect: 'Nosotros escribiamos poesía.',
        correct: 'Nosotros escribíamos poesía.',
        reason_en: 'All "nosotros" forms in the imperfect have written accent marks (ábamos / íamos).',
        reason_ar: 'كل تصريفات nosotros في الـ Imperfecto تحتوي على علامة نبرة كتابية (tilde) مثل íamos.'
      }
    ],
    quickQuiz: [
      {
        question_es: '¿Cuál es la forma del verbo "ser" para "nosotros" en el imperfecto?',
        question_en: 'What is the "nosotros" form of "ser" in the imperfect?',
        question_ar: 'ما هي صيغة nosotros لفعل "ser" في الماضي المستمر؟',
        options: ['seríamos', 'éramos', 'eramos', 'fuimos'],
        answerIdx: 1,
        explanation_en: '"ser" is irregular; its nosotros form is éramos (requires an accent mark).',
        explanation_ar: '"ser" فعل شاذ في هذا الزمن، وصيغته هي éramos بالـ tilde.'
      }
    ]
  },
  {
    id: 'g-past-tenses',
    unit: 6,
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

  // UNIT 7: Routine & Pronouns
  {
    id: 'g-reflexives',
    unit: 7,
    title_es: 'Verbos Reflexivos y Rutina Diaria',
    title_en: 'Reflexive Verbs & Daily Routine',
    title_ar: 'الأفعال الانعكاسية والروتين اليومي',
    cefr: 'A2',
    category: 'verbs',
    summary_en: 'Reflexive verbs indicate that the subject performs the action on itself (e.g., wash oneself). They require a reflexive pronoun (me, te, se, nos, os, se).',
    summary_ar: 'الأفعال الانعكاسية تدل على أن الفاعل يمارس الفعل على نفسه (مثل: يغتسل). تتطلب استخدام ضمائر الانعكاس (me, te, se, nos, os, se).',
    formula: 'Reflexive Pronoun + Verb Conjugation | Replaces "oneself"',
    fullContent_en: `### Reflexive Pronoun Chart:
- Yo: **me** (*me lavo* - I wash myself)
- Tú: **te** (*te lavas* - you wash yourself)
- Él/Ella/Ud: **se** (*se lava* - he/she washes himself/herself)
- Nosotros: **nos** (*nos lavamos* - we wash ourselves)
- Vosotros: **os** (*os laváis* - you all wash yourselves)
- Ellos/Ellas/Uds: **se** (*se lavan* - they wash themselves)

### Infinitive Ending:
Reflexive verbs are identified in the dictionary by the **-se** attached to their infinitive form (e.g., *lavarse*, *despertarse*, *vestirse*).`,
    fullContent_ar: `### جدول ضمائر الانعكاس:
- Yo: **me** (مثل *me lavo* - أنا أغسل نفسي)
- Tú: **te** (مثل *te lavas* - أنت تغسل نفسك)
- Él/Ella/Ud: **se** (مثل *se lava* - هو يغسل نفسه)
- Nosotros: **nos** (مثل *nos lavamos* - نحن نغسل أنفسنا)
- Vosotros: **os** (مثل *os laváis* - أنتم تغسلون أنفسكم)
- Ellos/Ellas/Uds: **se** (مثل *se lavan* - هم يغسلون أنفسهم)

### صيغة المصدر الانعكاسي:
تتميز الأفعال الانعكاسية بانتهاء مصدرها بالضمير **-se** في القاموس (مثل *lavarse* - الاستحمام، *despertarse* - الاستيقاظ).`,
    examples: [
      { es: 'Yo me despierto a las siete de la mañana.', en: 'I wake up at seven in the morning (despertarse).', ar: 'أنا أستيقظ في السابعة صباحاً.', note: 'me despierto' },
      { es: 'Ellos van a lavarse las manos.', en: 'They are going to wash their hands (pronoun attached to infinitive).', ar: 'هم ذاهبون لغسل أيديهم (lavarse).', note: 'lavarse' }
    ],
    commonMistakes: [
      {
        incorrect: 'Yo lavo mi pelo.',
        correct: 'Me lavo el pelo.',
        reason_en: 'Actions on one’s own body use reflexive verbs and definite articles, not possessives (el pelo, not mi pelo).',
        reason_ar: 'العمليات الواقعة على أجزاء الجسد تتطلب أفعالاً انعكاسية وأداة تعريف، وليس صفة ملكية (el pelo وليس mi pelo).'
      }
    ],
    quickQuiz: [
      {
        question_es: '¿Cómo se dice "We brush our teeth" en español?',
        question_en: 'How do you say "We brush our teeth"?',
        question_ar: 'كيف تقول "نحن ننظف أسناننا بالفرشاة"؟',
        options: ['Nos lavamos los dientes', 'Lavamonos los dientes', 'Nosotros lavamos nuestros dientes', 'Se lavan los dientes'],
        answerIdx: 0,
        explanation_en: 'Reflexive "nos" is placed before the nosotros form of the verb, and "los" article is used for body parts.',
        explanation_ar: 'يوضع الضمير nos قبل الفعل، ونستخدم أداة التعريف los لأجزاء الجسد.'
      }
    ]
  },
  {
    id: 'g-por-vs-para',
    unit: 7,
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
    id: 'g-demonstratives',
    unit: 7,
    title_es: 'Adjetivos y Pronombres Demostrativos',
    title_en: 'Demonstrative Adjectives & Pronouns',
    title_ar: 'أسماء الإشارة والصفات الإشارية',
    cefr: 'A2',
    category: 'foundations',
    summary_en: 'Demonstrative adjectives point out specific nouns based on distance from the speaker. They must agree in gender and number with the noun.',
    summary_ar: 'تشير صفات الإشارة إلى أسماء محددة بناءً على المسافة الجغرافية من المتحدث. يجب أن تطابق الاسم الموصوف في الجنس والعدد.',
    formula: 'This & These have T’s (este/esta) | That & Those don’t (ese/esa) | Far away has AQU- (aquel/aquella)',
    fullContent_en: `### Three Degrees of Distance in Spanish:

1. **Close (Here - *aquí*):**
   - Masculine: **este** (singular) | **estos** (plural)
   - Feminine: **esta** (singular) | **estas** (plural)
   - *Este libro* (This book here)

2. **Medium Distance (There - *allí*):**
   - Masculine: **ese** (singular) | **esos** (plural)
   - Feminine: **esa** (singular) | **esas** (plural)
   - *Esa mesa* (That table there)

3. **Far Away (Over There - *allá*):**
   - Masculine: **aquel** (singular) | **aquellos** (plural)
   - Feminine: **aquella** (singular) | **aquellas** (plural)
   - *Aquel árbol* (That tree way over there)`,
    fullContent_ar: `### درجات البعد الثلاث لأسماء الإشارة:

1. **القريب جداً (هنا - *aquí*):**
   - المذكر: **este** (مفرد) | **estos** (جمع)
   - المؤنث: **esta** (مفرد) | **estas** (جمع)
   - *Este libro* (هذا الكتاب هنا)

2. **المتوسط البعد (هناك - *allí*):**
   - المذكر: **ese** (مفرد) | **esos** (جمع)
   - المؤنث: **esa** (مفرد) | **esas** (جمع)
   - *Esa mesa* (تلك الطاولة هناك)

3. **البعيد جداً (هنالك في الأفق - *allá*):**
   - المذكر: **aquel** (مفرد) | **aquellos** (جمع)
   - المؤنث: **aquella** (مفرد) | **aquellas** (جمع)
   - *Aquel árbol* (ذلك الشجر البعيد جداً هناك)`,
    examples: [
      { es: 'Esta manzana está muy dulce.', en: 'This apple here is very sweet.', ar: 'هذه التفاحة هنا حلوة جداً.', note: 'esta (close)' },
      { es: 'Prefiero aquellos zapatos de allí.', en: 'I prefer those shoes over there (far away).', ar: 'أنا أفضل تلك الأحذية البعيدة هناك في الأفق.', note: 'aquellos (far away)' }
    ],
    commonMistakes: [
      {
        incorrect: 'Me gustan estos libros, pero prefiero esos de aquí.',
        correct: 'Me gustan estos libros de aquí, pero prefiero esos de allí.',
        reason_en: 'Make sure "estos" aligns with close items ("aquí") and "esos" with medium-distance items ("allí").',
        reason_ar: 'تأكد من مطابقة este للقريب (aquí) ومطابقة ese للبعيد النسبي (allí).'
      }
    ],
    quickQuiz: [
      {
        question_es: '¿Cómo se dice "These shoes" (shoes = zapatos, masc plural)?',
        question_en: 'How do you say "These shoes"?',
        question_ar: 'كيف تقول "هذه الأحذية"؟',
        options: ['Estos zapatos', 'Estes zapatos', 'Esos zapatos', 'Estas zapatos'],
        answerIdx: 0,
        explanation_en: '"zapatos" is masculine plural; "these" is "estos". ("estes" does not exist in Spanish).',
        explanation_ar: '"zapatos" جمع مذكر؛ واسم الإشارة المقابل هو estos (لا توجد كلمة estes في الإسبانية).'
      }
    ]
  },

  // UNIT 8: The Subjunctive Mood
  {
    id: 'g-subjunctive-present',
    unit: 8,
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
  },

  // UNIT 9: Advanced Compound Tenses
  {
    id: 'g-present-perfect',
    unit: 9,
    title_es: 'Pretérito Perfecto Compuesto: Experiencias Recientes',
    title_en: 'Present Perfect Tense: Recent Experiences',
    title_ar: 'الماضي القريب / التام الحالي',
    cefr: 'B1',
    category: 'verbs',
    summary_en: 'The Present Perfect is used to talk about actions that started in the past but are still relevant to the present. It uses the helper verb HABER + Past Participle.',
    summary_ar: 'يُستخدم زمن الماضي القريب (Present Perfect) للتحدث عن أفعال وقعت مؤخراً ولها اتصال بالزمن الحاضر. يُصاغ باستخدام الفعل المساعد HABER + اسم المفعول.',
    formula: 'Haber (he/has/ha/hemos/habéis/han) + Participle (AR -> ado, ER/IR -> ido)',
    fullContent_en: `### 1. Helper Verb "Haber" Conjugation:
- Yo **he** | Nosotros **hemos**
- Tú **has** | Vosotros **habéis**
- Él **ha** | Ellos **han**

### 2. Formulating the Past Participle:
- **-AR verbs** add **-ado**: *hablar* -> *hablado*
- **-ER / -IR verbs** add **-ido**: *comer* -> *comido*, *vivir* -> *vivido*

### 3. Key Irregular Participles (MUST KNOW):
- **Hacer** (to make/do) -> *hecho*
- **Ver** (to see) -> *visto*
- **Escribir** (to write) -> *escrito*
- **Decir** (to say) -> *dicho*
- **Abrir** (to open) -> *abierto*`,
    fullContent_ar: `### 1. تصريف الفعل المساعد "Haber" في المضارع:
- Yo **he** | Nosotros **hemos**
- Tú **has** | Vosotros **habéis**
- Él **ha** | Ellos **han**

### 2. صياغة اسم المفعول (Participio):
- أفعال **-AR**: نضيف **-ado** (مثل *hablar* -> *hablado*)
- أفعال **-ER / -IR**: نضيف **-ido** (مثل *comer* -> *comido*، *vivir* -> *vivido*)

### 3. أهم أسماء المفعول الشاذة:
- **Hacer** (يفعل) -> *hecho*
- **Ver** (يرى) -> *visto*
- **Escribir** (يكتب) -> *escrito*
- **Decir** (يقول) -> *dicho*
- **Abrir** (يفتح) -> *abierto*`,
    examples: [
      { es: 'Hoy he hablado con mi jefe.', en: 'Today I have spoken with my boss (recent action).', ar: 'اليوم تحدثتُ مع مديري.', note: 'he hablado' },
      { es: '¿Has escrito la carta?', en: 'Have you written the letter? (irregular written).', ar: 'هل كتبتَ الرسالة؟', note: 'has escrito' }
    ],
    commonMistakes: [
      {
        incorrect: 'Yo he comido ya y tú has comido ya.',
        correct: 'Yo ya he comido y tú ya has comido.',
        reason_en: 'Adverbs like "ya" (already) or "no" (not) should go BEFORE the helping verb "haber", never between "haber" and the participle.',
        reason_ar: 'الظروف مثل ya أو أدوات النفي no يجب أن تسبق الفعل المساعد haber ولا يمكن فصلها عن اسم المفعول.'
      }
    ],
    quickQuiz: [
      {
        question_es: '¿Cómo se dice "We have made the food" (hacer)?',
        question_en: 'How do you say "We have made the food"?',
        question_ar: 'كيف تقول "نحن أعددنا الطعام" (فعل hacer)؟',
        options: ['Hemos hecho la comida', 'Hemos hacido la comida', 'Hemos haciendo la comida', 'He hecho la comida'],
        answerIdx: 0,
        explanation_en: '"hacer" has an irregular past participle "hecho". Combined with "hemos" for nosotros: "Hemos hecho".',
        explanation_ar: '"hacer" له اسم مفعول شاذ وهو hecho. مع الضمير nosotros يُصاغ: Hemos hecho.'
      }
    ]
  }
];
