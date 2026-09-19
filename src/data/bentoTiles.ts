export interface BentoCardConfig {
  id: string;
  type: 'ambiance-candle' | 'ambiance-pine' | 'texture-knit' | 'quote' | 'badge-offer' | 'detail-zoom';
  title: string;
  subtitle: string;
  badge?: string;
  bgColor: string;
  textColor: string;
  iconName?: string;
}

// Generate inline SVG backgrounds for festive atmospheric tiles
export function getBentoTileSVG(type: string): string {
  if (type === 'ambiance-candle') {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
      <defs>
        <radialGradient id="ambGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#FEF08A" stop-opacity="0.9"/>
          <stop offset="40%" stop-color="#F59E0B" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#1E1610" stop-opacity="1"/>
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="#181310"/>
      <circle cx="200" cy="180" r="160" fill="url(#ambGlow)" filter="blur(20px)"/>
      <ellipse cx="200" cy="310" rx="90" ry="18" fill="#0C0806" opacity="0.6"/>
      <!-- Soft blurred candle & pine needle silhouette -->
      <path d="M 175,220 L 225,220 L 225,310 L 175,310 Z" rx="8" fill="#F4EAD4" opacity="0.85"/>
      <path d="M 200,220 Q 202,185 198,175" stroke="#451A03" stroke-width="3.5" fill="none"/>
      <!-- Glowing flame -->
      <circle cx="198" cy="155" r="35" fill="#FFB703" opacity="0.6" filter="blur(6px)"/>
      <path d="M 198,175 Q 185,150 196,125 Q 200,105 200,90 Q 204,110 208,135 Q 215,155 198,175 Z" fill="#FFFBEB"/>
      <!-- Warm bokeh circles -->
      <circle cx="90" cy="90" r="18" fill="#FDE68A" opacity="0.25" filter="blur(4px)"/>
      <circle cx="320" cy="110" r="28" fill="#F59E0B" opacity="0.2" filter="blur(6px)"/>
      <circle cx="340" cy="270" r="22" fill="#FBBF24" opacity="0.18" filter="blur(5px)"/>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  if (type === 'ambiance-pine') {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
      <rect width="400" height="400" fill="#0F241C"/>
      <g stroke="#2D6A4F" stroke-width="4" stroke-linecap="round" opacity="0.8">
        <path d="M 0,200 Q 150,120 300,160"/>
        <path d="M 80,160 L 60,110 M 120,150 L 110,95 M 160,145 L 170,85 M 200,148 L 220,90"/>
      </g>
      <g stroke="#52B788" stroke-width="3" stroke-linecap="round" opacity="0.7">
        <path d="M 90,170 L 110,210 M 140,160 L 170,205 M 180,155 L 220,195"/>
      </g>
      <!-- Red festive winter berries -->
      <circle cx="160" cy="120" r="9" fill="#E63946"/>
      <circle cx="175" cy="130" r="7.5" fill="#C1121F"/>
      <circle cx="150" cy="136" r="8" fill="#780000"/>
      <!-- Fine frost sparkles -->
      <circle cx="80" cy="60" r="2.5" fill="#FFFFFF" opacity="0.8"/>
      <circle cx="280" cy="80" r="3" fill="#FFFFFF" opacity="0.9"/>
      <circle cx="320" cy="240" r="2" fill="#FFFFFF" opacity="0.7"/>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  // Texture tricot & fibres naturelles
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
    <defs>
      <pattern id="knitPattern" width="30" height="24" patternUnits="userSpaceOnUse">
        <path d="M 5,0 Q 15,12 5,24 M 20,0 Q 10,12 20,24" fill="none" stroke="#D3C7B6" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
        <path d="M 20,0 Q 30,12 20,24 M 35,0 Q 25,12 35,24" fill="none" stroke="#E3D7C6" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
      </pattern>
    </defs>
    <rect width="400" height="400" fill="#E8DFD3"/>
    <rect width="400" height="400" fill="url(#knitPattern)"/>
    <!-- Soft warm studio gradient across fabric -->
    <radialGradient id="knitGlow" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#8C7A65" stop-opacity="0.25"/>
    </radialGradient>
    <rect width="400" height="400" fill="url(#knitGlow)"/>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const DEFAULT_BENTO_TILES: BentoCardConfig[] = [
  {
    id: 'tile-ambiance',
    type: 'ambiance-candle',
    title: 'Ambiance Feutrée',
    subtitle: 'Lumière de fête & cire chaude',
    badge: 'Atmosphère',
    bgColor: '#1E1610',
    textColor: '#FEF3C7',
  },
  {
    id: 'tile-texture',
    type: 'texture-knit',
    title: 'Matière Brute',
    subtitle: 'Fibres naturelles & artisanat',
    badge: '100% Authentique',
    bgColor: '#E8DFD3',
    textColor: '#3A2E24',
  },
  {
    id: 'tile-quote',
    type: 'quote',
    title: '« Façonné avec lenteur & amour pour illuminer vos fêtes »',
    subtitle: 'Atelier Français · Fêtes 2026',
    badge: 'Édition Spéciale',
    bgColor: '#8A2D3B',
    textColor: '#FAF5EE',
  },
  {
    id: 'tile-badge',
    type: 'badge-offer',
    title: 'Idée Cadeau Coup de Cœur',
    subtitle: 'Livraison soignée prête à offrir sous le sapin',
    badge: 'Top Enregistrements',
    bgColor: '#0D5C63',
    textColor: '#E6FFFA',
  },
];
