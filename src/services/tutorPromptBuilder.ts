/**
 * Michael Long's Interaction Hypothesis: Negotiation of Meaning & Conversational Repair Engine
 *
 * Implements Long's SLA Framework (1983, 1996):
 * When communicative breakdowns occur, native interlocutors do not give metalinguistic
 * grammar corrections in English. Instead, they deploy:
 * 1. Clarification Requests: Prompting the learner to resolve ambiguous or conflicting utterances in Spanish.
 * 2. Confirmation Checks: Confirming learner intent when loanwords, calques, or interlanguage structures appear.
 * 3. Recasts: Implicit native modeling woven seamlessly into the conversational response.
 * 4. Comprehension Checks: Open-ended conversational checks ensuring intersubjective mutual understanding.
 */

import { CEFRLevel, TutorPersona } from '../types';
import {
  ConversationalRepair,
  ConversationalRepairType,
  BilingualTranslationChip,
  ComprehensionCheckItem,
  NegotiationDialogueMetrics,
  TutorChatMessage
} from '../types/chat';

/**
 * Common English loanwords, false friends, and calques that trigger Confirmation Checks in Spanish.
 */
export const CONFIRMATION_CHECK_TRIGGERS: {
  pattern: RegExp;
  targetTerm_es: string;
  regionalContext_es: string;
  confirmationQuestion_es: string;
}[] = [
  {
    pattern: /\b(?:rent|renta|rentar)\b/i,
    targetTerm_es: 'alquiler',
    regionalContext_es: 'En España se suele emplear "alquiler" o "alquilar", mientras que en México se dice "renta".',
    confirmationQuestion_es: 'Entiendo que te refieres al "alquiler", ¿verdad? En España solemos llamarlo así.'
  },
  {
    pattern: /\b(?:library|libreria)\b/i,
    targetTerm_es: 'biblioteca',
    regionalContext_es: '"Librería" es la tienda donde se compran libros; el lugar público de préstamo es la "biblioteca".',
    confirmationQuestion_es: '¿Te refieres a la "biblioteca" para estudiar y tomar prestados libros, o a la "librería" para comprarlos?'
  },
  {
    pattern: /\b(?:excited|excitado)\b/i,
    targetTerm_es: 'ilusionado / emocionado',
    regionalContext_es: 'En español "excitado" tiene connotación física o sexual. Para entusiasmo decimos "emocionado" o "con muchas ganas".',
    confirmationQuestion_es: 'Entiendo que estás muy "emocionado" o "ilusionado" con el plan, ¿no es así?'
  },
  {
    pattern: /\b(?:check in|checking)\b/i,
    targetTerm_es: 'registro / registrarse',
    regionalContext_es: 'En hoteles y aeropuertos se usa "hacer el registro" o "facturar el equipaje".',
    confirmationQuestion_es: '¿Quieres decir hacer el "registro" en recepción para entrar a tu habitación?'
  },
  {
    pattern: /\b(?:actually|actualmente)\b/i,
    targetTerm_es: 'en realidad / de hecho',
    regionalContext_es: '"Actualmente" significa "en estos momentos"; si quieres decir "actually", usamos "en realidad" o "de hecho".',
    confirmationQuestion_es: '¿Dices "en realidad" (actually) o que ocurre "en la actualidad" (nowadays)?'
  },
  {
    pattern: /\b(?:make a decision|hacer una decision)\b/i,
    targetTerm_es: 'tomar una decisión',
    regionalContext_es: 'En español las decisiones se "toman", no se "hacen".',
    confirmationQuestion_es: 'Te refieres a "tomar una decisión" meditada, ¿verdad?'
  }
];

/**
 * Tense conflict and aspectual breakdowns that trigger Clarification Requests.
 */
