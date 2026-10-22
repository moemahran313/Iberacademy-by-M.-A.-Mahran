import React, { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  ArrowRight,
  UploadCloud,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Bookmark
} from 'lucide-react';
import { ImportedContent, UserProgress } from '../types';
import { COMPREHENSIBLE_STORIES } from '../data/comprehensibleStories';
import { CURATED_AUTHENTIC_LIBRARY } from '../data/comprehensibleInputLibrary';

const LingQInteractiveReader = React.lazy(() => import('./LingQInteractiveReader').then(m => ({ default: m.LingQInteractiveReader })));
const ContentImporterModal = React.lazy(() => import('./ContentImporterModal').then(m => ({ default: m.ContentImporterModal })));
import {
  tokenizeText,
  calculateComprehensibility,
  TextComprehensibilityReport
} from '../utils/lingqEngine';
import { soundEffects } from '../utils/audio';
import { useDebounce } from '../hooks/useDebounce';
import { useWindowedList } from '../hooks/useWindowedList';

interface ComprehensibleInputViewProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

export type DialectRegion = 'all' | 'mexico' | 'spain' | 'argentina' | 'colombia';
export type StoryTopic = 'all' | 'daily_life' | 'travel' | 'culture' | 'mystery' | 'news';

export interface EnrichedStoryItem extends ImportedContent {
  region: {
    id: 'mexico' | 'spain' | 'argentina' | 'colombia';
    label: string;
    flag: string;
  };
  topic: {
    id: 'daily_life' | 'travel' | 'culture' | 'mystery' | 'news';
    label: string;
    icon: string;
  };
  comprehensibility: TextComprehensibilityReport;
}

// Region and Dialect detector for authentic regional tagging
export function detectStoryRegion(item: { id: string; title: string; content: string }): {
  id: 'mexico' | 'spain' | 'argentina' | 'colombia';
  label: string;
  flag: string;
} {
  const combined = `${item.id} ${item.title} ${item.content}`.toLowerCase();

  if (
    combined.includes('arg') ||
    combined.includes('buenos aires') ||
    combined.includes('palermo') ||
    combined.includes('mate') ||
    combined.includes('facturas') ||
    combined.includes('medialunas') ||
    combined.includes('porteño') ||
    combined.includes('che ')
  ) {
    return { id: 'argentina', label: 'Argentina', flag: '🇦🇷' };
  }

  if (
    combined.includes('col') ||
    combined.includes('bogotá') ||
    combined.includes('bogota') ||
    combined.includes('medellín') ||
    combined.includes('medellin') ||
    combined.includes('cartagena') ||
    combined.includes('arepa') ||
    combined.includes('cafetero')
  ) {
    return { id: 'colombia', label: 'Colombia', flag: '🇨🇴' };
  }

  if (
    combined.includes('madrid') ||
    combined.includes('españa') ||
    combined.includes('spain') ||
    combined.includes('retiro') ||
    combined.includes('tapas') ||
    combined.includes('sevilla') ||
    combined.includes('barcelona') ||
    combined.includes('castellano')
  ) {
    return { id: 'spain', label: 'España', flag: '🇪🇸' };
  }

  // Default to Mexico as high-utility regional pillar
  return { id: 'mexico', label: 'México', flag: '🇲🇽' };
}

// Topic detector for content classification
export function detectStoryTopic(item: { title: string; content: string; category?: string }): {
  id: 'daily_life' | 'travel' | 'culture' | 'mystery' | 'news';
  label: string;
  icon: string;
} {
  const combined = `${item.title} ${item.content} ${item.category || ''}`.toLowerCase();

  if (
    item.category?.toLowerCase().includes('news') ||
    combined.includes('noticia') ||
    combined.includes('conservación') ||
    combined.includes('científicos') ||
    combined.includes('proyecto') ||
    combined.includes('moderna') ||
    combined.includes('gobierno')
  ) {
    return { id: 'news', label: 'News', icon: '📰' };
  }

  if (
    combined.includes('misterio') ||
    combined.includes('secreto') ||
    combined.includes('leyenda') ||
    combined.includes('noche') ||
    combined.includes('fantasma') ||
    combined.includes('enigma') ||
    combined.includes('antiguo') ||
    combined.includes('profecía')
  ) {
    return { id: 'mystery', label: 'Mystery', icon: '🔍' };
  }

  if (
    combined.includes('viaje') ||
    combined.includes('viajó') ||
    combined.includes('turismo') ||
    combined.includes('paseo') ||
    combined.includes('ciudad') ||
    combined.includes('hotel') ||
    combined.includes('camino') ||
    combined.includes('vuelo')
  ) {
    return { id: 'travel', label: 'Travel', icon: '✈️' };
  }

  if (
    combined.includes('comida') ||
    combined.includes('gastronomía') ||
    combined.includes('tacos') ||
    combined.includes('taquería') ||
    combined.includes('mate') ||
    combined.includes('receta') ||
    combined.includes('chocolate') ||
    combined.includes('mercado') ||
    combined.includes('cultura') ||
    combined.includes('arte') ||
    combined.includes('frida')
  ) {
    return { id: 'culture', label: 'Food & Culture', icon: '🌮' };
  }

  return { id: 'daily_life', label: 'Daily Life', icon: '☕' };
}

