import React, { useState } from 'react';
import { ExternalLink, Video, BookOpen, GraduationCap, Volume2, Play } from 'lucide-react';
import { VIDEO_COURSES } from '../data';
import { speakSpanish } from '../utils/audio';

export const VideoCoursesView: React.FC = () => {
  const [selectedVideoId, setSelectedVideoId] = useState<string>(VIDEO_COURSES[0].id);

  const selectedVideo = VIDEO_COURSES.find(v => v.id === selectedVideoId) || VIDEO_COURSES[0];

  const getEmbedSrc = (video: typeof selectedVideo) => {
    const rawId = video.playlistId || video.youtubeId;
    if (rawId.includes('list=')) {
      const cleanId = rawId.split('list=')[1];
      return `https://www.youtube-nocookie.com/embed/videoseries?list=${cleanId}&rel=0`;
    }
    if (rawId.startsWith('PL')) {
      return `https://www.youtube-nocookie.com/embed/videoseries?list=${rawId}&rel=0`;
    }
    return `https://www.youtube-nocookie.com/embed/${rawId}?rel=0`;
  };

  const getPlaylistUrl = (video: typeof selectedVideo) => {
    if (video.playlistUrl) return video.playlistUrl;
    const rawId = video.playlistId || video.youtubeId;
    const cleanId = rawId.includes('list=') ? rawId.split('list=')[1] : rawId;
    return `https://www.youtube.com/playlist?list=${cleanId}`;
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 text-stone-100 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30">
            Curated Visual Masterclasses
          </span>
          <span className="text-xs text-stone-400">Embedded Playlists • Chapter Timestamps</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-white">
          Spanish Video Courses & Phonetics Lab
        </h1>
        <p className="text-sm text-stone-300 mt-1 max-w-2xl">
          Watch top-tier Spanish playlists explaining pronunciation, phonetic nuances, subjunctive triggers, and conversational rhythm with synchronized study guides.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Video Player & Notes */}
        <div className="lg:col-span-8 space-y-5">
          {/* YouTube Embed Container */}
          <div className="bg-stone-900 rounded-2xl overflow-hidden shadow-lg aspect-video border border-stone-800 relative">
            <iframe
              className="w-full h-full"
              src={getEmbedSrc(selectedVideo)}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Video Metadata */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
              <div>
                <span className="px-2 py-0.5 rounded text-xs font-black bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 uppercase">
                  {selectedVideo.cefr} • {selectedVideo.topic}
                </span>
                <h2 className="text-xl font-black text-stone-900 dark:text-white mt-1">
                  {selectedVideo.title}
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium mt-0.5">
                  Instructor: <strong>{selectedVideo.creator}</strong> • Duration: {selectedVideo.duration}
                </p>
              </div>

              <a
                href={getPlaylistUrl(selectedVideo)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-xs shrink-0"
              >
                <span>Open Playlist on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {selectedVideo.description_en}
            </p>
            <p className="text-xs text-amber-900 dark:text-amber-400 font-arabic leading-relaxed" dir="rtl">
              {selectedVideo.description_ar}
            </p>

            {/* Timestamps */}
            {selectedVideo.timestamps.length > 0 && (
              <div className="pt-2">
                <span className="text-xs font-black uppercase tracking-wider text-stone-400 dark:text-stone-500 block mb-2">
                  Curated Chapter Modules:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedVideo.timestamps.map((ts, idx) => (
                    <div key={idx} className="p-2.5 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700 text-xs flex items-center justify-between">
                      <div>
                        <span className="font-bold text-stone-900 dark:text-stone-100 block">{ts.title}</span>
                        <span className="text-[11px] text-stone-500 dark:text-stone-400">{ts.grammarOrVocab}</span>
                      </div>
                      <span className="font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">
                        {ts.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Vocab Chips */}
            {selectedVideo.keyVocab.length > 0 && (
              <div className="pt-1 flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-stone-400 dark:text-stone-500">Key Vocab:</span>
                {selectedVideo.keyVocab.map((w, i) => (
                  <span
                    key={i}
                    onClick={() => speakSpanish(w)}
                    className="px-2 py-0.5 rounded-md text-xs font-semibold bg-stone-100 dark:bg-stone-800 hover:bg-amber-100 text-stone-800 dark:text-stone-200 cursor-pointer border border-stone-200 dark:border-stone-700"
                  >
                    {w} 🔊
                  </span>
                ))}
              </div>
            )}

            {/* Grammar takeaway */}
            {selectedVideo.grammarNote && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-xl text-xs space-y-0.5">
                <span className="font-black text-amber-900 dark:text-amber-300 block">💡 Key Instructor Takeaway:</span>
                <p className="text-stone-800 dark:text-stone-200 font-medium">{selectedVideo.grammarNote}</p>
              </div>
            )}
          </div>
        </div>

        {/* Video Playlist Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block px-1">
            Official Course Playlists
          </span>
          <div className="space-y-2">
            {VIDEO_COURSES.map(vid => {
              const isSelected = vid.id === selectedVideoId;
              return (
                <button
                  key={vid.id}
                  onClick={() => setSelectedVideoId(vid.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-stone-900 dark:bg-stone-800 text-white border-stone-900 dark:border-stone-700 shadow-sm'
                      : 'bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800/50 border-stone-200 dark:border-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-black uppercase ${
                      isSelected ? 'bg-amber-400 text-stone-950' : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                    }`}>
                      {vid.cefr}
                    </span>
                    <span className="font-bold text-xs line-clamp-1">{vid.title}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-[11px] text-stone-400 font-medium">
                    <span>{vid.creator}</span>
                    <span>{vid.duration}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

