import React, { useState } from 'react';
import { FlagIcon } from './FlagIcon';
import { soundEffects } from '../utils/audio';
import { Globe, MapPin, Sparkles } from 'lucide-react';

export interface TerritoryFlagItem {
  id: string;
  code: string;
  name_es: string;
  name_en: string;
  type: 'country' | 'us_state';
  spanishPercent: string;
  capitalOrMajor: string;
  highlight?: string;
}

export const ALL_FLAG_TERRITORIES: TerritoryFlagItem[] = [
  // 21 Sovereign / Official Hispanosphere Nations
  { id: 'spain', code: 'es', name_es: 'España', name_en: 'Spain', type: 'country', spanishPercent: '94% Native', capitalOrMajor: 'Madrid', highlight: 'Castilian standard' },
  { id: 'mexico', code: 'mx', name_es: 'México', name_en: 'Mexico', type: 'country', spanishPercent: '99% Spoken', capitalOrMajor: 'CDMX', highlight: '130M+ Speakers' },
  { id: 'colombia', code: 'co', name_es: 'Colombia', name_en: 'Colombia', type: 'country', spanishPercent: '99% Spoken', capitalOrMajor: 'Bogotá', highlight: 'Pristine phonetics' },
  { id: 'argentina', code: 'ar', name_es: 'Argentina', name_en: 'Argentina', type: 'country', spanishPercent: '98% Spoken', capitalOrMajor: 'Buenos Aires', highlight: 'Rioplatense & Voseo' },
  { id: 'peru', code: 'pe', name_es: 'Perú', name_en: 'Peru', type: 'country', spanishPercent: '84% Native', capitalOrMajor: 'Lima', highlight: 'Andean & Coastal' },
  { id: 'chile', code: 'cl', name_es: 'Chile', name_en: 'Chile', type: 'country', spanishPercent: '99% Spoken', capitalOrMajor: 'Santiago', highlight: 'Dynamic cadence' },
  { id: 'guatemala', code: 'gt', name_es: 'Guatemala', name_en: 'Guatemala', type: 'country', spanishPercent: '73.7%', capitalOrMajor: 'C. de Guatemala', highlight: 'Central American' },
  { id: 'cuba', code: 'cu', name_es: 'Cuba', name_en: 'Cuba', type: 'country', spanishPercent: '99.8%', capitalOrMajor: 'La Habana', highlight: 'Caribbean rhythm' },
  { id: 'dominican_republic', code: 'do', name_es: 'República Dominicana', name_en: 'Dominican Rep.', type: 'country', spanishPercent: '98.8%', capitalOrMajor: 'Santo Domingo', highlight: 'Antillean Spanish' },
  { id: 'puerto_rico', code: 'pr', name_es: 'Puerto Rico', name_en: 'Puerto Rico', type: 'country', spanishPercent: '95%+', capitalOrMajor: 'San Juan', highlight: 'Boricua Spanish' },
  { id: 'ecuador', code: 'ec', name_es: 'Ecuador', name_en: 'Ecuador', type: 'country', spanishPercent: '93%', capitalOrMajor: 'Quito', highlight: 'Equatorial Sierra' },
  { id: 'bolivia', code: 'bo', name_es: 'Bolivia', name_en: 'Bolivia', type: 'country', spanishPercent: '88%', capitalOrMajor: 'La Paz / Sucre', highlight: 'Altiplano accents' },
  { id: 'venezuela', code: 've', name_es: 'Venezuela', name_en: 'Venezuela', type: 'country', spanishPercent: '98%', capitalOrMajor: 'Caracas', highlight: 'Caribbean & Llanero' },
  { id: 'costa_rica', code: 'cr', name_es: 'Costa Rica', name_en: 'Costa Rica', type: 'country', spanishPercent: '99%', capitalOrMajor: 'San José', highlight: 'Pura Vida Spanish' },
  { id: 'panama', code: 'pa', name_es: 'Panamá', name_en: 'Panama', type: 'country', spanishPercent: '93%', capitalOrMajor: 'Ciudad de Panamá', highlight: 'Transoceanic hub' },
  { id: 'uruguay', code: 'uy', name_es: 'Uruguay', name_en: 'Uruguay', type: 'country', spanishPercent: '98.5%', capitalOrMajor: 'Montevideo', highlight: 'Rioplatense cadence' },
  { id: 'paraguay', code: 'py', name_es: 'Paraguay', name_en: 'Paraguay', type: 'country', spanishPercent: '90%', capitalOrMajor: 'Asunción', highlight: 'Guaraní bilingualism' },
  { id: 'honduras', code: 'hn', name_es: 'Honduras', name_en: 'Honduras', type: 'country', spanishPercent: '98%', capitalOrMajor: 'Tegucigalpa', highlight: 'Catracho Spanish' },
  { id: 'el_salvador', code: 'sv', name_es: 'El Salvador', name_en: 'El Salvador', type: 'country', spanishPercent: '99%', capitalOrMajor: 'San Salvador', highlight: 'Cuscatleco Spanish' },
  { id: 'nicaragua', code: 'ni', name_es: 'Nicaragua', name_en: 'Nicaragua', type: 'country', spanishPercent: '97%', capitalOrMajor: 'Managua', highlight: 'Pinolero Spanish' },
  { id: 'equatorial_guinea', code: 'gq', name_es: 'Guinea Ecuatorial', name_en: 'Equatorial Guinea', type: 'country', spanishPercent: '87.7%', capitalOrMajor: 'Malabo', highlight: 'African Hispanidad' },

  // US Spanish-Speaking States (Texas, California, New Mexico, Arizona, Nevada, Florida, New Jersey, New York, Illinois, Colorado, Rhode Island, Connecticut)
  { id: 'us_tx', code: 'tx', name_es: 'Texas', name_en: 'Texas (TX)', type: 'us_state', spanishPercent: '29.4% (8.8M+)', capitalOrMajor: 'Austin / Houston', highlight: 'Tejano heritage' },
  { id: 'us_ca', code: 'ca', name_es: 'California', name_en: 'California (CA)', type: 'us_state', spanishPercent: '28.7% (11M+)', capitalOrMajor: 'Sacramento / LA', highlight: '11M+ Spanish speakers' },
  { id: 'us_nm', code: 'nm', name_es: 'Nuevo México', name_en: 'New Mexico (NM)', type: 'us_state', spanishPercent: '28.6%', capitalOrMajor: 'Santa Fe', highlight: 'Historic Neomexicano' },
  { id: 'us_az', code: 'az', name_es: 'Arizona', name_en: 'Arizona (AZ)', type: 'us_state', spanishPercent: '20.4% (1.5M+)', capitalOrMajor: 'Phoenix', highlight: 'Sonoran corridor' },
  { id: 'us_nv', code: 'nv', name_es: 'Nevada', name_en: 'Nevada (NV)', type: 'us_state', spanishPercent: '20.3%', capitalOrMajor: 'Carson City / Las Vegas', highlight: 'Silver state bilinguals' },
  { id: 'us_fl', code: 'fl', name_es: 'Florida', name_en: 'Florida (FL)', type: 'us_state', spanishPercent: '20.2% (4.5M+)', capitalOrMajor: 'Tallahassee / Miami', highlight: 'Pan-Latin American hub' },
  { id: 'us_nj', code: 'nj', name_es: 'Nueva Jersey', name_en: 'New Jersey (NJ)', type: 'us_state', spanishPercent: '15.4% (1.4M+)', capitalOrMajor: 'Trenton / Jersey City', highlight: 'Multicultural metro' },
  { id: 'us_ny', code: 'ny', name_es: 'Nueva York', name_en: 'New York (NY)', type: 'us_state', spanishPercent: '14.7% (2.9M+)', capitalOrMajor: 'Albany / NYC', highlight: 'NYC bilingual capital' },
  { id: 'us_il', code: 'il', name_es: 'Illinois', name_en: 'Illinois (IL)', type: 'us_state', spanishPercent: '13.0% (1.6M+)', capitalOrMajor: 'Springfield / Chicago', highlight: 'Midwest hub (Pilsen)' },
  { id: 'us_co', code: 'us_co', name_es: 'Colorado', name_en: 'Colorado (CO)', type: 'us_state', spanishPercent: '11.8% (680k+)', capitalOrMajor: 'Denver', highlight: 'San Luis Valley roots' },
  { id: 'us_ri', code: 'ri', name_es: 'Rhode Island', name_en: 'Rhode Island (RI)', type: 'us_state', spanishPercent: '11.0%', capitalOrMajor: 'Providence', highlight: 'Providence Latino hub' },
  { id: 'us_ct', code: 'ct', name_es: 'Connecticut', name_en: 'Connecticut (CT)', type: 'us_state', spanishPercent: '10.8%', capitalOrMajor: 'Hartford / Bridgeport', highlight: 'Tri-state bilingual' },
];

