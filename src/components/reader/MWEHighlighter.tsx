import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Sparkles, BookmarkPlus, BookmarkCheck, Check, Layers, ChevronRight, X } from 'lucide-react';
import { WordToken } from '../../utils/lingqEngine';
import { MultiWordExpression, MWEMatch, MultiTokenSelection } from '../../types/vocabulary';
import { findMWEMatchesInTokens, lookupMWEByPhrase } from '../../data/spanishMWEs';

interface MWEHighlighterProps {
  tokens: WordToken[];
  onSelectWord: (token: WordToken, event?: React.MouseEvent) => void;
  onSelectMWE: (mwe: MultiWordExpression, tokens: WordToken[]) => void;
  onSaveCustomMultiToken: (phrase: string, tokens: WordToken[]) => void;
  selectedTokenId: string | null;
  selectedMWETokenIds: string[];
}

export const MWEHighlighter: React.FC<MWEHighlighterProps> = ({
  tokens,
  onSelectWord,
  onSelectMWE,
  onSaveCustomMultiToken,
  selectedTokenId,
  selectedMWETokenIds
}) => {
  // Pre-scan tokens for automated Multi-Word Expression patterns
  const mweMatches = useMemo(() => {
    return findMWEMatchesInTokens(tokens);
  }, [tokens]);

  // Index MWE matches by token ID for instant lookup
  const tokenToMWEMap = useMemo(() => {
    const map = new Map<string, MWEMatch>();
    mweMatches.forEach(match => {
      match.tokenIds.forEach(tId => {
        map.set(tId, match);
      });
    });
    return map;
  }, [mweMatches]);

  // Active Multi-Token drag / Shift-click selection state
  const [dragStartIndex, setDragStartIndex] = useState<number | null>(null);
  const [dragCurrentIndex, setDragCurrentIndex] = useState<number | null>(null);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [activeMultiSelection, setActiveMultiSelection] = useState<MultiTokenSelection | null>(null);
  const [disambiguationChoice, setDisambiguationChoice] = useState<{
    singleToken: WordToken;
    mweMatch: MWEMatch;
    eventPosition: { x: number; y: number };
  } | null>(null);

  const wordTokens = useMemo(() => tokens.filter(t => t.isWord), [tokens]);

  // Desktop click & drag and Shift + Click handlers
  const handleTokenMouseDown = (tokenIndex: number, e: React.MouseEvent) => {
    if (e.shiftKey && dragStartIndex !== null) {
      // Shift + Click range selection
      applyRangeSelection(dragStartIndex, tokenIndex);
      return;
    }

    setIsMouseDown(true);
    setDragStartIndex(tokenIndex);
    setDragCurrentIndex(tokenIndex);
  };

  const handleTokenMouseEnter = (tokenIndex: number) => {
    if (isMouseDown && dragStartIndex !== null) {
      setDragCurrentIndex(tokenIndex);
    }
  };

  const handleMouseUp = () => {
    if (isMouseDown && dragStartIndex !== null && dragCurrentIndex !== null) {
      if (dragStartIndex !== dragCurrentIndex) {
        applyRangeSelection(dragStartIndex, dragCurrentIndex);
      }
    }
    setIsMouseDown(false);
  };

  const applyRangeSelection = (startIdx: number, endIdx: number) => {
    const min = Math.min(startIdx, endIdx);
    const max = Math.max(startIdx, endIdx);

    // Limit selection to maximum 6 adjacent tokens within same sentence
    const clampedMax = Math.min(min + 5, max);
    const selected = wordTokens.slice(min, clampedMax + 1);

    if (selected.length > 1) {
      const phrase = selected.map(t => t.clean).join(' ');
      setActiveMultiSelection({
        tokenIds: selected.map(t => t.id),
        cleanWords: selected.map(t => t.clean),
        combinedPhrase: phrase,
        sentenceIndex: selected[0].sentenceIndex,
        fullSentence: selected[0].fullSentence
      });
    }
  };

  // Mobile Long-Press gesture handling (up to 5 tokens)
  const touchTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = (tokenIndex: number) => {
    touchTimerRef.current = setTimeout(() => {
      // Trigger selection across 3-5 tokens
      const start = tokenIndex;
      const end = Math.min(wordTokens.length - 1, start + 3);
      applyRangeSelection(start, end);
    }, 550);
  };

  const handleTouchEnd = () => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
    }
  };

  // Click on a token: check if it belongs to an MWE
  const handleTokenClick = (token: WordToken, event: React.MouseEvent) => {
    const mweMatch = tokenToMWEMap.get(token.id);

    if (mweMatch) {
      // Prompt user with choice: "Select single word" OR "Select phrase"
      event.stopPropagation();
      setDisambiguationChoice({
        singleToken: token,
        mweMatch,
        eventPosition: { x: event.clientX, y: event.clientY }
      });
    } else {
      // Standard single word inspection
      setDisambiguationChoice(null);
      onSelectWord(token, event);
    }
  };

  return (
    <>
      {/* Global MouseUp Listener for drag selections */}
      <div onMouseUp={handleMouseUp} className="contents" />

      {/* Disambiguation Choice Popover: Single Word vs MWE Phrase */}
      {disambiguationChoice && (
        <div
          className="fixed z-[150] bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-2xl shadow-xl p-3.5 space-y-2.5 max-w-xs animate-fadeIn font-sans"
          style={{
            top: `${Math.min(window.innerHeight - 160, Math.max(16, disambiguationChoice.eventPosition.y - 80))}px`,
            left: `${Math.min(window.innerWidth - 300, Math.max(16, disambiguationChoice.eventPosition.x - 120))}px`
          }}
        >
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
            <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Expresión detectada
            </span>
            <button
              onClick={() => setDisambiguationChoice(null)}
              className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1.5">
            {/* Option A: Select Full Multi-Word Expression */}
            <button
              onClick={() => {
                const matchedTokens = wordTokens.filter(t => disambiguationChoice.mweMatch.tokenIds.includes(t.id));
                onSelectMWE(disambiguationChoice.mweMatch.mwe, matchedTokens);
                setDisambiguationChoice(null);
              }}
              className="w-full text-left p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-800 transition cursor-pointer"
            >
              <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 block">
                Seleccionar frase completa
              </span>
              <span className="text-xs font-black text-stone-900 dark:text-stone-100 block capitalize">
                "{disambiguationChoice.mweMatch.mwe.phrase_es}"
              </span>
              <span className="text-[11px] text-stone-500 dark:text-stone-400 block truncate">
                {disambiguationChoice.mweMatch.mwe.phrase_en}
              </span>
            </button>

            {/* Option B: Select Individual Word */}
            <button
              onClick={(e) => {
                onSelectWord(disambiguationChoice.singleToken, e);
                setDisambiguationChoice(null);
              }}
              className="w-full text-left p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition cursor-pointer text-xs flex items-center justify-between"
            >
              <span>Seleccionar palabra: <strong>"{disambiguationChoice.singleToken.clean}"</strong></span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Badge for Custom Multi-Token Selection */}
      {activeMultiSelection && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[140] bg-stone-900 text-white rounded-2xl p-3 shadow-2xl flex items-center gap-3 border border-stone-700 animate-slideUp font-sans">
          <div className="space-y-0.5 max-w-[200px] sm:max-w-xs">
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
              Frase seleccionada ({activeMultiSelection.cleanWords.length} palabras)
            </span>
            <span className="text-sm font-black truncate block">
              "{activeMultiSelection.combinedPhrase}"
            </span>
          </div>

          <button
            onClick={() => {
              const matchedTokens = wordTokens.filter(t => activeMultiSelection.tokenIds.includes(t.id));
              onSaveCustomMultiToken(activeMultiSelection.combinedPhrase, matchedTokens);
              setActiveMultiSelection(null);
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition cursor-pointer flex items-center gap-1.5 shrink-0 shadow-sm"
          >
            <BookmarkPlus className="w-3.5 h-3.5" />
            <span>Guardar en SRS</span>
          </button>

          <button
            onClick={() => setActiveMultiSelection(null)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white transition cursor-pointer"
            title="Cancelar selección"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
};
