import React from 'react';

export type FlagCode =
  // 21 Sovereign / Official Hispanosphere Nations
  | 'es' | 'spain'
  | 'mx' | 'mexico'
  | 'co' | 'colombia'
  | 'ar' | 'argentina'
  | 'pe' | 'peru'
  | 'cl' | 'chile'
  | 'gt' | 'guatemala'
  | 'cu' | 'cuba'
  | 'do' | 'dominican_republic'
  | 'pr' | 'puerto_rico'
  | 'ec' | 'ecuador'
  | 'bo' | 'bolivia'
  | 've' | 'venezuela'
  | 'cr' | 'costa_rica'
  | 'pa' | 'panama'
  | 'uy' | 'uruguay'
  | 'py' | 'paraguay'
  | 'hn' | 'honduras'
  | 'sv' | 'el_salvador'
  | 'ni' | 'nicaragua'
  | 'gq' | 'equatorial_guinea'
  // US States
  | 'tx' | 'us_tx'
  | 'ca' | 'us_ca'
  | 'nm' | 'us_nm'
  | 'az' | 'us_az'
  | 'nv' | 'us_nv'
  | 'fl' | 'us_fl'
  | 'nj' | 'us_nj'
  | 'ny' | 'us_ny'
  | 'il' | 'us_il'
  | 'co_state' | 'us_co'
  | 'ri' | 'us_ri'
  | 'ct' | 'us_ct'
  | 'us';

interface FlagIconProps {
  code: FlagCode | string;
  className?: string;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
}

