# HISPANO ACADEMY — 50 PRODUCTION ARCHITECTURAL & FIX PROMPTS
## Master Engineering, Pedagogical, and Platform Overhaul Blueprint

This document contains 50 comprehensive, production-grade prompts designed to systematically eliminate platform bugs, glitches, educational slop, database synchronization issues, and pedagogical shortcomings across the entire Hispano Academy platform.

---

### TABLE OF CONTENTS
1. [Domain 1: Second Language Acquisition (SLA) & Krashen i+1 Methodology (Prompts 1–6)](#domain-1-second-language-acquisition-sla--krashen-i1-methodology)
2. [Domain 2: Curriculum Progression, CEFR Mastery & Dialects (Prompts 7–13)](#domain-2-curriculum-progression-cefr-mastery--dialects)
3. [Domain 3: Rigorous Examination & DELE/SIELE Adaptive Assessment Engine (Prompts 14–19)](#domain-3-rigorous-examination--delesiele-adaptive-assessment-engine)
4. [Domain 4: Database Architecture, Firestore Hardening & Offline Sync (Prompts 20–25)](#domain-4-database-architecture-firestore-hardening--offline-sync)
5. [Domain 5: Interactive Reader & LingQ Vocabulary Pipeline (Prompts 26–31)](#domain-5-interactive-reader--lingq-vocabulary-pipeline)
6. [Domain 6: Audio Synthesis, Speech Recognition & Phonetic Engine (Prompts 32–37)](#domain-6-audio-synthesis-speech-recognition--phonetic-engine)
7. [Domain 7: Anti-Slop Elimination, Cultural Immersion & Elite UI/UX (Prompts 38–43)](#domain-7-anti-slop-elimination-cultural-immersion--elite-uiux)
8. [Domain 8: Glitch Elimination, Virtual Keyboard, Memory & PWA (Prompts 44–50)](#domain-8-glitch-elimination-virtual-keyboard-memory--pwa)

---

## Domain 1: Second Language Acquisition (SLA) & Krashen i+1 Methodology

### PROMPT 1: Algorithmic "i+1" Comprehensible Input Calibrator
```text
SYSTEM INSTRUCTION:
Implement an algorithmic Comprehensible Input Analyzer and Dynamic Text Calibrator based on Stephen Krashen's Second Language Acquisition Theory.

OBJECTIVE:
Transform raw Spanish texts and lesson exercises into precisely calibrated "i+1" content where exactly 90%–95% of vocabulary and grammar structures are known to the current learner, and 5%–10% are target acquisition items.

TARGET FILES:
- src/services/comprehensibleInputService.ts (new)
- src/types/curriculum.ts
- src/components/reader/LingQInteractiveReader.tsx
- src/context/AppContext.tsx

DETAILED SPECIFICATIONS:
1. Lexical Tokenization & Known-Word Coverage Engine:
   - Create `calculateComprehensibilityScore(text: string, userKnownLemmas: Set<string>): { ratio: number; targetWords: string[]; unknownWords: string[]; cefrDifficulty: CEFRLevel }`.
   - Strip punctuation, tokenize Spanish contractions (al -> a el, del -> de el), and lemmatize using an internal Spanish lemmatization mapping.
   - Calculate ratio: (knownTokens / totalTokens).
2. Dynamic Text Scaffolder:
   - If ratio < 0.85 (Too Difficult / Frustrating): automatically suggest contextual glosses, in-line cognate callouts (e.g., "revolución -> revolution"), and scaffolded grammar hints.
   - If ratio > 0.98 (Too Easy / Stagnant): automatically inject advanced synonyms, subjunctive triggers, or regional idiomatic expressions to elevate the text to the learner's actual frontier.
3. User Feedback & Frictionless Readability Index:
   - Calculate the Spanish Fernandez-Huerta and Gutierrez de Polini readability formulas directly on target texts to display a "Reading Ease Index" (0-100) next to the CEFR rating.
4. Acceptance Criteria:
   - Unit test suite verifying that a 500-word excerpt is correctly classified with known token ratio within 10ms.
   - Reader view displays a real-time badge: "Optimal i+1 (93% Known)" or "High Friction (78% Known - Scaffolding Enabled)".
```

### PROMPT 2: The Affective Filter Diminisher & Low-Stakes Feedback Loop
```text
SYSTEM INSTRUCTION:
Redesign the error-feedback and evaluation loop across all practice exercises to eliminate affective filter elevation (anxiety, self-consciousness, fear of failure) in Spanish learners.

OBJECTIVE:
Replace harsh red error states, heart-loss penalties, and punitive time limits with constructive cognitive re-framing, guided self-correction, and micro-repetition mechanics.

TARGET FILES:
- src/components/practice/ExerciseEngine.tsx
- src/components/practice/FeedbackBanner.tsx
- src/types/gamification.ts
- src/utils/soundEffects.ts

DETAILED SPECIFICATIONS:
1. No-Punishment Cognitive Correction:
   - Eliminate standard 3-heart failure lockouts. Replace with an "Exploration Energy" pool that never locks the user out of learning.
   - When an incorrect answer is submitted (e.g., using "por" instead of "para"):
     * Never display a loud red "WRONG!" banner.
     * Highlight the exact conflicting word and present a contrastive snippet: "Notice: 'para' denotes destination or purpose (hacia dónde), while 'por' marks cause or duration (a través de)."
     * Offer a 1-click "Try with Hint" prompt without deducting XP.
2. Form-Focused Micro-Echo:
   - Play a subtle natural pronunciation of the correct phrase using Web Audio API synthesis with a soft chime instead of an abrasive buzzer.
   - Allow the user to record their own audio replay to contrast with the native model without passing or failing them.
3. Acceptance Criteria:
   - Exercise completion rate increases without blocking user progress.
   - Soft pastel color transitions (#F59E0B for attention, #10B981 for success, #6366F1 for insight) replace severe #EF4444 alerts.
```

### PROMPT 3: Krashen Natural Order Hypothesis Tense Sequencer
```text
SYSTEM INSTRUCTION:
Restructure verb tense introduction and diagnostic checks to strictly adhere to empirical Natural Order Hypothesis studies for Spanish as a Foreign Language (ELE).

OBJECTIVE:
Prevent premature cognitive overload caused by introducing irregular subjunctive and conditional tenses before stabilizing aspectual distinctions (Pretérito Indefinido vs. Pretérito Imperfecto).

TARGET FILES:
- src/data/curriculumData.ts
- src/utils/tenseSequenceValidator.ts (new)
- src/components/curriculum/TenseRoadmapModal.tsx

DETAILED SPECIFICATIONS:
1. Strict Developmental Milestones:
   - Level 1: Presente de Indicativo (Regulars -> Boot verbs -> G-stem regulars -> Irregulars: ser/estar/ir/haber).
   - Level 2: Perífrasis de Futuro (ir + a + infinitivo) and Estar + Gerundio.
   - Level 3: Pretérito Perfecto Compuesto (haber + participio) for immediate past.
   - Level 4: Pretérito Indefinido (completed episodic events) vs. Pretérito Imperfecto (habitual/background states) with contrastive trigger anchors (ayer, siempre, mientras).
   - Level 5: Imperativo Afirmativo (tú/usted) with direct object pronoun placement.
   - Level 6: Presente de Subjuntivo (WEIRDOS: Wishes, Emotions, Impersonal, Recommendations, Doubt, Ojalá).
   - Level 7: Condicional Simple & Pretérito Pluscuamperfecto.
   - Level 8: Pretérito Imperfecto de Subjuntivo (-ra / -se) & Si-clauses (hypothetical conditionals).
2. Automated Prerequisite Enforcement:
   - Lock down Subjunctive modules until the learner achieves >= 85% mastery on both Indefinido and Imperfecto contrast modules.
   - Display visual milestone lock states with explicit explanations: "To master 'Ojalá vinieras', you must first solidify the baseline past tense aspect."
3. Acceptance Criteria:
   - Curriculum manifests exact prerequisite graph validation.
   - Learner profile stores milestone completion timestamps and blocks out-of-order cognitive skips unless an override placement test is completed.
```

### PROMPT 4: Swain Output Hypothesis & Communicative Pushed-Output Drills
```text
SYSTEM INSTRUCTION:
Implement Merrill Swain's Pushed-Output Hypothesis engine into the interactive practice system.

OBJECTIVE:
Move learners beyond passive recognition (multiple choice) into active linguistic production where learners notice the gap between what they intend to express and what they are capable of producing.

TARGET FILES:
- src/components/practice/PushedOutputDrill.tsx (new)
- src/components/practice/FreeProductionPrompt.tsx (new)
- src/services/grammarDiagnostics.ts

DETAILED SPECIFICATIONS:
1. Gap-Noticing Interactive Prompts:
   - Provide a target situation (e.g., "Explain to a pharmacist in Seville that you have had an upset stomach for three days and need a mild antacid").
   - Require written or spoken sentence production of at least 15 words.
2. Grammar Diagnostic & Target Re-cast:
   - Compare learner input against native corpus utterances.
   - Highlight missing agreements (gender/number concord, e.g., "dolores estomacales agudos").
   - Display a "Native Speaker Model" alongside learner output and prompt the learner to self-identify three syntactic differences before clicking continue.
3. Minimalist Scaffolding Sliders:
   - "Keyword assistance" button revealing 3 lemmas (e.g., `hace`, `estómago`, `recetar`).
   - Strict avoidance of one-click auto-fill to force authentic retrieval effort.
4. Acceptance Criteria:
   - Free production answers persist in the user's `learningJournal` Firestore collection.
   - System provides immediate lexical and syntactic diagnostic highlights without mock generic praises.
```

### PROMPT 5: Long's Interaction Hypothesis Negotiation of Meaning Module
```text
SYSTEM INSTRUCTION:
Build a Negotiation of Meaning conversational engine in the Spanish AI Tutor dialog component.

OBJECTIVE:
Replicate Michael Long's Interaction Hypothesis: when a communicative breakdown occurs, the AI tutor uses clarification requests, confirmation checks, and comprehension checks rather than simply correcting grammar in English.

TARGET FILES:
- src/components/chat/AITutorChat.tsx
- src/services/tutorPromptBuilder.ts
- src/types/chat.ts

DETAILED SPECIFICATIONS:
1. Authentic Conversational Repair Mechanisms:
   - If the learner inputs an ambiguous or ungrammatical statement (e.g., "Yo voy a la biblioteca ayer"):
     * Do NOT say: "Error: you must use preterite 'fui'."
     * DO respond with a natural clarification check in Spanish: "¿Quieres decir que *fuiste* ayer, o que tienes planes de ir hoy otra vez?"
   - If the learner uses an English loanword or English syntax:
     * Respond with a confirmation check: "Entiendo que te refieres al 'alquiler', ¿verdad? En España solemos llamarlo así."
2. Comprehension Check Protocol:
   - After explaining a cultural nuance or expressing an opinion, the tutor poses a short open-ended follow-up check: "¿Te ha ocurrido algo parecido alguna vez?"
3. Dynamic Spanish Immersion Ratio:
   - Intermediate/Advanced (B1+): 100% Spanish conversation, repair exclusively in Spanish.
   - Beginner (A1-A2): 85% Spanish with bilingual translation chips expandible on tap.
4. Acceptance Criteria:
   - Conversation logs demonstrate at least 3 types of authentic conversational repair (Clarification, Confirmation, Recast) per 10-turn dialogue.
```

### PROMPT 6: Schmidt's Noticing Hypothesis & Visual Saliency Highlighting
```text
SYSTEM INSTRUCTION:
Implement Richard Schmidt's Noticing Hypothesis via an Automated Typographical Saliency Engine for Spanish texts.

OBJECTIVE:
Make subtle morphological markers (such as personal 'a', clitic pronoun doubling, gender agreement on invariable nouns, and subjunctive mood switches) perceptually salient in authentic texts.

TARGET FILES:
- src/utils/saliencyHighlighter.tsx (new)
- src/components/reader/LingQInteractiveReader.tsx
- src/components/grammar/GrammarExplanationCard.tsx

DETAILED SPECIFICATIONS:
1. Syntactic Feature Detection:
   - Personal 'a': Mark "a" preceding direct human objects (e.g., "Vi **a** María").
   - Clitic Doubling: Mark indirect object pronouns paired with prepositional phrases (e.g., "**Le** dije **a** Juan").
   - Ser vs Estar state conditions: Distinguish essential identity vs. temporary state or location with subtle color underlining.
   - Subjunctive triggers: Subtly highlight trigger clauses (e.g., "Dudo que...") and corresponding subjunctive verb endings (e.g., "...**venga**").
2. Toggleable Pedagogical Layers:
   - Provide a "Focus Lens" floating control with toggles:
     * [ ] Verbos de cambio (hacerse, ponerse, volverse, quedarse)
     * [ ] Pronombres de Objeto Directo e Indirecto
     * [ ] Acento Diacrítico (él/el, tú/tu, mí/mi, sí/si)
   - Tapping any highlighted token opens an anatomical breakdown card showing role, lemma, and rule.
3. Acceptance Criteria:
   - Zero layout shift when toggling Saliency Lens.
   - Highlights use accessible WCAG AAA compliant contrast ratios (e.g., soft indigo and emerald highlights with 4.5:1 minimum text contrast).
```

---

## Domain 2: Curriculum Progression, CEFR Mastery & Dialects

### PROMPT 7: Comprehensive CEFR A0 to C2 Milestone Graph & Tree Architecture
```text
SYSTEM INSTRUCTION:
Replace simplistic linear lesson lists with a fully structured CEFR A0-C2 competency graph based on the Instituto Cervantes Curriculum Framework (PCIC).

OBJECTIVE:
Guarantee every single CEFR level (A0, A1, A2, B1, B2, C1, C2) possesses explicit linguistic, communicative, cultural, and pragmatic learning outcomes with strict dependency tracking.

TARGET FILES:
- src/data/curriculumData.ts
- src/types/curriculum.ts
- src/components/curriculum/CurriculumTreeView.tsx (new)
- src/context/AppContext.tsx

DETAILED SPECIFICATIONS:
1. Complete Level Milestones:
   - A0 (True Beginner): Sound system (alfabeto, fonética básica: r/rr, j/g, c/z), saludos, deletreo, numerales 0-100, países y nacionalidades.
   - A1 (Breakthrough): Presente indicativo, ser vs estar, género y número, preguntas básicas, horarios, familia, descripción física y de carácter.
   - A2 (Waystage): Pretérito indefinido vs imperfecto, estar + gerundio, comparativos, imperativo afirmativo, pronombres de objeto directo (lo/la/los/las), la salud y el cuerpo.
   - B1 (Threshold): Pretérito perfecto vs indefinido, contraste de los cuatro pasados, presente de subjuntivo en oraciones sustantivas y de deseo, imperativo negativo, pronombres dobles (se lo dije), expresiones de tiempo (hace, desde hace).
   - B2 (Vantage): Subjuntivo en relativas y temporales, imperfecto de subjuntivo, oraciones condicionales irreales, estilo indirecto en pasado, voz pasiva y pasiva refleja, marcadores del discurso (sin embargo, por lo tanto).
   - C1 (Operational Proficiency): Matices discursivos, perífrasis verbales avanzadas, inversión estilística, subjuntivo en oraciones concesivas avanzadas (por muy... que), registro formal vs coloquial, refranes y modismos.
   - C2 (Mastery): Jerga especializada, literatura clásica y contemporánea, juegos de palabras, ironía sutil, análisis sintáctico de ambigüedad poética.
2. Node Graph Schema:
   - Each node contains: `id`, `cefrLevel`, `title`, `prerequisiteNodeIds: string[]`, `estimatedMinutes`, `competencies: { canDoStatement: string; grammarPoints: string[]; vocabularySize: number }`.
3. Acceptance Criteria:
   - Directed Acyclic Graph (DAG) validation ensures no circular dependencies exist.
   - Unlocked nodes calculate dynamic progress percentages.
```

### PROMPT 8: Dialect & Regional Variety Engine (Castilian, Mexican, Rioplatense, Caribbean, Andean)
```text
SYSTEM INSTRUCTION:
Engineer a multi-dialect localization and immersion engine that accurately handles Spanish regional varieties throughout vocabulary, pronunciation, and grammar.

OBJECTIVE:
Eliminate artificial "neutral Spanish" homonimity and teach genuine regional differences: Peninsular (Castellano/Ceceo/Vosotros), Rioplatense (Voseo/Yeísmo rehilado), Mexican, Caribbean, and Andean variations.

TARGET FILES:
- src/types/dialect.ts (new)
- src/context/DialectContext.tsx (new)
- src/data/dialectDictionary.ts (new)
- src/components/dialect/DialectSwitcher.tsx (new)

DETAILED SPECIFICATIONS:
1. Dialect Profile Model:
   - Support: `castilian` (Spain), `mexican` (Mexico), `rioplatense` (Argentina & Uruguay), `caribbean` (Colombia/Venezuela/Cuba/PR), `andean` (Peru/Bolivia/Ecuador).
2. Lexical & Conjugation Matrix:
   - Computer: ordenador (ES) vs. computadora (MX, AR).
   - Car: coche (ES) vs. carro (MX, CO) vs. auto (AR).
   - Straw: pajita (ES) vs. popote (MX) vs. pajilla (CO) vs. sorbete (AR).
   - Second person plural: vosotros habláis (ES) vs. ustedes hablan (Americas).
   - Second person singular: tú hablas (ES, MX) vs. vos hablás (AR), tú tienes vs. vos tenés.
3. Audio Voice Route Pairing:
   - Castilian selects `es-ES` TTS voices with standard distinction /θ/ for 'c' and 'z'.
   - Rioplatense selects `es-AR` TTS voices with /ʃ/ or /ʒ/ for 'll' and 'y'.
   - Mexican selects `es-MX` TTS voices with crisp vowel preservation and characteristic intonation.
4. In-Lesson Dialect Tags:
   - Flashcards and Reader tokens flag dialect-specific terms with country badges: 🇪🇸 🇲🇽 🇦🇷.
5. Acceptance Criteria:
   - Switching dialect in user preferences updates verb tables (tú vs. vos vs. vosotros), example sentences, and audio engine instantly without page reload.
```

### PROMPT 9: Authentic Spanish "Can-Do" Task-Based Learning (TBLT) Framework
```text
SYSTEM INSTRUCTION:
Implement Task-Based Language Teaching (TBLT) modules based on real-world CEFR "Can-Do" statements.

OBJECTIVE:
Replace detached grammar drills with pragmatic, goal-driven communicative tasks where success is measured by achieving a real-world communicative outcome.

TARGET FILES:
- src/components/tasks/TaskBasedSimulation.tsx (new)
- src/data/taskScenarios.ts (new)
- src/types/tasks.ts (new)

DETAILED SPECIFICATIONS:
1. Simulated Real-World Scenarios:
   - Task A: "Rent an apartment in Madrid via WhatsApp": Negotiate security deposit (fianza), utility bills (gastos de comunidad incluidos), and contract duration with a simulated landlord.
   - Task B: "Order tapas in a crowded bar in Seville": Ask what is fresh, request recommendations, inquire about allergens (gluten/mariscos), and ask for the bill (la cuenta).
   - Task C: "File a lost baggage claim at Mexico City Airport (AICM)": Describe physical dimensions, color, brands, and contents of a missing suitcase using precise adjectives and past tenses.
2. Pragmatic Evaluation Metrics:
   - Task Success Check: Did the user achieve the goal? (Binary true/false based on key information exchanged).
   - Pragmatic Politeness Index: Appropriate register (tú vs usted, conditional '¿podría?', 'quisiera').
   - Turn-taking and discourse markers (mira, oye, disculpe, pues).
3. Acceptance Criteria:
   - User receives a "Task Completion Certificate" upon finalizing each simulation.
   - Feedback reviews pragmatic competence rather than minor orthographic typos.
```

### PROMPT 10: Prerequisite Verification Engine & Anti-Skipping Gatekeeper
```text
SYSTEM INSTRUCTION:
Build a reliable prerequisite verification system with diagnostic challenge gates to prevent learners from reaching advanced modules without baseline foundations.

OBJECTIVE:
Stop users from hitting dead ends or abandoning the platform when navigating prematurely to B2/C1 modules without prerequisite mastery.

TARGET FILES:
- src/utils/curriculumGraph.ts (new)
- src/components/curriculum/DiagnosticGateModal.tsx (new)
- src/context/AppContext.tsx

DETAILED SPECIFICATIONS:
1. Directed Dependency Validation:
   - Map dependencies for all 80+ modules across the 6 CEFR tiers.
   - A locked module cannot be accessed unless:
     * (a) All immediate ancestor prerequisite modules have reached at least 80% mastery score; OR
     * (b) The learner passes a 10-question "Fast-Track Challenge Gate" with >= 90% accuracy.
2. Fast-Track Challenge Gate:
   - Time-limited (60 seconds per question).
   - Pulls 10 randomized items directly from the prerequisite modules.
   - If passed: awards a "Tested Out" badge for prerequisites and unlocks target module.
   - If failed: highlights exact prerequisite weaknesses with 1-click links to the relevant foundational lessons.
3. Acceptance Criteria:
   - Direct URL manipulation (e.g. attempting to jump directly to `?level=C1&lesson=3`) redirects gracefully to the highest unlocked lesson with an informative toast alert.
```

### PROMPT 11: Idiomatic Expressions, Refranes & Pragmatic Nuance Library
```text
SYSTEM INSTRUCTION:
Develop a dedicated Idiomatic Expressions and Cultural Refranes Encyclopedia with interactive situational matching exercises.

OBJECTIVE:
Eliminate robotic translation traps (e.g., translating "it's raining cats and dogs" literally instead of "llueve a cántaros" or "caen chuzos de punta").

TARGET FILES:
- src/data/idiomsData.ts (new)
- src/components/idioms/IdiomExplorerView.tsx (new)
- src/components/idioms/IdiomPracticeCard.tsx (new)

DETAILED SPECIFICATIONS:
1. Deep Idiom Database Structure:
   - Provide 300+ authentic idioms categorized by country (Spain, Mexico, Argentina, Colombia).
   - Fields: `id`, `expression`, `literalTranslation`, `pragmaticMeaning`, `englishEquivalent`, `originStory`, `register` (informal, vulgar, formal, humorous), `audioUrl`, `exampleDialogue`.
   - Examples: "Tomar el pelo", "Dar calabazas", "Ser pan comido", "Estar en la luna", "Tirar la casa por la ventana", "Meter la pata", "Hacerse el sueco".
2. Situational Match Practice:
   - Present a short mini-story (e.g., "Marta told her friends she bought a Ferrari, but she was only joking").
   - User selects the fitting idiom ("Les estaba tomando el pelo").
3. Acceptance Criteria:
   - Filterable by country, register, and theme (emotions, money, work, food, relationships).
   - Complete with native audio playback for every single idiom.
```

### PROMPT 12: Ser vs. Estar Comprehensive Heuristic & Master Matrix
```text
SYSTEM INSTRUCTION:
Build an unshakeable, definitive Ser vs. Estar Mastery Tool that replaces misleading oversimplifications (like "temporary vs. permanent") with rigorous syntactic and semantic heuristics.

OBJECTIVE:
Teach learners how Ser (essence, origin, definition, event location, passive voice) vs. Estar (result of change, condition, geographic location, progressive aspect) fundamentally function, including double-meaning adjectives.

TARGET FILES:
- src/components/grammar/SerEstarMasteryView.tsx (new)
- src/data/serEstarData.ts (new)
- src/types/grammar.ts

DETAILED SPECIFICATIONS:
1. Double-Meaning Adjective Explorer:
   - Interactive comparative cards for adjectives that radically change meaning:
     * Ser listo (smart) vs. Estar listo (ready).
     * Ser bueno (kind/wholesome) vs. Estar bueno (tasty/attractive).
     * Ser malo (evil/poor quality) vs. Estar malo (sick/spoiled).
     * Ser verde (green color) vs. Estar verde (unripe).
     * Ser aburrido (boring) vs. Estar aburrido (bored).
     * Ser rico (wealthy) vs. Estar rico (delicious).
2. The Heuristic Decision Engine:
   - 4-step mental algorithm interactive flowchart for students to determine correct copula choice in any context.
3. Event vs. Entity Location Traps:
   - Explicit drills for the classic trap: "La fiesta **es** en mi casa" (Event = Ser) vs. "Mi casa **está** en la calle Mayor" (Physical entity = Estar).
4. Acceptance Criteria:
   - 50 curated practice sentences targeting common fossilized errors.
   - Interactive feedback highlights whether the user confused an event with an entity or a permanent attribute with a temporary condition.
```

### PROMPT 13: Por vs. Para Dynamic Decision Tree & Contrastive Drill Engine
```text
SYSTEM INSTRUCTION:
Implement a dynamic decision tree and contrastive drill engine for mastering the prepositions "Por" and "Para".

OBJECTIVE:
Eliminate the pervasive English confusion of "for" by systematizing the 8 distinct functional roles of "Por" and the 5 distinct roles of "Para".

TARGET FILES:
- src/components/grammar/PorParaMasteryView.tsx (new)
- src/data/porParaData.ts (new)

DETAILED SPECIFICATIONS:
1. Systematic Classification Matrix:
   - **PARA**:
     * Destination / Recipient: "Este regalo es para ti."
     * Purpose / In order to: "Estudio para aprender."
     * Deadline / Future point in time: "Es para el lunes."
     * Opinion / Perspective: "Para mí, es difícil."
     * Comparison against standard: "Para tener cinco años, lee muy bien."
   - **POR**:
     * Cause / Reason: "Cancelaron el vuelo por la lluvia."
     * Duration / Approximate time: "Viví allí por dos años."
     * Means / Medium: "Te llamo por teléfono."
     * Exchange / Cost: "Pagué 20 euros por el libro."
     * Movement through / along: "Paseamos por el parque."
     * In place of / On behalf of: "Fui por mi hermano porque estaba enfermo."
     * Passive agent: "Fue escrito por Cervantes."
     * Percentage / Frequency: "Dos veces por semana."
2. Dynamic Contrast Drills:
   - Pair ambiguous sentences: "Trabajo **para** Juan" (Juan is my boss) vs. "Trabajo **por** Juan" (Juan is sick; I am covering his shift).
   - Students tap the correct semantic explanation for each minimal pair.
3. Acceptance Criteria:
   - 100% interactive coverage of all 13 sub-rules with visual icons and mnemonic tags.
```

---

## Domain 3: Rigorous Examination & DELE/SIELE Adaptive Assessment Engine

### PROMPT 14: Computerized Adaptive Testing (CAT) Placement Engine (Item Response Theory)
```text
SYSTEM INSTRUCTION:
Architect a Computerized Adaptive Testing (CAT) Placement Exam using 1-Parameter Logistic (Rasch) Item Response Theory (IRT).

OBJECTIVE:
Determine a new user's exact CEFR level (A1, A2, B1, B2, C1) within 15–20 questions, replacing generic static quizzes with an adaptive algorithmic test.

TARGET FILES:
- src/services/catAssessmentService.ts (new)
- src/data/assessmentItemBank.ts (new)
- src/components/assessment/AdaptivePlacementExam.tsx (new)
- src/types/assessment.ts (new)

DETAILED SPECIFICATIONS:
1. Item Bank & Difficulty Calibration:
   - Calibrate 120 validated test items with parameters: `id`, `questionText`, `itemDifficulty (b: -3.0 to +3.0)`, `cefrEquivalent`, `discriminator`, `skillCategory` (Grammar, Vocabulary, Reading, Discourse).
2. Rasch IRT Algorithm:
   - Initial ability estimate: θ_0 = 0.0 (intermediate baseline).
   - Probability of correct response: P(θ) = 1 / (1 + exp(-1.7 * (θ - b))).
   - After each response, update learner ability estimate θ using Maximum Likelihood Estimation (MLE) or Newton-Raphson approximation.
   - Select next question that maximizes Fisher Information at current θ estimate.
   - Stopping rule: Standard Error of Measurement (SEM) < 0.32 OR max 20 questions reached.
3. CEFR Level Mapping:
   - θ < -1.8: A0 / Beginner
   - -1.8 <= θ < -0.6: A1
   - -0.6 <= θ < +0.4: A2
   - +0.4 <= θ < +1.4: B1
   - +1.4 <= θ < +2.2: B2
   - θ >= +2.2: C1
4. Acceptance Criteria:
   - Placement exam takes under 8 minutes.
   - Displays ability curve chart in real time with confidence interval upon completion.
```

### PROMPT 15: Formal DELE/SIELE Exam Simulation Module (Comprensión de Lectura y Auditiva)
```text
SYSTEM INSTRUCTION:
Build a timed DELE (Diploma de Español como Lengua Extranjera) and SIELE official exam simulator with authentic test tasks.

OBJECTIVE:
Give learners rigorous, high-stakes exam training mirroring the exact format, timing, and rubrics of the Instituto Cervantes exams.

TARGET FILES:
- src/components/exams/DELEExamSimulator.tsx (new)
- src/data/deleExamsData.ts (new)
- src/types/dele.ts (new)

DETAILED SPECIFICATIONS:
1. Official DELE Task Formats (e.g. DELE B2):
   - Tarea 1: Reading long complex informational text (700-800 words) with 6 multiple-choice questions (3 options each).
   - Tarea 2: Matching 4 personal statements/opinions against 10 descriptive statements.
   - Tarea 3: Text reconstruction: 6 blank paragraphs where the student must insert the correct missing sentence from a bank of 8 sentences (2 distractors).
   - Tarea 4: Multiple-choice cloze test testing grammatical prepositions, connectives, and lexical collocations (14 items).
2. Timed Exam Conditions:
   - Countdown timer enforcing strict DELE timing (e.g. 70 minutes for B2 Comprensión de Lectura).
   - Pause allowed only in practice mode; exam mode is strictly timed.
   - Question review pane with flagged items, unanswered items indicator, and jump-to-task navigation.
3. Official Scoring Rubric:
   - Calculate scaled score (0 to 25 points per test band; Apt / No Apto threshold at >= 30 points combined in groups).
4. Acceptance Criteria:
   - Complete DELE B1 and B2 full practice tests included.
   - Automated breakdown of performance by task type upon submission.
```

### PROMPT 16: Automated Multi-Dimensional Writing Evaluation Rubric
```text
SYSTEM INSTRUCTION:
Develop a writing evaluation engine that grades Spanish essays and written tasks using official CEFR analytical criteria.

OBJECTIVE:
Provide structured, multi-dimensional feedback on Spanish written production instead of generic AI praise.

TARGET FILES:
- src/components/assessment/WritingAssessmentView.tsx (new)
- src/services/writingEvaluationService.ts (new)
- src/types/assessment.ts

DETAILED SPECIFICATIONS:
1. The 4 Analytical Dimensions:
   - Dimension 1: Adecuación al texto (Task Achievement & Register): Did the student follow the requested text type (formal letter, email, opinion essay)?
   - Dimension 2: Coherencia y cohesión (Organization & Connectors): Use of discursive markers (en primer lugar, por consiguiente, en cambio, para resumir) and paragraph structure.
   - Dimension 3: Corrección gramatical (Grammatical Accuracy): Agreement, verb tenses, prepositional usage, and syntactic complexity.
   - Dimension 4: Riqueza léxica (Lexical Range): Vocabulary variety, avoidance of repetitive common verbs (hacer, tener, estar), use of idioms and specific terminology.
2. Scoring Scale (0 to 3 points per dimension, Total 12 points scaled to 100):
   - Score 0: Insuficiente
   - Score 1: En desarrollo
   - Score 2: Competente
   - Score 3: Excelente
3. Actionable In-line Annotations:
   - Return inline highlighted text segments: green for rich vocabulary, amber for repetitive phrasing, red for syntax/agreement errors, with explicit correction rationales.
4. Acceptance Criteria:
   - Word count enforcement (e.g., min 150 - max 200 words for DELE B1 Tarea 1).
   - Comprehensive analytical scorecard displayed upon submission.
```

### PROMPT 17: Interactive Listening Comprehension with Real-Speed Audio & Accents
```text
SYSTEM INSTRUCTION:
Build an authentic Listening Comprehension (Comprensión Auditiva) testing suite with natural speech rates, environmental background ambient, and multiple regional accents.

OBJECTIVE:
Prepare learners for real-world Spanish auditory processing where speakers do not articulate at artificial learner-speeds.

TARGET FILES:
- src/components/listening/ListeningExamTask.tsx (new)
- src/services/audioPlayerService.ts
- src/data/listeningTasksData.ts (new)

DETAILED SPECIFICATIONS:
1. Realistic Audio Player Controls:
   - Max 2 audio plays allowed in exam mode (mirroring the official DELE rule: "Vas a escuchar la audición dos veces").
   - Variable playback speed (1.0x default, 0.85x for scaffolded study mode).
   - Real-time synchronous waveform visualizer using Web Audio API AudioContext.
2. Authentic Speech Phenomena:
   - Include authentic spoken Spanish phenomena: dropped 's' in Andalusian/Caribbean Spanish, aspiration of consonants, natural hesitations (este..., o sea..., bueno...), and overlapping dialogue.
3. Task Typologies:
   - Task 1: Radio broadcast news bulletin with 6 comprehension questions.
   - Task 2: Informal phone voice note between friends confirming meeting plans.
   - Task 3: Professional consultation or university lecture snippet with note-taking prompt.
4. Acceptance Criteria:
   - Web Audio player reliably caches audio buffers to prevent network stuttering.
   - Question submission locks after second audio play in official simulation mode.
```

### PROMPT 18: Anti-Cheating & Integrity Guard for Formal Certifications
```text
SYSTEM INSTRUCTION:
Implement an exam integrity guard and anti-tampering module for formal platform examinations.

OBJECTIVE:
Ensure formal placement test and milestone exam results are genuine, preventing copy-paste, tab switching, and external translation tool abuse.

TARGET FILES:
- src/components/exams/ExamSecurityWrapper.tsx (new)
- src/hooks/useExamIntegrity.ts (new)
- src/types/dele.ts

DETAILED SPECIFICATIONS:
1. Browser Integrity Hooks:
   - Tab Blur / Visibility Detection: Track when document visibility state shifts to `hidden` (`document.addEventListener('visibilitychange')`).
   - Clipboard Prevention: Disable `copy`, `paste`, and `contextmenu` events inside the exam viewport.
   - Fullscreen Mode: Optional toggle prompting the user to take formal certification tests in uninterrupted fullscreen.
2. Warning & Invalidation Rules:
   - First tab switch: Display a non-blocking modal warning: "Warning: Leaving the exam tab is recorded. Multiple occurrences will invalidate certification."
   - Third tab switch: Invalidate official certificate eligibility (exam results can still be viewed for practice, but no official platform credential badge is issued).
3. Timestamped Telemetry Payload:
   - Store exam telemetry in Firestore: `{ startedAt, finishedAt, tabSwitchesCount, timeSpentPerQuestion: number[] }` to detect anomalous 1-second answers.
4. Acceptance Criteria:
   - Does not disrupt mobile browsers or keyboard accessibility.
   - Completely transparent to honest users while providing verifiable test integrity.
```

### PROMPT 19: Comprehensive Historical Exam Analytics & Weak-Point Heatmap
```text
SYSTEM INSTRUCTION:
Develop an Examination Analytics Dashboard that visualizes learner mastery across all CEFR domains, sub-skills, and grammatical categories.

OBJECTIVE:
Transform raw test scores into an actionable remediation roadmap identifying specific grammatical and lexical vulnerabilities.

TARGET FILES:
- src/components/analytics/ExamAnalyticsDashboard.tsx (new)
- src/components/analytics/CompetencyHeatmap.tsx (new)
- src/services/analyticsAggregationService.ts (new)

DETAILED SPECIFICATIONS:
1. Multi-Axis Competency Heatmap:
   - Display a responsive matrix of CEFR Levels (A1-C1) against Sub-skills:
     * Morfosintaxis: Ser/Estar, Pasados, Subjuntivo, Pronombres, Preposiciones.
     * Léxico: Vida cotidiana, Viajes, Trabajo, Cultura, Expresiones idiomáticas.
     * Comprensión: Detalle principal, Inferencia implícita, Actitud del hablante.
   - Colors: Emerald (>85% Mastered), Amber (60-84% Review Needed), Crimson (<60% Critical Weakness).
2. One-Click Targeted Remediation:
   - Tapping any red or amber cell immediately generates a "Targeted Remediation Sprint" of 5 curated exercises focusing exclusively on that vulnerability.
3. Historical Trend Chart:
   - Recharts visual timeline tracking the learner's estimated CEFR ability score (θ) over time with milestone event markers.
4. Acceptance Criteria:
   - Zero layout flicker during data fetch; full SVG responsiveness across mobile and desktop viewports.
```

---

## Domain 4: Database Architecture, Firestore Hardening & Offline Sync

### PROMPT 20: Atomic Batching & Optimistic UI Synchronization Engine
```text
SYSTEM INSTRUCTION:
Refactor Firestore write architecture to guarantee instantaneous, glitch-free optimistic UI updates with resilient atomic background batching.

OBJECTIVE:
Eliminate UI freezing, dropped progress writes, and race conditions when users rapidly complete flashcards, read words, or gain XP.

TARGET FILES:
- src/services/firestoreSyncService.ts (new)
- src/context/AppContext.tsx
- src/utils/storage.ts

DETAILED SPECIFICATIONS:
1. Optimistic In-Memory Mutation:
   - When a user marks a word (e.g. LingQ status change 1 -> 2) or gains 15 XP:
     * Immediately update React state and local indexed storage (`localStorage` / `IndexedDB`) synchronously within the same render tick.
     * Enqueue mutation in a FIFO transaction buffer: `syncQueue: PendingMutation[]`.
2. Debounced Atomic Batching:
   - Flush `syncQueue` every 4 seconds, or immediately upon view change / tab blur.
   - Use Firestore `writeBatch()` to commit up to 500 operations in a single atomic network trip.
   - Schema target: `users/{userId}/progress/summary` and `users/{userId}/vocabulary/{wordId}`.
3. Exponential Backoff & Conflict Resolution:
   - On network drop: preserve queue in `localStorage`.
   - On reconnect: replay mutations with timestamp-based Last-Write-Wins (LWW) conflict resolution.
4. Acceptance Criteria:
   - Rapid clicking of 50 flashcards generates zero UI lag and results in exactly 1 Firestore network write batch.
```

### PROMPT 21: Frictionless Guest-to-Authenticated Account Reconciliation
```text
SYSTEM INSTRUCTION:
Engineer an unshakeable Guest-to-Authenticated Account Migration and Data Merge Protocol.

OBJECTIVE:
Guarantee that learners who begin as anonymous guests never lose a single streak day, XP point, or saved vocabulary word when signing in or creating an account.

TARGET FILES:
- src/context/AppContext.tsx
- src/services/accountMergeService.ts (new)
- src/utils/storage.ts

DETAILED SPECIFICATIONS:
1. Offline Guest Data Snapshot:
   - Store guest progress under key: `hispanoacademy_guest_state_v2`.
   - Track: `xp`, `streakDays`, `completedLessons: string[]`, `savedWords: Record<string, WordData>`, `readingHistory: string[]`.
2. Intelligent 3-Way Merge Strategy on Auth:
   - When `onAuthStateChanged` fires with a valid `user.uid`:
     * Read existing Firestore user doc: `users/{userId}`.
     * If cloud document already exists:
       - Combine `xp`: `Math.max(cloudXP, guestXP + cloudXP)`.
       - Combine `streakDays`: calculate continuous streak across both sets.
       - Merge `savedWords`: union dictionary, preserving highest SRS mastery level for duplicate keys.
       - Merge `completedLessons`: `Array.from(new Set([...cloudLessons, ...guestLessons]))`.
     * If cloud doc does not exist: write guest state directly as the root cloud state.
     * Purge guest cache from `localStorage` once confirmation write succeeds.
3. Error Boundary Safety:
   - If cloud write fails during merge, preserve local guest backup with an alert allowing manual re-sync.
4. Acceptance Criteria:
   - Tested scenario: Guest completes 3 lessons and saves 5 words -> signs up with Google OAuth -> all 3 lessons and 5 words are visible and saved in Firestore.
```

### PROMPT 22: Strict Firestore Security Rules Hardening (RBAC & Schema Invariants)
```text
SYSTEM INSTRUCTION:
Implement production-grade, hardened Firestore Security Rules enforcing strict user authorization, role-based access (Student, Teacher, Admin), and data integrity invariants.

OBJECTIVE:
Prevent unauthorized document tampering, XP spoofing, arbitrary writes to other users' profiles, or access to sensitive platform content.

TARGET FILES:
- firestore.rules
- src/types/user.ts

DETAILED SPECIFICATIONS:
1. Hardened Rule Structure:
   - `rules_version = '2'; service cloud.firestore { match /databases/{database}/documents { ... } }`.
   - Helper functions:
     * `isAuthenticated()`: `request.auth != null;`
     * `isOwner(userId)`: `isAuthenticated() && request.auth.uid == userId;`
     * `isAdmin()`: `isAuthenticated() && request.auth.token.admin == true;`
2. Collection Constraints:
   - `match /users/{userId}`:
     * Allow read: if `isOwner(userId)` or `isAdmin()`.
     * Allow update: if `isOwner(userId)` and `request.resource.data.xp <= resource.data.xp + 500` (anti-cheat rate limit on single updates).
     * Cannot modify `role` field unless `isAdmin()`.
   - `match /users/{userId}/vocabulary/{wordId}`:
     * Allow read, write: if `isOwner(userId)`.
     * Invariant: `request.resource.data.status in [0, 1, 2, 3, 4, 5]`.
   - `match /curriculum/{lessonId}`:
     * Allow read: if true (public curriculum).
     * Allow write: if `isAdmin()`.
   - `match /examResults/{resultId}`:
     * Allow create: if `isAuthenticated() && request.resource.data.userId == request.auth.uid`.
     * Immutable: `allow update, delete: if false;`.
3. Acceptance Criteria:
   - Deployed and validated using `deploy_firebase` or simulator rules test suite.
   - Zero insecure open wildcards (`allow read, write: if true;` is strictly forbidden).
```

### PROMPT 23: IndexedDB Local Cache Layer for Offline-First PWA Mastery
```text
SYSTEM INSTRUCTION:
Implement an IndexedDB storage engine to cache the entire Spanish dictionary, curriculum, and user vocabulary offline.

OBJECTIVE:
Allow users on flights, subways, or unstable mobile networks to read texts, review flashcards, and complete lessons with 100% offline capability.

TARGET FILES:
- src/services/offlineStorageService.ts (new)
- src/context/AppContext.tsx
- src/sw.ts (Service Worker)

DETAILED SPECIFICATIONS:
1. IndexedDB Schema Setup via `idb` or raw IndexedDB API:
   - Database name: `HispanoAcademyOfflineDB`, version: 1.
   - Object Stores:
     * `curriculumStore` (key: `id`): full lesson content, audio metadata, exercises.
     * `vocabularyStore` (key: `lemma`): user saved words, definitions, SRS stages.
     * `textStore` (key: `id`): reader articles, transcripts, translations.
     * `offlineActionQueue` (key: `autoIncrement`): queued actions completed offline.
2. Background Pre-Caching:
   - When the user begins a module, automatically pre-cache the next 3 lessons and their associated compressed audio files into IndexedDB.
3. Offline Re-synchronization:
   - Listen to `window.addEventListener('online', syncOfflineQueue)`.
   - Automatically post offline progress to Firestore once connection is restored.
4. Acceptance Criteria:
   - Disconnecting network completely in Chrome DevTools allows full reader and flashcard lesson interaction without network error dialogs.
```

### PROMPT 24: Firestore Index Optimization & High-Performance Querying
```text
SYSTEM INSTRUCTION:
Audit and optimize all Firestore queries, compound indexes, and pagination routines across the platform.

OBJECTIVE:
Eliminate missing composite index errors and reduce document read costs by 70% using cursors (`startAfter`), limits, and projection filters.

TARGET FILES:
- firestore.indexes.json (new)
- src/services/firestoreService.ts
- src/components/community/CommunityForumView.tsx
- src/components/vocabulary/VocabularyNotebookView.tsx

DETAILED SPECIFICATIONS:
1. Composite Index Definitions:
   - Vocabulary index: `collection: "vocabulary"`, fields: `userId ASC, status ASC, nextReviewDate ASC`.
   - Exam results index: `collection: "examResults"`, fields: `userId ASC, examType ASC, completedAt DESC`.
   - Forum posts index: `collection: "forumPosts"`, fields: `category ASC, pinned DESC, createdAt DESC`.
2. Paginated Query Abstractions:
   - Replace unlimited `.get()` calls in Vocabulary Notebook with infinite-scroll pagination:
     * `query(collection(db, 'users', uid, 'vocabulary'), where('status', '==', filterStatus), orderBy('nextReviewDate'), limit(25), startAfter(lastVisibleDoc))`.
3. Read-Cost Reduction Cache:
   - Cache static curriculum documents in memory with a 24-hour Time-To-Live (TTL) to avoid redundant Firestore reads on page re-renders.
4. Acceptance Criteria:
   - Zero console warnings regarding missing Firestore indexes.
   - Vocabulary notebook loads first 25 words in < 150ms even with 5,000+ saved words in the user's database.
```

### PROMPT 25: Automated Data Backup, Export & Portability (GDPR & Anki Sync)
```text
SYSTEM INSTRUCTION:
Build a complete Data Portability & Export Module allowing learners to export their entire learning history, saved vocabulary, and exam transcripts.

OBJECTIVE:
Respect user data sovereignty, comply with GDPR data portability, and provide seamless export to external SRS platforms (Anki .apkg/.tsv format).

TARGET FILES:
- src/components/settings/DataPortabilityCard.tsx (new)
- src/services/ankiExportService.ts (new)
- src/services/dataBackupService.ts (new)

DETAILED SPECIFICATIONS:
1. Anki Export Generator:
   - Generate ready-to-import Anki TSV/CSV format:
     * Field 1: Front (Spanish word or phrase in bold + context sentence with target word cloze-tested `{{c1::palabra}}`).
     * Field 2: Back (English translation, grammatical category, regional variety tag).
     * Field 3: Audio pronunciation link / native phonetic transcription.
     * Field 4: Tag (e.g. `HispanoAcademy::B1::Subjuntivo`).
2. Full Account JSON Backup:
   - 1-click download of all user data: `hispano_backup_{date}.json` containing profile, XP history, complete vocabulary entries with SRS intervals, and exam scores.
3. JSON Restore / Import:
   - Allow importing a previously exported backup file to restore state on any device.
4. Acceptance Criteria:
   - Exported file imports cleanly into official Anki Desktop without formatting errors or missing fields.
```

---

## Domain 5: Interactive Reader & LingQ Vocabulary Pipeline

### PROMPT 26: Spanish Lemmatization & Morphological Analysis Engine
```text
SYSTEM INSTRUCTION:
Build an internal client-side Spanish Lemmatization and Morphological Analyzer for the Interactive Reader.

OBJECTIVE:
Ensure that conjugated verbs (e.g., "durmiéramos", "habrías dicho", "puso"), feminine/plural forms (e.g., "trabajadoras"), and clitic-attached verbs (e.g., "diciéndomelo", "cómpralo") resolve instantly to their base dictionary lemma.

TARGET FILES:
- src/utils/spanishLemmatizer.ts (new)
- src/data/irregularVerbTable.ts (new)
- src/components/reader/LingQInteractiveReader.tsx

DETAILED SPECIFICATIONS:
1. Clitic Pronoun Detachment Algorithm:
   - Detect infinitives, gerundios, and affirmative imperatives with attached clitic pronouns (me, te, se, nos, os, le, la, les, los, lo):
     * "haciéndolo" -> stem "haciendo" -> lemma "hacer" + pronoun "lo".
     * "dímelo" -> stem "di" -> lemma "decir" + pronouns "me", "lo".
     * Restore lost graphic accents when pronouns are detached (e.g., "explicándoselo" -> "explicando").
2. Irregular Verb Mapping:
   - Comprehensive lookup table for high-frequency irregular roots (ir/ser/estar/tener/hacer/poder/poner/saber/querer/venir/decir).
   - Resolve "fue" -> identifies both "ir" and "ser" with disambiguation context.
3. Direct Dictionary Lemma Popover:
   - Tapping any conjugated word immediately displays:
     * Base Lemma in bold.
     * Morphological parsing: e.g., "1ª persona plural, Pretérito Imperfecto de Subjuntivo".
     * One-tap button: "Save Base Lemma to SRS".
4. Acceptance Criteria:
   - Lemmatizes 99% of verb forms in a standard 1,000-word news text accurately within < 25ms.
```

### PROMPT 27: Multi-Word Expression (MWE) & Idiom Multi-Token Selector
```text
SYSTEM INSTRUCTION:
Implement Multi-Word Expression (MWE) detection and multi-token selection capabilities into the interactive reader.

OBJECTIVE:
Allow learners to highlight and save compound prepositions, phrasal expressions, and idioms (e.g., "a pesar de que", "dar de alta", "echar de menos", "tener ganas de") as a single unified vocabulary item.

TARGET FILES:
- src/components/reader/LingQInteractiveReader.tsx
- src/components/reader/MWEHighlighter.tsx (new)
- src/types/vocabulary.ts

DETAILED SPECIFICATIONS:
1. Multi-Token Selection Mechanism:
   - Desktop: Click and drag across adjacent words, or Shift + Click starting and ending words.
   - Mobile: Long-press initial word to trigger text selection handles across up to 5 adjacent tokens.
2. Automated Multi-Word Pattern Detection:
   - Pre-scan text against a database of 1,200 Spanish MWEs.
   - Automatically visually link multi-word expressions with a subtle dashed underline.
   - Tapping any token within the MWE offers the choice: "Select word: 'menos'" OR "Select phrase: 'echar de menos' (to miss)".
3. Unified SRS Storage:
   - Multi-word expressions store full target text, constituent tokens, and combined English meaning in the user's `vocabulary` database.
4. Acceptance Criteria:
   - Highlighting "por si las moscas" saves all 4 words as a single vocabulary card with custom translation.
```

### PROMPT 28: 5-Stage SRS Vocabulary Mastery Lifecycle (LingQ-Style Pipeline)
```text
SYSTEM INSTRUCTION:
Implement a 5-stage vocabulary acquisition lifecycle modeled on empirical spaced repetition and the LingQ methodology.

OBJECTIVE:
Transition words from unread (New) to actively acquiring (Stages 1–4) to fully internalized (Mastered/Known), reflecting visual state in all reading texts.

TARGET FILES:
- src/types/vocabulary.ts
- src/components/reader/WordPopover.tsx
- src/components/vocabulary/SRSReviewEngine.tsx (new)
- src/utils/srsAlgorithm.ts (new)

DETAILED SPECIFICATIONS:
1. The 5 Acquisition Stages:
   - Stage 0 (New / Unsaved): Blue background highlight.
   - Stage 1 (Just Saved / Learning - Interval 1 day): Soft Amber highlight.
   - Stage 2 (Recognized / Review - Interval 3 days): Light Amber tint.
   - Stage 3 (Familiar / Recall - Interval 7 days): Very faint yellow underline.
   - Stage 4 (Near Mastery - Interval 14 days): Dotted green underline.
   - Stage 5 (Mastered / Known - Interval 60+ days): No highlight (clean text appearance).
2. SuperMemo-2 (SM-2) or FSRS Scheduling Algorithm:
   - Inputs on review: Quality rating (1 = Blackout, 2 = Hard, 3 = Good, 4 = Easy).
   - Recalculate Easiness Factor (EF), Interval, and NextReviewDate.
3. In-Reader Instant Keyboard Shortcuts:
   - Pressing 1, 2, 3, 4, 5 on desktop changes highlighted word stage instantly and moves focus to next unknown word.
4. Acceptance Criteria:
   - Changing a word's stage in the reader updates that word's color across all articles and flashcards globally in real time.
```

### PROMPT 29: Dynamic In-Context Sentence Generation with Spanish Lexical Collocations
```text
SYSTEM INSTRUCTION:
Build a contextual sentence generator that pairs saved vocabulary with authentic Spanish collocations and natural phraseology.

OBJECTIVE:
Prevent learners from memorizing isolated vocabulary without knowing the natural collocations (e.g. learning "prestar" -> "prestar atención", "hacer" -> "hacer una pregunta", not "preguntar una pregunta").

TARGET FILES:
- src/services/collocationService.ts (new)
- src/data/spanishCollocations.ts (new)
- src/components/vocabulary/CollocationCard.tsx (new)

DETAILED SPECIFICATIONS:
1. Collocation Pairings Engine:
   - For any target word, provide its top 3 most frequent syntactic partners:
     * Verb + Noun: "tomar una decisión", "correr un riesgo", "dar un paseo".
     * Noun + Adjective: "éxito rotundo", "lluvia torrencial", "opinión pública".
     * Prepositional Verbs: "soñar con", "acordarse de", "consistir en".
2. In-Context Cloze Exercise Generator:
   - Auto-generate fill-in-the-blank review cards:
     * "Siempre soñé ______ viajar a Buenos Aires. (con / de / en)"
3. Acceptance Criteria:
   - Every saved flashcard displays at least one high-frequency collocation with audio example.
```

### PROMPT 30: Custom Content Importer (EPUB, PDF, Web Articles, YouTube Transcripts)
```text
SYSTEM INSTRUCTION:
Create an authentic content import pipeline allowing learners to bring their own reading material into the interactive reader.

OBJECTIVE:
Enable learners to import Spanish news articles, public domain literature (EPUB), transcripts, and text files into their personalized LingQ learning environment.

TARGET FILES:
- src/components/importer/ContentImporterModal.tsx (new)
- src/services/textExtractionService.ts (new)
- src/types/reader.ts

DETAILED SPECIFICATIONS:
1. Supported Import Formats:
   - Plain text / Paste URL: Scrapes web article body cleanly, stripping ads, navigation, and boilerplate.
   - EPUB files: Parse chapters via client-side zip/xml parsing (`jszip`).
   - SRT / VTT Subtitle files: Parses timecodes and lines into cohesive readable paragraphs with playback anchors.
2. Automated Pre-Flight Lexical Audit:
   - Before reading, display import summary:
     * Total Word Count.
     * Estimated CEFR Difficulty (A2, B1, B2, C1).
     * Number of New Words vs. Already Known Words for this specific learner.
     * "i+1 Comprehensibility Ratio: 92% (Ideal)".
3. Persistence:
   - Save imported texts to the user's personal `importedTexts` collection in Firestore / IndexedDB.
4. Acceptance Criteria:
   - Pasting a 1,500-word El País article processes and opens in the Interactive Reader with all interactive word-tapping capabilities in < 1 second.
```

### PROMPT 31: Bilingual Parallel Reader & Sentence-by-Sentence Synchronizer
```text
SYSTEM INSTRUCTION:
Implement a dual-pane Parallel Bilingual Reader mode with synchronous sentence alignment for beginner and intermediate learners.

OBJECTIVE:
Provide reliable, side-by-side or line-by-line bilingual reference without forcing the learner to leave the application for external machine translation.

TARGET FILES:
- src/components/reader/ParallelReaderView.tsx (new)
- src/components/reader/LingQInteractiveReader.tsx
- src/hooks/useSentenceAlignment.ts (new)

DETAILED SPECIFICATIONS:
1. Synchronous Sentence Alignment:
   - Break source Spanish text and target English reference translation into aligned sentence pairs.
   - Desktop: Side-by-side split screen (50% Spanish, 50% English) with synchronized scrolling.
   - Mobile: Accordion or tap-to-reveal translation drawer directly beneath the active Spanish sentence.
2. Hover & Tap Coordination:
   - Hovering over Sentence #4 in Spanish highlights Sentence #4 in English simultaneously.
   - Tapping an individual Spanish word continues to open the LingQ word popover without breaking the sentence view.
3. Scaffolding Fade-Out Toggle:
   - Provide "Blur Translation by Default" mode where translations are blurred until tapped or hovered, fostering cognitive recall before verification.
4. Acceptance Criteria:
   - Perfect sentence alignment across complex multi-paragraph articles with zero layout breaks.
```

---

## Domain 6: Audio Synthesis, Speech Recognition & Phonetic Engine

### PROMPT 32: Multi-Engine Web Speech & High-Fidelity Audio Fallback Pipeline
```text
SYSTEM INSTRUCTION:
Engineer a resilient multi-tier Spanish Audio Synthesis & Speech Engine.

OBJECTIVE:
Eliminate robotic voice synthesis, missing mobile voices, silent audio failures on iOS Safari, and unsupported Web Speech API errors.

TARGET FILES:
- src/services/audioSpeechService.ts (new)
- src/context/AudioContext.tsx (new)
- src/utils/soundEffects.ts

DETAILED SPECIFICATIONS:
1. Multi-Tiered Speech Provider Strategy:
   - Tier 1: High-quality pre-recorded native speaker MP3 audio assets stored on CDN for all core curriculum sentences and vocabulary.
   - Tier 2: Enhanced Cloud TTS API (e.g. Google Cloud TTS / Gemini TTS Spanish neural voices: `es-ES-Neural2-F`, `es-MX-Neural2-B`).
   - Tier 3: Browser Web Speech API (`window.speechSynthesis`) with filtered preference for natural language voices (e.g., "Monica", "Paulina", "Jorge", "Google español").
2. iOS Safari Audio Unlock Protocol:
   - Handle iOS Safari's strict autoplay restriction by playing a silent 1-millisecond buffer on the first user touch event to unlock the `AudioContext`.
3. Offline Audio Caching:
   - Store played audio buffers in CacheStorage or IndexedDB to allow instant offline replay without re-fetching.
4. Acceptance Criteria:
   - Tapping any audio icon plays natural Spanish audio in < 50ms across iOS Safari, Android Chrome, and Desktop browsers.
```

### PROMPT 33: Phonetic Precision Pronunciation Analyzer (IPA & Levenshtein Distance)
```text
SYSTEM INSTRUCTION:
Build a Phonetic Pronunciation Assessment Engine that compares user microphone recordings against native Spanish phonetic models.

OBJECTIVE:
Provide actionable phonetic feedback pinpointing exact pronunciation challenges specific to Spanish (e.g., trilled 'rr', rolled 'r', soft 'b/v' approximant [β], 'd' elision, tap 'r' vs trill 'rr').

TARGET FILES:
- src/components/speech/PronunciationTrainer.tsx (new)
- src/services/phoneticAnalysisService.ts (new)
- src/utils/ipaSpanishMapper.ts (new)

DETAILED SPECIFICATIONS:
1. Phonetic Target Conversion:
   - Convert target Spanish words to International Phonetic Alphabet (IPA) strings:
     * "perro" -> /ˈpe.ro/
     * "pero" -> /ˈpe.ɾo/
     * "cebolla" -> /seˈβo.ʝa/ (LatAm) or /θeˈβo.ʎa/ (Spain)
2. Speech-to-Text Phonetic Distance Scoring:
   - Capture user audio via Web Speech API / MediaRecorder.
   - Compute Levenshtein distance and character-level confidence scores between expected phonemes and transcribed phonemes.
3. Visual Waveform & Pitch Contour:
   - Display dual visual spectrogram/pitch contours: Model Speaker vs. User Attempt.
   - Highlight exact syllable failures in amber or red with physical tongue-placement tips: "Your tongue tip must flutter against the alveolar ridge for the trill in 'perro'."
4. Acceptance Criteria:
   - Differentiates minimal pairs reliably: "pero" vs. "perro", "caro" vs. "carro", "año" vs. "ano".
```

### PROMPT 34: Minimal Pair Auditory Discrimination Trainer
```text
SYSTEM INSTRUCTION:
Develop a dedicated Minimal Pair Auditory Discrimination training module for Spanish phonemes.

OBJECTIVE:
Train the learner's ear to distinguish difficult Spanish phonemic contrasts before expecting them to produce them accurately in speech.

TARGET FILES:
- src/components/listening/MinimalPairsTrainer.tsx (new)
- src/data/minimalPairsData.ts (new)

DETAILED SPECIFICATIONS:
1. Core Phonemic Contrast Pairs:
   - /r/ vs. /rr/ (tap vs. trill): coro / corro, cero / cerro, para / parra.
   - /b/ vs. /p/ (voiced vs. voiceless bilabial): beso / peso, bala / pala.
   - /d/ vs. /t/ (dental stop voicing): dos / tos, domo / tomo.
   - Open vs. closed vowels (e vs. i, o vs. u): paso / peso, puso / poso.
   - Interdental /θ/ vs. sibilant /s/ (Castilian distinction): caza / casa, cinto / sinto.
2. Fast-Paced Rapid Discrimination Drills:
   - Audio plays a single random token from the pair.
   - Learner has 3 seconds to tap Button A ("pero") or Button B ("perro").
   - Instant visual and auditory feedback loops (20 rapid rounds per session).
3. Personal Ear Accuracy Score:
   - Calculates specific phoneme vulnerability ratings (e.g., "95% accuracy on /b/ vs /p/, 60% accuracy on /r/ vs /rr/ - needs daily drill").
4. Acceptance Criteria:
   - Minimal pair training accessible from the main navigation bar.
   - Fast keyboard shortcuts (Arrow Left for Option A, Arrow Right for Option B).
```

### PROMPT 35: Shadowing & Real-Time Audio Synchronous Playback Engine
```text
SYSTEM INSTRUCTION:
Build a continuous Speech Shadowing (Alexander Arguelles method) trainer into the audio player.

OBJECTIVE:
Allow learners to practice prosody, intonation, and rhythm by speaking simultaneously along with native audio at varying controlled speeds.

TARGET FILES:
- src/components/shadowing/ShadowingPlayerView.tsx (new)
- src/hooks/useAudioShadowing.ts (new)

DETAILED SPECIFICATIONS:
1. Looping & Sentence Segment Control:
   - Break audio into short natural phrases (3–6 words each).
   - Modes:
     * Mode 1 (Listen & Repeat): Audio plays phrase -> 3-second recording pause -> playback comparison.
     * Mode 2 (Simultaneous Shadowing): Continuous playback at 0.8x, 0.9x, or 1.0x with synchronous on-screen karaoke teleprompter highlighting each word in sync with the sound wave.
2. Waveform Visual Feedback:
   - Real-time Canvas-rendered audio frequency visualizer tracking user voice input overlaying native speaker pitch contour.
3. Acceptance Criteria:
   - Audio and subtitle sync latency < 30ms.
   - Smooth pause, replay, and loop controls with spacebar and arrow keys.
```

### PROMPT 36: Hands-Free Voice Dialogue Mode with Spanish Conversational AI
```text
SYSTEM INSTRUCTION:
Implement a hands-free, voice-first Spanish Conversational Mode in the AI Tutor.

OBJECTIVE:
Provide a realistic simulated phone conversation experience in Spanish where the user speaks naturally and listens to responses without looking at the screen.

TARGET FILES:
- src/components/chat/VoiceDialogueModal.tsx (new)
- src/services/voiceDialogueService.ts (new)
- src/components/chat/AITutorChat.tsx

DETAILED SPECIFICATIONS:
1. Full Hands-Free Voice Cycle:
   - Voice Activity Detection (VAD): Automatically detects when the user begins speaking and stops speaking (1.2s silence threshold) using Web Audio API ScriptProcessor / AudioWorklet.
   - Speech-to-Text: Streams Spanish transcription live onto the interface.
   - AI Response: Generates conversational, pragmatic Spanish response (max 2 sentences to maintain spoken pace).
   - Text-to-Speech: Immediately speaks response using selected regional voice.
2. "Simulated Phone Call" UI:
   - Minimalist, distraction-free calling interface: glowing audio orb, caller name ("Sofía - Madrid" or "Mateo - Buenos Aires"), call duration timer, and End Call button.
   - Post-call debrief screen summarizing vocabulary used, mistakes, and fluency score.
3. Acceptance Criteria:
   - Complete voice loop (user speaks -> AI responds -> AI voice plays) completes in < 2.5 seconds on broadband connections.
```

### PROMPT 37: Subtitle Generator & Sync Engine for Spanish Video & Audio Content
```text
SYSTEM INSTRUCTION:
Develop an interactive Subtitle Synchronizer and Video/Audio Player supporting interactive word tapping inside real-time video subtitles.

OBJECTIVE:
Turn authentic Spanish video content and podcasts into interactive learning materials where subtitles can be paused and tapped for LingQ definitions.

TARGET FILES:
- src/components/media/InteractiveVideoPlayer.tsx (new)
- src/utils/vttParser.ts (new)
- src/types/media.ts (new)

DETAILED SPECIFICATIONS:
1. Interactive Subtitle Overlay:
   - Render synchronized WebVTT subtitles directly over video content.
   - Every word in the subtitle is an interactive token identical to the LingQ reader.
2. Auto-Pause on Hover / Tap:
   - Tapping any word in the subtitle immediately pauses the video, reveals the word translation popover, and saves the word to SRS.
   - Resuming video automatically restarts playback.
3. Dual Subtitle Display:
   - Spanish primary subtitles + optional English secondary subtitles toggleable with one click.
4. Acceptance Criteria:
   - Subtitle timing precisely matches video audio tracks down to 50ms intervals.
   - No video stuttering or desynchronization when tapping words.
```

---

## Domain 7: Anti-Slop Elimination, Cultural Immersion & Elite UI/UX

### PROMPT 38: Eradication of AI Slop, Stereotypes & Artificial Dialogues
```text
SYSTEM INSTRUCTION:
Perform a complete audit and eradication of generic "AI slop", sterile dialogues, and tourist stereotypes across all platform copy and lessons.

OBJECTIVE:
Eliminate robotic, uninspiring sentences like "The boy eats the red apple" or "Hello, where is the library?" and replace them with authentic, culturally grounded, modern Spanish discourse.

TARGET FILES:
- src/data/curriculumData.ts
- src/data/sampleLessons.ts
- src/data/dialoguesData.ts (new)

DETAILED SPECIFICATIONS:
1. Anti-Slop Content Guidelines:
   - Ban artificial textbook archetypes: No more "Juan compra una manzana roja" or generic descriptions of animals.
   - Inject authentic cultural topics:
     * Housing & Rent: Living in a shared flat (piso compartido), dealing with the landlord (casero), roommate chore disputes.
     * Work & Bureaucracy: Getting a NIE / empadronamiento in Spain, applying for freelance monotributo in Argentina, office WhatsApp etiquette.
     * Modern Social Life: Organizing a "tardeo" or "asado", making bizum transfers, booking an Airbnb in Oaxaca, discussing cinema and podcasts.
   - Natural Humor and Realistic Frustrations: Characters who miss trains, complain about summer heat waves (la ola de calor), or argue over who pays the bill.
2. Discursive Authenticity Check:
   - Ensure dialogues use natural discourse markers: "A ver...", "Pues la verdad es que...", "Fíjate que...", "¿Qué te iba a decir?", "Ni hablar".
3. Acceptance Criteria:
   - 100% of curriculum lessons pass the Authenticity Audit: zero generic filler sentences remaining.
```

### PROMPT 39: Tactile Sensory Micro-Interactions & Duolingo-Grade Gamification Polish
```text
SYSTEM INSTRUCTION:
Elevate all UI micro-interactions, reward animations, and tactile feedback to world-class mobile app standards.

OBJECTIVE:
Provide delightful, non-annoying gamification with spring physics, haptic vibrations, and celebratory particles without predatory dark patterns.

TARGET FILES:
- src/components/ui/ConfettiBurst.tsx (new)
- src/components/ui/TactileButton.tsx (new)
- src/utils/haptics.ts (new)
- src/index.css

DETAILED SPECIFICATIONS:
1. Tactile 3D Button Components:
   - Implement custom button styling with 3D bottom bevels (`box-shadow: 0 4px 0 #...`), translating downwards by 4px on active press (`transform: translateY(4px); box-shadow: 0 0 0 #...`).
   - Clean, tactile click sound using Web Audio API synthesis (not external MP3s).
2. Mobile Haptic Vibrations:
   - Trigger `navigator.vibrate([15])` on correct card drop or button tap.
   - Trigger `navigator.vibrate([30, 50, 30])` on milestone level-up.
3. Non-Intrusive Particle Celebration:
   - Lightweight Canvas confetti explosion on completing a lesson (0 external heavyweight dependencies).
   - Auto-cleans canvas and deallocates memory in 1.5 seconds.
4. Acceptance Criteria:
   - Runs at 60 FPS consistently on low-end mobile devices without CPU spikes.
```

### PROMPT 40: Typographic Hierarchy, Readability & Dark/Light Theme System
```text
SYSTEM INSTRUCTION:
Implement a meticulous typographic system and cohesive Dark/Light theme design adhering to WCAG AAA accessibility standards.

OBJECTIVE:
Ensure the platform is a visual pleasure for reading extended Spanish literature and practicing in low-light environments.

TARGET FILES:
- src/index.css
- tailwind.config.js
- src/context/ThemeContext.tsx (new)
- src/components/layout/Navbar.tsx

DETAILED SPECIFICATIONS:
1. Typographic Selection:
   - Headings: Display font with warmth and Spanish cultural elegance (e.g. 'Plus Jakarta Sans' or 'Outfit').
   - Long-form Reader: Editorial serif font optimized for sustained reading (e.g. 'Merriweather' or 'Lora') with adjustable font-size (16px to 28px) and line-height (1.6 to 2.0).
   - UI & Code: Clean sans-serif ('Inter').
2. Color Palettes:
   - Light Mode: Warm cream paper background (`#FDFBF7`), deep slate text (`#1E293B`), terracotta and Spanish gold accents (`#EA580C`, `#D97706`).
   - Dark Mode: Rich obsidian midnight background (`#0F172A`), high-contrast soft gray text (`#F1F5F9`), vibrant emerald and warm amber highlights (`#10B981`, `#F59E0B`). Never use pure `#000000` pitch black.
3. Dynamic Theme Switcher:
   - Persists in `localStorage` and syncs with system `prefers-color-scheme`.
   - Transitions between themes without color flashes using CSS variables.
4. Acceptance Criteria:
   - 100% WCAG AAA contrast ratio compliance across all text and interactive buttons in both themes.
```

### PROMPT 41: Cultural Immersion Hub: Hispanic Cinema, Music, Literature & Gastronomy
```text
SYSTEM INSTRUCTION:
Build a dedicated Cultural Immersion Hub that bridges language learning with rich authentic Hispanic culture.

OBJECTIVE:
Inspire intrinsic motivation by immersing learners in Spanish and Latin American film, literature, culinary traditions, and historical milestones.

TARGET FILES:
- src/components/culture/CulturalImmersionHubView.tsx (new)
- src/data/culturalContentData.ts (new)
- src/types/culture.ts (new)

DETAILED SPECIFICATIONS:
1. Cultural Categories:
   - Cine y Series: Guides to classic and modern cinema (Almodóvar, Del Toro, Campanella), with key vocabulary and recommended viewing lists.
   - Literatura: Curated excerpt bites from Cervantes, Gabriel García Márquez, Borges, Federico García Lorca, and Isabel Allende, linked directly to the interactive reader.
   - Gastronomía: Authentic recipes (Paella valenciana, Mole poblano, Ceviche peruano, Empanadas argentinas) with culinary verbs (sofreír, saltear, rallar, marinar) and interactive measurement conversions.
   - Música & Podcasts: Curated playlists with lyrical breakdown analysis and genre histories (Flamenco, Tango, Cumbia, Rock en Español).
2. Cultural Trivia & Curiosity Bites:
   - "Dato curioso del día" floating widget on the home dashboard highlighting fascinating regional traditions (Las Fallas, Día de Muertos, La Tomatina).
3. Acceptance Criteria:
   - Fully interactive hub navigable from the main menu, with direct one-tap links to open relevant reading excerpts.
```

### PROMPT 42: Interactive Conjugation Encyclopedia & Irregular Pattern Visualizer
```text
SYSTEM INSTRUCTION:
Refactor the Verb Conjugator into an authoritative Spanish Conjugation Encyclopedia and Visual Stem-Change Analyzer.

OBJECTIVE:
Help learners master verb paradigms intuitively by highlighting orthographic changes, stem vowel shifts (e->ie, o->ue, e->i), and irregular endings with color-coded morphology.

TARGET FILES:
- src/components/verbs/VerbConjugator.tsx
- src/components/verbs/StemChangeHighlighter.tsx (new)
- src/data/fullConjugationDatabase.ts (new)
- src/types/verbs.ts

DETAILED SPECIFICATIONS:
1. Complete Paradigm Coverage:
   - All 14 mood/tense combinations recognized by the Real Academia Española (RAE):
     * Indicativo: Presente, Pretérito Perfecto Compuesto, Pretérito Indefinido, Pretérito Imperfecto, Pretérito Pluscuamperfecto, Futuro Simple, Futuro Perfecto, Condicional Simple, Condicional Compuesto.
     * Subjuntivo: Presente, Pretérito Perfecto, Pretérito Imperfecto (-ra y -se), Pretérito Pluscuamperfecto.
     * Imperativo: Afirmativo y Negativo.
2. Color-Coded Morphological Anatomy:
   - Stem (Root): Charcoal grey.
   - Stem-Shift Vowel: Bold indigo (e.g. v**ue**lo, p**ie**nso, p**i**do).
   - Orthographic Adjustment: Amber (e.g. bus**qu**é, lle**gu**é, empe**c**é).
   - Tense/Person Ending: Emerald green (e.g. com**ieron**, vivir**íamos**).
3. Instant Paradigm Search:
   - Search by any inflected form (e.g. searching "cupo" displays "caber" in Pretérito Indefinido).
4. Acceptance Criteria:
   - Instant search across 2,000+ Spanish verbs with zero latency.
   - Audio pronunciation for every individual conjugated form.
```

### PROMPT 43: Spanish Grammar Encyclopedia with Interactive Diagnostic Trees
```text
SYSTEM INSTRUCTION:
Build a comprehensive Spanish Grammar Encyclopedia (Gramática ELE) with interactive decision trees and self-contained mini-check quizzes.

OBJECTIVE:
Provide a clear, authoritative reference grammar covering every rule from A1 gender agreements to C2 conditional inversion and discourse markers.

TARGET FILES:
- src/components/grammar/GrammarEncyclopediaView.tsx
- src/data/grammarEncyclopediaData.ts (new)
- src/components/grammar/GrammarArticleCard.tsx (new)

DETAILED SPECIFICATIONS:
1. Exhaustive Article Architecture:
   - Structure every grammar topic into 4 clear sections:
     * 1. The Core Rule (Plain language explanation without academic jargon).
     * 2. Comparative Examples (English vs. Spanish contrast).
     * 3. Frequent Traps & False Friends (Common errors made by English speakers).
     * 4. Quick Check (3-question inline interactive verification quiz).
2. Topic Index:
   - Los artículos determinados e indeterminados (el agua femenina con artículo masculino).
   - Ser vs Estar.
   - Por vs Para.
   - Los Pronombres de Objeto Directo e Indirecto y posición con infinitivo/gerundio/imperativo.
   - Los cuatro pasados del indicativo.
   - El Subjuntivo: oraciones sustantivas, adjetivas y adverbiales.
   - Oraciones condicionales y de hipótesis.
   - Perífrasis verbales (empezar a, dejar de, volver a, tener que, deber de).
3. Search & Cross-Linking:
   - Global full-text search with instant filter by CEFR level.
4. Acceptance Criteria:
   - Integrated directly with Reader and Practice modules: clicking a grammar hint in any exercise opens the corresponding encyclopedia article in a clean drawer.
```

---

## Domain 8: Glitch Elimination, Virtual Keyboard, Memory & PWA

### PROMPT 44: Mobile Safe Area Insets & 48px Touch Target Ergonomics
```text
SYSTEM INSTRUCTION:
Perform a comprehensive mobile ergonomics overhaul enforcing 48px touch targets and native iOS/Android safe area inset compliance.

OBJECTIVE:
Eliminate missed button taps, cramped mobile interfaces, and content being cut off by the iPhone home indicator bar or camera notch.

TARGET FILES:
- src/index.css
- src/components/layout/Navbar.tsx
- src/components/layout/MobileFooterNav.tsx
- src/components/practice/ExerciseFooter.tsx

DETAILED SPECIFICATIONS:
1. Safe Area Inset Utility Enforcement:
   - Ensure root layout applies safe padding:
     * `padding-top: max(16px, env(safe-area-inset-top));`
     * `padding-bottom: max(16px, env(safe-area-inset-bottom));`
     * `padding-left: max(16px, env(safe-area-inset-left));`
     * `padding-right: max(16px, env(safe-area-inset-right));`
2. Touch Target Geometry:
   - Enforce minimum dimensions of 48px x 48px on every interactive element (buttons, tabs, navigation items, reader words, audio triggers) according to Apple Human Interface Guidelines and Google Material Design.
   - Add pseudo-elements (`::after`) with expanded touch bounds if visual element must remain physically compact.
3. Mobile Bottom Bar Positioning:
   - Ensure sticky footers (Next Question button, Audio controllers) sit comfortably above `env(safe-area-inset-bottom)` with background blur (`backdrop-blur-md`).
4. Acceptance Criteria:
   - Verified on mobile viewport simulation: no button is obscured by device notches or home indicator bars.
```

### PROMPT 45: Virtual Keyboard Viewport Resizing & Input Occlusion Fix
```text
SYSTEM INSTRUCTION:
Resolve mobile virtual keyboard viewport obscuration across chat inputs, written exercises, and reader notes.

OBJECTIVE:
Prevent mobile soft keyboards (iOS Safari & Android Chrome) from covering the text input field, submit button, or active translation popover when focused.

TARGET FILES:
- src/hooks/useVirtualKeyboard.ts (new)
- src/components/chat/AITutorChat.tsx
- src/components/practice/WrittenExerciseInput.tsx

DETAILED SPECIFICATIONS:
1. Dynamic Visual Viewport API Listener:
   - Use `window.visualViewport` API:
     * Listen for `visualViewport.addEventListener('resize', handleViewportResize)`.
     * Calculate keyboard height: `const keyboardHeight = window.innerHeight - visualViewport.height`.
     * Dynamically offset the chat input container or exercise action bar using `transform: translateY(-${keyboardHeight}px)`.
2. Scroll-Into-View on Focus:
   - On `input.onFocus`: trigger smooth scroll: `element.scrollIntoView({ behavior: 'smooth', block: 'center' })` after a 250ms delay allowing the keyboard animation to finish.
3. Prevent iOS Bounce & Body Overscroll:
   - Add `overscroll-behavior-y: none;` on fixed dialog overlays to eliminate body scroll-jacking while typing.
4. Acceptance Criteria:
   - Tapping the chat input or written exercise field on iPhone Safari keeps the input box and Send button 100% visible directly above the keyboard.
```

### PROMPT 46: Universal React Error Boundary & Crash Recovery Protocol
```text
SYSTEM INSTRUCTION:
Implement a comprehensive React Error Boundary and fault-tolerant crash recovery architecture.

OBJECTIVE:
Ensure that an unexpected JavaScript runtime error in a single component (e.g., an audio decoding failure or malformed text token) never turns the entire app into a blank white screen.

TARGET FILES:
- src/components/common/GlobalErrorBoundary.tsx (new)
- src/components/common/ComponentErrorBoundary.tsx (new)
- src/main.tsx
- src/App.tsx

DETAILED SPECIFICATIONS:
1. Multi-Tier Error Boundaries:
   - Tier 1: Global App Boundary (Catches critical routing and provider crashes).
   - Tier 2: Feature Boundaries wrapping `LingQInteractiveReader`, `AITutorChat`, `VerbConjugator`, and `DELEExamSimulator`.
2. Elegant Recovery Screen:
   - Display a culturally friendly, localized recovery screen:
     * "¡Vaya! Algo no ha salido como esperábamos."
     * Non-technical explanation + Collapsible developer debug stack trace.
     * Primary action: "Reiniciar lección sin perder progreso" (restores state from localStorage cache).
     * Secondary action: "Volver al menú principal".
3. Automatic Crash Telemetry:
   - Log error name, component stack, and current URL state into a local diagnostics log to allow quick diagnosis.
4. Acceptance Criteria:
   - Manually throwing an error inside a reader word component shows an isolated error fallback card for that specific word while keeping the reader and navigation fully functional.
```

### PROMPT 47: Memory Leak Prevention & Canvas/Audio Teardown Protocol
```text
SYSTEM INSTRUCTION:
Audit and remediate memory leaks, unclosed audio contexts, and dangling event listeners across the application.

OBJECTIVE:
Guarantee high-performance sustained study sessions (1+ hours) without memory bloat, frame drops, or audio crackle on mobile browsers.

TARGET FILES:
- src/components/reader/LingQInteractiveReader.tsx
- src/services/audioSpeechService.ts
- src/components/chat/VoiceDialogueModal.tsx
- src/hooks/useSoundEffects.ts

DETAILED SPECIFICATIONS:
1. AudioContext Cleanup Invariant:
   - Ensure every `new AudioContext()` or `new webkitAudioContext()` instance is tracked and explicitly closed (`audioContext.close()`) in `useEffect` cleanup return functions.
   - Reuse a single global singleton `AudioContext` rather than spawning new contexts per sound effect.
2. Event Listener Disposals:
   - Clean up all `window.addEventListener('resize')`, `keydown`, and `visibilitychange` listeners on component unmount.
3. MediaStream Microphone Release:
   - In voice dialogue components, ensure microphone tracks are explicitly stopped: `stream.getTracks().forEach(track => track.stop())` when the user closes the modal or navigates away.
4. URL Object Cleanup:
   - Call `URL.revokeObjectURL(blobUrl)` immediately after audio blobs or exported files finish playing/downloading.
5. Acceptance Criteria:
   - Heap memory profile remains stable (< 45MB) over 30 continuous minutes of flashcard reviews and audio playback.
```

### PROMPT 48: PWA Service Worker Cache Strategy & Offline Fallback Assets
```text
SYSTEM INSTRUCTION:
Implement an advanced Progressive Web App (PWA) Service Worker caching architecture.

OBJECTIVE:
Provide instant application loading (< 300ms) on repeat visits and reliable offline functionality with zero stale-asset cache bugs.

TARGET FILES:
- src/sw.ts (or public/sw.js)
- vite.config.ts
- public/manifest.json
- src/components/common/PWAUpdateToast.tsx (new)

DETAILED SPECIFICATIONS:
1. Workbox Caching Strategies:
   - HTML / Navigation: Network-First with a 2-second timeout, falling back to cached `index.html`.
   - JavaScript / CSS Bundles: Stale-While-Revalidate with immutable hash verification.
   - Core Audio / Phonetics: Cache-First with max 500 entries and 30-day expiration.
   - Dynamic Images / Cultural Photos: Stale-While-Revalidate with max 100 entries.
2. Graceful In-App Update Prompt:
   - When a new build is deployed, do not abruptly refresh the page during an active lesson.
   - Show a subtle bottom toast: "Nueva versión disponible de Hispano Academy. [Actualizar]" which triggers `skipWaiting()` and updates on user click.
3. Web App Manifest:
   - Complete manifest with Spanish locale: name: "Hispano Academy", short_name: "Hispano", theme_color: "#EA580C", background_color: "#0F172A", display: "standalone".
4. Acceptance Criteria:
   - Passes Google Lighthouse PWA audit with 100% score.
```

### PROMPT 49: Strict TypeScript Type Safety & Zero Implicit 'Any' Guarantee
```text
SYSTEM INSTRUCTION:
Eliminate every implicit and explicit `any` type, unsafe type assertion, and unused variable across the entire codebase.

OBJECTIVE:
Achieve strict TypeScript compile-time guarantees, preventing runtime `undefined` property crashes across user progress, grammar modules, and reader state.

TARGET FILES:
- tsconfig.json
- src/types/*.ts
- src/context/AppContext.tsx
- src/services/*.ts

DETAILED SPECIFICATIONS:
1. TypeScript Compiler Flags:
   - Enforce: `"noImplicitAny": true`, `"strictNullChecks": true`, `"noUnusedLocals": true`, `"noUnusedParameters": true`.
2. Model Normalization:
   - Standardize all user state under explicit interfaces:
     * `UserProfile`: `{ uid: string; displayName: string; email: string; photoURL?: string; role: 'student' | 'teacher' | 'admin'; dialect: DialectCode; cefrLevel: CEFRLevel; createdAt: string; }`
     * `WordEntity`: `{ id: string; lemma: string; rawText: string; translation: string; status: SRSStatus; lastReviewed?: string; nextReview: string; intervalDays: number; easeFactor: number; contextSentence?: string; }`
     * `ExamAttempt`: `{ examId: string; userId: string; score: number; maxScore: number; passed: boolean; completedAt: string; subScores: Record<string, number>; }`
3. Zero Type-Cast Bypass:
   - Eliminate all `as any` and `@ts-ignore` comments. Use custom type guards (`isWordEntity(obj: unknown): obj is WordEntity`).
4. Acceptance Criteria:
   - `npm run build` and `npx tsc --noEmit` execute with 0 errors and 0 warnings.
```

### PROMPT 50: Production Bundle Optimization & Sub-150KB Gzip Initial Load
```text
SYSTEM INSTRUCTION:
Optimize Vite production bundle configuration, code splitting, dynamic imports, and asset compression to achieve a sub-150KB gzip initial bundle.

OBJECTIVE:
Ensure lightning-fast initial page loads on 3G/4G mobile networks across Latin America and Spain, deferring heavy visualization and audio dependencies until needed.

TARGET FILES:
- vite.config.ts
- src/App.tsx
- src/router.tsx (or view router)

DETAILED SPECIFICATIONS:
1. Granular Manual Chunks in Vite / Rollup:
   - Split chunks cleanly:
     * `vendor-react`: `['react', 'react-dom']`
     * `vendor-icons`: `['lucide-react']`
     * `vendor-firebase`: `['firebase/app', 'firebase/firestore', 'firebase/auth']`
     * `vendor-charts`: `['recharts']` (loaded dynamically only when viewing Analytics)
2. React Suspense & Lazy Loading:
   - Dynamically import all primary routes and heavy modals:
     * `const LingQInteractiveReader = React.lazy(() => import('./components/reader/LingQInteractiveReader'));`
     * `const AITutorChat = React.lazy(() => import('./components/chat/AITutorChat'));`
     * `const DELEExamSimulator = React.lazy(() => import('./components/exams/DELEExamSimulator'));`
     * `const VerbConjugator = React.lazy(() => import('./components/verbs/VerbConjugator'));`
     * `const GrammarEncyclopediaView = React.lazy(() => import('./components/grammar/GrammarEncyclopediaView'));`
3. Tree-Shaking Verification:
   - Verify Lucide icons are imported individually (`import { Volume2, BookOpen } from 'lucide-react'`) rather than wildcard `* as Icons`.
4. Acceptance Criteria:
   - `npm run build` generates `index.html` + initial JS chunk totaling under 150KB gzip.
   - Lighthouse Performance Score >= 95.
```

---

## EXECUTION INSTRUCTIONS FOR THE ENGINEERING TEAM

To apply these prompts to the Hispano Academy codebase:
1. **Prioritize Foundations First**: Begin with **Prompts 20–22** (Database, Batching & Security Rules) and **Prompts 44–46** (Ergonomics, Virtual Keyboard & Error Boundaries) to stabilize the core architecture.
2. **Execute SLA Pedagogy**: Apply **Prompts 1–6** (SLA Krashen methodology) and **Prompts 7–13** (Curriculum & Dialect engine) to replace superficial exercises with authentic acquisition mechanisms.
3. **Deploy Examinations & Reader**: Apply **Prompts 14–19** (DELE/SIELE & IRT CAT testing) and **Prompts 26–31** (Interactive LingQ-style Reader) to provide deep language immersion.
4. **Final Polish & Verification**: Conclude with **Prompts 32–37** (Audio/Phonetics), **Prompts 38–43** (Anti-slop & cultural depth), and **Prompts 49–50** (Type safety & performance).
