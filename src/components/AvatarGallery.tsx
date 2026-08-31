import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Link as LinkIcon,
  Upload,
  Check,
  Image as ImageIcon,
  AlertCircle,
  Globe,
  Info
} from 'lucide-react';
import { CULTURAL_AVATARS, AvatarOption } from '../data/avatars';
import { AvatarDisplay } from './AvatarDisplay';
import { soundEffects } from '../utils/audio';

export interface AvatarGalleryProps {
  selectedAvatarId: string;
  photoURL?: string;
  displayName?: string;
  onSelectAvatar: (avatarId: string) => void;
  onUpdatePhotoURL?: (url: string) => void;
  requireSelection?: boolean;
  className?: string;
  compact?: boolean;
}

export const AvatarGallery: React.FC<AvatarGalleryProps> = ({
  selectedAvatarId = 'sun',
  photoURL = '',
  displayName = 'Spanish Learner',
  onSelectAvatar,
  onUpdatePhotoURL,
  requireSelection = false,
  className = '',
  compact = false
}) => {
  const [activeTab, setActiveTab] = useState<'cultural' | 'custom'>('cultural');
  const [customUrlInput, setCustomUrlInput] = useState(photoURL || '');
  const [uploadError, setUploadError] = useState<string | null>(null);

  const currentAvatarMeta =
    CULTURAL_AVATARS.find((a) => a.id === selectedAvatarId) || CULTURAL_AVATARS[0];

  const handleSelectCultural = (avatar: AvatarOption) => {
    soundEffects.playPop();
    onSelectAvatar(avatar.id);
    if (onUpdatePhotoURL) {
      onUpdatePhotoURL('');
    }
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customUrlInput.trim();
    if (!trimmed) {
      if (onUpdatePhotoURL) onUpdatePhotoURL('');
      return;
    }
    soundEffects.playPop();
    if (onUpdatePhotoURL) onUpdatePhotoURL(trimmed);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setUploadError('Image size should be less than 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl && onUpdatePhotoURL) {
        soundEffects.playPop();
        onUpdatePhotoURL(dataUrl);
      }
    };
    reader.onerror = () => {
      setUploadError('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Live Preview Card */}
      <div className="flex items-center gap-4 p-4 rounded-3xl bg-amber-500/5 dark:bg-stone-800/60 border border-amber-500/20 dark:border-stone-700/60">
        <div className="relative shrink-0">
          <AvatarDisplay
            photoURL={photoURL}
            avatarId={!photoURL ? selectedAvatarId : undefined}
            name={displayName}
            size="lg"
          />
          <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-amber-500 text-stone-950 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-black text-stone-900 dark:text-white truncate">
              {displayName || 'Spanish Learner'}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-800 dark:text-amber-300">
              {photoURL ? 'Custom Photo' : currentAvatarMeta.name}
            </span>
          </div>
          <p className="text-[11px] text-stone-600 dark:text-stone-400 line-clamp-1">
            {photoURL ? 'Personal picture active' : currentAvatarMeta.description}
          </p>
          <div className="flex items-center gap-1 text-[10px] text-stone-500 dark:text-stone-500">
            <Globe className="w-3 h-3 text-amber-500 shrink-0" />
            <span className="truncate">{currentAvatarMeta.region}</span>
          </div>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      {onUpdatePhotoURL && (
        <div className="flex rounded-2xl bg-stone-100 dark:bg-stone-800 p-1 border border-stone-200 dark:border-stone-700">
          <button
            type="button"
            onClick={() => {
              soundEffects.playPop();
              setActiveTab('cultural');
            }}
            className={`flex-1 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'cultural'
                ? 'bg-white dark:bg-stone-900 text-stone-950 dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Cultural Icons ({CULTURAL_AVATARS.length})</span>
          </button>
          <button
            type="button"
            onClick={() => {
              soundEffects.playPop();
              setActiveTab('custom');
            }}
            className={`flex-1 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'custom'
                ? 'bg-white dark:bg-stone-900 text-stone-950 dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-500" />
            <span>Custom Photo / URL</span>
          </button>
        </div>
      )}

      {/* Tab 1: Cultural Icons Grid */}
      {activeTab === 'cultural' && (
        <div className="space-y-2">
          {requireSelection && (
            <p className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <Info className="w-3.5 h-3.5" />
              <span>Please select your Hispanic cultural emblem to continue:</span>
            </p>
          )}

          <div
            className={`grid gap-2.5 ${
              compact
                ? 'grid-cols-2 sm:grid-cols-4 max-h-64 overflow-y-auto pr-1'
                : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 max-h-72 overflow-y-auto pr-1'
            }`}
          >
            {CULTURAL_AVATARS.map((avatar) => {
              const isSelected = !photoURL && selectedAvatarId === avatar.id;
              return (
                <button
                  key={avatar.id}
                  type="button"
                  onClick={() => handleSelectCultural(avatar)}
                  className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between gap-1.5 cursor-pointer group ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/40 shadow-sm'
                      : 'bg-white dark:bg-stone-900/80 border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-9 h-9 rounded-xl bg-gradient-to-br ${avatar.gradient} text-white flex items-center justify-center text-lg shadow-sm group-hover:scale-105 transition-transform`}
                    >
                      {avatar.emoji}
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-black text-stone-900 dark:text-white truncate">
                      {avatar.name}
                    </p>
                    <p className="text-[10px] text-stone-500 dark:text-stone-400 line-clamp-1">
                      {avatar.region}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Custom Photo & URL */}
      {activeTab === 'custom' && onUpdatePhotoURL && (
        <div className="space-y-4 p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/60">
          {/* File Upload */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5 text-amber-500" />
              <span>Upload Image from Device</span>
            </label>
            <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-2xl cursor-pointer hover:border-amber-500 dark:hover:border-amber-500 bg-white dark:bg-stone-900/60 transition group">
              <Upload className="w-5 h-5 text-stone-400 group-hover:text-amber-500 mb-1 transition" />
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                Click or Drag & Drop Image
              </span>
              <span className="text-[10px] text-stone-400">PNG, JPG, WEBP (Max 2MB)</span>
              <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Direct URL Input */}
          <form onSubmit={handleApplyUrl} className="space-y-2 pt-2 border-t border-stone-200 dark:border-stone-700">
            <label className="text-xs font-black uppercase tracking-wider text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-amber-500" />
              <span>Or Paste Direct Image URL</span>
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={customUrlInput}
                onChange={(e) => setCustomUrlInput(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="flex-1 px-3.5 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition cursor-pointer"
              >
                Apply
              </button>
            </div>
          </form>

          {uploadError && (
            <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
