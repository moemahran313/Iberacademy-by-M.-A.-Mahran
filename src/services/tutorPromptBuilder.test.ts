import {
  analyzeConversationalBreakdown,
  buildNegotiationOfMeaningSystemPrompt,
  evaluateDialogueNegotiationMetrics,
  COMPREHENSION_CHECK_POOL
} from './tutorPromptBuilder';
import { TutorChatMessage } from '../types/chat';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

console.log("🧪 RUNNING MICHAEL LONG'S INTERACTION HYPOTHESIS & NEGOTIATION OF MEANING TEST SUITE...\n");

// 1. Clarification Request Test: "Yo voy a la biblioteca ayer"
const ambiguousInput = 'Yo voy a la biblioteca ayer';
const breakdown1 = analyzeConversationalBreakdown(ambiguousInput, 'A2');
assert(breakdown1 !== null, 'Detected conversational breakdown for "Yo voy a la biblioteca ayer"');
assert(breakdown1!.type === 'clarification_request', 'Breakdown categorized as clarification_request');
assert(
  breakdown1!.repairInSpanish.includes('fuiste ayer') || breakdown1!.repairInSpanish.includes('planes'),
  'Clarification request offers natural Spanish communicative alternatives'
);
assert(
  !breakdown1!.repairInSpanish.toLowerCase().includes('error: you must'),
  'Avoids harsh textbook English error lecture'
);

// 2. Confirmation Check Test: English loanwords / false cognates ("rent")
const loanwordInput = 'Necesito pagar el rent de mi apartamento este mes.';
const breakdown2 = analyzeConversationalBreakdown(loanwordInput, 'B1');
assert(breakdown2 !== null, 'Detected loanword trigger for "rent"');
assert(breakdown2!.type === 'confirmation_check', 'Breakdown categorized as confirmation_check');
assert(
  breakdown2!.repairInSpanish.includes('alquiler'),
  'Confirmation check prompts native equivalent "alquiler"'
);
assert(
  breakdown2!.repairInSpanish.includes('¿verdad?'),
  'Confirmation check uses natural conversational tag question'
);

// 2b. Confirmation Check Test: False cognate "library"
const libraryInput = 'Estuve estudiando en el library toda la tarde.';
const breakdown2b = analyzeConversationalBreakdown(libraryInput, 'A2');
assert(breakdown2b !== null, 'Detected false friend for "library"');
assert(breakdown2b!.type === 'confirmation_check', 'Breakdown categorized as confirmation_check');
assert(
  breakdown2b!.repairInSpanish.includes('biblioteca'),
  'Confirmation check disambiguates biblioteca vs librería'
);

// 3. Recast Test: "yo tiene"
const recastInput = 'Yo tiene mucho trabajo esta semana.';
const breakdown3 = analyzeConversationalBreakdown(recastInput, 'A1');
assert(breakdown3 !== null, 'Detected morphological slip in "yo tiene"');
assert(breakdown3!.type === 'recast', 'Breakdown categorized as recast');

// 4. Comprehension Check Protocol
assert(COMPREHENSION_CHECK_POOL.length >= 3, 'Comprehension check pool contains at least 3 cultural checks');
const hasOpenEndedCheck = COMPREHENSION_CHECK_POOL.some(c =>
  c.prompt_es.includes('¿Te ha ocurrido algo parecido alguna vez?')
);
assert(hasOpenEndedCheck, 'Includes mandatory check "¿Te ha ocurrido algo parecido alguna vez?"');

// 5. Dynamic Immersion Ratio
const beginnerPrompt = buildNegotiationOfMeaningSystemPrompt({ persona: 'sofia', userLevel: 'A1' });
assert(beginnerPrompt.includes('85% Spanish immersion'), 'A1/A2 configured for 85% Spanish immersion with chips');
const advancedPrompt = buildNegotiationOfMeaningSystemPrompt({ persona: 'sofia', userLevel: 'B2' });
assert(advancedPrompt.includes('100% Spanish immersion'), 'B1+ configured for 100% Spanish immersion');