export const CLARIFICATION_CHECK_PATTERNS: {
  pattern: RegExp;
  feature: string;
  clarification_es: string;
  clarification_en: string;
}[] = [
  {
    pattern: /\b(?:yo\s+)?voy\s+(?:a|al|a\s+la)\s+\w+\s+(?:ayer|anoche|la semana pasada)\b/i,
    feature: 'Conflicto Aspectual: Presente vs Pasado (voy ayer)',
    clarification_es: '¿Quieres decir que *fuiste* ayer, o que tienes planes de ir hoy otra vez?',
    clarification_en: 'Did you mean that you *went* yesterday, or that you plan to go again today?'
  },
  {
    pattern: /\b(?:ayer|anoche)\s+(?:yo\s+)?voy\b/i,
    feature: 'Conflicto Temporal: Ayer voy',
    clarification_es: '¿Te refieres a algo que ya *hiciste* ayer (pasado), o a lo que *vas a hacer* hoy?',
    clarification_en: 'Are you referring to something you already did yesterday, or what you will do today?'
  },
  {
    pattern: /\b(?:fui|estuve)\s+(?:mañana|la próxima semana|el próximo año)\b/i,
    feature: 'Conflicto Temporal: Pasado con ancla de futuro (fui mañana)',
    clarification_es: '¿Dices que *irás* o *vas a ir* mañana, o te refieres a un viaje anterior?',
    clarification_en: 'Do you mean you *will go* tomorrow, or an earlier trip?'
  },
  {
    pattern: /\b(?:yo\s+)?tener\s+(?:hambre|sed|frio|calor|miedo)\s+ayer\b/i,
    feature: 'Infinitivo no flexionado en contexto de pasado',
    clarification_es: '¿Tenías esa sensación ayer durante todo el día, o fue solo un momento puntual en el que *tuviste* esa impresión?',
    clarification_en: 'Did you feel that way all day yesterday (tenías), or was it a specific moment (tuviste)?'
  }
];

/**
 * Culturally grounded Comprehension Checks to pose after explaining an opinion or nuance.
 */
export const COMPREHENSION_CHECK_POOL: ComprehensionCheckItem[] = [
  {
    prompt_es: '¿Te ha ocurrido algo parecido alguna vez?',
    prompt_en: 'Has something similar ever happened to you?',
    openEndedQuestion: '¿Te ha ocurrido algo parecido alguna vez?',
    suggestedAnswers: [
      'Sí, una vez me pasó algo muy similar en un viaje.',
      'Todavía no, pero es muy bueno saberlo para el futuro.',
      'En mi país la costumbre es un poco diferente.'
    ]
  },
  {
    prompt_es: '¿Tiene sentido para ti cómo usamos esta expresión en el día a día?',
    prompt_en: 'Does it make sense to you how we use this expression in everyday life?',
    openEndedQuestion: '¿Tiene sentido esta forma de decirlo?',
    suggestedAnswers: [
      'Sí, tiene mucho sentido y suena mucho más natural.',
      'Me cuesta un poco recordarla, pero entiendo el matiz.',
      '¿Hay alguna otra forma coloquial de decir lo mismo?'
    ]
  },
  {
    prompt_es: '¿Cómo se suele expresar una situación así en tu propia cultura o idioma?',
    prompt_en: 'How is a situation like this typically expressed in your own culture or language?',
    openEndedQuestion: '¿Cómo lo dirías en tu lengua materna?',
    suggestedAnswers: [
      'En mi idioma usamos una palabra muy parecida.',
      'En mi país somos más directos en esas situaciones.',
      'Nosotros también usamos una fórmula de cortesía similar.'
    ]
  }
];

/**
 * Builds the Michael Long Interaction Hypothesis System Prompt for the AI Tutor.
 */
