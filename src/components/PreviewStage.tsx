import React, { useState, useRef } from 'react';
import { Sparkles, MoveHorizontal, Smartphone, Square, RectangleVertical, Monitor } from 'lucide-react';
import { RawProduct, FilterSettings, BorderSettings, StickerBadge, ViewMode, AspectRatio } from '../types';
import { FestiveBorderOverlay } from './FestiveBorderOverlay';
import { BentoGridStage } from './BentoGridStage';

interface Props {
  product: RawProduct;
  filter: FilterSettings;
  border: BorderSettings;
  badges: StickerBadge[];
  viewMode: ViewMode;
  aspectRatio: AspectRatio;
  onChangeAspectRatio: (ar: AspectRatio) => void;
  onOpenExport: () => void;
}

export const PreviewStage: React.FC<Props> = ({
  product,
  filter,
  border,
  badges,
  viewMode,
  aspectRatio,
  onChangeAspectRatio,
  onOpenExport,
}) => {
  const [sliderPos, setSliderPos] = useState<number>(50); // 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Compute CSS filter string
  const brightnessVal = 100 + filter.brightness;
  const contrastVal = filter.contrast * 100;
  const saturationVal = filter.saturation * 100;
  const sepiaVal = filter.warmth > 0 ? Math.min(30, filter.warmth * 0.5) : 0;
  const hueRotateVal = filter.tint;

  const filterStyleCss: React.CSSProperties = {
    filter: `brightness(${brightnessVal}%) contrast(${contrastVal}%) saturate(${saturationVal}%) sepia(${sepiaVal}%) hue-rotate(${hueRotateVal}deg)`,
  };

  // Drag handlers for split slider
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  const handlePointerDown = () => {
    setIsDragging(true);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Aspect ratio class helper
  const getAspectClass = () => {
    switch (aspectRatio) {
      case '1:1':
        return 'aspect-square max-w-[500px]';
      case '4:5':
        return 'aspect-[4/5] max-w-[440px]';
      case '9:16':
        return 'aspect-[9/16] max-w-[340px]';
      case '16:9':
        return 'aspect-[16/9] max-w-[620px]';
      default:
        return 'aspect-square max-w-[500px]';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 lg:p-6 w-full h-full">
      {/* Top Bar: Aspect Ratio Switcher */}
      <div className="w-full max-w-xl flex items-center justify-between mb-4 bg-slate-900/90 border border-slate-800 px-3 py-2 rounded-xl text-xs">
        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="text-[11px] font-medium text-slate-300">Format :</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onChangeAspectRatio('1:1')}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-medium transition-all cursor-pointer ${
              aspectRatio === '1:1'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Square className="w-3.5 h-3.5 text-yellow-300" />
            <span>1:1 Carré</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeAspectRatio('4:5')}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-medium transition-all cursor-pointer ${
              aspectRatio === '4:5'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <RectangleVertical className="w-3.5 h-3.5 text-yellow-300" />
            <span>4:5 Portrait</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeAspectRatio('9:16')}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-medium transition-all cursor-pointer ${
              aspectRatio === '9:16'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-yellow-300" />
            <span>9:16 Story</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeAspectRatio('16:9')}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-medium transition-all cursor-pointer ${
              aspectRatio === '16:9'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5 text-yellow-300" />
            <span>16:9 Web</span>
          </button>
        </div>
      </div>

      {/* Main Canvas / Stage */}
      {viewMode === 'bento' ? (
        <BentoGridStage
          product={product}
          filter={filter}
          border={border}
          badges={badges}
          filterStyleCss={filterStyleCss}
        />
      ) : (
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className={`w-full ${getAspectClass()} relative rounded-2xl overflow-hidden shadow-2xl bg-slate-950 border border-slate-800 select-none cursor-default transition-all`}
        >
          {/* 1. Base Raw Image (Background layer) */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img
              src={product.imageUrl}
              alt="Photo brute"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 2. Processed Studio Layer (Filtered with bloom, warmth, and border) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
            style={{
              clipPath:
                viewMode === 'split-slider'
                  ? `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)`
                  : 'none',
            }}
          >
            {/* Filtered image */}
            <img
              src={product.imageUrl}
              alt="Photo traitée studio"
              className="w-full h-full object-cover"
              style={filterStyleCss}
            />

            {/* Bloom glow overlay if bloom > 0 */}
            {filter.bloom > 5 && (
              <div
                className="absolute inset-0 mix-blend-screen pointer-events-none"
                style={{
                  opacity: (filter.bloom / 100) * 0.5,
                  filter: `blur(${Math.round(filter.bloom * 0.3)}px) brightness(130%)`,
                }}
              >
                <img
                  src={product.imageUrl}
                  alt="Bloom"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Warmth overlay */}
            {filter.warmth !== 0 && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundColor:
                    filter.warmth > 0 ? '#EAB308' : '#1D4ED8',
                  opacity: Math.min(0.22, (Math.abs(filter.warmth) / 100) * 0.25),
                  mixBlendMode: 'color',
                }}
              />
            )}

            {/* Vignette overlay */}
            {filter.vignette > 0 && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle, transparent 40%, rgba(0,0,0,${
                    (filter.vignette / 100) * 0.7
                  }) 100%)`,
                }}
              />
            )}

            {/* Film Grain overlay */}
            {filter.grain > 5 && (
              <div
                className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />
            )}

            {/* Festive Border */}
            <FestiveBorderOverlay settings={border} aspectRatio={aspectRatio} />

            {/* Active Badges */}
            {badges
              .filter((b) => b.active)
              .map((b) => (
                <div
                  key={b.id}
                  className="absolute z-30 px-3.5 py-1.5 rounded-full font-semibold text-xs shadow-lg flex items-center gap-1.5 transition-all"
                  style={{
                    left: `${b.x}%`,
                    top: `${b.y}%`,
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: b.color,
                    color: b.textColor,
                  }}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{b.text}</span>
                </div>
              ))}
          </div>

          {/* 3. Split Slider Scrubbing Line (when viewMode === 'split-slider') */}
          {viewMode === 'split-slider' && (
            <>
              {/* Divider Line */}
              <div
                className="absolute top-0 bottom-0 z-30 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="w-0.5 h-full bg-yellow-400 shadow-[0_0_10px_rgba(0,0,0,0.8)] relative -translate-x-1/2">
                  {/* Draggable Handle */}
                  <div
                    onPointerDown={handlePointerDown}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center cursor-ew-resize pointer-events-auto border-2 border-yellow-400 hover:scale-110 active:scale-95 transition-transform"
                  >
                    <MoveHorizontal className="w-4 h-4 text-blue-900" />
                  </div>
                </div>
              </div>

              {/* Labels for Before vs After */}
              <div className="absolute top-3 left-3 z-30 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-slate-300 pointer-events-none border border-slate-700/60">
                BRUT (RAW)
              </div>
              <div className="absolute top-3 right-3 z-30 bg-yellow-400 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-slate-950 font-bold pointer-events-none shadow-md">
                STUDIO FESTIF 2026
              </div>
            </>
          )}
        </div>
      )}

      {/* Stage Bottom Helper & Quick Export */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
        {viewMode === 'split-slider' ? (
          <span className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-800">
            <MoveHorizontal className="w-3.5 h-3.5 text-yellow-400" />
            Glissez le curseur pour inspecter la transformation de la matière brute
          </span>
        ) : viewMode === 'bento' ? (
          <span className="bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-800 text-yellow-300">
            Format Bento Grid : idéal pour carrousels Instagram &amp; épingles Pinterest festives
          </span>
        ) : (
          <span className="bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-800">
            Aperçu temps réel haute fidélité avec étalonnage studio et bordure narrative
          </span>
        )}
      </div>
    </div>
  );
};
