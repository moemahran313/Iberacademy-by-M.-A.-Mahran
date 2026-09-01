import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as d3 from 'd3-geo';
import * as topojson from 'topojson-client';
import countriesData from 'world-atlas/countries-110m.json';
import usStatesData from 'us-atlas/states-10m.json';
import {
  Globe,
  RotateCcw,
  Play,
  Pause,
  Volume2,
  Sparkles,
  MapPin,
  Compass,
  Users,
  Eye,
  ZoomIn,
  ZoomOut,
  Layers,
  Sliders
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { soundEffects, speakSpanish } from '../utils/audio';
import { FlagIcon } from './FlagIcon';

export interface SpanishTerritoryData {
  id: string;
  type: 'country' | 'us_state';
  numericId?: string;
  stateCode?: string;
  name_es: string;
  name_en: string;
  flag: string;
  capital: string;
  lat: number;
  lng: number;
  population?: string;
  spanishPercent: string;
  isAboveTenPercent?: boolean;
  greeting: string;
  dialectNote: string;
  region: 'us_states' | 'europe' | 'north_central' | 'south_america' | 'caribbean' | 'africa';
  isMajorHub?: boolean;
}

export const HISPANOSPHERE_COUNTRIES: SpanishTerritoryData[] = [
  {
    id: 'spain',
    type: 'country',
    numericId: '724',
    name_es: 'España',
    name_en: 'Spain',
    flag: '🇪🇸',
    capital: 'Madrid',
    lat: 40.4168,
    lng: -3.7038,
    population: '47.5M',
    spanishPercent: '94% Native (100% Official)',
    greeting: '¡Hola! ¿Qué tal estás?',
    dialectNote: 'Castellano standard • Distinción (ceceo/seseo) • Vosotros',
    region: 'europe',
    isMajorHub: true
  },
  {
    id: 'mexico',
    type: 'country',
    numericId: '484',
    name_es: 'México',
    name_en: 'Mexico',
    flag: '🇲🇽',
    capital: 'Ciudad de México',
    lat: 19.4326,
    lng: -99.1332,
    population: '130M+',
    spanishPercent: '99% Spoken (Largest Global Population)',
    greeting: '¡Qué onda! ¿Cómo te va?',
    dialectNote: 'Largest Spanish-speaking nation • Rich idioms • Clear cadence',
    region: 'north_central',
    isMajorHub: true
  },
  {
    id: 'colombia',
    type: 'country',
    numericId: '170',
    name_es: 'Colombia',
    name_en: 'Colombia',
    flag: '🇨🇴',
    capital: 'Bogotá',
    lat: 4.711,
    lng: -74.0721,
    population: '52M',
    spanishPercent: '99% Spoken',
    greeting: '¡Hola parcero! Qué gusto saludarte.',
    dialectNote: 'Celebrated for pristine phonetics & crisp Bogotano syntax',
    region: 'south_america',
    isMajorHub: true
  },
  {
    id: 'argentina',
    type: 'country',
    numericId: '032',
    name_es: 'Argentina',
    name_en: 'Argentina',
    flag: '🇦🇷',
    capital: 'Buenos Aires',
    lat: -34.6037,
    lng: -58.3816,
    population: '46M',
    spanishPercent: '98% Spoken',
    greeting: '¡Che! ¿Cómo andás?',
    dialectNote: 'Rioplatense Spanish • Systematic Voseo • Italian-influenced cadence',
    region: 'south_america',
    isMajorHub: true
  },
  {
    id: 'peru',
    type: 'country',
    numericId: '604',
    name_es: 'Perú',
    name_en: 'Peru',
    flag: '🇵🇪',
    capital: 'Lima',
    lat: -12.0464,
    lng: -77.0428,
    population: '34M',
    spanishPercent: '84% Native',
    greeting: '¡Habla causa! ¿Todo bien?',
    dialectNote: 'Coastal & Andean Spanish • Clear articulation • Quechua roots',
    region: 'south_america',
    isMajorHub: true
  },
  {
    id: 'chile',
    type: 'country',
    numericId: '152',
    name_es: 'Chile',
    name_en: 'Chile',
    flag: '🇨🇱',
    capital: 'Santiago',
    lat: -33.4489,
    lng: -70.6693,
    population: '19.5M',
    spanishPercent: '99% Spoken',
    greeting: '¡Hola po! ¿Cómo tai?',
    dialectNote: 'Dynamic Chilean Spanish • Fast melodic flow & chilenismos',
    region: 'south_america'
  },
  {
    id: 'guatemala',
    type: 'country',
    numericId: '320',
    name_es: 'Guatemala',
    name_en: 'Guatemala',
    flag: '🇬🇹',
    capital: 'Ciudad de Guatemala',
    lat: 14.6349,
    lng: -90.5069,
    population: '18M',
    spanishPercent: '73.7% Spoken',
    greeting: '¡Qué onda mucha! Buenas tardes.',
    dialectNote: 'Central American Spanish • Voseo cordial • Mayan synergy',
    region: 'north_central'
  },
  {
    id: 'cuba',
    type: 'country',
    numericId: '192',
    name_es: 'Cuba',
    name_en: 'Cuba',
    flag: '🇨🇺',
    capital: 'La Habana',
    lat: 23.1136,
    lng: -82.3666,
    population: '11.2M',
    spanishPercent: '99.8% Spoken',
    greeting: '¡Qué bolá, asere!',
    dialectNote: 'Caribbean Spanish • Rapid rhythm • Expressive intonation',
    region: 'caribbean'
  },
  {
    id: 'dominican_republic',
    type: 'country',
    numericId: '214',
    name_es: 'República Dominicana',
    name_en: 'Dominican Republic',
    flag: '🇩🇴',
    capital: 'Santo Domingo',
    lat: 18.4861,
    lng: -69.9312,
    population: '11.3M',
    spanishPercent: '99% Spoken',
    greeting: '¡Dímelo mi gente! ¿Todo bien?',
    dialectNote: 'Lively Caribbean Spanish • Vocalic harmony & rhythmic flow',
    region: 'caribbean'
  },
  {
    id: 'puerto_rico',
    type: 'country',
    numericId: '630',
    name_es: 'Puerto Rico',
    name_en: 'Puerto Rico',
    flag: '🇵🇷',
    capital: 'San Juan',
    lat: 18.4655,
    lng: -66.1057,
    population: '3.2M',
    spanishPercent: '95% Native Spoken',
    greeting: '¡Wepa! ¿Cómo te va la vida?',
    dialectNote: 'Boricua Spanish • Global pop influence • Melodic inflection',
    region: 'caribbean'
  },
  {
    id: 'ecuador',
    type: 'country',
    numericId: '218',
    name_es: 'Ecuador',
    name_en: 'Ecuador',
    flag: '🇪🇨',
    capital: 'Quito',
    lat: -0.1807,
    lng: -78.4678,
    population: '18M',
    spanishPercent: '93% Spoken',
    greeting: '¡Hola desde la Mitad del Mundo!',
    dialectNote: 'Equatorial Andean Spanish • Polite diminutives • Crisp vowels',
    region: 'south_america'
  },
  {
    id: 'bolivia',
    type: 'country',
    numericId: '068',
    name_es: 'Bolivia',
    name_en: 'Bolivia',
    flag: '🇧🇴',
    capital: 'La Paz / Sucre',
    lat: -16.5,
    lng: -68.1193,
    population: '12.2M',
    spanishPercent: '88% Spoken',
    greeting: '¡Buen día! Un gusto compartir.',
    dialectNote: 'High-altitude Andean Spanish • Indigenous Aymara & Quechua richness',
    region: 'south_america'
  },
  {
    id: 'venezuela',
    type: 'country',
    numericId: '862',
    name_es: 'Venezuela',
    name_en: 'Venezuela',
    flag: '🇻🇪',
    capital: 'Caracas',
    lat: 10.4806,
    lng: -66.9036,
    population: '28M',
    spanishPercent: '98% Spoken',
    greeting: '¡Épale pana! ¿Todo chévere?',
    dialectNote: 'Caribbean & Llanero Spanish • Vibrant conversational warmth',
    region: 'south_america'
  },
  {
    id: 'costa_rica',
    type: 'country',
    numericId: '188',
    name_es: 'Costa Rica',
    name_en: 'Costa Rica',
    flag: '🇨🇷',
    capital: 'San José',
    lat: 9.9281,
    lng: -84.0907,
    population: '5.2M',
    spanishPercent: '99% Spoken',
    greeting: '¡Pura Vida! Excelente día.',
    dialectNote: 'Friendly "Pura Vida" cadence • Soft rhotic "r" • Politeness markers',
    region: 'north_central'
  },
  {
    id: 'panama',
    type: 'country',
    numericId: '591',
    name_es: 'Panamá',
    name_en: 'Panama',
    flag: '🇵🇦',
    capital: 'Ciudad de Panamá',
    lat: 8.9824,
    lng: -79.5199,
    population: '4.4M',
    spanishPercent: '93% Spoken',
    greeting: '¡Qué xopa! Bienvenidos.',
    dialectNote: 'Isthmian Caribbean Spanish • Global maritime linguistic fusion',
    region: 'north_central'
  },
  {
    id: 'uruguay',
    type: 'country',
    numericId: '858',
    name_es: 'Uruguay',
    name_en: 'Uruguay',
    flag: '🇺🇾',
    capital: 'Montevideo',
    lat: -34.9011,
    lng: -56.1645,
    population: '3.5M',
    spanishPercent: '99% Spoken',
    greeting: '¡Bo, qué tal! ¿Tomamos un mate?',
    dialectNote: 'Rioplatense cousin • Voseo tuteante • Reflective conversational tempo',
    region: 'south_america'
  },
  {
    id: 'paraguay',
    type: 'country',
    numericId: '600',
    name_es: 'Paraguay',
    name_en: 'Paraguay',
    flag: '🇵🇾',
    capital: 'Asunción',
    lat: -25.2637,
    lng: -57.5759,
    population: '7.4M',
    spanishPercent: '90% Bilingual (Castellano Jopará)',
    greeting: '¡Mba\'éichapa! Saludos cordiales.',
    dialectNote: 'Constitutional bilingualism (Guaraní + Castellano Jopará)',
    region: 'south_america'
  },
  {
    id: 'honduras',
    type: 'country',
    numericId: '340',
    name_es: 'Honduras',
    name_en: 'Honduras',
    flag: '🇭🇳',
    capital: 'Tegucigalpa',
    lat: 14.0723,
    lng: -87.1921,
    population: '10.4M',
    spanishPercent: '98% Spoken',
    greeting: '¡Hola catracho! Qué alegría verte.',
    dialectNote: 'Central American Spanish • Familiar voseo • Rich folkloric idioms',
    region: 'north_central'
  },
  {
    id: 'el_salvador',
    type: 'country',
    numericId: '222',
    name_es: 'El Salvador',
    name_en: 'El Salvador',
    flag: '🇸🇻',
    capital: 'San Salvador',
    lat: 13.6929,
    lng: -89.2182,
    population: '6.4M',
    spanishPercent: '99% Spoken',
    greeting: '¡Qué chivo! Bienvenidos amigos.',
    dialectNote: 'Central American Spanish • Energetic cadence • Pipil linguistic substrate',
    region: 'north_central'
  },
  {
    id: 'nicaragua',
    type: 'country',
    numericId: '558',
    name_es: 'Nicaragua',
    name_en: 'Nicaragua',
    flag: '🇳🇮',
    capital: 'Managua',
    lat: 12.1149,
    lng: -86.2362,
    population: '6.9M',
    spanishPercent: '97% Spoken',
    greeting: '¡Buenas tardes! Qué tuani tenerte.',
    dialectNote: 'Central American Spanish • Poetic tradition • Seseo',
    region: 'north_central'
  },
  {
    id: 'equatorial_guinea',
    type: 'country',
    numericId: '226',
    name_es: 'Guinea Ecuatorial',
    name_en: 'Equatorial Guinea',
    flag: '🇬🇶',
    capital: 'Malabo',
    lat: 3.7504,
    lng: 8.7371,
    population: '1.6M',
    spanishPercent: '87.7% Spoken (Official)',
    greeting: '¡Hola a todos! Bienvenidos a Malabo.',
    dialectNote: 'Africa\'s only official Spanish-speaking nation • Elegant Peninsular cadence',
    region: 'africa'
  }
];

// US States with exact Spanish-spoken percentages and capitals from the US National Census
export const US_SPANISH_STATES: SpanishTerritoryData[] = [
  {
    id: 'us_tx',
    type: 'us_state',
    stateCode: 'TX',
    numericId: '48',
    name_es: 'Texas',
    name_en: 'Texas',
    flag: '🇺🇸',
    capital: 'Austin',
    lat: 30.2672,
    lng: -97.7431,
    population: '30M (8.8M+ Spanish Spoken)',
    spanishPercent: '29.4%',
    isAboveTenPercent: true,
    greeting: '¡Hola Texas! Bienvenidos al estado de la estrella solitaria.',
    dialectNote: '29.4% Spanish Spoken (Census) • Rich Tejano cultural heritage & bilingual cities (San Antonio, El Paso, Houston)',
    region: 'us_states',
    isMajorHub: true
  },
  {
    id: 'us_ca',
    type: 'us_state',
    stateCode: 'CA',
    numericId: '06',
    name_es: 'California',
    name_en: 'California',
    flag: '🇺🇸',
    capital: 'Sacramento',
    lat: 38.5816,
    lng: -121.4944,
    population: '39M (11M+ Spanish Spoken)',
    spanishPercent: '28.7%',
    isAboveTenPercent: true,
    greeting: '¡Hola California! Qué gusto tenerte por aquí.',
    dialectNote: '28.7% Spanish Spoken (Census) • Major bilingual creative, tech, and cultural epicenter (Los Angeles, San Diego, SF)',
    region: 'us_states',
    isMajorHub: true
  },
  {
    id: 'us_nm',
    type: 'us_state',
    stateCode: 'NM',
    numericId: '35',
    name_es: 'Nuevo México',
    name_en: 'New Mexico',
    flag: '🇺🇸',
    capital: 'Santa Fe',
    lat: 35.6870,
    lng: -105.9378,
    population: '2.1M (600k+ Spanish Spoken)',
    spanishPercent: '28.6%',
    isAboveTenPercent: true,
    greeting: '¡Bienvenidos a la Tierra del Encanto!',
    dialectNote: '28.6% Spanish Spoken (Census) • Traditional Neomexicano Spanish spoken since 1598 with archaic Golden Age phrasing',
    region: 'us_states',
    isMajorHub: true
  },
  {
    id: 'us_az',
    type: 'us_state',
    stateCode: 'AZ',
    numericId: '04',
    name_es: 'Arizona',
    name_en: 'Arizona',
    flag: '🇺🇸',
    capital: 'Phoenix',
    lat: 33.4484,
    lng: -112.0740,
    population: '7.4M (1.5M+ Spanish Spoken)',
    spanishPercent: '20.4%',
    isAboveTenPercent: true,
    greeting: '¡Hola desde Arizona! Saludos a todos.',
    dialectNote: '20.4% Spanish Spoken (Census) • Sonoran and Borderland Spanish synergy across Phoenix, Tucson, and Yuma',
    region: 'us_states',
    isMajorHub: true
  },
  {
    id: 'us_nv',
    type: 'us_state',
    stateCode: 'NV',
    numericId: '32',
    name_es: 'Nevada',
    name_en: 'Nevada',
    flag: '🇺🇸',
    capital: 'Carson City',
    lat: 39.1638,
    lng: -119.7674,
    population: '3.1M (630k+ Spanish Spoken)',
    spanishPercent: '20.3%',
    isAboveTenPercent: true,
    greeting: '¡Hola Nevada! Bienvenidos al estado plateado.',
    dialectNote: '20.3% Spanish Spoken (Census) • Vibrant international Hispanic workforce in hospitality, arts, and culinary industries (Las Vegas, Reno)',
    region: 'us_states'
  },
  {
    id: 'us_fl',
    type: 'us_state',
    stateCode: 'FL',
    numericId: '12',
    name_es: 'Florida',
    name_en: 'Florida',
    flag: '🇺🇸',
    capital: 'Tallahassee',
    lat: 30.4383,
    lng: -84.2807,
    population: '22M (4.5M+ Spanish Spoken)',
    spanishPercent: '20.2%',
    isAboveTenPercent: true,
    greeting: '¡Oye mi gente de Florida! Un abrazo grande.',
    dialectNote: '20.2% Spanish Spoken (Census) • Gateway to Latin America (Miami 70%+ bilingual, Orlando, Tampa) with Cuban, Puerto Rican, & South American blend',
    region: 'us_states',
    isMajorHub: true
  },
  {
    id: 'us_nj',
    type: 'us_state',
    stateCode: 'NJ',
    numericId: '34',
    name_es: 'Nueva Jersey',
    name_en: 'New Jersey',
    flag: '🇺🇸',
    capital: 'Trenton',
    lat: 40.2206,
    lng: -74.7597,
    population: '9.2M (1.4M+ Spanish Spoken)',
    spanishPercent: '15.4%',
    isAboveTenPercent: true,
    greeting: '¡Hola Nueva Jersey! Encantados de saludarte.',
    dialectNote: '15.4% Spanish Spoken (Census) • Dense multicultural Latino communities across Jersey City, Newark, Paterson, and Union City',
    region: 'us_states'
  },
  {
    id: 'us_ny',
    type: 'us_state',
    stateCode: 'NY',
    numericId: '36',
    name_es: 'Nueva York',
    name_en: 'New York',
    flag: '🇺🇸',
    capital: 'Albany',
    lat: 42.6526,
    lng: -73.7562,
    population: '19.8M (2.9M+ Spanish Spoken)',
    spanishPercent: '14.7%',
    isAboveTenPercent: true,
    greeting: '¡Qué hubo Nueva York! La gran manzana bilingüe.',
    dialectNote: '14.7% Spanish Spoken (Census) • World capital of Caribbean & Pan-Latin Spanish (NYC Washington Heights, Queens, Bronx)',
    region: 'us_states',
    isMajorHub: true
  },
  {
    id: 'us_il',
    type: 'us_state',
    stateCode: 'IL',
    numericId: '17',
    name_es: 'Illinois',
    name_en: 'Illinois',
    flag: '🇺🇸',
    capital: 'Springfield',
    lat: 39.7817,
    lng: -89.6501,
    population: '12.6M (1.6M+ Spanish Spoken)',
    spanishPercent: '13.0%',
    isAboveTenPercent: true,
    greeting: '¡Saludos desde Illinois y la ciudad de los vientos!',
    dialectNote: '13.0% Spanish Spoken (Census) • Deep-rooted Mexican & Puerto Rican communities in Chicago (Pilsen, Little Village, Humboldt Park)',
    region: 'us_states'
  },
  {
    id: 'us_co',
    type: 'us_state',
    stateCode: 'CO',
    numericId: '08',
    name_es: 'Colorado',
    name_en: 'Colorado',
    flag: '🇺🇸',
    capital: 'Denver',
    lat: 39.7392,
    lng: -104.9903,
    population: '5.8M (680k+ Spanish Spoken)',
    spanishPercent: '11.8%',
    isAboveTenPercent: true,
    greeting: '¡Hola Colorado! Bienvenidos a las montañas rocosas.',
    dialectNote: '11.8% Spanish Spoken (Census) • Historic Spanish settlement in the San Luis Valley and thriving Denver metro community',
    region: 'us_states'
  },
  {
    id: 'us_ri',
    type: 'us_state',
    stateCode: 'RI',
    numericId: '44',
    name_es: 'Rhode Island',
    name_en: 'Rhode Island',
    flag: '🇺🇸',
    capital: 'Providence',
    lat: 41.8240,
    lng: -71.4128,
    population: '1.1M (120k+ Spanish Spoken)',
    spanishPercent: '11.0%',
    isAboveTenPercent: true,
    greeting: '¡Hola Rhode Island! Qué gusto compartir.',
    dialectNote: '11.0% Spanish Spoken (Census) • Significant Dominican, Colombian, and Guatemalan communities in Providence & Central Falls',
    region: 'us_states'
  },
  {
    id: 'us_ct',
    type: 'us_state',
    stateCode: 'CT',
    numericId: '09',
    name_es: 'Connecticut',
    name_en: 'Connecticut',
    flag: '🇺🇸',
    capital: 'Hartford',
    lat: 41.7658,
    lng: -72.6734,
    population: '3.6M (390k+ Spanish Spoken)',
    spanishPercent: '10.9%',
    isAboveTenPercent: true,
    greeting: '¡Hola Connecticut! Un gran saludo a todos.',
    dialectNote: '10.9% Spanish Spoken (Census) • Prominent Puerto Rican and South American heritage in Hartford, Bridgeport, and New Haven',
    region: 'us_states'
  },
  {
    id: 'us_ut',
    type: 'us_state',
    stateCode: 'UT',
    numericId: '49',
    name_es: 'Utah',
    name_en: 'Utah',
    flag: '🇺🇸',
    capital: 'Salt Lake City',
    lat: 40.7608,
    lng: -111.8910,
    population: '3.3M',
    spanishPercent: '8.9%',
    isAboveTenPercent: false,
    greeting: '¡Hola Utah! Saludos cordiales.',
    dialectNote: '8.9% Spanish Spoken (Census) • Rapidly growing bilingual community in Salt Lake County',
    region: 'us_states'
  },
  {
    id: 'us_or',
    type: 'us_state',
    stateCode: 'OR',
    numericId: '41',
    name_es: 'Oregón',
    name_en: 'Oregon',
    flag: '🇺🇸',
    capital: 'Salem',
    lat: 44.9429,
    lng: -123.0351,
    population: '4.2M',
    spanishPercent: '8.9%',
    isAboveTenPercent: false,
    greeting: '¡Hola Oregón! Saludos desde el Pacífico.',
    dialectNote: '8.9% Spanish Spoken (Census) • Agricultural & urban Hispanic communities across Willamette Valley and Portland',
    region: 'us_states'
  },
  {
    id: 'us_wa',
    type: 'us_state',
    stateCode: 'WA',
    numericId: '53',
    name_es: 'Washington',
    name_en: 'Washington',
    flag: '🇺🇸',
    capital: 'Olympia',
    lat: 47.0379,
    lng: -122.9007,
    population: '7.8M',
    spanishPercent: '8.9%',
    isAboveTenPercent: false,
    greeting: '¡Hola Washington! Saludos desde el noroeste.',
    dialectNote: '8.9% Spanish Spoken (Census) • Dynamic bilingual agricultural centers in Yakima Valley & Seattle metro',
    region: 'us_states'
  },
  {
    id: 'us_ma',
    type: 'us_state',
    stateCode: 'MA',
    numericId: '25',
    name_es: 'Massachusetts',
    name_en: 'Massachusetts',
    flag: '🇺🇸',
    capital: 'Boston',
    lat: 42.3601,
    lng: -71.0589,
    population: '7.0M',
    spanishPercent: '9.0%',
    isAboveTenPercent: false,
    greeting: '¡Hola Massachusetts! Saludos a la comunidad.',
    dialectNote: '9.0% Spanish Spoken (Census) • Significant Dominican, Puerto Rican, and Central American presence in Boston and Lawrence',
    region: 'us_states'
  }
];

// Map lookup numeric ID -> Country data
const HISPANO_LOOKUP: Record<string, SpanishTerritoryData> = {};
HISPANOSPHERE_COUNTRIES.forEach(c => {
  if (c.numericId) {
    HISPANO_LOOKUP[c.numericId] = c;
    HISPANO_LOOKUP[String(parseInt(c.numericId, 10))] = c;
  }
});

// Map lookup US state numeric FIPS ID -> US State data
const US_STATE_LOOKUP: Record<string, SpanishTerritoryData> = {};
US_SPANISH_STATES.forEach(s => {
  if (s.numericId) {
    US_STATE_LOOKUP[s.numericId] = s;
    US_STATE_LOOKUP[String(parseInt(s.numericId, 10))] = s;
  }
});

interface HispanosphereGlobeProps {
  onSelectTerritory?: (territory: SpanishTerritoryData) => void;
  className?: string;
}

export const HispanosphereGlobe: React.FC<HispanosphereGlobeProps> = ({
  onSelectTerritory,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [hoveredTerritory, setHoveredTerritory] = useState<SpanishTerritoryData | null>(null);
  const [selectedTerritory, setSelectedTerritory] = useState<SpanishTerritoryData | null>(
    HISPANOSPHERE_COUNTRIES[0]
  );
  const [currentRegionFilter, setCurrentRegionFilter] = useState<string>('all');
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [zoomDisplay, setZoomDisplay] = useState<number>(1.0);

  // Synchronized refs for smooth 60fps loop without canvas resets
  const isRotatingRef = useRef<boolean>(true);
  const rotationRef = useRef<[number, number, number]>([65, -15, 0]);
  const targetRotationRef = useRef<[number, number, number]>([65, -15, 0]);
  const zoomRef = useRef<number>(1.0);
  const targetZoomRef = useRef<number>(1.0);
  const hoveredTerritoryRef = useRef<SpanishTerritoryData | null>(null);
  const selectedTerritoryRef = useRef<SpanishTerritoryData | null>(HISPANOSPHERE_COUNTRIES[0]);
  const onSelectTerritoryRef = useRef(onSelectTerritory);

  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchStartDistRef = useRef<number | null>(null);
  const initialTouchScaleRef = useRef<number>(1);
  const animFrameIdRef = useRef<number | null>(null);

  // Synchronize state with refs
  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  useEffect(() => {
    hoveredTerritoryRef.current = hoveredTerritory;
  }, [hoveredTerritory]);

  useEffect(() => {
    selectedTerritoryRef.current = selectedTerritory;
  }, [selectedTerritory]);

  useEffect(() => {
    onSelectTerritoryRef.current = onSelectTerritory;
  }, [onSelectTerritory]);

  // Parse TopoJSON Geo-Features once (World Countries + US States)
  const geoData = useMemo(() => {
    // @ts-ignore
    const worldObj = countriesData as any;
    // @ts-ignore
    const usObj = usStatesData as any;

    const countries = topojson.feature(worldObj, worldObj.objects.countries) as any;
    const usStates = topojson.feature(usObj, usObj.objects.states) as any;
    const graticule = d3.geoGraticule10();

    // Categorize features into Hispanosphere vs US States vs Others
    const hispanoFeatures: any[] = [];
    const otherFeatures: any[] = [];

    countries.features.forEach((feature: any) => {
      const idStr = String(feature.id);
      // Skip US national polygon since we render accurate US states instead
      if (idStr === '840' || idStr === 'us') return;

      if (HISPANO_LOOKUP[idStr]) {
        hispanoFeatures.push({ ...feature, territoryData: HISPANO_LOOKUP[idStr] });
      } else {
        otherFeatures.push(feature);
      }
    });

    // Process US States
    const usStateFeatures: any[] = [];
    usStates.features.forEach((feature: any) => {
      const idStr = String(feature.id);
      const matched = US_STATE_LOOKUP[idStr] || US_STATE_LOOKUP[String(parseInt(idStr, 10))];
      if (matched) {
        usStateFeatures.push({ ...feature, territoryData: matched });
      } else {
        // Other US states (less than 10% or non-cataloged)
        usStateFeatures.push({
          ...feature,
          territoryData: {
            id: `us_${feature.id}`,
            type: 'us_state',
            numericId: idStr,
            name_es: feature.properties?.name || 'Estado de EE.UU.',
            name_en: feature.properties?.name || 'US State',
            flag: '🇺🇸',
            capital: 'State Capital',
            lat: 38,
            lng: -97,
            spanishPercent: '< 10%',
            isAboveTenPercent: false,
            greeting: '¡Hola desde Estados Unidos!',
            dialectNote: 'Spoken Spanish under 10% (US National Census)',
            region: 'us_states'
          } as SpanishTerritoryData
        });
      }
    });

    return { countries, usStates, graticule, hispanoFeatures, usStateFeatures, otherFeatures };
  }, []);

  // Center camera on territory coordinates
  const focusOnTerritory = useCallback((territory: SpanishTerritoryData, customZoom?: number) => {
    soundEffects.playPop();
    setSelectedTerritory(territory);
    selectedTerritoryRef.current = territory;
    onSelectTerritoryRef.current?.(territory);

    // Target yaw = -longitude, pitch = -latitude
    targetRotationRef.current = [-territory.lng, -territory.lat, 0];
    if (customZoom !== undefined) {
      targetZoomRef.current = customZoom;
      setZoomDisplay(customZoom);
    }
  }, []);

  // Focus region
  const focusRegion = (regionKey: string) => {
    soundEffects.playPop();
    setCurrentRegionFilter(regionKey);

    if (regionKey === 'us_states') {
      const texas = US_SPANISH_STATES.find(s => s.id === 'us_tx');
      if (texas) focusOnTerritory(texas, 1.8);
    } else if (regionKey === 'europe') {
      const spain = HISPANOSPHERE_COUNTRIES.find(c => c.id === 'spain');
      if (spain) focusOnTerritory(spain, 1.5);
    } else if (regionKey === 'north_central') {
      const mexico = HISPANOSPHERE_COUNTRIES.find(c => c.id === 'mexico');
      if (mexico) focusOnTerritory(mexico, 1.4);
    } else if (regionKey === 'south_america') {
      const colombia = HISPANOSPHERE_COUNTRIES.find(c => c.id === 'colombia');
      if (colombia) focusOnTerritory(colombia, 1.3);
    } else if (regionKey === 'caribbean') {
      const cuba = HISPANOSPHERE_COUNTRIES.find(c => c.id === 'cuba');
      if (cuba) focusOnTerritory(cuba, 1.7);
    } else {
      // Global overview
      targetRotationRef.current = [65, -15, 0];
      targetZoomRef.current = 1.0;
      setZoomDisplay(1.0);
    }
  };

  // Zoom handler
  const setZoom = (nextZoom: number) => {
    const clamped = Math.min(3.8, Math.max(0.65, nextZoom));
    targetZoomRef.current = clamped;
    setZoomDisplay(clamped);
  };

  // Main rendering loop & D3 Orthographic Projection on Canvas (Mounted ONCE)
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 520;
    let dpr = window.devicePixelRatio || 1;

    const handleCanvasResize = () => {
      if (!canvas || !container) return;
      width = container.clientWidth || 600;
      height = container.clientHeight || 520;
      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleCanvasResize();

    const projection = d3
      .geoOrthographic()
      .translate([width / 2, height / 2])
      .clipAngle(90)
      .precision(0.3);

    const path = d3.geoPath(projection, ctx);

    let lastTime = performance.now();
    let pulsePhase = 0;

    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animFrameIdRef.current) {
        lastTime = performance.now();
        animFrameIdRef.current = requestAnimationFrame(render);
      } else if (!isVisible && animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
    }, { threshold: 0.05 });
    intersectionObserver.observe(container);

    const render = (time: number) => {
      if (!isVisible) {
        animFrameIdRef.current = null;
        return;
      }
      const dt = Math.min(0.1, (time - lastTime) / 1000);
      lastTime = time;
      pulsePhase += dt * 3;

      // Continuous gentle idle spin when not dragging/hovering
      if (isRotatingRef.current && !isDraggingRef.current && !hoveredTerritoryRef.current) {
        targetRotationRef.current[0] += dt * 6.5;
      }

      // Smooth damping lerp for rotation
      rotationRef.current[0] += (targetRotationRef.current[0] - rotationRef.current[0]) * 0.1;
      rotationRef.current[1] += (targetRotationRef.current[1] - rotationRef.current[1]) * 0.1;
      rotationRef.current[2] += (targetRotationRef.current[2] - rotationRef.current[2]) * 0.1;

      // Smooth damping lerp for zoom
      zoomRef.current += (targetZoomRef.current - zoomRef.current) * 0.12;

      const baseRadius = Math.min(width, height) * 0.42;
      const currentRadius = baseRadius * zoomRef.current;

      projection.rotate(rotationRef.current);
      projection.scale(currentRadius);
      projection.translate([width / 2, height / 2]);

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const currentHovered = hoveredTerritoryRef.current;
      const currentSelected = selectedTerritoryRef.current;

      // 1. Outer Atmospheric Glow (Amber & Golden Yellow glow)
      const glowGrad = ctx.createRadialGradient(
        cx,
        cy,
        currentRadius * 0.95,
        cx,
        cy,
        currentRadius * 1.18
      );
      glowGrad.addColorStop(0, 'rgba(245, 158, 11, 0.22)');
      glowGrad.addColorStop(0.4, 'rgba(234, 179, 8, 0.08)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.save();
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, currentRadius * 1.18, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. Ocean Sphere with 3D Radial Specular Shading
      const oceanGrad = ctx.createRadialGradient(
        cx - currentRadius * 0.35,
        cy - currentRadius * 0.35,
        currentRadius * 0.08,
        cx,
        cy,
        currentRadius
      );
      oceanGrad.addColorStop(0, '#151d2a');
      oceanGrad.addColorStop(0.5, '#0b1017');
      oceanGrad.addColorStop(1, '#05070b');

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = oceanGrad;
      ctx.fill();

      // Subtle globe border edge
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      // 3. Latitude and Longitude Graticules
      ctx.save();
      ctx.beginPath();
      path(geoData.graticule);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Draw Equator highlight
      const equator = d3.geoCircle().center([0, 0]).radius(90)();
      ctx.beginPath();
      path(equator);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // 4. Non-Spanish Global Landmasses (Isolated paths to prevent clipping fill artifacts)
      ctx.save();
      ctx.fillStyle = '#1e293b'; // Slate charcoal
      ctx.strokeStyle = '#334155'; // Clean border
      ctx.lineWidth = 0.6;
      for (let i = 0; i < geoData.otherFeatures.length; i++) {
        ctx.beginPath();
        path(geoData.otherFeatures[i]);
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();

      // 5. RENDER US STATES WITH ACCURATE CARTOGRAPHY
      ctx.save();
      for (let i = 0; i < geoData.usStateFeatures.length; i++) {
        const feat = geoData.usStateFeatures[i];
        const territory = feat.territoryData as SpanishTerritoryData;
        const isAboveTen = territory.isAboveTenPercent;
        const isHovered = currentHovered?.id === territory.id;
        const isSelected = currentSelected?.id === territory.id;

        ctx.beginPath();
        path(feat);

        if (isAboveTen) {
          if (isSelected) {
            ctx.fillStyle = '#ca8a04'; // Deep intense yellow-gold
            ctx.shadowColor = '#facc15';
            ctx.shadowBlur = 12;
          } else if (isHovered) {
            ctx.fillStyle = '#fde047'; // Bright electric yellow
            ctx.shadowColor = '#fef08a';
            ctx.shadowBlur = 14;
          } else {
            ctx.fillStyle = '#eab308'; // Warm golden yellow
            ctx.shadowColor = '#eab308';
            ctx.shadowBlur = 5;
          }
          ctx.fill();

          ctx.shadowBlur = 0;
          ctx.strokeStyle = isSelected ? '#ffffff' : '#fef9c3';
          ctx.lineWidth = isSelected ? 1.8 : 1.1;
          ctx.stroke();
        } else {
          // Other US states (< 10%)
          ctx.shadowBlur = 0;
          ctx.fillStyle = isHovered ? '#334155' : '#1e293b';
          ctx.fill();
          ctx.strokeStyle = '#475569';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      ctx.restore();

      // 6. RENDER THE HISPANOSPHERE COUNTRIES IN LUMINOUS ORANGE / AMBER
      ctx.save();
      for (let i = 0; i < geoData.hispanoFeatures.length; i++) {
        const feat = geoData.hispanoFeatures[i];
        const country = feat.territoryData as SpanishTerritoryData;
        const isHovered = currentHovered?.id === country.id;
        const isSelected = currentSelected?.id === country.id;

        ctx.beginPath();
        path(feat);

        if (isSelected) {
          ctx.fillStyle = '#ea580c'; // Deep vibrant orange
          ctx.shadowColor = '#f97316';
          ctx.shadowBlur = 14;
        } else if (isHovered) {
          ctx.fillStyle = '#f59e0b'; // Radiant amber
          ctx.shadowColor = '#fbbf24';
          ctx.shadowBlur = 14;
        } else {
          ctx.fillStyle = '#f59e0b'; // Bold Spanish orange
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 6;
        }
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.strokeStyle = isSelected ? '#ffffff' : '#fef08a';
        ctx.lineWidth = isSelected ? 1.8 : 1.2;
        ctx.stroke();
      }
      ctx.restore();

      // 7. Render Glowing Capital City Beacons & Wave Rings
      const allTerritoriesToPin = [
        ...HISPANOSPHERE_COUNTRIES,
        ...US_SPANISH_STATES.filter(s => s.isAboveTenPercent)
      ];

      allTerritoriesToPin.forEach(territory => {
        const coords = projection([territory.lng, territory.lat]);

        if (coords) {
          const [px, py] = coords;
          const isSelected = currentSelected?.id === territory.id;
          const isHovered = currentHovered?.id === territory.id;
          const isUS = territory.type === 'us_state';

          // Pulsating wave ring
          const wave = ((Math.sin(pulsePhase + (territory.isMajorHub ? 0 : 1.5)) + 1) / 2);
          const ringRadius = (territory.isMajorHub ? 5 : 3.5) + wave * 4;

          ctx.save();
          ctx.beginPath();
          ctx.arc(px, py, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = isUS
            ? 'rgba(250, 204, 21, 0.7)' // Yellow ring for US states
            : 'rgba(254, 240, 138, 0.7)'; // Amber ring for countries
          ctx.lineWidth = 1;
          ctx.stroke();

          // Central solid beacon dot
          ctx.beginPath();
          ctx.arc(px, py, territory.isMajorHub ? 3.2 : 2.2, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = isUS ? '#eab308' : '#f59e0b';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.restore();

          // Draw capital and state label on hover, selected, or when zoomed in
          if (isSelected || isHovered || (zoomRef.current >= 1.5 && territory.isMajorHub)) {
            ctx.save();
            ctx.font = 'bold 10px system-ui, sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#000000';
            ctx.shadowBlur = 5;

            const label = isUS
              ? `${territory.stateCode}: ${territory.capital} (${territory.spanishPercent})`
              : `${territory.flag} ${territory.capital}`;

            ctx.fillText(label, px + 6, py - 4);
            ctx.restore();
          }
        }
      });

      // 8. Glassy Specular Overlay Rim
      ctx.save();
      const specularGrad = ctx.createLinearGradient(
        cx - currentRadius,
        cy - currentRadius,
        cx + currentRadius,
        cy + currentRadius
      );
      specularGrad.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
      specularGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0)');
      specularGrad.addColorStop(0.8, 'rgba(0, 0, 0, 0.35)');
      specularGrad.addColorStop(1, 'rgba(0, 0, 0, 0.7)');

      ctx.beginPath();
      ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = specularGrad;
      ctx.fill();
      ctx.restore();

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    // Mouse Wheel Zoom In / Out Listener
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
      const nextZoom = Math.min(3.8, Math.max(0.65, targetZoomRef.current * zoomFactor));
      targetZoomRef.current = nextZoom;
      setZoomDisplay(nextZoom);
    };

    // Mouse & Touch Drag and Raycasting
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (isDraggingRef.current) {
        const dx = e.clientX - lastMousePosRef.current.x;
        const dy = e.clientY - lastMousePosRef.current.y;

        // Invert sensitivity proportional to projection scale
        const sens = 0.35 / (zoomRef.current || 1);
        targetRotationRef.current[0] += dx * sens;
        targetRotationRef.current[1] = Math.max(
          -85,
          Math.min(85, targetRotationRef.current[1] - dy * sens)
        );

        lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      } else {
        const cx = width / 2;
        const cy = height / 2;
        const currentRadius = (Math.min(width, height) * 0.42) * zoomRef.current;

        // Fast boundary check: if cursor is outside globe circle, immediately clear hover
        if (Math.hypot(mouseX - cx, mouseY - cy) > currentRadius) {
          if (hoveredTerritoryRef.current !== null) {
            hoveredTerritoryRef.current = null;
            setHoveredTerritory(null);
            setTooltipPos(null);
            canvas.style.cursor = 'grab';
          }
          return;
        }

        // Accurate Geo-detection: Invert mouse coordinates on the 3D globe to [lng, lat]
        const inverted = projection.invert([mouseX, mouseY]);

        if (inverted) {
          const [lng, lat] = inverted;
          let foundTerritory: SpanishTerritoryData | null = null;

          // 1. Check beacon pins first (quickest)
          const allPins = [
            ...HISPANOSPHERE_COUNTRIES,
            ...US_SPANISH_STATES.filter(s => s.isAboveTenPercent)
          ];
          for (let i = 0; i < allPins.length; i++) {
            const item = allPins[i];
            const pt = projection([item.lng, item.lat]);
            if (pt && Math.hypot(pt[0] - mouseX, pt[1] - mouseY) < 14) {
              foundTerritory = item;
              break;
            }
          }

          // 2. Check US State Polygons
          if (!foundTerritory) {
            for (let i = 0; i < geoData.usStateFeatures.length; i++) {
              const feat = geoData.usStateFeatures[i];
              if (d3.geoContains(feat, [lng, lat])) {
                foundTerritory = feat.territoryData;
                break;
              }
            }
          }

          // 3. Check Hispanosphere Countries
          if (!foundTerritory) {
            for (let i = 0; i < geoData.hispanoFeatures.length; i++) {
              const feat = geoData.hispanoFeatures[i];
              if (d3.geoContains(feat, [lng, lat])) {
                foundTerritory = feat.territoryData;
                break;
              }
            }
          }

          // Only trigger React state update if the hovered territory reference actually changes
          if (foundTerritory?.id !== hoveredTerritoryRef.current?.id) {
            hoveredTerritoryRef.current = foundTerritory;
            setHoveredTerritory(foundTerritory);
            if (foundTerritory) {
              setTooltipPos({ x: mouseX, y: mouseY });
              canvas.style.cursor = 'pointer';
            } else {
              setTooltipPos(null);
              canvas.style.cursor = 'grab';
            }
          } else if (foundTerritory) {
            // Just update tooltip coordinates
            setTooltipPos({ x: mouseX, y: mouseY });
          }
          return;
        }

        if (hoveredTerritoryRef.current !== null) {
          hoveredTerritoryRef.current = null;
          setHoveredTerritory(null);
          setTooltipPos(null);
          canvas.style.cursor = 'grab';
        }
      }
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const inverted = projection.invert([mouseX, mouseY]);

      if (inverted) {
        const [lng, lat] = inverted;

        // Check beacon pins
        const allPins = [
          ...HISPANOSPHERE_COUNTRIES,
          ...US_SPANISH_STATES.filter(s => s.isAboveTenPercent)
        ];
        for (let i = 0; i < allPins.length; i++) {
          const item = allPins[i];
          const pt = projection([item.lng, item.lat]);
          if (pt && Math.hypot(pt[0] - mouseX, pt[1] - mouseY) < 16) {
            focusOnTerritory(item);
            return;
          }
        }

        // Check US State Polygons
        for (let i = 0; i < geoData.usStateFeatures.length; i++) {
          const feat = geoData.usStateFeatures[i];
          if (d3.geoContains(feat, [lng, lat])) {
            focusOnTerritory(feat.territoryData);
            return;
          }
        }

        // Check Hispanosphere Countries
        for (let i = 0; i < geoData.hispanoFeatures.length; i++) {
          const feat = geoData.hispanoFeatures[i];
          if (d3.geoContains(feat, [lng, lat])) {
            focusOnTerritory(feat.territoryData);
            return;
          }
        }
      }
    };

    // Touch events for mobile pinch-to-zoom and drag
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        lastMousePosRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      } else if (e.touches.length === 2) {
        // Pinch zoom start
        isDraggingRef.current = false;
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        touchStartDistRef.current = dist;
        initialTouchScaleRef.current = targetZoomRef.current;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDraggingRef.current) {
        const dx = e.touches[0].clientX - lastMousePosRef.current.x;
        const dy = e.touches[0].clientY - lastMousePosRef.current.y;
        const sens = 0.4 / (zoomRef.current || 1);

        targetRotationRef.current[0] += dx * sens;
        targetRotationRef.current[1] = Math.max(
          -85,
          Math.min(85, targetRotationRef.current[1] - dy * sens)
        );

        lastMousePosRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      } else if (e.touches.length === 2 && touchStartDistRef.current !== null) {
        // Pinch zoom
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const ratio = dist / touchStartDistRef.current;
        const nextZoom = Math.min(3.8, Math.max(0.65, initialTouchScaleRef.current * ratio));
        targetZoomRef.current = nextZoom;
        setZoomDisplay(nextZoom);
      }
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
      touchStartDistRef.current = null;
    };

    canvas.addEventListener('wheel', onWheel, { passive: false });
    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('click', onClick);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          handleCanvasResize();
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      canvas.removeEventListener('wheel', onWheel);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('click', onClick);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [geoData, focusOnTerritory]);

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Top Navigation & Region Filter Bar */}
      <div className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-stone-900/95 backdrop-blur-md rounded-2xl border border-stone-800 text-xs mb-3 shadow-xl z-20 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse shadow-sm shadow-orange-500" />
          <span className="font-black text-xs text-orange-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
            <Globe className="w-3.5 h-3.5" /> 3D Hispanosphere & US States
          </span>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
          {[
            { id: 'all', label: 'Global', icon: null },
            { id: 'us_states', label: 'US States (>10%)', flagCode: 'tx' },
            { id: 'europe', label: 'Spain & Europe', flagCode: 'es' },
            { id: 'north_central', label: 'Mexico & Central', flagCode: 'mx' },
            { id: 'south_america', label: 'South America', flagCode: 'co' },
            { id: 'caribbean', label: 'Caribbean', flagCode: 'cu' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => focusRegion(btn.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                currentRegionFilter === btn.id
                  ? btn.id === 'us_states'
                    ? 'bg-yellow-400 text-stone-950 shadow-md font-black'
                    : 'bg-orange-500 text-stone-950 shadow-md font-black'
                  : 'bg-stone-800/90 hover:bg-stone-700 text-stone-300'
              }`}
            >
              {btn.flagCode && <FlagIcon code={btn.flagCode} size="sm" />}
              {btn.label}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => {
              soundEffects.playPop();
              setIsRotating(!isRotating);
            }}
            title={isRotating ? 'Pause Spin' : 'Resume Spin'}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
          >
            {isRotating ? (
              <Pause className="w-3.5 h-3.5 text-orange-400" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
          </button>
          <button
            onClick={() => focusRegion('all')}
            title="Reset Angle & Zoom"
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[450px] sm:h-[540px] rounded-3xl bg-[#070a0f] border border-stone-800/90 overflow-hidden shadow-2xl flex items-center justify-center group"
      >
        {/* Subtle background radial ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,88,12,0.06),transparent_70%)] pointer-events-none" />

        {/* Top Info Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 pointer-events-none z-10">
          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-stone-300 bg-stone-900/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-800 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
            <span>21 Spanish Nations (Orange)</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-yellow-300 bg-yellow-950/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-yellow-500/30 shadow-md">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
            <span>US States &gt;10% Spanish Spoken (Yellow)</span>
          </div>
        </div>

        {/* Floating Zoom & Controls Widget (Top Right) */}
        <div className="absolute top-4 right-4 z-20 flex flex-col items-center gap-2 bg-stone-950/90 backdrop-blur-md p-2 rounded-2xl border border-stone-800 shadow-2xl">
          <button
            onClick={() => {
              soundEffects.playPop();
              setZoom(zoomRef.current * 1.25);
            }}
            title="Zoom In (or Scroll Up)"
            className="p-2 rounded-xl bg-stone-800 hover:bg-orange-500 hover:text-stone-950 text-stone-200 transition-all cursor-pointer shadow"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Interactive Zoom Level Display & Range Slider */}
          <div className="flex flex-col items-center gap-1 px-1 py-1 text-center">
            <span className="text-[10px] font-black font-mono text-orange-400">
              {Math.round(zoomDisplay * 100)}%
            </span>
            <input
              type="range"
              min="65"
              max="350"
              value={Math.round(zoomDisplay * 100)}
              onChange={e => setZoom(Number(e.target.value) / 100)}
              className="h-16 w-1.5 accent-orange-500 bg-stone-800 rounded-lg appearance-none cursor-pointer [writing-mode:vertical-lr] [direction:rtl]"
              title="Drag to zoom"
            />
          </div>

          <button
            onClick={() => {
              soundEffects.playPop();
              setZoom(zoomRef.current * 0.8);
            }}
            title="Zoom Out (or Scroll Down)"
            className="p-2 rounded-xl bg-stone-800 hover:bg-orange-500 hover:text-stone-950 text-stone-200 transition-all cursor-pointer shadow"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>

        {/* HTML5 High-DPI Orthographic Canvas */}
        <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing block" />

        {/* Hover Micro-Tooltip */}
        <AnimatePresence>
          {hoveredTerritory && tooltipPos && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.15 }}
              style={{
                left: Math.min(
                  tooltipPos.x + 14,
                  (containerRef.current?.clientWidth || 500) - 240
                ),
                top: Math.max(12, tooltipPos.y - 110)
              }}
              className={`absolute z-30 pointer-events-none bg-stone-950/95 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl text-left w-60 space-y-1.5 border ${
                hoveredTerritory.type === 'us_state'
                  ? hoveredTerritory.isAboveTenPercent
                    ? 'border-yellow-400/70 shadow-yellow-500/10'
                    : 'border-stone-700'
                  : 'border-orange-500/70 shadow-orange-500/10'
              }`}
            >
              <div className="flex items-center justify-between border-b border-stone-800 pb-1.5">
                <span className="text-base flex items-center gap-2 font-bold text-white">
                  <FlagIcon
                    code={hoveredTerritory.stateCode ? hoveredTerritory.stateCode.toLowerCase() : hoveredTerritory.id}
                    size="sm"
                  />
                  <span className="text-xs font-black">
                    {hoveredTerritory.name_es}{' '}
                    {hoveredTerritory.stateCode ? `(${hoveredTerritory.stateCode})` : ''}
                  </span>
                </span>
                <span
                  className={`text-[9px] font-extrabold px-2 py-0.5 rounded font-mono ${
                    hoveredTerritory.type === 'us_state'
                      ? 'bg-yellow-400 text-stone-950'
                      : 'bg-orange-500 text-stone-950'
                  }`}
                >
                  {hoveredTerritory.capital}
                </span>
              </div>

              {/* Spanish percentage highlight badge */}
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-stone-400 text-[10px]">Spanish Spoken:</span>
                <span
                  className={`font-mono font-black ${
                    hoveredTerritory.type === 'us_state'
                      ? hoveredTerritory.isAboveTenPercent
                        ? 'text-yellow-400'
                        : 'text-stone-400'
                      : 'text-orange-400'
                  }`}
                >
                  {hoveredTerritory.spanishPercent}
                </span>
              </div>

              <p className="text-[11px] text-stone-300 font-medium italic font-serif line-clamp-2">
                &quot;{hoveredTerritory.greeting}&quot;
              </p>

              <div className="flex items-center justify-between text-[9px] text-stone-400 pt-0.5 font-mono">
                <span>{hoveredTerritory.population || 'US Census Data'}</span>
                <span className="text-orange-400 font-bold">Click to center</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Visual Map Legend (Bottom Left) */}
        <div className="absolute bottom-3 left-3 bg-stone-950/90 backdrop-blur-md border border-stone-800 px-3.5 py-2 rounded-xl text-[10px] text-stone-300 flex items-center gap-3.5 pointer-events-none hidden sm:flex shadow-lg">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-orange-500 shadow-sm shadow-orange-500/60" />
            <span className="font-bold text-stone-100">Hispanosphere (Orange)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm shadow-yellow-500/60" />
            <span className="font-bold text-yellow-300">US States &gt;10% (Yellow)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-700 border border-stone-600" />
            <span className="text-stone-400">Other Territories</span>
          </span>
        </div>

        {/* Zoom & Drag Instruction Hint (Bottom Right) */}
        <div className="absolute bottom-3 right-3 bg-stone-950/90 backdrop-blur-md border border-stone-800 px-3 py-1.5 rounded-xl text-[10px] text-stone-400 font-medium pointer-events-none flex items-center gap-2">
          <span>🔍 Scroll wheel or pinch to zoom</span>
          <span>•</span>
          <span>👆 Drag to rotate</span>
        </div>
      </div>

      {/* Selected Territory Spotlight Card (Below Globe) */}
      {selectedTerritory && (
        <motion.div
          key={selectedTerritory.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`w-full mt-4 bg-white dark:bg-stone-900 rounded-3xl p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border ${
            selectedTerritory.type === 'us_state'
              ? selectedTerritory.isAboveTenPercent
                ? 'border-yellow-500/40 dark:border-yellow-500/30 bg-gradient-to-r from-yellow-500/5 via-transparent to-transparent'
                : 'border-stone-200 dark:border-stone-800'
              : 'border-orange-500/40 dark:border-orange-500/30 bg-gradient-to-r from-orange-500/5 via-transparent to-transparent'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`w-14 h-11 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 shadow-sm border p-1 ${
                selectedTerritory.type === 'us_state'
                  ? 'bg-yellow-500/10 border-yellow-500/30'
                  : 'bg-orange-500/10 border-orange-500/30'
              }`}
            >
              <FlagIcon
                code={selectedTerritory.stateCode ? selectedTerritory.stateCode.toLowerCase() : selectedTerritory.id}
                size="lg"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-black text-stone-900 dark:text-white">
                  {selectedTerritory.name_es} ({selectedTerritory.name_en})
                  {selectedTerritory.stateCode ? ` • ${selectedTerritory.stateCode}` : ''}
                </h3>
                <span
                  className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full font-mono ${
                    selectedTerritory.type === 'us_state'
                      ? 'bg-yellow-400 text-stone-950 font-black'
                      : 'bg-orange-500 text-stone-950 font-black'
                  }`}
                >
                  Capital: {selectedTerritory.capital}
                </span>
                <span
                  className={`text-[10px] font-black px-2.5 py-0.5 rounded-full font-mono ${
                    selectedTerritory.type === 'us_state'
                      ? 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border border-yellow-500/30'
                      : 'bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30'
                  }`}
                >
                  Spanish Fluency: {selectedTerritory.spanishPercent}
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
                {selectedTerritory.dialectNote}
              </p>
            </div>
          </div>

          {/* Audio Native Greeting Player */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end bg-stone-50 dark:bg-stone-950 p-3 rounded-2xl border border-stone-200 dark:border-stone-800 shrink-0">
            <div className="space-y-0.5 text-left pr-2">
              <span className="text-[9px] font-black uppercase tracking-wider text-stone-400 block font-mono">
                Regional Greeting
              </span>
              <p className="text-xs font-extrabold text-stone-900 dark:text-stone-100 italic font-serif">
                &quot;{selectedTerritory.greeting}&quot;
              </p>
            </div>
            <button
              onClick={() => {
                soundEffects.playPop();
                speakSpanish(selectedTerritory.greeting);
              }}
              title="Listen to native pronunciation"
              className={`p-2.5 rounded-xl text-stone-950 font-bold transition-transform active:scale-90 shadow-md shrink-0 cursor-pointer flex items-center gap-1.5 text-xs ${
                selectedTerritory.type === 'us_state'
                  ? 'bg-yellow-400 hover:bg-yellow-500 shadow-yellow-500/20'
                  : 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/20'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden sm:inline font-black">Listen</span>
            </button>
          </div>
        </motion.div>
      )}


      {/* Global Hispanosphere Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mt-3">
        {[
          { icon: Users, label: 'Global Native Speakers', value: '500M+ (2nd Worldwide)' },
          { icon: Globe, label: 'Official Nations', value: '21 Sovereign Nations' },
          { icon: Sparkles, label: 'US Spanish Speakers', value: '62M+ (2nd Largest Global)' },
          { icon: Compass, label: 'SLA Immersion', value: '100% Comprehensible Input' }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 p-3.5 rounded-2xl text-center space-y-0.5 shadow-sm"
            >
              <div className="flex items-center justify-center gap-1.5 text-orange-600 dark:text-orange-400">
                <Icon className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono">
                  {stat.label}
                </span>
              </div>
              <p className="text-sm font-black text-stone-900 dark:text-white font-mono">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