interface HispanosphereFlagStripProps {
  onSelectTerritory?: (territory: TerritoryFlagItem) => void;
  selectedTerritoryId?: string | null;
  className?: string;
}

export const HispanosphereFlagStrip: React.FC<HispanosphereFlagStripProps> = ({
  onSelectTerritory,
  selectedTerritoryId,
  className = ''
}) => {
  const [filter, setFilter] = useState<'all' | 'countries' | 'us_states'>('all');
  const [activeHoverItem, setActiveHoverItem] = useState<TerritoryFlagItem | null>(null);

  const filteredItems = ALL_FLAG_TERRITORIES.filter(item => {
    if (filter === 'countries') return item.type === 'country';
    if (filter === 'us_states') return item.type === 'us_state';
    return true;
  });

  return (
    <div className={`w-full flex flex-col items-center gap-3 ${className}`}>
      {/* Header controls & Filter toggle pills */}
      <div className="flex items-center justify-between w-full max-w-4xl px-2 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-black text-stone-800 uppercase tracking-wider font-mono">
            <Globe className="w-3.5 h-3.5 text-orange-600" />
            21 Hispanic Nations + 12 US States
          </span>
          <span className="text-[11px] text-stone-500 hidden sm:inline">
            (500M+ Native & Bilingual Speakers)
          </span>
        </div>

        <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-xl border border-stone-200 text-[11px] font-bold">
          <button
            onClick={() => {
              soundEffects.playPop();
              setFilter('all');
            }}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-white text-stone-900 shadow-xs font-black'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All (33)
          </button>
          <button
            onClick={() => {
              soundEffects.playPop();
              setFilter('countries');
            }}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              filter === 'countries'
                ? 'bg-orange-500 text-white shadow-xs font-black'
                : 'text-stone-600 hover:text-orange-600'
            }`}
          >
            21 Nations
          </button>
          <button
            onClick={() => {
              soundEffects.playPop();
              setFilter('us_states');
            }}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              filter === 'us_states'
                ? 'bg-amber-500 text-stone-950 shadow-xs font-black'
                : 'text-stone-600 hover:text-amber-700'
            }`}
          >
            12 US States
          </button>
        </div>
      </div>

      {/* Flags Grid / Strip Container with literal vector artwork */}
      <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-stone-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {filteredItems.map(item => {
            const isSelected = selectedTerritoryId === item.id;
            const isUS = item.type === 'us_state';

            return (
              <button
                key={item.id}
                onClick={() => {
                  soundEffects.playPop();
                  onSelectTerritory?.(item);
                }}
                onMouseEnter={() => setActiveHoverItem(item)}
                onMouseLeave={() => setActiveHoverItem(null)}
                className={`group relative flex items-center gap-1.5 px-2 py-1 rounded-xl transition-all cursor-pointer text-left border ${
                  isSelected
                    ? isUS
                      ? 'bg-yellow-100 border-yellow-400 ring-2 ring-yellow-400 shadow-sm'
                      : 'bg-orange-100 border-orange-400 ring-2 ring-orange-400 shadow-sm'
                    : 'bg-stone-50/80 hover:bg-stone-100 border-stone-200/80 hover:border-stone-300'
                }`}
              >
                {/* Literal SVG Vector Flag */}
                <FlagIcon code={item.code} size="md" title={`${item.name_es} (${item.name_en})`} />

                <span className="text-[11px] font-bold text-stone-700 group-hover:text-stone-900 whitespace-nowrap">
                  {item.name_es}
                </span>

                {isUS && (
                  <span className="text-[9px] font-black px-1 py-0.2 rounded bg-amber-200 text-amber-900 font-mono">
                    US
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Hover / Active territory detail bar */}
        {activeHoverItem && (
          <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600 flex-wrap gap-2 px-1">
            <div className="flex items-center gap-2">
              <FlagIcon code={activeHoverItem.code} size="sm" />
              <span className="font-black text-stone-900">
                {activeHoverItem.name_es} ({activeHoverItem.name_en})
              </span>
              <span className="text-stone-300">•</span>
              <span className="font-mono text-orange-600 font-bold">
                {activeHoverItem.spanishPercent} Spanish Spoken
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-stone-500 font-medium">
              <MapPin className="w-3 h-3 text-stone-400" />
              <span>Capital/Hub: <strong>{activeHoverItem.capitalOrMajor}</strong></span>
              <span className="text-stone-300">•</span>
              <span>{activeHoverItem.highlight}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HispanosphereFlagStrip;