// 6. Acceptance Criteria: Conversation logs demonstrate at least 3 types of authentic conversational repair per 10-turn dialogue
const sampleDialogue: TutorChatMessage[] = [
  { id: '1', sender: 'ai', spanishText: '¡Hola! ¿Cómo estás?', timestamp: new Date().toISOString() },
  { id: '2', sender: 'user', spanishText: 'Yo voy a la biblioteca ayer.', timestamp: new Date().toISOString() },
  {
    id: '3',
    sender: 'ai',
    spanishText: '¿Quieres decir que *fuiste* ayer, o que tienes planes de ir hoy otra vez?',
    timestamp: new Date().toISOString(),
    repair: {
      id: 'r1',
      type: 'clarification_request',
      repairInSpanish: '¿Quieres decir que fuiste ayer?',
      pedagogicalRationale_es: 'Aclaración de aspecto temporal',
      pedagogicalRationale_en: 'Clarification of temporal aspect',
      targetLinguisticFeature: 'Pretérito Indefinido'
    }
  },
  { id: '4', sender: 'user', spanishText: 'Fui ayer para pagar el rent de los libros.', timestamp: new Date().toISOString() },
  {
    id: '5',
    sender: 'ai',
    spanishText: 'Entiendo que te refieres al "alquiler", ¿verdad? En España solemos llamarlo así.',
    timestamp: new Date().toISOString(),
    repair: {
      id: 'r2',
      type: 'confirmation_check',
      repairInSpanish: 'Entiendo que te refieres al alquiler, ¿verdad?',
      pedagogicalRationale_es: 'Confirmación de préstamo léxico',
      pedagogicalRationale_en: 'Confirmation of lexical loanword',
      targetLinguisticFeature: 'Léxico: Alquiler'
    }
  },
  { id: '6', sender: 'user', spanishText: 'Sí, y yo tiene que devolverlos hoy.', timestamp: new Date().toISOString() },
  {
    id: '7',
    sender: 'ai',
    spanishText: 'Claro, es bueno que tengas tiempo de devolverlos a tiempo.',
    timestamp: new Date().toISOString(),
    repair: {
      id: 'r3',
      type: 'recast',
      repairInSpanish: '...es bueno que tengas tiempo...',
      pedagogicalRationale_es: 'Reformulación implícita de verbo',
      pedagogicalRationale_en: 'Implicit recast of verb',
      targetLinguisticFeature: 'Morfología: Tener'
    },
    comprehensionCheck: COMPREHENSION_CHECK_POOL[0]
  },
  { id: '8', sender: 'user', spanishText: '¿Te ha ocurrido algo parecido alguna vez?', timestamp: new Date().toISOString() },
  { id: '9', sender: 'ai', spanishText: '¡Muchas veces! Las bibliotecas siempre tienen fechas límite estrictas.', timestamp: new Date().toISOString() },
  { id: '10', sender: 'user', spanishText: 'Muchas gracias por la ayuda.', timestamp: new Date().toISOString() }
];

const metrics = evaluateDialogueNegotiationMetrics(sampleDialogue, 'B1');
assert(metrics.totalTurns === 10, 'Dialogue consists of 10 turns');
assert(metrics.clarificationRequestsCount >= 1, 'Log contains clarification requests (count >= 1)');
assert(metrics.confirmationChecksCount >= 1, 'Log contains confirmation checks (count >= 1)');
assert(metrics.recastsCount >= 1, 'Log contains recasts (count >= 1)');
assert(metrics.threeRepairsAchieved === true, 'Acceptance Criteria: >= 3 distinct repair types demonstrated in 10-turn dialogue');

console.log('\n========================================');
console.log("🎉 ALL MICHAEL LONG'S INTERACTION HYPOTHESIS TESTS PASSED PERFECTLY!");
