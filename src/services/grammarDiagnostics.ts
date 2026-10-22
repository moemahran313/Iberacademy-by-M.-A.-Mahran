/**
 * Merrill Swain's Pushed-Output Hypothesis Engine & Grammar Diagnostic Service
 *
 * Implements Swain's Output Hypothesis (1985, 1995, 2005):
 * 1. The Noticing Function: Pushes learners from semantic processing (passive comprehension)
 *    to syntactic processing (active production), forcing them to notice the gap between
 *    their interlanguage output and target native speaker forms.
 * 2. The Hypothesis-Testing Function: Allows learners to test whether their chosen linguistic
 *    structure conveys the exact intended pragmatic nuance.
 * 3. The Metalinguistic Function: Fosters reflection on grammatical rules, concordance,
 *    and register.
 */

import { collection, addDoc, getDocs, query, orderBy, limit, doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

export interface AgreementDiagnostic {
  id: string;
  type: 'gender' | 'number' | 'article_concord' | 'calque_aspect' | 'subjunctive_register';
  problematicSegment: string;
  explanation_es: string;
  explanation_en: string;
  suggestedCorrection: string;
  ruleCitation: string;
}

export interface SyntacticGap {
  id: string;
  category: 'aspect_duration' | 'pragmatic_politeness' | 'collocation' | 'clitic_pronoun' | 'mood_choice';
  label_es: string;
  label_en: string;
  learnerFormSnippet: string;
  nativeModelSnippet: string;
  pedagogicalContrast_es: string;
  pedagogicalContrast_en: string;
}

export interface SelfNoticingCheck {
  id: string;
  syntacticFeature: string;
  contrastPrompt_es: string;
  contrastPrompt_en: string;
  learnerForm: string;
  nativeForm: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface PushedOutputScenario {
  id: string;
  title_es: string;
  title_en: string;
  citySetting: string;
  register: 'formal_usted' | 'informal_tu' | 'neutral';
  cefrLevel: 'A2' | 'B1' | 'B2';
  minWords: number; // >= 15 words
  promptSituation_es: string;
  promptSituation_en: string;
  contextBadges: string[];
  assistedLemmas: {
    lemma: string;
    pos: string;
    translation_en: string;
    hintUsage: string;
  }[];
  nativeCorpusModels: string[];
  keySyntacticTargets: string[];
}

export interface ProductionDiagnosticResult {
  wordCount: number;
  meetsWordCountMin: boolean;
  minWordsRequired: number;
  tokens: string[];
  uniqueLemmasCount: number;
  agreementDiagnostics: AgreementDiagnostic[];
  syntacticGaps: SyntacticGap[];
  primaryNativeModel: string;
  alternativeNativeModels: string[];
  selfNoticingChecks: SelfNoticingCheck[];
  assistedLemmasRevealed: string[];
  assistedLemmasDetected: string[];
  timestamp: string;
}

export interface LearningJournalEntry {
  id?: string;
  userId: string;
  userEmail?: string;
  scenarioId: string;
  scenarioTitle: string;
  citySetting: string;
  learnerOutput: string;
  wordCount: number;
  nativeModel: string;
  agreementErrorsCount: number;
  diagnosticsSummary: {
    agreementTypes: string[];
    gapCategories: string[];
  };
  noticedGapsChecked: string[];
  assistedLemmasUsed: string[];
  createdAt: string;
}

// 🏛️ Curated Communicative Scenarios strictly calibrated for Pushed Output
export const PUSHED_OUTPUT_SCENARIOS: PushedOutputScenario[] = [
  {
    id: 'scen_seville_pharmacy',
    title_es: 'Farmacia en el Barrio de Santa Cruz, Sevilla',
    title_en: 'Pharmacy in the Santa Cruz Quarter, Seville',
    citySetting: 'Sevilla (España)',
    register: 'formal_usted',
    cefrLevel: 'A2',
    minWords: 15,
    promptSituation_es:
      'Explícale con detalle al farmacéutico en Sevilla que llevas tres días con dolor de estómago y molestias continuas, y pídele que te recomiende un antiácido suave que no necesite receta médica.',
    promptSituation_en:
      'Explain in detail to a pharmacist in Seville that you have had an upset stomach for three days with persistent discomfort, and ask them to recommend a mild antacid that does not require a prescription.',
    contextBadges: ['Salud y Farmacia', 'Registro Formal (Usted)', 'Contraste Temporal'],
    assistedLemmas: [
      {
        lemma: 'llevar / hace',
        pos: 'verbo temporal',
        translation_en: 'to have been (doing) / ago',
        hintUsage: 'Usa "llevo tres días con..." o "hace tres días que me duele..." para duración abierta.'
      },
      {
        lemma: 'estómago / malestar',
        pos: 'sustantivo masculino',
        translation_en: 'stomach / discomfort',
        hintUsage: 'Recuerda que "estómago" y "malestar" son masculinos: "el estómago", "malestar estomacal".'
      },
      {
        lemma: 'recomendar / recetar',
        pos: 'verbo de petición',
        translation_en: 'to recommend / to prescribe',
        hintUsage: 'Usa la fórmula de cortesía: "¿Podría recomendarme...?" o "Quisiera que me recomendara..."'
      }
    ],
    nativeCorpusModels: [
      'Buenos días. Mire, llevo tres días con un malestar estomacal bastante molesto y me gustaría saber si podría recomendarme algún antiácido suave que no necesite receta.',
      'Hola, buenos días. Hace tres días que tengo dolores en el estómago y desearía que me diera algún medicamento suave para aliviar la acidez.',
      'Disculpe, farmacéutico. Llevo ya varios días con dolor de estómago y acidez continua; ¿me podría aconsejar algún jarabe o pastilla suave sin receta médica?'
    ],
    keySyntacticTargets: [
      'Perífrasis de duración: Llevo + [tiempo] + con [síntoma]',
      'Concordancia de género y número: malestar estomacal / dolores continuos',
      'Petición atenuada de cortesía: ¿Podría recomendarme...? / Quisiera...'
    ]
  },
  {
    id: 'scen_madrid_train_station',
    title_es: 'Taquilla de Renfe en la Estación de Atocha, Madrid',
    title_en: 'Renfe Ticket Office at Atocha Station, Madrid',
    citySetting: 'Madrid (España)',
    register: 'formal_usted',
    cefrLevel: 'B1',
    minWords: 15,
    promptSituation_es:
      'Tu tren de cercanías hacia Toledo se ha cancelado inesperadamente. Explícale al agente de taquilla que tienes una reunión urgente a las doce y solicita cambiar tu billete para el próximo tren de alta velocidad sin coste adicional.',
    promptSituation_en:
      'Your commuter train to Toledo was unexpectedly cancelled. Explain to the ticket agent that you have an urgent meeting at 12:00 and request to change your ticket to the next high-speed train at no additional charge.',
    contextBadges: ['Transporte y Viajes', 'Reclamación Cortés', 'Subjuntivo de Petición'],
    assistedLemmas: [
      {
        lemma: 'cancelar',
        pos: 'verbo participio',
        translation_en: 'to cancel',
        hintUsage: 'Usa pretérito perfecto: "acaban de cancelar" o "se ha cancelado el tren de las diez".'
      },
      {
        lemma: 'reunión / compromiso',
        pos: 'sustantivo femenino',
        translation_en: 'meeting / appointment',
        hintUsage: 'Femenino: "una reunión urgente e inaplazable a mediodía".'
      },
      {
        lemma: 'cambiar / reubicar',
        pos: 'verbo de petición',
        translation_en: 'to exchange / to rebook',
        hintUsage: 'Cortesía con condicional o subjuntivo: "Le agradecería que me cambiara el billete..."'
      }
    ],
    nativeCorpusModels: [
      'Disculpe, acaban de cancelar el tren hacia Toledo y tengo una reunión de trabajo imprescindible a las doce; le agradecería que me cambiara el billete al siguiente AVE sin coste.',
      'Buenos días. Mi tren se ha retrasado más de una hora por una avería; como tengo un compromiso urgente, ¿sería posible que me reubicaran en el próximo convoy disponible?'
    ],
    keySyntacticTargets: [
      'Causa y justificación: Acaban de cancelar / Se ha suspendido',
      'Subjuntivo en oración subordinada sustantiva: Agradecería que me cambiara / fuera posible que...',
      'Locución preposicional: sin recargo / sin coste adicional'
    ]
  },
  {
    id: 'scen_barcelona_doctor',
    title_es: 'Consulta Médica en el Hospital Clínic, Barcelona',
    title_en: 'Medical Consultation at Hospital Clínic, Barcelona',
    citySetting: 'Barcelona (España)',
    register: 'formal_usted',
    cefrLevel: 'B1',
    minWords: 15,
    promptSituation_es:
      'Describe detalladamente a la doctora que sufres fuertes migrañas en el lado izquierdo de la cabeza desde el lunes, que los analgésicos comunes no te hacen efecto y que la luz brillante te provoca náuseas.',
    promptSituation_en:
      'Describe in detail to the doctor that you have had severe migraines on the left side of your head since Monday, that regular painkillers have no effect, and that bright light causes you nausea.',
    contextBadges: ['Medicina y Síntomas', 'Verbo Doler y Causativos', 'Expresiones de Frecuencia'],
    assistedLemmas: [
      {
        lemma: 'doler / cefalea',
        pos: 'verbo impersonal / sust.',
        translation_en: 'to ache / headache',
        hintUsage: 'Estructura tipo gustar: "Me duele intensamente el lado izquierdo..."'
      },
      {
        lemma: 'analgésico / calmante',
        pos: 'sustantivo masculino',
        translation_en: 'painkiller',
        hintUsage: 'Plural masculino: "los analgésicos habituales no me calman el dolor".'
      },
      {
        lemma: 'provocar / causar',
        pos: 'verbo causativo',
        translation_en: 'to trigger / to cause',
        hintUsage: '"La claridad me provoca mareos y sensación de náuseas constantes".'
      }
    ],
    nativeCorpusModels: [
      'Doctora, desde el lunes tengo una migraña muy aguda en el lado izquierdo de la cabeza; los analgésicos convencionales no me hacen ningún efecto y la luz fuerte me causa náuseas.',
      'Mire, doctora, llevo varios días con punzadas intensas en la sien izquierda; he probado con paracetamol pero el dolor persiste y no tolero la luz solar.'
    ],
    keySyntacticTargets: [
      'Concordancia con adjetivos epónimos: migraña muy aguda / analgésicos convencionales',
      'Negación enfática: no me hacen ningún efecto / nada de efecto',
      'Uso de desde / desde hace con marcas temporales precisas'
    ]
  },
  {
    id: 'scen_granada_hotel',
    title_es: 'Recepción de Hotel en el Albaicín, Granada',
    title_en: 'Hotel Reception in the Albaicín, Granada',
    citySetting: 'Granada (España)',
    register: 'formal_usted',
    cefrLevel: 'A2',
    minWords: 15,
    promptSituation_es:
      'Al llegar a tu habitación notas que da a una calle muy ruidosa. Regresa a recepción y solicita amablemente que te trasladen a una habitación interior o con vistas a la Alhambra para poder descansar bien.',
    promptSituation_en:
      'Upon entering your room, you notice it overlooks a noisy street. Return to reception and politely request to be moved to an interior room or one with views of the Alhambra so you can rest well.',
    contextBadges: ['Alojamiento y Hostelería', 'Oraciones Finales (Para + Inf)', 'Atenuación'],
    assistedLemmas: [
      {
        lemma: 'ruidoso / bullicioso',
        pos: 'adjetivo calificador',
        translation_en: 'noisy / bustling',
        hintUsage: 'Concordancia femenina: "la calle es demasiado ruidosa por la noche".'
      },
      {
        lemma: 'trasladar / cambiar',
        pos: 'verbo de acción',
        translation_en: 'to transfer / to move',
        hintUsage: 'Cortesía: "¿Habría alguna posibilidad de cambiarme de habitación...?"'
      },
      {
        lemma: 'descansar',
        pos: 'verbo de finalidad',
        translation_en: 'to rest',
        hintUsage: 'Oración final: "...para que podamos descansar adecuadamente".'
      }
    ],
    nativeCorpusModels: [
      'Buenas noches. Acabo de subir a la habitación número doce pero da a una plaza muy ruidosa; ¿sería posible cambiarnos a una habitación más tranquila para poder descansar?',
      'Disculpe, la ventana de mi habitación no aísla el ruido del tráfico exterior; ¿tienen alguna habitación interior o con vistas al patio disponible para esta noche?'
    ],
    keySyntacticTargets: [
      'Concordancia de adjetivos de ruido y orientación: calle ruidosa / habitación interior',
      'Fórmulas de atenuación: ¿Sería posible...? / ¿Tienen disponible...?',
      'Estructuras de infinitivo tras preposiciones de finalidad: para poder descansar'
    ]
  }
];

// Helper: Tokenize and normalize Spanish text
export function tokenizeSpanishSentence(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"¡¿]/g, ' ')
    .split(/\s+/)
    .filter(token => token.trim().length > 0);
}

/**
 * Spanish Agreement and Syntactic Error Engine
 * Detects:
 * 1. Gender/Number mismatches in noun-adjective pairs and article-noun pairs
 * 2. False calques from English (e.g., "dolor por tres días" -> "hace tres días que...")
 * 3. Pragmatic register issues (blunt "yo quiero" vs polite "quisiera / me gustaría")
 */
export function detectAgreementErrors(text: string): AgreementDiagnostic[] {
  const diagnostics: AgreementDiagnostic[] = [];
  const lower = text.toLowerCase();
  const normalized = lower.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // accent-stripped for broad matching

  // 1. Literal English calques for duration ("por X días" instead of "hace X días" / "llevo X días con")
  const durationCalqueRegex = /(?:dolor|enfermo|malestar|sintomas|problema)\s+por\s+(?:tres|dos|cuatro|cinco|\d+)\s+dias/i;
  if (durationCalqueRegex.test(lower) || /tengo\s+dolor\s+por\s+\d+\s+dias/i.test(lower)) {
    const match = lower.match(/(?:tengo\s+)?(?:dolor|malestar)\s+por\s+\d+\s+dias/i);
    diagnostics.push({
      id: 'calque_duration_' + Math.random().toString(36).substr(2, 6),
      type: 'calque_aspect',
      problematicSegment: match ? match[0] : 'por tres días',
      explanation_es:
        'En español peninsular la duración temporal continua no se expresa con la preposición "por". Se emplea la perífrasis "llevar + [tiempo] + con..." o la fórmula impersonal "hace + [tiempo] + que...".',
      explanation_en:
        'In Spanish, continuous open past duration is not expressed using "por". Use "llevo [tiempo] con..." (I have had for...) or "hace [tiempo] que me duele..." (it has hurt for...).',
      suggestedCorrection: 'Llevo tres días con dolor de estómago / Hace tres días que me duele',
      ruleCitation: 'Nueva Gramática de la Lengua Española (NGLE §23.12: Construcciones de duración temporal aspectual)'
    });
  }

  // 2. Gender mismatch: Masc noun with Fem adjective ("dolor aguda", "dolores agudas", "problema buena", etc.)
  const mascNounFemAdjPatterns = [
    { regex: /\b(dolor|malestar|estomago|medicamento|jarabe)\s+(aguda|suavecita|fuertecita|pesada|continua)\b/i, mascNoun: 'dolor / malestar', femAdj: 'aguda / continua' },
    { regex: /\b(el|un)\s+(medicina|pastilla|receta)\b/i, mascNoun: 'artículo masculino (el/un)', femAdj: 'sustantivo femenino' },
    { regex: /\b(la|una)\s+(estomago|dolor|medicamento|sintoma|problema)\b/i, mascNoun: 'sustantivo masculino con artículo femenino', femAdj: 'la/una' },
    { regex: /\b(dolores)\s+(estomacal|agudo|fuerte)\b/i, mascNoun: 'dolores (plural)', femAdj: 'adjetivo singular' },
    { regex: /\b(pastillas|medicinas)\s+(suave|fuerte|eficaz)\b/i, mascNoun: 'pastillas (plural)', femAdj: 'adjetivo singular' }
  ];

  for (const pattern of mascNounFemAdjPatterns) {
    const match = lower.match(pattern.regex);
    if (match) {
      diagnostics.push({
        id: 'gender_number_' + Math.random().toString(36).substr(2, 6),
        type: 'gender',
        problematicSegment: match[0],
        explanation_es: `Discordancia de concordancia en "${match[0]}". El sustantivo y el adjetivo o determinante deben coincidir estrictamente en género y número gramatical.`,
        explanation_en: `Concordance mismatch in "${match[0]}". The noun and its accompanying modifier must strictly agree in gender and number.`,
        suggestedCorrection: match[0].includes('dolores') ? 'dolores estomacales agudos' : match[0].includes('sintoma') ? 'el síntoma' : match[0].includes('problema') ? 'el problema' : 'dolor agudo y continuo',
        ruleCitation: 'Regla RAE de Concordancia Nominal en Sintagmas Nominales (NGLE §13.3)'
      });
      break;
    }
  }

  // 3. Number Concordance: Singular noun with plural adjective or plural noun with singular adjective
  const numberConcordRegex = /\b(dia|semana|hora)\s+(largos|largas|pesados|pesadas)\b/i;
  const numMatch = lower.match(numberConcordRegex);
  if (numMatch) {
    diagnostics.push({
      id: 'number_' + Math.random().toString(36).substr(2, 6),
      type: 'number',
      problematicSegment: numMatch[0],
      explanation_es: `Falta de concordancia de número en "${numMatch[0]}". Si el sustantivo es singular, el adjetivo debe ser singular.`,
      explanation_en: `Number disagreement in "${numMatch[0]}". If the noun is singular, the adjective must also be singular.`,
      suggestedCorrection: numMatch[0].replace(/s\b/g, ''),
      ruleCitation: 'Concordancia de Número (NGLE §13.2)'
    });
  }

  // 4. Register and politeness check: Blunt "yo quiero" / "dame" in formal medical/service counter
  const bluntRequestRegex = /\b(yo\s+quiero|quiero\s+que\s+tu\s+me\s+des|dame\s+un|necesito\s+que\s+usted\s+darme)\b/i;
  const bluntMatch = lower.match(bluntRequestRegex);
  if (bluntMatch) {
    diagnostics.push({
      id: 'register_' + Math.random().toString(36).substr(2, 6),
      type: 'subjunctive_register',
      problematicSegment: bluntMatch[0],
      explanation_es:
        'En un mostrador de farmacia o ventanilla formal en España, "yo quiero" o "dame" resulta excesivamente directo o impositivo. Se emplean atenuadores de cortesía como el condicional ("me gustaría", "¿podría darme?") o el imperfecto de cortesía ("quería un antiácido").',
      explanation_en:
        'In a pharmacy or service counter in Spain, "yo quiero" sounds overly blunt. Spanish speakers systematically prefer modal softening using the conditional ("¿podría recomendarme...?", "me gustaría...") or courtesy imperfect ("quería...").',
      suggestedCorrection: '¿Podría recomendarme...? / Quisiera un antiácido suave...',
      ruleCitation: 'Pragmática y Cortesía Interpersonal en Español ELE (Instituto Cervantes)'
    });
  }

  // 5. Word order of direct/indirect clitic pronouns with conjugated verbs
  const cliticOrderRegex = /\b(quiero\s+que\s+me\s+usted\s+recomiende|me\s+usted\s+puede\s+dar)\b/i;
  const cliticMatch = lower.match(cliticOrderRegex);
  if (cliticMatch) {
    diagnostics.push({
      id: 'clitic_' + Math.random().toString(36).substr(2, 6),
      type: 'subjunctive_register',
      problematicSegment: cliticMatch[0],
      explanation_es: 'Posición anómala del pronombre clítico. En español el pronombre átono no se separa del verbo conjugado mediante el pronombre sujeto.',
      explanation_en: 'Anomalous clitic pronoun placement. Weak object pronouns must immediately precede the conjugated verb without the subject pronoun inserted between them.',
      suggestedCorrection: '¿Usted me puede dar...? / ...que usted me recomiende',
      ruleCitation: 'Colocación de Pronombres Clíticos (NGLE §16.4)'
    });
  }

  return diagnostics;
}

/**
 * Extracts Syntactic Gaps by contrasting learner input with authentic native corpus models.
 */
export function extractSyntacticGaps(learnerText: string, scenario: PushedOutputScenario): SyntacticGap[] {
  const gaps: SyntacticGap[] = [];
  const lower = learnerText.toLowerCase();

  // Gap 1: Aspectual Duration (Llevar + gerundio / con vs. Literal translations)
  const hasNativeDurationFormula = /llevo\s+(?:ya\s+)?(?:tres|dos|varios|\d+)\s+dias/i.test(lower) || /hace\s+(?:ya\s+)?(?:tres|dos|\d+)\s+dias\s+que/i.test(lower);
  if (!hasNativeDurationFormula && (lower.includes('dia') || lower.includes('días') || lower.includes('tiempo'))) {
    gaps.push({
      id: 'gap_aspect_duration',
      category: 'aspect_duration',
      label_es: 'Estructura de Duración Aspectual',
      label_en: 'Aspectual Duration Structure',
      learnerFormSnippet: learnerText.slice(0, 45) + '...',
      nativeModelSnippet: 'Llevo tres días con un malestar estomacal...',
      pedagogicalContrast_es:
        'El hablante nativo fija el marco temporal continuo con la perífrasis aspectual "llevar + tiempo + con [síntoma]". En tu producción se omitió esta construcción idiomática natural.',
      pedagogicalContrast_en:
        'Native speakers anchor persistent open symptoms using "llevar + [time span] + con [symptom]". Your draft omitted this natural idiomatic periphrasis.'
    });
  }

  // Gap 2: Modal Softening & Polite Request Framing
  const hasPoliteModal = /(?:podria|quisiera|me gustaria|desearia|agradeceria|tendria)\s*(?:usted)?/i.test(lower.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
  if (!hasPoliteModal) {
    gaps.push({
      id: 'gap_pragmatic_politeness',
      category: 'pragmatic_politeness',
      label_es: 'Atenuación Pragmática y Cortesía',
      label_en: 'Pragmatic Softening & Politeness',
      learnerFormSnippet: lower.includes('necesito') ? 'necesito...' : lower.includes('quiero') ? 'quiero...' : 'petición directa',
      nativeModelSnippet: '¿Podría recomendarme...? / Quisiera que me aconsejara...',
      pedagogicalContrast_es:
        'En interacciones transaccionales formales, los hispanohablantes amortiguan la petición con condicional de cortesía para no sonar impositivos.',
      pedagogicalContrast_en:
        'In formal transactional interactions, native Spanish speakers systematically soften requests with conditional modals to avoid sounding abrupt.'
    });
  }

  // Gap 3: Domain Collocation (Antiácido suave / dolor punzante / sin receta)
  const hasExactCollocation = lower.includes('antiacido') || lower.includes('antiácido') || lower.includes('sin receta') || lower.includes('receta medica');
  if (!hasExactCollocation) {
    gaps.push({
      id: 'gap_collocation',
      category: 'collocation',
      label_es: 'Colocación Léxica Específica',
      label_en: 'Target Domain Collocation',
      learnerFormSnippet: 'medicina / pastilla general',
      nativeModelSnippet: 'un antiácido suave que no requiera receta médica',
      pedagogicalContrast_es:
        'El modelo nativo emplea léxico farmacéutico de alta precisión ("antiácido suave", "venta libre / sin receta") en lugar de hiperónimos genéricos ("medicina").',
      pedagogicalContrast_en:
        'The native model utilizes precise domain collocations ("mild antacid", "over the counter / without prescription") rather than generic hypernyms.'
    });
  }

  // If fewer than 2 gaps identified, add general stylistic refinement gap
  if (gaps.length < 2) {
    gaps.push({
      id: 'gap_subordination',
      category: 'mood_choice',
      label_es: 'Subordinación y Subjuntivo Restrictivo',
      label_en: 'Subordination & Restrictive Subjunctive',
      learnerFormSnippet: 'oración simple o yuxtapuesta',
      nativeModelSnippet: '...que no necesite receta médica / ...que sea suave para el estómago',
      pedagogicalContrast_es:
        'Los modelos nativos encadenan cláusulas de relativo adjetivas restrictivas con verbo en subjuntivo ("que no requiera...") para calificar exactamente el producto buscado.',
      pedagogicalContrast_en:
        'Native models chain restrictive relative clauses with the subjunctive mood ("que no requiera...") to specify the precise attributes needed.'
    });
  }

  return gaps;
}

/**
 * Builds the 3 Self-Identification Noticing Prompts for Merrill Swain's Pushed-Output protocol.
 * The learner MUST evaluate these 3 contrasts before proceeding.
 */
export function generateSelfNoticingChecks(
  learnerText: string,
  nativeModel: string,
  scenario: PushedOutputScenario
): SelfNoticingCheck[] {
  return [
    {
      id: 'noticing_check_1_aspect',
      syntacticFeature: 'Expresión de Duración Temporal (Llevar vs. Por/Desde)',
      contrastPrompt_es:
        'Compara tu forma de expresar el tiempo transcurrido con la del modelo nativo ("llevo tres días..."). ¿Qué matiz aspectual aporta la fórmula nativa?',
      contrastPrompt_en:
        'Compare how you expressed the elapsed time against the native model ("llevo tres días..."). What aspectual nuance does the native formula introduce?',
      learnerForm: learnerText.slice(0, 35) + '...',
      nativeForm: 'Llevo tres días con malestar...',
      options: [
        {
          text: 'Enfatiza una acción continua y acumulativa que todavía sigue abierta en el presente inmediato.',
          isCorrect: true,
          explanation: '¡Exacto! "Llevar + tiempo" subraya que el síntoma comenzó en el pasado y continúa afectándote ahora mismo.'
        },
        {
          text: 'Indica una acción que ya concluyó definitivamente ayer.',
          isCorrect: false,
          explanation: 'No; si estuviera concluida se usaría el pretérito indefinido ("tuve dolor").'
        },
        {
          text: 'Es solo una regla decorativa sin diferencia de significado.',
          isCorrect: false,
          explanation: 'No; la sintaxis española codifica el aspecto continuo de forma precisa.'
        }
      ]
    },
    {
      id: 'noticing_check_2_register',
      syntacticFeature: 'Atenuación de Cortesía en la Petición',
      contrastPrompt_es:
        'Observa cómo el nativo solicita la ayuda del farmacéutico ("¿Podría recomendarme...?"). ¿Por qué no utiliza "Yo quiero que me des"?',
      contrastPrompt_en:
        'Observe how the native requests help ("¿Podría recomendarme...?"). Why do they avoid blunt forms like "Yo quiero"?',
      learnerForm: learnerText.slice(0, 40) + '...',
      nativeForm: '¿Podría recomendarme algún antiácido suave...?',
      options: [
        {
          text: 'Porque el condicional y la pregunta indirecta protegen la imagen social del interlocutor y atenúan la orden.',
          isCorrect: true,
          explanation: 'Correcto. La cortesía positiva y negativa en español atenúa la imposición mediante modalidades hipotéticas.'
        },
        {
          text: 'Porque en España está prohibido por ley usar "querer" en farmacias.',
          isCorrect: false,
          explanation: 'Falso; no es una ley civil, sino una norma pragmática y de registro social.'
        },
        {
          text: 'Porque "podría" es más fácil de pronunciar.',
          isCorrect: false,
          explanation: 'Incorrecto; responde a una estrategia discursiva de cortesía.'
        }
      ]
    },
    {
      id: 'noticing_check_3_syntax',
      syntacticFeature: 'Subjuntivo en Cláusula Relativa con Antecedente Inespecífico',
      contrastPrompt_es:
        'En la frase del nativo: "...que no necesite receta", ¿por qué se usa el subjuntivo "necesite" en vez del indicativo "necesita"?',
      contrastPrompt_en:
        'In the native phrase: "...que no necesite receta", why is the subjunctive "necesite" used instead of the indicative "necesita"?',
      learnerForm: '...que no necesita / sin receta...',
      nativeForm: '...algún antiácido suave que no requiera receta médica',
      options: [
        {
          text: 'Porque el hablante busca un medicamento cualquiera con esa propiedad, no un producto específico y conocido de antemano.',
          isCorrect: true,
          explanation: 'Exactamente. Cuando el antecedente es indefinido o inespecífico en una cláusula de relativo, el español exige subjuntivo.'
        },
        {
          text: 'Porque es una regla aleatoria sin justificación semántica.',
          isCorrect: false,
          explanation: 'Incorrecto; el modo subjuntivo aquí señala que el referente específico no está determinado.'
        },
        {
          text: 'Porque todas las oraciones con "que" van obligatoriamente en subjuntivo.',
          isCorrect: false,
          explanation: 'Falso; con antecedente específico y concreto se usa indicativo ("el antiácido que compré ayer").'
        }
      ]
    }
  ];
}

/**
 * Main diagnostic evaluator for Merrill Swain Pushed-Output drills.
 */
export function diagnoseProduction(
  learnerText: string,
  scenario: PushedOutputScenario,
  assistedLemmasRevealed: string[]
): ProductionDiagnosticResult {
  const tokens = tokenizeSpanishSentence(learnerText);
  const wordCount = tokens.length;
  const meetsWordCountMin = wordCount >= scenario.minWords;

  // Track unique lemmas
  const uniqueLemmas = new Set(tokens);

  // Check agreement errors
  const agreementDiagnostics = detectAgreementErrors(learnerText);

  // Extract syntactic gaps against native model
  const primaryNativeModel = scenario.nativeCorpusModels[0] || '';
  const syntacticGaps = extractSyntacticGaps(learnerText, scenario);

  // Generate 3 self-noticing checks
  const selfNoticingChecks = generateSelfNoticingChecks(learnerText, primaryNativeModel, scenario);

  // Detect which assisted lemmas the learner actually used
  const lower = learnerText.toLowerCase();
  const assistedLemmasDetected = scenario.assistedLemmas
    .map(item => item.lemma.split('/')[0].trim())
    .filter(lemma => lower.includes(lemma.toLowerCase()));

  return {
    wordCount,
    meetsWordCountMin,
    minWordsRequired: scenario.minWords,
    tokens,
    uniqueLemmasCount: uniqueLemmas.size,
    agreementDiagnostics,
    syntacticGaps,
    primaryNativeModel,
    alternativeNativeModels: scenario.nativeCorpusModels.slice(1),
    selfNoticingChecks,
    assistedLemmasRevealed,
    assistedLemmasDetected,
    timestamp: new Date().toISOString()
  };
}

// 💾 Local Storage Key for offline fallback & instant caching
const LOCAL_JOURNAL_KEY = 'iberio_learning_journal_entries';

/**
 * Persists free production outputs in the learner's `learningJournal` Firestore collection.
 */
export async function saveLearningJournalEntry(
  entryData: Omit<LearningJournalEntry, 'id' | 'createdAt'>
): Promise<LearningJournalEntry> {
  const timestamp = new Date().toISOString();
  const localId = 'entry_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 5);

  const fullEntry: LearningJournalEntry = {
    ...entryData,
    id: localId,
    createdAt: timestamp
  };

  // 1. Save to localStorage immediately
  try {
    const raw = localStorage.getItem(LOCAL_JOURNAL_KEY);
    const existing: LearningJournalEntry[] = raw ? JSON.parse(raw) : [];
    const updated = [fullEntry, ...existing];
    localStorage.setItem(LOCAL_JOURNAL_KEY, JSON.stringify(updated.slice(0, 100))); // Keep last 100
  } catch (err) {
    console.warn('Local storage journal caching note:', err);
  }

  // 2. Persist to Firestore: collection `users/{userId}/learningJournal` and collection `learningJournal`
  if (entryData.userId && !entryData.userId.startsWith('guest_') && !entryData.userId.startsWith('user_ver_')) {
    try {
      // User subcollection
      const userJournalCol = collection(db, 'users', entryData.userId, 'learningJournal');
      const docRef = await addDoc(userJournalCol, {
        ...fullEntry,
        updatedAt: timestamp
      });
      fullEntry.id = docRef.id;

      // Root mirror collection for analytics
      try {
        const rootJournalCol = collection(db, 'learningJournal');
        await setDoc(doc(rootJournalCol, docRef.id), {
          ...fullEntry,
          updatedAt: timestamp
        });
      } catch (mirrorErr) {
        // Soft fail on mirror
      }
    } catch (dbErr) {
      console.warn('Firestore learningJournal persistence note (using local cache):', dbErr);
    }
  }

  return fullEntry;
}

/**
 * Retrieves the user's persisted learning journal entries.
 */
export async function fetchLearningJournalEntries(userId: string): Promise<LearningJournalEntry[]> {
  const localEntries: LearningJournalEntry[] = [];
  try {
    const raw = localStorage.getItem(LOCAL_JOURNAL_KEY);
    if (raw) {
      const parsed: LearningJournalEntry[] = JSON.parse(raw);
      localEntries.push(...parsed.filter(e => e.userId === userId || !e.userId || e.userId.startsWith('guest_')));
    }
  } catch (err) {
    console.warn('Local journal reading note:', err);
  }

  if (userId && !userId.startsWith('guest_') && !userId.startsWith('user_ver_')) {
    try {
      const userJournalCol = collection(db, 'users', userId, 'learningJournal');
      const q = query(userJournalCol, orderBy('createdAt', 'desc'), limit(50));
      const snap = await getDocs(q);
      const cloudEntries: LearningJournalEntry[] = [];
      snap.forEach(docSnap => {
        cloudEntries.push({
          ...(docSnap.data() as LearningJournalEntry),
          id: docSnap.id
        });
      });

      if (cloudEntries.length > 0) {
        return cloudEntries;
      }
    } catch (dbErr) {
      console.warn('Firestore fetch learningJournal note:', dbErr);
    }
  }

  return localEntries;
}
