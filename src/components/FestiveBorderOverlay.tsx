import React from 'react';
import { BorderSettings } from '../types';

interface Props {
  settings: BorderSettings;
  aspectRatio: string;
}

export const FestiveBorderOverlay: React.FC<Props> = ({ settings }) => {
  const {
    styleId,
    color,
    padding,
    borderWidth,
    cornerRadius,
    opacity,
    accentGold,
    customText,
    subText,
  } = settings;

  const goldColor = '#D4AF37';

  return (
    <div
      className="absolute inset-0 pointer-events-none z-20 select-none overflow-hidden"
      style={{ opacity }}
    >
      {/* 1. FOLK MODERNE BORDER */}
      {styleId === 'folk-moderne' && (
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="folkStitch"
              x="0"
              y="0"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 4,12 L 20,12 M 12,4 L 12,20 M 6,6 L 18,18 M 18,6 L 6,18"
                stroke={color}
                strokeWidth="1.6"
                strokeLinecap="round"
                opacity="0.85"
              />
            </pattern>
          </defs>

          {/* Outer Frame with stitch pattern */}
          <rect
            x={padding}
            y={padding}
            width={1000 - padding * 2}
            height={1000 - padding * 2}
            rx={cornerRadius}
            fill="none"
            stroke={color}
            strokeWidth={borderWidth * 1.5}
            strokeDasharray="10,6"
          />
          <rect
            x={padding + 8}
            y={padding + 8}
            width={1000 - (padding + 8) * 2}
            height={1000 - (padding + 8) * 2}
            rx={Math.max(2, cornerRadius - 6)}
            fill="none"
            stroke={accentGold ? goldColor : color}
            strokeWidth="1.2"
            opacity="0.75"
          />

          {/* Four Folk Embroidered Corners */}
          {/* Top-Left */}
          <g transform={`translate(${padding + 12}, ${padding + 12})`}>
            <circle cx="28" cy="28" r="16" fill={color} opacity="0.9" />
            <circle cx="28" cy="28" r="8" fill={accentGold ? goldColor : '#FFF'} />
            <path
              d="M 4,28 Q 28,12 52,28 M 28,4 Q 12,28 28,52"
              stroke={accentGold ? goldColor : color}
              strokeWidth="2.5"
              fill="none"
            />
            {/* Folk floral leaves */}
            <path
              d="M 28,52 Q 40,65 55,60 M 52,28 Q 65,40 60,55"
              stroke={color}
              strokeWidth="2"
              fill="none"
            />
          </g>

          {/* Top-Right */}
          <g transform={`translate(${1000 - padding - 68}, ${padding + 12}) scale(-1, 1) translate(-56, 0)`}>
            <circle cx="28" cy="28" r="16" fill={color} opacity="0.9" />
            <circle cx="28" cy="28" r="8" fill={accentGold ? goldColor : '#FFF'} />
            <path
              d="M 4,28 Q 28,12 52,28 M 28,4 Q 12,28 28,52"
              stroke={accentGold ? goldColor : color}
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d="M 28,52 Q 40,65 55,60 M 52,28 Q 65,40 60,55"
              stroke={color}
              strokeWidth="2"
              fill="none"
            />
          </g>

          {/* Bottom-Left */}
          <g transform={`translate(${padding + 12}, ${1000 - padding - 68}) scale(1, -1) translate(0, -56)`}>
            <circle cx="28" cy="28" r="16" fill={color} opacity="0.9" />
            <circle cx="28" cy="28" r="8" fill={accentGold ? goldColor : '#FFF'} />
            <path
              d="M 4,28 Q 28,12 52,28 M 28,4 Q 12,28 28,52"
              stroke={accentGold ? goldColor : color}
              strokeWidth="2.5"
              fill="none"
            />
          </g>

          {/* Bottom-Right */}
          <g transform={`translate(${1000 - padding - 68}, ${1000 - padding - 68}) scale(-1, -1) translate(-56, -56)`}>
            <circle cx="28" cy="28" r="16" fill={color} opacity="0.9" />
            <circle cx="28" cy="28" r="8" fill={accentGold ? goldColor : '#FFF'} />
            <path
              d="M 4,28 Q 28,12 52,28 M 28,4 Q 12,28 28,52"
              stroke={accentGold ? goldColor : color}
              strokeWidth="2.5"
              fill="none"
            />
          </g>

          {/* Bottom Folk Artisan Tag */}
          {customText && (
            <g transform={`translate(500, ${1000 - padding - 22})`}>
              <rect
                x="-140"
                y="-18"
                width="280"
                height="36"
                rx="18"
                fill="#FFFDF9"
                stroke={color}
                strokeWidth="1.5"
              />
              <text
                x="0"
                y="5"
                textAnchor="middle"
                fontFamily="serif"
                fontSize="13"
                fontWeight="700"
                letterSpacing="2.5"
                fill={color}
              >
                ✦ {customText.toUpperCase()} ✦
              </text>
            </g>
          )}
        </svg>
      )}

      {/* 2. ART DÉCO GÉOMÉTRIQUE BORDER */}
      {styleId === 'art-deco' && (
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          {/* Outer double gold wire lines */}
          <rect
            x={padding}
            y={padding}
            width={1000 - padding * 2}
            height={1000 - padding * 2}
            rx={cornerRadius}
            fill="none"
            stroke={color}
            strokeWidth={borderWidth}
          />
          <rect
            x={padding + 10}
            y={padding + 10}
            width={1000 - (padding + 10) * 2}
            height={1000 - (padding + 10) * 2}
            rx={Math.max(0, cornerRadius - 6)}
            fill="none"
            stroke={accentGold ? goldColor : color}
            strokeWidth="1.2"
            opacity="0.85"
          />

          {/* Art Déco Corners with stepped chamfers & diamonds */}
          {/* TL */}
          <g transform={`translate(${padding + 6}, ${padding + 6})`}>
            <polygon
              points="0,32 32,0 48,0 48,16 16,48 0,48"
              fill={color}
              opacity="0.85"
            />
            <polygon
              points="20,20 28,12 36,20 28,28"
              fill={accentGold ? goldColor : '#FFF'}
            />
            <line x1="0" y1="56" x2="56" y2="0" stroke={color} strokeWidth="1.5" />
          </g>
          {/* TR */}
          <g transform={`translate(${1000 - padding - 6}, ${padding + 6}) scale(-1, 1)`}>
            <polygon
              points="0,32 32,0 48,0 48,16 16,48 0,48"
              fill={color}
              opacity="0.85"
            />
            <polygon
              points="20,20 28,12 36,20 28,28"
              fill={accentGold ? goldColor : '#FFF'}
            />
            <line x1="0" y1="56" x2="56" y2="0" stroke={color} strokeWidth="1.5" />
          </g>
          {/* BL */}
          <g transform={`translate(${padding + 6}, ${1000 - padding - 6}) scale(1, -1)`}>
            <polygon
              points="0,32 32,0 48,0 48,16 16,48 0,48"
              fill={color}
              opacity="0.85"
            />
            <polygon
              points="20,20 28,12 36,20 28,28"
              fill={accentGold ? goldColor : '#FFF'}
            />
            <line x1="0" y1="56" x2="56" y2="0" stroke={color} strokeWidth="1.5" />
          </g>
          {/* BR */}
          <g transform={`translate(${1000 - padding - 6}, ${1000 - padding - 6}) scale(-1, -1)`}>
            <polygon
              points="0,32 32,0 48,0 48,16 16,48 0,48"
              fill={color}
              opacity="0.85"
            />
            <polygon
              points="20,20 28,12 36,20 28,28"
              fill={accentGold ? goldColor : '#FFF'}
            />
            <line x1="0" y1="56" x2="56" y2="0" stroke={color} strokeWidth="1.5" />
          </g>

          {/* Top Header Plaque */}
          {customText && (
            <g transform={`translate(500, ${padding + 10})`}>
              <polygon
                points="-160,0 -140,-18 140,-18 160,0 140,18 -140,18"
                fill="#18181B"
                stroke={color}
                strokeWidth="1.5"
              />
              <text
                x="0"
                y="5"
                textAnchor="middle"
                fontFamily="serif"
                fontSize="12"
                fontWeight="700"
                letterSpacing="3.5"
                fill={accentGold ? goldColor : '#FFF'}
              >
                ◆ {customText.toUpperCase()} ◆
              </text>
            </g>
          )}
        </svg>
      )}

      {/* 3. BIO-DESIGN GIVRÉ & VÉGÉTAL */}
      {styleId === 'bio-design' && (
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          {/* Organic double contour */}
          <rect
            x={padding}
            y={padding}
            width={1000 - padding * 2}
            height={1000 - padding * 2}
            rx={cornerRadius}
            fill="none"
            stroke={color}
            strokeWidth={borderWidth}
            opacity="0.8"
          />

          {/* Pine needles and winter berry wreaths on corners */}
          {/* Top Left Wreath */}
          <g transform={`translate(${padding - 8}, ${padding - 8})`}>
            {/* Twig */}
            <path
              d="M 0,90 Q 30,30 90,0"
              stroke={color}
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            {/* Pine needles */}
            <path
              d="M 20,70 L 5,60 M 35,50 L 22,35 M 48,38 L 40,18 M 65,25 L 60,5 M 75,18 L 85,0"
              stroke="#2D6A4F"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 25,65 L 40,75 M 40,48 L 60,55 M 55,32 L 72,40 M 70,22 L 90,28"
              stroke="#40916C"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Red berries */}
            <circle cx="35" cy="50" r="7" fill="#DC2626" />
            <circle cx="48" cy="38" r="6" fill="#B91C1C" />
            <circle cx="42" cy="58" r="5" fill="#EF4444" />
            {/* Frost crystals */}
            <circle cx="20" cy="20" r="2.5" fill="#FFF" opacity="0.9" />
            <circle cx="70" cy="15" r="2" fill="#FFF" opacity="0.8" />
          </g>

          {/* Bottom Right Wreath */}
          <g transform={`translate(${1000 - padding + 8}, ${1000 - padding + 8}) rotate(180)`}>
            <path
              d="M 0,90 Q 30,30 90,0"
              stroke={color}
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 20,70 L 5,60 M 35,50 L 22,35 M 48,38 L 40,18 M 65,25 L 60,5"
              stroke="#2D6A4F"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="35" cy="50" r="7" fill="#DC2626" />
            <circle cx="48" cy="38" r="6" fill="#B91C1C" />
          </g>

          {/* Subtle frost sparkles at corners */}
          <g fill="#FFF" opacity="0.85">
            <path d={`M ${1000 - padding - 40},${padding + 30} l 3,8 l 8,3 l -8,3 l -3,8 l -3,-8 l -8,-3 l 8,-3 z`} />
            <path d={`M ${padding + 30},${1000 - padding - 40} l 3,8 l 8,3 l -8,3 l -3,8 l -3,-8 l -8,-3 l 8,-3 z`} />
          </g>

          {customText && (
            <g transform={`translate(500, ${1000 - padding - 18})`}>
              <rect
                x="-120"
                y="-15"
                width="240"
                height="30"
                rx="15"
                fill="#F0FDF4"
                stroke={color}
                strokeWidth="1.2"
              />
              <text
                x="0"
                y="5"
                textAnchor="middle"
                fontFamily="sans-serif"
                fontSize="11"
                fontWeight="700"
                letterSpacing="2"
                fill={color}
              >
                🌿 {customText.toUpperCase()} 🌿
              </text>
            </g>
          )}
        </svg>
      )}

      {/* 4. RUBAN SATIN & SCEAU CIRE */}
      {styleId === 'ribbon-seal' && (
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          {/* Outer elegant border */}
          <rect
            x={padding}
            y={padding}
            width={1000 - padding * 2}
            height={1000 - padding * 2}
            rx={cornerRadius}
            fill="none"
            stroke={color}
            strokeWidth={borderWidth * 1.2}
          />
          {/* Inner hairline */}
          <rect
            x={padding + 12}
            y={padding + 12}
            width={1000 - (padding + 12) * 2}
            height={1000 - (padding + 12) * 2}
            rx={Math.max(0, cornerRadius - 8)}
            fill="none"
            stroke={accentGold ? goldColor : '#FFF'}
            strokeWidth="1.5"
            strokeDasharray="6,4"
            opacity="0.8"
          />

          {/* Draped Ribbon Across Top-Right Corner */}
          <g transform={`translate(${1000 - padding - 110}, ${padding})`}>
            <polygon
              points="0,0 110,110 85,135 -25,25"
              fill={color}
              opacity="0.95"
            />
            <line
              x1="0"
              y1="0"
              x2="110"
              y2="110"
              stroke={accentGold ? goldColor : '#FFF'}
              strokeWidth="1.5"
              opacity="0.7"
            />
            <line
              x1="-25"
              y1="25"
              x2="85"
              y2="135"
              stroke={accentGold ? goldColor : '#FFF'}
              strokeWidth="1.5"
              opacity="0.7"
            />
          </g>

          {/* Wax Seal Stamp in Bottom Right */}
          <g transform={`translate(${1000 - padding - 55}, ${1000 - padding - 55})`}>
            {/* Wax scalloped edge */}
            <circle cx="0" cy="0" r="44" fill={color} filter="drop-shadow(0 4px 8px rgba(0,0,0,0.35))" />
            <circle cx="0" cy="0" r="38" fill="none" stroke={accentGold ? goldColor : '#FFF'} strokeWidth="1.5" strokeDasharray="4,2" />
            <text
              x="0"
              y="-8"
              textAnchor="middle"
              fontFamily="serif"
              fontSize="9"
              letterSpacing="1.5"
              fill={accentGold ? goldColor : '#FFF'}
              fontWeight="bold"
            >
              ÉDITION
            </text>
            <text
              x="0"
              y="12"
              textAnchor="middle"
              fontFamily="serif"
              fontSize="18"
              fontWeight="bold"
              fill={accentGold ? goldColor : '#FFF'}
            >
              2026
            </text>
            <text
              x="0"
              y="25"
              textAnchor="middle"
              fontFamily="serif"
              fontSize="8"
              letterSpacing="1"
              fill={accentGold ? goldColor : '#FFF'}
            >
              ★ ATELIER ★
            </text>
          </g>

          {customText && (
            <g transform={`translate(${padding + 30}, ${1000 - padding - 20})`}>
              <text
                x="0"
                y="0"
                fontFamily="serif"
                fontSize="14"
                fontStyle="italic"
                fill={color}
                letterSpacing="1"
              >
                {customText}
              </text>
            </g>
          )}
        </svg>
      )}

      {/* 5. CARTE POSTALE D'HIVER & TIMBRE */}
      {styleId === 'postal-vintage' && (
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          {/* Perforated scalloped border around photo */}
          <rect
            x={padding}
            y={padding}
            width={1000 - padding * 2}
            height={1000 - padding * 2}
            rx={cornerRadius}
            fill="none"
            stroke={color}
            strokeWidth={borderWidth}
          />

          {/* Postal Stamp Top-Right */}
          <g transform={`translate(${1000 - padding - 100}, ${padding + 16})`}>
            {/* Stamp perforated card */}
            <rect
              x="0"
              y="0"
              width="82"
              height="98"
              rx="4"
              fill="#FFFDF7"
              stroke="#B91C1C"
              strokeWidth="2"
              strokeDasharray="4,2"
            />
            <rect x="6" y="6" width="70" height="86" fill="#FEE2E2" />
            <text x="41" y="24" textAnchor="middle" fontFamily="sans-serif" fontSize="8" fontWeight="bold" fill="#991B1B">POSTES 2026</text>
            <text x="41" y="58" textAnchor="middle" fontFamily="serif" fontSize="28" fill="#B91C1C">🎄</text>
            <text x="41" y="82" textAnchor="middle" fontFamily="monospace" fontSize="9" fontWeight="bold" fill="#7F1D1D">0,95 €</text>

            {/* Circular Postmark cancellation */}
            <g transform="translate(10, 50) rotate(-22)" opacity="0.75">
              <circle cx="0" cy="0" r="32" fill="none" stroke="#1F2937" strokeWidth="1.5" />
              <line x1="-30" y1="0" x2="30" y2="0" stroke="#1F2937" strokeWidth="1" />
              <text x="0" y="-8" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fontWeight="bold" fill="#1F2937">EXPÉDITION FESTIVE</text>
              <text x="0" y="14" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#1F2937">24.12.2026</text>
              {/* Wavy cancellation lines */}
              <path d="M 36,-10 Q 50,-15 65,-10 M 36,0 Q 50,-5 65,0 M 36,10 Q 50,5 65,10" stroke="#1F2937" strokeWidth="1.2" fill="none" />
            </g>
          </g>

          {/* Bottom Left Airmail Stripe */}
          <g transform={`translate(${padding + 16}, ${1000 - padding - 36})`}>
            <rect x="0" y="0" width="180" height="20" rx="3" fill="#FFFDF7" stroke={color} strokeWidth="1" />
            <text x="90" y="14" textAnchor="middle" fontFamily="monospace" fontSize="10" fontWeight="bold" fill={color} letterSpacing="2">
              AIR MAIL · PAR AVION
            </text>
          </g>
        </svg>
      )}

      {/* 6. POLAROÏD STUDIO CHIC */}
      {styleId === 'polaroid-studio' && (
        <div className="w-full h-full flex flex-col justify-between pointer-events-none p-3">
          {/* Subtle instant photo white border effect */}
          <div
            className="w-full h-full flex flex-col border-[16px] border-white/95 shadow-xl justify-end pb-4 px-6"
            style={{
              borderColor: color || '#FFFFFF',
              borderRadius: `${cornerRadius}px`,
            }}
          >
            <div className="pt-2 flex items-center justify-between border-t border-stone-200/50">
              <div>
                <p className="font-serif italic text-sm tracking-wide text-stone-800">
                  {customText || 'Photo Brute d’Atelier'}
                </p>
                <p className="font-mono text-[10px] text-stone-500 tracking-wider uppercase">
                  {subText || 'Prise de vue Studio · Fêtes 2026'}
                </p>
              </div>
              <span className="text-xs font-serif text-amber-600 font-semibold">
                N° 2026
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 7. ÉPURE & CONSTELLATION */}
      {styleId === 'minimal-stars' && (
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          {/* Minimalist fine double line */}
          <rect
            x={padding}
            y={padding}
            width={1000 - padding * 2}
            height={1000 - padding * 2}
            rx={cornerRadius}
            fill="none"
            stroke={color}
            strokeWidth={borderWidth}
          />
          <rect
            x={padding + 8}
            y={padding + 8}
            width={1000 - (padding + 8) * 2}
            height={1000 - (padding + 8) * 2}
            rx={Math.max(0, cornerRadius - 4)}
            fill="none"
            stroke={color}
            strokeWidth="0.8"
            opacity="0.6"
          />

          {/* 4 Sparkle Stars at Corners */}
          {[
            { cx: padding + 22, cy: padding + 22 },
            { cx: 1000 - padding - 22, cy: padding + 22 },
            { cx: padding + 22, cy: 1000 - padding - 22 },
            { cx: 1000 - padding - 22, cy: 1000 - padding - 22 },
          ].map((pos, idx) => (
            <g key={idx} transform={`translate(${pos.cx}, ${pos.cy})`}>
              <path
                d="M 0,-14 L 3,-4 L 14,0 L 3,4 L 0,14 L -3,4 L -14,0 L -3,-4 Z"
                fill={accentGold ? goldColor : color}
              />
              <circle cx="0" cy="0" r="2.5" fill="#FFF" />
            </g>
          ))}
        </svg>
      )}
    </div>
  );
};