export function buildNegotiationOfMeaningSystemPrompt(params: {
  persona: TutorPersona;
  userLevel: CEFRLevel;
  targetDialect?: string;
  isArabic?: boolean;
}): string {
  const { persona, userLevel, targetDialect = 'spain', isArabic = false } = params;

  // Immersion ratio determination:
  // Intermediate/Advanced (B1+): 100% Spanish conversation, repair exclusively in Spanish.
  // Beginner (A1-A2): 85% Spanish with bilingual translation chips.
  const isBeginner = userLevel === 'A1' || userLevel === 'A2';
  const immersionRatio = isBeginner ? 0.85 : 1.0;

  return `
### THE INTERACTION HYPOTHESIS & NEGOTIATION OF MEANING PROTOCOL (Michael Long):
You are an authentic, warm native Spanish conversational partner and language coach.
Your mission is to foster second language acquisition through GENUINE COMMUNICATIVE INTERACTION.

When the student makes a mistake or a communicative breakdown occurs:
❌ NEVER lecture them with textbook metalinguistic rules in English (e.g., "Error: you must use preterite 'fui' instead of 'voy'").
❌ NEVER stop the conversation dead with mechanical error correction banners.

Instead, execute Long's AUTHENTIC CONVERSATIONAL REPAIR MECHANISMS:

1. **Clarification Requests (Petición de Aclaración)**:
   - When the learner makes an ambiguous, conflicting, or ungrammatical statement (e.g., "Yo voy a la biblioteca ayer"):
   - Formulate a natural clarification check in Spanish offering communicative alternatives:
     * "¿Quieres decir que *fuiste* ayer, o que tienes planes de ir hoy otra vez?"
     * "¿Te refieres a lo que hiciste ayer o a lo que vas a hacer?"

2. **Confirmation Checks (Comprobación de Confirmación)**:
   - When the learner uses an English loanword, false friend, or English syntactic calque (e.g., "rent", "library", "excited", "hacer una decisión"):
   - Verify their communicative intent in Spanish naturally:
     * "Entiendo que te refieres al 'alquiler', ¿verdad? En España solemos llamarlo así."
     * "¿Te refieres a la 'biblioteca' pública para estudiar, o a una 'librería' para comprar libros?"
     * "Deduzco que estás 'emocionado' o con muchas ganas, ¿no es así?"

3. **Recasts (Reformulación Implícita)**:
   - Smoothly incorporate the correct morphological, prepositional, or syntactic form into your next conversational turn without interrupting the discourse flow.
   - Example:
     - User: "Mi hermana tiene 12 años y gusta bailar salsa."
     - You: "¡Qué maravilla que a tu hermana le guste tanto bailar salsa! ¿Baila en una academia o en casa con la familia?"

4. **Comprehension Check Protocol (Comprobación de Comprensión)**:
   - Whenever you share a cultural insight, explain an idiomatic nuance, or express an opinion:
   - ALWAYS close your turn with a brief, warm open-ended follow-up check:
     * "¿Te ha ocurrido algo parecido alguna vez?"
     * "¿Tiene sentido para ti cómo lo decimos aquí?"
     * "¿Cómo lo ves tú?"

5. **Dynamic Spanish Immersion Ratio**:
   - Current Learner Level: **${userLevel}**
   ${
     isBeginner
       ? `- Immersion Level: 85% Spanish immersion with bilingual translation chips provided for new idioms and key expressions.
- Keep sentences accessible, rhythmic, and high-frequency, but NEVER abandon Spanish in the primary response.
- All repair checks MUST be expressed in Spanish, with concise bilingual translation tags provided.`
       : `- Immersion Level: 100% Spanish immersion.
- Both primary conversational discourse and all conversational repairs (clarifications, confirmations, recasts) MUST be conducted EXCLUSIVELY in Spanish.`
   }

6. **Structured Response Output**:
   Always populate the "repair" field in your JSON analysis if a repair was applied:
   - "type": "clarification_request" | "confirmation_check" | "recast" | "comprehension_check" | "spontaneous_flow"
   - "triggerSegment": the exact non-target or ambiguous words said by the user
   - "repairInSpanish": how you negotiated the meaning
   - "pedagogicalRationale_es": why this repair builds communicative competence
`.trim();
}

/**
 * Analyzes the user's input client-side for immediate Negotiation of Meaning triggers.
 */