export const FlagIcon: React.FC<FlagIconProps> = ({
  code,
  className = '',
  title,
  size = 'md'
}) => {
  const norm = code.toLowerCase().trim();

  // Size mapping presets
  const sizeClasses = {
    sm: 'w-5 h-3.5',
    md: 'w-7 h-5',
    lg: 'w-9 h-6',
    xl: 'w-12 h-8',
    custom: ''
  }[size];

  const defaultTitle = title || norm.toUpperCase();

  const containerClass = `inline-block shrink-0 overflow-hidden rounded-[3px] shadow-[0_1px_3px_rgba(0,0,0,0.25)] border border-black/10 align-middle ${sizeClasses} ${className}`;

  // SVG Renderer per country/state
  const renderSvg = () => {
    switch (norm) {
      // 1. SPAIN
      case 'es':
      case 'spain':
        return (
          <svg viewBox="0 0 750 500" className="w-full h-full object-cover">
            <rect width="750" height="125" fill="#AA151B" />
            <rect y="125" width="750" height="250" fill="#F1BF00" />
            <rect y="375" width="750" height="125" fill="#AA151B" />
            {/* Spanish Coat of Arms Emblem */}
            <g transform="translate(180, 250) scale(0.9)">
              <rect x="-35" y="-55" width="70" height="85" rx="10" fill="#AA151B" stroke="#F1BF00" strokeWidth="4" />
              <rect x="-28" y="-48" width="28" height="38" fill="#AA151B" />
              <rect x="0" y="-48" width="28" height="38" fill="#FFFFFF" />
              <rect x="-28" y="-10" width="28" height="38" fill="#F1BF00" />
              <rect x="0" y="-10" width="28" height="38" fill="#AA151B" />
              {/* Crown */}
              <path d="M-30,-62 L-30,-85 L-15,-70 L0,-90 L15,-70 L30,-85 L30,-62 Z" fill="#F1BF00" stroke="#AA151B" strokeWidth="2" />
              {/* Pillars of Hercules */}
              <rect x="-58" y="-60" width="10" height="90" fill="#F1BF00" />
              <rect x="48" y="-60" width="10" height="90" fill="#F1BF00" />
              <path d="M-65,-10 Q-35,-20 -55,10" fill="none" stroke="#AA151B" strokeWidth="4" />
              <path d="M45,-10 Q75,-20 55,10" fill="none" stroke="#AA151B" strokeWidth="4" />
            </g>
          </svg>
        );

      // 2. MEXICO
      case 'mx':
      case 'mexico':
        return (
          <svg viewBox="0 0 700 400" className="w-full h-full object-cover">
            <rect width="233.3" height="400" fill="#006847" />
            <rect x="233.3" width="233.4" height="400" fill="#FFFFFF" />
            <rect x="466.7" width="233.3" height="400" fill="#CE1126" />
            {/* Mexican Eagle & Serpent on Nopal */}
            <g transform="translate(350, 200) scale(0.65)">
              <ellipse cx="0" cy="50" rx="60" ry="18" fill="#8B5A2B" />
              {/* Nopal Cactus */}
              <path d="M-25,45 Q-20,0 0,10 Q20,0 25,45 Z" fill="#2E7D32" stroke="#1B5E20" strokeWidth="3" />
              {/* Eagle body */}
              <path d="M-20,-10 Q-35,-40 -15,-60 Q0,-70 10,-55 Q25,-40 15,-10 Q-5,10 -20,-10 Z" fill="#795548" />
              <path d="M-15,-60 Q-25,-80 -5,-80 Q10,-75 10,-55 Z" fill="#5D4037" />
              <polygon points="10,-65 25,-60 10,-55" fill="#FFC107" />
              {/* Serpent */}
              <path d="M18,-58 Q40,-45 25,-30 Q10,-15 30,0" fill="none" stroke="#4CAF50" strokeWidth="6" strokeLinecap="round" />
              {/* Laurel and Oak Wreath */}
              <path d="M-60,40 Q-80,-10 -40,-40" fill="none" stroke="#388E3C" strokeWidth="6" strokeLinecap="round" />
              <path d="M60,40 Q80,-10 40,-40" fill="none" stroke="#D32F2F" strokeWidth="6" strokeLinecap="round" />
            </g>
          </svg>
        );

      // 3. COLOMBIA
      case 'co':
      case 'colombia':
        return (
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            <rect width="900" height="300" fill="#FCD116" />
            <rect y="300" width="900" height="150" fill="#003893" />
            <rect y="450" width="900" height="150" fill="#CE1126" />
          </svg>
        );

      // 4. ARGENTINA
      case 'ar':
      case 'argentina':
        return (
          <svg viewBox="0 0 800 500" className="w-full h-full object-cover">
            <rect width="800" height="166.7" fill="#75AADB" />
            <rect y="166.7" width="800" height="166.6" fill="#FFFFFF" />
            <rect y="333.3" width="800" height="166.7" fill="#75AADB" />
            {/* Sun of May (Sol de Mayo) */}
            <g transform="translate(400, 250)">
              <circle r="36" fill="#F6B40E" stroke="#85530E" strokeWidth="2.5" />
              <circle r="18" fill="#F6B40E" />
              {/* Rays */}
              {[...Array(16)].map((_, i) => (
                <g key={i} transform={`rotate(${i * 22.5})`}>
                  <path d="M0,-36 L-4,-62 L0,-70 L4,-62 Z" fill="#F6B40E" stroke="#85530E" strokeWidth="1" />
                </g>
              ))}
              {/* Face Details */}
              <circle cx="-10" cy="-6" r="3.5" fill="#85530E" />
              <circle cx="10" cy="-6" r="3.5" fill="#85530E" />
              <path d="M-12,12 Q0,22 12,12" fill="none" stroke="#85530E" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </svg>
        );

      // 5. PERU
      case 'pe':
      case 'peru':
        return (
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            <rect width="300" height="600" fill="#D91023" />
            <rect x="300" width="300" height="600" fill="#FFFFFF" />
            <rect x="600" width="300" height="600" fill="#D91023" />
            {/* National Shield in Center */}
            <g transform="translate(450, 300) scale(0.9)">
              <path d="M-45,-55 L45,-55 L45,15 Q45,65 0,85 Q-45,65 -45,15 Z" fill="#FFFFFF" stroke="#D91023" strokeWidth="4" />
              <path d="M-45,-55 L0,-55 L0,5 L-45,5 Z" fill="#75AADB" />
              <path d="M0,-55 L45,-55 L45,5 L0,5 Z" fill="#FFFFFF" />
              <path d="M-45,5 L45,5 L45,15 Q45,65 0,85 Q-45,65 -45,15 Z" fill="#D91023" />
              {/* Vicuña, Tree, Cornucopia symbols */}
              <circle cx="-22" cy="-25" r="12" fill="#8D6E63" />
              <circle cx="22" cy="-25" r="12" fill="#2E7D32" />
              <ellipse cx="0" cy="40" rx="20" ry="12" fill="#FFD54F" />
              {/* Laurel Wreath */}
              <path d="M-55,20 Q-70,-30 -30,-65" fill="none" stroke="#2E7D32" strokeWidth="5" />
              <path d="M55,20 Q70,-30 30,-65" fill="none" stroke="#2E7D32" strokeWidth="5" />
            </g>
          </svg>
        );

      // 6. CHILE
      case 'cl':
      case 'chile':
        return (
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            <rect width="900" height="300" fill="#FFFFFF" />
            <rect y="300" width="900" height="300" fill="#D52B1E" />
            <rect width="300" height="300" fill="#0039A6" />
            {/* White 5-pointed Star */}
            <polygon
              points="150,75 173,145 245,145 187,188 209,258 150,215 91,258 113,188 55,145 127,145"
              fill="#FFFFFF"
            />
          </svg>
        );

      // 7. GUATEMALA
      case 'gt':
      case 'guatemala':
        return (
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            <rect width="300" height="600" fill="#4997D0" />
            <rect x="300" width="300" height="600" fill="#FFFFFF" />
            <rect x="600" width="300" height="600" fill="#4997D0" />
            {/* Guatemalan Coat of Arms (Quetzal & Laurel) */}
            <g transform="translate(450, 300) scale(0.8)">
              {/* Laurel Wreath */}
              <circle cx="0" cy="0" r="65" fill="none" stroke="#2E7D32" strokeWidth="6" strokeDasharray="280 50" />
              {/* Crossed Rifles & Swords */}
              <line x1="-50" y1="-50" x2="50" y2="50" stroke="#78909C" strokeWidth="5" />
              <line x1="50" y1="-50" x2="-50" y2="50" stroke="#78909C" strokeWidth="5" />
              {/* Scroll */}
              <rect x="-35" y="-20" width="70" height="40" rx="3" fill="#FFF9C4" stroke="#B0BEC5" strokeWidth="1" />
              {/* Resplendent Quetzal */}
              <path d="M-15,-40 Q0,-65 15,-45 Q20,-30 5,-20 Q-15,-20 -15,-40 Z" fill="#00C853" />
              <path d="M-5,-20 Q-20,30 -10,70" fill="none" stroke="#00E676" strokeWidth="4" />
              <circle cx="-5" cy="-35" r="5" fill="#D50000" />
            </g>
          </svg>
        );

      // 8. CUBA
      case 'cu':
      case 'cuba':
        return (
          <svg viewBox="0 0 900 450" className="w-full h-full object-cover">
            <rect width="900" height="90" fill="#002A8F" />
            <rect y="90" width="900" height="90" fill="#FFFFFF" />
            <rect y="180" width="900" height="90" fill="#002A8F" />
            <rect y="270" width="900" height="90" fill="#FFFFFF" />
            <rect y="360" width="900" height="90" fill="#002A8F" />
            {/* Red Equilateral Triangle on Hoist */}
            <polygon points="0,0 389.7,225 0,450" fill="#CF142B" />
            {/* White Star */}
            <polygon
              points="130,135 142,172 181,172 150,195 161,232 130,209 99,232 110,195 79,172 118,172"
              fill="#FFFFFF"
            />
          </svg>
        );

      // 9. DOMINICAN REPUBLIC
      case 'do':
      case 'dominican_republic':
        return (
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            <rect width="450" height="300" fill="#002F6C" />
            <rect x="450" width="450" height="300" fill="#CE1126" />
            <rect y="300" width="450" height="300" fill="#CE1126" />
            <rect x="450" y="300" width="450" height="300" fill="#002F6C" />
            {/* Centered White Cross */}
            <rect x="400" width="100" height="600" fill="#FFFFFF" />
            <rect y="250" width="900" height="100" fill="#FFFFFF" />
            {/* Coat of arms */}
            <g transform="translate(450, 300) scale(0.65)">
              <rect x="-30" y="-35" width="60" height="70" rx="8" fill="#002F6C" stroke="#CE1126" strokeWidth="4" />
              <path d="M-15,-10 L0,-25 L15,-10 L0,20 Z" fill="#FFD54F" />
              <rect x="-10" y="-8" width="20" height="16" fill="#FFFFFF" />
              {/* Laurel and palm */}
              <path d="M-40,25 Q-55,-20 -25,-45" fill="none" stroke="#2E7D32" strokeWidth="5" />
              <path d="M40,25 Q55,-20 25,-45" fill="none" stroke="#2E7D32" strokeWidth="5" />
            </g>
          </svg>
        );

      // 10. PUERTO RICO
      case 'pr':
      case 'puerto_rico':
        return (
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            <rect width="900" height="120" fill="#ED0000" />
            <rect y="120" width="900" height="120" fill="#FFFFFF" />
            <rect y="240" width="900" height="120" fill="#ED0000" />
            <rect y="360" width="900" height="120" fill="#FFFFFF" />
            <rect y="480" width="900" height="120" fill="#ED0000" />
            {/* Blue Triangle */}
            <polygon points="0,0 519.6,300 0,600" fill="#0050F0" />
            {/* White Star */}
            <polygon
              points="173,180 189,229 241,229 200,259 215,308 173,278 131,308 146,259 105,229 157,229"
              fill="#FFFFFF"
            />
          </svg>
        );

      // 11. ECUADOR
      case 'ec':
      case 'ecuador':
        return (
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            <rect width="900" height="300" fill="#FFDD00" />
            <rect y="300" width="900" height="150" fill="#034EA2" />
            <rect y="450" width="900" height="150" fill="#ED1C24" />
            {/* Coat of arms */}
            <g transform="translate(450, 300) scale(0.8)">
              {/* Condor */}
              <path d="M0,-85 Q-40,-75 -70,-50 Q-30,-45 0,-60 Q30,-45 70,-50 Q40,-75 0,-85 Z" fill="#37474F" />
              {/* Oval shield */}
              <ellipse cx="0" cy="-5" rx="45" ry="55" fill="#81D4FA" stroke="#FFD54F" strokeWidth="4" />
              <path d="M-40,10 Q0,-20 40,10 L40,35 Q0,50 -40,35 Z" fill="#4CAF50" />
              <circle cx="0" cy="-25" r="14" fill="#FFEB3B" />
              {/* Flags bundle */}
              <line x1="-60" y1="30" x2="60" y2="-10" stroke="#FFDD00" strokeWidth="4" />
              <line x1="60" y1="30" x2="-60" y2="-10" stroke="#ED1C24" strokeWidth="4" />
            </g>
          </svg>
        );

      // 12. BOLIVIA
      case 'bo':
      case 'bolivia':
        return (
          <svg viewBox="0 0 750 500" className="w-full h-full object-cover">
            <rect width="750" height="166.7" fill="#D52B1E" />
            <rect y="166.7" width="750" height="166.6" fill="#F9E300" />
            <rect y="333.3" width="750" height="166.7" fill="#007934" />
            {/* Bolivian Coat of arms */}
            <g transform="translate(375, 250) scale(0.65)">
              <ellipse cx="0" cy="0" rx="55" ry="40" fill="#4FC3F7" stroke="#FFB300" strokeWidth="5" />
              <polygon points="0,-25 -40,25 40,25" fill="#8D6E63" />
              <circle cx="0" cy="-15" r="12" fill="#FDD835" />
              {/* Condor on top */}
              <path d="M0,-45 Q-30,-60 -50,-40 Q-20,-35 0,-38 Q20,-35 50,-40 Q30,-60 0,-45 Z" fill="#424242" />
              {/* Laurel wreath and flags */}
              <path d="M-65,10 Q-80,-20 -55,-40" fill="none" stroke="#2E7D32" strokeWidth="6" />
              <path d="M65,10 Q80,-20 55,-40" fill="none" stroke="#2E7D32" strokeWidth="6" />
            </g>
          </svg>
        );

      // 13. VENEZUELA
      case 've':
      case 'venezuela':
        return (
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            <rect width="900" height="200" fill="#FCE300" />
            <rect y="200" width="900" height="200" fill="#00247D" />
            <rect y="400" width="900" height="200" fill="#CF142B" />
            {/* 8 Stars in Arch on blue band */}
            <g transform="translate(450, 360)">
              {[...Array(8)].map((_, i) => {
                const angle = -140 + i * 14.3;
                const rad = (angle * Math.PI) / 180;
                const x = 110 * Math.cos(rad);
                const y = 110 * Math.sin(rad);
                return (
                  <polygon
                    key={i}
                    transform={`translate(${x}, ${y}) scale(0.6)`}
                    points="0,-12 3.7,-3.7 12,-3.7 5,1.5 8,10 0,5 -8,10 -5,1.5 -12,-3.7 -3.7,-3.7"
                    fill="#FFFFFF"
                  />
                );
              })}
            </g>
          </svg>
        );

      // 14. COSTA RICA
      case 'cr':
      case 'costa_rica':
        return (
          <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
            <rect width="1000" height="100" fill="#002B7F" />
            <rect y="100" width="1000" height="100" fill="#FFFFFF" />
            <rect y="200" width="1000" height="200" fill="#CE1126" />
            <rect y="400" width="1000" height="100" fill="#FFFFFF" />
            <rect y="500" width="1000" height="100" fill="#002B7F" />
            {/* Coat of arms */}
            <g transform="translate(280, 300) scale(0.55)">
              <ellipse cx="0" cy="0" rx="65" ry="85" fill="#FFFFFF" stroke="#FDD835" strokeWidth="6" />
              {/* Three Volcanoes */}
              <polygon points="-50,30 -25,-20 0,30" fill="#388E3C" />
              <polygon points="-20,30 5,-35 30,30" fill="#2E7D32" />
              <polygon points="10,30 35,-15 60,30" fill="#1B5E20" />
              {/* Ocean and Merchant ships */}
              <rect x="-60" y="30" width="120" height="35" fill="#0288D1" />
              {/* Sun rising */}
              <circle cx="0" cy="-45" r="14" fill="#FDD835" />
              {/* Stars arch */}
              <path d="M-40,-55 Q0,-75 40,-55" fill="none" stroke="#FDD835" strokeWidth="4" strokeDasharray="4 6" />
            </g>
          </svg>
        );

      // 15. PANAMA
      case 'pa':
      case 'panama':
        return (
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            <rect width="450" height="300" fill="#FFFFFF" />
            <rect x="450" width="450" height="300" fill="#D21034" />
            <rect y="300" width="450" height="300" fill="#005293" />
            <rect x="450" y="300" width="450" height="300" fill="#FFFFFF" />
            {/* Blue Star in top hoist */}
            <polygon
              transform="translate(225, 150) scale(1.3)"
              points="0,-40 12,-12 40,-12 18,6 26,34 0,16 -26,34 -18,6 -40,-12 -12,-12"
              fill="#005293"
            />
            {/* Red Star in bottom fly */}
            <polygon
              transform="translate(675, 450) scale(1.3)"
              points="0,-40 12,-12 40,-12 18,6 26,34 0,16 -26,34 -18,6 -40,-12 -12,-12"
              fill="#D21034"
            />
          </svg>
        );

      // 16. URUGUAY
      case 'uy':
      case 'uruguay':
        return (
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            {/* 9 alternating stripes */}
            {[...Array(9)].map((_, i) => (
              <rect
                key={i}
                y={i * 66.66}
                width="900"
                height="66.66"
                fill={i % 2 === 0 ? '#FFFFFF' : '#0038A8'}
              />
            ))}
            {/* White Canton */}
            <rect width="333" height="333" fill="#FFFFFF" />
            {/* Sun of May in canton */}
            <g transform="translate(166.5, 166.5) scale(1.2)">
              <circle r="25" fill="#FCD116" stroke="#85530E" strokeWidth="1.8" />
              {[...Array(16)].map((_, i) => (
                <g key={i} transform={`rotate(${i * 22.5})`}>
                  <path d="M0,-25 L-3,-46 L0,-52 L3,-46 Z" fill="#FCD116" stroke="#85530E" strokeWidth="0.8" />
                </g>
              ))}
              <circle cx="-7" cy="-4" r="2.5" fill="#85530E" />
              <circle cx="7" cy="-4" r="2.5" fill="#85530E" />
              <path d="M-8,8 Q0,15 8,8" fill="none" stroke="#85530E" strokeWidth="1.8" />
            </g>
          </svg>
        );

      // 17. PARAGUAY
      case 'py':
      case 'paraguay':
        return (
          <svg viewBox="0 0 900 500" className="w-full h-full object-cover">
            <rect width="900" height="166.7" fill="#D52B1E" />
            <rect y="166.7" width="900" height="166.6" fill="#FFFFFF" />
            <rect y="333.3" width="900" height="166.7" fill="#0038A8" />
            {/* National Seal in Center */}
            <g transform="translate(450, 250)">
              <circle r="42" fill="#FFFFFF" stroke="#0038A8" strokeWidth="3" />
              {/* Yellow Star in center */}
              <polygon
                points="0,-22 6,-7 22,-7 10,2 14,18 0,8 -14,18 -10,2 -22,-7 -6,-7"
                fill="#FCD116"
                stroke="#85530E"
                strokeWidth="1"
              />
              {/* Palm & Olive branches */}
              <path d="M-28,15 Q-40,-15 -15,-32" fill="none" stroke="#2E7D32" strokeWidth="4" />
              <path d="M28,15 Q40,-15 15,-32" fill="none" stroke="#2E7D32" strokeWidth="4" />
            </g>
          </svg>
        );

      // 18. HONDURAS
      case 'hn':
      case 'honduras':
        return (
          <svg viewBox="0 0 900 450" className="w-full h-full object-cover">
            <rect width="900" height="150" fill="#0073CF" />
            <rect y="150" width="900" height="150" fill="#FFFFFF" />
            <rect y="300" width="900" height="150" fill="#0073CF" />
            {/* 5 Cerulean Blue Stars in X formation */}
            <g transform="translate(450, 225) scale(0.9)">
              {/* Center */}
              <polygon points="0,-18 5,-5 18,-5 8,3 12,16 0,8 -12,16 -8,3 -18,-5 -5,-5" fill="#0073CF" />
              {/* Top Left */}
              <polygon points="-70,-48 -65,-35 -52,-35 -62,-27 -58,-14 -70,-22 -82,-14 -78,-27 -88,-35 -75,-35" fill="#0073CF" />
              {/* Top Right */}
              <polygon points="70,-48 75,-35 88,-35 78,-27 82,-14 70,-22 58,-14 62,-27 52,-35 65,-35" fill="#0073CF" />
              {/* Bottom Left */}
              <polygon points="-70,22 -65,35 -52,35 -62,43 -58,56 -70,48 -82,56 -78,43 -88,35 -75,35" fill="#0073CF" />
              {/* Bottom Right */}
              <polygon points="70,22 75,35 88,35 78,43 82,56 70,48 58,56 62,43 52,35 65,35" fill="#0073CF" />
            </g>
          </svg>
        );

      // 19. EL SALVADOR
      case 'sv':
      case 'el_salvador':
        return (
          <svg viewBox="0 0 900 540" className="w-full h-full object-cover">
            <rect width="900" height="180" fill="#0F47AF" />
            <rect y="180" width="900" height="180" fill="#FFFFFF" />
            <rect y="360" width="900" height="180" fill="#0F47AF" />
            {/* Central Coat of arms */}
            <g transform="translate(450, 270) scale(0.8)">
              {/* Golden circular inscription border */}
              <circle r="56" fill="none" stroke="#F9A825" strokeWidth="5" />
              {/* Triangle */}
              <polygon points="0,-35 -40,30 40,30" fill="#81D4FA" stroke="#F9A825" strokeWidth="3" />
              {/* Five Volcanoes */}
              <polygon points="-35,30 -20,5 -5,30" fill="#388E3C" />
              <polygon points="-15,30 0,-5 15,30" fill="#2E7D32" />
              <polygon points="5,30 20,5 35,30" fill="#1B5E20" />
              {/* Red Phrygian Cap */}
              <circle cx="0" cy="-12" r="7" fill="#D32F2F" />
              {/* Laurel Wreath */}
              <circle cx="0" cy="0" r="46" fill="none" stroke="#388E3C" strokeWidth="5" strokeDasharray="200 40" />
            </g>
          </svg>
        );

      // 20. NICARAGUA
      case 'ni':
      case 'nicaragua':
        return (
          <svg viewBox="0 0 900 540" className="w-full h-full object-cover">
            <rect width="900" height="180" fill="#0067C6" />
            <rect y="180" width="900" height="180" fill="#FFFFFF" />
            <rect y="360" width="900" height="180" fill="#0067C6" />
            {/* Triangle Coat of Arms */}
            <g transform="translate(450, 270) scale(0.8)">
              <circle r="56" fill="none" stroke="#FBC02D" strokeWidth="4" />
              <polygon points="0,-35 -40,28 40,28" fill="#E1F5FE" stroke="#FBC02D" strokeWidth="3" />
              {/* Rainbow */}
              <path d="M-25,5 Q0,-20 25,5" fill="none" stroke="#E53935" strokeWidth="3" />
              <path d="M-25,8 Q0,-17 25,8" fill="none" stroke="#FDD835" strokeWidth="3" />
              <path d="M-25,11 Q0,-14 25,11" fill="none" stroke="#43A047" strokeWidth="3" />
              {/* 5 Volcanoes */}
              <polygon points="-30,28 -18,10 -6,28" fill="#43A047" />
              <polygon points="-12,28 0,4 12,28" fill="#2E7D32" />
              <polygon points="6,28 18,10 30,28" fill="#1B5E20" />
              {/* Liberty Cap */}
              <circle cx="0" cy="-6" r="6" fill="#D32F2F" />
            </g>
          </svg>
        );

      // 21. EQUATORIAL GUINEA
      case 'gq':
      case 'equatorial_guinea':
        return (
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            <rect width="900" height="200" fill="#319236" />
            <rect y="200" width="900" height="200" fill="#FFFFFF" />
            <rect y="400" width="900" height="200" fill="#E32118" />
            {/* Blue Triangle on Hoist */}
            <polygon points="0,0 346.4,300 0,600" fill="#0073CE" />
            {/* Coat of arms on White stripe */}
            <g transform="translate(520, 300) scale(0.7)">
              <rect x="-30" y="-35" width="60" height="70" rx="8" fill="#FFFFFF" stroke="#9E9E9E" strokeWidth="3" />
              {/* Silk Cotton Tree */}
              <path d="M0,25 L0,-10 Q-20,-25 0,-30 Q20,-25 0,-10 Z" fill="#2E7D32" stroke="#1B5E20" strokeWidth="2" />
              {/* 6 Six-pointed Yellow Stars */}
              {[-30, -18, -6, 6, 18, 30].map((x, i) => (
                <polygon
                  key={i}
                  transform={`translate(${x * 1.4}, -45) scale(0.35)`}
                  points="0,-12 3,-4 11,-4 5,2 7,10 0,5 -7,10 -5,2 -11,-4 -3,-4"
                  fill="#FFD600"
                />
              ))}
            </g>
          </svg>
        );

      // ==========================================
      // US STATES (WITH AUTHENTIC VECTOR ARTWORK)
      // ==========================================

      // 1. TEXAS (Lone Star Flag)
      case 'tx':
      case 'us_tx':
        return (
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            {/* Blue Vertical Stripe on Left (1/3) */}
            <rect width="300" height="600" fill="#002868" />
            {/* White Top Right Horizontal (2/3) */}
            <rect x="300" width="600" height="300" fill="#FFFFFF" />
            {/* Red Bottom Right Horizontal (2/3) */}
            <rect x="300" y="300" width="600" height="300" fill="#BF0A30" />
            {/* Lone Star */}
            <polygon
              transform="translate(150, 300) scale(1.6)"
              points="0,-50 15,-15 50,-15 22,7 33,42 0,20 -33,42 -22,7 -50,-15 -15,-15"
              fill="#FFFFFF"
            />
          </svg>
        );

      // 2. CALIFORNIA (California Republic Bear Flag)
      case 'ca':
      case 'us_ca':
        return (
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover bg-white">
            <rect width="900" height="500" fill="#FFFFFF" />
            {/* Bottom Red Stripe (1/6 height) */}
            <rect y="500" width="900" height="100" fill="#BD1024" />
            {/* Red Star in top-left canton */}
            <polygon
              transform="translate(130, 110) scale(0.9)"
              points="0,-45 14,-14 45,-14 20,6 30,38 0,18 -30,38 -20,6 -45,-14 -14,-14"
              fill="#BD1024"
            />
            {/* California Grizzly Bear & Grass Plot */}
            <g transform="translate(450, 270) scale(1.2)">
              {/* Green Grass Plot */}
              <ellipse cx="0" cy="85" rx="190" ry="25" fill="#008542" />
              {/* Bear Body */}
              <path
                d="M-100,50 Q-120,30 -110,0 Q-90,-35 -40,-45 Q20,-50 80,-20 Q120,0 120,40 Q100,75 80,75 L60,40 L30,75 L-20,75 L-40,45 L-70,75 Z"
                fill="#5C381E"
              />
              {/* Bear Head & Snout */}
              <path d="M-110,0 Q-140,-10 -150,-5 Q-145,15 -125,25 Q-105,25 -100,10 Z" fill="#432616" />
              <circle cx="-135" cy="-2" r="3" fill="#1A0D00" />
              {/* Fur texture shading */}
              <path d="M-40,-35 Q20,-40 60,-15 Q20,-10 -20,-20 Z" fill="#784B28" />
            </g>
            {/* Text: CALIFORNIA REPUBLIC */}
            <text
              x="450"
              y="470"
              fontFamily="sans-serif"
              fontWeight="900"
              fontSize="38"
              letterSpacing="4"
              textAnchor="middle"
              fill="#000000"
            >
              CALIFORNIA REPUBLIC
            </text>
          </svg>
        );

      // 3. NEW MEXICO (Zia Sun Flag)
      case 'nm':
      case 'us_nm':
        return (
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            <rect width="900" height="600" fill="#FFD700" />
            {/* Red Zia Sun Symbol */}
            <g transform="translate(450, 300)">
              {/* Central Ring */}
              <circle r="46" fill="none" stroke="#BF0A30" strokeWidth="14" />
              {/* Top Rays */}
              <rect x="-17" y="-140" width="8" height="90" fill="#BF0A30" />
              <rect x="-4" y="-160" width="8" height="110" fill="#BF0A30" />
              <rect x="9" y="-140" width="8" height="90" fill="#BF0A30" />
              {/* Bottom Rays */}
              <rect x="-17" y="50" width="8" height="90" fill="#BF0A30" />
              <rect x="-4" y="50" width="8" height="110" fill="#BF0A30" />
              <rect x="9" y="50" width="8" height="90" fill="#BF0A30" />
              {/* Left Rays */}
              <rect x="-140" y="-17" width="90" height="8" fill="#BF0A30" />
              <rect x="-160" y="-4" width="110" height="8" fill="#BF0A30" />
              <rect x="-140" y="9" width="90" height="8" fill="#BF0A30" />
              {/* Right Rays */}
              <rect x="50" y="-17" width="90" height="8" fill="#BF0A30" />
              <rect x="50" y="-4" width="110" height="8" fill="#BF0A30" />
              <rect x="50" y="9" width="90" height="8" fill="#BF0A30" />
            </g>
          </svg>
        );

      // 4. ARIZONA (Copper Star Flag)
      case 'az':
      case 'us_az':
        return (
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            {/* Bottom half Liberty Blue */}
            <rect y="300" width="900" height="300" fill="#002868" />
            {/* Top 13 Red & Gold Rays */}
            <g>
              {[
                { p: "0,0 138,0 450,300", c: "#BF0A30" },
                { p: "138,0 276,0 450,300", c: "#FFD700" },
                { p: "276,0 415,0 450,300", c: "#BF0A30" },
                { p: "415,0 485,0 450,300", c: "#FFD700" },
                { p: "485,0 624,0 450,300", c: "#BF0A30" },
                { p: "624,0 762,0 450,300", c: "#FFD700" },
                { p: "762,0 900,0 450,300", c: "#BF0A30" },
                { p: "0,0 0,100 450,300", c: "#FFD700" },
                { p: "0,100 0,200 450,300", c: "#BF0A30" },
                { p: "0,200 0,300 450,300", c: "#FFD700" },
                { p: "900,0 900,100 450,300", c: "#FFD700" },
                { p: "900,100 900,200 450,300", c: "#BF0A30" },
                { p: "900,200 900,300 450,300", c: "#FFD700" },
              ].map((ray, i) => (
                <polygon key={i} points={ray.p} fill={ray.c} />
              ))}
            </g>
            {/* Copper Star in Center */}
            <polygon
              transform="translate(450, 300) scale(1.6)"
              points="0,-60 18,-18 60,-18 26,8 39,50 0,24 -39,50 -26,8 -60,-18 -18,-18"
              fill="#B87333"
              stroke="#8B4513"
              strokeWidth="2"
            />
          </svg>
        );

      // 5. NEVADA (Battle Born Flag)
      case 'nv':
      case 'us_nv':
        return (
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            <rect width="900" height="600" fill="#0033A0" />
            {/* Top Left Canton Emblem */}
            <g transform="translate(180, 160) scale(1.1)">
              {/* Sagebrush Wreath */}
              <circle cx="0" cy="0" r="50" fill="none" stroke="#A4B598" strokeWidth="6" strokeDasharray="180 50" />
              {/* Silver Star */}
              <polygon
                points="0,-28 7,-9 28,-9 11,3 17,24 0,11 -17,24 -11,3 -28,-9 -7,-9"
                fill="#C0C0C0"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              {/* Yellow Banner with "BATTLE BORN" */}
              <path d="M-60,-40 Q0,-65 60,-40 L55,-55 Q0,-75 -55,-55 Z" fill="#FEE12B" stroke="#000000" strokeWidth="1.5" />
              <text x="0" y="-48" fontSize="9" fontWeight="900" textAnchor="middle" fill="#000000" fontFamily="sans-serif">
                BATTLE BORN
              </text>
              {/* NEVADA letters */}
              <text x="0" y="42" fontSize="14" fontWeight="900" textAnchor="middle" fill="#FEE12B" fontFamily="sans-serif" letterSpacing="4">
                NEVADA
              </text>
            </g>
          </svg>
        );

      // 6. FLORIDA (Red Saltire & State Seal)
      case 'fl':
      case 'us_fl':
        return (
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            <rect width="900" height="600" fill="#FFFFFF" />
            {/* Red Saint Andrew's Cross (Saltire) */}
            <polygon points="0,0 90,0 900,540 900,600 810,600 0,60" fill="#CC0000" />
            <polygon points="900,0 810,0 0,540 0,600 90,600 900,60" fill="#CC0000" />
            {/* Great Seal of Florida in Center */}
            <g transform="translate(450, 300)">
              <circle r="95" fill="#FFFFFF" stroke="#F1BF00" strokeWidth="8" />
              <circle r="85" fill="#F9A825" stroke="#C2185B" strokeWidth="2" />
              {/* Sun rays, Sabal Palm tree & steamboat */}
              <circle cx="0" cy="-25" r="30" fill="#FFF59D" />
              {/* Sabal Palm Tree */}
              <path d="M-15,40 L-5,-10 Q-35,-25 -10,-40 Q15,-25 5,-10 L15,40 Z" fill="#2E7D32" />
              {/* Steamboat */}
              <rect x="-35" y="30" width="70" height="15" fill="#5D4037" />
              <rect x="-5" y="10" width="10" height="20" fill="#424242" />
              <line x1="0" y1="10" x2="15" y2="-5" stroke="#9E9E9E" strokeWidth="3" />
              {/* Seal border text */}
              <text x="0" y="-68" fontSize="9" fontWeight="900" textAnchor="middle" fill="#000000" fontFamily="sans-serif">
                GREAT SEAL OF THE STATE OF FLORIDA
              </text>
              <text x="0" y="78" fontSize="9" fontWeight="900" textAnchor="middle" fill="#000000" fontFamily="sans-serif">
                IN GOD WE TRUST
              </text>
            </g>
          </svg>
        );

      // 7. NEW JERSEY (Buff & Blue State Seal)
      case 'nj':
      case 'us_nj':
        return (
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            {/* State Buff Gold Field */}
            <rect width="900" height="600" fill="#E1B87F" />
            {/* New Jersey State Seal in Center */}
            <g transform="translate(450, 300) scale(1.1)">
              {/* Blue baroque shield */}
              <path d="M-50,-50 L50,-50 L50,15 Q50,65 0,85 Q-50,65 -50,15 Z" fill="#245199" stroke="#FFD54F" strokeWidth="4" />
              {/* Three Plows */}
              <path d="M-30,-25 L30,-25 L10,-10 L-20,-10 Z" fill="#FFD54F" />
              <path d="M-30,0 L30,0 L10,15 L-20,15 Z" fill="#FFD54F" />
              <path d="M-30,25 L30,25 L10,40 L-20,40 Z" fill="#FFD54F" />
              {/* Horse Head Crest */}
              <path d="M-20,-60 Q0,-80 20,-60 L0,-50 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
              {/* Goddess Figures (Liberty & Ceres) */}
              <circle cx="-75" cy="-20" r="14" fill="#FFE0B2" />
              <path d="M-85,-5 L-65,-5 L-60,50 L-90,50 Z" fill="#1565C0" />
              <circle cx="75" cy="-20" r="14" fill="#FFE0B2" />
              <path d="M65,-5 L85,-5 L90,50 L60,50 Z" fill="#2E7D32" />
            </g>
          </svg>
        );

      // 8. NEW YORK (Excelsior Seal Flag)
      case 'ny':
      case 'us_ny':
        return (
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            <rect width="900" height="600" fill="#002D62" />
            {/* State Coat of Arms */}
            <g transform="translate(450, 300) scale(1.15)">
              {/* Central Oval Shield */}
              <ellipse cx="0" cy="0" rx="60" ry="70" fill="#64B5F6" stroke="#FFD54F" strokeWidth="5" />
              {/* Hudson River, Mountains & Sun */}
              <circle cx="0" cy="-25" r="22" fill="#FBC02D" />
              <polygon points="-55,10 -15,-15 25,10" fill="#4CAF50" />
              <polygon points="0,10 30,-10 55,10" fill="#388E3C" />
              <rect x="-60" y="10" width="120" height="35" fill="#1976D2" />
              {/* American Eagle on Globe Top Crest */}
              <circle cx="0" cy="-85" r="14" fill="#42A5F5" stroke="#FFD54F" strokeWidth="2" />
              <path d="M0,-100 Q-25,-115 -40,-100 Q-15,-95 0,-92 Q15,-95 40,-100 Q25,-115 0,-100 Z" fill="#8D6E63" />
              {/* Liberty & Justice */}
              <circle cx="-85" cy="-10" r="12" fill="#FFE0B2" />
              <path d="M-95,5 L-75,5 L-70,60 L-100,60 Z" fill="#0D47A1" />
              <circle cx="85" cy="-10" r="12" fill="#FFE0B2" />
              <path d="M75,5 L95,5 L100,60 L70,60 Z" fill="#C62828" />
              {/* EXCELSIOR Banner */}
              <rect x="-70" y="75" width="140" height="20" rx="3" fill="#FFFFFF" stroke="#B0BEC5" strokeWidth="1.5" />
              <text x="0" y="89" fontSize="12" fontWeight="900" textAnchor="middle" fill="#000000" fontFamily="sans-serif" letterSpacing="2">
                EXCELSIOR
              </text>
            </g>
          </svg>
        );

      // 9. ILLINOIS (Eagle & Shield Flag)
      case 'il':
      case 'us_il':
        return (
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            <rect width="900" height="600" fill="#FFFFFF" />
            {/* Seal with Bald Eagle & Shield */}
            <g transform="translate(450, 270) scale(1.1)">
              {/* Boulder */}
              <ellipse cx="0" cy="90" rx="90" ry="25" fill="#78909C" />
              {/* Bald Eagle */}
              <path
                d="M0,40 Q-50,0 -80,-50 Q-40,-35 -15,-15 Q0,-70 20,-70 Q25,-40 50,-60 Q80,-40 30,10 Z"
                fill="#5D4037"
              />
              {/* Eagle White Head */}
              <circle cx="10" cy="-55" r="16" fill="#FFFFFF" />
              <polygon points="25,-55 38,-50 25,-45" fill="#FFC107" />
              {/* US Red/White Shield */}
              <g transform="translate(30, 45) scale(0.6)">
                <rect width="70" height="40" fill="#0D47A1" />
                <rect y="40" width="70" height="60" fill="#FFFFFF" stroke="#C62828" strokeWidth="8" strokeDasharray="10 10" />
              </g>
              {/* Banner with Motto */}
              <path d="M-80,-20 Q0,-50 80,-20" fill="none" stroke="#D32F2F" strokeWidth="8" />
              <text x="0" y="-12" fontSize="9" fontWeight="900" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif">
                STATE SOVEREIGNTY, NATIONAL UNION
              </text>
            </g>
            {/* ILLINOIS text */}
            <text
              x="450"
              y="530"
              fontFamily="sans-serif"
              fontWeight="900"
              fontSize="44"
              letterSpacing="6"
              textAnchor="middle"
              fill="#002D62"
            >
              ILLINOIS
            </text>
          </svg>
        );

      // 10. COLORADO ('C' Disk Flag)
      case 'co_state':
      case 'us_co':
        return (
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            <rect width="900" height="200" fill="#002868" />
            <rect y="200" width="900" height="200" fill="#FFFFFF" />
            <rect y="400" width="900" height="200" fill="#002868" />
            {/* Circular Red 'C' and Gold Disc */}
            <g transform="translate(320, 300)">
              {/* Red 'C' outer ring with right opening */}
              <circle r="130" fill="#C62828" />
              <polygon points="0,-40 140,-40 140,40 0,40" fill="#FFFFFF" />
              <circle r="65" fill="#FFFFFF" />
              {/* Golden Disc in center */}
              <circle r="65" fill="#FFD700" />
            </g>
          </svg>
        );

      // 11. RHODE ISLAND (Golden Anchor & 13 Stars)
      case 'ri':
      case 'us_ri':
        return (
          <svg viewBox="0 0 800 600" className="w-full h-full object-cover">
            <rect width="800" height="600" fill="#FFFFFF" />
            {/* Golden Anchor in Center */}
            <g transform="translate(400, 270) scale(1.15)">
              <rect x="-8" y="-70" width="16" height="120" rx="6" fill="#F59E0B" />
              <rect x="-40" y="-45" width="80" height="14" rx="4" fill="#F59E0B" />
              <circle cx="0" cy="-75" r="16" fill="none" stroke="#F59E0B" strokeWidth="8" />
              <path d="M-60,20 Q0,85 60,20" fill="none" stroke="#F59E0B" strokeWidth="16" strokeLinecap="round" />
              {/* Blue Ribbon with "HOPE" */}
              <rect x="-50" y="80" width="100" height="24" rx="4" fill="#1E3A8A" />
              <text x="0" y="97" fontSize="14" fontWeight="900" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" letterSpacing="3">
                HOPE
              </text>
            </g>
            {/* Circle of 13 Gold Stars */}
            <g transform="translate(400, 270)">
              {[...Array(13)].map((_, i) => {
                const angle = (i * 360) / 13 - 90;
                const rad = (angle * Math.PI) / 180;
                const x = 165 * Math.cos(rad);
                const y = 165 * Math.sin(rad);
                return (
                  <polygon
                    key={i}
                    transform={`translate(${x}, ${y}) scale(0.65)`}
                    points="0,-16 5,-5 16,-5 7,2 10,13 0,6 -10,13 -7,2 -16,-5 -5,-5"
                    fill="#F59E0B"
                  />
                );
              })}
            </g>
          </svg>
        );

      // 12. CONNECTICUT (Grapevines Baroque Shield)
      case 'ct':
      case 'us_ct':
        return (
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            <rect width="900" height="600" fill="#002D62" />
            {/* Baroque White Shield */}
            <g transform="translate(450, 280) scale(1.15)">
              <path
                d="M-70,-80 L70,-80 Q90,-20 80,40 Q70,90 0,110 Q-70,90 -80,40 Q-90,-20 -70,-80 Z"
                fill="#FFFFFF"
                stroke="#D4AF37"
                strokeWidth="6"
              />
              {/* Three Grapevines with Supports */}
              {[-35, 35, 0].map((x, i) => {
                const y = i === 2 ? 30 : -25;
                return (
                  <g key={i} transform={`translate(${x}, ${y})`}>
                    <line x1="0" y1="-25" x2="0" y2="25" stroke="#795548" strokeWidth="4" />
                    {/* Grape Leaves & Purple Clusters */}
                    <circle cx="-10" cy="-10" r="10" fill="#2E7D32" />
                    <circle cx="10" cy="-10" r="10" fill="#388E3C" />
                    <circle cx="-5" cy="10" r="5" fill="#6A1B9A" />
                    <circle cx="5" cy="10" r="5" fill="#7B1FA2" />
                    <circle cx="0" cy="18" r="5" fill="#4A148C" />
                  </g>
                );
              })}
              {/* White Motto Banner below */}
              <path d="M-110,120 Q0,145 110,120 L100,145 Q0,170 -100,145 Z" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="2" />
              <text x="0" y="137" fontSize="8.5" fontWeight="900" textAnchor="middle" fill="#000000" fontFamily="sans-serif">
                QUI TRANSTULIT SUSTINET
              </text>
            </g>
          </svg>
        );

      // Default fallback (USA flag)
      case 'us':
      default:
        return (
          <svg viewBox="0 0 741 390" className="w-full h-full object-cover">
            <rect width="741" height="390" fill="#B22234" />
            {[1, 3, 5, 7, 9, 11].map(i => (
              <rect key={i} y={(i * 390) / 13} width="741" height={390 / 13} fill="#FFFFFF" />
            ))}
            <rect width="296.4" height={210} fill="#3C3B6E" />
            {/* Stars cluster */}
            <g fill="#FFFFFF" transform="translate(10, 10) scale(0.7)">
              {[...Array(20)].map((_, i) => (
                <circle key={i} cx={(i % 5) * 70 + 20} cy={Math.floor(i / 5) * 60 + 20} r="7" />
              ))}
            </g>
          </svg>
        );
    }
  };

  return (
    <span
      className={containerClass}
      title={defaultTitle}
      aria-label={defaultTitle}
      role="img"
    >
      {renderSvg()}
    </span>
  );
};

export default FlagIcon;
