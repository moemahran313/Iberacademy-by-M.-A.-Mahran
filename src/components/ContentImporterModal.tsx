import React, { useState } from 'react';
import { X, Sparkles, Plus, BookOpen, FileText, Globe, Music, Radio, Check } from 'lucide-react';
import { CEFRLevel, ImportedContent, UserProgress } from '../types';
import { soundEffects } from '../utils/audio';

interface ContentImporterModalProps {
  onClose: () => void;
  onImportSuccess: (newContent: ImportedContent) => void;
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

export const ContentImporterModal: React.FC<ContentImporterModalProps> = ({
  onClose,
  onImportSuccess,
  userProgress,
  setUserProgress
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [translationEn, setTranslationEn] = useState('');
  const [translationAr, setTranslationAr] = useState('');
  const [cefr, setCefr] = useState<CEFRLevel>('A2');
  const [category, setCategory] = useState<'News' | 'Dialogue' | 'Podcast' | 'Story' | 'Song' | 'Custom'>('News');
  const [isTranslating, setIsTranslating] = useState(false);

  const handleAiTranslate = async () => {
    if (!content.trim()) return;
    setIsTranslating(true);
    soundEffects.playPop();
    try {
      const response = await fetch('/api/ai/translate-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: content })
      });
      if (response.ok) {
        const data = await response.json();
        setTranslationEn(data.translation_en || '');
        setTranslationAr(data.translation_ar || '');
        soundEffects.playLevelUp();
      }
    } catch (err) {
      console.error('Failed to translate text:', err);
    } finally {
      setIsTranslating(false);
    }
  };

  // Quick Preset Samples for instant 1-click importing
  const presets = [
    {
      title: 'Noticia: Descubrimiento arqueológico en Granada',
      category: 'News' as const,
      cefr: 'B1' as const,
      content: `Un equipo internacional de arqueólogos ha descubierto una red subterránea de acequias y baños árabes del siglo XI en las inmediaciones del barrio del Albaicín en Granada.

Los expertos afirman que el sistema hidráulico se encuentra en un estado de conservación excepcional. Las excavaciones han revelado complejas inscripciones poéticas talladas en yeso que celebran el agua como fuente de purificación y sabiduría. Este hallazgo permitirá comprender con mayor precisión cómo se abastecía la ciudad antes de la construcción de la Alhambra.`,
      en: 'An international team of archaeologists has discovered an underground network of 11th-century irrigation channels and Arab baths near the Albaicín neighborhood in Granada.',
      ar: 'اكتشف فريق دولي من علماء الآثار شبكة تحت الأرض من السواقي والحمامات العربية من القرن الحادي عشر في حي البيازين بغرناطة.'
    },
    {
      title: 'Diálogo: Alquilando un piso en el centro de Valencia',
      category: 'Dialogue' as const,
      cefr: 'A2' as const,
      content: `INQUILINO: ¡Buenos días! Llamo por el anuncio del piso de dos habitaciones en la calle Colón. ¿Sigue disponible?

PROPIETARIO: ¡Hola! Sí, todavía está disponible. Tiene mucha luz natural, balcón exterior y cocina completamente equipada.

INQUILINO: ¿Cuánto cuesta el alquiler mensual y qué gastos están incluidos en el precio?

PROPIETARIO: Son ochocientos euros al mes. La comunidad de vecinos y el agua están incluidos; la electricidad e internet van por cuenta del inquilino. Pedimos dos meses de fianza y contrato de trabajo.`,
      en: 'TENANT: Good morning! I am calling about the advertisement for the two-bedroom apartment on Colón Street. Is it still available?',
      ar: 'المستأجر: صباح الخير! أتصل بخصوص إعلان الشقة المكونة من غرفتين في شارع كولون. هل لا تزال متاحة؟'
    }
  ];

  const handleApplyPreset = (p: typeof presets[0]) => {
    setTitle(p.title);
    setCategory(p.category);
    setCefr(p.cefr);
    setContent(p.content);
    setTranslationEn(p.en);
    setTranslationAr(p.ar);
  };

  const handleImport = () => {
    if (!title.trim() || !content.trim()) return;

    const words = content.trim().split(/\s+/).length;

    const newImported: ImportedContent = {
      id: `imported-${Date.now()}`,
      title: title.trim(),
      category,
      cefr,
      content: content.trim(),
      translation_en: translationEn.trim() || undefined,
      translation_ar: translationAr.trim() || undefined,
      dateAdded: new Date().toISOString().split('T')[0],
      wordCount: words
    };

    soundEffects.playLevelUp();

    // Persist to user's imported texts
    setUserProgress(prev => ({
      ...prev,
      customImportedTexts: [newImported, ...(prev.customImportedTexts || [])],
      xp: prev.xp + 25
    }));

    onImportSuccess(newImported);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500 text-stone-950">
                Learner Agency
              </span>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                LingQ-Style Content Importer
              </span>
            </div>
            <h3 className="text-xl font-black text-stone-900 dark:text-white">
              Import Any Spanish Text / Media
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="space-y-2">
          <span className="text-xs font-black uppercase text-stone-400">
            Quick Load Authentic Templates:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {presets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-stone-200 dark:border-stone-700 text-left transition text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-stone-900 dark:text-white">{p.title}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-stone-950">
                    {p.cefr}
                  </span>
                </div>
                <p className="text-stone-400 text-[11px] line-clamp-1">{p.content}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                Title / Source Name *
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g., El País: Entrevista de tecnología..."
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-sm font-bold text-stone-900 dark:text-white focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                CEFR Level
              </label>
              <select
                value={cefr}
                onChange={e => setCefr(e.target.value as CEFRLevel)}
                className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-sm font-bold text-stone-900 dark:text-white"
              >
                <option value="A1">A1 Beginner</option>
                <option value="A2">A2 Elementary</option>
                <option value="B1">B1 Intermediate</option>
                <option value="B2">B2 Advanced</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex justify-between items-center">
              <span>Spanish Text Content (Paste any article, dialogue, lyrics) *</span>
              <span className="text-stone-400 font-mono text-[11px]">
                {content.trim() ? `${content.trim().split(/\s+/).length} words` : '0 words'}
              </span>
            </label>
            <textarea
              rows={6}
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Paste your Spanish article, YouTube transcript, novel excerpt, or song lyrics here..."
              className="w-full p-4 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-sm leading-relaxed text-stone-900 dark:text-white focus:ring-2 focus:ring-amber-500 font-sans"
            />
          </div>

          {content.trim() && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleAiTranslate}
                disabled={isTranslating}
                className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition shadow-md border ${
                  isTranslating
                    ? 'bg-stone-100 dark:bg-stone-800 text-stone-400 border-stone-200 dark:border-stone-700 cursor-not-allowed'
                    : 'bg-amber-500 hover:bg-amber-400 text-stone-950 border-amber-400'
                }`}
              >
                <Sparkles className={`w-4 h-4 ${isTranslating ? 'animate-spin text-stone-950' : 'text-stone-950'}`} />
                <span>{isTranslating ? 'Auto-Translating...' : '✨ Auto-Translate & Align (English & Arabic)'}</span>
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                English Translation (Optional)
              </label>
              <textarea
                rows={2}
                value={translationEn}
                onChange={e => setTranslationEn(e.target.value)}
                placeholder="Optional parallel English translation..."
                className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                Arabic Translation (Optional)
              </label>
              <textarea
                rows={2}
                value={translationAr}
                onChange={e => setTranslationAr(e.target.value)}
                placeholder="ترجمة عربية اختيارية..."
                className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-white font-arabic"
                dir="rtl"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-stone-200 dark:border-stone-800">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-stone-500 hover:text-stone-900 dark:hover:text-white font-bold text-xs"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleImport}
            disabled={!title.trim() || !content.trim()}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-black text-xs flex items-center gap-2 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Open in Interactive Reader</span>
          </button>
        </div>
      </div>
    </div>
  );
};
