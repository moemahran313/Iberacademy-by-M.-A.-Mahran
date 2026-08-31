export interface AvatarOption {
  id: string;
  name: string;
  name_es: string;
  emoji: string;
  gradient: string;
  badgeBg: string;
  description: string;
  region: string;
}

export const CULTURAL_AVATARS: AvatarOption[] = [
  {
    id: 'sun',
    name: 'Iberian Sol',
    name_es: 'Sol Ibérico',
    emoji: '☀️',
    gradient: 'from-amber-400 via-orange-500 to-amber-600',
    badgeBg: 'bg-amber-500',
    description: 'Warm Mediterranean energy & radiance',
    region: 'Spain / Mediterranean'
  },
  {
    id: 'flamenco',
    name: 'Flamenco Spirit',
    name_es: 'Bailaora Flamenca',
    emoji: '💃',
    gradient: 'from-rose-500 via-red-600 to-pink-600',
    badgeBg: 'bg-rose-500',
    description: 'Passion, acoustic art & Andalusian soul',
    region: 'Andalucía, Spain'
  },
  {
    id: 'quetzal',
    name: 'Resplendent Quetzal',
    name_es: 'Quetzal Sagrado',
    emoji: '🦜',
    gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
    badgeBg: 'bg-emerald-500',
    description: 'Freedom, beauty & Mayan civilization',
    region: 'Guatemala & Central America'
  },
  {
    id: 'futbol',
    name: 'El Balón de Oro',
    name_es: 'Astro del Fútbol',
    emoji: '⚽',
    gradient: 'from-blue-500 via-indigo-600 to-violet-700',
    badgeBg: 'bg-blue-600',
    description: 'Legendary Hispanic football mastery',
    region: 'Hispanosphere'
  },
  {
    id: 'cafe',
    name: 'Café de Altura',
    name_es: 'Café de Colombia',
    emoji: '☕',
    gradient: 'from-amber-700 via-amber-800 to-stone-900',
    badgeBg: 'bg-amber-700',
    description: 'Rich mountain roast & warmth',
    region: 'Colombia & Central America'
  },
  {
    id: 'llama',
    name: 'Andean Llama',
    name_es: 'Llama Andina',
    emoji: '🦙',
    gradient: 'from-amber-500 via-lime-600 to-emerald-700',
    badgeBg: 'bg-lime-600',
    description: 'High-altitude resilience & Incan heritage',
    region: 'Perú, Bolivia & Andes'
  },
  {
    id: 'guitarra',
    name: 'Spanish Guitar',
    name_es: 'Guitarra Española',
    emoji: '🎸',
    gradient: 'from-orange-500 via-amber-600 to-red-700',
    badgeBg: 'bg-orange-500',
    description: 'Classical phrasing & flamenco chords',
    region: 'Madrid & Andalucía'
  },
  {
    id: 'alhambra',
    name: 'Alhambra Palace',
    name_es: 'Palacio de la Alhambra',
    emoji: '🕌',
    gradient: 'from-rose-600 via-purple-700 to-indigo-900',
    badgeBg: 'bg-purple-600',
    description: 'Moorish architectural harmony & poetry',
    region: 'Granada, Spain'
  },
  {
    id: 'toro',
    name: 'Toro Bravo',
    name_es: 'Toro de Lidia',
    emoji: '🐂',
    gradient: 'from-stone-800 via-red-900 to-stone-950',
    badgeBg: 'bg-red-800',
    description: 'Strength, courage & ancient folklore',
    region: 'Spain'
  },
  {
    id: 'paella',
    name: 'Paella Valenciana',
    name_es: 'Paella Tradicional',
    emoji: '🥘',
    gradient: 'from-yellow-400 via-amber-500 to-orange-600',
    badgeBg: 'bg-yellow-500',
    description: 'Coastal saffron cuisine & celebration',
    region: 'Valencia, Spain'
  },
  {
    id: 'azteca',
    name: 'Aztec Pyramid',
    name_es: 'Pirámide Azteca',
    emoji: '🏛️',
    gradient: 'from-amber-600 via-stone-700 to-stone-900',
    badgeBg: 'bg-stone-700',
    description: 'Mesoamerican astronomy & architecture',
    region: 'México'
  },
  {
    id: 'quijote',
    name: 'Don Quijote Windmill',
    name_es: 'Molino de la Mancha',
    emoji: '💨',
    gradient: 'from-sky-400 via-blue-600 to-indigo-800',
    badgeBg: 'bg-sky-600',
    description: 'Literary idealism & epic adventures',
    region: 'Castilla-La Mancha, Spain'
  }
];

export const getAvatarById = (id?: string | null): AvatarOption => {
  if (!id) return CULTURAL_AVATARS[0];
  const found = CULTURAL_AVATARS.find(a => a.id === id);
  return found || CULTURAL_AVATARS[0];
};

export const getDeterministicGradient = (str: string): string => {
  const gradients = [
    'from-amber-500 to-orange-600',
    'from-rose-500 to-pink-600',
    'from-emerald-500 to-teal-600',
    'from-blue-500 to-indigo-600',
    'from-violet-500 to-purple-700',
    'from-sky-400 to-blue-600',
    'from-lime-500 to-emerald-600',
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
};
