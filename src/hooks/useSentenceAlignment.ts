import { useMemo } from 'react';
import { WordToken, groupTokensIntoSentences } from '../utils/lingqEngine';

export interface AlignedSentencePair {
  globalIndex: number;
  pairId: string;
  paragraphIndex: number;
  sentenceIndexInPara: number;
  spanishText: string;
  spanishTokens: WordToken[];
  englishText: string;
  arabicText?: string;
}

export interface AlignedParagraphGroup {
  paragraphIndex: number;
  pairs: AlignedSentencePair[];
}

export interface SentenceAlignmentResult {
  alignedPairs: AlignedSentencePair[];
  paragraphGroups: AlignedParagraphGroup[];
  totalSentences: number;
  hasTranslations: boolean;
  hasArabic: boolean;
}

/**
 * Robust sentence splitter that avoids splitting on common abbreviations, titles, and decimals
 */
export function splitIntoCleanSentences(text: string, language: 'en' | 'es' | 'ar' = 'en'): string[] {
  if (!text || !text.trim()) return [];

  // Protect common honorifics & abbreviations
  const protectedText = text
    .replace(/(?:Mr|Mrs|Ms|Dr|Prof|Sr|Sra|Srta|vs|etc|e\.g|i\.e|pág|cap|núm|vol)\./gi, match => {
      return match.replace('.', '___DOT___');
    })
    .replace(/(\d+)\.(\d+)/g, '$1___DECIMAL___$2');

  // Split on sentence-ending punctuation followed by whitespace or quotes
  const rawSentences = protectedText.split(/(?<=[.!?؟…])\s+(?=[¿¡A-ZÁÉÍÓÚÑ0-9"“'‘\u0600-\u06FF])/);

  return rawSentences
    .map(s =>
      s
        .replace(/___DOT___/g, '.')
        .replace(/___DECIMAL___/g, '.')
        .trim()
    )
    .filter(s => s.length > 0);
}

/**
 * Aligns Spanish sentences within each paragraph to English and Arabic translations.
 * Guarantees zero dropped sentences even if sentence count differs between source and target.
 */
export function useSentenceAlignment(
  tokenizedParagraphs: WordToken[][],
  englishParagraphs: string[],
  arabicParagraphs: string[] = []
): SentenceAlignmentResult {
  return useMemo(() => {
    let globalCounter = 0;
    const allPairs: AlignedSentencePair[] = [];
    const groups: AlignedParagraphGroup[] = [];

    const hasTranslations = englishParagraphs.some(p => p.trim().length > 0);
    const hasArabic = arabicParagraphs.some(p => p.trim().length > 0);

    tokenizedParagraphs.forEach((paraTokens, pIdx) => {
      const spanishSentences = groupTokensIntoSentences(paraTokens);
      const enParaText = englishParagraphs[pIdx] || '';
      const arParaText = arabicParagraphs[pIdx] || '';

      const enSentences = splitIntoCleanSentences(enParaText, 'en');
      const arSentences = splitIntoCleanSentences(arParaText, 'ar');

      const sCount = spanishSentences.length;
      const eCount = enSentences.length;
      const aCount = arSentences.length;

      const paraPairs: AlignedSentencePair[] = [];

      spanishSentences.forEach((sObj, sIdx) => {
        let alignedEn = '';
        let alignedAr = '';

        // Proportional / 1:1 English mapping
        if (eCount === 0) {
          alignedEn = enParaText || '';
        } else if (sCount === eCount) {
          alignedEn = enSentences[sIdx];
        } else if (sCount > eCount) {
          // More Spanish sentences than English: map proportionally
          const eIndex = Math.min(eCount - 1, Math.floor((sIdx / sCount) * eCount));
          alignedEn = enSentences[eIndex];
        } else {
          // More English sentences than Spanish: combine English slice so no translation is dropped
          const startIdx = Math.floor((sIdx / sCount) * eCount);
          const endIdx = Math.floor(((sIdx + 1) / sCount) * eCount);
          alignedEn = enSentences.slice(startIdx, Math.max(startIdx + 1, endIdx)).join(' ');
        }

        // Proportional / 1:1 Arabic mapping
        if (aCount === 0) {
          alignedAr = arParaText || '';
        } else if (sCount === aCount) {
          alignedAr = arSentences[sIdx];
        } else if (sCount > aCount) {
          const aIndex = Math.min(aCount - 1, Math.floor((sIdx / sCount) * aCount));
          alignedAr = arSentences[aIndex];
        } else {
          const startIdx = Math.floor((sIdx / sCount) * aCount);
          const endIdx = Math.floor(((sIdx + 1) / sCount) * aCount);
          alignedAr = arSentences.slice(startIdx, Math.max(startIdx + 1, endIdx)).join(' ');
        }

        const pair: AlignedSentencePair = {
          globalIndex: globalCounter++,
          pairId: `aligned-sentence-${pIdx}-${sIdx}`,
          paragraphIndex: pIdx,
          sentenceIndexInPara: sIdx,
          spanishText: sObj.text,
          spanishTokens: sObj.tokens,
          englishText: alignedEn,
          arabicText: alignedAr || undefined
        };

        paraPairs.push(pair);
        allPairs.push(pair);
      });

      groups.push({
        paragraphIndex: pIdx,
        pairs: paraPairs
      });
    });

    return {
      alignedPairs: allPairs,
      paragraphGroups: groups,
      totalSentences: allPairs.length,
      hasTranslations,
      hasArabic
    };
  }, [tokenizedParagraphs, englishParagraphs, arabicParagraphs]);
}
