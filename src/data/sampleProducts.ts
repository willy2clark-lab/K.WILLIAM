import { RawProduct } from '../types';

// Helper to create high-resolution realistic raw product SVG Data URLs with natural textures & studio lighting
function createProductSVG(type: 'candle' | 'mug' | 'perfume' | 'chocolates' | 'leather'): string {
  let innerContent = '';
  let viewBox = '0 0 1000 1000';

  if (type === 'candle') {
    // Bougie Artisanale Pin & Cire Brute
    innerContent = `
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stop-color="#E8E2D8"/>
          <stop offset="60%" stop-color="#D5CBBF"/>
          <stop offset="100%" stop-color="#BCB0A2"/>
        </radialGradient>
        <linearGradient id="jarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#2D4A3E"/>
          <stop offset="25%" stop-color="#3F6456"/>
          <stop offset="50%" stop-color="#4B7766"/>
          <stop offset="75%" stop-color="#345548"/>
          <stop offset="100%" stop-color="#1F342B"/>
        </linearGradient>
        <linearGradient id="waxGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#F9F6EE"/>
          <stop offset="100%" stop-color="#E5DEC9"/>
        </linearGradient>
        <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFF2A3" stop-opacity="1"/>
          <stop offset="40%" stop-color="#FFA834" stop-opacity="0.8"/>
          <stop offset="80%" stop-color="#FF5A1F" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#FF5A1F" stop-opacity="0"/>
        </radialGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="25"/>
          <feOffset dx="0" dy="30" result="offsetblur"/>
          <feComponentTransfer><feFuncA type="linear" slope="0.35"/></feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="naturalNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise"/>
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.07 0"/>
          <feComposite in2="SourceGraphic" in="glare" operator="in"/>
        </filter>
      </defs>

      <!-- Background Studio Workbench (Bois clair / lin) -->
      <rect width="1000" height="1000" fill="url(#bgGrad)"/>
      
      <!-- Table surface divider -->
      <path d="M 0,720 Q 500,735 1000,720 L 1000,1000 L 0,1000 Z" fill="#9C8D7F" opacity="0.45"/>
      <ellipse cx="500" cy="810" rx="280" ry="45" fill="#1C1815" opacity="0.35" filter="blur(22px)"/>

      <!-- Natural Pine Sprig in background -->
      <g opacity="0.85">
        <path d="M 180,820 Q 320,680 440,640" stroke="#4A3B2C" stroke-width="8" stroke-linecap="round" fill="none"/>
        <!-- Pine needles -->
        <path d="M 230,780 L 210,730 M 260,760 L 250,700 M 290,740 L 300,670 M 330,710 L 350,650 M 370,680 L 390,620 M 410,660 L 440,610" stroke="#2B4D36" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M 240,790 L 260,820 M 270,770 L 310,800 M 310,750 L 360,770 M 350,720 L 400,740" stroke="#3A6347" stroke-width="4" stroke-linecap="round"/>
        <!-- Small dried orange slice -->
        <circle cx="270" cy="820" r="50" fill="#D97706" opacity="0.85"/>
        <circle cx="270" cy="820" r="44" fill="#B45309"/>
        <circle cx="270" cy="820" r="38" fill="#F59E0B" opacity="0.9"/>
        <line x1="270" y1="782" x2="270" y2="858" stroke="#78350F" stroke-width="2"/>
        <line x1="232" y1="820" x2="308" y2="820" stroke="#78350F" stroke-width="2"/>
      </g>

      <!-- Ceramic/Glass Candle Jar -->
      <g filter="url(#softShadow)">
        <!-- Jar Body -->
        <rect x="340" y="440" width="320" height="340" rx="32" fill="url(#jarGrad)"/>
        
        <!-- Subtle studio specular reflection on glass -->
        <path d="M 370,455 Q 365,600 372,740" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" opacity="0.22" filter="blur(3px)"/>
        <path d="M 400,465 Q 396,600 400,730" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.15"/>
        
        <!-- Kraft Paper Label with hand-crafted type -->
        <rect x="385" y="525" width="230" height="175" rx="6" fill="#F5EFE6"/>
        <rect x="393" y="533" width="214" height="159" rx="3" fill="none" stroke="#2D4A3E" stroke-width="1.5" stroke-dasharray="4,3"/>
        <text x="500" y="575" font-family="serif" font-size="19" font-weight="700" fill="#1F342B" text-anchor="middle" letter-spacing="3">FORÊT D'HIVER</text>
        <text x="500" y="605" font-family="sans-serif" font-size="11" font-weight="500" fill="#5A6D64" text-anchor="middle" letter-spacing="2">PIN SYLVESTRE &amp; AMBRE</text>
        <line x1="440" y1="620" x2="560" y2="620" stroke="#C2B29F" stroke-width="1"/>
        <text x="500" y="648" font-family="serif" font-size="12" font-style="italic" fill="#3D5348" text-anchor="middle">Cire végétale de soja 100%</text>
        <text x="500" y="672" font-family="sans-serif" font-size="9" font-weight="600" fill="#8C7965" text-anchor="middle" letter-spacing="1">FAIT MAIN EN ATELIER · 220G</text>

        <!-- Candle Wax Top Ellipse -->
        <ellipse cx="500" cy="445" rx="155" ry="32" fill="url(#waxGrad)"/>
        <ellipse cx="500" cy="445" rx="148" ry="28" fill="#FFFDF8" opacity="0.6"/>

        <!-- Wick & Flame -->
        <!-- Wick -->
        <path d="M 500,445 Q 502,400 497,380" stroke="#2C1D11" stroke-width="4.5" stroke-linecap="round" fill="none"/>
        <circle cx="497" cy="382" r="3.5" fill="#E24A00"/>

        <!-- Flame Ambient Glow -->
        <circle cx="496" cy="340" r="95" fill="url(#flameGlow)" filter="blur(16px)"/>

        <!-- Flame Body -->
        <path d="M 497,380 Q 480,350 493,310 Q 497,290 500,270 Q 504,295 510,325 Q 518,355 497,380 Z" fill="#FFF7CC"/>
        <path d="M 497,377 Q 486,355 495,325 Q 498,310 500,295 Q 503,312 507,335 Q 512,360 497,377 Z" fill="#FFC72C"/>
        <path d="M 497,375 Q 491,365 496,345 Q 498,335 500,325 Q 502,335 504,348 Q 506,365 497,375 Z" fill="#FFFFFF"/>
        <!-- Blue Flame Base -->
        <ellipse cx="497" cy="378" rx="8" ry="5" fill="#3B82F6" opacity="0.65"/>
      </g>

      <!-- Raw Studio Authenticity Marker -->
      <g opacity="0.65" transform="translate(720, 880)">
        <text x="0" y="0" font-family="monospace" font-size="12" fill="#5F5245">ISO 200 · 50mm f/1.8 · RAW</text>
      </g>
    `;
  } else if (type === 'mug') {
    // Tasse Céramique Façonnée Main
    innerContent = `
      <defs>
        <linearGradient id="mugBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#EFEBE4"/>
          <stop offset="50%" stop-color="#DFD8CC"/>
          <stop offset="100%" stop-color="#C5BCAD"/>
        </linearGradient>
        <linearGradient id="ceramicClay" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#D7CCC8"/>
          <stop offset="25%" stop-color="#EFEBE9"/>
          <stop offset="60%" stop-color="#F5F5F5"/>
          <stop offset="85%" stop-color="#D7CCC8"/>
          <stop offset="100%" stop-color="#BCAAA4"/>
        </linearGradient>
        <linearGradient id="coffeeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#2D1808"/>
          <stop offset="60%" stop-color="#3D2314"/>
          <stop offset="100%" stop-color="#54331C"/>
        </linearGradient>
      </defs>
      <rect width="1000" height="1000" fill="url(#mugBg)"/>
      <ellipse cx="500" cy="790" rx="300" ry="40" fill="#261C14" opacity="0.25" filter="blur(20px)"/>
      
      <!-- Linen runner under mug -->
      <path d="M 120,680 L 880,680 L 920,950 L 80,950 Z" fill="#E4DCD0" opacity="0.7"/>
      <line x1="140" y1="710" x2="860" y2="710" stroke="#C7BBAA" stroke-width="1.5" stroke-dasharray="6,4"/>

      <!-- Ceramic Handle -->
      <path d="M 640,460 C 760,470 780,620 640,650" fill="none" stroke="#D7CCC8" stroke-width="48" stroke-linecap="round"/>
      <path d="M 640,460 C 750,470 770,620 640,650" fill="none" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" opacity="0.4"/>

      <!-- Mug Body -->
      <path d="M 320,410 Q 315,710 370,750 Q 500,770 630,750 Q 685,710 680,410 Z" fill="url(#ceramicClay)"/>
      
      <!-- Clay Speckles Texture -->
      <g opacity="0.3" fill="#6D4C41">
        <circle cx="360" cy="480" r="2.5"/><circle cx="430" cy="530" r="1.5"/>
        <circle cx="490" cy="620" r="2"/><circle cx="580" cy="500" r="2"/>
        <circle cx="620" cy="670" r="1.8"/><circle cx="410" cy="690" r="2.2"/>
        <circle cx="510" cy="460" r="1.5"/><circle cx="560" cy="710" r="2"/>
      </g>

      <!-- Raw Clay Base Rim (Terre cuite naturelle) -->
      <path d="M 368,735 Q 500,760 632,735 L 630,750 Q 500,770 370,750 Z" fill="#8D6E63"/>

      <!-- Handcrafted Glaze Drip Accent -->
      <path d="M 330,480 Q 380,510 440,490 Q 500,530 560,495 Q 630,515 670,480 L 670,410 L 330,410 Z" fill="#ECEFF1" opacity="0.5"/>

      <!-- Cup Rim & Coffee Surface -->
      <ellipse cx="500" cy="410" rx="180" ry="42" fill="#D7CCC8"/>
      <ellipse cx="500" cy="410" rx="165" ry="36" fill="url(#coffeeGrad)"/>
      <!-- Latte Art / Foam Swirl -->
      <path d="M 470,415 Q 500,395 530,415 Q 500,430 470,415 Z" fill="#F5EBE1" opacity="0.85"/>
      <circle cx="500" cy="412" r="8" fill="#F5EBE1" opacity="0.9"/>
      <!-- Soft Steam -->
      <path d="M 480,360 Q 460,310 480,260" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" fill="none" opacity="0.2" filter="blur(8px)"/>
      <path d="M 520,350 Q 540,290 510,230" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" fill="none" opacity="0.18" filter="blur(7px)"/>

      <!-- Star Anise & Cinnamon in background -->
      <g transform="translate(230, 690) rotate(15)">
        <ellipse cx="0" cy="0" rx="35" ry="12" fill="#5D4037"/>
        <ellipse cx="0" cy="0" rx="12" ry="35" fill="#5D4037"/>
        <circle cx="0" cy="0" r="10" fill="#3E2723"/>
      </g>
    `;
  } else if (type === 'perfume') {
    // Flacon Botanique Ambré
    innerContent = `
      <defs>
        <radialGradient id="amberGlow" cx="45%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#D97706"/>
          <stop offset="50%" stop-color="#92400E"/>
          <stop offset="100%" stop-color="#451A03"/>
        </radialGradient>
        <linearGradient id="goldCap" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#926D28"/>
          <stop offset="30%" stop-color="#ECC26D"/>
          <stop offset="50%" stop-color="#FFF5C2"/>
          <stop offset="70%" stop-color="#D4A84E"/>
          <stop offset="100%" stop-color="#785517"/>
        </linearGradient>
      </defs>
      <rect width="1000" height="1000" fill="#EFE8DE"/>
      <!-- Soft botanical shadows in background -->
      <path d="M 750,150 Q 820,350 780,600" stroke="#2D4537" stroke-width="24" stroke-linecap="round" opacity="0.12" filter="blur(14px)"/>
      <ellipse cx="500" cy="800" rx="220" ry="35" fill="#1C130B" opacity="0.32" filter="blur(18px)"/>

      <!-- Bottle Shadow -->
      <g>
        <!-- Glass Dropper Bottle Body -->
        <rect x="375" y="440" width="250" height="340" rx="28" fill="url(#amberGlow)"/>
        
        <!-- Glass Light Caustic / Highlight -->
        <rect x="390" y="455" width="20" height="305" rx="8" fill="#FED7AA" opacity="0.45" filter="blur(2px)"/>
        <rect x="600" y="455" width="12" height="305" rx="6" fill="#FDE68A" opacity="0.25"/>

        <!-- Botanical Minimal Label -->
        <rect x="415" y="520" width="170" height="190" rx="4" fill="#FCFAF7"/>
        <rect x="422" y="527" width="156" height="176" fill="none" stroke="#92400E" stroke-width="1" opacity="0.4"/>
        <text x="500" y="562" font-family="serif" font-size="14" font-weight="700" fill="#451A03" text-anchor="middle" letter-spacing="4">N° 07</text>
        <text x="500" y="590" font-family="serif" font-size="16" font-weight="600" fill="#18181B" text-anchor="middle" letter-spacing="2">CÈDRE BLANC</text>
        <text x="500" y="612" font-family="sans-serif" font-size="9" fill="#71717A" text-anchor="middle" letter-spacing="1">ÉLIXIR BOTANIQUE</text>
        <circle cx="500" cy="635" r="3" fill="#D97706"/>
        <text x="500" y="662" font-family="serif" font-size="10" font-style="italic" fill="#52525B" text-anchor="middle">Extraction artisanale</text>
        <text x="500" y="682" font-family="sans-serif" font-size="8" font-weight="600" fill="#A1A1AA" text-anchor="middle" letter-spacing="1.5">50 ML · PUR SÈVE</text>

        <!-- Bottle Shoulder -->
        <path d="M 375,460 Q 420,380 470,370 L 530,370 Q 580,380 625,460 Z" fill="url(#amberGlow)"/>

        <!-- Gold Collar Ring -->
        <rect x="460" y="340" width="80" height="32" rx="4" fill="url(#goldCap)"/>

        <!-- Pipette Rubber Top -->
        <path d="M 475,340 C 470,250 530,250 525,340 Z" fill="#27272A"/>
      </g>

      <!-- Cedar & Eucalyptus branch lying next to it -->
      <g transform="translate(260, 720)">
        <path d="M 0,0 Q 80,-40 180,-10" stroke="#374151" stroke-width="4" fill="none"/>
        <ellipse cx="60" cy="-25" rx="22" ry="10" fill="#4B6354" transform="rotate(-20 60 -25)"/>
        <ellipse cx="110" cy="-32" rx="24" ry="11" fill="#3D5245" transform="rotate(-35 110 -32)"/>
        <ellipse cx="160" cy="-20" rx="20" ry="9" fill="#5C7A68" transform="rotate(-10 160 -20)"/>
      </g>
    `;
  } else if (type === 'chocolates') {
    // Coffret Gourmand Artisanal
    innerContent = `
      <defs>
        <radialGradient id="boxBg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#EAE3D9"/>
          <stop offset="100%" stop-color="#CBBFAe"/>
        </radialGradient>
        <linearGradient id="kraftBox" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#C9A071"/>
          <stop offset="50%" stop-color="#AF8556"/>
          <stop offset="100%" stop-color="#8C6439"/>
        </linearGradient>
      </defs>
      <rect width="1000" height="1000" fill="url(#boxBg)"/>
      <ellipse cx="500" cy="760" rx="340" ry="50" fill="#241910" opacity="0.3" filter="blur(22px)"/>

      <!-- Open Kraft Chocolatier Box (Isometric angle) -->
      <g transform="translate(180, 360)">
        <!-- Box base -->
        <rect x="40" y="40" width="560" height="340" rx="16" fill="url(#kraftBox)"/>
        <!-- Inner Compartment Tray -->
        <rect x="65" y="65" width="510" height="290" rx="10" fill="#291811"/>
        
        <!-- Grid of 6 Artisanal Chocolates -->
        <!-- Row 1 -->
        <rect x="95" y="95" width="120" height="100" rx="12" fill="#1C100B"/>
        <circle cx="155" cy="145" r="18" fill="#D4AF37" opacity="0.8"/> <!-- Golden dust -->
        
        <rect x="260" y="95" width="120" height="100" rx="12" fill="#3B1E13"/>
        <path d="M 280,145 Q 320,120 360,145" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity="0.6"/> <!-- White chocolate swirl -->

        <rect x="425" y="95" width="120" height="100" rx="12" fill="#241209"/>
        <rect x="460" y="130" width="50" height="30" rx="4" fill="#C2410C" opacity="0.85"/> <!-- Candied orange piece -->

        <!-- Row 2 -->
        <rect x="95" y="225" width="120" height="100" rx="12" fill="#381D11"/>
        <circle cx="155" cy="275" r="22" fill="#15803D" opacity="0.75"/> <!-- Pistachio praline -->

        <rect x="260" y="225" width="120" height="100" rx="12" fill="#1A0D07"/>
        <text x="320" y="285" font-family="serif" font-size="28" fill="#EAB308" text-anchor="middle">★</text>

        <rect x="425" y="225" width="120" height="100" rx="12" fill="#422215"/>
        <circle cx="485" cy="275" r="15" fill="#DC2626" opacity="0.8"/> <!-- Framboise ganache -->

        <!-- Golden Satin Ribbon resting over edge -->
        <path d="M 20,-20 Q 80,120 180,420" stroke="#D4AF37" stroke-width="26" fill="none" stroke-linecap="round" opacity="0.9"/>
        <path d="M 20,-20 Q 80,120 180,420" stroke="#FFF7CC" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.6"/>
      </g>
    `;
  } else {
    // Petite Maroquinerie Cuir
    innerContent = `
      <defs>
        <radialGradient id="leatherBg" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stop-color="#EBE7DF"/>
          <stop offset="100%" stop-color="#C5BEB1"/>
        </radialGradient>
        <linearGradient id="leatherTone" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#B45309"/>
          <stop offset="35%" stop-color="#92400E"/>
          <stop offset="80%" stop-color="#78350F"/>
          <stop offset="100%" stop-color="#451A03"/>
        </linearGradient>
      </defs>
      <rect width="1000" height="1000" fill="url(#leatherBg)"/>
      <ellipse cx="500" cy="740" rx="290" ry="35" fill="#1A1109" opacity="0.3" filter="blur(16px)"/>

      <!-- Handcrafted Leather Cardholder -->
      <g transform="translate(250, 360)">
        <!-- Back Pocket -->
        <rect x="30" y="30" width="440" height="300" rx="20" fill="url(#leatherTone)"/>
        
        <!-- Contrast Cream Saddle Stitching -->
        <rect x="42" y="42" width="416" height="276" rx="14" fill="none" stroke="#FEF3C7" stroke-width="2.5" stroke-dasharray="8,6" opacity="0.85"/>

        <!-- Middle Pocket Layer -->
        <path d="M 30,140 Q 250,175 470,140 L 470,330 L 30,330 Z" fill="#853609"/>
        <path d="M 42,148 Q 250,183 458,148" stroke="#FEF3C7" stroke-width="2.5" stroke-dasharray="8,6" fill="none" opacity="0.85"/>

        <!-- Front Pocket Layer with Embossed Brand -->
        <path d="M 30,210 Q 250,245 470,210 L 470,330 L 30,330 Z" fill="#6B2906"/>
        <path d="M 42,218 Q 250,253 458,218" stroke="#FEF3C7" stroke-width="2.5" stroke-dasharray="8,6" fill="none" opacity="0.85"/>

        <!-- Embossed Gold Foil Logo -->
        <text x="250" y="295" font-family="serif" font-size="16" font-weight="700" fill="#FDE68A" text-anchor="middle" letter-spacing="4">ATELIER CUIR · PARIS</text>
      </g>
    `;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="1000" height="1000">${innerContent}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const SAMPLE_PRODUCTS: RawProduct[] = [
  {
    id: 'prod-candle',
    name: "Bougie Forêt d'Hiver",
    category: 'Art de vivre & Maison',
    description: "Cire de soja naturelle coulée à la main dans un pot en verre givré vert sapin. Note boisée et aiguilles de pin.",
    imageUrl: createProductSVG('candle'),
    lightingNotes: 'Lumière naturelle tamisée, reflet de flamme vive, ombres chaudes.',
    colorHex: '#3F6456',
    textureDetail: 'Grain de cire brute & verre givré',
    tag: 'Authentique & Cosy',
  },
  {
    id: 'prod-mug',
    name: 'Tasse Céramique Façonnée Main',
    category: 'Poterie & Art de la Table',
    description: "Terre chamottée tournée au tour de potier, émaillage bicolore naturel Cloud Dancer & terre cuite.",
    imageUrl: createProductSVG('mug'),
    lightingNotes: 'Lumière zénithale douce de verrière, vapeur chaude.',
    colorHex: '#D7CCC8',
    textureDetail: 'Terre brute chamottée & mouchetures',
    tag: 'Folk & Fait Main',
  },
  {
    id: 'prod-perfume',
    name: 'Élixir Botanique Cèdre Blanc',
    category: 'Soins & Cosmétique Naturelle',
    description: "Flacon en verre ambré d'apothicaire avec compte-gouttes doré. Formule pure aux extraits de conifères.",
    imageUrl: createProductSVG('perfume'),
    lightingNotes: 'Réfraction ambrée du verre, ombres botaniques portées.',
    colorHex: '#D97706',
    textureDetail: 'Verre ambré épais & papier pressé',
    tag: 'Studio Haut de Gamme',
  },
  {
    id: 'prod-chocolates',
    name: 'Écrin Gourmand Fêtes 2026',
    category: 'Épicerie Fine & Chocolatier',
    description: "Assortiment de 6 ganaches et pralinés d'artisan avec finitions feuille d'or et ruban satin.",
    imageUrl: createProductSVG('chocolates'),
    lightingNotes: 'Reflets veloutés du cacao et éclats dorés.',
    colorHex: '#AF8556',
    textureDetail: 'Praliné croustillant & feuille d’or',
    tag: 'Cadeau Festif Partageable',
  },
  {
    id: 'prod-leather',
    name: 'Porte-Cartes Cuir Caramel',
    category: 'Maroquinerie Artisanale',
    description: "Cuir pleine fleur à tannage végétal, surpiqûres sellier faites main au fil de lin.",
    imageUrl: createProductSVG('leather'),
    lightingNotes: 'Patine satinée du cuir, texture naturelle des pores.',
    colorHex: '#92400E',
    textureDetail: 'Fleur de cuir véritable & fil de lin',
    tag: 'Durable & Intemporel',
  },
];