export const ComprehensibleInputView: React.FC<ComprehensibleInputViewProps> = ({
  userProgress,
  setUserProgress
}) => {
  const [selectedContent, setSelectedContent] = useState<ImportedContent | null>(null);
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('all');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<DialectRegion>('all');
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<StoryTopic>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce(searchQuery, 200);

  const [isImporterOpen, setIsImporterOpen] = useState<boolean>(false);

  // Combine Stories + Curated Library + User Custom Imported Texts into a unified collection
  const allLibraryItems: ImportedContent[] = useMemo(() => {
    // 1. Convert COMPREHENSIBLE_STORIES to ImportedContent format
    const convertedStories: ImportedContent[] = COMPREHENSIBLE_STORIES.map(s => ({
      id: s.id,
      title: s.title_es,
      category: 'Graded Story',
      cefr: s.cefr,
      wordCount: s.wordCount || 130,
      dateAdded: '2026-08-01',
      content: s.paragraphs.map(p => p.es).join('\n\n'),
      translation_en: s.paragraphs.map(p => p.en).join('\n\n'),
      translation_ar: s.paragraphs.map(p => p.ar).join('\n\n')
    }));

    // 2. Curated Authentic Library
    const curated = CURATED_AUTHENTIC_LIBRARY;

    // 3. User Custom Imported Texts
    const custom = userProgress.customImportedTexts || [];

    return [...custom, ...curated, ...convertedStories];
  }, [userProgress.customImportedTexts]);

  // Enrich each story with Region, Topic, and real-time Krashen Comprehensibility metric
  const enrichedStories: EnrichedStoryItem[] = useMemo(() => {
    return allLibraryItems.map(item => {
      const region = detectStoryRegion(item);
      const topic = detectStoryTopic(item);
      const tokens = tokenizeText(item.content);
      const comprehensibility = calculateComprehensibility(tokens, userProgress);

      return {
        ...item,
        region,
        topic,
        comprehensibility
      };
    });
  }, [allLibraryItems, userProgress]);

  // Filter library items based on CEFR Level, Dialect/Region, Topic, and Search
  const filteredItems = useMemo(() => {
    return enrichedStories.filter(item => {
      const matchLevel = selectedLevelFilter === 'all' || item.cefr === selectedLevelFilter;
      const matchRegion = selectedRegionFilter === 'all' || item.region.id === selectedRegionFilter;
      const matchTopic = selectedTopicFilter === 'all' || item.topic.id === selectedTopicFilter;
      const matchQuery =
        !debouncedSearchQuery.trim() ||
        item.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(debouncedSearchQuery.toLowerCase());

      return matchLevel && matchRegion && matchTopic && matchQuery;
    });
  }, [enrichedStories, selectedLevelFilter, selectedRegionFilter, selectedTopicFilter, debouncedSearchQuery]);

  // Windowed list for smooth scroll rendering
  const { visibleItems: visibleStories, sentinelRef: storySentinelRef } = useWindowedList<EnrichedStoryItem>(filteredItems, {
    pageSize: 14,
    resetDeps: [debouncedSearchQuery, selectedLevelFilter, selectedRegionFilter, selectedTopicFilter]
  });

  const handleOpenReader = (item: ImportedContent) => {
    soundEffects.playPop();
    setSelectedContent(item);
  };

  // If reader is currently active with a story, display the distraction-free e-reader directly
  if (selectedContent) {
    return (
      <React.Suspense
        fallback={
          <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4">
            <div className="w-10 h-10 border-4 border-[#C85A32]/20 border-t-[#C85A32] rounded-full animate-spin" />
            <p className="text-sm font-bold text-stone-600 dark:text-stone-300">
              Cargando lector interactivo...
            </p>
          </div>
        }
      >
        <LingQInteractiveReader
          content={selectedContent}
          onBack={() => setSelectedContent(null)}
          userProgress={userProgress}
          setUserProgress={setUserProgress}
        />
      </React.Suspense>
    );
  }

  // Daily statistics for top stats strip
  const today = new Date().toISOString().split('T')[0];
  const todayWordsRead = (userProgress.dailyWordsRead || {})[today] || 0;
  const lifetimeWordsRead = userProgress.totalWordsRead || 0;
  const knownWordsCount = (userProgress.knownWords || []).length + (userProgress.masteredWordIds || []).length;
  const savedVocabCount = (userProgress.savedWordIds || []).length;

  return (
    <div className="space-y-8 animate-fadeIn pb-16 font-sans">
      {/* 1. EDITORIAL HEADER & METRICS STRIP */}
      <div className="bg-white dark:bg-[#1A1918] border border-stone-200/80 dark:border-stone-800/80 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#C85A32]/10 text-[#C85A32] dark:text-[#E07A5F] border border-[#C85A32]/20">
                Inmersión Comprensible (i+1)
              </span>
              <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                {enrichedStories.length} lecturas auténticas
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-stone-900 dark:text-stone-100">
              Biblioteca de Lectura e Inmersión
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed font-sans">
              Desarrolla fluidez real leyendo historias graduadas y artículos auténticos con audio sincronizado, análisis fonético y guardado directo a repetición espaciada.
            </p>
          </div>

          {/* Action: Import Custom Text */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsImporterOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold hover:opacity-90 transition cursor-pointer flex items-center gap-2 shadow-2xs"
            >
              <UploadCloud className="w-4 h-4 text-[#C85A32]" />
              <span>Importar mi propio texto</span>
            </button>
          </div>
        </div>

        {/* Essential 4-stat metrics pill strip */}
        <div className="mt-6 pt-5 border-t border-stone-100 dark:border-stone-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200/50 dark:border-stone-700/50">
            <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400 block">Palabras leídas hoy</span>
            <span className="text-lg font-black text-stone-900 dark:text-white font-mono mt-0.5 block">{todayWordsRead.toLocaleString()}</span>
          </div>

          <div className="p-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200/50 dark:border-stone-700/50">
            <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400 block">Léxico total adquirido</span>
            <span className="text-lg font-black text-[#2D5A43] dark:text-emerald-400 font-mono mt-0.5 block">{knownWordsCount.toLocaleString()}</span>
          </div>

          <div className="p-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200/50 dark:border-stone-700/50">
            <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400 block">Vocabulario en estudio</span>
            <span className="text-lg font-black text-[#B47832] dark:text-amber-400 font-mono mt-0.5 block">{savedVocabCount.toLocaleString()}</span>
          </div>

          <div className="p-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200/50 dark:border-stone-700/50">
            <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400 block">Total histórico</span>
            <span className="text-lg font-black text-[#C85A32] dark:text-[#E07A5F] font-mono mt-0.5 block">{lifetimeWordsRead.toLocaleString()} palabras</span>
          </div>
        </div>
      </div>

      {/* 2. UNIFIED FILTER CONSOLE (Level, Dialect/Region, Topic, Search) */}
      <div className="bg-white dark:bg-[#1A1918] border border-stone-200/80 dark:border-stone-800/80 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        {/* Search input & Level buttons */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar por título, temática o palabras clave..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
            />
          </div>

          {/* CEFR Level Filter: A1, A2, B1, B2 */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 shrink-0">
            <span className="text-[11px] font-bold text-stone-400 mr-1 hidden sm:inline">Nivel:</span>
            {['all', 'A1', 'A2', 'B1', 'B2'].map(lvl => (
              <button
                key={lvl}
                onClick={() => setSelectedLevelFilter(lvl)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedLevelFilter === lvl
                    ? 'bg-[#C85A32] text-white shadow-2xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200/70 dark:hover:bg-stone-700'
                }`}
              >
                {lvl === 'all' ? 'Todos los niveles' : lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Second Row: Dialect / Region Filter */}
        <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
          <span className="text-[11px] font-bold text-stone-400 mr-1">Región / Dialecto:</span>
          {[
            { id: 'all' as DialectRegion, label: 'Todas las regiones', flag: '🌎' },
            { id: 'mexico' as DialectRegion, label: 'México', flag: '🇲🇽' },
            { id: 'spain' as DialectRegion, label: 'España', flag: '🇪🇸' },
            { id: 'argentina' as DialectRegion, label: 'Argentina', flag: '🇦🇷' },
            { id: 'colombia' as DialectRegion, label: 'Colombia', flag: '🇨🇴' }
          ].map(reg => (
            <button
              key={reg.id}
              onClick={() => setSelectedRegionFilter(reg.id)}
              className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                selectedRegionFilter === reg.id
                  ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-2xs'
                  : 'bg-stone-50 dark:bg-stone-800/60 text-stone-600 dark:text-stone-300 hover:bg-stone-100'
              }`}
            >
              <span>{reg.flag}</span>
              <span>{reg.label}</span>
            </button>
          ))}
        </div>

        {/* Third Row: Topic Filter */}
        <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
          <span className="text-[11px] font-bold text-stone-400 mr-1">Tema:</span>
          {[
            { id: 'all' as StoryTopic, label: 'Todos los temas', icon: '✨' },
            { id: 'daily_life' as StoryTopic, label: 'Vida Diaria', icon: '☕' },
            { id: 'travel' as StoryTopic, label: 'Viajes', icon: '✈️' },
            { id: 'culture' as StoryTopic, label: 'Gastronomía y Cultura', icon: '🌮' },
            { id: 'mystery' as StoryTopic, label: 'Misterio y Leyendas', icon: '🔍' },
            { id: 'news' as StoryTopic, label: 'Noticias y Actualidad', icon: '📰' }
          ].map(top => (
            <button
              key={top.id}
              onClick={() => setSelectedTopicFilter(top.id)}
              className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                selectedTopicFilter === top.id
                  ? 'bg-[#B47832] text-white shadow-2xs'
                  : 'bg-stone-50 dark:bg-stone-800/60 text-stone-600 dark:text-stone-300 hover:bg-stone-100'
              }`}
            >
              <span>{top.icon}</span>
              <span>{top.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. UNIFIED RESPONSIVE STORY FEED */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#1A1918] border border-stone-200/80 dark:border-stone-800/80 rounded-3xl p-8 space-y-3">
          <BookOpen className="w-10 h-10 text-stone-300 dark:text-stone-700 mx-auto" />
          <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">
            No se encontraron lecturas para estos filtros
          </h3>
          <p className="text-xs text-stone-400">
            Prueba seleccionando "Todos los niveles" o limpiando tu búsqueda.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleStories.map(item => {
              const readTime = Math.max(1, Math.ceil((item.wordCount || 100) / 95));
              const previewSnippet = (item.translation_en || item.content)
                .split(/\.\s+/)[0]
                ?.trim() || item.title;

              const compPercent = item.comprehensibility.comprehensibilityPercentage;

              return (
                <div
                  key={item.id}
                  onClick={() => handleOpenReader(item)}
                  className="bg-white dark:bg-[#1A1918] border border-stone-200/80 dark:border-stone-800/80 hover:border-[#C85A32]/60 dark:hover:border-[#C85A32]/60 rounded-2xl p-5 shadow-xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between group cursor-pointer"
                >
                  <div className="space-y-3">
                    {/* Top Row: Dialect Flag, CEFR, Topic, Krashen Comprehensibility % */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {/* Dialect / Region badge */}
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center gap-1">
                          <span>{item.region.flag}</span>
                          <span>{item.region.label}</span>
                        </span>

                        {/* CEFR Level badge */}
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#C85A32]/10 text-[#C85A32] dark:text-[#E07A5F] border border-[#C85A32]/20">
                          {item.cefr}
                        </span>

                        {/* Topic pill */}
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400">
                          {item.topic.label}
                        </span>
                      </div>

                      {/* Krashen Comprehensibility Badge */}
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold text-[#2D5A43] dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                        {compPercent}% Conocidas — i+1
                      </span>
                    </div>

                    {/* Story Title */}
                    <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#C85A32] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    {/* Clean 1-sentence synopsis */}
                    <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                      {previewSnippet}.
                    </p>
                  </div>

                  {/* Card Bottom Meta & Read Launcher */}
                  <div className="pt-3 mt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2 text-xs">
                    <div className="text-[11px] font-mono text-stone-400 flex items-center gap-2">
                      <span>{item.wordCount} palabras</span>
                      <span>•</span>
                      <span>~{readTime} min lectura</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-[#C85A32] group-hover:translate-x-0.5 transition-transform">
                      <span>Leer Ahora</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sentinel ref for infinite loading */}
          <div ref={storySentinelRef} className="h-4 w-full" />
        </div>
      )}

      {/* Content Importer Modal */}
      {isImporterOpen && (
        <React.Suspense fallback={null}>
          <ContentImporterModal
            onClose={() => setIsImporterOpen(false)}
            onImportSuccess={newContent => {
              setIsImporterOpen(false);
              setSelectedContent(newContent);
            }}
            userProgress={userProgress}
            setUserProgress={setUserProgress}
          />
        </React.Suspense>
      )}
    </div>
  );
};
