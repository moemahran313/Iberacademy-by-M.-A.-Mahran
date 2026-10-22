import React, { useState, useMemo } from 'react';
import {
  PRESET_WRITING_TASKS,
  DISCURSIVE_CONNECTORS,
  countSpanishWords,
  evaluateSpanishEssay
} from '../../services/writingEvaluationService';
import {
  WritingTask,
  WritingAssessmentResult,
  InlineAnnotation,
  DimensionFeedback,
  AnnotationType
} from '../../types/assessment';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Award,
  BookOpen,
  Sparkles,
  Info,
  Layers,
  BarChart3,
  RefreshCw,
  Send,
  HelpCircle,
  Copy,
  Check,
  ChevronRight,
  TrendingUp,
  X,
  Zap
} from 'lucide-react';

export const WritingAssessmentView: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<WritingTask>(PRESET_WRITING_TASKS[0]);
  const [essayText, setEssayText] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [result, setResult] = useState<WritingAssessmentResult | null>(null);
  const [annotationFilter, setAnnotationFilter] = useState<'all' | 'green' | 'amber' | 'red'>('all');
  const [selectedAnnotation, setSelectedAnnotation] = useState<InlineAnnotation | null>(null);
  const [copiedText, setCopiedText] = useState<boolean>(false);

  const currentWordCount = useMemo(() => countSpanishWords(essayText), [essayText]);

  const wordCountPercentage = useMemo(() => {
    if (selectedTask.maxWords === 0) return 0;
    return Math.min(100, Math.round((currentWordCount / selectedTask.maxWords) * 100));
  }, [currentWordCount, selectedTask.maxWords]);

  const isWordCountInRange =
    currentWordCount >= selectedTask.minWords && currentWordCount <= selectedTask.maxWords;

  const handleEvaluate = async () => {
    if (!essayText.trim()) return;
    setIsEvaluating(true);
    try {
      const evalResult = await evaluateSpanishEssay(selectedTask, essayText);
      setResult(evalResult);
    } catch (error) {
      console.error('Error evaluating essay:', error);
    } finally {
      setIsEvaluating(false);
    }
  };

  const insertConnector = (connector: string) => {
    setEssayText(prev => {
      const needsSpace = prev.length > 0 && !prev.endsWith(' ') && !prev.endsWith('\n');
      return `${prev}${needsSpace ? ' ' : ''}${connector}, `;
    });
  };

  const handleCopyReport = () => {
    if (!result) return;
    const reportText = `Evaluación DELE/SIELE Escritura (${result.taskTitle})\nPuntuación: ${result.overallScore}/100 | Nivel Estimado: ${result.estimatedCefrLevel}\nPuntos Totales: ${result.totalPoints}/12\n\nResumen:\n${result.summaryFeedback}`;
    navigator.clipboard.writeText(reportText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const filteredAnnotations = useMemo(() => {
    if (!result) return [];
    if (annotationFilter === 'all') return result.annotations;
    return result.annotations.filter(a => a.type === annotationFilter);
  }, [result, annotationFilter]);

  // Render annotated text with highlights
  const renderAnnotatedText = () => {
    if (!result || result.annotations.length === 0) {
      return <p className="whitespace-pre-wrap text-slate-800 leading-relaxed">{essayText}</p>;
    }

    const segments: { text: string; annotation?: InlineAnnotation }[] = [];
    let lastIndex = 0;

    // Use non-overlapping annotations
    const sorted = [...result.annotations].sort((a, b) => a.startIndex - b.startIndex);

    sorted.forEach(ann => {
      if (ann.startIndex >= lastIndex && ann.endIndex <= essayText.length) {
        if (ann.startIndex > lastIndex) {
          segments.push({ text: essayText.substring(lastIndex, ann.startIndex) });
        }
        segments.push({
          text: essayText.substring(ann.startIndex, ann.endIndex),
          annotation: ann
        });
        lastIndex = ann.endIndex;
      }
    });

    if (lastIndex < essayText.length) {
      segments.push({ text: essayText.substring(lastIndex) });
    }

    return (
      <div className="whitespace-pre-wrap text-slate-800 leading-relaxed font-sans text-base">
        {segments.map((seg, idx) => {
          if (!seg.annotation) {
            return <span key={idx}>{seg.text}</span>;
          }

          const ann = seg.annotation;
          let bgColor = 'bg-emerald-100 text-emerald-900 border-emerald-300';
          if (ann.type === 'amber') bgColor = 'bg-amber-100 text-amber-900 border-amber-300';
          if (ann.type === 'red') bgColor = 'bg-rose-100 text-rose-900 border-rose-300';

          const isSelected = selectedAnnotation?.id === ann.id;

          return (
            <mark
              key={idx}
              onClick={() => setSelectedAnnotation(ann)}
              className={`cursor-pointer rounded px-1 py-0.5 border transition-all duration-150 inline-block my-0.5 ${bgColor} ${
                isSelected ? 'ring-2 ring-indigo-500 font-semibold shadow-sm' : 'hover:opacity-80'
              }`}
              title={`${ann.category}: ${ann.explanation}`}
            >
              {seg.text}
            </mark>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" /> Evaluador Oficial CEFR / DELE & SIELE
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Evaluación Analítica de Redacción Española
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Análisis automático en las 4 dimensiones del marco Cervantes (Adecuación, Coherencia, Gramática y Riqueza Léxica) con anotaciones interactivas.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-white/10 backdrop-blur border border-white/20 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200">
              Criterios PCIC / DELE 2026
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Column = Task & Writing, Right Column = Realtime Tools / Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Task Picker & Editor (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Task Selector Tabs */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                Selecciona la Tarea de Examen
              </h2>
              <span className="text-xs bg-slate-100 text-slate-600 font-medium px-2.5 py-1 rounded-md">
                CEFR {selectedTask.cefrTarget}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PRESET_WRITING_TASKS.map(task => {
                const isSelected = task.id === selectedTask.id;
                return (
                  <button
                    key={task.id}
                    onClick={() => {
                      setSelectedTask(task);
                      setResult(null);
                      setSelectedAnnotation(null);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/60 shadow-sm ring-1 ring-indigo-500'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-slate-900 line-clamp-1">
                        {task.title}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          task.cefrTarget === 'A2'
                            ? 'bg-emerald-100 text-emerald-800'
                            : task.cefrTarget === 'B1'
                            ? 'bg-blue-100 text-blue-800'
                            : task.cefrTarget === 'B2'
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {task.cefrTarget}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      {task.minWords}-{task.maxWords} palabras • {task.genreLabel}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Prompt Specification Card */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs text-slate-700 space-y-2">
              <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-indigo-600" /> Contexto y Enunciado:
              </div>
              <p className="text-slate-800 leading-relaxed">{selectedTask.promptText}</p>
              <p className="text-slate-600 italic">{selectedTask.contextDescription}</p>

              <div className="pt-2 border-t border-slate-200">
                <div className="font-medium text-slate-900 mb-1">Puntos clave requeridos (Checklist):</div>
                <ul className="space-y-1 pl-2">
                  {selectedTask.bulletPoints.map((bp, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-slate-600">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Writing Editor & Word Counter */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                Tu Texto en Español
              </label>

              {/* Live Metrology Badge */}
              <div className="flex items-center gap-3">
                <div
                  className={`text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5 ${
                    isWordCountInRange
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : currentWordCount > selectedTask.maxWords
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}
                >
                  {isWordCountInRange ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {currentWordCount} / {selectedTask.minWords}-{selectedTask.maxWords} palabras
                  </span>
                </div>
              </div>
            </div>

            {/* Metrology Progress Bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  isWordCountInRange
                    ? 'bg-emerald-500'
                    : currentWordCount > selectedTask.maxWords
                    ? 'bg-rose-500'
                    : 'bg-amber-500'
                }`}
                style={{ width: `${wordCountPercentage}%` }}
              />
            </div>

            {/* Quick Connectors Palette */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-500" /> Insertar Conectores Clave:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedTask.targetConnectors.map((conn, idx) => (
                  <button
                    key={idx}
                    onClick={() => insertConnector(conn)}
                    className="text-[11px] bg-slate-100 hover:bg-indigo-100 hover:text-indigo-800 text-slate-700 px-2 py-1 rounded-md transition border border-slate-200"
                  >
                    + {conn}
                  </button>
                ))}
              </div>
            </div>

            {/* Textarea */}
            <textarea
              value={essayText}
              onChange={e => setEssayText(e.target.value)}
              placeholder={`Escribe aquí tu redacción para la tarea "${selectedTask.title}"...\nRecuerda usar conectores (sin embargo, por lo tanto), cuidar la concordancia y utilizar vocabulario variado.`}
              rows={12}
              className="w-full p-4 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 font-sans text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 resize-none transition"
            />

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  setEssayText('');
                  setResult(null);
                  setSelectedAnnotation(null);
                }}
                className="text-xs text-slate-500 hover:text-slate-800 transition flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Limpiar texto
              </button>

              <button
                onClick={handleEvaluate}
                disabled={isEvaluating || currentWordCount === 0}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md transition transform active:scale-95"
              >
                {isEvaluating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Evaluando con Criterios CEFR...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Evaluar Redacción Oficial
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Scorecard & Interactive Annotations (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {result ? (
            <div className="space-y-6 animate-fadeIn">
              {/* Overall Score Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Puntuación Global CEFR
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyReport}
                      className="text-xs text-slate-600 hover:text-indigo-600 flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md transition"
                    >
                      {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedText ? 'Copiado' : 'Copiar Informe'}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-extrabold text-slate-900 flex items-baseline gap-1">
                      {result.overallScore}
                      <span className="text-sm font-normal text-slate-500">/ 100</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Puntos oficiales: <strong className="text-slate-900">{result.totalPoints}/12</strong>
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="inline-block bg-indigo-600 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow">
                      Nivel Estimado {result.estimatedCefrLevel}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {result.overallScore >= 70 ? '¡Apto en esta tarea!' : 'En desarrollo de competencias'}
                    </p>
                  </div>
                </div>

                {/* Word Count Warning Notice */}
                {result.wordCountWarning && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{result.wordCountWarning}</span>
                  </div>
                )}

                {/* Summary Feedback */}
                <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-3 text-xs text-indigo-950 leading-relaxed">
                  <span className="font-semibold text-indigo-900 block mb-1">
                    Dictamen del Evaluador:
                  </span>
                  {result.summaryFeedback}
                </div>
              </div>

              {/* 4 Analytical CEFR Dimensions Breakdown */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-indigo-600" /> Las 4 Dimensiones Analíticas
                </h3>

                <div className="space-y-3">
                  {Object.values(result.dimensions).map((dim: DimensionFeedback) => (
                    <div key={dim.dimensionKey} className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900">{dim.titleEs}</span>
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            dim.score === 3
                              ? 'bg-emerald-100 text-emerald-800'
                              : dim.score === 2
                              ? 'bg-blue-100 text-blue-800'
                              : dim.score === 1
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {dim.score} / 3 • {dim.scoreLabel}
                        </span>
                      </div>

                      {/* Meter bar */}
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            dim.score === 3
                              ? 'bg-emerald-500'
                              : dim.score === 2
                              ? 'bg-blue-500'
                              : dim.score === 1
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                          }`}
                          style={{ width: `${(dim.score / 3) * 100}%` }}
                        />
                      </div>

                      <p className="text-[11px] text-slate-600 leading-normal">{dim.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Annotated Essay Review Component */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" /> Texto Anotado
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    {result.annotations.length} anotaciones
                  </span>
                </div>

                {/* Filter Controls */}
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setAnnotationFilter('all')}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium transition ${
                      annotationFilter === 'all'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Todas ({result.annotations.length})
                  </button>
                  <button
                    onClick={() => setAnnotationFilter('green')}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium transition ${
                      annotationFilter === 'green'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                    }`}
                  >
                    Verde: Riqueza ({result.annotations.filter(a => a.type === 'green').length})
                  </button>
                  <button
                    onClick={() => setAnnotationFilter('amber')}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium transition ${
                      annotationFilter === 'amber'
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    Ámbar: Repeticiones ({result.annotations.filter(a => a.type === 'amber').length})
                  </button>
                  <button
                    onClick={() => setAnnotationFilter('red')}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium transition ${
                      annotationFilter === 'red'
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
                    }`}
                  >
                    Rojo: Errores ({result.annotations.filter(a => a.type === 'red').length})
                  </button>
                </div>

                {/* Annotated Text Box */}
                <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 max-h-80 overflow-y-auto">
                  {renderAnnotatedText()}
                </div>

                {/* Selected Annotation Inspector Popover/Card */}
                {selectedAnnotation && (
                  <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2 relative animate-fadeIn shadow-lg">
                    <button
                      onClick={() => setSelectedAnnotation(null)}
                      className="absolute top-2.5 right-2.5 text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded ${
                          selectedAnnotation.type === 'green'
                            ? 'bg-emerald-500 text-white'
                            : selectedAnnotation.type === 'amber'
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-rose-500 text-white'
                        }`}
                      >
                        {selectedAnnotation.category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        "{selectedAnnotation.text}"
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {selectedAnnotation.explanation}
                    </p>
                    {selectedAnnotation.correction && (
                      <div className="text-xs bg-white/10 p-2 rounded border border-white/10 text-emerald-300">
                        <strong>Sugerencia de mejora:</strong> {selectedAnnotation.correction}
                      </div>
                    )}
                    {selectedAnnotation.ruleTip && (
                      <p className="text-[11px] text-slate-400 italic">
                        Criterio DELE: {selectedAnnotation.ruleTip}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Strengths & Actionable Recommendations */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-indigo-600" /> Puntos Fuertes y Recomendaciones
                </h3>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Fortalezas Detectadas:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-700 pl-4 list-disc">
                      {result.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-xs font-semibold text-indigo-900 flex items-center gap-1 mb-1">
                      <ChevronRight className="w-3.5 h-3.5 text-indigo-600" /> Pasos de Mejora Recomendados:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-700 pl-4 list-disc">
                      {result.keyRecommendations.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Placeholder state before evaluation */
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Aún no has evaluado tu texto
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Escribe tu redacción en la columna izquierda y presiona "Evaluar Redacción Oficial" para obtener un análisis oficial con rúbricas CEFR.
              </p>
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2 text-left text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>Resaltado verde: Vocabulario rico y conectores.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                  <span>Resaltado ámbar: Verbos repetidos / comodín.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                  <span>Resaltado rojo: Errores gramaticales o de concordancia.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
