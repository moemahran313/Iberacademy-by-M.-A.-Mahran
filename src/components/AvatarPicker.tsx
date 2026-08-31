import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Link as LinkIcon,
  Upload,
  Check,
  Image as ImageIcon,
  AlertCircle
} from 'lucide-react';
import { CULTURAL_AVATARS, AvatarOption } from '../data/avatars';
import { AvatarDisplay } from './AvatarDisplay';
import { soundEffects } from '../utils/audio';

interface AvatarPickerProps {
  selectedAvatarId?: string;
  photoURL?: string;
  displayName?: string;
  onSelectAvatar: (avatarId: string) => void;
  onUpdatePhotoURL: (url: string) => void;
  className?: string;
}

export const AvatarPicker: React.FC<AvatarPickerProps> = ({
  selectedAvatarId = 'sun',
  photoURL = '',
  displayName = 'Learner',
  onSelectAvatar,
  onUpdatePhotoURL,
  className = ''
}) => {
  const [activeMode, setActiveMode] = useState<'gallery' | 'url' | 'upload'>('gallery');
  const [customUrlInput, setCustomUrlInput] = useState(photoURL || '');
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleSelectCultural = (avatar: AvatarOption) => {
    soundEffects.playPop();
    onSelectAvatar(avatar.id);
    onUpdatePhotoURL('');
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customUrlInput.trim();
    if (!trimmed) {
      onUpdatePhotoURL('');
      return;
    }
    soundEffects.playPop();
    onUpdatePhotoURL(trimmed);
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
      if (dataUrl) {
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
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60">
        <div className="relative">
          <AvatarDisplay
            photoURL={photoURL}
            avatarId={!photoURL ? selectedAvatarId : undefined}
            name={displayName}
            size="xl"
          />
          <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-amber-500 text-stone-950 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-black text-stone-900 dark:text-white flex items-center gap-1.5">
            <span>Avatar Preview:</span>
            <span className="text-amber-600 dark:text-amber-400 font-extrabold">
              {photoURL ? 'Custom Photo' : CULTURAL_AVATARS.find(a => a.id === selectedAvatarId)?.name || 'Iberian Sol'}
            </span>
          </p>
          <p className="text-[11px] text-stone-500 dark:text-stone-400">
            {photoURL
              ? 'Personal photo loaded via URL / upload'
              : CULTURAL_AVATARS.find(a => a.id === selectedAvatarId)?.description || 'Selected cultural badge'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex rounded-xl bg-stone-100 dark:bg-stone-800 p-1 border border-stone-200 dark:border-stone-700">
        <button
          type="button"
          onClick={() => setActiveMode('gallery')}
          className={`flex-1 py-1.5 text-xs font-black rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
            activeMode === 'gallery'
              ? 'bg-amber-500 text-stone-950 shadow-2xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Cultural Gallery</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode('url')}
          className={`flex-1 py-1.5 text-xs font-black rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
            activeMode === 'url'
              ? 'bg-amber-500 text-stone-950 shadow-2xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>Image Link</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode('upload')}
          className={`flex-1 py-1.5 text-xs font-black rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
            activeMode === 'upload'
              ? 'bg-amber-500 text-stone-950 shadow-2xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload File</span>
        </button>
      </div>

      {/* Mode 1: Curated Cultural Icons Grid */}
      {activeMode === 'gallery' && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 max-h-56 overflow-y-auto pr-1">
          {CULTURAL_AVATARS.map((avatar) => {
            const isSelected = !photoURL && selectedAvatarId === avatar.id;
            return (
              <button
                key={avatar.id}
                type="button"
                onClick={() => handleSelectCultural(avatar)}
                className={`group relative p-2 rounded-2xl flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer border ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500 ring-2 ring-amber-500/30'
                    : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700/80 hover:bg-stone-100 dark:hover:bg-stone-800 hover:border-amber-400'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatar.gradient} flex items-center justify-center text-lg shadow-xs group-hover:scale-105 transition-transform`}
                >
                  <span className="drop-shadow-xs">{avatar.emoji}</span>
                </div>
                <span className="text-[10px] font-black text-stone-800 dark:text-stone-200 truncate w-full">
                  {avatar.name_es}
                </span>
                {isSelected && (
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Mode 2: Custom Image URL */}
      {activeMode === 'url' && (
        <form onSubmit={handleApplyUrl} className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-black text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-amber-500" />
              <span>Direct Image URL:</span>
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={customUrlInput}
                onChange={(e) => setCustomUrlInput(e.target.value)}
                placeholder="https://example.com/my-photo.jpg"
                className="flex-1 px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black rounded-xl transition cursor-pointer shrink-0"
              >
                Apply URL
              </button>
            </div>
          </div>
          <p className="text-[11px] text-stone-400">
            Paste any publicly accessible PNG, JPG, or WEBP image link.
          </p>
        </form>
      )}

      {/* Mode 3: Local Image File Upload */}
      {activeMode === 'upload' && (
        <div className="space-y-3">
          <label className="block border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-amber-500 dark:hover:border-amber-500 rounded-2xl p-6 text-center cursor-pointer transition bg-stone-50 dark:bg-stone-800/40">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="p-3 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-black text-stone-900 dark:text-white">
                  Click to select photo or drag & drop
                </p>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  PNG, JPG, GIF or WEBP up to 2MB
                </p>
              </div>
            </div>
          </label>

          {uploadError && (
            <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