export function analyzeConversationalBreakdown(
  userUtterance: string,
  userLevel: CEFRLevel
): ConversationalRepair | null {
  const clean = userUtterance.trim();
  const lower = clean.toLowerCase();

  // 1. Check for Confirmation Check triggers (English loanwords & false cognates)
  for (const trigger of CONFIRMATION_CHECK_TRIGGERS) {
    if (trigger.pattern.test(lower)) {
      const match = lower.match(trigger.pattern);
      return {
        id: 'repair_conf_' + Math.random().toString(36).substring(2, 8),
        type: 'confirmation_check',
        triggerSegment: match ? match[0] : 'préstamo léxico',
        repairInSpanish: trigger.confirmationQuestion_es,
        pedagogicalRationale_es: `Comprobación de confirmación: Se valida el significado intentado introduciendo el término idiomático "${trigger.targetTerm_es}".`,
        pedagogicalRationale_en: `Confirmation check: Clarifying intended meaning while introducing the native term "${trigger.targetTerm_es}".`,
        targetLinguisticFeature: `Léxico y Falsos Amigos: ${trigger.targetTerm_es}`
      };
    }
  }

  // 2. Check for Clarification Request triggers (Aspectual / Tense contradictions)
  for (const item of CLARIFICATION_CHECK_PATTERNS) {
    if (item.pattern.test(lower)) {
      const match = lower.match(item.pattern);
      return {
        id: 'repair_clar_' + Math.random().toString(36).substring(2, 8),
        type: 'clarification_request',
        triggerSegment: match ? match[0] : 'conflicto temporal',
        repairInSpanish: item.clarification_es,
        pedagogicalRationale_es:
          'Petición de aclaración: Se ayuda al estudiante a notar el conflicto temporal entre el presente y el ancla temporal de pasado sin darle una orden punitiva.',
        pedagogicalRationale_en:
          'Clarification request: Prompting the learner to notice the aspectual contrast between present and past temporal anchors naturally.',
        targetLinguisticFeature: item.feature
      };
    }
  }

  // 3. Check for Recast triggers (Common grammatical slips: "yo tiene", "me gusta ellos", "la problema")
  if (/\byo tiene\b/i.test(lower)) {
    return {
      id: 'repair_recast_' + Math.random().toString(36).substring(2, 8),
      type: 'recast',
      triggerSegment: 'yo tiene',
      repairInSpanish: '...tienes toda la razón al tener eso en cuenta...',
      pedagogicalRationale_es:
        'Reformulación implícita (Recast): Se modela la primera persona "tengo" dentro de la respuesta conversacional sin interrumpir el diálogo.',
      pedagogicalRationale_en:
        'Implicit recast: Modeling first-person "tengo" within conversational flow without breaking communication.',
      targetLinguisticFeature: 'Morfología Verbal: Concordancia Sujeto-Verbo (yo tengo)'
    };
  }

  if (/\bla problema\b/i.test(lower)) {
    return {
      id: 'repair_recast_' + Math.random().toString(36).substring(2, 8),
      type: 'recast',
      triggerSegment: 'la problema',
      repairInSpanish: '...es verdad que el problema que mencionas es importante...',
      pedagogicalRationale_es:
        'Recast de género: "Problema" es de origen griego y masculino ("el problema"). Se reformula en el flujo conversacional.',
      pedagogicalRationale_en:
        'Gender recast: "Problema" is masculine ("el problema"). Recast naturally in dialogue.',
      targetLinguisticFeature: 'Género Nominal: Sustantivos en -ma de origen griego'
    };
  }

  return null;
}

/**
 * Computes conversational metrics verifying the Acceptance Criteria:
 * At least 3 types of authentic conversational repair (Clarification, Confirmation, Recast)
 * per 10-turn dialogue.
 */
export function evaluateDialogueNegotiationMetrics(
  messages: TutorChatMessage[],
  userLevel: CEFRLevel
): NegotiationDialogueMetrics {
  let clarificationRequestsCount = 0;
  let confirmationChecksCount = 0;
  let recastsCount = 0;
  let comprehensionChecksCount = 0;

  // Inspect AI messages for registered repairs
  messages
    .filter(m => m.sender === 'ai')
    .forEach(m => {
      if (m.repair) {
        switch (m.repair.type) {
          case 'clarification_request':
            clarificationRequestsCount++;
            break;
          case 'confirmation_check':
            confirmationChecksCount++;
            break;
          case 'recast':
            recastsCount++;
            break;
          case 'comprehension_check':
            comprehensionChecksCount++;
            break;
        }
      }

      if (m.repairsApplied) {
        m.repairsApplied.forEach(r => {
          if (r.type === 'clarification_request') clarificationRequestsCount++;
          if (r.type === 'confirmation_check') confirmationChecksCount++;
          if (r.type === 'recast') recastsCount++;
          if (r.type === 'comprehension_check') comprehensionChecksCount++;
        });
      }

      if (m.comprehensionCheck) {
        comprehensionChecksCount++;
      }
    });

  const distinctTypes = [
    clarificationRequestsCount > 0,
    confirmationChecksCount > 0,
    recastsCount > 0
  ].filter(Boolean).length;

  const immersionRatio = userLevel === 'A1' || userLevel === 'A2' ? 0.85 : 1.0;

  return {
    totalTurns: messages.length,
    clarificationRequestsCount,
    confirmationChecksCount,
    recastsCount,
    comprehensionChecksCount,
    immersionRatio,
    threeRepairsAchieved: distinctTypes >= 3
  };
}
