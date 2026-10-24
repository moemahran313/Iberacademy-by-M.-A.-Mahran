import React, { useState } from 'react';
import {
  Volume2,
  X,
  BookmarkPlus,
  BookmarkCheck,
  Check,
  Bookmark,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { WordDefinitionMatch, WordToken } from '../../utils/lingqEngine';
import { AcquisitionStage, STAGE_CONFIGS } from '../../types/vocabulary';
import { LemmatizationResult } from '../../utils/spanishLemmatizer';
import { CollocationPairing } from '../../types/vocabulary';
import { CollocationCard } from '../vocabulary/CollocationCard';

interface WordPopoverProps {
  wordOrPhrase: string;
  isMWE?: boolean;
  mweDescription?: string;
  wordDef: WordDefinitionMatch;
  currentStage: AcquisitionStage;
  isSavedInSRS: boolean;
  lemmaAnalysis: LemmatizationResult | null;
  collocations: CollocationPairing[];
  onSetStage: (stage: AcquisitionStage) => void;
  onToggleSaveSRS: () => void;
  onClose: () => void;
  onSpeak: (text: string, voice?: 'mexico' | 'spain') => void;
  onSaveLemma?: (lemma: string) => void;
  isLemmaSaved?: boolean;
}

export const WordPopover: React.FC<WordPopoverProps> = ({
  wordOrPhrase,
  isMWE = false,
  mweDescription,
  wordDef,
  currentStage,
  isSavedInSRS,
  lemmaAnalysis,
  collocations,
  onSetStage,
  onToggleSaveSRS,
  onClose,
  onSpeak,
  onSaveLemma,
  isLemmaSaved = false
}) => {
  const [activeTab, setActiveTab] = useState<'meaning' | 'collocations'>('meaning');

  return (
    <div className="flex flex-col max-h-[min(85dvh,600px)] overflow-hidden font-sans">
      {/* Popover Header */}
      <div className="p-3.5 bg-stone-50/90 dark:bg-stone-800/60 border-b border-stone-200/70 dark:border-stone-800 flex items-start justify-between gap-2 shrink-0">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-base font-black text-stone-900 dark:text-stone-100 capitalize">
              {wordOrPhrase}
            </span>

            {isMWE ? (
              <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/20">
                Frase / MWE
              </span>
            ) : (
              <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-[#C85A32]/15 text-[#C85A32] dark:text-[#E07A5F]">
                {wordDef.cefr || 'A1'}
              </span>
            )}

            <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold text-stone-500 dark:text-stone-400 bg-stone-200/60 dark:bg-stone-700/60 uppercase">
              {isMWE ? 'expresión' : wordDef.partOfSpeech || 'palabra'}
            </span>
          </div>

          {wordDef.phonetic && !isMWE && (
            <span className="text-[11px] font-mono text-stone-400 block mt-0.5">
              /{wordDef.phonetic}/
            </span>
          )}
        </div>

        {/* Audio buttons and close */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onSpeak(wordOrPhrase, 'mexico')}
            className="p-1.5 rounded-lg bg-stone-200/70 dark:bg-stone-700 text-stone-700 dark:text-stone-200 hover:bg-amber-100 dark:hover:bg-amber-950 transition cursor-pointer"
            title="Pronunciación Mexicana"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onSpeak(wordOrPhrase, 'spain')}
            className="px-1.5 py-1 rounded-lg bg-stone-200/70 dark:bg-stone-700 text-stone-700 dark:text-stone-200 hover:bg-amber-100 dark:hover:bg-amber-950 text-[10px] font-bold transition cursor-pointer"
            title="Pronunciación Castellana"
          >
            🇪🇸 ES
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition cursor-pointer"
            title="Cerrar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tabs Header: Meaning vs Collocations */}
      <div className="flex border-b border-stone-200/60 dark:border-stone-800 shrink-0 text-xs font-bold bg-stone-100/50 dark:bg-stone-900">
        <button
          onClick={() => setActiveTab('meaning')}
          className={`flex-1 py-2 text-center transition cursor-pointer border-b-2 ${
            activeTab === 'meaning'
              ? 'border-amber-500 text-amber-800 dark:text-amber-300 bg-white dark:bg-stone-800/80'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
          }`}
        >
          Significado y Lema
        </button>
        <button
          onClick={() => setActiveTab('collocations')}
          className={`flex-1 py-2 text-center transition cursor-pointer border-b-2 flex items-center justify-center gap-1 ${
            activeTab === 'collocations'
              ? 'border-amber-500 text-amber-800 dark:text-amber-300 bg-white dark:bg-stone-800/80'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
          }`}
        >
          <span>Colocaciones</span>
          {collocations.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500/20 text-amber-700 dark:text-amber-300">
              {collocations.length}
            </span>
          )}
        </button>
      </div>

      {/* Popover Body Content */}
      <div className="p-3.5 space-y-3 overflow-y-auto overscroll-contain text-xs">
        {/* Instant Action: Single-click Save to SRS */}
        <button
          onClick={onToggleSaveSRS}
          className={`w-full py-2 px-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
            isSavedInSRS
              ? 'bg-amber-500 text-stone-950 hover:bg-amber-400'
              : 'bg-stone-100 dark:bg-stone-800 hover:bg-[#C85A32] hover:text-white text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700'
          }`}
        >
          {isSavedInSRS ? (
            <>
              <BookmarkCheck className="w-4 h-4 fill-current text-stone-950" />
              <span>✓ Guardado en Vocabulario SRS</span>
            </>
          ) : (
            <>
              <BookmarkPlus className="w-4 h-4 text-[#C85A32]" />
              <span>Guardar en SRS (+ Vocabulario)</span>
            </>
          )}
        </button>

        {activeTab === 'meaning' ? (
          <>
            {/* English & Arabic Translations Card */}
            <div className="space-y-1.5 p-2.5 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200/60 dark:border-stone-800">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-stone-400">
                  Significado en inglés
                </span>
                <p className="text-xs font-bold text-stone-900 dark:text-stone-100 capitalize">
                  {wordDef.translation_en}
                </p>
              </div>

              {wordDef.translation_ar && (
                <div className="pt-1.5 border-t border-stone-200/60 dark:border-stone-700/60">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-stone-400">
                    الترجمة العربية
                  </span>
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-300 font-arabic text-right" dir="rtl">
                    {wordDef.translation_ar}
                  </p>
                </div>
              )}
            </div>

            {/* Lemmatization & Morphological Analysis Card */}
            {lemmaAnalysis && !isMWE && (
              <div className="p-2.5 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200/80 dark:border-amber-900/40 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 dark:text-amber-300">
                      Lema Base / Morfología
                    </span>
                  </div>

                  {onSaveLemma && lemmaAnalysis.baseLemma.toLowerCase() !== wordOrPhrase.toLowerCase() && (
                    <button
                      onClick={() => onSaveLemma(lemmaAnalysis.baseLemma)}
                      className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-500/20 hover:bg-amber-500 text-amber-900 dark:text-amber-200 hover:text-stone-950 transition cursor-pointer border border-amber-500/40 shrink-0"
                    >
                      {isLemmaSaved ? '✓ Lema Guardado' : `Guardar '${lemmaAnalysis.baseLemma}'`}
                    </button>
                  )}
                </div>

                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-sm font-black text-stone-900 dark:text-stone-100 capitalize">
                    {lemmaAnalysis.baseLemma}
                  </span>
                  <span className="text-[11px] font-bold text-stone-600 dark:text-stone-300 capitalize">
                    ({lemmaAnalysis.parsingText})
                  </span>
                  {lemmaAnalysis.isIrregular && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/20">
                      Irregular
                    </span>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          /* Collocations Tab */
          <div className="space-y-2">
            <CollocationCard collocations={collocations} targetWord={wordOrPhrase} showClozeDrill={true} />
          </div>
        )}

        {/* 5-Stage Vocabulary Acquisition Lifecycle Control (LingQ & SM-2) */}
        <div className="space-y-1.5 pt-1 border-t border-stone-200/60 dark:border-stone-800">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-bold uppercase tracking-wider text-stone-400">
              Nivel de Dominio (Etapas 1-5)
            </span>
            <span className="font-mono text-stone-400">Teclas: 1 - 5</span>
          </div>

          <div className="grid grid-cols-5 gap-1">
            {([1, 2, 3, 4, 5] as AcquisitionStage[]).map(st => {
              const cfg = STAGE_CONFIGS[st];
              const isCurrent = currentStage === st;

              return (
                <button
                  key={st}
                  onClick={() => onSetStage(st)}
                  className={`py-1.5 px-1 rounded-lg border text-[10px] font-black transition flex flex-col items-center gap-0.5 cursor-pointer ${
                    isCurrent
                      ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-2xs font-bold'
                      : 'bg-stone-100 dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-amber-950/60 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                  }`}
                  title={`${cfg.labelEs} (${cfg.nominalIntervalDays} días)`}
                >
                  <span className="text-[11px]">{st === 5 ? '✓' : `N${st}`}</span>
                  <span className="text-[9px] opacity-75 font-normal">{cfg.nominalIntervalDays}d</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
